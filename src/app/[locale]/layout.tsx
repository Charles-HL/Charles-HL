import { notFound } from "next/navigation";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import {
  generateSEOMetadata,
  generatePersonSchema,
  generateOrganizationSchema,
} from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import siteConfig from "@/config";
import "../globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return generateSEOMetadata({
    title: t("title"),
    description:
      locale === "fr"
        ? siteConfig.description
        : "Professional portfolio of Charles HILD LÊ, full stack software engineer specializing in artificial intelligence and data science. Freelance and employee at Thales.",
    locale,
    type: "profile",
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const finalTheme = theme || systemTheme;
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <StructuredData
          data={[
            generatePersonSchema(locale),
            generateOrganizationSchema(locale),
          ]}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
