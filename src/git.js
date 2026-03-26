import { execFileSync } from "node:child_process";

export function checkGit() {
  try {
    execFileSync("git", ["--version"], { stdio: "ignore" });
  } catch {
    throw new Error(
      "git is not installed. Please install git and try again."
    );
  }
}

export function gitInit(dir) {
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "ignore" });
}

export function gitAdd(dir, files = ["."]) {
  execFileSync("git", ["add", ...files], { cwd: dir, stdio: "ignore" });
}

export function gitCommit(dir, message) {
  execFileSync("git", ["commit", "-q", "-m", message], {
    cwd: dir,
    stdio: "ignore",
  });
}

export function gitAddSubmodule(dir, url, dest) {
  try {
    execFileSync("git", ["submodule", "add", url, dest], {
      cwd: dir,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

export function gitSubmoduleUpdate(dir) {
  execFileSync("git", ["submodule", "init"], { cwd: dir, stdio: "ignore" });
  execFileSync("git", ["submodule", "update", "--remote"], {
    cwd: dir,
    stdio: "ignore",
  });
}
