# AI 基础设施日报 2026-08-13

> 生成时间: 2026-08-13 09:48 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告 · 2026-08-13

## 1. 生态全景

当前推理生态正处于"大模型换代阵痛期"：DeepSeek V4、Kimi-K3、Qwen3.5/3.6、Gemma 4 等新模型集中落地，各引擎在快速迭代中普遍出现回归——vLLM 0.27.0 曝出引擎永久 stall、Gemma4 无法启动等阻断问题，SGLang 的 DSpark 链路出现死锁与跨请求泄漏，Ollama 0.32.8 出现空响应回归。推测解码（MTP/DFlash/DSpark）被三大引擎视为性能突破口，但非法内存访问、活锁、"高接受率但端到端更慢"的性能倒挂频发，工程成熟度明显不足。硬件侧，ROCm/MI350、Intel SYCL/XPU、NPU、Apple MLX 均获得实质性优化而非"仅能运行"，多后端支持已从加分项变为入场券。成本计量准确性与多租户数据隔离问题（LiteLLM 超计 4-7 倍、SGLang 跨请求泄漏、Unsloth 上下文串线）同日集中爆发，标志行业关注点正从"跑得动"转向"算得准、隔得开"。

## 2. 各项目活跃度对比

| 项目 | 今日涉及 Issues | 今日涉及 PRs | Release 情况 | 社区焦点 |
|---|---|---|---|---|
| vLLM | ~28 | ~15 | 无（v0.27.0 回归集中报告期） | 升级回归防御、推测解码崩溃、ROCm/XPU 适配 |
| SGLang | ~16 | ~15 | 无 | DSpark 死锁/数据泄漏、扩散模型 JIT 融合、Kimi-K3 路线图 |
| llama.cpp | ~13 | ~14 | b10405 / b10400 / b10375（3 个） | HIP 构建正确性修复、SYCL 后端密集优化 |
| Ollama | ~12 | ~12（含 3 个重复备份修复） | v0.32.10-rc1 | Claude Code 集成、repeat_penalty 默认变更、MLX 提速 |
| LiteLLM | ~10（2 个高严重度已关闭） | 4 个新 PR；整体 280 条更新 | 无 | 成本计量修正、reasoning 参数透传 |
| Unsloth | ~13 | ~12 | 无（桌面版仍 0.1.701-beta） | 桌面端 Windows/macOS 兼容、AMD 支持边界收窄 |

**注**：Issue/PR 数为本次日报中提及的具体条目，非全量数据。活跃度上 vLLM 与 SGLang 在问题讨论深度和 PR 密度上领先；llama.cpp 以高频小版本迭代（单日 3 个 release）形成独特节奏。

## 3. 模型支持竞速

| 项目 | 新模型/架构进展 | 状态 |
|---|---|---|
| **vLLM** | Muse Glimmer 29.6B VLM 完整支持（ViT-G/14、128K 上下文、ATEM 工具解析、DFlash SD） | PR #51655 |
| **vLLM** | Hunyuan A13B 工具解析器（Rust 前端） | PR #52133 |
| **SGLang** | Kimi-K3 全栈支持 roadmap（Day0 PR、Cookbook、gfx950 MLA FP8 decode） | Issue #32607 推进中 |
| **SGLang** | DeepSeek-V4 性能跟踪（SM90/SM100/SM103，FlashInfer MN 已集成） | Issue #33636 |
| **llama.cpp** | Maple 20B-A1B 三元 MoE（24 层/256 专家，CPU only） | PR #27000 draft |
| **Ollama** | NemotronH MLX vision（RADIO 编码器 + projector） | PR #17714 进行中 |
| **Ollama** | Qwen3.8-2.4T-A95B-FP8 云模型 | 社区请求，未排期 |
| **Unsloth** | DeepReinforce Ornith-1.0（23 👍）、Ling 3.0 | 社区请求，未排期 |

**结论**：生产级新模型支持速度 vLLM 领先（当日即有 2 个新模型/工具 PR 落地），SGLang 在 Kimi-K3/DeepSeek-V4 的 roadmap 深度上紧追；llama.cpp 凭借轻量架构在新奇模型（三元 MoE）探索上保持灵活；Ollama 与 Unsloth 的模型支持主要依赖上游 llama.cpp，自身差异化在集成体验而非模型首发。

## 4. 性能优化前沿

| 优化方向 | 代表进展 | 量化收益 |
|---|---|---|
| **KV cache / decode** | llama.cpp TILE kernel 量化 KV decode（q4_0/q8_0） | Battlemage 上解码吞吐 **+42%~+169%**，零回归 |
| **KV cache / decode** | vLLM Unified Attention TD 路径张量描述符外提 | 减少 `tensormap_create` 调用，利于 pipeliner 预取 |
| **量化 kernel** | vLLM bpreshuffled blockscaled FP8 GEMM（ROCm） | MI350 上 TP8+DPA **+4-8% QPS**，TP8+EP **+0-4% QPS** |
| **量化 kernel** | Ollama NVFP4 MLX prefill 优化 | prefill **+7-8%** |
| **算子融合 / JIT** | SGLang 扩散模型三连 PR（FLUX.2 AdaLN、HunyuanVideo QKV packing、ERNIE QKNorm） | 均为 bit-exact 无损加速 |
| **算子融合 / JIT** | SGLang `moe_topk_softmax` AOT→JIT 迁移 | 单 kernel .so 体积 **1.7GB → 380KB** |
| **CPU 优化** | llama.cpp Flash-Attention V-cache F16→F32 向量化（F16C 指令） | qwen3:4b prefill **+17-31%** |
| **推测解码** | llama.cpp DFlash 后端采样落地；vLLM speculator 缓冲区激进清零（H100 w8a8_fp8 崩溃修复） | 可靠性修复为主，收益尚未稳定 |

**观察**：优化火力集中在四个方向——① 量化 KV cache 与 decode kernel（直接降低显存带宽瓶颈）；② 算子融合/JIT 化（SGLang 在扩散模型上进度领先）；③ 硬件特化 kernel（AMD FP8 GEMM、Intel ESIMD/TILE、Apple NVFP4）；④ 推测解码工程化（仍处投入期，回报不稳）。值得注意的是，SGLang 对扩散模型（FLUX.2、HunyuanVideo、ERNIE）的集中优化，预示多模态生成正成为推理引擎的下一个主战场。

## 5. 分层定位差异

| 层级 | 项目 | 核心定位 | 今日动态揭示的差异化 |
|---|---|---|---|
| **生产级推理引擎** | vLLM | GPU 集群高吞吐服务，多模型覆盖广 | 受 0.27.0 回归拖累，重心在"止血"；新模型支持仍最全 |
| **生产级推理引擎** | SGLang | 性能创新驱动，激进采用新 kernel/策略 | DSpark/扩散模型优化积极，但正确性风险更高 |
| **本地/边缘运行时** | llama.cpp | 底层 kernel 优化源头，GGUF 生态事实标准 | HIP 正确性修复 + SYCL 优化潮，多硬件覆盖最深 |
| **本地/边缘运行时** | Ollama | llama.cpp 的产品化封装，面向个人/小团队 | 重心转向 MLX/vision/Claude Code 集成，差异化在 UX |
| **网关/代理** | LiteLLM | 多 provider 路由、计费、治理，不涉推理 | 成本计量修正是其核心价值；模型迭代影响最小 |
| **微调/训练** | Unsloth | 微调效率 + 桌面端部署，与推理引擎互补 | 瓶颈在平台兼容性（Windows/AMD/macOS）而非模型性能 |

**关键洞察**：vLLM 与 SGLang 的正面竞争加剧——同日分别围绕 Kimi-K3/DeepSeek-V4 展开支持竞赛，且都在推测解码上投入大量精力但都未成熟；llama.cpp 向上游输出 SYCL/HIP/CPU 等底层优化能力，Ollama 和 Unsloth 本质是"llama.cpp 的两种产品化路径"（通用部署 vs 微调服务）；LiteLLM 作为唯一的网关层项目，受模型迭代冲击最小，但成本数据可信度问题正制约其作为"计费事实来源"的可靠性。

