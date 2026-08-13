# AI 基础设施日报 2026-08-14

> 生成时间: 2026-08-13 23:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析 — 2026-08-14

## 1. 生态全景

当前 AI 基础设施的竞争焦点已全面转向 **DeepSeek-V4 与 Kimi-K3 两大新架构的生产级落地**，vLLM、SGLang、llama.cpp 均围绕其展开内核级适配（TRT-LLM Attention、IndexCache、ROCm 路线图）。与此同时，**投机解码**（MTP/DSD/EAGLE）成为性能优化主战场，但多起 CUDA illegal memory access 与吞吐骤降问题表明其距离生产稳定仍有明显差距。**Agent 工具调用**是应用层最热议题，GPT-OSS/Harmony 语法不匹配、MCP 基础设施完善、Claude Code 集成等问题贯穿网关与推理引擎各层。多节点分布式部署成为新的稳定性短板——NCCL 死锁、TP 多节点 stall、PP 正确性问题频发，横向扩展能力仍是行业性挑战。

## 2. 各项目活跃度对比

| 项目 | Issues（日报列示） | PRs（日报列示） | Release | 活跃特征 |
|---|---|---|---|---|
| **vLLM** | 约 19 | 约 16 | 无新 Release；0.27.0 存在两起升级回归 | 稳定性问题集中爆发期：投机解码崩溃、多节点 stall、升级回归 |
| **SGLang** | 48（Top 30） | 468（Top 20） | 无 | 围绕 DeepSeek V4 TRT-LLM Attention 与 KV Cache 复用的密集开发期 |
| **llama.cpp** | 67 | 128 | **b10411–b10423 连续 13 个版本** | 高频迭代：CPU 参数统一、Metal TQ2_0、OpenVINO 新模型支持 |
| **Ollama** | 约 13 | 约 11 | 无 | 修复主导：MLX 结构化输出、Strix Halo VRAM 检测、WoA CPU 性能 |
| **LiteLLM** | 约 12 | 约 16 | v1.98.0-dev.2（开发版） | 权限模型治理 + MCP OAuth 存储迁移，网关层功能性迭代 |
| **Unsloth** | 约 18 | 约 6 | **v0.1.702-beta（Desktop 首发）** | 桌面版首日 Bug 集中爆发：安装器、GPU 识别、启动崩溃 |

> 注：vLLM/Ollama/LiteLLM/Unsloth 未披露当日仓库总更新量，数字为日报列示的 issue/PR 数。

## 3. 模型支持竞速

| 项目 | DeepSeek-V4 | Kimi-K3 | 其他值得关注的新模型/架构 |
|---|---|---|---|
| **vLLM** | IndexCache 落地（#51209）、ROCm 优化清单（#41820）、MTP=3 基准测试（#52228）；但 0.27.0 升级后 Flash 版报错（#51758） | ROCm 支持路线图（#50682）、DCP 部分前缀缓存（#50493）、hybrid attention 前缀缓存修复（#51295） | Qwen3.5/3.6 MTP、GPT-OSS/Harmony 工具调用、Gemma4 启动回归（#51744） |
| **SGLang** | TRT-LLM Attention for SM100/103 集成（#30805）推进中，性能追踪 issue #33636 活跃 | Day-0 支持已发布，Bug 追踪 #32970 | DSpark draft（#34782）、AMD gfx950 packed GDN decode（#33113）、Online MXFP4（#29328） |
| **llama.cpp** | DeepSeek-V4-Flash Vulkan/Metal 仍有崩溃/退化报告 | Kimi-K3 文本模型 PR #26185 进行中（KDA+MLA+latent MoE） | OpenVINO 新增 Qwen3.5 MoE + MXFP4；MiniMax-Text-01/M1 lightning attention（#27018）；Metal TQ2_0 量化 |
| **Ollama** | —（依赖 llama.cpp 后端） | 云订阅上线两周仍不可用（#17715） | Nemotron 系列 MLX 视觉支持（#17714）、Qwen3.8-2.4T-A95B-FP8 云模型请求（#17720） |
| **LiteLLM** | 网关层适配，无内核工作 | 网关层适配 | Xiaomi MiMo-V2 参数兼容问题（#24549）；Bedrock GPT-5.5→Responses API 自动转换 |
| **Unsloth** | — | — | Ornith-1.0 支持请求热度最高（23👍）；MiniMax-H3 兼容性缺口（#8666） |

**判断**：vLLM 与 SGLang 在 DeepSeek-V4/Kimi-K3 的**内核深度适配**上领先（算子、投机解码、内存复用）；llama.cpp 覆盖广度占优且迭代最快，但深度适配仍在 PR 阶段；Ollama/Unsloth 依赖上游运行时，竞争力体现在**集成体验**（MLX、桌面端）；LiteLLM 作为网关无需内核适配，焦点在 API 兼容与成本映射。

## 4. 性能优化前沿

今日各项目优化火力集中在五个方向：

**① KV Cache（最热）**
- vLLM：DeepSeek-V4 IndexCache 共享 reuse top-k 索引（#51209）；消除 KV-sharing 路径 GPU→CPU 同步（#42850）
- SGLang：SWA KV 页面释放去设备同步，输出吞吐 +4.9%（#34783）；decode-side radix cache（#27770）；position-independent KV 复用 RFC（#30928）
- llama.cpp：CPU flash-attention V-cache F16→F32 向量化，提升 prefill 吞吐（#26947）

**② 投机解码**
- vLLM：异步投机解码解串行阻塞（#29134）；MRV2 draft_model 支持（#43091）；DSD 吞吐崩塌（#49548）、baseline 税（#49986）等问题集中暴露
- SGLang：DSpark draft H2D 拷贝改非阻塞，每 decode step 消除 21 次同步、省 71.4ms（#34782）
- llama.cpp：dflash/dspark 后端采样（#26958）；MTP 自动检测（#b10415）

**③ 分布式推理**
- SGLang：DCP 统一 A2A pack/unpack，每层每 decode step 省 4 次物化拷贝（#34651）
- vLLM：decode CP 输出漂移（#41623）与 4 节点 TP stall（#51921）提示分布式仍是薄弱环节
- llama.cpp：LFM2 支持 tensor split（#26993）

**④ 量化**
- llama.cpp：Metal TQ2_0 2-bit 量化落地（#26980）；OpenVINO MXFP4 支持（#26952）
- SGLang：ROCm Online MXFP4 在线重量化（#29328）；AITER a16w4/a8w4 集成（#50682 跟踪）
- vLLM：ROCm 侧量化算子适配（#41820）

**⑤ 算子与内核**
- SGLang：TRT-LLM Attention 集成（#30805）——NVIDIA SM100 平台关键路径
- vLLM：Blackwell SM100 head-dim-256 paged attention 回退 FA2（#52050）
- llama.cpp：CUDA MMQ tail padding 修复（#27044）；OpenCL flash-attention barrier 修复（#26434）；Hexagon FA 确定性修复（#27042）

## 5. 分层定位差异

