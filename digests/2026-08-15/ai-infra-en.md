# AI Infrastructure Digest 2026-08-15

> Generated: 2026-08-14 23:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem

**Date:** 2026-08-15  
**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

The AI infrastructure landscape is bifurcating into two distinct tracks: datacenter-scale serving engines (vLLM, SGLang) racing to support frontier hybrid architectures like DeepSeek-V4, Kimi-K3, and Qwen3.8, and local/edge runtimes (llama.cpp, Ollama, Unsloth) focused on making 27B-class models viable on consumer hardware. AMD/ROCm remains the single largest cross-project liability — every project reports silent corruption, crashes, or performance regressions on MI300-class hardware, while NVIDIA Blackwell/SM120 enablement proceeds comparatively smoothly. Speculative decoding has moved from experimental feature to table-stakes infrastructure across both serving engines. Gateway and orchestration layers (LiteLLM) are consolidating on API-correctness and proxy reliability rather than kernel-level performance, reflecting a maturing separation of concerns between model execution and request routing.

---

## 2. Activity Comparison

| Project | Issues Cited | PRs Cited | Release Status (24h) | Primary Activity |
|---|---|---|---|---|
| **vLLM** | ~18 | ~20 | None | DeepSeek-V4-Flash SM120 fixes, Kimi-K3 DCP/RecoverSSM, CUDA 13.4/Rubin pipeline |
| **SGLang** | ~12 | ~16 | None | Kimi-K3 SiTU activation, AMD MI350/MXFP4, sparse-attention kernel work |
| **llama.cpp** | ~19 | ~19 | **11 releases** (b10425–b10435) | Server availability, Jinja template fixes, SYCL kernel fusion |
| **Ollama** | ~14 | ~6 | **3 patches** (v0.32.11–v0.32.13) | Qwen3.8-27B support + Apple Silicon tuning, metadata cache |
| **LiteLLM** | ~11 | ~14 | None | Anthropic passthrough decompression, Azure gpt-5-chat fix, Admin UI auth regression |
| **Unsloth** | ~15 | ~16 | **1 beta** (v0.1.800-beta) | Qwen3.8-27B release, ROCm/AOTriton fix, Dynamic GGUF, NVFP4 |

**Signal:** llama.cpp ships at an order-of-magnitude higher release cadence than the serving engines, reflecting its smaller blast radius per change. vLLM and SGLang are in heavy-development windows with no releases — operators should expect breaking-change density in the next tagged versions.

