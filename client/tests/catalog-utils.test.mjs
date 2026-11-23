import test from "node:test";
import assert from "node:assert/strict";

import {
  filterByType,
  getContentType,
  getGenresForType,
} from "../src/catalogUtils.js";

const catalog = [
  { title: "Arrival", type: "Movie", genre: "Sci-Fi" },
  { title: "Dark", type: "Show", genre: "Sci-Fi" },
  { title: "Legacy title", genre: "Drama" },
  { title: "Wednesday", type: "Show", genre: "Mystery" },
];

test("legacy catalog entries are treated as movies", () => {
  assert.equal(getContentType(catalog[2]), "Movie");
});

test("catalog can be filtered by movie or show type", () => {
  assert.deepEqual(filterByType(catalog, "Movie").map((item) => item.title), [
    "Arrival",
    "Legacy title",
  ]);
  assert.deepEqual(filterByType(catalog, "Show").map((item) => item.title), [
    "Dark",
    "Wednesday",
  ]);
  assert.equal(filterByType(catalog, "All").length, catalog.length);
});

test("genres are unique and scoped to the selected content type", () => {
  assert.deepEqual(getGenresForType(catalog, "Show"), ["Sci-Fi", "Mystery"]);
  assert.deepEqual(getGenresForType(catalog, "Movie"), ["Sci-Fi", "Drama"]);
});
