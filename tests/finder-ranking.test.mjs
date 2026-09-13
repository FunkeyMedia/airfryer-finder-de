import assert from "node:assert/strict";
import test from "node:test";
import { calculateMatch } from "../lib/finder-ranking.ts";
const product = { kurzbeschreibung: "", preisEUR: null, zonen: null, kapazitaetL: null, bewertung: null };
test("unknown specifications never produce a positive fit claim", () => {
  const result = calculateMatch(product, { zones: 1, budget: 80, persons: 2, cleaning: true });
  assert.equal(result.score, 0);
  assert.deepEqual(result.reasons, []);
  assert.equal(result.cautions.length, 4);
});
test("cleaning preference affects ranking only with a documented feature", () => {
  const documented = { ...product, kurzbeschreibung: "Spülmaschinenfeste Teile" };
  assert.ok(calculateMatch(documented, { cleaning: true }).score > calculateMatch(product, { cleaning: true }).score);
  assert.equal(calculateMatch(documented, { cleaning: false }).score, 0);
});
test("flexible budget does not penalize a product above 300 EUR", () => {
  assert.equal(calculateMatch({ ...product, preisEUR: 500 }, { budget: 0 }).score, 0);
  assert.match(calculateMatch({ ...product, preisEUR: 100 }, { budget: 80 }).cautions[0], /über deinem Budget/);
});
test("missing zone count is never treated as one zone", () => {
  assert.deepEqual(calculateMatch(product, { zones: 1 }).reasons, []);
  assert.equal(calculateMatch({ ...product, zonen: 1 }, { zones: 1 }).reasons.length, 1);
});
