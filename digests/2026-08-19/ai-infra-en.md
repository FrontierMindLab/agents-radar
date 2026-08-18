# AI Infrastructure Digest 2026-08-19

> Generated: 2026-08-18 23:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-08-19

## 1. Ecosystem Overview

The inference stack is consolidating around two production serving engines (vLLM, SGLang) and one ubiquitous local runtime (llama.cpp), with Ollama and LiteLLM as convenience layers above them and Unsloth occupying the fine-tuning niche. Today's activity shows the ecosystem in a **frontier-model land-grab**: Kimi K3, DeepSeek-V4, and GLM-5.2 enablement spans every project, but ships with known correctness risks — especially around MTP/speculative decoding and CUDA graph capture. Notably, **no project released a stable OSS version in the last 24 hours** except llama.cpp's rolling nightly train and v0.1.2; the rest are in a hardening phase, with more fix PRs than releases. Agentic workloads (tool calling, long-context reuse, streaming SSE) are now the primary stress test surfacing bugs across all layers.

## 2. Activity Comparison

Counts below reflect issues/PRs **referenced in each digest**, not full GitHub totals.

| Project | Issues Referenced | PRs Referenced | Releases (24h) | Layer |
|---|---|---|---|---|
| vLLM | 20 | 15 | None | Production serving engine |
| SGLang | 11 | 14 | None | Production serving engine |
| llama.cpp | 18 | 15 | v0.1.2 + b10483–b10488 | Local runtime / edge inference |
| Ollama | 13 | 6 | None | Consumer/dev wrapper over llama.cpp |
| LiteLLM | 13 | 10 | None | LLM gateway / proxy |
| Unsloth | 11 | 13 | None | Fine-tuning + Studio (training/inference UI) |

**Read:** vLLM has the largest open-issue surface, dominated by speculative-decoding (MTP) crashes. SGLang is close behind on PR throughput relative to its issue count, indicating active fix velocity. llama.cpp ships continuously (6 builds in 24h) but carries serious multi-GPU/RPC correctness bugs. Ollama and LiteLLM are quieter — both are integration layers, so their activity tracks upstream regressions (llama.cpp, Bedrock) rather than kernel work.

## 3. Model Support Race

