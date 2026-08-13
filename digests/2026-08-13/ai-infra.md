# AI 基础设施日报 2026-08-13

> 生成时间: 2026-08-13 01:04 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-13）

## 1. 生态全景

今日六大项目均无稳定版 Release 发布，但 llama.cpp 保持高频迭代（24 小时内连发 3 个 patch 版），而 vLLM、SGLang 则处于"0.27.0/0.5.17 发布后回归集中暴露期"——两个头部引擎今日合计出现 9 例无修复 PR 的高严重度缺陷，其中 DeepSeek V4 相关占 4 例，说明新模型快速接入与引擎稳定性的矛盾已取代单纯性能竞争，成为当前基础设施的核心张力。性能优化火力集中在三个方向：推测解码（DSpark/DFlash/GDN）、低比特量化（NVFP4/MXFP4）与 KV cache 工程化。硬件层面，Blackwell（SM100/120）与 ROCm 成为新的兼容性雷区，XPU/NPU 等异构后端开始进入实用阶段但仍是"第二梯队"。Agent 应用正在反向驱动基础设施——Ollama 与 LiteLLM 的 OpenAI 兼容层迭代、Unsloth 的本地工具调用支持，均显示出"为 agent 服务"已成为跨层级共识。

## 2. 各项目活跃度对比

> 注：下表 Issue/PR 数为日报中提及的活跃条目（含 OPEN/CLOSED/MERGED），非 GitHub 全量统计，但可反映当日讨论密度与焦点分布。

| 项目 | 提及 Issues | 提及 PRs | Release 情况 | 当日焦点 |
|---|---|---|---|---|
| vLLM | ~14 | ~11 | 无新 Release；0.27.0 集中回退 | 稳定性回归（引擎停滞、Gemma4 镜像）、DSpark/多模态优化 |
| SGLang | ~19 | ~16 | 无新 Release | DSV4 稳定性、PD-disagg 架构统一、AMD 内核优化 |
| llama.cpp | ~15 | ~11 | **3 个**（b10369/b10373/b10375） | Qwen 工具调用修复、pocket-tts 多模态、RPC tensor 并行 |
| Ollama | ~11 | ~13 | **1 个 RC**（v0.32.10-rc1） | repeat_penalty 默认值变更、MLX KV connector、OpenAI 兼容层 |
| LiteLLM | ~13 | ~10 | 无新 Release | spend log 数据丢失修复、Parallel AI/Muse 接入、成本映射修正 |
| Unsloth | ~17 | ~14 | 无新 Release | Windows/macOS/AMD 平台阻断问题、Deep Research 冻结修复 |

**解读**：llama.cpp 是唯一保持正常版本节奏的项目；Ollama 以 RC 形式推进；vLLM 与 SGLang 的高 issue 提及量反映的是"发布后阵痛"而非活跃度下降——两者 PR 侧仍在推进高价值优化（如 vLLM #52041 多模态广播跳过、SGLang #31856 AMD FP8 量化）。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | 领先者 |
|---|---|---|---|---|---|
| **DeepSeek V4 / V4 Flash** | XPU 序列并行（#51346）；但启动失败、SM120 崩溃、乱码等多线问题 | 0.5.17 scheduler hang、1M OOM、多节点死锁；有独立性能追踪 #33636 | ROCm gfx1151 下 prefill 崩溃；RPC 场景可利用 | 仅社区请求（#17510） | **vLLM**（并行支持最完整，但稳定性均差） |
| **Kimi K3** | ROCm MLA 头填充 + 投影优化（2 PR 推进） | Day0 支持已合入，DSpark 变体可用；MLA 融合改动被 revert | 新文本模型 PR #26185（OPEN） | 未提及 | **SGLang**（率先 Day0 落地） |
| **Gemma 4** | Docker 镜像绑定 Transformers 5.15 启动失败 | 未明确提及 | SWA 路径遗漏关键信息（#25751） | think=false 输出 `<unused49>`（#17459） | 均不稳定，无领先者 |
| **Qwen3.5 / 3.6** | 未明确提及 | 未明确提及 | b10375 专门修复工具调用解析；OpenVINO 支持 PR #26952 | Qwen3.6 hybrid 在 CUDA 回退 CPU（#17669） | **llama.cpp**（工具调用修复最深入） |
| **GLM-5** | 未明确提及 | DSA decode 跳过 indexer GEMM（#31324） | 未明确提及 | 未明确提及 | **SGLang** |
| **MiniMax-M3 / M2.7** | NVFP4 修复后 EAGLE3 加速 2.1–2.3x（8x B200） | M2.7 CPU 优化（#31956） | 未明确提及 | 社区请求 M3 GGUF；macOS 加载失败（Unsloth 侧） | **vLLM**（性能数据最硬） |
| **pocket-tts（TTS）** | — | — | b10369 已合入，multimodal 扩展至语音合成 | — | **llama.cpp** |
| **Longcat-Flash** | — | — | PR #19182（OPEN） | — | **llama.cpp**（独家） |

**关键判断**：SGLang 在新模型 Day0 接入速度上领先（Kimi K3、GLM5），vLLM 在后端硬件适配广度上领先（XPU/ROCm），llama.cpp 在模型多样性与工具调用正确性上领先，Ollama 明显是跟随者角色。DeepSeek V4 是今日所有引擎共同的"阿喀琉斯之踵"——无一项目能提供稳定生产体验。

## 4. 性能优化前沿

| 方向 | 具体进展 | 项目分布 |
|---|---|---|
| **推测解码调度** | DSpark 置信度自适应验证预算（#47808）、DFlash 调度槽位修正（#51256）、GDN 元数据去重（#52078）、GDN 验证路径避免 QKV materialize（#33778） | vLLM 3 PR / SGLang 1 PR |
| **量化内核** | NVFP4 修复后首次性能验证（2.1–2.3x）、AMD NVFP4→MXFP4 在线重量化（#29328）、MXFP4 dense-FP8 路径（#28932）、AITER BF16 Q 在线 FP8 量化（#31856）、NVFP4 MLX prefill 融合 7–8%（#17703） | vLLM / SGLang 3 PR / Ollama 1 PR |
| **KV cache 与前缀缓存** | 多模态张量广播跳过（#52041）、MLX KV connector 持久化前缀（#17707）、KVBlockZeroer 修复（#52058）、ROCm HiCache 性能待定位（#34611） | vLLM 2 PR / Ollama 1 PR / SGLang 1 issue |
| **分布式/并行** | RPC tensor 并行（#26610）、XPU 序列并行（#51346）、PD-disagg 单协议层统一（#34510）、DeepEP CUDA graph 失败（#29942） | llama.cpp / vLLM / SGLang |
| **算子/内核** | FlashInfer Mega MoE 接入（#31470）、GLM5 dense k-only fast path（#31324）、RMSNorm 舍入边界修复（#49639）、CRI 300MXFP8 GEMM cute-dsl 后端（#34042） | SGLang 3 PR / vLLM 1 PR |
| **调度与内存** | AMD 显存池折减移除（#25199）、VRAM 预算比例可调（#8589） | SGLang / Unsloth |

**观察**：推测解码的优化已从"提升命中率"转向"控制验证开销与调度槽位"，说明该技术进入精细化运营阶段；多模态与 PD-disagg 是流动最快的两个方向；量化侧 AMD 路线（NVFP4→MXFP4）正在形成独立于 NVIDIA 的生态分支。

## 5. 分层定位差异

| 层级 | 项目 | 定位 | 核心指标 | 今日状态 |
|---|---|---|---|---|
| **生产级推理引擎** | vLLM / SGLang | 高吞吐、多卡/多节点、企业级 Serving | 吞吐、显存效率、稳定性 | 功能最全但版本发布后阵痛明显，建议锁版本 |
| **本地/边缘运行时** | llama.cpp / Ollama | 单机、离线、轻量部署、开发者桌面 | 易用性、平台覆盖、启动速度 | llama.cpp 迭代最快；Ollama 在"默认值变更"上更激进 |
| **LLM 网关/代理** | LiteLLM | 多提供商路由、成本追踪、限流、统一 API | 计费准确、可靠性、Provider 覆盖 | 增量以新 Provider 接入为主；spend 数据一致性是短板 |
| **微调/训练框架** | Unsloth | 参数高效微调 + 本地推理 Studio | 显存节省、训练速度、跨平台安装 | 专注 Studio 产品化；平台兼容性（Win/macOS/AMD）是当前主战场 |

