import { Project, Category } from '@/types'

export const projects: Project[] = [


    {
        title: "empfehlen.me",
        description: "Ein linkbasiert Empfehlungssystem für (Finanz-) Berater und deren Mandanten.",
        details: "Ein linkbasiert Empfehlungssystem für Kunden und deren Mandanten. Gebaut mit React und Tailwind CSS.",
        icon: "Globe",
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Supabase", "Vercel", "Shadcn UI"],
        status: "private",
        category: "web",
        year: "2025",
        liveUrl: "https://empfehlen.me"
    },
    {
        title: "Personal Website",
        description: "Meine persönliche Website, auf der ich meine Projekte, Fähigkeiten und mein Lebenslauf präsentiere.",
        details: "Meine persönliche Website, auf der ich meine Projekte, Fähigkeiten und mein Lebenslauf präsentiere. Gebaut mit Next.js und Tailwind CSS.",
        icon: "Code2",
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Shadcn UI", "Vercel"],
        status: "public",
        category: "web",
        year: "2023 - 2025",
        githubUrl: "https://github.com/Nichtmetall/web",
        liveUrl: "https://hofmannanton.de"
    },
    {
        title: "SAP CPI iFlow Screenshotter",
        description: "Chrome Plugin zum Screenshotten von SAP CPI iFlows.",
        details: "Ein Chrome Plugin zum Screenshotten von SAP CPI iFlows. Gebaut mit React und Tailwind CSS.",
        icon: "Globe",
        tags: ["JavaScript", "Chrome Extension"],
        status: "private",
        category: "web",
        year: "2025",
    },
    {
        title: "Spigot Config Manager",
        description: "Ein Config Manager für Spigot Plugins.",
        details: "Ein Config Manager für Spigot Plugins.",
        icon: "Globe",
        tags: ["Java"],
        status: "public",
        category: "backend",
        year: "2022",
        githubUrl: "https://github.com/Nichtmetall/Spigot-Config-Manager"
    },
]

export const categories: Category[] = [
    { value: "all", label: "Alle Projekte", count: projects.length },
    { value: "web", label: "Web", count: projects.filter(p => p.category === "web").length },
    { value: "backend", label: "Backend", count: projects.filter(p => p.category === "backend").length },
] 