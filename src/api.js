const BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
}

async function fetchJSON(url, options = {}) {
  const authHeaders = getAuthHeaders();
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders, ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    // If 401, clear token and redirect to login
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.reload();
    }
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Admin Auth ───

export async function adminLogin(password) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Error de conexión' }));
    throw new Error(err.detail || 'Error de autenticación');
  }
  return res.json();
}

export async function adminVerify() {
  return fetchJSON('/admin/verify');
}

// ─── Dashboard ───

export async function getStatus() {
  return fetchJSON('/status');
}

// ─── SEO Oracle ───

export async function getNiches(minCpc = 80) {
  return fetchJSON(`/seo/niches?min_cpc=${minCpc}`);
}

export async function getNicheRanking() {
  return fetchJSON('/seo/ranking');
}

export async function getProjection(nicheId, visitors = 5000, nodes = 3) {
  return fetchJSON('/seo/projection', {
    method: 'POST',
    body: JSON.stringify({
      niche_id: nicheId,
      monthly_visitors: visitors,
      ctr_pct: 2.0,
      nodes_count: nodes,
    }),
  });
}

// ─── OSINT / Oracle ───

export async function scanOSINT() {
  return fetchJSON('/osint/scan');
}

export async function getOSINTOpportunities() {
  return fetchJSON('/osint/opportunities');
}

export async function getOSINTRecommendations() {
  return fetchJSON('/osint/recommendations');
}

// ─── Content Generation ───

export async function generateContent(data) {
  return fetchJSON('/seo/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function generatePlatformContent(data) {
  return fetchJSON('/platform/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─── Posts ───

export async function publishPost(data) {
  return fetchJSON('/publish-post', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function listPosts() {
  return fetchJSON('/posts');
}

// ─── Treasury ───

export async function getTreasuryBalance() {
  return fetchJSON('/treasury/balance');
}

export async function getTreasuryWeekly() {
  return fetchJSON('/treasury/weekly');
}

// ─── Whale Watcher ───

export async function scanWhales(count = 50) {
  return fetchJSON('/whales/scan', {
    method: 'POST',
    body: JSON.stringify({ count }),
  });
}

// ─── DAO ───

export async function getDAOSummary() {
  return fetchJSON('/dao/summary');
}

export async function getDAOMembers() {
  return fetchJSON('/dao/members');
}
