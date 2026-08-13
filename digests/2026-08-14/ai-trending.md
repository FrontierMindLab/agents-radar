# AI 开源趋势日报 2026-08-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-13 23:00 UTC

---

# 《AI 开源趋势日报》— 2026-08-14

> 数据来源：GitHub Trending 今日榜单 + GitHub Search API 7 天 AI 主题活跃仓库。  
> 过滤说明：已剔除与 AI/ML 无关的通用工具（如 holehe、SpiderFoot、Manim，以及 Puppeteer、Files、Yazi、Bruno、Appsmith 等）。Trending 原始数据未提供总 star，表格中以 `0` 占位，括号内为今日新增 star。

## 今日速览

- 今日 AI 热榜几乎被 **Agent Skills 生态**包场：Anthropic 官方 `skills`、`obsidian-skills`、`diagram-design`、`agency-agents` 集体上榜，其中 `diagram-design` 以 **+4,504** 领跑全场。
- **端侧 / 微型 AI** 成为第二主线：`needle` 以 14MB 规模打入手机、穿戴设备；`FluidVoice` 做本地听写；`modly` 在本地 GPU 上生成 3D 模型。
- **LLM 基础设施** 正转向“路由 / 上下文 / 成本优化”：NVIDIA `Switchyard` 做模型路由，`semantica` 主打图原生上下文，token 压缩工具 `rtk` 持续受关注。
- **多模态生成** 依旧高热：Lightricks 发布 LTX-2 官方推理与 LoRA 训练包，叠加 OpenMontage、MoneyPrinterTurbo 等视频生产系统，内容生成正从“出图”走向“出成片”。
- RAG 赛道由 `ragflow` 领跑，今日 +473；同时 `Graphify`、`PageIndex` 等“无向量 / 知识图谱”路线开始挑战传统 Embedding RAG。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,078 | Hugging Face 生态核心 Transformer 框架，覆盖文本、视觉、音频、多模态模型的训练与推理。作为 AI 模型落地的第一站，7 天 ML 主题搜索中热度居高不下。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,359 | 动态神经网络与 GPU 加速的深度学习框架。AI 研究与生产训练的事实标准底座，持续出现在本周 ML 主题头部。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,476 | 本地运行 LLM 的极简工具，支持 Qwen、Gemma、DeepSeek、MiniMax 等主流模型。本地推理与隐私部署时代的关键基础设施。 |
| [NVIDIA-NeMo/Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust | 0（+408） | NVIDIA 开源的 LLM 流量路由层，可在模型/供应商间切换并兼容 OpenAI/Anthropic API。今日 +408，说明“多模型成本/性能优化”已成为工程刚需。 |
| [semantica-agi/semantica](https://github.com/semantica-agi/semantica) | Python | 0（+727） | 面向可审计、可负责 AI 系统的图原生基础设施。今日 +727，Graph-native 上下文管理是值得关注的新架构方向。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,260 | Rust 生态的模块化 LLM 应用开发框架，强调类型安全与可扩展性。Rust 在 AI 工程层的采用率正在上升。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,483 | 在 Apple Silicon 上从零构建微型 vLLM + Qwen 的教育项目。适合系统工程师快速理解 LLM 推理底层原理。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,032 | 减少 60-90% LLM token 消耗的 CLI 代理，单 Rust 二进制、零依赖。在 agent 高频调用大模型的环境下，token 优化正成为刚需。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 239,959 | Agent harness 性能优化系统，为 Claude Code、Codex、Cursor 等提供技能、记忆、安全与研究支持。是当前 Agent 生态中累计星标最高的项目之一。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 230,103 | Nous Research 出品的“会随你一起成长”的 AI agent。强调长期记忆与自我迭代，代表开源 agent 的持续性方向。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,366 | 可视化构建 Agentic workflow、RAG 管线与多模型应用的一体化平台。7 天 RAG/Agent 主题搜索中热度领先。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,116 | 让 AI agent 像人一样操作网站、自动完成线上任务。已超 10 万星，是 agent 获取真实网页操作能力的关键依赖。 |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 0（+383） | Anthropic 官方开源的 Agent Skills 仓库，为 Claude Code 生态提供可复用技能模板。今日 +383，标志 Agent Skills 正在走向官方标准化。 |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | — | 0（+411） | 为 Obsidian 设计的 Agent Skills，教会 agent 使用 Obsidian CLI 与 Markdown、Bases、JSON Canvas 等开放格式。今日 +411，反映知识库与 Agent 的结合需求。 |
| [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) | TypeScript | 0（+380） | 开源 All-in-One AI agent 工作区，支持 Claude Code、Codex 等跨 100+ 工具、应用、浏览器和文件运行，并共享记忆。今日 +380，“Agent OS”概念正在升温。 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | Shell | 0（+762） | 把完整 AI 代理公司装进终端的多 agent 集合，包含前端、社区运营、创意等角色。今日 +762，多角色 agent 协作工作流吸引力很强。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [macro-inc/macro](https://github.com/macro-inc/macro) | Rust | 0（+1,180） | 面向团队的统一工作空间，将邮件、聊天、文档、任务、CRM 与 agents 和共享 AI 记忆用 @-link 串在一起。今日 +1,180，是今日增量最高的 AI 应用之一。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+4,504） | 为 Claude Code 准备 29 种编辑级图表类型，纯 HTML + SVG，强调无阴影、非 Mermaid 风。今日 +4,504 领跑 Trending，说明开发者对高质量结构化 Agent 输出有强烈需求。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,712 | 功能丰富的自托管 AI 聊天界面，支持 Ollama、OpenAI API 等主流后端。是本地优先 AI 应用的核心入口之一。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,092 | 利用 AI 大模型与自动化工作流，根据主题一键生成高清短视频。持续占据开源内容创作工具头部位置。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,425 | AI 生产力桌面应用，集智能聊天、自主 agent、300+ 助手于一体，统一接入前沿 LLM。代表“基座模型之上的独立客户端层”正在形成。 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 47,962 | 号称世界首个开源 agentic 视频生产系统，含 12 条生产管线、100+ 工具、700+ agent 技能文件。视频生成正从“模型调用”走向“全流程生产”。 |
| [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice) | Swift | 0（+187） | macOS 本地听写应用，使用 on-device STT 和自训练增强模型，是 Wispr Flow 的本地替代方案。今日 +187，端侧语音隐私场景受关注。 |
| [lightningpixel/modly](https://github.com/lightningpixel/modly) | TypeScript | 0（+221） | 桌面应用，用本地 AI 从图片生成 3D 模型，全程在 GPU 上运行。今日 +221，本地 3D 资产生成是新兴细分方向。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,608 | 从零用 PyTorch 逐步实现 ChatGPT 类 LLM 的教程仓库，配图书级讲解。是入门大模型训练的必读资源之一。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,600 | YOLO 系列目标检测、分割、分类、姿态估计的官方训练/推理框架。持续迭代 YOLO26/11/8，是 CV 落地最活跃的框架之一。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,758 | NVIDIA 的高效高分辨率图像合成扩散模型，主打线性 Diffusion Transformer。视频生成主题中被高频引用的基础架构之一。 |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+768） | 仅 14MB 的微型 foundation model，面向手机、穿戴设备、智能家居、机器人等设备。今日 +768，端侧超小模型是“AI 普及到每个设备”的重要信号。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0（+354） | 本地 UI 可运行和训练 LLM 与扩散模型，并快速支持 Qwen3.8、Kimi K3、MiniMax-H3、Gemma 4、DeepSeek-V4 等新模型。今日 +354，加速社区用最新模型做本地实验。 |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Python | 0（+201） | Lightricks 官方 Python 推理与 LoRA 训练包，支持 LTX-2 音频-视频生成模型。今日 +201，开源多模态模型进入可复现、可微调阶段。 |
| [kandinskylab/kandinsky-5](https://github.com/kandinskylab/kandinsky-5) | Python | 808 | Kandinsky 5.0 视频与图像生成扩散模型家族代码。作为新发布的多模态模型，在 7 天视频生成主题搜索中值得关注。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,183 | Agent 工程与 RAG 编排的事实标准框架之一，提供模型、工具、检索的抽象层。7 天 RAG 主题搜索中星标最高，仍是构建知识增强应用的主选。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 87,993（+473） | 开源领跑 RAG 引擎，融合 RAG 与 Agent 能力形成 LLM 上层上下文。今日 +473，生产级 RAG 热度持续走高。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 106,024 | 将代码库、文档、SQL schema、PDF 等转成可查询知识图，无需向量库。超 10 万星，说明“无向量 RAG”开始挑战传统 Embedding 方案。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,699 | 本地优先的 RAG/Agent 桌面应用，强调“自己拥有数据和智能”。适合个人与团队自托管知识库与 agent 工作流。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,623 | 面向文档 agent 与 OCR 的领先 RAG 框架，帮助开发者连接私有数据与 LLM。在 RAG 主题中保持 5 万+星。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,628 | 云原生高性能向量数据库，专为大规模向量 ANN 搜索设计。RAG 基建的头部选择，支撑大量生产级检索系统。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,169 | “无向量、基于推理”的文档索引方案，用于 Vectorless RAG。与 Graphify 一起代表检索范式从向量搜索向推理/知识图谱迁移。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,965 | 高性能大规模向量数据库与向量检索引擎，为 AI 应用而生。与 Milvus 构成开源向量库双雄，7 天主题搜索中热度稳定。 |

## 趋势信号分析

从今日增量看，社区爆发点集中在 **Agent Skills 与 Agent 工作区**：`diagram-design`、`anthropics/skills`、`obsidian-skills`、`agency-agents` 均进入 Trending，说明开发者不再满足于单点 Prompt，而是希望将可复用技能、记忆、工具协议打包进 coding agent 生态。

第二个信号是**端侧 AI 的“可运行性”被重视**：14MB 的 `needle`、本地听写的 `FluidVoice`、本地 3D 生成的 `modly` 都强调设备端推理。配合量化、小型化模型等技术，隐私与低成本场景开始成为主流叙事。

第三，基础设施层的“治理 / 路由 / 上下文”变热：`Switchyard` 做多模型路由，`semantica` 做图原生上下文，`rtk` 做 token 压缩，折射出大模型进入生产环境后的成本、可观测性、可审计性需求。这些方向与近期 Qwen3.8、Kimi K3、DeepSeek-V4 等新模型密集发布带来的“多模型共存”趋势直接相关——开发者需要统一入口，按成本/性能动态调度。

## 社区关注热点

- **Agent Skills 标准化**：`anthropics/skills`、`obsidian-skills`、`awesome-claude-skills` 正在形成“技能包”分发范式，建议关注可复用 Skill 与 MCP/CLI 的组合方式。
- **端侧超小模型与设备端 AI**：`needle`（14MB）、`FluidVoice`、`modly` 说明本地 AI 不再是玩具，手机、穿戴设备和个人电脑上已出现真实产品机会。
- **上下文与记忆层**：`macro`、`semantica`、`claude-mem`、`mem0` 等都在解决 agent“失忆”问题，长期记忆与共享 context 是下一阶段竞争点。
- **多模态视频 / 3D 生产**：`LTX-2`、`OpenMontage`、`MoneyPrinterTurbo` 推动“模型 → 成片”的自动化工作流，官方推理/LoRA 训练包的发布是重要信号。
- **RAG 的“无向量化”与知识图谱化**：`Graphify`、`PageIndex` 等探索不依赖 vector store 的检索与推理，正在重新定义 RAG 的成本结构和架构边界。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*