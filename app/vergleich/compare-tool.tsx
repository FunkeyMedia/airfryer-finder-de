"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatNumber, formatPrice, productImage, productSlug, type Product } from "@/lib/products";
import { readComparisonIds, comparisonPath } from "@/lib/comparison-state";

export function CompareTool({products}: {products: Product[]}) {
  const params = useSearchParams();
  const ids = readComparisonIds(params.get("ids"), products.map(p => p.asin));
  const selected = ids.flatMap(id => products.filter(p => p.asin === id));
  const available = products.filter(p => !ids.includes(p.asin));
  const [share, setShare] = useState({path: "", copied: false, url: ""});
  const path = comparisonPath(ids);
  function select(next: string[]) {
    window.history.replaceState(null, "", comparisonPath(next));
  }
  async function copy() {
    const url = new URL(path, window.location.origin).href;
    try { await navigator.clipboard.writeText(url); setShare({path, copied: true, url: ""}); }
    catch { setShare({path, copied: false, url}); }
  }
  const rows: [string, (p: Product) => string][] = [
    ["Erfasster Preis", p => formatPrice(p.preisEUR)],
    ["Kapazität", p => p.kapazitaetL ? `${p.kapazitaetL} L` : "Keine Angabe"],
    ["Garzonen", p => p.zonen ? String(p.zonen) : "Keine Angabe"],
    ["Leistung", p => p.leistungW ? `${p.leistungW} W` : "Keine Angabe"],
    ["Programme", p => p.programme ? String(p.programme) : "Keine Angabe"],
    ["Max. Temperatur", p => p.maxTempC ? `${p.maxTempC} °C` : "Keine Angabe"],
    ["Erfasste Bewertung", p => p.bewertung ? `${p.bewertung.toFixed(1)} / 5 (${formatNumber(p.anzahlBewertungen)})` : "Keine Angabe"],
    ["Bauform", p => p.unterkategorie],
  ];
  return <section className="inner-section shell compare-wrap">
    <div className="compare-selectors">{selected.map(p => <div key={p.asin}>
      <button type="button" onClick={() => select(ids.filter(id => id !== p.asin))} aria-label={`${p.marke} ${p.modellcode || p.titel} entfernen`}><Trash2/></button>
      <Image src={productImage(p)} alt="" width={110} height={110}/><b>{p.marke}</b><span>{p.modellcode || p.titel.slice(0,28)}</span>
    </div>)}
    {ids.length < 4 && <label><Plus/><span>Gerät hinzufügen</span><select value="" onChange={e => e.target.value && select([...ids,e.target.value])}>
      <option value="">Airfryer wählen</option>{available.map(p => <option value={p.asin} key={p.asin}>{p.marke} {p.modellcode || p.titel.slice(0,35)}</option>)}
    </select></label>}</div>
    {selected.length > 0 ? <>
      <div className="share-box"><button type="button" className="button secondary" onClick={copy}>Vergleichslink kopieren</button>
        <span role="status">{share.path === path && share.copied ? "Link kopiert" : ""}</span>
        {share.path === path && share.url && <label>Link zum Kopieren<input aria-label="Vergleichslink" readOnly value={share.url} onFocus={e => e.currentTarget.select()} style={{maxWidth:"100%"}}/></label>}
      </div>
      <div className="comparison-table"><div className="comparison-row product-row"><b>Modell</b>{selected.map(p => <div key={p.asin}>
        <strong>{p.marke} {p.modellcode}</strong><Link href={`/airfryer/${productSlug(p)}`}>Details & Händlerangebot ansehen</Link>
      </div>)}</div>{rows.map(([label,get]) => <div className="comparison-row" key={label}><b>{label}</b>{selected.map(p => <span key={p.asin}>{get(p)}</span>)}</div>)}</div>
    </> : <div className="empty-state"><h2>Wähle dein erstes Gerät</h2><p>Nutze das Auswahlfeld oben oder starte von einer Produktseite aus. Unbekannte Produktkennungen werden nicht übernommen.</p></div>}
    <p className="note-box">Bewertungen, Preise und Verfügbarkeit stammen aus der Datenerfassung vom 22.08.2026 und können sich geändert haben. Der Link speichert deine Modellauswahl; er reserviert kein Angebot.</p>
  </section>;
}
