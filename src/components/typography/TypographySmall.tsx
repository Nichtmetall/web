export interface TypographySmallProps {
  children: React.ReactNode;
}

export default function TypographySmall({ children }: TypographySmallProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
