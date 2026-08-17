# AI 基础设施日报 2026-08-18

> 生成时间: 2026-08-17 23:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施横向对比分析报告（2026-08-18）

## 1. 生态全景

当前生态处于"新模型世代（DeepSeek-V4/Kimi-K3/Qwen3.5+）＋新硬件周期（Rubin/Blackwell/XPU）+ Agent 化负载"三重压力下的再平衡期。DeepSeek-V4 的 MLA/DSA/投机解码特性已成为所有引擎的必答题——六项目中五个有 V4 相关动态，围绕它的崩溃修复与性能优化占今日 PR/Issue 的 30% 以上。另一方面，多引擎不约而同暴露出投机解码、前缀缓存、长上下文场景下的正确性/稳定性回归，安全事件（`api_key` 明文日志、`/health` 敏感信息泄露）也集中出现。行业正从"吞吐优先"转向"确定性优先＋可治理性优先"，这对推理引擎、本地运行时和网关均提出了新的设计要求。

## 2. 各项目活跃度对比

> 数据口径：各项目日报中提及的 Issues/PRs 数量，非 GitHub 当日全量。

| 项目 | 提及 Issues | 提及 PRs | Release | 高严重未修复项 | 今日主线 |
|------|:---:|:---:|:---:|:---:|------|
| vLLM | 14 | 11 | 0 | 5 | CUDA 13.4/Rubin 预发布管线、GLM-5.2 MLA 修复、`api_key` 日志泄露修复 |
| SGLang | 15 | 18 | 0 | 5 | DeepSeek-V4 稳定性（DSPARK/DSA/HiCache）、Intel XPU 5+ PR、Kimi-K3 +18.49% |
| llama.cpp | 12 | 12 | **3**（b10472/b10470/b10456） | 4 | AMD APU 显存上报修正、SYCL 量化拷贝修复、MTP 回退排查 |
| Ollama | 16 | 10 | 0 | 4 | v0.32.14 回归集中、cloud 模型输出污染导致 agent 死循环 |
| LiteLLM | 14 | 11 | 0 | 4 | 预算强制绕过、`/health` 泄露、自适应路由永久 500、FLUX 3 视频 |
| Unsloth | 11 | 14 | 0 | 2 | Studio 工具调用误触发修复、启动期 pandas 移除（7.3s） |

活跃度结论：**SGLang 的 PR 密度最高（18），Ollama 的问题单量最大（16），llama.cpp 是唯一有版本输出的项目。** vLLM 与 LiteLLM 属于"既有新功能又有高危存量问题"的并行状态。

## 3. 模型支持竞速

| 项目 | 新模型/架构支持 | 竞速亮点 |
|------|---------------|---------|
| **vLLM** | GLM-5.2 MLA dispatch 修正；Kimi-K3 ROCm Day 0（AITER fused-moe）；DeepSeek V3.2/V4；Qwen3.5 系 GDN 暴露崩溃 | **CUDA 13.4/Rubin sm_107 预发布镜像**全行业最早动手 |
| **SGLang** | DeepSeek-V4（DSPARK/HiCache/DSA 三件套）；Kimi-K3 ROCm KDA 优化；InternVL3_5-30B-A3B（XPU）；step3-321B MoE VLM；Intern-S2-Mobius-FP8 | **Intel XPU 支持最密集**（三款 embedding + 2 个 VLM 修复），Kimi-K3 吞吐领先 |
| **llama.cpp** | GraniteSWA/MoeSWA（权重未公开即已适配）；dots3-note（DSA+SWA）；DeepSeek4 `-sm tensor`；SYCL OPT_STEP 算子补齐 | 架构适配节奏最快，本地可跑新架构的"第一落点" |
| **Ollama** | Ling-3.0-tiny/flash（MLX）；Gemma4 31b/26b MLX 导出预检；kimi-k3:cloud 元数据修复；deepseek-v4-flash:cloud 上线（但输出污染） | 云＋本地混合分发是独特位置，但 cloud 质量事故拖累口碑 |
| **LiteLLM** | FLUX 3 视频生成（文生/图生/续写/Keyframes）；Amazon Comprehend Medical 新 provider；`gpt-realtime-2` 定价补全 | **网关层唯一跨模态选手**，新 modality 接入最快 |
| **Unsloth** | Z-Image-Turbo 4bit 可运行；oMLX 模型自动发现；llama.cpp semver 兼容 | 微调框架侧无新架构，重心在 Studio 稳定性 |

**结论**：推理引擎层 vLLM 和 SGLang 在"新硬件 + 新模型"双线并进且各有领先——vLLM 在 Rubin 预支持，SGLang 在 XPU 和 Kimi-K3 端到端优化；本地层 llama.cpp 保持架构适配速度优势；**DeepSeek-V4 是当前唯一的全栈共性话题**。

## 4. 性能优化前沿

| 方向 | 代表进展 |
|------|---------|
| **KV cache** | vLLM 可扩展 KV cache（PR #50779，Draft）按需增长；llama.cpp SYCL TILE 量化 KV decode 在 Battlemage 上 **+42%~169%**；SGLang HiCache 新增 buffer-only host 内存层 |
| **采样/批处理** | vLLM Model Runner V2 batch-sharded sampling 沿 TP 分片 logits，采样前显存降至 **1/P**；SGLang EAGLE v2 提前发布 shared-read-done 以降投机解码延迟 |
| **量化路径** | vLLM 采用 PTX 9.4 `ldmatrix.s8.s4` 硬件扩展加载，削减 W4A8-INT8 显存/指令开销；llama.cpp SYCL 量化 cpy kernel 按块缩放，q4_0→f32 达 20.21 GB/s |
| **分布式/分离推理** | vLLM DeepSeek V4 fused AR draft 覆盖 ROCm sparse SWA；SGLang Kimi-K3 KDA 零拷贝 prefill + packed decode，8×GB300 实测 **吞吐 +18.49%**；llama.cpp DeepSeek4 张量并行（1K head/64 Q head 镜像 FA）；vLLM NIXL disagg 仍因物理块不一致受阻 |
| **算子/启动** | SGLang 消除 DSv4 MLA prefill 的 64-head TP padding 冗余；vLLM ROCm CPU offload 对齐 `hipMemcpyBatchAsync`；Unsloth 剔除 pandas 依赖令 Studio 冷启动缩短 7.3s |

**方向判断**：优化火力集中在 **KV cache 弹性化与量化后 decode 加速**，其次是 **投机解码延迟链路** 和 **分离式推理**。值得注意的是，今天性能 PR 多伴随正确性/稳定性 issue 出现（Kimi-K3 优化背后有 4 个崩溃类 issue），说明性能竞赛已进入"边加速边补漏"阶段。

## 5. 分层定位差异

| 项目 | 层 | 典型部署 | 核心差异化 | 与上下游的关系 |
|------|----|---------|-----------|--------------|
| **vLLM** | 生产级推理引擎 | 多节点 GPU 集群、PD 分离 | PagedAttention、连续批处理、分布式原语、新硬件预支持 | 被 LiteLLM 等网关代理；托管 OpenAI 兼容端点 |
| **SGLang** | 生产级推理引擎 | 高并发在线服务 | RadixAttention 前缀复用、结构化输出、多模态、XPU 投入 | 与 vLLM 正面竞争，Agent 场景路由优化更激进 |
| **llama.cpp** | 本地/边缘 C++ 运行时 | 单机、可穿戴、手机、iGPU | GGUF 生态、量化广覆盖、架构适配最快、跨平台 | 是 Ollama 的底层后端之一；被 Unsloth 调用于量化推理 |
| **Ollama** | 本地运行时＋模型管理 | 开发者桌面、个人工作站 | 一键安装、模型拉取/管理、MLX 引擎、云模型入口 | 下层依赖 llama.cpp/MLX，上层可被 LiteLLM 代理 |
| **LiteLLM** | LLM 网关/控制面 | 企业统一入口、多云路由 | 多 provider 路由、预算/配额、审计/日志、成本映射 | 位于所有引擎/云 API 之上，是治理层 |
| **Unsloth** | 微调框架＋桌面 Studio | 数据科学家工作站、小规模训练 | QLoRA/4bit 微调、低显存训练、模型导出 | 下游对接 llama.cpp/GGUF；Studio 提供 OpenAI 兼容端点 |

