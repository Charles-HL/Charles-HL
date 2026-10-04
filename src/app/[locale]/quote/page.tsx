import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calculator, Clock, Euro, FileText } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import QuoteForm from "@/components/forms/QuoteForm";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const steps = [
  { key: "step1", icon: FileText },
  { key: "step2", icon: Calculator },
  { key: "step3", icon: Euro },
  { key: "step4", icon: Clock },
] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quote.meta" });

  return buildPageMetadata({
    locale,
    href: "/quote",
    title: t("title"),
    description: t("description"),
  });
}

export default async function QuotePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");

  return (
    <PageLayout>
      <StructuredData
        data={await buildBreadcrumb(locale, [
          { name: t("meta.breadcrumb"), href: "/quote" },
        ])}
      />
      <PageHeader title={t("title")} intro={t("subtitle")} />

      <Section>
        <ol className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="rounded-2xl border border-white/60 bg-white/80 p-6 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-600/50 dark:bg-gray-800/90"
            >
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                <Icon className="h-8 w-8 text-white" />
              </span>
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {t(`process.${key}.title`)}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {t(`process.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mx-auto max-w-4xl">
          <QuoteForm />
        </div>
      </Section>
    </PageLayout>
  );
}
