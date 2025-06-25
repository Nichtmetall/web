"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { TimelineItem } from "./timeline-item"
import { BlurFade } from "@/components/magicui/blur-fade"

interface VerticalTimelineProps {
    items: Array<{
        id: string
        title: string
        subtitle: string
        location: string
        period: string
        description?: string[]
        skills?: string[]
        type: 'experience' | 'education'
    }>
}

export function VerticalTimeline({ items }: VerticalTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    })

    // Animierte Linienhöhe basierend auf Scroll-Position
    const lineHeight = useSpring(
        useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        { stiffness: 100, damping: 30 }
    )

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
            {/* Animierte Timeline-Linie */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-border/30 h-full">
                <motion.div
                    className="w-full bg-gradient-to-b from-primary to-primary/60 origin-top"
                    style={{ height: lineHeight }}
                />
            </div>

            {/* Timeline Items */}
            <div className="relative z-10 space-y-8 py-8">
                {items.map((item, index) => (
                    <BlurFade key={item.id} delay={index * 0.1}>
                        <TimelineItem
                            item={item}
                            index={index}
                            type={item.type}
                            isLeft={index % 2 === 0}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    )
} 