# logos

**Scaffold a personal AI research project in one command.**

logos creates a structured directory for AI/ML research, wires in [Orchestra Research's 89 AI Research Skills](https://github.com/Orchestra-Research/AI-Research-SKILLs) as a git submodule, and drops in a `CLAUDE.md` that instructs Claude Code to run your entire research lifecycle — from literature review through experimentation, analysis, and writing.

---

## Install

```bash
npm install -g logos-research
```

Requires Node.js 18 or later and git.

---

## Usage

```bash
logos myproject
cd myproject
# Open in Claude Code — onboarding starts automatically
```

logos scaffolds the project, initializes a git repo, and clones the Orchestra Research skills as a submodule. Open the directory in Claude Code and it will walk you through filling in your research agenda and infrastructure setup before anything else runs.

---

## Project structure

```
myproject/
├── CLAUDE.md            # Claude Code instructions — the research engine
├── agenda.md            # Research topic, questions, and goals
├── setup.md             # Compute, storage, and experiment tracking
├── .env.example         # API key template
├── stages/              # Source of truth for research progress
│   ├── 1-research.md    # Generated when Stage 1 completes
│   ├── 2-experimentation.md
│   ├── 3-analysis.md
│   └── 4-writing.md
├── papers/              # Collected literature
├── experiments/         # Code and configs
├── notes/               # Scratch space
├── data/                # Datasets
└── .claude/
    └── skills/          # Orchestra Research skills (git submodule)
```

---

## Staged workflow

logos enforces a four-stage research process. Claude will not advance to the next stage without your explicit permission — this keeps costs predictable and your research grounded.

| Stage | What happens |
|---|---|
| **1 — Research** | Literature review. Sub-agents search and summarize papers in parallel; Claude synthesizes findings, identifies gaps, and forms hypotheses. |
| **2 — Experimentation** | Code, run, and record experiments using the infrastructure you defined in `setup.md`. Claude warns before any paid compute or API call. |
| **3 — Analysis** | Interpret results, draw conclusions, surface follow-up questions. |
| **4 — Writing** | Produce a paper or writeup. |

Each completed stage writes a file to `stages/`. On any new session, Claude reads `stages/` first and resumes from exactly where you left off. Delete a stage file to redo that stage.

---

## Orchestra Research skills

The `.claude/skills/` submodule contains 89 research skills maintained by [Orchestra Research](https://github.com/Orchestra-Research). Skills are loaded on demand — Claude reads only those relevant to the current stage, preserving context window. Examples:

- **Autoresearch** — automated literature search and summarization
- **ML Paper Writing** — paper structure, framing, and writing guidance
- **Fine-Tuning / Distributed Training** — experiment scaffolding
- **Mechanistic Interpretability** — analysis and evaluation

Update skills at any time:

```bash
logos --update
```

---

## Other commands

```bash
logos --status    # Show current research stage
logos --update    # Pull latest Orchestra Research skills
logos --help      # Full usage
```

---

## How it integrates with Claude Code

When you open the project in Claude Code, it reads `CLAUDE.md` automatically. That file instructs Claude to:

1. Read `agenda.md` and `setup.md` for context
2. Run interactive onboarding if they haven't been filled in yet
3. Check `stages/` to determine where the project left off
4. Proceed only to the current stage, and only with your permission

No custom Claude configuration is required — logos works with the standard Claude Code CLI.

---

## Contributing

Pull requests are welcome. The project is a single Node.js package — no build step required.

```bash
git clone https://github.com/rphly/logos.git
cd logos
node bin/logos.js mytest   # smoke test
npm test                   # unit tests
```

Please keep changes focused: one feature or fix per PR.

---

## License

MIT