## 6. 值得关注的趋势信号

**① 推测解码进入"马拉松式"工程化阶段，短期不宜押注**
vLLM、SGLang、llama.cpp 三家同时投入 MTP/DFlash/DSpark，但今日合计出现 8+ 个相关崩溃/死锁/性能倒挂问题，且多数无修复 PR。Qwen3.5 原生 MTP 在 82-88% 接受率下仍慢于 baseline，说明端到端收益远未兑现。

**② 成本计量准确性成为网关层竞争焦点**
LiteLLM 两个核心修复（Bedrock cache token 4-7 倍超计、Anthropic 流式 usage 恒为 0）若合入，依赖其计费数据的预算告警体系需全面重新校准。当前基于这些数据的成本分析应打折看待。

**③ 多租户数据隔离风险集中暴露**
SGLang Kimi-K3 跨请求 prompt 泄漏（安全相关）、LiteLLM Redis 响应串线（已修复）、Unsloth 上下文跨会话泄漏——三个不同分层同日出现同类问题。多租户生产环境必须在应用层强制会话隔离，不能依赖引擎侧保证。

**④ 多模态/扩散模型进入服务化主航道**
SGLang 单日提交 3 个扩散模型 bit-exact 融合 PR（FLUX.2、HunyuanVideo、ERNIE），vLLM 新增 Muse Glimmer VLM——"能跑"已是过去式，"bit-exact 无损加速"才是新门槛。

**⑤ 硬件多元化进入"深水区"而非"能跑就行"**
AMD MI350 获 +4-8% QPS 的 FP8 GEMM 优化，Intel Battlemage 获 +42-169% 解码加速，NPU 上 LTX-2 推理优化落地——各硬件平台开始出现专属的深度优化，而非仅做 CUDA 等价移植。

**⑥ Agent 工具链成为全栈必选项**
vLLM 补 Rust 前端工具解析、Ollama 修工具调用参数兼容、llama.cpp 处理 grammar 限制、LiteLLM 透传 reasoning 参数——每个分层都在为 Agent 应用补齐工具调用与结构化输出能力。**注意 vLLM 中 MTP + xgrammar 组合可触发引擎活锁（100% CPU）**，Agent 场景若同时使用结构化输出和推测解码，需专项验证。

### 对技术决策者的行动建议

| 决策场景 | 建议 |
|---|---|
| 生产环境升级 vLLM | 暂留 0.26.x，避免 0.27.0（stall/加载失败/Gemma4 启动失败均无补丁） |
| 依赖推测解码提升吞吐 | 默认关闭或限制 num_speculative_tokens ≤ 3；接受率不是唯一指标 |
| 使用 SGLang 服务 Kimi-K3 | 立即排查是否受影响于跨请求泄漏（#34259）；避免 2 节点 DSpark |
| 基于 LiteLLM 做成本预算 | 在 #34498/#32477 合入前，对缓存用量数据打折处理 |
| 多租户 / Agent 生产系统 | 应用层强制会话隔离；工具调用 + 推测解码组合单独压测 |
| AMD/Intel 硬件选型 | ROCm 路径避开 RDNA1 及以下（Unsloth 已明确不支持）；Intel 平台关注 SYCL 后续合入 |

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 · 2026-08-13

## 今日速览

今日社区焦点集中在 **v0.27.0 的升级回归**（Gemma4 启动失败、DeepSeek V4 Flash 加载错误、4 节点 TP=4 空闲后永久 stall）以及 **推测解码（MTP/DFlash）相关的非法内存访问与性能劣化**，目前多数问题尚无对应修复 PR。硬件侧，ROCm 有新的 FP8 GEMM 性能优化落地；新模型支持方面，Muse Glimmer 与 Hunyuan A13B 工具解析均已提交 PR。

## 版本发布与破坏性变更

无新 Release。但 v0.27.0 被多个 Issue 指向存在回归风险，升级前建议充分验证：

