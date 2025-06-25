export interface Project {
    title: string
    description: string
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
    index?: number
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
    isLeft: boolean
}

export interface Skill {
    name: string
    years: number
    icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
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

// Neue globale Types für häufig verwendete UI-Patterns
export interface BaseComponentProps {
    className?: string
    children?: React.ReactNode
}

export interface AnimationProps {
    delay?: number
    duration?: number
    inView?: boolean
}

export interface Tab {
    id: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    badge?: number
    content: React.ReactNode
}

// Types für MagicUI Komponenten
export interface MagicCardProps extends BaseComponentProps {
    gradientSize?: number
    gradientColor?: string
    gradientOpacity?: number
}

export interface BlurFadeProps extends BaseComponentProps, AnimationProps {
    blur?: string
    yOffset?: number
}

export interface MarqueeProps extends BaseComponentProps {
    reverse?: boolean
    pauseOnHover?: boolean
    className?: string
    vertical?: boolean
}

// Global konstante Types
export type Status = "public" | "private"
export type ProjectCategory = "web" | "mobile" | "backend" | "fullstack"
export type TimelineType = 'experience' | 'education' 