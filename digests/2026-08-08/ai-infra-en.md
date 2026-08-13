# AI Infrastructure Digest 2026-08-08

> Generated: 2026-08-07 16:38 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — 2026-08-08

## 1. Ecosystem Overview

The AI inference ecosystem is in a DeepSeek-V4 stabilization cycle: vLLM, SGLang, llama.cpp, and Ollama all touched DSv4-family issues in the last 24h, yet none of the serving engines considers it production-safe — independent reports of output corruption, NaN crashes, and hardware-specific kernel failures outnumber completed fixes. Meanwhile llama.cpp shipped 10 rolling releases (b10299→b10312) and Unsloth shipped v2026.8.8, confirming that release cadence is now decoupled from model-family maturity. The frontier has shifted to Blackwell/SM120 enablement, online quantization (MXFP4/FP8), and KV-cache economics — all three produced both new optimizations and new regressions. LiteLLM is the only project with zero release activity but significant router/billing work, reflecting a gateway layer that is stabilizing rather than expanding. Overall: fast integration, uneven correctness, and a heightened need for pinning and canary validation.

## 2. Activity Comparison

*Counts are distinct issues/PRs referenced in the digest, not exhaustive GitHub totals.*

| Project | Issues | PRs | Releases (24h) | Primary focus |
|---|---|---|---|---|
| vLLM | 21 | 14 | None | DSv4/DSpark hardening, bounded queues, online MXFP4 |
| SGLang | 17 | 13 | None | DSv4/DSpark NaN/corruption fixes, SM120, VLM transport |
| llama.cpp | 17 | 24 | 10 (b10299→b10312) | Rolling release train, SYCL/Metal/CUDA/aarch64 |
| Ollama | 15 | 10 | None | Regression triage (MLX, CUDA, ROCm), launch UX |
| LiteLLM | 22 | 10 | None | Router affinity/tags, cost-accounting regressions |
| Unsloth | 11 | 14 | v2026.8.8 (PyPI) | Studio hardening, Deep Research budget fixes |

llama.cpp is the clear throughput leader (10 releases, 24 PRs), enabled by its rolling-release model. LiteLLM has the highest issue count but the lowest PR velocity, consistent with a maintenance-heavy gateway layer. vLLM and SGLang have near-identical activity profiles — both in active DSv4 stabilization, neither shipping a release.

## 3. Model Support Race

**DeepSeek-V4-Flash/DSpark — the contested model.** Every engine is chasing it; none has declared it stable:

