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
