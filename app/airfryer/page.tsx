import type { Metadata } from "next";
import { ProductExplorer } from "./product-explorer";
import { devices } from "@/lib/products";

export const metadata: Metadata = { title: "213 Airfryer im Vergleich", description: "Alle Airfryer filtern, sortieren und anhand verständlicher Produktdaten vergleichen.", alternates: { canonical: "/airfryer" } };
export default function AirfryerOverview() { return <><section className="page-hero"><div className="shell"><span className="eyebrow">Der große Überblick</span><h1>213 Airfryer. Klar vergleichbar.</h1><p>Filtere nach Preis, Größe, Bauform und Bewertung. Fehlende Angaben bleiben sichtbar – damit du weißt, worauf deine Entscheidung beruht.</p></div></section><ProductExplorer products={devices}/></>; }
