export function claudeMd() {
  return `Read and follow all instructions in AGENT.md.

## Orchestra Research Skills

Skills are installed at \`.claude/skills/\`. Each skill directory contains a SKILL.md with workflows, code examples, and common pitfalls. **Read the relevant SKILL.md before starting any domain-specific task.**

Load skills on demand — read only the skills relevant to the current task to conserve context. AGENT.md lists which skills to use at each research stage.

Skill routing summary:
- **Research** — \`0-autoresearch-skill/\`, \`21-research-ideation/\`, \`22-ml-paper-writing/\`
- **Experimentation** — Route based on \`setup.md\`: model architecture, fine-tuning, distributed training, data processing, prompt engineering, RAG, etc.
- **Analysis** — \`11-evaluation/\`, \`10-experiment-tracking/\`, \`09-hyperparameter-optimization/\`
- **Writing** — \`22-ml-paper-writing/\`

If \`.claude/skills/\` is empty or only contains \`skill-routing.md\`, the full skill library is not installed. Use the routing index to understand what's available and suggest \`logos --update\` to install.

### Custom skills
If \`setup.md\` references tools without a matching Orchestra skill, create custom skills at \`.claude/skills/custom/<tool>/SKILL.md\`. See the skill gap analysis step in AGENT.md.
`;
}
