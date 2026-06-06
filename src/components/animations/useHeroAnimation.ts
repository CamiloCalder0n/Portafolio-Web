"use client";

import { useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

const TARGETS = [".hero-eyebrow", ".hero-sub", ".hero-cta-row"];

/**
 * Entrada editorial del Hero.
 *
 * Para evitar el "doble reveal" (verse completo durante la persiana y luego
 * re-animarse), el contenido se OCULTA al montar (mientras el loader/slats
 * tapan todo) y se revela UNA sola vez cuando `start` (preloader terminado).
 *
 * - Titular: reveal por máscara de línea (SplitText lines + mask).
 * - Parallax sutil del titular al scrollear.
 * - prefers-reduced-motion → todo visible, sin animación.
 */
export function useHeroAnimation(
  ref: React.RefObject<HTMLElement | null>,
  start: boolean
) {
  // 1) Ocultar al montar (el Hero está detrás del loader → sin flash visible).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(TARGETS, { opacity: 0, y: 24 });
      gsap.set("[data-hero-display]", { opacity: 0 });
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  // 2) Revelar una sola vez al terminar el loader.
  useEffect(() => {
    const root = ref.current;
    if (!root || !start) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const display = root.querySelector<HTMLElement>("[data-hero-display]");

      if (reduce) {
        gsap.set([...TARGETS, "[data-hero-display]"], { opacity: 1, y: 0 });
        return;
      }

      // Split + ocultar líneas ANTES de mostrar el titular (evita parpadeo).
      const split = display
        ? SplitText.create(display, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
          })
        : null;
      if (split) gsap.set(split.lines, { yPercent: 110 });
      gsap.set("[data-hero-display]", { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
      if (split) {
        tl.to(split.lines, { yPercent: 0, duration: 1.0, stagger: 0.09 }, "-=0.3");
      }
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
      tl.to(".hero-cta-row", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");

      if (display) {
        gsap.to(display, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [ref, start]);
}
