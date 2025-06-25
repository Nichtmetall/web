// Globale Konstanten für die Anwendung

// Animation Delays und Dauern
export const ANIMATION_DELAYS = {
    HERO: 0.1,
    STATS: 0.3,
    SKILLS: 0.4,
    BENTO: 0.5,
    PROJECTS: 0.6,
    CONTACT: 0.7,
    ITEM_STAGGER: 0.1,
    SKILL_STAGGER: 0.05,
} as const

export const ANIMATION_DURATIONS = {
    FAST: 0.3,
    NORMAL: 0.5,
    SLOW: 0.8,
    COUNTER: 2000,
} as const

// Orbit-Konfiguration für Skills
export const SKILL_ORBITS = {
    BASE_RADIUS: 80,
    RADIUS_INCREMENT: 80,
    BASE_DURATION: 35,
    DURATION_INCREMENT: 15,
    BASE_ICON_SIZE: 24,
    ICON_SIZE_INCREMENT: 4,
} as const

// UI Konfiguration
export const UI_CONFIG = {
    MARQUEE_DURATION: 120,
    PARTICLE_COUNT: 400,
    BLUR_FADE_OFFSET: 20,
    DOT_PATTERN_SIZE: 20,
} as const

// Navigation Links
export const NAV_LINKS = [
    { href: "/", label: "Start" },
    { href: "/projects", label: "Projekte" },
    { href: "/skills", label: "Skills" },
    { href: "/resume", label: "Lebenslauf" },
    { href: "/impressum", label: "Impressum" },
] as const

// Social Links
export const SOCIAL_LINKS = {
    email: "contact@hofmannanton.de",
    linkedin: "https://linkedin.com/in/antonhofmann",
    github: "https://github.com/Nichtmetall",
    website: "https://hofmannanton.de",
} as const

// Meta-Daten
export const SITE_META = {
    title: "Anton Hofmann | Full Stack Entwickler",
    description: "Full Stack Entwickler mit Fokus auf moderne Webtechnologien und benutzerfreundliche Anwendungen",
    location: "Dresden, Deutschland",
    role: "Digital Architect",
    experienceStartYear: 2020,
} as const 