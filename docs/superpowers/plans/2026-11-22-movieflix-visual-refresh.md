# Movieflix Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Movieflix client into a polished, responsive BTech portfolio project without changing its backend or adding frontend dependencies.

**Architecture:** Keep the existing React route and component structure, enrich the rendered markup only where the visual design needs more information, and centralize the presentation in `client/src/index.css`. Reuse the existing API data and behavior so the work remains a client-side visual refresh rather than a product rewrite.

**Tech Stack:** React 19, React Router 7, Vite 8, plain CSS, existing Express/MongoDB API

**Spec:** `docs/superpowers/specs/2026-11-22-movieflix-visual-refresh-design.md`

## Global Constraints

- Preserve the existing React/Vite client and Express/MongoDB server stack.
- Preserve authentication, movie search, genre filters, Continue Watching, My List, movie details, and trailer playback.
- Add no UI framework, animation library, state-management library, or other major dependency.
- Reuse the movie artwork supplied by the database.
- Keep the implementation understandable and explainable as a BTech graduate project.
- Make desktop and mobile layouts usable with visible keyboard focus and readable contrast.
- The workspace has no Git metadata, so commit steps are replaced by build/lint checkpoints.

## Review Focus

- A movie with missing or long metadata must not break the hero or card layout; verify graceful fallbacks and wrapping in Task 2.
- Search results with no matches must display a deliberate empty state rather than an unexplained blank page; verify in Task 2.
- Navigation must remain usable at phone width with a long user name; verify responsive truncation and wrapping in Task 1.
- Detail pages must remain readable when the description is unusually long; verify constrained line length and natural page growth in Task 3.
- Authentication errors and browser autofill must remain visible and legible; verify error and autofill styles in Task 4.

---

### Task 1: Shared Visual Foundation and Navigation

**Files:**
- Modify: `client/src/index.css`
- Modify: `client/src/components/Navbar.jsx`

**Interfaces:**
- Consumes: existing `Navbar({ user, onLogout })` props and React Router links.
- Produces: the same Navbar interface with route-aware active links, compact brand markup, user avatar initial, and accessible labels used by later page styling.

- [ ] **Step 1: Establish the shared style system in `client/src/index.css`**

Define color, spacing, shadow, and typography custom properties; add reset, body, link, button, focus-visible, scrollbar, page-shell, message, and error styles. Use only system fonts and plain CSS.

- [ ] **Step 2: Upgrade `Navbar.jsx` without changing its props**

Use `NavLink` for Home and My List active states, keep the text wordmark, derive an avatar initial from `user.name`, and add `aria-label` text to the logout action.

- [ ] **Step 3: Add desktop and mobile navbar styles**

Support a translucent fixed header, responsive spacing below 768px, user-name truncation, keyboard focus, and a compact phone layout that keeps both routes reachable.

- [ ] **Step 4: Run the static checks**

Run: `npm run lint` from `client`

Expected: exit code 0 with no new JSX or accessibility-related lint failures.

Run: `npm run build` from `client`

Expected: Vite completes a production build successfully.

### Task 2: Home Discovery Experience and Movie Cards

**Files:**
- Modify: `client/src/pages/Home.jsx`
- Modify: `client/src/components/MovieRow.jsx`
- Modify: `client/src/components/MovieCard.jsx`
- Modify: `client/src/index.css`

**Interfaces:**
- Consumes: existing movie objects with `_id`, `title`, `posterUrl`, `description`, `year`, `rating`, and `genre`; existing `MovieRow({ title, movies, onRemove })` props.
- Produces: the same public component props with enriched semantic markup and graceful metadata fallbacks.

- [ ] **Step 1: Restructure the home hero in `Home.jsx`**

Keep the current visibility condition and featured-movie selection. Add a small featured label, metadata pills, a readable description, primary Play link, secondary More Info link, and layered overlay markup; use `"Movie"` for absent genre and omit missing year/rating pills.

- [ ] **Step 2: Build a unified discovery toolbar**

Wrap search and genres in a labelled section, add an inline search icon through text/CSS, provide `aria-label="Search movies"`, preserve the same state logic, and display the result count when a search or genre filter is active.

- [ ] **Step 3: Upgrade row and card semantics**

Give each row a heading group and movie count, give the scrolling area an accessible label, lazy-load card images, expose title/genre/year metadata, and keep remove behavior unchanged with a descriptive `aria-label` containing the movie title.

