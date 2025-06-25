"use client"

import { VerticalTimeline } from "@/components/timeline"
import { getCombinedTimeline } from "@/data/resume"

// Generic UI Components
import { PageBackground } from "@/components/ui/page-background"
import { PageHeader } from "@/components/ui/page-header"
import { PageContainer } from "@/components/ui/page-container"
import { BlurFade } from "@/components/magicui/blur-fade"

import { ANIMATION_DELAYS } from "@/lib/constants"

export default function Resume() {
    const combinedTimeline = getCombinedTimeline()

    return (
        <PageBackground>
            <PageContainer>
                <PageHeader
                    title="Lebenslauf"
                    subtitle="Meine berufliche Laufbahn und Ausbildung"
                    delay={ANIMATION_DELAYS.HERO}
                />

                {/* Vertikale Timeline */}
                <BlurFade delay={0.2} inView>
                    <VerticalTimeline items={combinedTimeline} />
                </BlurFade>
            </PageContainer>
        </PageBackground>
    )
} 