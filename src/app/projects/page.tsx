"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { FolderOpen, Globe, Code } from "lucide-react"

import { ProjectCard } from "@/components/project/project-card"
import { projects, categories } from "@/data/projects"

// Magic UI Components
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"

import { cn } from "@/lib/utils"

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory)

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
                                    Meine Projekte
                                </AuroraText>

                                <div className="text-xl md:text-2xl text-muted-foreground">
                                    Eine Auswahl meiner aktuellen und abgeschlossenen Projekte
                                </div>
                            </div>
                        </div>
                    </section>
                </BlurFade>

                {/* Enhanced Category Tabs Section */}
                <BlurFade delay={0.2} inView>
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
                                            <BlurFade key={project.title} delay={0.1 + index * 0.1} inView>
                                                <ProjectCard project={project} />
                                            </BlurFade>
                                        ))}

                                        {/* Enhanced Empty State */}
                                        {filteredProjects.length === 0 && (
                                            <BlurFade delay={0.1} inView>
                                                <div className="text-center py-20 col-span-full">
                                                    <div className="text-muted-foreground">
                                                        <FolderOpen className="h-16 w-16 mx-auto mb-6 opacity-50" />
                                                        <p className="text-lg">Keine Projekte in dieser Kategorie gefunden.</p>
                                                    </div>
                                                </div>
                                            </BlurFade>
                                        )}
                                    </motion.div>
                                )
                            }))}
                        />
                    </div>
                </BlurFade>
            </div>
        </main>
    )
} 