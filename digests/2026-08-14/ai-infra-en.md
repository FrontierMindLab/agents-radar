# AI Infrastructure Digest 2026-08-14

> Generated: 2026-08-13 23:00 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Inference & Serving Ecosystem
**Date: 2026-08-14 | Coverage: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth**

---

## 1. Ecosystem Overview

The inference stack is splitting along clear lines: datacenter serving engines (vLLM, SGLang) are pouring engineering into speculative decoding and DeepSeek-V4/Kimi-K3-specific optimizations, while production stability at multi-node scale lags behind single-node wins. The local runtime layer (llama.cpp) is shipping at an extraordinary cadence — 13 releases in 24 hours — expanding backend coverage (OpenVINO, SYCL, Metal, Vulkan) and gradually closing the feature gap with server-class engines. The gateway layer (LiteLLM) is focused on multi-worker correctness, access-control sync, and MCP session reliability rather than raw inference performance. Meanwhile, Unsloth's first stable Desktop release signals a maturing consumer/local AI tooling layer, and MLX on Apple Silicon is finally getting structured-output support. The common thread: agentic workloads (tool calling, MCP, Responses API compatibility, launch integrations) are now shaping feature roadmaps across every layer.

---

## 2. Activity Comparison

*Counts represent issues/PRs surfaced in each project's 24h digest, not full tracker volume.*

| Project | Issues surfaced | PRs surfaced | Releases (24h) | Release status |
|---|---|---|---|---|
| vLLM | 18 | 16 | 0 | v0.27.0/v0.27.1 stable; 0.27.2.dev0 nightly; two critical regressions open |
| SGLang | 13 | 11 | 0 | No release; no version bump; active speculative-decoding PR queue |
| llama.cpp | 19 | 18 | **13** (b10411–b10423) | Rolling; b10423 latest; CPU-affinity flags now universal |
| Ollama | 19 | 15 | 0 | 0.30.x/0.32.x active; multiple regressions in that line |
| LiteLLM | 14 | 11 | 1 (v1.98.0-dev.2) | Dev release; cosign-signed Docker images |
| Unsloth | 24 | 10 | 1 (v0.1.702-beta) | First stable Unsloth Desktop release; Windows/AMD bugs incoming |

**Read:** llama.cpp is the velocity leader by release cadence; vLLM and SGLang have the heaviest strategic PR queues (spec-decode, DeepSeek-V4), but both carry multi-node blockers. Unsloth's launch spike shows typical desktop-adoption friction (Windows installs, AMD/ROCm detection). LiteLLM's work is concentrated in access-control and MCP correctness rather than per-token performance.

---

## 3. Model Support Race

