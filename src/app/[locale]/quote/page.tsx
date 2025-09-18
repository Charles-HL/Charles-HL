"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import PageLayout from "@/components/PageLayout";
import ErrorDisplay from "@/components/ErrorDisplay";
import { Calculator, Clock, Euro, FileText, CheckCircle } from "lucide-react";

interface QuoteApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[];
}

export default function QuotePage() {
  const t = useTranslations();
  const locale = useLocale();
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const [budgetError, setBudgetError] = useState("");
  const [formData, setFormData] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState<string[]>([]);

  const validateBudget = useCallback(() => {
    const min = parseFloat(formData.budgetMin);
    const max = parseFloat(formData.budgetMax);

    if (formData.budgetMin && formData.budgetMax) {
      if (min > max) {
        setBudgetError(t("pages.quote.form.budget.errorMinMax"));
        return false;
      } else {
        setBudgetError("");
        return true;
      }
    }
    setBudgetError("");
    return true;
  }, [formData.budgetMin, formData.budgetMax, t]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBudgetChange = (
    field: "budgetMin" | "budgetMax",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    validateBudget();
  }, [validateBudget]);

  // Scroll automatique vers le message de statut
  useEffect(() => {
    if (submitStatus !== "idle" && statusMessageRef.current) {
      statusMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBudget()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locale: locale, // Envoyer la locale à l'API
        }),
      });

      const result: QuoteApiResponse = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message || t("pages.quote.form.success"));
        setFormData({
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
        });
        setErrorDetails([]);
      } else {
        setSubmitStatus("error");
        setStatusMessage(result.error || t("pages.quote.form.error"));
        setErrorDetails(result.details || []);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus("error");
      setStatusMessage(t("pages.quote.form.error"));
      setErrorDetails([]);
    } finally {
      setIsSubmitting(false);
    }
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

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div
                  ref={statusMessageRef}
                  className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <p className="text-green-800 dark:text-green-200">
                    {statusMessage}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div ref={statusMessageRef}>
                  <ErrorDisplay
                    title={errorDetails.length > 0 ? statusMessage : undefined}
                    errors={
                      errorDetails.length > 0 ? errorDetails : [statusMessage]
                    }
                    className="mb-8"
                  />
                </div>
              )}

              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
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
                      value={formData.firstName}
                      onChange={handleInputChange}
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
                      value={formData.lastName}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.company}
                      onChange={handleInputChange}
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
                    value={formData.projectType}
                    onChange={handleInputChange}
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
                        {t("pages.quote.form.budget.minimum")}
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
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budgetMax"
                        className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                      >
                        {t("pages.quote.form.budget.maximum")}
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
                    {t("pages.quote.form.budget.help")}
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
                    value={formData.timeline}
                    onChange={handleInputChange}
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
                    value={formData.description}
                    onChange={handleInputChange}
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
                    value={formData.requirements}
                    onChange={handleInputChange}
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
                    disabled={isSubmitting}
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting
                      ? t("pages.quote.form.submitting")
                      : t("pages.quote.form.submit")}
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
