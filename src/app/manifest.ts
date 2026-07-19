import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Foundry4 | Technology, Creativity, Data & Marketing",
    short_name: "Foundry4",
    description:
      "Foundry4 builds custom websites, mobile apps, Power BI dashboards, runs Meta & Google Ads campaigns, and implements AI automation for businesses in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#050012",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
