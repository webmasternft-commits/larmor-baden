import { ImageResponse } from "next/og";

export const alt = "Larmor-Baden — Guide touristique complet du Golfe du Morbihan, Bretagne Sud : Cairn de Gavrinis, Île Berder, GR34, randonnées et activités";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 20 }}>⚓</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Larmor-Baden
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Guide touristique du Golfe du Morbihan
        </div>
        <div
          style={{
            fontSize: 18,
            opacity: 0.7,
            marginTop: 24,
            display: "flex",
            gap: 20,
          }}
        >
          <span>🏛️ Cairn de Gavrinis</span>
          <span>•</span>
          <span>🏝️ Île Berder</span>
          <span>•</span>
          <span>🥾 GR34</span>
          <span>•</span>
          <span>⛵ Île aux Moines</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            opacity: 0.5,
          }}
        >
          larmor-baden.com
        </div>
      </div>
    ),
    { ...size },
  );
}
