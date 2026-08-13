# AI 开源趋势日报 2026-08-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-13 09:48 UTC

---

# AI 开源趋势日报（2026-08-13）

本次筛选范围包括 GitHub Trending 榜单与 7 天活跃 AI 主题搜索结果。已剔除 `LocalSend`、`SpiderFoot`、`MediaCrawler`、`everyone-can-use-english`、`Files`、`Yazi`、`Bruno`、`Appsmith`、`IT-Tools`、`Julia`、`Airflow` 等与 AI/ML 无明确直接关联的项目。

## 1. 今日速览

- 今日热度最集中在 **AI Agent 工程化**：`diagram-design`（+2,855）、`agency-agents`（+1,873）、`orca`（+1,235）分别从 Agent 技能、Agent 团队、并行 Agent 调度切入，社区关注度极高。
- **Agent 上下文与记忆层**成为新热点：`semantica`（+845）、`claude-mem`、`mem0`、`Graphify` 都在推动 RAG 从向量检索走向知识图谱与跨会话记忆。
- 垂直/端侧模型首次集中登榜：`Kronos`（金融）、`Needle`（14MB 端侧模型）、`LTX-2`（音视频生成）代表开源模型向细分场景和边缘设备渗透。
- 应用层继续开花：`ppt-master`（+476）、`macro`（+227）等把大模型能力直接转化为办公与团队协作产品。
- 老牌项目仍稳坐 topic 池头部：`Dify`、`Open WebUI`、`LangChain`、`AutoGPT`、`RAGFlow` 等保持高 star 与持续活跃。

