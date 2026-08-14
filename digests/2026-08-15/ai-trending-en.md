# AI Open Source Trends 2026-08-15

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-14 23:00 UTC

---

Scope note: non-AI trending repos (e.g., `holehe`, `SpiderFoot`, `RustDesk`, `OpenCut`) and generic developer tools without an AI/ML core were excluded.

## 1. Today's Highlights

Today’s star activity is concentrated around **agent enablement layers** rather than raw model releases. The day’s top project, `diagram-design`, is a Claude Code prompt/skill package for editorial diagrams — it pulled in **+3,651 stars** in one day, suggesting that high-quality agent “skills” are becoming first-class open-source artifacts. Meanwhile, `semantica` and `spec-kit` both crossed **+1,100 stars**, signaling growing demand for graph-native context and spec-driven AI developer workflows. Agent workspaces with shared memory — `holaOS`, `macro`, and `claude-mem` — show that persistent context is the new battleground in the open-source agent stack. On the model side, `needle`’s 14MB edge foundation model and `unsloth`’s local training UI indicate strong continued momentum toward efficient, locally run AI.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+1,147) | GitHub’s official toolkit for spec-driven development. Its one-day star surge reflects the industry’s shift toward structured, spec-first coding agent workflows. |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+1,183) | Graph-native infrastructure for context and accountable AI systems. It is one of the day’s fastest-rising projects, pointing to graph-based memory and traceability as a new AI infrastructure layer. |
| [ego-lite](https://github.com/citrolabs/ego-lite) | JavaScript | 0 (+153) | A fast shared browser state for AI agents like Codex and Claude Code. It targets a key bottleneck: letting agents safely use your logged-in browser state without disrupting your workflow. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,168 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. Its zero-dependency Rust design is emblematic of cost-aware AI developer infrastructure. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,267 | Modular Rust framework for building scalable LLM applications. It continues to gain traction as Rust becomes more prominent in AI tooling. |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | Python | 6,175 | A framework for building AI agents from small, reusable “atomic” components. It matches the broader push toward modular, composable agent architectures. |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0 (+69) | Cursor’s plugin specification and official plugins. Its presence in trending marks the platformization of AI code editor capabilities. |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 564 | Security gateway for AI and MCP traffic. It is early-stage but important for access control and governance in agent/MCP ecosystems. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) | TypeScript | 0 (+769) | Open-source, all-in-one AI agent workspace with 100+ integrations, MCP, and shared memory. The strong daily star count shows demand for “bring your own agent” control centers. |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0 (+435) | A unified team workspace linking email, chat, docs, tasks, CRM, and agents via shared AI memory. It applies agent memory beyond coding to general collaborative productivity. |
| [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | JavaScript | 0 (+302) | Open-source low-code platform for internal tools and AI agents. Its enterprise app-generation layer makes it a popular foundation for agent-powered business applications. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,164 | Agent harness performance optimization system for Claude Code, Codex, Cursor, and more. Its enormous star base shows how important skill/memory/security optimization has become. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 230,635 | “The agent that grows with you” from Nous Research. It is one of the most anticipated open agent projects and is closely tied to the Hermes model ecosystem. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,262 | The agent engineering platform. It remains the baseline framework for tool-calling, RAG, and complex agent workflows. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,245 | Makes websites accessible to AI agents for browser automation. It is central to the trend of giving agents real web-browsing capabilities. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,056 | AI-driven development platform for autonomous coding agents. Its sustained popularity makes it a flagship of open-source agentic software engineering. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+3,651) | A collection of 29 editorial diagram types for Claude Code, delivered as self-contained HTML+SVG. It is today’s top star-getter, proving that prompt/skill packages can be breakout open-source products. |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | TypeScript | 0 (+580) | Desktop app for generating 3D models from images or prompts using local AI on GPU. Local-first 3D generation is an emerging application category with strong early traction. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,105 | Open-source agentic video production system with 12 production pipelines and 700+ skill files. It is one of the most complete “video studio for coding agents” projects available. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,555 | Generates HD short videos from a topic or keyword using AI and automated workflows. Its massive popularity reflects the booming AI short-video content ecosystem. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 46,833 | AI-powered creation of native PowerPoint decks with shapes, transitions, charts, and narration. It targets office productivity with unusually deep formatting control. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 26,333 | Self-hosted AI image/video generation studio with 500+ models. Its “unrestricted” positioning makes it a notable open alternative to commercial video platforms. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,877 | LLM-powered multi-market stock analysis with real-time news, dashboards, and notifications. It demonstrates agent apps moving into finance decision-support. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,478 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. It has become a popular unified frontend for multiple frontier LLMs. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0 (+661) | A 14MB foundation model designed for phones, wearables, smart home, and robots. It is a striking signal of the race toward ultra-small, edge-deployable model architectures. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0 (+502) | Local UI and library for training and running LLMs and diffusion models. It remains a favorite for efficient local fine-tuning of models like Qwen, Kimi, Gemma, and DeepSeek. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,766 | Efficient high-resolution image synthesis with a linear diffusion transformer. NVIDIA’s architecture continues to influence efficient generative model design. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,106 | The standard model-definition and inference framework for text, vision, audio, and multimodal models. It remains foundational to nearly all open-source LLM work. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,375 | The dominant deep learning framework and core dependency for most LLM training/fine-tuning stacks. Its active popularity is a proxy for overall AI compute momentum. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,666 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. Its sustained popularity shows deep community interest in LLM internals. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,301 | LLM evaluation platform supporting 100+ datasets. Evaluation infrastructure is becoming more critical as model and agent choices multiply. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,487 | Learn LLM inference systems by building a tiny vLLM + Qwen on Apple Silicon. It is a strong educational entry in the “tiny AI stack” movement. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,385 (+474) | Leading open-source RAG engine fusing retrieval with agent capabilities. Its continued daily star growth underscores RAG as a core layer for LLM applications. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,459 | Platform for building agentic workflows and RAG pipelines in one collaborative workspace. It has become one of the most widely adopted open-source LLM app platforms. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,801 | User-friendly self-hosted AI interface supporting Ollama, OpenAI-compatible APIs, and RAG. It remains the default gateway for local-first model usage. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 106,366 | Turns codebases, docs, and SQL schemas into queryable knowledge graphs via a Claude Code/Cursor/Codex skill. It exemplifies the shift from vector-only retrieval to structured knowledge graphs. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,763 | Captures agent sessions and injects relevant context back into future sessions. It directly addresses the cross-session memory pain point now central to agent development. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,270 | Universal memory layer for AI agents. Persistent memory is rapidly becoming a required component in production agent systems. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,637 | High-performance, cloud-native vector database. It remains a primary infrastructure choice for large-scale RAG pipelines. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,977 | High-performance vector database and search engine. Its Rust-based architecture makes it a preferred option for scalable AI search workloads. |

## 3. Trend Signal Analysis

The strongest signal today is that **agent orchestration and context infrastructure** are attracting more community attention than base model releases. The top daily star gainers — `diagram-design`, `semantica`, `holaOS`, `spec-kit`, and `needle` — are not LLM weights but rather skills, memory layers, graph infrastructure, and edge model formats that make agents more useful. This suggests the open-source ecosystem has moved from “which model?” to “how do we manage agents, context, and cost?”

A new direction is the **packaging of agent knowledge as distributable files**: prompt bundles, skill catalogs, and spec-driven development toolkits. `diagram-design` is essentially a downloadable skill for Claude Code, while `spec-kit` is GitHub’s attempt to standardize spec-first workflows. Combined with `cursor/plugins`, this points toward a future where the app store for AI is built around agent capabilities, not just models.

Another emerging theme is **graph-native context**. `semantica`, `Graphify-Labs/graphify`, and even `topoteretes/cognee` are pushing beyond vector similarity toward knowledge graphs as the substrate for accountable AI memory. This is a notable architectural shift from traditional RAG.

Finally, the day’s trending list connects directly to recent LLM releases: `unsloth` explicitly supports Qwen3.8, Kimi K3, MiniMax-H3, Gemma 4, and DeepSeek-V4, while `deepseek-ai/awesome-deepseek-agent` reflects the growing DeepSeek agent ecosystem. The industry appears focused on making new models immediately useful inside agentic workflows, with local execution and token efficiency as key constraints.

## 4. Community Hot Spots

- **Agent skill packages and prompt products** — [diagram-design](https://github.com/cathrynlavery/diagram-design) (+3,651 today) is the clearest proof that high-quality “skills” for Claude Code and similar tools can become breakout open-source artifacts. Expect more curated skill-marketplace repos.
- **Agent workspaces with shared memory** — [holaOS](https://github.com/holaboss-ai/holaOS), [macro](https://github.com/macro-inc/macro), and [claude-mem](https://github.com/thedotmack/claude-mem) are attacking the same problem from different angles: persistent, cross-session agent context. This is the next major unlock for production agents.
- **Tiny/edge AI** — [needle](https://github.com/cactus-compute/needle) and [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) show growing interest in small models and inference systems that run on constrained hardware. Watch for more “14MB-class” model releases.
- **Spec-driven agent development** — [github/spec-kit](https://github.com/github/spec-kit) and [cursor/plugins](https://github.com/cursor/plugins) signal that the platforms themselves are standardizing how agents consume specs and plugins. This could reshape CI/CD and code review workflows.
- **Graph-native context and accountability** — [semantica](https://github.com/semantica-agi/semantica) and [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) are leading the push from “vector search” toward explainable, graph-structured AI memory. This direction is especially relevant for regulated industries and enterprise adoption.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*