"use client";
import { useEffect, useState, useRef } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Services() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Təkrar fetch-in qarşısını almaq üçün
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bölmə görünürlük sahəsinə girdikdə və daha əvvəl yüklənməyibsə
        if (entry.isIntersecting && !hasFetched) {
          fetchServices();
        }
      },
      { 
        threshold: 0.1, // Bölmənin 10%-i görünəndə işə düşür
        rootMargin: "100px" // İstifadəçi çatmamış 100px əvvəl yükləməyə başlasın (daha rəvan təcrübə)
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasFetched]);

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      setData(json);
      setHasFetched(true);
    } catch (err) {
      console.error("Xidmətlər yüklənərkən xəta:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fallback datası
  const config = data?.config || { mainTitle: "Xidmətlər", subDescription: "Xidmətlərimiz haqqında məlumat yüklənir..." };
  const services = data?.services || [];

  return (
    <section id="services"  ref={sectionRef} className="min-h-[400px]"> {/* Boşluq saxlayırıq ki, layout tullanmasın */}
      <PageWrapper>
        <div className="container mx-auto px-4 max-w-5xl pt-2">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              {config.mainTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {config.subDescription}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-8 mb-16">
              {services.map((service, idx) => (
                <div key={idx} className="glass-card hover:border-purple-500/30 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-start md:items-center bg-white/5 border border-white/10">
                  <div className="flex-grow">
                    <div className="flex flex-row md:items-center gap-4 mb-4">
                      <h2 className="text-2xl font-display font-semibold text-white">{service.title}</h2>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium text-sm">
                        {service.price} &#8380;
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags && service.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 w-full md:w-auto">
                    <Link href={`/booking?type=${service.title.split(' ')[0].toLowerCase()}`}>
                      <Button className="w-[150px] p-[5px] border-none md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
                        Seans Təyin Edin
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageWrapper>
    </section>
  );
}