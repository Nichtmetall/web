"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, GraduationCap, Award, Download, ExternalLink, ChevronDown, MousePointer, FileText } from "lucide-react"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TimelineItem } from "@/components/timeline/timeline-item"
import { experiences, education, certifications } from "@/data/resume"

export default function Resume() {
    const [showCertifications, setShowCertifications] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
            <div className="container mx-auto px-6 py-16 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-16"
                >
                    {/* Enhanced Header with More Whitespace */}
                    <div className="text-center space-y-6 py-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-5xl font-bold text-foreground flex items-center justify-center gap-4 mb-6">
                                <FileText className="h-12 w-12 text-primary" />
                                Lebenslauf
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Meine berufliche Laufbahn und Ausbildung
                            </p>
                        </motion.div>
                    </div>

                    {/* Enhanced Certifications Section */}
                    <div className="max-w-6xl mx-auto">
                        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 shadow-xl backdrop-blur-sm">
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
                                            transition={{ duration: 0.2 }}
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
                                                    <motion.div
                                                        key={cert.name}
                                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: index * 0.15,
                                                            type: "spring",
                                                            stiffness: 120,
                                                            damping: 15
                                                        }}
                                                        className="group"
                                                    >
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
                                                                {/* Enhanced shimmer effects */}
                                                                <motion.div
                                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                                                    initial={false}
                                                                    animate={{
                                                                        background: [
                                                                            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                                                                            "linear-gradient(45deg, transparent 30%, rgba(59,130,246,0.15) 50%, transparent 70%)",
                                                                            "linear-gradient(45deg, transparent 30%, rgba(168,85,247,0.1) 50%, transparent 70%)",
                                                                            "linear-gradient(45deg, transparent 30%, rgba(236,72,153,0.1) 50%, transparent 70%)",
                                                                            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
                                                                        ]
                                                                    }}
                                                                    transition={{
                                                                        duration: 3,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut"
                                                                    }}
                                                                />

                                                                <motion.div
                                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                                                    animate={{
                                                                        background: [
                                                                            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)",
                                                                            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)"
                                                                        ],
                                                                        x: ["-100%", "100%"]
                                                                    }}
                                                                    transition={{
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut",
                                                                        repeatDelay: 1
                                                                    }}
                                                                />

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
                                                                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 ml-3" />
                                                                        </motion.div>
                                                                    </div>
                                                                </div>

                                                                <motion.div
                                                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                                                                    style={{
                                                                        background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 60%)"
                                                                    }}
                                                                    animate={{
                                                                        scale: [1, 1.1, 1],
                                                                        opacity: [0, 0.3, 0]
                                                                    }}
                                                                    transition={{
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut"
                                                                    }}
                                                                />
                                                            </motion.a>
                                                        ) : (
                                                            <motion.div
                                                                className="relative p-6 rounded-xl border border-border/50 bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden"
                                                                whileHover={{
                                                                    y: -2,
                                                                    scale: 1.01,
                                                                    transition: { duration: 0.2 }
                                                                }}
                                                            >
                                                                <div className="relative z-10">
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <Award className="h-5 w-5 text-primary" />
                                                                        <Badge variant="outline" className="text-sm px-3 py-1">
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
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </div>

                    {/* Enhanced Main Tabs Section */}
                    <div className="max-w-6xl mx-auto">
                        <SmoothTabs
                            defaultTab="experience"
                            className="w-full"
                            tabsClassName="mb-8"
                            tabs={[
                                {
                                    id: "experience",
                                    label: "Berufserfahrung",
                                    icon: Building2,
                                    badge: experiences.length,
                                    content: (
                                        <div className="space-y-0">
                                            {experiences.map((experience, index) => (
                                                <TimelineItem
                                                    key={experience.id}
                                                    item={experience}
                                                    index={index}
                                                    type="experience"
                                                    totalItems={experiences.length}
                                                />
                                            ))}
                                        </div>
                                    )
                                },
                                {
                                    id: "education",
                                    label: "Ausbildung",
                                    icon: GraduationCap,
                                    badge: education.length,
                                    content: (
                                        <div className="space-y-0">
                                            {education.map((edu, index) => (
                                                <TimelineItem
                                                    key={edu.id}
                                                    item={edu}
                                                    index={index}
                                                    type="education"
                                                    totalItems={education.length}
                                                />
                                            ))}
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
} 