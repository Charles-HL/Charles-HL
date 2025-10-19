import { ImageResponse } from "next/og";
import siteConfig from "@/config";

export const runtime = "edge";

export const alt = `${siteConfig.name} - Développeur Web Freelance & Ingénieur Full Stack`;
export const size = {
  width: 800,
  height: 418,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1DA1F2 0%, #1991DA 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 50px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
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
                fontSize: 48,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #1DA1F2 0%, #1991DA 100%)",
                backgroundClip: "text",
                color: "transparent",
                marginBottom: 12,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#374151",
                marginBottom: 10,
                lineHeight: 1.2,
              }}
            >
              Développeur Web Freelance & Ingénieur Full Stack
            </div>
            <div
              style={{
                fontSize: 20,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              Applications Web Sur Mesure | IA & Data Science
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#9ca3af",
              }}
            >
              📍 Toulouse, France
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
