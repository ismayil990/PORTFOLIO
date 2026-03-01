"use client"
import { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Video, Link as LinkIcon, Loader2 } from "lucide-react";

export default function ResourcesAdmin() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({ title: "", url: "", type: "Məqalə" });

  useEffect(() => { 
    fetchResources(); 
  }, []);

  const fetchResources = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/resources");
      const data = await res.json();
      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Yükləmə xətası:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/admin/resources", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setFormData({ title: "", url: "", type: "Məqalə" });
      fetchResources(); // Siyahını yenilə
    } catch (err) {
      alert("Əlavə edilərkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    if (!confirm("Bu resursu silmək istədiyinizdən əminsiniz?")) return;

    try {
      const res = await fetch(`/api/admin/resources?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setResources(resources.filter(r => r.id !== id)); // Siyahıdan dərhal çıxar
      }
    } catch (err) {
      alert("Silinərkən xəta baş verdi");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Resursların İdarə Edilməsi</h1>

      {/* FORM HİSSƏSİ */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            placeholder="Məqalə və ya Resurs Başlığı" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="bg-zinc-800 border-white/5 p-3 rounded-xl outline-none focus:ring-2 ring-purple-500 transition-all"
            required
          />
          <select 
            value={formData.type} 
            onChange={e => setFormData({...formData, type: e.target.value})}
            className="bg-zinc-800 border-white/5 p-3 rounded-xl outline-none cursor-pointer"
          >
            <option value="Məqalə">Məqalə</option>
            <option value="PDF">PDF Bələdçi</option>
            <option value="Video">Video Dərs</option>
          </select>
        </div>
        <input 
          placeholder="Resursun URL-i (https://...)" 
          value={formData.url} 
          onChange={e => setFormData({...formData, url: e.target.value})}
          className="w-full bg-zinc-800 border-white/5 p-3 rounded-xl outline-none focus:ring-2 ring-purple-500 transition-all"
          required
        />
        <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <><Plus size={20} /> Yadda Saxla</>}
        </button>
      </form>

      {/* SİYAHI HİSSƏSİ */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold opacity-70">Mövcud Resurslar</h2>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-purple-500" /></div>
        ) : resources.length === 0 ? (
          <p className="text-zinc-500 italic">Hələ heç bir resurs əlavə edilməyib.</p>
        ) : (
          resources.map(res => (
            <div key={res.id} className="flex items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  {res.type === "Video" ? <Video size={22}/> : res.type === "PDF" ? <FileText size={22}/> : <LinkIcon size={22}/>}
                </div>
                <div>
                  <p className="font-medium text-zinc-100">{res.title}</p>
                  <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-xs">{res.url}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 mr-2 uppercase">{res.type}</span>
                <button 
                  onClick={() => deleteResource(res.id)}
                  className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-xl transition-all"
                  title="Sil"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}