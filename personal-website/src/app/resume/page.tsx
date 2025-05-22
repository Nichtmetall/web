"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineCard } from "@/components/timeline-card"

const experiences = [
    {
        title: "Senior Full Stack Entwickler",
        subtitle: "Tech Company GmbH",
        location: "München",
        period: "2022 - Heute",
        description: [
            "Entwicklung und Wartung von modernen Webanwendungen mit React und Node.js",
            "Implementierung von CI/CD-Pipelines und DevOps-Praktiken",
            "Mentoring von Junior-Entwicklern und Code-Reviews",
            "Optimierung der Anwendungsperformance und Skalierbarkeit",
        ],
    },
    {
        title: "Full Stack Entwickler",
        subtitle: "Digital Solutions AG",
        location: "Berlin",
        period: "2020 - 2022",
        description: [
            "Entwicklung von RESTful APIs und Microservices",
            "Implementierung von Frontend-Komponenten mit React",
            "Datenbankdesign und -optimierung",
            "Agile Entwicklung in Scrum-Teams",
        ],
    },
    {
        title: "Junior Entwickler",
        subtitle: "Startup Innovations",
        location: "Hamburg",
        period: "2018 - 2020",
        description: [
            "Entwicklung von Webanwendungen mit JavaScript und PHP",
            "Responsive Design und Frontend-Entwicklung",
            "Integration von Drittanbieter-APIs",
            "Bugfixing und Wartung bestehender Systeme",
        ],
    },
]

const education = [
    {
        title: "Master of Science in Informatik",
        subtitle: "Technische Universität München",
        location: "München",
        period: "2016 - 2018",
        description: [
            "Schwerpunkt: Software Engineering und Webtechnologien",
            "Abschlussarbeit: Entwicklung einer skalierbaren Cloud-Architektur",
        ],
    },
    {
        title: "Bachelor of Science in Informatik",
        subtitle: "Universität Hamburg",
        location: "Hamburg",
        period: "2012 - 2016",
        description: [
            "Grundlagen der Informatik und Programmierung",
            "Praktikum bei einem Softwareunternehmen",
        ],
    },
]

export default function Resume() {
    const [activeTab, setActiveTab] = useState("experience")

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Anton Hofmann
                </h1>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    Full Stack Entwickler mit Fokus auf moderne Webtechnologien und benutzerfreundliche Anwendungen
                </p>

                <Tabs
                    defaultValue="experience"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="experience" className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Berufserfahrung
                        </TabsTrigger>
                        <TabsTrigger value="education" className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Ausbildung
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="experience" className="space-y-6">
                        {experiences.map((experience, index) => (
                            <TimelineCard key={experience.title} item={experience} index={index} />
                        ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6">
                        {education.map((edu, index) => (
                            <TimelineCard key={edu.title} item={edu} index={index} />
                        ))}
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
} 