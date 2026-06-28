# 🚀 SEO INFINITO — Control Center v1.0

> **Sistema de gestión de nichos híbridos · OSINT · Generación de contenido con IA · Pipeline automático**  
> **Inspirado en estrategias de tráfico deportivo + Adsterra**  
> **Repositorio independiente** — no afecta a `proyecto-infinito` (tokenización inmobiliaria)

---

## 📋 ÍNDICE

1. [Visión General](#-visión-general)
2. [Arquitectura](#-arquitectura)
3. [Tech Stack](#-tech-stack)
4. [Quick Start](#-quick-start)
5. [Dashboard](#-dashboard)
6. [Endpoints de la API](#-endpoints-de-la-api)
7. [Nichos Híbridos](#-nichos-híbridos)
8. [Despliegue](#-despliegue)
9. [Configuración](#-configuración)

---

## 🎯 VISIÓN GENERAL

**SEO Infinito** es una plataforma de **arbitraje de tráfico y contenido automatizado** que combina dos estrategias en un solo panel:

### Nichos Evergreen + Tendencias Virales = Nichos Híbridos

| Estrategia | Fuente del video | Implementación SEO Infinito |
|---|---|---|
| ⚽ Tráfico deportivo estacional | YouTube: "Tráfico Deportivo + Adsterra" | **OSINT Oracle** → detecta terremotos, eventos deportivos, noticias |
| 📢 Anuncios display (Adsterra/Monetag) | Monetización por volumen | **Generador de Contenido** → crea artículos SEO con ads integrados |
| 🚀 Pipeline manual → Automatizado | Cada paso se hacía a mano | **Pipeline ⚡** → OSINT → Generar → Publicar → IndexNow en 1 clic |
| 📊 Nicho único → **Nichos Híbridos** | Solo deportes | Evergreen ($95-$220 CPC) + Tendencias + Deportes |

### ¿Por qué "Híbrido"?

Porque no dependes de un solo tipo de tráfico:

- **Evergreen** (abogados, seguros, salud) → Ingreso base predecible, CPC alto
- **Tendencias** (OSINT: sismos, noticias, fraudes) → Picos de tráfico masivo
- **Eventos deportivos** → Tráfico viral estacional para Adsterra/Monetag

---

## 🏗️ ARQUITECTURA

```
┌──────────────────────────────────────────────────────────────────┐
│                        🌐 NAVEGADOR                              │
│              http://localhost:5173                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              📦 SEO INFINITO — Frontend (React + Vite)   │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │
│  │  │Dashboard │  │ Oráculo  │  │Contenido │  │Pipeline│  │   │
│  │  │   📊     │  │  🜁       │  │   📝     │  │  ⚡    │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │
│  │  ┌──────────┐  ┌──────────┐                             │   │
│  │  │Campañas  │  │  Config  │                             │   │
│  │  │   🚀     │  │   ⚙️     │                             │   │
│  │  └──────────┘  └──────────┘                             │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                          │ Proxy Vite (/api → :8001)             │
└──────────────────────────┼──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│              🔌 SEO INFINITO — Backend (FastAPI)                │
│              http://localhost:8001                               │
│                                                                  │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ SEO Oracle  │  │ OSINT Scan  │  │ Content Generator    │   │
│  │ • Nichos   │  │ • Terremotos│  │ • OpenRouter IA      │   │
│  │ • Ranking  │  │ • Noticias  │  │ • Fallback local     │   │
│  │ • Proyec.  │  │ • Deportes  │  │ • Multi-plataforma   │   │
│  └────────────┘  └──────────────┘  └──────────────────────┘   │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Pipeline   │  │   Posts      │  │  Admin Auth (JWT)    │   │
│  │ • 4 pasos  │  │ • Publicar  │  │  • Login/Verify      │   │
│  │ • OSINT→Pub│  │ • Listar    │  │  • Middleware Bearer  │   │
│  └────────────┘  └──────────────┘  └──────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ TECH STACK

### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2.7 | UI |
| Vite | 8.1.0 | Build tool |
| Tailwind CSS | 4.3.1 | Estilos |
| Recharts | 3.9.0 | Gráficos |
| Lucide React | 1.22.0 | Iconos |

### Backend

| Tecnología | Versión | Uso |
|---|---|---|
| Python | 3.12 | Lenguaje |
| FastAPI | 0.115.0 | Framework REST |
| Uvicorn | 0.30.6 | Servidor ASGI |
| httpx | 0.27.0 | Cliente HTTP (OpenRouter) |
| OpenRouter | gratis | IA generativa (Gemini Flash Lite) |

### Costos — Todo Gratis 💰

| Servicio | Costo | Detalle |
|---|---|---|
| Desarrollo local | **$0** | Tu PC |
| OpenRouter (Gemini Flash Lite) | **$0** | 50 artículos/día gratis |
| Vercel (hosting frontend) | **$0** | 100h/mes serverless |
| Render / PythonAnywhere (API) | **$0** | Hosting backend |
| Adsterra / Monetag | **$0** | Te pagan a ti |

---

## 🚀 QUICK START

### 1. Backend (FastAPI — puerto 8001)

```bash
cd C:\seo-infinito\backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

📖 Documentación automática: [http://localhost:8001/docs](http://localhost:8001/docs)

### 2. Frontend (Vite — puerto 5173)

```bash
cd C:\seo-infinito
npm install
npm run dev
```

### 3. Login

Abre [http://localhost:5173](http://localhost:5173) y usa:

| Campo | Valor |
|---|---|
| **Clave** | `admin123` (configurable via `ADMIN_KEY` env) |

---

## 📊 DASHBOARD

### 6 Secciones

| # | Tab | Descripción |
|---|---|---|
| 1 | **Dashboard** 📊 | Visión general: stats de nichos, gráficos CPC, proyección de ingresos |
| 2 | **Oráculo** 🜁 | OSINT en tiempo real: tendencias, nichos CPC, señales de sismos/noticias/deportes |
| 3 | **Contenido** 📝 | Generador de artículos SEO con IA (OpenRouter Gemini gratis) |
| 4 | **Pipeline** ⚡ | Pipeline automático: OSINT → Generar → Publicar → IndexNow |
| 5 | **Campañas** 🚀 | Gestión de campañas de contenido híbrido |
| 6 | **Config** ⚙️ | API Keys (OpenRouter, NewsAPI, Monetag, Telegram) |

### Dashboard Principal

- **Nichos Disponibles**: cantidad de nichos en base de datos
- **CPC Promedio**: promedio de CPC de todos los nichos
- **Top CPC**: nicho con CPC más alto
- **Score Máximo**: nicho con mayor profitability score
- **Gráfico de Proyección**: ingresos proyectados mes a mes
- **CPC por Nicho**: top 6 nichos ordenados por CPC (gráfico de barras)

### Oráculo OSINT

- **Escanear Ahora**: detecta tendencias en Google, YouTube y TikTok
- **3 pestañas**: Tendencias, Nichos CPC, Señales OSINT
- **Oportunidades de contenido**: cada evento con título, país, tiempo desde detección y CPC estimado
- **Clasificación por severidad**: Críticas 🔴, Alertas 🟡, Información 🟢

### Generador de Contenido

- **9 nichos preconfigurados** con CPC dinámico
- **2 modos**: Artículo SEO (blog) o Multi-Plataforma (YouTube, TikTok, Instagram, Facebook, Twitter)
- **IA integrada**: usa OpenRouter (Gemini Flash Lite) si hay API key configurada
- **Fallback local**: genera contenido de calidad aunque no haya conexión a IA

### Pipeline Automático

Un solo botón ejecuta 4 pasos:

1. 📡 **OSINT Scan** → Detecta tendencia del momento
2. 🤖 **Generar Contenido** → Crea artículo SEO con IA
3. 📤 **Publicar Post** → Sube página HTML indexable
4. 🔍 **IndexNow** → Notifica a Bing/Google (si hay key configurada)

---

## 🔌 ENDPOINTS DE LA API

### Admin Auth

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/admin/login` | ❌ | Login con clave → token JWT |
| GET | `/api/admin/verify` | ❌ | Verifica si el token es válido |

### System

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/status` | ❌ | Estado del sistema y módulos |

### SEO Oracle

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/seo/niches?min_cpc=80` | ❌ | Lista nichos con filtro CPC |
| GET | `/api/seo/ranking` | ❌ | Ranking de nichos por rentabilidad |
| POST | `/api/seo/projection` | ✅ | Proyección de ingresos para un nicho |

### OSINT

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/osint/scan` | ❌ | Escanea tendencias en tiempo real |
| GET | `/api/osint/opportunities` | ❌ | Oportunidades de contenido detectadas |
| GET | `/api/osint/recommendations` | ❌ | Recomendaciones basadas en data OSINT |

### Content Generation

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/seo/generate` | ✅ | Genera artículo SEO con IA o fallback |
| POST | `/api/platform/generate` | ✅ | Genera contenido multi-plataforma |

### Posts

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/publish-post` | ✅ | Publica un post en el sistema |
| GET | `/api/posts` | ❌ | Lista posts publicados |

### Pipeline

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/pipeline/run` | ✅ | Ejecuta pipeline completo (OSINT→Gen→Pub→IndexNow) |

### Campaigns

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/campaigns` | ✅ | Lista campañas |
| POST | `/api/campaigns` | ✅ | Crea nueva campaña |

### Treasury

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/treasury/balance` | ✅ | Balance general |
| GET | `/api/treasury/weekly` | ✅ | Reporte semanal |

### Whale Watcher

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/whales/scan` | ✅ | Escanea mempool simulado |

### DAO

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/dao/summary` | ✅ | Resumen de la DAO |
| GET | `/api/dao/members` | ✅ | Miembros registrados |

> ✅ Auth requerida = usar `Authorization: Bearer <token>` (obtenido de `/api/admin/login`)

---

## 🌐 NICHOS HÍBRIDOS

### 11 Nichos en Base de Datos

| # | Nicho | CPC $ | Categoría | Score | Dificultad | Evergreen |
|---|-------|:-----:|-----------|:-----:|:----------:|:---------:|
| 1 | Abogados Accidentes | **$220** | Servicios Legales | 17,600 | 🔴 muy_alta | 10/10 |
| 2 | Ciberseguridad | **$170** | Tecnología B2B | 7,650 | 🟡 alta | 9/10 |
| 3 | Mesotelioma | **$150** | Servicios Legales | 1,500 | 🔴 muy_alta | 10/10 |
| 4 | Recuperación de Activos | **$125** | Servicios Legales | 5,625 | 🟡 alta | 9/10 |
| 5 | Ciberseguridad Empresarial | **$120** | Tecnología B2B | 8,640 | 🟡 alta | 9/10 |
| 6 | Centros Rehabilitación | **$120** | Salud | 9,600 | 🔴 muy_alta | 10/10 |
| 7 | Seguro Auto Alto Riesgo | **$105** | Seguros | 8,400 | 🟡 alta | 9/10 |
| 8 | MBA Online | **$100** | Educación | 4,000 | 🟢 media | 8/10 |
| 9 | Seguro Vida Mayores | **$95** | Seguros | 8,550 | 🟡 alta | 9/10 |
| 10 | Inversiones DeFi | **$85** | Finanzas | 2,975 | 🟢 media | 7/10 |
| 11 | Eventos Deportivos 🆕 | **$65** | Tendencias | 7,500 | 🟢 baja | 3/10 |

### Nichos Evergreen (CPC alto, tráfico constante)

Son los nichos tradicionales con CPC elevado ($85-$220) y búsqueda orgánica constante. Ideales para **Monetag** (anuncios display con CPC alto).

### Nichos de Tendencia (tráfico viral, CPC medio)

Como **Eventos Deportivos** ($65 CPC pero volumen masivo). Ideales para **Adsterra** (popunders con CPM alto por volumen). La combinación de ambos tipos en un solo sistema es lo que llamamos **nichos híbridos**.

---

## 🚀 DESPLIEGUE

### Opción 1: Local (desarrollo)

```bash
# Terminal 1 — Backend
cd C:\seo-infinito\backend
python -m uvicorn main:app --reload --port 8001

# Terminal 2 — Frontend
cd C:\seo-infinito
npm run dev
```

### Opción 2: Vercel (Frontend) + Render (Backend)

**Frontend en Vercel:**
```bash
cd C:\seo-infinito
npm run build
vercel --prod
```

**Backend en Render (o PythonAnywhere):**
```bash
cd C:\seo-infinito\backend
# Subir a Render como servicio web con:
#   Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
#   Build Command: pip install -r requirements.txt
```

> **Importante**: Actualizar `vite.config.js` para que el proxy apunte a la URL del backend desplegado en vez de `localhost:8001`.

### Opción 3: Cloudflare Tunnel (gratis, 24/7 desde tu PC)

```bash
# Instalar cloudflared
winget install Cloudflare.cloudflared

# Autenticar
cloudflared tunnel login

# Crear tunnel
cloudflared tunnel create seo-infinito

# Iniciar (apunta a localhost:8001)
cloudflared tunnel run seo-infinito
```

---

## ⚙️ CONFIGURACIÓN

### Variables de Entorno (Backend)

| Variable | Default | Descripción |
|---|---|---|
| `ADMIN_KEY` | `admin123` | Clave para login al dashboard |
| `JWT_SECRET` | auto-generado | Secreto para firmar tokens JWT |
| `OPENROUTER_API_KEY` | `""` | API Key de OpenRouter (para IA) |
| `NEWSAPI_KEY` | `""` | API Key de NewsAPI (para OSINT real) |

### Configuración desde el Dashboard

En la pestaña **Config** ⚙️ puedes guardar (en localStorage):

| Sección | Campos |
|---|---|
| **API Keys** | OpenRouter Key, NewsAPI Key, Monetag Site ID |
| **Despliegue** | Vercel Token, GitHub PAT, Dominio |
| **Notificaciones** | Telegram Bot Token, Telegram Chat ID |

### Redes de Anuncios Soportadas

| Red | Tipo | Ideal para | CPC Promedio |
|---|---|---|---|
| **Monetag** | Popunders + Banners | Nichos evergreen | $80-$220 |
| **Adsterra** | Popunders + Social Bar | Tráfico deportivo/viral | $30-$100 |

---

## 📁 ESTRUCTURA DEL PROYECTO

```
C:\seo-infinito\
│
├── README.md                       ← ★ ESTE ARCHIVO
├── package.json                    ← Frontend dependencies
├── vite.config.js                  ← Vite config (proxy a :8001)
│
├── src/                            ← ★ FRONTEND (React)
│   ├── App.jsx                     ←   Layout + sidebar + routing
│   ├── main.jsx                    ←   Entry point
│   ├── index.css                   ←   Tailwind CSS
│   ├── api.js                      ←   Cliente API (fetch con auth)
│   └── pages/                      ←   Páginas del dashboard
│       ├── Login.jsx               ←     Pantalla de login
│       ├── Dashboard.jsx           ←     Panel principal con stats
│       ├── Oracle.jsx              ←     OSINT scanner + nichos
│       ├── ContentGen.jsx          ←     Generador de contenido IA
│       ├── Pipeline.jsx            ←     Pipeline automático
│       ├── Campaigns.jsx           ←     Gestión de campañas
│       └── SettingsPage.jsx        ←     Configuración
│
├── backend/                        ← ★ BACKEND (FastAPI)
│   ├── main.py                     ←   API completa (1,050 líneas)
│   └── requirements.txt            ←   Python dependencies
│
└── dist/                           ← Build de producción
```

---

## 🔗 LINKS

| Recurso | URL |
|---|---|
| **Dashboard (local)** | http://localhost:5173 |
| **API Docs (Swagger)** | http://localhost:8001/docs |
| **Repositorio GitHub** | https://github.com/aonetworkcrm-art/control-center-seo |
| **OpenRouter (API Key)** | https://openrouter.ai/keys |
| **Monetag (registro)** | https://publisher.monerator.com |
| **Adsterra (registro)** | https://adsterra.com |
| **Video inspiración** | https://www.youtube.com/watch?v=EfMrLHa3RW0 |

---

## 💬 FRASE CLAVE

> **"Nichos híbridos = Ingresos evergreen + Picos virales. Mientras el mercado duerme, tu contenido trabaja."**

---

*SEO Infinito v1.0 · Proyecto independiente · Junio 2026*  
*Inspirado en estrategias de tráfico + Adsterra*  
*"No copies el video. Automatízalo, amplíalo y hazlo híbrido."*
