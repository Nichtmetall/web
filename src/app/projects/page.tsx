"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { FolderOpen, Globe, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project/project-card"
import { projects, categories } from "@/data/projects"

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory)

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
                                <FolderOpen className="h-12 w-12 text-primary" />
                                Meine Projekte
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Eine Auswahl meiner aktuellen und abgeschlossenen Projekte
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-sm px-3 py-1">
                                    {projects.length} Projekte
                                </Badge>
                            </div>
                        </motion.div>
                    </div>

                    {/* Enhanced Category Tabs Section */}
                    <div className="max-w-6xl mx-auto">
                        <SmoothTabs
                            defaultTab="all"
                            onTabChange={setSelectedCategory}
                            className="w-full"
                            tabsClassName="mb-12"
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
                                        className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"
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

                                        {/* Enhanced Empty State */}
                                        {filteredProjects.length === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-20 col-span-full"
                                            >
                                                <div className="text-muted-foreground">
                                                    <FolderOpen className="h-16 w-16 mx-auto mb-6 opacity-50" />
                                                    <p className="text-lg">Keine Projekte in dieser Kategorie gefunden.</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )
                            }))}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
} 