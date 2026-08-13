# AI Infrastructure Digest 2026-08-10

> Generated: 2026-08-10 04:40 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison — 2026-08-10

## 1. Ecosystem Overview

The inference ecosystem is in a **correctness-hardening phase** after a wave of frontier-model enablement. DeepSeek-V4, Kimi-K3, MiniMax-M3, GLM-5.2, and Qwen3.5/3.6 are stressing KV-cache layouts, MoE dispatch, speculative decoding, and FP4-class quantization paths faster than maintainers can stabilize them. Only llama.cpp (b10333/b10332) and Unsloth (v0.1.527-beta) shipped releases in the window; vLLM, SGLang, Ollama, and LiteLLM all have fixes in PRs but nothing stable to pin. The most consequential pattern is **silent correctness failures** — cross-request contamination, quantized-kernel corruption, and falsified streaming terminations — which are more dangerous to production AI agents than any throughput gap.

## 2. Activity Comparison

| Project | Issues (referenced) | PRs (referenced) | Release status (24h) |
|---|---|---|---|
| vLLM | 13 | 14 | No release; work on main only |
| SGLang | 37 updated¹ | 308 updated¹ | No release |
| llama.cpp | 13 | 15 | **b10333, b10332 shipped** |
| Ollama | 17 | 5 | No release |
| LiteLLM | 18 | 12 | No release; 1.97.0-RC1 carries a usage-stats regression |
| Unsloth | 11 | 11 | **v0.1.527-beta shipped** |

¹ SGLang counts are total items touched on 2026-08-10, per its digest; other columns count distinct issues/PRs explicitly referenced per project digest. SGLang is by far the busiest repo by raw PR churn (308 touched), followed by vLLM's focused fix queue.

## 3. Model Support Race

No project shipped a new model family in a stable release this window; all frontier-model work is in PRs or open issues.

