# AI 基础设施日报 2026-08-19

> 生成时间: 2026-08-18 23:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 横向对比分析报告（2026-08-19）

## 1. 生态全景

过去 24 小时，AI 基础设施生态呈“新模型牵引快速迭代、稳定性风险集中爆发”的态势。Kimi-K3、DeepSeek V4、Qwen3.6/3.8、GLM-5.2 等新一代模型正推动 vLLM/SGLang 在 kernel 融合、稀疏推理、多上下文并行上进行深度适配；同时，投机解码路径（MTP/DeepSeek/GLM）在 CUDA/ROCm/多节点环境出现多起崩溃、死锁与静默数据错误，成为当前最大的生产稳定性黑洞。硬件层面，Blackwell Ultra（SM103）、ROCm、XPU、WSL2 等新环境引入大量平台特有回归，跨栈验证成本显著上升。上层设施（LiteLLM/Unsloth）则更聚焦成本治理、安全防护和开发体验，显示行业正从“能跑模型”转向“跑得稳、可观测、可控成本”。

## 2. 各项目活跃度对比

> 表中“提及”指当日日报明确列出链接的 Issue/PR 数，并非 GitHub 全量活动数；LiteLLM 另披露全平台 88 条 Issues、292 条 PRs 有变动。

| 项目 | Issues（提及） | PRs（提及） | Release 情况 |
|---|---|---|---|
| vLLM | 16 | 18 | 无新版本 |
| SGLang | 17 | 9 | 无新版本；#35399 将 K3 tool-call 修复 cherry-pick 至 v0.5.18 |
| llama.cpp | 14 | 14 | v0.1.2、b10485、b10488（含 OpenVINO 2026.3 适配） |
| Ollama | 15 | 7 | 无新版本 |
| LiteLLM | 17（全平台 88） | 10（全平台 292） | 无新版本 |
| Unsloth | 19 | 13 | 无新版本 |

各项目均有高活跃度，但性质不同：vLLM/SGLang 以模型适配与稳定性修复为主；llama.cpp 以发布节奏和多后端扩展为主；Ollama/Unsloth 更偏用户侧体验与功能迭代；LiteLLM 的 PR 量最大，集中在网关功能、成本和安全性。

## 3. 模型支持竞速

- **数据中心推理引擎（vLLM / SGLang）领跑**：两者都在全力支持 Kimi-K3 和 DeepSeek V4。vLLM 有完整的 K3 主跟踪 issue（#50001）和 ROCm gap roadmap（#50682），并已合入 FlashInfer GEMM+AllReduce 融合、CP Attention 重构；SGLang 则修复了 K3 的 tool-call 丢失和 vision-DP 多图崩溃，同时有 DeepSeek V4 性能跟踪 issue（#33636）。
- **GLM-5.2 支持呈现差异化**：vLLM 通过 TurboQuant 稀疏后端扩展支持 GLM-5.2，SGLang 通过 AMD 测试覆盖进入，llama.cpp 的 GLM-5.2 支持请求被关闭且多节点 RPC 崩溃（#26583），支持状态不稳定。
- **本地/边缘侧（llama.cpp / Ollama）**：llama.cpp 新增 DFlash2 架构 PR、Minimax-01 WebGPU 基础支持、IQ2_NL/IQ3_NL 量化；Ollama 的模型支持仍依赖 llama.cpp 底层，今日焦点在 qwen3.8 稳定性问题。
- **网关层（LiteLLM）**：本身不跑模型，但能先行透传 `reasoning_effort`、修复 Bedrock Mantle `web_search` 等 API 能力，属于“协议适配竞速”。
- **微调层（Unsloth）**：更关注 Studio 的模型接入（如 Ollama 本地模型进选择器），以及量化 KV cache 在 TP 下的恢复，相当于为已有模型做训练/部署衔接。

**结论**：最新模型适配速度上，vLLM 和 SGLang 明显领先，尤其对 Kimi-K3、DeepSeek V4；llama.cpp 在本地多后端上同步跟进新架构，但高端模型支持仍受制于算子和显存；Ollama/Unsloth/LiteLLM 则是生态集成和价值链延伸。

## 4. 性能优化前沿

今日优化火力集中在以下五个方向：

1. **KV cache 与内存治理**：vLLM 修复 Mooncake offload 尾部处理（#52832）、优化 prefix cache 淘汰策略（#51909）；SGLang 推进 HiCache buffer-only 模式（#34798）并收紧 DCP HiCache 的 KL 阈值；llama.cpp 仍受限于 hybrid/recurrent 模型 checkpoint 失效（#24055）。
2. **投机解码（Speculative Decoding）**：vLLM 追踪全异步 spec decoding（#29134）、增加 per-request 接受率统计（#48915）；llama.cpp 新增 adaptive MTP draft 深度（#27210）。但大量崩溃报告（vLLM #40756、#37035；SGLang #34786）表明该技术距离生产成熟仍有距离。
3. **算子与 kernel 融合**：vLLM 的 FlashInfer GEMM+AllReduce 融合（#52687）和 CP Attention 重构（#52839）；SGLang 在 SM103 上接入 Cake GDN（#35400）；llama.cpp 将 FFN gate + SwiGLU 融合进 mul_mat_q epilogue（#27341），并移植 OpenCL fused ssm_scan（#26439）。
4. **量化体系扩展**：vLLM 扩展 GLM-5.2 TurboQuant 稀疏后端（#52472）；llama.cpp 新增 IQ2_NL/IQ3_NL 窄张量量化（#27322）；Unsloth 则受困于 NVFP4 在 RTX 5060 Ti 上的回归（#8246）。
5. **分布式与调度效率**：vLLM 引入 `sharded_rdt` 权重同步（#43375），SGLang 推进 PD disagg 协议统一（#34510）；LiteLLM 增加 SpendLogs 复合索引（#37379）、SSE keepalive（#37368），属于服务层性能治理。

**重点提示**：当前大部分性能优化仍是对“新模型 + 新硬件”的补救性适配，而非通用加速；尤其 SM103/ROCm 上的算子行为仍需大量验证。

## 5. 分层定位差异

| 项目 | 层级 | 核心定位 | 参考用户 |
|---|---|---|---|
| vLLM | 推理引擎/服务 | 高吞吐生产级 GPU serving，深度绑定 CUDA 生态 | 模型服务平台、云厂商 |
| SGLang | 推理引擎 | 面向复杂模型、多模态、分布式调度的灵活引擎 | 前沿模型研究/工程团队 |
| llama.cpp | 本地推理运行时 | 轻量多后端（CPU/Vulkan/OpenCL/WebGPU/ROCm），支持边缘设备 | 端侧、桌面、嵌入式开发者 |
| Ollama | 本地部署工具 | 一键运行和管理本地模型，屏蔽底层运行时复杂度 | 个人开发者、终端用户 |
| LiteLLM | LLM 网关 | 统一 API 接入、路由、预算、日志与安全控制 | 企业 AI 平台、SRE、成本治理团队 |
| Unsloth | 微调/训练框架 | 高效微调 + 一体化 Studio（训练、推理、代理调试） | ML 工程师、Agent 应用开发者 |

需要注意的是：Ollama 与 llama.cpp 是“上层封装/底层运行时”关系；Unsloth 依赖 llama.cpp 等底层运行时；LiteLLM 则横跨全部引擎，做统一出口。

## 6. 值得关注的趋势信号

