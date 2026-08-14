# Hugging Face 热门模型日报 2026-08-15

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-14 23:00 UTC

---

# Hugging Face 热门模型日报

**日期：2026-08-15**

## 今日速览

今日 Hugging Face 热门榜由 Qwen 3.8、Kimi-K3 和 MiniMax-H3 三股力量主导：Moonshot 的 Kimi-K3 以 10,669 赞登顶，Qwen 3.8 系列同时放出多模态 27B、2.4T MoE 及 FP8/GGUF 版本，MiniMax-H3 视频生态则继续爆发，其 ComfyUI 单文件版下载量已超 1,176 万。DeepSeek V4 Flash/Pro 同日上线，Flash 下载量突破 160 万，说明高效文本生成仍是刚需。NVIDIA Nemotron 3.5 Lightning 30B-A3B 以 BF16/NVFP4 双版本入榜，开源大模型竞争重点继续向推理效率倾斜。社区侧，Unsloth 与大量 MiniMax-H3 LoRA/ComfyUI 适配正在快速降低本地部署门槛。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 910 | 3,832 | Qwen 3.8 系列文本生成 MoE，总参数量 2.4T、激活约 95B。官方大参数模型，是 Qwen 家族本轮最受关注的 MoE 之一。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,380 | 1,606,491 | DeepSeek V4 的 Flash 版本，主打快速文本生成与对话。3,380 赞和 160 万下载验证了社区对高效推理模型的强需求。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 430 | 245 | DeepSeek V4 的 Pro 迭代，定位更强推理能力。当前下载量仅 245，但从 430 赞看早期关注度不低。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 234 | 2,283 | inclusionAI 的 Ling 3.0 tiny 实验模型，采用 bailing_hybrid 混合架构，MIT 许可。适合关注轻量级/边缘侧新架构的研究者。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 614 | 124,172 | Liquid AI 的 LFM2.5 小模型，2.6B 参数面向高效文本生成。12.4 万下载说明轻量可部署模型在开发者中持续走热。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 141 | 34,137 | NVIDIA 开源 MoE 语言模型，30B 总参数/3B 激活，BF16 精度。作为 Lightning 系列的官方权重，兼顾吞吐与质量。 |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 135 | 11 | dots3-note 预览版，支持图像文本输入的对话/笔记生成。下载量仅 11，属于早期版本，适合追踪 Dots 系列迭代。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 8,897 | 2 | Qwen 3.8 系列的 27B 多模态对话模型，支持图像与文本联合理解。8,897 赞高居榜首，下载计数仍在早期阶段。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,508 | 165,300 | meta-models 发布的 30B 多模态模型，支持图像与文本对话。1,508 赞和 16.5 万下载，是当日最受关注的多模态 LLM 之一。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,917 | 1,997,541 | MiniMax H3 视频生成模型，支持文本/图像条件生成视频。近 200 万下载，是当日视频生成方向的核心模型。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 850 | 207,830 | Lightricks 的 LTX 2.5 视频扩散模型，支持 image-to-video、text-to-video 等模式。单文件发布便于本地集成。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 645 | 63 | MiniMax 音乐生成模型，通过文本提示生成音乐/音频。下载量仍低，属于新发布状态，是音频生成方向的高潜候选。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 493 | 149,865 | MiniMax-H3 的 Turbo 变体，面向 image-to-video 加速生成。14.9 万下载说明视频生成社区对低延迟版本有明确需求。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,316 | 11,768,622 | ComfyUI 官方组织发布的 MiniMax-H3 单文件模型，可直接接入 ComfyUI 流程。下载量超 1,176 万，是当日下载量最高的条目。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,669 | 1,974,635 | Moonshot 的 Kimi-K3 多模态模型，带有 feature-extraction 和 compressed-tensors 标签。10,669 赞位居热门榜第一。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 380 | 1,366 | NVIDIA 的 11B 语音对话模型，面向语音交互和 Agent 场景。研究社区关注度正在积累。 |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 159 | 10,106 | Anima 2.9B 文生图扩散模型，diffusion-single-file 且兼容 ComfyUI。适合轻量级本地图像生成。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 339 | 0 | Kijai 维护的 MiniMax-H3 ComfyUI 适配/节点仓库。339 赞，是 ComfyUI 视频工作流生态的重要组件。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次前 30 中无典型代码/数学/医疗/嵌入专用模型，故该分类省略。

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 755 | 0 | Unsloth 制作的 Qwen3.8-27B GGUF 量化版，便于本地推理。755 赞但当前下载计数为 0，属于刚上架/待放量状态。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 414 | 596,774 | Muse-Glimmer-30B 的 GGUF 版本，保留多模态能力。近 60 万下载，说明多模态 GGUF 本地部署需求旺盛。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 269 | 228,364 | meta-models 发布的 Muse-Glimmer-30B GGUF 版本。22.8 万下载，与 Unsloth 版互为补充。 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 288 | 0 | Qwen 官方 FP8 量化版，降低 27B 多模态模型部署显存需求。属于刚上架状态，预计会随原版热度快速放量。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,015 | 2,891,524 | 社区微调 Qwen3.6-27B 的 GGUF，主打风格化/Uncensored 与多重新技术标签。289 万下载，是社区微调+量化结合的热门案例。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 183 | 9,334 | Qwen 官方 FP8 量化版，针对 2.4T 总参/95B 激活 MoE 模型。9,334 下载，适合在有限显存中部署大 MoE。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 257 | 119,572 | NVIDIA 官方 NVFP4 4-bit 量化，将 Lightning 30B-A3B 转为更低显存占用格式。11.9 万下载，高效推理需求明显。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 741 | 0 | 针对 MiniMax-H3 Turbo 的 LoRA 微调，用于 text-to-video。741 赞，属于社区期待较高的视频生成微调资源。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 176 | 9,060 | fal 出品的人物写实 LoRA，用于提升 MiniMax-H3 视频生成中的人像真实感。9,060 下载，是垂直风格化微调的代表。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 318 | 112,975 | MiniMax-H3 Turbo LoRA 的 ComfyUI 适配版。11.3 万下载，说明 LoRA 已深度嵌入 ComfyUI 视频工作流。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 309 | 473 | 社区微调的 MiniMax-H3 视频模型，采用 PinkCherry 风格并具备 Apache-2.0 许可。展示出 H3 风格定制的多样化空间。 |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 155 | 136,774 | Unsloth 将 MiniMax-H3 视频模型转为 GGUF，配合 stable-diffusion.cpp 使用。13.7 万下载，显示量化与视频生成的交集正在扩大。 |

---

## 生态信号

当日生态的关键信号：一是 Qwen 3.8 与 MiniMax-H3 形成了“原版发布—官方量化—社区 GGUF/LoRA/ComfyUI 适配”的高效裂变路径，头部模型的衍生件下载量常常超过原版；二是榜单全部为开源权重，闭源 API 模型未见上榜，说明开放模型在开发者社区仍占主导。Unsloth、DavidAU 等第三方加速/量化工程显著降低了部署门槛，视频模型也开始进入 GGUF 与 LoRA 阶段。

---

## 值得探索

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：点赞最高的多模态重器之一，适合做视觉语言对话与推理评测；同时可关注其 FP8/GGUF 版本以评估部署成本。
- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：当日热门榜第一，compressed-tensors 与 feature-extraction 标签使其在压缩、嵌入与多模态高效推理方向上值得深入研究。
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：视频生成生态的核心枢纽，已有海量 ComfyUI、LoRA 和 GGUF 变体；想搭本地视频生成工作流，建议从它和 Comfy-Org 单文件版入手。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*