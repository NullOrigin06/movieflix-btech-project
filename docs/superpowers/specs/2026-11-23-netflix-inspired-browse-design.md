# Netflix-Inspired MovieFlix Browse Design

## Goal

Make MovieFlix feel much closer to a modern streaming service while keeping the code understandable and believable as a BTech graduate project built with the existing React, Express, and MongoDB stack.

## Product direction

MovieFlix keeps its own name and simple red identity. It borrows familiar streaming patterns instead of copying Netflix branding or proprietary assets: a full-width featured title, compact navigation, horizontal title rails, landscape artwork, gentle hover movement, and clear content metadata.

## Pages and navigation

- Home: featured title plus curated rows for trending, movies, shows, recent titles, and genres.
- Movies: movie-only hero, genre filter chips, and a responsive catalog grid.
- TV Shows: show-only hero, genre filter chips, and a responsive catalog grid.
- New & Popular: recently released titles and a numbered top-10 presentation derived from the catalog.
- Search: a dedicated results page driven by the `q` query parameter, including empty and no-result states.
- My List and title detail remain, but share the improved navigation and visual system.

Desktop navigation exposes Home, TV Shows, Movies, New & Popular, and My List. A search icon expands into a search field. Mobile navigation becomes a horizontally scrollable compact bar so it stays simple and dependency-free.

## Catalog and data

Expand the seed catalog from 24 to at least 40 titles, with at least 28 movies and 12 shows. Continue using the existing schema and YouTube trailer thumbnails so no new API key, image host, database migration, or frontend dependency is needed. Catalog helpers will provide deterministic featured, recent, top-rated, and genre groupings.

## Visual system

- Near-black background, white text, restrained MovieFlix red accents.
- Taller hero with stronger layered gradients and a content lockup at the lower left.
- Landscape cards that can lift and reveal secondary metadata on hover, without complex Netflix-style preview popovers.
- Grid pages use the same card component for consistency.
- Responsive layouts at 1024px, 768px, and 520px; readable keyboard focus and reduced-motion support.

## Architecture

Use a shared `useCatalog` hook for fetching the complete catalog and a reusable `CatalogPage` for Movies and TV Shows. Keep selection and grouping logic in pure functions inside `catalogUtils.js` so Node's built-in test runner can verify it. The backend remains a simple catalog API; only seed data grows.

## Constraints

- Preserve React, React Router, Vite, Express, Mongoose, and MongoDB.
- Do not add a UI framework, state manager, carousel package, or external movie API.
- Keep implementation readable for a graduate-level portfolio and avoid over-engineered animation.
- Existing authentication, My List, Continue Watching, and title-detail behavior must continue working.
- Every new page must have loading, error, empty, and responsive behavior where applicable.

## Verification

Add unit coverage for catalog groupings and source-contract coverage for routes, navigation, search, page states, responsiveness, and expanded seed counts. Run client tests, server tests, lint, and production build, then visually inspect the local site at desktop and mobile widths.
