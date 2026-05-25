"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }

      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });

      // Loader staggers and wipe-up transition
      tl.to(loaderRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.inOut"
      })
      .to(wipeRef.current, {
        y: "-100%",
        duration: 0.7,
        ease: "power3.inOut"
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="page-transition fixed inset-0 z-[9999] pointer-events-none"
    >
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-base flex flex-col items-center justify-center pointer-events-auto"
        style={{ transform: "translateY(0%)" }}
      >
        <div ref={loaderRef} className="flex flex-col items-center gap-3">
          <span className="font-mono text-sm tracking-[0.25em] text-accent font-semibold">
            JC.INIT()
          </span>
          <span className="font-mono text-[9px] text-muted tracking-widest uppercase opacity-80">
            SYSTEMS ENGINEERING
          </span>
        </div>
      </div>
    </div>
  );
}
