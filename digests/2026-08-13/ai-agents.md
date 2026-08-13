# OpenClaw 生态日报 2026-08-13

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-13 09:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-13

## 今日速览

过去 24 小时项目活跃度极高：共产生 500 条 Issue 更新（其中新开/活跃 365 条，关闭 135 条）和 500 条 PR 更新（待合并 285 条，已合并/关闭 215 条）。无新版本发布，项目处于密集开发与问题修复阶段。值得关注的是，**消息投递可靠性**（silent reply failures、subagent completion 丢失、cron 执行卡顿）仍是社区反馈最集中的领域，多个 P1 级 Bug 长期未闭环。PR 合并/关闭率约 43%，说明维护者处理节奏较快，但 Issue 关闭率仅 27%，积压压力持续存在。整体判断：项目活跃度高、修复进展明显，但稳定性和可靠性问题仍是当前最大短板。

---

## 项目进展

今日合并/关闭的 PR 中，以下几项对项目有实质性推动：

- **修复 onboarding 导入时序问题** — [#123106 [CLOSED] fix(onboard): import applies after runtime state initialization](https://github.com/openclaw/openclaw/pull/123106)：修复了用户在经典 onboarding 流程中应用 Codex/Claude/Hermes 导入后，向导因运行时 SQLite 状态未初始化而异常退出的问题。
- **DeepSeek cron 前缀修复（第二版）** — [#123048 [CLOSED] fix(cron): use plain-text envelope to avoid DeepSeek bracket-grammar deprioritization](https://github.com/openclaw/openclaw/pull/123048)：在 #122035 基础上改用纯文本信封，避免 `[cron:...]` 方括号语法触发 DeepSeek API 边缘节点降级调度。该修复与 Issue #121953 直接对应。
- **测试套件性能优化** — [#123099 [CLOSED] improve: speed up prepared reply media tests](https://github.com/openclaw/openclaw/pull/123099) 与 [#123100 [CLOSED] ci: refresh compact shard packing hints from current main runtimes](https://github.com/openclaw/openclaw/pull/123100)：两项 CI 基础设施改进，前者缩减冷启动测试依赖图，后者根据最新 main 运行数据更新分片调度，有助于缩短 CI 反馈周期。
- **文档完善** — [#123091 [CLOSED] docs(gateway): document portal tool gating and tighten its description](https://github.com/openclaw/openclaw/pull/123091)：补充了 portal 工具的配置说明，明确了通过 tool policy 控制开关的方式。
- **测试夹具对齐** — [#123095 [CLOSED] chore(plugins): align install ownership fixtures](https://github.com/openclaw/openclaw/pull/123095)：使插件安装测试与当前 main 分支的权威所有权账本保持一致。

项目整体在 onboarding 流程、cron 可靠性、CI 效率和文档完整性方面均有小幅推进，但未出现架构级或里程碑式的大变更。

---

## 社区热点

今日讨论最集中、反映最强烈的 Issue 与 PR：

- **[#121058 — Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058)**（评论 92 条，持续高热）：这是今日绝对的社区焦点。用户报告 #116277 标记关闭后，静默回复失败仍然反复出现，监控 cron 持续记录到新故障，包括当天（08-09）仍有发生。92 条评论表明该问题影响面广、用户挫败感强，且对"关闭即解决"的处理方式不满。这反映出消息投递可靠性问题尚未根治，需要维护者高度重视。

- **[#7707 — Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)**（评论 45 条）：自 2026-02-03 创建以来持续活跃，用户强烈要求按来源（用户命令、网页抓取、第三方技能）为记忆条目打信任标记，以防范记忆投毒攻击。该 Issue 同时带有安全审查、产品决策等多个待办标签，是安全方向上最具代表性的社区诉求。

- **[#77598 — Track live dev agent behavior and trajectory](https://github.com/openclaw/openclaw/issues/77598)**（评论 23 条）：由 maintainer 发起的 24 小时持续观察 dev agent 行为的记录 Issue，社区关注度较高，反映项目方对自主智能体行为的透明度和可观测性的重视。

**深层诉求分析**：热点集中在"系统可靠性"（消息不丢、不静默失败）和"安全可信"（记忆防投毒、行为可观测）两大主题。用户不再满足于功能堆叠，而是要求核心链路经得起真实场景考验。

---

## Bug 与稳定性

按严重程度排序，今日最值得关注的 Bug：

**P1 级（严重）：**

- **[#121953 — Cron agent turns stall on DeepSeek: `[cron:...]` prefix is deprioritized](https://github.com/openclaw/openclaw/issues/121953)**（评论 16）：DeepSeek API 边缘节点对以 `[cron:` 开头的请求做降级处理，导致 cron 任务卡顿数十秒至分钟。已有修复 PR [#122035](https://github.com/openclaw/openclaw/pull/122035)（使用 `[Cron:` 前缀）和 [#123048](https://github.com/openclaw/openclaw/pull/123048)（改用纯文本信封，今日已合并），但 #122035 仍处于 open 状态，需验证最终方案是否彻底。

- **[#43367 — Multi-agent orchestration is unstable](https://github.com/openclaw/openclaw/issues/43367)**（评论 13）：并发 `agents add` 配置覆盖、session-lock 失败、子任务脱离等问题。带 `linked-pr-open` 标签，但有修复 PR 尚未合入。

- **[#89278 — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s timeout](https://github.com/openclaw/openclaw/issues/89278)**（评论 10）：OAuth 探测成功但 cron/heartbeat 因 10 秒超时失败，且 `needs-live-repro` 标签提示当前可能无法复现，修复受阻。

- **[#92433 — Subagent completion silently dropped when announce steers into a requester run that ends before processing it](https://github.com/openclaw/openclaw/issues/92433)**（评论 10）：子代理完成消息在 requester run 提前结束时被静默丢弃，`clawsweeper-recovery-stuck` 标签表明恢复尝试受困。

- **[#47975 — Subagent sessions persist after completion, main session becomes unresponsive](https://github.com/openclaw/openclaw/issues/47975)**（评论 10）：子代理会话结束后未清理，主会话卡死。

- **[#91363 — Isolated cron consistently fails with "LLM request failed"](https://github.com/openclaw/openclaw/issues/91363)**（评论 10，👍 6）：隔离 cron 任务无论 `timeoutSeconds` 如何设置都失败，请求从未到达 provider。获得 6 个 👍，影响范围较广。

**P2 级（中等）：**

- **[#97616 — OpenClaw leaks unreaped hook/tool child processes, causing zombie accumulation](https://github.com/openclaw/openclaw/issues/97616)**：僵尸进程累积导致运行时性能退化，带 `crash-loop` 标签。

- **[#107814 — gpt-5.3-codex-spark emits empty arguments for required tool calls](https://github.com/openclaw/openclaw/issues/107814)**：模型输出空参数导致所有工具调用被拒，属模型兼容性问题。

- **[#43747 — Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747)**（评论 11）：不同用户实例行为不一致，有的走 `main.sqlite` 有的走其他存储，多人协作时记忆管理混乱。

**已有关联修复的 Bug：** #121953 有修复 PR（部分已合并）；#121058 声称修复但未生效，需重新打开调查。

---

## 功能请求与路线图信号

以下功能请求在今日讨论中热度较高，结合已有 PR 分析未来纳入可能性：

| 功能请求 | Issue | 热度/信号 | 纳入可能性 |
|---------|-------|----------|-----------|
| **Memory Trust Tagging by Source**（按来源标记记忆信任等级） | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 45 评论，带 security-review/product-decision 标签 | 中高——安全方向强烈需求，但需产品决策 |
| **Isolate subagent completion from parent context**（子代理完成消息与父上下文隔离） | [#96975](https://github.com/openclaw/openclaw/issues/96975) | 11 评论，11 👍 | 中——与多个 P1 消息丢失 Bug 相关，可能随修复一并解决 |
| **YAML 配置文件格式支持** | [#45758](https://github.com/openclaw/openclaw/issues/45758) | 9 评论，2 👍 | 低——已有 JSON5，社区需求不迫切 |
| **自托管 STT/TTS 支持** | [#45508](https://github.com/openclaw/openclaw/issues/45508) | 8 评论，2 👍 | 中——WebChat 体验改进，需 maintainer 评估 |
| **智能会话自动标题** | [#99583](https://github.com/openclaw/openclaw/issues/99583) | 7 评论，2 👍 | 中低——体验优化型需求 |
| **推送 OpenRouter 成本数据到 agent 运行时** | [#9016](https://github.com/openclaw/openclaw/issues/9016) | 8 评论 | 低——已有 `clawrouter` 扩展在 PR 中出现 |

**路线图信号**：PR [#123105](https://github.com/openclaw/openclaw/pull/123105)（替换 node-llama-cpp 为 managed llama-server）是今天最重量级的架构变更，虽未合并但已在评审中。这说明项目在本地模型支持方面有大动作，值得关注。

---

## 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

**满意/正面：**

- 无显著正面反馈出现。社区情绪整体偏向问题汇报与修复催促。

**不满意/负面痛点：**

- **"关闭了但问题还在"的不信任感蔓延**：[#121058](https://github.com/openclaw/openclaw/issues/121058) 中用户明确指出 #116277 关闭后问题依旧，监控记录到新的故障实例。这对社区信任有较大伤害，用户对维护者的"关闭"决策产生质疑。
- **多人环境记忆管理混乱**：[#43747](https://github.com/openclaw/openclaw/issues/43747) 中用户描述 3 人团队各自实例行为不一致，"I never see any of our memory is managed in same way"，反映了在企业/团队场景下配置一致性差的问题。
- **多智能体编排"纸面可用"**：[#43367](https://github.com/openclaw/openclaw/issues/43367) 用户从 CLI 尝试并行任务时遭遇配置覆盖、会话锁失败等多重故障，直言"make multi-agent runs unreliable in practice"。
- **深层次吐槽**：[#44130](https://github.com/openclaw/openclaw/issues/44130) 用户反馈 TUI 滚动跳动问题 "in practice it feels like the screen scrolls from top to end"；[#42273](https://github.com/openclaw/openclaw/issues/42273) 报告备份在 4GB+ 安装上卡死，写了个 10B-42KB 的临时文件后静默退出。

**共性诉求**：用户对**静默失败**（无日志、无错误、无消息）的容忍度极低。多个 Issue 都提到"没有报错就消失了"的现象，这应该是项目组在可观测性方面优先改进的方向。

---

## 待处理积压

以下为长期未闭环或需维护者关注的重要项：

- **[#7707 — Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707)**：自 2026-02-03 创建至今已 6 个多月，45 条评论，带 `needs-product-decision` 和 `needs-security-review` 标签，安全团队和产品团队均未给出明确结论，社区持续追问。

- **[#43367 — Multi-agent orchestration unstable](https://github.com/openclaw/openclaw/issues/43367)**：3 月创建，P1 级，至今仍有 `linked-pr-open` 标签但无修复 PR 合入，影响多智能体核心场景。

- **[#121058 — Silent reply failures](https://github.com/openclaw/openclaw/issues/121058)**：92 条评论的高热 Issue 需要维护者正式回应——要么重新打开 #116277，要么给出新的修复方案和时间表，不宜继续搁置。

- **[#50199 — Skill Priority Configuration](https://github.com/openclaw/openclaw/issues/50199)**：3 月提出，P3，带 `needs-product-decision`，技能优先级配置对实际使用体验影响明显但长期未获产品侧回应。

- **[#42273 — backup create stalls on large installations](https://github.com/openclaw/openclaw/issues/42273)**：4GB+ 安装备份卡死，P2，data-loss 风险高，`maturity:stable` 标签表明这是稳定版问题，建议优先排期。

- **[#9016 — OpenRouter cost exposure](https://github.com/openclaw/openclaw/issues/9016)**：2 月提出，P2，至今无维护者明确表态，带 `clawsweeper-recovery-stuck` 标签。

**给维护者的提醒**：当前 Issue 积压趋势明显——24 小时内新开/活跃 365 条对关闭 135 条，净增 230 条。P1 级消息可靠性类问题（#121058、#92433、#67777、#47975、#97983 等）占据大量社区注意力，建议集中力量优先解决核心链路稳定性，再推进新功能开发，以恢复社区信任。

---

*本日报由 AI 分析师基于 OpenClaw GitHub 公开数据自动生成，仅供参考。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-13）

## 1. 生态全景

个人 AI 助手开源生态正处于**从功能堆叠向稳定性与安全加固的转型期**。今日各项目动态高度聚焦于消息投递可靠性、静默失败治理、权限边界收敛三大主题，OpenClaw、Hermes、QwenPaw 等头部项目均暴露了多智能体编排和消息传递链路上的 P1 级稳定性缺陷。与此同时，WebUI 体验、CLI 可观测性和多渠道适配正进入精细打磨阶段，新功能开发节奏放缓但架构级重构（如 OpenClaw 的 llama-server 替换、Hermes 的统一超时层、ZeroClaw 的安全决策管线）在多个项目中同步推进。生态整体呈现"高活跃、高积压、可靠性优先"的格局。

## 2. 各项目活跃度对比

| 项目 | Issues（更新） | PRs（更新） | Releases | 健康度评估 |
|------|---------------|------------|----------|-----------|
| **OpenClaw** | 500（新开/活跃 365，关闭 135） | 500（待合并 285，合并/关闭 215） | 无 | **高活跃但可靠性短板显著**；P1 消息投递类问题积压，Issue 关闭率仅 27% |
| **NanoBot** | 10（开放 5，关闭 5） | 34（待合并 18，合并/关闭 16） | 无 | **优秀**；安全修复 24h 内闭环，合并率 47%，PR 冲突仅 2 条 |
| **Hermes Agent** | 50（新开/活跃 43，关闭 7） | 50（待合并 36，合并/关闭 14） | 无 | **频繁迭代但桌面端 P1 回归**；`hermes update` 长期欠账已收官，但 Windows 进程管理缺陷仍需关注 |
| **PicoClaw** | 3（新开 1，活跃 2） | 3（待合并 3） | 无 | **中低活跃、合并停滞**；最老 PR 已开放 18 天无 review |
| **NanoClaw** | 4（新开 4，关闭 0） | 9（待合并 6，合并/关闭 3） | 无 | **中活跃但 Issue 闭环率低**；新上报 3 个 Bug 均无 fix PR |
| **NullClaw** | 0 | 0 | 无 | **无活动** |
| **IronClaw** | 37（新开/活跃 25，关闭 12） | 50（待合并 30，合并/关闭 20） | 2 个 RC 修复版 | **中高活跃、向 Reborn 架构收敛**；Telegram 通道 P1 Bug 待修 |
| **LobsterAI** | 1（更新） | 12（待合并 5，合并/关闭 7） | 无 | **中高活跃、UI 收尾阶段**；测试补强类 PR 有 4 个月滞留现象 |
| **Moltis** | 0 | 1（待合并 1） | 无 | **低活跃但外部贡献者介入**；沙箱构建修复待合并 |
| **CoPaw（QwenPaw）** | 39（新开/活跃 23，关闭 16） | 50（待合并 26，合并/关闭 24） | v2.1.0-beta.4 | **快速迭代、维护者响应好**；多步骤任务中断与网络自愈是最大风险 |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |
| **ZeroClaw** | 50（新开/活跃 41，关闭 9） | 50（待合并 44，合并/关闭 6） | 无 | **高活跃、高积压**；PR 合并率仅 12%，审查瓶颈成为主要制约；安全架构重构推进中 |

## 3. OpenClaw 在生态中的定位

- **社区规模绝对领先**：OpenClaw 单日 500 条 Issue + 500 条 PR 更新，是 Hermes/ZeroClaw（各 50 条）的 10 倍，NanoBot（44 条）的 11 倍，在生态中处于核心参照地位，其问题模式（消息可靠性、记忆安全）常成为其他项目的借鉴方向。
- **技术路线：大而全的平台化**：覆盖 onboarding 流程、cron 调度、多智能体编排、记忆管理、插件体系及 CI 基础设施，走平台化路线。与 NanoBot（安全优先的轻量级个人助理）、ZeroClaw（Rust 安全架构 + 可验证意图）、Hermes（桌面端 + 多渠道网关）形成明显差异。
- **核心短板：可靠性与信任危机**：P1 级消息投递问题（#121058 静默回复失败 92 条评论）长期未根治，"关闭即解决"的处理方式已引发社区信任质疑。对比 NanoBot 安全 Bug 24h 内闭环、CoPaw 6 天内响应，OpenClaw 的 Issue 关闭率（27%）和 PR 合并率（43%）虽在改善，但净增积压 230 条/日，从侧面反映其在生态中面临的最大挑战并非功能追赶，而是核心链路的稳定性兑现。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **消息投递可靠性与静默失败治理** | OpenClaw、Hermes、CoPaw、NanoClaw、PicoClaw | 子代理完成消息丢失、静默回复失败、cron 卡顿、MCP 连接失败导致挂起、网络瞬断后无法自动重连。用户对"无报错就消失"容忍度极低 |
| **安全边界与权限治理** | NanoBot、Hermes、ZeroClaw、CoPaw | 命令白名单绕过、路径逃逸、凭据泄露、插件权限模型缺口、可验证意图的约束评估绕过。安全审计与权限审批机制正在系统化 |
| **可观测性与运维能力** | NanoClaw、IronClaw、ZeroClaw、CoPaw | 轻量健康检查命令（`ncl status`）、失败原因记录缺失、误导性错误提示（"full disk"）、成本显示误导。用户期望"知道发生了什么" |
| **多智能体编排稳定性** | OpenClaw、CoPaw、PicoClaw | 子代理会话泄漏、配置覆盖、并发任务中断、上下文隔离。多数项目处于"纸面可用、实战不稳"阶段 |
| **模型兼容性与 Provider 扩展** | CoPaw、NanoBot、OpenClaw、IronClaw | MCP 工具参数类型兼容、国产 Provider 接入（阿里云百炼、Volcengine）、thinking/effort 控制、OAuth PKCE 插件化 |

## 5. 差异化定位分析

| 维度 | OpenClaw | NanoBot | Hermes Agent | CoPaw（QwenPaw） | ZeroClaw |
|------|----------|---------|--------------|------------------|----------|
| **功能侧重** | 全栈 Agent 平台 | 安全优先的个人助理 | 多渠道消息网关 + 桌面端 | 通用 Agent + 中国生态 | 安全架构 + 可验证意图 |
| **目标用户** | 开发者/技术社区 | 个人用户/轻量部署 | 桌面端重度用户/多渠道运营 | 国内开发者/企业场景 | 安全敏感型用户 |
| **技术架构** | 多语言/多运行时 | TypeScript 现代栈 | Node.js + npm workspaces | Python + Tauri 桌面端 | Rust 单二进制 |
| **差异化标签** | 生态标杆、全功能 | 安全闭环速度最快 | 桌面端体验 + 多渠道 | 国产模型/Provider 整合 | 安全与 VI 创新 |

## 6. 社区热度与成熟度

**第一梯队：超大规模、可靠性承压** — OpenClaw
单日 1000 条动态，社区活跃度断层领先，但稳定性和信任问题是最大短板。

**第二梯队：高活跃、健康度分化**
- **质量巩固型**：NanoBot（安全修复闭环快）、LobsterAI（UI 收尾）、IronClaw（Reborn 架构收敛）— 项目进入精细化阶段
- **快速迭代型**：Hermes（架构 PR 并行推进）、CoPaw（beta 快速迭代）、ZeroClaw（RFC 密集但 PR 积压）— 功能扩展与架构重构同步进行

**第三梯队：低活跃、等待维护者响应**
PicoClaw、NanoClaw、Moltis — 活跃度低，但存在阻断性 Bug（Moltis 沙箱构建全挂）和长期滞留 PR，是贡献者参与的低风险切入点。

## 7. 值得关注的趋势信号

1. **可靠性成为社区信任的硬底线**：OpenClaw #121058 的 92 条评论和 Hermes #82001 的误导性报错表明，用户对"无声失败"和"错误诊断"的容忍度已降至最低点。可观测性（结构化日志、失败原因透出、健康检查）正从可选项变成必备项。

2. **安全边界从单点修补走向体系化建设**：NanoBot 的 4 个安全修复 + ZeroClaw 的运行时安全决策管线 + 安全 RFC 三箭齐发，暗示下一轮项目竞争的制高点将从功能多少转向安全纵深。

3. **"关闭即解决"的处理方式严重损害维护者公信力**：OpenClaw #121058 与 NanoBot #5327（关闭但无修复 PR）共同暴露了 issue 管理与修复可追溯性之间的脱节。对于开发者而言，**提交 PR 时绑定修复的 issue，并在关闭 issue 时附上 fix commit 链接**，应成为社区协作的默认规范。

4. **国产模型/服务商接入需求上升为显性路线图**：CoPaw 的阿里云百炼 Token Plan 与 Volcengine Agent Plan PR、NanoBot 的 QwenCloud 兼容请求，反映国内开发者对低成本计划制 API 的刚需，出海与本地化并行的 Provider 策略正在成型。

5. **架构收敛与"有界第一版"成为共识**：ZeroClaw 的 Goal mode 明确拒绝大而全的野心、IronClaw 的 Reborn 架构在清理退役组件、Hermes 在收敛超时逻辑——**项目开始有意识控制复杂度**，这对开发者选型有参考意义：优先选择边界清晰、模块内聚的项目作为基座。

6. **上游依赖治理是隐藏风险点**：Moltis 因 gogcli 仓库迁移导致构建全挂、OpenClaw 因 DeepSeek 前缀语法触发降级调度，说明对上游路径和外部行为的主动监控（而非被动修复）应该被纳入 CI。

---

**给技术决策者的建议**：若追求稳定可靠的轻量部署，NanoBot 是当前生态中健康度最优选择；若需桌面端 + 多渠道能力，Hermes 值得关注但需留意 Windows 进程管理问题；若面向中国市场或依赖国产模型，CoPaw 的迭代速度和 Provider 覆盖最贴合；若关注长期架构安全，ZeroClaw 的 Rust + 可验证意图路线有差异化优势，但需接受 PR 审查周期较长的现状。生态整体仍处于快速演进期，建议对 P1 级消息可靠性问题保持跟踪，待核心链路稳定后再做深度绑定。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时 NanoBot 保持高强度迭代：共 10 条 Issue 更新（5 条关闭 / 5 条开放中）、34 条 PR 更新（18 条待合并，16 条已合并/关闭），无新版本发布。**安全修复是今日主线**，`exec.allowPatterns` 白名单绕过、WebFetch 凭据泄露、工作区路径逃逸、Docker 权限下降四个方向均已合并修复，安全边界快速收敛。**WebUI 前端迭代明显加速**，同时展开本地化（10 语言）、临时侧边会话、会话协作提及等多项功能开发。合并率约 47%，维护者响应速度良好。整体项目健康度评级：**优秀**。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并的 PR 中，有多项重要成果：

**安全体系加固（重点）**

| PR | 内容 | 对应 Issue |
|---|---|---|
| [#5345 fix(exec): allowPatterns shell-chain bypass 修复](https://github.com/HKUDS/nanobot/pull/5345) | 阻止通过 shell 链绕过命令白名单，修复 `tools.exec.allowPatterns` 配置被绕过执行任意命令的漏洞 | #5306 |
| [#5258 fix(web): 凭据 URL 不发送给远程 Jina 读取器](https://github.com/HKUDS/nanobot/pull/5258) | 用户信息与 token/签名类查询参数改走本地可读性路径，防隐私泄露 | #4884 |
| [#5329 fix(exec): 防护裸路径与具名用户主目录路径](https://github.com/HKUDS/nanobot/pull/5329) | 修复 `~`、`~user` 等 shell 展开绕过工作区边界的问题 | — |
| [#5320 fix(docker): 恢复权限下降所需 capabilities](https://github.com/HKUDS/nanobot/pull/5320) | 保留 `cap_drop: ALL` 的同时恢复 root 引导路径所需的三个 capability，并启用 `no-new-privileges` | — |

**功能与架构**

- [#4205 邮箱支持的子代理结果](https://github.com/HKUDS/nanobot/pull/4205)：引入内存邮箱协议承载 subagent 任务/结果记录，`SubagentManager` 不再依赖合成入站消息，是子代理机制的重要架构简化。
- [#5361 fix(weixin): QR 登录令牌持久化到 config.json](https://github.com/HKUDS/nanobot/pull/5361)：修复无 `channels` 配置时微信 WebUI 扫码登录后 token 丢失的问题。

**模型兼容**

- [#5230 fix(gemini): 保留导入工具调用并做签名回退](https://github.com/HKUDS/nanobot/pull/5230)：修复 Gemini 3 跨 provider 导入会话时 function-call 重放被拒的问题。

**项目推进判断**：安全修复集中在“命令执行边界”和“外部服务数据暴露”两条线上，说明项目已系统性地做安全审计；subagent 邮箱协议落地后，后续并发子任务与结果追踪的复杂度将显著降低。

## 4. 社区热点

| 项目 | 讨论热度 | 状态 |
|---|---|---|
| [#5327 推理时重复输出相同消息](https://github.com/HKUDS/nanobot/issues/5327) | **11 条评论**（今日最多） | 已关闭 |
| [#5295 Docker Compose 部署失败：entrypoint.sh Permission denied](https://github.com/HKUDS/nanobot/issues/5295) | 5 条评论 | 已关闭 |
| [#4010 文字转语音 / 语音输出支持](https://github.com/HKUDS/nanobot/issues/4010) | 3 👍、3 条评论，开放约 80 天 | 开放中 |

**热点分析**：

- **#5327** 的 11 条评论说明“推理时重复同一句话”并非孤例，而是相当一部分用户遇到的输出一致性问题。该 Issue 虽已关闭，但公开数据中未找到对应修复 PR，需关注回归风险。
- **#5295** 反映部署文档与实际行为的不一致直接影响新用户上手体验，属于阻碍用户落地的关键问题。
- **#4010** 的长期热度验证了“语音输入已有、输出缺失”的核心痛点，是产品闭环的重要缺口。

## 5. Bug 与稳定性

按严重程度排列：

### 严重（安全漏洞）

| Issue | 状态 | 修复 PR |
|---|---|---|
| [#5306 `exec.allowPatterns` shell-chain 绕过可执行未授权命令](https://github.com/HKUDS/nanobot/issues/5306) | 已关闭 | ✅ [#5345](https://github.com/HKUDS/nanobot/pull/5345) 已合并 |
| [#4884 WebFetch 将完整用户 URL 发送至 Jina](https://github.com/HKUDS/nanobot/issues/4884) | 已关闭 | ✅ [#5258](https://github.com/HKUDS/nanobot/pull/5258) 已合并 |
| [#5329 ExecTool 通过 `~user` 等路径逃逸工作区边界](https://github.com/HKUDS/nanobot/issues/5329) 相关 | 已关闭 | ✅ [#5329](https://github.com/HKUDS/nanobot/pull/5329) 已合并 |

### 中等

| Issue | 状态 | 修复 PR |
|---|---|---|
| [#5327 Agent 推理时随机重复同一消息](https://github.com/HKUDS/nanobot/issues/5327) | 已关闭，**未见对应修复 PR** | 需确认 |
| [#5295 Docker Compose 入口脚本权限错误导致部署失败](https://github.com/HKUDS/nanobot/issues/5295) | 已关闭 | 未公开对应 PR |
| [#5368 Agent 回合未结束时 WebUI 已显示复制/分叉按钮](https://github.com/HKUDS/nanobot/issues/5368) | 开放中 | ✅ [#5371](https://github.com/HKUDS/nanobot/pull/5371) 已提出 |

### 低

- [#5349 设置测试因 `timezone_name` 缺失存在每日约 5 小时的确定性失败窗口](https://github.com/HKUDS/nanobot/pull/5349) → 修复 PR 已提交，待合并。

### 稳定性观察

4 个安全性质 Bug 在 24 小时内全部关闭并完成修复合并，响应速度优秀；但 #5327 和 #5295 的关闭未公开对应的修复 PR，建议维护者附上 fix PR 链接，便于社区追踪。

## 6. 功能请求与路线图信号

**已有对应 PR 的高概率纳入项：**

- **WebUI Agent 活动本地化**（[#5366](https://github.com/HKUDS/nanobot/issues/5366)）→ PR [#5367](https://github.com/HKUDS/nanobot/pull/5367) 已覆盖 10 种支持语言，并支持切换语言后即时更新已渲染的活动文案。
- **WebUI 临时侧边会话**（[#5364](https://github.com/HKUDS/nanobot/pull/5364)）→ 通过 `/side` 在主题旁开临时对话，支持多标签独立草稿与并行流式发送，对应需求方来自网页端多任务切换场景。
- **WebUI 跨会话协作通过提及**（[#5358](https://github.com/HKUDS/nanobot/pull/5358)）→ 为会话分配服务器持有的稳定 `@name`，通过 composer mentionpicker 选择对等会话，强化团队协作能力。
- **隐藏未完成回合的复制/分叉操作**（[#5371](https://github.com/HKUDS/nanobot/pull/5371)）→ 修复 #5368 的 UI 状态冲突问题。

**长期路线图信号：**

- **[#4010 TTS 语音输出](https://github.com/HKUDS/nanobot/issues/4010)**：开放约 80 天、3 👍，持续无 PR。NanoBot 已支持语音输入，输出端打通可形成完整语音闭环，建议排期评估。
- **[#5350 QwenCloud Provider 兼容路径](https://github.com/HKUDS/nanobot/issues/5350)**：新提出，请求在 DashScope 之外新增 QwenCloud 国际平台路径，面向国际 Qwen 开发者，成本低、收益明确，很可能进入 backlog。
- **[#5275 Matrix 线程消息应形成独立上下文](https://github.com/HKUDS/nanobot/issues/5275)**：与 Discord/Slack 线程行为对齐。
- **[#4329 原生 TypeScript 终端 UI](https://github.com/HKUDS/nanobot/pull/4329)**：PR 开放约 2 个月，工程量大，短期未必合入，但方向受关注。

## 7. 用户反馈摘要

- **“推理时重复同样的话”损害可靠性信任**：fablau 在 [#5327](https://github.com/HKUDS/nanobot/issues/5327) 中描述 Agent 随机重复 “Good points, let me investigate the issue” 等口头禅式语句，11 条评论表明该问题对用户感知的“AI 稳定性”伤害不小。
- **按文档部署失败影响新用户转化**：Bennett-Yang 在 [#5295](https://github.com/HKUDS/nanobot/issues/5295) 严格按 `deployment.md` 执行却遇到 `entrypoint.sh: Permission denied`，暴露出部署文档测试覆盖不足。
- **语音用户期待“能听会说”**：olgagaga 在 [#4010](https://github.com/HKUDS/nanobot/issues/4010) 中指出“NanoBot 已经能理解语音输入，却不能语音回复，即使频道原生支持语音消息”。这是产品能力闭环的明显缺口，且已持续近 3 个月。
- **WebUI 体验进入“精细打磨”阶段**：ZhouJ-sh 连续提交本地化（#5366）、动作时机（#5368）相关 UI 细节问题，说明 WebUI 基础功能已基本成熟，用户开始关注语言、状态一致性等细节质量。

## 8. 待处理积压

| 项目 | 类型 | 搁置时长 | 状态 | 关注原因 |
|---|---|---|---|---|
| [#4010 TTS 语音输出支持](https://github.com/HKUDS/nanobot/issues/4010) | Issue | 约 80 天 | 3 👍，无 PR | 高需求低频响，语音闭环核心缺口 |
| [#4329 TypeScript 终端 UI](https://github.com/HKUDS/nanobot/pull/4329) | PR | 约 2 个月 | 待审，无冲突 | 体量大、方向明确，但推进缓慢 |
| [#5204 声明式 Responses 能力配置](https://github.com/HKUDS/nanobot/pull/5204) | PR | 约 12 天 | **标记 conflict** | 涉及 OpenAI/Copilot/DeepSeek 多 provider 架构，需维护者介入解决冲突 |
| [#5291 子代理对话记录持久化](https://github.com/HKUDS/nanobot/pull/5291) | PR | 约 6 天 | **标记 conflict** | 子代理审计/追溯能力，运维价值高 |
| [#5275 Matrix 线程独立上下文](https://github.com/HKUDS/nanobot/issues/5275) | Issue | 约 7 天 | 1 评论，无 PR | 渠道行为一致性和 thread 工作流体验 |

---

> **日报数据窗口**：2026-08-12 至 2026-08-13（24 小时）
> **数据来源**：[HKUDS/nanobot](https://github.com/HKUDS/nanobot) GitHub Issues/PRs/Releases
> **评估结论**：项目活跃度极高，安全修复及时，WebUI 与消息架构进入加速迭代期；建议优先处理 #5204 / #5291 的 PR 冲突，并对 #5327 的“已关闭但无修复 PR”做复核。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时 Hermes Agent 仓库保持高活跃：Issue 更新 50 条（新开/活跃 43 条、关闭 7 条），PR 更新 50 条（待合并 36 条、合并/关闭 14 条），无新版本发布。社区热度集中在 P1 级稳定性问题上——Windows 桌面端重启收割 gateway 致消息通道静默（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)、[#85044](https://github.com/NousResearch/hermes-agent/issues/85044)）与压缩后 agent flush 误导性报错（[#82001](https://github.com/NousResearch/hermes-agent/issues/82001)）分别获得 14/15 条评论。好消息是长期困扰用户的 `hermes update` 误删 root npm 依赖问题今日收官，4 个关联修复 PR 与 2 个长线 issue 一并关闭（[#43564](https://github.com/NousResearch/hermes-agent/issues/43564)、[#64354](https://github.com/NousResearch/hermes-agent/issues/64354)）。整体判断：项目处于高频迭代期，稳定性修复与架构性 PR（单 gateway 多 agent、统一超时层）并行推进，但新暴露的 P1 回归集中在桌面端进程管理，响应速度需要关注。

## 2. 项目进展

今日合并/关闭 14 个 PR，可见的核心进展如下：

**`hermes update` 依赖保留问题收官（今日最大进展）**

- [#82402](https://github.com/NousResearch/hermes-agent/pull/82402)（原子化 npm workspaces 安装）、[#53537](https://github.com/NousResearch/hermes-agent/pull/53537)（workspace 安装后恢复 root deps）、[#77413](https://github.com/NousResearch/hermes-agent/pull/77413)（单趟 npm install 保留 root deps）、[#44772](https://github.com/NousResearch/hermes-agent/pull/44772)（root deps 结构调整）四个修复今日集中关闭，从不同层面解决了 `hermes update` 反复清掉 `agent-browser`、导致浏览器工具在更新后"神秘失效"的问题。
- 关联 issue [#43564](https://github.com/NousResearch/hermes-agent/issues/43564)（6 月 10 日创建）与 [#64354](https://github.com/NousResearch/hermes-agent/issues/64354)（7 月 14 日创建）同日关闭，这段持续两个月的"更新即破坏"历史欠账正式了结。

**功能与体验落地**

- [#85186](https://github.com/NousResearch/hermes-agent/pull/85186) 关闭：cua-driver 改为安装时预置，工具集启用路径自动补装，Computer Use 从"手动安装"变成"配置即用"。
- [#85201](https://github.com/NousResearch/hermes-agent/pull/85201) 关闭：基于 dev-docs 契约的 Pipedream MCP profile 身份 lease 机制，简化第三方 MCP 工具接入。
- [#84172](https://github.com/NousResearch/hermes-agent/issues/84172)、[#80095](https://github.com/NousResearch/hermes-agent/issues/80095)、[#78410](https://github.com/NousResearch/hermes-agent/issues/78410) 关闭：分别为 webhook 平台工具集配置生效、WhatsApp 连接时静默 npm install 修复、OpenViking 云端健康检查修复。

**待合并 PR 看点**

- [#85129](https://github.com/NousResearch/hermes-agent/pull/85129)（P1）：恢复 cron 投递与 react/unreact 目标的 adapter 透传行为。
- [#85147](https://github.com/NousResearch/hermes-agent/pull/85147)：统一 deadline 层 Phase 1（#85125），收敛超时/hang bug 类。
- [#85146](https://github.com/NousResearch/hermes-agent/pull/85146)：proactive prune 后检索去重缓存失效修复。
- [#85139](https://github.com/NousResearch/hermes-agent/pull/85139)：声明式 OAuth PKCE 插件支持。
- [#85197](https://github.com/NousResearch/hermes-agent/pull/85197)：Telegram CJK 富文本门控改为 opt-out。
- [#85196](https://github.com/NousResearch/hermes-agent/pull/85196)：WhatsApp 桥重连退避 + 抖动。
- [#85199](https://github.com/NousResearch/hermes-agent/pull/85199)：Telegram 三个漂移的 chat-type 分类器合并（修复 [#85198](https://github.com/NousResearch/hermes-agent/issues/85198)）。
- [#85144](https://github.com/NousResearch/hermes-agent/pull/85144)：新增 interface-design UI/UX craft skill。
- [#85164](https://github.com/NousResearch/hermes-agent/pull/85164)：修复 ACP/oneshot 代理忽略 reasoning_config 的问题。
- [#85151](https://github.com/NousResearch/hermes-agent/pull/85151)：修复 codex persist 测试 CI flake。

## 3. 社区热点

今日讨论最集中的 Issue：

- **#82001 — Agent 压缩后 flush 失败并误报 "full disk"**（15 评论，P1）：[链接](https://github.com/NousResearch/hermes-agent/issues/82001)。LCM/上下文压缩关闭会话时客户端仍在写入，agent turn 以 `session_persistence_failed` 失败，用户被提示"这通常是磁盘已满"。报告者强调磁盘与 `state.db` 均健康，根因是 session 身份交接（handoff）缺口。社区反应强烈：误导性错误提示把排查方向引向磁盘，严重浪费排障时间。
- **#83683 — Windows 桌面端重启收割 gateway 且不重启**（14 评论，P1）：[链接](https://github.com/NousResearch/hermes-agent/issues/83683)。Hermes 0.20.0 桌面应用每次重启都强杀运行中的 messaging gateway 且不重新拉起，WeChat/QQ/Telegram 全部静默，直到手动重启 gateway。用户明确标注为 regression。今日新增的 [#85044](https://github.com/NousResearch/hermes-agent/issues/85044) 是同族问题的变体（Scheduled Task 托管的独立 gateway 同样被收割），被标记为 duplicate——说明这不是个例，而是 Windows 上 gateway 生命周期管理的系统性缺陷。
- **#43564 — `hermes update` 剪除 agent-browser 依赖**（12 评论，今日关闭）：[链接](https://github.com/NousResearch/hermes-agent/issues/43564)。社区积怨最深的更新流程 bug 之一，用户反复经历"update 成功但浏览器工具坏掉"的怪圈。今日随修复 PR 收官而关闭，是社区情绪的积极转折点。
- **#82887 — terminal 工具遇二进制路径崩溃**（8 评论，P2）：[链接](https://github.com/NousResearch/hermes-agent/issues/82887)。`venv/bin/python3 script.py` 这类常规命令直接触发 `ValueError: embedded null character in path`，安全 guard `_read_script_in_env` 过严。
- **#68321 — 桌面端 assistant 消息消失**（7 评论，P3）：[链接](https://github.com/NousResearch/hermes-agent/issues/68321)。切换会话再切回后所有 assistant 消息从渲染层消失，用户消息保留，DB 完好。

## 4. Bug 与稳定性

按严重程度排列，标注修复状态：

**P1（严重）**

- [#82001](https://github.com/NousResearch/hermes-agent/issues/82001)：压缩后 agent flush 不采用 live continuation，turn 失败并误报 "full disk"。**尚无 fix PR**。
- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683)：Windows 桌面重启强杀 gateway 且不重启（0.20.0 回归）。**尚无 fix PR**。
- [#85044](https://github.com/NousResearch/hermes-agent/issues/85044)：Windows desktop serve 启动时收割 Scheduled Task 托管的独立 gateway 且不替换（#83683 duplicate）。**尚无 fix PR**。
- [#85129](https://github.com/NousResearch/hermes-agent/pull/85129)（PR）：cron 投递与 react/unreact 目标经 `resolve_send_target` 路由后丢失透传行为，存储的 platform-native 目标无法送达。**已有修复 PR 待合并**。

**P2（中等）**

- [#82887](https://github.com/NousResearch/hermes-agent/issues/82887)：`terminal` 工具引用二进制可执行文件时崩溃，根因在 `_read_script_in_env`。**尚无 fix PR**。
- [#85026](https://github.com/NousResearch/hermes-agent/issues/85026)：Free Tool Pool 余额充足但 Firecrawl 返回 HTTP 402 `insufficient_funds`，web_search/web_extract 不可用。**尚无 fix PR**。
- [#85029](https://github.com/NousResearch/hermes-agent/issues/85029)：macOS 桌面端卡在 CONNECTING，反复 "Waiting for Hermes backend" 死循环，且读取 dashboard token 时 404 "web UI disabled"。**尚无 fix PR**。
- [#85054](https://github.com/NousResearch/hermes-agent/issues/85054)：Webhook profile admission 在 extraction/copy 分支调用 `profiles_to_serve(multiplex=True)` 时丢失 `multiplex_profile_allowlist`，`None` 意味着服务所有 profile，安全边界被意外放宽。**尚无 fix PR**。
- [#74074](https://github.com/NousResearch/hermes-agent/issues/74074)：Windows 上 `hermes profile alias` 生成的 .bat wrapper 缺 `chat` 子命令且与 hermes.cmd 冲突。**尚无 fix PR**。
- [#42997](https://github.com/NousResearch/hermes-agent/issues/42997)：Email 网关 IMAP 轮询用 `UID FETCH RFC822`（非 peek）将 Gmail 未读邮件标记为已读。**尚无 fix PR**。

**P3（轻微/体验）**

- [#68321](https://github.com/NousResearch/hermes-agent/issues/68321)：桌面端切换会话后 assistant 消息渲染丢失（DB 完好）。
- [#85050](https://github.com/NousResearch/hermes-agent/issues/85050)：插件包可通过嵌套 mapping 绕过 secrets/capability grants 的顶层检查（安全）。
- [#85180](https://github.com/NousResearch/hermes-agent/issues/85180)：Ctrl+F 查找栏与标题栏窗口控制重叠，Windows 桌面端易误点。
- [#85191](https://github.com/NousResearch/hermes-agent/issues/85191)：原生桌面端新建会话不显示在会话列表。
- [#60920](https://github.com/NousResearch/hermes-agent/issues/60920)：中断消息在终端恢复后被 `_replay_output_history` 重复显示。

**今日关闭的 Bug**：`hermes update` 依赖问题双星 [#43564](https://github.com/NousResearch/hermes-agent/issues/43564)/[#64354](https://github.com/NousResearch/hermes-agent/issues/64354)、webhook 工具集配置 [#84172](https://github.com/NousResearch/hermes-agent/issues/84172)、桌面滚动条遮挡 [#85033](https://github.com/NousResearch/hermes-agent/issues/85033)、WhatsApp connect 静默重装 [#80095](https://github.com/NousResearch/hermes-agent/issues/80095)、OpenViking 健康检查 [#78410](https://github.com/NousResearch/hermes-agent/issues/78410)，以及作者自删的 [#85193](https://github.com/NousResearch/hermes-agent/issues/85193)。

## 5. 功能请求与路线图信号

- **统一超时/截止层**（[#85147](https://github.com/NousResearch/hermes-agent/pull/85147)）：#85125 Phase 1，将分散的超时/hang bug 修复收敛到单一 `agent/deadline.py` 原语，Draft 状态等待方案签核——这是稳定性路线图的重要基建信号。
- **单 gateway 多 agent**（[#62944](https://github.com/NousResearch/hermes-agent/pull/62944)）：大型架构 PR 已 rebase 到 main 并等待决策，若合并将改变 gateway 与多 profile 的进程模型，涉及 auth/config/sessions 等多个 sweeper 风险面。
- **声明式 OAuth PKCE 插件**（[#85139](https://github.com/NousResearch/hermes-agent/pull/85139)）：为 out-of-tree model-provider 插件提供通用 OAuth 2.0 Authorization Code + PKCE 路径，Hermes 统一管理浏览器登录与 loopback 回调。
- **Kanban observer 集**（[#85200](https://github.com/NousResearch/hermes-agent/pull/85200)）：按 RFC #58548 落地 5 个看板事件 observer，插件无需再轮询 board DB 获取 worker 退出与任务编辑。
- **Telegram CJK 富文本门控可配置**（[#85197](https://github.com/NousResearch/hermes-agent/pull/85197)）：将硬编码 CJK 降级改为 `extra.rich_cjk` opt-out，回应所有含中文消息被静默降级为 MarkdownV2 的抱怨。
- **用户新功能诉求**：
  - [#85192](https://github.com/NousResearch/hermes-agent/issues/85192)：将 Python/Bash 脚本作为 Tool Registry 一等工具，追求确定性执行与速度（用户对 LLM 解释 Markdown 的不精确性不满）。
  - [#85189](https://github.com/NousResearch/hermes-agent/issues/85189)：per-session 项目绑定，以 per-tab 项目成员关系替代全局 active_id。
  - [#85194](https://github.com/NousResearch/hermes-agent/issues/85194)：禁用可选模型升级时仍保留确定性标题生成。
  - [#85016](https://github.com/NousResearch/hermes-agent/issues/85016)：SSE 客户端断开后可配置为 detach 而非硬杀 in-flight agent turn，避免分钟级工具调用链作废。
  - [#64099](https://github.com/NousResearch/hermes-agent/issues/64099)：状态栏显示 reasoning effort 级别（被标 duplicate + needs-decision，未推进）。

## 6. 用户反馈摘要

- **Windows 消息通道可靠性是最大痛点**：zuowen7（[#83683](https://github.com/NousResearch/hermes-agent/issues/83683)）与 hdtvfans（[#85044](https://github.com/NousResearch/hermes-agent/issues/85044)）分别报告桌面端重启/启动后 gateway 被收割且不重启，WeChat/QQ/Telegram 静默，用户明确措辞"go completely silent"，并强调 0.20.0 之前无此问题。
- **误导性错误信息损害信任**：[#82001](https://github.com/NousResearch/hermes-agent/issues/82001) 中用户反复强调磁盘与 `state.db` 健康，但系统提示 "this is often a full disk"。这类误导性诊断比报错本身更让用户沮丧——排障方向完全跑偏。
- **更新流程历史欠账引发不满**：[#43564](https://github.com/NousResearch/hermes-agent/issues/43564)/[#64354](https://github.com/NousResearch/hermes-agent/issues/64354) 评论区累积了"每次 update 都坏一次"的抱怨，今日修复关闭是积极信号，但用户对更新机制的信赖重建仍需时间。
- **安全 guard 过度导致基本功能不可用**：[#82887](https://github.com/NousResearch/hermes-agent/issues/82887) 中 `venv/bin/python3 script.py`、`pip install ...` 这类常规命令直接崩溃，说明 terminal 安全检查需要更精细的路径处理策略。
- **IMAP 语义 bug 造成数据污染**：[#42997](https://github.com/NousResearch/hermes-agent/issues/42997) 中 Gmail 未读邮件被误标已读，对依赖邮件 gateway 的用户是实际的数据污染而非单纯功能缺失。
- **长任务被 SSE 断开误杀**：[#85016](https://github.com/NousResearch/hermes-agent/issues/85016) 的诉求代表 agentic 工作流用户的心声：几分钟的工具调用链不应因客户端断线而全部作废，至少应提供可配置选项。

## 7. 待处理积压

长期未响应/未解决的重要事项，提醒维护者关注：

- **#42997**（2026-06-09 创建，P2）：Email 网关 IMAP 轮询误标已读，两个月无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/42997)
- **#62944**（2026-07-12 创建）：single gateway/multiple agents 架构 PR 已 rebase 一个月，等待 review/decision。[链接](https://github.com/NousResearch/hermes-agent/pull/62944)
- **#68321**（2026-07-21 创建，P3）：桌面端 assistant 消息消失（DB 完好），三周未修复，影响核心使用观感。[链接](https://github.com/NousResearch/hermes-agent/issues/68321)
- **#74074**（2026-07-29 创建，P2）：Windows profile alias .bat wrapper 损坏，两周未处理。[链接](https://github.com/NousResearch/hermes-agent/issues/74074)
- **#55072**（2026-06-29 创建，P3）：gateway 认证错误信息未脱敏，修复 PR 已提交但 6 周未合。[链接](https://github.com/NousResearch/hermes-agent/pull/55072)
- **#64099**（2026-07-14 创建，P3）：状态栏显示 reasoning effort 的功能请求被标 duplicate + needs-decision，未推进。[链接](https://github.com/NousResearch/hermes-agent/issues/64099)
- **#77431**（2026-08-03 创建）：google-workspace SKILL.md 文档与实现不符的修复 PR 已挂 10 天未合。[链接](https://github.com/NousResearch/hermes-agent/pull/77431)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 2026-08-13

## 今日速览
过去 24 小时，PicoClaw 共有 3 个 Issue 更新、3 个 PR 更新，无新版本发布。Issue 侧新增 1 个功能请求（#3330），另有 2 个带 stale 标记的历史 Bug 仍在持续讨论；PR 侧 3 个改进均处于待合并状态，24 小时内既无新合并也无关闭，合并节奏明显放缓。整体活跃度中等，社区反馈持续但维护端落地速度放缓，当前主要风险是 PR 审查积压（最老 PR 已开放 18 天）。

## 版本发布
过去 24 小时无新版本发布。

## 项目进展
今日无 PR 被合并或关闭，主分支未发生可观测的代码变更。当前有 3 个待合并 PR，分别指向三个不同的功能/修复方向：

- **路由代理上下文管理修复**（[PR #3316](https://github.com/sipeed/picoclaw/pull/3316)）：修复 routed-agent 不尊重 history、summarization、compression 及 seahorse bootstrap 的问题，直接影响 Discord 等场景下的上下文连续性和自动压缩触发。
- **Telegram 私有聊天话题支持**（[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)）：修复仅判断 `Chat.IsForum` 导致私有 bot 聊天中话题消息无法识别的问题，补全 Telegram 平台适配。
- **Exa 原生搜索 provider**（[PR #3299](https://github.com/sipeed/picoclaw/pull/3299)）：为 `tools.web` / `web_search` 增加 Exa 提供方，支持时间范围过滤，可在配置中启用。

若以上 PR 被合并，将显著提升消息持久化、聊天平台兼容性和搜索能力，但目前均仍待维护者 review。

## 社区热点
- **[Issue #3281](https://github.com/sipeed/picoclaw/issues/3281) Web UI 输入卡顿**（评论 5，👍 1）：用户报告当会话历史较长时，输入框出现严重延迟。该 Issue 带 stale 标记，但今天仍有更新，说明讨论尚未收敛。背后的核心诉求是 Web 前端在长上下文场景下的渲染与状态管理性能优化。
- **[Issue #3269](https://github.com/sipeed/picoclaw/issues/3269) MCP 连接失败导致 agent 挂起**（评论 4，👍 1）：MCP server 连接失败时，agent loop 直接卡死，聊天界面停止回复，影响核心可用性。用户希望合理的超时与降级机制，而非静默挂起。

## Bug 与稳定性
未发现今日新报告的崩溃或回归问题，以下为持续被关注中的 Bug，均无关联的 fix PR。

| 严重程度 | Issue | 问题描述 | 状态 |
|---|---|---|---|
| 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP server 连接失败导致 agent 循环挂起，聊天界面停止响应，影响核心功能可用性 | OPEN，无 fix PR |
| 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 输入框在历史较长时明显卡顿，影响实际使用体验 | OPEN，无 fix PR |

此外，[PR #3316](https://github.com/sipeed/picoclaw/pull/3316) 在描述中明确指出 routed-agent 上下文不记忆历史、自动压缩不触发的现有缺陷，属于修复中的问题，可视为针对该 Bug 的待合并修复。

## 功能请求与路线图信号
- **[Issue #3330](https://github.com/sipeed/picoclaw/issues/3330)**（今日新开）：请求在 `delegate`、`spawn`、`subagent` 工具中支持调用时动态指定模型，而不仅限于静态配置。该诉求指向更灵活的模型路由能力，目前尚无对应 PR，可能成为后续版本的功能候选。
- **[PR #3299](https://github.com/sipeed/picoclaw/pull/3299)**（Exa 搜索 provider）：已有完整实现，若合并，`web_search` 将获得新的搜索后端选项，大概率进入下一版本。
- **[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)**（Telegram topics）：已有实现，属于平台功能补全，合入可能性较高。

综合来看，项目正在向模型控制粒度细化、多搜索后端集成、消息平台兼容性增强三个方向演进。

## 用户反馈摘要
- **Web UI 长历史卡顿**（[#3281](https://github.com/sipeed/picoclaw/issues/3281)）：用户在实际使用中长期会话后输入延迟明显，说明前端在长上下文下的性能优化是真实痛点。
- **MCP 故障恢复能力不足**（[#3269](https://github.com/sipeed/picoclaw/issues/3269)）：用户对 MCP 连接失败后 agent 无响应表示不满，期望具备超时控制或错误提示机制。
- **路由代理上下文丢失**（[PR #3316](https://github.com/sipeed/picoclaw/pull/3316) 描述）：用户在 Discord 频道路由场景下发现 agent 不记忆历史、自动压缩从不触发，属于影响任务连续性的重要缺陷。
- **Telegram 话题支持不完整**（[PR #3315](https://github.com/sipeed/picoclaw/pull/3315) 描述）：用户反馈私有 bot 聊天中开启话题模式后消息无法被正确识别，平台适配存在遗漏。

## 待处理积压
- **[PR #3299](https://github.com/sipeed/picoclaw/pull/3299)**：已开放 18 天（7/26 创建）至今未合并，功能完整但长期搁置，建议维护者安排 review。
- **[Issue #3269](https://github.com/sipeed/picoclaw/issues/3269)** 与 **[Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)**：均带 stale 标记且已开放超过 3 周，但讨论仍在继续，需维护者明确处置——是给出修复方案、标记已知问题，还是关闭。
- **[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)** 与 **[PR #3316](https://github.com/sipeed/picoclaw/pull/3316)**：均开放约 10 天（8/3 创建），无评论互动，仅有 0 个 👍，关注度不高，但涉及功能修复与平台适配，建议维护者优先确认。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 2026-08-13

## 今日速览

过去 24 小时 NanoClaw 整体呈中等活跃状态：新增/活跃 Issue 4 条，但关闭数为 0；PR 更新 9 条，其中 3 条已关闭/合并，6 条仍在待合并队列。无新版本发布。项目今日主要进展集中在配置细化、数据库迁移修复和 WhatsApp 消息可靠性修复；同时社区新上报了 3 个与模板、任务迁移、审批流相关的 Bug，均暂无对应 fix PR。整体看，修复类 PR 在推进，但 Issue 闭环率偏低，且 PR 待合并积压 6 条，维护者评审带宽可能需要关注。

## 项目进展

今日关闭/合并的 3 个 PR（数据未区分关闭原因，按“已关闭/合并”统计）：

- [PR #2624 feat: per-server disabledTools in McpServerConfig](https://github.com/qwibitai/nanoclaw/pull/2624)  
  MCP Server 配置支持按 server 维度禁用工具，提升多 MCP 服务场景下的细粒度控制能力。

- [PR #3145 fix(db): backfill destinations for existing wirings](https://github.com/qwibitai/nanoclaw/pull/3145)  
  新增 migration 021，为已有 messaging-group wirings 补齐缺失的 channel destinations；保留原有 destination 和自定义 local name，并跳过已有 destination 的 wirings。对升级用户的数据完整性有直接帮助。

- [PR #3086 fix(whatsapp): validate recipient exists before sending](https://github.com/qwibitai/nanoclaw/pull/3086)  
  修复 Baileys 在收件人未注册 WhatsApp 时仍返回“Message delivered”的假成功问题。此前错误号码会被记录为真实发送成功，现在会在发送前校验接收方是否存在。

这三项分别覆盖 MCP 配置、数据库迁移和通道可靠性，属于项目健康度维护类推进，没有引入新的用户侧功能。另注意，今日 6 个待合并 PR 中包含 core-team 的模板插件化系列，说明更大功能变更仍处于评审/集成阶段。

## 社区热点

按更新活跃度和评论数看，今日最受关注的内容包括：

- [Issue #2504 feat: add `ncl status` command for lightweight operational health check](https://github.com/qwibitai/nanoclaw/issues/2504)  
  这是当前唯一有评论的 Issue，说明用户对“轻量运行健康检查”有真实需求。现有 `ncl sessions list` 缺少容器存活、最后消息、近期错误等健康信号，`/add-dashboard` 又偏重且依赖外部组件。

- [PR #3218 feat(cli): accept bounded JSON from stdin](https://github.com/qwibitai/nanoclaw/pull/3218)  
  今日仍有更新，为 host 和 container 端 `ncl` 客户端增加 `--stdin-json` 输入模式，保证结构化参数传递的边界可控性。

- [PR #2909 feat(setup): template setup flow in the wizard and first-agent stamping](https://github.com/qwibitai/nanoclaw/pull/2909)  
  今日更新，是 Agent 模板插件化系列的一部分，依赖 #3220，属于 setup 向导增强。

- [PR #2346 fix(formatter): treat unknown slash commands as normal chat](https://github.com/qwibitai/nanoclaw/pull/2346)  
  今日更新，修复未知斜杠命令被错误当作 Claude Code 命令处理，导致回复被静默丢弃的问题。

- [Issue #3235 Unknown-sender approval: webhook/bot senders generate unbounded approval cards](https://github.com/qwibitai/nanoclaw/issues/3235)  
  今日新上报，讨论集中在自动化发送者触发无限审批卡片、拒绝状态不持久的问题。

社区诉求总体指向：**CLI 可观测性、可脚本化输入、审批边界控制、以及模板/插件系统的稳定性**。

## Bug 与稳定性

今日新上报或活跃的 Bug 按严重程度排列：

- **高：[Issue #3235 Unknown-sender approval 产生无限审批卡片](https://github.com/qwibitai/nanoclaw/issues/3235)**  
  当群组配置 `unknown_sender_policy = 'request_approval'` 时，平台 webhook 或其他 bot 发送者会像人类一样触发未知发送者审批。对周期性 webhook 来说会产生无限审批卡片，且无法合理批准，拒绝状态也不持久。暂无关联 fix PR。

- **高：[Issue #3233 Agent-scoped `ncl tasks` 对 2.1.54 之前创建的周期性任务不可见](https://github.com/qwibitai/nanoclaw/issues/3233)**  
  升级到 2.1.54 后，agent 容器内运行 `ncl tasks list` 返回 `No tasks.`，但任务实际仍在执行；同时 `tasks get / pause / resume / cancel / update` 对这些任务也全部失败。影响升级用户的既有任务管理，属于迁移回归类问题。暂无 fix PR。

- **中：[Issue #3234 Template 创建的 agent group 使用裸 UUID，缺少 `ag-` 前缀](https://github.com/qwibitai/nanoclaw/issues/3234)**  
  `ncl groups create --template <ref>` 生成的 ID 是裸 `randomUUID()`，而 `--folder` 路径会生成 `ag-<uuid>`。裸 UUID 被直接用作 OneCLI agent identifier 时，可能触发 `ensureAgent` 的校验失败。暂无 fix PR。

今日已关闭的修复 PR 中，[#3145](https://github.com/qwibitai/nanoclaw/pull/3145) 和 [#3086](https://github.com/qwibitai/nanoclaw/pull/3086) 分别解决了历史数据迁移和 WhatsApp 假成功问题，会降低相关 Bug 的复现率，但新上报的 3 个问题仍需要维护者跟进。

## 功能请求与路线图信号

- [Issue #2504 请求新增 `ncl status` 命令](https://github.com/qwibitai/nanoclaw/issues/2504)  
  用户希望不依赖外部 Dashboard 就能快速判断运行实例健康状况，包括容器存活、最后消息时间、近期错误等。这是一个轻量运维功能，可能适合随 CLI 体系一起纳入下一迭代。

- [PR #3218 `--stdin-json` 输入模式](https://github.com/qwibitai/nanoclaw/pull/3218)  
  为 CLI 增加有边界限制的 JSON 标准输入能力，属于脚本化/自动化友好方向的功能增强。

- [PR #3220 Agent Templates 升级为 Agent Plugins 1.0.0 目录结构](https://github.com/qwibitai/nanoclaw/pull/3220)  
  这是模板功能的格式迁移，属于引擎级变更，并包含 stamp-time symlink/caps/secret 安全加固。

- [PR #2909 Setup 向导中的 template flow 与 first-agent stamping](https://github.com/qwibitai/nanoclaw/pull/2909)  
  该 PR 明确依赖 #3220，属于模板插件化路线图的第二半部分。

- [PR #3231 feat(codex,opencode): honor plugin MCP cwd in both provider config writers](https://github.com/qwibitai/nanoclaw/pull/3231)  
  处理插件 MCP 工作目录在 Codex/OpenCode 配置写入中的一致性，属于 #3220 的配套能力。

综合来看，**Agent 模板插件化是当前最明确的路线图主线**，多个 core-team PR 围绕它展开；而 `ncl status` 和 stdin JSON 则代表社区对 CLI 运维能力的期待。

## 用户反馈摘要

- 来自 [Issue #2504](https://github.com/qwibitai/nanoclaw/issues/2504)：用户认为现有 `ncl sessions list` 无法提供“实例到底健康与否”的信号，`/add-dashboard` 需要外部依赖，不够轻量。核心痛点是**线上运维时缺少快速健康检查入口**。

- 来自 [Issue #3235](https://github.com/qwibitai/nanoclaw/issues/3235)：当自动化 webhook/机器人被误判为未知发送者时，审批卡片会无限累积，管理员无法合理处置，且拒绝决策不会持久化。核心痛点是**审批流没有区分“人工发送者”和“自动化发送者”**。

- 来自 [Issue #3234](https://github.com/qwibitai/nanoclaw/issues/3234)：用户通过模板创建 agent group 后，生成的 ID 不符合 OneCLI 的 `ag-` 前缀约束，导致 spawn 时被拒。核心痛点是**模板路径的 ID 生成不一致，破坏了创建链路**。

- 来自 [Issue #3233](https://github.com/qwibitai/nanoclaw/issues/3233)：用户升级到 2.1.54 后，agent 侧的 `ncl tasks` 对历史周期性任务“失明”，无法列表、暂停或取消。核心痛点是**升级迁移没有 rehome 遗留任务数据**。

## 待处理积压

需要维护者重点关注的长期未合并/未响应项：

- [PR #2346 fix(formatter): treat unknown slash commands as normal chat](https://github.com/qwibitai/nanoclaw/pull/2346)  
  自 2026-05-08 开放至今，仍在待合并状态。该修复关系到未知命令是否会导致消息被静默丢弃，属于基础消息链路的稳定性问题，建议优先评审。

- [PR #2689 fix(signal): DM platform ID consistency, isMention, and ask_question/approval delivery](https://github.com/qwibitai/nanoclaw/pull/2689)  
  自 2026-06-04 开放，涉及 Signal DM 首条消息被丢弃、平台 ID 不一致、审批消息投递等问题，对 Signal 用户影响较大。

- [Issue #2504 `ncl status` 功能请求](https://github.com/qwibitai/nanoclaw/issues/2504)  
  自 2026-05-15 创建，至今仅 1 条评论且无明确 roadmap 关联。考虑到这是社区明确的运维痛点，建议维护者给出是否纳入计划的回应。

- [PR #2909 setup wizard template flow 与 first-agent stamping](https://github.com/qwibitai/nanoclaw/pull/2909)  
  自 2026-07-02 开放，虽然今日有更新，但仍依赖 #3220。需要等待模板插件化主 PR 合并后才能继续，存在一定阻塞风险。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时 IronClaw 项目保持高活跃度：新增/活跃 Issue 25 条、关闭 12 条；PR 更新 50 条，其中 20 条已合并/关闭，30 条仍在等待合并。此外发布 2 个 `1.2.0-rc` 修复版本，主要修复容器健康检查和 Windows 文件发布问题。今日开发主线集中在 **WebUI 退役遗留页面清理、Telegram 通道 Bug 修复、自动化执行契约、以及非管理员模型偏好功能** 上。整体看，项目在向 “Reborn” 架构收敛，同时面临 30 条待合并 PR 的评审压力。

---

## 2. 版本发布

### ironclaw-v1.2.0-rc.3（2026-08-12）

- 运行时容器镜像已安装 `curl`，使 orchestrator 可以正常执行 `curl -fsS http://localhost:3000/` 健康检查。
- 此前镜像未内置 HTTP 客户端，导致健康检查永远无法执行、容器无法被标记为 healthy。

### ironclaw-v1.2.0-rc.2（2026-08-12）

- Windows 首次启动文件发布逻辑改用原生原子重命名语义，不再依赖硬链接，并容忍不支持的目录同步。
- Release smoke runs 会保留 Windows 账户身份，用于保护 standalone secrets key。

**注意**：两个版本均为 RC 修复版，未列出明确破坏性变更。升级时需关注容器镜像对 `curl` 的新依赖，以及 Windows 文件发布语义变化。

---

## 3. 项目进展

今日关闭/合并的 PR 主要围绕 WebUI 清理、CI 稳定性、模型偏好功能，具体包括：

- **移除退休 Missions 前端面**：[PR #7527](https://github.com/nearai/ironclaw/pull/7527) 删除独立 `/missions` 路由、页面、组件、API adapter 及 translations，对应 Issue [#7522](https://github.com/nearai/ironclaw/issues/7522)。
- **移除退休 Routines 前端面**：[PR #7526](https://github.com/nearai/ironclaw/pull/7526) 删除 `/routines` 相关路由与代码，对应 Issue [#7521](https://github.com/nearai/ironclaw/issues/7521)。
- **移除 Project 下 Mission 占位代码**：[PR #7528](https://github.com/nearai/ironclaw/pull/7528) 清理 `projects/:projectId/missions` 等未支持路由，对应 Issue [#7523](https://github.com/nearai/ironclaw/issues/7523)。
- **移除 Admin Dashboard 与 usage analytics UI**：[PR #7529](https://github.com/nearai/ironclaw/pull/7529) 删除未路由的 Admin 分析占位组件，对应 Issue [#7524](https://github.com/nearai/ironclaw/issues/7524)。
- **稳定 Windows/WebUI CI**：[PR #7417](https://github.com/nearai/ironclaw/pull/7417) 修复 Windows WebUI 依赖安装步骤、Unix-only trace test 导入问题，并增加 fail-closed workflow。
- **修复 stress 测试消息路由**：[PR #7568](https://github.com/nearai/ironclaw/pull/7568) stress 工作负载改为通过 session channel 消息接口发送请求，并补充 HTTP 回归测试。
- **非管理员用户模型偏好**：[PR #7439](https://github.com/nearai/ironclaw/pull/7439) 落地 per-user 模型偏好后端与 `/model` 命令，对应 Issue [#7420](https://github.com/nearai/ironclaw/issues/7420)。
- **代码知识图谱刷新**：[PR #7564](https://github.com/nearai/ironclaw/pull/7564) 自动刷新 codebase-memory 引导快照。

这些改动显著减少了与退休 engine-v2 Mission 模型的耦合，同时把 WebUI 向前端发布边界内收敛，整体推动 Reborn 架构落地。

---

## 4. 社区热点

今日评论数最高的 Issue 为 3 条，整体讨论集中在工程化与可靠性：

- **[#7360 Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)**（3 评论）  
  讨论核心：现有 nightly API-capacity 压力测试的 mock model 不产生 tool calls，导致 built-in 能力写入路径的回归无法被压力测试捕获。诉求是扩大 stress 覆盖范围，防止写入路径静默退化。

- **[#7407 Execute BatchPolicy::Parallel capability batches concurrently](https://github.com/nearai/ironclaw/issues/7407)**（3 评论，已关闭）  
  讨论核心：agent loop 已计算 parallel batch policy，但生产实现仍串行执行 capability batch。该 Issue 关注并发执行上限与模型面无变化的实现方式，反映社区对多工具调用吞吐的重视。

- **[#7554 Custom MCP server add flow shows validation error](https://github.com/nearai/ironclaw/issues/7554)**（1 评论）  
  来自 Slack 用户反馈：添加自定义 MCP server 时出现红色校验错误，无法继续。属于直接影响用户接入外部工具的可用性 Bug。

---

## 5. Bug 与稳定性

按严重程度排列今日报告的问题：

| 严重程度 | Issue | 问题描述 | 是否已有 fix PR |
|---|---|---|---|
| P1 | [#7538](https://github.com/nearai/ironclaw/issues/7538) | Telegram agent 收到 GIF/sticker 后完全卡死，连普通文本消息也不再响应 | 相关 fix PR [#7563](https://github.com/nearai/ironclaw/pull/7563) 开放中 |
| Launch checklist | [#7547](https://github.com/nearai/ironclaw/issues/7547) | Agent Staging 实例升级在 egress apply 步骤失败 | 暂无 |
| P2 | [#7541](https://github.com/nearai/ironclaw/issues/7541) | agent 无法把生成文件作为 Telegram 附件发送，只给本地路径 | 暂无 |
| P2 | [#7539](https://github.com/nearai/ironclaw/issues/7539) | Telegram 消息在 agent 开始工作后才显示，对话顺序错乱 | 暂无 |
| P2 | [#7540](https://github.com/nearai/ironclaw/issues/7540) | Telegram 长消息被拆分后，只有第一部分被处理 | 暂无 |
| P2 | [#7451](https://github.com/nearai/ironclaw/issues/7451) | agent 有时错误要求用户提供 API key/token | 暂无 |
| P2 | [#7542](https://github.com/nearai/ironclaw/issues/7542) | agent 未识别当前已在 Telegram 对话中，仍建议“发送到 Telegram” | 暂无 |
| P2 | [#7543](https://github.com/nearai/ironclaw/issues/7543) | Telegram routine 第一次执行成功但消息未送达 | 暂无 |
| P2 | [#7544](https://github.com/nearai/ironclaw/issues/7544) | agent 向用户暴露内部推理/规划步骤或工具文档 | 相关 PR [#7531](https://github.com/nearai/ironclaw/pull/7531) 开放中，但未直接宣称修复 |
| P2 | [#7545](https://github.com/nearai/ironclaw/issues/7545) | agent 错误声称没有实时行情工具，即使有通用 HTTP 能力 | 暂无 |
| P3 | [#7546](https://github.com/nearai/ironclaw/issues/7546) | Telegram sticker 被静默忽略 | 相关 fix PR [#7563](https://github.com/nearai/ironclaw/pull/7563) 开放中 |
| 其他 | [#7554](https://github.com/nearai/ironclaw/issues/7554) | 自定义 MCP server 添加流程出现校验错误 | 暂无 |

---

## 6. 功能请求与路线图信号

今日新出现的功能需求与路线图信号：

- **[#7537 Generic per-request thinking/effort control](https://github.com/nearai/ironclaw/issues/7537)**  
  用户/开发者希望为 LLM 请求增加通用的思考强度控制，并要求 provider adapter 映射到原生参数（例如 DeepSeek chat_template_kwargs）。这是模型层的重要增强，可能进入后续 RC 或 v1.2.0 正式版。

- **[#7565 Fix missing i18n coverage across exposed WebUI routes](https://github.com/nearai/ironclaw/issues/7565)**  
  多个已暴露的 WebUI 路由仍存在硬编码英文文案。对应已有 PR [#7567](https://github.com/nearai/ironclaw/pull/7567) 正在补全 11 种 locale 的本地化文案。

- **[#7044 Onboarding to channel-first approach](https://github.com/nearai/ironclaw/issues/7044)**（v1.4.0 epic）  
  用户首次进入 IronClaw 时面临空白页，缺少引导。OOBE 原型 PR [#6994](https://github.com/nearai/ironclaw/pull/6994) 仍在开放中。

- **[#7038 Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)**（v1.3.0 epic）  
  与 [#7042](https://github.com/nearai/ironclaw/issues/7042) 共同推动设计系统治理与 Storybook 集成。

- **[#7360 扩大 stress 覆盖](https://github.com/nearai/ironclaw/issues/7360)**  
  属于测试基建增强，当前无对应 PR，但已被标记为 scope: ci / performance / epic。

此外，非管理员 LLM 模型偏好 [#7420](https://github.com/nearai/ironclaw/issues/7420) 已关闭，并由 PR [#7439](https://github.com/nearai/ironclaw/pull/7439) / [#7440](https://github.com/nearai/ironclaw/pull/7440) 实现，预计随下个版本向普通用户开放。

---

## 7. 用户反馈摘要

- **Telegram 通道稳定性是最集中的痛点**：多个 QA Bug（[#7538](https://github.com/nearai/ironclaw/issues/7538)、[#7539](https://github.com/nearai/ironclaw/issues/7539)、[#7540](https://github.com/nearai/ironclaw/issues/7540)、[#7542](https://github.com/nearai/ironclaw/issues/7542)、[#7543](https://github.com/nearai/ironclaw/issues/7543)）反映用户对消息顺序、长消息、附件传输、定期任务送达均有明显不满。
- **agent 行为可预期性有待提升**：用户报告 agent 会错误索要凭据（[#7451](https://github.com/nearai/ironclaw/issues/7451)）、暴露内部推理（[#7544](https://github.com/nearai/ironclaw/issues/7544)）、错误声称缺少 crypto 行情工具（[#7545](https://github.com/nearai/ironclaw/issues/7545)）。
- **外部工具接入受阻**：真实用户通过 Slack 反馈 Custom MCP server 添加流程被校验错误拦截（[#7554](https://github.com/nearai/ironclaw/issues/7554)），直接影响第三方生态接入。
- **部署升级仍存在环境相关风险**：Agent Staging 实例在 egress apply 阶段失败（[#7547](https://github.com/nearai/ironclaw/issues/7547)），提示发布流程需要更多环境兼容性测试。

---

## 8. 待处理积压

以下 Issue / PR 已开放较长时间，建议维护者重点关注：

- **[PR #5910 fix: hydrate approval gates on notification open](https://github.com/nearai/ironclaw/pull/5910)**  
  创建于 2026-07-10，已开放 34 天。为 approval gate 订阅路径增加回归测试，风险等级 low，适合尽快评审。

- **[PR #6949 fix(product): accept model set command syntax](https://github.com/nearai/ironclaw/pull/6949)**  
  创建于 2026-07-31，来自新贡献者。支持 `/model set <name>` 文档等价语法，需要维护者确认产品语义后合并。

- **[PR #6994 feat(webui): OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/pull/6994)**  
  创建于 2026-08-01，与 OOBE epic [#7044](https://github.com/nearai/ironclaw/issues/7044) 直接相关。虽然带有 off-by-default 开关，但长时间未合并会影响 v1.4.0 验证进度。

- **[Issue #6993 Backend wiring for the OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/issues/6993)**  
  创建于 2026-08-01，是 OOBE 的后端部分，与 #6994 配套，目前仍处于开放状态。

- **[Issue #7044 Onboarding to channel-first approach](https://github.com/nearai/ironclaw/issues/7044)**（v1.4.0 epic）  
  创建于 2026-08-03，整体 onboarding 设计尚无合并实现。

- **[Issue #7038 Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)**（v1.3.0 epic）  
  创建于 2026-08-03，涉及多个 Phase，当前仍需推进设计系统治理文档与 Storybook 集成。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时，LobsterAI 项目保持中高活跃度：PR 更新 12 条，其中 7 条已合并/关闭、5 条待合并，集中在 skills/MCP 管理界面重构与 OpenClaw 技能键控修复；Issues 侧仅 1 条测试补强任务有状态更新，无新版本发布，无新增用户报告。整体看，项目当前处于 **UI/UX 整合与内部质量加固阶段**：多个 PR 将分散的 skills/MCP 视图统一化，同时两条 stale 测试补强 PR 获得推进。健康度良好，开发节奏稳定。

---

## 2. 版本发布

今日无新 Release 发布。

---

## 3. 项目进展

今日共 7 条 PR 关闭/合并，主体为 **skills/MCP 管理界面统一重构**，另有若干 OpenClaw 核心逻辑修复，后者以 PR #2483 最值得关注。

### 已合并/关闭 PR

- **PR #2487 — 统一 skills 与 MCP 视图**（`refactor(skills): merge skills and mcp views into unified skills-and-connectors view`）  
  将原本分离的 skills 和 MCP 管理入口合并为一个统一的 "skills-and-connectors" 视图，是 UI 架构收敛的关键一步。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2487

- **PR #2486 — MCP 卡片/详情 UI 与 kits/skills 样式统一**（`refactor(mcp): unify MCP card/detail UI with kits and skills styling`）  
  抽取共享组件 `CardOverflowMenu`、`managementTypography`，新增 `McpCard`、`McpDetailModal`，重构 MCP 管理器的列表/详情流程。UI 一致性进一步提升。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2486

- **PR #2485 — 常驻每日签到功能**（`feat(activity): support evergreen daily check-in`）  
  将旧版签到（PR #2408）调整为 evergreen 常驻形态，复用既有服务端与管理端能力，并增加活动状态自动刷新、账户菜单积分入口改为跳转网页。已有 Vitest 7/7 通过。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2485

- **PR #2481 — 侧边栏任务搜索移入 Header 操作区**（`feat(sidebar): move task search to header actions`）  
  将带标签的搜索入口改为纯图标操作，统一 macOS/Windows 布局，并补充诊断与回归覆盖。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2481

- **PR #2482 — skills 管理器拆分 "我的" 与 "内置" 标签页**（`feat: skills manager split mine builtin tabs`）  
  按来源拆分技能列表，便于用户区分自定义技能与内置技能。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2482

### 待合并 PR（重点关注）

- **PR #2483 — 按 frontmatter name 键控 OpenClaw 技能条目**（`fix(openclaw): key skill entries by frontmatter name`）  
  修复目录名与 frontmatter name 不一致导致 UI 开关对 OpenClaw 启用状态不生效的问题。标签为 `area: main, area: openclaw`，是 **OpenClaw 核心链路修复**，建议优先 review。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2483

---

## 4. 社区热点

今日 Issue/PR 评论区活跃度整体偏低，无高互动讨论。相对值得关注的是：

- **Issue #1162 — 为 `openclawMemoryFile` 和 `openclawLocalTimeContextPrompt` 补充 Vitest 单元测试**  
  创建于 2026-03-31，今日更新，1 条评论。背景指出这两个核心模块此前零测试覆盖——前者管理 MEMORY.md 记忆文件读写、SQLite 迁移和工作区切换同步，后者生成注入 AI 的本地时间上下文 Prompt。该 Issue 是社区对 **核心模块测试缺口**的明确诉求，已有关联 PR #1165。  
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1162

- **PR #2483** 虽无评论，但引用了 issue #244x 的 skill-key 匹配问题，属于用户实际使用中遇到的 **"UI 开关静默失效"** 问题，诉求直接、修复明确。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2483

---

## 5. Bug 与稳定性

今日无新增 Bug 类 Issue。但在待合并 PR 中，有 **1 条直接修复稳定性/一致性问题**：

- **技能开关静默失效（中严重度）** — PR #2483 修复 OpenClaw `skills.entries` 键控错误，此前目录名与 frontmatter name 不一致会导致 UI 使能开关被 OpenClaw 静默忽略。对依赖技能开关的用户影响直接。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2483

另有两条约 4 个月前创建的 stale PR 仍在待合并队列，涉及定时任务体验问题，虽非今日新增，但长期未合并，建议关注：

- **PR #1163 — 定时任务"立即运行"无反馈、状态延迟约 15 秒**（含乐观更新与 Gateway 状态同步）  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/1163

- **PR #1232 — 定时任务首次执行结果不推送 UI，需第二次执行才可见**  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/1232

---

## 6. 功能请求与路线图信号

今日无新功能请求 Issue。但从合并的 PR 可看出以下路线图信号：

- **"日常活动" 功能转正** — PR #2485 将签到活动调整为常驻形态，说明积分、签到、活动系统正在从一个短期运营功能演变为 **平台级常驻能力**，后续可能在此基础上扩展更多用户激励玩法。
- **UI 架构收敛** — PR #2487 将 skills 与 MCP 合并为统一视图，叠加 PR #2486 的样式统一、PR #2482 的标签页拆分，开发团队正在系统性地整合 AI 助手的外部连接器/技能管理界面，预计下一版本会有一个更统一、可扩展的 "连接器与技能中心"。
- **企业版（Enterprise Edition）** — PR #2484 以 "Feat/enterprise edition" 为标题提交，虽内容模板未完整填写即被关闭，但标签涉及 `renderer/docs/main/openclaw` 四大模块，暗示 **企业版多端能力布局**已在推进中。  
  🔗 https://github.com/netease-youdao/LobsterAI/pull/2484

---

## 7. 用户反馈摘要

今日 Issues 评论较少，可提炼的信息有限：

- **对核心模块测试覆盖的期待**：Issue #1162 由非核心贡献者发起，明确指出 `openclawMemoryFile.ts` 和 `openclawLocalTimeContextPrompt.ts` 零测试覆盖，并主动提交了 75 个 Vitest 单元测试（见 PR #1165）——说明贡献者对 **记忆模块的质量保障**有较强诉求，同时表明项目文档/贡献指南对测试要求有正向引导作用。  
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1162

- **技能管理可用性痛点**：PR #2483 引用的 issue #244x 反映，技能开关在 UI 上显示已启用，但 OpenClaw 实际未加载，用户需手动检查目录与 frontmatter 是否匹配才能发现问题——属于 **配置静默失效** 类痛点，容易造成用户困惑和信任损耗。

---

## 8. 待处理积压

以下为长期未合并或未响应的条目，建议维护者优先关注（按优先级排序）：

| 条目 | 类型 | 创建时间 | 状态 | 建议 |
|------|------|----------|------|------|
| [PR #2483](https://github.com/netease-youdao/LobsterAI/pull/2483) | fix(openclaw) | 2026-08-13 | OPEN | 新提交，修复技能键控 bug，建议尽快 review |
| [PR #1165](https://github.com/netease-youdao/LobsterAI/pull/1165) | test | 2026-03-31 | OPEN (stale) | 75 个 Memory 模块单测，补充核心模块覆盖，建议优先处理 |
| [PR #1163](https://github.com/netease-youdao/LobsterAI/pull/1163) | fix(定时任务) | 2026-03-31 | OPEN (stale) | 定时任务 "立即运行" 无交互反馈 + 状态延迟，影响面较广 |
| [PR #1156](https://github.com/netease-youdao/LobsterAI/pull/1156) | test | 2026-03-31 | OPEN (stale) | commandSafety / coworkMemoryJudge 测试补强，安全关键模块 |
| [PR #1166](https://github.com/netease-youdao/LobsterAI/pull/1166) | fix(agent) | 2026-03-31 | OPEN (stale) | 禁止自定义 agent 重名，避免列表歧义 |
| [PR #1232](https://github.com/netease-youdao/LobsterAI/pull/1232) | fix(scheduledTask) | 2026-04-01 | CLOSED (stale) | 定时任务首次执行结果不推送 UI，已关闭但状态不明，建议确认是否已合入 |
| [Issue #1162](https://github.com/netease-youdao/LobsterAI/issues/1162) | issue(test) | 2026-03-31 | OPEN (stale) | 测试补强任务，已有对应 PR，等待合并后关闭 |

---

**总结**：LobsterAI 今日开发重心在 **skills/MCP UI 统一与 OpenClaw 技能链路修复**，合并节奏快、测试覆盖意识强（多个 PR 附 Vitest 验证）。项目健康度良好，但存在 **测试补强类 PR（#1156、#1165）与定时任务修复类 PR（#1163、#1232）长期滞留** 的现象，建议维护者尽快安排 review 或明确关闭理由，避免贡献者流失。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-13

## 1. 今日速览

过去24小时内，Moltis 项目整体活跃度较低：无新 Issue 提交或关闭（0条），暂无新版本发布，仅收到1条待合并的 Pull Request。该 PR 针对 `moltis sandbox build` 在所有预构建镜像上失败的问题，是一笔及时且聚焦的修复，直接指向沙箱构建链路的稳定性。项目当前处于“低速维护/修复窗口”状态，社区讨论热度偏低，但已有外部贡献者主动介入修复，说明项目仍具备一定的外部参与度。建议维护者尽快 review 并合并该修复，以恢复沙箱镜像构建的可用性。

## 3. 项目进展

**今日合并/关闭 PR：0 条**

今日无 PR 被合并或关闭，项目主分支进度暂无明显推进。唯一活跃 PR #1191 尚处于开放待合并状态，尚未合入主干。

即便如此，若该 PR 被合入，其意义在于修复 `moltis sandbox build` 对所有预构建镜像的失败问题。这直接关系到沙箱功能的核心可用性，修复后可恢复用户从源码构建沙箱镜像的完整流程，属于打通关键路径的一步。

- 相关 PR： [moltis-org/moltis PR #1191](https://github.com/moltis-org/moltis/pull/1191)

## 4. 社区热点

今日仅有一项活跃 PR，同时也是社区唯一焦点：

- [#1191 [OPEN] fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191) — 作者：Lstarsky0

该 PR 指出，`moltis sandbox build` 在使用的 Dockerfile 中执行：

```
GOBIN=/usr/local/bin go install github.com/steipete/gogcli/cmd/gog@latest
```

但 `gogcli` 已迁移至 `openclaw` 组织，且其 `go.mod` 现在声明为 `module github.com/openclaw/gogcli`，导致 GitHub 重定向机制下安装失败。该作者将模块路径修正到 openclaw 组织，以修复构建流程。

**诉求分析：** 这反映出社区用户对沙箱构建功能有实际使用需求，而 gogcli 的仓库迁移造成了隐蔽的供应链路径失效。该问题属于典型的“外部依赖迁移引发的连锁故障”，暴露了项目对上游依赖路径的监控不足。社区的核心诉求是：沙箱构建应开箱即用，不应因为上游仓库组织变更而静默破坏。

## 5. Bug 与稳定性

**今日报告 Bug：1 项**（由 PR 修复中揭示，非新 Issue）

| 严重程度 | 问题描述 | 状态 |
|---------|---------|------|
| 高 | `moltis sandbox build` 在所有预构建镜像上失败。原因是 Dockerfile 中 `go install` 引用的 `github.com/steipete/gogcli` 模块路径已失效（仓库迁移至 openclaw 组织且 go.mod module path 变更），导致 Go 模块安装失败 | 已有修复 PR [#1191](https://github.com/moltis-org/moltis/pull/1191)，待合并 |

该问题影响面广（所有预构建镜像均受影响），但修复逻辑简单直接，只涉及一行路径更新。风险在于：如果上游还有其他类似迁移未更新，修复可能只是点状的。建议维护者合并 PR 后，系统性排查所有外部依赖路径的失效风险。

## 6. 功能请求与路线图信号

今日无新功能请求提交。但从 PR #1191 中可以读取到一个路线图信号：**沙箱构建链路的可靠性是社区关注的核心体验之一**。如果 `moltis sandbox build` 保持长期可用，用户对沙箱功能的依赖度会逐步加深，未来可能出现更多与沙箱相关的深度需求（如自定义镜像、离线构建等）。这提示维护者可以考虑将沙箱构建链路的自动化测试纳入 CI，防止类似依赖漂移问题再次发生。

## 7. 用户反馈摘要

从 PR #1191 的提交信息中可以提炼出明确但简洁的用户反馈：

- **真实痛点：** `moltis sandbox build` 对每个预构建镜像都会失败，属于阻断性故障，直接导致用户无法使用沙箱功能。
- **使用场景：** 用户正在实际使用沙箱构建能力，且在多个镜像上都复现了问题，说明沙箱功能是用户工作流中的常用组件。
- **满意之处：** 项目代码结构足够清晰，用户能快速定位到 Dockerfile 中的问题根源（gogcli 模块路径变更），并直接提供修复；这说明项目在可诊断性和可贡献性方面表现良好。
- **潜在不满：** 该问题没有被项目维护者主动发现，而是由社区用户定位和修复，可能反映出项目对上游依赖变更的主动监控不足。

## 8. 待处理积压

**当前唯一待处理项：**

- [moltis-org/moltis PR #1191](https://github.com/moltis-org/moltis/pull/1191)（待合并）
  - 提交时间：2026-08-13
  - 状态：开放，待维护者 review 与合并
  - 重要程度：高 — 修复了所有预构建镜像的沙箱构建失败问题，直接影响用户核心功能使用
  - 建议：尽快安排 review，若 dockerfile 修改无争议应优先合并，同时考虑补一条回归测试，将上游模块路径的合法性验证纳入 CI。

---

**项目健康度评估：** 今日项目处于低活跃但稳定状态。外部贡献者的积极介入是一个积极信号，但长期来看，0 Issue 更新和 0 合并可能意味着项目正处在暂时的平静期。关键风险集中在沙箱构建功能的可用性上，建议维护者保持对 PR 的响应速度，避免外部贡献者的修复被长时间搁置，从而挫伤社区贡献积极性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# QwenPaw（CoPaw）项目动态日报 — 2026-08-13

> 数据来源：`github.com/agentscope-ai/QwenPaw` | 覆盖窗口：2026-08-12 至 2026-08-13 24h

---

## 1. 今日速览

过去 24 小时 QwenPaw / CoPaw 项目保持高活跃度：发布 `v2.1.0-beta.4` 新版本；39 条 Issues 更新（新开/活跃 23 条，关闭 16 条）；50 条 PR 更新（待合并 26 条，已合并/关闭 24 条，闭环率 48%）。社区反馈集中暴露在三个方向：**多步骤任务中断与恢复**、**MCP 工具参数类型兼容性**、**网络异常自动恢复能力**。维护者响应速度良好，多条一周前提交的 Issue 和 PR 已在今日关闭或进入合并流程，项目整体处于快速迭代状态。

---

## 2. 版本发布

### v2.1.0-beta.4（2026-08-13）

该版本是 2.1.0-beta 系列的第 4 个迭代，包含 3 项变更：

| 变更 | 类型 | 说明 |
|---|---|---|
| fix(files): repair previews and dark mode styling | Bug 修复 | 修复文件预览功能及暗色模式下的样式错乱问题（PR #6915） |
| fix(tools): correct read_file tool description | Bug 修复 | 修正 `read_file` 工具的描述文本，提升模型调用准确性（PR #6898） |
| chore: bump the version to 2.1.0b4 | 版本升级 | 版本号提升至 2.1.0b4 |

**破坏性变更**：无。**迁移注意事项**：beta 用户直接升级即可，无需额外配置调整；建议验证文件预览（尤其暗色主题下）和文件读取类工具调用是否正常。

**链接**：https://github.com/agentscope-ai/QwenPaw/releases

---

## 3. 项目进展

今日共 24 条 PR 被合并/关闭，以下为已完成合并的重要 PR：

| PR | 内容 | 影响 |
|---|---|---|
| [#6983](https://github.com/agentscope-ai/QwenPaw/pull/6983) | **feat(console): improve editor tab overflow navigation** | 改进 Web IDE 多标签页体验：紧凑单行标签栏 + 滚动控制 + 可搜索的打开文件面板，支持显示完整路径、脏状态和待处理 diff 状态 |
| [#6977](https://github.com/agentscope-ai/QwenPaw/pull/6977) | **fix(computer-use): preserve accessibility context** | 修复计算机使用（Computer Use）场景：保留原生可访问性层级、修正 Windows 桌面坐标映射、正确暴露键盘焦点与 ValuePattern 控件 |
| [#6968](https://github.com/agentscope-ai/QwenPaw/pull/6968) | **fix(token-usage): stop counting image base64 as text tokens** | 修复 token 统计：不再将图片 base64 按文本启发式估算（此前一张 2MB 照片被计为 ~70 万 token，导致上下文占用显示虚高） |
| [#6982](https://github.com/agentscope-ai/QwenPaw/pull/6982) | **fix(openrouter): limit app attribution categories** | 修复 OpenRouter 应用归属分类：限制每请求最多两个分类（`personal-agent` + `cli-agent`），与 Hermes Agent 对齐 |

**项目整体向前推进**：前端编辑器体验、Computer Use 可靠性和 token 计费准确性均得到实质修复；OpenRouter 集成合规性同步落地。`v2.1.0-beta.4` 已包含上述文件预览等修复，预计后续 beta/RC 版本将逐步纳入 editor 和 token 计费的改进。

**链接**：https://github.com/agentscope-ai/QwenPaw/pulls

---

## 4. 社区热点

今日讨论热度最高的 Issues 及背后诉求：

### 🔥 #6921 — 多步骤任务静默停止（6 条评论，已连续活跃 2 天）
> "[Bug]: 经常在 'Now 2.1, 3.1, 3.2. Let me do all three.' 类似信息输出后无提示就停止了，需要我说'继续'才会继续任务" — 作者 rerbin

用户报告在 Windows 11 + QwenPaw 2.1beta2 上执行多步骤任务时，模型规划完下一步后不实际执行、无任何提示；用户发现输出消息均为"规划型"话术且在规划节点中断。**这是今日最受关注的核心体验问题，直接影响 Agent 自主执行能力**。目前无直接修复 PR。

**链接**：https://github.com/agentscope-ai/QwenPaw/issues/6921

### 🔥 #6973 — 支持阿里云百炼 Token Plan（5 条评论，今日新开）
> "[Question]: qwenpaw creator 能否支持使用阿里云百炼的 token plan" — 作者 tianke567

用户希望在 qwenpaw creator 中接入阿里云百炼的订阅制 Token Plan。这延续了国内用户对**低成本的订阅/计划制 API** 的持续需求（与 PR #6515 Volcengine Agent Plan 高度相关）。

**链接**：https://github.com/agentscope-ai/QwenPaw/issues/6973

### 🔥 #6811 — OpenAI Responses 续写摘要忽略 disable_thinking（5 条评论，今日关闭）
> "[Bug]: OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60-second cancellation as malformed output"

描述 Scroll 策略驱逐旧轮次时，OpenAI Responses 续写摘要调用阻塞主会话，且误将 60 秒取消报为格式错误输出。该 Issue 在今日关闭，表明已得到处理。

**链接**：https://github.com/agentscope-ai/QwenPaw/issues/6811

### 🔥 #6853 — prompts.py 文档信息与实际不符（5 条评论，今日关闭）
> "prompts.py lies to agents: Dream writes to digest/ not MEMORY.md"

中文与英文提示词均声称周期性 "dream" 流程会自动同步摘要到 MEMORY.md，但实际 ReMe 流水线从未实现该步骤。已关闭，疑似已修复或标记为待办。

**链接**：https://github.com/agentscope-ai/QwenPaw/issues/6853

### 🔥 #6847 — 被杀软拦截与强制关停（4 条评论）
> "同样的任务和模型，Qwenpaw 会被杀软打死，WorkBuddy 不会" — 作者 cmhaoso

用户贴出杀软拦截截图，执行任务时 QwenPaw 进程频繁被安全软件拦截甚至强制关停。已有对应修复 PR **#6986** 在今日提交（fix(#6847): fix antivirus software blocking issues）。

**链接**：https://github.com/agentscope-ai/QwenPaw/issues/6847

---

## 5. Bug 与稳定性

### 🔴 严重（影响核心 Agent 使用）

| # | Bug | 状态 | 是否有 fix PR |
|---|---|---|---|
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步骤任务规划后静默停止，需要用户说"继续"才继续；无任何界面提示 | 开放 | 无 |
| [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | 网络短暂中断恢复后 QwenPaw 无法自动重连，所有 LLM 请求持续超时，需手动重启；同日复现两次 | 开放 | 无 |
| [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | v2.0.1 空闲几十分钟后卡死，只能杀进程重启 | 开放 | 无 |

### 🟠 中高

| # | Bug | 状态 | 是否有 fix PR |
|---|---|---|---|
| [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | Windows 上概率性启动报错、崩溃退出（v2.0.1，pip 安装） | 开放 | 无 |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 工具调用时把"数字形式的字符串"以数字类型传参，如字符串 `"assetInfo": "1.000001"` 被传成 `1.000001`，导致调用失败 | 开放 | ✅ PR [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936)（Under Review） |
| [#6966](https://github.com/agentscope-ai/QwenPaw/issues/6966) | Telegram 渠道 `/new` 命令只清空内存上下文、不轮换 session ID（`telegram:{chat_id}` 恒定），上下文经 scroll history.db 无限增长 | 开放 | 无 |

### 🟡 中低

| # | Bug | 状态 | 是否有 fix PR |
|---|---|---|---|
| [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前的聊天记录不可见，UI 只剩内部 eviction index；原始记录仍在 history.db，但详情接口未读取 | 开放 | 无 |
| [#6979](https://github.com/agentscope-ai/QwenPaw/issues/6979) | 历史会话标题抓取到模型 thinking process 文本（如 "here's a thinking process"），由上下文压缩注入的消息被标题生成器截取所致 | 开放 | 无 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息结束时间显示异常：实际思考 2 分钟，页面显示仅几秒 | 开放 | 无 |

### ✅ 今日已关闭的 Bug

- [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) — OpenAI Responses 续写摘要忽略 `disable_thinking` 且误报 60s 取消（已关闭）
- [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — prompts.py 声称 Dream 写入 MEMORY.md 但实际并未实现（已关闭）
- [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047) — 升级至 2.0.0 后新聊天重开旧会话、chats.json 排序缺失（已关闭）
- [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) — 插件可静默创建 cron 任务并向会话注入用户可见消息，无审批机制（安全，已关闭）
- [#6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) — sync.py 用随机 AgentState UUID 导入历史，而非真实 session_id，导致 18–50% 行孤儿化（已关闭）

**相关 fix PR 进展**：#6936 修复 MCP 字符串类型参数被强转数字（对应 #6839）；#6947 修复 Scroll 重建衔接处孤儿 tool 消息（对应 #6541）；#6884 增强 Auto-Dream 对畸形结构化输出的容错；#6986 修复杀软误拦（对应 #6847）。

---

## 6. 功能请求与路线图信号

### 📌 今日新增的用户需求（可能与下一版本相关）

| Issue | 需求 | 对应已有 PR 潜力 |
|---|---|---|
| [#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970) | ① Chat 对话界面可无侧边栏/头部栏单独嵌入；② URL 携带 apikey 跳过权限验证；③ Session 列表支持按日期和 sessionId 条件精确筛选 | 与 #6978 会话命令、《嵌入》场景相关 |
| [#6980](https://github.com/agentscope-ai/QwenPaw/issues/6980) | 生成的 Word/PPT/HTML 文件可在右侧直接预览打开（类似 DeerFlow），无需每次下载 | 前端 UX 改进，暂无直接 PR |
| [#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973) | qwenpaw creator 支持阿里云百炼 Token Plan | 与 #6515 Volcengine Agent Plan 为同一类需求，表明国内计划制 API 接入是持续方向 |

### 📌 已具备 PR 支撑、大概率进入下一版本的能力

| PR | 功能 | 状态 |
|---|---|---|
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | 新增 `/sessions`、`/session` 斜杠命令，覆盖 Console/TUI 之外的 IM 渠道会话管理 | Open |
| [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | MCP 工具调用超时可配置（默认 120s），覆盖 stdio 和 HTTP 传输 | Open |
| [#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877) | Tauri 桌面端记住并恢复窗口位置与大小 | Open |
| [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) | Session 级多项目目录绑定（首个为主目录，文件工具和 shell cwd 以此解析） | Open |
| [#6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) | SIP 渠道新增 MiniMax TTS 支持 | Open |
| [#6791/#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) | Auto-Dream 集成韧性增强：单个 schema 无效不导致整个任务失败 | Open |

---

## 7. 用户反馈摘要

### 核心痛点

1. **任务中断体验**（#6921）：用户对"规划后不执行、无任何提示"感到困惑，必须手动输入"继续"才能推进。这不是单次偶发，而是多步骤任务中的常见现象。
2. **网络瞬断后无法自愈**（#6932）："网络中断是常见、正常的瞬态事件，期望恢复后自动重连"，目前需要手动重启进程，一天内复现两次，信任成本高。
3. **杀软误报**（#6847）：用户对比"QwenPaw 被杀软打死，WorkBuddy 不会"，反映对进程行为的信任问题，已有 PR 介入。
4. **历史消息与 UI 体验**（#6928、#6826、#6979）：历史消息无法滚动查看、消息耗时显示不真实、标题抓取到 thinking process 文本，多个 UI 层面的细节问题积累。
5. **MCP 类型系统不兼容**（#6839）："总是将像数字的字符串以数字格式传参导致调用失败"，这是模型输出规范与工具 Schema 的经典矛盾，已有修复 PR 在审。

### 使用场景

- **Agent 日常多步骤办公**：批量核验财务数据、逐步执行修正（#6921 的用户描述）
- **IM/Telegram 渠道**：作为个人助手常驻，长会话管理问题突出（#6966）
- **国内开发者将 QwenPaw 作为生产力工具**：频繁提出接入国产模型服务商低价订阅计划（#6973、#6515）

### 正向反馈

- #6585 用户开场即表示"非常不错的项目"，虽提交的是功能开关请求（接收字符数动态显示可关闭），但整体认可度高，且该 Issue 今日已关闭。
- 多条 Issue 在 6 天内得到关闭或 fix PR（#6811、#6853、#6916、#6926），维护者闭环速度受到社区正面评价。

---

## 8. 待处理积压

以下为长期未得到明确响应或仍未解决的重点 Issue/PR，建议维护者优先关注：

### 🔸 高优先级（影响面广）

| # | 标题 | 创建时间 | 已开放 | 备注 |
|---|---|---|---|---|
| [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | v2.0.1 空闲几十分钟后自动卡死，需重启进程 | 2026-08-07 | 6 天 | 4 条评论，用户持续补充信息 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息耗时显示异常（2 分钟显示为几秒） | 2026-08-08 | 5 天 | 元数据记录不准确，影响用户对模型性能的感知 |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 数字字符串被强转为数字类型传参 | 2026-08-09 | 4 天 | 已有 PR #6936 待合并 |
| [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) | 被杀毒软件拦截并强制关停进程 | 2026-08-09 | 4 天 | 已有 PR #6986 待审 |

### 🔸 长期未合并的 PR

| # | PR | 创建时间 | 已开放 | 备注 |
|---|---|---|---|---|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | feat: unify provider discovery, model metadata, routing, and agent controls | 2026-07-21 | 23 天 | 规模化重构，涉及面大，需充分测试 |
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | feat(providers): add Volcengine Agent Plan and Xiaomi MiMo V2.5 API | 2026-07-28 | 16 天 | 国内用户呼声高，与 #6973 需求直接对应 |
| [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) | fix(files): preserve uploaded filenames in hints | 2026-07-27 | 17 天 | 小修复，涉及控制台上传文件显示名 |
| [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) | feat(mailbox): 智能邮件管理助手（实时监控 + 访问控制） | 2026-08-07 | 6 天 | 功能完整但体量大，需安全评审 |

### 🔸 安全问题未完全解决

- [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) 虽已关闭，但其揭示的**插件权限模型缺口**（可静默创建 cron、注入用户可见消息）值得在后续版本中系统性加固，建议维护者发布安全说明或权限审批机制更新。

---

**日报小结**：QwenPaw 项目正处于 2.1.0-beta 快速迭代周期，PR 合并节奏稳定，社区反馈渠道畅通；当前最大风险集中在**多步骤任务执行中断**和**网络异常自愈**两大稳定性问题上，建议下一版本优先解决。与此同时，国内 provider 接入（火山方舟、阿里云百炼）和会话管理增强是明显的社区诉求方向，预计将在 2.1.0 正式版前后陆续落地。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-13

## 1. 今日速览

ZeroClaw 项目今日保持高强度运转，24 小时内 Issue 与 PR 更新各达 50 条，总动态超过 100 项。Issue 侧新开/活跃 41 条、关闭 9 条，净增 32 条待办，说明社区需求与问题报告仍在持续涌入；PR 侧待合并 44 条、合并/关闭仅 6 条，合并速度明显滞后于提交速度，维护者审查积压已成为当前瓶颈。当日无新版本发布，但活跃的 RFC 讨论（目标模式、Web 工具集简化、安全性决策管线等）表明项目正处于架构重构与安全加固的关键阶段，且大量议题风险等级为 high，整体健康度处于「高活跃、高积压、需加快收敛」的状态。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时共有 6 条 PR 被合并或关闭。结合当前待合并队列中已具备合并条件的 PR 来看，项目正在以下几方面取得实质推进：

- **跨平台 CI 矩阵建设**：[PR #9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) 计划新增定时 macOS 与 Windows 测试工作流，直接回应 [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 中 Windows 平台 74 个测试失败而 CI 无法捕获的问题；[PR #9952](https://github.com/zeroclaw-labs/zeroclaw/pull/9952) 将 WeChat 通道纳入 CI 编译与测试覆盖，补齐通道功能盲区。
- **供应链与依赖治理**：[PR #9944](https://github.com/zeroclaw-labs/zeroclaw/pull/9944) 清理根 crate 中 32 个重复声明的依赖；[PR #9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547) 将 CPAL 升级至 0.18 并迁移 Voice Wake 至统一 API；[PR #9932](https://github.com/zeroclaw-labs/zeroclaw/pull/9932) 通过 query-filters 消除 CodeQL 全部 27 个误报；[PR #9962](https://github.com/zeroclaw-labs/zeroclaw/pull/9962) 使 rust-cache 兼容 Blacksmith runner。
- **安全隐患修复**：[PR #9937](https://github.com/zeroclaw-labs/zeroclaw/pull/9937) 修复了 `forbidden_paths` 策略在 `allowed_roots` 与 agent workspace 下完全失效的问题，属于安全策略实际绕过漏洞；[PR #9846](https://github.com/zeroclaw-labs/zeroclaw/pull/9846) 通过持久化锁文件完善 Unix 本地 IPC endpoint 生命周期管理。
- **可验证意图（VI）能力补全**：[PR #9963](https://github.com/zeroclaw-labs/zeroclaw/pull/9963) 新增 SD-JWT disclosure 解析能力，补齐链验证器将 presentation 转为 claim set 的关键一环。

项目整体正在向「多平台可靠运行、依赖精简、安全策略闭环、VI 能力落地」四个方向稳步推进，但 44 条待合并 PR 的审查效率已成为制约前进速度的主要因素。

## 4. 社区热点

- **[#8303 RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)**（评论 20，👍 1）— 今日最热议题。社区对跨多轮 agent turn 的持久化目标执行机制有强烈诉求，但讨论焦点在于首版范围控制：发起者明确反对将 restart handoff、broad channel admission、Web 与异步子任务一并纳入首发。这表明用户需要「立即可用的有界目标模式」，而非大而全的长期架构。

- **[#7155 RFC: 高风险 shell 命令逐次确认层级 + 命令策略模式](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)**（评论 18）— 安全策略讨论持续发酵，第三版修订已获得维护者范围确认，将规范范围收窄至 shell 策略契约。社区对 Claude Code 风格的 allow/ask/deny 策略高度认可，是提升 agent 自主操作安全性的关键需求。

- **[#7141 RFC: Pluggable inbound authentication and canonical principals](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)**（评论 14）— 身份与访问里程碑的核心提案，已迭代至 Rev 8，涉及 OIDC 与可插拔提供方。配合 [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) 的运行时安全决策管线，ZeroClaw 正在构建一套完整的安全/身份架构。

- **[#7462 Bug: Windows 平台 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**（评论 14）— 虽为 bug 报告，但讨论热度侧面反映了社区对 Windows 支持的期待。中文控制台代码页 936 下的编码问题与 Unix-only 命令是主要根因，[PR #9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) 已提案在 CI 中加入 Windows/macOS 定时测试。

- **[#9328 Bug: verifiable-intent 约束评估绕过凭据链验证](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)**（评论 11）— 安全关键缺陷，`evaluate_constraints` 直接信任调用方传入的 fulfillment 对象而未验证其加密链。对应 [PR #9935](https://github.com/zeroclaw-labs/zeroclaw/pull/9935) 已提交。

## 5. Bug 与稳定性

按严重程度排列：

- **高 — 安全策略绕过**：[#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) verifiable-intent 的约束评估未验证凭据链，攻击者可能构造未经认证的 fulfillment 对象。**已有修复 PR [#9935](https://github.com/zeroclaw-labs/zeroclaw/pull/9935)**（同时修复未知约束类型反序列化崩溃问题）。另有 [PR #9937](https://github.com/zeroclaw-labs/zeroclaw/pull/9937) 修复 `forbidden_paths` 在 `allowed_roots` 下被完全绕过的问题，两者今日并列为最高优先级修复。

- **高 — SOP 执行状态异常**：[#9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) 多步 SOP 在 agent 执行中途被标记为 failed 且无 audit 事件（`r:needs-repro` 状态）；[#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) `finish_run` 接受失败原因但直接丢弃，导致 failed 运行不记录任何原因。前者需复现，后者已有明确修复方向。[PR #9954](https://github.com/zeroclaw-labs/zeroclaw/pull/9954) 修复了 SOP step 输出双重编码导致 schema 验证被跳过的问题。

- **中 — Windows 平台系统性测试失败**：[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 当前 master 在 Windows 11 简体中文环境（代码页 936）下有 74 个测试失败，根因包括 Unix-only 测试命令、路径语义差异与控制台编码。CI 仅跑 Linux 导致无法捕获。

- **中 — Discord typing 指示器卡死**：[#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198) 从 Web 仪表盘 reload daemon 后，Discord 频道 "agent is typing…" 指示器永久卡住。S3 严重度，暂未有对应 PR。

- **低 — 桌面端与 TUI 小问题**：[#9710](https://github.com/zeroclaw-labs/zeroclaw/issues/9710)（已关闭）macOS 截图临时文件在两条提前返回路径上未清理；[#9844](https://github.com/zeroclaw-labs/zeroclaw/issues/9844)（已关闭）ZeroCode 仪表盘 CPU 指标实为 daemon 进程的 CPU 而非 ZeroCode 自身，存在误导。

- **低 — 成本显示误导**：[PR #9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939) 修复当 provider 不返回定价元数据时，`zeroclaw status` 显示 `$0.0000` 让用户误以为在预算上限内，实际该上限永远不会触发；[PR #9938](https://github.com/zeroclaw-labs/zeroclaw/pull/9938) 修复多别名 provider 定价无法解析的问题。

## 6. 功能请求与路线图信号

今日活跃的功能/RFC 类议题与对应 PR 传递出清晰的路线图信号：

- **安全架构收敛（下一版本重点）**：[#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) 可插拔入站认证、[#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) 运行时安全决策管线、[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) shell 命令策略模式三箭齐发，加上 [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 合并发布签名机制（v0.8.3 曾有 3 套并行签名方案、53 个发布资产），v0.9.0 安全架构已现雏形。

- **Web 工具集简化**[#9824](https://github.com/zeroclaw-labs/zeroclaw/issues/9824)（p1，in-progress）：将 5 个重叠的 Web 工具收敛为 `web_fetch`（读）、`web_research`（查）、`http_request`（调 API）三个动词，原始搜索工具下沉为 research 子代理，浏览器自动化改为显式 opt-in。这直接回应了 agent 工具选择混乱的痛点。

- **运行时与会话架构重组**：[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC 提出运行时拥有的会话与传输适配器，与 [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) Goal mode 形成配套——两者均在收紧边界、控制首版范围，说明项目在刻意避免过度设计。

- **RFC 流程自身改革**[#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)（p1，已接受）：缩短强制讨论期（7 天）、放宽一致同意要求、引入自动化投票协调。[PR #9927](https://github.com/zeroclaw-labs/zeroclaw/pull/9927) 要求提交 RFC 时必须注明触发类别，已落地执行。

- **贡献者体验**：[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078) 提案增加 zerocode 本地预提交门禁，在代码离开开发者机器前自动执行目标项目的 CI 贡献者门槛，意图降低外部贡献者的试错成本。

## 7. 用户反馈摘要

- **Windows 支持是真实痛点**：[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 的讨论反映了简体中文 Windows 用户无法在 CI 之外可靠运行测试套件，控制台代码页 936 被点名。用户不仅报告了问题，还给出了复现环境细节（Windows 11 + 中文 + CP936），属高质量反馈。

- **安全功能「半成品」让用户担忧**：[#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) 中用户尖锐指出可验证意图功能在「约束评估」与「凭据链验证」之间存在割裂，`vi_verify` 并未达到参考实现的安全级别，说明用户正在用安全关键场景的实际标准审计新功能。

- **失败可观测性不足引发不满**：[#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) 与 [#9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) 中 SOP 运行失败既不记录原因、也无 audit 事件，用户（均为项目内活跃开发者）在真实 agent 驱动场景中遭遇了「静默失败」，这直接削弱了对运行时可靠性的信任。

- **PWA 安装体验细节被关注**：[PR #9926](https://github.com/zeroclaw-labs/zeroclaw/pull/9926) 解决了安装到手机主屏后显示浏览器默认字母图标而非 ZeroClaw logo 的问题。反馈虽小，但说明已有真实用户在移动端使用 Web 仪表盘。

- **价格显示误导**：[PR #9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939) 暴露了当 provider 无定价元数据时 `$0.0000` 的显示会让用户对成本上限产生虚假的安全感，用户希望「不知道价格」被明确提示而不是静默显示为 0。

## 8. 待处理积压

- **[#5316 SearXNG 配置 + 搜索失败恢复](https://github.com/zeroclaw-labs/zeroclaw/issues/5316)**（创建于 04-05，p2，accepted，6 评论，最近更新 08-12）— 已积压超 4 个月，社区对隐私友好搜索提供方与 DuckDuckGo CAPTCHA 检测的需求始终未被满足。

- **[#5907 Opt-in LSP 支持 for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)**（创建于 04-19，p2，needs-author-action，6 评论，最近更新 08-13）— LSP 集成被多个用户（包括 Claude Code/OpenCode 用户）反复提及，但长期处于 needs-author-action 状态，作者 tidux 的提案至今未推进到维护者评审。

- **[#6653 模拟安装的主机架构策略](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)**（创建于 05-14，p3，needs-author-action，7 评论，最近更新 08-12）— 原始错误资产选择问题已由 #5086 解决，但更窄的模拟安装场景（如 Rosetta/x86_64 模拟下安装 arm64 包）仍未定义策略。p3 优先级虽低，但长期挂着会影响跨架构用户。

- **[#7897 无需 daemon reload 即可应用安全与通道配置更新](https://github.com/zeroclaw-labs/zeroclaw/issues/7897)**（创建于 06-17，p3，needs-maintainer-review，9 评论，最近更新 08-13）— 配置保存成功与实际生效之间存在语义鸿沟，长期运行子系统可能继续使用旧状态。该问题已积累多轮讨论，但尚未进入实施。

这些积压项均非新出现的问题，若维护者能在 RFC 流程改革（[#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)）落地后加速决策队列（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）清理，将显著提升项目响应速度。

</details>

---
*本日报由 [agents-radar](https://github.com/forever-1314/agents-radar) 自动生成。*