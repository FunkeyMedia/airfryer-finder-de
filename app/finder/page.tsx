import type { Metadata } from "next";
import { Finder } from "./finder";
import { devices } from "@/lib/products";

export const metadata: Metadata = { title: "Airfryer-Finder", description: "Beantworte sechs einfache Fragen und erhalte passende Airfryer-Empfehlungen mit verständlicher Begründung." };

export default function FinderPage() {
  return <><section className="page-hero center"><div className="shell"><span className="eyebrow">Deine Küche, deine Empfehlung</span><h1>Welcher Airfryer passt zu dir?</h1><p>Sechs kurze Fragen. Keine Anmeldung. Eine nachvollziehbare Auswahl aus 213 Geräten.</p></div></section><Finder products={devices} /></>;
}
