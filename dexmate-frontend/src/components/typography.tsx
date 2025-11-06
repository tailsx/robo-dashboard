export function PageHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold mb-3">{children}</h2>;
}

