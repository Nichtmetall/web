"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, User, Building, AlertTriangle } from "lucide-react"

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center justify-center gap-3">
            <User className="h-10 w-10 text-primary" />
            Impressum
          </h1>
          <p className="text-muted-foreground">Angaben gemäß § 5 TMG</p>
        </div>

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
              <div className="text-muted-foreground">Musterstraße 123</div>
              <div className="text-muted-foreground">12345 Musterstadt</div>
              <div className="text-muted-foreground">Deutschland</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Kontakt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+49 (0) 123 456789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>kontakt@example.com</span>
            </div>
          </CardContent>
        </Card>

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
              <div className="text-muted-foreground">Musterstraße 123</div>
              <div className="text-muted-foreground">12345 Musterstadt</div>
              <div className="text-muted-foreground">Deutschland</div>
            </div>
          </CardContent>
        </Card>

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
      </motion.div>
    </div>
  )
} 