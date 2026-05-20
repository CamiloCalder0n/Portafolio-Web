"use client";

import React, { useRef } from "react";
import SplitText from "../ui/SplitText";
import { useHeroAnimation } from "../animations/useHeroAnimation";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Activate cinematic GSAP timeline reveals on mount
  useHeroAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen w-full flex items-center justify-center bg-base px-6 sm:px-12 md:px-24 relative overflow-hidden z-10"
      aria-label="Introduction Section"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-20 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Uppercase premium label highlighting student and profile status */}
        <span className="label-caps mb-6 text-xs sm:text-sm text-accent tracking-[0.15em] opacity-90 block pointer-events-auto">
          SYSTEMS ENGINEERING STUDENT — UNAB
        </span>

        {/* Cinematic character-split title reveal */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight text-text leading-tight mb-8 pointer-events-auto">
          <SplitText
            text="Juan Camilo Calderón"
            type="chars"
            className="block"
          />
        </h1>

        {/* Word-split tagline: exactly 10 words, styled with max-w-[600px], text-center and text-balance */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-[600px] mx-auto text-center text-balance font-normal leading-relaxed mb-12 pointer-events-auto">
          <SplitText
            text="Crafting high-performance full-stack systems and immersive 3D digital experiences."
            type="words"
          />
        </p>

        {/* Action groups with interactive button states */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto pointer-events-auto">
          
          {/* Primary Accent Button */}
          <a
            href="#projects"
            className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-lg bg-accent text-white font-medium text-sm tracking-wide shadow-lg shadow-accent/15 hover:shadow-accent/30 hover:bg-opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center border border-accent"
          >
            Explore Projects
          </a>

          {/* Secondary Border Button */}
          <a
            href="#contact"
            className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border bg-card text-text font-medium text-sm tracking-wide hover:border-accent hover:text-white transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center"
          >
            Get In Touch
          </a>
          
        </div>

      </div>

      {/* Decorative cybernetic bottom grid overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg2 to-transparent pointer-events-none z-10" />
    </section>
  );
}
