# AI 基础设施日报 2026-08-10

> 生成时间: 2026-08-10 04:40 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-10）

**分析范围**：vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth
**分析视角**：推理引擎、模型服务、LLM 网关、微调框架

---

## 1. 生态全景

当前 AI 基础设施正处在**多模型快速迭代与硬件适配阵痛并存**的阶段。DeepSeek-V4-Flash、Kimi-K3、MiniMax-H3 等新架构在 GPU 集群、消费级硬件和 NPU 上的落地普遍存在正确性或性能缺陷，显示模型发布速度已远超下游软件栈的适配能力。同时，行业竞争焦点正从“单次推理速度”转向**长上下文稳定性、KV cache 成本、跨硬件可移植性和 Agent 工具调用可靠性**。值得注意的是，网关层（LiteLLM）与本地运行时（Ollama/llama.cpp）的修复重心已明显向“流式计费准确性”和“动态工具调用”倾斜，说明生成式 AI 应用已从技术验证进入**生产级成本核算与稳定运营**阶段。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Release | 关键 Issues（高优/严重） | 关键 PRs（修复/优化） | 核心活跃领域 |
| :--- | :--- | :--- | :--- | :--- |
| **vLLM** | 无 | 约 10 个（Kimi 长上下文中毒、死锁、Marlin 静默损坏） | 约 12 个（Kimi fp8 修复、KV offload 指标、mxfp4 修复） | 大模型 GPU 集群推理、KV cache 优化、ROCm 适配 |
| **SGLang** | 无 | 约 7 个（Z-Image 崩溃、LoRA 泄漏、1M 预填 OOM） | 约 8 个（DCP 显存优化、NPU 支持、VMM 治理） | 长上下文/PD 分离、NPU 扩展、MoE 调度 |
| **llama.cpp** | **b10332 / b10333** | 约 8 个（MTP 污染、Vulkan FA 污染、DeepSeek 乱码） | 约 7 个（Expert Caching、RPC 并行加载、SYCL 融合） | 边缘/本地推理、多后端（CPU/GPU/NPU/Vulkan）、量化 |
| **Ollama** | 无 | 约 8 个（MLX 数据串话、TTFT 回归、工具解析 500） | 约 4 个（CLI 图片路径转义、云 API 兼容性） | 本地开发者体验、Apple Silicon/MLX、API 兼容层 |
| **LiteLLM** | 无（1.97.0-RC1 存在回归） | 约 6 个（流式 usage 低估、FastAPI 兼容性破坏、RC1 统计归零） | **约 15 个**（SSE keepalive、Redis 写入削减、计费修复密集） | LLM 网关、代理路由、流式计费、成本核算 |
| **Unsloth** | **v0.1.527-beta** | 约 7 个（ROCm 显存爆炸、NVFP4 不兼容） | 约 10 个（MiniMax-H3 视频/音频 LoRA、INT8 denoiser、多 GPU 预算修复） | 微调框架、视频/多模态训练、显存效率优化 |

---

## 3. 模型支持竞速

**头部 GPU 推理引擎（vLLM vs SGLang）** 在适配新模型上表现胶着，但各有侧重：

- **DeepSeek-V4-Flash**：vLLM 曝出 Ampere（A100）不支持问题（#50576）及 KV cache 膨胀 8 倍（#51041），属于**架构级瓶颈**；SGLang 则在 NVIDIA 上建立性能跟踪（#33636），但遭遇 1M token 预填 OOM（#34155），不过 SGLang 可通过 dp-attention 规避，vLLM 的 KV 膨胀则无解。
- **Kimi-K3**：vLLM 在 AMD/ROCm 平台取得实质性修复（fp8 KV decode 正确率 74%→97.19%，消除冗余拷贝）；SGLang 则率先拓展至 **Ascend NPU（ #33465）**，并攻坚 DCP（Data Parallel Context）显存优化。
- **MiniMax-H3**：vLLM 报告其非 CUDA 平台不可用（FlashInfer 依赖）；SGLang 存在推理 args error；而 **Unsloth 已将其扩展为视频+音频联合 LoRA 训练（ #8244）**——训练侧跑在了推理侧前面。

**本地/边缘侧（llama.cpp / Ollama）**：llama.cpp 在适配前沿模型（DeepSeek V4、GLM-5.2、Nemotron MTP）时遭遇严重输出乱码（ROCm/Vulkan 后端），**正确性挑战大于性能挑战**；Ollama 更侧重于打通 HuggingFace 拉取链路和工具调用兼容性。**结论：vLLM 与 SGLang 在 GPU 推理赛道上并驾齐驱，SGLang 在 NPU 扩展上暂时领先；Unsloth 在视频生成微调上跑出了独立赛道。**

---

## 4. 性能优化前沿

今日各项目的优化火力高度集中在以下五个方向：

1.  **KV cache 工程化**：这是绝对的焦点。vLLM 围绕 KV cache 的事件语义、CPU offload 容量指标（#51615）、量化页面配置（#51612）密集迭代；SGLang 在攻坚 HiCache（长前缀一致性）；llama.cpp 在修补 Vulkan flash-attention 的 K/V 污染问题。
2.  **分布式与异构调度**：SGLang 在 DCP/MHA 显存复用（#34213）和 AMD QuickAllReduce 裁剪（#34212）上优化显存峰值；vLLM 修复 CPU 多 TP 的 NUMA 亲和性问题（#50525）；llama.cpp 引入 RPC 加载并行化（#26291），试图缩短多节点加载时间。
3.  **量化与精度修复**：这是“硬骨头”。vLLM 修复 mxfp4 权重映射与 NVFP4 正确性（#51419/#48929）；SGLang 修复 AMD 上 fp8 clamp 到 224 的精度损失（#30900）；llama.cpp 则推出 1.25-bit 稀疏三元量化 STQ1_0（#22836），探索更低比特极限。
4.  **推理调度与投机解码**：vLLM 修复 Mamba block alignment 失效（#51603），但发现动态投机解码存在吞吐悬崖（#49548）；SGLang 修复单 GPU Z-Image 在 BCG（Breakable CUDA Graph）下的崩溃问题（#34210）。
5.  **网关层的网络与计费效率**：这是 LiteLLM 的主场，集中在 SSE keepalive 防止长连接被中途断开（#34825），以及跳过无配置键的 Redis 写入以降低调用延迟（#31880）。

---

## 5. 分层定位差异

- **GPU 生产级推理引擎（vLLM / SGLang）**：面向大规模集群，直接角力在多卡多节点（TP/PP/EP/DP）的极致性能、KV cache 调度和前沿算子融合上。目标用户是自建大模型基础设施的云厂商或大型企业，核心竞争力是**吞吐量和显存效率**。
- **本地/边缘运行时（llama.cpp / Ollama）**：**llama.cpp** 是底层 C/C++ 实现的多后端 GGML 引擎，以极致的算子优化和量化支持换取在个人电脑、手机甚至 NPU 上的可运行性；**Ollama** 是建立在类似后端之上的开发者友好型运行时，核心价值在于**零配置体验、模型管理分发和 API 兼容规范**。两者的共性是不依赖大显存和高带宽集群。
- **LLM 网关/代理层（LiteLLM）**：位于模型服务和用户应用之间，不关心模型张量如何在 GPU 上跑，而是聚焦于**统一协议转换、路由负载均衡、密钥管理、成本计量与流式数据稳定性**。今日动态显示该层正承担日益复杂的“计费准确性”和“长连接可靠性”责任。
- **训练/微调框架（Unsloth）**：更垂直地在微调速度与显存占用上做文章（如 1.8x 微调速度和 80% 显存削减），同时向多模态（视频/音频）和商业 Studio 产品化（API、GUI）延伸，是上层应用获取定制化业务的牵引车。

---

## 6. 值得关注的趋势信号

