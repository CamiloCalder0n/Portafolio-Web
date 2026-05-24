"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

interface MilestoneItem {
  date: string;
  title: string;
  institution: string;
  description: string;
  side: "left" | "right";
}

const MILESTONES: MilestoneItem[] = [
  {
    date: "2023 — Present",
    title: "Systems Engineering",
    institution: "UNAB — BUCARAMANGA, COLOMBIA",
    description: "Building foundations in algorithms, data structures, software architecture, and systems design. Exploring the intersection of engineering and creative development.",
    side: "left",
  },
  {
    date: "2025 — Present",
    title: "Self-Taught Full-Stack & 3D Web",
    institution: "PERSONAL DEVELOPMENT",
    description: "Learning Next.js, React Three Fiber, GSAP, and AI integrations through real projects. Currently building this portfolio as a live demonstration of that journey.",
    side: "right",
  },
  {
    date: "2026 — Now",
    title: "Portfolio & First Projects",
    institution: "IN PROGRESS",
    description: "Actively building DevForge, DesignOS, and Cosmos. Open to internships, freelance work, and collaborative projects.",
    side: "left",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger high-fidelity timeline grow scroll reveal (scrubbing vertical lines & dots highlight)
  useScrollReveal(sectionRef, "experience");

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-scene="experience"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-base/80 relative border-t border-border overflow-hidden"
      aria-label="Experience & Milestones Section"
    >
      {/* Decorative vertical background grids */}
      <div className="absolute inset-y-0 left-[16px] sm:left-1/2 w-px bg-border/5 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="experience-header-reveal mb-20 sm:mb-24 text-left sm:text-center">
          <span className="label-caps mb-4 block tracking-[0.15em] text-accent">TIMELINE</span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-text">
            Experience & Education
          </h2>
        </div>

        {/* Timeline Outer Container */}
        <div className="timeline-container relative w-full mt-12">
          
          {/* Vertical central line background container */}
          <div className="timeline-line-bg absolute left-[16px] sm:left-1/2 top-4 bottom-4 w-[2px] bg-border/40 -translate-x-1/2 pointer-events-none" />
          
          {/* Growing active vertical progress line (animated by GSAP scroll scrubbing) */}
          <div className="timeline-line-grow absolute left-[16px] sm:left-1/2 top-4 w-[2px] bg-accent -translate-x-1/2 origin-top h-0 pointer-events-none" />

          {/* Timeline Items Grid */}
          <div className="space-y-4">
            {MILESTONES.map((item, idx) => {
              const isLeft = item.side === "left";
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 w-full timeline-item ${
                    isLeft ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Alternate side blank spacing for desktop grid balance */}
                  <div className="hidden sm:block w-[calc(50%-32px)]" />

                  {/* Dynamic indicator dot marker */}
                  <div 
                    className="timeline-dot absolute left-[16px] sm:left-1/2 top-2 sm:top-1/2 w-3.5 h-3.5 rounded-full border-2 border-border bg-base -translate-x-1/2 sm:-translate-y-1/2 z-10 flex items-center justify-center transition-colors duration-300"
                    style={{ willChange: "border-color" }}
                  >
                    {/* Pulsing indigo core - starts invisible, lights up as the line reaches it */}
                    <div 
                      className="timeline-dot-inner w-1.5 h-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
                      style={{ willChange: "opacity" }}
                    />
                  </div>

                  {/* Content Container Card */}
                  <div className="timeline-content w-full sm:w-[calc(50%-32px)] pl-10 sm:pl-0">
                    <div className="card-premium p-6 sm:p-8 hover:border-accent/40 transition-colors duration-300">
                      <span className="font-mono text-xs text-accent font-medium tracking-widest block mb-2">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-medium text-text mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[10px] text-muted/60 uppercase tracking-widest block mb-4">
                        {item.institution}
                      </span>
                      <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#C8C8DC' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
