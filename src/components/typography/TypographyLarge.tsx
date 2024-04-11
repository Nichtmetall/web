export interface TypographyLargeProps {
  children: React.ReactNode;
}

export default function TypographyLarge({ children }: TypographyLargeProps) {
  return <div className="text-lg font-semibold">{children}</div>;
}
