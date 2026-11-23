const test = require("node:test");
const assert = require("node:assert/strict");
const Movie = require("../models/Movie");
const User = require("../models/User");
const { replaceCatalog } = require("../seed");

test("existing titles without a type are movies", () => {
  assert.equal(Movie.hydrate({ title: "Legacy title" }).type, "Movie");
});

test("the schema accepts Movie and Show and rejects unknown types", async () => {
  const fields = { title: "Sample", description: "A sample title.", genre: "Drama", trailerId: "0123456789A" };
  for (const type of ["Movie", "Show"]) {
    const record = new Movie({ ...fields, type });
    assert.equal(record.type, type);
    await record.validate();
  }
  await assert.rejects(new Movie({ ...fields, type: "Episode" }).validate(), (error) => error.errors.type.kind === "enum");
});

test("reseed builds the expanded catalog and clears references safely", async (t) => {
  const operations = [];
  let catalog;
  t.mock.method(User, "updateMany", async (filter, update) => {
    operations.push(["clear references", filter, update]);
  });
  t.mock.method(Movie, "deleteMany", async (filter) => {
    operations.push(["delete catalog", filter]);
  });
  t.mock.method(Movie, "insertMany", async (records) => {
    operations.push(["insert catalog"]);
    catalog = records;
  });

  await replaceCatalog();

  await t.test("replacement removes saved and watching references before old titles", () => {
    assert.deepEqual(operations, [
      ["clear references", {}, { $set: { myList: [], watching: [] } }],
      ["delete catalog", {}],
      ["insert catalog"],
    ]);
  });
  await t.test("inserts at least 18 movies and 6 shows with usable trailer metadata", async () => {
    assert.ok(catalog.filter((entry) => entry.type === "Movie").length >= 18);
    assert.ok(catalog.filter((entry) => entry.type === "Show").length >= 6);
    assert.equal(new Set(catalog.map((entry) => entry.title)).size, catalog.length);
    for (const entry of catalog) {
      await new Movie(entry).validate();
      assert.match(entry.trailerId, /^[A-Za-z0-9_-]{11}$/);
      assert.equal(entry.posterUrl, `https://img.youtube.com/vi/${entry.trailerId}/hqdefault.jpg`);
    }
  });
});
