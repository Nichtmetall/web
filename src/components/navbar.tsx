"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants"

const navigation = NAV_LINKS.filter(link => link.href !== "/").slice(0, 3)

const socials = [
  {
    name: "GitHub",
    href: SOCIAL_LINKS.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    icon: Linkedin,
  },
  {
    name: "Email",
    href: `mailto:${SOCIAL_LINKS.email}`,
    icon: Mail,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b z-50 sticky top-0 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="font-bold text-lg">
            Anton Hofmann
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <Link
                      href={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Social Links and Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            {socials.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Theme umschalten</span>
            </Button>
          </div>

          {/* Mobile Theme Toggle and Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Theme umschalten</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menü öffnen"
              className="relative"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, delay: 0.1 }
                }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
                  opacity: { duration: 0.2 }
                }
              }}
              className="md:hidden border-t bg-background/95 backdrop-blur-sm overflow-hidden"
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navigation.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 }
                        }
                      },
                      closed: {
                        y: 50,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 }
                        }
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md ${pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Social Links */}
                <motion.div
                  className="flex justify-center gap-4 pt-4 border-t"
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 },
                        delay: 0.2
                      }
                    },
                    closed: {
                      y: 50,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                >
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          delay: 0.4 + index * 0.1,
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }
                      }}
                      exit={{
                        scale: 0,
                        rotate: 180,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <social.icon className="h-6 w-6" />
                          <span className="sr-only">{social.name}</span>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 