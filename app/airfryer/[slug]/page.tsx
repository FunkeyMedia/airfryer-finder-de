import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  ExternalLink,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { recipes } from "@/data/recipes";
import {
  dataCompleteness,
  devices,
  editorialScore,
  formatNumber,
  formatPrice,
  getProductBySlug,
  householdLabel,
  productImage,
  productSlug,
  type Product,
} from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

const recipeProfiles = {
  compact: ["kichererbsen-crunch", "garnelen-knoblauch", "camembert"],
  dual: ["saftige-haehnchenbrust", "knusprige-kartoffelspalten", "parmesan-brokkoli"],
  glass: ["ratatouille", "lachs-mit-zitrone", "apfel-zimt-ringe"],
  large: ["haehnchenschenkel", "ofengemuese", "pizza-baguettes"],
  oven: ["pizza-baguettes", "bananen-hafer-muffins", "haehnchenschenkel"],
  standard: ["knusprige-kartoffelspalten", "lachs-mit-zitrone", "parmesan-brokkoli"],
} as const;

function productName(product: Product) {
  if (product.modellcode) return `${product.marke} ${product.modellcode}`;
  const title = product.titel.replace(/\s+/g, " ").trim();
  return title.length > 82 ? `${title.slice(0, 79).trim()}…` : title;
}

