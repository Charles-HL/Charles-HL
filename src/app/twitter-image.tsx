import { ImageResponse } from "next/og";
import siteConfig from "@/config";

export const runtime = "edge";

export const alt = siteConfig.name;
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
          fontSize: 40,
          background: "linear-gradient(135deg, #1DA1F2 0%, #1991DA 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Full Stack Developer & AI Engineer
        </div>
        <div
          style={{
            fontSize: 20,
            marginTop: 16,
            opacity: 0.9,
          }}
        >
          📧 {siteConfig.email} | 📍 Toulouse, France
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
