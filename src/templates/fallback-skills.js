export function skillRouting() {
  return `# Skill Routing Index

> **Skills are not installed.** This is a fallback routing index. Run \`logos --update\` inside the project to install the full Orchestra Research skills library.
>
> Without the full skills, you can still use this table to understand what tools exist for each task and improvise workflows. Each skill's SKILL.md (when installed) contains detailed workflows, code examples, and common pitfalls.

## How to Use This Table

When you encounter a domain-specific task during research, find the matching skill below. If skills are installed at \`.claude/skills/\`, read the SKILL.md at the listed location before starting. If not installed, use the skill name and description to guide your approach.

## Routing Map

### Data & Preprocessing

| Task | Skill | Location |
|---|---|---|
| Large-scale data processing | Ray Data | \`05-data-processing/ray-data/\` |
| Data curation and filtering | NeMo Curator | \`05-data-processing/nemo-curator/\` |
| Custom tokenizer training | HuggingFace Tokenizers | \`02-tokenization/hf-tokenizers/\` |
| Subword tokenization | SentencePiece | \`02-tokenization/sentencepiece/\` |

### Model Architecture & Training

| Task | Skill | Location |
|---|---|---|
| Large-scale pretraining | Megatron-Core | \`01-model-architecture/megatron-core/\` |
| Lightweight LLM training | LitGPT | \`01-model-architecture/litgpt/\` |
| State-space models | Mamba | \`01-model-architecture/mamba/\` |
| Linear attention models | RWKV | \`01-model-architecture/rwkv/\` |
| Small-scale pretraining | NanoGPT | \`01-model-architecture/nanogpt/\` |
| Multi-GPU abstraction | TorchTitan | \`01-model-architecture/torchtitan/\` |

### Fine-Tuning

| Task | Skill | Location |
|---|---|---|
| Multi-method fine-tuning | Axolotl | \`03-fine-tuning/axolotl/\` |
| Template-based fine-tuning | LLaMA-Factory | \`03-fine-tuning/llama-factory/\` |
| Fast LoRA fine-tuning | Unsloth | \`03-fine-tuning/unsloth/\` |
| PyTorch-native fine-tuning | Torchtune | \`03-fine-tuning/torchtune/\` |

### Mechanistic Interpretability

| Task | Skill | Location |
|---|---|---|
| Transformer circuit analysis | TransformerLens | \`04-mechanistic-interpretability/transformerlens/\` |
| Sparse autoencoder training | SAELens | \`04-mechanistic-interpretability/saelens/\` |
| Remote interpretability | NNsight | \`04-mechanistic-interpretability/nnsight/\` |
| Causal intervention | Pyvene | \`04-mechanistic-interpretability/pyvene/\` |

### Post-Training (RL / Alignment)

| Task | Skill | Location |
|---|---|---|
| PPO, DPO, SFT pipelines | TRL | \`06-post-training/trl/\` |
| Group Relative Policy Optimization | GRPO | \`06-post-training/grpo-rl-training/\` |
| Scalable RLHF | OpenRLHF | \`06-post-training/openrlhf/\` |
| Reference-free alignment | SimPO | \`06-post-training/simpo/\` |

### Distributed Training

| Task | Skill | Location |
|---|---|---|
| ZeRO optimization | DeepSpeed | \`08-distributed-training/deepspeed/\` |
| Fully sharded data parallel | FSDP | \`08-distributed-training/fsdp/\` |
| Multi-GPU abstraction | Accelerate | \`08-distributed-training/accelerate/\` |
| Training framework | PyTorch Lightning | \`08-distributed-training/pytorch-lightning/\` |
| Distributed data + training | Ray Train | \`08-distributed-training/ray-train/\` |

### Hyperparameter Optimization

| Task | Skill | Location |
|---|---|---|
| Bayesian optimization | Optuna | \`09-hyperparameter-optimization/optuna/\` |
| Distributed tuning | Ray Tune | \`09-hyperparameter-optimization/ray-tune/\` |

### Experiment Tracking

| Task | Skill | Location |
|---|---|---|
| Experiment tracking + dashboards | Weights & Biases | \`10-experiment-tracking/wandb/\` |
| Open-source tracking | MLflow | \`10-experiment-tracking/mlflow/\` |

### Evaluation

| Task | Skill | Location |
|---|---|---|
| Standard LLM benchmarks | lm-evaluation-harness | \`11-evaluation/lm-eval-harness/\` |
| NeMo-integrated evaluation | NeMo Evaluator | \`11-evaluation/nemo-evaluator/\` |

### Inference & Serving

| Task | Skill | Location |
|---|---|---|
| High-throughput serving | vLLM | \`12-inference-serving/vllm/\` |
| NVIDIA-optimized inference | TensorRT-LLM | \`12-inference-serving/tensorrt-llm/\` |
| CPU / edge inference | llama.cpp | \`12-inference-serving/llama-cpp/\` |
| Structured generation serving | SGLang | \`12-inference-serving/sglang/\` |

### Prompt Engineering

| Task | Skill | Location |
|---|---|---|
| Programmatic prompt optimization | DSPy | \`13-prompt-engineering/dspy/\` |
| Structured LLM outputs | Instructor | \`13-prompt-engineering/instructor/\` |
| Constrained generation | Guidance | \`13-prompt-engineering/guidance/\` |
| Grammar-based generation | Outlines | \`13-prompt-engineering/outlines/\` |

### Agents

| Task | Skill | Location |
|---|---|---|
| Agent pipelines | LangChain | \`14-agents/langchain/\` |
| Knowledge retrieval agents | LlamaIndex | \`14-agents/llamaindex/\` |
| Lightweight agents | Smolagents | \`14-agents/smolagents/\` |
| Claude-based agents | Claude Agent SDK | \`14-agents/claude-agent-sdk/\` |

### RAG & Vector Search

| Task | Skill | Location |
|---|---|---|
| Vector store (local) | Chroma | \`15-rag/chroma/\` |
| Vector similarity search | FAISS | \`15-rag/faiss/\` |
| Text embeddings | Sentence Transformers | \`15-rag/sentence-transformers/\` |
| Managed vector DB | Pinecone | \`15-rag/pinecone/\` |
| Scalable vector DB | Milvus | \`15-rag/milvus/\` |

### Cloud Compute

| Task | Skill | Location |
|---|---|---|
| GPU cloud (reserved/on-demand) | Lambda Labs | \`16-cloud-compute/lambda-labs/\` |
| Serverless GPU | Modal | \`16-cloud-compute/modal/\` |
| Multi-cloud orchestration | SkyPilot | \`16-cloud-compute/skypilot/\` |

### Multimodal

| Task | Skill | Location |
|---|---|---|
| Vision-language models | CLIP | \`18-multimodal/clip/\` |
| Speech recognition | Whisper | \`18-multimodal/whisper/\` |
| Visual instruction tuning | LLaVA | \`18-multimodal/llava/\` |
| Vision-language pretraining | BLIP-2 | \`18-multimodal/blip-2/\` |
| Zero-shot segmentation | Segment Anything (SAM) | \`18-multimodal/sam/\` |
| Image generation | Stable Diffusion | \`18-multimodal/stable-diffusion/\` |
| Audio generation | AudioCraft | \`18-multimodal/audiocraft/\` |

### Emerging Techniques

| Task | Skill | Location |
|---|---|---|
| Mixture of Experts | MoE | \`19-emerging/moe/\` |
| Model merging | Model Merging | \`19-emerging/model-merging/\` |
| Long context methods | Long Context | \`19-emerging/long-context/\` |
| Speculative decoding | Speculative Decoding | \`19-emerging/speculative-decoding/\` |
| Knowledge distillation | Distillation | \`19-emerging/distillation/\` |
| Model pruning | Pruning | \`19-emerging/pruning/\` |

### Observability

| Task | Skill | Location |
|---|---|---|
| LLM tracing | LangSmith | \`20-observability/langsmith/\` |
| Open-source observability | Phoenix | \`20-observability/phoenix/\` |

### Research & Writing

| Task | Skill | Location |
|---|---|---|
| Autonomous research orchestration | Autoresearch | \`0-autoresearch-skill/\` |
| Brainstorming & ideation | Research Ideation | \`21-research-ideation/\` |
| ML paper writing & LaTeX | ML Paper Writing | \`22-ml-paper-writing/\` |
| Publication-quality figures | Academic Plotting | \`22-ml-paper-writing/academic-plotting/\` |

---

*Source: [Orchestra Research AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs)*
`;
}
