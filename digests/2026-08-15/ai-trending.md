# AI 开源趋势日报 2026-08-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-14 23:00 UTC

---

## 《AI 开源趋势日报》2026-08-15

> 说明：Trending 榜中未显示总 star 的仓库，按输入记为 `0（+今日新增）`；主题搜索仓库使用其总 star。数字均照抄输入，未重新计算。

### 1. 今日速览

今天 GitHub AI 热度明显集中在 **Agent 落地工程**：Trending 17 个仓库中 13 个与 AI 相关，其中 `diagram-design`（+3,651）登顶，`holaOS`、`ego-lite`、`macro` 等围绕 Agent 工作台、浏览器状态共享与团队协作展开。更大的信号是 **上下文/记忆层** 和 **Spec-Driven Development** 双双上榜：`semantica` +1,183、`github/spec-kit` +1,147、`RAGFlow` +474。边缘 AI 也在升温：`needle` 以 14MB 基础模型登榜，`unsloth` 本地训练 UI +502、`modly` 本地 GPU 3D 生成 +580。整体看，社区正从“调大模型 API”转向“给 Agent 建工作台、做记忆、定规范”。

---

### 2. 各维度热门项目

#### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0（+1,147） | GitHub 官方 Spec-Driven Development 工具包。今日 +1,147，说明“规格驱动 AI 开发”正在成为官方推荐工作流。 |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0（+69） | Cursor 插件规范与官方插件仓库。AI 编辑器开始标准化插件生态，今日 +69。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 197,024 | 面向所有人的开源机器学习框架，是 AI 训练与推理的基础设施。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,545 | 本地运行大模型的工具，已支持 Kimi、DeepSeek、Qwen、Gemma 等新模型；是自托管 AI 的事实入口。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,106 | 最流行的模型定义/训练/推理框架，覆盖文本、视觉、音频和多模态模型。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,375 | 动态神经网络框架，GPU 加速，是从研究到生产的核心底座。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,168 | 可减少 60-90% LLM Token 消耗的 CLI 代理；成本敏感场景中价值极高。 |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 12,869 | JVM 上的 LLM 应用库，支持 MCP、Agent 和 RAG，是企业 Java 技术栈的常用选择。 |

---

#### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+3,651） | 为 Claude Code 提供 29 种 editorial diagram 类型，纯 HTML+SVG。今日 +3,651 登顶 Trending，是“Agent 技能包”需求爆发的最直接信号。 |
| [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) | TypeScript | 0（+769） | 开源 All-in-One AI Agent 工作区，支持 Claude Code/Codex、100+ 集成与 MCP。今日 +769，展示 Agent 工作台方向的热度。 |
| [deepseek-ai/awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent) |  | 0（+203） | DeepSeek 官方 Agent 资源合集。今日 +203，显示 DeepSeek 模型生态正加速向 Agent 场景延伸。 |
| [citrolabs/ego-lite](https://github.com/citrolabs/ego-lite) | JavaScript | 0（+153） | 面向 AI Agent 的极速浏览器，可共享登录状态而不打扰用户。今日 +153，解决 Agent 自动化中的关键痛点。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,164 | Agent harness 性能优化系统，覆盖 skills、memory、security 等；是当前最受关注的 Agent 基础设施之一。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,262 | Agent 工程平台，提供工具调用、MCP、多智能体与 RAG 能力，是 Agent 开发的事实标准。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,245 | 让网站对 AI Agent 可访问，实现在线任务自动化；与 ego-lite 同赛道，但定位更偏自动化框架。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,056 | AI 驱动开发的代表项目，能够自主完成编码任务。 |

---

#### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | TypeScript | 0（+580） | 桌面应用，通过本地 AI 从图片/提示词生成 3D 模型。今日 +580，本地 GPU 生成类工具正在形成新品类。 |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0（+435） | 面向团队的统一工作空间：邮件、聊天、文档、任务、Agent、CRM，并共享 AI 记忆。今日 +435，体现“AI 原生协作平台”想象力。 |
| [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | JavaScript | 0（+302） | 开源低代码平台，可构建内部工具、Dashboard、工作流和 AI Agents；是 ToolJet AI 的基础。今日 +302。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,555 | 利用大模型和自动化工作流一键生成高清短视频，是 AI 视频生成领域的明星项目。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,851 | 开源 AI 求职工具：扫描岗位、按 A-F 评分、定制简历并跟踪申请；可在 Claude Code/Codex 等终端中本地运行。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,877 | LLM 驱动的多市场股票分析系统，整合行情、新闻、决策看板和自动推送。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,478 | AI 生产力工作室，支持智能聊天、自主 Agent 和 300+ 助手，统一对接前沿 LLM。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 46,833 | 将文档或主题直接生成原生 PowerPoint，支持动画、数据图表、音频旁白。 |

---

#### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+661） | 14MB 基础模型，面向手机、可穿戴、智能家居和机器人等小型设备。今日 +661，标志“极小型模型”成为新热点。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0（+502） | 本地 UI，可运行和训练 LLM 与扩散模型，支持 Qwen3.8、Kimi K3、DeepSeek-V4 等；今日 +502。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,666 | 从零实现 ChatGPT 类似 LLM 的教程仓库，是学习大模型原理最受欢迎的课程之一。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,766 | NVIDIA 的高效高分辨率图像生成模型，采用 Linear Diffusion Transformer 架构。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,301 | LLM 评测平台，支持 Llama、Qwen、GLM、GPT-4 等 100+ 数据集。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,487 | 面向系统工程师的 Apple Silicon LLM 推理系统教程，可构建微型 vLLM + Qwen。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 316 | 端侧设备上的 LLM 推理库，使用 X-Bit 量化，适合嵌入式和高隐私场景。 |

---

#### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0（+1,183） | 图原生（Graph-Native）上下文基础设施，面向可问责 AI 系统。今日 +1,183，显示“上下文工程”正在成为独立赛道。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,385（+474） | 领先的开源 RAG 引擎，将 RAG 与 Agent 能力融合，为 LLM 提供上下文层；今日 +474。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,459 | 构建 Agentic 工作流和 RAG 流水线的一站式平台，支持云、VPC 与自托管。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,801 | 用户友好的 AI 界面，支持 Ollama/OpenAI API，是本地部署 RAG/聊天最常用的入口。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 106,366 | 将代码库、文档、SQL Schema 和 PDF 转为可查询知识图谱；本地确定性解析，不需要向量库。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,763 | 捕获并压缩 Agent 会话，将相关上下文注入未来会话，是跨会话记忆的代表项目。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,270 | AI Agent 的通用记忆层，为 Agent 提供持久化长期记忆。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,637 | 高性能云原生向量数据库，专为大规模向量近似搜索构建。 |

---

### 3. 趋势信号分析

今日热榜的爆发点集中在 **Agent 工程化落地**。`diagram-design` 以 +3,651 领跑，`holaOS`、`ego-lite`、`macro` 都围绕“让 Agent 在真实工作环境中更省事”展开；`github/spec-kit` +1,147 也表明 AI 辅助开发的“规范前置”正在成为官方推荐的工程方法。

第二股力量是 **上下文/记忆基础设施**：`semantica` +1,183、`claude-mem`、`mem0` 等分别从图原生上下文、会话记忆、Token 压缩切入，说明 Agent 的长效记忆与可问责性成为下一阶段竞争焦点。

第三是 **边缘与本地推理**：`needle` 以 14MB 模型登榜，`unsloth` 本地训练 UI +502，`modly` 在 GPU 上做 3D 生成，显示“不依赖云”的工具链开始成体系。视频生成仍有余热，但热度已从通用模型转向 Agent 化工作流。

---

### 4. 社区关注热点

- **Agent 工作台与状态共享**：关注 [holaOS](https://github.com/holaboss-ai/holaOS) 和 [ego-lite](https://github.com/citrolabs/ego-lite)。Agent 想要真正替代人工，必须先解决登录态、跨应用上下文和“不打扰用户”的共享机制。

- **Claude Code 技能/资产包**：关注 [diagram-design](https://github.com/cathrynlavery/diagram-design)（+3,651）。技能从零散 prompt 变成可分发、可组合的“包”，是 Agent 生态早期的高杠杆方向。

- **上下文与记忆基础设施**：关注 [semantica-agi/semantica](https://github.com/semantica-agi/semantica)（+1,183）、[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[mem0ai/mem0](https://github.com/mem0ai/mem0)。跨会话记忆、Token 压缩、可问责上下文是 Agent 演进的核心瓶颈。

- **Spec-Driven Development 规范化**：关注 [github/spec-kit](https://github.com/github/spec-kit)（+1,147）。官方工具入局意味着 AI 软件工程将从“聊天写码”转向“规格驱动生产”。

- **DeepSeek 周边 Agent 生态**：关注 [awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent)（+203）和 [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)。DeepSeek 模型与 Agent 工具链正在形成协同生态。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*