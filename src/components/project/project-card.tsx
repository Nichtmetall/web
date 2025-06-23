"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MagicCard } from "@/components/magicui/magic-card"
import { Code2, Globe, Github, ExternalLink, Lock, Unlock, Calendar, Server, Smartphone, Database, Layers } from "lucide-react"
import { ProjectCardProps } from "@/types"

export function ProjectCard({ project }: Omit<ProjectCardProps, 'index'>) {
    const ref = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-5deg", "5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
    const scale = useTransform(mouseXSpring, [-0.5, 0, 0.5], [1.01, 1.02, 1.01])

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "public":
                return "bg-green-500/20 text-green-500"
            case "private":
                return "bg-orange-500/20 text-orange-500"
            default:
                return "bg-gray-500/20 text-gray-500"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "public":
                return <Unlock className="w-3 h-3" />
            case "private":
                return <Lock className="w-3 h-3" />
            default:
                return null
        }
    }

    const getIconComponent = (iconName: string, category: string) => {
        // First try to use the provided icon name
        switch (iconName) {
            case "Globe":
                return <Globe className="w-6 h-6" />
            case "Code2":
                return <Code2 className="w-6 h-6" />
            case "Server":
                return <Server className="w-6 h-6" />
            case "Smartphone":
                return <Smartphone className="w-6 h-6" />
            case "Database":
                return <Database className="w-6 h-6" />
            case "Layers":
                return <Layers className="w-6 h-6" />
            default:
                // If no specific icon, fall back to category-based icon
                switch (category) {
                    case "fullstack":
                        return <Layers className="w-6 h-6" />
                    case "web":
                        return <Globe className="w-6 h-6" />
                    case "mobile":
                        return <Smartphone className="w-6 h-6" />
                    case "backend":
                        return <Server className="w-6 h-6" />
                    default:
                        return <Code2 className="w-6 h-6" />
                }
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
            <MagicCard className="h-auto min-h-[320px] py-6 rounded-lg">
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`
                        }}
                    />

                    <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {getIconComponent(project.icon, project.category)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg mb-1">{project.title}</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {project.year}
                                    </div>
                                </div>
                            </div>

                            <Badge className={getStatusColor(project.status)}>
                                <div className="flex items-center gap-1">
                                    {getStatusIcon(project.status)}
                                    {project.status}
                                </div>
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                        </p>

                        <Separator />

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-auto pt-4">
                            {project.githubUrl && (
                                <Button variant="outline" size="sm" asChild className="z-10">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-4 h-4 mr-1" />
                                        Code
                                    </a>
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button variant="outline" size="sm" asChild className="z-10">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Live
                                    </a>
                                </Button>
                            )}
                        </div>
                    </CardContent>
            </MagicCard>
        </motion.div>
    )
} 