## 2. 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,149 | Agent 工程化平台，提供统一的 LLM 应用开发抽象。本期在 rag/agent 主题中保持最高关注度之一。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,419 | 本地 LLM 推理运行器，支持 Kimi、GLM、DeepSeek、Qwen 等主流模型。是个人与团队自托管大模型的首选入口。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,353 | 深度学习基础框架，支撑绝大多数 AI 训练与推理工作流。ml 主题中持续位居头部。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | Python | 66,968 | 经典机器学习库，生态稳定且广泛应用。仍是入门与生产环境中的基础工具。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 66,134 | 在工具输出、日志、RAG 分块进入 LLM 前做压缩，可减少 20%-95% token。对生产级 Agent 有直接降本价值。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,968 | CLI 代理，减少常见开发命令 60-90% 的 LLM token 消耗。单 Rust 二进制、零依赖。 |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0（+421） | 属于 NVIDIA NeMo 组织下的 Rust 项目，今日新增 421 stars。从命名看大概率是 Agent/LLM 工具链组件，建议关注官方文档确认定位。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,312 | 构建 Agentic workflows、RAG pipelines 的一站式平台。支持云端、VPC 与自托管，是企业级 Agent 落地的常见选择。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+2,855） | 为 Claude Code 提供 29 种 editorial diagram 类型，纯 HTML + SVG 实现。今日热榜第一，正在改变编码 Agent 输出图表的方式。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+1,873） | 一组可直接运行的 AI 代理团队，覆盖前端、Reddit 运营、创意等角色。今日新增近 1.9k stars，爆发力强。 |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | 0（+1,235） | 面向并行 Agent 舰队的 ADE，可用自己的订阅运行任意 coding agent。桌面、移动端、VPS 均可部署。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | 0（+571） | 开源应用，用于管理工作中的 Agent。今日 +571，说明“Agent 治理”正在成为企业级刚需。 |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,578 | 让 AI 自动完成任务的早期代表项目，现已发展为通用 Agent 工具与生态平台。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,887 | AI 驱动软件开发平台，覆盖编码、调试、任务执行等场景。是开源 coding agent 领域头部项目。 |
| [embabel/embabel-agent](https://github.com/embabel/embabel-agent) | Kotlin | 0（+40） | JVM 上的 Agent 框架，面向 Kotlin/Java 开发者。今日进入 Trending，补充了 JVM 生态的 Agent 开发选择。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,664 | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等。是自托管聊天与 Agent 交互层中最流行的应用之一。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,920 | 基于 LLM 和自动化工作流一键生成高清短视频。是内容生成类 AI 应用的代表性开源项目。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,673 | 本地优先的 Agent 与知识库应用，强调“Own your intelligence”。适合个人和团队自部署。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,682 | AI 求职助手：扫描职位、评分、定制简历并跟踪申请。可在 Claude Code、Codex 等本地 AI 编码 CLI 中运行。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,667 | LLM 驱动的多市场股票分析系统，整合行情、新闻、决策看板与自动推送。是金融垂直场景的落地示例。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,390 | AI 生产力工作室，支持智能聊天、自主 Agent 和 300+ 助手，统一接入前沿 LLM。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 46,245（+476） | AI 将文档或主题转化为原生 PowerPoint，支持形状、动画、图表与配音。今日 +476，办公生成类应用需求旺盛。 |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0（+227） | 统一团队工作空间：邮件、聊天、文档、任务、CRM 与 Agent 通过共享 AI 记忆连接。今日 +227，代表 Agent 与协作软件融合趋势。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,050 | 最流行的开源模型框架，支持文本、视觉、音频与多模态模型推理和训练。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,556 | 从零实现 ChatGPT 类 LLM 的 PyTorch 教程。社区认可度高，是学习大模型训练原理的经典项目。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,585 | YOLO 系列目标检测、分割、姿态估计等视觉模型的开源工具。训练与推理一体，使用范围极广。 |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0（+65） | LTX-2 音视频生成模型的官方 Python 推理与 LoRA 训练包。开放官方权重和微调能力，是今日多模态方向的重要信号。 |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python | 0（+266） | 面向金融市场的 Foundation Model。垂直领域大模型开始获得社区关注，今日 +266。 |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+315） | 14MB 的端侧 Foundation Model，面向手机、穿戴设备、智能家居和机器人。极小体量意味着边缘 AI 新玩法。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,753 | NVIDIA 出品的高效高分辨率图像合成模型，基于 Linear Diffusion Transformer。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,781（+139） | 领先的开源 RAG 引擎，整合 RAG 与 Agent 能力，为 LLM 提供上下文层。今日仍保持增长。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,835 | 将代码库、文档、SQL schema、PDF 等转化为可查询知识图谱。无需向量库，适合 Claude Code、Cursor、Codex 等 Agent。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,602 | 为 Agent 提供跨会话持久记忆，捕获会话、AI 压缩并注入相关上下文。是 Agent 记忆层的重要项目。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,178 | AI Agent 的通用记忆层，支持跨会话长期记忆。与 RAG 知识库互补，是 Agent 基础设施关键组件。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,613 | 领先的文档 Agent 与 OCR/文档处理平台。RAG 应用中的主流数据框架。 |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0（+845） | 面向上下文与可问责 AI 系统的图原生基础设施。今日 +845，显示“Graph-native RAG/上下文”正在兴起。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,623 | 云原生向量数据库，面向大规模向量 ANN 检索。RAG/Agent 场景中的核心基础设施。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,956 | 高性能、大规模向量数据库与搜索引擎。专为下一代 AI 应用设计。 |

## 3. 趋势信号分析

今日热榜最强烈的信号是 **Agent 工程化成为社区主战场**：`diagram-design`（+2,855）、`agency-agents`（+1,873）、`orca`（+1,235）、`paperclip`（+571）分别覆盖 Agent 技能、多 Agent 团队、并行 Agent 调度和 Agent 治理，说明“单点 Demo”已转向“可规模化运行”的 Agent 基础设施。

其次，上下文/RAG 正在从向量库走向**图原生与记忆层**：`semantica`（+845）、`Graphify`、`claude-mem` 等强调结构化上下文、知识图谱与跨会话记忆。第三，**垂直/端侧模型**首次集中登榜：`Kronos`（金融）、`Needle`（14MB 端侧）、`LTX-2`（音视频生成），显示开源模型正加速向细分场景和边缘设备渗透。

同时，NVIDIA NeMo 的 `Switchyard` 登榜，反映大厂在底层 Agent 工具链上的投入。整体看，今日趋势与近期 Claude Code 生态扩张、多模态开源模型发布形成呼应。

## 4. 社区关注热点

- **Claude Code / Agent 技能生态**：`diagram-design` 今日暴涨 2,855 stars，说明编码 Agent 的可视化输出、技能包与上下文管理需求正在爆发。
- **多 Agent 协作与治理**：`orca`、`agency-agents`、`paperclip` 代表从“单个 Agent”到“Agent 团队 / Agent 工作台”的关键转折。
- **RAG 演化为 Agent 记忆层**：`semantica`、`Graphify`、`claude-mem`、`mem0` 不再只依赖向量检索，知识图谱与上下文压缩成为新热点。
- **端侧与垂直模型**：`needle`（14MB）、`Kronos`（金融）、`LTX-2`（音视频）预示小型化、行业化模型是重要增长方向。
- **AI 办公与内容生成应用**：`ppt-master`、`MoneyPrinterTurbo`、`macro` 把 LLM 直接转化为可交付的办公、营销和团队协作生产力。

---
*本日报由 [agents-radar](https://github.com/forever-1314/agents-radar) 自动生成。*