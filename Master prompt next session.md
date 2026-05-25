# 🧠 PLAN MAESTRO — Portfolio Web de Juan Camilo
### Full Stack Developer · UX Designer · Creative Coder
**Versión 1.0 — Investigado, arquitectado y diseñado para competir a nivel mundial**

---

## 📌 ÍNDICE

1. [Visión del Proyecto](#vision)
2. [Investigación: Qué marca la diferencia](#investigacion)
3. [Stack Tecnológico](#stack)
4. [Arquitectura de Archivos](#arquitectura)
5. [Secciones del Portafolio](#secciones)
6. [Sistema de Animación (GSAP + Three.js + ASCII)](#animacion)
7. [Perception-First Design — Aplicación a las 5 capas](#pfd)
8. [El Super Prompt (listo para usar en Claude/Cursor/Windsurf)](#prompt)
9. [Setup Local Paso a Paso](#setup)
10. [Checklist Final de Calidad](#checklist)

---

## 1. 🎯 Visión del Proyecto {#vision}

El portafolio de Juan Camilo no es un CV online. Es **una experiencia de percepción**.

**Referentes fusionados:**
- **juanmora.co** → solidez editorial, tipografía de impacto, narrativa de caso de estudio, ritmo de scroll limpio.
- **Aino Agency** → 3D fluido, estética Escandinava-brutal, mezcla ASCII/digital, peso visual brutal.
- **Perception-First Design (PFD)** → cada decisión de layout nace de psicología cognitiva, no de opinión.

**El resultado:** Un sitio donde el visitante *siente* el nivel antes de leer una sola palabra. Pre-verbal. Visceral. Imparable.

---

## 2. 🔬 Investigación: Qué Marca la Diferencia {#investigacion}

### Lo que separa top 1% del resto (sintetizado de Codrops, Awwwards, Webflow Showcase):

| Factor | Promedio | Top 1% (Juan Camilo) |
|---|---|---|
| Primer impacto (50ms) | Foto + nombre | ASCII 3D morph que revela el nombre |
| Scroll | CSS transition básico | GSAP ScrollTrigger scrubbed + Three.js camera |
| Case studies | Capturas de pantalla | Proceso documentado + métricas reales |
| Personalidad | Bio genérica | Micro-interacciones que revelan carácter |
| Tech demo | Lista de skills | Stack demostrado *dentro* del sitio mismo |
| Carga cognitiva (L0) | Todo visible a la vez | Revelación progresiva controlada |
| Confianza (L2) | Espaciado inconsistente | Design tokens sistemáticos |

### Hallazgos críticos por investigación:

1. **Los reclutadores deciden en 50ms** (Kovalik, PFD v3.6). Si L1 falla, todo lo demás multiplica por cero.
2. **Las animaciones de alta calidad son filtros activos**: atraen al cliente ideal y repelen a quien no puede pagar el nivel.
3. **Case studies > Galerías**: Los mejores portafolios de 2025-2026 muestran proceso, iteraciones, y resultados medibles, no solo pantallas finales.
4. **El sitio ES el portafolio**: La forma en que está construido *demuestra* las habilidades de full stack + UX mejor que cualquier descripción.
5. **ASCII + 3D**: La mezcla de lo retro-digital (ASCII art) con WebGL moderno crea una firma visual única, reconocible, no imitada por templates.
6. **GSAP + Three.js + Lenis**: El stack de animación estándar de los portafolios ganadores de Awwwards 2024-2025.

---

## 3. ⚙️ Stack Tecnológico {#stack}

```
FRAMEWORK        → Next.js 15 (App Router) + TypeScript
STYLING          → Tailwind CSS v4 + CSS Custom Properties (design tokens)
ANIMACIÓN CORE   → GSAP 3.x (Club: ScrollTrigger, ScrollSmoother, SplitText, Flip)
3D/WebGL         → Three.js r168+ (geometrías, shaders GLSL custom)
SMOOTH SCROLL    → Lenis (sincronizado con gsap.ticker)
ASCII ART        → Canvas API custom renderer (sin librerías, más control)
FUENTES          → Syne (display) + DM Mono (código/ASCII) + Editorial New (cuerpo)
ICONOS           → Phosphor Icons (consistentes, limpios)
FORMAS           → React Hook Form + Resend (contacto)
DEPLOY LOCAL     → npm run dev (Next.js) → luego Vercel en producción
VERSIONAMIENTO   → Git + GitHub (mostrado en el sitio mismo)
```

**¿Por qué Next.js y no Astro?**
Next.js 15 con App Router permite RSC (React Server Components) para SEO perfecto y carga ultra-rápida, mientras los componentes client-side manejan toda la magia de GSAP/Three.js. Además demuestra full stack real (API routes para el formulario de contacto).

**¿Por qué GSAP Club (de pago)?**
ScrollSmoother y SplitText son esenciales para el nivel Aino/juanmora. GSAP tiene licencia gratuita para portafolios personales. Verificar en gsap.com/licensing.

---

## 4. 🗂️ Arquitectura de Archivos {#arquitectura}

```
juancamilo-portfolio/
├── public/
│   ├── fonts/                    # Syne, DM Mono, Editorial New (woff2)
│   ├── models/                   # Modelos .glb para Three.js (si aplica)
│   ├── images/
│   │   ├── projects/             # Screenshots y mockups de proyectos
│   │   └── about/                # Fotos personales
│   └── og-image.png              # Open Graph para redes sociales
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + fuentes + metadata SEO
│   │   ├── page.tsx              # Home (single page)
│   │   ├── work/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Case study individual
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts      # API route para formulario (Resend)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Navegación flotante con estado de scroll
│   │   │   └── Footer.tsx        # Footer con ASCII art animado
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx          # ASCII 3D morph + nombre + tagline
│   │   │   ├── About.tsx         # Historia + foto interactiva
│   │   │   ├── Skills.tsx        # Habilidades con visualización de barras GSAP
│   │   │   ├── Work.tsx          # Grid de proyectos con hover 3D
│   │   │   ├── Process.tsx       # Proceso de trabajo en pasos animados
│   │   │   ├── Testimonials.tsx  # Marquee de testimonios
│   │   │   └── Contact.tsx       # Formulario + info de contacto
│   │   │
│   │   ├── canvas/
│   │   │   ├── AsciiRenderer.tsx # Render ASCII sobre canvas (Three.js post-process)
│   │   │   ├── WebGLBackground.tsx # Fondo de partículas/geometría
│   │   │   └── ProjectCard3D.tsx # Cards con efecto tilt 3D en hover
│   │   │
│   │   ├── ui/
│   │   │   ├── SplitText.tsx     # Wrapper GSAP SplitText para animaciones de chars
│   │   │   ├── MagneticButton.tsx # Botones con efecto magnético en cursor
│   │   │   ├── CustomCursor.tsx  # Cursor personalizado
│   │   │   ├── Marquee.tsx       # Texto en loop horizontal
│   │   │   └── RevealImage.tsx   # Imágenes con clip-path reveal
│   │   │
│   │   └── work/
│   │       ├── CaseStudyHero.tsx
│   │       ├── ProcessStep.tsx
│   │       └── ProjectMeta.tsx
│   │
│   ├── hooks/
│   │   ├── useGSAP.ts            # Hook para GSAP con cleanup automático
│   │   ├── useLenis.ts           # Inicialización de Lenis + ticker
│   │   └── useMediaQuery.ts      # Responsive hooks
│   │
│   ├── lib/
│   │   ├── gsap.ts               # Registro de plugins GSAP (una vez)
│   │   ├── three-utils.ts        # Helpers Three.js reusables
│   │   └── ascii.ts              # Lógica del renderer ASCII
│   │
│   ├── data/
│   │   ├── projects.ts           # Array tipado de proyectos
│   │   └── skills.ts             # Stack de habilidades con metadata
│   │
│   └── styles/
│       ├── globals.css           # Reset + CSS custom properties (design tokens)
│       └── animations.css        # Keyframes globales
│
├── .env.local                    # RESEND_API_KEY
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. 📐 Secciones del Portafolio {#secciones}

### 0. Loader (Pre-entry)
- Contador ASCII de 000 → 100 que "carga" el sitio
- El texto del nombre aparece carácter por carácter (efecto typewriter con GSAP)
- Desaparece con un clip-path reveal vertical que desvela el hero
- Duración: máx. 2.5s para no perder al visitante (L0: carga cognitiva mínima)

---

### 1. HERO — "El anzuelo de 50ms"
**Objetivo PFD:** Pasar el filtro L1 (veredicto visual en 50ms). Despertar arousal pre-verbal.

**Elementos:**
```
┌─────────────────────────────────────────────────┐
│  [NAV]  JC  ●  Work  Process  About  Contact    │
│                                                  │
│   ░░░░░░░░░░░░░░░░░  ← ASCII esfera 3D          │
│   ░░▓▓▓▓▓▓▓▓▓▓▓░░░  (Three.js → post-process   │
│   ░░▓▓  JUAN  ▓▓░░░   ASCII shader)             │
│   ░░▓▓ CAMILO ▓▓░░░                             │
│   ░░░░░░░░░░░░░░░░░                              │
│                                                  │
│   Full Stack Developer & UX Designer             │
│   Crafting digital experiences that feel         │
│   inevitable.                                    │
│                                                  │
│   [Ver mi trabajo ↓]    [Hablemos →]             │
└─────────────────────────────────────────────────┘
```

**Animaciones:**
- La esfera ASCII rota lentamente, reacciona al movimiento del mouse (parallax 3D)
- El nombre aparece con SplitText char-by-char desde ruido ASCII → texto legible
- El tagline hace fade-in escalonado con GSAP stagger
- Scroll indicator pulsa suavemente

**Técnica ASCII + Three.js:**
```javascript
// Post-process pass que convierte el render WebGL a ASCII en tiempo real
// usando un fragment shader que mapea luminancia → caracteres
const ASCII_CHARS = ' .:-=+*#%@█▓▒░';
// El shader samplea el framebuffer y asigna caracteres según brillo
// Resultado: objeto 3D que parece ASCII art pero es WebGL real
```

---

### 2. WORK — "La prueba"
**Objetivo PFD:** L4 (arquitectura de decisión) — el visitante debe poder encontrar el proyecto relevante para él en segundos.

**Grid:** 2 proyectos grandes (full-width alterno) + grid 3 columnas para el resto.

**Cada project card tiene:**
- Video/GIF autoplay en hover
- Overlay con: nombre, rol, año, tags de tecnología
- Efecto tilt 3D con Three.js en hover (rotación sutil de la card en el eje Z)
- Cursor custom que cambia a "→ VER" al hacer hover

**Case studies individuales (páginas internas):**
Inspirados en juanmora.co, cada proyecto tiene:
1. Hero con mockup animado
2. Contexto + problema (el "por qué")
3. Proceso: Discovery → Wireframes → Diseño → Desarrollo → Testing
4. Soluciones clave (screenshots anotados)
5. Resultados con métricas reales (si disponibles)
6. Reflexión personal (qué aprendiste)
7. "Siguiente proyecto →" (sin dead ends)

**Proyectos recomendados para incluir (mínimo 4, ideal 6):**
- Un proyecto de producto SaaS (full stack)
- Un redesign con métricas de conversión
- Un design system documentado
- Un proyecto personal experimental (donde muestres tu voz)
- Un proyecto open source (si existe)

---

### 3. ABOUT — "La persona detrás del código"
**Objetivo PFD:** L3 (perception bias) — conectar emocionalmente antes de que el visitante racionalice si te contrata.

**Estructura:**
```
┌────────────────────────────────────────┐
│  [Foto Juan Camilo]                    │
│  → Con efecto hover: foto en B&W       │
│    se vuelve color, o al revés         │
│                                        │
│  "Soy Juan Camilo."                    │
│  [Texto personal en 2-3 párrafos]      │
│  → No una bio corporativa.             │
│  → Habla de qué te obsesiona,          │
│    por qué combinas código y diseño,   │
│    qué problemas quieres resolver.     │
│                                        │
│  ACTUALMENTE                           │
│  ● Disponible para proyectos freelance │
│  ● Colombia / Remoto mundial           │
│                                        │
│  [Descargar CV →]                      │
└────────────────────────────────────────┘
```

**Detalle:** Una línea de texto pequeña que diga algo inesperado/personal (Aino lo hace con "GBG/OSL" — su ubicación como firma). Para Juan Camilo podría ser: "Nació en Colombia. Piensa en sistemas. Diseña para personas."

---

### 4. SKILLS — "El arsenal"
**Objetivo PFD:** L2 (processing fluency) — fácil de procesar, fácil de creer.

**NO hacer:** Lista de logos de herramientas con barras de porcentaje genéricas.

**SÍ hacer — dos zonas:**

**Zona A — Stack técnico** (visualización tipo constellation/network):
```
Nodes conectados: Frontend ─ React/Next.js ─ TypeScript
                  Backend ─ Node.js ─ PostgreSQL ─ Prisma
                  Design ─ Figma ─ Prototyping ─ Systems
                  DevOps ─ Vercel ─ Docker ─ CI/CD
```
Los nodes aparecen con GSAP desde el centro, con física suave (spring easing).

**Zona B — Skills de proceso** (texto editorial):
No "Figma: 90%". En cambio:
- "Convierto research en wireframes en una tarde."
- "Escribo el backend y diseño la UI del mismo feature."
- "Leo Figma mejor que algunos lo escriben."

---

### 5. PROCESS — "Cómo pienso"
**Objetivo PFD:** Construir confianza (L2) mostrando metodología antes de que te la pidan.

**4 fases en scroll horizontal pinned (GSAP horizontal scroll):**

```
DISCOVER → DEFINE → BUILD → SHIP

Cada fase tiene:
- Número grande ASCII (01, 02, 03, 04)
- Título de la fase
- Descripción de qué haces en esa etapa
- Herramientas que usas
- Output tangible
```

Animación: El número de la fase pasa de ASCII noise → número legible conforme
el usuario hace scroll (efecto char scramble con GSAP SplitText).

---

### 6. TESTIMONIALS (marquee)
**Horizontal auto-scroll infinito** (como Aino con sus clientes).
Testimonios reales de clientes/colaboradores en formato quote card.
Si no tienes todavía, incluye sección "Let's build something together" como placeholder elegante.

---

### 7. CONTACT — "La puerta de entrada"
**Objetivo PFD:** L4 (decision architecture) — el path hacia contactarte debe ser de CERO fricción.

**Elementos:**
- Headline de impacto: "¿Tienes un problema que resolver?" o "Next project?"
- Email visible y copiable con un click
- Formulario simple: Nombre, Email, Mensaje (React Hook Form)
- LinkedIn / GitHub / cualquier red relevante
- Indicador de disponibilidad: "● Disponible para proyectos" (verde) o "● Actualmente no disponible" (amber)

---

### 8. FOOTER (ASCII firma)
Un bloque de ASCII art pequeño que es la "firma" de Juan Camilo.
```
 ██╗ ██████╗
 ██║██╔════╝
 ██║██║
 ██║██║
 ╚██╗╚██████╗
  ╚═╝ ╚═════╝  juancamilo.dev © 2026
```

---

## 6. 🎬 Sistema de Animación (GSAP + Three.js + ASCII) {#animacion}

### Reglas de Oro
1. **Nunca animar lo que no tiene propósito.** Cada animación debe reducir carga cognitiva o aumentar confianza.
2. **GPU-accelerated siempre.** Usar `transform` y `opacity`, nunca `left/top/width` para animar.
3. **Lenis + GSAP ticker sincronizados.** El smooth scroll debe ser nativo-looking.
4. **Fallback para `prefers-reduced-motion`.** Accesibilidad no es opcional.

### Stack de Inicialización Global
```typescript
// src/lib/gsap.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase)

// Easings personalizados — la firma de movimiento de Juan Camilo
CustomEase.create('jc.smooth', '0.45, 0.05, 0.55, 0.95')
CustomEase.create('jc.snappy', '0.25, 0.46, 0.45, 0.94')
CustomEase.create('jc.dramatic', '0.76, 0, 0.24, 1')

export { gsap }
```

### Lenis Setup
```typescript
// src/hooks/useLenis.ts
import Lenis from 'lenis'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])
}
```

### ASCII Shader (Three.js → ASCII en tiempo real)
```glsl
// Fragment shader que convierte luminancia → índice de carácter
// Se aplica como post-process pass sobre el render principal

uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float characterCount; // 16 chars en la paleta

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  // Cada "celda" ASCII es 8x16 px
  vec2 cellUV = floor(uv * resolution / vec2(8.0, 16.0)) * vec2(8.0, 16.0) / resolution;
  vec4 color = texture2D(tDiffuse, cellUV);
  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  float charIndex = floor(luma * characterCount);
  // Usar charIndex para samplear texture atlas de caracteres ASCII
  gl_FragColor = vec4(vec3(charIndex / characterCount), 1.0);
}
```

### Efecto Char Scramble (Título)
```typescript
// Para el hero: el nombre pasa de ruido a texto
const ASCII_NOISE = '!@#$%^&*()░▒▓█▄▀■□▪▫';

export function scrambleText(element: HTMLElement, finalText: string) {
  const tl = gsap.timeline()
  let iterations = 0
  const totalIterations = 20

  tl.to({}, {
    duration: 1.2,
    ease: 'jc.dramatic',
    onUpdate: function() {
      iterations++
      element.textContent = finalText
        .split('')
        .map((char, i) => {
          if (i < Math.floor((iterations / totalIterations) * finalText.length)) {
            return char
          }
          return ASCII_NOISE[Math.floor(Math.random() * ASCII_NOISE.length)]
        })
        .join('')
    }
  })
  return tl
}
```

### Animaciones por Sección

| Sección | Técnica GSAP | Detalle |
|---|---|---|
| Loader | Timeline + SplitText | Contador ASCII + nombre char-by-char |
| Hero | ScrollTrigger scrub + parallax | ASCII esfera reacciona a scroll y mouse |
| Work grid | Flip + ScrollTrigger batch | Cards entran escalonadas con spring |
| About | SplitText chars reveal | Texto entra palabra por palabra |
| Skills | fromTo stagger + CustomEase | Nodes aparecen desde el centro |
| Process | Horizontal scroll pinned | ScrollTrigger horizontal con scrub |
| Contact | Simple fade + MagneticButton | Minimal, sin distracciones |

---

## 7. 🧠 Perception-First Design — Las 5 Capas {#pfd}

Basado en **Perception-First Design v3.6** de Stefan Kovalik. Cada decisión de diseño se audita contra las 5 capas, bottom-up.

### L0 — Cognitive Load (Memoria de trabajo: máx. 3-5 chunks)
**Problema:** Un portafolio que muestra todo a la vez quema la memoria de trabajo antes de que el visitante procese el valor.

**Soluciones aplicadas:**
- Loader separa el "coste de carga" del contenido real. El cerebro llega fresco al hero.
- El hero tiene UN solo mensaje primario: quién es Juan Camilo + qué hace. Nada más.
- Navegación mínima: 4 items (Work, Process, About, Contact).
- Los proyectos en el grid muestran solo lo esencial: thumbnail + título + año.
- Case studies tienen navegación lateral para no perder el contexto.

### L1 — First Impression (Veredicto en 50ms)
**Problema:** La mayoría de portafolios de developer/designer fallan en 50ms porque parecen un template.

**Soluciones aplicadas:**
- La esfera ASCII 3D girando es visualmente única en los primeros milisegundos.
- El contraste tipográfico (display serif grande + mono pequeño) activa procesamiento visual diferenciado.
- El fondo oscuro (dark mode por defecto) con elementos ASCII en gris claro crea una jerarquía de alto contraste que el sistema visual procesa instantáneamente.
- La paleta de 2-3 colores máximo con 1 acento (recomendado: un verde ácido o un naranja quemado) evita la fatiga cromática.

**Decisión de color sugerida:**
```css
:root {
  --bg:        #0a0a0a;   /* Negro profundo, no puro para reducir halos */
  --fg:        #e8e4dc;   /* Off-white cálido, más humano que #ffffff */
  --accent:    #c8f542;   /* Verde ácido — disruptivo, memorable */
  --ascii:     #2a2a2a;   /* ASCII de fondo, casi invisible */
  --muted:     #555555;   /* Texto secundario */
}
```

### L2 — Processing Fluency (Fácil de procesar = parece verdadero)
**Problema:** El sistema nervioso del visitante detecta inconsistencias de espaciado antes que el cerebro consciente, erosionando confianza sin que sepan por qué.

**Soluciones aplicadas:**
- Design tokens matemáticos en base 8: `--space-1: 8px`, `--space-2: 16px`, `--space-3: 24px`, etc.
- Una sola escala tipográfica (Major Third: 1.25):
  - `--text-xs: 0.64rem` | `--text-sm: 0.8rem` | `--text-base: 1rem` | `--text-lg: 1.25rem` | `--text-xl: 1.563rem` | `--text-2xl: 1.953rem` | `--text-3xl: 2.441rem` | `--text-hero: 6rem+`
- Alineaciones consistentes: solo left-align en texto running, centrado para elementos de impacto.
- Fuentes: máx. 2 familias (Syne para display + DM Mono para código/ASCII).

### L3 — Perception Bias (Los usuarios autopilotean, racionalizan después)
**Problema:** Un visitante decide si quiere trabajar contigo *antes* de leer un solo proyecto. El bias visual ocurre antes de la evaluación consciente.

**Soluciones aplicadas:**
- El ASCII 3D activa el heurístico "este developer/designer sabe lo que hace" de forma pre-verbal.
- El hover efecto en las project cards (tilt 3D, video preview) activa el efecto de "este sitio respira calidad", que se transfiere al trabajo mostrado.
- La foto de About con efecto hover inesperado humaniza sin esfuerzo cognitivo.
- El cursor custom activa el bias de "atención al detalle".
- Testimonios en marquee crean prueba social pasiva (se ven sin que el usuario "decida" leerlos).

### L4 — Decision Architecture (El trail hacia la acción)
**Problema:** Un visitante interesado que no encuentra el camino hacia contratar al diseñador, simplemente cierra.

**Soluciones aplicadas:**
- Cada sección tiene un CTA claro que lleva a la siguiente o a contacto.
- Los case studies terminan con: "¿Necesitas algo similar? → Hablemos"
- El email de contacto está siempre accesible en el footer (sin tener que ir a la sección).
- La disponibilidad se muestra con un indicador de color (verde = disponible) en navbar y contacto.
- El formulario de contacto tiene 3 campos máximo. La fricción mata las conversiones.

---

## 8. 🚀 El Super Prompt (Listo para usar) {#prompt}

> Copia y pega este prompt completo en Claude, Cursor, Windsurf o cualquier AI coding assistant. Está diseñado para generar el código de producción directamente.

---

```
Eres un senior creative developer especializado en portafolios web de alto impacto.
Vas a construir el portafolio web completo de Juan Camilo, un Full Stack Developer
y UX Designer colombiano.

## REFERENCIAS VISUALES Y DE NIVEL
- Sólido como juanmora.co: narrativa editorial, case studies profundos, tipografía de impacto
- Experimental como Aino Agency (aino.agency): mezcla 3D/ASCII, peso visual brutal, Escandinavo-digital
- Fundamentado en Perception-First Design (github.com/skovalik/perception-first-design):
  toda decisión de layout nace de las 5 capas de PFD (L0-L4), no de opinión

## STACK TÉCNICO OBLIGATORIO
- Framework: Next.js 15 (App Router) + TypeScript strict
- Styling: Tailwind CSS v4 + CSS Custom Properties
- Animaciones: GSAP 3.x con plugins: ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase
- 3D/WebGL: Three.js r168+ (incluir ASCII post-process shader sobre geometría 3D)
- Smooth scroll: Lenis sincronizado con gsap.ticker
- ASCII: Canvas renderer custom + GLSL fragment shader para ASCII 3D en tiempo real
- Fuentes: Syne (display) + DM Mono (mono/ASCII) + editorial para cuerpo
- Contacto: React Hook Form + Resend API (API route Next.js)
- Sin librerías de animación adicionales. GSAP es la única fuente de verdad de movimiento.

## PALETA DE COLORES (tokens CSS, dark mode primario)
:root {
  --bg: #0a0a0a;
  --fg: #e8e4dc;
  --accent: #c8f542;      /* verde ácido — firma visual de Juan Camilo */
  --ascii-dim: #2a2a2a;
  --muted: #555555;
  --border: #1a1a1a;
}

## TIPOGRAFÍA
- Hero: Syne ExtraBold, ~6-8rem, letter-spacing tight
- Subtítulos: Syne SemiBold, 1.5-2rem
- Cuerpo: variable editorial, 1rem, line-height 1.7
- Código/ASCII: DM Mono, 0.85rem

## SISTEMA DE ANIMACIÓN (GSAP)
// Registrar todos los plugins al iniciar la app (una sola vez en lib/gsap.ts):
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase)

// Easings personalizados — identidad de movimiento:
CustomEase.create('jc.smooth', '0.45, 0.05, 0.55, 0.95')
CustomEase.create('jc.snappy', '0.25, 0.46, 0.45, 0.94')
CustomEase.create('jc.dramatic', '0.76, 0, 0.24, 1')

// Lenis + GSAP ticker sincronizados en _app o layout root:
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Siempre GPU-accelerated: usar transform + opacity. NUNCA left/top/width para animar.

## SECCIONES (en orden, single page + rutas de case study)

### [0] LOADER
- Contador ASCII de 000 a 100 (DM Mono, grande, centrado)
- Mientras carga, el nombre "JUAN CAMILO" aparece carácter a carácter desde ruido ASCII
  Usar la función scrambleText con GSAP timeline
- Al llegar a 100: clip-path reveal vertical (inset top→bottom) que desvela el hero
- Duración total: máx 2.5s. Respetar prefers-reduced-motion.

### [1] HERO
- Fondo: esfera ASCII 3D (Three.js geometría esférica + post-process ASCII fragment shader)
  La esfera rota lentamente y reacciona al movimiento del mouse (mouse parallax 3D)
  El shader convierte luminancia del render WebGL → caracteres ASCII en tiempo real
  Paleta ASCII: ' .:-=+*#%@█▓▒░'
- Sobre la esfera (en HTML, z-index superior al canvas):
  * Nombre: "JUAN CAMILO" en Syne ExtraBold, color --fg, tamaño hero
  * Subtítulo: "Full Stack Developer & UX Designer" en DM Mono, --muted
  * Tagline: "Crafting digital experiences that feel inevitable." en texto editorial
  * Dos botones: [Ver mi trabajo] con MagneticButton + [Hablemos] como link
- Scroll indicator: flecha pulsante en --accent
- GSAP: el nombre aparece con SplitText chars, stagger 0.05s, desde y:40 + opacity:0
- ScrollTrigger: en scroll, el hero hace parallax (canvas baja más lento que el texto)

### [2] WORK
- Título de sección: "Trabajo" en Syne, con SplitText char reveal on scroll
- Estructura del grid:
  * Proyecto 1 y 2: full-width alternados (imagen izquierda/texto derecha, luego al revés)
  * Proyectos 3-6: grid 3 columnas responsive
- Cada ProjectCard:
  * Video/GIF autoplay muted en hover (imagen estática en mobile)
  * Overlay de información: título, año, tags tecnológicos, rol de Juan Camilo
  * Efecto tilt 3D (Three.js o CSS perspective) en hover en desktop
  * GSAP: entran con ScrollTrigger batch, stagger 0.1s, desde y:60 opacity:0
  * Link a la página de case study individual (/work/[slug])
- Cursor custom al hacer hover sobre una card: cambia a "→ VER" en --accent

### [3] ABOUT
- Dos columnas: foto (izquierda, 40%) + texto (derecha, 60%)
- Foto: en blanco y negro por defecto, color al hover. Clip-path reveal al entrar en viewport.
- Texto:
  * Headline personal: "Soy Juan Camilo." (gran, Syne)
  * 2-3 párrafos: qué te obsesiona, por qué combinas código y diseño, cómo piensas
  * Estado actual: "● Disponible para proyectos" (punto en --accent animado con pulse)
  * Ubicación: "Colombia / Remoto" en DM Mono pequeño
  * Botón: [Descargar CV] que abre PDF en nueva pestaña
- GSAP: texto entra con SplitText lines, stagger por línea, desde x:-30 opacity:0

### [4] SKILLS
- Título: "Arsenal"
- ZONA A — Stack Técnico (visualización constellation):
  * SVG canvas con nodos conectados por líneas finas (--border color)
  * Categorías: Frontend / Backend / Design / DevOps
  * Nodos aparecen desde el centro con GSAP fromTo stagger, spring easing
  * En hover sobre un nodo: tooltip con nombre de tecnología + nivel de expertise
- ZONA B — Skills de proceso (texto editorial):
  * 4-5 afirmaciones breves sin barras de porcentaje
  * Ejemplos: "Convierto un brief en un prototipo navegable en 48h."
  * Entran con SplitText reveal on scroll

### [5] PROCESS
- Título: "Cómo pienso"
- Horizontal scroll pinned con GSAP ScrollTrigger (scrub: true)
- 4 fases: DISCOVER → DEFINE → BUILD → SHIP
- Cada fase tiene:
  * Número grande en DM Mono (01, 02, 03, 04) que hace char scramble de ASCII → número
  * Título de fase en Syne
  * Descripción de qué hace Juan Camilo en esa etapa
  * Herramientas usadas (iconos Phosphor)
  * Output tangible (en cursiva, --muted)
- El scroll horizontal va de 0 a 100% del ancho de las 4 secciones

### [6] TESTIMONIALS
- Marquee horizontal infinito (velocidad lenta, pausa en hover)
- Cards de testimonios: quote + nombre + cargo/empresa
- Dos filas, segunda en dirección opuesta (efecto espejo)
- Fondo: --bg con border --border sutil

### [7] CONTACT
- Headline: "¿Próximo proyecto?" en Syne ExtraBold
- Email: juan@juancamilo.dev — copiable al hacer click (toast de confirmación)
- Formulario: Nombre, Email, Mensaje (React Hook Form, validación inline)
  * Al hacer submit: animación de "enviando..." → "¡Listo! Te contactaré pronto"
  * API route /api/contact → Resend para enviar el email
- Social links: LinkedIn, GitHub (iconos Phosphor)
- Indicador de disponibilidad con punto pulsante

### [8] FOOTER
- ASCII art del nombre/logo de Juan Camilo (generado con figlet o manual)
- Copyright + año actual (dinámico)
- Email y social links repetidos (sin tener que hacer scroll)
- "Hecho con Next.js, GSAP y demasiado café." (en DM Mono, --muted)

## CURSOR CUSTOM
- Cursor circular pequeño (8px) en --accent que sigue al mouse con lag suave (GSAP)
- Al hacer hover sobre links/botones: se expande a 40px con mix-blend-mode: difference
- Al hacer hover sobre project cards: muestra el texto "→ VER"
- Al hacer hover sobre texto: se aplana como un guión

## CASO DE ESTUDIO INDIVIDUAL (/work/[slug])
Cada página tiene:
1. Hero: título del proyecto + tagline + mockup hero animado
2. Meta: Año | Rol | Tecnologías | Link al sitio
3. Contexto: El problema. Por qué existía, qué fallaba.
4. Proceso en pasos numerados con imágenes/capturas anotadas
5. Solución: Screenshots, videos, interacciones clave
6. Resultados: métricas, feedback, impacto (si existen)
7. Reflexión: qué aprendiste
8. "Siguiente proyecto →" y "← Anterior"
9. CTA al final: "¿Necesitas algo similar? Hablemos."

## DATOS (src/data/projects.ts)
Crear un array tipado de proyectos con estos campos:
- slug: string
- title: string
- subtitle: string
- year: number
- role: string[]
- tags: string[]
- thumbnail: string (ruta a /public/images/projects/)
- video?: string
- link?: string
- description: string (intro del case study)
- color: string (color acento del proyecto)

Incluir 4 proyectos placeholder con datos reales de muestra.

## SEO Y RENDIMIENTO
- Metadata dinámica por ruta (Next.js generateMetadata)
- Open Graph con og:image personalizado para el home y cada case study
- Fuentes con next/font para preload óptimo y font-display: swap
- Imágenes con next/image para lazy loading y formatos modernos (WebP/AVIF)
- Three.js canvas con fallback estático para dispositivos sin WebGL
- Respeta prefers-reduced-motion: desactiva GSAP animations y Three.js en ese caso
- Lighthouse target: Performance >90, Accessibility >95, SEO >95

## ESTRUCTURA DE ARCHIVOS
[Usar exactamente la estructura definida en el plan maestro]

## INSTRUCCIONES ADICIONALES CRÍTICAS
1. Registrar plugins GSAP una sola vez en src/lib/gsap.ts, nunca en componentes
2. Todos los useGSAP hooks deben retornar cleanup (gsap.context o tl.kill())
3. Three.js: dispose() de geometrías y materiales al desmontar componentes
4. El AsciiRenderer.tsx debe ser un componente Client ('use client') con canvas ref
5. Usar Intersection Observer + ScrollTrigger.batch() para animaciones de listas
6. El formulario de contacto debe funcionar con JS deshabilitado (progressive enhancement)
7. CSS: nunca animar left/top/width/height. Solo transform + opacity + filter
8. Commits claros: feat/hero-ascii, feat/work-grid, feat/case-study-template, etc.

Genera el proyecto completo comenzando por:
1. package.json con todas las dependencias
2. next.config.ts
3. tailwind.config.ts
4. src/styles/globals.css (design tokens completos)
5. src/lib/gsap.ts
6. src/app/layout.tsx
7. Los componentes en el orden de las secciones
8. Al final: README.md con instrucciones de setup local

Sé exhaustivo. Cada componente debe tener comentarios explicando las decisiones de
diseño referenciando PFD (ej: // PFD L1: este elemento pasa el filtro de 50ms por...).
```

---

## 9. 🛠️ Setup Local Paso a Paso {#setup}

### Prerrequisitos
```bash
node -v   # Necesitas Node.js 20+
npm -v    # npm 10+ o pnpm 9+
git -v    # Cualquier versión reciente
```

### 1. Crear el proyecto
```bash
npx create-next-app@latest juancamilo-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd juancamilo-portfolio
```

### 2. Instalar dependencias
```bash
# Core de animación y 3D
npm install gsap @gsap/react three @types/three lenis

# Formulario y emails
npm install react-hook-form resend

# Íconos
npm install @phosphor-icons/react

# Utilidades
npm install clsx tailwind-merge

# Dev tools
npm install -D @types/node
```

> **Nota sobre GSAP Club (ScrollSmoother, SplitText):**
> Ve a gsap.com/pricing → el plan Club GreenSock tiene licencia gratuita para portafolios personales.
> Descarga los plugins y colócalos en `src/lib/gsap-premium/`
> O usa el CDN trial para desarrollo, y adquiere la licencia antes del deploy.

### 3. Variables de entorno
```bash
# Crea .env.local en la raíz:
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Fuentes (Google Fonts o descarga)
```typescript
// En src/app/layout.tsx:
import { Syne, DM_Mono } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})
```

### 5. Correr en local
```bash
npm run dev
# → Abre http://localhost:3000
```

### 6. Workflow de desarrollo recomendado
```bash
# 1. Construye sección por sección (no todo a la vez)
# 2. Orden recomendado:
#    globals.css → layout.tsx → Loader → Hero (sin Three.js primero) →
#    WebGLBackground → AsciiRenderer → Work → About → Skills →
#    Process → Contact → Footer → Case studies → Polish

# 3. Verifica en cada paso:
npm run build  # Sin errores TypeScript
npm run lint   # Sin warnings ESLint

# 4. Para producción (Vercel):
vercel deploy
```

---

## 10. ✅ Checklist Final de Calidad {#checklist}

### Percepción (PFD)
- [ ] L0: Hero tiene máx. 5 elementos visibles simultáneamente
- [ ] L1: La primera impresión en 50ms es visualmente única (no parece un template)
- [ ] L2: Espaciado consistente en toda la página (design tokens matemáticos)
- [ ] L3: Hay elementos que generan "este tipo sabe" antes de leer el trabajo
- [ ] L4: Desde cualquier punto de la página se puede llegar a contacto en ≤2 clicks

### Animación
- [ ] Lenis + GSAP ticker sincronizados y sin jitter
- [ ] Todas las animaciones son GPU-accelerated (transform + opacity)
- [ ] prefers-reduced-motion respetado (no animaciones si el usuario lo configuró)
- [ ] Three.js dispose() al desmontar
- [ ] No hay memory leaks (verificar con DevTools → Performance)

### Código
- [ ] TypeScript sin `any` (strict mode activo)
- [ ] Componentes server/client correctamente separados
- [ ] GSAP plugins registrados solo una vez
- [ ] Todas las fuentes con `font-display: optional` o `swap`

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] CLS (Cumulative Layout Shift) < 0.1 (las fuentes no causan layout shift)
- [ ] Three.js canvas tiene `loading="lazy"` en fallback img
- [ ] Imágenes en WebP/AVIF con next/image

### UX
- [ ] El sitio funciona en mobile (responsive breakpoints probados)
- [ ] El formulario de contacto envía correctamente
- [ ] Todos los links de case studies funcionan
- [ ] El cursor custom no bloquea clicks en mobile
- [ ] El scroll horizontal de Process funciona en touch

### Contenido
- [ ] Mínimo 4 proyectos con case studies reales
- [ ] Foto de perfil de alta calidad
- [ ] Bio personal que muestra personalidad, no solo skills
- [ ] CV actualizado y descargable
- [ ] Email de contacto real y funcional
- [ ] Links de LinkedIn y GitHub actualizados

---

## 📬 Siguientes Pasos

1. **Hoy:** Corre el setup local y genera el proyecto con el Super Prompt
2. **Semana 1:** Hero + Work grid (sin Three.js todavía, solo GSAP)
3. **Semana 2:** Integrar Three.js + ASCII shader al hero
4. **Semana 3:** Escribir los case studies reales (contenido real > efectos vacíos)
5. **Semana 4:** Polish, performance, SEO, deploy en Vercel

> **Regla de oro de Juan Camilo:**
> El sitio que demuestra que sabes construir sitios increíbles
> es más poderoso que cualquier descripción de que sabes hacerlo.

---

*Plan creado con investigación activa de Codrops, Awwwards, Webflow Showcase, PFD v3.6 (Kovalik, 2025-2026), y análisis de Aino Agency + juanmora.co.*
*Actualizado: Mayo 2026.*
