import type { Project } from "../../src/types/project";

const project = {
  slug: "chaine-developpement-agentique",
  order: 14,
  featured: true,
  categories: ["ai"],
  icon: "Bot",
  title: {
    fr: "Chaîne de développement agentique industrialisée",
    en: "Industrialized agentic development pipeline",
  },
  tagline: {
    fr: "Ingénieur d'abord : l'IA exécute, je conçois, je décide, je relis et je prouve.",
    en: "Engineer first: AI executes; I design, decide, review and prove.",
  },
  summary: {
    fr: "Specs versionnées, skills et recettes multi-agents en navigateur : une chaîne d'IA sous contrôle d'ingénieur, plus de 800 cas de recette joués.",
    en: "Versioned specs, skills and multi-agent browser testing: an AI pipeline under engineering control, with over 800 test cases run.",
  },
  context: {
    fr: "Livrer seul un système d'information complet, avec un niveau de qualité d'équipe. Générer du code ne suffit pas : chaque changement doit être cadré, relu et prouvé.",
    en: "Delivering a complete information system single-handedly, at the quality level of a full team. Generating code is not enough: every change has to be scoped, reviewed and proven.",
  },
  role: {
    fr: "Je cadre, j'orchestre, je relis chaque changement et je garde le dernier mot, en autonomie complète.",
    en: "I scope, orchestrate, review every change and keep the final say, fully autonomously.",
  },
  solution: {
    fr: "Tout part d'un workflow spec-driven : le besoin devient une roadmap versionnée, découpée en livrables avec preuves et statuts de vérification. Chaque dépôt porte son contrat AGENTS.md. L'exécution est orchestrée par des skills réutilisables, des sous-agents calibrés en modèle et en effort selon le risque, et des worktrees parallèles.\n\nLa preuve passe par des recettes multi-agents dans un vrai navigateur, via MCP : les verdicts sont re-mesurés et un registre relie chaque défaut à son correctif. Le savoir est capitalisé dans une mémoire long terme auto-hébergée, alimentée par des hooks. Cette chaîne a livré la plateforme e-commerce, le SSO sur 9 applications et l'import fournisseur en production.",
    en: "Everything starts with a spec-driven workflow: each need becomes a versioned roadmap, split into deliverables with proof and verification status. Every repository carries its own AGENTS.md contract. Execution is orchestrated by reusable skills, subagents whose model and effort are calibrated to risk, and parallel worktrees.\n\nProof comes from multi-agent acceptance testing in a real browser, via MCP: verdicts are re-measured and a defect log links every bug to its fix. Knowledge is captured in a self-hosted long-term memory, fed by hooks. This pipeline delivered the e-commerce platform, SSO across 9 applications and the supplier import running in production.",
  },
  highlights: {
    fr: [
      {
        title: "Specs et roadmaps versionnées",
        description: "Chaque besoin devient une roadmap découpée en livrables, avec preuve et statut de vérification.",
      },
      {
        title: "Recettes multi-agents en navigateur",
        description: "Jusqu'à 11 sous-agents jouent la recette dans un vrai navigateur, via MCP.",
      },
      {
        title: "Verdicts re-mesurés",
        description: "Aucun verdict d'agent n'est pris pour acquis : il est re-mesuré, et la traçabilité est vérifiée par script.",
      },
      {
        title: "Des résultats en production",
        description: "Plateforme e-commerce, SSO sur 9 applications et import fournisseur livrés avec cette chaîne.",
      },
    ],
    en: [
      {
        title: "Versioned specs and roadmaps",
        description: "Each need becomes a roadmap split into deliverables, with proof and verification status.",
      },
      {
        title: "Multi-agent browser testing",
        description: "Up to 11 subagents run acceptance tests in a real browser, via MCP.",
      },
      {
        title: "Re-measured verdicts",
        description: "No agent verdict is taken at face value: each one is re-measured, and traceability is checked by script.",
      },
      {
        title: "Results in production",
        description: "E-commerce platform, SSO across 9 applications and supplier import, all delivered with this pipeline.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "L'ingénieur garde le dernier mot",
        description: "Plan validé avant tout code, revue de chaque changement : aucun code non compris n'est fusionné.",
      },
      {
        title: "Agents calibrés selon le risque",
        description: "Modèle et niveau d'effort de chaque sous-agent sont choisis en fonction de l'enjeu de la tâche.",
      },
      {
        title: "Test qui échoue d'abord",
        description: "Chaque correction commence par une spec et un test qui reproduit le défaut avant d'être corrigé.",
      },
      {
        title: "Capitalisation automatique",
        description: "Des hooks alimentent la mémoire long terme, partagée entre Claude Code et Codex.",
      },
    ],
    en: [
      {
        title: "The engineer keeps the final say",
        description: "A validated plan before any code, a review of every change: nothing gets merged unless it is understood.",
      },
      {
        title: "Risk-calibrated agents",
        description: "Each subagent's model and effort level are chosen according to what is at stake.",
      },
      {
        title: "Failing test first",
        description: "Every fix starts with a spec and a test that reproduces the defect before it is corrected.",
      },
      {
        title: "Automatic knowledge capture",
        description: "Hooks feed the long-term memory, shared by Claude Code and Codex.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "5", label: "campagnes de recette" },
      { value: "800+", label: "cas de recette joués" },
      { value: "11", label: "agents en parallèle, au maximum" },
    ],
    en: [
      { value: "5", label: "testing campaigns" },
      { value: "800+", label: "test cases run" },
      { value: "11", label: "agents in parallel, at peak" },
    ],
  },
  stack: [
    {
      group: "IA",
      items: ["Claude Code", "Codex", "MCP (Chrome DevTools)", "Skills", "Hooks", "Subagents", "Hindsight"],
    },
    { group: "Infra", items: ["Git worktrees", "Docker"] },
    { group: "Qualité", items: ["Python"] },
  ],
} satisfies Project;

export default project;
