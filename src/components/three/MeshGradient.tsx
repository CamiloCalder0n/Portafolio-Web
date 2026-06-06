"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import type { ShaderMaterial } from "three";

/**
 * Fondo "mesh gradient" animado — estándar tipo Stripe / GSAP showcase.
 *
 * Un quad fullscreen con un fragment shader que mezcla campos de color OSCUROS
 * grandes y suaves (deep indigo / azul / violeta) usando FBM de **baja
 * frecuencia** (formas amplias, NO grano) y una **modulación de malla**
 * sinusoidal sobre las UV ("tela líquida" de Stripe) → flujo orgánico lento.
 * `u_scroll` desplaza la paleta a lo largo de la página → el fondo "progresa".
 *
 * Perf: un solo quad, dpr capeado [1, 1.5], `PerformanceMonitor` baja el dpr si
 * caen los FPS, uniforms mutados en `useFrame` (sin setState). `frameloop`
 * always (un quad → barato). `prefers-reduced-motion` → NO se monta y cae al
 * fondo CSS estático (`ProgressiveBackground`). Texto AA (paleta de baja
 * luminancia).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_scroll;
  uniform float u_aspect;

  // Simplex noise 2D (Ashima / Gustavson, MIT).
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // FBM de baja frecuencia (3 octavas) → campos grandes y suaves.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 1.9;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= u_aspect;

    float t = u_time * 0.05; // movimiento lento (premium susurra)

    // Modulación de malla sinusoidal: desplaza las coords → flujo tipo "tela
    // líquida" de Stripe. Amplitud baja para suavidad.
    vec2 warp = vec2(
      sin(p.y * 1.7 + t)        * 0.14 + cos(p.x * 1.3 - t * 0.8) * 0.10,
      cos(p.x * 1.9 - t * 1.1)  * 0.14 + sin(p.y * 1.4 + t * 0.7) * 0.10
    );
    vec2 q = p + warp;

    // Dos campos FBM de baja frecuencia → blobs grandes y suaves.
    float f1 = fbm(q * 0.75 + vec2(t * 0.18, u_scroll * 0.55));
    float f2 = fbm(q * 0.95 + vec2(-t * 0.15, 4.0 - u_scroll * 0.45));
    f1 = f1 * 0.5 + 0.5;
    f2 = f2 * 0.5 + 0.5;

    // Paleta OSCURA (baja luminancia → texto AA). Mezcla limpia (mesh).
    vec3 c0 = vec3(0.024, 0.024, 0.055); // near-black índigo
    vec3 c1 = vec3(0.090, 0.075, 0.190); // deep indigo
    vec3 c2 = vec3(0.050, 0.085, 0.200); // deep blue
    vec3 c3 = vec3(0.120, 0.065, 0.190); // violeta

    vec3 col = c0;
    col = mix(col, c1, smoothstep(0.22, 0.85, f1));
    col = mix(col, c2, smoothstep(0.30, 0.92, f2) * 0.7);
    // Acento violeta que progresa con el scroll.
    col = mix(col, c3, smoothstep(0.45, 1.0, f1 * f2) * (0.25 + u_scroll * 0.45));

    // Lift muy suave hacia arriba (luz ambiental, sin vignette dura).
    col += vec3(0.018, 0.018, 0.040) * smoothstep(0.0, 1.0, uv.y) * 0.6;

    // Mantener oscuro (seguridad AA).
    col = clamp(col, 0.0, 0.22);

    // Grano micro (anti-banding).
    float g = fract(sin(dot(uv * vec2(1234.0, 5678.0) + u_time,
                            vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function MeshPlane() {
  const matRef = useRef<ShaderMaterial>(null);
  const viewport = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);
  const scrollRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_scroll: { value: 0 },
      u_aspect: { value: 1 },
    }),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.u_time.value = state.clock.elapsedTime;
    m.uniforms.u_scroll.value +=
      (scrollRef.current - m.uniforms.u_scroll.value) * 0.05;
    m.uniforms.u_aspect.value = size.width / size.height;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function MeshGradient() {
  const [enabled, setEnabled] = useState(false);
  const [maxDpr, setMaxDpr] = useState(1.5);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
      dpr={[1, maxDpr]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      frameloop="always"
      onCreated={({ gl }) => gl.setClearColor("#06060e", 1)}
    >
      <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
      <MeshPlane />
    </Canvas>
  );
}
