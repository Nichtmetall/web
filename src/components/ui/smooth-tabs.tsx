"use client"

import { useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
    id: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    content: ReactNode
    badge?: string | number
}

interface SmoothTabsProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
    tabsClassName?: string
    contentClassName?: string
    onTabChange?: (tabId: string) => void
}

export function SmoothTabs({
    tabs,
    defaultTab,
    className = "",
    tabsClassName = "",
    contentClassName = "",
    onTabChange
}: SmoothTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
        onTabChange?.(tabId)
    }

    const activeTabContent = tabs.find(tab => tab.id === activeTab)

    return (
        <div className={cn("w-full", className)}>
            {/* Tab Navigation */}
            <div className={cn(
                "relative flex items-center p-1 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 w-full",
                tabsClassName
            )}>
                {/* Animated Background */}
                <motion.div
                    className="absolute top-1 bottom-1 bg-background rounded-md border border-border/50 shadow-sm"
                    layoutId="activeTab"
                    initial={false}
                    style={{
                        left: `${(tabs.findIndex(tab => tab.id === activeTab) / tabs.length) * 100}%`,
                        width: `${100 / tabs.length}%`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                />

                {/* Tab Buttons */}
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={cn(
                                "relative z-10 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-md flex-1 min-h-[40px]",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {/* Icon */}
                            {tab.icon && (
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                        rotate: isActive ? [0, 5, -5, 0] : 0
                                    }}
                                    transition={{
                                        scale: { duration: 0.2 },
                                        rotate: { duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
                                    }}
                                >
                                    <tab.icon className="h-4 w-4" />
                                </motion.div>
                            )}

                            {/* Label */}
                            <motion.span
                                animate={{
                                    scale: isActive ? 1.05 : 1
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {tab.label}
                            </motion.span>

                            {/* Badge */}
                            {tab.badge && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="ml-1.5 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 min-w-[1.25rem] h-5 flex items-center justify-center"
                                >
                                    {tab.badge}
                                </motion.div>
                            )}

                            {/* Active Indicator Glow */}
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 bg-primary/5 rounded-md"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div className={cn("relative mt-6", contentClassName)}>
                <AnimatePresence mode="wait">
                    {activeTabContent && (
                        <motion.div
                            key={activeTab}
                            initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.98
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                scale: 0.98,
                                transition: { duration: 0.15 }
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {activeTabContent.content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
} 