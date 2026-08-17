# AI 开源趋势日报 2026-08-18

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-17 23:00 UTC

---

# AI 开源生态趋势日报 · 2026-08-18

> 说明：Trending 榜单未给出总量的项目，Stars 以“—”表示；若项目同时出现在主题搜索中，总量以主题搜索数据补齐。所有 Stars 数字均照抄原始数据。

## 筛选说明

Trending 共 11 个仓库，筛出 7 个与 AI/ML 强相关项目，排除 `nautilus_trader`（量化交易引擎）、`immich`（相册管理）、`cordis`（时空组合框架）、`Motrix`（下载工具）。主题搜索中同样排除了 `puppeteer`、`bruno`、`Files`、`devdocs`、`appsmith` 等通用开发者工具，以及 Julia、Airflow 等泛化项目。

## 一、今日速览

今日 AI 开源生态最明显的信号是 **Agent 开始从“能对话”走向“能交付”**：`ai-memory` 解决编码 Agent 长期记忆与厂商交接，`Anthropic-Cybersecurity-Skills` 将 817 个安全技能标准化为可跨平台调用的 skill 包。与此同时，本地/边缘推理与 token 成本控制成为集中爆发点，`llmfit`、`omlx`、`rtk` 分别从硬件匹配、Apple Silicon 推理、token 压缩三个方向切入。AI 内容生产依然是社区最吸睛的变现场景，`MoneyPrinterTurbo` 以 +1,275 的今日新增 stars 登顶 Trending。整体来看，社区注意力正从“跑通 Demo”转向“可长期运行、可交接、可降本”的 Agent 基础设施。

## 二、各维度热门项目

