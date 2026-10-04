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
  return generateLandingMetadata(landings.home, locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingPage config={landings.home} locale={locale} />;
}
