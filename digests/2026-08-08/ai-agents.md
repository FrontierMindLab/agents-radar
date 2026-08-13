# OpenClaw 生态日报 2026-08-08

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-07 16:38 UTC

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

# OpenClaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时项目保持着极高吞吐：500 条 Issue 更新（新开/活跃 438，关闭 62）、500 条 PR 更新（合并/关闭 118，占总 PR 更新量的 23.6%），无新版本发布。社区讨论热度集中在**消息静默丢失**（DeepSeek v4 Flash 回复失败，115 评论）、**记忆安全**（信任标记，28 评论）和**子代理结果丢失**（25 评论）三类问题上；与此同时，P0/P1 级稳定性修复持续产出，包括数据库迁移失败、媒体误删、token 统计膨胀导致过早压缩等严重缺陷均已有对应 PR 或关闭记录。整体健康度呈"高产与高风险并存"状态——修复节奏很快，但消息丢失类问题反复出现，提示核心会话/投递链路仍存在系统性薄弱环节。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。当前可跟踪的版本线停留在 2026.7.2 系列（含 beta.5/beta.7），上一个稳定版为 2026.7.1。

## 3. 项目进展

今日 500 条 PR 更新中 118 条已合并/关闭，合并率 23.6%（数据源未展示合并列表，以下基于在途 PR 分析项目当前的修复重点与推进方向）。

**重点修复方向（在途 PR，反映维护者当前优先级）：**