- **vLLM:** support is incomplete — Ampere SM8x unsupported ([#50576](https://github.com/vllm-project/vllm/issues/50576)), SM120 sparse-MLA routing failure ([#50720](https://github.com/vllm-project/vllm/issues/50720)), ~8× KV-cache blowup on H20 ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- **SGLang:** most advanced integration (TP8, hierarchical cache, unified memory) but with the most severe correctness bugs: DSpark CUDA-graph capture failures ([#33356](https://github.com/sgl-project/sglang/issues/33356)), hierarchical-cache KV position corruption ([#33656](https://github.com/sgl-project/sglang/issues/33656)), concurrency-driven corruption ([#33397](https://github.com/sgl-project/sglang/issues/33397)), SM120 draft-depth corruption ([#33800](https://github.com/sgl-project/sglang/issues/33800)).
- **llama.cpp:** landed DSv4 ops on SYCL ([#26568](https://github.com/ggml-org/llama.cpp/pull/26568)) in b10305; Vulkan/RPC variants still broken ([#25664](https://github.com/ggml-org/llama.cpp/issues/25664), [#26685](https://github.com/ggml-org/llama.cpp/issues/26685)).
- **Ollama:** only a prompt-KV-cache persistence issue ([#17577](https://github.com/ollama/ollama/issues/17577)) — no substantive DSv4 support yet.

**Kimi-K3 (second contested model):** vLLM added ROCm/gfx950 tracking ([#50682](https://github.com/vllm-project/vllm/issues/50682)), a Quark SiTUv2 A8W4 path ([#50813](https://github.com/vllm-project/vllm/pull/50813)), and an FP8 KV-cache prefill fix ([#50181](https://github.com/vllm-project/vllm/pull/50181)). SGLang enabled DSPARK under unified memory ([#33974](https://github.com/sgl-project/sglang/pull/33974)) and deferred vision preprocessing to the DP-selected owner rank ([#33921](https://github.com/sgl-project/sglang/pull/33921)). vLLM leads on hardware breadth; SGLang on spec-decode depth.

**Others:** llama.cpp has the widest net — BailingMoE3/Ling 3.0 ([#26608](https://github.com/ggml-org/llama.cpp/pull/26608)), Longcat-Flash MLA + "zero-computing experts" ([#19182](https://github.com/ggml-org/llama.cpp/pull/19182)), DeepSeek-OCR F32 im2col fix ([#26727](https://github.com/ggml-org/llama.cpp/pull/26727)), DeepSeek4 tensor-split mode ([#26490](https://github.com/ggml-org/llama.cpp/pull/26490)). SGLang added MiniMax-H3 cross-node sequence parallelism ([#33327](https://github.com/sgl-project/sglang/pull/33327)) and a Qwen3-MoE mori a2a fix ([#34006](https://github.com/sgl-project/sglang/pull/34006)). Unsloth added MiniMax H3 text-to-video. LiteLLM added gateway-level entries (Venice, OCI Gemini, Claude Opus 4.7 summarized-thinking fix).

**Bottom line:** llama.cpp leads on breadth of new-model adoption; SGLang leads on DSv4/V4-Flash depth but is paying for it in stability; vLLM is the most conservative, treating DSv4 as a hardening exercise rather than a feature race.

## 4. Performance Frontier

Optimization effort concentrates in six areas:

- **Quantization is moving online/runtime.** vLLM added online MXFP4 for unquantized bf16/fp16 models ([#49347](https://github.com/vllm-project/vllm/pull/49347)) and online quantization of partially pre-quantized checkpoints ([#51392](https://github.com/vllm-project/vllm/pull/51392)), plus an opt-in FlashInfer CuTe-DSL NVFP4 backend ([#49775](https://github.com/vllm-project/vllm/pull/49775)). SGLang is optimizing FP8 per-tensor and blockwise-128×128 GEMMs on SM120 ([#33632](https://github.com/sgl-project/sglang/issues/33632), [#33629](https://github.com/sgl-project/sglang/issues/33629)). llama.cpp fixed NVFP4 UE4M3 scale parsing on SYCL ([#25608](https://github.com/ggml-org/llama.cpp/pull/25608)).

- **KV-cache management is the new battleground.** vLLM tracks an 8× per-token KV blowup on DSv4-Flash ([#51041](https://github.com/vllm-project/vllm/issues/51041)) and opened a session-centric KV orchestration RFC ([#48501](https://github.com/vllm-project/vllm/issues/48501)). SGLang's hierarchical cache has a deterministic position-corruption bug ([#33656](https://github.com/sgl-project/sglang/issues/33656)). LiteLLM attacks the problem at the routing layer: deployment-granular session affinity keeps provider prompt caches warm ([#36146](https://github.com/BerriAI/litellm/pull/36146)). Ollama reports prompt-cache loss after idle despite `keep_alive=-1` ([#17577](https://github.com/ollama/ollama/issues/17577)).

- **Speculative decoding is the top correctness risk.** vLLM's DSpark confidence-scheduled verification ([#47808](https://github.com/vllm-project/vllm/pull/47808)) targets the fixed-k compute collapse at high concurrency; MTP output corruption at concurrency ≥4 remains open ([#35288](https://github.com/vllm-project/vllm/issues/35288)). SGLang reports draft-depth-5 corruption on SM120 ([#33800](https://github.com/sgl-project/sglang/issues/33800)) and a verify window crossing the context boundary ([#33454](https://github.com/sgl-project/sglang/issues/33454)). llama.cpp proposed recurrent-state rollback for hybrid spec decoding ([#25004](https://github.com/ggml-org/llama.cpp/pull/25004)).

- **Batching and queue control.** vLLM introduces `max_num_queued_reqs`/`max_num_queued_tokens` to bound an unbounded wait queue ([#49445](https://github.com/vllm-project/vllm/pull/49445)). llama.cpp's b10312 stops the router from evicting busy models ([#26567](https://github.com/ggml-org/llama.cpp/pull/26567)). SGLang has an open watchdog-timeout on dsv4-flash ([#33393](https://github.com/sgl-project/sglang/issues/33393)).

- **Distributed/multi-node serving.** SGLang leads: MiniMax-H3 cross-node Ulysses+Ring ([#33327](https://github.com/sgl-project/sglang/pull/33327)), MNNVL FABRIC VLM transport ([#33936](https://github.com/sgl-project/sglang/pull/33936)), Gloo tensor broadcast replacing pickle ([#33924](https://github.com/sgl-project/sglang/pull/33924)), CUDA IPC lifecycle fixes ([#33949](https://github.com/sgl-project/sglang/pull/33949)). llama.cpp is shoring up RPC failure containment ([#26724](https://github.com/ggml-org/llama.cpp/pull/26724)). vLLM proposed CUDA checkpoint/restore for near-zero cold-start swap ([#34303](https://github.com/vllm-project/vllm/issues/34303)).

- **Kernel-level wins.** llama.cpp's hipBLASLt-on-RDNA3.5 proposal reports +44.3% BF16 prefill on Ministral-3-8B and +30.2% on granite-4.1-8b ([#26644](https://github.com/ggml-org/llama.cpp/pull/26644)). SGLang landed FlashInfer rmsnorm+quant fusion on SM90/SM100/SM120 ([#33471](https://github.com/sgl-project/sglang/pull/33471)) and an AITER FP8 MLA decode kernel on AMD ([#33993](https://github.com/sgl-project/sglang/pull/33993)). vLLM closed QKNorm+RoPE fusion as slower than unfused on H100 ([#34391](https://github.com/vllm-project/vllm/issues/34391)).

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** production batching, speculative decoding, quantization, multi-GPU serving. Both are in DSv4 stabilization with near-identical activity. vLLM is the reliability-first choice (bounded queues, LoRA/Mamba correctness fixes); SGLang is more aggressive on new features (cross-node, FABRIC, unified memory) at the cost of open corruption bugs. Neither shipped a release in 24h.

- **Local runtime (llama.cpp):** the only project with a true release train. Broadest backend coverage (SYCL, Metal, CUDA, HIP, Vulkan, aarch64) and widest model adoption. Its rapid iteration makes it both the canary for new-model feasibility and the riskiest to pin in production.

- **Consumer runtime/distribution (Ollama):** wraps llama.cpp-class engines with UX and model management. Activity is dominated by regression triage (MLX response contamination, ignored CUDA env vars, ROCm corruption) rather than new capabilities — consistent with a layer that absorbs upstream churn.

- **Gateway (LiteLLM):** no engine work; its frontier is routing intelligence (deployment-level affinity, `&tag` semantics, per-deployment failure policies) and cost/billing accuracy. The two open cost-accounting regressions (Azure gpt-5.6-luna 5× under-report, Fireworks cached-token mis-billing) are the most operationally urgent issues in the entire digest for billing-dependent teams.

- **Fine-tuning/serving hybrid (Unsloth):** unique position — training plus a Studio inference surface. Activity is split between Studio product hardening (per-request telemetry, linear inventory scans, mlock control) and correctness gaps (Deep Research budget burn, VRAM not used for local models).

## 6. Trend Signals

1. **DeepSeek-V4 is the ecosystem's stress test — and it is failing it.** Every supporting engine has open corruption/NaN/crash reports. Pin known-good images and run differential output checks under production concurrency (vLLM [#35288](https://github.com/vllm-project/vllm/issues/35288), SGLang [#33356](https://github.com/sgl-project/sglang/issues/33356)/[#33656](https://github.com/sgl-project/sglang/issues/33656), llama.cpp [#25664](https://github.com/ggml-org/llama.cpp/issues/25664)).

2. **Blackwell SM120/SM121 is a compatibility cliff, not a drop-in upgrade.** New failure modes are appearing across stacks: FP8 W8A8 load assertions (vLLM [#47436](https://github.com/vllm-project/vllm/issues/47436)), Mamba-2 illegal instructions (vLLM [#37431](https://github.com/vllm-project/vllm/issues/37431)), DSPARK depth sensitivity (SGLang [#33800](https://github.com/sgl-project/sglang/issues/33800)), DGX Spark CUDA faults (Ollama [#17596](https://github.com/ollama/ollama/issues/17596)). Expect a quarter of kernel-level churn before these stabilize.

3. **KV-cache economics are becoming a routing problem.** Engine-level hierarchical caches are bleeding-edge but buggy (SGLang [#33656](https://github.com/sgl-project/sglang/issues/33656)); the pragmatic near-term win is LiteLLM's deployment-granular session affinity ([#36146](https://github.com/BerriAI/litellm/pull/36146)) to keep provider-side caches warm. Watch vLLM's session-centric KV RFC ([#48501](https://github.com/vllm-project/vllm/issues/48501)) for the engine-level answer.

4. **Speculative decoding is the top performance lever and the top correctness risk.** Open corruption bugs cluster at higher concurrency or specific draft depths. Do not enable spec decode in production without canary validation; DSpark confidence scheduling (vLLM [#47808](https://github.com/vllm-project/vllm/pull/47808)) is the most promising fix in flight.

5. **MoE memory offload is the next democratization wave.** llama.cpp's host-RAM expert offload ([#26448](https://github.com/ggml-org/llama.cpp/issues/26448)), CUDA expert caching ([#26563](https://github.com/ggml-org/llama.cpp/pull/26563)), and Ollama's equivalent request ([#17557](https://github.com/ollama/ollama/issues/17557)) all target running 16B–35B MoE models on 8–12GB GPUs — the same trade-bandwidth-for-capacity playbook as GGUF quantization.

6. **Gateway cost accuracy is infrastructure risk.** LiteLLM's 5× Azure under-reporting ([#36094](https://github.com/BerriAI/litellm/issues/36094)) and Fireworks cached-token mis-billing ([#32496](https://github.com/BerriAI/litellm/issues/32496)) directly threaten usage-based billing. Reconcile spend logs against provider invoices until these close.

7. **Multimodal transport is mid-refactor everywhere.** SGLang's VLM transport overhaul (CUDA IPC, FABRIC, Gloo) and llama.cpp's image-aware slot save/restore ([#26640](https://github.com/ggml-org/llama.cpp/pull/26640)) signal that multi-node multimodal serving is becoming table stakes for agentic workloads — expect config churn around `--mm-feature-transport` and slot-state semantics in the next releases.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-08

## 1. Today's Highlights

DeepSeek-V4-Flash-0731 and its DSpark speculative variant dominate the digest: new reports cover missing SM8x (A100/A800) support ([#50576](https://github.com/vllm-project/vllm/issues/50576), 87 comments), a FlashInfer sparse-MLA decode routing failure on SM120 Blackwell ([#50720](https://github.com/vllm-project/vllm/issues/50720)), and an ~8× KV-cache blowup per token on H20 that caps max_model_len near 121K ([#51041](https://github.com/vllm-project/vllm/issues/51041)). No new releases shipped in the last 24h; the most active PRs target DSpark confidence-scheduled verification ([#47808](https://github.com/vllm-project/vllm/pull/47808)), online MXFP4 quantization ([#49347](https://github.com/vllm-project/vllm/pull/49347)), and bounded request queues ([#49445](https://github.com/vllm-project/vllm/pull/49445)). Several correctness fixes are in flight, including LoRA `set_lora` normalization ([#51423](https://github.com/vllm-project/vllm/pull/51423)), a Mamba KV-offloading assertion ([#51421](https://github.com/vllm-project/vllm/pull/51421)), and Kimi-K3 FP8 KV-cache prefill selection ([#50181](https://github.com/vllm-project/vllm/pull/50181)).

## 2. Releases & Breaking Changes

No new releases in the last 24h. Config/CLI changes in flight (all unreleased):

- [#49347](https://github.com/vllm-project/vllm/pull/49347) adds a new `--quantization mxfp4` / online-quantization path (`--quantization online --quantization-config '{"linear": "mxfp4", "moe": "mxfp4"}'`) with a Triton fallback.
- [#49445](https://github.com/vllm-project/vllm/pull/49445) introduces `max_num_queued_reqs` and `max_num_queued_tokens` to bound the currently unbounded wait queue.
- Build/deps: [#51424](https://github.com/vllm-project/vllm/pull/51424) skips precompiled-wheel fetch during metadata hooks for `VLLM_USE_PRECOMPILED=1` editable installs; [#51422](https://github.com/vllm-project/vllm/pull/51422) upgrades huggingface-hub to 1.27.0.

## 3. New Model & Hardware Support

- **DeepSeek-V4-Flash-0731 / DSpark**: support is incomplete — Ampere SM8x is not supported ([#50576](https://github.com/vllm-project/vllm/issues/50576)), and SM120 RTX PRO 6000 fails in FlashInfer sparse-MLA decode routing ([#50720](https://github.com/vllm-project/vllm/issues/50720)).
- **Kimi-K3 on ROCm/gfx950**: gap-and-roadmap tracking issue opened ([#50682](https://github.com/vllm-project/vllm/issues/50682)); opt-in Quark SiTUv2 A8W4 routed-MoE path ([#50813](https://github.com/vllm-project/vllm/pull/50813)); FP8 KV-cache prefill fix ([#50181](https://github.com/vllm-project/vllm/pull/50181)).
- **Quantization**: online MXFP4 for unquantized bf16/fp16 models ([#49347](https://github.com/vllm-project/vllm/pull/49347)); online quantization of partially pre-quantized checkpoints from any quant method ([#51392](https://github.com/vllm-project/vllm/pull/51392)); opt-in FlashInfer CuTe-DSL NVFP4 activation-quantization backend ([#49775](https://github.com/vllm-project/vllm/pull/49775)).
- **DFlash bring-up tracker closed** — standard non-causal DFlash models are supported ([#46105](https://github.com/vllm-project/vllm/issues/46105)).

## 4. Performance & Optimization

- **GLM 5.2 performance sprint** is active with tracked tasks and linked PRs ([#46654](https://github.com/vllm-project/vllm/issues/46654)).
- [#47808](https://github.com/vllm-project/vllm/pull/47808) proposes confidence-scheduled DSpark verification: adaptively size the draft-verification budget per request instead of fixed-k, which collapses at high concurrency once verifying 7 drafts costs more compute than accepted tokens return.
- [#49445](https://github.com/vllm-project/vllm/pull/49445) targets unbounded TTFT growth by bounding wait-queue depth at the engine.
- RFC [#34303](https://github.com/vllm-project/vllm/issues/34303) proposes CUDA checkpoint/restore for near-zero cold-start model swapping (14 👍).
- **KV-cache capacity regression to track**: DeepSeek-V4-Flash-0731 uses ~8× more KV-cache per token than the preview checkpoint (~56 bytes/token → only ~150K tokens in 7.7 GiB on H20 TP=2) ([#51041](https://github.com/vllm-project/vllm/issues/51041)).
- Closed findings: QKNorm+RoPE fusion is slower than unfused on H100 ([#34391](https://github.com/vllm-project/vllm/issues/34391)); batch invariance remains CC 9.0+ only, no A100 plan ([#32658](https://github.com/vllm-project/vllm/issues/32658)).

## 5. Stability & Regressions

Issues updated in the last 24h, ranked by severity:

1. **DeepSeek-V4-Flash-0731 on Blackwell (SM120)**: FlashInfer sparse-MLA decode routing failure on RTX PRO 6000 ([#50720](https://github.com/vllm-project/vllm/issues/50720)). No fix PR yet.
2. **MTP speculative decoding corrupts output at concurrency ≥ 4** (V1 engine) ([#35288](https://github.com/vllm-project/vllm/issues/35288)). Open; no fix PR linked.
3. **Block-scaled FP8 W8A8 (compressed-tensors) crashes on load on SM120**: DeepGEMM "Unknown SF transformation" assertion ([#47436](https://github.com/vllm-project/vllm/issues/47436)). Open.
4. **Mamba-2 Triton kernels crash with illegal instruction on SM121** (DGX Spark) unless `CUDA_LAUNCH_BLOCKING=1` ([#37431](https://github.com/vllm-project/vllm/issues/37431)). Open.
5. **Tool-call parsing failures with DeepSeek-V3.2** ([#36654](https://github.com/vllm-project/vllm/issues/36654)); Gemma 4 torch._dynamo fake-tensor failure ([#38884](https://github.com/vllm-project/vllm/issues/38884)); shared-memory broadcast timeout under load ([#35465](https://github.com/vllm-project/vllm/issues/35465)). Open.
6. **Fix PRs in flight**: LoRA `MergedColumnParallelLinearWithLoRA.set_lora()` single-tensor `lora_a` normalization ([#51423](https://github.com/vllm-project/vllm/pull/51423)); Mamba + KV-offloading `truncate_computed_blocks` assertion ([#51421](https://github.com/vllm-project/vllm/pull/51421)); Kimi-K3 fp8 KV-cache prefill query quantization ([#50181](https://github.com/vllm-project/vllm/pull/50181)); ROCm TileLang import deferral to avoid wrong TVM/HIP stubs ([#51159](https://github.com/vllm-project/vllm/pull/51159)); ROCm Mori eager-import guard restored ([#51110](https://github.com/vllm-project/vllm/pull/51110)); ROCm CI keeps rocprofiler-sdk out of DeepEP HT MoE test workers to avoid teardown SIGSEGV ([#51173](https://github.com/vllm-project/vllm/pull/51173)).
7. **Recently closed/resolved**: prefix-caching + MTP 20% accuracy drop ([#43559](https://github.com/vllm-project/vllm/issues/43559)); GLM-5 FP8 H200 OOM in sparse_attn_indexer ([#34553](https://github.com/vllm-project/vllm/issues/34553)); Gemma 4 31B incoherent responses at high context ([#51140](https://github.com/vllm-project/vllm/issues/51140)); Qwen3.6-35B-A3B/-FP8 failures on Intel XPU 4×B70 ([#50850](https://github.com/vllm-project/vllm/issues/50850)).

## 6. What This Means for Application Developers

- **Validate hardware and context length before adopting DeepSeek-V4-Flash-0731 / DSpark.** Ampere GPUs are unsupported ([#50576](https://github.com/vllm-project/vllm/issues/50576)), SM120 Blackwell fails in the sparse-MLA kernel ([#50720](https://github.com/vllm-project/vllm/issues/50720)), and on H20 the 8× KV-cache footprint cuts usable context to ~121K tokens ([#51041](https://github.com/vllm-project/vllm/issues/51041)) — the original V4-Flash checkpoint may be the safer default for now.
- **Treat speculative decoding as a correctness risk at high concurrency.** MTP at concurrency ≥ 4 can silently corrupt outputs ([#35288](https://github.com/vllm-project/vllm/issues/35288)); pin versions and run differential checks. DSpark confidence scheduling ([#47808](https://github.com/vllm-project/vllm/pull/47808)) should improve spec-decode efficiency under saturation once merged.
- **Plan for bounded queues.** The engine currently accepts requests into an unbounded wait queue; `max_num_queued_reqs` / `max_num_queued_tokens` ([#49445](https://github.com/vllm-project/vllm/pull/49445)) will be the first-party lever for TTFT SLOs once released. Until then, pre-admission must happen at the router.
- **Tool-calling with DeepSeek-V3.2 remains flaky** ([#36654](https://github.com/vllm-project/vllm/issues/36654)) — keep fallback parsing and monitor tool-call failure rates in production.
- **Watch hardware-specific stability on SM120/SM121.** FP8 W8A8 load crashes ([#47436](https://github.com/vllm-project/vllm/issues/47436)) and Mamba-2 illegal instructions ([#37431](https://github.com/vllm-project/vllm/issues/37431)) mean new Blackwell/GB10 deployments should pin known-good kernel/backend configs.
- **Agentic workloads:** an early-stage RFC on session-centric KV-cache orchestration ([#48501](https://github.com/vllm-project/vllm/issues/48501)) is worth tracking for multi-turn state management, and standardized entrypoint error types are under discussion ([#48227](https://github.com/vllm-project/vllm/issues/48227)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-08

## 1. Today's Highlights
The project remains in heavy DeepSeek-V4/Flash stabilization: multiple open correctness bugs under DSpark speculative decoding and hierarchical KV caches are under active investigation, with fix PR [#33974](https://github.com/sgl-project/sglang/pull/33974) targeting two NaN root causes discovered while wiring DSPARK through unified memory. Blackwell/SM120 optimization work is accelerating (FP8 per-tensor/blockwise GEMM, MoE shared-expert fusion), and a large VLM multimodal-transport overhaul (CUDA IPC lifecycle, MNNVL FABRIC, Gloo tensor broadcast) is moving through review. No new releases shipped in the last 24h.

## 2. Releases & Breaking Changes
None. No releases or release candidates were published in the last 24 hours; no deprecation or migration notices appeared in the issue/PR set.

## 3. New Model & Hardware Support
- **DeepSeek-V4 (DSv4) / AITER on AMD**: [#33993](https://github.com/sgl-project/sglang/pull/33993) integrates an aiter FP8 ASM MLA decode kernel into the unified_kv path, plus a store-time FP8 mirror pool for graph-safe decode.
- **MiniMax-H3 cross-node sequence parallelism**: [#33327](https://github.com/sgl-project/sglang/pull/33327) combines node-local Ulysses with cross-node Ring attention and adds `--nnodes`/`--node-rank`/`--dist-init-addr` launch infra.
- **Qwen3-MoE with mori a2a backend** is fixed by [#34006](https://github.com/sgl-project/sglang/pull/34006) — an exact enum-match bug caused expert-parallel all-reduce on already-combined output (DSv2/DSv4/GLM4 already handled; Qwen3 was missed).
- **HiCache on Ascend**: [#32275](https://github.com/sgl-project/sglang/pull/32275) adds D2H/H2D transfer paths for Mamba host pools on Ascend NPU, with a nightly E2E test for Qwen3.5-0.8B Mamba.
- **Kimi-K3**: [#33921](https://github.com/sgl-project/sglang/pull/33921) defers CPU-transport image preprocessing (resize/normalize/patchify/H2D) until DP load balancing selects the vision-owner rank; [#33974](https://github.com/sgl-project/sglang/pull/33974) enables DSPARK speculative decoding under unified memory for Kimi-K3.
- **VLM FABRIC transport**: [#33936](https://github.com/sgl-project/sglang/pull/33936) adds `--mm-feature-transport fabric` for multi-node GB200/GB300 MNNVL deployments, auto-selected when IMEX is detected.
- **SM120/Blackwell feature requests** (open, from b8zhong): per-tensor FP8 GEMM optimization [#33632](https://github.com/sgl-project/sglang/issues/33632), FP8 blockwise (128×128) GEMM [#33629](https://github.com/sgl-project/sglang/issues/33629), and shared-to-sparse experts fusion for Qwen3.5/3.6 MoE [#33706](https://github.com/sgl-project/sglang/issues/33706).

## 4. Performance & Optimization
- **SM120 Performance Optimization Plan** ([#19637](https://github.com/sgl-project/sglang/issues/19637), 23 comments, 20 👍): DeepSeek V4 and DeepGEMM MQA Indexer are done; DeepSeek V4 Flash work remains open.
- **FlashInfer rmsnorm + quant fusion** on SM90/SM100/SM120 ([#33471](https://github.com/sgl-project/sglang/pull/33471)) — runtime support for the fusions tracked in #32994.
- **EAGLE top-k=1 on ROCm** ([#34005](https://github.com/sgl-project/sglang/pull/34005)) avoids materializing the full softmax tensor by using AITER's existing `greedy_sample` kernel.
- **VLM feature transport wins** (mickqian series): [#33952](https://github.com/sgl-project/sglang/pull/33952) keeps encoder-DP proxies lazy and reconstructs features only on owner attention-TP ranks (relevant at TP8); [#33924](https://github.com/sgl-project/sglang/pull/33924) broadcasts large CPU features via Gloo tensor collectives instead of pickle `broadcast_pyobj`; [#33949](https://github.com/sgl-project/sglang/pull/33949) fixes the pooled CUDA IPC producer-ready race and early pool reuse with stream-ordered readiness/ack.
- **[jit_kernel] namespace unification** ([#33400](https://github.com/sgl-project/sglang/pull/33400)) moves all JIT C++ into `namespace sglang` — cleanup that reduces ODR/linkage risk in the JIT pipeline.

## 5. Stability & Regressions
Ranked by severity (all open unless noted; fix PRs called out):

- **Critical — DSpark CUDA-Graph illegal memory on TP8** ([#33356](https://github.com/sgl-project/sglang/issues/33356)): official v0.5.16 image, DeepSeek-V4-Pro-DSpark, TP8; stable only for `bs <= 32`, larger decode capture fails non-deterministically. 18 comments, no fix PR yet.
- **Critical — hierarchical cache KV position corruption** ([#33656](https://github.com/sgl-project/sglang/issues/33656)): deterministic SWA `TAIL_K_SWA write_position` corruption with DeepSeek-V4 + hierarchical cache, cascading into NaN sampling crashes. No fix PR.
- **High — DSv4-Flash progressive corruption under concurrency** ([#33397](https://github.com/sgl-project/sglang/issues/33397)): 2×H200, TP=2, DP attention; output degrades over time, community suspects state races.
- **High — DSPARK draft depth 5 corrupts output on SM120** ([#33800](https://github.com/sgl-project/sglang/issues/33800)): checkpoint-default depth 5 is corrupted while depths 3/4/6/7 are clean; no fix PR.
- **High — Kimi-K3 [PAD] storms + DSPARK NaN asserts** ([#32968](https://github.com/sgl-project/sglang/issues/32968)): root cause believed to be the write-side NaN bug fixed by #32477, but released kimi-k3 image predates that fix — and `allowed_special="all"` lets `[PAD]` be injected.
- **High — DSpark verify window crosses context boundary** ([#33454](https://github.com/sgl-project/sglang/issues/33454)): illegal RoPE read when the verify window exceeds the model context.
- **Medium — dsv4-flash watchdog timeout** under 0.5.16 ([#33393](https://github.com/sgl-project/sglang/issues/33393)).
- **Medium — `reasoning_effort` off-by-one for DSv4-Flash-0731** ([#33185](https://github.com/sgl-project/sglang/issues/33185)): `high` is a no-op and vendor `max` is unreachable.
- **Fixes in flight**: [#33974](https://github.com/sgl-project/sglang/pull/33974) fixes two real NaN/corruption root causes under unified memory (page hand-out zeroing, CuTe int32 slot-stride wrap); [#34006](https://github.com/sgl-project/sglang/pull/34006) fixes Qwen3-MoE garbage with mori a2a.
- **Closed with resolution**: inference_mode mismatch breaking lazy buffers ([#33470](https://github.com/sgl-project/sglang/issues/33470)); DSv4-Flash-0731 on Ampere/A800 blockers ([#33194](https://github.com/sgl-project/sglang/issues/33194)); qwen3.6 tool-call-parser issue ([#25242](https://github.com/sgl-project/sglang/issues/25242)); MiniMax-H3 `/health` warmup bypass ([#33719](https://github.com/sgl-project/sglang/issues/33719)).
- **CI health**: tracking issue [#17050](https://github.com/sgl-project/sglang/issues/17050) reports 3 broken and 11 flaky tests on `main` (auto-updated 2026-08-07).

## 6. What This Means for Application Developers
- **Treat DeepSeek-V4/Flash + DSPARK as not-yet-production-safe.** There are several independent corruption/NaN reports (TP8 CUDA-graph capture, concurrency-driven corruption on H200, SM120 draft-depth sensitivity, hierarchical-cache position corruption). If you serve these models, pin to a known-good image, avoid the DSPARK depth-5 default on SM120 (3/4/6/7 are reported clean), and validate outputs with canary checks under the exact concurrency/TP you plan to run.
- **`reasoning_effort` is currently unreliable for DSv4-Flash-0731** — `high` maps to a no-op and the vendor's `max` level is unreachable; don't tune around that knob yet.
- **Backport/watchlist**: the two fix PRs [#33974](https://github.com/sgl-project/sglang/pull/33974) (NaN root causes under unified memory) and [#34006](https://github.com/sgl-project/sglang/pull/34006) (Qwen3-MoE mori corruption) touch correctness, not just performance — worth tracking for your next image bump.
- **Multimodal serving on multi-node is about to get faster**, but it's mid-refactor: the CUDA IPC lifecycle fix ([#33949](https://github.com/sgl-project/sglang/pull/33949)), Gloo large-feature broadcast ([#33924](https://github.com/sgl-project/sglang/pull/33924)), and FABRIC transport ([#33936](https://github.com/sgl-project/sglang/pull/33936)) all landed in the review window — expect config churn around `--mm-feature-transport` in the next release; `cpu` remains the opt-out path.
- **CI is degraded**: 3 broken / 11 flaky on `main` means merge-candidate regressions are possible; verify against the commit you actually run rather than relying on `main` stability.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

## llama.cpp Digest — 2026-08-08

### Today's Highlights
The release train moved from **b10299** to **b10312**, with the most user-visible change being [b10312](https://github.com/ggml-org/llama.cpp/releases/tag/b10312): the server router no longer evicts busy models. Backend work continues across SYCL, Metal, CUDA, and aarch64, including DeepSeek-V4 DSv4 operator support and a Qwen3-TTS correctness fix. On the PR side, MoE-related performance work is active: CUDA fused expert reduction, expert caching, and hipBLASLt-on-RDNA3.5 all saw movement.

### Releases & Breaking Changes
- [b10312](https://github.com/ggml-org/llama.cpp/releases/tag/b10312) — server/router: do not evict busy models ([#26567](https://github.com/ggml-org/llama.cpp/pull/26567)).
- [b10311](https://github.com/ggml-org/llama.cpp/releases/tag/b10311) — mtmd: stops extra text-stream feeding during Qwen3-TTS generation ([#26706](https://github.com/ggml-org/llama.cpp/pull/26706)).
- [b10310](https://github.com/ggml-org/llama.cpp/releases/tag/b10310) — ggml: adds aarch64 HWCAP fallbacks and fixes FP16 variant detection; internal rename `has_fp16_va` → `has_fp16` ([#25554](https://github.com/ggml-org/llama.cpp/pull/25554)).
- [b10308](https://github.com/ggml-org/llama.cpp/releases/tag/b10308) — mitigates Windows MSYS2 UCRT64 / GCC 16.1.0 crashing issue ([#26555](https://github.com/ggml-org/llama.cpp/pull/26555)).
- [b10307](https://github.com/ggml-org/llama.cpp/releases/tag/b10307) — SYCL: fixes NVFP4 UE4M3 scale parsing ([#25608](https://github.com/ggml-org/llama.cpp/pull/25608)).
- [b10306](https://github.com/ggml-org/llama.cpp/releases/tag/b10306) — SYCL: consolidated fused-GLU kernels and added SWIGLU perf coverage ([#26354](https://github.com/ggml-org/llama.cpp/pull/26354)).
- [b10305](https://github.com/ggml-org/llama.cpp/releases/tag/b10305) — SYCL: DeepSeek-V4 DSv4 ops (`LIGHTNING_INDEXER`, `DSV4_HC_*`) ([#26568](https://github.com/ggml-org/llama.cpp/pull/26568)).
- [b10303](https://github.com/ggml-org/llama.cpp/releases/tag/b10303) — SYCL: fixes `FLASH_ATTN_EXT` error on Arc770 ([#26441](https://github.com/ggml-org/llama.cpp/pull/26441)).
- [b10301](https://github.com/ggml-org/llama.cpp/releases/tag/b10301) — CUDA: removes unused-variable/function warnings ([#26688](https://github.com/ggml-org/llama.cpp/pull/26688)).
- [b10299](https://github.com/ggml-org/llama.cpp/releases/tag/b10299) — Metal: avoids `threadgroup` matrix array instantiation in `kernel_lightning_indexer` ([#26646](https://github.com/ggml-org/llama.cpp/pull/26646)).

No user-facing API or GGUF format changes were merged in this window. Watch two in-flight spec/build changes: [PR #26675](https://github.com/ggml-org/llama.cpp/pull/26675) proposes updating the `ggml_prec` accumulator/source-data specification, and [PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696) would make HIP `-funsafe-math-optimizations` opt-in via `GGML_HIP_UNSAFE_MATH` (default OFF).

### New Model & Hardware Support
- **DeepSeek-V4 DSv4 ops on SYCL** — landed in [b10305](https://github.com/ggml-org/llama.cpp/releases/tag/b10305) ([#26568](https://github.com/ggml-org/llama.cpp/pull/26568)).
- **BailingMoE3 support** — [PR #26608](https://github.com/ggml-org/llama.cpp/pull/26608) adds support for Ling 3.0 flash with MTP.
- **Longcat-Flash support** — [PR #19182](https://github.com/ggml-org/llama.cpp/pull/19182) adds MLA + “zero-computing experts” support; still needs testing.
- **DeepSeek4 `-sm tensor`** — [PR #26490](https://github.com/ggml-org/llama.cpp/pull/26490) adds tensor-split-mode support, with mirrored FA for single-K-head DeepSeek4.
- **DeepSeek-OCR** — [PR #26727](https://github.com/ggml-org/llama.cpp/pull/26727) keeps SAM convolution im2col in F32 to avoid OCR quality loss on CUDA.
- **aarch64 CPU detection** — [b10310](https://github.com/ggml-org/llama.cpp/releases/tag/b10310) adds HWCAP fallbacks and improves FP16 variant detection ([#25554](https://github.com/ggml-org/llama.cpp/pull/25554)).
- **CUDA 13.4 ARM64 Windows builds** — [PR #26650](https://github.com/ggml-org/llama.cpp/pull/26650) adds ARM64 CUDA 13.4 CI/build support.

### Performance & Optimization
- **hipBLASLt on RDNA3.5** — [PR #26644](https://github.com/ggml-org/llama.cpp/pull/26644) proposes enabling hipBLASLt by default on RDNA3.5. Reported pp512 BF16 prefill gains: Ministral-3-8B **+44.3%** (1004.9 → 1450.1 t/s), granite-4.1-8b **+30.2%** (1108.7 → 1443.3 t/s).
- **CUDA quantized copy kernels** — [PR #26731](https://github.com/ggml-org/llama.cpp/pull/26731) fixes 1-thread-per-block launches and `ne` vs `ne/32` block counts in `cpy.cu`.
- **SYCL GLU flat path** — [b10306](https://github.com/ggml-org/llama.cpp/releases/tag/b10306) consolidates fused-GLU kernels and adds SwiGLU perf coverage ([#26354](https://github.com/ggml-org/llama.cpp/pull/26354)).
- **In progress:** CUDA fused MoE weighted expert reduction ([#25952](https://github.com/ggml-org/llama.cpp/pull/25952)), CUDA expert caching via `-ehs N` ([#26563](https://github.com/ggml-org/llama.cpp/pull/26563)), and recurrent-state rollback equal splits for hybrid speculative decoding ([#25004](https://github.com/ggml-org/llama.cpp/pull/25004)).
- **Open MoE memory proposal** — [Issue #26448](https://github.com/ggml-org/llama.cpp/issues/26448) proposes keeping MoE expert weights in host RAM and reading them over PCIe DMA, with real measurements on RTX 4090.
- **Open performance question** — Gemma 4 tg128 on RTX 5060 Ti/Blackwell appears abnormally slow vs other architectures ([#26674](https://github.com/ggml-org/llama.cpp/issues/26674)).

### Stability & Regressions
**High severity / active**
- Vulkan `DeviceLost` within a few turns on DeepSeek-V4-Flash / RADV Strix Halo — [Issue #25664](https://github.com/ggml-org/llama.cpp/issues/25664).
- DeepSeek-V4 garbled output over RPC + Vulkan remains open ([#26685](https://github.com/ggml-org/llama.cpp/issues/26685)); related RPC crash reports continue to be a theme ([#25633](https://github.com/ggml-org/llama.cpp/issues/25633)). [PR #26724](https://github.com/ggml-org/llama.cpp/pull/26724) would stop remote-server failures from aborting the whole process.
- AMD Strix Halo ROCm/HIP: input layers on CPU cause high CPU usage and lower GPU utilization — [Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700).
- ROCm 7.14 fails with missing `libhipblas.so.3` — [Issue #25807](https://github.com/ggml-org/llama.cpp/issues/25807).
- Vulkan `DeviceLost` on Vega 8 iGPU at ~50K context — [Issue #26447](https://github.com/ggml-org/llama.cpp/issues/26447).
- Compile failure in `ggml-cpu/simd-mappings.h` with `__fp16` — [Issue #26677](https://github.com/ggml-org/llama.cpp/issues/26677).

**Closed / likely fixed**
- Qwen3-TTS repeats phrase and does not stop on `codec_eos` — [Issue #26700](https://github.com/ggml-org/llama.cpp/issues/26700) closed; fix landed in [b10311](https://github.com/ggml-org/llama.cpp/releases/tag/b10311) ([#26706](https://github.com/ggml-org/llama.cpp/pull/26706)).
- Router queues model loads instead of unloading busy models — [Issue #21678](https://github.com/ggml-org/llama.cpp/issues/21678) closed; addressed by b10312 ([#26567](https://github.com/ggml-org/llama.cpp/pull/26567)).
- Windows MSYS2 UCRT64 crash addressed in [b10308](https://github.com/ggml-org/llama.cpp/releases/tag/b10308) ([#26555](https://github.com/ggml-org/llama.cpp/pull/26555)).

**Other open issues**
- Gemma MTP “Tensor in buffer cannot run” — [Issue #24366](https://github.com/ggml-org/llama.cpp/issues/24366).
- Same K/V cache type enforced for models with no V cache — [Issue #26382](https://github.com/ggml-org/llama.cpp/issues/26382).
- Windows OpenVINO cannot use the GPU device — [Issue #26393](https://github.com/ggml-org/llama.cpp/issues/26393).
- Windows Defender false positive on b10195 CPU x64 build — [Issue #26343](https://github.com/ggml-org/llama.cpp/issues/26343).
- Server still blocks context sizes beyond the model’s native RoPE — [Issue #17459](https://github.com/ggml-org/llama.cpp/issues/17459).

### What This Means for Application Developers
- **Multi-model serving:** upgrade to [b10312](https://github.com/ggml-org/llama.cpp/releases/tag/b10312) so busy router slots are not evicted mid-query. This closes the long-running router behavior issue [#21678](https://github.com/ggml-org/llama.cpp/issues/21678).
- **TTS pipelines:** if you serve Qwen3-TTS, the [b10311](https://github.com/ggml-org/llama.cpp/releases/tag/b10311) fix is important for clean `codec_eos` termination.
- **RPC deployments:** remote-node failure containment is still incomplete. [PR #26724](https://github.com/ggml-org/llama.cpp/pull/26724) is the pending improvement; keep monitoring if you split workloads across RPC backends.
- **MoE on limited VRAM:** watch expert caching ([#26563](https://github.com/ggml-org/llama.cpp/pull/26563)) and host-RAM expert offload via PCIe DMA ([#26448](https://github.com/ggml-org/llama.cpp/issues/26448)) if you need to run large MoE models on small GPUs.
- **RDNA3.5/HIP users:** hipBLASLt prefill gains are substantial ([#26644](https://github.com/ggml-org/llama.cpp/pull/26644)); test it in your workload once merged.
- **Observability:** per-device memory usage is still not exposed by the server — [Issue #26129](https://github.com/ggml-org/llama.cpp/issues/26129) tracks the request.
- **Multimodal state persistence:** image-aware slot save/restore is in flight ([PR #26640](https://github.com/ggml-org/llama.cpp/pull/26640)), which will matter for long-running agent sessions with image inputs.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-08

## Today's Highlights

No new releases landed in the last 24 hours. The most urgent signals are correctness and regression bugs in newer hardware paths: a deterministic CUDA illegal memory access on DGX Spark, MLX cross-request response contamination under long-lived runners, and ROCm output corruption on AMD `gfx1151`. On the fix side, PRs are in flight for Windows NTFS mount-point model creation, Laguna parser false tool-call detection, and panic recovery in `/api/create`.

## Releases & Breaking Changes

None in the last 24 hours.

## New Model & Hardware Support

- **MLX vision support** — PR [#17600](https://github.com/ollama/ollama/pull/17600) adds vision capability to the MLX engine, carried from the `dflash` branch.
- **New launch integrations** — PRs add `ollama launch muse` for Meta's Muse Code CLI ([#17594](https://github.com/ollama/ollama/pull/17594)), `ollama launch talos` ([#17589](https://github.com/ollama/ollama/pull/17589)), and a TUI launcher integrations menu ([#17595](https://github.com/ollama/ollama/pull/17595)).

## Performance & Optimization

- **Qwen3.6-35B-A3B regression on Apple M2** — Reported in [#17583](https://github.com/ollama/ollama/issues/17583): after upgrading, Qwen models on Mac Studio M2 (64GB) dropped from ~72 T/s to significantly slower on the same model/prompt/context. No fix PR yet.
- **MoE expert offload feature request** — [#17557](https://github.com/ollama/ollama/issues/17557) asks for MoE experts to live in host RAM with on-demand GPU compute, enabling 16B/35B MoE models on 8GB/12GB GPUs without OOM.
- **Benchmark tooling** — PR [#17480](https://github.com/ollama/ollama/pull/17480) replaces the bench prompt generator with HumanEval-based code-continuation tasks.

## Stability & Regressions

Ranked roughly by severity; fix PRs are noted where they exist.

- **CUDA illegal memory access on DGX Spark** — [#17596](https://github.com/ollama/ollama/issues/17596): deterministic crash in `ggml_cuda_flash_attn_ext_mma_f16_case` during large prefill with `qwen3-coder-next:q4_K_M` (head size 256). No fix PR.
- **MLX long-lived runner response contamination** — [#17599](https://github.com/ollama/ollama/issues/17599): with `OLLAMA_KEEP_ALIVE=-1`, the MLX engine intermittently returns a verbatim answer to an earlier prompt. No fix PR.
- **ROCm Gemma 4 12B corruption on gfx1151** — [#17498](https://github.com/ollama/ollama/issues/17498): corrupted output at ~1,166–1,200 prompt tokens on AMD Radeon 8060S under Windows. No fix PR.
- **AMD Radeon 8060S / Ryzen AI MAX+ 395 incorrect output** — [#17604](https://github.com/ollama/ollama/issues/17604): semantically wrong generation with Vulkan/ROCm acceleration; issue closed with no linked fix.
- **Qwen2.5-3B tokenizer mis-detection on Windows CPU** — [#17587](https://github.com/ollama/ollama/issues/17587): Chinese input produces garbage ASCII tokens. No fix PR.
- **Windows NTFS volume mount point create failure** — [#17591](https://github.com/ollama/ollama/issues/17591): `ollama create` fails with `400 Bad Request: invalid model name`. Fix PRs: [#17608](https://github.com/ollama/ollama/pull/17608), [#17607](https://github.com/ollama/ollama/pull/17607).
- **Laguna parser treats JSON content as tool call** — [#17602](https://github.com/ollama/ollama/issues/17602): ordinary JSON in replies can abort/corrupt output. Fix PR: [#17603](https://github.com/ollama/ollama/pull/17603).
- **CUDA environment variable regression** — [#17609](https://github.com/ollama/ollama/issues/17609): `CUDA_VISIBLE_DEVICES` and similar vars are no longer respected in newer versions. No fix PR.
- **DeepSeek-V4 prompt KV cache lost after idle** — [#17577](https://github.com/ollama/ollama/issues/17577): cache is lost despite identical prefix and `OLLAMA_KEEP_ALIVE=-1`. No fix PR.
- **Context deadline exceeded on many HF GGUF models** — [#17484](https://github.com/ollama/ollama/issues/17484). No fix PR.
- **Tool parameter `enum` not enforced** — [#17597](https://github.com/ollama/ollama/issues/17597): model can emit values outside the declared enum. No fix PR.
- **DocTags missing with Docling + granite_docling** — [#17585](https://github.com/ollama/ollama/issues/17585). No fix PR.
- **Mac "Restart to update" still broken for non-admin accounts** — [#11972](https://github.com/ollama/ollama/issues/11972). No fix PR.

Additional robustness PRs: [#17606](https://github.com/ollama/ollama/pull/17606) recovers panics in `CreateHandler`'s model conversion goroutine, and [#17590](https://github.com/ollama/ollama/pull/17590) prevents digest read errors from terminating the entire server.

## What This Means for Application Developers

- **Pin Ollama versions in production.** Multiple regressions are tied to recent upgrades (Qwen perf on Apple Silicon, CUDA env var handling, AMD/ROCm correctness). Verify against a pinned version before rolling out.
- **Avoid `keep_alive=-1` on the MLX engine** until [#17599](https://github.com/ollama/ollama/issues/17599) is fixed; long-lived runners can return responses from earlier requests.
- **Be careful with large-prefill workloads on DGX Spark / GB10** — Qwen3-Next 80B-A3B or other head-size-256 models can deterministically trigger a CUDA fault.
- **Tool-calling correctness is still fragile**: the Laguna parser fix ([#17603](https://github.com/ollama/ollama/pull/17603)) is important if you rely on non-tagged JSON tool output, and `enum` constraints are not enforced during decoding, so validate tool arguments client-side.
- **Windows users creating models from NTFS mount points/junctions** should track [#17608](https://github.com/ollama/ollama/pull/17608) or use a direct drive path until fixed.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-08

## Today's Highlights
No releases landed in the last 24 hours, but a long-running cluster of dependency-pinning and CVE issues (python-dotenv, uvicorn, python-multipart, PyO3) is now fully closed, clearing the way for library consumers. The most substantive new work is in the router: deployment-granular session affinity to keep provider prompt caches warm (#36146), per-deployment failure/cooldown overrides (#34416), and a required-AND tag-routing prefix (#36193). Two open cost-accounting regressions — Azure gpt-5.6-luna under-reporting by 5x and Fireworks cached-token billing — warrant attention for teams using usage-based billing.

## Releases & Breaking Changes
None. No new LiteLLM releases were published in the last 24 hours.

## New Model & Hardware Support
- **Venice models**: `venice/grok-code-fast-1` added to `model_prices_and_context_window.json` (issue closed). [BerriAI/litellm#24229](https://github.com/BerriAI/litellm/issues/24229)
- **OCI Gemini models**: support fix closed. [BerriAI/litellm#18166](https://github.com/BerriAI/litellm/issues/18166)
- **Claude Opus 4.7**: `thinking.display="summarized"` handling fixed to prevent silent loss of reasoning content in translation (closed). [BerriAI/litellm#25965](https://github.com/BerriAI/litellm/issues/25965)
- **DeepSeek anthropic-compatible endpoint**: thinking-mode multi-turn support still has an open bug (see Stability). [BerriAI/litellm#31439](https://github.com/BerriAI/litellm/issues/31439)

## Performance & Optimization
- **Deployment-granular session affinity** for the auto-router: pins a session to a specific deployment instead of only the model group, so a fan-out group no longer spreads turns across deployments and provider prompt caches stay warm (PR open). [BerriAI/litellm#36146](https://github.com/BerriAI/litellm/pull/36146)
- **Per-deployment `allowed_fails_policy` and `cooldown_time` overrides** for the router, giving deployment-level failure/cooldown control (PR open). [BerriAI/litellm#34416](https://github.com/BerriAI/litellm/pull/34416)
- **New router tag semantics**: `&tag` required-AND prefix and `allow_fail_open` flag so a model group degrades gracefully instead of erroring when tag constraints match nothing (PR open). [BerriAI/litellm#36193](https://github.com/BerriAI/litellm/pull/36193)
- **OpenTelemetry correction**: `litellm.request.model` is now promoted via baggage instead of `gen_ai.request.model`, so server/DB/guardrail spans correlate the inbound model without being misclassified as GenAI operations (closed). [BerriAI/litellm#35228](https://github.com/BerriAI/litellm/pull/35228)
- **Log correlation**: opt-in `session_id`/`trace_id` enrichment on JSON log records via contextvars (PR open). [BerriAI/litellm#34418](https://github.com/BerriAI/litellm/pull/34418)

## Stability & Regressions
Ranked by severity:

1. **Azure gpt-5.6-luna under-reports cost by 5x** on `main` (regression after v1.95.0) — direct billing impact, still open, no fix PR visible. [BerriAI/litellm#36094](https://github.com/BerriAI/litellm/issues/36094)
2. **Fireworks AI cost calculator ignores cached tokens** — bills 100% of prompt tokens at full input price, ignoring `cache_read_input_cost_token`; open. [BerriAI/litellm#32496](https://github.com/BerriAI/litellm/issues/32496)
3. **v1.81.14 regression: Claude Code fails on thinking + tools** (e.g., kimi-k2.5); works on 1.81.12; open. [BerriAI/litellm#22997](https://github.com/BerriAI/litellm/issues/22997)
4. **v1.83.7 regression: `tool_call.function.arguments` lost** during OpenAI→Anthropic response conversion; open. [BerriAI/litellm#27469](https://github.com/BerriAI/litellm/issues/27469)
5. **DeepSeek anthropic-compatible thinking mode 400s** when assistant history lacks `reasoning_content`; open. [BerriAI/litellm#31439](https://github.com/BerriAI/litellm/issues/31439)
6. **Proxy INFO logging cannot be disabled** via `LITELLM_LOG=ERROR`; long-standing, open. [BerriAI/litellm#10788](https://github.com/BerriAI/litellm/issues/10788)
7. **Lakera v2 guardrail ignores `skip_system_message_in_guardrail` / `skip_tool_message_in_guardrail`**; open. [BerriAI/litellm#34396](https://github.com/BerriAI/litellm/issues/34396)
8. **`batches.create` falls back to wrong model group** and returns the wrong provider's error; open. [BerriAI/litellm#35359](https://github.com/BerriAI/litellm/issues/35359)
9. **Admin UI Usage tab merges model groups** sharing the same underlying model in daily spend; open. [BerriAI/litellm#36172](https://github.com/BerriAI/litellm/issues/36172)

Closed/resolved in this window:
- **Dependency/CVE cluster** — all closed: python-dotenv `==1.0.1` pin conflicts ([#25210](https://github.com/BerriAI/litellm/issues/25210), [#25280](https://github.com/BerriAI/litellm/issues/25280)) and CVE-2026-28684 ([#26333](https://github.com/BerriAI/litellm/issues/26333)); python-multipart `0.0.20` CVE-2026-40347 ([#27472](https://github.com/BerriAI/litellm/issues/27472)); uvicorn `^0.29.0` floor too low ([#11484](https://github.com/BerriAI/litellm/issues/11484)); Python 3.14 install failure from litellm-rust PyO3 0.23.5 ([#33116](https://github.com/BerriAI/litellm/issues/33116)).
- **TPM rate-limit bypass under concurrency** ([#18730](https://github.com/BerriAI/litellm/issues/18730)), **OCI sync streaming `split_chunks` JSONDecodeError** ([#24819](https://github.com/BerriAI/litellm/issues/24819)), **MCP OAuth `refresh_token` grant** ([#23700](https://github.com/BerriAI/litellm/issues/23700)), and **MCP `progressToken` warning** ([#30976](https://github.com/BerriAI/litellm/issues/30976)) — all closed.

Stability fix PRs in flight:
- **SAML-only SSO detection** in Admin UI (AI-generated fix, PR open). [BerriAI/litellm#36196](https://github.com/BerriAI/litellm/pull/36196)
- **MCP path normalization** under `SERVER_ROOT_PATH` (PR open). [BerriAI/litellm#32187](https://github.com/BerriAI/litellm/pull/32187)
- **Recover partial usage on sync mid-stream failure** (PR open). [BerriAI/litellm#35349](https://github.com/BerriAI/litellm/pull/35349)
- **Config agent IDs derived from `agent_name` only** so grants survive static-header secret rotation (PR open). [BerriAI/litellm#36020](https://github.com/BerriAI/litellm/pull/36020)
- **Cached project object invalidation** on update/delete to fix auth staleness and allowlist bypass (closed). [BerriAI/litellm#36028](https://github.com/BerriAI/litellm/pull/36028)

## What This Means for Application Developers
- **Verify cost tracking before trusting it**: with Azure gpt-5.6-luna under-reporting 5x and Fireworks cached-token math wrong, reconcile spend logs against provider invoices if you do usage-based billing or pass-through cost dashboards; watch #36094 and #32496 for fixes.
- **Claude Code / tool-calling users should pin deliberately**: v1.81.14 has a thinking+tools failure and v1.83.7 drops `function.arguments` in OpenAI↔Anthropic translation. If on these versions, pin to 1.81.12 or regression-test before upgrading.
- **Dependency pinning saga is resolved**: the python-dotenv exact pin (plus CVE-2026-28684), python-multipart CVE, uvicorn floor, and PyO3/Python 3.14 issues are all closed — upgrade library consumers to pick up the fixes.
- **Router improvements to watch**: deployment-level session affinity will materially help anyone relying on provider prompt caching, while `&tag` routing and `allow_fail_open` add expressive fail-open semantics for tag-constrained deployments.
- **Auth/admin operators**: SAML-only SSO detection, project cache invalidation, and `agent_name`-derived config agent IDs address real 403 and stale-allowlist scenarios — track these for the next release.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest — 2026-08-08

### Today’s Highlights
Unsloth shipped **v2026.8.8 to PyPI** and bumped installer pins accordingly ([PR #8114](https://github.com/unslothai/unsloth/pull/8114)), while most activity focused on Unsloth Studio hardening: Windows ROCm diffusion loading has a fix in flight ([PR #7981](https://github.com/unslothai/unsloth/pull/7981)), the API monitor now exposes per-request tok/s and TTFT ([PR #8045](https://github.com/unslothai/unsloth/pull/8045)), and local model inventory scans were made linear ([PR #8043](https://github.com/unslothai/unsloth/pull/8043)). Several correctness bugs around Deep Research token budgeting, VRAM residency, and local model selection remain open.

### Releases & Breaking Changes
- **unsloth 2026.8.8** is live on PyPI; `install.sh` / `install.ps1` pins bumped from `>=2026.8.7` to `>=2026.8.8` so fresh installs resolve to the new wheel ([PR #8114](https://github.com/unslothai/unsloth/pull/8114)).
- No other releases or breaking API/config changes were reported in the last 24h.

### New Model & Hardware Support
- **MiniMax H3 text-to-video** with synchronized audio added to Studio’s Video tab — supports official BF16 via Diffusers and quantized GGUF via stable-diffusion.cpp ([PR #7989](https://github.com/unslothai/unsloth/pull/7989)).
- **Windows ROCm diffusion support**: PR [#7981](https://github.com/unslothai/unsloth/pull/7981) fixes [#7992](https://github.com/unslothai/unsloth/issues/7992), working around the `torch.distributed` has no attribute `Work` import failure and improving gated-repo error messaging.
- **Float32 training preserved on no-bf16 GPUs** (T4/V100): mixed-precision selection no longer silently downgrades explicit `dtype=torch.float32` requests ([PR #7867](https://github.com/unslothai/unsloth/pull/7867)).
- Proposed: end-to-end example scripts so users can verify Unsloth on non-CUDA accelerators such as Intel XPU and AMD ROCm ([Issue #8099](https://github.com/unslothai/unsloth/issues/8099)).

### Performance & Optimization
- **Per-request telemetry in Studio API monitor**: adds tok/s, time-to-first-token, stop reason, and busy/queued slot readout ([PR #8045](https://github.com/unslothai/unsloth/pull/8045)).
- **Linear local model inventory scans**: fixes slow Studio model pickers caused by duplicated full HF cache scans, which could add 15–25s on large caches ([PR #8043](https://github.com/unslothai/unsloth/pull/8043), [PR #7983](https://github.com/unslothai/unsloth/pull/7983)).
- **Model memory controls**: new “Keep model in GPU memory” setting vetoes idle auto-unload TTL and passes `--mlock` ([PR #8002](https://github.com/unslothai/unsloth/pull/8002)).
- **GGUF batch settings**: `--batch-size` / `--ubatch-size` exposed as first-class load settings for llama.cpp models ([PR #7973](https://github.com/unslothai/unsloth/pull/7973)).
- **Deep Research context clamping**: `max_tokens` is now clamped to the loaded context window, fixing cases where 16,384 completion tokens were requested on a 12,288-context model, causing wall-truncation and `finish_reason: length` ([PR #7985](https://github.com/unslothai/unsloth/pull/7985)).
- **Known AMD performance pathology**: Z-Image GGUF at 1024×1024, 20 steps took 48m25s on a 16GB Windows ROCm card; only 1m47s was sampling at 5.40 s/it, with the rest spent paging submodules and decoding VAE tiles ([Issue #8081](https://github.com/unslothai/unsloth/issues/8081)).

### Stability & Regressions
- **CI breakage on `main`**: `Core (HF=latest + TRL=latest)` fails because `_DummyTrainer` leaves `data_collator` unassigned, reddening every open PR ([Issue #7708](https://github.com/unslothai/unsloth/issues/7708)). No explicit fix PR is in this batch.
- **CI false positives fixed/contained**:
  - Contract tests pinned to spelling instead of behavior; PR [#8115](https://github.com/unslothai/unsloth/pull/8115) relaxes them.
  - `huggingface_hub 1.27.0` HTTP backoff loop flagged as a C2 beacon by scanner; PR [#8110](https://github.com/unslothai/unsloth/pull/8110) baselines it.
  - `unsloth studio update` could report success without upgrading; fixed in [PR #8112](https://github.com/unslothai/unsloth/pull/8112).
- **Linux desktop silent crash**: packaged app exits with rc=1 immediately after backend spawn due to a fatal X11 I/O error swallowed by GTK; issue closed, no explicit fix PR listed ([Issue #8062](https://github.com/unslothai/unsloth/issues/8062)).
- **Deep Research zero-output budget burn**: a stream that never produces a token still consumes the full 900s budget. Closed as a follow-up, but no fix PR is visible in this batch ([Issue #7964](https://github.com/unslothai/unsloth/issues/7964)).
- **VRAM not used on local models**: Studio recognizes the GPU for compute but uses system RAM for inference ([Issue #7449](https://github.com/unslothai/unsloth/issues/7449)).
- **Local model replaced by Unsloth version**: selecting a local model for fine-tuning causes Studio to re-download the corresponding Unsloth HF version ([Issue #8113](https://github.com/unslothai/unsloth/issues/8113)).
- **Speculative decoding model not detected** when models live in custom folders ([Issue #8077](https://github.com/unslothai/unsloth/issues/8077)).
- **ANSI escape codes render as literal text** in Studio’s tool output pane ([Issue #7962](https://github.com/unslothai/unsloth/issues/7962)).
- **Docker Hub image is two months old**; request to rebuild remains open ([Issue #7999](https://github.com/unslothai/unsloth/issues/7999)).
- **AMD Windows diffusion load failure** still tracked by [#7992](https://github.com/unslothai/unsloth/issues/7992); open fix in [PR #7981](https://github.com/unslothai/unsloth/pull/7981).

### What This Means for Application Developers
- If you are building agents on Studio, **Deep Research token clamping** ([PR #7985](https://github.com/unslothai/unsloth/pull/7985)) prevents silent truncation when the requested context exceeds the loaded model window.
- **API monitor telemetry** ([PR #8045](https://github.com/unslothai/unsloth/pull/8045)) gives you tok/s, TTFT, and slot utilization per request — useful for queueing and capacity logic.
- **Local tool calling for OAI-compatible remote models** is in progress, which would enable Search/Code/MCP for Ollama, llama.cpp, vLLM, and custom connections ([PR #7330](https://github.com/unslothai/unsloth/pull/7330)).
- For long-running server workloads, **“Keep model in GPU memory” + `--mlock`** ([PR #8002](https://github.com/unslothai/unsloth/pull/8002)) and **GGUF batch-size settings** ([PR #7973](https://github.com/unslothai/unsloth/pull/7973)) give operators more direct control over VRAM residency and throughput.
- **Windows ROCm users** should wait for [PR #7981](https://github.com/unslothai/unsloth/pull/7981) before relying on diffusion/image workloads; the current offload behavior can turn a 20-step image generation into a 48-minute job ([Issue #8081](https://github.com/unslothai/unsloth/issues/8081)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*