'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { AsciiRenderer } from '@react-three/drei'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float u_time;
  uniform float u_progress;  // 0.0 = hero, 1.0 = contact
  uniform vec2 u_mouse;      // -1 to 1
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Stefan Gustavson's 2D Simplex Noise
  vec3 permute(vec3 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // (0.5*(sqrt(3.0)-1.0))
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx) ;
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0) )
          + i.x + vec3(0.0, i1.x, 1.0) );
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0 ;
    vec3 h = abs(x) - 0.5 ;
    vec3 a0 = x - floor(x + 0.5) ;
    vec3 g = a0*vec3(x0.x, x12.x, x12.z) + h*vec3(x0.y, x12.y, x12.w);
    vec3 t = vec3(1.79284291400159) - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 p0 = a0*t;
    vec3 p1 = h*t;
    vec3 g0 = p0*vec3(x0.x, x12.x, x12.z) + p1*vec3(x0.y, x12.y, x12.w);
    return 130.0 * dot(m, g0);
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = u_mouse * 0.1;
    
    // === ESTADO 0: HERO — partículas dispersas ===
    float hero_noise = snoise(uv * 4.0 + u_time * 0.1 + mouse);
    float hero_dots = step(0.85, hero_noise);
    vec3 hero_color = vec3(0.247, 0.258, 0.945) * hero_dots * 0.3;
    
    // === ESTADO 1: ABOUT — flow field orgánico ===
    float about_noise = snoise(uv * 2.0 + u_time * 0.15 + mouse * 2.0);
    about_noise += snoise(uv * 4.0 - u_time * 0.08) * 0.5;
    float about_field = smoothstep(0.0, 0.5, about_noise);
    vec3 about_color = vec3(0.247, 0.258, 0.945) * about_field * 0.2;
    
    // === ESTADO 2: SKILLS — hexagonal grid ===
    vec2 hex_uv = uv * 8.0;
    float hex = snoise(hex_uv + u_time * 0.05);
    float hex_grid = step(0.7, abs(hex));
    vec3 skills_color = vec3(0.247, 0.258, 0.945) * hex_grid * 0.25;
    
    // === ESTADO 3: PROJECTS — líneas de perspectiva ===
    vec2 persp_uv = uv - vec2(0.5);
    float angle = atan(persp_uv.y, persp_uv.x);
    float dist = length(persp_uv);
    float lines = step(0.02, mod(angle + u_time * 0.02, 0.3));
    vec3 projects_color = vec3(0.247, 0.258, 0.945) * lines * (1.0 - dist) * 0.3;
    
    // === ESTADO 4: EXPERIENCE — espiral ascendente ===
    vec2 spiral_uv = uv * 3.0 - vec2(1.5);
    float spiral_angle = atan(spiral_uv.y, spiral_uv.x);
    float spiral_r = length(spiral_uv);
    float spiral = snoise(vec2(spiral_r * 3.0 - u_time * 0.2, spiral_angle));
    vec3 experience_color = vec3(0.247, 0.258, 0.945) * step(0.6, spiral) * 0.35;
    
    // === CONTACT — igual que hero pero más brillante ===
    vec3 contact_color = hero_color * 1.5;
    
    // === MEZCLAR SEGÚN PROGRESO ===
    vec3 final_color = hero_color;
    
    if (u_progress < 0.2) {
      float t = u_progress / 0.2;
      final_color = mix(hero_color, about_color, smoothstep(0.0, 1.0, t));
    } else if (u_progress < 0.4) {
      float t = (u_progress - 0.2) / 0.2;
      final_color = mix(about_color, skills_color, smoothstep(0.0, 1.0, t));
    } else if (u_progress < 0.6) {
      float t = (u_progress - 0.4) / 0.2;
      final_color = mix(skills_color, projects_color, smoothstep(0.0, 1.0, t));
    } else if (u_progress < 0.8) {
      float t = (u_progress - 0.6) / 0.2;
      final_color = mix(projects_color, experience_color, smoothstep(0.0, 1.0, t));
    } else {
      float t = (u_progress - 0.8) / 0.2;
      final_color = mix(experience_color, contact_color, smoothstep(0.0, 1.0, t));
    }
    
    // Base dark background integrated matching --color-base #050508
    gl_FragColor = vec4(vec3(0.0196, 0.0196, 0.0314) + final_color, 1.0);
  }
