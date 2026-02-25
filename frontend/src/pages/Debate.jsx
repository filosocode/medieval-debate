import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import AnimatedSection from '../components/AnimatedSection.jsx'
import Particles from '../components/Particles.jsx'
import PhilosopherIllustration from '../components/PhilosopherIllustration.jsx'

const PHILOSOPHERS_LIST = ['San Agustín', 'Boecio', 'Eriúgena', 'Ninguno/General']

export default function Debate() {
  const [args, setArgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ author: '', position: 'favor', content: '', philosopher: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = () => api.getArguments().then(setArgs).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!form.author.trim() || !form.content.trim()) {
      setError('El autor y el argumento son obligatorios.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await api.createArgument({
        ...form,
        philosopher: form.philosopher || null,
      })
      setForm({ author: '', position: 'favor', content: '', philosopher: '' })
      load()
    } catch (e) {
      setError('Error al publicar el argumento. ¿Está el servidor activo?')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este argumento?')) return
    await api.deleteArgument(id)
    setArgs(prev => prev.filter(a => a.id !== id))
  }

  const filtered = filter === 'all' ? args : args.filter(a => a.position === filter)
  const favor = args.filter(a => a.position === 'favor').length
  const contra = args.filter(a => a.position === 'contra').length

  return (
    <div className="space-y-10 relative">
      {/* ── Particles background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles />
      </div>

      {/* ── Philosopher Illustration ── */}
      <PhilosopherIllustration number={3} />

      {/* ── Title ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl text-secondary neon-glow">Disputatio</h2>
          <p className="font-body italic text-parchment-400 text-lg">
            La Educación en la Edad Media y en la Actualidad
          </p>
          <div className="ornamental-divider max-w-xs mx-auto mt-2">
            <span className="text-secondary/70">Quaestio Disputata</span>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Stats scoreboard ── */}
      <AnimatedSection className="grid grid-cols-2 gap-4 relative z-10" variant="scaleIn">
        <motion.div
          className="border-2 border-secondary/40 bg-gradient-to-br from-secondary/10 via-transparent to-accentBlue/10 rounded-sm p-5 text-center backdrop-blur-sm"
          whileHover={{ boxShadow: "0 0 20px rgba(0, 255, 159, 0.3)" }}
        >
          <motion.p className="font-display text-4xl text-secondary" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>{favor}</motion.p>
          <p className="font-body text-parchment-400 text-sm mt-1">Argumentos a Favor</p>
          <p className="font-display text-xs tracking-widest text-secondary/60 uppercase mt-1">Pro Educatione Medievale</p>
        </motion.div>
        <motion.div
          className="border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 rounded-sm p-5 text-center backdrop-blur-sm"
          whileHover={{ boxShadow: "0 0 20px rgba(170, 54, 124, 0.3)" }}
        >
          <motion.p className="font-display text-4xl text-accent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>{contra}</motion.p>
          <p className="font-body text-parchment-200 text-sm mt-1">Argumentos en Contra</p>
          <p className="font-display text-xs tracking-widest text-accent uppercase mt-1 font-bold" style={{ textShadow: "0 0 10px rgba(255, 20, 147, 0.5)" }}>Contra Educationem Medievalem</p>
        </motion.div>
      </AnimatedSection>

      {/* ── Post new argument ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <section className="border-2 border-secondary/40 rounded-sm p-6 bg-secondary/8 backdrop-blur-sm space-y-4 relative z-10">
        <h3 className="font-display text-secondary text-lg border-b border-secondary/20 pb-2 neon-glow">
          ✒ Publicar Argumento
        </h3>

        {error && (
          <p className="bg-accent/10 border border-accent/40 text-accent font-body text-sm px-4 py-2 rounded-sm">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
              Autor *
            </label>
            <input
              className="medieval-input"
              placeholder="Tu nombre"
              value={form.author}
              onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
              Filósofo de referencia
            </label>
            <select
              className="medieval-input"
              value={form.philosopher}
              onChange={e => setForm(p => ({ ...p, philosopher: e.target.value }))}
            >
              <option value="">— Sin referencia específica —</option>
              {PHILOSOPHERS_LIST.map(ph => (
                <option key={ph} value={ph}>{ph}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Position selector */}
        <div className="space-y-1">
          <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
            Posición *
          </label>
          <div className="flex gap-3">
            {[
              { val: 'favor', label: '✦ A Favor', cls: 'btn-primary btn-favor' },
              { val: 'contra', label: '✦ En Contra', cls: 'btn-primary btn-contra' },
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => setForm(p => ({ ...p, position: opt.val }))}
                className={`btn-primary ${opt.cls} ${form.position === opt.val ? 'ring-2 ring-offset-1 ring-offset-black ring-current' : 'opacity-50'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-display text-xs tracking-wider text-secondary/80 uppercase block font-bold">
            Argumento * <span className="text-secondary/50 normal-case font-body tracking-normal">(mín. 30 caracteres)</span>
          </label>
          <textarea
            rows={4}
            className="medieval-input resize-none"
            placeholder="Expón tu tesis siguiendo el método escolástico…"
            value={form.content}
            onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary disabled:opacity-50"
        >
          {submitting ? 'Publicando…' : 'Publicar en el Scriptorium'}
        </button>
      </section>
      </AnimatedSection>

      {/* ── Filter ── */}
      <AnimatedSection variant="slideIn" className="relative z-10">
        <div className="flex gap-2 items-center relative z-10">
          <span className="font-display text-parchment-500 text-xs tracking-widest uppercase mr-2">Filtrar:</span>
          {[
            { val: 'all', label: 'Todos' },
            { val: 'favor', label: 'A Favor' },
            { val: 'contra', label: 'En Contra' },
          ].map(f => (
            <motion.button
              key={f.val}
              onClick={() => setFilter(f.val)}
              whileHover={{ scale: 1.05 }}
              className={`font-display text-xs tracking-wider px-4 py-1.5 border rounded-sm transition-all cursor-pointer
                ${filter === f.val
                  ? 'border-secondary bg-secondary/10 text-secondary neon-glow'
                  : 'border-secondary/30 text-parchment-500 hover:text-parchment-300 hover:border-secondary/60'
                }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Arguments list ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        {loading ? (
          <motion.p
            className="font-body italic text-secondary text-center py-8 neon-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Leyendo el pergamino…
          </motion.p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-secondary/20 rounded-sm bg-secondary/5 backdrop-blur-sm">
            <p className="font-display text-parchment-400 text-xl mb-2">Scriptorium vacío</p>
            <p className="font-body italic text-parchment-500">Sé el primero en publicar un argumento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((arg, i) => (
              <ArgumentCard key={arg.id} arg={arg} onDelete={handleDelete} delay={i * 0.05} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  )
}

function ArgumentCard({ arg, onDelete, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`border-2 rounded-sm p-5 backdrop-blur-sm transition-all
        ${arg.position === 'favor'
          ? 'border-secondary/40 bg-gradient-to-r from-secondary/10 via-transparent to-accentBlue/10 hover:border-secondary/60'
          : 'border-accent/40 bg-gradient-to-r from-accent/10 via-transparent to-secondary/10 hover:border-accent/60'
        }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={arg.position === 'favor' ? 'tag-favor' : 'tag-contra'}>
            {arg.position === 'favor' ? '✦ A Favor' : '✦ En Contra'}
          </span>
          <span className="font-display text-parchment-200 text-sm">{arg.author}</span>
          {arg.philosopher && (
            <span className="font-body italic text-parchment-500 text-sm">
              cita a {arg.philosopher}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-parchment-600 text-xs">
            {new Date(arg.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
          </span>
          <button
            onClick={() => onDelete(arg.id)}
            className="text-accent/60 hover:text-accent font-body text-sm transition-colors cursor-pointer"
            title="Eliminar"
          >
            ✕
          </button>
        </div>
      </div>
      <p className="font-body text-parchment-300 text-base leading-relaxed">{arg.content}</p>
    </motion.article>
  )
}
