# AI 基础设施日报 2026-08-12

> 生成时间: 2026-08-12 04:07 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告

**报告日期：2026-08-12 | 数据窗口：2026-08-11 ~ 2026-08-12 | 覆盖项目：vLLM / SGLang / llama.cpp / Ollama / LiteLLM / Unsloth**


## 1. 生态全景

**DeepSeek-V4 系列已成为定义当前工作负载的"基准模型"，但没有任何一个项目能在所有硬件上稳定支撑它**——vLLM 缺 SM8x 内核（140+ 评论无 fix）、SGLang 长上下文挂起/OOM、llama.cpp ROCm 输出乱码，生态整体处于"能力追赶模型"的紧绷阶段。引擎层的技术竞争聚焦在 **KV Cache 管理、投机解码与 P/D 分离**三个方向，而网关与本地层则把重心转向 **Agent 原生能力（工具调用、web search、reasoning 控制）与成本可观测性**。值得警惕的是，安全与数据面问题正从功能性 bug 升级为漏洞级风险（Ollama SSRF、llama.cpp RPC 越界写），基础设施的信任门槛正在提高。


## 2. 各项目活跃度对比

| 项目 | 今日 Release | 高活跃 PR 数¹ | 高活跃 Issue 数¹ | 代表动态 |
|---|---|---|---|---|
| **vLLM** | v0.27.1（补丁） | ~16 | ~14 | KV-Cache Layout 标准化 6/N；NIXL P/D TTFT 优化 |
| **SGLang** | 无 | ~14 | ~15 | PD 协议统一追踪；DeepSeek-V4 三个高危 issue |
| **llama.cpp** | 6 个（b10357→b10362） | ~20 | ~16 | EXAONE 4.5 SWA 修复；OpenCL FA prefill 优化；WebGPU CI 修复 |
| **Ollama** | v0.32.9 | ~13 | ~21 | Nemotron 3.5 Lightning 支持；MLX 长活 runner 串号修复（已关闭） |
| **LiteLLM** | 7 个（v1.90.7→v1.96.2） | ~14 | ~15 | Rust 重写 Beta 招募；流式 JSON 累加器消除 O(n²) 拷贝 |
| **Unsloth** | v0.1.701-beta + v0.1.62-beta | ~14 | ~17 | Unsloth Desktop 正式发布；后端 CI 全红修复（21 个测试） |

> ¹ PR/Issue 数为日报中提及的高活跃数量，非 GitHub 全量计数。

**解读**：llama.cpp 以 6 个 release + 最多 PR 数领跑迭代速度；LiteLLM 保持极端高频发版（7 个版本仅用 24 小时，但 Release Notes 无实质变更说明）；Ollama 以 21 个 issue 成为社区压力最大的项目，集中在本地部署的硬件兼容与正确性问题。vLLM 与 SGLang 更侧重深度重构而非数量。

**高严重度问题统计**：vLLM 3 个高严重 issue；SGLang 3 个；llama.cpp 3 个；Ollama 4 个（含 2 个安全）；LiteLLM 无明确高危问题但存在 Python 3.13 打包缺口。**Ollama 与 llama.cpp 在稳定性上的公开压力最大。**


## 3. 模型支持竞速

| 项目 | 新增/推进的模型 | 特征与信号 |
|---|---|---|
| **vLLM** | DeepGrove Maple（20B-A1B MoE，#51833）、GLM-5.2 Vision NVFP4（#51889）、DeepSeek-V4-Flash DSpark 量化（#50424）、Kimi INT4 同源 W4A16（#51815）、torchcodec 音频后端（#51826） | 覆盖最广：MoE 量化、视觉多模态、音频输入均有合入；但 DeepSeek-V4-Flash SM8x 支持缺失（140+ 评论，无 fix） |
| **llama.cpp** | Zamba2 完整新架构（#21412）、SKT A.X K2（#26757）、EXAONE 4.5 SWA 修复（#26848）、Glimmer drafter 专项优化（#26842） | 新架构探索最激进；但 muse-glimmer 架构未被识别（#26858），Glimmer 支持未闭环 |
| **SGLang** | MiniMax H3 LoRA（#34359）、Kimi-K3 MoonEP BF16 PoC（#33249）、Qwen3.5 AMD 侧加速验证（#34517） | 不追求新架构数量，深度绑定 DeepSeek-V4/Kimi-K3 的推理增强 |
| **Ollama** | Nemotron 3.5 Lightning（30B MoE / 3B active，#17672）、Ling-3.0-Tiny MLX（BailingMoeV3，#17643） | 面向 Agent/本地场景选型，不是平台型覆盖 |
| **LiteLLM** | 计费模型新增 Qwen3.8-Max、DeepSeek V4、GLM 5.1/5.2、Kimi K2.7-code（#36496）；Ollama 运行时 `/api/show` 探测（#36574） | 不跑模型，但通过运行时探测消除静态 model info 的上下文窗口/价格错误 |
| **Unsloth** | MiniMax-M3 GGUF 加载失败（#8513/#8360）、Muse-Glimmer GGUF 不被内置 server 识别（#8345） | 兼容性明显滞后于 llama.cpp 的 GGUF 生态 |

**竞速结论**：

- **vLLM 在生产级新模型接入上领先**——MoE 量化、视觉 NVFP4、音频后端均有实际合入，且 DSpark 量化支持通过补丁快速闭环。
- **llama.cpp 在长尾新架构上最激进**——Zamba2、A.X K2 是其他项目尚未跟进的全新架构，但 Glimmer 的"半成品"状态说明其激进策略存在质量风险。
- **SGLang 是 DeepSeek-V4/Kimi-K3 的"专属优化者"**——MoonEP、图像嵌入缓存复用、AMD EAGLE 优化均围绕这两个模型家族展开。
- **DeepSeek-V4 是各家的必争之地，但目前没有赢家**：vLLM 缺硬件、SGLang 稳定性欠奉、llama.cpp 多后端质量不均、Ollama 在 CUDA 上确定性崩溃（#17596）。


## 4. 性能优化前沿

| 方向 | 关键进展 | 代表项目 |
|---|---|---|
| **KV Cache 管理** | `[L,B,H,N,C]` 逻辑布局统一 + `KVCacheLayout` 枚举管理物理布局（#51718，RFC #42082 的 6/N）；低精度 KV 量化（q8_0→q4_0）乱码（#17614）与 ROCm 上破坏工具调用（#17347）仍未解 | vLLM 重构领先；Ollama 暴露量化正确性风险 |
| **投机解码** | FlashInfer 原生路径 FULL decode CUDA graph capture，消除 SM120 Blackwell 的静默 PIECEWISE 降级（#50885）；llama.cpp DSpark 长响应必现崩溃（#26554）与 Qwen3.5 MTP 缓存失效（#24714） | vLLM 在稳定化；llama.cpp 高风险 |
| **MoE 量化内核** | W4A16 group-32 合入（#51815）、NVFP4 MoE reload 复用修复（#50074）；CUDA MoE 重复专家 ID 压缩误判修复，减少无效计算（#26294） | vLLM 与 llama.cpp 双线推进 |
| **分布式 / P-D 分离** | NIXL decode-side 优化：切换开销 ~197ms p50 中实际 KV 传输仅 ~29ms，其余为编排冗余（#51919）；PD 协议统一追踪（#34510）；MoonEP A2A PoC（#33249） | vLLM 交出量化收益数据；SGLang 走协议标准化路线 |
| **算子/后端** | OpenCL FA prefill K-tile local memory 转置（#26428，b10357）；W4A16 MoE group-32 支持（#51815）；AMD EAGLE top-k1 跳过 softmax + shared-KV 验证（#34005）；XPU 默认开启新路径（#34492） | llama.cpp 同步多后端；SGLang 攻 AMD 短板 |
| **调度与流式** | 跳过未完成 prefill 的 logits/sampling（#49171）；高保真 CPU 模拟器免 GPU 评估调度/前缀缓存（#33824）；JSONFragmentAccumulator 消除 SSE 每 chunk 全量拷贝的 O(n²) 问题（#36610） | SGLang 在调度可模拟性；LiteLLM 在流式路径复杂度 |

**优化火力最集中的两个方向是 KV Cache 标准化与投机解码稳定化**。前者决定多后端与长上下文的扩展天花板，后者是当前正确性风险最高的优化手段——vLLM 在收敛，llama.cpp 仍在"踩坑期"。另一个值得关注的信号是 **P/D 分离从"能跑"进入"抠毫秒"阶段**，NIXL 的量化拆解（197ms→29ms）为编排层优化提供了清晰的优化预算。


## 5. 分层定位差异

| 分层 | 项目 | 核心关注 | 典型用户 |
|---|---|---|---|
| **生产级推理引擎** | vLLM、SGLang | 多卡扩展性、KV Cache 效率、P/D 分离、高吞吐稳定服务 | 模型服务商、大规模在线推理 |
| **轻量本地运行时** | llama.cpp、Ollama | 多硬件后端覆盖、量化精度、低延迟、Agent harness 集成 | 本地开发者、边缘设备、桌面 Agent |
| **LLM 网关** | LiteLLM | 多 provider 路由、计费归属、流式协议兼容、guardrails | 企业 IT、平台团队、FinOps |
| **训练/微调** | Unsloth | 微调速度/显存效率、GGUF 导出、训练到推理闭环 | 模型定制团队、垂直领域应用开发者 |

