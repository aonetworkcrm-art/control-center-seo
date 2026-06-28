import { useState } from 'react'
import { Zap, CheckCircle2, Circle, XCircle, Clock, ExternalLink, Copy, Sparkles, Activity } from 'lucide-react'

const PIPELINE_STEPS = [
  { step: 1, name: '📡 OSINT Scan', desc: 'Detectando tendencias en Google, YouTube y redes...' },
  { step: 2, name: '🤖 Generar Contenido', desc: 'Creando artículo SEO optimizado con IA...' },
  { step: 3, name: '📤 Publicar Post', desc: 'Subiendo página HTML indexable por Google...' },
  { step: 4, name: '🔍 IndexNow', desc: 'Notificando a Bing/Google para indexación instantánea...' },
]

export default function Pipeline() {
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [log, setLog] = useState([])

  const runPipeline = async () => {
    setRunning(true)
    setResult(null)
    setCurrentStep(0)
    setLog([])

    try {
      // Simular progreso de pasos (el backend es síncrono)
      const progressInterval = setInterval(() => {
        setCurrentStep(prev => Math.min(prev + 1, 4))
      }, 2000)

      const res = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          indexnow_key: localStorage.getItem('seo_infinito_config')
            ? JSON.parse(localStorage.getItem('seo_infinito_config') || '{}').indexnow_key || ''
            : '',
        }),
      })

      clearInterval(progressInterval)
      const data = await res.json()
      setResult(data)
      setCurrentStep(4)
      setLog(data.steps || [])
    } catch (e) {
      setResult({ success: false, summary: { total_time_formatted: 'Error' } })
      setLog([{ step: 1, name: 'Error', status: 'failed', error: e.message }])
    }
    setRunning(false)
  }

  const copyResult = () => {
    if (result?.summary?.full_url) {
      navigator.clipboard.writeText(result.summary.full_url)
    }
  }

  const getStepIcon = (status) => {
    if (status === 'completed' || status?.startsWith('completed')) return <CheckCircle2 size={16} className="text-emerald-400" />
    if (status === 'running') return <Activity size={16} className="text-amber-400 animate-pulse" />
    if (status === 'failed') return <XCircle size={16} className="text-red-400" />
    if (status === 'skipped') return <Circle size={16} className="text-zinc-600" />
    return <Circle size={16} className="text-zinc-600" />
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-amber-500/20">
          ⚡
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Pipeline Automático</h1>
        <p className="text-[10px] md:text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          Un solo botón para escanear tendencias, generar contenido, publicar e indexar en Google
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 md:p-6">
        <div className="space-y-3">
          {PIPELINE_STEPS.map((step, i) => {
            const logStep = log.find(s => s.step === step.step)
            const isActive = i < currentStep && !logStep
            const isDone = logStep?.status?.startsWith('completed')
            const isFailed = logStep?.status === 'failed'
            const isSkipped = logStep?.status === 'skipped'

            return (
              <div key={step.step} className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                isActive ? 'bg-emerald-500/5 border border-emerald-500/10' :
                isDone ? 'bg-emerald-500/5' :
                isFailed ? 'bg-red-500/5' : ''
              }`}>
                {/* Step number */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                  isDone ? 'bg-emerald-500/20 text-emerald-400' :
                  isActive ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                  isFailed ? 'bg-red-500/20 text-red-400' :
                  'bg-zinc-800 text-zinc-500'
                }`}>
                  {isDone ? '✓' : isFailed ? '✗' : step.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-medium ${
                      isDone ? 'text-emerald-400' :
                      isActive ? 'text-amber-400' :
                      isFailed ? 'text-red-400' :
                      isSkipped ? 'text-zinc-500' :
                      'text-zinc-400'
                    }`}>
                      {step.name}
                    </p>
                    {logStep?.duration && (
                      <span className="text-[9px] text-zinc-600 font-mono">{logStep.duration}s</span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-0.5">
                    {isDone ? 'Completado' :
                     isActive ? step.desc :
                     isFailed ? logStep?.error || 'Error' :
                     isSkipped ? 'Saltado' :
                     'Esperando...'}
                  </p>
                  {logStep?.result?.title && (
                    <p className="text-[9px] text-zinc-500 mt-0.5 truncate">{logStep.result.title}</p>
                  )}
                </div>

                {getStepIcon(logStep?.status || (!running && !logStep ? 'pending' : isActive ? 'running' : ''))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Big Run Button */}
      <button
        onClick={runPipeline}
        disabled={running}
        className="w-full py-4 md:py-5 bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm md:text-base font-bold hover:from-amber-500/30 hover:via-red-500/30 hover:to-amber-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/10"
      >
        {running ? (
          <>
            <Activity size={20} className="animate-spin" />
            Ejecutando Pipeline...
          </>
        ) : (
          <>
            <Zap size={20} />
            {result ? '🔄 Ejecutar de Nuevo' : '🚀 EJECUTAR PIPELINE COMPLETO'}
          </>
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {result.success ? '✅ Pipeline Completado' : '❌ Pipeline Falló'}
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">
              {result.summary?.total_time_formatted}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Pasos', value: result.summary?.total_steps || 0 },
              { label: 'Exitosos', value: result.summary?.successful_steps || 0, color: 'text-emerald-400' },
              { label: 'Tiempo', value: result.summary?.total_time_formatted || 'N/A' },
              { label: 'Pipeline ID', value: result.pipeline_id?.slice(-8) || 'N/A', mono: true },
            ].map(s => (
              <div key={s.label} className="bg-[#0a0a0a] rounded-lg p-3">
                <p className="text-[8px] uppercase text-zinc-600 mb-1">{s.label}</p>
                <p className={`text-xs font-bold ${s.color || 'text-white'} ${s.mono ? 'font-mono' : ''}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Published URL */}
          {result.summary?.full_url && (
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink size={12} className="text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">URL Publicada</span>
                </div>
                <button onClick={copyResult} className="flex items-center gap-1 text-[9px] text-zinc-500 hover:text-zinc-300">
                  <Copy size={10} />
                  Copiar
                </button>
              </div>
              <p className="text-[11px] text-zinc-300 mt-1 font-mono truncate">{result.summary.full_url}</p>
            </div>
          )}

          {/* Topic detected */}
          {result.summary?.topics_detected && result.summary.topics_detected !== 'N/A' && (
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
              <p className="text-[9px] text-amber-400 uppercase tracking-wider mb-1">📡 Tendencia Detectada</p>
              <p className="text-xs text-zinc-300">{result.summary.topics_detected}</p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!result && !running && (
        <div className="text-center py-8">
          <Sparkles size={32} className="mx-auto text-zinc-700 mb-3" />
          <p className="text-xs text-zinc-500">Presiona el botón para ejecutar el pipeline completo</p>
          <p className="text-[9px] text-zinc-600 mt-1">OSINT → Contenido → Publicar → Indexar</p>
        </div>
      )}
    </div>
  )
}
