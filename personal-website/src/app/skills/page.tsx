"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Server, Cloud, Users } from "lucide-react"

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Moderne Webtechnologien und Frameworks",
    skills: [
      { name: "React", years: 5 },
      { name: "TypeScript", years: 4 },
      { name: "Next.js", years: 3 },
      { name: "Tailwind CSS", years: 3 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Server- und Datenbanktechnologien",
    skills: [
      { name: "Node.js", years: 4 },
      { name: "Python", years: 3 },
      { name: "SQL", years: 2 },
      { name: "REST APIs", years: 4 },
    ],
  },
  {
    title: "DevOps",
    icon: Cloud,
    description: "Cloud und Infrastruktur",
    skills: [
      { name: "Docker", years: 3 },
      { name: "AWS", years: 2 },
      { name: "CI/CD", years: 3 },
      { name: "Git", years: 5 },
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    description: "Persönliche und soziale Kompetenzen",
    skills: [
      { name: "Teamarbeit", years: 8 },
      { name: "Kommunikation", years: 6 },
      { name: "Problemlösung", years: 7 },
      { name: "Projektmanagement", years: 5 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const maxYears = Math.max(...skillGroups.flatMap(group => group.skills.map(skill => skill.years)))

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Anton Hofmann
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Full Stack Entwickler mit Fokus auf moderne Webtechnologien und benutzerfreundliche Anwendungen
        </p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/60 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <group.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{group.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.years} Jahre</span>
                        </div>
                        <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${(skill.years / maxYears) * 100}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
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