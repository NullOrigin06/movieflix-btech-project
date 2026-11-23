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

test("home exposes featured metadata, discovery controls, and intentional empty state", () => {
  const home = read("../src/pages/Home.jsx");
  const row = read("../src/components/MovieRow.jsx");
  const card = read("../src/components/MovieCard.jsx");
  assert.match(home, /featured-label/);
  assert.match(home, /discovery-panel/);
  assert.match(home, /No movies found/);
  assert.match(row, /aria-label=.*movies/);
  assert.match(card, /loading="lazy"/);
  assert.match(card, /card-meta/);
  assert.match(css(), /scroll-snap-type/);
});

test("filtered discovery avoids header overlap and reports the displayed count", () => {
  const home = read("../src/pages/Home.jsx");
  assert.match(home, /const showHero =/);
  assert.match(home, /const displayedMovieCount =/);
  assert.match(home, /with-hero/);
  assert.match(css(), /\.discovery-panel\.with-hero/);
});

test("movie requests ignore superseded responses", () => {
  const home = read("../src/pages/Home.jsx");
  assert.match(home, /let cancelled = false/);
  assert.match(home, /if \(cancelled\) return/);
  assert.match(home, /cancelled = true/);
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
  assert.match(list, /Browse movies/);
  assert.match(list, /page-eyebrow/);
  assert.match(css(), /\.detail-content/);
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

