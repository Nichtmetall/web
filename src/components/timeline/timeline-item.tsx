"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Building2, GraduationCap, MapPin, Calendar, ChevronDown, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MagicCard } from "@/components/magicui/magic-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import type { TimelineItem as TimelineItemType } from "@/types"

interface TimelineItemProps {
    item: TimelineItemType
    index: number
    type: 'experience' | 'education'
    totalItems: number
}

export function TimelineItem({ item, index, type, totalItems }: TimelineItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const isLastItem = index === totalItems - 1

    const toggleExpanded = () => {
        if (Array.isArray(item.description) && item.description.length > 0) {
            setIsExpanded(!isExpanded)
        }
    }

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
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
            className="relative flex items-start group mb-16 last:mb-0"
        >
            {/* Timeline Connector - positioned relative to continuous line */}
            <div className="relative flex flex-col items-center mr-8 z-10 w-6">
                {/* Enhanced timeline dot */}
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

            {/* Content Card */}
            <div className="flex-1 w-full">
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
                            <CardHeader className="pb-4 px-8 pt-8 space-y-4">
                                {/* Header with icon and period */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                            {type === 'experience' ? (
                                                <Building2 className="h-6 w-6 text-primary" />
                                            ) : (
                                                <GraduationCap className="h-6 w-6 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <Badge
                                                variant="outline"
                                                className="bg-primary/5 border-primary/20 text-primary font-medium px-3 py-1"
                                            >
                                                {item.period}
                                            </Badge>
                                        </div>
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
                                                <ChevronDown className="h-5 w-5 text-primary" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Title and subtitle */}
                                <div className="space-y-2">
                                    <motion.h3
                                        className="text-2xl font-bold text-foreground leading-tight"
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
                                </div>

                                {/* Location and grade info */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium">{item.location}</span>
                                    </div>
                                    {item.grade && (
                                        <Badge variant="secondary" className="bg-secondary/10 border-secondary/30 text-secondary-foreground">
                                            Note: {item.grade}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            {/* Expandable content */}
                            <AnimatePresence mode="wait">
                                {isExpanded && Array.isArray(item.description) && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                            y: -20
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            y: -20,
                                            transition: { duration: 0.3 }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <CardContent className="px-8 pb-0">
                                            <div className="space-y-3">
                                                {item.description.map((desc, descIndex) => (
                                                    <BlurFade
                                                        key={descIndex}
                                                        delay={descIndex * 0.05}
                                                        direction="up"
                                                        offset={10}
                                                    >
                                                        <motion.div
                                                            className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                                                            whileHover={{
                                                                backgroundColor: "hsl(var(--muted) / 0.5)",
                                                                transition: { duration: 0.2 }
                                                            }}
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                                            <p className="text-sm text-foreground/80 leading-relaxed">
                                                                {desc}
                                                            </p>
                                                        </motion.div>
                                                    </BlurFade>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Skills section */}
                            {item.skills && item.skills.length > 0 && (
                                <CardContent className="px-8 pb-8">
                                    <div className="pt-6 border-t border-border/50">
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            Technologien & Fähigkeiten
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map((skill, skillIndex) => (
                                                <BlurFade
                                                    key={skill}
                                                    delay={skillIndex * 0.03}
                                                    direction="up"
                                                    offset={5}
                                                >
                                                    <motion.div
                                                        whileHover={{
                                                            scale: 1.05,
                                                            y: -2,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-background/50 border-primary/20 text-foreground/80 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 px-3 py-1"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    </motion.div>
                                                </BlurFade>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </motion.div>
                    </MagicCard>
                </BlurFade>
            </div>
        </motion.div>
    )
} 