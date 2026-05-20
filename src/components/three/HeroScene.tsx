"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

interface MeshProps {
  scale: number;
  opacity: number;
}

function InteractiveIcosahedron({ scale, opacity }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom pointer tracking to bypass container pointer-event limitations
  const pointerRef = useRef({ x: 0, y: 0 });

  // Track auto-rotation and tilt states independently to avoid sudden jumps
  const autoRotationY = useRef(0);
  const autoRotationX = useRef(0);
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      // Map screen cursor coordinates [0, size] to range [-1, 1]
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    // 1. Continuous auto-rotation increment as per request (0.003 Y, 0.001 X)
    autoRotationY.current += 0.003;
    autoRotationX.current += 0.001;

    // 2. Map cursor coordinates to tilt (max 15 degrees = ~0.26 radians)
    const targetTiltX = -pointerRef.current.y * 0.2618;
    const targetTiltY = pointerRef.current.x * 0.2618;

    // Smoothly lerp towards target tilt
    tiltX.current = THREE.MathUtils.lerp(tiltX.current, targetTiltX, 0.05);
    tiltY.current = THREE.MathUtils.lerp(tiltY.current, targetTiltY, 0.05);

    // Apply combined rotations
    if (meshRef.current) {
      meshRef.current.rotation.x = autoRotationX.current + tiltX.current;
      meshRef.current.rotation.y = autoRotationY.current + tiltY.current;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      {/* icosahedron detail level 1, radius 2.5 */}
      <icosahedronGeometry args={[2.5, 1]} />
      <meshStandardMaterial
        color="#6366F1"
        wireframe
        transparent
        opacity={opacity}
        roughness={0.2}
        metalness={0.8}
        emissive="#6366F1"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [responsiveProps, setResponsiveProps] = useState({ scale: 1.0, opacity: 0.6 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile view adjustments
        setResponsiveProps({ scale: 0.65, opacity: 0.3 });
      } else {
        // Desktop view adjustments
        setResponsiveProps({ scale: 1.0, opacity: 0.6 });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full z-0 pointer-events-none transition-all duration-500 overflow-hidden flex items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-base text-muted/30 font-mono text-xs select-none">
            [ Loading 3D Atmosphere... ]
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Ambient lighting matching client specs */}
          <ambientLight intensity={0.4} />
          
          {/* Main accent indigo point light */}
          <pointLight
            color="#6366F1"
            intensity={4}
            position={[5, 5, 5]}
            distance={20}
            decay={1.5}
          />
          
          {/* Supporting cold white light */}
          <pointLight
            color="#E8E8F5"
            intensity={2.5}
            position={[-5, -5, -5]}
            distance={20}
            decay={1.5}
          />

          <InteractiveIcosahedron 
            scale={responsiveProps.scale} 
            opacity={responsiveProps.opacity} 
          />
          
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
