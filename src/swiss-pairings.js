/**
 * Dependency-free illustration of the production Swiss pairing approach.
 *
 * Players are grouped by wins, sorted by aggregate finish average (ascending),
 * best driver finish, then name. Adjacent players are paired. If a pairing
 * repeats an earlier matchup, attempt a partner swap within the same win bucket.
 *
 * Adapted from the production PostgreSQL generate_swiss_round_pairings routine.
 * Uses synthetic inputs and performs no database operations.
 */
export function generateSwissPairings(players, previousPairs = []) {
  if (!Array.isArray(players) || !Array.isArray(previousPairs)) {
    throw new TypeError("players and previousPairs must be arrays");
  }
  const ids = new Set();
  for (const player of players) {
    if (player?.id == null || ids.has(player.id)) {
      throw new Error("Each player needs a unique ID");
    }
    ids.add(player.id);
  }
  if (players.length % 2 !== 0) {
    throw new Error("This example requires an even player count");
  }

  const played = new Set(previousPairs.map(([a, b]) => pairKey(a, b)));
  const buckets = new Map();
  for (const player of players) {
    const wins = Number(player.wins);
    if (!Number.isInteger(wins) || wins < 0) throw new Error("Invalid win count");
    if (!buckets.has(wins)) buckets.set(wins, []);
    buckets.get(wins).push(player);
  }

  const matches = [];
  for (const wins of [...buckets.keys()].sort((a, b) => b - a)) {
    const group = buckets.get(wins).sort((a, b) =>
      Number(a.avgSum) - Number(b.avgSum) ||
      Number(a.bestFinish) - Number(b.bestFinish) ||
      String(a.name).localeCompare(String(b.name))
    );
    if (group.length % 2 !== 0) {
      throw new Error(`Win bucket ${wins} has an odd player count; cross-bucket pairing is not implemented`);
    }

    const pairs = [];
    for (let i = 0; i < group.length; i += 2) pairs.push([group[i], group[i + 1]]);

    for (let i = 0; i < pairs.length; i++) {
      const [a, b] = pairs[i];
      if (!played.has(pairKey(a.id, b.id))) continue;
      for (let j = i + 1; j < pairs.length; j++) {
        const [c, d] = pairs[j];
        if (!played.has(pairKey(a.id, d.id)) && !played.has(pairKey(c.id, b.id))) {
          pairs[i] = [a, d];
          pairs[j] = [c, b];
          break;
        }
        if (!played.has(pairKey(a.id, c.id)) && !played.has(pairKey(d.id, b.id))) {
          pairs[i] = [a, c];
          pairs[j] = [d, b];
          break;
        }
      }
    }
    matches.push(...pairs.map(([a, b]) => ({ wins, player1: a, player2: b })));
  }
  return matches.map((match, index) => ({ matchNumber: index + 1, ...match }));
}

function pairKey(a, b) {
  const sorted = [String(a), String(b)].sort();
  return JSON.stringify(sorted);
}
