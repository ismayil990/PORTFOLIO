export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Xoş gəldiniz, Dr. Valerie</h1>
        <p className="text-zinc-500">Saytın məzmununu buradan idarə edə bilərsiniz.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Xidmətlər', count: 8, color: 'bg-purple-500/10 text-purple-500' },
          { label: 'Resurslar', count: 15, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Son Yenilənmə', count: 'Bu gün', color: 'bg-green-500/10 text-green-500' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border border-white/5 bg-zinc-900/40`}>
            <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.count}</p>
          </div>
        ))}
      </div>
      
      <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
        <p className="text-zinc-400 mb-4">Sürətli keçid üçün soldakı menyudan bir bölmə seçin.</p>
      </div>
    </div>
  );
}