import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#fff",
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            fontSize: 160,
            fontWeight: 900,
            lineHeight: 1,
            padding: 48,
          }}
        >
          SYSTEM FAILURE SYSTEM FAILURE SYSTEM FAILURE
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 64,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.75 }}>
            ZERO POINT
          </div>
          <div>Farid Kanaani</div>
          <div style={{ fontSize: 22, fontWeight: 500, opacity: 0.85 }}>
            A digital manifesto of code and art.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
