/**
 * Configuration centralisée pour le site Charles HL
 */

export const siteConfig = {
  // Informations du site
  name: "Charles HILD LÊ",
  title: "Charles HL - Full Stack Developer & AI Engineer",
  description:
    "Portfolio professionnel de Charles HILD LÊ, ingénieur logiciel full stack spécialisé en intelligence artificielle et science des données. Freelance et salarié chez Thales.",

  // URLs et domaine
  url: "https://charleshl.com",
  domain: "charleshl.com",

  // Informations de contact
  email: "contact@charleshl.com",
  location: "Toulouse, France",

  // Réseaux sociaux
  social: {
    linkedin: "https://linkedin.com/in/charles-hl",
    github: "https://github.com/charles-hl",
  },

  // Métadonnées SEO
  keywords: [
    "Charles HILD LÊ",
    "Charles HL",
    "Full Stack Developer",
    "Développeur Full Stack",
    "AI Engineer",
    "Ingénieur IA",
    "Data Science",
    "Toulouse",
    "Freelance",
    "Thales",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Intelligence Artificielle",
    "Développement Web",
    "Consultant Technique",
  ],

  // Langues supportées
  languages: {
    default: "fr",
    supported: ["fr", "en"],
  },

  // Informations business
  business: {
    type: "Person",
    profession: "Software Engineer",
    specialization: "Full Stack Development & AI",
    availability: "Available for freelance projects",
    company: "Thales",
  },
} as const;

// Export par défaut pour la compatibilité
export const host = siteConfig.url;
export default siteConfig;
