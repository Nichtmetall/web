import { Project, Category } from '@/types'

export const projects: Project[] = [
    {
        title: "wartefrei",
        description: "Eine praktische App, um VVO Abfahrten zu überprüfen und geeignete Verbindungen zu finden.",
        icon: "Tram",
        tags: ["Vite", "Tailwind CSS", "TypeScript", "Node.js", "Vercel", "Shadcn UI"],
        status: "public",
        category: "web",
        year: "2025",
        githubUrl: "https://github.com/Nichtmetall/wartefrei",
        liveUrl: "https://wartefrei.vercel.app"
    },
    {
        title: "empfehlen.me",
        description: "Ein linkbasiert Empfehlungssystem für (Finanz-) Berater und deren Mandanten.",
        icon: "Code2",
        tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Supabase", "Vercel", "Shadcn UI"],
        status: "private",
        category: "web",
        year: "2025",
        liveUrl: "https://empfehlen.me"
    },
    {
        title: "Personal Website",
        description: "Meine persönliche Website, auf der ich meine Projekte, Fähigkeiten und mein Lebenslauf präsentiere.",
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
        icon: "Code2",
        tags: ["JavaScript", "Chrome Extension"],
        status: "private",
        category: "web",
        year: "2025",
    },
    {
        title: "Spigot Config Manager",
        description: "Ein Config Manager für Spigot Plugins.",
        icon: "Code2",
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