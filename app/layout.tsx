import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AirfryerFinder.de – Welcher Airfryer passt zu dir?", template: "%s | AirfryerFinder.de" },
  description: "Finde mit wenigen Fragen den passenden Airfryer. 213 Geräte datenbasiert vergleichen, ehrlich einordnen und leichter entscheiden.",
  alternates: { canonical: "/" },
  openGraph: { title: "AirfryerFinder.de", description: "Dein Weg zum passenden Airfryer.", type: "website", locale: "de_DE", url: "/", images: ["/heroes/hero-familie-airfryer.webp"] },
  twitter: { card: "summary_large_image", title: "AirfryerFinder.de", description: "Dein Weg zum passenden Airfryer.", images: ["/heroes/hero-familie-airfryer.webp"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#073763" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body className={`${manrope.variable} ${sora.variable}`}><a href="#main" className="skip-link">Zum Inhalt springen</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><aside className="affiliate-tracking-note" style={{textAlign:"center",padding:12,fontSize:12}}><a href="/amazon-klickstatistik.html">Amazon-Klickstatistik / Click measurement</a></aside><Script id="affiliate-amazon-tracking" src="/affiliate-amazon-tracking.js" strategy="afterInteractive" /></body></html>;
}
