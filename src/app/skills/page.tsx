"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Clock, 
  MousePointer, 
  Zap
} from "lucide-react"
import { skillGroups } from "@/data/skills"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const skillItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function Skills() {
  const skillsRef = useRef(null)
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" })

  // Calculate total skills and average experience
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0)
  const totalExperience = skillGroups.reduce((sum, group) => 
    sum + group.skills.reduce((groupSum, skill) => groupSum + skill.years, 0), 0
  )
  const averageExperience = Math.round(totalExperience / totalSkills)

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
                <Code className="h-12 w-12 text-primary" />
                Technologien & Fähigkeiten
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Meine technischen Kompetenzen und Spezialisierungen
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
                  {totalSkills} Fähigkeiten
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  ⌀ {averageExperience} Jahre
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Skills Grid with Better Spacing */}
          <motion.div
            ref={skillsRef}
            variants={containerVariants}
            initial="hidden"
            animate={isSkillsInView ? "visible" : "hidden"}
            className="grid gap-8 grid-cols-1 xl:grid-cols-2 max-w-7xl mx-auto"
          >
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-background/80 backdrop-blur-sm overflow-hidden">
                  {/* Enhanced Card Header with More Padding */}
                  <CardHeader className="pb-6 px-8 pt-8 relative overflow-hidden">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
                        ],
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 3
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <group.icon className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-semibold text-foreground mb-2">
                            {group.title}
                          </CardTitle>
                        </div>
                        <Badge variant="outline" className="text-sm px-3 py-1">
                          {group.skills.length}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Enhanced Skills List with Better Spacing */}
                  <CardContent className="pt-0 px-8 pb-8">
                    <motion.div
                      variants={containerVariants}
                      className="space-y-3"
                    >
                      {[...group.skills]
                        .sort((a, b) => b.years - a.years)
                        .map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            variants={skillItemVariants}
                            transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                            className="group/skill"
                          >
                            <motion.div
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 border border-border/50 hover:border-primary/20 hover:shadow-md"
                              whileHover={{
                                x: 4,
                                transition: { duration: 0.2 }
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-foreground group-hover/skill:text-primary transition-colors duration-200 text-sm">
                                  {skill.name}
                                </span>
                              </div>

                              <Badge
                                variant="outline"
                                className="text-xs font-medium transition-all duration-200 px-2 py-0.5 bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                              >
                                {skill.years} {skill.years === 1 ? 'Jahr' : 'Jahre'}
                              </Badge>
                            </motion.div>
                          </motion.div>
                        ))}
                    </motion.div>

                    {/* Enhanced Summary Footer with More Spacing */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + groupIndex * 0.2 }}
                      className="mt-8 pt-6 border-t border-border/30"
                    >
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <Zap className="h-4 w-4" />
                          <span>
                            {group.skills.reduce((sum, skill) => sum + skill.years, 0)} Jahre
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4" />
                          <span>
                            ⌀ {Math.round(group.skills.reduce((sum, skill) => sum + skill.years, 0) / group.skills.length)} Jahre
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 