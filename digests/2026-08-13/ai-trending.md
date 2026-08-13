# AI 开源趋势日报 2026-08-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-13 01:04 UTC

---

# AI 开源趋势日报 · 2026-08-13

> 筛选说明：已剔除与 AI/ML 无明显关联的 Trending 项目（如 LocalSend、SpiderFoot、MediaCrawler、everyone-can-use-english），以及主题搜索结果中的通用工具（如 Files、Bruno、Yazi、Appsmith、it-tools 等）。

## 1. 今日速览

- **Agent 生态继续霸榜**：diagram-design 单日 +2,855 领涨，agency-agents +1,873、orca +1,235，社区对“Agent 技能包”“角色化 Agent 团队”“并行 Agent 编排”的需求爆发。
- **模型层开始“变小、变专、变多模态”**：needle（14MB 端侧模型）、Kronos（金融领域模型）、LTX-2（音视频生成模型）同日登上 Trending，显示开源模型正在从通用大模型向细分场景与端侧部署扩散。
- **RAG 正在从向量检索走向“图原生/可解释上下文”**：semantica 单日 +845，Graphify 维持高星，知识图谱路线与传统向量库并行升温。
- **AI 基础层出现系统化趋势**：Rust 在 AI 工具链中高频出现，NVIDIA NeMo/Switchyard、rtk、macro 等让“AI 开发基础设施”更加工程化。

## 2. 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,982 | 老牌机器学习框架，覆盖训练、推理与生产部署。仍是 AI 基础设施的重要基石。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,369 | 本地运行 LLM 的轻量运行时，支持 DeepSeek、Qwen、Gemma 等模型。自托管推理的标准入口之一。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 166,456 | 面向 LLM 的网页搜索、抓取与交互 API。高 star 说明 Web 数据接入是 AI Agent 的刚需。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,018 | 模型定义、推理与训练框架，支持文本、视觉、音频和多模态。社区获取 SOTA 模型的主要入口。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,097 | Agent 工程平台，提供工具调用、RAG、工作流编排等抽象。仍是 LLM 应用开发的核心框架。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,351 | 深度学习核心框架，动态图与 GPU 加速能力突出。绝大多数开源模型依赖 PyTorch。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,922 | CLI 代理，可将常见开发命令的 LLM token 消耗降低 60–90%，单 Rust 二进制零依赖。token 成本治理正成为开发者刚需。 |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0（+421） | NVIDIA NeMo 出品的 Rust 项目，当前仓库描述缺失。今日 +421 登榜，显示 AI 基础设施层的 Rust 生态正在升温。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 229,581 | 定位为“与你一起成长的 agent”，总星数领先。代表社区对长期记忆、可演进型 agent 的持续关注。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,563 | 老牌通用 Agent 项目，目标是人人都能使用和构建 AI 自动化。仍是 Agent 领域的高星标杆。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 108,973 | 让 AI Agent 操作网站、自动完成线上任务。网页交互自动化是 Agent 落地的重要方向。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,837 | AI 驱动开发平台，实现从 issue 到代码的自动化流程。是开发者工具型 Agent 的代表项目。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+2,855） | 29 种面向 Claude Code 的 editorial 图表模板，纯 HTML+SVG，避免 Mermaid 渲染问题。今日 +2,855 领涨热榜，说明 Agent Skill 生态正扩展到高质量可视化输出。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+1,873） | 用 Shell 脚本构建的“AI 代理公司”，包含前端、Reddit、内容等角色化 agent。今日 +1,873，显示 agent 角色化、团队化配置需求旺盛。 |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0（+1,235） | 面向并行 agent 的 ADE（Agent Development Environment），可用自有订阅运行任意 coding agent，支持桌面/移动/VPS。今日 +1,235，标志着 Agent 开发从单实例走向“编队”管理。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0（+571） | 开源 Agent 管理工作台，用于在团队中统一管理多个 agent。今日 +571，强调 agent 运维、权限与协作治理场景。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,613 | 自托管 AI 对话与管理界面，兼容 Ollama、OpenAI API 等。已是最流行的开源 LLM 前端之一。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,814 | AI 工作流一键生成高清短视频，面向内容创作者。star 超 10 万，是 AI 内容生成应用的头部项目。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,662 | 本地优先的 All-in-One Agent 桌面/Web 应用，可接入知识库与多模型。强调“数据自有”，是私有化 AI 办公入口。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,572 | LLM 驱动的多市场股票分析系统，支持多源行情、实时新闻、决策看板与自动推送。展示 AI 在金融垂直场景的自动化落地。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,355 | AI 生产力工作室，包含智能聊天、自主 Agent 和 300+ 助手。是“All-in-One AI 工作台”的代表。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 45,775 | 开源、隐私优先、自托管知识工作空间，支持人类与 AI Agent 协作。在知识管理赛道影响力较高。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 45,583（+476） | AI 将文档或主题转成原生 PowerPoint，支持原生形状、动画、图表与音频旁白。今日 +476，AI 办公文档生成正成为热门场景。 |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0（+227） | 统一团队工作空间：邮件、聊天、文档、任务、CRM、Agent，以共享 AI 记忆串联。今日 +227，代表“AI 原生协作软件”的新方向。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,532 | 从零实现 ChatGPT-like LLM 的 PyTorch 教程，逐步讲解训练细节。是学习大模型内部机制的高星资源。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,751 | NVIDIA 出品的高效高分辨率图像生成 diffusion transformer。展示图像生成模型的效率优化方向。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,480 | 在 Apple Silicon 上构建 tiny vLLM + Qwen，适合系统工程师学习 LLM 推理栈。 |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 系列扩散模型，支持视频与图像生成。代表开源多模态生成模型的持续更新。 |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+315） | 仅 14MB 的端侧 foundation model，面向手机、可穿戴、智能家居与机器人。今日 +315，显示端侧小模型/具身智能赛道升温。 |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python | 0（+266） | 面向金融市场的 foundation model，尝试建模金融数据的“语言”。今日 +266，垂直领域基础模型开始登榜。 |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0（+65） | LTX-2 音视频生成模型的官方 Python 推理与 LoRA 训练包。今日 +65，多模态生成模型持续有新版本释出。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,249 | 可视化构建 Agentic 工作流和 RAG 管道，支持丰富模型与工具。是 RAG/LLMOps 领域的高星平台。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,686 | 将代码库、文档、SQL schema 等转成可查询知识图谱，无需向量库，定位为 Claude Code/Cursor 等 agent 的技能。代表“知识图谱 + 可解释检索”路线。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,550（+139） | 开源 RAG 引擎，融合 Agent 能力，为 LLM 提供上下文层。今日 +139，RAG 仍是企业落地 AI 的关键基础设施。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,136 | AI Agent 的通用记忆层，支持跨会话长期记忆。记忆与上下文管理正在成为 RAG 的重要延伸。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,600 | 文档 Agent 与 OCR/RAG 平台，提供数据连接、索引和检索能力。是构建向量检索应用的主流框架。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,615 | 云原生向量数据库，支持大规模向量 ANN 检索。是 AI 应用存储与检索层的核心组件。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,941 | 高性能大规模向量数据库，同时提供云服务。Rust 实现的向量检索性能受到社区关注。 |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0（+845） | 图原生上下文基础设施，面向“可问责 AI 系统”。今日 +845，知识图谱与可溯源上下文正成为 RAG 之后的新热点。 |

