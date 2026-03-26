export function readmeMd(projectName) {
  return `# ${projectName}

> AI research project scaffolded with [logos](https://github.com/YOUR_USERNAME/logos)

## Research Agenda

*Run this project in Claude Code to begin the onboarding process and define your research agenda.*

## Status

| Stage | Status |
|-------|--------|
| Research | Not started |
| Experimentation | Not started |
| Analysis | Not started |
| Writing | Not started |

## Project Structure

| Directory | Purpose |
|-----------|---------|
| \`stages/\` | Stage completion files (source of truth for progress) |
| \`papers/\` | PDFs, references, literature |
| \`experiments/\` | Code, notebooks, results |
| \`notes/\` | Freeform research notes |
| \`data/\` | Datasets, raw data |
| \`.claude/skills/\` | Orchestra Research AI skills |

## Getting Started

1. Open this directory in Claude Code
2. The agent will guide you through onboarding (research goals + infrastructure setup)
3. Progress through stages: Research → Experimentation → Analysis → Writing

## Cloning This Project

After cloning, initialize the skills submodule:

\`\`\`bash
git submodule init && git submodule update
\`\`\`

## Updating Skills

\`\`\`bash
logos --update
\`\`\`
`;
}
