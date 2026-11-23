const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const read = (path) => readFileSync(join(__dirname, path), "utf8");

test("server restricts browser access with CLIENT_URL in production", () => {
  const server = read("../server.js");
  assert.match(server, /process\.env\.CLIENT_URL/);
  assert.match(server, /cors\(\{\s*origin/s);
});

test("server exposes a deployment health endpoint", () => {
  const server = read("../server.js");
  assert.match(server, /app\.get\("\/api\/health"/);
});