- **vLLM leads on frontier-model serving depth.** MiniMax-M3-NVFP4 on B200 now shows credible EAGLE3 decode speedups (2.1–2.3×) after the NVFP4 correctness fix [#48929]. Kimi-K3 on ROCm has two in-flight fix PRs (KDA/MLA post-projection [#50592], AITER FP8 KV-cache decode [#51011]). DeepSeek-V4-Flash-0731 (DSpark) remains **blocked on Ampere** (92-comment issue) and hits sparse-MLA routing failures on Blackwell SM120.
- **SGLang is closest behind**, with open PRs for Kimi-K3 on Ascend NPU [#33465], Kimi-K3 DCP on AMD [#32796], and DeepSeek-V4 on Intel XPU [#33808]. However, GLM-5.2/Kimi-K3 wide-EP on GB200/B200 remains a tracked problem [#34120].
- **llama.cpp wins on hardware/backend breadth**: new MetaX backend [#22212], an alternative Hexagon NPU backend [#26373], STQ1_0 ternary quantization [#22836], and Nemotron Nano MTP [#26725] — plus a BitNet `relu2` activation correctness fix.
- **Ollama lags on models**: MLX image input landed [#17600], but new-model support is still open feature requests (`dspark` [#17016], Kimi-K3 Cloud [#17235]).
- **Unsloth is advancing the multimodal fine-tuning edge**: MiniMax-H3 INT8 denoiser support [#8293], Apple Silicon video generation [#8198], and Z-Image/FLUX.2 Klein LoRA base-checkpoint fixes.

**Bottom line:** vLLM is ahead on serving frontier MoE/quantized models; llama.cpp leads on silicon and format breadth; SGLang is the fastest PR mover; Ollama and Unsloth inherit upstream risk rather than define it.

## 4. Performance Frontier

- **KV cache is the #1 battleground.** DeepSeek-V4's ~8× KV-bytes/token expansion (56 B/token, ~121K max context on H20 TP=2) is forcing the issue. vLLM is adding CPU-offload capacity metrics in tokens [#51615], self-describing KV events at KV-group granularity [#51614], and fixing a spec-promotion bug that silently dropped `kv_quant_mode` [#51612]. SGLang prioritizes **HiCache consistency** for PP-disaggregated prefill [#22607] and a unified hybrid radix-cache refactor [#20415].
- **Speculative decoding is high-reward, high-risk.** vLLM demonstrates strong EAGLE3 gains (2.1–2.3×) but reports catastrophic DSD aggregate-throughput collapse at batch-size thresholds [#49548] and a baseline tax on all DSD arms [#49986]. SGLang has a scheduler hang on first EAGLE verify with DSA attention + PD-disaggregated decode [#33642]. llama.cpp MTP continues to show cross-request state leakage [#26425] and long-session repetition [#23577].
- **Quantization effort has shifted to FP4-class correctness and MoE INT8.** vLLM is fixing NVFP4/mxfp4 weight handling; SGLang corrects W4AFP8+DeepEP scaling/dtype crashes [#33669]; Unsloth is building MiniMax-H3 INT8 denoisers; llama.cpp introduces ternary (STQ1_0). The Marlin W4A8-FP8 **silent corruption** on GB10 [#49546] is a warning to validate quantized paths with eval-time checks, not just benchmarks.
- **Distributed serving is being de-risked.** vLLM advances NIXL disaggregation (first-token handoff instead of re-prefill) and fixes CPU multi-TP NUMA binding. SGLang's DCP MHA LSE merge avoids a second full FP32 `[tokens, heads, value_dim]` allocation for Kimi-K3 TP8/DCP. llama.cpp parallelizes RPC cached-tensor hashing (20–60% lower load times). LiteLLM exposes streaming-usage undercounting in chained proxy topologies — a gateway-side distributed bug.
- **Kernels**: XPU Triton LoRA batching (vLLM), Ascend Triton dispatch (SGLang), CuTe 2-CTA GEMM barrier fix (SGLang), SYCL dense-FFN fusion (llama.cpp), ROCm SDPA fallback gap (Unsloth — 66 GiB allocation on a 16 GB card).

## 5. Layer Positioning

| Layer | Projects | 2026-08-10 posture |
|---|---|---|
| **Production serving engines** | vLLM, SGLang | Competing directly on frontier MoE serving, KV-cache engineering, speculative decoding, and quantized-kernel correctness. vLLM is further along on BV/NVFP4; SGLang has broader PR velocity and NPU/XPU expansion. |
| **Local/edge runtime + developer wrapper** | llama.cpp, Ollama | llama.cpp is the GGUF execution core (backends, RPC, C-API memory observability). Ollama is the ergonomic packaging layer over llama.cpp/MLX — and inherits upstream bugs (tool-call parsing, MTP state leakage, MLX cross-request contamination). |
| **Gateway / orchestration** | LiteLLM | Sits above engines/clouds: routing, cost/usage accounting, rate limiting, streaming fidelity, SSE keepalives, tool-call passthrough. Its regressions (usage counters frozen on 1.97.0-RC1, chained-proxy streaming undercount) are business-level, not just latency-level. |
| **Fine-tuning / training** | Unsloth | Low-memory LoRA/QLoRA and Studio; today's theme is **memory-planning correctness** — ROCm math-kernel fallbacks, multi-GPU budgets not spreading across GPUs, Windows WDDM silently swapping to host RAM instead of raising OOM. |

The layers compose: Unsloth trains/quantizes → vLLM/SGLang serve → LiteLLM routes → llama.cpp/Ollama cover edge deployment. Bugs at one layer propagate to revenue at the gateway and correctness at the edge.

## 6. Trend Signals

1. **Silent correctness failures are the biggest production risk.** MLX runners returning an earlier prompt's answer verbatim ([Ollama #17599]), Marlin W4A8-FP8 emitting `</think>` loops at temp 0 ([vLLM #49546]), Vulkan flash attention leaking stale K/V ([llama.cpp #26744]), and LiteLLM converting upstream resets into synthetic `finish_reason: stop` ([#33404]) are all undetectable without output validation. **Pin known-good versions and add semantic/statistical response checks.**

2. **Frontier MoE + long context is breaking KV machinery.** DeepSeek-V4's KV expansion and Kimi-K3's ~240K-token NaN prefill collapse both demonstrate that KV layout, quantized KV, and disaggregation must be designed together. Expect more "model runs but silently degrades" reports as context windows push past 1M.

3. **Speculative decoding is not production-safe yet.** Batch-threshold collapses (vLLM), EAGLE verify hangs (SGLang), and MTP state leakage (llama.cpp) mean single-stream benchmarks are misleading. Validate speculative schedules at production concurrency and with long-lived sessions.

4. **Tool-calling remains the #1 application-layer failure.** Ollama rejects its own `gpt-oss` tool calls, HF-sourced GGUFs lack built-in tool-calling templates, gpt-5.6 tools fail on `reasoning_effort`, MCP hosts hit double-encoding bugs, and streaming truncates when `content` and `tool_calls` coexist. **Agent stacks need client-side tool-call validation, retries, and non-streaming fallbacks.**

5. **Quantization formats are fragmenting — and each carries its own correctness debt.** NVFP4, mxfp4, W4A8-FP8, INT8 MoE, ternary (STQ1_0) — none is a settled default. This favors eval-first, benchmark-second adoption.

6. **Non-CUDA silicon is an active but risky frontier.** Ascend NPU, Intel XPU, ROCm gfx95x/gfx1200, MetaX, and Hexagon all have enablement in flight, but memory-planning gaps (66 GiB allocation on a 16 GB card; host-RAM swap on Windows ROCm) are severe on AMD paths.

**What to watch next:** vLLM KV offload/metrics PRs [#51612–51615] and DSpark Ampere resolution; SGLang HiCache consistency [#22607] and the EAGLE-verify hang [#33642]; llama.cpp expert caching [#26824] and the RPC GET_ROWS OOB read [#26825]; Ollama's MLX contamination fix [#17599]; LiteLLM's streaming-usage root-cause in chained proxies [#36114]; Unsloth's per-host memory-budget work and MiniMax-H3 INT8 denoiser [#8293].

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM Digest — 2026-08-10

### 1. Today's Highlights

No releases landed in the last 24 hours; work centered on KV-cache offload/layout refactors, ROCm/Kimi-K3 enablement, and a high-traffic feature request to run DeepSeek-V4-Flash-0731 (DSpark) on Ampere GPUs ([#50576](https://github.com/vllm-project/vllm/issues/50576), 92 comments). Several in-flight PRs fix spec-promotion bugs that silently drop `kv_quant_mode`, add CPU-offload capacity metrics for routers, and repair Kimi-K3 AMD attention paths.

### 2. Releases & Breaking Changes

None in the last 24 hours.

### 3. New Model & Hardware Support

- **DeepSeek-V4-Flash-0731 / DSpark on SM8x (A100/A800)** remains blocked — feature request now at 92 comments and 12 👍 ([#50576](https://github.com/vllm-project/vllm/issues/50576)). On Blackwell SM120, the same checkpoint hits a FlashInfer sparse MLA decode kernel routing failure ([#50720](https://github.com/vllm-project/vllm/issues/50720)).
- **Kimi-K3 on ROCm**: tracking issue for feature/performance parity on AMD ([#50682](https://github.com/vllm-project/vllm/issues/50682)); PR [#50592](https://github.com/vllm-project/vllm/pull/50592) removes redundant post-projection copies from AMD KDA/MLA paths, and PR [#51011](https://github.com/vllm-project/vllm/pull/51011) fixes FP8 KV-cache decode on the AITER MLA backend (GSM8K: 74.00% → 97.19%, degenerate answers dropped from 285 to a handful).
- **MiniMax-M3-NVFP4 on 8× B200**: first credible results after the NVFP4 correctness fix [#48929](https://github.com/vllm-project/vllm/pull/48929) ([#51494](https://github.com/vllm-project/vllm/issues/51494)).
- **mxfp4 quantization**: PR [#51419](https://github.com/vllm-project/vllm/pull/51419) fixes FP32 `weight_scale` checkpoints and per-expert weight mapping.
- **XPU**: LoRA kernels migrated from per-slice calls to batched Triton multi-slice ops ([#51613](https://github.com/vllm-project/vllm/pull/51613)).
- **CPU**: multi-TP workers now bind to correct NUMA nodes instead of all landing on node 0 ([#50525](https://github.com/vllm-project/vllm/pull/50525)).

### 4. Performance & Optimization

- **MiniMax-M3-NVFP4 on B200**: EAGLE3 speculative decoding delivers 2.1–2.3× decode speedup on a 1M-token real-prose workload after the NVFP4 correctness fix ([#51494](https://github.com/vllm-project/vllm/issues/51494)).
- **DeepSeek-V4-Flash-0731 KV-cache inefficiency**: ~8× more KV bytes/token than the preview checkpoint (56 bytes/token; only 150K tokens fit in 7.7 GiB), capping `max_model_len` at ~121K on H20 TP=2 ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- **Dynamic speculative decoding** (`num_speculative_tokens_per_batch_size`) causes catastrophic aggregate-throughput collapse at the batch-size threshold; the expected PIECEWISE cuDAG downgrade is ~14% but aggregate effects are worse ([#49548](https://github.com/vllm-project/vllm/issues/49548)). Related report: all DSD arms pay a baseline tax vs. no-spec ([#49986](https://github.com/vllm-project/vllm/issues/49986)).
- **KV offload**: PR [#51615](https://github.com/vllm-project/vllm/pull/51615) reports CPU offload capacity in tokens so routers can plan against total cache capacity; PR [#51614](https://github.com/vllm-project/vllm/pull/51614) makes CPU KV events self-describing at KV-group block granularity, fixing hash/block-size mismatches in hybrid layouts (e.g., DeepSeek V4).
- **KV spec promotion bug**: `_promote_local_kv_cache_specs` silently drops `kv_quant_mode`, mis-sizing pages for quantized KV caches (MLA and chunked-local paths) — fix in [#51612](https://github.com/vllm-project/vllm/pull/51612).
- **NIXL disaggregation**: toy proxy now feeds the decoder the prefiller's first sampled token instead of re-prefilling the entire prompt ([#50559](https://github.com/vllm-project/vllm/pull/50559)).

### 5. Stability & Regressions

- **V1 engine core deadlock** under concurrent load with fp8 + prefix caching + Qwen3.5 — open, 35 comments ([#37729](https://github.com/vllm-project/vllm/issues/37729)).
- **Kimi-K3 long-context degeneration**: a ~240K-token prefill produces NaN logits; every subsequent request collapses to a repeated token (packed KDA prefill suspected) ([#51039](https://github.com/vllm-project/vllm/issues/51039)).
- **MiniMax-M3 on non-CUDA platforms**: `MiniMAXGemmaRMSNorm` unconditionally calls FlashInfer CUDA kernels, breaking CPU/XPU entirely ([#51200](https://github.com/vllm-project/vllm/issues/51200)).
- **Marlin W4A8-FP8 silent corruption on GB10/sm_121a**: `VLLM_MARLIN_INPUT_DTYPE=fp8` produces repeated `</think>` loops at temp 0 while running ~2.5% faster — silent correctness failure ([#49546](https://github.com/vllm-project/vllm/issues/49546)).
- **Qwen3.6-35B-A3B-FP8**: `400 Unterminated string starting at` on vLLM 0.23/0.24 ([#47761](https://github.com/vllm-project/vllm/issues/47761)).
- **hybrid-SWA prefix caching collapses to zero** reuse at ~25% pool occupancy (Gemma-4-31B, multi-session round-robin) ([#48435](https://github.com/vllm-project/vllm/issues/48435)).
- **Fix PRs in flight**: lfm2 tool parser dropping/corrupting recoverable tool calls ([#48171](https://github.com/vllm-project/vllm/pull/48171)); MCP `CallToolResult` semantics (structuredContent, `isError`) preserved ([#51610](https://github.com/vllm-project/vllm/pull/51610)); EngineCore no longer killed by signals during graceful shutdown ([#50529](https://github.com/vllm-project/vllm/pull/50529)); logits-processor test helper no longer wipes other entry-point groups ([#51097](https://github.com/vllm-project/vllm/pull/51097)).

### 6. What This Means for Application Developers

- **DeepSeek-V4-Flash-0731**: Ampere (A100/A800) is still unsupported; on Blackwell SM120 you may hit the sparse MLA routing bug; plan for ~8× larger KV cache than the preview model.
- **Kimi-K3**: avoid long-context requests near ~240K tokens until the NaN/degeneration issue is fixed; FP8 KV cache on ROCm is fixed only in the pending AITER PR.
- **Speculative decoding**: validate DSD schedules at production concurrency, not just single-stream — batch-threshold collapse can dominate any cuDAG savings.
- **Agent/tool-calling stacks**: two meaningful fixes are coming — MCP tool result fidelity and lfm2 parser robustness — worth tracking if you rely on MCP or Pythonic tool-calling models.
- **NVFP4 users**: don't benchmark or serve MiniMax-M3-NVFP4 against a stable release until the correctness fix is shipped; the B200 numbers above are from main.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## Today’s Highlights

Activity in the last 24h is dominated by bug-fix enablement rather than a release: open PRs now address the Z-Image BCG single-GPU crash/hang ([#34210](https://github.com/sgl-project/sglang/pull/34210)), the W4AFP8 + DeepEP first-inference TypeError ([#33669](https://github.com/sgl-project/sglang/pull/33669)), and the LoRA registry leak on abort ([#34215](https://github.com/sgl-project/sglang/pull/34215)). The most-discussed roadmap item remains the high-priority HiCache consistency plan for disaggregated prefill ([#22607](https://github.com/sgl-project/sglang/issues/22607)). 37 issues and 308 PRs were updated; no new release was tagged.

## Releases & Breaking Changes

None in the last 24 hours. No version tags, API/config changes, or migration notes were reported.

## New Model & Hardware Support

- **Kimi-K3 on Ascend NPU**: open PR adds NPU-specific dispatch and Ascend Triton kernels on top of the GPU integration ([#33465](https://github.com/sgl-project/sglang/pull/33465)).
- **Kimi-K3 DCP on AMD**: open PR adds DCP support for Kimi-K3 ([#32796](https://github.com/sgl-project/sglang/pull/32796)).
- **DeepSeek V4 on Intel XPU**: PR adds `silu_and_mul_clamp` support to the Triton fused MoE kernel for XPU ([#33808](https://github.com/sgl-project/sglang/pull/33808)).
- **NPU streaming sessions**: open PR adds streaming session support on NPU ([#32597](https://github.com/sgl-project/sglang/pull/32597)).
- **Realtime ASR**: open PR adds encoder-aligned windowing for long audio items under `/v1/realtime` ([#32682](https://github.com/sgl-project/sglang/pull/32682)).
- **Wide EP for GLM-5.2/Kimi-K3 on GB200/B200**: still problematic; see deployment tracking issue ([#34120](https://github.com/sgl-project/sglang/issues/34120)).
- **Qwen3.6-35B-A3B-w8a8 on Ascend 910B**: multi-node serving currently fails with unsupported ModelSlim MoE schemes ([#34211](https://github.com/sgl-project/sglang/issues/34211)).

## Performance & Optimization

- **HiCache consistency for PP disaggregated prefill**: high-priority plan to avoid recomputing long shared prefixes in agentic/long-context workloads ([#22607](https://github.com/sgl-project/sglang/issues/22607)).
- **DeepSeek V4 perf tracking**: dedicated issue tracks perf work on NVIDIA SM90/SM100/SM103 ([#33636](https://github.com/sgl-project/sglang/issues/33636)).
- **Unified Hybrid Radix Cache refactor**: roadmap item to consolidate divergent radix cache implementations ([#20415](https://github.com/sgl-project/sglang/issues/20415)).
- **Ngram speculative decoding**: roadmap item for extending trie-based speculative decoding support ([#21052](https://github.com/sgl-project/sglang/issues/21052)).
- **DCP MHA LSE merge**: avoids a second full FP32 `[tokens, heads, value_dim]` allocation for Kimi-K3 TP8/DCP ([#34213](https://github.com/sgl-project/sglang/pull/34213)).
- **ROCm DCP**: skips unused QuickAllReduce allocation for DCP groups ([#34212](https://github.com/sgl-project/sglang/pull/34212)).
- **CUDA VMM helpers**: consolidated allocation/mapping/teardown lifecycle for CUDA VMM consumers ([#34199](https://github.com/sgl-project/sglang/pull/34199)).
- **Encoder-DP multimodal preprocessing**: proposed to avoid running ViT preprocessing on every TP rank for Kimi-K3 ([#34206](https://github.com/sgl-project/sglang/pull/34206)).
- **KV cache observability**: requested Prometheus metrics for KV cache utilization remains open ([#5979](https://github.com/sgl-project/sglang/issues/5979)).
- **Model Gateway routing**: proposed opt-in bounded-load routing-key affinity to avoid hot workers under `consistent_hashing` ([#33625](https://github.com/sgl-project/sglang/issues/33625)).

## Stability & Regressions

**High severity**

- **All schedulers hang in `cuModuleLoadData` on first EAGLE verify** — reproduced with DSA attention + PD-disaggregated decode; no fix PR yet ([#33642](https://github.com/sgl-project/sglang/issues/33642)).
- **1M-token prefill OOM-kills the engine** in DeepSeek-V4 `fp8_mqa_logits` under `--tp 8` + MegaMoE, while dp-attention serves the same request; no fix PR yet ([#34155](https://github.com/sgl-project/sglang/issues/34155)).
- **Z-Image BCG single-GPU illegal memory access/hang** at first replay after warmup capture; fix PR pins cache values consumed under BCG capture ([#34183](https://github.com/sgl-project/sglang/issues/34183), [#34210](https://github.com/sgl-project/sglang/pull/34210)).
- **W4AFP8 + DeepEP first-inference crash** caused by missing `routed_scaling_factor` and dtype issues; fix PR corrects scaling and mode-specific dtypes ([#33660](https://github.com/sgl-project/sglang/issues/33660), [#33669](https://github.com/sgl-project/sglang/pull/33669)).
- **Scheduler event loop blocks on Mamba eviction** under large-context requests, causing server hang; no fix PR yet ([#30314](https://github.com/sgl-project/sglang/issues/30314)).

**Medium severity**

- **Aborted LoRA requests retain a `LoRARegistry` reference**, pinning adapters and blocking dynamic unload; fix PR releases the reference on abort ([#34205](https://github.com/sgl-project/sglang/issues/34205), [#34215](https://github.com/sgl-project/sglang/pull/34215)).
- **Streaming responses truncate content** when both `content` and `tool_calls` are present; no fix PR yet ([#34214](https://github.com/sgl-project/sglang/issues/34214)).
- **GLM-5.2 MoE operator bug**: hard-to-reproduce, still open ([#29160](https://github.com/sgl-project/sglang/issues/29160)).
- **MiniMax-H3 argument error** at startup; no fix PR yet ([#33466](https://github.com/sgl-project/sglang/issues/33466)).
- **CuTe DSL 2-CTA GEMM kernel**: missing trailing cluster barrier can cause cross-CTA races; fix PR open ([#32954](https://github.com/sgl-project/sglang/pull/32954)).
- **AMD ROCm fp8 clamp bound**: `_per_token_group_quant_8bit_raw` hardcodes 224.0, but gfx95x requires 448.0; fix PR open ([#30900](https://github.com/sgl-project/sglang/pull/30900)).
- **MLX event loop contract**: RFC proposes codifying per-step scheduler contract after four July bugs ([#32833](https://github.com/sgl-project/sglang/issues/32833)).

**Closed / inactive**

- **MiniMax-H3 Ref2VA snow/noise on L40S** closed as inactive ([#34110](https://github.com/sgl-project/sglang/issues/34110)).
- **CI health**: tracking issue reports 3 broken, 11 flaky, 671 recently fixed as of 2026-08-10 ([#17050](https://github.com/sgl-project/sglang/issues/17050)).

## What This Means for Application Developers

- No new release exists yet; if you hit Z-Image BCG failures or W4AFP8 + DeepEP crashes, test the open fixes in [#34210](https://github.com/sgl-project/sglang/pull/34210) and [#33669](https://github.com/sgl-project/sglang/pull/33669).
- If you use dynamic LoRA loading and abort requests, [#34215](https://github.com/sgl-project/sglang/pull/34215) prevents aborted adapters from remaining pinned and blocking unload/eviction.
- For DeepSeek-V4 long-prefill under `--tp 8` + MegaMoE, prefer dp-attention until the OOM in [#34155](https://github.com/sgl-project/sglang/issues/34155) is fixed.
- Avoid combining EAGLE speculative decoding with DSA attention + PD-disaggregated decode until the scheduler hang in [#33642](https://github.com/sgl-project/sglang/issues/33642) is resolved.
- If your app relies on streaming responses that include both text and tool calls, the truncation bug in [#34214](https://github.com/sgl-project/sglang/issues/34214) is a correctness risk; verify output or use non-streaming until fixed.
- Kimi-K3, DeepSeek V4 on XPU, and NPU streaming support are close but still in-flight; expect these to land via the open PRs above rather than a stable release today.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-10

## Today's Highlights

Two point releases shipped: **b10333** fixes a missing Q5_0 dispatch in the SpaceMiT backend, and **b10332** removes an obsolete ROCm/HIP CI flag. The issue tracker remains dominated by ROCm/HIP correctness and performance reports on Strix Halo-class hardware, while the PR queue shows active work on expert caching, RPC load-time parallelization, and new backend support.

## Releases & Breaking Changes

- [b10333](https://github.com/ggml-org/llama.cpp/releases/tag/b10333) — `ggml-cpu : fix missing Q5_0 dispatch in SpaceMiT backend (#26792)`
- [b10332](https://github.com/ggml-org/llama.cpp/releases/tag/b10332) — `ci: rm GGML_HIP_ROCWMMA_FATTN (#26760)`
- macOS Apple Silicon binaries were refreshed in both releases. No API or config migration notes were included.

## New Model & Hardware Support

- **MetaX backend integration** ([PR #22212](https://github.com/ggml-org/llama.cpp/pull/22212)) — adds `GGML_METAX` build support, backend registration, and device enumeration via MACA/cu-bridge.
- **Alternative Hexagon NPU backend** ([PR #26373](https://github.com/ggml-org/llama.cpp/pull/26373)) — proposed `ggml-hexagon-jz` implementation that can coexist with the existing official Hexagon backend.
- **STQ1_0 ternary quantization** ([PR #22836](https://github.com/ggml-org/llama.cpp/pull/22836)) — new sparse ternary quantization format with ARM NEON `vec_dot` kernel, targeting Sherry 1.25-bit quantization.
- **Nemotron Nano MTP support** ([PR #26725](https://github.com/ggml-org/llama.cpp/pull/26725)) — adds multi-token prediction support; depends on speculative decode infrastructure from [PR #26623](https://github.com/ggml-org/llama.cpp/pull/26623).
- **BitNet activation fix** ([PR #26751](https://github.com/ggml-org/llama.cpp/pull/26751)) — honors `relu2` hidden activation from GGUF, fixing incorrect logits in bitnet-b1.58 models.

## Performance & Optimization

- **Expert caching** ([PR #26824](https://github.com/ggml-org/llama.cpp/pull/26824)) — successor to the earlier expert-caching attempt ([PR #26563](https://github.com/ggml-org/llama.cpp/pull/26563)). Adds heatmap-based mmap pinning and real-time CPU⇄device expert transfer, fully opt-in via flags.
- **RPC cached-tensor hashing parallelization** ([PR #26291](https://github.com/ggml-org/llama.cpp/pull/26291)) — parallelizes FNV hashing during RPC model load, reporting **20–60% lower load times** on cache hits via `GGML_RPC_LOAD_THREADS`.
- **SYCL dense-FFN kernel fusion** ([PR #26779](https://github.com/ggml-org/llama.cpp/pull/26779)) — fuses `mul_mat(gate)` + `mul_mat(up)` + GLU for q4_K dense FFNs; measured on Arc Pro B70 with `llama-bench -r 20`.

## Stability & Regressions

- **GET_ROWS out-of-bounds read in RPC backend** ([Issue #26825](https://github.com/ggml-org/llama.cpp/issues/26825)) — potential memory safety issue in release builds; highest severity item reported today.
- **Blackwell CUDA SOFT_MAX crash** ([Issue #25060](https://github.com/ggml-org/llama.cpp/issues/25060)) — crash on RTX 5090 / SM 12.0 under large models; reporter included a proposed patch.
- **Vulkan flash attention stale K/V leakage** ([Issue #26744](https://github.com/ggml-org/llama.cpp/issues/26744)) — freed KV cells can influence outputs. Correctness bug in the Vulkan path.
- **DeepSeek V4 garbled output on ROCm Strix Halo** ([Issue #25436](https://github.com/ggml-org/llama.cpp/issues/25436)) — still open with 26 comments.
- **DeepSeek V4 garbled output over RPC + Vulkan** ([Issue #26685](https://github.com/ggml-org/llama.cpp/issues/26685)) — similar symptom in a CUDA-host + Strix Halo RPC node setup.
- **MTP state leakage / repeated tokens after long sessions** ([Issue #23577](https://github.com/ggml-org/llama.cpp/issues/23577)) — Qwen3.6 27B MTP outputs repeated `////` after long sessions.
- **MTP inter-request state retention** ([Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425)) — MTP retains state across requests, causing non-deterministic output and model degradation.
- **GLM-5.2 regression on ROCm/HIP after Indexer PR** ([Issue #26445](https://github.com/ggml-org/llama.cpp/issues/26445)) — prefill ~6x slower, load time ~40x longer on MI300X.
- **DFlash regression on AMD APU + quantized MoE** ([Issue #25117](https://github.com/ggml-org/llama.cpp/issues/25117)) — ~2x slower than non-speculative baseline.
- **CPU input-layer bottleneck on Strix Halo** ([Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700)) — 30% CPU usage / decreased GPU utilization with Qwen 3.6 35B MoE on ROCm.
- **`tool_choice: "required"` grammar failure for XML-style tool-call models** ([Issue #26737](https://github.com/ggml-org/llama.cpp/issues/26737)) — affects Nemotron-3 style server-side tool calling.
- **Base64 `image_url` returns 500 in `/v1/chat/completions`** ([Issue #26770](https://github.com/ggml-org/llama.cpp/issues/26770)) — multimodal requests fail with JSON parse error; related cleanup in [PR #26670](https://github.com/ggml-org/llama.cpp/pull/26670) replaces the local base64 decoder.

## What This Means for Application Developers

- **Be cautious with MTP-enabled deployments**: multiple open issues point to cross-request state leakage and long-session output corruption ([#26425](https://github.com/ggml-org/llama.cpp/issues/26425), [#23577](https://github.com/ggml-org/llama.cpp/issues/23577)). Pin versions or disable MTP for latency-sensitive production serving until fixed.
- **Multimodal API input**: base64 `image_url` payloads are currently broken; use hosted URLs or wait for the base64 decoder fix ([#26770](https://github.com/ggml-org/llama.cpp/issues/26770), [#26670](https://github.com/ggml-org/llama.cpp/pull/26670)).
- **Tool calling still has rough edges**: XML-style tool-call models with `tool_choice: "required"` can hit grammar stack errors ([#26737](https://github.com/ggml-org/llama.cpp/issues/26737)).
- **Anthropic-compatible route ignores `id_slot`**: a fix is in review ([PR #26758](https://github.com/ggml-org/llama.cpp/pull/26758)); useful if you rely on slot pinning for concurrent agent workloads.
- **Memory observability is improving**: [PR #26722](https://github.com/ggml-org/llama.cpp/pull/26722) exposes memory breakdown through the C API, and [Issue #26129](https://github.com/ggml-org/llama.cpp/issues/26129) requests per-device usage over the server API.
- **ROCm/RPC deployments remain the highest-risk area**: Strix Halo + quantized MoE + speculative decoding continues to produce correctness and performance regressions; validate any image before rolling out.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-10

## Today's Highlights

- The MLX backend is the most active area: image input support landed for MLX vision checkpoints (#17600), and the MLX library version tagging issue was corrected (#17637).
- Tool-calling reliability is the dominant user pain point: reports describe Ollama rejecting its own model-generated tool calls (#17638), HF-sourced GGUFs not getting built-in tool-call renderer/parser support (#17636), and OpenAI-compatible messages with empty `content` causing model template misbehavior (#14181).
- A critical MLX correctness bug was reported: long-lived runners (`OLLAMA_KEEP_ALIVE=-1`) can return a verbatim answer to an earlier prompt on later requests (#17599).

## Releases & Breaking Changes

- None in the last 24 hours. No new release, API/config changes, or migration notes.

## New Model & Hardware Support

- **MLX image input support (`mlxrunner`)**: MLX vision checkpoints now receive image data; the implementation preserves prefix caching and speculative decoding.  
  https://github.com/ollama/ollama/pull/17600
- **MLX version bump**: The MLX library now reports the correct git-hash version rather than an official tag with different content.  
  https://github.com/ollama/ollama/pull/17637
- **Open feature requests**: Multi-file GGUF import (#5245), `dspark` acceleration (#17016), and Kimi K3 Cloud availability (#17235) remain open/closed requests; no new model family shipped in this window.

## Performance & Optimization

- **Windows/CUDA warm TTFT regression report**: #17631 documents a flat per-request warm TTFT increase after 0.24.0 → 0.32.6: +156 ms for Gemma E4B, +44 ms for qwen3. Prompt cache is unaffected and generation throughput improved, suggesting per-request overhead rather than prompt reprocessing.  
  https://github.com/ollama/ollama/issues/17631
- **Cloud prompt cache support requested**: #16714 asks for provider cache support on Ollama Cloud for agentic workloads.  
  https://github.com/ollama/ollama/issues/16714
- **`dspark` option requested**: #17016 asks for a flag or automatic integration for dspark-based inference speedups.  
  https://github.com/ollama/ollama/issues/17016
- **GPU temperature monitoring requested**: #12782 requests temperature visibility during long generation/streaming sessions.  
  https://github.com/ollama/ollama/issues/12782

## Stability & Regressions

Ranked by severity:

- **Critical — cross-request response contamination on MLX**: With `OLLAMA_KEEP_ALIVE=-1`, a long-lived MLX runner intermittently returns a verbatim answer to an earlier prompt. No fix PR is open yet.  
  https://github.com/ollama/ollama/issues/17599
- **High — `gpt-oss` tool calls rejected by Ollama**: HTTP 500 `error parsing tool call` occurs even when Ollama itself generated the tool call.  
  https://github.com/ollama/ollama/issues/17638
- **High — HF GGUF pulls do not install built-in tool-calling renderer/parser**: `ollama pull hf.co/...` detects the architecture but does not attach the native `RENDERER`/`PARSER`, causing unreliable tool calling.  
  https://github.com/ollama/ollama/issues/17636
- **Medium — empty `content` with `tool_calls` breaks template rendering**: Assistant messages with `content: ""` plus `tool_calls` via `/v1/chat/completions` can cause `qwen3-coder` to switch to text-based markup mode.  
  https://github.com/ollama/ollama/issues/14181
- **Medium — Windows/CUDA warm TTFT regression**: See #17631.  
  https://github.com/ollama/ollama/issues/17631
- **Medium — CLI image path handling**: Dragged image paths with escaped characters, `~/`, or apostrophes fail to load. Fix PRs are open:  
  https://github.com/ollama/ollama/pull/17640  
  https://github.com/ollama/ollama/pull/17634  
  Original issue: https://github.com/ollama/ollama/issues/10333
- **Cloud quota/billing inconsistencies**: A paid subscriber reports a silent ~70% quota reduction (#17435, closed), and direct cloud endpoint billing is inconsistent with signed-in localhost usage (#17639).  
  https://github.com/ollama/ollama/issues/17435  
  https://github.com/ollama/ollama/issues/17639
- **Low — web UI chat loading**: Heavy conversations are now loaded in one pass instead of scroll-paginated, causing severe lag.  
  https://github.com/ollama/ollama/issues/17635
- **Resolved**: `unknown model architecture: 'mllama'` loading error was closed.  
  https://github.com/ollama/ollama/issues/16547

## What This Means for Application Developers

- **Avoid `keep_alive=-1` on MLX runners until #17599 is fixed**. Cross-request response contamination is a silent correctness risk; prefer short-lived runners or restart between requests.
- **Add client-side tool-call validation/retry**. Tool-call parsing is still unreliable across `gpt-oss`, HF-sourced GGUFs, and empty-content OpenAI-compatible messages. Pin known-good model/backend combinations and normalize tool-facing responses.
- **Namespace-tool filtering is a stopgap, not full Responses API parity**. PR #17630 filters namespace-type tools before they reach `llama-server`, which avoids backend errors but does not implement the namespace field from the Responses API (#15921).
- **Measure TTFT on Windows/CUDA upgrades**. 0.32.6 may add a flat per-request latency cost even though generation throughput improved (#17631).
- **Cloud API users should track quota/endpoint semantics**. Direct `ollama.com/v1` calls may not apply Pro plan usage correctly (#17639), and usage stats are not yet exposed via `/api/me` (#12532).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-10

## Today's Highlights
No new releases shipped in the last 24 hours, but the PR queue is dominated by cost-accounting and streaming-fidelity fixes: unknown-model pricing now degrades gracefully instead of raising ([#36379](https://github.com/BerriAI/litellm/pull/36379)), Anthropic-format responses will surface reasoning tokens for non-Anthropic backends ([#36378](https://github.com/BerriAI/litellm/pull/36378)), and streaming Responses output is being preserved for Langfuse ([#36362](https://github.com/BerriAI/litellm/pull/36362)). On the regression front, streaming usage undercounting in chained proxy topologies ([#36114](https://github.com/BerriAI/litellm/issues/36114)) and broken usage stats on 1.97.0-RC1 ([#36337](https://github.com/BerriAI/litellm/issues/36337)) need attention before upgrade.

## Releases & Breaking Changes
No new releases in the last 24 hours. Watch items:
- **1.97.0-RC1 regression**: usage statistics stop incrementing in the UI; successful/failed counters show 0 after upgrade from 1.95.0 ([#36337](https://github.com/BerriAI/litellm/issues/36337)).
- **FastAPI compatibility break**: proxy fails to start with `ImportError: cannot import name 'get_flat_dependant'` on `fastapi>=0.141.0`; issue is closed, so a fix is available ([#35763](https://github.com/BerriAI/litellm/issues/35763)).
- **Rust-backed pip binary**: the central tracker for install issues with the upcoming Rust extension in `pip install litellm` remains active ([#31261](https://github.com/BerriAI/litellm/issues/31261)).

## New Model & Hardware Support
No new hardware, quantization, or backend support landed; the activity is model-map corrections:
- **AI21 retirement**: J2 models are gone; only `jamba-large-1.7` and `jamba-mini-2` remain, and the LiteLLM model list needs pruning ([#27094](https://github.com/BerriAI/litellm/issues/27094)).
- **Z.AI glm-5.2[1m]**: the documented 1M-context variant returns `Unknown Model` while plain `glm-5.2` works ([#32218](https://github.com/BerriAI/litellm/issues/32218)).
- **Amazon Nova 2 Lite pricing**: nonexistent `apac.amazon.nova-2-lite-v1:0` geo id corrected to `jp` ([#33776](https://github.com/BerriAI/litellm/pull/33776)).
- **Bedrock Mantle GPT-5.4/5.5/5.6**: `web_search` tool was being silently dropped on `/v1/responses`; fix in progress ([#35987](https://github.com/BerriAI/litellm/pull/35987)).

## Performance & Optimization
- **Rate-limiter Redis write elimination** ([#31880](https://github.com/BerriAI/litellm/issues/31880)): the limiter currently writes counters to Redis after every LLM call even for API keys/users/teams with no rate limits; skipping those writes removes wasted Redis round-trips at high throughput.
- **SSE keepalives for slow TTFT** ([#34825](https://github.com/BerriAI/litellm/pull/34825)): new `SSE_KEEPALIVE_INTERVAL_SECONDS` setting (off by default) prevents ALB/nginx 60s idle timeouts from killing healthy streams before the first token.
- **least_busy counter race fix** ([#34444](https://github.com/BerriAI/litellm/pull/34444)): clamps the per-deployment request counter at zero to prevent negative counts under concurrent load.
- **Pre-adoption shadow eval for the auto-router** ([#36250](https://github.com/BerriAI/litellm/pull/36250)): duplicates a sampled slice of live traffic through the router with a blind pairwise judge, giving per-tier win rates before production cutover — useful for de-risking router enablement.

## Stability & Regressions
Ranked by severity:
1. **Streaming usage severely undercounted** ([#36114](https://github.com/BerriAI/litellm/issues/36114), open): provider-independent undercounting in chained proxy setups (Front-Proxy → Upstream-Proxy → Bedrock); non-streaming usage is correct, root cause is in the stream aggregation layer.
2. **Streaming upstream reset falsified as success** ([#33404](https://github.com/BerriAI/litellm/issues/33404), closed): resets are converted to synthetic `finish_reason: stop` / `[DONE]`, masking failures as completions.
3. **gpt-5.6 family tool calls fail** ([#33221](https://github.com/BerriAI/litellm/issues/33221), open): function tools on gpt-5.6-sol/luna/terra error out on `reasoning_effort` via `/chat/completions`.
4. **Anthropic bridge crash on empty `choices` chunks** ([#30761](https://github.com/BerriAI/litellm/issues/30761), closed): streaming `/v1/messages` over OpenAI/Azure backends crashed mid-flight; same root cause seen on Vertex Gemini web search ([#27928](https://github.com/BerriAI/litellm/issues/27928), closed).
5. **`previous_response_id` double-encoded** in Responses API + hosted MCP tools ([#32031](https://github.com/BerriAI/litellm/issues/32031), closed): broke multi-turn flows; upstream rejected the id as "string too long".
6. **`unpack_defs` hang on recursive tool schemas** ([#34328](https://github.com/BerriAI/litellm/issues/34328), open): unbounded expansion of high-fan-in recursive `$defs`/`$ref` on Bedrock/Vertex — an incomplete fix for #19098.
7. **`cost_per_token()` raises on unknown models** ([#27581](https://github.com/BerriAI/litellm/issues/27581), open; fix PR [#36379](https://github.com/BerriAI/litellm/pull/36379)): should return `(0.0, 0.0)` rather than crashing.
8. **Proxy-level hooks bypassed on `/v1/messages`** ([#27518](https://github.com/BerriAI/litellm/issues/27518), open): `async_pre_call_hook` custom callbacks don't fire on the Anthropic-compatible endpoint.
9. **WebSearch interception ignores custom `api_base`/`api_key`** ([#26389](https://github.com/BerriAI/litellm/issues/26389), open): causes 401s and a deployment cooldown cascade.
10. **Redis `ssl=False` forced SSLConnection** ([#16587](https://github.com/BerriAI/litellm/issues/16587), closed): presence-based check broke non-TLS Memorystore Redis.

## What This Means for Application Developers
- **Verify streaming billing before relying on it**: usage undercounting on chained proxies ([#36114](https://github.com/BerriAI/litellm/issues/36114)) and synthetic `finish_reason: stop` on resets ([#33404](https://github.com/BerriAI/litellm/issues/33404)) can distort both cost and success metrics. Pin a known-good version and monitor streaming usage deltas in production.
- **Test tool calling on new model families**: gpt-5.6 ([#33221](https://github.com/BerriAI/litellm/issues/33221)) and gpt-oss on Ollama ([#13823](https://github.com/BerriAI/litellm/issues/13823)) both misbehave with tools today; don't cut over agent traffic without regression tests.
- **Streaming is getting safer and more observable**: SSE keepalives ([#34825](https://github.com/BerriAI/litellm/pull/34825)) address infrastructure idle timeouts on slow first tokens, and reasoning tokens will finally surface on `/v1/messages` for non-Anthropic backends ([#36378](https://github.com/BerriAI/litellm/pull/36378)). Streaming Responses output will also stop disappearing from Langfuse traces ([#36362](https://github.com/BerriAI/litellm/pull/36362)).
- **Cost accounting is being hardened**: graceful unknown-model pricing ([#36379](https://github.com/BerriAI/litellm/pull/36379)), cache-cost itemization for the Responses API ([#34459](https://github.com/BerriAI/litellm/pull/34459)), XAI web-search billing from `server_side_tool_usage_details` ([#30817](https://github.com/BerriAI/litellm/pull/30817)), and cost-map drift guards ([#34527](https://github.com/BerriAI/litellm/pull/34527)) should reduce billing surprises in the next stable.
- **Budget enforcement no longer blocks model discovery**: exhausted budgets returning 429 for `GET /v1/models` was fixed ([#27923](https://github.com/BerriAI/litellm/issues/27923)); free models remain reachable for debugging. Also upcoming: deployment-advertised `max_model_len` surfaced on `GET /v1/models` ([#35922](https://github.com/BerriAI/litellm/pull/35922)), which helps clients pre-truncate prompts.
- **High-throughput deployments**: the Redis rate-limiter fix ([#31880](https://github.com/BerriAI/litellm/issues/31880)) removes a per-request write amplification that never affects enforcement — worth tracking for Redis load reduction.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-10

## Today's Highlights

Unsloth shipped **v0.1.527-beta**, which includes a Studio fix for snapshot-consistent cached-pipeline signals and bumps install-script pins to `unsloth>=2026.8.3`. The most significant in-flight work is **MiniMax-H3 INT8 denoiser support** ([#8293](https://github.com/unslothai/unsloth/pull/8293)) and **Apple Silicon video generation** ([#8198](https://github.com/unslothai/unsloth/pull/8198)). The dominant theme in today's issue tracker is memory-planning correctness on ROCm and multi-GPU hosts, including one 66 GiB single-allocation failure on a 16 GB card.

---

## Releases & Breaking Changes

- **v0.1.527-beta** — [Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.527-beta)  
  Changes:
  - Studio now judges cached-pipeline signals on the snapshot the row actually loads ([#7851](https://github.com/unslothai/unsloth/pull/7851)).
  - `install.sh` / `install.ps1` pins bumped to `unsloth>=2026.8.3` ([#7860](https://github.com/unslothai/unsloth/pull/7860)).
  - No explicit migration notes or breaking API changes in the release excerpt.

---

## New Model & Hardware Support

- **MiniMax-H3 INT8 denoiser from ConvRot checkpoint** ([#8293](https://github.com/unslothai/unsloth/pull/8293))  
  Loads weights from a block-Hadamard rotated basis and rotates activations to match. The INT8 path quantizes both sides of every GEMM.

- **Apple Silicon video generation** ([#8198](https://github.com/unslothai/unsloth/pull/8198))  
  Removes the "Video generation on macOS is coming soon" gate and runs through the same diffusers pipelines as CUDA.

- **MiniMax-H3 joint video and audio LoRA training** ([#8244](https://github.com/unslothai/unsloth/pull/8244))  
  Adds MiniMax-H3 as Studio's second trainable video family and its first trained from clips with sound.

- **Z-Image undistilled base for LoRA training** ([#8291](https://github.com/unslothai/unsloth/pull/8291), closes [#8270](https://github.com/unslothai/unsloth/issues/8270))  
  Offers `Tongyi-MAI/Z-Image` in addition to the distilled Turbo checkpoint.

- **FLUX.2 Klein LoRA training quality fix** ([#8267](https://github.com/unslothai/unsloth/pull/8267))  
  Trains on the original checkpoint and includes single-stream attention output projections, fixing generic-puppy outputs on the built-in dog dataset.

---

## Performance & Optimization

- **MiniMax-H3 INT8 GEMM behavior** ([#8293](https://github.com/unslothai/unsloth/pull/8293))  
  Both sides of each GEMM are quantized, so error is dominated by the side with the heaviest outliers.

- **ROCm gfx1200 SDPA math-kernel fallback** ([#8225](https://github.com/unslothai/unsloth/issues/8225))  
  A 3.4 GB video model requested a single 66.54 GiB allocation on a 16 GB card because neither flash nor memory-efficient SDPA is available for the target. Kernel support is needed.

- **Multi-GPU diffusion budgets ignore second card** ([#8235](https://github.com/unslothai/unsloth/issues/8235))  
  On a dual 24 GB host, Studio put nearly all diffusion model weights in system RAM: ~70 GiB RAM used vs ~1 GiB VRAM. Budgeting must be per-host, not per-GPU.

- **Windows ROCm image-gen RAM exhaustion** ([#8188](https://github.com/unslothai/unsloth/issues/8188))  
  Under-budgeted memory plans do not fail; WDDM backs allocations into system RAM, taking the machine to <1.2 GB available RAM and >50 GB pagefile. Linux correctly raises `torch.OutOfMemoryError`.

- **Inference subprocess VRAM retention after model switch** ([#8220](https://github.com/unslothai/unsloth/issues/8220))  
  Switching from a transformers chat model to a GGUF model leaves the old subprocess holding VRAM. The GGUF context fitter cannot see that VRAM and overcommits the GPU.

- **User-configurable GPU memory ceiling** ([#8178](https://github.com/unslothai/unsloth/issues/8178))  
  Request to expose a Studio settings control for GPU memory cap, rather than the invisible ROCm-only `UNSLOTH_ROCM_MEM_FRACTION`.

---

## Stability & Regressions

Ranked by severity; fix PRs noted where available.

- **Critical — Wan2.2-TI2V-5B requests 71 GB on 16 GB ROCm card** ([#8225](https://github.com/unslothai/unsloth/issues/8225))  
  Attention falls back to the math kernel and materializes the full N×N score matrix. No fix PR yet.

- **Critical — Windows ROCm image generation can make the host unusable** ([#8188](https://github.com/unslothai/unsloth/issues/8188), closed)  
  Host RAM is silently exhausted instead of the allocation failing.

- **High — Diffusion offloads to RAM instead of using second GPU** ([#8235](https://github.com/unslothai/unsloth/issues/8235))  
  Multi-GPU hosts leave VRAM idle while consuming ~70 GiB of system RAM.

- **High — VRAM not released after model unload in Studio inference subprocess** ([#8220](https://github.com/unslothai/unsloth/issues/8220), closed)  
  Causes GGUF context-fit to budget against a falsely empty GPU.

- **High — Z-Image LoRA training uses wrong base checkpoint** ([#8270](https://github.com/unslothai/unsloth/issues/8270))  
  Studio offers only distilled `Z-Image-Turbo`, while upstream trains on `Tongyi-MAI/Z-Image`. Fix PR: [#8291](https://github.com/unslothai/unsloth/pull/8291).

- **Medium — `lr_warmup_steps` is a silent no-op with default constant scheduler** ([#8269](https://github.com/unslothai/unsloth/issues/8269))  
  Diffusers' constant scheduler ignores `num_warmup_steps`, so the advertised ramp never happens.

- **Medium — Qwen3-Coder-30B-A3B GGUF tool-calling unreliable under Ollama** ([#8266](https://github.com/unslothai/unsloth/issues/8266))  
  Fails to emit correct `<tool_call>` blocks. Root cause identified; fix filed against Ollama upstream.

- **Medium — Diffusion GGUF picker hides base companion download size** ([#8234](https://github.com/unslothai/unsloth/issues/8234))  
  Shown size excludes text-encoder/VAE assets. Fix PR: [#8289](https://github.com/unslothai/unsloth/pull/8289).

- **Medium — NVFP4 fails to load on RTX 5060 Ti 16 GB** ([#8246](https://github.com/unslothai/unsloth/issues/8246))  
  No fix PR linked.

- **Medium — Cached datasets with undeclared splits show no split options** ([#8140](https://github.com/unslothai/unsloth/issues/8140), closed)  
  Loader-inferred splits work but are not exposed in the Studio UI.

- **Low — Image-model companion assets lifecycle unclear** ([#8116](https://github.com/unslothai/unsloth/issues/8116))  
  Files can be shared across quants, but reuse/deletion behavior is undocumented.

- **Infrastructure — CI main red on Python matrix** ([#8281](https://github.com/unslothai/unsloth/pull/8281), closed)  
  Two diffusers-import preflight tests only pass on GPU hosts. Fix merged.

- **Infrastructure — Backend CI cancellations** ([#8286](https://github.com/unslothai/unsloth/pull/8286), closed)  
  Jobs were cancelled because CI had no timeout independent of suite runtime, producing false red checks across PRs.

---

## What This Means for Application Developers

- **ROCm/Windows users should avoid image/video generation until memory planning is hardened.** Linux is safer because OOM is raised rather than silently swapping the host ([#8188](https://github.com/unslothai/unsloth/issues/8188)).
- **Multi-GPU hosts do not yet spread diffusion workloads across cards.** Expect system-RAM offload and VRAM idle until Studio budgets per-host ([#8235](https://github.com/unslothai/unsloth/issues/8235)).
- **If you use Qwen3-Coder GGUF through Ollama for tool calling, verify results carefully.** The root cause is in Ollama, and a fix is pending upstream ([#8266](https://github.com/unslothai/unsloth/issues/8266)).
- **Retrain LoRA adapters for FLUX.2 Klein and Z-Image once [#8267](https://github.com/unslothai/unsloth/pull/8267) and [#8291](https://github.com/unslothai/unsloth/pull/8291) land.** Current Studio paths can produce wrong or generic outputs.
- **When switching chat model formats in Studio, restart/evict the inference subprocess before loading a GGUF.** Otherwise VRAM accounting will be wrong and the GPU may overcommit ([#8220](https://github.com/unslothai/unsloth/issues/8220)).
- **If you proxy external OpenAI-compatible clients through Studio, token usage may appear missing** when stream usage is omitted. Use `stream_options.include_usage` or wait for the pending fix in [#8294](https://github.com/unslothai/unsloth/pull/8294).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*