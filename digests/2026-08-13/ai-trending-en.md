# AI Open Source Trends 2026-08-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-13 09:48 UTC

---

# AI Open Source Trends Report — 2026-08-13

## 1. Today's Highlights

Today's GitHub star activity is heavily concentrated in **agent operations and agent-experience tooling**, rather than new base-model releases. The biggest single-day spike is `cathrynlavery/diagram-design` (+2,855), a Claude Code asset pack for editorial diagrams, followed by `agency-agents` (+1,873) and `orca` (+1,235) — all pointing to a new wave of pre-packaged agent teams and parallel-agent orchestration. On the infrastructure side, `semantica` (+845) pushes graph-native context and accountability, NVIDIA-NeMo's `Switchyard` (+421) brings a Rust-based entry, and `needle` (+315) shrinks foundation models to 14MB for edge devices. Vertical AI applications such as `ppt-master` (+476) and financial models like `Kronos` (+266) round out a busy, application-heavy day.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+845) | Graph-native infrastructure for context and accountable AI systems. The +845 one-day surge shows demand for auditable, structured AI memory beyond plain vector search. |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0 (+421) | A Rust-based repository appearing under NVIDIA NeMo's open-source umbrella, likely targeting LLM/agent infrastructure. Its +421 debut makes it a leading indicator for NVIDIA's lower-level AI tooling investments. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,419 | Local LLM runtime that makes open models runnable with a single command. It remains the default on-prem model layer for agent and RAG deployments. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,968 | A CLI proxy that reduces LLM token consumption by 60–90% on common developer commands. Its popularity underscores token cost/context efficiency as core infrastructure. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,860 | A Java library for building LLM applications with unified provider APIs, MCP support, and RAG. It shows the JVM ecosystem gaining first-class LLM/agent tooling. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 166,674 | The "context API" for searching, scraping, and interacting with the web at scale. It is the data-access layer for many AI agents and retrieval pipelines. |
| [embabel-agent](https://github.com/embabel/embabel-agent) | Kotlin | 0 (+40) | An agent framework for the JVM, pronounced Em-BAY-bel. Its small but visible debut signals that agent frameworks are expanding beyond Python/TypeScript into enterprise JVM stacks. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+2,855) | Self-contained HTML/SVG templates for 29 editorial diagram types, designed to improve Claude Code's diagram output. The largest single-day gain today shows strong demand for higher-quality agent-generated visuals. |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0 (+1,235) | An Agent Development Environment for running fleets of parallel coding agents with your own subscriptions. +1,235 today signals the shift from single-assistant UIs to multi-agent orchestration. |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0 (+1,873) | A shell-based package of specialized agent personas, from frontend wizards to Reddit community ninjas. It received +1,873 stars today because pre-packaged agent teams are becoming a distributable product. |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0 (+571) | An open-source app for managing agents at work, focused on control and visibility across multiple agents. +571 today indicates "agent management" is emerging as a separate platform layer. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,887 | Open-source AI-driven development platform for autonomous coding agents. It remains a reference architecture for AI software engineering workflows. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,041 | Makes websites accessible to AI agents by automating browser interaction at scale. It is the essential plumbing for web-enabled agents. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 229,835 | Nous Research's personal agent that "grows with you," pairing open model ecosystem with an agent harness. Its 229k stars reflect huge community appetite for self-improving agents. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,578 | The project that popularized autonomous GPT agents and now provides tools to build and run agents. It remains a foundational reference for agent workflows. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0 (+227) | A unified workspace combining email, chat, docs, tasks, agents, calls, and CRM with shared AI memory. +227 today is a signal that agents are being embedded into horizontal collaboration products. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 46,245 (+476) | AI converts documents or topics into native PowerPoint decks with real shapes, animations, charts, and narration. The +476 jump shows continued demand for AI that produces usable artifacts, not just text. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,920 | Generates short videos from a topic or keyword via AI models and automated workflows. It remains one of the most popular vertical AI content automation projects. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,390 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants, unified access to frontier LLMs. It is a leading open-source desktop client for everyday AI use. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 45,787 | A privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. It shows personal knowledge management merging with agent memory. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,667 | An LLM-powered multi-market stock analysis system with real-time news, dashboards, and automated alerts. It is a popular example of AI agents applied to financial decision support. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,682 | Open-source AI job search that scans portals, scores listings, tailors CVs, and tracks applications. Its presence shows agents moving into personal career workflow automation. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python | 0 (+266) | A foundation model for the language of financial markets. It is a notable example of domain-specific model development beyond general chatbots. |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0 (+315) | A 14MB foundation model for tiny devices such as phones, wearables, smart home, and robots. The +315 stars today highlight growing interest in ultra-efficient edge AI. |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0 (+65) | Official Python inference and LoRA trainer package for the LTX-2 audio-video generative model. Open weights plus fine-tuning tooling make it a reference for community multimodal generation. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,753 | Efficient high-resolution image synthesis with a linear diffusion transformer. It remains a strong open-source option for fast, high-quality image generation. |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | A family of diffusion models for video and image generation. It represents the ongoing cadence of fully open diffusion releases. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,050 | The standard open-source framework for state-of-the-art models in text, vision, audio, and multimodality. It continues to anchor the open model ecosystem. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,556 | A step-by-step implementation of a ChatGPT-like LLM in PyTorch. Its popularity shows sustained developer demand for understanding models from first principles. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,781 (+139) | A leading open-source RAG engine fusing retrieval with agent capabilities. It remains a core context layer for LLM applications and is still gaining daily stars. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,312 | A collaborative workspace for building agentic workflows and RAG pipelines. Its scale makes it one of the most important open-source LLM application platforms. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,149 | The agent engineering platform, with a large ecosystem of integrations, chains, and agent primitives. It continues to be the default framework for many RAG/agent builds. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,613 | A leading document agent and OCR platform for connecting enterprise data to LLMs. It is widely used for retrieval-heavy production systems. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,835 | Turns any codebase, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph using deterministic AST parsing and no vector store. It demonstrates the growing graph-based alternative to embeddings-only RAG. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,673 | A local-first AI workspace for RAG and agent experiences with full ownership of data. It remains a go-to self-hosted alternative to hosted AI productivity tools. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,178 | A universal memory layer for AI agents. It solves the cross-session memory problem, making it central to long-running agents. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,623 | A high-performance, cloud-native vector database for scalable ANN search. It remains a core piece of production RAG infrastructure. |

---

## 3. Trend Signal Analysis

Today's star flow tells a clear story: the community is no longer focused on a single agent chat box; it wants **fleet operations, memory, and usable artifacts**. The biggest momentum is in agent-team assets and management layers — `Agency-Agents`, `Orca`, `Paperclip`, and even `diagram-design` for Claude Code. This connects to recent LLM release cycles: as base models become more interchangeable, value is shifting to orchestration, control, and output quality.

The rise of graph-native infrastructure — `Semantica`, `Graphify`, and `Cognee` — and token-compression tools like `rtk` and `headroom` suggests **context is the new bottleneck**. Graph-based RAG is challenging the dominant vector-only approach, and "accountable" AI context is becoming a design goal rather than an afterthought.

At the same time, the model frontier is splitting in two directions: domain-specific and multimodal releases (`Kronos`, `LTX-2`, `Sana`, `Kandinsky`) continue to expand, but ultra-efficient models like `needle` are pulling AI toward phones and robots. The spread of Rust and Kotlin/JVM projects — `Switchyard`, `Macro`, `embabel-agent`, `rig` — also indicates that AI infrastructure is becoming genuinely polyglot. The strongest follow-up signal to watch is whether today's early spikes in agent management and edge foundation models convert into sustained ecosystems.

---

## 4. Community Hot Spots

- **Multi-agent fleet management** — [stablyai/orca](https://github.com/stablyai/orca), [paperclipai/paperclip](https://github.com/paperclipai/paperclip), [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents): parallel agents and workforce management are now a distinct software category.

- **Claude Code skill/template economy** — [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design), [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills): agent skill packs and prompt/template collections are becoming a distribution format, and `diagram-design` had the single biggest star spike today.

- **Graph-native RAG and context** — [semantica-agi/semantica](https://github.com/semantica-agi/semantica), [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), [topoteretes/cognee](https://github.com/topoteretes/cognee): vector-only retrieval is being challenged by knowledge graphs, explicit reasoning, and accountable context.

- **Edge/on-device AI** — [cactus-compute/needle](https://github.com/cactus-compute/needle), [Picovoice/picollm](https://github.com/Picovoice/picollm): a 14MB foundation model could unlock private, low-latency AI on consumer devices and robots.

- **Generative video automation** — [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2), [ArcReel/ArcReel](https://github.com/ArcReel/ArcReel), [dramaclaw/dramaclaw](https://github.com/dramaclaw/dramaclaw): open model weights plus agent-driven pipelines are making AI video creation more production-ready.

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*