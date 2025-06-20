"use client";

import Link from "next/link"
import { useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Magic UI Components
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { Marquee } from "@/components/magicui/marquee"
import { MagicCard } from "@/components/magicui/magic-card"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import { useTheme } from "next-themes"
// Tech Stack Icons

// Data
import { skillGroups } from "@/data/skills"
import { projects } from "@/data/projects"
// Icons
import {
    MapPin,
    Mail,
    Github,
    Linkedin,
    Code2,
    Server,
    Cloud,
    Users,
    Blocks,
    ExternalLink,
    ArrowRight,
    Monitor,
    Code,
    List
} from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

export default function HomePage() {
    const currentYear = new Date().getFullYear()
    const experienceYears = currentYear - 2020 // Started in 2020
    const { theme } = useTheme()


    const sourceRef = useRef<(HTMLDivElement | null)[]>([])
    const targetRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        sourceRef.current = sourceRef.current.slice(0, 3)
        targetRef.current = targetRef.current.slice(0, 3)
    }, [])
    return (
        <main className="relative min-h-screen">
            {/* Glowing Dot Pattern Background */}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                    "fixed inset-0 -z-10 opacity-50"
                )}
                //glow={true}
                width={20}
                height={20}
            />

            {/* Glow Effect Overlay */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20" />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Hero Section */}
                <BlurFade delay={0.1}>
                    <section className="text-center py-16 md:py-24">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <AuroraText className="text-7xl font-semibold">
                                    Anton Hofmann
                                </AuroraText>

                                <div className="text-xl md:text-2xl text-muted-foreground">
                                    Digital Architect
                                </div>

                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>Dresden, Deutschland</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                <RainbowButton asChild size="lg">
                                    <Link href="/resume">
                                        <List className="w-4 h-4 mr-2" />
                                        Lebenslauf ansehen
                                    </Link>
                                </RainbowButton>

                                <Button variant="outline" asChild size="lg">
                                    <Link href="mailto:mail@hofmannanton.de">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Kontakt
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </BlurFade>

                {/* All Skills Overview */}
                <BlurFade delay={0.5} inView>
                    <div className="mt-16 text-center">
                        <Marquee className="[--duration:120s]" pauseOnHover={false}>
                            {skillGroups.flatMap(group =>
                                group.skills.map(skill => (
                                    <div
                                        key={`${group.title}-${skill.name}`}
                                        className="mx-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50"
                                    >
                                        {skill.icon ? (
                                            React.createElement(skill.icon, {
                                                className: "h-5 w-5 flex-shrink-0"
                                            })
                                        ) : (
                                            <Code className="h-5 w-5 text-primary/60 flex-shrink-0" />
                                        )}
                                        <span className="text-sm font-medium text-foreground/80">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))
                            )}
                        </Marquee>
                    </div>
                </BlurFade>

                {/* Stats Cards */}
                <BlurFade delay={0.3} inView>
                    <section className="py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <MagicCard className="text-center p-6 rounded-lg">
                                <div className="text-3xl font-bold text-primary mb-2">
                                    <NumberTicker value={experienceYears} />+
                                </div>
                                <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
                            </MagicCard>

                            <MagicCard className="text-center p-6 rounded-lg">
                                <div className="text-3xl font-bold text-primary mb-2">
                                    <NumberTicker value={projects.length} />
                                </div>
                                <div className="text-sm text-muted-foreground">Projekte</div>
                            </MagicCard>

                            <MagicCard className="text-center p-6 rounded-lg">
                                <div className="text-3xl font-bold text-primary mb-2">
                                    <NumberTicker value={skillGroups.flatMap(g => g.skills).length} />
                                </div>
                                <div className="text-sm text-muted-foreground">Technologien</div>
                            </MagicCard>
                        </div>
                    </section>
                </BlurFade>

                {/* Orbiting Skills Showcase */}
                <BlurFade delay={0.4} inView>
                    <section className="py-16">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold mb-2">Mein Tech-Universum</h2>
                            <p className="text-muted-foreground">
                                Die Technologien, mit denen ich arbeite
                            </p>
                        </div>

                        <div className="relative flex h-[800px] w-full flex-col items-center justify-center">
                            {/* Central Hub */}
                            <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg">
                                <Monitor className="h-6 w-6 text-primary mx-auto" />
                            </div>

                            {/* Dynamic Orbiting Circles - All Technologies */}
                            {(() => {
                                // Sammle alle Skills mit ihren Icons
                                const allSkills = skillGroups.flatMap(group => 
                                    group.skills.filter(skill => skill.icon).map(skill => ({
                                        name: skill.name,
                                        icon: skill.icon!
                                    }))
                                );

                                // Teile Skills in Ringe auf: Ring 1 = 4 Icons, Ring 2 = 5 Icons, Ring 3 = 6 Icons, etc.
                                const orbits: Array<{ name: string; icon: React.ComponentType<any> }[]> = [];
                                let currentIndex = 0;
                                let orbitNumber = 0;
                                
                                while (currentIndex < allSkills.length) {
                                    const skillsInThisOrbit = 4 + orbitNumber; // Ring 1: 4, Ring 2: 5, Ring 3: 6, etc.
                                    const endIndex = Math.min(currentIndex + skillsInThisOrbit, allSkills.length);
                                    orbits.push(allSkills.slice(currentIndex, endIndex));
                                    currentIndex = endIndex;
                                    orbitNumber++;
                                }

                                return orbits.map((orbitSkills, orbitIndex) => {
                                    const baseRadius = 80;
                                    const radiusIncrement = 80;
                                    const radius = baseRadius + (orbitIndex * radiusIncrement);
                                    const duration = 35 + (orbitIndex * 15);
                                    const isReverse = orbitIndex % 2 === 1;
                                    const iconSize = 24 + (orbitIndex * 4); // Icons werden nach außen größer

                                    return (
                                        <OrbitingCircles
                                            key={orbitIndex}
                                            className="border-none bg-transparent"
                                            duration={duration}
                                            reverse={isReverse}
                                            delay={orbitIndex * 5}
                                            iconSize={iconSize}
                                            radius={radius}
                                        >
                                            {orbitSkills.map((skill, skillIndex) => (
                                                <div 
                                                    key={`${orbitIndex}-${skillIndex}`}
                                                    style={{ 
                                                        width: `${iconSize + 8}px`, 
                                                        height: `${iconSize + 8}px` 
                                                    }}
                                                    title={skill.name}
                                                >
                                                    {React.createElement(skill.icon, {
                                                        className: "transition-transform hover:scale-110",
                                                        style: { 
                                                            width: `${iconSize - 4}px`, 
                                                            height: `${iconSize - 4}px` 
                                                        }
                                                    })}
                                                </div>
                                            ))}
                                        </OrbitingCircles>
                                    );
                                });
                            })()}
                        </div>
                    </section>
                </BlurFade>

                {/* Enhanced Bento Grid Features */}
                <BlurFade delay={0.5} inView>
                    <section className="py-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Was ich mache</h2>
                            <p className="text-muted-foreground">
                                Meine Kernkompetenzen und technologische Expertise
                            </p>
                        </div>

                        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <BentoCard
                                name="Frontend Entwicklung"
                                className="col-span-1 relative overflow-hidden border-2 hover:border-primary/20 transition-colors"
                                background={
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/40" />
                                        <div className="absolute top-4 right-4 opacity-10">
                                            <Code2 className="h-24 w-24" />
                                        </div>
                                    </div>
                                }
                                Icon={Code2}
                                description="Moderne Webanwendungen mit React, Next.js und TypeScript"
                                href="/skills"
                                cta="Skills ansehen"
                            />

                            <BentoCard
                                name="Backend Integration"
                                className="col-span-1 relative overflow-hidden border-2 hover:border-primary/20 transition-colors"
                                background={
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/40" />
                                        <div className="absolute top-4 right-4 opacity-10">
                                            <Server className="h-24 w-24" />
                                        </div>
                                    </div>
                                }
                                Icon={Server}
                                description="SAP Integration, APIs und Cloud-Lösungen"
                                href="/projects"
                                cta="Projekte ansehen"
                            />

                            <BentoCard
                                name="Cloud Technologien"
                                className="col-span-1 relative overflow-hidden border-2 hover:border-primary/20 transition-colors"
                                background={
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/40" />
                                        <div className="absolute top-4 right-4 opacity-10">
                                            <Cloud className="h-24 w-24" />
                                        </div>
                                    </div>
                                }
                                Icon={Cloud}
                                description="Azure, SAP BTP und moderne DevOps Praktiken"
                                href="/resume"
                                cta="Erfahrung ansehen"
                            />

                            <BentoCard
                                name="Microsoft Power Platform"
                                className="col-span-1 md:col-span-2 relative overflow-hidden border-2 hover:border-primary/20 transition-colors"
                                background={
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/40" />
                                        <div className="absolute top-4 right-4 opacity-10">
                                            <Users className="h-24 w-24" />
                                        </div>
                                    </div>
                                }
                                Icon={Users}
                                description="Power Apps, Power Automate und Dynamics 365 Entwicklung"
                                href="/projects"
                                cta="Projekte ansehen"
                            />

                            <BentoCard
                                name="SAP Integration"
                                className="col-span-1 relative overflow-hidden border-2 hover:border-primary/20 transition-colors"
                                background={
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-muted/40" />
                                        <div className="absolute top-4 right-4 opacity-10">
                                            <Blocks className="h-24 w-24" />
                                        </div>
                                    </div>
                                }
                                Icon={Blocks}
                                description="CPI, PI/PO und BTP Integration Solutions"
                                href="/resume"
                                cta="Zertifizierungen ansehen"
                            />
                        </BentoGrid>
                    </section>
                </BlurFade>

                {/* Latest Projects */}
                <BlurFade delay={0.6} inView>
                    <section className="py-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Aktuelle Projekte</h2>
                            <p className="text-muted-foreground">
                                Eine Auswahl meiner neuesten Arbeiten
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.slice(0, 2).map((project) => (
                                <MagicCard key={project.title} className="p-6 rounded-lg">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                            {project.status === "public" && project.githubUrl && (
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link href={project.githubUrl} target="_blank">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>

                                        <p className="text-muted-foreground text-sm">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs text-muted-foreground">
                                                {project.year}
                                            </span>
                                            <Badge
                                                variant={project.status === "public" ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {project.status === "public" ? "Öffentlich" : "Privat"}
                                            </Badge>
                                        </div>
                                    </div>
                                </MagicCard>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Button variant="outline" asChild>
                                <Link href="/projects">
                                    Alle Projekte ansehen
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </section>
                </BlurFade>

                {/* Contact Section */}
                <BlurFade delay={0.7} inView>
                    <section className="py-16 text-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Lass uns zusammenarbeiten</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Willst du mehr über mich erfahren, oder möchtest du meine Arbeit ansehen?
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild size="lg">
                                    <Link href="mailto:contact@example.com">
                                        <Mail className="w-4 h-4 mr-2" />
                                        E-Mail schreiben
                                    </Link>
                                </Button>

                                <Button variant="outline" size="lg" asChild>
                                    <Link href="https://linkedin.com" target="_blank">
                                        <Linkedin className="w-4 h-4 mr-2" />
                                        LinkedIn
                                    </Link>
                                </Button>

                                <Button variant="outline" size="lg" asChild>
                                    <Link href="https://github.com" target="_blank">
                                        <Github className="w-4 h-4 mr-2" />
                                        GitHub
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </BlurFade>
            </div>
        </main>
    )
}
