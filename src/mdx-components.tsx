import type { MDXComponents } from "mdx/types";
import TypographyH1 from "./components/typography/TypographyH1";
import TypographyH2 from "./components/typography/TypographyH2";
import TypographyH3 from "./components/typography/TypographyH3";
import TypographyH4 from "./components/typography/TypographyH4";
import TypographyLead from "./components/typography/TypographyLead";
import TypographyLink from "./components/typography/TypographyLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <TypographyH1>{children}</TypographyH1>,
    h2: ({ children }) => <TypographyH2>{children}</TypographyH2>,
    h3: ({ children }) => <TypographyH3>{children}</TypographyH3>,
    h4: ({ children }) => <TypographyH4>{children}</TypographyH4>,
    h5: ({ children }) => <TypographyLead>{children}</TypographyLead>,
    a: ({ children, href }) => (
      <TypographyLink href={href ? href : ""} isExternalLink className="w-fit">
        {children}
      </TypographyLink>
    ),
    ...components,
  };
}
