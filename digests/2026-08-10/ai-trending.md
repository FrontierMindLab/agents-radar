# AI 开源趋势日报 2026-08-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-10 04:40 UTC

---

# AI 开源趋势日报（2026-08-10）

**筛选说明**：Trending 中 `pranshuparmar/witr`（进程追踪）、`goauthentik/authentik`（身份认证）等非 AI 项目已略去；`pingdotgg/t3code` 因信息不足未确认为 AI 项目。主题搜索仅保留明确属于 AI/ML/LLM/Agent/RAG/向量库的项目。

## 1. 今日速览

- **Agent Skills 生态集中爆发**：Google Skills 与 Addy Osmani 的 Agent Skills 同时登榜，AI Agent 正从「单体应用」走向「可组合技能包」。
- **自进化编码代理成为今日最热方向**：`PrimeIntellect-ai/prime-agent` 单日 +2356，登顶 Trending。
- **视频 / 多模态生成仍是主题搜索主力**：ComfyUI、Open-Generative-AI、ArcReel 等覆盖从模型到成片的完整工具链。
- **代码 GraphRAG 与上下文优化是新基建热点**：`code-graph-rag`、`Graphify`、`rtk`、`headroom` 均指向「大型代码库检索效率」和「LLM 调用成本」。
- **垂直 AI 开始上榜**：天气预测（WeatherNext）、股票分析（daily_stock_analysis）、法律 Agent 评测（Harvey Labs）代表 AI 在科学、金融、法律领域加速落地。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,154 | 本地 LLM 运行与推理工具，现支持 Kimi-K2.6、GLM-5.2、DeepSeek、Qwen 等模型。是本地模型生态最核心的入口之一。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,508 | 提供 SOTA 模型定义、推理与训练框架。覆盖文本、视觉、语音和多模态，是开源模型生态的基础设施。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,305 | 主流深度学习框架。绝大多数开源 LLM 训练、微调与推理均构建于 PyTorch 之上。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 164,311 | 面向 LLM 的网页搜索、抓取与交互 Context API。为 AI Agent 提供规模化的 Web 数据接入能力。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,392 | 可减少 60-90% LLM token 消耗的 CLI 代理。单 Rust 二进制、零依赖，是 Agent 成本优化的重要新工具。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 65,676 | 在到达 LLM 前压缩工具输出、日志和 RAG 分块。可降低 20-95% token，且保持答案质量。 |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,826 | Java/JVM 生态的 LLM 应用开发库。统一封装 LLM Provider、向量存储和工具调用，适合企业级 Java 项目集成 AI。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,222 | 用 Rust 构建模块化、可扩展 LLM 应用。是 Rust 生态中偏轻量的 Agent 与 RAG 开发框架。 |

