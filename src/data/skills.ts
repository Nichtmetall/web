import { SkillGroup } from '@/types'
import { Code2, Server, Cloud, Users, Blocks } from "lucide-react"

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: Code2,
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
        skills: [
            { name: "Git", years: 5 },
            { name: "Docker", years: 3 },
            { name: "CI/CD", years: 3 },
            { name: "Scrum", years: 3 },
        ],
    },
    {
        title: "Microsoft Power Platform",
        icon: Users,
        skills: [
            { name: "MS Power Platform", years: 4 },
            { name: "MS Power Apps", years: 4 },
            { name: "MS Power Automate", years: 4 },
            { name: "MS Dynamics 365", years: 4 },
            { name: "Power Apps Component Framework (PCF)", years: 3 },
        ],
    },
    {
        title: "SAP Integration",
        icon: Blocks,
        skills: [
            { name: "SAP Cloud Platform Integration (CPI)", years: 1 },
            { name: "SAP PI/PO", years: 1 },
            { name: "SAP Business Technology Platform (BTP)", years: 1 },
            { name: "GroovyScript", years: 5 },
        ],
    },
]
