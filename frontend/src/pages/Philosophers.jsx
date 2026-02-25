import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import AnimatedSection from '../components/AnimatedSection.jsx'
import Particles from '../components/Particles.jsx'
import PhilosopherIllustration from '../components/PhilosopherIllustration.jsx'

const COLORS = {
  '#8B4513': { bg: 'bg-secondary/5', border: 'border-secondary/30', accent: 'text-secondary' },
  '#4A5568': { bg: 'bg-secondary/5', border: 'border-secondary/30', accent: 'text-secondary' },
  '#2D6A4F': { bg: 'bg-secondary/5', border: 'border-secondary/30', accent: 'text-secondary' },
}

const DEFAULT = { bg: 'bg-secondary/5', border: 'border-secondary/30', accent: 'text-secondary neon-glow' }

export default function Philosophers() {
  const [philosophers, setPhilosophers] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getPhilosophers()
      .then(data => { setPhilosophers(data); setSelected(data[0] ?? null) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScroll />

  const p = selected
  const theme = p ? (COLORS[p.color] ?? DEFAULT) : DEFAULT

  return (
    <div className="space-y-10 relative">
      {/* ── Particles background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles />
      </div>

      {/* ── Philosopher Illustration ── */}
      <PhilosopherIllustration philosopher={p?.name} />

      <AnimatedSection variant="fadeUp" className="relative z-10">
        <div className="text-center">
          <h2 className="font-display text-3xl text-secondary mb-2 neon-glow">
            Filósofos de la Temprana Edad Media
          </h2>
          <p className="font-body italic text-parchment-400">Siglos IV – IX · Los primeros escolásticos</p>
        </div>
      </AnimatedSection>

      {/* ── Philosopher tabs ── */}
      <AnimatedSection className="flex gap-3 justify-center flex-wrap relative z-10" variant="slideIn">
        {philosophers.map(ph => (
          <motion.button
            key={ph.id}
            onClick={() => setSelected(ph)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-display text-sm tracking-wider px-5 py-2 border rounded-sm transition-all cursor-pointer
              ${selected?.id === ph.id
                ? 'border-secondary bg-secondary/10 text-secondary neon-glow'
                : 'border-secondary/30 text-parchment-400 hover:border-secondary/60 hover:text-parchment-200'
              }`}
          >
            {ph.name.split(' ').slice(0, 2).join(' ')}
          </motion.button>
        ))}
      </AnimatedSection>

      {/* ── Detail card ── */}
      {p && (
        <AnimatedSection key={p.id} variant="scaleIn" className="relative z-10">
          <motion.div
            className={`border-2 rounded-sm p-6 md:p-10 bg-secondary/5 border-secondary/30 backdrop-blur-sm`}
            whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 159, 0.2)" }}
          >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left */}
            <div className="md:col-span-1 flex flex-col gap-4 border-r border-white/5 pr-6">
              <div>
                <span className={`font-display text-xs tracking-[0.3em] uppercase ${theme.accent} mb-1 block`}>
                  Filósofo Medieval
                </span>
                <h3 className="font-display text-parchment-100 text-xl leading-tight">{p.name}</h3>
                <p className="font-mono text-parchment-500 text-sm mt-1">{p.years}</p>
              </div>

              <div className="ornamental-divider text-[0.6rem]"><span>Época</span></div>

              <div>
                <p className="font-display text-xs tracking-widest text-parchment-400 uppercase mb-1">Período</p>
                <p className="font-body text-parchment-200">{p.period}</p>
              </div>

              <div>
                <p className="font-display text-xs tracking-widest text-parchment-400 uppercase mb-1">Obra principal</p>
                <p className="font-body italic text-parchment-300">{p.main_work}</p>
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <p className="font-display text-xs tracking-[0.3em] uppercase text-parchment-400 mb-2">Idea Central</p>
                <p className="font-body text-parchment-200 text-lg leading-relaxed drop-cap">{p.main_idea}</p>
              </div>

              <div className={`border-l-4 ${theme.border} pl-5`}>
                <p className="font-body italic text-parchment-300 text-lg">"{p.quote}"</p>
              </div>
            </div>
          </div>
          </motion.div>
        </AnimatedSection>
      )}

      {/* ── Timeline row ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <motion.div
          className="bg-gradient-to-r from-secondary/10 via-accentBlue/10 to-secondary/10 border border-secondary/30 rounded-sm p-6 backdrop-blur-sm"
          whileHover={{ boxShadow: "0 0 20px rgba(0, 255, 159, 0.15)" }}
        >
          <p className="font-display text-secondary text-xs tracking-[0.3em] uppercase text-center mb-6 neon-glow">
            Línea del Tiempo · Temprana Edad Media
          </p>
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-px bg-secondary/30" />
            <div className="flex justify-between relative">
              {philosophers.map((ph, idx) => (
                <motion.div
                  key={ph.id}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setSelected(ph)}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-all ${selected?.id === ph.id ? 'bg-secondary border-secondary scale-150' : 'bg-secondary/40 border-secondary/60'}`}
                    animate={selected?.id === ph.id ? { boxShadow: "0 0 10px rgba(0, 255, 159, 0.6)" } : {}}
                  />
                  <p className="font-display text-parchment-300 text-xs text-center leading-tight max-w-[80px]">
                    {ph.name.split(' ')[1] ?? ph.name}
                  </p>
                  <p className="font-mono text-parchment-500 text-xs">{ph.years.split('–')[0].trim()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  )
}

function LoadingScroll() {
  return (
    <motion.div
      className="text-center py-20 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.p
        className="font-display text-secondary text-2xl neon-glow"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✦
      </motion.p>
      <p className="font-body italic text-parchment-500">Consultando el manuscrito…</p>
    </motion.div>
  )
}
