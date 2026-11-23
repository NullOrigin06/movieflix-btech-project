import test from "node:test";
import assert from "node:assert/strict";

import {
  filterByType,
  getContentType,
  getGenresForType,
  getTopTitles,
  groupByGenre,
  sortNewest,
  sortTopRated,
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

test("newest titles are sorted without changing the original catalog", () => {
  const titles = [
    { title: "No year" },
    { title: "Zulu", year: 2024 },
    { title: "Alpha", year: 2024 },
    { title: "Older", year: 2018 },
  ];

  assert.deepEqual(sortNewest(titles).map((item) => item.title), [
    "Alpha",
    "Zulu",
    "Older",
    "No year",
  ]);
  assert.equal(titles[0].title, "No year");
});

test("top rated titles prefer numeric scores and safely handle missing values", () => {
  const titles = [
    { title: "Unscored", rating: "PG-13", year: 2025 },
    { title: "Strong", score: 8.8, year: 2020 },
    { title: "Best", score: 9.1, year: 2019 },
  ];

  assert.deepEqual(sortTopRated(titles).map((item) => item.title), [
    "Best",
    "Strong",
    "Unscored",
  ]);
  assert.deepEqual(getTopTitles(titles, 2).map((item) => item.title), [
    "Best",
    "Strong",
  ]);
  assert.deepEqual(getTopTitles(titles, 0), []);
});

test("catalog groups titles by genre and uses Other when genre is missing", () => {
  const groups = groupByGenre([
    { title: "Arrival", genre: "Sci-Fi" },
    { title: "Legacy" },
    { title: "Interstellar", genre: "Sci-Fi" },
  ]);

  assert.deepEqual(Object.keys(groups), ["Sci-Fi", "Other"]);
  assert.deepEqual(groups["Sci-Fi"].map((item) => item.title), [
    "Arrival",
    "Interstellar",
  ]);
  assert.equal(groups.Other[0].title, "Legacy");
});
