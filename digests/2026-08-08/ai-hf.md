# Hugging Face 热门模型日报 2026-08-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-07 16:38 UTC

---

# 🤗 Hugging Face 热门模型日报（2026-08-08）

## 一、今日速览

今日榜单呈现出“视频生成引领、语言模型走量、量化微调爆发”的格局。MiniMax-H3 视频模型成为绝对焦点，官方版带动 Comfy-Org 单文件版（下载超 314 万）及多款 LoRA/GGUF/INT4 衍生版本。语言模型方面，DeepSeek-V4-Flash 系列官方与量化版合计下载超 340 万，GLM-5.2 也以 240 万下载紧随其后。多模态方向，Kimi-K3 获赞 1.02 万，FLUX.1-dev 以 1.4 万赞登顶全榜。社区侧，Qwen3.x 的“无审查”微调和多精度量化活动最为密集。

## 二、热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 2,721 | 702,709 | DeepSeek-V4-Flash 的 0731 迭代版，面向多轮对话的文本生成模型。单周下载超 70 万，是本周语言模型核心新作之一。 |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 366 | 77,973 | LiquidAI 推出的 2.6B 小参数量语言模型，主打高效推理。轻量参数配合 7.7 万+ 下载，适合端侧与实验性部署。 |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 222 | 686 | deepgrove 的预览版因果语言模型，采用 mixture-of-experts 混合专家设计。当前处于预览阶段，性能仍有待社区验证。 |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 201 | 3,065 | inclusionAI 的 flash 版对话模型，面向高吞吐对话场景。标签含 custom_code，可能集成自定义注意力或混合架构实现。 |
| [GLM-5.2](https://huggingface.co/zai-org/GLM-5.2) | zai-org | 4,884 | 2,430,330 | 智谱 GLM 系列最新版本，MoE 架构。下载量超 240 万，是基础模型层最热门的国产开源模型之一。 |
| [DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) | deepseek-ai | 2,058 | 2,577,975 | DeepSeek-V4-Flash 官方基础版，文本生成对话模型。下载量 257 万，高于 0731 迭代版，说明基础版本仍是社区首选。 |
| [Qwen3.6-35B-A3B-Escha-W2](https://huggingface.co/EschaLabs/Qwen3.6-35B-A3B-Escha-W2) | EschaLabs | 234 | 3,622 | EschaLabs 基于 Qwen3.6-35B-A3B 的 MoE 微调版本。35B 总参数量、3B 激活的稀疏架构，是社区关注的高效率实验。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 2,902 | 18,112 | MiniMax 官方视频生成模型，支持文生视频、图生视频与图文生视频。它带动大量衍生量化与 LoRA 作品，是本周视频生成绝对焦点。 |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,261 | 1,308,186 | 月之暗面 Kimi 系列新一代多模态模型，支持图像+文本输入。周点赞 1 万+，居全榜第二，热度与采用度双高。 |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 217 | 359 | NVIDIA 推出的语音对话模型，11B 参数。当前下载量较低，但大厂背书使其在语音交互方向具备关注价值。 |
| [Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b) | Audio8 | 303 | 12,633 | Audio8 发布的轻量级 TTS 模型（0.6B），支持文本转语音。预览版阶段即获 303 赞，是音频生成方向新玩家。 |
| [Mage-VL](https://huggingface.co/microsoft/Mage-VL) | microsoft | 301 | 456,140 | 微软推出的多模态视觉语言模型，支持图像+文本输入。下载量 45 万+，已在多模态应用中获得稳定采用。 |
| [Inkling-Small](https://huggingface.co/thinkingmachines/Inkling-Small) | thinkingmachines | 333 | 25,340 | thinkingmachines 的小尺寸多模态对话模型。支持图像+文本输入，面向通用对话与多模态理解场景。 |
| [FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,023 | 512,841 | 黑森林实验室开源文生图模型。周点赞 1.4 万为全榜第一，下载 51 万+，是图像生成阵营的常青树。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 3,951 | 2,836,694 | 百度开源的 OCR 模型，支持图像到文本识别。下载量 283 万，位列全榜第三，反映 OCR 需求持续旺盛。 |
| [Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 178 | 2,480 | Mistral 推出的 3B 安全护栏模型，用于生成内容审查。体量小、功能专一，是安全方向稀缺新作。 |
| [KAT-Coder-V2.5-Dev](https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev) | Kwaipilot | 529 | 17,399 | 基于 Qwen3.5-MoE 的代码生成模型（Dev 版）。支持 image-text-to-text，可在编码任务中结合视觉上下文。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 910 | 3,139,920 | 为 ComfyUI 适配的 MiniMax-H3 单文件版本。下载量 314 万为全榜最高，显示 ComfyUI 是社区使用视频模型的主要入口。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 577 | 161,253 | unsloth 对 DeepSeek-V4-Flash-0731 的 GGUF 量化版。方便 llama.cpp 等本地推理工具直接调用。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,689 | 2,217,339 | Qwen3.6 的社区微调 + GGUF 量化版本，带 heretic/uncensored 标签。下载量 220 万+，是“社区缝合”路线代表。 |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 388 | 0 | MiniMax-H3 的 Turbo LoRA 适配器。下载量尚为 0，属刚发布的新适配器，效果待社区验证。 |
| [Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 371 | 0 | Qwen3-VL 32B 的 ComfyUI INT8 量化版本。融合 Heretic 社区标签与 INT8 量化封装。 |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 171 | 0 | MiniMax-H3 Turbo LoRA 的 ComfyUI 打包版。为 ComfyUI 用户直接调用而优化。 |
| [MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs) | realrebelai | 166 | 87,870 | MiniMax-H3 的 GGUF 量化合辑。下载量 8.7 万+，方便低显存环境本地运行视频模型。 |
| [Kroma](https://huggingface.co/lodestones/Kroma) | lodestones | 221 | 0 | Krea 2 的 LoRA 模型，面向 text-to-image。可为 krea2 文生图工作流增加 LoRA 控制。 |
| [LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 138 | 31,489 | LiquidAI 官方的 LFM2.5-2.6B GGUF 版本。面向 llama.cpp 本地部署与量化推理。 |
| [Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF) | LuffyTheFox | 421 | 332,992 | Qwen3.6-35B-A3B 的社区微调 + GGUF 版本。“uncensored + MoE”组合，下载量 33 万+。 |
| [Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot) | Abiray | 122 | 452,420 | MiniMax-H3 的多精度量化版本，覆盖 NVFP4/INT4/INT8。下载量 45 万+。 |
| [Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 117 | 0 | Qwen3-VL 32B 的 NVFP4 量化版，供 ComfyUI 作为文本编码器使用。 |
| [Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF) | huihui-ai | 99 | 102,798 | DeepSeek-V4-Flash 的 abliterated（移除安全对齐）+ GGUF 量化版。下载量 10 万+，反映去审查微调的稳定需求。 |

## 三、生态信号

本周榜单释放出明确趋势。**MiniMax-H3 与 DeepSeek-V4-Flash** 是目前生态联动最强的两个家族：官方权重发布后，量化（GGUF/NVFP4/INT4）、LoRA 和 ComfyUI 适配版迅速跟上，形成完整部署链条。**开源权重完全主导榜单**，几乎所有模型均开放下载，并直接支持 transformers、diffusers 等通用框架，闭源模型无热度。量化与微调活动正从文本模型扩散到视频/多模态模型，ComfyUI 单文件版下载量最高；同时 **abliterated / uncensored 标签**持续出现在 Qwen3.x、DeepSeek-V4 微调版中，显示社区对审查规避的稳定需求。

## 四、值得探索

- **[MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：本周生态热度最高的视频生成模型。可从官方权重入手，研究其到 ComfyUI/GGUF/INT4 的完整部署链路，并跟进 LoRA 微调空间。
- **[Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：周点赞超 1 万的多模态新模型。压缩张量与特征提取标签暗示其在高效检索或推理上的潜力，值得深入测试。
- **[Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B)**：3B 安全审查小模型，适合为生成流程加装合规护栏。作为安全模型方向的稀缺参考，值得关注。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*