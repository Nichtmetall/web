import { cn } from "@/lib/utils"
import { BaseComponentProps } from "@/types"

interface PageContainerProps extends BaseComponentProps {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

export function PageContainer({
    children,
    className,
    maxWidth = "2xl"
}: PageContainerProps) {
    const maxWidthVariants = {
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        "2xl": "max-w-7xl",
        full: "max-w-full"
    }

    return (
        <div className={cn(
            "container mx-auto px-4 py-8",
            maxWidthVariants[maxWidth],
            className
        )}>
            {children}
        </div>
    )
} 