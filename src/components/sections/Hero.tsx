"use client";

import React, { useRef } from "react";
import { useHeroAnimation } from "../animations/useHeroAnimation";
import MagneticButton from "../ui/MagneticButton";
import { usePreloaderStore } from "@/store/usePreloaderStore";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isComplete = usePreloaderStore((s) => s.isComplete);

  // La entrada se dispara cuando la cortina del loader termina.
  useHeroAnimation(containerRef, isComplete);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      data-scene="hero"
      aria-label="Introduction"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        {/* Eyebrow / meta discreto */}
        <span className="hero-eyebrow label-caps block mb-8 text-accent/90">
          Juan Camilo Calderón — Full-Stack Developer &amp; UX/UI
        </span>

        {/* Titular editorial en serif, con acentos en cursiva */}
        <h1
          data-hero-display
          className="font-display font-light text-text max-w-[17ch]"
          style={{
            fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)",
            lineHeight: 1.14, // holgura para que la máscara no recorte descendentes/itálicas
            letterSpacing: "-0.02em",
          }}
        >
          I craft <span className="italic-accent">high-performance</span> systems
          and <span className="italic-accent">immersive</span> digital
          experiences.
        </h1>

        {/* Subtítulo editorial */}
        <p className="hero-sub mt-9 max-w-[52ch] text-lg sm:text-xl text-muted leading-relaxed">
          Systems engineering student at UNAB, Colombia. I care about the craft
          where good code and good design become the same thing.
        </p>

        {/* CTAs magnéticos */}
        <div className="hero-cta-row mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="px-7 py-3.5 rounded-full bg-accent text-white font-medium text-sm tracking-wide shadow-lg shadow-accent/15 hover:shadow-accent/30 transition-shadow duration-300 cursor-pointer"
          >
            View work →
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="px-7 py-3.5 rounded-full border border-border text-text font-medium text-sm tracking-wide hover:border-accent transition-colors duration-300 cursor-pointer"
          >
            Get in touch
          </MagneticButton>
        </div>
      </div>

      {/* Indicador de scroll discreto */}
      <span className="hero-sub absolute bottom-8 left-6 sm:left-12 md:left-24 label-caps text-muted/50">
        Scroll
      </span>
    </section>
  );
}
