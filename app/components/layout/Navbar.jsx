"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ana səhifə", path: "#home" },
    { name: "Haqqımda", path: "#about" },
    { name: "Xidmətlər", path: "#services" },
    { name: "Məqalələr", path: "#resources" },
    { name: "Əlaqə", path: "#contact" },
  ];

  // Skrol edib menyunu bağlamaq üçün köməkçi funksiya
  const handleLinkClick = (e, path) => {
    setMobileMenuOpen(false);
    // Əgər ana səhifədəyiksə, skrol etsin
    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-black/80 backdrop-blur-lg py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-[70]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-display font-bold text-lg">
                D
              </div>
              <span className="font-display font-semibold text-xl text-white">
                Dr. Ülviyyə<span className="text-purple-500">.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className="text-sm font-medium transition-colors text-zinc-400 hover:text-purple-400 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a href="/booking">
                <Button className="rounded-full px-6 bg-white text-black hover:bg-purple-100 transition-all">
                 Rezervasiya
                </Button>
              </a>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobil Menyu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-2xl border-t border-white/5 py-8 px-6 flex flex-col gap-5 md:hidden shadow-2xl z-[55]"
            >
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className="text-lg font-medium py-2 border-b border-white/5 text-zinc-400 hover:text-purple-400 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a href="/booking" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full py-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg">
                  Rezervasiya Et
                </Button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}