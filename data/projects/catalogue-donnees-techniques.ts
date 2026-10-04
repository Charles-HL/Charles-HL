import type { Project } from "../../src/types/project";

/**
 * Large-group case study, deliberately generic: no client, no replaced
 * vendor, no internal system name, no business vocabulary, no data volume.
 */
const project = {
  slug: "catalogue-donnees-techniques",
  order: 0,
  featured: true,
  categories: ["architecture", "backend", "frontend", "data"],
  icon: "Database",
  title: {
    fr: "Plateforme de catalogage de données techniques",
    en: "Technical data catalog platform",
  },
  tagline: {
    fr: "Remplacer un outil historique par une plateforme interne, développée de zéro.",
    en: "Replacing a legacy tool with an in-house platform, built from scratch.",
  },
  summary: {
    fr: "Application web interne de catalogage et de recherche, développée de zéro par une équipe de sept, dont je porte l'architecture et la revue de code.",
    en: "An internal web application for cataloguing and search, built from scratch by a team of seven whose architecture and code review I own.",
  },
  context: {
    fr: "Un grand groupe industriel gère un patrimoine de données techniques réparti entre supports physiques et stockage en ligne. L'outil historique limitait la recherche et s'intégrait mal au reste du système d'information.",
    en: "A large industrial group manages technical data spread across physical media and online storage. The legacy tool offered limited search and integrated poorly with the rest of the information system.",
  },
  role: {
    fr: "Je porte l'architecture, les choix techniques, les modules transverses et la revue de code d'une équipe de sept.",
    en: "I own the architecture, the technical decisions, the cross-cutting modules and the code review of a team of seven.",
  },
  solution: {
    fr: "Une interface React et TypeScript, une API Python et une base PostgreSQL. L'authentification passe par le fournisseur d'identité de l'entreprise, et les autorisations sont tranchées côté serveur : l'interface ne fait que masquer ce qui est déjà interdit.\n\nDeux modules transverses évitent la duplication : un pipeline de fichiers unique piloté par une table de règles, et un moteur de recherche partagé par tous les domaines. Un flux d'événements tient l'utilisateur informé de l'avancement des traitements longs.",
    en: "A React and TypeScript interface, a Python API and a PostgreSQL database. Authentication goes through the company identity provider, and permissions are decided on the server: the interface merely hides what is already forbidden.\n\nTwo cross-cutting modules keep duplication out: a single file pipeline driven by a rules table, and one search engine shared by every domain. An event stream keeps users informed of long-running jobs.",
  },
  highlights: {
    fr: [
      {
        title: "Un seul pipeline de fichiers",
        description:
          "Chaque type de document déclare ses règles : aucun cas métier ne contourne un contrôle, et aucun n'ajoute d'endpoint.",
      },
      {
        title: "Autorisations côté serveur",
        description:
          "Le filtrage est appliqué dans la requête, jamais après coup.",
      },
      {
        title: "Temps réel sans saturer le navigateur",
        description:
          "Un onglet détient le flux d'événements et le rediffuse aux autres, ce qui contourne la limite de connexions par site.",
      },
      {
        title: "Reprise des données historiques",
        description:
          "Migration table par table, rejets journalisés avec leur motif et statistiques de validation.",
      },
    ],
    en: [
      {
        title: "A single file pipeline",
        description:
          "Every document type declares its rules: no business case bypasses a check, and none adds an endpoint.",
      },
      {
        title: "Server-side permissions",
        description:
          "Filtering happens inside the query, never afterwards.",
      },
      {
        title: "Real time without flooding the browser",
        description:
          "One tab holds the event stream and rebroadcasts it to the others, working around the per-site connection limit.",
      },
      {
        title: "Historical data migration",
        description:
          "Table by table, with rejects logged with their reason and validation statistics.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Frontières d'architecture vérifiées par le linter",
        description:
          "Chaque couche déclare les couches dont elle peut dépendre ; l'intégration continue échoue si l'une est franchie.",
      },
      {
        title: "Tests de bout en bout entre deux dépôts",
        description:
          "Le pipeline apparie les branches des deux dépôts et démarre la vraie API sur une base éphémère.",
      },
      {
        title: "Portes qualité calculées sur le diff",
        description:
          "Audit informatif sur tout le dépôt, barrière bloquante sur les fichiers modifiés, synthèse unique en commentaire de pull request.",
      },
      {
        title: "Garde-fou d'intégrité du schéma",
        description:
          "Une empreinte du schéma généré empêche de démarrer sur une base de développement périmée.",
      },
    ],
    en: [
      {
        title: "Architecture boundaries checked by the linter",
        description:
          "Each layer declares the layers it may depend on; continuous integration fails when one is crossed.",
      },
      {
        title: "End-to-end tests across two repositories",
        description:
          "The pipeline pairs branches from both repositories and starts the real API against an ephemeral database.",
      },
      {
        title: "Quality gates computed on the diff",
        description:
          "An informative audit over the whole repository, a blocking gate on changed files, one summary comment per pull request.",
      },
      {
        title: "Schema integrity guardrail",
        description:
          "A fingerprint of the generated schema prevents starting against a stale development database.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "7", label: "personnes dans l'équipe" },
      { value: "80 %", label: "de couverture de tests exigée" },
    ],
    en: [
      { value: "7", label: "people in the team" },
      { value: "80%", label: "test coverage required" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: ["React", "TypeScript", "Vite", "TanStack Query", "MUI"],
    },
    {
      group: "Backend",
      items: ["Python", "FastAPI", "SQLModel", "Pydantic"],
    },
    {
      group: "Data",
      items: ["PostgreSQL"],
    },
    {
      group: "Sécurité",
      items: ["OpenID Connect", "Coffre-fort de secrets"],
    },
    {
      group: "Infra",
      items: ["Conteneurs OCI", "Nginx", "GitHub Actions"],
    },
    {
      group: "Qualité",
      items: ["pytest", "Vitest", "Playwright", "Ruff", "mypy", "ESLint"],
    },
  ],
} satisfies Project;

export default project;
