# Hugging Face Trending Models Digest 2026-08-10

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-10 04:40 UTC

---

# Hugging Face Trending Models Digest — 2026-08-10

## 1. Today’s Highlights

As of 2026-08-10, the trending list is dominated by the **MiniMax-H3 video-generation ecosystem**—ComfyUI packs, Turbo LoRAs, and quantized variants have turned a single model family into the most active corner of Hugging Face. On the language side, **DeepSeek-V4-Flash-0731**, **GLM-5.2**, and **Kimi-K3** account for millions of downloads, with Kimi-K3’s compressed-tensor multimodal approach earning more than 10k likes. **Baidu’s Unlimited-OCR** also stands out as a specialized model with mass adoption, while **FLUX.1-dev** remains the perennial image-generation favorite. Community momentum is increasingly driven by GGUF quantization and “uncensored”/“Heretic” fine-tunes built on Qwen-based MoE models.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 2,962 | 868,576 | DeepSeek’s Flash-tier conversational LLM optimized for fast text generation. With 868k downloads and official Unsloth GGUF support, it is one of the most deployed open-weight LLMs this week. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 457 | 85,651 | A compact 2.6B liquid model for efficient text generation. Its popularity reflects interest in small, fast LLMs for edge and local deployment, supported by a first-party GGUF release. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 290 | 1,089 | A preview MoE causal language model from deepgrove. It is early-stage but notable for a new mixture-of-experts design and lightweight footprint. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 247 | 4,747 | A conversational LLM built on InclusionAI’s hybrid “bailing_hybrid” architecture. It uses custom code and safetensors, making it an interesting choice for developers evaluating newer non-Transformer architectures. |
| [zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2) | zai-org | 4,915 | 2,488,397 | The latest GLM-5.2 text-generation MoE model from Z.ai. Its 2.49M downloads and 4.9k likes place it among the most significant open-weight LLM releases on the Hub. |
| [SyzygyResearch/Mach-1-Additive-35B](https://huggingface.co/SyzygyResearch/Mach-1-Additive-35B) | SyzygyResearch | 106 | 1,589 | A 35B research model built on Qwen3.5 MoE, exploring ternary and additive weight methods. It is more of an architecture-research artifact than a production chat model, but worth watching for efficiency trends. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,278 | 35,295 | Official MiniMax-H3 image-text-to-video model with Diffusers support. It anchors a large ecosystem of Turbo, LoRA, ComfyUI, and quantized variants, making it the week’s central video-generation model. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,090 | 4,947,943 | Comfy-Org’s single-file distribution of MiniMax-H3 for ComfyUI. With nearly 5 million downloads, it is the most-downloaded entry in this list and the default way many users run MiniMax-H3. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,409 | 1,456,459 | Kimi-K3 is Moonshot AI’s multimodal image-text-to-text model with compressed-tensor support. Its 10.4k likes make it the second-most-liked model on the list, signaling strong interest in efficient multimodal LLMs. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 266 | 543 | Nvidia’s 11B voice-chat model for speech-based interaction. It is early in adoption but carries strong lab backing and multiple arXiv references. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 239 | 6,117 | A community Turbo variant of MiniMax-H3 for image-to-video, text-to-video, and related tasks. It targets faster inference while keeping Diffusers compatibility. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 236 | 0 | Kijai’s ComfyUI companion repository for MiniMax-H3. It receives likes but no direct downloads, indicating it serves as a workflow/integration hub for local video generation. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 232 | 0 | A community text-to-video fine-tune of MiniMax-H3 with Apache-2.0 and endpoints compatibility. It is an example of stylistic/community customization on top of MiniMax-H3. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 171 | 0 | Kijai’s experimental build of MiniMax-H3 for ComfyUI. It is tracked by video-generation enthusiasts for early access to new capabilities. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 126 | 482 | A multimodal image-text-to-text MoE model based on Qwen3.5 MoE. Despite only 482 downloads, it is an interesting early fusion of vision-language and MoE architectures. |
| [Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b) | Audio8 | 333 | 13,132 | A compact 0.6B text-to-speech preview from Audio8, built on ArkTTS. It is trending as one of the few dedicated TTS models in this list and offers a lightweight option for speech generation. |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,060 | 487,171 | FLUX.1-dev remains the most-liked model in the entire list, with 14k likes, and continues to attract downloads for text-to-image generation. Its staying power makes it a reference point for open image models. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 213 | 5,651 | A 3B safety/guardrail model from Mistral, built for the vLLM and Mistral-common stack. It trends as a lightweight moderation and security layer for LLM deployments. |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 3,989 | 2,889,062 | Baidu’s Unlimited-OCR image-text-to-text model for document understanding. With 2.89M downloads and 3,989 likes, it is one of the strongest specialized OCR releases on the Hub. |
| [Kwaipilot/KAT-Coder-V2.5-Dev](https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev) | Kwaipilot | 553 | 18,574 | A code-specialized model built on Qwen3.5 MoE and trained for coding plus image-text-to-text. Its 553 likes reflect developer interest in MoE-based coding assistants. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 552 | 0 | LoRA adapter for MiniMax-H3-Turbo text-to-video workflows. It aims to inject Turbo-style efficiency into MiniMax-H3 video generation. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 422 | 0 | An uncensored/experimental Qwen3-VL 32B variant with INT8 ConvRot targeting ComfyUI and MiniMax-H3 text-encoder use. It is part of the “Heretic” fine-tune wave around H3 pipelines. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,812 | 2,390,692 | A GGUF uncensored fine-tune of Qwen3.6-27B with a long feature-name lineage. 2.39M downloads show huge demand for locally runnable, uncensored MoE/attention models. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 630 | 188,761 | Unsloth’s official GGUF pack for DeepSeek-V4-Flash-0731. It is the standard quantization route for running DeepSeek’s Flash model on local hardware. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 233 | 0 | A pruned MiniMax-H3-Turbo LoRA packaged for ComfyUI. The adapter is ready to use in local video workflows, making it a practical community add-on. |
| [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs) | realrebelai | 188 | 160,747 | GGUF quantizations of Comfy-Org/MiniMax-H3. 160k downloads underscore how many users need low-VRAM GGUF versions for video generation. |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 176 | 68,468 | First-party GGUF release of LiquidAI’s 2.6B model. It brings LFM2.5 to llama.cpp users and broadens local/edge LLM deployment. |
| [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot) | Abiray | 155 | 511,473 | A heavily quantized MiniMax-H3 video model with NVFP4, INT4, and INT8 ConvRot variants. 511k downloads make it the most popular quantized MiniMax-H3 entry. |
| [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 144 | 0 | An NVFP4 text-encoder variant of Qwen3-VL 32B for MiniMax-H3 pipelines. It combines the “Heretic” fine-tune style with quantization for ComfyUI use. |
| [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF) | LuffyTheFox | 456 | 396,282 | A GGUF MoE fine-tune of Qwen3.6-35B-A3B with uncensored Hermes-style training. 396k downloads indicate strong appetite for locally runnable large MoE chat models. |

## 3. Ecosystem Signal

The strongest momentum is around a few model families: **MiniMax-H3** for video, **Qwen3.5/3.6 MoE** as a base for code and community fine-tunes, and **DeepSeek / GLM / Kimi** as flagship open-weight LLMs. Open-weight releases are clearly winning the Hub’s attention—every leading entry is downloadable, and no proprietary API-only model appears among the top 30. Quantization and fine-tuning activity is enormous: GGUF is now standard for local LLMs, while NVFP4/INT4/INT8 conversion is becoming the norm for video models such as MiniMax-H3. The “uncensored” and “Heretic” naming cluster around Qwen3-VL/3.6 and ComfyUI workflows shows continued demand for fewer-restriction conversational and image-text models, even as new safety layers like Shieldstral also enter the ecosystem.

## 4. Worth Exploring

- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** – The highest-liked new multimodal model in the digest, with 10,409 likes and compressed-tensor support. It is a strong study object for efficient vision-language inference and next-generation MoE design.
- **[deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)** – With 868k downloads plus an official Unsloth GGUF release, it represents the current “fast but capable” LLM recipe. Worth benchmarking for latency-sensitive applications.
- **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)** – 2.89M downloads proves it solves a real, large-scale problem. Trying it offers a practical comparison to general image-text-to-text models for document-heavy workloads.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*