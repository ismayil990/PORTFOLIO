import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";



export async function GET() {
  try {
    const contactData = await prisma.contactConfig.findFirst({
      orderBy: {
        updatedAt: 'desc' // Ən son yenilənəni gətir
      }
    });

    // Əgər bazada heç nə yoxdursa, 404 yox, boş obyekt qaytarırıq ki frontend partlamasın
    return NextResponse.json(contactData || {});
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Məlumat gətirilərkən xəta yarandı" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    
    // Əgər frontend-dən gələn obyekt { data: { ... } } şəklindədirsə, 
    // bizə lazım olan yalnız o daxildəki obyektdir.
    const actualData = body.data || body;

    // 1. Bazadan mövcud olanı tapırıq
    const existing = await prisma.contactConfig.findFirst();

    // 2. Prisma-nın xəta verə biləcəyi "id" və "updatedAt" kimi sahələri təmizləyirik
    const { id, updatedAt, ...cleanData } = actualData;

    const updatedContact = await prisma.contactConfig.upsert({
      where: { 
        id: existing?.id || "65f1a2b3c4d5e6f7a8b9c0d1" 
      },
      update: cleanData, // Burada "data:" yazmırıq! Birbaşa cleanData-nı ötürürük.
      create: cleanData,
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error("PRISMA UPSERT ERROR:", error); 
    return NextResponse.json({ 
      error: "Yeniləmə xətası", 
      details: error.message 
    }, { status: 500 });
  }
}