1.  **模型发布提速导致软件栈“追尾”风险加剧**：DeepSeek-V4 Flash 的 KV cache 膨胀 8 倍（vLLM #51041）和 SGLang 的 1M token OOM（#34155）并非孤立事件，而是新模型架构（如稀疏注意力、MLA）对基础设施的线性约束失效的典型信号。**基础设施团队必须对新大模型的资源需求做更早的 POC 验证，而非仅依赖官方 benchmark。**
2.  **硬件多元化成为生死线**：vLLM 修复 Kimi-K3 的 ROCm 路径，SGLang 新增 Ascend NPU 支持，llama.cpp 集成国产 MetaX GPU——这表明 **AMD/NPU 已经是大规模推理不可回避的选项**。对应用开发者来说，跨 CUDA 运行时的模型选择需警惕隐性 kernel 依赖（如 MiniMax-M3 的 FlashInfer 崩溃问题）。
3.  **长上下文场景需要整体架构韧性**：一次 240K token 的 prefill 就能让 vLLM 部署进入输出垃圾 token 的“中毒”状态（#51039），这说明长上下文不仅是显存问题，更是数值稳定性的定时炸弹。Agent 类应用若依赖超长历史，必须构建**自动健康检查与回滚机制**。
4.  **Agent 工具调用的“最后一公里”正在被重兵修复**：Ollama 修复工具解析 500 错误、vLLM 强化 MCP 工具结果语义保留、Unsloth 将工具调用问题定位到上游 Ollama——**工具调用链路已从“可用”走向“可控”**。应用开发者应将这些表现为强依赖的轻量级策略（重试、超时）升级为对网关和引擎版本的双重锁定。
5.  **版本管理与依赖锁定风险升高**：LiteLLM 因 FastAPI 0.141.0 升级导致启动崩溃，vLLM 的 `rejection_sample_method` 参数变更失效，llama.cpp 移除 ROCm 编译宏——**上游依赖的脆弱性和向下兼容性正在成为生产事故的高发源头**。建议所有 CI/CD 流程全面锁定精确版本号（Pinning），并建立针对底层依赖的回归测试门禁。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 · 2026-08-10

## 今日速览

DeepSeek-V4-Flash-0731 成为社区焦点：Ampere 支持诉求高涨（#50576，92 评论），但 KV cache 膨胀 8 倍的问题（#51041）可能使该模型的长上下文部署价值大打折扣。Kimi-K3 在 ROCm 平台取得实质进展：PR #51011 修复 fp8 KV cache decode，将 GSM8K 准确率从 74.00% 提升至 97.19%，PR #50592 同时消除了 AMD 注意力路径的冗余拷贝。KV offload 和可观测性领域活跃度最高，多个 PR（#51614、#51615、#51612）围绕 KV cache 事件语义与容量指标展开密集迭代。

---

## 版本发布与破坏性变更

**无新 Release（过去 24 小时）。** 但需要注意一项配置变更：

