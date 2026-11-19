/**
 * Race scoring presentation helpers adapted from production score fields.
 * The actual production race import and database update remain private.
 */

/** A driver's finishing position: lower is better. Zero means unscored. */
export function bestDriverFinish(driver1Finish, driver2Finish) {
  const positions = [driver1Finish, driver2Finish]
    .map(Number)
    .filter(n => Number.isInteger(n) && n > 0);
  return positions.length ? Math.min(...positions) : null;
}

/**
 * Calculate a player's average finish from two selected drivers.
 * Returns null until both finishing positions are known.
 */
export function averageDriverFinish(driver1Finish, driver2Finish) {
  const a = Number(driver1Finish);
  const b = Number(driver2Finish);
  if (![a, b].every(n => Number.isInteger(n) && n > 0)) return null;
  return (a + b) / 2;
}

/**
 * Display the outcome of a scored matchup using the database's winner ID.
 * A null winner ID indicates that the result is not yet finalized.
 */
export function matchupOutcome(player1Id, player2Id, winnerId) {
  if (winnerId == null) return "pending";
  if (String(winnerId) === String(player1Id)) return "player1";
  if (String(winnerId) === String(player2Id)) return "player2";
  throw new Error("winnerId must match a participant");
}
