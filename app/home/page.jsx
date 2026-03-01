"use client"
import { useEffect, useState } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Heart, Sparkles, MessageCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// İkonları string adına görə render etmək üçün xəritə
const iconMap = {
  Brain: Brain,
  Heart: Heart,
  MessageCircle: MessageCircle,
};

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch("/api/admin/update");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Data çəkilərkən xəta:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 pt-12 pb-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{data?.badge}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 whitespace-pre-line">
              {data?.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {data?.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-purple-100 font-semibold text-base transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group">
                  {data?.primaryBtn}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="h-12 px-8 rounded-full border-white/20 hover:bg-white/5 font-semibold text-base">
                  {data?.secondaryBtn}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={data?.imageUrl} 
                alt="Dr"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="glass-panel p-4 rounded-xl inline-flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{data?.experienceYears}</p>
                    <p className="text-sm text-purple-200">{data?.experienceText}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="container mx-auto px-4 py-20 max-w-7xl border-t border-white/5">
      <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
      {/* Əgər başlıq "İxtisaslaşdığım Sahələr" gəlirsə, son sözü bənövşəyi rəng edirik */}
      {data.focusSectionTitle?.split(' ').slice(0, -1).join(' ')}{' '}
      <span className="text-purple-400">
        {data.focusSectionTitle?.split(' ').slice(-1)}
      </span>
    </h2>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      {data.focusSectionDesc}
    </p>
  </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.focusAreas && data.focusAreas.map((item, i) => {
            // İkonu dinamik təyin et (Əgər admin-dən ikon adı gəlirsə)
            // Default olaraq Brain, Heart, MessageCircle dövr edir
            const icons = [Brain, Heart, MessageCircle];
            const IconComponent = icons[i % icons.length];

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl flex flex-col items-start group border border-white/5 bg-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">{item.desc}</p>
                <Link href="/services" className="mt-6 text-purple-400 text-sm font-medium hover:text-purple-300 flex items-center gap-1">
                  Daha ətraflı <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  );
}