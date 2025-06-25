import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ANIMATION_DELAYS } from "@/lib/constants"
import { BaseComponentProps } from "@/types"

interface PageHeaderProps extends BaseComponentProps {
    title: string
    subtitle?: string
    delay?: number
}

export function PageHeader({
    title,
    subtitle,
    delay = ANIMATION_DELAYS.HERO,
    children
}: PageHeaderProps) {
    return (
        <BlurFade delay={delay}>
            <section className="text-center py-16 md:py-24">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <AuroraText className="text-4xl md:text-6xl font-bold">
                            {title}
                        </AuroraText>

                        {subtitle && (
                            <div className="text-xl md:text-2xl text-muted-foreground">
                                {subtitle}
                            </div>
                        )}
                    </div>

                    {children}
                </div>
            </section>
        </BlurFade>
    )
} 