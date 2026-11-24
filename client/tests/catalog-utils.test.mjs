import test from "node:test";
import assert from "node:assert/strict";

import {
  filterByType,
  getContentType,
  getActiveGenre,
  getGenresForType,
  getTopTitles,
  groupByGenre,
  sortNewest,
  sortTopRated,
  sortTitles,
  getRelatedTitles,
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

test("genre grouping accepts names inherited by ordinary objects", () => {
  const groups = groupByGenre([
    { title: "First", genre: "constructor" },
    { title: "Second", genre: "toString" },
  ]);

  assert.equal(groups.constructor[0].title, "First");
  assert.equal(groups.toString[0].title, "Second");
});

test("an unavailable genre falls back to All when content type changes", () => {
  assert.equal(getActiveGenre("Romance", ["Drama", "Sci-Fi"]), "All");
  assert.equal(getActiveGenre("Drama", ["Drama", "Sci-Fi"]), "Drama");
  assert.equal(getActiveGenre("All", ["Drama"]), "All");
});

const sample = [
  { _id: "1", title: "Beta", type: "Movie", genre: "Drama", year: 2020 },
  { _id: "2", title: "alpha", type: "Movie", genre: "Drama", year: 2022 },
  { _id: "3", title: "Gamma", type: "Show", genre: "Drama", year: 2022 },
  { _id: "4", title: "Delta", type: "Movie", genre: "Action", year: 2018 },
];

test("sortTitles orders by year or title without changing the input", () => {
  const input = [...sample];
  assert.deepEqual(sortTitles(input, "newest").map((i) => i._id), ["2", "3", "1", "4"]);
  assert.deepEqual(sortTitles(input, "oldest").map((i) => i._id), ["4", "1", "2", "3"]);
  assert.deepEqual(sortTitles(input, "az").map((i) => i._id), ["2", "1", "4", "3"]);
  assert.deepEqual(sortTitles(input, "za").map((i) => i._id), ["3", "4", "1", "2"]);
  assert.deepEqual(sortTitles(input, "unknown").map((i) => i._id), ["1", "2", "3", "4"]);
  assert.deepEqual(input.map((i) => i._id), ["1", "2", "3", "4"]);
});

test("getRelatedTitles prefers the same genre, then the same type, and skips the title itself", () => {
  assert.deepEqual(getRelatedTitles(sample, sample[0]).map((i) => i._id), ["2", "3", "4"]);
  assert.deepEqual(getRelatedTitles(sample, sample[3]).map((i) => i._id), ["2", "1"]);
  assert.deepEqual(getRelatedTitles(sample, sample[0], 1).map((i) => i._id), ["2"]);
  assert.deepEqual(getRelatedTitles(sample, null), []);
});
