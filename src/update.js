import { existsSync } from "node:fs";
import path from "node:path";
import { gitSubmoduleUpdate } from "./git.js";

export function findLogosRoot(dir) {
  if (existsSync(path.join(dir, ".logos"))) {
    return dir;
  }
  throw new Error("Error: not a logos project (no .logos file found).");
}

export function update(dir = process.cwd()) {
  const root = findLogosRoot(dir);

  console.log("Updating Orchestra Research skills...");
  try {
    gitSubmoduleUpdate(root);
    console.log("Skills updated successfully.");
  } catch (err) {
    console.error("Failed to update skills. Check your network connection.");
    process.exit(1);
  }
}
