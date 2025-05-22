"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, GraduationCap, Award, Download, ExternalLink, ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
                        <Building2 className="h-10 w-10 text-primary" />
                        Mein Lebenslauf
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Meine berufliche Laufbahn und Ausbildung im Überblick
                    </p>
                    <Button variant="outline" className="mt-4" onClick={handleDownloadCV}>
                        <Download className="h-4 w-4 mr-2" />
                        CV als PDF herunterladen
                    </Button>
                </div>

                {/* Certifications Banner */}
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
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
                    <AnimatePresence>
                        {showCertifications && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {certifications.map((cert, index) => (
                                            <motion.div
                                                key={cert.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="group"
                                            >
                                                {cert.link ? (
                                                    <a
                                                        href={cert.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent/20 transition-all duration-300 cursor-pointer"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Award className="h-4 w-4 text-primary" />
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {cert.year}
                                                                    </Badge>
                                                                </div>
                                                                <h3 className="font-medium text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                                                                    {cert.name}
                                                                </h3>
                                                                {cert.issuer && (
                                                                    <p className="text-xs text-muted-foreground">
                                                                        von {cert.issuer}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <div className="p-4 rounded-lg border border-border/50 bg-accent/10">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Award className="h-4 w-4 text-primary" />
                                                            <Badge variant="outline" className="text-xs">
                                                                {cert.year}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-medium text-sm leading-snug mb-1">
                                                            {cert.name}
                                                        </h3>
                                                        {cert.issuer && (
                                                            <p className="text-xs text-muted-foreground">
                                                                von {cert.issuer}
                                                            </p>
                                                        )}
                                                    </div>
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
                <Tabs
                    defaultValue="experience"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className=" w-full mb-5">
                        <TabsTrigger value="experience">
                            <Building2 className="h-4 w-4" />
                            Berufserfahrung
                        </TabsTrigger>
                        <TabsTrigger value="education">
                            <GraduationCap className="h-4 w-4" />
                            Ausbildung
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="experience">
                        <div>
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
                    </TabsContent>

                    <TabsContent value="education">
                        <div>
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
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
} 