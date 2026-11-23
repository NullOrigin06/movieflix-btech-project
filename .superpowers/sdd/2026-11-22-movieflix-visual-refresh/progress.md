# SDD ledger — plan: docs/superpowers/plans/2026-11-22-movieflix-visual-refresh.md

Setup: Ruling: Git isolation and task commits are unavailable because the supplied workspace is not a Git repository — work in place and retain the plan/spec/ledger as the audit trail — cost if wrong: changes cannot be separated or reverted through Git.
Setup: Ruling: Use Node's built-in test runner for lightweight source contracts, then lint, production build, and browser smoke checks for behavior and presentation — the project has no browser-test dependency and the approved design forbids adding major dependencies — cost if wrong: source contracts cannot detect every visual regression.
Pre-flight: Task 1 produces shared navigation markup/classes consumed by shared CSS; selectors will be kept in `index.css`.
Pre-flight: Task 2 produces the `MovieRow` and `MovieCard` markup consumed by Task 3's My List page; public props remain unchanged.
Pre-flight: Tasks 1–4 share global CSS; each task uses page-specific class prefixes to avoid selector conflicts.

Task 1: complete (no Git commits available, tests: npm run test:ui + npm run lint + npm run build → UI contract pass, lint exit 0 with one existing Home effect warning, build pass).
Task 2: complete (no Git commits available, tests: npm run test:ui + npm run lint + npm run build → UI contract pass, lint exit 0 with one existing Home effect warning, build pass).
Task 3: complete (no Git commits available, tests: npm run test:ui + npm run lint + npm run build → UI contract pass, lint exit 0 with one existing Home effect warning, build pass).
Task 4: complete (no Git commits available, tests: npm run test:ui + npm run lint + npm run build → UI contract pass, lint exit 0 with one existing Home effect warning, build pass).
Task 5: Ruling: Browser QA covered desktop and 390px Login plus mobile Register structure and console; authenticated screens were verified by contracts/build because no test account credentials were provided and creating an account would add persistent database data — cost if wrong: data-backed layout issues may require a later visual adjustment after the user signs in.
Task 5: complete (tests: npm run test:ui → 4/4 pass; npm run lint → exit 0 with one existing warning; npm run build → Vite build pass; HTTP smoke → client 200 and API 200; browser console → 0 errors/warnings on auth routes).
Final: fixed discovery/header overlap — filtered discovery contract RED→GREEN, suite 7/7.
Final: fixed incorrect genre result count — filtered discovery contract RED→GREEN, suite 7/7.
Final: fixed superseded search response race — request cancellation contract RED→GREEN, suite 7/7.
Final: fixed long-value overflow — long-value layout contract RED→GREEN, suite 7/7.
Final: minor (deferred): Normalize missing genres and expose the active genre with aria-pressed.
Final: minor (deferred): Use a functional Continue Watching state update for rapid consecutive removals.
Final: minor (deferred): Replace source-string UI contracts with browser interaction coverage when a browser-test dependency is appropriate.
Final review: independent fresh-context reviewer completed; all Critical/Important findings fixed in one pass.

