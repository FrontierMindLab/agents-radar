# Hugging Face Trending Models Digest 2026-08-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-13 23:00 UTC

---

# Hugging Face Trending Models Digest

## 1. Today's Highlights

Video generation is the standout theme this week: MiniMax-H3 dominates with its Comfy-Org single-file build crossing 10.3M downloads, plus Turbo, LoRA, GGUF, and ComfyUI adaptations across the top 30. On the language side, DeepSeek-V4-Flash has accumulated 1.4M downloads, while Qwen's 2.4T-parameter sparse MoE and NVIDIA's Nemotron Lightning show a race toward efficient inference. Kimi-K3 leads all models in likes with 10,620, signaling strong interest in compressed multimodal models. Meta-models' Muse-Glimmer-30B also extends the image-text-to-text trend with official and unsloth GGUF quantizations. Open-weight releases from MiniMax, Qwen, DeepSeek, NVIDIA, Liquid, and inclusionAI continue to blur the line between lab and community.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 774 | 1,012 | Sparse MoE text-generation model with 2.4T total parameters and 95B active parameters. One of the largest sparse MoE releases from Qwen, still early in public adoption. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,314 | 1,431,587 | The Flash variant of DeepSeek V4, optimized for faster and more cost-effective inference. Its 1.4M downloads reflect very strong immediate demand. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 267 | 0 | The Pro variant of DeepSeek V4, positioning as the higher-capability counterpart to Flash. It currently shows no Hub downloads, suggesting a very fresh release. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 602 | 116,640 | A compact 2.6B liquid foundation model for text generation. It is trending for its efficient architecture and broad deployment-friendly size. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 216 | 1,292 | A tiny hybrid-architecture language model using the Bailing hybrid recipe with MIT license. Its custom code and small footprint make it interesting for edge research. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 352 | 3,868 | A preview causal-language model based on mixture-of-experts design. It is gaining attention as a new entrant in the open MoE space. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 129 | 22,279 | NVIDIA's 30B Lightning model with only 3B active parameters. The BF16 release is a balanced precision serving option for the Nemotron family. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 323 | 10,052 | Flash-tier conversational model in the Ling 3.0 line, built on hybrid custom-code architecture. It is trending as a fast, open-weight chat alternative. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,412 | 121,042 | An image-text-to-text conversational model from meta-models. It is drawing heavy interest because of its strong multimodal reasoning and substantial download count. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,818 | 1,605,940 | A flagship image-text-to-video generation model from MiniMax. Its 1.6M downloads make it one of the most widely adopted open video models in this list. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 712 | 57,287 | Lightricks' image-to-video and text-to-video generation model. It is trending for its versatile diffusion-single-file setup and multi-video pipeline support. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 458 | 91,455 | Turbo variant of MiniMax-H3 focused on faster image-to-video generation. It is gaining traction among users who need higher-speed video inference. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,288 | 10,365,210 | ComfyUI-ready single-file distribution of MiniMax-H3. With 10.3M downloads, it is the most downloaded model in this trending set. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,620 | 1,871,575 | Kimi-K3 is an image-text-to-text model from Moonshot with compressed-tensor support. It leads all trending models in likes, reflecting strong excitement around efficient multimodal serving. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 303 | 0 | ComfyUI-focused companion workspace for MiniMax-H3. It is useful for users integrating H3 into custom video pipelines, though it currently shows no direct downloads. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 272 | 25 | A new text-to-audio music generation model from MiniMax. It is extremely fresh, with almost no downloads yet, but its music-generation tag points to a major capability expansion. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 188 | 3,184 | A multimodal image-text-to-text conversational model built on the Qwen3.5 MoE backbone. It is trending as a community Qwen-based multimodal alternative. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 371 | 1,164 | NVIDIA's specialized 11B voice-chat model with speech and audio capabilities. It is relevant for voice-agent research and is backed by multiple arXiv references. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 725 | 0 | A LoRA adapter for MiniMax-H3 Turbo targeting text-to-video use. It is gathering likes despite no recorded downloads yet, likely due to very recent publishing. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 390 | 352,023 | Unsloth's GGUF quantization of Muse-Glimmer-30B. Its 352K downloads make it the most-used path for running Muse-Glimmer on local hardware. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,986 | 2,793,115 | A large community GGUF fine-tune based on Qwen3.6-27B. Its "uncensored" and "Heretic" tags plus 2.8M downloads show the continuing appeal of highly customized chat fine-tunes. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 257 | 136,783 | Official GGUF conversion of Muse-Glimmer-30B. It provides local quantized access to the image-text-to-text model with strong download momentum. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 229 | 44,859 | NVFP4-quantized version of NVIDIA's Nemotron Lightning 30B. It showcases NVIDIA's push toward 4-bit floating-point serving for efficient LLM inference. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 298 | 324 | A community fine-tune of MiniMax-H3 for text-to-video, Apache-2.0 licensed and endpoint-compatible. It is part of the fast-growing H3 fine-tuning wave. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 314 | 0 | A ComfyUI-compatible LoRA adapter for MiniMax-H3 Turbo. It targets seamless integration with ComfyUI video workflows, though it has no Hub downloads yet. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 157 | 4,692 | A realism-focused LoRA for MiniMax-H3, designed to improve people and human-subject rendering. It is notable for production-oriented video generation enhancements. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 157 | 4,000 | FP8 quantized version of Qwen's 2.4T-parameter sparse MoE. It offers a more deployment-friendly precision for the massive Qwen3.8 model. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 149 | 111,222 | GGUF quantization of MiniMax-H3 for video generation, supporting stable-diffusion.cpp. It brings local video-generation workflows to resource-constrained users. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 148 | 652 | A PEFT/LoRA adapter for rewriting prompts specifically for MiniMax-H3. It is a specialized helper for improving H3 video prompts. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 483 | 0 | An INT8 fine-tuned variant of Qwen3-VL-32B packaged for ComfyUI. It combines "Heretic"-style chat customization with multimodal vision and quantization. |

## 3. Ecosystem Signal

The clear momentum is around MiniMax-H3 and its ecosystem: one base video model has spawned turbo variants, LoRA adapters for realism and prompt rewriting, ComfyUI packs, and GGUF quantizations. This pattern reflects a mature open-video stack where community tooling and format conversions often matter as much as the original checkpoint. In language modeling, sparse MoE is becoming the default scaling strategy — Qwen's 2.4T-parameter model activates only 95B, and DeepSeek's Flash/Pro split targets deployment-specific trade-offs. Quantization is no longer an afterthought: official FP8, NVFP4, GGUF, and INT8 releases are appearing alongside base weights. Kimi-K3's compressed-tensor multimodal approach and Muse-Glimmer's GGUF support show that efficient serving is a core requirement for high like counts. The open-weight trend remains strong, with NVIDIA, Qwen, DeepSeek, MiniMax, Liquid, and inclusionAI all releasing downloadable checkpoints; proprietary-only releases are absent from this week's trending set.

## 4. Worth Exploring

1. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — It is the highest-liked model by a wide margin and combines image-text-to-text capabilities with compressed-tensor techniques. Worth studying for how efficient multimodal models can generate broad community interest.

2. **[Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — A 2.4T-parameter sparse MoE with only 95B active parameters is a major scaling-data point. Pairing it with the FP8 variant shows the practical path for deploying very large open-weight models.

3. **[Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3)** — With 10.3M downloads, this is the strongest signal in the ecosystem around open video generation. It is the clearest example of how ComfyUI packaging, base-model conversion, and community distribution can drive mass adoption.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*