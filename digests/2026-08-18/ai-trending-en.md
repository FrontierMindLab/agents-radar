# AI Open Source Trends 2026-08-18

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-17 23:00 UTC

---

**Date: 2026-08-18**

**Filter note:** Non-AI trending repos (`nautilus_trader`, `immich`, `cordis`, `Motrix`) and general dev-tools from topic search (`Puppeteer`, `Bruno`, `Hoppscotch`, etc.) were excluded. In tables, **n/a** means total stars were not exposed in the trending feed; only today’s delta was available.

---

## 1. Today's Highlights

AI video creation remains the strongest traffic driver: [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) added **+1,275** stars today, and agentic video pipelines like [OpenMontage](https://github.com/calesthio/OpenMontage) continue to mature. Security is a newly explosive category — [strix](https://github.com/usestrix/strix) and [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) bring offensive-security and compliance playbooks into AI agent workflows. Cross-agent memory is another breakout theme: [ai-memory](https://github.com/akitaonrails/ai-memory) targets persistent context and handoff between coding agents from different vendors. Local-first LLM tooling is also rising fast, with [llmfit](https://github.com/AlexsJones/llmfit) solving hardware-model compatibility and [omlx](https://github.com/jundot/omlx) bringing continuous-batching inference to Apple Silicon. Overall, community attention is shifting from generic chatbots to agent harnesses, memory layers, security controls, and specialized vertical applications.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python | 89,275 | High-throughput LLM inference and serving engine; the de facto OSS serving stack for deployed open-weight models. Remains essential as local model deployments multiply. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,807 | One-command local model runner now supporting Kimi, GLM, MiniMax, DeepSeek and others. Its release cadence is a barometer for open-weight model adoption. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,404 | CLI proxy that reduces LLM token consumption by 60–90% on common dev commands. Token cost control is becoming a core infrastructure layer. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 66,666 | Compresses tool outputs, logs, and RAG chunks before they reach the LLM, saving up to 95% of tokens on JSON. Important for both agents and RAG pipelines. |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | n/a (+239) | Finds which of hundreds of models and providers can run on your hardware with one command. Its fast start reflects open-weight model fragmentation. |
| [jundot/omlx](https://github.com/jundot/omlx) | Python | n/a (+96) | LLM inference server with continuous batching and SSD caching for Apple Silicon, managed from the macOS menu bar. Signals local inference becoming consumer-grade. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,300 | Modular Rust framework for building LLM applications. Part of a visible shift toward Rust in AI tooling. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,884 | Java/JVM library for LLM apps, agents, tool-calling, and MCP. Bridges enterprise Java/Spring ecosystems into the AI stack. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,414 | The most widely used agent engineering platform, with RAG, tool-calling, and multi-agent primitives. Remains the baseline for agent stack design. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,655 | Autonomous agent platform aiming to make AI accessible to everyone. Still a reference project for agent autonomy and workflow automation. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,333 | AI-driven development platform that turns coding agents into collaborative software engineers. One of the strongest OSS dev-agent projects. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,694 | Agent harness optimization system with skills, instincts, memory, and security for Claude Code, Codex, Cursor, and more. Its star count shows how hot the “agent harness” category has become. |
| [agno-agi/agno](https://github.com/agno-agi/agno) | Python | 41,747 | Build, run, and manage agent platforms. Growing momentum suggests demand for production-grade agent orchestration. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 232,001 | “The agent that grows with you” from Nous Research. Shows agent harnesses now being distributed alongside open model families. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,524 | Makes websites accessible to AI agents for automated browsing and online tasks. Key bridge between LLMs and live web interaction. |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 36,803 | Frontend stack for agents and generative UI, supporting React, Angular, and mobile. Shows agents becoming a UI platform, not just an API. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 105,919 (+1,275) | Generates HD short videos from a topic or keyword via AI models and automated workflows. Today’s +1,275-star surge makes it the clearest marker of AI content-creation demand. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 149,043 | Self-hosted, user-friendly AI interface supporting Ollama and OpenAI-compatible APIs. Increasingly the standard local frontend for personal and institutional AI. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,834 | All-in-one local-first agent experience for RAG and multi-source LLM interaction. Its “own your intelligence” positioning captures the self-hosted AI mood. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 64,580 (+147) | Open-source AI job search agent: scans job portals, scores listings, tailors CVs, and tracks applications. A fast-rising example of AI vertical applications. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 63,166 | LLM-driven multi-market stock analysis with real-time news, decision dashboards, and notifications. Shows demand for domain-specific AI analysis tools. |
| [usestrix/strix](https://github.com/usestrix/strix) | Python | n/a (+656) | Open-source AI penetration testing tool for finding and fixing app vulnerabilities. Its 656 stars today signal that AI security tooling is a breakout niche. |
| [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Python | n/a (+156) | 817 structured cybersecurity skills for AI agents, mapped to MITRE ATT&CK, NIST AI RMF, and D3FEND. Turns agent skills into an enterprise security asset. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,593 | Open-source agentic video production system with 12 pipelines and 700+ skills. Aligns with the video-generation surge and shows agents moving up the media stack. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,990 | End-to-end ML framework and foundational production ML infrastructure. Remains a major reference for training and deployment. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,195 | The standard model-definition framework for text, vision, audio, and multimodal models. Default starting point for open-weight LLM work. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,439 | Deep learning framework powering most current LLM and diffusion training. Strong GPU acceleration keeps it central to today’s AI research stack. |
| [keras-team/keras](https://github.com/keras-team/keras) | Python | 64,236 | High-level deep learning API for fast prototyping and training. Remains a popular on-ramp to AI engineering. |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,696 | YOLO object detection, segmentation, and classification toolkit. The dominant open-source computer-vision training/inference suite. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,780 | Efficient high-resolution image synthesis with a linear diffusion transformer. Shows model architecture innovation continuing beyond LLMs. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,310 | LLM evaluation platform supporting 100+ datasets and dozens of open/closed models. Increasingly important as new Kimi, GLM, and DeepSeek releases need standardized benchmarks. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,721 | Build agentic workflows and RAG pipelines with rich model and tool support, deployable on cloud, VPC, or self-hosted. One of the most comprehensive OSS AI app platforms. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,678 | Leading open-source RAG engine that fuses deep document understanding with agent capabilities. A major reference for production RAG. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,707 | Document agent and OCR platform for connecting LLMs to enterprise data. Continues to drive advanced RAG and knowledge-agent patterns. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 91,010 | Persistent memory across sessions for Claude Code, Codex, Gemini, Copilot, and more. Makes the “memory layer” one of the fastest-growing RAG-adjacent categories. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 107,492 | Turns codebases, docs, SQL schemas, and PDFs into a queryable knowledge graph without a vector store. Highlights the shift toward “vectorless,” reasoning-based retrieval. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,666 | High-performance, cloud-native vector database built for scalable ANN search. A core infrastructure choice for production RAG. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,029 | High-performance vector database and search engine for next-generation AI. Rust-native performance keeps it a favorite for latency-sensitive RAG. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,466 | Universal memory layer for AI agents. Its rise signals that long-term memory, not just retrieval, is the next frontier in RAG/knowledge. |

---

## 3. Trend Signal Analysis

The most explosive attention today is around agent harnesses and agent-adjacent infrastructure, not raw model releases. Projects such as [ECC](https://github.com/affaan-m/ECC), [ai-memory](https://github.com/akitaonrails/ai-memory), [strix](https://github.com/usestrix/strix), and [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) treat the coding CLI as an operating system for AI agents: they add skills, memory, security, and cost controls.

A second clear signal is local-first LLM infrastructure. [llmfit](https://github.com/AlexsJones/llmfit) and [omlx](https://github.com/jundot/omlx) target consumer hardware and Apple Silicon specifically, while [Ollama](https://github.com/ollama/ollama) continues to package new open-weight releases — Kimi-K2.6, GLM-5.2, MiniMax — into a single command. Token economics are also emerging as a first-class category: [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom), and [caveman](https://github.com/JuliusBrussee/caveman) all claim 20–90% token reductions through proxies or prompt compression.

RAG is fragmenting beyond vector search: [PageIndex](https://github.com/VectifyAI/PageIndex) and [graphify](https://github.com/Graphify-Labs/graphify) push vectorless or reasoning-based retrieval, while [claude-mem](https://github.com/thedotmack/claude-mem) and [mem0](https://github.com/mem0ai/mem0) turn memory into a durable layer rather than an embedding index. On the security side, [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) maps 817 agent skills to MITRE ATT&CK, NIST AI RMF, and D3FEND, while [strix](https://github.com/usestrix/strix) automates pentesting — a sign that enterprise governance is moving into open-source agent ecosystems. These directions connect to recent LLM releases: as vendors ship smaller and quantized models, developers need hardware compatibility tools, on-device inference servers, and standardized skill directories to manage fragmentation.

---

## 4. Community Hot Spots

- **[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** — +1,275 stars today; short-video creation remains the clearest end-user AI product with viral traction.
- **[strix](https://github.com/usestrix/strix) + [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)** — AI security and compliance playbooks for agents are exploding because enterprise teams need guardrails, red-teaming, and framework mapping.
- **[ai-memory](https://github.com/akitaonrails/ai-memory) + [claude-mem](https://github.com/thedotmack/claude-mem)** — Cross-vendor agent memory is the missing layer for long-running coding-agent workflows; handoff between Claude Code, Codex, and Cursor is now a practical bottleneck.
- **[llmfit](https://github.com/AlexsJones/llmfit) + [omlx](https://github.com/jundot/omlx)** — Hardware-aware model selection and Apple Silicon inference are early indicators that open-weight models are going fully local.
- **[rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom)** — Token cost-reduction proxies and compressors are quickly becoming standard infrastructure for agent-heavy teams.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*