- **新模型“Day-0 支持”与稳定性脱节**：Kimi-K3 的 CUDA graph 静默输出损坏（vLLM #52531）、SGLang 的 vision-DP 崩溃刚修复，说明抢首发并不等于可生产。若依赖新模型做关键业务，务必验证 batch=1、长序列、tool-call 等边界场景。
- **投机解码是当前最大风险区，也是降本热点**：vLLM 的接受率统计和 llama.cpp 的自适应深度代表了工程化方向，但 MTP 崩溃、死锁、非法内存访问在多个引擎仍未关闭。Agent 服务若追求低延迟，需做严格的并发/长序列回归。
- **硬件碎片化带来的“平台税”正在上升**：Blackwell Ultra（SM103）、ROCm（Strix Halo、gfx1151）、WSL2、XPU 各自暴露不同层级的 bug，跨栈集成成本显著增加。基础设施选型需考虑生态成熟度，而不只是峰值算力。
- **网关与工具链安全/正确性问题直击 Agent 应用**：LiteLLM 的 `/health` 泄露 `aws_session_token`（#36898）、MCP OAuth 字段静默丢失（#37258）、流式 `tool_use` 双 `content_block_stop`（#37273）均会影响生产 Agent 的正确性与安全性，建议在网关层主动拦截或校验。
- **成本与可观测性进入“工程化”阶段**：SpendLogs 索引、语义缓存修复、预算重置错误修复（LiteLLM）、per-request 投机接受率（vLLM）、KL 阈值收紧（SGLang），都表明 token 成本正在被当作一等公民治理。
- **本地与云端的分层协作更加清晰**：llama.cpp/Ollama 继续深耕个人设备多后端；vLLM/SGLang 聚焦数据中心；Unsloth 补足微调与代理开发工作流；LiteLLM 作为中间层统一接入。对 Agent 开发者而言，最佳实践是“本地用 Ollama 调试、云端用 vLLM/SGLang 部署、中间用 LiteLLM 做路由与配额”，同时密切跟踪 speculative decoding 和缓存命中率的修复进展。

---

*以上分析基于 2026-08-19 各项目公开 GitHub 动态摘要，数据采集范围以各日报披露为准。*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 2026-08-19

## 今日速览

过去 24 小时 vLLM 无新版本发布。社区焦点集中在 Kimi-K3 的模型支持与 kernel 集成（FlashInfer GEMM+AllReduce 融合、CP Attention 重构）、多条 speculative decoding（MTP/DeepSeek/GLM）的崩溃与回归报告，以及 Rust 前端功能补齐（gRPC LoRA 生命周期控制）。

## 新模型与硬件支持

- **Kimi-K3 上游跟踪**：Issue #50001 汇总 KV Cache Manager、Mamba 相关 kernel、decode-end KV offload 等工作分配，是 Kimi-K3 完整落地的主跟踪项。
  https://github.com/vllm-project/vllm/issues/50001
- **ROCm 上的 Kimi-K3 Gap 路线图**：Issue #50682 跟踪 vLLM 上游在 AMD ROCm 上的特性启用与性能优化，已列 Day 0 AITER fused-moe a16w4/a8w4 集成等 baselines。
  https://github.com/vllm-project/vllm/issues/50682
- **Kimi-K3 性能 kernel 集成**：PR #52687 为 Kimi-K3 的 MLA/KDA attention 集成 FlashInfer 的 GEMM+AllReduce 融合 kernel（`num_tokens >= 256` 时启用），在 8x B300 上提供微基准数据。
  https://github.com/vllm-project/vllm/pull/52687
- **CP Attention 重构**：PR #52839 将 DCP/PCP attention ops 统一收敛到 `ops/dcp.py` / `ops/pcp.py`，为后续 K3 等模型的多上下文并行支持打基础。
  https://github.com/vllm-project/vllm/pull/52839
- **GLM-5.2 TurboQuant 稀疏后端**：PR #52472 扩展 TurboQuant MLA 到 GLM-5.2 稀疏路径，新增 packed 4-bit latent KV、稀疏 decode/prefill，以及 DCP/MTP/PP 正确性修复。
  https://github.com/vllm-project/vllm/pull/52472
- **FlashMLA sparse DCP/MTP 支持**：PR #46514 为 `FLASHMLA_SPARSE` 后端的 `fp8_ds_mla` 路径加入 DCP 支持，覆盖 GLM-5.2 / DeepSeek-V3.2 在 TP4/DCP4 下的 MTP 场景。
  https://github.com/vllm-project/vllm/pull/46514
- **ROCm 扩展**：PR #44969 为 ROCm CI 增加 15 个 AMD 镜像门禁；PR #52628 为 DeepSeek V4 在 ROCm 上启用 fused AR draft metadata 更新。
  https://github.com/vllm-project/vllm/pull/44969
  https://github.com/vllm-project/vllm/pull/52628
- **XPU 测试覆盖**：PR #51968 将多个内核测试改为设备无关，使 Triton kernel 在 Intel GPU（XPU）上获得 CI 覆盖。
  https://github.com/vllm-project/vllm/pull/51968

## 性能与优化

- **Kimi-K3 GEMM+AllReduce 融合**：PR #52687 在 B300 上对 `o_proj` + allreduce 做融合（`N=7168, K=1536`），`num_tokens>=256` 时启用，目标是降低 MLA/KDA attention 的通信开销。
  https://github.com/vllm-project/vllm/pull/52687
- **跳过未完成 prefill 的 logits/sampling**：PR #49171 让 Model Runner V2 在 chunked-prefill 请求未完成时不产生多余 sampling logits 行，减少计算浪费。
  https://github.com/vllm-project/vllm/pull/49171
- **全异步 Spec Decoding 进展**：Issue #29134 提出将 `seq_lens_cpu` 变为可选以消除 host↔GPU 同步点，当前仍在推进。
  https://github.com/vllm-project/vllm/issues/29134
- **per-request 投机接受率统计**：PR #48915 在 OpenAI API 响应中暴露单请求的 spec decode 接受统计，便于服务端到端调优。
  https://github.com/vllm-project/vllm/pull/48915
- **Prefix cache 淘汰策略优化**：PR #51909 建议将从未命中的 cached blocks 优先追加到 free list，避免高频命中块被低频块挤掉。
  https://github.com/vllm-project/vllm/pull/51909
- **RL weight sync 新后端**：PR #43375 引入 `sharded_rdt` 权重传输后端，让每个 inference worker 只拉取分片参数，减少同步开销。
  https://github.com/vllm-project/vllm/pull/43375
- **DFlash 性能回归**：Issue #42505 报告 Qwen3.5-35B-A3B 上 DFlash 在并发 >8 时比基线更慢，且并发=1 时加速比低于论文，尚无修复。
  https://github.com/vllm-project/vllm/issues/42505

## 稳定性与回归

按严重程度排列，重点为崩溃、静默错误、挂起与回归：

- **（严重-静默错误）Kimi-K3 CUDA Graph 输出损坏**：#52531 报告 batch=1 时 CUDA graph capture 会静默破坏输出，存在三种独立 failure modes。无 fix PR。
  https://github.com/vllm-project/vllm/issues/52531
- **（严重-崩溃）MTP 投机解码非法内存访问**：#40756 在 Qwen3.6-27B-FP8 + `num_spec_tokens=5` 长序列场景触发 illegal memory access。无 fix PR。
  https://github.com/vllm-project/vllm/issues/40756
- **（严重-挂起）Qwen3.5-27B-FP8 服务无限挂起**：#35502 在 nightly 上标准 chat 请求无响应、无报错，持续 open。
  https://github.com/vllm-project/vllm/issues/35502
- **（严重-挂起/死锁）GLM-5.2 MTP 在 MI300X 上死锁**：#48568 报告 ROCm 8x MI300X 下 vocab-parallel logits all-gather 阶段死锁。相关 GLM-5.2 TurboQuant PR #52472 正在加入 DCP/MTP 正确性修复，但 issue 未关闭。
  https://github.com/vllm-project/vllm/issues/48568
  https://github.com/vllm-project/vllm/pull/52472
- **（高-初始化崩溃）draft_model TP>1 崩溃**：#52023 当 draft hidden_size 大于 target 时，TRT-LLM fused allreduce+RMSNorm workspace 按 target 尺寸分配导致 init 崩溃。无 fix PR。
  https://github.com/vllm-project/vllm/issues/52023
- **（高-回归）Qwen3.6 上 MTP 导致 Responses API 工具调用失败**：#46249 为回归，启用 MTP 时 structured-output/tool call 行为异常。无 fix PR。
  https://github.com/vllm-project/vllm/issues/46249
- **（高-崩溃）qwen3_next_mtp 在负载下 cudaErrorIllegalAddress**：#37035 仍在 open，问题出现在 `gdn_attn.py:237`。
  https://github.com/vllm-project/vllm/issues/37035
