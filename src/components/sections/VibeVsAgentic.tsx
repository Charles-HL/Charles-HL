import { getTranslations } from "next-intl/server";
import { CheckCircle2, XCircle } from "lucide-react";

interface ComparisonRow {
  vibe: string;
  mine: string;
}

/** Two-column comparison: vibe coding versus a controlled agentic practice. */
export default async function VibeVsAgentic() {
  const t = await getTranslations("sections.agentic.comparison");
  const rows = t.raw("rows") as ComparisonRow[];

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-md dark:border-blue-900/30 dark:bg-gray-800">
      <table className="w-full table-fixed text-left">
        <caption className="border-b border-gray-100 px-4 py-4 text-lg font-bold text-gray-900 sm:px-6 dark:border-gray-700 dark:text-white">
          {t("title")}
        </caption>
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-wider sm:text-sm">
            <th scope="col" className="bg-rose-50 px-4 py-3 text-rose-700 sm:px-6 dark:bg-rose-950/30 dark:text-rose-300">
              {t("vibe")}
            </th>
            <th scope="col" className="bg-emerald-50 px-4 py-3 text-emerald-700 sm:px-6 dark:bg-emerald-950/30 dark:text-emerald-300">
              {t("mine")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {rows.map((row) => (
            <tr key={row.mine} className="align-top text-sm sm:text-base">
              <td className="px-4 py-3 text-gray-500 sm:px-6 dark:text-gray-400">
                <span className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                  {row.vibe}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900 sm:px-6 dark:text-white">
                <span className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {row.mine}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
