import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home.jsx'
import Philosophers from './pages/Philosophers.jsx'
import Debate from './pages/Debate.jsx'
import Conclusions from './pages/Conclusions.jsx'
import Links from './pages/Links.jsx'
import TransitionPage from './components/TransitionPage.jsx'

const NAV = [
  { to: '/', label: 'Inicio', exact: true },
  { to: '/filosofos', label: 'Filósofos' },
  { to: '/debate', label: 'Debate' },
  { to: '/conclusiones', label: 'Conclusiones' },
  { to: '/enlaces', label: 'Grabaciones' },
]

export default function App() {
  const loc = useLocation()

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* ── Modern gradient background ── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-darkBg via-black to-darkBg/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accentBlue/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
      </div>

      <TransitionPage />

      {/* ── Header ── */}
      <header className="border-b-2 border-secondary/40 bg-black/50 backdrop-blur-md sticky top-0 z-50 shadow-lg" style={{ boxShadow: "0 0 20px rgba(0, 255, 159, 0.1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Top bar */}
          <div className="py-4 flex flex-col items-center gap-1 border-b border-secondary/20">
            <p className="font-display text-secondary/60 text-xs tracking-[0.4em] uppercase">
              Universidad Nacional Abierta y a Distancia · UNAD
            </p>
            <h1 className="font-display text-2xl md:text-4xl text-secondary tracking-wider text-center neon-glow">
              Studium Generale
            </h1>
            <p className="font-body italic text-parchment-300 text-sm tracking-wider">
              Filosofía Medieval · Reto 2 · Temprana Edad Media
            </p>
          </div>
          {/* Nav */}
          <nav className="flex items-center justify-center gap-1 py-2 flex-wrap">
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.exact}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filosofos" element={<Philosophers />} />
          <Route path="/debate" element={<Debate />} />
          <Route path="/conclusiones" element={<Conclusions />} />
          <Route path="/enlaces" element={<Links />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-secondary/10 py-6 text-center bg-black/30 backdrop-blur">
        <div className="ornamental-divider max-w-md mx-auto mb-3">
          <span className="text-secondary/70">✦</span>
        </div>
        <p className="font-display text-secondary/50 text-xs tracking-[0.3em] uppercase">
          Grupo Filosofía Medieval · UNAD · 2026
        </p>
      </footer>
    </div>
  )
}
