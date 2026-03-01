import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Bütün resursları gətir
export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: "Məlumatlar gətirilərkən xəta" }, { status: 500 });
  }
}

// Yeni resurs əlavə et
export async function POST(req) {
  try {
    const body = await req.json();
    const newResource = await prisma.resource.create({
      data: {
        title: body.title,
        url: body.url,
        type: body.type,
      }
    });
    return NextResponse.json(newResource);
  } catch (error) {
    return NextResponse.json({ error: "Yaradılma xətası" }, { status: 500 });
  }
}

// Resursu sil (URL-dən ID-ni götürürük)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID tapılmadı" }, { status: 400 });
    }

    await prisma.resource.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: "Uğurla silindi" });
  } catch (error) {
    return NextResponse.json({ error: "Silinmə zamanı xəta" }, { status: 500 });
  }
}