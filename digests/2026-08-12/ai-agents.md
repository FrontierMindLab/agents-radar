# OpenClaw 生态日报 2026-08-12

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-12 04:07 UTC

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

# OpenClaw 项目动态日报（2026-08-12）

## 1. 今日速览

过去 24 小时项目活跃度极高：**500 条 Issue 更新**（其中 350 条新开/活跃、150 条已关闭），**500 条 PR 更新**（其中 283 条待合并、217 条已合并/关闭），今日**无新版本发布**。当前 Hot Topics 集中在“静默回复失败”“消息丢失”“会话状态一致性”等可靠性问题上，多个 P1 级 Issue 仍处于维护者评审或等待复现阶段。整体看，社区反馈密集、修复流动较快，但部分长期问题反复出现，需要警惕发布质量与回归风险。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时有 **217 个 PR 被合并或关闭、150 个 Issue 被关闭**，其中以下重要问题已标记为 CLOSED，说明修复已落地或已完成清理：

- [Issue #92201](https://github.com/openclaw/openclaw/issues/92201)：修复 Embedded runner 中 Anthropic thinking 签名重放失效、恢复包装器不触发的问题。
- [Issue #92076](https://github.com/openclaw/openclaw/issues/92076)：修复 Subagent 完成通知在请求者会话不活跃/transcript 被锁定时投递失败。
- [Issue #92460](https://github.com/openclaw/openclaw/issues/92460)：修复隔离 Cron 完成播报在最终返回时丢弃显式 `delivery.channel`。
- [Issue #96827](https://github.com/openclaw/openclaw/issues/96827)：修复 `message_tool_only` 模式下 agent 投递后不终止、产生级联自回复。
- [Issue #89315](https://github.com/openclaw/openclaw/issues/89315)：修复 Gateway 堆内存无限增长导致 cgroup OOM。
- [Issue #89594](https://github.com/openclaw/openclaw/issues/89594)：修复 Microsoft Teams 频道无法访问入站附件。
- 多个长期搁置的 feature request（如 [#45655](https://github.com/openclaw/openclaw/issues/45655)、[#42651](https://github.com/openclaw/openclaw/issues/42651)、[#42647](https://github.com/openclaw/openclaw/issues/42647)、[#39022](https://github.com/openclaw/openclaw/issues/39022)）被标记为 stale 关闭，积压得到清理。

在开放 PR 中，以下修复已明确关联到待解决 Issue，值得关注：

- [PR #120332](https://github.com/openclaw/openclaw/pull/120332)：`config validate` 不再拒绝替换插件自身的通道配置键（Closes #92884）。
- [PR #122300](https://github.com/openclaw/openclaw/pull/122300)：Control UI 保持多认证配置下可用 provider 的展示状态（Closes #122241）。
- [PR #122404](https://github.com/openclaw/openclaw/pull/122404)：修复 per-agent identity 未投影到外发 durable delivery（Closes #121513）。

## 4. 社区热点

今日讨论最活跃的 Issue（按评论数排序）：

| Issue | 评论数 | 核心诉求 |
| --- | --- | --- |
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 69 | 用户强烈反馈：`#116277` 修复关闭后，静默回复失败仍持续复现，监控 cron 当天仍在记录新发生。 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | 64 | Realtime voice 会话可无界保留 provider/consult 状态，开发者深入讨论资源所有权边界设计。 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 46 | 工具调用之间的内部文本被误发到 Slack/iMessage 等消息渠道，引发隐私与 UX 担忧。 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 43 | 希望按来源（用户命令、网页抓取、三方 skill）对记忆条目进行信任标记，防止记忆投毒。 |
| [#92201](https://github.com/openclaw/openclaw/issues/92201) | 23 | 虽然已关闭，但用户在验证修复细节，讨论错误信息泛化导致恢复逻辑无法触发。 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 21 | 在 gateway 层增加 per-agent 成本预算（日/月上限），防止失控支出。 |

分析：社区最关注的三条线分别是 **可靠性**（静默失败、消息丢失）、**隐私与安全**（文本泄漏、记忆投毒）、**成本治理**（预算控制）。这些方向很可能成为下一阶段版本的重点。

## 5. Bug 与稳定性

按严重程度排列今日值得关注的 Bug/回归，并标注是否已有开放 fix PR：

| Issue | 严重度 | 问题摘要 | Fix PR 状态 |
| --- | --- | --- | --- |
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | P1 / Diamond | 静默回复失败在 #116277 关闭后仍周期性出现 | 暂无直接 fix PR，维护者审查中 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | P1 / Diamond | 工具调用间文本泄漏到消息渠道 | 已有 linked PR open |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | P1 / Diamond | Realtime voice 保留无界 provider/consult 状态 | 暂无 fix PR，需产品决策 |
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | P1 / Diamond | iOS/WebChat 消息写入 transcript 但不触发 assistant 回复 | 暂无 fix PR，source-repro |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | P1 / Diamond | MCP loopback 在 gateway 重启后不自动重连，`recovered=1` 误导 | 暂无 fix PR |
| [#42820](https://github.com/openclaw/openclaw/issues/42820) | P1 / Diamond | Feishu 发送纯文件被 poll 字段 schema 误拦截 | 已有 linked PR open |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) | P1 | DeepSeek 上 cron 回合因 `[cron:...]` 前缀被降优先级而卡住 | 已有 linked PR open |
| [#121765](https://github.com/openclaw/openclaw/issues/121765) | P1 / Diamond | Telegram ingress spool 合并消息时丢失 `reply_to_message/quote` | fix-shape-clear，已可排队修复 |
| [#114020](https://github.com/openclaw/openclaw/issues/114020) | P1 | 升级后 Feishu/Telegram 分发失败：`runChannelInboundEvent` 要求 `runDispatchLifecycle` | `not-repro-on-main`，暂无 fix |
| [#106704](https://github.com/openclaw/openclaw/issues/106704) | P1 / Diamond | `sessions_yield` 在子代理首轮（无 children）被静默 finalize 为 ok | 暂无 fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | P1 | hook/tool 子进程泄漏，产生僵尸进程并导致运行时代级下降 | 暂无 fix PR，维护者审查中 |
| [#84516](https://github.com/openclaw/openclaw/issues/84516) | P1 | Codex 长回复在 ~1000-1100 字符处被静默截断（stop=null） | 暂无 fix PR |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | P1 | Codex-backed Telegram 回合反复超时，无法到达 `turn/completed` | `needs-live-repro` |
| [#74586](https://github.com/openclaw/openclaw/issues/74586) | P1 | Active Memory 嵌入运行中止 `memory_search`，误判为超时 | `needs-live-repro` |
| [#83337](https://github.com/openclaw/openclaw/issues/83337) | P1 | 插件/core 版本漂移导致渠道静默失效且无兼容性警告 | 暂无 fix PR |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | P2 / Diamond | `memory_index_chunks` 与 `memory_embedding_cache` 无保留策略，磁盘将写满 | 暂无 fix PR |
| [#80131](https://github.com/openclaw/openclaw/issues/80131) | P2 | 每请求认证（5.5s）+ 工具打包（8.9s）主导 Gateway TTFT | 暂无 fix PR |

## 6. 功能请求与路线图信号

今日活跃的功能请求主要分布在安全治理、成本控制、开发者体验和性能优化四个方向：

**安全与治理**
- [#7707](https://github.com/openclaw/openclaw/issues/7707)：记忆条目按来源做信任标记，防止记忆投毒。
- [#72741](https://github.com/openclaw/openclaw/issues/72741)：提供统一的外部安全/guardrail 检查接口。
- [#39811](https://github.com/openclaw/openclaw/issues/39811)：模型配置应校验模型名合法性，避免静默误配置。

**成本控制**
- [#42475](https://github.com/openclaw/openclaw/issues/42475)：Gateway 层 per-agent 成本预算（日/月封顶）。

**开发者体验与 UI**
- [#42840](https://github.com/openclaw/openclaw/issues/42840)（10 👍）：Control UI 增加 MathJax/LaTeX 渲染，数学/科学用户需求强烈。
- [#55249](https://github.com/openclaw/openclaw/issues/55249)：会话标签/昵称，替代晦涩的 `agent:main:main` 键。
- [#13700](https://github.com/openclaw/openclaw/issues/13700)：会话快照 `/session save|load`，支持 A/B 测试与回滚。
- [#16670](https://github.com/openclaw/openclaw/issues/16670)：Onboarding Wizard 将 Memory/Embedding 配置设为强制步骤。
- [#91455](https://github.com/openclaw/openclaw/issues/91455)：Kubernetes 安装文档更新。

**性能优化**
- [#14785](https://github.com/openclaw/openclaw/issues/14785)：降低工具 schema token 开销（约 3,500 tok/session）。
- [#80131](https://github.com/openclaw/openclaw/issues/80131)：优化每请求认证与工具打包，减少 TTFT。

结合当前开放 PR，以下方向已有实际代码推进，可能进入下一版本：
- **安全策略审批链路**：[PR #116489](https://github.com/openclaw/openclaw/pull/116489)、[PR #120899](https://github.com/openclaw/openclaw/pull/120899)、[PR #120900](https://github.com/openclaw/openclaw/pull/120900) 联合实现 install policy warning 的展示、网关 acknowledgement、CLI/UI 审批。
- **消息防风暴**：[PR #120491](https://github.com/openclaw/openclaw/pull/120491) 为 `message` 和 `conversations_send` 增加 per-turn/per-target 发送预算。
- **设备配对体验**：[PR #120768](https://github.com/openclaw/openclaw/pull/120768) 通过 `oc-pair` setup link 实现一键粘贴配对。
- **多智能体所有权显式化**：[PR #114388](https://github.com/openclaw/openclaw/pull/114388) 移除 `default:true` 标记，让多 agent 场景必须显式选择 owner。
- **大规模 UI 重构**：[PR #122420](https://github.com/openclaw/openclaw/pull/122420)、[PR #122413](https://github.com/openclaw/openclaw/pull/122413)、[PR #122419](https://github.com/openclaw/openclaw/pull/122419) 分别拆分 chat thread、new-session 页面和 Telegram 命令执行器，为后续功能铺路。

## 7. 用户反馈摘要

从今日 Issue 评论和描述中可提炼出以下真实用户痛点：

- **“修复未真正生效”是最集中的不满**：[#121058](https://github.com/openclaw/openclaw/issues/121058) 中用户指出 #116277 虽已关闭，但监控 cron 在关闭当天仍记录到新的静默失败，说明修复覆盖不完整或存在其他触发路径。
- **长回复静默截断影响可用性**：[#84516](https://github.com/openclaw/openclaw/issues/84516) 用户报告 Codex 代理回复在 1000-1100 字符处中间截断，且无任何错误标记，难以排查。
- **消息错发伤害专业形象**：[#25592](https://github.com/openclaw/openclaw/issues/25592) 用户认为内部处理输出（错误处理、处理确认）被直接发到群聊是明显的 UX 缺陷。
- **状态恢复与重连逻辑令人困惑**：[#98435](https://github.com/openclaw/openclaw/issues/98435) 里 `recovered=1` 给用户“已恢复”的假象，但 MCP loopback 实际未重建，导致下一个工具调用失败。
- **运维侧对资源增长感到担忧**：[#114612](https://github.com/openclaw/openclaw/issues/114612) SQLite 表无保留策略、[#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程累积，都让长期部署用户担心磁盘与性能耗尽。
- **积极信号**：[#42840](https://github.com/openclaw/openclaw/issues/42840) 获得 10 个 👍，说明数学/科学内容的展示需求被显著低估；此外多个 issue 附有完整复现步骤、版本、环境信息，社区技术参与度较高。

## 8. 待处理积压

以下高优先级/高影响 Issue 与 PR 长期未关闭，提醒维护者关注：

| 类型 | 编号 | 创建时间 | 积压原因/影响 |
| --- | --- | --- | --- |
| Issue | [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | P1 / Diamond，工具调用文本泄漏，已近半年，虽有 linked PR 但尚未合并。 |
| Issue | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | 记忆信任标记，安全相关，长期无 assignee 进展。 |
| Issue | [#14785](https://github.com/openclaw/openclaw/issues/14785) | 2026-02-12 | 减少 3,500 tok/session 工具 schema 开销，直接影响成本与上下文。 |
| Issue | [#42475](https://github.com/openclaw/openclaw/issues/42475) | 2026-03-10 | per-agent 成本预算，社区呼声高但未进入开发。 |
| Issue | [#80131](https://github.com/openclaw/openclaw/issues/80131) | 2026-05-10 | TTFT 性能瓶颈，认证 + 工具打包占总耗时约 1/3。 |
| Issue | [#87744](https://github.com/openclaw/openclaw/issues/87744) | 2026-05-28 | P1，Telegram 用户受影响，等待 live repro。 |
| Issue | [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | P2 / Diamond，SQLite 无界增长，属于长期运维隐患。 |
| PR | [#80396](https://github.com/openclaw/openclaw/pull/80396) | 2026-05-10 | media 修复（MEDIA token 在代码块内被跳过）已积压 3 个月，等待 proof。 |
| PR | [#114388](https://github.com/openclaw/openclaw/pull/114388) | 2026-07-27 | P1，多智能体 ownership 显式化，当前 waiting on author。 |
| PR | [#120332](https://github.com/openclaw/openclaw/pull/120332) | 2026-08-07 | 替换插件的 config validate 修复，等待作者更新。 |

以上积压项中，Issue 类以**消息可靠性、成本/资源治理、安全边界**为主；PR 类主要卡在**等待作者补充证明或继续推进**，建议维护者按 P1 优先度安排 review 或转移给可跟进的 contributor。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告（2026-08-12）

## 1. 生态全景

过去 24 小时，个人 AI 助手/自主智能体开源生态呈现**高活跃、重安全、强分化**的整体态势。以 OpenClaw 为首的头部项目日处理 Issues + PR 合计超过 1000 条，社区规模与问题复杂度均达到新量级；NanoBot、ZeroClaw 等中坚力量处于大版本前的高频整合期，安全漏洞报告与架构级讨论（god-file 拆分、MCP 解耦、可插拔 Agent Loop）成为多条主线。与此同时，PicoClaw、ZertoClaw 等中小项目在合并率上严重滞后（0%–2%），维护者吞吐量已成为普遍瓶颈。**可靠性问题（静默失败/消息丢失）是跨项目的第一痛点，安全加固与成本治理紧随其后，MCP 与 OpenAI 协议兼容则是生态对接的两大核心标准。**

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（350 新/活跃） | 500（217 合并/关闭） | 43.4% | 无 | ★★★★☆ 活跃度极高，修复流动快，但 P1 回归反复出现 |
| **NanoBot** | 11（3 新/活跃） | 140（118 合并/关闭） | 84.3% | 无 | ★★★★☆ 安全主线清晰，旧积压清理果断，架构重构推进中 |
| **Hermes Agent** | 50（48 新/活跃） | 50（2 合并/关闭） | 4.0% | 无 | ★★★☆☆ 安全审计密集但合并率极低，维护者审查成瓶颈 |
| **ZeroClaw** | 50（41 新/活跃） | 50（1 合并） | 2.0% | 无 | ★★★☆☆ RFC 讨论有深度，PR 积压严重（49:1），决策流程待优化 |
| **IronClaw** | 19（13 活跃） | 50（21 合并/关闭） | 42.0% | 无 | ★★★★☆ v1.3.0 关键拼图日，Bug 闭环快，核心架构推进扎实 |
| **CoPaw** | 22（10 新/活跃） | 43（21 合并/关闭） | 48.8% | v2.1.0-beta.3 | ★★★★☆ Beta 冲刺节奏稳定，但存在崩溃类高优 Bug 未关闭 |
| **LobsterAI** | 6 | 9（4 合并） | 44.4% | 2026.8.11 | ★★★☆☆ 迭代节奏健康，但 3-4 月历史 Issue 长期无回应（134 天） |
| **PicoClaw** | 3（2 新） | 6（0 合并） | 0% | 无 | ★★☆☆☆ 社区贡献活跃但合入通道阻塞，stale 风险高 |
| **NanoClaw** | 1（新） | 8（3 合并） | 37.5% | 无 | ★★★☆☆ MCP 集成推进快，新曝消息静默丢弃问题需关注 |
| **Moltis** | 0 | 1（待合并） | 0% | 无 | ★★★☆☆ 静默蓄力期，1 个高含金量 PR（本地 CalDAV）待评审 |
| **NullClaw / ZeptoClaw** | 0 | 0 | — | 无 | 无活动 |

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的"母体"与参照系**——多个项目从命名（PicoClaw、NanoClaw、ZeroClaw、CoPaw）到功能模块（Gateway、Embedded runner、dispatch rules）均存在明显的继承脉络。其优势体现在三方面：

- **社区规模断层式领先**：日处理 500 Issues + 500 PRs，是 NanoBot 的 3.5 倍、Hermes/ZeroClaw 的 10 倍。350 个新 Issue 背后是庞大的真实部署基数，这也解释了为何"静默回复失败"等可靠性问题在如此高频下仍能持续暴露。
- **技术路线：多通道消息网关 + 嵌入式 agent runner**。覆盖 Slack/iMessage/Feishu/Teams/Telegram 等全渠道，辅以 Control UI、cron 调度、subagent 委托。核心优势在**通道抽象与消息生命周期管理**，而非模型能力本身。
- **当前最大短板是回归控制**：多个 P1 级 Bug（#121058、#25592）在修复关闭后复现，暴露其测试覆盖与发布门禁存在空缺，且 283 个待合并 PR 中积压着大量功能修复。这一"领先规模 + 回归阵痛"的组合，为下游竞品提供了差异化窗口——NanoBot 已通过更激进的清理策略（84% 合并率）展示了另一种管理节奏。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求与信号 |
|---|---|---|
| **消息可靠性 / 静默失败** | OpenClaw（#121058 静默回复失败）、NanoBot（重复输出 #5327）、NanoClaw（消息 ID 复用被静默丢弃 #3226）、CoPaw（"假完成" #6921）、Hermes（中断后零反馈 #84207） | 跨项目共性痛点：用户无法区分"平台丢消息"与"agent 不响应"，需要可见回执、幂等去重、失败重试机制。这是影响 agent 产品信任度的第一技术债 |
| **安全加固 / 权限边界** | NanoBot（密钥环境变量泄露，exec.allowPatterns 绕过 #5306）、Hermes（13 条安全审计 Issue #84259-84271，webhook 注入 #8820）、OpenClaw（记忆投毒 #7707，内部文本泄漏 #25592）、CoPaw（插件静默创建 cron #6916）、ZeroClaw（forbidden_paths 绕过 #9815） | 从"功能安全"转向"审计型安全"：密钥隔离、路径白名单、插件最小权限、提示注入防御成为标配。安全研究员（如 hamb1y、andrexibiza）批量提交漏洞，推动项目建立系统化审计流程 |
| **成本治理产品化** | ZeroClaw（$0 支出导致预算上限失效 #9816，多别名定价失败 #9573）、OpenClaw（per-agent 成本预算 #42475）、IronClaw（Anthropic 缓存断点 #6984、token 估算器双重计算 #7485）、CoPaw（MCP 超时可配置 #6874）、NanoBot（工具 schema 3,500 tok/session #14785） | 成本从"运维杂项"上升为产品能力：provider 定价一致性、预算强制上限、缓存 token 可见性、上下文窗口精确管理 |
| **架构模块化 / 可插拔** | Hermes（god-file 拆分 Epic #78647，7,757 行文件拆分）、NanoBot（MCPProvider 生命周期解耦 #5343）、IronClaw（Pluggable agent loops #7482，profile-agnostic 持久化 #7456）、CoPaw（MCP 生命周期移出 AgentLoop）、ZeroClaw（可插拔入站认证 #7141） | 社区形成「瘦内核 + 可插拔组件」共识：Agent Loop、MCP、记忆、认证各自独立为模块，降低维护门槛并支持多前端（WebUI/TUI/Desktop）共用 |
| **MCP（模型上下文协议）成为标准集成层** | NanoClaw（远程 Streamable HTTP MCP 全 provider 落地 #3092/#3221）、CoPaw（MCP 超时、工具失效修复 #6723）、NanoBot（MCP 运行时状态展示 #5331）、IronClaw（GitHub MCP 扩展）、OpenClaw（MCP loopback 重连 #98435） | MCP 从"实验性框架"变为"生产级基础设施"，项目普遍在连接生命周期管理、故障可见性、超时配置上补课 |
| **生态兼容：OpenAI 协议作为接入入口** | ZeroClaw（Chat Completions profile RFC #8603，18 评论）、Hermes（Chat API profile 参数 #84280）、CoPaw（CopilotKit 集成 #6882）、LobsterAI（多自定义模型提供商 #1174） | 用户强烈希望用 Open WebUI、LobeChat、Aider、Continue.dev 等既有客户端直连 agent 后端，协议兼容成为生态扩张的关键路径 |
| **本地优先 / 数据主权** | Moltis（本地 CalDAV 连接器 + 全文搜索 #1190）、Hermes（本地 VoxCPM TTS #82961）、IronClaw（NEAR AI 账户体系）、NanoBot（Windows 安全修复 #5341） | 本地存储、离线可用、自托管模型（gpt-oss、Ollama、vLLM）的支持需求上升，与云端成本担忧形成对冲 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能消息网关：多 IM 通道、cron、subagent、记忆 | 追求"个人助手全家桶"的普罗用户与开发者 | 嵌入式 runner + Gateway 解耦，通道适配器覆盖最广 |
| **NanoBot** | WebUI 工作台化 + MCP 架构独立 + 应用/插件发现 | 重视前端体验与自托管的中小型开发团队 | AgentLoop 与 MCP 生命周期彻底解耦，WebUI 采用 Tab→Pane[] 多布局模型 |
| **Hermes Agent** | 桌面端体验（vibe hearts、宠物、背景 UI）+ god-file 重构 | 桌面重度用户与远程部署（RDP、远程 gateway） | 桌面客户端 + 远程 gateway 分离，"瘦客户端"模式；对自托管模型（gpt-oss）有专门适配 |
| **IronClaw** | 面向 NEAR AI 云生态的 agent 平台、staking 经济激励 | 区块链/Web3 开发者，Neo 生态用户 | 向 kernel 演进：调度/租约/密钥中介/审计为核心，agent loop 外包给 ACP 标准 |
| **CoPaw** | 中文 IM（飞书/QQ/企微）+ 3D 记忆图谱 + 市场统一 | 中文开发者社区，Qwen 生态用户 | 多 Agent 并行架构中优先解决"影子实例"与多步骤任务连续性；MCP 缓存失效问题有专门修复 |
| **ZeroClaw** | 架构 RFC 密集驱动：Goal mode、OpenAI 协议、可插拔认证 | 重视架构治理与协议标准化的开发者 | 从协议层（Chat Completions、ACP）切入，目标成为 Headless Agent 基础设施 |
| **LobsterAI** | Cowork 协同、定时任务、Windows/macOS 跨平台插件 | 网易系用户与服务端协同办公场景 | 插件安装可靠性（junction/原子重命名）是其近期重点，模型管理模块持续迭代 |
| **Moltis** | 本地优先数据连接器（CalDAV）与全文搜索，只读 Agent 工具 | 注重数据主权与本地检索的效率工具用户 | Connector 持久化 + 原子快照 + 本地全文索引，走"个人数据代理"路线 |
| **PicoClaw** | 轻量级配置可靠性（LINE/TG/exec 白名单修复） | 嵌入式/低成本部署用户 | 继承 OpenClaw 模块但精简，维护者吞吐限制明显 |
| **NanoClaw** | Claude Code 生态整合：MCP 远程化 + Agent Plugins 1.0.0 | Claude Code / 终端工作流用户 | 以 `.claude/skills/` 为核心，agent templates 向插件系统演进 |

## 6. 社区热度与成熟度

**按活跃度分层：**

- **Tier 1（高度活跃，日 PR > 100）：** OpenClaw、NanoBot
  - OpenClaw 处于"规模驱动的攻城期"——功能覆盖广、反馈流密集，但修复稳定性受挑战。
  - NanoBot 处于"清理后的重建期"——118 个 PR 合并/关闭（84% 合并率）显示维护者强掌控力，正在为 WebUI 工作台 + MCP 解耦的大版本铺垫。

- **Tier 2（中度活跃，日 PR 15-50）：** Hermes、ZeroClaw、IronClaw、CoPaw
  - Hermes：安全审计集中爆发，但合并率仅 4%，"意识超前、交付滞后"，god-file 拆分刚从首个 PR 起步。
  - ZeroClaw：架构讨论有秩序（社区自发建决策队列），但 49:1 的待合并/合并比意味着大量已实现成果被滞留。
  - IronClaw：健康度最高的中量级项目，Bug 闭环快（#7487/#7488/#6984 当日关闭）、核心架构（Reborn）有序推进。
  - CoPaw：Beta 冲刺期，版本迭代密集（v2.1.0-beta.3 → b4），中文社区反馈活跃。

- **Tier 3（低活跃/静默）：** PicoClaw、NanoClaw、Moltis
  - PicoClaw：社区贡献意愿高（Issue 当日即获 PR），但 0% 合入率可能导致贡献者流失。
  - Moltis：以少量高质量 PR 蓄力，CalDAV 数据层若合入将推动定位升级。

**按成熟阶段分层：**

- **快速迭代/攻山头**：OpenClaw、CoPaw、IronClaw（功能推进与稳定性修补并重）
- **质量巩固/架构重构**：NanoBot、Hermes、ZeroClaw（先把模块边界、安全审计、RFC 决策理清）
- **功能积累/蓄力**：Moltis、NanoClaw（小步推进，等待关键合入）
- **活跃度不足/风险位**：PicoClaw（合并率 0%）、NullClaw/ZeptoClaw（零活动）

## 7. 值得关注的趋势信号

**信号一：可靠性成为 agent 产品的"信任货币"。** 跨 5 个以上项目同时出现"静默失败/消息丢失/重复回复"类问题，且用户反馈措辞强烈（"agent 无视了我""silent death"）。技术决策者应将**可观测的消息生命周期**（回执、重试、死信队列）作为基础设施投资而非功能点——这直接决定用户是否信任 agent 处理真实事务。

**信号二：安全审计从"零散提交"走向"批量行动"。** Hermes 的 SECURITY-AUDIT-42（13 条 Issue）、NanoBot 安全研究员连续提交、CoPaw 插件权限预警，表明社区已形成"发现 - 批量报告 - 维护者集中响应"的协作机制。对项目方而言，建立安全响应通道（而非被动修 Bug）将成为吸引开源贡献者的公关资产。

**信号三：架构内核化是抵御规模熵增的共同解。** 面对 god-file、MCP 状态混乱、agent loop 与通道耦合等问题，头部项目不约而同走向"瘦内核 + 插件化"：Hermes 拆文件、NanoBot 拆 MCPProvider、IronClaw 将 agent loop 外包、ZeroClaw 做协议层。**"kernel + adapters"将是下一阶段架构主流，开发者选型时应优先评估项目的模块边界质量**——而非仅看功能数量。

**信号四：成本治理将成为生产力工具的分水岭。** ZeroClaw 的 $0 支出 bug 与 OpenClaw 的成本预算请求同时出现，说明"能用"已不够，用户开始要求"可控可持续"。**per-agent 预算、定价的 provider 一致性、缓存 token 计费的准确性**，将是 agent 平台从玩具走向企业级的关键门槛。

**信号五：生态兼容决定辐射半径。** ZeroClaw 力推 OpenAI Chat Completions 兼容、NanoClaw 深入 Claude Code 插件标准、Moltis 主打本地 CalDAV 数据接口——**每个项目都在寻找自己被既有生态（OpenAI、Claude、CalDAV、NEAR）锚定的方式**。对开发者而言，选择与主流开放协议深度兼容的项目，长期可复用资产更多。

**信号六：合并吞吐量已成为社区健康的关键指标。** 多个项目出现"PR 积压 → stale 关闭 → 贡献热情受挫"的负循环。OpenClaw 的 283 个待合并 PR、ZeroClaw 的 49:1 对比度、PicoClaw 的 0% 合入率都在提醒：**维护者时间是最稀缺资源，而批量关闭 > 零回应 > 合并**。建议项目通过流程简化（如 ZeroClaw #9496 的 RFC 简化）和社区 reviewer 授权来缓解。

---

*报告数据来源：各项目 GitHub 仓库公开 Issue/PR 数据，统计窗口 2026-08-11 至 2026-08-12。部分项目无独立日报数据（NullClaw、ZeptoClaw），列为无活动。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时 NanoBot 项目保持**高活跃度**：共收到 140 条 PR 更新（22 条待合并 / 118 条已合并或关闭），11 条 issue 活动中有 7 条更新（3 条新增或活跃、4 条解决）。**安全问题是当前主线**，此前报告的 API 密钥全局环境变量泄露（#4784、#4783）已在同日集中关闭，但新的 `exec.allowPatterns` 绕过漏洞仍未解决。此外，大批 2-3 月提交的旧 PR 被批量标注 `[conflict]` 关闭，说明维护者正在清理历史积压，为 WebUI 与 MCP 架构重构腾出空间。目前无新版本发布，项目正处于**大版本前的高频整合期**。

---

## 2. 版本发布

今日无新版本 Release，暂省略发布说明。

---

## 3. 项目进展

### 3.1 重要合并/关闭项

| PR | 说明 | 状态 |
|---|---|---|
| [PR #5331](https://github.com/HKUDS/nanobot/pull/5331) | **fix(webui): 呈现 MCP 运行时连接故障** — 将 MCP 的 connecting/connected/failed 状态与持久化配置分离，前端不再对失败连接显示成功状态，并提供 OAuth/自定义/非 OAuth 服务器的恢复入口。 | CLOSED，无 conflict 标记，属实质性合入 |
| [PR #2181](https://github.com/HKUDS/nanobot/pull/2181) [PR #1367](https://github.com/HKUDS/nanobot/pull/1367) [PR #1321](https://github.com/HKUDS/nanobot/pull/1321) [PR #1094](https://github.com/HKUDS/nanobot/pull/1094) [PR #1199](https://github.com/HKUDS/nanobot/pull/1199) [PR #1114](https://github.com/HKUDS/nanobot/pull/1114) [PR #1002](https://github.com/HKUDS/nanobot/pull/1002) [PR #1020](https://github.com/HKUDS/nanobot/pull/1020) [PR #1031](https://github.com/HKUDS/nanobot/pull/1031) [PR #1383](https://github.com/HKUDS/nanobot/pull/1383) | **老 PR 批量关闭（均带 `[conflict]`）** — 涉及小米 MiMo 支持、kimi-coding 映射、Tavily 搜索、OpenCode Zen、模型 fallback、cron 热重载、Telegram 内联键盘、频道元数据、超时配置等，从 2-3 月遗留至今，因冲突或重复被清理。这意味着部分功能可能已通过其他 PR 实现，或暂不采纳。 | CLOSED（conflict） |

### 3.2 待合并 PR 预览（今日活跃队列）

- [PR #5322](https://github.com/HKUDS/nanobot/pull/5322) — **feat(webui): tabbed pane workbench**：将侧边栏模型化为 Tab→Pane[] 层级，支持列、行、网格、主栈、单窗格布局，是 WebUI 交互模型的大重构。
- [PR #5343](https://github.com/HKUDS/nanobot/pull/5343) — **refactor: 将 MCP 生命周期移出 AgentLoop**：新增应用级 `MCPProvider`，统一管理配置、连接、状态、工具注册与关闭，让 `AgentLoop` 与 MCP 解耦。
- [PR #5342](https://github.com/HKUDS/nanobot/pull/5342) — **feat(webui): 重新设计应用发现**：围绕 Discover / Installed / All apps 重构，配合 nanobot.wiki 注册表提供精选批次与离线回退。
- [PR #5347](https://github.com/HKUDS/nanobot/pull/5347) — **feat(webui): 提供商与模型预设管理**：支持删除自定义提供商、清理内建 API-key 提供商、阻止被引用的提供商删除。
- [PR #5344](https://github.com/HKUDS/nanobot/pull/5344) — **fix(agent): 重复工具调用检测**：为 tool-call 循环增加重复检测，避免同一工具同一参数无限空转。
- [PR #5346](https://github.com/HKUDS/nanobot/pull/5346) — **fix(exec): 终止一次性进程树**：修复超时/取消时只杀 root shell、子进程残留的问题。
- [PR #5338](https://github.com/HKUDS/nanobot/pull/5338) — **fix(mcp): OAuth 存储读取失败时保留凭据**。
- [PR #5349](https://github.com/HKUDS/nanobot/pull/5349) — **fix(tests): 设置测试传入 timezone_name**（修复 #5348）。
- [PR #5341](https://github.com/HKUDS/nanobot/pull/5341) — **fix(skills): 使天气工作流 Windows 安全**（curl 别名问题）。

**总体判断**：项目正在为下一迭代做架构级准备——MCP 生命周期独立化、WebUI 工作台化、Agent 循环防死锁增强。功能层面开源社区贡献活跃（提供商、工具、UI），维护者重心则在稳定性和可维护性上。

---

## 4. 社区热点

📌 [Issue #5327（已关闭）](https://github.com/HKUDS/nanobot/issues/5327) — **评论数最高（10 条）**。用户 `fablau` 报告 Nanobot 在推理过程中随机多次重复同一消息，例如反复出现 "Good points, let me investigate the issue"。该问题获得最多讨论，已关闭但未公布根因，同类问题 #5256 仍开放，说明**重复输出/循环是社区最关注的体验痛点**。

📌 [Issue #5256（开放）](https://github.com/HKUDS/nanobot/issues/5256) — `/goal` 单条指令触发数十条近乎相同的回复，直到用户干预或模型自我识别为系统循环才停止。2 条评论，目前无修复 PR 关联，是活跃 bug 中较有代表性的行为反馈。

📌 [Issue #4784（已关闭）](https://github.com/HKUDS/nanobot/issues/4784) — API 密钥通过 `os.environ` 全局突变在 providers 之间泄露，安全研究员 `hamb1y` 提供了详细调用链分析，与 #4783 组成安全报告组合。此类问题在社区讨论中不会太热，但往往影响部署信任度，已关闭。

---

## 5. Bug 与稳定性

| 严重度 | 编号 | 问题 | 状态 | 修复 PR |
|---|---|---|---|---|
| 🔴 严重（安全） | [Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) | `exec.allowPatterns` 可通过 shell 链式命令绕过限制，导致非预期命令执行 | OPEN（1 评论） | ❌ 无 |
| 🔴 严重（安全） | [Issue #4784](https://github.com/HKUDS/nanobot/issues/4784) | Provider API 密钥写入全局 `os.environ`，跨 provider 相互覆盖/泄露 | CLOSED | ✅ 已有修复方向 |
| 🔴 严重（安全） | [Issue #4783](https://github.com/HKUDS/nanobot/issues/4783) | CLI 子进程继承完整 `os.environ`（含所有 provider 密钥），对比 shell 工具有过滤，二者行为不一致 | CLOSED | ✅ 已关联处理 |
| 🟡 中等 | [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` 消息产生数十条重复回复，持续到用户介入才停止 | OPEN | ❌ 无 |
| 🟡 中等 | [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) | 推理过程中随机重复同一句消息（如 "Good points, let me investigate the issue"） | CLOSED | ⚠️ 未说明修复 |
| 🟢 轻微 | [Issue #5348](https://github.com/HKUDS/nanobot/issues/5348) | `record_token_usage()` 默认 UTC 而 payload 读取配置时区，导致每日约 5 小时窗口内 2 个设置 API 测试稳定失败 | OPEN | ✅ [PR #5349](https://github.com/HKUDS/nanobot/pull/5349) |

**稳定性解读**：安全类问题集中在**密钥环境变量暴露**这一根因上，#4784/#4783 已关闭说明团队已响应，但 #5306 的 shell 绕过尚无公开修复，值得跟踪。功能类 bug 集中在**循环/重复输出**，其中 #5327 已关闭但 #5256 仍开放，修复模式可能来自 #5344。

---

## 6. 功能请求与路线图信号

### 用户功能请求
- [Issue #5333（已关闭）](https://github.com/HKUDS/nanobot/issues/5333) — 请求 **OpenRouter Server Tools** 支持（Web Search、Web Fetch、Fusion 等），用户提到早期 commit 中已有相关尝试，该请求在创建当天即关闭，可能已确认支持或转至内部 roadmap。

### 由在途 PR 反映的路线图信号

| 方向 | 相关 PR | 信号强度 |
|---|---|---|
| **WebUI 工作台化** | [#5322](https://github.com/HKUDS/nanobot/pull/5322) Tab→Pane[] 多布局 | 🟢 强 |
| **MCP 架构独立** | [#5343](https://github.com/HKUDS/nanobot/pull/5343) MCPProvider 接管生命周期 | 🟢 强 |
| **应用/插件发现** | [#5342](https://github.com/HKUDS/nanobot/pull/5342) Discover/Installed 重构 + 注册表 | 🟢 强 |
| **提供商管理体验** | [#5347](https://github.com/HKUDS/nanobot/pull/5347) 删除/清理/预设选择器 | 🟢 强 |
| **Agent 防御性改进** | [#5344](https://github.com/HKUDS/nanobot/pull/5344) 重复工具调用检测 | 🟡 中 |
| **执行安全性** | [#5346](https://github.com/HKUDS/nanobot/pull/5346) 进程树清理、[#5341](https://github.com/HKUDS/nanobot/pull/5341) Windows 安全 | 🟡 中 |

**判断**：下一版本很可能包含 WebUI 的「工作台 + 应用商店 + 提供商管理」三大前端模块，以及 MCP 生命周期解耦的后端重构。Agent 循环防死循环与 exec 进程清理是两个用户可见的稳定性修复，预计优先合入。

---

## 7. 用户反馈摘要

从今日 Issues 评论及内容中提炼的真实用户声音：

- **重复消息/循环是最直接影响体验的问题**。用户 `fablau` 描述"随机重复出现，需要人工观察才发现"（#5327）；`shakewingo` 描述 `/goal` 在等待用户答复时"dozens of near-identical replies"，直到用户介入或模型自我识别为系统循环（#5256）。这类问题让 agent 看起来"卡死"或失去控制感。
- **安全研究者在认真审视部署风险**。`hamb1y` 连续提交 #4784/#4783，将 shell 工具对环境的过滤与 CLI 子程序的完整环境继承做了对比，逻辑清晰，说明用户对**密钥隔离**有明确预期，安全门槛在提高。
- **对配置功能有高期待**。`YLChen-007` 对 `exec.allowPatterns` 的绕过分析精准（#5306），表明用户依赖该配置进行权限收敛，漏洞影响了信任预期。
- **社区用户情感积极但要求更高**。#5333 用户开头强调 "First of all, thank you for creating such an amazing project"，同时对 OpenRouter Server Tools 这类集成能力有明确期望。
- **多语言/多平台采纳者众多**。今日关闭的 PR 队列中出现中文描述（#2181 "添加小米 MiMo API 支持"）、Windows 平台（#5341）、Telegram 渠道（#1020）等，反馈生态多样化。

---

## 8. 待处理积压

以下问题/PR 需要维护者关注：

| 编号 | 问题 | 年龄 | 优先级建议 |
|---|---|---|---|
| [Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) | `exec.allowPatterns` shell 链式绕过 — **安全漏洞**，无任何维护者评论 | 3 天 | 🔴 高 — 建议尽快确认影响范围并设计过滤绕过方案（可参考 shell 命令解析/词法分析白名单） |
| [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` 消息产生数十条重复回复 | 7 天 | 🟡 中 — 与 #5327 同源问题，建议等 #5344 落地后回归验证 |
| [Issue #5348](https://github.com/HKUDS/nanobot/issues/5348) | 时区相关测试每日 5 小时失败窗口 | 0 天（新） | 🟢 低 — 已有 PR #5349，待 review |

**积压状态整体评价**：10 个 `[conflict]` 老 PR 的批量关闭显著消化了历史积压，当前开放 PR 多为近日提交、状态健康。值得注意的是开放的安全 issue #5306 尚未获得维护者任何公开回应，是当前唯一的高优先级悬置项。

---

*本日报基于 HKUDS/nanobot GitHub 仓库公开数据生成，数据截止 2026-08-12。*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目活跃度极高：共 50 条 Issue 更新（48 新开/活跃、2 关闭）与 50 条 PR 更新（48 待合并、2 关闭/合并），社区提交与讨论量处于近期高位。但合并/关闭率偏低（Issue 与 PR 各仅 2 条），维护者审查速度可能成为当前瓶颈。本日最显著特征是安全审计集中爆发：`andrexibiza` 批量提交了 13 条安全类 Issue（#84259–#84271），均关联 SECURITY-AUDIT-42 行动；同时 god-file 拆分 Epic #78647 热度极高（67 条评论），已出现首个落地拆分 PR #84275。无新版本发布，项目处于密集开发与稳定性修复周期。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 2 个 PR 未在数据列表中展示，但 Issue 侧有重要闭环：**#8820（P1 webhook 安全漏洞：攻击者可控字段直接注入 agent prompt）已关闭**，若关闭代表修复完成，则意味着一个长期存在的严重安全风险得到处理；**#84218（标题生成设置标签误导）作为重复问题关闭**，说明该问题在别处已有跟踪。

新的 PR 集中体现了稳定性与架构两个方向：

- **稳定性修复**：`#84277`（state.db WAL checkpoint 改为 PASSIVE 而非 TRUNCATE）、`#84278`（replay guard 作用域收窄）、`#84279`（Desktop 会话恢复 Thinking 块）、`#84281`（阻止 lone surrogate 杀死 SSE 流）、`#84276`（Bedrock 模型 slug 提取 rsplit→split）、`#84283`（TUI 输出缓存改为 LRU 加权淘汰）、`#84241`（Codex 传输失败细节日志）。
- **架构重构**：`#84275` 作为 Epic #78647 的首个落地 PR，将 `agent/conversation_loop.py` 中的 `_join_truncated_parts` 按字节原样提取到新模块 `agent/conversation_text.py`，为 7,757 行 god-file 的拆分迈出第一步。

综合来看，项目今日在“修 bug、拆 god-file、清理安全债”三条线上同步推进，但合并吞吐量限制了进展落地的速度。

---

## 4. 社区热点

### 最热 Issue：god-file 拆分 Epic（67 条评论）

- **#78647** — [Epic: Shard all 20 god files — repo-wide god-file decomposition](https://github.com/NousResearch/hermes-agent/issues/78647)
  - 由 `andrexibiza` 发起，评论数远超其他 Issue。核心诉求是 repo 级政策：**所有 god files 必须拆分，且不得回退**。讨论围绕 20 个超大文件的拆分顺序、共享接口设计、验证指标展开，反映出社区对代码可维护性和长期架构健康的强烈关注。
  - 子任务 **#78641**（`conversation_loop.py` 7306 行拆分为独立模块）同样有 4 条评论，且今天已出现对应 PR #84275，说明讨论正快速转化为行动。

### 其他高互动 Issue

- **#82591**（4 评论）— [EPIC: Kanban zero-authority workers, durable publication, safe reclaim, and godfile eradication](https://github.com/NousResearch/hermes-agent/issues/82591)：包含完整三部分实施计划，将 Kanban 安全模型重构与 godfile 清除绑定，代表社区对“安全 + 架构”融合治理的诉求。
- **#78661**（5 评论）— [Feature Request: Desktop setup wizard should offer option to connect to existing remote gateway](https://github.com/NousResearch/hermes-agent/issues/78661)：用户希望桌面端在无本地安装时可直连远程 gateway，反映多设备/远程部署成为真实使用场景。
- **#8820**（4 评论，已关闭）— [Security: webhook routes forward attacker-controlled payload fields directly into agent prompt](https://github.com/NousResearch/hermes-agent/issues/8820)：用户报告了可导致提示注入的严重漏洞，社区围绕攻击面讨论后该 Issue 已关闭。

**社区情绪分析**：讨论集中于三点——代码可维护性（god-file 拆分）、安全可信度（webhook 注入、安全审计）、部署灵活性（远程 gateway）。整体氛围积极，但用户对安全响应速度与长期未合并 PR 存在隐忧。

---

## 5. Bug 与稳定性

按严重程度排列（P1 > P2 > P3）：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| P1 | [#8820](https://github.com/NousResearch/hermes-agent/issues/8820) | webhook 将攻击者可控字段直接渲染进 agent prompt，可执行任意注入 | 已关闭（修复待确认） |
| P2 | [#84158](https://github.com/NousResearch/hermes-agent/issues/84158) | Harmony-format 工具调用在自托管 gpt-oss（Ollama/vLLM）下泄漏为原始文本 | OPEN，无对应 PR |
| P2 | [#84207](https://github.com/NousResearch/hermes-agent/issues/84207) | 中断回合（exit 130）后零用户反馈，无法区分主动停止与客户端断开 | OPEN，可能与 [#63292](https://github.com/NousResearch/hermes-agent/pull/63292) 相关（未合并） |
| P2 | [#84285](https://github.com/NousResearch/hermes-agent/issues/84285) | 计划内重启仍可能丢弃当前回合最终响应 | OPEN，无 PR |
| P2 | [#84284](https://github.com/NousResearch/hermes-agent/issues/84284) | `/resume <title>` 沿 `/new` 链走到错误会话 | OPEN，无 PR |
| P3 | [#84282](https://github.com/NousResearch/hermes-agent/issues/84282) | 后台会话活动时桌面宠物保持 idle | OPEN，无 PR |
| P3 | [#84274](https://github.com/NousResearch/hermes-agent/issues/84274) | Windows RDP 重连后 UI 缩放重置为 100% | OPEN，无 PR |
| P3 | [#84218](https://github.com/NousResearch/hermes-agent/issues/84218) | Title 生成设置显示 “auto · use main model” 但实际走 fast model | 已关闭（duplicate） |

**安全审计批量问题（P3，13 条）**：#84259–#84271 由安全审计活动批量提交，涉及输入截断、凭据转发、webhook 重放、无发布账本、未校验消息字典、detached 线程、auth 损坏文件、HMAC 重放、默认 adapter 解析、URL redaction 不完整、TTS 路径未隔离、run ID 授权过宽、凭据文件挂载绕过 denylist、空 capability 放大权限等。虽然整体标记 P3，但多条（如 #84265 重放、#84270 denylist 绕过、#84271 权限放大）存在实际利用风险，建议安全团队按类目优先评估。

**已有 fix PR 的 Bug**：
- `#84276` → Bedrock reasoning stale floor 解析错误
- `#84277` → state.db WAL checkpoint 频繁 TRUNCATE
- `#84278` → replay guard 误伤相似候选
- `#84279` → Desktop 不显示 Thinking 块
- `#84281` → lone surrogate 使 SSE 静默中断

---

## 6. 功能请求与路线图信号

今日新功能请求与路线图信号密集，尤其集中在**桌面端体验**与**部署灵活性**：

### 桌面端个性化

- **#84272** — [Desktop vibe hearts 应可开关（Message Reactions 设置未覆盖）](https://github.com/NousResearch/hermes-agent/issues/84272)：已由 **PR #84273** 实现，预计将合入。
- **#57848**（7 月 3 日）— [自定义桌面背景图/壁纸](https://github.com/NousResearch/hermes-agent/issues/57848)：长期需求，已有一个多月未得到响应。
- **#84282** — 桌面宠物需感知后台会话活动（同时是 Bug/Feature）。

### 远程与连接

- **#78661** — 桌面安装向导应支持连接已有远程 gateway，反映“瘦客户端 + 远程网关”的部署模式需求。
- **#84280** — [Chat API 支持传递 profile 参数](https://github.com/NousResearch/hermes-agent/issues/84280)：用户要求 API 层可显式指定 profile，目前仅有 UI/CLI 支持。

### Markdown 与交互

- **#84243** — [自定义 Markdown 扩展以支持 action buttons](https://github.com/NousResearch/hermes-agent/issues/84243)：用户希望在聊天消息中嵌入交互按钮，增强 Agent 消息的可操作性。

### 本地模型与 TTS

- **PR #82961** — 新增本地 VoxCPM TTS provider（30 语言、声音设计与克隆），表明本地 TTS 正成为路线图亮点。
- **Issue #84158**（Harmony-format 泄漏）暴露了对 Ollama/vLLM 等自托管兼容端点的适配缺口，可能推动 `sanitize_harmony_tokens` 的逻辑泛化。

**路线图判断**：桌面个性化（vibe hearts、背景图、宠物状态）、远程 gateway、API profile 参数、本地 TTS 是当前社区呼声最高的几个方向；其中 vibe hearts 开关即将落地，其余仍在提案阶段。

---

## 7. 用户反馈摘要

从今日活跃 Issue 的评论中可提炼以下真实用户声音：

- **对 god-file 拆分的高度共识**（#78647，67 评论）：用户普遍认可“refactor god-files into clean modules”的仓库政策，并希望看到明确的拆分顺序与禁止回退的硬性约束；同时有评论关注拆分过程中的行为等价性与验证手段。
- **远程/多机使用诉求强烈**（#78661）：用户期待桌面端与远程 gateway 解耦，典型场景是“电脑上没有 ~/.hermes，但想连接办公室已在运行的实例”。
- **对中断行为的不满**（#84207）：用户遇到工具调用中断后完全无响应，必须再次 ping 才能继续，体验被形容为“silent death”，且无法区分主动停止与客户端断连。
- **自托管模型兼容性痛点**（#84158）：gpt-oss 用户发现 Harmony 格式工具调用以纯文本漏出，说明社区对 OpenAI 之外的官方/非官方模型支持有实际需求。
- **UI 准确性问题**（#84218，已关闭）：设置项显示 “auto · use main model”，实际行为却走 fast model，用户认为标签具有误导性。
- **远程桌面场景受挫**（#84274）：RDP 用户保存的 UI 缩放在重连后失效，影响远程办公体验。

---

## 8. 待处理积压

以下长期未闭合或未合并项建议维护者优先关注：

### 长期未响应/未解决的 Issues

- **#57848**（7 月 3 日）— [自定义桌面背景图](https://github.com/NousResearch/hermes-agent/issues/57848)：1 个多月无响应，需求明确且实现成本低。
- **#77165**（8 月 3 日）— [applied-secrets 未接入 provider-egress redaction](https://github.com/NousResearch/hermes-agent/issues/77165)：敏感信息可能经工具结果/终端输出泄漏，安全相关，建议优先评估。
- **#82591**（8 月 9 日）— [Kanban zero-authority workers EPIC](https://github.com/NousResearch/hermes-agent/issues/82591)：已提供完整三部分实施计划，等待维护者决策与资源分配。

### 长期未合并的 PR（按时间排序）

| PR | 创建 | 说明 |
|---|---|---|
| [#23100](https://github.com/NousResearch/hermes-agent/pull/23100) | 05-10 | memory 更新保留文件权限（NixOS/组共享部署受影响） |
| [#23016](https://github.com/NousResearch/hermes-agent/pull/23016) | 05-10 | extract_pymupdf 畸形页面范围防护 |
| [#48192](https://github.com/NousResearch/hermes-agent/pull/48192) | 06-18 | Anthropic OAuth wire 工具名归一化（billing 影响） |
| [#53894](https://github.com/NousResearch/hermes-agent/pull/53894) | 06-28 | dashboard/TUI 启用 session-owned profile-keyed shell hooks（覆盖面广，需决策） |
| [#56522](https://github.com/NousResearch/hermes-agent/pull/56522) | 07-01 | 流式 provider 错误事件处理（阿里云 DashScope 实测复现） |
| [#63292](https://github.com/NousResearch/hermes-agent/pull/63292) | 07-12 | 将中断补全视为 metadata（与 #84207 直接相关） |
| [#71947](https://github.com/NousResearch/hermes-agent/pull/71947) | 07-26 | 修复 delegate_task 标记进入共享 snapshot |
| [#70667](https://github.com/NousResearch/hermes-agent/pull/70667) | 07-24 | kanban 委托 CLI 拒绝退出码测试 |
| [#78590](https://github.com/NousResearch/hermes-agent/pull/78590) | 08-04 | **P1**：`hermes update` 未捕获 gateway 重启中止，导致 ImportError |
| [#82961](https://github.com/NousResearch/hermes-agent/pull/82961) | 08-10 | VoxCPM 本地 TTS provider（新功能） |

**风险提示**：#78590 为 P1 且已存在 8 天，涉及更新后运行环境损坏，优先级最高；#23100、#23016 已积压超三个月，外部贡献者耐心可能耗尽；#53894 因影响面横跨 CLI/TUI/Dashboard/Desktop/Windows，需要核心维护者明确决策。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

PicoClaw 在过去 24 小时共更新 3 条 Issue（新开/活跃 2 条、stale 关闭 1 条）和 6 条 PR（全部仍待合并），无新版本发布。值得注意的是，新提交的 Issue #3328（LINE webhook 配置无效）在当天即收到对应修复 PR #3329，社区响应速度较快；但全部 6 个 PR 仍处于待合并状态，合并率为 0%，维护者合入节奏可能成为当前瓶颈。整体看，项目社区提交活跃、议题讨论聚焦于会话路由与配置可靠性，但合入通道需要关注。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，代码合入进度为零。不过在待合并队列中出现了值得关注的新增项：

- **#3329 [fix(line): warn on inert webhook_host / webhook_port instead of seeding them]**（[PR #3329](https://github.com/sipeed/picoclaw/pull/3329)，2026-08-11 创建）
  针对当日报告的 #3328 提交修复，将无效配置从“静默播种”改为“显式警告”，是对配置系统可靠性的及时补强。

此外，已有 5 个 PR 在队列中等待合入，其中 #3316、#3314 为功能性 bug 修复，#3315、#3317、#3299 为功能增强（详见下文）。这些 PR 一旦合并，将解决会话路由上下文丢失、shell 命令白名单失效、Telegram 私聊话题支持、日志可观测性、Exa 搜索接入等问题——项目功能版图将显著扩大，但当前推进速度受限于合入效率。

## 4. 社区热点

- **[Issue #3301 [BUG] /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules](https://github.com/sipeed/picoclaw/issues/3301)**
  评论 3 条，是今日讨论度最高的议题。用户 `j-v` 报告了一个较为严重的会话管理缺陷：当聊天通过 dispatch rules 路由到非默认 agent 时，历史记忆完全丢失、自动压缩永不触发，导致长会话中 token 持续膨胀。该问题直接影响核心使用体验，已有对应 PR #3316 待合并，是当前社区最迫切关注的修复点。

- **[Issue #3328 [BUG] line.settings.webhook_host / webhook_port are never read](https://github.com/sipeed/picoclaw/issues/3328)**
  新建 Issue 当天即获 0 评论但快速得到 PR #3329 响应，说明维护者/贡献者对配置失效类问题敏感度高。此类“配置存在但无消费者”的问题在开源项目中常见，社区的快速反应是一个积极的健康度信号。

此外，#3294（/list models 显示不全）虽然 closed，但讨论期间有 3 条评论，反映出用户对命令语义与输出一致性存在预期差异，已由 stale 机制自动关闭，若后续仍有用户遇到可考虑重新打开。

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | 问题 | 状态 | 对应修复 PR |
|---|---|---|---|
| 🔴 高 | **#3301** dispatch 路由会话记忆丢失、自动压缩不触发，导致 token 无限增长 | [OPEN](https://github.com/sipeed/picoclaw/issues/3301) | [#3316](https://github.com/sipeed/picoclaw/pull/3316) 待合并 |
| 🟠 中 | **#3328** `line.settings.webhook_host/webhook_port` 配置项无效，且无任何警告，用户配置被静默忽略 | [OPEN](https://github.com/sipeed/picoclaw/issues/3328) | [#3329](https://github.com/sipeed/picoclaw/pull/3329) 待合并 |
| 🟠 中 | **customAllowPatterns 不生效**（PR #3314 描述）：默认 deny 规则始终优先生效，用户添加的 exec 白名单如 `git push` 无法执行 | 通过 [PR #3314](https://github.com/sipeed/picoclaw/pull/3314) 修复 | 同一 PR |
| 🟡 低 | **#3294** `/list models` 只显示当前模型而非所有已配置模型，与命令描述不符 | [CLOSED 作为 stale](https://github.com/sipeed/picoclaw/issues/3294) | 无 |

其中 #3301 与 customAllowPatterns 均涉及安全/核心功能边界，建议优先合入 #3316 与 #3314。LINE webhook 的 #3328 虽影响面较小，但#3329 的修复方式（警告 + 移除无效默认值）值得肯定，可防止类似配置陷阱再次出现。

## 6. 功能请求与路线图信号

以下 PR 代表了社区对下一版本的功能期望，目前均待合并，若能合入将构成 0.4.x 或 0.3.2 的重要功能集：

- **[PR #3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)**（8 月 3 日提交）
  扩展 Telegram 话题支持到私有 bot 聊天（目前仅识别 `Chat.IsForum`，遗漏 `IsTopicMessage`）。对使用话题模式的 Telegram 用户是刚需增强。

- **[PR #3317 feat(providers): log prompt cache tokens in LLM response debug output](https://github.com/sipeed/picoclaw/pull/3317)**（8 月 4 日提交）
  在 LLM 响应日志中补充缓存 token 信息，提升可观测性，尤其对 DeepSeek/Cloudflare AI Gateway 用户有实际价值。

- **[PR #3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)**（7 月 26 日提交）
  新增 Exa 作为原生 `web_search` provider，扩展现有搜索能力。该 PR 已存在 17 天并被打上 stale 标记，需要维护者明确是否纳入路线图。

综合来看，Telegram 话题支持（#3315）和缓存 token 日志（#3317）实现简单、风险低，较可能进入下一版本；Exa 搜索（#3299）则需要评估与现有 provider 架构的整合成本。

## 7. 用户反馈摘要

从今日的 Issues/PR 描述中可提炼出以下真实用户痛点：

- **会话路由的“记忆断层”**（#3301）：用户配置 dispatch rules 将 agent 路由到特定 Discord 频道后，发现 agent “完全记不住之前的消息”，且无论消息数或 token 数多少，自动压缩都从不触发。这会导致多轮对话体验严重下降，也让用户对路由功能的可靠性产生怀疑。
- **配置文件“写了没反应”**（#3328）：用户设置 LINE webhook_host/port 后完全不生效，且没有报错。这类“静默失效”问题最消耗用户排障时间，比显式报错更令人沮丧。
- **命令语义与实现不符**（#3294）：用户期望 `/list models` 显示所有配置模型，实际只显示当前模型。“既然命令描述写着 Configured models，就应该列出全部”——反映了用户对命令输出一致性的朴素期待。
- **自定义允许列表被忽略**（PR #3314）：用户按文档将 `git push` 加入 exec 白名单，测试显示应通过，实际却被默认 deny 规则拦截。配置与行为的不一致动摇了用户对安全边界的信任。

## 8. 待处理积压

以下 PR/Issue 长期未获合入或响应，提醒维护者重点关注：

- **[PR #3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)**
  创建于 7 月 26 日，已 17 天无进展，被打上 stale 标记。若项目认为 Exa 不应纳入原生支持，建议明确关闭并给出替代方案；若认可方向，则应安排 review，避免社区贡献者等待过久。

- **[PR #3316 fix: routed-agent context management ...](https://github.com/sipeed/picoclaw/pull/3316) 与 [PR #3314 Fix: agent not able to execute shell command ...](https://github.com/sipeed/picoclaw/pull/3314)**
  两个 PR 分别修复 #3301 和 customAllowPatterns 问题，均为功能级修复，目前待合并 9 天且 #3316 已打 stale 标记。这两项直接影响用户核心体验，建议尽快合入或给出评审意见。

- **[Issue #3294 /list models only shows the current model](https://github.com/sipeed/picoclaw/issues/3294)**
  虽已 stale 关闭，但用户期望与实现之间的差异未真正解决。若维护者认为该行为是设计使然，建议更新命令描述以消除歧义；否则可在后续版本重新打开处理。

---

**整体健康度评估**：社区贡献保持活跃，bug 报告质量高、反馈具体，PR 提交者愿意持续跟进（如 j-v 同时提交 issue 与对应修复），项目生态健康。当前最大风险是 PR 合入速度与 stale 机制可能让贡献者流失，建议维护者优先处理 #3316、#3314、#3299 三个积压项。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-12

## 今日速览

- 过去 24 小时项目整体活跃度中等偏高：新增 1 个 Issue，8 条 PR 更新，其中 3 个 PR 已合并/关闭，5 个仍待合并。
- 合并的 3 个 PR 均围绕同一方向：远程 Streamable HTTP MCP 服务器支持完成跨 provider 落地（#3092、#3221），同时新增了 Tavily MCP 工具技能（#3190）。
- 值得警惕的是新 Issue #3226 报告了一个高影响可靠性问题：平台复用消息 ID 时入站消息会被静默丢弃，用户侧表现为"agent 忽略了我"，目前尚无 fix PR。
- 待合并队列中有 5 个 PR，其中 #3220（Agent 模板升级为 Agent Plugins 1.0.0）是 core-team 提出的破坏性变更，需要重点 review。
- 无新版本发布，项目仍处于功能密集开发期。

---

## 项目进展

过去 24 小时共有 3 个 PR 被合并/关闭，项目在 MCP 集成能力和可用工具生态上迈出了一步：

- **[#3092] feat: support remote Streamable HTTP MCP servers**（已合并）
  核心引擎与 Claude provider 现已支持远程 Streamable HTTP MCP 服务器（`mcpServers` 中的 `{ type: 'http', url }` 条目），突破了此前仅支持 stdio 的限制。
  https://nanocoai/nanoclaw PR #3092

- **[#3221] feat(providers): remote Streamable HTTP MCP servers for codex and opencode**（已合并）
  作为 #3092 的后续补齐，codex 和 opencode 的 payload 构建此前仍假设 stdio-only，HTTP 条目会在配置写入时抛错。此 PR 将同一能力扩展至这两个 provider，远程 MCP 支持现已覆盖全部主要 provider。
  https://nanocoai/nanoclaw PR #3221

- **[#3190] feat: add Tavily MCP tool skill**（已合并）
  新增 Tavily 搜索的 utility skill，作为独立工具加入 `.claude/skills/`，为用户提供联网搜索能力。
  https://nanocoai/nanoclaw PR #3190

整体来看，远程 MCP 服务器支持从单 provider 扩展到了全 provider 矩阵，是本周以来 MCP 功能系列的收官动作。

---

## 社区热点

- **[#3226] Inbound messages silently dropped when a platform reuses a message id**（新开，1 条评论）
  这是当前最受关注的 Issue。用户 `dweekly` 报告：当平台在同一 session 中复用已用过的消息 ID 时，入站消息会被静默丢弃，既不会到达 agent，也没有任何用户可见的错误提示。从用户视角看，这等同于"agent 无视了我"。该 Issue 触及即时通讯类 agent 产品的信任底线，社区讨论围绕消息去重策略与可见性反馈展开。
  https://nanocoai/nanoclaw Issue #3226

- **[#3220] feat!: agent templates become Agent Plugins 1.0.0 directories**（core-team，新开）
  由核心团队成员提出，将现有 agent templates 功能迁移为 Agent Plugins 1.0.0 目录格式。这是一个标注了 `feat!` 的破坏性变更，涉及格式迁移与安全加固（stamp-time symlink/caps/secret hardening），在待合并队列中关注度较高。
  https://nanocoai/nanoclaw PR #3220

---

## Bug 与稳定性

按严重程度排序：

| 严重程度 | 问题 | 状态 | 说明 |
|---|---|---|---|
| 🔴 高 | **#3226 入站消息因消息 ID 复用被静默丢弃** | 无 fix PR | 消息丢失且无任何用户可见提示，破坏核心消息链路可靠性。上游认为是平台侧行为，但 NanoClaw 应至少具备检测/警告机制 |
| 🟠 中 | **#2346 未知斜杠命令导致响应被静默丢弃** | 已有 fix PR（#2346） | 未知斜杠命令被归类为 `passthrough`，Agent SDK 将其误判为 Claude Code 命令，输出不含 `<message>` 块导致响应无人消费。修复方案是回退到 `category: 'none'` 使其按普通聊天处理 |
| 🟠 中 | **#3195 升级流程非事务性** | 已有 fix PR（#3195） | 升级中途失败可能留下损坏的安装状态，PR 提议将升级改为事务性操作 |
| 🟡 低 | **#3145 部分既有 wirings 缺少 channel destinations** | 已有 fix PR（#3145） | 通过 migration 021 为既有 messaging-group wirings 回填缺失的 channel destinations，保留现有 destination 与自定义本地名 |

Bug 修复类 PR 队列完整：#2346、#3195、#3145 均已有对应修复提交，目前等待 review 合并。

---

## 功能请求与路线图信号

- **Agent 模板 → Agent Plugins 系统升级**（强烈信号）
  PR #3220 将 agent templates 升级为 Agent Plugins 1.0.0 目录格式，配合 #2909 的 setup wizard 模板流程与首个 agent stamping，标志着模板功能正在演进为一等公民的插件系统。这是一个跨越多个版本的功能主线，预计将进入下一里程碑。
  https://nanocoai/nanoclaw PR #3220
  https://nanocoai/nanoclaw PR #2909

- **远程 MCP 支持全面落地**
  随 #3092、#3221 合并，远程 Streamable HTTP MCP 已覆盖引擎与全部 provider。下一阶段预期是文档完善、默认启用或配置校验增强。

- **升级可靠性成为社区关注点**
  #3195 事务化升级 PR 的提出，结合此前 issue 中用户对升级风险的担忧，升级体验优化可能被纳入近期版本目标。

---

## 用户反馈摘要

- **来自 #3226 的真实痛点**：用户明确描述"从用户侧看，这和'agent 忽略了我'没有任何区别"——消息丢失毫无痕迹，用户只能感受到"agent 不理人"，这会直接摧毁对 agent 的信任。用户期望至少有一个可见的信号（如错误提示、日志或消息回执）来区分"平台丢消息"与"agent 不响应"。
  https://nanocoai/nanoclaw Issue #3226

- **来自 #2346 的场景反馈**：贡献者发现当用户输入未知斜杠命令时，SDK 将其误判为 Claude Code 命令，产出不含 `<message>` 块的输出后响应被静默丢弃。这暴露了 formatter 层对"未知命令"的兜底策略缺陷，修复后未知命令将回退为普通聊天输入，避免误判。
  https://nanocoai/nanoclaw PR #2346

---

## 待处理积压

以下 PR/Issue 长期未合并或响应，提醒维护者关注：

- **PR #2346**（5 月 8 日创建，已积压 3 个月）— fix(formatter): treat unknown slash commands as normal chat。最早的待合并 PR，修复一个会造成静默消息丢弃的 bug，建议优先处理。
  https://nanocoai/nanoclaw PR #2346

- **PR #2909**（7 月 2 日创建，超 40 天）— [core-team] feat(setup): template setup flow in the wizard and first-agent stamping。模板功能第 2 部分，与 #3220 关联，需要核心团队推进。
  https://nanocoai/nanoclaw PR #2909

- **PR #3145**（7 月 28 日创建）— fix(db): backfill destinations for existing wirings。数据迁移修复，涉及既有用户数据一致性，建议尽快合并以避免问题扩大化。
  https://nanocoai/nanoclaw PR #3145

- **PR #3195**（8 月 6 日创建）— fix(update): make NanoClaw upgrades transactional。升级稳定性修复，风险适中，等待 review。
  https://nanocoai/nanoclaw PR #3195

- **PR #3220**（8 月 10 日创建）— feat!: agent templates become Agent Plugins 1.0.0 directories。破坏性变更，core-team 主导，需充分测试后合入。
  https://nanocoai/nanoclaw PR #3220

---

*本日报数据来源于 nanoClaw GitHub 仓库（github.com/qwibitai/nanoclaw），统计窗口为 2026-08-11 至 2026-08-12。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-12

## 1. 今日速览

- 过去 24 小时项目保持高强度迭代：19 条 Issue 更新（13 条活跃 / 6 条关闭）、50 条 PR 更新（29 条待合并 / 21 条已合并或关闭），合计 69 条动态。
- 无新版本发布，项目处于 v1.3.0 开发周期的推进阶段，工作重心集中在 Reborn 架构改造：agent loop 可插拔化、profile-agnostic 持久化存储、上下文窗口管理与工具披露机制修复。
- 今日关闭的关键缺陷包括 #7487（`tool_search` 解除 describe-first 安全网）、#7488（disclosure 工具被硬编码为串行调度）、#6984（P0 级 Anthropic 缓存断点），以及 #7483（NEAR AI 默认连接与模型探测失败）。
- 用户侧出现两则真实反馈：#7517 反映 Google/GitHub 登录用户无法 staking，#7508 报告 GitHub MCP 扩展启动时出现令人困惑的 endpoint verification 提示。
- 整体健康度良好：Bug 闭环速度快、PR 合并率高（42%），但 #7484/#7485/#7490 等涉及上下文窗口与重试机制的结构性缺陷仍在处理中。

---

## 3. 项目进展

### 已合并 / 关闭的 PR

| PR | 内容 | 意义 |
|---|---|---|
| [#7470](https://github.com/nearai/ironclaw/pull/7470) | 恢复未投影 `thread_index` 行的列表可见性 | 修复侧边栏 `list_threads` 中部分线程缺失的问题 |
| [#7471](https://github.com/nearai/ironclaw/pull/7471) | 租约过期时恢复安全运行而非直接失败；隔离 journal 心跳连接池 | 提升长期运行进程的稳定性与数据面隔离性 |
| [#7503](https://github.com/nearai/ironclaw/pull/7503) | 上下文驱逐时固定保留被接受的用户任务，避免静默丢失 | 直接修复 #7484 中"任务被逐出上下文"的核心问题 |
| [#7514](https://github.com/nearai/ironclaw/pull/7514) | 为 Railway hosted volume profile 启用 sandbox shell | 增加 Railway 托管部署的运维能力 |

### 配套关闭的 Issue

- [#6984](https://github.com/nearai/ironclaw/issues/6984)（P0）：显式 Anthropic `cache_control` 断点落地，降低长对话 token 成本。
- [#7405](https://github.com/nearai/ironclaw/issues/7405)：deferred tool discovery 返回完整签名与 namespace 感知的 catalog 预览，减少模型额外往返。
- [#7483](https://github.com/nearai/ironclaw/issues/7483)：修复内置 NEAR AI provider 默认配置下 `test-connection` 与 `list-models` 失败。
- [#7487](https://github.com/nearai/ironclaw/issues/7487)：修复 `tool_search` 未返回 schema 即标记已披露、绕过 describe-first 安全网的问题。
- [#7488](https://github.com/nearai/ironclaw/issues/7488)：将三个 disclosure bridge 工具从 `ConcurrencyHint::Exclusive` 改为可并行，避免无谓串行化。
- [#7481](https://github.com/nearai/ironclaw/issues/7481)：WebUI 左侧导航长标题支持悬停查看完整内容。

### 在途重要 PR（待合并）

- [#7491](https://github.com/nearai/ironclaw/pull/7491)：OMP core-tool 契约 + 引擎 + benchmark arm（#7392，slices 1-4），与 #7489 的 coding-tools 演进直接相关。
- [#7477](https://github.com/nearai/ironclaw/pull/7477)：统一 ChannelAdapter 模型，将 web-app / Slack / Telegram 收敛为单一通道适配器。
- [#7456](https://github.com/nearai/ironclaw/pull/7456)：ReBorn 持久化存储改为 profile-agnostic，对应 epic #7467。
- [#7509](https://github.com/nearai/ironclaw/pull/7509)：模型绑定密钥从"拒绝整轮"改为确定性脱敏，避免误报阻断 prompt 构建。
- [#7512](https://github.com/nearai/ironclaw/pull/7512)：将 memory target 别名解析上移到 domain contract 层，修复 mem0 provider 存储原始 `target: "memory"` 的问题。

> 总体判断：今日是 v1.3.0 的关键拼图日——上下文保留、缓存成本、工具披露、进程恢复四个核心链路均有实质进展。

---

## 4. 社区热点

- [#7482](https://github.com/nearai/ironclaw/issues/7482)（3 条评论，最高讨论热度） — Epic: Pluggable agent loops。该 issue 提出将 IronClaw 重构为 **kernel**：负责调度、租户隔离、能力边界、密钥中介、出口边界与审计，而将 agent loop 交给 off-the-shelf ACP agents、将工具代码交给各集成方。这是项目架构边界的重大调整，风险等级标记为 high，也解释了近期大量 loop / turn-runner / context 相关 bug 的来源。
- [#7405](https://github.com/nearai/ironclaw/issues/7405)（2 条评论） — Improve deferred tool discovery。已关闭，但其中的讨论（工具检索如何返回完整签名与 namespace 感知的 catalog 预览）反映了大型工具集下减少模型多余轮次的核心诉求。

其余 Issue 评论数均为 0-1，讨论热度集中在核心开发者团队内部，尚未形成大规模外部社区讨论。

---

## 5. Bug 与稳定性

按严重程度降序排列：

| 严重度 | Issue | 问题 | Fix PR 状态 |
|---|---|---|---|
| 高 | [#7485](https://github.com/nearai/ironclaw/issues/7485) | 令牌估算器双重计算 ASCII（按 2 chars/token），导致有效上下文窗口减半；且存在两个不一致的估算器 | 无 fix PR |
| 高 | [#7484](https://github.com/nearai/ironclaw/issues/7484) | 128 条消息硬上限导致上下文窗口静默驱逐任务本身 | [#7503](https://github.com/nearai/ironclaw/pull/7503) 已合并；[#7504](https://github.com/nearai/ironclaw/pull/7504) 仍在途 |
| 中 | [#7505](https://github.com/nearai/ironclaw/issues/7505) | Memory target 别名只在 native provider 解析，mem0 按字面量存储，跨 provider 行为不一致 | [#7512](https://github.com/nearai/ironclaw/pull/7512) 待合并 |
| 中 | [#7486](https://github.com/nearai/ironclaw/issues/7486) | 类型化 no-progress 逃逸对幂等读/轮询误报，合法长任务可能被终止 | 无 fix PR |
| 中 | [#7490](https://github.com/nearai/ironclaw/issues/7490) | `retry_disposition()` 约 25 个瞬时错误分类表是死代码，静默重驱机制未接线 | 无 fix PR |
| 中低 | [#7489](https://github.com/nearai/ironclaw/issues/7489) | `result_read` 24 KiB 预览上限 + 2000 行不可编辑墙，两个复合的往返膨胀问题 | tracking issue，预计随 #7435 OMP cutover 解决 |
| 低 | [#7508](https://github.com/nearai/ironclaw/issues/7508) | GitHub MCP 扩展启动时出现"endpoint verification"困惑提示而非直接连接（QA 实例） | 无 fix PR |

今日已修复的 Bug（已关闭）：#7487、#7488、#7483。

---

## 6. 功能请求与路线图信号

### 新功能请求

- [#7517](https://github.com/nearai/ironclaw/issues/7517)（2026-08-12 创建）：Cloud.near.ai 允许 Google/GitHub 登录用户走 staking 路径。目前 Credits 仅支持 Stripe，"Sign in with NEAR" 只作为登录方式、不能附加到已有第三方账户。这是一个明确的 WebUI / 账户体系功能缺口，预计会进入后续 WebUI 迭代。
- [#7496](https://github.com/nearai/ironclaw/issues/7496)：Host-mediated IdentyClaw Passport（`builtin.idcp` + practitioner helper）。希望在 processless/secure-default 配置下提供官方 IdentyClaw Passport 集成路径。

### 路线图信号（Epic）

- [#7482](https://github.com/nearai/ironclaw/issues/7482)（risk: high）— Pluggable agent loops：IronClaw 向 kernel 演进，agent loop 外包给 ACP 标准。该方向直接驱动当前所有 loop 相关重构。
- [#7467](https://github.com/nearai/ironclaw/issues/7467)（risk: high）— ReBorn 持久化状态 profile-agnostic 化，已有对应 PR #7456 在途。
- [#6879](https://github.com/nearai/ironclaw/issues/6879)（v1.3.0）— Automation runs 可靠性：触发执行被当作普通交互轮次处理，尚无对应 PR，值得关注。
- [#7038](https://github.com/nearai/ironclaw/issues/7038)（v1.3.0）— Storybook + AI-first Design System：配套 PR #7498（automation suggestion cards V1 backend）今日仍在更新。

判断：#7517 是最有可能被纳入下一版本的 WebUI 功能请求；#7482 与 #7467 已在推进中；#6879 是 v1.3.0 中仍未行动的 epic。

---

## 7. 用户反馈摘要

- **多登录方式的 staking 缺口（#7517）**：用户报告 Cloud.near.ai 使用 Google/GitHub 登录后无法 staking 获取推理额度，Stripe 是唯一充值方式，且 NEAR 钱包只能作为独立登录入口、不能与已有第三方账户绑定。这反映了账户体系与加密钱包集成尚未打通。
- **MCP 扩展启动引导困惑（#7508）**：QA 用户在 Railway 实例上报告，GitHub MCP 扩展启动时系统声称"已注册并安装"，随后却抛出 endpoint verification 的多重顾虑，而不是干净地建立连接。说明 MCP 扩展的启动流程与错误提示需要优化。
- **侧边栏长标题不可读（#7481）**：WebUI 左侧导航中，超出宽度的会话标题被截断且无悬停提示。该问题已在当日由 [italic-jinxin](https://github.com/nearai/ironclaw/issues/7481) 修复并关闭，小 UX 问题闭环较快。

整体来看，外部用户反馈集中在 WebUI 与扩展接入的体验层；核心架构讨论仍以内团队为主。

---

## 8. 待处理积压

| 条目 | 创建时间 | 状态 | 建议 |
|---|---|---|---|
| [#6879](https://github.com/nearai/ironclaw/issues/6879) Automation runs 可靠性 | 2026-07-29 | 开放，0 评论，v1.3.0 | 重要 epic 但长期无讨论与行动，建议排期拆分 |
| [#7038](https://github.com/nearai/ironclaw/issues/7038) Design System epic | 2026-08-03 | 开放，配套 PR #7498 在途 | 涉及 Storybook 与设计体系，等待合并周期较长 |
| [#7274](https://github.com/nearai/ironclaw/pull/7274) 保留 Anthropic prompt cache across tool promotion | 2026-08-06 | 开放，size: XL | 等待合并近一周，属于 LLM 成本优化关键项 |
| [#7365](https://github.com/nearai/ironclaw/pull/7365) memory-save guidance + MEMORY.md prompt lane | 2026-08-07 | 开放，size: XL | 直接修复"事实跨会话不记忆"问题，建议优先 review |

---

*数据来源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)，统计窗口为 2026-08-11 至 2026-08-12。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报

**日期：2026-08-12** | **数据窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时内，LobsterAI 项目保持**较高活跃度**：共产生 6 条 Issue 更新、9 条 PR 更新，并发布了 2026.8.11 新版本。本日有 4 个有效修复/功能 PR 被合并（Windows 插件安装可靠性、跨平台文件图标兼容性、模型级思考级别、Escape 键交互优化），同时 2026.8.12 的发布 PR 已启动，版本迭代节奏紧凑。值得关注的是，多个自 3-4 月创建的历史 Issue 集中进入 stale 状态，其中沙箱策略、卸载残留等用户关切仍未获得官方明确回应，社区等待时间较长。

---

## 2. 版本发布

### LobsterAI 2026.8.11（2026-08-11 发布）

**What's Changed：**

| 变更 | 说明 | 作者 |
|------|------|------|
| `feat(cowork)` | 新增 collapse-agent-tasks 快捷键，并允许在打字时使用修饰键快捷键 | [@fisherdaddy](https://github.com/netease-youdao/LobsterAI/pull/2469) |
| `feat(cowork)` | 在侧边栏标记定时任务会话 | [@liuzhq1986](https://github.com/netease-youdao/LobsterAI) |

- **破坏性变更：** 无
- **迁移注意事项：** 无特别说明

> 注：2026.8.10 版本（由 PR #2477 合并）新增了可配置模型思考级别、Cowork 进度可见性改进、定时任务识别、本地文件工作流优化及多项启动/运行时可靠性修复，目前已合入 main。

---

## 3. 项目进展

本日合并/关闭的关键 PR 反映项目在**插件管理可靠性、跨平台兼容性和模型配置体验**上的持续投入：

| PR | 内容 | 状态 | 价值 |
|----|------|------|------|
| [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) | `fix(plugins)`：Windows 安装时保留 junction，原子化重命名避免 `EPERM` 符号链接失败 | ✅ 已合并 | 修复 Windows 插件安装核心故障 |
| [#2478](https://github.com/netease-youdao/LobsterAI/pull/2478) | `fix(shell)`：修复 macOS/Windows 不支持 large 文件图标大小导致的异常 | ✅ 已合并 | 跨平台健壮性提升 |
| [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) | `fix(model-selector)`：为每个模型分配独立的思考强度，修复全局共享导致的互斥覆盖 | ✅ 已合并 | 模型配置体验重要改进 |
| [#2476](https://github.com/netease-youdao/LobsterAI/pull/2476) | `feat(ui)`：Escape 键仅关闭最顶层弹窗，正确处理嵌套弹窗与 IME 合成 | ✅ 已合并 | UI 交互细节完善 |
| [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) | `feat(model)`：模型提供商添加官网链接和 API Key 获取引导，合并重复 URL 表 | ✅ 已关闭/合并 | 模型配置易用性提升 |
| [#2480](https://github.com/netease-youdao/LobsterAI/pull/2480) | Release/2026.8.12 发布 PR | ✅ 已关闭（模板待完善） | 下一版本发布流程已启动 |

**整体评价**：项目今日完成 4 个有效合并，覆盖插件管理、跨平台兼容、模型配置和 UI 交互，同时推进新版本发布流程。从 [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) 和 [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) 可看出模型管理模块正在成为近期迭代重点。

---

## 4. 社区热点

今日最受关注的讨论集中于**用户信任与产品策略**方面：

### 🔥 [#1173「卸载之后程序还能运行？」](https://github.com/netease-youdao/LobsterAI/issues/1173)
- **状态：** OPEN / stale | 评论 1 | 更新于 08-12
- **诉求：** 用户在 Windows 卸载 LobsterAI 后，已打开的窗口仍可运行，甚至还能给飞书发消息，情绪激动地质疑「是不是偷偷留后门」。
- **分析：** 这是涉及产品信任的高敏感反馈。无论技术原因如何（如进程未随卸载终止、服务残留），建议官方尽快正式回应并修复卸载逻辑。

### 🔥 [#1179「3.31 版本强制沙箱怎么关？」](https://github.com/netease-youdao/LobsterAI/issues/1179)
- **状态：** OPEN / stale | 评论 2 | 更新于 08-12
- **诉求：** 用户反馈 3.31 版强制启用沙箱且找不到关闭入口，回滚 3.30 即正常。
- **分析：** 强制策略上线缺少用户选项和沟通，引发明显反弹，需评估默认策略是否应改为「可选开启」。

### 🔥 [#1180「修改自建 agent 触发网关反复重启」](https://github.com/netease-youdao/LobsterAI/issues/1180)
- **状态：** OPEN / stale | 评论 1 | 更新于 08-12
- **诉求：** 用户修改自建 agent 图标即触发网关反复重启，删除 agent 后恢复正常。
- **分析：** 修改元数据即可导致控制面崩溃，暴露配置变更链路的健壮性不足，属高严重度 bug。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 修复状态 |
|--------|----------|------|----------|
| 🔴 高 | [#1180](https://github.com/netease-youdao/LobsterAI/issues/1180) | 修改自建 agent 触发网关反复重启 | ❌ 无 fix PR |
| 🟠 中 | [#1179](https://github.com/netease-youdao/LobsterAI/issues/1179) | 3.31 强制沙箱无法关闭 | ❌ 无 fix PR（产品策略争议） |
| 🟠 中 | [#1173](https://github.com/netease-youdao/LobsterAI/issues/1173) | 卸载后程序仍能运行并发送消息 | ❌ 无 fix PR（信任危机） |
| 🟡 低 | [#1236](https://github.com/netease-youdao/LobsterAI/issues/1236) | 插件 entry key 与 manifest ID 不匹配，启动产生配置警告 | ✅ 已关闭 |
| 🟡 低 | [#2071](https://github.com/netease-youdao/LobsterAI/issues/2071) | 2026.5.27 版本创建定时任务报错 | ✅ 已关闭 |
| ✅ 已修复 | [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) | Windows 插件安装 EPERM 符号链接失败 | ✅ 已合并 |
| ✅ 已修复 | [#2478](https://github.com/netease-youdao/LobsterAI/pull/2478) | macOS/Windows 大文件图标大小不支持 | ✅ 已合并 |

**稳定性小结**：今日合并的修复集中于跨平台兼容与插件安装基础设施，但直接影响用户的沙箱策略、卸载残留、网关重启三个问题仍悬而未决，且已持续 4 个月以上，需优先纳入后续版本计划。

---

## 6. 功能请求与路线图信号

| 反馈 | 类型 | 状态 | 路线图信号 |
|------|------|------|------------|
| [#1174](https://github.com/netease-youdao/LobsterAI/issues/1174) 支持多个自定义模型提供商并存 | Feature | OPEN/stale | 结合已合并的 [#2475 模型级思考级别](https://github.com/netease-youdao/LobsterAI/pull/2475) 和 [#1233 官网/API Key 引导](https://github.com/netease-youdao/LobsterAI/pull/1233)，**模型管理正在成为迭代主线**，该请求很可能被纳入后续版本 |

**其他信号：**
- Cowork 模块获得持续投入（2026.8.11 快捷键与定时任务标记、2026.8.10 进度可见性）
- PR #1181（隐藏 OpenClaw 主 agent 会话）已具备完整功能但长期未合并，属于 cowork 体验优化方向

---

## 7. 用户反馈摘要

从今日更新的 Issue 评论中提炼真实用户声音：

- **沙箱策略引发反弹**（[#1179](https://github.com/netease-youdao/LobsterAI/issues/1179)）：「找不到关的按钮，哪个文件能改？回滚 3.30 正常」——用户明确表达强制启用不可接受，需要官方提供关闭入口或默认策略调整。部分高级用户甚至愿意手动改配置文件，反映文档/选项缺失。
- **卸载行为触发信任危机**（[#1173](https://github.com/netease-youdao/LobsterAI/issues/1173)）：「你们是不是在用户电脑上偷偷留后门准备操控电脑？！」——无论技术原因（进程未终止、服务未清理），这类问题对产品信誉损伤极大，建议第一时间回应并给出技术解释。
- **Agent 配置健壮性不足**（[#1180](https://github.com/netease-youdao/LobsterAI/issues/1180)）：「修改了自建 agent 的图标，触发网关反复重启」——简单元数据变更即可导致控制面崩溃，说明配置热更新链路缺乏防护。
- **定时任务不稳定**（[#2071](https://github.com/netease-youdao/LobsterAI/issues/2071)）：5 月反馈的创建定时任务报错（附截图），直至 8 月才关闭，中间等待时间较长。

---

## 8. 待处理积压

以下为长期未响应或悬而未决的项目，建议维护团队关注：

| 项目 | 类型 | 创建时间 | 状态 | 积压时长 | 说明 |
|------|------|----------|------|----------|------|
| [#1173 卸载后程序仍运行](https://github.com/netease-youdao/LobsterAI/issues/1173) | Bug/信任 | 2026-03-31 | OPEN/stale | 134 天 | 涉及产品信任，需优先官方回应 |
| [#1179 强制沙箱无法关闭](https://github.com/netease-youdao/LobsterAI/issues/1179) | 产品策略 | 2026-03-31 | OPEN/stale | 134 天 | 设计争议，需与用户沟通 |
| [#1180 网关反复重启](https://github.com/netease-youdao/LobsterAI/issues/1180) | Bug | 2026-03-31 | OPEN/stale | 134 天 | 高严重度，长期未修复 |
| [#1174 多自定义模型提供商](https://github.com/netease-youdao/LobsterAI/issues/1174) | Feature | 2026-03-31 | OPEN/stale | 134 天 | 需求明确，契合当前迭代方向 |
| [#1181 隐藏 OpenClaw 主 agent 会话](https://github.com/netease-youdao/LobsterAI/pull/1181) | PR | 2026-04-01 | OPEN | 133 天 | 功能完整但长期未合并，建议 reviewer 跟进 |
| [#1277 electron 依赖升级](https://github.com/netease-youdao/LobsterAI/pull/1277) | PR | 2026-04-02 | OPEN | 132 天 | dependabot 提交，electron 40→43 大版本升级，建议评估安全性收益后合并 |

---

## 项目健康度总评

| 维度 | 评分 | 说明 |
|------|------|------|
| **活跃度** | ★★★★☆ | 每日稳定合并 PR、按周发布版本，节奏健康 |
| **响应速度** | ★★☆☆☆ | 3-4 月的历史 Issue 多未获回应，已进入 stale 状态 |
| **稳定性投入** | ★★★★☆ | 本日 4 个合并 PR 全部围绕可靠性/兼容性 |
| **社区信任** | ★★☆☆☆ | 卸载残留、强制沙箱两个议题持续发酵，需官方发声 |

---

*本日报由 AI 分析师自动生成，数据来源：[github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-12

## 1. 今日速览

过去24小时内，Moltis 项目整体活跃度较低：无新增或关闭的 Issue，无新版本发布，唯一动态是一条重要的功能型 PR（#1190）提交待合并。该 PR 聚焦本地 CalDAV 连接器与持久化数据集能力，若被合并将显著扩展 Moltis 作为个人 AI 助手的数据接入范围。当前项目处于“提交待评估”阶段，社区讨论尚未展开，整体处于静默蓄力期。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

**暂无已合并/关闭的 PR，但有一项重要 PR 正在等待审查：**

| PR | 状态 | 核心内容 |
|---|---|---|
| [#1190 Add durable local CalDAV connectors](https://github.com/moltis-org/moltis/pull/1190) | 待合并 | 引入 provider-neutral 连接器持久化、原子性 CalDAV 快照、调度与投影功能，并附带本地全文搜索；新增提示编译数据集计划及一个只读的 `connectors` Agent 工具，用于本地数据集访问；同时扩展了 Settings > Connectors 的账户与数据集管理界面 |

**项目向前推进的评估：**
该 PR 覆盖了从数据接入（CalDAV）、存储（快照与持久化）、检索（本地全文搜索）到 Agent 工具链（只读 connectors 工具）的完整链路，是数据层能力的一次系统性增强。尤其是“连接器持久化”和“原子快照”设计，为后续多数据源稳定同步奠定了架构基础。若顺利合并，项目将从单纯对话助手向本地优先的“个人数据代理”方向迈出坚实一步。

## 4. 社区热点

今日无高讨论量 Issue/PR。唯一活跃项为 [PR #1190](https://github.com/moltis-org/moltis/pull/1190)，目前评论与表态数均为 0，尚未引发社区讨论。

**潜在关注点分析：**
虽然暂无评论，但该 PR 触及两个社区可能高度关注的方向：
- **本地数据主权**：CalDAV 连接器持久化意味着用户日历、任务等敏感数据可完全留在本地，符合“本地优先”工具的用户预期；
- **Agent 工具扩展性**：新增 `connectors` 只读工具为后续 Agent 自主查询本地数据提供了官方通路，可能引发关于 Agent 数据权限边界的讨论。

建议维护者主动在 PR 下发起说明，引导社区参与设计讨论。

## 5. Bug 与稳定性

今日无新增 Bug、崩溃或回归问题报告，无相关稳定性修复 PR。项目当前未暴露明显的稳定性风险，但需注意 PR #1190 中“原子性快照”与“本地全文搜索”属于较高复杂度的存储逻辑，待合并后建议重点观察索引一致性与磁盘占用相关潜在问题。

## 6. 功能请求与路线图信号

今日无用户提交新的功能请求 Issue，但 [PR #1190](https://github.com/moltis-org/moltis/pull/1190) 本身透露了明确的路线图信号：

- **连接器生态化**：PR 强调“provider-neutral”连接器模型，说明项目有意支持除 CalDAV 外的更多数据源（如本地文件、邮件等），这可能是下一阶段的核心架构方向；
- **数据集计划（dataset plans）**：提示编译数据集计划功能，暗示后续将支持用户自定义数据提取与整理管道，可能成为个性化助手能力的重要基础；
- **本地全文搜索**：作为 Agent 工具的基础能力被引入，后续可预见到更强大的检索增强生成（RAG）功能整合。

该 PR 若被合并，预计会孵化一系列围绕“本地数据连接器”的后续迭代需求。

## 7. 用户反馈摘要

今日无 Issue 评论或用户反馈数据。由于 PR #1190 尚未合并且无讨论，无法从社区获取直接的用户痛点表述。但结合 PR 的功能设计，可以推断以下潜在用户诉求：

- **数据接入的持久性与可靠性**：用户需要日历、任务等数据在本地长期稳定同步，而非每次会话临时拉取；
- **离线可用性**：本地快照与全文搜索反映用户希望在网络不可用时仍能访问和检索个人数据；
- **隐私与安全**：只读 connector 工具的设计迎合了“Agent 读取数据但不修改”的安全预期，减少用户对 AI 操作敏感数据的顾虑。

若该 PR 合并后收到用户实证反馈，建议维护团队整理成用例文档，以指导下一轮连接器开发。

## 8. 待处理积压

当前积压项较少，唯一需要关注的是 [PR #1190](https://github.com/moltis-org/moltis/pull/1190)。该 PR 提交于 2026-08-11，包含多项新功能与设置界面变更，涉及面较广，可能需要较多审查时间。建议维护者：

- 尽快安排代码审查，明确该 PR 是否纳入当前迭代周期；
- 若计划合并，考虑拆分为多个小 PR（如连接器核心、搜索、设置界面）以降低回归风险；
- 合并前补充测试覆盖，尤其是原子快照的异常恢复场景。

---

*数据来源：[Moltis GitHub 仓库](https://github.com/moltis-org/moltis)*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目活跃度较高：共产生 22 条 Issue 更新（10 条新开/活跃、12 条已关闭），43 条 PR 更新（21 条已合并/关闭、22 条待合并），并发布 v2.1.0-beta.3，同时版本号已推进至 2.1.0b4（PR #6920）。社区讨论热点集中在公式渲染、MCP 工具稳定性、多步骤任务自动中断三个方向，其中公式渲染问题有多个 Issue 被关闭（#5453、#4756、#6893），官方应该已在处理中。项目整体健康度良好，发布节奏稳定，但仍有若干高优 Bug（#6919 崩溃、#6918 影子实例）和一条安全权限问题（#6916）尚未关闭，需要维护者重点关注。

## 2. 版本发布

### v2.1.0-beta.3（2026-08-11/12 发布）

**更新内容：**

- **新功能：工作区文件博客**（PR [#6783](https://github.com/agentscope-ai/QwenPaw/pull/6783)，by @zhaozhuang521）— 为工作区文件引入博客式展示/发布能力。
- **修复：Provider 能力缓存**（PR [#6723](https://github.com/agentscope-ai/QwenPaw/pull/6723)，by @ningblue）— 过期 stale capability cache 条目，并在模型切换时主动清除缓存。此修复极有可能回应了社区反馈的 MCP 工具规律性失效问题（Issue [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）。
- **Chore：版本号 bump 至 2.1.0-beta.3。**

**破坏性变更：** 无明确标记的破坏性变更。

**迁移注意事项：** 该版本为 Beta 预发布版，建议在测试环境验证后再用于生产。若此前遇到"长时间运行后工具失效"的问题，建议立即升级验证 #6723 的修复是否生效。

**版本节奏信号：** PR [#6920](https://github.com/agentscope-ai/QwenPaw/pull/6920)（chore: bump the version to 2.1.0b4）已在今日合并，表明 2.1.0b4 正在路上。

## 3. 项目进展

今日有 21 条 PR 合并/关闭。按影响面筛选，以下合并 PR 对项目有明显推进：

| PR | 内容 | 意义 |
|---|---|---|
| [#6873](https://github.com/agentscope-ai/QwenPaw/pull/6873) | 修复 legacy（pre-2.0）会话中本地路径媒体源加载失败 | 直接修复 Issue [#6872](https://github.com/agentscope-ai/QwenPaw/issues/6872)，解决旧会话无法加载的"数据中断"问题 |
| [#6907](https://github.com/agentscope-ai/QwenPaw/pull/6907) | IM 频道（飞书/QQ/企微/小易/元宝）支持自定义网关端点 | 为私有网关、本地测试场景提供灵活性，改善自托管体验 |
| [#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898) | 修正 `read_file` 工具描述与实际行为不符的问题 | 避免模型用 `read_file` 读取二进制文件导致乱码 |
| [#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915) | 修复 Unicode PDF 文件名、SVG 文件预览失败及暗色模式样式 | 控制台文件预览体验补全 |
| [#6920](https://github.com/agentscope-ai/QwenPaw/pull/6920) | 版本号 bump 至 2.1.0b4 | 下一个迭代的版本基线 |

**整体判断：** 今日合并的 PR 以修复为主（legacy 兼容、工具描述、文件预览），新功能侧有 IM 网关自定义增强。项目处于 Beta 冲刺阶段的"稳定修复 + 小步快跑"状态。

## 4. 社区热点

### 讨论最热门的 Issues

| Issue | 评论数 | 状态 | 核心诉求 |
|---|---|---|---|
| [#6732 MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732) | 10 | 已关闭 | MCP 工具在数小时/隔夜后失效，需重启 Docker 容器恢复 |
| [#6893 公式渲染 + 会话分组 + 活动会话背景](https://github.com/agentscope-ai/QwenPaw/issues/6893) | 7 | 已关闭 | KaTeX 公式无法渲染（对比 cherry studio 可正常显示）、会话分组管理、活动会话背景色 |
| [#5790 Loading 动画不消失](https://github.com/agentscope-ai/QwenPaw/issues/5790) | 4 | 已关闭 | Agent 回复完成后输入框上方 spinner 仍持续显示 |
| [#6882 如何集成 CopilotKit](https://github.com/agentscope-ai/QwenPaw/issues/6882) | 3 | 开放中 | 用户希望获得 CopilotKit 集成的思路或示例 |
| [#6900 隔离聊天项目目录与 Agent 工作区](https://github.com/agentscope-ai/QwenPaw/issues/6900) | 3 | 已关闭 | 每个持久化 Chat 应有独立项目目录，`workspace_dir` 保持系统内部管理 |

### 需求分析

- **MCP 稳定性是所有自托管用户的核心痛点**（#6732），关联修复已随 v2.1.0-beta.3 发布，需观察社区验证反馈。
- **公式渲染是被多次提出的体验短板**（#6893、#5453、#4756 三个 Issue 均指向同一问题），且用户拿 cherry studio 做对标，属于"可感知的产品竞争力差距"。
- **CopilotKit 集成提问**（#6882）显示用户希望将 QwenPaw 嵌入更大的 AI 应用生态，而不是作为孤立产品使用。
- **聊天项目目录与 Agent 工作区分离**（#6900）——来自高级用户的架构级诉求，类似 IDE 的"打开项目"心智模型。

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（影响核心功能使用）

- **[#6919] qwenpaw-v2.0.1 经常性崩溃**（2026-08-11 创建，开放中，2 条评论，[链接](https://github.com/agentscope-ai/QwenPaw/issues/6919)）— pip 安装 + 虚拟环境 + Web 端方式，`console process/reply failed` 报错并带完整 traceback。**暂无对应 fix PR，需优先排查。**
- **[#6918] Agent 间消息为每条消息新建会话，导致并发"影子实例"和重复数据**（2026-08-11 创建，开放中，[链接](https://github.com/agentscope-ai/QwenPaw/issues/6918)）— 由用户 agent 代笔，中英双语描述。**暂无 fix PR，涉及多 Agent 并发架构，风险等级高。**

### 🟠 中高（安全问题 / 权限模型）

- **[#6916] 插件可在无用户确认的情况下静默创建 cron 任务并注入用户可见消息**（2026-08-11 创建，开放中，[链接](https://github.com/agentscope-ai/QwenPaw/issues/6916)）— 通过 Apps 市场安装的 `team_c` 插件即可持久化注入消息。属权限模型缺口，严重度定为"中高"，**暂无 fix PR**。

### 🟡 中等

- **[#6921] 多步骤任务在输出"Now 2.1, 3.1..."后无提示停止**（2026-08-12 创建，开放中，[链接](https://github.com/agentscope-ai/QwenPaw/issues/6921)）— 2.1beta2 / Windows 11，模型规划下一步后就中断，需用户说"继续"才恢复。影响自动化任务的连续性，**暂无 fix PR**。

### 🟢 低 / 已有修复

- **MCP 工具规律性失效**（[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）— 已关闭，相关缓存修复已随 v2.1.0-beta.3 发布（#6723）。
- **Legacy 会话媒体加载失败**（[#6872](https://github.com/agentscope-ai/QwenPaw/issues/6872)）— 已关闭，修复 PR [#6873](https://github.com/agentscope-ai/QwenPaw/pull/6873) 已合并。
- **v2.1.0b1 桌面版 PYTHONHOME 注入导致 Python 子进程崩溃**（[#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697)）— 已关闭。
- **Loading 动画不消失**（[#5790](https://github.com/agentscope-ai/QwenPaw/issues/5790)）— 已关闭。
- **`read_file` 工具描述与实际行为不符**（PR [#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)）— 已合并修复。

## 6. 功能请求与路线图信号

### 高概率进入下一版本

- **3D 记忆图谱**：PR [#6922](https://github.com/agentscope-ai/QwenPaw/pull/6922)（feat(console): add 3D memory graph）今日新开，将知识库记忆图谱从 2D SVG 升级为交互式 3D 力导向图，目前处于开放状态。
- **市场页面统一**：PR [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) 将 Apps、Plugins、Skills 三大市场统一到 `/market` 页面，正在评审中（Under Review）。
- **MCP 工具调用超时可配置**：PR [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) 为 stdio/HTTP 传输层增加默认 120 秒超时，直接回应 #6724，开放中。
- **桌面端记忆窗口几何位置**：PR [#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877) 使用 Tauri 官方 window-state 插件保存/恢复窗口位置和大小。

### 社区呼声较高的需求

- **公式渲染（KaTeX 支持）**：三个 Issue（[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)、[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)、[#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756)）均已被关闭，推测官方已在处理或规划中。
- **Agent 主动向收件箱投递报告**（[#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917)，开放中）— 用户希望 Agent 可将结构化报告固定投递到 Inbox，而非随聊天滚动流失。
- **自定义频道插件配置能力回归**（[#6924](https://github.com/agentscope-ai/QwenPaw/issues/6924)，开放中）— 2.0.x 之后自定义渠道的交互配置入口被限制为仅内置渠道，第三方频道开发者受影响。
- **LongHorizon-Harness 长周期任务方向**（[#6923](https://github.com/agentscope-ai/QwenPaw/issues/6923)，开放中）— 用户建议参考外部项目，解决跨多轮任务的状态漂移问题，与 #6921 的"任务中断"痛点互补。

## 7. 用户反馈摘要

- **公式渲染是体验短板的"重灾区"**：用户直言"就很尴尬！！！"（[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)），并明确对比"cherry studio 之类都可以"；另一用户称渲染能力"pool"（[#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756)）。这说明公式渲染直接影响 QwenPaw 在学术/数据类用户中的口碑。
- **MCP 失效的运维代价高**（[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)）：工具失效后"没法自动被调用，答复未注册或不存在"，需要重启 Docker 容器恢复——这对 7×24 部署的用户是直接的生产事故。
- **QQ bot 工作流信息全量推送触发限流**（[#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897)）：实际使用中每一步工作流都发送到 QQ，导致"QQ 一直不断提醒新信息"并触发限流。用户希望有更细粒度的消息控制，而非默认全量推送。
- **"假完成"问题影响信任感**（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）：Agent 规划好下一步就停止且无视觉提示，用户需要手动说"继续"才能推进——用户将其描述为"无任何提示"、需要"我才会继续任务"，说明对自主 Agent 的执行确定性存在疑虑。
- **社区交流需求**（[#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895)）：有用户主动建议建立微信群，"微信用户人群多，便于交流"，侧面反映社区活跃度高但官方沟通渠道还不够下沉。
- **安全敏感度提升**（[#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916)）：用户对插件静默创建定时任务和注入消息表达了明确担忧，说明开发者用户对权限模型的期望是"默认最小权限 + 显式批准"。

## 8. 待处理积压

### 长期开放 PR（提醒维护者关注）

| PR | 创建时间 | 积压天数 | 说明 |
|---|---|---|---|
| [#5490](https://github.com/agentscope-ai/QwenPaw/pull/5490) 图片全屏画廊（PreviewGroup） | 2026-06-24 | 49 天 | 控制台聊天图片预览体验增强，长期未合并 |
| [#5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) TUI/Console 斜杠命令自动补全 | 2026-07-08 | 35 天 | Under Review，暴露系统命令给所有 UI |
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) 每会话模型覆盖（per-session model overrides） | 2026-07-12 | 31 天 | Under Review，单 Agent 不同会话可用不同 LLM |
| [#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779) Scroll 与 AgentScope 生命周期对齐的重构 | 2026-08-07 | 5 天 | 核心上下文模块重构，涉及面大需谨慎评审 |
| [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) 集成 AnySearch 搜索（替代 Tavily） | 2026-08-08 | 4 天 | 新搜索 Provider + MCP 集成 |

### 高优开放 Issue（暂无 fix PR）

- **严重**：[#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) 崩溃（2026-08-11）— 2 天未响应，建议优先复现并定位 `console process/reply failed` 的根因。
- **严重**：[#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) 影子实例/重复数据（2026-08-11）— 2 天未响应，涉及多 Agent 消息路由架构。
- **中高安全**：[#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) 插件静默 cron（2026-08-11）— 2 天未响应，建议将权限模型提上路线图。
- **中等**：[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) 多步骤任务自动中断（2026-08-12）— 当天新增，Beta 版本反馈，建议纳入 2.1.0b4 验证范围。

---

**项目健康度评估（满分 5 星）：★★★★☆**

- 发布节奏稳定（Beta 迭代密集，b4 已在路上）
- 社区互动活跃（Issue/PR 讨论充分，中文社区声音大）
- 但存在崩溃类高优 Bug、安全权限模型缺口未关闭，且长期 PR 积压（#5490、#5869、#5992）需要维护者排期消解。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目讨论热度极高：Issues 更新 50 条（新开/活跃 41，关闭 9），PR 更新 50 条（待合并 49，合并/关闭仅 1），无新版本发布。社区讨论仍集中在三大方向：**架构级 RFC**（Goal mode、Chat Completions 兼容、会话/传输层归属）、**安全策略**（shell 命令确认、forbidden_paths 漏洞、认证管线）、**成本治理**（$0 支出导致预算上限失效、多别名定价）。值得肯定的是，今日新报告的 3 个 P1 级 Bug 均在当天获得了对应修复 PR（#9937/#9938/#9939），开发者响应迅速；但 49:1 的待合并/合并比表明 **PR 合并吞吐量是当前项目健康度的主要瓶颈**，大量高质量 PR 卡在 `needs-author-action` 或维护者审查环节。

## 2. 版本发布

无新版本 Release。

## 3. 项目进展

今日仅合并 1 个 PR，但内容为跨仓库安全/正确性修复同步：

- **[#9936] fix(sync): cherry-pick upstream security and correctness fixes**（已合并）— 从上游选择性同步 9 个安全与正确性修复（跳过 2 个已在本树中的补丁），涉及范围覆盖核心、agent、channel、provider、security、CLI 等几乎全部模块。此次合入确认了上游修复的向下游传递通道仍然健康。
  链接: https://github.com/zeroclaw-labs/zeroclaw/pull/9936

今日关闭的 9 个 Issue 中，较重要的有：

| Issue | 说明 |
|---|---|
| [#2269] Token 成本管理 RFI | 社区意见征集结束并关闭，将进入设计阶段 |
| [#7232] 结构化可观测性 RFC | 高级事件 + OTel 关联 + Bridge 重构提案完成讨论 |
| [#9035] Docker Compose 网关回环绑定 Bug | 网关在 published port 后仍绑定 loopback，S1 级问题已解决 |
| [#9545] rustdoc 警告门禁 CI 任务 | 已实施，防止零警告状态静默回归 |
| [#9768] daemon reload 信号误导 Bug | SIGUSR1 不触发 reload，且安全警告引导操作者发送会杀死进程的信号，已修复 |

从关闭内容看，项目在**可观测性、CI 质量门禁、部署体验**三个方向均有实际落地。但 50 条 PR 中仅 1 条合并，大量已实现功能的 PR（如 WASM 配置校验、SSRF 防护、Hailo-Ollama 支持、A2A 客户端等）仍在等待合并，建议维护者优先清理 `needs-maintainer-review` 队列。

## 4. 社区热点

今日讨论热度最高的 Issue 反映了社区的**核心诉求与焦虑**：

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#8303] RFC: Goal mode v1（有界前台 Matrix 工作） | 19 | 用户需要跨多轮对话持久化追求一个有界目标；但原始提案范围过大（耦合重启交接、Web、异步子工作），社区在争论如何拆分首期交付 |
| [#8603] RFC: ZeroClaw Chat Completions profile | 18 | 开放 OpenAI Chat Completions 协议支持，让 Open WebUI、LobeChat、Continue.dev、Aider 等主流工具可直接接入 ZeroClaw，生态集成呼声强烈 |
| [#7155] 高风险 shell 命令确认层级 + Claude Code 风格策略 | 17 | 用户希望引入 allow/ask/deny 命令策略，提升 shell 工具的安全可控性，已修订至 Rev 3，范围收敛中 |
| [#7141] 可插拔入站认证与规范主体 | 14 | 身份与访问管理基础架构设计，已迭代至 Rev 8，是最成熟的 RFC 之一 |
| [#8692] 维护者决策队列 Tracker | 13 | 社区自发建立 RFC/设计 Issue 的维护者决策队列，侧面反映**决策流程拥堵**已成为共识 |
| [#9487] 运行时拥有的会话与传输适配器 | 10 | 讨论会话所有权边界，与 #8603/#7141 形成架构互锁 |

话题背后有两层信号：一是**生态兼容**（OpenAI 协议）是社区最强烈的功能渴望；二是 **RFC 决策速度**已引起社区自发治理（#8692、#9496）。此外，#8303 的激烈讨论表明社区对“一次交付范围过大”普遍持谨慎态度，更倾向于小步快跑。

## 5. Bug 与稳定性

今日 Bug 类 Issue 集中在成本计算与路径安全，且**均在当日获得修复 PR**：

| 严重度 | Issue | 问题 | 修复 PR |
|---|---|---|---|
| P1 / 安全 | [#9815] forbidden_paths 在 allowed_roots 下完全失效 | `is_path_allowed` 在 allowed-root 检查处直接返回 true，永远走不到 forbidden-path 循环，安全策略可被绕过 | [#9937] fix(security): enforce forbidden_paths under allowed roots and the workspace |
| P1 / 成本 | [#9816] Anthropic provider 永远记录 $0.00 支出 | 所有 usage 记录 `cost_usd: 0.0`，导致 `zeroclaw status` 显示 $0.0000，**每日/每月预算上限永不触发** | [#9939] fix(cost): surface pricing-unavailable so silent $0 caps can't reassure |
| P1 / 成本 | [#9573] 同一 provider 类型多别名时定价查找失败 | gateway WebSocket/RPC 会话路径忽略已配置的 token 价格，Alias 配置形同虚设 | [#9938] fix(cost): preserve full provider ref so multi-alias pricing resolves |

这三个 Bug 构成了一个共同主题：**成本可见性与预算控制失效**。对于一个 agent 工作负载产品化的项目，这是直接影响商业可行性的问题。修复 PR 已提交但尚未合并，建议优先审查。

此外，今日关闭的 [#9768]（daemon reload 信号误导）为 P1 级 degraded behavior，已解决。

## 6. 功能请求与路线图信号

从今日活跃的 RFC 和 PR 看，以下功能方向有较大概率进入下一版本（v0.9.0 为多个 RFC 的目标版本）：

| 方向 | 关键 Issue | 状态信号 |
|---|---|---|
| **OpenAI Chat Completions 兼容** | [#8603] | 18 评论、持续活跃，社区需求强烈 |
| **Goal mode 多轮目标执行** | [#8303] | 讨论中，首期范围有望收缩后推进 |
| **shell 命令策略（allow/ask/deny）** | [#7155] | Rev 3 已按维护者意见收敛范围 |
| **可插拔认证 + 规范主体** | [#7141] | Rev 8，成熟度高，目标 Identity & Access milestone |
| **运行时安全决策管线** | [#7142] | Rev 6，与 #7141 配套，目标 v0.9.0 |
| **统一目录契约（包/能力/配置/运行时状态）** | [#9346] | 多个前置 PR（#8908/#8909）已在推进中 |
| **SOP 能力权限契约** | [#9598] | Rev 2，目标 v0.9.0 |
| **退出 Lucid memory 连接器** | [#9644] | 上游已休眠 5 个月，清理技术债 |

已进入 `status:accepted` 的 RFC 包括 #9496（简化 RFC 流程）和 #9815/#9816/#9573（Bug 修复）。#9496 被接受是流程层的重要信号：**项目意识到当前 RFC 审议周期（7 天 + 全体一致）已拖慢决策**，未来流程将更精简，这将间接缓解 PR 合并瓶颈。

## 7. 用户反馈摘要

- **成本不可见是最大痛点**：`zeroclaw status` 显示 $0.0000 支出（#9816）会让运营者误以为在预算内，而实际上预算上限从未生效；多别名场景下定价被忽略（#9573），用户配置的 token 价格不生效。这直接打击用户对成本管控能力的信任。
- **生态工具接入意愿强**：大量用户希望用 Open WebUI、LobeChat、Aider 等现有客户端连接 ZeroClaw（#8603），当前仅支持 WebSocket/ACP/webhook 的方式阻碍了采用。
- **安全体验对标 Claude Code**：用户明确希望有 Claude Code 风格的命令确认策略（#7155），说明 agent 类工具用户已形成对“安全但流畅”交互的预期。
- **Docker 部署仍有坑**：#9035 显示 `docker compose up -d` 后网关仍绑定 loopback 导致端口无法访问，虽然是已修复状态，但此类部署体验问题值得持续关注。
- **跨平台一致性需求**：#7929 指出 web UI、zerocode TUI、channel runtime 的 slash 命令注册表各自漂移，用户希望统一——这是多端一致性的典型诉求。

## 8. 待处理积压

以下长期未决事项需要维护者优先关注：

| 类型 | 条目 | 等待时长 | 状态 |
|---|---|---|---|
| RFC | [#7141] 可插拔入站认证（Rev 8） | 自 2026-06-03 | `needs-maintainer-review`，已迭代 8 版，风险高 |
| RFC | [#7155] shell 命令确认策略（Rev 3） | 自 2026-06-03 | `needs-maintainer-review`，范围已按评审收敛 |
| RFC | [#7142] 安全决策管线（Rev 6） | 自 2026-06-03 | `needs-maintainer-review`，与 #7141 配套 |
| RFC | [#5907] ZeroCode LSP 支持 | 自 2026-04-19 | `needs-author-action`，评论活跃但停滞 |
| PR | [#7821] 沙箱策略 schema + 应用层强制 | 自 2026-06-17 | `needs-author-action` + `stale-candidate`，size:XL，已接近陈旧 |
| PR | [#9385] WhatsApp Web request_approval | 自 2026-07-26 | `needs-author-action` + `stale-candidate`，涉及 30+ 标签，风险高 |
| PR | [#9126] WASM 插件 typed instance config | 自 2026-07-18 | `needs-author-action`，size:XL，属插件系统关键能力 |
| Tracker | [#8692] 维护者决策队列 | 自 2026-07-04 | 该 tracker 本身即反映决策拥堵，建议维护者逐项处理 |

**健康度总结**：社区活跃度极高，Bug 修复响应迅速，架构讨论有深度且有秩序（#8692 自发建队列）；但 **PR 合并吞吐量（49:1）和长期 RFC 决策延迟是当前最大风险**。#9496 的接受表明团队已启动流程自我改进，建议将“每周固定 RFC 决策时间 + 批量合并待审 PR”作为近期重点，避免社区热情因等待而流失。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*