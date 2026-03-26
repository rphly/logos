import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { getStatus } from "../src/status.js";

describe("status", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), "logos-test-"));
    writeFileSync(path.join(tmpDir, ".logos"), "");
    mkdirSync(path.join(tmpDir, "stages"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("reports no stages complete when stages/ is empty", () => {
    const result = getStatus(tmpDir);
    assert.strictEqual(result.currentStage, "research");
    assert.strictEqual(result.completed.length, 0);
  });

  it("reports experimentation as current when research is complete", () => {
    writeFileSync(path.join(tmpDir, "stages", "1-research.md"), "# Done");
    const result = getStatus(tmpDir);
    assert.strictEqual(result.currentStage, "experimentation");
    assert.deepStrictEqual(result.completed, ["1-research"]);
  });

  it("reports all complete when all stage files exist", () => {
    for (const f of ["1-research.md", "2-experimentation.md", "3-analysis.md", "4-writing.md"]) {
      writeFileSync(path.join(tmpDir, "stages", f), "# Done");
    }
    const result = getStatus(tmpDir);
    assert.strictEqual(result.currentStage, null);
    assert.strictEqual(result.completed.length, 4);
  });
});
