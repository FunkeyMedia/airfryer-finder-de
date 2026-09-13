/** Editorial ordering of the dated catalogue, not a measured fit probability. */
import type { Product } from "./products";
export type FinderAnswers = { persons?: number; budget?: number; zones?: number; type?: string; priority?: string; cleaning?: boolean };
export function calculateMatch(product: Product, answers: FinderAnswers) {
  let score = 0;
  const reasons = [];
  const cautions = [];
  if (answers.persons) {
    const target = answers.persons === 2 ? 4.5 : answers.persons === 4 ? 7 : 9;
    if (product.kapazitaetL) {
      const delta = Math.abs(product.kapazitaetL - target);
      score += Math.max(0, 20 - delta * 3);
      if (delta <= 2) reasons.push(`${product.kapazitaetL} Liter liegen nahe unserer Portionsorientierung`);
    } else cautions.push("Kapazität nicht angegeben");
  }
  if (answers.budget !== undefined && answers.budget > 0) {
    if (product.preisEUR == null) cautions.push("Preis für den Budgetvergleich fehlt");
    else if (product.preisEUR <= answers.budget) {
      score += 14;
      reasons.push("Erfasster Preis innerhalb deines Budgets");
    } else {
      score -= Math.min(18, (product.preisEUR - answers.budget) / 5);
      cautions.push("Erfasster Preis über deinem Budget");
    }
  }
  if (answers.zones !== undefined && answers.zones > 0) {
    if (product.zonen == null) cautions.push("Anzahl der Garzonen nicht angegeben");
    else if (product.zonen === answers.zones || (answers.zones === 2 && product.zonen > 2)) {
      score += 14;
      reasons.push(answers.zones === 2 ? "Mindestens zwei Garzonen angegeben" : "Eine Garzone angegeben");
    } else cautions.push("Andere Anzahl an Garzonen als gewünscht");
  }
  if (answers.type && answers.type !== "any") {
    if (product.unterkategorie === answers.type) { score += 12; reasons.push("Gewünschte Bauform"); }
    else cautions.push("Andere Bauform als gewünscht");
  }
  if (answers.cleaning) {
    const description = product.kurzbeschreibung || "";
    if (/spülmaschinen(?:fest|geeignet)|spülmaschinengeeignet/i.test(description)) {
      score += 10;
      reasons.push("Beschreibung nennt spülmaschinengeeignete Teile");
    } else if (/antihaft/i.test(description)) {
      score += 5;
      reasons.push("Beschreibung nennt eine Antihaftbeschichtung");
    } else cautions.push("Reinigungsmerkmale nicht belegt");
  }
  if (answers.priority === "rating" && product.bewertung != null) score += product.bewertung * 3;
  if (answers.priority === "capacity" && product.kapazitaetL) score += Math.min(product.kapazitaetL, 12);
  if (answers.priority === "value" && product.preisEUR != null) score += Math.max(0, 14 - product.preisEUR / 20);
  if (answers.priority === "compact" && product.kapazitaetL && product.kapazitaetL <= 5) {
    score += 10;
    reasons.push("Kleine Kapazitätsklasse; Stellmaße zusätzlich prüfen");
  }
  return { product, score, reasons, cautions };
}
