'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useSceneStore } from '@/lib/sceneStore'

// One mesh per scene — all mounted, only one visible
function SceneBackground() {
  const scene = useSceneStore((s) => s.scene)
  const [reducedMotion, setReducedMotion] = useState(false)
  
  // Refs for all meshes — direct mutation, no setState
  const heroRef = useRef<THREE.Mesh>(null)
  const aboutRef = useRef<THREE.Points>(null)
  const skillsRef = useRef<THREE.LineSegments>(null)
  const projectsRef = useRef<THREE.LineSegments>(null)
  const experienceRef = useRef<THREE.Mesh>(null)

  // Target opacities per scene
  const targets: Record<string, Record<string, number>> = {
    hero:       { hero: 0.45, about: 0, skills: 0, projects: 0, experience: 0 },
    contact:    { hero: 0.4,  about: 0, skills: 0, projects: 0, experience: 0 },
    about:      { hero: 0,    about: 0.25, skills: 0, projects: 0, experience: 0 },
    skills:     { hero: 0,    about: 0, skills: 0.2, projects: 0, experience: 0 },
    projects:   { hero: 0,    about: 0, skills: 0, projects: 0.2, experience: 0 },
    experience: { hero: 0,    about: 0, skills: 0, projects: 0, experience: 0.3 },
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotionPreference = () => setReducedMotion(media.matches)

    syncMotionPreference()
    media.addEventListener('change', syncMotionPreference)
    return () => media.removeEventListener('change', syncMotionPreference)
  }, [])

  useFrame((_state, delta) => {
    const t = targets[scene] ?? targets.hero
    const speed = 2 * delta // smooth, framerate-independent
    const opacityFor = (current: number, target: number) =>
      reducedMotion ? target : THREE.MathUtils.lerp(current, target, speed)

    // Hero & Contact share same icosahedron mesh
    if (heroRef.current) {
      const mat = heroRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacityFor(mat.opacity, t.hero)
      if (!reducedMotion) {
        heroRef.current.rotation.y += 0.003
        heroRef.current.rotation.x += 0.001
      }
      heroRef.current.visible = mat.opacity > 0.001
    }
    if (aboutRef.current) {
      const mat = aboutRef.current.material as THREE.PointsMaterial
      mat.opacity = opacityFor(mat.opacity, t.about)
      aboutRef.current.visible = mat.opacity > 0.001
    }
    if (skillsRef.current) {
      const mat = skillsRef.current.material as THREE.LineBasicMaterial
      mat.opacity = opacityFor(mat.opacity, t.skills)
      skillsRef.current.visible = mat.opacity > 0.001
    }
    if (projectsRef.current) {
      const mat = projectsRef.current.material as THREE.LineBasicMaterial
      mat.opacity = opacityFor(mat.opacity, t.projects)
      projectsRef.current.rotation.x = -0.5
      projectsRef.current.visible = mat.opacity > 0.001
    }
    if (experienceRef.current) {
      const mat = experienceRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacityFor(mat.opacity, t.experience)
      experienceRef.current.visible = mat.opacity > 0.001
    }
  })

  // About: scattered points
  const aboutPositions = useMemo(() => new Float32Array(
    Array.from({ length: 150 }, () => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ]).flat()
  ), [])

  // Skills: grid lines
  const gridPositions = useMemo(() => {
    const pos: number[] = []
    for (let i = -5; i <= 5; i++) {
      pos.push(-5, i, 0, 5, i, 0)
      pos.push(i, -5, 0, i, 5, 0)
    }
    return new Float32Array(pos)
  }, [])

  // Experience: spiral tube points
  const spiralPoints = useMemo(() => Array.from({ length: 5 }, (_, i) => 
    new THREE.Vector3(
      Math.cos(i * 1.5) * 2,
      i * 1.5 - 3,
      Math.sin(i * 1.5) * 2
    )
  ), [])

  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Hero + Contact scene */}
      <mesh ref={heroRef} position={[2, 0, 0]}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial 
          color="#6366F1" 
          wireframe 
          transparent 
          opacity={0.45} 
          depthWrite={false}
        />
      </mesh>

      {/* About scene */}
      <points ref={aboutRef}>
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
        />
      </points>

      {/* Skills scene */}
      <lineSegments ref={skillsRef}>
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

      {/* Projects scene */}
      <lineSegments ref={projectsRef}>
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

      {/* Experience scene */}
      <mesh ref={experienceRef}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(spiralPoints), 
          100, 0.02, 8, false
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
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneBackground />
        </Suspense>
      </Canvas>
    </div>
  )
}
