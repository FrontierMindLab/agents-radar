# Hugging Face 热门模型日报 2026-08-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-13 09:48 UTC

---

# Hugging Face 热门模型日报（2026-08-13）

## 今日速览

今日榜单由三股力量主导：以 Kimi-K3 为代表的多模态对话模型登顶点赞榜；MiniMax-H3 视频生成生态继续爆发，衍生出 ComfyUI 封装、Turbo、LoRA、GGUF、提示词改写等大量变体；Qwen、DeepSeek、NVIDIA 则在超大 MoE 与量化部署上集中发力。meta-models 的 Muse-Glimmer-30B 官方权重和 GGUF 版同时上榜，显示多模态模型的本地部署需求强劲。值得注意的还有 DeepSeek-V4-Flash 下载量突破 143 万、Comfy-Org 的 MiniMax-H3 封装超过 1036 万次下载，生态入口依然活跃。整体来看，社区不仅关注模型能力，也对可运行、可微调、可风格化的链路表现出极高热情。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,279 | 1,431,587 | DeepSeek V4-Flash-0731，专注文本生成与对话的高效模型。143 万下载量在语言模型类别中领跑，是当前最受关注的推理/部署选择之一。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 653 | 1,012 | Qwen 最新超大规模 MoE 文本模型，总参数 2.4T、激活参数 95B。刚发布即上榜，是旗舰级对话与文本生成基座。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 594 | 116,640 | LiquidAI 的 2.6B 小参数语言模型，主打高效推理。11.6 万下载量在轻量级模型中表现亮眼。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 348 | 3,868 | deepgrove 的预览版 MoE 文本生成模型。目前下载量不大，但其混合专家架构值得关注。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 321 | 10,052 | inclusionAI 的 Ling 3.0 flash 版，面向文本生成与对话。1 万+下载说明开发者已开始尝试其自定义架构。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 200 | 1,292 | inclusionAI 的 Ling 3.0 微型版本，使用 bailing_hybrid 自定义实现。适合作为轻量级文本生成基座进行测试。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 123 | 22,279 | NVIDIA Nemotron 3.5 Lightning 的 BF16 版本，总参 30B、激活 3B 的 MoE 模型。22k 下载反映其在企业级低延迟部署中的关注度。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,596 | 1,871,575 | 月之暗面发布的 Kimi-K3，支持图像+文本输入并输出文本，属于多模态对话模型。10,596 点赞为今日最高，187 万下载也印证其社区热度。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,770 | 1,605,940 | MiniMax 旗舰视频生成模型，支持图像/文本到视频。161 万下载和 3.77k 点赞使其成为视频生成生态的核心。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,351 | 121,042 | meta-models 的 Muse-Glimmer-30B，图像-文本到文本多模态对话模型。12.1 万下载和官方 GGUF 版本同现，说明该权重被广泛用于多模态部署与量化试验。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,273 | 10,365,210 | Comfy-Org 提供的 MiniMax-H3 ComfyUI 单文件封装/基础模型版本。下载量超 1036 万，是今日下载最高的条目，也是 ComfyUI 用户接入 MiniMax-H3 的主要入口。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 615 | 57,287 | Lightricks 的图像到视频模型，同时支持文本/视频到视频。57k 下载说明其在创意视频工具链中已有一定用户基础。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 429 | 91,455 | lightx2v 推出的 MiniMax-H3 Turbo 版，支持图像/文本/参考图到视频。91k 下载表明社区对加速版视频生成需求较强。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 359 | 1,164 | NVIDIA 的 11B 语音聊天模型，聚焦语音交互场景。虽然下载量暂低，但关联多篇论文，适合语音 AI 研究者跟进。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 296 | 0 | Kijai 为 MiniMax-H3 提供的 ComfyUI 自定义实现。目前下载显示为 0，属于实验性的 ComfyUI 工作流组件。 |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 219 | 0 | Kijai 的 MiniMax-H3 实验性封装，与 H3_comfy 类似。下载尚未开始，可视为 ComfyUI 生态的前沿试验。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 185 | 3,184 | 基于 Qwen3.5 MoE 的多模态对话模型，支持图像+文本输入。社区作者发布，展示将 Qwen 基座扩展到多模态领域的思路。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,972 | 2,793,115 | 社区作者基于 Qwen3.6 制作的 27B 融合/微调模型，并转为 GGUF，主打创意叙事与无审查风格。279 万下载使其成为微调/量化类目中热度最高条目。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 709 | 0 | MiniMax-H3-Turbo 的 LoRA 适配器，面向 text-to-video 与 audio-video 生成。下载为 0，属于早期共享的 LoRA 权重。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 669 | 268,762 | unsloth 将 DeepSeek-V4-Flash-0731 转为 GGUF，支撑本地部署。268k 下载位列量化类前茅，与原始版配合覆盖不同部署需求。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 479 | 0 | 基于 Qwen3-VL-32B 的社区微调版本，带 INT8 量化和 ComfyUI 适配。虽然暂无下载，但 479 点赞说明特定方向微调受关注。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 375 | 352,023 | unsloth 的 Muse-Glimmer-30B GGUF 量化版本。35.2 万下载说明用户希望在本机运行多模态对话模型。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 312 | 0 | drbaph 为 MiniMax-H3-Turbo LoRA 提供的 ComfyUI 剪枝/适配版本。便于直接在 ComfyUI 中使用该 LoRA 做视频生成。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 291 | 324 | 社区用户基于 MiniMax-H3 的文本到视频定制变体（PinkCherry）。下载量 324，属于特定风格定制模型。 |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 248 | 136,783 | 官方 meta-models 发布的 Muse-Glimmer-30B GGUF 版本。与 unsloth 版一同上榜，显示多模态模型社区对 GGUF 生态的快速跟进。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 218 | 44,859 | NVIDIA 官方 Nemotron-3.5-Lightning 的 NVFP4 4-bit 量化版。降低显存占用并保留高效 MoE 能力，与 BF16 版并列。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 151 | 4,692 | fal 为 MiniMax-H3 训练的写实人物 LoRA。用于增强视频中人物真实感，是视频生成垂直风格化微调的代表。 |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 145 | 652 | lightx2v 的 MiniMax-H3 提示词改写 LoRA。用于自动改进视频生成提示词，提升 MiniMax-H3 系列出片效果。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 142 | 4,000 | Qwen 官方发布的 Qwen3.8-2.4T-A95B FP8 量化版本。为大 MoE 模型提供更省显存的部署选项，与原始版配套。 |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 142 | 111,222 | unsloth 将 MiniMax-H3 转换为 GGUF，支持 stable-diffusion.cpp 等本地推理路径。111k 下载说明视频模型也开始进入本地量化部署。 |

