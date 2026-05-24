# Backup Manifest - Flashy

Este archivo documenta cada carpeta y archivo del proyecto Flashy con una breve descripción de su propósito.

## Raíz del proyecto

- `.devcontainer/`
  - `devcontainer.json` - Configuración del contenedor de desarrollo para GitHub Codespaces / Dev Containers.
  - `postCreate.sh` - Script que se ejecuta después de crear el contenedor para instalar dependencias y copiar `.env.example`.
- `.gitignore` - Lista de archivos y carpetas que Git debe ignorar.
- `.env.example` - Plantilla de variables de entorno para la aplicación.
- `docker-compose.yml` - Configuración de Docker Compose para levantar PostgreSQL localmente.
- `README.md` - Documentación principal del proyecto y guía de uso.
- `CLAUDE.md` - Archivo de notas o asistente, probablemente usado para documentación interna o AI.
- `design-notes.md` - Notas de diseño del proyecto.
- `next.config.ts` - Configuración de Next.js.
- `next-env.d.ts` - Declaraciones de tipo generadas automáticamente para Next.js.
- `package.json` - Dependencias, scripts y metadatos del proyecto.
- `package-lock.json` - Bloqueo de versiones de npm para dependencias reproducibles.
- `tsconfig.json` - Configuración del compilador TypeScript.
- `backup.sh` - Script de backup que copia el proyecto a una carpeta con fecha y hora.
- `backup-manifest.md` - Este archivo, que documenta la estructura del proyecto.

## Configuración de GitHub Actions

- `.github/workflows/backup.yml` - Workflow que crea una rama de backup automática en cada push a `main`.

## App Router y UI

- `app/`
  - `globals.css` - Estilos globales aplicados a toda la aplicación.
  - `layout.tsx` - Layout raíz de la aplicación Next.js.
  - `page.tsx` - Página de inicio principal.
  - `driver/page.tsx` - Página de conductor para el panel de conductor.
  - `rider/page.tsx` - Página de pasajero para la interfaz de rider.
  - `api/`
    - `auth/`
      - `login/route.ts` - Endpoint de API para autenticación de login.
      - `register/route.ts` - Endpoint de API para registro de usuarios.
    - `driver/`
      - `status/route.ts` - Endpoint de API para actualizar el estado del conductor.
    - `rides/`
      - `history/route.ts` - Endpoint de API para obtener historial de viajes.
      - `nearby/route.ts` - Endpoint de API para listar viajes cercanos.
      - `request/route.ts` - Endpoint de API para solicitar un nuevo viaje.
      - `[rideId]/accept/route.ts` - Endpoint de API para que un conductor acepte un viaje.
      - `[rideId]/status/route.ts` - Endpoint de API para actualizar el estado de un viaje.

## Código de soporte

- `lib/`
  - `auth.ts` - Funciones de autenticación y generación/verificación de JWT.
  - `geofence.ts` - Lógica para validar coordenadas dentro de la geocerca de Santiago.
  - `prisma.ts` - Cliente Prisma configurado para la base de datos.

## Prisma y datos

- `prisma/`
  - `schema.prisma` - Esquema de base de datos Prisma que define modelos y relaciones.
  - `seed.ts` - Script de seed para poblar datos iniciales en la base de datos.
  - `migrations/` - Carpeta que contiene migraciones de Prisma.
    - `002_user_onboarding_fields/migration.sql` - Migración que agrega campos de onboarding del usuario.

## Documentación

- `docs/`
  - `cloud-only-setup.md` - Guía para configurar y ejecutar el proyecto en la nube/GitHub Codespaces.

## Descripción general del backup

El backup se ejecuta con `backup.sh` y crea una carpeta `backups/backup-YYYY-MM-DD_HHMMSS/` con todos los archivos del proyecto, excluyendo:

- `node_modules/`
- `.next/`
- Cualquier archivo o carpeta listada en `.gitignore`
