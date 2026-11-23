# Movieflix Visual Refresh Design

## Intent

Refresh the existing Movieflix project so it looks like a strong BTech graduate portfolio project: clean, coherent, responsive, and recognizably inspired by streaming services without appearing overly advanced or agency-produced.

## Goals

- Preserve the existing React/Vite client and Express/MongoDB server stack.
- Preserve authentication, movie search, genre filters, Continue Watching, My List, movie details, and trailer playback.
- Improve visual hierarchy, spacing, typography, responsive behavior, and interaction feedback.
- Make the interface feel intentionally designed while keeping the implementation easy for a graduate to understand and explain.
- Improve basic accessibility with visible focus states, useful labels, semantic controls, and readable contrast.

## Non-goals

- No backend or database redesign.
- No new UI framework, animation library, state-management library, or other major dependency.
- No advanced cinematic effects, complex carousels, recommendation engine, payments, or production-grade streaming.
- No attempt to reproduce Netflix pixel-for-pixel.

## Anti-goals

- The result must not look like an untouched Vite starter or a rough classroom exercise.
- It must also not look implausibly elaborate for a BTech graduate project.
- Existing application behavior must not be sacrificed for decorative effects.

## Constraints

- Work within the existing client components and API contract.
- Use React JSX and a maintainable global CSS file, with only small component changes where content or state is needed.
- Reuse the movie artwork supplied by the database rather than introducing a new asset pipeline.
- Ensure the main screens work on desktop and mobile.

## Approaches Considered

1. **Polished student project (selected):** A Netflix-inspired dark interface with a richer hero, refined navigation, better movie cards, improved forms, empty states, and restrained CSS transitions. This offers the best balance of portfolio quality and believable implementation complexity.
2. **Close Netflix replica:** More faithful imitation of Netflix. Rejected because it would feel less original and would add detail without demonstrating better engineering judgment.
3. **Minimal academic cleanup:** Only adjust colors, spacing, and a few components. Rejected because it would leave the project looking too basic for a portfolio piece.

## Design and Implementation Direction

- Use a near-black charcoal palette, Netflix red as the main accent, soft gray secondary text, and subtle translucent surfaces.
- Keep the Movieflix wordmark text-based and add a simple red brand mark using CSS.
- Build a sticky/fixed navigation bar that becomes more compact on small screens and clearly shows the active destination.
- Upgrade the home hero with an overlay, genre/year/rating metadata, a primary play action, and a secondary details action using existing movie data.
- Combine search and genre controls into a clean discovery area that remains usable on narrow screens.
- Present movie rows as horizontal scroll areas with larger poster-like cards, title and metadata, restrained hover elevation, and accessible controls.
- Style loading, error, no-results, and empty-list states so every application state looks intentional.
- Give the detail page a cinematic backdrop treatment around the existing YouTube trailer and make the My List action clear.
- Give login and registration a branded split-background/card treatment using CSS and existing imagery, while keeping the forms simple.
- Use ordinary CSS media queries and transitions; avoid complex animations and abstraction.

## Verification

- Run the existing client build and lint commands.
- Inspect the application at desktop and mobile widths.
- Check login/register, home browsing, search/filter display, movie detail, My List, and empty/error states for regressions where the available local data permits.

## Builder Decisions Left Open

- Exact spacing, breakpoints, and card dimensions may be tuned during visual verification.
- Existing database artwork quality may vary; CSS overlays and object positioning will provide consistent presentation without modifying the data.
