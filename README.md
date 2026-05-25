# Portafolio JC — Juan Camilo Calderón Calderón

Este es el repositorio oficial del portafolio profesional de Juan Camilo Calderón Calderón, estudiante de Ingeniería de Sistemas en la Universidad Autónoma de Bucaramanga (UNAB), Colombia. 

El sitio está estructurado para presentar de manera minimalista y de alto rendimiento una variedad de proyectos de desarrollo full-stack, diseño de interfaces y visualizaciones tridimensionales interactivas.

---

## Visión y Filosofía de Diseño

La interfaz del portafolio se rige por un esquema de diseño de escala de grises fría con un único acento cromático. Se evitan degradados, sombras pesadas y múltiples colores secundarios para priorizar la legibilidad y la fluidez visual.

### Colores del Sistema
* **Fondo Base:** `#050508` (Tono oscuro profundo)
* **Fondo Secundario:** `#0D0D14` (Paneles y secciones internas)
* **Superficie de Tarjetas:** `#16161F` (Contenedores de proyectos)
* **Borde:** `#252535` (Líneas finas de separación)
* **Texto Primario:** `#E8E8F5` (Blanco frío)
* **Texto Secundario:** `#A0A0C0` (Gris azulado)
* **Acento Cromático:** `#6366F1` (Índigo frío, utilizado exclusivamente para puntos de enfoque y estados activos)

### Tipografía y Espaciado
* **Fuente:** Geist Sans y Geist Mono (cargadas mediante `next/font`), con énfasis en pesos medianos (`500`) en encabezados.
* **Espaciado de Secciones:** 120px en escritorio y 80px en dispositivos móviles.

---

## Arquitectura Tecnológica

El proyecto se desarrolla bajo un conjunto de tecnologías robustas y modernas orientadas al rendimiento y al tipado estricto:

* **Framework:** Next.js 15 (App Router con soporte optimizado para Turbopack)
* **Lenguaje:** TypeScript y React 19
* **Estilos:** Tailwind CSS v4
* **Gráficos 3D:** React Three Fiber, `@react-three/drei` y Three.js
* **Animaciones:** GSAP (GreenSock Animation Platform) y ScrollTrigger
* **Envío de Mensajes:** Resend API para la gestión del formulario de contacto
* **Plataforma de Despliegue:** Vercel

---

## Características Principales

### 1. Entorno 3D Interactivo (`GlobalCanvas.tsx`)
El portafolio integra un lienzo tridimensional que corre en segundo plano y responde a la posición del cursor y al avance del scroll:
* **Escena Hero / Contacto:** Un icosaedro alámbrico abstracto de baja densidad poligonal.
* **Escena About:** Una nube de puntos dispersos de color índigo.
* **Escena Skills / Projects:** Rejillas alámbricas con inclinación en perspectiva y respuesta sutil al movimiento físico del mouse.
* **Escena Experience:** Una espiral CatmullRom tridimensional que acompaña el flujo cronológico.

### 2. Animaciones de Alto Rendimiento
* Carga secuencial de caracteres y palabras en los títulos del Hero.
* Animación por lotes (`ScrollTrigger.batch`) en la presentación de habilidades para evitar saltos de rendimiento.
* Transiciones limpias a través de un panel oscuro al navegar entre vistas.
* Reglas adaptativas que mitigan o detienen la carga gráfica en dispositivos móviles para optimizar la experiencia en navegadores móviles.

### 3. API de Contacto
* Formulario completamente integrado que se comunica de forma asíncrona con el endpoint `/api/contact` en Next.js App Router, enviando la información directamente por correo a través de Resend.

---

## Proyectos en Desarrollo

| Proyecto | Descripción | Tecnologías | Dificultad | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **DevForge** | Generador de documentación profesional README a partir del análisis del código mediante inteligencia artificial. | Next.js, Gemini API, Tailwind, Vercel | 1/3 (Principiante) | En Progreso |
| **DesignOS** | Generador y gestor interactivo de tokens de diseño, paletas de colores y tipografías exportables. | React, Canvas API, Node.js, PostgreSQL | 2/3 (Intermedio) | En Progreso |
| **Cosmos** | Visualizador de datos en tiempo real representado mediante escenas tridimensionales interactivas en la web. | React Three Fiber, GSAP, WebSockets, REST APIs | 3/3 (Avanzado) | En Progreso |

---

## Guía de Configuración y Despliegue

### Requisitos Previos
* Node.js v18 o superior instalado.
* Gestor de paquetes `npm`.

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/CamiloCalder0n/Portafolio-Web.git
cd portfolio-jc
npm install
```

### 2. Configurar variables de entorno
Copie el archivo de ejemplo para configurar sus credenciales locales:
```bash
cp .env.example .env.local
```
Edite `.env.local` y proporcione las llaves de Resend correspondientes:
```env
RESEND_API_KEY=re_tu_llave_secreta
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=tu_correo_personal@dominio.com
```

### 3. Ejecutar en entorno de desarrollo
Inicie el servidor de desarrollo utilizando Turbopack:
```bash
npm run dev
```
Acceda a [http://localhost:3000](http://localhost:3000) en su navegador.

### 4. Construcción para producción
Para compilar y optimizar la aplicación para producción:
```bash
npm run build
npm run start
```

---

## Estructura del Directorio

```
portfolio-jc/
├── public/                 # Recursos estáticos (imágenes, vectores)
└── src/
    ├── app/
    │   ├── api/contact/    # Endpoint para la gestión de envíos con Resend
    │   ├── globals.css     # Variables de diseño y estilos de Tailwind
    │   ├── layout.tsx      # Configuración de tipografía, metadatos y envoltura principal
    │   └── page.tsx        # Página de inicio que orquesta las secciones
    ├── components/
    │   ├── animations/     # Hooks personalizados de GSAP y ScrollReveal
    │   ├── sections/       # Componentes de interfaz (Hero, About, Skills, Projects, Experience, Contact)
    │   ├── three/          # Componentes de React Three Fiber (GlobalCanvas.tsx)
    │   └── ui/             # Elementos comunes (Navbar, Footer, PageTransition)
    ├── lib/
    │   └── gsap.ts         # Registro global de complementos y utilidades de GSAP
    └── types/              # Tipados de TypeScript
```

---

## Licencia

Este proyecto es de carácter privado y de uso exclusivo para el portafolio profesional de **Juan Camilo Calderón Calderón**. Todos los derechos reservados.
