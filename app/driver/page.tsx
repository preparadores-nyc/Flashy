"use client";

import { useState } from "react";

type NearbyResponse = {
  nearby?: Array<{ ride: { id: string; status: string; fareEstimate: number }; distanceKm: number }>;
};

type DriverRegistration = {
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
  licenseNumber: string;
  licenseExpiry: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  vehiclePlate: string;
  insurancePolicy: string;
};

export default function DriverPage() {
  const [registration, setRegistration] = useState<DriverRegistration>({
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
    licenseNumber: "",
    licenseExpiry: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: 2021,
    vehicleColor: "",
    vehiclePlate: "",
    insurancePolicy: ""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [lat, setLat] = useState(-33.4489);
  const [lng, setLng] = useState(-70.6693);
  const [selectedRide, setSelectedRide] = useState("");
  const [nearby, setNearby] = useState<NearbyResponse>({});
  const [result, setResult] = useState("Sin acciones todavia.");

  async function registerDriver() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...registration,
        role: "DRIVER",
        dateOfBirth: new Date(registration.dateOfBirth).toISOString(),
        licenseExpiry: new Date(registration.licenseExpiry).toISOString()
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

  async function setAvailability(online: boolean) {
    const response = await fetch("/api/driver/status", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ online })
    });
    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  }

  async function scanNearby() {
    const response = await fetch("/api/rides/nearby", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ lat, lng })
    });
    const data = (await response.json()) as NearbyResponse;
    setNearby(data);
    setResult(JSON.stringify(data, null, 2));
  }

  async function acceptRide(id: string) {
    const response = await fetch(`/api/rides/${id}/accept`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setSelectedRide(id);
    setResult(JSON.stringify(data, null, 2));
  }

  async function patchStatus(status: "ARRIVED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") {
    if (!selectedRide) return;
    const response = await fetch(`/api/rides/${selectedRide}/status`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
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
        <span className="pill">Portal Conductores</span>
        <h1 className="brand">Onboarding Driver · Flashy</h1>
        <p className="subtitle">Registro completo de conductor, vehiculo y documentacion operativa.</p>
      </section>

      <section className="glass panel">
        <h2 className="title">1) Registro conductor</h2>
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
            type="password"
            placeholder="Contrasena"
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
            placeholder="Licencia"
            value={registration.licenseNumber}
            onChange={(e) => setRegistration((p) => ({ ...p, licenseNumber: e.target.value }))}
          />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input
            type="date"
            value={registration.licenseExpiry}
            onChange={(e) => setRegistration((p) => ({ ...p, licenseExpiry: e.target.value }))}
          />
          <input
            placeholder="Poliza seguro"
            value={registration.insurancePolicy}
            onChange={(e) => setRegistration((p) => ({ ...p, insurancePolicy: e.target.value }))}
          />
        </div>
        <div className="triple" style={{ marginTop: 10 }}>
          <input
            placeholder="Marca"
            value={registration.vehicleMake}
            onChange={(e) => setRegistration((p) => ({ ...p, vehicleMake: e.target.value }))}
          />
          <input
            placeholder="Modelo"
            value={registration.vehicleModel}
            onChange={(e) => setRegistration((p) => ({ ...p, vehicleModel: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Ano"
            value={registration.vehicleYear}
            onChange={(e) => setRegistration((p) => ({ ...p, vehicleYear: Number(e.target.value) }))}
          />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input
            placeholder="Color"
            value={registration.vehicleColor}
            onChange={(e) => setRegistration((p) => ({ ...p, vehicleColor: e.target.value }))}
          />
          <input
            placeholder="Patente"
            value={registration.vehiclePlate}
            onChange={(e) => setRegistration((p) => ({ ...p, vehiclePlate: e.target.value }))}
          />
        </div>
        <button style={{ marginTop: 10 }} onClick={registerDriver}>Crear cuenta conductor</button>
      </section>

      <section className="glass panel">
        <h2 className="title">2) Login conductor</h2>
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
        </div>
        <p className="small">Sesion JWT: {token ? "activa" : "sin sesion"}</p>
      </section>

      <section className="glass panel">
        <h2 className="title">3) Disponibilidad</h2>
        <div className="actions">
          <button onClick={() => setAvailability(true)}>Online</button>
          <button className="secondary" onClick={() => setAvailability(false)}>Offline</button>
        </div>
      </section>

      <section className="glass panel">
        <h2 className="title">4) Buscar viajes cercanos</h2>
        <div className="row">
          <input type="number" step="0.000001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
          <input type="number" step="0.000001" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
        </div>
        <button style={{ marginTop: 10 }} onClick={scanNearby}>Buscar</button>

        {(nearby.nearby || []).map((item) => (
          <div className="glass panel" key={item.ride.id} style={{ marginTop: 10 }}>
            <p>
              Ride: {item.ride.id} | {item.distanceKm.toFixed(2)} km | CLP {item.ride.fareEstimate}
            </p>
            <button onClick={() => acceptRide(item.ride.id)}>Aceptar viaje</button>
          </div>
        ))}
      </section>

      <section className="glass panel">
        <h2 className="title">5) Estado del viaje activo</h2>
        <p className="small">Ride seleccionado: {selectedRide || "ninguno"}</p>
        <div className="grid">
          <button onClick={() => patchStatus("ARRIVED")}>Llegue</button>
          <button onClick={() => patchStatus("IN_PROGRESS")}>Iniciar</button>
          <button onClick={() => patchStatus("COMPLETED")}>Completar</button>
          <button className="secondary" onClick={() => patchStatus("CANCELLED")}>Cancelar</button>
        </div>
      </section>

      <section className="glass panel">
        <h2 className="title">6) Resultado API</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
