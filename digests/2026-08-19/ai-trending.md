# AI 开源趋势日报 2026-08-19

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-18 23:00 UTC

---

# AI 开源趋势日报（2026-08-19）

## 筛选说明
- 从 GitHub Trending 的 13 个仓库中，筛出 7 个与 AI/ML 明确相关的项目：MoneyPrinterTurbo、munder-difflin、ai-memory、OpenViking、Anthropic-Cybersecurity-Skills、omlx、ai-agent-book。
- 通用工具、Linux 发行版、下载管理器、开源视频编辑器等非 AI 项目不列入本报告。
- Stars 列说明：Trending 原始数据未提供总量，因此未出现在 Search 结果中的项目用 “—” 表示总量，括号内为今日新增；同时出现在 Search 结果中的项目优先采用 Search 总量。

## 今日速览
今日 AI 开源热榜由“Agent 记忆/上下文”“AI 视频生成”和“Agent 技能包”共同驱动：`ai-memory` 与 `OpenViking` 双双登榜，说明 Agent 长期记忆与上下文数据库正成为新基础设施。`MoneyPrinterTurbo` 以今日 +2,306 stars 成为最高增长项目，AI 短视频生成仍是社区流量焦点。`Anthropic-Cybersecurity-Skills` 以 817 个结构化网络安全技能包快速走红，显示 Agent 技能正在向安全等垂直领域标准化。此外，Apple Silicon 本地推理工具 `omlx` 上榜，设备端 LLM 服务成为值得关注的开发者方向。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,497 | Agent 工程化核心框架，统一模型、工具与工作流抽象。LLM 应用开发的事实标准之一。 |
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python | 89,375 | 高吞吐、内存高效的 LLM 推理与服务引擎。社区持续迭代，是大模型部署关键基础设施。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,902 | 本地一键运行开源大模型的工具，支持 Kimi、GLM、DeepSeek、Qwen 等模型。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,227 | 最主流的开源模型定义、训练与推理框架之一。AI 生态的“模型仓库枢纽”。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,468 | 动态神经网络与 GPU 加速深度学习框架，是研究到落地的基础底座。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,536 | CLI 代理工具，可减少 60-90% LLM token 消耗。面向 AI 开发者的高性价比基础设施。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,313 | Rust 生态的模块化 LLM 应用开发库，适合构建可扩展的 AI 服务。 |
| [jundot/omlx](https://github.com/jundot/omlx) | Python | —（+366） | Apple Silicon 上的 LLM 推理服务器，支持连续批处理与 SSD 缓存。今日登榜说明本地推理工具获得关注。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,958 | Agent harness 性能优化系统，覆盖技能、记忆、安全与研发流程。是 Claude Code、Cursor 等工具的增强层。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,672 | 最经典的通用 AI Agent 项目，持续推动“AI 自主完成任务”的愿景。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,649 | 让 AI Agent 能操作真实网站，是浏览器自动化与 Agent 结合的重要代表。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,421 | AI 驱动软件开发助手，面向编码、执行命令与自动化开发流程。 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | Python | 74,584 | 从 0 到 1 构建类 Claude Code Agent harness 的教学项目，解释技术细节。 |
| [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Python | —（+726） | 面向 AI Agent 的 817 个结构化网络安全技能，映射 MITRE ATT&CK、NIST CSF 等多套框架。今日 +726 stars，安全 Agent 技能生态正在形成。 |
| [chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin) | TypeScript | —（+256） | 本地多 Agent 运行 harness。今日登榜，反映轻量 Agent 编排工具需求旺盛。 |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | Python | 39,081（+556） | 《深入理解 AI Agent：设计原理与工程实践》开源主仓库，含全书正文与按章代码。今日 +556 stars，Agent 学习内容持续升温。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 108,461（+2,306） | 根据主题或关键词一键生成高清短视频，AI 工作流驱动。今日 +2,306 stars，是当前 Trending 最高增长 AI 项目。 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 72,804 | 让 AI Agent 读取并检索全网内容的 CLI 工具，覆盖 Twitter、Reddit、YouTube、B站等。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 65,328 | 开源 AI 求职工具：扫描职位、评分、定制简历并追踪申请流程，可运行在本地 AI 编码 CLI 中。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 63,294 | LLM 驱动的多市场股票智能分析系统，集成行情、新闻、看板与自动推送。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,732 | AI 生产力工作台，支持智能聊天、自主 Agent 与 300+ 助手。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 47,759 | 将文档或主题一键转换为原生 PowerPoint，支持图表、动画与音频旁白。 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,775 | 号称首个开源 Agentic 视频制作系统，包含 12 条生产管线与 700+ Agent 技能文件。 |
| [ArcReel/ArcReel](https://github.com/ArcReel/ArcReel) | Python | 4,061 | 自部署 AI 视频工作台，把小说/剧本转换为角色、分镜、视频与剪映草稿。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,737 | YOLO 系列目标检测模型的训练与推理框架，是计算机视觉领域活跃度最高的项目之一。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,785 | 高效高分辨率图像生成模型，使用 Linear Diffusion Transformer，生成质量与效率并重。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,314 | 支持 100+ 数据集、多模型的大模型评测平台，是评估模型能力的常用基础设施。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,501 | 面向系统工程师的微型 LLM 推理系统教学项目，在 Apple Silicon 上构建类似 vLLM 的推理栈。 |
| [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) | Rust | 78 | 使用纯 Rust + Candle 从零构建 decoder-only LLM，无 Python/PyTorch 依赖，探索轻量训练与部署。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | —（+298） | 面向 AI Agent 的自进化上下文数据库，统一 Agent 记忆、知识 RAG 与技能。今日登榜，代表 Agent 记忆基础设施新方向。 |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | Rust | —（+730） | 为 Agent 编码 CLI 提供长期记忆，并促进不同 Agent 厂商之间的交接。今日 +730 stars，增长显著。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 91,153 | 为 Agent 提供跨会话持久上下文，自动捕获、压缩并注入历史信息。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,767 | 领先的开源 RAG 引擎，将 RAG 与 Agent 能力结合，构建 LLM 上下文层。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,541 | 面向 AI Agent 的通用记忆层，支持跨应用长期记忆。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,733 | 领先的文档 Agent 与 OCR 平台，也是 RAG 应用开发的核心框架之一。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,679 | 云原生高性能向量数据库，适合大规模向量 ANN 检索。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,049 | 高性能向量数据库与向量搜索引擎，定位下一代 AI 基础设施。 |

## 趋势信号分析
今日最明显的趋势是 **Agent 记忆与上下文工程** 正在爆发：`ai-memory`、`OpenViking`、`claude-mem` 等项目同时受到关注，说明开发者已经不满足于“单次对话式 Agent”，而是希望 Agent 具备跨会话、跨工具、跨厂商的长期记忆。`ai-memory` 今日 +730 stars，`OpenViking` 今日 +298 stars，均为新面孔。

其次是 **Agent Skills 技能包** 生态快速成型：`Anthropic-Cybersecurity-Skills` 将安全能力标准化为 817 个技能，并与 Claude Code、Copilot、Coder 等 20+ 平台兼容。这意味着 Agent 的“技能”正像插件一样被分发和复用，安全、金融、视频制作等垂直领域开始出现标准化 Agent 技能库。

第三，**本地/边缘 LLM 推理** 在 Apple Silicon 上继续升温：`omlx` 将连续批处理与 SSD 缓存结合，并提供 macOS 菜单栏管理界面；配合 `tiny-llm` 等教学项目，设备端推理正在从“玩具”走向轻量生产力工具。

最后，AI 视频生成依然是社区流量引擎：`MoneyPrinterTurbo` 单日 +2,306 stars，稳居 AI 项目增长第一；`OpenMontage`、`ArcReel` 等项目则把 Agent 工作流引入视频生产管线，从“一键短视频”升级为“Agent 全流程视频工作室”。

## 社区关注热点
- **Agent 长期记忆与上下文数据库**：重点关注 `ai-memory`、`OpenViking`、`mem0ai/mem0`。这是解决 Agent 连续性和多工具协作的关键瓶颈。
- **Agent 技能包标准化**：关注 `Anthropic-Cybersecurity-Skills` 与 `affaan-m/ECC`。技能正在成为 Agent 生态的新分发单元，安全、代码、视频等领域均可能快速专业分化。
- **本地 LLM 推理工具**：关注 `jundot/omlx` 与 `skyzh/tiny-llm`。Apple Silicon 设备端推理体验正在快速提升，适合开发者和个人用户低成本部署私有模型。
- **AI 视频工作流**：关注 `MoneyPrinterTurbo`、`OpenMontage`、`ArcReel`。从短视频生成到完整视频制片管线，AI Agent 在内容创作侧的渗透速度明显加快。
- **RAG 与向量数据库融合 Agent 记忆**：关注 `RAGFlow`、`LlamaIndex`、`Milvus`、`Qdrant`。传统 RAG 正向“统一 Agent 上下文层”演进。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*