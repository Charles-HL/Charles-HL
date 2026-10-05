export type Localized<T> = { fr: T; en: T };

export type ProjectCategory =
  | "architecture"
  | "ecommerce"
  | "backend"
  | "security"
  | "devops"
  | "erp"
  | "frontend"
  | "design-system"
  | "field-apps"
  | "data"
  | "ai"
  | "seo";

/** Lucide icon names available for the project fallback visual. */
export type ProjectIcon =
  | "Network"
  | "ShoppingCart"
  | "Server"
  | "ShieldCheck"
  | "Store"
  | "FileSpreadsheet"
  | "ServerCog"
  | "Layers"
  | "Wrench"
  | "Truck"
  | "ClipboardSignature"
  | "Scale"
  | "Globe"
  | "Bot"
  | "ShoppingBag"
  | "Database";

export type StackGroup =
  | "Frontend"
  | "Backend"
  | "Data"
  | "Sécurité"
  | "Infra"
  | "Qualité"
  | "Intégrations"
  | "IA";

export interface ProjectPoint {
  title: string;
  description: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

/**
 * A portfolio project. The schema deliberately has no employment type or
 * period: client, company and personal projects share the same shape.
 */
export interface Project {
  /** French slug, stable and identical in both locales. */
  slug: string;
  /** Catalogue sort order (ascending). */
  order: number;
  featured: boolean;
  categories: ProjectCategory[];
  /** Icon of the fallback visual shown while no cover exists. */
  icon: ProjectIcon;
  /** Future cover image, e.g. /projects/<slug>/cover.webp. */
  cover?: string;
  title: Localized<string>;
  /** One line, shown on cards. */
  tagline: Localized<string>;
  /** Two to three lines, shown on cards and used as meta description. */
  summary: Localized<string>;
  /** Page title when `title` exceeds 60 characters (search results truncate it). */
  metaTitle?: Localized<string>;
  /** Meta description when `summary` falls outside 120-165 characters. */
  metaDescription?: Localized<string>;
  /** The business problem. */
  context: Localized<string>;
  /** What I did. */
  role: Localized<string>;
  /** Paragraphs separated by a blank line. */
  solution: Localized<string>;
  highlights: Localized<ProjectPoint[]>;
  engineering: Localized<ProjectPoint[]>;
  /** Hidden when empty. */
  metrics: Localized<ProjectMetric[]>;
  stack: { group: StackGroup; items: string[] }[];
}
