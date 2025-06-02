"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, Code2, Globe, Calendar, Trophy, Heart, Eye, Brain, Lightbulb, Target, FileText, Code } from "lucide-react"
import Link from "next/link"
import { AnimatedCodeEditor } from "@/components/animated-code-editor"

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Floating particles component for background effects
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const particles = containerRef.current.children

    gsap.set(particles, {
      x: (i) => (i % 10) * (window.innerWidth / 10) + Math.sin(i) * 100,
      y: (i) => (Math.floor(i / 10)) * (window.innerHeight / 5) + Math.cos(i) * 50,
      scale: (i) => 0.3 + (i % 3) * 0.2,
      opacity: (i) => 0.1 + (i % 4) * 0.1,
    })

    gsap.to(particles, {
      y: "-=100vh",
      duration: (i) => 25 + (i % 3) * 10,
      ease: "none",
      repeat: -1,
      stagger: {
        amount: 20,
        repeat: -1
      }
    })

    gsap.to(particles, {
      x: "+=100",
      duration: (i) => 20 + (i % 2) * 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 15,
        repeat: -1
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-muted-foreground/20 rounded-full"
        />
      ))}
    </div>
  )
}

// Hero section with enhanced GSAP animations
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, tagsRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 100
      })

      // Set title text immediately
      if (titleRef.current) {
        titleRef.current.textContent = "Anton Hofmann"
      }

      // Background animation
      gsap.to(backgroundRef.current, {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1
      })

      // Hero entrance timeline with more sophisticated animations
      const tl = gsap.timeline({ delay: 0.3 })

      // Title animation with letter-by-letter reveal
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power4.out"
      })
        .from(titleRef.current, {
          scale: 1.2,
          filter: "blur(20px)",
          duration: 1.8,
          ease: "power4.out"
        }, 0)

        // Subtitle with wave effect
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        }, "-=1.2")
        .from(subtitleRef.current, {
          rotationX: 45,
          transformOrigin: "center bottom",
          duration: 1.5,
          ease: "power3.out"
        }, "-=1.5")

        // Tags with magnetic entrance
        .to(tagsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          stagger: {
            amount: 0.6,
            from: "center"
          }
        }, "-=1.0")
        .from(tagsRef.current?.children || [], {
          scale: 0,
          rotation: 180,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          stagger: {
            amount: 0.6,
            from: "center"
          }
        }, "-=1.2")

        // Scroll indicator with breathing effect
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out"
        }, "-=0.8")

      // Continuous animations
      // Title glow effect
      gsap.to(titleRef.current, {
        textShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })

      // Floating animation for the whole hero content
      const heroContent = heroRef.current?.querySelector('.hero-content')
      if (heroContent) {
        gsap.to(heroContent, {
          y: -10,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        })
      }

      // Parallax effect for hero content with enhanced movement
      gsap.to(heroRef.current, {
        y: "-40%",
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      })

      // Background parallax
      gsap.to(backgroundRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      })

      // Fade out scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "20% top",
          scrub: true
        }
      })

      // Floating elements animation
      const floatingElements = floatingElementsRef.current?.children
      if (floatingElements) {
        gsap.fromTo(floatingElements, {
          y: 100,
          opacity: 0,
          rotation: 0,
          scale: 0.5
        }, {
          y: 0,
          opacity: 0.6,
          rotation: 360,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          stagger: 0.3,
          delay: 2
        })

        // Continuous floating animation
        gsap.to(floatingElements, {
          y: "-=30",
          rotation: "+=180",
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        })
      }

      // Mouse move parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const xPos = (clientX / innerWidth - 0.5) * 2
        const yPos = (clientY / innerHeight - 0.5) * 2

        gsap.to(titleRef.current, {
          x: xPos * 10,
          y: yPos * 5,
          duration: 0.8,
          ease: "power2.out"
        })

        gsap.to(subtitleRef.current, {
          x: xPos * 5,
          y: yPos * 3,
          duration: 0.8,
          ease: "power2.out"
        })

        gsap.to(floatingElementsRef.current?.children || [], {
          x: xPos * -20,
          y: yPos * -15,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.1
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Predefined particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: 15, top: 20, delay: 0, duration: 2.5 },
    { left: 85, top: 15, delay: 0.5, duration: 3.2 },
    { left: 25, top: 80, delay: 1, duration: 2.8 },
    { left: 70, top: 85, delay: 1.5, duration: 3.5 },
    { left: 50, top: 30, delay: 2, duration: 2.2 },
    { left: 10, top: 60, delay: 2.5, duration: 4.1 },
    { left: 90, top: 45, delay: 3, duration: 3.8 },
    { left: 35, top: 10, delay: 3.5, duration: 2.9 },
    { left: 65, top: 70, delay: 4, duration: 3.3 },
    { left: 5, top: 40, delay: 4.5, duration: 2.7 },
    { left: 95, top: 25, delay: 5, duration: 4.2 },
    { left: 45, top: 90, delay: 5.5, duration: 3.1 },
    { left: 75, top: 5, delay: 6, duration: 2.6 },
    { left: 20, top: 55, delay: 6.5, duration: 3.9 },
    { left: 80, top: 75, delay: 7, duration: 2.4 }
  ]

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Enhanced Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 scale-110">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,theme(colors.primary/8),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,theme(colors.primary/6),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.muted/8)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.muted/8)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Animated grid lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-16 w-4 h-4 border border-primary/30 rounded-full" />
        <div className="absolute top-32 right-24 w-6 h-6 border-2 border-primary/20 rotate-45" />
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-primary/20 rounded-full" />
        <div className="absolute bottom-60 right-16 w-8 h-8 border border-primary/25 rounded-full" />
        <div className="absolute top-1/2 left-8 w-2 h-12 bg-gradient-to-b from-primary/30 to-transparent" />
        <div className="absolute top-1/3 right-12 w-5 h-5 border-2 border-primary/20 rotate-12" />
      </div>
      {/* Hero Content */}
      <div className="hero-content relative z-20 text-center px-6 max-w-7xl mx-auto">
        <div className="relative">

          <h1
            ref={titleRef}
            className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 text-foreground leading-none relative"
          >
            Anton Hofmann
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl opacity-50" />
          </h1>
        </div>

        <h2
          ref={subtitleRef}
          className="text-xl sm:text-3xl font-light text-muted-foreground mb-12 tracking-wide relative"
        >
          <span className="relative z-10">Full Stack Developer & Digital Architect</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-sm" />
        </h2>
      </div>

      {/* Fixed floating particles for hydration consistency */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}

