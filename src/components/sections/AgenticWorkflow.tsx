import { getTranslations } from "next-intl/server";
import { UserCheck } from "lucide-react";

const workflowSteps = [
  { key: "need" },
  { key: "spec" },
  { key: "plan", humanValidation: true },
  { key: "implement" },
  { key: "review", humanValidation: true },
  { key: "qa" },
  { key: "fix" },
  { key: "ship", humanValidation: true },
  { key: "capitalize" },
] as const;

/* Vertical below `lg`, horizontal above it: nine steps need that width. */
const layout = {
  list: "lg:grid lg:grid-cols-9 lg:gap-3",
  item: "lg:flex-col lg:items-center lg:text-center lg:pb-0",
  verticalLine: "lg:hidden",
  horizontalLine: "hidden lg:block",
  text: "lg:pt-3",
};

export default async function AgenticWorkflow() {
  const [t, tCommon] = await Promise.all([
    getTranslations("sections.agentic.workflow"),
    getTranslations("common"),
  ]);
  const steps = workflowSteps;

  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
        {t("title")}
      </h3>
      <ol className={`relative ${layout.list}`}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const label = t(`steps.${step.key}`);

          return (
            <li key={step.key} className={`relative flex gap-4 pb-6 ${layout.item}`}>
              {!isLast && (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2 bg-blue-200 dark:bg-blue-900 ${layout.verticalLine}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-5 h-0.5 w-full bg-blue-200 dark:bg-blue-900 ${layout.horizontalLine}`}
                  />
                </>
              )}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 font-bold text-white shadow-md">
                {index + 1}
              </span>
              <div className={`min-w-0 pt-2 ${layout.text}`}>
                <p className="text-sm font-semibold leading-snug text-gray-900 dark:text-white">
                  {label}
                </p>
                {"humanValidation" in step && step.humanValidation && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <UserCheck className="h-3 w-3 shrink-0" />
                    {tCommon("humanValidation")}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
