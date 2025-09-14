import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { Calendar, Tag, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import projectsData from "../../../../../data/projects.json";

type Props = {
  params: Promise<{ locale: "en" | "fr"; slug: string }>;
};

interface Project {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  period: { en: string; fr: string };
  type: { en: string; fr: string };
  description: { en: string; fr: string };
  keyFeatures: { en: string[]; fr: string[] };
  businessImpact?: { en: string[]; fr: string[] };
  technologies: string[];
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const project = (projectsData.projects as Project[]).find(
    (p) => p.id === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("projects.projectDetail.backToProjects")}
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {project.type[locale]}
                </span>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.period[locale]}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                {project.title[locale]}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {project.subtitle[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="pb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("projects.projectDetail.projectOverview")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("projects.keyFeatures")}
              </h2>
              <div className="grid gap-6">
                {project.keyFeatures[locale].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact */}
      {project.businessImpact && (
        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-50/80 to-blue-50/80 dark:from-green-900/30 dark:to-blue-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {t("projects.businessImpact")}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.businessImpact[locale].map((impact, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-500/90 backdrop-blur-sm border border-green-400/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <ExternalLink className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("projects.technologiesUsed")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-4 py-2 bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-4 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t("projects.projectDetail.interestedInSimilar")}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {t("projects.projectDetail.discussProject")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/90 backdrop-blur-sm border border-white/20 text-blue-600 rounded-full font-semibold hover:bg-white hover:shadow-lg transition-all duration-200"
                >
                  {t("projects.projectDetail.getQuote")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-200"
                >
                  {t("projects.projectDetail.contactMe")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
