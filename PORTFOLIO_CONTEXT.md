# Portfolio JC — Master Context File
> Gemini 3.5 Flash · Antigravity CLI · Lead developer instructions

---

## 👤 Client Profile

| Field | Value |
|-------|-------|
| Name | Juan Camilo Calderón Calderón |
| Role | Systems Engineering Student — UNAB, Bucaramanga, Colombia |
| Focus | Full-Stack Developer & UX/UI Designer |
| Personality | Ambitious, visual, loves 3D and dark aesthetics |
| Audience | Recruiters, freelance clients, collaborators |

---

## 🎯 Goal

Build a **world-class personal portfolio** that stands out through:
- Immersive 3D elements (React Three Fiber)
- Cinematic scroll animations (GSAP + ScrollTrigger)
- Dark monochromatic aesthetic with a single cold accent
- AI-integrated projects that show modern skills

---

## 🛠 Tech Stack

```
Framework:    Next.js 15 (App Router) + TypeScript
Styling:      Tailwind CSS v4
3D:           React Three Fiber + @react-three/drei + Three.js
Animation:    GSAP + ScrollTrigger + SplitText
Fonts:        Geist (next/font/google)
Deploy:       Vercel
Package mgr:  npm
```

---

## 🎨 Design System

### Color Palette — Dark Monochromatic + Cold Indigo Accent

```css
:root {
  --color-base:    #050508;   /* deepest background */
  --color-bg2:     #0D0D14;   /* secondary background */
  --color-card:    #16161F;   /* card surfaces */
  --color-border:  #252535;   /* borders and dividers */
  --color-muted:   #A0A0C0;   /* secondary text */
  --color-text:    #E8E8F5;   /* primary text */
  --color-accent:  #6366F1;   /* THE ONLY COLOR — use sparingly */
}
```

> ⚠️ No gradients. No heavy shadows. No secondary colors. Everything else is grayscale cold tones.

### Typography

- **Font:** Geist (loaded via `next/font/google`)
- **Headings:** `font-weight: 500` — never bold 700
- **Body:** 16px / line-height 1.7
- **Labels:** 11–12px, uppercase, letter-spacing 0.08em

### Spacing & Shape

- Border radius: `8px` default, `16px` for cards
- Padding inside cards: `24px`
- Section padding: `120px` vertical on desktop, `80px` on mobile

---

## 📐 Portfolio Structure

### Sections (in order)

```
1. Hero        → Name + role + CTA + floating 3D abstract geometry
2. About       → Personal story, photo placeholder, personality
3. Skills      → Grouped by area, max 12 icons
4. Projects    → 3 cards (In Progress) — DevForge, DesignOS, Cosmos
5. Experience  → UNAB timeline + personal milestones
6. Contact     → Email form + social links (LinkedIn, GitHub)
```

### File Structure

```
src/
├── app/
│   ├── layout.tsx          ← Geist font, metadata, globals
│   ├── page.tsx            ← All sections assembled
│   └── globals.css         ← CSS variables + base styles
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── three/
│   │   ├── HeroScene.tsx   ← R3F canvas for hero
│   │   └── ParticleField.tsx
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   └── animations/
│       ├── useHeroAnimation.ts
│       └── useScrollReveal.ts
├── lib/
│   └── gsap.ts             ← GSAP registration + ScrollTrigger setup
└── types/
    └── index.ts
```

---

## ✨ Animation Rules

### GSAP — Per Section

| Section | Animation | Config |
|---------|-----------|--------|
| Hero name | SplitText char by char | `stagger: 0.04s, y: 60→0, opacity: 0→1` |
| Hero subtitle | Word by word reveal | `stagger: 0.06s, delay: 0.8s` |
| About | Clip-path reveal on image | `clipPath: "inset(100% 0 0 0)"→"inset(0%)"` |
| Skills cards | ScrollTrigger.batch | `stagger: 0.15s, y: 40→0` |
| Projects | Horizontal pin + scrub | `pin: true, scrub: 1` (desktop only) |
| Experience | Line grows + items alternate | `scaleY: 0→1, x: ±60→0` |
| Page load | Dark overlay wipe | `y: 0→"-100%", duration: 0.6s` |

### Mobile Rules

```
- NEVER use pin: true on mobile (Safari iOS bug)
- Use scrub without pin on mobile
- Use IntersectionObserver as fallback for simple reveals
- Test on real device, not DevTools simulator
```

### GSAP Best Practices

```js
// ✅ GOOD — one ScrollTrigger for all cards
ScrollTrigger.batch(".skill-card", {
  onEnter: (batch) => gsap.from(batch, {
    opacity: 0, y: 40, stagger: 0.15
  })
});

// ❌ BAD — creates 50 individual ScrollTriggers
document.querySelectorAll(".skill-card").forEach(card => {
  gsap.from(card, { opacity: 0, scrollTrigger: { trigger: card } });
});
```

---

## 🧊 3D Rules (React Three Fiber)

### Hero Scene

```tsx
// Abstract geometry that rotates slowly + reacts to mouse
// Options: IcosahedronGeometry, TorusKnotGeometry, OctahedronGeometry
// Material: MeshStandardMaterial, color: #6366F1, wireframe or solid
// Lighting: 1 ambient (0.3) + 1 point light (accent color)
// Post-processing: subtle bloom on the geometry only
```

