"use client";

import { FormEvent, useState } from "react";

type RideRequest = {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
};

type RiderRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  addressLine1: string;
  commune: string;
  city: string;
  emergencyName: string;
  emergencyPhone: string;
};

export default function RiderPage() {
  const [registration, setRegistration] = useState<RiderRegistration>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+56",
    phone: "",
    nationalId: "",
    dateOfBirth: "",
    addressLine1: "",
    commune: "",
    city: "Santiago",
    emergencyName: "",
    emergencyPhone: ""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState<RideRequest>({
    pickupLat: -33.4489,
    pickupLng: -70.6693,
    dropoffLat: -33.4372,
    dropoffLng: -70.6506
  });
  const [result, setResult] = useState("Sin acciones todavía.");

  async function registerRider(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...registration,
        role: "RIDER",
        dateOfBirth: new Date(registration.dateOfBirth).toISOString()
      })
    });
    const data = await response.json();
    if (!response.ok) {
      setResult(JSON.stringify(data, null, 2));
      return;
    }
    setToken(data.token);
    setResult(JSON.stringify(data, null, 2));
  }

  async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
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
      <div className="fx-wrap" aria-hidden="true">
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
      </div>

      <section className="hero">
        <span className="pill">Experiencia Pasajero</span>
        <h1 className="brand">Viaja con Estilo</h1>
        <p className="subtitle">Tu movilidad en Santiago, rediseñada para ser más elegante, rápida y segura.</p>
      </section>

      <div className="grid">
        {/* Registration Panel */}
        <section className="glass panel" style={{ animation: "fadeUp 0.7s 0.1s ease-out both" }}>
          <h2 className="title">Registro de Pasajero</h2>
          <form onSubmit={registerRider}>
            <div className="row" style={{ marginBottom: 12 }}>
              <div>
                <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Nombre</label>
                <input
                  placeholder="Ej: Juan"
                  value={registration.firstName}
                  onChange={(e) => setRegistration((p) => ({ ...p, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Apellido</label>
                <input
                  placeholder="Ej: Pérez"
                  value={registration.lastName}
                  onChange={(e) => setRegistration((p) => ({ ...p, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="row" style={{ marginBottom: 12 }}>
              <div>
                <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Email</label>
                <input
                  placeholder="juan@ejemplo.cl"
                  value={registration.email}
                  onChange={(e) => setRegistration((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Contraseña</label>
                <input
                  placeholder="••••••••"
                  type="password"
                  value={registration.password}
                  onChange={(e) => setRegistration((p) => ({ ...p, password: e.target.value }))}
                />
              </div>
            </div>
            <div className="triple" style={{ marginBottom: 12 }}>
              <input
                placeholder="+56"
                value={registration.countryCode}
                onChange={(e) => setRegistration((p) => ({ ...p, countryCode: e.target.value }))}
              />
              <input
                placeholder="Teléfono"
                value={registration.phone}
                onChange={(e) => setRegistration((p) => ({ ...p, phone: e.target.value }))}
              />
              <input
                placeholder="RUT / ID"
                value={registration.nationalId}
                onChange={(e) => setRegistration((p) => ({ ...p, nationalId: e.target.value }))}
              />
            </div>
            <div className="row" style={{ marginBottom: 12 }}>
              <input
                type="date"
                value={registration.dateOfBirth}
                onChange={(e) => setRegistration((p) => ({ ...p, dateOfBirth: e.target.value }))}
              />
              <input
                placeholder="Dirección Residencial"
                value={registration.addressLine1}
                onChange={(e) => setRegistration((p) => ({ ...p, addressLine1: e.target.value }))}
              />
            </div>
            <button type="submit" style={{ marginTop: 8 }}>Crear Cuenta Premium</button>
          </form>
        </section>

        {/* Right Column */}
        <div>
          {/* Login Panel */}
          <section className="glass panel" style={{ animation: "fadeUp 0.7s 0.2s ease-out both" }}>
            <h2 className="title">Acceso Rápido</h2>
            <div className="row" style={{ marginBottom: 16 }}>
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="actions">
              <button onClick={login}>Iniciar Sesión</button>
              <button className="secondary" onClick={history}>Historial</button>
            </div>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 50,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.5px",
                background: token
                  ? "linear-gradient(135deg, rgba(105,240,174,0.3), rgba(40,199,111,0.2))"
                  : "rgba(255,255,255,0.06)",
                border: token
                  ? "1px solid rgba(105,240,174,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: token ? "#69f0ae" : "rgba(255,255,255,0.4)"
              }}>
                {token ? "✓ Sesión Activa" : "○ Sin Sesión"}
              </span>
            </div>
          </section>

          {/* Ride Request Panel */}
          <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.3s ease-out both" }}>
            <h2 className="title">Solicitar Flashy</h2>
            <form onSubmit={requestRide}>
              <div style={{
                background: "rgba(79,195,247,0.08)",
                padding: 16,
                borderRadius: 16,
                marginBottom: 14,
                border: "1px solid rgba(79,195,247,0.15)"
              }}>
                <p className="small" style={{ fontWeight: 700, color: "#4fc3f7", marginBottom: 10 }}>
                  📍 Punto de Recogida
                </p>
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
              </div>
              <div style={{
                background: "rgba(105,240,174,0.08)",
                padding: 16,
                borderRadius: 16,
                marginBottom: 14,
                border: "1px solid rgba(105,240,174,0.15)"
              }}>
                <p className="small" style={{ fontWeight: 700, color: "#69f0ae", marginBottom: 10 }}>
                  🏁 Destino Final
                </p>
                <div className="row">
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
              </div>
              <button className="accent" type="submit">Solicitar Ahora</button>
            </form>
          </section>
        </div>
      </div>

      {/* System Status */}
      <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.5s ease-out both" }}>
        <h2 className="title">Estado del Sistema</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
