import { MetadataRoute } from "next";
import siteConfig from "@/config";

/** AI search crawlers may cite the site in generative answers. */
const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot"];

/** Crawlers collecting training data stay blocked (to be confirmed, see memory/STATE.md). */
const AI_TRAINING_BOTS = ["GPTBot", "CCBot", "anthropic-ai"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_SEARCH_BOTS,
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_TRAINING_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
