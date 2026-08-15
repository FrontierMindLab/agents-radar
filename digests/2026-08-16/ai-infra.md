# AI 基础设施日报 2026-08-16

> 生成时间: 2026-08-15 23:00 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施生态横向对比分析报告（2026-08-16）

## 1. 生态全景

当前 AI 基础设施栈的注意力正高度聚焦于 **DeepSeek-V4 系列在生产环境中的正确性收敛**。vLLM、SGLang、llama.cpp 三家引擎几乎同时在为同一模型的稀疏 MLA、长上下文和投机解码路径打补丁，暴露了这类混合架构在上线初期的系统性稳定性缺口。与此同时，**KDA/稀疏 MLA 等“线性注意力 + full attention”混合架构**已明确成为下一代长上下文模型的技术主线——Kimi-K3、GLM-5.2、DeepSeek-V4 变体在三个引擎中并行推进。社区焦点正从“能不能跑”转向“跑得稳不稳、安不安全”：今日各项目共出现数十个正确性/安全类缺陷，其中静默损坏类问题（无报错但输出错误）尤其值得警惕。总体而言，这是一个快速迭代但尚未进入稳定期的生态，**生产部署需主动锁定版本、规避高风险特性组合**。

## 2. 各项目活跃度对比

| 项目 | 版本/Release | PR 动态（今日提及） | 活跃 Issues（今日提及） | 头条动态 |
|------|------------|-------------------|----------------------|----------|
| vLLM | 无正式 Release | ~10 | ~17 | DeepSeek-V4 三平台 P0 崩溃修复、CUDA 13.4 预发布管线、Quark INT4 回归修复 |
| SGLang | 无 Release | ~16 | ~20 | KDA 原生 kernels、DSv4 TRT-LLM 集成、DSA sparse-MLA 超长 prefill 静默失效 |
| llama.cpp | 7 tags（b10436–b10448） | ~17 | ~12 | Kimi-K3 文本模型合入主线、`--load-mode` 破坏性 CLI 变更 |
| Ollama | v0.32.14-rc0 | ~10 | ~16 | Qwen3.8 系统消息位置 500 错误（影响 Claude Code/Agent 场景） |
| LiteLLM | 无 Release | ~10 | ~20 | 3 个安全问题当日提交当日关闭、Ollama `api_base` 忽略导致 ~8s 超时 |
| Unsloth | 无 Release | ~16 | ~15 | Studio 稳定性修复、`max_steps` 训练预处理 6 倍提速、tool-call 串流修复 |

> 注：PR/Issue 数量为各项目日报中明确提及的条目数，非 GitHub 全量数据。发布频率上 llama.cpp 最高（日更 7 tag），Ollama 有 RC 候选，其余四项均无新 Release。

## 3. 模型支持竞速

| 模型/架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------|------|--------|-----------|--------|---------|---------|
| **Kimi-K3**（Hybrid KDA + MLA） | —— | KDA 原生 kernels（#34946、#34299）+ AITER kernel 适配（#34837） | ✅ **主线支持**（b10448，#26185） | —— | —— | —— |
| **GLM-5.2** 稀疏 MLA | TurboQuant 稀疏 MLA 后端（#52472） | —— | —— | 入库请求（#17741） | —— | —— |
| **DeepSeek-V4** 系列 | H20/H100/ROCm 多项 P0 修复 | TRT-LLM 集成（SM100/103）、DSPARK 适配 | SWA KV-cache 问题 | 本地支持请求（#17510、#17775） | —— | —— |
| **Diffusion 原生支持** | —— | Hunyuan3D Paint/Delight（#34980） | —— | —— | —— | —— |
| **Embedding 新模型** | —— | —— | —— | —— | voyage-code-4 / voyage-4（#36820、#35091） | —— |

**结论**：llama.cpp 在新架构合入上最快（Kimi-K3 已进主线）；vLLM 与 SGLang 在商用模型生产化路径上竞争，SGLang 在 KDA 集成和 TRT-LLM 上更激进，vLLM 在 DeepSeek-V4 稳定性修复上投入最大；Ollama/LiteLLM 依赖上游引擎，模型支持节奏相对滞后，但 LiteLLM 正快速补齐嵌入模型 API 兼容。

## 4. 性能优化前沿

优化火力集中在五个方向：

**① KV cache 分层与量化**
- vLLM：KV 分层卸载新增饱和检测与级联中断（#50045）
- llama.cpp：混合 K/V 量化类型以启用 flash attention（#27150，修复 CPU 回退）；小 KV quant prefill 回退修复（#27140）
- Unsloth：张量并行下量化 KV cache 被静默丢弃的修复（#8939）

**② 量化内核与数据布局**
- vLLM：ROCm gfx942 稀疏注意力索引器切换原生 FP8 MFMA（#52402）；PTX 9.4 `ldmatrix.s8.s4` INT4→INT8 硬件符号扩展（#49529）
- SGLang：compressed-tensors NVFP4 下沉到 Marlin 路径，覆盖 SM80-SM90（#34966）
- llama.cpp：SYCL Q4_K 多列 MMVQ 消冗余（#27062）；CUDA 低 bit KV quant prefill 回退（#27140）

**③ 算子融合与 zero-copy**
- SGLang：GDN 验证路径避免 QKV 物化（#33778）；KDA zero-copy prefill checkpoints + packed decode（#34299）
- vLLM：DSv4 自适应 C128A 元数据打包（#51318）
- llama.cpp：Vulkan Intel Xe coopmat 矩阵乘优化（#25380）

**④ 投机解码与调度**
- vLLM：异步调度新增 suffix GPU drafter（#52097）
- llama.cpp：server 端 yield_to_queue 线程模型重构，#24431 自动加载 MTP 模型
- SGLang：DSpark NPU 折叠路径修复 + 优化（#34944）

**⑤ 训练/运行时效率**
- Unsloth：`max_steps` 训练跳过全量数据集预处理，实测省约 10 分钟（#8890）
- Ollama：消除每请求约 300ms 的模型 manifest 读取开销（#16161）
- SGLang：benchmark 启动改 spawn 避免 CUDA 父进程冲突（#34712）

## 5. 分层定位差异

| 层级 | 项目 | 定位 | 核心关注点 |
|------|------|------|-----------|
| **推理引擎层** | vLLM / SGLang | 生产级多卡高吞吐部署，DeepSeek-V4 等大模型主力战场 | 长上下文正确性、量化、多卡并行、投机解码、CUDA/ROCm 双栈覆盖 |
| **本地运行时层** | llama.cpp / Ollama | 单机/桌面/边缘推理，CPU + 消费级 GPU | 模型格式兼容（GGUF）、后端多样性（Vulkan/SYCL/Metal）、CLI 与 server 易用性 |
| **网关/控制面层** | LiteLLM | 多模型聚合、安全、计费、协议转换、路由 | 认证授权、预算/计费一致性、provider 兼容与安全边界 |
| **训练/微调层** | Unsloth | QLoRA/量化微调、GGUF 导出，正演化出本地 Agent 工作台（Studio） | 训练效率、量化正确性、产品化体验（工具调用、模型发现） |

**关键交叉**：llama.cpp 与 Ollama 是同一技术栈的两层封装（Ollama 构建于 llama.cpp 之上，前者取 API 友好，后者取嵌入/库形态）；Unsloth 向上游引擎输出 GGUF 模型，vLLM/SGLang/llama.cpp 则消费这些产物，形成“微调 → 发布 → 部署”的生态闭环。

## 6. 值得关注的趋势信号

**① DeepSeek-V4 是当前生产稳定性的“风暴中心”**
vLLM 在 H20/ROCm/H100 三平台均有 P0 崩溃或静默损坏（#52339/#52109/#51743）；SGLang 的 DSPARK 会静默产出损坏输出（#34959），DSA sparse-MLA 单次 extend 超 65535 tokens 时 attention 静默失效（#34947/#34941）；llama.cpp 出现 SWA KV-cache 耗尽崩溃（#25452）。**建议：生产环境固定已知良好版本并关闭高风险特性（超大 batch、DSPARK、超长单次 prefill），等待官方修复镜像。**

**② 投机解码是事故高发区，需按场景审慎启用**
今日跨项目出现了 liveness 问题（vLLM EngineCore livelock #49210）、正确性问题（llama.cpp 量化目标下贪婪不一致 #25618、SGLang DGVPARK 静默损坏 #34959）、性能回退（Unsloth MTP 慢 2 倍 #17776）、崩溃（SGLang #34920/#34974）。**建议：在没有明确 benchmark 收益的负载上默认关闭，开启时单独灰度验证。**

