import { Suspense } from "react";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import ContactForm from "@/components/forms/ContactForm";
import ContactFormFromQuery from "@/components/forms/ContactFormFromQuery";
import CtaBanner from "@/components/sections/CtaBanner";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import siteConfig from "@/config";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return buildPageMetadata({
    locale,
    href: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const methods = [
    {
      icon: Mail,
      label: t("methods.email"),
      value: (
        <a href={`mailto:${siteConfig.email}`} className="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
          {siteConfig.email}
        </a>
      ),
    },
    { icon: MapPin, label: t("methods.location"), value: siteConfig.location },
    { icon: Clock, label: t("methods.responseTime"), value: t("methods.responseTimeValue") },
  ];

  return (
    <PageLayout>
      <StructuredData
        data={await buildBreadcrumb(locale, [
          { name: t("meta.breadcrumb"), href: "/contact" },
        ])}
      />
      <PageHeader title={t("title")} intro={t("subtitle")} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              {t("getInTouch")}
            </h2>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
              {t("description")}
            </p>

            <ul className="space-y-6">
              {methods.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center">
                  <span className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{t("social")}</h3>
              <div className="flex gap-4">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-white transition-colors hover:bg-gray-900"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <Suspense fallback={<ContactForm />}>
            <ContactFormFromQuery />
          </Suspense>
        </div>
      </Section>

      <CtaBanner
        tone="muted"
        title={t("quickQuote.title")}
        description={t("quickQuote.description")}
        primary={{ label: t("quickQuote.button"), href: "/quote" }}
      />
    </PageLayout>
  );
}
