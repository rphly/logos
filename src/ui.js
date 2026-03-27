// ANSI color helpers
const esc = (code) => `\x1b[${code}m`;
const reset = esc(0);
const dim = (s) => `${esc(2)}${s}${reset}`;
const bold = (s) => `${esc(1)}${s}${reset}`;
const cyan = (s) => `${esc(36)}${s}${reset}`;
const green = (s) => `${esc(32)}${s}${reset}`;
const yellow = (s) => `${esc(33)}${s}${reset}`;
const red = (s) => `${esc(31)}${s}${reset}`;
const white = (s) => `${esc(97)}${s}${reset}`;
const magenta = (s) => `${esc(35)}${s}${reset}`;

const LOGO = `
${dim("    __")}
${dim("   / /   ____  ____ _____  _____")}
${dim("  / /   / __ \\/ __ \`/ __ \\/ ___/")}
${dim(" / /___/ /_/ / /_/ / /_/ (__  )")}
${dim("/_____/\\____/\\__, /\\____/____/")}
${dim("            /____/")}`;

function banner(subtitle) {
  console.log(LOGO);
  if (subtitle) {
    console.log(`  ${dim(subtitle)}`);
  }
  console.log();
}

function divider() {
  console.log(dim("  ─────────────────────────────────────"));
}

function section(title) {
  console.log();
  divider();
  console.log(`  ${bold(title)}`);
  divider();
  console.log();
}

function step(text) {
  console.log(`  ${dim("›")} ${text}`);
}

function success(text) {
  console.log(`  ${green("✓")} ${text}`);
}

function warn(text) {
  console.log(`  ${yellow("!")} ${text}`);
}

function error(text) {
  console.error(`  ${red("✗")} ${text}`);
}

function info(text) {
  console.log(`  ${dim(text)}`);
}

function label(key, value) {
  console.log(`  ${dim(key + ":")} ${white(value)}`);
}

function prompt(text) {
  return `  ${cyan("?")} ${text} ${dim("›")} `;
}

function done(text) {
  console.log();
  divider();
  console.log(`  ${green("✓")} ${bold(text)}`);
  divider();
  console.log();
}

export { dim, bold, cyan, green, yellow, red, white, magenta };
export { banner, divider, section, step, success, warn, error, info, label, prompt, done };
