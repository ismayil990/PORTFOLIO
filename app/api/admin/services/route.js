import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const config = await prisma.servicesConfig.findFirst();
    const services = await prisma.service.findMany({ 
      orderBy: { order: 'asc' } 
    });
    
    return NextResponse.json({ 
      config: config || { mainTitle: "Terapiya Xidmətləri", subDescription: "..." }, 
      services: services || [] 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { config, services } = body;

    // 1. Config Yeniləmə (Və ya Yaratma)
    const existingConfig = await prisma.servicesConfig.findFirst();
    await prisma.servicesConfig.upsert({
      where: { id: existingConfig?.id || "000000000000000000000000" },
      update: {
        mainTitle: config.mainTitle,
        subDescription: config.subDescription
      },
      create: {
        mainTitle: config.mainTitle,
        subDescription: config.subDescription
      }
    });

    // 2. Xidmətləri Yeniləmə
    // MongoDB-də köhnələri silib təzələri tək-tək (və ya Promise.all ilə) yaratmaq daha etibarlıdır
    await prisma.service.deleteMany({}); 

    if (services && services.length > 0) {
      await Promise.all(
        services.map((s, index) => 
          prisma.service.create({
            data: {
              title: s.title || "Adsız Xidmət",
              price: s.price || "0 AZN",
              description: s.description || "",
              order: index
            }
          })
        )
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CRITICAL API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}