import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import AnimatedSection from '../components/AnimatedSection.jsx'
import Particles from '../components/Particles.jsx'
import PhilosopherIllustration from '../components/PhilosopherIllustration.jsx'

const PLATFORMS = ['Teams', 'Google Meet', 'Zoom', 'YouTube', 'Padlet', 'Otro']

const PLATFORM_ICONS = {
  Teams: '🟦',
  'Google Meet': '🟢',
  Zoom: '🔵',
  YouTube: '🔴',
  Padlet: '🟣',
  Otro: '📎',
}

export default function Links() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', url: '', platform: 'Teams' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = () => api.getLinks().then(setLinks).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.url.trim()) {
      setError('El título y la URL son obligatorios.')
      return
    }
    if (!form.url.startsWith('http')) {
      setError('La URL debe comenzar con http:// o https://')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await api.createLink(form)
      setForm({ title: '', url: '', platform: 'Teams' })
      load()
    } catch {
      setError('Error al guardar el enlace.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-10 relative">
      {/* ── Particles background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles />
      </div>

      {/* ── Philosopher Illustration ── */}
      <PhilosopherIllustration number={5} />

      {/* ── Title ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl text-secondary neon-glow">Grabaciones y Recursos</h2>
          <p className="font-body italic text-parchment-400 text-lg">
            Acceso al debate grupal y materiales complementarios
          </p>
          <div className="ornamental-divider max-w-xs mx-auto">
            <span className="text-secondary/70">Codex Digitalis</span>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Links grid ── */}
      <AnimatedSection variant="scaleIn" className="relative z-10">
        {loading ? (
          <motion.p
            className="font-body italic text-secondary text-center animate-pulse neon-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Buscando en el archivo…
          </motion.p>
        ) : links.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-secondary/20 rounded-sm bg-secondary/5 backdrop-blur-sm">
            <p className="font-display text-parchment-500 text-xl mb-2">Archivo vacío</p>
            <p className="font-body italic text-parchment-500">Agrega el enlace a la grabación del debate.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {links.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="philosopher-card block border-2 border-secondary/40 rounded-sm p-5 bg-gradient-to-br from-secondary/10 via-transparent to-accentBlue/10 no-underline group backdrop-blur-sm"
              >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">
                  {PLATFORM_ICONS[link.platform] ?? '📎'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-parchment-100 text-base group-hover:text-secondary transition-colors">
                    {link.title}
                  </p>
                  <p className="font-mono text-parchment-600 text-xs mt-1 truncate">{link.url}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {link.platform && (
                      <span className="font-display text-xs tracking-wider text-parchment-500 border border-white/10 px-2 py-0.5 rounded-sm">
                        {link.platform}
                      </span>
                    )}
                    <span className="font-mono text-parchment-600 text-xs">
                      {new Date(link.created_at).toLocaleDateString('es-CO')}
                    </span>
                  </div>
                </div>
                <span className="text-secondary/40 group-hover:text-secondary transition-colors text-lg">→</span>
              </div>
            </motion.a>
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* ── Add link ── */}
      <AnimatedSection variant="slideIn" className="relative z-10">
        <section className="border-2 border-secondary/40 rounded-sm p-6 bg-secondary/8 backdrop-blur-sm space-y-4 relative z-10">
          <h3 className="font-display text-secondary text-lg border-b border-secondary/20 pb-2 neon-glow">
            ✒ Agregar Enlace
          </h3>

        {error && (
          <p className="bg-accent/10 border border-accent/40 text-accent font-body text-sm px-4 py-2 rounded-sm">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
              Título *
            </label>
            <input
              className="medieval-input"
              placeholder="Ej: Debate grupal — sesión 1"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
              Plataforma
            </label>
            <select
              className="medieval-input"
              value={form.platform}
              onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
            >
              {PLATFORMS.map(pl => <option key={pl} value={pl}>{pl}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-display text-xs tracking-wider text-parchment-400 uppercase block">
            URL *
          </label>
          <input
            className="medieval-input"
            placeholder="https://teams.microsoft.com/…"
            value={form.url}
            onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary disabled:opacity-50"
        >
          {submitting ? 'Guardando…' : 'Agregar al Archivo'}
        </button>
      </section>
      </AnimatedSection>
    </div>
  )
}
