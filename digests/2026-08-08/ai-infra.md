# AI 基础设施日报 2026-08-08

> 生成时间: 2026-08-07 16:38 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施横向对比分析报告 — 2026-08-08

## 1. 生态全景

DeepSeek-V4 系列 checkpoint（Flash-0731 与 DSpark）已成为全生态的"压力测试器"：vLLM/SGLang/llama.cpp 在 SM120 路由、KV cache 用量、NaN 污染、CUDA-Graph 非法内存上集中爆发正确性问题，各项目正处于密集修复期，"新模型可用"与"新模型可部署"之间出现显著时滞。与此同时，量化推理（MXFP4/NVFP4/FP8/A8W4）与 MoE 显存优化（专家热缓存、在线量化、分层驻留）构成性能竞争共识，Blackwell SM120 与 ROCm gfx950 的 kernel 级适配是硬件支持主战场。流式/长驻场景下的跨请求状态污染（Ollama MLX）、MTP+前缀缓存精度退化（vLLM）、router 调度行为变更（llama.cpp）等新问题与老回归并存，生产部署需更谨慎的版本锁定策略。

## 2. 各项目活跃度对比

| 项目 | Release | Issues（提及数） | PRs（提及数） | 高频主题 |
|---|---|---|---|---|
| vLLM | 0 | 14 | 11 | DeepSeek-V4 SM8x/SM120 适配、KV cache 异常、MXFP4 在线量化、PD 分离 |
| SGLang | 0 | 16 | 16 | DSpark NaN/非法内存、SM120 FP8、VLM 多节点通信 |
| llama.cpp | 10（b10299–b10312） | 13 | 22 | SYCL/Metal/Windows 修复、router 行为、hipBLASLt、专家热缓存 |
| Ollama | 0 | 16 | 13 | MLX 跨请求污染、中文乱码、Laguna parser、NTFS 路径 |
| LiteLLM | 0 | 19（24h 更新 71 条） | 10（24h 更新 225 条） | 成本核算回归、session affinity、依赖 CVE、路由策略 |
| Unsloth | 1（2026.8.8） | 6 | 12 | Windows ROCm 修复、Studio 性能、transformers 5.0 兼容 |

*注：Issue/PR 数为日报中提及的具体编号，非全量仓库数据。*

活跃度特征：llama.cpp 以 24 小时 10 个版本展示"小步快跑"迭代节奏；LiteLLM 无发版但 PR 更新量（225 条）为六者最高，网关层集成/修复需求旺盛；vLLM 与 SGLang 均无发版，处于"积累修复、待集中发版"窗口期。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth | LiteLLM |
|---|---|---|---|---|---|---|
| DeepSeek-V4-Flash-0731 | 🔴 SM8x 不支持；SM120 路由失败；KV cache 用量 8× 异常 | 🔴 并发输出损坏、watchdog timeout | 🟡 Vulkan DeviceLost、RPC 乱码 | 🟡 经 llama.cpp 传递 | — | —（网关层） |
| DeepSeek-V4 / DSpark | 🟢 置信度调度验证中 | 🔴 多处 NaN，PR #33974 已修两个根因 | 🟢 SYCL 新算子、`-sm tensor` | 🟡 KV cache 短空闲丢失 | — | 🔴 anthropic 兼容端点多轮 400 |
| Kimi-K3 | 🟢 ROCm 跟踪 + A8W4/FP8 KV 修复中 | 🟢 CPU-transport 图像预处理 | — | — | — | — |
| MiniMax-H3 | — | 🟢 跨节点序列并行 | — | — | 🟢 文生视频（PR） | — |
| Qwen3.6 系列 | 🔴 MTP+前缀缓存精度 -20% | 🔴 tool-call-parser 不可信 | 🟡 Strix Halo 性能问题 | 🔴 M2 性能回退 | — | — |

**领先者**：数据中心场景下 vLLM/SGLang 在新 checkpoint 的 kernel 级适配最为前沿，但代价是大量 open 严重 bug；llama.cpp 在后端广度（SYCL/Metal/Vulkan/CPU）上领先，DeepSeek-V4 算子支持明显提速；Ollama/Unsloth 作为外层封装，受上游 llama.cpp 影响显著。

## 4. 性能优化前沿

优化火力集中在五个方向：

1. **量化走向"在线化"**：vLLM 新增 MXFP4 在线量化（#49347），支持对 BF16/FP16 模型直接启用量化、对部分预量化 checkpoint 混合处理（#51392）；FlashInfer NVFP4 后端（#49775）与 K3 A8W4（#50813）同步扩展格式覆盖。量化已从离线预处理变为推理引擎内置能力。

2. **投机解码从"能用"到"可用"**：vLLM 以 DSpark 置信度调度（#47808）替代固定长度验证预算；SGLang 修复 DSpark 的 page 未清零 + int32 slot-stride 溢出两个 NaN 根因（#33974）。但 MTP 仍是正确性重灾区（vLLM #35288 高并发损坏、#43559 精度 -20%），可靠性为当前最大短板。

3. **MoE 显存"分层驻留"**：llama.cpp 的 CUDA 专家热缓存（#26563）与 MoE 加权 reduction 融合（#25952）；Ollama 社区直接请求专家驻留 host RAM（#17557）；vLLM 通过 EPLB 冗余专家数自动选择（#30075）防止 KV cache 被挤占。MoE 权重正从"全量驻留 VRAM"走向"按热度分层"。

4. **分布式/多节点服务化**：vLLM 在 ROCm 落地 TP 模式 PD 分离（#48989，MORI IO KV Connector）；SGLang 并行推进跨节点序列并行（#33327）、MNNVL FABRIC 视觉特征传输（#33936）、encoder-DP 延迟物化（#33952）；llama.cpp 为 RPC 节点增加容错（#26724）。

5. **算子融合与后端调优**：llama.cpp 在 RDNA3.5 默认启用 hipBLASLt，prefill 最高 +44%（#26644），并修复 quantized cpy kernel 仅 3.1% 的 warp 利用率（#26731）；SGLang 集成 aiter FP8 MLA decode kernel（#33993）与 FlashInfer rmsnorm+quant 融合（#33471）。反例是 vLLM 的 QKNorm+RoPE 融合在 H100 上反而更慢（#34391）——融合并非净收益，需架构级验证。

## 5. 分层定位差异

| 层 | 项目 | 今日动态体现的定位 |
|---|---|---|
| 训练/微调 | Unsloth | 以微调为核心，但 Studio 已托管 llama-server，向"训练+轻量推理"双模演进；今日重点是 Windows ROCm 可用性 |
| 推理引擎（数据中心） | vLLM / SGLang | 同层直接竞争：高吞吐、PD 分离、投机解码、量化 kernel。vLLM 偏工程稳健（冷启动恢复、队列管理）；SGLang 偏快速激进（跨节点、FABRIC、多模态），今日 open 严重 bug 显著更多 |
| 本地推理运行时 | llama.cpp | C/C++ 轻量运行时，后端覆盖最广，高频发版；今日面向消费级 GPU（RDNA3.5、Blackwell、Strix Halo）优化密度高 |
| 本地/边缘部署 | Ollama | llama.cpp 之上的"开发者体验封装"，今日修复集中于路径解析、parser 误判、进程级 panic——典型的"补体验"而非"补内核"；MLX Vision PR 在补齐 Apple 视觉能力 |
| LLM 网关 | LiteLLM | 不碰模型/内核，专注路由、成本、鉴权、协议转换；225 条 PR 更新集中在 session affinity、per-deployment 故障策略、tag 路由、成本修复 |
| 交叉地带 | llama.cpp router / Ollama MLX / Unsloth Studio | llama.cpp router 不驱逐忙碌模型（#26567），已具轻量编排语义；Unsloth Studio API monitor（tok/s/TTFT/插槽占用）向网关观测延伸；Ollama MLX 跨请求污染暴露长驻 runner 不成熟 |

**核心差异**：vLLM/SGLang 比拼 GPU 利用率极限，llama.cpp/Ollama 比拼端到端可运行性，LiteLLM 比拼控制面完备性，Unsloth 比拼训练到部署的闭环效率。各层向上延伸（llama.cpp 的 server 能力、Ollama/Unsloth 的观测能力）正在模糊分层边界。

## 6. 值得关注的趋势信号

**行业趋势**：

