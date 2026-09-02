"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Share2, Star, Users } from "lucide-react";
import { dataCompleteness, formatPrice, productImage, productSlug, type Product } from "@/lib/products";

type Answers = { persons?: number; budget?: number; zones?: number; type?: string; priority?: string; cleaning?: boolean };
const steps = [
  { key: "persons", title: "Für wie viele Personen kochst du meistens?", options: [[2,"1–2 Personen","Kompakt & alltagstauglich"],[4,"3–4 Personen","Flexibler Allrounder"],[6,"5 oder mehr","Familie & Gäste"]] },
  { key: "budget", title: "Wie hoch ist dein Budget?", options: [[80,"Bis 80 €","Preisbewusst"],[120,"Bis 120 €","Solide Mittelklasse"],[180,"Bis 180 €","Mehr Komfort"],[300,"Flexibel","Passung ist wichtiger"]] },
  { key: "zones", title: "Möchtest du zwei Gerichte gleichzeitig garen?", options: [[2,"Ja, unbedingt","Zwei Zonen bevorzugen"],[1,"Nein, ein Korb reicht","Einfach & kompakt"],[0,"Ich bin offen","Beides anzeigen"]] },
  { key: "type", title: "Welche Bauform gefällt dir?", options: [["any","Ganz offen","Zeig mir die beste Passung"],["Single-Basket Airfryer","Klassischer Korb","Einfach im Alltag"],["Dual-/Multi-Zone Airfryer","Dual Zone","Zwei Speisen parallel"],["Airfryer-Ofen","Airfryer-Ofen","Viel Platz & Ebenen"],["Glas-Airfryer","Glas-Airfryer","Beim Garen zuschauen"]] },
  { key: "priority", title: "Was ist dir am wichtigsten?", options: [["value","Preis-Leistung","Viel Gegenwert"],["rating","Erfahrungsbreite","Viele gute Bewertungen"],["capacity","Viel Platz","Große Portionen"],["compact","Kompaktheit","Wenig Stellfläche"]] },
  { key: "cleaning", title: "Wie wichtig ist dir einfache Reinigung?", options: [[true,"Sehr wichtig","Weniger Aufwand im Alltag"],[false,"Nicht entscheidend","Andere Merkmale zählen mehr"]] },
] as const;

function calculate(product: Product, answers: Answers) {
  let score = 44; const reasons: string[] = [];
  const capacityTarget = answers.persons === 2 ? 4.5 : answers.persons === 4 ? 7 : 9;
  if (product.kapazitaetL && answers.persons) { const delta = Math.abs(product.kapazitaetL - capacityTarget); score += Math.max(0, 20 - delta * 3); if (delta <= 2) reasons.push(`${product.kapazitaetL} Liter passen gut zur Portionsgröße`); }
  if (answers.budget && product.preisEUR) { if (product.preisEUR <= answers.budget) { score += 14; reasons.push("liegt in deinem Budget"); } else score -= Math.min(18, (product.preisEUR - answers.budget) / 5); }
  if (answers.zones === 2 && (product.zonen || 1) >= 2) { score += 14; reasons.push("zwei Speisen parallel möglich"); }
  if (answers.zones === 1 && (product.zonen || 1) === 1) score += 8;
  if (answers.type && answers.type !== "any" && product.unterkategorie === answers.type) { score += 12; reasons.push("gewünschte Bauform"); }
  if (answers.priority === "rating") score += (product.bewertung || 3) * 3;
  if (answers.priority === "capacity" && product.kapazitaetL) score += Math.min(product.kapazitaetL, 12);
  if (answers.priority === "value" && product.preisEUR) score += Math.max(0, 14 - product.preisEUR / 20);
  if (answers.priority === "compact" && product.kapazitaetL && product.kapazitaetL <= 5) { score += 10; reasons.push("kompakte Kapazitätsklasse"); }
  if (product.bewertung) score += product.bewertung * 2;
  score += dataCompleteness(product) * .07;
  if (product.verfuegbar) score += 4;
  return { product, score: Math.max(55, Math.min(98, Math.round(score))), reasons: reasons.slice(0,3) };
}

export function Finder({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Answers>({}); const [done, setDone] = useState(false);
  const current = steps[step];
  const results = useMemo(() => products.map((p) => calculate(p, answers)).sort((a,b) => b.score-a.score).slice(0,4), [answers, products]);
  function choose(value: string | number | boolean) { const next = { ...answers, [current.key]: value }; setAnswers(next); if (step === steps.length - 1) setDone(true); else setStep(step + 1); }
  function reset() { setAnswers({}); setStep(0); setDone(false); }
  if (done) return <section className="inner-section shell finder-results"><div className="results-head"><div><span className="eyebrow">Deine Auswertung</span><h2>Diese Airfryer passen am besten</h2><p>Der Matching-Wert ist eine Orientierung aus deinen Antworten und den verfügbaren Produktdaten – kein Labortest.</p></div><button onClick={reset} className="button secondary"><RotateCcw size={17}/> Neu starten</button></div><div className="match-grid">{results.map(({product,score,reasons},index)=><article className={`match-card ${index===0?"winner":""}`} key={product.asin}>{index===0&&<span className="winner-label">Beste Gesamtpassung</span>}<div className="match-image"><Image src={productImage(product)} alt={`${product.marke} ${product.modellcode || "Airfryer"}`} fill sizes="(max-width:700px) 90vw, 280px"/></div><div className="match-score"><strong>{score}%</strong><span>Match</span></div><span className="eyebrow">{index===1?"Günstige Alternative":index===2?"Komfort-Alternative":index===3?"Weitere starke Wahl":product.unterkategorie}</span><h3>{product.marke} {product.modellcode || product.titel.split(",")[0].replace(product.marke, "").trim()}</h3><ul>{(reasons.length?reasons:["gute datenbasierte Gesamtpassung","Bewertungen wurden berücksichtigt"]).map(r=><li key={r}><Check size={16}/>{r}</li>)}</ul><div className="match-meta"><span>{product.kapazitaetL?`${product.kapazitaetL} L`:"Kapazität offen"}</span><span><Star size={15} fill="currentColor"/> {product.bewertung||"–"}</span><b>{formatPrice(product.preisEUR)}</b></div><Link href={`/airfryer/${productSlug(product)}`} className="button primary">Gerät ansehen <ArrowRight size={17}/></Link></article>)}</div><div className="share-box"><Share2/><div><b>Favoriten weiter prüfen</b><p>Öffne die Detailseiten deiner Favoriten und vergleiche dort Daten, Stärken und Grenzen.</p></div></div></section>;
  return <section className="inner-section shell"><div className="finder-app"><div className="finder-progress"><div><span>Frage {step+1} von {steps.length}</span><b>{Math.round((step+1)/steps.length*100)}%</b></div><i><span style={{width:`${(step+1)/steps.length*100}%`}}/></i></div><div className="finder-question"><span className="question-icon"><Users/></span><h2>{current.title}</h2><p>Wähle einfach die Antwort, die deinem Alltag am nächsten kommt.</p></div><div className="answer-grid">{current.options.map((option)=><button key={String(option[0])} onClick={()=>choose(option[0])}><span><b>{option[1]}</b><small>{option[2]}</small></span><ArrowRight/></button>)}</div><div className="finder-nav"><button disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft/> Zurück</button><span>Deine Antworten werden nur für diese Empfehlung verwendet.</span></div></div></section>;
}
