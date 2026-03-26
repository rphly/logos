export function claudeMd() {
  return `# Logos Research Project

## On Session Start

1. Read \`agenda.md\` for research goals
2. Read \`setup.md\` for infrastructure preferences
3. Read \`.env\` for API keys (if it exists — do not error if absent)
4. Scan \`stages/\` to determine current progress

## Onboarding

If \`agenda.md\` or \`setup.md\` contain a \`<!-- TEMPLATE -->\` comment, they have not been filled in yet. Run an interactive onboarding before doing anything else:

1. Ask the user about their research topic, motivation, key questions, and goals. Populate \`agenda.md\` and remove the \`<!-- TEMPLATE -->\` sentinel.
2. Ask about their compute setup (training, inference), storage (weights, datasets), experiment tracking, and other tools. Populate \`setup.md\` and remove the \`<!-- TEMPLATE -->\` sentinel.

Do not proceed to any research stage until both files are populated.

## Research Stages

This project follows a staged workflow. Each stage must complete before the next begins. **Never advance to the next stage without explicit user permission.**

### Stage 1: Research
Literature review and synthesis. Use sub-agents for parallel work:
- Dispatch sub-agents to search for and summarize papers concurrently
- Synthesize findings into a coherent literature review
- Identify gaps, form hypotheses, refine research questions

Recommended skills: Autoresearch, Ideation, ML Paper Writing (for reading), RAG tools

When complete, generate \`stages/1-research.md\` with a summary of findings, key papers, identified gaps, and hypotheses.

### Stage 2: Experimentation
Write code, run experiments, collect results using the infrastructure in \`setup.md\`.

Recommended skills: Domain-specific based on \`setup.md\` (e.g. Fine-Tuning, Distributed Training, Infrastructure)

**Cost warning:** Before running any experiment that uses paid compute or API calls, warn the user and get confirmation.

When complete, generate \`stages/2-experimentation.md\` with experiment descriptions, configurations, and results.

### Stage 3: Analysis
Interpret results, draw conclusions, identify follow-up questions.

Recommended skills: Evaluation, MLOps/tracking, Mechanistic Interpretability

When complete, generate \`stages/3-analysis.md\` with conclusions, visualizations, and follow-up questions.

### Stage 4: Writing
Produce a writeup or paper.

Recommended skills: ML Paper Writing

When complete, generate \`stages/4-writing.md\` with the final document or a link to it.

## Stage Rules

- The \`stages/\` directory is the source of truth. A stage is complete only when its file exists.
- On session start, always check \`stages/\` first. Resume from where the project left off.
- If a stage file exists, treat its contents as ground truth — build on it, don't redo it.
- If a stage file has been deleted, the user wants to redo that stage.
- Never begin a stage unless the previous stage file exists.
- Always ask for explicit user permission before starting the next stage.
- Warn before any action that incurs compute or API costs.

## Skills

Orchestra Research skills are available at \`.claude/skills/\`. Load skills on demand — read only the skills relevant to the current task to conserve context. See stage descriptions above for recommended skills per stage.

## README

Update \`README.md\` as stages complete to reflect the current research status, key findings, and progress.
`;
}
