# AI Infrastructure Digest 2026-08-16

> Generated: 2026-08-15 23:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem
**Date:** 2026-08-16 · **Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

The ecosystem is consolidating around a small set of frontier model families — DeepSeek-V4-Flash, GLM-5.2, Kimi-K3, MiniMax-H3 — whose hybrid sparse-attention and MoE architectures are stressing every layer from kernels to gateways. DeepSeek-V4-Flash instability is the single dominant theme: crash, livelock, and silent-corruption reports span vLLM, SGLang, and llama.cpp simultaneously, with fixes still in flight rather than shipped. A second theme is the migration of correctness risk from obvious crashes to *silent failures* (skipped attention kernels, dropped reasoning fields, ignored tool_choice), which are far more dangerous for production agent workloads. Meanwhile, local and on-prem serving is maturing quickly — llama.cpp shipped two new model families in 24 hours, Ollama is patching tool-loop breakage, and Unsloth Studio is converging on a local-first serving model — while the gateway layer (LiteLLM) is surfacing security and cost-accounting issues that matter most to multi-provider deployments.

---

## 2. Activity Comparison

*Counts reflect issues/PRs cited in the 2026-08-16 digests, not total GitHub state.*

| Project | Issues (cited) | PRs (cited) | Release Status |
|---|---|---|---|
| **vLLM** | ~23 (incl. 4 DSv4 crash/corruption reports) | ~14 (2 DSv4 fixes in flight) | None in 24h; CI on v0.27.2rc1 |
| **SGLang** | ~19 (4 silent-correctness issues) | ~15 (DSv4 TRT-LLM, KDA, NVFP4 in review) | None |
| **llama.cpp** | ~12 | ~19 | **9 tags** (b10436–b10448), incl. one breaking change |
| **Ollama** | ~24 | ~10 | **v0.32.14-rc0** (2 fixes) |
| **LiteLLM** | ~19 (incl. 3 security findings) | ~13 | None |
| **Unsloth** | ~15 | ~11 | None |

**Most active:** llama.cpp by release cadence; vLLM and SGLang by severity-weighted issue volume. **Most stable release posture:** Ollama (small targeted RC) and llama.cpp (continuous small tags). **No releases:** vLLM, SGLang, LiteLLM, Unsloth — fixes are on `main`/PR branches only.

---

## 3. Model Support Race

| Project | Shipped / In-Review This Window | Status |
|---|---|---|
| **llama.cpp** | **Kimi-K3 text** (hybrid KDA+MLA, latent MoE) · **MiniMax-Text-01/M1** · MTP assistant models via `--models-dir` | ✅ Shipped (b10448, b10437) |
| **vLLM** | GLM-5.2 TurboQuant sparse MLA backend · Gemma 4 video fix · SM120 MLA decode · CUDA 13.4/Rubin sm_107 image pipeline | 🔶 Shipped PRs; no release |
| **SGLang** | DSv4 TRT-LLM attention for SM100/103 · Kimi-Linear KDA native Cake kernels · NVFP4 Marlin · Hunyuan3D Paint | 🔶 In review |
| **Ollama** | No new models; auto-detect qwen3-coder renderer; community demand for deepseek-v4-flash, GLM-5.3, DeepSeek V4 Pro | 🔶 Backend bumps only |
| **LiteLLM** | voyage-code-4 + voyage-4 embedding families in cost maps | 🔶 Model-agnostic (gateway) |
| **Unsloth** | No new model families; Studio discovery for oMLX models | 🔶 Minor enablement |

**Who is ahead:** **llama.cpp** for breadth of *shipped* frontier-architecture support (Kimi-K3, MiniMax) — it converts and runs new GGUFs fastest. **SGLang** leads in *kernel depth* for datacenter GPUs (DSv4 TRT-LLM, KDA Cake, NVFP4 Marlin), but all of it is in review, not released. **vLLM** leads in *stabilization* of the flagship model on NVIDIA/AMD, though the DSv4 crash cluster means it is not production-safe yet. **Ollama's** open model requests are the clearest demand signal: users are waiting for DeepSeek-V4-Flash and GLM-5.3 on local hardware today.

---

## 4. Performance Frontier

Optimization effort is concentrated in five areas:

