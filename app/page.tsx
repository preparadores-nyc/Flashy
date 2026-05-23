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
