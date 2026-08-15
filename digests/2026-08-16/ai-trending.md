# AI 开源趋势日报 2026-08-16

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-15 23:00 UTC

---

# AI 开源趋势日报（2026-08-16）

**筛选说明**：已从 Trending 中剔除 `cordiverse/cordis`、`public-apis/public-apis`、`github/spec-kit`、`megadose/holehe` 等非 AI/ML 项目；主题搜索中亦剔除 Puppeteer、Bruno、Streamlit、Files、Yazi、Appsmith、it-tools、DevDocs、Julia 等通用开发工具。以下按最主要类别归类。

## 1. 今日速览

今日 AI 开源热榜被两股力量主导：一是 AI Coding 生态的“专业化与工具化”，[diagram-design](https://github.com/cathrynlavery/diagram-design) 以单日 +1,619 stars 领跑，[cursor/plugins](https://github.com/cursor/plugins) 和 [ego-lite](https://github.com/citrolabs/ego-lite) 分别从插件规范与浏览器自动化补全 coding agent 的基础设施；二是模型效率和本地化，[needle](https://github.com/cactus-compute/needle) 以 14MB 端侧模型、[Soup](https://github.com/MakazhanAlpamys/Soup) 在 4GB 笔记本 GPU 上微调 8B 模型、[Unsloth](https://github.com/unslothai/unsloth) 跟进最新 Qwen/DeepSeek 等，均获得高增速。主题搜索中，RAG/向量数据库（[Dify](https://github.com/langgenius/dify)、[RAGFlow](https://github.com/infiniflow/ragflow)、[Qdrant](https://github.com/qdrant/qdrant)、[Milvus](https://github.com/milvus-io/milvus)）保持庞大 star 池，Agent 记忆与 token 压缩（[claude-mem](https://github.com/thedotmack/claude-mem)、[mem0](https://github.com/mem0ai/mem0)、[rtk](https://github.com/rtk-ai/rtk)、[headroom](https://github.com/headroomlabs-ai/headroom)）成为新的基础层。视频生成的 agentic 工作台密集出现，[OpenMontage](https://github.com/calesthio/OpenMontage)、[dramaclaw](https://github.com/dramaclaw/dramaclaw)、[ClipForge](https://github.com/xixihhhh/clipforge) 等把“脚本到成片”的产品化推向开源。

## 2. 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0（+152） | Cursor 官方插件规范与插件库。今日新增 152 stars，AI IDE 插件生态正在标准化。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0（+1,619） | 为 Claude Code 准备的 29 种自包含 HTML/SVG 图表模板。单日 +1,619，反映 coding agent 对高质量视觉交付的强需求。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,118 | Hugging Face 模型定义与训练/推理框架。164k stars，仍是大模型落地的第一站。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,393 | 动态神经网络框架，支撑绝大多数 AI 研究与训练。102k stars，是 ML 工程的核心底座。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,601 | 本地模型运行/推理引擎，支持 Kimi-K2.6、GLM-5.2、DeepSeek 等最新模型。是本地 AI 部署的关键入口。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 167,786 | 面向 LLM/AI agent 的网页搜索、抓取与交互 API。167k stars，是 agent 获取外部数据的基础设施。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,238 | CLI 代理，可减少 60-90% LLM token 消耗。单 Rust 二进制零依赖，直击大模型调用成本痛点。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,488 | 在 Apple Silicon 上从 0 构建微型 LLM 推理系统。面向系统工程师的教学型项目，适合理解 vLLM/Qwen 推理原理。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,290 | Agent harness 性能优化系统，为 Claude Code/Codex/Cursor 等提供 skills、memory、security。240k stars，属于 agent 工程基础设施。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 231,064 | 通用 AI agent 框架，定位“与你一起成长的 agent”。231k stars，体现社区对长期、个性化 agent 的强烈关注。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,620 | 提供 accessible AI 的 agent 平台与工具。186k stars，是自主 agent 方向的标志性项目。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,343 | 让 AI agent 直接操作网站，实现在线任务自动化。109k stars，是 agent 获取“手”的核心工具。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,142 | AI-Driven Development 开源平台。84k stars，聚焦 AI 软件工程闭环。 |
| [citrolabs/ego-lite](https://github.com/citrolabs/ego-lite) | JavaScript | 0（+546） | AI agent 专用浏览器，可安全共享登录态给 Codex/Claude Code。今日 +546，浏览器自动化体验大幅简化。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | Python | 0（+100） | 提出“让所有软件 agent-native”的目标，并建设 CLI-Hub。今日 +100，代表 agent 与命令行交互的新范式。 |
| [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | JavaScript | 0（+553） | ToolJet AI 的开源底座，面向内部工具、业务应用与 AI agents 的生成平台。今日 +553，低代码 + AI agent 方向增长明显。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 148,871 | 用户友好的本地 AI 界面，支持 Ollama、OpenAI API 等。148k stars，是自托管 LLM 聊天/agent 的默认入口。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 103,925 | 根据主题或关键词一键生成高清短视频。103k stars，AI 短视频自动化工作流经典项目。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,739 | Local-first 的 all-in-one AI 应用/agent 体验。64k stars，强调“拥有自己的智能”。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 63,931 | 开源 AI 求职助手：扫描职位、评估打分、定制简历并跟踪申请。63k stars，是垂直场景 agent 的代表。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,519 | AI productivity studio，支持 300+ assistants 并统一接入前沿 LLM。50k stars，端侧 AI 工作台方向竞争激烈。 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,218 | 开源的 agentic 视频生产系统，含 12 条流水线、700+ agent skill。48k stars，推动“一句话成片”产品化。 |
| [altic-dev/FluidVoice](https://github.com/altic-dev/FluidVoice) | Swift | 0（+165） | macOS 本地听写 App，端侧 STT + 自训练 AI 增强模型。今日 +165，是本地语音助手替代云服务的积极信号。 |
| [xixihhhh/clipforge](https://github.com/xixihhhh/clipforge) | TypeScript | 550 | AI 带货短视频生成器，上传商品图即可产出多平台卖货视频。550 stars，正在细分电商短视频自动化。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [cactus-compute/needle](https://github.com/cactus-compute/needle) | Python | 0（+551） | 14MB 端侧基础模型，面向手机、穿戴、家居和机器人。今日 +551，刷新端侧模型体量纪录。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 0（+435） | 本地 UI 运行/训练 LLM 与扩散模型，支持 Qwen3.8、Kimi K3、DeepSeek-V4 等。今日 +435，与最新模型发布联动紧密。 |
| [MakazhanAlpamys/Soup](https://github.com/MakazhanAlpamys/Soup) | Python | 0（+303） | 一个 YAML 微调 LLM；层流式训练可在 4GB 笔记本 GPU 上训练 8B 模型。今日 +303，极低资源微调成为现实。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 102,730 | 从零实现 ChatGPT-like LLM 的 PyTorch 教程。102k stars，教学级项目热度居高不下。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,769 | NVIDIA 的高效高分辨率图像合成 Diffusion Transformer。8.7k stars，面向高效生成模型方向。 |
| [FurkanGozukara/Stable-Diffusion](https://github.com/FurkanGozukara/Stable-Diffusion) | HTML | 2,755 | 整合 FLUX、SD、SDXL、LoRA 微调、ComfyUI 等教程。2.7k stars，是图像/视频生成实操知识库。 |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | TypeScript | 1,424 | 日文 LLM 生态汇总列表。1.4k stars，体现多语言大模型社区建设。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | 支持 X-Bit 量化的端侧 LLM 推理库。317 stars，面向小内存设备运行 LLM。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,543 | 构建 Agentic workflows 与 RAG pipelines 的协作平台。152k stars，是企业级 LLM 应用开发核心。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,282 | Agent 工程化平台，覆盖 RAG、工具调用、多智能体。144k stars，是 LLM 应用生态常青树。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 90,834 | 捕获 agent 会话并用 AI 压缩，注入未来上下文。90k stars，成为跨会话记忆的通用方案。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,551 | 开源 RAG 引擎，融合 RAG 与 Agent 能力。88k stars，正成为 LLM 的上下文层。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,329 | AI Agent 的通用记忆层。63k stars，长期记忆需求持续爆发。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,662 | 文档 agent 与 OCR 平台。51k stars，面向文档解析和私域知识检索。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,646 | 高性能云原生向量数据库。45k stars，是大规模向量检索基础设施。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 33,992 | 高性能向量数据库与向量搜索引擎。33k stars，RAG/向量检索常用引擎。 |

## 3. 趋势信号分析

今日趋势最值得注意的信号是：AI Agent 不再只依赖“对话窗口”，而是在向浏览器、命令行、IDE 插件和交付物质量全面渗透。[ego-lite](https://github.com/citrolabs/ego-lite) 的 +546 stars 说明 agent 需要安全可控的浏览器会话共享；[CLI-Anything](https://github.com/HKUDS/CLI-Anything) 的“agent-native 软件”理念把 CLI 变成智能体接口；[diagram-design](https://github.com/cathrynlavery/diagram-design) 的爆红则说明开发者开始要求 Claude Code 产出规范、美观的图表，而不只是代码。

第二个信号是端侧与效率竞争加剧：14MB 的 [needle](https://github.com/cactus-compute/needle) 和 4GB GPU 可微调 8B 的 [Soup](https://github.com/MakazhanAlpamys/Soup)，表明“小模型 + 低资源”已从实验走向可落地；[Unsloth](https://github.com/unslothai/unsloth) 同步跟进 Qwen3.8、Kimi K3、DeepSeek-V4 等新模型，和近期大模型密集发布形成连锁反应。

第三个信号是 RAG/记忆层正在变成 AI 应用的标准件，[claude-mem](https://github.com/thedotmack/claude-mem)、[mem0](https://github.com/mem0ai/mem0)、[headroom](https://github.com/headroomlabs-ai/headroom) 等项目的存在说明上下文成本和质量已上升为工程核心问题。

## 4. 社区关注热点

- [citrolabs/ego-lite](https://github.com/citrolabs/ego-lite)：AI agent 专用浏览器，今日 +546。共享登录态、零配置，降低 agent 网页自动化的落地门槛。
- [cactus-compute/needle](https://github.com/cactus-compute/needle) 与 [MakazhanAlpamys/Soup](https://github.com/MakazhanAlpamys/Soup)：14MB 端侧模型 + 4GB GPU 微调 8B，是“小模型/低资源”趋势的代表。
- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)：单日 +1,619，说明 AI coding 助手的输出质量与设计规范正成为社区新关注点。
- [unslothai/unsloth](https://github.com/unslothai/unsloth)：本地训练/推理 UI 持续对齐最新模型，是“模型发布 → 开源工具跟进 → 生态落地”的风向标。
- [langgenius/dify](https://github.com/langgenius/dify) 与 [mem0ai/mem0](https://github.com/mem0ai/mem0)：Agent 工作流与长期记忆层正在成为 AI 应用标配，值得持续跟踪。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*