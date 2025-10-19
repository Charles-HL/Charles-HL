"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

// Variable globale pour vérifier si l'animation a déjà eu lieu
const animationState = { hasAnimated: false };

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [shouldAnimate, setShouldAnimate] = useState(
    !animationState.hasAnimated
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Check if we're on the home page
  const isHomePage = pathname === "/";

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      // Fermer le menu mobile immédiatement
      setIsOpen(false);

      // Petit délai pour que le menu se ferme avant le scroll
      setTimeout(() => {
        // Calcul de l'offset selon la taille de l'écran
        // Desktop: header flottant de ~80px + padding
        // Mobile: header fixe de ~48px + padding
        const isMobile = window.innerWidth < 1024;
        const headerOffset = isMobile ? 60 : 100; // Ajustement pour mobile vs desktop

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        // Mettre à jour l'URL dans la barre d'adresse
        const newUrl = `${window.location.pathname}#${sectionId}`;
        window.history.pushState(null, "", newUrl);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 300); // Délai pour la fermeture du menu
    }
  };

  // Fonction pour détecter la section active
  const detectActiveSection = useCallback(() => {
    if (!isHomePage) return;

    const sections = ["hero", "about", "experience", "projects", "contact"];
    const scrollPosition = window.scrollY + 150; // Offset pour la détection

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, [isHomePage]);

  // Fonction pour vérifier si un élément de navigation est actif
  const isActiveItem = (item: (typeof navItems)[0]) => {
    if (item.anchor && isHomePage) {
      const sectionId = item.anchor.replace("#", "");
      return activeSection === sectionId;
    }
    return pathname === item.href;
  };

  useEffect(() => {
    setMounted(true);

    // Initialiser le thème
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      detectActiveSection();
    };

    window.addEventListener("scroll", handleScroll);

    // Initialiser la section active et détecter au chargement
    if (isHomePage) {
      // Petit délai pour s'assurer que les éléments sont rendus
      setTimeout(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          setActiveSection(hash);
        } else {
          detectActiveSection();
        }
      }, 100);
    }

    // Marquer que l'animation a eu lieu après le premier rendu
    if (shouldAnimate) {
      animationState.hasAnimated = true;
      setShouldAnimate(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldAnimate, isHomePage, detectActiveSection]);

  const navItems = [
    {
      key: "home" as const,
      href: "/" as const,
      anchor: isHomePage ? "#hero" : undefined,
    },
    {
      key: "about" as const,
      href: "/about" as const,
      anchor: isHomePage ? "#about" : undefined,
    },
    {
      key: "experience" as const,
      href: "/experience" as const,
      anchor: isHomePage ? "#experience" : undefined,
    },
    {
      key: "projects" as const,
      href: "/projects" as const,
      anchor: isHomePage ? "#projects" : undefined,
    },
    {
      key: "contact" as const,
      href: "/contact" as const,
      anchor: isHomePage ? "#contact" : undefined,
    },
  ];

  return (
    <>
      {/* Desktop Navigation - Flottant centré */}
      <motion.nav
        initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldAnimate ? { duration: 0.6, delay: 0.2 } : { duration: 0 }
        }
        className="hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div
          className={`glass-nav rounded-2xl px-8 py-3 transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-black/10" : ""
          }`}
        >
          <div className="flex items-center space-x-8 whitespace-nowrap">
            {navItems.map((item) => (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.anchor ? (
                  <button
                    onClick={() =>
                      scrollToSection(item.anchor!.replace("#", ""))
                    }
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 box-border min-h-[36px] flex items-center cursor-pointer ${
                      isActiveItem(item)
                        ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 shadow-sm border border-blue-200 dark:border-blue-800"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border border-transparent"
                    }`}
                  >
                    {t(item.key)}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 box-border min-h-[36px] flex items-center cursor-pointer ${
                      isActiveItem(item)
                        ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 shadow-sm border border-blue-200 dark:border-blue-800"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border border-transparent"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {mounted && (
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === "dark" ? 180 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {theme === "light" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              )}
            </motion.button>

            {/* Quote Button - Conversion-focused orange */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quote"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                {t("quote")}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Pleine largeur comme avant */}
      <motion.nav
        initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={shouldAnimate ? { duration: 0.6 } : { duration: 0 }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 py-2">
            {/* Mobile Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Link href="/" className="block">
                <div className="flex items-center justify-center w-8 h-8">
                  <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    CHL
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 glass-nav rounded-lg mt-2">
                  {navItems.map((item) =>
                    item.anchor ? (
                      <motion.button
                        key={item.key}
                        type="button"
                        whileHover={{ x: 5 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const sectionId = item.anchor!.replace("#", "");
                          scrollToSection(sectionId);
                        }}
                        className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 w-full text-left box-border cursor-pointer ${
                          isActiveItem(item)
                            ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border border-transparent"
                        }`}
                      >
                        {t(item.key)}
                      </motion.button>
                    ) : (
                      <motion.div key={item.key} whileHover={{ x: 5 }}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 box-border cursor-pointer ${
                            isActiveItem(item)
                              ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800"
                              : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border border-transparent"
                          }`}
                        >
                          {t(item.key)}
                        </Link>
                      </motion.div>
                    )
                  )}

                  {/* Mobile Quote Button - Conversion-focused */}
                  <motion.div whileHover={{ x: 5 }} className="pt-2">
                    <Link
                      href="/quote"
                      onClick={() => setIsOpen(false)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white block px-3 py-3 rounded-lg text-base font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-center shadow-lg cursor-pointer"
                    >
                      {t("quote")}
                    </Link>
                  </motion.div>

                  {/* Mobile Theme Toggle */}
                  <motion.div whileHover={{ x: 5 }} className="pt-2">
                    <motion.button
                      onClick={() => {
                        toggleTheme();
                      }}
                      className="glass-card flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 w-full cursor-pointer"
                    >
                      {mounted && (
                        <>
                          {theme === "light" ? (
                            <Sun className="w-4 h-4" />
                          ) : (
                            <Moon className="w-4 h-4" />
                          )}
                          <span className="text-base font-medium">
                            {theme === "light" ? "Light" : "Dark"}
                          </span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Mobile Language Toggle */}
                  <motion.div whileHover={{ x: 5 }} className="pt-2">
                    <motion.button
                      onClick={() => {
                        toggleLanguage();
                        setIsOpen(false);
                      }}
                      className="glass-card flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 w-full cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-base font-medium">
                        {locale.toUpperCase()}
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