- **（中-缓存正确性）DeepSeek-V4-Flash Prefix-cache 0% 命中**：#42948 报告 hybrid group 在请求 reassignment 后丢失所有 first-block cache keys（DSv4 变体）。无 fix PR。
  https://github.com/vllm-project/vllm/issues/42948
- **（中-并发崩溃）V1 引擎并发 embedding 请求 KeyError**：#25991 仍 open，已获 13 👍。
  https://github.com/vllm-project/vllm/issues/25991
- **（中-输出错误）Qwen3.5 json_schema 输出混入空格**：#38696 报告 `response_format=json_schema` 下产生乱码空格。
  https://github.com/vllm-project/vllm/issues/38696
- **（中-行为错误）OpenAI `strict` 标志渗入 chat template**：#52741 使 tool-call 行为改变，影响工具调用开发者。
  https://github.com/vllm-project/vllm/issues/52741
- **（已修复/有 fix PR）Mooncake KV offload 尾部处理**：#52832 修复 producer 在请求结束时未 offload 最终 partial Mamba `align` tail 的问题。
  https://github.com/vllm-project/vllm/pull/52832
- **（已修复/有 fix PR）AMD GPU-CPU KV 传输故障**：#52838 修复 OffloadingConnector 中 `swap_blocks_batch` 同步异常导致引擎宕机的问题。
  https://github.com/vllm-project/vllm/pull/52838
- **（已修复/有 fix PR）mamba_block_size 不同步**：#50809 修复 hybrid Mamba 模型 `mamba_block_size` 未通过 `EngineCoreReadyResponse` 回传前端的问题。
  https://github.com/vllm-project/vllm/pull/50809
- **（CI/测试修复）**：#52608 释放共享 ColBERT engine 修复 `test_colbert_hf_comparison`；#52829 修复 deepseek_v4 mock 的语义冲突；#52810 修复 ROCm CI shallow fetch 的 Git maintenance race。
  https://github.com/vllm-project/vllm/pull/52608
  https://github.com/vllm-project/vllm/pull/52829
  https://github.com/vllm-project/vllm/pull/52810

## 对应用开发者的意义

- **投机解码仍是高风险区域**：MTP/FP8、TP>1 draft model、长序列、AMD ROCm 上均有未修复的崩溃/死锁问题。生产环境使用 spec decode 前应做长序列和并发回归测试，并关注对应 issue。
- **Kimi-K3 尚不建议用于关键 batch=1 场景**：CUDA graph 静默输出损坏问题非常隐蔽，可能产出错误回答而不报错；若非必须，先禁用 cudagraph 或升级到修复版本。
- **工具调用/Responses API 用户需注意**：Qwen3.6 上开启 MTP 可能导致工具调用失败；另外 OpenAI `strict` 标志被渲染进 chat template 的行为变化也需要验证，必要时在网关层剥离 `strict` 字段。
- **可观测性将改善**：PR #48915 如果合入，你将在单次 OpenAI 响应中看到 spec decode 的接受率，便于针对负载调优投机参数。
- **Rust 前端仍为实验特性**：PR #52840 正在为 Rust 前端增加 gRPC 的 LoRA load/unload/list 生命周期控制（Issue #44280 跟踪整体功能对齐），适合早期尝鲜，不建议直接用于生产。
  https://github.com/vllm-project/vllm/pull/52840
  https://github.com/vllm-project/vllm/issues/44280
- **无明显新的破坏性变更**：过去 24 小时没有新 Release，也没有 API 级 breaking change 公告；若依赖新修复，建议关注 nightly。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 2026-08-19

## 今日速览

Kimi K3 和 DeepSeek V4 仍是当前迭代主线：K3 多项修复进入收尾（vision-DP 索引修复、tool-call 丢失修复 cherry-pick 至 v0.5.18），DeepSeek V4 性能跟踪 issue 保持活跃。稳定性方面，今日新增多起严重 Bug，集中在 Blackwell Ultra（SM103）算子上和 WSL2 多模态场景，暂无 fix PR。HiCache 相关优化持续推进（buffer-only 模式、KL 阈值收紧）。

---

## 版本发布与破坏性变更

无新版本发布。值得注意的变更：

- **[Cherry-pick] v0.5.18 将包含 Kimi-K3 tool-call 修复** — PR #35399 将 #34881「Stop losing Kimi-K3 tool calls to reasoning, constraint conflicts, and truncation」合入 release/v0.5.18。使用 K3 并遇到 tool-call 丢失问题的生产环境，可关注该补丁的 release 时间。
  https://github.com/sgl-project/sglang/pull/35399

---

## 新模型与硬件支持

- **Kimi K3（MoonshotAI）**：Day0 支持已在 7 月底落地，Roadmap（#32607）持续跟踪后续优化与 Bug 修复。今日合入 vision-DP 分片下的 rank-local 索引修复（#35402），解决 TP=8 + DCP=8 + 多图变长场景下 scheduler 崩溃的问题。
  - Roadmap: https://github.com/sgl-project/sglang/issues/32607
  - Fix PR: https://github.com/sgl-project/sglang/pull/35402

- **DeepSeek V4（NVIDIA SM90/SM10X）性能跟踪**：#33636 持续更新，高优先级项包括 TRT-LLM DSv4 attention 集成（#30805）和 FlashInfer MN...

- **AMD 生态**：
  - PR #32570 计划以 GLM-5.2-FP8 覆盖替换 GLM-5.1 MI35x nightly 测试，包含 8×MI35x + ROCm 7.2 的精度与性能基准。
  - PR #35398 发布 ROCm 7.2.4 镜像（rocm724 flavors），该版本修复了 `torch.profiler` 中 GPU kernel 缺失的问题。
  - https://github.com/sgl-project/sglang/pull/32570
  - https://github.com/sgl-project/sglang/pull/35398

- **SM100/SM103 GDN（FlashInfer Cake）**：PR #35400 为 Qwen TP4 的 decode/verify 路径接入可选 Cake GDN 包，在不支持的 dtype/布局条件下 fail closed。
  https://github.com/sgl-project/sglang/pull/35400

---

## 性能与优化

- **HiCache host memory 层 buffer-only 模式**（PR #34798，high priority）：为 HiCache host memory 层引入纯 buffer 模式，减少设备端状态回读与映射开销，属于 KV 分配器优化的前置工作。
  https://github.com/sgl-project/sglang/pull/34798

- **DCP HiCache KL 阈值收紧**（PR #35380）：将 DCP4 + HiCache L2 + UnifiedRadixCache 测试的 KL 阈值从 0.01 收紧至 0.005，与目录内其他混合缓存用例对齐，说明该路径的数值稳定性已改善。
  https://github.com/sgl-project/sglang/pull/35380

- **DeepSeek V4 性能跟踪**（#33636）：重点关注 SM90 / SM10X 上的 attention 后端集成与算子优化，FlashInfer MN... 已完成，TRT-LLM DSv4 attention 集成仍在推进。
  https://github.com/sgl-project/sglang/issues/33636

- **MI355X（gfx950）MTP 性能落后**（#34596）：在 Qwen3.5 397B FP4 AgentX 负载下，MI355X 的 MTP 吞吐显著落后 B200/B300，已作为 Bug 跟踪。

- **Page-tail 写入修复**（PR #35401）：修正 `req_to_token` 页尾未初始化导致的行数据残留问题，同时将行 headroom 扩至 `page_size - 1`，提升缓存命中场景下数据一致性。
  https://github.com/sgl-project/sglang/pull/35401

---

## 稳定性与回归

按严重程度排列。今日新增多起与 Blackwell Ultra（SM103）及 WSL2 相关的严重问题，均暂无 fix PR。

### 严重（今日新增，无 fix）

- **DeepGEMM FP8 MoE 在 GB300/sm_103 上崩溃**（#35388）：`m_grouped_fp8_fp4_gemm_nt_contiguous` kernel 中 UE8M0 scale-format 与 smxx_layout 断言冲突（CUDA 719）。涉及 deepep FP8 MoE 后端的 B300/GB300 部署需关注。
  https://github.com/sgl-project/sglang/issues/35388

