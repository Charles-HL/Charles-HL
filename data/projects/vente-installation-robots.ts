import type { Project } from "../../src/types/project";

const project = {
  slug: "vente-installation-robots",
  order: 11,
  featured: false,
  categories: ["frontend", "field-apps"],
  icon: "ClipboardSignature",
  title: {
    fr: "Cycle de vente et d'installation : devis, signature, intervention, facture",
    en: "Sales and installation lifecycle: quote, signature, site visit, invoice",
  },
  tagline: {
    fr: "Du devis signé à distance à la facture émise sur le terrain.",
    en: "From a remotely signed quote to an invoice issued in the field.",
  },
  summary: {
    fr: "Deux applications pour vendre et installer : devis signés à distance, interventions sur iPad, factures synchronisées avec l'ERP.",
    en: "Two apps to sell and install: quotes signed remotely, site visits on iPad, invoices synced with the ERP.",
  },
  metaTitle: {
    fr: "Vente et installation : devis, intervention et facture",
    en: "Sales and installation: quote, site visit and invoice",
  },
  metaDescription: {
    fr: "Deux applications pour vendre et installer : devis signés à distance, interventions sur iPad, factures synchronisées avec l'ERP.",
    en: "Two apps for the whole sales and installation cycle: quotes signed remotely, site visits on iPad, invoices issued on site and synced with the ERP.",
  },
  context: {
    fr: "Chaque vente suit le même cycle : devis, commande, intervention chez le client, facture. Ce périmètre vivait dans une application plus large et devait disposer de ses propres outils, au bureau comme sur le terrain.",
    en: "Every sale follows the same cycle: quote, order, on-site installation, invoice. This scope lived inside a broader application and needed dedicated tools, in the office and in the field.",
  },
  role: {
    fr: "De la conception à l'exploitation, en autonomie complète.",
    en: "From design to operations, fully autonomously.",
  },
  solution: {
    fr: "L'administration commerciale gère le stock planifié par année, les devis et leur conversion en bon de commande avec acompte. Le client signe à distance par un lien public protégé. Elle a été extraite d'une application existante avec une parité fonctionnelle 1:1, en 3 jours.\n\nLe portail mobile accompagne l'installateur sur iPad : liste de contrôle, photos et signature. Les factures d'installation suivent leur cycle de vie complet et se synchronisent avec l'ERP.",
    en: "The sales back office handles yearly stock planning, quotes and their conversion into purchase orders with a deposit. Customers sign remotely through a protected public link. It was extracted from an existing application with 1:1 feature parity, in 3 days.\n\nThe mobile portal supports installers on iPad: checklist, photos and signature. Installation invoices follow their full lifecycle and sync with the ERP.",
  },
  highlights: {
    fr: [
      {
        title: "Signature électronique à distance",
        description: "Le client signe son devis à distance, depuis un lien public protégé.",
      },
      {
        title: "Du devis au bon de commande",
        description: "Un devis se convertit en bon de commande avec acompte, sans ressaisie.",
      },
      {
        title: "Fiche d'installation mobile",
        description: "Liste de contrôle, photos et signature du client, sur iPad comme sur iPhone.",
      },
      {
        title: "Factures synchronisées avec l'ERP",
        description: "Les factures d'installation remontent dans l'ERP, sans double saisie.",
      },
    ],
    en: [
      {
        title: "Remote e-signature",
        description: "Customers sign their quote remotely, through a protected public link.",
      },
      {
        title: "From quote to purchase order",
        description: "A quote converts into a purchase order with a deposit, with no re-entry.",
      },
      {
        title: "Mobile installation sheet",
        description: "Checklist, photos and customer signature, on iPad and iPhone alike.",
      },
      {
        title: "Invoices synced with the ERP",
        description: "Installation invoices flow into the ERP, with no double entry.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Extraction à parité 1:1 en 3 jours",
        description: "L'administration commerciale a été extraite d'une application existante avec une parité fonctionnelle 1:1.",
      },
      {
        title: "Numéro fiscal attribué à la validation",
        description: "Un brouillon ne consomme jamais de numéro : le numéro fiscal n'est attribué qu'à la validation.",
      },
      {
        title: "Synchronisation ERP non bloquante",
        description: "L'envoi vers l'ERP ne bloque pas le travail sur le terrain, et une resynchronisation rattrape les écarts.",
      },
      {
        title: "Formulaires validés et état dans l'URL",
        description: "La fiche d'installation est validée par Zod, et les filtres sont synchronisés dans l'URL.",
      },
    ],
    en: [
      {
        title: "1:1 parity extraction in 3 days",
        description: "The sales back office was extracted from an existing application with 1:1 feature parity.",
      },
      {
        title: "Fiscal number assigned on validation",
        description: "Drafts never consume a number: the fiscal invoice number is only assigned on validation.",
      },
      {
        title: "Non-blocking ERP sync",
        description: "Pushing to the ERP never blocks work in the field, and a resync catches up on any gap.",
      },
      {
        title: "Validated forms, state in the URL",
        description: "The installation sheet is validated with Zod, and filters are synced to the URL.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "2", label: "applications" },
      { value: "~20 700", label: "lignes de code" },
      { value: "3 jours", label: "pour une extraction à parité 1:1" },
    ],
    en: [
      { value: "2", label: "applications" },
      { value: "~20,700", label: "lines of code" },
      { value: "3 days", label: "for a 1:1 parity extraction" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: ["Next.js 15/16", "React 19", "TypeScript strict", "Tailwind 4", "react-hook-form", "Zod", "Design system"],
    },
    { group: "Qualité", items: ["Vitest"] },
  ],
} satisfies Project;

export default project;
