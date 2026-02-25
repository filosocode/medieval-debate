import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import AnimatedSection from '../components/AnimatedSection.jsx'
import Particles from '../components/Particles.jsx'
import PhilosopherIllustration from '../components/PhilosopherIllustration.jsx'

export default function Conclusions() {
  const [conclusions, setConclusions] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ author: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = () => api.getConclusions().then(setConclusions).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!form.author.trim() || !form.content.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }
    if (form.content.trim().length < 100) {
      setError('La conclusión debe tener al menos 100 caracteres.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await api.createConclusion(form)
      setForm({ author: '', content: '' })
      load()
    } catch {
      setError('Error al guardar. ¿Está el servidor activo?')
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
      <PhilosopherIllustration number={4} />

      {/* ── Title ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl text-secondary neon-glow">Conclusiones</h2>
          <p className="font-body italic text-parchment-400 text-lg">
            Síntesis del Debate Grupal
          </p>
          <div className="ornamental-divider max-w-xs mx-auto">
            <span className="text-secondary/70">Determinatio</span>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Existing conclusions ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        {loading ? (
          <motion.p
            className="font-body italic text-secondary text-center animate-pulse neon-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Cargando…
          </motion.p>
        ) : conclusions.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-secondary/20 rounded-sm bg-secondary/5 backdrop-blur-sm">
            <p className="font-display text-parchment-500">Aún no hay conclusiones registradas.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {conclusions.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-secondary/10 via-accentBlue/10 to-secondary/10 border-2 border-secondary/30 rounded-sm p-8 space-y-4 backdrop-blur-sm hover:border-secondary/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-secondary text-xs tracking-[0.3em] uppercase neon-glow">
                    Conclusión Grupal
                  </span>
                  <span className="font-mono text-parchment-500 text-xs">
                    {new Date(c.created_at).toLocaleDateString('es-CO', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-secondary/50" />
                <p className="font-body text-parchment-200 text-lg leading-relaxed drop-cap">{c.content}</p>
                <div className="text-right">
                  <span className="font-display text-parchment-400 text-sm italic">— {c.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* ── Add conclusion ── */}
      <AnimatedSection variant="slideIn" className="relative z-10">
        <section className="border-2 border-secondary/40 rounded-sm p-6 bg-secondary/8 backdrop-blur-sm space-y-4 relative z-10">
          <h3 className="font-display text-secondary text-lg border-b border-secondary/20 pb-2 neon-glow">
            ✒ Agregar Conclusión
          </h3>
        <p className="font-body italic text-secondary/70 text-sm font-semibold">
          Mínimo 100 caracteres. Expón la síntesis del debate y el resultado de la Disputatio.
        </p>

        {error && (
          <p className="bg-accent/10 border border-accent/40 text-accent font-body text-sm px-4 py-2 rounded-sm">
            {error}
          </p>
        )}

        <input
          className="medieval-input"
          placeholder="Autor / Grupo"
          value={form.author}
          onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
        />
        <textarea
          rows={6}
          className="medieval-input resize-none"
          placeholder="Redacta aquí la conclusión del grupo…"
          value={form.content}
          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
        />
        <div className="flex items-center justify-between">
          <span className={`font-mono text-xs ${form.content.length >= 100 ? 'text-green-500' : 'text-parchment-600'}`}>
            {form.content.length} / 100 caracteres mínimo
          </span>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? 'Guardando…' : 'Guardar Conclusión'}
          </button>
        </div>
      </section>
      </AnimatedSection>
    </div>
  )
}
