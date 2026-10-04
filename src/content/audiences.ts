import { Briefcase, Building2, UserSearch, type LucideIcon } from "lucide-react";

export type AudienceId = "freelance" | "consulting" | "recruiters";
export type LandingId = "home" | AudienceId;

/** Values accepted by the contact form "profile" field (also `?profil=`). */
export const CONTACT_PROFILES = [
  "freelance",
  "consulting",
  "recruiters",
  "other",
] as const;
export type ContactProfile = (typeof CONTACT_PROFILES)[number];

export function isContactProfile(value: unknown): value is ContactProfile {
  return (
    typeof value === "string" &&
    (CONTACT_PROFILES as readonly string[]).includes(value)
  );
}

export const contactHref = (profile: AudienceId) =>
  ({ pathname: "/contact", query: { profil: profile } }) as const;

export interface Audience {
  id: AudienceId;
  href: "/freelance" | "/consulting" | "/recruiters";
  icon: LucideIcon;
  /** Target of the main "Let's talk" call to action on this audience page. */
  ctaHref: "/quote" | ReturnType<typeof contactHref>;
}

export const audiences: Audience[] = [
  { id: "freelance", href: "/freelance", icon: Briefcase, ctaHref: "/quote" },
  {
    id: "consulting",
    href: "/consulting",
    icon: Building2,
    ctaHref: contactHref("consulting"),
  },
  {
    id: "recruiters",
    href: "/recruiters",
    icon: UserSearch,
    ctaHref: contactHref("recruiters"),
  },
];

/** Internal pathnames of the four landing pages. */
export const landingPathnames = {
  home: "/",
  freelance: "/freelance",
  consulting: "/consulting",
  recruiters: "/recruiters",
} as const satisfies Record<LandingId, string>;

export type LandingPathname = (typeof landingPathnames)[LandingId];

/** Call to action target of each page, used by the navigation bar. */
export function getCtaHref(pathname: string) {
  return (
    audiences.find((audience) => audience.href === pathname)?.ctaHref ??
    "/contact"
  );
}