**③ Agent 工具调用成为跨层“契约薄弱面”**
同日四个项目出现工具调用相关回归：Ollama qwen3.8 系统消息位置 500（#17774）、vLLM Gemma4 强制 tool_choice 被忽略（#50477）、SGLang Kimi-K3 解析器约 8 次/小时高频失败（#34604）、Unsloth tool-call delta index 重置导致参数串流错乱（#8734）。**建议：基于 Agent 的应用应对目标引擎做工具调用的专项回归测试，避免跨版本升级此功能。**

**④ 安全在网关层成为刚需**
LiteLLM 当日收到并关闭 3 个安全漏洞报告：默认无认证（`LITELLM_MASTER_KEY` 未设置）、client-supplied api_base 导致 SSRF/Key 泄露、非管理员可自提预算。**建议：检查 LiteLLM 部署的 master key、SSRF guard 和预算提升接口的默认行为——这三个攻击面已有真实利用路径。**

**⑤ 混合线性注意力（KDA/稀疏 MLA）是下一个架构主线**
llama.cpp 合入 Kimi-K3、vLLM 扩展 GLM-5.2 稀疏 MLA、SGLang 为 KDA 构建 zero-copy 内核——三个引擎在同一个方向同步投入。长上下文能力正从“加长 RoPE”切换到“换架构”。**建议：应用开发者应提前了解 KDA/稀疏注意力模型的推理特性（如对 chunking 的依赖、投机解码兼容性），为选型切换做准备。**

**⑥ 量化“能跑”到“正确且快”仍有距离**
NVFP4（SGLang #34966）和 Quark INT4（vLLM #52474）均在推进，但 vLLM 的 FP8 block-scaled 在 SM120 上仍失败（#51884），llama.cpp 的 4-bit KV cache 在 prefill 上崩塌至 ~34 t/s（#27109），SGLang 的 FP8 `lm_head.weight_scale` 被静默丢弃导致输出退化（#34895）。**建议：量化模型的正确性验证（重复输出、logits 对比）应纳入上线前检查清单。**

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 动态日报 · 2026-08-16

## 今日速览

今日动态围绕 **DeepSeek-V4 密集故障修复**、**CUDA 13.4 预发布 CI 管线**及 **Quark INT4 量化回归修复** 三条主线展开：ROCm 侧已提交面向 gfx942 的稀疏注意力索引器 FP8 优化，同时多个 DeepSeek-V4 在 H20/H100/ROCm 上的高优先级正确性缺陷仍待收敛。值得注意的是一批围绕 Mamba/混合架构与 EAGLE 投机解码的修复 PR 正在快速推进。

## 版本发布与破坏性变更

