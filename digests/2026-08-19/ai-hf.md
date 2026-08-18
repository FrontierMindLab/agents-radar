# Hugging Face 热门模型日报 2026-08-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-18 23:00 UTC

---

## 今日速览

截至 2026-08-19，Hugging Face 热门榜由 Qwen 生态主导：Qwen3.8-27B 以 11,108 周赞登顶，其 GGUF/FP8/NVFP4 等衍生版本下载量合计数百万，成为当前最热开源多模态底座。DeepSeek V4 系列回归，Flash 版下载量超 212 万；Kimi-K3 则以 10,827 赞成为另一匹黑马。多模态生成继续爆发：MiniMax-H3 官方版与 ComfyUI 单文件版下载量合计超 1,700 万，MiniMax-Music3 也进入榜单。社区微调与量化活动密集，GGUF、FP8、NVFP4、MLX 格式和 uncensored 变体大量出现，显示本地部署与定制化需求旺盛。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,524 | 2,123,462 | DeepSeek V4 的高效分支，主打速度与部署成本。下载量超 212 万，是本周热度最高的纯文本 LLM 之一。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,064 | 11,212 | Qwen 3.8 系列的 MoE 文本模型，总参数 2.4T、激活参数 95B。以较低激活成本提供大模型能力，是 Qwen 纯文本底座。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 602 | 30,985 | DeepSeek V4 专业版，面向复杂推理与高质量对话。本周正式发布即上榜，代表 DeepSeek 旗舰能力。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 319 | 9,990 | inclusionAI 的轻量文本生成模型，采用 bailing_hybrid 混合架构并包含 custom code。适合小模型架构研究与快速实验。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,108 | 665,513 | Qwen 3.8 多模态旗舰，支持图像+文本输入并生成对话。周赞 11,108 断层第一，是本周 Hugging Face 上最热模型。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,827 | 2,226,898 | Moonshot AI 的多模态视觉语言模型，同时带 feature-extraction 与 compressed-tensors 特性。周赞 10,827，下载量超 222 万，是本周黑马。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,143 | 2,855,539 | MiniMax 新一代视频生成模型，支持文本到视频、图像到视频。下载量超 285 万，是视频类人气最高的官方模型之一。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,680 | 384,097 | meta-models 发布的 30B 多模态视觉语言模型，任务为 image-text-to-text。上线即获 1,680 周赞，是多模态新贵。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,219 | 503,632 | Lightricks 的视频生成模型，支持文生视频、图生视频和视频到视频。下载量超 50 万，是通用视频生成工具代表。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 958 | 11,745 | MiniMax 的音乐生成模型，基于 diffusers，支持 text-to-music。周赞 958，显示音乐生成正成为新热点。 |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 246 | 24,893 | 2.9B 的文本到图像单文件扩散模型，兼容 ComfyUI。适合轻量、可本地运行的文生图实验。 |
| [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) | LiquidAI | 173 | 9,101 | LiquidAI 的轻量多模态视觉语言模型，3B 级参数。适合边缘设备与高效多模态推理研究。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 219 | 1,120 | dots3 系列面向笔记/文本生成方向的预览模型，支持图像与文本输入。作为垂直场景新模型，值得跟踪正式版动向。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,140 | 3,020,528 | 高复杂度社区融合/微调 GGUF，基于 Qwen3.6-27B。下载量超 302 万，是社区魔改路线中的现象级模型。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 1,811 | 3,561,466 | unsloth 出品的 Qwen3.8-27B GGUF 量化版。下载量 356 万，是榜单中下载最高的 GGUF，本地部署需求强烈。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,424 | 14,641,908 | Comfy-Org 打包的 MiniMax-H3 ComfyUI 单文件版。下载量 1,464 万，为本次榜单最高，是 ComfyUI 视频生态核心资产。 |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,251 | 0 | Qwen 系聊天模板修复资源，非权重模型。对 MLX/llama.cpp 等本地推理工具链有直接帮助，社区关注度高。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 608 | 300,279 | MiniMax-H3 的 Turbo 变体，支持文生视频、图生视频等。定位更快/更轻量，下载量超 30 万。 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 561 | 741,011 | Qwen 官方发布的 FP8 量化多模态模型。在保留视觉对话能力的同时降低显存需求，下载量 74 万。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 526 | 45,465 | orcarouter 推出的 abliterated/去审查 FP8 版本。面向低限制本地部署用户，是定制化路线代表之一。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 481 | 787,276 | Muse-Glimmer-30B 的 GGUF 量化版。下载量 78.7 万，说明这款多模态模型有很高的本地部署需求。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 407 | 558,767 | 社区 uncensored 微调的 GGUF 版，支持 MTP。下载量 55.9 万，是 Uncensored 路线中高热度 GGUF 之一。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 321 | 269,372 | NVIDIA 官方发布的 30B-A3B MoE 模型，已量化至 NVFP4 格式。针对 NVIDIA GPU 推理部署做了显存与速度优化。 |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 263 | 0 | 基于 MiniMax-H3 的社区微调视频模型，支持文/图到视频。定位风格化定制内容，新发布暂无下载。 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 261 | 523,919 | unsloth 量化为 NVFP4 格式的 Qwen3.8-27B。面向支持 NVFP4 的 NVIDIA GPU，下载量 52.4 万。 |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 243 | 0 | Qwen3.8-27B Uncensored 的 MLX 格式适配版。面向 Apple Silicon 用户，刚发布、暂无下载。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 225 | 13,344 | Qwen 官方 FP8 量化版 MoE 文本模型。显著降低 2.4T 总参数模型的部署门槛。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 195 | 27,745 | Qwen3.8-27B 的社区激进风格 uncensored GGUF，内置 MTP。标签含 multimodal/vision，适合研究安全对齐与社区微调。 |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 177 | 285,444 | MiniMax-Music3 的 ComfyUI 单文件封装版。让音乐生成可直接在 ComfyUI 工作流中使用。 |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 171 | 12,854 | empero-ai 发布的 Qwen3.8-27B Ridge 量化 GGUF，使用 llama.cpp 格式。适合偏好不同量化档位的 llama.cpp 用户尝试。 |

## 生态信号

本周生态信号非常清晰：Qwen 家族成为事实上的“模型基座”，官方发布、unsloth 量化、社区 uncensored 分支形成完整矩阵；MiniMax 则通过 ComfyUI 单文件包将视频/音乐生成送入主流工作流。榜单几乎全部为开源权重模型，头部模型下载量动辄百万，说明开放模型已从“可玩”变为“可部署”。量化活动集中于 GGUF、FP8、NVFP4、MLX 四种格式，其中 GGUF 下载量最高；与此同时，“去审查/uncensored”微调版本频繁出现，显示社区在安全对齐之外存在明显的定制化需求。

## 值得探索

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)：本周热度最高、生态最完整的多模态基座，适合作为视觉对话与多模态 Agent 的起点。
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)：视频生成领域人气最高之一，配合 [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) 可直接在 ComfyUI 中体验完整视频生成工作流。
- [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)：高赞黑马，压缩张量与特征抽取特性值得关注，适合研究多模态模型的效率优化方向。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*