### Performance Rules

```
- Wrap Canvas in <Suspense> with a fallback
- Use <Preload all /> from drei
- Dispose geometries and materials on unmount
- Keep polygon count low — this is UI, not a game
- Pause animation when tab is not visible (useThree + visibilitychange)
```

---

## 📦 Projects to Showcase

### Project 01 — DevForge *(In Progress)*
> AI-powered README generator

| | |
|--|--|
| Problem | Developers skip documentation |
| Solution | Paste project info → AI generates a professional README.md |
| Stack | Next.js, Claude/Gemini API, Tailwind, Vercel |
| Difficulty | ⬤ ○ ○ Beginner |
| Status | In Progress |

### Project 02 — DesignOS *(In Progress)*
> Interactive design system generator

| | |
|--|--|
| Problem | Design tokens are painful to create manually |
| Solution | Generate palettes, typography, spacing → export to CSS/JSON |
| Stack | React, Canvas API, Node.js, PostgreSQL |
| Difficulty | ⬤ ⬤ ○ Intermediate |
| Status | In Progress |

### Project 03 — Cosmos *(In Progress)*
> Real-time 3D data visualizer

| | |
|--|--|
| Problem | Data dashboards are boring and 2D |
| Solution | Fetch live API data → render as interactive 3D scene |
| Stack | React Three Fiber, GSAP, REST APIs, WebSockets |
| Difficulty | ⬤ ⬤ ⬤ Advanced |
| Status | In Progress |

---

## 🤖 Subagent Architecture

When building each section, think in **4 parallel roles** and address each before writing code:

```
[LAYOUT]    → Semantic HTML/JSX structure. Mobile-first. Aria-labels.
              Only Tailwind classes, no inline styles.

[3D]        → React Three Fiber components. Abstract geometries.
              Float + slow rotation. Mouse parallax on hero.

[ANIMATION] → GSAP scripts. ScrollTrigger.batch for groups.
              SplitText for headings. Never pin on mobile.

[CONTENT]   → Copy text for Juan Camilo. Personal and direct tone.
              Hero tagline ≤ 10 words. Skills grouped by area.
```

### How to invoke a subagent task (Antigravity CLI)

```bash
# Example: build Hero section
agy "Read PORTFOLIO_CONTEXT.md. 
You are now in [LAYOUT] role. 
Build the Hero section JSX for this portfolio.
Output: src/components/sections/Hero.tsx"

# Then hand off to Animation subagent:
agy "Read PORTFOLIO_CONTEXT.md and src/components/sections/Hero.tsx.
You are now in [ANIMATION] role.
Add GSAP SplitText animation to the Hero name and subtitle.
Output: update Hero.tsx + create src/components/animations/useHeroAnimation.ts"
```

---

## 📅 Build Roadmap

| Week | Focus | Subagents active |
|------|-------|-----------------|
| 1 | Setup + design system + globals | LAYOUT |
| 2 | Hero + About + Skills | LAYOUT + 3D + ANIMATION |
| 3 | Projects + Experience | LAYOUT + ANIMATION + CONTENT |
| 4 | Contact + polish + deploy | CONTENT + QA |
| Parallel | Project 01 — DevForge | All |

---

## 🚦 Phase System

This project is built **phase by phase**. After each phase:
1. Show the file tree or key generated files
2. Wait for human confirmation ("next" / "siguiente")
3. Only then proceed to the next phase

### Phase 0 — Project Init *(start here)*
```
- Initialize Next.js 15 + TypeScript
- Install all dependencies (see stack above)
- Set up Tailwind v4 with design system colors
- Create globals.css with all CSS variables
- Create layout.tsx with Geist font + metadata
- Create empty section components (shell only)
- Show full file tree when done
```

### Phase 1 — Hero Section
```
- [LAYOUT] Hero.tsx structure
- [3D] HeroScene.tsx with floating abstract geometry
- [ANIMATION] useHeroAnimation.ts with SplitText
- [CONTENT] Name, role tagline, CTA button copy
```

### Phase 2 — About + Skills
```
- [LAYOUT] About.tsx + Skills.tsx
- [ANIMATION] Scroll reveal for both sections
- [CONTENT] Personal bio + skills grouped by area
```

### Phase 3 — Projects + Experience
```
- [LAYOUT] Projects.tsx + Experience.tsx
- [ANIMATION] Horizontal scroll for projects, timeline for experience
- [CONTENT] Project cards (In Progress) + UNAB timeline
```

### Phase 4 — Contact + Polish + Deploy
```
- [LAYOUT] Contact.tsx + Navbar + Footer + PageTransition
- [ANIMATION] Page transition overlay
- [CONTENT] Contact copy + social links
- Deploy to Vercel
```

---

## 🔁 Working With Claude (architect)

This project is supervised by **Claude (Anthropic)** as the architect.
Juan Camilo will share outputs with Claude after each phase for review.
Claude will then provide the next prompt to paste here.

**Do not skip phases. Do not build ahead without confirmation.**
**Always read this file at the start of every new session.**

---

*Last updated: May 19, 2026 — Portfolio JC v1.0*
