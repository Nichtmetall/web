"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
    children: ReactNode
    speed?: number
    className?: string
    direction?: "up" | "down" | "left" | "right"
}

export function ParallaxSection({
    children,
    speed = 0.5,
    className = "",
    direction = "up"
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const distance = 100 * speed

    // Create transforms directly without function wrapper
    const transformUp = useTransform(scrollYProgress, [0, 1], [distance, -distance])
    const transformDown = useTransform(scrollYProgress, [0, 1], [-distance, distance])
    const transformLeft = useTransform(scrollYProgress, [0, 1], [distance, -distance])
    const transformRight = useTransform(scrollYProgress, [0, 1], [-distance, distance])

    const transform = direction === "up" ? transformUp :
        direction === "down" ? transformDown :
            direction === "left" ? transformLeft :
                transformRight

    return (
        <div ref={ref} className={className}>
            <motion.div
                style={
                    direction === "left" || direction === "right"
                        ? { x: transform }
                        : { y: transform }
                }
            >
                {children}
            </motion.div>
        </div>
    )
}

// Multi-layer parallax container
export function ParallaxContainer({ children }: { children: ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            {children}
        </div>
    )
}

// Floating elements with different parallax speeds
export function FloatingElement({
    children,
    speed = 0.3,
    rotationSpeed = 0.1,
    className = ""
}: {
    children: ReactNode
    speed?: number
    rotationSpeed?: number
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * rotationSpeed])

    return (
        <div ref={ref} className={className}>
            <motion.div
                style={{ y, rotate }}
                className="will-change-transform"
            >
                {children}
            </motion.div>
        </div>
    )
} 