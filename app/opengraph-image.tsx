import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fdfdfc",
          color: "#18181b",
          padding: "96px",
        }}
      >
        <div style={{ fontSize: 76, letterSpacing: "-0.03em" }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 16, fontSize: 44, color: "#71717a" }}>
          {profile.role}
        </div>
        <div
          style={{
            marginTop: 56,
            height: 1,
            width: 240,
            background: "#d6d3d1",
          }}
        />
        <div style={{ marginTop: 40, fontSize: 30, color: "#71717a" }}>
          {`${profile.location} · React, Next.js, Node`}
        </div>
      </div>
    ),
    size,
  );
}
