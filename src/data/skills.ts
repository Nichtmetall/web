import { SkillGroup } from '@/types'
import { Code2, Server, Cloud } from "lucide-react"

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: Code2,
        skills: [
            { name: "HTML", years: 6, icon: "html5" },
            { name: "CSS", years: 6, icon: "css3" },
            { name: "JavaScript", years: 5, icon: "js" },
            { name: "React", years: 4, icon: "react" },
            { name: "TypeScript", years: 4, icon: "typescript" },
            { name: "Next.js", years: 4, icon: "nextjs2" },
            { name: "Tailwind CSS", years: 3, icon: "tailwindcss" },
            { name: "Framer UI / Motion", years: 1, icon: "framer" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        skills: [
            { name: "SQL", years: 6, icon: "mysql" },
            { name: "C#", years: 5, icon: "csharp" },
            { name: ".NET", years: 5, icon: "net" },
            { name: "Node.js", years: 4, icon: "nodejs" },
            { name: "REST APIs", years: 4, icon: "postman" },
            { name: "Python", years: 3, icon: "python" },
            { name: "Java", years: 4, icon: "java" },
            { name: "Supabase", years: 2, icon: "supabase" },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        skills: [
            { name: "Git", years: 5, icon: "git" },
            { name: "Docker", years: 3, icon: "docker" },
            { name: "CI/CD", years: 3, icon: "azure" },
            { name: "Scrum", years: 3, icon: "jira" },
        ],
    },
]
