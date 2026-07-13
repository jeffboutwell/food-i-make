import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Food I Make",
    short_name: "Food I Make",
    description: "Personal vegan recipe collection",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml" },
      { src: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
  };
}