几个需要重点理解的分层关系：

- **vLLM 与 SGLang 是同层直接竞争**：都在做 DeepSeek-V4 优化、KV Cache 重构与 P/D 分离。差异在于 vLLM 以 RFC 驱动标准化（#42082 系列），路径更可预期；SGLang 在 AMD/XPU 异构后端和 MoonEP A2A 上更积极，且率先提供 CPU 调度模拟器——对硬件多样化的团队更有吸引力。
- **llama.cpp 与 Ollama 是"引擎 vs 产品"的共生关系**：llama.cpp 保持极快的算法/架构迭代，Ollama 负责将其消化为可用产品。Ollama 今日 21 个 issue 的压力，相当一部分是产品化层对底层引擎缺陷的放大。
- **Unsloth 正在向下游延伸**：从训练框架扩展到 Desktop（本地运行 + 训练 + 导出），实际侵入的是 Ollama/llama.cpp 所在的本地区域。其 GGUF 兼容性滞后（MiniMax-M3、Muse-Glimmer 均加载失败）是目前最大短板。
- **LiteLLM 不碰模型，价值完全在控制面**：成本归属、路由、安全策略。Rust 重写将控制面开销压到 sub-1ms，意味着网关不再是大模型推理链路的性能瓶颈——这是网关层的标志性目标。


## 6. 值得关注的趋势信号

**① DeepSeek-V4 生态成熟度不足，生产采用需逐项验证**
该系列在四个引擎中均有高危问题：vLLM SM8x 不可用 + KV 膨胀 8 倍（#51041）、SGLang 调度挂起/OOM/多节点死锁、llama.cpp ROCm 乱码 + DSpark 长响应崩溃、Ollama CUDA illegal access。**建议**：生产环境锁定"checkpoint + 硬件 + 框架版本"的组合矩阵，升级前做回归验证；对 A100/A800 用户，DeepSeek-V4-Flash 目前不可行。

**② 安全/数据面问题升级为漏洞级风险**
Ollama blob hash 验证绕过可致 SSRF 响应外泄（#15485）、密码更改后会话未撤销（#17682）；llama.cpp RPC SET_ROWS 越界写（#26912）。**建议**：将 AI 基础设施纳入常规安全审计，对 RPC 暴露面、镜像拉取链、会话管理做专项排查；Ollama 服务不应直接暴露在不可信网络。

**③ Agent 工作负载已成为各层的"默认场景"**
Ollama 为 always-on agent 引入 Nemotron 3.5 Lightning；llama.cpp 新增 `read_media` 服务端工具与 `reasoning_effort` 模板传参；LiteLLM 支持 web_search 工具执行；vLLM/SGLang 的多模态缓存修复服务于复杂 agent 输入。**建议**：Agent 开发者在选型时，将工具调用正确性、结构化输出可靠性（注意 MLX 上 `response_format` 不生效 #16563）、reasoning 深度控制作为一等公民指标。

**④ 网关层进入"Rust 化 + 亚毫秒"竞争**
LiteLLM Rust 重写启动 Beta 招募（#31263），目标 sub-1ms 网关开销。这是网关层从"功能拼图"进入"性能竞争"的标志。**建议**：延迟敏感应用可关注进展，但生产迁移仍等正式发布；当前优先享受 JSONFragmentAccumulator（#36610）带来的流式路径收益。

**⑤ 可观测性与成本归属成为基础设施标配**
LiteLLM 连续修复 streamed/batch/OCR/web-search 四类调用的计费归属，并暴露 Prisma 连接池饱和度指标（#36607）；Ollama 新增 Prometheus `/metrics`（#16998）；llama.cpp 重构 metrics 时序正确性（#26920）。**建议**：平台团队尽早建立 per-tenant/per-model/per-token 的度量体系，这是 FinOps 与容量规划的数据底座。

**⑥ 本地/桌面化与"训练-推理闭环"正在成型**
Unsloth Desktop 把微调、GGUF 导出、本地运行、部署整合为桌面应用，支持多后端运行时切换（#8520）。配合 llama.cpp 的 `--load-mode` 迁移（#26934）与 Ollama 的 OpenRC 服务支持（#17681），**个人开发者与垂直团队可以"一人完成从数据到服务"的工作流**。但 Beta 质量门槛较高（Windows 路径、Linux 系统依赖、ROCm 均有明显问题），建议非 NVIDIA + Linux/macOS 环境先验证对应 issue 再采用。

**⑦ 平台工程侧的破坏性变更密集出现——升级需谨慎**
llama.cpp 将废弃的 `--mmap`/`--mlock`/`--direct-io` 统一迁移到 `--load-mode`（#26934）；Ollama 计划移除默认 `repeat_penalty=1.1`（#17679）；LiteLLM 1.96.x 在 Python 3.13 下无可用 wheel（#36526）；vLLM 0.27.0 存在 DeepSeek-V4 兼容性报告（#51758）。**建议**：将"升级前对照 release notes 检查破坏性变更"纳入发布流程，避免被动适配。

---

**总评**：当前生态的竞争焦点已从"谁能跑起来"转向"谁能稳定高效地跑 DeepSeek-V4 级模型"。vLLM 的标准化路径与 SGLang 的异构激进各具优势；llama.cpp 保持新架构探索速度但后端质量不均；Ollama 承担产品化压力但安全短板需要正视；LiteLLM 与 Unsloth 分别在控制面和训练-推理闭环上建立差异化壁垒。对技术决策者而言，**没有万能答案，只有"目标硬件 + 模型 + 负载特征"决定的最优组合**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 — 2026-08-12

## 1. 今日速览

vLLM 发布 **v0.27.1 补丁版本**，为 DeepSeek-V4 系列补充了 DSpark Markv 头的量化支持。社区对 **DeepSeek-V4-Flash 在 Ampere (SM8x) 上不可用**的呼声持续升温（两个相关 issue 合计 140+ 评论），目前仍无修复 PR 关联。核心开发者正在推进 **KV-Cache Layout 标准化重构**，同时 spec decode 与多模态缓存正确性成为当前 PR 密集区。

## 2. 版本发布与破坏性变更

