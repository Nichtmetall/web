"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} Anton Hofmann. Alle Rechte vorbehalten.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4"
          >
            <Link
              href="/impressum"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 