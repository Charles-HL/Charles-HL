import type { Project } from "../../src/types/project";

const project = {
  slug: "import-catalogues-fournisseurs",
  order: 6,
  featured: false,
  categories: ["data", "erp"],
  icon: "FileSpreadsheet",
  title: {
    fr: "Import de catalogues fournisseurs : du prototype à l'intégration native",
    en: "Supplier catalogue import: from prototype to native integration",
  },
  tagline: {
    fr: "Des tarifs fournisseurs massifs importés dans l'ERP, sans ressaisie ni altération.",
    en: "Large supplier price lists imported into the ERP, no rekeying, existing data untouched.",
  },
  summary: {
    fr: "Prototype livré en 4 jours, puis assistant d'import en 7 étapes dans l'ERP : 2 200+ produits créés en production sans altérer l'existant.",
    en: "A prototype in 4 days, then a 7-step import wizard inside the ERP: 2,200+ products created in production without touching existing data.",
  },
  metaTitle: {
    fr: "Import de catalogues fournisseurs : prototype puis ERP natif",
    en: "Supplier catalogue import: prototype to native ERP wizard",
  },
  context: {
    fr: "Une PME de distribution et de services reçoit ses tarifs fournisseurs sous forme de gros fichiers Excel ou XML. Ils étaient ressaisis à la main ou butaient sur les limites de l'import natif de l'ERP.",
    en: "A distribution and services SME receives its supplier price lists as large Excel or XML files. They were rekeyed by hand or ran into the limits of the ERP's native import.",
  },
  role: {
    fr: "Conception, prototypage, architecture, développement et mise en production, en autonomie complète.",
    en: "Design, prototyping, architecture, development and deployment, fully autonomously.",
  },
  solution: {
    fr: "D'abord un prototype livré en 4 jours : 5 outils qui tournent à 100 % dans le navigateur, sans aucun envoi de données. Ils couvrent la conversion XML ou Excel vers l'ERP, la mise à jour des prix en masse et le découpage en lots.\n\nLe besoin validé, l'import a été industrialisé dans l'ERP sous forme d'un assistant en 7 étapes. La simulation est toujours annulée : l'utilisateur voit l'effet de l'import, chiffres à l'appui, avant de confirmer.",
    en: "First a prototype shipped in 4 days: 5 tools running entirely in the browser, with no data ever uploaded. They cover XML or Excel conversion to the ERP format, bulk price updates and batch splitting.\n\nOnce the need was validated, the import was industrialised inside the ERP as a 7-step wizard. The simulation is always rolled back: users see the import's effect, with figures, before confirming.",
  },
  highlights: {
    fr: [
      {
        title: "Prototype 100 % navigateur",
        description:
          "5 outils utilisables en 4 jours, sans que les fichiers quittent le poste de l'utilisateur.",
      },
      {
        title: "Correspondance de colonnes",
        description:
          "Le fichier Excel ou XML d'un fournisseur est mis en correspondance avec les champs de l'ERP, colonne par colonne.",
      },
      {
        title: "Prix en masse",
        description:
          "Mise à jour des prix sur des catalogues entiers, avec recalcul automatique HT/TTC.",
      },
      {
        title: "Simulation avant toute écriture",
        description:
          "La simulation est toujours annulée : l'utilisateur voit l'effet de l'import avant de confirmer.",
      },
    ],
    en: [
      {
        title: "100% in-browser prototype",
        description:
          "5 tools ready in 4 days, with supplier files never leaving the user's machine.",
      },
      {
        title: "Column mapping",
        description:
          "A supplier's Excel or XML file is mapped to the ERP's fields, column by column.",
      },
      {
        title: "Bulk pricing",
        description:
          "Price updates across entire catalogues, with automatic net and gross price recalculation.",
      },
      {
        title: "Simulation before any write",
        description:
          "The simulation is always rolled back, so users see the import's effect before confirming.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Prototyper vite, puis industrialiser",
        description:
          "Un prototype testé, livré en 4 jours, a validé les usages avant d'investir dans l'intégration native.",
      },
      {
        title: "Chargement par lots reprenables",
        description: "Un chargement interrompu reprend sans repartir de zéro.",
      },
      {
        title: "21 livrables, chacun avec sa preuve",
        description: "Aucun livrable n'est clos sans une preuve vérifiable.",
      },
      {
        title: "Vérification en production par empreinte",
        description:
          "Une empreinte de la base avant et après import prouve que l'existant n'est pas altéré.",
      },
    ],
    en: [
      {
        title: "Prototype fast, then industrialise",
        description:
          "A tested prototype, shipped in 4 days, validated real usage before investing in native integration.",
      },
      {
        title: "Resumable batch loading",
        description:
          "An interrupted load picks up again without starting from scratch.",
      },
      {
        title: "21 deliverables, each with its proof",
        description: "No deliverable is closed without verifiable evidence.",
      },
      {
        title: "Production checks by database fingerprint",
        description:
          "A database fingerprint taken before and after the import proves existing data is left intact.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "4 jours", label: "pour le prototype" },
      { value: "7", label: "étapes d'import guidées" },
      { value: "2 200+", label: "produits importés en production" },
    ],
    en: [
      { value: "4 days", label: "to build the prototype" },
      { value: "7", label: "guided import steps" },
      { value: "2,200+", label: "products imported in production" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: ["Next.js 16", "React Compiler", "shadcn", "SheetJS"],
    },
    {
      group: "Backend",
      items: ["Dolibarr 22", "PHP 8"],
    },
  ],
} satisfies Project;

export default project;
