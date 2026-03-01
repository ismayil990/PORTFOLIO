import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { section, data } = await req.json();

    // Təhlükəsizlik üçün section yoxlanışı
    if (!section || !data) {
      return NextResponse.json({ error: "Məlumat əskikdir" }, { status: 400 });
    }

    let result;

    switch (section) {
      case "hero":
        // MongoDB-də tək bir Hero sənədi (document) saxlayırıq.
        // İlk tapılanı yeniləyirik, yoxdursa yaradırıq.
        const existingHero = await prisma.hero.findFirst();
        
        result = await prisma.hero.upsert({
          where: { 
            id: existingHero?.id || "000000000000000000000000" // ID yoxdursa müvəqqəti dummy ID
          },
          update: {
            badge: data.badge,
            title: data.title,
            description: data.description,
            primaryBtn: data.primaryBtn,
            secondaryBtn: data.secondaryBtn,
            imageUrl: data.imageUrl,
            experienceYears: data.experienceYears,
            experienceText: data.experienceText,
            focusAreas: data.focusAreas, // Bu Json tipində olduğu üçün massivi birbaşa qəbul edir
          },
          create: {
            badge: data.badge,
            title: data.title,
            description: data.description,
            primaryBtn: data.primaryBtn,
            secondaryBtn: data.secondaryBtn,
            imageUrl: data.imageUrl,
            experienceYears: data.experienceYears,
            experienceText: data.experienceText,
            focusAreas: data.focusAreas,
          },
        });
        break;

      case "contact":
        const existingContact = await prisma.contact.findFirst();
        result = await prisma.contact.upsert({
          where: { id: existingContact?.id || "000000000000000000000000" },
          update: data,
          create: data,
        });
        break;

      default:
        return NextResponse.json({ error: "Yanlış bölmə" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Server xətası: " + error.message }, 
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    if (!hero) {
      return NextResponse.json({ error: "Məlumat tapılmadı" }, { status: 404 });
    }
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}