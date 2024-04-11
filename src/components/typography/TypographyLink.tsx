"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TypographyLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  isExternalLink?: boolean;
}

export default function TypographyLink({
  children,
  href,
  className,
  isExternalLink,
}: TypographyLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition inline-flex items-center gap-2 justify-between text-primary/60 hover:text-primary hover:underline underline-offset-4",
        className
      )}
      target={isExternalLink ? "_blank" : "_self"}
    >
      {children}
      {isExternalLink && (
        <span>
          <ArrowUpRight size={14} />
        </span>
      )}
    </Link>
  );
}
