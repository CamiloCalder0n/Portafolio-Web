import type { Project } from "@/lib/projects";

interface CoverArtProps {
  project: Project;
  className?: string;
}

/**
 * Inline SVG fractal-noise (feTurbulence) as a data URI. Tiny, repeating tile
 * used as a subtle grain so the gradient never reads as flat. CSS-only, no JS.
 */
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Stylized placeholder cover for a project. Pure CSS/SVG, server-renderable.
 * Editorial gradient + grain + faint radial highlight + serif title watermark.
 * Replaceable later by a real `image` without touching consumers.
 */
export default function CoverArt({ project, className }: CoverArtProps) {
  const { from, to } = project.cover;

  return (
    <div
      aria-hidden
      className={`relative w-full h-full overflow-hidden rounded-2xl border border-white/10 ${className ?? ""}`}
      style={{
        backgroundImage: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {/* Faint radial highlight for soft depth. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 22% 18%, rgba(232,232,245,0.16) 0%, rgba(232,232,245,0) 55%)",
        }}
      />

      {/* Subtle grain so the surface is never flat. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: NOISE_DATA_URI,
          backgroundSize: "140px 140px",
          opacity: 0.09,
          mixBlendMode: "overlay",
        }}
      />

      {/* Serif title watermark — solid white at low opacity, never gradient text. */}
      <div className="pointer-events-none absolute inset-0 flex items-center px-8">
        <span className="font-display text-white/[0.10] leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,9vw,5.5rem)]">
          {project.title}
        </span>
      </div>

      {/* Index — small mono in the top-left corner. */}
      <span className="pointer-events-none absolute left-5 top-5 font-mono text-xs tracking-widest text-white/40">
        {project.id}
      </span>
    </div>
  );
}