---

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **Qwen3.8-27B** | — | Validated on GB10 (FP8) | — | ✅ Shipped (v0.32.12) | ✅ Shipped (v0.1.800-beta) |
| **Kimi-K3** | ✅ DCP prefix-cache, RecoverSSM, torch.compile | ✅ SiTU activation, tool-call fixes | 🔄 Text-model PR open (#26185) | — | — |
| **DeepSeek-V4-Flash** | ✅ Sparse MLA on SM120 (3 decode modes) | 🔄 Sparse-attention indexer crashes | 🔄 ROCm RPC crash context | — | — |
| **MiniMax Text-01/M1 / H3** | — | 🔄 H3 B300 cache schedule | ✅ Text-01/M1 merged (#27018) | — | Feature request open (#8814) |
| **Nemotron VoiceChat S2S** | — | ✅ Shipped (#34873) | — | — | — |
| **Rubin (sm_107)** | ✅ CI/build pipeline | — | — | — | — |

**Verdict:** **Ollama and Unsloth win the Qwen3.8-27B race** for end-user availability. **vLLM carries the deepest frontier-model support** (Kimi-K3 + DeepSeek-V4 + next-gen hardware), but with a stability tax — its ROCm issues for DSV4 are severe enough that the digest itself recommends NVIDIA-only for GPU deployments. **SGLang is closest on Kimi-K3 serving correctness**, with explicit SiTU activation and tool-call parser fixes, but is held back by a ~30s PP8 prefill TTFT floor and sparse-attention illegal memory access. **llama.cpp is the only project shipping MiniMax-Text-01**, reinforcing its role as the most permissive runtime for newly released open-weight models.

---

## 4. Performance Frontier

Optimization effort is concentrated in five areas:

- **Speculative decoding / MTP:** vLLM lifted the pipeline-parallel ban on EAGLE3/dflash/dspark (#50514) and added Kimi-K3 RecoverSSM (#51855); SGLang shipped MTP cache mode with FlashInfer kernel integration (#30967). Both engines treating spec-decode as a first-class serving dimension. However, acceptance-length and correctness issues persist (vLLM #50722 on DFlash/Qwen3.5; SGLang #34786 hybrid-mamba + NEXTN TypeError).

- **Kernel fusion for hybrid architectures:** llama.cpp landed SYCL fused mul_mat(gate)+mul_mat(up)+GLU for q4_K (+2.8% on Arc Pro B70) and gated-delta-net state writeback fusion; SGLang fused norm+RoPE+FP8 store for TRT-LLM sparse attention; vLLM fixed DeepGEMM sparse-MLA coverage on SM120. This is the most cross-project-consistent theme — all six projects touch kernels adjacent to sparse/hybrid attention.

- **KV cache and offload:** vLLM added a KV-offload capacity metric (#49307); llama.cpp merged recurrent state rollback for `ggml_ssm_scan` (#26623); Ollama still has an open tiered-context VRAM exhaustion bug (#14116). Cache management is shifting from static allocation to dynamic, observable offload tiers.

- **Quantization:** Unsloth shipped NVFP4 for Qwen3.8-27B and Dynamic GGUF enabling 17GB-RAM inference; SGLang is doing online NVFP4→MXFP4 requantization for AMD MI355X; llama.cpp has an open CUDA decode crossover-tuning PR (mvq→MMQ). Caveat: Unsloth documents a CUDA 13.2 correctness regression for IQ2/IQ3 quants (#4849) — quantization progress is outpacing compiler-toolchain validation.

- **Batch invariance / determinism:** vLLM's `VLLM_BATCH_INVARIANT=1` on ROCm (#52231) and SGLang's router-GEMM fp32 determinism work (#34758) signal that reproducibility is becoming a deployment requirement for agentic workloads, not just a nice-to-have.

---

## 5. Layer Positioning

| Project | Layer | Primary Deployment Target | Key Differentiator |
|---|---|---|---|
| **vLLM** | High-throughput serving engine | Datacenter GPU clusters (NVIDIA primary, ROCm secondary) | Deepest frontier-model + hardware enablement (Rubin, SM120 sparse MLA); spec-decode under PP |
| **SGLang** | Serving engine (direct vLLM competitor) | Datacenter GPU clusters; expanding ROCm/NPU | Aggressive on AMD MI350/MXFP4; strong on open-model validation (GB10) |
| **llama.cpp** | Local/edge runtime (C/C++) | Single-node CPU/GPU/Intel/Apple; RPC multi-node | Highest release velocity; broadest hardware portability (SYCL, Vulkan, WASI); permissive model intake |
| **Ollama** | Local runtime + model distribution + agent launchers | Developer desktops, Apple Silicon, small servers | Distribution UX (`ollama pull/launch`); now bundling coding-agent launchers (Codex, DeepSeek Harness, Muse) |
| **LiteLLM** | LLM gateway / proxy | Control plane in front of any upstream | Provider-agnostic routing, auth, spend tracking; no kernel-level concerns — pure API-correctness |
| **Unsloth** | Fine-tuning + local inference (Studio/Desktop) | Researchers, edge workstations, AMD/Apple hardware | Fine-tuning + GGUF conversion + serving in one product; Qwen3.8-27B at 17GB RAM is the headline capability |

The stack is now visibly stratified: **LiteLLM assumes the serving engines below it work correctly** — its entire 24h issue list is proxy-level correctness (brotli decompression, `max_tokens` renaming, AuthN) with zero kernel/model concerns. **Ollama and Unsloth are converging on the same local-serve niche** from different directions: Ollama from distribution/UX, Unsloth from fine-tuning workflows. This in-between layer (local runtime + OpenAI-compatible API + agent launcher) is the most crowded, and also the site of the most user-facing regressions (SillyTavern empty responses, MCP breakage, `-H 0.0.0.0` binding).

---

## 6. Trend Signals

1. **Qwen3.8-27B is the model of the week.** Shipped across Ollama (with Apple Silicon tuning), Unsloth (fine-tuning + Dynamic GGUF + NVFP4), and validated on GB10 by SGLang. It targets the sweet spot for edge/lab-class agentic coding: 27B, instruction-tuned, small enough for 17GB RAM. Expect application developers to standardize on it for local agents — and expect a wave of Qwen3.8-specific runtime bugs in the next two weeks (Ollama already has three).

2. **Hybrid architectures (Mamba/KDA/GDN/MLA) are the new integration burden.** Every engine is contorting around non-attention state management: llama.cpp shipped recurrent state rollback, vLLM built RecoverSSM for Kimi-K3, SGLang is fixing router-GEMM/EPLB interactions. The cost of hybrid-model support is showing up as a long tail of subtle correctness bugs (silent retrieval corruption on ROCm, MTP crashes, prefix-cache misses on Mamba-2 hybrids). If you deploy hybrid models in production, budget for validation overhead.

3. **AMD/ROCm remains the strategic bottleneck.** All six projects touch ROCm; four report active severity-1/2 issues (vLLM DSV4 silent corruption on MI325X, llama.cpp gfx1151 RPC crash, SGLang AITER router-GEMM dtype, Unsloth AOTriton gate causing training OOM). The gap is not kernel coverage — it's correctness and validation maturity. AMD deployments of frontier models are not production-safe; treat them as experimental.

4. **Speculative decoding is expanding faster than its correctness guarantees.** vLLM lifted PP restrictions and added RecoverSSM; SGLang integrated FlashInfer MTP cache; llama.cpp ships recurrent-state rollback — but acceptance-length regressions, hybrid-model crashes, and negative CUDA-graph memory estimates persist across all three. The capability surface is growing faster than the test matrix.

5. **Agentic tool-calling correctness is the new API battleground.** SGLang fixed Kimi-K3 tool-call parsing (#34881), Unsloth preserves pre-tool reasoning through GGUF loops (#8581), Ollama broke Claude Code with a system-message placement bug (#17754), LitellMM is fixing Anthropic passthrough decompression that silently corrupts tool responses. As agents multiply, the failure mode that matters is no longer throughput — it's whether structured tool calls survive the round trip. This is where the next wave of production incidents will come from.

6. **Gateway and runtime layers are maturing in opposite directions.** LiteLLM's entire 24h window is proxy correctness and AuthN edge cases — a sign the gateway layer is consolidating. Meanwhile, Ollama/unsloth are expanding into agent-launcher territory (DeepSeek Harness, Muse Code, Codex), pulling the local runtime up the stack. Watch for gateway-runtime overlap in the next 6–12 months as agent workloads demand a unified session/state layer.

---

**Bottom line for infrastructure engineers:** If you're on NVIDIA and serving frontier models, vLLM remains the right default — but pin versions and validate spec-decode paths. If you're targeting edge/Apple Silicon, Ollama and Unsloth give you the fastest path to Qwen3.8-27B today, with Ollama ahead on distribution UX and Unsloth ahead on fine-tuning and quantization. If you're on AMD, allocate budget for validation and pin known-good commits. If you run agents in production, audit your tool-call pipeline end-to-end — that's where the ecosystem's rough edges are currently concentrated.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-15

## 1. Today's Highlights

DeepSeek-V4-family enablement dominates: [#51538](https://github.com/vllm-project/vllm/pull/51538) fixes seven defects blocking DeepSeek-V4-Flash on SM120 sparse MLA across plain decode, MTP, and DSpark, while new and ongoing ROCm threads report silent retrieval corruption and worker crashes on MI325X ([#52109](https://github.com/vllm-project/vllm/issues/52109), [#48266](https://github.com/vllm-project/vllm/issues/48266)). Kimi-K3 support advances on several fronts — DCP partial prefix-cache hits ([#50493](https://github.com/vllm-project/vllm/pull/50493)), a new RecoverSSM speculative-decoding path ([#51855](https://github.com/vllm-project/vllm/pull/51855)), and torch.compile enablement on ROCm ([#52190](https://github.com/vllm-project/vllm/pull/52190)). Infra work includes a CUDA 13.4 prerelease pipeline for Rubin ([#52379](https://github.com/vllm-project/vllm/pull/52379)) and lifting the pipeline-parallel ban on EAGLE3-style speculative decoding ([#50514](https://github.com/vllm-project/vllm/pull/50514)).

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Behavior changes to watch:

- **FA4 head-dim 256 temporarily disabled on Blackwell** — [#52050](https://github.com/vllm-project/vllm/pull/52050): the SM100 2-CTA kernel rejects `seqused_q/k`; vLLM falls back to FA2 for head-dim 256 until upstream adds support.
- **Structured-output error semantics** — [#52394](https://github.com/vllm-project/vllm/pull/52394): validators now raise `VLLMValidationError` instead of raw `ValueError`, so bad `response_format` schemas return 400 instead of an opaque 500.
- **CUDA 13.4rc1 image pipeline** — [#52379](https://github.com/vllm-project/vllm/pull/52379): image-only prerelease path for Rubin (`sm_107`), overlaying `cuda-toolkit==13.4.0rc1` PyPI packages and pinned PyTorch nightlies.
- **PTX arch requests now warn** — [#51901](https://github.com/vllm-project/vllm/pull/51901): `+PTX` in `TORCH_CUDA_ARCH_LIST` is silently ignored today; CMake will warn.

## 3. New Model & Hardware Support

- **Kimi-K3**: DCP partial-prefix reuse with MRV2 block-table geometry fixes ([#50493](https://github.com/vllm-project/vllm/pull/50493)); `--use-replayssm` RecoverSSM path for DSpark serving with `mamba_cache_mode=align` ([#51855](https://github.com/vllm-project/vllm/pull/51855)); torch.compile/`@support_torch_compile` on ROCm for AITER fusion kernels ([#52190](https://github.com/vllm-project/vllm/pull/52190)). ROCm gap tracking in [#50682](https://github.com/vllm-project/vllm/issues/50682) (AITER fused-moe a16w4/a8w4 baselines, Flydsl/Opus work).
- **DeepSeek-V4-Flash**: sparse MLA works end-to-end on SM120 for all three decode modes via [#51538](https://github.com/vllm-project/vllm/pull/51538); ROCm enablement/optimization checklist tracked in [#41820](https://github.com/vllm-project/vllm/issues/41820).
- **Rubin (`sm_107`)**: initial CUDA 13.4rc1 CI/build support ([#52379](https://github.com/vllm-project/vllm/pull/52379)).
- **ModelRunnerV2**: prompt-embeds support ([#42963](https://github.com/vllm-project/vllm/pull/42963)) with `True-uni`/`True-mp` correctness tests under `VLLM_USE_V2_MODEL_RUNNER=1`.
- **Speculative decoding under pipeline parallelism** — [#50514](https://github.com/vllm-project/vllm/pull/50514): removes the hard rejection of `eagle3`/`dflash`/`dspark` with PP by running the drafter on the last PP rank.
- **ROCm batch invariance** — [#52231](https://github.com/vllm-project/vllm/pull/52231): `VLLM_BATCH_INVARIANT=1` leverages 1-stage CustomAllReduce/CustomReduceScatter algorithms.

## 4. Performance & Optimization

- **DSV4 Pro MTP on MI325X is untuned** ([#51853](https://github.com/vllm-project/vllm/issues/51853)): SemiAnalysis InferenceX continuous benchmarks show scattered, erratic throughput on agentic-trace workloads with TP8; ROCm MTP kernels flagged.
- **DFlash accepted length only 5–6 on Qwen3.5-35B-A3B** ([#50722](https://github.com/vllm-project/vllm/issues/50722)): poor performance with and without dflash; open investigation.
- **Negative CUDA graph memory estimation (-35.69 GiB)** ([#44740](https://github.com/vllm-project/vllm/issues/44740)): MTP spec decode on GB10 causes KV-cache over-allocation and OOM.
- **K3 RecoverSSM** ([#51855](https://github.com/vllm-project/vllm/pull/51855)): adds a Kimi-K3 state-recovery path for speculative KDA decode, intended for DSpark deployments.
- **KV offload capacity metric** ([#49307](https://github.com/vllm-project/vllm/pull/49307)): `vllm:kv_offload_cpu_total_blocks` Info gauge reports `num_blocks`, `blocks_per_gpu`, etc., for the native CPU/tiered offload connector.
- **DeepGEMM SM 12.x gaps** ([#41063](https://github.com/vllm-project/vllm/issues/41063)): kernel-coverage mapping for DSV4-Flash on RTX 50/GB10 remains tracked; MTP3 NV kernel support requested in [#35878](https://github.com/vllm-project/vllm/issues/35878).

## 5. Stability & Regressions

Ranked by severity:

1. **DSV4-Flash silent retrieval corruption on ROCm/gfx942** — [#52109](https://github.com/vllm-project/vllm/issues/52109): prompts ≥4–5k tokens corrupt silently via AITER sparse indexer on 8×MI325X; reproduces on nightly with backports. Fixes: [#51821](https://github.com/vllm-project/vllm/pull/51821) (merged 08-13), [#52058](https://github.com/vllm-project/vllm/pull/52058)/[#51252](https://github.com/vllm-project/vllm/pull/51252) (open).
2. **GPU memory access fault / worker crash on ROCm/gfx942** — [#48266](https://github.com/vllm-project/vllm/issues/48266): DSV4 flash arch with `sparse_attn_indexer` + fp8 KV cache crashes past 2048 tokens on MI325X TP=4.
3. **`libcudart.so.13` ImportError** — [#52300](https://github.com/vllm-project/vllm/issues/52300): vLLM 0.21.0 on CUDA 12.6 fails to import; reported today.
4. **NVFP4 Marlin EngineDeadError** — [#49926](https://github.com/vllm-project/vllm/issues/49926): engine death on aarch64/Ubuntu 24.04.
5. **DSV4-Flash garbled output with inline system messages** — [#46710](https://github.com/vllm-project/vllm/issues/46710): regression from [#46025](https://github.com/vllm-project/vllm/pull/46025) with three divergent chat-template paths; 24 comments.
6. **Prefix caching ineffective on Mamba-2/GDN hybrids** — [#51250](https://github.com/vllm-project/vllm/issues/51250): no reuse benefit on Qwen3.x-35B-A3B hybrid on GB10.
7. **Spec-decode bad_words off-by-one** — [#52311](https://github.com/vllm-project/vllm/pull/52311): fixed in the `_bad_words_kernel` draft-prefix matching.
8. **Fixed today**: `max_offload_tokens` assertion below partial-tail boundary ([#52397](https://github.com/vllm-project/vllm/pull/52397)); DSpark crash on non-dict `hf_overrides` ([#52396](https://github.com/vllm-project/vllm/pull/52396)); speculative decoding crash for short_conv/LFM2 models ([#50272](https://github.com/vllm-project/vllm/pull/50272)); ROCm `supports_mm_prefix` now returns False where prefix-LM is unimplemented ([#52395](https://github.com/vllm-project/vllm/pull/52395)).
9. **Also active**: Mamba-2 Triton illegal-instruction on SM121 ([#37431](https://github.com/vllm-project/vllm/issues/37431)); mixed-precision compressed-tensors draft checkpoints fail to load ([#49893](https://github.com/vllm-project/vllm/issues/49893)); DSV4-Pro TP=16 fp8 block-shape check contradicts official recipe ([#42384](https://github.com/vllm-project/vllm/issues/42384)); entrypoint error-handling standardization RFC ([#48227](https://github.com/vllm-project/vllm/issues/48227)); race-free port management RFC ([#51275](https://github.com/vllm-project/vllm/issues/51275)).

## 6. What This Means for Application Developers

- **DeepSeek-V4 on ROCm/AMD is not production-ready**: silent corruption and worker crashes at scale on MI325X mean pinning fix PRs and validating outputs; GPU-backed deployments should stay on NVIDIA for now.
- **Speculative decoding is broadening fast**: PP + EAGLE3/dflash/dspark ([#50514](https://github.com/vllm-project/vllm/pull/50514)), LFM2 short_conv support ([#50272](https://github.com/vllm-project/vllm/pull/50272)), and DSV4 sparse MLA ([#51538](https://github.com/vllm-project/vllm/pull/51538)) all expand topology choices — but verify DFlash acceptance lengths on hybrid models ([#50722](https://github.com/vllm-project/vllm/issues/50722)).
- **Structured-output consumers get correct 400s** for bad schemas once [#52394](https://github.com/vllm-project/vllm/pull/52394) lands; if you run Ray Serve LLM on vLLM 0.27, note the new error semantics.
- **Kimi-K3 at scale** gains DCP prefix-cache reuse and RecoverSSM for DSpark — relevant for long-context agentic workloads; watch the ROCm roadmap ([#50682](https://github.com/vllm-project/vllm/issues/50682)).
- **Cache/offload operators** get a capacity metric ([#49307](https://github.com/vllm-project/vllm/pull/49307)) — useful for autoscaling offload tiers; also expect batch-invariant inference on ROCm via `VLLM_BATCH_INVARIANT=1` ([#52231](https://github.com/vllm-project/vllm/pull/52231)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-08-15

### Today’s Highlights
- No releases shipped in the last 24 hours; activity is concentrated on kernel bring-up, model compatibility, and open regression triage.
- Key model work includes explicit SiTU activation for Kimi-K3 MegaMoE ([#34883](https://github.com/sgl-project/sglang/pull/34883)), NemotronLabs VoiceChat S2S support ([#34873](https://github.com/sgl-project/sglang/pull/34873)), and continued AMD MI350/MXFP4 enablement ([#29328](https://github.com/sgl-project/sglang/pull/29328), [#34014](https://github.com/sgl-project/sglang/pull/34014)).
- The main stability risks are in long-context / MoE paths: DeepSeek-V4 sparse-attention illegal memory access ([#34718](https://github.com/sgl-project/sglang/issues/34718)), a Kimi-K3 PP8 prefill TTFT floor ([#34815](https://github.com/sgl-project/sglang/issues/34815)), and router-GEMM dtype regressions on NPU/ROCm ([#34861](https://github.com/sgl-project/sglang/issues/34861), [#34857](https://github.com/sgl-project/sglang/issues/34857)).

### Releases & Breaking Changes
- None in the last 24 hours.

### New Model & Hardware Support
- **Kimi-K3 / MegaMoE**: switch to explicit SiTU activation via DeepGEMM, replacing the activation-clamp sentinel ([#34883](https://github.com/sgl-project/sglang/pull/34883)).
- **NemotronLabs VoiceChat 11B**: S2S deployment support added; previously only vLLM was supported ([#34873](https://github.com/sgl-project/sglang/pull/34873)).
- **Qwen3.8-27B-FP8**: validated on a single DGX Spark / GB10 at `mem-fraction-static 0.70` ([#34872](https://github.com/sgl-project/sglang/issues/34872)).
- **AMD / ROCm**:
  - Online NVFP4-to-MXFP4 requantization for ModelOpt/Quark checkpoints on AMD MI355X ([#29328](https://github.com/sgl-project/sglang/pull/29328)).
  - Proposed Kimi-K3 8-GPU MI35x nightly accuracy CI ([#32568](https://github.com/sgl-project/sglang/pull/32568)).
  - GPT-OSS throughput added to ROCm 7.2 nightly coverage ([#34645](https://github.com/sgl-project/sglang/pull/34645)).
- **NPU / diffusion**: LTX-2/2.3 inference optimization for NPU ([#34722](https://github.com/sgl-project/sglang/pull/34722)).

### Performance & Optimization
- **DeepSeek-V4 sparse attention**: fused norm + RoPE + uniform FP8 store for the TRT-LLM sparse-attention path ([#32975](https://github.com/sgl-project/sglang/pull/32975)).
- **GDN / MTP**: MTP cache mode for final-state recompute with FlashInfer kernel integration and overlapped CUDA-graph state recovery ([#30967](https://github.com/sgl-project/sglang/pull/30967)).
- **MiniMax-H3 on B300**: Cache-DiT schedule retuned for 8x B300 as `(4, 0.24, 3)` versus the conservative `(4, 0.04, 1)` on 4x H200 ([#34841](https://github.com/sgl-project/sglang/pull/34841)).
- **Qwen3.5 FP8 GB300 nightly**: performance batches trimmed to remove redundant coverage while retaining MTP and DP variants ([#34882](https://github.com/sgl-project/sglang/pull/34882)).
- **AMD MI350**: ongoing work to improve M3 performance ([#34014](https://github.com/sgl-project/sglang/pull/34014)).
- The kernel auto-tuner roadmap remains an active long-term topic ([#13363](https://github.com/sgl-project/sglang/issues/13363)).

### Stability & Regressions
Severity-ranked open or recently active issues:

1. **DeepSeek-V4 sparse-attention indexer illegal memory access** with long-context requests in `fp8_paged_mqa_logits` ([#34718](https://github.com/sgl-project/sglang/issues/34718)).
2. **Kimi-K3 PP8 disaggregated prefill TTFT floor**: load-independent ~30 s TTFT when prefill uses pipeline parallelism ([#34815](https://github.com/sgl-project/sglang/issues/34815)).
3. **Router GEMM dtype issues**:
   - NPU: router GEMM returns bf16 instead of fp32 ([#34861](https://github.com/sgl-project/sglang/issues/34861)).
   - ROCm/AITER: expert correction bias should not be cast to bf16 ([#34857](https://github.com/sgl-project/sglang/issues/34857)).
   - Deterministic inference: DeepSeek V3/V4 router GEMM should keep fp32 output ([#34758](https://github.com/sgl-project/sglang/issues/34758)).
4. **`SGLANG_SIMULATE_ACC_LEN` detokenization regression**: silently degrades incremental detokenization to O(n²) ([#34740](https://github.com/sgl-project/sglang/issues/34740)).
5. **Hybrid-mamba + speculative decoding**: `TypeError` in `set_mamba_track_indices_from_reqs` during NEXTN `TARGET_VERIFY` ([#34786](https://github.com/sgl-project/sglang/issues/34786)).
6. **XPU**: Qwen3.5 GDN + speculative decode fails with `causal_conv1d_update_xpu()` unexpected keyword ([#34720](https://github.com/sgl-project/sglang/issues/34720)).
7. **FlashInfer coredump** in `RadixTopKRenormProbKernel_MultiCTA` ([#32283](https://github.com/sgl-project/sglang/issues/32283)).
8. **API correctness**: `/v1/responses` returns `created_at` as float in streaming events but int in non-streaming responses ([#34716](https://github.com/sgl-project/sglang/issues/34716)).
9. **Cache layer**: HiCache L1+L2 with Mooncake SSD shows variable cache-hit rates even with sufficient SSD capacity ([#33984](https://github.com/sgl-project/sglang/issues/33984)).

Fix or related PRs in flight:
- Qwen3 MoE compatibility for DeepEP-class backends and early EPLB state ([#34810](https://github.com/sgl-project/sglang/pull/34810)).
- DSA path switched to FlashInfer fused top-k for packed PAGED rows ([#33006](https://github.com/sgl-project/sglang/pull/33006)).
- Avoid JSON-decoding native-format output on required tool choice — addresses Kimi-K3 tool-call parse failures ([#34881](https://github.com/sgl-project/sglang/pull/34881)).

### What This Means for Application Developers
- If you consume `/v1/responses`, normalize `created_at` across streaming and non-streaming responses; current behavior is inconsistent ([#34716](https://github.com/sgl-project/sglang/issues/34716)).
- If you run Kimi-K3 for agentic tool calling, watch for the tool-call parser fix in [#34881](https://github.com/sgl-project/sglang/pull/34881); raw-text fallback can silently break agent loops.
- For multi-node Kimi-K3 deployments, validate TTFT carefully under disaggregated PP8; the ~30 s floor is not load-dependent and may be topology-related ([#34815](https://github.com/sgl-project/sglang/issues/34815)).
- AMD/NPU users running DeepSeek-style MoE models should verify router-GEMM dtype behavior, especially with deterministic inference enabled ([#34758](https://github.com/sgl-project/sglang/issues/34758)).
- Programmatic serving users benefit from improved LoRA validation for single-string prompts ([#34885](https://github.com/sgl-project/sglang/pull/34885)) and explicit model-loader class handling ([#34880](https://github.com/sgl-project/sglang/pull/34880)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-15

## Today's Highlights

The latest release train (b10425–b10435) focuses on server availability, Jinja/template correctness, and SYCL kernel fusion. Key items: **b10434** threads OpenAI `reasoning_effort` into chat templates, **b10435** fixes a quadratic-cost bug in Jinja `gather_string_parts`, and **b10429** allows `/metrics` and `/slots` to be served during `llama_decode()`. On the model side, MiniMax-Text-01/M1 support is in via PR #27018, and a Kimi-K3 text-model PR is open.

## Releases & Breaking Changes

No explicit breaking changes or migration notes were announced in this window. The new build is **b10435**.

- **b10435** — jinja: fix quadratic cost in `gather_string_parts` ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10435), [PR #27034](https://github.com/ggml-org/llama.cpp/pull/27034))
- **b10434** — chat: pass `reasoning_effort` to Jinja templates ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10434))
- **b10433** — sync ggml ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10433))
- **b10431** — ggml: recurrent state rollback for `ggml_ssm_scan` ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10431), [PR #26623](https://github.com/ggml-org/llama.cpp/pull/26623))
- **b10430** — llama: allow virtual iGPU devices ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10430), [PR #26953](https://github.com/ggml-org/llama.cpp/pull/26953))
- **b10429** — server: allow accessing `/metrics` and `/slots` during `llama_decode()` ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10429), [PR #27041](https://github.com/ggml-org/llama.cpp/pull/27041))
- **b10428** — tests: replace personal home-directory paths with placeholders ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10428), [PR #27043](https://github.com/ggml-org/llama.cpp/pull/27043))
- **b10427** — SYCL: fuse `mul_mat(gate) + mul_mat(up) + GLU` for q4_K dense FFN ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10427), [PR #26779](https://github.com/ggml-org/llama.cpp/pull/26779))
- **b10426** — ggml: force single thread on WASI ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10426), [PR #25686](https://github.com/ggml-org/llama.cpp/pull/25686))
- **b10425** — SYCL: fuse gated-delta-net state writeback `cpy` ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10425), [PR #26643](https://github.com/ggml-org/llama.cpp/pull/26643))

## New Model & Hardware Support

- **MiniMax-Text-01 / MiniMax-M1** support added; closes the long-standing feature request ([PR #27018](https://github.com/ggml-org/llama.cpp/pull/27018), [issue #11290](https://github.com/ggml-org/llama.cpp/issues/11290)).
- **Kimi-K3 text model** PR is open: hybrid KDA/MLA + cross-layer residual attention + latent MoE ([PR #26185](https://github.com/ggml-org/llama.cpp/pull/26185)).
- **DSA RoPE optimization** for DSA indexer heads, removing some `ggml_concat` ops and simplifying ds3.2/glm-dsa/dsv4 layout handling ([PR #27091](https://github.com/ggml-org/llama.cpp/pull/27091)).
- **Virtual iGPU devices** are now allowed ([PR #26953](https://github.com/ggml-org/llama.cpp/pull/26953)).
- **AMD iGPU / UMA memory detection** fixes are landing: skip UMA override for HIP builds ([PR #27083](https://github.com/ggml-org/llama.cpp/pull/27083), fixes [#18159](https://github.com/ggml-org/llama.cpp/issues/18159)) and sysfs VRAM detection for AMD iGPUs ([PR #26932](https://github.com/ggml-org/llama.cpp/pull/26932)).

## Performance & Optimization

- **SYCL dense-FFN fusion** for q4_K: measured on Arc Pro B70, `qwen2.5-3B-Instruct Q4_K_M` improved **154.18 → 158.53 t/s (+2.8%)** at tg128 ([PR #26779](https://github.com/ggml-org/llama.cpp/pull/26779)).
- **SYCL gated-delta-net state writeback fusion** landed; A/B performance data for Qwen3.6 27B Q4_K on Arc Pro B70 is in the PR ([PR #26643](https://github.com/ggml-org/llama.cpp/pull/26643)).
- **SYCL TILE for quantized KV decode** is in review: +42% to +169% on Qwen3.6-35B, Gemma 4 26B and Gemma 4 12B at 32K/118K context ([PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689)).
- **Arm CPU flash-attention fix**: `-fa auto` now resolves to *off* on Neoverse V1/V2 (e.g. Graviton3/4) where the tiled path is slower ([PR #27092](https://github.com/ggml-org/llama.cpp/pull/27092)).
- **Recurrent state rollback** for `ggml_ssm_scan` on CPU/CUDA landed, with CPU rollback disabled for later enablement ([PR #26623](https://github.com/ggml-org/llama.cpp/pull/26623)).
- **CUDA decode crossover tuning** is open: per-hardware/per-quant switch points for `mvq → MMQ` decode ([PR #26079](https://github.com/ggml-org/llama.cpp/pull/26079)).
- **Tensor prefetch overrides** remain an open PoC on CUDA, overlapping layer compute with weight prefetch ([PR #21067](https://github.com/ggml-org/llama.cpp/pull/21067)).
- **Known performance issue**: offloaded-MoE prefills leave the GPU idle on serial expert H2D copies ([#25859](https://github.com/ggml-org/llama.cpp/issues/25859)).

## Stability & Regressions

Ranked by severity; open unless otherwise noted.

1. **Critical — Remote RPC NULL-pointer dereference** in `ggml-rpc graph_compute()` via node id `0` ([#25299](https://github.com/ggml-org/llama.cpp/issues/25299)). No fix PR linked. Do not expose ggml-rpc to untrusted networks.
2. **High — SYCL completely broken on Intel A770** at build 10428; crashes on A770 while B60 works ([#27063](https://github.com/ggml-org/llama.cpp/issues/27063)).
3. **High — SIGSEGV / null-ptr jump on GPU offload** with `resolve_fused_ops` false-positives on Intel Lunar Lake iGPU (Arc 140V); reproduces on gemma4 and qwen2 ([#27046](https://github.com/ggml-org/llama.cpp/issues/27046)).
4. **High — llama-server crashes on CUDA with Qwen3.6-27B** ([#23210](https://github.com/ggml-org/llama.cpp/issues/23210)).
5. **High — ROCm gfx1151 RPC worker crash in `GGML_OP_TOP_K`** during DeepSeek V4 prefill after 4096 tokens ([#26746](https://github.com/ggml-org/llama.cpp/issues/26746)).
6. **High — Windows ROCm 7.14 release missing `hipblas.dll`**, GPU not detected ([#26996](https://github.com/ggml-org/llama.cpp/issues/26996)). Another report says Windows ROCm is not using GPU ([#26964](https://github.com/ggml-org/llama.cpp/issues/26964)).
7. **Medium — Gemma 4 31B MTP draft crashes on Vulkan** with pre-allocated tensor / operation NONE ([#24492](https://github.com/ggml-org/llama.cpp/issues/24492)).
8. **Medium — GLM-5.2 crashes on multi-node CUDA RPC** with `invalid data ptr` / `graph_compute failed` ([#26583](https://github.com/ggml-org/llama.cpp/issues/26583)).
9. **Medium — Qwen3-VL image embedding doesn't work** on Vulkan ([#25088](https://github.com/ggml-org/llama.cpp/issues/25088)).
10. **Medium — DeepSeek-V4-Flash degenerates into repetition and leaks special tokens** in long agentic chats on Metal ([#26694](https://github.com/ggml-org/llama.cpp/issues/26694)).
11. **Medium — SYCL fused kernels on Intel Arc 140V fail** with `OUT_OF_RESOURCES` ([#25502](https://github.com/ggml-org/llama.cpp/issues/25502)).
12. **Hardening PR available**: LoRA loader tensor bounds check ([#27056](https://github.com/ggml-org/llama.cpp/pull/27056)) and MTMD/common validation fixes for invalid `n_merge`, negative `--spec-draft-n-max`, and attention-window limits ([#27071](https://github.com/ggml-org/llama.cpp/pull/27071)).
13. **Perf regressions being tracked**: Vulkan performance drop in recent builds ([#24066](https://github.com/ggml-org/llama.cpp/issues/24066)), Gemma 4 tg128 low on RTX 5060 Ti ([#26674](https://github.com/ggml-org/llama.cpp/issues/26674)), SYCL host-pinned memory high CPU usage ([#27038](https://github.com/ggml-org/llama.cpp/issues/27038)), ROCm reporting incorrect free VRAM ([#24906](https://github.com/ggml-org/llama.cpp/issues/24906)).
14. **Closed/resolved in this window**: Qwen3.6-27B cache re-processing issue closed ([#22746](https://github.com/ggml-org/llama.cpp/issues/22746)); Muse Glimmer tool-call format issue closed ([#27025](https://github.com/ggml-org/llama.cpp/issues/27025)); Granite4 Vision image sequence assembly fix closed ([PR #26653](https://github.com/ggml-org/llama.cpp/pull/26653)).

## What This Means for Application Developers

- **Server observability improved**: `/metrics` and `/slots` are now accessible during decode, so monitoring dashboards no longer stall during long inference calls ([b10429](https://github.com/ggml-org/llama.cpp/releases/tag/b10429)).
- **Template authors should update for `reasoning_effort`**: b10434 exposes OpenAI `reasoning_effort` to Jinja templates. Custom chat templates can now branch on it, and the `gather_string_parts` fix in b10435 removes a quadratic cost on prompt rendering ([b10435](https://github.com/ggml-org/llama.cpp/releases/tag/b10435)).
- **Recurrent/hybrid model serving is getting safer**: recurrent state rollback landed ([PR #26623](https://github.com/ggml-org/llama.cpp/pull/26623)), and checkpoint preservation across slot save/restore is being worked on ([PR #25592](https://github.com/ggml-org/llama.cpp/pull/25592), [PR #26004](https://github.com/ggml-org/llama.cpp/pull/26004)).
- **If you run ggml-rpc**: avoid exposing it beyond trusted hosts until the NULL-deref issue is addressed ([#25299](https://github.com/ggml-org/llama.cpp/issues/25299)).
- **Backend choice matters more this week**: SYCL users on Intel Arc get real wins from the new fused kernels, while Intel A770 SYCL is currently broken at b10428 ([#27063](https://github.com/ggml-org/llama.cpp/issues/27063)). CUDA users should watch the Qwen3.6-27B crash reports ([#23210](https://github.com/ggml-org/llama.cpp/issues/23210)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama Digest — 2026-08-15

### 1. Today's Highlights
Three patch releases (v0.32.11–v0.32.13) landed, adding Qwen 3.8 27B support with Apple Silicon optimizations, plus DeepSeek Harness and Muse Code cod‑agent launchers. A new metadata‑cache PR cuts ~300 ms of per‑request overhead, while several regressions (CUDA/Vulkan crashes, Cloud API 503) are fresh and unresolved.

### 2. Releases & Breaking Changes
- **[v0.32.13](https://github.com/ollama/ollama/releases/tag/v0.32.13)** – Qwen3.8: supports developer instructions in the chat template.
- **[v0.32.12](https://github.com/ollama/ollama/releases/tag/v0.32.12)** – Adds Qwen 3.8 27B model support, with explicit optimization work for Apple Silicon.
- **[v0.32.11](https://github.com/ollama/ollama/releases/tag/v0.32.11)** – `ollama launch dsh` now supports DeepSeek Harness; `ollama launch muse` supports Meta’s Muse Code; continues OpenAI-compatible responses work.

No breaking config or API changes in these releases.

### 3. New Model & Hardware Support
- **Qwen 3.8 27B** – Full support in [v0.32.12](https://github.com/ollama/ollama/releases/tag/v0.32.12), with Apple Silicon optimizations.
- **Qwen3.8 renderer & MLX import** – [PR #17745](https://github.com/ollama/ollama/pull/17745) adds safetensors import support, reasoning-effort handling, and MLX coverage.
- **Sharded GGUF from Hugging Face** – [PR #17743](https://github.com/ollama/ollama/pull/17743) enables `ollama pull` for multi‑part GGUF repos; addresses long-standing request [Issue #5245](https://github.com/ollama/ollama/issues/5245).
- **WebP vision input** – [PR #17755](https://github.com/ollama/ollama/pull/17755) transcodes WebP images to PNG for llama-server.

### 4. Performance & Optimization
- **[PR #17752](https://github.com/ollama/ollama/pull/17752)** – Adds a model metadata cache to avoid re-reading GGUF metadata on every inference call, saving ~300 ms per request; invalidates automatically on manifest changes.
- **[v0.32.12](https://github.com/ollama/ollama/releases/tag/v0.32.12)** – Includes “maximum” performance tuning for Qwen 3.8 on Apple Silicon (new MLX build path).

### 5. Stability & Regressions
Ranked by severity:

- **Ollama Cloud API 503 outage** – [Issue #17756](https://github.com/ollama/ollama/issues/17756) – `api.ollama.cloud` down since Aug 14; all keys affected, website/alternative endpoints exhibit high latency.
- **CUDA illegal memory access on qwen3.6:35b** – [Issue #17740](https://github.com/ollama/ollama/issues/17740) – Deterministic crash during prefill for prompts ≥684 tokens; regression between 0.31.2 and 0.32.9. No fix PR yet.
- **AMD Radeon 780M Vulkan regression** – [Issue #17748](https://github.com/ollama/ollama/issues/17748) – v0.32.11 fails on larger models with `ErrorDeviceLost`; earlier versions work.
- **AMD Strix Halo VRAM detection regression** – [Issue #16462](https://github.com/ollama/ollama/issues/16462) – Container deployments report only 2 GB VRAM since 0.30.0‑rocm.
- **SillyTavern text completion returns empty** – [Issue #17700](https://github.com/ollama/ollama/issues/17700) – Reverting to 0.32.7 fixes; no fix PR yet.
- **Nemotron3.5-lightning stalls on AMD AI395+** – [Issue #17692](https://github.com/ollama/ollama/issues/17692) – Stalls mid-thinking; Ctrl+C recovers.
- **Quantized KV cache halts generation on ROCm** – [Issue #17347](https://github.com/ollama/ollama/issues/17347) – qwen3.5/qwen3.6 stops instead of emitting tool calls; severity tracks KV quant precision.
- **llama3.3:70b token failures since v0.32.2** – [Issue #17379](https://github.com/ollama/ollama/issues/17379) – Garbage tokens after auto-upgrade; not caused by prompt changes.
- **Tiered context length can exhaust VRAM** – [Issue #14116](https://github.com/ollama/ollama/issues/14116) – Default 262k context on ≥48 GB VRAM systems can OOM.
- **API compatibility regressions**:
  - `/v1/chat/completions` ignores Modelfile `temperature` – [Issue #17744](https://github.com/ollama/ollama/issues/17744)
  - Qwen3.8:27b returns 500 “system message must be at the beginning” in Claude Code – [Issue #17754](https://github.com/ollama/ollama/issues/17754); fix in [PR #17757](https://github.com/ollama/ollama/pull/17757)
  - qwen3.8:27b-mlx rejects developer role on `/v1/responses`, breaking `ollama launch codex` – [Issue #17750](https://github.com/ollama/ollama/issues/17750); addressed by Qwen3.8 developer-instruction handling in [PR #17749](https://github.com/ollama/ollama/pull/17749)
  - `muse-glimmer:30b-mlx` leaks harmony tokens and ignores `response_format` – [Issue #17684](https://github.com/ollama/ollama/issues/17684)

### 6. What This Means for Application Developers
- **Qwen3.8 27B is now a first-class citizen** – especially on Apple Silicon; expect developers to adopt it for local coding agents. Watch for the 500/system-message and developer-role fixes landing in the next patch.
- **Coding-agent integrations are expanding quickly** – DeepSeek Harness and Muse Code join the `ollama launch` family, but stability is still rough on AMD/Vulkan and older OpenAI endpoints.
- **Recent regressions are real** – if you hit empty responses (SillyTavern), CUDA crashes (qwen3.6), or temperature being ignored on `/v1/chat/completions`, pin to known-good versions (e.g., 0.32.7 for SillyTavern) and track the linked issues.
- **Performance improvement incoming** – the metadata cache PR should reduce per-request overhead for chat/generate calls; useful if you’re paying latency on small prompts.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-15

## 1. Today's Highlights
No releases landed in the last 24 hours, but the repo saw a high volume of proxy-correctness PRs. The most impactful work targets decompression failures in Anthropic passthrough, Azure `gpt-5-chat` `max_tokens` incompatibility, a critical Admin UI auth regression, and stricter Anthropic `/v1/models` schema compliance. Several stability fixes for spend-buffer durability and Prisma cached-plan recovery are also in flight.

## 2. Releases & Breaking Changes
None in the last 24 hours. No new versions, migration notes, or breaking API changes were published.

## 3. New Model & Hardware Support
No new models, backends, or quantization formats were released in this window. Some in-progress compatibility fixes:

- Azure `gpt-5-chat` deployments: fix to rename `max_tokens` → `max_completion_tokens` – [#36857](https://github.com/BerriAI/litellm/pull/36857)
- Closed: `gpt-5.6` family function-tool `reasoning_effort` error – [#33221](https://github.com/BerriAI/litellm/issues/33221)
- Open feature requests: Fireworks AI models in Azure Foundry – [#26618](https://github.com/BerriAI/litellm/issues/26618), Ollama text-to-image support – [#28026](https://github.com/BerriAI/litellm/issues/28026)

## 4. Performance & Optimization
No kernel-level or throughput work landed in the last 24h. Reliability-oriented improvements:

- **Redis spend-buffer durability**: transactions are now requeued if the DB commit fails, preventing spend record loss – [#33881](https://github.com/BerriAI/litellm/pull/33881)
- **Auto Router v2**: `session_key_fallback` is automatically derived when `session_id` is absent, reducing manual session-key wiring – [#36930](https://github.com/BerriAI/litellm/pull/36930)
- **Shadow eval**: multi-key scoping and reverse-direction jobs improve evaluation coverage without manual aggregation – [#36871](https://github.com/BerriAI/litellm/pull/36871), [#36865](https://github.com/BerriAI/litellm/pull/36865)
- **UI fixes**: user-usage search now queries the server as you type instead of matching only the first 50 users – [#36867](https://github.com/BerriAI/litellm/pull/36867)

## 5. Stability & Regressions
Ranked by severity. Many items are open PRs or issues updated within the last 24h.

### Critical
- **Anthropic passthrough returns unreadable compressed bodies**: Anthropic defaults to brotli; the proxy forwards the client’s `Accept-Encoding` upstream, cannot decode brotli, and strips `Content-Encoding`. Fix: stop forwarding `Accept-Encoding` upstream – [#36977](https://github.com/BerriAI/litellm/pull/36977)
- **Azure `gpt-5-chat` deployments fail on every `max_tokens` request**: `/health` marks the deployment unhealthy. Fix renames to `max_completion_tokens` – [#36857](https://github.com/BerriAI/litellm/pull/36857). Related: returns a length-truncated 200 when the output budget fits no token – [#36859](https://github.com/BerriAI/litellm/pull/36859)
- **Admin UI 404 regression**: the reserved UI session team was treated as deleted after #36837. Exempt that team via session-minted keys only – [#36976](https://github.com/BerriAI/litellm/pull/36976)
- **Anthropic `/v1/models` fails strict clients**: token limit fields are dropped when unknown; schema requires nullable, not optional. Fix always emits `max_input_tokens`/`max_tokens` with `null` – [#36961](https://github.com/BerriAI/litellm/pull/36961)

### High
- **Redis spend-buffer loss on DB commit failures**: spend transactions could be dropped. Requeue logic added – [#33881](https://github.com/BerriAI/litellm/pull/33881)
- **Prisma cached-plan error recovery skips recreate**: auth kept returning 503 even when the writer was reachable. Fix forces Prisma recreation on cached-plan errors – [#36428](https://github.com/BerriAI/litellm/pull/36428)
- **Mid-conversation system-role hoist invalidates prompt-cache prefix**: `AnthropicMessagesConfig` hoisting breaks Claude prompt caching; reports show entire cache miss for older Claude models – [#36559](https://github.com/BerriAI/litellm/issues/36559)
- **Vertex AI custom `api_base` still requires Google credentials**: the credential-skip logic is missing in `vertex_llm_base.py`; default credentials error is thrown even for custom proxies – [#19138](https://github.com/BerriAI/litellm/issues/19138)

### Other notable reports
- `/metrics` cannot be accessed unauthenticated behind a reverse proxy after 1.84.0 – [#27926](https://github.com/BerriAI/litellm/issues/27926)
- `store_prompts_in_spend_logs: true` persists `messages` as `{}` for both chat and responses calls – [#34747](https://github.com/BerriAI/litellm/issues/34747)
- Enterprise Control Plane MCP routes are misclassified as LLM API routes, breaking MCP management – [#27461](https://github.com/BerriAI/litellm/issues/27461)
- `org_admin` receives 401 on `POST /team/update` despite authorization – [#27294](https://github.com/BerriAI/litellm/issues/27294)
- Tag budgets never reset after overage; `ResetBudgetJob` has no tag handler – [#27481](https://github.com/BerriAI/litellm/issues/27481)
- Google GenAI adapter generates duplicate `tool_call_id` values for repeated `functionCall` parts – [#27078](https://github.com/BerriAI/litellm/issues/27078)

## 6. What This Means for Application Developers
- If you use the pass-through endpoint with Anthropic, the brotli corruption fix (#36977) is essential; bodies may currently be unreadable after Anthropic enables brotli by default. Watch for the next release.
- Azure `gpt-5-chat` users should wait for #36857 before relying on `/health` or sending `max_tokens`. This also affects any probe that uses `max_tokens: 1` to detect model availability.
- Strict clients that validate Anthropic `/v1/models` responses will require #36961 to accept token-limit fields as nullable.
- Auto Router v2 operators will benefit from `session_key_fallback` (#36930) and expanded shadow-eval directions (#36865, #36871) in upcoming releases.
- MCP-related fixes are in flight: OAuth endpoints no longer get wiped on save (#36888), upstream headers are redacted from logs (#36901), and guardrail evaluations/blocks are now visible (#36978). Good for auditability, but verify after upgrade.
- No release landed in the last 24h; most fixes are in open PRs or internal staging, so plan testing against a pre-release build if you need these corrections immediately.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-15

## 1. Today's Highlights

Unsloth shipped **v0.1.800-beta** with support for **Qwen3.8-27B** and **Qwen3.8-2.4T**, enabling local inference on as little as **17GB RAM** via Dynamic GGUFs, plus fine-tuning and new NVFP4 quantizations — positioning the 27B as a strong edge/lab-class model. The project's other major theme this cycle is AMD/ROCm hardening: an AOTriton attention-gate bug that silently degrades SDPA to MATH (and OOMs training) has a fix in flight, alongside several installer/telemetry fixes. A documented **CUDA 13.2 correctness regression** for IQ2/IQ3 quants remains an important deployment caveat.

## 2. Releases & Breaking Changes

- **v0.1.800-beta — Qwen3.8-27B** ([release](https://github.com/unslothai/unsloth/releases)): local inference on 17GB RAM via Dynamic GGUFs; fine-tuning supported; NVFP4 quants uploaded. Guide: [unsloth.ai/docs/models/qwen3.8](https://unsloth.ai/docs/models/qwen3.8)
- **llama.cpp / CUDA 13.2 warning** ([#4849](https://github.com/unslothai/unsloth/issues/4849)): CUDA 13.2 produces gibberish for IQ3_S, IQ3_XXS, and IQ2_M quants. Fixed by pinning CUDA 12.8/13.0 or using Unsloth Studio (which compiles with 13.0). No code change from Unsloth — an environment pinning note for operators.
- **pip/uv hardening policy** ([PR #8781](https://github.com/unslothai/unsloth/pull/8781)): Studio keeps operators' `require-hashes` / `no-build` / `only-binary` policies in force where possible; the relaxation of these policies is now scoped only to Studio's own requirements installs.

## 3. New Model & Hardware Support

- **Qwen3.8-27B / Qwen3.8-2.4T** ([release v0.1.800-beta](https://github.com/unslothai/unsloth/releases)): local inference, fine-tuning, Dynamic GGUF, NVFP4 quants.
- **MLX models via OpenAI-compatible API** ([PR #8768](https://github.com/unslothai/unsloth/pull/8768), fixes [#8748](https://github.com/unslothai/unsloth/issues/8748)): MLX models downloaded through Desktop are now listed in `GET /v1/models` and servable via chat-completions without manual loading.
- **Non-GGUF image/video models in the hub Run button** ([PR #8855](https://github.com/unslothai/unsloth/pull/8855)): safetensors image models (e.g., `Z-Image-Turbo` BnB 4-bit) can be run directly from the hub, not just GGUF variants.
- **Feature requests open**: Ling 3.0 Studio support ([#8532](https://github.com/unslothai/unsloth/issues/8532)), DSPARK ([#8848](https://github.com/unslothai/unsloth/issues/8848)), MiniMax-H3 AMD/Linux compatibility ([#8814](https://github.com/unslothai/unsloth/issues/8814)).
- **Reported gap**: Qwen3.8-27B-NVFP4 shows extremely slow inference on RTX 5090/Windows — under investigation ([#8861](https://github.com/unslothai/unsloth/issues/8861)).

## 4. Performance & Optimization

- **Embedded MTP under partial GPU offload** ([PR #8875](https://github.com/unslothai/unsloth/pull/8875)): fixes the ~3.5 tok/s regression reported for Qwen3.8-27B-GGUF with UD-IQ2_M at default settings. Root cause: MTP head followed main-model placement under partial offload; the fix makes the head's placement explicit.
- **Fast-stream chat UI coalescing** ([PR #8845](https://github.com/unslothai/unsloth/pull/8845)): coalesces streamed tokens that arrive between browser frames; slow streams still publish per-chunk, fast streams no longer queue unbounded message rebuilds.
- **AMD AOTriton gate** ([#8819](https://github.com/unslothai/unsloth/issues/8819), fix [PR #8821](https://github.com/unslothai/unsloth/pull/8821)): on ROCm, torch's AOTriton flash/mem-efficient SDPA kernels are gated behind `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL`, which is read once at C++ extension load. With the gate shut, SDPA falls through to MATH and training OOMs at a fraction of the card's context. The fix opens the gate for pip/library users, not just Studio.
- **Feature request**: live prompt-processing speed and generation-speed progress in the Studio API tab ([#8528](https://github.com/unslothai/unsloth/issues/8528)).
- **ROCm APU telemetry crash containment** ([PR #8853](https://github.com/unslothai/unsloth/pull/8853)): native HIP aborts from the APU memory-total probe can no longer kill Studio — the query runs in a cached child process with fallback to device-property totals.
- **AMD VRAM reporting on Windows** ([PR #8863](https://github.com/unslothai/unsloth/pull/8863), fixes [#8862](https://github.com/unslothai/unsloth/issues/8862)): joins adapter counters on LUID instead of relying on unavailable `amd-smi`; also addresses the VRAM-detection half of [#7449](https://github.com/unslothai/unsloth/issues/7449).

## 5. Stability & Regressions

Ranked by severity:

1. **ROCm SDPA degradation → training OOM** ([#8819](https://github.com/unslothai/unsloth/issues/8819), fix [PR #8821](https://github.com/unslothai/unsloth/pull/8821)): AMD users silently lose flash attention on pip installs; high impact, fix pending review.
2. **Security: `-H 0.0.0.0` binds wrong IP on macOS** ([#8868](https://github.com/unslothai/unsloth/issues/8868)): Studio may advertise/serve on an unexpected address; security-labeled, no fix yet.
3. **AMD installer/backend reconciliation** ([#8473](https://github.com/unslothai/unsloth/issues/8473)): installer reports AMD GPU while backend runs CPU-only, with no error surfaced to the user.
4. **Bazzite/Fedora installs CPU PyTorch on gfx1201** ([#8731](https://github.com/unslothai/unsloth/issues/8731)): AppImage can't resolve a ROCm version and silently falls back to CPU-only; `setup.sh` resolves the same host correctly.
5. **GGUF export now requires 16-bit weights** ([#8717](https://github.com/unslothai/unsloth/issues/8717)): users report being forced to download ~40GB intermediates before GGUF conversion — a workflow regression vs. prior behavior.
6. **macOS M4 Desktop: llama-server fails to start + high idle RAM** ([#8566](https://github.com/unslothai/unsloth/issues/8566)); **second-launch error** ([#8610](https://github.com/unslothai/unsloth/issues/8610)).
7. **V1 endpoint + MCP broken** ([#8790](https://github.com/unslothai/unsloth/issues/8790)): Desktop-as-OpenAI-endpoint and MCP connectivity issues reported; no fix PR yet.
8. **Transformers in-place loss crash** ([PR #8869](https://github.com/unslothai/unsloth/pull/8869)): fixes a fatal `RuntimeError` during CPT/SFT with transformers ≥ 4.43 (in-place loss mutation corrupts memory).
9. **Closed/resolved**: CUDA 13.2 IQ-quant gibberish documented with workaround ([#4849](https://github.com/unslothai/unsloth/issues/4849)); Linux AppImage missing-libraries failure ([#8463](https://github.com/unslothai/unsloth/issues/8463)); Windows install killed by 2-hour cap with no progress output ([#8698](https://github.com/unslothai/unsloth/issues/8698)); Windows AMD install failure ([#8508](https://github.com/unslothai/unsloth/issues/8508)); raw JSONL not exported as real JSONL ([#8733](https://github.com/unslothai/unsloth/issues/8733)).
10. **Other fixes in flight**: duplicate package metadata repair on updates ([PR #8515](https://github.com/unslothai/unsloth/pull/8515)); post-update version verification without encoded probe payloads ([PR #8835](https://github.com/unslothai/unsloth/pull/8835)); backend session log included in support diagnostics ([PR #8877](https://github.com/unslothai/unsloth/pull/8877)); Agents-tab copy + unreachable-server error for remote Studios ([PR #8857](https://github.com/unslothai/unsloth/pull/8857)).

## 6. What This Means for Application Developers

- **Qwen3.8-27B is now a realistic edge/single-node model**: 17GB RAM via Dynamic GGUF opens 27B-class local inference on mid-range workstations, and NVFP4 quants give NVIDIA deployments a memory/bandwidth-lighter option. It's also fine-tunable, so the release is relevant for both serving and customization pipelines.
- **Watch the AMD/ROCm path**: if you deploy on Radeon/Strix Halo, verify that the backend actually sees the GPU and that AOTriton attention is active — the current default can silently drop you to MATH SDPA and OOM at small context sizes ([#8819](https://github.com/unslothai/unsloth/issues/8819)). Pin the upcoming fix or opt into `TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL`.
- **CUDA 13.2 + IQ quants is a known hazard**: pin CUDA < 13.0 for llama.cpp-based IQ2/IQ3 serving, or route through Unsloth Studio ([#4849](https://github.com/unslothai/unsloth/issues/4849)).
- **Agent/tool-loop correctness is improving**: pre-tool reasoning is now preserved through the GGUF tool loop ([PR #8581](https://github.com/unslothai/unsloth/pull/8581)), preventing repeated web/MCP searches; a configurable current-date injection ([PR #8879](https://github.com/unslothai/unsloth/pull/8879)) fixes stale-cutoff planning in Deep Research-style agents.
- **API surface is widening**: MLX models on Apple Silicon are now reachable through the OpenAI-compatible API ([PR #8768](https://github.com/unslothai/unsloth/pull/8768)), and media generation is being queued behind model teardown to close race conditions ([PR #8866](https://github.com/unslothai/unsloth/pull/8866)).
- **Serve with caution on macOS**: the `-H 0.0.0.0` binding issue ([#8868](https://github.com/unslothai/unsloth/issues/8868)) is a reminder to verify the advertised address before exposing Studio endpoints beyond localhost.

---

*Digest generated 2026-08-15 from [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth). All linked items are from the public issue/PR trackers.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*