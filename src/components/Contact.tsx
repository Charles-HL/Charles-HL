"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const Contact = () => {
  const t = useTranslations("contact");

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t("email"),
      value: "contact@charleshl.dev",
      href: "mailto:contact@charleshl.dev",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: t("linkedin"),
      value: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/charles-hl/",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: t("location"),
      value: "Toulouse, France",
      href: "",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-12 bg-gradient-to-br from-blue-50/70 via-white/30 to-purple-50/70 dark:from-gray-900/70 dark:via-gray-800/30 dark:to-purple-900/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16 will-change-transform"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">{t("title")}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mb-4"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-16 will-change-transform"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center will-change-transform"
            >
              <div
                className={`inline-flex p-4 rounded-full bg-gradient-to-r ${method.color} text-white mb-4`}
              >
                {method.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {method.label}
              </h3>

              {method.href ? (
                <a
                  href={method.href}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                  target={method.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    method.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {method.value}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center will-change-transform"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:contact@charleshl.dev"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center will-change-transform"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t("cta.sendEmail")}
              </motion.a>

              <Link
                href="/quote"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center"
              >
                {t("cta.requestQuote")}
              </Link>

              <motion.a
                href="https://www.linkedin.com/in/charles-hl/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "tween", duration: 0.2 }}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center justify-center will-change-transform"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                {t("cta.linkedin")}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12 will-change-transform"
        >
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-semibold">{t("availability.status")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
