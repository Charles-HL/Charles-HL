"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { isProjectCategory } from "@/lib/project-categories";
import type { ProjectCategory } from "@/types/project";
import ProjectGrid from "./ProjectGrid";

export const CATEGORY_QUERY_PARAM = "categorie";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  /** Server-rendered cards with the categories used for filtering. */
  items: { slug: string; categories: ProjectCategory[]; card: ReactNode }[];
}

/** Category filter of the catalogue; the active category lives in the URL. */
export default function ProjectFilter({ categories, items }: ProjectFilterProps) {
  const t = useTranslations("projectsPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const requested = searchParams.get(CATEGORY_QUERY_PARAM);
  const active =
    isProjectCategory(requested) && categories.includes(requested)
      ? requested
      : null;
  const visibleItems = active
    ? items.filter((item) => item.categories.includes(active))
    : items;

  const select = (category: ProjectCategory | null) => {
    router.replace(
      category
        ? { pathname: "/projects", query: { [CATEGORY_QUERY_PARAM]: category } }
        : "/projects",
      { scroll: false }
    );
  };

  const buttonClass = (selected: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
      selected
        ? "border-blue-600 bg-blue-600 text-white shadow-md"
        : "border-gray-300 bg-white/80 text-gray-700 hover:border-blue-400 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
    }`;

  return (
    <div>
      <div
        role="group"
        aria-label={t("filter.label")}
        className="mb-4 flex flex-wrap justify-center gap-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => select(null)}
          className={buttonClass(active === null)}
        >
          {t("filter.all")}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => select(category)}
            className={buttonClass(active === category)}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {t("count", { count: visibleItems.length })}
      </p>

      <ProjectGrid>
        {visibleItems.map((item) => (
          <div key={item.slug}>{item.card}</div>
        ))}
      </ProjectGrid>
    </div>
  );
}
