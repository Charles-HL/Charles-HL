import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import type { SectionCopy } from "@/components/landing/copy";
import ProjectCard, { type ProjectAngle } from "@/components/ProjectCard";
import ProjectGrid from "@/components/projects/ProjectGrid";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getProjectsBySlugs } from "@/lib/projects";

interface FeaturedProjectsProps {
  copy: SectionCopy;
  locale: Locale;
  slugs: readonly string[];
  angle: ProjectAngle;
  tone?: SectionTone;
}

export default async function FeaturedProjects({
  copy,
  locale,
  slugs,
  angle,
  tone,
}: FeaturedProjectsProps) {
  const t = await getTranslations("common");
  const projects = getProjectsBySlugs(slugs);

  return (
    <Section id="projects" tone={tone}>
      <SectionHeader {...copy} />
      <ProjectGrid>
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05} className="h-full">
            <ProjectCard project={project} locale={locale} angle={angle} />
          </Reveal>
        ))}
      </ProjectGrid>
      <div className="mt-12 flex justify-center">
        <Button href="/projects" variant="primary" size="lg">
          {t("viewAllProjects")}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
}
