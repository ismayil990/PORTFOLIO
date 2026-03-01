"use client"
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Layout, Tag, DollarSign, Loader2 } from 'lucide-react';

export default function AdminServices() {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({ mainTitle: "", subDescription: "" });
  const [services, setServices] = useState([]);

  // Datanı bazadan çəkmək
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.config) setConfig(data.config);
      if (data.services) setServices(data.services);
    };
    fetchData();
  }, []);

  // Yeni xidmət əlavə et
  const addService = () => {
    setServices([...services, { title: "", price: "", description: ""}]);
  };

  // Xidməti sil
  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Xidmət daxilində dəyişiklik
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };


  // BAZAYA YADDA SAXLA
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, services }),
      });
      if (res.ok) alert("Xidmətlər uğurla yeniləndi!");
    } catch (error) {
      alert("Xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Xidmətlər</h1>
          <p className="text-zinc-500 mt-1">Terapiya paketlərini və qiymətləri idarə et.</p>
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

      {/* Səhifə Başlıqları */}
      <section className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-purple-400">
          <Layout size={20} /> Səhifə Başlığı
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            placeholder="Əsas Başlıq"
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            value={config.mainTitle}
            onChange={(e) => setConfig({...config, mainTitle: e.target.value})}
          />
          <input 
            placeholder="Alt Təsvir"
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            value={config.subDescription}
            onChange={(e) => setConfig({...config, subDescription: e.target.value})}
          />
        </div>
      </section>

      {/* Xidmətlərin Siyahısı */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Xidmət Paketləri</h2>
          <button 
            onClick={addService}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg border border-white/10 text-sm transition-colors"
          >
            <Plus size={16} /> Yeni Paket
          </button>
        </div>

        {services.map((service, index) => (
          <div key={index} className="bg-zinc-900/40 p-6 md:p-8 rounded-[2rem] border border-white/5 relative group">
            <button 
              onClick={() => removeService(index)}
              className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-500 ml-1">Xidmət Adı</label>
                    <input 
                      className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-500 ml-1">Qiymət və Müddət</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 text-zinc-500" size={14} />
                      <input 
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-purple-500"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-500 ml-1">Təsvir</label>
                  <textarea 
                    className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 h-24 outline-none focus:border-purple-500"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                  />
                </div>

              </div>

              {/* Ön Baxış (Preview) */}
              <div className="bg-zinc-950/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-600 mb-4 block text-center uppercase tracking-widest">Kart Ön Baxış</span>
                <h4 className="text-lg font-bold text-white mb-2">{service.title || "Adsız"}</h4>
                <p className="text-xs text-zinc-500 line-clamp-3">{service.description || "Təsvir yoxdur..."}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-purple-400 font-bold text-sm">{service.price || "0 AZN"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}