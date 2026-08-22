import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Sparkles } from "lucide-react";

const nav = [
  ["Finder", "/finder"], ["Airfryer", "/airfryer"], ["Vergleichen", "/vergleich"], ["Rezepte", "/rezepte"], ["Zubehör", "/zubehoer"], ["Ratgeber", "/ratgeber"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-note"><Sparkles size={15} /> Unabhängig erklärt · datenbasiert empfohlen</div>
      <div className="header-inner shell">
        <Link href="/" className="logo-link" aria-label="AirfryerFinder.de Startseite">
          <Image src="/brand/airfryer-finder-logo.png" alt="AirfryerFinder.de" width={1213} height={233} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/airfryer" className="header-search" aria-label="Airfryer durchsuchen"><Search size={20} /></Link>
        <details className="mobile-menu">
          <summary aria-label="Menü öffnen"><Menu size={23} /></summary>
          <nav aria-label="Mobile Navigation">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