## 3. 趋势信号分析

今日最明显的信号是 **Agent 生态从单点走向工程化**。diagram-design、agency-agents、orca、paperclip 同时登榜且涨幅领先，说明社区已经不满足于单个 Agent demo，而是需要 skills/模板、角色化 Agent 团队，以及并行 Agent 的 IDE 与治理工具。

第二个信号是 **模型层开始“变小、变专、变多模态”**。needle 主打 14MB 端侧模型，Kronos 面向金融市场，LTX-2 布局音视频生成。它们与通用 LLM 形成差异化，预示模型开源的重点将从通用底座转向细分场景与端侧部署。

第三个信号是 **RAG 正在往“图原生/可解释上下文”演进**。semantica 单日 +845，Graphify 坚持 no vector store 的知识图谱路线，与经典向量库 Milvus、Qdrant 并存。同时，Rust 在 AI 基础设施层出现频率明显升高（Switchyard、macro、rtk），AI 开发栈的“系统化”趋势值得持续跟进。

## 4. 社区关注热点

- **Agent Skill 模板化输出**：diagram-design 单日 +2,855，证明“让 Claude Code 产出高质量 HTML/SVG 图表”这类 skill 有巨大需求，AI 编码代理正在从写代码延伸到交付完整文档与设计资产。
- **并行 Agent 开发环境**：orca（+1,235）和 paperclip（+571）分别代表“并行 Agent 的 ADE”与“Agent 管理工作台”，这一层工具链可能成为下一个热门赛道。
- **图原生上下文 / AI 可问责性**：semantica（+845）与 Graphify（105k stars）都押注知识图谱而非传统向量库，值得关注“可解释、可审计”的 AI 上下文层。
- **端侧与领域小模型**：needle（14MB）与 Kronos（金融）同天登榜，说明开发者开始寻找更小、更专的模型，端侧 AI 和金融 AI 是明显落地方向。
- **AI 原生办公内容生成**：ppt-master（+476）和 macro（+227）显示 AI 正在进入 PPT、团队协作等办公场景，并开始要求“原生格式”和“共享记忆”等高完成度体验。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*