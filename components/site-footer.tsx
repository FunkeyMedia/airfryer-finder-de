import Link from "next/link";
import { ArrowRight, CookingPot, ShieldCheck } from "lucide-react";
import { FooterThumbnail } from "@/components/footer-thumbnail";
import { accessories, devices, productImage, productSlug } from "@/lib/products";
import { recipes } from "@/data/recipes";

// Editorial links to existing guides and product profiles; no live offer claims.
const deviceIds = ["B0GSS34ZYM", "B0CWP6KQ4D"];
const accessoryIds = ["B0C4YZM1BF", "B0D25YFS8F"];
const recipeIds = ["knusprige-kartoffelspalten", "schoko-lava-cakes"];
const productNames: Record<string, string> = {
  B0GSS34ZYM: "Ninja Foodi FlexDrawer AF500EUSD",
  B0CWP6KQ4D: "Philips Airfryer Serie 2000",
  B0C4YZM1BF: "Philips Airfryer Back-Kit",
  B0D25YFS8F: "SWEET VIEW 2-in-1-Ölsprüher",
};

const navigation = [
  { title: "Dein Airfryer", links: [["Airfryer-Finder starten", "/finder"], ["Alle Geräte entdecken", "/airfryer"], ["Geräte vergleichen", "/vergleich"], ["Zubehör entdecken", "/zubehoer"]] },
  { title: "Kochen & Genießen", links: [["Alle Airfryer-Rezepte", "/rezepte"], ["Knusprige Kartoffelspalten", "/rezepte/knusprige-kartoffelspalten"], ["Saftige Hähnchenbrust", "/rezepte/saftige-haehnchenbrust"], ["Schnelle Mini-Zimtschnecken", "/rezepte/zimtschnecken"]] },
  { title: "Gut zu wissen", links: [["Ratgeber im Überblick", "/ratgeber"], ["Größe & Stellfläche", "/ratgeber/groesse-und-stellflaeche"], ["Ein Korb oder zwei Zonen?", "/ratgeber/ein-korb-oder-zwei-zonen"], ["Reinigung & Pflege", "/ratgeber/reinigung-und-pflege"]] },
];

export function SiteFooter() {
  const groups = [
    { title: "Airfryer entdecken", href: "/airfryer", label: "Alle Geräte", items: deviceIds.flatMap(id => {
      const product = devices.find(p => p.asin === id);
      return product ? [{ title: productNames[id], detail: product.unterkategorie, href: `/airfryer/${productSlug(product)}`, image: productImage(product), recipe: false }] : [];
    }) },
    { title: "Kleine Küchenhelfer", href: "/zubehoer", label: "Alles an Zubehör", items: accessoryIds.flatMap(id => {
      const product = accessories.find(p => p.asin === id);
      return product ? [{ title: productNames[id], detail: "Airfryer-Zubehör", href: `/zubehoer/${productSlug(product)}`, image: productImage(product), recipe: false }] : [];
    }) },
    { title: "Lust auf etwas Leckeres?", href: "/rezepte", label: "Alle Rezepte", items: recipeIds.flatMap(slug => {
      const recipe = recipes.find(r => r.slug === slug);
      return recipe ? [{ title: recipe.title, detail: `${recipe.prep + recipe.cook} Min. · ${recipe.category}`, href: `/rezepte/${recipe.slug}`, image: recipe.image, recipe: true }] : [];
    }) },
  ];

  return (
    <footer className="site-footer premium-footer">
      <div className="shell">
        <div className="footer-invitation">
          <div><span className="footer-kicker"><CookingPot size={17} aria-hidden="true" /> Mehr Freude am Selbermachen</span><h2>Dein nächster Lieblingsmoment<br />beginnt in der Küche.</h2><p>Finde den passenden Airfryer – und die Ideen, die ihn jeden Tag besonders machen.</p></div>
          <Link href="/finder" className="button accent">Meinen Airfryer finden <ArrowRight size={19} aria-hidden="true" /></Link>
        </div>

        <nav className="footer-discovery" aria-label="Airfryer, Zubehör und Rezepte mit Bild">
          {groups.map(group => <div className="footer-discovery-group" key={group.href}>
            <h3>{group.title}</h3>
            <ul>{group.items.map(item => <li key={item.href}><Link href={item.href} className="footer-picture-link">
              <FooterThumbnail src={item.image} recipe={item.recipe} />
              <span className="footer-picture-copy"><span>{item.detail}</span><strong>{item.title}</strong></span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link></li>)}</ul>
            <Link className="footer-collection-link" href={group.href}>{group.label} <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>)}
        </nav>
        <p className="footer-selection-note">Einblicke in unseren Katalog: zwei Gerätekonzepte, Zubehör zum Backen und Dosieren sowie eine herzhafte und eine süße Rezeptidee. Rezeptbilder dienen der Illustration.</p>

        <div className="footer-directory">
          <div className="footer-about">
            <Link href="/" className="footer-brand" aria-label="AirfryerFinder.de – Startseite">Airfryer<span>Finder</span><em>.de</em></Link>
            <p>AirfryerFinder.de hilft dir, Heißluftfritteusen anhand von Produktdaten mit deinem Haushalt und Kochalltag abzugleichen. Dazu findest du Zubehör, Rezepte und verständliche Kaufberatung.</p>
            <Link href="/transparenz" className="footer-transparency"><ShieldCheck size={19} aria-hidden="true" /> So bewerten wir</Link>
          </div>
          {navigation.map(group => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
        </div>
        <div className="footer-disclosure"><ShieldCheck size={21} aria-hidden="true" /><p><strong>Transparent entscheiden.</strong> Unsere Einordnung basiert auf öffentlich sichtbaren Produktdaten, nicht auf eigenen Praxistests. Über gekennzeichnete Amazon-Partnerlinks können wir eine Provision erhalten. Für dich bleibt der Preis gleich. Aktuelle Preise und Verfügbarkeit prüfst du auf der jeweiligen Produktseite beziehungsweise bei Amazon.</p></div>
        <div className="footer-legal"><span>© 2026 AirfryerFinder.de</span><span>Für knusprige Ideen. Und gute Entscheidungen.</span><nav aria-label="Rechtliche Informationen"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link href="/transparenz">Transparenz</Link></nav></div>
      </div>
    </footer>
  );
}
