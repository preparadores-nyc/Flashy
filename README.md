# Flashy

Flashy es una app tipo Uber enfocada en operar exclusivamente en Santiago de Chile.

## Stack

- Next.js 15 (App Router)
- Prisma + PostgreSQL
- JWT para autenticacion
- API Routes para el flujo rider/driver

## Funcionalidad implementada

- Registro/Login para pasajeros y conductores
- Solicitud de viaje con geocerca estricta de Santiago
- Estimacion de tarifa en CLP por distancia
- Conductores online/offline
- Listado de viajes cercanos para conductor
- Aceptacion de viaje
- Flujo de estados: REQUESTED -> ACCEPTED -> ARRIVED -> IN_PROGRESS -> COMPLETED/CANCELLED
- Historial de viajes por rol

## Restriccion de operacion

Todos los endpoints validan coordenadas dentro del bounding box de Santiago:

- Latitud: -33.75 a -33.2
- Longitud: -70.9 a -70.4

## Flujo recomendado: 100% nube en GitHub

- Desarrollo en GitHub Codespaces (sin instalar entorno local)
- Variables en GitHub Secrets (Codespaces y Actions)
- Base de datos Postgres administrada en la nube
- CI automatica en GitHub Actions

Guia detallada:
- docs/cloud-only-setup.md

## Levantar en Codespaces

1. Abrir el repo en GitHub
2. Code -> Codespaces -> Create codespace on main
3. En la terminal del Codespace ejecutar:

```bash
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Credenciales seed

- admin@flashy.cl / Flashy1234
- rider@flashy.cl / Flashy1234
- driver@flashy.cl / Flashy1234

## Rutas

- /rider
- /driver

## Endpoints principales

- POST /api/auth/register
- POST /api/auth/login
- POST /api/rides/request
- POST /api/rides/nearby
- POST /api/rides/[rideId]/accept
- PATCH /api/rides/[rideId]/status
- GET /api/rides/history
- PATCH /api/driver/status

## Notas para produccion

- Cambiar JWT_SECRET
- Agregar rate limit y auditoria
- Integrar pagos reales
- Integrar geocoding y mapas con Mapbox
- Agregar despacho en tiempo real por WebSockets
