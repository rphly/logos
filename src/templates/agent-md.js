export function agentMd() {
  return `# Logos Research Project

## On Session Start

IMMEDIATELY on the first message (including "start"), do the following — do not wait for further user input:

1. Read \`AGENT.md\` (this file) to load your full instructions
2. Read \`agenda.md\` and \`setup.md\`
3. Read \`.env\` for API keys (if it exists — do not error if absent)
4. Scan \`stages/\` to determine current progress
5. **Assess your capabilities** — based on \`setup.md\`, \`.env\`, and \`.claude/settings.json\`, build a mental model of what you can actively do:
   - What compute platforms can you reach? (check for RunPod, Lambda, Modal API keys, etc.)
   - What experiment tracking can you query? (W&B, MLflow API keys?)
   - What MCP servers are configured? (arXiv, HuggingFace, custom?)
   - What data sources can you access? (HF Hub, S3, local?)
   - What skills are available at \`.claude/skills/\`?
   If a token or MCP exists for a service, you can and should use it — don't defer to the user for things you can do yourself.
6. If onboarding is needed (see below), begin it right away
7. If onboarding is complete, greet the user with a brief status summary — include what infrastructure you have access to — and ask what they'd like to work on

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

### Skill gap analysis
After \`agenda.md\` and \`setup.md\` are both complete, cross-reference them against available skills:

1. **Inventory** — List every tool, service, framework, and platform mentioned in both files
2. **Match** — Check \`.claude/skills/\` for Orchestra Research skills that cover each item. If \`.claude/skills/\` is empty or only contains \`skill-routing.md\`, read that routing index to understand what skills *would* be available and suggest running \`logos --update\` to install them.
3. **Fill gaps** — For each tool with no matching skill:
   a. **Search for MCP servers** — look for MCP servers (npm, GitHub, MCP registries) that provide tools for the service. If found, add the MCP config to \`.claude/settings.json\`.
   b. **Create a custom skill** — if no MCP exists, write a skill file to \`.claude/skills/custom/<tool>/SKILL.md\` with: what the tool does, installation, common workflows, and gotchas.
   c. **Check API keys** — if the tool needs API keys or credentials, verify they exist in \`.env\`. Flag anything missing and help the user add it.

   **HuggingFace Hub** — Most ML research projects need HF. If HuggingFace, HF Hub, or any HF-hosted models/datasets are mentioned:
   - Verify \`HF_TOKEN\` is set in \`.env\`
   - Walk the user through setting up the HF MCP server: visit \`huggingface.co/settings/mcp\`, select their client, copy the config snippet, and add it to \`.claude/settings.json\`. This gives tools for searching models, datasets, papers, Spaces, and HF docs.
   - Check if the \`hf\` CLI is installed (\`pip install huggingface_hub[cli]\`) — it's needed for uploading/downloading models and datasets
4. **Update setup.md** — Add a "Skills & Tools" section listing:
   - Orchestra skills matched (with paths)
   - MCPs found and configured
   - Custom skills created
   - API keys status (present / missing)

Do not proceed to Stage 1 until the skill gap analysis is complete.

## Autonomy

Be autonomous. Do not stop to ask for permission or next steps when the path forward is clear. If you're waiting on something (training, data download, API call), work on the next useful thing in parallel. Only pause for the user when you genuinely need a decision — cost approvals, stage transitions, or ambiguous research direction. "Want me to keep going?" is never a useful question — just keep going.

## Research Stages

This project follows a staged workflow. Each stage must complete before the next begins. **Never advance to the next stage without explicit user permission.**

### Stage 1: Research
Literature review and synthesis. Use sub-agents for parallel work.

**Before starting:** Re-read \`setup.md\` for data sources, API keys, and any tools the user has available. Re-read \`agenda.md\` for scope, hypotheses, and constraints — these guide what literature to prioritize.

**Skills:** Read these SKILL.md files before starting — they have workflows, code examples, and common pitfalls:
- \`0-autoresearch-skill/\` — autonomous research orchestration, two-loop experiment-synthesis cycle
- \`21-research-ideation/\` — brainstorming, creative thinking, hypothesis generation
- \`22-ml-paper-writing/\` — literature survey structure (reuse in Stage 4 for the final paper)

**Search:** An arXiv MCP server is pre-configured (\`.claude/settings.json\`). Check \`setup.md\` for additional search tools or data sources. Sub-agents should use:
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
Write code, run experiments, collect results.

**Before starting:** Re-read \`setup.md\` — it specifies compute (where to train), storage (where data lives), tracking (how to log runs), budget constraints, and the skills & tools audit from onboarding. All experiment decisions should respect these constraints.

**Skills:** Check \`setup.md\` and route to the right skills. Read the relevant SKILL.md before starting each task:
- Model training from scratch → \`01-model-architecture/\` (LitGPT, Mamba, NanoGPT, Megatron-Core)
- Tokenizer work → \`02-tokenization/\` (HuggingFace Tokenizers, SentencePiece)
- Fine-tuning → \`03-fine-tuning/\` (Axolotl, LLaMA-Factory, Unsloth, Torchtune)
- Interpretability → \`04-mechanistic-interpretability/\` (TransformerLens, SAELens, NNsight)
- Data processing → \`05-data-processing/\` (Ray Data, NeMo Curator)
- Alignment / RLHF → \`06-post-training/\` (TRL, GRPO, OpenRLHF, SimPO)
- Distributed training → \`08-distributed-training/\` (DeepSpeed, FSDP, Accelerate)
- Prompt engineering → \`13-prompt-engineering/\` (DSPy, Instructor, Guidance, Outlines)
- Agents → \`14-agents/\` (LangChain, LlamaIndex, Smolagents, Claude Agent SDK)
- RAG / vector search → \`15-rag/\` (Chroma, FAISS, Sentence Transformers, Pinecone)
- Inference serving → \`12-inference-serving/\` (vLLM, TensorRT-LLM, llama.cpp, SGLang)
- Cloud compute → \`16-cloud-compute/\` (Lambda Labs, Modal, SkyPilot)
- Multimodal → \`18-multimodal/\` (CLIP, Whisper, LLaVA, Stable Diffusion)
- Emerging techniques → \`19-emerging/\` (MoE, Model Merging, Distillation, Pruning)
Also check any custom skills created during onboarding at \`.claude/skills/custom/\`.

**Git branching — each experiment is an independent feature branch.**
Every experiment MUST run on its own clean branch off \`main\`. This is non-negotiable.

1. **Create the branch** before writing any experiment code:
   \`\`\`
   git checkout main
   git checkout -b exp/<short-name>   # e.g. exp/lr-sweep, exp/mamba-baseline, exp/lora-r16
   \`\`\`
2. **Keep it self-contained.** All code, configs, data scripts, and results for that experiment live on its branch. Do not mix experiments across branches.
3. **Never commit experiment code to \`main\`.** Main stays clean — only shared infrastructure, documentation, and merged results belong there.
4. **Parallel experiments = parallel branches.** If you're running 3 experiments concurrently, that's 3 branches, each checked out in its own worktree or by its own subagent.
5. **Use git worktrees for concurrency.** You cannot checkout multiple branches in a single working directory. For each parallel experiment:
   \`\`\`
   git worktree add ../experiments/<short-name> exp/<short-name>
   \`\`\`
   Run the experiment from that worktree. Remove it when done: \`git worktree remove ../experiments/<short-name>\`
6. **When an experiment succeeds**, merge its results (not necessarily all code) back to main via a clean merge or cherry-pick. When it fails, leave the branch as a record — don't delete it.
7. **Branch naming convention:** \`exp/<category>/<name>\` or \`exp/<name>\`. Examples:
   - \`exp/training/lr-cosine-warmup\`
   - \`exp/data/dedup-minhash\`
   - \`exp/arch/mamba-hybrid\`

- Save experiment code and configs to \`experiments/\` on the experiment branch
- Each sub-agent writes its own notes file to \`notes/\` for observations, unexpected results, and ideas

**Run experiments in parallel when possible.** Experiments that don't depend on each other's results should run concurrently — don't wait for one to finish before starting the next. Use separate compute instances, separate tracking runs, separate branches, and separate monitoring subagents. Only serialize experiments that are contingent on prior results (e.g. a follow-up that depends on which hyperparameters won).

**Monitoring:** You are responsible for actively monitoring running experiments. Do not stop and ask "want me to check?" — just check. Check \`.env\` and \`setup.md\` for available credentials and use them:
- **Compute platforms** (RunPod, Lambda, Modal, etc.) — use their APIs or CLIs to check pod/instance status, SSH in to inspect logs, tail training output
- **Experiment tracking** (W&B, MLflow, etc.) — use their APIs to pull metrics, check for loss convergence, detect NaN/divergence early
- **Cloud storage** (S3, HF Hub, etc.) — verify checkpoints are being saved as expected
If an API key or token exists in \`.env\`, use it. If an MCP server is configured in \`.claude/settings.json\` for the service, use its tools. Do not tell the user to monitor things you can monitor yourself.

**Delegate monitoring to a subagent.** When an experiment starts running, spawn a dedicated monitoring subagent so you can keep working:
1. Write a monitoring PRD to \`experiments/monitor-prd.json\` with tasks like: "check training loss every 5 minutes", "verify checkpoints are saving", "detect NaN/divergence", "report when training completes"
2. Write a monitoring prompt to \`experiments/monitor-prompt.md\` that tells the subagent:
   - Which APIs/CLIs to use (from \`setup.md\` and \`.env\`)
   - What metrics to check and what thresholds are problems
   - To append status updates to \`experiments/status.md\`
   - To alert immediately (write to \`experiments/ALERT.md\`) on errors, crashes, or NaN
3. Launch the monitor using [ralph](https://github.com/snarktank/ralph) (\`ralph.sh --tool claude\`) or as a background subagent
4. Between your own tasks, read \`experiments/status.md\` to stay informed. Check for \`experiments/ALERT.md\` — if it exists, handle the issue immediately.

**While experiments are running, keep working.** Do not pause and ask the user what to do next. Work on whatever is most useful in parallel — plan the next experiment, analyze earlier results, write notes, prepare evaluation scripts, update documentation. Only interrupt the user for decisions that genuinely require their input. When an experiment completes, report results and immediately suggest or begin the next step.

**Cost warning:** Before running any experiment that uses paid compute or API calls, warn the user and get confirmation.

When complete, generate \`stages/2-experimentation.md\` with experiment descriptions, configurations, and results.

### Stage 3: Analysis
Interpret results, draw conclusions, identify follow-up questions.

**Before starting:** Re-read \`setup.md\` for the experiment tracking platform (W&B, MLflow, etc.) and any evaluation infrastructure. Use whatever tracking system the project is configured for — don't introduce a new one.

**Skills:** Read the relevant SKILL.md before starting:
- Benchmarking → \`11-evaluation/\` (lm-evaluation-harness, NeMo Evaluator)
- Experiment tracking → \`10-experiment-tracking/\` (Weights & Biases, MLflow)
- Hyperparameter analysis → \`09-hyperparameter-optimization/\` (Optuna, Ray Tune)
- Visualization → \`22-ml-paper-writing/\` (academic plotting for publication-quality figures)

**Data collection:** Use the same APIs and MCPs from Stage 2 to pull experiment results. Query W&B/MLflow for metrics, download result artifacts from cloud storage. Don't ask the user to export data you can fetch yourself.

- Write working analysis and draft interpretations to \`notes/\`

When complete, generate \`stages/3-analysis.md\` with conclusions, visualizations, and follow-up questions.

### Stage 4: Writing
Produce a writeup or paper.

**Before starting:** Re-read \`agenda.md\` for the research questions and success criteria — the writeup should address these directly. Check \`setup.md\` for any publication or formatting preferences.

**Skills:** Read these SKILL.md files before starting:
- \`22-ml-paper-writing/\` — LaTeX templates, paper structure, citation verification, academic plotting

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
