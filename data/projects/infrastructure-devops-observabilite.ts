import type { Project } from "../../src/types/project";

const project = {
  slug: "infrastructure-devops-observabilite",
  order: 7,
  featured: false,
  categories: ["devops"],
  icon: "ServerCog",
  title: {
    fr: "Infrastructure, CI/CD et observabilité de production",
    en: "Production infrastructure, CI/CD and observability",
  },
  tagline: {
    fr: "2 serveurs durcis, zéro port applicatif exposé, rollback par tag et sauvegardes en pull.",
    en: "2 hardened servers, zero exposed app ports, tag-based rollback and pull backups.",
  },
  summary: {
    fr: "Deux serveurs de production durcis et supervisés : aucun port applicatif exposé, rollback par tag et sauvegardes sur 3 niveaux.",
    en: "Two hardened, monitored production servers: no exposed application ports, tag-based rollback and three-tier backups.",
  },
  context: {
    fr: "Le système d'information d'une PME de distribution et de services repose sur plusieurs applications critiques : API, boutique en ligne, ERP et fournisseur d'identité. Elles doivent tourner en continu, se déployer sans risque et rester restaurables après un incident.",
    en: "The information system of a distribution and services SME relies on several critical applications: an API, an online store, an ERP and an identity provider. They must run continuously, deploy safely and stay recoverable after an incident.",
  },
  role: {
    fr: "Conception, mise en place, sécurisation et exploitation de l'infrastructure, en autonomie complète.",
    en: "Design, setup, hardening and operation of the infrastructure, fully autonomously.",
  },
  solution: {
    fr: "L'infrastructure repose sur 2 serveurs aux rôles séparés : un VPS cloud pour l'API, la boutique et l'observabilité, un serveur sur site pour l'ERP et les sauvegardes. Les services tiennent dans 5 réseaux Docker isolés et aucun port applicatif n'est exposé : tout passe par Cloudflare Tunnel.\n\nLa CI/CD produit des images taguées par commit, si bien que revenir en arrière consiste à redéployer un tag. L'exploitation s'appuie sur Prometheus, Grafana, Loki et Alertmanager, avec des sauvegardes sur 3 niveaux rapatriées chaque jour en mode pull.",
    en: "The infrastructure runs on 2 servers with separate roles: a cloud VPS for the API, the store and observability, and an on-premises server for the ERP and backups. Services sit in 5 isolated Docker networks and no application port is exposed: all traffic goes through Cloudflare Tunnel.\n\nCI/CD builds images tagged by commit, so rolling back means redeploying a tag. Operations rely on Prometheus, Grafana, Loki and Alertmanager, with three-tier backups pulled in daily.",
  },
  highlights: {
    fr: [
      {
        title: "Aucun port applicatif exposé",
        description:
          "Les applications sont publiées via un tunnel, sans aucun service à l'écoute directe sur Internet.",
      },
      {
        title: "Isolation et durcissement",
        description:
          "5 réseaux Docker isolés, SSH durci, pare-feu avec chaîne DOCKER-USER et fail2ban.",
      },
      {
        title: "Rollback par tag",
        description:
          "Chaque image est taguée par commit : revenir à une version stable revient à redéployer son tag.",
      },
      {
        title: "Observabilité complète",
        description:
          "Métriques, tableaux de bord provisionnés, logs centralisés et alertes.",
      },
    ],
    en: [
      {
        title: "No exposed application ports",
        description:
          "Applications are published through a tunnel, with no service listening directly on the internet.",
      },
      {
        title: "Isolation and hardening",
        description:
          "5 isolated Docker networks, hardened SSH, a firewall covering the DOCKER-USER chain, and fail2ban.",
      },
      {
        title: "Tag-based rollback",
        description:
          "Every image is tagged by commit, so going back to a stable version means redeploying its tag.",
      },
      {
        title: "Full observability",
        description:
          "Metrics, provisioned dashboards, centralised logs and alerting.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Sauvegardes en mode pull",
        description:
          "C'est le serveur de sauvegarde qui vient chercher les données : un serveur compromis ne peut pas effacer la copie.",
      },
      {
        title: "Un échec silencieux débusqué",
        description:
          "Une sauvegarde échouait depuis des mois : un pipe masquait son code de sortie.",
      },
      {
        title: "Diagnostic disque sans interruption",
        description:
          "Occupation ramenée de 96 % à 68 % sans coupure de service, avec alerte à 85 %.",
      },
      {
        title: "Des workflows CI eux-mêmes testés",
        description:
          "actionlint et shellcheck vérifient les workflows et les scripts shell.",
      },
    ],
    en: [
      {
        title: "Pull-based backups",
        description:
          "The backup server fetches the data itself, so a compromised server cannot erase the copy.",
      },
      {
        title: "A silent failure uncovered",
        description:
          "A backup had been failing for months: a pipe was masking its exit code.",
      },
      {
        title: "Disk diagnosis with zero downtime",
        description:
          "Disk usage brought down from 96% to 68% without service interruption, with an alert at 85%.",
      },
      {
        title: "CI workflows that are tested too",
        description:
          "actionlint and shellcheck check the workflows and shell scripts.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "2", label: "serveurs de production" },
      { value: "0", label: "port applicatif exposé" },
      { value: "3", label: "niveaux de sauvegarde" },
    ],
    en: [
      { value: "2", label: "production servers" },
      { value: "0", label: "exposed application ports" },
      { value: "3", label: "backup tiers" },
    ],
  },
  stack: [
    {
      group: "Infra",
      items: [
        "Docker Compose",
        "GitHub Actions",
        "GHCR",
        "Nginx",
        "Let's Encrypt",
        "Bash",
      ],
    },
    {
      group: "Sécurité",
      items: ["Cloudflare Tunnel", "Tailscale", "fail2ban"],
    },
    {
      group: "Qualité",
      items: [
        "Prometheus",
        "Grafana",
        "Loki",
        "Promtail",
        "Alertmanager",
        "actionlint",
        "shellcheck",
      ],
    },
    {
      group: "Data",
      items: ["Borg", "rsync"],
    },
  ],
} satisfies Project;

export default project;
