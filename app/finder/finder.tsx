"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Share2, Star, Users } from "lucide-react";
import { formatPrice, productImage, productSlug, type Product } from "@/lib/products";

import { calculateMatch } from "@/lib/finder-ranking";

type Answers = { persons?: number; budget?: number; zones?: number; type?: string; priority?: string; cleaning?: boolean };
const steps = [
  { key: "persons", title: "Für wie viele Personen kochst du meistens?", options: [[2,"1–2 Personen","Kompakt & alltagstauglich"],[4,"3–4 Personen","Flexibler Allrounder"],[6,"5 oder mehr","Familie & Gäste"]] },
  { key: "budget", title: "Wie hoch ist dein Budget?", options: [[80,"Bis 80 €","Preisbewusst"],[120,"Bis 120 €","Solide Mittelklasse"],[180,"Bis 180 €","Mehr Komfort"],[0,"Flexibel","Passung ist wichtiger"]] },
  { key: "zones", title: "Möchtest du zwei Gerichte gleichzeitig garen?", options: [[2,"Ja, unbedingt","Zwei Zonen bevorzugen"],[1,"Nein, ein Korb reicht","Einfach & kompakt"],[0,"Ich bin offen","Beides anzeigen"]] },
  { key: "type", title: "Welche Bauform gefällt dir?", options: [["any","Ganz offen","Zeig mir die beste Passung"],["Single-Basket Airfryer","Klassischer Korb","Einfach im Alltag"],["Dual-/Multi-Zone Airfryer","Dual Zone","Zwei Speisen parallel"],["Airfryer-Ofen","Airfryer-Ofen","Viel Platz & Ebenen"],["Glas-Airfryer","Glas-Airfryer","Beim Garen zuschauen"]] },
  { key: "priority", title: "Was ist dir am wichtigsten?", options: [["value","Niedriger Preis","Günstigere Modelle bevorzugen"],["rating","Bewertung","Erfasste Sterne stärker gewichten"],["capacity","Viel Platz","Große Kapazität"],["compact","Kleine Portionen","Niedrige Kapazitätsklasse"]] },
  { key: "cleaning", title: "Wie wichtig ist dir einfache Reinigung?", options: [[true,"Sehr wichtig","Weniger Aufwand im Alltag"],[false,"Nicht entscheidend","Andere Merkmale zählen mehr"]] },
] as const;

export function Finder({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Answers>({}); const [done, setDone] = useState(false);
  const current = steps[step];
  const results = useMemo(() => products.map((p) => calculateMatch(p, answers)).sort((a,b) => b.score-a.score).slice(0,4), [answers, products]);
  function choose(value: string | number | boolean) { const next = { ...answers, [current.key]: value }; setAnswers(next); if (step === steps.length - 1) setDone(true); else setStep(step + 1); }
  function reset() { setAnswers({}); setStep(0); setDone(false); }
  if (done) return <section className="inner-section shell finder-results"><div className="results-head"><div><span className="eyebrow">Deine Auswertung</span><h2>Deine Vorauswahl nach Produktangaben</h2><p>Die Reihenfolge berücksichtigt deine Antworten und dokumentierte Merkmale. Portionsgrößen sind redaktionelle Orientierung. Preise und Bewertungen stammen vom 22.08.2026; aktuelle Preise bitte beim Anbieter prüfen.</p></div><button onClick={reset} className="button secondary"><RotateCcw size={17}/> Neu starten</button></div><div className="match-grid">{results.map(({product,reasons,cautions},index)=><article className={`match-card ${index===0?"winner":""}`} key={product.asin}>{index===0&&<span className="winner-label">Erster Vorschlag</span>}<div className="match-image"><Image src={productImage(product)} alt={`${product.marke} ${product.modellcode || "Airfryer"}`} fill sizes="(max-width:700px) 90vw, 280px"/></div><span className="eyebrow">{product.unterkategorie}</span><h3>{product.marke} {product.modellcode || product.titel.split(",")[0].replace(product.marke, "").trim()}</h3><ul>{(reasons.length?reasons:["Kein ausgewähltes Merkmal im Datensatz bestätigt"]).map(r=><li key={r}><Check size={16}/>{r}</li>)}</ul>{cautions.length>0&&<p className="note-box"><strong>Noch prüfen:</strong> {cautions.join(" · ")}</p>}<div className="match-meta"><span>{product.kapazitaetL?`${product.kapazitaetL} L`:"Kapazität offen"}</span><span><Star size={15} fill="currentColor"/> {product.bewertung||"–"}</span><b>{formatPrice(product.preisEUR)}</b></div><Link href={`/airfryer/${productSlug(product)}`} className="button primary">Gerät ansehen <ArrowRight size={17}/></Link></article>)}</div><div className="share-box"><Share2/><div><b>Vorauswahl gemeinsam vergleichen</b><p>Stelle diese vier Geräte direkt gegenüber und teile deinen Vergleich.</p><Link className="button secondary" href={`/vergleich?ids=${results.map(({product})=>product.asin).join(",")}`}>Diese Geräte vergleichen</Link></div></div></section>;
  return <section className="inner-section shell"><div className="finder-app"><div className="finder-progress"><div><span>Frage {step+1} von {steps.length}</span><b>{Math.round((step+1)/steps.length*100)}%</b></div><i><span style={{width:`${(step+1)/steps.length*100}%`}}/></i></div><div className="finder-question"><span className="question-icon"><Users/></span><h2>{current.title}</h2><p>Wähle einfach die Antwort, die deinem Alltag am nächsten kommt.</p></div><div className="answer-grid">{current.options.map((option)=><button key={String(option[0])} onClick={()=>choose(option[0])}><span><b>{option[1]}</b><small>{option[2]}</small></span><ArrowRight/></button>)}</div><div className="finder-nav"><button disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft/> Zurück</button><span>Deine Antworten werden nur für diese Empfehlung verwendet.</span></div></div></section>;
}
