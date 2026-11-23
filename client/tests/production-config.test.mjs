import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("API base URL can be supplied by the production build", () => {
  const api = read("../src/api.js");
  assert.match(api, /import\.meta\.env\.VITE_API_URL/);
  assert.match(api, /http:\/\/localhost:5000\/api/);
});

test("Render blueprint defines the client, API, and SPA rewrite", () => {
  const blueprint = read("../../render.yaml");
  assert.match(blueprint, /type:\s*web/);
  assert.match(blueprint, /runtime:\s*static/);
  assert.match(blueprint, /VITE_API_URL/);
  assert.match(blueprint, /type:\s*rewrite/);
});
