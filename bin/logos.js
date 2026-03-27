#!/usr/bin/env node
import { program } from "commander";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { init } from "../src/init.js";
import { status } from "../src/status.js";
import { update } from "../src/update.js";

const pkg = JSON.parse(
  readFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../package.json"),
    "utf-8"
  )
);

program
  .name("logos")
  .description("Scaffold AI research projects with staged workflows")
  .version(pkg.version)
  .argument("[project-name]", "Name of the research project to create")
  .option("--status", "Show current research stage")
  .option("--update", "Update Orchestra Research skills")
  .option("--no-onboard", "Skip interactive onboarding")
  .action((projectName, options) => {
    if (options.status) {
      status();
      return;
    }
    if (options.update) {
      update();
      return;
    }
    if (!projectName) {
      program.help({ error: true });
    }
    init(projectName, { onboard: options.onboard }).catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  });

program.parse();
