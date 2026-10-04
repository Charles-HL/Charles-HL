import type { ProjectCategory } from "@/types/project";

/** Display order of the catalogue filter. */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "architecture",
  "ecommerce",
  "erp",
  "backend",
  "frontend",
  "field-apps",
  "security",
  "devops",
  "design-system",
  "data",
  "seo",
  "ai",
];

export function isProjectCategory(value: unknown): value is ProjectCategory {
  return (
    typeof value === "string" &&
    (PROJECT_CATEGORIES as string[]).includes(value)
  );
}

type CategoryPattern = "dots" | "grid" | "diagonal";

/** Fallback visual of a project: gradient and CSS motif of its main category. */
export const projectCategoryVisuals: Record<
  ProjectCategory,
  { gradient: string; pattern: CategoryPattern }
> = {
  architecture: { gradient: "from-blue-600 to-emerald-600", pattern: "grid" },
  ecommerce: { gradient: "from-orange-500 to-rose-600", pattern: "dots" },
  backend: { gradient: "from-slate-700 to-blue-700", pattern: "grid" },
  security: { gradient: "from-emerald-600 to-teal-800", pattern: "diagonal" },
  devops: { gradient: "from-indigo-600 to-slate-800", pattern: "grid" },
  erp: { gradient: "from-amber-500 to-orange-700", pattern: "diagonal" },
  frontend: { gradient: "from-sky-500 to-blue-700", pattern: "dots" },
  "design-system": { gradient: "from-fuchsia-600 to-indigo-600", pattern: "dots" },
  "field-apps": { gradient: "from-lime-600 to-emerald-700", pattern: "diagonal" },
  data: { gradient: "from-cyan-600 to-blue-800", pattern: "grid" },
  ai: { gradient: "from-violet-600 to-blue-600", pattern: "dots" },
  seo: { gradient: "from-teal-500 to-sky-700", pattern: "diagonal" },
};
