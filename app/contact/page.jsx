"use client";
import { useEffect, useState, useRef } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          fetchContact();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "150px" // Əlaqə bölməsinə çatmamış bir az tez yüklənsin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasFetched]);

  async function fetchContact() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact");
      const json = await res.json();
      setData(json.contact || json);
      setHasFetched(true);
    } catch (err) {
      console.error("Kontakt yüklənərkən xəta:", err);
    } finally {
      setLoading(false);
    }
  }

  // Yüklənmə zamanı və ya data yoxdursa skeleton/boşluq göstəririk
  if (!hasFetched && loading) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!data && hasFetched) return null;

  return (
    <section id="contact" ref={sectionRef} className="min-h-[500px] py-20">
      <PageWrapper>
        {data && (
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                {data.title?.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-purple-400">{data.title?.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {data.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {/* Ünvan */}
                <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">{data.addressTitle}</h3>
                    <p className="text-muted-foreground">{data.addressLine1}<br/>{data.addressLine2}</p>
                  </div>
                </div>

                {/* Saatlar */}
                <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">{data.hoursTitle}</h3>
                    <p className="text-muted-foreground">{data.hoursLine1}<br/>{data.hoursLine2}</p>
                  </div>
                </div>

                {/* Kontakt */}
                <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">{data.contactTitle}</h3>
                    <p className="text-muted-foreground">{data.phone}<br/>{data.email}</p>
                  </div>
                </div>
              </div>

              {/* Sağ tərəf CTA Bloqu */}
              <div className="relative p-8 rounded-3xl h-full min-h-[400px] flex items-center justify-center border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl"> 
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{ 
                    backgroundImage: `url('${data.ctaBgUrl}')`,
                    opacity: 0.3,
                  }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0"></div>

                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-display font-semibold text-white mb-6">
                    {data.ctaTitle}
                  </h3>
                  <a 
                    href="/booking" 
                    className="inline-block bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-purple-500/25 active:scale-95 hover:-translate-y-1"
                  >
                    {data.ctaBtnText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </section>
  );
}