import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { checkGit, gitInit, gitAdd, gitCommit, gitAddSubmodule } from "../src/git.js";

describe("git helpers", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), "logos-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("checkGit does not throw when git is available", () => {
    assert.doesNotThrow(() => checkGit());
  });

  it("gitInit creates a .git directory", () => {
    gitInit(tmpDir);
    assert.ok(existsSync(path.join(tmpDir, ".git")));
  });
});