**关键差异**：vLLM/SGLang 解决"如何服务更多人"，llama.cpp/Ollama 解决"如何在本地跑起来"，LiteLLM 解决"如何管好多个后端"，Unsloth 解决"如何低成本定制模型"。四层并非竞争关系，而是 agent 应用的完整技术栈——LiteLLM 承接上层路由，vLLM/SGLang 或 llama.cpp/Ollama 作为执行后端，Unsloth 负责模型迭代。今日动态显示，**各层级都在向"agent 就绪"靠拢**：Ollama 在补 reasoning/web_search 的 OpenAI 兼容语义，Unsloth 在给本地端点加工具调用，LiteLLM 在修流式响应中的推理内容透传。

## 6. 值得关注的趋势信号

**行业趋势：**

1. **"发布后回归"成为引擎迭代的新常态成本**：vLLM 0.27.0 一日内暴露 3 例阻断级回归，SGLang 0.5.17 亦有 scheduler hang。核心原因是大模型（DSV4/Kimi K3）频繁更新 + Transformers 绑定版本漂移。对平台团队的含义：**建立与硬件/模型组合绑定的 CI 回归门禁**（SGLang #34640 已开始做 AMD DSV4 nightly 性能门禁），并储备可快速回退的镜像/版本。
2. **DeepSeek V4 生态仍是"半成品"**：从 vLLM 的启动失败/乱码/路由崩溃，到 SGLang 的 hang/OOM/死锁，到 llama.cpp 的 ROCm 崩溃——DSV4 的 MLA 稀疏注意力 + FlashInfer + 新硬件的组合尚未在任何引擎上达到生产级稳定。依赖 DSV4 的服务应预留 2 个可回退版本，并避免在 SM120/ROCm 等新硬件上做关键部署。
3. **Blackwell 与 ROCm 是兼容性投入的新主战场**：SM100/103 NVFP4 NaN（SGLang）、SM120 FlashInfer 路由失败（vLLM）、RTX 5080 ~40% 性能回归（llama.cpp）、ROCm HiCache 劣化（SGLang）、ROCm 预编译不可用（llama.cpp）——新旧架构的割裂正在扩大，硬件验证矩阵必须包含 Blackwell 与 AMD 旗舰卡。
4. **Agent 工具调用正确性正在替代原始吞吐成为竞争指标**：llama.cpp 专门发版修复 Qwen bare function 解析，Ollama 修复 JSON grammar 截断 thinking token，Unsloth 修复 GGUF 工具循环中 reasoning 丢失，LiteLLM 修复响应中推理内容不返回。**这说明 agent 工作负载（长 system prompt、工具循环、流式推理展示）已从"边缘场景"变为"默认场景"**，基础设施的验收标准正在从 `tokens/s` 转向"多轮工具调用下的端到端正确率"。
5. **多模态范围扩大至语音合成**：llama.cpp 合入 pocket-tts，Ollama 为 MLX 增加 RADIO 视觉编码器，vLLM 在解决多模态张量通信开销——TTS/ASR/视觉的统一推理正在成为引擎的标配能力，而不仅是文本 LLM 的附加项。

**对 Agent/应用开发者的操作建议：**

- **锁版本策略**：vLLM 停留 0.26.x，SGLang 坚持 0.5.16 并跟踪 #33636，llama.cpp 升级到 b10375（Qwen 工具调用修复直接影响 agent 正确性）。
- **DeepSeek V4 慎上生产**：任何基于 DSV4 的服务都需要保留快速回退路径，并建立评分基线（SGLang #33659 已证明版本间存在 3–4pt 评分波动）。
- **推测解码参数需重新 benchmark**：vLLM 的 DSpark/DFlash 修复合入后，以及 Ollama 关闭 repeat_penalty 默认值后，高并发/投机解码场景的性能曲线都会变化，建议在目标负载下重新压测。
- **多模态与 PD-disagg 预留适配空间**：vLLM #52041 会改变 TP 集群通信模式，SGLang 的 PD-disagg 协议统一（#34510）会影响深度集成的传输层代码——做平台集成的团队应关注这两个 PR 的合入节奏。
- **成本与计费系统注意数据一致性**：LiteLLM 的 spend log 队列修复（3 个 PR 并行）和 Azure 成本映射错误（#36192）都直接影响计费准确性，做成本分析的需求方应在修复合入后复核数据。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 2026-08-13

## 1. 今日速览

今日最值得关注的是：**vLLM 0.27.0 发布后集中出现多例稳定性回归**（引擎闲置停滞、DeepSeek V4 Flash 启动失败等），携带该版本的 Docker 镜像同样存在 Gemma4 启动问题，升级前应充分评估；**性能侧有两项重要进展**：DSpark 置信度调度验证（PR #47808）与多模态张量广播跳过（PR #52041），分别面向高并发推测解码和多模态前缀缓存场景的优化；**硬件支持上**，XPU 后端新增 DeepSeek V4 序列并行支持（PR #51346），ROCm 后端继续推进 Kimi-K3 的 MLA 算子落地（PR #51647）。

## 2. 版本发布与破坏性变更

