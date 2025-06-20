export interface Project {
    title: string
    description: string
    details: string
    icon: string
    tags: string[]
    status: "private" | "public"
    category: "web" | "mobile" | "backend" | "fullstack"
    year: string
    githubUrl?: string
    liveUrl?: string
}

export interface ProjectCardProps {
    project: Project
    index: number
}

export interface TimelineItem {
    id: string
    title: string
    subtitle: string
    location: string
    period: string
    description?: string[]
    skills?: string[]
    grade?: string
}

export interface TimelineItemProps {
    item: TimelineItem
    index: number
    type: 'experience' | 'education'
    totalItems: number
}

export interface Skill {
    name: string
    years: number
    icon?: React.ComponentType<any>
}

export interface SkillGroup {
    title: string
    icon: React.ComponentType<{ className?: string }>
    description?: string
    skills: Skill[]
}

export interface Specialization {
    name: string
    expertise: number
    trend: "up" | "stable" | "down"
}

export interface Certification {
    name: string
    year: string
    link?: string
    issuer?: string
}

export interface Category {
    value: string
    label: string
    count: number
} 