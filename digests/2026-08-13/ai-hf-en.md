# Hugging Face Trending Models Digest 2026-08-13

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-13 01:04 UTC

---

# Hugging Face Trending Models Digest — 2026-08-13

## 1. Today's Highlights

Video generation is the dominant theme this week, with MiniMax-H3 at the center: official weights, ComfyUI ports, LoRA adapters, and GGUF quantizations together form the largest cluster in the trending list. On the language side, DeepSeek-V4-Flash-0731 leads downloads with over 1M pulls, while Moonshot's Kimi-K3 earns the highest like count of any model in this snapshot at 10,583. Qwen's massive 2.4T-parameter MoE model also generated immediate quantization activity, including an official FP8 release. NVIDIA contributed both BF16 and NVFP4 variants of Nemotron 3.5 Lightning, reinforcing the trend toward efficient sparse LLMs. A new multimodal family, Muse-Glimmer-30B, is already receiving GGUF support, signaling fast community adoption around fresh base models.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,238 | 1,048,685 | Latest DeepSeek V4 Flash text-generation model, designed for conversational inference. Its 1M+ downloads make it the most-used LLM in this snapshot. |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 500 | 978 | Massive Qwen3.8 MoE text model with 2.4T total parameters and 95B active parameters. Freshly released, it is already the basis for official and community quantizations. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 582 | 93,668 | LiquidAI's small liquid foundation model focused on efficient text generation. Its compact 2.6B size and strong adoption make it a practical deployment testbed. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 346 | 2,049 | Early-access preview of a mixture-of-experts causal language model. Its MoE architecture and preview status draw attention from researchers tracking new model designs. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 318 | 6,148 | Conversational text-generation model using inclusionAI's bailing_hybrid architecture. The "flash" tier appears optimized for low-latency chat use cases. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 116 | 15,740 | BF16 reference release of NVIDIA's Nemotron 3.5 Lightning 30B-A3B, a highly sparse transformer. It pairs with the NVFP4 version for precision-vs-efficiency comparisons. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 189 | 0 | Tiny variant of Ling 3.0 with custom bailing_hybrid code, likely aimed at edge and low-resource deployment. It has no downloads yet but is generating early community interest. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,295 | 0 | A 30B image-text-to-text conversational transformer from meta-models. It is trending as a new multimodal foundation model despite zero public downloads yet. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,716 | 83,484 | Official MiniMax H3 image-text-to-video model and the center of this week's video-generation ecosystem. High likes and downloads show broad adoption from users and downstream tool builders. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 568 | 39 | Lightricks' image-to-video diffusion model with support for text-to-video and video-to-video workflows. It is a new single-file release still early in its adoption curve. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,258 | 6,798,796 | Official ComfyUI distribution of MiniMax-H3, with the highest download count in this ranking. It is the main on-ramp for running H3 inside ComfyUI. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 411 | 20,376 | Turbo variant of MiniMax-H3 for image-, video-, and region-to-video generation. It offers a faster alternative while remaining integrated with diffusers tooling. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,583 | 1,565,484 | Moonshot's Kimi-K3 image-text-to-text model with compressed-tensors support; it is the most-liked model in this snapshot. Strong multimodal and compression focus explains its runaway popularity. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 294 | 0 | Kijai's ComfyUI implementation for MiniMax-H3, a key third-party integration. It is already drawing ecosystem attention even without significant tracked downloads. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 352 | 653 | NVIDIA's voice-chat model for spoken interaction, combining audio and language capabilities. It stands out as a specialized real-time audio-language release. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 182 | 708 | Image-text-to-text conversational model built on Qwen3.5 MoE architecture. It represents an early community-style multimodal frontier experiment. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 214 | 0 | Kijai's experimental branch of MiniMax-H3 tooling, tracking new H3 features. It signals rapid iteration around ComfyUI video workflows. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 701 | 0 | LoRA adapter for MiniMax-H3-Turbo to customize text-to-video generation. It is a community contribution adding style control without full fine-tuning. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 359 | 0 | Unsloth's GGUF quantization of the Muse-Glimmer-30B multimodal model. It provides CPU- and edge-friendly inference for the new 30B release. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,955 | 2,521,093 | Heavily stylized Qwen3.6 27B GGUF fine-tune with uncensored and creative tuning. Very high downloads despite niche branding indicate strong demand for customized local models. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 301 | 0 | Pruned adapter that makes MiniMax-H3-Turbo LoRA available in ComfyUI. It lowers the barrier for video-generation users wanting Turbo-style output. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 287 | 0 | Community fine-tune of MiniMax-H3 for text-to-video with Apache-2.0 licensing and endpoint compatibility. It is an early example of stylized H3 fine-tunes. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 240 | 0 | Official GGUF variant of Muse-Glimmer-30B from meta-models. It targets local multimodal inference with compatibility for GGUF-based tooling. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 205 | 19,250 | NVFP4-quantized version of NVIDIA's Nemotron 3.5 Lightning 30B, optimized for low-precision inference. It pairs with the BF16 release for quantization research. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 477 | 0 | INT8 convolutional-rotation fine-tune of Qwen3-VL 32B with ComfyUI integration and "Heretic" style tuning. It is an experimental niche build blending vision-language and video workflows. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 666 | 207,990 | Unsloth's GGUF conversion of DeepSeek-V4-Flash, enabling local deployment of the high-download LLM. Already at 208K downloads, it reflects strong quantization demand. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 146 | 0 | LoRA by fal for generating realistic people with MiniMax-H3 video generation. It is a focused style adapter for H3-based video workflows. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 141 | 353 | PEFT LoRA trained to rewrite prompts specifically for MiniMax-H3 video generation. It improves prompt alignment without requiring full model retraining. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 137 | 781 | GGUF conversion of MiniMax-H3 for video generation, compatible with stable-diffusion.cpp. It extends the H3 video ecosystem to local and quantized environments. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 115 | 3,851 | Official FP8 quantized release of Qwen3.8 2.4T-A95B for more efficient MoE inference. It makes frontier-scale open-weight Qwen more practical to serve. |

