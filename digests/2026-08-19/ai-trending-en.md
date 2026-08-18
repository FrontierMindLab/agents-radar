# AI Open Source Trends 2026-08-19

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-18 23:00 UTC

---

# AI Open Source Trends Report — 2026-08-19

**Scope note:** Non-AI entries from the raw trending list (`public-apis`, `omarchy`, `Motrix`, `PLFM_RADAR`, `OpenCut`) and non-AI topic-tagged projects such as `Front-End-Checklist` were excluded. Where a repo appears in both sources, the topic-search total is used and today’s delta is shown in parentheses.

---

## 1. Today's Highlights

Today’s fastest-moving AI development is the convergence of **agent memory, context, and reusable skills**. `akitaonrails/ai-memory` (+730 today) and `volcengine/OpenViking` (+298 today) both target persistent context for coding agents, while `claude-mem` and `mem0` remain high-star reference points in the same space. On the application side, `harry0703/MoneyPrinterTurbo` (+2,306 today) continues to lead the one-click AI short-video wave, supported by a broader cluster of agentic video projects such as `OpenMontage` and `ArcReel`. Local inference on Apple Silicon is also becoming a first-class category: `jundot/omlx` (+366 today) brings continuous batching and SSD caching to macOS, and Ollama’s model list shows rapid absorption of new open-weight releases. Finally, `mukul975/Anthropic-Cybersecurity-Skills` (+726 today) signals a shift toward structured, domain-specific skill packs for AI agents rather than only generic agent harnesses.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,902 | Local LLM runtime that now lists Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and more. Remains the default self-hosted model runner. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,227 | The standard model-definition framework for state-of-the-art ML models in text, vision, audio and multimodal inference. Fundamental hub for open-source AI. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,497 | Agent engineering platform with tools, memory, RAG and orchestration. Still the most widely used framework for production LLM apps. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 169,123 | Search, scrape and interact with the web at scale as a context API for LLMs and agents. Critical infrastructure for grounding agent workflows. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,536 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. A sign of the ecosystem’s shift toward cost efficiency. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 107,922 | Turns any codebase into a queryable knowledge graph without a vector store. Uses deterministic AST parsing and explains every edge. |
| [jundot/omlx](https://github.com/jundot/omlx) | Python | — (+366) | LLM inference server with continuous batching and SSD caching for Apple Silicon, managed from the macOS menu bar. Strong local-first momentum. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,958 | Agent harness performance optimization system with skills, instincts, memory and security. One of the largest “agent-native” repos tracked. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 232,520 | “The agent that grows with you” — a general-purpose agent project with very broad community uptake. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,672 | The original accessible AI agent platform, still a baseline for autonomous agent experimentation. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,649 | Makes websites accessible to AI agents and automates real online tasks. Core web-agent infrastructure. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,421 | AI-driven development agent platform. One of the most active coding-agent projects in the ecosystem. |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 46,549 | Lightweight super AI assistant and agent harness with plan-and-tool execution, memory and multi-model support. Formerly chatgpt-on-wechat. |
| [chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin) | TypeScript | — (+256) | Local multi-agent harness focused on running multiple agents on-device. Trending signal for lightweight local orchestration. |
| [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Python | — (+726) | 817 structured cybersecurity skills for AI agents mapped to MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND and more. Shows domain expertise being packaged as agent skills. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 108,461 (+2,306) | Generates HD short videos from a topic or keyword using AI models and automated workflows. Today’s clear star by new stars. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 65,328 | Open-source AI job search that scans job portals, scores listings with a rubric, tailors CVs and tracks applications from an AI coding CLI. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 63,294 | LLM-powered multi-market stock analysis system with real-time news, decision dashboard and automated notifications. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,732 | AI productivity studio with smart chat, autonomous agents and 300+ assistants. A unified front-end for frontier LLMs. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,775 | Open-source agentic video production system with 12 production pipelines and 700+ agent skill files. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 47,759 | AI turns documents or topics into real, native PowerPoint decks with shapes, animations and narration. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 26,640 | Self-hosted, unrestricted alternative to AI video platforms with 500+ image/video models. |
| [ArcReel/ArcReel](https://github.com/ArcReel/ArcReel) | Python | 4,061 | Self-hosted AI video workspace for turning novels and scripts into characters, storyboards, video and CapCut drafts. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 197,045 | The foundational open-source ML framework. Remains essential for training and deployment at scale. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,468 | Dynamic neural network framework and the de facto research standard for training LLMs and generative models. |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | Python | 66,971 | Classic ML library for training, evaluation and data processing. Still the workhorse of non-deep learning ML. |
| [keras-team/keras](https://github.com/keras-team/keras) | Python | 64,239 | High-level deep learning API. Continues to attract beginners and rapid-prototyping users. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,785 | Efficient high-resolution image synthesis with a linear diffusion transformer. Relevant as a lightweight generative model. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,501 | Learn to build an LLM inference system on Apple Silicon by developing a tiny vLLM-style engine. Strong educational signal for systems engineers. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 107,922 | Converts codebases, docs, SQL schemas and PDFs into an explainable knowledge graph. Positioned as a no-vector-store alternative for RAG. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 91,153 | Captures agent session activity, compresses it, and injects relevant context into future sessions. Persistent memory for multiple coding agents. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,767 | Leading open-source RAG engine combining deep document understanding with agent capabilities. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,541 | Universal memory layer for AI agents. The most popular general-purpose agent memory abstraction. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,733 | The leading document agent and OCR platform. Core framework for building RAG pipelines. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,679 | High-performance, cloud-native vector database built for scalable ANN search. Key infrastructure for production RAG. |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | — (+298) | Self-evolving context database for AI agents, unifying agent memory, knowledge RAG and skills. Notable because it comes from a major cloud vendor. |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | Rust | — (+730) | Long-term memory for agent coding CLIs and handoff between different agent vendors. Today’s strongest memory-focused momentum. |

---

## 3. Trend Signal Analysis

The dominant signal today is the consolidation of **agent-native infrastructure** around memory, context and skills. The trending list rewards projects that make agents persistent and portable: `ai-memory` gained 730 stars in a day, `OpenViking` adds a self-evolving context database, and `munder-difflin` provides a lightweight local multi-agent harness. This is not just a garage-project pattern — `volcengine/OpenViking` shows a major cloud vendor shipping agent memory as a database primitive.

Content generation remains the strongest end-user magnet. `MoneyPrinterTurbo` added 2,306 stars, and it is surrounded by a wave of open-source video tools — `OpenMontage`, `ArcReel`, `dramaclaw`, `Nomi` — that move beyond simple text-to-video toward agentic production pipelines: script-to-storyboard-to-edit. These projects treat coding agent CLIs as the control plane for creative toolchains.

A second pattern is **cost and complexity reduction**. Projects like `rtk` and `headroom` attack token consumption directly, while `ECC` and `caveman` optimize agent behavior by compressing context and skills. The ecosystem appears to be entering an efficiency phase after a long phase of capability expansion.

Finally, local inference on Apple Silicon is becoming a supported category: `omlx` brings continuous batching and SSD caching to macOS, and `tiny-llm` is a hands-on systems tutorial for building a vLLM-like engine. Open-weight releases — Ollama now lists Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen and Gemma — continue to feed both local serving and agent application growth.

---

## 4. Community Hot Spots

- **Agent memory / context layers** — Watch `akitaonrails/ai-memory`, `volcengine/OpenViking`, `mem0ai/mem0` and `thedotmack/claude-mem`. Persistent memory is the bottleneck for multi-session and multi-vendor agent workflows.
- **AI video generation pipelines** — `harry0703/MoneyPrinterTurbo`, `calesthio/OpenMontage`, `ArcReel/ArcReel` and `dramaclaw/dramaclaw` are turning short-video production into an agent-managed, script-to-final-cut workflow.
- **Token efficiency and context compression** — `rtk-ai/rtk`, `headroomlabs-ai/headroom`, `JuliusBrussee/caveman` and `affaan-m/ECC` are strong signals that cost/latency optimization is now a core layer of the AI stack.
- **Local inference on Apple Silicon / edge devices** — `jundot/omlx` and `skyzh/tiny-llm` highlight growing demand for private, self-hosted LLM serving on consumer hardware.
- **Structured agent skills / domain playbooks** — `mukul975/Anthropic-Cybersecurity-Skills`, `sickn33/agentic-awesome-skills` and `SamurAIGPT/Generative-Media-Skills` suggest that domain expertise is increasingly being packaged as reusable agent skills.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*