"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Code, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t("navigation.about"), href: "/about" as const },
    { name: t("navigation.experience"), href: "/experience" as const },
    { name: t("navigation.projects"), href: "/projects" as const },
    { name: t("navigation.contact"), href: "/contact" as const },
    { name: t("navigation.quote"), href: "/quote" as const },
  ];

  const services = [
    t("footer.services.customApps"),
    t("footer.services.websites"),
    t("footer.services.tools"),
    t("footer.services.automation"),
    t("footer.services.fullstack"),
    t("footer.services.ai"),
    t("footer.services.backend"),
    t("footer.services.consulting"),
  ];

  return (
    <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Charles HL
            </h3>
            <p className="text-gray-400 mb-3 leading-relaxed">
              {t("footer.brand.description")}
            </p>
            <p className="text-sm text-blue-400 mb-4 font-medium">
              {t("footer.brand.tagline")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <a
                  href="mailto:contact@charleshl.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t("footer.brand.email")}
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{t("footer.brand.location")}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.services.title")}
            </h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service, idx) => (
                <li key={idx} className="text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Charles HL. {t("footer.rights")}.
            </p>

            <div className="flex items-center text-gray-400 text-sm">
              <span>{t("footer.madeWith")}</span>
              <Heart
                className="w-4 h-4 mx-2 text-red-500"
                fill="currentColor"
              />
              <span>{t("footer.and")}</span>
              <Code className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