- **WSL2 多模态启动崩溃**（#35385）：CUDA IPC transport 在 WSL2 上被自动选中，但 WSL2 不支持 `cudaIpcOpenMemHandle`，scheduler 无提示崩溃。建议增加 transport 检测或至少给出明确报错。
  https://github.com/sgl-project/sglang/issues/35385

- **PrefillDelayer 混合状态反馈循环**（#35241）：DP Attention + chunked prefill 场景下，PrefillDelayer 可能进入持久混合状态，导致 prefill 进展停滞、吞吐大幅下降。请求可完成，属调度/性能稳定性问题。
  https://github.com/sgl-project/sglang/issues/35241

### 严重（此前已报告，仍开放）

- **DSV4 sparse prefill 调度器挂起**（#34235，0.5.17 + hierarchical cache + chunked prefill 16K，watchdog abort）：高优先级问题，暂无 fix。
  https://github.com/sgl-project/sglang/issues/34235

- **DeepSeek-V4-Flash + DSPARK + HiCache 长会话缓存命中率归零**（#35129）：长 agentic 会话每轮 `#cached-token: 0`，短请求命中率 98%。影响 Agent 场景，暂无 fix。
  https://github.com/sgl-project/sglang/issues/35129

- **SM103 上的 SM100 路径误判**（#34340）：`is_sm100_supported()` 按 family 判断导致 B300 (sm_103) 误走 SM100-specific kernel：cutedsl TGV BF16 GEMM 报 Xid 13 CTA 错误、trtllm-gen MoE finalize 静默挂起。
  https://github.com/sgl-project/sglang/issues/34340

- **混合 Mamba + speculative decoding TypeError**（#34786）：NEXTN TARGET_VERIFY 阶段 `mamba_next_track_idx` 为 None，导致 `set_mamba_track_indices_from_reqs()` 崩溃。暂无 fix。
  https://github.com/sgl-project/sglang/issues/34786

- **Qwen3.8 DSpark forced-reject 有损**（#35150）：GDN 状态漂移导致 forced-reject 与 Base decode 不完全等价，影响自研投机解码正确性验证。
  https://github.com/sgl-project/sglang/issues/35150

### 中低危 / 已修复回归

- **EAGLE/NEXTN TP=2 在 Intel XPU warmup 挂起**（#35144）：由 #34238 将 verify-decision TP broadcast 移出 sampling 分支引入，已关闭。
  https://github.com/sgl-project/sglang/issues/35144

- **Kimi-K3 多图请求 scheduler 崩溃**（PR #35402，今日修复已合入）：vision-DP 下 rank-local 索引错误，见上文。
- **SWA evict floor 断言修复**（PR #35396，已合入）：补齐 PD decode 两条 prealloc 路径的页对齐断言。
  https://github.com/sgl-project/sglang/pull/35396

- **PD disagg 协议统一**（#34510）：基于 RFC #33861 的单协议层、后端独立传输改造进入分阶段实施，有助于减少跨后端行为差异。
  https://github.com/sgl-project/sglang/issues/34510

---

## 对应用开发者的意义

1. **Kimi K3 生产可用性提升**：tool-call 丢失修复已进入 v0.5.18 发版通道，vision-DP 下多图请求崩溃问题也已修复。使用 K3 构建 agent 应用的团队应尽快验证这两项修复。

2. **长会话 + 缓存注意**：DeepSeek-V4-Flash + HiCache 在长 agentic 会话下会出现缓存命中率归零的严重问题（#35129），如生产环境依赖高命中率控制成本，建议关注后续 fix 或在混用 HiCache 时进行压测。

3. **多模态服务避开 WSL2**：当前 WSL2 无法运行多模态模型（CUDA IPC 不受支持且无优雅报错），开发调试请使用裸机 Linux。

4. **Blackwell Ultra（B300/GB300/SM103）仍处于磨合期**：今日新增 DeepGEMM FP8 MoE 崩溃、cluster/tcgen05 kernel 误判等严重问题。SM103 生产部署需谨慎，建议在发布前充分验证 FP8/deepep 相关路径。

5. **AMD 用户关注 ROCm 7.2.4 镜像**：新镜像修复了 profiler 可见性问题，并新增 GLM-5.2 覆盖，有助于排查 AMD 性能问题。

6. **观测与调试基础设施在完善**：TP/PP 一致性 checker（#34406）、KV 事件 component 类型字段（#32514）和 Host 分配器改造（#35223）都在推进，后续排查分布式推理问题会更高效。

---

*本日报基于 GitHub 公开 issue/PR 数据生成，数据采集时间：2026-08-19*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-19

## 1. 今日速览

今日主线和 nightly 同步至 b10485/b10488，发布了 v0.1.2 并继续推进 OpenVINO 2026.3 适配与 xcframework 构建修复。值得关注的是，社区围绕多后端（Vulkan/OpenCL/SYCL/WebGPU）算子支持、MTP 自适应深度与 DFlash2 新架构的 PR 密集推进，而稳定性方面 CUDA/RPC 路径的若干高影响 Bug 仍在持续发酵，其中 RPC 串号问题已有明确 bisect 结论。

## 2. 版本发布与破坏性变更