function shorten(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || value.slice(0, maxLength - 1).trim()}…`;
}

function recipeIdeas(product: Product) {
  let profile: keyof typeof recipeProfiles = "standard";
  if (product.unterkategorie === "Airfryer-Ofen") profile = "oven";
  else if (product.unterkategorie === "Glas-Airfryer") profile = "glass";
  else if ((product.zonen ?? 0) > 1 || product.unterkategorie.includes("Zone") || product.unterkategorie.includes("Stacked")) profile = "dual";
  else if (product.kapazitaetL && product.kapazitaetL < 4) profile = "compact";
  else if (product.kapazitaetL && product.kapazitaetL >= 7) profile = "large";

  return recipeProfiles[profile]
    .map((slug) => recipes.find((recipe) => recipe.slug === slug))
    .filter((recipe): recipe is (typeof recipes)[number] => Boolean(recipe));
}

function buildAnswers(product: Product, name: string) {
  const household = householdLabel(product.kapazitaetL).toLowerCase();
  const sizeAnswer = product.kapazitaetL
    ? `Der angegebene Garraum umfasst ${product.kapazitaetL} Liter. Damit ordnen wir das Modell als Lösung für ${household} ein. Die tatsächlich nutzbare Portion hängt zusätzlich von Korbform und Gericht ab.`
    : "Eine belastbare Literangabe fehlt in unserer Datenbasis. Für die Kaufentscheidung solltest du deshalb die Innenmaße und die Herstellerangabe zur Portionsgröße zusätzlich prüfen.";
  const zoneAnswer = product.zonen && product.zonen > 1
    ? `${name} ist mit ${product.zonen} Garzonen erfasst. Das ist vor allem praktisch, wenn Hauptgericht und Beilage unterschiedliche Garzeiten benötigen und möglichst gleichzeitig fertig werden sollen.`
    : `${name} ist als ${product.unterkategorie.toLowerCase()} erfasst. Die klassische Anordnung eignet sich für unkomplizierte Einzelgerichte, Snacks und Beilagen; für mehrere Speisen sind gegebenenfalls zwei Durchgänge nötig.`;
  const decisionAnswer = `Das Gerät kann zu dir passen, wenn du ${household} versorgen möchtest und eine ${product.unterkategorie.toLowerCase()} suchst. Unsere Einschätzung ist ein transparenter Datencheck, kein eigener Praxistest: fehlende Merkmale und Grenzen bleiben sichtbar.`;

  return { household, sizeAnswer, zoneAnswer, decisionAnswer };
}

export function generateStaticParams() {
  return devices.map((product) => ({ slug: productSlug(product) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug, devices);
  if (!product) return {};

  const name = productName(product);
  const seoName = shorten(name, 32);
  const description = shorten(
    `${seoName} im Datencheck: ${product.kapazitaetL ? `${product.kapazitaetL} Liter, ` : ""}${product.zonen ? `${product.zonen} Garzonen, ` : ""}Eignung, Stärken, Grenzen, Preis und 3 passende Airfryer-Rezepte.`,
    155,
  );

  return {
    title: `${seoName}: Datencheck & Rezepte`,
    description,
    alternates: { canonical: `/airfryer/${slug}` },
    openGraph: {
      title: `${seoName}: Datencheck und passende Rezepte`,
      description,
      type: "website",
      images: [{ url: productImage(product), alt: product.titel }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoName}: Datencheck und passende Rezepte`,
      description,
      images: [productImage(product)],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug, devices);
  if (!product) notFound();

  const name = productName(product);
  const ideas = recipeIdeas(product);
  const answers = buildAnswers(product, name);
  const alternatives = devices
    .filter((candidate) => candidate.asin !== product.asin && candidate.unterkategorie === product.unterkategorie)
    .sort(
      (a, b) =>
        Math.abs((a.preisEUR ?? 120) - (product.preisEUR ?? 120)) -
        Math.abs((b.preisEUR ?? 120) - (product.preisEUR ?? 120)),
    )
    .slice(0, 3);
  const facts = [
    ["Kapazität", product.kapazitaetL ? `${product.kapazitaetL} Liter` : "Keine verlässliche Angabe"],
    ["Garzonen", product.zonen ? String(product.zonen) : "Keine verlässliche Angabe"],
    ["Leistung", product.leistungW ? `${product.leistungW} Watt` : "Keine verlässliche Angabe"],
    ["Programme", product.programme ? String(product.programme) : "Keine verlässliche Angabe"],
    ["Max. Temperatur", product.maxTempC ? `${product.maxTempC} °C` : "Keine verlässliche Angabe"],
    ["Bauform", product.unterkategorie],
  ];
  const canonical = `https://airfryer-finder-de.vercel.app/airfryer/${slug}`;
  const productDescription = `${name} ist als ${product.unterkategorie} mit einer Eignung für ${answers.household} eingeordnet. Die Seite fasst belegte Produktdaten, Grenzen, Alternativen und passende Airfryer-Rezepte zusammen.`;
  const additionalProperty = [
    product.kapazitaetL ? { "@type": "PropertyValue", name: "Kapazität", value: `${product.kapazitaetL} Liter` } : null,
    product.zonen ? { "@type": "PropertyValue", name: "Garzonen", value: product.zonen } : null,
    product.leistungW ? { "@type": "PropertyValue", name: "Leistung", value: `${product.leistungW} Watt` } : null,
    product.programme ? { "@type": "PropertyValue", name: "Programme", value: product.programme } : null,
    product.maxTempC ? { "@type": "PropertyValue", name: "Maximale Temperatur", value: `${product.maxTempC} °C` } : null,
  ].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: product.titel,
        description: productDescription,
        image: [`https://airfryer-finder-de.vercel.app${productImage(product)}`],
        sku: product.asin,
        category: product.unterkategorie,
        brand: { "@type": "Brand", name: product.marke },
        additionalProperty,
        aggregateRating:
          product.bewertung && product.anzahlBewertungen
            ? {
                "@type": "AggregateRating",
                ratingValue: product.bewertung,
                reviewCount: product.anzahlBewertungen,
              }
            : undefined,
        offers: product.preisEUR
          ? {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: product.preisEUR,
              availability: product.verfuegbar ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: product.affiliateUrl,
            }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: "https://airfryer-finder-de.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Airfryer", item: "https://airfryer-finder-de.vercel.app/airfryer" },
          { "@type": "ListItem", position: 3, name, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="product-detail-hero">
        <div className="shell">
          <div className="breadcrumbs">
            <Link href="/">Start</Link>
            <ChevronRight />
            <Link href="/airfryer">Airfryer</Link>
            <ChevronRight />
            <span>{name}</span>
          </div>
          <div className="detail-grid">
            <div className="detail-image">
              <span className="detail-score">
                <b>{editorialScore(product)}</b>
                <small>von 100</small>
              </span>
              <Image src={productImage(product)} alt={product.titel} fill priority loading="eager" sizes="(max-width:800px) 94vw, 50vw" />
            </div>
            <div className="detail-copy">
              <span className="eyebrow">{product.unterkategorie}</span>
              <h1>{name}</h1>
              <p className="product-full-title">{product.titel}</p>
              <div className="detail-rating">
                <span><Star fill="currentColor" /> <b>{product.bewertung?.toFixed(1) || "–"}</b> aus {formatNumber(product.anzahlBewertungen)} Amazon-Bewertungen</span>
                <span><BadgeCheck /> {dataCompleteness(product)}% Datenvollständigkeit</span>
              </div>
              <div className="quick-verdict">
                <b>Unsere datenbasierte Einschätzung</b>
                <p>
                  {product.kapazitaetL ? `Mit ${product.kapazitaetL} Litern ist dieses Modell besonders für ${answers.household} interessant. ` : ""}
                  {product.zonen && product.zonen > 1 ? `Die ${product.zonen} Garzonen erleichtern paralleles Zubereiten. ` : ""}
                  {product.kurzbeschreibung || "Die vorhandenen Produktdaten sprechen für einen vielseitigen Einsatz im Alltag."}
                </p>
              </div>
              <div className="price-panel">
                <div><span>Erfasster Preis</span><strong>{formatPrice(product.preisEUR)}</strong><small>Momentaufnahme vom 22.08.2026</small></div>
                <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="button affiliate-button">
                  Preis bei Amazon prüfen <ExternalLink size={18} />
                </a>
              </div>
              <p className="affiliate-note">Affiliate-Link: Bei einem Kauf können wir eine Provision erhalten. Für dich bleibt der Preis gleich.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-section shell">
        <div className="content-columns">
          <article className="editorial-content">
            <section>
              <h2>Passt zu dir, wenn …</h2>
              <ul className="check-list">
                <li><Check /> du ein Gerät für <b>{householdLabel(product.kapazitaetL)}</b> suchst.</li>
                {product.zonen && product.zonen > 1 ? <li><Check /> du Beilagen und Hauptgericht parallel zubereiten möchtest.</li> : <li><Check /> du eine unkomplizierte Korblösung bevorzugst.</li>}
                <li><Check /> dir eine breite Bewertungsbasis wichtig ist{product.anzahlBewertungen ? ` (${formatNumber(product.anzahlBewertungen)} Bewertungen)` : ""}.</li>
              </ul>
            </section>
            <section>
              <h2>Eher nicht ideal, wenn …</h2>
              <ul className="warning-list">
                <li><CircleAlert /> du nur anhand eines praktischen Labortests entscheiden möchtest – unsere Einordnung basiert auf Produktdaten.</li>
                {!product.leistungW && <li><CircleAlert /> eine bestätigte Wattzahl für dich unverzichtbar ist; hierzu fehlt eine verlässliche Angabe.</li>}
                {product.preisEUR && product.preisEUR > 150 && <li><CircleAlert /> dein Budget klar unter 150 € liegt.</li>}
              </ul>
            </section>
            <section>
              <h2>Technische Daten im Überblick</h2>
              <div className="fact-table">{facts.map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>)}</div>
            </section>

            <section className="geo-answer-section" aria-labelledby="kaufberatung-title">
              <span className="eyebrow">Kurz und konkret beantwortet</span>
              <h2 id="kaufberatung-title">{name}: Größe, Nutzung und Kaufentscheidung</h2>
              <div className="geo-answer-list">
                <div><h3>Für wie viele Personen eignet sich {name}?</h3><p><strong>Kurzantwort:</strong> {answers.sizeAnswer}</p></div>
                <div><h3>Was bedeutet die Bauform im Alltag?</h3><p><strong>Kurzantwort:</strong> {answers.zoneAnswer}</p></div>
                <div><h3>Ist {name} eine gute Wahl?</h3><p><strong>Kurzantwort:</strong> {answers.decisionAnswer}</p></div>
              </div>
            </section>

            <section className="product-faq" aria-labelledby="faq-title">
              <h2 id="faq-title">Häufige Fragen zu {name}</h2>
              <details>
                <summary>Welche Gerichte passen zu diesem Airfryer?</summary>
                <p>Für den Einstieg eignen sich {ideas.map((recipe) => recipe.title).join(", ")}. Wichtig ist, den Korb nicht zu überfüllen und Zeit sowie Temperatur an Menge und Geräteleistung anzupassen.</p>
              </details>
              <details>
                <summary>Wie belastbar ist die Bewertung auf dieser Seite?</summary>
                <p>Die angezeigte Sternebewertung stammt aus den erfassten Amazon-Produktdaten. Unser Orientierungsscore berücksichtigt zusätzlich Bewertungsanzahl, Verfügbarkeit und Datenvollständigkeit; er ist keine eigene Testnote.</p>
              </details>
              <details>
                <summary>Worauf sollte ich vor dem Kauf noch achten?</summary>
                <p>Prüfe den aktuell verfügbaren Preis, die Außenmaße, den Lieferumfang und ob Korbgröße sowie Zahl der Garzonen zu deinem Alltag passen. Fehlende Angaben kennzeichnen wir offen statt sie zu schätzen.</p>
              </details>
            </section>

            <section className="method-inline">
              <ShieldCheck />
              <div>
                <h3>So ist diese Einschätzung entstanden</h3>
                <p>Wir haben keine Nutzungserfahrung erfunden. Fehlende Daten bleiben als fehlend sichtbar; unsere Einordnung leitet sich aus den vorliegenden Produktmerkmalen ab.</p>
                <Link href="/transparenz">Methodik ansehen <ArrowRight /></Link>
              </div>
            </section>
          </article>

          <aside className="sticky-summary">
            <h2>Auf einen Blick</h2>
            <div><Users /><span>Geeignet für</span><b>{householdLabel(product.kapazitaetL)}</b></div>
            <div><Star /><span>Amazon-Bewertung</span><b>{product.bewertung?.toFixed(1) || "–"} / 5</b></div>
            <div><BadgeCheck /><span>Datenvollständigkeit</span><b>{dataCompleteness(product)}%</b></div>
            <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="button affiliate-button">Bei Amazon ansehen <ExternalLink /></a>
            <Link href={`/vergleich?ids=${product.asin}`} className="button secondary">Mit anderen vergleichen</Link>
          </aside>
        </div>
      </section>

      <section className="section product-recipe-section">
        <div className="shell">
          <div className="section-heading">
            <span>Direkt ausprobieren</span>
            <h2>3 passende Rezeptideen für {name}</h2>
            <p>Diese Auswahl passt zur erfassten Bauform und Größe. Auf der Rezeptseite findest du Zutaten, Temperatur, Garzeit und eine klare Schritt-für-Schritt-Anleitung.</p>
          </div>
          <div className="recipe-grid product-recipe-grid">
            {ideas.map((recipe) => (
              <Link href={`/rezepte/${recipe.slug}`} className="recipe-card" key={recipe.slug}>
                <div>
                  <Image src={recipe.image} alt={`${recipe.title} im Airfryer-Korb`} fill sizes="(max-width:650px) 92vw, (max-width:980px) 46vw, 33vw" />
                  <span>{recipe.category}</span>
                </div>
                <h3>{recipe.title}</h3>
                <p><Clock3 size={16} /> {recipe.prep + recipe.cook} Min. · {recipe.temperature} °C · {recipe.diet}</p>
              </Link>
            ))}
          </div>
          <Link href="/rezepte" className="product-recipe-link">Alle Airfryer-Rezepte ansehen <ArrowRight /></Link>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell">
          <div className="section-heading"><span>Ähnliche Bauform</span><h2>Diese Alternativen könnten ebenfalls passen</h2></div>
          <div className="product-grid">{alternatives.map((candidate) => <ProductCard product={candidate} key={candidate.asin} />)}</div>
        </div>
      </section>
    </>
  );
}
