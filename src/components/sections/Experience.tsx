"use client";

import { useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

interface MilestoneItem {
  year: string;
  status: string;
  title: string;
  place: string;
  description: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "2023",
    status: "Present",
    title: "Systems Engineering",
    place: "UNAB · Bucaramanga, Colombia",
    description:
      "Building foundations in algorithms, data structures, software architecture and systems design — exploring where engineering meets creative development.",
  },
  {
    year: "2025",
    status: "Present",
    title: "Self-Taught Full-Stack & 3D Web",
    place: "Personal",
    description:
      "Next.js, React Three Fiber, GSAP and AI integrations, learned and refined through real projects.",
  },
  {
    year: "2026",
    status: "Now",
    title: "Portfolio & First Projects",
    place: "In progress",
    description:
      "Building DevForge, DesignOS and Cosmos. Open to internships, freelance and collaboration.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  // Timeline editorial: línea de progreso scrubbed + reveals por hito.
  useScrollReveal(sectionRef, "experience");

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-scene="experience"
      className="section-pad px-6 sm:px-12 md:px-24 relative"
      aria-label="The journey — milestones and education"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="experience-header-reveal mb-14 sm:mb-20 max-w-3xl">
          <span className="label-caps mb-5 block">The Journey</span>
          <h2 className="text-display text-text">
            A path in <span className="italic-accent text-accent">motion</span>
          </h2>
        </header>

        {/* Timeline editorial: track vertical a la izquierda con relleno de
            progreso (scrubbed), y los hitos como filas que revelan por scroll. */}
        <div className="experience-timeline relative pl-8 sm:pl-12">
          {/* Track base + relleno de progreso. */}
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-border"
          />
          <div
            aria-hidden
            className="experience-progress absolute left-0 top-2 bottom-2 w-px origin-top bg-accent"
            style={{ transform: "scaleY(0)" }}
          />

          <ol>
            {MILESTONES.map((item, idx) => (
              <li
                key={item.year}
                className="milestone-item relative border-t border-border/60 py-12 first:border-t-0 first:pt-2 sm:py-16"
              >
                {/* Nodo sobre la línea. */}
                <span
                  aria-hidden
                  className="absolute -left-8 top-[3.6rem] h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-base sm:-left-12 sm:top-[4.6rem]"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-12">
                  {/* Año serif reducido + status */}
                  <div className="md:col-span-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-4xl font-light leading-none tracking-tight text-text sm:text-5xl">
                        {item.year}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                        {item.status}
                      </span>
                    </div>
                    <span
                      className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted/60"
                      aria-hidden="true"
                    >
                      {String(idx + 1).padStart(2, "0")} / {String(MILESTONES.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="md:col-span-8">
                    <h3 className="font-display text-2xl font-normal leading-[1.1] tracking-tight text-text sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {item.place}
                    </p>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-text/80 sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