| 项目 | 分层 | 典型部署形态 | 核心能力 | 关键差异化 |
|---|---|---|---|---|
| **vLLM** | 生产级推理引擎/模型服务 | 大规模 GPU 集群、多节点 TP/PP/CP | PagedAttention、连续批处理、投机解码、CUDA Graph | 吞吐与分布式能力最强，但今日稳定性问题也最多 |
| **SGLang** | 推理引擎（深度优化向） | 单/多节点，PD 分离架构 | RadixAttention、DSpark、DeepSeek V4 深度绑定、Rust 网关 | 前缀缓存复用机制领先，与 DeepSeek-V4 联合优化最紧密 |
| **llama.cpp** | 本地/边缘跨平台运行时 | 单机 CPU/GPU、边缘设备 | GGUF 生态、五后端覆盖（Metal/SYCL/OpenVINO/Vulkan/CUDA） | 覆盖面最广、迭代最快，是本地推理的事实标准 |
| **Ollama** | 本地部署/开发者体验层 | 桌面/开发者笔记本 | 封装运行时、一键部署、模型库、Launch 生态 | 将推理引擎封装为“类 Docker”体验，MLX 结构化输出在补齐 |
| **LiteLLM** | LLM 网关/代理层 | 服务端 API 网关 | 多 provider 统一接入、成本追踪、权限管理、MCP | 企业级权限治理与成本可观测性，与模型内核解耦 |
| **Unsloth** | 训练/微调框架 | 本地训练/微调 + 桌面产品 | 高效微调（QDoRA/GALoRA）、GGUF 导出、Desktop 应用 | 训练到导出全链路，Desktop 首发代表向推理/Agent 场景延伸 |

## 6. 值得关注的趋势信号

**① DeepSeek-V4 / Kimi-K3 成为“基准模型”，基础设施全面跟进。** 两者几乎出现在所有项目的路线图中，vLLM/SGLang 在算子级深度优化，Ollama 在云订阅，LiteLLM 在成本映射。新模型发布后 2 周内完成生产级适配已成为竞争基线。

**② 投机解码是性能前沿，也是稳定性重灾区。** vLLM 出现多起 CUDA illegal memory access（#40756/#37035）、DSD 吞吐灾难性崩塌（#49548）、PP 下输出错误（#52071）；SGLang 的 Mamba 状态错位（#34760）被标 DO NOT MERGE。该技术从“演示可行”到“生产可靠”仍有显著距离。

**③ Agent 工具调用正在重塑每层协议栈。** 从推理引擎的 grammar 渲染（vLLM #23567）到网关的 MCP OAuth 存储（LiteLLM #36844）再到本地运行时（Ollama Launch/Unsloth Desktop），Agent 作为消费者的需求正在推动 API 层统一（OpenAI Responses/Codex CLI 兼容性）。

**④ 多节点部署稳定性是行业性短板。** vLLM 4 节点 TP 永久 stall（#51921）、SGLang 多节点 NCCL 死锁（#33289）、llama.cpp 各后端驱动崩溃——横向扩展仍缺乏足够成熟的工程验证，生产环境多节点部署需格外谨慎。

**⑤ 回归问题高频出现，升级窗口风险陡增。** vLLM 0.27.0 两起升级即失败（#51758/#51744）、Ollama VRAM 检测回归（#16462）、LiteLLM end_user 回归（#31441）。建议生产环境执行“先验证后升级”策略，锁定已验证版本。

**⑥ 成本可观测性成为企业刚需。** LiteLLM 新增 prompt cache token 展示（#36827）、修复 Azure 成本映射错误（#36192）；vLLM 引入前向指标管线（#52061）。GPU 资源成本敏感度在持续上升。

**⑦ 本地推理“桌面化”加速，多后端兼容是硬骨头。** Unsloth Desktop 首发、Ollama Launch 生态扩展、llama.cpp 连续 13 个版本迭代，但 AMD/Intel/Apple 各后端的驱动级 Bug（SYCL 乱码、Vulkan DeviceLost、Strix Halo VRAM）仍是主要阻碍。

**对 Agent/应用开发者的具体建议**：
- 生产使用 GPT-OSS/Harmony 工具调用的团队，关注 vLLM #23567 两个修复 PR 的合入后测试；
- 网关层若使用 LiteLLM，升级后可获得更严格的多租户权限模型与 MCP 多 worker 支持，但需先验证权限迁移；
- 依赖本地 MLX 结构化输出的开发者，Ollama #17690/#17697 合入前不要信任 `response_format`；
- 投机解码建议在目标模型与硬件上完成长序列、高并发基准后再启用，vLLM 0.27.0 暂缓升级。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 — 2026-08-14

## 今日速览

- **GPT-OSS/Harmony 工具调用 Bug 热度最高**（#23567，47 评论），当前已有两个修复 PR（#51020、#52222）并行推进，核心问题是严格工具调用语法与实际 Harmony 渲染输出不匹配。
- **投机解码（MTP/动态 DSD）成为稳定性与性能双热点**：多起 CUDA illegal memory access 崩溃（#40756、#37035），以及动态投机解码在高并发下吞吐骤降（#49548、#49986），均无完整修复。
- **DeepSeek-V4 与 Kimi-K3 的 ROCm 支持与性能优化持续密集推进**：新增 IndexCache 支持（#51209）、ROCm 路线图跟踪（#41820、#50682）等多项进展。

---

## 版本发布与破坏性变更

过去 24 小时无新 Release。但需注意 **v0.27.0 已出现两起升级回归**：

