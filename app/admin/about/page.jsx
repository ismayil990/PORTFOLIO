"use client"
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, User, GraduationCap, Loader2 } from 'lucide-react';

export default function AdminAbout() {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState({
    title: "", subtitle: "", imageUrl: "", approachTitle: "",
    approachText1: "", approachText2: "", skillsTitle: "",
    skills: [], buttonText: ""
  });

  useEffect(() => {
    fetch('/api/admin/about').then(res => res.json()).then(data => {
      if (data.id) setAbout(data);
    });
  }, []);

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...about.skills];
    newSkills[index] = value;
    setAbout({ ...about, skills: newSkills });
  };

  const addSkill = () => setAbout({ ...about, skills: [...about.skills, ""] });
  const removeSkill = (index) => setAbout({ ...about, skills: about.skills.filter((_, i) => i !== index) });

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/about', {
      method: 'POST',
      body: JSON.stringify(about),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) alert("Haqqımda bölməsi yeniləndi!");
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold">Haqqımda İdarəetmə</h1>
        <button onClick={handleSubmit} disabled={loading} className="bg-purple-600 px-6 py-2 rounded-xl flex items-center gap-2">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Yadda Saxla
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Giriş Hissəsi */}
        <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <h2 className="flex items-center gap-2 text-purple-400 font-semibold"><User size={20}/> Başlıq və Şəkil</h2>
          <input name="title" value={about.title} onChange={handleChange} placeholder="Ana Başlıq" className="w-full bg-zinc-800 p-3 rounded-lg outline-none border border-white/10 focus:border-purple-500" />
          <textarea name="subtitle" value={about.subtitle} onChange={handleChange} placeholder="Alt Başlıq" className="w-full bg-zinc-800 p-3 rounded-lg h-24 border border-white/10" />
          <input name="imageUrl" value={about.imageUrl} onChange={handleChange} placeholder="Şəkil URL" className="w-full bg-zinc-800 p-3 rounded-lg border border-white/10" />
        </div>

        {/* Yanaşma Hissəsi */}
        <div className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <h2 className="text-purple-400 font-semibold">Yanaşma Mətni</h2>
          <input name="approachTitle" value={about.approachTitle} onChange={handleChange} placeholder="Yanaşma Başlığı" className="w-full bg-zinc-800 p-3 rounded-lg border border-white/10" />
          <textarea name="approachText1" value={about.approachText1} onChange={handleChange} placeholder="Paraqraf 1" className="w-full bg-zinc-800 p-3 rounded-lg h-24 border border-white/10" />
          <textarea name="approachText2" value={about.approachText2} onChange={handleChange} placeholder="Paraqraf 2" className="w-full bg-zinc-800 p-3 rounded-lg h-24 border border-white/10" />
        </div>
      </div>

      {/* İxtisaslar Siyahısı */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-purple-400 font-semibold"><GraduationCap size={20}/> İxtisas və Təcrübə</h2>
          <button onClick={addSkill} className="text-xs bg-zinc-800 px-3 py-1 rounded-md border border-white/10 hover:bg-zinc-700">+ Əlavə et</button>
        </div>
        <div className="grid gap-3">
          {about.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} className="flex-grow bg-zinc-800 p-2 rounded-lg border border-white/10" placeholder="Məs: Stanford Universiteti, Ph.D." />
              <button onClick={() => removeSkill(index)} className="text-red-500 p-2"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}