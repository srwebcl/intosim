import type { MetadataRoute } from "next";
import { services } from "@/lib/content";

const base = "https://www.intosim.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/nosotros", "/servicios", "/proyectos", "/contacto", "/trabaja-con-nosotros"];
  return [
    ...pages.map(p => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map(s => ({ url: `${base}/servicios/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
