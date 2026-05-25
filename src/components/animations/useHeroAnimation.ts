"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useHeroAnimation(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Configuración de estados iniciales para evitar parpadeos visuales
      gsap.set(".split-char", { display: "inline-block", y: 60, opacity: 0 });
      gsap.set(".split-word", { display: "inline-block", y: 30, opacity: 0 });
      gsap.set(".hero-cta", { y: 25, opacity: 0 });
      gsap.set(".label-caps", { y: -20, opacity: 0 });

      // 1. Desvelar etiqueta superior
      tl.to(".label-caps", {
        y: 0,
        opacity: 0.9,
        duration: 0.6,
        ease: "power2.out"
      });

      // 2. Efecto de Scramble ASCII + Revelación de caracteres del Nombre
      tl.to(".split-char", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "jc.smooth",
        stagger: 0.035,
        onStart: () => {
          const chars = document.querySelectorAll(".split-char");
          const ASCII_NOISE = '!@#$%^&*()░▒▓█▄▀■□▪▫';

          chars.forEach((char) => {
            const finalLetter = char.textContent || "";
            const obj = { val: 0 };
            
            // PFD L1: La oscilación de ruido ASCII a texto legible crea un bias cognitivo de alta complejidad técnica
            gsap.to(obj, {
              val: 1,
              duration: 1.1,
              ease: "power2.out",
              delay: Math.random() * 0.55,
              onUpdate: () => {
                if (obj.val < 0.75) {
                  char.textContent = ASCII_NOISE[Math.floor(Math.random() * ASCII_NOISE.length)];
                } else {
                  char.textContent = finalLetter;
                }
              }
            });
          });
        }
      }, "-=0.3");

      // 3. Revelación del subtítulo palabra por palabra
      tl.to(
        ".split-word",
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "jc.smooth",
          stagger: 0.04,
        },
        "-=0.55"
      );

      // 4. Botones interactivos magnéticos con deslizamiento suave
      tl.to(
        ".hero-cta",
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "jc.smooth",
          stagger: 0.1,
        },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
