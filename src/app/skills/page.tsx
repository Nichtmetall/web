"use client"

import { motion } from "framer-motion"
import React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Code
} from "lucide-react"
import { skillGroups } from "@/data/skills"


// Magic UI Components
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"

import { cn } from "@/lib/utils"

export default function Skills() {
  // Calculate total skills
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0)

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
                  Technologien & Fähigkeiten
                </AuroraText>

                <div className="text-xl md:text-2xl text-muted-foreground">
                  Meine technischen Kompetenzen und Spezialisierungen
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Modern Skills Grid */}
        <BlurFade delay={0.2} inView>
          <section className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">Tech Stack</h2>
              <p className="text-muted-foreground mb-8">
                Technologien, mit denen ich arbeite
              </p>
              <Badge variant="outline" className="text-sm px-4 py-2">
                {totalSkills} Technologien
              </Badge>
            </div>

            <div className="space-y-8">
              {skillGroups.map((group, groupIndex) => (
                <BlurFade key={group.title} delay={0.1 + groupIndex * 0.05} inView>
                  <div className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <group.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{group.title}</h3>
                      <div className="flex-1 h-px bg-border" />
                      <Badge variant="secondary" className="text-xs">
                        {group.skills.length}
                      </Badge>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {group.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: groupIndex * 0.1 + index * 0.02,
                            duration: 0.3,
                            type: "spring",
                            stiffness: 150,
                            damping: 15
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          className="group"
                        >
                          <div className="p-4 h-full rounded-xl border border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm transition-all duration-300">
                                                          <div className="flex flex-col items-center gap-3 text-center">
                                {/* Tech Icon */}
                                <div className="h-8 w-8 flex items-center justify-center">
                                  {skill.icon ? (
                                    React.createElement(skill.icon, { 
                                      className: "h-8 w-8 transition-transform duration-200 group-hover:scale-110" 
                                    })
                                  ) : (
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                                      <Code className="h-4 w-4 text-primary" />
                                    </div>
                                  )}
                                </div>
                                
                                {/* Skill Name */}
                                <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors duration-200 leading-tight">
                                  {skill.name}
                                </span>
                              </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>
        </BlurFade>
      </div>
    </main>
  )
} 