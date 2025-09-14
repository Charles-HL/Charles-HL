import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import { Link } from "@/i18n/navigation";
import projectsData from "../../../../data/projects.json";
import ProjectCard from "@/components/ProjectCard";

type Props = {
  params: Promise<{ locale: "en" | "fr" }>;
};

interface Project {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  period: { en: string; fr: string };
  type: { en: string; fr: string };
  description: { en: string; fr: string };
  technologies: string[];
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const projects = projectsData.projects as Project[];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-12 lg:pt-32 pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              {t("pages.projects.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("pages.projects.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  maxTechnologies={4}
                  buttonText={t("pages.projects.viewProject")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-0 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
                {t("pages.projects.cta.title")}
              </h2>
              <p className="text-xl mb-8 text-blue-100 drop-shadow">
                {t("pages.projects.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full font-semibold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl border border-white/30"
                >
                  {t("pages.projects.cta.getQuote")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent backdrop-blur-sm border-2 border-white/80 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200 shadow-lg"
                >
                  {t("pages.projects.cta.contactMe")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