### 🔧 AI 基础工具（框架 / 推理引擎 / CLI）

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 178,807 | 本地/自托管 LLM 运行工具，提供 OpenAI 兼容 API。是私有化模型部署的事实标准，主题搜索中保持高活跃度。 |
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python | 89,275 | 高吞吐、内存高效的 LLM 推理与 serving 引擎。自建推理服务的重要底座，持续被大量 Agent/RAG 项目依赖。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 76,404 | 可降低 60-90% token 消耗的 CLI 代理，单二进制、零依赖。契合当前 Agent 规模化带来的成本控制需求。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 66,666 | 在内容进入 LLM 前压缩工具输出、日志和 RAG 片段，宣称可减少 20-95% token。与 rtk 同属“上下文瘦身”方向。 |
| [opencompass/opencompass](https://github.com/opencompass/opencompass) | Python | 7,310 | 覆盖 100+ 数据集的 LLM 评测平台。模型选型、Benchmark 对比与发布评估的常用基础设施。 |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | —（+239） | 今日 Trending 上榜：一条命令匹配数百个模型/供应商与本地硬件。解决“什么模型能跑在我的机器上”的选型痛点。 |
| [jundot/omlx](https://github.com/jundot/omlx) | Python | —（+96） | 今日 Trending 上榜：面向 Apple Silicon 的 LLM 推理服务器，支持连续批处理与 SSD 缓存。macOS 菜单栏管理，本地推理门槛进一步降低。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,497 | 面向系统工程师的“手写一个 tiny vLLM + Qwen”教学项目。帮助理解 LLM 推理系统内部机制，教育属性强。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 240,694 | Agent harness 性能优化系统，覆盖 skills、instincts、memory、security 等能力。为 Claude Code、Codex、Cursor 等编码 Agent 提供统一增强层。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 232,001 | 定位“与你一起成长的 Agent”，强调通用、可扩展的 agent 框架。在 ai-agent 主题中星标极高。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,414 | Agent 工程平台，提供工具调用、编排、RAG 等标准抽象。当前 AI Agent 生态最核心的框架之一。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,524 | 让 AI Agent 直接操作浏览器完成网页自动化。是 Web Agent 方向最受欢迎的基础设施。 |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | 84,333 | AI 驱动的软件开发助手，覆盖编码、调试与自动任务执行。代表 coding agent 从对话走向自主工作流。 |
| [agno-agi/agno](https://github.com/agno-agi/agno) | Python | 41,747 | 构建、运行、管理多 Agent 平台。强调 Agent 从原型到生产的完整生命周期管理。 |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | Rust | —（+207） | 今日 Trending 上榜：为编码 CLI 提供长期记忆，并支持不同 Agent 供应商之间的交接。切中 Agent 记忆碎片化与厂商锁定痛点。 |
| [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Python | —（+156） | 今日 Trending 上榜：817 个结构化网络安全 skills，映射 MITRE ATT&CK、NIST CSF 2.0 等 6 大框架，适配 20+ agent 平台。安全技能正在进入 Agent 标准库。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 149,043 | 用户友好的 AI 对话/知识库 Web 界面，支持 Ollama、OpenAI API 等。本地私有化部署中最常用的 AI 应用层。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 105,919（+1,275） | 今日 Trending 第一：输入主题或关键词，一键生成高清短视频。AI 自动化内容生产场景的典型落地。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,834 | 本地优先的 All-in-one AI 工作台。强调“拥有自己的智能体”，提供 RAG、Agent、多模型管理等能力。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 64,580（+147） | 今日 Trending 上榜：开源 AI 求职工具，可扫描职位、按 A-F 评分、定制简历并跟踪申请，运行在本地 AI 编码 CLI 中。 |
| [usestrix/strix](https://github.com/usestrix/strix) | Python | —（+656） | 今日 Trending 上榜：开源 AI 渗透测试工具，自动发现并修复应用漏洞。是 AI+Security 方向的新兴明星项目。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,662 | AI 生产力工作室，支持 300+ 助手与主流模型统一接入。面向知识工作者的多模型桌面应用。 |
| [Calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 48,593 | 开源 agentic 视频生产系统，提供 12 条生产管线、100+ 工具、700+ agent 技能。将 AI 编码助手变成完整视频制作工作室。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 47,490 | AI 将文档或主题转成原生 PowerPoint，支持动画、图表、配音等。AI 办公内容生成的高热度垂直应用。 |

### 🧠 大模型 / 训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 196,990 | 通用机器学习框架，覆盖训练、部署与生产工具链。仍是生产级 ML 系统的重要底座。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,195 | SOTA 模型定义、训练与推理的标准框架。几乎所有主流开源模型都会首先接入该生态。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,439 | 深度学习训练框架的事实标准，从研究到生产均广泛使用。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | Python | 66,963 | 经典机器学习库，适合传统 ML 建模、特征工程与 pipeline 构建。 |
| [keras/keras](https://github.com/keras/keras) | Python | 64,236 | 高层深度学习 API，兼容 JAX、TensorFlow、PyTorch 等多后端。适合快速搭建与迭代模型。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,696 | YOLO 系列目标检测、实例分割、姿态估计等 CV 训练与部署工具。计算机视觉领域最活跃的开源项目之一。 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 8,780 | NVIDIA 开源的高效高分辨率图像合成模型，基于线性 Diffusion Transformer。代表生成式视觉模型的新方向。 |

### 🔍 RAG / 知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 152,721 | 可视化构建 Agentic workflow 与 RAG 流水线，支持多模型和工具接入。是 AI 应用平台中活跃度最高的项目之一。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 107,492 | 将代码库、文档、SQL、PDF 转成可查询知识图谱，专为编码 Agent 设计，且不需要向量库。在方法论上挑战传统 RAG。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,678 | 开源 RAG 引擎，融合 Agent 能力为 LLM 构造上下文层。企业级 RAG 方案的代表项目。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,466 | 面向 AI Agent 的通用记忆层，实现跨会话长期记忆。是 Agent 记忆/知识管理方向的核心组件。 |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Rust | 58,995 | 轻量高速搜索引擎，提供 AI 混合搜索能力。常用于站点/应用内搜索基础设施。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,707 | 文档 Agent 与 OCR 平台，是构建 RAG 数据管线的领先框架。广泛用于将企业数据接入 LLM。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,666 | 云原生向量数据库，支持大规模向量 ANN 检索。是 RAG/Agent 记忆场景最常见的向量存储之一。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,029 | 高性能向量数据库与向量检索引擎，为 AI 应用提供可扩展的向量搜索能力。 |

## 三、趋势信号分析

今日最明确的信号是 **Agent 进入“工程化交付”阶段**。Trending 榜上 `ai-memory` 解决跨供应商长期记忆交接，`Anthropic-Cybersecurity-Skills` 将 817 个安全技能打包成跨平台 skills，说明 Agent 能力正在像“软件包”一样被标准化复用，而不再只是单点 Demo。

第二个信号是 **本地推理与 token 成本控制集中爆发**。`llmfit`、`omlx`、`rtk` 分别从硬件匹配、Apple Silicon 推理、token 压缩三个角度降低 Agent 规模化成本。社区显然在为“大量 Agent 长期运行”做基础设施准备。

第三个信号是 **AI 内容生产仍是变现最快的方向**。`MoneyPrinterTurbo` 以 +1,275 stars 的热度登顶，`OpenMontage`、`ppt-master`、`dramaclaw` 等也在把 AI 视频/办公从单点工具推向流水线化。整体来看，焦点已从模型能力转向“Agent 能否稳定、安全、低代价地交付真实任务”。

## 四、社区关注热点

- **Agent Skills 标准化**：`Anthropic-Cybersecurity-Skills` 和 [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) 都在将技能“目录化、插件化”。后者已汇集 2005+ 个 agent skills，未来 agent 能力分发可能像 npm 生态一样成熟。

- **Agent 长期记忆与厂商交接**：[akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory)、[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[mem0ai/mem0](https://github.com/mem0ai/mem0) 共同指向“记忆是 Agent 生产化的核心瓶颈”。跨会话、跨 Agent 供应商的记忆层会成为刚需。

- **本地推理与 token 经济**：[AlexsJones/llmfit](https://github.com/AlexsJones/llmfit)、[jundot/omlx](https://github.com/jundot/omlx)、[rtk-ai/rtk](https://github.com/rtk-ai/rtk) 分别从硬件适配、本地推理、token 压缩切入。它们适合需要控制成本或数据必须本地化的开发者。

- **AI 安全攻防**：[usestrix/strix](https://github.com/usestrix/strix) 用 AI 做渗透测试，`Anthropic-Cybersecurity-Skills` 则把安全能力教给 Agent。AI 驱动的安全左移会成为企业采用 Agent 前的重要考量。

- **AI 视频/办公内容生成流水线**：[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)、[Calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)、[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) 证明“文字到可交付资产”的自动化路径正在快速产品化。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*