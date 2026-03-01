import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5  backdrop-blur-lg pt-16 pb-8  relative overflow-hidden">
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dr. Ülviyyə Murtuzova. Bütün hüquqlar qorunur.</p>
        </div>
  
    </footer>
  );
}