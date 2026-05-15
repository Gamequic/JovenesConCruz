import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import './index.css'

const up = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0 } }
const stagger = (d = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: d } } })

/* ── NOISE TEXTURE overlay ── */
function Noise() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none', mixBlendMode: 'overlay' }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

/* ── NAVBAR ── */
function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'El voto', href: '#voto' },
    { label: 'Cruz', href: '#cruz' },
    { label: 'Movimiento', href: '#movimiento' },
    { label: 'Únete', href: '#unete' },
  ]

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: solid ? 'rgba(8,8,8,0.95)' : 'transparent',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : 'none',
        backdropFilter: solid ? 'blur(10px)' : 'none',
        transition: 'all 0.3s',
        padding: '0 20px',
      }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Jóvenes</span>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 20, color: '#8E2C2D', letterSpacing: 1 }}>CON CRUZ</span>
        </a>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-d">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#FFE500'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
              {l.label}
            </a>
          ))}
          <a href="#unete"
            style={{ background: '#8E2C2D', color: '#fff', padding: '8px 18px', borderRadius: 2, fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 13, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>
            Únete
          </a>
        </div>

        <button onClick={() => setOpen(v => !v)} className="nav-m"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 22, height: 2, background: '#fff', display: 'block' }} />)}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '14px 20px', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 20, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 720px) { .nav-d { display: none !important; } .nav-m { display: flex !important; } }
      `}</style>
    </motion.nav>
  )
}

/* ── HERO ── */
function Hero() {
  const words = ['CHIHUAHUA.', 'TU VOTO.', 'TU FUTURO.']
  const [wi, setWi] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWi(v => (v + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', background: '#080808', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', padding: '100px 20px 80px',
    }}>
      <Noise />

      {/* big background text */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(120px, 30vw, 280px)', color: 'rgba(142,44,45,0.04)', lineHeight: 1, userSelect: 'none', letterSpacing: -4 }}>
          CRUZ
        </span>
      </div>

      <div style={{ position: 'relative', maxWidth: 860 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, background: 'rgba(142,44,45,0.12)', border: '1px solid rgba(142,44,45,0.3)', padding: '8px 20px', borderRadius: 100 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8E2C2D', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#8E2C2D', textTransform: 'uppercase' }}>Movimiento Juvenil · Chihuahua 2027</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(64px, 16vw, 140px)', lineHeight: 0.88, color: '#fff', textTransform: 'uppercase', letterSpacing: -2, marginBottom: 24 }}>
          Jóvenes<br /><span style={{ color: '#8E2C2D' }}>Con Cruz</span>
        </motion.h1>

        {/* rotating word */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ marginBottom: 48, height: 52, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.p key={wi}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(28px, 6vw, 44px)', color: '#FFE500', letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.2 }}>
              {words[wi]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 3vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 48px' }}>
          Los jóvenes somos el 40% del padrón electoral en México. Si nos organizamos, decidimos quién gobierna Chihuahua.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#unete"
            style={{ background: '#8E2C2D', color: '#fff', padding: '15px 40px', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
            Únete al movimiento
          </a>
          <a href="#voto"
            style={{ background: 'transparent', color: 'rgba(255,255,255,0.65)', padding: '15px 40px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2 }}>
            ¿Por qué importa?
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,229,0,0.7), transparent)', margin: '0 auto' }} />
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
      `}</style>
    </section>
  )
}

