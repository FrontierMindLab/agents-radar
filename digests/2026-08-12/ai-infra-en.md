# AI Infrastructure Digest 2026-08-12

> Generated: 2026-08-12 04:07 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Digest Report — 2026-08-12

## 1. Ecosystem Overview

The inference stack continues to converge on **DeepSeek-V4-Flash/DSpark** as the primary workload across every layer — serving engines, local runtimes, and gateways all show active enablement, debugging, and performance work for this model family. The dominant themes are **speculative decoding** (EAGLE/NEXTN/DSPARK variants), **KV-cache efficiency**, and **PD (prefill/decode) disaggregation**, with NVFP4/quantized formats and Blackwell (SM120) enablement as secondary fronts. However, production safety is lagging behind feature velocity: every project reports at least one critical-path correctness bug (vLLM's Kimi-K3 long-context NaN degeneration, SGLang's scheduler hang, llama.cpp's RPC buffer overrun, Ollama's q4_0 KV corruption, LiteLLM's Python 3.13 packaging breakage). AMD/ROCm remains a persistent weak spot across all engines, while the gateway layer shifts toward a Rust rewrite and the local-runtime layer shifts toward server-side tooling ergonomics (reasoning_effort, media tools, metrics).

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Layer |
|---|---|---|---|---|
| **vLLM** | 136 updated | 486 updated | **v0.27.1** (patch; DSpark Markov heads) | Serving engine |
| **SGLang** | Not quantified; 1 new tracking issue (#34510) | ~20 notable PRs; no count given | **No new tag**; FlashInfer 0.6.17 bump queued | Serving engine |
| **llama.cpp** | Not quantified; 1 new security-relevant issue (#26912) | ~15 notable PRs | **6 releases** (b10357–b10362) | Local runtime |
| **Ollama** | Not quantified; 14+ bugs ranked | 8+ PRs in review | **v0.32.9** (Nemotron 3.5 Lightning) | Local runtime / distribution |
| **LiteLLM** | Not quantified; 6 active correctness bugs | ~12 fixes in flight | **7 patch releases** (v1.90.7 → v1.96.2) | Gateway |
| **Unsloth** | Not quantified; 12+ regressions ranked | ~15 PRs in flight | **v0.1.701-beta** (Desktop), **v0.1.62-beta** | Training / fine-tuning |

**Signal:** vLLM dominates raw volume (486 PRs/day). llama.cpp and Ollama ship most frequently. LiteLLM's 7 patch releases carry no documented feature deltas — they are maintenance/cosign-signing iterations, suggesting a stabilization phase ahead of the Rust rewrite.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---|---|---|---|---|---|---|
| **DeepSeek-V4-Flash/DSpark** | 🟡 Ampere unsupported; upgrade regression #51758 | 🟡 Hangs/OOM on long-context; multi-node deadlock | 🟡 Garbled output on ROCm; CUDA abort under DSpark | — | 🟢 Cost map added | — |
| **GLM-5.2 Vision NVFP4** | 🟢 Shipped (#51889) | — | — | — | 🟢 Cost map (GLM 5.1/5.2) | — |
| **MiniMax-M3** | 🟢 EAGLE3 2.1–2.3× decode on B200 | 🟢 H3 LoRA support | — | — | — | 🔴 GGUF load failure (#8513) |
| **Kimi-K3** | 🔴 Long-context NaN degeneration (#51039) | 🟡 MoonEP BF16 PoC; FlashInfer workaround removal | — | — | 🟢 Cost map (K2.7-code) | — |
| **DeepGrove Maple** | 🟢 New (20B-A1B MoE) | — | — | — | — | — |
| **EXAONE 4.5** | — | — | 🟢 SWA fix (b10361) | — | — | — |
| **Zamba2 / A.X K2** | — | — | 🟡 In review (#21412, #26757) | — | — | — |
| **Nemotron 3.5 Lightning** | — | — | — | 🟢 Shipped | 🟢 Meta provider backend | — |
| **Muse-Glimmer** | — | — | 🔴 `unknown architecture` (#26858) | 🔴 MLX broken (#17683) | — | 🔴 GGUF cannot load (#8345) |

**Who is ahead?** vLLM leads on sheer breadth of new-model adoption (Maple, GLM-5.2 Vision, group-32 compressed-tensors MoE). llama.cpp is the fastest mover on architecture-level support in the local layer (Zamba2, A.X-K2, Glimmer). Ollama's value-add is packaging (Nemotron Lightning prompt-layout parity). The most notable pattern is **every project struggling with DeepSeek-V4 variants** — the model is ahead of the runtime ecosystem's ability to serve it reliably.

## 4. Performance Frontier

Optimization effort concentrates in six areas:

1. **KV-cache architecture** — vLLM's `[L, B, H, N, C]` layout standardization (#51718) is foundational for future memory work. Ollama's **q4_0 KV corruption** (#17614) underscores the risk of aggressive KV quantization. DeepSeek-V4-Flash-0731's ~56 bytes/KV-token overhead (#51041) caps effective context — a capacity-planning trap.

2. **Speculative decoding** — The most active area across all four execution engines. vLLM: full CUDA-graph capture for FlashInfer verify batches (#50885), EAGLE3 2.1–2.3× decode on MiniMax-M3 NVFP4. SGLang: multi-adapter LoRA × EAGLE/NEXTN/DFLASH/DSPARK (#34337), DCP chain-drafting (#31785). llama.cpp: Glimmer drafter optimization (#26842), MoE compaction correctness fix (#26294 — throughput with correctness implications). Ollama: more realistic spec-decode benchmarks (HumanEval over synthetic word lists). **Watch item:** vLLM reports spec-decode baseline tax (#49986) and throughput collapse at batch thresholds (#49548) — speculative decoding is not free under production defaults.

3. **PD disaggregation** — SGLang's unification of mooncake/nixl/mori transfer backends behind one protocol layer (#34510) is the most strategic move. vLLM's decode-side TTFT work (#51919) shows handover overhead (~197ms) dominates actual KV transfer (~29ms) — the optimization target is clear.

4. **Quantization formats** — NVFP4 is the format du jour (GLM-5.2 Vision, MiniMax-M3, SM120 Blackwell MoE), but it is fragile: vLLM has an NVFP4 MoE reload bug (#50074), SGLang's B12X integration is incomplete (#33709), Ollama's DFlash NVFP4 fails on M5 Pro (#17683).

5. **Gateway / streaming efficiency** — LiteLLM's Rust rewrite targets sub-1ms overhead; the SSE `JSONFragmentAccumulator` (#36610) removes O(n²) buffering for Vertex/Anthropic streaming.

6. **Algorithmic hot-path cleanups** — Unsloth is eliminating superlinear routes (#8499) and quadratic streaming scans (#8428/#8494), targeting agent/tool-heavy workloads where per-token CPU cost dominates.

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** Competing directly on DeepSeek-V4 production readiness, PD disaggregation, and speculative-decoding depth. vLLM is broader (more model support, more active PRs); SGLang is more disciplined about consolidation (PD protocol unification, CPU simulator for scheduler tuning). Both are production-brittle for the flagship model class right now.

- **Local runtimes (llama.cpp, Ollama):** llama.cpp is the architecture-discovery engine (Zamba2, A.X-K2, EXAONE SWA fix) with a heavy backend portability burden (OpenCL, SYCL, Vulkan, ROCm, RPC). Ollama is the distribution/packaging layer: it absorbs llama.cpp upstream work, adds model-library curation and cross-platform packaging, and is moving toward server-side features (metrics, web search, `read_media`, OpenRC installers) that make it a viable local agent backend.

- **Gateway (LiteLLM):** The control plane for model routing, cost, guardrails, and failover. Its activity is dominated by **cost-attribution correctness** (streaming passthrough, OCR, xAI web search, Azure pricing, batch attribution) — the quantitative layer of the ecosystem is still maturing on exactness. The Rust rewrite is the long-term performance bet.

- **Training / fine-tuning (Unsloth):** Positioning expands from fine-tuning into Desktop (local train/inference/export). Its model-support signal is **negative** — GGUF loading failures for MiniMax-M3 and Muse-Glimmer indicate the fine-tuning layer's downstream dependency on llama.cpp architecture support. Its distinct contribution is algorithmic hot-path work for tool-call streaming, which directly benefits agent fine-tuning workflows.

## 6. Trend Signals

**1. DeepSeek-V4 is the stress test, and the ecosystem is failing it in production.** Every serving engine has at least one open critical bug on DSpark/DSV4 long-context paths (vLLM #51041/#51758, SGLang #34235/#34155, llama.cpp #25436/#26554). Teams deploying DSV4 should budget for runtime pinning, bespoke patches, and capacity-modeling against actual (not headline) KV overhead. This is the single most important operational takeaway today.

**2. Speculative decoding is becoming a default, not an optimization.** EAGLE/NEXTN/DSPARK appear across every engine, and multi-adapter LoRA × spec-decode is landing in SGLang. But the baseline-tax reports (#49986, #49548) and subtle correctness interplay (vLLM's #48137 affecting acceptance rates) mean it must be A/B-tested per workload — not enabled blindly.

**3. AMD/ROCm remains the industry's structural weakness.** MI325X worker crashes, Strix Halo garbled output, missing `libhipblas.so.3`, VRAM misdetection, CPU-only fallbacks — every project reports ROCm breakage. If AMD is strategic for your fleet, expect to be a co-debugger, not a consumer.

**4. The gateway layer is shifting from feature velocity to financial correctness.** LiteLLM's seven releases with no feature deltas plus a wave of cost-attribution fixes signal that spend tracking is now a first-class requirement for AI infrastructure. Watch the Azure GPT-5.6 Terra/Luna pricing fix (#36192) and streaming passthrough pricing (#36529) if you report per-key/tag spend.

**5. Local runtimes are becoming agent servers.** `reasoning_effort` propagation (llama.cpp #26941), `read_media` server tools (#25877), Ollama's web search for the Responses API (#17686), and metrics endpoints in both projects are collectively turning local inference into a first-class agent harness. Expect MCP integration to deepen.

**6. Python 3.13 packaging is a canary for ecosystem debt.** LiteLLM's cp310-only wheels (#36526) and Unsloth's `torch==2.11.0+cu130` pip failures (#8456) show the dependency tree is still catching up. Pipeline teams should pin Python versions explicitly.

**7. CPU-based simulation is emerging as a planning tool.** SGLang's high-fidelity CPU inference simulator (#33824) enables scheduler/prefix-cache tuning without GPU spend — a sign that infrastructure teams are prioritizing capacity-planning efficiency as GPU costs dominate.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM Digest — 2026-08-12

### Today's Highlights

Activity remained high: 136 issues and 486 PRs were updated in the last 24 hours. vLLM shipped **v0.27.1**, a patch release adding support for quantized DSpark Markov heads. DeepSeek-V4-Flash/DSpark continues to dominate community attention — Ampere/SM8x enablement remains the most-requested feature ([#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851)), while a 0.26→0.27 upgrade failure ([#51758](https://github.com/vllm-project/vllm/issues/51758)) and a DSV4-0731 KV-cache overhead report ([#51041](https://github.com/vllm-project/vllm/issues/51041)) are the top operational concerns.

---

### Releases & Breaking Changes

- [v0.27.1](https://github.com/vllm-project/vllm/releases/tag/v0.27.1) — patch on top of v0.27.0; adds support for quantized DSpark Markov heads ([#50424](https://github.com/vllm-project/vllm/pull/50424)). No migration notes or config changes were listed.
- Operators upgrading from 0.26.0 to 0.27.0 should watch [#51758](https://github.com/vllm-project/vllm/issues/51758), which reports a DeepSeek-V4-Flash failure on 0.27.0.

---

### New Model & Hardware Support

- [PR #51833](https://github.com/vllm-project/vllm/pull/51833) — Adds **DeepGrove Maple** (`MapleForCausalLM`), a 20B-A1B MoE reasoning model with interleaved sliding-window/global attention.
- [PR #51889](https://github.com/vllm-project/vllm/pull/51889) — Adds **GLM-5.2 Vision NVFP4** support, combining MoonViT/PatchMerger vision with a GLM-5.2 MoE-DSA text backbone and ModelOpt NVFP4 weights.
- [PR #51815](https://github.com/vllm-project/vllm/pull/51815) — Enables **group-32 W4A16 MoE** via compressed-tensors checkpoints, including Chord/Humming integration.
- [PR #51826](https://github.com/vllm-project/vllm/pull/51826) — Adds **torchcodec** as an audio decoding backend with selectable fallback to soundfile/PyAV.
- **DeepSeek-V4-Flash/DSpark on Ampere** remains unsupported and is still the top requested hardware enablement item: [#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851).
- **ROCm**: Kimi-K3 enablement/performance roadmap is tracked in [#50682](https://github.com/vllm-project/vllm/issues/50682), with a chunk-KDA prefill-stall fix in [PR #51862](https://github.com/vllm-project/vllm/pull/51862).

---

### Performance & Optimization

- **KV-cache layout refactor**: [PR #51718](https://github.com/vllm-project/vllm/pull/51718) standardizes KV-cache allocations on the logical `[L, B, H, N, C]` layout — foundational for future memory and kernel work.
- **Speculative decoding**:
  - [PR #50885](https://github.com/vllm-project/vllm/pull/50885) captures full decode CUDA graphs for FlashInfer native-path verify batches, avoiding forced `PIECEWISE` on platforms without trtllm-gen, e.g. SM120 consumer Blackwell.
  - [PR #49652](https://github.com/vllm-project/vllm/pull/49652) fixes autoregressive draft-decode capture with dynamic SD.
  - Watch items: DSD arms show a baseline tax versus no-spec under production defaults ([#49986](https://github.com/vllm-project/vllm/issues/49986)); dynamic SD can cause aggregate-throughput collapse at batch-size thresholds ([#49548](https://github.com/vllm-project/vllm/issues/49548)).
- **MiniMax-M3 NVFP4**: after the NVFP4 correctness fix (#48929), initial B200 results show **EAGLE3 2.1–2.3× decode** on a 1M-token real-prose envelope ([#51494](https://github.com/vllm-project/vllm/issues/51494)).
- **P/D disaggregation**: [PR #51919](https://github.com/vllm-project/vllm/pull/51919) targets decode-side TTFT for NixlConnector; handover currently costs ~197ms p50 while actual KV transfer is only ~29ms.
- **General execution path**:
  - [PR #51738](https://github.com/vllm-project/vllm/pull/51738) removes additional GPU↔CPU syncs on the model execution path.
  - [PR #49171](https://github.com/vllm-project/vllm/pull/49171) skips logits/sampling for unfinished chunked prefills.
- **DeepSeek-V4-Flash**: production A/B testing isolates #48137 as costing ~10.6% spec-decode acceptance, while #48660 shifts output distributions ([#49927](https://github.com/vllm-project/vllm/issues/49927)).

---

### Stability & Regressions

Ranked roughly by severity:

- **Kimi-K3 long-context degeneration** — after ~240K-token prefill, all subsequent requests return a single repeated token with NaN logits; packed KDA prefill suspected ([#51039](https://github.com/vllm-project/vllm/issues/51039)). No fix PR linked.
- **DeepSeek-V4-Flash upgrade failure** — v0.26.0→0.27.0 errors when serving DeepSeek-V4-Flash ([#51758](https://github.com/vllm-project/vllm/issues/51758)). Open and high visibility.
- **Gemma4 + Transformers 5.15.0** — `vllm/vllm-openai:latest` (v0.27.0) fails to start Gemma4 with Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **DeepSeek-V4-Flash-0731 KV overhead** — uses ~8× more KV cache per token than the preview checkpoint: ~56 bytes/token, with `max_model_len` capped at ~121344 on H20 TP=2 ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- **DeepGEMM FP8 Blackwell regression** — v0.24.0+ aborts during FP8 kernel warmup with “Unknown recipe” on sm_120; v0.23.0 worked ([#47130](https://github.com/vllm-project/vllm/issues/47130)).
- **ROCm worker crash** — GPU memory access fault on MI325X TP=4 when sequences cross 2048 tokens with DeepSeek-V4-Flash + sparse_attn_indexer + FP8 KV ([#48266](https://github.com/vllm-project/vllm/issues/48266)).
- **Multimodal cache correctness** — a closed/ready PR fixes P0/P1 processor cache drift ([#46747](https://github.com/vllm-project/vllm/pull/46747)); new PRs address cache rollback after rejection ([#51897](https://github.com/vllm-project/vllm/pull/51897)) and bind shared cache keys to content ([#51899](https://github.com/vllm-project/vllm/pull/51899)).
- **NVFP4 MoE reload bug** — online NVFP4 MoE models re-run kernel setup on reload, leaving compiled paths pointing at stale objects; fix in progress in [PR #50074](https://github.com/vllm-project/vllm/pull/50074).

---

### What This Means for Application Developers

- If you serve **DeepSeek-V4-Flash** on v0.27.x, test the upgrade path carefully before rolling out. Prefer v0.27.1, but watch [#51758](https://github.com/vllm-project/vllm/issues/51758) — 0.26→0.27 is not yet clean for all DSV4 configurations.
- For **DeepSeek-V4-Flash-0731**, do capacity planning using the ~56 bytes/token KV figure ([#51041](https://github.com/vllm-project/vllm/issues/51041)); effective context length may be far below the checkpoint’s headline spec.
- **Long-context Kimi-K3** deployments are risky right now ([#51039](https://github.com/vllm-project/vllm/issues/51039)). Avoid EAGLE/auto-rollout paths that could hit the NaN degeneration state until fixed.
- **Ampere users** should avoid DSpark checkpoints; SM8x support has not landed ([#50576](https://github.com/vllm-project/vllm/issues/50576), [#40851](https://github.com/vllm-project/vllm/issues/40851)).
- **Multi-modal application developers** should watch the pending cache-rollback and key-binding fixes ([#51897](https://github.com/vllm-project/vllm/pull/51897), [#51899](https://github.com/vllm-project/vllm/pull/51899)) if they see stale image/audio data or cache-rejection artifacts.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-12

## Today's Highlights

The project's center of gravity remains DeepSeek-V4 and PD-disaggregation hardening: a new tracking issue (#34510) lays out a staged unification of the three PD transfer backends behind a single protocol layer, while a fresh HiCache fix (#34519) addresses the PP consistency plan from #22607. On the feature side, a new spec enables multi-adapter LoRA with EAGLE/NEXTN/DFLASH/DSPARK speculative decoding (#34337), and the FlashInfer 0.6.17 bump (#33997) is queued as a release-highlight.

## Releases & Breaking Changes

No new tagged releases in the last 24h. Two behavior-affecting changes are in flight:

- **FlashInfer 0.6.17 bump** — removes Kimi K3 workarounds; watch for attention-backend behavior shifts on K3 workloads ([PR #33997](https://github.com/sgl-project/sglang/pull/33997)).
- **XPU: `SGLANG_USE_SGL_XPU` defaults to true** — the native XPU path becomes the default ([PR #34492](https://github.com/sgl-project/sglang/pull/34492)).

## New Model & Hardware Support

- **MiniMax H3 LoRA** — supports both native fused and Diffusers/PEFT split-QKV layouts, plus `--lora-alpha` for checkpoints omitting alpha metadata ([PR #34359](https://github.com/sgl-project/sglang/pull/34359)).
- **MoonEP BF16 PoC for Kimi-K3** — draft integration adding a distinct `moonep` MoE A2A backend and BF16 contiguous expert layout ([PR #33249](https://github.com/sgl-project/sglang/pull/33249)).
- **SM120 (Blackwell) NVFP4 MoE** — B12X FlashInfer NVFP4 integration tracked for completion ([Issue #33709](https://github.com/sgl-project/sglang/issues/33709)).
- **MLX/Torch interop RFC** — proposes collapsing the MLX runner-stub split into one Torch-owned SRT path with zero-copy MPS access ([Issue #32321](https://github.com/sgl-project/sglang/issues/32321)).
- **AMD Qwen3.5 spec decoding** — AITER top-k1, LM-head pruning, and shared-KV verification for EAGLE ([PR #34005](https://github.com/sgl-project/sglang/pull/34005), [PR #34517](https://github.com/sgl-project/sglang/pull/34517)).

## Performance & Optimization

- **CPU-based inference simulator** — a high-fidelity simulator for evaluating scheduling, latency, throughput, and prefix-cache behavior without loading weights or executing kernels ([PR #33824](https://github.com/sgl-project/sglang/pull/33824)).
- **Speculative decoding × decode context parallelism** — DFLASH and EAGLE/EAGLE3 chain drafting under DCP for MLA models on `tokenspeed_mla` ([PR #31785](https://github.com/sgl-project/sglang/pull/31785)).
- **SM120 perf plan** — DeepSeek V4 and DeepGEMM MQA Indexer items checked off; FlashInfer MLA attention for SM100/103 under TRT-LLM still open ([Issue #19637](https://github.com/sgl-project/sglang/issues/19637)).
- **DeepSeek V4 perf tracking** — new NVIDIA-focused tracking issue for SM90/SM10X (FlashInfer MLA done, TRT-LLM DSv4 attention pending) ([Issue #33636](https://github.com/sgl-project/sglang/issues/33636)).
- **Rust tokenizer manager** — TTFT breakdown analysis landed ([PR #34453](https://github.com/sgl-project/sglang/pull/34453)).

## Stability & Regressions

Active high-severity bugs, ranked:

1. **Scheduler hang in DSV4 sparse prefill** — sglang 0.5.17 with hierarchical cache + 16K chunked prefill on H20; watchdog abort; no fix PR yet ([Issue #34235](https://github.com/sgl-project/sglang/issues/34235)).
2. **CUDA OOM on 1M-token prefill** — DSV4 indexer `fp8_mqa_logits` under `--tp 8` + MegaMoE on 8×B200; serves fine under tp8/dp8 dp-attention ([Issue #34155](https://github.com/sgl-project/sglang/issues/34155)).
3. **Multi-node TP rank-divergence deadlock** — DSpark on 2×DGX Spark; one rank wedges in NCCL proxy append while peer idles ([Issue #33289](https://github.com/sgl-project/sglang/issues/33289)).
4. **Diffusion attention fallback regression** — backend fallback change introduced errors across most models; no fix yet ([Issue #34389](https://github.com/sgl-project/sglang/issues/34389)).
5. **DSpark CUDA-graph slot mismatch** — compact ragged graph uses incompatible request-slot geometry ([Issue #34384](https://github.com/sgl-project/sglang/issues/34384)).

Fix PRs in flight: HiCache load-back state scoped per component ([PR #34519](https://github.com/sgl-project/sglang/pull/34519)); FLUX ROCm warmup crash via PTX norm-fusion disable ([PR #34481](https://github.com/sgl-project/sglang/pull/34481)); FakeKVSender inflight-queue accumulation ([PR #28652](https://github.com/sgl-project/sglang/pull/28652)); non-finite tool-call argument coercion ([PR #28797](https://github.com/sgl-project/sglang/pull/28797)).

CI signal: auto-tracker shows 3 broken / 11 flaky / 671 recently fixed on main ([Issue #17050](https://github.com/sgl-project/sglang/issues/17050)); a CUDA coredump tracker remains the most-commented issue ([Issue #26340](https://github.com/sgl-project/sglang/issues/26340)).

## What This Means for Application Developers

- **DeepSeek-V4 long-context serving on Blackwell/H20 is not yet production-safe** with hierarchical cache + chunked prefill or `--tp 8` + MegaMoE at ~1M-token context; prefer dp-attention configurations until the hang and OOM fixes land.
- **DSpark on multi-node is fragile** — the rank-divergence deadlock is intermittent but serious; pin recent fixes and monitor for the upcoming resolution if you run across 2+ nodes.
- **PD disaggregation** is actively converging on one protocol layer (#34510) — if you run mooncake/nixl/mori backends, expect consolidation churn in transfer control and transport semantics.
- **LoRA + speculative decoding is coming** — multi-adapter EAGLE/NEXTN/DFLASH/DSPARK support means application teams can combine custom adapters with spec-decode throughput gains without a lossless-speculation tradeoff.
- **The CPU simulator** is worth evaluating for capacity planning and scheduler tuning before GPU-expensive benchmarks.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-12

## Today's Highlights
Six releases landed today (b10357–b10362), headlined by a fix enabling SWA (sliding window attention) for EXAONE 4.5, WebGPU CI stabilization, and an OpenCL flash-attention prefille optimization. On the PR side, momentum continues around serving ergonomics: `reasoning_effort` propagation to Jinja templates (#26941), a server-side `read_media` tool (#25877), and a metrics subsystem refactor (#26920). One notable breaking change is incoming: the deprecated `--mmap/--no-mmap/--mlock/--direct-io` flags are being consolidated into a single `--load-mode` option (#26934).

---

## Releases & Breaking Changes

- **b10362** — [Disables the multi-output backend-sampler test on HIP](https://github.com/ggml-org/llama.cpp/pull/26878): the new `multi_output_sampling_chain` test relies on CUB for top-k probs, which is unavailable on HIP; skip prevents abort.
- **b10361** — [Fix SWA not being enabled for EXAONE 4.5](https://github.com/ggml-org/llama.cpp/pull/26848): `load_arch_hparams` evaluated `n_layer() == 64` before `LLM_KV_NEXTN_PREDICT_LAYERS` was populated, so `n_layer_nextn` defaulted and SWA was silently skipped.
- **b10360** — [Suppress incomplete escape-sequence warnings in common/peg](https://github.com/ggml-org/llama.cpp/pull/26780).
- **b10359** — [Fix WebGPU CI errors](https://github.com/ggml-org/llama.cpp/pull/26566): includes i32 `cpy` support, disables subgroup matrices when `max_kv_tile == 0`, and re-enables the all-ops test.
- **b10358** — [Addresses review comments from speculative-decode PR #25532](https://github.com/ggml-org/llama.cpp/pull/26852).
- **b10357** — [OpenCL: FA prefill kernels now transpose the K tile in local memory](https://github.com/ggml-org/llama.cpp/pull/26428).

**Watch item:** PR #26934 migrates `--mmap`, `--no-mmap`, `--mlock`, and `--direct-io` to a unified `--load-mode` argument across examples, docs, and SYCL/Snapdragon scripts. If you script llama.cpp launches with these flags, plan migration.

---

## New Model & Hardware Support

- **Zamba2 architecture** (PR [#21412](https://github.com/ggml-org/llama.cpp/pull/21412)) — in review; adds architecture mapping, tensor layout, and conversion for the Zamba2 family.
- **A.X K2 support** (PR [#26757](https://github.com/ggml-org/llama.cpp/pull/26757)) — adds Sparse Gated Attention and Gated Norm architectures from SKT's A.X-K2.
- **Glimmer drafter optimization** (PR [#26842](https://github.com/ggml-org/llama.cpp/pull/26842)) — open PR targeting the Glimmer speculative-draft path.
- **ROCm 7.14 CI targets** (PR [#25775](https://github.com/ggml-org/llama.cpp/pull/25775), closed) — added Linux/Windows build targets for the first TheRock-based production ROCm release; users are already hitting packaging issues (see #25807 below).
- **EXAONE 4.5 SWA support fixed** (b10361, [#26848](https://github.com/ggml-org/llama.cpp/pull/26848)).
- On the gap side, users report `unknown model architecture: 'muse-glimmer'` (issue [#26858](https://github.com/ggml-org/llama.cpp/issues/26858)) on b10344 Vulkan builds — model-side work still pending.

---

## Performance & Optimization

- **OpenCL FA prefill** (b10357, [#26428](https://github.com/ggml-org/llama.cpp/pull/26428)) — K-tile transpose moved into local memory; targets kernel-level bandwidth improvements for prefill on OpenCL devices.
- **SYCL unary+MUL fusion** (PR [#26411](https://github.com/ggml-org/llama.cpp/pull/26411)) — continues the fusion work from #26015 for `silu/sigmoid/softplus + MUL` on SYCL.
- **CUDA MoE compaction fix** (PR [#26294](https://github.com/ggml-org/llama.cpp/pull/26294)) — fixes duplicate expert-id compaction in `mul_mat_id` (`mmid.cu`) where per-token "any lane matched" was used instead of exact match count; fixes issue #24591. This is correctness, but with throughput implications for MoE models.
- **Expert caching** (PRs [#26563](https://github.com/ggml-org/llama.cpp/pull/26563) and [#26824](https://github.com/ggml-org/llama.cpp/pull/26824), both closed) — author is redesigning with a cleaner commit history; the follow-up promises heatmap-based mmap pinning and real-time CPU↔device expert transfer, off by default.
- **Context-buffer over-reservation on ROCm** (issue [#26038](https://github.com/ggml-org/llama.cpp/issues/26038)) — MTP draft context on HIP reserves excessive compute buffer, unnecessarily shrinking fitted context size; still open.

---

## Stability & Regressions

Ranked by severity:

1. **RPC `SET_ROWS` buffer overrun** (issue [#26912](https://github.com/ggml-org/llama.cpp/issues/26912), *new*) — write-side counterpart to a prior overflow; `SET_ROWS` can write past an output tensor buffer in release builds of `ggml-rpc-server`. Security-relevant if you expose RPC workers to untrusted input.
2. **DeepSeek V4 garbled output on Strix Halo / ROCm** (issue [#25436](https://github.com/ggml-org/llama.cpp/issues/25436)) — 27 comments, 5👍; reproduced across multiple GGUF quants. No fix PR yet.
3. **CUDA `cublasSgemm` "unsupported value" under DSpark speculative decoding** (issue [#26554](https://github.com/ggml-org/llama.cpp/issues/26554)) — hard abort after ~2,000–2,600 decoded tokens on multi-GPU DeepSeek-V4-Flash-0731 setups.
4. **ROCm 7.14 runtime breakage** (issue [#25807](https://github.com/ggml-org/llama.cpp/issues/25807)) — `libhipblas.so.3` missing from release artifacts; affects all ROCm 7.14 users. Also [#26208](https://github.com/ggml-org/llama.cpp/issues/26208): VRAM not allocated on gfx1201 with ROCm 7.14.
5. **Full prompt re-processing with Qwen3.5-2B-MTP** (issue [#24714](https://github.com/ggml-org/llama.cpp/issues/24714)) — cache-data miss forces reprocessing every request; stale but still open.
6. **Glimmer Q8_0 tensor-split assert** (issue [#26902](https://github.com/ggml-org/llama.cpp/issues/26902), *new*) — `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)` on 4×Tesla T10.
7. **Qwen3-Embedding NaN on Volta (sm_70)** (issue [#26044](https://github.com/ggml-org/llama.cpp/issues/26044)) — all-NaN embeddings wedge the server persistently; present in every version since Qwen3-Embedding support landed.
8. **gemma-4-12B fails on OpenVINO** (issue [#24415](https://github.com/ggml-org/llama.cpp/issues/24415)) and **gemma-4-E4B `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)`** (issue [#24132](https://github.com/ggml-org/llama.cpp/issues/24132)) — both still open.
9. **SYCL garbage output on second prompt** (issue [#26845](https://github.com/ggml-org/llama.cpp/issues/26845), *new*).
10. **`-devd CUDA0` crashes draft-dspark** (issue [#26475](https://github.com/ggml-org/llama.cpp/issues/26475)) — tensor-split plus a draft model on device 0 crashes; no first-bad-commit identified.
11. **Vulkan MoE crash on Intel Arc B70** (issue [#23769](https://github.com/ggml-org/llama.cpp/issues/23769)) — Qwen3.6-35B-A3B-MTP models crash on Windows/Vulkan.
12. **Long-running server slowdown** (issue [#22360](https://github.com/ggml-org/llama.cpp/issues/22360)) — Vulkan/7900XTX performance degrades over time, needs reboots; stale.

Some adjacent fixes landed today: the deprecated test-sampler HIP abort was skipped upstream (b10362), and CI was patched for flaky thread and x86 runs (PR [#26927](https://github.com/ggml-org/llama.cpp/pull/26927)).

---

## What This Means for Application Developers

- **`reasoning_effort` is coming to the server** (PR [#26941](https://github.com/ggml-org/llama.cpp/pull/26941)) — OpenAI-style `reasoning_effort` will be parsed from Chat Completions and passed into Jinja templates, so model-specific prompt translation can live in chat templates rather than client code. Currently only `none` is handled; this is a prerequisite for real reasoning-effort control server-side.
- **Server-side image understanding** (PR [#25877](https://github.com/ggml-org/llama.cpp/pull/25877)) — a `read_media` server tool lets vision models read files on the server host, base64-encoding them into the UI. Relevant for agents that need to inspect local files/screenshots.
- **MCP/tooling trajectory continues** — tool-registry refactor (#20673, closed) and the MCP resources/prompts UI regression report (#26862) show the server is actively converging on built-in tools; expect more MCP integration in the web UI.
- **Metrics will change shape** (PR [#26920](https://github.com/ggml-org/llama.cpp/pull/26920)) — derived metrics (e.g., t/s) are being refactored and tied to `llama_decode` outcome rather than async timers. If you scrape `/metrics`, budget for field-name or semantics changes.
- **CLI flag migration ahead** (PR [#26934](https://github.com/ggml-org/llama.cpp/pull/26934)) — move off `--mmap/--no-mmap/--mlock/--direct-io` in your deployment scripts now; they'll be consolidated into `--load-mode`.
- **JSON-schema robustness improves** (PR [#26939](https://github.com/ggml-org/llama.cpp/pull/26939)) — unsupported regex patterns (lookahead/lookbehind, unanchored expressions) will gracefully fall back to JSON string rather than failing the grammar build. Good for users hitting edge-case tool schemas.
- **If you're on ROCm 7.14**, hold upgrades or pin artifacts — the missing `libhipblas.so.3` packaging bug (#25807) breaks all ROCm 7.14 builds, and gfx1201 VRAM allocation is still broken (#26208).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-12

## Today's Highlights

Ollama shipped **v0.32.9** with NVIDIA Nemotron 3.5 Lightning, a 30B MoE / 3B-active-parameter model aimed at low-latency, always-on agent harnesses. Platform work in flight includes a Prometheus-compatible `/metrics` endpoint ([PR #16998](https://github.com/ollama/ollama/pull/16998)), server-side web search for the OpenAI Responses API ([PR #17686](https://github.com/ollama/ollama/pull/17686)), and a fix for stalled direct-URL model pulls ([PR #17551](https://github.com/ollama/ollama/pull/17551)). The most urgent correctness problems are **q4_0 KV quantization producing garbage output** ([#17614](https://github.com/ollama/ollama/issues/17614)) and a **model-loss report after the 0.32.7 update on Jetson AGX Orin** ([#17661](https://github.com/ollama/ollama/issues/17661)).

## Releases & Breaking Changes

- **[v0.32.9](https://github.com/ollama/ollama/releases/tag/v0.32.9)** — Adds NVIDIA Nemotron 3.5 Lightning support (see below).
- **[PR #17679](https://github.com/ollama/ollama/pull/17679)** *(in review)* — Stops applying the server-default `repeat_penalty: 1.1` to models whose published parameters leave it unset. Models relying on that implicit default will generate differently; set `options.repeat_penalty` explicitly in API requests to preserve behavior.
- **[PR #14969](https://github.com/ollama/ollama/pull/14969)** *(in review)* — `ollama create` would move to server-side MLX safetensors imports; GGUF create becomes a wrapper that only packages existing GGUF inputs (no conversion).
- **[PR #17681](https://github.com/ollama/ollama/pull/17681)** *(in review)* — Adds an OpenRC service definition to the Linux installer for Alpine/Gentoo (closes [#17560](https://github.com/ollama/ollama/issues/17560)).

## New Model & Hardware Support

- **NVIDIA Nemotron 3.5 Lightning** — 30B MoE with 3B active params, designed for always-on agent execution with harnesses like OpenClaw and Hermes Age ([library](https://ollama.com/library/nemotron-3.5-lightning)). Prompt-layout support landed via [PR #17672](https://github.com/ollama/ollama/pull/17672) (`nemotron_h` parser/renderer with Jinja parity).
- **[PR #17643](https://github.com/ollama/ollama/pull/17643)** *(in review)* — MLX backend support for Ling-3.0-Tiny (Bailing MoE V3), including FP8/INT4 quantized releases.
- **[PR #17685](https://github.com/ollama/ollama/pull/17685)** *(in review)* — Fixes GPU VRAM detection on AMD Strix Halo (gfx1151), where `hipMemGetInfo()` returns system free RAM instead of VRAM free; adds `OLLAMA_GPU_MEMORY` env override and `SmallCarveOutIGPU` handling for large-VRAM iGPUs.
- **[PR #17688](https://github.com/ollama/ollama/pull/17688)** *(in review)* — Re-enables the MLX CUDA backend in CUDA builds (regression from imagegen removal).

## Performance & Optimization

- **[#17583](https://github.com/ollama/ollama/issues/17583)** — Open regression: Qwen3.6-35B-A3B dropped from ~72 T/s to significantly slower on Mac Studio M2 (64GB) after upgrading beyond 0.32.5. No fix PR yet.
- **[PR #17480](https://github.com/ollama/ollama/pull/17480)** *(in review)* — Speculative-decoding benchmark replaces synthetic word lists with packed HumanEval code prompts, improving draft-model evaluation fidelity.
- **[PR #16998](https://github.com/ollama/ollama/pull/16998)** *(in review)* — Opt-in `OLLAMA_METRICS=1` enables `GET /metrics`: scheduler gauges (`ollama_requests_queued`, `ollama_queue_capacity`, `ollama_models_loaded`), HTTP counters, and per-model token metrics.

## Stability & Regressions

Ranked by severity:

1. **Garbage output with q4_0 KV quantization** ([#17614](https://github.com/ollama/ollama/issues/17614)) — 12 comments, no fix yet. Models emit unintelligible token sequences (e.g., repeated `AI AI AI ...`). Avoid q4_0 KV until resolved.
2. **Models deleted after 0.32.7 update on Jetson AGX Orin** ([#17661](https://github.com/ollama/ollama/issues/17661)) — 4 of 5 local models vanished; only `qwen3.6:35b` survived. Back up `~/.ollama/models` before upgrading on edge devices.
3. **Deterministic CUDA illegal memory access on DGX Spark (GB10)** ([#17596](https://github.com/ollama/ollama/issues/17596)) — Crash in `ggml_cuda_flash_attn_ext_mma_f16_case` during large prefill with head-size-256 models (e.g., Qwen3-Next 80B-A3B `q4_K_M`).
4. **Cross-request response contamination on MLX long-lived runners** ([#17599](https://github.com/ollama/ollama/issues/17599), closed) — With `keep_alive=-1`, the MLX engine intermittently returned verbatim answers to earlier prompts. Fixed, but audit responses from long-running MLX services.
5. **Blob hash verification bypass (SSRF exfiltration)** ([#15485](https://github.com/ollama/ollama/issues/15485)) — When manifest config and layer share a digest, `skipVerify` disables blob verification; a rogue manifest can exfiltrate data. Security-relevant; needs triage.
6. **Sessions not revoked after password/email change** ([#17682](https://github.com/ollama/ollama/issues/17682)) — Unauthorized access persists across credential changes.
7. **ROCm: quantized KV cache stops generation mid-turn** ([#17347](https://github.com/ollama/ollama/issues/17347)) — Affects qwen3.5/3.6 on RX 7900 XTX; tool calls are never emitted; severity tracks quant precision (q8_0 less severe than q4_0).
8. **`context deadline exceeded` on Hugging Face direct-URL pulls** ([#17484](https://github.com/ollama/ollama/issues/17484)) — Fix in [PR #17551](https://github.com/ollama/ollama/pull/17551): retries stalled requests with proper backoff context.
9. **Typhoon OCR 1.5 3B degenerate "@" output on RTX 50-series (Blackwell)** ([#17687](https://github.com/ollama/ollama/issues/17687)) — Works on CPU and other vision models on the same GPU.
10. **Qwen3.6 hybrid falls back to CPU on CUDA with llama.cpp b10353** ([#17669](https://github.com/ollama/ollama/issues/17669)) — Works with b10242.
11. **muse-glimmer MLX variant issues** — DFlash NVFP4 build not working on M5 Pro ([#17683](https://github.com/ollama/ollama/issues/17683)); MLX build leaks `<|message|>` control tokens and ignores `response_format` ([#17684](https://github.com/ollama/ollama/issues/17684)). GGUF build unaffected.
12. **Claude Code returns no response with `qwen3-coder:30b` on Windows** ([#17671](https://github.com/ollama/ollama/issues/17671)) — Generation succeeds but the integration surfaces nothing.
13. **Gemma 4 Cloud HTTP 500 with vision + tool calling** ([#17667](https://github.com/ollama/ollama/issues/17667)).
14. **False "insufficient memory" in LXC** ([#15704](https://github.com/ollama/ollama/issues/15704)) — Ollama uses `MemFree` instead of `MemAvailable`; containers with reclaimable memory fail to load models.

Also closed: [#17668](https://github.com/ollama/ollama/issues/17668) — v0.32.8 Docker image briefly missing from registry (transient); [#17645](https://github.com/ollama/ollama/issues/17645) — muse-glimmer manifest 412 blocked pulls on 0.32.7.

## What This Means for Application Developers

- **Do not run q4_0 KV cache in production.** It can silently corrupt responses ([#17614](https://github.com/ollama/ollama/issues/17614)). Stay on q8_0 KV or the default f16; audit any prior q4_0 KV generations for coherence.
- **Pin and verify Ollama versions before rollout.** Between the missing 0.32.8 Docker image, the 0.32.7 model-loss report, and the M2 performance regression, validate image availability and run a smoke generation before upgrading.
- **Set sampling options explicitly.** If [PR #17679](https://github.com/ollama/ollama/pull/17679) lands, models without a published `repeat_penalty` lose the inherited 1.1 default. Requests that relied on it will produce different output.
- **Treat MLX as risky for multi-tenant and schema-critical workloads.** The response-contamination bug ([#17599](https://github.com/ollama/ollama/issues/17599)) is fixed, but structured outputs remain ignored on MLX ([#16563](https://github.com/ollama/ollama/issues/16563)).
- **Container memory checks are unreliable in LXC** ([#15704](https://github.com/ollama/ollama/issues/15704)) — expect false load failures in Proxmox/LXC; tune memory limits or `OLLAMA_MAX_LOADED_MODELS` accordingly.
- **Don't build cache-aware routing on Ollama Cloud metrics.** Cloud always reports 0 cached tokens ([#15758](https://github.com/ollama/ollama/issues/15758)).
- **Codex web search is coming.** [PR #17686](https://github.com/ollama/ollama/pull/17686) adds server-side `web_search` to the OpenAI Responses API compatibility layer, enabling native Codex web search against local or cloud models.
- **Claude Desktop integration is macOS/Windows-only** ([#17653](https://github.com/ollama/ollama/issues/17653)); on Linux, use `ollama launch claude` without the desktop harness.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-12

## Today’s Highlights

- A new wave of maintenance releases shipped, from `v1.90.7` to `v1.96.2`; the only release-body content is the cosign Docker image signature note, so expect no user-facing feature deltas from this batch.
- The Rust rewrite remains the headline performance initiative: the parent issue describes a sub-1ms-overhead AI gateway and is open for early beta signups ([#31263](https://github.com/BerriAI/litellm/issues/31263)).
- Several correctness fixes are in flight around streaming cost accounting, guardrail persistence, and SSE fragment handling for Vertex/Anthropic, which should materially help production users running streaming workloads.

## Releases & Breaking Changes

- Patch releases published in the last 24h:
  - [v1.96.2](https://github.com/BerriAI/litellm/releases/tag/v1.96.2)
  - [v1.95.1](https://github.com/BerriAI/litellm/releases/tag/v1.95.1)
  - [v1.94.3](https://github.com/BerriAI/litellm/releases/tag/v1.94.3)
  - [v1.93.2](https://github.com/BerriAI/litellm/releases/tag/v1.93.2)
  - [v1.92.2](https://github.com/BerriAI/litellm/releases/tag/v1.92.2)
  - [v1.91.5](https://github.com/BerriAI/litellm/releases/tag/v1.91.5)
  - [v1.90.7](https://github.com/BerriAI/litellm/releases/tag/v1.90.7)
- No breaking API/config changes are documented in the release bodies.
- All LiteLLM Docker images are signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using the key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Operators should verify image signatures before deploying.

## New Model & Hardware Support

- Model/cost-map additions: [PR #36496](https://github.com/BerriAI/litellm/pull/36496) adds DashScope Model Studio models — Qwen3.8-Max, DeepSeek V4, GLM 5.1/5.2, and Kimi K2.7-code — to the cost map with prices, context limits, and capability flags.
- Ollama runtime capabilities: [PR #36574](https://github.com/BerriAI/litellm/pull/36574) enables `/api/show`-based capability and context-window lookup for Ollama models, so `supports_vision`, `supports_function_calling`, and context windows are no longer blank.
- Meta Model API is backend-supported (`meta` provider / `meta/muse-spark-1.1`) but still missing from the UI Dashboard “Add Model” provider dropdown ([#36164](https://github.com/BerriAI/litellm/issues/36164)).
- No new CUDA/ROCm/Metal/CPU or quantization-format support landed in this window.

## Performance & Optimization

- **Rust migration**: [Issue #31263](https://github.com/BerriAI/litellm/issues/31263) remains the parent tracking issue for the Rust rewrite, targeting sub-1ms gateway overhead and a lower-resource “litest” AI gateway. Early beta signup is linked there.
- **Streaming SSE efficiency**: [PR #36610](https://github.com/BerriAI/litellm/pull/36610) introduces a shared `JSONFragmentAccumulator` for Vertex and Anthropic. It removes O(n²) whole-buffer copying per chunk and adds an Anthropic parse-deferral heuristic to avoid wedging on concatenated JSON envelopes.
- **Vertex streaming buffers**: [PR #31922](https://github.com/BerriAI/litellm/pull/31922) switches accumulated JSON streaming shards to a list buffer.
- **DB pool observability**: [PR #36607](https://github.com/BerriAI/litellm/pull/36607) exposes Prisma connection pool saturation metrics, which should help separate database CPU/latency issues from pool exhaustion during scale incidents.
- **MCP startup resilience**: [PR #36599](https://github.com/BerriAI/litellm/pull/36599) warms MCP OAuth metadata in the background instead of synchronously, reducing startup delay and outage exposure when optional MCP servers are slow or unreachable.

## Stability & Regressions

- **Python 3.13 packaging broken**: `litellm 1.96.1` only publishes cp310 wheels and no sdist, so Python 3.13 users cannot install latest versions ([#36526](https://github.com/BerriAI/litellm/issues/36526)). No fix PR is open yet.
- **Streaming crash on usage-only chunks**: `_should_start_new_content_block` unconditionally accesses `chunk.choices[0]`; empty-`choices` usage-only chunks from OpenAI-format backends crash `/v1/messages` streaming ([#36553](https://github.com/BerriAI/litellm/issues/36553)). No fix PR is linked.
- **Content filter guardrails not visible**: `litellm_content_filter` evaluation results are missing from request logs and Guardrails Monitor ([#36566](https://github.com/BerriAI/litellm/issues/36566)); [PR #36606](https://github.com/BerriAI/litellm/pull/36606) adds persistence for content-filter evaluations.
- **`sensitive_data_routing` config rejected**: The guardrail is documented but not recognized by configuration validation ([#36535](https://github.com/BerriAI/litellm/issues/36535)).
- **Azure GPT-5.6 cost map wrong**: `azure/gpt-5.6-terra` and `azure/gpt-5.6-luna` still carry OpenAI post-cut prices, not Azure’s published meters ([#36192](https://github.com/BerriAI/litellm/issues/36192)). This affects any Azure-based GPT-5.6 Terra/Luna spend tracking.
- **Failover blocked by `APIConnectionError`**: `cooldown_handlers.py` hardcodes `APIConnectionError`, preventing failover to healthy deployments for some connection-level failures ([#27362](https://github.com/BerriAI/litellm/issues/27362)).
- **Streaming reasoning-field crash**: `stream=True` with providers returning a `reasoning` field inside OpenAI deltas can raise `TypeError: 'async for' requires an object with aiter method` ([#27670](https://github.com/BerriAI/litellm/issues/27670)).
- **Mid-stream fallback gap for Anthropic messages**: The router does not catch mid-stream Anthropic errors when using `/v1/messages` / `anthropic_messages` route type ([#24004](https://github.com/BerriAI/litellm/issues/24004)).
- **Anthropic `effort` forced to `xhigh`**: The Anthropic message transformer sets `effort: xhigh` on Claude models that reject it, causing 400s for Claude Code users ([#27168](https://github.com/BerriAI/litellm/issues/27168)).
- **Cost attribution fixes in flight**:
  - Streamed passthrough Responses calls log zero tokens/spend; [PR #36529](https://github.com/BerriAI/litellm/pull/36529) reads terminal `response.completed/incomplete/failed` events to price them correctly.
  - Custom pricing in `litellm_params` is not folded into `model_info`; [PR #36584](https://github.com/BerriAI/litellm/pull/36584) fixes this for deployment-level pricing overrides (related to [#27656](https://github.com/BerriAI/litellm/issues/27656)).
  - OCR calls ignore deployment custom pricing; [PR #36609](https://github.com/BerriAI/litellm/pull/36609) fixes it.
  - Anthropic passthrough batch costs lack key/team/tag attribution; [PR #36468](https://github.com/BerriAI/litellm/pull/36468) fixes attribution.
  - xAI web search costs are billed at zero because of the legacy `num_sources_used` path; [PR #30817](https://github.com/BerriAI/litellm/pull/30817) switches to `server_side_tool_usage_details.web_search_calls`.
- **Guardrail + streaming edge cases**: [PR #36598](https://github.com/BerriAI/litellm/pull/36598) fixes Bedrock Anthropic SSE streams that previously 500'd and skipped output scanning. [PR #35413](https://github.com/BerriAI/litellm/pull/35413) and [PR #35425](https://github.com/BerriAI/litellm/pull/35425) initialize `completed_response` on bridge/MCP streaming iterators so mid-stream errors trigger normal fallback instead of `AttributeError`.

## What This Means for Application Developers

- **Pin carefully if you use Python 3.13**: latest releases may not install cleanly until the packaging regression is fixed ([#36526](https://github.com/BerriAI/litellm/issues/36526)).
- **Streaming applications should watch the fallback/crash fixes**: if you see `AttributeError` on bridged `/v1/responses` or crashes on usage-only chunks, the in-flight PRs above are likely the resolution path.
- **Cost/spend reporting remains a moving target**: Azure GPT-5.6 Terra/Luna, OCR, xAI web search, batch passthrough, and streaming passthrough all have active cost-correctness bugs. If you rely on exact per-key/tag spend, audit those paths before upgrading.
- **Guardrail users**: content-filter evaluations should become visible with [PR #36606](https://github.com/BerriAI/litellm/pull/36606), but `sensitive_data_routing` is still broken as of this digest.
- **MCP-heavy deployments**: the background OAuth metadata change in [PR #36599](https://github.com/BerriAI/litellm/pull/36599) is worth testing; it targets startup failures caused by optional MCP servers.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest — 2026-08-12

### 1. Today's Highlights

Unsloth shipped **v0.1.701-beta** with the first public **Unsloth Desktop** app, an open-source desktop client for running and training models locally on Windows, macOS, and Linux. The rest of the activity is concentrated on hardening Unsloth Studio: multiple open PRs are fixing superlinear/quadratic backend and streaming paths, while the issue tracker shows a wave of beta-related regressions around Windows paths, AMD ROCm installs, GGUF model loading, and custom OpenAI-compatible providers.

---

### 2. Releases & Breaking Changes

- **[v0.1.701-beta — Unsloth Desktop](https://github.com/unslothai/unsloth/releases/tag/v0.1.701-beta)**  
  Introduces Unsloth Desktop: local training, inference, export and deployment from one cross-platform app. A second release entry, **v0.1.70-beta**, appears with identical release text and is likely a duplicate listing.
- **[v0.1.62-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.62-beta)** — “Many bug fixes.” No further release notes or migration details were included.
- No documented API/config breaking changes in this cycle. Application developers should note that version reporting can be misleading: [#8171](https://github.com/unslothai/unsloth/issues/8171) documents that `unsloth.__version__` aliases `unsloth_zoo.__version__`, so core/zoo version drift can misreport.

---

### 3. New Model & Hardware Support

No newly supported model architecture was announced in the last 24 hours. The notable model-support signal is negative: several GGUF models are currently failing to load in Studio/llama.cpp.

- **[MiniMax-M3 GGUF load failure](https://github.com/unslothai/unsloth/issues/8513)** — `UD-Q6_K_XL` fails with missing `indexer` keys. Similar report at [#8360](https://github.com/unslothai/unsloth/issues/8360).
- **[Muse-Glimmer-30B GGUF cannot load in bundled llama.cpp](https://github.com/unslothai/unsloth/issues/8345)** — Studio downloads the GGUF, but bundled `llama-server` does not recognize the `muse-glimmer` architecture.
- **[Qwen3.5 4B Vision notebook failure](https://github.com/unslothai/unsloth/issues/7124)** — still open, no fix PR linked.
- **Hardware/backend support:** [PR #8520](https://github.com/unslothai/unsloth/pull/8520) adds a UI-level GGUF inference backend selector for **Automatic, CPU, CUDA, ROCm, and Vulkan** in Studio Settings.
- **Quantization:** no new quant format landed. NVFP4 on an RTX 5060 Ti 16GB remains broken per [#8246](https://github.com/unslothai/unsloth/issues/8246).

---

### 4. Performance & Optimization

Several performance PRs are in flight, mostly targeting Studio backend streaming and data-layer hot paths. No concrete throughput/latency numbers were published with these PRs.

- **[PR #8499 — Five superlinear paths in routes/data layer](https://github.com/unslothai/unsloth/pull/8499)** — Pure algorithmic rewrites to remove superlinear behavior; no behavior change intended.
- **[PR #8428 — Stop rescanning the whole answer on every streamed token](https://github.com/unslothai/unsloth/pull/8428)** — Makes tool-markup scanning linear in streaming responses instead of quadratic over accumulated text.
- **[PR #8494 — Linear-time tool signal scanning in safetensors/healer paths](https://github.com/unslothai/unsloth/pull/8494)** — Stacked on #8428; removes remaining quadratic scans in tool paths.
- **[PR #8498 — Cut backend start time, stop blocking the event loop](https://github.com/unslothai/unsloth/pull/8498)** — Targets backend startup and event-loop blocking work.
- **[PR #8435 — Drop the speculative drafter under Auto when VRAM is tight](https://github.com/unslothai/unsloth/pull/8435)** — Auto VRAM fitting now sacrifices the speculative-decoding drafter before context length or OOM.
- **[PR #8516 — Keep xFormers attention masks on the GPU running each layer](https://github.com/unslothai/unsloth/pull/8516)** — Fixes multi-GPU padding-free/packed training failures when attention bias and QKV land on different devices.
- **[PR #8514 — Fix chat search dialog stutter](https://github.com/unslothai/unsloth/pull/8514)** — Fixes desktop-app UI stutter when opening the search dialog.

---

### 5. Stability & Regressions

Ranked roughly by severity.

- **Desktop app cannot start on Linux** — [#8463](https://github.com/unslothai/unsloth/issues/8463): AppImage fails with missing required Linux libraries. Open, no fix PR yet.
- **AMD ROCm install/backend misdetection**  
  - [#7275](https://github.com/unslothai/unsloth/issues/7275): Windows AMD installer replaces ROCm PyTorch with non-ROCm torch, breaking import.  
  - [#8473](https://github.com/unslothai/unsloth/issues/8473): Studio reports AMD GPU as healthy but runs CPU-only, with no reconciliation.  
  - [#8364](https://github.com/unslothai/unsloth/issues/8364): ROCm whisper update reports missing `hipblaslt` kernel catalog (closed).
- **Windows drive-letter GGUF path breaks local serving** — [#8368](https://github.com/unslothai/unsloth/issues/8368) and [#8375](https://github.com/unslothai/unsloth/issues/8375): Windows `C:\...` paths are split at the drive letter, causing 503 `model_switch_failed`. Both closed; app developers should verify their Studio build includes the path fix.
- **Exported fine-tune tokenizer is invalid** — [#8444](https://github.com/unslothai/unsloth/issues/8444): exported `tokenizer_config.json` contains `"tokenizer_class": "TokenizersBackend"`, which `transformers` cannot load.
- **Custom OpenAI-compatible provider limits are wrong** — [#8509](https://github.com/unslothai/unsloth/issues/8509): Studio falls back to 32K max output even for known model families. Fix PR: [#8512](https://github.com/unslothai/unsloth/pull/8512).
- **OpenRouter free models incorrectly rejected** — [#8518](https://github.com/unslothai/unsloth/issues/8518): free models are detected as OpenRouter but fail with “Insufficient credits.”
- **Studio/package update handling**  
  - [PR #8515](https://github.com/unslothai/unsloth/pull/8515): repairs duplicate package metadata during updates.  
  - [PR #8505](https://github.com/unslothai/unsloth/pull/8505): verifies installed version after update pass.  
  - [#8171](https://github.com/unslothai/unsloth/issues/8171): closed bug where `unsloth.__version__` misreports versions when core releases ahead of zoo.
- **Other open regressions of note:**  
  - [#8510](https://github.com/unslothai/unsloth/issues/8510): “Run Unsloth at login” fails on Windows 11.  
  - [#8456](https://github.com/unslothai/unsloth/issues/8456): pip fails to download `torch==2.11.0+cu130`; reporter suggests replacing pip with wget in the installer.  
  - [#8406](https://github.com/unslothai/unsloth/issues/8406): Windows ROCm Studio routes a text GGUF into the diffusion image loader; Flux import also fails.  
  - [#7732](https://github.com/unslothai/unsloth/issues/7732): refreshing a model response 5–6 times deletes earlier revisions.  
  - [#7164](https://github.com/unslothai/unsloth/issues/7164): models keep swapping out of VRAM during idle on AMD Radeon PRO cards.  
- **CI/test-infrastructure fixes:** [#8506](https://github.com/unslothai/unsloth/pull/8506) clears four main CI reds; [#8486](https://github.com/unslothai/unsloth/pull/8486) installs `torchao` in backend CI; [#8440](https://github.com/unslothai/unsloth/pull/8440) and [#8489](https://github.com/unslothai/unsloth/pull/8489) add real Kaggle T4 CUDA smoke coverage.

---

### 6. What This Means for Application Developers

- **If you build on Unsloth Desktop/Studio, expect beta-grade friction on Windows and AMD.** Verify your server actually started on the right backend (`CUDA`/`ROCm`/`Metal`/`CPU`) rather than trusting the installer’s GPU detection.
- **Studio remains a moving target for custom OpenAI-compatible providers.** If you depend on large output windows or reasoning controls, track [#8509](https://github.com/unslothai/unsloth/issues/8509) and [#8517](https://github.com/unslothai/unsloth/issues/8517); the fix for output limits is already in review ([#8512](https://github.com/unslothai/unsloth/pull/8512)).
- **Validate exported tokenizer files before shipping fine-tunes.** The `TokenizersBackend` issue ([#8444](https://github.com/unslothai/unsloth/issues/8444)) will break downstream `AutoTokenizer` loading.
- **Before downloading large GGUF quants, confirm the bundled `llama-server` supports the target architecture.** MiniMax-M3 and Muse-Glimmer are both failing at load time despite valid cached GGUFs.
- **The streaming/backend performance PRs are directly relevant to long-running agent/chat workloads.** Once merged, #8428, #8494, and #8499 should reduce per-token CPU overhead in tool-call and Studio backend paths. No benchmark numbers are available yet.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*