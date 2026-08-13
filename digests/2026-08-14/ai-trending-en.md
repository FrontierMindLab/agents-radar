# AI Open Source Trends 2026-08-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-13 23:00 UTC

---

**Filtering note:** Non-AI trending repos (`holehe`, `SpiderFoot`, `manim`) and unrelated dev-tools (`Puppeteer`, `Bruno`, `Files`, `Yazi`, `Appsmith`, `IT Tools`) were excluded from this analysis.

---

## 1. Today's Highlights

Agent Skills are the clearest breakout: Anthropic published its official [`anthropics/skills`](https://github.com/anthropics/skills) repo, while [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) added **+4,504 stars today** as a polished skill pack for Claude Code. Context/routing infrastructure is also heating up — [`macro-inc/macro`](https://github.com/macro-inc/macro) (+1,180), [`semantica-agi/semantica`](https://github.com/semantica-agi/semantica) (+727), and [`NVIDIA-NeMo/Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) (+408) all point to a new “memory + routing” layer around LLMs. Edge AI is becoming concrete with [`cactus-compute/needle`](https://github.com/cactus-compute/needle), a 14MB foundation model for tiny devices, and [`altic-dev/FluidVoice`](https://github.com/altic-dev/FluidVoice), an on-device macOS dictation app. Meanwhile, generative video keeps expanding through [`Lightricks/LTX-2`](https://github.com/Lightricks/LTX-2) and local 3D creation via [`lightningpixel/modly`](https://github.com/lightningpixel/modly).

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 197,006 | Core open-source ML framework; still the baseline for production TensorFlow ecosystems. Its continued presence in the ML topic list keeps it a reference for model deployment. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,476 | Local LLM runtime and model hub. Now advertises Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, and Gemma, making it a bellwether for the latest open-weight releases. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,078 | De facto model-definition framework for text/vision/audio/multimodal models. It remains the central hub for new model architectures. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,359 | Primary deep-learning framework for training and inference. Most new LLM and diffusion work still ships on PyTorch. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,032 | CLI proxy that cuts LLM token consumption by 60–90% on common dev commands. Signals a growing cost-control layer for AI coding tools. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,260 | Modular Rust framework for building LLM applications. Its traction shows Rust moving into agent/LLM tooling. |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0 (+408) | LLM traffic router across models/providers while preserving OpenAI/Anthropic compatibility. Adds 408 stars today as multi-provider routing becomes a must-have. |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+727) | Graph-native infrastructure for context and accountable AI systems. One of the fastest-rising infra projects today, pointing to context as a first-class layer. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,959 | Agent harness performance optimization system with skills, instincts, memory, and security. It has the largest star count in today's agent-related topic data. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 230,103 | Personal AI agent framework that “grows with you.” Strong community signal for long-running, self-improving agents. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,592 | Pioneering autonomous agent platform. Still a benchmark for accessible AI agent development. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,366 | Build agentic workflows and RAG pipelines in one collaborative workspace. A major platform for production LLM apps. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,183 | Agent engineering platform; the most widely used LLM app framework and a standard layer for tool calling and orchestration. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,116 | Makes websites accessible to AI agents for online task automation. Central to the growing browser-agent category. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+4,504) | 29 editorial diagram types for Claude Code as self-contained HTML + SVG. The single fastest-rising repo today, showing demand for high-quality agent output skills. |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 0 (+383) | Official public repository for Agent Skills. Standardizes reusable skill packaging for Anthropic-powered agents and beyond. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,712 | User-friendly AI interface for self-hosted LLMs, supporting Ollama/OpenAI APIs. It remains the default open front-end for local chat and RAG. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,092 | Automated workflow for generating HD short videos from a topic or keyword. Major momentum in AI content creation. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,699 | Local-first AI workspace and chat app; positions as “own your intelligence.” A strong self-hosted alternative to hosted AI productivity suites. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 47,962 | Open-source agentic video production system with 12 pipelines and 700+ agent skill files. Turns an AI coding assistant into a video production studio. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 26,257 | Self-hosted AI image/video generation studio with 500+ models and no content filters. A boundary-pushing, MIT-licensed alternative. |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0 (+1,180) | Unified team workspace — email, chat, docs, tasks, agents, CRM — with shared AI memory. Highest today-star rise in the trending list outside the skills wave. |
| [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice) | Swift | 0 (+187) | Fastest macOS dictation app with on-device STT and custom AI enhancement. A local Wispr Flow alternative and an edge-AI application signal. |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | TypeScript | 0 (+221) | Desktop app for generating 3D models from images using local AI on GPU. Represents the next creative-AI vertical. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,608 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. A canonical educational resource. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,758 | Efficient high-resolution image synthesis with linear diffusion transformer. A key architecture for efficient generative models. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,299 | LLM evaluation platform covering 100+ datasets and major open/closed models. Essential for comparing the latest LLM releases. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,483 | Build a tiny vLLM + Qwen on Apple Silicon to learn LLM inference. Highlights systems-level LLM engineering. |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 family of diffusion models for video and image generation. Another open video-gen model release to watch. |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0 (+768) | 14MB foundation model for tiny devices — phones, wearables, robots. A standout for ultra-small on-device AI. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0 (+354) | Local UI to run and train LLMs and diffusion models, including Qwen3.8, Kimi K3, MiniMax-H3, Gemma 4, DeepSeek-V4, FLUX. A practical fine-tuning/fast-training tool. |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0 (+201) | Official Python inference and LoRA trainer for the LTX-2 audio–video generative model. Marks production-grade open tooling for a new video-model family. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 166,951 | Context API to search, scrape, and interact with the web at scale. A major ingestion layer for RAG and agent research. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 106,024 | Turns codebases/docs/schemas/PDFs into queryable knowledge graphs using deterministic AST parsing, no vector store. Signals the shift to graph-native RAG. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,650 | Persistent context/memory across sessions for coding agents; compresses and injects relevant context. Essential for agent continuity. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,993 (+473) | Leading open-source RAG engine fusing RAG with agent capabilities. Trending +473 today as the context layer for LLMs remains a priority. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,623 | Leading document agent and OCR platform. A core framework for retrieval and data orchestration. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,628 | High-performance cloud-native vector database. Widely used for production RAG and similarity search. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,169 | Document index for vectorless, reasoning-based RAG. A notable new direction away from vector-store-first retrieval. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,965 | High-performance vector database and search engine. A central piece of modern RAG infrastructure. |

