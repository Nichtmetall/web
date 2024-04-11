"use client";

import ThemeSwitcher from "@/theme-switcher";
import TypographyLarge from "../typography/TypographyLarge";
import TypographyMuted from "../typography/TypographyMuted";
import TypographyLink from "../typography/TypographyLink";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between p-6">
      <TypographyLink isExternalLink href="mailto:mail@hofmannanton.de">
        mail@hofmannanton.de
      </TypographyLink>
      <ThemeSwitcher />
    </div>
  );
}
