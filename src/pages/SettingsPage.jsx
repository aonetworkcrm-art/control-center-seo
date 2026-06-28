import { useState } from 'react'
import { Settings, Key, Globe, Bell, Database, Shield, RefreshCw, Eye, EyeOff, Check, Save, Trash2 } from 'lucide-react'

const SECTIONS = [
  {
    id: 'api',
    label: 'API Keys',
    icon: Key,
    fields: [
      { key: 'openrouter', label: 'OpenRouter API Key', type: 'password', placeholder: 'sk-or-v1-...' },
      { key: 'newsapi', label: 'NewsAPI Key', type: 'password', placeholder: 'tu-api-key' },
      { key: 'monetag', label: 'Monetag Site ID', type: 'text', placeholder: 'site-id' },
    ],
  },
  {
    id: 'deploy',
    label: 'Despliegue',
    icon: Globe,
    fields: [
      { key: 'vercel_token', label: 'Vercel Token', type: 'password', placeholder: 'token' },
      { key: 'github_token', label: 'GitHub PAT', type: 'password', placeholder: 'ghp_...' },
      { key: 'domain', label: 'Dominio Principal', type: 'text', placeholder: 'https://tu-dominio.com' },
    ],
  },
  {
    id: 'notifications',
    label: 'Notificaciones',
    icon: Bell,
    fields: [
      { key: 'telegram_token', label: 'Telegram Bot Token', type: 'password', placeholder: 'bot-token' },
      { key: 'telegram_chat', label: 'Telegram Chat ID', type: 'text', placeholder: '-100...' },
    ],
  },
]

const STORAGE_KEY = 'seo_infinito_config'

function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

export default function SettingsPage() {
  const [active, setActive] = useState('api')
  const [show, setShow] = useState({})
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    openrouter: '',
    newsapi: '',
    monetag: '',
    vercel_token: '',
    github_token: '',
    domain: '',
    telegram_token: '',
    telegram_chat: '',
    ...loadConfig(),
  })

  const updateField = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const toggleShow = (key) => {
    setShow(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConfig({
      openrouter: '', newsapi: '', monetag: '',
      vercel_token: '', github_token: '', domain: '',
      telegram_token: '', telegram_chat: '',
    })
  }

  const ActiveSection = SECTIONS.find(s => s.id === active)
  const ActiveIcon = ActiveSection?.icon

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">⚙️ Configuración</h1>
        <p className="text-xs text-zinc-500 mt-1">API Keys, despliegue y preferencias del sistema</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar settings */}
        <div className="w-56 space-y-1">
          {SECTIONS.map(s => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all ${
                  active === s.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Settings content */}
        <div className="flex-1 bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ActiveIcon size={16} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{ActiveSection?.label}</h3>
              <p className="text-[10px] text-zinc-500">Configura las credenciales para este módulo</p>
            </div>
          </div>

          <div className="space-y-4">
            {ActiveSection?.fields.map(field => (
              <div key={field.key}>
                <label className="text-xs text-zinc-400 mb-2 block">{field.label}</label>
                <div className="relative">
                  <input
                    type={field.type === 'password' && !show[field.key] ? 'password' : 'text'}
                    value={config[field.key]}
                    onChange={e => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2.5 pr-10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                  />
                  {field.type === 'password' && (
                    <button
                      onClick={() => toggleShow(field.key)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {show[field.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-all"
            >
              {saved ? <Check size={14} /> : <Save size={14} />}
              {saved ? 'Guardado' : 'Guardar Configuración'}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-all"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">ℹ️ Información del Sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Versión', value: '1.0.0' },
            { label: 'Frontend', value: 'React 19 + Vite' },
            { label: 'Backend', value: 'FastAPI (Python 3.12)' },
            { label: 'Base de Datos', value: 'TinyDB + JSON' },
          ].map(info => (
            <div key={info.label}>
              <p className="text-[9px] uppercase text-zinc-600 mb-1">{info.label}</p>
              <p className="text-xs text-zinc-300 font-mono">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
