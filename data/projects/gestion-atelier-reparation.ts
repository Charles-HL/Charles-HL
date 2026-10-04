import type { Project } from "../../src/types/project";

const project = {
  slug: "gestion-atelier-reparation",
  order: 9,
  featured: false,
  categories: ["frontend", "field-apps"],
  icon: "Wrench",
  title: {
    fr: "Gestion d'atelier de réparation : du terrain à la facture",
    en: "Repair workshop management: from the field to the invoice",
  },
  tagline: {
    fr: "Prise en charge terrain, suivi atelier, planning et facture synchronisée avec l'ERP.",
    en: "Field intake, workshop tracking, scheduling and invoices synced with the ERP.",
  },
  summary: {
    fr: "Deux applications pour l'atelier : prise en charge terrain avec photo et signature, puis suivi, chronomètre, planning et factures synchronisées à l'ERP.",
    en: "Two workshop apps: field intake with photos and signature, then repair tracking, time logging, scheduling and invoices synced with the ERP.",
  },
  context: {
    fr: "Une PME de distribution et de services gère un atelier de réparation de matériel motorisé. Chaque réparation mobilise une prise en charge, du temps de travail, des pièces, un planning de techniciens et une facture, à suivre de bout en bout.",
    en: "A distribution and services SME runs a repair workshop for motorised equipment. Every repair involves an intake, labour time, parts, technician scheduling and an invoice, to be tracked end to end.",
  },
  role: {
    fr: "Conception, architecture, développement et mise en production des deux applications, en autonomie complète.",
    en: "Design, architecture, development and deployment of both applications, fully autonomously.",
  },
  solution: {
    fr: "L'app terrain gère la prise en charge du matériel, avec un formulaire piloté par une configuration servie par le serveur. Les photos sont prises à la caméra arrière et compressées à ~50 Ko, et la signature du client est obligatoire.\n\nLe back-office atelier centralise le suivi : grille des réparations, chronomètre de temps de travail, pièces et chiffrage, calendrier imprimable et vue de charge par technicien. Les factures de service sont synchronisées avec l'ERP, et le planning avec Google Calendar.",
    en: "The field app handles equipment intake, with a form driven by configuration served by the backend. Photos are taken with the rear camera and compressed to ~50 KB, and a customer signature is mandatory.\n\nThe workshop back office centralises tracking: a repairs grid, a labour time tracker, parts and pricing, a printable calendar and a per-technician workload view. Service invoices are synced with the ERP, and the schedule with Google Calendar.",
  },
  highlights: {
    fr: [
      {
        title: "Prise en charge pilotée par le serveur",
        description:
          "Le formulaire terrain est décrit par une configuration côté serveur, plutôt que figé dans le code.",
      },
      {
        title: "Photo compressée et signature obligatoire",
        description:
          "Photo prise à la caméra arrière et compressée à ~50 Ko, sans prise en charge possible sans signature du client.",
      },
      {
        title: "Temps, pièces et chiffrage",
        description:
          "Un chronomètre de temps de travail repris depuis le serveur, avec les pièces et le chiffrage de chaque réparation.",
      },
      {
        title: "Planning et charge des techniciens",
        description:
          "Calendrier imprimable en PDF, vue de charge par technicien et synchronisation Google Calendar.",
      },
    ],
    en: [
      {
        title: "Server-driven intake",
        description:
          "The field form is described by server-side configuration rather than hard-coded in the app.",
      },
      {
        title: "Compressed photos, mandatory signature",
        description:
          "Photos are taken with the rear camera and compressed to ~50 KB, and no intake is complete without the customer's signature.",
      },
      {
        title: "Time, parts and pricing",
        description:
          "A labour time tracker restored from the server, alongside the parts and pricing of each repair.",
      },
      {
        title: "Scheduling and technician workload",
        description:
          "A calendar printable as PDF, a per-technician workload view and Google Calendar sync.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "~110 fonctions d'API centralisées",
        description:
          "Tous les appels à l'API passent par une couche unique, au lieu d'être dispersés dans les écrans.",
      },
      {
        title: "Double mode d'authentification",
        description:
          "Legacy ou SSO, activable par variable d'environnement, avec un contrôle d'accès par rôles.",
      },
      {
        title: "Reconsentement OAuth géré",
        description:
          "L'intégration Google Calendar gère le cas où l'autorisation OAuth doit être accordée à nouveau.",
      },
      {
        title: "Découpage du périmètre robots",
        description:
          "Le périmètre robots a été extrait vers une application à part, retirant 6 000 lignes de l'application atelier.",
      },
    ],
    en: [
      {
        title: "~110 centralised API functions",
        description:
          "Every API call goes through a single layer instead of being scattered across screens.",
      },
      {
        title: "Dual authentication mode",
        description:
          "Legacy or SSO, switchable through an environment variable, with role-based access control.",
      },
      {
        title: "OAuth re-consent handled",
        description:
          "The Google Calendar integration handles the case where OAuth authorisation must be granted again.",
      },
      {
        title: "Robot scope split out",
        description:
          "Robot-related features were extracted into a dedicated application, removing 6,000 lines from the workshop app.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "2", label: "applications" },
      { value: "~19 500", label: "lignes de code" },
    ],
    en: [
      { value: "2", label: "applications" },
      { value: "~19,500", label: "lines of code" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: [
        "React 18",
        "TypeScript strict",
        "MUI 6",
        "AG Grid 33",
        "Redux Toolkit",
        "React Router 7",
      ],
    },
    {
      group: "Intégrations",
      items: ["@react-pdf", "Google APIs"],
    },
  ],
} satisfies Project;

export default project;
