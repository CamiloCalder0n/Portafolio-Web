"use client";

import MeshGradient from "./MeshGradient";

/**
 * Canvas global — monta el fondo "mesh gradient" animado (`MeshGradient`),
 * el estándar tipo Stripe / GSAP showcase: campos de color oscuros que fluyen
 * suave y progresan con el scroll, detrás de todo el contenido (transparente).
 *
 * `MeshGradient` no se monta bajo `prefers-reduced-motion` → cae al fondo CSS
 * estático (`ProgressiveBackground`). `ThreeWrapper` sigue inicializando Lenis.
 */
export default function GlobalCanvas() {
  return <MeshGradient />;
}
