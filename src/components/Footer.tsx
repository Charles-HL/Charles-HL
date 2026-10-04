import { getTranslations } from "next-intl/server";
import { Linkedin, Mail, MapPin } from "lucide-react";
import siteConfig from "@/config";
import { audiences } from "@/content/audiences";
import { Link } from "@/i18n/navigation";

const linkClass = "text-gray-400 transition-colors hover:text-blue-400";

export default async function Footer() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("navigation"),
  ]);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: tNav("home"), href: "/" },
    { label: tNav("projects"), href: "/projects" },
    { label: tNav("ai"), href: "/ai-engineering" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("contact"), href: "/contact" },
    { label: t("quote"), href: "/quote" },
  ] as const;

  return (
    <footer className="relative z-10 bg-gray-900/95 py-14 text-white backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="gradient-text mb-4 text-2xl font-bold">
              {siteConfig.shortName}
            </p>
            <p className="mb-3 max-w-md leading-relaxed text-gray-400">
              {t("brandDescription")}
            </p>
            <p className="mb-5 max-w-md text-sm font-medium text-blue-400">
              {t("tagline")}
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 shrink-0" />
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>

          {/* Audiences: descriptive anchors for internal linking */}
          <nav aria-labelledby="footer-audiences">
            <p id="footer-audiences" className="mb-4 text-lg font-semibold">
              {t("audiencesTitle")}
            </p>
            <ul className="space-y-3">
              {audiences.map((audience) => (
                <li key={audience.id}>
                  <Link href={audience.href} className={linkClass}>
                    {t(`audiences.${audience.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-labelledby="footer-links">
            <p id="footer-links" className="mb-4 text-lg font-semibold">
              {t("linksTitle")}
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {siteConfig.shortName}. {t("rights")}
          </p>
          <p>{t("logosNotice")}</p>
        </div>
      </div>
    </footer>
  );
}
