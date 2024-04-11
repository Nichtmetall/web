export interface TypographyH2Props {
  children: React.ReactNode;
}

export default function TypographyH2({ children }: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
