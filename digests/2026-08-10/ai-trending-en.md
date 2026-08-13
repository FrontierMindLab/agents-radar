# AI Open Source Trends 2026-08-10

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-10 04:40 UTC

---

# AI Open Source Trends Report — 2026-08-10

**Filtering note:** Non-AI trending repos were excluded: `pranshuparmar/witr` (system tracing), `goauthentik/authentik` (auth infrastructure), and `pingdotgg/t3code` (no clear AI description in the provided data).

---

## 1. Today's Highlights

Today’s clearest winner is the **agent-skills ecosystem**: `google/skills` (+528), `addyosmani/agent-skills` (+680), and `agency-agents` (+858) all surged, while `PrimeIntellect-ai/prime-agent` (+2,356) became the #1 trending repo with a self-improving RLM agent for long-running coding tasks. On the knowledge side, `code-graph-rag` (+96) and `Graphify-Labs/graphify` show a strong shift toward **deterministic knowledge-graph RAG** instead of naive vector search for codebases. Vertical AI applications are also broadening — LLM stock analysis (+306), legal-agent benchmarks (+47), and DeepMind weathernext (+86) all gained traction. Meanwhile, ComfyUI’s continued daily growth and the large video-generation topic cluster confirm that open-source diffusion pipelines remain a durable hot zone.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,154 | Local LLM runtime now advertising support for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma. It remains the default self-hosted inference layer for agent and RAG stacks. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,508 | The model-definition framework for SOTA text, vision, audio, and multimodal models. Its breadth makes it the base dependency for most new open-source AI releases. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 143,836 | The agent engineering platform for chaining models, tools, and memory. New agent/tool abstractions keep it central to production LLM applications. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 164,311 | Search, scrape, and interact with the web as context for LLMs. Its momentum shows growing demand for live web grounding in agentic workflows. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,392 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. A zero-dependency Rust binary representing the new focus on context-cost control. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 65,676 | Compresses tool outputs, logs, and RAG chunks before they reach the LLM, saving 20–95% tokens with the same answers. Works as a library, proxy, or MCP server. |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | 0 (+365) | The most powerful modular diffusion GUI/API/backend with a graph/node interface. Sustained daily stars keep it the center of open-source image/video generation workflows. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,305 | Tensors and dynamic neural networks in Python; the core training/inference framework for nearly every project in this report. Its ecosystem remains the default for LLM and diffusion model work. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,056 | Agent-harness performance optimization system with skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor, and beyond. Highest-starred project in the dataset, showing the centrality of agent-harness quality. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 228,019 | “The agent that grows with you” — a general-purpose personal agent. Its enormous star base signals strong community demand for long-lived, adaptive agents. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,471 | The classic accessible AI agent platform. It continues to define the vision of autonomous task automation for a broad user base. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,515 | Makes websites accessible to AI agents for online task automation. The web-browsing layer is becoming a must-have capability for agentic applications. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,566 | AI-driven development platform that turns coding agents into practical engineering assistants. It remains one of the most active projects for software-focused agents. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 46,801 | Ultra-lightweight, self-hosted personal AI agent framework with WebUI, tools, memory, MCP, and multi-agent workflows. It represents the growing local-first agent stack. |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0 (+2356) | A self-improving RLM agent for coding workflows and long-running autonomous tasks. Today’s #1 trending repo is a strong signal for self-evolving coding agents. |
| [google/skills](https://github.com/google/skills) | Python | 0 (+528) | Agent Skills for Google products and technologies. Official big-tech validation of “skills” as a portable unit of agent capability. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,342 | User-friendly self-hosted AI interface supporting Ollama and OpenAI-compatible APIs. It is the de facto UI layer for local LLM deployments. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,366 | Automatically generates HD short videos from a topic or keyword using AI workflows. One of the most-starred AI application templates in the open-source ecosystem. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,536 | Local-first “own your intelligence” agent experience with RAG and chat capabilities. It remains a strong choice for privacy-conscious teams. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,194 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. Unified access to frontier LLMs makes it a versatile desktop AI hub. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 44,153 | Turns documents or topics into native PowerPoint decks with transitions, animations, data-backed charts, and audio narration. Shows GenAI moving deeper into office productivity. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 25,968 | Open-source alternative to AI video platforms with 500+ models, self-hosted and MIT licensed. It is a popular but controversial “unrestricted” media generation app. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 0 (+306) | LLM-powered multi-market stock analysis with multi-source data, real-time news, decision dashboards, and automated notifications. A fast-adopting vertical agentic finance app. |
| [google-deepmind/weathernext](https://github.com/google-deepmind/weathernext) | Python | 0 (+86) | DeepMind’s weather prediction project — an example of AI foundation models entering high-impact scientific domains. Its appearance on the trending list signals interest in AI for climate/weather. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,101 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. It is the standard educational resource for understanding model internals. |
| [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) | Jupyter Notebook | 89,214 | A 12-week, 26-lesson classic ML curriculum with quizzes. It continues to onboard new developers into the AI/ML ecosystem. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,506 | Train a 64M-parameter LLM from scratch in about 2 hours. It dramatically lowers the barrier for hands-on pretraining experiments. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,728 | Efficient high-resolution image synthesis with a linear diffusion transformer. A key open-weight model for efficient generative image workloads. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,287 | LLM evaluation platform supporting 100+ datasets and many model families. Evaluation is becoming critical as new open-weight models ship rapidly. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,458 | Learn LLM inference on Apple Silicon by building a tiny vLLM + Qwen. It targets systems engineers who want practical inference knowledge. |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 family of diffusion models for video and image generation. Signals continued lab investment in open diffusion model research. |
| [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) | Jupyter Notebook | 2,591 | Comprehensive Generative AI roadmap, projects, use cases, and interview preparation. A useful educational companion to the training-focused repos. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 104,675 | Turns any codebase, docs, SQL schemas, or PDFs into a queryable knowledge graph using deterministic AST parsing — no vector store. Major momentum behind code-aware knowledge graphs. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,232 | Persistent context across agent sessions; captures and compresses sessions, then injects relevant context into future sessions. This directly addresses agent memory’s biggest gap. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,146 | Leading open-source RAG engine that fuses RAG with agent capabilities. It remains a default choice for deep document Q&A systems. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 62,899 | Universal memory layer for AI agents. It is increasingly critical for long-running agents that need persistent user and task memory. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,518 | Leading document agent and OCR platform. It remains one of the most flexible frameworks for connecting private data to LLMs. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,579 | High-performance, cloud-native vector database built for scalable vector ANN search. It powers a large share of production RAG stacks. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,892 | High-performance vector database and search engine purpose-built for AI. Its Rust-based performance continues to attract new users. |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | 0 (+96) | “Ultimate RAG for your monorepo” — query, understand, and edit multi-language codebases using AI and knowledge graphs. Today’s trending entry shows developer appetite for code-aware retrieval. |

---

## 3. Trend Signal Analysis

The most explosive attention today is around **agent skills and self-improving coding agents**. `google/skills`, `addyosmani/agent-skills`, `agency-agents`, and `prime-agent` all appeared on the trending list simultaneously, with `prime-agent` adding +2,356 stars. This signals a shift from monolithic agent frameworks to **composable, reusable skills** that can be dropped into Claude Code, Codex, or OpenClaw. The existence of catalogs like `agentic-awesome-skills` with 2,005+ skills, plus Google’s official skills repo, points to an emerging packaging standard for agent behavior.

A second clear signal is the move beyond naive vector retrieval for code and enterprise knowledge. `code-graph-rag` and `Graphify-Labs/graphify` use deterministic AST parsing and knowledge graphs, while `VectifyAI/PageIndex` explicitly pursues “vectorless, reasoning-based RAG.” At the same time, token/context optimization projects — `rtk`, `headroom`, and `ECC` — are becoming core infrastructure rather than nice-to-have, because long-horizon agents burn context windows quickly.

The data also reflects the latest open-weight model cycle. Ollama’s readme now lists Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma, meaning local inference is racing to absorb new models. That fuels demand for evaluation platforms like `OpenCompass`, training-from-scratch resources like `minimind` and `LLMs-from-scratch`, and agent harnesses that can target multiple models.

Finally, vertical AI applications are broadening beyond coding: LLM stock analysis, legal-agent benchmarks, and DeepMind weathernext show agents moving into finance, law, and science.

---

## 4. Community Hot Spots

- **Agent Skills / Skills catalogs** — [google/skills](https://github.com/google/skills), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills). Skills are becoming the “npm packages” of agent behavior, with low friction to adopt and share.

- **Self-improving coding agents** — [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent), [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix), [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands). The #1 trending repo today is a self-improving RLM agent for long-running autonomous coding tasks.

- **Code knowledge-graph RAG** — [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag), [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), [infiniflow/ragflow](https://github.com/infiniflow/ragflow). Structured understanding of monorepos is beating naive chunk-vector search for code tasks.

- **Agent memory / context compression** — [mem0ai/mem0](https://github.com/mem0ai/mem0), [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom). Persistent memory and token reduction are now the main bottlenecks for agent autonomy.

- **Generative video / Comfy pipelines** — [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI), [ArcReel/ArcReel](https://github.com/ArcReel/ArcReel), [dramaclaw/dramaclaw](https://github.com/dramaclaw/dramaclaw), [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo). From storyboard to short video, open-source pipelines are becoming production-ready.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*