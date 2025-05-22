"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderOpen, Globe, Code } from "lucide-react"
import { ProjectCard } from "@/components/project/project-card"
import { projects, categories } from "@/data/projects"
import { KPIHeader, STAT_ICONS } from "@/components/stats"

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory)

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
                        <FolderOpen className="h-10 w-10 text-primary" />
                        Meine Projekte
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Eine Auswahl meiner Entwicklungsprojekte
                    </p>
                </div>

                {/* Project Statistics */}
                <KPIHeader
                    stats={[
                        {
                            label: "Projekte",
                            value: projects.length,
                            icon: STAT_ICONS.projects
                        },
                        {
                            label: "Technologien",
                            value: new Set(projects.flatMap(p => p.tags)).size,
                            icon: Code
                        },
                        {
                            label: "Öffentlich",
                            value: projects.filter(p => p.status === "public").length,
                            icon: Globe
                        }
                    ]}
                />

                {/* Category Tabs */}
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                    <TabsList className="w-full">
                        {categories.map((category) => (
                            <TabsTrigger key={category.value} value={category.value}>
                                {category.label}
                                <Badge variant="secondary">
                                    {category.count}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => (
                        <TabsContent key={category.value} value={category.value} className="mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid gap-6 grid-cols-1 md:grid-cols-2"
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>
        </div>
    )
} 