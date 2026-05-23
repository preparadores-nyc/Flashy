"use client";

import { FormEvent, useState } from "react";

type RideRequest = {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
};

export default function RiderPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState<RideRequest>({
    pickupLat: -33.4489,
    pickupLng: -70.6693,
    dropoffLat: -33.4372,
    dropoffLng: -70.6506
  });
  const [result, setResult] = useState("Sin acciones todavia.");

  async function auth(mode: "register" | "login") {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, role: "RIDER" })
    });
    const data = await response.json();
    if (!response.ok) {
      setResult(JSON.stringify(data, null, 2));
      return;
    }
    setToken(data.token);
    setResult(JSON.stringify(data, null, 2));
  }

  async function requestRide(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/rides/request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  }

  async function history() {
    const response = await fetch("/api/rides/history", {
      headers: { authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <main className="container">
      <h1>Flashy Rider</h1>
      <p className="small">Operacion restringida a Santiago de Chile.</p>

      <section className="panel">
        <h2>1) Acceso pasajero</h2>
        <div className="row">
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <button onClick={() => auth("register")}>Registrarme</button>
          <button className="secondary" onClick={() => auth("login")}>Entrar</button>
        </div>
        <p className="small">JWT: {token ? "activo" : "sin sesion"}</p>
      </section>

      <section className="panel">
        <h2>2) Solicitar viaje</h2>
        <form onSubmit={requestRide}>
          <div className="row">
            <input
              type="number"
              step="0.000001"
              value={payload.pickupLat}
              onChange={(e) => setPayload((p) => ({ ...p, pickupLat: Number(e.target.value) }))}
            />
            <input
              type="number"
              step="0.000001"
              value={payload.pickupLng}
              onChange={(e) => setPayload((p) => ({ ...p, pickupLng: Number(e.target.value) }))}
            />
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <input
              type="number"
              step="0.000001"
              value={payload.dropoffLat}
              onChange={(e) => setPayload((p) => ({ ...p, dropoffLat: Number(e.target.value) }))}
            />
            <input
              type="number"
              step="0.000001"
              value={payload.dropoffLng}
              onChange={(e) => setPayload((p) => ({ ...p, dropoffLng: Number(e.target.value) }))}
            />
          </div>
          <button style={{ marginTop: 10 }} type="submit">Pedir Flashy</button>
        </form>
      </section>

      <section className="panel">
        <h2>3) Historial</h2>
        <button className="secondary" onClick={history}>Ver historial</button>
      </section>

      <section className="panel">
        <h2>Resultado</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
