"use client"
import { useEffect, useState } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/admin/about').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center bg-black"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <PageWrapper>
      <div id="about" className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            {data?.title?.split(' ').slice(0, -2).join(' ')} <span className="text-purple-400">{data?.title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data?.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src={data?.imageUrl} alt="About" className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-0">
            <h2 className="text-3xl font-display font-semibold text-purple-400 pb-[10px]">{data.approachTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{data?.approachText1}</p>
            <div className="pt-6">
              
              <ul className="space-y-3 text-muted-foreground">
                {data?.skills?.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8">
              <Link href="/booking">
                <Button className="bg-white text-black hover:bg-purple-100 rounded-full px-8 font-semibold">
                  {data.buttonText || "Mənimlə işə başlayın"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}