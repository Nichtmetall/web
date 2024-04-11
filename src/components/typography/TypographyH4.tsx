export interface TypographyH4Props {
  children: React.ReactNode;
}

export default function TypographyH4({ children }: TypographyH4Props) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}
