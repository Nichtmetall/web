import { SkillGroup, Specialization } from '@/types'
import { Code2, Server, Cloud, Users } from "lucide-react"

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Moderne Webtechnologien und Frameworks",
        skills: [
            { name: "React", years: 5, level: 95 },
            { name: "TypeScript", years: 4, level: 90 },
            { name: "Next.js", years: 3, level: 85 },
            { name: "Tailwind CSS", years: 3, level: 88 },
            { name: "JavaScript", years: 6, level: 98 },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        description: "Server- und Datenbanktechnologien",
        skills: [
            { name: "Node.js", years: 4, level: 85 },
            { name: "Python", years: 3, level: 80 },
            { name: "SQL", years: 5, level: 90 },
            { name: "REST APIs", years: 4, level: 92 },
            { name: "GraphQL", years: 2, level: 75 },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        description: "Cloud und Infrastruktur",
        skills: [
            { name: "Docker", years: 3, level: 85 },
            { name: "AWS", years: 2, level: 78 },
            { name: "CI/CD", years: 3, level: 88 },
            { name: "Git", years: 5, level: 95 },
            { name: "Kubernetes", years: 1, level: 65 },
        ],
    },
    {
        title: "Soft Skills",
        icon: Users,
        description: "Persönliche und soziale Kompetenzen",
        skills: [
            { name: "Teamarbeit", years: 8, level: 95 },
            { name: "Kommunikation", years: 6, level: 90 },
            { name: "Problemlösung", years: 7, level: 92 },
            { name: "Projektmanagement", years: 5, level: 85 },
            { name: "Mentoring", years: 3, level: 82 },
        ],
    },
]

export const specializations: Specialization[] = [
    { name: "Frontend Development", expertise: 95, trend: "up" },
    { name: "Full Stack Development", expertise: 88, trend: "up" },
    { name: "API Design", expertise: 90, trend: "stable" },
    { name: "Cloud Architecture", expertise: 75, trend: "up" },
] 