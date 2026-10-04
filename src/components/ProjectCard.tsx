import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Chip from "@/components/ui/Chip";
import ProjectVisual from "@/components/projects/ProjectVisual";
import type { Project } from "@/types/project";

/** What a card emphasizes, depending on the audience of the page. */
export type ProjectAngle = "impact" | "architecture" | "skills";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  angle?: ProjectAngle;
  maxTechnologies?: number;
}

const ProjectCard = async ({
  project,
  locale,
  angle = "skills",
  maxTechnologies = 4,
}: ProjectCardProps) => {
  const [t, tCategories] = await Promise.all([
    getTranslations("common"),
    getTranslations("projectsPage.categories"),
  ]);
  const metrics = project.metrics[locale].slice(0, 2);
  const technologies = project.stack.flatMap((group) => group.items);
  const showMetrics = angle === "impact" && metrics.length > 0;
  const showEngineering = angle === "architecture";
  const showTechnologies = !showMetrics && !showEngineering;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-blue-900/30 dark:bg-gray-800">
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.categories.slice(0, 2).map((category) => (
            <Chip key={category} tone="accent">
              {tCategories(category)}
            </Chip>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          <Link
            href={{
              pathname: "/projects/[slug]",
              params: { slug: project.slug },
            }}
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-blue-500"
          >
            {project.title[locale]}
          </Link>
        </h3>

        <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
          {project.tagline[locale]}
        </p>

        <p className="mb-5 line-clamp-3 text-gray-700 dark:text-gray-400 leading-relaxed">
          {project.summary[locale]}
        </p>

        {showMetrics && (
          <dl className="mb-5 grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl bg-blue-50/70 px-3 py-2 dark:bg-blue-900/20"
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {metric.value}
                </dd>
                <dd className="text-xs text-gray-600 dark:text-gray-400">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {showEngineering && (
          <ul className="mb-5 space-y-2">
            {project.engineering[locale].slice(0, 3).map((point) => (
              <li
                key={point.title}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{point.title}</span>
              </li>
            ))}
          </ul>
        )}

        {showTechnologies && (
          <div className="mb-5 flex flex-wrap gap-2">
            {technologies.slice(0, maxTechnologies).map((technology) => (
              <Chip key={technology}>{technology}</Chip>
            ))}
            {technologies.length > maxTechnologies && (
              <Chip tone="accent">
                {t("moreItems", { count: technologies.length - maxTechnologies })}
              </Chip>
            )}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
          {t("viewProject")}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
};

export default ProjectCard;
