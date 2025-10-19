"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);

    // Récupérer le thème sauvegardé ou détecter le thème système
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Détecter le thème système
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Éviter le flash pendant l'hydration
  if (!mounted) {
    return (
      <div className="fixed top-4 right-20 z-50 w-12 h-12 bg-transparent" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-20 z-50 p-3 glass-nav rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0.8 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === "light" ? (
          <Sun className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
        ) : (
          <Moon className="w-6 h-6 text-blue-400 group-hover:text-blue-500 transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
