import { execFileSync } from "node:child_process";
import { describe, it } from "node:test";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import path from "node:path";

const bin = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../bin/logos.js"
);

describe("logos CLI", () => {
  it("prints help when called with no arguments", () => {
    try {
      execFileSync("node", [bin], { encoding: "utf-8", stdio: "pipe" });
      assert.fail("should have exited with non-zero");
    } catch (err) {
      assert.match(err.stderr || err.stdout, /Usage/);
    }
  });
});
