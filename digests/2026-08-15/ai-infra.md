# AI 基础设施日报 2026-08-15

> 生成时间: 2026-08-14 23:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-15）

## 1. 生态全景

当前推理基础设施正处在**新模型架构驱动的大版本适配期**：DeepSeek-V4、Kimi-K3、Qwen3.8 等新一代模型在各引擎中集中落地，但普遍伴随正确性和硬件适配问题。硬件适配战场从 NVIDIA 旗舰卡扩大到 **AMD ROCm/MI350、消费级 Blackwell（RTX 50/SM120）、NPU、Metal**，多硬件后端已成标配。同时，**混合注意力架构（Mamba/GDN/KDA）与投机解码（MTP/DSpark/EAGLE3）** 成为性能优化的核心焦点，但也是稳定性事故高发区。生态整体的重心正在从"能跑"转向"在边缘设备和异构硬件上稳定高效地跑"，而 Agent 工作流对**工具调用可靠性、缓存命中率和 API 行为一致性**提出了更高要求。

## 2. 各项目活跃度对比

| 项目 | 定位 | 显著 PR / Issue 数* | Release | 今日主题 |
|---|---|---|---|---|
| **vLLM** | 企业级推理引擎 | PR 16+ / Issue 16+ | 无 | DeepSeek-V4/Kimi-K3 在 ROCm 与消费级 Blackwell 上的适配与正确性修复；ModelRunner V2 生态补齐 |
| **SGLang** | 高性能推理引擎（多硬件快速迭代） | PR 12+ / Issue 12+ | 无 | Router GEMM 精度一致性、DeepSeek-V4 稳定性、NPU/ROCm/Metal 后端推进 |
| **llama.cpp** | 本地/边缘轻量运行时 | PR 9+ / Issue 15+ | **11 个**（b10425→b10435） | Jinja 模板性能修复、SYCL 算子融合、MiniMax-Text-01 合并、新崩溃问题暴露 |
| **Ollama** | 本地模型部署与 Agent 网关 | PR 9+ / Issue 10+ | **3 个**（v0.32.11→v0.32.13） | Qwen3.8 27B 全面接入、`ollama launch` 生态扩展、元数据缓存降低延迟 |
| **LiteLLM** | 企业 LLM 网关/路由 | PR 20（昨日集中提交） | 无 | Auto Router 影子评估能力拓展、MCP 管理修复、Anthropic/OpenAI 协议兼容 |
| **Unsloth** | 微调/训练工具链 + 本地运行 | PR 10+ / Issue 12+ | **1 个**（v0.1.800-beta） | Qwen3.8-27B 本地运行与微调支持；AMD 全家桶稳定性短板集中爆发 |

> *仅统计日报中显式提到的 PR/Issue 条目，实际数量可能更高。vLLM 与 SGLang 的 Issue 讨论密度显著高于其他项目。

**活跃度结论**：vLLM 与 SGLang 在正确性修复和硬件适配上投入最大；llama.cpp 以高频迭代（11 releases/日）维持快速响应；LiteLLM 处于集中 PR 提交后的审查消化期；Ollama 与 Unsloth 聚焦产品层能力扩展。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4 系列** | ROCm 支持追踪、SM120 Sparse MLA 修复（PR）、Flash ROCm 长上下文问题未修 | GB200 启动崩溃已关、稀疏注意力非法内存访问待修、TRT-LLM 融合算子开发中 | Flash 长对话退化（Metal）、prefill 后 RPC 崩溃 | 原生不支持（经 `ollama launch dsh` 走 Harness） | 不支持 |
| **Kimi-K3** | ROCm torch.compile、RecoverSSM、DCP prefix cache | 显式 SiTU 激活、PP8 PD 部署有 TTFT 异常 | 新模型 PR 进行中（KDA+MLA 混合架构） | 不支持 | 不支持 |
| **Qwen3.8 27B** | 未提及 | DGX Spark 单卡验证通过 | 未提及 | **v0.32.12 正式支持**（GGUF+MLX） | **v0.1.800-beta 支持**（17GB RAM 可跑） |
| **MiniMax-Text-01/M1** | 未提及 | 未提及 | **已合并**（lightning attention） | 未提及 | 未提及 |
| **Nemotron Voicechat S2S** | 此前已支持 | **新增支持（PR）** | 未提及 | 未提及 | 未提及 |

**竞速结论**：**vLLM 领跑 DeepSeek-V4/Kimi-K3 的复杂适配**（ROCm、Sparse MLA、DCP 等），是重型模型的"试验场"；**SGLang 紧随其后**，覆盖更广的硬件后端，但稳定性问题同样突出；**llama.cpp 在轻量新架构引入上最敏捷**（MiniMax 合并速度最快），适合快速体验新模型；**Ollama + Unsloth 组合将 Qwen3.8 做到了"开箱即用"**，是本地部署最平滑的路径。

## 4. 性能优化前沿

| 方向 | 重点内容 | 代表项目 |
|---|---|---|
| **算子融合与 kernel 优化** | SYCL q4_K dense FFN 三算子融合（t/s +2.8%）、gated-delta-net state writeback 融合、TRT-LLM 稀疏注意力融合（norm+RoPE+fp8 store）、DSA RoPE 重构削减 concat | llama.cpp、SGLang |
| **投机解码/混合架构** | MTP 部分 offload 修复（3.5→可接受 token/s）、EAGLE3/DSpark/DFlash 与 PP 兼容解除硬限制、spec decode 多项 bugfix | vLLM、Unsloth |
| **KV cache 与量化** | SYCL TILE 量化 KV decode（decode +42%~+169%）、量化 KV cache 在 ROCm 下引发工具调用中断（隐患） | llama.cpp、Ollama |
| **多级缓存与路由** | HiCache+Mooncake 缓存命中率波动、Auto Router 影子评估（多密钥、反向评估）、Postgres 缓存计划强制重建 | SGLang、LiteLLM |
| **批处理与调度** | ViT Full CUDA Graph（RFC）、CUDA tensor 权重预取（PoC）、diffusion cache-DiT 参数调优 | vLLM、llama.cpp、SGLang |
| **硬件适配（非 NVIDIA）** | ROCm batch invariance、AMD MXFP4 在线量化、Intel Arc 全系列优化、NPU LTX-2 推理优化 | vLLM、SGLang、llama.cpp |

**总体判断**：优化火力集中在 **① 新架构（Mamba/GDN/稀疏注意力）的 kernel 落地；② 消费级/非 NVIDIA 硬件的性能追平；③ 服务层围绕缓存与路由的确定性优化**。vLLM 和 SGLang 聚焦大规模分布式场景的 kernel 覆盖，llama.cpp 在单机边缘场景的算子优化上有独到进展（SYCL 是最大亮点），LiteLLM 则从网关视角做路由与成本优化。

## 5. 分层定位差异

| 层次 | 项目 | 核心服务对象 | 今日动态中的典型体现 |
|---|---|---|---|
| **推理引擎（在线/离线）** | vLLM、SGLang | 大规模线上服务、多机多卡部署 | 均深度绑定 DeepSeek-V4/Kimi-K3 适配，追求吞吐与正确性 |
| **本地运行时（离线/边缘）** | llama.cpp | 单机 GGUF 推理、边缘设备 | 高频迭代 + SYCL/Metal 优化，关注个人工作站与老旧 GPU |
| **本地部署与 Agent 入口** | Ollama | 个人开发者/小团队、本地 Agent | 通过 `ollama launch` 整合 DeepSeek Harness/Muse Code，成为统一模型网关 |
| **LLM 网关/PaaS** | LiteLLM | 企业级多模型/多 provider 路由 | Auto Router 影子评估、MCP 管理、成本归属，是"网关"而非"引擎" |
| **训练/微调 + 本地运行** | Unsloth | 微调开发者和本地部署用户 | 提供从"微调"到"本地运行"到"Agent 接入"的一体化工具链，Studio 产品化明显 |

**关键差异**：vLLM/SGLang 竞争的是**服务化场景下的吞吐天花板**；llama.cpp 竞争的是**单机效率与硬件兼容广度**；Ollama 抢占的是**本地 AI 的产品入口**（越来越像"本地模型的操作系统"）；LiteLLM 占领的是**企业流量调度与治理层**；Unsloth 则把"训练到部署"的闭环作为差异化方向，与 Ollama 的本地运行时正在形成竞合关系。

