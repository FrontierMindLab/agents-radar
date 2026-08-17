# Hugging Face 热门模型日报 2026-08-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-17 23:00 UTC

---

# Hugging Face 热门模型日报

**日期：2026-08-18**

## 今日速览

Qwen3.8 系列展现强大生态统治力，官方旗舰、量化版、社区微调版同时进入热榜，其中 **Qwen/Qwen3.8-27B** 周点赞破万，成为本周最受关注的多模态模型。月之暗面推出的 **Kimi-K3** 以 10,800 点赞领跑全榜，下载量超 216 万，压缩张量技术引人注目。MiniMax H3 视频生成家族也在快速扩张，官方版、ComfyUI 单文件版、Turbo/LoRA 版等多格式并存，下载量合计极高。DeepSeek V4 系列紧随其后，Flash 版本下载已接近 200 万次，开源模型持续分流闭源市场。

## 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,041 | 9,465 | 文本生成 MoE 模型，总参数量 2.4T、激活 95B，是 Qwen3.8 系列旗舰文本模型。上榜反映社区对大规模稀疏模型的高关注度。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 573 | 25,006 | DeepSeek V4 专业版，面向高难度推理任务。作为 V4 系列最新专业升级，周内获得稳定关注。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,496 | 1,978,298 | V4 轻量快速版，在性能与速度间取得良好平衡。下载量近 200 万，是本周最热门的 DeepSeek 模型。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 169 | 69,833 | NVIDIA 的 30B 总参数、3B 激活混合专家模型 BF16 版本。主打高效推理与边缘部署，具备企业级落地潜力。 |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 653 | 147,270 | LiquidAI 的小型语言模型，采用液态神经网思路，强调参数量效率。在资源受限场景中具备明显优势。 |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 305 | 6,266 | inclusionAI 发布的小型语言模型，采用百灵混合架构、MIT 许可。刚起步但架构路线值得关注。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 10,697 | 415,039 | Qwen3.8 系列旗舰多模态模型，支持图像+文本输入和文本输出。周点赞破万，是当前 HF 最热模型之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,103 | 465,529 | 图像到视频生成模型，支持多模态视频创作。下载量超 46 万，是视频生成赛道的重要工具。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,661 | 334,099 | 30B 参数图文对话模型，具备跨模态理解能力。点赞超 1.6k、下载超 33 万，成为本周新晋热门。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 900 | 10,375 | 文本生成音乐模型，可面向音乐创作场景。在音频生成细分赛道内获得较高关注。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,086 | 2,403,238 | MiniMax 新一代视频生成模型，支持文生视频、图生视频。下载量超 240 万，生态热度极高。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 583 | 264,351 | MiniMax H3 的 Turbo 版本，通过 Diffusers 集成文本/图像/视频生成。进一步降低视频生成延迟。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,402 | 14,015,769 | 专为 ComfyUI 优化的单文件扩散模型，基于 MiniMax-H3。下载量超 1400 万，是本地视频工作流首选。 |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 233 | 23,202 | 文本到图像扩散模型，ComfyUI 单文件格式。面向动漫/艺术风格生成，适合创作者社区。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,800 | 2,163,953 | 月之暗面推出的多模态模型，支持图像与文本联合理解。周点赞全榜第一，压缩张量技术是亮点。 |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 205 | 633 | dots3 系列“笔记预览版”多模态模型。全新发布，代表新兴团队在多模态方向入场。 |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 166 | 256,988 | MiniMax Music3 的 ComfyUI 单文件版本，可无缝接入音乐生成工作流。下载超 25 万。 |
| [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) | LiquidAI | 162 | 6,816 | LiquidAI 的视觉语言小模型，3B 参数。适合多模态端侧场景，与 LFM2.5-2.6B 形成互补。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,209 | 0 | 非生成模型，而是一套修复后的 Qwen 聊天模板，适配 MLX/Jinja。解决了社区常见的模板兼容问题，高赞但尚未有下载记录。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 1,623 | 2,727,609 | Qwen3.8-27B 的 GGUF 量化版，便于 llama.cpp 本地部署。下载超 272 万，是本地运行多模态的热门选择。 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 527 | 495,646 | 官方 FP8 量化版，显著降低显存占用。保留模型能力，适配 Hopper/Ada 等现代 GPU。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 429 | 15,812 | 社区基于 Qwen3.8-27B 的“无审查”FP8 微调版。通过 abliterated 技术移除安全限制，满足特定用户需求。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 296 | 357,701 | Qwen3.8-27B 无审查 GGUF 版。下载超 35 万，为 llama.cpp 用户提供本地无限制对话选择。 |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 470 | 755,125 | Muse-Glimmer-30B 的 GGUF 量化版。下载超 75 万，让多模态模型在本地 CPU/GPU 上更容易运行。 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 237 | 378,177 | Qwen3.8-27B 的 NVFP4 量化版。针对 NVIDIA 最新硬件深度优化，平衡精度与速度。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,119 | 3,033,928 | 社区魔改 GGUF 模型，集成“Fable Fusion”等创意微调。下载超 303 万，以多样风格和 MTP 支持见长。 |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 219 | 12,295 | Qwen3.8 MoE 模型的 FP8 量化版。降低大模型推理显存门槛，适合受限环境部署。 |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 243 | 18,562 | 面向 MiniMax-H3 的写实人物 LoRA。增强视频生成中的人像真实感。 |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 786 | 0 | MiniMax-H3-Turbo 的 LoRA 适配，支持文生视频与音视频生成。新发布，尚未有下载记录。 |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 307 | 231,271 | Nemotron 3.5 的 NVFP4 量化版。专为 Blackwell 架构优化，进一步降低部署成本。 |

## 生态信号

Qwen3.8 家族势头最旺，官方、GGUF、FP8、NVFP4 以及社区“无审查”微调版同时上榜，形成完整分发矩阵。多模态生成继续占据半壁江山：MiniMax H3 通过 ComfyUI、Turbo/LoRA 快速建立视频生成生态，下载量级显著高于同榜文本模型。开源权重明显占据主导，头部模型均为开放权重，且量化/格式转换版下载量常超过原始权重，说明社区更关注易用性与本地部署。Kimi-K3 的压缩张量技术、NVIDIA 的 NVFP4 量化路线，均预示着“小显存跑大模型”仍是核心优化方向。

## 值得探索

1. **Qwen/Qwen3.8-27B**：作为 Qwen3.8 家族的核心，周点赞破万，衍生出 GGUF、FP8、NVFP4、Uncensored 等众多版本。值得深入测试其多模态理解能力，以及不同量化版本对生成质量的影响。
2. **moonshotai/Kimi-K3**：周点赞全榜第一，采用压缩张量技术。可研究其在多模态推理任务上的效率优势，以及压缩技术如何平衡体积与效果。
3. **MiniMaxAI/MiniMax-H3**：视频生成新标杆，与 ComfyUI、Music3、LoRA 等周边共同形成多模态生态。值得探索其文生视频效果，并结合 Comfy-Org 单文件版本搭建本地工作流。

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*