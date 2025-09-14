"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/PageLayout";
import { Calculator, Clock, Euro, FileText } from "lucide-react";

export default function QuotePage() {
  const t = useTranslations();
  const [budgetError, setBudgetError] = useState("");
  const [formData, setFormData] = useState({
    budgetMin: "",
    budgetMax: "",
  });

  const validateBudget = useCallback(() => {
    const min = parseFloat(formData.budgetMin);
    const max = parseFloat(formData.budgetMax);

    if (formData.budgetMin && formData.budgetMax) {
      if (min > max) {
        setBudgetError(
          "Le montant minimum ne peut pas être supérieur au maximum"
        );
        return false;
      } else {
        setBudgetError("");
        return true;
      }
    }
    setBudgetError("");
    return true;
  }, [formData.budgetMin, formData.budgetMax]);

  const handleBudgetChange = (
    field: "budgetMin" | "budgetMax",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    validateBudget();
  }, [validateBudget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBudget()) {
      return;
    }
    // Traitement du formulaire ici
    console.log("Formulaire soumis", formData);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-12 lg:pt-32 pb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              {t("pages.quote.title")}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              {t("pages.quote.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Quote Process */}
      <section className="pt-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-white/60 dark:border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/95 hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("pages.quote.process.step1.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {t("pages.quote.process.step1.description")}
                </p>
              </div>

              <div className="text-center bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-white/60 dark:border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/95 hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("pages.quote.process.step2.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {t("pages.quote.process.step2.description")}
                </p>
              </div>

              <div className="text-center bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-white/60 dark:border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/95 hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Euro className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("pages.quote.process.step3.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {t("pages.quote.process.step3.description")}
                </p>
              </div>

              <div className="text-center bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-white/60 dark:border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/95 hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("pages.quote.process.step4.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {t("pages.quote.process.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/85 dark:bg-gray-800/90 backdrop-blur-xl border border-white/70 dark:border-gray-600/60 rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t("pages.quote.form.projectDetails")}
              </h2>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("pages.quote.form.firstName")} *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("pages.quote.form.lastName")} *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("pages.quote.form.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("pages.quote.form.company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.quote.form.projectType.label")} *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                  >
                    <option value="">
                      {t("pages.quote.form.selectProjectType")}
                    </option>
                    <option value="website">
                      {t("pages.quote.form.projectType.options.website")}
                    </option>
                    <option value="backend">
                      {t("pages.quote.form.projectType.options.backend")}
                    </option>
                    <option value="fullstack">
                      {t("pages.quote.form.projectType.options.fullstack")}
                    </option>
                    <option value="mobile">
                      {t("pages.quote.form.projectType.options.mobile")}
                    </option>
                    <option value="other">
                      {t("pages.quote.form.projectType.options.other")}
                    </option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t("pages.quote.form.budget.label")} *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="budgetMin"
                        className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                      >
                        Minimum (€)
                      </label>
                      <input
                        type="number"
                        id="budgetMin"
                        name="budgetMin"
                        min="0"
                        step="100"
                        required
                        value={formData.budgetMin}
                        onChange={(e) =>
                          handleBudgetChange("budgetMin", e.target.value)
                        }
                        className={`w-full px-4 py-3 border ${
                          budgetError
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        } bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm`}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budgetMax"
                        className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                      >
                        Maximum (€)
                      </label>
                      <input
                        type="number"
                        id="budgetMax"
                        name="budgetMax"
                        min="0"
                        step="100"
                        required
                        value={formData.budgetMax}
                        onChange={(e) =>
                          handleBudgetChange("budgetMax", e.target.value)
                        }
                        className={`w-full px-4 py-3 border ${
                          budgetError
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        } bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm`}
                        placeholder="5000"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Indiquez votre fourchette budgétaire en euros
                  </p>
                  {budgetError && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      {budgetError}
                    </p>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.quote.form.timeline.label")} *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200 shadow-sm"
                  >
                    <option value="">
                      {t("pages.quote.form.selectTimeline")}
                    </option>
                    <option value="urgent">
                      {t("pages.quote.form.timeline.options.urgent")}
                    </option>
                    <option value="fast">
                      {t("pages.quote.form.timeline.options.fast")}
                    </option>
                    <option value="normal">
                      {t("pages.quote.form.timeline.options.normal")}
                    </option>
                    <option value="flexible">
                      {t("pages.quote.form.timeline.options.flexible")}
                    </option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.quote.form.description")} *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white resize-none transition-all duration-200 shadow-sm"
                    placeholder={t("pages.quote.form.placeholders.description")}
                  />
                </div>

                {/* Specific Requirements */}
                <div>
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.quote.form.requirements")}
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white resize-none transition-all duration-200 shadow-sm"
                    placeholder={t(
                      "pages.quote.form.placeholders.requirements"
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {t("pages.quote.form.submit")}
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {t("pages.quote.form.requiredNote")}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