**定位小结**：vLLM 与 SGLang 在"引擎"层正面竞争；llama.cpp 与 Ollama 构成"核心＋产品"的本地运行时组合；LiteLLM 是唯一的纯网关/控制面角色；Unsloth 占据"训练→导出→本地推理"的左侧上游。层间耦合正在加深——Unsloth 导出 GGUF 给 llama.cpp/Ollama，LiteLLM 统一代理 vLLM/SGLang/Ollama，而 Agent 应用横跨全部层次。

## 6. 值得关注的趋势信号

### 信号一：DeepSeek-V4 成为引擎成熟度"试金石"
vLLM 3 项、SGLang 5 项高危、llama.cpp 张量并行、Ollama cloud 事故——V4 的 MLA/DSA/投机解码组合几乎考验了每家引擎的架构设计边界。**评估引擎时，可直接用"对 V4 的适配深度和崩溃清单长度"作为工程能力标尺。**

### 信号二：投机解码是当前最大的正确性黑洞
- vLLM：MTP + FP8 长序列非法内存访问（#40756，38 条评论无修复）
- SGLang：DSPARK 静默破坏标识符（#34959）、SM120 无法启动（#33985）
- llama.cpp：MTP 自 b9935 回退（#25489）

投机解码可在 1-2 倍加速与确定性崩溃之间剧烈摇摆，生产环境应默认关闭并保留 `--num-spec-tokens 0` 回退开关。

### 信号三：非 NVIDIA 加速进入"Day-1 要求"
SGLang 的 Intel XPU 5 个 PR、llama.cpp 的 SYCL 持续优化、vLLM 的 ROCm Mooncake/LMCache 补齐、Unsloth 的 ROCm 修复——**Intel/AMD 已从"兼容项"变为各家路线图的正式组成。** 多架构部署团队可开始跟踪这些进展，但需注意各平台仍存在较多内核级 bug（如 GGML 的 gfx1151 RPC 崩溃、Arc B580 导入失败）。

### 信号四：Agent 工作负载倒逼"确定性优先"
- vLLM 前缀缓存导致 temperature=0 时首次/后续结果不一致（#40896）
- Ollama cloud 模型输出字面 `</think>`，agent 连续 193 次相同工具调用（约 31M tokens）
- SGLang 采样 mask 语义正在被重构（#34037/#35205）
- Unsloth 滚动上下文开始保留 evict turn 记录（PR #9074）

**Agent 应用开发者应当：** ① 为工具调用设置单会话次数上限和相似重复调用检测；② 对依赖确定性的流程，验证前缀缓存行为或直接禁用；③ 关注网关层预算强制是否有效——LiteLLM 当前存在 `max_budget` 完全绕过的高危问题（#26672/#27381）。

### 信号五：安全实践滞后于功能迭代
- vLLM `--api-key` 明文写入非默认参数日志（PR #52523，修复已就绪）
- LiteLLM `GET /health` 明文返回 `extra_headers` 与 `aws_session_token`（#36898）
- LiteLLM 自适应路由因单个坏数据点永久 500 且无修复（#35590）

**技术决策者应当：** 立即排查日志脱敏、限制 `/health` 暴露范围，并在升级前审计预算强制逻辑。安全在这个生态里仍主要靠"发现问题再修"，而不是默认具备。

### 信号六：长上下文与高分辨率多模态正在击穿框架假设
- SGLang DSA 单次 extend > 65535 tokens 时**静默启动零个 attention kernel**（#34941）
- Ollama 24.5MP 图片在 MLX 上申请 125GB Metal buffer 崩溃（#17804）
- vLLM MTP 长序列 + FP8 崩溃（#40756）

**建议**：在应用层增加输入分块、尺寸规范化和 token 级正确性校验；不要假设框架会优雅处理超边界请求。

---

**一句话总结**：今日生态的关键词是"**加速与失稳并存**"——Kimi-K3/DeepSeek-V4 的性能提升和 Rubin/XPU 的硬件预支持展示了下行潜力，但投机解码、前缀缓存和 Agent 工作负载暴露的正确性/安全性缺口，要求工程团队在采用新技术时同步建立熔断、校验和回退机制。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 2026-08-18

> 数据来源：github.com/vllm-project/vllm（Issues/PRs 更新区间 2026-08-17）

## 1. 今日速览

今日无新版本发布，社区动态集中在三方面：**Rust 前端功能对齐**路线图、**CUDA 13.4（Rubin）预发布支持**，以及多个高严重度稳定性问题（MTP 投机解码崩溃、引擎空闲后停摆、NIXL 分离推理失败）。其中 GLM-5.2 的 MLA dispatch 错误、DeepEP-V2 启动崩溃、`api_key` 日志泄露均有修复 PR 就绪。

---

## 2. 版本发布与破坏性变更

无新 Release。注意 PR #52661 修复了因移除 `vllm/transformers_utils/tokenizer.py` shim 导致 `lm-format-enforcer==0.11.3` 导入崩溃的回归，上游代码恢复了对该模块的兼容。

