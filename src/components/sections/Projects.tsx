"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tech: string[];
  difficulty: number; // 1 to 3
  status: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    name: "DevForge",
    description: "An AI-powered development orchestrator that auto-generates comprehensive documentation.",
    tech: ["Next.js 15", "Gemini API", "TypeScript", "TailwindCSS"],
    difficulty: 2,
    status: "In Progress",
  },
  {
    id: "02",
    name: "DesignOS",
    description: "An interactive workspace for rapid UI generation, styling tokens, and canvas orchestration.",
    tech: ["React", "GSAP", "Figma API", "TailwindCSS"],
    difficulty: 2,
    status: "In Progress",
  },
  {
    id: "03",
    name: "Cosmos",
    description: "A high-fidelity real-time 3D data visualizer and custom particle simulation cockpit.",
    tech: ["Three.js", "R3F", "WebGL", "Node.js"],
    difficulty: 3,
    status: "In Progress",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  // Bind high-performance scroll triggers (batch staggered fade reveal)
  useScrollReveal(sectionRef, "projects");

  // Custom premium 3D Tilt & Cursor Spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = (x - rect.width / 2) / (rect.width / 2);
    const yc = -(y - rect.height / 2) / (rect.height / 2);

    const tiltX = yc * 6; // max 6 degrees tilt
    const tiltY = xc * 6;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.borderColor = "var(--color-accent)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.borderColor = "var(--color-border)";
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-scene="projects"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-bg2 relative border-t border-border overflow-hidden"
      aria-label="Projects Section"
    >
      {/* Decorative background grid line */}
      <div className="absolute inset-y-0 left-1/4 w-px bg-border/10 pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-px bg-border/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="projects-header-reveal mb-16 sm:mb-20">
          <span className="label-caps mb-4 block tracking-[0.15em] text-accent">SELECTED WORKS</span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-text">
            Featured Projects
          </h2>
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card border border-border rounded-2xl p-6 sm:p-8 cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                background: `radial-gradient(circle 220px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.05), transparent 75%), var(--color-card)`,
                transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease",
                willChange: "transform, border-color",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                {/* Numeric Indicator */}
                <span className="font-mono text-xs text-muted/40 uppercase tracking-widest">
                  NO. {project.id}
                </span>

                {/* Status Badge */}
                <span className="px-2.5 py-0.5 rounded-full border border-accent/20 bg-accent/5 font-mono text-[9px] font-semibold text-accent uppercase tracking-wider">
                  {project.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-medium text-text mb-3">
                {project.name}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: '#C8C8DC' }}>
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, idx) => (
                  <span
                    key={`${project.id}-tech-${idx}`}
                    className="px-2 py-0.5 border border-border/80 bg-base/50 rounded font-mono text-[10px] text-muted uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Card Footer: Difficulty Indicators */}
              <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                <span className="font-mono text-[9px] text-muted/60 uppercase tracking-wider">
                  Difficulty Level
                </span>

                {/* Difficulty Dots (1 to 3) */}
                <div className="flex gap-1.5 items-center" aria-label={`Difficulty ${project.difficulty} of 3`}>
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        dot <= project.difficulty ? "bg-accent" : "bg-border/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
