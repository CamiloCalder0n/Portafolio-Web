"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger custom top-to-bottom / bottom-to-top clipPath scroll reveals
  useScrollReveal(sectionRef, "about");

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene="about"
      className="py-[120px] px-6 sm:px-12 md:px-24 bg-bg2/80 relative border-t border-border overflow-hidden"
      aria-label="About Me Section"
    >
      {/* Subtle background tech lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_100%] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
          
          {/* LEFT SIDE (60%): Header, Personal Copy, and Stat Pills */}
          <div className="lg:col-span-6 space-y-8">
            <div className="about-text-container w-full" style={{ willChange: "transform, clip-path" }}>
              
              <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-text leading-tight mb-8">
                About Me
              </h2>

              <div className="space-y-6 text-muted text-base sm:text-lg leading-relaxed">
                <p>
                  I am a Systems Engineering student at <span className="text-accent font-normal">UNAB</span> in Bucaramanga, Colombia. I build full-stack systems, but more than just writing code, I care deeply about how things look and feel. To me, software isn&apos;t just about making systems run—it&apos;s about creating experiences that feel responsive, cohesive, and completely natural.
                </p>
                <p>
                  I believe that <span className="text-accent font-normal">good code and good design are the same thing</span>. The structural engineering under the hood deserves the exact same craftsmanship as fine typography and organic transitions on the frontend. Connecting these two disciplines is what defines my work.
                </p>
              </div>

              {/* Row of 4 Stat Pills */}
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

          {/* RIGHT SIDE (40%): Balanced Photo Placeholder */}
          <div className="lg:col-span-4 flex justify-center w-full">
            <div 
              className="about-photo-container w-full max-w-sm" 
              style={{ willChange: "transform, clip-path" }}
            >
              <div className="relative w-full aspect-[3/4] bg-card border border-border rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 shadow-[0_0_60px_rgba(99,102,241,0.15)] group transition-all duration-500 hover:border-accent/40">
                {/* Visual grid overlay for tech vibe */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Photo text */}
                <span className="font-mono text-xs sm:text-sm text-muted uppercase tracking-[0.2em] group-hover:text-accent transition-colors duration-300">
                  [ photo ]
                </span>

                {/* Sub-label indicators */}
                <div className="absolute bottom-6 left-6 font-mono text-[9px] text-muted/40 uppercase tracking-widest">
                  PORTRAIT_PLACEHOLDER
                </div>
                <div className="absolute top-6 right-6 font-mono text-[9px] text-accent/50 uppercase tracking-widest">
                  3:4_RATIO
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