- **无正式 Release**：过去 24 小时无新版本发布，但以下变更需关注。
- **[PR #52379] CUDA 13.4 预发布镜像管线**：新增针对 Rubin（sm_107）的 CUDA 13.4rc1 预发布构建路径，配套固定 CUDA 13.4 的 PyTorch 等 nightly 版本，为下一代硬件提前铺路。 → https://github.com/vllm-project/vllm/pull/52379
- **[Issue #51758] 0.26.0 → 0.27.0 升级后 DeepSeek-V4-Flash 报错**：用于生产环境的 DeepSeek-V4 用户需谨慎升级，该问题有 18 条评论且仍开放。 → https://github.com/vllm-project/vllm/issues/51758

## 新模型与硬件支持

- **[PR #52472] GLM-5.2 TurboQuant 稀疏 MLA 后端**：扩展 TurboQuant MLA 路径，支持 GLM-5.2 稀疏注意力，包含密集 4-bit latent KV 存储、融合稀疏 decode/prefill、MoE MTP 以及 DCP/PP 正确性修复。 → https://github.com/vllm-project/vllm/pull/52472
- **[PR #47779] SM120（RTX 5090）FlashInfer 稀疏 MLA 启用 DCP**：为 Blackwell 消费级 GPU 的稀疏 MLA decode 补齐 decode context parallelism 支持。 → https://github.com/vllm-project/vllm/pull/47779
- **[Issue #51884] FP8 block-scaled 权重在 sm120 上失败**：DeepGEMM 在权重加载阶段报 `Unknown SF transformation`，说明针对 RTX 5090 的 FP8 支持仍未完备。 → https://github.com/vllm-project/vllm/issues/51884
- **[Issue #52181] FA2 在 sm_86（Quadro RTX 8000）不可用**：加载 Qwen3.6-27B 时因 FlashAttention-2 计算能力门槛直接报错，项目将其标记为 feature request 开放中。 → https://github.com/vllm-project/vllm/issues/52181

## 性能与优化

- **[PR #52402] ROCm gfx942 稀疏注意力索引器 FP8 优化**：将 `fp8_mqa_logits` 的 gfx942 路径切换为原生 FP8 MFMA，并修正 LDS occupancy 门控，预期改善 MI300X/MI325X 上 DeepSeek-V4 稀疏注意力索引阶段性能。 → https://github.com/vllm-project/vllm/pull/52402
- **[Issue #49529] PTX 9.4 `ldmatrix.s8.s4` 硬件 INT4→INT8 扩展加载**：建议在 W4A8-INT8 路径采用 PTX ISA 9.4 新指令实现共享内存矩阵加载期间的符号扩展，减少显存与指令开销。 → https://github.com/vllm-project/vllm/issues/49529
- **[PR #50045] KV 分层卸载背压检测**：为磁盘/共享存储/P2P 等次级 KV 卸载层增加饱和检测与级联中断，避免慢存储拖垮整个引擎。 → https://github.com/vllm-project/vllm/pull/50045
- **[PR #52097] 异步调度支持 suffix GPU drafter**：为 CPU 侧 suffix drafter 增加 GPU 实现，以在 agentic/重复性流量中恢复 CPU/GPU 重叠收益。 → https://github.com/vllm-project/vllm/pull/52097

## 稳定性与回归

按严重程度排列。标注 `[fix PR]` 的条目已有对应修复提交。

**P0 - 引擎悬挂/死锁**

- **[Issue #49210] EngineCore livelock（100% CPU，无崩溃）**：MTP 投机解码 + xgrammar 结构化输出组合触发，为 v0.24.0 以来的回归，6 条评论，仍开放。 → https://github.com/vllm-project/vllm/issues/49210
- **[Issue #52247] EngineCore 永久阻塞**：GPU kernel 永不终止时 `synchronize()` 无超时兜底，导致引擎完全挂死。 → https://github.com/vllm-project/vllm/issues/52247

**P0 - 模型正确性/崩溃**

- **[Issue #52109] ROCm gfx942 上 DeepSeek-V4-Flash 静默检索损坏**：输入超过约 4-5k tokens 时 AITER 稀疏索引器产生错误结果，8×MI325X 环境复现。 → https://github.com/vllm-project/vllm/issues/52109
- **[Issue #52339] H20 TP8 上 DeepSeek-V4 FlashMLA 稀疏 prefill 崩溃**：约 161K context 时 `phase1.cuh:614` 触发，v0.26.0 + w4a16 镜像。 → https://github.com/vllm-project/vllm/issues/52339
- **[Issue #51743] H100 TP4 上 DeepSeek-V4-Flash 崩溃**：`--max-num-batched-tokens >= 24576` 时 fused qnorm/rope/kv-insert 算子导致 EngineCore crash，且分配对内存 profiler 不可见。 → https://github.com/vllm-project/vllm/issues/51743

**P1 - 功能回归**

- **[Issue #50477] Gemma4 命名强制 tool_choice 被静默忽略**：v0.26.0 回归，0.21.0 正常，对依赖工具调用的 Agent 有实际影响。 → https://github.com/vllm-project/vllm/issues/50477
- **[Issue #43338] grammar-mask 投机解码对多 token 推理边界失效**：#36138 只修复了单 token（如 Qwen3 `</think>`），gpt-oss 仍出现推理内容泄漏；Qwen3 正常。 → https://github.com/vllm-project/vllm/issues/43338
- **[Issue #38488] `reasoning_content` 在传入 assistant 消息时被丢弃**：`chat_utils.py` 只读取 `reasoning` 键，不回退 `reasoning_content`，对需要多轮推理上下文的应用有影响。 → https://github.com/vllm-project/vllm/issues/38488

**P1 - 启动/加载崩溃**

- **[Issue #52317] Mamba cache 'all' 模式 + DSPark 投机解码启动崩溃**：`prev_last_scheduled_idx` 未被传递，已有修复 `[PR #52460]`（回退至 align 模式）。 → https://github.com/vllm-project/vllm/issues/52317 · https://github.com/vllm-project/vllm/pull/52460
- **[Issue #52454] Qwen3.8 Quark INT4 加载失败（ROCm）**：新 Quark 配置中的结构化列表导致 `WeightsMapper` 解析失败，已有修复 `[PR #52474]`（保留结构化量化配置列表）。 → https://github.com/vllm-project/vllm/issues/52454 · https://github.com/vllm-project/vllm/pull/52474
- **[Issue #52434] `ParallelLMHead` 缺少 `output_size_per_partition`**：新报障，暂无 fix PR。 → https://github.com/vllm-project/vllm/issues/52434
- **[Issue #52300] `libcudart.so.13` 缺失**：CUDA 12.6 + PyTorch 2.11 环境安装 vllm 0.21.0 后 import 报错，属 CUDA 运行时版本匹配问题。 → https://github.com/vllm-project/vllm/issues/52300

**P2 - 特定配置问题**

- **[Issue #52410] Gemma4 parser 的 `enable_thinking` 默认值与聊天模板不一致**：parser 默认 true，而模板默认 false，易导致行为不一致。 → https://github.com/vllm-project/vllm/issues/52410
- **[PR #51318] DSv4 自适应 C128A 元数据打包回退**：修复 CUDA graph 重放时运行时布局与 capture 布局不一致的问题。 → https://github.com/vllm-project/vllm/pull/51318

## 对应用开发者的意义

1. **DeepSeek-V4 系列用户需保持谨慎**：H20/H100/ROCm 平台均有严重缺陷，涉及长上下文、大 batch 或稀疏解码；建议固定版本、避免开启超大 `--max-num-batched-tokens`，并等待官方修复镜像。
2. **投机解码 + 结构化输出组合风险高**：livelock（#49210）与 grammar 泄漏（#43338）都发生在该组合路径上；生产环境如需二者同时开启，先在小流量下验证。
3. **多模态/工具调用回归影响 Agent**：Gemma4 强制 tool_choice 失效（#50477）会直接导致 agent 无法按预期路由；遇到该问题是升级引入的回归，可暂时回退 v0.21.0。
4. **`reasoning_content` 字段兼容性**：若你的应用传递 assistant 历史消息给 vLLM，需确认消息使用 `reasoning` 字段而非 `reasoning_content`，否则推理内容会在多轮对话中丢失。
5. **Quark INT4 加载失败可跟踪 #52474**：使用新版 Quark 配置的用户等待该修复合入即可解决。
6. **Gemma4 视频/帧处理已修**：CI 中发现的视频帧计数问题已有修复（#52441），影响视频理解类的多模态调用。
7. **EAGLE 前缀缓存修复中**：长对话 + EAGLE 投机解码用户可关注 #52419，修复 partial-hash-hit 路径下的 cache 注册问题。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 动态日报 — 2026-08-16

> 数据源：github.com/sgl-project/sglang | 覆盖时段：2026-08-15 过去 24 小时

## 1. 今日速览

今日无新版本发布，PR 侧聚焦 KDA（Kimi-Linear/Cake kernels）、DSv4 TRT-LLM 集成和 Diffusion 原生模型支持。稳定性方面，DSPARK 在 DeepSeek-V4-Flash 上的静默输出损坏、DSA sparse-MLA 超长 prefill 静默失效，以及 Kimi-K3 工具解析器高频故障构成主要风险点，其中前两者均无 fix PR，建议生产环境主动规避。

## 2. 版本发布与破坏性变更

- 无新 Release。
- **[#34916] 内部信号重命名**：将 `WAR` read-done fastpath 重命名为 `shared-read-done`，避免与 write-after-read hazard 命名混淆；纯改名，无外部行为变化。链接：https://github.com/sgl-project/sglang/pull/34916
- **[#34870] SWA eviction 边界修复**：修复混合 SWA 模型 + EAGLE 投机解码 + 默认开启的 pool 释放 flag（#34653）导致的 pool 内存泄漏崩溃；涉及 LRU 淘汰逻辑变更，使用 SWA/混合缓存路径的用户建议关注。链接：https://github.com/sgl-project/sglang/pull/34870
- **[#34712] benchmark 启动方式变更**：benchmark 服务器进程由 fork 改为 spawn，避免父进程已初始化 CUDA/XPU 导致的问题；运行 `sglang.benchmark.*` 脚本的用户需注意。链接：https://github.com/sgl-project/sglang/pull/34712

## 3. 新模型与硬件支持

- **[#34946] KDA：Kimi-Linear 路由至原生 Cake kernels**：依赖 #34299 与 FlashInfer #4535，Cake prefill 直接消费 SGLang 的 post-convolution Q/K/V、raw gate 与 beta 张量，消除中间拷贝。链接：https://github.com/sgl-project/sglang/pull/34946
- **[#34299] KDA：zero-copy native prefill checkpoints + packed decode**：为 Blackwell 原生内核提供 checkpoint 级 KDA 服务面，配套 FlashInfer #4445。链接：https://github.com/sgl-project/sglang/pull/34299
- **[#34980] Diffusion：原生 Hunyuan3D Paint/Delight 模型**：替换 Diffusers 自有模块为 SGLang 原生实现，新增 SD 2.1 兼容 UNet、Paint UNet 与 VAE 配置，保持 checkpoint 键兼容。链接：https://github.com/sgl-project/sglang/pull/34980
- **[#34837] AMD：Kimi K3 启用 AITER prefill kernel**：新增 `concat_and_cast_mha_k_pad_kernel` 支持 12-head 模型。链接：https://github.com/sgl-project/sglang/pull/34837
- **[#34645] AMD：ROCm 7.2 nightly 新增 GPT-OSS 性能基准**：补齐 AMD 侧 GPT-OSS 吞吐覆盖。链接：https://github.com/sgl-project/sglang/pull/34645
- **[#34966] 量化：compressed-tensors NVFP4 支持 Marlin 路径**：使 SM80-SM90 GPU 可用 NVFP4，并支持 BF16 基模型与 DSpark。链接：https://github.com/sgl-project/sglang/pull/34966
- **[#34918] 社区验证单元**：Qwen3.8-27B + RTX 6000 + NVFP4 + balanced/single 组合已验证。链接：https://github.com/sgl-project/sglang/issues/34918

## 4. 性能与优化

- **[#33778] GDN 目标验证避免 QKV 物化**：`causal_conv1d_update` 已产出 packed QKV，此 PR 移除每层多余的 `fused_qkv_split_gdn_prefill_kernel` copy。链接：https://github.com/sgl-project/sglang/pull/33778
- **[#34944] DSpark NPU 折叠路径修复 + 优化**：修复数值与图回放一致性问题，优化后吞吐/接受率优于 all-disabled 路径。链接：https://github.com/sgl-project/sglang/pull/34944
- **[#34722] NPU：LTX-2/2.3 推理优化**：针对昇腾 NPU 的算子级调优。链接：https://github.com/sgl-project/sglang/pull/34722
- **进行中**：[#30805] TRT-LLM DSv4 Attention 集成（SM100/103，high priority）；[#33237] DSv4 --dsa-topk-backend flashinfer fused top-k。链接：https://github.com/sgl-project/sglang/pull/30805 、 https://github.com/sgl-project/sglang/pull/33237
- **路线图**：[#21788] Context Parallelism 2026 Q3 仅覆盖部分模型/后端（DSA、MHA/GQA + FA3），尚未泛化；[#20415] Unified Hybrid Radix Cache 重构推进中，参考 LMSYS 博客。链接：https://github.com/sgl-project/sglang/issues/21788 、 https://github.com/sgl-project/sglang/issues/20415
- **性能警示**：[#24488] H200 + Mooncake 下 PD 分离在 32k/512 负载无吞吐收益，部署 PD 前建议先用自身负载验证。链接：https://github.com/sgl-project/sglang/issues/24488

## 5. 稳定性与回归

### 静默错误（无报错，输出错误）

- **[#34959] DSPARK 在 DeepSeek-V4-Flash 上静默损坏标识符**：使投机解码输出不可信。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34959
- **[#34947] / [#34941] DSA sparse-MLA prefill 超长静默失效**：单次 extend > 65535 tokens 时 trtllm-gen `gridDim.z` 溢出，attention kernel 完全不执行且不报错（SM100）。建议对 DSA prefill 强制 chunking。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34947 、 https://github.com/sgl-project/sglang/issues/34941

### 崩溃与生产故障

- **[#34920] Kimi K3 decode 侧确定性崩溃**：PD + DCP（--dcp-size 8）+ DSPARK 组合下，首轮 target-verify 在 `dcp/planner.py` 触发 `cumsum(extend_prefix_lens=None)` TypeError。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34920
- **[#34719] scheduler 进程崩溃**：`token_ids_logprob` 请求与普通请求混跑时抛 `'list' object has no attribute 'tolist'`，影响 v0.5.14–v0.5.17，单请求可拖垮整个服务。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34719
- **[#34604] Kimi-K3 工具解析器生产高频失败**：24 小时内约 190 次解析错误（106x `string indices must be integers` + json 解析失败），约 8 次/小时。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34604
- **[#34974] --enable-eplb + DSPARK 崩溃**：draft CUDA graph 捕获时 `scatter_add_` 维度不匹配（layer_idx=None）。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34974
- **[#34943] / [#34942] by-stage profiler 冻结服务器约 25 秒**：投机解码下 TARGET_VERIFY 被误判为 prefill，stop 条件泄漏到后续无关请求，同步 trace 导出阻塞调度线程。无 fix PR。链接：https://github.com/sgl-project/sglang/issues/34943 、 https://github.com/sgl-project/sglang/issues/34942

### 其他已报告 Bug（无 fix PR）

- [#34972] HiCache host-pool 内存检查忽略 HugePages 保留 → 误报 `Not enough host memory`。链接：https://github.com/sgl-project/sglang/issues/34972
- [#34969] HF3FS HiCache 在 DeepSeek-V4 逻辑 KV anchor 下 ZeroDivisionError。链接：https://github.com/sgl-project/sglang/issues/34969
- [#34927] Responses API 中 `function_call_output` 的 `input_image` parts 未转换为 `image_url`，导致 400 或静默丢弃。链接：https://github.com/sgl-project/sglang/issues/34927
- [#34895] compressed-tensors FP8 `lm_head.weight_scale` 被静默丢弃，Qwen3.8-27B-NVFP4 出现退化重复输出。链接：https://github.com/sgl-project/sglang/issues/34895
- [#34902] MiniMax-H3 resident serving 每 rank 在 host RAM 完整暂存 DiT checkpoint（2 ranks 114.3 GiB，4 ranks 233.5 GiB）。链接：https://github.com/sgl-project/sglang/issues/34902

### 已有修复 PR

- [#34954] → **#34978**：MiniMax-H3 `quality="high"` 审计门缺少 adapter 字段，无法拦截 Turbo-LoRA 合并权重，PR 已提交。链接：https://github.com/sgl-project/sglang/pull/34978
- [#34870]：SWA eviction frontier 根因修复（见第 2 节）。链接：https://github.com/sgl-project/sglang/pull/34870

### 已关闭（inactive）

- [#26324] flashinfer_trtllm MoE 损坏 MiniMax-M2.7-NVFP4 输出、B200 上 DeepSeek-V4-Flash 断言；关闭。链接：https://github.com/sgl-project/sglang/issues/26324
- [#28011] EAGLE Spec V2 + DSA + HiCache 间歇性 NCCL hang；关闭。链接：https://github.com/sgl-project/sglang/issues/28011
- [#34389] Diffusion attention backend fallback 变更引入错误；已修复关闭。链接：https://github.com/sgl-project/sglang/issues/34389

## 6. 对应用开发者的意义

- **Agent/工具调用可靠性**：Kimi-K3 `kimi_k3` 解析器在流式边界高频失败（#34604、#31915），生产 Agent 建议在应用层加解析兜底，或对工具调用请求走非流式输出。链接：https://github.com/sgl-project/sglang/issues/34604 、 https://github.com/sgl-project/sglang/issues/31915
- **共享服务稳定性**：#34719 表明单个带 `token_ids_logprob` 的请求可崩溃整个 scheduler；多租户网关后建议对该参数做请求级校验并考虑进程级隔离。链接：https://github.com/sgl-project/sglang/issues/34719
- **投机解码选型**：#34959 显示 DSPARK 在 DeepSeek-V4-Flash 上会产生静默错误输出，LLM 网关/控制面应避免对该模型启用 DSPARK。链接：https://github.com/sgl-project/sglang/issues/34959
- **长上下文服务**：DSA sparse-MLA 模型单次 extend > 65535 tokens 会静默丢失 attention（#34947/#34941），建议在网关层设置请求分块或限制单次 prefill 长度。
- **PD 传输层**：#33861 正在统一 mooncake/nixl/mori 的传输控制协议，配套 #34977 补上 `is_dummy` 真值表测试；已投资自定义 PD 后端的团队应关注后续兼容性。链接：https://github.com/sgl-project/sglang/issues/33861 、 https://github.com/sgl-project/sglang/pull/34977
- **模型网关可观测性**：#34976 在 SMG 响应中暴露 worker ID，便于诊断多请求 Agent 会话的 worker 亲和性。链接：https://github.com/sgl-project/sglang/pull/34976
- **资源规划**：MiniMax-H3 非 FSDP 路径每 rank 约需 57–58 GiB host RAM 用于暂存 DiT checkpoint（#34902），低于该余量会静默 SIGKILL，部署前需做容量评估。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-16

## 1. 今日速览

今日发布节奏密集（b10436–b10448，共 7 个 tag），核心看点有三：其一，主线支持了 Kimi-K3 文本模型（Hybrid KDA + MLA attention 架构），是本周最具分量的模型侧更新；其二，server 端对 yield_to_queue 线程模型做了重新设计，投机解码流程改为在 worker 线程中执行，可能影响调度行为；其三，`--mmap`/`--no-mmap`/`--mlock`/`--direct-io` 被统一迁移至 `--load-mode`，属于破坏性 CLI 变更，脚本用户需留意。Bug 侧，Vulkan/SYCL 后端仍有数个高热度回归问题（DeviceLost、A770 崩溃、性能下降）悬而未决。

## 2. 版本发布与破坏性变更

- **b10448 — Kimi-K3 text model 合入主线**（#26185）。K3 基于 Hybrid KDA（linear）+ MLA（full）attention，并引入 cross-layer residual attention（`attn_res_block_size`）和 latent MoE。模型侧新增支持，无运行时破坏。
  https://github.com/ggml-org/llama.cpp/pull/26185

- **b10447 — server 端 yield_to_queue 线程模型重新设计**（#27133）。`common_speculative_process` 移入 worker 线程执行，主线程与 worker 线程职责对调。对 server 的并发调度、speculative decoding 延迟特性有影响，建议关注其后续行为变化。
  https://github.com/ggml-org/llama.cpp/pull/27133

- **b10441 — 弃用的内存映射 flags 迁移至 `--load-mode`**（#26934）。`--mmap`、`--no-mmap`、`--mlock`、`--direct-io` 被统一为 `--load-mode` 参数，涉及 scripts、examples 和文档同步更新。**这是破坏性 CLI 变更**，现有脚本中的旧 flags 将不再生效（内部 warning 已添加）。
  https://github.com/ggml-org/llama.cpp/pull/26934

- **b10444 — `--models-dir` 支持自动加载 MTP assistant 模型**（#24431）。在预设目录下按严格前缀匹配 MTP 模型，兼容多种 draft 类型（已移除 eagle3）。
  https://github.com/ggml-org/llama.cpp/pull/24431

- **b10443 — 读取 GGUF array 前增加类型检查**（#27075）。防止畸形 GGUF 文件触发未定义行为，属于健壮性修复。
  https://github.com/ggml-org/llama.cpp/pull/27075

- **b10446 — BoringSSL 更新至 0.20260813.0**（#27099）。供应商依赖更新，无预期 API 变化。
  https://github.com/ggml-org/llama.cpp/pull/27099

## 3. 新模型与硬件支持

- **Kimi-K3 文本模型**（b10448，#26185）：已合入主线。支持 Hybrid KDA + MLA attention、cross-layer residual attention 和 latent MoE。
  https://github.com/ggml-org/llama.cpp/pull/26185

- **MiniMax-Text-01 / MiniMax-M1**（b10437，#27018）：新增 `MiniMaxText01ForCausalLM` 和 `MiniMaxM1ForCausalLM` 支持，同时处理了 embedding 零值 logits mask。
  https://github.com/ggml-org/llama.cpp/pull/27018

- **Maple 20B-A1B 三元 MoE 架构（CPU）**（PR #27000，进行中）：DeepGrove 的 256 专家（8 active）ternary MoE，TQ1_0/TQ2_0 量化，SWA 与 global attention 3:1 交错。尚未合入，但值得关注。
  https://github.com/ggml-org/llama.cpp/pull/27000

- **TML Inkling 架构**（PR #25731，进行中）：新增 safetensors-to-GGUF 转换器、graph build 和确定性 kernel（含 banded attention kernel），针对大 MoE 使用 int64 索引。
  https://github.com/ggml-org/llama.cpp/pull/25731

- **ROCm Docker 构建升级至 7.14.0**（PR #27145，进行中）：基础镜像切至 Ubuntu 26.04，新增 gfx9xx 系列支持，并绕过 "no usable GPU found" 问题。
  https://github.com/ggml-org/llama.cpp/pull/27145

## 4. 性能与优化

- **Vulkan：Intel Xe coopmat 矩阵乘优化**（b10442，#25380）。为 coopmat1 mul_mm 增加 `SHMEM_STRIDE_PAD`/`APPLY_SLM_A_RESHAPE`，并修正 shared memory 估算与 cacheline 对齐。
  https://github.com/ggml-org/llama.cpp/pull/25380

- **CUDA：允许 flash attention 中混合 K/V 量化类型**（PR #27150，进行中）。当前若 `-ctk`/`-ctv` 类型不一致，CUDA 会静默关闭 flash attention 并回退 CPU，prefill 可慢约 30 倍。该 PR 解除此限制。
  https://github.com/ggml-org/llama.cpp/pull/27150

- **SYCL：Q4_K 多列 MMVQ 减少冗余计算**（PR #27062，进行中）。针对 DFlash 上 Q4 比 Q8/FP16 更慢的问题，消除目标列中重复的 Q4_K 权重重建。
  https://github.com/ggml-org/llama.cpp/pull/27062

- **CUDA：小 KV quant 在 prefill 中的性能回退修复**（PR #27140，进行中）。Q8 正常但低 bit quant 在 prefill 中明显变慢，该 PR 针对性地恢复了小 KV quant 的 prefill 性能。
  https://github.com/ggml-org/llama.cpp/pull/27140

- **SYCL：quantized KV decode 启用 TILE kernel**（PR #26689，进行中）。在 Battlemage 上 TILE kernel 全面优于 VEC kernel：Qwen3.6-35B、Gemma 4 26B/12B 在 32K/118K 上下文下实测 **+42% ~ +169%** decode 提升，无回退。
  https://github.com/ggml-org/llama.cpp/pull/26689

- **Vulkan：0↔2 置换的 tiled transpose**（PR #26585，进行中）。修复 `ggml_cont(ggml_permute(x, 2, 1, 0, 3))` 回退到逐元素 strided copy 的低效路径。
  https://github.com/ggml-org/llama.cpp/pull/26585

## 5. 稳定性与回归

按严重程度排列。标注 ✅ 表示已有对应 fix PR（含进行中）。

- **SYCL 在 Intel A770 上完全崩溃**（#27063，OPEN，15 评论）。A770 上任意模型崩溃，B60 正常，指向 SYCL 后端近期回归。
  https://github.com/ggml-org/llama.cpp/issues/27063

- **Vulkan DeviceLostError on Linux 7.x（RADV_STRIXHALO）**（#25664，OPEN，21 评论）。Strix Halo + DeepSeek-V4-Flash/Qwen-3.x 复现，影响面较大。
  https://github.com/ggml-org/llama.cpp/issues/25664

- **DSV4-Flash SWA KV-cache 耗尽导致崩溃/卡死**（#25452，OPEN，12 评论）。churned-reuse 场景下 SWA KV-cache 被迅速耗尽。
  https://github.com/ggml-org/llama.cpp/issues/25452

- **server 强制全量 prompt 重处理（SWA/recurrent memory error）**（#21831，OPEN，52 评论，28 👍）。最高热度 issue：后续请求无法复用 KV-cache，持续未修复。
  https://github.com/ggml-org/llama.cpp/issues/21831

- **Vulkan 性能回退（RX 6600）**（#24066，OPEN，40 评论）。近期构建在 AMD Vulkan 上性能下降，尚未定位。
  https://github.com/ggml-org/llama.cpp/issues/24066

- **SYCL MUL_MAT_ID prefill 路径输出错误**（#25455，OPEN，13 评论）。Battlemage G31 上 MoE 模型 prefill 数值错误（误差 0.3–1.9），影响 MoE 模型。
  https://github.com/ggml-org/llama.cpp/issues/25455

- **Glimmer Q8_0 多 GPU tensor split 断言失败**（#26902，OPEN，7 评论）。4×Tesla T10 上 `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)` 崩溃。
  https://github.com/ggml-org/llama.cpp/issues/26902

- **投机解码（draft-mtp/draft-dspark）在量化目标上 greedy 输出不一致**（#25618，OPEN，10 评论）。量化目标下投机解码与贪婪解码结果不同，bf16 目标一致。属于正确性回归。
  https://github.com/ggml-org/llama.cpp/issues/25618

- **Qwen 27B（3.6/3.8）Vision 在 AMD AI Max 上不工作**（#27124，OPEN，8 评论）。Vulkan + Ryzen AI MAX+ 395。

- **Windows AOCL BLAS 编译失败**（#25413，OPEN，14 评论）。AOCL 作为 BLAS vendor 时链接失败，OpenBLAS 正常。
  https://github.com/ggml-org/llama.cpp/issues/25413

- **4-bit KV cache（q4_0/q4_1）导致 prefill 崩塌至 ~34 t/s**（#27109，OPEN，3 评论）。RTX 3090 + Qwen3.5 hybrid 模型，MMQ guard 通过但性能急剧下降。与 PR #27140 直接相关，可跟踪该 PR 的修复进展。
  https://github.com/ggml-org/llama.cpp/issues/27109

- **Windows Defender 误报 b10195 病毒**（#26343，OPEN，10 评论）。属于发布物误报问题，非代码缺陷。

## 6. 对应用开发者的意义

- **CLI 迁移提醒**：`--mmap`/`--no-mmap`/`--mlock`/`--direct-io` 已废弃，请尽快切换到 `--load-mode`。若你的部署脚本或 CI 中使用了旧 flags，b10441 之后会出现 warning，随后会被移除。
- **MTP 模型加载体验改善**：`--models-dir` 现在能自动按前缀发现 MTP/draft 模型，免去手动指定 draft 模型的配置，对使用 speculative decoding 的服务部署更友好。
- **server 线程模型变化**：b10447 将 speculative 处理移入 worker，主线程不再直接参与投机采样路径。如果在 server 之上做请求调度或容量规划，建议重新 benchmark 并发场景下的延迟分布。
- **hidden-state 提取 API 在途**（PR #27073）：新增 `llama_set_extract_hidden_states`/`llama_get_hidden_state` API + server endpoint，做 embedding、可解释性或 reward model 类应用的开发者可以提前关注。
- **稳定性风险提示**：SWA/recurrent 模型的 KV-cache 复用问题（#21831，#25452）仍待解决，涉及 DeepSeek V4 Flash 等模型的 server 场景需要密切关注；Vulkan 后端在 AMD 平台有多报问题，使用 Vulkan 部署的用户建议锁定已知良好版本。
- **Responses API 兼容性持续改善**（PR #26013，进行中）：JSON Schema 约束生成和 Cohere2 MoE 模板 parser 支持即将落地，基于 OpenAI Responses API 的 agent 应用可跟踪该 PR。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-16

## 今日速览
今日发布候选版本 v0.32.14-rc0，重点修复 WebP 图像转码与 Qwen 渲染器对非开头系统消息的容错。社区侧，qwen3.8 模型在 Claude Code 等 Agent 场景中触发 "system message must be at the beginning" 500 错误成为焦点，对应修复 PR 已提交。另有多个性能优化与平台兼容性 PR 处于活跃状态。

---

## 版本发布与破坏性变更

- **v0.32.14-rc0 发布**：包含两项修复——`llm: transcode WebP images for llama-server`（WebP 图像转码）与 `renderers/qwen: tolerate non-leading system messages`（Qwen 渲染器容忍非开头系统消息）。  
  🔗 https://github.com/ollama/ollama/compare/v0.32.13...v0.32.14-rc0
- **需注意的已知问题**：多个 issue 报告 qwen3.8:27b 在 `/v1/messages` 与 `/api/chat` 中因系统消息位置报 500，`ollama launch claude` 受影响。虽修复 PR 已提交，但 rc0 未明确包含该修复，升级前建议评估。详情见下方稳定性章节。

---

## 新模型与硬件支持

**社区模型请求（尚未合入）**
- deepseek-v4-flash:0731 本地支持请求（#17510）  
  🔗 https://github.com/ollama/ollama/issues/17510
- GLM 5.3 入库请求（#17741）  
  🔗 https://github.com/ollama/ollama/issues/17741
- Upstage Solar Pro 4（524K 上下文，长程 Agent 场景）请求（#17773）  
  🔗 https://github.com/ollama/ollama/issues/17773
- DeepSeek V4 Pro 0813 注册时间询问（#17775）  
  🔗 https://github.com/ollama/ollama/issues/17775

**平台/后端更新**
- MLX 后端依赖更新（PR #17761，已合并）  
  🔗 https://github.com/ollama/ollama/pull/17761
- Windows 托盘菜单替换为 WebView2 浮出层（PR #17784，进行中）——保留现有操作、适配明暗主题与 DPI 缩放  
  🔗 https://github.com/ollama/ollama/pull/17784

---

## 性能与优化

- **消除每次推理请求约 300ms 固定开销**（PR #16161）：缓存 `GetModel()` 与 `Capabilities()` 结果，避免每次请求重复读取模型 manifest 并解析 GGUF 元数据，即使模型已在显存中仍会触发此开销。当前状态为 OPEN，值得关注。  
  🔗 https://github.com/ollama/ollama/pull/16161
- **Qwen3.8-27B MTP 变体性能讨论**（#17776）：用户实测 MTP（多 token 预测）变体在 Apple Silicon 上比非 MTP 慢约 2 倍，尚不确定是 Metal 路径预期行为还是缺陷。  
  🔗 https://github.com/ollama/ollama/issues/17776
- **PR #17425**（集成测试加固）：将模型创建流程（GGUF/safetensors/量化）迁移至独立 `create` scope，避免大体积 blob 上传阻塞 release scope；同时修复 CPU-only（OLLAMA_MAX_VRAM=0）场景下运行小型模型时的 VRAM gate 匹配问题。  
  🔗 https://github.com/ollama/ollama/pull/17425

---

## 稳定性与回归

**1. qwen3.8 系统消息位置 500 错误（影响面大，修复中）**
- 多个 issue 报告：`ollama launch claude --model qwen3.8:27b` 触发 `500 system message must be at the beginning`，Chat Completion 正常但 Text Completion/Claude Code 不可用（#17774、#17754、#17768、#17778）。现象集中在 API 层对非开头 SYSTEM 消息的约束。  
  🔗 https://github.com/ollama/ollama/issues/17774  
  🔗 https://github.com/ollama/ollama/issues/17754  
  🔗 https://github.com/ollama/ollama/issues/17768
- **已有修复 PR（#17769）**：为 `qwen3moe` 架构（如 Qwen3-Coder-30B-A3B-Instruct）自动分配 `qwen3-coder` 渲染器/解析器，避免回退到通用模板导致工具调用解析异常。  
  🔗 https://github.com/ollama/ollama/pull/17769

**2. CUDA 非法内存访问（#17434，高频复现）**
- 当同时满足：`format` 为 JSON Schema、`think: false`、模型为 `qwen3.6:35b` 时，DGX Spark（GB10 arm64）上 CUDA runner 100% 崩溃。任一条件不满足则正常。暂无修复 PR。  
  🔗 https://github.com/ollama/ollama/issues/17434

**3. Pascal GPU 支持回归（#17766）**
- 自 v0.32.11 起，P6000/P4000 等 Pascal 架构 GPU 在 0.32.11/12/13 中无法工作，尽管官方 GPU 文档仍列支持。无修复 PR。  
  🔗 https://github.com/ollama/ollama/issues/17766

**4. AMD 后端问题（两个独立回归）**
- ROCm：`qwen3.8:27b` 加载失败 `TensileLibrary_lazy_gfx1200.dat` 缺失（#17782，RX 9060 XT）  
  🔗 https://github.com/ollama/ollama/issues/17782
- Vulkan：AMD Radeon 780M 在 0.32.11 运行大模型时 `ErrorDeviceLost`（#17748）  
  🔗 https://github.com/ollama/ollama/issues/17748

**5. Jetson 平台模型消失（#17661）**
- Jetson AGX Orin 升级至 0.32.7 后，除一个模型外其余全部从本地消失。无修复 PR。  
  🔗 https://github.com/ollama/ollama/issues/17661

**6. gemma4 内存异常增长（#17787）**
- 自 v0.32.2 起，Jetson Orin Nano（8GB 统一内存）加载 gemma4:e2b/e4b 时即使设置 16k 上下文也内存超限；0.32.1 及更低版本可加载 64k 上下文版本。无修复 PR。  
  🔗 https://github.com/ollama/ollama/issues/17787

**7. MINICPM-V WebP 图像 SIGSEGV（#16162）**
- `minicpm-v:8b` 处理特定合法 WebP 图片时崩溃，同一图片 llama3.2-vision 可正常处理。已在 0.32.14-rc0 的 WebP 转码修复中覆盖。  
  🔗 https://github.com/ollama/ollama/issues/16162

**8. 账号安全相关（#17682）**
- 修改密码/邮箱后会话未撤销，凭据泄露方仍可访问账户。无修复 PR。  
  🔗 https://github.com/ollama/ollama/issues/17682

**其他回归/正确性修复 PR**
- OpenAI 兼容层忽略 Modelfile `temperature`（#17763，修复中）：请求未显式指定 temperature 时，注入硬编码 1.0 覆盖模型配置。  
  🔗 https://github.com/ollama/ollama/pull/17763
- `/api/chat` 静默丢弃 `audios`/`audio` 字段（#17764，修复中）：模型在未收到音频的情况下返回看似合理的盲答。  
  🔗 https://github.com/ollama/ollama/pull/17764
- Qwen3-VL 工具调用解析失败时错误信息丢失上下文（#17770，修复中）  
  🔗 https://github.com/ollama/ollama/pull/17770
- Laguna 解析器将正文中的 JSON 误判为工具调用（#17603，修复中）  
  🔗 https://github.com/ollama/ollama/pull/17603
- `OLLAMA_DEBUG_LOG_REQUESTS` 日志输出时机过晚（#17762，修复中）：改为请求处理前输出，便于观察进行中的请求。  
  🔗 https://github.com/ollama/ollama/pull/17762

---

## 对应用开发者的意义

- **Agent/Claude Code 集成需谨慎**：qwen3.8 系列当前在 `ollama launch claude` 等场景下因系统消息位置限制报 500，升级或使用 Text Completion 路径前确认版本。修复 PR #17769 未合入前，可暂时降级至 0.32.7 或改用 Chat Completion。
- **多模态应用注意音频/图像字段**：`/api/chat` 中若传入 `audios`/`audio` 字段会被静默丢弃，模型会给出看似正确的盲答，生产环境务必显式校验响应；WebP 图像崩溃问题在 rc0 中已修复。
- **OpenAI 兼容层参数预热**：`/v1/chat/completions` 的 temperature 处理存在覆盖 Modelfile 配置的 bug，应用层如需依赖模型默认参数，建议显式在请求中传入或等待 PR #17763。
- **调试体验改进**：PR #17762 合入后，`OLLAMA_DEBUG_LOG_REQUESTS` 可在请求执行前打印日志，对排查长耗时请求的中间状态会有帮助。
- **社区新模型需求密集**：DeepSeek V4 系列、GLM 5.3、Solar Pro 4 等入库呼声较高，关注后续版本更新可提前规划模型迁移。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

## LiteLLM 动态日报 2026-08-16

### 今日速览
- 外部安全研究员提交 3 个安全问题（默认无认证、SSRF/Key 泄露、非管理员自提预算），均在创建当天被官方关闭，修复响应迅速。
- 远程 Ollama 部署因 `api_base` 被忽略，每次 completion 额外增加约 8s 静默连接超时；修复 PR 已就绪。
- 计费与预算类修复密集推进：managed batch 成本重复/丢失计费、per-second 音频预算预留、流式 usage cost 信任策略。

---

### 版本发布与破坏性变更
- **无新 Release**。
- ⚠️ [#36922](https://github.com/BerriAI/litellm/issues/36922) `uv tool update litellm["proxy"]` 升级至 v1.96.2 后，FastAPI `get_flat_dependant` 不兼容导致 Proxy 启动失败。建议升级用户固定依赖版本并增加启动冒烟测试。
- 🔜 [#36741](https://github.com/BerriAI/litellm/pull/36741) Langfuse callback 迁移至 SDK v4（进行中），合入后要求 Langfuse 服务端为 v4，自托管用户需提前规划。

---

### 新模型与硬件支持
- [#36820](https://github.com/BerriAI/litellm/pull/36820) 新增 `voyage/voyage-code-4` 嵌入模型（尚未正式发布，价格参数先按 voyage-code-3 镜像）。
- [#35091](https://github.com/BerriAI/litellm/pull/35091) 新增 `voyage-4` 嵌入家族及 `voyage-context-4`，并修复 contextual embeddings 的 `list[str]` 入参 400 问题。
- Feature：[#28026](https://github.com/BerriAI/litellm/issues/28026) 请求在 `litellm.image_generation()` 中支持 Ollama text-to-image（如 `x/flux2-klein`）。
- Feature：[#27830](https://github.com/BerriAI/litellm/issues/27830) 请求为托管 vLLM / OpenAI 兼容端点自动填充 `model_info.max_input_tokens` / `max_output_tokens`。

---

### 性能与优化
今日无吞吐/显存级优化合入，延迟与数据库性能相关进展：

- [#37062](https://github.com/BerriAI/litellm/pull/37062) fix(ollama)：将 `api_base` 转发至 model-info 查找，`/api/show` 使用配置的 Ollama host。对应 [#37041](https://github.com/BerriAI/litellm/issues/37041) 中每次 completion 约 8s 的 localhost 连接超时问题。
- [#35766](https://github.com/BerriAI/litellm/issues/35766) `LiteLLM_SpendLogs` 缺少 `(api_key, startTime)` 复合索引，预算窗口 reseed 触发 seq scan，打满 2 vCPU RDS（Prisma P2028）。需在维护窗口补索引并评估事务超时。
- [#37050](https://github.com/BerriAI/litellm/pull/37050) fix(batches)：managed batch 成本精确入账一次，消除 retrieve 与 poller 竞态造成的重复扣费或成本永久丢失。

---

### 稳定性与回归

**启动 / 基础设施**
- [#36922](https://github.com/BerriAI/litellm/issues/36922) (OPEN) Proxy 升级后启动失败，见「版本发布与破坏性变更」。
- [#35766](https://github.com/BerriAI/litellm/issues/35766) (OPEN) Postgres 事务 P2028、spend 更新失败，见「性能与优化」。
- [#27704](https://github.com/BerriAI/litellm/issues/27704) (OPEN) K8s 滚动部署时，Prisma Query Engine 子进程未就绪就调度后台任务，造成约 5 秒 spend 数据丢失窗口。

**高影响**
- [#37041](https://github.com/BerriAI/litellm/issues/37041) (OPEN) Ollama 远端 `api_base` 被忽略，每次 completion 额外约 8s 超时，已有修复 PR [#37062](https://github.com/BerriAI/litellm/pull/37062)。
- [#25429](https://github.com/BerriAI/litellm/issues/25429) (OPEN) `chatgpt/gpt-5.4` + ChatGPT 订阅认证：responses 返回空结果，completion() 桥报 `Unknown items in responses API response`。
- [#33986](https://github.com/BerriAI/litellm/issues/33986) (OPEN) Managed Bedrock batch 创建后可运行，但 `POST /v1/batches/{id}/cancel` 返回“LiteLLM doesn't support bedrock for cancel_batch”。

**协议转换 / 正确性**
- [#36917](https://github.com/BerriAI/litellm/issues/36917) (OPEN) Anthropic `/v1/messages` 中 `messages[]` 内的 `role:"system"` 条目被静默丢弃。
- [#36928](https://github.com/BerriAI/litellm/issues/36928) (OPEN) `litellm.interactions.create()` 经 proxy 路由时丢失 `response_format`（Gemini 模型）。
- [#37015](https://github.com/BerriAI/litellm/issues/37015) (OPEN) Gemini TTS（`/v1/audio/speech`）不产生 spend log，key spend 恒为 0。
- [#37046](https://github.com/BerriAI/litellm/issues/37046) (OPEN) `service_tier=priority` 的 gpt-4o/gpt-4.1 系列按默认费率计费（dated-snapshot 模型条目缺 pricing key）。
- [#32785](https://github.com/BerriAI/litellm/issues/32785) (OPEN) `RateLimitError` 不区分 `insufficient_quota`（账单性）与可重试 429，重试循环会对账单错误无限重试。

**安全**
- [#37052](https://github.com/BerriAI/litellm/issues/37052) / [#37053](https://github.com/BerriAI/litellm/issues/37053) / [#37054](https://github.com/BerriAI/litellm/issues/37054)（均于今日 CLOSED）：非管理员通过 `temp_budget_increase` 自提 max_budget；client-supplied `api_base` 导致 SSRF/provider-key 泄露（guard 为死代码）；`LITELLM_MASTER_KEY` 未设置时 proxy 无认证运行（默认 docker-compose 未设置）。
- [#28033](https://github.com/BerriAI/litellm/issues/28033) (OPEN) 公开的预算绕过复现仓库（litellm-infinite-money-glitch）仍存在，请确认与 #37052 修复是否重叠。
- [#36997](https://github.com/BerriAI/litellm/issues/36997) (OPEN) Admin UI session cookie 为 non-HttpOnly JWT 且 `key` 声明携带调用者真实 proxy key。

**回归确认 / 已关闭**
- [#22997](https://github.com/BerriAI/litellm/issues/22997) (CLOSED) 1.81.14 在 thinking + tools 组合下失败（1.81.12 正常）。
- [#27469](https://github.com/BerriAI/litellm/issues/27469) (CLOSED) 1.83.7 OpenAI→Anthropic 响应转换丢失 `tool_call.function.arguments`。
- [#26755](https://github.com/BerriAI/litellm/issues/26755) (CLOSED) Gemini `functionCall → functionResponse` 顺序校验 400。
- [#36880](https://github.com/BerriAI/litellm/issues/36880) (CLOSED) `/v1/responses` 被 guardrail 拦截后硬编码零 usage。
- 合并的修复 PR：[#37058](https://github.com/BerriAI/litellm/pull/37058) 停止透传客户端 Accept-Encoding（解决 Anthropic brotli 压缩字节无法解码）；[#37036](https://github.com/BerriAI/litellm/pull/37036) / [#37038](https://github.com/BerriAI/litellm/pull/37038) PANW Prisma AIRS 扫描修复（阻塞请求响应完整性、工具调用参数误判）；[#36633](https://github.com/BerriAI/litellm/pull/36633) Bedrock managed-batch 参数注册为 litellm_params，不再泄漏给 provider。

---

### 对应用开发者的意义
1. **安全加固优先**：若部署未显式设置 `LITELLM_MASTER_KEY` 或沿用默认 docker-compose，请立即启用认证；升级后验证预算提升接口与 client `api_base` 覆盖行为是否已受限。
2. **远程 Ollama 用户**：在 [#37041](https://github.com/BerriAI/litellm/issues/37041) 修复合入前，每个 completion 会白等约 8s；临时规避可让配置 host 在 localhost:11434 可达，或改用 Ollama client 直连。
3. **计费准确性**：managed batch（[#37050](https://github.com/BerriAI/litellm/pull/37050)）与 per-second 音频预算（[#37056](https://github.com/BerriAI/litellm/pull/37056)）修复尚未合入，涉及相关场景需避免重复/漏计费；重试逻辑应单独捕获 `insufficient_quota`，防止账单性错误引发重试风暴。
4. **升级路径**：`uv tool update` 可能引入破坏性依赖变更（[#36922](https://github.com/BerriAI/litellm/issues/36922)）；建议在 CI 中加入 Proxy 启动冒烟测试，并锁定 FastAPI 等关键依赖版本。
5. **协议边界回归**：Anthropic system-in-messages、Gemini `response_format`、guardrail usage 统计等跨协议转换问题仍然活跃，基于 LiteLLM 构建 Agent/应用时应补充对应回归测试；同时跟踪 [#37046](https://github.com/BerriAI/litellm/issues/37046) 的 `service_tier=priority` 计费修复，避免成本低估。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-16

## 1. 今日速览

过去24小时无新版本 Release，但 Issue 与 PR 活跃度较高，焦点集中在 **Unsloth Studio 桌面端/Web UI 的稳定性与体验修复**：包括 Deep Research 冻结、量化 KV cache 在张量并行下被丢弃（已提交修复 PR）、tool-call 索引错乱导致多轮工具调用串流（两个 PR 修复）、以及 macOS 上 oMLX 模型发现与 AppleDouble sidecar 误识别问题。性能侧最有价值的动态是 PR #8890：`max_steps` 训练不再预处理整个数据集，实测 30 步训练省下约 10 分钟预处理时间（约 6 倍提速）。

## 2. 版本发布与破坏性变更

无。过去 24 小时没有新 Release 或破坏性 API/配置变更。Studio 侧相关 PR 均为增量修复，未涉及数据格式或配置兼容性变化。

## 3. 新模型与硬件支持

- **Intel GPU（非 Vulkan llama.cpp 路径）**：Issue #8931 请求 Unsloth Studio 支持 Intel Arc GPU（如 CSM-1B），当前仅核心可用，UI 不可用。无 PR 认领。
  https://github.com/unslothai/unsloth/issues/8931
- **macOS oMLX 模型发现**：PR #8937 让 Studio 扫描 `~/.omlx/models`（oMLX 是 macOS MLX 运行器），使仅通过 oMLX 安装的模型在 Studio 中可见；同时修复 AppleDouble sidecar（`._<name>`，exFAT/FAT32 卷上约 4 KB）被误识别为 GGUF 的问题（PR #8919，修复 #8566 的 GGUF 拾取器部分）。
  https://github.com/unslothai/unsloth/pull/8937
  https://github.com/unslothai/unsloth/pull/8919
- **AMD GPU 相关持续反馈**：Issue #8878 反馈 ROCm/Vulkan 下 VRAM 未知或不使用，且伴随截图证据（未复现）；#8858 报告 AMD W7900/W7500 双卡环境下附件 PDF 引发工具调用异常。
  https://github.com/unslothai/unsloth/issues/8878
  https://github.com/unslothai/unsloth/issues/8858

## 4. 性能与优化

- **训练预处理提速（PR #8890）**：`max_steps` 训练原先会先 tokenize 整个数据集再跑 step；PR 改为只预处理实际会用到的行。实测 `unsloth/open_math_reasoning`（27GB 盘上数据）+ `unsloth/Qwen3-0.6B` 30 步，预处理从 **11m14s 降到约 1m54s 量级**（报告原数值为 11m14s 预处理 vs 1m54s 训练，修复后预处理大幅缩减）。
  https://github.com/unslothai/unsloth/pull/8890
- **本地模型清单加载加速（PR #8770）**：109 行模型清单的冷启动 `GET /api/hub/local` 从约 5 秒缩短，并避免阻塞 API 事件循环超过 4 秒——从清单计算中移除三处不必要的工作。
  https://github.com/unslothai/unsloth/pull/8770
- **GGUF 缓存复用（PR #8771）**：加载已缓存 GGUF 时，单次请求原先会重复 7 次 Hub 往返做仓库查找与文件校验；PR 复用 config 解析阶段已有的缓存验证结果，避免重复检查。
  https://github.com/unslothai/unsloth/pull/8771
- **流式渲染性能（PR #8845、#8935）**：#8845 合并浏览器下一帧之前到达的流式文本块，避免快速流使聊天 UI 堆积消息重建；#8935 对大型流式代码块做增量 tokenize，避免 Shiki 每次刷新（250ms 间隔）重复处理整个代码块（>2000 字符时）。
  https://github.com/unslothai/unsloth/pull/8845
  https://github.com/unslothai/unsloth/pull/8935

## 5. 稳定性与回归

按严重程度排列：

- **[严重/持续] Qwen3-0.6B 4bit 训练 PassManager 崩溃（#2482）**：Colab T4 上 `FastLanguageModel` + `trl.SFTTrainer` 一致失败，18 条评论，更新于 8/15，尚无 fix PR。老 issue 仍在活跃。
  https://github.com/unslothai/unsloth/issues/2482
- **[严重/持续] “Your GPU is too old!” 阻断（#1998）**：GRPO notebook 在旧 GPU 上运行报错，标记 "currently fixing, URGENT BUG"，但 8/15 仍无 fix PR 关联。
  https://github.com/unslothai/unsloth/issues/1998
- **[高危/已修复] 张量并行下量化 KV cache 被丢弃（#8888 → PR #8939）**：`load_model` 只允许 f16/bf16/f32 的 KV cache 类型，其他类型在 TP 模式下被静默移除并以 f16 预算。PR #8939 修复。
  https://github.com/unslothai/unsloth/pull/8939
- **[高危/已修复] Tool-call delta index 重启导致串流错乱（#8734 → PR #8754/#8755）**：提供方对每轮 tool-call 重置 `delta.tool_calls[].index` 时，适配器匹配失败导致参数流合并错乱；前端（#8754）与后端（#8755）分别修复。对 Agent 应用影响直接。
  https://github.com/unslothai/unsloth/pull/8754
  https://github.com/unslothai/unsloth/pull/8755
- **[中] Studio Deep Research 冻结（#8483）**：Gemma-4-26B-A4B 下 Deep Research 在 "Writing The Report" 阶段冻结，无法查看 token 用量。
  https://github.com/unslothai/unsloth/issues/8483
- **[中] MTP 部分 GPU offload 性能倒退（→ PR #8875）**：Qwen3.8-27B-GGUF UD-IQ2_M 在 Studio 下仅约 3.5 token/s，原因是嵌入的 MTP head 跟随主模型放置不合理；PR #8875 修复部分 offload 时 MTP 的放置。
  https://github.com/unslothai/unsloth/pull/8875
- **[中] Studio 安装失败（#8546）**：Unsloth Desktop 安装进程无法完成，已关闭。
  https://github.com/unslothai/unsloth/issues/8546
- **[中] GGUF 导出需要 16bit 权重（#8717）**：用户抱怨导出 GGUF 必须先下载 40GB 16bit 模型，已关闭。
  https://github.com/unslothai/unsloth/issues/8717
- **[低] macOS 上 Ideogram 4 加载失败（#8940）**：`'_Noop' object is not iterable`，Studio 0.1.800-beta，MacOS 26.5.2。
  https://github.com/unslothai/unsloth/issues/8940
- **[低] torch 版本兼容（#8933）**：`module 'torch' has no attribute 'float8_e8m0fnu'`，Studio 训练时 ML 库导入失败。
  https://github.com/unslothai/unsloth/issues/8933
- **[低] torch 2.13 安全修复被依赖约束阻塞（#8926）**：GHSA-rrmf-rvhw-rf47 由于 published constraints 无法升级。
  https://github.com/unslothai/unsloth/issues/8926
- **[低] AMD iGPU VRAM 虚高（#8942）**：AMD iGPU 上报的 VRAM 数值远超物理显存。
  https://github.com/unslothai/unsloth/issues/8942
- **[低] `get_statistics` 忽略 `force_download=False`（#8899）**：`_get_statistics` 始终向 `snapshot_download` 传 `force_download=True`，导致 repeat 计数器每次都强制下载。
  https://github.com/unslothai/unsloth/issues/8899

## 6. 对应用开发者的意义

- **Agent/工具调用稳定性即将修复**：#8754 + #8755 针对多轮 tool-call 中 `delta.tool_calls[].index` 重置导致参数流错乱的问题做了前后端双侧修复，对在此之上构建 Agent 的开发者是直接影响——工具参数串流错乱是生产环境最隐性的故障之一。建议关注这两个 PR 的合入与发布节奏。
  https://github.com/unslothai/unsloth/pull/8754
  https://github.com/unslothai/unsloth/pull/8755
- **API 层模型自动切换扩展**：PR #8766 为 `/v1/images/generations` 增加 opt-in 模型自动切换（对齐 chat 已有的 `openai_api_auto_switch_model`），媒体类 API 客户端不再需要先在页面手动选模型，503 问题有望消失。
  https://github.com/unslothai/unsloth/pull/8766
- **智能体 API 路径在合并更多能力**：PR #8561 导入 Cursor/Claude Code 对话记录、PR #8816 将已存 prompt 直接作为 system prompt 注入、PR #8728 macOS 全局 Ask bar（⌥Space），这些对上层应用意味着 Studio 正在逐步承担“本地 Agent 工作台”的角色，生态位与功能边界值得关注。
  https://github.com/unslothai/unsloth/pull/8561
  https://github.com/unslothai/unsloth/pull/8816
  https://github.com/unslothai/unsloth/pull/8728
- **本地网络部署仍是高频诉求**：#8934/#8578/#8898 三条 issue 都在要求 API 监听 `0.0.0.0` 或提供纯 LAN 服务模式，且无需 Cloudflare 隧道/API token。对需要在内网部署推理服务的团队，目前仍需绕过 127.0.0.1 限制，这可能是 Studio 在私有化场景落地的一个缺口。
  https://github.com/unslothai/unsloth/issues/8578
  https://github.com/unslothai/unsloth/issues/8898
  https://github.com/unslothai/unsloth/issues/8934
- **CLI 训练导出一体化在推进**：PR #6793 为 `unsloth train` 增加 `--export gguf` 标志，训练+导出一条命令完成。当前仍 open，但该方向对 CI/CD 集成的开发者价值明显。
  https://github.com/unslothai/unsloth/pull/6793
- **模型发现能力增强**：#8937 oMLX 模型发现 + #8770 本地模型清单加速，意味着 Studio 正在成为 macOS 上多运行器（LM Studio/oMLX/自有下载）的统一管理入口，运行多后端的管理成本在降低。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*