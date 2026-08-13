# AI Infrastructure Digest 2026-08-13

> Generated: 2026-08-13 09:48 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-08-13

## 1. Ecosystem Overview

The AI infrastructure ecosystem is in a stabilization phase rather than a feature-release sprint. vLLM, SGLang, and LiteLLM all shipped no release in the last 24h, while llama.cpp and Ollama advanced with incremental builds and an RC. The dominant engineering themes are speculative decoding correctness, DeepSeek-V4/Kimi-K3 bring-up, AMD/Intel/ARM backend expansion, and production-hardening against regressions in multi-node, Blackwell, and agentic workloads. Multi-node serving remains fragile — particularly on GB10/Spark-class systems — and gateway-layer spend/cache accounting is surfacing as a critical operational risk. Overall, the market is shifting from “model support breadth” toward “reliability, observability, and cost accuracy” as deployment scale grows.

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status |
|---|---|---|---|
| vLLM | 101 touched | 468 touched | None; v0.27.0 current, patch likely |
| SGLang | n/r* | n/r* | None |
| llama.cpp | n/r* | n/r* | **b10405**, b10400, b10375 shipped |
| Ollama | n/r* | n/r* | **v0.32.10-rc1** shipped |
| LiteLLM | n/r* | n/r* | None |
| Unsloth | n/r* | n/r* | None |

*n/r = not explicitly reported in digest. SGLang CI reports 669 fixed / 3 broken / 11 flaky tests.

## 3. Model Support Race

| Project | New Models / Architectures | Hardware Enablement |
|---|---|---|
| **vLLM** | Muse Glimmer (29.6B VLM), Hunyuan A13B tool parser, Kimi-K3 on ROCm roadmap | Intel XPU wheels, ROCm FP8 GEMM, FlashInfer NVLink All2All |
| **SGLang** | DeepSeek-V4 perf tracking, Kimi-K3 Day-0 roadmap, Apple Silicon/MLX RFCs | ROCm 7.2.4 containers, XPU default-on, NPU diffusion/DiT pipelines |
| **llama.cpp** | Maple 20B-A1B ternary MoE draft, speculative-draft auto-detection | SYCL kernel enablement, quantized KV decode TILE, host-pinned memory |
| **Ollama** | Nemotron MLX vision, MLX KV connector framework, Intel SYCL backend | NVFP4 MLX prefill optimization, Windows-on-ARM install fixes |
| **LiteLLM** | Bedrock GPT-5.5 Mantle, Vertex Gemini 2.5 Flash, OCI dedicated serving | — |
| **Unsloth** | Diffusion family override for FLUX.2 derivatives, Ling 3.0 request | Windows on ARM (Snapdragon X2 Elite), ROCm detection corrections |

**Ahead:** vLLM and SGLang are clearly leading the frontier-model race, with DeepSeek-V4 and Kimi-K3 as the primary battlegrounds. llama.cpp and Ollama are advancing local/edge support, especially SYCL and MLX. LiteLLM is racing provider compatibility rather than model kernels. Unsloth is desktop/Studio-focused, catching up on platform support rather than new architectures.

## 4. Performance Frontier

Optimization work is concentrated in five areas:

- **Speculative decoding** — vLLM has multiple open investigations around dynamic schedules, MTP slowdowns, and async spec-decode blocking. Ollama is improving spec-decode throughput by disabling `repeat_penalty` by default. llama.cpp added draft-model auto-detection.
- **KV cache & prefix caching** — SGLang is working on decode-side radix cache for hybrid SWA models, agentic-aware T-LRU eviction, and paged-KV safety checks. llama.cpp is optimizing CPU FP16→FP32 V-cache conversion and SYCL quantized-KV decode. Ollama proposed a pluggable external KV cache backend.
- **Kernels & quantization** — vLLM landed ROCm FP8 GEMM (+4–8% QPS on DeepSeek-V3) and tensor-descriptor hoisting in attention. SGLang is fusing MoE softmax, top-k, and diffusion-model kernels. llama.cpp is fusing SYCL kernels and unary+MUL paths.
- **Distributed serving** — vLLM is refining DeepSeek blockwise FP8 MoE with sequence parallelism and NVLink All2All. SGLang is tracking context parallelism and DSpark multi-node issues. Both projects show that multi-node correctness remains a major bottleneck.
- **Spend/accounting efficiency** — LiteLLM is fixing Bedrock cache-token accounting and vLLM passthrough spend tracking, which are cost-accuracy issues rather than model-performance issues.

## 5. Layer Positioning

| Layer | Projects | Role |
|---|---|---|
| **Serving engines** | vLLM, SGLang | High-throughput, multi-node inference; deep kernel and scheduling control; primary targets for frontier models |
| **Local / edge runtimes** | llama.cpp, Ollama | On-device and small-scale serving; broad hardware support (CPU, Vulkan, SYCL, Metal, ROCm, MLX); pragmatic UX |
| **Gateway / proxy** | LiteLLM | Model-agnostic routing, spend tracking, rate limiting, provider abstraction; critical for multi-vendor APIs |
| **Fine-tuning / desktop** | Unsloth | Studio-driven fine-tuning, GGUF export, hardware detection, and desktop deployment; adjacent to inference via llama.cpp backend |

The boundaries are blurring: vLLM and SGLang both serve OpenAI-compatible APIs; Ollama embeds llama.cpp; Unsloth sits on top of llama.cpp; LiteLLM routes to all of them. The key difference is **control vs. convenience**: vLLM/SGLang offer the most control, while llama.cpp/Ollama/Unsloth optimize for ease of local deployment.

## 6. Trend Signals

- **Reliability is the new differentiator.** vLLM has critical idle-stall and livelock bugs; SGLang has multi-node deadlocks and NVFP4 NaN regressions; llama.cpp has Blackwell and AMD token-corruption issues. Expect more conservative “pin known-good versions” guidance.
- **Multi-node on GB10/DGX Spark is not production-ready.** vLLM’s health-check-passing idle stall and SGLang’s DSpark TP deadlock show that distributed serving on these systems needs workload-level probes and tighter integration testing.
- **Agentic workloads are driving infrastructure requirements.** Prefix caching, reasoning-effort forwarding, tool-call parsing, and prompt-cache accounting are all receiving active attention across projects.
- **Cost accounting is becoming a first-class concern.** LiteLLM’s cache-token and passthrough spend fixes highlight that gateway-level billing accuracy matters as much as inference throughput.
- **Security patches are incremental but important.** Ollama’s Host-header rejection and LiteLLM’s token-hash disclosure fix should be prioritized by operators exposing endpoints on shared networks.
- **What developers should watch:** pin vLLM before adopting v0.27.0 on affected stacks, avoid speculative decoding with structured outputs until livelock fixes land, validate AMD/Blackwell outputs before rollout, and audit LiteLLM spend data before relying on dashboards.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-13

## Today's Highlights

