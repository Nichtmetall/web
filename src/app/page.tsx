"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { Enhanced3DScene } from "@/components/3d/enhanced-scene"
import { ParallaxSection, FloatingElement } from "@/components/ui/parallax-section"
import { Github, Linkedin, Mail, ArrowDown, Code2, Zap, Globe, FileText, Sparkles, Layers, Box, MousePointer, Cpu, Database, Rocket, Users, Brain, Target, Calendar, Trophy, Star, Lightbulb, Heart, Coffee, Monitor, Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import * as THREE from "three"

// Smooth animation configurations
const smoothConfig = {
  stiffness: 100,
  damping: 20,
  restDelta: 0.001
}

const cardHoverAnimation = {
  y: -15,
  scale: 1.05,
  rotateX: 5,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    duration: 0.3
  }
}

const cardVariants = {
  initial: { opacity: 0, y: 60, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  },
  hover: cardHoverAnimation
}

// New Hero Section with Fixed Parallax
function NewHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smoother content transforms with better easing
  const contentY = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, -80]), {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  })
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  })
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.98]), {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fixed 3D Background */}
      <div className="absolute inset-0">
        <Enhanced3DScene />
      </div>

      {/* Hero Content - Minimalistic Floating Card */}
      <motion.div
        style={{ y: contentY, opacity, scale }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        {/* Floating Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative bg-black/30 border border-white/20 rounded-3xl p-12 shadow-xl"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0" />

          {/* Content */}
          <div className="relative z-10">
            {/* Main Title */}
            <motion.div className="mb-8">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl font-light mb-2 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-white">Anton Hofmann</span>
              </motion.h1>

              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.h2
              className="text-xl sm:text-2xl font-light text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              Full Stack Developer & Digital Architect
            </motion.h2>

            {/* Essential Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.1 + index * 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Badge
                    variant="outline"
                    className="bg-white/5 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 text-white/70 text-xs px-3 py-1"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Outside the card for better positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <motion.span
              className="text-xs tracking-widest uppercase font-light"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Scroll
            </motion.span>
            <motion.div
              animate={{
                y: [0, 6, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border border-white/25 rounded-full flex justify-center bg-white/5 backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-2 bg-white/40 rounded-full mt-1.5"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Stats Section with Fixed Animations
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const stats = [
    { number: "50+", label: "Projekte realisiert", icon: Rocket },
    { number: "5+", label: "Jahre Erfahrung", icon: Calendar },
    { number: "100%", label: "Kundenzufriedenheit", icon: Trophy },
    { number: "24/7", label: "Leidenschaft für Code", icon: Heart }
  ]

  // Predetermined particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: 23, top: 15 }, { left: 78, top: 35 }, { left: 45, top: 65 },
    { left: 12, top: 85 }, { left: 89, top: 25 }, { left: 34, top: 45 },
    { left: 67, top: 75 }, { left: 56, top: 20 }, { left: 91, top: 55 },
    { left: 18, top: 90 }, { left: 73, top: 10 }, { left: 42, top: 80 },
    { left: 85, top: 40 }, { left: 29, top: 70 }, { left: 64, top: 30 }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Zahlen, die sprechen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Projekt erzählt eine Geschichte von Innovation, Präzision und Leidenschaft
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="relative mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: index }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-white/10"
                  whileHover={{
                    borderColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>

              <motion.div
                className="text-3xl sm:text-4xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
              >
                {stat.number}
              </motion.div>

              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Standardized Feature Card Component
function FeatureCard({ icon: Icon, title, description, delay = 0, gradient }: {
  icon: any
  title: string
  description: string
  delay?: number
  gradient?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      transition={{ delay }}
      className="group relative"
    >
      <div className={`relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${gradient || 'from-background/80 to-background/60'} backdrop-blur-sm hover:border-primary/30 transition-all duration-300 overflow-hidden`}>
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-8 w-8 text-primary" />
          </motion.div>

          <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Navigation Section with Consistent Animations
function NavigationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const sections = [
    {
      title: "Lebenslauf",
      description: "Meine berufliche Laufbahn und Ausbildung",
      icon: FileText,
      href: "/resume",
      color: "from-blue-500/20 to-blue-600/20",
      details: "Entdecken Sie meinen Werdegang"
    },
    {
      title: "Fähigkeiten",
      description: "Technologien und Kompetenzen im Detail",
      icon: Zap,
      href: "/skills",
      color: "from-yellow-500/20 to-orange-600/20",
      details: "Technische Expertise und Soft Skills"
    },
    {
      title: "Projekte",
      description: "Portfolio und Entwicklungsprojekte",
      icon: Code2,
      href: "/projects",
      color: "from-green-500/20 to-emerald-600/20",
      details: "Realworld Projekte und Case Studies"
    }
  ]

  return (
    <div ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Floating Elements */}
      <FloatingElement speed={0.3} rotationSpeed={0.1} className="absolute top-10 right-16 opacity-10">
        <Code2 className="h-20 w-20 text-primary" />
      </FloatingElement>
      <FloatingElement speed={0.2} className="absolute bottom-10 left-20 opacity-15">
        <Zap className="h-14 w-14 text-secondary" />
      </FloatingElement>

      <ParallaxSection speed={0.1} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meine digitale Welt entdecken
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tauchen Sie ein in meine Reise als Entwickler - von den ersten Codezeilen bis zu komplexen Projekten,
            die die Grenzen des Möglichen erweitern
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={section.href}>
                <div className={`relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${section.color} backdrop-blur-sm hover:border-primary/30 transition-all duration-300 overflow-hidden cursor-pointer`}>
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      <section.icon className="h-8 w-8 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {section.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-2">
                      {section.description}
                    </p>

                    <motion.p
                      className="text-xs text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {section.details}
                    </motion.p>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowDown className="w-3 h-3 text-primary rotate-[-45deg]" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative">
      <NewHeroSection />

      <StatsSection />

      {/* Features Section with Smooth Animations */}
      <section className="relative py-32 px-4 overflow-hidden">
        <FloatingElement speed={0.2} className="absolute top-20 left-10 opacity-20">
          <Sparkles className="h-8 w-8 text-primary" />
        </FloatingElement>
        <FloatingElement speed={0.3} className="absolute top-40 right-20 opacity-15">
          <Box className="h-12 w-12 text-secondary" />
        </FloatingElement>
        <FloatingElement speed={0.25} className="absolute bottom-20 left-1/4 opacity-10">
          <Layers className="h-16 w-16 text-accent" />
        </FloatingElement>
        <FloatingElement speed={0.35} className="absolute bottom-40 right-10 opacity-20">
          <Globe className="h-10 w-10 text-primary" />
        </FloatingElement>

        <ParallaxSection speed={0.1} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meine Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Innovative Technologien treffen auf durchdachte Architektur -
              für digitale Lösungen, die einen echten Unterschied machen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <ParallaxSection speed={0.05} direction="up">
              <FeatureCard
                icon={Globe}
                title="Frontend Excellence"
                description="Interaktive Benutzeroberflächen mit React, Next.js und modernsten 3D-Technologien. Pixel-perfekte Designs treffen auf flüssige Animationen."
                delay={0}
                gradient="from-blue-500/10 to-cyan-500/10"
              />
            </ParallaxSection>
            <ParallaxSection speed={0.08} direction="down">
              <FeatureCard
                icon={Code2}
                title="Backend Architecture"
                description="Skalierbare Systeme und intelligente APIs mit Node.js, Python und KI-Integration. Von Mikroservices bis zu Machine Learning Pipelines."
                delay={0.1}
                gradient="from-green-500/10 to-emerald-500/10"
              />
            </ParallaxSection>
            <ParallaxSection speed={0.05} direction="up">
              <FeatureCard
                icon={Zap}
                title="Performance & Innovation"
                description="Blitzschnelle Anwendungen durch intelligente Optimierung. Core Web Vitals, SEO Excellence und moderne DevOps-Praktiken."
                delay={0.2}
                gradient="from-purple-500/10 to-pink-500/10"
              />
            </ParallaxSection>
          </div>
        </ParallaxSection>
      </section>

      {/* Philosophy Section with Smooth Parallax */}
      <section className="relative py-40 px-4 overflow-hidden">
        <ParallaxSection speed={0.15} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 relative">
              <span className="relative z-10">Meine Philosophie</span>
              <motion.div
                className="absolute -inset-4 border border-white/20 rounded-lg"
                animate={{
                  scaleX: [1, 1.05, 1],
                  scaleY: [1, 1.02, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Jede Zeile Code erzählt eine Geschichte. Jede Anwendung löst ein menschliches Problem.
              Technologie ist nicht nur Werkzeug - sie ist die Brücke zwischen Idee und Realität.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ParallaxSection speed={0.08} direction="left">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {[
                  {
                    title: "Simplicity in Complexity",
                    description: "Die größte Kunst liegt darin, komplexe Systeme so zu gestalten, dass sie für den Nutzer mühelos erscheinen."
                  },
                  {
                    title: "Human-Centered Design",
                    description: "Technologie sollte Menschen ermächtigen, nicht überfordern. Jede Entscheidung wird mit dem Endnutzer im Fokus getroffen."
                  },
                  {
                    title: "Continuous Evolution",
                    description: "In der Welt der Technologie stillzustehen bedeutet rückwärts zu gehen. Lernen ist nicht nur Beruf - es ist Leidenschaft."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="relative"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-white via-white/50 to-transparent rounded"
                      animate={{ height: ["0%", "100%", "0%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 2 }}
                    />
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </ParallaxSection>

            <ParallaxSection speed={0.12} direction="right">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  className="w-full h-96 border-2 border-white/20 rounded-2xl relative overflow-hidden"
                  animate={{
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {/* Animated code lines */}
                  <div className="absolute inset-4 space-y-3 font-mono text-xs">
                    {[
                      { initial: 85, animate: [75, 95] },
                      { initial: 65, animate: [55, 75] },
                      { initial: 90, animate: [80, 100] },
                      { initial: 70, animate: [60, 80] },
                      { initial: 45, animate: [40, 60] },
                      { initial: 80, animate: [70, 90] },
                      { initial: 55, animate: [45, 65] },
                      { initial: 95, animate: [85, 100] },
                      { initial: 60, animate: [50, 70] },
                      { initial: 75, animate: [65, 85] },
                      { initial: 50, animate: [40, 60] },
                      { initial: 85, animate: [75, 95] }
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        className="h-2 bg-white/10 rounded"
                        style={{ width: `${line.initial}%` }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          width: [`${line.animate[0]}%`, `${line.animate[1]}%`, `${line.animate[0]}%`]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>

                  {/* Cursor */}
                  <motion.div
                    className="absolute w-1 h-4 bg-white"
                    animate={{
                      x: [20, 200, 20],
                      y: [20, 300, 20],
                      opacity: [1, 1, 0.3, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </ParallaxSection>
          </div>
        </ParallaxSection>
      </section>

      <NavigationSection />
    </main>
  )
}
