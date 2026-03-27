import { existsSync } from "node:fs";
import path from "node:path";
import { gitSubmoduleUpdate } from "./git.js";
import { step, success, error } from "./ui.js";

export function findLogosRoot(dir) {
  if (existsSync(path.join(dir, ".logos"))) {
    return dir;
  }
  throw new Error("Error: not a logos project (no .logos file found).");
}

export function update(dir = process.cwd()) {
  const root = findLogosRoot(dir);

  step("Updating research skills");
  try {
    gitSubmoduleUpdate(root);
    success("Skills updated");
  } catch (err) {
    error("Failed to update skills. Check your network connection.");
    process.exit(1);
  }
}
