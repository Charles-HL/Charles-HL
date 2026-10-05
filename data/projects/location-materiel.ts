import type { Project } from "../../src/types/project";

const project = {
  slug: "location-materiel",
  order: 10,
  featured: false,
  categories: ["frontend", "field-apps"],
  icon: "Truck",
  title: {
    fr: "Location de matériel : flotte, réservations, paiement et contrat signé",
    en: "Equipment rental: fleet, bookings, payment and signed contract",
  },
  tagline: {
    fr: "De la réservation au contrat signé sur tablette, sans risque de double location.",
    en: "From booking to a contract signed on a tablet, with no risk of double bookings.",
  },
  summary: {
    fr: "Deux applications de location : flotte, réservations sans conflit, prix et paiements suivis, puis remise au client avec contrat signé sur tablette.",
    en: "Two rental apps: fleet, conflict-free bookings, pricing and payment tracking, then customer handover with a PDF contract signed on a tablet.",
  },
  metaTitle: {
    fr: "Location de matériel : flotte, réservations et contrat signé",
    en: "Equipment rental: fleet, bookings and signed contract",
  },
  context: {
    fr: "Une PME de distribution et de services loue du matériel à ses clients. Il faut connaître l'état de la flotte, empêcher qu'une machine soit louée deux fois sur la même période, calculer les prix et suivre les paiements jusqu'au contrat signé.",
    en: "A distribution and services SME rents out equipment to its customers. It needs to know the state of its fleet, prevent a machine from being rented twice over the same period, calculate prices and track payments through to a signed contract.",
  },
  role: {
    fr: "De la conception à la mise en production des deux applications, en autonomie complète.",
    en: "From design to deployment of both applications, fully autonomously.",
  },
  solution: {
    fr: "L'application de gestion de flotte couvre les machines, leurs variantes, les accessoires, les entretiens, la caution et les heures moteur. Les réservations bloquent les périodes déjà louées et calculent le prix : livraison, acompte, accessoires au jour ou au forfait. Les réservations en ligne arrivent depuis la boutique.\n\nL'application de remise guide la location sur tablette en 5 étapes : identité, photos, contrat, signature, finalisation. Le contrat PDF est généré dans le navigateur, prévisualisé puis envoyé par e-mail. Côté API, les demandes de paiement partent avec un QR code de virement.",
    en: "The fleet management app covers machines, variants, accessories, maintenance, deposits and engine hours. Bookings block periods that are already rented and calculate the price: delivery, deposit, and accessories charged per day or at a flat rate. Online bookings come in from the store.\n\nThe handover app guides the rental on a tablet in 5 steps: identity, photos, contract, signature, completion. The PDF contract is generated in the browser, previewed, then sent by email. On the API side, payment requests go out with a bank transfer QR code.",
  },
  highlights: {
    fr: [
      {
        title: "Flotte complète",
        description:
          "Machines, variantes, accessoires, entretiens, caution et heures moteur, réunis au même endroit.",
      },
      {
        title: "Réservations sans double location",
        description:
          "Les périodes déjà louées sont bloquées : une machine ne peut pas être réservée deux fois.",
      },
      {
        title: "Calcul du prix intégré",
        description:
          "Livraison, acompte et accessoires facturés au jour ou au forfait sont pris en compte automatiquement.",
      },
      {
        title: "Remise au client en 5 étapes",
        description:
          "Identité, photos, contrat, signature et finalisation, sur tablette, dans un assistant guidé.",
      },
    ],
    en: [
      {
        title: "Complete fleet view",
        description:
          "Machines, variants, accessories, maintenance, deposits and engine hours, all in one place.",
      },
      {
        title: "No double bookings",
        description:
          "Periods already rented are blocked, so a machine cannot be booked twice for the same dates.",
      },
      {
        title: "Built-in pricing",
        description:
          "Delivery, deposit, and accessories charged per day or at a flat rate are all factored in automatically.",
      },
      {
        title: "5-step customer handover",
        description:
          "Identity, photos, contract, signature and completion, on a tablet, in a guided wizard.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Un assistant qui reprend à la bonne étape",
        description:
          "Une remise interrompue ne repart pas de zéro : l'assistant rouvre l'étape en cours.",
      },
      {
        title: "Contrat PDF généré dans le navigateur",
        description:
          "Le contrat est produit côté client avec @react-pdf et prévisualisé sur tablette grâce à pdf.js.",
      },
      {
        title: "Paiements automatisés côté API",
        description:
          "Demandes de paiement avec QR code de virement, relances et annulations automatiques.",
      },
      {
        title: "Alerte sur les modifications non enregistrées",
        description:
          "Une alerte signale les modifications non enregistrées avant qu'elles ne soient perdues.",
      },
    ],
    en: [
      {
        title: "A wizard that resumes at the right step",
        description:
          "An interrupted handover doesn't start over: the wizard reopens at the current step.",
      },
      {
        title: "PDF contract generated in the browser",
        description:
          "The contract is built client-side with @react-pdf and previewed on the tablet with pdf.js.",
      },
      {
        title: "Automated payments on the API side",
        description:
          "Payment requests with a bank transfer QR code, plus automatic reminders and cancellations.",
      },
      {
        title: "Unsaved changes warning",
        description: "An alert flags unsaved changes before they can be lost.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "2", label: "applications" },
      { value: "~17 000", label: "lignes de code" },
      { value: "5 jours", label: "pour livrer le premier assistant" },
    ],
    en: [
      { value: "2", label: "applications" },
      { value: "~17,000", label: "lines of code" },
      { value: "5 days", label: "to ship the first wizard" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: [
        "React 18",
        "TypeScript",
        "MUI 6",
        "AG Grid",
        "Redux Toolkit",
        "Formik",
        "Yup",
        "@hello-pangea/dnd",
      ],
    },
    {
      group: "Intégrations",
      items: ["@react-pdf", "pdf.js"],
    },
  ],
} satisfies Project;

export default project;
