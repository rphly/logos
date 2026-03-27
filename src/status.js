import { existsSync } from "node:fs";
import path from "node:path";
import { banner, divider, dim, green, white, cyan, bold } from "./ui.js";

const STAGES = [
  { file: "1-research.md", name: "Research" },
  { file: "2-experimentation.md", name: "Experimentation" },
  { file: "3-analysis.md", name: "Analysis" },
  { file: "4-writing.md", name: "Writing" },
];

export function getStatus(dir) {
  const stagesDir = path.join(dir, "stages");
  const completed = [];

  for (const stage of STAGES) {
    if (existsSync(path.join(stagesDir, stage.file))) {
      completed.push(stage.file.replace(".md", ""));
    }
  }

  const nextStage = STAGES.find(
    (s) => !existsSync(path.join(stagesDir, s.file))
  );

  return {
    currentStage: nextStage ? nextStage.name : null,
    completed,
  };
}

export function status(dir = process.cwd()) {
  if (!existsSync(path.join(dir, ".logos"))) {
    console.error("Error: not a logos project (no .logos file found).");
    process.exit(1);
  }

  const { currentStage, completed } = getStatus(dir);

  banner();
  console.log(`  ${bold("Progress")}`);
  console.log();

  for (const stage of STAGES) {
    const key = stage.file.replace(".md", "");
    const done = completed.includes(key);
    const current = stage.name === currentStage;

    if (done) {
      console.log(`  ${green("✓")} ${dim(stage.name)}`);
    } else if (current) {
      console.log(`  ${cyan("›")} ${white(stage.name)} ${dim("← you are here")}`);
    } else {
      console.log(`  ${dim("·")} ${dim(stage.name)}`);
    }
  }

  console.log();

  if (!currentStage) {
    console.log(`  ${green("All stages complete.")}`);
  }

  divider();
  console.log();
}