- **KV cache (quantization & offload):** llama.cpp fixed the CUDA mixed-K/V fallback that silently dropped flash attention for a ~30× prefill slowdown ([#27150](https://github.com/ggml-org/llama.cpp/pull/27150)) and the small-KV-quant prefill regression ([#27140](https://github.com/ggml-org/llama.cpp/pull/27140)); SYCL TILE quantized KV decode shows **+42–169%** on Battlemage. vLLM added back-pressure detection for saturated KV-offload tiers ([#50045](https://github.com/vllm-project/vllm/pull/50045)). Unsloth fixed quantized KV silently dropped under tensor splitting.
- **Quantization & kernels:** vLLM W4A8-INT8 via PTX 9.4 `ldmatrix.s8.s4` (needs CUDA 13.4 preview); SGLang NVFP4 Marlin + DSpark; vLLM FP8 AMD indexer rewrite for gfx942; llama.cpp ternary MoE (Maple) and TML Inkling kernels in open PRs.
- **Distributed serving:** SGLang PD disaggregation on H200 shows **no throughput gain** vs single-node at 32k input / 512 output — a caveat worth benchmarking before adoption. vLLM added DCP for SM120 MLA decode; SGLang KDA zero-copy checkpoints target eliminating host-side copies.
- **Speculative decoding:** vLLM's GPU-side suffix drafter overlaps with CPU async scheduling; llama.cpp redesigned the server spec-decode thread model ([#27133](https://github.com/ggml-org/llama.cpp/pull/27133)); Ollama measured MTP variants **2× slower** on Apple Silicon. Efficiency gains are real, but correctness remains version-sensitive.
- **Request-path overhead:** Ollama's open PR eliminates ~300ms of per-request GGUF re-parsing ([#16161](https://github.com/ollama/ollama/pull/16161)); Unsloth's preprocessing fix cuts a 27 GB dataset tokenization from 11m14s to the rows actually needed; LiteLLM's Ollama `api_base` fix removes ~8s of silent TCP timeouts per completion.

---

## 5. Layer Positioning

| Project | Layer | Primary Interface | Deployment Target |
|---|---|---|---|
| **vLLM** | Production serving engine | OpenAI-compatible API, EngineCore | Datacenter GPUs (H100/H20/MI300X/Blackwell), multi-GPU, high concurrency |
| **SGLang** | Production serving engine | OpenAI-compatible API, Radix cache, PD disaggregation | Datacenter GPUs; deeper kernel/RADIX optimizations; more experimental frontier-kernel work |
| **llama.cpp** | Portable local runtime | GGUF, CLI/server, bindings | CPU → CUDA/Metal/Vulkan/SYCL; broadest hardware reach; fastest model-family adoption |
| **Ollama** | Developer-friendly local runtime + model manager | CLI + OpenAI-compat API, Modelfiles | Laptops, edge (Jetson), Apple Silicon; wraps llama.cpp/MLX |
| **LiteLLM** | API gateway / control plane | OpenAI-compatible proxy, admin API, budgets/guardrails | Multi-provider production deployments; cost control and auth |
| **Unsloth** | Training/fine-tuning framework + Studio | Python library + local UI | Fine-tuning on consumer/datacenter GPUs; now adding local serving/agent features |

**Key differentiator:** vLLM and SGLang compete on throughput and frontier-GPU kernels; llama.cpp and Ollama compete on time-to-model and hardware portability; LiteLLM owns cross-provider policy (auth, spend, guardrails); Unsloth owns the fine-tune-then-serve loop.

---

## 6. Trend Signals

1. **DeepSeek-V4-Flash is the ecosystem's center of gravity — and its biggest risk.** Every engine has open crash or silent-corruption issues: vLLM (H100/H20/ROCm), SGLang (attention skip >65k tokens, DSPARK identifier corruption), llama.cpp (SWA KV exhaustion), Ollama (model request pending). Plan rollouts with pinned versions, reduced `max-num-batched-tokens`, and exact-token validation tests.

2. **Silent correctness failures have replaced crashes as the top risk class.** Skipped attention kernels, silently dropped `reasoning_content`, ignored `tool_choice`, blind audio completion, and un-tracked spend are all more dangerous than a hard crash because they pass health checks. Infrastructure teams should add semantic validation (identifier-injection tests, tool-trace audits, spend reconciliation) to CI.

3. **Hybrid linear/MLA attention + latent MoE is the new frontier architecture.** Kimi-K3, GLM-5.2, and DeepSeek-V4-Flash all push this direction, and every kernel stack is racing to catch up (FlashInfer, TRT-LLM, AITER, KDA Cake). Expect a 2–4 week lag between model release and stable kernel support on any given GPU family.

4. **Speculative decoding is compounding complexity across all layers.** New drafters (MTP, DSpark, suffix drafters) land faster than correctness proofs. Known issues: livelock with structured outputs (vLLM), quantization-sensitive divergence (llama.cpp), DSPARK corruption (SGLang). Treat spec decode as an opt-in feature with a watchdog and A/B verification, not a default.

5. **Agent/tool-calling correctness is the cross-cutting tax.** Streaming parser corruption (SGLang, Unsloth), system-message placement 500s (Ollama), dropped system roles (LiteLLM), and grammar/spec-decode boundary bugs (vLLM) all hit agent developers directly. Any framework consuming reasoning or tool traces must validate at the client.

6. **Local-first and on-prem are being treated as first-class, not fallback.** Ollama's cloud 503s, llama.cpp's rapid model adoption, Unsloth Studio's local-serving requests, and LiteLLM's Ollama-latency fix all point to increasing production weight on local and hybrid deployments. Expect the serving engines to ship more explicit local/edge configurations.

7. **Gateway security is becoming a deployment blocker.** LiteLLM's master-branch review surfaced SSRF via client-supplied `api_base`, non-admin budget escalation, and a no-auth default. For any organization exposing an LLM gateway, these are now the first things to audit — ahead of feature velocity.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-16

## Today's Highlights
DeepSeek-V4-Flash is the dominant theme: fresh crash and silent-corruption reports landed across H100 ([#51743](https://github.com/vllm-project/vllm/issues/51743)), H20-3e ([#52339](https://github.com/vllm-project/vllm/issues/52339)), and ROCm gfx942 ([#52109](https://github.com/vllm-project/vllm/issues/52109)), with two targeted fixes in flight — a revert of adaptive C128A metadata packing ([PR #51318](https://github.com/vllm-project/vllm/pull/51318)) and a native-FP8 AMD indexer rewrite ([PR #52402](https://github.com/vllm-project/vllm/pull/52402)). On the enablement side, vLLM added a CUDA 13.4 prerelease image pipeline for the upcoming NVIDIA Rubin (sm_107) ([PR #52379](https://github.com/vllm-project/vllm/pull/52379)) and a GLM-5.2 TurboQuant sparse MLA backend ([PR #52472](https://github.com/vllm-project/vllm/pull/52472)). No releases shipped in the last 24h; CI is running v0.27.2rc1 dev builds.

## Releases & Breaking Changes
None in the last 24h.

## New Model & Hardware Support
- **CUDA 13.4 / Rubin (sm_107):** [PR #52379](https://github.com/vllm-project/vllm/pull/52379) adds an image-only CUDA 13.4rc1 prerelease path with pinned PyTorch/torchvision/torchaudio nightlies.
- **GLM-5.2 TurboQuant sparse MLA:** [PR #52472](https://github.com/vllm-project/vllm/pull/52472) extends TurboQuant MLA with packed 4-bit latent KV storage, fused sparse decode/prefill, and GLM-4 MoE MTP plumbing incl. DCP/PP correctness.
- **SM120 MLA decode:** [PR #47779](https://github.com/vllm-project/vllm/pull/47779) enables decode context parallelism (DCP) for the FlashInfer sparse MLA backend on Blackwell consumer (RTX 50-class).
- **Gemma 4 video:** [PR #52441](https://github.com/vllm-project/vllm/pull/52441) keeps video frame counts on CPU, fixing a serving failure for `google/gemma-4-E2B-it`.
- **Feature tracking:** Whisper support remains an open community-tracked request ([#25750](https://github.com/vllm-project/vllm/issues/25750)); composite model loading via `AutoWeightsLoader` ([#15697](https://github.com/vllm-project/vllm/issues/15697)) is still open with 44 comments.
- **Hardware gap:** [Issue #52181](https://github.com/vllm-project/vllm/issues/52181) — FlashAttention 2 requires compute capability ≥ 8.0, which blocks Qwen3.6-27B on Quadro RTX 8000 (sm_75). No fix yet.

## Performance & Optimization
- **ROCm gfx942 DSv4 sparse-attn indexer:** [PR #52402](https://github.com/vllm-project/vllm/pull/52402) moves `fp8_mqa_logits` to native FP8 MFMA with a corrected LDS occupancy gate — confined to the gfx942 (MI300X/MI325X) path.
- **W4A8-INT8 kernels:** [Issue #49529](https://github.com/vllm-project/vllm/issues/49529) proposes adopting PTX 9.4 `ldmatrix.s8.s4` (hardware INT4→INT8 expanding load); requires CUDA 13.4 dev preview.
- **Spec decode:** [PR #52097](https://github.com/vllm-project/vllm/pull/52097) adds a GPU-side suffix drafter so the best model-free drafter for repetitive/agentic traffic can overlap with CPU async scheduling; [PR #51318](https://github.com/vllm-project/vllm/pull/51318) reverts adaptive C128A metadata packing to restore CUDA-graph-compatible layouts for DSv4 sparse decode.
- **KV offload:** [PR #50045](https://github.com/vllm-project/vllm/pull/50045) adds back-pressure detection so saturated secondary tiers (disk/shared storage/P2P) stop cascading new stores.
- **Ops:** [PR #52473](https://github.com/vllm-project/vllm/pull/52473) makes the data-plane supervisor inherit vLLM's Uvicorn access-log configuration.
- **Still open:** [Issue #36010](https://github.com/vllm-project/vllm/issues/36010) (Qwen3.5-27B batch inference very slow on 0.27.x) and [Issue #32180](https://github.com/vllm-project/vllm/issues/32180) (ROCm gfx1151 Strix Halo V1 engine instability/perf).

## Stability & Regressions
Ranked by severity.

1. **DeepSeek-V4-Flash cluster** (multiple reports, fixes in flight):
   - [#51743](https://github.com/vllm-project/vllm/issues/51743) — H100 TP4: `--max-num-batched-tokens >= 24576` crashes EngineCore in fused qnorm/rope/kv-insert; allocation invisible to memory profiler.
   - [#52339](https://github.com/vllm-project/vllm/issues/52339) — H20-3e TP8: FlashMLA sparse prefill `phase1.cuh:614` crash at ~161K context.
   - [#52109](https://github.com/vllm-project/vllm/issues/52109) — ROCm/gfx942 (MI325X): silent retrieval corruption for prompts ≥4-5k tokens via AITER sparse indexer.
   - [#51758](https://github.com/vllm-project/vllm/issues/51758) — Upgrade 0.26.0→0.27.0 breaks DeepSeek-V4-Flash with flash error; no accepted fix.
   - Related fixes: [PR #51318](https://github.com/vllm-project/vllm/pull/51318) (metadata packing revert) and [PR #52402](https://github.com/vllm-project/vllm/pull/52402) (indexer rewrite).

2. **[#49210](https://github.com/vllm-project/vllm/issues/49210)** — Engine core livelock (100% CPU, no crash) with MTP speculative decoding + xgrammar structured outputs; regression from v0.24.0. No fix.

3. **[#49237](https://github.com/vllm-project/vllm/issues/49237)** — POST /wake_up fails with AttributeError in `init_fp8_kv_scales`, wedging the engine while health stays green. No fix.

4. **[#52247](https://github.com/vllm-project/vllm/issues/52247)** — EngineCore blocks forever (no timeout) in `copy_event.synchronize()` when a GPU kernel never terminates. No fix.

5. **[#51884](https://github.com/vllm-project/vllm/issues/51884)** — FP8 block-scaled weights fail on sm120 (RTX 5090) with DeepGEMM "Unknown SF transformation" during weight processing. No fix.

6. **Compatibility/load errors:**
   - [#52300](https://github.com/vllm-project/vllm/issues/52300) — `libcudart.so.13` ImportError when installing vllm==0.21.0 on CUDA 12.6/PyTorch 2.11.
   - [#52434](https://github.com/vllm-project/vllm/issues/52434) — `AttributeError: 'ParallelLMHead' object has no attribute 'output_size_per_partition'` (aarch64).

7. **Structured output / tool-calling correctness:**
   - [#43338](https://github.com/vllm-project/vllm/issues/43338) — grammar-mask spec-decode fix doesn't handle multi-token reasoning boundaries (gpt-oss still bleeds; Qwen3 fixed).
   - [#50477](https://github.com/vllm-project/vllm/issues/50477) — gemma4 parser silently ignores named forced `tool_choice` on 0.26.0 (worked on 0.21.0).
   - [#52410](https://github.com/vllm-project/vllm/issues/52410) — Gemma4 parser defaults `enable_thinking` to true while the template defaults false.
   - [#38488](https://github.com/vllm-project/vllm/issues/38488) — `reasoning_content` silently dropped on incoming assistant messages in `chat_utils.py`.

8. **Fixes merged/closed in the last 24h:**
   - [PR #52474](https://github.com/vllm-project/vllm/pull/52474) fixes Quark INT4 structured quantization config lists ([#52454](https://github.com/vllm-project/vllm/issues/52454)).
   - [PR #52476](https://github.com/vllm-project/vllm/pull/52476) avoids causal-conv1d metadata alignment specialization ([#52413](https://github.com/vllm-project/vllm/issues/52413)).
   - [PR #52460](https://github.com/vllm-project/vllm/pull/52460) falls back Mamba cache `'all'` mode to `'align'` on Model Runner V2 ([#52317](https://github.com/vllm-project/vllm/issues/52317)).
   - [PR #52419](https://github.com/vllm-project/vllm/pull/52419) preserves EAGLE cache registration on the partial-hash-hit path.
   - [PR #49613](https://github.com/vllm-project/vllm/pull/49613) clears stale thinking-budget state on asymmetric SWAP.

## What This Means for Application Developers
- **DeepSeek-V4-Flash serving is risky right now.** Test the 0.26.0→0.27.x upgrade before rolling out, keep `--max-num-batched-tokens` below 24576 on H100, and validate long-context retrieval on ROCm gfx942. Watch [PR #51318](https://github.com/vllm-project/vllm/pull/51318) and [PR #52402](https://github.com/vllm-project/vllm/pull/52402) for the fixes.
- **Structured outputs + speculative decoding remain an edge-case minefield.** The livelock ([#49210](https://github.com/vllm-project/vllm/issues/49210)) and multi-token reasoning-boundary bug ([#43338](https://github.com/vllm-project/vllm/issues/43338)) mean agentic workloads combining `response_format`/grammars with spec decode should pin known-good versions and add watchdog timeouts.
- **OpenAI-compat caveats are still surfacing.** Incoming assistant `reasoning_content` is silently dropped ([#38488](https://github.com/vllm-project/vllm/issues/38488)); Gemma 4 forced `tool_choice` may be ignored ([#50477](https://github.com/vllm-project/vllm/issues/50477)). Verify reasoning/tool traces per model family if your framework consumes them.
- **Blackwell (sm120) users should hold off on FP8 block-scaled models and W4A8 paths** until [#51884](https://github.com/vllm-project/vllm/issues/51884) and [#49529](https://github.com/vllm-project/vllm/issues/49529) land; the next kernel improvements are tied to CUDA 13.4 dev previews.
- **Small-model runners get near-term relief:** Quark INT4 (Qwen3.8) and Mamba-on-MRV2 crashes have merged fixes — relevant for anyone serving Qwen3.x quantized or Nemotron-class hybrid models.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-08-16

**Highlights:** No new release tags were published in the last 24h. Active work is concentrated on DSA/DeepSeek-V4 attention integration, KDA/native Blackwell kernels, NVFP4 MFA/Marlin support, and a large set of correctness/stability fixes around speculative decoding, PD disaggregation, and diffusion serving.

---

### 1. Today’s Highlights
- Substantial kernel/architecture work is in review: DSv4 TRT-LLM attention for SM100/103 ([#30805](https://github.com/sgl-project/sglang/pull/30805)), KDA native Cake kernels for Kimi-Linear ([#34946](https://github.com/sgl-project/sglang/pull/34946)), and compressed-tensors NVFP4 Marlin with BF16/DSpark ([#34966](https://github.com/sgl-project/sglang/pull/34966)).
- Several severe **silent correctness** issues were filed for DSA/speculative paths: attention can be skipped entirely for >65535-token extends ([#34947](https://github.com/sgl-project/sglang/issues/34947), [#34941](https://github.com/sgl-project/sglang/issues/34941)), and DSPARK can corrupt identifiers on DeepSeek-V4-Flash ([#34959](https://github.com/sgl-project/sglang/issues/34959)).
- The Unified Radix Cache refactor remains a high-priority roadmap item, now with a dedicated bit-exact correctness coverage request ([#20415](https://github.com/sgl-project/sglang/issues/20415), [#34899](https://github.com/sgl-project/sglang/issues/34899)).

---

### 2. Releases & Breaking Changes
- **None.** No new releases or migration notes were reported in the last 24h.

---

### 3. New Model & Hardware Support
- **DSv4 TRT-LLM attention for SM100/103** — high-priority integration PR now active ([#30805](https://github.com/sgl-project/sglang/pull/30805)).
- **KDA / Kimi-Linear** — native Cake-kernel routing PR ([#34946](https://github.com/sgl-project/sglang/pull/34946)), depending on zero-copy native prefill checkpoints and packed decode ([#34299](https://github.com/sgl-project/sglang/pull/34299)).
- **NVFP4 compressed-tensors on SM80-SM90** — Marlin path extended to BF16 and DSpark ([#34966](https://github.com/sgl-project/sglang/pull/34966)).
- **Diffusion** — native Hunyuan3D Paint and Delight model ownership introduced ([#34980](https://github.com/sgl-project/sglang/pull/34980)); NPU optimization for LTX-2/2.3 ([#34722](https://github.com/sgl-project/sglang/pull/34722)).
- **AMD/ROCm** — K3 AITER prefill kernel support for 12-head models ([#34837](https://github.com/sgl-project/sglang/pull/34837)); GPT-OSS throughput coverage added to ROCm 7.2 nightly CI ([#34645](https://github.com/sgl-project/sglang/pull/34645)).
- **Realtime ASR** — experimental segment-snapshot mode for bounded long-audio transcription ([#32682](https://github.com/sgl-project/sglang/pull/32682)).

---

### 4. Performance & Optimization
- **KDA prefill/decode** — zero-copy native checkpoints and packed decode target eliminating host-side copies ([#34299](https://github.com/sgl-project/sglang/pull/34299)).
- **GDN target verification** — PR avoids materializing QKV tensors by consuming packed `causal_conv1d_update` output directly ([#33778](https://github.com/sgl-project/sglang/pull/33778)).
- **DSA top-k** — adds FlashInfer fused top-k backend via `--dsa-topk-backend flashinfer` ([#33237](https://github.com/sgl-project/sglang/pull/33237)).
- **DSpark NPU** — folded-path parity fix preserves acceptance quality while improving performance ([#34944](https://github.com/sgl-project/sglang/pull/34944)).
- **Profiling** — detailed execution-step annotations are in progress ([#24911](https://github.com/sgl-project/sglang/pull/24911)); benchmark server processes now spawn instead of fork to avoid accelerator-state corruption ([#34712](https://github.com/sgl-project/sglang/pull/34712)).
- **Caveat:** PD disaggregation on H200 still shows **no throughput gain** over single-node deployment with 32k input / 512 output — worth evaluating before adoption ([#24488](https://github.com/sgl-project/sglang/issues/24488)).

---

### 5. Stability & Regressions
Ranked by severity:

**Silent/invisible correctness failures**
- DSA sparse-MLA prefill can launch **zero attention kernels** for single extends >65535 tokens when `prefill=trtllm` on the non-DP path; output is silently wrong. Two trackers: [#34947](https://github.com/sgl-project/sglang/issues/34947), [#34941](https://github.com/sgl-project/sglang/issues/34941).
- DSPARK can silently corrupt identifiers on **DeepSeek-V4-Flash**, making speculative decoding unsafe ([#34959](https://github.com/sgl-project/sglang/issues/34959)).
- Compressed-tensors FP8 `lm_head` `weight_scale` can be dropped, causing degenerate repetition with unsloth/Qwen3.8-27B-NVFP4 ([#34895](https://github.com/sgl-project/sglang/issues/34895)).

**Crashes and hangs**
- Kimi K3 decode crashes deterministically under DSPARK + PD + DCP: `cumsum(extend_prefix_lens=None)` in `dcp/planner.py` ([#34920](https://github.com/sgl-project/sglang/issues/34920)).
- Scheduler dies with `AttributeError: 'list' object has no attribute 'tolist'` when `token_ids_logprob` requests share a batch with normal requests; affects v0.5.14–v0.5.17 ([#34719](https://github.com/sgl-project/sglang/issues/34719)).
- `--enable-eplb` + DSPARK crashes during draft CUDA graph capture with `scatter_add_` dimension mismatch ([#34974](https://github.com/sgl-project/sglang/issues/34974)).
- By-stage profiler under speculative decoding can freeze the scheduler for ~25 seconds and leaks the stop condition into later requests ([#34943](https://github.com/sgl-project/sglang/issues/34943), [#34942](https://github.com/sgl-project/sglang/issues/34942)).
- HiCache host-memory checks fail incorrectly when HugePages are reserved ([#34972](https://github.com/sgl-project/sglang/issues/34972)); HF3FS HiCache can hit `ZeroDivisionError` with DeepSeek-V4 logical KV anchors ([#34969](https://github.com/sgl-project/sglang/issues/34969)).
- MiniMax-H3 resident serving stages a full 61.7 GiB DiT copy per rank through host RAM: 114.3 GiB at 2 ranks, 233.5 GiB at 4, with silent SIGKILL risk ([#34902](https://github.com/sgl-project/sglang/issues/34902)).

**Tool-call / API correctness**
- Kimi-K3 parser fails ~8x/hour in production (`TypeError`, JSON parse errors) ([#34604](https://github.com/sgl-project/sglang/issues/34604)); streaming tool-call parsers generally lose/corrupt data at chunk boundaries ([#31915](https://github.com/sgl-project/sglang/issues/31915)).
- Responses API `input_image` parts in `function_call_output` are not converted to `image_url`, causing 400s on post-#25881 builds and silent drops on main ([#34927](https://github.com/sgl-project/sglang/issues/34927)).
- MiniMax-H3 `quality="high"` is not gated against Turbo-LoRA-merged weights; a fix PR now exists ([#34954](https://github.com/sgl-project/sglang/issues/34954), [#34978](https://github.com/sgl-project/sglang/pull/34978)).

**Closed in last 24h**
- Diffusion attention-backend fallback error on most models — closed ([#34389](https://github.com/sgl-project/sglang/issues/34389)).
- FlashInfer-TRTLLM MoE runner corruption/assertion on MiniMax-M2.7 / DeepSeek-V4-Flash — closed ([#26324](https://github.com/sgl-project/sglang/issues/26324)).
- Intermittent NCCL hang during Spec V2 verify — closed ([#28011](https://github.com/sgl-project/sglang/issues/28011)).

---

### 6. What This Means for Application Developers
- **Audit DSA/speculative workloads before production.** Silent attention skips on long extends ([#34947](https://github.com/sgl-project/sglang/issues/34947)) and DSPARK identifier corruption on DeepSeek-V4-Flash ([#34959](https://github.com/sgl-project/sglang/issues/34959)) mean correctness checks should include exact-token or identifier-injection tests, not just fluency/BLEU-style metrics.
- **Avoid mixed `token_ids_logprob` batches** until the scheduler crash is fixed; one scoring client can take down the whole server ([#34719](https://github.com/sgl-project/sglang/issues/34719)).
- **Tool-call streaming remains fragile.** If you rely on Kimi-K3 or generic `function_call` parsers, add client-side response validation and graceful retry; several parser corruption paths are still open ([#34604](https://github.com/sgl-project/sglang/issues/34604), [#31915](https://github.com/sgl-project/sglang/issues/31915)).
- **MiniMax-H3 host RAM scales linearly with rank count** on the resident path; plan for ~58 GiB temporary host usage per rank or use the documented FSDP/RTX recipe ([#34902](https://github.com/sgl-project/sglang/issues/34902)).
- **No new release this week** — these fixes are on `main`/PR branches only. Pin a specific commit if you need one of the new kernels (DSv4 TRT-LLM, KDA Cake, NVFP4 Marlin), and test carefully against stable versions.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-16

## 1. Today's Highlights

llama.cpp added two significant model families — Kimi-K3 text with hybrid linear/MLA attention and latent MoE (#26185), and MiniMax-Text-01 / MiniMax-M1 support (#27018). The server’s speculative decoding thread model was redesigned for worker/main thread swapping (#27133), and the old `--mmap`/`--no-mmap`/`--mlock`/`--direct-io` flags were consolidated into the unified `--load-mode` option (#26934), which is a breaking CLI change. On the performance side, CUDA fixes landed for mixed K/V quantization fallback (#27150) and slow prefill with small KV quants (#27140).

## 2. Releases & Breaking Changes

- **b10448** — Model support for Kimi-K3 text (#26185): KDA linear + full MLA attention, cross-layer residual attention, latent MoE.
- **b10447** — Server: re-designed `yield_to_queue` speculative thread model (#27133).
- **b10446** — Vendor: BoringSSL updated to 0.20260813.0 (#27099).
- **b10444** — `common`: `--models-dir` now supports loading MTP assistant models (#24431).
- **b10443** — Fix: check GGUF array type before reading (#27075).
- **b10442** — Vulkan: added `SHMEM_STRIDE_PAD` / `APPLY_SLM_A_RESHAPE` for cooperative matrix `mul_mm` on Intel Xe (#25380).
- **b10441** — Breaking change: deprecated `--mmap`, `--no-mmap`, `--mlock`, and `--direct-io` are replaced by the unified `--load-mode` argument across scripts/examples/docs (#26934). Users should migrate to `--load-mode` and update wrappers.
- **b10437** — Model support for MiniMax-Text-01 and MiniMax-M1 (#27018).
- **b10436** — `mtmd`, `common`: various fixes (#27071).

## 3. New Model & Hardware Support

- **Kimi-K3 text** (#26185): hybrid KDA (linear) + MLA (full) attention, cross-layer residual attention, latent MoE.
- **MiniMax-Text-01 / MiniMax-M1** (#27018): new `MiniMaxText01ForCausalLM` and `MiniMaxM1ForCausalLM` support.
- **Maple 20B-A1B ternary MoE** (#27000, open PR): 256 experts / 8 active, SWA-512 + global attention, TQ1_0/TQ2_0 ternary weights.
- **TML Inkling architecture** (#25731, open PR): safetensors-to-GGUF converter, graph build, banded flash attention kernel, int64 indexing for large MoEs.
- **MTP assistant models** via `--models-dir` (#24431) and **speculators-format checkpoints** (#26275, open PR) broaden speculative decoding compatibility.

## 4. Performance & Optimization

- **Vulkan / Intel Xe**: cooperative matrix `mul_mm` got shared-memory stride padding and SLM reshape (#25380), targeting Intel Xe performance.
- **SYCL TILE quantized KV decode** (#26689): decode with q4_0/q8_0 KV now uses TILE kernel on Battlemage; measured **+42% to +169%** on Qwen3.6-35B, Gemma 4 26B, and Gemma 4 12B at 32K/118K context.
- **SYCL Q4_K multi-column MMVQ** (#27062): reduces redundant Q4_K weight reconstruction across destination columns.
- **CUDA mixed K/V types in flash attention** (#27150): previously using different `-ctk` and `-ctv` types silently disabled flash attention and fell back to CPU — around **30x prefill slowdown**. This PR allows mixed K/V types in FA on CUDA.
- **CUDA small KV-quant prefill fix** (#27140): addresses very slow prefill with small KV quantization while preserving memory compression.
- **Vulkan tiled transpose** (#26585): routes 0↔2 permuted contiguous copies through the tiled shared-memory transpose shader instead of generic strided copy.
- **Metal / AMD discrete GPUs** (#19527, open): reports ~5.3 → 60.4 t/s on Radeon Pro 5300M, but marked “vibe-coded” and still in review.

## 5. Stability & Regressions

High severity:

- **Server forces full prompt re-processing on subsequent requests** (#21831) — SWA/recurrent memory issue, 52 comments, unconfirmed.
- **Vulkan `vk::DeviceLostError` on Linux 7.x / RADV Strix Halo** (#25664).
- **SYCL completely broken on Intel A770** (#27063) — crashes with Qwen 3.5 9B, GPT-OSS-20B, Gemma 4 A4B.
- **CUDA 4-bit KV cache collapses prefill to ~34 t/s on Qwen3.5 hybrid** (#27109) — fix PRs #27140 and #27150 are relevant.
- **DeepSeek-V4-Flash churned-reuse SWA KV-cache exhaustion** (#25452) — crash + stall, CUDA.

Medium severity:

- **Vision not working with Qwen 27B 3.6/3.8 on AMD AI Max** (#27124), Vulkan/Windows.
- **Speculative decoding (MTP/DSpark) diverges from vanilla on quantized targets** (#25618) — matches on bf16 targets, so quantization-sensitive.
- **Qwen3-Coder lazy tool-call trigger never fires** when model skips `<tool_call>` and `<function=` wrappers (#26987).
- **`reasoning_effort` seems broken** (#27023).
- **SYCL `MUL_MAT_ID` prefill wrong results on Arc Pro B70** (#25455) — MoE garbage output.
- **Windows BLAS compilation with AOCL fails** (#25413) — OpenBLAS works.
- **Windows Defender false positive on b10195 CPU build** (#26343) — likely packaging issue, not runtime regression.

## 6. What This Means for Application Developers

- **Update CLI flags now**: `--mmap`/`--no-mmap`/`--mlock`/`--direct-io` are gone; use `--load-mode`. This will break existing launch scripts and container entrypoints.
- **Speculative decoding is easier to configure**: `--models-dir` auto-loads MTP/draft models (#24431), and server-side speculative processing was reworked (#27133) — benchmark after upgrading if you rely on draft-model throughput.
- **KV-cache quantization is now more viable on CUDA**: mixed K/V types no longer silently disable flash attention (#27150), and small-KV-quant prefill regression has a fix (#27140). This makes 4-bit KV with hybrid models safer for production.
- **New model architectures are arriving quickly** (Kimi-K3, MiniMax, Maple ternary MoE, TML Inkling). If you serve these families, watch for quantization support and conversion fixes — e.g., Qwen3.5 hybrid linear-attention tensor conversion (#27132).
- **Vulkan/SYCL users on Intel/AMD should test carefully**: there are active regressions on A770, Strix Halo, and Arc Pro B70, but also targeted TILE/coopmat improvements landing in the same area. Pin versions until your exact GPU combination is validated.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-16

## Today's Highlights

Ollama shipped **v0.32.14-rc0** with two targeted fixes: WebP image transcoding for llama-server and qwen renderer tolerance for non-leading system messages. The issue tracker remains dominated by **qwen3.8/system-message 500 errors** breaking `ollama launch claude` and tool-calling workflows, with several duplicates still open. A notable performance PR proposes eliminating ~300ms per-request GGUF re-parsing, while Ollama Cloud API has been returning 503 since Aug 14.

---

## Releases & Breaking Changes

- **[v0.32.14-rc0](https://github.com/ollama/ollama/compare/v0.32.13...v0.32.14-rc0)** — contains:
  - `llm: transcode WebP images for llama-server`
  - `renderers/qwen: tolerate non-leading system messages`

No API/config breaking changes were announced in this window. The qwen system-message tolerance is likely a partial fix for the `500 system message must be at the beginning` reports affecting Claude Code.

---

## New Model & Hardware Support

No new models or backends were released in this 24h window. Notable requests and pending backend work:

- **Community model requests:** [deepseek-v4-flash:0731](https://github.com/ollama/ollama/issues/17510), [GLM-5.3](https://github.com/ollama/ollama/issues/17741), [Upstage Solar Pro 4](https://github.com/ollama/ollama/issues/17773), [DeepSeek V4 Pro 0813](https://github.com/ollama/ollama/issues/17775).
- **Ollama Cloud model availability:** [Kimi K3 still missing from Pro/Max](https://github.com/ollama/ollama/issues/17715).
- **[PR #17769](https://github.com/ollama/ollama/pull/17769)** — auto-detect `qwen3-coder` renderer/parser for `qwen3moe` architecture GGUFs pulled directly from Hugging Face.
- Backend bumps landed/closed: [llama.cpp update](https://github.com/ollama/ollama/pull/17760) and [mlx update](https://github.com/ollama/ollama/pull/17761).

---

## Performance & Optimization

- **[PR #16161](https://github.com/ollama/ollama/pull/16161)** — cache `GetModel()` and `Capabilities()` to avoid re-parsing GGUF metadata per request; claims **~300ms wasted overhead per inference request**. Open, not yet merged.
- **[PR #11159](https://github.com/ollama/ollama/pull/11159)** — add model eval metrics (`ollama_eval_duration_total`, `ollama_eval_total`) to `/metrics`. Open.
- **[PR #17762](https://github.com/ollama/ollama/pull/17762)** — log debug inference requests before handling, not after, making `OLLAMA_DEBUG_LOG_REQUESTS` useful for live request observation.
- **[Issue #17776](https://github.com/ollama/ollama/issues/17776)** — Qwen3.8-27B MTP variants measured **2× slower than non-MTP** on Apple Silicon; unclear if expected for Metal speculative decoding.
- **[Issue #17783](https://github.com/ollama/ollama/issues/17783)** — `gemma4:31b-mlx` reported memory footprint growing per prompt in `ollama ps` on M5 MacBook Pro.

---

## Stability & Regressions

Ranked by severity.

### High

- **Ollama Cloud API down** — [Issue #17756](https://github.com/ollama/ollama/issues/17756): `api.ollama.cloud` returning 503 on all keys since Aug 14; website/proxied path partially working with high latency.
- **qwen3.8 system-message 500 errors** — [Issue #17754](https://github.com/ollama/ollama/issues/17754) (closed), [Issue #17774](https://github.com/ollama/ollama/issues/17774) (closed), [Issue #17768](https://github.com/ollama/ollama/issues/17768) (open), [Issue #17778](https://github.com/ollama/ollama/issues/17778) (open). Break `ollama launch claude`, Claude Code, and tool-calling loops with `system message must be at the beginning` / `no user query found in messages`. v0.32.14-rc0's qwen renderer fix may address the system-message placement case, but tool-loop/non-leading system variants remain.
- **CUDA illegal memory access** — [Issue #17434](https://github.com/ollama/ollama/issues/17434): `qwen3.6:35b` + JSON-schema `format` + `think:false` crashes CUDA runner 100% reproducibly on DGX Spark GB10 arm64.
- **AMD ROCm/Vulkan regressions:**
  - [Issue #17782](https://github.com/ollama/ollama/issues/17782): `Could not load "TensileLibrary_lazy_gfx1200.dat"` on RX 9060 XT 16GB.
  - [Issue #17748](https://github.com/ollama/ollama/issues/17748): Radeon 780M Vulkan backend `ErrorDeviceLost` on larger models since v0.32.11.
  - [Issue #17766](https://github.com/ollama/ollama/issues/17766): Pascal GPUs (P6000/P4000) no longer work since v0.32.11–13 despite being listed as supported.
- **Security: sessions not revoked** — [Issue #17682](https://github.com/ollama/ollama/issues/17682): password/email changes do not invalidate existing sessions, leaving accounts accessible.

### Medium

- **Models disappearing after update** — [Issue #17661](https://github.com/ollama/ollama/issues/17661): update to v0.32.7 on Jetson AGX Orin removed several local models.
- **Jetson memory regression** — [Issue #17787](https://github.com/ollama/ollama/issues/17787): since v0.32.2, `gemma4:e2b/e4b` uses excessive memory on Orin Nano even with small context.
- **SillyTavern empty responses** — [Issue #17700](https://github.com/ollama/ollama/issues/17700): text completion returns empty responses since a recent update; reverting to v0.32.7 fixes it.
- **Dual NVIDIA GPU scheduling** — [Issue #17780](https://github.com/ollama/ollama/issues/17780): RTX 5060 Ti + RTX 5090 setup misbehaves when trying to pin Qwen3.8 to the 5090.
- **Nemotron reasoning controls ignored** — [Issue #17785](https://github.com/ollama/ollama/issues/17785): `enable_thinking`, `low_effort`, and `reasoning_budget` silently ignored on both `/v1/chat/completions` and `/api/chat`.
- **qwen3.5 think mode stops mid-thinking** — [Issue #17777](https://github.com/ollama/ollama/issues/17777): fine-tune with `think:true` emits `done_reason=stop` without content on non-trivial prompts.

### Fixes / Fix PRs present

- **[PR #17764](https://github.com/ollama/ollama/pull/17764)** — return 400 when `/api/chat` contains `audios`/`audio` fields instead of silently dropping them (fixes blind responses).
- **[PR #17770](https://github.com/ollama/ollama/pull/17770)** — preserve tool-call parsing context in qwen3-vl client errors.
- **[PR #17763](https://github.com/ollama/ollama/pull/17763)** — honor Modelfile `temperature` on `/v1/chat/completions` instead of hardcoding 1.0.
- **[PR #17724](https://github.com/ollama/ollama/pull/17724)** — nanosecond-suffix backup writes to avoid overwrite collisions within the same second.
- **[Issue #16162](https://github.com/ollama/ollama/issues/16162)** (closed) — minicpm-v WebP SIGSEGV; v0.32.14-rc0's WebP transcoding may address this class of issue.

---

## What This Means for Application Developers

- **Do not rely on non-leading system messages with qwen3.8 tool-calling yet.** Even with v0.32.14-rc0, Claude Code-style agents that inject system messages mid-conversation may still see 500s. Pin to 0.32.7 if you need `ollama launch claude` and cannot tolerate tool-loop failures.
- **OpenAI-compat layer still has correctness gaps:** the default `temperature: 1.0` override ([#17763](https://github.com/ollama/ollama/pull/17763)) and ignored Nemotron reasoning kwargs ([#17785](https://github.com/ollama/ollama/issues/17785)) mean request options may not match Modelfile or template settings. Always pass explicit parameters if behavior matters.
- **Audio fields are silently dropped in `/api/chat` today.** Until [#17764](https://github.com/ollama/ollama/pull/17764) lands, validate that multimodal requests do not include `audio`/`audios` fields or you will get plausible but blind completions.
- **Expect ~300ms per-request overhead until [#16161](https://github.com/ollama/ollama/pull/16161) merges.** For latency-sensitive agent loops, keep requests small and reuse loaded models where possible.
- **Ollama Cloud is degraded.** If your app depends on `api.ollama.cloud`, add retries/fallbacks or pin local inference until the 503s are resolved.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Digest — 2026-08-16

### 1. Today's Highlights

No new LiteLLM release was cut in the last 24h, but the project saw a wave of security findings from a master-branch review (SSRF, budget bypass, no-auth default) alongside active PRs fixing cost-accounting and guardrail correctness. The most impactful operational bug is likely the Ollama `api_base` fallback that adds ~8s of silent connect timeouts per completion ([#37041](https://github.com/BerriAI/litellm/issues/37041)), with a fix already open in [#37062](https://github.com/BerriAI/litellm/pull/37062). Cost/billing accuracy is also getting attention: batch cost is being made exact-once ([#37050](https://github.com/BerriAI/litellm/pull/37050)), and streaming usage cost is no longer blindly trusted from generic gateways ([#37060](https://github.com/BerriAI/litellm/pull/37060)).

---

### 2. Releases & Breaking Changes

- **None in the last 24h.** No new versions, API changes, or migration notes were published.
- CI staging promotion is in progress via [#37042](https://github.com/BerriAI/litellm/pull/37042), but this is internal pipeline work, not a user-facing release.

---

### 3. New Model & Hardware Support

- **[#36820](https://github.com/BerriAI/litellm/pull/36820)** — Adds `voyage/voyage-code-4` embedding model to cost/context maps (model not officially released yet).
- **[#35091](https://github.com/BerriAI/litellm/pull/35091)** — Adds `voyage-4` family and `voyage-context-4`, and fixes contextual embedding handling for plain `list[str]` input.
- No new hardware/backend/quantization work (CUDA/ROCm/Metal/CPU) was reported in this batch.

---

### 4. Performance & Optimization

- **Ollama latency fix:** [#37041](https://github.com/BerriAI/litellm/issues/37041) reports that `get_runtime_model_info` ignores a request's `api_base` and falls back to `localhost:11434`, causing two ~4s TCP connect timeouts per completion. PR [#37062](https://github.com/BerriAI/litellm/pull/37062) forwards `api_base` to the model-info lookup and uses the configured Ollama host for `/api/show`.
- **DB saturation risk:** [#35766](https://github.com/BerriAI/litellm/issues/35766) — `LiteLLM_SpendLogs` lacks an `(api_key, startTime)` index, so budget-window spend reseeds seq-scan the table. Under load this causes Prisma `P2028` transaction failures and DB saturation.
- **Exact-once batch cost:** [#37050](https://github.com/BerriAI/litellm/pull/37050) fixes double-counting and lost-cost races for managed batches by making cost accounting happen exactly once per batch.
- **Audio budget reservation:** [#37056](https://github.com/BerriAI/litellm/pull/37056) adds budget reservation for per-second priced audio transcription, closing a gap where concurrent audio requests could bypass exhausted budgets.
- **Trust streaming cost selectively:** [#37060](https://github.com/BerriAI/litellm/pull/37060) prevents generic OpenAI-compatible gateways from overriding configured pricing with non-USD streamed usage cost, while preserving OpenRouter behavior.

---

### 5. Stability & Regressions

Ranked by severity:

1. **Proxy fails to start after `uv tool update`** — [#36922](https://github.com/BerriAI/litellm/issues/36922)  
   LiteLLM v1.96.2 breaks at startup due to FastAPI `get_flat_dependant` incompatibility. No fix PR is open yet.

2. **GPT-5.4 Responses bridge broken** — [#25429](https://github.com/BerriAI/litellm/issues/25429)  
   `litellm.responses()` returns empty final output, and `completion()` bridge fails with `Unknown items in responses API response: []` for `chatgpt/gpt-5.4`. High-impact for ChatGPT-subscription auth users.

3. **Security findings from master review**  
   - [#37053](https://github.com/BerriAI/litellm/issues/37053) — SSRF/provider-key exfiltration via client-supplied `api_base`; the blocking guard is dead code (Medium, CWE-918/CWE-522).  
   - [#37052](https://github.com/BerriAI/litellm/issues/37052) — Non-admin key owner can raise own `max_budget` via `temp_budget_increase` on `/key/update` (Medium, CWE-863/CWE-770).  
   - [#37054](https://github.com/BerriAI/litellm/issues/37054) — Proxy runs with no auth when `LITELLM_MASTER_KEY` is unset; default docker-compose does not set it (Low, CWE-306/CWE-287).  
   - Existing budget bypass remains open: [#28033](https://github.com/BerriAI/litellm/issues/28033).

4. **Session cookie security** — [#36997](https://github.com/BerriAI/litellm/issues/36997)  
   Admin UI login sets a non-HttpOnly JWT cookie carrying the caller's real proxy key.

5. **Anthropic message-format regressions**  
   - [#36917](https://github.com/BerriAI/litellm/issues/36917) — `role:"system"` inside `messages[]` is silently dropped before reaching the backend.  
   - [#28081](https://github.com/BerriAI/litellm/issues/28081) — Bedrock Converse rejects `betas` field forwarded on Anthropic 1M-context requests.

6. **Gemini translation bugs**  
   - [#37028](https://github.com/BerriAI/litellm/issues/37028) — Custom `api_base` serializes `system_instruction` instead of canonical `systemInstruction`.  
   - [#36928](https://github.com/BerriAI/litellm/issues/36928) — `interactions.create()` silently drops `response_format` when routed via `litellm_proxy`.  
   - [#37015](https://github.com/BerriAI/litellm/issues/37015) — Gemini TTS via `/v1/audio/speech` is never spend-tracked.

7. **Billing/cost correctness**  
   - [#37046](https://github.com/BerriAI/litellm/issues/37046) — `service_tier="priority"` on gpt-4o/gpt-4.1 family is silently billed at default rate.  
   - [#32785](https://github.com/BerriAI/litellm/issues/32785) — `RateLimitError` does not distinguish non-retryable `insufficient_quota` from retryable 429s, causing spin loops.  
   - [#36880](https://github.com/BerriAI/litellm/issues/36880) — Guardrail-blocked `/v1/responses` reports zero token usage despite real upstream consumption.

8. **Spend data loss on rolling deployments** — [#27704](https://github.com/BerriAI/litellm/issues/27704)  
   Prisma Query Engine startup race can cause spend updates to fail during Kubernetes rolling deployments.

9. **Managed Bedrock batch cancellation unsupported** — [#33986](https://github.com/BerriAI/litellm/issues/33986)  
   `POST /v1/batches/{id}/cancel` is rejected for Bedrock even though cancellation is supported provider-side.

**Notable fix PRs in flight:**

- [#37038](https://github.com/BerriAI/litellm/pull/37038) — PANW Prisma AIRS: scan tool call args as plain text; prevents HTTP 500 on tool calls.
- [#37036](https://github.com/BerriAI/litellm/pull/37036) — PANW AIRS blocked responses now return full scan details for audit/compliance.
- [#36894](https://github.com/BerriAI/litellm/pull/36894) — Azure Content Safety guardrails now actually scan on `/guardrails/apply_guardrail`.
- [#37058](https://github.com/BerriAI/litellm/pull/37058) — Stop forwarding client `Accept-Encoding` upstream, fixing raw brotli passthrough corruption.
- [#36633](https://github.com/BerriAI/litellm/pull/36633) — Stop leaking managed-batch `litellm_params` to Bedrock provider calls.
- [#36741](https://github.com/BerriAI/litellm/pull/36741) — Migrate Langfuse callback from retired v2 SDK to Langfuse v4.

---

### 6. What This Means for Application Developers

- **Do not blindly `uv tool update` the proxy.** The v1.96.2 startup failure ([#36922](https://github.com/BerriAI/litellm/issues/36922)) means you should pin LiteLLM versions and test proxy startup before rolling out updates.
- **Audit auth and budget endpoints.** The security review findings ([#37053](https://github.com/BerriAI/litellm/issues/37053), [#37052](https://github.com/BerriAI/litellm/issues/37052), [#37054](https://github.com/BerriAI/litellm/issues/37054)) are directly relevant to anyone exposing the admin API. Set `LITELLM_MASTER_KEY`, review client-supplied `api_base` handling, and restrict `/key/update` permissions.
- **Ollama users should watch [#37041](https://github.com/BerriAI/litellm/issues/37041).** If you use a non-default Ollama host, every completion may be paying ~8s in silent TCP timeouts. The fix in [#37062](https://github.com/BerriAI/litellm/pull/37062) should land soon.
- **Be careful with cost tracking correctness.** GPT-4o priority tier is underbilled ([#37046](https://github.com/BerriAI/litellm/issues/37046)), Gemini TTS is not spend-tracked ([#37015](https://github.com/BerriAI/litellm/issues/37015)), and batch costs are being fixed for exact-once accounting ([#37050](https://github.com/BerriAI/litellm/pull/37050)). For budget-critical workloads, verify spend logs against upstream invoices.
- **If you depend on the Responses API bridge with ChatGPT models, avoid `chatgpt/gpt-5.4` for now** ([#25429](https://github.com/BerriAI/litellm/issues/25429)).
- **Anthropic clients should not put `role:"system"` inside `messages[]`**; it is silently dropped by the proxy ([#36917](https://github.com/BerriAI/litellm/issues/36917)). Use the top-level `system` parameter instead.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest — 2026-08-16

### Today's Highlights

Unsloth Studio continues to receive most of the active work, with multiple PRs addressing model loading, streaming UI performance, and tool-call correctness. No new releases landed in the last 24 hours, but a notable preprocessing fix could cut multi-minute dataset tokenization overhead before short `max_steps` training runs. Several high-signal bug reports remain open around training crashes, GPU detection, and Studio functionality.

---

### Releases & Breaking Changes

None in the last 24 hours. No new versions, API changes, or migration notes to report.

---

### New Model & Hardware Support

- No new model families or architectures were released in this window.
- [PR #8937](https://github.com/unslothai/unsloth/pull/8937) adds Studio discovery for models installed through oMLX on macOS, using the `~/.omlx/models` layout.
- Open requests/issues cover Intel GPU support in Studio ([#8931](https://github.com/unslothai/unsloth/issues/8931)) and AMD ROCm/Vulkan VRAM reporting problems ([#8878](https://github.com/unslothai/unsloth/issues/8878)).
- Mac users report a `_Noop` object error when loading Ideogram 4 in Studio ([#8940](https://github.com/unslothai/unsloth/issues/8940)).

---

### Performance & Optimization

- [PR #8890](https://github.com/unslothai/unsloth/pull/8890) fixes Studio preprocessing entire validated datasets before `max_steps` runs. On a 27 GB `open_math_reasoning` dataset, a 30-step Qwen3-0.6B run spent **11m14s preprocessing vs. 1m54s training**; this change tokenizes only the rows actually needed.
- [PR #8845](https://github.com/unslothai/unsloth/pull/8845) coalesces streamed text chunks when the browser renderer falls behind, preventing the chat UI from queueing message rebuilds during fast local generations.
- [PR #8875](https://github.com/unslothai/unsloth/pull/8875) fixes embedded MTP performance under partial GPU offload. The regression affected Qwen3.8-27B-GGUF UD-IQ2_M, where Studio produced about **3.5 token/s** with default settings.
- [PR #8770](https://github.com/unslothai/unsloth/pull/8770) speeds up the local model inventory and removes it from the API hot path. On an inventory with 109 rows, a cold `GET /api/hub/local` took about **5 seconds and blocked unrelated API work for 4+ seconds**.
- [PR #8771](https://github.com/unslothai/unsloth/pull/8771) reuses already-cached GGUF resolution work; one load path previously made **seven Hub round trips** for a file already present locally.
- [PR #8935](https://github.com/unslothai/unsloth/pull/8935) makes streaming code fence tokenization incremental instead of re-tokenizing the entire block on each refresh.
- [PR #8593](https://github.com/unslothai/unsloth/pull/8593) pairs diffusion warmup presets with a scheduler that actually honors the configured `lr_warmup_steps`.

---

### Stability & Regressions

Ranked by severity:

- [Issue #2482](https://github.com/unslothai/unsloth/issues/2482) — `RuntimeError: PassManager::run failed` during Qwen3-0.6B bnb-4bit training on Colab T4. Still open and the most-commented active bug.
- [Issue #1998](https://github.com/unslothai/unsloth/issues/1998) — “Unsloth: Your GPU is too old!” patching failure. Marked urgent and open.
- [Issue #8933](https://github.com/unslothai/unsloth/issues/8933) — Studio training blocked by `module 'torch' has no attribute 'float8_e8m0fnu'`; likely torch version mismatch.
- [Issue #8926](https://github.com/unslothai/unsloth/issues/8926) — Published dependency constraints block torch 2.13 security remediation ([GHSA-rrmf-rvhw-rf47](https://github.com/unslothai/unsloth/issues/8926)).
- [Issue #8858](https://github.com/unslothai/unsloth/issues/8858) — Attaching a PDF in Studio causes tool-call errors and generation failures.
- [PR #8939](https://github.com/unslothai/unsloth/pull/8939) fixes quantized KV cache being silently dropped when tensor splitting is enabled.
- [PR #8754](https://github.com/unslothai/unsloth/pull/8754) and [PR #8755](https://github.com/unslothai/unsloth/pull/8755) fix tool-call fragment routing when provider delta indices restart for each round.
- [Issue #8873](https://github.com/unslothai/unsloth/issues/8873) — UUID-form `CUDA_VISIBLE_DEVICES` silently hides the per-model GPU picker on healthy multi-GPU hosts.
- [Issue #8936](https://github.com/unslothai/unsloth/issues/8936) — Studio on Windows 11 cannot create a project.
- [Issue #8483](https://github.com/unslothai/unsloth/issues/8483) — Studio Deep Research freezes during the “Writing The Report” phase.
- [Issue #8678](https://github.com/unslothai/unsloth/issues/8678) — Unsloth Desktop microphone access fails on Ubuntu Mate because WebKitGTK media-stream is not enabled.

---

### What This Means for Application Developers

- Studio is actively converging on a local-first serving model: developers are asking for `0.0.0.0` listening, LAN access without Cloudflare, and no token requirement for local network serving ([#8578](https://github.com/unslothai/unsloth/issues/8578), [#8898](https://github.com/unslothai/unsloth/issues/8898), [#8934](https://github.com/unslothai/unsloth/issues/8934)). Expect this to become a first-class configuration option.
- The `max_steps` preprocessing fix matters for anyone doing quick fine-tune smoke tests or hyperparameter sweeps on large datasets — it removes a major source of wasted wall-clock time before training starts.
- Tool-call correctness work in Studio is directly relevant to agent developers: several delta-index and fragment-routing bugs were fixed this week, so streaming multi-tool assistant responses should be more reliable.
- No new release shipped in the last 24h, so pinning to current package versions remains safe. However, dependency constraints around torch 2.13 may block security patches — verify your environment if you are affected.
- For macOS developers using MLX runners, Studio will soon discover oMLX-installed models automatically, reducing friction when switching between local model runners.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*