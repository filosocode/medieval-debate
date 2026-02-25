const BASE = 'https://medieval-debate.onrender.com/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export const api = {
  // Philosophers
  getPhilosophers: () => request('/philosophers'),

  // Arguments (debate posts)
  getArguments: () => request('/arguments'),
  createArgument: (data) => request('/arguments', { method: 'POST', body: JSON.stringify(data) }),
  deleteArgument: (id) => request(`/arguments/${id}`, { method: 'DELETE' }),

  // Conclusions
  getConclusions: () => request('/conclusions'),
  createConclusion: (data) => request('/conclusions', { method: 'POST', body: JSON.stringify(data) }),

  // Links
  getLinks: () => request('/links'),
  createLink: (data) => request('/links', { method: 'POST', body: JSON.stringify(data) }),

  // Stats
  getStats: () => request('/stats'),
}
