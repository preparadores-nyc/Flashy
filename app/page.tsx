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
        <span className="fx-beam" />
      </div>

      <section className="hero">
        <article className="glass hero-main">
          <span className="pill">Santiago de Chile · Night Operations</span>
          <h1 className="brand">Flashy Neon Mobility Grid</h1>
          <p className="subtitle">
            Direccion visual nocturna con neones, movimiento constante y presencia corporativa para
            operar pasajeros y conductores con estilo startup de alto impacto.
          </p>
          <div className="hero-cta-row">
            <Link href="/rider" className="btn-link">Activar Pasajeros</Link>
            <Link href="/driver" className="btn-link secondary">Activar Conductores</Link>
          </div>
        </article>

        <aside className="glass hero-side">
          <h2 className="title">Pulse Command</h2>
          <div className="hero-kpi-list">
            <p><span>Operacion nocturna</span><strong>24/7</strong></p>
            <p><span>Sync de estado</span><strong>Live</strong></p>
            <p><span>Decision speed</span><strong>Fast Lane</strong></p>
          </div>
          <div className="mini-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </aside>
      </section>

      <section className="glass pulse-strip" aria-label="Movimiento continuo">
        <p>
          Despacho inteligente en movimiento permanente · Señal activa · Matching dinamico ·
          Tracking en tiempo real · Experiencia premium de punta a punta
        </p>
      </section>

      <section className="grid portals">
        <Link href="/rider" className="glass card-link">
          <span className="chip">Rider Flow</span>
          <h2>Portal Pasajeros</h2>
          <p>Solicitudes en segundos, seguimiento en vivo y experiencia visual nocturna de nivel pro.</p>
          <span className="card-arrow">Entrar al portal</span>
        </Link>

        <Link href="/driver" className="glass card-link">
          <span className="chip">Driver Core</span>
          <h2>Portal Conductores</h2>
          <p>Control de disponibilidad, gestion del viaje y estados operativos con vista de comando.</p>
          <span className="card-arrow">Entrar al portal</span>
        </Link>
      </section>

      <section className="glass motion-board">
        <div className="motion-head">
          <h3>Motion Analytics</h3>
          <span className="small">Live graph stream · Last 60 min</span>
        </div>
        <div className="chart-grid">
          <article className="glass chart-card">
            <h4>Demanda por Zona</h4>
            <svg viewBox="0 0 320 120" className="chart-svg" aria-label="Grafica demanda">
              <path className="chart-track" d="M6 96 C50 90, 72 42, 116 56 C146 66, 180 30, 212 48 C246 68, 276 34, 314 40" />
              <path className="chart-glow" d="M6 96 C50 90, 72 42, 116 56 C146 66, 180 30, 212 48 C246 68, 276 34, 314 40" />
              <circle className="chart-dot" cx="314" cy="40" r="4" />
            </svg>
          </article>
          <article className="glass chart-card">
            <h4>Tiempo de Respuesta</h4>
            <svg viewBox="0 0 320 120" className="chart-svg" aria-label="Grafica respuesta">
              <path className="chart-track two" d="M6 44 C42 70, 82 24, 122 54 C154 74, 184 62, 214 78 C246 94, 278 70, 314 66" />
              <path className="chart-glow two" d="M6 44 C42 70, 82 24, 122 54 C154 74, 184 62, 214 78 C246 94, 278 70, 314 66" />
              <circle className="chart-dot two" cx="314" cy="66" r="4" />
            </svg>
          </article>
        </div>
      </section>

      <section className="glass spotlight">
        <div className="spotlight-copy">
          <h3>Nocturnal Brand Spotlight</h3>
          <p>
            La marca entra en modo neon: contraste alto, relieves brillantes y un look corporativo
            moderno para presentar producto, tecnologia y crecimiento.
          </p>
          <div className="spot-tags" aria-hidden="true">
            <span>Dark Mode Ops</span>
            <span>Neon Startup</span>
            <span>Motion First</span>
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
          <span className="small">Cobertura Activa</span>
          <b>Santiago RM</b>
          <span className="small">Geocerca inteligente para pickup y dropoff en alta precision.</span>
        </div>
        <div className="glass metric">
          <span className="small">Seguridad</span>
          <b>Verificacion Real</b>
          <span className="small">Onboarding completo y control de perfil operativo.</span>
        </div>
        <div className="glass metric">
          <span className="small">Ritmo</span>
          <b>Flujo Agil</b>
          <span className="small">REQUESTED a COMPLETED con continuidad visual en tiempo real.</span>
        </div>
      </div>

      <section className="glass panel final-cta">
        <h3>Diseno nocturno listo para escalar</h3>
        <p>
          Interfaz dark con neones y animaciones de alto detalle para desktop y movil, sin tocar
          backend ni logica de negocio existente.
        </p>
      </section>
    </main>
  );
}
