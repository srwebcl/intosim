import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Reveal, revealBootScript } from "@/components/reveal";

export const metadata: Metadata = {
  title: { default: "INTOSIM | Soluciones en Geoinformación", template: "%s | INTOSIM" },
  description: "Servicios técnicos de topografía, geología, geodesia, aerofotogrametría y batimetría para minería, ingeniería y construcción.",
  metadataBase: new URL("https://www.intosim.cl"),
  openGraph: { type: "website", locale: "es_CL", siteName: "INTOSIM", title: "INTOSIM | Soluciones en Geoinformación", description: "Servicios técnicos para proyectos de minería, ingeniería y construcción." }
};
// Fuentes servidas desde el propio sitio (sin solicitudes a Google en cada visita)
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dmsans", display: "swap" });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: revealBootScript }} /></head><body><SiteHeader />{children}<SiteFooter /><Reveal /></body></html>;
}