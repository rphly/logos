import { existsSync } from "node:fs";
import path from "node:path";

const STAGES = [
  { file: "1-research.md", name: "research" },
  { file: "2-experimentation.md", name: "experimentation" },
  { file: "3-analysis.md", name: "analysis" },
  { file: "4-writing.md", name: "writing" },
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

  console.log("\nResearch Progress:\n");
  for (const stage of STAGES) {
    const key = stage.file.replace(".md", "");
    const done = completed.includes(key);
    const current = stage.name === currentStage;
    const marker = done ? "✓" : current ? "→" : " ";
    console.log(`  ${marker} ${stage.name}`);
  }

  if (!currentStage) {
    console.log("\n  All stages complete.\n");
  } else {
    console.log(`\n  Current stage: ${currentStage}\n`);
  }
}
