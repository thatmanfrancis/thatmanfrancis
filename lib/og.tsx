import { ImageResponse } from "next/og";

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

export function renderOgImage({
  title,
  eyebrow = "thatmanfrancis",
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "52%",
            height: "78%",
            borderTop: "24px solid rgba(255,255,255,0.12)",
            borderLeft: "24px solid rgba(255,255,255,0.12)",
            borderTopLeftRadius: 64,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "38%",
            height: "58%",
            borderTop: "24px solid rgba(255,255,255,0.18)",
            borderLeft: "24px solid rgba(255,255,255,0.18)",
            borderTopLeftRadius: 48,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            width: "72%",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 24,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: title.length > 52 ? 48 : 64,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
