"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Building2, GraduationCap, MapPin, Calendar, ChevronDown, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { TimelineItem as TimelineItemType } from "@/types"

interface TimelineItemProps {
    item: TimelineItemType
    index: number
    type: 'experience' | 'education'
    totalItems: number
}

export function TimelineItem({ item, index, type }: TimelineItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const toggleExpanded = () => {
        if (Array.isArray(item.description) && item.description.length > 0) {
            setIsExpanded(!isExpanded)
        }
    }

    // Enhanced animation variants with better spacing and timing
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const timelineLineVariants = {
        hidden: {
            scaleY: 0,
            opacity: 0
        },
        visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: index * 0.15 + 0.2,
                ease: [0.22, 1, 0.36, 1],
                transformOrigin: "top"
            }
        }
    }

    const timelineDotVariants = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.15 + 0.1,
                type: "spring",
                stiffness: 150,
                damping: 12
            }
        }
    }

    // Enhanced description animation
    const descriptionVariants = {
        hidden: {
            opacity: 0,
            x: -10
        },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                delay: i * 0.05 + 0.2,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    }

    // Enhanced skills animation
    const skillVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                delay: i * 0.03 + 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex items-start group"
        >
            {/* Enhanced Timeline line with modern design */}
            <motion.div
                className="absolute left-4 top-0 w-0.5 h-full origin-top"
                variants={timelineLineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Main line with enhanced gradient */}
                <div className="h-full bg-gradient-to-b from-primary/80 via-primary/50 to-primary/30 rounded-full" />

                {/* Enhanced glow effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/40 to-transparent blur-sm rounded-full"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        delay: index * 0.3 + 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Timeline dot container */}
            <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Enhanced pulsing rings with better timing */}
                <motion.div
                    className="absolute w-8 h-8 rounded-full border-2 border-primary/40"
                    animate={isInView ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4],
                    } : {}}
                    transition={{
                        duration: 2.5,
                        delay: index * 0.2 + 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute w-10 h-10 rounded-full border border-primary/20"
                    animate={isInView ? {
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.4, 0.2],
                    } : {}}
                    transition={{
                        duration: 3,
                        delay: index * 0.2 + 0.7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Enhanced main timeline dot with modern design */}
                <motion.div
                    className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 border-4 border-background shadow-lg"
                    variants={timelineDotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.2 }
                    }}
                >
                    {/* Enhanced inner elements with gradient */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-background/40 to-background/20" />
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/90 to-primary/70" />
                </motion.div>
            </div>

            {/* Enhanced Card content with modern design */}
            <div className="flex-1 ml-12 pb-12">
                <motion.div
                    whileHover={{
                        y: -3,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.99 }}
                >
                    <Card
                        className={`relative overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${
                            Array.isArray(item.description) && item.description.length > 0 ? 'hover:border-primary/40 cursor-pointer' : 'cursor-default'
                        } bg-background/95 backdrop-blur-sm`}
                        onClick={toggleExpanded}
                    >
                        {/* Enhanced background effect with gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        <CardHeader className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-primary/10">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary text-sm">
                                            {type === 'experience' ? <Building2 className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-lg text-foreground leading-tight truncate mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-primary font-medium truncate mb-2">
                                            {item.subtitle}
                                        </p>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                <span>{item.period}</span>
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {item.skills.slice(0, 3).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {item.skills.length > 3 && (
                                                    <Badge variant="outline" className="text-sm px-3 py-1 text-muted-foreground">
                                                        +{item.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {Array.isArray(item.description) && item.description.length > 0 && (
                                        <>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Eye className="h-4 w-4" />
                                                <span className="hidden sm:inline">Details</span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20
                                                }}
                                            >
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            </motion.div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                        opacity: { duration: 0.3 }
                                    }}
                                    className="overflow-hidden"
                                >
                                    <CardContent className="pt-0 pb-6 px-8 border-t border-border/30">
                                        {/* Enhanced location and period with better spacing */}
                                        <motion.div
                                            className="flex items-center gap-3 mb-4 text-base text-muted-foreground"
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <MapPin className="h-5 w-5" />
                                            <span>{item.location}</span>
                                            <Calendar className="h-5 w-5 ml-3" />
                                            <span>{item.period}</span>
                                        </motion.div>

                                        {/* Enhanced description with better spacing and animations */}
                                        <div className="space-y-3">
                                            {item.description?.map((desc, i) => (
                                                <motion.div
                                                    key={i}
                                                    custom={i}
                                                    variants={descriptionVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary/70 mt-2.5 flex-shrink-0" />
                                                    <p className="text-base text-muted-foreground leading-relaxed">
                                                        {desc}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Enhanced skills section with better animations */}
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="space-y-3 mt-6">
                                                <motion.h4
                                                    className="text-sm font-medium text-foreground uppercase tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.2 }}
                                                >
                                                    Technologien
                                                </motion.h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.skills.map((skill, skillIndex) => (
                                                        <motion.div
                                                            key={skill}
                                                            custom={skillIndex}
                                                            variants={skillVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            whileHover={{
                                                                scale: 1.05,
                                                                transition: { duration: 0.15 }
                                                            }}
                                                        >
                                                            <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
                                                                {skill}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
} 