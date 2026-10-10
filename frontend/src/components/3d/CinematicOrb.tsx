import React, { useRef, Suspense, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── Animated energy orb ── */
function EnergyOrb() {
  const coreRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const outerShellRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const innerGlowRef = useRef<THREE.Mesh>(null)

  const particleCount = 280
  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const siz = new Float32Array(particleCount)
    const col = new Float32Array(particleCount * 3)
    const violet = new THREE.Color('#7C3AED')
    const cyan = new THREE.Color('#00D4FF')
    const gold = new THREE.Color('#FFB938')

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.8 + Math.random() * 2.2
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      siz[i] = Math.random() * 0.06 + 0.02

      const pick = Math.random()
      const c = pick < 0.6 ? violet : pick < 0.85 ? cyan : gold
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, sizes: siz, colors: col }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const slowT = t * 0.5

    if (coreRef.current) {
      coreRef.current.rotation.y = slowT * 0.8
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.3
      const scale = 1 + Math.sin(t * 1.2) * 0.05
      coreRef.current.scale.setScalar(scale)
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.rotation.y = -slowT * 0.6
      innerGlowRef.current.rotation.z = Math.cos(t * 0.4) * 0.2
    }
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = slowT * 0.3
      outerShellRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5
      ring1Ref.current.rotation.z = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.4
      ring2Ref.current.rotation.z = t * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.35
      ring3Ref.current.rotation.y = t * 0.45
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.06
      particlesRef.current.rotation.x = t * 0.03
    }
  })

  return (
    <group>
      {/* Depth stars background */}
      <Stars radius={20} depth={10} count={600} factor={3} saturation={0} fade speed={1} />

      {/* Sparkle aura */}
      <Sparkles
        count={60}
        scale={7}
        size={1.5}
        speed={0.4}
        color="#7C3AED"
      />
      <Sparkles
        count={30}
        scale={5}
        size={2}
        speed={0.6}
        color="#00D4FF"
      />

      {/* ── Inner energy core (Icosahedron) ── */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#1a0040"
            emissive="#5B21B6"
            emissiveIntensity={1.8}
            roughness={0.05}
            metalness={0.95}
            wireframe={false}
          />
        </mesh>

        {/* Inner wireframe shell */}
        <mesh ref={innerGlowRef}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#00D4FF"
            emissiveIntensity={2.0}
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>
      </Float>

      {/* ── Outer energy shell (Octahedron low-poly) ── */}
      <mesh ref={outerShellRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Orbital rings ── */}
      {/* Cyan ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={2.5}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Violet ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.022, 16, 120]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#8B5CF6"
          emissiveIntensity={2.8}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Gold ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.7, 0.014, 16, 120]} />
        <meshStandardMaterial
          color="#FFB938"
          emissive="#F5A623"
          emissiveIntensity={2.0}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* ── Particle cloud ── */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

/* ── Responsive camera ── */
function CameraRig() {
  const { camera } = useThree()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    camera.position.x += (Math.sin(t * 0.15) * 0.3 - camera.position.x) * 0.02
    camera.position.y += (Math.cos(t * 0.12) * 0.2 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Fallback loader ── */
function OrbFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '120px', height: '120px',
        borderRadius: '50%',
        border: '2px solid rgba(124, 58, 237, 0.4)',
        borderTopColor: '#7C3AED',
        animation: 'spin-slow 1s linear infinite',
        boxShadow: '0 0 40px rgba(124, 58, 237, 0.4)',
      }} />
    </div>
  )
}

/* ── Main export ── */
export const CinematicOrb: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '520px',
    }}>
      {/* Multi-layer background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          width: '380px', height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'aurora 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '280px', height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'aurora 10s ease-in-out infinite 2s',
        }} />
      </div>

      <Suspense fallback={<OrbFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} color="#0B0E1F" />
          <pointLight position={[3, 3, 3]} intensity={4} color="#7C3AED" />
          <pointLight position={[-3, -2, 2]} intensity={3} color="#00D4FF" />
          <pointLight position={[0, 0, 1]} intensity={2} color="#FFB938" distance={6} />

          <CameraRig />
          <EnergyOrb />
        </Canvas>
      </Suspense>
    </div>
  )
}
