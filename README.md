```
    __
   / /   ____  ____ _____  _____
  / /   / __ \/ __ `/ __ \/ ___/
 / /___/ /_/ / /_/ / /_/ (__  )
/_____/\____/\__, /\____/____/
            /____/
```

**Your AI research assistant, from idea to paper.**

logos scaffolds an AI research project in one command. It sets up a structured workspace, wires in [Orchestra Research's 89 AI Research Skills](https://github.com/Orchestra-Research/AI-Research-SKILLs), configures an arXiv MCP server for paper search and download, and drops in an `AGENT.md` that turns your AI coding agent into a research partner — guiding you through literature review, experimentation, analysis, and writing, one stage at a time.

> *"Help me survey recent work on sparse autoencoders"*
> *"Set up a fine-tuning run on Lambda Labs with Axolotl"*
> *"Write up our findings as a NeurIPS-style paper"*

---

## Install

```bash
npm install -g logos-research
```

Requires Node.js 18+, git, and [uv](https://docs.astral.sh/uv/) (for the arXiv MCP server).

---

## Usage

```bash
logos myproject
```

That's it. logos scaffolds the project, runs interactive onboarding to collect your research agenda and infrastructure setup, initializes git, and configures tooling. When it's done, open the project in your AI coding agent:

```bash
cd myproject
claude    # or any agent that reads AGENT.md
```

The agent reviews your onboarding answers, asks clarifying questions to sharpen scope and setup, then begins research.

---

## Project structure

```
myproject/
├── AGENT.md             # Agent instructions — the research engine
├── CLAUDE.md            # Claude Code pointer to AGENT.md
├── agenda.md            # Research topic, questions, and goals
├── setup.md             # Compute, storage, and experiment tracking
├── .env.example         # API key template
├── stages/              # Source of truth for research progress
│   ├── 1-research.md
│   ├── 2-experimentation.md
│   ├── 3-analysis.md
│   └── 4-writing.md
├── papers/              # Downloaded PDFs + summaries, organized by topic
├── experiments/         # Code and configs
├── notes/               # Sub-agent scratchpads and working notes
├── data/                # Datasets
└── .claude/
    ├── settings.json    # MCP server config (arXiv)
    └── skills/          # Orchestra Research skills (git submodule)
```

---

## Staged workflow

logos enforces a four-stage research process. The agent will not advance to the next stage without your explicit permission — this keeps costs predictable and your research grounded.

| Stage | What happens |
|---|---|
| **1 — Research** | Sub-agents search arXiv and the web in parallel, download PDFs to `papers/`, write summaries, and keep working notes in `notes/`. The main agent synthesizes findings, identifies gaps, and forms hypotheses. |
| **2 — Experimentation** | Write code, run experiments using the infrastructure in `setup.md`. Configs saved to `experiments/`. Agent warns before any paid compute or API call. |
| **3 — Analysis** | Interpret results, draw conclusions, surface follow-up questions. |
| **4 — Writing** | Produce a paper or writeup. |

Each completed stage writes a file to `stages/`. On any new session, the agent reads `stages/` first and resumes from exactly where you left off. Delete a stage file to redo that stage.

---

## arXiv MCP server

logos pre-configures an [arXiv MCP server](https://github.com/blazickjp/arxiv-mcp-server) in `.claude/settings.json`. This gives the agent direct access to:

- `search_papers` — query arXiv with filters
- `download_paper` — fetch PDFs (stored in `papers/`)
- `read_paper` — access downloaded paper content
- `list_papers` — see what's been downloaded

Requires [uv](https://docs.astral.sh/uv/). The server starts automatically when the agent needs it.

---

## Orchestra Research skills

The `.claude/skills/` submodule contains 89 research skills maintained by [Orchestra Research](https://github.com/Orchestra-Research). Skills are loaded on demand — the agent reads only those relevant to the current stage, preserving context window.

Update skills at any time:

```bash
logos --update
```

---

## Agent-agnostic

`AGENT.md` is the source of truth for all research instructions. It works with any AI coding agent that reads project-level markdown files. `CLAUDE.md` is a thin pointer that tells Claude Code to follow `AGENT.md`.

---

## Other commands

```bash
logos --status    # Show current research stage
logos --update    # Pull latest Orchestra Research skills
logos --migrate   # Upgrade project to latest logos version (experimental)
logos --help      # Full usage
```

### Migrating existing projects

When you update logos (`npm update -g logos-research`), existing projects don't automatically get new features like updated AGENT.md instructions or new MCP server configs. Run `logos --migrate` inside your project — it writes the latest templates and automatically launches your AI agent to merge them, preserving all your research content. *(experimental)*

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
