import type { Project } from "../../src/types/project";

const project = {
  slug: "rapprochement-bancaire",
  order: 12,
  featured: false,
  categories: ["data", "frontend"],
  icon: "Scale",
  title: {
    fr: "Rapprochement bancaire assisté",
    en: "Assisted bank reconciliation",
  },
  tagline: {
    fr: "Relevés bancaires et factures rapprochés automatiquement, avec un score de confiance.",
    en: "Bank statements matched to invoices automatically, each with a confidence score.",
  },
  summary: {
    fr: "Correspondance floue entre un relevé bancaire et un export de factures, avec score de confiance et revue guidée : v1 et v2 livrées en 15 jours.",
    en: "Fuzzy matching between a bank statement and an invoice export, with confidence scores and guided review: v1 and v2 shipped in 15 days.",
  },
  context: {
    fr: "Rapprocher à la main les paiements reçus des factures émises est long et source d'erreurs : les références sont incomplètes et les noms ne correspondent pas toujours. Il fallait un outil qui propose les correspondances et laisse la décision finale à une personne.",
    en: "Manually matching incoming payments to issued invoices is slow and error-prone: references are incomplete and names rarely match exactly. The business needed a tool that suggests matches and leaves the final call to a person.",
  },
  role: {
    fr: "De la conception à l'exploitation, en autonomie complète.",
    en: "From design to operations, fully autonomously.",
  },
  solution: {
    fr: "L'utilisateur importe un relevé bancaire et un export de factures. Le traitement s'exécute côté serveur, dans un worker thread, et sa progression survit à un rechargement de la page.\n\nLe moteur de correspondance floue combine quatre approches : référence, montant, nom approché et combinée. Chaque proposition reçoit un score de confiance de 0 à 100. Un éditeur de revue permet de valider, de rejeter et de résoudre les cas multiples.",
    en: "Users import a bank statement and an invoice export. Processing runs server-side in a worker thread, and its progress survives a page reload.\n\nThe fuzzy matching engine combines four approaches: by reference, by amount, by approximate name, and combined. Every suggestion gets a confidence score from 0 to 100. A review editor lets users approve, reject and resolve ambiguous multi-match cases.",
  },
  highlights: {
    fr: [
      {
        title: "Quatre types de correspondance",
        description: "Référence, montant, nom approché ou correspondance combinée, pour couvrir les cas réels.",
      },
      {
        title: "Score de confiance de 0 à 100",
        description: "Chaque proposition indique son niveau de fiabilité, pour concentrer la revue sur les cas douteux.",
      },
      {
        title: "Revue humaine guidée",
        description: "Validation, rejet et résolution des cas multiples dans un éditeur dédié.",
      },
      {
        title: "Statistiques et export Excel",
        description: "Le résultat se lit d'un coup d'œil et s'exporte en Excel.",
      },
    ],
    en: [
      {
        title: "Four matching strategies",
        description: "Reference, amount, approximate name or combined matching, to cover real-world cases.",
      },
      {
        title: "Confidence score from 0 to 100",
        description: "Each suggestion shows how reliable it is, so review effort goes to the doubtful cases.",
      },
      {
        title: "Guided human review",
        description: "Approve, reject and resolve multi-match cases in a dedicated editor.",
      },
      {
        title: "Statistics and Excel export",
        description: "Results are clear at a glance and export to Excel.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Traitement asynchrone en worker thread",
        description: "La correspondance floue (Fuse.js) tourne dans un worker thread Node, hors du fil principal du serveur.",
      },
      {
        title: "Progression qui survit au rechargement",
        description: "Le calcul vit côté serveur : recharger la page ne perd ni le traitement ni son avancement.",
      },
      {
        title: "Scoring explicable",
        description: "Chaque correspondance porte son type et un score de 0 à 100, ce qui rend la décision vérifiable.",
      },
      {
        title: "Données typées de bout en bout",
        description: "TypeScript et Zod encadrent les données, SheetJS gère les fichiers tableur et l'export Excel.",
      },
    ],
    en: [
      {
        title: "Async processing in a worker thread",
        description: "Fuzzy matching (Fuse.js) runs in a Node worker thread, off the server's main thread.",
      },
      {
        title: "Progress that survives a reload",
        description: "The computation lives on the server: reloading the page loses neither the job nor its progress.",
      },
      {
        title: "Explainable scoring",
        description: "Every match carries its type and a 0 to 100 score, which makes each decision verifiable.",
      },
      {
        title: "End-to-end typed data",
        description: "TypeScript and Zod keep data in check, while SheetJS handles spreadsheet files and the Excel export.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "15 jours", label: "pour livrer la v1 et la v2" },
      { value: "~9 400", label: "lignes de code" },
    ],
    en: [
      { value: "15 days", label: "to ship v1 and v2" },
      { value: "~9,400", label: "lines of code" },
    ],
  },
  stack: [
    { group: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Flowbite"] },
    { group: "Backend", items: ["Node worker_threads", "Fuse.js", "Zod"] },
    { group: "Data", items: ["SheetJS"] },
  ],
} satisfies Project;

export default project;
