import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
export const metadata: Metadata = { title: "Airfryer-Ratgeber", description: "Sechs Hilfen zu Airfryer-Größe, Garzonen, Reinigung, Energievergleich, erster Nutzung und Zubehör.", alternates: { canonical: "/ratgeber" } };
export default function GuidesPage() {
  return <><section className="guide-hero"><div className="shell"><div>
    <span className="eyebrow">Wissen ohne Fachchinesisch</span><h1>Besser verstehen. Sicherer entscheiden.</h1>
    <p>Prüfschritte für deine Küche und deinen Alltag, mit nachvollziehbaren Herstellerquellen.</p>
  </div><Image src="/heroes/hero-mehrgenerationen-airfryer.webp" alt="Mehrere Generationen kochen gemeinsam mit dem Airfryer" width={1920} height={1080} /></div></section>
  <section className="inner-section shell"><div className="guide-grid">{guides.map(guide => <article key={guide.slug}>
    <span><BookOpen /></span><h2>{guide.title}</h2><p>{guide.description}</p>
    <Link href={`/ratgeber/${guide.slug}`}>Ratgeber lesen <ArrowRight /></Link>
  </article>)}</div><div className="guide-long"><h2>Dein Alltag entscheidet</h2>
    <p>Wähle zuerst die Mahlzeit, die du regelmäßig zubereitest, und miss den verfügbaren Platz. Vergleiche dann passende Geräte anhand ihrer belegten Angaben. Eine lange Programmliste oder eine große Literzahl allein beweist keine Eignung.</p>
    <p><Link href="/finder">Deine Auswahl im Finder eingrenzen</Link></p>
  </div></section></>;
}
