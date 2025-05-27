"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Environment } from "@react-three/drei"
import { AnimatedGlobe } from "./animated-globe"
import { ParticleField, OrbitingRings } from "./floating-elements"
import { useScroll } from "framer-motion"
import * as THREE from "three"

// Fixed Camera (no scroll movement)
function FixedCamera() {
    return (
        <PerspectiveCamera
            makeDefault
            position={[0, 0, 8]}
            fov={60}
        />
    )
}

// Globe controller for scale and rotation only
function GlobeController({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null)
    const { scrollYProgress } = useScroll()

    useFrame(() => {
        if (groupRef.current) {
            const scrollY = scrollYProgress.get()
            // Only rotate and scale, no position changes
            groupRef.current.rotation.y = scrollY * Math.PI * 0.3
            groupRef.current.rotation.x = Math.sin(scrollY * Math.PI) * 0.1
            groupRef.current.scale.setScalar(2 + scrollY * 0.5)
        }
    })

    return <group ref={groupRef}>{children}</group>
}

// Background elements controller (minimal movement)
function BackgroundController({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null)
    const { scrollYProgress } = useScroll()

    useFrame(() => {
        if (groupRef.current) {
            const scrollY = scrollYProgress.get()
            // Very subtle movement for background elements
            groupRef.current.rotation.y = scrollY * Math.PI * 0.1
        }
    })

    return <group ref={groupRef}>{children}</group>
}

// Enhanced 3D Scene Component with Fixed Globe
export function Enhanced3DScene() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                className="w-full h-full"
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                {/* Minimalistic Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.3}
                />

                {/* Environment for subtle reflections */}
                <Environment preset="night" />

                {/* Fixed Camera */}
                <FixedCamera />

                {/* Background Elements with Minimal Movement */}
                <BackgroundController>
                    {/* Background particles */}
                    <group position={[0, 0, -10]}>
                        <ParticleField />
                    </group>

                    {/* Orbiting rings */}
                    <group position={[0, 0, -3]}>
                        <OrbitingRings />
                    </group>
                </BackgroundController>

                {/* Fixed Position Globe with Scale and Rotation */}
                <GlobeController>
                    <group position={[0, 0, 0]}>
                        <AnimatedGlobe />
                    </group>
                </GlobeController>

                {/* Subtle fog for depth */}
                <fog attach="fog" args={["#0a0a0a", 8, 40]} />
            </Canvas>
        </div>
    )
} 