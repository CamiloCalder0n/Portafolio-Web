"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  type: "about" | "experience"
) {
  useEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Build a scoped GSAP context so everything registers cleanly and cleans up on unmount
    const ctx = gsap.context(() => {
      if (type === "about") {

        // Left text container clipped from the bottom (revealing top-to-bottom)
        gsap.set(".about-text-container", {
          clipPath: "inset(0% 0% 100% 0%)",
        });

        // Right photo container clipped from the top (revealing bottom-to-top)
        gsap.set(".about-photo-container", {
          clipPath: "inset(100% 0% 0% 0%)",
        });

        // Left Column Text Reveal (top-to-bottom clipPath, no scrub, no pin, once: true)
        gsap.to(".about-text-container", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text-container",
            start: "top 80%",
            once: true,
            scrub: false,
          },
        });

        // Right Column Photo Reveal (bottom-to-top clipPath, no scrub, no pin, once: true)
        gsap.to(".about-photo-container", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-photo-container",
            start: "top 80%",
            once: true,
            scrub: false,
          },
        });

      } else if (type === "experience") {

        // Editorial header reveal (line-mask style: rise + fade).
        gsap.from(".experience-header-reveal", {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "jc.soft",
          scrollTrigger: {
            trigger: ".experience-header-reveal",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Timeline progress fill — the accent line grows as the section scrolls
        // through the viewport (scrubbed, no pin → no stacking, no overlap).
        gsap.fromTo(
          ".experience-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-timeline",
              start: "top 65%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );

        // Each milestone rises + fades into place on scroll. Same path on every
        // breakpoint — clean editorial flow with no horizontal scroll.
        const items = gsap.utils.toArray<HTMLElement>(".milestone-item");
        items.forEach((item) => {
          gsap.from(item, {
            y: 32,
            opacity: 0,
            duration: 1,
            ease: "jc.soft",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

      }
    }, containerRef);

    // Clean up on component unmount to prevent leaks and strict double mounts
    return () => ctx.revert();
  }, [containerRef, type]);
}
