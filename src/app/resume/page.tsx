"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, GraduationCap, Award, ExternalLink, ChevronDown } from "lucide-react"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TimelineItem } from "@/components/timeline/timeline-item"
import { experiences, education, certifications } from "@/data/resume"

// Magic UI Components
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"

import { cn } from "@/lib/utils"

export default function Resume() {
    const [showCertifications, setShowCertifications] = useState(false)

    return (
        <main className="relative min-h-screen">
            {/* Glowing Dot Pattern Background */}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                    "fixed inset-0 -z-10 opacity-50"
                )}
                width={20}
                height={20}
            />

            {/* Glow Effect Overlay */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20" />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <BlurFade delay={0.1}>
                    <section className="text-center py-16 md:py-24">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <AuroraText className="text-4xl md:text-6xl font-bold">
                                    Lebenslauf
                                </AuroraText>

                                <div className="text-xl md:text-2xl text-muted-foreground">
                                    Meine berufliche Laufbahn und Ausbildung
                                </div>
                            </div>
                        </div>
                    </section>
                </BlurFade>

                {/* Enhanced Certifications Section */}
                <BlurFade delay={0.2} inView>
                    <div className="max-w-6xl mx-auto mb-12">
                        <MagicCard className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 shadow-xl backdrop-blur-sm rounded-lg">
                            <CardHeader className="pb-4 px-8 pt-8">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-2xl">
                                        <Award className="h-6 w-6" />
                                        Zertifizierungen
                                        <Badge variant="outline" className="ml-3 text-sm px-3 py-1">
                                            {certifications.length}
                                        </Badge>
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowCertifications(!showCertifications)}
                                        className="h-10 w-10 p-0 hover:bg-primary/10 rounded-full"
                                    >
                                        <motion.div
                                            animate={{ rotate: showCertifications ? 180 : 0 }}
                                        >
                                            <ChevronDown className="h-5 w-5" />
                                        </motion.div>
                                    </Button>
                                </div>
                            </CardHeader>
                            <AnimatePresence mode="wait">
                                {showCertifications && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                            scale: 0.95,
                                            y: -20
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                            scale: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            scale: 0.95,
                                            y: -20,
                                            transition: { duration: 0.3, ease: "easeInOut" }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                            opacity: { duration: 0.3 },
                                            scale: { duration: 0.4 }
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <CardContent className="pt-0 px-8 pb-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                                {certifications.map((cert, index) => (
                                                    <BlurFade key={cert.name} delay={0.1 + index * 0.05} inView>
                                                        {cert.link ? (
                                                            <motion.a
                                                                href={cert.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="relative block p-6 rounded-xl border border-border/50 hover:border-primary/30 bg-gradient-to-br from-background via-background to-accent/5 cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                                                                whileHover={{
                                                                    y: -4,
                                                                    scale: 1.02,
                                                                    transition: { duration: 0.2 }
                                                                }}
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                <div className="relative z-10">
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-3 mb-3">
                                                                                <motion.div
                                                                                    animate={{
                                                                                        rotate: [0, 5, -5, 0],
                                                                                        scale: [1, 1.1, 1]
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 2,
                                                                                        repeat: Infinity,
                                                                                        ease: "easeInOut"
                                                                                    }}
                                                                                >
                                                                                    <Award className="h-5 w-5 text-primary" />
                                                                                </motion.div>
                                                                                <Badge variant="outline" className="text-sm bg-primary/10 border-primary/30 px-3 py-1">
                                                                                    {cert.year}
                                                                                </Badge>
                                                                            </div>
                                                                            <h3 className="font-semibold text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
                                                                                {cert.name}
                                                                            </h3>
                                                                            {cert.issuer && (
                                                                                <p className="text-sm text-muted-foreground/80">
                                                                                    {cert.issuer}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <motion.div
                                                                            animate={{
                                                                                x: [0, 2, 0],
                                                                                y: [0, -1, 0]
                                                                            }}
                                                                            transition={{
                                                                                duration: 2,
                                                                                repeat: Infinity,
                                                                                ease: "easeInOut"
                                                                            }}
                                                                        >
                                                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                                        </motion.div>
                                                                    </div>
                                                                </div>
                                                            </motion.a>
                                                        ) : (
                                                            <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-background via-background to-accent/5">
                                                                <div className="flex items-center gap-3 mb-3">
                                                                    <Award className="h-5 w-5 text-primary" />
                                                                    <Badge variant="outline" className="text-sm bg-primary/10 border-primary/30 px-3 py-1">
                                                                        {cert.year}
                                                                    </Badge>
                                                                </div>
                                                                <h3 className="font-semibold text-base leading-snug mb-3">
                                                                    {cert.name}
                                                                </h3>
                                                                {cert.issuer && (
                                                                    <p className="text-sm text-muted-foreground/80">
                                                                        {cert.issuer}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </BlurFade>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </MagicCard>
                    </div>
                </BlurFade>

                {/* Tabs Section */}
                <BlurFade delay={0.3} inView>
                    <div className="max-w-6xl mx-auto">
                        <SmoothTabs
                            defaultTab="experience"
                            className="w-full"
                            tabsClassName="mb-12"
                            tabs={[
                                {
                                    id: "experience",
                                    label: "Berufserfahrung",
                                    icon: Building2,
                                    content: (
                                        <div className="relative">
                                            {/* Continuous vertical timeline line */}
                                            <motion.div 
                                                className="absolute left-3 top-0 bottom-0 w-0.5 origin-top"
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.2,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                            >
                                                <div className="h-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 rounded-full" />
                                                {/* Animated glow effect */}
                                                <motion.div
                                                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/30 to-transparent blur-sm rounded-full"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: [0.2, 0.4, 0.2],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: 1.7,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </motion.div>
                                            <div className="space-y-6">
                                                {experiences.map((experience, index) => (
                                                    <BlurFade key={experience.id} delay={0.1 + index * 0.1} inView>
                                                        <TimelineItem
                                                            item={experience}
                                                            index={index}
                                                            type="experience"
                                                            totalItems={experiences.length}
                                                        />
                                                    </BlurFade>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    id: "education",
                                    label: "Ausbildung",
                                    icon: GraduationCap,
                                    content: (
                                        <div className="relative">
                                            {/* Continuous vertical timeline line */}
                                            <motion.div 
                                                className="absolute left-3 top-0 bottom-0 w-0.5 origin-top"
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.2,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                            >
                                                <div className="h-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 rounded-full" />
                                                {/* Animated glow effect */}
                                                <motion.div
                                                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/30 to-transparent blur-sm rounded-full"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: [0.2, 0.4, 0.2],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: 1.7,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </motion.div>
                                            <div className="space-y-6">
                                                {education.map((edu, index) => (
                                                    <BlurFade key={edu.id} delay={0.1 + index * 0.1} inView>
                                                        <TimelineItem
                                                            item={edu}
                                                            index={index}
                                                            type="education"
                                                            totalItems={education.length}
                                                        />
                                                    </BlurFade>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                </BlurFade>
            </div>
        </main>
    )
} 