"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, User, Briefcase, FileText, Phone, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Hero', icon: <FileText size={20} />, href: '/admin/hero' },
    { name: 'Haqqımda', icon: <User size={20} />, href: '/admin/about' },
    { name: 'Xidmətlər', icon: <Briefcase size={20} />, href: '/admin/services' },
    { name: 'Resurslar', icon: <FileText size={20} />, href: '/admin/resources' },
    { name: 'Əlaqə', icon: <Phone size={20} />, href: '/admin/contact' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-zinc-900/50">
        <div className="p-6">
          <h2 className="text-xl font-bold text-purple-500 tracking-tight">Dr. Valerie CMS</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-zinc-400 hover:text-white"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full py-2 text-sm text-zinc-500 hover:text-white transition-colors">Çıxış</button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full bg-zinc-900 border-b border-white/5 p-4 flex justify-between items-center z-50">
        <span className="font-bold text-purple-500">Dr. Valerie</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pt-20 md:pt-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col p-10 space-y-6 md:hidden">
           {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold text-zinc-300 flex items-center gap-4"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}