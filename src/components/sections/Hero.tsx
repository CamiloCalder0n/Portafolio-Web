"use client";

import React, { useRef } from "react";
import SplitText from "../ui/SplitText";
import { useHeroAnimation } from "../animations/useHeroAnimation";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Revelaciones cinemáticas con GSAP y Scramble ASCII al cargar
  useHeroAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      id="hero"
      data-scene="hero"
      className="min-h-screen w-full flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden"
      aria-label="Introduction Section"
      style={{ background: "transparent" }}
    >
      {/* PFD L1: Efecto vignette sutil para proteger la legibilidad del texto sobre el lienzo ASCII 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,8,0.55) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full text-center relative z-20 flex flex-col items-center justify-center pointer-events-none">

        {/* Etiqueta superior en mayúsculas estilo PFD L2 */}
        <span className="label-caps mb-6 text-xs sm:text-sm text-accent tracking-[0.15em] opacity-90 block pointer-events-auto select-none">
          SYSTEMS ENGINEERING STUDENT — UNAB
        </span>

        {/* Nombre principal en Syne Display con animación Scramble ASCII */}
        <h1
          className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight text-text leading-tight mb-8 pointer-events-auto"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          <SplitText
            text="Juan Camilo Calderón"
            type="chars"
            className="block"
          />
        </h1>

        {/* Tagline de proceso en estilo editorial */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-muted max-w-[600px] mx-auto text-center font-normal leading-relaxed mb-12 pointer-events-auto"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          <SplitText
            text="Crafting high-performance full-stack systems and immersive 3D digital experiences."
            type="words"
          />
        </p>

        {/* Controles CTAs magnéticos interactivos de alta fricción reducida */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto pointer-events-auto">

          <MagneticButton
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-lg bg-accent text-white font-medium text-sm tracking-wide shadow-lg shadow-accent/15 hover:shadow-accent/35 hover:bg-opacity-90 active:scale-95 transition-[box-shadow,background,opacity] duration-300 flex items-center justify-center border border-accent cursor-pointer"
          >
            Explore Projects
          </MagneticButton>

          <MagneticButton
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border bg-card/60 text-text font-medium text-sm tracking-wide hover:border-accent hover:text-white active:scale-95 transition-[border-color,color,background] duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer"
          >
            Get In Touch
          </MagneticButton>

        </div>
      </div>

      {/* Degradado inferior para suavizar la transición con la sección About */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg2 to-transparent pointer-events-none z-10" />
    </section>
  );
}
