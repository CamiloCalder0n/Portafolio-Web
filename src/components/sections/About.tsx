"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../animations/useScrollReveal";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // ClipPath scroll reveals (texto top→bottom, foto bottom→top) — el look que gustó.
  useScrollReveal(sectionRef, "about");

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene="about"
      className="section-pad px-6 sm:px-12 md:px-24 relative overflow-hidden"
      aria-label="About Me Section"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">

          {/* IZQUIERDA (60%): título, copy y pills */}
          <div className="lg:col-span-6 space-y-8">
            <div
              className="about-text-container w-full"
              style={{ willChange: "transform, clip-path" }}
            >
              <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-text leading-[1.05] mb-8">
                About Me
              </h2>

              <div className="space-y-6 text-muted text-base sm:text-lg leading-relaxed">
                <p>
                  I am a Systems Engineering student at{" "}
                  <span className="text-accent font-normal">UNAB</span> in
                  Bucaramanga, Colombia. I build full-stack systems, but more than
                  just writing code, I care deeply about how things look and feel.
                  To me, software isn&apos;t just about making systems run—it&apos;s
                  about creating experiences that feel responsive, cohesive, and
                  completely natural.
                </p>
                <p>
                  I believe that{" "}
                  <span className="text-accent font-normal">
                    good code and good design are the same thing
                  </span>
                  . The structural engineering under the hood deserves the exact
                  same craftsmanship as fine typography and organic transitions on
                  the frontend. Connecting these two disciplines is what defines my
                  work.
                </p>
              </div>

              {/* Pills de meta */}
              <div className="pt-10 flex flex-wrap gap-3 font-mono text-[11px] sm:text-xs">
                <span className="border border-border/80 bg-card/40 rounded-full px-4 py-2 text-text shadow-sm">
                  UNAB · Bucaramanga
                </span>
                <span className="border border-border/80 bg-card/40 rounded-full px-4 py-2 text-text shadow-sm">
                  Full-Stack + UX/UI
                </span>
                <span className="border border-border/80 bg-card/40 rounded-full px-4 py-2 text-text shadow-sm">
                  Systems Engineering
                </span>
                <span className="border border-accent/20 bg-accent/5 rounded-full px-4 py-2 text-accent font-medium shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Open to work
                </span>
              </div>
            </div>
          </div>

          {/* DERECHA (40%): retrato real con el marco que gustó (borde + glow) */}
          <div className="lg:col-span-4 flex justify-center w-full">
            <div
              className="about-photo-container w-full max-w-sm"
              style={{ willChange: "transform, clip-path" }}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-[0_0_60px_rgba(99,102,241,0.15)] group transition-all duration-500 hover:border-accent/40">
                <Image
                  src="/portrait.png"
                  alt="Juan Camilo Calderón Calderón"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 384px"
                  priority={false}
                />
                {/* Degradado inferior para profundidad y legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-base/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
