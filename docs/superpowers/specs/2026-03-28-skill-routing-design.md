# Skill Routing & Gap Analysis Design

## Problem

1. The AI agent never uses Orchestra Research skills even though they're installed at `.claude/skills/`. AGENT.md doesn't reference them; CLAUDE.md says "load on demand" with no guidance.
2. If the submodule clone fails during `logos init`, there's zero fallback — no skills, no routing info.
3. `setup.md` may reference tools/services that have no matching Orchestra skill, leaving gaps in the agent's capabilities.

## Design

### 1. Skill Routing Per Stage (agent-md.js)

Add explicit skill references to each research stage in AGENT.md:

**Stage 1 — Research:**
- `0-autoresearch-skill/` — orchestration, two-loop experiment cycle
- `21-research-ideation/` — brainstorming, creative thinking, hypothesis generation
- `22-ml-paper-writing/` — literature survey structure (reused in Stage 4)

**Stage 2 — Experimentation:**
Route based on what `setup.md` describes:
- Model training: `01-model-architecture/` (LitGPT, Mamba, NanoGPT, etc.)
- Fine-tuning: `03-fine-tuning/` (Axolotl, LLaMA-Factory, Unsloth, Torchtune)
- Data processing: `05-data-processing/` (Ray Data, NeMo Curator)
- Distributed training: `08-distributed-training/` (DeepSpeed, FSDP, Accelerate)
- Prompt engineering: `13-prompt-engineering/` (DSPy, Instructor, Guidance, Outlines)
- RAG: `15-rag/` (Chroma, FAISS, Sentence Transformers, Pinecone)

**Stage 3 — Analysis:**
- `11-evaluation/` (lm-evaluation-harness, NeMo Evaluator)
- `10-experiment-tracking/` (W&B, MLflow)
- `09-hyperparameter-optimization/` (Optuna, Ray Tune)

**Stage 4 — Writing:**
- `22-ml-paper-writing/` — LaTeX templates, citation verification
- `22-ml-paper-writing/academic-plotting/` — publication-quality figures

General instruction per stage: "Read the relevant SKILL.md before starting — it has workflows, code examples, and common pitfalls."

### 2. Onboarding Skill Gap Analysis (agent-md.js)

New step after `setup.md` is finalized during onboarding:

```
After setup.md is complete:
1. List every tool, service, and platform mentioned in setup.md and agenda.md
2. Check .claude/skills/ for matching skills
3. For each gap (tool with no matching skill):
   a. Search for MCP servers that cover the tool (npm, GitHub, MCP registries)
   b. If no MCP found, create a custom skill at .claude/skills/custom/<tool>/SKILL.md
      with: description, installation, common workflows, gotchas
   c. Check if the tool needs API keys — verify present in .env, warn if missing
4. Update setup.md with a "Skills & Tools" section listing:
   - Orchestra skills matched
   - MCPs found and configured
   - Custom skills created
   - API keys status (present / missing)
```

### 3. Fallback Routing Index (fallback-skills.js + init.js)

When `gitAddSubmodule` fails in `init.js`:
- Write `.claude/skills/skill-routing.md` containing the complete task → skill → location mapping table (all 22 categories, 87 skills)
- This gives the agent awareness of what skills *would* exist so it can improvise or fetch from GitHub
- The file also includes a note that full skills can be installed via `logos --update`

### 4. CLAUDE.md Update (claude-md.js)

Replace the vague "load on demand" with:
- Brief routing summary (which categories map to which stages)
- Instruction to read SKILL.md files before domain-specific work
- Guidance on creating custom skills when gaps are found

## Files Changed

| File | Change |
|---|---|
| `src/templates/agent-md.js` | Skill routing per stage + onboarding skill gap analysis |
| `src/templates/claude-md.js` | Routing awareness + custom skill guidance |
| `src/templates/fallback-skills.js` | New — routing table content |
| `src/templates/index.js` | Export new template |
| `src/init.js` | Generate fallback routing index on submodule failure |
