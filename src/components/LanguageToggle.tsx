"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="hidden lg:block fixed top-4 right-4 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className="cursor-pointer glass-nav flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-4 py-3 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 shadow-lg"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageToggle;
