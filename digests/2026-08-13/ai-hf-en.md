# Hugging Face Trending Models Digest 2026-08-13

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-13 09:48 UTC

---

# 🤖 Hugging Face Trending Models Digest — 2026-08-13

## 1. Today's Highlights

MiniMax-H3 has become the week's clearest ecosystem hub: official weights, ComfyUI ports, GGUF quantizations, and multiple LoRAs all trended together, and Comfy-Org's packaging alone has accumulated 10.36M downloads. Moonshot's Kimi-K3 produced the strongest hype signal with 10,596 weekly likes, while DeepSeek-V4-Flash and Qwen's 2.4T-A95B MoE kept the LLM focus on efficient-scale sparse models. Nvidia countered with Nemotron-3.5 Lightning quantizations and a dedicated voice-chat model. Unsloth and community creators quickly shipped GGUF, FP8, and NVFP4 versions of the biggest releases, lowering the barrier to local deployment. Overall, open-weight multimodal and efficient MoE models dominate trending this week.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 653 | 1,012 | A massive sparse MoE text-generation model from Qwen with 2.4T total parameters and 95B active parameters. It stands out for pushing open-weight scale-efficiency and is an early but highly watched release for frontier research. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,279 | 1,431,587 | DeepSeek's latest "Flash" LLM, optimized for fast text generation with the deepseek_v4 architecture. It already has 1.43M downloads, indicating strong community adoption and production interest. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 594 | 116,640 | A compact 2.6B text-generation model from LiquidAI in the LFM2 family, built for efficient edge/local inference. It is trending as a high-quality small-model option with 116k downloads. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 200 | 1,292 | A tiny variant in inclusionAI's Ling-3.0 multilingual/foundation model line, using a hybrid efficient architecture. It attracts attention for its efficiency-first design despite being an early release. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 348 | 3,868 | A preview text-generation model from DeepGrove using a mixture-of-experts causal-LM design. It is gaining attention as a new MoE entrant and is one of the more intriguing debut models this week. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 321 | 10,052 | A larger "flash" variant of inclusionAI's Ling-3.0 family, focused on conversational text generation. It shows the lab's push toward hybrid efficient architectures and has already seen meaningful adoption. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 123 | 22,279 | Nvidia's efficient 30B MoE LLM with only 3B active parameters, in BF16 precision. It is notable for production-friendly inference characteristics and is one of two precision variants trending this week. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,351 | 121,042 | A 30B image-text-to-text conversational model that handles mixed image and text inputs. It is one of the most-liked multimodal foundation releases this week, with 121k downloads. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,770 | 1,605,940 | MiniMax's flagship image-text-to-video generation model, supporting text-to-video and image-to-video workflows via diffusers. It is a breakout video-generation release with 1.6M downloads and a rapidly growing ecosystem. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 615 | 57,287 | A flexible single-file diffusion video model supporting image-to-video, text-to-video, and video-to-video. It is trending for its multi-condition video synthesis and editing capability. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,273 | 10,365,210 | Comfy-Org's packaged single-file distribution of MiniMax-H3 for ComfyUI workflows. It is the most-downloaded MiniMax-H3 asset on the Hub, with over 10.3M downloads. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 429 | 91,455 | A faster Turbo variant of MiniMax-H3 for image-to-video, also supporting t2v and r2v via diffusers. It is a central community implementation for efficient MiniMax-H3 inference. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,596 | 1,871,575 | Moonshot's K3 model is tagged as image-text-to-text with compressed-tensor and feature-extraction support. It tops the weekly likes chart with 10.6k likes and 1.87M downloads, making it one of the most hyped open multimodal releases on this list. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 296 | 0 | Kijai's ComfyUI compatibility repository for MiniMax-H3, likely containing workflow or node adaptations rather than a standalone model. It is trending because ComfyUI integration is pivotal for practical video-generation use. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 219 | 0 | An experimental companion repository from Kijai for MiniMax-H3, tagged for regional access rather than direct Hub distribution. It signals ongoing active development of alternative MiniMax-H3 pipelines. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 359 | 1,164 | A dedicated voice-chat model from Nvidia's Nemotron Labs, packaged for spoken-dialogue use cases. It is trending as a specialized speech model in a week otherwise dominated by vision and video. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | ---: |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 709 | 0 | A community LoRA for MiniMax-H3 Turbo, aimed at text-to-video and audio-video workflows. It has earned 709 likes despite 0 downloads, suggesting strong early interest or pre-release visibility. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 375 | 352,023 | Unsloth's GGUF quantization of Muse-Glimmer-30B, enabling local CPU/GPU inference of the multimodal model. It is highly popular with 352k downloads, showing strong demand for efficient multimodal deployment. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,972 | 2,793,115 | A community GGUF fine-tune of Qwen3.6-27B with uncensored/heretic roleplay tuning. It is one of the most viral community LLM quantizations this week, with 2.79M downloads. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 248 | 136,783 | meta-models' own GGUF release of Muse-Glimmer-30B, complementing Unsloth's quantization with a vanilla GGUF package. It includes references to the underlying research papers and has 136k downloads. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 312 | 0 | A ComfyUI-pruned LoRA adapter for MiniMax-H3-Turbo, packaged for node-based workflows. It is part of the rapidly expanding MiniMax-H3 fine-tuning ecosystem, with 312 likes but no downloads yet. |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 291 | 324 | A community fine-tune/variant of MiniMax-H3 for text-to-video, branded "PinkCherry" and licensed Apache-2.0. It demonstrates the breadth of community customization around H3, with 291 weekly likes. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 218 | 44,859 | Nvidia's NVFP4-quantized version of the Nemotron 3.5 Lightning 30B-A3B, reducing memory footprint for deployment. It offers a high-efficiency alternative to the BF16 release and is already being widely tested. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 151 | 4,692 | A LoRA for MiniMax-H3 aimed at realistic people and human-subject video generation. It stands out as a professional/studio-quality LoRA in the H3 ecosystem, with 4.7k downloads. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 669 | 268,762 | Unsloth's GGUF version of DeepSeek-V4-Flash-0731, built for local inference of the Flash model. It has 268k downloads, indicating strong demand for accessible DeepSeek weights. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 145 | 652 | A PEFT/LoRA module that rewrites prompts specifically for MiniMax-H3 video workflows. It is trending as a practical, lightweight add-on for improving H3 prompt quality. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 142 | 111,222 | A GGUF-packaged MiniMax-H3 variant for text-to-video and image-to-video, with stable-diffusion.cpp support. It extends the H3 toolchain to local/quantized environments and has 111k downloads. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 142 | 4,000 | The FP8-quantized version of Qwen's 2.4T-parameter MoE model, reducing serving memory and inference cost. It is trending alongside the original release, making the massive model more deployment-friendly. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 479 | 0 | A ComfyUI-integrated INT8 fine-tune of Qwen3-VL-32B using "Heretic/H3" style tuning for uncensored multimodal chat. It illustrates the merging of Qwen3-VL with community fine-tuning culture, with 479 likes but no downloads yet. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 185 | 3,184 | A community multimodal fine-tune built on the Qwen3.5 MoE backbone, supporting image-text-to-text conversation. It is trending as a new custom model in the Qwen MoE family, with 185 likes and 3,184 downloads. |

