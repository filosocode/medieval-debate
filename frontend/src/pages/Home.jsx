import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../api.js'
import Card from '../components/Card.jsx'
import AnimatedSection from '../components/AnimatedSection.jsx'
import Particles from '../components/Particles.jsx'
import PhilosopherIllustration from '../components/PhilosopherIllustration.jsx'

export default function Home() {
  const [stats, setStats] = useState({ total: 0, favor: 0, contra: 0 })

  useEffect(() => {
    api.getStats().then(setStats).catch(() => {})
  }, [])

  const cards = [
    {
      to: '/filosofos',
      icon: '✦',
      title: 'Filósofos',
      desc: 'San Agustín, Boecio y Eriúgena: los pilares de la Temprana Edad Media.',
      color: 'border-secondary/60 hover:border-secondary',
      bgColor: 'bg-gradient-to-br from-secondary/10 via-transparent to-accentBlue/10'
    },
    {
      to: '/debate',
      icon: '⚔',
      title: 'Debate',
      desc: `${stats.total} argumentos registrados · ${stats.favor} a favor · ${stats.contra} en contra`,
      color: 'border-accent/60 hover:border-accent',
      bgColor: 'bg-gradient-to-br from-accent/10 via-transparent to-secondary/10'
    },
    {
      to: '/conclusiones',
      icon: '✒',
      title: 'Conclusiones',
      desc: 'El resultado final de la Disputatio grupal sobre educación medieval.',
      color: 'border-accentBlue/60 hover:border-accentBlue',
      bgColor: 'bg-gradient-to-br from-accentBlue/10 via-transparent to-accent/10'
    },
    {
      to: '/enlaces',
      icon: '📜',
      title: 'Grabaciones',
      desc: 'Accede a los registros en video del debate grupal en Teams.',
      color: 'border-secondary/60 hover:border-secondary',
      bgColor: 'bg-gradient-to-br from-secondary/10 via-transparent to-accentBlue/10'
    },
  ]

  return (
    <div className="space-y-16 relative">
      {/* ── Particles background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles />
      </div>

      {/* ── Philosopher Illustration ── */}
      <PhilosopherIllustration number={1} />

      {/* ── Hero ── */}
      <AnimatedSection className="text-center space-y-6 pt-4 relative z-10" variant="fadeUp">
        <div className="ornamental-divider max-w-xs mx-auto">
          <span className="text-secondary/70">Anno Domini MMXXVI</span>
        </div>

        <motion.div
          className="max-w-3xl mx-auto parchment-card p-8 md:p-12 border-2 border-secondary/30 shadow-neon"
          whileHover={{ y: -8, boxShadow: "0 0 30px rgba(0, 255, 159, 0.4)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="font-display text-white text-2xl md:text-4xl mb-4 leading-tight">
            La Educación en la Edad Media:<br/>
            <span className="text-secondary font-bold neon-glow">¿Iluminación u Oscurantismo?</span>
          </h2>
          <p className="font-body text-gray-200 text-lg drop-cap">
            Este Studium Generale reúne los argumentos del debate sobre la educación en la
            Temprana Edad Media versus la actualidad. Siguiendo el método de la{' '}
            <em>Disputatio</em> escolástica, cada integrante del grupo propone tesis y
            antítesis para discernir lo verdadero de lo falso, y alcanzar así una conclusión
            compartida.
          </p>
        </motion.div>

        <div className="ornamental-divider max-w-xs mx-auto">
          <span className="text-secondary/70">Philosophia Ancilla Theologiae</span>
        </div>
      </AnimatedSection>

      {/* ── Cards grid ── */}
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10" variant="scaleIn">
        {cards.map((c, i) => (
          <Card
            key={c.to}
            to={c.to}
            icon={c.icon}
            title={c.title}
            desc={c.desc}
            color={c.color}
            bgColor={c.bgColor}
            index={i}
          />
        ))}
      </AnimatedSection>

      {/* ── Stats bar ── */}
      <AnimatedSection variant="fadeUp" className="relative z-10">
        <motion.div
          className="border border-gold/20 rounded-sm p-6 bg-black/20"
          whileHover={{ borderColor: "rgba(0, 255, 159, 0.5)" }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-display text-center text-secondary/70 text-xs tracking-[0.3em] uppercase mb-4 neon-glow">
            Estado del Debate
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Total Argumentos', val: stats.total, color: 'text-secondary' },
              { label: 'A Favor', val: stats.favor, color: 'text-secondary' },
              { label: 'En Contra', val: stats.contra, color: 'text-accent' },
            ].map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={`font-display text-4xl ${s.color}`}>{s.val}</p>
                <p className="font-body text-parchment-500 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {stats.total > 0 && (
            <div className="mt-4 h-2 rounded-full overflow-hidden bg-black/40 flex">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary via-secondary to-accentBlue shadow-neon"
                initial={{ width: 0 }}
                whileInView={{ width: `${(stats.favor / stats.total) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ boxShadow: "0 0 15px rgba(0, 255, 159, 0.6)" }}
              />
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-accent to-accentBlue"
                initial={{ width: 0 }}
                whileInView={{ width: `${(stats.contra / stats.total) * 100}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ boxShadow: "0 0 15px rgba(170, 54, 124, 0.6)" }}
              />
            </div>
          )}
        </motion.div>
      </AnimatedSection>

      {/* ── Quote ── */}
      <AnimatedSection className="text-center relative z-10" variant="fadeUp">
        <motion.blockquote
          className="font-body italic text-parchment-400 text-xl max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          "La razón debe investigar la naturaleza de las cosas, y la autoridad de la
          Escritura no se opone en nada a la recta razón."
        </motion.blockquote>
        <motion.cite
          className="font-display text-secondary/60 text-sm tracking-widest block mt-3 neon-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          — Juan Escoto Eriúgena, Periphyseon
        </motion.cite>
      </AnimatedSection>
    </div>
  )
}
