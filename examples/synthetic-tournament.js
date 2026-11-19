import { buildFirstRound } from "../src/bracket-seeding.js";
import { generateSwissPairings } from "../src/swiss-pairings.js";
import { averageDriverFinish, bestDriverFinish, matchupOutcome } from "../src/race-scoring.js";

// Entirely synthetic participants and results. No production data.
const entrants = Array.from({ length: 16 }, (_, i) => ({
  id: `example-${i + 1}`,
  seed: i + 1,
  name: `Example Player ${i + 1}`,
}));

console.log("ROUND ONE");
for (const [i, matchup] of buildFirstRound(entrants).entries()) {
  console.log(
    `Match ${i + 1}: #${matchup.higherSeed.seed} ${matchup.higherSeed.name} vs #${matchup.lowerSeed.seed} ${matchup.lowerSeed.name}`
  );
}

console.log("\nEXAMPLE RACE SCORING");
console.log({
  bestFinish: bestDriverFinish(3, 17),
  averageFinish: averageDriverFinish(3, 17),
  winner: matchupOutcome("example-1", "example-16", "example-1"),
});

const standings = entrants.map((p, i) => ({
  ...p,
  wins: i < 8 ? 2 : 1,
  avgSum: i + 1,
  bestFinish: i + 1,
}));

console.log("\nSWISS PAIRINGS");
for (const match of generateSwissPairings(standings)) {
  console.log(
    `Match ${match.matchNumber}: ${match.player1.name} vs ${match.player2.name} (${match.wins} wins)`
  );
}