1. **主流 checkpoint 发布引发全栈"适配债"集中爆发**。今日六项目合计约 14 个 DeepSeek-V4 相关 open 严重问题（NaN、非法内存、输出损坏、KV cache 异常）。新模型的"可用"与"可部署"之间存在 1-2 个发版周期的时滞，生产采用应滞后于社区修复稳定期。

2. **量化从离线预处理转向在线/混合模式**。MXFP4 在线量化与部分预量化 checkpoint 支持意味着用户可跳过离线量化流水线，格式转换成本被吸收进推理引擎内部，但这也要求引擎兼容层覆盖更多 quant_method。

3. **MoE 显存进入"分层驻留"时代**。专家热缓存、host RAM offload 请求、EPLB 冗余专家优化共同指向：MoE 权重按访问频次在 GPU/CPU 间动态分层，这是消费级显存运行 30B+ MoE 的必要路径。

4. **"状态复用"引入新一类可靠性边界**。Ollama MLX 跨请求污染、MTP+前缀缓存精度退化、VLM 的 IPC feature pool 竞态——keep-alive、前缀缓存、长驻 runner 等状态复用手段一旦隔离失效，代价是数据串线级别的严重事故。

**Agent/应用开发者行动建议**：

- **在网关/应用层增加响应校验**：面对 MLX 跨请求污染、MTP 高并发输出损坏、Laguna parser 误判，Agent 框架不应盲信上游输出。建议增加请求-响应 ID 关联、工具参数域验证（Ollama enum 未强制）、结构化输出 schema 校验。
- **版本锁定细化到 PR 级别**：多个严重 bug 修复已存在但未合入/未发版（SGLang #33974、vLLM #50181、Ollama #17603）。建议跟踪关键 fix PR 状态，必要时自建镜像提前 cherry-pick。
- **成本数据需独立抽样核对**：LiteLLM `azure/gpt-5.6-luna` 成本少报 5 倍（#36094），成本核算可能静默出错，勿完全依赖单一来源。
- **新硬件采购参考 kernel 就绪度**：SM120 仍存在 FP8 崩溃、FlashInfer 路由失败、CUDA illegal memory；ROCm gfx950 处于 PD 分离早期可测试阶段。硬件先行、软件滞后的状况预计持续 1-2 个季度。
- **预留队列/路由配置位**：vLLM 队列长度上限、LiteLLM session affinity 与 tag 路由、llama.cpp 繁忙模型保护，标志 LLM 基础设施正从"尽力转发"走向"可预期资源编排"，Agent 平台设计时应提前预留透传能力。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 — 2026-08-08

## 今日速览

过去 24 小时无新 Release。社区讨论热度高度集中在 DeepSeek-V4-Flash-0731 在旧架构（SM8x/A100）与消费级 Blackwell（SM120）上的适配与 KV cache 异常问题；研发侧，DSpark 置信度调度验证、MXFP4 在线量化、Kimi-K3 ROCm 支持为当前 PR 主线。另有多个 MTP/前缀缓存相关的正确性 Bug 持续被关注。

---

## 新模型与硬件支持

- **DeepSeek-V4-Flash-0731 仍不支持 SM8x（Ampere）** — 该 checkpoint 与预览版在 A100/A800/RTX 30xx 上无法运行，87 条评论热度极高，目前仍为 Open 状态。
  [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)

