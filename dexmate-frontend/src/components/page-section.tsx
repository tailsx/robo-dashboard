import { SectionHeading } from "./typography";

type PageSectionProps = {
  name: string;
  children: React.ReactNode;
};
export function PageSection({ name, children }: PageSectionProps) {
  return (
    <section>
      <SectionHeading>{name}</SectionHeading>
      {children}
    </section>
  );
}
