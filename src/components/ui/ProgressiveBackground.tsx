/**
 * Fondo CSS estático — FALLBACK del `MeshGradient` WebGL.
 *
 * Se ve cuando el Canvas no se monta: `prefers-reduced-motion` o sin WebGL.
 * Cuando el mesh gradient está activo, su Canvas (opaco, mismo `-z-10` pero más
 * abajo en el DOM) lo cubre. Vive en `fixed -z-10`; el body es transparente
 * (fondo en `html`) → se ve a través de todo. Near-black índigo tasteful +
 * grano sutil. Texto AA intacto.
 */

const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/>` +
      `<feColorMatrix type="saturate" values="0"/></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );

export default function ProgressiveBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#06060e" }}
    >
      {/* Gradiente índigo suave desde arriba. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 0%, #15122c 0%, #06060e 65%)",
        }}
      />

      {/* Grano sutil — textura, no malla. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundRepeat: "repeat",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
