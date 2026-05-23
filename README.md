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

## Levantar localmente

1. Instalar dependencias

```bash
npm install
```

2. Copiar variables

```bash
cp .env.example .env
```

3. Levantar PostgreSQL

```bash
docker compose up -d
```

4. Migrar base de datos

```bash
npx prisma migrate dev --name init
```

5. Cargar datos semilla

```bash
npm run prisma:seed
```

6. Ejecutar app

```bash
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
