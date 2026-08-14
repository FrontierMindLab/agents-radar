# Hugging Face Trending Models Digest 2026-08-15

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-14 23:00 UTC

---

## 1. Today's Highlights

Kimi-K3 and Qwen3.8-27B lead the language-side trend with 10.7K and 8.9K weekly likes, respectively, even though Qwen’s main repo currently shows zero downloads — a sign of early hype and rapid quantization releases. DeepSeek’s V4 Flash (1.6M downloads) and MiniMax’s H3 video family (over 11.7M ComfyUI downloads) show that generation and conversational MoE models remain the main pull. The week is defined by MiniMax-H3 derivatives — LoRAs, ComfyUI ports, Turbo variants, and GGUF quantizations — alongside official FP8/NVFP4 releases from Qwen and Nvidia. Unsloth’s GGUF conversions are strongly represented across Qwen, Muse-Glimmer, and MiniMax-H3, confirming that local inference is a core driver of model adoption.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,669 | 1,974,635 | The week’s most-liked model, an image-text-to-text conversational system with compressed-tensors support. Its 1.97M downloads and top like count show Moonshot AI’s pull in efficient multimodal LLMs. |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 8,897 | 2 | Newest Qwen3.8 family member for image-text-to-text dialogue. Despite only 2 downloads at snapshot, 8.9K likes signal heavy anticipation and rapid derivative work (GGUF/FP8). |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,380 | 1,606,491 | DeepSeek’s fast V4 text-generation model. 1.6M downloads make it one of the most deployed open-weight LLMs in this snapshot. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,508 | 165,300 | Multimodal conversational 30B model from Meta’s Muse/Glimmer line. 165K downloads and multiple GGUF quantizations show quick ecosystem uptake. |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 910 | 3,832 | Massive sparse MoE text-generation model with 2.4T total parameters and 95B active. Its FP8 sibling is already in circulation, pointing to enterprise-scale inference demand. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 614 | 124,172 | Liquid AI’s 2.6B text-generation foundation model. 124K downloads indicate healthy demand for small, efficient LLMs. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 430 | 245 | Higher-capability “Pro” DeepSeek-V4 checkpoint released 0813. It currently has few downloads but is positioned as the performance-focused sibling to V4 Flash. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 234 | 2,283 | Tiny MIT-licensed model using a custom `bailing_hybrid` architecture. Its small size and permissive license make it one to watch for edge/on-device experiments. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 141 | 34,137 | Nvidia’s 30B MoE with 3B active parameters in BF16. This version is the base for fine-tuning and higher-precision inference; 34K downloads confirm enterprise interest. |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 135 | 11 | Preview of an image-text-to-text model focused on note-oriented conversation. Low download count, but its 135 likes suggest curiosity about productivity-focused multimodal LLMs. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,917 | 1,997,541 | Flagship open image-text-to-video model from MiniMax, using diffusers and safetensors. With nearly 2M downloads, it is the central node for a huge ecosystem of LoRAs, GGUF, and ComfyUI ports. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,316 | 11,768,622 | ComfyUI-packaged single-file version of MiniMax-H3. Its 11.77M downloads make it the most-downloaded item on this entire trend list, underscoring ComfyUI as the primary H3 interface. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 850 | 207,830 | Lightricks’ single-file diffusion model for image-to-video and text-to-video. 207K downloads show cross-tool adoption; supports video-to-video and image-text-to-video as well. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 645 | 63 | New text-to-music generation model from MiniMax, built on diffusers. Only 63 downloads so far but 645 likes, making it a likely next breakout in audio generation. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 493 | 149,865 | Turbo variant of MiniMax-H3 focused on faster image-to-video generation. 150K downloads and support for t2v/i2v/r2v make it an important community acceleration layer. |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 159 | 10,106 | A 2.9B text-to-image diffusion model available as a ComfyUI single-file. 10K downloads and the “anima” tag point to a lightweight alternative for anime/illustration workflows. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 380 | 1,366 | Nvidia’s voice-chat model, roughly 11B, with multiple arXiv references and English training. 1.4K downloads and 380 likes show interest in specialized speech interfaces rather than mainstream text LLMs. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,015 | 2,891,524 | Custom GGUF fine-tune of Qwen3.6-27B with uncensored and “Heretic” style tags. 2.89M downloads makes it the most downloaded community fine-tune in this snapshot; strong roleplay/local-model demand. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 755 | 0 | Unsloth’s GGUF conversion of the brand-new Qwen3.8-27B. It has 755 likes but zero downloads at snapshot, so watch for it to become the default local Qwen3.8 option. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 741 | 0 | LoRA adapter for MiniMax-H3 Turbo, with text-to-video plus audio-video tags. It has 741 likes and zero downloads yet, suggesting it was just announced or distributed outside HF. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 414 | 596,774 | Unsloth’s GGUF of Meta’s Muse-Glimmer-30B. 596K downloads make it the most-used Muse-Glimmer quantization and a major enabler for local multimodal inference. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 339 | 0 | Kijai’s ComfyUI packaging/helper for MiniMax-H3. 339 likes with zero direct downloads — important because it supports the broader ComfyUI H3 workflow. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 318 | 112,975 | ComfyUI-ready LoRA for MiniMax-H3 Turbo. 113K downloads show it is a preferred adapter for controllable text-to-video in ComfyUI. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 309 | 473 | Community MiniMax-H3 text-to-video fine-tune released under Apache-2.0. Only 473 downloads but 309 likes; demonstrates rapid creative fine-tuning around H3. |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 288 | 0 | Official FP8 quantization of Qwen3.8-27B for lower memory serving. Zero downloads at snapshot but 288 likes; likely to be used widely once endpoints update. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 269 | 228,364 | First-party GGUF release of Muse-Glimmer-30B. 228K downloads and arXiv references make it a credible baseline for running Meta’s vision-language model locally. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 257 | 119,572 | NVFP4-quantized Nemotron Lightning 30B-A3B from Nvidia. 120K downloads show strong adoption of the fast, low-bit enterprise LLM. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 183 | 9,334 | Official FP8 version of Qwen’s 2.4T-parameter MoE text model. 9.3K downloads; key to deploying the 95B-active model at scale. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 176 | 9,060 | LoRA designed to improve realism of people in MiniMax-H3 video generation. 9K downloads makes it a go-to community enhancement for character-heavy videos. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 155 | 136,774 | GGUF quantization of MiniMax-H3 aimed at local video generation via stable-diffusion.cpp. 136K downloads underline demand for running video models outside heavy GPU stacks. |

