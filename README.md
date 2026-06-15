# Pasos Seguros — Prototipo de diseño (PWA)

Prototipo **de solo front y diseño** de la plataforma **Pasos Seguros**: una _Progressive Web App_
(PWA) informativa, **anónima**, **multilingüe** y **disponible sin conexión** para personas
**migrantes en tránsito**, propuesta para **Profamilia** y el consorcio de organizaciones aliadas.

> ⚠️ **Es una demostración.** Todos los puntos de atención, teléfonos y contenidos son **datos de
> ejemplo (ficticios)**, no información oficial. No hay backend: la lógica es 100% del lado del
> cliente para mostrar la experiencia y el diseño final esperado de la Fase 1–2 de la propuesta.

---

## Qué demuestra

- **Onboarding anónimo en 3 toques** — idioma → país de tránsito → avatar. Sin nombre, sin correo,
  sin documentos, sin teclado. Todo se guarda **solo en el teléfono** (`localStorage`).
- **Directorio de puntos de atención** filtrable por país y ciudad (México, Honduras, Colombia,
  Venezuela, Ecuador, Perú, Chile), con ficha de sede: dirección, horarios, teléfono (enlace de
  llamada), servicios e idiomas. **Sin mapas ni GPS** (por privacidad).
- **Centro de Autocuidado** — guías de salud sexual y reproductiva en texto ligero, con **lectura
  por voz** (text-to-speech) y **control de tamaño de letra**.
- **Funciona sin conexión de verdad** — _service worker_ que precarga el shell y los contenidos
  (estrategia _stale-while-revalidate_). Incluye un botón para **simular el modo sin conexión**.
- **Guardar para usar sin conexión** — el usuario marca sedes y guías que quedan disponibles offline.
- **Multilingüe** — interfaz completa en **español, francés, inglés y kreyòl ayisyen**; 2 guías
  totalmente traducidas como muestra de contenido.
- **Emergencia a un toque** — pestaña dedicada con líneas de ayuda por país (magenta reservado solo
  para emergencia).
- **Modo ahorro / sol** — tema oscuro de un toque para legibilidad bajo sol directo y ahorro de batería.
- **Borrar y salir** — limpieza rápida de datos locales para contextos de riesgo.
- **Instalable como app** desde el navegador, sin tiendas (manifest + iconos + service worker).

En **escritorio**, la pantalla se presenta como un teléfono a la derecha con una **explicación a la
izquierda que cambia según la pantalla** que se esté viendo (recorrido autoexplicativo para mostrar
al cliente). En **móvil**, la app ocupa toda la pantalla como PWA real instalable.

## Sistema de diseño "Señal Cálida"

Construido sobre la identidad de marca de Profamilia:

| Rol | Color |
|---|---|
| Shell / cabeceras / hub | Verde bosque `#154734` / `#163827` |
| Superficie de lectura ("papel") | Crema `#fcffdd` (nunca blanco puro) |
| Acción (escasa) | Verde lima `#78be23` |
| Emergencia (monopolio) | Magenta `#aa2681` |
| Cuidado / calidez | Coral `#f8b199` (solo como tinte) |

Principios: **color + pictograma + texto** siempre juntos, objetivos táctiles ≥ 56 px, lenguaje
universal y navegación a prueba de estrés para personas con baja alfabetización digital.
Tipografías: **Figtree** (titulares) + **Inter** (texto).

## Cómo ejecutarlo

Es un sitio estático. Cualquier servidor sirve; por ejemplo:

```bash
# Python
python -m http.server 8099
# luego abrir http://localhost:8099
```

Ábrelo en un **celular** (o en modo dispositivo del navegador) para instalarlo en la pantalla de
inicio y probar el modo sin conexión real.

## Navegación directa (enlaces profundos)

Útil para compartir o mostrar pantallas concretas. Parámetros en la URL:

- `?screen=home|directory|venue|selfcare|articles|article|emergency|settings|saved`
- `&lang=es|fr|en|ht` · `&country=mx|hn|co|ve|ec|pe|cl` · `&mode=dark`
- `&art=<id>` (artículo), `&cat=<id>` (categoría), `&idx=<n>` (sede)

Ejemplo: `/?screen=directory&country=pe&lang=fr`

## Estructura

```
index.html               · escenario (escritorio) + teléfono + app
manifest.webmanifest     · PWA instalable
service-worker.js        · caché offline (stale-while-revalidate)
assets/css/styles.css    · sistema de diseño "Señal Cálida"
assets/js/data.js        · datos de ejemplo (sedes, países, guías)
assets/js/i18n.js        · textos en es / fr / en / ht
assets/js/app.js         · router, pantallas, offline, TTS, backoffice
assets/img/              · marca (SVG)
icons/                   · iconos PWA / favicon
docs/capturas/           · capturas de referencia
```

## Relación con la propuesta

Este prototipo cubre **solo el frontend y el diseño de la app del usuario** (la persona migrante):
anonimato, offline, multilingüe, directorio y autocuidado, tal como se verían en la experiencia
final. La solución completa cotizada añade, en desarrollo: backend en **Python/FastAPI**, base de
datos, infraestructura **AWS** y el **backoffice** de gestión (Módulo 4) — que aquí no se incluye
por ser una demo de la cara visible al usuario.
