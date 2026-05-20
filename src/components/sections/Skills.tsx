"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

interface SkillItem {
  title: string;
  description: string;
  level: string;
  tag: string;
}

interface SkillGroup {
  id: string;
  name: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "01",
    name: "FRONTEND CORE",
    skills: [
      {
        title: "React & Next.js 15",
        description: "Declarative React, Server Components, Route Handlers, and modern rendering strategies.",
        level: "Intermediate",
        tag: "UI/UX",
      },
      {
        title: "Tailwind CSS v4",
        description: "Aesthetic styling systems, custom HSL design tokens, responsive rules, and custom utilities.",
        level: "Intermediate",
        tag: "STYLING",
      },
      {
        title: "TypeScript",
        description: "Strict static typing, interface contracts, custom generics, and end-to-end type safety.",
        level: "Intermediate",
        tag: "ENGINE",
      },
    ],
  },
  {
    id: "02",
    name: "BACKEND SYSTEMS",
    skills: [
      {
        title: "Node.js & Express",
        description: "High-throughput servers, RESTful microservices, custom middleware, and secure routing.",
        level: "Intermediate",
        tag: "RUNTIME",
      },
      {
        title: "PostgreSQL & SQL",
        description: "Relational modeling, constraint configurations, index optimization, and complex querying.",
        level: "Intermediate",
        tag: "DATABASE",
      },
      {
        title: "Firebase Connect",
        description: "Integrating Firestore databases, real-time sync systems, and secure Firebase Auth rules.",
        level: "Intermediate",
        tag: "BaaS",
      },
    ],
  },
  {
    id: "03",
    name: "3D & ANIMATION",
    skills: [
      {
        title: "React Three Fiber",
        description: "Declarative 3D Canvas architectures, mesh controls, point lights, and render loop setups.",
        level: "Learning",
        tag: "R3F",
      },
      {
        title: "Three.js & WebGL",
        description: "Geometries, custom materials, cameras, lighting setups, and standard 3D rendering loops.",
        level: "Learning",
        tag: "3D",
      },
      {
        title: "GSAP & ScrollTrigger",
        description: "Timeline orchestration, character character-splits, and high-efficiency batch reveals.",
        level: "Intermediate",
        tag: "MOTION",
      },
    ],
  },
  {
    id: "04",
    name: "AI & AGENTICS",
    skills: [
      {
        title: "Google Gemini API",
        description: "Integrating multi-modal inference, structured JSON output setups, and system prompting.",
        level: "Learning",
        tag: "LLM",
      },
      {
        title: "Agentic Workflows",
        description: "Constructing modular multi-agent pipelines, self-healing tasks, and code sandbox execution.",
        level: "Learning",
        tag: "AGENTS",
      },
      {
        title: "LangChain / RAG",
        description: "Retrieval-augmented generation pipelines, vector database embeddings, and custom prompt templates.",
        level: "Learning",
        tag: "AI_RAG",
      },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger high-efficiency ScrollTrigger batch staggered card reveals
  useScrollReveal(sectionRef, "skills");

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-scene="skills"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-base relative border-t border-border overflow-hidden"
      aria-label="Skills & Capabilities Section"
    >
      {/* Decorative subtle dot background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Decorative cyber terminal background panel (JC.INIT) - floating ambient detail */}
      <div className="absolute right-[-60px] bottom-[-40px] w-80 aspect-[4/5] bg-card/5 border border-border/10 rounded-2xl p-6 pointer-events-none opacity-[0.03] sm:opacity-[0.06] rotate-[-6deg] select-none z-0 hidden lg:flex flex-col justify-between">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/10 pb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-border/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-border/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-border/25" />
          </div>
          <span className="font-mono text-[8px] text-muted/40 tracking-wider">decor_manifest.sh</span>
        </div>

        {/* Rotating center sphere */}
        <div className="my-6 flex items-center justify-center">
          <div className="relative w-36 h-36 rounded-full border border-accent/5 flex items-center justify-center p-2">
            <div className="absolute inset-0 rounded-full border border-dashed border-accent/10 animate-[spin_60s_linear_infinite]" />
            <div className="w-full h-full rounded-full bg-accent/[0.005] flex flex-col items-center justify-center">
              <span className="font-mono text-[10px] text-accent/15 font-semibold tracking-wider">JC.INIT()</span>
              <span className="font-mono text-[7px] text-muted/15 mt-0.5 uppercase tracking-widest">[SYSTEMS_ENG]</span>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="font-mono text-[8px] text-muted/30 border-t border-border/10 pt-4 space-y-1">
          <p className="flex justify-between">
            <span>[DEV_ID]</span>
            <span>JCCC_UNAB_2026</span>
          </p>
          <p className="flex justify-between">
            <span>[STATUS]</span>
            <span className="text-accent/30">[DECORATIVE_CORE]</span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="skills-header-reveal mb-16 sm:mb-20">
          <span className="label-caps mb-4 block tracking-[0.15em] text-accent">CAPABILITIES</span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-text">
            Skills & Technological Stack
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-6">
              
              {/* Category Header */}
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest border-b border-border/60 pb-3 flex items-center justify-between">
                <span>{group.id} / {group.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </h3>

              {/* Cards Container */}
              <div className="space-y-4">
                {group.skills.map((skill, index) => {
                  const isLearning = skill.level.toLowerCase() === "learning";
                  return (
                    <div
                      key={`${group.id}-skill-${index}`}
                      className="skill-card card-premium flex flex-col justify-between min-h-[140px] p-5 sm:p-6"
                    >
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-text mb-2">
                          {skill.title}
                        </h4>
                        <p className="text-[#C8C8DC] text-xs leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                      
                      {/* Card Metadata Footer */}
                      <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
                        <span className={`font-mono text-[9px] uppercase tracking-widest ${
                          isLearning ? "text-accent font-medium" : "text-muted"
                        }`}>
                          {skill.level}
                        </span>
                        <span className="text-[10px] text-accent/80 font-mono tracking-wider font-semibold">
                          {skill.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
