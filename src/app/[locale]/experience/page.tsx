import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import { Building2, Calendar, MapPin, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: "en" | "fr" }>;
};

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const experiences = [
    {
      id: "freelance",
      title: t("experience.freelance.title"),
      company: t("experience.freelance.company"),
      period: t("experience.freelance.period"),
      location: "Remote / Toulouse, France",
      description: t("pages.experience.detailed.freelance.description"),
      achievements: t.raw(
        "pages.experience.detailed.freelance.achievements"
      ) as string[],
      current: true,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "thales",
      title: t("experience.thales.title"),
      company: t("experience.thales.company"),
      period: t("experience.thales.period"),
      location: t("experience.thales.location"),
      description: t("pages.experience.detailed.thales.description"),
      achievements: t.raw(
        "pages.experience.detailed.thales.achievements"
      ) as string[],
      current: true,
      color: "from-green-500 to-blue-600",
    },
    {
      id: "sopra",
      title: t("experience.sopra.title"),
      company: t("experience.sopra.company"),
      period: t("experience.sopra.period"),
      location: t("experience.sopra.location"),
      description: t("pages.experience.detailed.sopra.description"),
      achievements: t.raw(
        "pages.experience.detailed.sopra.achievements"
      ) as string[],
      current: false,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-12 lg:pt-32 pb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              {t("pages.experience.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("pages.experience.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-2 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative flex items-start mb-12 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} border-4 border-white dark:border-gray-900 shadow-lg z-10`}
                  ></div>

                  {/* Content */}
                  <div className="ml-16 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                          <Building2 className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{exp.company}</span>
                          {exp.current && (
                            <span className="ml-3 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                              {t("experience.current")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {t("pages.experience.keyAchievements")}:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map(
                          (achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {achievement}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-4 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t("pages.experience.cta.title")}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {t("pages.experience.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  {t("pages.experience.cta.contactMe")}
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  {t("pages.experience.cta.viewMyWork")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
