#!/usr/bin/env node
import { program } from "commander";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

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
  .action((projectName, options) => {
    if (options.status) {
      console.error("--status not yet implemented");
      process.exit(1);
    }
    if (options.update) {
      console.error("--update not yet implemented");
      process.exit(1);
    }
    if (!projectName) {
      program.help({ error: true });
    }
    console.log(`TODO: scaffold ${projectName}`);
  });

program.parse();
