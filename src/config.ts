/**
 * Configuration centralisée pour le site Charles HL
 */

export const siteConfig = {
  // Informations du site
  name: "Charles HILD LÊ",
  title: "Charles HL - Développeur Web Freelance & Ingénieur Full Stack",
  description:
    "Développeur web freelance à Toulouse spécialisé en création d'applications et sites sur mesure pour TPE, PME et grandes entreprises. Expert en développement Full Stack, IA et automatisation. Sites vitrines, outils de gestion, formulaires dynamiques et solutions web modernes.",

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
    // Mots-clés TPE/PME
    "Développeur web freelance Toulouse",
    "Création site web TPE PME",
    "Application web sur mesure",
    "Développeur freelance petite entreprise",
    "Site vitrine moderne",
    "Formulaire dynamique web",
    "Application gestion interne",
    "CRM sur mesure",
    "Outil métier web",
    "Tableau de bord web",
    "Automatisation web",
    "Refonte site internet",
    "Développeur web artisan",
    "Développeur web commerce",
    "Application web garage",
    "Site internet professionnel",
    "Hébergement web clé en main",
    "SEO optimisation Toulouse",
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
