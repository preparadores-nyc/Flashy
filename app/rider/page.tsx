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
      <div className="fx-wrap" aria-hidden>
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
      </div>

      <section className="hero">
        <span className="pill">Experiencia Pasajero</span>
        <h1 className="brand">Viaja con Estilo · Flashy</h1>
        <p className="subtitle">Tu movilidad en Santiago, rediseñada para ser más elegante, rápida y segura.</p>
      </section>

      <div className="grid">
        <section className="glass panel" style={{ animationDelay: "0.1s" }}>
          <h2 className="title" style={{ color: '#004e92', marginBottom: '20px', fontSize: '1.2rem' }}>1) Registro de Pasajero</h2>
          <form onSubmit={registerRider}>
            <div className="row">
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', color: '#4a5a6a', marginLeft: '5px' }}>Nombre</label>
                <input
                  placeholder="Ej: Juan"
                  value={registration.firstName}
                  onChange={(e) => setRegistration((p) => ({ ...p, firstName: e.target.value }))}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', color: '#4a5a6a', marginLeft: '5px' }}>Apellido</label>
                <input
                  placeholder="Ej: Pérez"
                  value={registration.lastName}
                  onChange={(e) => setRegistration((p) => ({ ...p, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="row">
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', color: '#4a5a6a', marginLeft: '5px' }}>Email Corporativo</label>
                <input
                  placeholder="juan@ejemplo.cl"
                  value={registration.email}
                  onChange={(e) => setRegistration((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', color: '#4a5a6a', marginLeft: '5px' }}>Contraseña</label>
                <input
                  placeholder="••••••••"
                  type="password"
                  value={registration.password}
                  onChange={(e) => setRegistration((p) => ({ ...p, password: e.target.value }))}
                />
              </div>
            </div>
            <div className="triple">
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
            <div className="row" style={{ marginTop: 10 }}>
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
            <button style={{ marginTop: 20 }} type="submit">Crear Cuenta Premium</button>
          </form>
        </section>

        <div className="flex-col">
          <section className="glass panel" style={{ animationDelay: "0.2s" }}>
            <h2 className="title" style={{ color: '#004e92', marginBottom: '20px' }}>2) Acceso Rápido</h2>
            <div className="row">
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="actions" style={{ marginTop: 20 }}>
              <button onClick={login}>Iniciar Sesión</button>
              <button className="secondary" onClick={history}>Historial de Viajes</button>
            </div>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <span className={`pill ${token ? '' : 'secondary'}`} style={{ fontSize: '10px', background: token ? '' : '#eee', color: token ? '' : '#999' }}>
                {token ? "✓ Sesión Activa" : "○ Sin Sesión"}
              </span>
            </div>
          </section>

          <section className="glass panel" style={{ animationDelay: "0.3s", marginTop: '20px' }}>
            <h2 className="title" style={{ color: '#004e92', marginBottom: '20px' }}>3) Solicitar Flashy</h2>
            <form onSubmit={requestRide}>
              <div style={{ background: 'rgba(0,168,255,0.05)', padding: '15px', borderRadius: '16px', marginBottom: '15px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#004e92', marginBottom: '10px' }}>Punto de Recogida</p>
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
              <div style={{ background: 'rgba(50,255,126,0.05)', padding: '15px', borderRadius: '16px', marginBottom: '15px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#004e92', marginBottom: '10px' }}>Destino Final</p>
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
              <button type="submit" style={{ background: 'linear-gradient(135deg, #32ff7e, #00d2ff)', color: '#004e92' }}>Solicitar Ahora</button>
            </form>
          </section>
        </div>
      </div>

      <section className="glass panel" style={{ marginTop: 24, animationDelay: "0.4s" }}>
        <h2 className="title" style={{ color: '#004e92' }}>Estado del Sistema</h2>
        <pre>{result}</pre>
      </section>

      <style jsx>{`
        .flex-col { display: flex; flex-direction: column; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .panel { animation: fadeIn 0.6s ease-out both; }
      `}</style>
    </main>
  );
}
