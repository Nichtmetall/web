import { TimelineItem, Certification } from '@/types'

export const experiences: TimelineItem[] = [
    {
        title: "Senior Full Stack Entwickler",
        subtitle: "Tech Company GmbH",
        location: "München",
        period: "2022 - Heute",
        description: [
            "Entwicklung und Wartung von modernen Webanwendungen mit React und Node.js",
            "Implementierung von CI/CD-Pipelines und DevOps-Praktiken",
            "Mentoring von Junior-Entwicklern und Code-Reviews",
            "Optimierung der Anwendungsperformance und Skalierbarkeit",
        ],
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
    },
    {
        title: "Full Stack Entwickler",
        subtitle: "Digital Solutions AG",
        location: "Berlin",
        period: "2020 - 2022",
        description: [
            "Entwicklung von RESTful APIs und Microservices",
            "Implementierung von Frontend-Komponenten mit React",
            "Datenbankdesign und -optimierung",
            "Agile Entwicklung in Scrum-Teams",
        ],
        skills: ["React", "Python", "PostgreSQL", "Git"]
    },
    {
        title: "Junior Entwickler",
        subtitle: "Startup Innovations",
        location: "Hamburg",
        period: "2018 - 2020",
        description: [
            "Entwicklung von Webanwendungen mit JavaScript und PHP",
            "Responsive Design und Frontend-Entwicklung",
            "Integration von Drittanbieter-APIs",
            "Bugfixing und Wartung bestehender Systeme",
        ],
        skills: ["JavaScript", "PHP", "HTML/CSS", "MySQL"]
    },
]

export const education: TimelineItem[] = [
    {
        title: "Master of Science in Informatik",
        subtitle: "Technische Universität München",
        location: "München",
        period: "2016 - 2018",
        description: [
            "Schwerpunkt: Software Engineering und Webtechnologien",
            "Abschlussarbeit: Entwicklung einer skalierbaren Cloud-Architektur",
        ],
        skills: ["Software Engineering", "Cloud Computing", "Algorithmen"]
    },
    {
        title: "Bachelor of Science in Informatik",
        subtitle: "Universität Hamburg",
        location: "Hamburg",
        period: "2012 - 2016",
        description: [
            "Grundlagen der Informatik und Programmierung",
            "Praktikum bei einem Softwareunternehmen",
        ],
        skills: ["Programmierung", "Datenstrukturen", "Betriebssysteme"]
    },
]

export const certifications: Certification[] = [
    {
        name: "SAP Certified Associate - Integration Developer",
        year: "2024",
        issuer: "SAP",
        link: "https://www.credly.com/badges/7cac971c-454f-4ed6-a40a-a3e74d27ce12/linked_in_profile"
    },
] 