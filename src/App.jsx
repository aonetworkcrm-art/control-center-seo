import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Radar, FileText, Send, Settings, LogOut, Zap,
  TrendingUp, Menu, X, ChevronRight
} from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Oracle from './pages/Oracle'
import ContentGen from './pages/ContentGen'
import Campaigns from './pages/Campaigns'
import Pipeline from './pages/Pipeline'
import SettingsPage from './pages/SettingsPage'
import Login from './pages/Login'
import { adminVerify } from './api'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'oracle', label: 'Oráculo', icon: Radar },
  { id: 'content', label: 'Contenido', icon: FileText },
  { id: 'pipeline', label: 'Pipeline ⚡', icon: Zap },
  { id: 'campaigns', label: 'Campañas', icon: Send },
  { id: 'settings', label: 'Config', icon: Settings },
]

export default function App() {
  const [authenticated, setAuthenticated] = useState(null) // null = checking
  const [page, setPage] = useState('dashboard')
  const [sidebar, setSidebar] = useState(true)
  const [status, setStatus] = useState(null)

  // Verificar token contra el servidor al montar
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setAuthenticated(false)
      return
    }
    adminVerify()
      .then(() => setAuthenticated(true))
      .catch(() => {
        localStorage.removeItem('admin_token')
        setAuthenticated(false)
      })
  }, [])

  useEffect(() => {
    fetch('/api/status')
      .then(r => r.json())
      .then(setStatus)
      .catch(() => setStatus({ status: 'offline' }))
  }, [])

  const handleLogin = () => setAuthenticated(true)
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAuthenticated(false)
  }

  // Mostrar pantalla de carga mientras se verifica el token
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs text-zinc-500">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <Login onLogin={handleLogin} />
  }

  const PageComponent = {
    dashboard: Dashboard,
    oracle: Oracle,
    content: ContentGen,
    pipeline: Pipeline,
    campaigns: Campaigns,
    settings: SettingsPage,
  }[page]

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#d4d4d8]">
      {/* Sidebar */}
      <aside className={`${sidebar ? 'w-64' : 'w-0'} transition-all duration-300 bg-[#111] border-r border-[#1a1a1a] flex flex-col overflow-hidden flex-shrink-0`}>
        <div className="p-5 border-b border-[#1a1a1a] min-w-64">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">SI</div>
            <div>
              <h1 className="text-sm font-bold text-white">SEO Infinito</h1>
              <p className="text-[10px] text-zinc-500">Control Center v1.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 min-w-64">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all ${
                  active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-emerald-500" />}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#1a1a1a] min-w-64">
          <div className="flex items-center gap-2 text-[10px] text-zinc-600">
            <div className={`w-1.5 h-1.5 rounded-full ${status?.status === 'operational' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            API: {status?.status || 'checking...'}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-12 border-b border-[#1a1a1a] flex items-center px-4 gap-3 bg-[#0d0d0d]">
          <button onClick={() => setSidebar(!sidebar)} className="text-zinc-400 hover:text-white">
            {sidebar ? <X size={16} /> : <Menu size={16} />}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-zinc-500">Sistema operativo</span>
            <span className="text-emerald-400">● {new Date().toLocaleTimeString()}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={12} />
              Salir
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <PageComponent navigate={setPage} />
        </main>
      </div>
    </div>
  )
}
