"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TECH_CATEGORIES } from "@/lib/techstack";
import type { TechCategory } from "@/lib/techstack";

function CategoryCard({ category }: { category: TechCategory }) {
  return (
    <article
      data-card
      className="group border border-border/60 bg-card/30 rounded-2xl p-6 sm:p-8
                 hover:-translate-y-0.5 hover:border-accent/40
                 transition-[transform,border-color] duration-300 ease-out
                 cursor-default"
    >
      {/* Category label */}
      <p className="label-caps text-muted/70 mb-4">{category.label}</p>

      {/* Blurb */}
      <p className="font-display text-base text-muted leading-relaxed max-w-xs mb-7">
        {category.blurb}
      </p>

      {/* Tech list */}
      <ul
        className="flex flex-wrap gap-x-5 gap-y-3"
        aria-label={`${category.label} technologies`}
      >
        {category.techs.map(({ name, Icon }) => (
          <li
            key={name}
            className="flex items-center gap-2 text-sm text-muted/60
                       group-hover:text-muted/80 transition-colors duration-300"
          >
            {Icon && (
              <Icon
                className="h-4 w-4 shrink-0 text-muted/40 transition-colors duration-300 group-hover:text-muted/60"
                aria-hidden="true"
              />
            )}
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-reveal], [data-card]", { opacity: 1, y: 0 });
        return;
      }

      // Header reveals
      gsap.set("[data-reveal]", { opacity: 0, y: 20 });
      gsap.to("[data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "jc.soft",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Card reveals — staggered batch
      const cards = sectionRef.current?.querySelectorAll("[data-card]");
      if (cards && cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 32 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (els) => {
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "jc.soft",
              stagger: 0.12,
            });
          },
        });
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-scene="skills"
      className="section-pad px-6 sm:px-12 md:px-24 cursor-default"
      aria-label="TechStack"
    >
      {/* Header editorial */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
        <header>
          <span data-reveal className="label-caps block mb-5">
            Capabilities
          </span>
          <h2 data-reveal className="text-display text-text">
            Tech<span className="italic-accent">Stack</span>
          </h2>
        </header>
      </div>

      {/* Category cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {TECH_CATEGORIES.map((category) => (
          <CategoryCard key={category.label} category={category} />
        ))}
      </div>
    </section>
  );
}
