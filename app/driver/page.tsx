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
  const [result, setResult] = useState("Sin acciones todavía.");

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
        <span className="pill">Portal de Socios</span>
        <h1 className="brand">Conduce el Futuro · Flashy</h1>
        <p className="subtitle">Gestión operativa premium para conductores profesionales en Santiago.</p>
      </section>

      <div className="grid">
        <section className="glass panel" style={{ animationDelay: "0.1s" }}>
          <h2 className="title" style={{ color: '#004e92', marginBottom: '20px' }}>1) Registro Profesional</h2>
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
              placeholder="Email Corporativo"
              value={registration.email}
              onChange={(e) => setRegistration((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registration.password}
              onChange={(e) => setRegistration((p) => ({ ...p, password: e.target.value }))}
            />
          </div>
          
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(0,78,146,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#004e92', marginBottom: '10px' }}>Datos del Vehículo</p>
            <div className="triple">
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
                placeholder="Año"
                value={registration.vehicleYear}
                onChange={(e) => setRegistration((p) => ({ ...p, vehicleYear: Number(e.target.value) }))}
              />
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <input
                placeholder="Patente"
                value={registration.vehiclePlate}
                onChange={(e) => setRegistration((p) => ({ ...p, vehiclePlate: e.target.value }))}
              />
              <input
                placeholder="Color"
                value={registration.vehicleColor}
                onChange={(e) => setRegistration((p) => ({ ...p, vehicleColor: e.target.value }))}
              />
            </div>
          </div>
          
          <button style={{ marginTop: 20 }} onClick={registerDriver}>Activar Cuenta Socio</button>
        </section>

        <div className="flex-col">
          <section className="glass panel" style={{ animationDelay: "0.2s" }}>
            <h2 className="title" style={{ color: '#004e92', marginBottom: '20px' }}>2) Acceso Socio</h2>
            <div className="row">
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button style={{ marginTop: 20 }} onClick={login}>Entrar al Portal</button>
          </section>

          <section className="glass panel" style={{ animationDelay: "0.3s", marginTop: '20px' }}>
            <h2 className="title" style={{ color: '#004e92', marginBottom: '20px' }}>3) Operación y Disponibilidad</h2>
            <div className="actions">
              <button onClick={() => setAvailability(true)} style={{ background: 'linear-gradient(135deg, #32ff7e, #00d2ff)', color: '#004e92' }}>Ponerse Online</button>
              <button className="secondary" onClick={() => setAvailability(false)}>Desconectarse</button>
            </div>
            
            <div style={{ marginTop: '20px', background: 'rgba(0,168,255,0.05)', padding: '15px', borderRadius: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#004e92', marginBottom: '10px' }}>Ubicación Actual</p>
              <div className="row">
                <input type="number" step="0.000001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
                <input type="number" step="0.000001" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
              </div>
              <button style={{ marginTop: 10 }} onClick={scanNearby}>Escanear Viajes Cercanos</button>
            </div>
          </section>
        </div>
      </div>

      <section className="glass panel" style={{ marginTop: 24, animationDelay: "0.4s" }}>
        <h2 className="title" style={{ color: '#004e92' }}>Panel de Viajes Disponibles</h2>
        <div className="grid">
          {(nearby.nearby || []).length > 0 ? (
            nearby.nearby?.map((item) => (
              <div className="glass panel" key={item.ride.id} style={{ background: 'white', border: '1px solid #00a8ff' }}>
                <p style={{ fontWeight: 'bold', color: '#004e92' }}>Viaje: {item.ride.id.substring(0,8)}</p>
                <p style={{ fontSize: '14px' }}>Distancia: {item.distanceKm.toFixed(2)} km</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#32ff7e' }}>CLP {item.ride.fareEstimate}</p>
                <button style={{ marginTop: 10, padding: '10px' }} onClick={() => acceptRide(item.ride.id)}>Aceptar</button>
              </div>
            ))
          ) : (
            <p style={{ color: '#4a5a6a', textAlign: 'center', gridColumn: '1/-1', padding: '20px' }}>No hay viajes cercanos disponibles en este momento.</p>
          )}
        </div>
      </section>

      <section className="glass panel" style={{ marginTop: 24, animationDelay: "0.5s" }}>
        <h2 className="title" style={{ color: '#004e92' }}>Control de Viaje Activo</h2>
        <p className="small" style={{ marginBottom: '15px' }}>ID: {selectedRide || "Ninguno seleccionado"}</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <button onClick={() => patchStatus("ARRIVED")}>Llegué</button>
          <button onClick={() => patchStatus("IN_PROGRESS")}>Iniciar</button>
          <button onClick={() => patchStatus("COMPLETED")} style={{ background: 'var(--accent)', color: '#004e92' }}>Completar</button>
          <button className="secondary" onClick={() => patchStatus("CANCELLED")}>Cancelar</button>
        </div>
      </section>

      <section className="glass panel" style={{ marginTop: 24, animationDelay: "0.6s" }}>
        <h2 className="title" style={{ color: '#004e92' }}>Logs de Operación</h2>
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
