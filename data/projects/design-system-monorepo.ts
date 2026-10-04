import type { Project } from "../../src/types/project";

const project = {
  slug: "design-system-monorepo",
  order: 8,
  featured: false,
  categories: ["design-system", "frontend", "security"],
  icon: "Layers",
  title: {
    fr: "Design system et socle d'authentification partagés",
    en: "Shared design system and authentication foundation",
  },
  tagline: {
    fr: "Un monorepo de 3 paquets publiés : UI, session SSO et BFF partagés entre les applications.",
    en: "A monorepo of 3 published packages: UI, SSO session and BFF shared across apps.",
  },
  summary: {
    fr: "Monorepo pnpm de 3 paquets publiés, livré en 11 jours : UI, client de session SSO et BFF OIDC partagés, sans jeton exposé au JavaScript.",
    en: "A pnpm monorepo of 3 published packages, delivered in 11 days: shared UI, an SSO session client and an OIDC BFF, with no token exposed to JavaScript.",
  },
  context: {
    fr: "Dans l'écosystème applicatif d'une PME, les composants d'interface étaient copiés d'une application à l'autre et finissaient par diverger. L'authentification était dupliquée dans chaque projet.",
    en: "Across an SME's application ecosystem, UI components were copied from one app to the next and gradually drifted apart. Authentication was duplicated in every project as well.",
  },
  role: {
    fr: "Conception, architecture, développement et publication des paquets, en autonomie complète.",
    en: "Design, architecture, development and publishing of the packages, fully autonomously.",
  },
  solution: {
    fr: "Un monorepo pnpm réunit 3 paquets publiés, consommés par les applications métier. Le paquet UI définit le thème Tailwind 4 en CSS, avec tokens OKLCH et mode sombre, et fournit 23 primitives shadcn sur Base UI. S'y ajoutent des composants composés : AppShell, DataTable, SignaturePad, PeriodPicker.\n\nLe paquet Core porte le client HTTP et un client de session SSO indépendant du framework : aucun jeton n'est exposé au JavaScript et le CSRF est géré. Le paquet BFF implémente le flux OIDC confidentiel, le back-channel logout et des sessions chiffrées au repos.",
    en: "A pnpm monorepo brings together 3 published packages, consumed by the business applications. The UI package defines the Tailwind 4 theme in CSS, with OKLCH tokens and dark mode, and ships 23 shadcn primitives built on Base UI. Composite components come on top: AppShell, DataTable, SignaturePad, PeriodPicker.\n\nThe Core package holds the HTTP client and a framework-agnostic SSO session client: no token is ever exposed to JavaScript and CSRF is handled. The BFF package implements the confidential OIDC flow, back-channel logout and sessions encrypted at rest.",
  },
  highlights: {
    fr: [
      {
        title: "Thème Tailwind 4 défini en CSS",
        description:
          "Tokens de couleur OKLCH et mode sombre, partagés entre les applications.",
      },
      {
        title: "23 primitives shadcn sur Base UI",
        description:
          "Une base de composants cohérente, maintenue en un seul endroit.",
      },
      {
        title: "Session SSO sans jeton côté JavaScript",
        description:
          "Un client de session indépendant du framework, protégé contre le CSRF, avec des adaptateurs React.",
      },
      {
        title: "BFF OIDC prêt à l'emploi",
        description:
          "Flux OIDC confidentiel, back-channel logout, cache JWKS et sessions chiffrées au repos.",
      },
    ],
    en: [
      {
        title: "Tailwind 4 theme defined in CSS",
        description:
          "OKLCH colour tokens and dark mode, shared across applications.",
      },
      {
        title: "23 shadcn primitives on Base UI",
        description:
          "A consistent component foundation, maintained in one place.",
      },
      {
        title: "SSO session with no token in JavaScript",
        description:
          "A framework-agnostic session client with CSRF protection and React adapters.",
      },
      {
        title: "Ready-to-use OIDC BFF",
        description:
          "Confidential OIDC flow, back-channel logout, JWKS caching and sessions encrypted at rest.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Compatible React Server Components",
        description:
          'La directive "use client" est réduite au strict minimum, pour s\'intégrer aux applications Next.js en App Router.',
      },
      {
        title: "Aucune logique métier dans les paquets",
        description:
          "Le métier vit dans les applications, ce qui garde le socle réutilisable.",
      },
      {
        title: "Double publication ESM et CJS",
        description:
          "Le BFF est publié dans les deux formats, et les paquets sont validés à partir de leur tarball.",
      },
      {
        title: "CI et release sans secret",
        description:
          "Build, lint, typecheck et tests en CI, puis publication déclenchée par un tag.",
      },
    ],
    en: [
      {
        title: "React Server Components compatible",
        description:
          'The "use client" directive is kept to a strict minimum, so the packages fit into Next.js App Router apps.',
      },
      {
        title: "No business logic in the packages",
        description:
          "Business rules live in the applications, which keeps the foundation reusable.",
      },
      {
        title: "Dual ESM and CJS publishing",
        description:
          "The BFF ships in both module formats, and the packages are validated from their tarballs.",
      },
      {
        title: "Secret-free CI and releases",
        description:
          "Build, lint, typecheck and tests in CI, then publishing triggered by a tag.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "3", label: "paquets publiés" },
      { value: "28", label: "fichiers de tests (~4 000 lignes)" },
      { value: "11 jours", label: "pour la livraison" },
    ],
    en: [
      { value: "3", label: "published packages" },
      { value: "28", label: "test files (~4,000 lines)" },
      { value: "11 days", label: "to delivery" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: [
        "React 19",
        "TypeScript 5.9",
        "Tailwind 4",
        "Base UI",
        "shadcn",
        "TanStack Table",
      ],
    },
    {
      group: "Sécurité",
      items: ["OIDC", "BFF"],
    },
    {
      group: "Qualité",
      items: ["Vitest"],
    },
    {
      group: "Infra",
      items: ["pnpm workspaces", "tsdown", "GitHub Actions", "GitHub Packages"],
    },
  ],
} satisfies Project;

export default project;
