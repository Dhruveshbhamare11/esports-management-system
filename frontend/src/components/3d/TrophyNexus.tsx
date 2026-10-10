import React, { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { FallbackCore } from './FallbackCore'

function NexusGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Floating particles around the trophy core
  const particlesCount = 70
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const col = new Float32Array(particlesCount * 3)
    const colorPurple = new THREE.Color('#8B5CF6')
    const colorCyan = new THREE.Color('#06B6D4')

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 1.6 + Math.random() * 1.5
      const y = (Math.random() - 0.5) * 2.8

      pos[i * 3] = Math.cos(theta) * radius
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(theta) * radius

      const mixed = Math.random() > 0.5 ? colorPurple : colorCyan
      col[i * 3] = mixed.r
      col[i * 3 + 1] = mixed.g
      col[i * 3 + 2] = mixed.b
    }
    return [pos, col]
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    // Smooth rotation of central crystal
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.15
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.25
      wireRef.current.rotation.z = Math.cos(time * 0.4) * 0.2
    }

    // Interactive rings spinning on different axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.6
      ring1Ref.current.rotation.y = time * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.5
      ring2Ref.current.rotation.z = time * 0.4
    }

    // Particle rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group>
      {/* Central Solid Trophy Crystal (Octahedron) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#080B14"
            emissive="#4c1d95"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Energy Cage (Icosahedron) */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.9}
            wireframe={true}
            transparent={true}
            opacity={0.65}
          />
        </mesh>
      </Float>

      {/* Holographic Orbital Ring 1 (Cyan) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.9, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Holographic Orbital Ring 2 (Purple) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Ambient floating energy nodes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export const TrophyNexus: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none translate-x-12 translate-y-12" />

      <Suspense fallback={<FallbackCore />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} color="#8B5CF6" />
          <directionalLight position={[-5, -3, 3]} intensity={2.0} color="#06B6D4" />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#A3E635" distance={4} />

          <NexusGeometry />
        </Canvas>
      </Suspense>
    </div>
  )
}
