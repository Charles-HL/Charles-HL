import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import { Mail, MapPin, Clock, Linkedin, Github } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: "en" | "fr" }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-12 lg:pt-32 pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              {t("pages.contact.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("pages.contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {t("pages.contact.getInTouch")}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {t("pages.contact.description")}
                </p>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("pages.contact.methods.email")}
                      </h3>
                      <a
                        href="mailto:contact@charleshl.dev"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        contact@charleshl.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("pages.contact.methods.location")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Toulouse, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("pages.contact.methods.responseTime")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t("pages.contact.methods.responseTimeValue")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    {t("pages.contact.social")}
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/charles-hl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/charleshl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t("pages.contact.sendMessage")}
                  </h2>

                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("pages.contact.form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={t("pages.contact.form.placeholders.name")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("pages.contact.form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={t("pages.contact.form.placeholders.email")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("pages.contact.form.subject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={t(
                          "pages.contact.form.placeholders.subject"
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {t("pages.contact.form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                        placeholder={t(
                          "pages.contact.form.placeholders.message"
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                      {t("pages.contact.form.send")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t("pages.contact.quickQuote.title")}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {t("pages.contact.quickQuote.description")}
              </p>

              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                {t("pages.contact.quickQuote.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