| Model/Arch | vLLM | SGLang | llama.cpp | Ollama | Notes |
|---|---|---|---|---|---|
| **Kimi K3** | Active enablement (#50001); FlashInfer GEMM+allreduce fusion with 8×B300 benchmarks; **blocking CUDA-graph corruption at batch=1** | Vision-DP sharding fix landed (#35402); DCP+HiCache tuning | — | — | vLLM is ahead but shipping a known-correctness-bug risk |
| **DeepSeek-V4** | ROCm fused AR draft metadata restored; Mooncake offload fixes | Scheduler hang on H20 open; HiCache loses prefix hits in agentic sessions | Long-context >128K blocked on ROCm (`TOP_K` crash) | — | All three engines have open stability issues; none is production-clean |
| **GLM-5.2** | TurboQuant sparse MLA backend extended (packed 4-bit latent KV, DCP/MTP) | MI35x nightly coverage migrated from GLM-5.1; FP32 `e_score_correction_bias` fix | Support request closed (presumed landed) | — | vLLM has the deepest kernel-level support; llama.cpp coverage is passive |
| **Qwen3.6/3.8** | MTP illegal access + tool-call regression on Responses API | DSpark state drift on Qwen3.8 | Garbled output on dual-GPU; flash-attn illegal access | Tool-loop crash; system-message normalization fix in flight | Ollama is most exposed; vLLM MTP risk is highest severity |
| **DFlash2 speculator** | — | — | New PR (#27342) adds support | — | llama.cpp first to land |

**Who is ahead:** vLLM leads on **kernel-level enablement** (Kimi K3, GLM-5.2 TurboQuant) with per-GPU microbenchmarks. SGLang is roughly one step behind but shipping fixes faster on the same frontier models. llama.cpp leads on **breadth** (new quant types, backend portability, DFlash2) rather than frontier serving. Ollama and LiteLLM lag by design — they inherit upstream support through llama.cpp and provider APIs respectively.

## 4. Performance Frontier

Optimization effort today concentrates in five areas:

- **KV-cache / prefix reuse** — The dominant theme. SGLang's HiCache buffer-only mode (#34798) and host-allocator redesign (#35223); vLLM's eviction-aware free-list ordering (#51909); Ollama's MLX backend still lacks prefix caching entirely (#17829). HiCache's failure to hit on long agentic sessions (#35129) shows this is **unsolved for exactly the agentic workloads that need it most**.
- **Speculative decoding / MTP** — vLLM pursues async spec-decode (#29134) and per-request acceptance stats (#48915); llama.cpp ships adaptive MTP draft depth (`draft-mtp-adaptive`, #27210). Counterweight: the day's highest-severity bugs are MTP crashes in vLLM and SGLang.
- **Kernel fusion** — vLLM's FlashInfer GEMM+allreduce fusion for Kimi K3 (up to 8×B300 speedups); llama.cpp's CUDA FFN-gate+GLU fusion (#27341) and Vulkan density-gated `MUL_MAT_VEC_ID` (+36% at B=9 on RADV).
- **Distributed serving** — vLLM DCP/MTP plumbing, SGLang DCP+HiCache with tightened KL threshold (0.01→0.005). Multi-GPU/RPC correctness is the weak spot: llama.cpp cross-request contamination (#25992) and RPC crashes (#26583) are production blockers.
- **Quantization** — llama.cpp adds IQ2_NL/IQ3_NL on CPU; vLLM's GLM-5.2 TurboQuant sparse MLA. FP8 precision issues recur (SGLang MoE bias collapse, SM103 scale-format mismatch).

**Notable gap:** SM103/B300 kernel crashes (SGLang #34340, #35388) signal that **Blackwell Ultra brings a new crash class** that family-level gating (`is_sm100_supported()`) doesn't cover. vLLM's B300 microbenchmarks imply the hardware works well when kernels are correct — but the kernel ecosystem is still catching up.

## 5. Layer Positioning

| Layer | Projects | Breadth of Responsibilities |
|---|---|---|
| **Serving engines** | vLLM, SGLang | Full stack: scheduler, KV cache, kernels, distributed execution, OpenAI-compatible API, speculative decoding. Both also absorb fine-tuning-adjacent features (RL sleep/wake RFCs in vLLM). |
| **Local runtime** | llama.cpp | The substrate. Focus on backend breadth (CUDA/ROCm/Vulkan/OpenCL/WebGPU/SYCL/Hexagon/XPU), quant formats, and CPU edge. Ollama and (partially) Unsloth Studio consume it. |
| **Consumer/dev layer** | Ollama | Wraps llama.cpp for interactive use, model pulling, device auto-detection. Its bugs are mostly integration regressions — e.g., CUDA sm_86 silent CPU fallback, ROCm KV bleed — rather than novel inference issues. |
| **Gateway** | LiteLLM | No inference logic of its own. Session management, spend/budget accounting, provider translations, semantic caching, SSE keepalives. Issues cluster around protocol translation edge cases (duplicate tool-stop events, dropped web-search tools, ANSA content loss). |
| **Fine-tuning/training** | Unsloth | LoRA/QLoRA tuning plus a Studio product that spans training and local chat. Its 24h activity is largely UI/Studio performance and AMD detection — a reminder that fine-tuning tooling is now competing on platform experience, not just kernel speed. |

**Overlap to watch:** vLLM's Rust frontend (#52840) and SGLang both drift toward full-platform status; Unsloth Studio adds Ollama model picker integration (#9237), blurring the line between fine-tuning tool and inference gateway.

## 6. Trend Signals

1. **Tool-calling correctness is the new compatibility test.** Every layer has an open bug: vLLM MTP tool-call regression (#46249), SGLang tool-call loss (#35399), Ollama Qwen3.8 tool-loop crash (#17778), LiteLLM duplicate `content_block_stop` causing double tool execution (#37273), Unsloth parallel-argument corruption (#9022). Agent frameworks are generating traffic patterns the stack wasn't designed for — and the stack is now scrambling to catch up. **Watch:** LiteLLM #37273 is the most dangerous; a single missing event can double tool side effects.

2. **MTP/spec-decode is high-risk, high-reward, and still immature.** Three high-severity vLLM issues (illegal memory access, deadlocks, CUDA graph corruption) sit alongside genuinely promising work (adaptive depth in llama.cpp, async spec-decode in vLLM). **Production guidance:** regression-test MTP on long sequences and tool calls before enabling; treat spec-decode observability (#48915) as a prerequisite, not a nice-to-have.

3. **Long-context agentic sessions are exposing cache-management failures.** HiCache returning 0 cached tokens on long sessions (#35129), vLLM prefix-cache 0% hits on re-sent requests (#42948), Ollama MLX re-prefilling every agent step (#17829) — all point to the same root: **cache eviction/reuse strategies tuned for chat workloads break under agentic reuse patterns** (interleaved tool results, repeated system prompts, multi-turn context rewrites).

4. **AMD/ROCm is converging but not there yet.** Every project has AMD work: SGLang ROCm 7.2.4 images + MI35x nightly coverage, vLLM ROCm gap roadmap for Kimi K3 (#50682), llama.cpp TOP_K crashes past 128K, Ollama KV-state bleed on Strix Halo, Unsloth detection fixes. The pattern: **AMD is being brought up in parallel across all stacks, but MI300X/MI355X correctness and performance still lag NVIDIA by one or more release cycles.**

5. **B300/GB300 (SM103) bring-up is a fresh instability wave.** SGLang kernel crashes (CUTEDSL, DeepGEMM FP8), llama.cpp kernel stalls on RTX Pro 6000, vLLM publishing B300 benchmarks. If you're an early B300 adopter, expect kernel-level churn — pin known-good builds and validate FP8 MoE paths specifically.

6. **Gateways are absorbing AI-specific infrastructure burdens.** LiteLLM's SpendLogs index fixing a 99.7% Aurora CPU (#37379), `/health` leaking credentials (#36898), provider budget reset bugs (#37261) — as AI usage scales, **cost accounting, credential hygiene, and streaming resilience are becoming first-class platform problems** above the inference layer.

---

**Bottom line for decision-makers:** Production deployment of Kimi K3, DeepSeek-V4, or GLM-5.2 today means accepting either known bugs or unshipped fixes. vLLM and SGLang are roughly neck-and-neck on frontier enablement, with vLLM slightly ahead on kernels and SGLang slightly ahead on fix velocity. llama.cpp is the only project shipping releases steadily, but its multi-GPU correctness issues make single-GPU/edge its safe zone. The most defensible strategy: pin exact versions, disable MTP unless you can validate per-workload acceptance, and treat tool-calling workloads as a distinct regression-test class.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-19

## 1. Today's Highlights
No new release shipped in the last 24h; the mainline focus is split between speculative decoding (MTP) stability and active Kimi K3 enablement. A cluster of open MTP bugs — illegal memory access, tool-call regressions, and a ROCm deadlock — sits alongside new fix PRs for FlashMLA sparse + DCP/MTP and a GLM-5.2 TurboQuant sparse backend. Kimi K3 work is moving fast: a FlashInfer GEMM+allreduce fusion PR landed with 8×B300 microbenchmarks, while a new report shows CUDA graph capture silently corrupting output at batch=1.

## 2. Releases & Breaking Changes
None. No new releases, API changes, deprecations, or migration notes in the last 24h.

## 3. New Model & Hardware Support
- **Kimi K3** — Upstream enablement is being tracked in [#50001](https://github.com/vllm-project/vllm/issues/50001), with a separate ROCm gap/roadmap in [#50682](https://github.com/vllm-project/vllm/issues/50682). Supporting PRs: consolidation of CP attention ops into `ops/dcp.py` + `ops/pcp.py` ([#52839](https://github.com/vllm-project/vllm/pull/52839)) and FlashInfer GEMM+allreduce fusion ([#52687](https://github.com/vllm-project/vllm/pull/52687)). A blocking correctness bug (CUDA graph corruption at batch=1) is reported in [#52531](https://github.com/vllm-project/vllm/issues/52531).
- **GLM-5.2** — TurboQuant sparse MLA backend extended with packed 4-bit latent KV, fused sparse decode/prefill, and DCP/MTP plumbing ([#52472](https://github.com/vllm-project/vllm/pull/52472)).
- **FlashMLA sparse** — DCP support on the `fp8_ds_mla` mixed-batch KV path, including MTP spec decode under full CUDA graphs for GLM-5.2 / DeepSeek-V3.2 at TP4/DCP4 ([#46514](https://github.com/vllm-project/vllm/pull/46514)).
- **DeepSeek V4 (ROCm)** — Fused AR draft metadata updates restored for DeepSeek V4 sparse SWA on the AMD path ([#52628](https://github.com/vllm-project/vllm/pull/52628)).
- **Rust frontend** — LoRA lifecycle control (load/unload/list) added to the gRPC `Control` service, sharing the HTTP `LoraManager` registry ([#52840](https://github.com/vllm-project/vllm/pull/52840)). Overall parity roadmap tracked in [#44280](https://github.com/vllm-project/vllm/issues/44280).
- Whisper support remains an open multi-modality tracking item ([#25750](https://github.com/vllm-project/vllm/issues/25750)).

## 4. Performance & Optimization
- **FlashInfer GEMM + allreduce fusion for Kimi K3** ([#52687](https://github.com/vllm-project/vllm/pull/52687)) — Fuses `o_proj` GEMM with allreduce for MLA/KDA attention, enabled when `num_tokens >= 256`. Microbenchmarks on 8× B300 (N=7168, K=1536) show speedups across M sizes — see the PR table for full numbers.
- **Skip logits/sampling for unfinished prefills** ([#49171](https://github.com/vllm-project/vllm/pull/49171)) — MRV2 currently produces sampling-logit rows for chunked-prefill requests that don't finish in the current step; the PR skips that work on the non-speculative path.
- **Fully async spec-decode** ([#29134](https://github.com/vllm-project/vllm/issues/29134)) — Overlapping input prep with the forward pass is still blocked by Host↔GPU syncs (`_get_valid_sampled_token_count` / `seq_lens_cpu`); proposal is to make `seq_lens_cpu` optional.
- **DFlash slowdown at high concurrency** ([#42505](https://github.com/vllm-project/vllm/issues/42505)) — Slower than baseline at concurrency > 8 on Qwen3.5-35B-A3B, and far below paper speedup at concurrency=1.
- **Eviction-aware free-list ordering** ([#51909](https://github.com/vllm-project/vllm/pull/51909)) — Never-hit cached blocks are appended to the free list ahead of high-hit blocks to avoid evicting useful cache entries.
- **Per-request spec-decode acceptance stats** ([#48915](https://github.com/vllm-project/vllm/pull/48915)) — Adds per-request acceptance metrics to OpenAI API responses, complementing the server-wide `/metrics` average.
- **Batch-invariant feature tracking** ([#27433](https://github.com/vllm-project/vllm/issues/27433)) — Ongoing effort to defeat nondeterminism in LLM inference; still has open work items.

## 5. Stability & Regressions
Ranked by severity:

**High**
- **MTP illegal memory access on long sequences** — Qwen3.6-27B-FP8, v0.19.1, `num_spec_tokens=5` ([#40756](https://github.com/vllm-project/vllm/issues/40756)). Long-lived, 39 comments, still open.
- **Tool-call regression with MTP enabled** — Qwen3.6-27B tool calls fail on the Responses API, a regression ([#46249](https://github.com/vllm-project/vllm/issues/46249)).
- **CUDA illegal address under load** — `cudaErrorIllegalAddress` in `gdn_attn.py:237` with `qwen3_next_mtp`, `num_speculative_tokens=5` ([#37035](https://github.com/vllm-project/vllm/issues/37035)).
- **GLM-5.2 MTP deadlock on MI300X** — Engine deadlocks in vocab-parallel logits all-gather (RCCL `no transport for peer`) on 8× MI300X ([#48568](https://github.com/vllm-project/vllm/issues/48568)).
- **Kimi-K3 CUDA graph corruption at batch=1** — Three distinct failure modes across cudagraph modes; output silently corrupted ([#52531](https://github.com/vllm-project/vllm/issues/52531)).
- **Draft model crash at init under TP>1** — Crashes when draft `hidden_size` > target; FlashInfer TRT-LLM fused allreduce+RMSNorm workspace is sized from target only ([#52023](https://github.com/vllm-project/vllm/issues/52023)).

**Medium**
- **Prefix-cache 0% hit on re-sent requests** — DeepSeek-V4-Flash hybrid groups lose first-block cache keys on every request reassignment ([#42948](https://github.com/vllm-project/vllm/issues/42948)).
- **Server hangs indefinitely** — Qwen3.5-27B-FP8, no response and no error output ([#35502](https://github.com/vllm-project/vllm/issues/35502)).
- **`strict` flag leaked into chat template** — OpenAI `strict` on tool definitions changes model-visible prompt and tool-call behavior ([#52741](https://github.com/vllm-project/vllm/issues/52741)).
- **`json_schema` garbled output** — Qwen3.5 emits garbled spaces when `response_format=json_schema` is enabled ([#38696](https://github.com/vllm-project/vllm/issues/38696)).
- **Concurrent embedding requests crash V1 engine** — KeyError, long-standing ([#25991](https://github.com/vllm-project/vllm/issues/25991)).

**Fix PRs in flight**
- [#52838](https://github.com/vllm-project/vllm/pull/52838) — AMD GPU-CPU KV transfer fault in `OffloadingConnector` should degrade cache, not take down the engine.
- [#50809](https://github.com/vllm-project/vllm/pull/50809) — Sync `mamba_block_size` via `EngineCoreReadyResponse` (same bug class as #42966).
- [#52832](https://github.com/vllm-project/vllm/pull/52832) — Mooncake: offload producer partial Mamba `align` tails on request finish.
- [#52829](https://github.com/vllm-project/vllm/pull/52829) — Fix red `test_models_fse_init[*-deepseek_v4]` from a semantic conflict of two PRs.

## 6. What This Means for Application Developers
- **MTP/spec-decode remains production-risk territory.** If you serve Qwen3.6 or GLM-5.2 with MTP enabled, regression-test long sequences and tool calling explicitly — three separate crash/regression reports are open ([#40756](https://github.com/vllm-project/vllm/issues/40756), [#46249](https://github.com/vllm-project/vllm/issues/46249), [#37035](https://github.com/vllm-project/vllm/issues/37035)). The upcoming per-request acceptance stats ([#48915](https://github.com/vllm-project/vllm/pull/48915)) will give you observability to decide whether MTP is actually paying off per workload — today you only get server-wide averages.
- **Kimi K3 is early-access.** Expect kernel-level churn and at least one known correctness bug (CUDA graph corruption at batch=1, [#52531](https://github.com/vllm-project/vllm/issues/52531)). Validate thoroughly before serving it in production; the ROCm story is still behind CUDA ([#50682](https://github.com/vllm-project/vllm/issues/50682)).
- **`temperature=0` is not deterministic across cache states.** The same request can return different output cold vs. warm prefix cache; a docs-only PR ([#52701](https://github.com/vllm-project/vllm/pull/52701)) now explains why. Don't rely on exact output reproducibility in tests or agent retry logic.
- **The Rust frontend is converging on parity** — LoRA lifecycle via gRPC ([#52840](https://github.com/vllm-project/vllm/pull/52840)) is a useful milestone if you run the Rust API server (`VLLM_USE_RUST_FRONTEND=1`) and manage adapters dynamically.
- **RL workloads on vLLM are the next frontier** — Sleep/wake correctness ([#48310](https://github.com/vllm-project/vllm/issues/48310)) and LoRA adapter lifecycle ([#48297](https://github.com/vllm-project/vllm/issues/48297)) RFCs are open; watch for weight-sync backends like `sharded_rdt` ([#43375](https://github.com/vllm-project/vllm/pull/43375)) if you run RL training/inference at scale.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-08-19

### 1. Today's Highlights
- SGLang continues to prioritize **DeepSeek-V4 and Kimi-K3** enablement, with new fixes landing for Kimi-K3 vision-DP sharding (#35402) and a cherry-pick that stops losing tool calls to reasoning/constraint conflicts (#35399).
- **HiCache improvements are a central theme**: a buffer-only mode for the host memory layer is up for review (#34798), a KL regression threshold was tightened (#35380), and a new bug report highlights HiCache returning 0 cached tokens on long agentic sessions (#35129).
- Several **SM103 (B300/GB300) kernel crashes** were reported today, pointing to remaining gaps in family-level SM100 feature gating.

### 2. Releases & Breaking Changes
No new releases or breaking changes in the last 24 hours.

### 3. New Model & Hardware Support
- **ROCm 7.2.4 Docker images** are being published, gated on an MI300X/MI355X profiling probe that fixes missing GPU kernels in `torch.profiler` traces (#35398).
- **AMD MI35x nightly coverage** is being migrated from GLM-5.1 to GLM-5.2, including FP8 accuracy and low-latency performance tests on 8×MI35x (#32570).
- **Kimi-K3 vision-DP** index bug fix for multi-image requests with different geometries when using `--dcp-size` (#35402).
- **Realtime ASR (experimental)** adds bounded long-audio handling with encoder-window caching via the existing multimodal cache (#32682).
- **Intel XPU**: EAGLE/NEXTN TP=2 warmup hang was fixed (closed #35144).
- **NPU**: CI tests for multi-item scoring (`/v1/score` with delimiter) were added (#23359).
- **DeepGEMM Mega MoE** can now be enabled as an MoE layer runner backend in NVLink domains (#23167).

### 4. Performance & Optimization
- **HiCache buffer-only mode** is proposed to make the host memory layer purely buffer-based, reducing device round-trips (#34798).
- **Host allocator redesign** tracking: page-aligned allocation with host-side bookkeeping to avoid `torch.unique` and gather-based device readbacks (#35223).
- **DCP + HiCache KL threshold** tightened from 0.01 to 0.005 for Kimi Linear + DCP4 + HiCache L2, aligning with other FP8 hybrid-cache cases (#35380).
- **Cake GDN decode** for Qwen TP4 decode/verify rows on SM100/SM103 is being routed through FlashInfer’s optional public package (#35400).
- **GLM-5.2 MoE** `e_score_correction_bias` is kept in FP32 to avoid BF16 precision collapse (~174 distinct values → ~3) in the noaux_tc path (#31213).
- **Open performance issues**: MI355X Qwen3.5 MTP throughput is significantly behind B200/B300 on agentic workloads (#34596), and per-tensor FP8 GEMM on SM120 is slated for optimization (#33632).

### 5. Stability & Regressions
Ranked by severity (fixes noted if present):

- **[#34235] Scheduler hang in DSV4 sparse prefill on H20** — SGLang 0.5.17 + hierarchical cache + chunked prefill 16K triggers watchdog abort; sampling device-side assert on 0.5.16+PR. No fix PR yet.
- **[#34340] SM103 kernel crashes on B300** — CUTEDSL TGV BF16 GEMM raises Xid 13 and trtllm-gen MoE finalize hangs silently, both due to `is_sm100_supported()` family-level gating. No fix PR yet.
- **[#35388] deepep FP8 MoE crash on GB300/sm_103** — DeepGEMM `m_grouped_fp8_fp4_gemm_nt_contiguous` fails with UE8M0 scale-format mismatch (CUDA 719). No fix PR yet.
- **[#35241] PrefillDelayer persistent feedback loop** — collapses prefill progress under DP Attention + chunked prefill; performance-stability issue. No fix PR yet.
- **[#35129] HiCache loses all prefix hits in long agentic sessions** — DeepSeek-V4-Flash-0731 + DSPARK returns `#cached-token: 0` every turn despite 50%+ prefix; short requests hit ~98%. Under investigation.
- **[#34786] TypeError in mamba track indices during NEXTN verify** — `mamba_next_track_idx is None` in hybrid-mamba + speculative decoding. No fix PR yet.
- **[#35385] WSL2 CUDA IPC auto-selection** — Multimodal models crash at startup because CUDA IPC is unsupported on WSL2, but `--mm-feature-transport` auto-selects it. No fix PR yet.
- **[#35150] DSpark forced-reject GDN state drift** — Qwen3.8 lossless generation not preserved; accumulated state drift vs base decode.
- **[#35396] Page-aligned SWA evict floor assertion** — Fixed on both PD decode prealloc paths; also repairs a mocked unaligned fixture causing CPU CI failure.
- **[#35401] `req_to_token` page tail not initialized** — Patch writes tail so rows remain valid over whole pages; prevents stale index reads.

### 6. What This Means for Application Developers
- If you deploy **Kimi-K3** or **DeepSeek-V4**, watch for the upcoming **0.5.18 release** — it should include the tool-call preservation fix (#35399) and vision-DP fix (#35402).
- **B300/GB300 (SM103) users should be cautious** with FP8 MoE and certain attention paths; several crash reports are open, so pin to known-good versions or test with `is_sm100_supported` workarounds.
- **WSL2 multimodal serving is currently broken** due to CUDA IPC auto-selection; set `--mm-feature-transport` explicitly or wait for the fix.
- **HiCache is powerful but not yet stable for long agentic sessions** — if you rely on high prefix hits, track #35129 closely.
- **AMD users**: ROCm 7.2.4 images are coming and should fix profiler-related kernel visibility, but MI355X MTP decode performance still lags NVIDIA; perform your own benchmarks before committing to MI355X for agent-heavy workloads.

For full details, see all updated issues and PRs under [sgl-project/sglang](https://github.com/sgl-project/sglang).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-19

## Today's Highlights
llama.cpp shipped **v0.1.2** with a ggml sync/version bump, while the rolling-release train added **b10483–b10488**, including OpenVINO 2026.3 CI updates and an **mtmd LFM2 image-tiling fix**. Backend work is accelerating: new PRs add **OpenCL SSM_SCAN**, **WebGPU overlapping-mulmat support**, **IQ2_NL/IQ3_NL CPU quant types**, and a **CUDA FFN-gate+GLU fusion**. The open issue tracker remains dominated by CUDA/ROCm correctness problems, especially multi-GPU/RPC data corruption and flash-attention crashes.

## Releases & Breaking Changes
- **[v0.1.2](https://github.com/ggml-org/llama.cpp/releases/tag/v0.1.2)** — Semantic versioning is still WIP. Change log since v0.1.1 is a ggml sync (`1511ce3bc`) and a ggml version bump (`da786dc23`). Nightly reference: [b10485](https://github.com/ggml-org/llama.cpp/releases/tag/b10485).
- **[b10488](https://github.com/ggml-org/llama.cpp/releases/tag/b10488)** — OpenVINO backend updated to 2026.3 and the Nemotron-H rollback test is skipped on OpenVINO because the backend doesn’t support `SSM_SCAN`.
- **[b10486](https://github.com/ggml-org/llama.cpp/releases/tag/b10486)** — mtmd: fix LFM2 image tiling threshold, plus test refactors.
- **[b10485](https://github.com/ggml-org/llama.cpp/releases/tag/b10485)** — ggml sync only.
- **[b10483](https://github.com/ggml-org/llama.cpp/releases/tag/b10483)** — Build fix for xcframework, CMake cleanup, and vendor target renaming.

No explicit API migration notes beyond “semantic versioning is still WIP” were present in this data.

## New Model & Hardware Support
- **[PR #27342](https://github.com/ggml-org/llama.cpp/pull/27342)** — Adds **DFlash2 speculator support** with local convolution and candidate selector modules.
- **[PR #27322](https://github.com/ggml-org/llama.cpp/pull/27322)** — Adds **IQ2_NL and IQ3_NL quant types on CPU**, useful for tensor rows not exact multiples of 256.
- **[PR #26439](https://github.com/ggml-org/llama.cpp/pull/26439)** — Ports the fused **SSM_SCAN (Mamba-2)** kernel to OpenCL for `d_state` in {128, 256} and all-f32; other shapes still fall back to CPU.
- **[PR #27321](https://github.com/ggml-org/llama.cpp/pull/27321)** — WebGPU now supports mulmat with overlapping `src0`/`src1`, fixing `test-llama-archs -a minimax-01`.
- **[Issue #24730](https://github.com/ggml-org/llama.cpp/issues/24730)** — GLM 5.2 support request was closed, presumably landed.
- **[Issue #21725](https://github.com/ggml-org/llama.cpp/issues/21725)** — High-demand open feature request for an **XDNA backend** (30 👍).

## Performance & Optimization
- **[PR #27341](https://github.com/ggml-org/llama.cpp/pull/27341)** — CUDA: fuses the FFN gate + GLU into the `mul_mat_q` epilogue, closing the MMQ gap versus the existing `mul_mat_vec_q` decode path.
- **[PR #27332](https://github.com/ggml-org/llama.cpp/pull/27332)** — Vulkan: replaces the fixed 8-token cutoff in `MUL_MAT_VEC_ID` with the density gate from #25356. Reported gains on RADV/gfx1151/gfx1013: **+36% at B=9, +27% at B=16, +21% at B=64**, neutral at B≤8.
- **[PR #27344](https://github.com/ggml-org/llama.cpp/pull/27344)** and **[PR #27345](https://github.com/ggml-org/llama.cpp/pull/27345)** — Adds `ggml_rope_set_offset` support across Vulkan, OpenCL, SYCL, WebGPU, and Hexagon.
- **[PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)** — Implements **adaptive MTP draft depth** via `--spec-type draft-mtp-adaptive`, suggested `--spec-draft-n-max 12`.
- **[PR #26439](https://github.com/ggml-org/llama.cpp/pull/26439)** — Moves Mamba-2 SSM scan work from CPU to GPU on OpenCL for supported shapes.
- **[PR #27339](https://github.com/ggml-org/llama.cpp/pull/27339)** — OpenCL norm kernel local-size fix when `ne00 < 64`.
- **[PR #27333](https://github.com/ggml-org/llama.cpp/pull/27333)** — Fixes NUMA path hint inconsistency between `fadvise` and `madvise`.

## Stability & Regressions
Active issues updated in the last 24h, ranked roughly by severity.

**Correctness / data corruption**
- **[Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992)** — `llama-server -np 4 --kv-unified` on Strix Halo/gfx1151 returns **another request’s response verbatim**. Bisected to `c7d87229`. No fix PR visible.
- **[Issue #25593](https://github.com/ggml-org/llama.cpp/issues/25593)** — SM_60 GPUs (P100) silently compute FP32 math in FP16, causing quality loss; fixes exist only in two external forks.
- **[Issue #26257](https://github.com/ggml-org/llama.cpp/issues/26257)** — Qwen3.6-27B garbled output on dual-GPU RTX 5060 Ti + RTX 3060; single-GPU is fine.
- **[Issue #24055](https://github.com/ggml-org/llama.cpp/issues/24055)** — Context checkpoints are always invalidated on hybrid/recurrent models.

**Crashes / hangs**
- **[Issue #26609](https://github.com/ggml-org/llama.cpp/issues/26609)** — CUDA illegal memory access in the flash-attention path with Qwen3.6-35B MoE + partial expert offload. Workaround: `-fa off`.
- **[Issue #27102](https://github.com/ggml-org/llama.cpp/issues/27102)** — CUDA kernel stall and watchdog kill on RTX Pro 6000 Blackwell with Qwen3.8-27B.
- **[Issue #27021](https://github.com/ggml-org/llama.cpp/issues/27021)** / **[Issue #26746](https://github.com/ggml-org/llama.cpp/issues/26746)** — ROCm `TOP_K` crashes (“invalid configuration argument”) with `ncols > 1024`, blocking DeepSeek V4 contexts beyond ~128K.
- **[Issue #26583](https://github.com/ggml-org/llama.cpp/issues/26583)** — GLM-5.2 crashes deterministically on multi-node CUDA RPC with `invalid data ptr`.
- **[Issue #26902](https://github.com/ggml-org/llama.cpp/issues/26902)** — Multi-GPU tensor split assert failure in `ggml-backend-meta.cpp` with Glimmer Q8_0 on 4× Tesla T10.
- **[Issue #24795](https://github.com/ggml-org/llama.cpp/issues/24795)** — Gemma 4 assistant MTP draft model load regression: works on b9553, broken on b9702/b9717 (“invalid vector subscript”).
- **[Issue #26996](https://github.com/ggml-org/llama.cpp/issues/26996)** — Windows ROCm 7.14 release is missing `hipblas.dll`; GPU not detected.
- **[Issue #22197](https://github.com/ggml-org/llama.cpp/issues/22197)** — Vulkan segfault from unsupported multi-buffer handling in `ggml-backend-meta`.

**Fix PRs in flight**
- **[PR #27286](https://github.com/ggml-org/llama.cpp/pull/27286)** — Validates expert IDs in `mul_mat_id` to prevent a heap out-of-bounds write in release builds.
- **[PR #27285](https://github.com/ggml-org/llama.cpp/pull/27285)** — mtmd: checks missing optional tensors before dereferencing, fixing NULL-page SIGSEGV on crafted mmproj files.
- **[PR #27338](https://github.com/ggml-org/llama.cpp/pull/27338)** — Sets `GGML_NATIVE=OFF` for OpenVINO Docker builds to avoid build-machine ISA faults.
- **[PR #27336](https://github.com/ggml-org/llama.cpp/pull/27336)** — Skips `test-unicode` on win32 shared-library builds.

**Known performance regressions**
- **[Issue #26163](https://github.com/ggml-org/llama.cpp/issues/26163)** — Vulkan flash-attention tuning gate fails when the driver reports `maxComputeSharedMemorySize = 32768`; ~17% throughput loss on Vega/gfx90c.
- **[Issue #24438](https://github.com/ggml-org/llama.cpp/issues/24438)** — ROCm/HIP backend reaches only ~40% of expected memory bandwidth on gfx1151 for MoE token generation.
- **[Issue #27079](https://github.com/ggml-org/llama.cpp/issues/27079)** — `dry_penalty_last_n` server error when using Vulkan/ROCm images.

## What This Means for Application Developers
- **Don’t trust `latest` tags yet.** Semantic versioning is still WIP, so pin to exact release builds such as `v0.1.2` or `b10488`.
- **Multi-GPU and RPC deployments need extra validation.** The cross-request response contamination on Strix Halo ([#25992](https://github.com/ggml-org/llama.cpp/issues/25992)) and the multi-node RPC crash ([#26583](https://github.com/ggml-org/llama.cpp/issues/26583)) are production blockers for affected configurations.
- **If you serve Qwen MoE models on CUDA with flash-attention, keep `-fa off` as a rollout escape hatch** for the illegal-memory-access failures seen in [#26609](https://github.com/ggml-org/llama.cpp/issues/26609).
- **Long-context DeepSeek V4 on ROCm is still blocked past ~128K** due to `TOP_K` kernel issues ([#27021](https://github.com/ggml-org/llama.cpp/issues/27021)).
- **API users of `peg-native` chat format with JSON schema should expect intermittent 500s** until the parse-failure issue is fixed.
- **The new adaptive MTP speculator (`--spec-type draft-mtp-adaptive`) is worth evaluating** for compatible models; combined with Vulkan/CUDA kernel improvements, speculative-decoding throughput continues to mature.
- **For OpenVINO containers, rebuild or use patched images with `GGML_NATIVE=OFF`** to avoid faults caused by host-specific instruction set selection.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-19

## Today's Highlights
No release artifacts were published in the last 24 hours. Activity is concentrated on Qwen3.8 support issues and several backend regressions, including CUDA fallback on sm_86 GPUs and a ROCm KV-state bleed on AMD Strix Halo. Fix PRs are already open for silent stream termination ([#17846](https://github.com/ollama/ollama/pull/17846)) and Qwen3.8 system-message normalization ([#17855](https://github.com/ollama/ollama/pull/17855)).

## Releases & Breaking Changes
- None in the last 24 hours.

## New Model & Hardware Support
- No official model/backend release landed today.
- In-flight backend updates: `llama.cpp update` ([#17851](https://github.com/ollama/ollama/pull/17851)) and a temporary MLX-C patch ([#17850](https://github.com/ollama/ollama/pull/17850)).
- Intel Integrated GPU support remains an open feature request ([#3113](https://github.com/ollama/ollama/issues/3113)).
- MLX engine is present but currently lacks prompt/prefix caching between requests ([#17829](https://github.com/ollama/ollama/issues/17829)).

## Performance & Optimization
- PR [#17752](https://github.com/ollama/ollama/pull/17752) adds a model metadata cache to avoid repeated GGUF metadata reads, cutting roughly **~300 ms per inference call**; cache invalidation is tied to manifest changes.
- v0.32.14 reported to spike CPU to **50–80%** even when the model is fully GPU-resident; v0.32.13 does not exhibit this ([#17833](https://github.com/ollama/ollama/issues/17833)).
- CUDA regression on sm_86 GPUs (RTX 30 / A40 / A6000): Ollama silently falls back to CPU because CUDA 13 build omits compute capability 8.6 and the CUDA 12 fallback is broken ([#17841](https://github.com/ollama/ollama/issues/17841)).
- MLX backend re-prefills the full prompt on every agent step; TTFT grows with 20–30K token contexts ([#17829](https://github.com/ollama/ollama/issues/17829)).

## Stability & Regressions
Ranked by severity:

1. **ROCm KV-state bleed on Strix Halo** — gfx1151 iGPU returns content from a previous unrelated request, contaminating responses ([#17847](https://github.com/ollama/ollama/issues/17847)).
2. **Silent stream abort in `/api/chat`** — HTTP 200 with `done:false`, empty content, and no error when generation is internally cancelled; PR [#17846](https://github.com/ollama/ollama/pull/17846) adds an explicit error when the stream ends without a final response.
3. **CUDA sm_86 CPU fallback** — Ampere GPUs silently run CPU-only on 0.32.14 ([#17841](https://github.com/ollama/ollama/issues/17841)).
4. **Qwen3.8 tool-loop crash** — 500 error `no user query found in messages` during streaming tool calls ([#17778](https://github.com/ollama/ollama/issues/17778)).
5. **Qwen3.8:27b AMD load failure** — `Could not load "TensileLibrary_lazy_gfx1200.dat"` on RX 9060 XT ([#17782](https://github.com/ollama/ollama/issues/17782)).
6. **Agent integration hangs on macOS** — Local Qwen models hang in agent/IDE harnesses while direct Ollama API calls work ([#17839](https://github.com/ollama/ollama/issues/17839)).
7. **Qwen3.8 download failure** — `ollama run qwen3.8` fails with `EOF` during manifest pull ([#17816](https://github.com/ollama/ollama/issues/17816)).
8. **Think-mode mismatch** — CLI accepts `/set think true|false` but backend rejects `"true"`/`"false"` as invalid values ([#17837](https://github.com/ollama/ollama/issues/17837)).
9. **High CPU usage on 0.32.14** despite full VRAM residency ([#17833](https://github.com/ollama/ollama/issues/17833)).
10. **Stale runners after llama-server crash** — scheduler keeps dead runners as loaded; PR [#17516](https://github.com/ollama/ollama/pull/17516) evicts runners whose subprocess has exited.

Other notable updates: license/notice distribution still unresolved ([#3185](https://github.com/ollama/ollama/issues/3185)); Qwen3.5 `format` ignored when `think` disabled ([#14645](https://github.com/ollama/ollama/issues/14645)); Tesla V100 compute-capability 7.0 no longer supported in recent builds ([#16533](https://github.com/ollama/ollama/issues/16533)).

## What This Means for Application Developers
- Do not treat a clean `/api/chat` stream close as success; after [#17846](https://github.com/ollama/ollama/pull/17846), clients should handle an explicit error when no final response is emitted.
- If you target Qwen3.8 with agentic/tool-calling workflows, watch for template/parser failures and consider pinning models or bypassing the chat-template path until [#17855](https://github.com/ollama/ollama/pull/17855) and related fixes land.
- On CUDA Ampere or AMD Strix Halo hardware, verify actual GPU residency (`ollama ps`, `nvidia-smi`) before relying on 0.32.14; both have known silent fallback/correctness issues.
- MLX users should be aware that agent loops on Apple Silicon will re-prefill entire contexts each step — keep context windows as short as possible until prefix caching is implemented.
- For multi-tenant or sequential workloads using ROCm on gfx1151, isolate requests to avoid cross-request content contamination ([#17847](https://github.com/ollama/ollama/issues/17847)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM Digest — 2026-08-19

### 1. Today's Highlights

No new release was cut in the last 24 hours; the activity is concentrated on correctness fixes and hardening. The most significant PRs address Bedrock Mantle web-search tools being silently dropped on `/responses` (#37375), a serious semantic-cache embedding bug (#37367), a high-impact SpendLogs index for Postgres/Aurora (#37379), Bedrock guardrail cost accounting (#37362), and SSE keepalives for long-idle streaming routes (#37368). On the bug side, the most critical open item is a duplicate `content_block_stop` in `/v1/messages` streaming that causes tools to execute twice (#37273).

### 2. Releases & Breaking Changes

- None in the last 24 hours. No new versions, API/config changes, or migration notes to report.

### 3. New Model & Hardware Support

- **OpenAI-compatible reasoning models**: PR #37369 adds `reasoning_effort` to `get_supported_openai_params` and fills in missing TypedDict fields so custom reasoning models pass through correctly.  
  https://github.com/BerriAI/litellm/pull/37369
- **Bedrock Mantle web search**: PR #37375 stops dropping `web_search*` tools on the Mantle `/responses` path.  
  https://github.com/BerriAI/litellm/pull/37375
- **Model pricing/correction**: Issue #37268 flags an incorrect `azure/gpt-5.6-sol` entry in `model_prices_and_context_window.json`; expect a cost-map fix.  
  https://github.com/BerriAI/litellm/issues/37268
- **Open feature request**: Native `bedrock_agentcore` web search as a first-class provider (#31819).  
  https://github.com/BerriAI/litellm/issues/31819
- No hardware/quantization/backend changes (CUDA/ROCm/Metal/CPU) were reported in this window.

### 4. Performance & Optimization

- **SpendLogs index**: PR #37379 adds a `CONCURRENTLY`-built index on `(api_key, startTime DESC)` for `LiteLLM_SpendLogs`; this directly fixes full date-window scans that previously pinned a customer’s Aurora writer at 99.7% CPU.  
  https://github.com/BerriAI/litellm/pull/37379
- **Semantic cache**: PR #37367 truncates semantic-cache embedding input and sends `extra_body` at the top level, avoiding silent cache misses and strict OpenAI-compatible server rejections (vLLM/NIM).  
  https://github.com/BerriAI/litellm/pull/37367
- **Guardrails usage queries**: PR #37380 caps the accepted date window on `/guardrails/usage`, preventing unbounded aggregation and raw 500s on malformed dates.  
  https://github.com/BerriAI/litellm/pull/37380
- **SSE keepalives**: PR #37368 wraps assistants runs and A2A streams in the existing pre-first-byte keepalive logic, preventing 60s idle-timeout proxies from killing healthy connections.  
  https://github.com/BerriAI/litellm/pull/37368
- **OTel attribution**: PR #36595 fixes Prisma database spans from showing up as `localhost` traffic in APMs, attributing them to PostgreSQL instead.  
  https://github.com/BerriAI/litellm/pull/36595
- **Known streaming stall**: Issue #32004 (closed) reports Bedrock Converse buffering `input_json_delta` for large tool calls, causing 60–150s+ silent SSE gaps on `/v1/messages`. Worth tracking if you run Bedrock + Anthropic-format streaming.  
  https://github.com/BerriAI/litellm/issues/32004

### 5. Stability & Regressions

Ranked roughly by severity:

- **Critical — duplicate `content_block_stop` causes tools to run twice**: `/v1/messages` streaming emits one `content_block_start` but two `content_block_stop` events for a single tool call. Open, no fix PR in this window.  
  https://github.com/BerriAI/litellm/issues/37273
- **Security — `/health` leaks credentials**: `GET /health` returns `extra_headers` and `aws_session_token` in plaintext, unlike `/model/info` which was previously fixed. Open.  
  https://github.com/BerriAI/litellm/issues/36898
- **Budget/accounting — provider budgets never reset without Redis**: `provider_budget_config` reports `budget_reset_at` ~57 years in the future when Redis is absent, causing monthly budgets to effectively never reset. Open.  
  https://github.com/BerriAI/litellm/issues/37261
- **Router outage — adaptive router permanently 500s**: A persisted `alpha/beta=0` cell bricks the router with `gammavariate: alpha and beta must be > 0.0`, and it never recovers. Open.  
  https://github.com/BerriAI/litellm/issues/35590
- **MCP config loss — PUT nulls OAuth fields**: `PUT /v1/mcp/server` silently discards `authorization_url`, `token_url`, and `oauth2_flow` when `delegate_auth_to_upstream=true`. Open.  
  https://github.com/BerriAI/litellm/issues/37258
- **Token accounting — Bedrock CountTokens unsupported**: `bedrock-runtime` CountTokens does not support Claude Opus 5 / Sonnet 5, so LiteLLM understates token counts. Open.  
  https://github.com/BerriAI/litellm/issues/37102
- **Translation — `use_chat_completions_api: true` drops content**: When converting OpenAI chat completions back to Anthropic Messages format, `content` is lost if the upstream returns `reasoning_content`. Open.  
  https://github.com/BerriAI/litellm/issues/27492
- **Fallback correctness — mid-stream fallback prefill**: Fallback requests include an assistant `prefix=True` block, breaking providers that don't support prefills (Claude Sonnet 4.6 / Opus 4.7). Open.  
  https://github.com/BerriAI/litellm/issues/27967
- **GPT-5.4 Responses bridge**: `chatgpt/gpt-5.4` returns empty final Responses output; `completion()` bridge fails with `Unknown items in responses API response: []`. Open.  
  https://github.com/BerriAI/litellm/issues/25429
- **Anthropic `vector_store_ids` rejection**: Routing through LiteLLM to Anthropic rejects `vector_store_ids` with `Extra inputs are not permitted`. Open.  
  https://github.com/BerriAI/litellm/issues/23741

Fix PRs landed in this window include credential-leak prevention for vector-store debug logs (#37373), Bedrock guardrail cost inclusion in spend/budgets (#37362), DashScope nested `cache_creation_input_tokens` mapping to `cache_write_tokens` (#37377), and semantic-cache fixes (#37367).

### 6. What This Means for Application Developers

- **If you build on `/v1/messages` streaming with tool calls, watch issue #37273 closely** — duplicate `content_block_stop` can cause agents to execute tools twice. Pin/upgrade only after a fix lands.
- **Don't put secrets in `extra_headers` that are exposed via `/health`**. If you rely on health-check endpoints in monitoring, scrub or avoid sensitive upstream headers until #36898 is fixed.
- **Budget enforcement is still risky in edge cases**: virtual-key spend can be stale (#27735), batch spend may not attribute to the creating key (#36071), and provider budgets can fail to reset without Redis (#37261). For strict cost controls, verify accounting after upgrade.
- **MCP OAuth configurations need re-validation after updates**; a `PUT /v1/mcp/server` can silently drop OAuth endpoint fields when `delegate_auth_to_upstream=true` (#37258).
- **For Mantle/Bedrock web search**, update to a build containing #37375 before relying on `/responses` search tools. For custom OpenAI-compatible reasoning models, #37369 enables `reasoning_effort` passthrough.
- **Large deployments should benefit from the SpendLogs index in #37379** — if you're seeing high Postgres/Aurora CPU on logs or key-info queries, this is likely the fix you've been waiting for.
- **SSE keepalives for assistants runs and A2A streams are a worthwhile upgrade** if you're behind idling proxies or load balancers with aggressive timeouts (#37368).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-19

## Today’s Highlights

All activity in the last 24 hours is concentrated in Unsloth Studio and AMD backend support. A Studio-wide crash triggered by a single failed Markdown chunk now has a fix (#9236), and several PRs land memory/UI performance work for streaming reasoning and code fences (#9228, #9231). AMD-specific fixes are also moving, including ROCm detection on split Debian stacks (#8886) and Windows VRAM reporting (#8863). No releases were published in the last 24 hours.

## Releases & Breaking Changes

None in the last 24 hours. No new versions, API/config changes, or migration notes to report.

## New Model & Hardware Support

Support work in progress rather than landable releases:

- **Ollama models in Studio model picker** — PR #9237 makes pulled Ollama models appear in the chat picker and loads their manifest refs. Previously the frontend intentionally dropped `source="ollama"` inventory rows.  
  https://github.com/unslothai/unsloth/pull/9237

- **ROCm detection fix for split Debian stacks** — PR #8886 detects newer HSA runtimes even when an older `hipconfig` is present, avoiding a CPU-wheel fallback on Debian 13/LMDE.  
  https://github.com/unslothai/unsloth/pull/8886

- **Windows AMD VRAM reporting** — PR #8863 reports used/free VRAM on Windows ROCm by joining adapter counters on LUID.  
  https://github.com/unslothai/unsloth/pull/8863

- **AMD backend mismatches still open** — Studio installer may report an AMD GPU while the backend runs CPU-only (#8473); Strix Halo `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` preventing offload was fixed/closed (#8651).  
  https://github.com/unslothai/unsloth/issues/8473  
  https://github.com/unslothai/unsloth/issues/8651

- **Support gaps** — Request for aarch64 container images remains open (#4198); NVFP4 loading on RTX 5060 Ti 16 GB is not working for at least one user (#8246).  
  https://github.com/unslothai/unsloth/issues/4198  
  https://github.com/unslothai/unsloth/issues/8246

## Performance & Optimization

- **Bound the Shiki token cache** — PR #9228 prevents streamed code fences from retaining every prefix in JS heap. Estimated cost was **0.28 MB per 250 ms refresh window**; a 32 KB fence streamed over ~83 s retained **+82.71 MB**.  
  https://github.com/unslothai/unsloth/pull/9228

- **Window the streaming reasoning pane** — PR #9231 avoids holding the full reasoning body in a 256 px scroller; long generations reached ~15,000 mounted elements and 14,000 Shiki highlight spans, collapsing frame rate.  
  https://github.com/unslothai/unsloth/pull/9231

- **Memoize sidebar chat grouping** — PR #9227 stops `groupThreads` from walking and reallocating the whole chat history on every sidebar refresh.  
  https://github.com/unslothai/unsloth/pull/9227

- **Take SQLite reads off the event loop** — PR #9234 avoids a process-global SQLite VFS mutex stall blocking all Studio requests, including `/api/liveness`.  
  https://github.com/unslothai/unsloth/pull/9234

- **Lazy-mount model-picker tooltips/menus** — PR #9233 mounts Radix tooltips/dropdowns for “On Device” rows only on first contact.  
  https://github.com/unslothai/unsloth/pull/9233

- **Sidebar menus off the modal layer** — PR #9229 removes three common sidebar menus from the body modal layer, following up on #9051.  
  https://github.com/unslothai/unsloth/pull/9229

- **Refuse unsafe hand-set context on Apple Silicon** — PR #9172 prevents an M1 Max kernel panic when a hand-set context length exceeds unified memory capacity, e.g. with `Qwen3.8-27B-UD-Q4_K_XL.gguf`.  
  https://github.com/unslothai/unsloth/pull/9172

## Stability & Regressions

Ranked roughly by severity:

- **One failed Markdown chunk can crash all of Studio** — Issue #9235; fix PR #9236 wraps `React.lazy`/Suspense failures for code and Mermaid chunks so the app degrades instead of dying.  
  https://github.com/unslothai/unsloth/issues/9235  
  https://github.com/unslothai/unsloth/pull/9236

- **Kernel panic on M1 Max with hand-set context** — PR #9172 fixes a Metal unified-memory exhaustion path for large Q4_K_XL GGUFs.  
  https://github.com/unslothai/unsloth/pull/9172

- **Main branch CI is red** — PR #9192 repairs four failing tests, and in doing so found a real shipped bug in the mmproj fallback toast description.  
  https://github.com/unslothai/unsloth/pull/9192

- **Windows shim resolution failure** — PR #9238 fixes `WinError 193` when `unsloth start codex` / `unsloth start pi` resolves an extensionless POSIX shim instead of the `.cmd` sibling.  
  https://github.com/unslothai/unsloth/pull/9238

- **MCP parallel tool-call arguments corrupted** — Issue #9022 (closed) reported Studio concatenating parallel `function.arguments`, causing persistent `Extra data` errors in later requests.  
  https://github.com/unslothai/unsloth/issues/9022

- **Studio crashes when Claude Code takes too long** — Issue #8916 remains open.  
  https://github.com/unslothai/unsloth/issues/8916

- **MLX Train/Export falsely greyed out** — Issue #9120: startup thread race on first `transformers` import, not a broken install.  
  https://github.com/unslothai/unsloth/issues/9120

- **Embeddings endpoint unreliable** — Issue #9128.  
  https://github.com/unslothai/unsloth/issues/9128

- **Agent tool/RAG failures** — Issue #8854: model cannot list files in a thread/project and cannot create new files, causing tool errors.  
  https://github.com/unslothai/unsloth/issues/8854

- **Consecutive web searches fail** — Issue #9108: Studio cannot run two web searches in the same chat with cloud models.  
  https://github.com/unslothai/unsloth/issues/9108

## What This Means for Application Developers

- **If you are embedding Unsloth Studio as an agent backend**, test MCP paths and tool-call history carefully. The parallel-argument corruption issue (#9022) is closed, but file-listing/writing tool errors (#8854) and unreliable `/embeddings` (#9128) are still open.

- **If you are using Desktop as a local API server**, expect to rely on Cloudflare tunnels for now. Multiple requests for LAN/`0.0.0.0` listening were closed (#8578, #8934, #8898), and locally trusted self-signed certificates are not yet honored (#9218).

- **On Apple Silicon**, leave context length on Auto or stay below the quantized model’s unified-memory budget until #9172 is confirmed in a release; hand-setting a large context on a 32 GB machine can panic the OS.

- **On AMD**, the ROCm/CPU fallback mismatch (#8473) is still a real risk. PRs #8886 and #8863 should improve detection and VRAM reporting in the next Studio update.

- **Long streamed replies** should become noticeably cheaper in the desktop UI after #9228 and #9231 land — heap growth and frame drops from long code fences/reasoning panes were significant.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*