**DeepSeek-V4 / V4-Flash — vLLM and SGLang are neck-and-neck, with vLLM slightly ahead.**
- **vLLM:** IndexCache for shared C4A layers (PR #51209); MTP=3 adaptive verification with measured 96.01s → 81.25s speedup at concurrency 64 (PR #52228); dedicated ROCm tracker (#41820). But V4-Flash load breaks on the 0.26→0.27 upgrade (#51758).
- **SGLang:** DSpark decode-step unblocking (#34782), FlashInfer MNNVL path unification (#34651), TRT-LLM attention for SM100/103 in progress (#30805), NVIDIA perf-tracking issue (#33636). Multi-node DSpark deadlocks remain (#33289).
- **llama.cpp:** No formal V4 support shipped; dflash/dspark speculative drafters gained backend sampling (#26958), but Vulkan/ROCm instability reports persist.

**Kimi-K3 — vLLM leads; llama.cpp in review; Ollama absent.**
- **vLLM:** DCP partial prefix-cache hits (#50493), hybrid sparse-attention cache-miss fix for EAGLE drops (#51295), ROCm AITER baselines tracked (#50682).
- **llama.cpp:** Full text-model PR open (#26185) — hybrid KDA+MLA, latent MoE, situ activation.
- **Ollama:** Kimi K3 still unavailable to cloud subscribers (#17715).
- **SGLang:** Roadmap tracked (#32607); DCP + Mamba radix-cache fix explicitly DO-NOT-MERGE (#34760).

**Qwen3.5 / gpt-oss — llama.cpp shipped; SGLang optimizing; vLLM debugging.**
- **llama.cpp:** OpenVINO backend shipped Qwen3.5 + gpt-oss MoE + MXFP4 in b10419 (#26952) — the only shipped support this cycle.
- **SGLang:** AITER HIP backend cuts Qwen3.5 GDN decode latency 13–23% on MI355X (#33113); XPU spec-decode fails (#34720).
- **vLLM:** Qwen3.5 native MTP can be *slower* than no-MTP despite 82–88% acceptance (#47277); strict tool-calling grammar broken for gpt-oss (#51020/#52222).

**MiniMax — SGLang and llama.cpp are moving; Unsloth struggling.**
- **SGLang:** Flux2 SiLU+Mul and MiniMax H3 RMSNorm/AdaLN fusions (#34785, #34784).
- **llama.cpp:** MiniMax-Text-01/M1 lightning-attention PR in review (#27018).
- **Unsloth:** MiniMax-H3 video generation fails (`sd-cli exited -6`, #8666).

**Hardware/backend coverage — llama.cpp leads breadth.**
- llama.cpp: Metal TQ2_0 ternary quant (#26980), OpenVINO Qwen3.5/MXFP4, SYCL host pinned memory (#26789).
- SGLang: AITER/MXFP4 for AMD MI355X (#29328, #28354, #33113).
- vLLM: Hopper+ Confidential Computing decode optimizations (#52226); Intel Arc B60 GPTQ completely broken (#52203).
- Ollama: MLX vision for Nemotron-H (#17714); Windows-on-Arm CPU kernels unlocked (#17654).

**Takeaway:** vLLM and SGLang are racing ahead on frontier serving; llama.cpp wins on backend breadth and release velocity; Ollama and Unsloth are consumers of upstream work.

---

## 4. Performance Frontier

**KV-cache management** is the top cross-project lever:
- SGLang's SWA KV page release on the chunk-cache path: **+4.9% output-token throughput** (#34783); DSpark H2D metadata copies were **42% of an 8.4ms decode step** (71.4ms across 21 syncs, #34782).
- vLLM's IndexCache reuses top-k indices across shared C4A layers (#51209); KV-offload event refactor RFC (#49413); preload/sync elimination in metadata construction (#42850).
- Ollama improved scheduler VRAM prediction via GraphSize KV accounting (#17615).

**Speculative decoding** is the most contested area — and the most dangerous:
- vLLM MTP=3 adaptive verification: 96.01s → 81.25s on a 524K-token benchmark (#52228); context-length-aware K scheduling RFC (#48627).
- **But:** vLLM PP + spec-decode + `--no-async-scheduling` produces *wrong outputs* (#52071); dynamic SD incurs 14% cudagraph tax (#49548); llama.cpp auto-detects MTP draft types (#27005) and enables backend sampling for dflash/dspark (#26958).

**Quantization** is converging on MXFP4, with ternary emerging:
- SGLang: online MXFP4 for AMD MI355X; NVFP4 MoE via FlashInfer CuTe DSL (#28354).
- llama.cpp: MXFP4 on OpenVINO; Metal TQ2_0 ternary kernel (#26980).
- vLLM: NVFP4 QAT startup failures (#51744); GPTQ broken on Intel Arc B60 (#52203).

**Distributed serving** is the weak spot:
- vLLM: 4-node GB10 engine stall after idle (#51921); PP + spec-decode wrong outputs (#52071).
- SGLang: multi-node TP rank-divergence deadlock on 2×DGX Spark (#33289); wrong CUDA-graph slot geometry (#34384).
- llama.cpp: multi-GPU tensor-split token corruption on SYCL (#23797).

**Kernel-level:** SGLang's AITER GDN decode (13–23% latency cut) and DCP pack-kernel unification (#34651) are the standout micro-optimizations; llama.cpp delivered vectorized FA V-cache conversion and Metal TQ2_0 kernels; vLLM added Confidential-Computing decode-path work and FA2 fallback for Blackwell head-dim-256 (unblocking ColPali).

---

## 5. Layer Positioning

| Layer | Projects | Primary role | Key differentiators today |
|---|---|---|---|
| **Datacenter serving engines** | vLLM, SGLang | High-concurrency, multi-GPU/multi-node inference; PP/TP/CP; speculative decoding | vLLM: model breadth (DeepSeek-V4, Kimi-K3), MRV2 runner, RL/gRPC lifecycle. SGLang: radix prefix-cache lineage, DSpark, diffusion support, faster per-step sync elimination |
| **Local/edge runtime** | llama.cpp | GGUF-native inference on CPU/Metal/Vulkan/SYCL/OpenVINO/ROCm | 13 releases/day; broadest hardware matrix; llama-server as de-facto local OpenAI-compatible endpoint; Responses API PR (#26013) in flight |
| **Developer local distribution** | Ollama | Model management + local serving on top of llama.cpp/MLX; cloud catalog | `ollama launch` ecosystem (Claude, Codex, Muse, DeepSeek Harness); MLX structured outputs being fixed; but 0.30.x regressions |
| **Gateway / control plane** | LiteLLM | Multi-provider routing, auth, budgets, spend tracking, MCP | Multi-worker permission sync, DB-backed MCP OAuth, cosign image signing; no inference work — correctness and accounting focus |
| **Fine-tuning / desktop training** | Unsloth | LoRA/QLoRA fine-tuning, export, local deploy; now a desktop app | Unsloth Desktop v0.1.702-beta; external-provider tool calling; Meta context sizing and GPU-selection fixes in flight |

**Positioning summary:** vLLM and SGLang compete for the same production-serving slot, with SGLang pushing harder on per-step latency and vLLM on model coverage. llama.cpp is the substrate: Ollama and Unsloth both depend on it for local inference. LiteLLM sits orthogonal to all of them as the routing/auth/accounting layer. No project is converging on another's layer; the stack is deepening, not consolidating.

---

## 6. Trend Signals

**1. Speculative decoding is the main optimization battleground — with real ROI questions.** Every engine shipped spec-decode work this week, but the data is mixed: vLLM halved a 2K/2K benchmark step with MTP=3, yet Qwen3.5 native MTP can lose to no-MTP, DSD arms pay a baseline tax, and PP+spec-decode produces silent corruption. *Watch:* dynamic SD rollback decisions and correctness guardrails; llama.cpp's "zero-config" MTP auto-detection may force vLLM/SGLang to match usability.

**2. Multi-node reliability is the industry's blocking risk.** Two separate engines reported deadlocks/stalls at 2–4 nodes today (vLLM #51921, SGLang #33289). Single-node throughput is improving weekly, but scale-out trust is not. *Action:* pin versions, add heartbeats/watchdogs, and treat idle endpoints as potentially dead.

**3. Agentic workloads are rewriting feature roadmaps.** Tool calling is no longer a model feature — it's an infrastructure feature: vLLM ships strict Harmony grammars, LiteLLM carries MCP OAuth state to DB (multi-worker safe), llama.cpp adds Responses API compatibility, Ollama files Claude Code integration bugs, Unsloth exposes tool calling for external providers. *Action:* agent developers should expect API-surface churn; pin gateway/engine versions.

**4. MXFP4 is becoming the universal quantized format.** SGLang is dequantizing NVFP4→MXFP4 at load for AMD; llama.cpp supports MXFP4 on OpenVINO; vLLM is struggling with QAT NVFP4. Ternary (TQ2_0) appears on Metal. GPTQ is increasingly legacy — its XPU failure is a warning about format tail-risk.

**5. MLX is entering production maturity.** Ollama is landing XGrammar constrained sampling for JSON-schema (closing a silent-correctness gap), and Unsloth is fixing prequantized MLX import corruption. Apple Silicon + structured outputs is becoming viable for agentic apps.

**6. AMD/ROCm/XPU remains the highest-risk platform cluster.** SGLang landed real MI355X wins (AITER GDN), but HiCache is broken (#34611), vLLM's ROCm support remains "patchy," Unsloth's ROCm detection crashes, and llama.cpp has RADV DeviceLost on Strix Halo. *Action:* for AMD/Intel production, budget for version pinning and per-backend testing.

**7. Cost/observability correctness is a growing enterprise concern.** LiteLLM's `end_user` spend-attribution regression (v1.87.0+) silently misattributes costs with shared keys; prompt-cache token visibility is being normalized; llama.cpp will soon serve `/metrics` and `/slots` during decode. Expect more audit-focused fixes across gateways and engines as agentic usage scales.

**Bottom line for decision-makers:** For production multi-node serving, treat today's vLLM/SGLang releases with caution — single-node benchmarks are flattering; pin commits and validate idle/restart behavior. For local deployments, llama.cpp's rolling releases are stable-but-fast-moving; the CPU-affinity and observability fixes are worth the upgrade. Gateway users should re-test key entitlements and spend attribution after LiteLLM upgrades. And for anyone building agentic apps on Apple Silicon, the upcoming Ollama MLX structured-output release closes a real correctness gap.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-14

## 1. Today's Highlights
No release landed in the last 24 hours; the tracker is dominated by speculative-decoding and DeepSeek-V4 work, plus a cluster of new high-severity bugs. The most urgent fresh reports are a v0.27.0 engine that permanently stalls after ~1 minute of idle on 4-node GB10 TP=4 ([#51921](https://github.com/vllm-project/vllm/issues/51921)), wrong outputs when speculative decoding is combined with pipeline parallelism and `--no-async-scheduling` ([#52071](https://github.com/vllm-project/vllm/issues/52071)), and total GPTQ failure on Intel Arc B60 (XPU) ([#52203](https://github.com/vllm-project/vllm/issues/52203)). On the positive side, DeepSeek-V4 performance work is moving fast: an IndexCache implementation for DSpark ([#51209](https://github.com/vllm-project/vllm/pull/51209)) and MTP acceptance estimation for non-dspark adaptive verification ([#52228](https://github.com/vllm-project/vllm/pull/52228)) both saw updates.

## 2. Releases & Breaking Changes
No new vLLM releases in the last 24 hours (current tracker references: v0.26.x, v0.27.0/v0.27.1, and `0.27.2.dev0` nightly).

Upgrade/migration cautions this cycle:
- **0.26.0 → 0.27.0** breaks DeepSeek-V4-Flash load ([#51758](https://github.com/vllm-project/vllm/issues/51758)), and `vllm-openai:latest` (v0.27.0) fails to start Gemma4-31B QAT NVFP4 with Transformers 5.15.0 ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **GPT-OSS tool-calling:** `VLLM_ENFORCE_STRICT_TOOL_CALLING` defaults to `True`, and the strict Harmony grammar in current builds does not match real `openai_harmony` renders. Two fix PRs are open: [#51020](https://github.com/vllm-project/vllm/pull/51020) and its rework [#52222](https://github.com/vllm-project/vllm/pull/52222).

## 3. New Model & Hardware Support
- **DeepSeek-V4 / V4-Flash:**
  - DSA IndexCache for shared C4A layers, validated on V4-Flash-0731 with DSpark ([#51209](https://github.com/vllm-project/vllm/pull/51209))
  - ROCm enablement & optimization tracker, including mHC/HCA/CSA/MoE/MTP blocks ([#41820](https://github.com/vllm-project/vllm/issues/41820))
- **Kimi-K3:**
  - ROCm gap/roadmap tracking (AITER fused-MoE a16w4/a8w4 baselines) ([#50682](https://github.com/vllm-project/vllm/issues/50682))
  - DCP partial prefix cache hit support ([#50493](https://github.com/vllm-project/vllm/pull/50493))
  - Hybrid sparse attention cache-miss fix when EAGLE draft drops ([#51295](https://github.com/vllm-project/vllm/pull/51295))
  - Removal of the model-specific SiTU gating on ROCm MXFP4 MoE ([#50597](https://github.com/vllm-project/vllm/pull/50597))
- **NVIDIA:** Decode-path optimizations for Confidential Computing (Hopper+) ([#52226](https://github.com/vllm-project/vllm/pull/52226)); fall back to FA2 for Blackwell head-dim-256 paged attention, unblocking ColPali under the MRV2 pooling migration ([#52050](https://github.com/vllm-project/vllm/pull/52050))
- **Intel XPU:** First Arc B60 reports — all GPTQ checkpoints fail with `UR_RESULT_ERROR_DEVICE_LOST` at profile_run ([#52203](https://github.com/vllm-project/vllm/issues/52203)); no fix yet.
- **Model Runner V2:** Spec-decode with draft models ([#43091](https://github.com/vllm-project/vllm/pull/43091)) and acceptance estimation for non-dspark adaptive verification ([#52228](https://github.com/vllm-project/vllm/pull/52228)).

## 4. Performance & Optimization
- **Preload/sync removal:** Eliminates two GPU→CPU syncs (`.max().item()` / `.sum().item()`) in `make_kv_sharing_fast_prefill_common_attn_metadata` ([#42850](https://github.com/vllm-project/vllm/pull/42850)).
- **DeepSeek-V4:** IndexCache reuses top-k indices across shared C4A layers ([#51209](https://github.com/vllm-project/vllm/pull/51209)); MTP=3 adaptive verification on V4-Flash shows per-run gains — speed-bench 2K/2K duration improved 96.01s → 81.25s at concurrency 64 (256 requests, 524K input tokens) ([#52228](https://github.com/vllm-project/vllm/pull/52228)).
- **Speculative decoding (RFCs and regressions):**
  - Context-length-aware K scheduling, extending `num_speculative_tokens_per_batch_size` with a `(batch, ctx)` axis ([#48627](https://github.com/vllm-project/vllm/issues/48627))
  - Making `seq_lens_cpu` optional in `CommonAttentionMetadata` to unblock fully async spec-decode ([#29134](https://github.com/vllm-project/vllm/issues/29134))
  - Dynamic SD downsides being quantified: PIECEWISE cudagraph downgrade costs ~14% single-stream ([#49548](https://github.com/vllm-project/vllm/issues/49548)); DSD arms pay a large baseline tax vs no-spec ([#49986](https://github.com/vllm-project/vllm/issues/49986)); Qwen3.5 native MTP can be slower than no-MTP CUDA graph despite 82–88% acceptance ([#47277](https://github.com/vllm-project/vllm/issues/47277))
- **Multimodal:** RFC/tracker for full ViT CUDA Graph support (Qwen3-VL, Qwen3.5, GLM-V, Kimi K2.5) ([#38175](https://github.com/vllm-project/vllm/issues/38175)).
- **KV offload:** RFC to refactor KV-offload events with provenance-carrying events and key-only removals ([#49413](https://github.com/vllm-project/vllm/issues/49413)).

## 5. Stability & Regressions
Ranked by severity:

**Critical / high**
- **v0.27.0 engine stall on multi-node GB10:** after ~1 min idle, requests never reach the scheduler (`shm_broadcast` writer starves); API stays responsive but inference is dead. 4-node TP=4, sm_121a/aarch64. No fix PR yet ([#51921](https://github.com/vllm-project/vllm/issues/51921)).
- **Wrong outputs with PP + speculative decoding:** reproduced at PP=2/4/8 on 8×RTX 3090 with `--no-async-scheduling`; affects two speculative methods and two model families ([#52071](https://github.com/vllm-project/vllm/issues/52071)).
- **DeepSeek-V4-Flash breaks on 0.26.0 → 0.27.0 upgrade** ([#51758](https://github.com/vllm-project/vllm/issues/51758)).
- **MTP illegal memory access on long sequences:** Qwen3.6-27B-FP8, `num_speculative_tokens=5`, v0.19.1 — 36 comments, still open ([#40756](https://github.com/vllm-project/vllm/issues/40756)); related `cudaErrorIllegalAddress` in `gdn_attn.py` with `qwen3_next_mtp` under load ([#37035](https://github.com/vllm-project/vllm/issues/37035)).

**Medium**
- **Decode Context Parallelism output drift/gibberish** in v0.21.0+ ([#41623](https://github.com/vllm-project/vllm/issues/41623)).
- **Gemma4-31B QAT NVFP4 fails to start** with Transformers 5.15.0 in latest image ([#51744](https://github.com/vllm-project/vllm/issues/51744)).
- **GPT-OSS multi-turn `HarmonyError`** persists after ~1 year (47 comments, 22 👍); fix PRs in review ([#23567](https://github.com/vllm-project/vllm/issues/23567), [#51020](https://github.com/vllm-project/vllm/pull/51020), [#52222](https://github.com/vllm-project/vllm/pull/52222)).
- **Mixed-precision compressed-tensors checkpoints** cannot be loaded via `draft_model` spec method ([#49893](https://github.com/vllm-project/vllm/issues/49893)).

**Fixes in flight (PRs)**
- `VLLM_BATCH_INVARIANT=1` non-determinism under TP traced to `fuse_allreduce_rms`: disable fuse ([#51292](https://github.com/vllm-project/vllm/pull/51292), fixes [#51290](https://github.com/vllm-project/vllm/issues/51290)); size custom all-reduce buffers at init ([#50505](https://github.com/vllm-project/vllm/pull/50505), fixes [#50136](https://github.com/vllm-project/vllm/issues/50136)).
- Kimi-K3 hybrid attention cache miss due to EAGLE drop ([#51295](https://github.com/vllm-project/vllm/pull/51295)).
- AMD CPU-offload `store_threshold` counted lookups instead of store offers, starving cold prefixes ([#52227](https://github.com/vllm-project/vllm/pull/52227)).
- FlashInfer MNNVL allreduce workspace undercount for Dspark SD ([#50932](https://github.com/vllm-project/vllm/pull/50932)).

## 6. What This Means for Application Developers
- **If you run v0.27.0 on multi-node or GB10 TP deployments, treat the idle stall ([#51921](https://github.com/vllm-project/vllm/issues/51921)) as a blocking defect.** An idle endpoint can die silently after ~60 seconds while still answering `/v1/models`. Keep synthetic heartbeats flowing or pin to 0.26.x until a fix lands.
- **Do not combine speculative decoding with pipeline parallelism and `--no-async-scheduling`** ([#52071](https://github.com/vllm-project/vllm/issues/52071)) — it produces incorrect output, not just degraded throughput.
- **DeepSeek-V4/V4-Flash serving is improving week over week** (IndexCache, MTP adaptive verification, ROCm tracking), but dynamic speculative configs can still cause aggregate-throughput collapse near batch-size thresholds ([#49548](https://github.com/vllm-project/vllm/issues/49548)). Re-benchmark before trusting early numbers.
- **GPT-OSS tool-calling remains fragile in multi-turn scenarios**; the strict Harmony grammar bug affects the default Docker image. If you depend on gpt-oss-120b function calling, track [#51020](https://github.com/vllm-project/vllm/pull/51020)/[#52222](https://github.com/vllm-project/vllm/pull/52222) or pin a build that predates the strict-grammar default.
- **Platform caveats:** ROCm users should expect DeepSeek-V4/Kimi-K3 enablement to be patchy (AITER/fused-MoE-dependent paths) ([#50682](https://github.com/vllm-project/vllm/issues/50682), [#41820](https://github.com/vllm-project/vllm/issues/41820)); Intel Arc B60 (XPU) is not yet usable for GPTQ workloads ([#52203](https://github.com/vllm-project/vllm/issues/52203)).
- **Observability/RL:** MRV2 is gaining native forward-pass metrics emission ([#52061](https://github.com/vllm-project/vllm/pull/52061)) and the Rust frontend adds gRPC RL lifecycle control (pause/resume, sleep/wake, weight-transfer RPCs) ([#51316](https://github.com/vllm-project/vllm/pull/51316)) — useful if you run RL training/serving loops.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-14

## 1. Today's Highlights

No release shipped in the last 24h, but the PR queue is active around speculative decoding and memory-path optimizations: DSpark decode steps are being unblocked by turning host-to-device metadata copies non-blocking, and SWA KV page release on the chunk cache path was measured at +4.9% output-token throughput. On the stability side, several high-severity open issues involve multi-node DSpark deadlocks, DSpark CUDA-graph slot geometry, and diffusion CPU-offload regressions.

## 2. Releases & Breaking Changes

None in the last 24h. No version bumps, API/config changes, or migration notes were reported.

## 3. New Model & Hardware Support

- [PR #30805](https://github.com/sgl-project/sglang/pull/30805) — DeepSeek V4 TRT-LLM attention integration for SM100/103 remains in progress (`release-highlight`, high priority).
- [PR #33113](https://github.com/sgl-project/sglang/pull/33113) — Adds an AITER HIP backend for packed GDN decode on AMD gfx950/MI355X, reducing Qwen3.5 decode latency ~13–23%.
- [PR #29328](https://github.com/sgl-project/sglang/pull/29328) — Online MXFP4 quantization part 4/N: NVFP4 checkpoints (ModelOpt/Quark) are dequantized and requantized to MXFP4 at load time for AMD MI355x.
- [PR #28354](https://github.com/sgl-project/sglang/pull/28354) — FlashInfer CuTe DSL NVFP4 MoE support for `--quantization nvfp4_online`, including online per-token FP32 activation scales.
- [PR #34140](https://github.com/sgl-project/sglang/pull/34140) — Enables stochastic tree verification for speculative decoding on ROCm, instead of forcing greedy argmax.
- [Issue #32607](https://github.com/sgl-project/sglang/issues/32607) — Kimi K3 roadmap remains tracked, with Day0/cookbook/blog links and a separate bug-tracking thread.

## 4. Performance & Optimization

- [PR #34783](https://github.com/sgl-project/sglang/pull/34783) — Avoids device sync when freeing SWA KV pages on the chunk-cache path; measured **+4.9% output-token throughput**.
- [PR #34782](https://github.com/sgl-project/sglang/pull/34782) — Makes the DSpark draft `num_token_non_padded` H2D copy non-blocking. Profiling showed 21 syncs totaling 71.4 ms (~3.5 ms per decode step, **42% of an 8.4 ms step**).
- [PR #34651](https://github.com/sgl-project/sglang/pull/34651) — Unifies the DCP pack kernel between pynccl and FlashInfer `a2a` backends, eliminating redundant materializing copies/zero-fills on the FlashInfer MNNVL path.
- [PR #34785](https://github.com/sgl-project/sglang/pull/34785) — Fuses Flux2 SiLU+Mul into `SiluAndMul`, removing an intermediate memory round-trip.
- [PR #34784](https://github.com/sgl-project/sglang/pull/34784) — Fuses indexed RMSNorm and AdaLN for MiniMax H3 diffusion.
- [Issue #33636](https://github.com/sgl-project/sglang/issues/33636) — New NVIDIA DeepSeek V4 perf-tracking issue, scoped to SM90/SM10X; currently lists TRT-LLM attention and FlashInfer MNVVL as top priorities.
- [Issue #31310](https://github.com/sgl-project/sglang/issues/31310) — Reports the `fa3` attention backend is slow with MLA page-size 64 on H20.

## 5. Stability & Regressions

High severity:

- [Issue #33289](https://github.com/sgl-project/sglang/issues/33289) — Multi-node TP rank-divergence deadlock with DeepSeek-V4 + DSpark on 2× DGX Spark: one rank wedges in NCCL proxy append, the other idles at request broadcast. No fix PR listed yet.
- [Issue #34384](https://github.com/sgl-project/sglang/issues/34384) — DSpark compact ragged CUDA Graph uses wrong request-slot geometry for the same token tier. No fix PR listed.
- [Issue #34399](https://github.com/sgl-project/sglang/issues/34399) — Paged KV allocator launches allocation kernels before checking OOM, potentially causing avoidable device-side failures. No fix PR listed.
- [Issue #34772](https://github.com/sgl-project/sglang/issues/34772) — Diffusion native-fallback loading drops all CPU-offload decisions (`--text-encoder-cpu-offload` etc.), leading to fatal OOM on 8GB GPUs.
- [PR #34760](https://github.com/sgl-project/sglang/pull/34760) — Fix for Mamba state donation misalignment in unified radix cache under DCP is explicitly marked **DO NOT MERGE — still broken**; affects Kimi-K3 when `--dcp-size > 1` and Mamba radix cache is enabled.
- [Issue #34611](https://github.com/sgl-project/sglang/issues/34611) — ROCm MI355 HiCache broken, with poor performance on realistic agentic workloads.
- [Issue #30781](https://github.com/sgl-project/sglang/issues/30781) — `sgl-model-gateway` Rust router is out of sync with Python `protocol.py`; rejects `/v1/responses` tools with `type: "custom"`, breaking Codex CLI compatibility.

Medium / tracking:

- [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) — CI tracking currently lists **3 broken, 11 flaky, 671 recently fixed** (last auto-update 2026-08-13).
- [Issue #34510](https://github.com/sgl-project/sglang/issues/34510) — Tracking issue for PD-disaggregation single-protocol-layer unification (based on RFC #33861).
- [Issue #34720](https://github.com/sgl-project/sglang/issues/34720) — XPU: Qwen3.5 GDN + speculative decode fails with unexpected `intermediate_conv_window` argument.
- [Issue #31019](https://github.com/sgl-project/sglang/issues/31019) — GPT-OSS + `require_reasoning` + `json_schema` emits malformed Harmony without Role/Channel.

## 6. What This Means for Application Developers

- **Multi-node DSpark is not yet safe for production traffic.** If you run DeepSeek-V4 + DSpark across nodes, watch #33289 and #34384 closely; pin commits and add watchdog/retry logic around deadlocks.
- **DSpark latency should improve soon.** #34782 and #34783 address per-step host syncs and KV page release overhead, which directly reduces the cost of agentic and speculative-decoding workloads.
- **Agentic prefix-cache users should track the RFCs.** Programmatic KV cache (#27574) and position-independent KV cache reuse (#30928) are active design threads that would replace today's byte-identical/offset-dependent RadixAttention reuse.
- **If you use the Rust `sgl-model-gateway`, verify version alignment with `python/protocol.py`** before relying on OpenAI Codex-style `/v1/responses` with custom tool types (#30781).
- **ROCm/MI355X users should be cautious with HiCache** (#34611) even as MXFP4 and AITER GDN kernels land.
- **DCP + Mamba/linear-attention models:** avoid Mamba radix cache with DCP until the state-donation fix (#34760) is actually mergeable; use the extra-buffer strategy only if you can tolerate deterministic logit corruption.
- **PD disaggregation consumers should expect protocol churn** as #34510 unifies the per-backend transport layer in stages.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-14

## 1. Today's Highlights

The project shipped 13 releases in 24 hours (b10411–b10423), with the headline being b10423 — CPU affinity/priority flags (`--cpu-mask`, `--cpu-range`, `--prio`) now work across all tools, fixing a long-standing CLI gap ([#27026](https://github.com/ggml-org/llama.cpp/pull/27026), fixes [#26997](https://github.com/ggml-org/llama.cpp/issues/26997)). The Metal backend gained TQ2_0 ternary-quantization support with an optimized `mul_mv` kernel ([#26980](https://github.com/ggml-org/llama.cpp/pull/26980)), while OpenVINO landed Qwen3.5, gpt-oss MoE, and MXFP4 support ([#26952](https://github.com/ggml-org/llama.cpp/pull/26952)). On the serving side, a high-impact PR would unblock `/metrics` and `/slots` access during `llama_decode()` ([#27041](https://github.com/ggml-org/llama.cpp/pull/27041)), and new-model support for Kimi-K3 ([#26185](https://github.com/ggml-org/llama.cpp/pull/26185)) and MiniMax-Text-01/M1 ([#27018](https://github.com/ggml-org/llama.cpp/pull/27018)) is in review.

## 2. Releases & Breaking Changes

- **b10423 (latest)**: CPU parameters (`--cpu-mask`, `--cpu-range`, `--cpu-strict`, `--prio`) now apply across llama-cli, llama-server, and other tools; code moved from `tools/completion` into `common/common.cpp` ([#27026](https://github.com/ggml-org/llama.cpp/pull/27026)). Behavioral fix, no config migration required.
- **b10419**: OpenVINO backend — Qwen3.5 support, gpt-oss MoE enablement, MXFP4 support, `FILL` op, set-rows operation ([#26952](https://github.com/ggml-org/llama.cpp/pull/26952)).
- **b10418**: SYCL — host pinned memory support to improve host-to-device transfer bandwidth ([#26789](https://github.com/ggml-org/llama.cpp/pull/26789)).
- **b10417**: Chat fix for LFM2 tool-call argument-name prefix ambiguity ([#26960](https://github.com/ggml-org/llama.cpp/pull/26960)).
- **b10416**: Server — `index.html` is now served with `no-cache`; previously `max-age=31536000, immutable` pinned clients to a stale UI build ([#27006](https://github.com/ggml-org/llama.cpp/pull/27006)).
- **b10415 / b10413**: Speculative decoding — MTP draft model type is now auto-detected from draft GGUF metadata, covering local files and HF sidecars ([#27005](https://github.com/ggml-org/llama.cpp/pull/27005), [#26814](https://github.com/ggml-org/llama.cpp/pull/26814)).
- **b10412**: Backend sampling enabled for both dflash and dspark speculative drafters, with a `p_min > 0` guard ([#26958](https://github.com/ggml-org/llama.cpp/pull/26958)).
- **b10414**: Metal TQ2_0 (2-bit ternary) type support ([#26980](https://github.com/ggml-org/llama.cpp/pull/26980)).
- **b10411**: ggml-cpu vectorized flash-attention V-cache F16→F32 conversion ([#26947](https://github.com/ggml-org/llama.cpp/pull/26947)).

## 3. New Model & Hardware Support

- **OpenVINO**: Qwen3.5, gpt-oss MoE, and MXFP4 quantization ([#26952](https://github.com/ggml-org/llama.cpp/pull/26952)).
- **Metal**: TQ2_0 ternary (2-bit) GGML type ([#26980](https://github.com/ggml-org/llama.cpp/pull/26980)).
- **PR open — Kimi-K3 text model**: hybrid KDA (linear) + MLA attention, cross-layer residual attention, latent MoE, situ activation ([#26185](https://github.com/ggml-org/llama.cpp/pull/26185)).
- **PR open — MiniMax-Text-01 / MiniMax-M1**: lightning-attention based models, fixes [#11290](https://github.com/ggml-org/llama.cpp/issues/11290) ([#27018](https://github.com/ggml-org/llama.cpp/pull/27018)).
- **PR open — LFM2/LFM2MOE**: tensor-split (`--split-mode tensor`) support ([#26993](https://github.com/ggml-org/llama.cpp/pull/26993)).
- **PR closed — EAGLE-3.1**: conversion now reads aux hidden-state layer ids nested under `eagle_config` ([#27040](https://github.com/ggml-org/llama.cpp/pull/27040)).
- **SYCL**: host pinned memory for faster host→device copies ([#26789](https://github.com/ggml-org/llama.cpp/pull/26789)).

## 4. Performance & Optimization

Landed:
- **ggml-cpu**: vectorized FA V-cache F16→F32 conversion in `ggml-cpu/ops` ([#26947](https://github.com/ggml-org/llama.cpp/pull/26947)).
- **Metal TQ2_0**: `mul_mv` kernel optimized — float ops over integer ops, precomputed `su` ([#26980](https://github.com/ggml-org/llama.cpp/pull/26980)).
- **SYCL**: host pinned memory reduces copy overhead on the host-to-device path ([#26789](https://github.com/ggml-org/llama.cpp/pull/26789)).

In review / in progress:
- **CUDA**: MMQ ids-path tail padding sized from flattened row count (`ne11_flat`) instead of `ne11` — fixes an allocation bug for MoE gate/up projections ([#27044](https://github.com/ggml-org/llama.cpp/pull/27044)).
- **Win32**: thread scheduling and core-affinity optimization for hybrid CPUs — E-cores filtered in `common_cpu_get_num_physical_cores()` ([#27033](https://github.com/ggml-org/llama.cpp/pull/27033)).
- **Jinja**: eliminates O(N²) behavior in chat-template `gather_string_parts` ([#27034](https://github.com/ggml-org/llama.cpp/pull/27034), fixes [#26974](https://github.com/ggml-org/llama.cpp/issues/26974)).
- **Hexagon**: fixes non-deterministic `FLASH_ATTN_EXT` via queue ordering and packed rescale D matrices ([#27042](https://github.com/ggml-org/llama.cpp/pull/27042)).

Reported bottlenecks:
- SYCL Q8_0 reorder degrades prefill by **42%** on Intel Arc B70 ([#25203](https://github.com/ggml-org/llama.cpp/issues/25203)).
- Vulkan batched decode on many-expert MoE falls off a cliff at 9 concurrent sequences: **122.5 → 82.9 t/s** ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)).
- Vulkan performance regression in recent builds on RX 6600 ([#24066](https://github.com/ggml-org/llama.cpp/issues/24066)).

## 5. Stability & Regressions

High severity:
- **Vulkan `vk::DeviceLostError`** within a few turns on DeepSeek-V4-Flash under RADV (Strix Halo, Framework Desktop) ([#25664](https://github.com/ggml-org/llama.cpp/issues/25664), open). A related AMD APU DeviceLost issue on gfx90c was closed ([#21724](https://github.com/ggml-org/llama.cpp/issues/21724)).
- **ROCm gfx1151 RPC worker crash** in `GGML_OP_TOP_K` during DeepSeek V4 prefill after 4096 tokens ([#26746](https://github.com/ggml-org/llama.cpp/issues/26746), open).
- **ROCm large-model loading hangs** on Radeon 8060S / gfx1151 ([#19482](https://github.com/ggml-org/llama.cpp/issues/19482), open).

Medium severity:
- **SYCL correctness cluster**: garbage on the second prompt (Intel Arc Pro B60) ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845), open; [#21589](https://github.com/ggml-org/llama.cpp/issues/21589) closed) and multi-GPU tensor-split token corruption ([#23797](https://github.com/ggml-org/llama.cpp/issues/23797), closed). SYCL MTP on Intel Arc also shows no speed gain over baseline ([#23533](https://github.com/ggml-org/llama.cpp/issues/23533), closed).
- **DFlash drafter bind failure** when target GGUF encodes `attention.sliding_window_pattern` as an array — Muse-Glimmer-30B official GGUF ([#26894](https://github.com/ggml-org/llama.cpp/issues/26894), open).
- **Gemma 4 31B MTP crash** on Vulkan: "pre-allocated tensor cannot run operation NONE" ([#24492](https://github.com/ggml-org/llama.cpp/issues/24492), open); Gemma 4 SWA forgets key details on CUDA ([#25751](https://github.com/ggml-org/llama.cpp/issues/25751), open).
- **DeepSeek-V4-Flash** degenerates into repetition / leaks special tokens in long agentic chats on Metal ([#26694](https://github.com/ggml-org/llama.cpp/issues/26694), open).
- **KV cache save** (`/slots/3?action=save`) fails for vision-enabled models ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466), open).

Low severity / fixed:
- **`--cpu-mask`/`--cpu-range`/`--cpu-strict` ignored** — fixed in b10423 via [#27026](https://github.com/ggml-org/llama.cpp/pull/27026).
- **Muse Glimmer tool-call format error** ("peg-native") — closed ([#27025](https://github.com/ggml-org/llama.cpp/issues/27025)).
- **CUDA sm_120 (RTX 5090)** Q8_0 out-of-range shared-memory store in `mul_mat_q` — closed ([#24399](https://github.com/ggml-org/llama.cpp/issues/24399)).
- **OpenVINO docker illegal-instruction crash** in `libggml-cpu.so` — closed ([#23100](https://github.com/ggml-org/llama.cpp/issues/23100)).

## 6. What This Means for Application Developers

- **Server observability**: [#27041](https://github.com/ggml-org/llama.cpp/pull/27041) will allow `/metrics` and `/slots` to be read while `llama_decode()` is running — important for live metrics scraping. Combined with the `index.html` no-cache fix in b10416, serving upgrades become less error-prone.
- **CPU pinning now works everywhere**: b10423 brings `--cpu-mask`/`--cpu-range`/`--prio` to all tools — relevant for multi-tenant CPU serving and NUMA-tuned deployments.
- **Speculative decoding requires less manual config**: MTP draft-type auto-detection ([#27005](https://github.com/ggml-org/llama.cpp/pull/27005), [#26814](https://github.com/ggml-org/llama.cpp/pull/26814)) and backend sampling for dflash/dspark ([#26958](https://github.com/ggml-org/llama.cpp/pull/26958)) simplify draft-model setups.
- **OpenAI Responses API is progressing**: a large open PR adds Responses API JSON-schema support, Cohere2 MoE template parsing, and streaming compatibility ([#26013](https://github.com/ggml-org/llama.cpp/pull/26013)) — the most-upvoted open feature request ([#19138](https://github.com/ggml-org/llama.cpp/issues/19138), 40 👍). Worth tracking if you build on OpenAI-compatible endpoints.
- **New architectures to plan for**: Kimi-K3 ([#26185](https://github.com/ggml-org/llama.cpp/pull/26185)) and MiniMax ([#27018](https://github.com/ggml-org/llama.cpp/pull/27018)) support is in review; OpenVINO users can already try Qwen3.5 with MXFP4 on b10419+.
- **Platform risk remains concentrated**: SYCL (second-prompt garbage, 42% prefill regression on Q8_0 reorder) and Vulkan on AMD (DeviceLost, MoE batch cliff at 9 sequences) are the areas to pin-test before production rollout.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-14

## Today's Highlights

MLX structured-output support is finally landing: the runner previously ignored `response_format` / JSON-schema constraints on Apple Silicon ([#16563](https://github.com/ollama/ollama/issues/16563)), and two PRs now add XGrammar-based constrained sampling ([#17690](https://github.com/ollama/ollama/pull/17690), [#17697](https://github.com/ollama/ollama/pull/17697)). On the regression front, AMD Strix Halo container deployments still see only 2 GB of VRAM on 0.30+ — a fix PR is in review ([#16462](https://github.com/ollama/ollama/issues/16462), [#17685](https://github.com/ollama/ollama/pull/17685)). Meanwhile the `ollama launch` ecosystem is expanding (DeepSeek Harness, Muse Code) while several Claude Code integration bugs are being filed.

## Releases & Breaking Changes

No new releases in the last 24 hours. Note: multiple open issues reference regressions in the active 0.30.x/0.32.x lines (Strix Halo VRAM, Docker model loading, llama3.3:70b output corruption) — worth pinning versions if you're affected.

## New Model & Hardware Support

- **MLX vision for Nemotron-H** ([#17714](https://github.com/ollama/ollama/pull/17714)): implements the RADIO vision encoder and projector on the shared MLX media pipeline, including dynamic-resolution preprocessing and MTP offsets. Audio remains suppressed.
- **DeepSeek Harness launch integration** ([#17733](https://github.com/ollama/ollama/pull/17733)): adds `ollama launch dsh` as a first-party integration (local + cloud models).
- **Muse Code launch integration** ([#17594](https://github.com/ollama/ollama/pull/17594)): adds `ollama launch muse`; writes a provider `settings.json` for Meta's Muse Code CLI.
- **Muse Glimmer template sync** ([#17732](https://github.com/ollama/ollama/pull/17732)): updates the Jinja reference template; normalizes "Reasoning effort" → "Reasoning strength" and fixes explicit-system reasoning handling.
- **Windows-on-Arm CPU kernel** ([#17654](https://github.com/ollama/ollama/pull/17654)): the shipped CPU runner falls back to baseline `armv8-a` with zero SIMD instructions; a one-line `GGML_CPU_ARM_ARCH` fix unlocks dot-product/matrix kernels.
- **Cloud catalog**: `/v1/models` is out of sync with the website ([#17725](https://github.com/ollama/ollama/issues/17725)); Kimi K3 remains unavailable to Pro/Max subscribers ([#17715](https://github.com/ollama/ollama/issues/17715)); Qwen3.8 requested ([#17720](https://github.com/ollama/ollama/issues/17720)). Feature request: Agent Host Protocol support ([#17729](https://github.com/ollama/ollama/issues/17729)).

## Performance & Optimization

- **Backend load planning centralization** ([#17165](https://github.com/ollama/ollama/pull/17165)): server-side refactor to unify memory estimates across scheduler preflight, request options, and runner startup — addresses inconsistencies exposed by the iGPU/mmproj fix.
- **KV cache accounting fix** ([#17615](https://github.com/ollama/ollama/pull/17615)): mirrors GraphSize KV accounting into `PredictServerVRAM`, improving scheduler memory prediction for Qwen-class models.
- **MLX generation budget** ([#17494](https://github.com/ollama/ollama/pull/17494)): bounds open-ended `num_predict` by the request `num_ctx` instead of the checkpoint's `max_position_embeddings` — prevents indefinite hangs on large MLX models.
- **Explicit flash attention for gpt-oss** ([#17477](https://github.com/ollama/ollama/pull/17477)): llama-server's `auto` mode disables FA on partial offload, causing Q8 crashes at long context; the PR requests it explicitly for architectures that default to it.
- **Download throttling at 99%** ([#1736](https://github.com/ollama/ollama/issues/1736)): long-standing registry issue still drawing comments — bandwidth saturates (~13 MB/s) until 98–99%, then drops to tens of KB/s for the final verification stage.

## Stability & Regressions

Ranked by severity:

1. **AMD Strix Halo VRAM detection regression (0.30+, containers)** ([#16462](https://github.com/ollama/ollama/issues/16462)): only 2 GB VRAM visible instead of full unified memory; regression from 0.24.0. Fix PR [#17685](https://github.com/ollama/ollama/pull/17685) adds `OLLAMA_GPU_MEMORY` + `SmallCarveOutIGPU` handling for ROCm's `hipMemGetInfo()` returning system RAM.
2. **v0.32.2+ token corruption with llama3.3:70b** ([#17379](https://github.com/ollama/ollama/issues/17379)): generations become junk tokens after auto-upgrade; reproduced in DEV and PROD, no linked fix yet.
3. **MLX structured outputs silently ignored** ([#16563](https://github.com/ollama/ollama/issues/16563)): JSON-schema constraints returned unconstrained text. Fixes: [#17690](https://github.com/ollama/ollama/pull/17690) (grammar + JSON Schema) and [#17697](https://github.com/ollama/ollama/pull/17697) (format propagation through the MLX runner).
4. **`/api/chat` silently drops `audios` on gemma4:e4b** ([#17730](https://github.com/ollama/ollama/issues/17730)): HTTP 200 with audio discarded; model answers as if no audio was provided — silent data loss for multimodal apps.
5. **muse-glimmer:30b-mlx token leakage + ignored `response_format`** ([#17684](https://github.com/ollama/ollama/issues/17684)): closed; prefix leakage and JSON-schema non-compliance addressed by the template fix in [#17732](https://github.com/ollama/ollama/pull/17732).
6. **Gemma 4 Cloud HTTP 500 with vision + tool calling** ([#17667](https://github.com/ollama/ollama/issues/17667)): closed; cloud-side error, no visibility into root cause.
7. **Nemotron3.5-lightning:30b stalling on AMD AI395+** ([#17692](https://github.com/ollama/ollama/issues/17692)): stalls mid-thinking on Framework Desktop; trigger not yet confirmed.
8. **Vulkan 100% CPU spin near context limit** ([#13461](https://github.com/ollama/ollama/issues/13461)): one core pegged, memory not released; open since ~0.13.3. Related fix in flight: repeat detector now only consumes content-carrying events ([#17360](https://github.com/ollama/ollama/pull/17360)), addressing false "token repeat limit reached" aborts.
9. **`ollama launch claude` integration bugs**: no response with qwen3-coder:30b ([#17671](https://github.com/ollama/ollama/issues/17671)); `[1m]` context suffix rejected and cloud context windows not propagated ([#17584](https://github.com/ollama/ollama/issues/17584)); kimi-k2.7-code:cloud not recognized, forcing 200k auto-compact ([#17717](https://github.com/ollama/ollama/issues/17717)).
10. **MLX import corruption** ([#17731](https://github.com/ollama/ollama/pull/17731)): importing prequantized MLX checkpoints can report success but produce unloadable models; PR preserves quantization metadata.
11. **Misc**: `WriteWithBackup` timestamp collision on rapid successive writes ([#17713](https://github.com/ollama/ollama/issues/17713)); Mac "Restart to update" fails for non-admin accounts ([#11972](https://github.com/ollama/ollama/issues/11972)); Docker model-loading failure after 0.24.0 forcing version pin ([#17285](https://github.com/ollama/ollama/issues/17285)).

## What This Means for Application Developers

- **MLX structured outputs are being fixed** — if you build on Apple Silicon and rely on `response_format`, the XGrammar work ([#17690](https://github.com/ollama/ollama/pull/17690), [#17697](https://github.com/ollama/ollama/pull/17697)) closes a silent correctness gap. Watch for the next release.
- **Validate multimodal inputs**: `audios` fields are silently dropped with HTTP 200 on gemma4:e4b ([#17730](https://github.com/ollama/ollama/issues/17730)) — don't assume a successful status means the modality was consumed.
- **`ollama launch claude` caveats**: context-window suffix handling and model recognition are still rough ([#17584](https://github.com/ollama/ollama/issues/17584), [#17717](https://github.com/ollama/ollama/issues/17717)); pin expectations if you drive cloud models through Claude Code.
- **OpenAI-compatible metadata is improving**: PR [#17422](https://github.com/ollama/ollama/pull/17422) adds `context_length` to `/v1/models` — useful for client-side context management once merged.
- **AMD iGPU/Strix Halo container users**: stay on 0.24.x or apply `OLLAMA_GPU_MEMORY` once [#17685](https://github.com/ollama/ollama/pull/17685) lands.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-14

## Today's Highlights

The main theme is multi-worker correctness: MCP OAuth state is being moved from in-memory/Redis caches to DB-backed drafts ([#36844](https://github.com/BerriAI/litellm/pull/36844), [#32260](https://github.com/BerriAI/litellm/pull/32260)), and several key/team/access-group permission sync bugs are being addressed ([#36843](https://github.com/BerriAI/litellm/pull/36843), [#36825](https://github.com/BerriAI/litellm/pull/36825), [#36840](https://github.com/BerriAI/litellm/pull/36840)). A new dev release `v1.98.0-dev.2` was cut with Docker cosign verification notes, and a new `lite pi` CLI command landed for running the Pi coding agent through the proxy ([#36841](https://github.com/BerriAI/litellm/pull/36841)).

## Releases & Breaking Changes

- **v1.98.0-dev.2** — Released. No breaking API/config changes are documented in this window. Release notes emphasize that all Docker images are cosign-signed; verification uses the key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). See the [releases page](https://github.com/BerriAI/litellm/releases).

## New Model & Hardware Support

No new model or hardware support landed in the last 24h. Provider/model-specific issues remain active:

- Xiaomi MiMo models fail when `output_config` is passed via Claude Code ([#24549](https://github.com/BerriAI/litellm/issues/24549)).
- Azure GPT-5.6 terra/luna cost-map rows incorrectly carry OpenAI prices instead of Azure meters ([#36192](https://github.com/BerriAI/litellm/issues/36192)).
- Bedrock GPT 5.5 (Mantle platform) needs automatic Chat Completions → Responses API conversion ([#30941](https://github.com/BerriAI/litellm/issues/30941)).

## Performance & Optimization

No kernel/throughput/latency benchmarks or memory optimization work was reported today.

- [#36827](https://github.com/BerriAI/litellm/pull/36827) — Adds a shared helper to normalize prompt-cache token counts across three producers, so the playground can display provider prompt cache tokens instead of hiding them in the Logs drawer.
- [#36761](https://github.com/BerriAI/litellm/pull/36761) — Fixes stream-state logging for bridged ChatGPT responses, which prevents cost tracking from being missed and stops internal streams from being logged as non-streaming. This matters for usage accounting more than raw performance.

## Stability & Regressions

Ranked by severity. Fix PRs are noted where they exist.

**Data/security-critical**

- **SpendLogs `end_user` regression** — With a shared virtual key, `end_user` is pinned to the first request’s `user` for all subsequent requests. Regression in v1.87.0. Open: [#31441](https://github.com/BerriAI/litellm/issues/31441).
- **Response leakage/cross-talk in Redis Cluster** — Closed issue; reports of responses returned to the wrong client on OpenShift. Marked closed, but worth verifying if you run that topology: [#25447](https://github.com/BerriAI/litellm/issues/25447).
- **429 error body leaks full token hash** — The rate-limit error exposes the full SHA-256 of the virtual key. Open: [#27884](https://github.com/BerriAI/litellm/issues/27884).

**Correctness / provider translation**

- **OTel `gen_ai.system=None`** — The attribute still reaches the exporter as `None` in metrics/events paths; the prior fix only covered span attributes. Open: [#36759](https://github.com/BerriAI/litellm/issues/36759).
- **Prompt-cache invalidation from system-role hoist** — Mid-conversation `role: "system"` hoisting for pre-4.8 Claude models invalidates the entire prompt-cache prefix. Open: [#36559](https://github.com/BerriAI/litellm/issues/36559).
- **Azure cost-map rows wrong** — `azure/gpt-5.6-terra` and `azure/gpt-5.6-luna` carry OpenAI’s post-cut prices; Azure never made that cut. Open: [#36192](https://github.com/BerriAI/litellm/issues/36192).

**MCP / UI / permissions**

- **OpenAPI→MCP loses `$ref` body schemas** — FastAPI/Pydantic specs generate tools with empty `inputSchema`. Open: [#36765](https://github.com/BerriAI/litellm/issues/36765).
- **Cannot reset user budget to Unlimited** — Open: [#32474](https://github.com/BerriAI/litellm/issues/32474).
- **Custom MCP server creation fails in UI** — Open: [#23869](https://github.com/BerriAI/litellm/issues/23869).
- **MCP grant not removed on server deselection** — Fix in flight: [#36840](https://github.com/BerriAI/litellm/pull/36840).
- **Access group assignments not synced on key/team writes** — Fixes in flight: [#36843](https://github.com/BerriAI/litellm/pull/36843), [#36825](https://github.com/BerriAI/litellm/pull/36825).
- **`lite login` tokens missing team grants** — Fix in flight: [#36826](https://github.com/BerriAI/litellm/pull/36826).
- **Team fallback can widen model access** — Fix in flight: [#36837](https://github.com/BerriAI/litellm/pull/36837).

**Provider-specific**

- Azure OpenAI realtime WebRTC token flow failing ([#24659](https://github.com/BerriAI/litellm/issues/24659)).
- `litellm_content_filter` evaluations missing from request logs and Guardrails Monitor ([#36566](https://github.com/BerriAI/litellm/issues/36566)).
- Anthropic passthrough large-context streaming sends no bytes during pre-stream processing → client timeouts ([#32491](https://github.com/BerriAI/litellm/issues/32491)).
- Vertex passthrough auth failures return bare “Internal server error” — fix PR adds actionable 401 with project/location/Google error: [#36836](https://github.com/BerriAI/litellm/pull/36836).

## What This Means for Application Developers

- **Audit spend attribution if you share virtual keys**: The `end_user` regression ([#31441](https://github.com/BerriAI/litellm/issues/31441)) can silently misattribute costs in `SpendLogs`. Do not rely on per-request `user` fields until this is fixed.
- **Multi-worker MCP deployments are getting more reliable**: MCP OAuth drafts and DB-backed sessions fix cross-worker 404s and Redis dependency ([#36844](https://github.com/BerriAI/litellm/pull/36844), [#32260](https://github.com/BerriAI/litellm/pull/32260)). If you run MCP servers behind a proxy, watch these PRs.
- **Team/access-group permission behavior is changing**: The incoming fixes close gap where deleted teams, cleared access groups, and deselected MCP servers still grant model access via stale caches/allowlists. Re-test key entitlements after upgrade.
- **Prompt-cache visibility improves**: The playground will soon show provider prompt-cache tokens directly ([#36827](https://github.com/BerriAI/litellm/pull/36827)). For Claude-heavy workloads, be aware of cache invalidation from system-role hoisting ([#36559](https://github.com/BerriAI/litellm/issues/36559)).
- **Coding agents**: `lite pi` ([#36841](https://github.com/BerriAI/litellm/pull/36841)) gives the Pi agent the same frictionless proxy wiring as `lite claude` and `lite codex`.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-08-14

## 1. Today's Highlights

Unsloth shipped **v0.1.702-beta**, the first stable public release of **Unsloth Desktop**, a cross-platform desktop application for running, training, exporting, and deploying local AI models on Windows, macOS, and Linux. The same release also adds **tool calling / web search support for all external providers**, closing a long-standing gap for remote model backends. This initial desktop launch is generating a wave of platform-specific bug reports — especially around Windows installs and AMD/ROCm detection — with multiple fix PRs already open.

## 2. Releases & Breaking Changes

- **v0.1.702-beta**: Unsloth Desktop is now available as an open-source desktop app for local research, training, export, and deployment.
- **Aug 13 update**: Added tool calling / web search and related features for all external providers.
- No explicit breaking changes or migration notes were included in the release data.

## 3. New Model & Hardware Support

No new model families were formally announced in this release. Relevant model/hardware activity from issues and PRs:

- **MiniMax-H3** is referenced in the Desktop image/video pipeline, but users report the system `stable-diffusion.cpp` build predates MiniMax-H3 support ([#8507](https://github.com/unslothai/unsloth/issues/8507)).
- Feature request open for **DeepReinforce Ornith-1.0** Unsloth variants ([#6721](https://github.com/unslothai/unsloth/issues/6721)).
- Feature request open for **MLX pretraining structure** — corpus selection, shard packing, tokenizer word-pair compute ([#8607](https://github.com/unslothai/unsloth/issues/8607)).
- No new CUDA/ROCm/Metal/CPU backend support was explicitly documented in the release notes.

## 4. Performance & Optimization

No throughput or latency numbers were published in this dataset. Noteworthy performance-relevant PRs in flight or landed:

- **Metal context sizing**: PR [#8709](https://github.com/unslothai/unsloth/pull/8709) prevents llama-server from starting at native context size on Apple Silicon, which should reduce memory pressure and startup failures on M-series machines.
- **GPU selection for media generation**: PR [#8645](https://github.com/unslothai/unsloth/pull/8645) makes image/video generation honor the user-selected GPU instead of pinning CUDA ordinal 0 — important on multi-GPU systems.
- **llama-server configurability**: PR [#8702](https://github.com/unslothai/unsloth/pull/8702) adds an extra llama-server arguments box to expose the full CLI parameter surface without a per-flag UI.
- **Kaggle T4 regression coverage**: PR [#8440](https://github.com/unslothai/unsloth/pull/8440) adds deterministic notebook smoke tests on real Kaggle T4s to catch Turing (sm_75) regressions.

## 5. Stability & Regressions

Ranked by severity. No single installer fix PR has landed yet; several runtime fixes are already open or merged.

**High — Windows Desktop install failures**

- [#8698](https://github.com/unslothai/unsloth/issues/8698): Windows install killed by 2-hour cap while downloading cu126 PyTorch, with no progress output.
- [#8546](https://github.com/unslothai/unsloth/issues/8546): Desktop installation process does not finish successfully.
- [#8508](https://github.com/unslothai/unsloth/issues/8508): Desktop install fails on Windows with AMD GPU.
- [#8523](https://github.com/unslothai/unsloth/issues/8523): Windows Setup blocked by EDR during install.
- [#8490](https://github.com/unslothai/unsloth/issues/8490): Application Control policy blocks `unsloth.exe` during Studio setup.

**High — AMD GPU detection / ROCm crashes**

- [#8529](https://github.com/unslothai/unsloth/issues/8529): RX 5700XT is not recognized in Unsloth Desktop.
- [#7331](https://github.com/unslothai/unsloth/issues/7331): Segmentation fault on startup during RAG embeddings warmup on AMD Radeon 8060S / ROCm 6.3.
- [#8651](https://github.com/unslothai/unsloth/issues/8651): `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` prevents GPU memory offload on Strix Halo.
- [#7624](https://github.com/unslothai/unsloth/issues/7624): ROCm multi-GPU auto-selection picks iGPU over dGPU by free-memory heuristic, causing crashes instead of fallback.

**High — Runtime / inference failures**

- [#8666](https://github.com/unslothai/unsloth/issues/8666): MiniMax-H3 video generation fails with `sd-cli exited -6`; Qwen3VL text encoder weight loading fails.
- [#8566](https://github.com/unslothai/unsloth/issues/8566): macOS M4: llama-server fails to start when loading local GGUF models, plus excessive idle RAM usage. Related fix PR: [#8709](https://github.com/unslothai/unsloth/pull/8709).
- [#8610](https://github.com/unslothai/unsloth/issues/8610): Error on second launch of the macOS desktop app.
- [#8483](https://github.com/unslothai/unsloth/issues/8483): Deep Research freezes during the “Writing The Report” phase.

**Medium — API, tool calling, and data correctness**

- [#8663](https://github.com/unslothai/unsloth/issues/8663): Claude Code fails with 401 because the endpoint only accepts `Authorization: Bearer sk-unsloth-…`, not Anthropic’s `x-api-key` header.
- [#8734](https://github.com/unslothai/unsloth/issues/8734): Tool calling poisons chat history.
- [#8717](https://github.com/unslothai/unsloth/issues/8717): Trained models can no longer be exported directly to GGUF without an unnecessary 16-bit download.
- [#8748](https://github.com/unslothai/unsloth/issues/8748): Installed MLX models are missing from `/v1/models` and cannot be loaded by API model auto-switch.
- [#8735](https://github.com/unslothai/unsloth/issues/8735): `kimi k3` is not available via the API with an API key.
- [#8733](https://github.com/unslothai/unsloth/issues/8733): Raw JSONL export is not emitted as a real JSONL file.
- [#8678](https://github.com/unslothai/unsloth/issues/8678): Microphone access fails on Ubuntu Mate; WebKitGTK `media-stream` likely not enabled.
- [#8746](https://github.com/unslothai/unsloth/issues/8746): Video generation progress tracking is lost when navigating across the app.

**Relevant fix PRs in flight or landed**

- [#8709](https://github.com/unslothai/unsloth/pull/8709) — Metal context sizing fix.
- [#8645](https://github.com/unslothai/unsloth/pull/8645) — Honor GPU selection for image/video generation.
- [#8524](https://github.com/unslothai/unsloth/pull/8524) — Launch embedding GGUF files with `--embeddings`.
- [#8205](https://github.com/unslothai/unsloth/pull/8205) — Serve Deep Research event stream over POST to avoid proxy buffering.
- [#8628](https://github.com/unslothai/unsloth/pull/8628) — Fix delayed Studio tool approval cards via SSE keepalive.
- [#8136](https://github.com/unslothai/unsloth/pull/8136) — Render chat sends immediately without waiting on persistence.
- [#8515](https://github.com/unslothai/unsloth/pull/8515) — Repair duplicate package metadata during Studio updates.
- [#8730](https://github.com/unslothai/unsloth/pull/8730) — Fix stale desktop download links, including broken Linux `.deb` link.

## 6. What This Means for Application Developers

- **External-provider tool calling is now available** in v0.1.702-beta, so applications can rely on Unsloth’s gateway for tool-enabled remote models rather than only local llama-server backends.
- **Desktop adoption is still early**: Windows and AMD/ROCm environments are the most fragile. If you are packaging Unsloth Desktop for end users, expect installer, GPU-detection, and WebKit permission issues; plan for EDR/Application Control exceptions and manual ROCm configuration.
- **llama-server is becoming the primary local inference surface**: PRs for extra CLI arguments, embedding support, and corrected GPU selection indicate that production users should budget time for per-backend llama-server tuning.
- **GGUF export and MLX model-API visibility are currently unstable**; applications that depend on programmatic `/v1/models` listing, saved-model export, or JSONL dataset pipelines should pin versions and re-test after the next patch release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*