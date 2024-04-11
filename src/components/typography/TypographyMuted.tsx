export interface TypographyMutedProps {
  children: React.ReactNode;
}

export default function TypographyMuted({ children }: TypographyMutedProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
