import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { checkGit, gitInit, gitAdd, gitCommit, gitAddSubmodule } from "./git.js";
import { onboard } from "./onboard.js";
import * as templates from "./templates/index.js";
import { banner, step, success, warn, info, dim } from "./ui.js";

const pkg = JSON.parse(
  readFileSync(
    path.resolve(path.dirname(new URL(import.meta.url).pathname), "../package.json"),
    "utf-8"
  )
);

const SKILLS_REPO = "https://github.com/Orchestra-Research/AI-Research-SKILLs.git";
const SKILLS_DEST = ".claude/skills";

export async function init(projectName, { onboard: runOnboard = true } = {}, cwd = process.cwd()) {
  checkGit();

  const projectDir = path.resolve(cwd, projectName);

  if (existsSync(projectDir)) {
    console.error(`Error: directory '${projectName}' already exists.`);
    process.exit(1);
  }

  banner("from idea to paper");

  step(`Creating ${projectName}`);

  // Create directories
  mkdirSync(projectDir, { recursive: true });
  for (const dir of ["stages", "papers", "experiments", "notes", "data", ".claude"]) {
    mkdirSync(path.join(projectDir, dir), { recursive: true });
  }

  // Write files
  writeFileSync(path.join(projectDir, ".logos"), pkg.version);
  writeFileSync(path.join(projectDir, "AGENT.md"), templates.agentMd());
  writeFileSync(path.join(projectDir, "CLAUDE.md"), templates.claudeMd());
  writeFileSync(path.join(projectDir, ".claude/settings.json"), templates.claudeSettings());
  writeFileSync(path.join(projectDir, "agenda.md"), templates.agendaMd());
  writeFileSync(path.join(projectDir, "setup.md"), templates.setupMd());
  writeFileSync(path.join(projectDir, "README.md"), templates.readmeMd(projectName));
  writeFileSync(path.join(projectDir, ".env.example"), templates.envExample());
  writeFileSync(path.join(projectDir, ".gitignore"), templates.gitignore());

  // Add .gitkeep to empty directories so git tracks them
  for (const dir of ["stages", "papers", "experiments", "notes", "data"]) {
    writeFileSync(path.join(projectDir, dir, ".gitkeep"), "");
  }

  success("Project scaffolded");

  // Initialize git
  step("Initializing git");
  gitInit(projectDir);
  gitAdd(projectDir);
  gitCommit(projectDir, "Initialize research project with logos");
  success("Git initialized");

  // Add Orchestra skills as submodule
  step("Installing research skills");
  const submoduleOk = gitAddSubmodule(projectDir, SKILLS_REPO, SKILLS_DEST);
  if (submoduleOk) {
    gitAdd(projectDir);
    gitCommit(projectDir, "Add Orchestra Research skills as submodule");
    success("Skills installed " + dim("(.claude/skills/)"));
  } else {
    warn("Could not clone skills " + dim("(network issue?)"));
    info("Run 'logos --update' inside the project to retry.");
  }

  // Check for uv (needed by arxiv MCP server)
  step("Checking dependencies");
  try {
    execSync("uvx --version", { stdio: "ignore" });
    success("uv found " + dim("(arxiv MCP server ready)"));
  } catch {
    warn("uv not found — arxiv MCP server won't work without it");
    info("Install: curl -LsSf https://astral.sh/uv/install.sh | sh");
  }

  // Interactive onboarding
  if (runOnboard) {
    await onboard(projectDir);
    gitAdd(projectDir);
    gitCommit(projectDir, "Complete onboarding");
  } else {
    console.log();
    info(`cd ${projectName}`);
    info("Open in your AI coding agent to begin onboarding");
    console.log();
  }
}