- [ ] **Step 4: Add home, row, and card styles**

Create a responsive hero, horizontal snap scrolling, poster-like card proportions, image fallback background, metadata truncation, restrained hover/focus elevation, styled remove control, and phone breakpoints. Long values must wrap or truncate without horizontal page overflow.

- [ ] **Step 5: Style loading, error, and no-result states**

Use a reusable centered state panel and keep the existing API error text. The no-results view must include a clear heading and suggestion to try another title or filter.

- [ ] **Step 6: Run the static checks**

Run: `npm run lint` and `npm run build` from `client`

Expected: both commands exit successfully and existing movie browsing logic still compiles.

### Task 3: Movie Detail and My List Pages

**Files:**
- Modify: `client/src/pages/MovieDetail.jsx`
- Modify: `client/src/pages/MyList.jsx`
- Modify: `client/src/index.css`

**Interfaces:**
- Consumes: existing movie detail object and `toggleList()` behavior; existing `MovieRow` interface from Task 2.
- Produces: unchanged routes and API behavior with improved page structure, list status feedback, and reusable empty-state markup.

- [ ] **Step 1: Restructure the detail page**

Keep trailer embedding and list behavior unchanged. Add a poster-derived backdrop, breadcrumb-style back link, labelled trailer frame, metadata chips, content grouping, and clearer add/remove button text with an `aria-pressed` state.

- [ ] **Step 2: Add resilient detail styles**

Use a constrained content width, responsive video ratio, readable description measure, and mobile stacking. Long descriptions must grow naturally without overlap or clipping.

- [ ] **Step 3: Improve My List states**

Add an eyebrow, page description, saved-count text, and an intentional empty panel with a Browse movies link while preserving loading, error, and populated-row behavior.

- [ ] **Step 4: Run the static checks**

Run: `npm run lint` and `npm run build` from `client`

Expected: both commands exit successfully and the detail/list routes compile with the existing API imports.

### Task 4: Authentication Screens

**Files:**
- Modify: `client/src/pages/Login.jsx`
- Modify: `client/src/pages/Register.jsx`
- Modify: `client/src/index.css`

**Interfaces:**
- Consumes: unchanged `onLogin(data)`, `loginUser(email, password)`, and `registerUser(name, email, password)` behavior.
- Produces: the same authentication flows with labelled fields, branded supporting content, visible validation/error states, and responsive presentation.

- [ ] **Step 1: Add branded authentication layout**

Wrap each existing form in a shared `auth-shell` structure with a text wordmark, short project introduction, and form heading/subheading. Keep submit logic and route links unchanged.

- [ ] **Step 2: Add explicit field labels and browser hints**

Associate labels with stable input IDs; use appropriate `name`, `autoComplete`, and minimum password length attributes. Mark server error messages with `role="alert"`.

- [ ] **Step 3: Add authentication styles**

Create a simple background using CSS gradients plus the existing `hero.png`, a readable translucent form card, visible focus/autofill states, and a single-column phone layout. Avoid advanced animation.

- [ ] **Step 4: Run the static checks**

Run: `npm run lint` and `npm run build` from `client`

Expected: both commands exit successfully; form submit signatures and `onLogin` calls remain unchanged.

### Task 5: Whole-App Verification and Cleanup

**Files:**
- Modify if needed: `client/src/index.css`
- Modify if needed: touched JSX files from Tasks 1–4

**Interfaces:**
- Consumes: all updated client components.
- Produces: a buildable, responsive visual refresh with no unused starter styling.

- [ ] **Step 1: Remove obsolete starter styles**

Confirm `client/src/App.css` is not imported; leave it untouched if unused. Remove any obsolete selectors from `index.css` that no updated component renders.

- [ ] **Step 2: Run final automated verification**

Run: `npm run lint` and `npm run build` from `client`

Expected: both commands exit with code 0 and the generated production assets are written to `client/dist`.

- [ ] **Step 3: Perform browser smoke checks**

At desktop and approximately 390px width, check Login, Register, Home, search/no-results, genre selection, Movie Detail, My List, empty states, horizontal row scrolling, keyboard focus, and long content. Existing local API availability may limit data-backed checks; record any unavailable state explicitly.

- [ ] **Step 4: Review the diff against the spec**

Confirm there are no backend changes, no new dependencies, no broken API behavior, and no unnecessarily advanced effects. Verify the result still reads as a polished graduate project.
