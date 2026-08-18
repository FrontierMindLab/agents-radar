# Hugging Face Trending Models Digest 2026-08-19

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-18 23:00 UTC

---

# Hugging Face Trending Models Digest — 2026-08-19

## 1. Today's Highlights

This week is defined by the Qwen3.8 ecosystem: the 27B multimodal base model is the most-liked release, while GGUF, FP8, NVFP4, MLX, and uncensored variants account for a huge share of downloads. MiniMax is the other clear winner, with its H3 video model and Music3 audio model generating some of the largest download counts — especially the ComfyUI-packaged MiniMax-H3, which surpassed 14.6M downloads. Moonshot's Kimi-K3 and DeepSeek's V4 Flash/Pro show that frontier labs are still publishing major open-weight LLMs. Quantization and community fine-tuning are the dominant ecosystem activity, with many derived formats out-downloading their original checkpoints.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,064 | 11,212 | A 2.4T-parameter MoE text-generation model with ~95B active parameters. It is trending as the frontier-scale Qwen text model, though its size keeps downloads modest. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 602 | 30,985 | DeepSeek's Pro-tier V4 text-generation model from the 0813 release. It is part of DeepSeek's rapid V4 cadence, drawing attention from users who want a high-performance open-weight LLM. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,524 | 2,123,462 | A low-latency Flash variant of the DeepSeek V4 family. With 2.1M downloads, it is the most-downloaded pure text LLM on this week's list. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 321 | 269,372 | NVIDIA's 30B MoE language model with 3B active parameters, shipped in NVFP4. It stands out as an efficient, NVFP4-native open-weight LLM from a major US lab. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 319 | 9,990 | A tiny hybrid text-generation model using inclusionAI's Bailing architecture. It is notable for being a small custom-code model amid a week of large-scale releases. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,108 | 665,513 | The week's most-liked release: a 27B multimodal model for image-text-to-text and conversation. It anchors the entire Qwen3.8 ecosystem of quantizations and fine-tunes. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 958 | 11,745 | A text-to-music generation model from MiniMax. It is trending alongside MiniMax's video models, marking a push into open-weight music generation. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,219 | 503,632 | A versatile video model supporting text-to-video, image-to-video, and video-to-video. Its 503K downloads reflect demand for multi-mode video editing and generation. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,680 | 384,097 | A 30B multimodal image-text-to-text model from the meta-models org. It is one of the fastest-rising non-Qwen multimodal releases, with 384K downloads and 1.7K likes. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,143 | 2,855,539 | MiniMax's flagship H3 model for text-to-video and image-to-video. With 2.9M downloads and 4.1K likes, it is the leading original video-generation model this week. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 608 | 300,279 | A community Turbo variant of MiniMax-H3 targeting faster image-to-video generation. It is popular among users who want H3-quality video with lower latency. |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 246 | 24,893 | A 2.9B text-to-image diffusion model distributed as a single ComfyUI-ready file. It is trending as a lightweight image generation option for local workflows. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,827 | 2,226,898 | Moonshot AI's Kimi-K3 multimodal model with compressed-tensor support and feature extraction. It is the second most-liked model of the week and shows strong open-weights momentum for the Kimi family. |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 219 | 1,120 | A preview model from dots-studio for image-text-to-text note processing. It is a niche multimodal release gaining early attention for specialized document/note workflows. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,424 | 14,641,908 | The ComfyUI-packaged single-file version of MiniMax-H3. It is the most-downloaded item on the entire list, with 14.6M downloads, making ComfyUI a major distribution channel. |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 177 | 285,444 | ComfyUI-packaged MiniMax-Music-3 for node-based music generation. It has already reached 285K downloads, extending ComfyUI's ecosystem into audio. |
| [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) | LiquidAI | 173 | 9,101 | Liquid AI's 3B vision-language model based on the LFM2.5 architecture. It is worth watching as a compact multimodal model for efficient/edge inference. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,251 | 0 | A community repository that fixes Qwen chat-template definitions, aimed at MLX and Jinja compatibility. It is not a full model, but its 1,251 likes with zero downloads highlights a widespread Qwen3.5 template pain point. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 1,811 | 3,561,466 | Unsloth's GGUF quantization of Qwen3.8-27B for efficient local inference. It is the most-downloaded Qwen3.8 GGUF variant this week at 3.56M downloads. |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 561 | 741,011 | Official FP8 version of Qwen3.8-27B. It is already more downloaded than the BF16 base, indicating strong preference for memory-efficient multimodal deployment. |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 526 | 45,465 | An abliterated "uncensored" FP8 variant of Qwen3.8-27B. It combines FP8 efficiency with refusal-free behavior, attracting attention from local/uncensored LLM users. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 407 | 558,767 | A GGUF uncensored build of Qwen3.8-27B with MTP support for llama.cpp. Its 559K downloads show strong demand for locally runnable, less-restricted Qwen variants. |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 261 | 523,919 | Unsloth's NVFP4 quantized version of Qwen3.8-27B. It offers a Blackwell-friendly alternative to FP8, with 524K downloads showing rapid adoption. |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 243 | 0 | An MLX-format uncensored Qwen3.8-27B for Apple Silicon. It has 0 downloads but 243 likes, signaling early community interest in Mac-based multimodal inference. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 225 | 13,344 | Official FP8 quantization of Qwen's 2.4T-parameter MoE text model. It makes the massive checkpoint more practical to serve, though downloads remain limited at 13K. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,140 | 3,020,528 | A heavily customized Qwen3.6-27B GGUF fine-tune for uncensored/fiction-style generation with MTP. It is one of the most-downloaded GGUF models here, reflecting the massive community appetite for roleplay-oriented LLMs. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 195 | 27,745 | An "aggressive" uncensored GGUF fine-tune of Qwen3.8-27B with MTP. It is notable for preserving multimodal/vision abilities in an uncensored local format. |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 263 | 0 | A community fine-tune of MiniMax-H3 aimed at adult/uncensored video generation. It has no downloads yet but is ranking strongly, showing demand for unconstrained video models. |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 171 | 12,854 | A community GGUF quantization of Qwen3.8-27B tuned for the "Ridge" release. It provides another local-inference option among the many Qwen3.8 GGUF variants. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 481 | 787,276 | Unsloth's GGUF conversion of Muse-Glimmer-30B. With 787K downloads, it is the leading efficient distribution for this multimodal model. |