## 生态信号

1. **MiniMax-H3 家族最势猛**：原始权重、ComfyUI 封装、Turbo 变体、多枚 LoRA、GGUF 与提示词改写器共同形成完整工具链。  
2. **大模型正快速走向 MoE + 低比特量化**：Qwen3.8 2.4T-A95B、Nemotron 3.5 Lightning、DeepSeek-V4-Flash 均有官方或社区量化版本。  
3. **开源权重仍是主流**：几乎所有上榜模型都可直接下载，且社区微调更细分，覆盖无审查、角色扮演、人物写实、提示词优化等方向。  
4. **多模态/视频生成权重开始拥抱 GGUF/INT8**，本地部署门槛正在降低。

## 值得探索

- **moonshotai/Kimi-K3**：点赞数断层第一，且带有 compressed-tensors 标签；研究其多模态能力与压缩部署结合方式很有价值。  
- **Comfy-Org/MiniMax-H3**：下载量超过千万，是探索视频生成生态的最佳入口；配合多款 LoRA/Turbo 可以低成本做风格实验。  
- **Qwen/Qwen3.8-2.4T-A95B-FP8**：超大规模 MoE 的 FP8 量化版，适合在真实 GPU 上测试超大模型的显存占用和推理吞吐。

---
*本日报由 [agents-radar](https://github.com/forever-1314/agents-radar) 自动生成。*