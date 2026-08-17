# Hugging Face Trending Models Digest 2026-08-18

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-17 23:00 UTC

---

# Hugging Face Trending Models Digest — 2026-08-18

## 1. Today's Highlights

Hugging Face activity is dominated by the **Qwen3.8 ecosystem**: the 27B multimodal model and its GGUF/FP8/NVFP4 quantizations are everywhere, with unsloth's GGUF already at 2.7M downloads. **Moonshot AI's Kimi-K3** is another major signal, collecting 10.8K likes, while **MiniMax-H3** video models power a large ComfyUI ecosystem that has surpassed 14M downloads. DeepSeek's V4 Flash/Pro checkpoints and NVIDIA's Nemotron Lightning MoE reinforce the trend toward efficient open-weight LLMs. Uncensored fine-tunes and task-specific LoRAs continue to be a significant community driver.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,041 | 9,465 | A massive sparse MoE language model from Qwen, with 2.4T total parameters and 95B active. It tops Qwen's text-generation lineup for high-capacity open-weight inference, though smaller quantized versions are also trending. |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 573 | 25,006 | DeepSeek's latest V4 Pro text-generation model, followed by the community for frontier-level reasoning/chat performance. It pairs with the Flash variant for scaling across different latency budgets. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,496 | 1,978,298 | A fast, high-volume DeepSeek V4 text-generation checkpoint with ~2M downloads. Its popularity signals strong demand for efficient, open-weight DeepSeek alternatives. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 305 | 6,266 | A tiny hybrid-architecture language model (bailing_hybrid) released under MIT by InclusionAI. It is early in adoption but notable for compact, permissively licensed design. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) | nvidia | 169 | 69,833 | A 30B-parameter MoE LLM with 3B active parameters from NVIDIA, in BF16. It offers strong reasoning with low active-parameter count for efficient serving. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 653 | 147,270 | A compact text-generation model from LiquidAI built on liquid/state-space architectures. It's trending as a small efficient alternative to dense transformers. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 10,697 | 415,039 | The flagship open Qwen3.8 multimodal chat model, handling image-text-to-text tasks and conversational interaction. With 10.7K likes and broad ecosystem support, it anchors the Qwen3.8 wave. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,103 | 465,529 | A diffusion single-file model for image-to-video and text-to-video generation from Lightricks. It's trending for fast, high-quality video synthesis and easy single-file deployment. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,661 | 334,099 | A 30B image-text-to-text conversational model from meta-models. It gained rapid traction with more than 330K downloads, suggesting strong interest in open multimodal assistants. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 900 | 10,375 | MiniMax's dedicated text-to-music model using diffusers, producing music from prompts. It extends MiniMax's generative media family to audio with a compact style. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,086 | 2,403,238 | A high-impact image-text-to-video generation model with 4K+ likes and 2.4M downloads. It is the base for a large ecosystem of Turbo versions, LoRAs, and ComfyUI integrations. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 583 | 264,351 | A Turbo variant of MiniMax-H3 for image-to-video workflows, packaged for diffusers. It offers faster/cheaper generation while retaining H3 compatibility. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,800 | 2,163,953 | A leading open multimodal model from Moonshot AI, with the highest likes in this list (10.8K). Its compressed-tensors and feature-extraction tags point to efficient representation learning and multimodal understanding. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,402 | 14,015,769 | A ComfyUI-ready diffusion single-file packaging of MiniMax-H3, with 14M downloads. This is the most-downloaded entry in the trending set, making video generation accessible in local workflow tools. |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 233 | 23,202 | A compact 2.9B text-to-image diffusion single-file model for ComfyUI. It's trending for being a lightweight, easily runnable anime-image generator. |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 205 | 633 | A preview image-text-to-text model from dots-studio with the dots3_note tag. It is early-stage but signals incremental iteration in small multimodal assistants. |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 166 | 256,988 | ComfyUI packaging of MiniMax Music3 for local text-to-music generation. It brings the audio model to ComfyUI's node-based ecosystem. |
| [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) | LiquidAI | 162 | 6,816 | A vision-language version of LiquidAI's LFM2.5, handling image-text-to-text at 3B scale. Its small footprint and liquid architecture make it an interesting efficient multimodal option. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,209 | 0 | A developer utility that provides corrected Jinja chat templates for Qwen models, optimized for MLX usage. It is not a generative model, but it's trending because proper chat templates are essential for Qwen3.x/3.5 deployments. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 1,623 | 2,727,609 | Unsloth's GGUF quantization of Qwen3.8-27B for llama.cpp and local inference. With 2.7M downloads, it is the most-used local format for the flagship Qwen model. |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 527 | 495,646 | Official FP8 quantized version of Qwen3.8-27B, reducing memory footprint while preserving multimodal chat capabilities. It's a go-to choice for inference on FP8-capable GPUs. |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 429 | 15,812 | An abliterated, uncensored FP8 variant of Qwen3.8-27B from orcarouter. It appeals to users wanting reduced safety refusal in a quantized multimodal package. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 296 | 357,701 | GGUF uncensored fine-tune/quantization of Qwen3.8-27B for llama.cpp. Includes MTP support, making it one of the few uncensored Qwen3.8 options easy to run locally. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 470 | 755,125 | Unsloth's GGUF conversion of the Muse-Glimmer-30B multimodal model. It brings a 30B image-text-to-text assistant to CPU/edge via llama.cpp. |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 237 | 378,177 | Unsloth's NVFP4 quantization of Qwen3.8-27B for NVIDIA platforms. It targets low-latency inference with reduced precision while keeping the base model's conversational capabilities. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,119 | 3,033,928 | A heavily modified, uncensored GGUF fine-tune based on Qwen3.6-27B with MTP support. Its eye-catching name and 3M downloads show a strong community appetite for uncensored creative/roleplay models. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 307 | 231,271 | NVIDIA's NVFP4-quantized Nemotron 3.5 Lightning 30B-A3B, offering a low-bit serving format for a 3B-active MoE LLM. It's built for efficient inference on NVIDIA hardware without a full BF16 footprint. |
| [Qwen/Qwen3.8-2.4T-A95B-FP8](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | Qwen | 219 | 12,295 | Official FP8 version of Qwen's 2.4T-parameter MoE LLM, reducing memory and compute for large-scale open-weight deployment. It keeps the A95B active-parameter routing for strong performance per token. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 243 | 18,562 | A LoRA for MiniMax-H3 focused on producing realistic people in video generation. It's trending as a targeted style/domain adapter in the H3 ecosystem. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 786 | 0 | A text-to-video LoRA for MiniMax-H3 Turbo, also handling audio-video tasks. It adds steerable behavior on top of the Turbo base with a lightweight adapter. |

## 3. Ecosystem Signal

Open-weight release momentum is concentrated in a few families: **Qwen3.8** (especially 27B and its quantized variants), **DeepSeek V4**, **MiniMax-H3** video/music, and **NVIDIA's Nemotron Lightning** MoE. Qwen and DeepSeek continue to set the pace for large-scale chat/multimodal models, while MiniMax turns audio/video generation into a commodity with ComfyUI single-file distributions.

Proprietary models are increasingly echoed by open-weight checkpoints and adapters; the trending list contains no truly closed models, only source-available or open-weight releases with permissive licenses. Quantization is the clearest cross-cutting trend: GGUF variants from unsloth log millions of downloads, while FP8 and NVFP4 formats make 27B–2.4T models practical on consumer and enterprise GPUs. Fine-tuning activity remains high in uncensored/abliterated roleplay models and task-specific LoRAs, such as MiniMax-H3 realism adapters. This signals a maturing open ecosystem where base models are quickly converted, customized, and deployed in local tools.

## 4. Worth Exploring

- **[Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — Worth studying as a state-of-the-art sparse MoE text-generation architecture. The FP8 variant shows how a 2.4T-parameter model can be made deployable.

- **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — The fastest-rising multimodal model in this list with 10.8K likes. Its compressed-tensors and feature-extraction tags suggest a novel approach to efficient multimodal representation.

- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — The center of a vibrant video-generation ecosystem, with a 14M-download ComfyUI packaging, Turbo variants, and domain LoRAs. It is the best model to study for media-centric fine-tuning and local video workflows.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*