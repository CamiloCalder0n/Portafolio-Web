"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useHeroAnimation(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Create a scoped GSAP context to handle cleanups automatically (especially in React StrictMode)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Configure initial states to prevent visual flashes
      gsap.set(".split-char", { display: "inline-block", y: 70, opacity: 0 });
      gsap.set(".split-word", { display: "inline-block", y: 40, opacity: 0 });
      gsap.set(".hero-cta", { y: 25, opacity: 0 });

      // Stagger name character reveal
      tl.to(".split-char", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.03,
      });

      // Stagger tagline word reveal
      tl.to(
        ".split-word",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
        },
        "-=0.6" // overlapping start
      );

      // Slide up and fade in interactive buttons
      tl.to(
        ".hero-cta",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.5"
      );

    }, containerRef);

    // Clean up on component unmount
    return () => ctx.revert();
  }, [containerRef]);
}
