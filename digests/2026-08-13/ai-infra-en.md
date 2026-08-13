# AI Infrastructure Digest 2026-08-13

> Generated: 2026-08-13 01:04 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Inference Infrastructure
**Date:** 2026-08-13 | **Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

The inference stack is simultaneously maturing and destabilizing: new hybrid architectures (DeepSeek-V4-Flash, Kimi-K3, Gemma-4) are stressing every engine at once, producing correlated regression clusters across vLLM, SGLang, and llama.cpp rather than isolated incidents. Speculative decoding has moved from optional accelerator to default expectation, but remains the single most fragile subsystem — DSpark/DFlash/MLP all show failure modes under multi-node or high concurrency. Meanwhile, the stack is bifurcating along deployment scale: production serving engines (vLLM, SGLang) are investing in PD-disaggregation, multi-node tensor parallelism, and Blackwell/ROCm kernel enablement, while local runtimes (llama.cpp, Ollama) chase tool-calling correctness, MLX support, and agentic integrations. A third signal: spend/security integrity issues in the gateway layer (LiteLLM token-hash leaks, spend-log drops; Ollama SSRF) indicate operational trust is becoming as important as raw throughput.

---

## 2. Activity Comparison

| Project | Layer | Issues Cited | PRs Cited | Releases (24h) | Notable |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | 16 | 14 | None | v0.27.0 regression cluster (idle stall, DeepSeek-V4-Flash); substantial fix pipeline |
| **SGLang** | Serving engine | 13 | 10 | None | Blackwell NVFP4 NaN (0.0 GSM8K); Kimi-K3 MLA fusion reverted |
| **llama.cpp** | Local runtime | 16 | 15 | **3** (b10369, b10373, b10375) | RTX 5080 ~40% regression; Qwen tool-parsing fix shipped |
| **Ollama** | Local runtime | 11 | 14 | **1 RC** (v0.32.10-rc1) | Default `repeat_penalty` flip; MLX NVFP4 prefill speedup |
| **LiteLLM** | Gateway | 13 | 16 | None | Spend-log durability (3 PRs); 429 token-hash leak; Parallel AI + Cohere multimodal |
| **Unsloth** | Fine-tuning / desktop | 19 | 17 | None | Deep Research freeze fixes; AMD GPU-detection mismatch; local tool-calling enablement |

*Counts reflect issues/PRs explicitly referenced in each digest; total activity (including unlisted items) is higher in all projects.*

---

## 3. Model Support Race

**DeepSeek-V4/Family** — The most contested model this cycle. **vLLM** added XPU sequence parallelism for MoE activation memory; **SGLang** consolidated SM90/SM10X perf tracking and hit a 1M-token prefill OOM in the nonpaged indexer (workaround: `dp-attention`); **llama.cpp** saw ROCm gfx1151 RPC crashes past 4096 tokens and has no confirmed full support. **Verdict:** Nobody fully safe yet — vLLM has regressions on 0.27.0, SGLang has scheduler hangs, and the DSPark+DeepSeek-V4-Flash combination fails on both engines.

**Kimi-K3** — **vLLM** leads on ROCm: AITER MLA head padding (TP4 24-head/rank) plus removed redundant projection copies. **SGLang** regressed: MLA gate-fusion PR reverted after CI failure, DSpark launch failures at `concurrency=1`. **llama.cpp** has a text-model PR in review (KDA+MLA hybrid). **Verdict:** vLLM ahead on AMD; SGLang needs to stabilize.

