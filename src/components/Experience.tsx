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
      color: "from-green-500 to-emerald-500",
      current: true,
    },
    {
      title: t("thales.title"),
      company: t("thales.company"),
      period: t("thales.period"),
      description: "",
      location: t("thales.location"),
      icon: <Building className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      current: true,
    },
    {
      title: t("sopra.title"),
      company: t("sopra.company"),
      period: t("sopra.period"),
      description: t("sopra.description"),
      location: t("sopra.location"),
      icon: <Building className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
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
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center text-white shadow-lg z-10`}
                >
                  {exp.icon}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    {exp.current && (
                      <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                        {t("current")}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      <Building className="w-4 h-4 mr-2" />
                      {exp.company}
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>

                    {exp.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    )}

                    {exp.description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
