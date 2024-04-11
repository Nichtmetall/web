export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-20 w-full justify-center">
      {children}
    </div>
  );
}
