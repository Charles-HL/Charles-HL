import { ImageResponse } from "next/og";
import siteConfig from "@/config";

export const runtime = "edge";

export const alt = siteConfig.name;
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
          fontSize: 48,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Full Stack Developer & AI Engineer
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 20,
            opacity: 0.9,
          }}
        >
          {siteConfig.domain}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
