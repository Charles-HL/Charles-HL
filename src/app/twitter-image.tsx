import { ImageResponse } from "next/og";
import siteConfig from "@/config";
import fs from "fs";
import path from "path";

export const runtime = "edge";

export const alt = `${siteConfig.name} - Full Stack Developer & AI Engineer`;
export const size = {
  width: 800,
  height: 418,
};
export const contentType = "image/png";

export default async function TwitterImage() {
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
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px 50px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "55%",
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
              Full Stack Developer & AI Engineer
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#6b7280",
              }}
            >
              📍 Toulouse, France
            </div>
          </div>

          {/* Profile Image */}
          {profileImageBase64 && (
            <div
              style={{
                display: "flex",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "6px solid #1DA1F2",
                boxShadow: "0 8px 30px rgba(29, 161, 242, 0.4)",
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
