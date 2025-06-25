"use client"

import { motion } from "framer-motion"
import React from "react"
import { Award, ExternalLink, Code } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { skillGroups, certifications } from "@/data/skills"

// Generic UI Components
import { PageBackground } from "@/components/ui/page-background"
import { PageHeader } from "@/components/ui/page-header"
import { PageContainer } from "@/components/ui/page-container"
import { BlurFade } from "@/components/magicui/blur-fade"

import { ANIMATION_DELAYS } from "@/lib/constants"

export default function Skills() {
  // Calculate total skills
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0)

  return (
    <PageBackground>
      <PageContainer>
        <PageHeader
          title="Technologien & Fähigkeiten"
          subtitle="Meine technischen Kompetenzen, Spezialisierungen und Zertifizierungen"
          delay={ANIMATION_DELAYS.HERO}
        />

        {/* Zertifizierungen Section */}
        <BlurFade delay={0.15} inView>
          <section className="py-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Zertifizierungen</h2>
              <p className="text-muted-foreground mb-6">
                Meine professionellen Zertifikate und Qualifikationen
              </p>
              <Badge variant="outline" className="text-sm px-4 py-2">
                {certifications.length} Zertifikat{certifications.length !== 1 ? 'e' : ''}
              </Badge>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <BlurFade key={cert.name} delay={0.2 + index * 0.1} inView>
                    <div className="h-full">
                      {cert.link ? (
                        <motion.a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full p-4 group rounded-2xl border border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                          whileHover={{
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Certificate Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                              <Award className="h-5 w-5 text-primary" />
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
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            </motion.div>
                          </div>

                          {/* Certificate Content */}
                          <div className="space-y-3">
                            <div>
                              <Badge variant="secondary" className="mb-2 text-xs px-2 py-0.5">
                                {cert.year}
                              </Badge>
                              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors duration-300 mb-1">
                                {cert.name}
                              </h3>
                              {cert.issuer && (
                                <p className="text-sm text-muted-foreground">
                                  Ausgestellt von {cert.issuer}
                                </p>
                              )}
                            </div>

                            {/* Interactive Element */}
                            <div className="pt-2 border-t border-border/30">
                              <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                <span>Zertifikat anzeigen</span>
                                <motion.div
                                  animate={{
                                    x: [0, 4, 0]
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="ml-2"
                                >
                                  →
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ) : (
                        <div className="p-4 h-full rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Award className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Badge variant="secondary" className="mb-2 text-xs px-2 py-0.5">
                                {cert.year}
                              </Badge>
                              <h3 className="font-semibold text-base leading-tight mb-1">
                                {cert.name}
                              </h3>
                              {cert.issuer && (
                                <p className="text-sm text-muted-foreground">
                                  Ausgestellt von {cert.issuer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Modern Skills Grid */}
        <BlurFade delay={0.3} inView>
          <section className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">Technologien</h2>
              <p className="text-muted-foreground mb-8">
                Technologien und Tools, mit denen ich täglich arbeite
              </p>
              <Badge variant="outline" className="text-sm px-4 py-2">
                {totalSkills} Technologien
              </Badge>
            </div>

            <div className="space-y-12">
              {skillGroups.map((group, groupIndex) => (
                <BlurFade key={group.title} delay={0.1 + groupIndex * 0.05} inView>
                  <div className="space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                        <group.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{group.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-px bg-gradient-to-r from-border to-transparent flex-1" />
                          <Badge variant="secondary" className="text-xs px-3 py-1">
                            {group.skills.length} Skills
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {group.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            delay: groupIndex * 0.1 + index * 0.03,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 120,
                            damping: 15
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -4,
                            transition: { duration: 0.2 }
                          }}
                          className="group"
                        >
                          <div className="p-4 h-full rounded-xl border border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                            <div className="flex flex-col items-center gap-3 text-center">
                              {/* Tech Icon */}
                              <div className="h-10 w-10 flex items-center justify-center">
                                {skill.icon ? (
                                  React.createElement(skill.icon, {
                                    className: "h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                                  })
                                ) : (
                                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                                    <Code className="h-5 w-5 text-primary" />
                                  </div>
                                )}
                              </div>

                              {/* Skill Name & Experience */}
                              <div className="space-y-1">
                                <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-200 leading-tight block">
                                  {skill.name}
                                </span>
                                <Badge variant="outline" className="text-xs px-2 py-0.5 group-hover:border-primary/50 transition-colors duration-200">
                                  {skill.years} Jahr{skill.years !== 1 ? 'e' : ''}
                                </Badge>
                              </div>
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
      </PageContainer>
    </PageBackground>
  )
} 