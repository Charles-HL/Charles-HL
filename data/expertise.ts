/** Language-neutral technology lists of the expertise pillars. */
export const expertisePillars = [
  {
    id: "architecture",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "MedusaJS v2",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "MeiliSearch",
      "PHP",
    ],
  },
  {
    id: "frontend",
    stack: [
      "React 18/19",
      "Next.js 15/16",
      "App Router",
      "Server Actions",
      "Tailwind 4",
      "shadcn / Base UI",
      "AG Grid",
      "Redux Toolkit",
      "react-hook-form",
      "Zod",
    ],
  },
  {
    id: "security",
    stack: ["OIDC + PKCE", "BFF", "Zitadel", "Passkeys", "TOTP", "AES-256-GCM"],
  },
  {
    id: "devops",
    stack: [
      "Docker",
      "GitHub Actions",
      "GHCR",
      "Cloudflare Tunnel",
      "Nginx",
      "Prometheus",
      "Grafana",
      "Loki",
      "Alertmanager",
      "Borg",
    ],
  },
  {
    id: "integrations",
    stack: [
      "Mollie",
      "Stripe",
      "Dolibarr",
      "Peppol",
      "UBL",
      "EN 16931",
      "Google Calendar",
      "Google Drive",
    ],
  },
  {
    id: "ai",
    stack: [
      "PyTorch",
      "TensorFlow",
      "DDPG / MADDPG",
      "NLP",
      "XAI",
      "Claude Code",
      "Codex",
      "MCP",
    ],
  },
] as const;

export type ExpertisePillarId = (typeof expertisePillars)[number]["id"];

/** Pillars that expose extra detail bullets on the consulting page. */
export const detailedPillarIds = ["security", "devops"] as const;
