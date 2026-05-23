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
      <div className="fx-wrap" aria-hidden="true">
        <span className="fx-orb a" />
        <span className="fx-orb b" />
        <span className="fx-orb c" />
      </div>

      <section className="hero">
        <span className="pill">Portal de Socios</span>
        <h1 className="brand">Conduce el Futuro</h1>
        <p className="subtitle">Gestión operativa premium para conductores profesionales en Santiago.</p>
      </section>

      <div className="grid">
        {/* Registration Panel */}
        <section className="glass panel" style={{ animation: "fadeUp 0.7s 0.1s ease-out both" }}>
          <h2 className="title">Registro Profesional</h2>
          <div className="row" style={{ marginBottom: 12 }}>
            <div>
              <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Nombre</label>
              <input
                placeholder="Nombre"
                value={registration.firstName}
                onChange={(e) => setRegistration((p) => ({ ...p, firstName: e.target.value }))}
              />
            </div>
            <div>
              <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Apellido</label>
              <input
                placeholder="Apellido"
                value={registration.lastName}
                onChange={(e) => setRegistration((p) => ({ ...p, lastName: e.target.value }))}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: 12 }}>
            <div>
              <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Email</label>
              <input
                placeholder="Email Corporativo"
                value={registration.email}
                onChange={(e) => setRegistration((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="small" style={{ display: "block", marginBottom: 6, marginLeft: 4 }}>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={registration.password}
                onChange={(e) => setRegistration((p) => ({ ...p, password: e.target.value }))}
              />
            </div>
          </div>

          {/* Vehicle Section */}
          <div style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}>
            <p className="small" style={{ fontWeight: 700, color: "#4fc3f7", marginBottom: 12 }}>
              🚗 Datos del Vehículo
            </p>
            <div className="triple" style={{ marginBottom: 12 }}>
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
            <div className="row">
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

        {/* Right Column */}
        <div>
          {/* Login Panel */}
          <section className="glass panel" style={{ animation: "fadeUp 0.7s 0.2s ease-out both" }}>
            <h2 className="title">Acceso Socio</h2>
            <div className="row" style={{ marginBottom: 16 }}>
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={login}>Entrar al Portal</button>
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

          {/* Availability Panel */}
          <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.3s ease-out both" }}>
            <h2 className="title">Operación y Disponibilidad</h2>
            <div className="actions" style={{ marginBottom: 20 }}>
              <button className="accent" onClick={() => setAvailability(true)}>Ponerse Online</button>
              <button className="secondary" onClick={() => setAvailability(false)}>Desconectarse</button>
            </div>

            <div style={{
              background: "rgba(79,195,247,0.08)",
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(79,195,247,0.15)"
            }}>
              <p className="small" style={{ fontWeight: 700, color: "#4fc3f7", marginBottom: 10 }}>
                📍 Ubicación Actual
              </p>
              <div className="row" style={{ marginBottom: 12 }}>
                <input type="number" step="0.000001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
                <input type="number" step="0.000001" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
              </div>
              <button onClick={scanNearby}>Escanear Viajes Cercanos</button>
            </div>
          </section>
        </div>
      </div>

      {/* Nearby Rides Panel */}
      <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.4s ease-out both" }}>
        <h2 className="title">Viajes Disponibles</h2>
        {(nearby.nearby || []).length > 0 ? (
          <div className="grid">
            {nearby.nearby?.map((item) => (
              <div key={item.ride.id} style={{
                padding: 20,
                borderRadius: 18,
                background: "rgba(79,195,247,0.08)",
                border: "1px solid rgba(79,195,247,0.2)",
                transition: "all 0.3s ease"
              }}>
                <p className="small">ID: {item.ride.id.substring(0, 8)}...</p>
                <p style={{ fontSize: 14, margin: "8px 0", color: "rgba(255,255,255,0.7)" }}>
                  Distancia: <b style={{ color: "#4fc3f7" }}>{item.distanceKm.toFixed(2)} km</b>
                </p>
                <p style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#69f0ae" }}>
                  CLP ${item.ride.fareEstimate.toLocaleString()}
                </p>
                <button className="accent" style={{ marginTop: 12 }} onClick={() => acceptRide(item.ride.id)}>
                  Aceptar Viaje
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 30 }}>
            No hay viajes cercanos disponibles en este momento.
          </p>
        )}
      </section>

      {/* Active Ride Control */}
      <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.5s ease-out both" }}>
        <h2 className="title">Control de Viaje Activo</h2>
        <p className="small" style={{ marginBottom: 16 }}>
          ID: <span style={{ color: selectedRide ? "#4fc3f7" : "rgba(255,255,255,0.3)" }}>
            {selectedRide ? selectedRide.substring(0, 12) + "..." : "Ninguno seleccionado"}
          </span>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <button onClick={() => patchStatus("ARRIVED")}>Llegué</button>
          <button onClick={() => patchStatus("IN_PROGRESS")}>Iniciar</button>
          <button className="accent" onClick={() => patchStatus("COMPLETED")}>Completar</button>
          <button className="secondary" onClick={() => patchStatus("CANCELLED")}>Cancelar</button>
        </div>
      </section>

      {/* System Logs */}
      <section className="glass panel" style={{ marginTop: 24, animation: "fadeUp 0.7s 0.6s ease-out both" }}>
        <h2 className="title">Logs de Operación</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