// About section with parallax and scroll animations
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, {
        x: -100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      })

      // Content stagger animation
      gsap.fromTo(contentRef.current?.children || [], {
        y: 60,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          end: "bottom 50%",
          toggleActions: "play none none reverse"
        }
      })

      // Image parallax
      gsap.to(imageRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 ref={titleRef} className="text-5xl sm:text-6xl font-bold mb-8 text-foreground">
              Digitale
              <span className="block text-primary">
                Erlebnisse
              </span>
            </h2>

            <div ref={contentRef} className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Ich bin überzeugt, dass großartige Software nicht nur sauberen Code bedeutet—sondern auch
                Erlebnisse schafft, die sich magisch anfühlen, Schnittstellen, die Bedürfnisse vorausahnen,
                und Systeme, die Benutzer mühelos ihre Ziele erreichen lassen.
              </p>

              <p className="text-lg leading-relaxed">
                Mit über 5 Jahren Erfahrung in der Full-Stack-Entwicklung spezialisiere ich mich auf
                skalierbare Webanwendungen, die modernste Technologie mit intuitiven Designprinzipien
                verbinden.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { icon: Eye, text: "User-Centered Design", color: "text-blue-600 dark:text-blue-400" },
                  { icon: Brain, text: "Strategic Thinking", color: "text-purple-600 dark:text-purple-400" },
                  { icon: Lightbulb, text: "Innovation", color: "text-yellow-600 dark:text-yellow-400" },
                  { icon: Target, text: "Goal-Oriented", color: "text-green-600 dark:text-green-400" }
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="text-sm font-medium text-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <AnimatedCodeEditor />
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats section with counter animations
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = [
        { element: ".stat-1", endValue: 50000, suffix: "+" },
        { element: ".stat-2", endValue: 5, suffix: "+" },
        { element: ".stat-3", endValue: 29, suffix: "+" },
        { element: ".stat-4", endValue: 24, suffix: "/7" }
      ]

      stats.forEach(({ element, endValue, suffix }) => {
        gsap.fromTo(element, {
          textContent: 0
        }, {
          textContent: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          },
          onUpdate: function () {
            this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent) + suffix
          }
        })
      })

      // Cards animation
      gsap.fromTo(statsRef.current?.children || [], {
        y: 80,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { number: "stat-1", label: "Geschriebene Zeilen Code", icon: Code },
    { number: "stat-2", label: "Jahre Erfahrung", icon: Calendar },
    { number: "stat-3", label: "Gelernte Fähigkeiten", icon: Trophy },
    { number: "stat-4", label: "Passion für Code", icon: Heart }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Meine Geschichte in Zahlen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Projekt ist eine Reise der Innovation, Präzision und Leidenschaft für das Erstellen
            außergewöhnlicher digitale Erlebnisse.
          </p>
        </div>

        <div ref={statsRef} className="grid md:grid-cols-4 gap-8">
          {stats.map(({ number, label, icon: Icon }) => (
            <div key={number} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className={`text-4xl font-bold text-primary mb-2 ${number}`}>
                0
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Navigation section with call-to-action
function NavigationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [], {
        y: 100,
        opacity: 0,
        rotationX: 45
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const navigationCards = [
    {
      title: "Projekte ansehen",
      description: "Entdecken Sie meine neuesten Projekte und Fallstudien",
      href: "/projects",
      icon: Globe
    },
    {
      title: "Technische Fähigkeiten",
      description: "Tiefer in meine technische Expertise eindringen",
      href: "/skills",
      icon: Code2
    },
    {
      title: "Lebenslauf",
      description: "Erkunden Sie meine berufliche Geschichte",
      href: "/resume",
      icon: FileText
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Bereit für
            <span className="block text-primary">
              Zusammenarbeit?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam etwas Großartiges erschaffen. Entdecken Sie meine Arbeit oder
            kontaktieren Sie mich, um Ihr nächstes Projekt zu besprechen.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {navigationCards.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="group">
              <div className="relative p-8 bg-card border border-border rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                  <ArrowDown className="w-5 h-5 text-primary mt-4 transform rotate-[-45deg] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <main className="relative bg-background overflow-x-hidden">
      <FloatingParticles />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <NavigationSection />
    </main>
  )
}
