import type { Project } from "../../src/types/project";

const project = {
  slug: "boutique-en-ligne-click-and-collect",
  order: 15,
  featured: false,
  categories: ["ecommerce", "frontend"],
  icon: "ShoppingBag",
  title: {
    fr: "Boutique en ligne de vente à emporter",
    en: "Online takeaway store",
  },
  tagline: {
    fr: "Une boutique responsive de produits à emporter, pensée pour le SEO et la performance.",
    en: "A responsive takeaway store, built for SEO and performance.",
  },
  summary: {
    fr: "Boutique en ligne responsive de produits à emporter : rendu serveur Next.js pour le SEO, paiement Stripe, API Express et MongoDB.",
    en: "A responsive takeaway store: Next.js server rendering for SEO, Stripe payments, an Express API backed by MongoDB.",
  },
  context: {
    fr: "Vendre des produits à emporter en ligne suppose d'être trouvé sur les moteurs de recherche et d'encaisser les paiements en toute sécurité. Le catalogue devait aussi rester simple à gérer.",
    en: "Selling takeaway products online means being found on search engines and taking payments securely. The product catalogue also had to stay easy to manage.",
  },
  role: {
    fr: "Conception, développement et mise en production.",
    en: "Design, development and deployment.",
  },
  solution: {
    fr: "La boutique repose sur React et Next.js, avec un rendu côté serveur pour le référencement et la performance. Les pages utilisent des balises sémantiques et des métadonnées dynamiques.\n\nUne API Node.js et Express gère les produits stockés dans MongoDB, et les paiements passent par Stripe. Le déploiement est automatisé avec GitHub Actions.",
    en: "The store is built with React and Next.js, using server-side rendering for search visibility and performance. Pages rely on semantic markup and dynamic metadata.\n\nA Node.js and Express API manages products stored in MongoDB, and payments go through Stripe. Deployment is automated with GitHub Actions.",
  },
  highlights: {
    fr: [
      {
        title: "SEO avancé",
        description: "Balises sémantiques et métadonnées dynamiques sur chaque page.",
      },
      {
        title: "Interface responsive sur mesure",
        description: "Un design sur mesure qui s'adapte à tous les écrans.",
      },
      {
        title: "Paiement sécurisé",
        description: "Les paiements sont confiés à Stripe.",
      },
      {
        title: "Gestion des produits",
        description: "Le catalogue est stocké dans MongoDB et servi par l'API.",
      },
    ],
    en: [
      {
        title: "Advanced SEO",
        description: "Semantic markup and dynamic metadata on every page.",
      },
      {
        title: "Custom responsive interface",
        description: "A custom design that adapts to every screen size.",
      },
      {
        title: "Secure payments",
        description: "Payments are handled by Stripe.",
      },
      {
        title: "Product management",
        description: "The catalogue is stored in MongoDB and served by the API.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Rendu côté serveur",
        description: "Le rendu serveur de Next.js livre des pages indexables et rapides dès le premier affichage.",
      },
      {
        title: "API dédiée",
        description: "Une API Node.js et Express expose les produits stockés dans MongoDB.",
      },
      {
        title: "Déploiement automatisé",
        description: "Chaque mise en production passe par un workflow GitHub Actions.",
      },
    ],
    en: [
      {
        title: "Server-side rendering",
        description: "Next.js server rendering delivers indexable pages that are fast from the first paint.",
      },
      {
        title: "Dedicated API",
        description: "A Node.js and Express API serves products stored in MongoDB.",
      },
      {
        title: "Automated deployment",
        description: "Every release goes through a GitHub Actions workflow.",
      },
    ],
  },
  metrics: { fr: [], en: [] },
  stack: [
    { group: "Frontend", items: ["React", "Next.js"] },
    { group: "Backend", items: ["Node.js", "Express.js"] },
    { group: "Data", items: ["MongoDB"] },
    { group: "Intégrations", items: ["Stripe"] },
    { group: "Infra", items: ["GitHub Actions"] },
  ],
} satisfies Project;

export default project;
