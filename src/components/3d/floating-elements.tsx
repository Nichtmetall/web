"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Box, Cylinder, Sphere } from "@react-three/drei"
import * as THREE from "three"

// Minimalistic Planet Objects
function Mars({ ...props }) {
    return (
        <Sphere args={[0.4, 16, 16]} {...props}>
            <meshBasicMaterial color="#cd5c5c" transparent opacity={0.8} />
        </Sphere>
    )
}

function Jupiter({ ...props }) {
    return (
        <Sphere args={[0.6, 16, 16]} {...props}>
            <meshBasicMaterial color="#d2b48c" transparent opacity={0.8} />
        </Sphere>
    )
}

function Venus({ ...props }) {
    return (
        <Sphere args={[0.35, 16, 16]} {...props}>
            <meshBasicMaterial color="#ffc649" transparent opacity={0.8} />
        </Sphere>
    )
}

function Neptune({ ...props }) {
    return (
        <Sphere args={[0.45, 16, 16]} {...props}>
            <meshBasicMaterial color="#4682b4" transparent opacity={0.8} />
        </Sphere>
    )
}

function Saturn({ ...props }) {
    return (
        <group {...props}>
            {/* Planet */}
            <Sphere args={[0.5, 16, 16]}>
                <meshBasicMaterial color="#fad5a5" transparent opacity={0.8} />
            </Sphere>
            {/* Ring */}
            <mesh rotation={[Math.PI / 6, 0, 0]}>
                <torusGeometry args={[0.8, 0.02, 8, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
        </group>
    )
}

export function FloatingGeometry() {
    const objects = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            ] as [number, number, number],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ] as [number, number, number],
            scale: 0.3 + Math.random() * 0.7,
            speed: 0.01 + Math.random() * 0.02,
            type: Math.floor(Math.random() * 5) // 0: mars, 1: jupiter, 2: venus, 3: neptune, 4: saturn
        }))
    }, [])

    return (
        <>
            {objects.map((obj) => (
                <Float
                    key={obj.id}
                    speed={obj.speed * 2}
                    rotationIntensity={0.3}
                    floatIntensity={1.5}
                    position={obj.position}
                >
                    <group scale={obj.scale} rotation={obj.rotation}>
                        {obj.type === 0 && <Mars />}
                        {obj.type === 1 && <Jupiter />}
                        {obj.type === 2 && <Venus />}
                        {obj.type === 3 && <Neptune />}
                        {obj.type === 4 && <Saturn />}
                    </group>
                </Float>
            ))}
        </>
    )
}

// Blinking Starfield
export function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null)
    const blinkDataRef = useRef<Float32Array | null>(null)

    const particles = useMemo(() => {
        const count = 400 // More stars for better effect
        const positions = new Float32Array(count * 3)
        const blinkData = new Float32Array(count) // Store blink timing for each star

        for (let i = 0; i < count; i++) {
            // Distribute particles in a large sphere
            positions[i * 3] = (Math.random() - 0.5) * 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20

            // Random blink timing for each star
            blinkData[i] = Math.random() * Math.PI * 2
        }

        blinkDataRef.current = blinkData
        return { positions, blinkData }
    }, [])

    useFrame((state) => {
        if (pointsRef.current && blinkDataRef.current) {
            // Subtle rotation
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.03

            // Update blinking effect
            const material = pointsRef.current.material as THREE.PointsMaterial
            if (material) {
                // Create a twinkling effect by varying opacity of individual points
                const time = state.clock.elapsedTime
                let averageOpacity = 0.4

                // Add some stars that blink more prominently
                for (let i = 0; i < blinkDataRef.current.length; i++) {
                    const blinkPhase = blinkDataRef.current[i]
                    const blinkCycle = Math.sin(time * 2 + blinkPhase)

                    // 20% of stars have special blinking
                    if (i % 5 === 0) {
                        const intensity = Math.max(0.1, 0.8 + blinkCycle * 0.7)
                        averageOpacity += intensity * 0.002 // Contribute to overall brightness
                    }
                }

                material.opacity = Math.min(0.8, averageOpacity + Math.sin(time * 1.5) * 0.1)
            }
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.006}
                transparent
                opacity={0.5}
                sizeAttenuation
                color="#ffffff"
            />
        </points>
    )
}

// Minimalistic Orbiting Rings
export function OrbitingRings() {
    const ring1Ref = useRef<THREE.Mesh>(null)
    const ring2Ref = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.3
            ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.1
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = state.clock.elapsedTime * -0.2
            ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.05
        }
    })

    return (
        <group position={[0, 0, -5]}>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[4, 0.01, 8, 64]} />
                <meshBasicMaterial color={0xffffff} transparent opacity={0.15} />
            </mesh>
            <mesh ref={ring2Ref}>
                <torusGeometry args={[6, 0.008, 8, 64]} />
                <meshBasicMaterial color={0xffffff} transparent opacity={0.1} />
            </mesh>
        </group>
    )
} 