## 3. Trend Signal Analysis

The hottest signal is the emergence of **Agent Skills as a distribution format**. Anthropic’s [`anthropics/skills`](https://github.com/anthropics/skills) repo and the 4,504-star day for [`diagram-design`](https://github.com/cathrynlavery/diagram-design) indicate that skills — reusable instructions, prompts, and workflows — are becoming the “apps” of coding agents. [`obsidian-skills`](https://github.com/kepano/obsidian-skills) and [`agency-agents`](https://github.com/msitarzewski/agency-agents) extend this to personal knowledge and multi-persona automation.

A parallel infrastructure layer is forming around **context, memory, and cost**. [`semantica-agi/semantica`](https://github.com/semantica-agi/semantica) treats context as graph-native infrastructure, [`claude-mem`](https://github.com/thedotmack/claude-mem) persists agent memory across sessions, and [`headroom`](https://github.com/headroomlabs-ai/headroom) compresses tokens before they reach the LLM. [`Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) adds model routing with OpenAI/Anthropic-compatible APIs, signaling that multi-provider, cost-aware deployments are now a first-class concern.

On-device and tiny models are also moving fast. [`needle`](https://github.com/cactus-compute/needle) is a 14MB foundation model aimed at phones, wearables, and robots; [`FluidVoice`](https://github.com/altic-dev/FluidVoice) runs STT locally on macOS; and Rust-based projects like [`rig`](https://github.com/0xPlaygrounds/rig) and [`Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard) show systems-level AI engineering is no longer Python-only.

Finally, media generation is consolidating into **agentic pipelines**: [`OpenMontage`](https://github.com/calesthio/OpenMontage) packages 12 production pipelines and 700+ agent-skill files for video, [`LTX-2`](https://github.com/Lightricks/LTX-2) provides official inference/training for a new audio-video model, and vertical apps like [`MoneyPrinterTurbo`](https://github.com/harry0703/MoneyPrinterTurbo) make one-click short-video production mainstream. These moves align with the latest open-model wave — Ollama already lists Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, and Gemma — so tooling is racing to absorb new weights as fast as they are released.

## 4. Community Hot Spots

- **Agent Skills / skill ecosystems** — [`anthropics/skills`](https://github.com/anthropics/skills), [`diagram-design`](https://github.com/cathrynlavery/diagram-design), [`obsidian-skills`](https://github.com/kepano/obsidian-skills), and [`ComposioHQ/awesome-claude-skills`](https://github.com/ComposioHQ/awesome-claude-skills). The rapid star growth shows developers want composable, ready-to-run capabilities for Claude Code, Codex, and similar CLIs.

- **Agent workspaces / coding agents** — [`holaboss-ai/holaOS`](https://github.com/holaboss-ai/holaOS) and [`OpenHands/OpenHands`](https://github.com/OpenHands/OpenHands). These projects package agents, MCP integrations, tools, and shared memory into one product, making “bring your own agent” a mainstream workflow.

- **RAG / graph knowledge** — [`infiniflow/ragflow`](https://github.com/infiniflow/ragflow), [`Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify), [`VectifyAI/PageIndex`](https://github.com/VectifyAI/PageIndex), and [`topoteretes/cognee`](https://github.com/topoteretes/cognee). RAG is moving beyond vector search toward knowledge graphs and reasoning-based retrieval.

- **LLM routing / cost optimization** — [`NVIDIA-NeMo/Switchyard`](https://github.com/NVIDIA-NeMo/Switchyard), [`semantica-agi/semantica`](https://github.com/semantica-agi/semantica), [`rtk-ai/rtk`](https://github.com/rtk-ai/rtk), and [`headroom`](https://github.com/headroomlabs-ai/headroom). Multi-model and token-cost control are becoming essential for production.

- **Edge / on-device AI** — [`cactus-compute/needle`](https://github.com/cactus-compute/needle), [`altic-dev/FluidVoice`](https://github.com/altic-dev/FluidVoice), and [`Picovoice/picollm`](https://github.com/Picovoice/picollm). Tiny models and local inference unlock privacy, latency, and cost advantages.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*