## 6. 值得关注的趋势信号

### 行业趋势

1. **"新模型上引擎"成为竞赛主战场，但正确性远未跟上**：DeepSeek-V4、Kimi-K3 在 vLLM/SGLang 上已有大量适配，但长上下文静默损坏、CUDA Graph 乱码、worker crash 等严重问题尚未解决。**新模型发布的硬件需求已超出主流引擎的稳定支持范围**，生产环境存在较大技术债。

2. **硬件适配从"NVIDIA 优先"转向"全硬件覆盖"**：ROCm（MI350/MI325X）、消费级 Blackwell（SM120/SM121/RTX 50）、NPU（昇腾）、Metal、Vulkan、SYCL 同时成为优化对象。AMD 是当前最大短板（AOTriton 门控、VRAM 检测、hipblas.dll 缺失等），但社区投入力度在大幅提升。

3. **本地/边缘推理正在获得架构红利**：Qwen3.8-27B 在 17GB RAM 设备上可运行（Unsloth）、Qwen3.8-27B-FP8 单卡 DGX Spark 验证通过（SGLang），"小显存跑大模型"从宣传走向可复现。**17GB RAM 运行 27B 模型**是今日最值得关注的能力跃迁信号。

4. **Agent 工作负载已成为引擎优化的一等公民**：工具调用可靠性（Kimi-K3 日志、Qwen3.8 developer 指令修复）、`reasoning_effort` 贯通至模板层、输出预算过小时返回 200 而非 400（LiteLLM）、多级缓存的命中率波动（SGLang）——这些都是在为 Agent 场景的稳定性买单。

5. **多级缓存与路由的确定性成为服务层核心痛点**：HiCache+Mooncake 的 cache-hit rate 波动、Postgres 缓存计划导致 503、Redis 花费缓冲事务丢失——缓存引入的问题开始反噬稳定性，网关层面需要更健壮的兜底逻辑。

### 给 Agent/应用开发者的行动建议

- **避免在 AMD/消费级 Blackwell 上直接生产 DeepSeek-V4**：vLLM 未修复的长上下文损坏、SGLang 的稀疏注意力非法内存访问、llama.cpp 的 Metal 退化，均无 fix PR。建议优先使用 NVIDIA 旗舰卡 + 关闭 CUDA Graph，或等待相关 issue 关闭。
- **工具调用链路需回归验证**：Kimi-K3 的 tool call parsing error（SGLang 已有修复 PR）、LiteLLM 的 gpt-5.6 reasoning_effort 兼容问题（已关闭）、Ollama 的 Qwen3.8 developer 指令修复（v0.32.13）——直接决定 Agent 循环是否退化，升级后务必跑一遍完整 tool-use 流程。
- **利用好 OpenAI 兼容层的差异**：`/v1/responses` 的 `created_at` 类型不一致（SGLang）、`temperature` 参数被忽略（Ollama）、`response_format` 非法时 400 vs 500（vLLM 改进中）——客户端需要做防御性处理，不能假设各网关行为一致。
- **本地部署选型参考**：个人开发者可优先考虑 Ollama（Qwen3.8 27B 已开箱即用）；需要底层控制权选 llama.cpp（MiniMax-Text-01 已可跑）；需要微调 + 部署一体选 Unsloth；需要大规模服务化选 vLLM/SGLang，但务必先确认相关 issue 状态。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 2026-08-15

## 今日速览
今日社区活跃度集中在 DeepSeek-V4 / Kimi-K3 在 ROCm 与消费级 Blackwell（SM12x）上的适配和正确性修复；Model Runner V2 生态继续补齐，speculative decoding 在 PP、offload 等场景下有多项 bugfix 落地。需关注 DeepSeek-V4-Flash 在 ROCm 上的长上下文静默损坏问题（尚无修复 PR）。

---

## 版本发布与破坏性变更
无新 Release 发布。需注意以下行为变更：

