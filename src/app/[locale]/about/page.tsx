import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import PageLayout from "@/components/PageLayout";
import { Download, MapPin, Calendar, Coffee, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: "en" | "fr" }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    path: "/about",
    locale,
    type: "profile",
    tags: [
      "about",
      "biography",
      "skills",
      "experience",
      "full stack developer",
      "AI engineer",
    ],
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");

  // Données structurées pour les breadcrumbs
  const breadcrumbData = generateBreadcrumbSchema([
    { name: "Accueil", url: "https://charleshl.com" },
    { name: t("title"), url: `https://charleshl.com/${locale}/about` },
  ]);

  const skills = [
    {
      category: "Frontend",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vue.js",
      ],
    },
    {
      category: "Backend",
      technologies: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
      ],
    },
    {
      category: "AI/Data Science",
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "Scikit-learn",
      ],
    },
    {
      category: "Tools & DevOps",
      technologies: ["Docker", "GitHub Actions", "AWS", "Git", "Figma"],
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <PageLayout>
        {/* Hero Section */}
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Profile Photo */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl">
                  <Image
                    src="/charles-hl-profile.jpg"
                    alt="Charles HL - Full Stack Developer, AI Engineer & Data Scientist based in Toulouse, France"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                {t("title")}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("subtitle")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
                {t("description")}
              </p>
            </div>
          </div>
        </section>

        {/* Personal Story */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("personalStory.title")}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  {t("personalStory.content")}
                </p>

                {/* Quick Facts */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Toulouse, France
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {`${new Date().getFullYear() - 2020}+ ${t(
                        "quickFacts.experience"
                      )}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {t("quickFacts.coffeeEnthusiast")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("expertise.title")}
                </h2>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg p-8">
                <ul className="grid md:grid-cols-2 gap-4">
                  {(t.raw("expertise.items") as string[]).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Me */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("whyChooseMe.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  t("whyChooseMe.fast"),
                  t("whyChooseMe.adapted"),
                  t("whyChooseMe.modern"),
                  t("whyChooseMe.support"),
                  t("whyChooseMe.local"),
                  t("whyChooseMe.experience"),
                ].map((reason, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("skills.title")}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t("skills.subtitle")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {skillGroup.category}
                    </h3>
                    <div className="space-y-2">
                      {skillGroup.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Availability & CTA */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {t("availability.title")}
                </h2>
                <p className="text-xl mb-2">{t("availability.status")}</p>
                <p className="text-blue-100 mb-8">{t("availability.note")}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
                  >
                    {t("cta.getInTouch")}
                  </Link>
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                  >
                    {t("cta.requestQuote")}
                  </Link>
                  <button className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                    <Download className="w-4 h-4 mr-2" />
                    {t("downloadResume")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
