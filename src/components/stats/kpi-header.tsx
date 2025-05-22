"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Target, Clock } from "lucide-react"

interface KPIStat {
    label: string
    value: number
    icon: React.ElementType
    suffix?: string
    color?: string
}

interface KPIHeaderProps {
    title?: string
    description?: string
    stats: KPIStat[]
    className?: string
}

function AnimatedNumber({
    value,
    duration = 2000,
    suffix = "",
    isInView
}: {
    value: number
    duration?: number
    suffix?: string
    isInView: boolean
}) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(value * easeOutCubic))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [value, duration, isInView])

    return <span>{displayValue}{suffix}</span>
}

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            type: "spring",
        },
    },
}

export function KPIHeader({ title, description, stats, className = "" }: KPIHeaderProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20 shadow-lg">
                <CardContent className="pt-6">
                    {(title || description) && (
                        <div className="text-center mb-6">
                            {title && (
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-2xl font-bold text-foreground mb-2"
                                >
                                    {title}
                                </motion.h2>
                            )}
                            {description && (
                                <motion.p
                                    variants={itemVariants}
                                    className="text-muted-foreground"
                                >
                                    {description}
                                </motion.p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="flex flex-col items-center text-center group min-w-[140px]"
                            >
                                <div className="space-y-3 w-full">
                                    <div className="flex items-center justify-center">
                                        <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color || 'from-primary/10 to-primary/20'
                                            } group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300`}>
                                            <stat.icon className={`h-6 w-6 ${stat.color ? 'text-current' : 'text-primary'
                                                }`} />
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-center">
                                        <div className="text-3xl font-bold text-foreground text-center">
                                            <AnimatedNumber
                                                value={stat.value}
                                                suffix={stat.suffix || ""}
                                                isInView={isInView}
                                            />
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground text-center">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Vordefinierte Icon-Sets für verschiedene Anwendungsfälle
export const STAT_ICONS = {
    count: Activity,
    average: Target,
    total: Activity,
    time: Clock,
    projects: Activity,
    skills: Target,
    years: Clock,
} as const 