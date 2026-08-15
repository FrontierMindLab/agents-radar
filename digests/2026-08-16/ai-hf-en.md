# Hugging Face Trending Models Digest 2026-08-16

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-15 23:00 UTC

---

# Hugging Face Trending Models Digest — 2026-08-16

## 1. Today's Highlights

Qwen3.8-27B leads this week's ranking, cementing Qwen3.8 as the most-watched open multimodal model family, while the MiniMax-H3 video ecosystem continues to expand through ComfyUI packages, LoRAs, and GGUF variants. DeepSeek's two-tier V4 release strategy is also paying off: DeepSeek-V4-Flash-0731 has already surpassed 1.79M downloads. Moonshot's Kimi-K3 remains a major community favorite with 10,722 likes and 2.1M downloads, underscoring demand for compressed multimodal systems. Quantization is now a first-class release format, with Qwen, NVIDIA, and Unsloth all shipping FP8/NVFP4/GGUF variants of leading models.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,418 | 1,798,247 | Fast, open-weight text-generation model from DeepSeek's V4 line. Its very high download count signals strong demand for efficient reasoning models in production and local deployments. |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 965 | 6,381 | Qwen's massive sparse MoE text-generation model with 2.4T total parameters and 95B active. It is trending as the high-capacity flagship of the Qwen3.8 family. |
| [LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 627 | 135,448 | A compact 2.6B liquid model for efficient text generation. Its strong download count reflects growing interest in small, deployable open-weight LLMs. |
| [DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 488 | 19,945 | Pro-tier DeepSeek V4 text-generation checkpoint focused on stronger reasoning and agentic workloads. It rounds out DeepSeek's two-tier open-weight release strategy. |
| [Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 256 | 4,832 | A tiny hybrid "bailing_hybrid" language model released under MIT. Its small footprint and custom-code implementation make it easy to test in lightweight setups. |
| [NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 150 | 62,965 | BF16 version of NVIDIA's 30B-A3B Lightning LLM, designed for efficient active-parameter inference. It serves as the non-quantized baseline for the Nemotron 3.5 line. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 9,760 | 91,917 | Multimodal image-text-to-text model from Qwen and the top weekly mover in this list. It combines open-weight Qwen3.8 language capabilities with strong vision/chat usability. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,574 | 246,454 | A 30B image-text-to-text model from meta-models. It is trending as an accessible open multimodal checkpoint with substantial download volume. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 936 | 378,439 | Lightricks video-generation model supporting image-to-video, text-to-video, and video-to-video. Its high download count shows strong interest in controllable, locally runnable video generation. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 766 | 5,079 | MiniMax's music generation model for text-to-audio tasks. It is gaining traction as an open-weight alternative in the generative music space. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,971 | 2,212,155 | MiniMax's image-text-to-video model anchoring a huge ComfyUI and LoRA ecosystem. With 2.2M downloads and many derivatives, it is one of the most influential video models on the Hub. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 513 | 211,917 | A Turbo variant of MiniMax-H3 focused on image-to-video and related generation tasks. It offers a faster, leaner path for users already in the MiniMax-H3 workflow. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,722 | 2,100,680 | Moonshot AI's image-text-to-text model with strong community traction and compressed-tensors/feature-extraction tags. It stands out as a high-impact open multimodal system optimized for efficient inference. |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 187 | 16,829 | A compact 2.9B text-to-image diffusion single-file model designed for ComfyUI. It is attracting attention as a lightweight community model for animation-style generation. |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 160 | 240 | A preview image-text-to-text model from dots-studio, tagged for dots3_note and text-generation. Early community interest centers on its note-oriented multimodal assistant angle. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 330 | 633 | A community text-to-video checkpoint built on MiniMax-H3 and released under Apache-2.0. It illustrates the breadth and speed of community fine-tuning around MiniMax-H3. |
| [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) | LiquidAI | 142 | 4,598 | LiquidAI's 3B vision-language model for image-text-to-text tasks. It extends Liquid's efficient model lineup into multimodal inputs. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 1,206 | 867,963 | Unsloth's GGUF quantization of Qwen3.8-27B for efficient local execution. With 867K downloads, it is the go-to quantized entry point for the Qwen3.8 multimodal model. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 433 | 682,188 | GGUF-quantized version of Muse-Glimmer-30B optimized for CPU/edge inference. Its download numbers show strong demand for running large multimodal models locally. |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 422 | 123,157 | Official FP8 quantized version of Qwen3.8-27B from Qwen. It preserves the image-text-to-text capabilities while significantly reducing memory requirements. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,344 | 12,790,850 | Comfy-Org's single-file MiniMax-H3 package for ComfyUI workflows. Its extraordinary 12.79M downloads make it the most-used community distribution of MiniMax-H3. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 277 | 321,049 | An additional GGUF release of Muse-Glimmer-30B directly from the meta-models account. It provides an alternative quantization path with arXiv references for reproducibility. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 270 | 170,554 | NVIDIA's NVFP4-quantized Nemotron Lightning 30B-A3B for efficient inference. It targets FP4-capable hardware while retaining the Lightning model's active-parameter efficiency. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 756 | 0 | A community LoRA for MiniMax-H3-Turbo with additional text-to-audio/audio-video conditioning tags. It is an early-release derivative with zero downloads yet, showing how fast the ecosystem publishes new variants. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,048 | 2,983,500 | A community GGUF fine-tune of Qwen3.6-27B with an uncensored, character-driven persona. Its 2.98M downloads confirm sustained demand for fine-tuned and uncensored chat models. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 192 | 12,737 | fal's Realism-People LoRA for MiniMax-H3, focused on realistic human video generation. It demonstrates platform/company contributors building specialized control LoRAs on popular video bases. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 193 | 10,745 | Official FP8 quantization of Qwen's 2.4T-A95B MoE model. It lowers the deployment cost of this enormous sparse LLM while preserving text-generation behavior. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 164 | 173,741 | GGUF packaging of MiniMax-H3 for video generation via stable-diffusion.cpp. It makes the video-generation model available in lightweight, local runtimes. |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 166 | 90,924 | Unsloth's NVFP4 quantization of Qwen3.8-27B. It targets NVIDIA FP4-capable hardware for efficient multimodal inference. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 352 | 0 | Kijai's ComfyUI integration repository for MiniMax-H3. Though it lists zero downloads, it remains a key community resource for running MiniMax-H3 in ComfyUI. |

## 3. Ecosystem Signal

Open-weight releases continue to set the pace on Hugging Face. Qwen and DeepSeek are the strongest language-model families this week, with DeepSeek V4 Flash/Pro showing that efficiency and tiered releases matter as much as raw capability. LiquidAI's small LFM2.5 models also reveal growing appetite for compact, edge-friendly LLMs. On the multimodal side, MiniMax-H3 is the clear ecosystem anchor: Comfy-Org's repackaged file has 12.79M downloads, while LoRAs, Turbo variants, and GGUF quantizations are proliferating rapidly. Quantization is now a first-class release format, as official FP8/NVFP4 variants from Qwen and NVIDIA sit alongside unsloth's GGUF and NVFP4 packages. Community fine-tunes such as DavidAU's "uncensored" Qwen GGUF remain exceptionally popular. Overall, the strongest trend is capable open-weight multimodal models plus efficient local deployment formats, with the community building a rich ecosystem around a few core base models.

## 4. Worth Exploring

- **Qwen/Qwen3.8-27B** — The top weekly mover and a strong open multimodal chat model with a full ecosystem of GGUF, FP8, and NVFP4 variants. It is the best single model to study if you want to understand current multimodal Qwen architecture and deployment choices.
- **moonshotai/Kimi-K3** — With 10,722 likes and 2.1M downloads, Kimi-K3 is a major compressed multimodal system worth studying for efficient inference and feature-extraction use cases.
- **MiniMaxAI/MiniMax-H3** — The anchor of the current open video-generation wave. Its ComfyUI packages, LoRAs, Turbo variants, and GGUF releases make it the most practical open video model to experiment with today.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*