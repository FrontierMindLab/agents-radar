# Hugging Face 热门模型日报 2026-08-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-13 23:00 UTC

---

# Hugging Face 热门模型日报（2026-08-14）

## 今日速览

MiniMax-H3 成为本周最具生态效应的视频生成模型，官方基座、Turbo 版本、LoRA、GGUF、ComfyUI 封装大量上榜，其中 Comfy-Org 适配版下载量突破 1,000 万。Moonshot AI 的 Kimi-K3 以 10,620 点赞成为本周热门榜首，多模态图文对话关注度极高。DeepSeek-V4 系列持续走强，Flash 版本下载量超 143 万，Pro 版本也于本周亮相。量化与社区微调生态活跃，FP8、NVFP4、GGUF 及多种 MiniMax-H3 LoRA 密集发布。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,314 | 1,431,587 | DeepSeek-V4 的 Flash 版本，主打高吞吐、低延迟文本生成。本周下载超 143 万，是 LLM 中最受落地关注的选择之一。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 774 | 1,012 | Qwen 新一代稀疏 MoE 文本模型，总参数 2.4T、激活参数约 95B。目前下载仍处早期，但社区关注度已不低。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 602 | 116,640 | Liquid AI 的 2.6B 小参数生成模型，强调高效推理。11.6 万下载说明轻量 LLM 在端侧/低资源场景需求明确。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 352 | 3,868 | deepgrove 推出的预览版文本生成模型，采用 mixture-of-experts 架构。下载量不高，属于值得跟踪的新实验模型。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 323 | 10,052 | Ling-3.0 系列的 Flash 版本，支持文本生成与对话。使用 bailing_hybrid 架构，适合轻量对话场景。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 267 | 0 | DeepSeek-V4 的增强版，定位更强推理与服务端部署。刚发布，尚未产生下载但已获得 267 赞。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 216 | 1,292 | Ling-3.0 的 tiny 版，任务标签为 N/A，按系列定位应面向更低成本的端侧部署。下载 1.3k，适合轻量实验。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 129 | 22,279 | NVIDIA 开源 MoE 模型，30B 总参数、3B 激活参数，BF16 全精度版本。适合作为 LLM 推理效率与二次量化的参考基座。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,620 | 1,871,575 | Moonshot AI 的多模态模型，支持图文输入与对话。以 10,620 点赞成为本周榜首，187 万下载表明视觉语言模型热度极高。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,818 | 1,605,940 | MiniMax 新一代视频生成模型，支持文本/图像生成视频。点赞 3,818、下载 160 万，并带动大量 LoRA/GGUF/ComfyUI 衍生生态。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,412 | 121,042 | Meta 开源的 30B 图文对话模型，支持带图理解与多轮对话。下载 12.1 万，是值得关注的视觉语言模型基座。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,288 | 10,365,210 | MiniMax-H3 的 ComfyUI 单文件封装版，便于直接在 ComfyUI 中加载生成。下载 1,036 万，是本期下载量最高的条目。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 712 | 57,287 | Lightricks 的视频生成模型，支持 image-to-video、text-to-video 及 video-to-video。5.7 万下载，是专业视频工具链的有力选手。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 458 | 91,455 | MiniMax-H3 Turbo 的社区版本，支持 t2v/i2v/r2v 多形态视频生成。下载 9.1 万，反映用户对轻量视频模型的需求。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 371 | 1,164 | NVIDIA 的 11B 语音对话模型，面向语音助手/实时交互场景。目前下载量较低，但音频多模态方向值得关注。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 303 | 0 | Kijai 为 MiniMax-H3 提供的 ComfyUI 节点/工作流适配。下载量为 0，可能刚发布或未附带实际模型文件。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 272 | 25 | MiniMax 的音乐生成模型，支持文本到音乐生成。刚发布，下载量还很小，代表音频生成的新方向。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 188 | 3,184 | 基于 Qwen3.5-MoE 架构的图文对话模型，任务为 image-text-to-text。下载 3.2k，适合做多模态对话实验。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

本期榜单中没有符合该分类的上榜模型，因此省略表格。

### 📦 微调与量化（社区微调、GGUF、LoRA、量化）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,986 | 2,793,115 | 社区 GGUF 微调模型，强调 Uncensored 与风格化融合。下载 279 万，是量化/微调类别中热度最高的模型之一。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 725 | 0 | MiniMax-H3 Turbo 的 LoRA 模块，支持 text-to-video 与 text-to-audio 扩展。点赞 725 但下载为 0，社区关注度和实际分发存在落差。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 483 | 0 | Qwen3-VL-32B 的 INT8 量化社区版本，融合 Heretic 微调与 ComfyUI 适配。点赞 483，属于较极客向的实验资源。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 390 | 352,023 | Unsloth 提供的 Muse-Glimmer-30B GGUF 量化版，便于低资源本地运行。35 万下载，说明官方模型的量化需求旺盛。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 314 | 0 | MiniMax-H3 Turbo LoRA 的 ComfyUI 集成，方便工作流直接调用。点赞 314 但下载为 0，可能是新资源或链接导向型仓库。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 298 | 324 | 社区风格的 MiniMax-H3 文本到视频适配模型，兼容 endpoints。下载量较低，属于长尾微调作品。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 257 | 136,783 | Meta 官方发布的 Muse-Glimmer-30B GGUF 版本。适合本地图文对话推理，下载 13.7 万。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 229 | 44,859 | NVIDIA 官方 NVFP4 4-bit 量化版，针对自家 GPU 推理优化。下载 4.5 万，是高效 MoE 部署的代表。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 157 | 4,000 | Qwen3.8 MoE 的官方 FP8 量化版，能降低显存占用。下载 4,000 次，适合大规模部署测试。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 157 | 4,692 | 面向 MiniMax-H3 的写实人物 LoRA，用于增强视频生成中的人物质感。下载 4.7k，是视频模型社区微调的典型样本。 |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 149 | 111,222 | MiniMax-H3 的 GGUF 版本，支持 stable-diffusion.cpp 等本地推理。11.1 万下载，说明本地视频生成需求不小。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 148 | 652 | 用于重写提示词的 LoRA，可提升 MiniMax-H3 的视频指令质量。下载 652，属于 Prompt 工程方向的辅助微调。 |

## 生态信号

MiniMax-H3 生态最为突出：基座、Turbo、LoRA、GGUF、ComfyUI 封装齐上榜，显示视频生成已进入社区化共建阶段。Kimi-K3 以最高点赞成为多模态黑马，DeepSeek/Qwen 继续占据文本模型头部。榜单几乎全部为开放权重或可下载资源；BF16 全精度与 FP8、NVFP4、GGUF 等量化层次分明，覆盖从研究到本地部署的各类场景。Uncensored/Heretic 等社区微调也持续存在，构成不可忽视的长尾生态。

## 值得探索

- **moonshotai/Kimi-K3**：本周点赞第一，兼具多模态理解与压缩张量特性，适合研究下一代端侧多模态模型方向。
- **Comfy-Org/MiniMax-H3**：下载量超千万的 ComfyUI 封装版，是快速上手 MiniMax-H3 视频生成的最佳入口。
- **deepseek-ai/DeepSeek-V4-Flash-0731**：高下载、高点赞的文本生成模型，适合作为生产级 LLM 服务或二次微调的起点。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*