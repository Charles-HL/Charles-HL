"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CONTACT_PROFILES, type ContactProfile } from "@/content/audiences";
import FormStatus from "./FormStatus";
import HoneypotField from "./HoneypotField";
import { fieldClass, labelClass } from "./form-styles";
import { useFormSubmission } from "./useFormSubmission";

interface ContactFormProps {
  /** Pre-selected profile, from the `?profil=` query parameter. */
  initialProfile?: ContactProfile;
}

const emptyForm = (profile: ContactProfile | "" = "") => ({
  profile,
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
});

export default function ContactForm({ initialProfile }: ContactFormProps) {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState(emptyForm(initialProfile));
  const { isSubmitting, status, message, details, statusRef, submit } =
    useFormSubmission({
      endpoint: "/api/contact",
      successMessage: t("form.success"),
      errorMessage: t("form.error"),
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit(formData)) {
      setFormData(emptyForm());
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {t("sendMessage")}
      </h2>

      <FormStatus status={status} message={message} details={details} statusRef={statusRef} />

      <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="profile" className={labelClass}>
            {t("form.profile.label")}
          </label>
          <select
            id="profile"
            name="profile"
            required
            value={formData.profile}
            onChange={handleInputChange}
            className={fieldClass}
          >
            <option value="">{t("form.profile.placeholder")}</option>
            {CONTACT_PROFILES.map((profile) => (
              <option key={profile} value={profile}>
                {t(`form.profile.options.${profile}`)}
              </option>
            ))}
          </select>
        </div>

        {(["name", "email", "subject"] as const).map((field) => (
          <div key={field}>
            <label htmlFor={field} className={labelClass}>
              {t(`form.${field}`)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              required
              autoComplete={field === "subject" ? "off" : field}
              value={formData[field]}
              onChange={handleInputChange}
              className={fieldClass}
              placeholder={t(`form.placeholders.${field}`)}
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className={labelClass}>
            {t("form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleInputChange}
            className={`${fieldClass} resize-none`}
            placeholder={t("form.placeholders.message")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? t("form.sending") : t("form.send")}
        </button>
        <HoneypotField value={formData.website} onChange={handleInputChange} />
      </form>
    </div>
  );
}
