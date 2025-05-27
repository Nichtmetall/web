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
    const [activeTab, setActiveTab] = useState("experience")
    const [showCertifications, setShowCertifications] = useState(true)

    const handleDownloadCV = () => {
        // Create a link element to trigger download
        const link = document.createElement('a')
        link.href = '/cv-anton-hofmann.pdf' // Path to CV file in public folder
        link.download = 'Anton_Hofmann_CV.pdf' // Downloaded filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* Minimalistic Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        Lebenslauf
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                        Meine berufliche Laufbahn und Ausbildung
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MousePointer className="h-3 w-3" />
                            <span>Karten anklicken für Details</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleDownloadCV} className="h-7 text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                        </Button>
                    </div>
                </div>

                {/* Certifications Banner */}
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Award className="h-4 w-4" />
                                Zertifizierungen
                                <Badge variant="outline" className="ml-2 text-xs">
                                    {certifications.length}
                                </Badge>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCertifications(!showCertifications)}
                                className="h-8 w-8 p-0 hover:bg-primary/10"
                            >
                                <motion.div
                                    animate={{ rotate: showCertifications ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="h-4 w-4" />
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
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
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
                                                        className="relative block p-4 rounded-lg border border-border/50 hover:border-primary/30 bg-gradient-to-br from-background via-background to-accent/5 cursor-pointer overflow-hidden"
                                                        whileHover={{
                                                            y: -2,
                                                            scale: 1.02,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {/* Oily shimmer effect overlay */}
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

                                                        {/* Moving shimmer band */}
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
                                                                    <div className="flex items-center gap-2 mb-2">
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
                                                                            <Award className="h-4 w-4 text-primary" />
                                                                        </motion.div>
                                                                        <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                                                                            {cert.year}
                                                                        </Badge>
                                                                    </div>
                                                                    <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
                                                                        {cert.name}
                                                                    </h3>
                                                                    {cert.issuer && (
                                                                        <p className="text-xs text-muted-foreground/80">
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
                                                                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 ml-2" />
                                                                </motion.div>
                                                            </div>
                                                        </div>

                                                        {/* Subtle glow effect */}
                                                        <motion.div
                                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
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
                                                        className="relative p-4 rounded-lg border border-border/50 bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden"
                                                        whileHover={{
                                                            y: -1,
                                                            scale: 1.01,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                    >
                                                        <div className="relative z-10">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Award className="h-4 w-4 text-primary" />
                                                                <Badge variant="outline" className="text-xs">
                                                                    {cert.year}
                                                                </Badge>
                                                            </div>
                                                            <h3 className="font-semibold text-sm leading-snug mb-2">
                                                                {cert.name}
                                                            </h3>
                                                            {cert.issuer && (
                                                                <p className="text-xs text-muted-foreground/80">
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

                {/* Main Tabs */}
                <SmoothTabs
                    defaultTab="experience"
                    onTabChange={setActiveTab}
                    className="w-full"
                    tabsClassName="mb-5"
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
                                            key={experience.title}
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
                                            key={edu.title}
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
            </motion.div>
        </div>
    )
} 