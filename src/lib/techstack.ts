import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiThreedotjs,
  SiGreensock,
  SiWebgl,
  SiGooglegemini,
  SiLangchain,
} from "react-icons/si";

export interface Tech {
  name: string;
  /** Simple Icon brand mark, or undefined for a text-only chip. */
  Icon?: IconType;
}

export interface TechCategory {
  label: string;
  blurb: string;
  techs: Tech[];
}

/**
 * TechStack data. Brand marks come from react-icons/si (Simple Icons);
 * each export is verified to exist in node_modules/react-icons/si.
 * Techs without a brand mark (RAG, Agentic Workflows) render as text chips.
 * React Three Fiber reuses the Three.js mark (no dedicated Simple Icon).
 */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    blurb: "Fast, typed interfaces — Server Components, modern rendering and design-token systems.",
    techs: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind", Icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend",
    blurb: "High-throughput servers, APIs and data — microservices, relational modeling and secure auth.",
    techs: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Firebase", Icon: SiFirebase },
    ],
  },
  {
    label: "3D / Motion",
    blurb: "Experiences in the browser — R3F scenes, custom materials and animation choreography.",
    techs: [
      { name: "Three.js", Icon: SiThreedotjs },
      { name: "GSAP", Icon: SiGreensock },
      { name: "WebGL", Icon: SiWebgl },
      { name: "React Three Fiber", Icon: SiThreedotjs },
    ],
  },
  {
    label: "AI",
    blurb: "AI integrations — multimodal inference, multi-agent pipelines and RAG.",
    techs: [
      { name: "Gemini", Icon: SiGooglegemini },
      { name: "LangChain", Icon: SiLangchain },
      { name: "RAG" },
      { name: "Agentic Workflows" },
    ],
  },
];
