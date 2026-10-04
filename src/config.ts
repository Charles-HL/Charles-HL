/**
 * Configuration centralisée pour le site Charles HL
 */

export const siteConfig = {
  // Informations du site
  name: "Charles HILD LÊ",
  shortName: "Charles HL",
  title: "Charles HL · Ingénieur logiciel full stack & IA",
  description:
    "Ingénieur logiciel full stack à Toulouse : plateformes métier complètes, de l'architecture à la production, et ingénierie agentique sous contrôle d'ingénieur.",

  // URLs et domaine
  url: "https://charleshl.com",
  domain: "charleshl.com",

  // Informations de contact
  email: "contact@charleshl.com",
  location: "Toulouse, France",

  // Réseaux sociaux
  social: {
    linkedin: "https://www.linkedin.com/in/charles-hl/",
    github: "https://github.com/charles-hl",
  },

  // Mots-clés communs ; les mots-clés propres à chaque page vivent dans les messages
  keywords: ["Charles HILD LÊ", "Charles HL"],

  // Langues supportées
  languages: {
    default: "fr",
    supported: ["fr", "en"],
  },
} as const;

// Export par défaut pour la compatibilité
export const host = siteConfig.url;
export default siteConfig;
