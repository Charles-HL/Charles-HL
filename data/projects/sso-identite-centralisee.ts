import type { Project } from "../../src/types/project";

const project = {
  slug: "sso-identite-centralisee",
  order: 4,
  featured: true,
  categories: ["security"],
  icon: "ShieldCheck",
  title: {
    fr: "Authentification unique (SSO) et MFA pour 9 applications",
    en: "Single sign-on (SSO) and MFA for 9 applications",
  },
  tagline: {
    fr: "Une identité, un second facteur et une révocation centralisée pour 9 applications",
    en: "One identity, a second factor and central revocation across 9 applications",
  },
  summary: {
    fr: "SSO OIDC auto-hébergé pour 9 applications : MFA par passkeys ou TOTP, jetons côté serveur et migration sans perte d'accès.",
    en: "Self-hosted OIDC single sign-on for 9 applications: passkey or TOTP MFA, server-side tokens and migration with no lost access.",
  },
  context: {
    fr: "Les applications reposaient sur des comptes partagés, sans second facteur pour protéger les accès. Et sans révocation centralisée, retirer un accès ne pouvait pas se faire en un seul point.",
    en: "The applications relied on shared accounts, with no second factor protecting access. And without central revocation, there was no single place to withdraw someone's access.",
  },
  role: {
    fr: "De la conception à l'exploitation, en autonomie complète.",
    en: "From design to operations, fully autonomously.",
  },
  solution: {
    fr: "Le fournisseur d'identité Zitadel est auto-hébergé : base dédiée, reverse proxy gRPC, tunnel dédié, supervision et sauvegarde. Les applications suivent le flux OIDC Authorization Code + PKCE.\n\nLes jetons restent côté serveur ; les fronts ne manipulent qu'une session opaque HttpOnly, protégée contre le CSRF. Un client de session partagé et un paquet BFF réutilisable évitent de réécrire l'intégration dans chaque application. La MFA laisse le choix entre passkeys, TOTP ou OTP par e-mail.",
    en: "The Zitadel identity provider is self-hosted, with its own database, a gRPC reverse proxy, a dedicated tunnel, monitoring and backups. Applications use the OIDC Authorization Code + PKCE flow.\n\nTokens stay on the server; frontends only ever hold an opaque HttpOnly session with CSRF protection. A shared session client and a reusable BFF package mean the integration is never rewritten from scratch. For MFA, users choose between passkeys, TOTP or e-mail OTP.",
  },
  highlights: {
    fr: [
      {
        title: "Une seule identité pour 9 applications",
        description:
          "Une connexion unique remplace les comptes partagés, avec une révocation centralisée.",
      },
      {
        title: "MFA au choix",
        description:
          "Passkeys, TOTP ou OTP par e-mail, selon les préférences de chaque utilisateur.",
      },
      {
        title: "Aucun jeton dans le navigateur",
        description:
          "Les fronts n'ont qu'une session opaque HttpOnly, protégée contre le CSRF.",
      },
      {
        title: "Fournisseur d'identité auto-hébergé",
        description:
          "Zitadel avec base dédiée, reverse proxy gRPC, tunnel dédié, supervision et sauvegarde.",
      },
    ],
    en: [
      {
        title: "One identity for 9 applications",
        description:
          "A single sign-on replaces shared accounts, with central revocation.",
      },
      {
        title: "MFA, your way",
        description:
          "Passkeys, TOTP or e-mail OTP, depending on each user's preference.",
      },
      {
        title: "No tokens in the browser",
        description:
          "Frontends only hold an opaque HttpOnly session with CSRF protection.",
      },
      {
        title: "Self-hosted identity provider",
        description:
          "Zitadel with its own database, a gRPC reverse proxy, a dedicated tunnel, monitoring and backups.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Migration sans perte d'accès",
        description:
          "Import des hash de mots de passe existants et projection des rôles dans les jetons.",
      },
      {
        title: "Bascule unique et réversible",
        description:
          "L'API et 7 fronts ont basculé en une fois, l'API rejoignant un sous-domaine commun.",
      },
      {
        title: "Défauts corrigés dans la fenêtre",
        description:
          "5 défauts bloquants ont été corrigés pendant la bascule, sans retour arrière.",
      },
      {
        title: "Identité configurée par la CI",
        description:
          "La configuration de l'IdP passe uniquement par la CI, vérifiée par des tests de contrat.",
      },
    ],
    en: [
      {
        title: "Migration with no lost access",
        description:
          "Existing password hashes were imported, and roles are projected into the tokens.",
      },
      {
        title: "Single, reversible cutover",
        description:
          "The API and 7 frontends switched over at once, the API moving to a shared subdomain.",
      },
      {
        title: "Blockers fixed within the window",
        description:
          "5 blocking defects were fixed during the cutover, with no rollback.",
      },
      {
        title: "Identity configured through CI",
        description:
          "IdP configuration is applied through CI only, and verified by identity contract tests.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "9", label: "applications unifiées" },
      { value: "28", label: "livrables de roadmap vérifiés" },
      { value: "0", label: "retour arrière" },
    ],
    en: [
      { value: "9", label: "unified applications" },
      { value: "28", label: "verified roadmap deliverables" },
      { value: "0", label: "rollbacks" },
    ],
  },
  stack: [
    {
      group: "Sécurité",
      items: ["Zitadel", "OIDC/PKCE", "BFF"],
    },
    {
      group: "Infra",
      items: ["Traefik", "Nginx", "Cloudflare Tunnel", "Prometheus", "Alertmanager"],
    },
    {
      group: "Data",
      items: ["PostgreSQL"],
    },
    {
      group: "Backend",
      items: ["TypeScript"],
    },
  ],
} satisfies Project;

export default project;
