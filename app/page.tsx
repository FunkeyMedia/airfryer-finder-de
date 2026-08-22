import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, Check, Clock3, CookingPot, Flame, Heart, Search, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { recipes } from "@/data/recipes";
import { categories, devices, topDevices } from "@/lib/products";

const categoryInfo: Record<string, { copy: string; icon: typeof CookingPot }> = {
  "Single-Basket Airfryer": { copy: "Einfach, kompakt und ideal für den Alltag.", icon: CookingPot },
  "Dual-/Multi-Zone Airfryer": { copy: "Zwei Speisen, zwei Temperaturen, gleichzeitig fertig.", icon: SlidersHorizontal },
  "Airfryer-Ofen": { copy: "Viel Platz für Familie, Gäste und große Ideen.", icon: Flame },
  "Glas-Airfryer": { copy: "Behalte dein Essen beim Garen im Blick.", icon: Search },
  "Tower/Stacked Airfryer": { copy: "Mehr Garraum auf besonders kleiner Stellfläche.", icon: BarChart3 },
};

export default function Home() {
  const picks = topDevices(6);
  return (
    <>
      <section className="hero">
        <Image src="/heroes/hero-familie-airfryer.webp" alt="Familie bereitet gemeinsam Essen aus dem Airfryer zu" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="hero-kicker"><Sparkles size={16} /> In 2 Minuten zu deinem Favoriten</div>
            <h1>Der Airfryer, der wirklich zu <em>deinem Leben</em> passt.</h1>
            <p>Kein Technik-Dschungel. Beantworte ein paar einfache Fragen und entdecke Geräte, die zu Haushalt, Kochstil und Budget passen.</p>
            <div className="hero-actions"><Link href="/finder" className="button accent">Finder starten <ArrowRight size={19} /></Link><Link href="/airfryer" className="button glass">213 Geräte ansehen</Link></div>
            <div className="hero-proof"><span><Check size={16} /> Ohne Anmeldung</span><span><Check size={16} /> Transparent erklärt</span><span><Check size={16} /> Kostenlos</span></div>
          </div>
          <div className="finder-peek">
            <div className="peek-top"><span>Dein Schnellstart</span><b>1 von 6</b></div>
            <div className="peek-progress"><i /></div>
            <h2>Für wie viele Personen kochst du?</h2>
            <div className="people-grid"><Link href="/finder"><Users size={23} /><b>1–2</b><span>Klein & kompakt</span></Link><Link href="/finder"><Users size={27} /><b>3–4</b><span>Allrounder</span></Link><Link href="/finder"><Users size={31} /><b>5+</b><span>Familiengröße</span></Link></div>
          </div>
        </div>
      </section>

      <section className="trust-strip"><div className="shell"><span><BadgeCheck /> {devices.length} Geräte analysiert</span><span><BarChart3 /> Vergleichbare Fakten</span><span><Heart /> Für echte Alltagsbedürfnisse</span><span><Clock3 /> Datenstand 22.08.2026</span></div></section>

      <section className="section shell">
        <SectionHeading kicker="Einfach einsteigen" title="Welcher Typ bist du?">Schon die Bauform macht im Alltag einen großen Unterschied. Wähle, was am ehesten zu dir passt.</SectionHeading>
        <div className="category-grid">
          {categories.map((category) => { const info = categoryInfo[category] || { copy: "Entdecke passende Geräte.", icon: CookingPot }; const Icon = info.icon; const count = devices.filter((p) => p.unterkategorie === category).length; return <Link href={`/airfryer?typ=${encodeURIComponent(category)}`} key={category} className="category-card"><span className="category-icon"><Icon /></span><div><h3>{category.replace("Airfryer", "").trim() || "Airfryer"}</h3><p>{info.copy}</p><b>{count} Modelle <ArrowRight size={16} /></b></div></Link>; })}
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell">
          <SectionHeading kicker="Datenbasierte Favoriten" title="Starke Geräte für unterschiedliche Wünsche">Bewertung, Erfahrungsbreite, Datenvollständigkeit und Verfügbarkeit fließen nachvollziehbar in die Einordnung ein.</SectionHeading>
          <div className="product-grid">{picks.map((product, index) => <ProductCard product={product} rank={index + 1} key={product.asin} />)}</div>
          <div className="center-action"><Link href="/airfryer" className="button secondary">Alle 213 Geräte entdecken <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section shell finder-story">
        <div className="story-visual"><Image src="/heroes/hero-paar-date-night-airfryer.webp" alt="Paar genießt einen entspannten Abend mit Essen aus dem Airfryer" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="story-copy"><span className="eyebrow">Einfach passend statt einfach beliebt</span><h2>Deine Küche. Deine Gewohnheiten. Deine Empfehlung.</h2><p>Ein großer Familien-Airfryer ist nicht automatisch besser. Unser Finder gewichtet, was für dich zählt – von Portionsgröße und Budget bis zur Frage, ob zwei Gerichte gleichzeitig fertig sein sollen.</p><ul><li><Check /> 6 kurze Fragen statt endloser Tabellen</li><li><Check /> Jede Empfehlung mit verständlicher Begründung</li><li><Check /> Günstige und kompakte Alternativen inklusive</li></ul><Link href="/finder" className="button accent">Meine Empfehlung finden <ArrowRight size={18} /></Link></div>
      </section>

      <section className="section recipe-section">
        <div className="shell">
          <SectionHeading kicker="Einfach lecker" title="Rezepte, die Lust aufs Ausprobieren machen">Von knusprigen Kartoffeln bis zum kleinen Lava-Cake – mit klaren Zeiten, Temperaturen und Tipps.</SectionHeading>
          <div className="recipe-grid">{recipes.slice(0, 4).map((recipe) => <Link href={`/rezepte/${recipe.slug}`} key={recipe.slug} className="recipe-card"><div><Image src={recipe.image} alt={recipe.title} fill sizes="(max-width: 700px) 90vw, 25vw" /><span>{recipe.category}</span></div><h3>{recipe.title}</h3><p><Clock3 size={16} /> {recipe.prep + recipe.cook} Min. · {recipe.temperature} °C</p></Link>)}</div>
          <div className="center-action"><Link href="/rezepte" className="button secondary">Alle 30 Rezepte <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section shell method-banner"><div><span className="eyebrow">Vertrauen ist wichtiger als ein Siegel</span><h2>Keine erfundenen Tests. Keine gekauften Platzierungen.</h2><p>Wir ordnen öffentlich sichtbare Produktdaten ein und sagen klar, wo Angaben fehlen. Kaufst du über einen gekennzeichneten Amazon-Link, können wir eine Provision erhalten – für dich ändert sich der Preis nicht.</p></div><Link href="/transparenz" className="button light">So arbeiten wir <ArrowRight size={18} /></Link></section>
    </>
  );
}