`

function ShaderBackground({ reducedMotion, isRendering }: { reducedMotion: boolean; isRendering: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const heroRef = useRef<THREE.Mesh>(null)
  
  const mouse = useRef({ x: 0, y: 0 })
  const scrollProgress = useRef(0)
  
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  const viewport = useThree((state) => state.viewport)
  const { width, height } = viewport
  const size = useThree((state) => state.size)

  // Escuchar scroll
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once at start
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  // Escuchar mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize to -1 → 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_progress: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), [])

  // Sync resolution when window resizes
  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height)
  }, [size, uniforms])

  useFrame((state, delta) => {
    if (!isRendering) return

    uniforms.u_time.value += delta
    uniforms.u_progress.value = THREE.MathUtils.lerp(
      uniforms.u_progress.value,
      scrollProgress.current,
      delta * 2 // suave, ~0.5s de lag
    )
    uniforms.u_mouse.value.x = THREE.MathUtils.lerp(
      uniforms.u_mouse.value.x, mouse.current.x, delta * 3
    )
    uniforms.u_mouse.value.y = THREE.MathUtils.lerp(
      uniforms.u_mouse.value.y, mouse.current.y, delta * 3
    )

    // Parallax values for signature icosahedron
    targetRot.current.x = mouse.current.y * 0.25
    targetRot.current.y = mouse.current.x * 0.35

    currentRot.current.x = THREE.MathUtils.lerp(
      currentRot.current.x, targetRot.current.x, delta * 4
    )
    currentRot.current.y = THREE.MathUtils.lerp(
      currentRot.current.y, targetRot.current.y, delta * 4
    )

    // Update signature icosahedron Mesh
    if (heroRef.current) {
      const p = uniforms.u_progress.value
      let opacity = 0
      let scale = 1.0

      if (p < 0.2) {
        opacity = (1.0 - (p / 0.2)) * 0.65
      } else if (p > 0.8) {
        const t = (p - 0.8) / 0.2
        opacity = t * 0.85
        scale = 1.0 + t * 0.15
      }

      const mat = heroRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = reducedMotion ? (p < 0.5 ? 0.65 : 0) : opacity
      heroRef.current.visible = mat.opacity > 0.001
      heroRef.current.scale.setScalar(scale)

      if (!reducedMotion) {
        // Base auto-rotation
        heroRef.current.rotation.y += delta * 0.25
        heroRef.current.rotation.x += delta * 0.08

        // Add cursor parallax on top
        heroRef.current.rotation.y += currentRot.current.y * 0.08
        heroRef.current.rotation.x += currentRot.current.x * 0.05
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />

      {/* Fullscreen GLSL Plane background */}
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      {/* Floating signature icosahedron wireframe, right side */}
      <mesh ref={heroRef} position={[3.5, -0.5, 0]}>
        <icosahedronGeometry args={[3.8, 1]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export default function GlobalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    // 1. Detect reduced motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)

    // 2. Listen to tab visibility changes
    const handleVisibility = () => {
      setIsRendering(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // 3. content-visibility auto state change optimization
    const el = containerRef.current
    if (el) {
      const handleStateChange = (e: Event) => {
        const skipped = (e as Event & { skipped?: boolean }).skipped ?? false
        setIsRendering(!skipped)
      }
      el.addEventListener('contentvisibilityautostatechange', handleStateChange)
      
      // Fallback IntersectionObserver for older browsers
      if (!('contentVisibility' in document.documentElement.style)) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setIsRendering(entry.isIntersecting)
          })
        }, { rootMargin: '200px' })
        observer.observe(el)
        return () => {
          media.removeEventListener('change', syncMotion)
          document.removeEventListener('visibilitychange', handleVisibility)
          el.removeEventListener('contentvisibilityautostatechange', handleStateChange)
          observer.disconnect()
        }
      }

      return () => {
        media.removeEventListener('change', syncMotion)
        document.removeEventListener('visibilitychange', handleVisibility)
        el.removeEventListener('contentvisibilityautostatechange', handleStateChange)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto none auto 100vh',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 10], fov: 55 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ShaderBackground reducedMotion={reducedMotion} isRendering={isRendering} />
          {/* PFD L1: Sombreador ASCII en tiempo real para un impacto visual único de 50ms */}
          {!reducedMotion && (
            <AsciiRenderer 
              characters=" .:-=+*#%@█▓▒░"
              fgColor="#6366F1"
              bgColor="transparent"
              invert={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}