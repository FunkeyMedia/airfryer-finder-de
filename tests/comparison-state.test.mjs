import assert from "node:assert/strict";
import test from "node:test";
import { readComparisonIds, comparisonPath } from "../lib/comparison-state.ts";
test("selection survives sharing in the selected order", () => {
  const url = new URL(comparisonPath(["B", "A"]), "https://example.test");
  assert.deepEqual(readComparisonIds(url.searchParams.get("ids"), ["A", "B"]), ["B", "A"]);
});
test("unknown and duplicate IDs do not consume comparison slots", () => {
  assert.deepEqual(readComparisonIds("bad,A,A,B,C,D,E", ["A", "B", "C", "D", "E"]), ["A", "B", "C", "D"]);
  assert.deepEqual(readComparisonIds(null, ["A"]), []);
  assert.equal(comparisonPath([]), "/vergleich");
});
