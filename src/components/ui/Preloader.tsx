"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloaderStore } from "@/store/usePreloaderStore";

/**
 * Loader editorial "saludo multiidioma".
 *
 * Los saludos cambian con un conveyor de dos capas: la palabra saliente se
 * desliza hacia arriba y se desvanece mientras la entrante sube desde abajo —
 * las dos a la vez, con curva suave (sin "pop" ni jank). Una hairline al borde
 * inferior marca el progreso. Al 100% sale como persiana (slats con stagger),
 * revelando el Hero detrás.
 *
 * prefers-reduced-motion → salta directo al sitio.
 */

// Saludos en escritura latina (el serif Newsreader los renderiza todos; evita tofu).
const GREETINGS = [
  "Hola",
  "Hello",
  "Bonjour",
  "Olá",
  "Ciao",
  "Hallo",
];

const SLAT_COUNT = 8;

export default function Preloader() {
  const complete = usePreloaderStore((s) => s.complete);

  const rootRef = useRef<HTMLDivElement>(null);
  const slotARef = useRef<HTMLSpanElement>(null);
  const slotBRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const slatsRef = useRef<HTMLDivElement>(null);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      complete();
      setHidden(true);
      return;
    }

    const slotA = slotARef.current;
    const slotB = slotBRef.current;
    if (!slotA || !slotB) return;

    const ctx = gsap.context(() => {
      // Masked slide de dos capas, SIN opacidad: la palabra siempre 100% sólida
      // (se nota nítida). La máscara `overflow:hidden` clipa lo que sale/entra.
      let current: HTMLSpanElement = slotA;
      gsap.set(slotA, { yPercent: 0 });
      gsap.set(slotB, { yPercent: 100 });
      slotA.textContent = GREETINGS[0];

      const T = 0.34; // transición crisp (front-loaded con expo.out)
      const swapTo = (text: string) => {
        const incoming = current === slotA ? slotB : slotA;
        const outgoing = current;
        incoming.textContent = text;
        gsap.set(incoming, { yPercent: 100 }); // justo debajo de la máscara
        // Saliente sube y sale por arriba; entrante sube a su lugar. A la vez.
        gsap.to(outgoing, { yPercent: -100, duration: T, ease: "expo.out" });
        gsap.to(incoming, { yPercent: 0, duration: T, ease: "expo.out" });
        current = incoming;
      };

      const progress = { value: 0 };
      const slats = slatsRef.current
        ? Array.from(slatsRef.current.children)
        : [];

      const tl = gsap.timeline();

      // Progreso 0 → 100 (hairline + porcentaje).
      const LOAD = 2.5;
      tl.to(progress, {
        value: 1,
        duration: LOAD,
        ease: "power1.inOut",
        onUpdate: () => {
          if (lineFillRef.current) {
            lineFillRef.current.style.transform = `scaleX(${progress.value})`;
          }
          if (pctRef.current) {
            pctRef.current.textContent = String(Math.round(progress.value * 100));
          }
        },
      });

      // Ciclo crisp: intervalo ~0.42s (hold ~0.08s tras la transición de 0.34s).
      // intervalo > T evita solapes. 5 cambios → 6 idiomas en ~2.5s.
      let cur = 0;
      const step = 0.42;
      const swaps = 5;
      tl.to(
        {},
        {
          duration: step,
          repeat: swaps,
          ease: "none",
          onRepeat: () => {
            cur = (cur + 1) % GREETINGS.length;
            swapTo(GREETINGS[cur]);
          },
        },
        0
      );

      // Respira un instante con el último saludo antes de salir.
      tl.to({}, { duration: 0.3 });

      // Desvanece el contenido (saludo + hairline) con un y leve, sin corte.
      tl.to(contentRef.current, {
        opacity: 0,
        y: -22,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // SALIDA "slats": persiana con curva tipo Apple y stagger en onda.
      tl.to(
        slats,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "jc.apple",
          stagger: { each: 0.06, ease: "power1.inOut" },
        },
        ">-0.35"
      );

      tl.add(() => complete(), ">-0.85");
      tl.add(() => setHidden(true));
    }, rootRef);

    return () => ctx.revert();
  }, [complete]);

  if (hidden) return null;

  const slotClass =
    "absolute inset-0 flex items-center justify-center font-display font-light leading-none text-text";
  const slotStyle: React.CSSProperties = { letterSpacing: "-0.02em" };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      aria-hidden="true"
    >
      {/* Persiana de slats: juntos forman el cover; suben en la salida. */}
      <div ref={slatsRef} className="absolute inset-0 flex">
        {Array.from({ length: SLAT_COUNT }).map((_, i) => (
          <div key={i} className="h-full flex-1 bg-base" />
        ))}
      </div>

      {/* Contenido (saludo + hairline) sobre la persiana; se desvanece junto. */}
      <div ref={contentRef} className="absolute inset-0 z-[1]">
        {/* Saludo: máscara con dos capas (conveyor). */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            className="relative overflow-hidden"
            style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)", height: "1.35em", width: "min(90vw, 720px)" }}
          >
            <span ref={slotARef} data-pl-word className={slotClass} style={slotStyle}>
              Hola
            </span>
            <span ref={slotBRef} className={slotClass} style={slotStyle} />
          </div>
        </div>

        {/* Hairline de progreso minimalista, a todo el ancho del borde inferior. */}
        <div className="absolute bottom-0 left-0 w-full">
          <span className="absolute bottom-3 right-5 font-mono text-[10px] tabular-nums tracking-[0.2em] text-muted/70">
            <span ref={pctRef}>0</span>
          </span>
          <div className="h-px w-full bg-text/10">
            <div
              ref={lineFillRef}
              className="h-full w-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
