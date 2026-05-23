# Flashy cloud-only workflow

Este proyecto puede operar sin entorno local, usando solo GitHub.

## 1. Desarrollo en la nube con Codespaces

1. Abrir el repositorio Flashy en GitHub.
2. Click en `Code` -> `Codespaces` -> `Create codespace on main`.
3. Esperar inicializacion.
4. Ejecutar en terminal de Codespaces:
   - `npx prisma migrate dev --name init`
   - `npm run prisma:seed`
   - `npm run dev`

## 2. Variables seguras en GitHub

Guardar secretos en:
- `Settings` -> `Secrets and variables` -> `Codespaces`
- `Settings` -> `Secrets and variables` -> `Actions`

Recomendadas:
- `DATABASE_URL`
- `JWT_SECRET`

## 3. Base de datos en la nube

Usar proveedor gestionado (Neon, Supabase, Railway, Aiven, etc.)
para que no exista dependencia de DB local.

`DATABASE_URL` debe apuntar a Postgres cloud.

## 4. Validacion continua en GitHub Actions

El workflow `Flashy CI` corre automaticamente en pushes y PRs:
- instalacion
- prisma generate
- type check
- build

## 5. Deploy cloud (opcional recomendado)

Desplegar en Vercel conectando el repo:
- importar repositorio Flashy
- configurar `DATABASE_URL` y `JWT_SECRET` en Vercel
- auto deploy por push a main
