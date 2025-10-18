"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Github, Linkedin } from "lucide-react";
import HeroButtons from "./HeroButtons";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14 lg:pt-0"
    >
      {/* Background gradient - Professional and subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/50 to-emerald-50/30 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>

      {/* Subtle background accents - Static for professionalism */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{t("title")}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <HeroButtons />

          {/* Social Links - Professional style */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <motion.a
              href="mailto:contact@charleshl.dev"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Mail className="w-7 h-7" />
            </motion.a>
            {/* <motion.a
              href="https://github.com/charles-hl"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Github className="w-7 h-7" />
            </motion.a> */}
            <motion.a
              href="https://www.linkedin.com/in/charles-hl/"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Linkedin className="w-7 h-7" />
            </motion.a>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 block"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
