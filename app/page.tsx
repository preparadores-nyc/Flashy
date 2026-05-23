"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <div className="fx-wrap" aria-hidden="true">
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
        <span className="fx-ring" />
        <span className="fx-mesh" />
      </div>

      <section className="hero">
        <article className="glass hero-main">
          <span className="pill">Santiago de Chile · Startup Mobility</span>
          <h1 className="brand">Flashy for Modern Cities</h1>
          <p className="subtitle">
            Una experiencia de movilidad corporativa con energia visual, glass premium y una interfaz
            moderna para operar pasajeros y conductores desde una sola plataforma.
          </p>
          <div className="hero-cta-row">
            <Link href="/rider" className="btn-link">Portal Pasajeros</Link>
            <Link href="/driver" className="btn-link secondary">Portal Conductores</Link>
          </div>
        </article>

        <aside className="glass hero-side">
          <h2 className="title">Panel Ejecutivo</h2>
          <div className="hero-kpi-list">
            <p><span>Operacion</span><strong>24/7</strong></p>
            <p><span>UX Performance</span><strong>Realtime</strong></p>
            <p><span>Escalabilidad</span><strong>Cloud Native</strong></p>
          </div>
          <div className="mini-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </aside>
      </section>

      <section className="grid portals">
        <Link href="/rider" className="glass card-link">
          <span className="chip">Customer Experience</span>
          <h2>Portal Pasajeros</h2>
          <p>Solicitudes de viaje en segundos, seguimiento en vivo y flujo claro de principio a fin.</p>
          <span className="card-arrow">Entrar al portal</span>
        </Link>

        <Link href="/driver" className="glass card-link">
          <span className="chip">Operations Core</span>
          <h2>Portal Conductores</h2>
          <p>Control de disponibilidad, gestion del viaje y estados operativos con estilo profesional.</p>
          <span className="card-arrow">Entrar al portal</span>
        </Link>
      </section>

      <section className="glass spotlight">
        <div className="spotlight-copy">
          <h3>Visual Brand Spotlight</h3>
          <p>
            Un lenguaje visual fresco y corporativo que combina glassmorphism, volumen 3D y
            direccion startup para comunicar confianza e innovacion en cada pantalla.
          </p>
          <div className="spot-tags" aria-hidden="true">
            <span>Growth UX</span>
            <span>Corporate Grade</span>
            <span>Mobile Ready</span>
          </div>
        </div>
        <div className="spotlight-image-wrap">
          <img
            className="spotlight-image"
            src="https://49659256.fs1.hubspotusercontent-na1.net/hubfs/49659256/PDFS/FLYERS%20PUBLICITARIOS/Copilot_20260523_075340.png"
            alt="Flashy visual concept"
            loading="lazy"
          />
        </div>
      </section>

      <div className="triple kpis">
        <div className="glass metric">
          <span className="small">Cobertura</span>
          <b>Santiago RM</b>
          <span className="small">Geocerca inteligente para pickup y dropoff confiable.</span>
        </div>
        <div className="glass metric">
          <span className="small">Confianza</span>
          <b>Verificacion Real</b>
          <span className="small">Onboarding completo de identidad y documentacion.</span>
        </div>
        <div className="glass metric">
          <span className="small">Velocidad</span>
          <b>Flujo Agil</b>
          <span className="small">REQUESTED a COMPLETED en una experiencia continua.</span>
        </div>
      </div>

      <section className="glass panel final-cta">
        <h3>Diseno listo para escalar</h3>
        <p>
          UI moderna, elegante y profesional para impulsar conversion en desktop y movil sin tocar
          la logica backend existente.
        </p>
      </section>
    </main>
  );
}
