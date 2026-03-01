"use client"
import React, { useState, useEffect } from 'react';
import { Save, MapPin, Clock, Phone, Mail, Image as ImageIcon, Loader2, Layout } from 'lucide-react';

export default function ContactAdmin() {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    title: "Bizimlə Əlaqə",
    description: "Rezervasiyadan öncə suallarınız var? Ofislə əlaqə saxlayın.",
    addressTitle: "Ofis Ünvanı",
    addressLine1: "Wellness prospekti 123, Suite 400",
    addressLine2: "Bakı, Azərbaycan",
    hoursTitle: "İş Saatları",
    hoursLine1: "Bazar ertəsi - Cümə: 09:00 - 18:00",
    hoursLine2: "Şənbə - Bazar: Bağlıdır",
    contactTitle: "Əlaqə Məlumatları",
    phone: "+994 (50) 123-45-67",
    email: "hello@drvalerie.com",
    ctaTitle: "Başlamağa hazırsınız?",
    ctaBtnText: "Rezervasiya Formuna Keçid",
    ctaBgUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: contactData }),
      });
      if (res.ok) alert("Əlaqə məlumatları yeniləndi!");
      else alert("Xəta baş verdi!");
    } catch (error) {
      console.error(error);
      alert("Bağlantı xətası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20 p-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Əlaqə Səhifəsi Redaktoru</h1>
          <p className="text-zinc-500 mt-1">Bütün əlaqə vasitələrini və mətnləri idarə edin.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={20} />}
          Yadda Saxla
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* SOL: Ümumi Mətnlər və Ünvan */}
        <div className="space-y-6">
          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4"><Layout size={20}/> Giriş Mətnləri</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-xs text-zinc-500 uppercase mb-2 block">Səhifə Başlığı</label>
                <input name="title" value={contactData.title} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 uppercase mb-2 block">Alt Mətn (Description)</label>
                <textarea name="description" value={contactData.description} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white h-20 outline-none focus:border-purple-500" />
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-400 mb-4"><MapPin size={20}/> Ünvan və Saatlar</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Ünvan Sətr 1</label>
                <input name="addressLine1" value={contactData.addressLine1} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Ünvan Sətr 2</label>
                <input name="addressLine2" value={contactData.addressLine2} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">İş Saatları 1</label>
                <input name="hoursLine1" value={contactData.hoursLine1} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">İş Saatları 2</label>
                <input name="hoursLine2" value={contactData.hoursLine2} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
            </div>
          </section>
        </div>

        {/* SAĞ: Əlaqə və CTA blok */}
        <div className="space-y-6">
          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-green-400 mb-4"><Phone size={20}/> Kontakt Məlumatları</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Telefon</label>
                <input name="phone" value={contactData.phone} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">E-poçt</label>
                <input name="email" value={contactData.email} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-400 mb-4"><ImageIcon size={20}/> CTA Bloqu (Sağ Tərəf)</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Başlıq</label>
                <input name="ctaTitle" value={contactData.ctaTitle} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Şəkil URL</label>
                <input name="ctaBgUrl" value={contactData.ctaBgUrl} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}