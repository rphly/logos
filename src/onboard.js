import { createInterface } from "node:readline";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { section, prompt, success, info, done, dim, cyan } from "./ui.js";

function ask(rl, text) {
  return new Promise((resolve) => {
    rl.question(prompt(text), (answer) => resolve(answer.trim()));
  });
}

export async function onboard(projectDir) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  section("Research Agenda");
  info("Tell me about your research.\n");

  const topic = await ask(rl, "What are you researching");
  const motivation = await ask(rl, "Why does this matter");
  const questions = await ask(rl, "Key questions " + dim("(comma-separated)"));
  const goals = await ask(rl, "What does success look like");
  const references = await ask(rl, "Starting references " + dim("(optional)"));

  const questionList = questions
    .split(",")
    .map((q) => `- ${q.trim()}`)
    .join("\n");

  const agenda = `# Research Agenda

## Overview
${topic}

${motivation}

## Questions
${questionList}

## Goals
${goals}

## References
${references || "None yet."}
`;

  writeFileSync(path.join(projectDir, "agenda.md"), agenda);
  success("agenda.md");

  section("Infrastructure Setup");
  info("How will you run experiments?\n");

  const compute = await ask(rl, "Compute " + dim("(e.g. local GPU, Lambda, Modal)"));
  const storage = await ask(rl, "Storage " + dim("(e.g. HuggingFace Hub, S3)"));
  const tracking = await ask(rl, "Experiment tracking " + dim("(e.g. W&B, none)"));
  const tools = await ask(rl, "Other tools " + dim("(optional)"));

  const setup = `# Research Setup

## Compute
${compute || "Not specified."}

## Storage
${storage || "Not specified."}

## Tracking
${tracking || "Not specified."}

## Other Tools
${tools || "None."}
`;

  writeFileSync(path.join(projectDir, "setup.md"), setup);
  success("setup.md");

  rl.close();

  done("Onboarding complete");
  info("Open in your AI coding agent to begin research.");
  info(`The agent will review your answers and ask follow-up questions.`);
  console.log();
  console.log(`  ${dim("$")} ${cyan("cd " + path.basename(projectDir))}`);
  console.log(`  ${dim("$")} ${cyan("claude")}`);
  console.log();
}
