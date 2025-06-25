"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SmoothTabs } from "@/components/ui/smooth-tabs"
import { FolderOpen, Code } from "lucide-react"

import { ProjectCard } from "@/components/project/project-card"
import { projects, categories } from "@/data/projects"

// Generic UI Components
import { PageBackground } from "@/components/ui/page-background"
import { PageHeader } from "@/components/ui/page-header"
import { PageContainer } from "@/components/ui/page-container"
import { BlurFade } from "@/components/magicui/blur-fade"

import { ANIMATION_DELAYS } from "@/lib/constants"

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory)

    return (
        <PageBackground>
            <PageContainer>
                <PageHeader
                    title="Meine Projekte"
                    subtitle="Eine Auswahl meiner aktuellen und abgeschlossenen Projekte"
                    delay={ANIMATION_DELAYS.HERO}
                />

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
                                icon: Code,
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
            </PageContainer>
        </PageBackground>
    )
} 