/**
 * Datos de proyectos (contrato compartido por Works.tsx y CoverArt.tsx).
 * Las portadas son placeholders estilizados generados por CSS
 * (no hay imágenes reales todavía) — reemplazables luego añadiendo `image`.
 */

export interface Project {
  /** Índice mostrado, p.ej. "01". */
  id: string;
  slug: string;
  title: string;
  /** Descripción corta editorial. */
  blurb: string;
  year: string;
  /** Rol / tipo de trabajo. */
  role: string;
  tags: string[];
  status: "In Progress" | "Live" | "Concept";
  /** Enlace externo opcional (demo/repo). */
  href?: string;
  /** Par de colores para el gradiente de la portada (hex). */
  cover: { from: string; to: string };
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "devforge",
    title: "DevForge",
    blurb:
      "An AI development orchestrator that reads a codebase and generates comprehensive, accurate documentation.",
    year: "2025",
    role: "Design & Build",
    tags: ["Next.js 15", "Gemini API", "TypeScript", "Tailwind"],
    status: "In Progress",
    cover: { from: "#6366F1", to: "#312E81" },
  },
  {
    id: "02",
    slug: "designos",
    title: "DesignOS",
    blurb:
      "An interactive workspace for rapid UI generation, design tokens, and live canvas orchestration.",
    year: "2025",
    role: "Design & Build",
    tags: ["React", "GSAP", "Figma API", "Tailwind"],
    status: "In Progress",
    cover: { from: "#818CF8", to: "#1E1B4B" },
  },
  {
    id: "03",
    slug: "cosmos",
    title: "Cosmos",
    blurb:
      "A high-fidelity, real-time 3D data visualizer and custom particle simulation cockpit for the web.",
    year: "2026",
    role: "Creative Dev",
    tags: ["Three.js", "R3F", "WebGL", "Node.js"],
    status: "Concept",
    cover: { from: "#4F46E5", to: "#0D0D14" },
  },
];
