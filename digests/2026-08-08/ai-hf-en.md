# Hugging Face Trending Models Digest 2026-08-08

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-07 16:38 UTC

---

## Today's Highlights

Open-weight momentum is intense: DeepSeek’s V4 Flash family has accumulated millions of downloads and a large GGUF/abliterated derivative scene, while MiniMax-H3 is quickly becoming the most active video-generation ecosystem with ComfyUI export, LoRAs, and multiple quantizations. Kimi-K3 leads likes with 10,261 and over 1.3M downloads, signaling strong demand for multimodal compressed-tensor models. GLM-5.2 and Baidu’s Unlimited-OCR also stand out with huge download counts, showing that general and specialized open models are both accelerating. FLUX.1-dev remains a long-running hot model, and community fine-tunes around Qwen3.6 and MiniMax-H3 show that adaptation—especially uncensored and quantized—is a major driver.

---

## Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 2,721 | 702,709 | Official DeepSeek V4 Flash variant optimized for fast text generation and conversation. Trending due to strong download momentum and spawning multiple GGUF and abliterated community variants. |
| [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B) | LiquidAI | 366 | 77,973 | Small 2.6B liquid/causal language model built for efficient text generation. Its compact size and official GGUF release make it popular for edge and local inference experiments. |
| [deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview) | deepgrove | 222 | 686 | Preview text-generation MoE with causal-LM architecture from deepgrove. The high like-to-download ratio suggests early community enthusiasm for a novel mixture-of-experts design. |
| [inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash) | inclusionAI | 201 | 3,065 | Bailing-hybrid conversational model from inclusionAI. The flash variant is gaining traction for efficient dialogue and custom-code deployment in language workflows. |
| [zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2) | zai-org | 4,884 | 2,430,330 | Large conversational GLM model with an MoE-DSA architecture from Zhipu AI. One of the week’s most liked official releases with over 2.4M downloads, signaling strong production interest. |
| [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) | deepseek-ai | 2,058 | 2,577,975 | The main DeepSeek V4 Flash checkpoint. It is the canonical release of the Flash family and a reference point for community quants and uncensored variants. |
| [EschaLabs/Qwen3.6-35B-A3B-Escha-W2](https://huggingface.co/EschaLabs/Qwen3.6-35B-A3B-Escha-W2) | EschaLabs | 234 | 3,622 | Qwen3.6-based 35B MoE text-generation model with 3B active parameters. Trending as a community take on sparse Qwen generation with an efficient parameter-to-capability ratio. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 2,902 | 18,112 | Image-text-to-video diffusion model from MiniMax for text- and image-conditioned video generation. Top new release of the week and anchor of a rapidly growing ComfyUI and quantization ecosystem. |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 910 | 3,139,920 | Single-file diffusion distribution of MiniMax-H3 for ComfyUI. Already at 3.14M downloads, showing massive demand for plug-and-play video generation in the ComfyUI workflow. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,261 | 1,308,186 | Moonshot’s image-text-to-text multimodal model with compressed-tensors support. It has the highest likes on the list and over 1.3M downloads, making it a standout multimodal generalist release. |
| [nvidia/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B) | nvidia | 217 | 359 | NVIDIA NemotronLabs voice-chat model for spoken dialogue and audio interaction. Niche but notable for embodied-voice and real-time assistant applications. |
| [Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b) | Audio8 | 303 | 12,633 | Compact 0.6B text-to-speech preview using ArkTTS, focused on efficient speech synthesis. Trending with 303 likes as a lightweight open-weights TTS option. |
| [microsoft/Mage-VL](https://huggingface.co/microsoft/Mage-VL) | microsoft | 301 | 456,140 | Microsoft’s MAGE-VL image-text-to-text multimodal model. Its rapid 456K download count and Microsoft backing make it a key open-weight VLM to watch. |
| [thinkingmachines/Inkling-Small](https://huggingface.co/thinkingmachines/Inkling-Small) | thinkingmachines | 333 | 25,340 | Thinking Machines’ small conversational multimodal model for image-text-to-text interaction. Gaining likes for compact, locally runnable VLM capabilities. |
| [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) | black-forest-labs | 14,023 | 512,841 | Black Forest Labs’ open text-to-image diffusion model, now an ecosystem staple. Sustained downloads and community tooling keep it a reference image-generation model. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 3,951 | 2,836,694 | Baidu’s Unlimited-OCR model for image-to-text OCR, feature extraction, and document understanding. Its 2.8M downloads indicate massive enterprise and developer interest in open OCR. |
| [Kwaipilot/KAT-Coder-V2.5-Dev](https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev) | Kwaipilot | 529 | 17,399 | Code-focused Qwen3.5-MoE model trained for developer tasks with image-text-to-text support. Its code specialization and multimodal input make it a strong coding-VLM alternative. |
| [mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B) | mistralai | 178 | 2,480 | Mistral’s 3B guardrail and safety classifier built on Mistral 3. Trending for practical LLM alignment via a small, vLLM-serveable moderation model. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/DeepSeek-V4-Flash-0731-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF) | unsloth | 577 | 161,253 | Unsloth’s GGUF quantization of DeepSeek V4 Flash 0731 for llama.cpp and local deployment. Bridges the large official model with consumer hardware via efficient GGUF packaging. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 1,689 | 2,217,339 | A heavily customized, uncensored Qwen3.6 27B GGUF with a long fine-tune tag string. Its 1.7K likes and 2.2M downloads show continued appetite for uncensored creative and roleplay models. |
| [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora) | larryvrh | 388 | 0 | LoRA adapter for MiniMax-H3 targeting text-to-video and audio-video generation. Newly posted with 388 likes and zero downloads yet, indicating early buzz or a just-released asset. |
| [ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot) | ethanfel | 371 | 0 | INT8/ComfyUI-packaged Qwen3-VL 32B variant mixing “Heretic” fine-tuning with MiniMax-H3 text-encoder tools. Draws attention for pushing local multimodal-video workflows with quantized precision. |
| [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI) | drbaph | 171 | 0 | ComfyUI-ready, pruned LoRA adapter for MiniMax-H3 Turbo. Provides a convenient drop-in video-generation enhancement for the ComfyUI ecosystem. |
| [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs) | realrebelai | 166 | 87,870 | GGUF quantizations of the Comfy-Org MiniMax-H3 single-file base model. The 87.9K downloads underline demand for CPU and inference-optimized video diffusion. |
| [lodestones/Kroma](https://huggingface.co/lodestones/Kroma) | lodestones | 221 | 0 | Krea 2 LoRA for text-to-image generation, packaged for ComfyUI. A niche style adapter with early community attention and zero downloads yet. |
| [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF) | LiquidAI | 138 | 31,489 | Official GGUF release of LiquidAI’s LFM2.5 2.6B for llama.cpp. Enables easy local use of the compact liquid model and complements the base text-generation release. |
| [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF) | LuffyTheFox | 421 | 332,992 | Uncensored Hermes-tuned Qwen3.6 35B A3B MoE in GGUF format. Its 333K downloads indicate strong demand for uncensored MoE roleplay models. |
| [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot) | Abiray | 122 | 452,420 | Quantized MiniMax-H3 checkpoint using NVFP4/INT4/INT8 ConvRot for video diffusion. The 452K downloads show the community’s push to run high-end video models on consumer GPUs. |
| [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4) | sakamakismile | 117 | 0 | NVFP4-compatible Qwen3-VL 32B text-encoder variant for ComfyUI and MiniMax-H3 video pipelines. Useful for combining strong vision-language conditioning with quantized video generation. |
| [huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF) | huihui-ai | 99 | 102,798 | Abliterated, uncensored GGUF of DeepSeek V4 Flash 0731 from huihui-ai. Offers a popular open alternative for users wanting fewer refusals while retaining GGUF portability. |

---

## Ecosystem Signal

Open-weight releases dominate the current HF landscape: DeepSeek V4 Flash, MiniMax-H3, Kimi-K3, GLM-5.2, and Microsoft’s Mage-VL all show that major labs are shipping downloadable weights. MiniMax-H3 has formed an unusually complete ecosystem within days—ComfyUI single-file export, LoRAs, NVFP4/INT4/INT8 quants, and GGUF variants—making video generation the most active frontier. DeepSeek V4 Flash is also consolidating around GGUF and abliterated derivatives from Unsloth and huihui-ai, while Qwen3.6-based uncensored MoE fine-tunes continue to amass large download counts. On the multimodal side, compressed-tensors support in Kimi-K3 and small TTS/voice models from Audio8 and NVIDIA point toward efficient local serving. Specialized OCR and safety classifiers from Baidu and Mistral show that open-weight adoption is moving beyond general chat into enterprise and compliance use cases. Overall, the ecosystem is being driven by quantization, uncensored/abliterated variants, and video diffusion workflows.

---

## Worth Exploring

- **MiniMaxAI/MiniMax-H3** — The center of the week’s most active video-generation ecosystem. Studying its Comfy-Org single-file diffusion, LoRA adapters, and NVFP4/INT8 quantizations shows how open-weights video models move quickly from release to deployable tools.
- **deepseek-ai/DeepSeek-V4-Flash-0731** — The official Flash checkpoint with 702K downloads and multiple community variants. It is useful for comparing base model quality to abliterated and GGUF versions, and for understanding DeepSeek’s fast-iteration release strategy.
- **baidu/Unlimited-OCR** — A massively adopted specialized OCR model with 2.8M downloads. It highlights how vision and document workflows are becoming a key open-weight use case, especially for enterprise document processing pipelines.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*