/* ── EL VOTO JOVEN ── */
function ElVoto() {
  const stats = [
    { n: '40%', label: 'del padrón electoral mexicano', sub: 'son jóvenes de 18 a 29 años' },
    { n: '1.2M', label: 'jóvenes en Chihuahua', sub: 'con derecho a votar en 2027' },
    { n: '15%', label: 'de indecisos en el estado', sub: '~300K votos sin definir — nosotros los decidimos' },
  ]

  return (
    <section id="voto" style={{ background: '#0F0F0F', padding: '88px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #8E2C2D, transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Por qué tu voto importa
          </motion.p>
          <motion.h2 variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(42px, 8vw, 80px)', textAlign: 'center', color: '#fff', lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 72 }}>
            Nuestra generación<br /><span style={{ color: '#FFE500' }}>decide a Chihuahua</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.08)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, marginBottom: 72 }}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={up}
              style={{ background: '#1A1A1A', padding: '44px 32px', borderTop: '3px solid #8E2C2D', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(52px, 10vw, 76px)', color: '#FFE500', lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, letterSpacing: 2, color: '#fff', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }} className="grid-r">
          {[
            { title: 'No votar también es una decisión', body: 'Si los jóvenes no votan, votan los que ya decidieron. El abstencionismo joven es el regalo más grande que le puedes dar al partido del status quo.' },
            { title: 'El voto joven nunca se ha organizado en Chihuahua', body: 'Eso es exactamente el problema — y la oportunidad. Un movimiento organizado de jóvenes chihuahuenses puede determinar el resultado de la gubernatura.' },
          ].map((c, i) => (
            <motion.div key={i} variants={up}
              style={{ background: '#1A1A1A', padding: '36px 28px', borderLeft: '2px solid rgba(255,229,0,0.3)' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 20, color: '#FFE500', textTransform: 'uppercase', marginBottom: 14, lineHeight: 1.1 }}>{c.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`@media(max-width:680px){.grid-r{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

/* ── POR QUÉ CRUZ ── */
function PorQueCruz() {
  const razones = [
    { icon: '🏙️', title: 'Construyó desde Juárez', body: '354,000 votos. El alcalde más votado en la historia de la ciudad. No promesas — resultados que se pueden tocar, ver y medir.' },
    { icon: '🎓', title: 'Egresado de la UACJ', body: 'Estudió Derecho en la misma universidad pública donde miles de jóvenes juarenses estudian hoy. Conoce la realidad, no el discurso.' },
    { icon: '🔗', title: 'Alineado con Sheinbaum', body: 'Becas, IMSS Bienestar, vivienda, empleo — los programas que el PAN bloqueó durante 12 años llegan si Chihuahua elige a Morena.' },
    { icon: '📍', title: 'Político de territorio', body: '30 años recorriendo Chihuahua. Conoce Juárez, Chihuahua capital, Parral, Delicias — no desde un helicóptero, desde la calle.' },
  ]

  return (
    <section id="cruz" style={{ background: '#080808', padding: '88px 20px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Cruz Pérez Cuéllar
          </motion.p>
          <motion.h2 variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(42px, 8vw, 80px)', textAlign: 'center', color: '#fff', lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 24 }}>
            ¿Por qué <span style={{ color: '#8E2C2D' }}>Cruz?</span>
          </motion.h2>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.45)', textAlign: 'center', maxWidth: 540, margin: '0 auto 72px', lineHeight: 1.75 }}>
            No te pedimos que votes por un partido. Te pedimos que revises los hechos y saques tus propias conclusiones.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {razones.map((r, i) => (
            <motion.div key={i} variants={up}
              whileHover={{ background: '#1A1A1A' }}
              style={{ background: '#111', padding: '40px 28px', transition: 'background 0.2s', borderBottom: '2px solid rgba(142,44,45,0.2)' }}>
              <div style={{ fontSize: 28, marginBottom: 18 }}>{r.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 19, color: '#fff', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1.1 }}>{r.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{r.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cruz quote block */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={up}
          style={{ marginTop: 2, background: '#8E2C2D', padding: '48px 40px', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(22px, 4vw, 32px)', color: '#fff', lineHeight: 1.3 }}>
              "354,000 chihuahuenses ya votaron por Cruz cuando podían elegir a cualquiera. Eso no es lealtad ciega — es un resultado que habla solo."
            </p>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <a href="https://www.instagram.com/cruzperezcuellar/" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase', border: '2px solid rgba(255,255,255,0.4)', padding: '12px 24px', borderRadius: 2 }}>
              @cruzperezcuellar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── EL MOVIMIENTO ── */
function ElMovimiento() {
  const acciones = [
    { step: '01', title: 'Únete', body: 'Regístrate y conecta con jóvenes organizados en tu colonia, municipio y universidad.' },
    { step: '02', title: 'Comparte', body: 'Comparte información verificada con tu red. En México, WhatsApp decide más elecciones que los anuncios de TV.' },
    { step: '03', title: 'Convierte', body: 'El voto indeciso no necesita un discurso — necesita una conversación honesta con alguien de confianza. Tú.' },
    { step: '04', title: 'Vota', body: 'Junio 2027. No dejes que otros decidan por ti qué Chihuahua te toca vivir.' },
  ]

  return (
    <section id="movimiento" style={{ background: '#0F0F0F', padding: '88px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #FFE500, transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#FFE500', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Cómo funciona
          </motion.p>
          <motion.h2 variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(42px, 8vw, 80px)', textAlign: 'center', color: '#fff', lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 80 }}>
            El movimiento<br /><span style={{ color: '#FFE500' }}>que sí llega</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {acciones.map((a, i) => (
            <motion.div key={i} variants={up}
              whileHover={{ background: '#222' }}
              style={{ background: '#1A1A1A', padding: '40px 24px', transition: 'background 0.2s', borderTop: `3px solid ${i % 2 === 0 ? '#8E2C2D' : '#FFE500'}` }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 52, color: i % 2 === 0 ? 'rgba(142,44,45,0.2)' : 'rgba(255,229,0,0.2)', lineHeight: 1, marginBottom: 16 }}>{a.step}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 28, color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{a.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{a.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Líderes del Cambio callout */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={up}
          style={{ marginTop: 48, background: '#1A1A1A', border: '1px solid rgba(255,229,0,0.15)', borderRadius: 2, padding: '40px 36px', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#FFE500', textTransform: 'uppercase', marginBottom: 10 }}>Respaldado por</p>
            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 28, color: '#fff', textTransform: 'uppercase', marginBottom: 12 }}>Líderes del Cambio</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
              Organización juvenil chihuahuense con presencia en Juárez, Chihuahua capital y ciudades fronterizas. Red de jóvenes comprometidos con transformar la política desde adentro.
            </p>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(60px, 12vw, 96px)', color: 'rgba(255,229,0,0.08)', lineHeight: 1, userSelect: 'none' }}>LC</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── RAZONES CONCRETAS (para el indeciso joven) ── */
function RazonesJoven() {
  const items = [
    { q: '¿Y si no sé nada de política?', a: 'No necesitas ser experto. Necesitas saber si tu colonia tiene pavimento, si tu mamá tiene médico, si tú tienes empleo cerca de casa. Eso es política.' },
    { q: '¿No son todos iguales?', a: 'Revisa quién fue alcalde de Juárez los últimos 3 años. Revisa las calles, el alumbrado, el servicio de agua. ¿Igual que antes? Juzga tú mismo.' },
    { q: '¿Para qué votar si no cambia nada?', a: 'Chihuahua lleva 12 años bajo el mismo partido. En 2027 Morena puede ganar por primera vez. Literalmente puede cambiar todo — si los jóvenes votamos.' },
    { q: '¿Qué saco yo si gana Cruz?', a: 'Becas, IMSS Bienestar, empleos en parques industriales que se expanden, y un gobernador que ya demostró que responde en las crisis.' },
  ]

  return (
    <section style={{ background: '#080808', padding: '88px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Preguntas reales
          </motion.p>
          <motion.h2 variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 72px)', textAlign: 'center', color: '#fff', lineHeight: 0.92, textTransform: 'uppercase', marginBottom: 64 }}>
            Lo que todos<br /><span style={{ color: '#FFE500' }}>piensan pero no dicen</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}>
          {items.map((item, i) => (
            <motion.div key={i} variants={up}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '32px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(18px, 4vw, 24px)', color: '#FFE500', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>{item.q}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{item.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── ÚNETE ── */
function Unete() {
  const msg = encodeURIComponent('Jóvenes Con Cruz — el movimiento que va a decidir Chihuahua 2027. Únete: jovenesconcruz.mx')
  const waUrl = `https://wa.me/?text=${msg}`

  return (
    <section id="unete" style={{ background: '#8E2C2D', padding: '100px 20px 80px', position: 'relative', overflow: 'hidden' }}>
      <Noise />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 32px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger(0.08)}>
          <motion.div variants={up}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(80px, 20vw, 160px)', color: 'rgba(0,0,0,0.1)', lineHeight: 1, marginBottom: -32, userSelect: 'none' }}>
            YO
          </motion.div>
          <motion.h2 variants={up} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(44px, 10vw, 88px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.92, marginBottom: 28 }}>
            SOY JOVEN<br />CON CRUZ
          </motion.h2>
          <motion.p variants={up} style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 52, maxWidth: 500, margin: '0 auto 52px' }}>
            No te pido que confíes ciegamente. Te pido que revises los hechos, compares con lo que teníamos antes y decidas con información real.
          </motion.p>

          <motion.div variants={up} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waUrl} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#080808', color: '#fff', padding: '16px 32px', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Compartir en WhatsApp
            </a>
            <a href="https://www.instagram.com/cruzperezcuellar/" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(255,255,255,0.8)', padding: '16px 32px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 2 }}>
              Seguir a Cruz
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ maxWidth: 1100, margin: '80px auto 0', borderTop: '1px solid rgba(0,0,0,0.15)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, position: 'relative' }}>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 16, color: '#fff' }}>
          JÓVENES <span style={{ color: '#FFE500' }}>CON CRUZ</span>
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Chihuahua 2027 · Material de precampaña juvenil
        </span>
      </motion.div>
    </section>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ElVoto />
      <PorQueCruz />
      <ElMovimiento />
      <RazonesJoven />
      <Unete />
    </>
  )
}
