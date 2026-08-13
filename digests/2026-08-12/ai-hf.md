# Hugging Face 热门模型日报 2026-08-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-12 04:07 UTC

---

# Hugging Face 热门模型日报（2026-08-12）

## 今日速览

今日榜单由 MiniMax-H3 视频生成家族统治，官方模型、ComfyUI 适配、LoRA 与 GGUF 衍生品密集上榜，且 Comfy-Org 版本下载量高达 679 万次，生态链非常完整。多模态理解领域竞争激烈，moonshotai 的 Kimi-K3 以 10,533 点赞登顶全榜，Meta 的 Muse-Glimmer-30B 也获得高度关注。DeepSeek-V4-Flash-0731 下载量已突破 100 万次，并快速出现 unsloth 的 GGUF 量化版本。量化与微调活动异常活跃，LoRA、GGUF、INT8 等衍生模型占据榜单近半席位，显示社区对低成本部署和个性化的强烈需求。OCR 方向的 baidu/Unlimited-OCR 同样表现出色，下载量达 289 万次，是生产力工具型模型的代表。

## 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,165 | 1,048,685 | DeepSeek 最新一代 Flash 版本，主打高效文本生成与对话能力。下载量已超百万，是当前最受关注的通用 LLM 之一。 |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 555 | 93,668 | Liquid AI 推出的 2.6B 小型生成模型，面向低资源部署和实时交互。点赞/下载比高，适合作为轻量级 LLM 基线。 |
| [maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 337 | 2,049 | deepgrove 发布的混合专家（MoE）文本生成模型，主打稀疏激活下的高性能。预览版本引发对新一代 MoE 架构的讨论。 |
| [Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 308 | 6,148 | inclusionAI 的 Ling 3.0 快闪版，支持文本生成与对话，采用 bailing_hybrid 自定义架构。以高效率和灵活性进入周榜。 |
| [Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 162 | 0 | Ling 3.0 的 Tiny 版本，进一步压缩参数规模，面向边缘侧部署。与 Flash 版共同构成 Ling 3.0 系列分层生态。 |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 143 | 19,250 | NVIDIA 的新一代 MoE 模型，30B 参数但激活仅 3B，并采用 NVFP4 低比特格式。适合在 NVIDIA 硬件上高速推理。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | --- |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,600 | 59,368 | MiniMax 的第三代视频生成模型，支持图像/文本到视频生成。点赞和下载均居视频类前列，是今日榜单的核心引擎。 |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,116 | 0 | Meta 推出的 30B 多模态语言模型，支持图像文本到文本的对话理解。本周刚发布即获千赞，尚在早期分发阶段。 |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,533 | 1,565,484 | 月之暗面的 Kimi K3 多模态模型，支持图像/文本联合理解与生成。以全榜最高点赞和百万级下载印证其社区热度。 |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 354 | 20,376 | 基于 MiniMax-H3 的 Turbo 版本，支持图像/视频/视频到视频生成。由 lightx2v 适配，提供更快的视频生成管线。 |
| [MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,219 | 6,798,796 | Comfy-Org 发布的 MiniMax-H3 单文件版本，可直接接入 ComfyUI 视频生成工作流。下载量达 679 万次，是社区使用最广的视频模型之一。 |
| [MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 282 | 0 | Kijai 为 MiniMax-H3 制作的 ComfyUI 支持文件，方便本地部署与节点化调用。虽是辅助资源，但代表社区工具的快速跟进。 |
| [MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 197 | 0 | Kijai 发布的 MiniMax-H3 实验性权重版本，尝试非标准采样或结构变体。适合进阶用户探索视频生成的新可能性。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 282 | 39 | Lightricks 的新一代视频模型，支持图像/文本/视频间的多模态转换。作为独立视频生成模型获得社区关注。 |
| [NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 331 | 653 | NVIDIA 的语音聊天模型，11B 参数，面向语音交互与对话场景。代表大模型在实时语音多模态方向的应用。 |
| [BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 171 | 708 | endless-frontier 发布的视觉语言模型，基于 Qwen3.5-MoE 架构。定位于图像文本理解与多模态对话。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | --- |
| [Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 232 | 6,769 | Mistral 推出的 3B 安全审核模型，专门用于检测和过滤有害内容。可视为 LLM 生态中的“安全专用组件”。 |
| [Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,023 | 2,892,191 | 百度的 OCR 专用模型，支持图像到文本的识别与特征提取。下载量超 289 万，是文档数字化场景的爆款工具。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | --- |
| [MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 656 | 0 | 针对 MiniMax-H3-Turbo 的 LoRA 微调，用于增强特定风格或指令能力。尽管尚未开放下载，但点赞数反映了社区对扩展视频模型的强烈兴趣。 |
| [Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,907 | 2,521,093 | 社区微调的 Qwen3.6 27B 模型，主打“uncensored/heretic”风格，并提供 GGUF 格式。下载量超 252 万，显示个性化模型的市场需求。 |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 313 | 0 | unsloth 为 Meta 的 Muse-Glimmer-30B 提供的 GGUF 量化版本。帮助用户在本地以较低资源运行这一多模态模型。 |
| [MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 283 | 0 | 将 MiniMax-H3-Turbo LoRA 适配到 ComfyUI 的模型文件。方便 ComfyUI 用户直接加载使用，是社区生态横向整合的典型。 |
| [Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 466 | 0 | 对 Qwen3-VL-32B 进行 INT8 量化并适配 ComfyUI，同时加入“Heretic”风格调整。显示视觉语言模型也向低比特+工具化发展。 |
| [PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 270 | 0 | 社区微调的 MiniMax-H3 文本到视频模型，面向特定风格生成。Apache-2.0 许可，并兼容 Hugging Face 推理端点。 |
| [Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 208 | 0 | Meta 官方同步发布的 Muse-Glimmer-30B GGUF 版本。与 FP16 权重互补，方便不同硬件环境下快速部署。 |
| [DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 654 | 207,990 | unsloth 对 DeepSeek-V4-Flash 的 GGUF 量化版，支持 llama.cpp 等本地推理框架。发布即获 20 万+ 下载，是当前最热门的量化模型之一。 |
| [LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 205 | 111,942 | LiquidAI 自家提供的 LFM2.5-2.6B GGUF 量化版本。方便在 llama.cpp 生态中直接运行，下载量可观。 |
| [MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 134 | 353 | 用于重写提示词的 LoRA，专门优化 MiniMax-H3 的输入质量。通过提词改写提升视频生成效果，体现微调的精细化方向。 |
| [MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 120 | 0 | fal 发布的 MiniMax-H3 写实人物 LoRA，聚焦真实感人物视频生成。与一站式平台结合，降低个性化视频生成门槛。 |
| [MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 114 | 781 | unsloth 为 MiniMax-H3 视频模型提供的 GGUF 量化版本。探索将 GGUF 应用于视频生成，是跨模态与量化技术结合的前沿尝试。 |

## 生态信号

- **MiniMax-H3 家族形成完整生态**：从官方权重、ComfyUI 单文件、Turbo 版、LoRA、提示词重写器到 GGUF 量化，衍生品链条覆盖部署、微调、精调全流程，是本周最明显的“家族式”霸榜现象。
- **多模态模型成为顶流**：Kimi-K3、Muse-Glimmer、Unlimited-OCR 等视觉语言/理解模型同时获得高赞和高下载，说明行业焦点正从纯文本转向图文统一模型。
- **开源权重与量化同步流行**：DeepSeek、Meta、NVIDIA 等持续发布可商用权重，而社区立即跟进 GGUF/INT8 量化，甚至 NVIDIA 官方直接提供 NVFP4 低比特模型，低硬件门槛部署成为硬需求。
- **“个性化和去审查”微调需求显著**：多款 “Uncensored/Heretic” 风格的社区微调模型进入榜单，反映出用户对风格定制和内容自由度的强烈兴趣。

## 值得探索

1. **[Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：本周点赞第一（10,533），下载超 156 万。作为多模态理解模型，其压缩张量技术值得深入研究，也是国产开源模型的标杆案例。
2. **[MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**：视频生成生态的核心，官方+Comfy-Org 下载合计近 700 万次。建议围绕该模型体验从 ComfyUI 到 LoRA 的完整工作流。
3. **[DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)**：下载量超过 100 万的通用 LLM，且已有 unsloth 提供的 GGUF 版本。适合作为本地部署和对比评测的基线模型。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*