- **v0.1.2 发布**，自 v0.1.1 以来主要变更集中在 ggml 同步与版本号提升；Nightly build 为 b10485。语义化版本仍处于 "work in progress" 状态，API 稳定性预期需保持谨慎。
  [v0.1.2](https://github.com/ggml-org/llama.cpp/releases/tag/v0.1.2) | [b10485](https://github.com/ggml-org/llama.cpp/releases/tag/b10485)

- **b10488**：OpenVINO 后端更新至 2026.3，同步更新设备驱动；CI 中跳过 Nemotron-H rollback 测试——原因在于 OpenVINO 后端不支持 SSM_SCAN，导致该模型的 recurrent state rollback 图被拆分，无法端到端验证。使用 OpenVINO 后端的用户升级到 2026.3 时需关注算子覆盖范围。
  [b10488](https://github.com/ggml-org/llama.cpp/releases/tag/b10488)

- **b10483**：修复 xcframework 构建，CMake 侧将 vendor 库迁移至 `vendor::hash` alias target（原先名为 `vendor-hash`），涉及构建系统的破坏性变更；使用 CMake 集成 vendor 组件的下游需同步调整 target 引用。
  [b10483](https://github.com/ggml-org/llama.cpp/releases/tag/b10483)

## 3. 新模型与硬件支持

- **XDNA 后端请求**（#21725，30 👍）持续活跃，社区对 AMD XDNA（Ryzen AI NPU）的推理支持需求热度不减，目前仍处于 open 状态，无排期承诺。
  [#21725](https://github.com/ggml-org/llama.cpp/issues/21725)

- **GLM-5.2 支持请求**（#24730，14 👍）已被关闭。虽然 issue 关闭原因未明确，但结合 GLM-5.2 在 RPC 多节点上存在崩溃的 context（#26583），推测支持状态可能已发生变更，建议以 release note 为准。
  [#24730](https://github.com/ggml-org/llama.cpp/issues/24730)

- **DFlash2 架构支持 PR**（#27342）已提交：在 DFlash 基础上新增 grouped dynamic depthwise convolution 与 candidate selector 两个模块，模型定义和转换逻辑同步更新。
  [#27342](https://github.com/ggml-org/llama.cpp/pull/27342)

- **WebGPU mulmat 重叠输入支持**（#27321）：修复 `test-llama-archs -a minimax-01` 在 WebGPU 后端因 src0/src1 重叠导致的崩溃，意味着 Minimax-01 推理链路在 WebGPU 上已具备基础条件。
  [#27321](https://github.com/ggml-org/llama.cpp/pull/27321)

- **新增量化类型 IQ2_NL / IQ3_NL（CPU）**（#27322）：解决非 256 倍数 col 行使用 32-element 块导致的次优量化，为窄张量提供更优的量化粒度。
  [#27322](https://github.com/ggml-org/llama.cpp/pull/27322)

- **ggml_rope_set_offset 多后端补齐**：Vulkan（#27344）、OpenCL/SYCL/WebGPU/Hexagon（#27345）均已提交支持，为后续依赖 rope offset 的模型铺路。
  [#27344](https://github.com/ggml-org/llama.cpp/pull/27344) | [#27345](https://github.com/ggml-org/llama.cpp/pull/27345)

## 4. 性能与优化

- **Vulkan MUL_MAT_VEC_ID 密度门控**（#27332）：将固定 8-token 切换阈值替换为 #25356 引入的密度门控（`n_tokens * experts_per_token <= 2 * n_experts`，上限 64 tokens）。在 gfx1151、RDNA3、gfx1013（BC-250）实测：B=9 时 +36%，B=16 时 +27%，B=64 时 +21%，B≤8 无回退。
  [#27332](https://github.com/ggml-org/llama.cpp/pull/27332)

- **CUDA FFN gate + SwiGLU/GEGLU 融合进 mul_mat_q epilogue**（#27341）：补齐 decode（mul_mat_vec_q）与 prefill（MMQ）路径的算子融合差距，gate 矩阵乘结果保留在寄存器中直接参与激活，避免中间张量落盘。
  [#27341](https://github.com/ggml-org/llama.cpp/pull/27341)

- **OpenCL 移植 fused ssm_scan kernel**（#26439）：Mamba-2 的 SSM_SCAN 支持 d_state∈{128,256} 的全 f32 标量路径，此前该算子回退 CPU；可通过 GGML_OPENCL_DISABLE_SSM_SCAN 关闭。
  [#26439](https://github.com/ggml-org/llama.cpp/pull/26439)

- **Vulkan flash-attn 共享内存门控问题**（#26163）：Radeon Vega 8 iGPU 在驱动更新后 `maxComputeSharedMemorySize` 从 65536 变为 32768，导致 flash-attention 调优分支被跳过，吞吐下降约 17%。属驱动行为变更引发的性能回归，尚无修复 PR。
  [#26163](https://github.com/ggml-org/llama.cpp/issues/26163)

## 5. 稳定性与回归

以下按影响面从高到低排列：

- **ROCm/HIP 集成 GPU 上 llama-server 串号（#25992，7 👍）**：`-np 4 --kv-unified` 下请求返回的是其他请求的完整响应，已 bisect 至 c7d87229。这是数据面级错误，在服务多租户场景下存在严重的信息泄露风险，当前无修复 PR——建议相关用户立即避免在 Strix Halo / gfx1151 平台使用 `--kv-unified`。
  [#25992](https://github.com/ggml-org/llama.cpp/issues/25992)

- **CUDA flash-attn 路径非法内存访问（#26609）**：Qwen3.6-35B MoE + 部分 expert offload 下 cudaStreamSynchronize 崩溃，跨 b10107/b10243 可复现，`-fa off` 可规避。
  [#26609](https://github.com/ggml-org/llama.cpp/issues/26609)

- **SM_60（Pascal）FP32 被静默降为 FP16（#25593）**：影响 Tesla P100 等老卡，存在质量损失；修复已在两个 fork 中合并但上游未采纳。
  [#25593](https://github.com/ggml-org/llama.cpp/issues/25593)

- **CUDA kernel stall 被 watchdog 杀死（#27102）**：RTX Pro 6000 Blackwell Max-Q 上运行 Qwen3.8-27B UD-Q8_K_XL 时触发，属新硬件平台上的高危稳定性问题。
  [#27102](https://github.com/ggml-org/llama.cpp/issues/27102)

- **上下文检查点在 hybrid/recurrent 模型上总是失效（#24055）**：llama-server 的 checkpoint 功能对 hybrid/recurrent 模型不可用，持续影响长任务恢复场景。
  [#24055](https://github.com/ggml-org/llama.cpp/issues/24055)

- **ROCm 上 TOP_K 崩溃（#27021）**：`ncols > 1024` 时 bitonic kernel block-size 溢出，阻塞 DeepSeek V4 超过 128K 上下文；gfx1151 上已确认，另有 #26746 报告 RPC worker 在同一算子崩溃。
  [#27021](https://github.com/ggml-org/llama.cpp/issues/27021) | [#26746](https://github.com/ggml-org/llama.cpp/issues/26746)

- **GLM-5.2 多节点 CUDA RPC 崩溃（#26583）**：worker 侧 `invalid data ptr` 与 orchestrator 侧 `buffer_get_tensor` abort，分布式推理 GLM-5.2 在 DGX Spark 集群上不可用。
  [#26583](https://github.com/ggml-org/llama.cpp/issues/26583)

- **Windows ROCm 7.14 发行包缺少 hipblas.dll（#26996）**：GPU 无法被识别，`--list-devices` 返回空。属打包回归，下载 b10400 win-rocm 资产的用户需注意。
  [#26996](https://github.com/ggml-org/llama.cpp/issues/26996)

- **gemma4 MTP draft 模型加载回归（#24795，10 👍）**：b9553 正常、b9702 起 "invalid vector subscript"，已定位为回归但尚未有修复 PR。
  [#24795](https://github.com/ggml-org/llama.cpp/issues/24795)

- **`response_format` 在 peg-native 下 35–40% 请求 500（#27279）**：生成中途截断后 `common_chat_peg_parse` 直接抛错，属于解析器对截断输出缺少容错的问题。
  [#27279](https://github.com/ggml-org/llama.cpp/issues/27279)

- **ggml-cpu mul_mat_id 越界写修复（#27286）**：expert id 校验依赖 `assert()` 在 release 构建被编译掉，越界 id 可导致堆越界写——已提交 PR 将校验改为运行时检查。
  [#27286](https://github.com/ggml-org/llama.cpp/pull/27286)

- **OpenVINO Docker 构建指令集问题（#27338）**：`GGML_NATIVE=ON` 导致构建机特定指令集（如 AVX-512）泄漏到产物，运到其他机器直接 fault；PR 改为 `GGML_NATIVE=OFF`。
  [#27338](https://github.com/ggml-org/llama.cpp/pull/27338)

## 6. 对应用开发者的意义

- **llama-server 新增 POST /tts 端点**（#26603）——TTS 模型服务化有了统一入口，支持 multipart 上传 speaker reference。正在构建语音 Agent 的团队可提前规划接入。
  [#26603](https://github.com/ggml-org/llama.cpp/pull/26603)

- **生成中途注入（inject）能力**（#27343）——`/v1/chat/completion/control` 新增 inject action，可用于对推理过程做受控干预（如注入 reasoning 内容），UI 侧默认关闭。对需要"过程控制"而非"端点控制"的 Agent 编排有实际价值。
  [#27343](https://github.com/ggml-org/llama.cpp/pull/27343)

- **路由器可限制为仅 preset 模型**（#24434，已关闭）——虽然 PR 被关闭，但"限制 router 暴露模型范围"的需求未被否定。出于安全考虑，凡是面向多租户暴露 router 的部署都应关注该方向后续进展。
  [#24434](https://github.com/ggml-org/llama.cpp/pull/24434)

- **adaptive MTP draft 深度（#27210）**——新增 `--spec-type draft-mtp-adaptive` 选项，通过计数状态机动态调整 draft 深度（建议 `--spec-draft-n-max 12`），对需要稳定 decode 延迟的推理服务有降本潜力。
  [#27210](https://github.com/ggml-org/llama.cpp/pull/27210)

- **风险提示**：多个高影响稳定性问题（如 #25992 串号、#26609 CUDA 非法访问）尚无修复 PR，且集中在 Qwen3.6/3.8 系列 + CUDA/ROCm 新硬件的组合上。建议生产环境在升级前优先用目标模型与硬件组合跑通回归测试，并对上述 issue 涉及场景添加针对性规避。


</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报（2026-08-19）

数据截至 2026-08-18 24:00（GitHub）。

## 1. 今日速览

今日无正式 Release。仓库焦点集中在 qwen3.8 系列在多个后端上的稳定性问题（工具循环 500、下载 EOF、ROCm/MLX 异常），以及 0.32.14 在 NVIDIA sm_86 GPU 上静默回退 CPU 的严重回归。修复侧已有两个 PR 在审：qwen3.8 system message 规范化（#17855）和流式生成异常中止时返回错误（#17846）。

## 2. 版本发布与破坏性变更

- 无新版本发布，无正式迁移说明。
- 行为/文档变化：
  - [#17843](https://github.com/ollama/ollama/pull/17843) 将澄清 `eval_count` 包含 thinking tokens；按 `eval_count` 计费/统计口径需要调整。
  - [#17837](https://github.com/ollama/ollama/issues/17837) 显示 CLI `/set think true|false` 与后端参数校验不一致（MLX 后端返回 400）。若脚本依赖 think 布尔开关，需要同时兼容 `high/medium/low/max` 字符串。
- 依赖更新 PR 在审：[#17850 MLX update](https://github.com/ollama/ollama/pull/17850)、[#17851 llama.cpp update](https://github.com/ollama/ollama/pull/17851)，将随后续版本携带 runner 变化。

## 3. 新模型与硬件支持

- 今日无新模型、新架构或新量化格式正式发布。
- Intel 集成显卡支持仍是长期 feature request：[#3113](https://github.com/ollama/ollama/issues/3113)（Iris Xe 等）。
- Apple Silicon MLX 后端仍在更新：[#17850](https://github.com/ollama/ollama/pull/17850) 正在跟随上游 mlx-c PR。
- AMD Strix Halo（gfx1151 iGPU）在 ROCm 后端报告 KV 状态串扰，属正确性回归，见下文 [#17847](https://github.com/ollama/ollama/issues/17847)。
- Legacy macOS 支持请求：[#17842](https://github.com/ollama/ollama/issues/17842)，当前要求 macOS 14+，macOS 12 用户无法运行。

## 4. 性能与优化

- 进行中/提案：[#17752](https://github.com/ollama/ollama/pull/17752) 提出模型元数据缓存，避免每次请求重复解析 GGUF metadata，目标降低约 300 ms/请求 overhead；当前状态 closed，能否合入需继续观察。
- 已知性能缺口：[#17829](https://github.com/ollama/ollama/issues/17829) MLX 引擎无 prompt/prefix caching，多步 agent 会话中每个请求都会重新 prefill 20-30K token，TTFT 明显增长。
- 性能回归：[#17833](https://github.com/ollama/ollama/issues/17833) 在模型完全放入 VRAM 的情况下，0.32.14 相比 0.32.13 CPU 占用增加到 50-80%，建议先固定 0.32.13。
- 底层依赖更新可能带来优化：[#17851 llama.cpp update](https://github.com/ollama/ollama/pull/17851)、[#17850 MLX update](https://github.com/ollama/ollama/pull/17850)。

## 5. 稳定性与回归

按严重程度排列：

1. **[严重] CUDA sm_86 静默回退 CPU** — [#17841](https://github.com/ollama/ollama/issues/17841)  
   0.32.14 在 RTX 30 系 / A40 / A6000（compute capability 8.6）上不分配显存，仅 CPU 推理；疑为 CUDA 13 构建遗漏 8.6 arch，且 CUDA 12 fallback 失效。无 fix PR。

2. **[严重] ROCm KV 状态串扰** — [#17847](https://github.com/ollama/ollama/issues/17847)  
   0.32.14-rocm 在 Strix Halo gfx1151 上，后一个请求的响应内容会污染前一个请求的上下文，数据正确性受影响。无 fix PR。

3. **[回归] CPU 高占用** — [#17833](https://github.com/ollama/ollama/issues/17833)  
   模型已完全由 GPU 承载，但 0.32.14 CPU 占用 50-80%，0.32.13 正常。无 fix PR。

4. **[qwen3.8] 工具循环 500** — [#17778](https://github.com/ollama/ollama/issues/17778)  
   chat streaming 报 `no user query found in messages`（500），模型在工具调用循环中触发。相关修复 PR [#17855](https://github.com/ollama/ollama/pull/17855) 正在规范化 qwen3.8 system message 渲染。

5. **[Agent] macOS 本地 Qwen 挂起** — [#17839](https://github.com/ollama/ollama/issues/17839)  
   直接调用 Ollama API 正常，但 agent 集成（Claude Code 等）在 macOS 上无限挂起。无 fix PR。

6. **[API] 内部中止被误报为成功** — [#17836](https://github.com/ollama/ollama/issues/17836)  
   `/api/chat` stream:false 在服务器内部中止时返回 HTTP 200 + `done:false`，无 error 字段。已有 fix PR：[#17846](https://github.com/ollama/ollama/pull/17846) 在审。

7. **[qwen3.8] 下载/拉取失败** — [#17816](https://github.com/ollama/ollama/issues/17816)  
   `ollama run qwen3.8` 在 pulling manifest 阶段 EOF，无法拉取模型。无 fix PR。

8. **[ROCm/gfx1200] TensileLibrary 加载失败** — [#17782](https://github.com/ollama/ollama/issues/17782)  
   RX 9060 XT 运行 qwen3.8:27b 后报 `Could not load "TensileLibrary_lazy_gfx1200.dat"`。无 fix PR。

9. **[CLI 集成] `ollama launch claude` 交互失败** — [#17811](https://github.com/ollama/ollama/issues/17811)  
   0.24.0 + Claude Code 2.1.233，workspace trust 后聊天报 `Input must be provided either through stdin or as a prompt argument`。无 fix PR。

10. **[think mode] CLI/后端校验不一致** — [#17837](https://github.com/ollama/ollama/issues/17837)  
    CLI 接受 `/set think true`，后端返回 400 invalid think value。无 fix PR。

另外，一个针对 stale runner 的修复 PR 在审：[#17516](https://github.com/ollama/ollama/pull/17516)，用于处理 llama-server 进程退出后 `ollama ps` 仍显示已加载、健康检查仍通过的问题（涉及 #17428/#17509）。

## 6. 对应用开发者的意义

- **不要把 `200 + done:false` 当作成功**：在 [#17846](https://github.com/ollama/ollama/pull/17846) 合入前，客户端应额外校验 `done === true`，否则视为异常中止并重试。
- **qwen3.8 的 system message 行为可能变化**：[#17855](https://github.com/ollama/ollama/pull/17855) 会合并/规范化历史中的 system/developer 指令。若你的应用依赖多轮 system 消息注入，需要回归测试。
- **macOS + 本地 Qwen + agent 集成有风险**：[#17839](https://github.com/ollama/ollama/issues/17839) 显示直接 API 正常但 agent harness 会挂死；构建 agent 时建议加超时或等修复。
- **CUDA sm_86 用户先不要升级 0.32.14**：RTX 30 / A40 / A6000 环境可能静默走 CPU，使用 `ollama ps` 检查 PROCESSOR 字段，避免 SLA 失真。
- **token 统计口径调整**：`eval_count` 将明确包含 thinking tokens，成本/延迟监控需按实际 `eval_count` 计算，而不是 response 文本 token 数。
- **think 参数需要兼容字符串档位**：不要假设 `true/false` 在所有后端有效，建议在客户端同时接受 `high/medium/low/max/true/false`，并处理后端 400。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-19

## 1. 今日速览

过去 24 小时无新版本 Release，但 Issues/PRs 更新活跃（88 条 Issues、292 条 PRs 有变动）。当日焦点集中在三块：**MCP 配置与 OAuth 链路出现新回归**（#37258 字段静默丢失、#37273 工具重复执行）、**/health 与调试日志暴露敏感凭证**（#36898、已有修复 PR #37373）、**计费/预算正确性问题多发**（#27735 虚拟 key 预算误判、#37261 budget_reset_at 异常）。

## 2. 版本发布与破坏性变更

过去 24 小时无新版本发布，无破坏性变更需关注。

## 3. 新模型与硬件支持

- **PR #37375（OPEN）** — 修复 Bedrock Mantle `/responses` 端点静默丢弃 `web_search` 工具的问题：现在会保留所有 `web_search*` 变体再交给模型，并继续过滤 Mantle 不支持的参数。此前用户请求 Web Search 会得到一个普通回答且无任何报错。  
  https://github.com/BerriAI/litellm/pull/37375
- **PR #37369（OPEN）** — 为自定义 OpenAI 兼容推理模型补上 `reasoning_effort` 参数透传，并完善 `ModelInfo` TypedDict 缺失字段，解决自定义模型无法使用 reasoning 能力的问题。  
  https://github.com/BerriAI/litellm/pull/37369
- **Issue #37268（OPEN）** — 用户请求修正 `model_prices_and_context_window.json` 与备份文件中 `azure/gpt-5.6-sol` 的条目，目前定价数据有误。  
  https://github.com/BerriAI/litellm/issues/37268
- **Issue #31819（OPEN）** — 功能请求：将 Amazon Bedrock AgentCore Web Search 作为一等搜索提供者接入 `litellm.search()` 与 Claude Code websearch interception 后端。暂未实现。  
  https://github.com/BerriAI/litellm/issues/31819

## 4. 性能与优化

- **PR #37379（OPEN）** — 为 `LiteLLM_SpendLogs` 表新增 `(api_key, startTime DESC)` 复合索引，使用 `CONCURRENTLY` 构建。此前日志页按 key 过滤时每次翻页都会全表扫描整个日期窗口，该问题曾将客户 Aurora 写节点 CPU 打满至 **99.7%**。  
  https://github.com/BerriAI/litellm/pull/37379
- **PR #37367（已合并）** — 语义缓存修复：对嵌入输入先做截断，避免超过 embedding 模型上限后静默失败、缓存永远不命中；同时修正 `extra_body` 以顶层传递而不是嵌套字面量，防止 vLLM/NIM 等严格 OpenAI 兼容服务拒绝请求。  
  https://github.com/BerriAI/litellm/pull/37367
- **PR #37368（OPEN）** — 为 assistants runs 和 A2A SSE 流式响应增加 pre-first-byte keepalive，解决 60s 空闲超时跳点导致健康连接被中断的问题。  
  https://github.com/BerriAI/litellm/pull/37368
- **PR #36595（OPEN）** — OTel 可观测性优化：将 Prisma 数据库调用产生的 span 从 `litellm-server -> localhost` 归因到实际 PostgreSQL 实例，修正 ddtrace/httpx instrumentation 下的 APM 拓扑。  
  https://github.com/BerriAI/litellm/pull/36595

## 5. 稳定性与回归

按严重程度排列，注明是否已有修复 PR。

**严重**

- **#37273（无 fix PR）** — `/v1/messages` 流式响应中，单个 `tool_use` 块会触发**两个 `content_block_stop`** 事件，导致客户端（如 Claude Code）将同一个工具执行两次。新 issue，需关注合入。  
  https://github.com/BerriAI/litellm/issues/37273
- **#35590（无 fix PR）** — adaptive_router 中只要有一个持久化的 `alpha/beta=0` 单元格，整个路由器就会**永久 HTTP 500**，报 `gammavariate: alpha and beta must be > 0.0`，重启不恢复。  
  https://github.com/BerriAI/litellm/issues/35590
- **#36898（无 fix PR）** — `GET /health` 端点明文返回 `extra_headers` 与 `aws_session_token`，`api_key` 已脱敏但这两个字段没有。同类问题 #18818 只修了 `/model/info`。  
  https://github.com/BerriAI/litellm/issues/36898
- **#37258（无 fix PR）** — 当 MCP server 配置了 `auth_type: oauth2` 且 `delegate_auth_to_upstream=true` 时，任何 `PUT /v1/mcp/server` 更新都会**静默清空** `authorization_url`、`token_url`、`oauth2_flow`。  
  https://github.com/BerriAI/litellm/issues/37258

**中高**

- **#27735（无 fix PR）** — 虚拟 key 的 `BudgetExceededError` 使用陈旧 spend 值判定，管理 API 显示的 spend 低于 `max_budget` 时请求仍被拒绝，影响线上计费正确性。  
  https://github.com/BerriAI/litellm/issues/27735
- **#37261（无 fix PR）** — 未配置 Redis 时，`provider_budget_config` 的 `GET /provider/budgets` 返回的 `budget_reset_at` 在**约 57 年后**，月度预算实际上永不重置。  
  https://github.com/BerriAI/litellm/issues/37261
- **#25429（无 fix PR）** — `chatgpt/gpt-5.4` + ChatGPT 订阅鉴权下，`litellm.responses()` 返回空输出，`completion()` 桥接报 "Unknown items in responses API response: []"。  
  https://github.com/BerriAI/litellm/issues/25429
- **#23741（无 fix PR）** — 请求体包含 `vector_store_ids`/`vector_stores` 时，Anthropic API 返回 400 "Extra inputs are not permitted"，说明 LiteLLM 未过滤 Anthropic 不支持的字段。  
  https://github.com/BerriAI/litellm/issues/23741

**中**

- **#27473（无 fix PR）** — `litellm_params` 中配置 `model: auto_router/complexity_router` 后所有请求报 400 `Unmapped LLM provider`，1.83.14 起出现。  
  https://github.com/BerriAI/litellm/issues/27473
- **#22173（无 fix PR）** — 最新 Helm chart 指向一个不存在的镜像，部署时 `ImagePullBackOff`。  
  https://github.com/BerriAI/litellm/issues/22173
- **#27492（无 fix PR）** — `use_chat_completions_api=true` 且上游返回 `reasoning_content` 时，转 Anthropic Messages 格式会丢掉 `content` 字段。  
  https://github.com/BerriAI/litellm/issues/27492
- **#21312（无 fix PR）** — 失败请求不计入虚拟 key 的 RPM 限制，攻击者可以通过大量失败请求绕过频率控制。  
  https://github.com/BerriAI/litellm/issues/21312
- **#37102（无 fix PR）** — 当 Bedrock `CountTokens` 不支持模型（包括 Claude Opus 5/Sonnet 5）时，litellm 静默返回偏低的 token 数，影响计费和上下文管理。  
  https://github.com/BerriAI/litellm/issues/37102

**当日相关修复 PR（合入或进行中）**

- **PR #37373（OPEN）** — 修复 vector store 搜索调试日志泄露连接配置、认证对象、请求头的问题。  
  https://github.com/BerriAI/litellm/pull/37373
- **PR #37362（已合并）** — Bedrock guardrail 调用成本纳入 spend/预算，此前 block 请求被记录为 $0，漏计 AWS 实际扣费。  
  https://github.com/BerriAI/litellm/pull/37362
- **PR #37331（已合并）** — 新增 `DELETE /team/{team_id}/callback/{callback_name}`，此前团队回调只能全量删、无法单独移除。  
  https://github.com/BerriAI/litellm/pull/37331
- **PR #37384（OPEN）** — 修复 MCP DCR bridge OAuth 挑战：首次请求无法发现 OAuth、无效凭证不触发重新授权。  
  https://github.com/BerriAI/litellm/pull/37384

## 6. 对应用开发者的意义

- **流式工具调用存在重复执行风险**：#37273 会导致同一 tool_use 触发两次 `content_block_stop`，依赖 `/v1/messages` 流式端点的 Agent 应用在执行关键写操作（文件写入、数据库变更）前应确认是否受影响，必要时暂时绕到非流式路径。  
- **MCP 配置更新后需复查 OAuth 字段**：如果你的自动化流程通过 `PUT /v1/mcp/server` 更新 OAuth2 MCP server，注意 #37258 会静默清空授权相关字段，CI/CD 中应增加配置回读校验。  
- **`/health` 端点不建议暴露在公网**：该接口返回的 `extra_headers` 与 `aws_session_token` 属于敏感信息，若已有监控系统探活该端点，建议加访问控制或等待修复版本。  
- **预算/配额目前不宜作为唯一硬隔离手段**：#27735 和 #37261 分别说明虚拟 key 预算可能误判、provider 月度预算重置时间错误。建议以用量监控为主、预算强控为辅，并关注后续 patch release。  
- **值得期待的改进**：SSE keepalive（#37368）、SpendLogs 索引（#37379）、语义缓存正确性（#37367）和项目级 ITPM/OTPM 配额（#35110）都已进入 PR 阶段，对长时间流式连接、高频 key 查询和多租户容量管理的开发者有直接收益，可安排提前验证。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-19

## 今日速览
今日亮点集中在 **Unsloth Studio 的稳定性与性能回归修复**：多个内存泄漏（Shiki token 缓存、推理窗格 DOM 爆炸）和崩溃问题（markdown 渲染、M1 Max 上下文超限内核 panic）已提交修复 PR。同时，**Ollama 模型接入**（#9237）与 **edit_file 工具**（#8753）两个功能 PR 补强了 Studio 的代理开发生态，AMD ROCm/VRAM 检测链路也有针对性修复。

## 版本发布与破坏性变更
无新版本发布。以下为当日合并/提出的行为变更，升级后需注意：

- **Windows 上 `unsloth start codex` / `unsloth start pi` 可执行文件解析修复**（PR #9238）：优先选择 `.cmd` 同名 shim，修复 `WinError 193` 崩溃。
- **Studio 拒绝超出统一内存容量的手动上下文设置**（PR #9172）：在 M1 Max 上手动设置过大 ctx 曾两次导致内核 panic，现已加保护。
- **量化 KV cache 在张量并行下不再被丢弃**（PR #8939）：此前 TP 分裂时仅允许 f16/bf16/f32，现恢复其它量化类型支持。

链接：[#9238](https://github.com/unslothai/unsloth/pull/9238) · [#9172](https://github.com/unslothai/unsloth/pull/9172) · [#8939](https://github.com/unslothai/unsloth/pull/8939)

## 新模型与硬件支持
- **Ollama 本地模型接入 Studio 模型选择器**（PR #9237）：修复 `source="ollama"` 行被前端丢弃的问题，聊天选择器中可列出 Ollama 拉取的模型并加载其 manifest 引用。 fixes [#9226](https://github.com/unslothai/unsloth/issues/9226)。
- **Linux ROCm 检测修复（Debian 13 / LMDE）**（PR #8886）：修复旧版 `hipconfig`（5.7.x）与新 HSA runtime（6.1.x）并存时误判为 CPU 的问题。
- **Windows AMD VRAM 上报修复**（PR #8863）：通过 LUID 连接 GPU 适配器计数器，解决 Windows ROCm 下 VRAM 显示为 0 的问题。
- **aarch64 容器镜像请求仍在开放中**（Issue #4198，+1 👍）。
- 新下载源请求：**ModelScope 集成**（Issue #9117）呼声已记录。

链接：[#9237](https://github.com/unslothai/unsloth/pull/9237) · [#8886](https://github.com/unslothai/unsloth/pull/8886) · [#8863](https://github.com/unslothai/unsloth/pull/8863) · [#4198](https://github.com/unslothai/unsloth/issues/4198)

## 性能与优化
- **流式代码围栏 JS 堆泄漏修复**（PR #9228）：此前流式渲染 32KB 代码块时，约每 250ms 保留 0.28MB，83 秒的响应可额外驻留 **82.71MB** 堆内存；通过给 Shiki token 缓存设上限修复。
- **流式推理窗格 DOM 窗口化**（PR #9231）：长推理时 256px 高的滚动区内最多挂载 15,000 个元素和 14,000 个 Shiki 高亮 span，导致帧率坍塌；改为窗口化渲染后显著降低渲染压力。
- **SQLite 读取移出事件循环线程**（PR #9234）：避免文件 I/O 阻塞时整个 Studio 无响应（`/api/liveness` 超时），SQLite 进程级 VFS 互斥锁不再堵死事件循环。
- **侧边栏聊天历史不再全量重新分组**（PR #9227）：`useChatSidebarItems` 的 `groupThreads` 此前未 memoize，每次刷新都会遍历全部历史并分配新对象；现已缓存。
- **模型选择器行内 Radix 组件按需挂载**（PR #9233）：每个“On Device”repo 行不再预先挂载 3 个 tooltip + 1 个 dropdown menu，首次悬停/聚焦时才创建。

链接：[#9228](https://github.com/unslothai/unsloth/pull/9228) · [#9231](https://github.com/unslothai/unsloth/pull/9231) · [#9234](https://github.com/unslothai/unsloth/pull/9234) · [#9227](https://github.com/unslothai/unsloth/pull/9227) · [#9233](https://github.com/unslothai/unsloth/pull/9233)

## 稳定性与回归
按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| **内核 panic** | **M1 Max 32GB 上手动设置过大的上下文长度**（Qwen3 27B Q4_K_XL）导致内核崩溃（PR #9172 修复中） | [Issue](https://github.com/unslothai/unsloth/issues/9172) · [PR](https://github.com/unslothai/unsloth/pull/9172) |
| **崩溃** | **单个 markdown 块加载失败拖垮整个 Studio**：`React.lazy` 加载 Shiki/Mermaid chunk 失败后无降级（PR #9236 修复中） | [Issue #9235](https://github.com/unslothai/unsloth/issues/9235) · [PR #9236](https://github.com/unslothai/unsloth/pull/9236) |
| **崩溃** | **macOS 应用二次启动报错**，M4 Pro 复现，unsloth_zoo 2026.8.12 | [Issue #8610](https://github.com/unslothai/unsloth/issues/8610) |
| **崩溃** | Studio 在 Claude Code 响应生成超时后崩溃 | [Issue #8916](https://github.com/unslothai/unsloth/issues/8916) |
| **正确性** | **并行 MCP 工具调用的 JSON 参数被拼接**到首个调用的 `function.arguments`，导致后续请求持续 `Extra data` 错误 | [Issue #9022](https://github.com/unslothai/unsloth/issues/9022) |
| **功能回归** | NVFP4 在 RTX 5060 Ti 16GB 上无法加载（CUDA 610.74） | [Issue #8246](https://github.com/unslothai/unsloth/issues/8246) |
| **功能回归** | Studio 报告 AMD GPU（gfx1201）但后端实际跑 CPU-only，VRAM 显示 `--` | [Issue #8473](https://github.com/unslothai/unsloth/issues/8473) |
| **功能回归** | `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` 在 Strix Halo 上阻止 GPU offload | [Issue #8651](https://github.com/unslothai/unsloth/issues/8651) |
| **可用性** | 首次启动 setup 失败：can not acquire lock | [Issue #9140](https://github.com/unslothai/unsloth/issues/9140) |
| **可用性** | `/embeddings` API 几乎不可用 | [Issue #9128](https://github.com/unslothai/unsloth/issues/9128) |
| **可用性** | 同聊天中连续两次 web 搜索必失败（cloud models） | [Issue #9108](https://github.com/unslothai/unsloth/issues/9108) |

另有多项已修复/关闭：AMD LLVM ERROR fdot2（#5337，closed）、MCPs broken（#8790，closed）、sd-cli SIGABRT（#8322，closed）、进程 PDEATHSIG 在 PID 1 下误杀子进程（#6756，closed）。

链接：[#9172](https://github.com/unslothai/unsloth/pull/9172) · [#9236](https://github.com/unslothai/unsloth/pull/9236) · [#9022](https://github.com/unslothai/unsloth/issues/9022) · [#8246](https://github.com/unslothai/unsloth/issues/8246) · [#8473](https://github.com/unslothai/unsloth/issues/8473)

## 对应用开发者的意义
- **MCP 并行调用错误（#9022）值得警惕**：若你的 Agent 依赖 Studio 的 MCP 并行工具调用历史，升级前确认该修复是否已合入，否则多工具并行会产生畸形 `assistant` 消息持久化，污染后续轮次。
- **Ollama 模型正式接入模型选择器（#9237）**：本地已有 Ollama 模型的开发者无需再手动 pull，可直接在 Studio 聊天选择器中使用，降低多路径模型管理的摩擦。
- **edit_file 工具进入 Studio 代理（#8753）**：修复此前 Agent 依赖 `cat` 重写整个大文件导致的上下文耗尽，64K-94K context 下的大文件编辑类任务将有本质改善。
- **embedding API 不稳定（#9128）**：依赖 `/embeddings` 做 RAG 检索的应用在修复前需做好 fallback 或重试策略。
- **局域网/0.0.0.0 监听需求持续升温**（#8578 有 8 👍、#8898、#8934）：在内部网络暴露 Studio 服务仍是高频需求，贡献者已多次提交，官方尚未合入。

---

*本日报由 GitHub 数据自动生成，数据抓取时间 2026-08-19。*

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*