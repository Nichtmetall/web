export interface TypographyLeadProps {
  children: React.ReactNode;
}

export default function TypographyLead({ children }: TypographyLeadProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}
