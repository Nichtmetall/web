"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Building2, GraduationCap, MapPin, ChevronDown } from "lucide-react"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { MagicCard } from "@/components/magicui/magic-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import type { TimelineItem as TimelineItemType } from "@/types"

interface TimelineItemProps {
    item: TimelineItemType
    index: number
    type: 'experience' | 'education'
    isLeft: boolean
}

export function TimelineItem({ item, index, type, isLeft }: TimelineItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const toggleExpanded = () => {
        if (Array.isArray(item.description) && item.description.length > 0) {
            setIsExpanded(!isExpanded)
        }
    }

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1
        }
    }

    const timelineDotVariants = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={`relative flex items-center w-full mb-16 last:mb-0 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
        >
            {/* Content Card */}
            <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8' : 'pl-8'}`}>
                <BlurFade delay={index * 0.1 + 0.2}>
                    <MagicCard
                        className={`bg-gradient-to-br from-background via-background to-primary/5 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 ${Array.isArray(item.description) && item.description.length > 0 ? 'cursor-pointer' : ''
                            }`}
                        gradientSize={300}
                        gradientColor="hsl(var(--primary))"
                        gradientOpacity={0.1}
                        gradientFrom="hsl(var(--primary))"
                        gradientTo="hsl(var(--secondary))"
                    >
                        <motion.div
                            whileHover={{
                                y: -2,
                                transition: { duration: 0.2, ease: "easeOut" }
                            }}
                            className="relative overflow-hidden"
                            onClick={Array.isArray(item.description) && item.description.length > 0 ? toggleExpanded : undefined}
                        >
                            <CardHeader className="pb-4 px-6 pt-6 space-y-4">
                                {/* Header with icon and period */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                            {type === 'experience' ? (
                                                <Building2 className="h-5 w-5 text-primary" />
                                            ) : (
                                                <GraduationCap className="h-5 w-5 text-primary" />
                                            )}
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="bg-primary/5 border-primary/20 text-primary font-medium px-3 py-1"
                                        >
                                            {item.period}
                                        </Badge>
                                    </div>

                                    {/* Expand indicator for descriptions */}
                                    {Array.isArray(item.description) && item.description.length > 0 && (
                                        <motion.div
                                            className="p-2 rounded-full bg-primary/5 border border-primary/10"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="h-4 w-4 text-primary" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Title and subtitle */}
                                <div className="space-y-2">
                                    <motion.h3
                                        className="text-xl font-bold text-foreground leading-tight"
                                        layoutId={`title-${item.id}`}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        className="text-lg text-primary font-semibold"
                                        layoutId={`subtitle-${item.id}`}
                                    >
                                        {item.subtitle}
                                    </motion.p>
                                    {item.location && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{item.location}</span>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>

                            {/* Expandable content */}
                            <AnimatePresence mode="wait">
                                {isExpanded && Array.isArray(item.description) && item.description.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <CardContent className="px-6 pb-6 pt-0">
                                            <div className="space-y-3">
                                                <ul className="space-y-2">
                                                    {item.description.map((desc, idx) => (
                                                        <BlurFade key={idx} delay={idx * 0.05}>
                                                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                                                <span className="leading-relaxed">{desc}</span>
                                                            </li>
                                                        </BlurFade>
                                                    ))}
                                                </ul>

                                                {/* Skills */}
                                                {item.skills && item.skills.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-border/30">
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.skills.map((skill, skillIndex) => (
                                                                <BlurFade key={skill} delay={skillIndex * 0.02}>
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="bg-primary/5 text-primary border-primary/20 text-xs px-2 py-1"
                                                                    >
                                                                        {skill}
                                                                    </Badge>
                                                                </BlurFade>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </MagicCard>
                </BlurFade>
            </div>

            {/* Timeline dot in the center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                    className="relative flex items-center justify-center"
                    variants={timelineDotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                >
                    {/* Outer pulse ring */}
                    <motion.div
                        className="absolute w-12 h-12 rounded-full border-2 border-primary/30"
                        animate={isInView ? {
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                        } : {}}
                        transition={{
                            duration: 2.5,
                            delay: index * 0.2 + 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Middle pulse ring */}
                    <motion.div
                        className="absolute w-8 h-8 rounded-full border border-primary/40"
                        animate={isInView ? {
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.6, 0.4],
                        } : {}}
                        transition={{
                            duration: 2,
                            delay: index * 0.2 + 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Main dot */}
                    <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg border-2 border-background flex items-center justify-center relative z-20"
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className="w-2 h-2 rounded-full bg-background" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
} 