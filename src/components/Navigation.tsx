"use client";

import { useState, useEffect, useCallback, type ComponentProps } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useParams } from "next/navigation";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { getCtaHref, landingPathnames } from "@/content/audiences";

// Variable globale pour vérifier si l'animation a déjà eu lieu
const animationState = { hasAnimated: false };

type LinkHref = ComponentProps<typeof Link>["href"];

/** Sections present on every landing page, reached by in-page anchors. */
const sectionItems = [{ key: "expertise", sectionId: "expertise" }] as const;

const pageItems = [
  { key: "ai", href: "/ai-engineering" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

type NavKey =
  | (typeof sectionItems)[number]["key"]
  | (typeof pageItems)[number]["key"];

interface NavItem {
  key: NavKey;
  href: LinkHref | `#${string}`;
  isActive: boolean;
}

const landingPaths: string[] = Object.values(landingPathnames);

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

  // Every landing page owns the #expertise section
  const isLandingPage = landingPaths.includes(pathname);
  const ctaHref = getCtaHref(pathname);

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

  // Section active pendant le défilement d'une landing page
  const detectActiveSection = useCallback(() => {
    if (!isLandingPage) return;

    const probe = window.scrollY + 150;
    const current = sectionItems.find(({ sectionId }) => {
      const element = document.getElementById(sectionId);
      return (
        element &&
        element.offsetTop <= probe &&
        element.offsetTop + element.offsetHeight > probe
      );
    });
    setActiveSection(current?.sectionId ?? "");
  }, [isLandingPage]);

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Marquer que l'animation a eu lieu après le premier rendu
    if (shouldAnimate) {
      animationState.hasAnimated = true;
      setShouldAnimate(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldAnimate, detectActiveSection]);

  const navItems: NavItem[] = [
    ...sectionItems.map(({ key, sectionId }) => ({
      key,
      href: isLandingPage
        ? (`#${sectionId}` as const)
        : { pathname: "/" as const, hash: sectionId },
      isActive: isLandingPage && activeSection === sectionId,
    })),
    ...pageItems.map(({ key, href }) => ({
      key,
      href,
      isActive: pathname === href || pathname.startsWith(`${href}/`),
    })),
  ];

  const itemClass = (isActive: boolean, size: "desktop" | "mobile") =>
    `${
      size === "desktop"
        ? "px-3 py-1.5 rounded-xl text-sm min-h-[36px] flex items-center"
        : "block px-3 py-2.5 rounded-lg text-base w-full text-left"
    } font-semibold transition-all duration-200 box-border cursor-pointer border ${
      isActive
        ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 shadow-sm border-blue-200 dark:border-blue-800"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border-transparent"
    }`;

  const renderItem = (item: NavItem, size: "desktop" | "mobile") => {
    const className = itemClass(item.isActive, size);
    const current = item.isActive ? ("true" as const) : undefined;
    const close = () => setIsOpen(false);

    return typeof item.href === "string" && item.href.startsWith("#") ? (
      <a href={item.href} className={className} aria-current={current} onClick={close}>
        {t(item.key)}
      </a>
    ) : (
      <Link
        href={item.href as LinkHref}
        className={className}
        aria-current={item.isActive ? "page" : undefined}
        onClick={close}
      >
        {t(item.key)}
      </Link>
    );
  };

  const themeIcon = theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;

  return (
    <>
      {/* Desktop Navigation - Flottant centré */}
      <motion.nav
        aria-label={t("mainLabel")}
        initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldAnimate ? { duration: 0.6, delay: 0.2 } : { duration: 0 }
        }
        className="hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div
          className={`glass-nav rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-black/10" : ""
          }`}
        >
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Link
              href="/"
              aria-label={`CHL, ${t("home")}`}
              aria-current={pathname === "/" ? "page" : undefined}
              className="mr-2 rounded-xl px-2 py-1.5 text-lg font-bold transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
            >
              <span className="bg-gradient-to-br from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                CHL
              </span>
            </Link>
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.key}>{renderItem(item, "desktop")}</li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer p-2 mx-1 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200"
              aria-label={t("toggleTheme")}
            >
              {mounted ? (
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {themeIcon}
                </motion.div>
              ) : (
                <span className="block w-5 h-5" />
              )}
            </motion.button>

            {/* Call to action - Conversion-focused orange */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={ctaHref}
                className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                {t("cta")}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Pleine largeur */}
      <motion.nav
        aria-label={t("mainLabel")}
        initial={shouldAnimate ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={shouldAnimate ? { duration: 0.6 } : { duration: 0 }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 py-2">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex items-center justify-center min-w-10 h-10"
              aria-label={`CHL, ${t("home")}`}
            >
              <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                CHL
              </span>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-2 pt-2 pb-4 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.key}>{renderItem(item, "mobile")}</li>
                    ))}
                  </ul>

                  {/* Mobile call to action */}
                  <div className="pt-2">
                    <Link
                      href={ctaHref}
                      onClick={() => setIsOpen(false)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white block px-3 py-3 rounded-lg text-base font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-center shadow-lg cursor-pointer"
                    >
                      {t("cta")}
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {/* Mobile Theme Toggle */}
                    <button
                      type="button"
                      onClick={toggleTheme}
                      aria-label={t("toggleTheme")}
                      className="glass-card flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2.5 rounded-lg cursor-pointer"
                    >
                      {mounted && (
                        <>
                          {themeIcon}
                          <span className="text-sm font-medium">
                            {theme === "light" ? t("themeLight") : t("themeDark")}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Mobile Language Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        toggleLanguage();
                        setIsOpen(false);
                      }}
                      aria-label={t("switchLanguage")}
                      className="glass-card flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-3 py-2.5 rounded-lg cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {locale === "fr" ? "EN" : "FR"}
                      </span>
                    </button>
                  </div>
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
