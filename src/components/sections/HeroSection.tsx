import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button, { type ButtonHref } from "@/components/Button";
import { getLandingCopy } from "@/components/landing/copy";
import type { LandingId } from "@/content/audiences";
import { Link } from "@/i18n/navigation";

interface HeroCopy {
  eyebrow: string;
  title: string;
  pitch: string;
  primaryCta: string;
  secondaryCta: string;
  /** Three short, qualitative proofs shown under the calls to action. */
  proofs: string[];
}

interface HeroSectionProps {
  landing: LandingId;
  primaryHref: ButtonHref;
  secondaryHref: ButtonHref;
  showCvNote?: boolean;
}

export default async function HeroSection({
  landing,
  primaryHref,
  secondaryHref,
  showCvNote = false,
}: HeroSectionProps) {
  const [copy, t] = await Promise.all([
    getLandingCopy<HeroCopy>(landing, "hero"),
    getTranslations("common"),
  ]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 lg:pt-40 lg:pb-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/40 to-emerald-50/40 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90" />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
              <span className="gradient-text">{copy.title}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 text-pretty md:text-xl lg:mx-0 dark:text-gray-300">
              {copy.pitch}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="primary" href={primaryHref}>
                {copy.primaryCta}
              </Button>
              <Button variant="glass" href={secondaryHref}>
                {copy.secondaryCta}
              </Button>
            </div>

            {showCvNote && (
              <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("cvOnRequest")}
              </p>
            )}

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
              {copy.proofs.map((proof) => (
                <li
                  key={proof}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {proof}
                </li>
              ))}
            </ul>

            {landing !== "home" && (
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                {t("seeFullProfile")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="order-first flex justify-center lg:order-none">
            <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-2xl ring-4 ring-blue-500/20 sm:h-36 sm:w-36 lg:h-72 lg:w-72">
              <Image
                src="/charles-hl-profile.jpg"
                alt={t("profilePhotoAlt")}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 288px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
