import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Roman Deyneko — Lead Hardware & Full-Stack Architect",
    short_name: "Roman Deyneko",
    description:
      "Personal engineering portfolio of Roman Deyneko: CTO, Lead Hardware, Embedded Systems & Full-Stack Architect.",
    start_url: "/",
    display: "standalone",
    background_color: "#11100e",
    theme_color: "#11100e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
