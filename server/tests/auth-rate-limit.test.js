const test = require("node:test");
const assert = require("node:assert/strict");
const authRouter = require("../routes/auth");

test("authentication attempts are limited per client", () => {
  authRouter.resetAuthAttempts();
  const req = { ip: "203.0.113.10" };
  let nextCalls = 0;
  const response = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  for (let attempt = 0; attempt < 20; attempt += 1) {
    authRouter.authRateLimit(req, response, () => { nextCalls += 1; });
  }
  authRouter.authRateLimit(req, response, () => { nextCalls += 1; });

  assert.equal(nextCalls, 20);
  assert.equal(response.statusCode, 429);
  assert.match(response.body.message, /too many/i);
});