- **升级后 DeepSeek-V4 Flash 直接报错**：[#51758](https://github.com/vllm-project/vllm/issues/51758) — 从 0.26.0 升级到 0.27.0 后运行 deepseek v4 flash 失败，目前无修复 PR。
- **latest 镜像无法启动 Gemma4**：[#51744](https://github.com/vllm-project/vllm/issues/51744) — vllm-openai:latest（vLLM 0.27.0）搭配 Transformers 5.15.0 启动 Gemma4 NVFP4 失败，影响 TP=2 场景。

若生产环境依赖上述模型，建议暂缓升级 0.27.0。

---

## 新模型与硬件支持

- **Kimi-K3 在 ROCm 的完整支持与性能路线图**：[#50682](https://github.com/vllm-project/vllm/issues/50682) — 跟踪 ROCm 上 Kimi-K3 的 Day-0 特性、AITER fused-moe（a16w4/a8w4）集成及其他优化项。
- **DeepSeek-V4 在 ROCm 后端的端到端优化清单**：[#41820](https://github.com/vllm-project/vllm/issues/41820) — 涵盖 mHC/HCA/CSA/MoE/MTP 等关键模块在 ROCm 上的启用以性能验证。
- **NVIDIA 机密计算（Confidential Computing）解码头优化**：[#52226](https://github.com/vllm-project/vllm/pull/52226) — 面向 Hopper+ GPU CC 场景的 decode 优化（PCIe/GPU 间加密传输）。
- **Model Runner V2 投机解码草案模型支持**：[#43091](https://github.com/vllm-project/vllm/pull/43091) — 在 MRV2 中支持 `draft_model` 方式的 spec decode。

---

## 性能与优化

- **DeepSeek-V4 IndexCache 落地**：[#51209](https://github.com/vllm-project/vllm/pull/51209) — 为 C4A 层共享 reuse top-k 索引，与 DSpark 配合提升 DeepSeek-V4-Flash 服务性能。
- **消除 KV-sharing 路径中的两个 GPU→CPU 同步**：[#42850](https://github.com/vllm-project/vllm/pull/42850) — 避免 `.max().item()` / `.sum().item()` 阻塞，减少 prefill 元数据计算延迟。
- **ViT 全 CUDA Graph 支持（RFC）**：[#38175](https://github.com/vllm-project/vllm/issues/38175) — 针对 Qwen3-VL / GLM-V / Kimi K2.5 等 MLLM 的视觉编码器启动开销问题。
- **Kimi-K3 DCP 部分前缀缓存命中**：[#50493](https://github.com/vllm-project/vllm/pull/50493) — 在 DCP 下提升 prefix-cache 复用粒度，精确报告缓存 token 范围。
- **非 DSpark 自适应验证的 MRV2 acceptance 估算**：[#52228](https://github.com/vllm-project/vllm/pull/52228) — 对 DeepSeek-V4-Flash + MTP=3 场景的吞吐收益进行了基准测试。
- **异步投机解码优化（历史活跃）**：[#29134](https://github.com/vllm-project/vllm/issues/29134) — 提出将 `seq_lens_cpu` 变为可选，彻底解除 spec-decode 中 input-prep 与模型 forward 的串行阻塞。

**动态投机解码（DSD）性能问题集中爆发**：

- [#49548](https://github.com/vllm-project/vllm/issues/49548)：`FULL_AND_PIECEWISE→PIECEWISE` 的 cudagraph 降级导致阈值处吞吐骤降，高并发下出现“灾难性聚合吞吐崩塌”。
- [#49986](https://github.com/vllm-project/vllm/issues/49986)：DSD 各 arm 相比 no-spec 存在较大的 baseline 税，`PIECEWISE` 是因素之一。
- [#48627](https://github.com/vllm-project/vllm/issues/48627)：RFC 提出将 `num_speculative_tokens_per_batch_size` 扩展出 context-length 维度，以更细粒度调度投机深度。
- [#47277](https://github.com/vllm-project/vllm/issues/47277)：Qwen3.5 原生 MTP 在较好 acceptance 下仍可能慢于无 MTP 的 CUDA graph baseline。
- [#38988](https://github.com/vllm-project/vllm/issues/38988)：Qwen3.5-27B 的 prefix caching 效果不明，存在社区讨论与相关 issue。

---

## 稳定性与回归

### 高严重度（阻塞/崩溃/无声错误）

- **4 节点 TP=4 推理引擎空闲 ~1 分钟后永久 stall**：[#51921](https://github.com/vllm-project/vllm/issues/51921) — GB10/sm_121 aarch64 上 `shm_broadcast` writer starve，请求永不进入 scheduler。无修复 PR。
- **Decode Context Parallelism 输出漂移/乱码**：[#41623](https://github.com/vllm-project/vllm/issues/41623) — v0.21.0 与 nightly 中 `--decode-context-parallel-size` 产生错误输出。无修复 PR。
- **MTP 投机解码 CUDA illegal memory access**：[#40756](https://github.com/vllm-project/vllm/issues/40756) — Qwen3.6-27B-FP8、`num_spec_tokens=5` 长序列下崩溃；另有同源问题 [#37035](https://github.com/vllm-project/vllm/issues/37035)（`gdn_attn.py:237`、qwen3_next_mtp）。均无修复 PR。
- **投机解码 + pipeline parallelism 输出错误**：[#52071](https://github.com/vllm-project/vllm/issues/52071) — `--no-async-scheduling` 下 PP=2/4/8 均能复现，影响 Kimi 等模型。无修复 PR。

### 升级/兼容性回归

- **0.26.0 → 0.27.0 升级后 DeepSeek-V4 Flash 报错**：[#51758](https://github.com/vllm-project/vllm/issues/51758)
- **latest 镜像 + Transformers 5.15.0 无法启动 Gemma4**：[#51744](https://github.com/vllm-project/vllm/issues/51744)
- **`draft_model` 无法加载 mixed-precision compressed-tensors checkpoint**：[#49893](https://github.com/vllm-project/vllm/issues/49893)

### 硬件/后端缺陷

- **Intel Arc B60（XPU）上所有 GPTQ checkpoint 失败**：[#52203](https://github.com/vllm-project/vllm/issues/52203) — `UR_RESULT_ERROR_DEVICE_LOST`，发生在 profile_run 阶段，vLLM 0.27.2.dev0。

### 已有修复 PR 或已确认修复方向

- **GPT-OSS/Harmony 工具调用错误**（[#23567](https://github.com/vllm-project/vllm/issues/23567)）：修复 PR [#51020](https://github.com/vllm-project/vllm/pull/51020)（严格语法匹配真实 render）与 [#52222](https://github.com/vllm-project/vllm/pull/52222)（放宽约束重做）均已提交。
- **Kimi-K3 hybrid attention 前缀缓存 miss**（eagle drop 触发）：修复 PR [#51295](https://github.com/vllm-project/vllm/pull/51295)。
- **`VLLM_BATCH_INVARIANT=1` 在 TP>1 下非确定性问题**：修复 PR [#51292](https://github.com/vllm-project/vllm/pull/51292) — 禁用 `fuse_allreduce_rms`。
- **Custom AllReduce buffer 初始化不足**（batch-invariant 模式无法使用）：修复 PR [#50505](https://github.com/vllm-project/vllm/pull/50505)。
- **CPU offload `store_threshold` 计数逻辑错误**（lookup 而非 store offer）：修复 PR [#52227](https://github.com/vllm-project/vllm/pull/52227)。
- **Blackwell SM100 head-dim-256 paged attention 失败**：修复 PR [#52050](https://github.com/vllm-project/vllm/pull/52050) — 回退至 FA2，解决 ColPali MRV2 迁移中的 `seqused_k/q` 兼容问题。
- **xxhash prefix cache 缺少依赖时可快速失败**：修复 PR [#42881](https://github.com/vllm-project/vllm/pull/42881)，避免隐式降级。

---

## 对应用开发者的意义

- **若正在生产使用 GPT-OSS/Harmony 工具调用，请关注 [#23567](https://github.com/vllm-project/vllm/issues/23567)**：严格模式下的 grammar 与真实渲染不匹配会导致多轮对话报错，两个修复 PR（#51020/#52222）正在推进，建议合入后充分测试 BFCL 与多轮场景。
- **升级 0.27.0 前务必验证 DeepSeek-V4-Flash 与 Gemma4**：[#51758](https://github.com/vllm-project/vllm/issues/51758) 与 [#51744](https://github.com/vllm-project/vllm/issues/51744) 均为升级后直接失败，建议等待修复或锁定旧版本镜像。
- **投机解码（尤其 MTP / 动态 spec decode）在生产环境有较高风险**：多起崩溃与性能骤降尚未修复，建议在目标模型与硬件上做长序列、高并发基准测试后再启用。
- **AMD（ROCm）平台对 Kimi-K3 / DeepSeek-V4 的支持仍处于进行时**（[#50682](https://github.com/vllm-project/vllm/issues/50682)、[#41820](https://github.com/vllm-project/vllm/issues/41820)），若作为生产后端，需关注 AITER/量化算子适配进度。
- **可观测性将获得原生支持**：[#52061](https://github.com/vllm-project/vllm/pull/52061) 新增前向指标（FPM）管线，未来可逐步替代外部 custom scheduler 实现生产级 per-iteration 观测。
- **RL 生命周期管理正在完善**：[#51316](https://github.com/vllm-project/vllm/pull/51316) 在 Rust frontend gRPC Control 服务中新增 pause/resume/sleep/wake 与权重传输控制 RPC，对构建 RL 训练/推理基础设施的团队是重要信号。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-14

## 1. 今日速览

SGLang 团队近期工作重心集中在两条主线：一是 **DeepSeek V4 在 NVIDIA 平台（SM100/SM103）的 TRT-LLM Attention 集成**（PR #30805）持续推进，配套性能追踪 issue #33636 保持活跃；二是 **面向 Agentic/RAG 工作负载的 KV Cache 复用方案**成为社区讨论热点，多个 RFC（#30928、#27574）与 decode-side radix cache 的 PR（#27770）同步推进。稳定性方面，今日新增多个 DSpark 相关 Bug 报告（含多节点 NCCL 死锁、CUDA Graph 几何不匹配），其中性能问题已有对应 fix PR（#34782）。

## 2. 版本发布与破坏性变更

无新版本发布。当前已进入 PD 分离架构下的协议统一阶段，跟踪 issue #34510（基于 RFC #33861）已开始实施，涉及 **`sgl-model-gateway`（Rust 路由器）与 Python `protocol.py` 之间工具类型解析同步**问题——当前 v0.3.2 网关会拒绝 `type: "custom"` 的工具，破坏 OpenAI Codex CLI 等客户端（Issue #30781，暂无 fix PR）。建议关注此问题对 API 网关层的影响。

## 3. 新模型与硬件支持

- **Kimi K3 Roadmap**：#32607 保持活跃，Day0 支持博客已发布，Bug Tracking 见 #32970
- **DeepSeek V4 + TRT-LLM Attention for SM100/103**：PR #30805 仍在推进中，标记为 high priority + release-highlight
- **AMD 侧新增 AITER HIP 后端，支持 gfx950 上 packed GDN decode**（PR #33113），MI355X 延迟降低约 13–23%；ROCm 上的 Online MXFP4 量化（NVFP4 → MXFP4 在线重量化）继续推进（PR #29328）
- **AMD CI 调度调整**：恢复 gfx942/MI30x 上的 Grok-1 INT4 和 Grok-2 调度（#34761），仅移除 Grok-1 FP8

## 4. 性能与优化

已落地/有明确数字的优化：

- **Fix: SWA KV 页面释放路径去除设备同步**（PR #34783）：在 chunk cache 路径上跳过 data-dependent device dedup/filter，输出吞吐 **+4.9%**
- **Fix: DSpark draft H2D 拷贝改为非阻塞**（PR #34782）：每个 decode step 消除约 21 次 `cudaStreamSynchronize`，总计 71.4ms（step 时长占比约 42%）
- **DCP 下统一 A2A pack/unpack 内核**（PR #34651）：合并 pynccl 与 FlashInfer MNNVL 的 pack kernel，每层每 decode step 省去 4 次物化拷贝与 zero-fill

进行中的优化方向：

- DeepSeek V4 性能追踪（#33636）：FlashInfer MNNVL 已完成，TRT-LLM Attention 集成中
- 是否将 LM head GEMM 输出改为 FP32（#33627，讨论中）
- trtllm allreduce 融合是否应采用 FP32 累加（#34603）
- FA3 后端在 H20 上 MLA page-size 64 性能较慢（#31310）

## 5. 稳定性与回归

按严重程度排列：

**严重（多节点/系统级）**

- **多节点 TP rank-divergence 死锁**（#33289）：DeepSeek-V4 + DSpark 在 2×DGX Spark（GB10）、TP=2 下，NCCL proxy append 停滞 + 请求广播侧 idle，无 fix PR
- **NVFP4 trtllm MoE（GLM-5.1, GB300, PD-prefill）在 DP-attention forward_idle 中系统性 CUDA illegal memory access**（#27987，已关闭但仍需关注）
- **AMD MI355 HiCache 在 Agentic 工作负载下性能异常**（#34611，无 fix PR）

**中等（正确性/挂起）**

- **Mamba 状态捐赠在 DCP 下错位**（PR #34760，明确标注 DO NOT MERGE）：Kimi-K3（69 KDA + 24 MLA）在 `--dcp-size > 1` + mamba radix cache 下，前缀恢复后 logits **确定性错误**
- **DSpark mask-filling draft 约定未适配**（#33831）：DFlash-style draft head 与当前 autoregressive 假设的 verify window 不匹配，支持进行中

**轻度（功能异常）**

- **GPT-OSS + require_reasoning + json_schema 产出畸形 Harmony**（#31019，无 fix PR）
- **sgl-model-gateway 拒绝 custom 工具类型**（#30781）——影响 OpenAI Codex CLI 兼容性
- **Paged KV allocator 在检查 OOM 前启动分配内核**（#34399）
- **Muse Glimmer 工具调用解析**：`tool_choice="required"`/命名工具时错误路由到 `JsonArrayParser`（PR #34781，修复中）
- **CUDA Coredump Tracker**（#26340）：233 条评论，持续自动收集 PR 测试中的 coredump，建议关注与自身硬件相关的条目

## 6. 对应用开发者的意义

- **Agentic/RAG 工作负载的 KV Cache 复用正在从"字节相同 + 偏移一致"的 RadixAttention 走向 position-independent**（RFC #30928）。对构建长对话 Agent 的开发者，未来前缀命中率会显著提升，但要留意目前处于 RFC 阶段，短期行为不变
- **若你的 Agent 依赖工具调用，`sgl-model-gateway` 对 `type: "custom"` 的拒绝是一个实际问题**（#30781）——如果使用 Codex CLI 或自定义工具类型，建议跟踪该 issue 或暂时绕过 Rust 网关
- **Qwen3.5 GDN + 投机解码在 XPU 上存在崩溃**（#34720），`causal_conv1d_update_xpu()` 收到未知参数 `intermediate_conv_window`，XPU 用户升级前需确认版本兼容性
- **DeepSeek-V4 + DSpark 多节点部署稳定性仍有风险**——NCCL 死锁与 H2D 同步问题虽已有 perf fix（#34782），但多节点 TP 场景建议等待进一步验证再上生产

---

> 数据范围说明：Issue 数据基于过去 24 小时更新的 48 条 issue（Top 30）、PR 数据基于过去 24 小时更新的 468 条 PR（Top 20）。部分 PR 评论数未标注，按创建/更新时间筛选。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 — 2026-08-14

**数据来源**：github.com/ggml-org/llama.cpp（近 24 小时动态）

## 今日速览

过去 24 小时项目活跃度极高：67 个 Issue、128 个 PR 更新，并连续发布 b10411–b10423 多个版本。核心变化包括 CPU 参数跨工具统一（b10423）、Metal 新增 TQ2_0 量化（b10414）、OpenVINO 支持 Qwen3.5/MXFP4（b10419）、SYCL 引入 host pinned memory（b10418）。稳定性方面，`--cpu-mask` 失效（[#26997](https://github.com/ggml-org/llama.cpp/issues/26997)）已随 b10423 修复，chat-template O(N²)（[#26974](https://github.com/ggml-org/llama.cpp/issues/26974)）已有修复 PR 待合入。

## 版本发布与破坏性变更

未发现硬性破坏性变更，但以下行为变化值得注意：

- **b10423**：CPU 参数（`--cpu-mask`/`--cpu-range`/`--prio`）从 completion 工具扩展到所有 CLI/server 工具，修复 [#26997](https://github.com/ggml-org/llama.cpp/issues/26997)。已有 CPU 绑核脚本需重新验证行为。[PR #27026](https://github.com/ggml-org/llama.cpp/pull/27026)
- **b10413**：spec 推理自动读取本地 draft GGUF 元数据识别 draft 类型，`--spec-type` 变为可选。[PR #26814](https://github.com/ggml-org/llama.cpp/pull/26814)
- **b10416**：`index.html` 从 immutable 缓存改为 ETag 重新验证，WebUI 不再被旧构建钉住。[PR #27006](https://github.com/ggml-org/llama.cpp/pull/27006)
- 其余版本：b10419（OpenVINO）、b10418（SYCL）、b10414（Metal TQ2_0）、b10417（LFM2 工具调用修复）、b10415（MTP 自动检测）、b10412（spec 后端采样）、b10411（CPU FA 向量化）。

## 新模型与硬件支持

- **已落地**：
  - Metal 后端支持 TQ2_0（2-bit 三元量化）。[PR #26980](https://github.com/ggml-org/llama.cpp/pull/26980)
  - OpenVINO 新增 Qwen3.5 MoE 与 MXFP4 支持。[PR #26952](https://github.com/ggml-org/llama.cpp/pull/26952)
  - SYCL 支持 host pinned memory，加速 Host→Device 拷贝。[PR #26789](https://github.com/ggml-org/llama.cpp/pull/26789)
- **进行中/待合入**：
  - Kimi-K3 文本模型（KDA+MLA 混合注意力、latent MoE）。[PR #26185](https://github.com/ggml-org/llama.cpp/pull/26185)
  - MiniMax-Text-01 / MiniMax-M1（lightning attention）。[PR #27018](https://github.com/ggml-org/llama.cpp/pull/27018)
  - LFM2/LFM2MOE 支持 `--split-mode tensor`。[PR #26993](https://github.com/ggml-org/llama.cpp/pull/26993)
  - EAGLE-3 转换脚本读取 `eagle_config` 嵌套 aux layer ids。[PR #27040](https://github.com/ggml-org/llama.cpp/pull/27040)（closed）

## 性能与优化

- **已落地**：
  - CPU：flash-attention V-cache F16→F32 转换向量化，提升 prefill 吞吐。[PR #26947](https://github.com/ggml-org/llama.cpp/pull/26947)
  - SYCL：host pinned memory 降低 H2D 传输延迟。[PR #26789](https://github.com/ggml-org/llama.cpp/pull/26789)
  - Metal：TQ2_0 的 mul_mv 内核以浮点替代整数运算并预计算 scale。[PR #26980](https://github.com/ggml-org/llama.cpp/pull/26980)
  - OpenVINO：内存优化（含 test-recurrent-state-rollback）。[PR #26952](https://github.com/ggml-org/llama.cpp/pull/26952)
  - spec：dflash/dspark 启用后端采样，支持 `p_min>0`。[PR #26958](https://github.com/ggml-org/llama.cpp/pull/26958)
- **进行中（PR）**：
  - Hexagon FA：修复非确定性 FLASH_ATTN_EXT、降低 VTCM 占用。[PR #27042](https://github.com/ggml-org/llama.cpp/pull/27042)
  - Windows：混合 CPU 线程调度优化（E-core 过滤、核心亲和）。[PR #27033](https://github.com/ggml-org/llama.cpp/pull/27033)
  - OpenCL：flash-attention tile 内核增加 barrier 修复 WAR 竞争。[PR #26434](https://github.com/ggml-org/llama.cpp/pull/26434)
  - CUDA：MMQ ids-path tail padding 修复。[PR #27044](https://github.com/ggml-org/llama.cpp/pull/27044)；重复 expert id 压缩修复。[PR #26294](https://github.com/ggml-org/llama.cpp/pull/26294)

## 稳定性与回归

按严重程度排列：

1. **CUDA Blackwell（sm_120）**：Q8_0 `mul_mat_q` 共享内存越界，RTX 5090 间歇性崩溃。（[#24399](https://github.com/ggml-org/llama.cpp/issues/24399)，closed）
2. **Vulkan DeviceLost**：Strix Halo + DeepSeek-V4-Flash 数轮后崩溃（[#25664](https://github.com/ggml-org/llama.cpp/issues/25664)，open）；AMD APU gfx90c GPU job 超时（[#21724](https://github.com/ggml-org/llama.cpp/issues/21724)，closed）。
3. **SYCL 正确性**：Intel Arc 第二个 prompt 输出乱码（[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)，open）；MTP 无加速仍待观察（[#23533](https://github.com/ggml-org/llama.cpp/issues/23533)，closed）。
4. **Gemma 4 SWA**：长上下文遗忘关键细节。（[#25751](https://github.com/ggml-org/llama.cpp/issues/25751)，open）
5. **DeepSeek-V4-Flash（Metal）**：长 agentic chat 退化为重复并泄漏特殊 token。（[#26694](https://github.com/ggml-org/llama.cpp/issues/26694)，open）
6. **DFlash drafter 绑定失败**：`vector::_M_range_check`，当 target GGUF 将 `sliding_window_pattern` 编码为数组时触发。（[#26894](https://github.com/ggml-org/llama.cpp/issues/26894)，open）
7. **Vulkan 性能回归**：RX 6600 近期构建性能下降（[#24066](https://github.com/ggml-org/llama.cpp/issues/24066)，stale）；MoE 解码在 9 并发时的吞吐悬崖（[#25356](https://github.com/ggml-org/llama.cpp/issues/25356)，open）。
8. **chat-template 渲染 O(N²)**：`gather_string_parts` 导致平方成本（[#26974](https://github.com/ggml-org/llama.cpp/issues/26974)，open），修复 PR [#27034](https://github.com/ggml-org/llama.cpp/pull/27034) 待合入。
9. **`--cpu-mask`/`--cpu-range`/`--cpu-strict` 被忽略**（[#26997](https://github.com/ggml-org/llama.cpp/issues/26997)，open）— 已随 b10423 修复。

## 对应用开发者的意义

- **CPU 部署更友好**：b10423 后 llama-server/llama-cli 原生支持 CPU 绑核参数，无需外部 taskset 封装。
- **可观测性提升**：[PR #27041](https://github.com/ggml-org/llama.cpp/pull/27041)（进行中）允许 decode 期间访问 `/metrics` 与 `/slots`，对网关/监控是重要改进。
- **OpenAI Responses API 兼容性**：[PR #26013](https://github.com/ggml-org/llama.cpp/pull/26013)（进行中）增加 json schema 约束与 Cohere2 MoE 模板解析，使用 Responses API 的开发者建议跟进测试。
- **已知限制**：视觉模型的 KV cache 保存/加载仍不可用（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)），多模态应用需绕开 `/slots?action=save`。
- **新量化选项**：Apple Silicon 用户可评估 TQ2_0（2-bit）在 Metal 上的显存/质量平衡。
- **风险提示**：SYCL（Intel Arc）与 Vulkan（AMD APU）后端存在乱码/DeviceLost 报告；相关修复 PR（#27042、#26434、#27044、#26294）正在合入，升级前建议保留可回退版本。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 2026-08-14

## 今日速览

今日无新版本发布，但多项修复 PR 与功能集成处于活跃状态。**MLX 结构化输出修复**（#16563）通过 #17690/#17697 两条 PR 落地，补齐了苹果芯片上的关键能力短板；**AMD Strix Halo VRAM 检测回归**（#16462）有对应修复 PR #17685，解决容器部署下显存识别错误问题。此外，Ollama Launch 生态持续扩展，新增 DeepSeek Harness（#17733）与 Muse Code（#17594）集成。

## 新模型与硬件支持

- **Nemotron 系列 MLX 视觉支持（PR #17714）**：在共享 MLX 媒体流水线上实现 RADIO 视觉编码器与投影器，支持动态分辨率预处理、确定性占位符展开与分块特征散射，并支持 MTP 偏移。同时保留源广告的视觉能力、继续抑制不支持的音频输入。
- **Windows-on-Arm CPU 性能修复（PR #17654）**：为 WoA CPU runner 设置 `GGML_CPU_ARM_ARCH`，避免回退到 baseline `armv8-a`（当前版本不包含任何点积/矩阵指令），单行修复带来显著的 CPU 推理性能收益。
- **云模型请求（Issue #17720）**：用户请求将 Qwen3.8-2.4T-A95B-FP8 加入 Pro/Max 云订阅；#17715 持续反馈 Kimi K3 上线两周仍对订阅用户不可用。

## 性能与优化

- **MLX 引擎开放生成预算上限修复（PR #17494）**：修复 MLX runner 在无 `num_ctx` 时忽略请求上下文窗口、仅受模型 `max_position_embeddings` 限制而导致大模型无限挂起的问题。
- **GPT-OSS 长上下文崩溃修复（PR #17477）**：恢复向 llama-server 显式传递 flash attention 请求，避免 `auto` 模式在部分 offload 时关闭 flash attention 导致 Q8 量化模型长上下文崩溃。
- **KV Cache 内存预测同步（PR #17615）**：对齐 Go 侧 `PredictServerVRAM` 与 GraphSize 的 KV cache 显存计算逻辑，修复 Qwen 系模型加载失败问题。
- **Windows-on-Arm 构建优化**：见上文“新模型与硬件支持”。

## 稳定性与回归

按严重程度排列：

1. **AMD Strix Halo VRAM 检测回归（Issue #16462，OPEN）**：0.30.0-rocm 起容器部署仅显示 2GB 可用 VRAM，0.24.0-rocm 及更早版本正确。影响 ROCM 容器用户。**已有修复 PR #17685**（通过 `OLLAMA_GPU_MEMORY` + iGPU 显存 carve-out 解决）。
2. **MLX 结构化输出被静默忽略（Issue #16563，OPEN）**：MLX 模型（Qwen 3.5、Gemma 4）完全忽略 JSON Schema，返回非约束文本。**已有修复 PR #17690 / #17697**（XGrammar 约束采样 + 模型级 tokenizer 元数据）。
3. **Muse Glimmer MLX 模型 token 泄漏 + 忽略 response_format（Issue #17684，CLOSED）**：`muse-glimmer:30b-mlx` 输出带 `to=user<|message|>` 控制 token 并包裹 markdown 围栏，破坏 JSON 解析；GGUF 构建正常。
4. **Claude Code 集成无响应（Issue #17671，OPEN）**：`ollama launch claude --model qwen3-coder:30b` 下 Claude Code 不显示任何响应，尽管 Ollama 侧生成成功。
5. **Ollama 0.30+ Docker 无法加载模型（Issue #17285，CLOSED）**：Ryzen 5750G Vega8 用户被迫停留在 0.24.0；已关闭但未提供根本原因说明。
6. **Gemma 4 Cloud 视觉+工具调用返回 HTTP 500（Issue #17667，CLOSED）**：`gemma4:31b-cloud` 在请求同时包含图像与工具调用时报错。
7. **`/api/chat` 静默丢弃音频字段（Issue #17730，OPEN）**：对支持音频的 `gemma4:e4b` 传入 `audios` 字段，请求返回 200 但模型未收到音频，且无任何告警。
8. **Nemotron3.5-lightning:30b 在 AMD AI395+ 上停滞（Issue #17692，OPEN）**：生成固定 token 数后卡死，通常发生在 thinking 阶段，需 Ctrl+C 中断。
9. **多文件 GGUF 导入至今未支持（Issue #5245，OPEN）**：该历史 issue 已持续两年多，仍无排期信号。
10. **Kimi K3 Cloud 订阅可用性（Issue #17715，OPEN）**：发布两周仍未对 Pro/Max 订阅者开放，社群持续施压。
11. **“Restart to update” 在 Mac 上不生效（Issue #11972，OPEN）**：非管理员账户更新流程失败，已持续约一年。

其他值得注意的 PR：
- **CRLF 行尾计数修复（#17734）**：Modelfile 解析在 Windows 上将 CRLF 计为两行，导致行号错误。
- **WriteWithBackup 碰撞问题（#17713）**：Unix 秒级时间戳命名备份文件，同秒内多次写入会冲突。

## 对应用开发者的意义

- **MLX 结构化输出即将就绪**：若你基于 MLX 模型构建依赖 JSON 输出的 Agent 应用，#16563 的修复（#17690/#17697）值得立即跟进验证；当前版本上请勿假设 `response_format` 生效。
- **Ollama Launch 成为 Agent 入口**：`ollama launch claude` 目前已被广泛使用，但存在模型识别问题（#17717：`kimi-k2.7-code:cloud` 不在 Claude Code 已知列表，退回 200k 窗口）及上下文窗口指定问题（#17584）。计划集成到 Claude Code 的团队需注意窗口截断风险。
- **云端模型稳定性的已知风险**：Gemma 4 Cloud 的视觉+工具组合（#17667）在官方修复前应避免使用；音频模型静默丢字段（#17730）意味着你需要自行校验（而非信任 HTTP 200）。
- **API 响应规范文档化（PR #17726）**：补齐 API 错误约定（状态码、错误格式、流中途错误行为），对 SDK 维护者是重要参考。
- **LLM 网关侧注意**：CLI `ParseFile` CRLF 修复（#17734）若你通过代码生成 Modelfile（尤其 Windows 环境），合并后将获得准确的行号报错，可提前规划适配。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 · 2026-08-14

## 1. 今日速览

今日更新重心在**权限一致性与 MCP 基础设施**：BerriAI 团队密集提交了 7 个围绕 team / access group / key grants 的修复 PR，集中治理“资源删除后权限残留”的问题；同时将 MCP OAuth 临时会话从 Redis/内存迁移到 DB-backed draft servers，降低多 worker 部署对 Redis 的依赖。版本侧发布了开发版 v1.98.0-dev.2。稳定性方面，Azure GPT-5.6 成本映射错误、SpendLogs `end_user` 回归以及 OTel `gen_ai.system` 泄漏等新老问题被集中曝光。

## 2. 版本发布与破坏性变更

- **v1.98.0-dev.2**（开发版）发布。该版本重点在发布流程说明：所有 Docker 镜像均以 cosign 签名，并补充了签名验证指引。未发现配置/API 破坏性变更。  
  [Release](https://github.com/BerriAI/litellm/releases/tag/v1.98.0-dev.2)

## 3. 新模型与硬件支持

今日无新增模型或硬件后端。值得留意的是：

- Xiaomi MiMo-V2 系列经 Claude Code 调用时，`output_config` 参数会导致 `AsyncCompletions.create()` 失败（Issue #24549），已在跟踪中。  
  [Issue #24549](https://github.com/BerriAI/litellm/issues/24549)
- Bedrock GPT-5.5（Mantle 平台）此前已实现 Chat Completions→Response API 自动转换（#30941，已关闭），是当前较新的模型适配路径。  
  [Issue #30941](https://github.com/BerriAI/litellm/issues/30941)

## 4. 性能与优化

今日没有合并吞吐/延迟层面的性能优化。可观测性侧有一个实用改进：Playground Chat 的响应指标将直接展示 provider prompt cache tokens（PR #36827），帮助验证 prompt caching 是否在真实链路上生效——这对降低长上下文请求的成本与延迟至关重要。  
[PR #36827](https://github.com/BerriAI/litellm/pull/36827)

## 5. 稳定性与回归

按严重程度排列（标注是否已有 fix PR）：

- **[严重] Redis Cluster 环境响应串线 / Cross-talk**：多个用户共享 Redis Cluster 时，响应偶尔被返还给错误的客户端（Issue #25447）。该 issue 今日被标记 CLOSED，若现网仍在使用 Redis Cluster 建议确认关闭原因与修复版本。  
  [Issue #25447](https://github.com/BerriAI/litellm/issues/25447)

- **[高] Azure GPT-5.6 Terra/Luna 成本映射错误**：`azure/gpt-5.6-terra` 与 `azure/gpt-5.6-luna` 等模型仍沿用 OpenAI 直连价格，Azure 从未执行 2026-07-30 的降价，直接导致成本核算偏差。暂无 fix PR。  
  [Issue #36192](https://github.com/BerriAI/litellm/issues/36192)

- **[高] `end_user` 回归**：v1.87.0 起，多个请求共享同一个虚拟密钥、携带不同 `user` 字段时，SpendLogs 的 `end_user` 列被固定为首个请求的 `user`，影响用量审计与计费拆分。暂无 fix PR。  
  [Issue #31441](https://github.com/BerriAI/litellm/issues/31441)

- **[中] OTel exporter 仍收到 `gen_ai.system=None`**：PR #26713 只修复了 span-attribute 调用点，metrics/events 路径仍会向 exporter 发送非法类型值，可能触发 span 被拒（Issue #36759）。  
  [Issue #36759](https://github.com/BerriAI/litellm/issues/36759)

- **[中] Anthropic passthrough 流式无字节 + Responses 日志状态**：大上下文请求在预流式处理阶段不向客户端发送任何字节，易触发 no-progress 超时（#32491，已关闭）；另有一例 Responses API 流式日志将内部流误记为非流式并漏掉成本跟踪，已有 fix PR #36761。  
  [Issue #32491](https://github.com/BerriAI/litellm/issues/32491) · [PR #36761](https://github.com/BerriAI/litellm/pull/36761)

- **[中] Usage 面板“Ask AI”对所有可选模型失败**：`ai_usage_chat.py` 直接调用 `litellm.acompletion(model=<alias>)`，绕过 Router，导致模型组/别名无法解析（#35461、#24513）。  
  [Issue #35461](https://github.com/BerriAI/litellm/issues/35461) · [Issue #24513](https://github.com/BerriAI/litellm/issues/24513)

- **[中] OpenAPI→MCP 工具生成丢失请求体 schema**：当 request body 为 `$ref` 引用时（FastAPI/Pydantic 生成的 spec 均如此），产出的工具 `inputSchema` 缺失全部字段定义，LLM 拿不到任何入参信息（Issue #36765）。  
  [Issue #36765](https://github.com/BerriAI/litellm/issues/36765)

- **[中] Claude prompt-cache 前缀失效**：`AnthropicMessagesConfig._normalize_system_role_messages` 将对话中途的 system 消息提升到顶层，使整个 prompt-cache 前缀失效，缓存命中率下降、成本上升（Issue #36559）。  
  [Issue #36559](https://github.com/BerriAI/litellm/issues/36559)

- **[低/安全] 429 响应泄漏令牌哈希**：parallel request limiter 返回的 429 JSON 中包含完整 64 位 SHA-256 虚拟密钥哈希，建议在公开日志/监控链路中留意（Issue #27884）。  
  [Issue #27884](https://github.com/BerriAI/litellm/issues/27884)

## 6. 对应用开发者的意义

- **权限边界更严格**：今天多个 fix PR 修正了团队删除后残留引用、访问组删除后密钥仍持有模型权限、team 回退意外扩大模型访问范围、`lite login` 令牌不携带 team grants 等问题（#36819、#36825、#36826、#36837、#36839、#36840、#36843）。对构建多租户网关的开发者，升级后权限模型会更接近“最小授权”预期。  
  [PR #36819](https://github.com/BerriAI/litellm/pull/36819) · [PR #36837](https://github.com/BerriAI/litellm/pull/36837) · [PR #36840](https://github.com/BerriAI/litellm/pull/36840) 等

- **MCP 多 worker 部署简化**：MCP OAuth 临时会话从 Redis/内存迁移到 DB-backed draft servers（#32260、#36844），多 worker 或副本部署不再强依赖 Redis，也解决了 `Authorize & Fetch Token` 随机 404 的问题。另外新增管理员清除并重新授权某 MCP server OAuth token 的能力（#36831）。  
  [PR #36844](https://github.com/BerriAI/litellm/pull/36844) · [PR #32260](https://github.com/BerriAI/litellm/pull/32260) · [PR #36831](https://github.com/BerriAI/litellm/pull/36831)

- **新增 `lite pi` CLI 命令**：与 `lite claude` / `lite codex` 对齐，开发者可通过代理直接运行 pi coding agent，无需手动铸造虚拟密钥（PR #36841）。  
  [PR #36841](https://github.com/BerriAI/litellm/pull/36841)

- **UI/可观测性改进**：Guardrails Monitor 迁移到 shadcn（#36838）；Auto-Router 新增 Shadow Evals 操作页，从 API-only 变成可视化界面（#36588）；Playground 直接展示 prompt cache token 用量（#36827）。  
  [PR #36838](https://github.com/BerriAI/litellm/pull/36838) · [PR #36588](https://github.com/BerriAI/litellm/pull/36588)

- **部署稳定性**：PR #36824 修复了多副本在全新数据库启动时 concurrent view 创建导致启动崩溃的问题（已关闭），大规模横向扩容部署建议纳入。  
  [PR #36824](https://github.com/BerriAI/litellm/pull/36824)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

```markdown
# Unsloth 动态日报 2026-08-14

## 今日速览

- **v0.1.702-beta 发布**，Unsloth Desktop 正式上线，成为首个可在 Windows / macOS / Linux 上本地运行与训练模型的桌面应用。
- **桌面版首日迎来大量环境适配 Bug**：Windows 安装器超时、AMD GPU 识别失败、macOS 二次启动崩溃等问题集中上报。
- **社区对 DeepReinforce Ornith-1.0 支持请求热度最高**（23 👍），是目前最受关注的模型支持需求。

---

## 版本发布与破坏性变更

- **[v0.1.702-beta](https://github.com/unslothai/unsloth/releases)**：随版本推出 **Unsloth Desktop**，统一本地推理、训练与导出流程；同时为所有外部 Provider 增加 tool calling / web search 能力。
  - 桌面版为新增分发形态，引入安装器、权限模型、自动更新等概念；从 Python 包迁移至 Desktop 的开发者需注意安装路径与运行环境差异（见下文稳定性问题）。
  - 尚无明确破坏性变更，但关闭的 #8663 显示外部 API 网关开始暴露认证兼容性问题。

---

## 新模型与硬件支持

- **Ornith-1.0（DeepReinforce）支持请求**：[#6721](https://github.com/unslothai/unsloth/issues/6721)（23 👍，OPEN）— 社区期望获得 Unsloth 优化变体或至少显式兼容支持，目前尚无官方回应。
- **MiniMax-H3 兼容性缺口**：
  - [#8507](https://github.com/unslothai/unsloth/issues/8507)（CLOSED）— `stable-diffusion.cpp` 版本过旧，不识别 MiniMax-H3 checkpoint。
  - [#8666](https://github.com/unslothai/unsloth/issues/8666)（OPEN）— 视频生成场景下 Qwen3VL 文本编码器权重加载失败，`sd-cli exited -6`。
- **桌面版硬件识别**：
  - [#8529](https://github.com/unslothai/unsloth/issues/8529)（OPEN，10 评论）— AMD RX 5700XT 在 Unsloth Desktop 中无法被识别。
  - [#8651](https://github.com/unslothai/unsloth/issues/8651)（CLOSED）— Strix Halo（gfx1151）上 `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` 导致 GPU offload 失效。

---

## 性能与优化

本日无独立性能优化条目落地。但以下两个 PR 涉及显存 / 内存行为，值得关注：

- **[#8709](https://github.com/unslothai/unsloth/pull/8709)（OPEN）**：Metal 上不再以 native context 启动 llama-server——此前 `-c 0` 会被解析为 `UINT32_MAX`，导致上下文无法被 `--fit` 缩减，容易在 Apple Silicon 上耗尽内存。该修复直接影响 macOS 端的显存占用与可运行模型上限。
- **[#8439](https://github.com/unslothai/unsloth/pull/8439)（OPEN）**：Kaggle 环境使用 large overlay 保存，并阻止无法容纳的 GGUF 导出，避免训练中途磁盘写满。更多是稳定性而非性能，但可改善长时间训练的可完成性。

---

## 稳定性与回归

桌面版首日 Bug 集中，按严重程度排序如下：

| 严重度 | Issue | 状态 | 摘要 | 相关 PR |
|---|---|---|---|---|
| 🔴 高 | [#8698](https://github.com/unslothai/unsloth/issues/8698) | OPEN | Windows 安装因下载 cu126 PyTorch 超过 2 小时无进度输出被杀掉 | — |
| 🔴 高 | [#8546](https://github.com/unslothai/unsloth/issues/8546) | OPEN | Windows 安装无法正常完成（下载约 7 评论，关联 #8698） | — |
| 🔴 高 | [#8508](https://github.com/unslothai/unsloth/issues/8508) | OPEN | Windows + AMD GPU 安装失败 | — |
| 🟠 中 | [#8610](https://github.com/unslothai/unsloth/issues/8610) | OPEN | macOS 二次启动报错 | — |
| 🟠 中 | [#8566](https://github.com/unslothai/unsloth/issues/8566) | OPEN | macOS M4：llama-server 启动失败 + 空闲 RAM 占用异常偏高 | [#8709](https://github.com/unslothai/unsloth/pull/8709) |
| 🟠 中 | [#8483](https://github.com/unslothai/unsloth/issues/8483) | OPEN | Deep Research 在“Writing The Report”阶段冻结，无法统计 token 用量 | — |
| 🟠 中 | [#8717](https://github.com/unslothai/unsloth/issues/8717) | OPEN | 训练后保存 GGUF 强制要求 16bit 中间权重，需额外下载 40GB+，体验明显回归 | [#8439](https://github.com/unslothai/unsloth/pull/8439)（部分解决） |
| 🟡 低 | [#8663](https://github.com/unslothai/unsloth/issues/8663) | CLOSED | Claude Code 通过 `x-api-key` 认证，但 Unsloth API 只接受 `Authorization: Bearer`，全部 401 | — |
| 🟡 低 | [#8523](https://github.com/unslothai/unsloth/issues/8523) | CLOSED | Windows EDR（端点检测响应）阻止 `unsloth.exe` 执行 | — |
| 🟡 低 | [#8748](https://github.com/unslothai/unsloth/issues/8748) | OPEN | 桌面版已安装的 MLX 模型不出现在 `/v1/models`，API 无法自动切换 | — |

**已合入/可用的修复 PR**：

- [#8524](https://github.com/unslothai/unsloth/pull/8524)：GGUF 嵌入模型启动时加 `--embedding`，修复 `/v1/embeddings` 返回 501。
- [#8645](https://github.com/unslothai/unsloth/pull/8645)：修复图片/视频生成忽略用户 GPU 选择、硬编码 CUDA 0 的问题。
- [#8740](https://github.com/unslothai/unsloth/pull/8740)：修复 Backend CI 因 trainer 重 import 导致的 collection 失败，恢复四个 Python 版本矩阵测试。
- [#8628](https://github.com/unslothai/unsloth/pull/8628)：修复工具调用审批卡片迟滞——Tauri webview 会暂存小块 SSE，新增 keepalive 强制刷新。

---

## 对应用开发者的意义

- **桌面版成为新的本地部署形态**：Unsloth Desktop 内置模型推理/训练能力，并支持 Cloudflare Tunnel 对外暴露 API。但默认仅监听 `127.0.0.1`，目前社区已在 [#8578](https://github.com/unslothai/unsloth/issues/8578) 请求 `0.0.0.0` 绑定，局域网内直接调用尚不可行。
- **API 兼容性需要绕过两个坑**：
  - 认证仅支持 `Authorization: Bearer`，不兼容 Anthropic 官方 CLI 的 `x-api-key` 头（[#8663](https://github.com/unslothai/unsloth/issues/8663)）。构建 Claude Code 集成的开发者需要前置代理转换认证头。
  - `/v1/embeddings` 此前对 GGUF 返回 501，已由 [#8524](https://github.com/unslothai/unsloth/pull/8524) 修复，建议升级后复测。
- **Agent / 工具调用能力有实质更新**：v0.1.702-beta 为所有外部 Provider 启用了 tool calling 与 web search，意味着开发者可通过 Unsloth 网关统一调度本地与云端模型的工具调用。但本地远程模型场景（[#7282](https://github.com/unslothai/unsloth/issues/7282)，CLOSED）和工具调用污染对话历史（[#8734](https://github.com/unslothai/unsloth/issues/8734)，OPEN）仍需关注。
- **GGUF 导出链出现临时回归**：[#8717](https://github.com/unslothai/unsloth/issues/8717) 反馈当前导出流程强制要求先存 16bit 权重（可达 40GB+）。若使用 Unsloth 训练后直接做 GGUF 量化，建议暂缓升级并关注 [#8439](https://github.com/unslothai/unsloth/pull/8439) 的落地状态。
```

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*