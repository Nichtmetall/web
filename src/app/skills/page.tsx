"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Zap, TrendingUp, Clock, Star as StarIcon, MousePointer } from "lucide-react"
import { skillGroups } from "@/data/skills"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
}

// Helper function for badge variants based on years
const getSkillBadgeVariant = (years: number) => {
  if (years >= 5) return "default" // Expert level skills
  if (years >= 3) return "secondary" // Solid skills
  return "outline" // Basic knowledge
}

const getSkillBadgeColor = (years: number) => {
  if (years >= 5) return "bg-green-500/10 text-green-600 border-green-300 hover:bg-green-500/20"
  if (years >= 3) return "bg-blue-500/10 text-blue-600 border-blue-300 hover:bg-blue-500/20"
  return "bg-gray-500/10 text-gray-600 border-gray-300 hover:bg-gray-500/20"
}

const getExperienceLevel = (years: number) => {
  if (years >= 5) return { icon: StarIcon, color: "text-green-600" }
  if (years >= 3) return { icon: TrendingUp, color: "text-blue-600" }
  return { icon: Clock, color: "text-gray-600" }
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            <Zap className="h-8 w-8 text-primary" />
            Technologien & Fähigkeiten
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Technologien und Kompetenzen, mit denen ich arbeite
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MousePointer className="h-3 w-3" />
              <span>Hover für Details</span>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full border border-border/50 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 bg-background/95 backdrop-blur-sm overflow-hidden">
                {/* Card Header with Icon and Description */}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <group.icon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {group.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        {group.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {group.skills.length} Skills
                    </Badge>
                  </div>
                </CardHeader>

                {/* Card Content with Skills */}
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {[...group.skills].sort((a, b) => b.years - a.years).map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + (groupIndex * 0.1) + (index * 0.05)
                        }}
                        className="group/skill"
                      >
                        <motion.div
                          className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                          whileHover={{
                            y: -1,
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const experience = getExperienceLevel(skill.years)
                                return (
                                  <motion.div
                                    animate={{
                                      rotate: [0, 3, -3, 0],
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    <experience.icon className={`h-4 w-4 ${experience.color}`} />
                                  </motion.div>
                                )
                              })()}
                              <span className="font-medium text-foreground">{skill.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant={getSkillBadgeVariant(skill.years)}
                              className={`text-xs font-medium ${getSkillBadgeColor(skill.years)}`}
                            >
                              {skill.years} {skill.years === 1 ? 'Jahr' : 'Jahre'}
                            </Badge>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Subtle summary at bottom */}
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {group.skills.reduce((sum, skill) => sum + skill.years, 0)} Jahre Erfahrung
                      </span>
                      <span>
                        ⌀ {Math.round(group.skills.reduce((sum, skill) => sum + skill.years, 0) / group.skills.length)} Jahre
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
} 