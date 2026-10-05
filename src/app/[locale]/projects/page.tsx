import { Suspense } from "react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import StructuredData from "@/components/StructuredData";
import PageLayout from "@/components/PageLayout";
import ProjectFilter from "@/components/projects/ProjectFilter";
import ProjectGrid from "@/components/projects/ProjectGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";
import { getAllProjects } from "@/lib/projects";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage.meta" });

  return buildPageMetadata({
    locale,
    href: "/projects",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");

  const projects = getAllProjects();
  const categories = PROJECT_CATEGORIES.filter((category) =>
    projects.some((project) => project.categories.includes(category))
  );
  const items = projects.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    card: <ProjectCard project={project} locale={locale} />,
  }));
  return (
    <PageLayout>
      <StructuredData
        data={await buildBreadcrumb(locale, [
          { name: t("title"), href: "/projects" },
        ])}
      />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section id="catalog">
        {/* Keeps the heading order h1 → h2 → h3 (card titles). */}
        <h2 className="sr-only">{t("catalogTitle")}</h2>
        <Suspense
          fallback={
            <ProjectGrid>
              {items.map((item) => (
                <div key={item.slug}>{item.card}</div>
              ))}
            </ProjectGrid>
          }
        >
          <ProjectFilter categories={categories} items={items} />
        </Suspense>
      </Section>

      <CtaBanner
        tone="muted"
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.contact"), href: "/contact" }}
        secondary={{ label: t("cta.quote"), href: "/quote" }}
      />
    </PageLayout>
  );
}
