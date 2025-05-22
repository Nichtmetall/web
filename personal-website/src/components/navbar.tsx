"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Github, Linkedin, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Lebenslauf", href: "/resume" },
  { name: "Skills", href: "/skills" },
  { name: "Projekte", href: "/projects" },
]

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link 
                    href={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
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
            </div>
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
        </div>
      </div>
    </nav>
  )
} 