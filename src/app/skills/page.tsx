"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Zap, TrendingUp, Clock, Star as StarIcon } from "lucide-react"
import { skillGroups } from "@/data/skills"
import { KPIHeader, STAT_ICONS } from "@/components/stats"

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

// Hilfsfunktion für Badge-Varianten basierend auf Jahren
const getSkillBadgeVariant = (years: number) => {
  if (years >= 5) return "default" // Hochkarätige Skills
  if (years >= 3) return "secondary" // Solide Skills
  return "outline" // Grundkenntnisse
}

const getSkillBadgeColor = (years: number) => {
  if (years >= 5) return "text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
  if (years >= 3) return "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100"
  return "text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100"
}

const getExperienceLevel = (years: number) => {
  if (years >= 5) return { icon: StarIcon }
  if (years >= 3) return { icon: TrendingUp }
  return { icon: Clock }
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Zap className="h-10 w-10 text-primary" />
            Meine Fähigkeiten
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technologien und Kompetenzen, mit denen ich arbeite
          </p>
        </div>

        {/* Skills Statistics */}
        <KPIHeader
          stats={[
            {
              label: "Skills",
              value: skillGroups.reduce((sum, group) => sum + group.skills.length, 0),
              icon: STAT_ICONS.skills
            },
            {
              label: "Durchschnitt",
              value: Math.round(skillGroups.reduce((sum, group) => sum + group.skills.reduce((sum, skill) => sum + skill.years, 0), 0) / skillGroups.reduce((sum, group) => sum + group.skills.length, 0)),
              icon: STAT_ICONS.average,
              suffix: " Jahre"
            },
            {
              label: "Gesamte Jahre",
              value: skillGroups.reduce((sum, group) => sum + group.skills.reduce((sum, skill) => sum + skill.years, 0), 0),
              icon: STAT_ICONS.total
            }
          ]}
        />

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants}>
              <Card className="h-full border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 group flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <group.icon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{group.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col flex-grow">
                  <div className="space-y-4">
                    {[...group.skills].sort((a, b) => b.years - a.years).map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="group/skill"
                      >
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-accent/20 transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const experience = getExperienceLevel(skill.years)
                                return <experience.icon className="h-4 w-4 text-muted-foreground" />
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
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <Separator className="mb-6" />

                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-primary">
                          {group.skills.reduce((sum, skill) => sum + skill.years, 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Jahre</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-primary">
                          {Math.round(group.skills.reduce((sum, skill) => sum + skill.years, 0) / group.skills.length)}
                        </p>
                        <p className="text-xs text-muted-foreground">Durchschnitt</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-primary">
                          {group.skills.length}
                        </p>
                        <p className="text-xs text-muted-foreground">Skills</p>
                      </div>
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