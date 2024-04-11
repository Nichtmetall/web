"use client";

import TypographyH1 from "@/components/typography/TypographyH1";
import TypographyLead from "@/components/typography/TypographyLead";
import TypographyLink from "@/components/typography/TypographyLink";
import TypographyMuted from "@/components/typography/TypographyMuted";
import TypographySmall from "@/components/typography/TypographySmall";
import { Button } from "@/components/ui/button";
import {
  ActivityLogIcon,
  ArrowRightIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen flex items-center justify-center">
      <div className="p-20 flex flex-col gap-6 justify-center text-center max-w-lg w-full">
        <TypographyH1>Anton Hofmann</TypographyH1>
        <TypographyLead>Webdeveloper</TypographyLead>
        <div className="border border-secondary shadow-md rounded-lg p-6 w-full gap-4 flex flex-col">
          <TypographyMuted>Links</TypographyMuted>
          <Link href={"https://www.linkedin.com/in/anton-hofmann-616b691a9/"}>
            <Button variant={"outline"} className="w-full">
              <LinkedInLogoIcon /> LinkedIn
            </Button>
          </Link>
          <Link href={"mailto:mail@hofmannanton.de"}>
            <Button variant={"outline"} className="w-full">
              <EnvelopeClosedIcon /> E-Mail
            </Button>
          </Link>
          <Link href={"https://github.com/nichtmetall"}>
            <Button variant={"outline"} className="w-full">
              <GitHubLogoIcon /> GitHub
            </Button>
          </Link>
        </div>
        <div className="border border-secondary shadow-md rounded-lg p-6 w-full gap-4 flex flex-col">
          <div className="flex justify-center gap-2">
            <TypographyMuted>Weiteres</TypographyMuted>
            <LockClosedIcon className="text-muted-foreground" />
          </div>
          <Button disabled variant={"outline"} className="w-full">
            <FileTextIcon /> Lebenslauf
          </Button>
          <Button disabled variant={"outline"} className="w-full">
            <ActivityLogIcon /> Fähigkeiten
          </Button>
        </div>
        <div className="flex gap-4 justify-center">
          <TypographyLink href="/impressum">Impressum</TypographyLink>
          <TypographyLink isExternalLink href="">
            Docs
          </TypographyLink>
        </div>
      </div>
    </main>
  );
}
