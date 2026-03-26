import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, readFileSync } from "node:fs";
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

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

import * as templates from "../src/templates/index.js";

describe("templates", () => {
  it("exports all required templates", () => {
    const required = [
      "claudeMd",
      "agendaMd",
      "setupMd",
      "readmeMd",
      "envExample",
      "gitignore",
    ];
    for (const name of required) {
      assert.ok(typeof templates[name] === "function", `missing template: ${name}`);
    }
  });

  it("agenda.md includes TEMPLATE sentinel", () => {
    const content = templates.agendaMd();
    assert.match(content, /<!-- TEMPLATE -->/);
  });

  it("setup.md includes TEMPLATE sentinel", () => {
    const content = templates.setupMd();
    assert.match(content, /<!-- TEMPLATE -->/);
  });

  it("CLAUDE.md includes stage workflow rules", () => {
    const content = templates.claudeMd();
    assert.match(content, /stages\//);
    assert.match(content, /agenda\.md/);
    assert.match(content, /setup\.md/);
  });

  it("readme template accepts project name", () => {
    const content = templates.readmeMd("my-project");
    assert.match(content, /my-project/);
  });
});

describe("logos init", () => {
  let tmpDir;
  let projectDir;

  beforeEach(() => {
    tmpDir = mkdtempSync(path.join(os.tmpdir(), "logos-test-"));
    projectDir = path.join(tmpDir, "test-project");
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("creates the project directory with all expected files", () => {
    execFileSync("node", [bin, "test-project"], {
      cwd: tmpDir,
      encoding: "utf-8",
      stdio: "pipe",
    });

    assert.ok(existsSync(projectDir));
    assert.ok(existsSync(path.join(projectDir, ".logos")));
    assert.ok(existsSync(path.join(projectDir, "CLAUDE.md")));
    assert.ok(existsSync(path.join(projectDir, "agenda.md")));
    assert.ok(existsSync(path.join(projectDir, "setup.md")));
    assert.ok(existsSync(path.join(projectDir, "README.md")));
    assert.ok(existsSync(path.join(projectDir, ".env.example")));
    assert.ok(existsSync(path.join(projectDir, ".gitignore")));
    assert.ok(existsSync(path.join(projectDir, ".git")));
  });

  it("creates empty directories", () => {
    execFileSync("node", [bin, "test-project"], {
      cwd: tmpDir,
      encoding: "utf-8",
      stdio: "pipe",
    });

    for (const dir of ["stages", "papers", "experiments", "notes", "data"]) {
      assert.ok(existsSync(path.join(projectDir, dir)));
    }
  });

  it("agenda.md has TEMPLATE sentinel", () => {
    execFileSync("node", [bin, "test-project"], {
      cwd: tmpDir,
      encoding: "utf-8",
      stdio: "pipe",
    });

    const content = readFileSync(path.join(projectDir, "agenda.md"), "utf-8");
    assert.match(content, /<!-- TEMPLATE -->/);
  });

  it("fails if directory already exists", () => {
    execFileSync("node", [bin, "test-project"], {
      cwd: tmpDir,
      encoding: "utf-8",
      stdio: "pipe",
    });

    assert.throws(() => {
      execFileSync("node", [bin, "test-project"], {
        cwd: tmpDir,
        encoding: "utf-8",
        stdio: "pipe",
      });
    });
  });
});