## 3. Ecosystem Signal

MiniMax-H3 is the strongest ecosystem signal this week: it is not just a single model but a full family with official diffusers weights, a Comfy-Org single-file distribution, a Turbo variant, multiple LoRAs/adapters, and even GGUF quantization for stable-diffusion.cpp. This shows that a successful open-weight video model can quickly generate a complete toolchain around it. On the LLM side, MoE/active-parameter designs are dominant: Qwen's 2.4T-A95B, NVIDIA's 30B-A3B, Kimi-K3's compressed tensors, and DeepGrove's MoE preview all push sparse and efficient inference. Open-weight labs from China — Qwen, DeepSeek, MiniMax, and Moonshot — are driving much of the volume, while NVIDIA remains a major US frontier contributor. Quantization and fine-tuning activity are immediate and aggressive: Unsloth shipped GGUF versions of Muse-Glimmer, DeepSeek-V4-Flash, and MiniMax-H3, while FP8 and NVFP4 variants reduce serving costs. Community LoRAs and ComfyUI packs are the primary distribution mechanism for video customization, making Hugging Face the center of the open model ecosystem.

## 4. Worth Exploring

- **moonshotai/Kimi-K3** — The highest-liked model this week by a wide margin. Its compressed-tensor tags, image-text-to-text capability, and 1.87M downloads make it a fascinating case study for open-weight multimodal efficiency.
- **MiniMaxAI/MiniMax-H3 + Comfy-Org/MiniMax-H3** — MiniMax-H3 represents the most complete open video-generation ecosystem on the Hub. Studying the official weights, the ComfyUI port, and the accompanying LoRAs reveals how an open video model becomes a production-ready toolchain.
- **Qwen/Qwen3.8-2.4T-A95B** — An extreme MoE scale play: 2.4T total parameters with only 95B active. It is still early in adoption, but it will likely shape the next wave of efficient open-weight LLM serving.

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*