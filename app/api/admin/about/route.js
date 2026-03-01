import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about || {});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // id-ni body-dən ayırırıq ki, Prisma "update/create" hissəsində onu görməsin
    const { id, ...dataWithoutId } = body;

    const existingAbout = await prisma.about.findFirst();

    const updated = await prisma.about.upsert({
      where: { 
        id: existingAbout?.id || "000000000000000000000000" 
      },
      update: dataWithoutId, // Burada id yoxdur, xəta verməyəcək
      create: dataWithoutId, // Burada id yoxdur
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("About API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}