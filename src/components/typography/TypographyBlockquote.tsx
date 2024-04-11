export interface TypographyBlockquoteProps {
  children: React.ReactNode;
}

export default function TypographyBlockquote({
  children,
}: TypographyBlockquoteProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
