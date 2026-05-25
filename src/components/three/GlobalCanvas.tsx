'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useSceneStore } from '@/lib/sceneStore'

function SceneBackground() {
  const scene = useSceneStore((s) => s.scene)
  const [reducedMotion, setReducedMotion] = useState(false)
  const { size } = useThree()

  // Refs for meshes
  const heroRef = useRef<THREE.Mesh>(null)
  const aboutRef = useRef<THREE.Points>(null)
  const skillsRef = useRef<THREE.LineSegments>(null)
  const projectsRef = useRef<THREE.LineSegments>(null)
  const experienceRef = useRef<THREE.Mesh>(null)

  // Mouse position ref — no re-renders, just raw values
  const mouse = useRef({ x: 0, y: 0 })
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  // Target opacities per scene
  const targets: Record<string, Record<string, number>> = {
    hero: { hero: 0.6, about: 0, skills: 0, projects: 0, experience: 0 },
    contact: { hero: 0.45, about: 0, skills: 0, projects: 0, experience: 0 },
    about: { hero: 0, about: 0.5, skills: 0, projects: 0, experience: 0 },
    skills: { hero: 0, about: 0, skills: 0.4, projects: 0, experience: 0 },
    projects: { hero: 0, about: 0, skills: 0, projects: 0.4, experience: 0 },
    experience: { hero: 0, about: 0, skills: 0, projects: 0, experience: 0.5 },
  }

  // Listen to mouse globally
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize to -1 → 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useFrame((_state, delta) => {
    const t = targets[scene] ?? targets.hero
    // Smooth but not instant — ~0.8s transition feel
    const speed = Math.min(delta * 3, 1)
    const lerp = (cur: number, tgt: number) =>
      reducedMotion ? tgt : THREE.MathUtils.lerp(cur, tgt, speed)

    // Update cursor-driven rotation targets (max 15deg tilt)
    targetRot.current.x = mouse.current.y * 0.25
    targetRot.current.y = mouse.current.x * 0.35

    // Smooth the cursor rotation itself
    currentRot.current.x = THREE.MathUtils.lerp(
      currentRot.current.x, targetRot.current.x, delta * 4
    )
    currentRot.current.y = THREE.MathUtils.lerp(
      currentRot.current.y, targetRot.current.y, delta * 4
    )

    // ① Hero icosahedron — slow base rotation + cursor parallax
    if (heroRef.current) {
      const mat = heroRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = lerp(mat.opacity, t.hero)
      heroRef.current.visible = mat.opacity > 0.001

      if (!reducedMotion) {
        // Base auto-rotation
        heroRef.current.rotation.y += delta * 0.25
        heroRef.current.rotation.x += delta * 0.08

        // Add cursor parallax on top (lerped for smoothness)
        heroRef.current.rotation.y += currentRot.current.y * 0.08
        heroRef.current.rotation.x += currentRot.current.x * 0.05
      }
    }

    // ② About scattered points — gentle drift
    if (aboutRef.current) {
      const mat = aboutRef.current.material as THREE.PointsMaterial
      mat.opacity = lerp(mat.opacity, t.about)
      aboutRef.current.visible = mat.opacity > 0.001
      if (!reducedMotion && mat.opacity > 0.01) {
        aboutRef.current.rotation.y += delta * 0.08
        aboutRef.current.rotation.x = currentRot.current.x * 0.15
      }
    }

    // ③ Skills grid — subtle cursor tilt
    if (skillsRef.current) {
      const mat = skillsRef.current.material as THREE.LineBasicMaterial
      mat.opacity = lerp(mat.opacity, t.skills)
      skillsRef.current.visible = mat.opacity > 0.001
      if (!reducedMotion && mat.opacity > 0.01) {
        skillsRef.current.rotation.x = THREE.MathUtils.lerp(
          skillsRef.current.rotation.x,
          currentRot.current.x * 0.2,
          delta * 3
        )
        skillsRef.current.rotation.y = THREE.MathUtils.lerp(
          skillsRef.current.rotation.y,
          currentRot.current.y * 0.2,
          delta * 3
        )
      }
    }

    // ④ Projects tilted grid
    if (projectsRef.current) {
      const mat = projectsRef.current.material as THREE.LineBasicMaterial
      mat.opacity = lerp(mat.opacity, t.projects)
      projectsRef.current.visible = mat.opacity > 0.001
      if (!reducedMotion) {
        projectsRef.current.rotation.x = THREE.MathUtils.lerp(
          projectsRef.current.rotation.x,
          -0.5 + currentRot.current.x * 0.1,
          delta * 2
        )
        projectsRef.current.rotation.y = THREE.MathUtils.lerp(
          projectsRef.current.rotation.y,
          currentRot.current.y * 0.15,
          delta * 2
        )
      }
    }

    // ⑤ Experience spiral
    if (experienceRef.current) {
      const mat = experienceRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = lerp(mat.opacity, t.experience)
      experienceRef.current.visible = mat.opacity > 0.001
      if (!reducedMotion && mat.opacity > 0.01) {
        experienceRef.current.rotation.y += delta * 0.3
        experienceRef.current.rotation.x = currentRot.current.x * 0.2
      }
    }
  })

  // About: scattered point cloud
  const aboutPositions = useMemo(() => new Float32Array(
    Array.from({ length: 180 }, () => [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
    ]).flat()
  ), [])

  // Skills + Projects: grid lines
  const gridPositions = useMemo(() => {
    const pos: number[] = []
    for (let i = -7; i <= 7; i++) {
      pos.push(-7, i, 0, 7, i, 0)
      pos.push(i, -7, 0, i, 7, 0)
    }
    return new Float32Array(pos)
  }, [])

  // Experience: CatmullRom spiral
  const spiralPoints = useMemo(() => Array.from({ length: 8 }, (_, i) =>
    new THREE.Vector3(
      Math.cos(i * 1.1) * 2.8,
      i * 1.3 - 4.5,
      Math.sin(i * 1.1) * 2.8
    )
  ), [])

  return (
    <>
      <ambientLight intensity={0.4} />

      {/* ① HERO + CONTACT — wireframe icosahedron, right side */}
      <mesh ref={heroRef} position={[3.5, -0.5, 0]}>
        <icosahedronGeometry args={[3.8, 1]} />
        <meshBasicMaterial
          color="#4A5568"
          wireframe
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>

      {/* ② ABOUT — scattered point cloud */}
      <points ref={aboutRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[aboutPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#6366F1"
          size={0.05}
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* ③ SKILLS — structured grid */}
      <lineSegments ref={skillsRef} visible={false} position={[0, 0, -2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[gridPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* ④ PROJECTS — tilted perspective grid */}
      <lineSegments ref={projectsRef} visible={false} position={[0, 0, -3]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[gridPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* ⑤ EXPERIENCE — spiral tube */}
      <mesh ref={experienceRef} visible={false} position={[1, 0, -1]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(spiralPoints),
          120, 0.025, 8, false
        ]} />
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export default function GlobalCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 10], fov: 55 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneBackground />
        </Suspense>
      </Canvas>
    </div>
  )
}