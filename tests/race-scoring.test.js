import test from "node:test";
import assert from "node:assert/strict";
import { bestDriverFinish, averageDriverFinish, matchupOutcome } from "../src/race-scoring.js";

test("lower finishing position is better", () => {
  assert.equal(bestDriverFinish(18, 3), 3);
  assert.equal(bestDriverFinish(0, 0), null);
  assert.equal(bestDriverFinish(null, 8), 8);
});

test("two finished drivers produce an average", () => {
  assert.equal(averageDriverFinish(4, 12), 8);
  assert.equal(averageDriverFinish(0, 12), null);
});

test("matchup outcome uses finalized winner ID", () => {
  assert.equal(matchupOutcome("a", "b", null), "pending");
  assert.equal(matchupOutcome("a", "b", "b"), "player2");
  assert.throws(() => matchupOutcome("a", "b", "c"));
});
