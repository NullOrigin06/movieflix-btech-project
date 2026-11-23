# Movieflix Expanded Catalog Design

## Intent

Expand Movieflix beyond its current 12-film catalog by adding more movies and a selection of television shows, while keeping the project appropriate for a BTech graduate and preserving the existing React, Express, and MongoDB stack.

## Goals

- Add a simple `type` field with the values `Movie` or `Show`.
- Keep movies and shows in the existing MongoDB collection and existing model.
- Expand the seed data with a balanced selection of recognizable movies and shows across several genres.
- Let users browse All, Movies, or Shows before applying the existing genre filter.
- Display the content type on cards, hero metadata, and the detail page.
- Preserve search, Continue Watching, My List, trailers, authentication, and current routes.

## Non-goals

- No seasons, episodes, episode player, cast database, or recommendation engine.
- No new database collection, route family, framework, or dependency.
- No admin interface for catalog management.

## Constraints

- Re-running `npm run seed` intentionally replaces the current movie catalog.
- Existing saved-list and Continue Watching references may be cleared or become invalid when the catalog is reseeded; the seed script will clear those references so accounts remain consistent.
- Posters continue to use YouTube trailer thumbnails, matching the current project.
- The implementation should remain easy to understand and explain.

## Approaches

1. **Single catalog with a type field (selected):** Add `type` to the existing schema, seed both types together, and filter them in the client. This provides useful separation with minimal complexity.
2. **Genre-only entries:** Add shows without a type. Rejected because users could not browse Movies and Shows independently.

## Implementation Direction

- Default existing or missing `type` values to `Movie` for compatibility.
- Add a compact All / Movies / Shows segmented control in the discovery panel.
- Compute available genres and result counts from the selected content type.
- Keep title search server-backed, then apply content-type and genre filters in the client.
- Add at least six new movies and six shows, using real trailer IDs and concise descriptions.
- Update the seed script to clear users' My List and Continue Watching references before replacing catalog records.

## Verification

- Add tests for content-type filtering and compatibility defaults.
- Run the client UI contracts, lint, and production build.
- Run the seed script against the local MongoDB database and confirm the new counts through the API.
- Inspect the All, Movies, and Shows filters at desktop and mobile widths.
