import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { checkGit, gitInit, gitAdd, gitCommit, gitAddSubmodule } from "./git.js";
import * as templates from "./templates/index.js";

const SKILLS_REPO = "https://github.com/Orchestra-Research/AI-Research-SKILLs.git";
const SKILLS_DEST = ".claude/skills";

export function init(projectName, cwd = process.cwd()) {
  checkGit();

  const projectDir = path.resolve(cwd, projectName);

  if (existsSync(projectDir)) {
    console.error(`Error: directory '${projectName}' already exists.`);
    process.exit(1);
  }

  // Create directories
  mkdirSync(projectDir, { recursive: true });
  for (const dir of ["stages", "papers", "experiments", "notes", "data", ".claude"]) {
    mkdirSync(path.join(projectDir, dir), { recursive: true });
  }

  // Write files
  writeFileSync(path.join(projectDir, ".logos"), "");
  writeFileSync(path.join(projectDir, "CLAUDE.md"), templates.claudeMd());
  writeFileSync(path.join(projectDir, "agenda.md"), templates.agendaMd());
  writeFileSync(path.join(projectDir, "setup.md"), templates.setupMd());
  writeFileSync(path.join(projectDir, "README.md"), templates.readmeMd(projectName));
  writeFileSync(path.join(projectDir, ".env.example"), templates.envExample());
  writeFileSync(path.join(projectDir, ".gitignore"), templates.gitignore());

  // Add .gitkeep to empty directories so git tracks them
  for (const dir of ["stages", "papers", "experiments", "notes", "data"]) {
    writeFileSync(path.join(projectDir, dir, ".gitkeep"), "");
  }

  // Initialize git
  gitInit(projectDir);
  gitAdd(projectDir);
  gitCommit(projectDir, "Initialize research project with logos");

  // Add Orchestra skills as submodule
  const submoduleOk = gitAddSubmodule(projectDir, SKILLS_REPO, SKILLS_DEST);
  if (submoduleOk) {
    gitAdd(projectDir);
    gitCommit(projectDir, "Add Orchestra Research skills as submodule");
  } else {
    console.warn(
      "\n⚠ Could not clone Orchestra Research skills (network issue?)."
    );
    console.warn("  Run 'logos --update' inside the project to retry.\n");
  }

  console.log(`\nCreated research project: ${projectName}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  Open in Claude Code to begin onboarding\n`);
}
