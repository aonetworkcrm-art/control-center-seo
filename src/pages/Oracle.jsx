import { useState, useEffect } from 'react'
import { Radar, Globe, AlertTriangle, TrendingUp, DollarSign, RefreshCw, Search, Hash, MapPin } from 'lucide-react'

export default function Oracle() {
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('trends')

  const runScan = async () => {
    setScanning(true)
    try {
      const res = await fetch('/api/osint/scan')
      const data = await res.json()
      setResults(data)
    } catch (e) {
      console.error(e)
    }
    setScanning(false)
  }

  const severityColor = (s) => {
    const map = { critical: 'text-red-400', warning: 'text-amber-400', watch: 'text-yellow-400', info: 'text-blue-400' }
    return map[s] || 'text-zinc-400'
  }

  const severityBg = (s) => {
    const map = { critical: 'bg-red-500/10 border-red-500/20', warning: 'bg-amber-500/10 border-amber-500/20', watch: 'bg-yellow-500/10 border-yellow-500/20', info: 'bg-blue-500/10 border-blue-500/20' }
    return map[s] || 'bg-zinc-500/10 border-zinc-500/20'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🜁 Oráculo</h1>
          <p className="text-xs text-zinc-500 mt-1">Detección de tendencias en tiempo real — Google · YouTube · TikTok</p>
        </div>
        <button
          onClick={runScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={scanning ? 'animate-spin' : ''} />
          {scanning ? 'Escaneando...' : 'Escanear Ahora'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#1a1a1a] rounded-xl p-1">
        {[
          { id: 'trends', label: 'Tendencias', icon: TrendingUp },
          { id: 'niches', label: 'Nichos CPC', icon: DollarSign },
          { id: 'signals', label: 'Señales OSINT', icon: Radar },
        ].map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all ${
                activeTab === t.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Señales Críticas', value: results?.critical_count || 0, color: 'text-red-400' },
              { label: 'Alertas', value: results?.warning_count || 0, color: 'text-amber-400' },
              { label: 'Total Señales', value: results?.total_signals || 0, color: 'text-cyan-400' },
            ].map(s => (
              <div key={s.label} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{s.label}</p>
                <p className={`text-3xl font-bold ${s.color}`}>{scanning ? '...' : s.value}</p>
              </div>
            ))}
          </div>

          {/* Opportunities */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">💰 Oportunidades de Contenido por CPC</h3>
            <div className="space-y-2">
              {results?.content_opportunities?.slice(0, 8).map((opp, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${severityBg(opp.severity)}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{opp.type === 'earthquake' ? '🌍' : opp.type === 'news_trend' ? '📰' : '🔥'}</span>
                    <div>
                      <p className="text-xs text-white font-medium">{opp.title?.slice(0, 80)}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        {opp.country && `${opp.country} · `}
                        {opp.age_minutes < 60 ? `${Math.round(opp.age_minutes)} min` : `${Math.round(opp.age_minutes / 60)}h`} ago
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">${opp.cpc}</p>
                    <p className="text-[9px] text-zinc-500">CPC</p>
                  </div>
                </div>
              ))}
              {!results && !scanning && (
                <p className="text-xs text-zinc-500 text-center py-8">Presiona "Escanear Ahora" para detectar tendencias</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'niches' && (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">🏆 Ranking de Nichos por Rentabilidad</h3>
          <NicheRanking />
        </div>
      )}

      {activeTab === 'signals' && (
        <div className="space-y-4">
          {results?.signals && Object.entries(results.signals).map(([type, signals]) => (
            <div key={type} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 capitalize">
                {type === 'earthquake' ? '🌍 Sismos' : type === 'news_trend' ? '📰 Noticias' : '✈️ Vuelos'}
                <span className="text-zinc-500 ml-2 text-[10px]">({signals.length})</span>
              </h3>
              <div className="space-y-2">
                {signals.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${severityColor(s.severity)}`}>
                        {s.severity === 'critical' ? '🔴' : s.severity === 'warning' ? '🟡' : '🟢'}
                      </span>
                      <p className="text-xs text-zinc-300">{s.title?.slice(0, 70)}</p>
                    </div>
                    {s.cpc_opportunity && (
                      <span className="text-[10px] text-emerald-400 font-mono">${s.cpc_opportunity}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!results && !scanning && (
            <p className="text-xs text-zinc-500 text-center py-8">Escanea para ver señales en vivo</p>
          )}
        </div>
      )}
    </div>
  )
}

function NicheRanking() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/seo/ranking')
      .then(r => r.json())
      .then(d => setData(d.ranking || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-xs text-zinc-500">Cargando...</p>

  // Si hay datos del API, construir tabla dinámica
  if (data && data.length > 0) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left text-zinc-500 font-medium py-3 px-2">#</th>
              <th className="text-left text-zinc-500 font-medium py-3 px-2">Nicho</th>
              <th className="text-right text-zinc-500 font-medium py-3 px-2">CPC</th>
              <th className="text-right text-zinc-500 font-medium py-3 px-2">Score</th>
              <th className="text-right text-zinc-500 font-medium py-3 px-2">Dificultad</th>
              <th className="text-right text-zinc-500 font-medium py-3 px-2">Evergreen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((n, i) => (
              <tr key={i} className="border-b border-[#1a1a1a] hover:bg-white/5 transition-all">
                <td className="py-3 px-2 text-zinc-500">{i + 1}</td>
                <td className="py-3 px-2 text-white font-medium">{n.name}</td>
                <td className="py-3 px-2 text-right text-emerald-400 font-mono">${n.cpc_avg}</td>
                <td className="py-3 px-2 text-right text-cyan-400 font-mono">{n.profitability_score?.toLocaleString()}</td>
                <td className="py-3 px-2 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    n.difficulty === 'muy_alta' ? 'bg-red-500/10 text-red-400' :
                    n.difficulty === 'alta' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>{n.difficulty?.replace('_', ' ')}</span>
                </td>
                <td className="py-3 px-2 text-right text-zinc-400">{n.evergreen}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <NicheTable />
}

function NicheTable() {
  const niches = [
    { name: 'Abogados Accidentes', cpc: 220, score: 17600, difficulty: 'muy_alta', evergreen: 10 },
    { name: 'Recup. Activos', cpc: 125, score: 5625, difficulty: 'alta', evergreen: 9 },
    { name: 'Ciberseguridad', cpc: 170, score: 7650, difficulty: 'alta', evergreen: 9 },
    { name: 'Rehabilitación', cpc: 120, score: 9600, difficulty: 'muy_alta', evergreen: 10 },
    { name: 'Seguro Vida Mayores', cpc: 95, score: 8550, difficulty: 'alta', evergreen: 9 },
    { name: 'MBA Online', cpc: 100, score: 4000, difficulty: 'media', evergreen: 8 },
    { name: 'Seguro Auto Alto Riesgo', cpc: 105, score: 8400, difficulty: 'alta', evergreen: 9 },
    { name: 'Inversiones DeFi', cpc: 85, score: 2975, difficulty: 'media', evergreen: 7 },
    { name: 'Mesotelioma', cpc: 150, score: 1500, difficulty: 'muy_alta', evergreen: 10 },
    { name: 'Ciberseguridad Empresarial', cpc: 120, score: 8640, difficulty: 'alta', evergreen: 9 },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#1a1a1a]">
            <th className="text-left text-zinc-500 font-medium py-3 px-2">#</th>
            <th className="text-left text-zinc-500 font-medium py-3 px-2">Nicho</th>
            <th className="text-right text-zinc-500 font-medium py-3 px-2">CPC</th>
            <th className="text-right text-zinc-500 font-medium py-3 px-2">Score</th>
            <th className="text-right text-zinc-500 font-medium py-3 px-2">Dificultad</th>
            <th className="text-right text-zinc-500 font-medium py-3 px-2">Evergreen</th>
          </tr>
        </thead>
        <tbody>
          {niches.map((n, i) => (
            <tr key={i} className="border-b border-[#1a1a1a] hover:bg-white/5 transition-all">
              <td className="py-3 px-2 text-zinc-500">{i + 1}</td>
              <td className="py-3 px-2 text-white font-medium">{n.name}</td>
              <td className="py-3 px-2 text-right text-emerald-400 font-mono">${n.cpc}</td>
              <td className="py-3 px-2 text-right text-cyan-400 font-mono">{n.score.toLocaleString()}</td>
              <td className="py-3 px-2 text-right">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  n.difficulty === 'muy_alta' ? 'bg-red-500/10 text-red-400' :
                  n.difficulty === 'alta' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-emerald-500/10 text-emerald-400'
                }`}>{n.difficulty.replace('_', ' ')}</span>
              </td>
              <td className="py-3 px-2 text-right text-zinc-400">{n.evergreen}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
