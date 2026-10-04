import type { Project } from "../../src/types/project";

const project = {
  slug: "erp-point-de-vente-connecte",
  order: 5,
  featured: true,
  categories: ["erp", "backend"],
  icon: "Store",
  title: {
    fr: "ERP sur mesure et caisse connectée",
    en: "Custom ERP and connected point of sale",
  },
  tagline: {
    fr: "Dolibarr 22, 8 modules sur mesure, caisse connectée et facturation électronique",
    en: "Dolibarr 22 with 8 custom modules, a connected POS and e-invoicing",
  },
  summary: {
    fr: "ERP Dolibarr 22 et 8 modules sur mesure : caisse connectée au matériel, inventaire hors ligne et page produits 4× plus rapide.",
    en: "Dolibarr 22 ERP with 8 custom modules: hardware-connected point of sale, offline inventory and a 4× faster product list.",
  },
  context: {
    fr: "Le magasin avait besoin d'une gestion commerciale complète : caisse, stock, inventaire, facturation légale et électronique. Le tout devait rester relié à la boutique en ligne.",
    en: "The store needed complete sales management: point of sale, stock, inventory, and legal and electronic invoicing. All of it had to stay connected to the online store.",
  },
  role: {
    fr: "Conception, architecture, développement des modules sur mesure, mise en production et exploitation, en autonomie complète.",
    en: "Design, architecture, development of the custom modules, deployment and operations, fully autonomously.",
  },
  solution: {
    fr: "L'ERP repose sur Dolibarr 22 dockerisé, enrichi de 8 modules développés sur mesure (~53 000 lignes). Ils couvrent l'import de tarifs fournisseurs, l'inventaire multi-utilisateur sur terminaux de scan avec mode hors ligne, la facturation électronique Peppol, les paiements en caisse et les outils catalogue en masse. Une API REST alimente la boutique en ligne : images WebP, stock et file de notifications.\n\nPour la caisse, j'ai repris un module open source, migré de Dolibarr 12 à 22 puis étendu : impression ESC/POS, terminal de paiement bancaire, monnayeur automatique et cartes cadeaux. Ce travail s'appuie sur une étude d'intégration matérielle du connecteur du monnayeur.",
    en: "The ERP runs on a containerised Dolibarr 22, extended with 8 custom-built modules (~53,000 lines). They cover supplier price list imports, multi-user inventory on handheld scanners with offline mode, Peppol e-invoicing, point-of-sale payments and bulk catalogue tools. A REST API feeds the online store with WebP images, stock levels and a notification queue.\n\nFor the point of sale, I took over an open-source module, migrated it from Dolibarr 12 to 22, then extended it: ESC/POS receipt printing, a card payment terminal, an automatic cash machine and gift cards. This work builds on a hardware integration study of the cash machine connector.",
  },
  highlights: {
    fr: [
      {
        title: "Inventaire multi-utilisateur hors ligne",
        description:
          "Plusieurs personnes inventorient en parallèle sur terminaux de scan, même sans réseau.",
      },
      {
        title: "Facturation électronique Peppol",
        description:
          "UBL 2.1, BIS Billing 3.0 et EN 16931, avec renvois en backoff et réception des factures entrantes.",
      },
      {
        title: "Caisse connectée au matériel",
        description:
          "Tickets ESC/POS, terminal de paiement bancaire, monnayeur automatique et cartes cadeaux.",
      },
      {
        title: "Encaissement multi-moyens en caisse",
        description:
          "Carte, espèces par monnayeur automatique, virement et ventes mises en attente.",
      },
    ],
    en: [
      {
        title: "Offline multi-user inventory",
        description:
          "Several people count stock in parallel on handheld scanners, even without a network.",
      },
      {
        title: "Peppol e-invoicing",
        description:
          "UBL 2.1, BIS Billing 3.0 and EN 16931, with backoff retries and incoming invoice handling.",
      },
      {
        title: "Hardware-connected point of sale",
        description:
          "ESC/POS receipts, a card payment terminal, an automatic cash machine and gift cards.",
      },
      {
        title: "Flexible in-store payments",
        description:
          "Card, cash through an automatic cash machine, bank transfer and parked sales.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Performance mesurée, puis optimisée",
        description:
          "Ouverture de la caisse de 11 s à 3-6 s, liste produits de 2,8 s à 0,64 s.",
      },
      {
        title: "Caisse migrée de Dolibarr 12 à 22",
        description:
          "Un module open source repris, porté sur la version 22 puis étendu.",
      },
      {
        title: "Sauvegardes Borg dédupliquées",
        description:
          "8,7 Go de données stockés en 3,15 Go.",
      },
      {
        title: "Contrôle de santé automatique",
        description:
          "Un contrôle de santé redémarre automatiquement le service en cas de défaillance.",
      },
    ],
    en: [
      {
        title: "Measured, then optimised",
        description:
          "POS opening cut from 11 s to 3-6 s, product list from 2.8 s to 0.64 s.",
      },
      {
        title: "POS migrated from Dolibarr 12 to 22",
        description:
          "An open-source module taken over, ported to version 22 and then extended.",
      },
      {
        title: "Deduplicated Borg backups",
        description:
          "8.7 GB of data stored in 3.15 GB.",
      },
      {
        title: "Automatic health checks",
        description:
          "A health check automatically restarts the service when it fails.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "8", label: "modules sur mesure" },
      { value: "~53 000", label: "lignes de code" },
      { value: "4×", label: "page produits plus rapide" },
    ],
    en: [
      { value: "8", label: "custom modules" },
      { value: "~53,000", label: "lines of code" },
      { value: "4×", label: "faster product list" },
    ],
  },
  stack: [
    {
      group: "Backend",
      items: ["Dolibarr 22", "PHP 8"],
    },
    {
      group: "Frontend",
      items: ["JavaScript"],
    },
    {
      group: "Data",
      items: ["PostgreSQL 16", "IndexedDB"],
    },
    {
      group: "Infra",
      items: [
        "Docker",
        "Nginx",
        "Cloudflare Tunnel",
        "Tailscale",
        "GitHub Actions",
        "Borg",
      ],
    },
  ],
} satisfies Project;

export default project;