- **vLLM v0.27.0 引擎在 4 节点 TP=4（GB10/aarch64）空闲约 1 分钟后永久 stall**，请求不再进入调度器（`num_requests_running` 保持 0），API 仍响应 `/v1/models`。尚无修复 PR。[Issue #51921](https://github.com/vllm-project/vllm/issues/51921)
- **升级 0.26.0 → 0.27.0 后 DeepSeek V4 加载报错**（flash error），影响生产部署，暂无补丁。[Issue #51758](https://github.com/vllm-project/vllm/issues/51758)
- **`vllm/vllm-openai:latest`（0.27.0）搭配 Transformers 5.15.0 无法启动 Gemma4**（NVFP4 量化、TP=2）。[Issue #51744](https://github.com/vllm-project/vllm/issues/51744)
- **Transformers 5.15 重构破坏了 Cosmos3-Edge 的 processor**，已提交修复 PR（同时兼容 5.14/5.15）。[PR #51989](https://github.com/vllm-project/vllm/pull/51989)

## 新模型与硬件支持

- **Muse Glimmer（29.6B VLM）**：新增稠密视觉-语言模型支持，包含 ViT-G/14 感知编码器、128K 上下文、ATEM 工具调用解析器及 DFlash 推测解码支持。[PR #51655](https://github.com/vllm-project/vllm/pull/51655)
- **Hunyuan A13B 工具解析器（Rust 前端）**：补上 Rust 前端缺失的 `hunyuan_a13b` 工具解析，可正确解析 `<tool_calls>` JSON 输出。[PR #52133](https://github.com/vllm-project/vllm/pull/52133)
- **XPU 支持建设**：新增 XPU wheel 发布到 wheels.vllm.ai 的 CI 步骤 [PR #52108](https://github.com/vllm-project/vllm/pull/52108)；`vllm_xpu_kernels` 升级至 0.1.13.1 [PR #52138](https://github.com/vllm-project/vllm/pull/52138)；修复 XPU 线性后端 ragged weights 处理逻辑 [PR #52118](https://github.com/vllm-project/vllm/pull/52118)。
- **Kimi-K3 ROCm 支持追踪**：社区开启 Kimi-K3 在 ROCm 上的功能启用与性能优化 roadmap（AITER fused-moe 已集成，a16w4/a8w4）。[Issue #50682](https://github.com/vllm-project/vllm/issues/50682)
- **ROCm MLA AITER 测试修复**：补全 AITER MLA decode metadata 测试桩的 MLA 维度，修复 FP8 golden 测试失败。[PR #52139](https://github.com/vllm-project/vllm/pull/52139)

## 性能与优化

- **ROCm / DSv3 新增 bpreshuffled blockscaled FP8 GEMM**：8×MI350 实测 **TP8+DPA 提升 4-8% QPS，TP8+EP 提升 0-4% QPS**，由 shape 与配置自动激活。[PR #51692](https://github.com/vllm-project/vllm/pull/51692)
- **Unified Attention TD 路径优化**：将张量描述符（tensor descriptor）构建外提出 tile 迭代循环，减少 `tensormap_create` 调用，便于 pipeliner 预取。[PR #51506](https://github.com/vllm-project/vllm/pull/51506)
- **ViT 全量 CUDA Graph（RFC）**：多模态模型（Qwen3-VL、GLM-V、Kimi K2.5）ViT 前向在生成场景中 kernel 启动开销大，社区正在推进 ViT 全量捕获 CUDA Graph 的实施方案。[Issue #38175](https://github.com/vllm-project/vllm/issues/38175)
- **推测解码性能告警**：Qwen3.5 原生 MTP 在 82-88% 接受率下仍慢于无 MTP baseline [Issue #47277](https://github.com/vllm-project/vllm/issues/47277)；Dynamic SD 在 batch-size 阈值处出现吞吐崩溃 [Issue #49548](https://github.com/vllm-project/vllm/issues/49548)；DSD 各 arm 在生产默认配置下比 no-spec 有较大基线开销，PIECEWISE 覆盖被列为因素之一 [Issue #49986](https://github.com/vllm-project/vllm/issues/49986)。这些工作表明推测解码调度策略仍处于快速迭代期。

## 稳定性与回归

按严重程度排列：

1. **引擎永久 stall（v0.27.0，4 节点 TP=4）**：请求永远无法进入调度器，需重启恢复，无修复 PR。[Issue #51921](https://github.com/vllm-project/vllm/issues/51921)
2. **Kimi-K3-NVFP4 在 8×B300 上输出退化**：reasoning channel 产生不连贯输出（v0.27.0 生产环境，已回滚），无修复 PR。[Issue #51798](https://github.com/vllm-project/vllm/issues/51798)
3. **MTP / 推测解码非法内存访问频发**：
   - Qwen3.6-27B-FP8 + MTP（num_spec_tokens=5）长序列崩溃，36 条评论，无修复 PR。[Issue #40756](https://github.com/vllm-project/vllm/issues/40756)
   - `gdn_attn.py:237` 处 `cudaErrorIllegalAddress`（qwen3_next_mtp），已取消 stale 标记重新活跃。[Issue #37035](https://github.com/vllm-project/vllm/issues/37035)
   - 一个针对 H100 推测解码 CUDA graph capture 期间非法访问的修复 PR **已提交**：对 speculator 缓冲区做激进清零（修复 w8a8_fp8 量化模型崩溃）。[PR #47596](https://github.com/vllm-project/vllm/pull/47596)
4. **Qwen3.6-35B-A3B-FP8 代码生成 400 错误**：`unterminated string starting at`，v0.23/v0.24 均复现，无修复 PR。[Issue #47761](https://github.com/vllm-project/vllm/issues/47761)
5. **DSpark 推测解码在 nightly 上不可用**：多路径仅假设 `"dflash"` 导致 DSpark 复用同一套 proposer 时崩溃。[Issue #50851](https://github.com/vllm-project/vllm/issues/50851)
6. **Engine core 活锁（100% CPU）**：MTP + xgrammar 结构化输出触发，v0.24 引入的回归。[Issue #49210](https://github.com/vllm-project/vllm/issues/49210)
7. **CI 回归**：FlashInfer XQA on SM120 的 PR 导致 GPQA-Eval（GPT-OSS, DGX Spark）分数下降，已 revert。[PR #51987](https://github.com/vllm-project/vllm/pull/51987)
8. **其他修复 PR（已提交）**：Qwen3Next 层边界在 DP2+TP2 下的序列并行布局修复 [PR #50685](https://github.com/vllm-project/vllm/pull/50685)；`mrope.apply_interleaved_rope` 在 torch 2.13 + torch.compile 下的错误输出修复 [PR #52005](https://github.com/vllm-project/vllm/pull/52005)；CPU 上 KimiLinear 与 MLA 前缀缓存/分块预填充的冲突 workaround [PR #52045](https://github.com/vllm-project/vllm/pull/52045)。

## 对应用开发者的意义

- **升级 v0.27.0 需谨慎**：当前存在引擎 stall、Gemma4 无法启动、DeepSeek V4 加载失败等多类回归，且均无官方补丁；生产环境建议暂留 0.26.x 并关注后续 patch。
- **推测解码（MTP/DFlash/DSpark）稳定性风险高**：多个崩溃/活锁未修复，且存在“接受率高但端到端更慢”的性能坑。如业务非强依赖推测解码，建议关闭或固定小 `num_speculative_tokens`（≤3）以降低风险。
- **结构化输出 + 推测解码组合需特别测试**：xgrammar 与 MTP 组合可能触发引擎活锁（100% CPU）。
- **新模型接入加速**：Muse Glimmer 和 Hunyuan A13B 即将获得官方支持；Rust 前端（vllm serve）的工具解析覆盖在逐步补齐。
- **ROCm 用户可期待收益**：DSv3 等模型在 MI350 上有明确 QPS 提升，且 Kimi-K3 的 ROCm 支持正在积极跟进。
- **Qwen3.6-35B-A3B-FP8 代码生成场景**若遇 400 错误，可先尝试禁用 FP8 KV cache 或回退版本规避。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 动态日报 — 2026-08-13

### 1. 今日速览

今日无新 Release，社区焦点集中在**稳定性修复**与**扩散模型/新硬件（Blackwell、ROCm、XPU、NPU）优化**两大方向。值得关注的是，围绕 DeepSeek-V4 与 Kimi-K3 的 DSpark 推测解码链路出现多起严重 Bug（死锁、NaNs、CUDA 启动失败），需要相关部署方留意；同时多个扩散模型 JIT 算子融合 PR 集中提交，性能优化节奏明显加快。

### 2. 版本发布与破坏性变更

- 今日无新版本发布。
- **依赖升级进行中**：[PR #30984](https://github.com/sgl-project/sglang/pull/30984) 拟将 ROCm 7.2.4 Docker 升级至 Python 3.12 + torch 2.11 + triton 3.7（使用 AITER 固定 Triton 版本替代默认 triton-rocm）。影响 AMD 容器构建方式，建议等待合入后更新镜像。

### 3. 新模型与硬件支持

- **Kimi-K3 支持路线图**（[Issue #32607](https://github.com/sgl-project/sglang/issues/32607)）持续更新，已包含 Day0 PR、Cookbook 及 Bug 追踪链接，是当前新模型支持的核心主线。
- **DeepSeek-V4 性能跟踪**（[Issue #33636](https://github.com/sgl-project/sglang/issues/33636)）：明确 NVIDIA SM90/SM100/SM103 两代平台范围，已集成 FlashInfer MN，TRT-LLM DSv4 attention 待接入。
- **Apple Silicon 支持**（[Issue #19137](https://github.com/sgl-project/sglang/issues/19137)）：无显著进展，仍开放贡献者招募。
- **XPU 默认启用 SGL-XPU**（[PR #34492](https://github.com/sgl-project/sglang/pull/34492)）：拟将 `SGLANG_USE_SGL_XPU` 默认设为 true，XPU 后端将转为默认路径。
- **NPU 扩散模型优化**：LTX-2/2.3 NPU 推理优化（[PR #34722](https://github.com/sgl-project/sglang/pull/34722)）；GLM-Image 分布式推理管线（[PR #31320](https://github.com/sgl-project/sglang/pull/31320)）支持异构 AR+DiT 部署。
- **AMD 方向**：gfx950 启用 Kimi-K3 12-head MLA aiter fp8 Gluon decode（[PR #34647](https://github.com/sgl-project/sglang/pull/34647)），依赖 ROCm/aiter#4480；ROCm 7.2.4 Docker 升级（[PR #30984](https://github.com/sgl-project/sglang/pull/30984)）。

### 4. 性能与优化

- **扩散模型 JIT 算子融合**（[PR #34616](https://github.com/sgl-project/sglang/pull/34616)、[#34617](https://github.com/sgl-project/sglang/pull/34617)、[#34620](https://github.com/sgl-project/sglang/pull/34620)）：覆盖 FLUX.2（AdaLN 融合 + packed SwiGLU）、HunyuanVideo（QKV packing + high-quality QKNorm）、ERNIE（QKNorm 全宽 RoPE 融合），均为 bit-exact 无损加速。另有组件级 `performance_mode=auto` 显存驻留决策优化（[PR #34615](https://github.com/sgl-project/sglang/pull/34615)）。
- **JIT Kernel 迁移**（[PR #34509](https://github.com/sgl-project/sglang/pull/34509)）：`moe_topk_softmax` 从 AOT 迁移至 JIT，H100 上单 kernel .so 体积从 AOT 的约 1.7GB（4 arch）降至 380KB 量级，显著缩减二进制体积。
- **EPD 批量嵌入缓存**（[PR #31574](https://github.com/sgl-project/sglang/pull/31574)）：将嵌入缓存的 host-device 拷贝改为批量 range 复制，降低访存开销。
- **Agentic 场景 T-LRU 缓存淘汰**（[PR #34012](https://github.com/sgl-project/sglang/pull/34012)）：面向 TTFT SLO 的 Tail-Optimized LRU（NeurIPS 25）策略，在 unified radix cache 中实现，agentic 多轮场景下可提升缓存命中效率。
- **Context Parallelism 路线图**（[Issue #21788](https://github.com/sgl-project/sglang/issues/21788)）仍在推进中，目前仅覆盖部分 DSA/MHA/GQA 模型，尚未全量支持。

### 5. 稳定性与回归

按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| 高 | **DeepSeek-V4 + DSpark 双节点 TP=2 死锁**（rank 在 NCCL logits all-gather 卡死，peer 空等在 request broadcast）（[#33289](https://github.com/sgl-project/sglang/issues/33289)） | 无 fix PR，建议避免生产使用 2 节点 DSpark |
| 高 | **Kimi-K3 跨请求 prompt 推理泄漏**（[#34259](https://github.com/sgl-project/sglang/issues/34259)） | 无 fix PR，安全相关，立即排查 |
| 高 | **FlashInfer TRTLLM NVFP4 MoE tile-192 产生 NaNs**（SM100/SM103 回归，GSM8K 得分 0.0）（[#34629](https://github.com/sgl-project/sglang/issues/34629)） | 无 fix PR，建议锁定 FlashInfer ≤ 0.6.16rc4 |
| 中 | **DSpark compact ragged CUDA Graph 请求槽位几何不兼容**（[#34384](https://github.com/sgl-project/sglang/issues/34384)） | 无 fix PR |
| 中 | **DSpark concurrency=1 时 CUDA launch 失败**（Kimi-K3, v0.5.17）（[#34522](https://github.com/sgl-project/sglang/issues/34522)） | 无 fix PR |
| 中 | **ROCm MI355 HiCache 在 agentic 负载下性能严重劣化**（[#34611](https://github.com/sgl-project/sglang/issues/34611)） | 无 fix PR |
| 中 | **Nemotron-H Mamba + DP attention + CUDA graph illegal memory access**（[#34561](https://github.com/sgl-project/sglang/issues/34561)） | 已有 fix PR（[#34561](https://github.com/sgl-project/sglang/pull/34561)） |
| 中 | **runai_streamer 加载 GLM-5.2 静默损坏权重**（TP8 下 token-0 乱码）（[#29998](https://github.com/sgl-project/sglang/issues/29998)） | 无 fix PR，建议避免 TP8 + GLM-5.2 组合 |
| 低 | **DeepEP low_latency buffer 在 CUDA graph 捕获时惰性初始化失败**（PP=2/TP=8/DP-attention）（[#29942](https://github.com/sgl-project/sglang/issues/29942)） | 无 fix PR |
| 低 | **XPU Qwen3.5 GDN + speculative decode 参数错误**（[#34720](https://github.com/sgl-project/sglang/issues/34720)） | 无 fix PR |
| 低 | **SM120 DSpark topk=192 缺失 FlashInfer decode dispatch**（[#33943](https://github.com/sgl-project/sglang/issues/33943)） | 相关 PR #33407 已合并，待验证 |
| 已关闭 | Free-Threaded Python (3.14t/nogil) 支持（[#22889](https://github.com/sgl-project/sglang/issues/22889)）因 inactive 关闭；NVFP4 trtllm MoE CUDA 非法访问（[#27987](https://github.com/sgl-project/sglang/issues/27987)）已修复并关闭 | — |

- **CI 健康度**（[Issue #17050](https://github.com/sgl-project/sglang/issues/17050)）：最新自动更新显示 3 个 broken、11 个 flaky、669 个 recently fixed。AMD 多模态 CI lane 因安装依赖参数引用问题全部失败，已有修复 PR（[#34723](https://github.com/sgl-project/sglang/pull/34723)）。

### 6. 对应用开发者的意义

- **DSpark / 推测解码链路风险高**：DeepSeek-V4、Kimi-K3 的 DSpark 在特定拓扑（2 节点、concurrency=1、SM120）下存在死锁、启动失败和正确性问题，生产环境务必先在目标硬件上充分验证，并锁定已验证的依赖版本。
- **扩散模型推理正在快速优化**：若你在使用 FLUX.2、HunyuanVideo、ERNIE-Image 等做大规模图像生成，关注上述 fusion PR 合入后的性能收益，且均为 bit-exact，可放心升级。
- **Kimi-K3 跨请求泄漏**需要所有服务方立即自查是否受影响（确认是否使用隔离的 KV cache / session 隔离），该问题若不修复可能造成合规风险。
- **CI 处于波动期**：多个 AMD/ROCm 相关 lane 暂不可用，在 AMD 平台上合入 PR 的验证周期可能变长；建议关注 #17050 跟踪 Issue 获取 CI 恢复状态。
- **KV cache utilization Prometheus metrics**（[#5979](https://github.com/sgl-project/sglang/issues/5979)）仍是开放 good first issue，如果你依赖该指标做容量管理，可以参与贡献或关注实现进展。
- 对于基于 SGLang 构建 Agent 应用的用户，T-LRU（[PR #34012](https://github.com/sgl-project/sglang/pull/34012)）值得关注，它在多轮对话场景下比标准 LRU 更贴合 TTFT SLO 约束，适合对首字延迟敏感的生产负载。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 — 2026-08-13

## 今日速览

今日核心动态集中在 **HIP 构建正确性修复**（b10405 移除导致 RDNA3.5 上 MTP 投机解码漂移的 `-funsafe-math-optimizations`）与 **SYCL 后端的密集优化**（kernel 融合、pinned memory、量化 KV decode 等 8+ PR 在途/合并）。社区侧，**Maple 20B-A1B 三元 MoE 新架构**提交支持 PR，同时 **ROCm 7.14 库加载问题**（#25807）与 **AMD GPU 上的 token 替换损坏**（#26754）是当前最值得关注的正确性风险。

## 版本发布与破坏性变更

- **b10405**：移除 `ggml-hip` 中的 `-funsafe-math-optimizations` 编译选项。该选项启用了 `-fassociative-math`，会重排 FP 归约顺序，在 RDNA3.5 上可能导致贪心 argmax 结果翻转（表现为 MTP 投机解码与非投机基线输出不一致）。移除后 HIP 构建恢复 IEEE 一致性。**对 HIP 用户有影响**：此变更可能轻微影响局部峰值性能，但保证确定性和正确性。 [PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696)
- **b10400**：修复 ARM 构建问题，清理未使用变量。 [PR #26991](https://github.com/ggml-org/llama.cpp/issues/26991)
- **b10375**：收紧 Qwen 模型的 bare function 解析逻辑，影响 tool-calling 的格式判断。 [PR #26793](https://github.com/ggml-org/llama.cpp/pull/26793)

## 新模型与硬件支持

- **[Draft] Maple 20B-A1B 三元 MoE 架构**（DeepGrove, MIT 协议）：24 层、256 专家，基于 DeepGrove 的 llama.cpp fork 移植为符合主线的逻辑提交，当前标记为 CPU only。 [PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)
- **SYCL 后端 pinned memory 支持**：修复 #26752，通过 `GGML_SYCL_ENABLE_HOST_PINNED_MEM` 环境变量启用，改善 host-to-device 传输性能——对单卡/多卡 host 端数据搬运密集场景（如 prefill 输入）影响显著。 [PR #26789](https://github.com/ggml-org/llama.cpp/pull/26789)
- **AMD gfx1151 (RDNA 3.5) + ROCm 7.14**：新增稳定性 bug 报告，RPC worker 在 DeepSeek V4 prefill 超 4096 token 后于 `GGML_OP_TOP_K` 崩溃。 [Issue #26746](https://github.com/ggml-org/llama.cpp/issues/26746)

## 性能与优化

**SYCL 后端（今日主战场）：**

- **Gated-Delta-Net state writeback cpy 融合**：Qwen 3.6 27B Q4_K 在 Arc Pro B70 上 tg128 达 23.91 t/s（相比 A/B pass 分离方案有提升）。 [PR #26643](https://github.com/ggml-org/llama.cpp/pull/26643)
- **TILE kernel 用于量化 KV decode**：Battlemage 上 q4_0/q8_0 KV 解码全面切至 TILE kernel，Qwen3.6-35B / Gemma 4 26B / 12B 在 32K 和 118K 上下文下测得 **+42% ~ +169%** 解码吞吐，零回归。 [PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689)
- **DMMV ESIMD Q3_K kernel**：延续 Q2_K 工作，为 Battlemage 添加强量化 MoE 模型的 expert 并行解码 kernel。 [PR #26251](https://github.com/ggml-org/llama.cpp/pull/26251)
- **UNARY(silu|sigmoid|softplus) + MUL 融合**：减少 kernel launch 和中间显存读写。 [PR #26411](https://github.com/ggml-org/llama.cpp/pull/26411)
- **OP concat 支持 Q4_0/Q4_1/Q5_0/Q5_1/Q8_0**：扩展量化张量拼接，同时修复 CI 测试。 [PR #26800](https://github.com/ggml-org/llama.cpp/pull/26800)
- **移除 fp16 GEMM 后单独 fp32 promotion**（oneMKL 路径），减少一次额外 pass。 [PR #26372](https://github.com/ggml-org/llama.cpp/pull/26372)

**CPU：**

- **Flash-Attention V-cache F16→F32 向量化**：使用 F16C 硬件指令替代软件标量转换，qwen3:4b prefill 速率提升 **17–31%**。 [PR #26947](https://github.com/ggml-org/llama.cpp/pull/26947)

**Speculative Decoding：**

- **DFlash/DSpark 后端采样支持**：继 #25532 合并后，DFlash 现在可基于后端采样实现多 token 采样，实现更简单稳健。 [PR #26958](https://github.com/ggml-org/llama.cpp/pull/26958)（已关闭合并）

## 稳定性与回归

按严重程度排列：

1. **[严重] Pre-built Windows ROCm 二进制无法检测 GPU**（#26929）：CLOSED，但受影响用户需关注下一个 release 是否修复。 [Issue #26929](https://github.com/ggml-org/llama.cpp/issues/26929)
2. **[严重] AMD GPU token 替换损坏**（#26754）：Qwen3.6-27B 在 Vulkan/ROCm 上产生一致的字符替换错误；CPU 后端正常、云端 vLLM 正常——指向后端 kernel 问题而非模型。CLOSED。 [Issue #26754](https://github.com/ggml-org/llama.cpp/issues/26754)
3. **[高] ROCm 7.14 共享库加载失败**：`error while loading shared libraries: libhipblas.so.3`，影响 llama-fit-params 等工具。 [Issue #25807](https://github.com/ggml-org/llama.cpp/issues/25807)
4. **[高] SYCL 第二 prompt 产生垃圾输出**（#26845）：KAT-Coder-V2.5-Dev-Cerebellum 在 Arc Pro B60 上复现，与已关闭的 #21589 (Qwen3.5 SYCL) 疑似同源。 [Issue #26845](https://github.com/ggml-org/llama.cpp/issues/26845)
5. **[中] b10356→b10359 间 RTX 5080 (Blackwell) 性能回退 ~40%**（#26918）：CLOSED，回归已定位。 [Issue #26918](https://github.com/ggml-org/llama.cpp/issues/26918)
6. **[中] Vulkan 驱动版本检查引发 Xe Arc 崩溃**（#26769）：PR #26998 提议 revert 引入的 driver check（#25192），未充分测试旧驱动。 [PR #26998](https://github.com/ggml-org/llama.cpp/pull/26998)
7. **[中] RPC SET_ROWS 越界写**（#26912）：release 构建下可越界写输出张量缓冲区，已定位，需关注修复。 [Issue #26912](https://github.com/ggml-org/llama.cpp/issues/26912)
8. **[低] Gemma 4 31B MTP 在 Vulkan 上崩溃**（#24492, stale）：报错 "pre-allocated tensor cannot run operation NONE"。 [Issue #24492](https://github.com/ggml-org/llama.cpp/issues/24492)
9. **[低] SWA 在 Gemma 4 上遗忘关键细节**（#25751）：疑与 sliding window attention 实现有关，无 fix PR。 [Issue #25751](https://github.com/ggml-org/llama.cpp/issues/25751)

## 对应用开发者的意义

- **投机解码（MTP/DFlash/DSpark）正在趋于可用**：HIP 端 IEEE 合规修复（b10405）+ DFlash 后端采样落地，意味着长上下文 MoE 模型的投机解码可靠性提升，可关注后续 benchmark。
- **SYCL 成为一等优化公民**：Arc 系列 GPU 的量化 KV decode、ESIMD kernel、pinned memory 等优化极大改善了英特尔平台的部署经济性；若你的 Agent 服务跑在 Intel 数据卡上，建议跟踪上述 PR 合入进度。
- **视觉模型 KV cache 保存仍不可用**（#19466）：依赖 `/slots/3?action=save` 做服务迁移/容灾的视觉应用需继续等待，直至该 issue 被修复。 [Issue #19466](https://github.com/ggml-org/llama.cpp/issues/19466)
- **工具调用的 grammar 限制**：`MAX_REPETITION_THRESHOLD`（2000）在工具含大量可选参数时会致 GBNF 编译失败（#20867），如你的 Agent 工具定义较多，建议简化工具 schema 或等待 fix。
- **Disaggregated prefill/decode 已进入 roadmap**（#21266）：这是 server 侧最重要的架构级演进，对于需处理超长 prompt 的 Agent 应用，值得提前关注设计讨论，便于后续演进。 [Issue #21266](https://github.com/ggml-org/llama.cpp/issues/21266)
- **UI 层获得文件 `@` 提及**（#26715）与斜杠命令（#26716）：对基于 server 内置 webui 构建轻量 Agent demo 的团队是可用的新交互原语。 [PR #26715](https://github.com/ggml-org/llama.cpp/pull/26715)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-13

## 今日速览

Ollama 发布 v0.32.10-rc1，核心变更包括 `repeat_penalty` 默认值调整为 1.0（关闭状态）并带来 NVFP4 MLX 模型 prefill 约 7–8% 的加速。社区围绕 `WriteWithBackup` 文件备份碰撞问题出现多个修复 PR，同时 Claude Code 集成（`ollama launch claude`）的兼容性问题持续成为关注焦点。此外，Intel oneAPI (SYCL) GPU 后端 PR 和 MLX KV connector 框架提案显示出硬件支持与架构扩展的新动向。

## 版本发布与破坏性变更

- **[v0.32.10-rc1]** 发布候选版本。破坏性变更：未设置 `repeat_penalty` 的模型现在默认使用 1.0（关闭）而非 1.1，与其他推理引擎保持一致，同时提升 speculative decoding 速度。若旧模型出现重复文本，需在模型参数中显式设置该值。
  https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1

## 新模型与硬件支持

- **[PR #17621] Intel oneAPI (SYCL) GPU 后端（进行中）**：基于 llama.cpp 的 `ggml-sycl` 实现，通过 `-DOLLAMA_LLAMA_BACKENDS=sycl` 可选构建，默认行为不变。对 Intel GPU 用户是重要进展。
  https://github.com/ollama/ollama/pull/17621
- **[PR #17714] NemotronH MLX vision 支持（进行中）**：实现 RADIO 视觉编码器和 projector，接入共享 MLX 媒体管线，支持动态分辨率预处理和 MTP offsets。同时继续抑制不受支持的 audio 输入。
  https://github.com/ollama/ollama/pull/17714
- **[Issue #17720] 云端模型请求：Qwen3.8**：用户询问 Qwen3.8-2.4T-A95B-FP8 何时上线 Pro/Max 账户。
  https://github.com/ollama/ollama/issues/17720
- **[Issue #17698] Llama 4 GGUF 转换 tokenizer 配置错误**：GGUF 模型被转换为 `tokenizer.ggml.pre="default"` 而非 `"llama4"`，导致与 llama.cpp 直接运行结果不一致。
  https://github.com/ollama/ollama/issues/17698

## 性能与优化

- **[v0.32.10-rc1] NVFP4 MLX 模型 prefill 加速**：对带全局 scale 的 NVFP4 MLX 模型，prefill 速度提升约 7–8%。
  https://github.com/ollama/ollama/releases/tag/v0.32.10-rc1
- **[Issue #17016] dspark 请求（进行中）**：用户请求内置 dspark 选项以显著提升 LLM 推理速度，附带了两个开源参考实现（memtp 等）。暂无官方回复。
  https://github.com/ollama/ollama/issues/17016

## 稳定性与回归

按严重程度排列：

- **[Issue #17700] SillyTavern 文本补全返回空响应（0.32.8 回归）**：回退到 0.32.7 可修复，无错误日志，Ollama 未收到任何 GET 请求。影响所有本地模型，但 chat completion 正常。尚无修复 PR。
  https://github.com/ollama/ollama/issues/17700
- **[Issue #15950] Runner 接受 TCP 连接但请求永远无法到达工作循环**：大模型长时间驻留内存后 `/api/generate` 无限挂起，与已解决的 #15258 形态相同，但在 0.20.5 上仍然复现。核心 server 稳定性问题。
  https://github.com/ollama/ollama/issues/15950
- **[Issue #17671] Claude Code 集成无响应（qwen3-coder:30b）**：模型正常生成但 Claude Code 界面无输出。Windows 11 + Ollama 0.32.8 + Claude Code 2.1.227。
  https://github.com/ollama/ollama/issues/17671
- **[Issue #17691] 嵌入向量完全相同（cosine=1.0）**：不同重音法语单词产生逐位相同的 embedding，跨模型和端点可复现。影响 RAG 类应用的检索正确性。
  https://github.com/ollama/ollama/issues/17691
- **[Issue #17602] Laguna parser 将普通 JSON 误判为工具调用**：`model/parsers/laguna.go` 的检测规则接受回复中的任意 JSON 对象，导致回复被截断或损坏。
  https://github.com/ollama/ollama/issues/17602
- **[Issue #17692] Nemotron3.5-lightning:30b 在 AMD AI395+ 上卡住**：生成一定 token 后停止（通常在 thinking 阶段），CTRL+C 可中断。可能与 AMD 平台相关。
  https://github.com/ollama/ollama/issues/17692
- **[Issue #17713] WriteWithBackup 备份文件碰撞（已有多修复 PR）**：Unix 秒级时间戳导致同一秒内多次写入覆盖同一备份文件，存在数据丢失风险。PR #17724、#17722、#17718 均提供修复方案（切换至纳秒时间戳）。
  https://github.com/ollama/ollama/issues/17713
  https://github.com/ollama/ollama/pull/17724
- **[Issue #17285] 0.30.0+ 版本模型加载失败（已关闭）**：用户报告 Docker 环境升级后无法加载模型，停留在 0.24.0。Ryzen 5750G Vega8 + 128GB RAM。已被关闭，但未给出明确结论。
  https://github.com/ollama/ollama/issues/17285
- **[Issue #17050] MLX 模型性能异常（Qwen3.5/3.6 35b-mlx）**：MLX 版本明显慢于非 MLX 版本，部分 MLX 模型完全无法运行。Mac Air M3 24GB 环境。
  https://github.com/ollama/ollama/issues/17050

## 对应用开发者的意义

- **Claude Code 集成仍不稳定**：`ollama launch claude` 存在无响应（#17671）和模型识别警告（#17717）两类问题。后者会导致 Claude Code 回退到保守的 200k auto-compact 窗口，影响长上下文任务性能。
  https://github.com/ollama/ollama/issues/17717
- **[PR #17712] `reasoning_effort=minimal` 支持**：OpenAI 兼容端点将 `minimal` 映射为 `low` 而非返回 400。使用 reasoning 模型的开发者可获得更好的 OpenAI 生态兼容性。
  https://github.com/ollama/ollama/pull/17712
- **[PR #17719] Harmony 模型工具调用参数数组兼容**：修复将单个工具调用的参数包装在 JSON 数组中导致 HTTP 500 的问题，提升工具调用类 Agent 的稳定性。
  https://github.com/ollama/ollama/pull/17719
- **[PR #17726 / #17728] API 文档完善**：补充 API 错误响应约定（HTTP 状态码/JSON 格式/流式错误行为）以及 ChatStreamEvent 中缺失的 usage/timing 字段文档（修复 #14680）。对 API 调试有直接帮助。
  https://github.com/ollama/ollama/pull/17726
  https://github.com/ollama/ollama/pull/17728
- **[Issue #17696 + PR #17707] KV connector 框架提案**：提出可插拔外部 KV cache 后端框架（长期可支持 LMCache 等），PR 已提供 MLX 文件后端示例。KV cache 外部化可能对长上下文和多轮对话场景带来显著改进，值得关注。
  https://github.com/ollama/ollama/issues/17696
  https://github.com/ollama/ollama/pull/17707
- **[PR #17709] `/v1/responses` 搜索限制后优雅结束**：web 搜索达到上限后不再失败请求，而是返回工具结果作为响应，避免 Responses API 调用中断。
  https://github.com/ollama/ollama/pull/17709

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-13

## 今日速览

过去 24 小时无新版本发布，但社区 PR 活跃（280 条更新），其中有 4 个新 PR 落地于 reasoning 参数透传链路（responses_bridge / GitHub Copilot / Azure AI）。成本计量修正是当前主线：Bedrock cache token 丢失、Anthropic 流式 usage 恒为 0、vLLM passthrough 不计费均有对应 PR 推进。多个高影响 bug（Redis Cluster 响应串线 #25447、空 choices 流崩溃 #36553）已标记关闭。

---

## 新模型与硬件支持

- **Reasoning 参数透传补全**（三个独立 PR，同一主题）：
  - [#36755](https://github.com/BerriAI/litellm/pull/36755)（今日创建）：responses_bridge 不再静默丢弃 `reasoning_effort: "max"`，改为接受该值并转发。
  - [#36754](https://github.com/BerriAI/litellm/pull/36754)（今日创建）：GitHub Copilot 的 Claude 模型此前会静默忽略 `reasoning_effort` 与 `thinking`，PR 通过覆写 `map_openai_params` 保留这两个参数。
  - [#33350](https://github.com/BerriAI/litellm/pull/33350)：Azure AI 推理模型现在会把 `reasoning_effort` 加入 `get_supported_openai_params` 并实际转发。
- [#30941](https://github.com/BerriAI/litellm/issues/30941)（closed）：[Feature] 支持 Bedrock GPT 5.5（Mantle 平台）——该平台仅支持 Responses API，需自动将 Chat Completions 调用转换为 Response API。
- [#23388](https://github.com/BerriAI/litellm/issues/23388)（closed）：[Feature] 为 Gemini 2.5 Flash / Flash-Lite 补齐 priority/flex paygo 定价支持。

---

## 性能与优化

- **Bedrock cache token 丢失导致 4–7 倍超计费**：[#34498](https://github.com/BerriAI/litellm/pull/34498)（open）修复 Bedrock Invoke 流式响应丢弃 `cacheRead`/`cacheWrite` token 计数的问题。该 bug 使缓存命中的 Claude 流量被按全新输入计费。PR 同时修复 usage-only recovery 路径丢失 cache-write token 的问题。
- **Anthropic 流式 usage 恒为 0/0**：[#32477](https://github.com/BerriAI/litellm/pull/32477)（open）解决了 openai-provider → `/v1/messages` 流式路径下 `message_delta.usage.output_tokens` 始终为 0、消费记录计费 0 token 的问题。与 [#32475](https://github.com/BerriAI/litellm/pull/32475)（SSE 错误事件，修复 #32086）配套。
- **DB 连接泄漏**：[#34380](https://github.com/BerriAI/litellm/pull/34380)（open）修复 `global_spend_refresh()` 每次调用泄漏一个 PrismaClient 连接的问题。长期累积会打满 Postgres `max_connections` 导致全局限流。
- **vLLM passthrough 不计费**：[#33351](https://github.com/BerriAI/litellm/pull/33351)（open）为 `/vllm/*` passthrough 端点补上 StandardLoggingPayload 构建，使带 usage 的请求能正确记录 spend。

---

## 稳定性与回归

按严重程度排列：

**严重安全/数据正确性（已有修复）**

- **Redis Cluster 环境响应串线**：[#25447](https://github.com/BerriAI/litellm/issues/25447)（closed）：OpenShift 多副本环境下偶发响应返回给错误客户端。此为多租户数据隔离事故，已关闭，请确认所在环境部署版本包含该修复。

**高影响（有修复 PR）**

- **空 `choices` chunk 导致流崩溃**：[#36553](https://github.com/BerriAI/litellm/issues/36553)（closed）：`streaming_iterator.py` 的 `_should_start_new_content_block` 无条件访问 `chunk.choices[0]`，当 OpenAI 格式后端发送 usage-only chunk 时抛异常。已修复。
- **LiteLLM_Config 表覆盖新部署配置**：[#12875](https://github.com/BerriAI/litellm/issues/12875)（closed）：`_update_config_fields` 从库中拉取旧值覆盖新配置，导致 `general_settings` 等更新不生效。已关闭，关注合入版本。

**高影响（仍 Open）**

- **Azure GPT-5.6 terra/luna 价格错误**：[#36192](https://github.com/BerriAI/litellm/issues/36192)（open）：`azure/gpt-5.6-terra` 与 `azure/gpt-5.6-luna` 的成本表沿用了 OpenAI 直连价格（Terra -20%、Luna -80%），而 Azure 从未降价。若你的企业按 Azure 计费，当前成本估算会显著虚高。
- **429 错误泄露 token 的 SHA-256 哈希**：[#27884](https://github.com/BerriAI/litellm/issues/27884)（open）：并行请求限流器返回的 429 JSON 中包含虚拟 key 的完整 64 字符哈希。建议升级前在网关层脱敏。

**中影响**

- **限流计数随流取消单调递增**：[#27955](https://github.com/BerriAI/litellm/issues/27955)（open）：客户端中途取消 `/v1/messages` 流式请求时，Redis 中 `max_parallel_requests` 计数器不减，最终所有请求被拒。
- **Prompt-cache 前缀失效**：[#36559](https://github.com/BerriAI/litellm/issues/36559)（open，今日更新）：`AnthropicMessagesConfig` 将对话中段的 system role 提升到顶层 `system` 字段（为兼容 pre-4.8 Claude），导致整个 cache 前缀失效——推理成本与延迟将显著上升。
- **Xiaomi MiMo 模型 `output_config` 报错**：[#24549](https://github.com/BerriAI/litellm/issues/24549)（open）：Claude Code 调用 MiMo-V2-Pro / Omni 时 `AsyncCompletions.create()` 失败。
- **Guardrails Monitor 缺失内容过滤评估**：[#36566](https://github.com/BerriAI/litellm/issues/36566)（open）：五个已配置的全局 `litellm_content_filter` guardrails 未出现在请求日志和监控中。
- **`global_max_parallel_requests` 不生效**：[#27900](https://github.com/BerriAI/litellm/issues/27900)（open）。

**其他已关闭修复**

- [#27811](https://github.com/BerriAI/litellm/pull/27811)：encrypted_content 亲和性检查在源 deployment 冷却时回退全池，导致级联 400（closed）。
- [#27857](https://github.com/BerriAI/litellm/pull/27857)：http_handler 保留流式请求体的上游错误信息，不再吞掉 429 insufficient_quota 等细节（closed）。
- [#33196](https://github.com/BerriAI/litellm/pull/33196)：Bedrock Converse 移除 Claude Sonnet 5 的 `toolSpec.strict` 字段（closed）。

---

## 对应用开发者的意义

1. **多租户 Redis 部署先确认修复状态**：`#25447` 是响应串线级别的安全事故。如果你在 OpenShift / 多副本 Redis Cluster 上运行 LiteLLM，务必确认部署版本包含该修复，否则存在跨用户响应泄漏风险。
2. **Reasoning 参数将真正生效**：当前 `reasoning_effort: "max"` 在 responses_bridge、Azure AI、Copilot Claude 上都会被静默忽略（请求 200 但实际用默认深度）。如果你依赖深度推理，关注 [#36755](https://github.com/BerriAI/litellm/pull/36755) / [#36754](https://github.com/BerriAI/litellm/pull/36754) / [#33350](https://github.com/BerriAI/litellm/pull/33350) 合入后即可正确透传。
3. **流式 Responses API 消费端将获得标准 SSE**：`#20975`（SSE setup 事件缺失）已关闭，加 [#32475](https://github.com/BerriAI/litellm/pull/32475) 的 error event 补充，Responses API 流式传输的 SDK 兼容性问题正在收尾。
4. **成本数据可信度提升**：Bedrock cache token 修复（4–7× 超报）和 Anthropic usage 0/0 修复如果合入，你的计费/观测系统将得到显著更准的 token 数据。若当前基于这些数据做预算告警，建议在修复合入前对数值打折处理。
5. **MCP server 运维体验将改善**：`#32476` 在 `/v1/mcp/server/health` 响应中加入 `server_name` 和 `alias`，多 MCP server 场景下健康检查将不再是无差别列表。
6. **配置热更新注意**：`#12875` 修复后，通过 UI/数据库修改的配置不会再被旧配置覆盖。如果你此前绕过 UI 直接改 config 文件并踩过"改了不生效"，可关注该修复的发布版本。

---

*数据来源：[BerriAI/litellm](https://github.com/BerriAI/litellm) Issues & PRs（2026-08-13 更新）*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 2026-08-13

## 今日速览

1. **桌面端/Studio 平台兼容性修复密集推进**：Windows 杀软拦截（PR #8586）、AppLocker 阻断 unsloth.exe（PR #8592）、macOS llama-server 启动失败（PR #8574）、Windows on ARM 安装失败（PR #8599）均有对应修复 PR 已提交。
2. **AMD 支持边界被明确**：PR #8577 直接告知用户 ROCm 不覆盖 RDNA 1 及更早架构，取代此前无效的"安装 HIP SDK"建议；另一 PR #7670 修复多 ROCm GPU 环境下错误选中 iGPU 导致的崩溃。
3. **新模型支持请求集中涌现**：DeepReinforce Ornith-1.0（#6721，23 👍）与 Ling 3.0（#8532）呼声最高；同时社区提出实时 tok/s 与 GPU 温耗监控等性能可观测性需求。

---

## 版本发布与破坏性变更

**无新 Release**（最新桌面版仍为 0.1.701-beta）。但以下进行中的 PR 会带来行为变更，合并前需关注：

- [PR #8577](https://github.com/unslothai/unsloth/pull/8577)：**AMD RDNA 1 及更早架构停止提供"可修复"误导**。此前 RX 5700 XT 等设备安装时会提示"安装 HIP SDK 或设置 UNSLOTH_ROCML…"；该 PR 改为直接说明 ROCm 不支持，并阻止无效重试。影响：RDNA 1 以下 AMD 卡（RX 5000 系列及更早）将被明确判为不支持。
- [PR #8599](https://github.com/unslothai/unsloth/pull/8599)：**Windows on ARM 安装逻辑重构**——不再复用 ARM64 原生解释器（`pyarrow` 无 win_arm64 wheel），同时新增 inference-only 降级选项。影响：Snapdragon X 系列设备的安装路径将与 x64 不同。
- [PR #8586](https://github.com/unslothai/unsloth/pull/8586)：**安装脚本大幅重构**以降低 AMSI/EDR 误报率。若您的安全软件基于脚本特征做白名单，升级后需重新验证。

---

## 新模型与硬件支持

**无正式新增模型/后端**。今日动态以社区请求与兼容性澄清为主：

- [Issue #6721](https://github.com/unslothai/unsloth/issues/6721)（23 👍）：请求支持 DeepReinforce Ornith-1.0 模型族，包括 Unsloth 优化变体与工具链兼容。
- [Issue #8532](https://github.com/unslothai/unsloth/issues/8532)：请求在 Unsloth Studio 中完整支持 Ling 3.0（下载、加载、配置、服务）。
- [PR #8622](https://github.com/unslothai/unsloth/pull/8622)：允许为图像/视频扩散模型（如 FLUX.2 衍生版、社区 LoRA repack）手动指定 family override，解决微调模型或合并仓库因 repo id 不匹配被拒绝的问题。
- [PR #8577](https://github.com/unslothai/unsloth/pull/8577)：明确 **RX 5700 XT / RX 580 等 RDNA 1 及更早 GPU 不被 ROCm 支持**，AMD 后端覆盖范围收窄至 RDNA 2+（RX 6000 系列起）。

---

## 性能与优化

- [PR #8589](https://github.com/unslothai/unsloth/pull/8589)：**VRAM 预算比例可调**。此前 2×RTX 3090 用户反馈 Studio 只给 175k context（LM Studio 可到 200–250k）。该 PR 逐项审计保留空间（`--parallel 4` slot logits、2049 MiB compute buffer 等），并将其从"固定保留"改为"可调分数"。
- [Issue #8528](https://github.com/unslothai/unsloth/issues/8528)（feature request）：请求在 Studio API 面板**实时显示 prompt 处理速度与生成速度**（当前仅在请求完成后显示生成速度）。
- [Issue #8527](https://github.com/unslothai/unsloth/issues/8527)（feature request）：请求增加 CPU/GPU 利用率、温度、功耗监控，类似 llama.cpp server 的指标面板。

---

## 稳定性与回归

按严重程度排列：

| 严重度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 崩溃 | [Issue #8566](https://github.com/unslothai/unsloth/issues/8566)：macOS M4 加载本地 GGUF 时 llama-server 启动失败，且空闲内存占用异常高 | OPEN | [PR #8574](https://github.com/unslothai/unsloth/pull/8574)：为 macOS 设置 `DYLD_LIBRARY_PATH` 并细化启动失败分类 |
| 崩溃 | [Issue #7506](https://github.com/unslothai/unsloth/issues/7506)：Kaggle T4 环境，Qwen 3.5 0.8b bf16 训练崩溃 | OPEN | 无 |
| 崩溃（已关闭） | [Issue #7331](https://github.com/unslothai/unsloth/issues/7331)：AMD Radeon 8060S (gfx1100) / ROCm 6.3 RAG embeddings warmup 段错误 | CLOSED | [PR #7670](https://github.com/unslothai/unsloth/pull/7670)：ROCm 多设备下阻止 iGPU 被选中，按 build arch 覆盖门控恢复 |
| 安装失败 | [Issue #8523](https://github.com/unslothai/unsloth/issues/8523)：Windows 安装被第三方 AMSI 以 `ScriptControl…` 拦截 | CLOSED | [PR #8586](https://github.com/unslothai/unsloth/pull/8586)：重构安装脚本降低误报 |
| 安装失败 | [Issue #8490](https://github.com/unslothai/unsloth/issues/8490)：Windows AppLocker/WDAC 阻止 `<venv>\Scripts\unsloth.exe`，Studio 无法完成 setup | OPEN | [PR #8592](https://github.com/unslothai/unsloth/pull/8592)：去掉对生成的 unsloth.exe console script 的依赖 |
| 安装失败 | [Issue #8508](https://github.com/unslothai/unsloth/issues/8508)：Windows + AMD GPU 安装失败 | OPEN | 相关：[PR #8577](https://github.com/unslothai/unsloth/pull/8577) 改进错误路径 |
| 鉴权 | [Issue #8663](https://github.com/unslothai/unsloth/issues/8663)：Claude Code 通过 `x-api-key` 头发送密钥，而 Unsloth API 只认 `Authorization: Bearer sk-unsloth-…`，全部请求 401 | OPEN | 无 |
| 数据正确性 | [Issue #8442](https://github.com/unslothai/unsloth/issues/8442)：以 API 后端方式使用时，**上下文跨会话/模型 harness 泄漏** | OPEN | 无 |
| 功能异常 | [Issue #8483](https://github.com/unslothai/unsloth/issues/8483)：Deep Research 在"Writing The Report"阶段冻结，无法统计 token 用量 | OPEN | 无 |

**其他今日回归/修复 PR（尚未合并）**：

- [PR #8575](https://github.com/unslothai/unsloth/pull/8575)：修复 Windows 登录自启动后在 `C:\Windows\system32` 启动后端导致无 Studio server 的问题。
- [PR #8542](https://github.com/unslothai/unsloth/pull/8542)：加固 `unsloth studio update` 的 launcher-refresh 安装脚本拉取流程。
- [PR #8467](https://github.com/unslothai/unsloth/pull/8467)：修复 remote-connection 合约测试，使 Repo tests (CPU) CI 从红转绿。
- [PR #8653](https://github.com/unslothai/unsloth/pull/8653)：修复 `UNSLOTH_ALLOW_CPU=1` 在无可用 CUDA 设备的环境（driverless 容器/CI）导入仍失败的问题。

---

## 对应用开发者的意义

1. **Windows 企业环境部署需评估执行策略**：[PR #8592](https://github.com/unslothai/unsloth/pull/8592) 与 [PR #8586](https://github.com/unslothai/unsloth/pull/8586) 解决的是 AppLocker/WDAC/Smart App Control/AMSI 拦截问题。若您的应用通过 Unsloth 作为子进程或安装流程嵌入，需确保新安装脚本形态被安全策略允许。
2. **AMD 旧卡不可作为后端**：[PR #8577](https://github.com/unslothai/unsloth/pull/8577) 落地后，RDNA 1 及更早（RX 5000 系列）将明确不支持。在 AMD 硬件上构建推理服务的团队应规划 RX 6000 及以上，或直接转 Vulkan 路径（如 [Issue #8458](https://github.com/unslothai/unsloth/issues/8458) 所涉）。
3. **API 鉴权当前仅兼容 Bearer 头**：[Issue #8663](https://github.com/unslothai/unsloth/issues/8663) 意味着 Anthropic 系 CLI（Claude Code）等使用 `x-api-key` 的客户端暂无法直连 Unsloth Studio 的 API 端点。自行集成时请使用 `Authorization: Bearer sk-unsloth-…` 格式。
4. **上下文长度可调但需自行校准**：[PR #8589](https://github.com/unslothai/unsloth/pull/8589) 将 VRAM budget 分数开放后，您可以在多卡/大显存场景下换取更长 context；但需注意 `--parallel` 等并发槽位仍占用显存，调参时需权衡并发数与 max context。
5. **上下文隔离问题需关注**：[Issue #8442](https://github.com/unslothai/unsloth/issues/8442) 若被复现，意味着通过 Unsloth API 承载多用户会话时可能出现上下文串线。生产多租户场景建议在应用层做会话隔离，并跟踪该 issue 的修复进度。

</details>

---
*本日报由 [agents-radar](https://github.com/forever-1314/agents-radar) 自动生成。*