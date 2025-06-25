import { TimelineItem } from '@/types'

export const experiences: TimelineItem[] = [
    {
        id: "sap-consultant",
        title: "Junior SAP Integration Consultant",
        subtitle: "ITARICON GmbH",
        location: "Dresden",
        period: "05/2024 - Heute",
        description: [
            "Entwicklung und Wartung von Integrationsszenarien mit SAP Cloud Integration (CPI)",
            "Anbindung von Cloud- und On-Premise-Systemen über APIs, OData und IDoc-Schnittstellen",
            "Beratung bei der Architektur und dem Design von Integrationslösungen",
            "Optimierung von Integrationsprozessen hinsichtlich Performance, Stabilität und Skalierbarkeit",
            "Unterstützung bei der Migration von SAP PI/PO zu SAP Integration Suite",
            "Erweiterung der Standardlösung des Adito xRM"
        ],
        skills: ["SAP Cloud Platform Integration (CPI)", "SAP PI/PO", "GroovyScript", "JavaScript", "TypeScript", "Adito", "SAP HANA", "SAP Cloud Platform", "SAP Business Technology Platform"]
    },
    {
        id: "web-developer",
        title: "Junior Web Developer",
        subtitle: "SIEVON GmbH",
        location: "Görlitz",
        period: "09/2023 - 03/2024",
        description: [
            "Entwicklung responsiver Webanwendungen mit React, Vite und NextJS",
            "Implementierung von Design Systems und UI-Komponenten",
            "Performance-Optimierung und SEO-Verbesserungen",
            "Agile Entwicklung in Scrum-Teams"
        ],
        skills: ["React.js", "Vite", "NextJS", "JavaScript", "TypeScript", "TailwindCSS", "Git", "REST APIs", "DevOps", "Scrum"]
    },
    {
        id: "sentivon",
        title: "Geschäftsführernder Gesellschafter",
        subtitle: "Sentivon GbR - Selbstständig",
        location: "Dresden",
        period: "04/2022 - 08/2023",
        description: [
            "Aufbau und Pflege einer konsistenten Corporate Identity",
            "Webdesign und Wartung mit WordPress / Elementor",
            "SEO-Optimierung für bessere Sichtbarkeit in Suchmaschinen",
            "Monitoring der Website-Performance mit Google Search Console",
            "Optimierung von Google My Business Einträgen für lokale Suche"
        ],
        skills: ["Corporate Identity", "Social Media Marketing", "Content Marketing", "WordPress", "Elementor", "SEO", "Google Ads", "Google Analytics", "Google Search Console", "Google Tag Manager", "Google My Business"]
    },
    {
        id: "apprentice-datom",
        title: "Auszubildender Fachinformatiker für Anwendungsentwicklung",
        subtitle: "Datom GmbH",
        location: "Dresden",
        period: "04/2022 - 08/2023",
        description: [
            "Anpassung und Erweiterung von MS Dynamics 365",
            "Entwicklung eines RFC Backend Services",
            "Automatisierung von Business Prozessen mit MS Power Automate",
            "Entwicklung von benutzerdefinierten Komponenten mit Power Apps Component Framework (PCF)",
            "Deployment und CI/CD mit Azure DevOps"
        ],
        skills: ["C#", "MS Power Platform", "MS Dynamics 365", "MS Power Automate", "MS Power Apps", "Power Apps Component Framework (PCF)", "React.js", "TypeScript", "SQL", "Git", "DevOps", ".NET"]
    },
    {
        id: "apprentice-prettl",
        title: "Auszubildender Fachinformatiker für Anwendungsentwicklung",
        subtitle: "PRETTL electronics GmbH",
        location: "Radeberg",
        period: "06/2020 - 02/2022",
        description: [
            "Entwicklung und Wartung von Anwendungen mit .NET und C# für Unternehmenslösungen",
            "Pflege von Business-Anwendungen mit VB .NET und VBA",
            "Entwurf und Optimierung von relationalen Datenbanken",
            "Planung, Aufbau und Wartung der internen Netzwerk- / Server-Infrastrukturen",
            "Administration, Monitoring und Optimierung von Windows Server Umgebungen",
            "Benutzerverwaltung, Gruppenrichtlinien und Zugriffskontrollen mit Active Directory"
        ],
        skills: [".NET", "C#", "VB .NET", "VBA", "HTML/CSS", "SQL", "Git", "DevOps", "Netzwerktechnik", "Windows Server", "Active Directory"]
    }
]

export const education: TimelineItem[] = [
    {
        id: "bszet",
        title: "Duale Berufsausbildung zum Fachinformatiker für Anwendungsentwicklung mit Abitur",
        subtitle: "Berufsschulzentrum für Elektrotechnik Dresden",
        location: "Dresden",
        period: "09/2019 - 09/2023"
    },
    {
        id: "oberschule",
        title: "Mittlere Reife / Realschulabschluss",
        subtitle: "35. Oberschule Dresden",
        location: "Dresden",
        period: "09/2013 - 07/2019"
    }
]



// Funktion um alle Timeline-Einträge zu kombinieren und nach Startjahr zu sortieren
export const getCombinedTimeline = () => {
    const combinedItems = [
        ...experiences.map(item => ({ ...item, type: 'experience' as const })),
        ...education.map(item => ({ ...item, type: 'education' as const }))
    ]

    // Sortiere nach Startjahr (neueste zuerst)
    return combinedItems.sort((a, b) => {
        const getStartYear = (period: string) => {
            // Extrahiere das Startjahr aus dem Zeitraum (z.B. "05/2024 - Heute" -> 2024)
            const match = period.match(/(\d{2})\/(\d{4})/) || period.match(/(\d{4})/)
            return match ? parseInt(match[match.length - 1]) : 0
        }

        return getStartYear(b.period) - getStartYear(a.period)
    })
} 