import test from "node:test";
import assert from "node:assert/strict";
import { firstRoundSeedPairs, buildFirstRound } from "../src/bracket-seeding.js";

test("16-player bracket uses high-versus-low seed pairs", () => {
  assert.deepEqual(firstRoundSeedPairs(), [
    [1, 16], [2, 15], [3, 14], [4, 13],
    [5, 12], [6, 11], [7, 10], [8, 9],
  ]);
});

test("works with unordered synthetic entrants", () => {
  const entrants = Array.from({ length: 16 }, (_, i) => ({
    seed: 16 - i, name: `Example Player ${16 - i}`,
  }));
  const round = buildFirstRound(entrants);
  assert.equal(round.length, 8);
  assert.equal(round[0].higherSeed.seed, 1);
  assert.equal(round[0].lowerSeed.seed, 16);
});

test("rejects missing or duplicate seeds", () => {
  assert.throws(() => buildFirstRound([{ seed: 1 }, { seed: 1 }]));
  assert.throws(() => buildFirstRound([{ seed: 1 }, { seed: 3 }]));
});
