export function agentMd() {
  return `# Logos Research Project

## On Session Start

IMMEDIATELY on the first message (including "start"), do the following — do not wait for further user input:

1. Read \`agenda.md\` and \`setup.md\`
2. Read \`.env\` for API keys (if it exists — do not error if absent)
3. Scan \`stages/\` to determine current progress
4. If onboarding is needed (see below), begin it right away
5. If onboarding is complete, greet the user with a brief status summary and ask what they'd like to work on

## Onboarding

The \`logos\` CLI collects initial answers into \`agenda.md\` and \`setup.md\`. Your job is to review, correct, clarify, and expand on what the user provided until both files are thorough and specific enough to drive research.

If \`agenda.md\` or \`setup.md\` contain a \`<!-- TEMPLATE -->\` comment, they were not filled in at all — collect everything from scratch.

Otherwise, read what's there and **deepen it through conversation**:

### Agenda (problem scoping)
Review \`agenda.md\` and push for clarity on:
- **Scope** — What exactly is in and out of scope? Is the problem well-defined or exploratory?
- **Hypotheses** — What does the user believe going in? What assumptions need testing?
- **Success criteria** — How will we know if the research succeeded? What would a negative result look like?
- **Constraints** — Timeline, compute budget, data availability, ethical considerations
- **Related work** — What prior work exists? What has the user already tried?

### Setup (infrastructure)
Review \`setup.md\` and push for clarity on:
- **Training** — Where and how? Local GPUs, cloud instances, what frameworks?
- **API keys** — Which services are needed? What's already set up vs. needs provisioning?
- **Data** — Where does data come from? What format? Any access restrictions?
- **Experiment tracking** — How will runs be logged and compared?
- **Budget** — Any hard limits on compute spend?

Update both files with the expanded information after each round of questions. Keep asking until you and the user have absolute clarity. Do not proceed to any research stage until both files are comprehensive.

## Research Stages

This project follows a staged workflow. Each stage must complete before the next begins. **Never advance to the next stage without explicit user permission.**

### Stage 1: Research
Literature review and synthesis. Use sub-agents for parallel work.

**Search:** An arXiv MCP server is pre-configured (\`.claude/settings.json\`). Sub-agents should use:
- **arXiv MCP tools** — \`search_papers\` to query, \`download_paper\` to fetch PDFs (downloads go to \`papers/\` automatically), \`read_paper\` to access content, \`list_papers\` to see what's been downloaded
- **Web search** — for Google Scholar, Semantic Scholar, blog posts, technical reports, and pre-prints not on arXiv

**Sub-agent workflow:**
- Dispatch sub-agents by topic or research question — each searches, reads, and summarizes concurrently
- Each sub-agent writes its own notes file to \`notes/\` (e.g. \`notes/agent-transformers.md\`, \`notes/agent-sparse-autoencoders.md\`) — this is its scratchpad for working thoughts, dead ends, open questions, and intermediate findings
- For each paper found, the sub-agent should:
  1. Download the PDF to the appropriate topic subdirectory: \`papers/<topic>/<author>-<year>-<slug>.pdf\`
  2. Write a companion summary: \`papers/<topic>/<author>-<year>-<slug>.md\` with title, authors, year, venue, abstract, key contributions, methodology, results, relevance to this project, limitations, and citation/link
- PDFs are checked into git — download them, do not just link to them

**Paper organization:**
\`\`\`
papers/
  attention-mechanisms/
    vaswani-2017-attention.pdf
    vaswani-2017-attention.md
  training-efficiency/
    hoffmann-2022-chinchilla.pdf
    hoffmann-2022-chinchilla.md
\`\`\`

**After sub-agents finish:**
- Synthesize across all notes and papers into a coherent literature review
- Identify gaps, form hypotheses, refine research questions

When complete, generate \`stages/1-research.md\` with a summary of findings, key papers, identified gaps, and hypotheses.

### Stage 2: Experimentation
Write code, run experiments, collect results using the infrastructure in \`setup.md\`.
- Save experiment code and configs to \`experiments/\`
- Each sub-agent writes its own notes file to \`notes/\` for observations, unexpected results, and ideas

**Cost warning:** Before running any experiment that uses paid compute or API calls, warn the user and get confirmation.

When complete, generate \`stages/2-experimentation.md\` with experiment descriptions, configurations, and results.

### Stage 3: Analysis
Interpret results, draw conclusions, identify follow-up questions.
- Write working analysis and draft interpretations to \`notes/\`

When complete, generate \`stages/3-analysis.md\` with conclusions, visualizations, and follow-up questions.

### Stage 4: Writing
Produce a writeup or paper.

When complete, generate \`stages/4-writing.md\` with the final document or a link to it.

## Stage Rules

- The \`stages/\` directory is the source of truth. A stage is complete only when its file exists.
- On session start, always check \`stages/\` first. Resume from where the project left off.
- If a stage file exists, treat its contents as ground truth — build on it, don't redo it.
- If a stage file has been deleted, the user wants to redo that stage.
- Never begin a stage unless the previous stage file exists.
- Always ask for explicit user permission before starting the next stage.
- Warn before any action that incurs compute or API costs.

## README

\`README.md\` is the public face of this project. Update it after **every stage completion** and after **onboarding**. It should be useful to someone who has never seen this project before.

The README contains HTML comments (e.g. \`<!-- AGENT: ... -->\`) that tell you what to write in each section. Follow them, then remove the comment once the section is populated.

After onboarding:
- Replace the "Research Agenda" section with the actual topic, motivation, and key questions

After Stage 1 (Research):
- Write a "Key Findings" section summarizing the literature review in prose — what was found, what it means, what gaps exist
- Update the "Papers" section with the most important papers, each with a one-line description and link to its summary in \`papers/\`
- Update the status table with a 1-2 sentence summary of what the research stage accomplished

After Stage 2 (Experimentation):
- Update "Key Findings" with experiment results and what they show
- Update the status table

After Stage 3 (Analysis):
- Update "Key Findings" with conclusions and interpretation
- Update the status table

After Stage 4 (Writing):
- Link to the final paper or writeup
- Update the status table
`;
}
