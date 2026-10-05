"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";
import TurnstileField from "./TurnstileField";
import { fieldClass, labelClass } from "./form-styles";
import { useFormSubmission } from "./useFormSubmission";

const PROJECT_TYPES = ["website", "backend", "fullstack", "mobile", "other"] as const;
const TIMELINES = ["urgent", "fast", "normal", "flexible"] as const;

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  projectType: "",
  budgetMin: "",
  budgetMax: "",
  timeline: "",
  description: "",
  requirements: "",
  website: "",
};

export default function QuoteForm() {
  const t = useTranslations("quote.form");
  const [formData, setFormData] = useState(emptyForm);
  const { isSubmitting, status, message, details, statusRef, submit, captcha, captchaReady } =
    useFormSubmission({
      endpoint: "/api/quote",
      successMessage: t("success"),
      errorMessage: t("error"),
    });

  const budgetError =
    formData.budgetMin &&
    formData.budgetMax &&
    parseFloat(formData.budgetMin) > parseFloat(formData.budgetMax)
      ? t("budget.errorMinMax")
      : "";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetError) return;
    if (await submit(formData)) {
      setFormData(emptyForm);
    }
  };

  const budgetFieldClass = `${fieldClass} ${budgetError ? "!border-red-500" : ""}`;

  return (
    <div className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8 md:p-12 dark:border-gray-600/60 dark:bg-gray-800/90">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {t("projectDetails")}
      </h2>

      <FormStatus status={status} message={message} details={details} statusRef={statusRef} />

      <form className="relative space-y-8" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          {(["firstName", "lastName"] as const).map((field) => (
            <div key={field}>
              <label htmlFor={field} className={labelClass}>
                {t(field)} *
              </label>
              <input
                type="text"
                id={field}
                name={field}
                required
                autoComplete={field === "firstName" ? "given-name" : "family-name"}
                value={formData[field]}
                onChange={handleInputChange}
                className={fieldClass}
              />
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              {t("email")} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              {t("company")}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleInputChange}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            {t("projectType.label")} *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleInputChange}
            className={fieldClass}
          >
            <option value="">{t("selectProjectType")}</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`projectType.options.${type}`)}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("budget.label")} *
          </legend>
          <div className="grid grid-cols-2 gap-4">
            {(["budgetMin", "budgetMax"] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  {t(field === "budgetMin" ? "budget.minimum" : "budget.maximum")}
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  min="0"
                  step="100"
                  required
                  inputMode="numeric"
                  value={formData[field]}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(budgetError)}
                  className={budgetFieldClass}
                  placeholder={field === "budgetMin" ? "500" : "5000"}
                />
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t("budget.help")}</p>
          {budgetError && (
            <p role="alert" className="mt-1 text-xs text-red-500">
              {budgetError}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            {t("timeline.label")} *
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleInputChange}
            className={fieldClass}
          >
            <option value="">{t("selectTimeline")}</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {t(`timeline.options.${timeline}`)}
              </option>
            ))}
          </select>
        </div>

        {(["description", "requirements"] as const).map((field) => (
          <div key={field}>
            <label htmlFor={field} className={labelClass}>
              {t(field)}
              {field === "description" && " *"}
            </label>
            <textarea
              id={field}
              name={field}
              rows={4}
              required={field === "description"}
              value={formData[field]}
              onChange={handleInputChange}
              className={`${fieldClass} resize-none`}
              placeholder={t(`placeholders.${field}`)}
            />
          </div>
        ))}

        <TurnstileField captcha={captcha} />

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || !captchaReady}
            className="cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t("requiredNote")}</p>
        </div>
        <HoneypotField value={formData.website} onChange={handleInputChange} />
      </form>
    </div>
  );
}
