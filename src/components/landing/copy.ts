import { getTranslations } from "next-intl/server";
import type { LandingId } from "@/content/audiences";

export interface SectionCopy {
  eyebrow?: string;
  title: string;
  intro?: string;
}

/**
 * Reads the page-specific copy of a landing section
 * (`landing.<landing>.<section>`). Sections are shared, so the key is only
 * known at runtime; a missing block fails the static build loudly.
 */
export async function getLandingCopy<T extends object = SectionCopy>(
  landing: LandingId,
  section: string
): Promise<T> {
  const t = await getTranslations("landing");
  const copy: unknown = t.raw(`${landing}.${section}` as never);

  if (!copy || typeof copy !== "object") {
    throw new Error(`Missing landing copy: landing.${landing}.${section}`);
  }
  return copy as T;
}
