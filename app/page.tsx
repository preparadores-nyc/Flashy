"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      {/* Floating 3D Orbs */}
      <div className="fx-wrap" aria-hidden="true">
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <span className="pill">Santiago de Chile · Live Mobility</span>
        <h1 className="brand">Flashy Mobility</h1>
        <p className="subtitle">
          La plataforma de movilidad premium que redefine el transporte en Santiago.
          Elegancia, seguridad y eficiencia en cada trayecto.
        </p>
      </section>

      {/* Trust / Validation Block */}
      <section className="trust" style={{ marginBottom: 28, animation: "fadeUp 0.8s 0.45s ease-out both" }}>
        <div className="trust-grid">
          <div className="glass trust-item" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.5s" }}>
            <div style={{ color: "var(--aero-cyan)", fontSize: 28, marginBottom: 12 }} aria-hidden>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1l3 3 5 1-3 4 1 5-5-2-5 2 1-5-3-4 5-1 3-3z" fill="currentColor" />
              </svg>
            </div>
            <h4>Seguridad del viaje</h4>
            <p className="small">Protección y asistencia 24/7 durante cada recorrido.</p>
          </div>

          <div className="glass trust-item" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.55s" }}>
            <div style={{ color: "var(--aero-cyan)", fontSize: 28, marginBottom: 12 }} aria-hidden>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h4>Geocerca activa</h4>
            <p className="small">Rutas y solicitudes válidas solo dentro de la Región Metropolitana.</p>
          </div>

          <div className="glass trust-item" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.6s" }}>
            <div style={{ color: "var(--aero-cyan)", fontSize: 28, marginBottom: 12 }} aria-hidden>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <circle cx="8.5" cy="13.5" r="1.3" fill="currentColor" />
                <circle cx="15.5" cy="13.5" r="1.3" fill="currentColor" />
              </svg>
            </div>
            <h4>Conductores verificados</h4>
            <p className="small">Socios validados por identidad, licencia y documentación.</p>
          </div>

          <div className="glass trust-item" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.65s" }}>
            <div style={{ color: "var(--aero-cyan)", fontSize: 28, marginBottom: 12 }} aria-hidden>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7h20v10H2z" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <path d="M6 11h.01M10 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Pago seguro</h4>
            <p className="small">Transacciones cifradas y opciones múltiples de pago.</p>
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <div className="grid" style={{ marginBottom: 40 }}>
        <Link href="/rider" className="glass card-link" style={{ animationDelay: "0.4s", animation: "fadeUp 0.8s ease-out both" }}>
          <div style={{ fontSize: 48, marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(79,195,247,0.4))" }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="26" fill="url(#grad1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <circle cx="28" cy="20" r="8" fill="rgba(255,255,255,0.9)"/>
              <path d="M14 44c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="rgba(255,255,255,0.9)"/>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="56" y2="56">
                  <stop offset="0%" stopColor="#4fc3f7"/>
                  <stop offset="100%" stopColor="#0288d1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2>Portal Pasajeros</h2>
          <p>Solicita tu Flashy con un toque. Experiencia de viaje premium con seguimiento en tiempo real.</p>
          <span style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 24px",
            borderRadius: 50,
            background: "linear-gradient(135deg, rgba(79,195,247,0.3), rgba(0,229,255,0.2))",
            border: "1px solid rgba(79,195,247,0.4)",
            fontSize: 14,
            fontWeight: 600,
            color: "#4fc3f7",
            letterSpacing: "0.5px"
          }}>
            Ingresar →
          </span>
        </Link>

        <Link href="/driver" className="glass card-link" style={{ animationDelay: "0.6s", animation: "fadeUp 0.8s 0.2s ease-out both" }}>
          <div style={{ fontSize: 48, marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(105,240,174,0.4))" }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="26" fill="url(#grad2)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <rect x="14" y="24" width="28" height="14" rx="7" fill="rgba(255,255,255,0.9)"/>
              <circle cx="20" cy="38" r="4" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
              <circle cx="36" cy="38" r="4" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
              <path d="M18 24l4-8h12l4 8" fill="rgba(255,255,255,0.7)"/>
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="56" y2="56">
                  <stop offset="0%" stopColor="#69f0ae"/>
                  <stop offset="100%" stopColor="#1e9e5a"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2>Portal Conductores</h2>
          <p>Únete a nuestra flota de socios. Gestiona tus viajes, disponibilidad y ganancias con elegancia.</p>
          <span style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 24px",
            borderRadius: 50,
            background: "linear-gradient(135deg, rgba(105,240,174,0.3), rgba(40,199,111,0.2))",
            border: "1px solid rgba(105,240,174,0.4)",
            fontSize: 14,
            fontWeight: 600,
            color: "#69f0ae",
            letterSpacing: "0.5px"
          }}>
            Ingresar →
          </span>
        </Link>
      </div>

      {/* Feature Metrics */}
      <div className="triple" style={{ marginBottom: 40, animation: "fadeUp 0.8s 0.5s ease-out both" }}>
        <div className="glass metric">
          <span style={{ fontSize: 32, filter: "drop-shadow(0 2px 8px rgba(79,195,247,0.5))" }}>📍</span>
          <span className="small">Cobertura Total</span>
          <b>Santiago RM</b>
          <span className="small">Geocerca inteligente activa para máxima precisión.</span>
        </div>
        <div className="glass metric">
          <span style={{ fontSize: 32, filter: "drop-shadow(0 2px 8px rgba(105,240,174,0.5))" }}>🛡️</span>
          <span className="small">Seguridad</span>
          <b>Verificación Real</b>
          <span className="small">Onboarding completo de identidad y documentación.</span>
        </div>
        <div className="glass metric">
          <span style={{ fontSize: 32, filter: "drop-shadow(0 2px 8px rgba(255,213,79,0.5))" }}>⚡</span>
          <span className="small">Eficiencia</span>
          <b>Flujo Ágil</b>
          <span className="small">Desde la solicitud hasta el destino en tiempo récord.</span>
        </div>
      </div>

      <section className="benefits" style={{ marginBottom: 40 }}>
        <h2 className="title" style={{ animation: "fadeUp 0.8s 0.55s ease-out both" }}>Benefits</h2>
        <div className="benefits-grid">
          <div className="glass benefit-card" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.6s" }}>
            <div className="stat">500+</div>
            <h3>Conductores verificados</h3>
            <p className="description">Socios seleccionados con licencia, documentación y validación completa para viajes confiables.</p>
          </div>
          <div className="glass benefit-card" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.7s" }}>
            <div className="stat">98%</div>
            <h3>Satisfacción del cliente</h3>
            <p className="description">Calidad de servicio premium y experiencia ágil que mantiene a los pasajeros felices en cada viaje.</p>
          </div>
          <div className="glass benefit-card" style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: "0.8s" }}>
            <div className="stat">RM</div>
            <h3>Cobertura en toda la RM</h3>
            <p className="description">Disponible en todo Santiago con geocerca inteligente, viajes rápidos y soporte local.</p>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <div className="glass panel" style={{ textAlign: "center", animation: "fadeUp 0.8s 0.7s ease-out both" }}>
        <h3 style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          fontSize: "1.3rem",
          marginBottom: 12,
          background: "linear-gradient(135deg, #ffffff, #4fc3f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Operación Inteligente
        </h3>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 600, margin: "0 auto", fontSize: "0.95rem" }}>
          Flashy combina la estética Frutiger Aero con una infraestructura corporativa robusta,
          ofreciendo una experiencia visual refrescante sin comprometer la fiabilidad técnica.
        </p>
      </div>
    </main>
  );
}