- **AI 提供商兼容性** — 多个 PR 针对不同提供商的流式处理缺陷：
  - [PR #120276](https://github.com/openclaw/openclaw/pull/120276)：OpenAI Responses thinking 签名在回放时按不可信 JSON 处理，防止单个畸形历史块摧毁后续所有轮次
  - [PR #120248](https://github.com/openclaw/openclaw/pull/120248)：修复 Bedrock 大 payload 下工具参数被静默丢弃（对应 Issue #53408）
  - [PR #120240](https://github.com/openclaw/openclaw/pull/120240)：Ollama 流式 NDJSON 非法 UTF-8 应直接失败而非静默替换
  - [PR #120075](https://github.com/openclaw/openclaw/pull/120075)：修复多 agent 网关每轮对话后停顿数十秒的性能问题
- **渠道插件修复** — 消息丢失/会话状态问题集中整治：
  - [PR #120260](https://github.com/openclaw/openclaw/pull/120260)：iMessage 文本回显误判与消息丢失两条路径
  - [PR #120259](https://github.com/openclaw/openclaw/pull/120259)：Discord 线程归档/删除时关闭各 agent 独立存储中的会话
  - [PR #119964](https://github.com/openclaw/openclaw/pull/119964)：修复 Windows 下 Zalo 测试套件 EBUSY 错误（关闭 #119796）
- **安全与配置**：
  - [PR #119538](https://github.com/openclaw/openclaw/pull/119538)：QQBot 错误信息中防止凭据泄露
  - [PR #119970](https://github.com/openclaw/openclaw/pull/119970)：LM Studio 模型加载错误中脱敏 API key
  - [PR #120295](https://github.com/openclaw/openclaw/pull/120295)：停止推荐已废弃的 Control UI 认证设置

**已关闭的重要 Issue（对应修复已落地）：**
- [#116277](https://github.com/openclaw/openclaw/issues/116277)（DeepSeek v4 Flash 静默回复失败，115 评论）— 已关闭，说明该高热度问题已有结论或修复
- [#119090](https://github.com/openclaw/openclaw/issues/119090)（P0: 媒体清理失败导致永久删除会话媒体）— 已关闭
- [#58822](https://github.com/openclaw/openclaw/issues/58822)（子代理模型优先级被父 agent 模型遮蔽）— 已关闭

## 4. 社区热点

**🔥 最热 Issue（按评论数）：**

1. **[#116277: DeepSeek v4 Flash silent reply failure](https://github.com/openclaw/openclaw/issues/116277)（115 评论，已关闭）**
   P1 级别，模型静默失败后仅回复通用 fallback "No reply was generated..."。这是今日社区讨论最集中的问题，反映用户对**模型供应商可靠性**的高度敏感——静默失败比报错更令人沮丧，因为它破坏了对话的连续性。该问题已关闭，建议关注其关闭原因（修复/转由供应商处理）。

2. **[#7707: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)（28 评论，仍开放，P2 enhancement）**
   社区强烈支持为记忆条目按来源打信任标签，防止 Web 内容/第三方技能中的恶意指令污染 agent 长期记忆。这反映了用户对**记忆投毒攻击**的担忧正从理论走向实际需求。

3. **[#44925: Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)（25 评论，仍开放，P1）**
   子代理任务完成结果在多种故障模式下静默丢失（超时无重试、无通知、无自动重启）。与 #116277 呼应——用户对"静默失败"模式的容忍度极低。

4. **[#92201: Anthropic thinking signatures invalid on replay](https://github.com/openclaw/openclaw/issues/92201)（21 评论，仍开放，P1）**
   Embedded runner 中 Anthropic thinking 签名重放时间歇性无效，且因错误文本被泛化导致恢复包装器永远不触发。属于复杂的深水区问题，涉及流式签名持久化与错误分类。

**社区诉求分析：** 最热门 Issue 的共性是**失败不可见**——没有明确的错误、没有重试、没有通知。用户需要的不仅是修 bug，更是建立"失败可观测、可恢复"的机制。

## 5. Bug 与稳定性

按严重程度排列今日在跟踪的 Bug（部分为长期未决）：

**🔴 P0（数据丢失/不可启动）：**

| Issue | 问题 | 状态 |
|---|---|---|
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14→v15 迁移失败，`no such column: entry_valid`，gateway 拒绝启动 | 有 linked PR（修复中） |
| [#118772](https://github.com/openclaw/openclaw/issues/118772) | 2026.7.1+ embedded-runner 的 `totalTokens` 膨胀导致在上下文窗口 4–8% 处过早压缩，**造成数据丢失** | 有 linked PR（修复中） |
| [#119090](https://github.com/openclaw/openclaw/issues/119090) | 媒体清理在会话存储不可读时 fails open，**永久删除会话媒体** | 已关闭 |

**🟠 P1（消息丢失/会话损坏/性能回归）：**

| Issue | 问题 | 状态 |
|---|---|---|
| [#116277](https://github.com/openclaw/openclaw/issues/116277) | DeepSeek v4 Flash 静默失败，仅回复 fallback | 已关闭 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成结果静默丢失，无重试/通知/重启 | 无 fix PR |
| [#84583](https://github.com/openclaw/openclaw/issues/84583) | cron 投递触发 `EmbeddedAttemptSessionTakeoverError`，打断用户正在进行的对话 | 无 fix PR |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 长对话后 write/exec 工具参数全部丢失 | PR #120248 部分修复 Bedrock 场景 |
| [#119087](https://github.com/openclaw/openclaw/issues/119087) | Gateway 冷启动回归 ~2.5x（1-vCPU 容器） | 无 fix PR |
| [#92241](https://github.com/openclaw/openclaw/issues/92241) | 更新/回滚后 gateway 持有过期模块路径，静默丢弃入站消息 | 无 fix PR |
| [#119411](https://github.com/openclaw/openclaw/issues/119411) | 记忆文件 watcher 从不重新索引，`Dirty: no` 但索引数低于磁盘数 | 无 fix PR |

**🟡 P2（体验/兼容性问题，部分已有修复）：**

- [#119796](https://github.com/openclaw/openclaw/issues/119796) Windows vitest teardown EBUSY — [PR #119964](https://github.com/openclaw/openclaw/pull/119964) 修复
- [#117644](https://github.com/openclaw/openclaw/issues/117644) agent 在 Windows PowerShell 中发出 Unix 命令（head、~ 展开）
- [#106475](https://github.com/openclaw/openclaw/issues/106475) `/pair qr` 返回 data URL，webchat 无法渲染
- [#117445](https://github.com/openclaw/openclaw/issues/117445) Feishu 插件将入站 DM 解码为 "?" 且从不回复

**稳定性观察：** 消息丢失类问题（Impact: message-loss）高频出现于 Telegram、Slack、QQBot、iMessage 等多个渠道，且根因各不相同（cron 抢占、回显误判、token 统计错误、模块路径过期）。这暗示投递链路缺乏统一的事务性保证。值得肯定的是，针对 Windows EBUSY、Ollama UTF-8 等问题，修复 PR 通常在 1 天内出现，响应速度优秀。

## 6. 功能请求与路线图信号

**明确的功能需求（来自 Issues）：**

| Issue | 功能 | 优先级 | 纳入可能性 |
|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 记忆条目按来源打信任标签 | P2 | 中 — 社区呼声高，且与安全相关 |
| [#116268](https://github.com/openclaw/openclaw/issues/116268) | Worker 重连退避增加 jitter | P2 | 高 — 改动小、收益明确，很可能进入近期版本 |
| [#53654](https://github.com/openclaw/openclaw/issues/53654) | Discord 编辑消息重新处理/删除消息取消 | P2 | 中 — 依赖 Discord 插件路线图 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | Agent 自主触发上下文压缩（self-compact 工具） | P2 | 低—中 |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | `/models test-fallback` 命令验证 fallback 链 | P3 | 中 — 运维友好型小功能 |
| [#91455](https://github.com/openclaw/openclaw/issues/91455) | Kubernetes 文档更新（含 Helm 讨论） | P3 | 低 |
| [#118785](https://github.com/openclaw/openclaw/issues/118785) | 容器与外部 App SDK 的 QA 证明 | maintainer | 高 — 已由维护者跟踪 |

**路线图信号（来自在途 PR）：**
- **记忆/上下文子系统是当前最活跃的领域**：[PR #116562](https://github.com/openclaw/openclaw/pull/116562)（memory-core 主嵌入 provider 恢复）、[PR #79702](https://github.com/openclaw/openclaw/pull/79702)（embedding 查询前缀）、[PR #120198](https://github.com/openclaw/openclaw/pull/120198)（context-engine 参数警告）同时进行，说明项目正在系统性加固长期记忆与上下文管理的可靠性。
- **AI 提供商适配仍是重点**：OpenAI / Bedrock / Ollama / LM Studio 各有 PR 在途，覆盖签名重放、UTF-8 校验、凭据脱敏、token 统计修正等——对多提供商兼容性的投入在持续加码。

## 7. 用户反馈摘要

**高频痛点：**

1. **"静默失败"是最不可接受的故障模式**
   - *"OpenClaw posted a fallback message: 'No reply was generated...'"*（[#116277](https://github.com/openclaw/openclaw/issues/116277)）
   - *"Subagent task orchestration has multiple failure modes where results are silently lost"*（[#44925](https://github.com/openclaw/openclaw/issues/44925)）

2. **Windows 原生支持仍不完善**
   - 网关 Scheduled Task 无法保持运行（[#91144](https://github.com/openclaw/openclaw/issues/91144)）
   - agent 默认发出 Unix 命令（如 `head`、`~` 展开）（[#117644](https://github.com/openclaw/openclaw/issues/117644)）
   - 测试套件因 SQLite 句柄未释放而 EBUSY 失败（[#119796](https://github.com/openclaw/openclaw/issues/119796)）

3. **性能回归直接冲击生产部署**
   - *"Gateway cold start regressed ~2.5x from 2026.7.1-beta.1 to 2026.7.2-beta.7 on a 1-vCPU container"*（[#119087](https://github.com/openclaw/openclaw/issues/119087)）
   - *"Active memory injection breaks prompt cache hit rate (99.9% → 22%)"*（[#91223](https://github.com/openclaw/openclaw/issues/91223)）

4. **配置与文档陷阱**
   - 文档推荐已废弃的 `allowInsecureAuth` 设置，用户按文档操作会失败（对应 [PR #120295](https://github.com/openclaw/openclaw/pull/120295)）
   - `/pair qr` 返回的 data URL 在 WebChat 中显示"Media failed"（[#106475](https://github.com/openclaw/openclaw/issues/106475)）

**积极反馈：**
- 修复响应速度获得认可：如 #119796（Windows EBUSY）在 1 天内出现修复 PR [PR #119964](https://github.com/openclaw/openclaw/pull/119964)；#119900 的验证工作通过 [PR #120246](https://github.com/openclaw/openclaw/pull/120246) 持续推进。
- 社区对 security 类修复表示关注（QQBot 凭据泄露、记忆投毒防护），说明用户群对安全性的要求已从基本功能走向高级威胁模型。

## 8. 待处理积压

以下 Issue 创建时间较早、影响范围明确，但截至今日仍无明确的 fix PR 或维护者结论，建议重点关注：

| Issue | 创建时间 | 问题 | 影响 |
|---|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | 子代理完成结果静默丢失（P1，25 评论） | 消息丢失/会话状态 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 2026-03-24 | 长对话后工具参数静默丢失（P1） | 行为异常 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | 记忆信任标记（P2，28 评论） | 安全/记忆投毒 |
| [#53654](https://github.com/openclaw/openclaw/issues/53654) | 2026-03-24 | Discord 编辑/删除事件支持（P2，5 评论，3 👍） | 功能缺失 |
| [#52526](https://github.com/openclaw/openclaw/issues/52526) | 2026-03-22 | `agent --json` 返回 hook 前文本（P2） | 行为不一致 |

**值得注意的长期 PR：**
- [PR #96265](https://github.com/openclaw/openclaw/pull/96265)（交互式启动菜单，2026-06-24 创建）与 [PR #116382](https://github.com/openclaw/openclaw/pull/116382)（避免后台更新后误报分支切换，2026-07-30 创建）均处于 "needs proof" 状态较久，建议维护者明确验证路径或打回。

**结论：** OpenClaw 正处于快速迭代期，修复吞吐能力强劲，但消息投递链路与嵌入式会话状态管理的可靠性仍是健康的短板。社区对"静默失败"零容忍的态度应促使项目方将"失败可观测性"作为核心设计原则。建议下一版本优先合入 #120075（网关停顿）、#120248（Bedrock 参数丢失）等低风险高收益的稳定性修复，并尽快对 #44925、#84583 给出明确结论。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告（2026-08-08）

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态处于**高密度迭代期**：头部项目单日 PR/Issue 吞吐普遍达 50~500 条量级，但大量产出集中在稳定性修复与缺陷收敛。**"静默失败"已成为跨项目头号社区痛点**——消息静默丢弃、子代理结果丢失、工具参数被吞、fallback 失效在至少 6 个项目中均有独立且高热度 Issue。同时，安全加固（API Key 泄露、记忆投毒、沙箱隔离）与可观测性建设（Token 追踪、OTel 导出、Inspector）正从"可选增强"变为"核心需求"。渠道兼容（Telegram/WhatsApp/Slack/飞书等）与多供应商支持仍是所有项目的必争之地，Windows 原生体验则是普遍短板。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | PR 合并/关闭 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（关闭 62） | 500（合并/关闭 118，23.6%） | 118 | 无 | ★★★★☆ 高产与高风险并存，修复快但消息丢失反复 |
| **Hermes Agent** | 50（新开/活跃 44，关闭 6） | 50（合并/关闭 9） | 9 | 无（v0.20.0 于 8.3） | ★★★★☆ 重构与修复合流，压缩稳定性是短板 |
| **IronClaw** | 50（活跃 38，关闭 12） | 50（合并/关闭 23） | 23 | 无（v1.2.0 开发中） | ★★★★☆ 功能规划活跃，QA 回归密集需收敛 |
| **ZeroClaw** | 50（关闭 5） | 50（合并/关闭 6） | 6 | 无（v0.8.x） | ★★★☆☆ 讨论活跃但闭环率低，安全 P1 多发 |
| **CoPaw** | 27（新开 16，关闭 11） | 50（合并/关闭 22） | 22 | ✅ v2.1.0-beta.2 | ★★★★☆ 响应快、首次贡献者多，Docker 稳定性待解 |
| **NanoBot** | 11（活跃 9，关闭 2） | 21（合并/关闭 11） | 11 | 无 | ★★★★☆ 安全加固与 WebUI 迭代并进 |
| **NanoClaw** | 0 | 14（合并/关闭 6） | 6 | 无 | ★★★★☆ 修复效率高，技能生态加速，历史 PR 积压 |
| **LobsterAI** | 7（新开/活跃 4，关闭 3） | 7（合并/关闭 6） | 6 | 无（2026.8.5 已合入 main） | ★★★★☆ 版本冲刺收尾，闭环良好 |
| **PicoClaw** | 1（stale 关闭） | 5（合并 1） | 1 | 无 | ★★★☆☆ 渠道扩展中，PR 排队待审 |
| **NullClaw / Moltis / ZeptoClaw** | — | — | — | — | ⭐ 过去 24h 无活动 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是该生态的**核心参照系与最大单体**，其单日 Issue/PR 吞吐是第二梯队（Hermes/IronClaw/ZeroClaw）的 **5~10 倍**，渠道覆盖广度（iMessage、Discord、Zalo、QQBot、Telegram、Slack 等）无出其右。

**关键差异：**
- **广度 vs 深度**：OpenClaw 追求"全渠道全模型"覆盖，带来的代价是投递链路在 Telegram、Slack、iMessage 等多个渠道出现独立根因的消息丢失问题，且反复出现；相比之下，IronClaw 将资源集中在 Inspector 可观测性与 Extensions 规范化，NanoBot 更聚焦安全隔离（进程环境变量白名单、会话存储迁移），Hermes 则在推进结构性重构（God File 拆分）。
- **社区规模**：OpenClaw 的 115 评论热帖（#116277）单帖讨论量超过 NanoBot、NanoClaw 全天的评论总数，社区基数生态内最大。
- **治理模式**：OpenClaw 以高合并率（23.6%）显示"响应快、闭环快"，但 P0/P1 问题仍大量出现，说明其处于**规模扩张期而非质量巩固期**；ZeroClaw 则以 RFC 流程驱动（OTel 导出、配置迁移均已 accepted），讨论质量高但实施滞后，呈现"慢治理"风格。

## 4. 共同关注的技术方向

| 方向 | 涉及项目（具体诉求） |
|---|---|
| **"静默失败"零容忍** | OpenClaw（子代理结果丢失 #44925、DeepSeek 静默失败 #116277）；NanoClaw（纯媒体消息被丢弃 #2213）；Hermes（Discord 响应未投递 #81091、压缩丢弃工具链 #79278）；ZeroClaw（cron 静默丢弃 6 项配置 #9770） |
| **AI 提供商兼容性** | OpenClaw（Bedrock 参数丢失 #53408、Ollama UTF-8、OpenAI 签名回放）；ZeroClaw（OpenRouter 丢失 provider_extra #9775、Gemini Key 泄露 #9386）；CoPaw（StepFun 严格提供商拒绝 #6803）；LobsterAI（SiliconFlow 斜杠模型 ID #2443） |
| **成本可观测性** | NanoBot（百万 Token 消耗无法追溯 #5266）；IronClaw（Token 估算偏差 #6989）；OpenClaw（token 统计膨胀致过早压缩 #118772） |
| **记忆与上下文安全** | OpenClaw（记忆信任标记 #7707）；NanoBot（会话历史存于 agent 可读目录 #5278）；Hermes（压缩丢链副作用安全）；ZeroClaw（工作区路径绕过 #8424） |
| **Windows 原生支持** | OpenClaw（EBUSY、PowerShell Unix 命令）；Hermes（venv 重建、ACP spawn 阻塞）；LobsterAI（安装器 watchdog 修复）；CoPaw（Malware Bytes 误报） |
| **渠道/插件生态标准化** | ZeroClaw（Agent Plugins 1.0 RFC #9810）；NanoClaw（SKILL.md 技能生态）；IronClaw（Extensions vNext 规范化消息操作 #7355）；CoPaw（OneBot 集成 #6715）；OpenClaw（control UI 认证废弃） |
| **故障转移可靠性** | ZeroClaw（fallback 整体失效 #9812）；OpenClaw（fallback 链测试命令提议 #6599）；NanoClaw（调度失败重排 #2678） |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 | 独特关键词 |
|---|---|---|---|---|
| **OpenClaw** | 全渠道消息网关 + 多模型路由 | 个人重度用户、自托管社区 | 渠道插件化 + 嵌入式 runner，monorepo 大而全 | 生态中心，覆盖面第一 |
| **Hermes Agent** | 多平台网关 + 桌面客户端（TUI/Review 面板） | 跨平台团队、桌面优先 | God File 大型 Python 模块，重构驱动 | 架构整洁度追求者 |
| **IronClaw** | 可观测性（Inspector）+ 扩展生态治理 | 平台运维者、QA 测试者 | 指标/提示词检查内建，Extensions vNext 规划明确 | 标准化与可观测性 |
| **ZeroClaw** | SOP 自动化 + 供应商统一 + RFC 治理 | 生产环境重度用户、自动化编排 | Rust 实现，cron/SOP 状态机，OTel 对齐 | 自动化可靠性、流程严谨 |
| **CoPaw** | 桌面应用 + 中文社区 + 多 IM 渠道 | 中文用户、桌面端优先 | Electron 类桌面壳 + 渠道插件（微信/Telegram） | 快速响应、first-time contributor 友好 |
| **NanoBot** | 安全隔离 + WebUI 体验 + 记忆归档 | 安全敏感的自托管者 | 进程级 env 白名单、workspace 隔离、Dream 记忆 | 安全左移、沙箱 |
| **NanoClaw** | 调度系统 + Telegram 适配 + 技能生态 | 轻量部署、技能扩展型用户 | SKILL.md 驱动、migration 回填机制 | 生态小快灵 |
| **LobsterAI** | Cowork 协作 + IM 数据分析 + 科学文档渲染 | 协作型团队（网易系背景） | Electron 桌面 + OpenClaw 配置兼容 + release 分支管理 | 协作工作流、数学渲染 |
| **PicoClaw** | IM 渠道扩展（QQ 频道为特色） | 中国 IM 用户 | go.mau.fi/whatsmeow 依赖，渠道桥接 | 长尾渠道补全 |

## 6. 社区热度与成熟度分层

**第一梯队：高速迭代期（日 PR/Issue 吞吐 ≥ 100）**
- **OpenClaw**：社区体量碾压级，但"高产与高风险并存"，核心投递链路稳定性仍需系统性加固——这是走向成熟必须跨越的坎。
- **Hermes / IronClaw / ZeroClaw**：同等高吞吐，但处于不同阶段——Hermes 在重构中修复（健康），IronClaw 在功能冲刺+QA 回补（中等偏上），ZeroClaw 讨论活跃但合并吞吐最低（6 条），显示维护者响应瓶颈。

**第二梯队：质量巩固期（日吞吐 < 50）**
- **CoPaw / NanoBot / NanoClaw / LobsterAI**：均展现出"反馈→修复"闭环高效（CoPaw 数小时响应、NanoClaw 单日合并 6 修复、LobsterAI 当日修复），合并率高，处于**打磨体验与安全加固阶段**。其中 LobsterAI 已进入版本发布冲刺（2026.8.5），说明周期化发布成熟度较高。
- **PicoClaw**：活跃度中等，5 个开放 PR 等待评审，合并节奏偏慢。

**第三梯队：休眠/停滞**
- **NullClaw / Moltis / ZeptoClaw**：过去 24h 无任何活动，无论其历史定位如何，当前对生态贡献可忽略。

**关键观察**：**活跃度 ≠ 成熟度**。ZeroClaw 与 OpenClaw 虽然有最高吞吐，但 P1 问题（Key 泄露、fallback 失效、消息丢失）滞留无修复 PR 的比例也最高；而第二梯队项目在合并率、安全修复及时性上反而表现更优。

## 7. 值得关注的趋势信号

**① "失败可见性"正在成为智能体的核心设计原则。**
OpenClaw、ZeroClaw、NanoBot、Hermes 四个独立项目在同一周内分别因静默失败、误导性健康检查、无法追溯的 Token 消耗、压缩后会话死亡被用户集中声讨。用户要的不只是修 Bug，而是**"失败可观测、可恢复、可审计"**的能力——这将驱动 AI 助手从"对话工具"向"可信基础设施"演进。开发者若新建 Agent 产品，应默认内置：错误透传、重试语义、成本审计、心跳监控。

**② 安全左移从"边界防护"走向"记忆与凭证内防"。**
API Key 通过错误信息泄露（ZeroClaw #9386/#9813）、会话历史被 agent 自身读取（NanoBot #5278）、记忆投毒攻击防御（OpenClaw #7707）、文件系统别名绕过敏感路径检查（Hermes #79676）——攻击面已从外部入侵转向 **agent 自身能力的滥用与数据污染**。对智能体开发者：默认应假设 agent 不可信，凭据必须走白名单过滤，记忆写入必须带来源信任标记。

**③ 模型供应商从"兼容"走向"一等公民"生态。**
单日涌现 OpenAI/Bedrock/Ollama/LM Studio（OpenClaw）、StepFun（CoPaw）、SiliconFlow（LobsterAI）、Groq（ZeroClaw）、Volcengine/小米 MiMo（CoPaw）等至少 5 个不同层面的供应商适配问题。**多供应商容灾（fallback 链）和按模型能力配置（ZeroClaw #7100）正在成为生产部署的必要条件**，而非高级特性——可惜 ZeroClaw #9812 证明大量 fallback 实现并不可靠。

**④ 插件/技能生态进入标准化前夜。**
ZeroClaw 的 Agent Plugins 1.0 RFC（#9810）、NanoClaw 的 SKILL.md 技能扩展、IronClaw 的 Extensions vNext 规范化消息操作，三个方向在同一时间涌现。**"技能可移植、渠道可替换"的 vendor-neutral 标准将是下一阶段生态分化的胜负手**。独立开发者此刻切入构建跨框架的标准工具层，窗口期极佳。

**⑤ 边缘与轻量部署成为真实需求。**
ZeroClaw 的 Hailo-Ollama 原生支持（#9109）与 XMPP 频道请求（#9814）、PicoClaw 的隐私 IM 诉求（#3093）、CoPaw 的 Docker 市场问题——表明 **home-lab 与低资源环境已是不可忽略的用户群体**，"Cloud 级体验丝滑、边缘部署处处碰壁"是当前普遍落差。

**⑥ 社区治理效率反噬技术决策。**
ZeroClaw #9496 明言"RFC 流程比决策本身更慢更繁琐"，OpenClaw 社区则对消息丢失问题反复出现失去耐心。**治理流程过载与"只修不防"都会消耗社区信任**。对项目维护者：在流程速度与工程质量间寻找平衡点，是规模化后无法回避的课题。

---

*报告基于 2026-08-08 各项目 GitHub 公开动态数据生成，选取指标口径遵循各项目日报原始数据，横向对比仅代表当日快照，不构成长期评估结论。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-08-08）

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：新增/更新 Issue 11 条（9 条活跃讨论，2 条关闭），PR 更新 21 条（10 条待合并，11 条已合并/关闭），未发布新版本。社区核心讨论集中在 **Token 消耗追踪**、**WhatsApp 音频发送失败** 与 **会话内模型切换受限** 三个方面。安全与隔离是当前开发主线：会话历史存储位置、API 密钥泄漏修复、每会话沙箱隔离均有对应 PR 落地或推进。项目整体处于功能迭代与安全加固并行的活跃阶段。

## 2. 版本发布

本期无新版本发布。

## 3. 项目进展

今日共有 11 个 PR 被合并或关闭，主要集中在会话记忆机制、渠道稳定性、WebUI 修复与安全加固四个方面：

**会话与记忆机制**
- [PR #5272](https://github.com/HKUDS/nanobot/pull/5272) 修复会话保留修剪（`retain_recent_legal_suffix` / `enforce_file_cap`）时会丢弃主动投递消息（如 cron 通知）的问题，确保会话截断不丢失关键上下文。
- [PR #5231](https://github.com/HKUDS/nanobot/pull/5231) 与 [PR #5280](https://github.com/HKUDS/nanobot/pull/5280) 完善 Dream 记忆归档：短暂空闲会话即使未超出保护后缀窗口，也会被主动归档生成 `history.jsonl`，使 Dream 能覆盖此前不可见的会话。

**渠道稳定性**
- [PR #5263](https://github.com/HKUDS/nanobot/pull/5263) 加固微信渠道：对齐 openclaw-weixin 2.4.6 协议头、增强出站投递的故障处理与重试、改进登录与二维码验证流程。

**WebUI 与前端**
- [PR #5268](https://github.com/HKUDS/nanobot/pull/5268) 修复历史消息接口对媒体根目录外附件不返回 `media_urls` 的问题，与 WebSocket 实时路径行为对齐。
- [PR #5285](https://github.com/HKUDS/nanobot/pull/5285) 修复新建主题后路由丢失的回归问题。
- [PR #5284](https://github.com/HKUDS/nanobot/pull/5284) 移除已无调用方的遗留 `/api/sessions/{key}/messages` 路由及相关多余代码。
- [PR #5281](https://github.com/HKUDS/nanobot/pull/5281) 改进 WebUI 活动文本边缘淡出效果，避免文字合成层被遮罩影响清晰度。
- [PR #5277](https://github.com/HKUDS/nanobot/pull/5277) 模型预设编辑器改为行内展开/折叠，优化宽窄布局下的交互一致性。

**其他**
- [PR #5287](https://github.com/HKUDS/nanobot/pull/5287) 修复渠道层未显式配置时进度条默认值被全局覆盖的问题，并补充 Mattermost 回归测试。
- [PR #5282](https://github.com/HKUDS/nanobot/pull/5282) 现代化依赖恢复指引，改用 `nanobot plugins enable ...` 替代过时的直接安装说明。

整体来看，项目在会话记忆闭环、多渠道稳定性与 WebUI 体验三个方向均有实质推进，同时通过移除遗留路由和过时文档完成了一轮技术债清理。

## 4. 社区热点

**#5266 Token 消耗追踪（10 条评论）**  
[Issue #5266](https://github.com/HKUDS/nanobot/issues/5266) 获得本期最高讨论量，用户反馈 nanobot 在无明显活动的情况下 2 小时内消耗了高达百万级 token，且完全无法追溯消耗来源。诉求核心是希望系统记录每次调用的 token 用量、时间与触发原因，提供可审计的消耗明细。这反映了真实部署中 **成本可观测性** 的迫切需求。

**#5149 WhatsApp 无法发送音频（5 条评论）**  
[Issue #5149](https://github.com/HKUDS/nanobot/issues/5149) 用户报告 bot 可以接收但无法发送音频消息，日志中出现 neonize/ffmpeg 相关警告。功能缺陷直接影响用户对渠道能力的信任，目前已开放 11 天无修复 PR 关联，需要维护者重点关注。

**#5198 会话内无法切换模型（3 条评论）**  
[Issue #5198](https://github.com/HKUDS/nanobot/issues/5198) 用户指出 UI 上的模型 blip 不可点击、`/model` 命令切换无效，模型只能在实例级别重新配置。这与 Cloud SaaS AI 产品的一贯交互习惯不符，社区期望在会话级别获得模型切换能力。

## 5. Bug 与稳定性

按严重程度排序：

**高 — 安全风险**
- [Issue #5278](https://github.com/HKUDS/nanobot/issues/5278)：会话历史文件存放在 agent workspace 内（`<workspace>/sessions/`），开启 `restrict_to_workspace` 时 agent 可通过文件工具读取自身会话历史，构成数据暴露面。已有修复 PR [#5279](https://github.com/HKUDS/nanobot/pull/5279) 提出将会话存储迁出工作区，目前仍开放中。
- [PR #5270](https://github.com/HKUDS/nanobot/pull/5270)（安全修复）：此前 `CliAppService.run` 以完整环境变量启动 CLI 子进程，导致 Provider API Key 泄漏给不受信任的外部程序。该 PR 引入环境变量白名单机制清除密钥，并附带隔离测试，目前待合并。

**中 — 功能异常**
- [Issue #5273](https://github.com/HKUDS/nanobot/issues/5273)：会话保留修剪会丢弃紧邻用户回复之前的 `_channel_delivery` 主动投递消息（cron 通知等），影响后台任务场景的上下文完整性。已由 [PR #5272](https://github.com/HKUDS/nanobot/pull/5272) 修复并合并。
- [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149)：WhatsApp 渠道无法发送音频消息，日志提示 neonize/ffmpeg 处理异常，尚无修复 PR。
- [Issue #5198](https://github.com/HKUDS/nanobot/issues/5198)：特定会话中无法通过 UI 或 `/model` 命令切换模型，待响应。
- [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256)：`/goal` 消息在等待用户回复时产生数十条重复回复，仅在用户干预或模型识别循环后才停止，影响多轮对话体验。
- [Issue #5264](https://github.com/HKUDS/nanobot/issues/5264)：历史消息接口对媒体根目录外附件不返回 `media_urls`，刷新后附件链接丢失。已由 [PR #5268](https://github.com/HKUDS/nanobot/pull/5268) 修复并合并。

**低 — UI/体验**
- [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) 同时暴露了 `/goal` 命令循环回复的稳定性问题（见上），需要进一步排查触发条件。

## 6. 功能请求与路线图信号

- **Token 消耗日志**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）：用户要求记录每次调用 token 消耗。该诉求在生产环境普遍存在，且当前无对应 PR，建议纳入下一版本的可观测性增强，优先级应较高。
- **Telegram 贴纸与主动消息反应**（[#5289](https://github.com/HKUDS/nanobot/issues/5289)）：Telegram 渠道目前不支持发送贴纸，入站贴纸显示为空消息；消息反应仅作为内部确认机制，不支持 agent 主动发出。功能边界清晰，属于渠道能力补齐类需求。
- **Matrix 线程语义化**（[#5274](https://github.com/HKUDS/nanobot/issues/5274) 与 [#5275](https://github.com/HKUDS/nanobot/issues/5275)）：用户提议 bot 应使用 Matrix 的 reply 功能回复用户查询，并将“回复线程”的消息流隔离为独立会话上下文，与 Discord/Slack 线程行为对齐。已有 [PR #5286](https://github.com/HKUDS/nanobot/pull/5286) 实现了线程会话隔离，目前待合并，说明该方向已被采纳。
- **每会话临时文件隔离**（[#5276](https://github.com/HKUDS/nanobot/issues/5276)）：即便启用了 `restrictToWorkspace` 与 bwrap 沙箱，所有会话仍共享 `~/.nanobot/workspace` 全局目录。用户建议支持会话级隔离。对应 [PR #5283](https://github.com/HKUDS/nanobot/pull/5283) 已提出 `per_session_sandbox` 模式，处于开放状态。
- **Agent Plugins v1 技能加载**（[PR #5288](https://github.com/HKUDS/nanobot/pull/5288)）：新增对 vendor-neutral 的 Agent Plugins v1 包的技能加载支持，可复用跨 agent 生态的插件技能，属于生态兼容性扩展。
- **Temporary Chat 模式**（[PR #5252](https://github.com/HKUDS/nanobot/pull/5252)）：WebUI 新增非持久化临时对话模式，不落盘、多轮保留，适合一次性咨询场景。
- **模型无关的 computer use**（[PR #4276](https://github.com/HKUDS/nanobot/pull/4276)）：提供 `computer_use` 与 `browser` 工具，通过 PyAutoGUI 或 Playwright 实现截图、鼠标键盘控制与 DOM 自动化，不依赖特定模型的原生 computer use 能力。该 PR 已开放近两个月，需要维护者评估是否整合进主线。

## 7. 用户反馈摘要

- **成本焦虑**：[knoppix2](https://github.com/HKUDS/nanobot/issues/5266) 反馈 token 消耗量巨大且无法定位来源，“百万 token / 2 小时无人使用” 的表述反映出用户对资源浪费的担忧，核心诉求是 **可观测性与成本控制能力**。
- **渠道功能缺失**：[mxnbf](https://github.com/HKUDS/nanobot/issues/5149) 明确指出 WhatsApp 场景中“能收不能发”音频，说明渠道实现尚不完整，影响实际使用。
- **交互习惯落差**：[whisperity](https://github.com/HKUDS/nanobot/issues/5198) 对比 Cloud SaaS AI 的模型切换体验，认为当前 UI 不可点击 + `/model` 无效的组合“令人困惑”，说明用户期望更顺滑的会话级模型控制。
- **循环回复困扰**：[shakewingo](https://github.com/HKUDS/nanobot/issues/5256) 描述 `/goal` 产生“几十条几乎相同的回复”，只有在用户介入或模型自我识别为系统循环后才停止，严重干扰真实对话。
- **安全敏感**：[lmzopq](https://github.com/HKUDS/nanobot/issues/5278) 从安全视角指出会话历史存放于 agent 可读的工作区目录，认为这是“设计层面的可达性隐患”，建议将会话数据完全移出 agent 文件工具的作用域。

## 8. 待处理积压

以下为长期未合并或未被处理的议题，提醒维护者关注：

- [PR #4276](https://github.com/HKUDS/nanobot/pull/4276)（2026-06-10 创建，已开放约 60 天）：model-agnostic computer use 大功能 PR，长期无维护者响应。功能本身覆盖 computer_use 与 browser 两类工具，但体量大、涉及面广，建议明确是否纳入主线或引导作者拆分。
- [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149)（2026-07-28 创建，已开放 11 天）：WhatsApp 音频发送失败，暂无修复 PR 关联，渠道功能完整性受质疑，建议尽快排查。
- [PR #5156](https://github.com/HKUDS/nanobot/pull/5156)（2026-07-29 创建，已开放 10 天）：Telegram 轮询静默停滞的修复，属于生产环境稳定性问题，长期未合入可能影响使用 Telegram 渠道的用户。
- [Issue #5198](https://github.com/HKUDS/nanobot/issues/5198)（2026-07-31 创建，已开放 8 天）：会话级模型切换不可用，涉及核心交互体验且已有社区共鸣，建议排期处理。
- [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256)（2026-08-05 创建）：`/goal` 重复回复问题，会直接影响依赖该命令的用户，目前仅有 1 条评论且无修复 PR，建议复现并定位。

---

**总结**：NanoBot 过去 24 小时在 WebUI、会话记忆与渠道稳定性方面密集迭代，安全/隔离相关的 3 个 PR 同时推进，显示项目组正系统性解决多租户与密钥泄漏隐患；但 Telegram 轮询修复（#5156）与 computer use（#4276）等长期积压项仍需关注，token 可观测性有望成为下一个社区推动的功能重点。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共更新 50 条 Issues（44 新开/活跃，6 关闭）和 50 条 PRs（41 待合并，9 已合并/关闭），无新版本发布。当前工作重心明显集中于**大型模块重构（God File 拆分）**、**上下文压缩稳定性**与**桌面端/多平台网关的 Bug 修复**三条线。社区情绪积极，重构类 Epic（#78647）获得 59 条评论成为绝对焦点，同时多个 P1/P2 级稳定性 Bug（压缩丢链、会话卡死）正在推动紧急修复。合并/关闭的 9 个 PRs 涵盖 WhatsApp 提及支持、vision 缩放裁剪、路径敏感写保护等，项目呈现「重构推进 + 稳定性加固」并行迭代的健康态势。

---

## 2. 版本发布

**无新版本发布。** 最近已知版本为 v0.20.0 "The Herald Release"（2026.8.3）。

---

## 3. 项目进展

今日共合并/关闭 9 个 PRs，以下是重要进展：

### 已合并/关闭的 PRs

- **WhatsApp @mention 提及支持**（[#81155](https://github.com/NousResearch/hermes-agent/pull/81155)，CLOSED）— 为 WhatsApp 平台补全 @提及能力：入站提取 `mentionedJid`、出站支持 @mention 标记，打通群聊中被 @ 时的上下文感知。
- **per-platform group/thread 会话隔离修复**（[#81122](https://github.com/NousResearch/hermes-agent/pull/81122)，CLOSED）— 修复 `SessionStore._generate_session_key` 只读全局配置、而平台适配器按 per-platform extra 覆盖解析会话键的偏差，确保不同平台的群组/话题会话正确隔离。
- **vision_analyze 可选区域缩放裁剪**（[#81153](https://github.com/NousResearch/hermes-agent/pull/81153)，CLOSED）— 新增 `region: [x1, y1, x2, y2]` 参数，在图片降采样前对指定区域裁剪，让局部细节获得完整分辨率预算。
- 其他关闭的 PRs 还包括文档/补丁类提交（[#81188](https://github.com/NousResearch/hermes-agent/pull/81188) 等）。

### 已关闭的 Issues（对应修复落地）

- **[#68358](https://github.com/NousResearch/hermes-agent/issues/68358)**（P2，CLOSED）— 桌面端新会话消息被路由到陈旧 TUI 会话的 Bug，标记 `sweeper:implemented-on-main`，修复已在主分支实现。
- **[#72762](https://github.com/NousResearch/hermes-agent/issues/72762)**（P2，CLOSED）— `/model` 命令慢的问题修复，补上了 `custom_providers` 的磁盘缓存。
- **[#62825](https://github.com/NousResearch/hermes-agent/issues/62825)**（P2，CLOSED）— `vision_analyze` 无法激活 SSH 连接读取远程文件。
- **[#77257](https://github.com/NousResearch/hermes-agent/issues/77257)**（P2，CLOSED）— 桌面端 git 文件树渲染 430k+ DOM 节点导致 5GB 内存冻结，性能问题已处理。

**整体评价：** 今日合入的 PRs 侧重于「平台适配补全」和「桌面端体验修复」，结合已关闭的 6 个 Issues，项目在小步快跑地收敛历史技术债。

---

## 4. 社区热点

### 🔥 #78647 — God File 拆分总史诗（59 评论）
**[Epic: Shard all 20 god files — repo-wide god-file decomposition](https://github.com/NousResearch/hermes-agent/issues/78647)**
- 类型：refactor / architecture，P3，needs-decision
- 作者 andrexibiza 提出仓库级「god-file 分片」政策：**所有 god files 必须拆分、永不回退**。已识别 20 个超大文件，要求在 2026-08 之后新代码不得新增 god-file。
- **背后诉求：** 社区对超大模块（如 6,789 行的 `context_compressor.py`）的可维护性不满，希望通过强制政策推动结构性重构。这是当前社区最关注的方向。

### 💬 #78645 — context_compressor.py 拆分 Issue（25 评论）
**[Shard agent/context_compressor.py (god-file decomposition)](https://github.com/NousResearch/hermes-agent/issues/78645)**
- 具体拆分 `agent/context_compressor.py`（6,789 行）的落地 Issue，与 #78647 联动，说明重构已进入实操阶段。
- #81105 已就该文件中 summary kernel 的提取提出子任务（评论 6）。

### 🔧 #68358 — TUI 会话路由 Bug 修复（9 评论，已关闭）
**[New desktop session message routed into stale TUI session after TTFB timeout](https://github.com/NousResearch/hermes-agent/issues/68358)**
- 该 Bug 排查过程获得 9 条评论，最终关闭，展示了社区排查跨端会话问题的协作深度。

---

## 5. Bug 与稳定性

### 🔴 P1 级别

- **[#79278](https://github.com/NousResearch/hermes-agent/issues/79278)**（8 评论）— **压缩丢弃进行中的工具链**：preflight 压缩在 tool chain 执行中触发时，工具结果无法到达 agent，副作用已发生但 agent 误判失败并重放——对非幂等操作有安全风险。暂未见对应 fix PR。
- **[#78981](https://github.com/NousResearch/hermes-agent/issues/78981)**（3 评论）— **DeepSeek 500k token 会话压缩挂起致死**：压缩流停滞 120s+、等待 600s 上限后会话永久死亡，后续消息无法开启新回合。暂未见对应 fix PR。

### 🟠 P2 级别（已有 fix PR 的标注）

| Issue | 问题 | 对应 PR |
|-------|------|---------|
| [#81161](https://github.com/NousResearch/hermes-agent/issues/81161) | 桌面 Review 面板 git 操作把文件名当 glob 处理，误操作其他文件（**数据丢失风险**） | ✅ [#81164](https://github.com/NousResearch/hermes-agent/pull/81164) |
| [#81160](https://github.com/NousResearch/hermes-agent/issues/81160) | 未跟踪文件夹显示 "No diff to show"（`--no-index` 无法 diff 目录） | ✅ [#81164](https://github.com/NousResearch/hermes-agent/pull/81164) |
| [#81169](https://github.com/NousResearch/hermes-agent/issues/81169) | 飞书话题群 cron 投递报错 99992402，消息丢弃 | ✅ [#81184](https://github.com/NousResearch/hermes-agent/pull/81184) |
| [#81163](https://github.com/NousResearch/hermes-agent/issues/81163) | A2A 插件 5 个客户端工具未注册到工具目录（重复 Issue） | ✅ [#81190](https://github.com/NousResearch/hermes-agent/pull/81190) |
| [#81114](https://github.com/NousResearch/hermes-agent/issues/81114) | 桌面端后台任务完成后仍显示 "running"，异步结果需新消息才渲染 | 暂无 |
| [#81051](https://github.com/NousResearch/hermes-agent/issues/81051) | OAuth MCP 连接因 teardown 锁竞争永久 "parked"，需重启网关 | 暂无 |
| [#81050](https://github.com/NousResearch/hermes-agent/issues/81050) | MCP server 移除不彻底，孤儿 `.meta.json` 导致禁用服务复活 | 暂无 |
| [#81117](https://github.com/NousResearch/hermes-agent/issues/81117) | 飞书 clarify 等待期间图片回复被丢弃，vision 收到 `[Image]` 占位符 | 暂无 |
| [#81091](https://github.com/NousResearch/hermes-agent/issues/81091) | Discord 回合完成后响应未投递（Curator TUI 回合干扰） | 暂无 |
| [#80989](https://github.com/NousResearch/hermes-agent/issues/80989) | v0.20.0 terminal/clarify 工具结果被包进 content-block 结构，偶尔返回错误文件内容 | 暂无 |
| [#80952](https://github.com/NousResearch/hermes-agent/issues/80952) | Windows 下 ACP 客户端（Buzz）spawn 时 terminal 阻塞 ~330s 后回退 WSL bash | 暂无 |
| [#80274](https://github.com/NousResearch/hermes-agent/issues/80274) | 验证状态陈旧循环：已提交文件被误报为未验证修改，agent 陷入重复验证死循环 | 暂无 |
| [#81101](https://github.com/NousResearch/hermes-agent/issues/81101) | `config set` 无敏感键保护，agent 可通过 CLI 翻转 `approvals.mode`（安全） | 相关 PR [#79676](https://github.com/NousResearch/hermes-agent/pull/79676)（待合并） |

### 🟡 P3 级别

- [#80388](https://github.com/NousResearch/hermes-agent/issues/80388) — `hermes memory status` 显示可用但所有 retain 失败，状态判定与运行时判定谓词不一致。
- [#73779](https://github.com/NousResearch/hermes-agent/issues/73779) — 飞书 multiplex 模式下 `lark_oapi` WebSocket 因 `Future attached to a different loop` 崩溃，网关静默断连。

---

## 6. 功能请求与路线图信号

### 新功能需求（今日提出）

- **[#81109](https://github.com/NousResearch/hermes-agent/issues/81109)**（P3, needs-decision）— **孤儿目标恢复**：当拥有 `/goal` 循环的进程死亡时，从 `SessionDB.state_meta` 恢复并继续执行。该功能若被接受，将让长期后台任务更可靠。

### 可能进入下一版本的能力（已有 PR 信号）

- **Telegram 嵌套模型选择器**（[#81195](https://github.com/NousResearch/hermes-agent/pull/81195)）— 新增 provider/category/speed/model 多级导航，保留旧路由兼容性。
- **文档转行动项技能**（[#81185](https://github.com/NousResearch/hermes-agent/pull/81185)）— 将 PDF/扫描件/合同/报告转化为带引用的义务、截止日期、风险与下游任务。
- **配置写入的路径别名防护**（[#79676](https://github.com/NousResearch/hermes-agent/pull/79676)，待合并）— 修复敏感路径检查仅比较字符串、不解析文件别名（Windows junction/symlink）导致的安全绕过。
- **CSS `content-visibility` 优化**（[#80441](https://github.com/NousResearch/hermes-agent/pull/80441)，待合并）— 对非活动标签页跳过布局/绘制，降低多标签场景 CPU/内存开销。
- **MCP 服务移除增强** — [#81050](https://github.com/NousResearch/hermes-agent/issues/81050) 指出的孤儿 `.meta.json` 问题，预计会在后续修复中补齐移除逻辑。
- **i18n 法语翻译**（[#60535](https://github.com/NousResearch/hermes-agent/issues/60535)）— 已有西语/中文/乌尔都语翻译的背景下，法语社区请求跟进，8 条评论，仍未解决。

---

## 7. 用户反馈摘要

### 核心痛点

- **上下文压缩是当前稳定性头号敌人。** 多个用户（zakhounet、vollegrewar）报告压缩机制在实际使用中导致工具链丢失、会话永久死亡，且均发生在长会话/大 token 场景。这与团队正在进行 `context_compressor.py` 重构直接相关，预计重构落地会显著改善。
- **桌面端体验存在明显短板。** 聊天历史折叠（#79455）、后台任务状态不刷新（#81114）、Review 面板误操作文件（#81161）——用户对桌面客户端完成基本功能但细节打磨不足有共鸣。
- **多平台适配的「最后一公里」问题集中暴露：** 飞书话题群投递失败（#81169）、图片回复丢失（#81117）、Discord 回合投递静默失败（#81091）、Windows 平台更新与终端问题（#70026, #80952）——网关聚合多平台带来的消息路由与适配器差异化逻辑问题正在成为新的 Bug 高发区。
- **安全边界意识强。** 用户 shilingdewufan-spec 主动报告 `config set` 可修改 `approvals.mode` 的安全漏洞；cryptoyasenka 提交 PR 修复文件系统别名绕过敏感路径检查——社区在安全问题上的参与度高。

### 满意点

- 多项 Bug（TUI 路由、/model 性能、vision SSH、5GB 渲染冻结）在本日关闭，用户反馈的问题得到快速跟进，验证了项目的响应效率。

---

## 8. 待处理积压

以下重要 Issue 长时间未获明确响应或修复进展，提醒维护者关注：

| Issue | 创建时间 | 评论 | 说明 |
|-------|---------|------|------|
| [#47864](https://github.com/NousResearch/hermes-agent/issues/47864) Dashboard "Action failed (exit ?)" | 2026-06-17 | 2 | 已近 2 个月，更新成功但状态上报错误，影响用户信任 |
| [#60535](https://github.com/NousResearch/hermes-agent/issues/60535) French translations | 2026-07-07 | 8 | 社区呼声较高，1 个月未响应 |
| [#70026](https://github.com/NousResearch/hermes-agent/issues/70026) Windows venv rebuild Access denied | 2026-07-23 | 2 | Windows 更新路径关键 Bug，影响桌面端用户升级 |
| [#72636](https://github.com/NousResearch/hermes-agent/issues/72636) 辅助压缩 401 错误归因到主模型 | 2026-07-27 | 5 | 诊断误导问题，中危，无 fix PR |
| [#73779](https://github.com/NousResearch/hermes-agent/issues/73779) 飞书 WebSocket 循环死亡 | 2026-07-29 | 3 | 网关静默断连，影响飞书生产环境 |
| [#78981](https://github.com/NousResearch/hermes-agent/issues/78981) 500k token 会话压缩挂起致死（P1） | 2026-08-05 | 3 | 严重稳定性问题，尚无 fix PR，建议优先处理 |

---

**Report generated: 2026-08-08** · Data source: NousResearch/hermes-agent GitHub repository · 本日报基于过去 24 小时公开数据自动生成，仅供参考。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-08-08）

## 今日速览

过去24小时项目活跃度中等偏上，以 Bug 修复与功能合入为主，无新版本发布。1 个长期搁置的 Issue（#3093）因 stale 被自动关闭；5 个 PR 发生动态，其中 1 个长线功能 PR（#1349）已合并关闭，4 个修复/功能 PR 仍处于开放待审状态。值得关注的是，今日出现了 WhatsApp 信道失效（405）与 exec 工具参数行为不符两个明确 Bug 的修复 PR，说明项目维护者对生态反馈的响应较为及时。

## 版本发布

过去24小时无新版本发布。

## 项目进展

今日有 1 个 PR 合并/关闭，为重大渠道功能增强：

- **[#1349] [已合并] feat(qq): support parsing and replying to more attachment types**（https://github.com/sipeed/picoclaw/pull/1349）
  - 支持解析 QQ 频道中的 emoji 结构；
  - 支持处理语音、图片、视频、文件等消息类型；
  - 支持回复时先上传本地附件再发送；
  - 回复优先使用 Markdown 消息，失败时降级。
  - 该 PR 自 3 月 11 日创建，历时近 5 个月最终合入，补全了 QQ 频道渠道的富媒体交互能力。

项目整体在 IM 渠道覆盖方面又前进一步，同时多个修复 PR 正在排队，显示项目处于“渠道功能扩展 + 稳定性加固”并行的阶段。

## 社区热点

- **[#3093] [已关闭] [stale] [Feature] I need SimpleX or tox**（https://github.com/sipeed/picoclaw/issues/3093）
  - 今日唯一有讨论的 Issue，共 6 条评论，1 个 👍；
  - 用户提出需要 SimpleX、Wire 或 Tox 网关，属于去中心化/隐私通信协议接入诉求；
  - 该 Issue 创建于 6 月 10 日，更新于 8 月 7 日，最终被 stale 机器人关闭。
  - 诉求分析：部分用户希望 PicoClaw 能接入更多隐私优先的 IM 协议，但项目方未明确表态支持，目前很可能不在路线图内。

## Bug 与稳定性

按严重程度排列，均已有修复 PR：

1. **[高] WhatsApp 信道不可用（client outdated 405）** — PR #3320（https://github.com/sipeed/picoclaw/pull/3320）
   - 现象：WhatsApp 拒绝当前固定的 `whatsmeow` 版本，连接成功约 5 秒后被服务端断开，返回 `Client outdated (405)`，且不会自动重连，导致原生 WhatsApp 渠道完全失效。
   - 修复：升级 `go.mau.fi/whatsmeow` 依赖版本以匹配服务端要求。
   - 状态：PR 已开放，尚未合并。

2. **[中] exec 工具运行时参数失效** — PR #3319（https://github.com/sipeed/picoclaw/pull/3319）
   - 现象：exec 工具声明的 `timeout` 参数被静默忽略，同步执行时始终使用全局默认超时；`background` 与 `pty` 在 schema 中被声明为字符串，但实际应为布尔值。
   - 修复：使工具按调用方传入的超时执行，并修正布尔字段的类型声明。
   - 状态：PR 已开放，尚未合并。

## 功能请求与路线图信号

- **[#3093] SimpleX / Tox / Wire 网关接入**（https://github.com/sipeed/picoclaw/issues/3093）
  - 被 stale 关闭，短期纳入路线图的可能性较低。
- **[#3200] 可配置默认模型回退链（开放 PR）**（https://github.com/sipeed/picoclaw/pull/3200）
  - 该 PR 已开放约 5 周（7 月 1 日创建），近 24 小时有更新，说明仍在推进；
  - 目标是在 Web UI 中支持配置默认模型及回退链，并持久化到后端，对依赖多模型容灾的用户价值较高。
  - 若合入，将成为 v1.x 中重要的可用性改进。
- **[#1349] 已合并的 QQ 频道富媒体支持** 确认渠道体验是持续投入重点。

## 用户反馈摘要

- 有用户明确希望接入 SimpleX/Tox/Wire 等隐私协议网关（#3093），说明存在“更多通信协议桥接”的真实需求，但社区热度不高（仅 1 👍）。
- WhatsApp 用户遭遇“客户端过期”错误（#3320），信道不可用影响使用，已触发快速的依赖修复 PR。
- 从 exec 工具问题（#3319）来看，有用户或开发者在使用工具时发现参数与文档描述不符，反馈已转化为修复 PR，体现出项目对可配置性细节的重视。

## 待处理积压

- **[#3200] feat(models): add configurable default fallback chain**（https://github.com/sipeed/picoclaw/pull/3200）
  - 创建于 2026-07-01，至今未合并；
  - 功能价值明确（模型级容灾），但需要维护者尽快 review 并推进合并或给出结论。

- 今日新增修复 PR（#3320、#3321、#3319）均处于待合并状态，建议维护者优先检查，特别是 WhatsApp 信道故障 PR #3320，影响线上可用性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-08

## 1. 今日速览

过去 24 小时 NanoClaw 保持健康活跃的开发节奏：共产生 **14 条 PR 更新，其中 6 条已合并/关闭，8 条待合并**，无新版本发布，无新增或活跃 Issue。合并的 PR 集中在调度系统、Telegram 消息处理、进度展示等稳定性修复；待合并队列中出现多个社区贡献的“技能（Skill）”类新功能（Tavily MCP、AnyDoc、Dial 集成），显示生态建设正在提速。整体来看，项目处于**高频修复 + 生态扩展**并行阶段，社区参与度良好，但长期未合并的 PR（如 #2346、#2705）仍值得维护者关注。

## 3. 项目进展

今日共有 **6 个 PR 被合并/关闭**，集中修复了 4 个功能模块的遗留问题，项目稳定性和用户体验有明显提升：

| PR | 内容 | 模块 | 状态 |
|----|------|------|------|
| [#3197](https://github.com/qwibitai/nanoclaw/pull/3197) | 失败状态展示具体原因：从失败摘要提取首条有效原因，替代“执行失败”等泛化文案，并复用脱敏逻辑、限制单行 38 字符 | agent-runner / 飞书卡片 | 已合并 |
| [#2213](https://github.com/qwibitai/nanoclaw/pull/2213) | 接受无文字说明的纯媒体消息（照片/视频/文件），修复 Telegram 等平台消息被静默丢弃的问题 | Chat SDK Bridge | 已合并 |
| [#2678](https://github.com/qwibitai/nanoclaw/pull/2678) | 调度失败重试：从 `failed` 状态行也生成下一次执行，而非仅限 `completed` 状态，避免永久失败的任务停止调度 | Scheduling | 已合并 |
| [#2679](https://github.com/qwibitai/nanoclaw/pull/2679) | 将永久失败的定时任务主动以 notice 形式推送给用户，不再仅写日志 | Scheduling | 已合并 |
| [#2643](https://github.com/qwibitai/nanoclaw/pull/2643) | pattern/mention 模式 wiring 在收到直接 @提及、DM 或回复机器人时也能正确触发（此前要求文本同时包含关键词） | Router | 已合并 |
| [#2644](https://github.com/qwibitai/nanoclaw/pull/2644) | Telegram 回复上下文识别：检测“被回复消息是否由本机器人发出”，设置 `isReplyToBot` 标志 | Telegram Channel | 已合并 |

这些合并表明项目在**消息可达性、失败可见性、调度可靠性**三个方向均有实质推进。

## 4. 社区热点

今日无 Issue 评论/讨论数据（各 PR 评论数均为 0）。活跃度集中在 **新提交的 PR** 上，社区正在积极扩展 NanoClaw 的技能生态：

- **[#3190 Tavily MCP 工具技能](https://github.com/qwibitai/nanoclaw/pull/3190)** — 新提交的 Utility Skill，为 agent 接入 Tavily 搜索 API。反映社区对 **实时信息检索** 的明确需求。
- **[#3198 AnyDoc 文档转换技能](https://github.com/qwibitai/nanoclaw/pull/3198)** — 新提交的文档处理技能，贴合 **多格式文档解析** 的常见使用场景。
- **[#3050 Dial 渠道集成](https://github.com/qwibitai/nanoclaw/pull/3050)** — 在 channel picker/wizard 中新增 Dial 渠道，说明社区对 **多渠道接入** 有持续诉求。

此类“技能”类 PR 的密集出现，暗示社区正在将 NanoClaw 视为一个可通过 SKILL.md 快速扩展的 AI 代理平台，而非单纯的聊天机器人框架。

## 5. Bug 与稳定性

### 已修复（今日合并）

| 严重程度 | 问题 | PR |
|----------|------|----|
| 高 | 纯媒体消息（无文字）被静默丢弃，用户发送图片/视频/文件得不到任何响应 | [#2213](https://github.com/qwibitai/nanoclaw/pull/2213) |
| 中 | 定时任务永久失败后停止产生下次执行，任务链意外中断 | [#2678](https://github.com/qwibitai/nanoclaw/pull/2678) |
| 中 | 永久失败的定时任务仅写日志，用户完全无感知 | [#2679](https://github.com/qwibitai/nanoclaw/pull/2679) |
| 中 | 关键词 wiring 收到直接 @提及/私聊/回复时不触发，机器人保持静默 | [#2643](https://github.com/qwibitai/nanoclaw/pull/2643) |
| 中 | Telegram 回复机器人自己的消息时无法识别 `isReplyToBot` | [#2644](https://github.com/qwibitai/nanoclaw/pull/2644) |
| 低 | 过程卡失败仅显示“执行系统检查失败”等泛化文案，无具体原因 | [#3197](https://github.com/qwibitai/nanoclaw/pull/3197) |

### 待合并的修复

| 严重程度 | 问题 | PR |
|----------|------|----|
| 高 | 现有 messaging-group wirings 缺少 channel destinations，需 migration 021 回填 | [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) |
| 中 | 未知斜杠命令被当作 Claude Code 命令处理，导致 agent 输出被静默丢弃 | [#2346](https://github.com/qwibitai/nanoclaw/pull/2346) |
| 中 | mount 未按预期以只读方式挂载 | [#3196](https://github.com/qwibitai/nanoclaw/pull/3196) |
| 中 | `use-native-credential-proxy` 技能实际上未绕过 OneCLI 网关 | [#2705](https://github.com/qwibitai/nanoclaw/pull/2705) |
| 低 | `groups config add-mount` 缺少 `--rw` 标志 | [#3149](https://github.com/qwibitai/nanoclaw/pull/3149) |

## 6. 功能请求与路线图信号

今日没有新增 Issue，但 PR 队列提供了清晰的路线图信号：

- **搜索/信息检索能力**：Tavily MCP 技能（[#3190](https://github.com/qwibitai/nanoclaw/pull/3190)）是独立 Utility Skill，不涉及核心源码，**大概率会被合入**，为 agent 补充互联网实时搜索能力。
- **文档处理能力**：AnyDoc 文档转换技能（[#3198](https://github.com/qwibitai/nanoclaw/pull/3198)）同样为独立 Utility Skill，预期可以较快合入。
- **新增渠道 Dial**：[#3050](https://github.com/qwibitai/nanoclaw/pull/3050) 涉及 channel picker/wizard 源码改动，属于 Feature Skill，需要维护者评估集成成本后合入。

此外，已合并的调度模块两点修复（#2678、#2679）暗示项目正在**完善定时任务的失败处理链路**，该方向后续可能会继续演进（如失败重试次数上限、退避策略等）。

## 7. 用户反馈摘要

当前数据中无 Issue 评论可供提炼，但从 PR 描述中可以获取真实用户痛点：

- **“消息发了没回应”**：Telegram/平台用户发送无文字配图/文件时消息被静默丢弃（[#2213](https://github.com/qwibitai/nanoclaw/pull/2213)），说明现有过滤逻辑过于严格，未考虑主流聊天的媒体使用习惯。
- **“定时任务失败后无声无息”**：永久失败的任务不重排、不通知，用户只能翻日志（[#2678](https://github.com/qwibitai/nanoclaw/pull/2678)、[#2679](https://github.com/qwibitai/nanoclaw/pull/2679)），反映调度模块的失败可见性不足。
- **“机器人不搭理我”**：direct @mention 或 DM 不触发关键词 wiring，用户需要手动包含关键词才能唤醒 agent，交互不符合直觉（[#2643](https://github.com/qwibitai/nanoclaw/pull/2643)）。
- **“失败提示看不懂”**：过程卡只显示“执行系统检查失败”，用户无法得知具体哪一步出错（[#3197](https://github.com/qwibitai/nanoclaw/pull/3197)），影响排查效率和信任感。

## 8. 待处理积压

以下 PR 长期开放且今日有更新，建议维护者优先评估：

| PR | 创建时间 | 积压天数 | 状态 | 备注 |
|----|----------|----------|------|------|
| [#2346](https://github.com/qwibitai/nanoclaw/pull/2346) | 2026-05-08 | 92 天 | OPEN | 未知斜杠命令导致 agent 输出被丢弃，属于功能性 Bug 修复，长期未评审 |
| [#2705](https://github.com/qwibitai/nanoclaw/pull/2705) | 2026-06-07 | 62 天 | OPEN | 凭据代理网关绕过失效，影响本地安装用户的身份验证 |
| [#3145](https://github.com/qwibitai/nanoclaw/pull/3145) | 2026-07-28 | 11 天 | OPEN | 需要 migration 回填数据，涉及存量数据兼容 |
| [#3149](https://github.com/qwibitai/nanoclaw/pull/3149) | 2026-07-29 | 10 天 | OPEN | CLI 功能补全，改动很小，建议快速处理 |
| [#3050](https://github.com/qwibitai/nanoclaw/pull/3050) | 2026-07-14 | 25 天 | OPEN | 新渠道集成，需要评估维护成本 |

其中 **#2346** 和 **#2705** 已积压两三个月，且都指向真实用户场景下的功能缺陷，长期搁置会消耗社区信任度，建议维护者在本周内给出明确回应或合并排期。

---

**总结**：NanoClaw 当前处于健康的迭代期，社区活跃度高，Bug 修复响应快（6 个修复同日合并），技能生态开始发力。主要风险在于 **历史 PR 积压** 和 **核心模块（scheduling/router）近期修复密集，可能需要回归验证**。建议维护者重点关注 #2346 和 #2705 的评审，避免社区贡献者流失。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-08

> 数据来源：GitHub Issues/PR 活动（2026-08-07 更新批次）


## 1. 今日速览

过去 24 小时项目活动处于**高活跃度**状态：50 条 Issue 更新（38 活跃 / 12 关闭）与 50 条 PR 更新（27 待合并 / 23 已合并关闭）持平，显示开发与 QA 双向同步推进。值得注意的动向有两个：一是 **Extensions vNext 规划正式落地**（#7354~#7358，涵盖 Web Push、Telegram 用户会话、Signal 频道与规范化消息操作），四个子任务一次性拆解完成；二是 **QA bug 集中爆发**——一组 P1/P2 级别问题在 8 月 6-7 日密集上报（#7344~#7351），集中在 Slack 连接识别、重复响应、消息排序与运行历史丢失，且大部分已有对应 fix PR 在途。无新版本发布，项目仍处于 v1.2.0 前后的开发冲刺阶段。整体判断：**功能规划活跃、质量回补密集、健康度中等偏上**，但近期 QA 发现的问题需要优先收敛。


## 2. 版本发布

过去 24 小时无新版本发布。当前处于 v1.2.0 开发周期（参考 epic #7166 Tool disclosure follow-up），建议关注后续 Releases 动态。

## 3. 项目进展

今日共有 **23 条 PR 已合并/关闭**。结合已关闭 Issue（12 条），以下为近期落地的重要变更：

### 3.1 已推进的功能 / 修复

| 变更 | 类型 | 说明 |
|------|------|------|
| **#7223 [Inspector] 模型调用指标与 Stats 标签页** | 功能（已关闭 Issue） | 为每个模型调用采集线程/运行/迭代标识、请求与生效模型、起止时间、耗时、成功率等浏览器安全指标，并在 Stats 页渲染会话级统计 |
| **#7222 [Inspector] 提示词检查与 Prompt 标签页** | 功能（已关闭 Issue） | 从宿主 prompt 边界到 WebUI Prompt 页实现提示词检查，捕获/重建各组件来源与展示标签，同时避免将原始提示词写入常规事件流 |
| **#7177 改进延迟工具检索（schema-aware ranked search）** | 增强（已关闭 Issue） | Reborn 渐进式工具披露已实现按 Schema 感知排序检索，提升延迟工具发现准确度 |
| **#4874 WebChat v2 纯 HTTP 非 localhost 访问时 "Illegal invocation" 错误** | 修复（已关闭） | 修复了 UI 通过明文 HTTP + 网络名/IP 访问时消息发送抛 `TypeError` 的兼容性 bug |
| **#3533 Telegram v0.28.1 UI 自动设置失败** | 修复（已关闭） | Telegram 配对流程在 v0.28.1 的 UI 引导步骤已修复 |
| **#7307 Attio 扩展调用返回 `operation_failed` 而非 `auth_required`** | 修复（已关闭） | 扩展认证失败时不再返回不透明错误，改为可诊断的 `auth_required` |

### 3.2 Fix PR 已在途（即将合并）

以下 PR 当前处于 OPEN 状态，直接对应当前仍在活跃的 Issue，合并后预计显著改善今日最突出的问题：

- **#7341** fix(webui): 恢复作用域附件读取与 SSE 测试（对应附件回归）
- **#7336** fix(loop-host): 去重消费过的 steering 消息重放（对应 #7347 重复响应、#7350 排队消息）
- **#7343** feat: LLM 设置重置为默认值（对应 #7340）
- **#7359** fix(auth): 租户+用户级凭据归属，停止报告未建立的原因（对应 #7344 Slack 连接无法被助手识别、#7298 请求在发送前失败）

### 3.3 项目整体位置

结合已合并的 Inspector 系列（#7222/#7223 已关闭，#7277/#7278/#7279/#7280/#7291 待合并）、工具披露优化（#7177 已关闭，#6958/#7353 待合并）、扩展认证修复（#7359 待合并）与 Extensions vNext 新规划（#7354），项目正处于 **v1.2.0 功能收拢与质量修复并行**的阶段。核心基础设施（Inspector 可观测性）已基本成型，接下来重点是扩展生态和新渠道落地。

## 4. 社区热点

> 按评论数排序，反映用户关注度与讨论热度。

### 4.1 🔥 #7340 无法将模型设置恢复为出厂默认值（6 评论）
**链接：** [nearai/ironclaw Issue #7340](https://github.com/nearai/ironclaw/issues/7340)

**诉求分析：** 用户反馈在 Settings → Inference 下修改了模型供应商/选择后，无法恢复初始配置。这是对基础可用性的直接诉求——用户期望一个明确的 "Reset to defaults" 操作。该 Issue 已有对应 PR **#7343**（LLM 设置重置，ironloop bot 提交，OPEN 状态），预计近期可解决。

### 4.2 #6989 Token 核算 bug：混合供应商用量 + 尾部估算（4 评论）
**链接：** [nearai/ironclaw Issue #6989](https://github.com/nearai/ironclaw/issues/6989)

**诉求分析：** P1 级 bug，`ModelWorkRequest::for_assistant` 从内容引用字符串长度估算输入 token，而非引用内容的实际长度，导致 token 计数偏差。这是成本与用量准确性问题，属于 pi-harness 采用计划的一部分，对按量计费用户影响较大。

### 4.3 以下 Issue 各 3 评论

- **#5522** Reborn 例程在需要读取 Slack DM 时失败（无 Slack 读能力 + `capability_info` 重试循环）—— [链接](https://github.com/nearai/ironclaw/issues/5522)，QA bug，已存活 5 周+，需要关注
- **#3533** Telegram v0.28.1 无法从 UI 自动设置（已关闭）—— [链接](https://github.com/nearai/ironclaw/issues/3533)
- **#7185** 记忆跨会话不可靠（2 评论，但涉及多位测试者）—— [链接](https://github.com/nearai/ironclaw/issues/7185)

### 4.4 新 Epic 拆解：#7354 Extensions vNext（4 个子任务，各 0-1 评论）
**链接：** [Epic #7354](https://github.com/nearai/ironclaw/issues/7354) | [#7355](https://github.com/nearai/ironclaw/issues/7355) | [#7356](https://github.com/nearai/ironclaw/issues/7356) | [#7357](https://github.com/nearai/ironclaw/issues/7357) | [#7358](https://github.com/nearai/ironclaw/issues/7358)

Web Push、Rich Messaging 规范化操作、Telegram 用户会话、Signal 频道四个方向同时拆解，目标日期 2026-08-14。这是产品路线图层面的明确信号——**IronClaw 正在从"对话平台"快速扩展为"多渠道主动消息平台"**，但当前评论数较少，后续讨论热度值得观察。

## 5. Bug 与稳定性

> 按严重程度排列。标注 P1/P2 级别、模块、当前状态。

### 5.1 P1 级 | 高影响

| Issue | 问题描述 | 状态 | 对应 Fix PR |
|-------|---------|------|-----------|
| [#7344](https://github.com/nearai/ironclaw/issues/7344) | Slack 在 Messaging Channels 中显示 ACTIVE，但助手不识别该连接（否认/要求 OAuth/错误用户） | OPEN | **#7359**（fix auth 凭据不可见）与 **#7361**（修复 chat 连接意图真实性） |
| [#7292](https://github.com/nearai/ironclaw/issues/7292) | 安装 CoinGecko 工具后无法使用，runner 心跳错误 | OPEN | 暂无明确 fix PR |
| [#7295](https://github.com/nearai/ironclaw/issues/7295) | Agent 向错误的 Slack 用户发送 DM（身份混淆/泄露） | OPEN | **#7359** 或相关 auth 修复可一并缓解 |
| [#7298](https://github.com/nearai/ironclaw/issues/7298) | 两个基础设施错误："request failed before it could be sent" + "monitoring system lost contact with runner" | OPEN | **#7359**（auth 相关） + **#7284**（SSE 重连风暴）- 可能缓解 |
| [#6989](https://github.com/nearai/ironclaw/issues/6989) | Token 核算 bug：从引用字符串长度估算输入 token，导致用量计费不准确 | OPEN | 暂无明确 fix PR |

### 5.2 P2 级 | 中影响（UI/交互一致性）

| Issue | 问题描述 | 状态 |
|-------|---------|------|
| [#7347](https://github.com/nearai/ironclaw/issues/7347) | 单条用户消息产生多个重复助手响应（每次触发独立执行） | OPEN |
| [#7348](https://github.com/nearai/ironclaw/issues/7348) | Activity 工具调用与进度消息时间顺序错乱 | OPEN |
| [#7349](https://github.com/nearai/ironclaw/issues/7349) | 刷新后部分运行历史与 Activity 时间线消失 | OPEN |
| [#7350](https://github.com/nearai/ironclaw/issues/7350) | 排队消息在运行期间发送但收不到单独结果 | OPEN |
| [#7351](https://github.com/nearai/ironclaw/issues/7351) | 运行失败 UI：助手消息被截断 + 失败原因/结果不明确 | OPEN |
| [#7345](https://github.com/nearai/ironclaw/issues/7345) | Agent 报告 61 个自动任务而 UI 只显示 50 个（数量不一致） | OPEN |
| [#7346](https://github.com/nearai/ironclaw/issues/7346) | Emoji 短代码（如 `:wave:`）在助手消息中显示为纯文本 | OPEN |

> 注：以上 P2 级 UI bug 均在 8 月 7 日批量上报，集中在 WebUI v2 的交互一致性与数据渲染层，说明近期前端改动引入了回归。**#7336**（steering 重放去重）与 **#7341**（SSE 附件修复）已覆盖其中部分问题。

### 5.3 已修复（今日关闭）

- **#7307** Attio 扩展错误不透明 → 已修复
- **#4874** WebChat v2 "Illegal invocation" → 已修复
- **#3533** Telegram UI 自动设置 → 已修复

## 6. 功能请求与路线图信号

### 6.1 新功能需求（今日提交）

| Issue | 功能 | 分析 |
|-------|------|------|
| [#7354](https://github.com/nearai/ironclaw/issues/7354) | **Extensions vNext Epic**：Web Push、Rich Messaging、Telegram 用户会话、Signal | 最大路线图信号，目标 2026-08-14，预计进入 v1.2.0 |
| [#7356](https://github.com/nearai/ironclaw/issues/7356) | **Web Push 通知**（opt-in、service-worker、返回上下文） | 增强 Web 端触及能力 |
| [#7355](https://github.com/nearai/ironclaw/issues/7355) | **规范化的反应/编辑/删除消息操作** | 统一跨渠道消息操作契约 |
| [#7357](https://github.com/nearai/ironclaw/issues/7357) | **Telegram 用户设备安全链接**（不需要粘贴 MTProto 原始会话） | 解决 Telegram 委托操作的关键 UX 瓶颈 |
| [#7358](https://github.com/nearai/ironclaw/issues/7358) | **生产级 Signal 频道扩展** | 新渠道落地 |
| [#7317](https://github.com/nearai/ironclaw/issues/7317) | **Doc-Truth 验证管道**：检测功能与文档不一致 | `origin_gate_matrix` 等字段已成为必填项但文档未更新，影响开发者体验 |
| [#7319](https://github.com/nearai/ironclaw/issues/7319) | **扩展配置弹窗保留 manifest 字段标签 + 字段级描述** | 当前显示 "github credential" 通用标题而非可读标签 |

### 6.2 可能进入下一版本的功能（基于已 OPEN PR）

- **#7157** 显式双通道消息投递工具（会话生命周期 + 通知通道）—— [PR 链接](https://github.com/nearai/ironclaw/pull/7157)
- **#6958** Reborn 渐进式工具披露默认启用—— [PR 链接](https://github.com/nearai/ironclaw/pull/6958)
- **#7228** 管理端线程抓取（audited admin thread scraping）—— [PR 链接](https://github.com/nearai/ironclaw/pull/7228)
- **#7353** 延迟工具提升的缓存稳定性（Anthropic 缓存友好）—— [PR 链接](https://github.com/nearai/ironclaw/pull/7353)
- **#7210** 移除死代码 ThreadSidebar（bot 提交）—— [PR 链接](https://github.com/nearai/ironclaw/pull/7210)

### 6.3 结论

Extensions vNext（#7354）是最明确的下一版本路线图，目标 8 月 14 日，覆盖 Proactive 消息 + 新渠道 + 规范化操作。同时 Doc-Truth（#7317）反映了社区对文档质量的持续关注，属于开发者体验类诉求，若被纳入可能改善第三方扩展开发效率。

## 7. 用户反馈摘要

### 7.1 核心痛点

**① 配置不可逆性与凭证混淆（#7340 + #7344 + #7295）**
用户修改变更后无法恢复默认配置，且 Agent 在 Slack 集成中表现出"已连接但未识别"、"向错误用户发送 DM"等身份边界问题。这些反馈指向后台**身份/凭据体系需要更清晰的用户心智模型**——尤其是 OAuth 连接状态对 Agent 的可见性。

**② 长任务 UI 交互断裂（#7347~#7351）**
多评论集中于 WebUI v2 长任务场景：重复响应、消息乱序、刷新丢失历史、排队消息无反馈、失败原因模糊。这些是 QA 测试者在 Railway staging 实例上做 bug bash 时的反馈，代表真实用户在长时间 Agent 交互中对**执行流可视化与确定性**的强烈需求。

**③ 记忆连贯性缺失（#7185）**
多位测试者（Devon、Tobias 等）独立观察到跨会话信息不可靠召回，说明当前记忆机制在真实场景中不够稳定。虽然评论数不多，但涉及多位独立观察者，**可信度较高**。

### 7.2 满意度信号

- 工具披露机制（#7166）被评为"安全、可靠、高效"，作为默认行为获得正面评价；
- Inspector 系列功能（#7222/#7223）多个 PR 集中提交，显示团队重视可观测性投资；
- Doc-Truth 管道提案（#7317）以具体代码示例指出文档缺失，说明有一定数量的第三方/核心开发者正尝试接入扩展生态，对文档一致性有真实诉求。

### 7.3 建议关注

- **#7185 记忆可靠性**目前无明确 fix PR，跨会话记忆是 Agent 产品的核心价值，建议分配资源；
- **#5522 Slack DM 读取能力**已存活 5 周+，是 Reborn 例程的 QA 阻塞项，虽评论不多，但影响特定场景（Slack 深度用户）；
- 今日 P2 级 UI bug 集中在 WebUI v2，建议在合并 #7336 与 #7341 后进行一次专门的 UI 回归。

## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 存活天数 | 状态 | 说明 |
|------|------|---------|---------|------|------|
| [#5522](https://github.com/nearai/ironclaw/issues/5522) | Issue | 2026-07-02 | 37 天 | OPEN，3 评论 | Reborn 例程读取 Slack DM 失败 + capability_info 重试循环，QA 阻塞项 |
| [#6989](https://github.com/nearai/ironclaw/issues/6989) | Issue | 2026-08-01 | 7 天 | OPEN，P1 | Token 核算 bug，影响计费准确性，暂无对应 fix PR |
| [#7340](https://github.com/nearai/ironclaw/issues/7340) | Issue | 2026-08-07 | 1 天 | OPEN，6 评论 | 配置重置功能缺失，**#7343** 已提交修复，等待合并 |
| [#7185](https://github.com/nearai/ironclaw/issues/7185) | Issue | 2026-08-04 | 4 天 | OPEN | 跨会话记忆不可靠，多位测试者反馈，暂无对应 PR |
| [#7292](https://github.com/nearai/ironclaw/issues/7292) | Issue | 2026-08-06 | 2 天 | OPEN，P1 | 工具安装后不可用 + runner 心跳错误，暂无明确 fix PR |

**长期未关闭提醒：** #5522 已存活超过 5 周且与 Slack 深度集成场景相关，若短期无法解决建议在文档中标注为已知限制，以免用户重复踩坑。另外 #7298 涉及 "monitoring system lost contact with runner" 的基础设施级错误，建议优先排查 runner 心跳机制，避免影响更广泛的稳定性。

---

*本日报基于 2026-08-07 GitHub 公开数据自动生成。所有链接均为 data 概览中提供的原始 GitHub Issue/PR 编号链接，格式遵循 [nearai/ironclaw Issue #xxxx](https://github.com/nearai/ironclaw/issues/xxxx) 与 [nearai/ironclaw PR #xxxx](https://github.com/nearai/ironclaw/pull/xxxx)。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 🦞 LobsterAI 项目动态日报 — 2026-08-08

## 1. 今日速览

- 项目保持**中等偏高**活跃度：24小时内处理 7 条 Issue（4 新开/活跃，3 关闭）、7 条 PR（6 合并/关闭，1 待合并），无新版本发布。
- 今日合并了 **release/2026.8.5** 分支至 main，Cowork 会话内搜索、数学渲染、OpenClaw 插件安装、Windows 安装/更新可靠性等多项改进已进入主干。
- 社区在 8 月 6 日报告的「模型 ID 含斜杠无法使用」（#2443）在当日即获得修复 PR（#2452），**反馈→响应→修复**闭环运转良好。
- 仍有 4 条 4 月初创建的 issue 被打上 `stale` 标记且未彻底解决，其中 `sql.js` WASM 崩溃类问题（#1273）风险等级较高，需维护者确认修复状态。
- 整体来看，项目处于「功能迭代 + 稳定性修复」双线并进的健康节奏，但长尾积压问题值得关注。

## 2. 版本发布

无新版本 Release。但 **release/2026.8.5** 分支已通过 PR #2451 合入 main，预示 2026.8.5 版本即将正式发布，以下变更将随版本生效：

- Cowork 新增会话内搜索（in-conversation search）
- 改进数学公式渲染（LaTeX 定界符）
- IM 数据统计增强
- OpenClaw 配置与插件安装改进
- Windows 安装/更新可靠性提升

## 3. 项目进展

今日共 6 个 PR 被合并/关闭，覆盖功能开发、Bug 修复与发布集成：

- **[#2451] Release/2026.8.5 合入 main** — 将 2026.8.5 版本全部改动合并至主干，包括 Cowork 搜索、数学渲染、IM 分析、OpenClaw 配置与插件安装、Windows 安装可靠性等（[链接](https://github.com/netease-youdao/LobsterAI/pull/2451)）
- **[#2450] fix(cowork): 恢复 Windows 下全屏代码工具栏点击** — 将全屏 overlay 移出 Electron 标题栏拖拽区域，解决 Windows 无法点击工具栏的问题（[链接](https://github.com/netease-youdao/LobsterAI/pull/2450)）
- **[#2449] Fix/markdown latex math delimiters** — 修复 Markdown 中 LaTeX 数学公式定界符的解析问题（[链接](https://github.com/netease-youdao/LobsterAI/pull/2449)）
- **[#2448] Liuzhq/fix chat search** — 修复聊天搜索相关缺陷（[链接](https://github.com/netease-youdao/LobsterAI/pull/2448)）
- **[#2445] fix(openclaw): 从 config.set 中剥离插件索引管理的键** — 避免 OpenClaw 配置被插件索引数据污染（[链接](https://github.com/netease-youdao/LobsterAI/pull/2445)）
- **[#2446] fix(win-installer): 通过 extractor 挽救 null watchdog 退出码** — 修复 Windows 安装器看门狗进程异常退出时的空值处理（[链接](https://github.com/netease-youdao/LobsterAI/pull/2446)）

另有一个新 PR 待合并：

- **[#2452] fix(openclaw): preserve provider for slashed model ids** — 修复模型 ID 含斜杠时 provider 前缀丢失的问题（对应 #2443，见下文）（[链接](https://github.com/netease-youdao/LobsterAI/pull/2452)）

综合看，项目今日完成了 2026.8.5 版本的发布集成分支合入，并修复了 5 个具体问题，版本发布已进入冲刺收尾阶段。

## 4. 社区热点

- **[Issue #2443] Bug 反馈：模型 ID 含斜杠的自定义 Provider 无法在界面中使用（SiliconFlow）**（1 条评论）— 用户以 SiliconFlow 为例，报告了 `deepseek-ai/DeepSeek-V4-Flash` 这类带斜杠的模型 ID 在 UI 中无法选择的问题。**该 issue 当日即被认领并生成修复 PR #2452**，是目前最受关注的活跃讨论，反映了用户对 OpenAI 兼容第三方服务商接入的强烈需求（[链接](https://github.com/netease-youdao/LobsterAI/issues/2443)）

- **[Issue #1195] 【bug】自建 skill 被安装到 OpenClaw 目录后，重启技能面板无显示**（2 条评论）— 4 月创建、至今仍 open 的 `stale` issue，评论区讨论虽然不多，但作为长期未决的 skill 管理问题，代表了插件/技能安装闭环中的一处体验断点（[链接](https://github.com/netease-youdao/LobsterAI/issues/1195)）

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#1273](https://github.com/netease-youdao/LobsterAI/issues/1273) | `sql.js`（WASM）高频写入导致 `memory access out of bounds` 崩溃，且 `save()` 非原子写入有数据库损坏风险 | 已 CLOSED（stale），**需确认是否已修复**，建议维护者验证 |
| 🟠 中 | [#2443](https://github.com/netease-youdao/LobsterAI/issues/2443) | 模型 ID 含斜杠（如 `deepseek-ai/DeepSeek-V4-Flash`）时，UI 无法正常识别/显示 provider 前缀 | ✅ 已有修复 PR #2452（待合并） |
| 🟠 中 | [#1195](https://github.com/netease-youdao/LobsterAI/issues/1195) | 自建 skill 被安装到 OpenClaw 的 skill 目录，重启后技能面板不显示 | Open（stale），4 月至今未修复，建议复核 2026.8.5 是否已覆盖 |
| 🟡 低 | [#2447](https://github.com/netease-youdao/LobsterAI/issues/2447) | 执行操作无结果、无错误信息返回（信息不足，需用户补充环境与复现步骤） | Open，等待进一步信息 |
| 🟡 低 | [#1263](https://github.com/netease-youdao/LobsterAI/issues/1263) | 定时任务 UI 显示两条完全一致的记录，均提示 API rate limit reached | CLOSED（stale），若仍可复现需重新开启 |

## 6. 功能请求与路线图信号

- **[#2444] 输入框编辑模式**（今日新开，0 条评论）— 用户提出在输入框增加「编辑模式」开关：切换后 Enter 默认换行、Ctrl+Enter 发送，并可选引入 WYSIWYG 编辑器辅助 Markdown 输入。该需求设计详尽、贴合长 Prompt 编写场景，实现成本可控，**较有希望进入下一版本路线图**（[链接](https://github.com/netease-youdao/LobsterAI/issues/2444)）

- **[#1265] 基于 AGENT 绑定 IM 机器人和模型**（已 CLOSED stale）— 用户提出多 AGENT 场景下为不同 agent 分配独立 IM 机器人及模型（如调度用推理模型、编程用代码模型）。此需求涉及架构层调整，虽以 stale 关闭，但方向与项目多 AGENT 协作愿景一致，建议保留在长期路线图评估池中（[链接](https://github.com/netease-youdao/LobsterAI/issues/1265)）

- **版本内含的信号**：2026.8.5 新增强调 Cowork 会话内搜索与数学渲染，说明项目在**协作工作记忆检索**和**科学文档阅读体验**上持续投入；同时 OpenClaw 配置与插件安装的改进表明**技能/插件生态的稳定性**是当前重点之一。

## 7. 用户反馈摘要

- **长 Prompt 输入体验不佳**（#2444）：用户需要频繁换行撰写长 Prompt，但 `Shift+Enter` 的默认交互不符合主流聊天工具习惯，存在误触直接发送的挫败感——**典型的高频日常使用痛点**。
- **团队协作场景的多 Agent 需求真实存在**（#1265）：用户描述了一个「调度机器人 + 专项机器人（PPT/编程）」的协作团队，希望不同 Agent 绑定不同模型以发挥各自优势——**多 Agent 差异化配置是进阶用户的明确诉求**。
- **对第三方 OpenAI 兼容服务支持有期待**（#2443）：SiliconFlow 等平台提供的模型 ID 普遍含服务商命名空间（斜杠），用户期望这类模型能像原生模型一样在 UI 中无障碍使用——**服务商生态的广度直接影响用户体验**。
- **对异常反馈的“沉默”表示困惑**（#2447）：用户执行操作后既无结果也无报错，属于最影响信心的“静默失败”问题，需要更好的错误上报与日志提示机制。

## 8. 待处理积压

| 条目 | 创建时间 | 最后更新 | 积压天数 | 建议 |
|------|---------|---------|---------|------|
| [#1195](https://github.com/netease-youdao/LobsterAI/issues/1195) 自建 skill 安装后不显示 | 2026-04-01 | 2026-08-07 | 128 天 | 已在 2026.8.5 release 中改进 OpenClaw 插件安装逻辑（PR #2445、#2451），请在未发布版本发布后验证并关闭或更新状态 |
| [#1273](https://github.com/netease-youdao/LobsterAI/issues/1273) sql.js WASM 崩溃 + 数据库损坏风险 | 2026-04-02 | 2026-08-07 | 127 天 | 以 stale 标记关闭但问题描述严重（崩溃不可恢复、数据永久损坏）。若当前存储引擎未更换，建议评估立即修复或给出迁移计划 |
| [#1263](https://github.com/netease-youdao/LobsterAI/issues/1263) 定时任务重复显示 + API rate limit | 2026-04-02 | 2026-08-07 | 127 天 | 请确认是否在后续版本已修复；如仍未处理，建议重新开启并补充排查 |
| [#1265](https://github.com/netease-youdao/LobsterAI/issues/1265) 多 AGENT 绑定不同 IM/模型 | 2026-04-02 | 2026-08-07 | 127 天 | 功能请求类，建议移至 Roadmap 评估或明确回绝 |

---

*报告生成时间：2026-08-08 ｜ 数据来源：github.com/netease-youdao/LobsterAI ｜ 数据窗口：过去 24 小时*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目日报 — 2026-08-08

> 数据来源：GitHub (agentscope-ai/CoPaw，数据中部分 Issue/PR 链接显示为 QwenPaw 旧仓库路径，本报告保留原始链接)

---

## 1. 今日速览

过去 24 小时 CoPaw 保持高活跃度：共 27 条 Issues 更新（16 条新开/活跃、11 条已关闭），50 条 PR 更新（28 条待合并、22 条已合并/关闭），并发布 1 个预发布版本 **v2.1.0-beta.2**。社区贡献者参与度高，多个新提交来自 first-time-contributor，且关键 bug（如 Telegram 白名单重置、桌面模式文本选择）已在数小时内获得修复 PR，维护响应节奏值得肯定。当前最集中的用户诉求是**桌面模式交互体验、Docker 部署稳定性与多渠道（Telegram/微信）访问控制一致性**，整体项目健康度良好。

---

## 2. 版本发布

### v2.1.0-beta.2（Beta 预发布）

**更新内容：**
- **fix(ci)**：real-behavior-proof 中实现 fence-aware section extraction，修复 #6626，提升 CI 对代码块边界的判定准确性。
- **fix(checkpoints)**：恢复 web workspace bootstrap 期间自动快照的还原逻辑，防止工作区初始化过程中丢失自动快照。

**破坏性变更：** 无。

**迁移注意事项：** 本次为 Beta 版本，修复面较小，建议使用 Docker 镜像或桌面版进行验证即可。官方已通过机器人创建安装验证任务 [#6781](https://github.com/agentscope-ai/QwenPaw/issues/6781)，社区可在截止时间内反馈安装结果。

---

## 3. 项目进展

过去 24 小时有 22 条 PR 被合并或关闭，项目持续推进以下方向：

- **桌面端交互修复**：针对用户反馈的桌面模式无法选中/复制文本问题，社区连续提交 [#6802](https://github.com/agentscope-ai/QwenPaw/pull/6802) 与 [#6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) 两个 PR，分别修复 OS 桌面窗口与 `/os` 路由的 `user-select: none` 问题，直接回应 #6797 用户诉求。
- **渠道稳定性**：Telegram 渠道 ACL 白名单重置问题已有修复 PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788)，方案为共享根 profile 工作区 ACL 存储而非 per-task 目录，解决多任务场景下用户被误拦截的问题。
- **微信渠道本地化**：[#6804](https://github.com/agentscope-ai/QwenPaw/pull/6804) 为微信渠道增加中文「允许/拒绝」审批回复支持，降低中文用户使用门槛。
- **CI/脚本健壮性**：[#6805](https://github.com/agentscope-ai/QwenPaw/pull/6805) 修复 channel 检查脚本在有效开发环境中无法探测到已安装 qwenpaw 的问题。
- **平台配置修复**：[#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) 修复 Files 页面 Profile 分类硬编码导致的用户自定义 persona 文件无法显示与切换的回归。

此外，多项早期 PR 仍在评审中，包括配置加载健壮性 ([#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615))、流式重试 Retry-After 策略 ([#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617))、ACP 通知竞争条件修复 ([#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)) 等，均有持续更新迹象，建议维护者加快评审节奏，避免积压。

---

## 4. 社区热点

| 热度 | Issue/PR | 讨论量 | 核心诉求 |
|---|---|---|---|
| 🔥 | [#6782 Docker 插件市场/应用市场「维护中」](https://github.com/agentscope-ai/QwenPaw/issues/6782) | 8 评论 | Docker 用户完全无法使用插件与应用市场，扩展能力瘫痪，怀疑镜像内置服务地址或网络配置问题 |
| 🔥 | [#6116 Doom loop（已关闭 wontfix）](https://github.com/agentscope-ai/QwenPaw/issues/6116) | 8 评论 | 同一工具在单轮内重复调用约 6 次才触发警告，浪费 API 调用与 token；虽被 wontfix 关闭，但社区关注度高 |
| 🔥 | [#6732 MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732) | 6 评论 | 每隔数小时 MCP 工具无法被调用，报「未注册或不存在」，重启容器后恢复 |
| 🔥 | [#6786 Telegram 白名单重置](https://github.com/agentscope-ai/QwenPaw/issues/6786)（另有重复 #6787） | 4+1 评论 | ACP 启动 per-task 工作区导致 `access_control.json` 为空，已批准用户被拦截 |
| 🔥 | [#6797 + #6790 桌面模式交互问题](https://github.com/agentscope-ai/QwenPaw/issues/6797) | 3+2 评论 | 无法选中复制文本；左键需双击才能打开应用，且无返回完整模式的按钮 |

**背后诉求分析**：社区热点集中于「部署后可持续使用性」而非新功能——Docker 市场不可用、MCP 周期失效、空闲卡死、渠道白名单重置均属于**服务稳定性**问题。桌面模式交互反馈则表明 UI/UX 细节正在成为用户升级 v2.1.0-beta.2 后的首要感知点。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高严重度

- **[#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) 空闲几十分钟后卡死（2.0.1）**：进程无响应只能关闭重启，严重影响无人值守使用。已有 3 条评论但尚无修复 PR，建议优先排查后台任务/心跳机制。
- **[#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) Docker 版插件市场、应用市场始终提示「维护中」**：影响所有 Docker 用户扩展能力，建议检查镜像内置市场 API 的访问配置。
- **[#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) Windows 桌面版被 Malware Bytes 报 Trojan Loader**：安全类问题，用户表示已卸载待官方回应。大概率是误报，但需要官方尽快明确回复，否则影响新用户信任。

### 中严重度

- **[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) MCP 工具周期性失效**：需重启容器恢复，涉及长连接失效或注册表状态泄漏。
- **[#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) Telegram whitelist 重置**：✅ 已有修复 PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) 待合并。
- **[#6794](https://github.com/agentscope-ai/QwenPaw/issues/6794) Agent Kanban 创建 Issue 返回 405**：API 路由不可用，开发模式热重载期间还会出现 404。
- **[#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) OpenAI 兼容请求被严格提供商拒绝（StepFun 400）**：请求体携带 Responses-API `input_text` 类型与原始流式字段。✅ 已有修复 PR [#6809](https://github.com/agentscope-ai/QwenPaw/pull/6809)。
- **[#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) / [#6807](https://github.com/agentscope-ai/QwenPaw/issues/6807) qwenpaw-creator 插件在 Windows 不可用**：无法保存任何模型配置（Internal Server Error）；视频/图片生成及资产发布完全不可用，Windows 兼容性需修复。

### 低严重度

- **[#6797](https://github.com/agentscope-ai/QwenPaw/issues/6797)** 桌面模式无法选中复制 → ✅ PR [#6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) / [#6802](https://github.com/agentscope-ai/QwenPaw/pull/6802)
- **[#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785)** Profile 分类硬编码导致自定义 persona 无法切换 → ✅ PR [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808)
- **[#6792](https://github.com/agentscope-ai/QwenPaw/issues/6792)** 内置 ACP runner 使用已弃用 npm 包名 `@zed-industries/claude-agent-acp` / `@zed-industries/codex-acp`，需跟随上游迁移。

---

## 6. 功能请求与路线图信号

### 新功能需求

- **[#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) 新增 Volcengine Agent Plan 与小米 MiMo 标准 API 为内置 provider**：订阅制与按量付两种模式的模型接入需求，反映国内模型供应商生态扩张。
- **[#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285) 阿里云 Token Plan 模型列表加入 `qwen3.8-max-preview`**：应用内硬编码模型列表落后于供应商已支持的模型。
- **[#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770) 用户 Chrome 标签跨响应周期存活时间可配置**：涉及浏览器会话状态管理，对自动化任务场景较重要。

### 可能纳入下一版本的信号

- **[PR #6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) 智能邮件管理助手（mailbox）**：新功能型 PR，支持多邮箱自动收件、分类、回复与实时通知，若合入将显著扩展个人助手能力边界（当前为 first-time-contributor 提交，需维护者评估）。
- **[PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) OneBot 接入远程语音/图片媒体**：已有实现，但等待评审超过 3 天。

---

## 7. 用户反馈摘要

从 Issues 评论提炼的真实用户声音：

- **稳定性是最大痛点**：多位用户反馈「不用时就卡死」「MCP 工具每隔几小时失效」「市场一直维护中」，这些都直接影响日常可用性。用户 sunnnnnner 的描述：「不使用时几十分钟后自己会卡死；只能关闭进程重新启动」，是典型的无人值守场景崩溃。
- **桌面模式交互反直觉**：用户 Jasonsun77 连续提交两条体验问题（双击打开、无法选中文本、缺少返回完整模式按钮），说明 v2.1.0-beta.2 的桌面模式尚未达到可日常使用的交互标准。
- **安全误报打击信任**：用户 boktoday 在 [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) 中表示「I'm uninstalling until I hear back from your team」，但同时也表达了「I love your work. Thanks for all you do.」——安全误报对信任的杀伤力不容忽视，建议官方尽快发布声明。
- **首次贡献者活跃**：多个修复 PR 由 first-time-contributor 提交（如 [#6750](https://github.com/agentscope-ai/QwenPaw/pull/6750)、[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)、[#6799](https://github.com/agentscope-ai/QwenPaw/pull/6799)），显示项目的 issue 模板和文档对新人友好，社区贡献意愿强。
- **中文用户占比高**：本次 27 条 Issue 中约半数使用中文撰写，且问题集中在 Docker、Telegram 与桌面端，提示官方可加强对国内部署场景的测试覆盖。

---

## 8. 待处理积压

以下问题或 PR 长时间未获维护者响应，建议优先关注：

| 项目 | 类型 | 等待时长 | 说明 |
|---|---|---|---|
| [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285) qwen3.8-max-preview 模型列表更新 | Issue | 19 天 | 用户已确认模型在供应商侧可用，仅需更新硬编码列表 |
| [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) Volcengine / 小米 MiMo provider | Issue | 12 天 | 有明确 API 地址与配置说明，接入成本低 |
| [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) 损坏 agent 配置处理 | PR (Under Review) | 8 天 | 修复 JSON 解码崩溃，附带单元测试 |
| [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) Retry-After 上限策略 | PR (Under Review) | 8 天 | 流式重试路径的限流策略修正 |
| [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) ACP 最终文本丢失竞态 | PR (Under Review) | 8 天 | 修复通知与响应同段到达时的文本丢失 |
| [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) 插件裸绝对导入隔离 | PR | 4 天 | 修复安装 qwenpaw-creator 失败的根因（fixes #6683） |
| [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) OneBot 远程媒体支持 | PR (Under Review) | 3 天 | 远程 URL 音/图片消息处理 |
| [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) 多步任务后无限循环 | Issue (need-info) | 2 天 | 等待用户补充更多信息，可主动推进 |

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-08

> 数据覆盖窗口：2026-08-07 ~ 2026-08-08（基于 GitHub 公开数据自动汇总）


## 1. 今日速览

ZeroClaw 过去 24 小时保持高活跃度：Issues 与 PR 各更新 50 条，但**有效闭环率偏低**——仅 5 个 Issue 关闭、6 个 PR 合并/关闭，且大量 PR 处于 `needs-author-action` 停滞状态。当日新增 5 个 P1 级 Bug（含 1 个 API 密钥明文泄露、1 个健康检查假阳性、1 个故障转移机制完全失效），安全与稳定性议题成为当日主线。社区讨论重心集中在 RFC 治理流程优化（#6808）与供应商架构统一（#5937）两大长期议题。未发布新版本，项目仍处于 0.8.x 迭代周期。

**活跃度评估：** ★★★★☆（高）——讨论与提交频繁，但合并吞吐与维护者响应速度是当前瓶颈。


## 2. 版本发布

过去 24 小时**无新版本发布**。当前处于 v0.8.x 迭代段，多个 RFC 标注 `Starting: 0.8.0-beta-1 / Current: 0.8.3`（如 #6808），暗示 0.9 或更高版本的功能冻结与发布规划仍在进行中。


## 3. 项目进展

当日无重大功能 PR 合并（唯一合并的 #9795 为测试基建改进；#9818 为 fork-local 修改、明确不纳入上游）。但通过已关闭的 RFC/Issue 可确认以下方向**正式被接受**，进入实施管线：

| 事项 | 状态 | 意义 |
|---|---|---|
| [RFC #8933: 跨轮次会话关联 OTel 导出](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | 已关闭（accepted） | 为 `gen_ai.conversation.id` 实验属性铺路，可观测性语义对齐 OTel v1.41.0 |
| [RFC #9246: ZeroCode 迁移保留 Todo tracker 配置](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | 已关闭（accepted） | 明确配置所有权迁移边界，降低升级破坏风险 |
| [Bug #9386: Gemini API key 经错误信息泄露至聊天](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) | 已关闭（accepted） | 安全漏洞确认，`sanitize_api_error` 修复方向已定 |
| [Feature #6055: Slack 首次提及回填线程上下文](https://github.com/zeroclaw-labs/zeroclaw/issues/6055) | 已关闭（accepted） | Slack 频道上下文感知能力增强 |

另外，[PR #9795](https://github.com/zeroclaw-labs/zeroclaw/pull/9795)（xtask dist 断言改为从规范注册表派生）已合并，消除了五处重复的 dist 特性契约定义，属低风险内部一致性改进。

**整体判断：** 项目处于"**讨论收敛、实施滞后**"阶段——多个高价值 RFC 已获批，但对应的代码实现（PR）尚未合并，预计未来 1-2 周将迎来一波合并高峰。


## 4. 社区热点

### 4.1 [#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — 20 条评论
> ⭐ 全天讨论最热 Issue

最长寿的治理类 RFC（86 天），历经 24 次修订，当前状态 `Ratification deferred / rollout in progress`。核心诉求是**降低维护者的路由负担**——通过自动化标签、工作流分道来替代人工看板管理。其长期悬而未决的状态直接催生了 [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)（精简 RFC 流程），社区对治理效率的不满已形成连锁反应。

### 4.2 [#5937 Unify providers architecture and reqwest client management](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) — 12 条评论
> 已 accepted 但 110 天未进入实施

providers 模块代码重复、配置碎片化是老生常谈的技术债。该 Issue 已获接受，但长时间无对应 PR，反映出**核心架构重构缺乏人力投入**。

### 4.3 [#8933 与 #9246](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) — 13/12 条评论，均已关闭
两个同日关闭的 RFC 均获得 10+ 评论，说明社区对**可观测性标准化**和**配置迁移安全**有强烈关注。尤其是 #8933 的 OTel 会话关联，是生产环境排查多轮对话问题的刚需。

**社区情绪素描：** 讨论质量较高（多为 RFC 评审级），但 contributor 对"流程缓慢、PR 无人合并"的抱怨开始浮出水面（如 #9496、#9530 的提出本身即是信号）。


## 5. Bug 与稳定性

当日新报告/活跃 Bug 按严重程度排列：

### 🔴 严重（P1 / 高危）

| Bug | 状态 | 说明 |
|---|---|---|
| [API key 明文写入日志（provider 连接错误） #9813](https://github.com/zeroclaw-labs/zeroclaw/issues/9813) | 新开，无 fix PR | DNS 故障时完整 URL（含 `?key=`）进入日志，与 #9386 同源但出现在 logging 路径，**已标注 duplicate 但泄露面不同** |
| [Provider fallback 携带 primary model id，永不触发 #9812](https://github.com/zeroclaw-labs/zeroclaw/issues/9812) | 新开，无 fix PR | **故障转移机制整体失效**。fallback provider 被请求 primary 的 model id，且自身被错误标记进 cooldown，影响所有配置了 fallback 的生产用户 |
| [健康检查报告从未连接的频道为 healthy #9811](https://github.com/zeroclaw-labs/zeroclaw/issues/9811) | 新开，无 fix PR | Telegram token 无效（404）时 `/health` 仍返回 green，**监控盲区**，可能掩盖频道长时间中断 |
| [SOP auto-mode 永不执行、run 永久卡死 #9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | 新开，无 fix PR | headless 分发缺少 agent loop，`ExecuteStep` 永不执行，占用并发槽位且随 daemon 重启持续存在 |
| [cron update 静默丢弃 declarative 作业的六项配置 #9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) | 新开，无 fix PR | 命令/名称/调度等 6 个字段被无提示丢弃，用户配置静默失效 |
| [OpenRouter 流式请求丢失 provider_extra #9775](https://github.com/zeroclaw-labs/zeroclaw/issues/9775) | in-progress，无 fix PR | 流式路径未调用 `merge_extra_body`，所有附加参数失效 |
| [畸形 SOP.toml 被静默丢弃，校验误报成功 #9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) | 已接受，无 fix PR | `sop list` 遗漏 + `sop validate` 成功 = 排查陷阱 |

### 🟡 中等（P2）

| Bug | 状态 | 说明 |
|---|---|---|
| [SOP finish_run 丢弃失败原因 #9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) | 已接受，无 fix PR | 失败原因在唯一可用点被丢弃，审计信息缺失 |
| [多步 SOP 运行中途被误标 failed 且无审计事件 #9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) | 待复现 | agent 驱动场景下状态错乱，需进一步诊断 |
| [Telegram 审批等待期间 typing 指示器持续运行 #9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656) | 已接受，follow-up | 用户将阻塞误认为正常工作中 |
| [服务启动器 stdout/stderr 日志无大小/轮转上限 #9708](https://github.com/zeroclaw-labs/zeroclaw/issues/9708) | in-progress | 长时间运行将写满磁盘 |

### ✅ 已有 fix PR 的 Bug
- **Gemini API key 泄露至聊天（#9386）** — 已关闭（accepted），修复方案确定但未见对应 PR
- **Edge TTS 临时文件清理 [#9709](https://github.com/zeroclaw-labs/zeroclaw/pull/9709)** — 待作者更新，修复成功路径后的读取失败分支泄漏
- **流式 draft 未经过 sanitize 边界 [#8964](https://github.com/zeroclaw-labs/zeroclaw/pull/8964)** — 待处理，修复原始 `<...>` 注入风险
- **浏览器截图任意路径写文件 [#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)** — 待处理，XL 级安全修复被长时间搁置

**当日 Bug 趋势：** 安全类（key 泄露 ×2）与 SOP/运行时状态机类问题集中爆发，且新 Bug 普遍无对应 fix PR——修复吞吐明显跟不上发现速度。


## 6. 功能请求与路线图信号

当日新提出的功能需求/方向：

| 功能 | 来源 | 分析 |
|---|---|---|
| [Agent Plugins 1.0 标准支持（#9810）](https://github.com/zeroclaw-labs/zeroclaw/issues/9810) | 新 RFC | 接入 vendor-neutral 插件生态（`plugin.json` + `skills/` + `mcp.json`），与已有 #9346（统一目录契约）、#8908/#8909（插件包目录）形成体系化布局，**极有可能进入 0.9 路线图** |
| [原生 XMPP/Prosody 频道（#9814）](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | 新 Feature 请求 | 面向 home-lab 轻量部署场景，与现有 Matrix/Telegram/Discord 并列，属于长尾频道补充 |
| [groq_cli ACP 供应商（#9104）](https://github.com/zeroclaw-labs/zeroclaw/pull/9104) | PR 待合并 | Grok Build 通过 ACP 接入，提示"桌面/本地优先"模型供应商方向 |
| [Hailo-Ollama 原生支持（#9109）](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | PR 待合并 | 边缘 AI 硬件适配，与已有 `hardware` feature 呼应 |
| [图片内容像素级校验（#9819）](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) | 新 PR | 防止损坏图片导致供应商请求失败，低成本高收益的健壮性改进 |
| [Web 多会话/多标签页（#9353/#9355）](https://github.com/zeroclaw-labs/zeroclaw/pull/9353) | 两个 XL 级 PR 待合并 | 同一 agent 可开多个独立会话，显著改善 Web UI 可用性 |
| [zega-ai bridge 集成（#9806）](https://github.com/zeroclaw-labs/zeroclaw/pull/9806) | 新 PR | 外部 AI 桥接，需关注其架构定位是否与现有 gateway 体系冲突 |

**路线图信号：** 插件生态（Agent Plugins）、可观测性标准化（OTel）、本地/边缘部署（XMPP、Hailo）是三大主题；`cron-triggered SOP 无法联网`（#9780）揭示自动化能力缺口，预计将推动 HTTP capability 的补充。


## 7. 用户反馈摘要

来自 Issue 评论的真实用户声音：

**🔴 最尖锐痛点：**
- "Malformed SOP and absent SOP are indistinguishable"（#9786）——**配置错误被静默吞掉**，用户无法区分"写错"与"不存在"。
- "A correctly configured fallback can never fire"（#9812）——**兜底机制形同虚设**，用户对生产可靠性信心受挫。
- "/health reports a channel healthy that has never connected"（#9811）——**监控工具误导用户**，比没有监控更危险。
- "The typing indicator keeps running for the whole approval wait, so a blocked turn looks like a working one"（#9656）——**交互反馈失真**，用户无法判断系统是否在正常工作。

**🟡 使用场景观察：**
- #9805/#9780 等 SOP 相关 Bug 集中出现，说明**cron/自动触发 SOP 正在被真实用户使用**，且属于高价值场景（watch-loop）。
- #9814 XMPP 请求来自"home-lab 与低资源部署"用户，与 #9109（Hailo-Ollama）共同勾勒出**轻量级自托管用户画像**。
- #8933 OTel 关联获得 13 条评审评论，反映**平台型用户（gateway 多租户）对全链路追踪的刚需**。

**😠 流程不满：**
- #9496 明言"RFC process has become slower and more cumbersome than the decisions it is meant to support"——**维护流程已超过决策本身的成本**，社区对响应速度的耐心接近临界。


## 8. 待处理积压（维护者需关注）

### 长期未关闭的高价值 Issue

| Issue | 等待时长 | 状态 | 风险 |
|---|---|---|---|
| [#5937 providers 架构统一重构](https://github.com/zeroclaw-labs/zeroclaw/issues/5937) | 110 天 | accepted，无 PR | 技术债持续累积，每个新 provider 都在堆重复代码 |
| [#7100 按模型能力与上下文窗口配置（P1）](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 67 天 | needs-maintainer-review | 能力误报导致用户体验割裂 |
| [#8424 工作区相对 forbidden 路径与 .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) | 41 天 | needs-author-action | 安全模型缺口，工作区内敏感文件暴露 |
| [#8043 退役 aardvark-sys 独立 crate](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) | 49 天 | needs-author-action | 与 #7130（forbid unsafe）耦合，影响工作区安全基线 |
| [#9397 WhatsApp 空 allowed_groups 应视为拒绝全部（P1）](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | 13 天 | in-progress | 默认安全策略缺陷 |

### 滞留过长的 PR（均超过 7 天无合并，部分带 P1 修复）

| PR | 等待时长 | 阻塞原因 |
|---|---|---|
| [#9362 浏览器截图路径安全修复（P1/安全/XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) | 14 天 | needs-author-action（任意文件写入漏洞，修复长期搁置） |
| [#9424 拒绝语义空 terminal 补全（P1/XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/9424) | 12 天 | needs-author-action（影响所有供应商的可靠重试） |
| [#9536 ACP 会话默认工作区修复（P1）](https://github.com/zeroclaw-labs/zeroclaw/pull/9536) | 10 天 | needs-author-action（shell 工具可能以错误 CWD 执行） |
| [#8965 声明式技能自动激活（XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) | 28 天 | 依赖 #9563 落地，被阻塞 |
| [#9196 MCP 资源 blob 物化](https://github.com/zeroclaw-labs/zeroclaw/pull/9196) | 19 天 | needs-author-action |
| [#8561 Telegram multi_message 流式模式（XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 39 天 | needs-author-action |

### ⚠️ 维护者行动建议

1. **优先处理 3 个 P1 安全/正确性 PR**（#9362、#9424、#9536），它们已滞留超过一周且均标注 `needs-author-action`——建议维护者主动 ping 作者或接手 rebase，避免安全修复无限期延后。
2. **#9812、#9811、#9813 三个新 P1 Bug 无 fix PR**——建议立即标记 `needs-triage` 并分配负责人，其中 #9812 的 fallback 失效影响所有高可用部署，建议 hotfix 优先。
3. **RFC 流程瓶颈**——#6808 已讨论 86 天仍未定稿，社区已用 #9496 表达不满。建议维护者本周安排一次 RFC 评审会议，对长期悬置提案（#6808、#5937）给出明确结论（ratify / reject / defer with date）。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*