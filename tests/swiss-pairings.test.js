import test from "node:test";
import assert from "node:assert/strict";
import { generateSwissPairings } from "../src/swiss-pairings.js";

const players = [
  { id: "a", name: "Alpha", wins: 2, avgSum: 4, bestFinish: 1 },
  { id: "b", name: "Bravo", wins: 2, avgSum: 5, bestFinish: 2 },
  { id: "c", name: "Charlie", wins: 2, avgSum: 6, bestFinish: 3 },
  { id: "d", name: "Delta", wins: 2, avgSum: 7, bestFinish: 4 },
  { id: "e", name: "Echo", wins: 1, avgSum: 8, bestFinish: 5 },
  { id: "f", name: "Foxtrot", wins: 1, avgSum: 9, bestFinish: 6 },
];

test("groups by wins and sorts within each bucket", () => {
  const matches = generateSwissPairings(players);
  assert.deepEqual(matches.map(m => [m.player1.id, m.player2.id]), [
    ["a", "b"], ["c", "d"], ["e", "f"],
  ]);
});

test("avoids a rematch with a same-bucket partner swap", () => {
  const matches = generateSwissPairings(players, [["a", "b"]]);
  assert.deepEqual(matches.slice(0, 2).map(m => [m.player1.id, m.player2.id]), [
    ["a", "d"], ["c", "b"],
  ]);
});

test("rejects unsupported odd-sized win buckets", () => {
  assert.throws(() => generateSwissPairings(players.slice(0, 5)));
  assert.throws(() => generateSwissPairings(players.slice(0, 4).concat(players[4])));
});
