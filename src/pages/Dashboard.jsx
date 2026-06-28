import { useState, useEffect } from 'react'
import { TrendingUp, Users, Eye, DollarSign, Activity, Zap, Globe, Target, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'



const mockChart = [
  { name: 'Ene', valor: 1200 }, { name: 'Feb', valor: 1900 }, { name: 'Mar', valor: 2800 },
  { name: 'Abr', valor: 3200 }, { name: 'May', valor: 4100 }, { name: 'Jun', valor: 5200 },
  { name: 'Jul', valor: 6100 }, { name: 'Ago', valor: 5800 }, { name: 'Sep', valor: 7200 },
  { name: 'Oct', valor: 8900 }, { name: 'Nov', valor: 10400 }, { name: 'Dic', valor: 12800 },
]

const nichesChart = [
  { name: 'Abogados Accidentes', cpc: 220, vol: 95 },
  { name: 'Recup. Activos', cpc: 125, vol: 65 },
  { name: 'Ciberseguridad', cpc: 170, vol: 50 },
  { name: 'Rehabilitación', cpc: 120, vol: 88 },
  { name: 'Seguro Vida', cpc: 95, vol: 92 },
  { name: 'MBA Online', cpc: 100, vol: 72 },
]

export default function Dashboard({ navigate }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setRefreshing(true)
    try {
      const [ranking, opps] = await Promise.all([
        fetch('/api/seo/ranking').then(r => r.json()).catch(() => null),
        fetch('/api/osint/opportunities').then(r => r.json()).catch(() => null),
      ])
      setData({ ranking, opps })
    } catch (e) {
      console.error('Dashboard fetch error:', e)
    }
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => { fetchData() }, [])

  const rankingData = data?.ranking?.ranking || []
  const avgCpc = rankingData.length > 0
    ? Math.round(rankingData.reduce((s, n) => s + (n.cpc_avg || 0), 0) / rankingData.length)
    : 0
  const topCpc = rankingData.length > 0 ? Math.max(...rankingData.map(n => n.cpc_avg || 0)) : 0

  const statCards = [
    { label: 'Nichos Disponibles', value: rankingData.length || 0, icon: Eye, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'CPC Promedio', value: loading ? '...' : `$${avgCpc}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Top CPC', value: loading ? '...' : `$${topCpc}`, icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Score Máximo', value: loading ? '...' : rankingData[0]?.profitability_score?.toLocaleString() || 0, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[10px] md:text-xs text-zinc-500 mt-0.5">Panel de control central — SEO Infinito</p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] md:text-xs hover:bg-emerald-500/20 transition-all disabled:opacity-50 w-full sm:w-auto"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {statCards.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-3 md:p-5 hover:border-zinc-700/50 transition-all">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500">{s.label}</span>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon size={12} className={s.color} />
                </div>
              </div>
              <p className="text-lg md:text-2xl font-bold text-white truncate">{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs md:text-sm font-semibold text-white">Proyección de Ingresos</h3>
            <span className="text-[8px] md:text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">+22.5%</span>
          </div>
          <div className="w-full h-[180px] md:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChart}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #27272a', borderRadius: 8, color: '#fff' }} />
                <Area type="monotone" dataKey="valor" stroke="#10b981" fill="url(#colorVal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs md:text-sm font-semibold text-white">CPC por Nicho</h3>
            <span className="text-[8px] md:text-[10px] text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded">Top 6</span>
          </div>
          <div className="w-full h-[180px] md:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nichesChart} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#52525b', fontSize: 10 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 8 }} width={100} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #27272a', borderRadius: 8, color: '#fff' }} formatter={(value) => [`$${value}`, 'CPC']} />
                <Bar dataKey="cpc" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {[
          { icon: Zap, label: 'Escaneo OSINT', desc: 'Detectar tendencias ahora', color: 'text-amber-400', page: 'oracle' },
          { icon: Globe, label: 'Generar Contenido', desc: 'Crear artículos SEO', color: 'text-emerald-400', page: 'content' },
          { icon: Target, label: 'Mis Campañas', desc: 'Gestionar campañas activas', color: 'text-cyan-400', page: 'campaigns' },
        ].map(a => {
          const Icon = a.icon
          return (
            <button
              key={a.label}
              onClick={() => navigate && navigate(a.page)}
              className="bg-[#111] border border-[#1a1a1a] rounded-xl p-3 md:p-4 text-left hover:border-zinc-700/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <Icon size={16} className={a.color} />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-white">{a.label}</p>
                  <p className="text-[8px] md:text-[10px] text-zinc-500">{a.desc}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
