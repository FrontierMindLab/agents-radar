# AI Infrastructure Digest 2026-08-18

> Generated: 2026-08-17 23:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison Report
**Date:** 2026-08-18 · **Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

The inference ecosystem is in a stabilization window between major releases: none of the six tracked projects cut a release in the last 24 hours, with the exception of llama.cpp's continuous patch roll (b10455–b10472). Engineering attention is split between integrating a new wave of frontier architectures — DeepSeek V4, Kimi K3, GLM-5.2, and Qwen3.8 — and containing the collateral damage: speculative-decoding crashes (MTP, GDN, DSPARK, EAGLE) and distributed-serving deadlocks are the most common critical failures across vLLM, SGLang, and llama.cpp. KV-cache design has become the primary optimization battleground, spanning growable caches, quantized decode kernels, host-memory layers, and zero-copy prefill paths. Gateway and fine-tuning layers (LiteLLM, Unsloth) are hardening for agentic and multimodal workloads, while security-governance fixes (budget enforcement, credential redaction) are landing as urgent patches.

---

## 2. Activity Comparison

Counts below reflect **issues/PRs tracked in the 24h digest**, not full repo-wide totals.

| Project | Layer | Notable Issues (digest) | Notable PRs (digest) | Release (24h) |
|---|---|---|---|---|
| **vLLM** | GPU serving engine | ~19 (3 critical, 5 high) | ~12 | None |
| **SGLang** | GPU serving engine | ~15 (5+ critical/high) | ~14 | None |
| **llama.cpp** | Local/edge runtime | ~13 (watchdog, MTP crash, RPC, Vulkan) | ~16 | **4** (b10472, b10470, b10456, b10455) |
| **Ollama** | Local runtime + model mgmt | ~14 (agent loop, retry hang, MLX regressions) | ~5 (22 PRs active) | None |
| **LiteLLM** | LLM gateway/proxy | ~18 (budget bypass, OOM, cred leak) | ~13 | None |
| **Unsloth** | Fine-tuning / Studio | ~9 (sqlite deadlock, ROCm load failure) | ~14 | None |

**Takeaway:** llama.cpp is the only project shipping stable builds; everything else is main-only. The serving engines (vLLM/SGLang) carry the heaviest stability load, while LiteLLM carries the most security/correctness debt in the governance layer.

---

## 3. Model Support Race

