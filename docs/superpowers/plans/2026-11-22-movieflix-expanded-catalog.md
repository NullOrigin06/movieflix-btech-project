# Movieflix Expanded Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Movieflix with additional movies and simple television-show titles that users can browse separately.

**Architecture:** Extend the existing Movie document with a backward-compatible `type` field rather than adding a second collection or route family. Add pure client-side catalog helpers for type/genre filtering, then wire them into the existing Home, card, hero, and detail components.

**Tech Stack:** React 19, React Router 7, Vite 8, plain CSS, Express 5, Mongoose 9, MongoDB

**Spec:** `docs/superpowers/specs/2026-11-22-movieflix-expanded-catalog-design.md`

## Global Constraints

- Keep the existing React, Express, and MongoDB stack.
- Use one catalog collection and only the values `Movie` and `Show`.
- Preserve search, Continue Watching, My List, trailers, authentication, and current routes.
- Add no seasons, episodes, new framework, dependency, or admin interface.
- Continue deriving poster images from YouTube trailer thumbnails.
- Reseeding replaces catalog documents and clears user catalog references.
- The workspace is not a Git repository, so verification checkpoints replace commits.

## Review Focus

- Older records without `type` must behave as Movies; Task 1 tests this fallback.
- Selecting Shows must not leave movie-only genres or counts visible; Task 2 tests the derived catalog helpers.
- Combining a type filter and genre filter must display only their intersection; Task 2 tests the intersection.
- Search responses may contain only one content type; Task 2 tests empty derived categories.
- Reseeding must not leave broken IDs in My List or Continue Watching; Task 3 verifies user-reference cleanup.

---

### Task 1: Catalog Schema and Seed Data

**Files:**
- Modify: `server/models/Movie.js`
- Modify: `server/seed.js`
- Create: `server/tests/catalog.test.js`

**Interfaces:**
- Produces: Movie documents with `type: "Movie" | "Show"`; seed catalog with at least 18 movies and 6 shows.
- Consumes: existing Mongoose connection and poster-thumbnail mapping.

- [ ] **Step 1: Write failing schema and seed-source tests**

Use Node's built-in test runner to assert the schema defaults missing `type` to `Movie`, restricts values to Movie/Show, contains at least six new movies and six shows, and clears `myList` plus `watching` before deleting catalog documents.

- [ ] **Step 2: Run the server tests and confirm RED**

Run: `node --test tests/catalog.test.js` from `server`

Expected: failures for the missing type field, show catalog, and reference cleanup.

- [ ] **Step 3: Implement the schema and seed changes**

Add `type: { type: String, enum: ["Movie", "Show"], default: "Movie" }`. Expand the seed array with verified trailer IDs, explicit types, concise descriptions, and a balanced genre mix. Clear user `myList` and `watching` arrays before replacing movies.

- [ ] **Step 4: Run server tests**

Run: `node --test tests/catalog.test.js`

Expected: all catalog tests pass.

### Task 2: Client Type Filtering and Labels

**Files:**
- Create: `client/src/catalogUtils.js`
- Create: `client/tests/catalog-utils.test.mjs`
- Modify: `client/src/pages/Home.jsx`
- Modify: `client/src/components/MovieCard.jsx`
- Modify: `client/src/pages/MovieDetail.jsx`
- Modify: `client/src/index.css`
- Modify: `client/package.json`

**Interfaces:**
- Consumes: movie objects from Task 1.
- Produces: `getContentType(movie)`, `filterByType(movies, selectedType)`, and `getGenresForType(movies, selectedType)`; All/Movies/Shows controls and type labels.

- [ ] **Step 1: Write failing catalog-helper tests**

Test compatibility fallback, All/Movie/Show filtering, type-specific genres, empty results, and combined type/genre intersections with Node's built-in test runner.

- [ ] **Step 2: Run helper tests and confirm RED**

Run: `node --test tests/catalog-utils.test.mjs` from `client`

Expected: failure because `catalogUtils.js` does not exist.

- [ ] **Step 3: Implement the pure helpers**

Create the three exported functions with Movie fallback and no mutation.

- [ ] **Step 4: Wire helpers into Home**

Add `selectedType` state; derive genres, active genre, visible rows, featured title, and result count from the selected type. Render All / Movies / Shows as a segmented control and reset genre to All when type changes.

- [ ] **Step 5: Add catalog type labels and styles**

Show the normalized type on the hero, each card, and detail metadata. Style the segmented control responsively with plain CSS and `aria-pressed` state.

- [ ] **Step 6: Run client verification**

Run: `npm run test:ui`, `node --test tests/catalog-utils.test.mjs`, `npm run lint`, and `npm run build`

Expected: all tests pass, lint has no findings, and Vite builds successfully.

### Task 3: Reseed and End-to-End Verification

**Files:**
- Modify if needed: files touched by Tasks 1–2

**Interfaces:**
- Consumes: completed schema, seed catalog, and client filters.
- Produces: a running local catalog containing both content types.

- [ ] **Step 1: Run the seed script**

Run: `npm run seed` from `server`.

Expected: MongoDB connects and reports the expanded catalog count.

- [ ] **Step 2: Verify API counts**

Request `GET /api/movies` and confirm total, Movie, and Show counts satisfy the design minimums and every record has a valid type and poster URL.

- [ ] **Step 3: Run final automated verification**

Run the server catalog tests and all client tests, lint, and build again.

Expected: zero test failures, zero lint findings, and successful production build.

- [ ] **Step 4: Browser smoke-check**

At desktop and 390px widths, verify All, Movies, and Shows; type-specific genres; search; cards; hero metadata; and detail metadata. Confirm no console errors.
