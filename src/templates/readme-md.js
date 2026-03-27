export function readmeMd(projectName) {
  return `# ${projectName}

> AI research project scaffolded with [logos](https://github.com/rphly/logos)

## Research Agenda

<!-- AGENT: Replace this section with the research topic, motivation, and key questions from agenda.md after onboarding. -->

*Pending onboarding.*

## Key Findings

<!-- AGENT: After each stage, update this section with the most important findings so far. This is the first thing someone reads — make it count. Write in prose, not bullet points. Summarize what you found, what it means, and what's next. -->

*No findings yet.*

## Status

<!-- AGENT: Update this table as stages complete. Replace "Not started" with a 1-2 sentence summary of what was accomplished in that stage. -->

| Stage | Status |
|-------|--------|
| Research | Not started |
| Experimentation | Not started |
| Analysis | Not started |
| Writing | Not started |

## Papers

<!-- AGENT: After Stage 1, list the most important papers here with one-line descriptions. Link to the summary file in papers/. -->

*No papers collected yet.*

## Getting Started

1. Open this directory in your AI coding agent
2. The agent will guide you through onboarding (research goals + infrastructure setup)
3. Progress through stages: Research → Experimentation → Analysis → Writing

After cloning, initialize the skills submodule:

\`\`\`bash
git submodule init && git submodule update
\`\`\`
`;
}