> 相关链接：[PR #52661](https://github.com/vllm-project/vllm/pull/52661)

---

## 3. 新模型与硬件支持

### 新增/预发布硬件支持
- **[Build] CUDA 13.4 预发布镜像管线**（PR #52379）：为 Rubin `sm_107` 添加 CUDA 13.4rc1 镜像构建路径，包括 overlay NVIDIA `cuda-toolkit==13.4.0rc1` PyPI 包、匹配的 PyTorch nightly 版本，并保留 CUDA driver 兼容性。关注此 PR 可提前为 Rubin 验证环境做准备。
  [PR #52379](https://github.com/vllm-project/vllm/pull/52379)

- **[ROCm] Kimi-K3 Gap 与 Roadmap 跟踪**（Issue #50682）：跟踪 vLLM 上游在 ROCm 上对 Kimi-K3 的特性启用与性能优化，Day 0 已集成 AITER fused-moe（a16w4/a8w4），后续将持续补齐功能差距。
  [Issue #50682](https://github.com/vllm-project/vllm/issues/50682)

### 模型适配
- **[Bugfix][MLA] GLM-5.2 不应使用 Dense MHA**（PR #52512）：修正 NVIDIA DeepSeek-V3.2 attention wrapper 中短 prefill dispatch 错误——当序列长度 ≤ `index_topk` 时，generic 稀疏 MLA 路径可能错误选择 dense MHA 并跳过 top-k 打分，GLM-5.2 受影响。
  [PR #52512](https://github.com/vllm-project/vllm/pull/52512)

### 容器/安装
- **[ROCm] Mooncake 构建加入 ROCm 基础镜像**（PR #52650）：使 `MooncakeConnector` / `MooncakeStoreConnector` 在 ROCm 镜像中开箱即用，解决 ROCm 环境下 KV transfer connector 缺失的问题。
  [PR #52650](https://github.com/vllm-project/vllm/pull/52650)

- **[ROCm] LMCache KV connector 安装与运行时包加入 Docker 镜像**（PR #51208，已合并）：ROCm 镜像现在随发布管线安装 LMCache，与 CUDA 镜像行为对齐。
  [PR #51208](https://github.com/vllm-project/vllm/pull/51208)

---

## 4. 性能与优化

- **W4A8-INT8 采用 PTX 9.4 `ldmatrix.s8.s4` 硬件 INT4→INT8 扩展加载**（Issue #49529）：利用 CUDA 13.4 Developer Preview 新增的 `ldmatrix` 变体，在共享内存矩阵加载过程中完成 INT4 到 INT8 的符号扩展，减少 W4A8-INT8 路径中的显存与指令开销。
  [Issue #49529](https://github.com/vllm-project/vllm/issues/49529)

- **可扩展（growable）KV cache**（PR #50779，Draft）：支持按需动态扩展 KV cache，避免预分配过大的显存浪费，对长上下文和不可预测流量场景有利。基础 PR #51718 合入后方可合并。
  [PR #50779](https://github.com/vllm-project/vllm/pull/50779)

- **Model Runner V2 batch-sharded sample**（PR #50465）：通过沿 TP 维度分片 logits 和 sampler 输入，将采样前显存分配降低至原来的 1/P（P=TP 大小），改善大 batch + 多投机 token 场景下的显存峰值。
  [PR #50465](https://github.com/vllm-project/vllm/pull/50465)

- **ROCm CPU offload 适配 hipMemcpyBatchAsync**（PR #43018）：对齐 ROCm 7.13+ 的 `hipMemcpyBatchAsync` 参数语义，并修复 7.14x 下的性能问题。
  [PR #43018](https://github.com/vllm-project/vllm/pull/43018)

- **DeepSeek V4 启用 fused AR draft metadata 更新**（PR #52628）：基于 #46849 恢复自回归投机解码的融合多步 draft decode 图，本 PR 额外补上 DeepSeek V4 在 ROCm sparse SWA 路径上的支持。
  [PR #52628](https://github.com/vllm-project/vllm/pull/52628)

- **Batch Invariant 特性与性能优化追踪**（Issue #27433）：跟踪批处理不变性（batch invariant）的工作进展，已有基础支持，剩余工作持续收尾。
  [Issue #27433](https://github.com/vllm-project/vllm/issues/27433)

---

## 5. 稳定性与回归

按严重程度排序，已标注是否存在修复 PR。

### 高严重度（崩溃/死锁/静默错误）
- **Qwen3.5 CUDA 非法内存访问（GDN Kernel）**（Issue #34948，Open）：H200 上 `GDN Kernel` 触发 `illegal memory access`，vLLM Nightly + CUDA 13.0。受影响模型为 Qwen3.5 系列（含 Gated DeltaNet 层），疑似与算子内存边界相关，尚无修复 PR。
  [Issue #34948](https://github.com/vllm-project/vllm/issues/34948)

- **MTP 投机解码长序列崩溃（Qwen3.6-27B-FP8）**（Issue #40756，Open）：`num_spec_tokens=5` + FP8 量化时出现 illegal memory access，截至今日仍无修复 PR，评论数 38 条，需重点关注。
  [Issue #40756](https://github.com/vllm-project/vllm/issues/40756)

- **v0.27.0 引擎空闲约 1 分钟后永久停摆**（Issue #51921，Open）：4 节点 GB10/sm_121 TP=4 部署下，空闲后请求不再进入调度器，`shm_broadcast` writer 饥饿。属于分布式部署可用性问题，暂无修复 PR。
  [Issue #51921](https://github.com/vllm-project/vllm/issues/51921)

- **NIXL 分离推理失败：prefill TP4 与 decode DP8 物理块大小不同**（Issue #42895，Open）：Qwen3.5 hybrid 模型下 prefill/decode 分离部署，因物理块大小不一致导致 NIXL connector 失败。
  [Issue #42895](https://github.com/vllm-project/vllm/issues/42895)

- **vLLM v1 前缀缓存：相同请求 temperature=0 时首次结果与后续不一致**（Issue #40896，Open）：前缀缓存命中导致采样结果不确定，正确性问题，暂无修复 PR。
  [Issue #40896](https://github.com/vllm-project/vllm/issues/40896)

- **DeepEP-V2 all2all 在 decode/cudagraph 路径启动崩溃**（PR #52632，新提交修复）：`expert_tokens_meta` 在 graph 模式空 `recv_expert_num_tokens` 时被无条件构建导致崩溃，已有修复 PR。
  [PR #52632](https://github.com/vllm-project/vllm/pull/52632)

- **Mamba-2 Triton kernel 在 SM121（DGX Spark）上 illegal instruction**（Issue #37431，Open）：异步模式下触发，设置 `CUDA_LAUNCH_BLOCKING=1` 可规避。
  [Issue #37431](https://github.com/vllm-project/vllm/issues/37431)

### 中严重度（功能异常/回归）

- **Gemma4 在 vllm-openai:latest 中启动失败（Transformers 5.15.0）**（Issue #51744，Open）：镜像内 Transformers 5.15.0 与 Gemma-4-31B NVFP4 不兼容，影响最新镜像用户。
  [Issue #51744](https://github.com/vllm-project/vllm/issues/51744)

- **draft_model 投机解码在 TP>1 且 draft hidden_size > target 时初始化崩溃**（Issue #52023，Open）：`fuse_allreduce_rms` workspace 仅按 target 模型尺寸分配，draft 更大时越界。
  [Issue #52023](https://github.com/vllm-project/vllm/issues/52023)

- **`api_key` 明文写入非默认参数日志**（PR #52523，Ready）：启动日志会打印 `--api-key` 或 `VLLM_API_KEY` 明文，已提交 redact 修复。生产环境存在敏感信息泄露风险，建议立即跟进。
  [PR #52523](https://github.com/vllm-project/vllm/pull/52523)

- **lm-format-enforcer 导入崩溃（回归）**（PR #52661，Open）：模块移除后破坏 `lm-format-enforcer==0.11.3` 的 `from vllm.transformers_utils.tokenizer import MistralTokenizer`，已有修复。
  [PR #52661](https://github.com/vllm-project/vllm/pull/52661)

- **引擎启动失败：可用 Mamba cache blocks < max_num_seqs**（Issue #49064，Open）：hybrid 模型 + LoRA 场景下启动直接 hard-fail，建议改为自动 clamp 并告警。
  [Issue #49064](https://github.com/vllm-project/vllm/issues/49064)

- **DeepSeek V4 parser：回复缺少 `</think>` 时整段被路由至 reasoning_content**（Issue #48645，Open）：结构化输出解析异常，影响依赖 reasoning 字段的 downstream 应用。
  [Issue #48645](https://github.com/vllm-project/vllm/issues/48645)

### 已关闭/已解决

- **Kimi-K2.7-Coder 在 AMD MI308X 上启动失败**（Issue #51964，Closed）：`mla_gluon requires gfx950` 断言错误，已关闭（大概率已修复或定位）。
  [Issue #51964](https://github.com/vllm-project/vllm/issues/51964)

---

## 6. 对应用开发者的意义

- **敏感信息泄露风险**：`api_key` 明文日志问题影响所有 vLLM 部署，若已开启非默认参数日志，建议升级到包含 PR #52523 的版本，并在升级前检查现有日志是否有 key 泄露。
  [PR #52523](https://github.com/vllm-project/vllm/pull/52523)

- **镜像拉取策略需谨慎**：`vllm-openai:latest` 目前携带 Transformers 5.15.0，可能无法启动部分新模型（如 Gemma4 NVFP4）。生产环境建议固定版本并核对依赖兼容性，不要直接跟随 latest。
  [Issue #51744](https://github.com/vllm-project/vllm/issues/51744)

- **投机解码 + 量化组合风险高**：MTP 投机解码在 FP8 长序列场景下仍有崩溃问题，对时延敏感但稳定性优先的应用建议保留回退开关（`--num-spec-tokens 0`），并关注 Issue #40756 进展。
  [Issue #40756](https://github.com/vllm-project/vllm/issues/40756)

- **前缀缓存正确性注意**：v1 前缀缓存在 temperature=0 下出现首次请求与后续不一致的问题（Issue #40896），构建依赖确定性输出的 Agent 应用时，必要时需加大 `block_size` 或禁用前缀缓存以避免脏数据。
  [Issue #40896](https://github.com/vllm-project/vllm/issues/40896)

- **多节点/DP 分离部署暂避坑**：NIXL disagg（prefill TP4 / decode DP8 混合）仍存在功能性阻塞，非必要不建议在生产使用不同物理块大小配置。
  [Issue #42895](https://github.com/vllm-project/vllm/issues/42895)

- **新硬件支持预热**：CUDA 13.4 / Rubin（sm_107）预发布镜像已开始准备，Kimi-K3 在 ROCm 的 Day 0 基线已生成；未来 1-2 个季度内相关部署可提前跟踪上述 PR/Issue 了解兼容性。
  [PR #52379](https://github.com/vllm-project/vllm/pull/52379) · [Issue #50682](https://github.com/vllm-project/vllm/issues/50682)

---

*本日报由 AI 自动整理，数据截至 2026-08-17 23:59 UTC。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-18

## 今日速览

过去 24 小时无新版本 Release；社区活跃度集中在 **DeepSeek-V4 系列稳定性问题**（DSPARK 投机解码、HiCache 缓存命中、稀疏注意力内核崩溃）与 **Kimi-K3 性能优化** 上。Intel XPU 前后端成为当前 PR 贡献最密集的硬件方向。值得注意的还有一组关于采样掩码（sampling mask）语义修正的 PR，可能影响 API 响应字段。

---

## 版本发布与破坏性变更

无新版本 Release。以下变更可能造成行为差异：

- PR #33889 已移除 load-time override 机制（Quark 共享专家融合门控修复依赖此变更，见 PR #35200）。如你的部署依赖 `--override-*` 参数加载模型，建议关注此 PR 的迁移说明。
- 采样掩码（sampling mask）相关 PR（#34037、#35205）正在重构采样支持的捕获语义，后续版本可能调整 `sampling_mask` 的返回内容与 top-p 边界行为。

---

## 新模型与硬件支持

- **[Intel XPU] Encoder 嵌入模型**：PR #35213 为 XPU 后端新增 `BAAI/bge-base-en-v1.5`、`nomic-ai/nomic-embed-text-v1.5`、`ibm-granite/granite-embedding-english-r2` 三款模型支持。
- **[Intel XPU] InternVL 并发多模态修复**：PR #35212 修复 InternVL3_5 MoE 模型（如 `OpenGVLab/InternVL3_5-30B-A3B`）在 XPU 上的权重加载崩溃与并发推理问题。
- **[Intel XPU] Step3 VLM 修复**：PR #35206 修复 `stepfun-ai/step3`（321B MoE VLM）在缺少 `pad_token_id` 配置时初始化崩溃。
- **[Intern-S2-Mobius FP8]**：PR #34908 添加对 `internlm/Intern-S2-Mobius-FP8` 的支持，修复 FP8 量化层 `modules_to_not_convert` 前缀匹配过宽的问题。
- **[AMD] Kimi-K3 ROCm 优化**：PR #35176 将 KDA 输入投影融合为单个 GEMM；PR #34985 为 MI35x 添加 nightly 性能基准。
- **NIXL/UCX**：#35189 报告 NIXL/UCX prefill 段错误在 v0.5.17 / CUDA 13.0 / B200 上仍可复现，官方此前关闭 #23489/#23499 时未给出根因。

---

## 性能与优化

- **Kimi-K3 端到端吞吐 +18.49%**：PR #34299 为 KDA 添加零拷贝原生 prefill checkpoint 与 packed decode，在 8×GB300 / TP8 / NVL72 A/B 实测（2048 输入 / 64 输出 tokens）吞吐提升 18.49%。
- **EAGLE v2 验证阶段优化**：PR #34890 使 draft-extend 后端（DSV4、非 SWA flashinfer）在 verify 时发布 shared-read-done，调度器 WAR barrier 等待 verify-time record 而非 draft 阶段，降低投机解码延迟。
- **SM12x MLA prefill 优化**：PR #35104 移除 DSv4 MLA prefill 在 `attn_tp_size=2` 时多余的 64-head TP padding（当前会计算 64 行再丢弃一半），减少计算量。
- **GDN 目标验证去冗余**：PR #33778 避免在 GDN 投机解码验证路径中物化 Q/K/V 张量，复用 `causal_conv1d_update` 已生成的 packed QKV。
- **Helion KDA 内核修复**：PR #35197 修复短 prefill 请求的 shape 处理，并拒绝非 2 次幂 head dim 的 decode，避免静默错误。
- **HiCache host 内存层**：PR #34798 为 HiCache 增加 buffer-only 模式，扩展 host 内存层使用灵活性。

---

## 稳定性与回归

按严重程度排列（🔴 严重 / 🟠 中等 / 🟡 低）：

### 🔴 严重

- **NIXL/UCX prefill 段错误复发**（#35189）：v0.5.17 / CUDA 13.0 / B200 上稳定复现，`nixlUcxSharedThread → cuEventQuery` 崩溃；#23489/#23499 被无根因关闭，风险未消除。
- **DeepSeek-V4 TP=8 解码悬挂**（#33549）：8×H20 上 decode 在 ~245K context 处无限 hang，所有 GPU 100% 利用率但低功耗，watchdog 杀服务。
- **DSPARK 标识符静默损坏**（#34959）：DeepSeek-V4-Flash 上投机解码会静默破坏生成标识符，影响内容正确性，**无修复 PR**。
- **DSA 稀疏 MLA 长上下文静默错误**（#34941）：单次 unchunked extend > 65535 tokens 时，DSA `prefill=trtllm` 路径启动零个 attention kernel，**静默产生错误输出**（SM100/trtllm-gen `gridDim.z` 限制未防护）。
- **Kimi-K3 DSPARK + DCP 崩溃**（#34920）：decode 侧在 PD 分离 + `--dcp-size 8` + DSPARK 下确定性崩溃，`extend_prefix_lens=None` 导致 cumsum TypeError。

### 🟠 中等

- **DeepSeek-V4 稀疏注意力索引器非法内存访问**（#34718）：`fp8_paged_mqa_logits` 在长上下文请求时触发 illegal memory access。
- **DSv4 调度器挂起**（#34235）：0.5.17 + hierarchical cache + chunked prefill 16K 时 scheduler hang（watchdog abort）；0.5.16+PR 上另有 sampling device-side assert。
- **DSpark 在 SM120 无法启动**（#33985）：RTX PRO 6000 上 decode-dsv4 无 topk=192 实例化，verify 时落入 prefill kernel 的 `num_tokens > 64` assert，CUDA graph capture 必失败。
- **EAGLE/NEXTN TP=2 XPU 挂起**（#35144）：PR #34238 将 verify 决策 TP broadcast 移出采样分支后，warmup 阶段挂起。
- **HiCache 长会话缓存失效**（#35129）：长 agentic 会话每轮 `#cached-token: 0`，尽管 token 级前缀命中率 50%+；短请求可达 98%。
- **DeepSeekV4TokenToKVPool 缺少 `get_cpu_copy()`**（#33385）：decode-mode retract 必然触发 NotImplementedError，offload 未按文档开关门控。

### 🟡 低 / 跟踪中

- **采样掩码捕获不忠实**（#35205、#34037 修复中）：重构后的采样 mask 不能可靠反映 token 选择分布，触发 top-p 边界语义差异；已有 PR 在修。
- **统一 Radix Cache 重构**（#20415 roadmap）：LRU/LFU/混合实现维护成本高，重构进行中；#34899 要求为统一缓存添加 bit-exact 正确性测试。
- **Router 断路器误判 4xx**（#25811，已关闭）：客户端错误被计为 worker 失败导致 `no_available_workers`。
- **CI 状态**（#17050 跟踪）：昨日至今日 3 broken / 11 flaky / 672 recently fixed。
- **单元测试覆盖改进**（#20865，good first issue）：600+ 测试文件以 E2E 为主，核心模块缺少单元测试，欢迎贡献。

---

## 对应用开发者的意义

- **DeepSeek-V4 系列部署需谨慎**：DSPARK + HiCache + dsv4 后端的组合在长上下文、agentic 场景下有多个高危未修复 Bug（标识符损坏、缓存失效、非法内存访问）。生产环境务必在修复 PR 合入后再升级，并添加 token 级正确性校验。若只用普通 decode 且关闭 DSPARK，风险相对可控。
- **长上下文 > 64K 注意内核限制**：DSA 稀疏 MLA 在单次 extend > 65535 tokens 时静默不计算 attention，应用层无法感知。长文档场景建议在服务端加输入分块或改用非 DSA 后端，直到 #34941 修复。
- **采样 mask 字段可能变更语义**：`sampling_mask` 响应在 #34037/#35205 合入后可能调整，依赖 mask 做流程控制的 Agent 应用需关注版本更新说明。
- **多进程配置时序修复**：PR #35023/#35029 修复了五个进程在配置发布前读取配置的竞态问题，涉及多进程部署的网关/调度器，升级后有助于减少随机初始化失败。
- **HiCache 缓存命中率在长会话下不可靠**：如果你的应用依赖 prefix caching 降低长对话延迟，在 #35129 修复前建议对长 session 的缓存命中做监控告警，必要时轮换 context 或关闭 HiCache。

---
*数据来源：sgl-project/sglang GitHub（2026-08-17 22:20 UTC 更新窗口）*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 — 2026-08-18

## 1. 今日速览

今日发布 3 个新版本（b10472/b10470/b10456），核心修复包括 AMD APU 统一内存（UMA）容量误报和 SYCL 量化拷贝算子性能问题。社区侧，`llama-server` 可观测性和“桌面 App”成为 PR 热点，而 Multi-Token Prediction（MTP）性能回退与 CUDA kernel stall 是当前最受关注的稳定性问题，均已有对应修复/排查 PR 在途。

## 2. 版本发布与破坏性变更

- **b10472** — CUDA 后端：对 HIP 构建跳过 UMA 容量 override；AMD APU 将改用 `hipMemGetInfo` 报告准确显存，修复小 carve-out 系统上显存被高估的问题（对应 issue #18159）。使用 AMD APU 且依赖 `MemAvailable` 逻辑的用户需重新验证显存分配行为。
  https://github.com/ggml-org/llama.cpp/releases/tag/b10472
- **b10470** — CI：在 release.yml 中增加显式打 tag 步骤，使用现有 deploy key 推送，不再依赖 GitHub Release 自动打标签；对发布流程有自动化依赖的团队请留意 tag 创建时机的变化。
  https://github.com/ggml-org/llama.cpp/releases/tag/b10470
- **b10456** — SYCL：修复量化 cpy kernel launch 的线程/块数，改为按量化块大小缩放，避免过度或不足订阅；q4_0→f32 路径在 Arc 70 上吞吐从 20.21 GB/s 显著提升（PR #27160）。
  https://github.com/ggml-org/llama.cpp/releases/tag/b10456

无 API 破坏性变更；b10472 对 AMD APU 显存上报逻辑的调整属于行为变更，建议相关用户关注。

## 3. 新模型与硬件支持

- **新增模型架构 PR**：
  - GraniteSWA / GraniteMoeSWA：支持带交错滑动窗口注意力与 Attention Sinks 的 Granite 模型（权重尚未公开，PR #25505）。
    https://github.com/ggml-org/llama.cpp/pull/25505
  - dots3-note：支持 DSA + SWA 架构，`llama-kv-cache-dsa` 能力扩展（PR #27060）。
    https://github.com/ggml-org/llama.cpp/pull/27060
- **SYCL 后端**：补齐 `OPT_STEP_ADAMW`、`OPT_STEP_SGD` 算子支持（PR #25268，随 b10455 合并）。
  https://github.com/ggml-org/llama.cpp/pull/25268

## 4. 性能与优化

- **SYCL 量化拷贝路径优化（已落地，b10456）**：量化 cpy kernel 线程/块数按量化粒度缩放。q4_0→f32 在 Arc 70 上吞吐从 20.21 GB/s 起跳，改善显著。
  https://github.com/ggml-org/llama.cpp/pull/27160
- **SYCL TILE kernel 支持量化 KV decode（进行中）**：PR #26689 在 Battlemage 上对 Qwen3.6-35B、Gemma 4 26B/12B 的量化 KV decode 实现 +42% ~ +169% 吞吐提升，无回归；目前为门控变更，尚未合并。
  https://github.com/ggml-org/llama.cpp/pull/26689
- **MTP 自适应 draft 深度（进行中）**：PR #27210 新增 `--spec-type draft-mtp-adaptive`，通过计数状态机动态调整 draft 深度（建议 `--spec-draft-n-max 12`），可降低无效 draft 造成的算力浪费。
  https://github.com/ggml-org/llama.cpp/pull/27210
- **DeepSeek 4 张量并行支持（进行中）**：PR #26490 为 DeepSeek4 添加 `-sm tensor`，处理 1 K head / 64 Q head 镜像 FA 场景。
  https://github.com/ggml-org/llama.cpp/pull/26490

## 5. 稳定性与回归

按严重程度排列：

- **CUDA kernel stall，被 watchdog 杀死（严重，有 issue 无 fix）**：RTX Pro 6000 Blackwell MAX-Q 上执行 Qwen3.8-27B 时 CUDA kernel 卡死（#27102），影响高端 Blackwell 用户。
  https://github.com/ggml-org/llama.cpp/issues/27102
- **MTP 性能自 b9935 起回退（严重，有 issue 无 fix）**：Windows + MTP draft 场景性能下降（#25489），叠加 #23533 中 SYCL MTP 无加速问题，建议 MTP 用户锁定版本验证。
  https://github.com/ggml-org/llama.cpp/issues/25489
- **ggml-backend split 断言崩溃（多发，有 issue 无 fix）**：`GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN) failed` 在 4×Tesla T10 跑 Glimmer Q8_0（#26902）和 2×RTX 5060 Ti 跑 Qwen3.8-27B + iq4_nl KV cache + tensor split（#27116）时出现，均与 tensor split 的 KV cache 量化组合相关。
  https://github.com/ggml-org/llama.cpp/issues/26902
  https://github.com/ggml-org/llama.cpp/issues/27116
- **AMD ROCm gfx1151 RPC worker 在 TOP_K 崩溃（严重，有 issue 无 fix）**：DeepSeek V4 prefill 超过 4096 tokens 后 RPC worker 崩溃（#26746）。
  https://github.com/ggml-org/llama.cpp/issues/26746
- **CUDA 4-bit KV cache 导致 prefill 塌陷（有 issue 无 fix）**：Qwen3.5 hybrid 模型 + q4_1/q4_0 KV cache 在 RTX 3090 上 prefill 降至 ~34 t/s（#27109）。
  https://github.com/ggml-org/llama.cpp/issues/27109
- **SIGSEGV：fused ops 误判（有 issue 无 fix）**：Intel Lunar Lake iGPU（Arc 140V）上 `resolve_fused_ops` 对 gemma4/qwen2 产生假阳性导致空指针跳转（#27046）。
  https://github.com/ggml-org/llama.cpp/issues/27046
- **Windows ROCm 7.14 发布包缺 hipblas.dll（环境问题，有 issue 无 fix）**：GPU 无法被检测，`--list-devices` 为空（#26996）。
  https://github.com/ggml-org/llama.cpp/issues/26996
- **/v1/completions 不回传 prompt logprobs（功能缺陷，有 issue 无 fix）**：`echo: true + logprobs` 时仅返回生成 token 的 logprobs，影响 lm-eval 等评估框架（#27174）。
  https://github.com/ggml-org/llama.cpp/issues/27174
- **已合入的修复**：
  - AMD APU UMA 显存高估：b10472 修复 #18159。
  - SYCL host-pinned 内存高 CPU 占用：issue #27038 由 commit a97123e49 引入，尚在排查。
  - 图形/安全修复 PR：#27286（mul_mat_id expert id 越界写，release 构建因 NDEBUG 失效）、#27285（mmproj 缺失 optional tensor 时空指针解引用）、#27284（im2col 偏移 stride 截断为 int32，CWE-680/787）均已提交，待合入。
  https://github.com/ggml-org/llama.cpp/pull/27286
  https://github.com/ggml-org/llama.cpp/pull/27285
  https://github.com/ggml-org/llama.cpp/pull/27284
  https://github.com/ggml-org/llama.cpp/issues/27038

## 6. 对应用开发者的意义

- **多 GPU / 混合显存环境注意 APU 显存判定变化**：b10472 后 AMD APU 的可用显存按 `hipMemGetInfo` 计算，依赖自动 offload 策略的应用需重新测试显存阈值与层分配。
- **MTP 性能波动仍在，生产使用需锁定版本**：当前存在 b9935 后回退（Windows）与 SYCL 无加速两条线；建议 MTP 用户先验证目标负载的实际加速比再升级。
- **tensor split + 量化 KV cache 组合仍有崩溃风险**：涉及 iq4_nl / Glimmer Q8_0 等场景时，建议暂用 layer split 或 f16 KV cache 规避，等待 `ggml-backend-meta` split 逻辑修复。
- **可观测性基础设施正在补齐**：OTLP/HTTP tracing PR（#27280）已提交，配合既有 `/metrics` 端点可构建更完整的生产监控；依赖 /metrics 做空闲唤醒的团队需注意 #20227 中“metrics 查询阻止 model sleep”的已知行为。
  https://github.com/ggml-org/llama.cpp/pull/27280
  https://github.com/ggml-org/llama.cpp/issues/20227
- **官方桌面 App 进入视野**：PR #27287 基于 Electron 封装 `llama-server`，面向非技术用户；对嵌入式/服务化部署无直接影响，但预示着项目开始覆盖端侧分发场景。
  https://github.com/ggml-org/llama.cpp/pull/27287

---

**总结**：今日主线是 SYCL/CUDA 后端修复与 AMD APU 显存准确性改进；MTP 性能回退和 tensor-split 量化 KV 崩溃是当前生产环境最大风险点，建议关注对应 issue 与修复 PR 进展。RPC 多服务器隔离（#26500）和 OpenCL Adreno 优化（#26331）在持续推进中，适合有相关硬件/拓扑的团队提前验证。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-18

## 今日速览
- 最严重事件：`deepseek-v4-flash:cloud` 在 agent 场景下模型输出泄漏字面 `</think>`，导致 Claude Code 等客户端连续 193 次相同工具调用（约 31M tokens），形成自维持死循环。
- 稳定性风险：v0.32.14 被集中报告回归，包括 CPU 占用异常升高、MLX 引擎 `think:false` 空回复、本地 API 误报 401；另有多项 `qwen3.8` 相关的下载/工具调用/搜索故障。
- 社区 PR 侧重点：MLX 新模型支持（Ling-3.0、Gemma4 预检）、`ollama launch` 与 CLI 修复、安装脚本兼容性修正。过去 24 小时无新 release。

---

## 版本发布与破坏性变更
过去 24 小时无新版本发布。用户报告集中在 v0.32.14 的回归，详见“稳定性与回归”。

---

## 新模型与硬件支持
- [PR #17643](https://github.com/ollama/ollama/pull/17643)（OPEN）：为 MLX 引擎新增 Bailing MoE V3 架构支持，覆盖 `Ling-3.0-tiny` 与 `Ling-3.0-flash`。
- [PR #17622](https://github.com/ollama/ollama/pull/17622)（CLOSED）：新增 `apple-silicon-mlx` preflight 配置，为 MLX store 的 gemma4 导出模型（31b/26b/26b-mxfp8）增加 CI 覆盖。
- [Issue #17510](https://github.com/ollama/ollama/issues/17510)（OPEN）：社区请求提供 `deepseek-v4-flash:0731` 本地版本。
- [Issue #3113](https://github.com/ollama/ollama/issues/3113)（OPEN）：长期 open 的 Intel 集成显卡（Iris Xe）适配请求，近期仍有更新。
- [PR #17828](https://github.com/ollama/ollama/pull/17828)（OPEN）：修复 cloud 模型缺少本地 manifest 时元数据为空的问题，覆盖 `kimi-k3:cloud` 等新发布/按量计费模型。
- [PR #17758](https://github.com/ollama/ollama/pull/17758)（OPEN）：`ollama launch` 支持在全局 npm 安装失败时回退到 `npx` 运行 DeepSeek Harness。

---

## 性能与优化
- [Issue #17829](https://github.com/ollama/ollama/issues/17829)（OPEN）：MLX 引擎目前无 prompt/prefix caching，多步 agent 会话中每步都全量 re-prefill（20–30K tokens），TTFT 明显增长。尚未有 fix PR。
- [Issue #17833](https://github.com/ollama/ollama/issues/17833)（OPEN）：v0.32.14 中模型完全载入 VRAM 后，CPU 占用仍高达 50–80%；回退到 v0.32.13 后恢复正常，疑似回归。
- [PR #17799](https://github.com/ollama/ollama/pull/17799)（OPEN）：`/api/embed` 在输入超长被静默截断时不再无提示，新增 warning 日志，方便 RAG 管线感知截断。
- [PR #17112](https://github.com/ollama/ollama/pull/17112)（CLOSED）：`stderr` 非 TTY 时抑制 ANSI 控制字符，改善脚本/管道环境中 `ollama run` 输出的可解析性。
- [PR #17827](https://github.com/ollama/ollama/pull/17827)（OPEN）：修正 `humanDuration` 在年份标签边界处使用截断小时数导致的显示错误。

---

## 稳定性与回归
以下问题按严重程度排列，当前均未见对应 fix PR（除标注外）：

1. [Issue #17617](https://github.com/ollama/ollama/issues/17617)（OPEN）：**Cloud 模型输出污染导致 agent 死循环**。`deepseek-v4-flash:cloud` 在 Anthropic 兼容端点下泄漏字面 `</think>`，使 agent 连续发出 193 次相同工具调用，预计消耗约 31M tokens。需要应用层熔断。
2. [Issue #17825](https://github.com/ollama/ollama/issues/17825)（OPEN）：`qwen3.8:27b` 工具调用解析失败返回 500 后，**重新提交相同请求会无限挂起**，无响应、无日志，只能等 runner 回收。
3. [Issue #17804](https://github.com/ollama/ollama/issues/17804)（OPEN）：MLX vision runner 处理 5712×4284（24.5MP）图像时为 Qwen3.8-27B 申请约 **125GB Metal buffer**，在 48GB 内存 M5 Pro 上崩溃。
4. [Issue #17822](https://github.com/ollama/ollama/issues/17822)（OPEN）：本地环境未配置任何云凭据时，`/api/embed` 和 `/api/generate` 返回 `500 tokenize error: Invalid API Key (401)`，疑似错误地走了云端 tokenizer。
5. [Issue #17823](https://github.com/ollama/ollama/issues/17823)（OPEN）：v0.32.14 上 Gemma 4 MLX 模型请求 `"think": false` 时返回空 `content`；同模型在 v0.32.5 正常，属回归。
6. [Issue #17814](https://github.com/ollama/ollama/issues/17814)（OPEN）：qwen3.x vision 接收两张像素尺寸完全相同的图片时，仅保留一张且无报错，结果不可预期。
7. [Issue #17816](https://github.com/ollama/ollama/issues/17816)（OPEN）：`ollama run qwen3.8` 拉取 manifest 时报 `EOF`，模型无法下载。
8. [Issue #17812](https://github.com/ollama/ollama/issues/17812)（CLOSED）：Ollama Desktop（Windows）中 `qwen3.8:27b` 原生 web search 每次失败：`500 no user query found in messages`。
9. [Issue #17831](https://github.com/ollama/ollama/issues/17831)（OPEN）：Ubuntu 26.04 下配置 `OLLAMA_HOST=0.0.0.0:8200` 未按预期绑定 IPv4 地址。
10. [Issue #17821](https://github.com/ollama/ollama/issues/17821)（CLOSED）：网络断开时 Ollama 自动重启并丢失会话，用户已提交支持工单。
11. [Issue #17544](https://github.com/ollama/ollama/issues/17544)（OPEN）：`/api/generate` 在设置 `format` 时静默忽略 `think: true`，而 `/api/chat` 行为正确。
12. [Issue #17811](https://github.com/ollama/ollama/issues/17811)（OPEN）：`ollama launch claude` 交互会话启动后报 `Input must be provided either through stdin or as a prompt argument`。

已合入/有 PR 的相关修复：
- [PR #17267](https://github.com/ollama/ollama/pull/17267)（CLOSED）：OpenAI 兼容端点接受 `reasoning_effort=minimal` 并映射到 `low`，避免 400。
- [PR #17624](https://github.com/ollama/ollama/pull/17624)（CLOSED）：处理用户配置中 `"integrations": {"claude": null}` 导致的 nil 解引用 panic。
- [PR #17623](https://github.com/ollama/ollama/pull/17623)（CLOSED）：`ollama launch` 接受 Claude Code 的 `[1m]` 上下文窗口后缀，避免启动校验失败。

---

## 对应用开发者的意义
- **Agent 调用云模型必须加防护**：[#17617](https://github.com/ollama/ollama/issues/17617) 表明云端推理输出可能被污染，导致无限工具调用；建议设置单次会话最大调用次数、检测相似重复调用，并对输出中的控制 token 做过滤。
- **不要盲目重试工具调用 500**：[#17825](https://github.com/ollama/ollama/issues/17825) 中重试会永久挂起；在修复前，遇到工具解析失败应先重置 runner 或切换会话。
- **RAG/embedding 管线注意 401 误报**：[#17822](https://github.com/ollama/ollama/issues/17822) 在本地纯离线环境可能触发 tokenize 401，建议对 embed 错误做降级或显式告警，而非直接失败。
- **多图像 vision 调用避免同尺寸图**：[#17814](https://github.com/ollama/ollama/issues/17814) 仅影响相同像素尺寸的图片，可临时修改尺寸或在业务侧校验模型实际接收的图片数量。
- **MLX 用户需关注资源与回归**：[#17829](https://github.com/ollama/ollama/issues/17829) 的无 prefix caching 会增加长会话成本；[#17823](https://github.com/ollama/ollama/issues/17823) 的 `think:false` 空回复会破坏依赖 `content` 的解析器。
- **建议暂停升级到 v0.32.14**：当前已出现 CPU 占用回归（[#17833](https://github.com/ollama/ollama/issues/17833)）和 MLX 行为回归，生产环境可先留在 v0.32.13 观察。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### 1. 今日速览

过去24小时LiteLLM无新版本发布，但开发与Issue活动密集。稳定性回归是当前焦点：预算强制绕过、/health接口敏感信息明文泄露、自适应路由器因单个坏数据点永久返回500等问题被集中讨论。同时，新功能开发活跃，涉及Flux 3视频生成、Amazon Comprehend Medical透传等。另有多个针对`claude code`场景的llm translation错误修复进行中。

### 2. 版本发布与破坏性变更

无新版本发布。但请注意，PR #37218 ([链接](https://github.com/BerriAI/litellm/pull/37218)) 修复了部署启用`rust: true`时该标志泄漏到上游provider请求体，导致400错误的问题。该修复将`rust`注册为LiteLLM层参数，可视为一个内部参数行为的变更，升级后需观察行为变化。

### 3. 新模型与硬件支持

- **[New Models]** PR #37224 ([链接](https://github.com/BerriAI/litellm/pull/37224)) 为`black_forest_labs`新增`FLUX 3`视频生成支持，涵盖文生视频、图生视频、续写、草稿模式及Keyframes等功能。
- **[New Provider]** PR #37229 ([链接](https://github.com/BerriAI/litellm/pull/37229)) 新增Amazon Comprehend Medical透传provider，新增SigV4签名路由，支持REST与JSON协议，使临床文本负载可通过网关统一鉴权与审计。
- **[Pricing]** PR #31565 ([链接](https://github.com/BerriAI/litellm/pull/31565)) 为`azure/gpt-realtime-2`、`-2.1`、`-2.1-mini`添加成本映射，并修正实时图像输入的按token计费问题，相关条目仍保持开放状态。

### 4. 性能与优化

今日无直接涉及吞吐或延迟的数字型优化PR。但以下Bug修复对运行稳定性有间接正向影响：

- Issue #25219 ([链接](https://github.com/BerriAI/litellm/issues/25219)) 持续追踪Pod内存持续增长直至OOM Kill的问题，这通常是性能与稳定性隐患，该Issue已标记为stale，社区关注度较高。
- Issue #19499 ([链接](https://github.com/BerriAI/litellm/issues/19499)) 报告内置prompt注入检测的启发式规则会阻塞事件循环，诱发Pod重启，此问题直接影响服务可用性，需持续关注。

### 5. 稳定性与回归

今日报告的稳定性问题按严重程度排列如下：

**高严重度**

- **全局预算强制可被绕过** [#26672](https://github.com/BerriAI/litellm/issues/26672) 与 [#27381](https://github.com/BerriAI/litellm/issues/27381) 均报告v1.82.3中key/user/全局max_budget失效。其中#27381指出`max_budget_limiter`被实例化但从未注册，为完全绕过状态。社区评论数较多，且#26672已有17条讨论，建议优先关注官方修复版本。
- **/health接口泄露敏感配置** [#36898](https://github.com/BerriAI/litellm/issues/36898) GET /health接口会明文返回`extra_headers`和`aws_session_token`，`api_key`会被掩码但上述字段不会。存在安全隐患，建议在修复前谨慎暴露该接口。
- **自适应路由器因单个坏数据点永久故障** [#35590](https://github.com/BerriAI/litellm/issues/35590) 当adaptive router遇到一个持久化的alpha/beta=0数据点后，所有请求永久返回500错误（`gammavariate: alpha and beta must be > 0.0`），且无法自愈。已有关联PR #37226 ([链接](https://github.com/BerriAI/litellm/pull/37226)) 与 #37230 ([链接](https://github.com/BerriAI/litellm/pull/37230)) 正在尝试解决路由器层级与策略问题，但该500错误本身尚未有修复PR。
- **OOM Kill问题持续** [#25219](https://github.com/BerriAI/litellm/issues/25219) 在main-v1.82.0-stable之后出现，持续追踪中。

**中严重度**

- **Anthropic向量存储参数被拒** [#23741](https://github.com/BerriAI/litellm/issues/23741) 当请求体含`vector_store_ids`或`vector_store`字段并路由至Anthropic时，API返回400错误。影响使用Anthropic新功能的用户。
- **流式fallback注入错误assistant预填充** [#27967](https://github.com/BerriAI/litellm/issues/27967) 流式中断后，fallback请求会携带`prefix=True`的assistant消息，但Claude Sonnet 4.6/Opus 4.7等目标模型不支持该语法，导致fallback失败。
- **Bedrock managed batch取消失败** [#33986](https://github.com/BerriAI/litellm/issues/33986) `POST /v1/batches/{managed_id}/cancel`对Bedrock批次不支持，返回`LiteLLM doesn't support bedrock for cancel_batch`错误。
- **Azure模型定价条目错误** [#37170](https://github.com/BerriAI/litellm/issues/37170), [#37169](https://github.com/BerriAI/litellm/issues/37169) `model_prices_and_context_window.json`中`azure/gpt-audio-mini-2025-10-06`与`azure/gpt-audio-1.5-2026-02-23`条目存在错误，会影响成本核算准确性。
- **消息日志开关文档错误** [#37143](https://github.com/BerriAI/litellm/issues/37143) 文档引用了不存在的`litellm.turn_on_message_logging`，应为`turn_off_message_logging`，属文档误导。

**低严重度**

- **Bedrock CountTokens不支持新模型** [#37102](https://github.com/BerriAI/litellm/issues/37102) 导致token计数被低估，影响配额与计费准确性。
- **service_tier=priority按默认费率计费** [#37046](https://github.com/BerriAI/litellm/issues/37046) `gpt-4o`等模型在指定`service_tier="priority"`时，响应中正确返回P0但计费按默认费率，存在价格差。

**已修复（今日确认有Fix PR）**

- **rust标志泄漏** 已由 [#37218](https://github.com/BerriAI/litellm/pull/37218) 修复。
- **批处理API返回500错误** `GET /v1/batches`对未知ID返回隐式OpenAI回退并报500，已由 [#37201](https://github.com/BerriAI/litellm/pull/37201) 修复，将正确返回404。
- **批处理API limit参数越界** `GET /v1/batches?limit=0`或`-1`时行为异常，已由 [#37198](https://github.com/BerriAI/litellm/pull/37198) 修复，将按OpenAI parity返回400。
- **/v1/messages缺少优先级限流头** 已由 [#37228](https://github.com/BerriAI/litellm/pull/37228) 修复。
- **Guardrail与Anthropic系统提示词冲突** 由 [#37231](https://github.com/BerriAI/litellm/pull/37231) 修复，解决因guardrail修改leading system rows导致400错误的问题。
- **shadow_eval崩溃** 由 [#37232](https://github.com/BerriAI/litellm/pull/37232) 修复，该问题在复制消息时引发`'tuple' object does not support item assignment`。

### 6. 对应用开发者的意义

- **升级需谨慎，关注预算与稳定性修复**：预算强制绕过是资金安全的高危问题，若您正在使用v1.82.3或依赖该功能，请立即评估此缺陷的影响范围。同时，OOM与自适应路由500问题都可能导致服务中断，建议在官方修复确认后再升级新版本。
- **敏感信息泄露风险**：`/health`接口暴露敏感头信息，务必在公网或非信任环境隐藏该端点，并考虑使用网络策略限制访问。
- **新能力接入机会**：Flux 3视频生成与Amazon Comprehend Medical的支持，为多模态和医疗领域应用提供了新的构建可能性。可通过LiteLLM网关统一接入，复用其日志、监控和成本管理能力。
- **成本核算校正**：多个模型定价条目的修复（如gpt-realtime-2系列、Audio系列）意味着账单数据可能在实际修复前存在偏差。基于这些模型构建应用时，请留意成本分析报告的准确性。
- **对Claude Code用户的提示**：多个与`claude code`相关的llm translation问题（如vector_store_ids、assistant prefill）正在活跃修复中，使用相关功能时如遇400错误，建议跟踪对应Issue进展。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 2026-08-18

## 1. 今日速览

过去 24 小时 Unsloth 的研发重心集中在 Studio/Desktop 的稳定性修复与外部工具链优化上，同时社区对非 NVIDIA 硬件（AMD ROCm / Intel GPU）的支持呼声持续走高。值得关注的 PR 包括修复外部工具调用误触发、无密钥 API 访问选项，以及 llama.cpp 版本解析兼容；稳定性方面，Studio 后端出现 sqlite3 死锁的严重问题，目前尚无修复 PR。

## 2. 版本发布与破坏性变更

过去 24 小时无新版本 release，无 API/配置破坏性变更。

## 3. 新模型与硬件支持

- **Hub 支持非 GGUF 图像/视频模型运行**：PR #8855 修复了 Hub 中 safetensors 格式的图像/视频模型（如 `unsloth/Z-Image-Turbo-unsloth-bnb-4bit`）Run 按钮被禁用的问题，使其与 GGUF 模型获得一致的运行入口。  
  https://github.com/unslothai/unsloth/pull/8855

- **oMLX 模型发现**：PR #8937 为 Studio 增加对 macOS MLX runner（oMLX）模型仓库的扫描支持，使 `~/.omlx/models` 下的模型可被 Studio 自动识别。  
  https://github.com/unslothai/unsloth/pull/8937

- **llama.cpp 语义化版本解析**：PR #9127 适配 llama.cpp 新版 `--version` 输出格式（从纯数字 build 号变为 semver），避免版本比较与预编译判断出错。  
  https://github.com/unslothai/unsloth/pull/9127

- **社区硬件适配反馈**：
  - Intel Arc B580 上 `torch.xpu.memory.mem_get_info()` 调用失败导致导入崩溃（#3533，14 条评论，仍 Open）。  
    https://github.com/unslothai/unsloth/issues/3533
  - Intel GPU 下 Studio 仅支持 Vulkan 后端，用户请求完整 Intel GPU 支持（#8931、#8972）。  
    https://github.com/unslothai/unsloth/issues/8931
  - AMD ROCm 后端无法加载任何模型，疑似 HIP/ROCR 库不匹配（#8998，已有修复 PR #9002）。  
    https://github.com/unslothai/unsloth/issues/8998

## 4. 性能与优化

- **启动性能**：PR #8962 将 pandas 从 Studio 后端启动导入图中移除，消除了 `import main` 链上约 7.3 秒的 pandas 相关开销（`main` 共 7.284s，其中 pandas 链占 2.3s+），可显著缩短 Studio 冷启动时间。  
  https://github.com/unslothai/unsloth/pull/8962

- **显存规划**：PR #9063 将视觉模型的 mmproj 投影层纳入 VRAM 预算计算；若显存不足则自动放置到 CPU，避免加载完成后因投影层额外占用导致溢出。  
  https://github.com/unslothai/unsloth/pull/9063

- **性能回退风险**：Issue #9037 报告长 Qwen3.8 GGUF 对话在模型重载后丢失可复用 prompt 状态，导致每次恢复需约 11 分钟全量 prefill，属于已定位的严重性能缺陷。  
  https://github.com/unslothai/unsloth/issues/9037

## 5. 稳定性与回归

按严重程度排列：

| 严重度 | 问题 | 状态 |
|--------|------|------|
| 🔴 致命 | **Studio 后端死锁**（#9008）：运行数分钟后所有线程阻塞在 `sqlite3.connect()/close()`，进程存活但停止接受任何连接，CPU 占用异常。尚无修复 PR。 | [Open](https://github.com/unslothai/unsloth/issues/9008) |
| 🟠 高 | **Intel Arc B580 导入崩溃**（#3533）：`gpt_oss.py` 调用不支持的 `torch.xpu.memory.mem_get_info()`，`unsloth` 无法在 Arc B580 上 import。无修复 PR。 | [Open](https://github.com/unslothai/unsloth/issues/3533) |
| 🟠 高 | **ROCM 后端全量加载失败**（#8998）：系统 ROCm 与 bundled HIP 库不匹配（`libamdhip64.so.7` 与 `libhsa-runtime64` 版本冲突）。修复 PR #9002 已提交。 | [Issue](https://github.com/unslothai/unsloth/issues/8998) · [PR #9002](https://github.com/unslothai/unsloth/pull/9002) |
| 🟡 中 | **外部工具调用误触发**（#8907）：模型未请求工具时，Studio 偶尔主动“提醒”模型发起工具调用，影响 Agent 交互正确性。修复 PR #9125/#9126 已提交。 | [Issue](https://github.com/unslothai/unsloth/issues/8907) · [PR #9125](https://github.com/unslothai/unsloth/pull/9125) |
| 🟡 中 | **LAN 访问白屏**（#9046 → 修复 #9075）：通过 `http://<LAN-IP>` 访问 Studio Web UI 时，因 `crypto.randomUUID` 在非安全上下文不可用导致白屏。修复 PR 已合入。 | [PR #9075](https://github.com/unslothai/unsloth/pull/9075) |
| 🟡 中 | **长对话重载后 11 分钟 prefill**（#9037）：GGUF 模型重启后丢失复用 prompt 状态，需全量重新 prefill。无修复 PR。 | [Open](https://github.com/unslothai/unsloth/issues/9037) |
| 🟢 低 | **MLX Train/Export 按钮误置灰**（#9120）：macOS 上启动线程竞态导致首次 `transformers` import 未完成时，Train/Export 按钮不可用，属启动时序问题。 | [Open](https://github.com/unslothai/unsloth/issues/9120) |
| 🟢 低 | **外部模型回复模板字符串丢失**（#9098）：流式回复包含 JS/TS 模板字符串时，插值内容被错误截断，已关闭。 | [Closed](https://github.com/unslothai/unsloth/issues/9098) |

**其他值得关注的修复 PR**：
- **工具调用 ID 规范化**（#9116）：外部 provider 对工具调用 ID 长度/字符集有限制（OpenAI 64 字符、Mistral 9 字母数字），PR 将前端生成的 `<providerId>:<uuid4>`（66 字符）规范化为兼容格式。  
  https://github.com/unslothai/unsloth/pull/9116
- **AMD VRAM 统计修复**：PR #8863 与 #8793 分别通过 LUID 匹配 Windows 下 AMD 显卡的 VRAM 计数器，修复 `GPU Adapter Memory\Dedicated Usage` 归因问题。  
  https://github.com/unslothai/unsloth/pull/8863
  https://github.com/unslothai/unsloth/pull/8793

## 6. 对应用开发者的意义

- **无密钥本地 API 访问即将可用**：PR #9102 允许用户选择不启用 API Key 即可访问 Studio 的 OpenAI 兼容端点，与 LM Studio/Ollama 保持一致，可降低本地 Agent 工具链的接入门槛。  
  https://github.com/unslothai/unsloth/pull/9102

- **外部工具调用可靠性提升**：PR #9125/#9126 修复了工具调用误触发和重试上下文丢失问题，并统一了内部 GGUF 与外部 provider 的 nudge 策略；后续还会规范化工具调用 ID，对构建在 Unsloth 之上的 Agent 应用是实质性稳定性提升。  
  https://github.com/unslothai/unsloth/pull/9125  
  https://github.com/unslothai/unsloth/pull/9116

- **滚动上下文窗口保留搜索**：PR #9074 在滚动上下文裁剪时保留被 evict 的 turn 的记录，支持后续搜索追溯。这对长会话 Agent 应用（如 Deep Research）的上下文管理很重要。  
  https://github.com/unslothai/unsloth/pull/9074

- **pip 包体积膨胀引发关注**：Issue #8896 指出自 `unsloth 2026.3.5` 起 pip 包捆绑 Studio，wheel 已达 80 MB（解压 140 MB），对下游依赖方不友好，社区呼吁拆分 core 包。若你使用 `unsloth` 作为 Python 库分发应用，建议持续跟踪该 issue。  
  https://github.com/unslothai/unsloth/issues/8896

- **远程连接方式将更灵活**：社区正在推动 LAN 直连（#8934）与官方 Android 客户端（#8973），同时 PR #9075 已修复 LAN 访问白屏问题，远程使用 Studio Web UI 的方式正逐步完善。  
  https://github.com/unslothai/unsloth/issues/8934  
  https://github.com/unslothai/unsloth/issues/8973

---

**总结**：今日无新 release，但有一批针对 Studio 外部工具调用、LAN 访问、AMD ROCm 的修复 PR 在途。若你正在生产环境中使用 Studio 的 API 或构建 Agent，请重点关注 #9008 的 sqlite3 死锁问题（尚无修复）与 PR #9125 的工具调用修复进展。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*