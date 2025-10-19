import { ImageResponse } from "next/og";
import siteConfig from "@/config";
import fs from "fs";
import path from "path";

export const runtime = "edge";

export const alt = `${siteConfig.name} - Full Stack Developer & AI Engineer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Charger l'image de profil
  const profileImagePath = path.join(
    process.cwd(),
    "public",
    "charles-hl-profile.jpg"
  );
  let profileImageBase64 = "";

  try {
    const imageBuffer = fs.readFileSync(profileImagePath);
    profileImageBase64 = `data:image/jpeg;base64,${imageBuffer.toString(
      "base64"
    )}`;
  } catch (error) {
    console.error("Error loading profile image:", error);
  }

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
            alignItems: "center",
            justifyContent: "space-between",
            padding: "60px 80px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "60%",
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
              Full Stack Developer & AI Engineer
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#6b7280",
              }}
            >
              {siteConfig.domain}
            </div>
          </div>

          {/* Profile Image */}
          {profileImageBase64 && (
            <div
              style={{
                display: "flex",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "8px solid #667eea",
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
              }}
            >
              <img
                src={profileImageBase64}
                alt={siteConfig.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
