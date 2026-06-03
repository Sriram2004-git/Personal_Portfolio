'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const { positions, velocities } = useMemo(() => {
    const count = 60
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    return { positions: pos, velocities: vel }
  }, [])

  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  const lineGeometry = useMemo(() => {
    const threshold = 2.5
    const linePositions: number[] = []
    const n = positions.length / 3
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          )
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    return geo
  }, [positions])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.04
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.02) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeometry}>
        <pointsMaterial color="#0EA5E9" size={0.08} transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#0EA5E9" transparent opacity={0.12} />
      </lineSegments>
    </group>
  )
}

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial color="#8B5CF6" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </Points>
  )
}

export function NeuralNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 70 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <NeuralNodes />
      <ParticleCloud />
    </Canvas>
  )
}
