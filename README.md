# 🌌 Portfolio JC — Juan Camilo Calderón Calderón

> **A World-Class Personal Portfolio** | Systems Engineering Student at UNAB (Bucaramanga, Colombia)
>
> Designed with a dark monochromatic cold-tone aesthetic, cinematic scroll animations, and interactive 3D elements.

---

## 🌟 Vision & Design Philosophy

This portfolio stands out through a meticulously selected dark monochromatic theme accentuated by a single cold accent: **Cold Indigo (`#6366F1`)**. The visual language is premium, minimal, and highly interactive, avoiding generic colors and heavy shadows in favor of crisp borders, elegant geometry, and responsive layouts.

### 🎨 Design System & Tokens
* **Base Background:** `#050508` (Deep space)
* **Secondary Background:** `#0D0D14` (Soft dark panels)
* **Card Surface:** `#16161F` (Surfaces)
* **Border Color:** `#252535` (Fine lines)
* **Text Primary:** `#E8E8F5` (Off-white)
* **Text Muted:** `#A0A0C0` (Cool gray-blue)
* **Cold Accent:** `#6366F1` (Indigo — used sparingly for focus points)
* **Typography:** **Geist Sans & Mono** (Optimized via `next/font`), emphasizing weights around `500` for headings instead of heavy bolding.

---

## 🛠 Tech Stack

The application is built using a modern, performant, and type-safe frontend stack:

* **Framework:** Next.js 15 (App Router with Turbopack support)
* **Language:** TypeScript & React 19
* **Styling:** Tailwind CSS v4 (Using modern custom properties)
* **3D Engine:** React Three Fiber (R3F), `@react-three/drei`, and Three.js
* **Animations:** GSAP (GreenSock Animation Platform) & ScrollTrigger
* **Backend Utilities:** Resend API for transactional email forwarding
* **Deployment:** Vercel

---

## ✨ Key Features

1. **Interactive 3D Background (`GlobalCanvas.tsx`)**
   * Immersive Three.js Canvas running smoothly in the background.
   * Floating abstract **wireframe icosahedron** for the Hero/Contact scenes.
   * A beautiful scattered **point cloud** for the About section.
   * Grid line wireframes with dynamic **tilt and cursor-responsive parallax** for Skills & Projects.
   * A dynamic **CatmullRom spiral tube** for the Experience timeline.
2. **Cinematic Motion Design**
   * Staggered GSAP SplitText-like animations on titles.
   * ScrollTrigger-based batch reveals for grid cards.
   * Seamless dark overlay wipes for page transitions.
   * Responsive, touch-friendly configurations that disable heavy effects on mobile to prevent scrolling latency.
3. **Optimized Contact Endpoint**
   * Contact form communicating with an App Router route (`/api/contact`).
   * Sends clean notifications to `CONTACT_TO_EMAIL` using the modern `resend` library.

---

## 📂 Project Showcase

Inside the portfolio, we highlight three high-impact, progressive projects currently in development:

| Project | Description | Tech Stack | Complexity | Status |
| :--- | :--- | :--- | :--- | :--- |
| **🛠 DevForge** | AI-powered documentation generator. Input codebase info to instantly craft premium READMEs. | Next.js, Gemini API, Tailwind, Vercel | ⬤ ○ ○ Beginner | *In Progress* |
| **🎨 DesignOS** | Interactive design system generator. Custom palette, typography, and token builder. | React, Canvas API, Node.js, PostgreSQL | ⬤ ⬤ ○ Intermediate | *In Progress* |
| **🌌 Cosmos** | Real-time 3D data visualizer representing live API endpoints in physical space. | R3F, GSAP, WebSockets, REST APIs | ⬤ ⬤ ⬤ Advanced | *In Progress* |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18+ recommended) and `npm` installed.

### 2. Clone & Install Dependencies
Clone your repository and install packages:
```bash
git clone <your-repository-url>
cd portfolio-jc
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Open `.env.local` and add your **Resend** API configuration:
```env
RESEND_API_KEY=re_YOUR_SECRET_KEY
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=your-personal-email@domain.com
```
> 💡 *Note: `RESEND_FROM_EMAIL` must be a domain validated in your Resend account, or `onboarding@resend.dev` for testing with authorized emails.*

### 4. Run Development Server
Start Next.js with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 5. Build for Production
To generate an optimized production bundle:
```bash
npm run build
npm run start
```

---

## 📐 Folder Structure

Here's an overview of the key directories and files:

```
portfolio-jc/
├── public/                 # Static assets
└── src/
    ├── app/
    │   ├── api/contact/    # Contact form endpoint using Resend
    │   ├── globals.css     # Tailwind variables & base scroll setups
    │   ├── layout.tsx      # Font, HTML layout & metadata configurations
    │   └── page.tsx        # Entry page assembling all sections
    ├── components/
    │   ├── animations/     # Reusable custom GSAP & ScrollReveal hooks
    │   ├── sections/       # Section components (Hero, About, Skills, Projects, Experience, Contact)
    │   ├── three/          # R3F Canvas components (GlobalCanvas.tsx, etc.)
    │   └── ui/             # Core layout elements (Navbar, Footer, PageTransition)
    ├── lib/
    │   └── gsap.ts         # Central GSAP library setup and global plugins
    └── types/              # TypeScript typings
```

---

## 🛡️ License

This project is private and dedicated to the portfolio of **Juan Camilo Calderón Calderón**. All rights reserved.
