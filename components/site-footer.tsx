import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">Airfryer<span>Finder</span><em>.de</em></div>
          <p>Wir übersetzen Produktdaten in verständliche Empfehlungen – damit dein Airfryer zu deinem Alltag passt.</p>
        </div>
        <div><h3>Entdecken</h3><Link href="/finder">Airfryer-Finder</Link><Link href="/airfryer">Alle Geräte</Link><Link href="/zubehoer">Zubehör</Link><Link href="/rezepte">Rezepte</Link><Link href="/ratgeber">Ratgeber</Link></div>
        <div><h3>Vertrauen</h3><Link href="/transparenz">So bewerten wir</Link><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
      </div>
      <div className="shell footer-bottom"><span><ShieldCheck size={16} /> Transparente Datenbasis</span><span>Mit <Heart size={15} fill="currentColor" /> für knusprige Entscheidungen</span><span>© 2026 AirfryerFinder.de</span></div>
    </footer>
  );
}
