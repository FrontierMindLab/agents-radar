# Hugging Face Trending Models Digest 2026-08-12

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-12 04:07 UTC

---

# Hugging Face Trending Models Digest — 2026-08-12

## 1. Today's Highlights

The trending list is dominated by the **MiniMax-H3 video ecosystem**: the base model has spawned ComfyUI packages, Turbo/realism/prompt-rewriter LoRAs, and GGUF quantizations, with `Comfy-Org/MiniMax-H3` already at 6.8M downloads. On the language side, **DeepSeek-V4-Flash-0731** and **Moonshot Kimi-K3** show open-weight models commanding immediate scale—DeepSeek has 1,048,685 downloads, while Kimi leads the week with 10,533 likes. **Baidu's Unlimited-OCR** also stands out with 2,892,191 downloads, proving that specialized vertical models can generate massive adoption. Overall, the week is marked by multimodal video consolidation, heavy fine-tuning/quantization activity, and strong open-weight momentum.

---

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,165 | 1,048,685 | A flagship text-generation model from DeepSeek with strong conversational performance and a Flash-optimized design. It has achieved massive community adoption, with over 1M downloads and 3,165 likes. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 555 | 93,668 | A compact 2.6B text-generation model using Liquid AI's recurrent/liquid architecture. It is trending as an efficient alternative to dense transformers, already approaching 94k downloads. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 337 | 2,049 | A mixture-of-experts text-generation preview from deepgrove. It is drawing attention for its MoE design and early-stage availability, with 337 likes in preview status. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 308 | 6,148 | A text-generation flash model using the bailing_hybrid architecture. It offers a fast conversational checkpoint with custom code, notable for its hybrid efficiency. |
| [inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) | inclusionAI | 162 | 0 | A tiny variant of the Ling-3.0 series released under MIT license. It is interesting as a very small hybrid-model option for lightweight deployment, though downloads are currently 0. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,533 | 1,565,484 | An image-text-to-text multimodal model from Moonshot AI using compressed-tensor techniques. It has the highest like count on this list and 1.56M downloads, signaling very strong ecosystem interest. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 3,600 | 59,368 | A leading image-text-to-video generation model with diffusers and safetensors support. It serves as the base for a broad family of video LoRAs, ComfyUI packages, and GGUF quantizations. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,116 | 0 | Meta's 30B image-text-to-text conversational model built on the muse_glimmer architecture. It is trending as a high-capacity open multimodal checkpoint, although downloads have not yet accumulated. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 354 | 20,376 | A fast image-to-video diffusion variant of MiniMax-H3 with t2v, i2v, and r2v support. Its 354 likes and 20k downloads reflect adoption in lightweight video-generation workflows. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 331 | 653 | NVIDIA's 11B voice-chat model for speech-based interaction, linked to multiple arxiv papers. It trends as an open-weight voice assistant with 331 likes. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 282 | 39 | Lightricks' image-to-video and text-to-video diffusion model, also supporting video-to-video. It is a newer single-file release positioned for flexible video synthesis. |
| [endless-frontier/BigBang-v1](https://huggingface.co/endless-frontier/BigBang-v1) | endless-frontier | 171 | 708 | A qwen3_5_moe-based image-text-to-text conversational model. It combines mixture-of-experts efficiency with multimodal input, drawing 171 likes in its early release. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,023 | 2,892,191 | Baidu's OCR-capable image-text-to-text transformer model with feature-extraction support. It has become a default open OCR tool, earning 4,023 likes and 2,892,191 downloads. |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 232 | 6,769 | A 3B safety guard/moderation model from Mistral AI, built on Mistral 3 technology and compatible with vLLM. It trends as a practical alignment layer for filtering model outputs. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,907 | 2,521,093 | An uncensored GGUF fine-tune of Qwen3.6-27B with heavy community merging and "max"-style customization. It has reached 2.5M downloads, showing strong demand for uncensored local models. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,219 | 6,798,796 | A ComfyUI single-file distribution of MiniMax-H3 with base-model and fine-tune references. It is the most-downloaded MiniMax-H3 asset in this digest, with 6.8M downloads. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 656 | 0 | A community LoRA designed to adapt MiniMax-H3 Turbo for text-to-video and audio-video workflows. It has 656 likes despite zero downloads so far. |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 654 | 207,990 | Unsloth's GGUF build of DeepSeek-V4-Flash-0731 for local LLM inference. It is one of the most-used local formats for this model, with 654 likes and 208k downloads. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 466 | 0 | A specialized INT8 ComfyUI-oriented fine-tune of Qwen3-VL-32B with uncensored "heretic" tags. It targets a niche of multimodal local inference with safety restrictions removed. |
| [unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF) | unsloth | 313 | 0 | GGUF conversion of Meta's Muse-Glimmer-30B by Unsloth. It aims to bring the 30B multimodal model to llama.cpp and GGUF environments, with downloads still at 0. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 283 | 0 | A pruned MiniMax-H3-Turbo LoRA adapter packaged for ComfyUI. It provides a convenient adapter for turbo video generation inside ComfyUI. |
| [Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy) | Kijai | 282 | 0 | ComfyUI wrapper/component for MiniMax-H3 by Kijai. It complements the ComfyUI video ecosystem, with region metadata set to "us". |
| [SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3) | SexGod1979 | 270 | 0 | An Apache-2.0 fine-tune of MiniMax-H3 for text-to-video with endpoint compatibility. It represents an uncensored video-generation niche and has 270 likes. |
| [meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF) | meta-models | 208 | 0 | Official GGUF version of Muse-Glimmer-30B with arxiv references. It makes Meta's 30B multimodal model accessible through GGUF-based local inference. |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 205 | 111,942 | Official GGUF of LiquidAI's compact 2.6B text-generation model. It brings LFM2.5 to llama.cpp and has already accumulated 112k downloads. |
| [Kijai/MiniMax-H3-experimental](https://huggingface.co/Kijai/MiniMax-H3-experimental) | Kijai | 197 | 0 | Experimental ComfyUI version of MiniMax-H3 from Kijai. It tracks cutting-edge changes before stable integration into ComfyUI workflows. |
| [nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) | nvidia | 143 | 19,250 | An NVFP4-quantized version of NVIDIA's 30B-A3B Lightning text-generation model. It offers efficient inference for a 30B-class model, drawing 143 likes and 19k downloads. |
| [lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA) | lightx2v | 134 | 353 | A PEFT LoRA designed to rewrite prompts for MiniMax-H3-style video generation. It is a high-leverage utility adapter for improving video-prompt quality. |
| [fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA) | fal | 120 | 0 | A LoRA focused on realistic human subjects in MiniMax-H3 video generation. It targets realism tuning and has 120 likes with zero downloads yet. |
| [unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF) | unsloth | 114 | 781 | Unsloth's GGUF conversion of MiniMax-H3 for stable-diffusion.cpp. It extends video generation to GGUF-quantized pipelines, with 114 likes. |

---

## 3. Ecosystem Signal

Hugging Face is currently in a dual wave of video-generation consolidation and open-weight multimodal expansion. **MiniMax-H3** is the clear momentum leader: official releases, ComfyUI single-file packages, LoRAs, and GGUF quantizations all surround it, with `Comfy-Org/MiniMax-H3` already at 6.8M downloads. On the language side, **DeepSeek-V4-Flash** and **Moonshot's Kimi-K3** show that open-weight models can command enormous download counts and likes, while LiquidAI, inclusionAI, and deepgrove push new architectures such as liquid networks, bailing_hybrid, and MoE. Proprietary closed-API systems are largely absent from the trending list; the open ecosystem is winning mindshare. Quantization and fine-tuning activity is equally strong: Unsloth GGUF builds, NVIDIA's NVFP4 checkpoint, and dozens of community LoRAs—including uncensored "heretic" variants—show users want local, specialized, and sometimes safety-unlocked deployments. At the same time, safety guardrails like Mistral's Shieldstral indicate that moderation models are becoming a standard complement to open releases.

---

## 4. Worth Exploring

- **MiniMaxAI/MiniMax-H3** — The base model behind the largest ecosystem wave this week. Studying it helps make sense of the ComfyUI packages, Turbo LoRAs, and GGUF variants that currently dominate Hugging Face.
- **moonshotai/Kimi-K3** — A 10,533-like image-text-to-text model with compressed-tensor support. It is a strong candidate for multimodal evaluation and for exploring Moonshot's advanced architecture.
- **baidu/Unlimited-OCR** — A specialized OCR powerhouse with 2,892,191 downloads. It is worth trying for document intelligence and for studying how a narrow vertical model can gain broad adoption.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*