- **[Release] v0.27.1 补丁发布** — 基于 v0.27.0 的 patch release，新增对 quantized DSpark Markov heads 的支持（#50424）。
  - [vllm-project/vllm Release v0.27.1](https://github.com/vllm-project/vllm/releases)
- **升级到 v0.27.0 后 DeepSeek-V4-Flash 报错** — Issue #51758 报告从 v0.26.0 升到 v0.27.0 后运行 DeepSeek-V4-Flash 失败，目前 10 条评论，尚无 fix PR，建议升级前仔细核对兼容性。
  - [vllm-project/vllm Issue #51758](https://github.com/vllm-project/vllm/issues/51758)

## 3. 新模型与硬件支持

- **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 的 SM8x（Ampere A100/A800）支持** — 这是社区目前最关注的功能请求。两个 issue（#40851、#50576）合计 140+ 评论、33 👍，明确问题出在 DeepGEMM 的 sm_80 内核缺失。目前均无关联 fix PR。
  - [vllm-project/vllm Issue #40851](https://github.com/vllm-project/vllm/issues/40851)
  - [vllm-project/vllm Issue #50576](https://github.com/vllm-project/vllm/issues/50576)
- **[Model] 新增 DeepGrove Maple（MapleForCausalLM）** — 20B-A1B MoE 推理模型，架构上交错滑窗/全量 attention，PR #51833 待合入。
  - [vllm-project/vllm PR #51833](https://github.com/vllm-project/vllm/pull/51833)
- **[Model] GLM-5.2 Vision NVFP4 支持** — 为 `baseten/GLM-5.2-Vision-NVFP4` checkpoint 增加原生支持，组合 MoonViT/PatchMerger 视觉栈与 GLM-5.2 MoE-DSA 文本骨干，PR #51889 修复 #50206。
  - [vllm-project/vllm PR #51889](https://github.com/vllm-project/vllm/pull/51889)
- **[Quantization] W4A16 MoE group-32 支持（Humming/Chord）** — 通过 compressed-tensors checkpoints 启用 Novita 的 W4A16 MoE CUDA 算子（Kimi INT4 家族同款内核），PR #51815。
  - [vllm-project/vllm PR #51815](https://github.com/vllm-project/vllm/pull/51815)
- **[ROCm] Kimi-K3 Gap and Roadmap 跟踪** — AITER fused-moe（a16w4/a8w4）已集成，后续功能启用与性能优化在持续跟踪中（#50682）。
  - [vllm-project/vllm Issue #50682](https://github.com/vllm-project/vllm/issues/50682)
- **[Audio] 新增 torchcodec 音频解码后端** — 支持 `auto`（torchcodec → soundfile → PyAV 回退）/`soundfile`/`pyav` 三种选择，PR #51826。
  - [vllm-project/vllm PR #51826](https://github.com/vllm-project/vllm/pull/51826)

## 4. 性能与优化

- **[KV-Cache] KV-Cache Layout 标准化重构（6/N）** — PR #51718 将 KV cache 分配统一到 `[L, B, H, N, C]` 逻辑结构，由 `KVCacheLayout` 枚举管理物理布局，是 RFC #42082 系列的核心步骤。
  - [vllm-project/vllm PR #51718](https://github.com/vllm-project/vllm/pull/51718)
- **[Spec Decode] FlashInfer 原生路径 FULL decode CUDA graphs** — PR #50885 使 SM120 消费级 Blackwell 无需 trtllm-gen 也能获得完整的 spec-decode verify batch CUDA graph capture（避免静默降级到 PIECEWISE），依赖 #49652。
  - [vllm-project/vllm PR #50885](https://github.com/vllm-project/vllm/pull/50885)
- **[ROCm] Kimi-K3 chunk KDA prefill pipeline stall 移除** — PR #51862 修复 `prepare_chunk_indices` 中因 `torch.cat` + `torch.arange` 交互导致的每步 stall。
  - [vllm-project/vllm PR #51862](https://github.com/vllm-project/vllm/pull/51862)
- **[Perf] 减少模型执行路径上的 GPU<->CPU 同步** — PR #51738 从 kv-sharing fast prefill 等处移除 host roundtrip。
  - [vllm-project/vllm PR #51738](https://github.com/vllm-project/vllm/pull/51738)
- **[Perf] 跳过未完成 prefill 的 logits/sampling** — PR #49171 对 chunked prefill 中未完成的部分跳过 sampling-logit 计算。
  - [vllm-project/vllm PR #49171](https://github.com/vllm-project/vllm/pull/49171)
- **[P/D][Perf] NIXL P/D 解耦 decode-side TTFT 优化** — PR #51919 将 decode 侧切换开销（~197ms p50 中实际 KV 传输仅 ~29ms）通过 first-token seeding、快速 KV 旁路、并发 dispatch 削减。
  - [vllm-project/vllm PR #51919](https://github.com/vllm-project/vllm/pull/51919)
- **[Perf] Dynamic SD 在生产默认配置下基线开销显著** — Issue #49986 分析 PIECEWISE override 是因素之一；#49548 报告在 batch-size 阈值附近出现吞吐崩塌。两者均未关闭。
  - [vllm-project/vllm Issue #49986](https://github.com/vllm-project/vllm/issues/49986)
  - [vllm-project/vllm Issue #49548](https://github.com/vllm-project/vllm/issues/49548)

## 5. 稳定性与回归

**高严重度**

- **DeepSeek-V4-Flash-0731 KV cache 异常膨胀** — #51041：KV cache 每 token 占用 56 字节，7.7 GiB 仅能容纳 150K token，max_model_len 被限制在 ~121K。与 preview 版 checkpoint 相比用量高出 8 倍，疑似量化配置异常。无 fix PR。
  - [vllm-project/vllm Issue #51041](https://github.com/vllm-project/vllm/issues/51041)
- **v0.24.0 DeepGEMM FP8 内核在 Blackwell (sm_120) warmup 时崩溃** — #47130 报告 "Unknown recipe" assertion，0.23.0 正常，属 0.24.0 回归。7 条评论，6 👍，无 fix PR。
  - [vllm-project/vllm Issue #47130](https://github.com/vllm-project/vllm/issues/47130)
- **vllm-openai:latest 无法启动 Gemma4（Transformers 5.15.0 不兼容）** — #51744：镜像内 Transformers 版本与 Gemma4 不兼容导致启动失败，9 条评论，3 👍，无 fix PR。
  - [vllm-project/vllm Issue #51744](https://github.com/vllm-project/vllm/issues/51744)

**中严重度**

- **Kimi-K3 长上下文 prefill 后全部请求退化为重复 token** — #51039：~240K token 请求处理后，所有后续请求输出单一重复 token，疑似 packed KDA prefill 导致 NaN logits。8 条评论，无 fix PR。
  - [vllm-project/vllm Issue #51039](https://github.com/vllm-project/vllm/issues/51039)
- **qwen3_next_mtp + num_speculative_tokens=5 负载下 CUDA illegal address** — #37035：`gdn_attn.py:237` 崩溃，6 条评论，2 👍，无 fix PR。
  - [vllm-project/vllm Issue #37035](https://github.com/vllm-project/vllm/issues/37035)
- **Kimi-K3 在 ROCm/gfx942 上跨 2048 token 触发显存访问错误** — #48266：DeepSeek-V4-Flash 架构 + sparse_attn_indexer + FP8 KV cache, MI325X TP=4 worker 崩溃。无 fix PR。
  - [vllm-project/vllm Issue #48266](https://github.com/vllm-project/vllm/issues/48266)
- **DeepSeek-V4 性能工作引入 spec-decode 接受率下降 & 输出分布偏移** — #49927：A/B 测试隔离出 #48137（-10.6% 接受率）和 #48660（输出分布偏移）两个独立回归源。
  - [vllm-project/vllm Issue #49927](https://github.com/vllm-project/vllm/issues/49927)

**低严重度 / 已修复**

- **[Bugfix] 修复 NVFP4 MoE kernel 在 reload 时的复用问题** — PR #50074 避免每次重新加载 BF16 权重并量化时重复替换 MoE kernel/quantize config。
  - [vllm-project/vllm PR #50074](https://github.com/vllm-project/vllm/pull/50074)
- **[Bugfix] V1 多模态：从 P0/P1 processor cache drift 中恢复** — PR #46747 解决了 P0 shadow hit 后 P1 tensor cache 不一致的问题。
  - [vllm-project/vllm PR #46747](https://github.com/vllm-project/vllm/pull/46747)
- **[Bugfix] 多模态缓存拒绝后的回滚** — PR #51897 修复请求被拒绝时 renderer 已插入缓存数据导致的镜像不一致。
  - [vllm-project/vllm PR #51897](https://github.com/vllm-project/vllm/pull/51897)
- **[Bugfix] FlashInfer MNNVL allreduce buffer 不足** — PR #50932 修复 `should_use_fi_ar` 对 MNNVL workspace 大小的计算错误（修复 #50877）。
  - [vllm-project/vllm PR #50932](https://github.com/vllm-project/vllm/pull/50932)
- **[RFC] 废弃 FlexAttention 后端** — #50324 已关闭：FlexAttention 在 ROCm 不再默认选择、CUDA 上落后于 TritonAttention，且维护成本高。
  - [vllm-project/vllm Issue #50324](https://github.com/vllm-project/vllm/issues/50324)
- **[Bugfix] 动态 SD 的 AR draft decode capture 修复** — PR #49652 修复 #48494 中 decode_query_len 推算错误导致的 capture 失败，是 #50885 的前置依赖。
  - [vllm-project/vllm PR #49652](https://github.com/vllm-project/vllm/pull/49652)

## 6. 对应用开发者的意义

- **DeepSeek-V4-Flash 用户需确认硬件平台**：如果使用 A100/A800（SM8x），目前仍无法在 vLLM 上运行该模型；使用 H20 的用户需注意 KV cache 占用异常（#51041）可能限制有效上下文长度，部署前建议在目标 GPU 上实测 `--max-model-len`。
- **升级到 0.27.x 前建议阅读 release notes**：v0.27.1 修复了 DSpark 量化模型支持，但 0.27.0 存在 DeepSeek-V4 兼容性报告（#51758）；Gemma4 用户注意镜像内 Transformers 版本固定问题（#51744），可采用 `pip install` 显式固定兼容版本规避。
- **使用动态 spec decode 的团队应关注回归风险**：DSA 在 batch size 阈值附近可能出现吞吐崩溃（#49548），且生产默认配置下存在固定开销（#49986），建议在目标负载 profile 下充分基准测试后决定是否启用。
- **多模态应用的缓存一致性问题正在修复**：P0/P1 cache drift（#46747）和 rejected-request 后的缓存残留（#51897）修复将提升多模态服务的稳定性；`torchcodec` 音频后端的加入（#51826）为音频输入应用提供更可靠的解码选项。
- **P/D 分离部署的 TTFT 将受益于编排层优化**：PR #51919（NIXL decode-side 提速）和 #41567（Mooncake 编码器缓存传输）正在消除 Token#1 握手和 KV 传输之外的冗余开销，相关能力尚在 PR 阶段，可跟踪合入进展。
- **Kimi-K3 用户需保持警惕**：长上下文 prefill 后服务可能完全退化（#51039），ROCm 平台还面临跨 2048 token 崩溃风险（#48266），生产环境建议设置保守的 max context 并在更新版本后回归验证。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-12

## 1. 今日速览
过去 24 小时无新 Release；社区活跃度集中在 **PD 分离协议统一新追踪 issue #34510**、**DeepSeek-V4 长上下文挂起/OOM 类严重 Bug**，以及 **AMD/XPU 后端优化**。硬件层面，SM120/Blackwell 性能计划和 DSpark 路线图持续推进；多项 LoRA 与扩散模型支持 PR 处于开放评审状态。

## 2. 版本发布与破坏性变更
过去 24 小时无新版本发布。以下两个开放 PR 可能引入行为变更，需关注合并动向：
- [PR #33997](https://github.com/sgl-project/sglang/pull/33997)：FlashInfer 升级至 0.6.17，移除 Kimi K3 相关 workaround，可能影响 MLA/注意力后端选择。
- [PR #34492](https://github.com/sgl-project/sglang/pull/34492)：XPU 平台 `SGLANG_USE_SGL_XPU` 默认设为开启，XPU 用户的默认行为将变化。

## 3. 新模型与硬件支持
- [PR #34359](https://github.com/sgl-project/sglang/pull/34359)：为 MiniMax H3 添加原生及 PEFT/Diffusers 格式 LoRA 支持，含 `--lora-alpha` 显式处理。
- [PR #33249](https://github.com/sgl-project/sglang/pull/33249)：MoonEP BF16 PoC 集成（面向 Kimi-K3），新增 `moonep` MoE A2A 后端识别与数据契约，尚为 draft。
- [PR #34411](https://github.com/sgl-project/sglang/pull/34411)：VLM 预处理前复用缓存的 Kimi-K3 图像嵌入，减少重复 embedding 计算。
- [PR #34517](https://github.com/sgl-project/sglang/pull/34517)：AMD 侧为 Qwen3.5 验证加速，利用 grouped-head shared KV 优化。
- [PR #34337](https://github.com/sgl-project/sglang/pull/34337)：将多适配器 LoRA 支持扩展至 EAGLE / NEXTN / EAGLE3 / DFLASH / DSPARK 投机解码（draft）。
- [Issue #33709](https://github.com/sgl-project/sglang/issues/33709)：追踪补齐 Blackwell B12X 的 FlashInfer NVFP4 MoE 集成，依赖 #29190。

## 4. 性能与优化
- [Issue #19637](https://github.com/sgl-project/sglang/issues/19637)：SM120 性能优化计划更新，DeepSeek V4 已完成；DeepSeek V4 Flash 与 DeepGEMM MQA Indexer 仍待推进。
- [Issue #33636](https://github.com/sgl-project/sglang/issues/33636)：DeepSeek V4 性能追踪（NVIDIA SM90/SM10X），TRT-LLM DSv4 attention 集成未完成，FlashInfer MNV2 已实现。
- [PR #34005](https://github.com/sgl-project/sglang/pull/34005)：AMD EAGLE 优化——top-k1 下跳过完整 softmax、裁剪 LM-head、shared-KV 验证，显著降低 draft 阶段开销。
- [PR #33824](https://github.com/sgl-project/sglang/pull/33824)：新增高保真 CPU 模拟器，用于评估调度/前缀缓存，无需加载权重，加速调度策略迭代。
- [PR #33997](https://github.com/sgl-project/sglang/pull/33997)：FlashInfer 0.6.17 升级，预计改善 MLA/稀疏注意力性能。
- [Issue #30344](https://github.com/sgl-project/sglang/issues/30344)：DSpark 路线图更新，聚焦更强的在线/自适应成本模型与动态调度。

## 5. 稳定性与回归
按严重程度排列（标注是否已有 fix PR）：

- [Issue #34235](https://github.com/sgl-project/sglang/issues/34235)：**严重**。DeepSeek-V4 FP8/H20 + hierarchical cache + 16K chunked prefill 下调度器挂起，watchdog abort；0.5.16+ 另有采样 device-side assert。暂未关联 fix PR。
- [Issue #34155](https://github.com/sgl-project/sglang/issues/34155)：**严重**。1M-token prefill 在 tp8 + MegaMoE 非分页路径下 CUDA OOM（8x B200），dp-attention 路径可正常服务。暂未关联 fix PR。
- [Issue #33289](https://github.com/sgl-project/sglang/issues/33289)：**严重**。多节点 TP rank 分歧死锁：一个 rank 卡在 NCCL proxy append，另一个 idle 在 broadcast。DeepSeek-V4 + DSpark 在 2× DGX Spark 上间歇出现。暂未关联 fix PR。
- [Issue #34389](https://github.com/sgl-project/sglang/issues/34389)：**中等**。注意力后端回退逻辑变更导致多数扩散模型报错，暂未关联 fix PR。
- [Issue #34000](https://github.com/sgl-project/sglang/issues/34000)：**中等**。多输出扩散 rollouts 全部坍缩到 output 0，grouped forward 抛 AttributeError，latent packing 被跳过。暂未关联 fix PR。
- [Issue #34384](https://github.com/sgl-project/sglang/issues/34384)：**中等**。DSpark 紧凑 ragged CUDA Graph 在相同 token tier 下使用不兼容的 request-slot 几何。暂未关联 fix PR。
- [Issue #33659](https://github.com/sgl-project/sglang/issues/33659)：**回归（已关闭）**。DeepSeek-V4-Pro 在 0.5.12→0.5.14 出现 3-4 分评分下降，未给出明确根因。
- [Issue #27924](https://github.com/sgl-project/sglang/issues/27924)：**兼容性（已关闭）**。MiMo-V2.5-Pro-FP4-DFlash 需 12 个补丁才能运行，且 DFlash drafter accept_length 异常（1.42 vs 预期 6.30）。
- [Issue #34354](https://github.com/sgl-project/sglang/issues/34354)：**低**。`sliding_window_size` 语义是否包含当前 token 存在歧义，属文档/澄清类问题。

已有 fix PR 的相关项：
- [PR #34519](https://github.com/sgl-project/sglang/pull/34519)：修复 HiCache 中 load-back 状态作用域，将状态从共享 radix 节点移入组件 `ComponentData`（关联 #22607）。
- [PR #34481](https://github.com/sgl-project/sglang/pull/34481)：修复 AMD/ROCm 上 FLUX warmup 崩溃，禁用 PTX inline-asm 扩散归一化融合。
- [PR #34518](https://github.com/sgl-project/sglang/pull/34518)：修复 DSML 工具调用之间/之后的文本流丢失问题。
- [PR #28797](https://github.com/sgl-project/sglang/pull/28797)：工具调用参数强制转换对 NaN/Infinity 安全失败，避免崩溃。
- [PR #28652](https://github.com/sgl-project/sglang/pull/28652)：修复 FakeKVSender 队列在多次 poll 未 send 时累积请求。

## 6. 对应用开发者的意义
- **避开已知高危配置**：DeepSeek-V4 用户应暂缓使用 hierarchical cache + chunked prefill 长上下文（#34235）、tp8 + MegaMoE 1M-token 非分页 prefill（#34155）、DSpark 多节点 TP 部署（#33289），或升级后充分验证。
- **投机解码 + LoRA 即将可用**：#34337 落地后将支持 EAGLE/DFLASH/DSPARK 与多适配器 LoRA 共批，对多租户 Agent 场景实用价值高。
- **XPU/AMD 行为变化**：#34492 合并后 XPU 默认启用新路径；#34481/#34517/#34005 持续改善 AMD 稳定性与 Qwen3.5 推理速度，相关平台用户需关注回归测试。
- **PD 分离架构演进**：#34510 追踪单协议层 + per-backend transport 统一，短期透明，长期将简化 PD 部署配置、提升可维护性。
- **评估与模拟工具**：#33824 CPU 模拟器可让开发者无需真实 GPU 即可验证调度和前缀缓存策略，降低迭代成本。

> 数据来源：github.com/sgl-project/sglang，收集时间范围 2026-08-11 至 2026-08-12，含 30 条高活跃 Issue 与 20 条高活跃 PR。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 · 2026-08-12

## 今日速览

今日发布 **b10357–b10362** 共 6 个版本，核心修复包括 EXAONE 4.5 的 SWA 未启用问题、OpenCL FA prefill 内核优化以及 WebGPU CI 修复。社区侧，`reasoning_effort` 模板传参、`read_media` 服务端工具、Zamba2 架构支持等 PR 持续推进。稳定性方面，DeepSeek V4 系列在 ROCm/CUDA 多 GPU 场景下的崩溃与乱码问题保持高压态势，另有多个 Glimmer/Muse 相关的新模型兼容性问题浮现。

---

## 版本发布与破坏性变更

### 新版本（b10357 → b10362）

| 版本 | 内容 | 说明 |
|---|---|---|
| **b10362** | [tests: disable backend sampler hip multi output (#26878)](https://github.com/ggml-org/llama.cpp/pull/26878) | HIP 后端跳过 `multi_output_sampling_chain` 测试：top_k 的 backend probs 路径需要 CUB（HIP 不可用），导致 `sampled_probs` 为 null 而测试中断。 |
| **b10361** | [model: fix SWA not being enabled for EXAONE 4.5 (#26848)](https://github.com/ggml-org/llama.cpp/pull/26848) | 修复 EXAONE 4.5 滑动窗口注意力（SWA）未启用的问题——`load_arch_hparams` 在读取 `LLM_KV_NEXTN_PREDICT_LAYERS` 之前就检查了 `n_layer() == 64`，导致 SWA 配置失效。 |
| **b10360** | [common/peg: suppress incomplete escape sequences (#26780)](https://github.com/ggml-org/llama.cpp/pull/26780) | 抑制 PEG 解析中不完整转义序列的告警。 |
| **b10359** | [ggml-webgpu: fix CI errors from #25025 and #25262 (#26566)](https://github.com/ggml-org/llama.cpp/pull/26566) | 修复 WebGPU 后端 CI 失败：为 `max_kv_tile == 0` 禁用 subgroup 矩阵、新增 i32 的 `cpy` 支持并启用全算子测试。 |
| **b10358** | [Address review comment of PR 25532 (#26852)](https://github.com/ggml-org/llama.cpp/pull/26852) | 落实 PR #25532 的审查意见（推测解码参数相关，由 #26925 进一步跟进测试）。 |
| **b10357** | [opencl: transpose the K tile in local memory for FA prefill kernels (#26428)](https://github.com/ggml-org/llama.cpp/pull/26428) | OpenCL Flash Attention prefill 内核将 K tile 在 local memory 中转置，减少银行冲突。 |

### 配置/行为变更提示

- **`--mmap` 系列 flags 迁移**：PR [#26934](https://github.com/ggml-org/llama.cpp/pull/26934) 将已废弃的 `--mmap`/`--no-mmap`/`--mlock`/`--direct-io` 统一迁移到 `--load-mode`，同步更新了 SYCL 示例、Snapdragon 脚本和 benchmark 脚本。**使用旧 flags 的启动脚本需适配。**
- **server 预设名变更（Issue）**：[#25150](https://github.com/ggml-org/llama.cpp/issues/25150) 报告部分 preset 名称被更改且部分 preset 被忽略，影响 `llama-server` 用户，已确认与容器化部署相关。
- **CI 构建缩减**：PR [#23705](https://github.com/ggml-org/llama.cpp/pull/23705)（已合并）禁用/缩减 SYCL 与 CANN 构建以缓解 GitHub Actions 缓存压力，**SYCL/昇腾相关 release 产物可能延迟或缺失**。

---

## 新模型与硬件支持

### 新增/进行中的架构支持

- **[PR #21412] Zamba2 架构支持**：新增 Zamba2 的模型映射、张量布局与转换脚本，作者自述使用了 Claude Code 辅助开发，属于完整架构支持。→ [链接](https://github.com/ggml-org/llama.cpp/pull/21412)
- **[PR #26757] A.X K2 支持**：为 SKT 的 A.X K2 添加支持，关键特性包括 Sparse Gated Attention 与 Gated Norm。→ [链接](https://github.com/ggml-org/llama.cpp/pull/26757)
- **[PR #26842] Glimmer drafter 优化**：针对 Glimmer 草稿模型做专项优化（与 @ngxson、@CISC 等讨论后发起）。→ [链接](https://github.com/ggml-org/llama.cpp/pull/26842)
- **Glimmer/Muse 兼容性风险**：Issue [#26858](https://github.com/ggml-org/llama.cpp/issues/26858) 报告 `unknown model architecture: 'muse-glimmer'`（b10344），且 [#26902](https://github.com/ggml-org/llama.cpp/issues/26902) 报告 Glimmer Q8_0 在 4×Tesla T10 张量并行时触发 `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)`——**Glimmer 的完整支持仍在进行中，生产慎用**。

### 后端进展

| 后端 | 动态 |
|---|---|
| **OpenCL** | b10357 优化 FA prefill K 矩阵搬运（[#26428](https://github.com/ggml-org/llama.cpp/pull/26428)） |
| **WebGPU** | b10359 修复 CI 并新增 i32 `cpy` 支持（[#26566](https://github.com/ggml-org/llama.cpp/pull/26566)） |
| **SYCL** | PR [#26411](https://github.com/ggml-org/llama.cpp/pull/26411) 推进 UNARY(silu/sigmoid/softplus)+MUL 算子融合；Issue [#26845](https://github.com/ggml-org/llama.cpp/issues/26845) 报告第二次 prompt 出现乱码，SYCL 稳定性存疑 |
| **ROCm** | PR [#25775](https://github.com/ggml-org/llama.cpp/pull/25775) 添加 ROCm 7.14 CI 目标（TheRock 构建系统）；Issue [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) 报告运行时缺 `libhipblas.so.3` |
| **CUDA** | PR [#26294](https://github.com/ggml-org/llama.cpp/pull/26294) 修复 MoE 重复专家 ID 压缩问题（针对 #24591） |

---

## 性能与优化

- **CUDA MoE 重复专家 ID 修复**：[PR #26294](https://github.com/ggml-org/llama.cpp/pull/26294) 修复 `mm_ids_helper` 压缩内核中“每 token 的任意 lane 匹配”误判问题——当同一专家 ID 在 top-k 中出现多次时，旧逻辑导致错误压缩。修复后可减少 MoE 模型（如 DeepSeek、Qwen MoE）的无效计算。

- **OpenCL FA prefill K 矩阵转置**：[PR #26428](https://github.com/ggml-org/llama.cpp/pull/26428)（b10357 已合入）在 local memory 中完成 K tile 转置，预期降低显存带宽压力，长上下文 prefill 受益明显。

- **SYCL 算子融合**：[PR #26411](https://github.com/ggml-org/llama.cpp/pull/26411) 将 UNARY(silu/sigmoid/softplus)+MUL 融合为单一 kernel，减少中间张量读写，对 Intel GPU 上的 MLP 层有正向影响。

- **服务器 metrics 重构**：[PR #26920](https://github.com/ggml-org/llama.cpp/pull/26920) 将 t/s 等派生指标与 `llama_decode` 结果绑定，修正指标更新的时序正确性，并准备将渲染函数重构为批量更新，利好长时运行的监控场景。

- **确定性草稿过滤机制**：[PR #26551](https://github.com/ggml-org/llama.cpp/pull/26551) 引入可插拔 SDK 的确定性草稿过滤（deterministic draft filter），通过 SPI 最小化核心改动——为推测解码提供更可控的 token 验证路径。

---

## 稳定性与回归

按严重程度排列今日活跃问题：

| 严重度 | 问题 | 状态与影响 |
|---|---|---|
| 🔴 高 | [DeepSeek V4 在 Strix Halo ROCm 下乱码输出（#25436）](https://github.com/ggml-org/llama.cpp/issues/25436) | 27 评论 / 5 👍。IQ3_XXS 等量化在 ROCm HIP 后端输出乱码，大概率涉及 TheRock 工具链或 hipBLAS 适配问题。 |
| 🔴 高 | [ROCm 7.14 运行时报缺 libhipblas.so.3（#25807）](https://github.com/ggml-org/llama.cpp/issues/25807) | 14 评论。升级 ROCm 7.14 后二进制无法启动，影响所有 HIP 用户。 |
| 🔴 高 | [DSpark 推测解码约 2500 token 后 CUDA 崩溃（#26554）](https://github.com/ggml-org/llama.cpp/issues/26554) | 多 GPU + deepseek4 + `--spec-type draft-dspark` 场景下稳定复现 `cublasSgemm unsupported value`，短响应不触发，长响应必现。 |
| 🟠 中 | [Qwen3.5-2B-MTP 每次请求强制全量 prefill（#24714）](https://github.com/ggml-org/llama.cpp/issues/24714) | MTP 上下文缓存失效，大 prompt 场景延迟显著劣化，与 MTP 草稿上下文保留逻辑相关。 |
| 🟠 中 | [gemma-4-E4B 在 V100 上 GGML_ASSERT 失败（#24132）](https://github.com/ggml-org/llama.cpp/issues/24132) | `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS` 断言崩溃，V100 单卡多输入切分场景。 |
| 🟠 中 | [OpenVINO 无法加载 gemma-4-12B（#24415）](https://github.com/ggml-org/llama.cpp/issues/24415) | CPU/GPU/NPU 全后端加载失败，Intel Core Ultra 7 258V 环境。 |
| 🟠 中 | [Vulkan + Intel Arc B70 MoE 模型崩溃（#23769）](https://github.com/ggml-org/llama.cpp/issues/23769) | Qwen3.6-35B-A3B（含 MTP）在 Windows Vulkan 下崩溃，11 评论。 |
| 🟠 中 | [RPC SET_ROWS 越界写（#26912）](https://github.com/ggml-org/llama.cpp/issues/26912) | `ggml-rpc-server` 的 `SET_ROWS` 在 release 构建下可越界写输出张量缓冲区——**安全/内存完整性风险，建议关注**。 |
| 🟡 低 | [ROCm gfx1151 RPC worker 在 TOP_K 崩溃（#26746）](https://github.com/ggml-org/llama.cpp/issues/26746) | DeepSeek V4 prefill 超过 4096 token 后，RPC worker 在 `GGML_OP_TOP_K` 崩溃。 |
| 🟡 低 | [SYCL 第二次 prompt 输出乱码（#26845）](https://github.com/ggml-org/llama.cpp/issues/26845) | Intel Arc Pro B60，首个 prompt 正常，第二个乱码，疑似缓存/同步问题。 |
| 🟡 低 | [server 长时间运行后性能劣化（#22360）](https://github.com/ggml-org/llama.cpp/issues/22360) | Vulkan + 7900XTX，所有模型均现，需定期重启。 |
| ✅ 已修复 | [enable_thinking 无法关闭 Qwen3.5 思考（#20182）](https://github.com/ggml-org/llama.cpp/issues/20182) | 已关闭；[PR #26941](https://github.com/ggml-org/llama.cpp/pull/26941) 将进一步在模板层支持 `reasoning_effort`。 |
| ✅ 有 workaround | [NVIDIA CMP 70HX 被 AI 指令节流（#26810）](https://github.com/ggml-org/llama.cpp/issues/26810) | 通过移除 `__dp4a` intrinsics 改用 PTX 仿真绕过硬件节流，适用于挖矿卡改造推理场景。 |

---

## 对应用开发者的意义

1. **`reasoning_effort` 即将进入模板层**：[PR #26941](https://github.com/ggml-org/llama.cpp/pull/26941) 将 OpenAI Chat Completions 的 `reasoning_effort` 参数传入 jinja 模板，并支持模型特定的翻译映射。当前仅处理 `none`（禁用思考），合并后 Agent 应用可精细控制模型的思考深度（如 `low`/`high`），对成本与延迟敏感的多步 Agent 工作负载意义重大。

2. **服务端视觉工具前置**：[PR #25877](https://github.com/ggml-org/llama.cpp/pull/25877) 新增 `read_media` server-tool，使视觉模型可直接分析服务器端图片（base64 传入、UI 解码后移除以节省上下文）。对构建本地视觉 Agent 的开发者是直接利好。

3. **OpenAI 流式兼容增强**：[PR #25712](https://github.com/ggml-org/llama.cpp/pull/25712) 为 `AIP_MODE=PREDICTION`（Google Cloud Vertex AI）路由添加 `stream: true` 支持及 OpenAI fallback。托管在 Vertex AI 上的 llama.cpp 服务将获得完整的 SSE 能力。

4. **JSON Schema 正则容错**：[PR #26939](https://github.com/ggml-org/llama.cpp/pull/26939) 对 grammar sampler 不支持的 regex 模式（lookahead/lookbehind、非锚定表达式）回退为 JSON 字符串。工具调用场景下不再因 schema 含复杂正则而整体失败，但代价是约束力下降——**依赖严格 schema 校验的 Agent 需验证回退行为**。

5. **CLI 迁移预警**：[PR #26934](https://github.com/ggml-org/llama.cpp/pull/26934) 统一 `--load-mode` 后，旧启动脚本中的 `--mmap` 等 flags 将失效。建议检查 CI/CD 和服务部署脚本，提前适配。

6. **MTP/推测解码仍是高风险区**：DSpark 长文本崩溃（[#26554](https://github.com/ggml-org/llama.cpp/issues/26554)）与 MTP 缓存失效（[#24714](https://github.com/ggml-org/llama.cpp/issues/24714)）表明 DeepSeek V4/Qwen3.5 等新一代模型的推测解码路径尚未稳定。**生产环境建议关闭 `--spec-type draft-dspark`，或为长响应设置自动重试**。

---
*报告覆盖时间窗口：2026-08-11 至 2026-08-12（GitHub 数据快照）。所有链接指向 ggml-org/llama.cpp 官方仓库。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-12

> 数据来源：github.com/ollama/ollama（截至 2026-08-12）

## 1. 今日速览

Ollama 今日发布 v0.32.9，核心亮点是支持 NVIDIA Nemotron 3.5 Lightning（30B MoE / 3B 激活，面向 always-on agent 场景）。与此同时，社区报告了多起高影响问题：低精度 KV 量化导致模型输出乱码、MLX 引擎长活 runner 出现跨请求响应串号（已关闭）、CUDA 非法内存访问导致确定性崩溃等，均需关注。PR 侧有两项值得注意的进展：OpenAI Responses API 的 web search 支持，以及可选的 Prometheus `/metrics` 端点。

## 2. 版本发布与破坏性变更

- **[v0.32.9 发布](https://github.com/ollama/ollama/releases/tag/v0.32.9)** — 核心特性为 NVIDIA Nemotron 3.5 Lightning 支持（`ollama.com/library/nemotron-3.5-lightning`）。该模型为 30B MoE、3B 激活参数，专为 OpenClaw、Hermes Age 等 always-on agent harness 设计。
- ⚠️ **v0.32.7 模型丢失问题仍在追踪** — [#17661](https://github.com/ollama/ollama/issues/17661)：Jetson AGX Orin 用户在升级到 0.32.7 后多个模型消失（仅 35B 模型幸存）。尚未定位根因。
- ✅ **v0.32.8 Docker 镜像缺失问题已解决** — [#17668](https://github.com/ollama/ollama/issues/17668)：发布 tag 已创建但镜像未推送导致 `manifest unknown`，已关闭。

## 3. 新模型与硬件支持

- **Nemotron 3.5 Lightning（v0.32.9）** — 新增 30B MoE 模型支持，3B 激活参数。相关 PR [#17672](https://github.com/ollama/ollama/pull/17672) 为其实现了专用 prompt layout（parser/renderer 及 Jinja 对齐）。
- **muse-glimmer 模型拉取修复** — [#17645](https://github.com/ollama/ollama/issues/17645)：此前 0.32.7 拉取 `muse-glimmer:30b-q8_0` 返回 412（需预发布版本），已关闭。
- **MLX 新增 Ling-3.0-Tiny 支持** — [#17643](https://github.com/ollama/ollama/pull/17643)：实现 BailingMoeV3 架构（含 FP8 / INT4 量化版）。
- **MLX 后端支持 CUDA 构建** — [#17688](https://github.com/ollama/ollama/pull/17688)：修复 imagegen 移除后带来的回归。
- **AMD Strix Halo GPU 显存检测修复** — [#17685](https://github.com/ollama/ollama/pull/17685)：修复 `hipMemGetInfo()` 返回系统内存而非 GPU VRAM 导致的问题，新增 `OLLAMA_GPU_MEMORY` 环境变量及 SmallCarveOutIGPU 处理。
- **OpenRC 服务支持** — [#17681](https://github.com/ollama/ollama/pull/17681)：为 Alpine/Gentoo 等 OpenRC 系统添加 service 配置。

## 4. 性能与优化

- **Prometheus 指标端点（PR 进行中）** — [#16998](https://github.com/ollama/ollama/pull/16998)：新增可选 `OLLAMA_METRICS=1` 下的 `GET /metrics`，暴露 scheduler 队列深度、已加载模型数、HTTP 请求计数、per-model token 指标。
- **移除默认 repeat_penalty 1.1（PR 进行中）** — [#17679](https://github.com/ollama/ollama/pull/17679)：当前默认值会施加到所有未显式设置该参数的模型上，而官方模型均未推荐 1.1。合并后将改变隐式采样行为。
- **基准测试改进（进行中）** — [#17480](https://github.com/ollama/ollama/pull/17480)：HumanEval patch prompts 替换合成词表，使 speculative decoding 基准更贴近真实代码场景。
- **CLI 进度输出优化** — [#16769](https://github.com/ollama/ollama/pull/16769)：stderr 非 TTY 时输出纯文本进度，避免 CI 日志中的 ANSI 乱码。
- **性能回归正在追踪** — [#17583](https://github.com/ollama/ollama/issues/17583)：Qwen3.6-35B-A3B 在 Mac Studio M2（64GB）上升级后从 72 T/s 显著下降，0.32.5 起引入，尚在排查。

## 5. 稳定性与回归

按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| 🔴 安全 | **Blob hash 验证绕过 / SSRF 风险** — [#15485](https://github.com/ollama/ollama/issues/15485)：config 与 layer 共享 digest 时 `skipVerify` 被覆盖，可导致 SSRF 响应外泄 | 无 PR |
| 🔴 安全 | **密码/邮箱更改后会话未撤销** — [#17682](https://github.com/ollama/ollama/issues/17682)：凭据泄露后改密仍无法踢出未授权会话 | 无 PR |
| 🔴 正确性 | **低精度 KV 量化输出乱码** — [#17614](https://github.com/ollama/ollama/issues/17614)：q8_0 → q4_0 KV 量化后模型输出重复无意义 token | 无 PR |
| 🔴 正确性 | **MLX 长活 runner 响应串号** — [#17599](https://github.com/ollama/ollama/issues/17599)：`OLLAMA_KEEP_ALIVE=-1` 时返回此前其他请求的完整回答（已关闭，建议验证修复版本） | ✅ 已关闭 |
| 🔴 崩溃 | **CUDA illegal memory access（DGX Spark）** — [#17596](https://github.com/ollama/ollama/issues/17596)：大 prefill + head-size-256 模型确定性崩溃，`ggml_cuda_flash_attn_ext_mma_f16_case` | 无 PR |
| 🟠 崩溃 | **Typhoon OCR 1.5 3B 在 Blackwell GPU 上确定性退化输出** — [#17687](https://github.com/ollama/ollama/issues/17687)：RTX 50 系列上重复输出 `@`，CPU 及其他视觉模型正常 | 无 PR |
| 🟠 数据丢失 | **升级 0.32.7 后模型消失** — [#17661](https://github.com/ollama/ollama/issues/17661)（见上文） | 无 PR |
| 🟠 中断 | **`context deadline exceeded`** — [#17484](https://github.com/ollama/ollama/issues/17484)：直连 URL 拉取模型时超时无重试。已有修复 PR [#17551](https://github.com/ollama/ollama/pull/17551)：停滞的 direct URL 请求将自动重试 | 🛠 PR 进行中 |
| 🟠 功能 | **MLX 结构化输出被忽略** — [#16563](https://github.com/ollama/ollama/issues/16563)：`response_format` 在 MLX 引擎上不生效 | 无 PR |
| 🟠 功能 | **muse-glimmer MLX 输出泄漏控制 token** — [#17684](https://github.com/ollama/ollama/issues/17684)：前缀带字面量 `to=user<|message|>` 且忽略 JSON schema | 无 PR |
| 🟡 回归 | **Qwen3.6 hybrid 在 CUDA 上回退 CPU** — [#17669](https://github.com/ollama/ollama/issues/17669)：llama.cpp b10353 引入，b10242 正常 | 无 PR |
| 🟡 回归 | **量化 KV cache 中断工具调用（ROCm）** — [#17347](https://github.com/ollama/ollama/issues/17347)：q8_0/q4_0 KV 量化导致模型停止生成而非发出 tool call，严重度随量化精度 | 无 PR |
| 🟡 错误 | **`ollama create` 多 FROM 行挂起** — [#17491](https://github.com/ollama/ollama/issues/17491)：mmproj 附加时无提示卡死。相关 PR [#17649](https://github.com/ollama/ollama/pull/17649) 为 create 添加 per-file SHA-256 进度 | 🛠 PR 进行中 |
| 🟡 内存 | **LXC 容器误报内存不足** — [#15704](https://github.com/ollama/ollama/issues/15704)：使用 MemFree 而非 MemAvailable 判定 | 无 PR |
| 🟡 云 | **Gemma 4 Cloud 视觉 + 工具调用返回 500** — [#17667](https://github.com/ollama/ollama/issues/17667) | 无 PR |
| 🟢 集成 | **Claude Code 无响应（Windows）** — [#17671](https://github.com/ollama/ollama/issues/17671)：`ollama launch claude` 启动正常，但 Claude Code 看不到生成结果 | 无 PR |
| 🟢 集成 | **claude-desktop 在 Linux 上不支持** — [#17653](https://github.com/ollama/ollama/issues/17653)。相关 PR [#17680](https://github.com/ollama/ollama/pull/17680) 改进报错信息 | 🛠 PR 进行中 |
| 🟢 功能 | **Cloud 不报告缓存 token 数** — [#15758](https://github.com/ollama/ollama/issues/15758)：始终返回 0 cached tokens | 无 PR |

## 6. 对应用开发者的意义

- **若你的应用使用 `keep_alive=-1` 且运行在 MLX 引擎上**：请升级到包含 [#17599](https://github.com/ollama/ollama/issues/17599) 修复的版本，并建议在应用层增加 response 一致性校验——该 bug 会导致返回其他请求的历史回答，对多用户共享 runner 的服务影响极大。
- **结构化输出在 MLX 上并不可靠**（[#16563](https://github.com/ollama/ollama/issues/16563)）：若你的 Agent 依赖 `response_format` 且运行在 Apple Silicon，建议在客户端强制 JSON schema 校验，或临时切换至 GGUF 后端。
- **`context deadline exceeded` 问题即将有修复**：PR [#17551](https://github.com/ollama/ollama/pull/17551) 针对直连 URL 拉模型的停滞重试；在合并前，建议对通过 `hf.co` 直连地址拉取模型的场景做好重试与超时兜底。
- **`repeat_penalty` 默认值将可能变化**（[#17679](https://github.com/ollama/ollama/pull/17679)）：合并后未显式设置该参数的模型将不再默认施加 1.1，输出风格可能有可感知变化。建议在 API 请求中显式传入该参数，避免行为漂移。
- **Web search 能力即将进入 OpenAI 兼容层**（[#17686](https://github.com/ollama/ollama/pull/17686)）：Codex 的 `web_search` 工具将在 Ollama 服务端执行搜索并回填上下文。这对构建 Codex 类 agent 的开发者是直接利好。
- **可观测性增强在路上**：Prometheus `/metrics` 端点（[#16998](https://github.com/ollama/ollama/pull/16998)）落地后，可以原生监控队列深度、模型加载数和 token 吞吐，替代目前的日志解析方案。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 · 2026-08-12

## 1. 今日速览

- 过去 24 小时密集发布 7 个新版本至 v1.96.2，Release Notes 均为 cosign 签名模板，未披露具体变更。
- LiteLLM Rust 重写（[#31263](https://github.com/BerriAI/litellm/issues/31263)）启动 Beta 招募，目标为 sub-1ms 开销的 AI Gateway，是当前最值得关注的架构级动向。
- 社区 PR 集中在成本归属修正（streamed responses / batches / OCR / xAI web search）与 Guardrails 可靠性（Bedrock Anthropic SSE、内容过滤日志持久化）。

## 2. 版本发布与破坏性变更

- 新版本：v1.96.2（最新）、v1.95.1、v1.94.3、v1.93.2、v1.92.2、v1.91.5、v1.90.7。
- Release Notes 仅说明 Docker 镜像已用 cosign 签名（commit `0112e53` 引入的同一密钥），未包含代码级变更说明，建议升级前自行核对 changelog。[v1.96.2](https://github.com/BerriAI/litellm/releases/tag/v1.96.2)
- 未发现明确的 API/配置破坏性变更。但发布节奏极快，生产环境建议锁定版本后再升级。
- 打包兼容性风险：[#36526](https://github.com/BerriAI/litellm/issues/36526) 报告 `1.96.1` 未发布 Python 3.13 兼容 wheel/sdist，Python 3.13 环境安装会失败，需确认 `1.96.2` 是否已修复。

## 3. 新模型与硬件支持

- DashScope cost map 新增 Qwen3.8-Max、DeepSeek V4、GLM 5.1/5.2、Kimi K2.7-code，修复新模型 $0 spend 和上下文窗口回退问题（[PR #36496](https://github.com/BerriAI/litellm/pull/36496)）。
- Ollama 模型改为通过运行时 `/api/show` 探测真实能力与上下文窗口，而非依赖静态 model info（[PR #36574](https://github.com/BerriAI/litellm/pull/36574)）。
- Meta Model API 后端已支持 `meta/muse-spark-1.1`，但 Web Dashboard「Add Model」下拉框中缺失该 Provider（[#36164](https://github.com/BerriAI/litellm/issues/36164)）。
- 社区请求原生集成 BlockRun 模型（[#27719](https://github.com/BerriAI/litellm/issues/27719)）。

## 4. 性能与优化

- [PR #36610](https://github.com/BerriAI/litellm/pull/36610)：新增共享 `JSONFragmentAccumulator`，解决 Vertex/Anthropic 流式 SSE 每 chunk 全量复制缓冲区的 O(n²) 开销，并加入 parse-deferral 启发式，避免两个拼接 JSON envelope 导致流式解析永久卡住。
- [PR #31922](https://github.com/BerriAI/litellm/pull/31922)：Vertex JSON 流式分片改用 list buffer 累计，减少重复拷贝（进行中）。
- [PR #36599](https://github.com/BerriAI/litellm/pull/36599)：MCP OAuth/metadata 发现改为后台预热，避免可选 MCP 服务故障拖垮 proxy worker 健康检查与滚动替换。
- [PR #36607](https://github.com/BerriAI/litellm/pull/36607)：暴露 Prisma 连接池饱和度指标，帮助区分「DB 连接耗尽」与「上游延迟」两类容量问题。

## 5. 稳定性与回归

流式中断 / 崩溃：
- [#36553](https://github.com/BerriAI/litellm/issues/36553)：`_should_start_new_content_block` 在空 `choices` chunk（仅 usage）上无条件访问 `choices[0]` 导致崩溃，影响 `/v1/messages` 非 Anthropic 后端。暂无 fix PR。
- [#27670](https://github.com/BerriAI/litellm/issues/27670)：`stream=True` 且 delta 含 `reasoning` 字段时抛 `TypeError: 'async for' requires an object with aiter method`。
- [#35413](https://github.com/BerriAI/litellm/pull/35413) / [#35425](https://github.com/BerriAI/litellm/pull/35425)：`completed_response` 未初始化导致 mid-stream 错误被 `AttributeError` 掩盖、fallback 被绕过；两个修复 PR 一个已关闭、一个仍在推进。

计费正确性：
- [#36192](https://github.com/BerriAI/litellm/issues/36192)：Azure GPT-5.6 Terra/Luna 的 cost map 错误沿用 OpenAI 降价后价格，Azure 实际未降价。暂无修复 PR。
- [#30817](https://github.com/BerriAI/litellm/pull/30817)：xAI web search 改读 `server_side_tool_usage_details.web_search_calls`，修复调用按 $0 计费的问题（已关闭）。
- [#36468](https://github.com/BerriAI/litellm/pull/36468)：Anthropic passthrough batch 成本现在归属到创建 key/team/tags（已关闭）。
- [#36529](https://github.com/BerriAI/litellm/pull/36529)：streamed passthrough `responses` 调用此前零 token/零花费，现通过终端 `response.completed/incomplete/failed` 事件计价。
- [#36609](https://github.com/BerriAI/litellm/pull/36609)：OCR 调用现在正确尊重 deployment 自定义定价（fixes #36608）。

模型翻译与兼容性：
- [#26444](https://github.com/BerriAI/litellm/issues/26444)：Claude Opus 4.7 拒绝 `temperature`，但 `get_supported_openai_params()` 仍报告支持，导致 API 层 400。
- [#27168](https://github.com/BerriAI/litellm/issues/27168)：Anthropic 消息转换对所有 Claude 模型强制注入 `effort=xhigh`，Claude Code 在 v1.83.10/v1.83.14 必现 400。
- [#27429](https://github.com/BerriAI/litellm/issues/27429)：OCI OpenAI GPT-5 模型将 `max_completion_tokens` 映射为不支持的 `maxTokens`。
- [#36526](https://github.com/BerriAI/litellm/issues/36526)：Python 3.13 缺少可用 wheel/sdist（见第 2 节）。
- [#36535](https://github.com/BerriAI/litellm/issues/36535)：`sensitive_data_routing` 有文档但未注册为可识别 guardrail。

部署与运维：
- [#27173](https://github.com/BerriAI/litellm/issues/27173)：Helm 1.1.0 standalone DB secret 漂移，导致 CrashLoop（已关闭）。
- [#27193](https://github.com/BerriAI/litellm/issues/27193)：Enterprise 版 v1.82.3 中旧 API key 宽限期被忽略、立即拒绝（已关闭）。
- [#14809](https://github.com/BerriAI/litellm/issues/14809)：多副本部署下 Slack 告警/花费报告按 pod 重复发送（已关闭）。
- [#36566](https://github.com/BerriAI/litellm/issues/36566)：`litellm_content_filter` 评估未持久化到 Guardrails Monitor；已有修复 [PR #36606](https://github.com/BerriAI/litellm/pull/36606)。

## 6. 对应用开发者的意义

- **成本/账单更准确**：若你的业务依赖 Responses API 流式、Anthropic batch、OCR 或 xAI web search，升级后这几类调用的用量归属与花费数据会显著更精确。
- **Guardrails 可观测性在补课**：内容过滤评估日志持久化（[#36606](https://github.com/BerriAI/litellm/pull/36606)）和 Bedrock Anthropic SSE 后置扫描（[#36598](https://github.com/BerriAI/litellm/pull/36598)）意味着安全链路更可靠，适合生产环境跟进。
- **流式路径收益明显**：`JSONFragmentAccumulator`（[#36610](https://github.com/BerriAI/litellm/pull/36610)）解决 O(n²) 缓冲区复制问题，高吞吐流式场景的 GC 压力和尾延迟有望改善。
- **Python 3.13 用户先别升**：确认新版 wheel 发布后再升级；当前 1.96.x 在 3.13 环境下存在安装风险。
- **关注 Rust 迁移**：官方已开放 Beta 申请（[#31263](https://github.com/BerriAI/litellm/issues/31263)），对网关延迟和资源占用敏感的用户可提前试用，但生产迁移仍建议等待正式发布。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth 动态日报 — 2026-08-12

### 1. 今日速览

今日核心事件是 **Unsloth Desktop 正式发布**（v0.1.701-beta），成为首个支持本地运行与训练 AI 模型的跨平台桌面应用（Windows/macOS/Linux）。与此同时，社区反馈大量集中在 **Unsloth Studio/Desktop 的稳定性问题**（Windows 路径处理、AMD ROCm 后端、GGUF 模型兼容性），多个针对性能与正确性的修复 PR 已于今日提出，值得关注。

---

### 2. 版本发布与破坏性变更

- **v0.1.701-beta — Introducing Unsloth Desktop 🦥**
  首个桌面应用版本，支持在本地运行与训练模型，集成 research、export、deploy 全流程，覆盖 Windows、macOS 与 Linux。
  🔗 https://github.com/unslothai/unsloth/releases

  > ⚠️ **迁移注意**：Linux 用户使用 AppImage 时需要额外的系统库（见 Issue #8463），否则应用无法启动。

- **v0.1.62-beta** — 仅标注 "Many bug fixes"，无显著破坏性变更。
  🔗 https://github.com/unslothai/unsloth/releases

---

### 3. 新模型与硬件支持

- **MiniMax-M3 GGUF（UD-Q6_K_XL / UD-Q5_K_XL）加载失败**（影响 Apple Silicon，llama.cpp 缺少 indexer 元数据）
  🔗 https://github.com/unslothai/unsloth/issues/8513
  🔗 https://github.com/unslothai/unsloth/issues/8360
- **Muse-Glimmer-30B-GGUF 无法被内置 llama-server 加载**（GGUF architecture `muse-glimmer` 未被识别）
  🔗 https://github.com/unslothai/unsloth/issues/8345
- **Steam Deck / 不可变发行版可移植 AppImage 支持**（PR #8343，携带 WebKit/GTK 依赖，适用于 SteamOS/Bazzite）
  🔗 https://github.com/unslothai/unsloth/pull/8343
- **AMD ROCm 相关多个问题**：#8364 ROCm hipblaslt kernel catalog 缺失、#7275 ROCm PyTorch 被非 ROCm wheel 替换、#8473 AMD GPU 检测后实际后端 CPU-only。
  🔗 https://github.com/unslothai/unsloth/issues/8364
  🔗 https://github.com/unslothai/unsloth/issues/7275
  🔗 https://github.com/unslothai/unsloth/issues/8473

---

### 4. 性能与优化

- **避免整个回答在每个流式 token 时被重新扫描**（PR #8428）——将工具标记扫描从每 token O(n) 降到线性；配套 PR #8494 进一步覆盖 safetensors 与 healer 路径中的二次复杂度扫描。
  🔗 https://github.com/unslothai/unsloth/pull/8428
  🔗 https://github.com/unslothai/unsloth/pull/8494
- **后端启动时间与事件循环阻塞优化**（PR #8498）——减少非必要启动路径上的序列化工作，避免阻塞事件循环。
  🔗 https://github.com/unslothai/unsloth/pull/8498
- **路由/数据层 5 条超线性路径重写**（PR #8499），纯算法重构，无行为变更。
  🔗 https://github.com/unslothai/unsloth/pull/8499
- **多 GPU 训练 attention mask 设备对齐修复**（PR #8516）——修复 xFormers BlockDiagonalCausalMask 与 Query/Key/Value 设备不匹配的问题。
  🔗 https://github.com/unslothai/unsloth/pull/8516
- **Auto 模式下的投机解码显存策略**（PR #8435）——显存受限时优先丢弃 drafter，而非压缩 context。
  🔗 https://github.com/unslothai/unsloth/pull/8435
- **llama.cpp 后端可在 UI 中切换**（PR #8520）——支持 Automatic / CPU / CUDA / ROCm / Vulkan，无需重启或 shell 操作。
  🔗 https://github.com/unslothai/unsloth/pull/8520

---

### 5. 稳定性与回归

按严重程度排列，★ 越多越严重：

| 严重度 | 问题 | 状态 | 链接 |
|---|---|---|---|
| ★★★ | **Linux AppImage 缺失系统库，应用无法启动**（#8463，8 评论） | Open，无 fix PR | https://github.com/unslothai/unsloth/issues/8463 |
| ★★★ | **更新后版本号与 dist-info 不一致，`unsloth.__version__` 错误别名 `unsloth_zoo.__version__`**（#8171） | Closed；PR #8505 验证更新后版本，修复 no-op 更新 | https://github.com/unslothai/unsloth/issues/8171 |
| ★★★ | **Windows 绝对路径（C:\...）导致 GGUF 模型 chat 503**（#8368/#8375），已 Closed | 相关 PR #8515 修复重复 dist-info 导致的问题 | https://github.com/unslothai/unsloth/issues/8368 |
| ★★☆ | **torch==2.11.0+cu130 下载失败，pip 在安装脚本中异常**（#8456） | Open，建议用 wget 替代 dump pip | https://github.com/unslothai/unsloth/issues/8456 |
| ★★☆ | **导出 tokenizer_config.json 包含不可加载的 `TokenizersBackend`**（#8444） | Open | https://github.com/unslothai/unsloth/issues/8444 |
| ★★☆ | **Stale venv 检测，torch CPU/CPU 版本错误且无法删除**（#4848，8 评论） | Closed | https://github.com/unslothai/unsloth/issues/4848 |
| ★★☆ | **OpenRouter 免费模型误报 "Insufficient credits"**（#8518） | Open | https://github.com/unslothai/unsloth/issues/8518 |
| ★☆☆ | **Studio 自定义 OpenAI 兼容 provider 固定 32K max output**（#8509） | PR #8512 按已知模型 family 推断上限 | https://github.com/unslothai/unsloth/issues/8509 |
| ★☆☆ | **设置中 Apple M4 Pro 频率显示 4-MHz 而非 GHz**（#8519） | Open，已有 1 评论 | https://github.com/unslothai/unsloth/issues/8519 |
| ★☆☆ | **Chat 搜索对话框打开时卡顿**（PR #8514） | 已提出修复 | https://github.com/unslothai/unsloth/pull/8514 |
| ★☆☆ | **Windows 登录时自启动失败**（#8510） | Open | https://github.com/unslothai/unsloth/issues/8510 |

**CI 全红修复**：PR #8506 清理了 backend CI 上阻塞所有 open PR 的 4 个失败（torchao 未安装 + allowlist 泄漏），修复 21 个测试。另 PR #8489 为 Studio 首次引入真实 Kaggle T4 的 CUDA 覆盖测试。
🔗 https://github.com/unslothai/unsloth/pull/8506
🔗 https://github.com/unslothai/unsloth/pull/8489

---

### 6. 对应用开发者的意义

- **Unsloth Desktop 提供本地运行/训练入口**，但当前 Beta 质量门槛较高：Windows 路径、Linux 系统依赖、AMD/ROCm 后端均有明显问题。建议在非 NVIDIA + Linux/macOS 环境部署前先验证对应 issue。
- **llama.cpp 后端切换能力（PR #8520）** 使得开发者可以在多硬件环境下动态选择推理引擎，无需重启服务，适合作为 Agent 基础设施的运行时底座。
- **自定义 OpenAI 兼容 provider 的 32K 输出上限问题（#8509/#8512）** 直接影响 Agent 长文本生成场景；已知模型家族（如 deepseek）会获得更大的上限，但自建 endpoint 需要显式配置。
- **导出的 tokenizer_config.json 可能损坏（#8444）**，对微调后模型的 serving 链路有风险，发布前应做 AutoTokenizer 回归验证。
- **OpenRouter 免费模型不可用（#8518）** 影响低成本 Agent 路由策略，建议 fallback 到其他 provider。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*