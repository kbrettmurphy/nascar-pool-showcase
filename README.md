# NASCAR Pool | Engineering Showcase

A custom NASCAR fantasy pool and tournament management application, built to run a real multi-player competition.

> **Showcase repository.** The live production application is maintained in a separate private repository. This repository has its own Git history and contains only material deliberately selected for public review.

## What the application does

- **Live race experience:** tracks race status, lap, leader, and player-versus-player matchups.
- **Driver assignments and scoring:** maps selected drivers to competitors and calculates race results.
- **Swiss-format tournament:** generates pairings, tracks matchup outcomes, and maintains standings.
- **Player portal:** presents current races, standings, dues, brackets, and live matchups.
- **Progressive web app:** supports an installable mobile-first interface and offline-oriented caching.
- **Backend integrations:** Cloudflare Pages Functions / Workers and Supabase PostgreSQL.

## Architecture

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Client | HTML, CSS, JavaScript, PWA | Player-facing experience and live updates |
| API | Cloudflare Pages Functions / Workers | Race-data integration, scoring endpoints, authorization |
| Data | Supabase / PostgreSQL | Players, races, assignments, tournament results |
| Delivery | GitHub and Cloudflare | Source control and deployment |

## Code samples

The repository includes reviewed, dependency-free examples adapted from production logic:\n\n| Example | Purpose | Tests |\n| --- | --- | --- |\n| [`src/bracket-seeding.js`](src/bracket-seeding.js) | Seed 16 players into first-round matchups | [`bracket-seeding.test.js`](tests/bracket-seeding.test.js) |\n| [`src/swiss-pairings.js`](src/swiss-pairings.js) | Group by record, rank players, and attempt to avoid rematches | [`swiss-pairings.test.js`](tests/swiss-pairings.test.js) |\n| [`src/race-scoring.js`](src/race-scoring.js) | Calculate driver-finish averages and interpret matchup results | [`race-scoring.test.js`](tests/race-scoring.test.js) |\n\nRun the examples' tests with `npm test` (Node.js 20+). Run a complete synthetic tournament walkthrough with `npm run demo`. GitHub Actions also runs tests and a privacy-pattern check on each push. The Swiss example intentionally rejects odd-sized win buckets rather than silently dropping a player, and is not a full tournament engine. **This repository is not a deployable copy of the live site.**

## Privacy and scope

This showcase intentionally excludes production credentials, private member information, private media, private endpoints, and historical production Git objects. Sample datasets will use synthetic names and values.

## What I built

An end-to-end, working application combining race information, custom game rules, tournament standings, and a mobile player experience. The engineering focus is on transforming external live race data into clear, useful competition results.

## Project status

Active production application; public showcase documentation and vetted code examples are being prepared.
