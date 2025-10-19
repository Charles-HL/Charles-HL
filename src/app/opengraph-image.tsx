import { ImageResponse } from "next/og";
import siteConfig from "@/config";

export const runtime = "edge";

export const alt = `${siteConfig.name} - D\u00e9veloppeur Web Freelance & Ing\u00e9nieur Full Stack`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "30px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                color: "transparent",
                marginBottom: 20,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 38,
                color: "#374151",
                marginBottom: 15,
                lineHeight: 1.3,
              }}
            >
              D\u00e9veloppeur Web Freelance & Ing\u00e9nieur Full Stack
            </div>
            <div
              style={{
                fontSize: 32,
                color: "#6b7280",
                marginBottom: 15,
              }}
            >
              Applications Web Sur Mesure | IA & Data Science
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#9ca3af",
              }}
            >
              \ud83d\udccd Toulouse, France | {siteConfig.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
