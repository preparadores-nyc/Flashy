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
        <h1 className="brand">Flashy Mobility Platform</h1>
        <p className="subtitle">
          Plataforma estilo Uber para comenzar a operar de inmediato: onboarding completo,
          despacho, estados de viaje y experiencia visual premium para pasajeros y conductores.
        </p>
      </section>

      <div className="grid">
        <a className="glass card-link" href="/rider">
          <h2>Portal Pasajeros</h2>
          <p>Registro completo, solicitud de viajes, historial y seguimiento operativo.</p>
        </a>
        <a className="glass card-link" href="/driver">
          <h2>Portal Conductores</h2>
          <p>Registro completo, validación de vehículo, disponibilidad y gestión del viaje.</p>
        </a>
      </div>

      <section className="grid" style={{ marginTop: 14 }}>
        <article className="glass panel metric">
          <span className="small">Cobertura</span>
          <b>Solo Santiago</b>
          <span className="small">Geocerca activa en backend para pickup y dropoff</span>
        </article>
        <article className="glass panel metric">
          <span className="small">Onboarding</span>
          <b>Datos Reales</b>
          <span className="small">Captura de identidad, contacto y perfil operativo</span>
        </article>
        <article className="glass panel metric">
          <span className="small">Flujo</span>
          <b>End-to-end</b>
          <span className="small">REQUESTED → ACCEPTED → ARRIVED → IN_PROGRESS → COMPLETED</span>
        </article>
      </section>

      <section className="glass panel">
        <h3 className="title">Listo para operar desde hoy</h3>
        <p className="small">
          Para producción inmediata, conecta una base Postgres cloud en DATABASE_URL y define
          JWT_SECRET en Vercel. El frontend y la API ya están preparados para uso operativo.
        </p>
      </section>
    </main>
  );
}
