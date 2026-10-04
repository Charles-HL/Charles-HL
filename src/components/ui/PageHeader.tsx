import Section from "./Section";
import SectionHeader from "./SectionHeader";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

/** H1 block of inner pages, offset below the fixed navigation. */
export default function PageHeader(props: PageHeaderProps) {
  return (
    <Section className="!pb-0 pt-28 md:pt-36">
      <SectionHeader as="h1" {...props} className="!mb-0" />
    </Section>
  );
}
