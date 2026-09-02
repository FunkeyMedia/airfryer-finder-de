import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareTool } from "./compare-tool";
import { devices } from "@/lib/products";
export const metadata:Metadata={title:"Airfryer vergleichen",description:"Bis zu vier Airfryer übersichtlich nach Preis, Kapazität, Zonen, Leistung und Bewertung vergleichen.",alternates:{canonical:"/vergleich"}};
export default function ComparePage(){return <><section className="page-hero center"><div className="shell"><span className="eyebrow">Unterschiede auf einen Blick</span><h1>Airfryer direkt vergleichen</h1><p>Wähle bis zu vier Geräte. Wir zeigen vorhandene Angaben und markieren fehlende Werte klar.</p></div></section><Suspense><CompareTool products={devices}/></Suspense></>}
