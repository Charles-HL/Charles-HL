import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import siteConfig from "@/config";

export const metadata: Metadata = generateSEOMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  type: "website",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
