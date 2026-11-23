import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = () => read("../src/index.css");

test("navigation exposes active links, avatar, and responsive styles", () => {
  const navbar = read("../src/components/Navbar.jsx");
  assert.match(navbar, /NavLink/);
  assert.match(navbar, /user-avatar/);
  assert.match(navbar, /aria-label=.*Log out/);
  assert.match(css(), /\.nav-link\.active/);
  assert.match(css(), /@media \(max-width: 768px\)/);
});

test("home exposes featured metadata, curated rows, and intentional empty state", () => {
  const home = read("../src/pages/Home.jsx");
  const row = read("../src/components/MovieRow.jsx");
  const card = read("../src/components/MovieCard.jsx");
  assert.match(home, /HeroBanner/);
  assert.match(home, /Trending Now/);
  assert.match(home, /No titles are available/);
  assert.match(row, /aria-label=.*titles/);
  assert.match(row, /row-track/);
  assert.match(card, /loading="lazy"/);
  assert.match(card, /card-meta/);
  assert.match(card, /card-match/);
  assert.match(css(), /scroll-snap-type/);
});

test("home limits curated rows and groups genres", () => {
  const home = read("../src/pages/Home.jsx");
  assert.match(home, /groupByGenre/);
  assert.match(home, /slice\(0, 10\)/);
  assert.match(home, /slice\(0, 3\)/);
});

test("movie requests ignore superseded responses", () => {
  const hook = read("../src/hooks/useCatalog.js");
  assert.match(hook, /let cancelled = false/);
  assert.match(hook, /if \(cancelled\) return/);
  assert.match(hook, /cancelled = true/);
});

test("long movie values stay inside cards and wrap in full-text views", () => {
  const styles = css();
  assert.match(styles, /\.card-wrapper[^}]*min-width:\s*0/s);
  assert.match(styles, /overflow-wrap:\s*anywhere/);
});

test("detail and list pages expose accessible status and empty-state controls", () => {
  const detail = read("../src/pages/MovieDetail.jsx");
  const list = read("../src/pages/MyList.jsx");
  assert.match(detail, /aria-pressed/);
  assert.match(detail, /detail-backdrop/);
  assert.match(detail, /movie-description/);
  assert.match(list, /Browse titles/);
  assert.match(list, /page-eyebrow/);
  assert.match(css(), /\.detail-content/);
});

test("mixed catalog collections use title wording", () => {
  const list = read("../src/pages/MyList.jsx");
  const row = read("../src/components/MovieRow.jsx");
  assert.match(list, /Titles you saved for later/);
  assert.match(list, /Open a title/);
  assert.match(list, /Saved titles/);
  assert.match(row, /aria-label=\{`\$\{title\} titles`\}/);
});

test("authentication fields are labelled and retain autofill readability", () => {
  const login = read("../src/pages/Login.jsx");
  const register = read("../src/pages/Register.jsx");
  assert.match(login, /htmlFor="login-email"/);
  assert.match(login, /autoComplete="current-password"/);
  assert.match(login, /role="alert"/);
  assert.match(register, /htmlFor="register-name"/);
  assert.match(register, /autoComplete="new-password"/);
  assert.match(register, /minLength=\{6\}/);
  assert.match(css(), /:-webkit-autofill/);
});

test("browse pages reuse the streaming hero and catalog grid", () => {
  const hero = read("../src/components/HeroBanner.jsx");
  const grid = read("../src/components/CatalogGrid.jsx");
  const catalogPage = read("../src/pages/CatalogPage.jsx");
  const home = read("../src/pages/Home.jsx");

  assert.match(hero, /hero-actions/);
  assert.match(hero, /getContentType/);
  assert.match(grid, /catalog-grid/);
  assert.match(catalogPage, /genre-buttons/);
  assert.match(catalogPage, /No .* found/);
  assert.match(home, /HeroBanner/);
  assert.match(home, /Trending Now/);
});

test("new and popular page includes recent rows and a numbered top ten", () => {
  const page = read("../src/pages/NewAndPopular.jsx");
  assert.match(page, /New Releases/);
  assert.match(page, /Top 10 Today/);
  assert.match(page, /top-ten-number/);
  assert.match(page, /state-panel/);
});

test("search page reads the query parameter and handles empty and no-result states", () => {
  const page = read("../src/pages/Search.jsx");
  assert.match(page, /useSearchParams/);
  assert.match(page, /Start typing to search/);
  assert.match(page, /No matches found/);
  assert.match(page, /CatalogGrid/);
});

test("app routes and navigation expose every discovery page", () => {
  const app = read("../src/App.jsx");
  const navbar = read("../src/components/Navbar.jsx");

  for (const route of ["/movies", "/shows", "/new", "/search"]) {
    assert.match(app, new RegExp(`path="${route}"`));
  }
  assert.match(navbar, />TV Shows</);
  assert.match(navbar, />Movies</);
  assert.match(navbar, />New &amp; Popular</);
  assert.match(navbar, /aria-label="Search MovieFlix"/);
  assert.match(navbar, /navigate\(`\/search\?q=/);
});

test("streaming layout has grid, mobile navigation, and reduced-motion styles", () => {
  const styles = css();
  assert.match(styles, /\.catalog-grid/);
  assert.match(styles, /\.top-ten-number/);
  assert.match(styles, /\.nav-search/);
  assert.match(styles, /@media \(max-width: 768px\)/);
  assert.match(styles, /overflow-x:\s*auto/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

