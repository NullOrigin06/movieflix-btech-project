const test = require("node:test");
const assert = require("node:assert/strict");

const { seedCatalogIfEmpty } = require("../catalogStartup");

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
