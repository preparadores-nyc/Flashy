"use client";

import { useState } from "react";

type NearbyResponse = {
  nearby?: Array<{ ride: { id: string; status: string; fareEstimate: number }; distanceKm: number }>;
};

export default function DriverPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [lat, setLat] = useState(-33.4489);
  const [lng, setLng] = useState(-70.6693);
  const [selectedRide, setSelectedRide] = useState("");
  const [nearby, setNearby] = useState<NearbyResponse>({});
  const [result, setResult] = useState("Sin acciones todavia.");

  async function auth(mode: "register" | "login") {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, role: "DRIVER" })
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
      <h1>Flashy Driver</h1>
      <p className="small">Operacion restringida a Santiago de Chile.</p>

      <section className="panel">
        <h2>1) Acceso conductor</h2>
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
      </section>

      <section className="panel">
        <h2>2) Disponibilidad</h2>
        <div className="row">
          <button onClick={() => setAvailability(true)}>Online</button>
          <button className="secondary" onClick={() => setAvailability(false)}>Offline</button>
        </div>
      </section>

      <section className="panel">
        <h2>3) Buscar viajes cercanos</h2>
        <div className="row">
          <input type="number" step="0.000001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
          <input type="number" step="0.000001" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
        </div>
        <button style={{ marginTop: 10 }} onClick={scanNearby}>Buscar</button>

        {(nearby.nearby || []).map((item) => (
          <div className="panel" key={item.ride.id} style={{ marginTop: 10 }}>
            <p>
              Ride: {item.ride.id} | {item.distanceKm.toFixed(2)} km | CLP {item.ride.fareEstimate}
            </p>
            <button onClick={() => acceptRide(item.ride.id)}>Aceptar viaje</button>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>4) Estado del viaje activo</h2>
        <p className="small">Ride seleccionado: {selectedRide || "ninguno"}</p>
        <div className="grid">
          <button onClick={() => patchStatus("ARRIVED")}>Llegue</button>
          <button onClick={() => patchStatus("IN_PROGRESS")}>Iniciar</button>
          <button onClick={() => patchStatus("COMPLETED")}>Completar</button>
          <button className="secondary" onClick={() => patchStatus("CANCELLED")}>Cancelar</button>
        </div>
      </section>

      <section className="panel">
        <h2>Resultado</h2>
        <pre>{result}</pre>
      </section>
    </main>
  );
}
