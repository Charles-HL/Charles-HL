"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building, User, ExternalLink } from "lucide-react";
import Button from "./Button";

const Experience = () => {
  const t = useTranslations("experience");

  const experiences = [
    {
      title: t("freelance.title"),
      company: t("freelance.company"),
      period: t("freelance.period"),
      description: t("freelance.description"),
      location: "",
      icon: <User className="w-6 h-6" />,
      color: "from-emerald-600 to-emerald-700",
      current: true,
    },
    {
      title: t("thales.title"),
      company: t("thales.company"),
      period: t("thales.period"),
      description: "",
      location: t("thales.location"),
      icon: <Building className="w-6 h-6" />,
      color: "from-blue-600 to-blue-700",
      current: true,
    },
    {
      title: t("sopra.title"),
      company: t("sopra.company"),
      period: t("sopra.period"),
      description: t("sopra.description"),
      location: t("sopra.location"),
      icon: <Building className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      current: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline line - Professional blue */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-400"></div>

          <div className="space-y-6 md:space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-8 md:mb-12`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-1/2 md:top-auto md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center text-white shadow-lg z-10`}
                >
                  {exp.icon}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-16 md:ml-0 md:w-5/12 w-full ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-100 dark:border-blue-900/30">
                    {exp.current && (
                      <span className="inline-block bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg mb-3 border border-emerald-200 dark:border-emerald-700">
                        {t("current")}
                      </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                      <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{exp.company}</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{exp.period}</span>
                    </div>

                    {exp.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{exp.location}</span>
                      </div>
                    )}

                    {exp.description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View More Button */}
        <div className="flex justify-center items-center mt-8 w-full text-center">
          <Button
            href="/experience"
            variant="primary"
            size="lg"
            className="inline-flex items-center"
          >
            {t("viewDetailed")}
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
