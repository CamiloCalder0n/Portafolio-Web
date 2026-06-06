"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

/**
 * Selected Work — índice editorial minimalista.
 *
 * Lista vertical numerada: sin portadas, sin paneles colapsables, sin pin.
 * Cada fila es un bloque completo clickeable (link externo o div inerte).
 * Hover: color de título muted→text, flecha nudge translate-x-1, leve
 * desplazamiento del bloque de título (≤6px). Solo color + transform, cero
 * layout shift.
 *
 * Reveal de entrada: stagger rise+fade por fila vía ScrollTrigger (once).
 * prefers-reduced-motion: elementos estáticos y visibles desde el inicio.
 * Mobile: mismo índice, responsive natural, 0 scroll-x.
 */

// ─── Sub-componente de fila ───────────────────────────────────────────────────

interface WorkRowProps {
  project: Project;
  rowRef: (el: HTMLLIElement | null) => void;
}

function WorkRow({ project, rowRef }: WorkRowProps) {
  const hasHref = Boolean(project.href);
  const ariaLabel = `${project.title} — ${project.role}, ${project.year}`;

  // Contenido interno de cada fila.
  // group-hover clases controlan los estados de color y transform via Tailwind.
  const inner = (
    <span className="flex w-full items-center justify-between gap-4 sm:gap-8 md:gap-12">
      {/* Número + título */}
      <span className="flex items-baseline gap-4 sm:gap-6 min-w-0">
        <span
          aria-hidden
          className="
            font-mono text-[11px] uppercase tracking-[0.08em]
            text-muted/70 shrink-0 select-none
            transition-colors duration-300 ease-out
            group-hover:text-accent
          "
        >
          {project.id}
        </span>

        {/* Título: muted en reposo, text en hover + leve nudge derecho */}
        <span
          className="
            font-display font-light leading-[1.05] tracking-[-0.03em]
            text-[clamp(1.8rem,4vw,3rem)]
            text-text/65
            transition-[color,transform] duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:text-text group-hover:translate-x-[6px]
            block min-w-0
          "
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {project.title}
        </span>
      </span>

      {/* Meta: año · rol + flecha */}
      <span className="flex items-center gap-3 shrink-0">
        <span
          className="
            hidden sm:block
            font-mono text-[11px] uppercase tracking-[0.08em]
            text-muted/50
            transition-colors duration-300 ease-out
            group-hover:text-muted/70
          "
        >
          {project.year}&nbsp;·&nbsp;{project.role}
        </span>

        {/* Flecha discreta: nudge derecho en hover */}
        <span
          aria-hidden
          className="
            font-mono text-[13px] text-muted/60
            transition-[color,transform] duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:text-accent group-hover:translate-x-1
            select-none
          "
        >
          →
        </span>
      </span>
    </span>
  );

  // Clases compartidas de la fila clickeable.
  const rowClass =
    "group relative block w-full py-7 sm:py-9 text-left outline-none " +
    "border-t border-border/50 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <li ref={rowRef} className="list-none">
      {hasHref ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ariaLabel} (opens in a new tab)`}
          className={rowClass}
        >
          {inner}
        </a>
      ) : (
        <div
          role="listitem"
          tabIndex={0}
          aria-label={ariaLabel}
          className={rowClass + " cursor-default"}
        >
          {inner}
        </div>
      )}
    </li>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Un ref por fila, indexado igual que projects[].
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  if (rowRefs.current.length !== projects.length) {
    rowRefs.current = new Array<HTMLLIElement | null>(projects.length).fill(null);
  }

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        // Sin animación: todo visible desde el inicio.
        gsap.set(rowRefs.current, { opacity: 1, y: 0 });
        return;
      }

      // Estado inicial: invisible y desplazado hacia abajo.
      gsap.set(rowRefs.current, { opacity: 0, y: 24 });

      // Reveal en stagger al entrar en viewport, disparado UNA vez.
      ScrollTrigger.batch(rowRefs.current, {
        onEnter(batch) {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "jc.soft",
            stagger: 0.1,
          });
        },
        start: "top 88%",
        once: true,
      });
    }, list);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-scene="projects"
      className="section-pad px-6 sm:px-12 md:px-24"
      aria-label="Selected Work"
    >
      <div className="mx-auto max-w-6xl">
        {/* Encabezado editorial */}
        <header className="mb-16 sm:mb-20">
          <span className="label-caps mb-4 block text-accent">Selected Work</span>
          <h2 className="text-display text-text">
            Selected <span className="italic-accent">work.</span>
          </h2>
        </header>

        {/* Índice editorial */}
        <ul ref={listRef} className="list-none p-0 m-0">
          {projects.map((project, i) => (
            <WorkRow
              key={project.id}
              project={project}
              rowRef={(el) => {
                rowRefs.current[i] = el;
              }}
            />
          ))}

          {/* Hairline de cierre bajo la última fila */}
          <li aria-hidden className="block h-px w-full bg-border/50" />
        </ul>
      </div>
    </section>
  );
}
