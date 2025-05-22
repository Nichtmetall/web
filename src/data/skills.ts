import { SkillGroup, Specialization } from '@/types'
import { Code2, Server, Cloud, Users } from "lucide-react"

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Moderne Webtechnologien und Frameworks",
        skills: [
            { name: "HTML", years: 6 },
            { name: "CSS", years: 6 },
            { name: "JavaScript", years: 5 },
            { name: "React", years: 4 },
            { name: "TypeScript", years: 4 },
            { name: "Next.js", years: 4 },
            { name: "Tailwind CSS", years: 3 },
            { name: "Framer UI / Motion", years: 1 },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        description: "Server- und Datenbanktechnologien",
        skills: [
            { name: "SQL", years: 6 },
            { name: "C#", years: 5 },
            { name: ".NET", years: 5 },
            { name: "Node.js", years: 4 },
            { name: "REST APIs", years: 4 },
            { name: "Python", years: 3 },
            { name: "Java", years: 4 },
            { name: "Supabase", years: 2 },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        description: "Cloud und Infrastruktur",
        skills: [
            { name: "Git", years: 5 },
            { name: "Docker", years: 3 },
            { name: "CI/CD", years: 3 },
            { name: "AWS", years: 2 },
            { name: "Kubernetes", years: 1 },
        ],
    },
    {
        title: "Microsoft Power Platform",
        icon: Users,
        description: "Persönliche und soziale Kompetenzen",
        skills: [
            { name: "Power Apps", years: 4 },
            { name: "Power BI", years: 4 },
            { name: "Power Automate", years: 4 },
        ],
    },
]

export const specializations: Specialization[] = [
    { name: "Frontend Development", expertise: 95, trend: "up" },
    { name: "Full Stack Development", expertise: 88, trend: "up" },
    { name: "API Design", expertise: 90, trend: "stable" },
    { name: "Cloud Architecture", expertise: 75, trend: "up" },
] 