| Model | vLLM | SGLang | llama.cpp | Ollama | Who's ahead |
|---|---|---|---|---|---|
| **DeepSeek V4** | ROCm fused-AR draft (#52628); V3.2 attention fix (#52512); reasoning-parser bug | MLA prefill TP-padding removal (#35104); heavy DSPARK/HiCache integration; multiple open crashes | Tensor-split support (`-sm tensor`, #26490); gfx1151 RPC crash | `deepseek-v4-flash:cloud` — but critical agent-loop bug (#17617) | **SGLang** on optimization; none stable in production |
| **Kimi K3** | ROCm tracking only (#50682) | **+18.49% e2e throughput** on 8×GB300 (#34299) | — | — | **SGLang** (clear leader) |
| **GLM-5.2** | Sparse-MLA dispatch fix so dense MHA isn't used (#52512) | NVFP4/pro6000 issue open (#29562) | Multi-node RPC crash (#26583); fix in flight (#26500) | — | **vLLM** on dispatch correctness |
| **Qwen3.8 / 3.6 / 3.5** | MTP + GDN illegal-memory-access crashes on FP8 | Gateway reasoning-parse bug (#35148) | SYCL decode +42–169% on 3.6-35B; watchdog stall on 3.8-27B | Download broken (#17816); hang-on-retry (#17825); MLX vision OOM (#17804) | **llama.cpp** on decode perf; **nobody stable** for spec-decode |
| **Gemma 4** | Startup failure open (#51744) | — | SYCL decode +42% (26B/12B) | MLX `think:false` regression in 0.32.14 | **llama.cpp** |
| **InternVL3.5 MoE** | — | XPU weight-loading/fix (#35212) | — | — | **SGLang** |
| **Ling-3.0 (Bailing MoE V3)** | — | — | — | MLX engine support (#17643) | **Ollama** (only) |

**Verdict:** SGLang leads frontier-model optimization (Kimi K3, DeepSeek V4) but carries the most open correctness bugs on those exact paths. vLLM leads on model-dispatch correctness and hardware enablement (CUDA 13.4/Rubin, ROCm connectors). llama.cpp leads local/quantized deployment breadth and release velocity. Ollama trails on the newest models, partly because the MLX engine lacks prefix caching and vision robustness. LiteLLM (FLUX 3 video, Comprehend Medical, Azure OCR) and Unsloth (Z-Image-Turbo bnb-4bit) are expanding model surface in their respective layers rather than racing on inference.

---

## 4. Performance Frontier

**KV cache — the hottest area:**
- vLLM draft PR for an **extensible (growable) KV cache** to cut fragmentation/over-provisioning (#50779).
- llama.cpp **SYCL TILE quantized-KV decode** (`q4_0`/`q8_0`): **+42% to +169%** decode on Battlemage across Qwen3.6-35B, Gemma 4 26B/12B at 32K/118K context (#26689).
- SGLang fixes request-owned KV release on no-insert cleanup (#35204) and adds a buffer-only HiCache host-memory layer (#34798).
- Ollama's MLX engine still has **no prompt/prefix caching** — agent-step TTFT grows linearly (#17829).

**Speculative decoding — biggest lever and biggest risk:**
- llama.cpp adds **adaptive MTP draft depth** (`--spec-type draft-mtp-adaptive`, #27210) plus a rolling-window draft-length heuristic (#25726).
- SGLang removes redundant Q/K/V materialization in GDN target verification (#33778) and improves EAGLE v2 WAR barrier timing (#34890).
- Meanwhile, MTP/GDN/DSPARK crashes are the top open stability issue in vLLM, SGLang, and llama.cpp.

**Batching & scheduling:**
- SGLang's Kimi K3 **zero-copy prefill + packed decode** delivers the headline number: **18.49% e2e throughput gain** on 8×GB300/TP8 NVLink-72 (2,048-in/64-out) (#34299).
- vLLM ModelRunner V2 **batch-sharded sampling** cuts per-step logits memory by ~1/TP (#50465).
- vLLM proposes making `seq_lens_cpu` optional to remove GPU→CPU syncs for fully overlapped async spec-decode (#29134).

**Quantization & kernels:**
- vLLM proposes PTX 9.4 `ldmatrix.s8.s4` for in-flight INT4→INT8 expansion in W4A8 kernels (#49529).
- llama.cpp fixes SYCL quantized copy-kernel thread/block counts (b10456); `q4_0 → f32` improved from 20.21 GB/s on Arc.
- Unsloth's Studio memory planner now accounts for vision-projector (`mmproj`) VRAM before placement (#9063).

**Distributed serving — where the worst production blockers live:**
- vLLM: critical engine idle-stall on multi-node GB10/aarch64 (#51921); NIXL disaggregation fails when prefill/decode block sizes differ (#42895).
- SGLang: NIXL/UCX prefill segfault persists on v0.5.17/CUDA 13/B200 (#35189).
- llama.cpp: multi-node RPC buffer serialization fix in flight (#26500).

---

## 5. Layer Positioning

- **vLLM** — the datacenter serving engine: Python orchestration + custom CUDA/ROCm kernels; target is tensor-parallel/PD-disaggregated production fleets with KV-connector ecosystems (Mooncake, LMCache). Competes head-to-head with SGLang; differentiates on hardware breadth (Rubin, ROCm) and ecosystem maturity.
- **SGLang** — the same layer as vLLM, but more aggressive on frontier-model performance bets: DSPARK sparse attention, HiCache hierarchical caching, NIXL disaggregation, and a Rust gateway component. Currently higher risk-reward: more throughput wins, more open correctness issues.
- **llama.cpp** — the local/edge native runtime: C/C++/ggml with the broadest hardware surface (CUDA, SYCL, Vulkan, OpenCL, ROCm, Metal) and quantized-GGUF focus. Serves as the base layer for many products. Only project shipping daily patch releases.
- **Ollama** — a product layer *above* runtimes (llama.cpp + MLX), adding model distribution, a Go server, CLI, and cloud connector. Its issues are disproportionately end-user/agentic experience failures (loops, hangs, session loss) rather than raw kernel bugs.
- **LiteLLM** — the gateway layer: model-agnostic, sits in front of inference backends. Differentiates on provider breadth (FLUX 3, Comprehend Medical, Azure OCR/Document Intelligence), spend tracking, routing policies, and budget enforcement. Today its risk is governance correctness (budget bypass, credential leaks, pricing inaccuracies).
- **Unsloth** — the fine-tuning layer (LoRA/QLoRA, bnb-4bit, GGUF export, Studio IDE). Adjacent to inference: Studio VRAM planning and quantization workflows feed directly into serving-deployment readiness.

---

## 6. Trend Signals

1. **Speculative decoding is the top risk-reward area in inference.** Every project is investing in it (adaptive MTP, GDN, EAGLE, DSPARK), and every project has an open crash or corruption bug in it. Agent/application developers should treat spec-decode paths as experimental, especially on Qwen3.x FP8 and DeepSeek-V4.

2. **KV-cache design is the new moat.** Growable caches (vLLM), quantized KV decode (llama.cpp), hierarchical host caches (SGLang HiCache), and prefix-cache correctness are where throughput wins will come from in 2026. The gaps are glaring: Ollama's MLX engine has no prefix caching, and SGLang's long-session cache hit rate can collapse to 0.

3. **Agentic workloads are exposing production gaps faster than benchmarks.** Symptom cluster: Ollama's cloud agent loop (193 identical tool calls, ~31M tokens), SGLang's agentic-session cache collapse, Unsloth's tool-call ID normalization for OpenAI/Mistral contract limits, LiteLLM's plan-mode routing, Ollama's retry-forever hang after tool-parse 500. Multi-step agents are the new stress test.

4. **Multi-node serving is still fragile.** The three most severe blockers across the report are all distributed: vLLM GB10 idle-stall, SGLang NIXL/UCX segfault, llama.cpp multi-node RPC crashes. Single-node benchmarks flatter these systems.

5. **Backend diversity is widening but uneven.** SYCL (Battlemage/Arc), Intel XPU, and ROCm (gfx950, MI308X) are all receiving first-class enablement — but each has open gating issues (missing `mla_gluon` on gfx950, SYCL warmup hangs, ROCm DLL packaging gaps). CUDA Blackwell remains the most reliable target.

6. **Governance and security are migrating to the gateway.** LiteLLM's budget-bypass report, `/health` credential leak, and pricing-accuracy bugs — plus vLLM's `api_key` log-redaction fix — signal that control-plane correctness is now as important as inference throughput.

7. **Pinning discipline matters more than ever.** With five of six projects main-only, users on stable tags (SGLang v0.5.17, Ollama 0.32.14, LiteLLM v1.82.x) are exposed to known live bugs with fixes only on `main`. The safe play: pin versions, disable speculative decoding by default, and add client-side retry caps for tool-call and agent loops.

---

*Report generated from 2026-08-18 digest data. Issue/PR IDs reference the respective GitHub repositories.*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-18

## 1. Today's Highlights
No new vLLM release landed in the last 24h. The most significant activity centers on a draft PR for an extensible (growable) KV cache ([#50779](https://github.com/vllm-project/vllm/pull/50779)), early CUDA 13.4 pre-release support for Rubin ([#52379](https://github.com/vllm-project/vllm/pull/52379)), and continued ROCm enablement (Mooncake/LMCache connectors, Kimi-K3 tracking). On the stability side, a critical engine idle-stall on multi-node GB10 systems ([#51921](https://github.com/vllm-project/vllm/issues/51921)) and multiple illegal-memory-access crashes in MTP/GDN kernels ([#40756](https://github.com/vllm-project/vllm/issues/40756), [#34948](https://github.com/vllm-project/vllm/issues/34948)) dominate the issue tracker.

## 2. Releases & Breaking Changes
None in the last 24h. No version bumps, API changes, or migration notes to report.

## 3. New Model & Hardware Support
- **CUDA 13.4 / Rubin**: PR [#52379](https://github.com/vllm-project/vllm/pull/52379) adds an image-only CUDA 13.4rc1 prerelease pipeline for `sm_107`.
- **ROCm connectors**: Mooncake is added to the ROCm Docker build (`#52650`](https://github.com/vllm-project/vllm/pull/52650)), and LMCache is shipped in ROCm images ([#51208](https://github.com/vllm-project/vllm/pull/51208)).
- **ROCm / Kimi-K3**: Issue [#50682](https://github.com/vllm-project/vllm/issues/50682) tracks upstream feature enablement and performance optimization for Kimi-K3 on ROCm.
- **ROCm / DeepSeek V4**: PR [#52628](https://github.com/vllm-project/vllm/pull/52628) enables fused AR draft metadata updates for DeepSeek V4 on ROCm.
- **GLM-5.2**: PR [#52512](https://github.com/vllm-project/vllm/pull/52512) fixes sparse-MLA dispatch so dense MHA is no longer incorrectly used for GLM-5.2.
- **AMD MI308X**: Issue [#51964](https://github.com/vllm-project/vllm/issues/51964) reports Kimi-K2.7-Coder startup failure on ROCm 7.2.3 because `mla_gluon` requires gfx950 (no fix yet).
- **Llama-4 / ModelOpt**: Issue [#31624](https://github.com/vllm-project/vllm/issues/31624) tracks the 5+ minute load time for ModelOpt FP8 checkpoints; root cause identified in state-dict loading logic.

## 4. Performance & Optimization
- **Extensible KV cache**: Draft PR [#50779](https://github.com/vllm-project/vllm/pull/50779) proposes an opt-in growable KV cache to reduce fragmentation and over-provisioning.
- **ModelRunner V2 batch-sharded sampling**: PR [#50465](https://github.com/vllm-project/vllm/pull/50465) reduces per-step logits memory by ~1/TP by sharding logits and sampler inputs during tensor parallelism.
- **W4A8 kernels**: Issue [#49529](https://github.com/vllm-project/vllm/issues/49529) proposes adopting PTX 9.4 `ldmatrix.s8.s4` for in-flight INT4→INT8 expansion during shared-memory loads.
- **Async spec-decoding**: Issue [#29134](https://github.com/vllm-project/vllm/issues/29134) tracks making `seq_lens_cpu` optional to remove GPU→CPU syncs and fully overlap input prep with forward pass.
- **Torch.compile cold-start**: Issue [#33267](https://github.com/vllm-project/vllm/issues/33267) suggests removing layer-specific names from `unified_kv_cache_update` to improve graph reuse.
- **ROCm CPU offload**: PR [#43018](https://github.com/vllm-project/vllm/pull/43018) aligns `hipMemcpyBatchAsync` parameters and performance for ROCm 7.13+.
- **Startup-time benchmark**: Issue [#50128](https://github.com/vllm-project/vllm/issues/50128) asks for measurements of the Transformers backend startup time vs native.

## 5. Stability & Regressions
Ranked by severity:

- **Critical – Engine idle-stall**: [#51921](https://github.com/vllm-project/vllm/issues/51921) — v0.27.0 permanently stalls after ~1 min idle on 4-node TP=4 GB10/aarch64; requests never reach the scheduler. PR [#52660](https://github.com/vllm-project/vllm/pull/52660) fixes a related batch-queue sampling bug in standalone v1.
- **Critical – Illegal memory access**: [#40756](https://github.com/vllm-project/vllm/issues/40756) — MTP speculative decoding crashes on long sequences with Qwen3.6-27B-FP8. [#34948](https://github.com/vllm-project/vllm/issues/34948) — Qwen3.5 CUDA illegal memory access in the GDN kernel on H200.
- **High – Mamba-2 on SM121**: [#37431](https://github.com/vllm-project/vllm/issues/37431) — Triton kernels crash with illegal instruction on DGX Spark unless `CUDA_LAUNCH_BLOCKING=1`.
- **High – Gemma4 startup failure**: [#51744](https://github.com/vllm-project/vllm/issues/51744) — `vllm/vllm-openai:latest` cannot start Gemma4 with Transformers 5.15.0 (NVFP4, TP=2).
- **High – NIXL disaggregation**: [#42895](https://github.com/vllm-project/vllm/issues/42895) — Qwen3.5 hybrid fails when prefill TP4 and decode DP8 use different physical block sizes.
- **High – Draft model spec-decode crash**: [#52023](https://github.com/vllm-project/vllm/issues/52023) — Crashes at init under TP>1 when the draft model's hidden size exceeds the target's (TRT-LLM allreduce workspace sizing).
- **High – AMD MI308X/Kimi-K2.7**: [#51964](https://github.com/vllm-project/vllm/issues/51964) — Startup assertion `mla_gluon requires gfx950` on MI308X.
- **Medium – Prefix-caching nondeterminism**: [#40896](https://github.com/vllm-project/vllm/issues/40896) — v1 prefix caching produces a different first-request result at temperature=0.
- **Medium – DeepSeek V4 parser**: [#48645](https://github.com/vllm-project/vllm/issues/48645) — Missing `</think>` routes the entire reply to `reasoning_content`.
- **Medium – KV connector crash**: [#50687](https://github.com/vllm-project/vllm/issues/50687) — `_update_requests_with_invalid_blocks` crashes on connector load-error blocks.
- **Medium – Streaming update corruption**: [#42490](https://github.com/vllm-project/vllm/issues/42490) — Async double streaming_update with shared-prefix reuse can leave invalid `-1` token ids.

**Notable fix PRs**:
- [#52632](https://github.com/vllm-project/vllm/pull/52632) — Fixes DeepEP-V2 decode/cudagraph startup crash (`expert_tokens_meta` must be `None`).
- [#43249](https://github.com/vllm-project/vllm/pull/43249) — Fixes MRV2 Gumbel sampling with `-inf` logits.
- [#52523](https://github.com/vllm-project/vllm/pull/52523) — Redacts `api_key` in the non-default args startup log.
- [#52661](https://github.com/vllm-project/vllm/pull/52661) — Restores `vllm.transformers_utils.tokenizer` shim for lm-format-enforcer.
- [#52512](https://github.com/vllm-project/vllm/pull/52512) — Fixes DeepSeek-V3.2 attention wrapper short-prefill dispatch.

## 6. What This Means for Application Developers
- **Pin versions carefully on multi-node systems**: If you run vLLM 0.27.0 on GB10/aarch64 multi-node, the idle-stall bug ([#51921](https://github.com/vllm-project/vllm/issues/51921)) is a production blocker. Test with your idle timeout or stay on an earlier release until fixed.
- **Expect crashes on Qwen3.x FP8 + MTP/GDN paths**: Both MTP and GDN illegal-memory-access reports remain open; disable speculative decoding or use non-FP8 variants if you hit them.
- **Log security matters**: The `api_key` redaction fix ([#52523](https://github.com/vllm-project/vllm/pull/52523)) is important for anyone running the API server with `--api-key`; adopt it as soon as it merges or scrub logs externally.
- **Prefix-caching reproducibility**: With vLLM v1 and prefix caching enabled, the first request may differ from subsequent identical requests at temperature=0. Avoid relying on exact first-call behavior for evaluation or agent determinism.
- **ROCm users gain connectors**: Mooncake and LMCache are being added to ROCm images, which should simplify KV-transfer setups without custom builds.
- **Watch for memory-savings PRs**: The extensible KV cache and batch-sharded sampling could meaningfully reduce peak memory on large TP deployments once merged; worth benchmarking when they become available.
- **Rust frontend is still experimental**: Parity work continues ([#44280](https://github.com/vllm-project/vllm/issues/44280)); don't rely on it in production yet.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-18

## Today's Highlights

No release was published in the last 24 hours; the main push is on ROCm/XPU enablement plus Kimi-K3/DeepSeek-V4 optimization. The most significant PR ([#34299](https://github.com/sgl-project/sglang/pull/34299)) reports an 18.49% end-to-end throughput gain for Kimi K3 on GB300, while new stability reports call out an unresolved NIXL/UCX prefill segfault ([#35189](https://github.com/sgl-project/sglang/issues/35189)) and unsafe DSPARK behavior on DeepSeek-V4-Flash ([#34959](https://github.com/sgl-project/sglang/issues/34959)).

## Releases & Breaking Changes

- None in the last 24h. No new releases, no released config/API changes, no migration notes.

## New Model & Hardware Support

- **Intel XPU encoder embeddings** — [#35213](https://github.com/sgl-project/sglang/pull/35213) adds support for `BAAI/bge-base-en-v1.5`, `nomic-ai/nomic-embed-text-v1.5`, and `ibm-granite/granite-embedding-english-r2` on Intel XPU.
- **InternVL concurrent multimodal on XPU** — [#35212](https://github.com/sgl-project/sglang/pull/35212) fixes weight-loading and concurrent multmodal issues for InternVL3_5 MoE on Intel XPU.
- **Step3 / Step3VL** — [#35206](https://github.com/sgl-project/sglang/pull/35206) fixes a model-init crash on configs without `pad_token_id`.
- **Intern-S2-Mobius FP8** — [#34908](https://github.com/sgl-project/sglang/pull/34908) adds support for `internlm/Intern-S2-Mobius-FP8`.
- **AMD Quark shared experts** — [#35200](https://github.com/sgl-project/sglang/pull/35200) fixes the Quark shared-experts fusion gate after load-time override removal.

## Performance & Optimization

- **Kimi K3 zero-copy prefill + packed decode** — [#34299](https://github.com/sgl-project/sglang/pull/34299) reports an **18.49% end-to-end serving throughput improvement** on 8×GB300 / TP8 / NVLink-72 with 2,048 input and 64 output tokens.
- **DeepSeek-V4 MLA prefill on SM12x** — [#35104](https://github.com/sgl-project/sglang/pull/35104) drops the 64-head TP padding on the DSv4 MLA prefill path, avoiding wasted attention compute with `attn_tp_size=2`.
- **GDN speculative decoding** — [#33778](https://github.com/sgl-project/sglang/pull/33778) removes redundant Q/K/V materialization during target verification.
- **Helion KDA small-token prefill** — [#35197](https://github.com/sgl-project/sglang/pull/35197) fixes shape handling for short prefill requests and rejects non-power-of-2 head dims in decode.
- **EAGLE v2 scheduling** — [#34890](https://github.com/sgl-project/sglang/pull/34890) publishes the shared-read-done signal at verify time, improving WAR barrier timing with staged draft-extend.
- **Scheduler KV release** — [#35204](https://github.com/sgl-project/sglang/pull/35204) fixes request-owned KV release on no-insert cleanup, avoiding stale or over-released ranges under overlap scheduling.
- **HiCache host-memory layer** — [#34798](https://github.com/sgl-project/sglang/pull/34798) adds a buffer-only mode for the HiCache host memory layer.

## Stability & Regressions

Active/updated in the last 24h, roughly by severity:

- **NIXL/UCX prefill segfault persists** — [#35189](https://github.com/sgl-project/sglang/issues/35189) reproduces on v0.5.17 / CUDA 13.0 / B200; prior #23489 and #23499 were closed without a root cause.
- **DSPARK corrupts identifiers on DeepSeek-V4-Flash** — [#34959](https://github.com/sgl-project/sglang/issues/34959): silent identifier corruption makes speculative decoding unsafe.
- **Kimi K3 decode crash with DCP + DSPARK** — [#34920](https://github.com/sgl-project/sglang/issues/34920): target-verify batch hits `cumsum(extend_prefix_lens=None)` in `dcp/planner.py`; all TP ranks crash.
- **DeepSeek-V4 decode hang at ~245K context** — [#33549](https://github.com/sgl-project/sglang/issues/33549): 8×H20 / TP=8 / dsv4 + DSPARK; GPUs spin at 100% util / low power until watchdog kill.
- **DSV4 sparse prefill scheduler hang** — [#34235](https://github.com/sgl-project/sglang/issues/34235): hierarchical cache + chunked prefill 16K causes scheduler hang on DeepSeek-V4 FP8 / H20.
- **Sparse attention indexer illegal memory access** — [#34718](https://github.com/sgl-project/sglang/issues/34718): DeepSeek-V4 `fp8_paged_mqa_logits` fails on long-context requests.
- **Silent no-attention for >65535-token extend** — [#34941](https://github.com/sgl-project/sglang/issues/34941): `gridDim.z` overflow on DSA/sparse-MLA path can launch zero attention kernels.
- **EAGLE/NEXTN TP=2 warmup hang on Intel XPU** — [#35144](https://github.com/sgl-project/sglang/issues/35144): likely regression from #34238 moving the verify-decision TP broadcast.
- **Qwen3.8-27B-FP8 gateway parsing** — [#35148](https://github.com/sgl-project/sglang/issues/35148): reasoning content is not parsed correctly by the Rust `sgl-model-gateway`.
- **HiCache long-session cache miss** — [#35129](https://github.com/sgl-project/sglang/issues/35129): DeepSeek-V4-Flash + DSPARK + HiCache long agentic sessions get `#cached-token: 0` despite stable prefix; short requests hit ~98%.
- **Prometheus metrics can starve health checks** — [#28157](https://github.com/sgl-project/sglang/issues/28157): `/metrics` scrape may interfere with prefill bootstrap health checks in PD deployments.
- **SWA/HiSparse KV pool retract crash** — [#33385](https://github.com/sgl-project/sglang/issues/33385): `DeepSeekV4TokenToKVPool` lacks `get_cpu_copy()`, causing `NotImplementedError` during decode-mode retract.
- **DSpark cannot start on SM120** — [#33985](https://github.com/sgl-project/sglang/issues/33985): decode-dsv4 has no topk=192 instantiation, so verify falls through to prefill kernel assert.
- **GLM-5.2-NVFP4 on pro6000** — [#29562](https://github.com/sgl-project/sglang/issues/29562): still open, no workaround noted.

Fix PRs in flight for related issues: [#35206](https://github.com/sgl-project/sglang/pull/35206), [#35212](https://github.com/sgl-project/sglang/pull/35212), [#35200](https://github.com/sgl-project/sglang/pull/35200), [#35197](https://github.com/sgl-project/sglang/pull/35197), [#35204](https://github.com/sgl-project/sglang/pull/35204). CI tracker [#17050](https://github.com/sgl-project/sglang/issues/17050) remains at 3 broken / 11 flaky / 672 recently fixed.

## What This Means for Application Developers

- **Be careful with DeepSeek-V4 / Kimi K3 + DSPARK + HiCache in production.** Multiple open correctness and hang bugs exist ([#34959](https://github.com/sgl-project/sglang/issues/34959), [#34920](https://github.com/sgl-project/sglang/issues/34920), [#33549](https://github.com/sgl-project/sglang/issues/33549), [#34235](https://github.com/sgl-project/sglang/issues/34235), [#35129](https://github.com/sgl-project/sglang/issues/35129)). Long agentic sessions are especially at risk — prefix-cache hit rate can collapse to 0.
- **No new release is available**, so fixes and regressions are currently only on `main`. If you are on v0.5.17, the NIXL/UCX segfault ([#35189](https://github.com/sgl-project/sglang/issues/35189)) and DSV4 sparse-prefill hang ([#34235](https://github.com/sgl-project/sglang/issues/34235)) are both still live.
- **Watch sampling-mask changes.** PRs [#34037](https://github.com/sgl-project/sglang/pull/34037) and [#35205](https://github.com/sgl-project/sglang/pull/35205) tighten sampling-mask semantics so reconstructed masks are faithful to the actual sample path. If you consume sampling-mask extensions, verify behavior after these land.
- **Intel XPU and AMD ROCm are receiving active enablement**, including encoder embeddings, InternVL, and Kimi K3. These are viable for those backends, but expect edge-case fixes to land as PRs first.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-18

## Today's Highlights

Release **b10472** fixes AMD APU shared-memory overcommit by skipping the UMA override on HIP builds, and **b10456** improves SYCL quantized copy-kernel throughput. In-flight PRs add adaptive MTP draft depth, SYCL TILE quantized-KV decode, OTel tracing, and an Electron desktop wrapper. Stability focus remains on CUDA watchdog stalls, MTP+cuBLAS crashes, and multi-node RPC failures.

---

## Releases & Breaking Changes

- **[b10472](https://github.com/ggml-org/llama.cpp/releases/tag/b10472)** — CUDA: skip UMA override for HIP builds ([#27083](https://github.com/ggml-org/llama.cpp/pull/27083)). AMD APUs now use `hipMemGetInfo` instead of `MemAvailable`, fixing overcommit on small-carveout systems ([#18159](https://github.com/ggml-org/llama.cpp/issues/18159)). No migration required, but AMD APU memory detection behavior changes.
- **[b10470](https://github.com/ggml-org/llama.cpp/releases/tag/b10470)** — CI-only: explicitly push release tag before creating GitHub release ([#27261](https://github.com/ggml-org/llama.cpp/pull/27261)).
- **[b10456](https://github.com/ggml-org/llama.cpp/releases/tag/b10456)** — SYCL: fix thread/block count in quantized cpy kernel launches ([#27160](https://github.com/ggml-org/llama.cpp/issues/27160)). Largest gain is `q4_0 → f32`, with throughput up from 20.21 GB/s on Arc.
- **[b10455](https://github.com/ggml-org/llama.cpp/releases/tag/b10455)** — SYCL: support `OPT_STEP_ADAMW` and `OPT_STEP_SGD` ([#25268](https://github.com/ggml-org/llama.cpp/pull/25268)), enabling optimizer graph paths on SYCL.

---

## New Model & Hardware Support

- **Granite SWA / GraniteMoe SWA** conversion support via [PR #25505](https://github.com/ggml-org/llama.cpp/pull/25505) — upcoming interleaved sliding-window attention plus attention-sink models.
- **dots3-note** model support with DSA + SWA via [PR #27060](https://github.com/ggml-org/llama.cpp/pull/27060).
- **DeepSeek 4 tensor-split** support (`-sm tensor`) via [PR #26490](https://github.com/ggml-org/llama.cpp/pull/26490).
- **OpenCL Adreno xmem SDPA path** for non-causal diffusion attention via [PR #26331](https://github.com/ggml-org/llama.cpp/pull/26331).
- **SYCL optimizer ops** (`OPT_STEP_ADAMW`, `OPT_STEP_SGD`) landed in [b10455](https://github.com/ggml-org/llama.cpp/releases/tag/b10455).

---

## Performance & Optimization

- **[b10456](https://github.com/ggml-org/llama.cpp/releases/tag/b10456)** — SYCL quantized cpy kernels now use thread/block counts proportional to quant size; `q4_0 → f32` path improved from 20.21 GB/s on Arc.
- **[PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689)** — SYCL TILE path for quantized KV decode (`q4_0`/`q8_0`). Measured **+42% to +169%** decode on Battlemage across Qwen3.6-35B, Gemma 4 26B, and Gemma 4 12B at 32K/118K context.
- **[PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)** — Adaptive MTP draft depth via `--spec-type draft-mtp-adaptive`; suggested `--spec-draft-n-max 12`.
- **[PR #25726](https://github.com/ggml-org/llama.cpp/pull/25726)** — Rolling-window adaptive draft-length heuristic for MTP.
- **Open regression:** [Issue #25489](https://github.com/ggml-org/llama.cpp/issues/25489) reports MTP performance regression since b9935, still under investigation.

---

## Stability & Regressions

Ranked by severity:

1. **CUDA kernel stall / watchdog kill on RTX Pro 6000 Blackwell** — [Issue #27102](https://github.com/ggml-org/llama.cpp/issues/27102). Reproduced with Qwen3.8-27B UD-Q8_K_XL. Open, help wanted.
2. **llama-server hard crash `cublasSgemm INVALID_VALUE` with MTP under KV-cache saturation** — [Issue #26558](https://github.com/ggml-org/llama.cpp/issues/26558). Open.
3. **Multi-node CUDA RPC crash on GLM-5.2** — [Issue #26583](https://github.com/ggml-org/llama.cpp/issues/26583). [PR #26500](https://github.com/ggml-org/llama.cpp/pull/26500) fixes serialization of RPC buffers owned by other servers and may address the root cause.
4. **SIGSEGV from `resolve_fused_ops` false positives on Intel Lunar Lake iGPU / Arc 140V** — [Issue #27046](https://github.com/ggml-org/llama.cpp/issues/27046). Reproduces on gemma4 and qwen2 architectures.
5. **Tensor-split startup assert with quantized KV cache** — [Issue #27116](https://github.com/ggml-org/llama.cpp/issues/27116) and [Issue #26902](https://github.com/ggml-org/llama.cpp/issues/26902): `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN) failed`.
6. **Vulkan `vk::DeviceLostError` on Linux 7.x / RADV Strix Halo** — [Issue #25664](https://github.com/ggml-org/llama.cpp/issues/25664).
7. **ROCm gfx1151 RPC worker crash in `GGML_OP_TOP_K` during DeepSeek V4 prefill** — [Issue #26746](https://github.com/ggml-org/llama.cpp/issues/26746).
8. **Windows ROCm release missing `hipblas.dll`** — [Issue #26996](https://github.com/ggml-org/llama.cpp/issues/26996), GPU not detected.
9. **OpenAI-compatible completions logprobs missing prompt/echo tokens** — [Issue #27174](https://github.com/ggml-org/llama.cpp/issues/27174). Breaks loglikelihood eval harnesses such as lm-eval.
10. **Fix PRs in flight:** expert-id validation in `mul_mat_id` ([#27286](https://github.com/ggml-org/llama.cpp/pull/27286)), `im2col` offset stride widening / CWE-680/787 ([#27284](https://github.com/ggml-org/llama.cpp/pull/27284)), and null-checking optional mmproj tensors ([#27285](https://github.com/ggml-org/llama.cpp/pull/27285)).

---

## What This Means for Application Developers

- **Update to b10472 if you deploy on AMD APUs** — memory detection is now accurate for small-carveout systems; earlier builds could over-commit and fail at load time.
- **Validate `/v1/completions` logprobs before relying on them** — [Issue #27174](https://github.com/ggml-org/llama.cpp/issues/27174) means `echo: true` + `logprobs` does not return prompt logprobs, silently breaking lm-eval-style scoring.
- **Be careful running MTP under high KV-cache pressure** — [Issue #26558](https://github.com/ggml-org/llama.cpp/issues/26558) can hard-crash the server with `cublasSgemm INVALID_VALUE`; consider capacity headroom until fixed.
- **Multi-node RPC users should track [PR #26500](https://github.com/ggml-org/llama.cpp/pull/26500)** — it prevents invalid remote buffer pointers when talking to multiple llama.cpp RPC servers.
- **For hybrid/recurrent models, [PR #25592](https://github.com/ggml-org/llama.cpp/pull/25592)** fixes checkpoint state handling and is worth testing if you use slot restarts.
- **Observability is coming:** [PR #27280](https://github.com/ggml-org/llama.cpp/pull/27280) adds optional OTLP/HTTP tracing to the server under a compile-time flag.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-18

## Today's Highlights

No release was cut in the last 24 hours, but 22 PRs saw activity and the tracker is dominated by a cluster of qwen3.8 and MLX-engine regressions. The most strategically significant PRs are the `ollama launch` cloud-model metadata fix (#17828), MLX engine support for the Ling-3.0 architecture (#17643), and big-endian GGUF loading support (#17826). No new stable version or breaking API change was announced.

## Releases & Breaking Changes

None in the last 24 hours.

## New Model & Hardware Support

- **MLX: Ling-3.0 models** — [PR #17643](https://github.com/ollama/ollama/pull/17643) adds MLX engine support for the Bailing MoE V3 architecture behind `Ling-3.0-tiny` and `Ling-3.0-flash`.
- **MLX preflight coverage for gemma4** — [PR #17622](https://github.com/ollama/ollama/pull/17622) adds an `apple-silicon-mlx` preflight profile for the MLX-store gemma4 exports (`31b-mlx-bf16`, `26b-mlx-bf16`, `26b-mxfp8`).
- **Big-endian GGUF hosts** — [PR #17826](https://github.com/ollama/ollama/pull/17826) fixes GGUF tensor endianness on s390x and other big-endian systems, preventing silent tensor data corruption.
- **Still open: Intel iGPU support** — [Issue #3113](https://github.com/ollama/ollama/issues/3113) remains the top hardware feature request (75 👍), but there is no implementation PR.

## Performance & Optimization

- **MLX has no prompt/prefix caching** — [Issue #17829](https://github.com/ollama/ollama/issues/17829): each agent step re-prefills the full 20–30K-token prompt from scratch on the MLX engine, causing TTFT to grow linearly in multi-step sessions. No fix PR is attached.
- **v0.32.14 CPU regression** — [Issue #17833](https://github.com/ollama/ollama/issues/17833): with a model fully resident in VRAM, Ollama 0.32.14 spikes CPU to 50–80% while `ollama ps` reports 100% GPU binding. The same setup on 0.32.13 does not reproduce.
- **MLX vision memory blow-up** — [Issue #17804](https://github.com/ollama/ollama/issues/17804): a 24.5MP image on Qwen3.8-27B MLX requests ~125GB of Metal buffer, crashing on a 48GB M5 Pro MacBook Pro.
- **Embedding truncation visibility** — [PR #17799](https://github.com/ollama/ollama/pull/17799) adds a warning when `/api/embed` silently truncates input to fit the context window. This does not fix truncation but should make silent embedding drift debuggable.

## Stability & Regressions

Ranked roughly by severity:

- **Critical — Cloud agent loop** — [Issue #17617](https://github.com/ollama/ollama/issues/17617): `deepseek-v4-flash:cloud` leaks a literal `</think>` into assistant history, causing a self-sustaining tool-call loop: 193 identical calls, ~31M tokens. No fix PR is attached.
- **High — qwen3.8:27b retry hangs forever** — [Issue #17825](https://github.com/ollama/ollama/issues/17825): after a tool-call XML parse failure returns HTTP 500, re-submitting the identical request hangs indefinitely with no logs until the runner is recycled.
- **High — Gemma 4 MLX returns empty content with `think: false`** — [Issue #17823](https://github.com/ollama/ollama/issues/17823): regression in 0.32.14; the same request on 0.32.5 returns the answer directly.
- **High — MLX vision crash on large images** — [Issue #17804](https://github.com/ollama/ollama/issues/17804) can take down the runner on high-resolution input.
- **Medium — Local API reports cloud auth error** — [Issue #17822](https://github.com/ollama/ollama/issues/17822): `/api/embed` and `/api/generate` return `500 tokenize error: Invalid API Key` on a clean local setup with no Ollama Cloud credentials or reverse proxy.
- **Medium — Duplicate image dimensions collapse** — [Issue #17814](https://github.com/ollama/ollama/issues/17814): two images with identical pixel dimensions in one qwen3.x vision request result in only one image being seen, with no error or warning.
- **Medium — Session loss on network drop** — [Issue #17821](https://github.com/ollama/ollama/issues/17821): Ollama restarts and loses the session when internet connectivity drops.
- **Medium — qwen3.8 download broken** — [Issue #17816](https://github.com/ollama/ollama/issues/17816): `ollama run qwen3.8` fails at manifest pull with `EOF`.
- **Medium — `ollama launch claude` still broken** — [Issue #17811](https://github.com/ollama/ollama/issues/17811): fails with `Input must be provided either through stdin or as a prompt argument` after workspace trust is accepted.
- **Environment/config bugs** — [Issue #17831](https://github.com/ollama/ollama/issues/17831) reports `OLLAMA_HOST` binding to IPv4 vs IPv6; [Issue #17832](https://github.com/ollama/ollama/issues/17832) reports inconsistent `CUDA_VISIBLE_DEVICES` handling with multiple H200s.

No fix PRs were observed in this batch for the top regressions above. Nearby hardening PRs in flight include cloud-model metadata completion for `launch` (#17828), embedding truncation warnings (#17799), and big-endian GGUF support (#17826).

## What This Means for Application Developers

- **Do not blindly retry qwen3.8 tool-call failures.** After a tool-parse 500, the runner can wedge permanently; add client-side timeouts and force a session/runner refresh before retrying. See [Issue #17825](https://github.com/ollama/ollama/issues/17825).
- **Filter reasoning artifacts from cloud-model assistant history.** A literal `</think>` in prior turns can lock agentic clients into a tool-call loop. Strip or escape reasoning tokens, and consider a hard cap on consecutive tool calls. See [Issue #17617](https://github.com/ollama/ollama/issues/17617).
- **Pin MLX versions carefully.** If you rely on `think: false` with Gemma 4 MLX or low-latency agent sessions on Apple Silicon, validate against 0.32.5 before adopting 0.32.14. See [Issue #17823](https://github.com/ollama/ollama/issues/17823) and [Issue #17829](https://github.com/ollama/ollama/issues/17829).
- **Preprocess vision inputs for MLX models.** Very large images can trigger Multi-GB Metal buffer allocations and kill the runner; downscale before sending. See [Issue #17804](https://github.com/ollama/ollama/issues/17804).
- **Treat `/api/embed` truncation as a correctness risk.** The new warning in [PR #17799](https://github.com/ollama/ollama/pull/17799) should be surfaced in any embedding pipeline so truncated inputs are not silently embedded.
- **`ollama launch claude` remains experimental.** If your integration depends on it, keep `ollama run` as a fallback path. See [Issue #17811](https://github.com/ollama/ollama/issues/17811).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-18

## Today's Highlights

No new LiteLLM release was cut in the last 24 hours. The most significant activity is around budget-enforcement correctness — an open bypass report ([#26672](https://github.com/BerriAI/litellm/issues/26672)) plus a related closed global-limiter issue ([#27381](https://github.com/BerriAI/litellm/issues/27381)) — alongside a broad set of provider/proxy fixes. Notable PRs add FLUX 3 video support ([#37224](https://github.com/BerriAI/litellm/pull/37224)), Amazon Comprehend Medical passthrough ([#37229](https://github.com/BerriAI/litellm/pull/37229)), Azure Document Intelligence native OCR responses ([#37194](https://github.com/BerriAI/litellm/pull/37194)), and Bedrock guardrail usage tracking ([#37225](https://github.com/BerriAI/litellm/pull/37225)). A security-relevant `/health` credential leak ([#36898](https://github.com/BerriAI/litellm/issues/36898)) remains open.

## Releases & Breaking Changes

None in the last 24 hours. No release tags, migration notes, or breaking API changes were reported.

## New Model & Hardware Support

- **FLUX 3 video generation** — Adds `black_forest_labs/flux-3-video` to the video provider surface, including text-to-video, image-to-video, continuation, draft mode, keyframes, duration, resolution, aspect ratio, and audio support ([PR #37224](https://github.com/BerriAI/litellm/pull/37224)).
- **Amazon Comprehend Medical passthrough** — New SigV4-signed passthrough routes under `/comprehendmedical`, bringing clinical-text workloads under gateway auth, logging, and spend tracking ([PR #37229](https://github.com/BerriAI/litellm/pull/37229)).
- **Azure Document Intelligence native OCR** — `/v1/ocr` can now return Azure's native `analyzeResult` payload via `x-req-format: native` or `req_format=native`, while preserving per-page cost tracking ([PR #37194](https://github.com/BerriAI/litellm/pull/37194)).
- **Azure realtime model pricing** — Adds `azure/gpt-realtime-2`, `-2.1`, and `-2.1-mini` cost entries, plus separate per-token pricing for realtime image input ([PR #31565](https://github.com/BerriAI/litellm/pull/31565)).
- No new CUDA/ROCm/Metal/CPU or quantization-format work appeared in this snapshot.

## Performance & Optimization

No measured throughput/latency numbers landed in this 24h window. The optimization-adjacent work in flight:

- **Complexity router tier definitions** — Operators can now define custom tier sets for the LLM classifier instead of hardcoded SIMPLE/MEDIUM/COMPLEX/REASONING ([PR #37226](https://github.com/BerriAI/litellm/pull/37226)).
- **Plan-mode tier floor** — Adds `plan_mode_min_tier` so coding-agent clients in plan mode can be routed to premium models rather than the cheapest tier ([PR #37230](https://github.com/BerriAI/litellm/pull/37230)).
- **Adaptive semantic cache threshold** — Proposal to make the valkey-semantic cache's `similarity_threshold` adaptive instead of static ([#36124](https://github.com/BerriAI/litellm/issues/36124)).
- **Memory growth / OOM risk** — Continuous memory increases after `main-v1.82.0-stable` causing pod OOM kills remains open ([#25219](https://github.com/BerriAI/litellm/issues/25219)); no fix PR is visible in this snapshot.

## Stability & Regressions

Ranked by severity. Items marked “fix PR” have a visible PR in the last 24h; others currently have no fix PR in the snapshot.

### Critical

- **Budget enforcement bypassed** — v1.82.3 does not enforce key/user `max_budget` even when spend exceeds the limit ([#26672](https://github.com/BerriAI/litellm/issues/26672)). Related global limiter issue: `max_budget_limiter` instantiated but never registered ([#27381](https://github.com/BerriAI/litellm/issues/27381)). No fix PR currently visible.
- **OOM kills from unbounded memory growth** — Persistent memory increase after upgrading to `main-v1.82.0-stable` ([#25219](https://github.com/BerriAI/litellm/issues/25219)). No fix PR listed.
- **`/health` leaks credentials in plaintext** — GET `/health` returns `extra_headers` and `aws_session_token` unmasked; only `api_key` is stripped ([#36898](https://github.com/BerriAI/litellm/issues/36898)). No fix PR visible.
- **Adaptive router permanently bricks on one bad cell** — A persisted `alpha/beta=0` cell causes every request to fail with `gammavariate: alpha and beta must be > 0.0`, until recovery ([#35590](https://github.com/BerriAI/litellm/issues/35590)). No fix PR visible.

### High

- **Prompt injection detection blocks the event loop** — Heuristics check causes Kubernetes pod restarts; second bug: detection may be bypassable ([#19499](https://github.com/BerriAI/litellm/issues/19499)). No fix PR visible.
- **New DB-backed deployments dropped during router upsert** — First load through `Router.upsert_deployment()` can drop deployments from the in-memory router ([#35577](https://github.com/BerriAI/litellm/issues/35577)). Closed, but no fix PR linked in snapshot.
- **Anthropic pass-through breakages** — `vector_store_ids` / `vector_store` cause Anthropic 400s ([#23741](https://github.com/BerriAI/litellm/issues/23741)); multiple bugs in experimental `/v1/messages` OpenAI pass-through ([#23841](https://github.com/BerriAI/litellm/issues/23841)); mid-stream fallback injects `prefix=True` assistant prefill that breaks Claude fallback targets ([#27967](https://github.com/BerriAI/litellm/issues/27967)). No fix PRs visible.
- **Managed Bedrock batches cannot be cancelled** — `POST /v1/batches/{id}/cancel` fails for LiteLLM-managed Bedrock batches ([#33986](https://github.com/BerriAI/litellm/issues/33986)). Closed, but no fix PR visible.
- **Pricing correctness risks** — `service_tier=priority` silently billed at default OpenAI rates ([#37046](https://github.com/BerriAI/litellm/issues/37046)); Bedrock `CountTokens` unsupported for Claude Opus 5 / Sonnet 5 causes understated token counts ([#37102](https://github.com/BerriAI/litellm/issues/37102)); streamed `usage.cost` may be priced from client-sent aliases instead of the routed deployment ([#36879](https://github.com/BerriAI/litellm/pull/36879)).

### Medium / Lower Severity

- **`rust: true` flag leaks into provider request bodies** — Causes `rust: Extra inputs are not permitted` on `/v1/chat/completions` and `/v1/responses`; fix registers it as a LiteLLM-level param ([PR #37218](https://github.com/BerriAI/litellm/pull/37218)).
- **Anthropic guardrail system rows rejected** — Guardrail-modified system rows inside messages can produce Anthropic 400; fix folds them into the top-level system parameter ([PR #37231](https://github.com/BerriAI/litellm/pull/37231)).
- **Batch API error handling fixes** — Out-of-range `limit` on `GET /v1/batches` now returns OpenAI-parity 400 validation ([PR #37198](https://github.com/BerriAI/litellm/pull/37198)); unresolvable batch/file IDs return 404 instead of 500 ([PR #37201](https://github.com/BerriAI/litellm/pull/37201)).
- **Shadow eval failures** — Shadow eval turns can die with `'tuple' object does not support item assignment`; fix copies messages before router calls and raises judge output cap ([PR #37232](https://github.com/BerriAI/litellm/pull/37232)).
- **Azure gpt-audio pricing entries incorrect** — Fixes proposed for `azure/gpt-audio-1.5-2026-02-23` ([#37169](https://github.com/BerriAI/litellm/issues/37169)) and `azure/gpt-audio-mini-2025-10-06` ([#37170](https://github.com/BerriAI/litellm/issues/37170)).
- **Docs bug** — Docs reference `litellm.turn_on_message_logging`, which does not exist ([#37143](https://github.com/BerriAI/litellm/issues/37143)).
- **Bedrock file-content bucket validation** — Retrieval now validates file content against the configured output bucket, not only the input bucket ([PR #31435](https://github.com/BerriAI/litellm/pull/31435)).

## What This Means for Application Developers

- **Don't rely on `max_budget` as a hard control right now** if you are on or near v1.82.x — verify spend enforcement externally until [#26672](https://github.com/BerriAI/litellm/issues/26672) is resolved. The same applies to global proxy budget limits ([#27381](https://github.com/BerriAI/litellm/issues/27381)).
- **Anthropic/Bedrock pass-through is still risky for advanced features.** Features like `vector_store_ids` ([#23741](https://github.com/BerriAI/litellm/issues/23741)), managed batch cancellation ([#33986](https://github.com/BerriAI/litellm/issues/33986)), and mid-stream fallbacks with prefill ([#27967](https://github.com/BerriAI/litellm/issues/27967)) can fail in production. Prefer direct provider calls for those paths until fixes land.
- **Audit spend logs if you use priority service tiers, Bedrock Anthropic models, or alias-based streaming costs.** The pricing bugs around `service_tier=priority` ([#37046](https://github.com/BerriAI/litellm/issues/37046)), Bedrock `CountTokens` ([#37102](https://github.com/BerriAI/litellm/issues/37102)), and streamed alias pricing ([#36879](https://github.com/BerriAI/litellm/pull/36879)) can produce materially wrong numbers.
- **New passthrough providers are worth evaluating for healthcare/OCR workloads**: Amazon Comprehend Medical ([PR #37229](https://github.com/BerriAI/litellm/pull/37229)) and native Azure Document Intelligence OCR ([PR #37194](https://github.com/BerriAI/litellm/pull/37194)) now route through the gateway with auth, logging, and spend tracking.
- **If you expose `/health` publicly, treat it as a secret leak risk** — it can return `extra_headers` and `aws_session_token` in plaintext ([#36898](https://github.com/BerriAI/litellm/issues/36898)). Restrict access or wait for a sanitization fix.
- **For coding-agent routing, the new complexity-router controls** — `tier_definitions` and `plan_mode_min_tier` ([#37226](https://github.com/BerriAI/litellm/pull/37226), [#37230](https://github.com/BerriAI/litellm/pull/37230)) — give operators much finer control over which model class handles plan-mode vs. execution traffic.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-18

## Today's Highlights
No release landed in the last 24h, but the repo saw heavy Studio-focused stabilization work: critical fixes are in flight for AMD ROCm VRAM reporting by matching adapter counters via LUID (#8863, #8793), external-provider tool-call IDs are being normalized to prevent broken replay (#9116), and a new critical server-side sqlite deadlock was reported (#9008). Open PRs also target Studio startup time, vision-projector VRAM planning, and LAN/API usability.

## Releases & Breaking Changes
None in the last 24 hours.

## New Model & Hardware Support
- No new model architectures or release-grade hardware backends landed today.
- PR #8855 (closed) lets the Studio Hub "Run" button support non-GGUF image/video models such as `unsloth/Z-Image-Turbo-unsloth-bnb-4bit`, matching the GGUF row behavior.
- PR #8937 adds discovery of models installed through oMLX on macOS (`~/.omlx/models`).
- Installer work in PR #8412 adds Vulkan fallback for AMD systems without ROCm, CPU-only torch 2.11 on Linux, and gfx1033 gating.
- Intel GPU support remains a reported gap: install/backend mismatch issues continue to be filed (#8931, #8972).

## Performance & Optimization
- PR #8962 removes pandas from the Studio backend startup import graph. Startup profiling shows this cuts the `routes.data_recipe` → `seed` chain (~2.3s) out of cold-start imports.
- PR #9063 makes Studio's GGUF VRAM plan account for the vision projector (`mmproj`), and can place it on CPU when it does not fit — avoiding OOMs or overcommit from unplanned projector VRAM.
- PR #8882 improves UX by displaying the local model's context window before the first token count arrives, reducing ambiguity during multi-modal/RAG turns.

## Stability & Regressions
Ranked by severity:

- **Critical — Studio server deadlock (#9008)**: after minutes of normal operation, every thread blocks in `sqlite3.connect()`/`close()`, the listening socket stops accepting, and the process becomes unresponsive. No fix PR linked yet.
- **High — ROCm backend cannot load any models (#8998)**: bundled HIP/ROCR mismatch; a retry with bundled HIP is proposed in PR #9002.
- **High — Long Qwen3.8 GGUF chats lose reusable prompt state after model reload (#9037)**, causing an ~11 minute full prefill when the rolling context should have preserved prompt state.
- **Medium — Windows system RAM not released after full VRAM offload (#9033)**: RAM allocated during load persists even when model + KV cache fit entirely in VRAM.
- **Medium — MLX Train/Export falsely greyed out (#9120)**: startup thread race on first `transformers` import, not an install problem.
- **Medium — External-provider stream corruption with template literals (#9098)**: closed; related tool-call ID normalization is addressed in PR #9116.
- **Medium — False tool-call nudges in external Studio loops (#8907)**: fix PRs #9125 and #9126 gate nudges and align defaults across GGUF/external loops.

## What This Means for Application Developers
- If you build on Unsloth Studio's external-provider chat loop, the upcoming tool-call ID normalization (#9116) matters: OpenAI rejects `call_id` >64 chars, and Mistral requires 9 alphanumeric chars — after one tool-using turn, replay could break without this fix.
- For remote/local-LAN integrations, PR #9075 restores `crypto.randomUUID` over plain `http://` LAN addresses, and PR #9102 proposes serving the API without a key when explicitly opted in.
- AMD ROCm users on Windows should see more accurate per-adapter VRAM reporting once #8863/#8793 land, but model load failures on some ROCm stacks may still require the bundled-HIP retry path from #9002.
- Studio's memory planner is being hardened for multimodal models: vision projectors are now counted against VRAM before placement decisions (#9063), so multimodal app deployments should be less likely to OOM from unseen `mmproj` overhead.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*