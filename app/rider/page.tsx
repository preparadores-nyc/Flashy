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
  const [result, setResult] = useState("Sin acciones todavia.");

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
        <span className="pill">Portal Pasajeros</span>
        <h1 className="brand">Onboarding Rider · Flashy</h1>
        <p className="subtitle">Registro completo con datos operativos estilo app de movilidad premium.</p>
      </section>

      <section className="glass panel">
        <h2 className="title">1) Registro pasajero</h2>
        <form onSubmit={registerRider}>
          <div className="row">
            <input
              placeholder="Nombre"
              value={registration.firstName}
              onChange={(e) => setRegistration((p) => ({ ...p, firstName: e.target.value }))}
            />
            <input
              placeholder="Apellido"
              value={registration.lastName}
              onChange={(e) => setRegistration((p) => ({ ...p, lastName: e.target.value }))}
            />
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <input
              placeholder="Email"
              value={registration.email}
              onChange={(e) => setRegistration((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              placeholder="Contrasena"
              type="password"
              value={registration.password}
              onChange={(e) => setRegistration((p) => ({ ...p, password: e.target.value }))}
            />
          </div>
          <div className="triple" style={{ marginTop: 10 }}>
            <input
              placeholder="Codigo pais"
              value={registration.countryCode}
              onChange={(e) => setRegistration((p) => ({ ...p, countryCode: e.target.value }))}
            />
            <input
              placeholder="Telefono"
              value={registration.phone}
              onChange={(e) => setRegistration((p) => ({ ...p, phone: e.target.value }))}
            />
            <input
              placeholder="Rut / ID"
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
              placeholder="Direccion"
              value={registration.addressLine1}
              onChange={(e) => setRegistration((p) => ({ ...p, addressLine1: e.target.value }))}
            />
          </div>
          <div className="triple" style={{ marginTop: 10 }}>
            <input
              placeholder="Comuna"
              value={registration.commune}
              onChange={(e) => setRegistration((p) => ({ ...p, commune: e.target.value }))}
            />
            <input
              placeholder="Ciudad"
              value={registration.city}
              onChange={(e) => setRegistration((p) => ({ ...p, city: e.target.value }))}
            />
            <input
              placeholder="Contacto emergencia"
              value={registration.emergencyName}
              onChange={(e) => setRegistration((p) => ({ ...p, emergencyName: e.target.value }))}
            />
          </div>
          <input
            style={{ marginTop: 10 }}
            placeholder="Telefono emergencia"
            value={registration.emergencyPhone}
            onChange={(e) => setRegistration((p) => ({ ...p, emergencyPhone: e.target.value }))}
          />
          <button style={{ marginTop: 10 }} type="submit">Crear cuenta pasajero</button>
        </form>
      </section>

      <section className="glass panel">
        <h2 className="title">2) Login pasajero</h2>
        <div className="row">
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="Contrasena"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions" style={{ marginTop: 10 }}>
          <button onClick={login}>Entrar</button>
          <button className="secondary" onClick={history}>Ver historial</button>
        </div>
        <p className="small">Sesion JWT: {token ? "activa" : "sin sesion"}</p>
      </section>

      <section className="glass panel">
        <h2 className="title">3) Solicitar viaje</h2>
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

      <section className="glass panel">
        <h2 className="title">4) Resultado API</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
