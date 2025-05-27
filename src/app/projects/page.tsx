"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { FolderOpen, Globe, Code, MousePointer } from "lucide-react"
import { ProjectCard } from "@/components/project/project-card"
import { projects, categories } from "@/data/projects"

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory)

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
                        <FolderOpen className="h-8 w-8 text-primary" />
                        Projekte & Portfolio
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                        Eine Auswahl meiner Entwicklungsprojekte und Arbeiten
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MousePointer className="h-3 w-3" />
                            <span>Karten anklicken für Details</span>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <SmoothTabs
                    defaultTab="all"
                    onTabChange={setSelectedCategory}
                    className="w-full"
                    tabsClassName="mb-5"
                    tabs={categories.map((category) => ({
                        id: category.value,
                        label: category.label,
                        icon: category.value === "all" ? Code :
                            category.value === "web" ? Globe : Code,
                        badge: category.count,
                        content: (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid gap-6 grid-cols-1 md:grid-cols-2"
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 15
                                        }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}

                                {/* Empty state if no projects in category */}
                                {filteredProjects.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-12 col-span-full"
                                    >
                                        <div className="text-muted-foreground">
                                            <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>Keine Projekte in dieser Kategorie gefunden.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )
                    }))}
                />
            </motion.div>
        </div>
    )
} 