## 3. Ecosystem Signal

Qwen has become the center of gravity: Qwen3.8-27B is the most-liked model, and its derived artifacts account for a large share of the Fine-tunes table. This is a familiar pattern — strong base models spark a long tail of GGUF/FP8/NVFP4 releases — but the scale is exceptional, with multiple variants exceeding 500K downloads. MiniMax is successfully pivoting from a single video model to an open ecosystem: H3, a Turbo variant, a ComfyUI package, and a community fine-tune all rank this week, showing that video-generation weights are now a platform. Open-weight models from Chinese labs (Qwen, DeepSeek, Moonshot, MiniMax) dominate, while NVIDIA is the notable Western entry with Nemotron. Proprietary models are absent; the competition has shifted to serving, packaging, and fine-tuning open weights. The heavy activity around uncensored/abliterated variants and MTP-enabled GGUFs also indicates that local inference and uncensored use cases are major adoption drivers.

## 4. Worth Exploring

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — The highest-liked release this week and the anchor of a massive quantization/fine-tuning ecosystem. Studying it shows what a successful open multimodal base model looks like in 2026.
- [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) — With 14.6M downloads, this ComfyUI package is the week's most-downloaded artifact. It is worth examining as a case study in how packaged open weights can become a distribution platform.
- [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) — The second most-liked model with 10.8K likes and 2.2M downloads. Its compressed-tensor and feature-extraction tags point to an interesting efficiency-first multimodal design.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*