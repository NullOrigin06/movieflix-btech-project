const test = require("node:test");
const assert = require("node:assert/strict");

const { findMissingTitles, seedCatalogIfEmpty } = require("../catalogStartup");

test("finds only titles that are not already in the catalog", () => {
  const existing = [
    { title: "Inception", type: "Movie" },
    { title: "Dark", type: "Show" },
  ];
  const desired = [
    { title: "Inception", type: "Movie" },
    { title: "Dark", type: "Show" },
    { title: "Oppenheimer", type: "Movie" },
    { title: "Money Heist", type: "Show" },
  ];

  assert.deepEqual(findMissingTitles(existing, desired), [
    { title: "Oppenheimer", type: "Movie" },
    { title: "Money Heist", type: "Show" },
  ]);
});

test("seeds a brand-new database exactly once", async () => {
  const catalog = [];

  const seeded = await seedCatalogIfEmpty({
    countTitles: async () => catalog.length,
    seedCatalog: async () => catalog.push("seeded"),
  });

  assert.equal(seeded, true);
  assert.deepEqual(catalog, ["seeded"]);
});

test("keeps an existing catalog unchanged", async () => {
  const catalog = ["existing"];

  const seeded = await seedCatalogIfEmpty({
    countTitles: async () => catalog.length,
    seedCatalog: async () => catalog.push("seeded"),
  });

  assert.equal(seeded, false);
  assert.deepEqual(catalog, ["existing"]);
});
