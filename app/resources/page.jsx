"use client";
import { useEffect, useState, useRef } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { FileText, Link as LinkIcon, Video, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Genişlənmə vəziyyəti
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          fetchResources();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [hasFetched]);

  async function fetchResources() {
    setLoading(true);
    try {
      // Bura həmin { next: { revalidate: 3600 } } məntiqini də əlavə edə bilərsən
      const res = await fetch("/api/admin/resources");
      const data = await res.json();
      setResources(Array.isArray(data) ? data : []);
      setHasFetched(true);
    } catch (err) {
      console.error("Xəta:", err);
    } finally {
      setLoading(false);
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "PDF": return <FileText className="w-5 h-5" />;
      case "Video": return <Video className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  return (
    <section id="resources" ref={sectionRef} className="py-20 relative">
      <PageWrapper>
        <div className="container mx-auto px-4 max-w-6xl pb-0">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Faydalı <span className="text-purple-400">Resurslar</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              İnkişafınızı dəstəkləmək üçün ödənişsiz materiallar.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="relative">
              {/* Konteyner: isExpanded-ə görə hündürlük dəyişir */}
              <div 
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-[2000px]" : "max-h-[350px]"
                }`}
              >
                {resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 rounded-2xl flex items-start gap-4 group border border-white/5 hover:border-purple-500/30 transition-all bg-white/5 h-[120px]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0 group-hover:bg-purple-500/20 transition-all">
                      {getIcon(res.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {res.title}
                      </h3>
                      <p className="text-xs text-muted-foreground uppercase">{res.type}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Fade Effekti: Yalnız bağlı olanda və data olanda görsənir */}
              {!isExpanded && resources.length > 3 && (
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
              )}

              {/* "Daha çox" Düyməsi */}
              {resources.length > 3 && (
                <div className="flex justify-center mt-12 relative z-20">
                  <Button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-purple-900 border border-white/10 hover:bg-zinc-800 text-white rounded-full px-4 py-4 gap-2 transition-all"
                  >
                    {isExpanded ? (
                      <>Daha az göstər <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Hamısını gör ({resources.length}) <ChevronDown className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </PageWrapper>
    </section>
  );
}