101 issues and 468 PRs were touched in the last 24h, but no release shipped — v0.27.0 remains current. The theme is stability: a new critical report shows the v0.27.0 engine permanently stalling after ~1 min idle on 4-node GB10 TP=4 deployments, while multiple speculative-decoding crashes (MTP illegal memory access, engine livelock with xgrammar) remain open. On the positive side, work advanced on ROCm FP8 GEMM throughput, XPU wheel distribution, and new model enablement (Muse Glimmer, Hunyuan A13B Rust frontend parser).

## Releases & Breaking Changes

- **No releases in the last 24h.** v0.27.0 is the current version.
- **Breaking dependency change in the latest image:** `vllm/vllm-openai:latest` (v0.27.0) now ships Transformers 5.15.0, which breaks Gemma-4 startup ([#51744](https://github.com/vllm-project/vllm/issues/51744)) and the Cosmos3-Edge processor (fix in [PR #51989](https://github.com/vllm-project/vllm/pull/51989)).
- **FlashInfer XQA decode support on SM12x was reverted** ([PR #51987](https://github.com/vllm-project/vllm/pull/51987)) after causing a GPQA Eval regression (nightly build 83511) on DGX Spark. Nightlies that included it no longer carry this path.

## New Model & Hardware Support

- **Muse Glimmer** ([PR #51655](https://github.com/vllm-project/vllm/pull/51655)): dense 29.6B vision-language model with ViT-G/14 perception encoder, 128K context, plus channel-scoped reasoning, ATEM tool-call parsers, and DFlash speculative decoding support for its draft head.
- **Hunyuan A13B tool parser** added to the Rust frontend ([PR #52133](https://github.com/vllm-project/vllm/pull/52133)), closing feature parity with the Python frontend for `<tool_calls>` JSON parsing.
- **Kimi-K3 on ROCm/AMD** ([#50682](https://github.com/vllm-project/vllm/issues/50682)): new upstream roadmap tracking for Day-0 features/baselines, with AITER fused-MoE a16w4 (GENERAL) and a8w4 (INTERLEAVE) kernels already integrated.
- **Intel XPU momentum:** XPU wheels added to the Buildkite release pipeline, heading to `wheels.vllm.ai` ([PR #52108](https://github.com/vllm-project/vllm/pull/52108)); `vllm_xpu_kernels` bumped to 0.1.13.1 ([PR #52138](https://github.com/vllm-project/vllm/pull/52138)); ragged-weight handling fixed in the XPU linear backend ([PR #52118](https://github.com/vllm-project/vllm/pull/52118)).
- **ROCm:** AITER MLA decode metadata stub fixed for kernel CI ([PR #52139](https://github.com/vllm-project/vllm/pull/52139)); FlashInfer one-sided NVLink All2All refined for DeepSeek Blockwise FP8 MoE + sequence parallelism, with explicit activation payload sizing for BF16, NVFP4, MXFP8 ([PR #51924](https://github.com/vllm-project/vllm/pull/51924)).

## Performance & Optimization

- **ROCm FP8 GEMM (landed):** bpreshuffled blockscaled FP8 GEMM ([PR #51692](https://github.com/vllm-project/vllm/pull/51692)) delivers **+4–8% QPS on TP8+DPA and +0–4% QPS on TP8+EP** for DeepSeek-V3 1k/1k on 8xMI350 (requires `VLLM_ROCM_USE_AITER_FP8`).
- **Attention kernel (landed):** hoisting tensor-descriptor construction out of the unified-attention K/V tile loader ([PR #51506](https://github.com/vllm-project/vllm/pull/51506)) removes per-tile `tensormap_create`, making the TD path pipelineable instead of forcing a synchronous map build per iteration.
- **Speculative decoding — multiple ongoing performance investigations:**
  - Dynamic SD schedules (`num_speculative_tokens_per_batch_size`) pay a baseline tax vs no-spec; the PIECEWISE graph override is one identified factor ([#49986](https://github.com/vllm-project/vllm/issues/49986)).
  - Dynamic SD also causes **catastrophic aggregate-throughput collapse at the batch-size threshold**; the FULL_AND_PIECEWISE→PIECEWISE downgrade alone costs ~14% single-stream ([#49548](https://github.com/vllm-project/vllm/issues/49548)).
  - Qwen3.5 native MTP can be **slower than the no-MTP baseline despite 82–88% acceptance** ([#47277](https://github.com/vllm-project/vllm/issues/47277)).
  - Fully async spec-decode remains blocked by `seq_lens_cpu` host↔GPU syncs; proposal to make it optional ([#29134](https://github.com/vllm-project/vllm/issues/29134)).
- **ViT Full CUDA Graph** RFC ([#38175](https://github.com/vllm-project/vllm/issues/38175)): tracker for cutting ViT launch overhead in production multimodal serving (Qwen3-VL, GLM-V, Kimi K2.5-class models).
- **Qwen3.5 27B prefix caching** ([#38988](https://github.com/vllm-project/vllm/issues/38988)): still reported as non-functional; open after ~4 months with 4 👍.

## Stability & Regressions

Ranked by severity:

1. **Engine permanently stalls after ~1 min idle** — 4-node TP=4 GB10/sm_121 (aarch64) on v0.27.0: `shm_broadcast` writer starves, requests never reach the scheduler, while `/v1/models` keeps responding (health checks pass; serving is dead). No fix PR yet ([#51921](https://github.com/vllm-project/vllm/issues/51921)).
2. **Engine core livelock (100% CPU, no crash)** with MTP speculative decoding + xgrammar structured outputs — regression from v0.24.0 ([#49210](https://github.com/vllm-project/vllm/issues/49210)).
3. **MTP speculative decoding illegal memory access** on long sequences (Qwen3.6-27B-FP8, v0.19.1; 36 comments) ([#40756](https://github.com/vllm-project/vllm/issues/40756)); also reproducible as `cudaErrorIllegalAddress` in `gdn_attn.py:237` with `qwen3_next_mtp` under load ([#37035](https://github.com/vllm-project/vllm/issues/37035)).
4. **DeepSeek V4 flash breaks after upgrading 0.26.0 → 0.27.0** ([#51758](https://github.com/vllm-project/vllm/issues/51758)).
5. **Gemma-4-31B fails to start** on `vllm-openai:latest` due to Transformers 5.15 (14 comments, 5 👍) ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
6. **Kimi-K3-NVFP4 produces degenerate, incoherent output** in the reasoning channel on 8xB300 with v0.27.0 ([#51798](https://github.com/vllm-project/vllm/issues/51798)).
7. **Qwen3.6-35B-A3B-FP8 fails code generation** with "400 Unterminated string starting at" across v0.23.0/0.24.0 (21 comments) ([#47761](https://github.com/vllm-project/vllm/issues/47761)).
8. **gpt-oss-120b multi-turn `openai_harmony.HarmonyError`** persists across v0.10.1/v0.10.1.1 — highest community engagement in the queue (47 comments, 22 👍) ([#23567](https://github.com/vllm-project/vllm/issues/23567)).
9. **DSpark speculative decoding broken on nightly** — multiple code paths assume only `"dflash"` even though `DSparkSpeculator` reuses DFlash infrastructure ([#50851](https://github.com/vllm-project/vllm/issues/50851)).
10. **Hybrid-SWA prefix caching collapses to zero** at ~25% pool occupancy in multi-session round-robin workloads (Gemma-4-31B) ([#48435](https://github.com/vllm-project/vllm/issues/48435)).

**Fix PRs in flight:** Qwen3Next layer boundaries with DP2+TP2 MoE sequence parallelism ([PR #50685](https://github.com/vllm-project/vllm/pull/50685)); aggressive zeroing of speculator buffers to prevent H100 illegal memory access ([PR #47596](https://github.com/vllm-project/vllm/pull/47596)); `mrope.apply_interleaved_rope()` torch.compile correctness under torch 2.13 ([PR #52005](https://github.com/vllm-project/vllm/pull/52005)); Cosmos3-Edge processor compatibility with transformers 5.14/5.15 ([PR #51989](https://github.com/vllm-project/vllm/pull/51989)); CPU KimiLinear mamba validation workaround ([PR #52045](https://github.com/vllm-project/vllm/pull/52045)).

## What This Means for Application Developers

- **Exercise caution with v0.27.0 in production** on the affected stacks: DeepSeek V4 flash, Kimi-K3-NVFP4, Gemma-4, and 4-node GB10 TP=4 all show regressions. If you serve Gemma-4 or Cosmos3-Edge, pin Transformers <5.15 until the image is fixed.
- **Speculative decoding remains the highest-risk feature to enable.** MTP + xgrammar structured outputs can livelock the engine, and dynamic SD schedules can collapse aggregate throughput at batch-size boundaries. Benchmark acceptance rate *and* end-to-end QPS under your actual concurrency before rolling out.
- **Multi-node GB10 (aarch64) operators:** the idle-stall failure mode in [#51921](https://github.com/vllm-project/vllm/issues/51921) defeats standard liveness/health checks (API responds, scheduler is dead). Add workload-level probes or keep-alive traffic if you run 4-node TP=4.
- **Ray Serve users:** the vLLM v1 Ray executor remains incompatible with Ray Serve LLM's PD disaggregation; for TP>1, use `distributed_executor_backend="mp"` to avoid nested placement-group failures ([#29688](https://github.com/vllm-project/vllm/issues/29688), [#30016](https://github.com/vllm-project/vllm/issues/30016)).
- **XPU users:** official prebuilt Intel GPU wheels are coming via the release pipeline — this removes the current build-from-source requirement.
- **V100 users:** running Qwen3.5 requires reconciling transformers version constraints against vLLM architecture support; see the workaround discussion ([#43561](https://github.com/vllm-project/vllm/issues/43561)).
- No patch release landed today; given the volume of v0.27.0 regressions, a point release in the coming days is likely.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-13

## Today’s Highlights

No release shipped in the last 24h; the project is focused on stabilization and performance work for DeepSeek-V4, Kimi-K3, DSpark, and expanded ROCm/XPU/NPU support. CI tracking reports **669 recently fixed vs. 3 broken and 11 flaky** tests ([#17050](https://github.com/sgl-project/sglang/issues/17050)). The most urgent open risks are a DSpark multi-node TP deadlock ([#33289](https://github.com/sgl-project/sglang/issues/33289)) and a FlashInfer NVFP4 MoE NaN regression on Blackwell ([#34629](https://github.com/sgl-project/sglang/issues/34629)).

## Releases & Breaking Changes

None in the last 24 hours.

## New Model & Hardware Support

- **DeepSeek V4 perf tracking** remains active for NVIDIA SM90/SM10X; high-priority items include TRT-LLM DSv4 attention for SM100/103 ([#30805](https://github.com/sgl-project/sglang/issues/30805)) and FlashInfer MNA work ([#33636](https://github.com/sgl-project/sglang/issues/33636)).
- **Kimi-K3 roadmap** ([#32607](https://github.com/sgl-project/sglang/issues/32607)) is still open with Day-0 support and bug tracking active.
- **Apple Silicon** roadmap ([#19137](https://github.com/sgl-project/sglang/issues/19137)) and the **MLX runner-stub RFC** ([#32321](https://github.com/sgl-project/sglang/issues/32321)) were updated; no merged support yet.
- **ROCm**: Docker upgrade to Python 3.12 + PyTorch 2.11 + Triton 3.7 on ROCm 7.2.4 ([#30984](https://github.com/sgl-project/sglang/pull/30984)); gfx950 FP8 Gluon decode for 12-head Kimi-K3 TP8 ([#34647](https://github.com/sgl-project/sglang/pull/34647)).
- **XPU**: `SGLANG_USE_SGL_XPU` now defaults to true ([#34492](https://github.com/sgl-project/sglang/pull/34492)).
- **NPU**: LTX-2/2.3 inference optimization ([#34722](https://github.com/sgl-project/sglang/pull/34722)); GLM-Image heterogeneous distributed DiT serving pipeline ([#31320](https://github.com/sgl-project/sglang/pull/31320)).
- **HIP/ROCm**: RFC for bit-exact SWA prefix reuse with `unified_kv` on DeepSeek-V4 ([#34562](https://github.com/sgl-project/sglang/issues/34562)).

## Performance & Optimization

- **Decode-side radix cache for hybrid SWA models** in P/D disaggregation ([#27770](https://github.com/sgl-project/sglang/pull/27770)) targets reducing repeated full-attention KV transfer.
- **Agentic-aware Tail-Optimized LRU eviction** for the unified radix cache ([#34012](https://github.com/sgl-project/sglang/pull/34012)) aims to keep TTFT under SLO for conversational/agentic workloads.
- **DSA / FlashInfer**: fused top-k for packed paged rows ([#33006](https://github.com/sgl-project/sglang/pull/33006)) removes an SGL-kernel fallback.
- **MoE**: `moe_topk_softmax` migrating from AOT to JIT kernels ([#34509](https://github.com/sgl-project/sglang/pull/34509)); async per-token expert-distribution recorder ([#18589](https://github.com/sgl-project/sglang/pull/18589)); batched embedding cache host-device range copies ([#31574](https://github.com/sgl-project/sglang/pull/31574)).
- **Diffusion serving**: fused QKNorm+RoPE for ERNIE-Image ([#34620](https://github.com/sgl-project/sglang/pull/34620)); eager QKV packing/QKNorm for HunyuanVideo ([#34617](https://github.com/sgl-project/sglang/pull/34617)); AdaLN and packed SwiGLU fusions for FLUX.2 ([#34616](https://github.com/sgl-project/sglang/pull/34616)); component-scoped residency decisions in `performance_mode=auto` ([#34615](https://github.com/sgl-project/sglang/pull/34615)).
- Open question on whether TRT-LLM allreduce fusion should accumulate in FP32 ([#34603](https://github.com/sgl-project/sglang/issues/34603)).
- **Context parallelism** roadmap ([#21788](https://github.com/sgl-project/sglang/issues/21788)) remains a high-priority open item.

## Stability & Regressions

Ranked by severity:

1. **Multi-node TP rank-divergence deadlock** with DeepSeek-V4 + DSpark on 2×DGX Spark — scheduler ranks wedge in NCCL proxy while peers idle ([#33289](https://github.com/sgl-project/sglang/issues/33289)). No fix PR linked.
2. **FlashInfer TRTLLM NVFP4 MoE NaNs** on SM100/SM103 via the tile-192 path — GSM8K score drops to 0.0 after FlashInfer upgrade ([#34629](https://github.com/sgl-project/sglang/issues/34629)). No fix PR linked.
3. **Kimi-K3 cross-prompt reasoning leakage** ([#34259](https://github.com/sgl-project/sglang/issues/34259)) — open correctness/data-isolation concern.
4. **DSpark CUDA graph geometry mismatch** ([#34384](https://github.com/sgl-project/sglang/issues/34384)) and **launch failure at concurrency=1** for Kimi-K3 ([#34522](https://github.com/sgl-project/sglang/issues/34522)) — both open.
5. **ROCm MI355 HiCache broken** — poor performance on realistic agentic workloads ([#34611](https://github.com/sgl-project/sglang/issues/34611)); open.
6. **DeepEP low_latency buffer lazy init fails** during CUDA graph capture on Kimi K2.6 W4A8 with PP=2/TP=8/DP-attention/EP=8 ([#29942](https://github.com/sgl-project/sglang/issues/29942)); open.
7. **`runai_streamer` load-format silently corrupts GLM-5.2 weights** under TP8 ([#29998](https://github.com/sgl-project/sglang/issues/29998)); open.
8. **XPU Qwen3.5 GDN + speculative decode** fails with `causal_conv1d_update_xpu()` keyword error ([#34720](https://github.com/sgl-project/sglang/issues/34720)); open.
9. **DeepSeek-V4 DSpark draft crash** on SM120 with topk=192 ([#33943](https://github.com/sgl-project/sglang/issues/33943)); similar fix exists in [#33407](https://github.com/sgl-project/sglang/pull/33407).
10. **Fix available**: Nemotron-H Mamba illegal memory access under DP attention with CUDA graph is addressed by [#34561](https://github.com/sgl-project/sglang/pull/34561).
11. **CI**: 3 broken / 11 flaky / 669 fixed ([#17050](https://github.com/sgl-project/sglang/issues/17050)); AMD CI install-argument quoting is being fixed in [#34723](https://github.com/sgl-project/sglang/pull/34723). CUDA coredump tracking remains very active ([#26340](https://github.com/sgl-project/sglang/issues/26340)).
12. **Defensive fix**: paged-KV capacity is now checked before Triton allocator kernel launch ([#34400](https://github.com/sgl-project/sglang/pull/34400)).

## What This Means for Application Developers

- There is no new stable release, and several correctness bugs are still open around DSpark, NVFP4 MoE on Blackwell, and multi-node DeepSeek-V4. **Pin known-good versions** before deploying those paths.
- Radix-cache work (T-LRU eviction, SWA decode-side reuse) should improve prefix caching and tail behavior for agentic workloads, but watch for isolation issues such as Kimi-K3 reasoning leakage ([#34259](https://github.com/sgl-project/sglang/issues/34259)).
- ROCm/XPU/NPU support is moving fast — XPU is now default-on, ROCm 7.2.4 containers are coming, and NPU diffusion paths are being optimized — but MI355X MTP/HiCache gaps remain unresolved.
- For production capacity planning, the pending paged-KV checks ([#34400](https://github.com/sgl-project/sglang/pull/34400)) and the still-open KV-cache Prometheus metrics request ([#5979](https://github.com/sgl-project/sglang/issues/5979)) are worth tracking.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-13

## 1. Today's Highlights

Three new builds shipped: `b10405` removes unsafe HIP math optimizations to fix RDNA3.5 speculative-decode divergence, `b10400` fixes ARM build issues, and `b10375` tightens Qwen bare-function parsing. Backend work is heavily SYCL-focused, with multiple kernel-fusion and quantized-KV decode PRs showing large throughput gains on Intel Arc/Battlemage. On the stability side, a ~40% RTX 5080 regression and AMD token-corruption reports remain active areas of investigation.

## 2. Releases & Breaking Changes

- **b10405** — HIP builds are now IEEE-conformant: `-funsafe-math-optimizations` was removed because it enables associative FP math and could flip greedy argmax on RDNA3.5 during MTP speculative decode.  
  [PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696) · [Release b10405](https://github.com/ggml-org/llama.cpp/releases/tag/b10405)
- **b10400** — Fixes ARM builds and an unused-variable warning.  
  [PR #26991](https://github.com/ggml-org/llama.cpp/pull/26991) · [Release b10400](https://github.com/ggml-org/llama.cpp/releases/tag/b10400)
- **b10375** — Chat template parsing tightened for bare function calls on Qwen models.  
  [PR #26793](https://github.com/ggml-org/llama.cpp/pull/26793) · [Release b10375](https://github.com/ggml-org/llama.cpp/releases/tag/b10375)

No configuration or API migrations are required for the new builds.

## 3. New Model & Hardware Support

- **Maple 20B-A1B ternary MoE** — Draft PR adds CPU support for a 24-layer, 256-expert ternary MoE architecture. Early-stage, but relevant for new model bring-up.  
  [PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)
- **Speculative-draft auto-detection** — `-md` local draft models can now have their spec type auto-detected from GGUF metadata instead of remaining inactive.  
  [PR #26814](https://github.com/ggml-org/llama.cpp/pull/26814)
- **SYCL backend enablement continues** — Host-pinned memory support, quantized KV decode TILE dispatch, and new ESIMD kernels are all progressing.  
  [PR #26789](https://github.com/ggml-org/llama.cpp/pull/26789) · [PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689) · [PR #26251](https://github.com/ggml-org/llama.cpp/pull/26251)

## 4. Performance & Optimization

- **CPU flash-attention V-cache conversion** — Vectorized FP16→FP32 conversion using F16C intrinsics gives 17–31% prompt-processing improvement on `qwen3:4b`.  
  [PR #26947](https://github.com/ggml-org/llama.cpp/pull/26947)
- **SYCL gated-delta-net fusion** — Fusing the state-writeback cpy improves `tg128` from 23.91 tok/s on Qwen 3.6 27B Q4_K.  
  [PR #26643](https://github.com/ggml-org/llama.cpp/pull/26643)
- **SYCL quantized KV decode TILE** — TILE kernel enabled for quantized KV decode; measured +42% to +169% on Qwen3.6-35B, Gemma 4 26B, and Gemma 4 12B at 32K and 118K context on Battlemage.  
  [PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689)
- **SYCL unary + MUL fusion** — Fuses `silu`/`sigmoid`/`softplus` + `MUL` kernels.  
  [PR #26411](https://github.com/ggml-org/llama.cpp/pull/26411)
- **SYCL FP16 GEMM path cleanup** — Removes separate FP32 promotion in the non-oneDNN GEMM path.  
  [PR #26372](https://github.com/ggml-org/llama.cpp/pull/26372)
- **SYCL host-pinned memory** — New `GGML_SYCL_ENABLE_HOST_PINNED_MEM` env var improves host-to-device transfer on Intel GPUs.  
  [PR #26789](https://github.com/ggml-org/llama.cpp/pull/26789)

## 5. Stability & Regressions

Ranked roughly by severity:

- **AMD GPU token substitution corruption** — Qwen3.6-27B produces consistent character-substitution errors on both Vulkan and ROCm; CPU is correct. This is a high-impact correctness issue for AMD users.  
  [Issue #26754](https://github.com/ggml-org/llama.cpp/issues/26754)
- **RTX 5080 / Blackwell ~40% performance regression** — Reported between `b10356` and `b10359`, worsening through `b10369`. Affects prompt processing and generation. No fix PR linked yet.  
  [Issue #26918](https://github.com/ggml-org/llama.cpp/issues/26918)
- **RPC `SET_ROWS` out-of-bounds write** — In release builds, the RPC backend can write past an output tensor buffer. Memory-safety issue; no public fix yet.  
  [Issue #26912](https://github.com/ggml-org/llama.cpp/issues/26912)
- **SYCL garbage on second prompt** — A new report mirrors earlier SYCL multi-GPU corruption issues; likely backend eval or state-reset bug.  
  [Issue #26845](https://github.com/ggml-org/llama.cpp/issues/26845) · [Issue #21589](https://github.com/ggml-org/llama.cpp/issues/21589)
- **Vulkan crashes on Intel Ultra after `b10215`** — Regression on Core Ultra 7 255H / Arc Pro 140T. A revert PR removes the Windows Intel Vulkan driver-version check as a temporary workaround.  
  [Issue #26769](https://github.com/ggml-org/llama.cpp/issues/26769) · [PR #26998](https://github.com/ggml-org/llama.cpp/pull/26998)
- **ROCm gfx1151 RPC worker crash** — Crash in `GGML_OP_TOP_K` during DeepSeek V4 prefill after 4096 tokens.  
  [Issue #26746](https://github.com/ggml-org/llama.cpp/issues/26746)
- **SWA on Gemma 4 forgets key details** — Sliding-window attention correctness issue on CUDA.  
  [Issue #25751](https://github.com/ggml-org/llama.cpp/issues/25751)
- **Windows ROCm binary GPU detection failure** — Pre-built binary fails to detect AMD GPUs; closed recently.  
  [Issue #26929](https://github.com/ggml-org/llama.cpp/issues/26929)
- **DeepSeek-V4-Flash repetition / special-token leakage** — Long agentic chats on Metal degrade into repetition loops.  
  [Issue #26694](https://github.com/ggml-org/llama.cpp/issues/26694)

## 6. What This Means for Application Developers

- **AMD GPU deployments need output validation.** The Qwen3.6-27B token-corruption issue spans both Vulkan and ROCm, so pin known-good builds or run CPU fallback for critical workloads until backend fixes land.
- **RTX 5080 / Blackwell users should benchmark before upgrading.** The `b10359`+ regression is severe and may not appear in standard `llama-bench` runs unless carefully tested.
- **SYCL/Intel Arc remains volatile.** If you serve on Intel GPUs, avoid blind upgrades; the Vulkan revert PR may be necessary to restore compatibility with older Intel iGPU drivers.
- **Speculative decoding setup is getting easier.** The draft-model auto-detection PR should reduce “draft loads but never activates” failures when serving with `-md`.
- **RPC users should treat release builds cautiously.** The `SET_ROWS` buffer-overflow report suggests validating memory safety before running untrusted RPC workloads.
- **Multimodal and vision workloads still have unresolved KV-cache save/load issues.** The `/slots/...?action=save` path for vision-enabled models remains broken; keep this in mind when building persistence into serving stacks.  
  [Issue #19466](https://github.com/ggml-org/llama.cpp/issues/19466)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Today's Highlights

Ollama shipped **v0.32.10-rc1**, changing the default `repeat_penalty` to 1.0 (off) and adding faster NVFP4 MLX prefill. The project also saw security-hardening PRs — empty Host header rejection, `WriteWithBackup` collision fixes — and several open regressions around Claude Code / SillyTavern integrations and AMD/MLX stalls. On the infrastructure side, Intel SYCL and an MLX KV connector framework were proposed.

## Releases & Breaking Changes

- **[v0.32.10-rc1](https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1)** — Default `repeat_penalty` changed from **1.1 to 1.0 (off)**, matching other engines and speeding up speculative decoding. If older models start generating repetitive text, set `repeat_penalty` explicitly per model.
- Release also includes **faster prefill on NVFP4 MLX models with a global scale**, roughly **7–8%** faster.
- Docs/OpenAPI cleanups landed separately: **[PR #17726](https://github.com/ollama/ollama/pull/17726)** documents API error conventions and fixes the Linux uninstall command; **[PR #17728](https://github.com/ollama/ollama/pull/17728)** adds usage/timing fields to `ChatStreamEvent` in the OpenAPI schema.

## New Model & Hardware Support

- **[PR #17621](https://github.com/ollama/ollama/pull/17621)** — Adds an opt-in **Intel oneAPI (SYCL) GPU backend** via `-DOLLAMA_LLAMA_BACKENDS=sycl`, wired through the llama-server superbuild. Default builds are unchanged.
- **[PR #17714](https://github.com/ollama/ollama/pull/17714)** — Adds **MLX vision support for Nemotron** (`nemotron_h`), including RADIO encoder, dynamic-resolution preprocessing, and MTP offsets.
- **[PR #17707](https://github.com/ollama/ollama/pull/17707)** — Adds an **MLX KV connector framework** with a file-backed example connector, enabling snapshot/restore of prefix caches.
- **[PR #17696](https://github.com/ollama/ollama/issues/17696)** — Proposal for a broader **pluggable external KV cache backend** framework, with LMCache as a potential long-term integration.
- **[PR #17385](https://github.com/ollama/ollama/pull/17385)** — Skips unsupported ARM CPU variants instead of failing builds on older GCC toolchains, relevant for Jetson/Ubuntu 22.04.

## Performance & Optimization

- **v0.32.10-rc1** — Disabling `repeat_penalty` by default improves speculative decoding throughput; NVFP4 MLX prefill is ~7–8% faster with global-scale models.
- **[PR #17712](https://github.com/ollama/ollama/pull/17712)** — OpenAI-compatible endpoint now accepts `reasoning_effort="minimal"` and maps it to `"low"`, giving clients a way to request cheaper/faster responses instead of a 400 error.
- **[Issue #17016](https://github.com/ollama/ollama/issues/17016)** — Open feature request for `dspark` support, which claims significant LLM speedups; two reference implementations are linked.

## Stability & Regressions

Ranked by severity:

- **Runner hang after long-pinned models** — [Issue #15950](https://github.com/ollama/ollama/issues/15950): `/api/generate` can hang indefinitely with zero bytes returned while the process is alive. Same shape as previously-resolved #15258; still open on 0.20.5.
- **DNS-rebind protection bypass** — [PR #17721](https://github.com/ollama/ollama/pull/17721): rejects an empty Host header (`Host: :11434`) on loopback-bound servers. Worth shipping now.
- **Blob verification bypass / SSRF exfiltration** — [Issue #15485](https://github.com/ollama/ollama/issues/15485) (closed): when config and layer share a digest, `verifyBlob` could be skipped, allowing rogue registry responses. Closed, but relevant if pulling from untrusted registries.
- **Docker model loading regression** — [Issue #17285](https://github.com/ollama/ollama/issues/17285) (closed): users report being stuck on 0.24.0 because models fail to load on 0.30.0+.
- **SillyTavern text completion returns empty response** — [Issue #17700](https://github.com/ollama/ollama/issues/17700): regression on recent versions; reverting to 0.32.7 fixes it.
- **Claude Code no response with qwen3-coder** — [Issue #17671](https://github.com/ollama/ollama/issues/17671): generation succeeds internally, but Claude Code shows no response via `ollama launch claude`.
- **Nemotron3.5-lightning stalls on AMD AI395+** — [Issue #17692](https://github.com/ollama/ollama/issues/17692): stalls during thinking on Framework Desktop-class hardware.
- **Identical embeddings for accented French words** — [Issue #17691](https://github.com/ollama/ollama/issues/17691): bit-for-bit identical vectors for semantically unrelated terms.
- **Laguna parser false-positive tool calls** — [Issue #17602](https://github.com/ollama/ollama/issues/17602): ordinary JSON in replies can trigger tool-call parsing and abort/corrupt responses.
- **Llama 4 GGUF tokenizer metadata wrong** — [Issue #17698](https://github.com/ollama/ollama/issues/17698): conversions use `tokenizer.ggml.pre="default"` instead of `"llama4"`.
- **`WriteWithBackup` backup collision** — [Issue #17713](https://github.com/ollama/ollama/issues/17713): one-second timestamp resolution can overwrite backups during rapid writes. Fixes: [PR #17718](https://github.com/ollama/ollama/pull/17718), [PR #17722](https://github.com/ollama/ollama/pull/17722), [PR #17724](https://github.com/ollama/ollama/pull/17724).

## What This Means for Application Developers

- **Sampling behavior changed in v0.32.10-rc1.** Test output stability after upgrading; if models begin repeating, set `repeat_penalty` explicitly in the request or Modelfile.
- **SilkyTavern / text-completion users should pin 0.32.7** until [Issue #17700](https://github.com/ollama/ollama/issues/17700) is fixed.
- **Tool-call parsing is getting safer.** [PR #17719](https://github.com/ollama/ollama/pull/17719) fixes array-wrapped tool-call arguments, and [PR #17723](https://github.com/ollama/ollama/pull/17723) improves qwen3vl error context. If you see HTTP 500s on tool calls, test against these.
- **Security:** upgrade to a build containing [PR #17721](https://github.com/ollama/ollama/pull/17721) if Ollama is loopback-bound. Review manifest/blob handling if using custom registries ([#15485](https://github.com/ollama/ollama/issues/15485)).
- **Observability is still limited.** [Issue #17694](https://github.com/ollama/ollama/issues/17694) requests server-level metrics; today you still need `/api/ps` and per-request `usage` fields. The OpenAPI schema now documents those fields for stream events ([PR #17728](https://github.com/ollama/ollama/pull/17728)).
- **Ollama Launch / Claude Code caveats:** unknown model names like `kimi-k2.7-code:cloud` force a 200k auto-compact window ([#17717](https://github.com/ollama/ollama/issues/17717)), and qwen3-coder can appear unresponsive ([#17671](https://github.com/ollama/ollama/issues/17671)). Pin known-good model names and verify integration versions.
- **MLX/NVFP4 users:** the new prefill optimizations are worth benchmarking. The MLX KV connector framework ([#17707](https://github.com/ollama/ollama/pull/17707)) is early-stage; don’t rely on it for production persistence yet.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-13

## Today's Highlights
No releases landed in the last 24 hours, but the PR queue is active around spend/usage correctness and provider compatibility. Notable in-flight work includes Bedrock Invoke cache-token accounting ([#34498](https://github.com/BerriAI/litellm/pull/34498)), vLLM passthrough spend tracking ([#33351](https://github.com/BerriAI/litellm/pull/33351)), and a new Aliyun security guardrail integration ([#36753](https://github.com/BerriAI/litellm/pull/36753)). On the bug side, the most impactful open items are an Azure GPT-5.6 cost-map error ([#36192](https://github.com/BerriAI/litellm/issues/36192)), a `max_parallel_requests` counter leak on the Anthropic adapter ([#27955](https://github.com/BerriAI/litellm/issues/27955)), and a SHA-256 token-hash disclosure in 429 response bodies ([#27884](https://github.com/BerriAI/litellm/issues/27884)).

## Releases & Breaking Changes
None in the last 24 hours.

## New Model & Hardware Support
- **Bedrock GPT-5.5 (Mantle platform)** — [#30941](https://github.com/BerriAI/litellm/issues/30941) closed; LiteLLM auto-converts Chat Completions to the Responses API for Bedrock Mantle, which only exposes `/v1/responses`.
- **Vertex AI Gemini 2.5 Flash / Flash-Lite** priority & flex pay-as-you-go pricing — [#23388](https://github.com/BerriAI/litellm/issues/23388) closed.
- **OCI provider UI** now supports `servingType: DEDICATED` — [#25688](https://github.com/BerriAI/litellm/issues/25688) closed.
- PR [#36755](https://github.com/BerriAI/litellm/pull/36755): responses bridge now accepts `reasoning_effort: "max"` instead of silently dropping it.
- PR [#36754](https://github.com/BerriAI/litellm/pull/36754): GitHub Copilot Claude models now forward `thinking` and `reasoning_effort` through `map_openai_params`.
- PR [#33350](https://github.com/BerriAI/litellm/pull/33350): Azure AI forwards `reasoning_effort` for registry-marked reasoning-capable models (GPT-5 family).

## Performance & Optimization
- **Bedrock Invoke cache-token accounting** — PR [#34498](https://github.com/BerriAI/litellm/pull/34498) (open): streaming responses dropped `cacheRead`/`cacheWrite` token counts, causing cache-heavy Claude traffic to be billed 4–7× over-report as fresh input. The fix propagates cache-token counts into usage.
- **vLLM passthrough spend tracking** — PR [#33351](https://github.com/BerriAI/litellm/pull/33351) (open): `VLLMPassthroughConfig` now builds a `StandardLoggingPayload` for usage-bearing `/vllm/*` passthrough requests where spend was previously never recorded.
- **Anthropic prompt-cache invalidation** — [#36559](https://github.com/BerriAI/litellm/issues/36559) (open): mid-conversation system-role hoisting for pre-4.8 Claude models invalidates the entire prompt-cache prefix, increasing cost and latency on multi-turn conversations.
- **DB connection leak** — PR [#34380](https://github.com/BerriAI/litellm/pull/34380) (open): fixes a per-call `PrismaClient` leak in `global_spend_refresh()` that could eventually exhaust Postgres `max_connections` and cause proxy-wide auth failures.

## Stability & Regressions
Ranked by severity:

1. **SHA-256 token hash disclosure in 429 bodies** (open) — [#27884](https://github.com/BerriAI/litellm/issues/27884): the parallel-request limiter includes the full hash of the offending virtual key in the error body; treat as sensitive data.
2. **`max_parallel_requests` counter leak** (open) — [#27955](https://github.com/BerriAI/litellm/issues/27955): client cancellations of streaming `/v1/messages` monotonically increase the Redis counter until all requests are rejected; affects the Anthropic adapter.
3. **Azure GPT-5.6 Terra/Luna cost-map error** (open) — [#36192](https://github.com/BerriAI/litellm/issues/36192): `azure/gpt-5.6-*` rows carry OpenAI's post-cut prices that Azure never applied — spend will be under-reported.
4. **Prompt-cache invalidation via system-role hoist** (open) — [#36559](https://github.com/BerriAI/litellm/issues/36559): cache cost regression for mid-conversation system messages on older Claude models.
5. **Xiaomi MiMo failure with Claude Code** (open) — [#24549](https://github.com/BerriAI/litellm/issues/24549): `output_config` causes `AsyncCompletions.create()` to fail for MiMo-V2-Pro/Omni.
6. **Content-filter evaluations missing** (open) — [#36566](https://github.com/BerriAI/litellm/issues/36566): `litellm_content_filter` guardrail results absent from request logs and Guardrails Monitor.
7. **Azure Model Router spend attribution** (open) — [#27942](https://github.com/BerriAI/litellm/issues/27942): `/spend/logs` stores the router model group, not the actual served deployment.
8. **Ollama `reasoning_content` always null** (open) — [#27956](https://github.com/BerriAI/litellm/issues/27956): thinking chains lost for observability on Qwen3/DeepSeek-R1 via Ollama.
9. **`global_max_parallel_requests` not enforced** (open) — [#27900](https://github.com/BerriAI/litellm/issues/27900).
10. **Usage dashboard "Ask AI" broken** (open) — [#35461](https://github.com/BerriAI/litellm/issues/35461) and [#24513](https://github.com/BerriAI/litellm/issues/24513): bare `litellm.acompletion()` bypasses the Router, so model groups/aliases fail.

**Closed in the last 24h:** critical cross-user response leakage in Redis Cluster/OpenShift ([#25447](https://github.com/BerriAI/litellm/issues/25447)), empty-`choices` chunk crash in `_should_start_new_content_block` ([#36553](https://github.com/BerriAI/litellm/issues/36553)), LiteLLM_Config table overwriting deployed config ([#12875](https://github.com/BerriAI/litellm/issues/12875)), OCI Gemini tool-call exception ([#18654](https://github.com/BerriAI/litellm/issues/18654)), Responses API missing SSE setup events ([#20975](https://github.com/BerriAI/litellm/issues/20975)), and `chatgpt/gpt-5.2-codex` system-message rejection ([#21420](https://github.com/BerriAI/litellm/issues/21420)). Verify the Redis Cluster fix against your own deployment before re-enabling that mode.

**Fix PRs in flight:** [#32475](https://github.com/BerriAI/litellm/pull/32475) (SSE error events on Responses API bridge stream failure), [#32477](https://github.com/BerriAI/litellm/pull/32477) (dict-shaped usage extraction for the same path), [#36751](https://github.com/BerriAI/litellm/pull/36751) (fully blocked model falls back to a healthy group), [#36727](https://github.com/BerriAI/litellm/pull/36727) (Google Interactions API step-shaped input), [#34511](https://github.com/BerriAI/litellm/pull/34511) (stop mutating caller's `input_schema` in Anthropic→OpenAI tool translation), [#34472](https://github.com/BerriAI/litellm/pull/34472) (dict-changed-size crash in `safe_deep_copy`/`safe_dumps`), [#27811](https://github.com/BerriAI/litellm/pull/27811) (cascading 400 `invalid_encrypted_content` on deployment cool-down), and [#27857](https://github.com/BerriAI/litellm/pull/27857) (preserve upstream errors for streaming request bodies).

## What This Means for Application Developers
- **Audit spend data before trusting dashboards.** Azure GPT-5.6 Terra/Luna usage may be under-counted until [#36192](https://github.com/BerriAI/litellm/issues/36192) lands; Bedrock Claude cache-heavy traffic may over-report until [#34498](https://github.com/BerriAI/litellm/pull/34498) merges; and Azure AI Router `/spend/logs` may show the model-group name rather than the served model ([#27942](https://github.com/BerriAI/litellm/issues/27942)).
- **Rate limiting caveats.** `max_parallel_requests` is not reliable for Anthropic `/v1/messages` streams with client cancellations ([#27955](https://github.com/BerriAI/litellm/issues/27955)). If you surface raw 429 bodies to end users, strip the token hash ([#27884](https://github.com/BerriAI/litellm/issues/27884)).
- **Tool-calling hygiene.** PR [#34511](https://github.com/BerriAI/litellm/pull/34511) fixes in-place mutation of `input_schema` during Anthropic→OpenAI translation — upgrade once it merges if you reuse tool definitions across requests.
- **Prompt caching on Claude.** Avoid mid-conversation `role: system` messages on pre-4.8 Claude models or expect full prompt-cache misses ([#36559](https://github.com/BerriAI/litellm/issues/36559)).
- **Reasoning controls.** `reasoning_effort: "max"` is now honored on the responses bridge ([#36755](https://github.com/BerriAI/litellm/pull/36755)), Copilot Claude ([#36754](https://github.com/BerriAI/litellm/pull/36754)), and Azure AI reasoning models ([#33350](https://github.com/BerriAI/litellm/pull/33350)) — useful for agentic workloads that need deeper reasoning.
- **New guardrail option.** Aliyun security guardrail integration is open in [#36753](https://github.com/BerriAI/litellm/pull/36753) for teams operating in Alibaba Cloud environments.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-13

## 1. Today's Highlights
A large batch of desktop/Studio hardening PRs landed from the core team, targeting Windows autostart from the wrong working directory ([#8575](https://github.com/unslothai/unsloth/pull/8575)), macOS `llama-server` startup failures caused by missing `DYLD_LIBRARY_PATH` ([#8574](https://github.com/unslothai/unsloth/pull/8574)), and antivirus/AppLocker false positives that blocked installers and the `unsloth.exe` entry point ([#8586](https://github.com/unslothai/unsloth/pull/8586), [#8592](https://github.com/unslothai/unsloth/pull/8592)). The VRAM budget is becoming tunable ([#8589](https://github.com/unslothai/unsloth/pull/8589)) after a report of Studio offering 175k context where LM Studio offered 200–250k on 2× RTX 3090. AMD hardware-detection messaging and Windows-on-ARM support are also being cleaned up ([#8577](https://github.com/unslothai/unsloth/pull/8577), [#8599](https://github.com/unslothai/unsloth/pull/8599)).

## 2. Releases & Breaking Changes
No releases in the last 24 hours. No API/config breaking changes to report.

## 3. New Model & Hardware Support
- **Windows on ARM**: PR [#8599](https://github.com/unslothai/unsloth/pull/8599) fixes Snapdragon X2 Elite installs (native ARM64 interpreter was reusing an ARM64 `pyarrow` that has no `win_arm64` wheel) and adds an inference-only tier.
- **Diffusion model derivatives**: PR [#8622](https://github.com/unslothai/unsloth/pull/8622) adds a family override so fine-tunes/merges of FLUX.2 and other image/video diffusion models (e.g. `user/FLUX.2_klein_9B`) can be loaded even when the repo ID doesn't match a known family.
- **ROCm messaging correction**: PR [#8577](https://github.com/unslothai/unsloth/pull/8577) stops advising a "fix that cannot work" for RDNA 1 cards (RX 5700 XT) — ROCm does not cover that architecture; the installer will now say so explicitly.
- **AMD detection remains a hot area**: RX 5700 XT not recognized ([#8529](https://github.com/unslothai/unsloth/issues/8529)), RX 7600 not detected in Linux AppImage ([#8471](https://github.com/unslothai/unsloth/issues/8471)), RX 580 Vulkan detection requiring clean reinstall ([#8458](https://github.com/unslothai/unsloth/issues/8458)).
- **Model requests pending**: DeepReinforce Ornith-1.0 support ([#6721](https://github.com/unslothai/unsloth/issues/6721), 23 👍), Ling 3.0 in Studio ([#8532](https://github.com/unslothai/unsloth/issues/8532)), and MLX pretraining structure (corpus selection, shard packing, tokenizer word-pair compute) ([#8607](https://github.com/unslothai/unsloth/issues/8607)).

## 4. Performance & Optimization
- **Tunable VRAM budget**: PR [#8589](https://github.com/unslothai/unsloth/pull/8589) makes the context-length reserve fraction configurable. Motivation: a 2× RTX 3090 user saw Studio offer 175k context vs. LM Studio's 200–250k. The author walked through the reserve line-by-line (`--parallel 4` logits buffers, 2049 MiB compute buffer) and concluded most of it is real cost, so the fix is user control rather than a lower default.
- **Kaggle save-path fix**: PR [#8439](https://github.com/unslothai/unsloth/pull/8439) detects the Kaggle large overlay for saves and refuses a GGUF export that cannot fit, instead of failing mid-write.
- **Telemetry gaps requested**: Live prompt-processing and generation speed per API request ([#8528](https://github.com/unslothai/unsloth/issues/8528)) and GPU/CPU utilization, temperature, and wattage in the Studio UI ([#8527](https://github.com/unslothai/unsloth/issues/8527)).

## 5. Stability & Regressions
Ranked by severity; fix PRs noted where they exist.

- **Installer/startup failures (multi-platform)** — the dominant theme:
  - Windows EDR/AMSI blocks `install.ps1` at parse time ([#8523](https://github.com/unslothai/unsloth/issues/8523)) — fixed by script-shipping changes in [#8586](https://github.com/unslothai/unsloth/pull/8586).
  - Windows Application Control / Smart App Control denies the generated unsigned `unsloth.exe` ([#8490](https://github.com/unslothai/unsloth/issues/8490), also earlier [#7147](https://github.com/unslothai/unsloth/issues/7147)) — fixed by dropping the console-script dependency in [#8592](https://github.com/unslothai/unsloth/pull/8592).
  - Windows install fails on AMD GPU systems ([#8508](https://github.com/unslothai/unsloth/issues/8508)); install never finishes on Windows ([#8546](https://github.com/unslothai/unsloth/issues/8546)).
  - macOS install failure ([#8530](https://github.com/unslothai/unsloth/issues/8530), closed) and second-launch error on M4 Pro ([#8610](https://github.com/unslothai/unsloth/issues/8610)).
  - Linux AppImage: "required Linux libraries are missing" ([#8463](https://github.com/unslothai/unsloth/issues/8463), 8 comments — top issue today).
- **Runtime crashes**:
  - macOS M4: `llama-server` fails to start on any local GGUF + excessive idle RAM usage ([#8566](https://github.com/unslothai/unsloth/issues/8566)) — fix PR [#8574](https://github.com/unslothai/unsloth/pull/8574) sets `DYLD_LIBRARY_PATH` and improves failure classification.
  - Context leaks between sessions/harnesses when Unsloth is used as an API backend ([#8442](https://github.com/unslothai/unsloth/issues/8442)).
  - HF download token failure in Desktop ([#8604](https://github.com/unslothai/unsloth/issues/8604)); private-dataset metadata requests still not passing the HF token ([#4962](https://github.com/unslothai/unsloth/issues/4962)).
  - Training crash on T4/Kaggle with Qwen 3.5 0.8B bf16 ([#7506](https://github.com/unslothai/unsloth/issues/7506)).
- **Auth/API correctness**:
  - Claude Code (Anthropic CLI) fails with 401 against Studio's endpoint because it sends `x-api-key` while Unsloth only accepts `Authorization: Bearer sk-unsloth-…` ([#8663](https://github.com/unslothai/unsloth/issues/8663)). No fix PR yet.
- **Closed regressions**: ROCm 6.3 segfault on Radeon 8060S ([#7331](https://github.com/unslothai/unsloth/issues/7331)); OpenRouter `:free` models wrongly reporting insufficient credits ([#8518](https://github.com/unslothai/unsloth/issues/8518)); stable-diffusion.cpp build predating MiniMax-H3 ([#8507](https://github.com/unslothai/unsloth/issues/8507)).
- **Minor**: CPU clock shown as "4-MHz" in system settings ([#8519](https://github.com/unslothai/unsloth/issues/8519), closed); app resize glitch ([#8600](https://github.com/unslothai/unsloth/issues/8600)); broken docs anchor `studio#model-arena` ([#8652](https://github.com/unslothai/unsloth/issues/8652)).

## 6. What This Means for Application Developers
- **Windows enterprise deployments**: If your org enforces AppLocker/WDAC/Smart App Control, hold for the `unsloth.exe` console-script removal ([#8592](https://github.com/unslothai/unsloth/pull/8592)); current builds are blocked at install time. The EDR false-positive fix ([#8586](https://github.com/unslothai/unsloth/pull/8586)) also applies to Linux bundles.
- **AMD RDNA 1 users (RX 5000/500 series)**: ROCm will not support these cards — plan for the Vulkan path or CPU inference; the loader messaging will now tell you this instead of suggesting an impossible HIP SDK fix ([#8577](https://github.com/unslothai/unsloth/pull/8577)).
- **Claude Code integrations**: Unsloth's API endpoint only accepts `Authorization: Bearer sk-unsloth-…`. Anthropic's CLI sends `x-api-key`, so it will 401 until the endpoint accepts both headers ([#8663](https://github.com/unslothai/unsloth/issues/8663)) — patch your proxy or wait for a fix.
- **Context-length planning on multi-GPU**: Context offers below LM Studio's are largely real VRAM costs, not slack; the upcoming `VRAM budget fraction` setting ([#8589](https://github.com/unslothai/unsloth/pull/8589)) gives you the knob to trade headroom for context.
- **Custom OpenAI-compatible providers**: A per-connection Max Tokens override is in flight ([#8512](https://github.com/unslothai/unsloth/pull/8512)) to lift the conservative 32,768-token fallback.
- **Multi-session workflows**: Chat settings (web search, MCP, deep-research policy, artifacts) will persist across browsers/private windows/remote sessions once [#8656](https://github.com/unslothai/unsloth/pull/8656) lands.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*