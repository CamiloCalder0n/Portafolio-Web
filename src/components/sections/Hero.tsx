"use client";

import React, { useRef } from "react";
import SplitText from "../ui/SplitText";
import { useHeroAnimation } from "../animations/useHeroAnimation";

// Magnetic CTA — applies a subtle offset following mouse position
function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`hero-cta ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic GSAP timeline reveals on mount
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
      {/* Very subtle vignette so text stays legible over the 3D canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,8,0.55) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full text-center relative z-20 flex flex-col items-center justify-center pointer-events-none">

        {/* Uppercase status label */}
        <span className="label-caps mb-6 text-xs sm:text-sm text-accent tracking-[0.15em] opacity-90 block pointer-events-auto">
          SYSTEMS ENGINEERING STUDENT — UNAB
        </span>

        {/* Cinematic character-split name reveal */}
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

        {/* Word-split tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-muted max-w-[600px] mx-auto text-center font-normal leading-relaxed mb-12 pointer-events-auto"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          <SplitText
            text="Crafting high-performance full-stack systems and immersive 3D digital experiences."
            type="words"
          />
        </p>

        {/* Magnetic CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto pointer-events-auto">

          <MagneticButton
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-accent text-white font-medium text-sm tracking-wide shadow-lg shadow-accent/15 hover:shadow-accent/35 hover:bg-opacity-90 active:scale-95 transition-[box-shadow,background,opacity] duration-300 flex items-center justify-center border border-accent"
          >
            Explore Projects
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border bg-card/60 text-text font-medium text-sm tracking-wide hover:border-accent hover:text-white active:scale-95 transition-[border-color,color,background] duration-300 flex items-center justify-center backdrop-blur-sm"
          >
            Get In Touch
          </MagneticButton>

        </div>
      </div>

      {/* Bottom fade — transitions into About section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg2 to-transparent pointer-events-none z-10" />
    </section>
  );
}