- **投机解码配置参数已变更**：PR #51611 同步了 speculative decoding 文档，`rejection_sample_method` 的合法值从 `strict / probabilistic / synthetic` 改为 `standard / synthetic / block`（默认 `standard`）。若现有配置使用了 `probabilistic`，升级后可能失效。  
  [vllm-project/vllm PR #51611](https://github.com/vllm-project/vllm/pull/51611)

---

## 新模型与硬件支持

- **Kimi-K3 AMD 支持推进**：Issue #50682 持续跟踪 ROCm 路线图，Day 0 已集成 AITER fused-moe（a16w4 / a8w4）。PR #50592 移除了 AMD 注意力路径在 KDA 与 MLA 投影输出的冗余分配/拷贝，属于直接性能优化。  
  [Issue #50682](https://github.com/vllm-project/vllm/issues/50682) · [PR #50592](https://github.com/vllm-project/vllm/pull/50592)

- **MiniMax-M3 非 CUDA 平台不可用**：#51200 报告 `MiniMAXGemmaRMSNorm` 无条件调用 FlashInfer CUDA kernel，导致 MiniMax-M3 在 Intel GPU、ROCm 等非 CUDA 平台直接崩溃。该架构的跨平台适配尚需修复。  
  [Issue #51200](https://github.com/vllm-project/vllm/issues/51200)

- **mxfp4 量化兼容性修复**：PR #51419 支持了 `weight_scale` 存储为 FP32 的 mxfp4 checkpoint，并修复 per-expert 量化 checkpoint 的权重映射缺失问题。  
  [PR #51419](https://github.com/vllm-project/vllm/pull/51419)

- **DeepSeek-V4-Flash-0731（DSpark）硬件支持缺口**：#50576 提出 SM8x（A100/A800）支持需求（当前不可用），#50720 报告在 SM120（RTX PRO 6000）上 FlashInfer 稀疏 MLA decode kernel 路由失败。该模型的硬件适配尚不完整。  
  [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) · [Issue #50720](https://github.com/vllm-project/vllm/issues/50720)

---

## 性能与优化

- **Kimi-K3 AMD 路径消除冗余拷贝**：PR #50592 将投影输出直接返回给调用方，免去额外的 allocation + copy，降低 decode 延迟和内存带宽消耗。  
  [PR #50592](https://github.com/vllm-project/vllm/pull/50592)

- **多模态张量 IPC 设计落地**：PR #51349 引入 paged shared memory（pshm）方案，将 mm tensor 通过共享内存 + `swap_blocks_batch` 直接送入 GPU，对比现有 ZMQ RPC 路径在 CPU→GPU 带宽和时延上有显著优势（PR 描述包含对比数据）。  
  [PR #51349](https://github.com/vllm-project/vllm/pull/51349)

- **MiniMax-M3 NVFP4 在 B200 的首轮性能数据**：Issue #51494 报告 8×B200 上 EAGLE3 可带来 2.1–2.3× decode 加速，但前提是合入 NVFP4 正确性修复 #48929（当前仅 main 分支包含）。  
  [Issue #51494](https://github.com/vllm-project/vllm/issues/51494)

- **CPU 多 TP 的 NUMA 亲和性修复**：PR #50525 修复了 CPU 上所有 TP worker 被绑定到同一 NUMA 节点的问题，可避免多 worker 争抢同一内存带宽。  
  [PR #50525](https://github.com/vllm-project/vllm/pull/50525)

- **调度器/投机解码优化**：PR #51603 在 Mamba 模型中将 block alignment 提前到 encoder cap 之前应用，避免编码器限制 prefill chunk 后导致 alignment 失效。  
  [PR #51603](https://github.com/vllm-project/vllm/pull/51603)

- **KV offload 容量可观测**：PR #51615 新增 `vllm:kv_offload_cpu_capacity_tokens` 指标，以 token 数报告 CPU offload 能力，方便路由器和调度器感知总量。  
  [PR #51615](https://github.com/vllm-project/vllm/pull/51615)

---

## 稳定性与回归

### 严重（崩溃/正确性）

- **Kimi-K3 长上下文后全面退化**（#51039）：一次约 240K token 的 prefill 之后，部署对所有请求持续输出单个重复 token，怀疑为 packed KDA prefill 产生 NaN logits。目前无对应 fix PR，需紧急排查。  
  [Issue #51039](https://github.com/vllm-project/vllm/issues/51039)

- **V1 引擎死锁**（#37729）：fp8 + prefix caching + Qwen3.5 并发负载下 EngineCore 死锁，35 条评论仍无修复。  
  [Issue #37729](https://github.com/vllm-project/vllm/issues/37729)

- **GB10/sm_121a 上 Marlin W4A8-FP8 静默输出损坏**（#49546）：`VLLM_MARLIN_INPUT_DTYPE=fp8` 时输出退化为重复的 `</think>` 循环，但 kernel 运行反而快 2.5%，容易被误判为正常。  
  [Issue #49546](https://github.com/vllm-project/vllm/issues/49546)

- **Qwen3.6-35B-A3B-FP8 生成 400 错误**（#47761）：vLLM 0.23.0/0.24.0 下代码生成任务报 `400 Unterminated string starting at`，影响生产可用性。  
  [Issue #47761](https://github.com/vllm-project/vllm/issues/47761)

### 高（功能/性能劣化）

- **DeepSeek-V4-Flash-0731 KV cache 膨胀**（#51041）：实测 56 bytes/token，约为 preview 版本的 8 倍；H20 TP=2 上 `max_model_len` 被限制在 ~121K。若需要 1M 上下文，当前 checkpoint 的实现效率是关键瓶颈。  
  [Issue #51041](https://github.com/vllm-project/vllm/issues/51041)

- **动态投机解码吞吐坍塌**（#49548）：`num_speculative_tokens_per_batch_size` 在 batch size 达到阈值时导致整体吞吐骤降，与 cudagraph 降级叠加，影响明显。  
  [Issue #49548](https://github.com/vllm-project/vllm/issues/49548)

- **hybrid-SWA prefix cache 完全失效**（#48435）：Gemma-4-31B 多会话轮询负载中，pool 占用率约 25% 时跨请求 prefix 复用率降为 0。  
  [Issue #48435](https://github.com/vllm-project/vllm/issues/48435)

- **KV cache 量化页面配置丢失**：PR #51612 修复了 MLA / chunked-local 的 KV cache spec 提升时静默丢弃 `kv_quant_mode` 的问题，该 bug 会导致量化 KV cache 页面尺寸设置错误。  
  [PR #51612](https://github.com/vllm-project/vllm/pull/51612)

### 中（功能缺陷）

- **ngram 投机解码改变 greedy 输出**（#41758）：Qwen3-0.6B 上启用 ngram 后输出语义偏移。  
  [Issue #41758](https://github.com/vllm-project/vllm/issues/41758)

- **`prompt_token_ids` 在 EmbedsInput pipeline 中丢失**（#42303），影响 embedding 模型链路。  
  [Issue #42303](https://github.com/vllm-project/vllm/issues/42303)

- **GGUF deepseek2 架构不支持**（#42229）：`ValueError: GGUF model with architecture deepseek2 is not supported yet.`  
  [Issue #42229](https://github.com/vllm-project/vllm/issues/42229)

### 已合入/可验证的修复 PR

- **Kimi-K3 fp8 KV cache decode 修复**（PR #51011）：GSM8K 从 74.00%（285/1319 degenerate）提升至 97.19%。  
  [PR #51011](https://github.com/vllm-project/vllm/pull/51011)

- **KV offload CPU 事件粒度与自描述性修复**（PR #51614）：解决 hash 频率高于 full-attention block size 时事件语义错乱的问题，对 DeepSeek V4 等混合 KV 布局有效。  
  [PR #51614](https://github.com/vllm-project/vllm/pull/51614)

- **EngineCore 关闭时序修复**（PR #50529）：忽略 shutdown 期间的 SIGTERM，避免清理阶段被提前 kill。  
  [PR #50529](https://github.com/vllm-project/vllm/pull/50529)

- **lfm2 工具解析器修复**（PR #48171）：修复带括号或换行的工具调用被丢弃/截断的问题。  
  [PR #48171](https://github.com/vllm-project/vllm/pull/48171)

- **MCP 工具结果语义保留**（PR #51610）：不再只取 `content[0].text`，完整保留 `structuredContent`、`isError` 等多块内容。  
  [PR #51610](https://github.com/vllm-project/vllm/pull/51610)

- **runai_streamer 多节点模型加载修复**（PR #50633）：非 tensor 文件现在会在每个节点拉取，而不是只在 config 构建节点。  
  [PR #50633](https://github.com/vllm-project/vllm/pull/50633)

- **mxfp4 量化权重加载修复**（PR #51419）。  
  [PR #51419](https://github.com/vllm-project/vllm/pull/51419)

---

## 对应用开发者的意义

1. **DeepSeek-V4-Flash-0731 暂不建议上生产**：Ampere（A100/A800）不支持（#50576），且 KV cache 占用是 preview 的 8 倍（#51041），在 H20 上 `max_model_len` 仅约 121K；若业务的上下文窗口超过此值，需等待新版 checkpoint 或自行量化 KV cache。

2. **Kimi-K3 长上下文有“中毒”风险**：#51039 表明一次大请求可能导致整个部署持续输出垃圾 token。生产环境建议设置 prefill 长度上限或灰度验证；ROCm + fp8 KV cache 用户可直接受益于 PR #51011。

3. **投机解码需谨慎配置**：动态 `num_speculative_tokens_per_batch_size` 在 batch 阈值附近存在吞吐悬崖（#49548）；且所有启用了 `speculative_config` 的模式都有非零的基线开销（#49986）。建议在真实负载形状下压测后再启用。

4. **工具调用链路正在收敛**：lfm2 parser（#48171）与 MCP 多块结果（#51610）的修复意味着 agent 场景下工具调用丢失率会明显下降；若你正在运行依赖 Pythonic 工具调用格式的模型，值得跟踪这两个 PR 的合入版本。

5. **配置变更预警**：`rejection_sample_method` 合法值已变化（#51611），CI/CD 中如有相关配置项需在升级时同步修改，否则会导致启动参数校验失败。

6. **多模态 IPC 优化在途中**：PR #51349 的 paged shared memory 方案若合入，将显著降低多模态输入的 H2D 开销，适合图像/视频类高吞吐应用提前关注。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-10

## 1. 今日速览

今日 SGLang 动态聚焦于三方面：一是高优 Issue #22607（PP + HiCache 一致性修复计划）仍在持续讨论，涉及 Disaggregated Prefill 场景下长前缀复用的一致性保障；二是 LoRA 注册表泄漏 Bug 已被定位并提交修复 PR #34215，对动态 LoRA 加载/卸载场景有直接改善；三是 Z-Image 模型在单 GPU 上使用 BCG（Breakable CUDA Graph）时崩溃/挂起的问题已定位，修复 PR #34210 已提交。此外，DeepSeek-V4、GLM-5.2 等模型的性能跟踪与多项崩溃修复也在推进中。

## 2. 版本发布与破坏性变更

过去 24 小时无新 Release。

## 3. 新模型与硬件支持

- **Kimi-K3 NPU 支持**：[PR #33465](https://github.com/sgl-project/sglang/pull/33465) 在 GPU 集成基础之上为 Ascend NPU 添加 Kimi-K3 支持，新增 Ascend Triton kernel 并保持 GPU 行为不变。
- **AMD Kimi K3 DCP**：[PR #32796](https://github.com/sgl-project/sglang/pull/32796) 为 AMD 平台添加 Kimi K3 DCP（Data Parallel Context）支持。
- **DeepSeek-V4 性能跟踪**：[Issue #33636](https://github.com/sgl-project/sglang/issues/33636) 建立 NVIDIA GPU 上的 DeepSeek-V4 性能跟踪 Issue，覆盖 SM90/SM100/SM103，作为功能 Roadmap 的配套。
- **NPU 新模型适配问题**：[Issue #34211](https://github.com/sgl-project/sglang/issues/34211) 报告 Eco-Tech/Qwen3.6-35B-A3B-w8a8 在 910B*1 节点上因不支持的 ModelSlim MoE 方案（W13='FLOAT', W2='FLOAT'）而失败，NPU 侧仍需适配。
- **MiniMax-H3**：[Issue #33466](https://github.com/sgl-project/sglang/issues/33466) 报告该模型在推理时出现 args error；[Issue #34110](https://github.com/sgl-project/sglang/issues/34110)（已关闭）报告 Ref2VA 在 L40S offload 下产生噪声输出。

## 4. 性能与优化

- **DCP MHA 显存优化**：[PR #34213](https://github.com/sgl-project/sglang/pull/34213) 在 LSE merge 阶段复用 MHA 部分输出，避免分配第二个完整 FP32 `[tokens, heads, value_dim]` 张量。对 Kimi-K3 TP8/DCP 场景可显著降低显存峰值。
- **AMD DCP QuickAllReduce 分配裁剪**：[PR #34212](https://github.com/sgl-project/sglang/pull/34212) 在 ROCm 上跳过 DCP 组不需要的 QuickAllReduce 初始化，减少无用资源分配。
- **CUDA VMM 分配逻辑整合**：[PR #34199](https://github.com/sgl-project/sglang/pull/34199) 将 CUDA VMM 的分配、句柄选择、映射与销毁逻辑收敛到 `sglang.srt.cuda_vmm_utils`，降低维护成本并统一回滚/清理路径。
- **AMD fp8 量化边界修复**：[PR #30900](https://github.com/sgl-project/sglang/pull/30900) 修复 `_per_token_group_quant_8bit_raw` 在 gfx95x（MI355X）上硬编码 fp8 clamp 到 224.0 导致精度损失的问题，按设备区分 `e4m3fnuz`（max 224）与 `e4m3fn`（max 448）。

## 5. 稳定性与回归

按严重程度排列：

- **[严重] Z-Image BCG 单 GPU 崩溃/挂起**（[#34183](https://github.com/sgl-project/sglang/issues/34183)）：warmup capture 成功但首次 replay 即触发异步 CUDA illegal memory access 或无限挂起（`--dit-cpu-offload=false` 时），多 GPU TP=2 不受影响。**已有修复 PR**：[#34210](https://github.com/sgl-project/sglang/pull/34210) 通过在 capture 阶段固定 BCG 消费的 cache 值来解决。
- **[严重] LoRA 请求中止后注册表泄漏**（[#34205](https://github.com/sgl-project/sglang/issues/34205)）：Aborted LoRA 请求在 `_handle_abort_req` 清理状态时未释放 `LoRARegistry` 引用，导致 adapter 被持续 pin，阻止动态 unload/eviction。**已有修复 PR**：[#34215](https://github.com/sgl-project/sglang/pull/34215)，附带 CPU-only 回归测试。
- **[严重] W4AFP8 + DeepEP 首次推理崩溃**（[#33660](https://github.com/sgl-project/sglang/issues/33660)）：所有 DP/TP/EP rank 同时崩溃，报 `TypeError: missing 1 required positional argument: 'routed_scaling_factor'`。**已有修复 PR**：[#33669](https://github.com/sgl-project/sglang/pull/33669)，同时修正了 mode-specific dtypes。
- **[高] 1M-token 预填致 CUDA OOM**（[#34155](https://github.com/sgl-project/sglang/issues/34155)）：DeepSeek-V4-Flash 在 `--tp 8 --moe-a2a-backend megamoe`（无 dp-attention）下处理 ~1.04M token 请求时，预填约 90 秒后 OOM；同请求在 tp8/dp8 dp-attention 下可正常服务。待修复。
- **[高] EAGLE 验证阶段所有调度器挂起**（[#33642](https://github.com/sgl-project/sglang/issues/33642)）：PD-disaggregated decode 实例 + DSA attention + EAGLE Spec V2 下，cuModuleLoadData 处卡死并触发 watchdog timeout。待修复。
- **[中] GLM-5.2 难复现 MoE 算子 Bug**（[#29160](https://github.com/sgl-project/sglang/issues/29160)）：极难复现，需要更长调查周期。待修复。
- **[中] 大上下文 Mamba 驱逐阻塞事件循环**（[#30314](https://github.com/sgl-project/sglang/issues/30314)）：Scheduler 事件循环在 Mamba eviction 时阻塞，导致 server hang 并被 kill。待修复。
- **[中] NPU 不支持 Qwen3.6 的 MoE 格式**（[#34211](https://github.com/sgl-project/sglang/issues/34211)）：4x 910B*1 节点上 ValueErorr，需要 NPU 后端扩展 ModelSlim MoE 支持。待修复。
- **[低] 流式响应内容截断**（[#34214](https://github.com/sgl-project/sglang/issues/34214)）：当 content 与 tool_calls 同时存在时，流式输出 content 被截断。待修复。
- **[低] 文档无效链接**（[#34118](https://github.com/sgl-project/sglang/issues/34118)）：`support_new_models` 文档中存在无效文件路径。待修复。

## 6. 对应用开发者的意义

- **长上下文 / Agent 场景受益于 HiCache 修复计划**：[Issue #22607](https://github.com/sgl-project/sglang/issues/22607) 针对 PD-disaggregated 架构下共享长前缀（系统提示词、工具定义、多轮历史）的一致性提出 PR 计划。对构建高并发长上下文 Agent 应用的团队，该修复将直接影响前缀缓存命中率与 KV 一致性，建议关注进展。
- **LoRA 动态加载/卸载的稳定性提升**：若你的应用涉及大量动态 LoRA adapter 的加载与中止（如多租户定制），[PR #34215](https://github.com/sgl-project/sglang/pull/34215) 修复的注册表泄漏问题可避免 adapter 被 pin 导致显存持续占用。建议升级后验证 abort 场景下的资源释放。
- **W4AFP8 量化 + DeepEP 用户需等待修复合入**：使用 DeepSeek-V2 架构模型（如 GLM-5.2）且开启 `--quantization w4afp8 --moe-a2a-backend deepep` 的部署会直接崩溃，[PR #33669](https://github.com/sgl-project/sglang/pull/33669) 合入前建议临时改用其他 `moe-a2a-backend`。
- **DeepSeek-V4 超长上下文请使用 dp-attention**：1M-token 级请求在 `--tp 8 --moe-a2a-backend megamoe` 下存在 OOM 风险（[#34155](https://github.com/sgl-project/sglang/issues/34155)），dp-attention 路径可规避，超长上下文场景请规划相应配置。
- **NPU 用户在模型选型时需注意兼容性**：Kimi-K3 在 NPU 上的支持正在推进（[#33465](https://github.com/sgl-project/sglang/pull/33465)），但 Qwen3.6-35B-A3B-w8a8 等使用 FLOAT MoE 权重的模型尚未在 NPU 后端适配（[#34211](https://github.com/sgl-project/sglang/issues/34211)），部署前建议确认模型权重格式。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-10

## 今日速览

发布两个修修补丁版本（b10332/b10333），其中 b10333 修复了 SpaceMiT 后端缺失的 Q5_0 dispatch。Issue 侧 MTP 状态污染（#23577/#26425）与 DeepSeek V4 在 ROCm 上的乱码问题（#25436/#26685）成为社区关注焦点；PR 侧 Expert Caching（#26824）与 RPC 加载并行化（#26291）是值得关注的性能方向。

## 版本发布与破坏性变更

- **b10333**：修复 ggml-cpu 在 SpaceMiT 后端缺失 Q5_0 dispatch 导致推理异常的问题（[#26792](https://github.com/ggml-org/llama.cpp/pull/26792)）。建议使用 SpaceMiT 后端的用户升级。
- **b10332**：从 CI 中移除 `GGML_HIP_ROCWMMA_FATTN` 构建开关（[#26760](https://github.com/ggml-org/llama.cpp/pull/26760)）。该宏自引入后长期未开启/维护，移除后不再提供 ROCm 平台基于 rocwmma 的 flash-attention 编译选项，影响面有限。

## 新模型与硬件支持

- **MetaX 后端集成（进行中）**：PR #22212 为国产 MetaX GPU（MACA/cu-bridge）添加 `GGML_METAX` 构建选项与后端注册，当前可完成设备枚举，尚未合入（[#22212](https://github.com/ggml-org/llama.cpp/pull/22212)）。
- **Hexagon NPU 替代后端（进行中）**：PR #26373 新增与官方实现可共存的 `ggml-hexagon-jz` 后端，面向 Qualcomm Hexagon NPU（[#26373](https://github.com/ggml-org/llama.cpp/pull/26373)）。
- **STQ1_0 三元量化（进行中）**：PR #22836 引入 1.25-bit 稀疏三元量化（STQ1_0）及 ARM NEON vec_dot 内核，对应 ACL 2026 论文 Sherry 量化方案（[#22836](https://github.com/ggml-org/llama.cpp/pull/22836)）。
- **Nemotron MTP 支持（进行中）**：PR #26725 为 Nemotron Nano 添加 MTP 推理支持，性能依赖 #26623 先行合入（[#26725](https://github.com/ggml-org/llama.cpp/pull/26725)）。
- **BitNet relu2 激活修复（进行中）**：PR #26751 修复 BitNet 模型 GGUF 声明 `hidden_act: relu2` 但构建 FFN 时硬编码 SiLU 导致输出错误的问题，涉及 llama-model.cpp 与模型转换脚本（[#26751](https://github.com/ggml-org/llama.cpp/pull/26751)）。

## 性能与优化

- **Expert Caching（新 PR，进行中）**：#26824 提交了基于热度图的 MoE 专家缓存方案，支持 CPU↔GPU 实时迁移与 mmap 锁页，默认关闭、以 flag 启用。该 PR 是 #26563 的完全重构版，在修复评审意见的同时扩充了功能集（[#26824](https://github.com/ggml-org/llama.cpp/pull/26824)）。
- **RPC 加载时间优化（进行中）**：#26291 为 RPC 缓存加载引入 `GGML_RPC_LOAD_THREADS`，将逐张量 FNV 哈希并行化。对大型模型 RPC 加载可降低 20-60% 耗时（[#26291](https://github.com/ggml-org/llama.cpp/pull/26291)）。
- **SYCL 算子融合（进行中）**：#26779 在 SYCL 后端将 dense-FFN 的 gate/up 两个 mat_mul 与 GLU 融合为单一 q4_K mat-vec。在 Arc Pro B70 上 tg128 有可测量提升（[#26779](https://github.com/ggml-org/llama.cpp/pull/26779)）。

## 稳定性与回归

按严重程度排序：

- **MTP 状态泄漏/输出污染（高）**：#23577 报告 Qwen3.6 27B MTP 长会话后输出重复 `////`（31 评论）；#26425 指出 MTP 跨请求残留状态导致非确定性输出与模型退化。两者均无修复 PR（[#23577](https://github.com/ggml-org/llama.cpp/issues/23577) / [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)）。
- **DeepSeek V4 乱码（高，多后端）**：#25436 报告 Strix Halo + ROCm 上 DeepSeek V4 Flash IQ3_XXS 输出乱码（26 评论）；#26685 在 RPC + Vulkan 组合（5090 主机 + Strix Halo RPC 节点）下复现。均未定位根因（[#25436](https://github.com/ggml-org/llama.cpp/issues/25436) / [#26685](https://github.com/ggml-org/llama.cpp/issues/26685)）。
- **Vulkan flash-attention K/V 污染（高，新）**：#26744 发现 Vulkan FA 在释放的 cell 中残留旧 K/V 并影响后续输出，直接影响 KV-cache 复用场景，尚无修复（[#26744](https://github.com/ggml-org/llama.cpp/issues/26744)）。
- **GLM-5.2 ROCm/HIP 性能严重回退（高）**：#26445 指出 Indexer PR #25407 合入后 prefill 慢约 6 倍、加载时间延长约 40 倍（8x MI300X 平台），待确认根因（[#26445](https://github.com/ggml-org/llama.cpp/issues/26445)）。
- **RPC GET_ROWS 越界读（中，新）**：#26825 报告 `ggml-rpc-server` 在 release 构建中可越界读取输入张量缓冲区——即未定义行为，可能导致随机崩溃（[#26825](https://github.com/ggml-org/llama.cpp/issues/26825)）。
- **Strix Halo 输入层驻留 CPU 导致性能下降（中）**：#25700 分析 sched_reserve 将输入层分配到 CPU 而非 GPU 引起约 30% CPU 占用上升，与 #24712 的 Gated Delta Net 设备分配警告同源（[#25700](https://github.com/ggml-org/llama.cpp/issues/25700)）。
- **DFlash 被度回归（中）**：#25117 报告 AMD APU + 量化 MoE 上 DFlash 较基线慢约 2 倍（[#25117](https://github.com/ggml-org/llama.cpp/issues/25117)）；另有 #26108 报告 DFlash 下 Qwen3.6 27B 无法读取图片（[#26108](https://github.com/ggml-org/llama.cpp/issues/26108)）。
- **OpenAI 兼容接口 base64 图片 400/500（已关闭）**：#26770 已修复，base64 图片请求不再返回 nlohmann json 解析错误（[#26770](https://github.com/ggml-org/llama.cpp/issues/26770)）。
- **Blackwell SOFT_MAX 崩溃（中）**：#25060 报告 RTX 5090（SM 12.0）上大型模型 SOFT_MAX 崩溃，提供通过 PTX 规避的补丁描述（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）。
- **Windows Vulkan Intel Arc A770 挂起**：#25142，llama-server 并行翻译场景下系统挂起（[#25142](https://github.com/ggml-org/llama.cpp/issues/25142)）。
- **OpenVINO Windows 崩溃**：#25324 待复现（[#25324](https://github.com/ggml-org/llama.cpp/issues/25324)）。

## 对应用开发者的意义

- **MTP 不稳定影响生产可用性**：Qwen3.6 27B 等 MTP 模型在长会话后可能出现输出退化为重复 token 或非确定性生成，且跨请求状态残留意味着服务端无法保证隔离。当前无修复方案，生产环境建议谨慎启用 MTP 或在上游关闭后重启服务；追踪 #23577 获取进展。
- **多模态 base64 图片请求已修复**：#26770 合入后 OpenAI 兼容的 `/v1/chat/completions` 可正常处理 `image_url` + base64 数据，此前 500 报错的 client 代码无需再绕过。
- **Anthropic 路由支持 `id_slot`（进行中）**：#26758 为 `/v1/messages` 转换层补上 `id_slot` 透传，合入后使用 Anthropic SDK 的调用方也能指定 slot 做并发控制与上下文复用。
- **内存可见性改进（进行中）**：#26722 计划通过 C API 暴露 weights / context / compute 三类内存占用明细，便于服务端做容量规划与监控告警。
- **工具隔离选项增多**：#26774 为 `--tools-runtime` 增加 `ssh:<target>` 与 `podman rootless` 后端，Agent 场景下工具执行可无需 Docker 守护进程。

---

*数据来源：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) Issues/PRs/Releases，统计窗口为 2026-08-09 至 2026-08-10。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 2026-08-10

## 今日速览

今日 Ollama 的公开动态以稳定性回归报告和功能请求为主。最值得关注的是 MLX 后端曝出跨请求响应污染（数据串话）的严重 Bug，以及 Windows/CUDA 上出现固定 TTFT 回归；同时社区提交了 CLI 拖拽图片路径修复与 MLX 视觉输入支持等 PR。对于 Agent/应用开发者，工具调用相关的多项问题（namespace、解析失败、HF 拉取后能力缺失）需要重点关注。

## 版本发布与破坏性变更

今日无新版本 Release 发布。

## 新模型与硬件支持

- **MLX 后端新增图像输入支持**（[PR #17600](https://github.com/ollama/ollama/pull/17600)）：CLOSED 状态，实现 MLX 视觉 checkpoints 的图像输入，需保留 prefix caching 和 speculative decoding。Apple Silicon 上的视觉模型推理能力得到补全。
- **Cloud 模型请求 Kimi K3 已关闭**（[Issue #17235](https://github.com/ollama/ollama/issues/17235)）：该请求已关闭，未明确是否会引入该模型，云模型接入仍以官方路线为准。

## 性能与优化

- **dspark 加速选项请求**（[Issue #17016](https://github.com/ollama/ollama/issues/17016)）：社区请求将 dspark（推测解码加速）作为内置 flag 或自动启用，附有两个开源实现链接。目前仅是 feature request，未进入开发。
- **Ollama Cloud Prompt Cache 支持**（[Issue #16714](https://github.com/ollama/ollama/issues/16714)）：付费用户要求云端点提供 provider cache，以降低 agentic 场景的响应成本和延迟。仍未实现。

## 稳定性与回归

按严重程度排列（高 -> 低）：

1. **[严重] MLX 引擎跨请求响应污染**（[Issue #17599](https://github.com/ollama/ollama/issues/17599)）：在 `OLLAMA_KEEP_ALIVE=-1` 下，长驻 runner 间歇性返回早前请求的完整答案，属于跨请求数据泄漏。目前无修复 PR。
2. **[严重] Windows/CUDA TTFT 回归**（[Issue #17631](https://github.com/ollama/ollama/issues/17631)）：从 0.24.0 升级到 0.32.6 后，热请求首 token 延迟出现固定开销（Gemma E4B +156ms，qwen3 +44ms），且不随 prompt 大小变化。生成速度反而提升，疑似每次请求的固定开销（如初始化）导致。无修复 PR。
3. **[高] gpt-oss 工具调用解析错误**（[Issue #17638](https://github.com/ollama/ollama/issues/17638)）：gpt-oss:20b 在特定配置下产生工具调用后，Ollama 返回 HTTP 500 "error parsing tool call"。影响工具链稳定性，无修复 PR。
4. **[高] 从 HF 拉取的 GGUF 不应用内置 RENDERER/PARSER**（[Issue #17636](https://github.com/ollama/ollama/issues/17636)）：`ollama pull hf.co/...` 能识别架构，但未附加官方工具调用渲染/解析器，导致与本地库模型行为不一致，工具调用不可靠。无修复 PR。
5. **[中] 云 API 直接调用返回 402**（[Issue #17639](https://github.com/ollama/ollama/issues/17639)）：Pro 用户直接请求 `https://ollama.com/v1` 时提示 "extra usage only"，而通过本地客户端走 Pro 配额却正常，计费逻辑疑似不一致。
6. **[中] `/v1/chat/completions` 空 content 引发工具调用退化**（[Issue #14181](https://github.com/ollama/ollama/issues/14181)）：assistant 消息中 `content: ""` 与 `tool_calls` 并存时，qwen3-coder 从结构化工具调用切换到文本标记模式。无修复 PR。
7. **[中] CLI 拖拽图片路径 bug**（[Issue #10333](https://github.com/ollama/ollama/issues/10333)）：反斜杠转义或单引号路径导致图片加载失败。已有两个 PR 修复：
   - [PR #17640](https://github.com/ollama/ollama/pull/17640)（OPEN）：处理 `\@2x.png`, `\~`, `\#`, `\!` 等转义。
   - [PR #17634](https://github.com/ollama/ollama/pull/17634)（OPEN）：处理含单引号（apostrophe）的文件路径。
8. **[低] 聊天加载卡顿**（[Issue #17635](https://github.com/ollama/ollama/issues/17635)）：打开重聊天时一次性加载全部内容，导致严重卡顿。
9. **[已关闭] mllama 加载错误**（[Issue #16547](https://github.com/ollama/ollama/issues/16547)）：`unknown model architecture: 'mllama'` 已关闭，可能已通过其他渠道修复。

## 对应用开发者的意义

- **工具调用/Agent 链路注意**：#17638 (gpt-oss 解析失败) 和 #17636 (HF 拉取模型无官方 tool parser) 会导致 Agent 工具调用无法工作或行为不一致；同时 #15921（namespace 字段支持）和 PR #17630（过滤 namespace tools）正在推进 OpenAI Responses API 兼容性，未来使用 `mcp__tool__` 分组的应用将受益。若依赖 `tool_choice=any`，当前仍需自行处理重试（#11171）。
- **云 API 使用风险**: #17639 显示直接调用云 OpenAI 兼容端点可能与本地客户端的配额逻辑不一致，调用方需额外测试，避免生产环境 402。
- **MLX 视觉输入增强**: PR #17600 已关闭，本地 Apple Silicon 用户有望很快在 MLX 后端跑通图像模型，适合边缘视觉应用。
- **多文件 GGUF 导入仍未解决**（#5245，156 赞）：对于超过单文件的大模型（如 DeepSeek/V3 系列分片 GGUF），目前仍无法直接导入，需通过合并或工具转换，本地部署大型模型时请规划规避。
- **路径修复 PR 待合并**：#17640 和 #17634 若合并，CLI 中拖拽含空格/特殊字符的图片路径将正常工作，改善交互式多模态体验。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 — 2026-08-10

## 1. 今日速览

今日无新版本发布；核心动态集中在两处：一是流式场景的稳定性与计费正确性修复迎来密集 PR（Responses API 流式 item 生命周期、`/v1/messages` reasoning token 透传、OpenAI 兼容流式 usage 低估），二是限流器跳过无配置键的 Redis 写入（#31880）与 SSE keepalive（#34825）两项性能/网络优化进入活跃开发。另注意 FastAPI ≥0.141.0 的 ImportError 兼容问题已有修复（#35763 已关闭），但 1.97.0-RC1 引入了 usage 统计中断的回归（#36337，仍开放）。

## 2. 版本发布与破坏性变更

- **无新 Release（过去 24 小时）**。
- **FastAPI 兼容性破坏**：`fastapi>=0.141.0` 导致 LiteLLM proxy 启动失败（`ImportError: cannot import name 'get_flat_dependant'`），影响 v1.95.0，需固定 FastAPI 版本或升级 LiteLLM。[Issue #35763](https://github.com/BerriAI/litellm/issues/35763)
- **1.97.0-RC1 回归**：UI 中 usage stats 停止计数、成功/失败数归零，已跟踪待修。[Issue #36337](https://github.com/BerriAI/litellm/issues/36337)

## 3. 新模型与硬件支持

- **无新增硬件/量化格式动态**。
- **模型列表修正**：
  - AI21 模型列表已过时：J2 系列全部退役，仅保留 `jamba-large-1.7` 与 `jamba-mini-2`（含 2026 新 alias），需更新模型映射。[Issue #27094](https://github.com/BerriAI/litellm/issues/27094)
  - Z.AI Coding Plan 文档宣称支持 `glm-5.2[1m]`（1M 上下文变体），但实际请求返回 `Unknown Model`，仅裸 `glm-5.2` 可用。[Issue #32218](https://github.com/BerriAI/litellm/issues/32218)
- **模型定价修正**：修复 `apac.amazon.nova-2-lite-v1:0` 在地理定价表中不存在的问题，替换为 JP geo id。[PR #33776](https://github.com/BerriAI/litellm/pull/33776)

## 4. 性能与优化

- **限流器 Redis 写入削减（高价值）**：对无任何限流配置的 API key/user/team，跳过调用后的 Redis 计数器写入。当前每次 LLM 调用都无条件写 Redis，高吞吐下浪费显著，合并后将直接降低 Redis 负载与调用延迟。[Issue #31880](https://github.com/BerriAI/litellm/issues/31880)
- **SSE keepalive 防超时断开**：新增 `SSE_KEEPALIVE_INTERVAL_SECONDS`（默认关闭），在长时间 TTFT（首 token 延迟）期间发送 SSE 心跳，避免 ALB/nginx 60s 空闲超时杀掉健康流。[PR #34825](https://github.com/BerriAI/litellm/pull/34825)
- **least_busy 路由计数器修复**：修复并发竞争下 per-deployment 请求计数器可能变为负数、导致路由倾斜的问题（钳制在零值）。[PR #34444](https://github.com/BerriAI/litellm/pull/34444)

## 5. 稳定性与回归

**按严重程度排列：**

| 严重度 | 问题 | 状态 | 链接 |
|---|---|---|---|
| 高 | `/v1/messages` 对非 Anthropic 模型丢弃 reasoning tokens，客户只见 output_tokens | 有 fix PR #36378 | [Issue #36114](https://github.com/BerriAI/litellm/issues/36114)、[PR #36378](https://github.com/BerriAI/litellm/pull/36378) |
| 高 | 流式 usage 严重低估（provider 无关）：链式代理场景下流式 usage 远低于非流式，根因在 stream aggregation 层 | 开放，排查中 | [Issue #36114](https://github.com/BerriAI/litellm/issues/36114) |
| 高 | FastAPI ≥0.141.0 ImportError 导致 proxy 无法启动 | 已关闭 | [Issue #35763](https://github.com/BerriAI/litellm/issues/35763) |
| 中 | 1.97.0-RC1 usage stats 全部归零 | 开放 | [Issue #36337](https://github.com/BerriAI/litellm/issues/36337) |
| 中 | Responses API 流式中 content event 无 announce、output_index 重复、reasoning item id 不稳定 | 有 fix PR #36375 | [PR #36375](https://github.com/BerriAI/litellm/pull/36375) |
| 中 | Responses API 流式输出在 Langfuse 中丢失（空 terminal output 丢弃已完成 items） | 有 fix PR #36362 | [PR #36362](https://github.com/BerriAI/litellm/pull/36362) |
| 中 | Anthropic 流桥接遇 OpenAI/Azure 空 `choices` chunk 崩溃 | 已关闭 | [Issue #30761](https://github.com/BerriAI/litellm/issues/30761) |
| 中 | 上游流重置被转换为合成的 `finish_reason: stop` / `[DONE]`，掩盖真实失败 | 已关闭 | [Issue #33404](https://github.com/BerriAI/litellm/issues/33404) |
| 中 | `unpack_defs` 在递归 tool schema 上仍无界挂起（Bedrock/Vertex 未传字节预算） | 开放 | [Issue #34328](https://github.com/BerriAI/litellm/issues/34328) |
| 中 | Vertex Gemini web search + streaming 遇空 choices chunk 崩溃 | 已关闭 | [Issue #27928](https://github.com/BerriAI/litellm/issues/27928) |
| 低 | 成本计算：未知 OpenAI 模型 `cost_per_token()`/`completion_cost()` 抛异常而非返回 `(0.0, 0.0)` | 有 fix PR #36379 | [Issue #27581](https://github.com/BerriAI/litellm/issues/27581)、[PR #36379](https://github.com/BerriAI/litellm/pull/36379) |
| 低 | OpenAI Responses API 缓存读/写成本未分项统计 | 有 fix PR #34459 | [PR #34459](https://github.com/BerriAI/litellm/pull/34459) |
| 低 | xAI 模型 web_search 计费使用旧字段，未按 `server_side_tool_usage_details` $5/1k calls 计费 | 有 fix PR #30817 | [PR #30817](https://github.com/BerriAI/litellm/pull/30817) |
| 低 | 文件内容调用对 placeholder `default-message-value` 错误计费，导致 input cost 3 倍 | 已关闭 | [PR #35140](https://github.com/BerriAI/litellm/pull/35140) |
| 低 | validate_environment 漏报 sambanova/hyperbolic/lambda_ai/heroku 缺失 API key | 有 fix PR #33774、#33791 | [PR #33774](https://github.com/BerriAI/litellm/pull/33774)、[PR #33791](https://github.com/BerriAI/litellm/pull/33791) |
| 低 | NVIDIA NIM 图片 passage 被转成 JSON 文本、ranking 请求误发 `top_k` | 有 fix PR #34177 | [PR #34177](https://github.com/BerriAI/litellm/pull/34177) |
| 低 | Bedrock Web Search 在 `/v1/responses` 被静默丢弃（Mantle 工具过滤） | 有 fix PR #35987 | [PR #35987](https://github.com/BerriAI/litellm/pull/35987) |
| 低 | 双成本映射表漂移（canonical vs backup），同模型解析出不同元数据 | 有 fix PR #34527 | [PR #34527](https://github.com/BerriAI/litellm/pull/34527) |
| 低 | Fireworks AI 收到 Anthropic adapter 传来的 dict 形式 `reasoning_effort`，报 400 | 有 fix PR #35650 | [PR #35650](https://github.com/BerriAI/litellm/pull/35650) |
| 低 | Hosted vLLM rerank 请求 per-query 成本记录为零 | 有 fix PR #35195 | [PR #35195](https://github.com/BerriAI/litellm/pull/35195) |

## 6. 对应用开发者的意义

1. **流式计费与 usage 数据需复核**：若你的应用依赖流式响应中的 usage 做成本核算或 token 计量，当前存在两个已知缺陷——OpenAI 兼容流式 usage 低估（#36114，尚未修复）和 Anthropic 端点 reasoning token 丢失（#36378 修复中）。在 fix 合入前，建议以非流式请求的 usage 为基准做交叉验证。

2. **FastAPI 版本需锁定**：升级到 `fastapi>=0.141.0` 会直接导致 proxy 无法启动，若你近期升级了 FastAPI，请先固定版本或升级 LiteLLM 到含修复的版本（#35763）。

3. **1.97.0-RC1 存在 usage 统计回归**：当前 RC 版本在 UI 中停止计数，生产环境建议停留在 1.95.0/1.96.x 稳定线，等待官方修复。

4. **Responses API 流式兼容性正在补齐**：多个 PR（#36375、#36362、#35987）正在修复流式 item 生命周期、Langfuse 追踪丢失和 Bedrock web_search 丢弃问题。若你正在用 Responses API + 流式 + 可观测性链路，值得关注这些合入节奏。

5. **网络超时优化可选开启**：若你的部署位于 ALB/nginx 之后并遇到慢模型首 token 超时，可关注 `SSE_KEEPALIVE_INTERVAL_SECONDS` 配置（默认关闭）——这是一个无需改代码即可缓解 60s 空闲断连的手段。

6. **计费准确性修复密集落地**：xAI web_search 计费、文件内容 token 误计费、缓存成本分项、hosted vLLM rerank 计费均有修复 PR 在途。对成本敏感的团队建议在下一版本发布后优先验证这些场景的计费报表。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-10

## 1. 今日速览

- 发布 **v0.1.527-beta**，修正 Studio 缓存管道信号判定逻辑，并将安装脚本依赖下限锁定为 `unsloth>=2026.8.3`。
- MiniMax-H3 成为 Studio 第二个可训练视频模型家族，支持带声音片段的视频+音频联合 LoRA（[#8244](https://github.com/unslothai/unsloth/pull/8244)），并新增 INT8 denoiser（ConvRot）加载路径（[#8293](https://github.com/unslothai/unsloth/pull/8293)）。
- 多起 AMD/ROCm diffusion 显存与稳定性问题已关闭（[#8081](https://github.com/unslothai/unsloth/issues/8081)、[#8188](https://github.com/unslothai/unsloth/issues/8188)、[#7878](https://github.com/unslothai/unsloth/issues/7878)），但 Wan2.2-TI2V-5B 在 ROCm gfx1200 上因 SDPA 回退 math kernel 申请 66.5 GiB 显存的问题仍在排查（[#8225](https://github.com/unslothai/unsloth/issues/8225)）。

## 2. 版本发布与破坏性变更

**v0.1.527-beta（2026-08-10）**
- Studio：按行实际加载的 snapshot 判定缓存管道信号，而非依据过期的全局信号（[#7851](https://github.com/unslothai/unsloth/pull/7851)）。
- 安装脚本：install.sh / install.ps1 固定 pin 到 `unsloth>=2026.8.3`（[#7860](https://github.com/unslothai/unsloth/pull/7860)）。
- 无明确破坏性 API/配置变更；但新版本下限约束会影响旧环境升级，建议 CI 镜像中同步更新依赖。

## 3. 新模型与硬件支持

- **MiniMax-H3 INT8 denoiser（ConvRot checkpoint）**：权重复用 block-Hadamard 旋转基，loader 同步旋转激活值以匹配；INT8 路径对 GEMM 两侧同时量化（[#8293](https://github.com/unslothai/unsloth/pull/8293)）。
- **MiniMax-H3 视频+音频联合 LoRA 训练**：Studio 首个支持带声音片段训练的视频家族，依赖前置 PR #8196、#7989（[#8244](https://github.com/unslothai/unsloth/pull/8244)）。
- **视频片段数据集选择**：diffusion 数据集层从 image-only 扩展为支持视频片段，`GET /api/train/diffusion/info` 将列出片段数据集（[#8287](https://github.com/unslothai/unsloth/pull/8287)）。
- **Apple Silicon 视频生成**：移除 macOS 视频页禁用门槛，与 CUDA 走同一套 diffusers 管线（[#8198](https://github.com/unslothai/unsloth/pull/8198)）。
- **Z-Image LoRA 可选未蒸馏底座**：新增 `Tongyi-MAI/Z-Image`（非 Turbo），对齐上游 diffusers DreamBooth 参考实现（[#8291](https://github.com/unslothai/unsloth/pull/8291)，修复 [#8270](https://github.com/unslothai/unsloth/issues/8270)）。

## 4. 性能与优化

- **已关闭 / 已修复**：AMD diffusion 不再回退到 whole-module offload——此前 20 步 1024×1024 图像耗时 48m25s，其中采样仅 1m47s（5.40 s/it），其余时间消耗在 PCIe 子模块换页和 VAE tile 解码（[#8081](https://github.com/unslothai/unsloth/issues/8081)）。
- **已关闭 / 已修复**：Strix Halo 上 Studio 将可用显存硬编码为 80%，现已放开（[#7878](https://github.com/unslothai/unsloth/issues/7878)）。
- **进行中**：多 GPU 主机上 diffusion 显存预算只按单卡计算，导致模型被卸载到系统 RAM（约 70 GiB RAM / 1 GiB VRAM，双 24 GB 卡配置），第二张卡闲置（[#8235](https://github.com/unslothai/unsloth/issues/8235)）。
- **进行中**：Wan2.2-TI2V-5B（3.4 GB 权重）在 16 GB 卡上请求 66.54 GiB 单次分配——ROCm gfx1200 上无 flash/memory-efficient SDPA，回退 math kernel 物化完整 N×N 分数矩阵（[#8225](https://github.com/unslothai/unsloth/issues/8225)）。

## 5. 稳定性与回归

按严重程度排列，标注修复状态：

| 级别 | 问题 | 状态 |
|---|---|---|
| 高危 | AMD Windows ROCm 图像生成在显存预算不足时静默耗尽主机 RAM（可用内存 <1.2 GB，pagefile >50 GB）；Linux 同场景会正常抛 `torch.OutOfMemoryError`（[#8188](https://github.com/unslothai/unsloth/issues/8188)） | **已关闭** |
| 高危 | Wan2.2-TI2V-5B 在 16 GB 卡上申请 71 GB，SDPA 回退 math kernel（[#8225](https://github.com/unslothai/unsloth/issues/8225)） | 无 fix PR |
| 中危 | Studio 推理子进程在模型卸载后仍持有 VRAM，GGUF context fit 无法感知，导致显存超卖（[#8220](https://github.com/unslothai/unsloth/issues/8220)） | **已关闭** |
| 中危 | 5060 Ti 16 GB 无法加载 NVFP4 格式（[#8246](https://github.com/unslothai/unsloth/issues/8246)） | 无 fix PR |
| 中危 | Qwen3-Coder-30B-A3B GGUF 经 Ollama 工具调用不可靠；根因已确认，修复提交至 Ollama 上游（[#8266](https://github.com/unslothai/unsloth/issues/8266)） | 上游修复中 |
| 中危 | diffusion GGUF 选择器只显示 GGUF 文件大小，不包含 text encoder/VAE 等必需 companion 资产（[#8234](https://github.com/unslothai/unsloth/issues/8234)） | 有 fix PR [#8289](https://github.com/unslothai/unsloth/pull/8289) |
| 中危 | Z-Image LoRA 训练只提供蒸馏版 Turbo 底座，与上游训练配方不一致（[#8270](https://github.com/unslothai/unsloth/issues/8270)） | 有 fix PR [#8291](https://github.com/unslothai/unsloth/pull/8291) |
| 中危 | FLUX.2 Klein LoRA 训练误用蒸馏 checkpoint 且遗漏 single-stream attention 输出投影，导致生成"通用小狗"而非训练主体（[#8267](https://github.com/unslothai/unsloth/pull/8267)） | 有 fix PR |
| 中危 | diffusion 训练默认 constant scheduler 下 `lr_warmup_steps` 静默无效（[#8269](https://github.com/unslothai/unsloth/issues/8269)） | 无 fix PR |
| 中危 | torchcodec 与 torch 版本不匹配时兼容性守卫失效（torch 2.11）（[#7474](https://github.com/unslothai/unsloth/pull/7474)） | 有 fix PR |
| 低危 | Nemotron attention 处理 bug（[#7527](https://github.com/unslothai/unsloth/issues/7527)） | 无 fix PR |
| 低危 | macOS 安装器在 bundle 内创建自引用符号链接，App 无限嵌套（[#8279](https://github.com/unslothai/unsloth/pull/8279)） | 有 fix PR |
| CI | main 分支 diffusers 预检测试仅在 GPU 主机通过导致全红（[#8281](https://github.com/unslothai/unsloth/pull/8281)）；Backend CI 超时设置不当导致大量 PR 误报失败（[#8286](https://github.com/unslothai/unsloth/pull/8286)） | **已关闭** |

## 6. 对应用开发者的意义

- **Ollama + GGUF 工具调用**：使用 `hf.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF` 构建 agent 的开发者当前可能遇到 `<tool_call>` 输出不稳定；根因在 Ollama 侧，修复已提交上游，建议跟踪 [#8266](https://github.com/unslothai/unsloth/issues/8266) 后再升级依赖。
- **API 监控准确性**：对不发送 `stream_options.include_usage` 的 OpenAI 兼容客户端（如 Tencent Code Buddy），Studio API monitor 将不再显示空白 token 计数（[#8294](https://github.com/unslothai/unsloth/pull/8294)）。
- **工具调用产物可视化**：python/terminal 工具调用生成的文件将集中展示在所属会话中，不再散落于用户主目录三个文件夹（[#8256](https://github.com/unslothai/unsloth/pull/8256)）。
- **diffusion 模型磁盘预算**：GGUF 选择器此前只显示权重文件大小，实际下载量会被 text encoder/VAE 等 companion 资产显著放大；修复合并前请按 2-4 倍权重大小预留磁盘（[#8234](https://github.com/unslothai/unsloth/issues/8234) / [#8289](https://github.com/unslothai/unsloth/pull/8289)）。companion 资产的生命周期与复用策略仍有待明确（[#8116](https://github.com/unslothai/unsloth/issues/8116)）。
- **多 GPU 部署注意**：多卡主机的 diffusion 生成/训练仍可能只算单卡预算、把模型放到主机内存，生产环境建议临时用单卡限制或等待 #8235 修复（[#8235](https://github.com/unslothai/unsloth/issues/8235)）。
- **新训练能力**：MiniMax-H3 视频+音频联合 LoRA 与 Apple Silicon 视频生成为多模态应用开发提供了新选项，但仍处于 PR 阶段，生产使用前建议做质量回归（[#8244](https://github.com/unslothai/unsloth/pull/8244)、[#8198](https://github.com/unslothai/unsloth/pull/8198)）。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*