- **FA4 head-dim 256 临时禁用**（[PR #52050](https://github.com/vllm-project/vllm/pull/52050)）：FA4 在 Blackwell SM100 上不支持 `seqused_q/k`，vLLM decoder attention 暂时回退到 FA2。仅影响 head-dim=256 的 Blackwell 场景，FA4 在其他 head-dim 下保持启用。
- **DSpark 未量化 draft 启动崩溃修复**（[PR #52396](https://github.com/vllm-project/vllm/pull/52396)）：`hf_overrides` 为非 dict 时不再 raise，消除了 DSpark + 未量化 draft 在引擎初始化时的崩溃。

---

## 新模型与硬件支持

- **Kimi-K3**：
  - ROCm 启用 `torch.compile`，使 AITER 后置融合 kernel（`fused_qk_rmsnorm`、`allreduce_fusion` 等）可用（[PR #52190](https://github.com/vllm-project/vllm/pull/52190)）。
  - 新增 RecoverSSM 状态恢复路径，配合 DSpark KDA 解码使用（`--use-replayssm`，[PR #51855](https://github.com/vllm-project/vllm/pull/51855)）。
  - DCP 支持 hash-aligned partial prefix cache hit，并修复 MRV2 block-table 几何问题（[PR #50493](https://github.com/vllm-project/vllm/pull/50493)）。
- **DeepSeek-V4**：
  - ROCm 支持与优化持续追踪中，覆盖 mHC/HCA/CSA/MoE/MTP 等模块（[Issue #41820](https://github.com/vllm-project/vllm/issues/41820)）。
  - Sparse MLA 在 SM120 上的端到端修复（plain decode / MTP / DSpark 三种模式）已提交 PR（[PR #51538](https://github.com/vllm-project/vllm/pull/51538)）。
- **ROCm batch invariance 支持**（[PR #52231](https://github.com/vllm-project/vllm/pull/52231)）：基于 `VLLM_BATCH_INVARIANT=1` 启用，同时改进 all-reduce/reduce-scatter。
- **CUDA 13.4rc1 预发布镜像管线**（[PR #52379](https://github.com/vllm-project/vllm/pull/52379)）：为 Rubin `sm_107` 准备 CUDA 13.4 容器镜像。
- **ModelRunnerV2 支持 prompt embeds**（[PR #42963](https://github.com/vllm-project/vllm/pull/42963)）。

---

## 性能与优化

- **ViT Full CUDA Graph（RFC）**（[Issue #38175](https://github.com/vllm-project/vllm/issues/38175)）：跟踪 Qwen3-VL / GLM-V / Kimi K2.5 等 MLLM 的 ViT encoder 大量 kernel 启动开销优化，尚未落地。
- **DeepGEMM SM 12.x 覆盖缺口**（[Issue #41063](https://github.com/vllm-project/vllm/issues/41063)）：梳理 DeepSeek-V4-Flash 在 RTX 50 / GB10 上 end-to-end 运行所需的 kernel 补全清单。
- **DeepSeek-V4-Pro ROCm MTP 调优**（[Issue #51853](https://github.com/vllm-project/vllm/issues/51853)）：MI325X TP8 上 agentic-trace 负载吞吐波动大，ROCm kernel 尚未调优。
- **Qwen3.5-35b-a3b DFlash 性能不佳**（[Issue #50722](https://github.com/vllm-project/vllm/issues/50722)）：dflash 接受长度 5–6，但整体吞吐仍偏低，需要进一步定位。

---

## 稳定性与回归

按严重程度排列：

**A. 崩溃 / 内存错误**

- **DeepSeek-V4-Flash ROCm / MI325X worker crash**（[Issue #48266](https://github.com/vllm-project/vllm/issues/48266)）：序列跨 2048 token 时 GPU memory access fault，涉及 sparse_attn_indexer + FP8 KV cache，TP=4。无 fix PR。
- **Mamba-2 Triton kernel SM121 非法指令崩溃**（[Issue #37431](https://github.com/vllm-project/vllm/issues/37431)）：DGX Spark（SM121）异步模式触发 `cudaErrorIllegalInstruction`，设置 `CUDA_LAUNCH_BLOCKING=1` 可规避。无 fix PR。
- **NVFP4 Marlin EngineDeadError**（[Issue #49926](https://github.com/vllm-project/vllm/issues/49926)）：量化推理引擎死亡。无 fix PR。
- **MTP spec decode 负 CUDA graph 显存估算（-35.69 GiB）**（[Issue #44740](https://github.com/vllm-project/vllm/issues/44740)）：导致 KV cache 过度分配并 OOM，影响 Qwen3.6-35B + MTP on GB10。无 fix PR。

**B. 静默错误 / 正确性**

- **DeepSeek-V4-Flash ROCm 长提示词检索静默损坏**（[Issue #52109](https://github.com/vllm-project/vllm/issues/52109)）：提示词约 4–5k token 后出现 silent retrieval corruption，AITER sparse indexer 相关。无 fix PR。
- **DeepSeek-V4 CUDA Graph 并发相同请求输出乱码**（[Issue #41331](https://github.com/vllm-project/vllm/issues/41331)）：开启 CUDA Graph 后并发相同输入的推理结果不一致。无 fix PR。
- **DeepSeekV4-Flash inline system messages 回归**（[Issue #46710](https://github.com/vllm-project/vllm/issues/46710)）：PR #46025 引入三种 chat_template 行为路径，导致 inline system message 处理错误。无 fix PR。
- **Mamba-2/GDN 混合模型 prefix caching 不生效**（[Issue #51250](https://github.com/vllm-project/vllm/issues/51250)）：Qwen3.6-35B-A3B 开启 prefix caching 后未生效。无 fix PR。

**C. 性能回归 / 环境问题**

- **SM100 FA4 head-dim 256 回退 FA2**（[PR #52050](https://github.com/vllm-project/vllm/pull/52050)）：临时性能回退，等待上游支持。
- **ImportError: libcudart.so.13 缺失**（[Issue #52300](https://github.com/vllm-project/vllm/issues/52300)）：vLLM 0.21.0 + CUDA 12.6 环境下的依赖问题。

**D. 已有修复 PR（待合入）**

- DSV4 sparse MLA 七项缺陷修复，覆盖 plain decode / MTP / DSpark（[PR #51538](https://github.com/vllm-project/vllm/pull/51538)）。
- Spec decode `bad_words` draft-prefix 匹配 off-by-one 修复（[PR #52311](https://github.com/vllm-project/vllm/pull/52311)）。
- Mooncake Store Mamba `align` 模式保存精确边界状态修复（[PR #51358](https://github.com/vllm-project/vllm/pull/51358)）。
- `max_offload_tokens` 低于 partial-tail 边界时的断言修复（[PR #52397](https://github.com/vllm-project/vllm/pull/52397)）。
- ROCm `supports_mm_prefix` 错误返回 True 的修复（[PR #52395](https://github.com/vllm-project/vllm/pull/52395)）。
- Spec decode short_conv（LFM2）模型修复（[PR #50272](https://github.com/vllm-project/vllm/pull/50272)）。

---

## 对应用开发者的意义

- **API 错误语义改进**：结构化输出 validator 将改抛 `VLLMValidationError` 而非裸 `ValueError`，非法 `response_format` 会以 400 而非 500 返回，提升 LLM 网关集成体验（[PR #52394](https://github.com/vllm-project/vllm/pull/52394)）。
- **EAGLE3-style spec decode 与 pipeline parallel 兼容**：PR #50514 解除了 `eagle3` / `dflash` / `dspark` 在 PP 下的硬限制，支持更大规模多机部署（[PR #50514](https://github.com/vllm-project/vllm/pull/50514)）。
- **多实例部署建议显式指定 `--port`**：未设置端口时请求可能被随机路由到错误实例（[Issue #39762](https://github.com/vllm-project/vllm/issues/39762)）；社区已提出 bind-time 分配端口的 RFC（[Issue #51275](https://github.com/vllm-project/vllm/issues/51275)）。
- **生产环境风险提示**：DeepSeek-V4 系列在 ROCm / 消费级 Blackwell 上仍有多个未修复的正确性问题（长上下文损坏、CUDA Graph 乱码、worker crash）。生产使用建议优先追踪上述 issue，或暂时使用 CUDA 旗舰卡 + 关闭 CUDA Graph 作为规避手段。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-15

## 今日速览

社区热度集中于 **Router GEMM 精度一致性**（NPU/ROCm/确定性推理三线并报）与 **DeepSeek-V4 系列稳定性**（GB200 启动崩溃、稀疏注意力非法内存访问）。硬件适配方面，NPU/ROCm/Metal 后端均有实质 PR 推进，其中 AMD MXFP4 在线量化与 Nemotron Voicechat 支持是亮点。CI 治理方面，跟踪显示当前 3 个 broken、11 个 flaky，另有 671 个历史失败已被修复。

---

## 版本发布与破坏性变更

**（今日无新版本 Release）**

值得关注的变更提案：

- **RFC：移除 torchao 集成（`--torchao-config`）** — 该特性自 2026-04-19 起所有参数均抛 `ImportError`，且已无上游维护；RFC 提议直接删除，避免误导用户。
  [issue #34295](https://github.com/sgl-project/sglang/issues/34295)
- **RFC：MLX runner-stub 拆分方案更新** — 基于 Torch/MLX 互操作的进展，提议保留单一标准 SRT 路径，将 MLX 区域改为导出整个模型，消除 stub 问题。
  [issue #32321](https://github.com/sgl-project/sglang/issues/32321)

---

## 新模型与硬件支持

- **Qwen3.8-27B-FP8 在 DGX Spark（GB10/SM121）验证通过** — `mem-fraction-static 0.70` 下单卡运行成功，为 Apple Silicon 之外的又一小型本地部署选项提供参考。
  [issue #34872](https://github.com/sgl-project/sglang/issues/34872)
- **NemotronLabs Voicechat S2S 支持（PR）** — 该语音对话模型此前仅支持 vLLM，本次 PR 为 SGLang 补充部署路径。
  [PR #34873](https://github.com/sgl-project/sglang/pull/34873)
- **AMD 在线 MXFP4 量化（PR，4/N）** — 支持加载 ModelOpt/Quark 的 NVFP4 checkpoint，在加载时将权重反量化并重量化为 MXFP4，以匹配 AMD MI355x 等硬件的高效推理路径，通过 `--quantization` 启用。
  [PR #29328](https://github.com/sgl-project/sglang/pull/29328)
- **Kimi-K3 MegaMoE 显式 SiTU 激活（PR）** — 移除激活 clamp 哨兵，直接以 `activation="situ"` 调用 DeepGEMM，并补充 CPU 单元测试保证调用契约。
  [PR #34883](https://github.com/sgl-project/sglang/pull/34883)
- **AMD MI350 系列 M3 性能改进（PR，进行中）** — 针对 MI350 的 M3 模型推理做算子级调优。
  [PR #34014](https://github.com/sgl-project/sglang/pull/34014)

---

## 性能与优化

- **TRT-LLM DeepSeek-V4 稀疏注意力融合算子（PR，进行中）** — 将 norm、RoPE 与 uniform fp8 store 融合为一个 JIT kernel，减少显存读写。
  [PR #32975](https://github.com/sgl-project/sglang/pull/32975)
- **NPU 上 LTX-2/2.3 推理优化（PR）** — 针对昇腾 NPU 后端做兼容性与性能优化。
  [PR #34722](https://github.com/sgl-project/sglang/pull/34722)
- **Qwen3.5 FP8 GB300 nightly 性能测试裁剪（PR）** — 精简冗余 batch size 组合（TP4+MTP 只跑 bs 1/4，TP4+DP4+DPA+MTP 只跑 bs 16），缩短夜间回归时间。
  [PR #34882](https://github.com/sgl-project/sglang/pull/34882)
- **GPT-OSS 吞吐性能纳入 ROCm 7.2 nightly（PR）** — 针对 ROCm 7.2 + Triton 3.7 的性能回退，补上此前缺失的 AMD 侧吞吐覆盖。
  [PR #34645](https://github.com/sgl-project/sglang/pull/34645)
- **Diffusion：MiniMax-H3 quality=high 在 8×B300 上验证（PR）** — 为 8×B300 重新调优 Cache-DiT 计划参数（`(4, 0.24, 3)`），4×H200 保持原保守参数。
  [PR #34841](https://github.com/sgl-project/sglang/pull/34841)
- **SGLang Auto Tuner Roadmap（持续更新）** — 面向 MoE/attention/allreduce 的 kernel 自动调参与调度启发式选择，仍处规划阶段。
  [issue #13363](https://github.com/sgl-project/sglang/issues/13363)

---

## 稳定性与回归

按影响程度排序。多数 Bug 尚无对应 fix PR，已标注状态。

| 严重程度 | 问题 | 状态 |
|---|---|---|
| 严重 | **DeepSeek-V4-Flash 在 GB200 启动时 TVM FFI 重复注册导致 abort** | 已关闭（可能已绕过或修复）[issue #34858](https://github.com/sgl-project/sglang/issues/34858) |
| 严重 | **DeepSeek-V4 稀疏注意力 indexer（`fp8_paged_mqa_logits`）长上下文非法内存访问** | Open，待修复 [issue #34718](https://github.com/sgl-project/sglang/issues/34718) |
| 高 | **PP8 PD 分离部署下 Kimi-K3 出现 ~30s 与负载无关的 TTFT 下限**（prefill 节点使用 pipeline parallelism 时） | Open，影响在线交互场景 [issue #34815](https://github.com/sgl-project/sglang/issues/34815) |
| 高 | **FlashInfer `RadixTopKRenormProbKernel_MultiCTA` CUDA coredump** | Open [issue #32283](https://github.com/sgl-project/sglang/issues/32283) |
| 中 | **Diffusion attention 后端 fallback 变更导致多数模型出错** — 疑似近期回归 | Open [issue #34389](https://github.com/sgl-project/sglang/issues/34389) |
| 中 | **`SGLANG_SIMULATE_ACC_LEN` 导致 detokenization 退化 O(n²)** — `predict.fill_(100)` 触发 byte-fallback token，增量解码偏移无法推进 | Open [issue #34740](https://github.com/sgl-project/sglang/issues/34740) |
| 中 | **Router GEMM 精度问题三连报** — NPU 上返回 bf16、ROCm 上 expert correction bias 被错误 cast 为 bf16、确定性推理模式下未保持 fp32 输出 | Open：[#34861](https://github.com/sgl-project/sglang/issues/34861) / [#34857](https://github.com/sgl-project/sglang/issues/34857) / [#34758](https://github.com/sgl-project/sglang/issues/34758) |
| 低 | **`/v1/responses` 流式与 non-streaming 的 `created_at` 类型不一致**（float vs int） | Open [issue #34716](https://github.com/sgl-project/sglang/issues/34716) |
| 低 | **XPU 上 Qwen3.5 GDN + speculative decode 报错** `unexpected keyword argument 'intermediate_conv_window'` | Open [issue #34720](https://github.com/sgl-project/sglang/issues/34720) |
| 低 | **hybrid-mamba + NEXTN 投机解码 + lazy buffer 模式崩溃**（`mamba_next_track_idx is None`） | Open [issue #34786](https://github.com/sgl-project/sglang/issues/34786) |

**已就绪的修复类 PR：**

- **修复模型加载器被自动量化路由覆盖** — 类值 `load format` 现在会在 AutoRound/ModelOpt 路由前被解析。
  [PR #34880](https://github.com/sgl-project/sglang/pull/34880)
- **修复 LoRA 运行时校验**：字符串 prompt 视为单请求；`assert` 改为显式 `ValueError`。
  [PR #34885](https://github.com/sgl-project/sglang/pull/34885)
- **修复 `BaseConnector` 信号处理语义**：恢复先前 signal disposition、退出前清理临时目录、显式终止容器 PID 1。
  [PR #34884](https://github.com/sgl-project/sglang/pull/34884)

---

## 对应用开发者的意义

- **工具调用可靠性**：Kimi-K3 用户在 agentic coding 场景每天约 190 次 `Tool call parsing error`，根因是原生格式输出在 required tool choice 下被错误 JSON-decode。修复 PR 已提交，Agent 应用升级后可避免 agent loop 退化。
  [PR #34881](https://github.com/sgl-project/sglang/pull/34881)
- **API 兼容性提醒**：`/v1/responses` 的 `created_at` 在流式（float）与非流式（int）之间类型不一致，客户端如果对类型敏感需要做防御性处理。
  [issue #34716](https://github.com/sgl-project/sglang/issues/34716)
- **缓存命中率观察**：HiCache L1+L2+Mooncake(SSD) 路径存在 cache-hit rate 波动问题；SSD 容量充足（2TB 无驱逐）时仍出现不一致的命中率，使用多级缓存时需关注。
  [issue #33984](https://github.com/sgl-project/sglang/issues/33984)
- **部署选型参考**：Qwen3.8-27B-FP8 单卡 DGX Spark 验证通过，可复现；GLM-5.2 单节点 17 组 benchmark 已在 v0.5.15 上重新验证并在 cookbook 同步更新。
  [issue #34872](https://github.com/sgl-project/sglang/issues/34872) · [PR #31609](https://github.com/sgl-project/sglang/pull/31609)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-15

## 1. 今日速览

过去 24 小时合并并发布了 11 个迭代版本（b10425→b10435）。核心进展：① Jinja 模板引擎 quadratic 复杂度问题修复，同时 `reasoning_effort` 开始贯通至模板层（b10434/b10435）；② SYCL 后端连续落地算子融合，dense FFN 与 gated-delta-net 均有可量化收益；③ 新模型支持突破，MiniMax-Text-01/M1 支持已合并，Kimi-K3 正在推进。稳定性方面，Intel A770 上 SYCL 完全崩溃（#27063）与 Windows ROCm 7.14 缺 hipblas.dll（#26996）是最新值得关注的问题。

## 2. 版本发布与破坏性变更

过去 24 小时发布 11 个版本，无已知破坏性变更，重点如下：

| 版本 | 要点 |
|---|---|
| **[b10435](https://github.com/ggml-org/llama.cpp/releases/tag/b10435)** | 修复 Jinja `gather_string_parts` 二次复杂度（[#27034](https://github.com/ggml-org/llama.cpp/pull/27034)），消除模板渲染性能拐点 |
| **[b10434](https://github.com/ggml-org/llama.cpp/releases/tag/b10434)** | Chat 模板支持 `reasoning_effort`，OpenAI Chat Completions 参数贯通至 Jinja |
| **[b10431](https://github.com/ggml-org/llama.cpp/releases/tag/b10431)** | `ggml_ssm_scan` 增加 recurrent state rollback（CUDA），为 Nemotron 混合模型服务 checkpoint 恢复铺路 |
| **[b10430](https://github.com/ggml-org/llama.cpp/releases/tag/b10430)** | 允许虚拟 iGPU 设备（[#26953](https://github.com/ggml-org/llama.cpp/pull/26953)），提升设备枚举灵活性 |
| **[b10429](https://github.com/ggml-org/llama.cpp/releases/tag/b10429)** | Server 在 `llama_decode` 期间不再阻塞 `/metrics`、`/slots` 请求（[#27041](https://github.com/ggml-org/llama.cpp/pull/27041)），降低监控延迟尖刺 |

其余版本为 ggml 同步（b10433）、测试路径清理（b10428）、WASI 强制单线程（b10426）等。需留意 b10429 改变了 server 内部 worker 调度位置，若线上依赖 `/slots` 轮询做健康检查，建议观察响应时延变化。

## 3. 新模型与硬件支持

- **MiniMax-Text-01 / MiniMax-M1**：PR [#27018](https://github.com/ggml-org/llama.cpp/pull/27018) 已合并，新增 lightning attention 模型支持，关闭长期 issue [#11290](https://github.com/ggml-org/llama.cpp/issues/11290)。对老模型归档场景有实际意义，量化/转换链路已接入。
- **Kimi-K3**：PR [#26185](https://github.com/ggml-org/llama.cpp/pull/26185) 进行中，新增混合 KDA（linear）+ MLA（full）注意力文本模型，附带 cross-layer residual attention、latent MoE 等架构特性。
- **虚拟 iGPU 设备**：b10430 允许在配置层声明虚拟 iGPU，容器/虚拟化场景下的设备发现更灵活。
- **SSM 循环状态回滚**：b10431 为 CUDA 的 `ggml_ssm_scan` 增加状态回滚能力，CPU 路线后续 PR 跟进。
- **Laguna S 2.1 DFlash 支持请求**：issue [#26669](https://github.com/ggml-org/llama.cpp/issues/26669) 仍在开放，尚未进入实现阶段。

## 4. 性能与优化

已合并锦上添花（SYCL 三条 + 模板修复）：

- **Jinja 渲染二次复杂度修复**（[#27034](https://github.com/ggml-org/llama.cpp/pull/27034) → b10435）：定位到 `gather_string_parts` 中 `vector::erase` 与 `string::append` 的双重二次开销，修复后长 Prompt 模板拼接成本显著降低。
- **SYCL q4_K dense FFN 三算子融合**（[#26779](https://github.com/ggml-org/llama.cpp/pull/26779) → b10427）：`mul_mat(gate)+mul_mat(up)+GLU` 融合为单次 q4_K reorder mat-vec。Arc Pro B70 / tg128 实测：Qwen2.5-3B Q4_K_M **154.18→158.53 t/s（+2.8%）**，Gemma-2-2b-it **162.45→166.x t/s（+2.5% 左右）**。
- **SYCL gated-delta-net state writeback 融合**（[#26643](https://github.com/ggml-org/llama.cpp/pull/26643) → b10425）：移植 CUDA 写回融合逻辑，Qwen3.6-27B Q4_K-M 在 Arc Pro B70 上 tg128 由 23.91 t/s 起有持续提升。
- **SYCL TILE 量化 KV decode**（[#26689](https://github.com/ggml-org/llama.cpp/pull/26689)，进行中）：gating 调整让 q4_0/q8_0 KV 从 VEC 内核切换到 TILE 内核，BMG 上 decode **+42%~+169%**（Qwen3.6-35B、Gemma-4-26B/12B，32K/118K ctx），零回归。

值得关注的进行中优化：

- **DSA RoPE 重构**（[#27091](https://github.com/ggml-org/llama.cpp/pull/27091)）：移除大量 `ggml_concat`，通过调整 `freq_factors` 输入布局降低大张量拼接开销。
- **CUDA decode 切换点调优**（[#26079](https://github.com/ggml-org/llama.cpp/pull/26079)）：将 `MVVQ→MMQ` 的编译期固定阈值改为按硬件/量化类型可配。
- **CUDA tensor 权重预取**（[#21067](https://github.com/ggml-org/llama.cpp/pull/21067)）：PoC 阶段，允许当前层计算与下一层权重 H2D 拷贝重叠。
- **Neoverse V1/V2 的 `-fa auto` 修正**（[#27092](https://github.com/ggml-org/llama.cpp/pull/27092)）：在 i8mm+SVE 的 AWS Graviton3/4 上自动关闭 tiled CPU flash-attention，避免其相对直接路径更慢。

## 5. 稳定性与回归

按严重程度排列（✅ 表示已有 fix PR，⚠️ 表示尚未解决）：

**崩溃/完全不可用**

- **SYCL 在 Intel A770 上完全崩溃**（[#27063](https://github.com/ggml-org/llama.cpp/issues/27063)）：任意模型均触发，B60 正常，定位疑似 A770 专属的图编译路径回归。⚠️ 无 fix。
- **SIGSEGV 空指针跳转（GPU offload）**（[#27046](https://github.com/ggml-org/llama.cpp/issues/27046)）：Intel Lunar Lake iGPU（Arc 140V）`resolve_fused_ops` 误报导致空指针，已在 Gemma-4/Qwen2 等无关架构上复现。⚠️ 无 fix。
- **Gemma4Assistant 上下文初始化失败**（[#24343](https://github.com/ggml-org/llama.cpp/issues/24343)）：`llama_init_from_model` 失败，32 👍 影响面较大。⚠️ 无 fix。
- **llama-server CUDA + Qwen3.6-27B 崩溃**（[#23210](https://github.com/ggml-org/llama.cpp/issues/23210)）：Windows + RTX 5060 Ti 环境复现。⚠️ 无 fix。

**发行包/构建问题**

- **Windows ROCm 7.14 缺 hipblas.dll**（[#26996](https://github.com/ggml-org/llama.cpp/issues/26996)）：GPU 无法检测，`--list-devices` 为空。⚠️ 无 fix，建议暂退回 b10373 或 7.6 版本。
- **Windows ROCm 最新版不使用 GPU**（[#26964](https://github.com/ggml-org/llama.cpp/issues/26964)）：与上一条同源概率高。⚠️ 无 fix。

**安全**

- **ggml-rpc 未认证空指针解引用**（[#25299](https://github.com/ggml-org/llama.cpp/issues/25299)）：node id 0 导致 `graph_compute()` 崩溃，外部可触发。⚠️ 无 fix，暴露 RPC 端口需谨慎。

**模型正确性热点**

- **Qwen3.6-27B 强制全量 prefill**（[#22746](https://github.com/ggml-org/llama.cpp/issues/22746)）：126 评论、31 👍，社区热度最高，已 CLOSED（疑似 stale 关闭）但缓存失效根因未公开解决。⚠️ 无 fix。
- **视觉模型 KV cache 保存失败**（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)）：`/slots/3?action=save` 对视觉模型不生效，38 评论。⚠️ 无 fix。
- **Qwen3-VL image embedding 不工作**（[#25088](https://github.com/ggml-org/llama.cpp/issues/25088)）：Vulkan 后端。⚠️ 无 fix。
- **Gemma-4 MTP 在 Vulkan 上崩溃**（[#24492](https://github.com/ggml-org/llama.cpp/issues/24492)）：`pre-allocated tensor cannot run operation NONE`。⚠️ 无 fix。
- **DeepSeek-V4-Flash 长对话退化为重复并泄漏特殊 token**（[#26694](https://github.com/ggml-org/llama.cpp/issues/26694)）：Metal 后端，b10289/b10293 复现。⚠️ 无 fix。
- **DeepSeek V4 prefill 后 RPC worker 崩溃**（[#26746](https://github.com/ggml-org/llama.cpp/issues/26746)）：ROCm gfx1151，`GGML_OP_TOP_K` 处崩溃。⚠️ 无 fix。
- **80K+ 上下文 logits 全 NaN**（[#23606](https://github.com/ggml-org/llama.cpp/issues/23606)）：Qwen3.6-35B-A3B，已 stale 关闭。⚠️ 无 fix，超长 ctx 需谨慎。

**后端性能回归**

- **Vulkan 版本性能下降**（[#24066](https://github.com/ggml-org/llama.cpp/issues/24066)）：RX 6600 上多版本对比显示逐步劣化，39 评论；相关 [#24005](https://github.com/ggml-org/llama.cpp/issues/24005) 已 stale 关闭。⚠️ 无 fix。
- **Offloaded-MoE prefill 中 GPU 空闲**（[#25859](https://github.com/ggml-org/llama.cpp/issues/25859)）：RTX 3060 + Qwen3.6-3B 实测专家串行 H2D 拷贝成为瓶颈。⚠️ 无 fix。
- **Gemma-4 tg128 在 RTX 5060 Ti 上异常慢**（[#26674](https://github.com/ggml-org/llama.cpp/issues/26674)）：Blackwell 架构 decode 性能异常。⚠️ 无 fix。

## 6. 对应用开发者的意义

- **`reasoning_effort` 现可直达 Jinja 模板**（b10434）：调用 OpenAI 兼容 `/chat/completions` 时传入的 `reasoning_effort` 会写入模板上下文。构建 Agent/推理链的开发者可据此动态切换模型思考深度（如 short/long CoT），无需自行维护 Prompt 覆盖逻辑。注意：需确认 `chat_template` 是否已适配该字段，自定义模板时建议显式 `{{ reasoning_effort }}`。
- **Server 监控不再被 decode 阻塞**（b10429）：长 prefill/decode 期间 `/metrics` 与 `/slots` 仍可即时响应，对自建网关的主动健康检查、容量调度更友好，也降低了 Prometheus 抓取超时导致误告警的概率。
- **新模型选择增加**：MiniMax-Text-01/M1 已可跑 GGUF，Kimi-K3 可提前预研；两者均为混合注意力架构，服务端 `--no-mmap`、MTP 等特性可能需要单独验证。
- **需要规避的已知坑**：
  - Windows + AMD 用户建议锁定 b10373 之前的 ROCm 构建，等待 hipblas.dll 修复（#26996）。
  - 视觉模型（Qwen3-VL/Granite4 Vision）的 KV cache save/restore 不可用，Agent 的多轮检索/记忆持久化方案需绕开该 API。
  - Qwen3.6-27B 若出现缓存未命中导致全量重处理的性能陡降，可确认是否命中 [#22746](https://github.com/ggml-org/llama.cpp/issues/22746) 的 cache 失效路径。
  - SYCL 用户在 Intel A770 上建议暂停升级，等待崩溃修复；Arc Pro B70 可正常使用。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-15

## 今日速览

昨日连发三个版本（v0.32.11→v0.32.13），核心围绕两个方向：**Qwen 3.8 27B 模型全面接入**（含 Apple Silicon 优化与开发者指令支持）以及 **`ollama launch` 生态扩展**（新增 DeepSeek Harness 与 Meta Muse Code）。与此同时，社区提交了多个高价值 PR，包括 `/api/embed` 增加 `normalize` 选项、多文件 GGUF 拉取支持、以及模型元数据缓存（消除每请求 ~300ms 开销），质量与性能优化正在快速推进。

## 版本发布与破坏性变更

- **v0.32.13** — 修复 Qwen3.8 的 developer 指令处理。[对比 v0.32.12](https://github.com/ollama/ollama/compare/v0.32.12...v0.32.13)
- **v0.32.12** — 新增 **Qwen 3.8 27B** 模型支持；针对 Apple Silicon 做了专门优化（最大化内存带宽利用）。[Release 说明](https://github.com/ollama/ollama/releases/tag/v0.32.12)
- **v0.32.11** — 两项集成更新：`ollama launch dsh` 支持 DeepSeek Harness；`ollama launch muse` 支持 Meta 的 Muse Code（agentic coding CLI）。OpenAI 兼容端点也有更新（变更未完整披露）。[Release 说明](https://github.com/ollama/ollama/releases/tag/v0.32.11)

⚠️ **注意**：v0.32.8 的 Docker 镜像曾出现发布延迟（Issue #17668），建议部署流水线对镜像拉取增加重试与超时，避免因镜像未同步导致的上线故障。

## 新模型与硬件支持

- **Qwen 3.8 27B** 正式支持（v0.32.12），已有 GGUF 与 MLX 两种形态；MLX 构建针对 Apple Silicon 优化。
- **DeepSeek Harness** 与 **Meta Muse Code** 通过 `ollama launch` 接入。
- 社区 PR 为 Ollama 增加 **多文件 GGUF 模型从 Hugging Face 拉取**的能力（[PR #17743](https://github.com/ollama/ollama/pull/17743)），解决 `ollama pull hf.co/...` 对分片模型失败的问题，目前尚未合入。
- 新模型文件引入 **Qwen3.8 renderer**，支持 reasoning-effort 与 preserved-thinking 语义，以及 safetensors 导入时自动检测模板标记（[PR #17745](https://github.com/ollama/ollama/pull/17745)）。

## 性能与优化

- **模型元数据缓存（PR #17752）**：每次 chat/generate 请求都会重复读取 GGUF 元数据，导致约 **300ms/请求** 的额外开销。该 PR 实现了元数据与能力缓存，并在模型 manifest 变化时自动失效，可显著降低短请求延迟。[PR #17752](https://github.com/ollama/ollama/pull/17752)
- **MLX 可重复模型移植工作流（PR #15530）**：仍处 draft 阶段，旨在为 MLX 引擎的模型适配建立标准流程。[PR #15530](https://github.com/ollama/ollama/pull/15530)

## 稳定性与回归

按严重程度排列：

1. **CUDA illegal memory access（qwen3.6:35b）** — prompt 长度 ≥684 tokens 时确定性崩溃，14 tokens 正常；定位为 0.31.2→0.32.9 之间的回归。[Issue #17740](https://github.com/ollama/ollama/issues/17740)
2. **AMD Strix Halo VRAM 检测回归** — 容器部署下 0.30+ 仅识别 2GB VRAM（此前版本正常识别系统内存），直接影响大模型加载。[Issue #16462](https://github.com/ollama/ollama/issues/16462)
3. **AMD Radeon 780M Vulkan 后端崩溃** — 0.32.11 在较大模型上触发 `vk::Queue::submit: ErrorDeviceLost`，Vulkan 后端稳定性需关注。[Issue #17748](https://github.com/ollama/ollama/issues/17748)
4. **SillyTavern 文本补全空响应** — 0.32.8+ 回归，回退到 0.32.7 可恢复；Ollama 侧未收到任何请求，需前后端协同排查。[Issue #17700](https://github.com/ollama/ollama/issues/17700)
5. **Qwen3.8 系统消息位置校验导致 HTTP 500** — `ollama launch claude --model qwen3.8:27b` 时，非起始位置的 system 消息被拒绝。**已修复**：[PR #17757](https://github.com/ollama/ollama/pull/17757)（容忍非 leading system 消息，改为告警而非报错）。
6. **Qwen3.8 MLX 拒绝 developer role** — `ollama launch codex` 无法使用 `qwen3.8:27b-mlx`。[Issue #17750](https://github.com/ollama/ollama/issues/17750)
7. **AMD ROCm 下量化 KV cache 导致生成中断** — qwen3.5/qwen3.6 架构在 ROCm 后端，q8_0/q4_0 KV cache 量化会导致工具调用中断，严重程度与量化精度相关。[Issue #17347](https://github.com/ollama/ollama/issues/17347)
8. **`/save` 命令报 "pull model manifest: file does not exist"** — nemotron-3.5-lightning 模型在本地 manifest 有效的情况下仍失败。[Issue #17735](https://github.com/ollama/ollama/issues/17735)
9. **`/api/embed` 强制归一化** — 旧版 `/api/embeddings` 不归一化，新版 `/api/embed` 默认归一化且无关闭选项。已有 PR：[#17747](https://github.com/ollama/ollama/pull/17747) 添加 `normalize` 字段（默认 `true`，保持向后兼容）。
10. **Ollama Cloud API 503** — `api.ollama.cloud` 自 8/14 起持续返回 503，5 个不同 API key 均受影响，官网与代理路径有高延迟（1.7s–7.3s）。[Issue #17756](https://github.com/ollama/ollama/issues/17756)

## 对应用开发者的意义

- **Qwen 3.8 生态已可生产使用**：v0.32.12+ 支持 Qwen 3.8 27B，配套的 renderer 修复（developer 指令、系统消息位置）在 v0.32.13 中落地。基于 Qwen3.8 的 Codex/Claude Code 类工具链建议升级至 **≥0.32.13** 以获取完整修复。
- **OpenAI 兼容层仍存在行为差异**：Modelfile 中的 `PARAMETER temperature` 在 `/v1/chat/completions` 上被忽略（使用服务端默认值），而 `/api/chat` 行为正确（[Issue #17744](https://github.com/ollama/ollama/issues/17744)）。依赖 OpenAI SDK 的开发者应显式传 `temperature`，或跟踪该 issue 的修复进展。
- **`ollama launch` 成为 agent 入口**：DeepSeek Harness 与 Muse Code 相继接入，配合已有 Claude Code/Codex 集成，Ollama 正逐步成为本地 agent 的统一模型网关。PR #17749 修复了 Qwen3.8 的 developer 指令折叠逻辑，对编码 agent 有直接影响。
- **性能与运维提示**：若 Chat API 单次请求延迟中有明显固定开销，可关注 PR #17752 的元数据缓存合入节奏；AMD 用户部署容器时需验证 VRAM 识别（Issue #16462）；生产环境如需避雷，建议固定版本而非跟随 latest。

---
*日报生成时间：2026-08-15 | 数据来源：[ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 — 2026-08-15

## 1. 今日速览

过去 24 小时无新版本发布，最新动态集中在 8 月 14 日集中提交的约 20 个 PR：Auto Router 影子评估能力拓展（多密钥作业、反向评估方向）、MCP 管理与可观测性修复、以及 Anthropic/OpenAI 协议兼容性修复。社区侧，维护者在 [#30484](https://github.com/BerriAI/litellm/issues/30484) 更新“稳定性冲刺路线图”，[#10177](https://github.com/BerriAI/litellm/issues/10177) Dark Mode 以 63 条评论、71 👍 成为当前社区讨论热度最高的 issue。

## 2. 版本发布与破坏性变更

无新 Release。仓库处于 1.93.x 之后的日常修复节奏，暂无需要迁移注意的破坏性变更。

## 3. 新模型与硬件支持

无新增模型架构或硬件后端支持。相关兼容性进展：

- [Azure Foundry 支持 Fireworks AI 模型（DeepSeek V3.2、OpenAI gpt-oss-120b、Kimi K2.5、MiniMax M2.5）— #26618 已关闭](https://github.com/BerriAI/litellm/issues/26618)
- [Azure gpt-5-chat 部署必须改用 max_completion_tokens — PR #36857](https://github.com/BerriAI/litellm/pull/36857)
- [Azure OpenAI 新的 Responses API 兼容 provider 流式场景未处理 response.incomplete 事件 — #27186](https://github.com/BerriAI/litellm/issues/27186)

## 4. 性能与优化

- [PR #36871：Auto Router 影子评估作业支持多密钥](https://github.com/BerriAI/litellm/pull/36871) — 一个评估作业可覆盖多个密钥，每个密钥独立轮次预算，避免为每个密钥重复建作业、手工汇总结果。
- [PR #36865：新增反向影子评估](https://github.com/BerriAI/litellm/pull/36865) — 衡量已经采用某路由器的密钥在采纳后的质量回归，补齐“只评估是否该采纳、不评估采纳后是否变差”的盲区。
- [PR #36930：Auto Router v2 支持 session_key_fallback 自动推导](https://github.com/BerriAI/litellm/pull/36930) — 请求未显式携带 session_id 时，自动从元数据/Header 派生会话密钥，改进会话级路由连续性。
- [PR #36859：输出预算不足以容纳任何 token 时返回截断 200 而非 400](https://github.com/BerriAI/litellm/pull/36859) — 解决 GPT-5.x 在 max_tokens 过小（如健康探测的 max_tokens:1）时被误判为“模型不可用”的问题。
- [PR #36861：将 LiteLLM key/team 身份转发至 Bedrock requestMetadata](https://github.com/BerriAI/litellm/pull/36861) — 支持在 Bedrock 侧做按 key/team 的成本归属与追踪。

## 5. 稳定性与回归

### 严重

- [Prisma 查询引擎在 Windows 首次查询时立即崩溃（LiteLLM 1.82.x / 1.83.0，最后一个正常版本 1.81.16）— #25260](https://github.com/BerriAI/litellm/issues/25260)。Windows + Python 3.12 环境下的高影响回归，目前仍 OPEN。
- [OpenAI gpt-5.6-sol/luna/terra 系列函数工具调用失败（reasoning_effort 错误）— #33221 已关闭，建议验证当前版本](https://github.com/BerriAI/litellm/issues/33221)。
- [store_prompts_in_spend_logs: true 配置加载但 SpendLogs.messages 仍为空 — #34747](https://github.com/BerriAI/litellm/issues/34747)。v1.93.0 下 acompletion 与 aresponses 均受影响。
- [Anthropic 响应恢复 brotli 压缩后 proxy 无法解码，透传场景下响应体乱码 — PR #36977 已提交修复](https://github.com/BerriAI/litellm/pull/36977)。修复将不再把客户端 Accept-Encoding 转发至上游。

### 中等

- [Redis 花费缓冲在 DB 提交失败时事务丢失 — PR #33881 已提交修复](https://github.com/BerriAI/litellm/pull/33881)。修复会在 DB 提交失败后将事务重新排队，而不是直接丢弃。
- [管理 UI 会话密钥被误判为“已删除 team”，所有 Admin UI 请求 404 — PR #36976 已提交修复](https://github.com/BerriAI/litellm/pull/36976)。该回归由 #36837 引入。
- [mid-conversation system 角色提升导致 Anthropic prompt-cache 前缀失效（AnthropicMessagesConfig）— #36559](https://github.com/BerriAI/litellm/issues/36559)。引入 `_normalize_system_role_messages` 后，缓存命中率受影响，OPen。
- [Vertex AI 自定义 api_base 时凭据跳过逻辑缺失，导致 DefaultCredentialsError — #19138](https://github.com/BerriAI/litellm/issues/19138)。
- [MCP 服务器保存时 OAuth endpoint 被静默清空 — PR #36888 已提交修复](https://github.com/BerriAI/litellm/pull/36888)。
- [MCP 调用方 host 与上游 headers 以明文进入日志元数据 — PR #36901 已提交修复](https://github.com/BerriAI/litellm/pull/36901)。
- [Postgres 缓存计划错误导致认证持续 503；修复会强制 Prisma recreate（跳过 15s 冷却）— PR #36428 已关闭](https://github.com/BerriAI/litellm/pull/36428)。
- [OpenWebUI 图像生成经 LiteLLM 转发时返回 400 — #30300](https://github.com/BerriAI/litellm/issues/30300)。

### 较低 / 边界场景

- [Tag 预算的 spend 永远不重置，超限后被永久封禁 — #27481](https://github.com/BerriAI/litellm/issues/27481)
- [org_admin 调用 POST /team/update 收到 401 — #27294](https://github.com/BerriAI/litellm/issues/27294)
- [GoogleGenAI 适配器对同一函数多次调用生成重复 tool_call_id — #27078](https://github.com/BerriAI/litellm/issues/27078)
- [零长度消息（immediate EOS）时角色字段被省略 — #26428](https://github.com/BerriAI/litellm/issues/26428)
- [/v1/responses 跨 provider 交接时重放 chatcmpl-* 消息 ID — #27333](https://github.com/BerriAI/litellm/issues/27333)
- [/v1/messages/count_tokens 忽略 vertex_ai Claude 伙伴模型的 system prompt — #27113](https://github.com/BerriAI/litellm/issues/27113)

## 6. 对应用开发者的意义

- **Claude Code / Anthropic 直连用户**：brotli 透传修复（[PR #36977](https://github.com/BerriAI/litellm/pull/36977)）落地后，可避免响应体被错误压缩导致 JSON 解析失败；[PR #36961](https://github.com/BerriAI/litellm/pull/36961) 同时保证 `/v1/models` 始终返回 max_input_tokens/max_tokens 字段（未知时为 null），以兼容 Anthropic 严格 Schema 客户端。
- **依赖工具调用的 Agent**：gpt-5.6 系列函数工具 + reasoning_effort 的兼容问题已关闭（[#33221](https://github.com/BerriAI/litellm/issues/33221)），升级后应回归验证 tool_use 场景。
- **使用 MCP 的团队**：多个 MCP 管理修复（OAuth 配置保留、guardrail 评估/拦截可观测、日志脱敏）在审查中，建议关注 [PR #36888](https://github.com/BerriAI/litellm/pull/36888)、[PR #36978](https://github.com/BerriAI/litellm/pull/36978)、[PR #36901](https://github.com/BerriAI/litellm/pull/36901)。
- **Agent 健康探测 / 可用性巡检**：[PR #36859](https://github.com/BerriAI/litellm/pull/36859) 修正了 max_tokens 过小时的 400 误报，探测逻辑无需再规避 GPT-5.x。
- **成本归属**：[PR #36861](https://github.com/BerriAI/litellm/pull/36861) 使 Bedrock 后端可获得 LiteLLM key/team 身份，基于 Bedrock 的企业成本拆分可落地；[PR #36914](https://github.com/BerriAI/litellm/pull/36914) 修复了转录模型输出费率为 0 时输入费率也被清零的计费问题。
- **企业部署稳定性**：Redis 花费缓冲重排队（[PR #33881](https://github.com/BerriAI/litellm/pull/33881)）与 Postgres 缓存计划恢复（[PR #36428](https://github.com/BerriAI/litellm/pull/36428)）分别补上了两个可导致花费数据丢失/认证持续 503 的故障点；Windows 上仍受 Prisma 崩溃影响的用户建议钉在 1.81.16（[#25260](https://github.com/BerriAI/litellm/issues/25260)）。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-15

## 今日速览

昨日发布 **v0.1.800-beta**，带来 Qwen3.8-27B 的本地运行与微调支持，大幅扩展了可在小显存/内存设备上部署的模型上限。与此同时，**AMD 全家桶成为当前稳定性最大短板**：AOTriton 算子门控导致微调 OOM、APU 显存误判、安装器装成 CPU-only PyTorch 等问题集中爆发，但已有多项针对性修复 PR 在途（#8821、#8863、#8853）。Unsloth Studio 产品迭代明显提速，涉及桌面端 UI、系统级 Ask 栏、API 兼容层等多个方向。

---

## 版本发布与破坏性变更

### v0.1.800-beta — Qwen3.8-27B 支持
- **核心内容**：Qwen3.8-27B 和 Qwen3.8-2.4T 现已支持本地运行（经 Unsloth Dynamic GGUFs，约 17GB RAM 即可）与微调；同时提供 NVFP4 量化版本。
- **官方评价**：宣称 Qwen3.8-27B 是同等规模下最强的模型。
- 指南：https://unsloth.ai/docs/models/qwen3.8

### 需要留意的变更
- **CUDA 13.2 回归风险（Issue #4849）**：llama.cpp 在 CUDA 13.2 下对 IQ3_S / IQ3_XXS、IQ2_M 量化产生乱码输出，CUDA 12.8/13.0 正常。官方建议使用 ≤13.0 的二进制或使用 Unsloth Studio。此 issue 于昨日再次更新，提示用户安装时需验证 CUDA 版本。
- **Studio 安装器将临时放宽 pip/uv 策略（PR #8781）**：为完成自身依赖安装，Studio 安装器会绕过操作系统的 `require-hashes` / `no-build` / `only-binary` 策略。这属于预期行为，但若你的环境强制 hash-locked 安装，需知悉此例外路径的存在。

---

## 新模型与硬件支持

| 项目 | 类型 | 状态 |
|---|---|---|
| Qwen3.8-27B / 2.4T | 新模型，支持 GGUF 动态量化、NVFP4、微调 | ✅ 已发布（v0.1.800-beta） |
| MLX 模型经 OpenAI 兼容 API 暴露（PR #8768） | 修复：通过 Studio 下载的 MLX 模型此前在 `/v1/models` 中不可见 | ✅ PR 已提交 |
| Ling 3.0 支持请求（Issue #8532） | 请求在 Studio 中支持 Ling 3.0 的下载/加载/服务 | ⏳ 社区请求 |
| Minimax H3 在 AMD + Linux 下无法运行（Issue #8814） | 兼容性 bug | ⏳ 开放中 |
| DSPARK 请求（Issue #8848） | 社区要求 Studio 支持 DSPARK 模型 | ⏳ 开放中 |

---

## 性能与优化

- **MTP 部分 offload 性能修复（PR #8875）**：修复 Qwen3.8-27B-GGUF 在 UD-IQ2_M + 默认设置下仅 ~3.5 token/s 的问题。修复后 MTP 头与主模型按统一规则放置，避免跨设备拉取 embedded MTP head 造成的性能断裂。
- **流式输出渲染优化（PR #8845）**：将快速流式响应中在浏览器下一帧前到达的文本块合并提交，避免 UI 在高速生成时持续触发消息重建而掉帧。
- **Windows AMD VRAM 检测修复（PR #8863）**：通过 LUID 关联 GPU Adapter Memory 计数器，修正 Windows ROCm 下无法读取 used VRAM 的问题。

---

## 稳定性与回归

> 按严重程度排列。标注 ✅ 表示已有修复 PR / 解决方案。

| 严重度 | Issue | 摘要 | 状态 |
|---|---|---|---|
| 🔴 高 | [#8819](https://github.com/unslothai/unsloth/issues/8819) | pip 安装的 unsloth 在 ROCm 下 AOTriton 门控未开启，SDPA 回退到 MATH，微调在远低于显存上限的 context 下直接 OOM | ✅ PR [#8821](https://github.com/unslothai/unsloth/pull/8821) 已提交 |
| 🔴 高 | [#8698](https://github.com/unslothai/unsloth/issues/8698) | Windows 桌面安装因 2 小时上限被杀，下载 cu126 PyTorch 期间无任何进度输出 | ⏳ 开放中 |
| 🔴 高 | [#8566](https://github.com/unslothai/unsloth/issues/8566) | macOS M4 上 llama-server 加载本地 GGUF 失败 + 空闲状态 RAM 占用异常高 | ⏳ 开放中 |
| 🟠 中 | [#8861](https://github.com/unslothai/unsloth/issues/8861) | Qwen3.8-27B-NVFP4 在 RTX 5090 / Windows 上推理极慢 | ⏳ 开放中 |
| 🟠 中 | [#8473](https://github.com/unslothai/unsloth/issues/8473) | Studio 安装器报告 AMD GPU 正常，但后端实际 CPU-only 运行，VRAM 显示 “--”，无任何 reconciliation | ⏳ 开放中，创始人已关注 |
| 🟠 中 | [#6834](https://github.com/unslothai/unsloth/issues/6834) | AMD Strix Halo APU（128GB 统一内存）错误将可用内存判为 19GB，拒绝加载 21.3GB 模型 | ⏳ 开放中 |
| 🟠 中 | [#8868](https://github.com/unslothai/unsloth/issues/8868) | macOS 上 `-H 0.0.0.0` 暴露了错误的 IP 地址（安全风险） | ⏳ 开放中 |
| 🟡 低 | [#8731](https://github.com/unslothai/unsloth/issues/8731) | Fedora/Bazzite 上 AppImage 安装器检测到 AMD GPU 但无法解析 ROCm 版本，安装了 CPU-only PyTorch | ⏳ 开放中 |
| 🟡 低 | [#8678](https://github.com/unslothai/unsloth/issues/8678) | Ubuntu Mate 下 WebKitGTK 未启用 media-stream，麦克风不可用 | ⏳ 开放中 |
| ✅ 已修复 | [#4849](https://github.com/unslothai/unsloth/issues/4849) | CUDA 13.2 下 IQ3_S / IQ2_M 等量化输出乱码 — 解决方案：使用 CUDA 12.8/13.0 | ✅ 已关闭 |
| ✅ 已修复 | [#8508](https://github.com/unslothai/unsloth/issues/8508) | Windows + AMD GPU 桌面安装失败 | ✅ 已关闭 |
| ✅ 已修复 | [#8463](https://github.com/unslothai/unsloth/issues/8463) | Linux AppImage 启动报缺少系统库 | ✅ 已关闭 |
| ✅ 已修复 | [#8733](https://github.com/unslothai/unsloth/issues/8733) | raw jsonl 导出格式错误 | ✅ 已关闭 |

---

## 对应用开发者的意义

1. **本地部署门槛下降**：Qwen3.8-27B 可在 17GB RAM 设备上运行，意味着个人笔记本即可承载此前需要工作站才能跑的模型。对构建本地优先 AI 应用的开发者，这是一个明显的平台能力跃迁。

2. **AMD 用户当前风险较高**：AOTriton 门控、APU 内存误判、CPU-only 安装等问题尚未完全合入主分支。基于 AMD 设备构建服务的团队，建议回归测试后再升级，或临时固定使用 CUDA 12.8/13.0 语义的版本。

3. **Agent 工具调用体验在持续修补**：PR #8581 修复了 GGUF 工具循环中 pre-tool reasoning 丢失的问题——此前模型在调用 MCP 搜索工具后可能重复执行同一搜索。对构建 MCP-based agent 的开发者，这个修复值得关注。另外 PR #8879 为模型注入当前日期，解决 Deep Research 类功能因训练截止日期导致的过期搜索问题。

4. **Studio API 生态正在成型**：MLX 模型接入 OpenAI 兼容 API（PR #8768）让 Mac 用户可以在标准化接口下使用更多模型。音频/视频/图像生成 API 的请求（#8752）也已在 issue 中提出，预计后续版本会开放面向多模态的编程接口。

5. **桌面端产品形态创新**：macOS 系统级 Ask 栏（⌥Space 全局唤起，PR #8728）和项目 Sources 面板的快速预览编辑（PR #8870）表明 Unsloth 在从“训练工具”向“本地 AI 工作台”演进。若你的应用需要嵌入本地模型交互，这些新交互模式值得跟踪。注意 MCP 端点相关问题（#8790）在 v1 endpoint 上仍有断裂，依赖此接口的应用需要保持警惕。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*