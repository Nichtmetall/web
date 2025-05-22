"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, TrendingUp, Zap } from "lucide-react"
import { skillGroups, specializations } from "@/data/skills"

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

        {/* Specializations Overview */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Kernkompetenzen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specializations.map((spec) => (
                <div key={spec.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{spec.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{spec.expertise}%</span>
                      <TrendingUp className={`h-4 w-4 ${spec.trend === 'up' ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <Progress value={spec.expertise} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              <Card className="h-full border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 group">
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

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {group.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.years} Jahre
                          </Badge>
                        </div>

                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: "100%" } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="relative"
                        >
                          <Progress
                            value={skill.level}
                            className="h-3"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  <Separator className="my-6" />

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
                        {Math.round(group.skills.reduce((sum, skill) => sum + skill.level, 0) / group.skills.length)}%
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
} 