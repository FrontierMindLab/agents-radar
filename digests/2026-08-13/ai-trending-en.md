# AI Open Source Trends 2026-08-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-13 01:04 UTC

---

# AI Open Source Trends Report — 2026-08-13

*Filtered out non-AI trending entries such as LocalSend, SpiderFoot, MediaCrawler, Julia, and general-purpose browser/file tools. Star counts show total GitHub stars and, where available, today’s star gain from the trending feed.*

## 1. Today's Highlights

The hottest AI open-source activity today is around agent skills and agent-fleet orchestration: [diagram-design](https://github.com/cathrynlavery/diagram-design) (+2,855), [agency-agents](https://github.com/msitarzewski/agency-agents) (+1,873), [orca](https://github.com/stablyai/orca) (+1,235), and [paperclip](https://github.com/paperclipai/paperclip) (+571) all surged, signaling a shift from single chatbots to packaged, manageable agent teams. Context and memory infrastructure is also emerging as a core layer — [semantica](https://github.com/semantica-agi/semantica) (+845) is building graph-native context for accountable AI, while established projects like [ragflow](https://github.com/infiniflow/ragflow), [claude-mem](https://github.com/thedotmack/claude-mem), and [cognee](https://github.com/topoteretes/cognee) continue to dominate. Domain-specific open models are expanding beyond text: [Kronos](https://github.com/shiyu-coder/Kronos) targets financial markets, [LTX-2](https://github.com/Lightricks/LTX-2) opens audio-video generation, and [needle](https://github.com/cactus-compute/needle) brings a 14MB foundation model to edge devices. Overall, the trend is clear: agents are becoming production systems that need skills, memory, orchestration, and control planes.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars | Summary |
| :--- | :--- | ---: | :--- |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,097 | The agent engineering platform, now centered on agentic workflows and tool calling. It remains the most widely used foundation for building LLM applications. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,369 | Local LLM runtime supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, Gemma, and more. It made running open models locally a commodity. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,018 | The model-definition framework for state-of-the-art ML across text, vision, audio, and multimodal tasks. Still the default hub for open model weights. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,351 | Tensors and dynamic neural networks with strong GPU acceleration. The dominant training framework for open-source LLM and diffusion research. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,922 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. Its single Rust binary and zero dependencies make it a strong cost-control layer. |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0 (+845) | Graph-native infrastructure for context and accountable AI systems. The +845-star debut today points to rising demand for traceable agent context. |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0 (+421) | NVIDIA NeMo’s Rust-based repository appeared on today’s trending list. The +421-star spike shows strong developer interest in NeMo-ecosystem infrastructure, though the feed includes no description. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,852 | Idiomatic Java library for LLM-powered applications on the JVM, with unified APIs for LLMs, vector stores, tool calling, MCP, agents, and RAG. It is key for enterprise Java AI adoption. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars | Summary |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 229,581 | “The agent that grows with you” — the highest-starred dedicated AI-agent repository in this dataset. It represents the trend toward persistent, self-improving assistants. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,759 | Agent-harness performance optimization with skills, instincts, memory, security, and research-first development for Claude Code, Codex, Cursor, and more. It is one of the most popular dev-tool projects in the AI agent space. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,837 | AI-driven development platform for autonomous coding agents. It remains a reference implementation for open-source software engineering agents. |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0 (+1,235) | Agent development environment for working with a fleet of parallel agents, running any coding agent with your own subscriptions on desktop, mobile, or VPS. The +1,235-star surge today signals strong demand for multi-agent orchestration. |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0 (+1,873) | A complete “AI agency” packaged as specialized agents with personas, from frontend wizards to Reddit community ninjas. The +1,873 gain today highlights the appeal of deployable agent teams. |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0 (+571) | Open-source app to manage AI agents at work. It is part of a new control-plane category for running agents in real organizations. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+2,855) | 29 editorial diagram types for Claude Code, packaged as self-contained HTML+SVG and explicitly avoiding “Mermaid-slop.” It is today’s top star-gainer, showing that high-quality agent skills/assets are a rapidly growing category. |
| [embabel/embabel-agent](https://github.com/embabel/embabel-agent) | Kotlin | 0 (+40) | Agent framework for the JVM, pronounced Em-BAY-bel. Its Kotlin implementation broadens agent development beyond Python, TypeScript, and Rust. |

### 📦 AI Applications

| Project | Lang | Stars | Summary |
| :--- | :--- | ---: | :--- |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0 (+227) | Unified workspace for teams combining email, chat, docs, tasks, agents, calls, and CRM, all @-linked with shared AI memory. It is a strong example of AI-native productivity software. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 45,583 (+476) | AI turns documents or topics into real native PowerPoint decks with shapes, transitions, charts, narration, and custom templates. Its appearance on both today’s trending list and the AI-agent topic search shows vertical document generation is a hot use case. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,355 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants, unified across frontier LLMs. It is becoming a main desktop hub for power users. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,613 | Self-hosted AI interface supporting Ollama and OpenAI-compatible APIs. It remains the default open-source UI layer for local LLM deployments. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,814 | Generates HD short videos from a topic or keyword using AI models and automated workflows. It remains a leading example of automated content creation. |
| [xixihhhh/clipforge](https://github.com/xixihhhh/clipforge) | TypeScript | 533 | Open-source AI short-video generator for e-commerce: product image to selling points, script, visuals, subtitles, and platform-ready output. It shows vertical AI video tools gaining momentum. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 26,194 | Unrestricted, self-hosted AI image/video generation studio with 500+ models, including Flux, Kling, Sora, and Veo. It signals demand for uncensored local generative media. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,640 | Open-source AI job search that scans portals, scores listings with an A–F rubric, tailors CVs, and tracks applications inside Claude Code, Codex, and other AI CLIs. It demonstrates agents entering everyday professional workflows. |

### 🧠 LLMs / Training

| Project | Lang | Stars | Summary |
| :--- | :--- | ---: | :--- |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0 (+65) | Official Python inference and LoRA trainer for the LTX-2 audio–video generative model. Open-weight audio-video generation with custom fine-tuning is a frontier area. |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python | 0 (+266) | A foundation model for the language of financial markets, gaining +266 stars today. Domain-specific foundation models are still rare, making this a standout release. |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0 (+315) | A 14MB foundation model for tiny devices — phones, wearables, smart home, and robots. The extremely small footprint signals a new edge-AI direction. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,751 | Efficient high-resolution image synthesis with a linear diffusion transformer, from NVIDIA Labs. It remains an important architecture reference for fast generation. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,532 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. It continues to be the most popular educational resource for understanding LLM internals. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,297 | LLM evaluation platform supporting 100+ datasets and many open/closed models. Evaluation infrastructure is becoming increasingly important as open models ship faster. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,480 | Learn LLM inference on Apple Silicon by building a tiny vLLM + Qwen. It reflects growing interest in systems-level LLM engineering. |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Family of diffusion models for video and image generation. It shows the open model ecosystem continuing to expand beyond text-to-image. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars | Summary |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,550 (+139) | Leading open-source RAG engine that fuses retrieval-augmented generation with agent capabilities. It remains a core context layer for LLMs. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,249 | Build agentic workflows and RAG pipelines with rich model and tool support, deployable to cloud, VPC, or self-hosted. It is one of the most adopted LLMOps platforms. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,600 | The leading document agent and OCR platform, evolved well beyond a data framework. It is central to connecting LLMs with enterprise documents. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,615 | High-performance, cloud-native vector database built for scalable vector ANN search. It remains standard infrastructure for large-scale RAG. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,941 | High-performance vector database and search engine for next-generation AI. Its Rust core makes it a natural fit for performance-sensitive agent stacks. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 29,980 | Open-source AI memory platform for agents, providing persistent long-term memory through a self-hosted knowledge graph engine. Memory is becoming the new hot layer. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,553 | Captures agent sessions, compresses them with AI, and injects relevant context into future sessions for Claude Code, Codex, Gemini, and more. It directly addresses cross-session memory gaps. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,156 | Document index for vectorless, reasoning-based RAG. It is a notable new direction beyond embeddings-only retrieval. |

## 3. Trend Signal Analysis

The clearest signal from today’s data is that the center of gravity has shifted from single chatbots to fleets of agents and the tooling around them. The top star-gaining repositories — [diagram-design](https://github.com/cathrynlavery/diagram-design) (+2,855), [agency-agents](https://github.com/msitarzewski/agency-agents) (+1,873), [orca](https://github.com/stablyai/orca) (+1,235), and [paperclip](https://github.com/paperclipai/paperclip) (+571) — are all about packaging agent abilities, running parallel agents, or managing agents at work. In parallel, context and memory infrastructure is emerging as a must-have layer: [semantica](https://github.com/semantica-agi/semantica) is building graph-native context for accountable AI, while established projects like [ragflow](https://github.com/infiniflow/ragflow), [claude-mem](https://github.com/thedotmack/claude-mem), [cognee](https://github.com/topoteretes/cognee), and [rtk](https://github.com/rtk-ai/rtk) are attacking retrieval, cross-session memory, and token cost.

New tech stacks are appearing. Rust is increasingly visible in agent infrastructure ([Switchyard](https://github.com/NVIDIA-NeMo/Switchyard), [macro](https://github.com/macro-inc/macro), [rtk](https://github.com/rtk-ai/rtk)), Kotlin/JVM is represented by [embabel-agent](https://github.com/embabel/embabel-agent), and graph-native/vectorless RAG ([semantica](https://github.com/semantica-agi/semantica), [PageIndex](https://github.com/VectifyAI/PageIndex), [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)) suggests a post-embedding retrieval direction. Edge AI is also becoming practical: [needle](https://github.com/cactus-compute/needle) is only 14MB, while [tiny-llm](https://github.com/skyzh/tiny-llm) and [picollm](https://github.com/Picovoice/picollm) cater to on-device inference. Domain-specific open models are expanding beyond text: [Kronos](https://github.com/shiyu-coder/Kronos) targets financial markets, and [LTX-2](https://github.com/Lightricks/LTX-2) opens audio-video generation.

The connection to recent LLM releases is visible through model-agnostic tooling: [Ollama](https://github.com/ollama/ollama) highlights Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, Qwen, and gpt-oss, while many agent repos are explicitly optimized for Claude Code, Codex, and Gemini CLI. Finally, open video generation is verticalizing — [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo), [clipforge](https://github.com/xixihhhh/clipforge), [ArcReel](https://github.com/ArcReel/ArcReel), and [dramaclaw](https://github.com/dramaclaw/dramaclaw) are turning frontier model capability into turnkey production tools.

## 4. Community Hot Spots

- **Claude Code skill packs are the new app store.** [diagram-design](https://github.com/cathrynlavery/diagram-design) was the single biggest AI gainer today, and [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) plus [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) show that reusable skills are becoming the dominant distribution mechanism for coding-agent capabilities.

- **Fleet orchestration and agent management platforms.** [orca](https://github.com/stablyai/orca) and [paperclip](https://github.com/paperclipai/paperclip) are early examples of a new layer for running, observing, and managing many agents at once — a clear step beyond running a single assistant.

- **Context, memory, and token-cost engineering.** [semantica](https://github.com/semantica-agi/semantica), [cognee](https://github.com/topoteretes/cognee), [claude-mem](https://github.com/thedotmack/claude-mem), and [rtk](https://github.com/rtk-ai/rtk) are attacking the same core problem: long-running agents need persistent context, efficient retrieval, and lower token spend.

- **Small and edge AI models.** [needle](https://github.com/cactus-compute/needle) at 14MB, [tiny-llm](https://github.com/skyzh/tiny-llm), and [picollm](https://github.com/Picovoice/picollm) point toward private, low-cost inference on user devices — a likely next battleground.

- **Vertical AI video pipelines.** [LTX-2](https://github.com/Lightricks/LTX-2), [clipforge](https://github.com/xixihhhh/clipforge), [ArcReel](https://github.com/ArcReel/ArcReel), and [dramaclaw](https://github.com/dramaclaw/dramaclaw) show the shift from raw generative models to domain-specific production workflows.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*