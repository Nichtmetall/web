"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, User, Building, AlertTriangle } from "lucide-react"

// Magic UI Components
import { DotPattern } from "@/components/magicui/dot-pattern"
import { AuroraText } from "@/components/magicui/aurora-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ImpressumPage() {
  return (
    <main className="relative min-h-screen">
      {/* Glowing Dot Pattern Background */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "fixed inset-0 -z-10 opacity-50"
        )}
        width={20}
        height={20}
      />

      {/* Glow Effect Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20" />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BlurFade delay={0.1}>
          <section className="text-center py-16 md:py-24">
            <div className="space-y-6">
              <div className="space-y-4">
                <AuroraText className="text-4xl md:text-6xl font-bold">
                  Impressum
                </AuroraText>

                <div className="text-xl md:text-2xl text-muted-foreground">
                  Angaben gemäß § 5 TMG
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        <div className="space-y-6">
          <BlurFade delay={0.2} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Angaben gemäß § 5 TMG
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="font-semibold">Anton Hofmann</div>
                  <div className="text-muted-foreground">Conertplatz 5</div>
                  <div className="text-muted-foreground">01159 Dresden</div>
                  <div className="text-muted-foreground">Deutschland</div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Kontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="mailto:mail@antonhofmann.de">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground hover:text-primary transition-colors">mail@antonhofmann.de</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="font-semibold">Anton Hofmann</div>
                  <div className="text-muted-foreground">Conertplatz 5</div>
                  <div className="text-muted-foreground">01159 Dresden</div>
                  <div className="text-muted-foreground">Deutschland</div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Haftungsausschluss
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Haftung für Inhalte</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Haftung für Links</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Urheberrecht</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </main>
  )
} 