**Qwen 3.5/3.6** — **llama.cpp** shipped the tool-parsing fix (b10375, closed #26763) and has Vulkan NaN issues on Mali; **Ollama** reports CPU-fallback on CUDA pinned to llama.cpp b10353; **vLLM** has a catastrophic MTP spec-decode throughput collapse at batch-size thresholds. **Verdict:** llama.cpp most responsive; vLLM perf issue unresolved.

**MiniMax-M3** — **vLLM** published the benchmark: 2.1–2.3× EAGLE3 decode on 8×B200 NVFP4. **Ollama** accelerated NVFP4 MLX prefill ~7–8%. **Unsloth** GGUF shards broken (indexer key mismatch). **Verdict:** vLLM leads on NVIDIA, Ollama on Apple silicon.

**New architectures** — **llama.cpp** shipped pocket-tts and has Longcat-Flash (zero-computing experts) and Glimmer-4 tensor-split assertions; **LiteLLM** added Parallel AI chat/responses, Cohere multimodal embeddings, and corrected Muse Spark 1.2 pricing; **Ollama** added Nemotron vision on MLX and Meta Muse Code CLI integration.

**Bottom line:** No engine has clean, regression-free support for the current wave of hybrid-attention models. vLLM is furthest on AMD, llama.cpp is fastest to ship correct tool-calling fixes, and local tool-calling features are migrating down-stack (Unsloth adding MCP/Code/Search for self-hosted backends; Ollama adding server-side web search to `/v1/responses`).

---

## 4. Performance Frontier

| Area | Concentration of Effort |
|---|---|
| **Speculative decoding** | Highest-velocity area. vLLM: DSpark adaptive verification (closed), DFlash slot fix, Qwen MTP throughput collapse. SGLang: GDN avoids materializing Q/K/V tensors, GLM-5 DSA dense k-only fast path. llama.cpp: draft-type auto-detect from GGUF (fixes silent no-op), DFlash 2× regression on AMD. Ollama: disabling `repeat_penalty` removes a sampling path, improving spec-decode throughput. **Takeaway:** Everyone ships it, nobody has it stable. |
| **KV cache / prefix caching** | vLLM: KV-block-zeroing launch bounds, skip mm-tensor broadcast for prefix-cache hits. Ollama: file-backed MLX KV connector with safetensors snapshots for long-prefix restore; q4_0 KV quantization produces garbage output. llama.cpp: MTP draft context over-reservation reduces fitted context on ROCm. |
| **Quantization** | NVFP4 is the dominant format and the dominant source of bugs: SGLang's FlashInfer tile-192 path NaNs on SM100/SM103; vLLM's MiniMax-M3 NVFP4 needed a correctness fix before benchmarks; SGLang adds AMD MXFP4 online requantization for MI355x; Ollama fuses global-scale multiply for MLX NVFP4. |
| **Distributed serving** | PD-disaggregation consolidating: SGLang moving to single protocol layer (#34510), llama.cpp WIP dedicated prefill device groups (#25675), vLLM multi-node TP=4 idle stall. llama.cpp adds RPC tensor sharding over RDMA. Multi-node stability is the weak point. |
| **Kernels / backends** | FlashInfer (Mega MoE PR in SGLang, NVFP4 regressions), DeepGEMM MQA Indexer (SGLang), AITER unified attention (vLLM AMD), RMSNorm CUDA rounding-boundary fix (vLLM), OpenCL Adreno SDPA (llama.cpp). AMD/ROCm investment is real but CI gates are only now being added. |
| **Regression velocity** | Concerning pattern: llama.cpp RTX 5080 40% throughput drop in 3 builds; vLLM 0.26→0.27 upgrade breaks DeepSeek-V4-Flash; SGLang CI at 3 broken/11 flaky tests. Performance work is currently outpaced by regressions in all three engines. |

---

## 5. Layer Positioning

| Project | Layer | Core Value Proposition | Competitive Pressure |
|---|---|---|---|
| **vLLM** | Production serving engine | Highest-throughput multi-node serving; TP/PP/SP; broadest model coverage (Kimi, DeepSeek, MiniMax) | SGLang closing on perf; regression severity in 0.27.0 erodes trust |
| **SGLang** | Production serving engine | FlashInfer/DeepGEMM kernel depth; PD-disaggregation; strong Blackwell intent | vLLM's mindshare; own CI instability and NVFP4 NaN undermine positioning |
| **llama.cpp** | Local/edge runtime | GGUF ecosystem; fastest release cadence (3 releases/24h); broadest hardware (Vulkan, OpenCL, RPC, OpenVINO) | Ollama consumerizing the same runtime; RTX 5080 regression hurts desktop credibility |
| **Ollama** | Local developer runtime | Zero-config UX; MLX leadership on Apple silicon; agent/API surface expanding (web search, `reasoning_effort`) | llama.cpp cadence; structured-output bugs on thinking models |
| **LiteLLM** | Gateway / proxy | Provider abstraction, routing, spend tracking, cost maps; 600+ providers | Spend-log durability and pricing accuracy issues threaten FinOps trust; security items (token-hash leak, Redis cross-talk) need priority |
| **Unsloth** | Fine-tuning + desktop Studio | Fast fine-tuning (Q-LoRA), derivative llama.cpp runtime, Studio UX; now adding local tool-calling (MCP/Search/Code) | Straddles training and serving; AMD detection issues and GGUF shard mismatches |

**Structural observation:** The middle is getting crowded. Unsloth Studio and Ollama both wrap llama.cpp; vLLM and SGLang are converging on the same performance surface (FlashInfer, DeepGEMM, NVFP4, PD-disagg). Differentiation is shifting from raw throughput to correctness-at-scale, hardware coverage (AMD/MLX), and agentic integrations.

---

## 6. Trend Signals

1. **New hybrid architectures break all engines simultaneously.** DeepSeek-V4-Flash, Kimi-K3, and Gemma-4 each triggered correlated failures across vLLM, SGLang, and llama.cpp — same model, different failure modes per engine. Application teams should not expect any engine to have "clean" support for new MLA/hybrid models at launch; budget for workarounds.

2. **Speculative decoding is the new production liability.** Every engine has an open spec-decode issue (vLLM Qwen MTP collapse, SGLang DSpark multi-node deadlock, llama.cpp DFlash 2× slowdown, Ollama silent no-op draft models). The fixes are promising (DSpark adaptive verification, GGUF metadata auto-detection) but verification is immature.

3. **PD-disaggregation is becoming table stakes.** SGLang is consolidating its protocol, llama.cpp is prototyping prefill device groups, and vLLM has multi-node transport bugs — all within the same week. This is the next major architectural shift; configs and deployment patterns will change.

4. **AMD/ROCm is receiving first-class investment but remains second-class in practice.** AITER MLA support, MXFP4 requantization, RDNA4 docs, and gfx1201 detection are landing — alongside OOMs, HiCache regressions, broken Windows binaries, and CPU-fallback traps. The investment is real; the polish is not.

5. **NVFP4 is the new FP16 — and the new source of silent corruption.** Both SGLang (NaN on SM100/SM103, 0.0 GSM8K) and vLLM (MiniMax correctness fix before benchmarking) demonstrate that quantization-format enablement is outpacing numerical validation. Validate accuracy before trusting throughput numbers on Blackwell.

6. **Trust infrastructure is the emerging battleground.** LiteLLM spend-log drops, incorrect Azure pricing rows, token-hash leaks in 429 bodies, Ollama SSRF/blob-verification bypass, and response cross-talk in Redis Cluster — these are the failures that matter to enterprises, not tokens/sec. Gateway and spend-data integrity should be audited as carefully as inference performance.

7. **Agentic features are moving down the stack.** Ollama ships server-side web search and `reasoning_effort` mapping; Unsloth enables MCP/local tool-calling on self-hosted backends; llama.cpp fixes Qwen tool parsing; LiteLLM adds Parallel AI search APIs. The "agent-ready" bar now includes correct tool-call extraction, deterministic permissioning, and streaming `finish_reason` semantics — not just raw generation speed.

8. **Pin versions; regression velocity is high.** vLLM 0.27.0, llama.cpp b10359+, and SGLang 0.5.17 all have at least one blocking regression. The digest data shows a consistent pattern: upgrades are the primary source of production incidents this cycle.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-13

## 1. Today's Highlights
The v0.27.0 release is generating a cluster of regression reports: DeepSeek-V4-Flash serving breaks after upgrading from 0.26.0 ([#51758](https://github.com/vllm-project/vllm/issues/51758)), and a 4-node TP=4 GB10 engine permanently stalls after ~1 minute of idleness ([#51921](https://github.com/vllm-project/vllm/issues/51921)). On the fix side, a substantial batch of correctness and performance patches is moving through review — including a closed DSpark confidence-scheduled verification PR ([#47808](https://github.com/vllm-project/vllm/pull/47808)), a KV-block-zeroing launch-geometry bound ([#52058](https://github.com/vllm-project/vllm/pull/52058)), and a fix to skip multimodality tensor broadcasts for prefix-cache-covered requests ([#52041](https://github.com/vllm-project/vllm/pull/52041)). ROCm/AMD enablement for Kimi-K3 continues to advance with AITER MLA head padding and removed redundant projection copies ([#51647](https://github.com/vllm-project/vllm/pull/51647), [#50592](https://github.com/vllm-project/vllm/pull/50592)).

## 2. Releases & Breaking Changes
No new releases in the last 24 hours. Operators should note the growing set of upgrade-related failures from 0.26.0 → 0.27.0, particularly for DeepSeek-V4-Flash with FlashAttention ([#51758](https://github.com/vllm-project/vllm/issues/51758)) and for the `vllm-openai:latest` image booting Gemma-4-31B QAT NVFP4 with Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)). A security audit flags that `requirements/common.txt` needs a minimum setuptools bump ([#51993](https://github.com/vllm-project/vllm/issues/51993)).

## 3. New Model & Hardware Support
- **Kimi-K3 on ROCm**: Roadmap tracking issue active ([#50682](https://github.com/vllm-project/vllm/issues/50682)); PR adds AITER MLA head padding to support TP4's 24 heads/rank instead of falling back to Triton ([#51647](https://github.com/vllm-project/vllm/pull/51647)); another removes redundant KDA/MLA output projection copies on AMD ([#50592](https://github.com/vllm-project/vllm/pull/50592)).
- **DeepSeek V4 on Intel XPU**: New PR adds sequence parallelism for the XPU path, sharding attention activations along the sequence dimension to cut MoE activation memory ([#51346](https://github.com/vllm-project/vllm/pull/51346)).
- **MiniMax-M3-NVFP4 on 8× B200**: First post-correctness-fix benchmark numbers published ([#51494](https://github.com/vllm-project/vllm/issues/51494)).
- **Gemma-4**: Users attempting Gemma-4-31B-it QAT NVFP4 with TP=2 report startup failure in the latest container ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **Whisper**: PR adds native word-level timestamps via cross-attention + DTW ([#47664](https://github.com/vllm-project/vllm/pull/47664)).
- **NemotronH**: Adds `extract_hidden_states` test coverage for the Mamba2+attention hybrid reference architecture ([#52073](https://github.com/vllm-project/vllm/pull/52073)).
- **Kimi K2.5/K2.6** MLA + EAGLE3 serving stack on Blackwell remains tracked ([#40608](https://github.com/vllm-project/vllm/issues/40608)).

## 4. Performance & Optimization
- **Speculative decoding throughput**: DSpark confidence-scheduled verification PR closed ([#47808](https://github.com/vllm-project/vllm/pull/47808)) — adaptively sizes the draft-verification budget per request to avoid fixed-k collapse under GPU saturation. A DFlash fix reserves the missing bonus query slot in the scheduling budget ([#51256](https://github.com/vllm-project/vllm/pull/51256)).
- **MiniMax-M3-NVFP4**: With the #48929 correctness fix, EAGLE3 achieves **2.1–2.3× decode** on a 1M-token real-prose envelope on 8× B200 ([#51494](https://github.com/vllm-project/vllm/issues/51494)).
- **Prefix-cached multimodal inputs**: PR skips broadcasting mm tensor data to TP workers for prefix-cache-covered items — removes a costly redundant transfer on the EngineCore→worker path ([#52041](https://github.com/vllm-project/vllm/pull/52041)).
- **Attention metadata**: Removes redundant spec-decode mask computation in `GDNMetadataBuilder.build()` ([#52078](https://github.com/vllm-project/vllm/pull/52078)).
- **AMD Kimi-K3**: Eliminates post-projection allocation/copy in attention families ([#50592](https://github.com/vllm-project/vllm/pull/50592)).
- **XPU DeepSeek V4**: Sequence parallelism reduces per-rank activation memory for MoE/hyper-connection stages ([#51346](https://github.com/vllm-project/vllm/pull/51346)).
- **Known regression**: Dynamic speculative decoding (`num_speculative_tokens_per_batch_size`) causes a catastrophic aggregate-throughput collapse at the batch-size threshold on Qwen3.5-122B MTP ([#49548](https://github.com/vllm-project/vllm/issues/49548)).

## 5. Stability & Regressions
Ranked by severity:

1. **v0.27.0 engine permanently stalls after ~1 min idle** on 4-node TP=4 GB10/sm_121 aarch64 — `shm_broadcast` writer starves, requests never reach the scheduler ([#51921](https://github.com/vllm-project/vllm/issues/51921)).
2. **DeepSeek-V4-Flash fails on 0.27.0** after upgrade from 0.26.0 — FlashAttention error at serve time ([#51758](https://github.com/vllm-project/vllm/issues/51758)).
3. **vllm-openai:latest fails to boot Gemma4** NVFP4 with Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
4. **DeepSeek-V4-Flash + DSpark crashes on SM120** (RTX PRO 6000 Blackwell) — FlashInfer sparse MLA decode kernel routing bug ([#50720](https://github.com/vllm-project/vllm/issues/50720)).
5. **DeepSeek-V4-Flash garbled output** persists in mirrored 0.21.0 deployments ([#43416](https://github.com/vllm-project/vllm/issues/43416)).
6. **Qwen3.6-35B-A3B-FP8 code generation fails** with "400 Unterminated string" in 0.23.0/0.24.0 ([#47761](https://github.com/vllm-project/vllm/issues/47761)).
7. **ROCm OOM**: `rocm_dequantize_blocked_k_cache` materializes the entire KV cache pool during decode on MI325X ([#41962](https://github.com/vllm-project/vllm/issues/41962)).
8. **Intel Arc multi-GPU**: Existing TP=2 `zeMemOpenIpcHandle INVALID_ARGUMENT` on dual B50 ([#48953](https://github.com/vllm-project/vllm/issues/48953)) and PP=2 crash/hang on Battlemage ([#46072](https://github.com/vllm-project/vllm/issues/46072)) both remain open.
9. **Scheduler deadlock** after `VLLMValidationError` when a prompt exceeds `max_model_len` by a single token ([#42381](https://github.com/vllm-project/vllm/issues/42381)).
10. **Hybrid-SWA prefix-cache collapse**: cross-request reuse drops to zero at ~25% pool occupancy under round-robin multi-session workloads ([#48435](https://github.com/vllm-project/vllm/issues/48435)).

**Fixes in flight**: KV-block-zeroer launch overflow bound ([#52058](https://github.com/vllm-project/vllm/pull/52058)); RMSNorm CUDA kernel rounding-boundary fix restoring bit-level scalar parity ([#49639](https://github.com/vllm-project/vllm/pull/49639)); pythonic tool-call parser JSON safety fixes ([#51649](https://github.com/vllm-project/vllm/pull/51649)); empty/comments-only YAML config crash ([#52077](https://github.com/vllm-project/vllm/pull/52077)); actionable context-parallel backend error guidance ([#52075](https://github.com/vllm-project/vllm/pull/52075)).

## 6. What This Means for Application Developers
- **Exercise caution upgrading to v0.27.0** — the idle-stall on multi-node TP=4 and DeepSeek-V4-Flash regressions are exactly the kind of issues that surface in production serving but not smoke tests. Pin to 0.26.0 or stage the rollout and validate idle-recovery behavior.
- **DeepSeek-V4-Flash deployments remain risky across backends** (CUDA SM120, ROCm, and garbled-output reports). If you serve this model family, budget for workarounds and monitor for the fixes above.
- **Faster speculative decoding is coming**: DSpark adaptive verification and the DFlash slot fix should materially improve high-concurrency decode throughput — worth benchmarking once merged.
- **Multimodal workloads get a prefix-caching win** via the mm-tensor broadcast skip, which directly reduces KV/redundant-transfer overhead for cached image/video prompts.
- **Intel Arc / Battlemage multi-GPU setups are still not production-safe** for TP/PP; plan around single-GPU or keep these issues tracked if you depend on them.

*Data source: [vllm-project/vllm](https://github.com/vllm-project/vllm) issues and PRs updated 2026-08-12 → 2026-08-13.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-13

## 1. Today's Highlights

No new releases landed in the last 24 hours; activity is concentrated on performance tracking, CI hardening, and regression triage. DeepSeek-V4/SM120 perf work is being consolidated under issue #33636, and a new PD-disaggregation single-protocol-layer plan is now tracked in #34510. On the stability side, a Kimi-K3 MLA gate-fusion change was reverted after breaking CI (#34642), and new bugs were filed for Blackwell NVFP4 NaN outputs, DSpark launch failures, and AMD HiCache regressions.

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.**
- **In-flight breaking change:** PR #34304 removes the `--torchao-config` integration because torchao 0.17.0 broke every accepted value. Not merged yet, but worth tracking if you use torchao: https://github.com/sgl-project/sglang/pull/34304

## 3. New Model & Hardware Support

- **FlashInfer Mega MoE for NVIDIA** — open PR #31470: https://github.com/sgl-project/sglang/pull/31470
- **AMD MXFP4 online requantization** — PR #29328 adds load-time NVFP4 → MXFP4 requantization for ModelOpt/Quark checkpoints on MI355x: https://github.com/sgl-project/sglang/pull/29328
- **SM120/Blackwell NVFP4 MoE** — B12X FlashInfer NVFP4 MoE integration tracked in #33709: https://github.com/sgl-project/sglang/issues/33709
- **Apple Silicon roadmap** still open in #19137: https://github.com/sgl-project/sglang/issues/19137
- **CPU optimization work** for MiniMax-M2.7 in PR #31956: https://github.com/sgl-project/sglang/pull/31956

## 4. Performance & Optimization

- **DeepSeek-V4 perf tracking** on NVIDIA SM90/SM10X is active in #33636, including TRT-LLM DSv4 attention integration and FlashInfer kernel work: https://github.com/sgl-project/sglang/issues/33636
- **SM120 Performance Optimization Plan** (#19637) continues, with DeepGEMM MQA Indexer items marked done: https://github.com/sgl-project/sglang/issues/19637
- **GDN target verification memory reduction** — PR #33778 avoids materializing Q/K/V tensors in compatible speculative paths: https://github.com/sgl-project/sglang/pull/33778
- **AMD AITER unified-attention decode** — PR #31856 quantizes Q to FP8 to enable the native FP8-Q matrix path at medium/high batch sizes: https://github.com/sgl-project/sglang/pull/31856
- **GLM-5 DSA decode fast path** — PR #31324 skips the indexer when `kv_len <= index_topk`, using a dense k-only path: https://github.com/sgl-project/sglang/pull/31324
- **AMD memory utilization** — PR #25199 removes the silent ×0.85 `mem_fraction_static` derate for AITER + context >8K: https://github.com/sgl-project/sglang/pull/25199
- **AMD CI perf gates** — PR #34640 proposes gating DeepSeek-V4 nightly benchmarks on recorded throughput thresholds: https://github.com/sgl-project/sglang/pull/34640

No specific throughput/latency numbers were published in these updates.

## 5. Stability & Regressions

Ranked by severity:

1. **Blackwell NVFP4 numerical NaN regression** — FlashInfer TRTLLM NVFP4 MoE tile-192 path on SM100/SM103 produces non-finite outputs after FlashInfer >0.6.16rc4; a 200-example GSM8K test scores 0.0. No fix PR linked yet.  
   https://github.com/sgl-project/sglang/issues/34629

2. **DeepSeek-V4 scheduler hang and OOM** — v0.5.17 with hierarchical cache + 16K chunked prefill hangs during DSV4 sparse prefill, triggering watchdog abort (#34235). Separately, a ~1.04M-token prefill OOMs in the nonpaged DSV4 indexer under `--tp 8 --moe-a2a-backend megamoe`, while dp-attention serves the same request successfully (#34155).  
   https://github.com/sgl-project/sglang/issues/34235  
   https://github.com/sgl-project/sglang/issues/34155

3. **Multi-node TP deadlock with DSpark** — DeepSeek-V4-Flash + DSpark on 2×DGX Spark intermittently deadlocks with rank divergence in NCCL proxy append (#33289).  
   https://github.com/sgl-project/sglang/issues/33289

4. **Kimi-K3 DSpark failures** — CUDA launch failure with `concurrency=1` on v0.5.17 (#34522), plus a compact ragged CUDA graph request-slot geometry mismatch (#34384).  
   https://github.com/sgl-project/sglang/issues/34522  
   https://github.com/sgl-project/sglang/issues/34384

5. **AMD HiCache regression** — ROCm MI355 HiCache is broken and performs poorly for realistic agentic workloads (#34611).  
   https://github.com/sgl-project/sglang/issues/34611

6. **Kimi-K3 MLA fusion reverted** — PR #34642 reverts the fused MLA gate projection into the QKV-A GEMM after a CI regression at 2048 tokens.  
   https://github.com/sgl-project/sglang/pull/34642

7. **CI status** — tracking issue #17050 reports 3 broken, 11 flaky, and 671 recently fixed CI tests.  
   https://github.com/sgl-project/sglang/issues/17050

## 6. What This Means for Application Developers

- **On Blackwell SM100/SM103, validate FP8/MoE accuracy before moving past FlashInfer 0.6.16rc4** — the tile-192 NVFP4 path is currently unsafe (#34629).
- **For DeepSeek-V4 1M-token workloads on 8×B200**, prefer `dp-attention`; plain `--tp 8 --moe-a2a-backend megamoe` can OOM in the nonpaged indexer path (#34155).
- **DSpark/speculative decoding setups are fragile right now**, especially with multi-node TP or `concurrency=1` (#33289, #34522, #34384). Pin tested versions and add watchdog/restart coverage.
- **AMD MI355x users should treat HiCache as unstable for long-context/agentic traffic** (#34611). The MXFP4-online-requantization PR (#29328) is the main path forward for NVFP4 checkpoints on AMD.
- **PD disaggregation configuration is heading toward a single protocol layer with per-backend transport** (#34510) — expect future config/migration changes if you use mooncake/nixl/mori.
- **No new release today; if you are on 0.5.17**, review the regressions above before rolling out to large production fleets.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-13

## Today's Highlights
Three releases shipped in the last 24h, headlined by **b10375**, which tightens bare function parsing for Qwen models ([#26793](https://github.com/ggml-org/llama.cpp/pull/26793)) — a correctness fix for tool-calling that likely addresses the closed Qwen3.6 value_suffix parsing bug ([#26763](https://github.com/ggml-org/llama.cpp/issues/26763)). The server team continues to push toward disaggregated prefill/decode: the roadmap issue ([#21266](https://github.com/ggml-org/llama.cpp/issues/21266)) saw active discussion alongside WIP implementation PR [#25675](https://github.com/ggml-org/llama.cpp/pull/25675). On the stability front, a **~40% throughput regression on RTX 5080 (Blackwell)** between b10356 and b10359 was reported, along with multiple broken ROCm Windows pre-built binaries.

## Releases & Breaking Changes
- **b10375** — chat: tighten bare function parsing for Qwen models ([#26793](https://github.com/ggml-org/llama.cpp/pull/26793)). Changes Qwen tool-call extraction; applications relying on loose bare-function parsing should re-run their tool-call test suites.
- **b10373** — imatrix.cpp: move finite check and only check touched experts ([#26861](https://github.com/ggml-org/llama.cpp/pull/26861)).
- **b10369** — mtmd: support pocket-tts ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871)). Notably implements transposed convolutions as GEMM + col2im because `ggml_conv_transpose_1d` has no grouped mode.
- No API/CLI breaking changes. Watch PR [#26696](https://github.com/ggml-org/llama.cpp/pull/26696) (open): it gates HIP `-funsafe-math-optimizations` behind `GGML_HIP_UNSAFE_MATH` (default **OFF**), making HIP builds IEEE-conformant by default — a behavior change for existing HIP builds if merged.

## New Model & Hardware Support
- **pocket-tts** — shipped in b10369 via mtmd ([#26871](https://github.com/ggml-org/llama.cpp/pull/26871)).
- **Kimi-K3 text model** — PR [#26185](https://github.com/ggml-org/llama.cpp/pull/26185): hybrid KDA (linear) + MLA (full) attention, cross-layer residual attention, latent MoE, situ activation.
- **Longcat-Flash** — PR [#19182](https://github.com/ggml-org/llama.cpp/pull/19182): MLA + "zero-computing experts"; help wanted for testing.
- **OpenVINO: Qwen3.5 Dense/MoE** on CPU/GPU — PR [#26952](https://github.com/ggml-org/llama.cpp/pull/26952), plus peak GPU memory optimization and recurrent-state rollback test fix.
- **HIP build docs: RDNA4 (gfx1200/gfx1201)** — PR [#26745](https://github.com/ggml-org/llama.cpp/pull/26745).
- **OpenCL: Adreno xmem SDPA path** for non-causal diffusion attention — PR [#26331](https://github.com/ggml-org/llama.cpp/pull/26331); fixes silent buffer corruption on Z-Image 1024 `H=30, L=4224, D=128` attention shapes.

## Performance & Optimization
- **Reported regression: RTX 5080 ~40% slower** between b10356 and b10359+; affects prompt processing and generation, worsens with each build ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918)). No fix PR yet — bisection needed.
- **Reported regression: DFlash ~2x slower** on AMD Strix Halo (AI MAX+ 395) + quantized MoE vs. no speculation ([#25117](https://github.com/ggml-org/llama.cpp/issues/25117)).
- **MTP draft context over-reservation** on ROCm/HIP unnecessarily reduces fitted context size ([#26038](https://github.com/ggml-org/llama.cpp/issues/26038)).
- **Disaggregated prefill workers (WIP)** — PR [#25675](https://github.com/ggml-org/llama.cpp/pull/25675): prefills prompt prefixes on dedicated device groups, transfers sequence state via host memory, continues decode on the main server context.
- **llama_batch_ext** — early-WIP batch API replacement ([#24669](https://github.com/ggml-org/llama.cpp/pull/24669)).
- **`--numa mirror`** — mirrors weights to every NUMA node to eliminate cross-socket traffic ([#16000](https://github.com/ggml-org/llama.cpp/pull/16000)).
- **RPC `-sm tensor`** — multi-node tensor sharding over RDMA with async graph compute and custom all_reduce ([#26610](https://github.com/ggml-org/llama.cpp/pull/26610)).
- **Auto-detect speculative draft type** from GGUF metadata — removes the need for `--spec-type` with local draft models; currently draft models load into VRAM but speculative decoding silently stays disabled ([#26814](https://github.com/ggml-org/llama.cpp/pull/26814)).

## Stability & Regressions
Ranked by severity (all report links):
1. **RTX 5080 ~40% perf regression**, b10356→b10359, worsening per release — pin b10356 pending bisection ([#26918](https://github.com/ggml-org/llama.cpp/issues/26918)).
2. **ROCm Windows pre-built binaries broken** — GPU not detected on b10361 ([#26929](https://github.com/ggml-org/llama.cpp/issues/26929)); b10373 crashes with "cudaMemGetInfo failed" ([#26963](https://github.com/ggml-org/llama.cpp/issues/26963)).
3. **GLM-5.2 dense-MLA CUDA path** produces corrupted output when any real transformer layer is offloaded to GPU ([#26027](https://github.com/ggml-org/llama.cpp/issues/26027)).
4. **Vulkan (Mali-G925) Qwen3.5-0.8B multimodal** prefill returns all-NaN logits; same build works on CPU ([#26921](https://github.com/ggml-org/llama.cpp/issues/26921)).
5. **Qwen3.5-2B-MTP-GGUF** forces full prompt re-processing every request due to missing cache data ([#24714](https://github.com/ggml-org/llama.cpp/issues/24714)).
6. **SWA on Gemma 4** forgets key details ([#25751](https://github.com/ggml-org/llama.cpp/issues/25751)).
7. **Glimmer Q8_0 tensor split** assertion failure on 4×Tesla T10 ([#26902](https://github.com/ggml-org/llama.cpp/issues/26902)).
8. **ROCm gfx1151 RPC worker** crashes in `GGML_OP_TOP_K` during DeepSeek V4 prefill past 4096 tokens ([#26746](https://github.com/ggml-org/llama.cpp/issues/26746)).
9. **OpenVINO cannot load gemma-4-12B** on CPU/GPU/NPU ([#24415](https://github.com/ggml-org/llama.cpp/issues/24415)).
10. **ROCm 7.14 runtime error** — missing `libhipblas.so.3` ([#25807](https://github.com/ggml-org/llama.cpp/issues/25807)).
11. **CUDA `fattn.cu:579` fatal error** with flash-attention + all-quants ([#24324](https://github.com/ggml-org/llama.cpp/issues/24324)).

Also notable: SYCL Battlemage stays pinned at boost clock (`gt-c0`) between requests with `-cb`, preventing idle power savings ([#24946](https://github.com/ggml-org/llama.cpp/issues/24946)).

Closed today: Qwen3.5 `enable_thinking` control ([#20182](https://github.com/ggml-org/llama.cpp/issues/20182)), Qwen3.6 tool parsing value_suffix mismatch ([#26763](https://github.com/ggml-org/llama.cpp/issues/26763)), grammar empty-stack on partial-word triggers ([#26787](https://github.com/ggml-org/llama.cpp/issues/26787)), and the `MAX_REPETITION_THRESHOLD` grammar failure for tools with many optional params ([#20867](https://github.com/ggml-org/llama.cpp/issues/20867)).

## What This Means for Application Developers
- **Qwen tool-calling parsing changed in b10375** — if you serve Qwen models via `/v1/chat/completions` with bare functions, upgrade and re-run tool-call tests. The old behavior could capture following tool calls into an argument when the model omitted a leading newline ([#26763](https://github.com/ggml-org/llama.cpp/issues/26763)).
- **Disaggregated prefill is coming to llama-server** — the design issue ([#21266](https://github.com/ggml-org/llama.cpp/issues/21266)) and WIP PR ([#25675](https://github.com/ggml-org/llama.cpp/pull/25675)) will change how multi-GPU/multi-node serving is configured; start planning for dedicated prefill device groups.
- **`/metrics` semantics are being corrected** — PR [#26920](https://github.com/ggml-org/llama.cpp/pull/26920) is part of [#24866](https://github.com/ggml-org/llama.cpp/issues/24866); upstream notes master currently miscounts task stats. Re-check any metrics dashboards after this merges.
- **Local speculative decoding gets simpler** — PR [#26814](https://github.com/ggml-org/llama.cpp/pull/26814) will auto-detect draft model type from GGUF metadata, eliminating the silent failure mode where a draft model loads into VRAM but speculative decoding never activates.
- **ROCm Windows users should hold off** on pre-built binaries — both b10361 and b10373 have GPU-detection/init failures; use an earlier build or compile from source.
- **Blackwell (RTX 50-series) users should pin b10356** while the ~40% regression is investigated; if you must run newer builds, participate in [#26918](https://github.com/ggml-org/llama.cpp/issues/26918) with timings.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-13

## Today's Highlights

Ollama published **v0.32.10-rc1**, which changes the default `repeat_penalty` to 1.0 (off) — matching other engines and improving speculative decoding speed — and includes ~7–8% faster prefill on NVFP4 MLX models with global scales. A batch of correctness work is in flight around structured outputs, thinking models, and raw `/api/generate` requests. On the security side, the long-standing blob hash verification bypass / SSRF issue now has a fix PR.

## Releases & Breaking Changes

- **v0.32.10-rc1** ([release notes](https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1))  
  - Default `repeat_penalty` changed from `1.1` to `1.0` (off).  
  - This is a behavioral breaking change if your models relied on the old default; set an explicit per-model `repeat_penalty` if needed.  
  - NVFP4 MLX models with a global scale get ~7–8% faster prefill.
- **Versioning fix** ([PR #16980](https://github.com/ollama/ollama/pull/16980)): `git describe`-based version strings are now treated as proper semver, preventing local builds from incorrectly triggering upgrade logic.

## New Model & Hardware Support

- **Nemotron vision on MLX** ([PR #17714](https://github.com/ollama/ollama/pull/17714)): implements the RADIO vision encoder/projector on the shared MLX media pipeline, including dynamic-resolution preprocessing and chunked feature scattering. Audio remains unsupported for now.
- **`ollama launch muse`** ([PR #17594](https://github.com/ollama/ollama/pull/17594)): integration for Meta's Muse Code CLI with isolated settings file handling.
- **`ollama launch talos`** ([PR #17589](https://github.com/ollama/ollama/pull/17589)): adds support for the Talos agent, which uses a deterministic permission kernel for tool execution.
- **MLX model pull guard** ([PR #17710](https://github.com/ollama/ollama/pull/17710)): as Linux and Windows MLX support comes online, the client will avoid pulling MLX models when the local runtime cannot run them.
- **MLX KV connector framework** ([PR #17707](https://github.com/ollama/ollama/pull/17707)): adds a file-backed prefix-cache connector that persists restorable snapshots and can restore the longest saved prompt prefix.

## Performance & Optimization

- **NVFP4 MLX prefill speedup** ([release notes](https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1), [PR #17703](https://github.com/ollama/ollama/pull/17703)): fuses the global-scale multiply + cast on double-scale NVFP4 checkpoints, reducing kernel launches and intermediate materialization. ~7–8% faster prefill reported on affected models.
- **Speculative decoding improvement**: disabling `repeat_penalty` by default removes an extra sampling path, which also helps speculative decoding throughput.
- **MLX KV restore** ([PR #17707](https://github.com/ollama/ollama/pull/17707)): the new KV connector framework targets faster long-prefix restores via safetensors snapshots.

## Stability & Regressions

Ranked by severity:

- **Critical / SSRF — blob hash verification bypass** ([Issue #15485](https://github.com/ollama/ollama/issues/15485)): when a manifest config and layer share the same digest, `skipVerify` can skip verification for both, enabling rogue OCI registries to exfiltrate data. Fix PR: [#15504](https://github.com/ollama/ollama/pull/15504) (closed).
- **High — q4_0 KV quantization produces garbage responses** ([Issue #17614](https://github.com/ollama/ollama/issues/17614)): switching from `q8_0` to `q4_0` KV quantization causes models to emit repeated, unintelligible tokens. Open; no fix PR yet.
- **High — Qwen2.5-3B Chinese input outputs ASCII garbage on Windows** ([Issue #17587](https://github.com/ollama/ollama/issues/17587)): tokenizer mis-detection on CPU is suspected. Needs more info.
- **High — `/api/generate` regression in 0.32.1: "token repeat limit reached"** ([Issue #17270](https://github.com/ollama/ollama/issues/17270)): requests that worked on 0.20.7 abort after upgrade.
- **High — structured output + thinking model handling** ([PR #17705](https://github.com/ollama/ollama/pull/17705), [PR #17706](https://github.com/ollama/ollama/pull/17706), [PR #17708](https://github.com/ollama/ollama/pull/17708)): fixes for `/api/generate` and `/api/chat` where JSON grammar is applied before thinking completes, and raw generate requests incorrectly enabling thinking by default.
- **Medium — Gemma 4 emits repeated `<unused49>` tokens with `think: false`** ([Issue #17459](https://github.com/ollama/ollama/issues/17459)).
- **Medium — Qwen3.6 35B memory ceiling on RTX 5070Ti** ([Issue #17517](https://github.com/ollama/ollama/issues/17517)): recent updates hit GPU memory ceiling even at 4K context.
- **Medium — Nemotron3.5-lightning stalls on AMD AI395+** ([Issue #17692](https://github.com/ollama/ollama/issues/17692)): model stalls during thinking on Framework Desktop-class hardware.
- **Medium — Qwen3.6 hybrid falls back to CPU on CUDA** ([Issue #17669](https://github.com/ollama/ollama/issues/17669)): reports link the regression to llama.cpp b10353; closed but no root-cause summary in the digest data.
- **Medium — Runner accepts TCP but request never reaches work loop** ([Issue #15950](https://github.com/ollama/ollama/issues/15950)): same shape as #15258; large models pinned in memory can hang `/api/generate`.
- **Performance regression — Q4_K_M on AMD Radeon 780M / Vulkan / Windows** ([Issue #16721](https://github.com/ollama/ollama/issues/16721)): ~10% generation and ~20% prefill regression starting in v0.30.7. No fix PR yet.

## What This Means for Application Developers

- **Set `repeat_penalty` explicitly** if your workloads depend on stable repetition suppression; the new default of 1.0/off may change output quality.
- **OpenAI-compatible API is evolving quickly**: `/v1/responses` now supports server-side web search for Codex-style agents ([PR #17686](https://github.com/ollama/ollama/pull/17686)), capped at three searches per request ([PR #17709](https://github.com/ollama/ollama/pull/17709)), and `reasoning_effort=minimal` is accepted and mapped to `low` ([PR #17712](https://github.com/ollama/ollama/pull/17712)).
- **Be careful with structured outputs on thinking-capable models**: until [#17705](https://github.com/ollama/ollama/pull/17705), [#17706](https://github.com/ollama/ollama/pull/17706), and [#17708](https://github.com/ollama/ollama/pull/17708) land, avoid forcing JSON grammar on the first token in `/api/generate` with thinking models.
- **MLX users should re-benchmark NVFP4 models** after this release; the prefill improvements are meaningful. The new KV connector work may also help long-context agents.
- **Third-party registry users should verify** that the [#15504](https://github.com/ollama/ollama/pull/15504) blob verification fix is included in their deployed version.
- **Observability remains limited**: there is still no passive server-level metrics endpoint like vLLM's `/metrics` ([Issue #17694](https://github.com/ollama/ollama/issues/17694)); plan around `/api/ps` and per-request response timings for now.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-13

## 1. Today's Highlights

Spend-log durability is the dominant theme: three open PRs ([#34826](https://github.com/BerriAI/litellm/pull/34826), [#34950](https://github.com/BerriAI/litellm/pull/34950), [#36716](https://github.com/BerriAI/litellm/pull/36716)) fix rows being silently dropped when a flush is cancelled, the DB write fails, or shutdown occurs without a queue drain. On the model front, the proxy gained Parallel AI chat + responses support ([#36704](https://github.com/BerriAI/litellm/pull/36704)), Cohere multimodal embeddings ([#36715](https://github.com/BerriAI/litellm/pull/36715), [#36692](https://github.com/BerriAI/litellm/pull/36692)), and Meta Muse Spark 1.2 pricing ([#36717](https://github.com/BerriAI/litellm/pull/36717)). Two security-adjacent issues warrant attention: response cross-talk in Redis Cluster deployments ([#25447](https://github.com/BerriAI/litellm/issues/25447), closed) and a 429 error body leaking full token hashes ([#27884](https://github.com/BerriAI/litellm/issues/27884), open).

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Note: `litellm 1.96.1` was reported to lack a Python 3.13-compatible wheel/sdist ([#36526](https://github.com/BerriAI/litellm/issues/36526), closed), blocking `litellm>=1.41.15` installs on 3.13.

## 3. New Model & Hardware Support

- **Meta Muse Spark 1.2** — cost map entries for `meta/muse-spark-1.2` ($1.25/$4.25 per MTok) and a cheaper contributor SKU; previously billed at $0 and rejected `reasoning_effort` with 400 ([PR #36717](https://github.com/BerriAI/litellm/pull/36717))
- **Parallel AI** — new chat + responses LLM provider exposing the otherwise-unreachable OpenAI Responses-compatible endpoint, with full v1 search params (`after_date`, `fetch_policy`, `location`) and corrected spend tracking ([PR #36704](https://github.com/BerriAI/litellm/pull/36704))
- **Cohere multimodal embeddings** — Embed v4 mixed image/text inputs preserved under Cohere's `inputs` field instead of being serialized as invalid `texts` objects; billing metadata added for multimodal usage ([PR #36715](https://github.com/BerriAI/litellm/pull/36715), [PR #36692](https://github.com/BerriAI/litellm/pull/36692))

## 4. Performance & Optimization

- **Complexity router rubric recalibration** — the classifier's top tier previously matched "non-trivial code, multi-step technical work," i.e., the median developer/agent request, over-routing routine work to the most expensive tier. Rubric is now calibrated with worked examples and selectable per router ([PR #36578](https://github.com/BerriAI/litellm/pull/36578)); the UI also gains a default-model pin so fallback isn't forced to a tier ([PR #36615](https://github.com/BerriAI/litellm/pull/36615))
- **OTel span attribution for Prisma** — DB spans now point at PostgreSQL instead of `localhost`, fixing misleading APM traces caused by Prisma's local Rust query engine over loopback HTTP ([PR #36595](https://github.com/BerriAI/litellm/pull/36595))
- **Prometheus multi-worker** — auto-configures `PROMETHEUS_MULTIPROC_DIR` for `--num_workers > 1` to prevent silent metric loss from per-process registries ([PR #20911](https://github.com/BerriAI/litellm/pull/20911), stale)
- **Embedding cache alignment** — sorts out-of-order embedding results (e.g., vLLM) by index before Redis batch caching to fix misalignment, duplication, and missing entries ([PR #20949](https://github.com/BerriAI/litellm/pull/20949), stale)

## 5. Stability & Regressions

Ranked by severity:

1. **Response leakage / cross-talk in Redis Cluster (security)** — responses occasionally returned to the wrong client in a multi-replica OpenShift deployment; issue is closed but no fix PR is visible in the data ([#25447](https://github.com/BerriAI/litellm/issues/25447))
2. **429 responses leak full SHA-256 token hash** — the parallel-request limiter includes the complete 64-char key hash in the error body, enabling offline attacks ([#27884](https://github.com/BerriAI/litellm/issues/27884), open)
3. **Spend log loss** — dequeued batches vanish on cancelled flushes, DB transport errors (P1001 escapes the retry clause), and shutdown without drain. Fixes in flight: [#34826](https://github.com/BerriAI/litellm/pull/34826), [#34950](https://github.com/BerriAI/litellm/pull/34950), [#36716](https://github.com/BerriAI/litellm/pull/36716)
4. **`max_parallel_requests` unbounded growth with Anthropic adapter** — Redis counter monotonically increases when clients cancel `/v1/messages` mid-stream, eventually blocking all requests ([#27955](https://github.com/BerriAI/litellm/issues/27955), open)
5. **Wrong Azure pricing in cost map** — `azure/gpt-5.6-terra`/`luna` rows carry OpenAI's post-cut prices (20%/80% reductions Azure never made), skewing cost-based routing and spend reporting ([#36192](https://github.com/BerriAI/litellm/issues/36192), open); relatedly, Azure Model Router logs the router deployment name rather than the actual served model in `/spend/logs` ([#27942](https://github.com/BerriAI/litellm/issues/27942), open)
6. **500 instead of 400 on missing body params** — six proxy routes return opaque 500s for missing required fields; fix returns deliberate 4xx ([PR #35849](https://github.com/BerriAI/litellm/pull/35849))
7. **SSE crash on usage-only chunk** — `_should_start_new_content_block` accesses `chunk.choices[0]` unconditionally; crashes on empty-`choices` chunks from OpenAI-format backends ([#36553](https://github.com/BerriAI/litellm/issues/36553), closed)
8. **Anthropic + Bedrock guardrail streams 500** — raw SSE frames are unreadable by the assembler; fix scans and re-emits raw SSE in the bedrock post-call hook ([PR #36598](https://github.com/BerriAI/litellm/pull/36598))
9. **Ollama streaming tool_calls** — `tool_calls` arrive in a separate chunk from `done`, yielding wrong `finish_reason`; fix tracks state across chunks ([PR #20585](https://github.com/BerriAI/litellm/pull/20585), stale)
10. **Qdrant semantic cache non-functional** — four cascading bugs including `AttributeError: 'Cache' object has no attribute 'cache'`; fix PR closed ([#25556](https://github.com/BerriAI/litellm/pull/25556))

Also reported: Xiaomi MiMo `output_config` failures via Claude Code ([#24549](https://github.com/BerriAI/litellm/issues/24549)), blank assistant messages after tool calls on Deepseek ([#31553](https://github.com/BerriAI/litellm/issues/31553)), Ollama `reasoning_content` always null ([#27956](https://github.com/BerriAI/litellm/issues/27956)), DB-stored models missing from AI Hub ([#19853](https://github.com/BerriAI/litellm/issues/19853)), auto-router models disappearing from `/v1/models` ([#33168](https://github.com/BerriAI/litellm/issues/33168)), and missing `litellm_content_filter` evaluations in the Guardrails Monitor ([#36566](https://github.com/BerriAI/litellm/issues/36566)).

## 6. What This Means for Application Developers

- **Treat spend data as at-risk until the flush fixes land** — a DB blip or shutdown can currently silently drop spend-log rows; if you run FinOps off `/spend/logs`, monitor for gaps and consider reconciling against upstream provider usage.
- **Validate the cost map against provider invoices** — the Azure GPT-5.6 Terra/Luna discrepancy shows price data can drift from actual provider meters, which matters if you do cost-based routing or pass through spend to tenants.
- **New capabilities to test**: Cohere mixed-modality embedding pipelines, Parallel AI search workloads via the Responses-compatible endpoint, and Muse Spark 1.2 (now correctly priced and accepting `reasoning_effort`).
- **Security posture**: the 429 token-hash leak means rate-limit error bodies should be treated as sensitive; if you run Redis Cluster with multiple replicas, audit for cross-talk and track issue #25447 for upstream verification.
- **Anthropic-adapter users**: `max_parallel_requests` can wedge permanently under client-side stream cancellation — pin this issue and consider alerting on the Redis counter until fixed.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-13

## 1. Today's Highlights
Studio stability is the dominant theme: fixes for the Deep Research freeze ([#8483](https://github.com/unslothai/unsloth/issues/8483)) landed as two PRs reworking main-thread loops and chat re-rendering ([#8633](https://github.com/unslothai/unsloth/pull/8633), [#8634](https://github.com/unslothai/unsloth/pull/8634)). On the AMD front, several PRs reconcile the installer's GPU claims with the actual PyTorch backend, addressing the "ROCm reported but CPU-only runtime" trap ([#8473](https://github.com/unslothai/unsloth/issues/8473), [#8606](https://github.com/unslothai/unsloth/pull/8606), [#8620](https://github.com/unslothai/unsloth/pull/8620)). Finally, local tool calling (Search/Code/MCP) was enabled for self-hosted OpenAI-compatible backends — llama.cpp, vLLM, Ollama — via a provider-level capability flag ([#8626](https://github.com/unslothai/unsloth/pull/8626), [#8630](https://github.com/unslothai/unsloth/pull/8630)).

## 2. Releases & Breaking Changes
No new releases in the last 24 hours. Desktop/Studio remains at `0.1.701-beta` per diagnostics. No API, config, or migration changes to report.

## 3. New Model & Hardware Support
- **Radeon AI PRO R9700 (gfx1201) detection** — Installer previously reported `gpu none` for this card and fell back to CPU PyTorch wheels; name-inference now recognizes it via new PR [#8573](https://github.com/unslothai/unsloth/pull/8573).
- **DeepReinforce Ornith-1.0** — Open feature request ([#6721](https://github.com/unslothai/unsloth/issues/6721), 23 👍) asking for Unsloth-hosted optimized variants and tooling compatibility; no response yet.
- **MiniMax-H3** — Desktop users hit an error because the bundled `stable-diffusion.cpp` predates MiniMax-H3 support ([#8507](https://github.com/unslothai/unsloth/issues/8507)).
- **MiniMax-M3 GGUF** — `unsloth/MiniMax-M3-GGUF` fails to load with "missing indexer keys"; bundled Studio llama.cpp (b10360) and HF quant shards appear out of sync ([#8513](https://github.com/unslothai/unsloth/issues/8513)).
- **CI/hardware coverage** — New notebook smoke tests run on real Kaggle T4s, giving the project its first Turing (sm_75) and first Studio CUDA coverage ([#8440](https://github.com/unslothai/unsloth/pull/8440), [#8489](https://github.com/unslothai/unsloth/pull/8489)).

## 4. Performance & Optimization
- **VRAM budget fraction made tunable** ([#8589](https://github.com/unslothai/unsloth/pull/8589)) — A 2×RTX 3090 user reported Studio offering only 175k context where LM Studio offered 200–250k. The audit found the reserve is mostly real cost (`--parallel 4` slot-logits buffers, a measured 2049 MiB compute-buffer term), so the fraction is now configurable rather than hard-coded.
- **Deep Research streaming cost** ([#8634](https://github.com/unslothai/unsloth/pull/8634)) — A streaming research run was minting delta events that re-rendered the entire chat; the fix stops full-chat re-rendering. Independent of the freeze fix in [#8633](https://github.com/unslothai/unsloth/pull/8633); harnesses from #8633 reproduce the numbers.
- **Live speed telemetry requested** ([#8528](https://github.com/unslothai/unsloth/issues/8528)) — Feature request for live prompt-processing and generation speed in the Studio API tab, rather than generation-only after completion.

## 5. Stability & Regressions
Ranked by severity; fix PRs noted where they exist.

- **Deep Research freeze on Gemma-4-26B-A4B** ([#8483](https://github.com/unslothai/unsloth/issues/8483)) — Froze on "Writing The Report" with no token accounting. Fixes: [#8633](https://github.com/unslothai/unsloth/pull/8633) (activity-panel detach could strand a queued frame; settle timer cancelled but frame still ran) and [#8634](https://github.com/unslothai/unsloth/pull/8634).
- **macOS M4: llama-server fails to start any local GGUF** ([#8566](https://github.com/unslothai/unsloth/issues/8566)) — Blamed "invalid GGUF / not enough memory"; root cause was missing `DYLD_LIBRARY_PATH`. Fix in [#8574](https://github.com/unslothai/unsloth/pull/8574) also improves startup-failure classification. Related: second-launch crash ([#8610](https://github.com/unslothai/unsloth/issues/8610)) and macOS text-encoding errors ([#8594](https://github.com/unslothai/unsloth/issues/8594)) remain open.
- **AMD: reported GPU ≠ usable backend** ([#8473](https://github.com/unslothai/unsloth/issues/8473)) — Installer prints `AMD ROCm (gfx1201)` and "dependencies up to date" while Studio runs CPU-only with "No visible GPU". Fixes: [#8620](https://github.com/unslothai/unsloth/pull/8620) (report the mismatch) and [#8606](https://github.com/unslothai/unsloth/pull/8606) (reconcile reporting with installed torch; cover CPU/CUDA wheels in the venv). Related: llama.cpp build broke AMD GPU detection ([#7485](https://github.com/unslothai/unsloth/issues/7485)).
- **RAG embedder crash on AMD** ([#7331](https://github.com/unslothai/unsloth/issues/7331), closed) — Eager warmup was removed, but first RAG operation can still crash when `SentenceTransformer` loads on an incompatible ROCm torch; [#8609](https://github.com/unslothai/unsloth/pull/8609) contains the allocation failure instead of killing Studio.
- **Context leaks across sessions/API backends** ([#8442](https://github.com/unslothai/unsloth/issues/8442)) — When using unsloth as an API backend, context leaks between sessions and model harnesses; open, no fix PR yet. This is a correctness issue for multi-tenant serving.
- **MiniMax-M3 GGUF load failure** ([#8513](https://github.com/unslothai/unsloth/issues/8513)) — Missing indexer keys; Studio llama.cpp and HF quants out of sync. 387 GB download completes but model won't start.
- **Windows install failures** — EDR/AMSI false positive blocks `install.ps1` at parse time ([#8523](https://github.com/unslothai/unsloth/issues/8523), closed) and AppLocker/WDAC blocks the generated `unsloth.exe` console script ([#8490](https://github.com/unslothai/unsloth/issues/8490)). Fixes: [#8586](https://github.com/unslothai/unsloth/pull/8586) (reduce AV false positives in installers) and [#8592](https://github.com/unslothai/unsloth/pull/8592) (stop depending on generated console-script exe). Also: login autostart launches from `C:\Windows\system32` ([#8575](https://github.com/unslothai/unsloth/pull/8575) fixes [#8510](https://github.com/unslothai/unsloth/issues/8510)).
- **OSS validation OOM with eager attention** ([#3363](https://github.com/unslothai/unsloth/issues/3363), closed, fixed-pending-confirmation) — Flex attention returns gibberish during `.eval()` generation, so validation defaults to eager and OOMs; a fix is awaiting user confirmation.
- **SSE regression on main** — Two provider test suites are red (`test_gemini_provider`, `test_external_provider_usage_chunk`); [#8608](https://github.com/unslothai/unsloth/pull/8608) fixes Responses event-type parsing from the SSE `event` field.
- **Linux AppImage/AMD recognition** — AppImage missing required Linux libraries ([#8463](https://github.com/unslothai/unsloth/issues/8463)); RX 5700XT ([#8529](https://github.com/unslothai/unsloth/issues/8529)) and RX 7600 ([#8471](https://github.com/unslothai/unsloth/issues/8471)) not recognized.
- **CI noise** — Intel Mac install leg falsely asserts torch was installed; [#8631](https://github.com/unslothai/unsloth/pull/8631) fixes the check.

## 6. What This Means for Application Developers
- **Local tool calling is arriving for self-hosted backends.** Once [#8626](https://github.com/unslothai/unsloth/pull/8626) / [#8630](https://github.com/unslothai/unsloth/pull/8630) land, llama.cpp/vLLM/Ollama/custom OpenAI-compatible connections get Search, Code, MCP, and RAG through the registry-driven selector, with an explicit per-connection opt-in for code execution ([#8626](https://github.com/unslothai/unsloth/pull/8626)). Framework-level tool schemas are declared in `PROVIDER_REGISTRY`, so agent apps on self-hosted models no longer need to proxy tool calls manually.
- **Deep Research reliability matters for agentic workloads.** The freeze and full-chat re-render fixes ([#8633](https://github.com/unslothai/unsloth/pull/8633), [#8634](https://github.com/unslothai/unsloth/pull/8634)) target exactly the long-running report-generation path where token accounting and UI liveness break down. If you build on Deep Research, expect both fixes in the next beta.
- **AMD GPU claims need verification at the app layer.** The installer can report ROCm while PyTorch is CPU/CUDA-only ([#8473](https://github.com/unslothai/unsloth/issues/8473)). After the upcoming fixes, treat "GPU detected by installer" and "torch sees the GPU" as separate signals; your own harness should check `torch`/ROCm compatibility before scheduling training.
- **Windows deployment is still rough around EDR.** Multiple install paths are blocked by AMSI/AppLocker/WDAC ([#8523](https://github.com/unslothai/unsloth/issues/8523), [#8490](https://github.com/unslothai/unsloth/issues/8490)). If you distribute Studio on managed Windows fleets, expect to whitelist the installer and watch for the script-shape fixes in [#8586](https://github.com/unslothai/unsloth/pull/8586) and [#8592](https://github.com/unslothai/unsloth/pull/8592).
- **Context length on multi-GPU is tunable soon.** The VRAM-budget work ([#8589](https://github.com/unslothai/unsloth/pull/8589)) means you can trade compute-buffer slack for context length on 2×3090-class setups, closing the gap with LM Studio.
- **Watch the MiniMax-M3 GGUF indexer mismatch** ([#8513](https://github.com/unslothai/unsloth/issues/8513)) if you depend on those shards; verify Studio's bundled llama.cpp version against the HF quant format before deploying.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*