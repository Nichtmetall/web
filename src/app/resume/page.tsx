"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, GraduationCap, Award, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TimelineItem } from "@/components/timeline/timeline-item"
import { experiences, education, certifications } from "@/data/resume"

export default function Resume() {
    const [activeTab, setActiveTab] = useState("experience")

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
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Zertifizierungen
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {certifications.map((cert) => (
                                <Badge key={cert.name} variant="secondary" className="px-3 py-2">
                                    {cert.name} ({cert.year})
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
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