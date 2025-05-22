"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-14rem)] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary px-4"
          animate={{
            backgroundPosition: ["0%", "100%"],
            scale: [1, 1.02, 1],
          }}
          transition={{
            backgroundPosition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          Anton Hofmann
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4 text-center leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Full Stack Entwickler mit Fokus auf moderne Webtechnologien und benutzerfreundliche Anwendungen
        </motion.p>
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            {
              name: "GitHub",
              href: "https://github.com/Nichtmetall",
              icon: Github,
            },
            {
              name: "LinkedIn",
              href: "https://www.linkedin.com/in/anton-hofmann-616b691a9/",
              icon: Linkedin,
            },
            {
              name: "Email",
              href: "mailto:mail@hofmannanton.de",
              icon: Mail,
            },
          ].map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="relative group h-12 w-12 sm:h-10 sm:w-10"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </div>
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
