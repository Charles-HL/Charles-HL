import { getTranslations } from "next-intl/server";
import { projectIcons } from "./project-icons";
import type { ProjectIcon } from "@/types/project";

type NodeKey =
  | "website"
  | "store"
  | "workshop"
  | "rental"
  | "sales"
  | "banking"
  | "designSystem"
  | "api"
  | "ecommerce"
  | "erp"
  | "imports"
  | "sso"
  | "infra";

interface DiagramColumn {
  key: "clients" | "core" | "platform";
  nodes: { key: NodeKey; icon: ProjectIcon }[];
}

const columns: DiagramColumn[] = [
  {
    key: "clients",
    nodes: [
      { key: "website", icon: "Globe" },
      { key: "store", icon: "ShoppingCart" },
      { key: "workshop", icon: "Wrench" },
      { key: "rental", icon: "Truck" },
      { key: "sales", icon: "ClipboardSignature" },
      { key: "banking", icon: "Scale" },
      { key: "designSystem", icon: "Layers" },
    ],
  },
  {
    key: "core",
    nodes: [
      { key: "api", icon: "Server" },
      { key: "ecommerce", icon: "ShoppingCart" },
    ],
  },
  {
    key: "platform",
    nodes: [
      { key: "erp", icon: "Store" },
      { key: "imports", icon: "FileSpreadsheet" },
      { key: "sso", icon: "ShieldCheck" },
      { key: "infra", icon: "ServerCog" },
    ],
  },
];

/**
 * Anonymized map of the SME information system. Nodes are plain labels, not
 * links: the catalogue is the only place that lists projects. The connector
 * layer is an accessible SVG drawn with currentColor so it follows both
 * themes.
 */
export default async function EcosystemDiagram() {
  const t = await getTranslations("sections.ecosystem");

  return (
    <figure className="relative">
      <svg
        role="img"
        aria-labelledby="ecosystem-diagram-title ecosystem-diagram-desc"
        className="pointer-events-none absolute inset-0 h-full w-full text-blue-300 dark:text-blue-700"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <title id="ecosystem-diagram-title">{t("diagramTitle")}</title>
        <desc id="ecosystem-diagram-desc">{t("diagramDescription")}</desc>
        {/* Stacked columns: vertical bus. Side by side: horizontal bus. */}
        <line
          x1="50" y1="0" x2="50" y2="100"
          stroke="currentColor" strokeWidth="3" strokeDasharray="8 6"
          vectorEffect="non-scaling-stroke" className="md:hidden"
        />
        <line
          x1="16" y1="50" x2="84" y2="50"
          stroke="currentColor" strokeWidth="3" strokeDasharray="8 6"
          vectorEffect="non-scaling-stroke" className="hidden md:block"
        />
      </svg>

      <div className="relative grid items-center gap-8 md:grid-cols-3 md:gap-10">
        {columns.map((column) => {
          const isCore = column.key === "core";

          return (
            <div
              key={column.key}
              className={`rounded-2xl border-2 p-4 shadow-md sm:p-5 ${
                isCore
                  ? "border-blue-300 bg-gradient-to-br from-blue-600 to-emerald-600 dark:border-blue-700"
                  : "border-blue-100 bg-white dark:border-blue-900/40 dark:bg-gray-800"
              }`}
            >
              <p
                className={`mb-3 text-center text-xs font-semibold uppercase tracking-wider ${
                  isCore ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {t(`columns.${column.key}`)}
              </p>
              <ul className={`grid gap-2 ${isCore ? "" : "sm:grid-cols-2 md:grid-cols-1"}`}>
                {column.nodes.map((node) => {
                  const Icon = projectIcons[node.icon];

                  return (
                    <li
                      key={node.key}
                      className={`flex items-center gap-2 rounded-xl border px-3 text-sm font-medium ${
                        isCore
                          ? "border-white/40 bg-white/15 py-4 text-base text-white"
                          : "border-gray-200 bg-gray-50 py-2.5 text-gray-800 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {t(`nodes.${node.key}`)}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
