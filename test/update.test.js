import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { findLogosRoot } from "../src/update.js";

describe("update", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), "logos-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("findLogosRoot throws when not in a logos project", () => {
    assert.throws(() => findLogosRoot(tmpDir), /not a logos project/);
  });

  it("findLogosRoot returns dir when .logos exists", () => {
    writeFileSync(path.join(tmpDir, ".logos"), "");
    assert.strictEqual(findLogosRoot(tmpDir), tmpDir);
  });
});
