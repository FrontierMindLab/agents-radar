# AI Open Source Trends 2026-08-12

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-12 04:07 UTC

---

# AI Open Source Trends Report — 2026-08-12

**Filter note:** Non-AI general-purpose tools (`nvm`, `manim`, `awesome-mac`, `project-based-learning`, `Files`, `Yazi`, `Bruno`, etc.) were excluded. All star numbers are copied from the provided input.

## 1. Today's Highlights

Agent Skills is now the dominant distribution format on GitHub: Anthropic’s official [`anthropics/skills`](https://github.com/anthropics/skills) repo arrived alongside independent skill packs like [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) and [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design). Meanwhile, multi-agent operations tooling is exploding — [`PrimeIntellect-ai/prime-agent`](https://github.com/PrimeIntellect-ai/prime-agent) (+1,138 today), [`stablyai/orca`](https://github.com/stablyai/orca) (+875), and [`paperclipai/paperclip`](https://github.com/paperclipai/paperclip) (+748) show the shift from single-agent prompts to fleets of managed agents. Vertical AI applications are also accelerating, notably personalized tutoring ([`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor), +812), finance analysis ([`ZhuLinsen/daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis)), and agentic video production ([`calesthio/OpenMontage`](https://github.com/calesthio/OpenMontage), +458). The broader signal is clear: the community is moving from model weights to reusable agent skills, agent context infrastructure, and domain-specific autonomous workflows.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+893) | Graph-native infrastructure for context and accountable AI systems. It stands out today for making provenance, context, and auditability first-class primitives for agent workloads. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,791 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. A single Rust binary with zero dependencies makes it a lightweight agent-economics layer. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 65,988 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM. It targets the token-cost bottleneck that currently limits long-running coding agents. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 165,964 | The context API to search, scrape, and interact with the web at scale. It is increasingly the retrieval fabric for data-hungry agent workflows. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,845 | Idiomatic Java library for building LLM-powered applications on the JVM. It brings agents, RAG, tool calling, and MCP support to enterprise Java stacks. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,246 | Modular and scalable framework for LLM applications in Rust. Its continued growth signals serious Rust adoption in agent and inference infrastructure. |
| [modelstudioai/cli](https://github.com/modelstudioai/cli) | TypeScript | 301 | Official Alibaba Cloud Bailian CLI exposing models, search, multimodal, and workflow capabilities as structured tool calls. It connects commercial model APIs directly to agent frameworks. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+1,616) | 29 editorial diagram types for Claude Code, delivered as self-contained HTML+SVG assets. It led today’s trending list with +1,616 stars, showing that specialized design-grade agent skills are highly demanded. |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0 (+958) | A complete AI agency in one repo — specialized expert agents ranging from frontend wizards to Reddit community specialists. The +958 today signal reflects demand for packaged multi-agent teams. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | JavaScript | 0 (+578) | Production-grade engineering skills for AI coding agents. It turns engineering know-how into reusable agent capabilities rather than one-off prompts. |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 0 (+485) | Anthropic’s public repository for Agent Skills. It is now the canonical reference point for the skills ecosystem around Claude Code and compatible coding agents. |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0 (+875) | An ADE (agent development environment) for running fleets of parallel agents with your own subscription. It represents a new tooling layer for multi-agent development and operations. |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0 (+748) | Open-source app for managing agents at work. With +748 today, it highlights enterprise demand for agent visibility, control, and lifecycle management. |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0 (+1,138) | Self-improving RLM agent for coding workflows and long-running autonomous tasks. It had one of the largest trending gains of the day, reflecting interest in reinforcement-learning-trained agents. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,031 | The agent engineering platform. It remains the broadest open-source toolkit for connecting LLMs, tools, memory, and RAG into agent systems. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | 0 (+812) | Lifelong personalized tutoring system for AI-driven education. The +812 today gain shows education is one of the fastest-moving vertical agent categories. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 0 (+458) | Open-source agentic video production system with 12 production pipelines, 100+ tools, and 700+ agent skill files. It effectively turns an AI coding assistant into a full video production studio. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 0 (+243) | LLM-powered multi-market stock analysis with live market data, news, decision dashboards, and notifications. Its zero-cost scheduled-run design makes autonomous finance agents accessible. |
| [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs) | Python | 0 (+28) | A benchmark for evaluating and improving agent capabilities in legal work. It gives the open-source community a measurable target for a high-value vertical domain. |
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,667 | Generates HD short videos from a topic or keyword using AI models and automated workflows. It remains one of the most popular practical examples of AI content automation. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,523 | User-friendly AI interface supporting Ollama, OpenAI API, and more. It is the leading self-hosted frontend for local LLM and RAG workflows. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,314 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. It provides unified access to frontier LLMs in a desktop-style workspace. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 44,948 | AI turns documents or topics into native PowerPoint decks with shapes, animations, charts, and narration. It targets the large office-document productivity market. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,863 (+80) | The model-definition framework for state-of-the-art ML across text, vision, audio, and multimodal models. It remains the central hub for model loading, inference, and training. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,329 | Tensors and dynamic neural networks with strong GPU acceleration. It is the de facto training substrate for most open-source LLMs and diffusion models. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,448 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. It remains the canonical educational resource for understanding LLM internals. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,576 | Train a 64M-parameter LLM from scratch in about two hours. Its popularity shows strong demand for ultra-low-cost, reproducible model training. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,468 | Learn LLM inference on Apple Silicon by building a tiny vLLM + Qwen stack. It appeals to systems engineers who want to understand inference under the hood. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,746 | Efficient high-resolution image synthesis with linear diffusion transformer. It represents continued innovation in efficient generative model architectures. |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 family of diffusion models for video and image generation. It is a fresh open model family relevant to the booming agentic-video trend. |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,960 | Open-source machine learning framework for everyone. It remains foundational infrastructure, though today’s agent-focused ecosystem is more centered on PyTorch and transformer-based tooling. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | 0 (+341) | RAG system designed for monorepos: query, understand, and edit multi-language codebases using AI and knowledge graphs. Its +341 today shows graph-RAG is gaining traction for code intelligence. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,363 | Turns any codebase, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph. It is a major signal that deterministic, vectorless RAG is becoming mainstream. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,310 | Leading open-source RAG engine that fuses RAG with agent capabilities to create a context layer for LLMs. It is one of the highest-starred dedicated RAG projects. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,461 | Captures everything an agent does during sessions, compresses it with AI, and injects relevant context into future sessions. Memory and context continuity are clear hot spots. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,076 | Universal memory layer for AI agents. It sits alongside claude-mem and cognee in the fast-growing “agent memory” category. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,627 | Local-first RAG and agent experience platform. It remains a popular all-in-one tool for owning and controlling your own AI stack. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,570 | Leading document agent and OCR platform, and a core RAG framework. It continues to define the baseline for retrieval over complex documents. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,925 | High-performance vector database and vector search engine built for AI workloads. It remains core infrastructure for embedding-based retrieval systems. |

## 3. Trend Signal Analysis

The hottest cluster today is not a new model checkpoint; it is agent skills and agent operations. Anthropic’s opening of [`anthropics/skills`](https://github.com/anthropics/skills) formalizes a distribution format that the community is adopting aggressively: [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills), [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design), and [`calesthio/OpenMontage`](https://github.com/calesthio/OpenMontage) package domain expertise as loadable skill files. Meanwhile, the largest star counts from today’s trending list belong to agent-autonomy and management tooling: [`prime-agent`](https://github.com/PrimeIntellect-ai/prime-agent) (+1,138), [`agency-agents`](https://github.com/msitarzewski/agency-agents) (+958), [`orca`](https://github.com/stablyai/orca) (+875), and [`paperclip`](https://github.com/paperclipai/paperclip) (+748). This signals a shift from prompt engineering to engineering the agents themselves — RLM training, parallel fleets, and operational control.

A second direction is the emergence of graph-native, “vectorless” knowledge systems. [`semantica-agi/semantica`](https://github.com/semantica-agi/semantica) positions itself as graph-native infrastructure for context and accountable AI; [`vitali87/code-graph-rag`](https://github.com/vitali87/code-graph-rag) and [`Graphify-Labs/graphify`](https://github.com/Graphify-Labs/graphify) build knowledge graphs for code RAG; and [`VectifyAI/PageIndex`](https://github.com/VectifyAI/PageIndex) explicitly markets “vectorless, reasoning-based RAG.” Combined with agent memory projects like [`claude-mem`](https://github.com/thedotmack/claude-mem) and [`mem0`](https://github.com/mem0ai/mem0), retrieval is moving toward explainability, relationships, and persistent context rather than pure embedding similarity.

Finally, vertical agents are maturing rapidly. Education ([`DeepTutor`](https://github.com/HKUDS/DeepTutor), +812), finance ([`daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis)), legal evaluation ([`harvey-labs`](https://github.com/harveyai/harvey-labs)), and video production ([`OpenMontage`](https://github.com/calesthio/OpenMontage)) show that open-source AI is moving from generic chatbots to domain-specific workflows. These developments align with the broader industry push toward agentic workflows: instead of racing purely on model parameters, the community is racing to make models useful, measurable, and governable in real jobs.

## 4. Community Hot Spots

- **Agent Skills standardization** — [`anthropics/skills`](https://github.com/anthropics/skills), [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills), and [`cathrynlavery/diagram-design`](https://github.com/cathrynlavery/diagram-design) are turning “skills” into a portable distribution format. Developers should build or adopt skills before writing bespoke prompt chains.

- **Multi-agent operations** — [`prime-agent`](https://github.com/PrimeIntellect-ai/prime-agent), [`orca`](https://github.com/stablyai/orca), and [`paperclip`](https://github.com/paperclipai/paperclip) represent RLM agents, agent development environments, and agent management. This is the emerging “agent ops” layer.

- **Graph / context RAG** — [`code-graph-rag`](https://github.com/vitali87/code-graph-rag), [`semantica`](https://github.com/semantica-agi/semantica), and [`graphify`](https://github.com/Graphify-Labs/graphify) point to retrieval that is relationship-aware, explainable, and less dependent on vector databases.

- **Agentic video production** — [`OpenMontage`](https://github.com/calesthio/OpenMontage) (+458 today) anchors a fast-growing vertical where agents move from script to finished video. It is one of the most complete open-source examples of agent-driven media production.

- **Vertical agent apps** — [`DeepTutor`](https://github.com/HKUDS/DeepTutor), [`daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis), and [`harvey-labs`](https://github.com/harveyai/harvey-labs) show that narrow, high-value workflows are easier to benchmark, ship, and monetize.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*