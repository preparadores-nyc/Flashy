# Notas de Diseño — Flashy Mobility

## Visión general
Flashy es una landing page de movilidad premium para Santiago de Chile, inspirada en el estilo Frutiger Aero.
El objetivo es transmitir seguridad, tecnología y frescura con un diseño glassmorphism, profundidad 3D y una apariencia pulida.

## Objetivos del diseño
- Crear una primera impresión elegante, corporativa y futurista.
- Comunicar claramente los dos roles principales: pasajeros y conductores.
- Reflejar la operación local de Santiago con una identidad visual sofisticada.
- Mantener una experiencia ligera y moderna, con gestos de brillo y movimiento sutiles.

## Pilares visuales
1. Fondo profundo con gradientes oceánicos y halos de luz.
2. Glassmorphism realista: paneles translúcidos con blur, borde suave y brillo interno.
3. Elementos flotantes: orbes orgánicos que refuerzan sensación de atmósfera.
4. Tipografía clara y jerárquica con tonos blanco/azul y tratamiento brillante.
5. Botones y tarjetas con volumen 3D, sombras difusas y hover interactivo.
6. Detalles aireados y espaciales: reflejos, glass shine, y líneas suaves.

## Estado actual de la página
### Secciones implementadas
- Hero principal con badge, título y subtítulo.
- Portal cards para `Portal Pasajeros` y `Portal Conductores`.
- Tarjetas de métricas con iconografía simple y cristal.
- Panel inferior de soporte con copy de operación inteligente.
- Orbes flotantes de fondo y efectos de gradiente.

### Elementos clave ya presentes
- `glass` cards con blur y borde suave.
- Hover interactivo con elevación y brillo en `.card-link`.
- Texto principal con gradiente y drop-shadow.
- Píldora superior tipo badge con estilo pill brillante.
- Fondo con gradiente radial + capas de luz.

## Requisitos de diseño
### Colores
- Primario: azul frutiger / cyan (`#4fc3f7`, `#00e5ff`, `#0288d1`).
- Secundario: verde luminoso (`#69f0ae`, `#1e9e5a`).
- Neutro: blanco perlado y opacidades de blanco.
- Fondo: degradado profundo de azul oscuro a azul medio con halos de color.

### Tipografía
- Familias: `Outfit` para titulares, `Inter` para texto.
- Jerarquía clara: hero muy grande, cards grandes, subtítulos suaves.
- Texto de apoyo en `rgba(255,255,255,0.75)` o `0.65` para contraste.

### Componentes principales
- Hero con badge, headline y subtítulo.
- Portal cards con icono SVG, título, descripción y CTA.
- Metric cards en formato triple con pequeño copy secundario.
- Panel de base con mensaje de operación inteligente.
- Orbes de ambiente y animación flotante.

### Interacción y motion
- Animaciones de aparición: `fadeUp`, `heroReveal`.
- Hover cards: elevación, rotación leve y barra de brillo.
- Hover buttons: movimiento 3D suave y reflejo.
- Orbes con flotación lenta para sensación orgánica.

## Componentes técnicos
### Glassmorphism
- `backdrop-filter: blur(24px)` y `background: rgba(255,255,255,0.12)`.
- Bordes `1px solid rgba(255,255,255,0.18)`.
- Highlight superior con pseudo-elemento `::before`.

### Botones y inputs
- Botones con gradientes verticales y sombras internas.
- Inputs con fondo translúcido, borde suave y foco azul.
- Botones secundarios y accent para variaciones poli cromáticas.

## Próximos pasos
1. Completar documentación de componentes en `design-notes.md`.
2. Revisar `app/globals.css` para asegurar consistencia de tokens.
3. Añadir notas de responsive y accesibilidad.
4. Decidir si la landing necesita versión mobile separada.

## Notas de mejora futuras
- Extraer tokens de color a un sistema de diseño compartido.
- Añadir microinteracciones al scroll y al hover de botones.
- Implementar una sección de beneficios / estadísticas reales.
- Considerar un bloque de validación de confianza (seguridad, geocerca, verificación).