## 3. Ecosystem Signal

The MiniMax-H3 family is the clearest momentum story this week: roughly a third of the trending list contains official weights, ComfyUI ports, Turbo LoRAs, and GGUF quantizations, indicating a healthy open ecosystem around a single video-generation base model. DeepSeek and Qwen continue to dominate the large open-weight LLM landscape — DeepSeek-V4-Flash's 1M+ downloads and Qwen's 2.4T MoE release show appetite for both serving-scale and frontier-scale models. Kimi-K3's top like count signals that multimodal models with compressed-tensor support are becoming mainstream. Open-weight releases overshadow proprietary activity; even NVIDIA and Moonshot are publishing open downloads. Quantization and fine-tuning are the primary distribution channels for adoption: GGUF adaptations from Unsloth, NVFP4/FP8 official variants, and community LoRAs for video generation all make these models more usable in local and ComfyUI workflows. The net signal is a fast-moving, tooling-heavy ecosystem where base-model releases are quickly surrounded by compatibility, quantization, and styling forks.

## 4. Worth Exploring

- [**moonshotai/Kimi-K3**](https://huggingface.co/moonshotai/Kimi-K3) — The highest-liked model in this digest, with 10,583 likes and 1.56M downloads. Its compressed-tensors approach makes it a valuable study for efficient multimodal inference.
- [**deepseek-ai/DeepSeek-V4-Flash-0731**](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) — The most-downloaded LLM this week at over 1M pulls. It is also a great starting point for exploring GGUF deployment via Unsloth's conversion.
- [**Comfy-Org/MiniMax-H3**](https://huggingface.co/Comfy-Org/MiniMax-H3) — With 6.8M downloads, this is the most-used entry point for MiniMax-H3 in ComfyUI. It is the best model to study if you want to understand the video-generation tooling wave.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*