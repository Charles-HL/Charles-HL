import type { ReactNode } from "react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  CalendarClock,
  Compass,
  FileSignature,
  GraduationCap,
  MapPin,
  Network,
  Sparkles,
  Users,
  UserCog,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import AgenticEngineering from "@/components/sections/AgenticEngineering";
import AudienceSwitcher from "@/components/sections/AudienceSwitcher";
import CompanyExperience from "@/components/sections/CompanyExperience";
import CtaBanner from "@/components/sections/CtaBanner";
import ExpertiseGrid from "@/components/sections/ExpertiseGrid";
import Faq, { type FaqCopy } from "@/components/sections/Faq";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import FeatureCards, { type FeatureCardsCopy } from "@/components/sections/FeatureCards";
import HeroSection from "@/components/sections/HeroSection";
import WorkProcess from "@/components/sections/WorkProcess";
import type { SectionTone } from "@/components/ui/Section";
import type { LandingConfig, SectionConfig } from "@/content/landings";
import { getLandingCopy } from "./copy";

interface RenderContext {
  config: LandingConfig;
  locale: Locale;
  tone: SectionTone;
}

type SectionRenderers = {
  [Type in SectionConfig["type"]]: (
    section: Extract<SectionConfig, { type: Type }>,
    context: RenderContext
  ) => Promise<ReactNode>;
};

const renderers: SectionRenderers = {
  hero: async (section, { config }) => (
    <HeroSection
      landing={config.id}
      primaryHref={section.primaryHref}
      secondaryHref={section.secondaryHref}
      showCvNote={section.showCvNote}
    />
  ),
  companies: async (_, { config, tone }) => {
    const t = await getTranslations("sections.companies.labels");
    return <CompanyExperience label={t(config.companyLabelKey)} tone={tone} />;
  },
  expertise: async (section, { config, tone }) => (
    <ExpertiseGrid
      copy={await getLandingCopy(config.id, "expertise")}
      variant={section.variant}
      detailed={section.detailed}
      tone={tone}
    />
  ),
  agentic: async (section, { config, tone }) => {
    const { intro } = await getLandingCopy<{ intro: string }>(config.id, "agentic");
    return <AgenticEngineering intro={intro} depth={section.depth} tone={tone} />;
  },
  projects: async (section, { config, locale, tone }) => (
    <FeaturedProjects
      copy={await getLandingCopy(config.id, "projects")}
      locale={locale}
      slugs={config.featuredProjects}
      angle={section.angle}
      tone={tone}
    />
  ),
  process: async (section, { config, tone }) => (
    <WorkProcess
      copy={await getLandingCopy(config.id, "process")}
      steps={section.steps}
      tone={tone}
    />
  ),
  audiences: async (_, { config, tone }) => (
    <AudienceSwitcher
      copy={await getLandingCopy(config.id, "audiences")}
      exclude={config.id === "home" ? undefined : config.id}
      tone={tone}
    />
  ),
  faq: async (_, { config, tone }) => (
    <Faq copy={await getLandingCopy<FaqCopy>(config.id, "faq")} tone={tone} />
  ),
  terms: async (_, { config, tone }) => (
    <FeatureCards
      id="terms"
      copy={await getLandingCopy<FeatureCardsCopy>(config.id, "terms")}
      icons={[FileSignature, MapPin, CalendarClock]}
      tone={tone}
    />
  ),
  profile: async (_, { config, tone }) => (
    <FeatureCards
      id="profile"
      copy={await getLandingCopy<FeatureCardsCopy>(config.id, "profile")}
      icons={[GraduationCap, Compass, Users]}
      tone={tone}
    />
  ),
  seeking: async (_, { config, tone }) => (
    <FeatureCards
      id="seeking"
      copy={await getLandingCopy<FeatureCardsCopy>(config.id, "seeking")}
      icons={[UserCog, Network, Sparkles]}
      tone={tone}
    />
  ),
  cta: async (_, { config, tone }) => {
    const copy = await getLandingCopy<{ title: string; description: string; button: string }>(
      config.id,
      "cta"
    );
    return (
      <CtaBanner
        title={copy.title}
        description={copy.description}
        primary={{ label: copy.button, href: config.ctaHref }}
        tone={tone}
      />
    );
  },
};

function renderSection(section: SectionConfig, context: RenderContext) {
  const render = renderers[section.type] as (
    section: SectionConfig,
    context: RenderContext
  ) => Promise<ReactNode>;
  return render(section, context);
}

interface LandingPageProps {
  config: LandingConfig;
  locale: Locale;
}

/** Renders a landing page from its configuration (server component). */
export default async function LandingPage({ config, locale }: LandingPageProps) {
  const t = await getTranslations();
  const pageName =
    config.id === "home" ? "" : t(`landing.${config.id}.meta.breadcrumb`);

  // Hero excluded, sections alternate plain and muted backgrounds.
  const sections = await Promise.all(
    config.sections.map((section, index) =>
      renderSection(section, {
        config,
        locale,
        tone: index % 2 === 0 ? "muted" : "plain",
      })
    )
  );

  return (
    <PageLayout background="animated">
      <StructuredData
        data={config.jsonLd({ locale, homeName: t("common.breadcrumbHome"), pageName })}
      />
      {sections.map((section, index) => (
        <div key={`${config.sections[index].type}-${index}`}>{section}</div>
      ))}
    </PageLayout>
  );
}
