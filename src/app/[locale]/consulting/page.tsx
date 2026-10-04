import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import LandingPage from "@/components/landing/LandingPage";
import { generateLandingMetadata } from "@/components/landing/landing-metadata";
import { landings } from "@/content/landings";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateLandingMetadata(landings.consulting, locale);
}

export default async function ConsultingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingPage config={landings.consulting} locale={locale} />;
}
