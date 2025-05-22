"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Code2, Globe, Github, ExternalLink } from "lucide-react"

interface Project {
    title: string
    description: string
    details: string
    icon: React.ReactNode
    tags: string[]
    status: "active" | "completed" | "on-hold"
    githubUrl?: string
    liveUrl?: string
}

const projects: Project[] = [
    {
        title: "Projekt 1",
        description: "Eine moderne Webanwendung mit React und Next.js.",
        details: "Hier sind detaillierte Informationen zum Projekt 1.",
        icon: <Code2 className="w-6 h-6" />,
        tags: ["React", "Next.js", "TypeScript"],
        status: "active",
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        title: "Projekt 2",
        description: "Ein E-Commerce-Projekt mit Node.js und MongoDB.",
        details: "Hier sind detaillierte Informationen zum Projekt 2.",
        icon: <Globe className="w-6 h-6" />,
        tags: ["Node.js", "MongoDB", "Express"],
        status: "completed",
        githubUrl: "https://github.com"
    },
    {
        title: "Projekt 3",
        description: "Ein Dashboard-Projekt mit Tailwind CSS und Framer Motion.",
        details: "Hier sind detaillierte Informationen zum Projekt 3.",
        icon: <Code2 className="w-6 h-6" />,
        tags: ["Tailwind", "Framer Motion", "React"],
        status: "on-hold",
        githubUrl: "https://github.com"
    },
]

interface ProjectCardProps {
    project: Project
    index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-5deg", "5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
    const scale = useTransform(
        mouseXSpring,
        [-0.5, 0, 0.5],
        [1.01, 1.02, 1.01]
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
        setMousePosition({ x: mouseX, y: mouseY })
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setMousePosition({ x: 0, y: 0 })
    }

    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "active":
                return "bg-green-500/20 text-green-500"
            case "completed":
                return "bg-blue-500/20 text-blue-500"
            case "on-hold":
                return "bg-yellow-500/20 text-yellow-500"
        }
    }

    return (

        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
            }}
            className="relative"
        >
            <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 group h-[300px]">
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`
                    }}
                />
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.01), transparent 40%)`
                    }}
                />
                <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {project.icon}
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                            {project.status}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-auto">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export default function Projects() {
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
                    className="grid gap-6 grid-cols-1 md:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { 
                                    opacity: 0,
                                    scale: 0.8,
                                    rotateX: -15,
                                    y: 50
                                },
                                visible: { 
                                    opacity: 1,
                                    scale: 1,
                                    rotateX: 0,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1
                                    }
                                }
                            }}
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
} 