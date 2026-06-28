import { useState } from 'react'
import { Send, Plus, Play, Pause, Trash2, Globe, TrendingUp, Eye, DollarSign, BarChart3 } from 'lucide-react'

const MOCK_CAMPAIGNS = [
  { id: 1, name: 'Terremoto Venezuela', niche: 'personal-injury-law', status: 'active', nodes: 5, traffic: 12400, revenue: 2450, cpc: 85 },
  { id: 2, name: 'Abogados Accidentes', niche: 'personal-injury-law', status: 'active', nodes: 12, traffic: 45600, revenue: 12500, cpc: 220 },
  { id: 3, name: 'Recuperación Crypto', niche: 'asset-recovery', status: 'paused', nodes: 3, traffic: 8900, revenue: 1780, cpc: 125 },
  { id: 4, name: 'Seguro Vida Mayores', niche: 'life-insurance-seniors', status: 'draft', nodes: 0, traffic: 0, revenue: 0, cpc: 95 },
]

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS)
  const [activeTab, setActiveTab] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [newCampaign, setNewCampaign] = useState({ name: '', niche: 'personal-injury-law', cpc: 100 })

  const toggleStatus = (id) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
    ))
  }

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id))
  }

  const createCampaign = (e) => {
    e.preventDefault()
    if (!newCampaign.name.trim()) return
    const id = Math.max(...campaigns.map(c => c.id), 0) + 1
    setCampaigns(prev => [...prev, {
      id,
      name: newCampaign.name,
      niche: newCampaign.niche,
      status: 'draft',
      nodes: 0,
      traffic: 0,
      revenue: 0,
      cpc: newCampaign.cpc,
    }])
    setShowModal(false)
    setNewCampaign({ name: '', niche: 'personal-injury-law', cpc: 100 })
  }

  const filtered = activeTab === 'all' ? campaigns : campaigns.filter(c => c.status === activeTab)

  const totalTraffic = campaigns.reduce((s, c) => s + c.traffic, 0)
  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">🚀 Campañas</h1>
          <p className="text-[10px] md:text-xs text-zinc-500 mt-0.5">Gestiona tus campañas de contenido en vivo</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] md:text-xs hover:bg-emerald-500/20 transition-all w-full sm:w-auto"
        >
          <Plus size={14} />
          Nueva Campaña
        </button>
      </div>

      {/* Create Campaign Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowModal(false)}>
          <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 md:p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-white mb-4">Nueva Campaña</h3>
            <form onSubmit={createCampaign} className="space-y-4">
              <div>
                <label className="text-[10px] md:text-xs text-zinc-400 mb-1.5 block">Nombre</label>
                <input
                  value={newCampaign.name}
                  onChange={e => setNewCampaign(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ej: Campaña Terremoto México"
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] md:text-xs text-zinc-400 mb-1.5 block">Nicho</label>
                <select
                  value={newCampaign.niche}
                  onChange={e => setNewCampaign(p => ({ ...p, niche: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="personal-injury-law">Abogados Accidentes</option>
                  <option value="asset-recovery">Recuperación Activos</option>
                  <option value="cybersecurity-compliance">Ciberseguridad</option>
                  <option value="drug-rehab">Rehabilitación</option>
                  <option value="life-insurance-seniors">Seguro Vida</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] md:text-xs text-zinc-400 mb-1.5 block">CPC Estimado</label>
                <input
                  type="number"
                  value={newCampaign.cpc}
                  onChange={e => setNewCampaign(p => ({ ...p, cpc: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-3 py-2 rounded-lg border border-[#1a1a1a] text-zinc-400 text-xs hover:bg-white/5">Cancelar</button>
                <button type="submit" className="flex-1 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Campañas Activas', value: campaigns.filter(c => c.status === 'active').length, icon: Play, color: 'text-emerald-400' },
          { label: 'Tráfico Total', value: totalTraffic.toLocaleString(), icon: Eye, color: 'text-blue-400' },
          { label: 'Ingresos Est.', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-400' },
          { label: 'CPC Promedio', value: `$${Math.round(campaigns.reduce((s, c) => s + c.cpc, 0) / campaigns.length)}`, icon: TrendingUp, color: 'text-cyan-400' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">{s.label}</span>
                <Icon size={14} className={s.color} />
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#1a1a1a] rounded-xl p-1">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'active', label: 'Activas' },
          { id: 'paused', label: 'En Pausa' },
          { id: 'draft', label: 'Borradores' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-xs transition-all ${
              activeTab === t.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Campaign list */}
      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 hover:border-zinc-700/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  c.status === 'active' ? 'bg-emerald-500' :
                  c.status === 'paused' ? 'bg-amber-500' : 'bg-zinc-500'
                }`} />
                <div>
                  <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                  <p className="text-[10px] text-zinc-500 capitalize">{c.niche.replace(/-/g, ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(c.id)}
                  className={`p-2 rounded-lg transition-all ${
                    c.status === 'active'
                      ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  {c.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button onClick={() => deleteCampaign(c.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-[9px] uppercase text-zinc-600 mb-1">Nodos</p>
                <p className="text-sm font-semibold text-white">{c.nodes}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-zinc-600 mb-1">Tráfico</p>
                <p className="text-sm font-semibold text-blue-400">{c.traffic.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-zinc-600 mb-1">Revenue</p>
                <p className="text-sm font-semibold text-emerald-400">${c.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-zinc-600 mb-1">CPC</p>
                <p className="text-sm font-semibold text-cyan-400">${c.cpc}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-zinc-500 text-center py-8">No hay campañas en esta categoría</p>
        )}
      </div>
    </div>
  )
}
