# AI 开源趋势日报 2026-08-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-12 04:07 UTC

---

## 过滤说明

已从 Trending 中剔除与 AI/ML 无关项目：`nvm-sh/nvm`、`3b1b/manim`、`jaywcjlove/awesome-mac`、`practical-tutorials/project-based-learning` 等。

> 注：Trending 榜单原始数据仅提供“今日新增 stars”，未提供总量的项目以 `—` 表示；主题搜索项目无今日新增数据，以 `—` 表示。

---

## 1. 今日速览

- **Agent Skills 生态爆发**：Anthropic 官方 `anthropics/skills` 与社区 `addyosmani/agent-skills` 同登 Trending，`diagram-design` 单日 +1,616 stars，是今日最大黑马。
- **多智能体从“单聊”走向“团队管理”**：`prime-agent`（+1,138）、`agency-agents`（+958）、`orca`（+875）、`paperclip`（+748）密集上榜，社区开始关注并行 Agent 的调度与治理。
- **RAG 正在“图化”**：`semantica`（+893）、`code-graph-rag`（+341）以及 105k stars 的 `Graphify` 都在用知识图谱增强上下文，纯向量检索之外的新路线正在形成。
- **垂直场景 AI 应用加速落地**：教育（`DeepTutor` +812）、视频生产（`OpenMontage` +458）、股票分析（`daily_stock_analysis` +243）、法律（`harvey-labs`）均有代表项目。
- **基础模型框架仍是压舱石**：`huggingface/transformers` 今日 +80 stars，总量 163,863，生态地位稳固。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 163,863（+80） | SOTA 机器学习模型的定义与训练/推理框架。今日仍保持稳定增长，是 AI 开源生态的“基础设施中的基础设施”。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,308（—） | 本地跑 Llama、DeepSeek、Qwen 等模型的最简推理工具。178k stars 让它成为本地 LLM 部署的事实标准之一。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | —（+1,616） | 面向 Claude Code 的 29 种可自包含 HTML/SVG 图表模板。今日新增 stars 全榜最高，是“Agent 技能包”快速走红的典型信号。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | JavaScript | —（+578） | 为 AI 编码 Agent 准备的“生产级工程技能”集合。今日 +578 stars，说明开发者正在把工程经验固化为 Agent 可复用技能。 |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | —（+485） | Anthropic 官方开源的 Agent Skills 仓库。官方入局后，“技能”正成为 Agent 能力封装与分发的新标准。 |
| [stablyai/orca](https://github.com/stablyai/orca) | TypeScript | —（+875） | 面向并行 Agent 的 ADE（Agent Development Environment），可用自己的订阅运行任意编码 Agent。今日 +875 stars，瞄准 Agent 工程化基础设施。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 75,791（—） | 可降低常见开发命令 60-90% LLM token 消耗的 CLI 代理。单 Rust 二进制、零依赖，是 AI 编码工具链降本的代表。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,246（—） | Rust 生态的模块化、可扩展 LLM 应用框架。面向需要高性能与类型安全的 Agent/RAG 开发者。 |

---

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | TypeScript | —（+1,138） | “自改进 RLM Agent”，面向编码工作流和长期自主任务。今日 +1,138 stars，是 Trending 中增速最高的 Agent 项目。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | —（+958） | 一个“完整的 AI 代理机构”，包含前端专家、Reddit 运营等角色化 Agent。今日 +958 stars，展示多角色协作 Agent 的想象空间。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | TypeScript | —（+748） | 开源应用，用于在工作中管理多个 AI Agent。今日 +748 stars，说明 Agent 治理与管理开始成为刚需。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 83,748（—） | AI 驱动开发的代表性平台。83k stars，是自主编码 Agent 方向最成熟的开源方案之一。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,536（—） | 最早也最知名的开源自主 Agent 愿景项目。186k stars，仍是通用 Agent 开发的重要参照。 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | Python | 73,897（—） | 从 0 到 1 实现一个 nano Claude Code 风格 Agent harness。73k stars，是学习 Agent 原理的热门教程。 |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | Go | 34,005（—） | DeepSeek 原生的终端 AI 编码 Agent，强调 prefix-cache 稳定性。34k stars，显示 DeepSeek 工具链正在崛起。 |
| [agno-agi/agno](https://github.com/agno-agi/agno) | Python | 41,672（—） | 构建、运行、管理 Agent 平台的框架。41k stars，面向生产级 Agent 编排。 |

---

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | —（+812） | “终身个性化辅导”AI 教育应用。今日 +812 stars，说明教育场景对 Agent 化产品的关注度正在上升。 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | —（+458） | 自称首个开源 agentic 视频生产系统，含 12 条生产流水线、100+ 工具。今日 +458 stars，视频制作是最热门的垂直应用之一。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 62,262（+243） | LLM 驱动的多市场股票智能分析系统，覆盖行情、新闻、决策看板与自动推送。今日 +243 stars，是个人投资者 AI 工具的代表。 |
| [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs) | Python | —（+28） | 法律 AI 公司 Harvey 开源的 Agent 能力评估基准。今日 +28 stars，代表法律垂直 AI 开始建立评价体系。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,523（—） | 友好、可自托管的 AI 对话/Agent 界面，支持 Ollama、OpenAI API 等。148k stars，是本地 AI 使用入口的明星项目。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 102,667（—） | 输入主题/关键词，自动生成高清短视频。102k stars，是 AI 短视频生产赛道代表作。 |

---

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,448（—） | 从零实现 ChatGPT-like LLM 的经典教程。102k stars，是学习 LLM 内部机制的首选资料。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 54,576（—） | 2 小时从 0 训练 64M 参数小 LLM。54k stars，极大降低了 LLM 训练实验的入门门槛。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,468（—） | 面向系统工程师，在 Apple Silicon 上构建微型 vLLM + Qwen。4.4k stars，帮助理解 LLM 推理系统实现。 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | HTML | 1,776（—） | Agentic RL 的精选资源列表。1.7k stars，反映了“强化学习 + Agent”这一前沿交叉方向。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,746（—） | NVIDIA 开源的高效高分辨率图像合成扩散模型。面向图像生成任务，是高效生成模型的重要参考。 |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808（—） | Kandinsky 5.0 扩散模型家族，支持视频与图像生成。新兴多模态生成模型，值得持续跟踪。 |
| [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) | — | 617（—） | LLM 机器遗忘（unlearning）资源仓库。关注模型删除记忆、隐私合规等正在兴起的治理问题。 |

---

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | —（+893） | 图原生的 AI 上下文与可问责系统基础设施。今日 +893 stars，说明“图结构”正成为 Agent 上下文管理的重要范式。 |
| [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Python | —（+341） | 面向 monorepo 的 RAG，用知识图谱查询、理解、编辑多语言代码。今日 +341 stars，解决代码库级检索痛点。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 105,363（—） | 把代码库、文档、SQL schema、PDF 变成可查询知识图谱，且无需向量库。105k stars，是“无向量 RAG”路线的代表性项目。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,146（—） | 定位为“Vectorless、Reasoning-based RAG”的文档索引系统。35k stars，是反向量数据库路线中的黑马。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,310（—） | 领先的开源 RAG 引擎，深度融合 Agent 上下文层。87k stars，适合企业级知识库落地。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,570（—） | 文档 Agent 与 OCR 平台，也是 RAG 生态最核心的框架之一。51k stars，长期占据检索增强领域重要位置。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,606（—） | 云原生向量数据库，用于大规模向量 ANN 检索。45k stars，是 RAG/向量检索基础设施的重要选择。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,076（—） | AI Agent 的通用记忆层。63k stars，帮助 Agent 实现跨会话长期记忆，是 RAG 之外的另一条上下文补充路线。 |

---

## 3. 趋势信号分析

今日 Trending 呈现明显的 **Agent 工程化**信号。  
第一，**Agent Skills 正在成为新的能力分发单元**：Anthropic 官方仓库 `anthropics/skills` 与社区 `addyosmani/agent-skills`、`diagram-design` 同时上榜，说明编码助手正从“长 Prompt 注入”转向“可复用、可组合的技能文件”。  
第二，**多智能体从演示走向生产**：`prime-agent`、`orca`、`paperclip` 解决的都是“多个 Agent 如何并行、调度、管理”的工程问题，而不是单任务能力。  
第三，**RAG 出现“去向量化 / 图谱化”支线**：`semantica` 与 `code-graph-rag` 用图结构建模代码仓库上下文，`PageIndex` 则直接主张 Vectorless RAG。这可能是对纯向量检索在代码/复杂知识场景中不足的补位。  
第四，**RLM（Reinforcement Learning for Models/Agents）方向开始登榜**：`prime-agent` 自带“self-improving RLM”标签，与 `thinkwee/AgentsMeetRL` 等资源互相印证，强化学习正重新回到 Agent 训练视野。  
整体来看，社区关注点正在从“能对话”转向“能干活、能协作、能自我改进”，并与 Claude Code、Codex 等编码 Agent 生态紧密结合。

---

## 4. 社区关注热点

- **Agent Skills 成为新一代“插件”**：`anthropics/skills`、`addyosmani/agent-skills`、`cathrynlavery/diagram-design`（+1,616）值得重点关注。官方与社区齐推，技能文件可能替代长 prompt，成为编码 Agent 的能力分发格式。
- **图/RAG 与“无向量”路线异军突起**：`semantica`（+893）、`code-graph-rag`（+341）、`Graphify`（105k stars）值得关注。用知识图谱和确定性解析补纯向量检索，尤其适合代码库理解与长上下文管理。
- **多 Agent 并行与治理**：`orca`（+875）、`paperclip`（+748）、`prime-agent`（+1,138）说明 Agent 数量变多后，身份、调度、监控与治理将成为新的基础设施问题。
- **Agent 自我改进与 RLM**：`prime-agent` 自称 self-improving RLM Agent，结合 `thinkwee/AgentsMeetRL`，强化学习驱动的 Agent 自我进化可能成为下一阶段热点。
- **垂直场景 AI 应用加速落地**：`DeepTutor`（+812）、`OpenMontage`（+458）、`daily_stock_analysis`（+243）分别代表教育、视频、金融等赛道的“AI 员工级”产品，应用层创新正在快速增多。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*