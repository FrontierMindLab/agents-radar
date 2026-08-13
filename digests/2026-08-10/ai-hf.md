# Hugging Face 热门模型日报 2026-08-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-10 04:40 UTC

---

# Hugging Face 热门模型日报（2026-08-10）

## 1. 今日速览

视频生成赛道由 MiniMax-H3 引爆，本周 30 个热门模型中有近三分之一是 MiniMax-H3 的衍生生态（ComfyUI 适配、LoRA、GGUF、NVFP4 量化等）。语言模型领域，Kimi-K3、DeepSeek-V4-Flash 与 GLM-5.2 表现亮眼，其中 GLM-5.2 下载量已近 249 万。百度 Unlimited-OCR 作为专用模型下载达 289 万次，显示垂直场景同样具备极强吸引力。社区微调与量化活动异常活跃，Unsloth、NVFP4、INT8 等多格式版本密集出现。整体来看，开源权重模型完全主导榜单，国产模型家族与社区二次创作力量尤为突出。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 2,962 | 868,576 | DeepSeek 新一代对话模型，面向文本生成与多轮对话场景。下载量达 86.8 万，是本周最受关注的开源 LLM 之一。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,409 | 1,456,459 | Kimi 系列最新模型，支持图像文本联合理解，并具备特征提取能力。周点赞超 1 万，是榜单中热度最高的模型之一。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 457 | 85,651 | LiquidAI 的液态神经网络语言模型，2.6B 参数量主打高效推理。下载量稳步增长，是前沿液态 AI 架构的代表性开源作品。 |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 290 | 1,089 | DeepGrove 预览版文本生成模型，采用 mixture-of-experts 架构。作为新玩家预览版本，已吸引早期技术社区关注。 |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 247 | 4,747 | 采用 Bailing 混合架构的对话模型，面向高强度多轮交互场景。主打 Flash 级低延迟响应，是新锐厂商的代表作。 |
| [zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2) | zai-org | 4,915 | 2,488,397 | 智谱最新 MoE 语言模型，支持超长文本生成与对话。下载量近 249 万，是本周下载量最高的语言模型之一。 |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 126 | 482 | 基于 Qwen3.5 MoE 的多模态对话模型，支持图文理解与对话。下载量尚小，但架构设计值得持续关注。 |
| [SyzygyResearch/Mach-1-Additive-35B](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 106 | 1,589 | 35B 参数实验性模型，采用 ternary/additive 网络设计。技术路线新颖，具备较强的学术研究价值。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,278 | 35,295 | MiniMax 最新视频生成旗舰模型，支持图像+文本到视频。凭借 3,278 周点赞领跑视频生成赛道，并带动大量社区衍生工作。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,090 | 4,947,943 | ComfyUI 官方适配版 MiniMax-H3，提供开箱即用的视频生成工作流。单模型下载量近 495 万，说明视频生成工具链需求极为旺盛。 |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 266 | 543 | NVIDIA 推出的语音对话模型，面向实时语音交互场景。集成多篇语音与对话方向论文成果，技术潜力值得关注。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 239 | 6,117 | MiniMax-H3 的 Turbo 变体，支持图像到视频、参考到视频等任务。主要面向追求更高推理速度的生成场景。 |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 236 | 0 | Kijai 制作的 ComfyUI 适配模型，帮助用户在 ComfyUI 中直接使用 MiniMax-H3。是社区工作流中的重要组件。 |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 232 | 0 | 社区自制的 MiniMax-H3 适配版本，支持文本到视频生成。以 Apache-2.0 授权开放，体现社区活跃的技术共创。 |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 171 | 0 | Kijai 推出的实验性 MiniMax-H3 适配，聚焦新功能与技术验证。适合开发者提前体验视频生成的前沿能力。 |
| [Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b) | Audio8 | 333 | 13,132 | Audio8 推出的语音合成预览模型，0.6B 参数主打自然声音生成。是本周音频/TTS 方向唯一进入热门榜的模型。 |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,060 | 487,171 | 黑森林实验室的经典文本到图像模型，基于 diffusers 架构。周点赞 1.4 万高居全榜第一，是图像生成领域的事实标准之一。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 3,989 | 2,889,062 | 百度推出的全场景 OCR 大模型，支持图像文字识别与特征提取。下载量近 289 万，是垂直场景中数据表现最亮眼的模型之一。 |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 213 | 5,651 | Mistral AI 推出的 3B 参数安全护栏模型，用于输入输出内容审核与安全过滤。适合接入 vLLM 等推理栈作为安全层。 |
| [Kwaipilot/KAT-Coder-V2.5-Dev](https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev) | Kwaipilot | 553 | 18,574 | 基于 Qwen3.5 MoE 架构的代码生成模型，面向开发者场景。兼顾图像理解与代码能力，是本周代码垂直赛道代表。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 552 | 0 | MiniMax-H3-Turbo 的 LoRA 适配器，支持轻量化定制与快速微调。适合希望按场景扩展视频生成能力的开发者。 |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 630 | 188,761 | Unsloth 官方出品的 GGUF 量化版，方便本地与边缘设备部署。下载量近 19 万，是 DeepSeek 生态中的高人气衍生模型。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,812 | 2,390,692 | 基于 Qwen3.6 的社区微调 GGUF 模型，采用无审查风格训练。下载量达 239 万，是社区二次创作中流量极高的代表性作品。 |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 422 | 0 | 面向 ComfyUI 流程的 Qwen3-VL 32B 视觉语言模型微调版，INT8 量化。主要用于 MiniMax-H3 工作流中的文本编码与语义理解。 |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 233 | 0 | 专为 ComfyUI 优化的 MiniMax-H3-Turbo LoRA 适配器，已完成剪枝优化。适合在 ComfyUI 中快速部署视频生成定制能力。 |
| [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs) | realrebelai | 188 | 160,747 | MiniMax-H3 的 GGUF 量化集合，支持多档位量化选择。下载量超 16 万，是本地部署 MiniMax-H3 的热门方案。 |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 176 | 68,468 | LFM2.5 官方 GGUF 量化版，适配 llama.cpp 本地推理。适合低资源环境部署液态 AI 语言模型。 |
| [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot) | Abiray | 155 | 511,473 | MiniMax-H3 的多精度量化适配版本，覆盖 NVFP4/INT4/INT8。下载量超 51 万，是社区高频采用的推理优化版本。 |
| [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 144 | 0 | MiniMax-H3 工作流中 Qwen3-VL 文本编码器的 NVFP4 量化版。面向 ComfyUI 与高效显存使用场景。 |
| [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF) | LuffyTheFox | 456 | 396,282 | 基于 Qwen3.6 35B-A3B 的社区微调 GGUF 模型，无审查风格并支持图像文本理解。下载量近 40 万，属于 Qwen 衍生生态中的高热度作品。 |

## 3. 生态信号

本周最显著的信号是 MiniMax 系列的“全家桶”现象：从原版模型到 ComfyUI 封装、LoRA、GGUF、NVFP4 量化，衍生链条非常完整，说明视频生成模型的工程化工具链正成为竞争焦点。语言模型方面，DeepSeek、Qwen、Kimi、GLM 等国产开源家族占据主导地位，闭源模型未进入榜单，开源权重继续引领创新。量化与微调活动极其活跃，Unsloth 等第三方机构与社区开发者同步跟进；但大量 “uncensored/heretic” 风格微调也带来内容安全与治理挑战，值得业界审慎对待。

## 4. 值得探索

以下 3 个模型最值得尝试：

1. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 本周视频生成生态的核心原点，带动大量衍生工具链。适合研究最新视频生成能力，并复用周边生态快速落地应用。
2. **[zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)** — 下载量近 249 万的 MoE 语言模型，代表国产开源模型最新水平。适合验证新一代混合专家架构在长文本与对话场景中的实际表现。
3. **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)** — 下载量近 289 万的专用 OCR 模型，场景价值极高。适合快速接入中英文等文档文字识别业务，是垂直模型中的现象级作品。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*