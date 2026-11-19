# Public code selection policy

This repository is an **independent public presentation**, not a mirror or fork of the private production repository.

## Approved showcase subjects

1. Pure scoring calculations and driver-to-player mapping, after dependency review.
2. Swiss tournament pairing and standings algorithms, using synthetic examples.
3. Public-facing race-status presentation, with mock data and no live credentials.
4. PWA interface patterns that do not reference private routes or assets.
5. Architecture and technical decisions written for portfolio reviewers.

## Required review before importing each file

- Inspect complete contents and imported dependencies.
- Remove secrets, real member information, private endpoints, private media, and internal admin configuration.
- Remove references to private gallery features, even in comments, tests, paths, and docs.
- Use mock data for demonstrations.
- Add files as new commits in this repository only; never merge or import the private repository's history.
- Review all files again before switching this repository to public.

## Deployment

The showcase is documentation and selected source samples. Production deployment remains connected to the separate private repository.
