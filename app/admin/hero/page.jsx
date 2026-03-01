"use client"
import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Plus, Trash2, Layout, Loader2, Sparkles } from 'lucide-react';

export default function HeroAdmin() {
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState({
    badge: "Yeni pasiyentlər qəbul olunur",
    title: "Aydınlığı Tap, Sağalmağa Başla.",
    description: "Sizin fərdi yolçuluğunuza uyğunlaşdırılmış, elmi əsaslı və qayğıkeş terapiya.",
    primaryBtn: "Məsləhət üçün yazılın",
    secondaryBtn: "Haqqımda daha çox",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    experienceYears: "10+",
    experienceText: "Klinik Təcrübə",
    focusSectionTitle: "İxtisaslaşdığım Sahələr",
    focusSectionDesc: "Həyatın ən mürəkkəb çətinliklərində sizə kömək edəcək peşəkar dəstək."
  });

  const [focusAreas, setFocusAreas] = useState([
    { title: "Təşviş və Depressiya", desc: "Kognitiv-davranış strategiyaları ilə narahatlıq..." },
    { title: "Münasibət Problemləri", desc: "Münaqişələri həll edin, ünsiyyəti gücləndirin..." },
    { title: "Travma və TSSP", desc: "Keçmiş yaraları sağaltmaq üçün təhlükəsiz metodlar..." }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocusAreaChange = (index, field, value) => {
    const newAreas = [...focusAreas];
    newAreas[index][field] = value;
    setFocusAreas(newAreas);
  };

  const addFocusArea = () => {
    setFocusAreas([...focusAreas, { title: "", desc: "" }]);
  };

  const removeFocusArea = (index) => {
    setFocusAreas(focusAreas.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          section: "hero", 
          data: { ...heroData, focusAreas } 
        }),
      });

      if (res.ok) {
        alert("Bütün məlumatlar uğurla yeniləndi!");
      } else {
        alert("Xəta baş verdi!");
      }
    } catch (error) {
      console.error(error);
      alert("Bağlantı xətası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20 p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Hero & Focus Redaktoru</h1>
          <p className="text-zinc-500 mt-1">Ana səhifə məzmununu tam dinamik idarə edin.</p>
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
        {/* SOL: Hero Mətnləri */}
        <div className="space-y-6">
          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4">
              <Layout size={20} /> Hero Bölməsi
            </h2>
            <div>
              <label className="text-xs text-zinc-500 uppercase mb-2 block">Üst Badge</label>
              <input name="badge" value={heroData.badge} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase mb-2 block">Əsas Başlıq</label>
              <textarea name="title" value={heroData.title} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white h-24 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase mb-2 block">Təsvir</label>
              <textarea name="description" value={heroData.description} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white h-32 outline-none focus:border-purple-500" />
            </div>
          </section>
        </div>

        {/* SAĞ: Focus Bölməsi Başlıqları & Media */}
        <div className="space-y-6">
          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4">
              <Sparkles size={20} /> Focus Bölməsi Başlıqları
            </h2>
            <div>
              <label className="text-xs text-zinc-500 uppercase mb-2 block">Bölmə Başlığı (H2)</label>
              <input name="focusSectionTitle" value={heroData.focusSectionTitle} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase mb-2 block">Bölmə Alt Mətni</label>
              <textarea name="focusSectionDesc" value={heroData.focusSectionDesc} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white h-20 outline-none focus:border-purple-500" />
            </div>
          </section>

          <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
             <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-300 mb-4">Şəkil URL</h2>
             <input name="imageUrl" value={heroData.imageUrl} onChange={handleChange} className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white outline-none" />
          </section>
        </div>
      </div>

      {/* Fokus Kartları */}
      <section className="bg-zinc-900/30 p-8 rounded-[2.5rem] border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Fokus Kartları (3-lü)</h2>
          <button onClick={addFocusArea} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-full border border-white/10 text-sm">
            <Plus size={16} /> Yeni Kart
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {focusAreas.map((item, index) => (
            <div key={index} className="bg-zinc-900 p-6 rounded-2xl border border-white/10 relative group">
              <button onClick={() => removeFocusArea(index)} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={14} />
              </button>
              <input placeholder="Başlıq" className="w-full bg-transparent text-lg font-bold mb-3 border-b border-white/5 focus:border-purple-500 outline-none pb-1" value={item.title} onChange={(e) => handleFocusAreaChange(index, "title", e.target.value)} />
              <textarea placeholder="Təsvir" className="w-full bg-transparent text-sm text-zinc-400 h-24 resize-none outline-none" value={item.desc} onChange={(e) => handleFocusAreaChange(index, "desc", e.target.value)} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}