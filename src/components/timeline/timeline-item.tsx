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
        setIsExpanded(!isExpanded)
    }

    // Simplified animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 50
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
                delay: index * 0.15 + 0.3,
                ease: "easeOut",
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
                delay: index * 0.15 + 0.2,
                type: "spring",
                stiffness: 150,
                damping: 12
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex items-start group"
        >
            {/* Continuous Timeline line */}
            <motion.div
                className="absolute left-3 top-0 w-0.5 h-full origin-top"
                variants={timelineLineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Main line */}
                <div className="w-full h-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20" />

                {/* Animated glow effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/30 to-transparent blur-sm"
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        delay: index * 0.5 + 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0 flex items-center">
                {/* Single pulsing ring */}
                <motion.div
                    className="absolute w-6 h-6 rounded-full border-2 border-primary/40"
                    animate={isInView ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                    } : {}}
                    transition={{
                        duration: 2.5,
                        delay: index * 0.3 + 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Main timeline dot */}
                <motion.div
                    className="relative w-6 h-6 rounded-full bg-primary border-2 border-background shadow-lg"
                    variants={timelineDotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 }
                    }}
                >
                    {/* Inner dot for extra visual interest */}
                    <div className="absolute inset-1.5 rounded-full bg-background/30" />
                </motion.div>
            </div>

            {/* Enhanced Card content */}
            <div className="flex-1 ml-8 pb-8">
                <motion.div
                    whileHover={{
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Card
                        className="relative overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 cursor-pointer bg-background/95 backdrop-blur-sm"
                        onClick={toggleExpanded}
                    >
                        {/* Subtle background effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Minimalistic header */}
                        <CardHeader className="pb-3 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                            {type === 'experience' ? <Building2 className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-sm text-foreground leading-tight truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-primary font-medium truncate">
                                            {item.subtitle}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{item.period}</span>
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {item.skills.slice(0, 3).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {item.skills.length > 3 && (
                                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-muted-foreground">
                                                        +{item.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Eye className="h-3 w-3" />
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
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </motion.div>
                                </div>
                            </div>


                        </CardHeader>

                        {/* Expandable content with improved animations */}
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
                                    <CardContent className="pt-0 pb-4 border-t border-border/30">
                                        {/* Location and period */}
                                        <motion.div
                                            className="flex items-center gap-2 mb-3 text-sm text-muted-foreground"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <MapPin className="h-4 w-4" />
                                            <span>{item.location}</span>
                                            <Calendar className="h-4 w-4 ml-2" />
                                            <span>{item.period}</span>
                                        </motion.div>

                                        {/* Description with staggered animation */}
                                        <div className="space-y-2 mb-4">
                                            {item.description.map((desc, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: i * 0.08 + 0.2,
                                                        ease: "easeOut"
                                                    }}
                                                    className="flex items-start gap-2"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {desc}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Skills with improved animation */}
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="space-y-2">
                                                <motion.h4
                                                    className="text-xs font-medium text-foreground uppercase tracking-wide"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.3 }}
                                                >
                                                    Technologien
                                                </motion.h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.skills.map((skill, skillIndex) => (
                                                        <motion.div
                                                            key={skill}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{
                                                                duration: 0.3,
                                                                delay: skillIndex * 0.04 + 0.4,
                                                                ease: "easeOut"
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                transition: { duration: 0.15 }
                                                            }}
                                                        >
                                                            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
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