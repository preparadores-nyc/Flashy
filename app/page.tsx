export default function HomePage() {
  return (
    <main className="container">
      <h1>Flashy</h1>
      <p>Movilidad urbana dentro de Santiago de Chile.</p>
      <div className="grid">
        <a className="card" href="/rider">
          <h2>Modo Pasajero</h2>
          <p>Solicita viajes, revisa tarifa estimada e historial.</p>
        </a>
        <a className="card" href="/driver">
          <h2>Modo Conductor</h2>
          <p>Conéctate, toma viajes cercanos y actualiza estados.</p>
        </a>
      </div>
    </main>
  );
}
