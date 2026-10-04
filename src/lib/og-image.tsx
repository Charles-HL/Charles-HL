import { ImageResponse } from "next/og";
import siteConfig from "@/config";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

interface OgImageOptions {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** Open Graph card on the site's gradient, shared by every route segment. */
export function renderOgImage({ eyebrow, title, subtitle }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #059669 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "56px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.96)",
            borderRadius: "32px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow && (
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#2563EB",
                  marginBottom: 24,
                }}
              >
                {eyebrow}
              </div>
            )}
            <div
              style={{
                fontSize: title.length > 60 ? 50 : 60,
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#0F172A",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 30,
                  lineHeight: 1.35,
                  color: "#475569",
                  marginTop: 24,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              color: "#64748B",
            }}
          >
            <span style={{ fontWeight: 700, color: "#059669" }}>{siteConfig.name}</span>
            <span>{`${siteConfig.domain} · ${siteConfig.location}`}</span>
          </div>
        </div>
      </div>
    ),
    ogImageSize
  );
}
