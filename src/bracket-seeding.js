/**
 * Tournament bracket seeding, extracted and adapted from the production
 * NASCAR Pool bracket endpoint. This is a pure, dependency-free example.
 *
 * A 16-player seeded bracket pairs strongest against weakest in round one.
 * No production data, credentials, network calls, or private features.
 */
export function firstRoundSeedPairs(fieldSize = 16) {
  if (!Number.isInteger(fieldSize) || fieldSize < 2 || fieldSize % 2 !== 0) {
    throw new RangeError("fieldSize must be an even integer of at least 2");
  }

  return Array.from({ length: fieldSize / 2 }, (_, index) => [
    index + 1,
    fieldSize - index,
  ]);
}

/**
 * Match seeded entrants without assuming that names or IDs are sequential.
 * Entrants: [{ seed: 1, name: "Player A" }, ...]
 */
export function buildFirstRound(entrants) {
  if (!Array.isArray(entrants)) throw new TypeError("entrants must be an array");

  const bySeed = new Map();
  for (const entrant of entrants) {
    const seed = Number(entrant?.seed);
    if (!Number.isInteger(seed) || seed < 1 || bySeed.has(seed)) {
      throw new Error("Every entrant needs a unique positive integer seed");
    }
    bySeed.set(seed, entrant);
  }

  const pairings = firstRoundSeedPairs(entrants.length);
  for (let seed = 1; seed <= entrants.length; seed++) {
    if (!bySeed.has(seed)) throw new Error(`Missing seed ${seed}`);
  }

  return pairings.map(([higherSeed, lowerSeed]) => ({
    higherSeed: bySeed.get(higherSeed),
    lowerSeed: bySeed.get(lowerSeed),
  }));
}
