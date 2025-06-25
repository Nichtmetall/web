import { SkillGroup, Certification } from '@/types'
import { Code2, Server, Cloud, Award } from "lucide-react"
import {
    HTML5,
    CSS3,
    JavaScript,
    React as ReactIcon,
    TypeScript,
    NextJs,
    TailwindCSS,
    Framer,
    MySQL,
    CSharp,
    NodeJs,
    Postman,
    Python,
    Java,
    Supabase,
    Git,
    Docker,
    Azure,
    Jira,
    HeadlessUI,
    JQuery,
    MongoDB,
    NPM,
    Prisma,
    RadixUI,
    ShadcnUI,
    Swagger,
    VisualBasic,
    VercelDark,
    ViteJS,
    Vitest,
    Webpack,
    WordPress
} from 'developer-icons'

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: Code2,
        skills: [
            { name: "HTML", years: 6, icon: HTML5 },
            { name: "CSS", years: 6, icon: CSS3 },
            { name: "JavaScript", years: 5, icon: JavaScript },
            { name: "React", years: 4, icon: ReactIcon },
            { name: "TypeScript", years: 4, icon: TypeScript },
            { name: "Next.js", years: 4, icon: NextJs },
            { name: "Tailwind CSS", years: 3, icon: TailwindCSS },
            { name: "Framer UI / Motion", years: 1, icon: Framer },
            { name: "Headless UI", years: 1, icon: HeadlessUI },
            { name: "Radix UI", years: 1, icon: RadixUI },
            { name: "Shadcn UI", years: 1, icon: ShadcnUI },
            { name: "jQuery", years: 1, icon: JQuery },
            { name: "Prisma", years: 1, icon: Prisma },
            { name: "Vite", years: 1, icon: ViteJS },
            { name: "Vitest", years: 1, icon: Vitest },
            { name: "Webpack", years: 1, icon: Webpack },
            { name: "WordPress", years: 1, icon: WordPress },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        skills: [
            { name: "SQL", years: 6, icon: MySQL },
            { name: "C#", years: 5, icon: CSharp },
            { name: ".NET", years: 5, icon: CSharp },
            { name: "Node.js", years: 4, icon: NodeJs },
            { name: "REST APIs", years: 4, icon: Postman },
            { name: "Python", years: 3, icon: Python },
            { name: "Java", years: 4, icon: Java },
            { name: "Supabase", years: 2, icon: Supabase },
            { name: "MongoDB", years: 1, icon: MongoDB },
            { name: "Swagger", years: 1, icon: Swagger },
            { name: "Visual Basic", years: 1, icon: VisualBasic },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        skills: [
            { name: "Git", years: 5, icon: Git },
            { name: "Docker", years: 3, icon: Docker },
            { name: "CI/CD", years: 3, icon: Azure },
            { name: "Scrum", years: 3, icon: Jira },
            { name: "NPM", years: 1, icon: NPM },
            { name: "Vercel", years: 1, icon: VercelDark },
        ],
    },
]

export const certifications: Certification[] = [
    {
        name: "SAP Certified Associate - Integration Developer",
        year: "2024",
        issuer: "SAP",
        link: "https://www.credly.com/badges/7cac971c-454f-4ed6-a40a-a3e74d27ce12/linked_in_profile"
    }
]
