import { TimelineItem, Certification } from '@/types'

export const experiences: TimelineItem[] = [
    {
        title: "Full Stack Developer",
        subtitle: "Software Solutions GmbH",
        location: "München",
        period: "2022 - Heute",
        description: [
            "Entwicklung und Wartung von modernen Webanwendungen mit React, Next.js und TypeScript",
            "Backend-Entwicklung mit Node.js und Python",
            "Implementierung von REST APIs und GraphQL Services",
            "Code-Reviews und Mentoring von Teammitgliedern",
            "Optimierung der Anwendungsperformance und User Experience"
        ],
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"]
    },
    {
        title: "Frontend Developer",
        subtitle: "Digital Agency",
        location: "München",
        period: "2020 - 2022",
        description: [
            "Entwicklung responsiver Webanwendungen mit React und Vue.js",
            "Implementierung von Design Systems und UI-Komponenten",
            "Zusammenarbeit mit UX/UI Designern",
            "Performance-Optimierung und SEO-Verbesserungen",
            "Agile Entwicklung in Scrum-Teams"
        ],
        skills: ["React", "Vue.js", "JavaScript", "SCSS", "Figma", "Git"]
    },
    {
        title: "Web Developer",
        subtitle: "Freelance",
        location: "Remote",
        period: "2018 - 2020",
        description: [
            "Entwicklung von Websites und Webanwendungen für verschiedene Kunden",
            "Full-Stack-Entwicklung mit modernen Frameworks",
            "Beratung zu Webentwicklung und digitalen Lösungen",
            "Projektmanagement und Kundenkommunikation"
        ],
        skills: ["JavaScript", "PHP", "WordPress", "HTML/CSS", "MySQL"]
    }
]

export const education: TimelineItem[] = [
    {
        title: "Bachelor of Science Informatik",
        subtitle: "Technische Hochschule München",
        location: "München",
        period: "2015 - 2019",
        description: [
            "Schwerpunkt: Software Engineering und Webentwicklung",
            "Bachelorarbeit: Entwicklung einer modernen Webanwendung mit React",
            "Praktikum bei einem Softwareunternehmen",
            "Teilnahme an Hackathons und Coding-Wettbewerben"
        ],
        skills: ["Software Engineering", "Algorithmen", "Datenbanken", "Web-Technologien"]
    },
    {
        title: "Fachabitur Informatik",
        subtitle: "Berufsoberschule Bayern",
        location: "München",
        period: "2013 - 2015",
        description: [
            "Schwerpunkt: Informatik und Mathematik",
            "Projektarbeit: Entwicklung einer Desktop-Anwendung",
            "Grundlagen der Programmierung und Softwareentwicklung"
        ],
        skills: ["Programmierung", "Mathematik", "Grundlagen IT"]
    }
]

export const certifications: Certification[] = [
    {
        name: "SAP Certified Associate - Integration Developer",
        year: "2024",
        issuer: "SAP",
        link: "https://www.credly.com/badges/7cac971c-454f-4ed6-a40a-a3e74d27ce12/linked_in_profile"
    }
] 