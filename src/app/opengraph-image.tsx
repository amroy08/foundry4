import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Foundry4 — Technology, Creativity, Data & Marketing Solutions India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#050012",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "20%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-1px",
              }}
            >
              Foundry
            </span>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "-1px",
              }}
            >
              4
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "18px",
              color: "#94a3b8",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "8px 20px",
            }}
          >
            foundry4.in
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.3,
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          Technology, Creativity, Data & Marketing — Built Around Your Business.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            color: "#94a3b8",
            lineHeight: 1.6,
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          Custom websites, mobile apps, Power BI dashboards, Meta & Google Ads,
          AI automation — all from one team in India.
        </div>

        {/* Service pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {["Software", "Creative", "Marketing", "Data", "AI"].map(
            (label) => (
              <div
                key={label}
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "24px",
                  padding: "8px 20px",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
