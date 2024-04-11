"use client";

import ThemeSwitcher from "@/theme-switcher";
import TypographyLarge from "../typography/TypographyLarge";
import TypographyMuted from "../typography/TypographyMuted";
import TypographyLink from "../typography/TypographyLink";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between px-20 py-6">
      <TypographyLink href="/">hofmannanton.de</TypographyLink>
      <ThemeSwitcher />
    </div>
  );
}
