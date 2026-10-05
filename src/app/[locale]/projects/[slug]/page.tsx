import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import EcosystemDiagram from "@/components/projects/EcosystemDiagram";
import ProjectVisual from "@/components/projects/ProjectVisual";
import CtaBanner from "@/components/sections/CtaBanner";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import {
  AGENTIC_PROJECT_SLUG,
  ECOSYSTEM_PROJECT_SLUG,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects";
import { buildPageMetadata, generateProjectSchema } from "@/lib/seo";
import type { StackGroup } from "@/types/project";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

const stackGroupKeys: Record<
  StackGroup,
  "frontend" | "backend" | "data" | "security" | "infra" | "quality" | "integrations" | "ai"
> = {
  Frontend: "frontend",
  Backend: "backend",
  Data: "data",
  Sécurité: "security",
  Infra: "infra",
  Qualité: "quality",
  Intégrations: "integrations",
  IA: "ai",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjects().map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildPageMetadata({
    locale,
    href: { pathname: "/projects/[slug]", params: { slug } },
    title: (project.metaTitle ?? project.title)[locale],
    description: (project.metaDescription ?? project.summary)[locale],
    keywords: project.stack.flatMap((group) => group.items).slice(0, 10),
    type: "article",
  });
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-5 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const [t, tCategories, tProjects] = await Promise.all([
    getTranslations("projectDetail"),
    getTranslations("projectsPage.categories"),
    getTranslations("projectsPage"),
  ]);
  const metrics = project.metrics[locale];
  const paragraphs = project.solution[locale].split("\n\n");

  return (
    <PageLayout>
      <StructuredData
        data={[
          generateProjectSchema(project, locale),
          await buildBreadcrumb(locale, [
            { name: tProjects("title"), href: "/projects" },
            {
              name: project.title[locale],
              href: { pathname: "/projects/[slug]", params: { slug } },
            },
          ]),
        ]}
      />

      {/* Hero */}
      <Section className="pt-28 md:pt-36">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <Chip key={category} tone="accent">
                  {tCategories(category)}
                </Chip>
              ))}
            </div>
            <h1 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
              <span className="gradient-text">{project.title[locale]}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700 text-pretty md:text-xl dark:text-gray-300">
              {project.tagline[locale]}
            </p>
          </div>
          <ProjectVisual project={project} variant="hero" />
        </div>

        {metrics.length > 0 && (
          <div className="mt-10">
            <h2 className="sr-only">{t("keyFigures")}</h2>
            <dl
              className={`grid grid-cols-2 gap-4 ${
                metrics.length >= 4 ? "lg:grid-cols-4" : "md:grid-cols-3"
              }`}
            >
              {metrics.map((metric) => (
                <Card key={metric.label} className="flex flex-col-reverse p-4 sm:p-5">
                  <dt className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </dt>
                  <dd className="text-2xl font-bold sm:text-3xl">
                    <span className="gradient-text">{metric.value}</span>
                  </dd>
                </Card>
              ))}
            </dl>
          </div>
        )}
      </Section>

      {/* Context, role and solution */}
      <Section tone="muted">
        <div className="mx-auto max-w-4xl space-y-12 md:space-y-14">
          <DetailBlock title={t("context")}>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {project.context[locale]}
            </p>
          </DetailBlock>

          <DetailBlock title={t("role")}>
            <p className="rounded-2xl border-l-4 border-blue-600 bg-white p-5 text-lg font-medium text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white">
              {project.role[locale]}
            </p>
          </DetailBlock>

          <DetailBlock title={t("solution")}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </DetailBlock>
        </div>
      </Section>

      {/* Highlights and engineering */}
      <Section>
        <div className="space-y-12 md:space-y-14">
          <DetailBlock title={t("highlights")}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.highlights[locale].map((highlight) => (
                <li key={highlight.title}>
                  <Card className="p-5">
                    <h3 className="mb-2 flex items-start gap-2 font-semibold text-gray-900 dark:text-white">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock title={t("engineering")}>
            <ol className="space-y-4">
              {project.engineering[locale].map((point, index) => (
                <li key={point.title}>
                  <Card className="flex gap-4 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {point.description}
                      </p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </DetailBlock>

          <DetailBlock title={t("stack")}>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.stack.map((group) => (
                <Card key={group.group} className="p-5">
                  <dt className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {t(`stackGroups.${stackGroupKeys[group.group]}`)}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </dd>
                </Card>
              ))}
            </dl>
          </DetailBlock>
        </div>
      </Section>

      {project.slug === ECOSYSTEM_PROJECT_SLUG && (
        <Section tone="muted">
          <DetailBlock title={t("ecosystem")}>
            <EcosystemDiagram />
          </DetailBlock>
        </Section>
      )}

      {project.slug === AGENTIC_PROJECT_SLUG && (
        <Section tone="muted" spacing="compact">
          <div className="flex justify-center">
            <Button variant="secondary" href="/ai-engineering">
              {t("agenticMethod")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Section>
      )}

      <CtaBanner
        tone={
          project.slug === ECOSYSTEM_PROJECT_SLUG || project.slug === AGENTIC_PROJECT_SLUG
            ? "plain"
            : "muted"
        }
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.contact"), href: "/contact" }}
        secondary={{ label: t("cta.quote"), href: "/quote" }}
      />
    </PageLayout>
  );
}