---

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | 0（+2356） | 面向编码工作流和长任务的自进化 RLM Agent。今日 Trending 榜首，反映社区对自主 Coding Agent 的高度热情。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+858） | 一组有明确角色和交付物的 AI 代理集合。今日 +858，说明「多角色 Agent 即服务」的玩法仍能快速吸睛。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | JavaScript | 0（+680） | 面向 AI 编码代理的生产级工程技能集。今日 +680，代表 Agent Skills 正成为主流能力封装方式。 |
| [google/skills](https://github.com/google/skills) | Python | 0（+528） | Google 出品的 Agent Skills，覆盖 Google 产品与技术栈。今日 +528，官方推动 Skills 标准化趋势明显。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 228,019 | 定位为「与你一起成长」的长期 Agent 项目。社区头部智能体之一，强调可扩展和持续进化。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,471 | 老牌自主 Agent 项目，目标是让 AI 能力为所有人可用。仍是通用自动化 Agent 方向的主线代表。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 143,836 | Agent 工程平台，提供编排、工具、记忆和模型接入等组件。大量 Agent 应用构建在其生态之上。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,515 | 让 AI Agent 通过浏览器自动化完成在线任务。将网站转化为 Agent 可访问的接口，是 Web Agent 核心工具。 |

---

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [google-deepmind/weathernext](https://github.com/google-deepmind/weathernext) | Python | 0（+86） | DeepMind 新一代天气预测 AI 项目。今日登榜，代表 AI for Science 在气象领域的持续落地。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 61,366（+306） | LLM 驱动的多市场股票智能分析系统，集成行情、新闻、看板与自动推送。AI 金融分析方向热度上升。 |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | 0（+365） | 模块化扩散模型 GUI/API/后端，采用图节点式工作流。仍是本地 Stable Diffusion 与视频生成工作流的基础设施级应用。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,342 | 用户友好的自托管 AI 聊天界面，支持 Ollama、OpenAI API 等。是本地/私有化部署中最流行的用户入口之一。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 151,897 | Agentic 工作流与 RAG 流水线构建平台。支持云、VPC 和自托管部署，是团队从原型到生产的常用 LLM 应用平台。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,366 | 根据主题或关键词一键生成高清短视频的 AI 自动化工作流。star 超 10 万，是短视频自动创作头部项目。 |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | JavaScript | 25,968 | 无内容过滤的开源 AI 图像/视频生成工作室，集成 500+ 模型。与主流商业平台形成差异化，适合自部署生成场景。 |
| [ArcReel/ArcReel](https://github.com/ArcReel/ArcReel) | Python | 3,936 | AI Agent 驱动的开源视频工作台，可将小说/剧本转化为角色、场景、分镜和视频草稿。强调跨镜头一致性和费用追踪。 |

---

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,101 | 从零手写 ChatGPT-like LLM 的教程仓库。是学习语言模型内部机制与预训练流程的经典路径。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,506 | 2 小时从 0 训练 64M 参数 LLM。强调极低训练成本，适合入门大模型训练与对齐。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,728 | NVIDIA 高效高分辨率图像合成模型，基于线性 Diffusion Transformer。在图像生成模型中具有代表性。 |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 扩散模型家族，支持图像与视频生成。体现多模态生成模型向「图像+视频统一」演进。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,287 | 开源 LLM 评测平台，支持 100+ 数据集和主流模型。是模型发布后能力对比的常用工具。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,458 | 面向系统工程师的 LLM 推理教学项目，在 Apple Silicon 上构建微型 vLLM + Qwen。教育价值突出。 |
| [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) | Jupyter Notebook | 2,591 | 综合性生成式 AI 学习资源，包含路线图、项目、面试与编码准备。适合系统补齐生成式 AI 知识。 |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | TypeScript | 1,424 | 日语 LLM 资源列表，汇总日语模型、数据集与评测。关注多语言与本地化模型可重点跟踪。 |

---

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | 0（+96） | 面向 Monorepo 的“终极 RAG”，用知识图谱查询、理解和编辑多语言代码库。今日 +96，踩中代码 GraphRAG 热点。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 104,675 | 将代码库、文档、SQL Schema 等转为可查询知识图谱，且无需向量库。以 Agent Skill 形式服务 Claude Code、Cursor、Codex 等。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,146 | 领先的开源 RAG 引擎，将 RAG 与 Agent 能力结合。面向生产级 LLM 上下文层。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,518 | 文档 Agent 与 OCR 平台，是 RAG 生态核心框架之一。适合构建文档理解和检索应用。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,232 | 捕获 Agent 会话内容，用 AI 压缩并跨会话注入上下文。支持 Claude Code、OpenClaw、Codex、Gemini CLI 等。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 62,899 | AI Agent 的通用记忆层。跨会话记忆是 Agent 个性化与连续性的关键基础设施。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,892 | 高性能向量数据库与搜索引擎，专为 AI 应用设计。是 RAG 主流向量库之一。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,579 | 云原生向量数据库，支持大规模向量 ANN 搜索。常作为生产级 RAG 系统的检索后端。 |

---

## 3. 趋势信号分析

今日信号最强烈的是 **Agent Skills 的组件化趋势**：`google/skills`、`addyosmani/agent-skills`、`agency-agents` 同时上榜，配合 `agentic-awesome-skills` 等目录项目，AI Agent 正从单体应用转向可组合技能包。其次，`prime-agent` 以 +2356 登顶，「自进化 RLM 编码代理」成为新热点，反映社区对长任务、自我改进型 Coding Agent 的追求。

视频/多模态生成仍是主题搜索主力，`ComfyUI`、`Sana`、`Kandinsky 5`、`ArcReel` 覆盖从模型到成片全链路。代码知识图谱 RAG（`code-graph-rag`、`Graphify`）与上下文压缩（`rtk`、`headroom`、`claude-mem`）成为新基建方向，说明开发者开始重视大型 Codebase 的检索效率和 LLM 调用成本。与此同时，`Ollama` 已同步支持 Kimi-K2.6、GLM-5.2、gpt-oss 等新模型，本地推理生态与 Agent 工具链正在形成协同增长。

---

## 4. 社区关注热点

- **Agent Skills 组件化**：关注 [google/skills](https://github.com/google/skills) 与 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)。两者同时登榜，说明官方与社区都在把 Agent 能力拆成可复用、可移植的 Skills。
- **自进化编码代理**：[PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) 今日 +2356 登顶，代表「自我改进 + 长任务」型 Coding Agent 的探索方向。
- **代码 GraphRAG**：[vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) 与 [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) 均用知识图谱替代/补充向量检索，大型 Monorepo 的代码理解是明显痛点。
- **视频生成流水线**：[ArcReel/ArcReel](https://github.com/ArcReel/ArcReel)、[dramaclaw/dramaclaw](https://github.com/dramaclaw/dramaclaw) 将「剧本 → 分镜 → 成片」自动化，配合 [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) 的节点式工作流，正在降低 AI 视频制作门槛。
- **上下文与成本优化**：[rtk-ai/rtk](https://github.com/rtk-ai/rtk) 与 [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) 从 token 压缩切入；[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) 则解决跨会话记忆，是 Agent 规模化落地的关键支撑。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*