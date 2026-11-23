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

test("production pins a Node version supported by Vite and Mongoose", () => {
  const serverPackage = require("../package.json");
  const clientPackage = require("../../client/package.json");
  const renderBlueprint = read("../../render.yaml");
  assert.equal(serverPackage.engines.node, ">=22.12.0");
  assert.equal(clientPackage.engines.node, ">=22.12.0");
  assert.match(renderBlueprint, /key:\s*NODE_VERSION[\s\S]*value:\s*22\.12\.0/);
});