过去 24 小时无新 Release。但 0.27.0 的回归报告值得注意：从 0.26.0 升级到 0.27.0 后运行 DeepSeek V4 Flash 出现错误（[Issue #51758](https://github.com/vllm-project/vllm/issues/51758)），且 `vllm-openai:latest`（0.27.0）因捆绑 Transformers 5.15.0 无法启动 Gemma4 模型（[Issue #51744](https://github.com/vllm-project/vllm/issues/51744)）。建议升级前在目标硬件与模型组合上先行验证。

## 3. 新模型与硬件支持

- **[XPU] DeepSeek V4 序列并行支持**（[PR #51346](https://github.com/vllm-project/vllm/pull/51346)）：为 XPU 后端新增 SP 支持，注意力激活沿序列维度分片，降低 MoE 和 hyper-connection 阶段的显存占用。
- **[ROCm] Kimi-K3 MLA 头填充**（[PR #51647](https://github.com/vllm-project/vllm/pull/51647)）：对非 16 对齐的 AITER MLA query heads 进行填充，使 Kimi-K3 TP4 每 rank 24 头能够使用 AITER MLA 而非回退到 Triton。
- **[ROCm] Kimi-K3 投影输出直接返回**（[PR #50592](https://github.com/vllm-project/vllm/pull/50592)）：移除 KDA 与 MLA 输出投影后多余的分配和拷贝，两个注意力族均受益。
- **[Kimi-K3] ROCm 支持路线图跟踪**（[Issue #50682](https://github.com/vllm-project/vllm/issues/50682)）：仍在跟踪 AITER fused-moe 的 a16w4/a8w4 集成基线。
- **ModelRunnerV2 prompt embeds 支持**（[PR #42963](https://github.com/vllm-project/vllm/pull/42963)）：为 V2 ModelRunner 增加 prompt embeddings 能力。

## 4. 性能与优化

- **DSpark 置信度调度验证**（[PR #47808](https://github.com/vllm-project/vllm/pull/47808)）：改为按每请求置信度自适应调整验证预算，避免固定 k 推测在高并发时 GPU 饱和导致的验证开销倒挂。方向正确，但需关注合并后的实际收益。
- **多模态前缀缓存广播跳过**（[PR #52041](https://github.com/vllm-project/vllm/pull/52041)）：当 KV 缓存覆盖请求输入时，不再向 TP worker 广播大型多模态张量，显著降低多模态输入下的通信开销。
- **GDN 元数据构建去重**（[PR #52078](https://github.com/vllm-project/vllm/pull/52078)）：消除 `num_decode_draft_tokens_cpu >= 0` 掩码的重复计算，减少 spec decode 检测路径上的不必要张量操作。
- **DFlash 调度预算修正**（[PR #51256](https://github.com/vllm-project/vllm/pull/51256)）：为 DFlash 的 bonus query 预留调度槽位，避免 `max_num_batched_tokens` 边界下每请求少一个槽位的问题。
- **MiniMax-M3-NVFP4 修复后首轮性能数据**（[Issue #51494](https://github.com/vllm-project/vllm/issues/51494)）：8x B200 上 100 万 token 真实散文测试，EAGLE3 解码加速 2.1–2.3 倍；这是 NVFP4 正确性修复（#48929）后的首批数据，但尚未进入稳定版。
- **Rust vs PyTorch 预处理基准**（[Issue #47601](https://github.com/vllm-project/vllm/issues/47601)）：社区在持续对比 rust 与 torch 预处理性能，目前仍在讨论阶段。

## 5. 稳定性与回归

按严重程度排列，标注修复进展：

**严重（阻断级）**

- **v0.27.0 引擎闲置约 1 分钟后永久停滞**（[Issue #51921](https://github.com/vllm-project/vllm/issues/51921)）：4 节点 TP=4（GB10/sm_121, aarch64），request 无法到达 scheduler，API 仍响应。无 fix PR，建议回退 0.26.x。
- **0.27.0 运行 DeepSeek V4 Flash 报错**（[Issue #51758](https://github.com/vllm-project/vllm/issues/51758)）：升级后启动即失败。无 fix PR。
- **Docker latest 镜像无法启动 Gemma4**（[Issue #51744](https://github.com/vllm-project/vllm/issues/51744)）：捆绑 Transformers 5.15.0 导致启动失败，影响 `vllm-openai:latest` 用户。无 fix PR，可先固定旧镜像。
- **DeepSeek-V4-Flash + DSpark 在 SM120 上 FlashInfer 稀疏 MLA 路由失败**（[Issue #50720](https://github.com/vllm-project/vllm/issues/50720)）：RTX PRO 6000 Blackwell（SM120）上 decode kernel 路由崩溃。无 fix PR。
- **Intel Arc B50 双卡 TP=2 崩溃**（[Issue #48953](https://github.com/vllm-project/vllm/issues/48953)）：`zeMemOpenIpcHandle` 返回 `INVALID_ARGUMENT`，已有 issue #41663 关联。无 fix PR。

**中等（功能性/性能回退）**

- **DeepSeek V4 Flash 输出乱码**（[Issue #43416](https://github.com/vllm-project/vllm/issues/43416)）：`--enable-prefix-caching` 开启时出现乱码，影响镜像版本 v0.21.0。无 fix PR。
- **动态推测解码吞吐量崩溃**（[Issue #49548](https://github.com/vllm-project/vllm/issues/49548)）：`num_speculative_tokens_per_batch_size` 在 batch size 阈值处导致聚合吞吐量骤然下降，伴随 cudagraph 降级。无 fix PR。
- **hybrid-SWA 前缀缓存归零**（[Issue #48435](https://github.com/vllm-project/vllm/issues/48435)）：Gemma-4-31B 多会话 round-robin 工作负载下，前缀缓存复用率在约 25% 池占用时突降至 0，滑动窗口缓存回收顺序有疑。无 fix PR。
- **双 Battlemage GPU PP=2 崩溃**（[Issue #46072](https://github.com/vllm-project/vllm/issues/46072)）：Arc Pro B70 + Arc B580 流水线并行加载成功但运行不稳定。无 fix PR。

**已有关联修复的 PR**

- **RMSNorm 舍入边界修复**（[PR #49639](https://github.com/vllm-project/vllm/pull/49639)）：解决 CUDA kernel 与 unfused `scalar_t` 路径的 bit 级差异，影响 greedy NGRAM/speculative 验证正确性。对应 Issue #49616。
- **KVBlockZeroer 启动溢出修复**（[PR #52058](https://github.com/vllm-project/vllm/pull/52058)）：修复 CI 上 KV block 清零 kernel 启动配置溢出问题。

**其他值得关注**

- **安全：setuptools 最低版本提升**（[Issue #51993](https://github.com/vllm-project/vllm/issues/51993)）：`requirements/common.txt` 中的已知安全漏洞，建议关注。
- **Scheduler 死锁**（[Issue #42381](https://github.com/vllm-project/vllm/issues/42381)）：`VLLMValidationError` 在 prompt 超过 max_model_len 一个 token 时触发死锁，老 issue 但仍在活跃更新。

## 6. 对应用开发者的意义

- **0.27.0 升级需谨慎**：今日多例严重回归集中在 0.27.0，且覆盖引擎停滞、DeepSeek V4 Flash 启动、Gemma4 镜像兼容性。如果正在使用 0.26.x 或更早版本，建议暂缓升级，等待热修复或下一个小版本。
- **DeepSeek V4 Flash 生态仍不稳定**：启动失败、输出乱码、SM120 路由崩溃、ROCm OOM（[Issue #41962](https://github.com/vllm-project/vllm/issues/41962)）等多条线并发，依赖该模型的线上服务应保留可快速回退的版本，并避免在 Blackwell/ROCm 等非主流平台上做关键部署。
- **推测解码参数需实测**：动态推测解码（`num_speculative_tokens_per_batch_size`）存在吞吐量悬崖，DSpark 调度优化（[PR #47808](https://github.com/vllm-project/vllm/pull/47808)）和 DFlash 槽位修复（[PR #51256](https://github.com/vllm-project/vllm/pull/51256)）即将落地，建议合入后重新 benchmark 高并发场景。
- **多模态推理性能将改善**：PR #52041 通过跳过前缀缓存命中的多模态张量广播，直接降低多模态输入在 TP 集群上的通信开销；Whisper 词级时间戳功能（[PR #47664](https://github.com/vllm-project/vllm/pull/47664)）也在推进中，多模态应用可关注这两个 PR。
- **工具调用解析器修复在路上**：PR #51649 修复了 pythonic tool parser 中 `1e999` 等极端参数导致 JSON 安全异常的问题，对 agent 类应用有直接帮助，但尚未合并，可在本地 patch 使用。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-13

## 今日速览

今日无新版本发布，社区重点集中在 **DeepSeek-V4 稳定性回归**、**Blackwell/AMD 内核优化** 与 **PD-disaggregation 架构统一** 三方面。PD-disagg “单协议层 + per-backend transport” RFC（#33861）正式进入实施跟踪阶段（#34510），同时新增两例高影响 bug（SM100/103 NVFP4 MoE NaN、ROCm HiCache 性能劣化）。此外，Kimi K3 一处 MLA 融合改动因 CI 回归已被 revert（#34642）。

---

## 版本发布与破坏性变更

- 无新 Release。
- **PR #34304（进行中，计划移除 torchao 集成）**：自 torchao pin 至 0.17.0 后，`--torchao-config` 的所有取值均已触发 `ImportError`，无可用功能。该 PR 将移除该 flag、`torchao_utils.py`、相关文档和依赖，使用到该参数的配置需提前迁移。 [PR #34304](https://github.com/sgl-project/sglang/pull/34304)
- **Fix #30394（已合入）**：修复 `SGLANG_AUTO_NUMA_BIND` 环境变量在自动 NUMA 重构中被意外移除的问题，使其重新生效。 [PR #30394](https://github.com/sgl-project/sglang/pull/30394)

---

## 新模型与硬件支持

- **Kimi K3 Roadmap（#32607）**：Day0 支持已合入，当前有独立 Bug 跟踪 #32970，DSpark 变体（RadixArk/Kimi-K3-DSpark）可用。 [Issue #32607](https://github.com/sgl-project/sglang/issues/32607)
- **PR #31470（进行中）**：接入 FlashInfer Mega MoE 内核。 [PR #31470](https://github.com/sgl-project/sglang/pull/31470)
- **PR #29328（进行中，AMD）**：支持加载 ModelOpt/Quark NVFP4 checkpoint，在 AMD GPU（如 MI355x）上通过 NVFP4→MXFP4 在线重量化进行推理。 [PR #29328](https://github.com/sgl-project/sglang/pull/29328)
- **PR #28932（进行中，AMD）**：为 MXFP4 checkpoint 增加 dense-FP8 路径，含 fused silu/mul/activation quant。 [PR #28932](https://github.com/sgl-project/sglang/pull/28932)
- **PR #31324（进行中，AMD/GLM5）**：DSA decode 在 `kv_len <= index_topk` 时跳过 indexer GEMM，走 dense k-only fast path。 [PR #31324](https://github.com/sgl-project/sglang/pull/31324)
- **PR #21831（进行中，NPU）**：在 NPU docker 镜像中为 gpt-oss 安装 vocab。 [PR #21831](https://github.com/sgl-project/sglang/pull/21831)
- **PR #31956（进行中，CPU）**：MiniMax-M2.7 CPU 推理优化。 [PR #31956](https://github.com/sgl-project/sglang/pull/31956)
- **Apple Silicon**：Roadmap 见 #19137；MLX runner 重构 RFC 见 #32321（基于 Torch/MLX 互操作方案缩小实现范围）。 [Issue #19137](https://github.com/sgl-project/sglang/issues/19137) / [Issue #32321](https://github.com/sgl-project/sglang/issues/32321)

---

## 性能与优化

- **PR #33778（GDN 验证路径优化）**：避免在 speculative target-verification 中 materialize QKV 张量，改为直接使用 `causal_conv1d_update` 的 packed 输出，减少内存拷贝和算子启动。 [PR #33778](https://github.com/sgl-project/sglang/pull/33778)
- **PR #25199（AMD 显存池提升）**：移除 AMD aiter + ctx>8K 场景下硬编码的 0.85 `mem_fraction_static` 折减，释放更多 KV cache 容量。 [PR #25199](https://github.com/sgl-project/sglang/pull/25199)
- **PR #31856（AMD decode 加速）**：AITER unified-attention 在 BF16 Q 下无法走 FP8 Q 原生矩阵乘路径；该 PR 对 Q 做在线 FP8 量化，用“每层一个量化节点”换取中高 batch 下 `kernel_unified_attention_3d` 的显著降本。 [PR #31856](https://github.com/sgl-project/sglang/pull/31856)
- **PR #31324（GLM5 decode 加速）**：当 top-k 覆盖全部有效位置时跳过 indexer，直接生成 dense k-only cache。 [PR #31324](https://github.com/sgl-project/sglang/pull/31324)
- **PR #34042（WIP，已关闭）**：为 dense MXFP8 GEMM 提供 flashinfer cute-dsl（swap-AB/split-K）后端，在 SM10x 上显著优于 persistent cutlass，后续可能重新开放。 [PR #34042](https://github.com/sgl-project/sglang/pull/34042)
- **性能追踪**：#19637 SM120 性能优化计划、#33636 DeepSeek-V4 NVIDIA 性能跟踪、#34640 AMD DSV4 nightly 性能门禁（将阈值断言接入 CI）。 [Issue #19637](https://github.com/sgl-project/sglang/issues/19637) / [Issue #33636](https://github.com/sgl-project/sglang/issues/33636) / [PR #34640](https://github.com/sgl-project/sglang/pull/34640)

---

## 稳定性与回归

### 高严重度（无修复 PR）

- **#34629（SM100/SM103，FlashInfer TRTLLM NVFP4 MoE tile-192 NaN）**：升级 flashinfer trio 至 0.6.16rc4 之后，Blackwell 上新的 tile-192 TRTLLM_GEN BMM 路径产生非有限 MoE 输出，GSM8K 得 0 分。如需规避可先锁定 flashinfer 版本。 [Issue #34629](https://github.com/sgl-project/sglang/issues/34629)
- **#34235（DSV4 scheduler hang）**：v0.5.17 + hierarchical cache + chunked prefill 16K，在 DeepSeek-V4 FP8/H20 上出现 sparse prefill 调度器挂起直至 watchdog 中止；0.5.16+PR 另有 sampling device-side assert。 [Issue #34235](https://github.com/sgl-project/sglang/issues/34235)
- **#34611（ROCm HiCache 性能劣化）**：MI355 上 HiCache 在真实 agentic 负载中性能不达预期（新上报，待定位）。 [Issue #34611](https://github.com/sgl-project/sglang/issues/34611)
- **#34522（DSpark CUDA launch failure）**：Kimi-K3 + DSpark，`concurrency=1` 时触发 CUDA launch 失败。 [Issue #34522](https://github.com/sgl-project/sglang/issues/34522)
- **#34155（1M-token prefill OOM）**：v0.5.17、TP8+MegaMoE 无 DP-attention 路径下，约 1.04M token 的请求在 DSV4 indexer `fp8_mqa_logits` 非分页路径 OOM；相同请求在 tp8/dp8 下可正常服务。 [Issue #34155](https://github.com/sgl-project/sglang/issues/34155)
- **#33289（多节点 TP 死锁）**：DSV4-Flash + DSpark，2× DGX Spark（GB10）TP=2 时出现 NCCL proxy append 与 request broadcast 的 rank 分歧死锁。 [Issue #33289](https://github.com/sgl-project/sglang/issues/33289)
- **#34384（DSpark CUDA Graph 几何不兼容）**：compact ragged CUDA Graph 在相同 token tier 上使用不兼容的 request-slot 几何。 [Issue #34384](https://github.com/sgl-project/sglang/issues/34384)
- **#29942（DeepEP CUDA graph 捕获失败）**：PP=2、TP=8、DP-attention、EP=8、Kimi K2.6 W4A8 下，DeepEP low_latency buffer 在 CUDA graph capture 时 lazy init 失败。 [Issue #29942](https://github.com/sgl-project/sglang/issues/29942)

### 已关闭 / 有结论

- **#34642（已合入 revert）**：Revert “Kimi K3 融合 MLA gate projection 进 QKV-A GEMM”（#33623），该改动在完整 2048 token 下被判定为真实回归，已回滚。 [PR #34642](https://github.com/sgl-project/sglang/pull/34642)
- **#31833（closed）**：NemotronH `--mamba-scheduler-strategy extra_buffer` 在 AIME26 掉精度。 [Issue #31833](https://github.com/sgl-project/sglang/issues/31833)
- **#33659（closed）**：DeepSeek-V4-Pro 在 sglang 0.5.12→0.5.14 出现 3-4pt 评分下降（LCB lite v6 等）。 [Issue #33659](https://github.com/sgl-project/sglang/issues/33659)
- **#27987（closed）**：GLM-5.1/GB300 PD-prefill 下 DP-attention `forward_idle` 系统性 CUDA illegal memory access。 [Issue #27987](https://github.com/sgl-project/sglang/issues/27987)
- **#23579（closed）**：Session Reaper mid-decode 竞态 + `/v1/completions` 参数丢弃。 [Issue #23579](https://github.com/sgl-project/sglang/issues/23579)
- **#34354（closed）**：`sliding_window_size` 是否包含当前 token 的语义澄清。 [Issue #34354](https://github.com/sgl-project/sglang/issues/34354)
- **CI 状态**：#17050 显示主分支当前 3 broken / 11 flaky / 671 recently fixed；#26340 在自动收集 CI 中的 CUDA coredump。 [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) / [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)

---

## 对应用开发者的意义

- **DeepSeek-V4 相关版本需谨慎**：0.5.12→0.5.14 存在评分回退（#33659），0.5.17 有 scheduler hang（#34235）与 1M 长上下文 OOM（#34155）。生产环境建议锁版本、保留评测基线，并跟踪 #33636 性能追踪与 #23602 功能 Roadmap。
- **PD-disagg 后端协议即将变化**：基于 RFC #33861 的实施跟踪 #34510 已启动，mooncake/nixl/mori 三个传输后端将统一为“单协议层 + per-backend transport”。若你深度集成了某一后端，需预留适配空间。 [RFC #33861](https://github.com/sgl-project/sglang/issues/33861) / [Issue #34510](https://github.com/sgl-project/sglang/issues/34510)
- **`--torchao-config` 即将移除**：所有合法取值目前均报 `ImportError`，依赖该 flag 的部署请尽快迁移到其他量化路径。 [PR #34304](https://github.com/sgl-project/sglang/pull/34304)
- **极端长上下文（1M）注意 TP 配置**：TP8+MegaMoE 下建议同时开启 DP-attention，避免非分页 indexer 路径 OOM。 [Issue #34155](https://github.com/sgl-project/sglang/issues/34155)
- **Agent 长前缀场景关注 HiCache/PP 修复计划**：HiCache 的一致性修复（#22607）直接关系到长 system prompt/多轮历史的复用收益，目前该功能在 ROCm 上的性能仍未达标（#34611），AMD 用户建议先验证再采用。
- **CI 稳定性在改善但仍有噪音**：671 个 recent fixed 说明修复节奏快，但仍有 3 broken / 11 flaky；若使用 `/rerun-failed-ci`，新 PR #34057 将支持 rerun cancelled runs 并定位最新 workflow run。 [PR #34057](https://github.com/sgl-project/sglang/pull/34057)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-13

## 今日速览

今日发布 3 个新版本（b10369/b10373/b10375），核心变化是 **Qwen 系列模型 bare function 解析修复**（b10375）与 **pocket-tts 多模态 TTS 支持**（b10369）。Issue 侧，与 Qwen3.5/3.6 相关的工具调用、思考模式控制问题占据多数；此外 RTX 5080 (Blackwell) 自 b10356 起的 ~40% 性能回归问题已关闭，但仍需关注后续版本验证。

---

## 版本发布与破坏性变更

### b10375（最新）
- **改动**：`chat: tighten bare function parsing for Qwen models (#26793)`
- **影响**：修复 Qwen 模型在工具调用中省略换行符导致后续工具调用被吞入参数的问题（对应 Issue #26763），建议所有使用 Qwen 系列 + 工具调用的用户升级。
- **链接**：[Release b10375](https://github.com/ggml-org/llama.cpp/releases/tag/b10375)

### b10373
- **改动**：`imatrix.cpp: Move finite check and only check touched experts (#26861)`
- **影响**：imatrix（重要性矩阵）计算中有限值检查逻辑调整，仅对实际触及的专家做检查，不影响外部 API。
- **链接**：[Release b10373](https://github.com/ggml-org/llama.cpp/releases/tag/b10373)

### b10369
- **改动**：`mtmd: support pocket-tts (#26871)` — 支持 pocket-tts 文本到语音模型；通过 GEMM+col2im 实现分组转置卷积（解决 ggml_conv_transpose_1d 无分组模式问题）。
- **影响**：llama.cpp 多模态能力扩展至 TTS 领域，相关 API 已适配。
- **链接**：[Release b10369](https://github.com/ggml-org/llama.cpp/releases/tag/b10369)

> **注**：未发现破坏性 API/配置变更。

---

## 新模型与硬件支持

| 类型 | 项目 | 状态 | 说明 |
|---|---|---|---|
| 新模型 | [PR #26185: Kimi-K3 text model](https://github.com/ggml-org/llama.cpp/pull/26185) | OPEN | 混合 KDA（线性）+ MLA（完整）注意力，新增跨层残差注意力、潜在 MoE、situ 激活等 5 项新特性 |
| 新模型 | [PR #19182: Longcat-Flash](https://github.com/ggml-org/llama.cpp/pull/19182) | OPEN | 美团 LongCat-Flash-Chat，MLA + zero-computing experts，待测试 |
| 新模型 | [PR #26952: OpenVINO 支持 Qwen3.5](https://github.com/ggml-org/llama.cpp/pull/26952) | OPEN | Dense/MoE 均在 CPU/GPU 可用，同时优化 GPU 峰值内存与 test-recurrent-state-rollback |
| 新架构 | [PR #26745: RDNA4 (gfx1200/gfx1201) HIP 文档](https://github.com/ggml-org/llama.cpp/pull/26745) | OPEN | 补充 HIP 构建文档中 AMD RDNA4 支持说明 |
| 工具链 | [PR #26814: 从草稿模型 GGUF 元数据自动检测 spec type](https://github.com/ggml-org/llama.cpp/pull/26814) | OPEN | 修复本地草稿模型加载后投机解码不激活问题 |
| 后端 | [PR #26331: OpenCL Adreno xmem SDPA 路径](https://github.com/ggml-org/llama.cpp/pull/26331) | OPEN | 修复 Z-Image 非因果注意力 1GB+ score/prob buffer 导致 Adreno GPU 静默 buffer 损坏问题 |
| TTS | Release b10369 | ✅ 已合并 | pocket-tts 多模态支持（见上文） |

---

## 性能与优化

- **RPC tensor 并行**：[PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610) 为 RPC 添加 `-sm tensor`（2x Sparks + RDMA），需实现异步 graph_compute、自定义 all_reduce、graph uid 缓存等。
- **HIP 浮点一致性可配置**：[PR #26696](https://github.com/ggml-org/llama.cpp/pull/26696) 将 HIP 的 `-funsafe-math-optimizations` 改为 opt-in（默认 OFF），以 IEEE 一致换取潜在精度，使用者需显式 `-DGGML_HIP_UNSAFE_MATH=ON` 恢复 fast-math 加速。
- **OpenVINO 显存优化**：[PR #26952](https://github.com/ggml-org/llama.cpp/pull/26952) 在支持 Qwen3.5 的同时降低 GPU 峰值内存占用。
- **tokenizer 预填充性能**：[Issue #26937](https://github.com/ggml-org/llama.cpp/issues/26937) 指出 `bpe_ranks` 哈希查找 cache miss 是 tokenizer 瓶颈，社区正在讨论优化方案（如更换容器/预排序）。

> ⚠️ **性能回归预警**：[Issue #26918（已关闭）](https://github.com/ggml-org/llama.cpp/issues/26918) 报告 RTX 5080 在 b10356→b10359 之间出现 prompt processing 与生成速度均 ~40% 下降，且随版本迭代恶化；该 issue 已关闭，但建议 Blackwell 用户对比 b10356 与当前版本的 bench 数据。

---

## 稳定性与回归

按严重程度排序：

1. **CUDA Flash Attention 崩溃（严重）**：[Issue #24324](https://github.com/ggml-org/llama.cpp/issues/24324) — `fattn.cu:579` fatal error，影响 CUDA + Flash Attention 用户。无关联 fix PR。

2. **GLM-5.2 dense-MLA CUDA 输出损坏（严重）**：[Issue #26027](https://github.com/ggml-org/llama.cpp/issues/26027) — 任意真实 transformer 层 offload 到 GPU 后产生乱码；涉及 SM120 架构（RTX PRO 6000 Blackwell）。无 fix PR。

3. **NVIDIA 4x Tesla T10 tensor split 断言失败（严重）**：[Issue #26902](https://github.com/ggml-org/llama.cpp/issues/26902) — `ggml-backend-meta.cpp:537 GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)`，b10368 复现。

4. **ROCm 预编译二进制不可用**：[Issue #26929（已关闭）](https://github.com/ggml-org/llama.cpp/issues/26929) 与 [Issue #26963](https://github.com/ggml-org/llama.cpp/issues/26963) — Windows ROCm 预编译包无法检测 GPU / 崩溃报 `cudaMemGetInfo failed`。推荐 Windows ROCm 用户自行编译。

5. **ROCm 共享库加载失败**：[Issue #25807](https://github.com/ggml-org/llama.cpp/issues/25807) — ROCm-7.14 报 `libhipblas.so.3` 缺失，可能与系统 HIP 版本冲突有关。

6. **Gemma 4 SWA 遗忘关键信息（正确性）**：[Issue #25751](https://github.com/ggml-org/llama.cpp/issues/25751) — SWA（滑动窗口注意力）路径导致模型遗漏关键细节，涉及 4x3090 多卡。

7. **Qwen3.5 enable_thinking 无法关闭（已关闭）**：[Issue #20182](https://github.com/ggml-org/llama.cpp/issues/20182) — 用户报告设置 `enable_thinking:false` 仍触发思考；issue 已关闭，建议改用 `--reasoning off` 并验证当前版本（b10375 对 Qwen 解析有专门修复）。

8. **Vulkan Mali GPU 全 NaN logits**：[Issue #26921](https://github.com/ggml-org/llama.cpp/issues/26921) — Mali-G925 上 Qwen3.5-0.8B 多模态 prefill 返回 NaN，CPU 同版本正常；疑似 Vulkan 后端问题。

9. **AMD APU MoE 推测解码退化**：[Issue #25117](https://github.com/ggml-org/llama.cpp/issues/25117) — Strix Halo 上 DFlash 比无投机基线慢 ~2x，待排查。

10. **OpenVINO 无法加载 Gemma-4-12B**：[Issue #24415](https://github.com/ggml-org/llama.cpp/issues/24415) — CPU/GPU/NPU 均失败。

11. **ROCm gfx1151 RPC worker 崩溃**：[Issue #26746](https://github.com/ggml-org/llama.cpp/issues/26746) — DeepSeek V4 prefill 4096 token 后 GGML_OP_TOP_K 崩溃，预计与 DFlash/投机执行相关。

---

## 对应用开发者的意义

- **Qwen 工具调用务必升级到 b10375**：此版本修复了 Qwen 模型 bare function 解析中换行符缺失导致工具参数越界的问题（#26763），直接影响依赖 Qwen3.5/3.6 工具调用的 Agent 正确性；实测在 b10327/b10311 均受影响。
- **加速/投机解码需要显式配置**：当使用本地草稿模型做 MTP/投机解码时，若未生效（tok/decode-pass=1.000），可关注 PR #26814 的自动检测能力，但当前版本仍需手动指定 `--spec-type`。
- **RPC 多机推理有新选择**：PR #26610 为 RPC 添加 tensor 并行能力（RDMA 场景），多机部署可观望；但注意 tensor 并行的 all_reduce 实现仍处早期阶段。
- **OpenVINO 用户可开始测试 Qwen3.5**：PR #26952 已支持 Qwen3.5 Dense/MoE 且优化显存，生产部署前建议验证 recurrent-state-rollback（KV 缓存回滚）场景。
- **/metrics 与 /slots 可用性将改善**：PR #26920 正在进行服务器 metrics 正确性重构（修复统计重复计数），并解锁在 `llama_decode()` 期间访问 /metrics 的能力，对基于 Prometheus 监控推理服务的平台团队是利好。
- **TTS 能力进入 llama.cpp**：pocket-tts 的合入意味着多模态推理可覆盖语音合成，但 API 仍属早期，建议先通过 `mtmd` 实验性接口评估。

---

**数据窗口**：2026-08-12 ~ 2026-08-13（GitHub API 采集）
**版本基线**：b10369 / b10373 / b10375

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-13

## 1. 今日速览

今日发布候选版本 **v0.32.10-rc1**，核心变更包括 `repeat_penalty` 默认值从 1.1 降至 1.0（与其他推理引擎对齐）以及对 NVFP4 MLX 模型 prefill 的约 7–8% 加速。稳定性方面，社区持续报告低比特量化（q4_0 KV）与部分模型在特定硬件上的乱码/挂起回归，其中多个问题已有对应 fix PR 在途；同时 MLX 后端基础设施（KV connector、视觉编码器）与 OpenAI 兼容层（web search、reasoning_effort）正快速迭代。

## 2. 版本发布与破坏性变更

- **[v0.32.10-rc1]** 发布（[Release 链接](https://github.com/ollama/ollama/releases)）
  - **破坏性变更**：未显式设置 `repeat_penalty` 的模型默认值从 1.1 改为 **1.0（关闭）**。此举对齐 llama.cpp/vLLM 等引擎行为，并显著加速 speculative decoding。若旧模型出现重复输出，需在 Modelfile 中按模型显式设置该参数。
  - **性能**：带全局 scale 的 NVFP4 MLX 模型 prefill 提速约 7–8%（对应 PR [#17703](https://github.com/ollama/ollama/pull/17703)）。

## 3. 新模型与硬件支持

- **[PR #17714]** `nemotron_h`: 为 MLX 后端新增 RADIO 视觉编码器与 projector 支持（动态分辨率预处理、chunked feature scattering），同时抑制不支持的音频输入（[PR #17714](https://github.com/ollama/ollama/pull/17714)）。
- **[PR #17707]** 新增 **MLX KV connector 框架**，提供文件后端示例（持久化 prefix-cache 快照为 safetensors），为 Linux/Windows MLX 支持铺路（[PR #17707](https://github.com/ollama/ollama/pull/17707)）。
- **[PR #17594]** 新增 `ollama launch muse` 集成 Meta Muse Code CLI（[PR #17594](https://github.com/ollama/ollama/pull/17594)）。
- **[PR #17589]** 新增 `ollama launch talos` 集成 Talos agent（确定性权限内核）（[PR #17589](https://github.com/ollama/ollama/pull/17589)）。
- **社区模型请求**：[#17510](https://github.com/ollama/ollama/issues/17510) 请求 deepseek-v4-flash:0731 本地可用性；[#17506](https://github.com/ollama/ollama/issues/17506) 请求 kat-coder-v2.5-dev。

## 4. 性能与优化

- **NVFP4 double-scale prefill 优化（已合入）**：将 float32 全局 scale 乘法和反量化 cast 编译为融合算子，避免每个 projection 的额外 kernel launch 与中间张量，对 Qwen 等 ModelOpt 检查点生效（[PR #17703](https://github.com/ollama/ollama/pull/17703)）。
- **MLX KV connector 框架（进行中）**：围绕 MLX prefix-cache restore points 提供可插拔持久化，可恢复最长保存 prompt 前缀，降低长对话重复 prefill 开销（[PR #17707](https://github.com/ollama/ollama/pull/17707)）。
- **speculative decoding 提速（随 v0.32.10-rc1）**：repeat_penalty 默认关闭后，解码路径不再因惩罚采样破坏 KV 缓存复用，投机解码整体加速。

## 5. 稳定性与回归

按严重程度排列：

- **[严重] 低比特 KV 量化导致输出乱码**（[#17614](https://github.com/ollama/ollama/issues/17614)，OPEN）：q4_0 KV quantization 下模型输出无意义重复 token（"AI AI AI..."）。影响面较大，尚无 fix PR，建议暂停使用 q4_0 KV cache。
- **[严重] Qwen2.5-3B 中文输入输出 ASCII 乱码**（[#17587](https://github.com/ollama/ollama/issues/17587)，OPEN）：Windows CPU 环境下 tokenizer 误检，输出 "@@@@@" 等乱码；已标记 needs more info。
- **[严重] `/api/generate` 因 `token repeat limit reached` 中断**（[#17270](https://github.com/ollama/ollama/issues/17270)，OPEN）：0.32.1 引入的回归，应用升级后高频中断；需关注 v0.32.10-rc1 的 repeat_penalty 变更是否缓解。
- **[中等] `num_ctx` 实际截断为配置值一半**（[#17427](https://github.com/ollama/ollama/issues/17427)，CLOSED）：gpt-oss:20b 上 prompt 窗口实际为 `num_ctx/2 + 2`，与 num_parallel/num_predict 无关；已关闭但未看到 fix 指向，建议验证当前版本。
- **[中等] Gemma 4 `think=false` 时输出 `<unused49>` 重复 token**（[#17459](https://github.com/ollama/ollama/issues/17459)，OPEN）：破坏 VS Code 集成；`think=true` 正常。
- **[中等] Qwen3.6 hybrid 在 CUDA + llama.cpp b10353 上回退 CPU**（[#17669](https://github.com/ollama/ollama/issues/17669)，CLOSED）：明确为 llama.cpp 版本回归，b10242 正常。
- **[中等] Nemotron3.5-lightning:30b 在 AMD AI395+ 上思考阶段 stall**（[#17692](https://github.com/ollama/ollama/issues/17692)，OPEN）：新近报告，CTRL+C 可中止，暂无 workaround。
- **[较低] gemma4:e2b 在 Windows 上 CUDA_Host 内存占用异常**（[#17386](https://github.com/ollama/ollama/issues/17386)，OPEN）：模型 buffer 大量落在 pinned memory 而非 VRAM。
- **[已修复] server/images blob 哈希校验跳过导致 SSRF 风险**（[#15485](https://github.com/ollama/ollama/issues/15485)，CLOSED）：config 与 layer 共用 digest 时 skipVerify 冲突；fix PR [#15504](https://github.com/ollama/ollama/pull/15504) 已关闭，应已合入。

## 6. 对应用开发者的意义

- **升级前注意 repeat_penalty 行为变化**：若你的应用依赖旧模型默认 1.1 的惩罚来抑制重复，升级到 v0.32.10 后请为模型显式设置 `repeat_penalty` 参数，否则可能观察到重复生成。
- **`/api/generate` 的 raw 请求不再默认开启 thinking**（[PR #17708](https://github.com/ollama/ollama/pull/17708)）：修复 SillyTavern 等客户端经 `raw: true` 调用时返回空响应的问题；若你的应用依赖 generate 接口的思考链输出，需显式传 `think` 字段。
- **结构化输出时序修正**：[#17705](https://github.com/ollama/ollama/pull/17705) 与 [#17706](https://github.com/ollama/ollama/pull/17706) 让 `/api/generate` 和 `/api/chat` 在 thinking 完成后再应用 JSON grammar，避免思考 token 被 grammar 截断、答案降级。使用 JSON mode + 推理模型的 Agent 应关注这两个 PR 的合入状态。
- **OpenAI 兼容层增强**：`reasoning_effort=minimal` 将映射为 `low` 而非 400（[PR #17712](https://github.com/ollama/ollama/pull/17712)）；Responses API 支持 `web_search` 工具且达到搜索上限后正常结束而非报错（[PR #17686](https://github.com/ollama/ollama/pull/17686)、[#17709](https://github.com/ollama/ollama/pull/17709)）。Codex/Agent 类应用可开始接入。
- **MLX 生态演进**：KV connector 与视觉支持意味着 MLX 正在成为一等后端，但 Linux/Windows MLX 仍处早期；下载 MLX 模型前请确认本地 runtime 版本（相关逻辑见 [PR #17710](https://github.com/ollama/ollama/pull/17710)）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 — 2026-08-13

## 今日速览

今日无新版本发布，但 PR 活跃度较高：**Parallel AI 提供商集成**（#36704）与 **Muse Spark 1.2 成本映射**（#36717）推进中；**spend log 队列稳定性**成为修复焦点（#34826/#34950/#36716 三个 PR 同时处理 flush 取消/DB 故障导致的数据丢失问题）。另有两条高关注 Issue：自定义 MCP Server 添加失败（#23869，👍9）和私有仓库技能认证支持（#26071，👍13）。

---

## 版本发布与破坏性变更

**无**。过去 24 小时无新 Release，无已知 API/配置破坏性变更。

---

## 新模型与硬件支持

- **[meta/muse-spark-1.2 及其 contributor tier 成本映射](https://github.com/BerriAI/litellm/pull/36717)** — 新增 `meta/muse-spark-1.2` 价格（$1.25/$4.25 per M tokens），同时修复 `reasoning_effort` 相关 400 错误。此前该模型调用不计费且被拒绝参数。
- **[Parallel AI 提供商支持 chat + responses 端点](https://github.com/BerriAI/litellm/pull/36704)** — LiteLLM 此前仅支持 Parallel AI 的搜索功能，该 PR 打通其 OpenAI Responses 兼容端点，并完整支持 `after_date`、`fetch_policy`、`location` 等 v1 搜索参数。
- **HPC AI 提供商支持（stale）** — PR #24613 已关闭，合入状态未确认，如需使用请关注后续进展。
- **Cohere 多模态嵌入输入修复** — 两个 PR（[#36715](https://github.com/BerriAI/litellm/pull/36715)、[#36692](https://github.com/BerriAI/litellm/pull/36692)）均修复 Cohere Embed v4 拒绝多模态输入（混合内容被错误地作为 `texts` 发送）的问题，保留混合内容至 `inputs` 字段。

---

## 性能与优化

- **[复杂度路由器分类器校准（PR #36578）](https://github.com/BerriAI/litellm/pull/36578)** — 针对开发者/Agent 流量中"非平凡代码、多步技术工作"类请求被误判为高复杂度、路由到最贵档位的问题，为分类器补充工作示例，并允许按路由器选择校准模型。该改进直接影响推理成本与延迟分布。
- **[Prisma 数据库 span 归属修正（PR #36595）](https://github.com/BerriAI/litellm/pull/36595)** — 将 APM 中 Prisma 数据库操作从 `localhost`（Python 客户端 → 本地 Rust 引擎 loopback）修正为真实 PostgreSQL 地址。可显著改善基于 ddtrace/OTEL 的链路追踪与基础设施排障效率。

---

## 稳定性与回归

按严重程度排序：

**高 — 数据安全与隐私**

- **[Redis Cluster 环境响应泄漏 / 用户间串扰（#25447，已关闭）](https://github.com/BerriAI/litellm/issues/25447)** — OpenShift 多副本环境下，响应偶发返回给错误客户端。该 Issue 今日已关闭，但关闭未标注修复版本，使用 Redis Cluster 的生产用户需确认修复内容。

**中高 — 数据丢失**

- **spend log 队列在 flush 取消 / DB transport 错误时丢失数据** — 三个修复 PR 并行推进：
  - [#34826](https://github.com/BerriAI/litellm/pull/34826)：flush 取消后重新入队 + 关闭时排空队列
  - [#34950](https://github.com/BerriAI/litellm/pull/34950)：屏蔽 DB 写操作，取消后批次回到队首
  - [#36716](https://github.com/BerriAI/litellm/pull/36716)：将 P1001 等 transport 错误归类并重新入队

**中 — 正确性回归（已有修复 PR）**

- [`_should_start_new_content_block` 空 `choices` 块崩溃（#36553，已关闭）](https://github.com/BerriAI/litellm/issues/36553) — `/v1/messages` 流式路径中，OpenAI 格式后端发送仅含 usage 的 chunk 时无条件访问 `chunk.choices[0]` 导致崩溃。
- **[Python 3.13 无兼容轮子（#36526，已关闭）](https://github.com/BerriAI/litellm/issues/36526)** — `litellm 1.96.1` 仅有 cp310 轮子。若在 Py3.13 环境安装依赖 `litellm>=1.41.15` 的项目，请锁版本或等待修复版。

**中 — 进行中问题**

- **[`max_parallel_requests` 计数器单调递增，最终限流全部请求（#27955）](https://github.com/BerriAI/litellm/issues/27955)** — Anthropic adapter 流式请求被客户端取消时，Redis 计数器未正确回退，随时间推移所有请求被 429。
- **[DB 存储的 auto-router 模型从 /v1/models 消失（#33168，已关闭）](https://github.com/BerriAI/litellm/issues/33168)** — 模型仍可服务，但不能再被列出。
- **[Azure GPT-5.6 terra/luna 成本映射沿用 OpenAI 调价，与 Azure 实际计费不符（#36192）](https://github.com/BerriAI/litellm/issues/36192)** — OpenAI 于 7 月 30 日将 Terra 降价 20%、Luna 降价 80%，但 Azure 未跟进，导致 spend 统计失真。

**低 — 体验/功能问题**

- **[Ollama `reasoning_content` 恒为 null（#27956）](https://github.com/BerriAI/litellm/issues/27956)** — 思维链内容不返回，Langfuse 等观测工具丢失推理过程。已有相关流式工具调用跟踪修复 PR（[#20585](https://github.com/BerriAI/litellm/pull/20585)），但未见 reasoning 字段修复。
- **[自定义 MCP Server 添加失败（#23869，打开）](https://github.com/BerriAI/litellm/issues/23869)** — UI 添加自定义 MCP Server 报 "Could not find..." 错误，17 条评论的高热度问题。
- **[429 错误体泄露完整 SHA-256 token 哈希（#27884）](https://github.com/BerriAI/litellm/issues/27884)** — 并行限流器在 429 响应中暴露 64 字符虚拟 key 哈希，存在安全风险。

---

## 对应用开发者的意义

1. **MCP 相关功能尚不稳定** — 自定义 MCP Server 配置在 UI 层仍报错（#23869），MCP 安全 guardrail 模板创建亦失败（#30953）。依赖 MCP 扩展能力的开发者在升级前需验证目标版本。

2. **Responses API 流式事件类型不完整** — 通过 LiteLLM 代理 Azure Responses API 时，缺少 `response.created` 等 setup 事件（#20975 已关闭）。客户端若依赖补全事件序列，建议直接请求上游或加代理层补偿。

3. **spend / 日志数据存在不一致风险** — `/spend/logs` 在 Azure Router 场景记录的是路由器模型名而非实际服务模型（#27942）；DB 存储的 auto-router 模型从 model list 消失（#33168）；成本映射错误（#36192）会导致计费统计失真。做成本分析或计费系统的团队应关注这些 fix 的合入进度。

4. **`max_parallel_requests` 在流式取消场景不可靠（#27955）** — Redis 计数器泄漏可能导致实际限流阈值远低于配置值。对并发控制有严格要求的应用，建议额外在客户端侧做兜底重试与退避。

5. **Python 3.13 用户注意锁版本** — 若在 Py3.13 部署且依赖较新的 LiteLLM，需确认目标版本有对应 wheel 后再升级。

6. **新提供商接入是近期主要增量** — Parallel AI（#36704）、Muse Spark 1.2（#36717）、HPC AI 的价格与参数支持正在快速迭代，多提供商管理场景值得持续跟进。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 2026-08-13

## 今日速览

- 无新版本发布；过去 24 小时的核心工作在 Unsloth Studio/Desktop 的跨平台稳定性修复，尤其是 Windows 安装器被安全软件拦截与 macOS GGUF 加载失败两处阻断问题均有对应修复 PR。
- AMD ROCm 检测链路有多项修正落地，解决"安装器显示 GPU 正常但实际 CPU-only"的误导性故障（#8473/#7485）。
- Deep Research 冻结（#8483）的后续优化 PR 已提交，同时修复了 RAG embedder 的 torch 分配崩溃和 SSE 事件类型解析导致的 CI 全红回归。

---

## 新模型与硬件支持

- **Radeon AI PRO R9700 (gfx1201) 识别修复**：PR [#8573](https://github.com/unslothai/unsloth/pull/8573)（closed）修复了该卡既不属于 9070 也不属于 9080 导致安装器报告 "gpu none"、PyTorch 落到 CPU wheel 的问题。
- **AMD GPU 识别/安装问题仍活跃**：RX 5700XT 在 Desktop 中不识别（[#8529](https://github.com/unslothai/unsloth/issues/8529)）、Linux AppImage 不识别 RX 7600（[#8471](https://github.com/unslothai/unsloth/issues/8471)）、Windows + AMD GPU 安装失败（[#8508](https://github.com/unslothai/unsloth/issues/8508)）。
- **MiniMax-M3 GGUF 在 macOS Studio 上加载失败**（[#8513](https://github.com/unslothai/unsloth/issues/8513)）：内置 llama.cpp (b10360) 与 HF 量化 key 不同步，下载完成但缺 indexer keys，尚待修复。
- **MiniMax-H3 需要更新的 stable-diffusion.cpp**（[#8507](https://github.com/unslothai/unsloth/issues/8507)）：RTX 5090 用户选择模型即报错，预构建 `/usr/bin/sd` 版本过旧。
- **DeepReinforce Ornith-1.0 支持请求**（[#6721](https://github.com/unslothai/unsloth/issues/6721)，23 👍）：社区高呼声，希望增加该模型族的 Unsloth 优化变体与兼容性。

---

## 性能与优化

- **VRAM 预算比例可调**：PR [#8589](https://github.com/unslothai/unsloth/pull/8589) 将保留 VRAM 的计算方式开放为可配置参数。背景：2x RTX 3090 用户反馈 Studio 只给 175k 上下文而 LM Studio 能开 200-250k；作者逐项审计了 `--parallel 4` 槽位 logits 缓冲与 2049 MiB compute-buffer 等非冗余开销后，决定暴露 budget fraction。
- **Deep Research 冻结修复的后续优化**：PR [#8633](https://github.com/unslothai/unsloth/pull/8633) 修复 activity panel 的 `detach()` 未取消排队帧导致卡死的问题；PR [#8634](https://github.com/unslothai/unsloth/pull/8634) 消除流式 research 运行中对整个 chat 的重复重渲染。两 PR 均附带了针对 #8483 的测量 harness。
- **实时性能指标请求**：[#8528](https://github.com/unslothai/unsloth/issues/8528) 希望 API 请求在运行中同时显示 prompt 处理速度与生成速度（当前仅展示生成速度，且需等请求完成）。

---

## 稳定性与回归

按严重程度排列：

1. **Windows 安装被 EDR/AppLocker 拦截（阻断）**：安装器 `install.ps1` 在 parse 阶段被 AMSI 拦截（[#8523](https://github.com/unslothai/unsloth/issues/8523)，closed）；另有 AppLocker 拒绝 `unsloth.exe` 导致 Studio 安装失败（[#8490](https://github.com/unslothai/unsloth/issues/8490)）。修复：PR [#8586](https://github.com/unslothai/unsloth/pull/8586) 降低脚本杀软误报率并同步处理 Linux 打包；PR [#8592](https://github.com/unslothai/unsloth/pull/8592) 不再依赖生成的 `.exe` console script，改用直接调用。
2. **macOS 无法加载 GGUF（阻断）**：[#8566](https://github.com/unslothai/unsloth/issues/8566) 中 llama-server 启动失败，且报错信息误指 GGUF/内存问题。PR [#8574](https://github.com/unslothai/unsloth/pull/8574) 为 llama-server 设置 `DYLD_LIBRARY_PATH` 并将 macOS 启动失败按原因分类。另有第二次启动报错 [#8610](https://github.com/unslothai/unsloth/issues/8610)。
3. **AMD 静默降级 CPU-only**：[#8473](https://github.com/unslothai/unsloth/issues/8473)（1 👍）与 [#7485](https://github.com/unslothai/unsloth/issues/7485) 均反映安装器报告 ROCm 正常但 Studio 实际跑 CPU。修复：PR [#8606](https://github.com/unslothai/unsloth/pull/8606) 在 Linux AMD 上核对实际安装的 PyTorch 构建；PR [#8620](https://github.com/unslothai/unsloth/pull/8620) 在 PyTorch 看不到刚宣布的 GPU 时向用户显式报告。
4. **Deep Research 冻结**（[#8483](https://github.com/unslothai/unsloth/issues/8483)）：修复 PR 为 #8633 和 #8634，主要解决主线程定时器残留与流式重渲染问题，均在进行中。
5. **RAG embedder 启动崩溃**（[#7331](https://github.com/unslothai/unsloth/issues/7331)，closed）：已移除启动时 warmup，不再导致 Studio 启动崩溃；但首次 RAG 操作仍可能因 ROCm/PyTorch 不匹配而崩。PR [#8609](https://github.com/unslothai/unsloth/pull/8609) 在 `embeddings._get()` 处捕获 torch 分配崩溃。
6. **Linux AppImage 依赖缺失**：[#8463](https://github.com/unslothai/unsloth/issues/8463)，应用因缺少 Linux 库无法启动，8 条评论，尚未有 fix PR。
7. **SSE 事件类型解析回归（CI 全红）**：PR [#8608](https://github.com/unslothai/unsloth/pull/8608) 修复 `Responses` 事件从 SSE `event` 字段读取的问题。当前 `origin/main` 上两个测试套件失败（`test_gemini_provider.py` 与 `test_external_provider_usage_chunk.py`），所有 open PR 均继承该失败。

---

## 对应用开发者的意义

- **自托管 OAI-compat 端点将获得本地工具调用能力**：PR [#8626](https://github.com/unslothai/unsloth/pull/8626)（closed）与 [#8630](https://github.com/unslothai/unsloth/pull/8630) 为 llama.cpp / vLLM / Ollama / Custom 连接启用 Search / Code / MCP / RAG，但需在每个连接上显式开启 "Local tools" opt-in。基于 Unsloth 构建 Agent 的开发者应关注这两个 PR 的合并状态，以免未来升级后工具行为不一致。
- **SSE 事件类型修复影响 Responses API 集成**：如果应用直接解析 Studio 的 OpenAI Responses 兼容流，注意 #8608 修复了事件字段读取方式；此前强制函数工具选择时会错误丢弃 hosted tools，测试已覆盖该场景。
- **上下文隔离风险**：[#8442](https://github.com/unslothai/unsloth/issues/8442) 报告了用 Unsloth 作为 API 后端时 session/harness 之间出现上下文泄漏。多租户或长连接场景建议自行验证会话隔离，并在上游修复前做好防御。
- **工具循环中的推理保留改进**：PR [#8581](https://github.com/unslothai/unsloth/pull/8581) 修复 GGUF 工具循环中 tool call 之前的 reasoning 未传给后续推理的问题，可减少 MCP 搜索类 agent 的重复搜索。
- **性能可观测性仍有限**：[#8528](https://github.com/unslothai/unsloth/issues/8528) 表明 Studio UI 目前无法在请求运行中观察 prompt 处理速度；对量化选型和端侧性能调优有依赖的开发者可关注该 feature 的进展。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*