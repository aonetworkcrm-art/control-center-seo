import { useState } from 'react'
import { KeyRound, Eye, EyeOff, Shield } from 'lucide-react'
import { adminLogin } from '../api'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Ingresa la clave de administrador')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await adminLogin(password)
      localStorage.setItem('admin_token', res.token)
      onLogin()
    } catch (err) {
      setError(err.message || 'Clave incorrecta')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            SI
          </div>
          <h1 className="text-xl font-bold text-white">SEO Infinito</h1>
          <p className="text-xs text-zinc-500 mt-1">Panel de Control</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <Shield size={14} className="text-emerald-400" />
            <span>Acceso restringido</span>
          </div>

          <div>
            <label className="text-xs text-zinc-500 mb-2 block">Clave de Administrador</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2.5 pr-10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {error && (
              <p className="text-[10px] text-red-400 mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs transition-all ${
              loading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <KeyRound size={14} />
                Ingresar
              </>
            )}
          </button>

          <p className="text-[9px] text-zinc-600 text-center">
            Autenticación contra servidor — clave configurada en backend
          </p>
        </form>
      </div>
    </div>
  )
}
