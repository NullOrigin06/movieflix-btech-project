# Netflix-Inspired MovieFlix Browse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a richer Netflix-inspired browsing experience with dedicated discovery pages and at least 40 seeded titles.

**Architecture:** Fetch the catalog through one reusable hook, derive display collections with tested pure helpers, and render shared hero/card/grid components across route-specific pages. Keep the backend API and schema unchanged while expanding seed data.

**Tech Stack:** React 19, React Router 7, Vite 8, CSS, Node built-in test runner, Express 5, Mongoose 9, MongoDB

**Spec:** `docs/superpowers/specs/2026-11-23-netflix-inspired-browse-design.md`

## Global Constraints

- Preserve the current React, Express, and MongoDB stack.
- Add no UI framework, state manager, carousel package, or external movie API.
- Keep code readable for a BTech graduate project.
- Preserve authentication, My List, Continue Watching, and title-detail behavior.
- Seed at least 40 titles, including at least 28 movies and 12 shows.

## Review Focus

- An empty catalog renders a useful state instead of accessing an undefined featured title.
- Unknown or missing `type`, `genre`, `year`, and `rating` values do not break grouping or cards.
- Search treats user text as ordinary text and provides a clear empty query state.
- Rapid navigation or unmounting ignores superseded catalog responses.
- Navigation and cards remain usable on narrow screens and with reduced motion.

---

### Task 1: Catalog selectors and shared loading hook

**Files:**
- Modify: `client/src/catalogUtils.js`
- Create: `client/src/hooks/useCatalog.js`
- Test: `client/tests/catalog-utils.test.mjs`

**Interfaces:**
- Produces: `sortNewest(items)`, `sortTopRated(items)`, `getTopTitles(items, limit)`, `groupByGenre(items)`, and `useCatalog()` returning `{ movies, loading, error }`.

- [ ] Add failing tests for deterministic sorting, limits, genre grouping, and missing fields.
- [ ] Run `npm run test:ui` in `client`; expect the new selector tests to fail.
- [ ] Implement the selectors and cancellation-safe `useCatalog` hook.
- [ ] Run `npm run test:ui`; expect all catalog tests to pass.

### Task 2: Reusable streaming UI and browse pages

**Files:**
- Create: `client/src/components/HeroBanner.jsx`
- Create: `client/src/components/CatalogGrid.jsx`
- Create: `client/src/pages/CatalogPage.jsx`
- Create: `client/src/pages/NewAndPopular.jsx`
- Create: `client/src/pages/Search.jsx`
- Modify: `client/src/components/MovieCard.jsx`
- Modify: `client/src/components/MovieRow.jsx`
- Modify: `client/src/pages/Home.jsx`
- Test: `client/tests/ui-contract.test.mjs`

**Interfaces:**
- Consumes: Task 1 selectors and `useCatalog()`.
- Produces: reusable hero, row, card, grid, and page structures for all browse routes.

- [ ] Add failing source-contract tests for hero reuse, catalog pages, search query handling, top-10 display, and state panels.
- [ ] Run `npm run test:ui`; expect the new UI contract tests to fail.
- [ ] Implement shared components and the Home, Catalog, New & Popular, and Search page behavior.
- [ ] Run `npm run test:ui`; expect the UI tests to pass.

### Task 3: Routes, navigation, and responsive styling

**Files:**
- Modify: `client/src/App.jsx`
- Modify: `client/src/components/Navbar.jsx`
- Modify: `client/src/index.css`
- Test: `client/tests/ui-contract.test.mjs`

**Interfaces:**
- Consumes: Task 2 pages.
- Produces: `/movies`, `/shows`, `/new`, and `/search?q=` routes with responsive navigation.

- [ ] Add failing assertions for all routes, navigation labels, accessible search control, mobile layout, and reduced motion.
- [ ] Run `npm run test:ui`; expect route/style assertions to fail.
- [ ] Wire routes, add the expandable search field, and implement the responsive Netflix-inspired visual system.
- [ ] Run `npm run test:ui` and `npm run lint`; expect both to pass.

### Task 4: Expanded MongoDB seed catalog

**Files:**
- Modify: `server/seed.js`
- Modify: `server/tests/catalog.test.js`

**Interfaces:**
- Produces: at least 28 movie seed records and 12 show seed records using the existing Movie schema.

- [ ] Add a failing seed-count test that checks total and per-type minimums.
- [ ] Run `node --test tests/*.test.js` in `server`; expect the count test to fail.
- [ ] Add varied movie and show seed records with valid trailer IDs and descriptions.
- [ ] Run `node --test tests/*.test.js`; expect all server tests to pass.

### Task 5: Full verification and documentation

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: all prior tasks.
- Produces: verified build and current page/catalog documentation.

- [ ] Update the feature list and route descriptions in `README.md`.
- [ ] Run client tests, server tests, client lint, and client production build.
- [ ] Start the local server and client, then inspect desktop and mobile layouts for overflow and broken states.
- [ ] Review the final diff for accidental unrelated changes and record the verification evidence.