- **[RFC] CUDA Checkpoint/Restore 实现近零冷启动** — 面向 v1 engine，目标解决多模型切换场景下的冷启动延迟，尚处草案阶段。
  [Issue #34303](https://github.com/vllm-project/vllm/issues/34303)

- **Kimi-K3 ROCm 支持与性能跟踪** — 建立上游工作跟踪，Day 0 已集成 AITER fused-moe 的 a16w4/a8w4 路径。
  [Issue #50682](https://github.com/vllm-project/vllm/issues/50682)

- **在线 MXFP4 量化（PR）** — 新增在线 MXFP4 linear/MoE 量化支持，用户可直接对 BF16/FP16 模型使用 `--quantization mxfp4`，含 Triton fallback。
  [PR #49347](https://github.com/vllm-project/vllm/pull/49347)

- **K3 SiTUv2 A8W4 路由 MoE（ROCm/gfx950）** — 为 K3 Quark 权重量化增加显式 opt-in A8W4 路径，并复用 MXFP4 权重预置逻辑。
  [PR #50813](https://github.com/vllm-project/vllm/pull/50813)

- **FlashInfer CuTe-DSL NVFP4 量化（PR）** — 新增 NVFP4 激活量化的 FlashInfer 后端，支持 linear、128x4、TRTLLM small-M 8x4 scale 布局，默认仍走 vLLM 内置 kernel。
  [PR #49775](https://github.com/vllm-project/vllm/pull/49775)

- **DeepSeek-V4-Pro PD 分离部署（ROCm，PR）** — 通过 MORI IO KV Connector 在 AMD GPU（MI355X-AINIC）上启用 TP 模式 PD Disaggregation。
  [PR #48989](https://github.com/vllm-project/vllm/pull/48989)

---

## 性能与优化

- **DSpark 置信度调度验证** — 根据每个请求的 draft token 置信度自适应调整验证预算，缓解高并发下固定长度投机验证对 GPU 算力的浪费。
  [PR #47808](https://github.com/vllm-project/vllm/pull/47808)

- **在线量化支持部分预量化 checkpoint** — 允许对来自任意 quant_method（Quark、ModelOpt、compressed-tensors 等）的已量化 checkpoint 中未量化部分做在线量化。
  [PR #51392](https://github.com/vllm-project/vllm/pull/51392)

- **QKNorm+RoPE fusion 在 H100 上反而更慢** — 性能回归报告指出融合实现劣于未融合版本，待优化。
  [Issue #34391](https://github.com/vllm-project/vllm/issues/34391)

- **A100 批量不变性（batch invariance）需求** — 当前仅支持 CC >= 9.0（H/B 系列），社区询问 A100 支持计划。
  [Issue #32658](https://github.com/vllm-project/vllm/issues/32658)

- **EPLB 冗余专家数自动选择** — 建议默认按启动配置推导最低有效专家数，避免手动设置且防止 KV cache 被过度挤占。
  [Issue #30075](https://github.com/vllm-project/vllm/issues/30075)

- **GLM 5.2 性能优化专项** — 跟踪多个针对 GLM 5.2 的优化 PR，部分已合并。
  [Issue #46654](https://github.com/vllm-project/vllm/issues/46654)

---

## 稳定性与回归

按严重程度排列：

- **[严重] MTP + Prefix Caching 导致精度下降约 20%** — Qwen3.6 35B-A3B 上复现，已关闭。
  [Issue #43559](https://github.com/vllm-project/vllm/issues/43559)

- **[严重] MTP 投机解码在高并发（>=4）下输出损坏** — V1 engine，仍 Open，未见明确修复 PR。
  [Issue #35288](https://github.com/vllm-project/vllm/issues/35288)

- **[严重] DeepSeek-V4-Flash-0731 在 SM120 上 FlashInfer sparse MLA 路由失败** — RTX PRO 6000 Blackwell 无法运行。
  [Issue #50720](https://github.com/vllm-project/vllm/issues/50720)

- **[高] DeepSeek-V4-Flash-0731 KV cache 使用量异常** — 相比预览版 KV cache 每 token 占用约 8 倍（56 bytes/token），H20 TP=2 下 max_model_len 被压缩至约 12 万。
  [Issue #51041](https://github.com/vllm-project/vllm/issues/51041)

- **[高] Kimi-K3 FP8 KV cache 下 prefill query 量化选择错误（修复 PR 已就绪）** — `use_prefill_query_quantization` 配置未生效。修复 PR: [PR #50181](https://github.com/vllm-project/vllm/pull/50181)

- **[高] Mamba + KV offloading 断言错误（已有修复 PR）** — `assert num_blocks <= len(group_blocks)` 失败。修复 PR: [PR #51421](https://github.com/vllm-project/vllm/pull/51421)

- **[中] LoRA merged set_lora 单张量 lora_a 未扩展（已有修复 PR）** — `lora_a[i]` 返回行向量而非第 i 个切片。修复 PR: [PR #51423](https://github.com/vllm-project/vllm/pull/51423)

- **[中] Block-scaled FP8（W8A8）在 SM120 上加载崩溃** — DeepGEMM 断言 “Unknown SF transformation”，仍 Open。
  [Issue #47436](https://github.com/vllm-project/vllm/issues/47436)

- **[中] ROCm DeepEP 高吞吐测试 teardown 阶段 SIGSEGV（已修复）** — 根因指向 HSA runtime，已将 rocprofiler-sdk 排除出测试 worker。
  [PR #51173](https://github.com/vllm-project/vllm/pull/51173)

- **[中] Mamba-2 Triton 在 SM121（DGX Spark）非法指令** — 仅在异步模式触发；Gemma 4 高上下文输出不连贯（已关闭）等亦有报告。
  - [Issue #37431](https://github.com/vllm-project/vllm/issues/37431)
  - [Issue #51140](https://github.com/vllm-project/vllm/issues/51140)

---

## 对应用开发者的意义

- **DeepSeek-V4-Flash-0731 暂勿在生产部署到 A100/RTX 30xx 或 SM120 设备** — 如果当前基础架构以 A100 为主，请等待上游适配完成；同时关注 KV cache 用量异常问题，避免上线后 max_model_len 不及预期。
- **MTP 投机解码 + prefix caching 存在精度缺陷，高并发场景请关闭 MTP** — #35288 与 #43559 表明该组合在并发稍高时可能产生错误输出，建议线上默认 `--disable-speculation` 或采用其他投机方案，关注修复进展。
- **ROCm 平台可关注 MORI KV Connector 与 K3 A8W4 进展** — 若目标机型为 MI355X 或 gfx950，PD 分离与 K3 优化已进入可测试阶段。
- **队列管理能力即将落地（`max_num_queued_reqs`/`max_num_queued_tokens`）** — vLLM 引擎当前无限接受请求、排队时间不可控的痛点将获得显式配置能力，Agent 场景下建议预留该参数位。
- **在线量化与部分预量化 checkpoint 的 MXFP4 支持** — 对高吞吐/低显存环境是实用能力，无需事先离线量化即可直接部署，建议关注其 Triton fallback 的 kernel 覆盖范围。
- **LoRA 指标将会暴露 —— `loaded adapters` 常驻指标** — 有助于路由与弹性伸缩系统感知已加载 LoRA 适配器状态，避免闲置卸载后再加载的延迟。
  [PR #45411](https://github.com/vllm-project/vllm/pull/45411)

---

*数据源: github.com/vllm-project/vllm（过去 24 小时更新）*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-08

## 1. 今日速览

- **DeepSeek-V4 系列仍是社区焦点**：DSpark 与 DeepSeek-V4-Flash-0731 在多地报告 CUDA-Graph 非法内存、NaN 污染与并发输出损坏问题，同时已有 PR（#33974）定位并修复两个 NaN 根因。
- **SM120（Blackwell）优化密集推进**：社区新增多份 FP8 GEMM 优化与 MoE 融合请求，且均已挂在 #19637 总路线下持续跟踪。
- **多模态与分布式方向显著加速**：MNNVL FABRIC 传输、跨节点序列并行、视觉特征延迟物化等一批 PR 集中在 8月7日 更新，VLM 多节点部署能力处于快速迭代期。

---

## 2. 版本发布与破坏性变更

- **过去 24 小时无新 Release**。
- 配置层出现内部重构：#33888 删除 15 处废弃的 `get_server_args()` 绑定及孤立 import，属纯内部清理，不影响公开 API。另 #33889 将 shared-experts-fusion 决策改为 loader 安装的 per-runner 值，影响 DSpark/MTP 草稿模型的配置记录，建议关注合入后行为变化。
  - [PR #33888](https://github.com/sgl-project/sglang/pull/33888)
  - [PR #33889](https://github.com/sgl-project/sglang/pull/33889)

---

## 3. 新模型与硬件支持

- **Qwen3-MoE + mori a2a 后端修复**（#34006）：修复 `MoeA2ABackend.is_deepep()` 精确枚举匹配导致 Qwen3-MoE 回退到 `forward_normal` 后重复 all-reduce 产生垃圾输出的问题。
  - [PR #34006](https://github.com/sgl-project/sglang/pull/34006)
- **MiniMax-H3 跨节点序列并行**（#33327）：以 node-local Ulysses + cross-node Ring 组合支持超长序列跨节点扩展，并新增 `--nnodes` / `--node-rank` / `--dist-init-addr` 启动基础设施。
  - [PR #33327](https://github.com/sgl-project/sglang/pull/33327)
- **HiCache 支持 Ascend Mamba host 传输**（#32275）：新增 kernel_ascend D2H/H2D 路径，覆盖 Qwen3.5-0.8B Mamba write-t 场景。
  - [PR #32275](https://github.com/sgl-project/sglang/pull/32275)
- **MNNVL FABRIC 视觉特征传输**（#33936）：新增 `--mm-feature-transport fabric`，多节点 GB200/GB300 自动启用，CPU 仍为 opt-out。
  - [PR #33936](https://github.com/sgl-project/sglang/pull/33936)
- **SM120 系列新优化请求**：#33632（Per-Tensor FP8 GEMM）、#33629（FP8 Blockwise 128×128 GEMM）、#33706（Qwen3.5/3.6 MoE shared-to-sparse experts 融合）。
  - [Issue #33632](https://github.com/sgl-project/sglang/issues/33632)
  - [Issue #33629](https://github.com/sgl-project/sglang/issues/33629)
  - [Issue #33706](https://github.com/sgl-project/sglang/issues/33706)
- **已知问题**：Gemma-4-31B QAT W4A16 在 DGX Spark（SM121/aarch64）GPTQ Marlin repack 路径启动失败（#28018）。
  - [Issue #28018](https://github.com/sgl-project/sglang/issues/28018)

---

## 4. 性能与优化

- **Dsv4 MLA decode 加速**（#33993）：集成 aiter fp8 ASM MLA decode kernel 至 unified_kv 路径，并引入 store-time fp8 mirror pool 保证 CUDA-graph 安全。
  - [PR #33993](https://github.com/sgl-project/sglang/pull/33993)
- **FlashInfer rmsnorm + quant 融合**（#33471）：支持 SM90 / SM100 / SM120 三种架构，对应 #32994。
  - [PR #33471](https://github.com/sgl-project/sglang/pull/33471)
- **EAGLE speculative top-k=1 采样加速**（#34005）：跳过完整 softmax 物化，直接使用 AITER `greedy_sample`，降低 ROCm 路径采样开销。
  - [PR #34005](https://github.com/sgl-project/sglang/pull/34005)
- **DSv4 c128 JIT kernel epilogue 优化**（#26671）：仍开放中，目标为 MLA decode 相关 kernel 尾部优化。
  - [PR #26671](https://github.com/sgl-project/sglang/pull/26671)
- **VLM 多节点通信优化（mickqian 系列，均在 PR 阶段）**：
  - #33952：Qwen3-VL/3.5 的 encoder-DP 特征延迟至 owner rank 物化，TP8 下显著降低冗余传输。
  - #33924：大 CPU 特征张量改走 Gloo tensor collective，避免 pickle 序列化开销。
  - #33949：修复 stream-order CUDA IPC feature pool 生命周期竞态。
  - #33921：Kimi-K3 CPU-transport 图像在 vision owner rank 上执行预处理。
  - [PR #33952](https://github.com/sgl-project/sglang/pull/33952)
  - [PR #33924](https://github.com/sgl-project/sglang/pull/33924)
  - [PR #33949](https://github.com/sgl-project/sglang/pull/33949)
  - [PR #33921](https://github.com/sgl-project/sglang/pull/33921)
- **CI 流程优化**：#33724 重构 pr-test-npu.yml，将 accuracy 与 performance 测试拆分。
  - [PR #33724](https://github.com/sgl-project/sglang/pull/33724)

---

## 5. 稳定性与回归

**严重（NaN / 非法内存 / 输出损坏）**

- **DSpark TP8 CUDA-Graph 捕获非确定性非法内存**（#33356，OPEN）：v0.5.16 官方镜像 + DeepSeek-V4-Pro-DSpark，TP8、bs ≤ 32 稳定，但大 decode 捕获失败，未提供 fix PR。
  - [Issue #33356](https://github.com/sgl-project/sglang/issues/33356)
- **DeepSeek-V4 + hierarchical cache KV 位置损坏**（#33656，OPEN）：确定性 SWA TAIL_K_SWA write_position 损坏，导致下游 NaN 采样崩溃，暂无 fix。
  - [Issue #33656](https://github.com/sgl-project/sglang/issues/33656)
- **Kimi-K3 长上下文 [PAD] 风暴 + DSPARK NaN**（#32968，OPEN）：定位与 #32477 write-side 修复相关，但该修复未进入任何 release 镜像；`allowed_special="all"` 可注入 [PAD]。
  - [Issue #32968](https://github.com/sgl-project/sglang/issues/32968)
- **DSpark verify 窗口越过上下文边界**（#33454，OPEN）：触发非法 RoPE 读取，需 source-level 复现。
  - [Issue #33454](https://github.com/sgl-project/sglang/issues/33454)
- **DSpark draft depth 5 在 SM120 上输出损坏**（#33800，OPEN）：checkpoint 默认 depth 5 损坏；depth 3/4/6/7 干净。关联 #32666（同一边界问题）。
  - [Issue #33800](https://github.com/sgl-project/sglang/issues/33800)
- **DeepSeek-V4-Flash-0731 并发下渐进输出损坏**（#33397，OPEN）：2× H200 + DP attention 场景。
  - [Issue #33397](https://github.com/sgl-project/sglang/issues/33397)
- **Unified Memory + DSPARK 两个 NaN 根因已有 fix**（#33974）：page hand-out 未清零 + CuTe int32 slot-stride 溢出；该 PR 同时解除 unified memory 对 speculative decoding 的硬阻断。
  - [PR #33974](https://github.com/sgl-project/sglang/pull/33974)

**中等（行为异常 / 超时 / 配置错误）**

- **dsv4-flash-0731 watchdog timeout**（#33393，OPEN）：v0.5.16 下稳定复现，暂无 fix。
  - [Issue #33393](https://github.com/sgl-project/sglang/issues/33393)
- **reasoning_effort 映射偏一级**（#33185，OPEN）：`high` 为 no-op、vendor `max` 不可达，v0.5.16 与 main 均存在。
  - [Issue #33185](https://github.com/sgl-project/sglang/issues/33185)
- **MiniMax-H3 /health 绕过 warmup**（#33719，CLOSED）：健康检查通过但推理 POST 阻塞 264s，已关闭（含诊断路径）。
  - [Issue #33719](https://github.com/sgl-project/sglang/issues/33719)
- **DeepSeek-V4-Flash-0731 on Ampere 三阻塞问题**（#33194，CLOSED）：deep_gemm NameError 之后又发现三个阻塞，报告已关闭。
  - [Issue #33194](https://github.com/sgl-project/sglang/issues/33194)
- **qwen3.6 tool-call-parser 问题**（#25242，CLOSED/inactive）：未修复，需注意 Qwen3.6 function calling 兼容性。
  - [Issue #25242](https://github.com/sgl-project/sglang/issues/25242)

**CI 健康度**

- #17050 跟踪显示当前 CI 状态为 **3 broken / 11 flaky / 670 recently fixed**（数据更新于 08-07 16:31 UTC）。
  - [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)

---

## 6. 对应用开发者的意义

- **DeepSeek-V4 系列上生产需谨慎**：多个严重 Bug（NaN、非法内存、输出损坏）仍为 OPEN 状态且无 fix 合入，建议先锁定可用的 draft depth 与 TP 配置，并验证 DSpark 路径（#33356、#33800）。若使用 unified memory，可关注 #33974 合入后行为改善。
- **Kimi-K3 用户注意 [PAD] 注入风险**：不要使用 `allowed_special="all"`，并确认所用镜像是否已包含 #32477 修复。
- **Qwen3.6 tool-call-parser 仍不可信**：对依赖 function calling 的 Agent 应用，建议在 SGLang 侧做 parser 输出验证或使用自定义 parser 兜底。
- **SM120 用户可关注 FP8 相关优化**，但相应 PR 多处于早期阶段，等待后续 release 合入后再升级。
- **VLM 多节点部署**的 FABRIC 传输、encoder-DP 延迟物化等优化仍在 PR 阶段，想利用这些能力的开发者可提前在 main 分支测试或等待稳定 release。
- **Qwen3-MoE + mori a2a 后端**修复（#34006）解决了一个实质正确性问题，使用该组合的用户应确保包含此补丁。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-08

## 今日速览
过去 24 小时共发布 10 个版本（b10299–b10312），核心集中在 SYCL/Metal/Windows 多后端稳定性修复，以及 server router 调度行为调整（不驱逐忙碌模型）。性能侧最值得关注的是 RDNA3.5 默认启用 hipBLASLt（prefill 提升最高 +44%）与 CUDA 专家热缓存 PR。社区焦点围绕 DeepSeek-V4 生态的 RPC/Vulkan 运行问题及 Blackwell 性能异常。

## 版本发布与破坏性变更
- **[b10312](https://github.com/ggml-org/llama.cpp/releases/tag/b10312)**：server router 不再驱逐忙碌模型（[#26567](https://github.com/ggml-org/llama.cpp/pull/26567)）。行为变更，多模型部署下需重新评估内存占用与排队策略；可能回应了 [#21678](https://github.com/ggml-org/llama.cpp/issues/21678)。
- **[b10311](https://github.com/ggml-org/llama.cpp/releases/tag/b10311)**：mtmd 修复 Qwen3-TTS 非流式模式下文本流被重复喂入（[#26706](https://github.com/ggml-org/llama.cpp/pull/26706)）。
- **[b10310](https://github.com/ggml-org/llama.cpp/releases/tag/b10310)**：aarch64 HWCAP fallback 定义，fp16 变体现在要求 HWCAP_ASIMDHP 才启用（[#25554](https://github.com/ggml-org/llama.cpp/pull/25554)）。旧 ARM64 设备上 CPU fp16 变体可能静默回退到通用路径，需关注性能变化。
- **[b10308](https://github.com/ggml-org/llama.cpp/releases/tag/b10308)**：缓解 Windows MSYS2 UCRT64 环境（GCC 16.1.0）的崩溃问题（[#26555](https://github.com/ggml-org/llama.cpp/pull/26555)）。
- **[b10307](https://github.com/ggml-org/llama.cpp/releases/tag/b10307)**：修复 SYCL NVFP4 UE4M3 缩放因子解析——此前误按有符号 E4M3 路径处理（[#25608](https://github.com/ggml-org/llama.cpp/pull/25608)）。
- **[b10306](https://github.com/ggml-org/llama.cpp/releases/tag/b10306)**：SYCL 重构 fused-GLU 路径，合并 SWIGLU 内核并新增 perf 测试用例（[#26354](https://github.com/ggml-org/llama.cpp/pull/26354)）。
- **[b10305](https://github.com/ggml-org/llama.cpp/releases/tag/b10305)**：SYCL 支持 DeepSeek-V4 新算子：LIGHTNING_INDEXER、DSV4_HC_COMB/PRE/POST（[#26568](https://github.com/ggml-org/llama.cpp/pull/26568)）。
- **[b10303](https://github.com/ggml-org/llama.cpp/releases/tag/b10303)**：修复 SYCL 在 Arc770 上 FLASH_ATTN_EXT 报错（[#26441](https://github.com/ggml-org/llama.cpp/pull/26441)）。
- **[b10301](https://github.com/ggml-org/llama.cpp/releases/tag/b10301)**：清理 CUDA 未使用变量/函数编译警告（[#26688](https://github.com/ggml-org/llama.cpp/pull/26688)）。
- **[b10299](https://github.com/ggml-org/llama.cpp/releases/tag/b10299)**：Metal 避免 kernel_lightning_indexer 中 threadgroup matrix 数组实例化导致的编译错误（[#26646](https://github.com/ggml-org/llama.cpp/pull/26646)）。

**进行中的行为变更提案（未合入）**：
- [PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696)：HIP `-funsafe-math-optimizations` 改为 opt-in（默认 OFF），HIP 构建默认恢复 IEEE 兼容，性能可能回退，换取数值正确性。
- [PR #26675](https://github.com/ggml-org/llama.cpp/pull/26675)：ggml_prec 枚举规范更新，明确 accumulator 类型与内部源数据表示，可能影响算子实现约定。

## 新模型与硬件支持
- [PR #19182](https://github.com/ggml-org/llama.cpp/pull/19182)：新增 Longcat-Flash 模型支持（MLA + zero-computing experts），标注需要测试。
- [PR #26608](https://github.com/ggml-org/llama.cpp/pull/26608)：新增 BailingMoE3 支持，可运行 Ling 3.0 Flash 模型（含 MTP），对应 Issue [#26590](https://github.com/ggml-org/llama.cpp/issues/26590)。
- [PR #26490](https://github.com/ggml-org/llama.cpp/pull/26490)：为 DeepSeek 4 新增 `-sm tensor` 支持（FA 镜像，单 K head 场景）。
- [PR #26650](https://github.com/ggml-org/llama.cpp/pull/26650)：CI 新增 CUDA 13.4 ARM64 Windows 构建（x64 交叉编译）。
- [Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700)：AMD Strix Halo 上部分 input 层被迫跑 CPU，导致 30% CPU 占用与 GPU 利用率下降，影响 Qwen 3.6 35B MoE 等模型。

## 性能与优化
- **[PR #26563](https://github.com/ggml-org/llama.cpp/pull/26563)**：CUDA 专家热缓存（`-ehs N` 开启，默认关闭）。按热度将 MoE 专家分为 GPU 热缓存 / CPU 冷计算，适用于显存受限的 MoE 部署，尚需实测验证。
- **[PR #26644](https://github.com/ggml-org/llama.cpp/pull/26644)**：RDNA3.5 默认启用 hipBLASLt。实测 prefill（pp512, BF16）：Ministral-3.8B 从 1004.90 → 1450.09 t/s（**+44.3%**），granite-4.1-8b 提升 **+30.2%**。
- **[PR #25952](https://github.com/ggml-org/llama.cpp/pull/25952)**：CUDA 融合 MoE 加权专家 reduction，消除中间张量读写，减少显存带宽压力。
- **[PR #26731](https://github.com/ggml-org/llama.cpp/pull/26731)**：修复 quantized cpy kernel 启动配置——原来每 block 仅 1 线程（warp 利用率 3.1%），dequant 包装器空转约 97% block，修复后 kernel 效率应显著提升。
- [Issue #26674](https://github.com/ggml-org/llama.cpp/issues/26674)：Gemma 4 tg128 在 RTX 5060 Ti（Blackwell）上性能异常低，待分析是否与 tg128 或 Blackwell 调度有关。

## 稳定性与回归
**崩溃类**：
- [Issue #25664](https://github.com/ggml-org/llama.cpp/issues/25664)：DeepSeek-V4-Flash 在 Vulkan（RADV_STRIXHALO）下数轮对话即触发 `vk::DeviceLostError`，复现稳定。
- [Issue #26685](https://github.com/ggml-org/llama.cpp/issues/26685)：DeepSeek-V4 在 RPC + Vulkan 混合后端下输出乱码，疑似 RPC 节点张量传输问题。

**正确性类**：
- [Issue #26382](https://github.com/ggml-org/llama.cpp/issues/26382)：GLM-5.2 设置 `-ctk q5_1` 而未设 `-ctv` 时，V cache 被强制使用相同类型，加载失败。
- [Issue #26677](https://github.com/ggml-org/llama.cpp/issues/26677)：Firefox third_party 构建中 `simd-mappings.h` 报 `unknown type name '__fp16'`，影响其内嵌 llama.cpp 的编译。

**性能回归/异常**：
- [Issue #26674](https://github.com/ggml-org/llama.cpp/issues/26674)：Gemma 4 tg128 在 Blackwell 上吞吐异常偏低。
- [Issue #25700](https://github.com/ggml-org/llama.cpp/issues/25700)：Strix Halo 上 CPU 处理 input 层导致整体性能下降。

**构建/环境类**：
- [Issue #26343](https://github.com/ggml-org/llama.cpp/issues/26343)：Windows Defender 误报 b10195 CPU x64 二进制的病毒内容（疑似误报，等待确认）。
- [Issue #25807](https://github.com/ggml-org/llama.cpp/issues/25807)：ROCm 7.14 下 `libhipblas.so.3` 缺失，llama-fit-params 启动失败。

**已修复/已关闭**：
- [Issue #26700](https://github.com/ggml-org/llama.cpp/issues/26700)：Qwen3-TTS 重复文本且不停止，已随 b10311 修复关闭。
- [PR #26724](https://github.com/ggml-org/llama.cpp/pull/26724)：RPC 远程节点失败不再通过 GGML_ASSERT 中止整个进程。
- [Issue #24443](https://github.com/ggml-org/llama.cpp/issues/24443)：MTP 模型在 llama-server 加载失败、llama-cli 正常，已关闭。
- [Issue #24064](https://github.com/ggml-org/llama.cpp/issues/24064)：SM75 上 CUDA MMVQ MUL_MAT_ID invalid launch，已关闭。

## 对应用开发者的意义
- **DeepSeek-V4 部署正在加速成熟**：`-sm tensor`、DSv4 专用算子、RPC 容错均已就位或推进中。若在 DeepSeek-V4 上构建服务，建议升级到 b10305+ 并持续关注 RPC/Vulkan 修复。
- **多后端选择面扩大**：SYCL 连续多版本修复（Arc770、算子补齐），Intel 平台从"能跑"走向"可部署"。建议 CI 矩阵加入 SYCL 构建，提前暴露平台差异。
- **Router 行为变更需评审**：b10312 不再驱逐 busy 模型，对多模型内存规划有直接影响。升级前请模拟存量调度场景，确认无死锁或排队饥饿风险。
- **HIP 默认数值行为将变化**：若合入 PR #26696，HIP 构建默认关闭 unsafe-math，推理结果更稳定，但性能可能回退——需要保留 benchmark 基准以便回归对比。
- **MoE 优化方向值得提前验证**：专家热缓存（#26563）与 MoE reduction 融合（#25952）若合入主线，对大规模 MoE 服务的显存占用和吞吐有直接收益，建议基于现有 workload 提前跑通评估流程。
- **Server 可观测性增强**：PR [#26129](https://github.com/ggml-org/llama.cpp/issues/26129) 提议暴露 per-device 内存（weights/context/compute），对多卡调度和容量规划有实际价值，可以关注进度并补充使用场景。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-08

## 1. 今日速览

今日无新版本 Release，但有一批针对 Windows 路径解析、Laguna 解析器误判 JSON 以及 CreateHandler 转换协程 panic 的修复 PR 集中出现。稳定性方面，Apple Silicon 上 Qwen3.6-35B-A3B 的性能回退、DGX Spark 上 CUDA 非法内存访问、MLX 引擎长驻 runner 的跨请求响应污染是值得重点跟踪的三个问题。此外，MLX Vision 支持 PR 已提交，将补齐 Apple Silicon 上的视觉模型能力。

## 2. 版本发布与破坏性变更

无。过去 24 小时无新版本发布。

## 3. 新模型与硬件支持

- **[PR #17600] MLX Vision Support**（👤 jessegross，2026-08-07 更新）
  MLX 后端新增视觉能力，基于 dflash 分支开发。对 Apple Silicon 用户而言，这意味着未来可以通过 MLX 引擎运行视觉语言模型（VLM）。目前 PR 仍为开放状态，尚未合并。
  https://github.com/ollama/ollama/pull/17600

- **[PR #17594] launch: add Muse Code integration**（👤 dhiltgen，2026-08-07 更新）
  新增 `ollama launch muse`，支持 Meta 的 Muse Code CLI。Muse 需要从其 provider 获取模型目录，集成通过写入独立 settings 文件实现。
  https://github.com/ollama/ollama/pull/17594

- **[PR #17589] launch: add Talos**（👤 morningstarnasser，2026-08-07 更新）
  新增 `ollama launch talos`。Talos 是一个带确定性权限内核的 agent——模型提议工具调用，独立内核决定是否执行，权限粒度为绑定到具体参数的单次 action token。
  https://github.com/ollama/ollama/pull/17589

- **[Issue #17604] AMD Radeon 8060S / Ryzen AI MAX+ 395 上 Vulkan 与 ROCm 均出现不正确输出**（CLOSED）
  AMD 新一代 RDNA GPU（gfx1151）在 GPU 加速下出现语义错误输出，该 issue 已被关闭，未说明是否已解决，上游 Radeon 8060S 的支持仍在调试期。
  https://github.com/ollama/ollama/issues/17604

## 4. 性能与优化

- **[Issue #17583] Qwen3.6-35B-A3B 在 Apple M2 上性能回退**（👤 slsalman，8 条评论）
  升级 Ollama 后，Mac Studio M2（64GB）上 Qwen3.6-35B-A3B 推理显著变慢：旧版本约 72 T/s，Ollama 0.32.5 之后大幅下降。同一模型、同一 prompt、同一硬件。这是 MoE 模型在 Metal 后端上的性能回退，建议关注后续 llama.cpp 子模块更新。
  https://github.com/ollama/ollama/issues/17583

- **[Issue #17557] Feature request: MoE 专家权重驻留主机内存**（👤 yalun753，2026-08-07 更新）
  请求让 MoE 专家层住在 host RAM、按需搬运到 GPU 计算，目标是让 16B/35B MoE 模型在 8GB 显存 GPU 上不 OOM 运行。当前 llama.cpp 默认将所有专家权重加载进 VRAM，导致 16B MoE（6GB 文件）需要 23GB VRAM。该请求尚停留在讨论阶段，但反映了低显存 GPU 运行 MoE 模型的真实需求。
  https://github.com/ollama/ollama/issues/17557

- **[PR #17480] bench: 使用 HumanEval patch prompts**（👤 dhiltgen，2026-08-06 更新）
  将基准测试中的 word-salad 提示生成器替换为 MIT 许可的 HumanEval 代码补全任务。对关注模型评测基础设施的工程师有参考意义。
  https://github.com/ollama/ollama/pull/17480

## 5. 稳定性与回归

按影响严重程度排列：

### 高严重度

- **[Issue #17596] DGX Spark（GB10）上 CUDA illegal memory access，head-size 256 模型确定性崩溃**
  针对 `qwen3-coder-next:q4_K_M`（Qwen3-Next 80B-A3B，attention head size 256）的大 prefill 请求，在 NVIDIA DGX Spark（GB10 Grace Blackwell，128GB）上确定性触发 `ggml_cuda_flash_attn_ext_mma_f16_case<256, 256, 8, 8>` 的 CUDA 非法内存访问。大 head size 的 attention 算子在 Blackwell 架构上存在缺陷，暂无 fix PR。
  https://github.com/ollama/ollama/issues/17596

- **[Issue #17587] Qwen2.5-3B 中文输入输出乱码（“@@@@@”、“!!!!”）**
  在 Windows CPU 后端上，加载 Qwen2.5-3B GGUF（包括官方 `qwen2.5:3b`）后输入中文，输出为重复 ASCII 字符流。指向 tokenizer 在 CPU 上的检测/加载逻辑错误，影响所有 Qwen 系列模型的中文用户。
  https://github.com/ollama/ollama/issues/17587

- **[Issue #17599] MLX 引擎长驻 runner 跨请求响应污染**（👤 jasonvassallo）
  在 `OLLAMA_KEEP_ALIVE=-1` 下，MLX 引擎（Apple Silicon）的长驻 runner 会间歇性返回**此前某个请求的完整答案**——不是当前 prompt 的退化输出，而是另一请求的逐字回复。这表明 MLX 后端存在跨请求状态残留问题，对话应用需警惕数据串线。
  https://github.com/ollama/ollama/issues/17599

- **[Issue #17602] Laguna parser 将普通内容中的 JSON 误判为工具调用**（有 fix PR）
  流式输出中，如果模型在普通文本里引用了一段 JSON，Laguna parser 会将其识别为 bare tool call，导致回复被中止、流式停滞或变成对未声明工具的调用。已有对应修复 PR。
  - 修复 PR：https://github.com/ollama/ollama/pull/17603

### 中严重度

- **[Issue #17609] CUDA 环境变量行为回归**
  旧版 Ollama（0.24）可通过 systemd 配置 `CUDA_VISIBLE_DEVICES` 来约束 Ollama 使用指定 GPU，新版本不再生效。影响多卡场景的 GPU 划分与运维。
  https://github.com/ollama/ollama/issues/17609

- **[Issue #17591] Windows NTFS 卷挂载点导致 `ollama create` 失败**（有 fix PR）
  通过 NTFS volume mount point（如 `C:\mnt\hdd0\llm_models\test.gguf`）引用 GGUF 文件时，`os.Stat` 因未解析符号链接/挂载点而失败，报 `400 Bad Request: invalid model name`。已有两个修复 PR，其中 #17608 为最新有效 PR：
  - 修复 PR：https://github.com/ollama/ollama/pull/17608
  - 被关闭的旧 PR：https://github.com/ollama/ollama/pull/17607

- **[Issue #17498] Gemma 4 12B 在 ROCm/gfx1151 下约 1200 token 处输出损坏**
  AMD Radeon 8060S（gfx1151）+ Windows + ROCm 后端，在 prompt 长度约 1166–1200 token 时出现可复现的输出劣化/损坏。与 #17604 同属 Radeon 8060S 早期支持问题。
  https://github.com/ollama/ollama/issues/17498

- **[Issue #17577] DeepSeek-V4 短空闲后 prompt KV cache 丢失**
  即使 prefix 完全相同，短时间空闲后 KV cache 被丢弃，导致重复 prefill 开销。作者已测试 `LLAMA_ARG_SWA_FULL=1` 环境变量，仍在调试中。
  https://github.com/ollama/ollama/issues/17577

- **[Issue #17597] 工具参数 `enum` 未在解码时强制**
  `enum` 约束能正确传给模型，但生成时不被执行——模型可以复述合法值却输出非法值。与 `response_format` 的强制逻辑不在同一层，属于 tool-use 功能的关键 gap。
  https://github.com/ollama/ollama/issues/17597

### 低严重度 / 商业与运维

- **[Issue #17435] 云服务配额被静默削减约 70%**
  Pro 订阅用户的 usage quota 被静默降至约 30%，无邮件、无博客公告、无仪表盘提示。用户情绪强烈，这对依赖 Ollama 云服务的商业用户是一个重要的服务条款变更警示。
  https://github.com/ollama/ollama/issues/17435

- **[Issue #11972] macOS 上 “Restart to update” 不生效**
  非管理员登录后输入管理员凭据，更新仍不执行。该 issue 已存在近一年，评论 23 条，仍为开放状态。
  https://github.com/ollama/ollama/issues/11972

- **[Issue #17484] “context deadline exceeded” 错误**
  从 HF 下载部分模型时持续超时失败，涉及 `ollama run hf.co/...` 拉取场景，可能与远端存储或客户端超时配置有关。
  https://github.com/ollama/ollama/issues/17484

- **[Issue #13515] Ollama 应用内账号登录报错 “Failed to get connect URL”**（CLOSED）
  老问题，今日关闭。
  https://github.com/ollama/ollama/issues/13515

### 其他修复 PR

- **[PR #17606] Recover panics in CreateHandler's model conversion goroutine**
  修复 `POST /api/create` 中模型转换协程 panic 导致整个进程崩溃的问题。Gin 的 Recovery 中间件只保护同步 handler goroutine，后台转换协程的 panic（如越界）未被捕获。修复后模型转换失败将只影响单次请求。
  https://github.com/ollama/ollama/pull/17606

- **[PR #17608] fix(parser): 解析 NTFS 卷挂载点和 symlink（fileDigestMap）**
  对应 Issue #17591 的修复，在 Windows 上解析 `FROM` 路径中的 junction / mount point。
  https://github.com/ollama/ollama/pull/17608

- **[PR #17590] server: digest 读取错误返回请求错误而非退出进程**
  `GetSHA256Digest` 中 `io.Copy` 失败时原先调用 `log.Fatal` 直接 `os.Exit(1)`——一次 blob 哈希读取错误会导致整个服务退出，拖垮所有在途请求。修复后改为正常错误返回。
  https://github.com/ollama/ollama/pull/17590

- **[PR #17595] cmd/tui: 恢复 launcher 集成菜单**
  修复 TUI 中 launcher 集成菜单的显示与导航逻辑。
  https://github.com/ollama/ollama/pull/17595

- **[PR #17598] docs: 修正 `ollama create` 示例缺少模型名参数**
  `ollama create -f Modelfile` 实际需要一个位置参数，文档已改为 `ollama create my-model -f Modelfile`。
  https://github.com/ollama/ollama/pull/17598

## 6. 对应用开发者的意义

- **MLX 引擎跨请求污染（#17599）风险极高**：在 `OLLAMA_KEEP_ALIVE=-1` 的长驻场景下，MLX 后端可能返回别的请求的完整答案。在生产对话或 agent 应用中，如果使用 Apple Silicon + MLX，务必为 `keep_alive` 场景加上响应一致性校验，或暂时规避长驻 runner，等待上游修复。

- **Laguna parser 误判 JSON（#17602/#17603）影响 tool-use 可靠性**：如果你的应用面向的是 `poolside-v1` 这类模型，或是在流式响应中携带 JSON 结构化内容，在 parser 修复合并前，应避免在普通回复中嵌入裸 JSON，或在前端对工具调用结果做二次校验。

- **工具参数 `enum` 未强制（#17597）意味着结构化输出约束可能被绕过**：依赖模型严格遵守 enum 约束的应用，不能把这个当作硬保证——建议在工具执行前自己做参数域校验。

- **CUDA_VISIBLE_DEVICES 不生效（#17609）对多卡推理编排是直接打击**：如果通过 systemd 或容器环境做 GPU 隔离，升级到新版 Ollama 后需重新验证 GPU 分配，必要时考虑降级或改用其他隔离手段。

- **CreateHandler panic 修复（#17606）提升了 API 稳定性**：`POST /api/create` 转换异常将不再杀死整个服务进程，对自动化模型构建流水线是实质性增强。

- **OpenAI 兼容层补全 namespace 工具声明（#17593）**：Responses API 中 `type: "namespace"` 的嵌套 tools 数组此前被丢弃，修复后所有具有 namespace 的工具都能被模型声明和调用。在 Responses API 上构建 agent 的开发者值得关注该 PR 的合入进度。
  https://github.com/ollama/ollama/pull/17593

---

**总结**：今日无新版本，但修复密度较高——尤其是 NTFS 路径解析、Laguna parser 误判和 CreateHandler panic 三个 bug 的 PR 均已提交。最需要警惕的是 MLX 跨请求污染（#17599）和 Qwen 中文乱码（#17587）这两个正确性问题，它们都可能无声地污染应用的输出质量。Apple Silicon 上的 Qwen3.6-35B-A3B 性能回退（#17583）和 DGX Spark 的 CUDA 崩溃（#17596）则应列入性能/稳定性回归跟踪清单。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-08

## 1. 今日速览
- 无新版本发布；过去 24h 内 Issue/PR 仍保持高活跃度（Issue 更新 71 条、PR 更新 225 条）。
- 成本核算出现新回归：`azure/gpt-5.6-luna` 成本少报 5 倍（[#36094](https://github.com/BerriAI/litellm/issues/36094)），影响 main 分支及 v1.96.0 RC，成本敏感用户需重点关注。
- Router 侧多个增强 PR 集中推进：deployment 级 session affinity（[#36146](https://github.com/BerriAI/litellm/pull/36146)）、per-deployment 故障策略（[#34416](https://github.com/BerriAI/litellm/pull/34416)）、必选 tag 路由（[#36193](https://github.com/BerriAI/litellm/pull/36193)）。

## 2. 版本发布与破坏性变更
无新 release。但依赖 pin 相关破坏性变更仍在发酵：

- `python-dotenv` 被硬 pin 为 `==1.0.1`，导致 CVE-2026-28684 无法修复（[#26333](https://github.com/BerriAI/litellm/issues/26333)），并引发 SDK 库消费者的依赖冲突（[#25210](https://github.com/BerriAI/litellm/issues/25210)、[#25280](https://github.com/BerriAI/litellm/issues/25280)）。
- `python-multipart` 0.0.20 受 CVE-2026-40347 影响（[#27472](https://github.com/BerriAI/litellm/issues/27472)）。
- `uvicorn` 依赖范围过窄 `>=0.29.0 <0.30.0`（[#11484](https://github.com/BerriAI/litellm/issues/11484)）。
- `litellm-rust` 使用 PyO3 0.23.5 导致 Python 3.14 安装失败（[#33116](https://github.com/BerriAI/litellm/issues/33116)）。
- 另需注意：[#36196](https://github.com/BerriAI/litellm/pull/36196) 的 SAML SSO 修复 PR 声明由 Grok 4.5 生成，审查时建议额外关注。

## 3. 新模型与硬件支持
- 24h 内无已合并的新模型添加 PR。
- 社区请求 Venice 模型 `venice/grok-code-fast-1` 支持（[#24229](https://github.com/BerriAI/litellm/issues/24229)，已关闭），尚未合并。
- 无 CUDA/ROCm/Metal/CPU、量化格式相关动态。

## 4. 性能与优化
均为进行中 PR：

- **Auto-router deployment 级 session affinity**（[#36146](https://github.com/BerriAI/litellm/pull/36146)）：避免同一 session 的多次请求分散到多个 deployment，降低 provider prompt cache 冷启动概率。
- **同步流式失败时恢复部分 usage**（[#35349](https://github.com/BerriAI/litellm/pull/35349)）：修复 `CustomStreamWrapper.__next__` 中途失败未回收已下发 chunk usage 的问题（对应 [#14457](https://github.com/BerriAI/litellm/issues/14457)）。
- **Per-deployment 故障策略覆盖**（[#34416](https://github.com/BerriAI/litellm/pull/34416)）：支持按 deployment 配置 `allowed_fails_policy` 与 `cooldown_time`。
- **JSON 日志 session/trace 关联**（[#34418](https://github.com/BerriAI/litellm/pull/34418)）：通过 contextvars 为日志增加可选的 `session_id`/`trace_id` 关联。
- **Tag 路由增强**（[#36193](https://github.com/BerriAI/litellm/pull/36193)）：新增 `&tag` 必选前缀和 `allow_fail_open` 标志。

## 5. 稳定性与回归
按严重程度排列：

- **成本核算回归（高）**：`azure/gpt-5.6-luna` 成本少报 5 倍（[#36094](https://github.com/BerriAI/litellm/issues/36094)），影响 main/v1.96.0 RC，暂无 fix PR。
- **Claude Code thinking 模式失败（高）**：v1.81.14 在 thinking 模型（如 kimi-k2.5）上失败，v1.81.12 正常（[#22997](https://github.com/BerriAI/litellm/issues/22997)），暂无 fix。
- **OpenAI→Anthropic 转换丢 tool_call 参数（高）**：v1.83.7 回归，`function.arguments` 在转换中丢失（[#27469](https://github.com/BerriAI/litellm/issues/27469)），暂无 fix。
- **Fireworks AI 成本计算忽略 cached tokens（中）**：`cost_per_token()` 仍按全量 prompt 计费（[#32496](https://github.com/BerriAI/litellm/issues/32496)）。
- **batches.create fallback 返回错误 provider 报错（中）**（[#35359](https://github.com/BerriAI/litellm/issues/35359)）。
- **Usage tab 合并共享底层模型的 model groups（中）**（[#36172](https://github.com/BerriAI/litellm/issues/36172)，新）。
- **DeepSeek anthropic 兼容端点多轮 400（中）**：assistant 历史缺少 `reasoning_content` 即失败（[#31439](https://github.com/BerriAI/litellm/issues/31439)）。
- **INFO 日志无法关闭（中）**：`LITELLM_LOG=ERROR` 不生效（[#10788](https://github.com/BerriAI/litellm/issues/10788)）。

已有 fix PR 的项：

- MCP `SERVER_ROOT_PATH` 路径归一化（[#32187](https://github.com/BerriAI/litellm/pull/32187)，fixes [#32142](https://github.com/BerriAI/litellm/issues/32142)）。
- Project 缓存失效问题：更新/删除 project 后 allowlist 最长 60s 不生效（[#36028](https://github.com/BerriAI/litellm/pull/36028)，已关闭）。
- Headroom `/v1/compress` 404 诊断改进（[#35952](https://github.com/BerriAI/litellm/pull/35952)，已关闭）。
- SAML-only 配置下 UI SSO 检测失败（[#36196](https://github.com/BerriAI/litellm/pull/36196)，待审查）。
- OTEL baggage 改为 `litellm.request.model`（[#35228](https://github.com/BerriAI/litellm/pull/35228)，已关闭）。

已关闭的另两项回归：并发请求绕过 TPM 限流（[#18730](https://github.com/BerriAI/litellm/issues/18730)）；OCI sync streaming `JSONDecodeError`（[#24819](https://github.com/BerriAI/litellm/issues/24819)）。

## 6. 对应用开发者的意义
- **成本追踪用户**：[#36094](https://github.com/BerriAI/litellm/issues/36094) 回归会导致 `azure/gpt-5.6-luna` 账单严重偏低，如正在使用该模型，建议核对当前版本成本统计，暂缓升级 v1.96.0 RC。
- **Agent / Claude Code 开发者**：[#22997](https://github.com/BerriAI/litellm/issues/22997) 与 [#27469](https://github.com/BerriAI/litellm/issues/27469) 直接影响 thinking 模型工具调用链，遇到问题可先回退至 v1.81.12；[#31439](https://github.com/BerriAI/litellm/issues/31439) 则影响 DeepSeek anthropic 兼容端点的多轮会话。
- **依赖管理**：`python-dotenv` 硬 pin 持续影响 SDK 库消费者的依赖解析，建议关注官方解 pin 进展；Python 3.14 用户需等待 litellm-rust/PyO3 修复。
- **日志与可观测性**：[#10788](https://github.com/BerriAI/litellm/issues/10788) 的 INFO 刷屏仍未解决；可提前关注 [#34418](https://github.com/BerriAI/litellm/pull/34418) 的 session/trace 关联能力。
- **权限与安全**：[#36028](https://github.com/BerriAI/litellm/pull/36028) 提醒 project allowlist 变更存在最长 60s 缓存窗口，涉及 project 更新/删除的团队应验证是否立即生效并评估风险。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-08

## 今日速览

PyPI 发布 **unsloth 2026.8.8**，安装脚本已同步提升版本下限。**AMD ROCm 支持迎来关键修复**：Windows ROCm 上扩散模型加载失败（#7992）与 48 分钟超慢生成（#8081）均有对应修复 PR（#7981）或针对性分析。此外，多条 Studio 性能优化 PR（线性库存扫描、API 监控）已进入待合并状态。

## 版本发布与破坏性变更

- **unsloth 2026.8.8 已发布**（PyPI）。PR #8114 将 `install.sh` / `install.ps1` 中的版本下限从 `2026.8.7` 提升至 `2026.8.8`，确保新安装拉取最新 wheel。建议已有环境执行 `pip install --upgrade unsloth unsloth_zoo` 同步更新。
  https://github.com/unslothai/unsloth/pull/8114

- **transformers 5.0.0.dev0 兼容性**：`Ministral_3_(3B)_Reinforcement_Learning_Sudoku_Game` 在 transformers 5.0.0.dev0 + peft 0.19.1 下报 `cannot import name '_MODEL_TO_CONVERSION_PATTERN'`，PR #8051 通过 backfill 转换符号的方式修复中。
  https://github.com/unslothai/unsloth/pull/8051

## 新模型与硬件支持

- **MiniMax H3 文生视频（含同步音轨）**：PR #7989 为 Studio 的 Video 标签页添加 MiniMax H3 支持，可选 BF16 官方模型（基于 Diffusers #14355）或 GGUF 量化模型（基于 stable-diffusion.cpp #1854）。**状态：OPEN。**
  https://github.com/unslothai/unsloth/pull/7989

- **Windows ROCm 扩散模型加载修复**：PR #7981 针对 #7992（`torch.distributed` 无属性 `'Work'`）进行了双重修复——既解决 diffusers 导入墙，又补充 gated repo 的明确提示。**状态：OPEN。**
  https://github.com/unslothai/unsloth/pull/7981
  https://github.com/unslothai/unsloth/issues/7992

- **非 CUDA 加速器验证**：Issue #8099 提议添加端到端示例脚本，帮助 Intel XPU、AMD ROCm 用户快速验证 Unsloth 框架可用性，属于社区贡献友好型需求。**状态：OPEN。**
  https://github.com/unslothai/unsloth/issues/8099

## 性能与优化

- **Studio 本地模型库存扫描改为线性**：PR #8043 修复 #7849——此前当缓存中 cache-scoped 目录较多时，完整的 HF 缓存扫描需 15–25 秒，高频打开模型选择器会重复触发全量扫描。改动将扫描耗时与仓库数量+状态条目数对齐，并合并并发扫描、避免只读探测创建状态。**状态：OPEN。**
  https://github.com/unslothai/unsloth/pull/8043

- **API 监控增加每请求性能指标**：PR #8045 在 Studio 的 API monitor 中新增 tok/s、time-to-first-token、stop reason 以及插槽占用（busy/queued）的实时读数。引擎时序优先取 llama.cpp 报告值，缺失时用测量值兜底。**状态：OPEN。**
  https://github.com/unslothai/unsloth/pull/8045

- **持久驻留 VRAM 选项**：PR #8002 在 Settings → System 下新增两个默认关闭的开关（“Keep model in GPU memory” 和新增的第二个独立开关），可 veto idle auto-unload TTL 并传递 `--mlock`，用于减少模型反复换入换出的延迟。**状态：OPEN。**
  https://github.com/unslothai/unsloth/pull/8002

- **暴露 llama-server batch size 配置**：PR #7973 将 `--batch-size` 与 `--ubatch-size` 提为 GGUF 模型的一等加载设置，UI 位于 Run Settings → Advanced，留空则走 llama.cpp 默认值 2048/512。**状态：CLOSED。**
  https://github.com/unslothai/unsloth/pull/7973

## 稳定性与回归

按严重程度排序：

| 问题 | 影响 | 状态 | 修复 PR |
|---|---|---|---|
| Windows ROCm 加载任何扩散模型即失败（`torch.distributed` 无 `'Work'`），且报错信息不可读 | 阻断 AMD 用户使用 Studio 的图像/视频模型 | OPEN | #7981 |
| Z-Image GGUF 在 16GB Windows ROCm 卡上 20 步 1024x1024 耗时 48m25s，采样仅占 1m47s，其余时间花在 PCIe 子模块换页和 VAE 分块解码 | AMD 生成性能不可用 | OPEN | #8081 有分析，尚无 PR |
| Deep Research 零输出流仍烧满 900s 预算（后续 token 全部计费但无产出） | 用户资源浪费与超时体验 | CLOSED（#7839 已修复后置停顿，零输出场景仍开放） | — |
| Linux 桌面应用后端启动时因 GTK X11 I/O 致命错误静默退出（rc=1，无日志） | Linux 桌面用户无法启动应用 | CLOSED | — |
| CI：`_DummyTrainer` 缺失 `data_collator` 导致所有 PR 的 CPU job 标红 | 开发流程阻塞 | OPEN | — |
| CI：`huggingface_hub 1.27.0` 的 `while True` 重试被扫描器标记为 CRITICAL | 所有 PR 的 pip 检查失败 | OPEN | #8110 |
| Studio 不识别 VRAM，改用系统 RAM 推理（GPU 计算却在跑） | 内存拷贝开销大，可能 OOM | OPEN | — |
| Studio 微调本地模型时自动下载 HF 上对应的 Unsloth 版本 | 用户无法确认训练的是本地权重还是下载版本 | OPEN | — |
| Studio 的 AMD 扩散模型在 Windows ROCm 上即使能加载也已掉进 whole-module offload 路径 | 与 #8081 同源 | OPEN | — |
| Studio 工具输出面板将 ANSI 转义码渲染为字面文本（如 `ls --color=always` 输出） | Agent 工具调用可读性差（见下文） | OPEN | — |
| Studio 聊天模型选择器在 GGUF 按路径加载时显示原始 HF snapshot 路径而非模型名 | 显示问题，易引起困惑 | CLOSED |，另有 contract 测试问题 PR #8115 | — |
| Studio 微调启动遮罩层显示缓存资源“Downloading 99%”但实际无下载任务 | 用户误判卡住 | CLOSED | — |

## 对应用开发者的意义

- **Agent 工具调用（OAI 兼容）**：PR #7330（OPEN）修复 `supportsTools: false` 被强制用于所有外部模型的问题，将为 Ollama / llama.cpp / vLLM / 自建连接启用本地执行的 Search / Code / MCP 工具，但需注意工具执行仍在 Studio 宿主机侧。若你正在构建依赖外部 OAI 兼容端点的 Agent，此 PR 值得跟进。
  https://github.com/unslothai/unsloth/pull/7330

- **调试与可观测性**：#8045 会使 Studio 的 API monitor 提供 tok/s、TTFT 和停止原因，配合插槽占用读数，可在网关层快速定位排队或吞吐瓶颈，无需再依赖 `llama-server` 底层日志。

- **长上下文场景**：#7985（OPEN）修复 Deep Research 的 `max_tokens` 未按实际 `_loaded_context_length()` 截断的问题，避免 16384 补全请求撞上 12288 上下文墙而产生 `finish_reason: length` 截断。对长文档合成类应用影响直接。
  https://github.com/unslothai/unsloth/pull/7985

- **本地模型资源管理**：若在 Studio 中同时加载多个模型（Chat、Hub、Train、Images 页间切换），#8082（OPEN）的全局“loaded models”指示器与 eject 按钮值得关注——当前模型仅在其加载页面可见，难以感知显存占用。

- **现有 BUG 一瞥**：#7962 中 `ls --color=always` 等命令的输出会在工具输出面板显示为原始 ANSI 转义码，影响 Agent 工具调用结果的阅读，但当前无修复 PR。
  https://github.com/unslothai/unsloth/issues/7962

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*