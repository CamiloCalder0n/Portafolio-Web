"use client";

import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  type: "about" | "skills" | "projects" | "experience"
) {
  useEffect(() => {
    if (!containerRef.current) return;

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
          duration: 1.4,
          ease: "power4.out",
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
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-photo-container",
            start: "top 80%",
            once: true,
            scrub: false,
          },
        });

      } else if (type === "skills") {
        
        // Initial States
        gsap.set(".skill-card", {
          opacity: 0,
          y: 35,
        });

        // Section Header Reveal
        gsap.from(".skills-header-reveal", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header-reveal",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Staggered Skill Cards Stagger (using High-Performance ScrollTrigger Batching)
        ScrollTrigger.batch(".skill-card", {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              opacity: 0,
              y: 35,
              duration: 0.4,
              ease: "power3.in",
              overwrite: "auto",
            });
          },
        });

      } else if (type === "projects") {
        
        // Initial States
        gsap.set(".project-card", {
          opacity: 0,
          y: 45,
        });

        // Section Header Reveal
        gsap.from(".projects-header-reveal", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header-reveal",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // High-Performance batch reveals for Projects Cards
        ScrollTrigger.batch(".project-card", {
          start: "top 85%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              opacity: 0,
              y: 45,
              duration: 0.4,
              ease: "power3.in",
              overwrite: "auto",
            });
          },
        });

      } else if (type === "experience") {
        
        // Section Header Reveal
        gsap.from(".experience-header-reveal", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-header-reveal",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Growing timeline vertical line
        gsap.to(".timeline-line-grow", {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 25%",
            end: "bottom 70%",
            scrub: true,
          },
        });

        // 2. Animate each timeline dot and highlight active cores as line reaches them
        const dots = gsap.utils.toArray(".timeline-dot") as HTMLElement[];
        dots.forEach((dot) => {
          const innerDot = dot.querySelector(".timeline-dot-inner");
          if (innerDot) {
            gsap.to(innerDot, {
              opacity: 1,
              scrollTrigger: {
                trigger: dot,
                start: "top 68%",
                toggleActions: "play none none reverse",
              },
            });
          }
          
          gsap.to(dot, {
            borderColor: "var(--color-accent)",
            scrollTrigger: {
              trigger: dot,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // 3. Stagger and slide in content cards based on their direction
        const items = gsap.utils.toArray(".timeline-item") as HTMLElement[];
        items.forEach((item) => {
          const content = item.querySelector(".timeline-content");
          if (content) {
            const isLeft = item.classList.contains("sm:flex-row-reverse"); // Alternate class

            gsap.from(content, {
              x: isLeft ? -40 : 40,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });

      }
    }, containerRef);

    // Clean up on component unmount to prevent leaks and strict double mounts
    return () => ctx.revert();
  }, [containerRef, type]);
}
