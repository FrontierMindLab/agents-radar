# Hugging Face 热门模型日报 2026-08-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-13 01:04 UTC

---

# Hugging Face 热门模型日报（2026-08-13）

## 今日速览

- MiniMax-H3 生态爆发：原生视频模型与大量 LoRA/ComfyUI/GGUF 衍生包同榜上榜，视频生成的可定制化成为本周社区焦点。
- MoonshotAI 的 Kimi-K3 以 10,583 周点赞、156 万下载登顶热榜，多模态模型持续吸睛。
- DeepSeek-V4-Flash 下载量破百万，Qwen3.8-2.4T-A95B 等超大 MoE 同步上榜，开源 LLM 竞争激烈。
- 量化与本地部署活动密集，unsloth、DavidAU、NVIDIA 带来的 GGUF/FP8/NVFP4 量化模型占据半壁江山。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,238 | 1,048,685 | DeepSeek V4 闪电版，面向高效文本生成与对话；单周下载破百万，是榜单中下载最高的纯语言模型。 |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 582 | 93,668 | Liquid AI 的 2.6B 轻量语言模型，主打低资源推理；以 582 赞证明小模型仍受社区重视。 |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 500 | 978 | 阿里 Qwen3.8 超大 MoE，2.4T 总参数激活 95B；作为前沿开源大模型，适合研究规模扩展与推理效率。 |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 346 | 2,049 | deepgrove 的 MoE 文本生成预览版；以预览身份上榜，显示新玩家正在入局。 |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 318 | 6,148 | Ling 3.0 的快速版本，支持对话和文本生成；与 tiny 版本同步上榜，反映 Ling 产品线扩展。 |
| [Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 189 | 0 | Ling 3.0 的 tiny 变体，采用混合架构；以极小体积出现，适合边缘或低算力场景探索。 |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 116 | 15,740 | NVIDIA Nemotron 3.5 Lightning 的 BF16 版本，30B-A3B MoE 架构；与 NVFP4 量化版共同覆盖不同部署需求。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,583 | 1,565,484 | 月之暗面推出的图像文本到文本多模态模型，采用压缩张量技术；周点赞高居榜首、下载超 156 万，是本周最热模型。 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,716 | 83,484 | MiniMax 的图像到视频生成模型，支持文本/图像双条件；原生模型带动大量衍生微调与集成版本。 |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,295 | 0 | Meta 的 30B 视觉语言模型，支持图像文本到文本对话；虽零下载但高赞，发布初期关注度飙升。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 568 | 39 | Lightricks 的图像到视频生成模型，支持多模态视频转换；在视频生成赛道中人气靠前。 |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 411 | 20,376 | MiniMax-H3-Turbo 的 diffusers 实现，用于图像/文本到视频；2 万+下载显示 Turbo 版有实际用户。 |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 352 | 653 | NVIDIA 的 11B 语音聊天模型，将语音理解与对话生成结合；作为音频多模态新作上榜。 |
| [BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 182 | 708 | 基于 Qwen3.5 MoE 的图像文本到文本模型，专注多模态对话；社区尝试将 MoE 架构用于视觉语言任务。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,955 | 2,521,093 | 社区微调 + GGUF 量化模型，基于 Qwen3.6 27B 并主打“无审查”角色扮演；下载量超 252 万，显示细分化微调需求庞大。 |
| [MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,258 | 6,798,796 | MiniMax-H3 的 ComfyUI 集成包，方便在 ComfyUI 工作流中直接调用；下载量近 680 万，是榜单下载量最高的衍生模型。 |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 701 | 0 | MiniMax-H3-Turbo 的 LoRA 微调，面向文本到视频生成；即使 0 下载也获高赞，说明社区对此类轻量微调关注。 |
| [DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 666 | 207,990 | DeepSeek V4 Flash 的 GGUF 量化版，由 unsloth 制作；20 万+下载说明用户正积极寻求本地部署 V4。 |
| [Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 477 | 0 | Qwen3-VL-32B 的社区微调 + INT8 量化，并适配 ComfyUI；集成了无审查等额外模块，适合本地视觉部署。 |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 359 | 0 | Muse-Glimmer-30B 的 GGUF 量化版，用于本地运行视觉语言模型；由 unsloth 提供，方便 CPU/低显存推理。 |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 301 | 0 | 面向 ComfyUI 的 MiniMax-H3-Turbo LoRA，将微调能力带入节点式流程；适合在 ComfyUI 中定制视频生成。 |
| [MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 294 | 0 | Kijai 出品的 MiniMax-H3 ComfyUI 适配；为视频生成提供定制节点与工作流。 |
| [PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 287 | 0 | 社区上传的 MiniMax-H3 风格化微调版本；针对特定审美定制视频输出。 |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 240 | 0 | 官方提供的 Muse-Glimmer-30B GGUF 版本；与 unsloth 版并列，表明该模型的量化生态正在形成。 |
| [MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 214 | 0 | Kijai 发布的 MiniMax-H3 实验版本；用于探索视频生成新功能与工作流扩展。 |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 205 | 19,250 | Nemotron 3.5 Lightning 的 NVFP4 4-bit 量化版；在保持生成质量的同时降低显存需求，适合本地推理。 |
| [MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 146 | 0 | 面向写实人物渲染的 MiniMax-H3 LoRA；由 fal.ai 提供，专攻真实感视频生成。 |
| [MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 141 | 353 | 用于优化视频生成提示词的 LoRA；提升 MiniMax-H3 对文本指令的理解与跟随。 |
| [MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 137 | 781 | MiniMax-H3 的 GGUF 量化版，支持 stable-diffusion.cpp 等工具；为视频模型本地部署铺路。 |
| [Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 115 | 3,851 | Qwen3.8 超大 MoE 的 FP8 量化版；把 2.4T 参数压缩为 8-bit，降低部署门槛。 |

## 生态信号

本周 MiniMax-H3 生态势头最旺，原生模型带动 10+ 衍生 LoRA/ComfyUI/GGUF 包，视频生成的可定制性成为社区核心热点。开源权重依然是主流，DeepSeek、Qwen、NVIDIA、MiniMax 等均开放可下载权重，未见闭源 API 模型。量化活动密集，GGUF、FP8、NVFP4 覆盖语言和多模态模型，本地部署门槛显著下降。多模态融合趋势明显，视觉语言、视频生成、语音聊天同台上榜，模型能力正从纯文本向全模态扩展。

## 值得探索

- [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)：本周最高赞模型，压缩张量 + 多模态生成值得深入研究。
- [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)：开源视频生成新标杆，配合大量 LoRA/ComfyUI 衍生包，适合快速搭建视频生成工作流。
- [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)：下载破百万，值得体验最新开源高效 LLM 的推理表现。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*