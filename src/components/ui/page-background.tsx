import { DotPattern } from "@/components/magicui/dot-pattern"
import { UI_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { BaseComponentProps } from "@/types"

interface PageBackgroundProps extends BaseComponentProps {
    variant?: "default" | "blue" | "purple"
}

export function PageBackground({
    children,
    className,
    variant = "default"
}: PageBackgroundProps) {
    const gradientVariants = {
        default: "from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20",
        blue: "from-blue-50/30 via-transparent to-blue-100/20 dark:from-blue-950/30 dark:to-blue-900/20",
        purple: "from-purple-50/30 via-transparent to-purple-100/20 dark:from-purple-950/30 dark:to-purple-900/20"
    }

    return (
        <main className={cn("relative min-h-screen", className)}>
            {/* Glowing Dot Pattern Background */}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                    "fixed inset-0 -z-10 opacity-50"
                )}
                width={UI_CONFIG.DOT_PATTERN_SIZE}
                height={UI_CONFIG.DOT_PATTERN_SIZE}
            />

            {/* Glow Effect Overlay */}
            <div className={cn(
                "fixed inset-0 -z-10 bg-gradient-to-br",
                gradientVariants[variant]
            )} />

            {children}
        </main>
    )
} 