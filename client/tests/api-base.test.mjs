import test from "node:test";
import assert from "node:assert/strict";

import { resolveApiBase } from "../src/apiBase.js";

test("repairs the pre-deployment Render API hostname", () => {
  assert.equal(
    resolveApiBase("https://movieflix-api.onrender.com/api"),
    "https://movieflix-api-gvet.onrender.com/api",
  );
});

test("keeps valid configured API hostnames", () => {
  assert.equal(
    resolveApiBase("https://example-api.onrender.com/api/"),
    "https://example-api.onrender.com/api",
  );
});
