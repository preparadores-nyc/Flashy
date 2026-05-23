"use client";

export default function HomePage() {
  return (
    <main className="container">
      <div className="fx-wrap" aria-hidden>
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
      </div>

      <section className="hero">
        <span className="pill">Santiago de Chile · Live Mobility</span>
        <h1 className="brand">Flashy Mobility</h1>
        <p className="subtitle">
          La plataforma de movilidad premium que redefine el transporte en Santiago. 
          Elegancia, seguridad y eficiencia en cada trayecto.
        </p>
      </section>

      <div className="grid">
        <a className="glass card-link" href="/rider" style={{ animationDelay: "0.2s" }}>
          <div className="icon-box" style={{ fontSize: '40px', marginBottom: '15px' }}>👤</div>
          <h2>Portal Pasajeros</h2>
          <p>Solicita tu Flashy con un toque. Experiencia de viaje premium con seguimiento en tiempo real.</p>
          <div className="btn-fake" style={{ marginTop: '20px', fontWeight: 'bold', color: '#00a8ff' }}>Ingresar →</div>
        </a>
        <a className="glass card-link" href="/driver" style={{ animationDelay: "0.4s" }}>
          <div className="icon-box" style={{ fontSize: '40px', marginBottom: '15px' }}>🚗</div>
          <h2>Portal Conductores</h2>
          <p>Únete a nuestra flota de socios. Gestiona tus viajes, disponibilidad y ganancias con elegancia.</p>
          <div className="btn-fake" style={{ marginTop: '20px', fontWeight: 'bold', color: '#00a8ff' }}>Ingresar →</div>
        </a>
      </div>

      <section className="grid" style={{ marginTop: 40 }}>
        <article className="glass panel metric" style={{ animationDelay: "0.6s" }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📍</div>
          <span className="small">Cobertura Total</span>
          <b>Santiago RM</b>
          <p className="small">Geocerca inteligente activa para máxima precisión.</p>
        </article>
        <article className="glass panel metric" style={{ animationDelay: "0.7s" }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🛡️</div>
          <span className="small">Seguridad</span>
          <b>Verificación Real</b>
          <p className="small">Onboarding completo de identidad y documentación.</p>
        </article>
        <article className="glass panel metric" style={{ animationDelay: "0.8s" }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
          <span className="small">Eficiencia</span>
          <b>Flujo Ágil</b>
          <p className="small">Desde la solicitud hasta el destino en tiempo récord.</p>
        </article>
      </section>

      <section className="glass panel" style={{ marginTop: 40, textAlign: 'center', animationDelay: "0.9s" }}>
        <h3 className="title" style={{ color: '#004e92', fontSize: '1.5rem' }}>Operación Inteligente</h3>
        <p style={{ color: '#4a5a6a', maxWidth: '600px', margin: '10px auto' }}>
          Flashy combina la estética Frutiger Aero con una infraestructura corporativa robusta, 
          ofreciendo una experiencia visual refrescante sin comprometer la fiabilidad técnica.
        </p>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-link, .panel { animation: fadeIn 0.8s ease-out both; }
        .icon-box { transition: transform 0.3s ease; }
        .card-link:hover .icon-box { transform: scale(1.2) rotate(5deg); }
      `}</style>
    </main>
  );
}
