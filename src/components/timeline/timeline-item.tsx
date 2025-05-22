"use client"

import { motion } from "framer-motion"
import { Building2, GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TimelineItemProps } from "@/types"

export function TimelineItem({ item, index, type, totalItems }: TimelineItemProps) {
    const isLast = index === totalItems - 1

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-6"
        >
            {/* Timeline */}
            <div className="relative flex flex-col items-center">
                {/* Timeline Dot Container */}
                <div className="relative">
                    {/* Timeline Dot */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"
                    />

                    {/* Pulsing Ring */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.05, 1], opacity: [0, 0.7, 0] }}
                        transition={{
                            duration: 4,
                            delay: index * 0.1 + 0.2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-primary/50"
                    />
                </div>

                {/* Timeline Line */}
                {!isLast && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100%", opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.4,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/30 flex-1 mt-2 rounded-full"
                        style={{ minHeight: "120px" }}
                    />
                )}
            </div>

            {/* Content Card */}
            <div className="flex-1 pb-8">
                <Card className="relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    {/* Gradient overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
                    />

                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {type === 'experience' ? <Building2 className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                                    <p className="text-primary font-medium">{item.subtitle}</p>
                                </div>
                            </div>
                            {item.grade && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    <Award className="h-3 w-3 mr-1" />
                                    Note: {item.grade}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
                                <Calendar className="h-3 w-3" />
                                {item.period}
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/10">
                                <MapPin className="h-3 w-3" />
                                {item.location}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <ul className="space-y-2 mb-4">
                            {item.description.map((desc: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 + 0.6 + i * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.7 + i * 0.1 }}
                                        className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0"
                                    />
                                    {desc}
                                </motion.li>
                            ))}
                        </ul>

                        <Separator className="my-4" />

                        <div className="flex flex-wrap gap-2">
                            {item.skills?.map((skill: string, skillIndex: number) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 + 0.8 + skillIndex * 0.05 }}
                                >
                                    <Badge variant="outline" className="text-xs">
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
} 