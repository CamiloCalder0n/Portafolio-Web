'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { PerformanceMonitor } from '@react-three/drei'

// --- SHADERS FOR ORGANIC SPHERE ---

const sphereVertex = `
  uniform float u_time;
  uniform vec2  u_mouse;
  uniform float u_distort;
  varying vec3  vNormal;
  varying float vDistort;

  // Stefan Gustavson's 3D Simplex Noise (Ashima Arts)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return vec4(1.79284291400159) - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = vec3(1.0) - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;      // x3 = x0 - 1. + 3.0 * C.xxx

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = vec4(1.0) - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + vec4(1.0);
    vec4 s1 = floor(b1)*2.0 + vec4(1.0);
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normal;
    float t = u_time * 0.3;
    // noise waves surface displacement
    float n = snoise(position * 1.5 + vec3(t, t * 0.7, u_mouse.x));
    float n2 = snoise(position * 3.0 - vec3(t * 0.5, 0.0, 0.0));
    float distort = (n * 0.6 + n2 * 0.4) * u_distort;
    vDistort = distort;
    vec3 newPos = position + normal * distort;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`

const sphereFragment = `
  uniform float u_progress;
  varying vec3  vNormal;
  varying float vDistort;

  void main() {
    // cold base color that responds to displacement
    vec3 colA = vec3(0.29, 0.31, 0.55);   // cold blue-grey
    vec3 colB = vec3(0.39, 0.40, 0.95);   // indigo #6366F1
    vec3 col = mix(colA, colB, vDistort * 2.0 + 0.3);
    
    // elegant high-fidelity rim light
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    col += vec3(0.4, 0.45, 0.9) * pow(rim, 3.0) * 0.5;
    gl_FragColor = vec4(col, 0.9);
  }
`

// --- SHADERS FOR SUBTLE GRADIENT BACKGROUND ---

const bgVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const bgFragment = `
  uniform float u_time;
  uniform float u_progress;
  varying vec2 vUv;

  void main() {
    float d = distance(vUv, vec2(0.5));
    // slow breath pulsation
    float breath = sin(u_time * 0.3) * 0.05 + 0.95;
    float glow = smoothstep(0.8, 0.1, d) * breath;
    vec3 col = mix(vec3(0.02, 0.02, 0.04), vec3(0.08, 0.08, 0.16), u_progress);
    gl_FragColor = vec4(col * glow, glow * 0.4);
  }
`

// --- COMPONENTS ---

function SubtleBackground({ isRendering }: { isRendering: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const scrollProgress = useRef(0)

  const viewport = useThree((state) => state.viewport)
  const { width, height } = viewport

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_progress: { value: 0 },
  }), [])

  useFrame((state, delta) => {
    if (!isRendering) return
    uniforms.u_time.value += delta
    uniforms.u_progress.value = THREE.MathUtils.lerp(
      uniforms.u_progress.value,
      scrollProgress.current,
      delta * 2
    )
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        vertexShader={bgVertex}
        fragmentShader={bgFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function OrganicSphere({ isRendering }: { isRendering: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_progress: { value: 0 },
    u_distort: { value: 0.35 },
  }), [])

  useFrame((_state, delta) => {
    if (!isRendering) return

    uniforms.u_time.value += delta
    uniforms.u_mouse.value.x = THREE.MathUtils.lerp(uniforms.u_mouse.value.x, mouse.current.x, delta * 3)
    uniforms.u_mouse.value.y = THREE.MathUtils.lerp(uniforms.u_mouse.value.y, mouse.current.y, delta * 3)
    uniforms.u_progress.value = THREE.MathUtils.lerp(uniforms.u_progress.value, scroll.current, delta * 2)

    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, 2.5 + mouse.current.x * 0.3, delta * 2)
      
      // se aleja levemente en Z y escala sutilmente al scrollear
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -scroll.current * 4, delta * 2)
      const s = Math.max(1.2, 2.2 - scroll.current * 0.8)
      ref.current.scale.setScalar(s)
    }
  })

  return (
    <mesh ref={ref} position={[2.5, 0, 0]} scale={2.2}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={sphereVertex}
        fragmentShader={sphereFragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function GlobalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(true)
  const [dpr, setDpr] = useState(1.2)

  useEffect(() => {
    // Escuchar visibilidad del tab para ahorrar GPU/CPU
    const handleVisibility = () => {
      setIsRendering(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // content-visibility auto state change optimization
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
          document.removeEventListener('visibilitychange', handleVisibility)
          el.removeEventListener('contentvisibilityautostatechange', handleStateChange)
          observer.disconnect()
        }
      }

      return () => {
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
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1.0)}
          onIncline={() => setDpr(1.5)}
        >
          <Suspense fallback={null}>
            <SubtleBackground isRendering={isRendering} />
            <OrganicSphere isRendering={isRendering} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}