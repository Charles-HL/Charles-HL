"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "./Button";

const HeroButtons = () => {
  const t = useTranslations("hero");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
    >
      <Button variant="primary" href="#projects">
        {t("cta")}
      </Button>

      <Button variant="glass" href="/quote">
        {t("quote")}
      </Button>

      <Button variant="outline" href="#contact">
        {t("contact")}
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
