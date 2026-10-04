/**
 * Organizations whose projects or teams I worked in, listed by the
 * `CompanyExperience` section. Each entry links to the official website, so
 * the section carries real outbound context instead of decorative logos.
 * `width`/`height` give the file's intrinsic ratio; `size` caps the rendered
 * height so logos keep a comparable optical weight.
 */
export type CompanySector =
  | "energy"
  | "defense"
  | "space"
  | "aeronautics"
  | "aiResearch"
  | "digitalServices";

export type CompanyLogoSize = "sm" | "md" | "lg" | "tall";

export interface Company {
  id: string;
  /** Brand name, displayed as text (not only as the logo `alt`). */
  name: string;
  /** Official website. */
  url: string;
  /** Key of `sections.companies.sectors.<sector>`. */
  sector: CompanySector;
  file: string;
  width: number;
  height: number;
  size: CompanyLogoSize;
}

export const companies: Company[] = [
  {
    id: "totalenergies",
    name: "TotalEnergies",
    url: "https://totalenergies.com",
    sector: "energy",
    file: "totalenergies.png",
    width: 900,
    height: 221,
    size: "md",
  },
  {
    id: "dga",
    name: "Direction générale de l'Armement",
    url: "https://www.defense.gouv.fr/dga",
    sector: "defense",
    file: "dga.svg",
    width: 500,
    height: 742,
    size: "tall",
  },
  {
    id: "thales",
    name: "Thales",
    url: "https://www.thalesgroup.com",
    sector: "defense",
    file: "thales.svg",
    width: 484,
    height: 57,
    size: "sm",
  },
  {
    id: "airbus",
    name: "Airbus",
    url: "https://www.airbus.com",
    sector: "aeronautics",
    file: "airbus.svg",
    width: 399,
    height: 74,
    size: "md",
  },
  {
    id: "thales-alenia-space",
    name: "Thales Alenia Space",
    url: "https://www.thalesaleniaspace.com",
    sector: "space",
    file: "thales-alenia-space.svg",
    width: 1063,
    height: 430,
    size: "lg",
  },
  {
    id: "aniti",
    name: "ANITI",
    url: "https://aniti.univ-toulouse.fr",
    sector: "aiResearch",
    file: "aniti.png",
    width: 523,
    height: 120,
    size: "md",
  },
  {
    id: "sopra-steria",
    name: "Sopra Steria",
    url: "https://www.soprasteria.com",
    sector: "digitalServices",
    file: "sopra-steria.svg",
    width: 211,
    height: 28,
    size: "sm",
  },
  {
    id: "fpt-software",
    name: "FPT Software",
    url: "https://fptsoftware.com",
    sector: "digitalServices",
    file: "fpt-software.svg",
    width: 284,
    height: 96,
    size: "lg",
  },
];