## 3. Ecosystem Signal

Open-weight releases continue to define Hugging Face momentum. Qwen, DeepSeek, MiniMax, Meta, and Nvidia all shipped official checkpoints this week, and community quantization is amplifying reach. The MiniMax-H3 family is the clearest signal: a single base video model generated a full platform of LoRAs, ComfyUI ports, Turbo variants, and GGUF files; the Comfy-Org single-file checkpoint alone passed 11.7M downloads. On the LLM side, efficiency is split between large MoE designs (Qwen 2.4T-A95B, Nemotron 30B-A3B, DeepSeek V4) and tiny models (LiquidAI 2.6B, Ling-3.0-tiny). The high like counts for Kimi-K3 and Qwen3.8-27B suggest the next frontier is multimodal chat. FP8/NVFP4 official quantizations and Unsloth’s GGUF ecosystem also show that local and cost-efficient inference is now a default expectation, not an afterthought.

## 4. Worth Exploring

- **Kimi-K3** — With 10.7K likes and 1.97M downloads, it is the week’s clearest signal for compressed, multimodal LLMs. Studying it can reveal how Moonshot balances vision-language ability with deployment efficiency.
- **Comfy-Org/MiniMax-H3** — The 11.77M-download ComfyUI checkpoint is the fastest way to test open video generation. Its surrounding ecosystem (LoRAs, Turbo, GGUF) also makes it an ideal case study in generative model proliferation.
- **Qwen/Qwen3.8-27B-FP8** — Although it has zero downloads yet, the base repo’s 8.9K likes and official FP8 packaging make it a promising entry point for evaluating Qwen3.8 multimodal chat locally.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*