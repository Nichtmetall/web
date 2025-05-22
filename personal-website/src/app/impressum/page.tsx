"use client"

import { motion } from "framer-motion"
import Impressum from "@/content/impressum.mdx"

export default function ImpressumPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <Impressum />
      </motion.div>
    </div>
  )
} 