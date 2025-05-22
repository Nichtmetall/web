"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  title: string
  subtitle: string
  location: string
  period: string
  description: string[]
}

interface TimelineCardProps {
  item: TimelineItem
  index: number
}

export function TimelineCard({ item, index }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="relative">
      {/* Timeline Line */}
      <motion.div
        ref={lineRef}
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="absolute left-6 top-0 bottom-0 w-px bg-border/50 origin-top"
      />
      
      {/* Timeline Dot */}
      <motion.div
        ref={dotRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.2 + 0.3,
          type: "spring",
          stiffness: 200
        }}
        className="absolute left-6 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
      />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative group ml-12"
      >
        <Card className="relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/60 transition-colors duration-300">
          <div className="relative">
            <CardHeader>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {item.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                className="text-lg font-medium text-primary"
              >
                {item.subtitle}
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.ul 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                className="list-disc list-inside space-y-2 text-muted-foreground"
              >
                {item.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </motion.ul>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  )
} 