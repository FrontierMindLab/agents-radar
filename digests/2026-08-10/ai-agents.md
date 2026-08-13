# OpenClaw 生态日报 2026-08-10

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-10 04:40 UTC

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

# OpenClaw 项目动态日报 — 2026-08-10

> 数据区间：2026-08-09 ~ 2026-08-10 | 数据来源：github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 项目保持高强度迭代节奏：过去 24 小时内 Issues 更新 500 条（新开/活跃 396 条 / 关闭 104 条），PR 更新 500 条（待合并 318 条 / 已合并或关闭 182 条），存量 PR 合并/关闭率达到 36.4%，说明维护者与自动化工作流（clawsweeper）仍在持续消化积压。今日无新版本发布，但值得关注的是 **P0/P1 级别的问题数量依然偏高**，尤其集中在会话状态损坏（duplicate transcripts、stuck session、compaction 异常）与消息丢失/重复投递两条主线上；与此同时，社区功能请求持续涌入，多个早期 issue 已进入 `linked-pr-open` 状态，呈现"修 bug 与建功能并行"的活跃态势。

**活跃度评估**：🔥🔥🔥🔥🔥（极高）。当前核心风险是 P0/P1 积压问题的收敛速度，以及 318 条待合并 PR 的审查瓶颈。

---

## 2. 版本发布

**无新版本发布。**

（上次版本仍停留在 2026.7.x 系列，鉴于 P0 问题（#48920、#43661 等）曾被标记为 `mock:ux-release-blocker`，新版本发布可能正在等待关键修复合入。）

---

## 3. 项目进展

今日有 182 条 PR 被合并或关闭，**未展示完整合并清单**，但结合开放 PR 可见项目正向以下方向推进：

### 3.1 会话与消息可靠性（重点攻坚方向）

- [PR #120491](https://github.com/openclaw/openclaw/pull/120491)（[OPEN] P1, XL）— **feat(tools): per-turn per-target send budget guard for message tools**。为 `message`/`conversations_send` 增加每轮每目标发送预算守卫，针对"模型重复发送语义相同但措辞略有差异的答案"这一消息风暴场景。若合入将直接缓解 Telegram 重复消息类问题（#96242 等）。
- [PR #120443](https://github.com/openclaw/openclaw/pull/120443)（[OPEN] P1, L, extensions: codex）— **fix: read codex thread binding before deferring automatic compaction (#119977)**。修复 Codex 自动压缩时未发送原生请求、导致对话轮次丢失的问题，直接关联 #119977 与 #119971。
- [PR #121308](https://github.com/openclaw/openclaw/pull/121308)（[OPEN] P1, XL）— **refactor(channels): flatten channel-turn dispatch naming layers**。简化渠道入站分发逻辑——"一个实现、六个名称"的重构，降低维护成本，减少因命名混淆引发的转发/分发 bug。

### 3.2 安全边界加固

- [PR #119847](https://github.com/openclaw/openclaw/pull/119847)（[OPEN] P2, XL）— **fix(agents): keep spawned attachments inside workspace**。修复 `sessions_spawn` 暂存内联附件时，工作区控制的符号链接可将附件重定向到子工作区之外的安全漏洞。
- [PR #121335](https://github.com/openclaw/openclaw/pull/121335)（[OPEN] P1, M）— **fix(security): unify secret-redaction and SSRF policy ownership**。统一分散在 4 处、模式表不一致的秘密脱敏实现，消除安全缺口，同时统一 SSRF 策略归属。
- [PR #121388](https://github.com/openclaw/openclaw/pull/121388)（[CLOSED]）— **refactor: eliminate wrapper export shadowing hazards**。消除包装模块与被包装模块导出同名符号导致的静默失败风险（如导入内部 `resolveQueueSettings` 会跳过插件默认值）。

### 3.3 控制 UI / Web 体验修复

- [PR #121315](https://github.com/openclaw/openclaw/pull/121315)（[CLOSED]）— **fix(ui): rotated device tokens are lost instead of shown in WebViews without a dialog bridge**。修复 WebView 环境旋转设备令牌时凭据丢失的问题。
- [PR #121385](https://github.com/openclaw/openclaw/pull/121385)（[OPEN]）— **fix(ui): offer undo and a named recovery path when hiding a sidebar section**，隐藏侧边栏分区后提供撤销与恢复路径，修复"单向门"交互问题。
- [PR #121372](https://github.com/openclaw/openclaw/pull/121372)（[CLOSED]）— **fix(ui): sidebar group headers read at the same weight as their sessions**，修复侧边栏分组标题与内部会话视觉层级混淆的可用性问题。

### 3.4 系统代理 QR 设置链路（长期特性，持续推进）

- [PR #119341](https://github.com/openclaw/openclaw/pull/119341) / [#119342](https://github.com/openclaw/openclaw/pull/119342) / [#119343](https://github.com/openclaw/openclaw/pull/119343) / [#114173](https://github.com/openclaw/openclaw/pull/114173) / [#118169](https://github.com/openclaw/openclaw/pull/118169) / [#119344](https://github.com/openclaw/openclaw/pull/119344) — 从"QR 契约定义 → Gateway 托管 → 系统代理承载 → Control UI 展示 → Signal 接入"逐层推进，该项目已持续 6+ 个 PR，方向正在收敛。

---

## 4. 社区热点

### Issue 讨论热度排行（今日评论数 Top 3，均 18+ 条）

| 排名 | Issue | 评论数 | 核心诉求 |
|------|-------|--------|----------|
| 1 | [#22438](https://github.com/openclaw/openclaw/issues/22438) — **分层引导文件加载**（tiered bootstrap file loading） | 19 | 减少大工作区每次会话全部加载引导文件对 token 的浪费，支持渐进上下文控制，保护上下文窗口预算。 |
| 2 | [#121058](https://github.com/openclaw/openclaw/issues/121058) — **静默回复失败仍复发** | 19 | 用户明确表示 #116277 关闭后该问题仍在发生，监控 cron 今日（8/9）仍记录到新事件。社区对"旧 issue 关闭但问题未解决"的流程表示不满。 |
| 3 | [#91009](https://github.com/openclaw/openclaw/issues/91009) — **Codex PreToolUse hook 引发 CPU 飙升与网关 RPC 停滞** | 18 | 社区对"Codex 集成在生产环境中触发 100%+ CPU 占用、阻塞网关 RPC"的严重性表示关注，2 个 👍 支持。 |

### 讨论背后的深层诉求

1. **成本控制**是当前社区最关切的主题之一——#22438（分层引导加载，19 评论）、#42475（网关级按 Agent 成本预算, 15 评论）、#38568（上下文窗口百分比注入）、#63990（多索引 Embedding 内存）等，均直接指向 Token 消耗大、费用不可控的痛点。
2. **"关闭即修复"假象引发信任危机**——#121058（静默回复失败复发，19 评论）中用户指出"#116277 被关闭，但问题从未真正解决"。结合 #88870（stuck-session 恢复误杀长任务，7 评论）、#98702（OAuth 继承被拒，7 评论）等，社区对修复质量与验证充分性的质疑在上升。

---

## 5. Bug 与稳定性

> 按严重程度排列。标注 ✅ = 已有修复 PR 在途 / 已关闭；⚠️ = 仍无 fix PR。

### P0（阻塞发布）

| Issue | 问题描述 | 状态 |
|-------|----------|------|
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | [Bug]: Live Docs 领先于发布版本（`IsolatedSessions` 在文档中但不在 2026.3.13 中），4 👍 | ⚠️ 无 fix PR，需产品决策 |
| [#43661](https://github.com/openclaw/openclaw/issues/43661) | **[CLOSED]** 压缩超时导致会话无限挂起并重复发送消息（P0, ux-release-blocker） | ✅ 已关闭（8/10 更新） |

### P1（高优先级）

| Issue | 问题描述 | 状态 |
|-------|----------|------|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败持续复发，无排队回复负载——**#116277 关闭后仍在发生** | ⚠️ 无 fix PR，监控继续记录新事件 |
| [#96242](https://github.com/openclaw/openclaw/issues/96242) | Telegram 同一消息被重复发送（至少三条独立路径确认） | ⚠️ 无 fix PR |
| [#88870](https://github.com/openclaw/openclaw/issues/88870) | **[CLOSED]** stuck-session 恢复误杀正常长任务（~6 分钟误报"用户中止"） | ✅ 已关闭（8/10 更新） |
| [#84536](https://github.com/openclaw/openclaw/issues/84536) | **[CLOSED]** 上下文溢出预判静默杀死内嵌会话，未通知用户 | ✅ 已关闭（8/10 更新） |
| [#93321](https://github.com/openclaw/openclaw/issues/93321) | **[CLOSED]** 压缩保留孤儿 tool_use 块，永久破坏会话 | ✅ 已关闭 |
| [#100941](https://github.com/openclaw/openclaw/issues/100941) | 网关丢弃并行工具扇出时的 WebSocket 连接（1006），误报"网关崩溃" | ⚠️ 无 fix PR（标签：needs-maintainer-review, source-repro） |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook 产生 CPU 密集的 openclaw-hooks 进程并阻塞网关 RPC，2 👍 | ⚠️ 无 fix PR（标签：needs-maintainer-review, needs-live-repro） |
| [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28→6.1 升级后 cron store 静默迁移至 SQLite，新任务默认 delivery.mode=announce 导致渠道错误 | ⚠️ 无 fix PR（标签：needs-product-decision, linked-pr-open） |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话完成后持久化，主会话无响应（webchat） | ⚠️ 无 fix PR |
| [#98702](https://github.com/openclaw/openclaw/issues/98702) | 继承的 OpenAI OAuth（read-through from main）在 openai-chatgpt-responses 传输上被拒绝 | ⚠️ 无 fix PR |
| [#82662](https://github.com/openclaw/openclaw/issues/82662) | 隔离 cron agentTurn 失败：`setup timed out before runner start`，全部 6 个回退模型耗尽 | ⚠️ 无 fix PR（标签：source-repro） |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix 房间 Agent 可在可见 no-reply 输出上循环、重启恢复后重放过期会话 | ⚠️ 无 fix PR |
| [#114020](https://github.com/openclaw/openclaw/issues/114020) | 升级 7.2-beta.4 后 Feishu/Telegram 入站失败：缺少 runDispatchLifecycle 声明 | ⚠️ 无 fix PR（标签：not-repro-on-main） |
| [#105528](https://github.com/openclaw/openclaw/issues/105528) | Windows 上 exec/read 工具间歇性返回空输出（2026.6.x 回归） | ⚠️ 无 fix PR（标签：needs-live-repro） |
| [#79252](https://github.com/openclaw/openclaw/issues/79252) | globalCircuitBreakerThreshold 按工具类型计数而非全局计数，允许跨工具规避熔断 | ⚠️ 无 fix PR |
| [#72015](https://github.com/openclaw/openclaw/issues/72015) | active-memory 阻断回复；QMD 启动初始化可能压垮多 Agent 网关，2 👍 | ⚠️ 无 fix PR |
| [#70334](https://github.com/openclaw/openclaw/issues/70334) | **[CLOSED]** 上下文溢出压缩成功后会话仍卡在 processing 状态（queueDepth=0），需重启网关 | ✅ 已关闭（8/10 更新） |

### 值得注意的中等级别 Bug

- [#120735](https://github.com/openclaw/openclaw/issues/120735)（P2, diamond lobster）— Telegram 入站贴纸以原始文件引用到达，无描述、未落盘，Agent 完全无法看到贴纸。标签含 `fix-shape-clear`、`queueable-fix`、`source-repro`，修复难度明确。
- [#53628](https://github.com/openclaw/openclaw/issues/53628)（P3）— 安装 skill 时 `${XDG_CONFIG_HOME}` 未被解释。
- [#40919](https://github.com/openclaw/openclaw/issues/40919)（P2）— 会话内存同步采用全量删除-重插模式，JSONL 增长导致性能退化（`linked-pr-open`）。
- [#84110](https://github.com/openclaw/openclaw/issues/84110)（P2）— Codex app-server 在工具调用续轮时重写完整 prompt，缓存命中率 93%→47%。

---

## 6. 功能请求与路线图信号

### 高潜力功能（已有 PR 在途或标签 `linked-pr-open`）

| Issue | 功能 | 信号 |
|-------|------|------|
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | 分层引导文件加载（tiered bootstrap loading） | 19 条评论为今日最高之一，讨论热度极高 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 网关级按 Agent 成本预算（日/月上限） | 15 条评论，`linked-pr-open` |
| [#27445](https://github.com/openclaw/openclaw/issues/27445) | `announceTarget` 子代理完成通告路由 | 13 条评论，5 👍，`linked-pr-open` |
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | 多槽位记忆架构（multi-slot memory） | `linked-pr-open`，3 👍 |
| [#47677](https://github.com/openclaw/openclaw/issues/47677) | Telegram 反应作为一等触发输入 | `linked-pr-open`，2 👍 |
| [#40919](https://github.com/openclaw/openclaw/issues/40919) | 会话内存同步性能修复 | `linked-pr-open` |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | `/models test-fallback` 回退链测试命令 | 11 条评论 |

### 值得纳入路线图但未定优先级的呼声较高的功能

| Issue | 功能 | 社区支持 |
|-------|------|----------|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | Per-agent dreaming 配置（按工作区独立运行记忆压缩） | 5 👍，解决 OOM 风险 |
| [#28300](https://github.com/openclaw/openclaw/issues/28300) | Control UI 主题定制系统（预设主题 + 自定义主题工作室） | 5 👍 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | Agent 自主触发上下文压缩（self-compact tool） | 2 👍，由 Agent 自主提交 |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | 子代理超时优雅降级（超时前警告 + 进度保存） | 关联 #39305（P0 标签） |
| [#63990](https://github.com/openclaw/openclaw/issues/63990) | 多索引 Embedding 内存 + 模型感知故障转移 | 1 👍 |
| [#78301](https://github.com/openclaw/openclaw/issues/78301) | 插件加载器静默失败诊断增强 | 2 👍 |

### 与当前 PR 方向形成的呼应

今日 PR 中 [#120491](https://github.com/openclaw/openclaw/pull/120491)（per-turn send budget guard）直接呼应社区对重复消息问题的长期诉求；QR 设置链路系列 PR（#119341~#119344 等）则是 7 月以来的系统代理功能方向。**预计下一版本的主要增量**将围绕：发送预算/熔断机制、QR 设置全链路、Channel turn 分发重构、会话存储层清理（SQLite）。

---

## 7. 用户反馈摘要

### 核心痛点（来自 Issues 评论与正文）

1. **"问题关闭 ≠ 问题修复"的挫败感**：在 [#121058](https://github.com/openclaw/openclaw/issues/121058) 中，用户反复强调"#116277 被关闭，但静默回复失败今天仍在发生"，并使用"still recurring after #116277 closed"这样的措辞。社区对关闭 issue 但未彻底修复的流程表现出明显不满。

2. **重复消息带来的信任损耗**：Telegram 重复消息（[#96242](https://github.com/openclaw/openclaw/issues/96242)）被用户描述为"至少三条独立确认的路径"导致同一消息发送两次、甚至三次。在 [#43661](https://github.com/openclaw/openclaw/issues/43661)（已关闭）中，用户记录了更严重的场景：压缩超时 → 每次重试触发重复投递 → 无恢复机制。

3. **多 Agent 部署的运营成本失控**：[#42475](https://github.com/openclaw/openclaw/issues/42475) 中用户明确要求"防止跑单失控"；[#67413](https://github.com/openclaw/openclaw/issues/67413) 中报告所有工作区同时 dreaming 导致 OOM（内存超 6GB 被杀）；[#80131](https://github.com/openclaw/openclaw/issues/80131) 中用户实测每请求认证 5.5s + 工具打包 8.9s 占 TTFT 的 1/3，但对"这些是每次迭代不变的重复功"的浪费感到痛心。

4. **升级即风险**：[#90378](https://github.com/openclaw/openclaw/issues/90378)（5.28→6.1 cron 存储静默迁移至 SQLite 且行为不一致）、[#114020](https://github.com/openclaw/openclaw/issues/114020)（7.2-beta.4 升级后 Feishu 全挂）、[#48920](https://github.com/openclaw/openclaw/issues/48920)（P0: 文档比发布超前）——升级路径的不透明和破坏性变更在多个 issue 中反复出现。

5. **子代理生命周期管理的空白**：[#47975](https://github.com/openclaw/openclaw/issues/47975)（子代理会话持久存在导致主会话无响应）、[#39305](https://github.com/openclaw/openclaw/issues/39305)（P0: 子代理停滞时仅有 `runTimeoutSeconds` 兜底）、[#6625](https://github.com/openclaw/openclaw/issues/6625)（超时即刻杀死，未保存工作）——一个成体系的子代理生命周期管理方案比零散修复更被需要。

### 用户满意点（间接信号）

- 今日新增/活跃 Issue 中相当比例是功能请求（约 20 条），而非纯 bug 报告，说明整体可用性能支撑用户进行高阶使用。
- 部分 PR 已进入小步快跑模式：UI 细节类 PR 一天内可完成打开→合并（如 #121315、#121372），用户对这类细小打磨响应速度是正面的。

---

## 8. 待处理积压

> 以下为报告期内仍开放、且长期未获修复 PR 或维护者明确回应的重要 Issue。

### 高严重度长期未解决

| Issue | 创建日期 | 已开放 | 严重度 | 备注 |
|-------|----------|--------|--------|------|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | 65 天 | P1 | Codex hook CPU 100%+ 阻塞 RPC；`needs-maintainer-review`, `needs-live-repro`，无 fix PR |
| [#45740](https://github.com/openclaw/openclaw/issues/45740) | 2026-03-14 | 149 天 | P1 | gh-issues skill 将不受信任的 issue body 直接注入子代理 prompt，存在安全风险；`needs-security-review` |
| [#88870](https://github.com/openclaw/openclaw/issues/88870) | 2026-06-01 | 70 天 | P1 | ~~stuck-session 恢复误杀长任务~~ — **期间已关闭**（8/10 更新） |
| [#70334](https://github.com/openclaw/openclaw/issues/70334) | 2026-04-22 | 110 天 | P1 | ~~会话卡在 processing 需重启网关~~ — **期间已关闭**（8/10 更新） |
| [#96242](https://github.com/openclaw/openclaw/issues/96242) | 2026-06-24 | 47 天 | P1 | Telegram 重复消息多路径；无 fix PR，仅有 [#120491](https://github.com/openclaw/openclaw/pull/120491) 为通用治理方案 |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | 2026-03-17 | 146 天 | P0 | 文档超前于发布；用户 4 👍 ——从未收到修复 |
| [#39305](https://github.com/openclaw/openclaw/issues/39305) | 2026-03-08 | 155 天 | P0 | 子代理停滞恢复需求（nudge → kill），`ux-release-blocker`，无 fix PR |

### 长期功能请求（已开放 > 5 个月）

| Issue | 创建日期 | 已开放 | 功能 | 备注 |
|-------|----------|--------|------|------|
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | 2026-02-01 | 190 天 | `/models test-fallback` 命令 | 11 条评论，无 fix PR |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | 2026-02-01 | 190 天 | 子代理超时优雅降级 | 6 条评论，无 fix PR |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | 2026-02-02 | 189 天 | Agent 自触发上下文压缩 | 8 条评论，无 fix PR |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | 2026-02-21 | 170 天 | 分层引导文件加载 | 19 条评论（今日最高），无 fix PR，但讨论热度持续 |
| [#27445](https://github.com/openclaw/openclaw/issues/27445) | 2026-02-26 | 165 天 | `announceTarget` 子代理通告路由 | 5 👍，`linked-pr-open`，等待合入 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 2026-03-10 | 153 天 | 网关级按 Agent 成本预算 | 15 条评论，`linked-pr-open`，等待合入 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 2026-04-20 | 112 天 | Umbrella：跨渠道重复 transcript/replay/context bug 分类整治 | 13 条评论，`needs-maintainer-review`——维护者应注意此汇总 issue 下挂载的多个子问题 |

### PR 积压提醒

- 以下 PR 已开放较久且标为 `waiting on author`，若作者不及时回应可能面临关闭风险：
  - [#121361](https://github.com/openclaw/openclaw/pull/121361)（8/10 创建，等待 rebase）
  - [#119847](https://github.com/openclaw/openclaw/pull/119847)（8/6 创建，等待 author）
  - [#120332](https://github.com/openclaw/openclaw/pull/120332)（8/7 创建，等待 author）
  - [#121335](https://github.com/openclaw/openclaw/pull/121335)（8/10 创建，等待 author）
  - [#121336](https://github.com/openclaw/openclaw/pull/121336)（8/10 创建，等待 author）

---

*本日报由 AI 自动生成，数据来源于 OpenClaw 公开 GitHub 仓库。报告旨在帮助用户与贡献者快速把握项目脉搏，不构成项目官方立场。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-10 | 数据窗口：2026-08-09 ~ 2026-08-10 | 覆盖项目：12 个**

---

## 1. 生态全景

当前个人 AI 助手开源生态呈现出**头部集中、分层加速**的格局：以 OpenClaw 为锚点，生态已分化为"全功能平台型"（OpenClaw、Hermes Agent、CoPaw、IronClaw）、"轻量网关型"（PicoClaw、NanoClaw）、"极简单机型"（NanoBot、Moltis）与"安全/工作流特化型"（ZeroClaw）等多条路线，12 个跟踪项目中 9 个保持活跃。全生态共同涌向三大议题：**会话/记忆可靠性**（重复消息、压缩损坏、状态卡死）、**Token 成本可观测与控制**、**安全默认值（fail-closed）**。与此同时，多个项目（ZeroClaw、NanoClaw）出现严重的"高提交、零合并"评审瓶颈，以及"issue 关闭但问题复发"引发的社区信任危机，表明生态已从"功能狂奔期"进入"质量验证期"。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新（活跃/关闭） | PR 更新（待合并/合并关闭） | 合并/关闭率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（396/104） | 500（318/182） | 36.4% | 无 | 🔥🔥🔥🔥🔥 极高活跃；P0/P1 积压偏高，审查瓶颈明显 |
| **ZeroClaw** | 50（50/0） | 50（50/0） | **0%** | 无 | 高提交、零合并；4 个 S0 安全缺陷无修复 PR，通道严重堵塞 |
| **Hermes Agent** | 50（45/5） | 50（40/10） | 20% | 无 | 高活跃；Critical 级 `rd /s /q C:\` 事件修复在途，响应及时 |
| **CoPaw (QwenPaw)** | 32（25/—） | 37（31/6） | 16.2% | 无 | v2.1.0b2 后质量加固期；Docker/Windows 体验是短板 |
| **IronClaw** | 25（18/7） | 38（30/8） | 21% | 无 | 健康；稳定版 1.1.0 有 100% 复现 Bug，main CI 持续失败 |
| **NanoBot** | 5（5/0） | 18（13/5） | 27.8% | 无 | 中高活跃；`exec.allowPatterns` 安全绕过需紧急评估 |
| **PicoClaw** | 3（3/0） | 7（5/2） | 28.6% | 无 | 中低活跃；SSRF 加固系列 3 PR 待合并 |
| **LobsterAI** | 2（1/1） | 10（3/7） | 70%（多为 stale 自动关闭） | 无 | 偏低；4 月积压 PR 被 bot 批量误清理，需人工复核 |
| **NanoClaw** | 1（1/0） | 16（16/0） | **0%** | 无 | 产出密集但评审停滞；CVE 修复、Dial 频道均滞留 |
| **Moltis** | 2（2/0） | 1（1/0） | 0% | 无 | 低活跃、维稳期；vault 哈希修复待合 |
| **NullClaw** | 0 | 0 | — | 无 | 无活动 |
| **ZeptoClaw** | 0 | 0 | — | 无 | 无活动 |

**关键读数**：OpenClaw 单日 Issue/PR 更新量是第二梯队（50）的 10 倍，生态主导地位稳固；但 ZeroClaw 与 NanoClaw 的 0% 合并率揭示了"贡献涌入但维护吞吐不足"的普遍瓶颈。

---

## 3. OpenClaw 在生态中的定位

**规模断层式领先**：单日 500 条 Issue + 500 条 PR 更新，相当于其余 8 个活跃项目总和的 2 倍以上（其余合计约 170 条 Issue / 227 条 PR）。318 条待合并 PR 既是社区活力的证明，也是审查能力的压力测试。

**技术路线差异**：
- **渠道抽象最彻底**：Telegram/Matrix/Feishu/Slack/Signal 全覆盖，且正在推进"QR 设置链路"（6+ PR 串联契约→Gateway→系统代理→UI→Signal），体现"渠道即一等公民"的架构哲学。
- **可靠性攻坚投入最深**：P0/P1 问题集中在会话状态机（duplicate transcripts、stuck session、compaction、消息重复投递），并已形成"per-turn send budget guard"（#120491）等通用治理方案——这是其他项目尚未触及的深度。
- **工程化程度最高**：clawsweeper 自动化清理积压、`mock:ux-release-blocker` 发布门禁、`linked-pr-open` 标签驱动功能追踪，流程成熟度远超同类。

**相对短板**：P0 文档超前于发布（#48920，146 天未修复）、Telegram 重复消息（#96242）等老问题长期悬而未决；子代理生命周期管理（#39305，155 天 P0）落后于 Hermes 的 Kanban 编排方案。

**社区规模对比**：OpenClaw 的日均 Issue 讨论量（500）约为 Hermes/ZeroClaw（各 50）的 10 倍、IronClaw（25）的 20 倍，是生态中唯一达到"平台级"社区密度的项目。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话/消息可靠性** | OpenClaw、NanoBot、Hermes、IronClaw、CoPaw | 重复消息多路径（OpenClaw #96242）；后台任务覆盖会话数据（NanoBot #5271）；MoA 丢 tool_calls 崩溃（Hermes #58437）；僵尸线程无法删除（IronClaw #7400）；流式 MCP 瞬断永久阻塞（CoPaw #6822） |
| **Token 成本可观测与控制** | OpenClaw、NanoBot、Hermes、CoPaw | 分层引导文件加载省 token（OpenClaw #22438，19 评论）；"2 小时百万 tokens"消耗明细（NanoBot #5266，催生 PR #5299）；网关级按 Agent 成本预算（OpenClaw #42475）；会话记忆跨会话搜索+自动压缩（Hermes #8457，18 评论） |
| **安全边界加固（SSRF/命令注入/越权）** | OpenClaw、NanoBot、PicoClaw、NanoClaw、ZeroClaw、Hermes | `exec.allowPatterns` shell 链式绕过（NanoBot #5305/#5306）；渠道媒体下载 SSRF（PicoClaw #3322~#3324）；git `-C` 绕过审批门（ZeroClaw #9627）；webhook 未认证分发（ZeroClaw #9565）；误删 `C:\` 根目录（Hermes #82842） |
| **多租户/数据隔离** | Hermes、ZeroClaw、OpenClaw | memory 操作绕过 hook 无法租户隔离（Hermes #34352，19 评论）；secrets 跨 profile 泄漏（Hermes #82936）；知识图谱无 per-agent 归属（ZeroClaw #9647） |
| **渠道接入一致性** | OpenClaw、NanoBot、PicoClaw、IronClaw、NanoClaw、CoPaw | Telegram 重复/贴纸不可见（OpenClaw、NanoBot、PicoClaw）；Matrix 同步静默死亡（PicoClaw #3203、ZeroClaw #9855）；Slack 认证卡死/中间进度刷屏（IronClaw #5882/#5551）；Signal 附件静默丢失（NanoClaw #2529/#3142） |
| **升级/迁移风险** | OpenClaw、CoPaw、LobsterAI、Hermes | cron 存储静默迁移 SQLite（OpenClaw #90378）；Docker 版应用市场"维护中"（CoPaw #6782）；插件配置循环写入致网关每 5-20 分钟重启（LobsterAI #1243）；SIGTERM 关闭慢致 systemd 强杀（Hermes #64155） |
| **评审/合并瓶颈** | ZeroClaw、NanoClaw、OpenClaw、IronClaw | 50 条 PR 零合并（ZeroClaw、NanoClaw）；CI 长期不绿（IronClaw #6463/#7413）；318 条待合并 PR（OpenClaw） |

---

## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构关键特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手平台 | 自托管重度用户、多频道接入者 | Python 单体 + 多渠道适配层；会话状态机深度定制；自动化 bot（clawsweeper）辅助维护 |
| **Hermes Agent** | 研究级自主智能体框架 | 多租户团队、自动化编排、桌面端用户 | Gateway + profile 多租户模型；Kanban 工作流编排；TUI/桌面客户端；强调 hook 可扩展性 |
| **ZeroClaw** | 安全优先的工作流引擎 | 安全敏感型组织、Rust 技术栈团队 | **Rust 实现**（tokio/clap）；SOP 作业编排；RFC 驱动治理；egress 网络守卫（net_guard）；供应链安全（RUSTSEC 追踪） |
| **CoPaw (QwenPaw)** | 桌面优先的 Agent 工作平台 | 中文用户、Qwen 模型生态、桌面端 | AgentScope 生态（RAG/ReMe 记忆）；统一 provider 发现/路由；Checkpoint 断点恢复；Docker/Windows 安装器 |
| **IronClaw** | 工具/能力编排平台 | 自动化例程（Reborn）用户、团队工作区 | 渐进式工具披露（100/500/1000 规模检索基线）；capability 批次执行；Responses API；WebUI + PWA 通知 |
| **NanoBot** | 极简核心 + 可扩展边缘 | 轻量部署、个人开发者 | 保留核心极简；Skills/SkillHub 生态；GitAgent Protocol（agent.yaml）；Token 用量记录 API |
| **PicoClaw** | 多协议轻量网关 | 多 IM 接入、低资源部署 | 渠道协议广度（含 IRC/Deltachat）；使用上游安全客户端模式；社区"自提自改"贡献循环 |
| **NanoClaw** | 容器化加固 CLI 助手 | Docker/K8s 用户、CI 集成场景 | CLI-first（`--stdin-json`）；hardened 镜像 + CVE 门禁；Docker Hub 发布流水线；Dial 频道（SMS/AI 语音） |
| **LobsterAI** | OpenClaw 的界面/分发增强层 | 网易系生态、中文桌面用户 | 基于 OpenClaw 的 gateway 封装；Cowork 双人协作会话；定时任务自然语言转 cron |
| **Moltis** | 最小化单机助手（维护模式） | 个人极简用户、vault 安全敏感者 | Apple Container 沙箱集成；vault 恢复短语规范化；无激进功能扩张 |

**架构路线根本差异**：Rust 安全路线（ZeroClaw）vs Python 生态效率路线（OpenClaw/Hermes/CoPaw）；单体平台（OpenClaw）vs 微内核+插件（NanoBot）vs 容器加固（NanoClaw）；自主编排（Hermes Kanban、ZeroClaw SOP）vs 对话优先（CoPaw、PicoClaw）。

---

## 6. 社区热度与成熟度

**T1 — 快速迭代期（日 PR 更新 ≥ 37）**：**OpenClaw**（500，平台级，但 P0 积压是隐患）、**Hermes Agent**（50，修复响应快，Critical 事件当日出 PR）、**ZeroClaw**（50，提交热情高但 0 合并，治理需跟上）、**CoPaw**（37，beta 后精准修补，社区反馈质量高）、**IronClaw**（38，功能推进方向清晰，CI 稳定性拖后腿）。

**T2 — 中速迭代期（日 PR 更新 7~18）**：**NanoBot**（18，文档/测试基建扎实，安全事件上升）、**NanoClaw**（16，产出密集但 0 合并，评审是唯一瓶颈）、**PicoClaw**（7，小步快跑，社区自提自改比例高）。

**T3 — 质量巩固期（日 PR 更新 ≤ 10）**：**LobsterAI**（10，但 7 条是 stale 自动关闭，实际贡献薄弱，存在误清理风险）、**Moltis**（1，维护模式，修复路径清晰）。

**T4 — 停滞**：NullClaw、ZeptoClaw（24 小时无任何活动，建议关注是否已放弃维护）。

**成熟度横向判断**：OpenClaw 与 ZeroClaw 均面临"社区产出 > 维护者吞吐"的失衡，但 OpenClaw 以 36.4% 的合并率证明消化能力，ZeroClaw 0% 合并率则提示治理危机；Hermes 的"当日报告→次日 PR"响应闭环是生态最佳实践；CoPaw 的重复 issue（lcq225 连提 5 条）与重叠 PR（#6801/#6802）反映贡献者引导流程待优化。

---

## 7. 值得关注的趋势信号

1. **"关闭即修复"信任危机正在蔓延**。OpenClaw #121058（静默回复失败，用户直指"#116277 关闭但问题从未解决"）、IronClaw #7400（1.1.0 稳定版 100% 复现 Bug 漏过发布门禁）、LobsterAI #1243（stale 关闭但问题未修复）——社区已开始用"关闭后是否复发"衡量项目诚信度。**对开发者的参考**：修复验证需附带复现测试与用户确认闭环，而非仅关闭 issue。

2. **Token 经济性从优化项升级为一等公民**。NanoBot 的"2 小时百万 tokens"事件与 OpenClaw 的分层引导加载（#22438）、发送预算守卫（#120491）、网关级成本上限（#42475）形成共振。**趋势**：下一轮差异化竞争将聚焦"每 token 产出效率"，可观测性（用量明细、按调用方归因）是入场券。

3. **安全默认值（fail-closed）成为社区共识**。ZeroClaw #9397（空 allowlist 应拒绝一切）、NanoBot #5305（allowlist 被 shell 链式绕过）、Hermes #82842（`C:\` 根目录误删）、PicoClaw SSRF 系列——多个项目同时从"默认放行"转向"默认拒绝"。**对开发者**：任何 allowlist/denylist 机制都应默认 fail-closed，且必须覆盖 shell 语义、URL 重定向、符号链接等间接路径。

4. **多租户隔离从"团队功能"变为"安全底线"**。Hermes #34352（memory 绕过 hook）+ #82936（secrets 跨 profile 泄漏）表明单机多用户场景已进入生产环境，而架构层尚未准备好。这是 OpenClaw 生态系（单用户假设）与 Hermes/ZeroClaw 的分水岭。

5. **会话/记忆持久化是最大共性痛点**。Hermes #8457（跨会话搜索）、OpenClaw #22438（上下文预算）、NanoBot Dream 修复、CoPaw Checkpoint——"重启不丢上下文、压缩不损坏会话、记忆可搜索可归档"已成为用户对 AI 助手的基础预期，而非高级特性。

6. **渠道富消息与多模态升级启动**。PicoClaw Telegram 表格原生渲染（#3327）、Hermes Feishu 位置卡片（#82935）、OpenClaw Telegram 贴纸可见性（#120735）——渠道适配正从"文本可达"迈向"富媒体语义保真"，这对 Agent 理解用户输入质量有直接提升。

7. **供应链与发布规范化是隐形军备竞赛**。NanoClaw CVE 门禁 + Docker Hub 流水线（#3208）、ZeroClaw rust-all 46 项依赖批量升级（#9808）、IronClaw main CI 修复、OpenClaw clawsweeper 自动化——项目间的竞争正从功能层面延伸到"能否持续、安全、可重复地发布"。

8. **Windows 与 Docker 部署体验是生态共同短板**。Hermes Windows 一天三起事故（CRLF 哈希、路径空格、C:\ 误删）、CoPaw Windows 安装器文件锁、Docker 市场不可用、ZeroClaw Docker 端口回环绑定、NanoBot entrypoint 权限——桌面 Agent 要走向大众，Windows 的终端安全边界与容器分发链路必须优先补课。

---

**结论**：生态正处于"规模扩张 → 质量收敛"的转型期。OpenClaw 以绝对体量锚定生态方向，但可靠性债务（P0/P1 积压）与审查瓶颈是其最大风险；Hermes 凭快速修复闭环与多租户前瞻占据技术高地；ZeroClaw 代表安全优先的 Rust 路线异军突起但受困于合并通道。对技术决策者而言，选型需在"生态规模（OpenClaw）"、"多租户安全（Hermes/ZeroClaw）"与"轻量可扩展（NanoBot）"之间权衡；对开发者而言，Token 成本控制、fail-closed 安全、会话持久化验证是当前社区最愿意"用脚投票"的贡献方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高位活跃：5 条 Issue 更新（全部为新增/活跃，0 关闭）、18 条 PR 更新（13 条待合并、5 条已合并/关闭）、无新版本发布。最值得关注的是社区提交了 2 条 `exec.allowPatterns` 安全绕过报告（[#5305](https://github.com/HKUDS/nanobot/issues/5305)、[#5306](https://github.com/HKUDS/nanobot/issues/5306)），且一个 P0 级会话数据竞态修复 PR（[#5271](https://github.com/HKUDS/nanobot/pull/5271)）仍带合并冲突。开发侧以维护者 chengyongru 为主合入了多项 WebUI 文档、测试与 CI 强化工作，同时 Token 使用量可观测性 PR（[#5299](https://github.com/HKUDS/nanobot/pull/5299)）正在推进中。总体判断：功能迭代与 Bug 修复双线活跃，但安全问题与冲突 PR 需要优先处理。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共 5 个 PR 被关闭/合入，集中在文档、测试、WebUI 体验与协议兼容方面：

| PR | 内容 | 类型 |
|---|---|---|
| [#5312](https://github.com/HKUDS/nanobot/pull/5312) | 重写 WebUI 用户指南：补充 Temporary Chat 入口/保留策略、Restricted-mode 行为、Skills 安装说明（Installed/Discover、skills.sh、SkillHub）及远程安装安全边界 | 文档 |
| [#5308](https://github.com/HKUDS/nanobot/pull/5308) | 增加交互式 CLI、WebUI chat fork、版本检查、路由鉴权与失败边界测试；移除 5 个冗余测试；引入 V8 覆盖率报告并强化 CI 门槛 | 测试/CI |
| [#5304](https://github.com/HKUDS/nanobot/pull/5304) | 修复语音输入在 Android Chrome 下的 HTTPS 要求提示：区分不安全 HTTP 与浏览器能力缺失，在所有 locale 下给出可操作提示，并补充 LAN 可信 HTTPS 方案 | WebUI 修复 |
| [#5307](https://github.com/HKUDS/nanobot/pull/5307) | 恢复 Star History 图表（原实现因 GitHub 上游限制失效，新 provider 不再受影响） | 文档/功能 |
| [#4019](https://github.com/HKUDS/nanobot/pull/4019) | 增加 GitAgent Protocol 支持（agent.yaml + SOUL.md），历时约 2.5 个月后收尾，强化"极简核心 + 可扩展边缘"定位 | 功能 |

整体来看，项目在 WebUI 文档/测试基建、浏览器兼容性和外部协议互通上有实质推进；今日合并的 PR 多为低风险改进，P0/P1 核心修复仍在等待合入。

## 4. 社区热点

- **Token 消耗问题（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）** — 13 条评论，今日讨论热度最高。用户 knoppix2 报告 nanobot 在无明显用户活动的情况下，2 小时内消耗约百万 tokens，希望按调用时间/来源记录消耗明细。该需求已直接催生 PR [#5299](https://github.com/HKUDS/nanobot/pull/5299)（结构化 token 用量记录 API），预计进入后续版本。
- **Docker Compose 部署失败（[#5295](https://github.com/HKUDS/nanobot/issues/5295)）** — 5 条评论。用户按 deployment.md 操作后容器报 `cannot open /usr/local/bin/entrypoint.sh: Permission denied` 并以 code 2 反复重启。这是新用户第一体验的关键摩擦点。注意 PR [#5313](https://github.com/HKUDS/nanobot/pull/5313) 摘要含 "Fixes #5..."（截断），是否覆盖此问题需确认。
- **`exec.allowPatterns` 安全绕过（[#5305](https://github.com/HKUDS/nanobot/issues/5305)、[#5306](https://github.com/HKUDS/nanobot/issues/5306)）** — 同一位研究者 YLChen-007 提交的两个高度关联漏洞报告：allowlist 可被 shell 链式命令绕过，且可通过 OpenAI 兼容 API 触发。虽无评论，但安全影响重大，应视为社区关注焦点。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 编号 | 问题描述 | 状态 |
|---|---|---|---|
| 安全 | [#5305](https://github.com/HKUDS/nanobot/issues/5305)、[#5306](https://github.com/HKUDS/nanobot/issues/5306) | `exec.allowPatterns` 可被链式 shell 命令绕过，导致未授权命令执行；可经 OpenAI 兼容 API 利用 | issue 开放，暂无对应 fix PR，需紧急评估 |
| P0 | [#5271](https://github.com/HKUDS/nanobot/pull/5271) | 后台任务（如 `maybe_generate_webui_title`）持有 Session 引用，用户在 await 窗口内执行 `/new` 后，旧任务保存会覆盖新会话数据 | fix PR 已提交但带 conflict 标签，需解决冲突 |
| 高 | [#5295](https://github.com/HKUDS/nanobot/issues/5295) | Docker Compose 部署 entrypoint 权限拒绝，容器无法启动 | issue 开放中，可能与 PR [#5313](https://github.com/HKUDS/nanobot/pull/5313)（MCP HTTP 连接清理）相关，待确认 |
| 中 | [#5311](https://github.com/HKUDS/nanobot/issues/5311) | Agnes AI（自定义 provider）将嵌套对象工具参数二次编码为 JSON 字符串，导致 MCP 工具调用 `-32602` 校验失败 | 今日新开，0 评论，暂无 fix |
| 中 | [#5303](https://github.com/HKUDS/nanobot/pull/5303) | Windows PowerShell 下裸 `curl` 被解析为 `Invoke-WebRequest` 别名，weather 技能首个命令可能失败 | fix PR 已提交待合并 |
| 中 | [#5302](https://github.com/HKUDS/nanobot/pull/5302) | Dream（记忆整合）运行使用通用 system-prompt 构造，会引用受限工具注册表之外的不可用工具 | fix PR 已提交待合并 |
| 中 | [#5309](https://github.com/HKUDS/nanobot/pull/5309) | Marketplace 将内置技能标记为已安装，导致同名工作区技能无法安装、install 按钮被禁用 | fix PR 已提交待合并 |
| 中 | [#5156](https://github.com/HKUDS/nanobot/pull/5156) | Telegram 轮询在网络抖动后静默停滞，进程存活但消息永久收不到，日志无任何输出 | 修复 PR 开放中；[#5301](https://github.com/HKUDS/nanobot/pull/5301) 先拆分出低风险可观测性部分（stdlib 日志桥接 + 仅记录 liveness 检查），待合并 |

## 6. 功能请求与路线图信号

- **Token 用量可观测性（大概率进入下一版本）**：[#5266](https://github.com/HKUDS/nanobot/issues/5266) 需求 + PR [#5299](https://github.com/HKUDS/nanobot/pull/5299)（通过 `TokenUsageHook` 持久化最近 50 条用量记录，新增 `GET /api/settings/usage/records?day=YYYY-MM-DD` 诊断接口，并暴露保留完整度）互相呼应，是当前最明确的路线图候选。
- **模型无关的计算机控制**[#4276](https://github.com/HKUDS/nanobot/pull/4276)：提供 `browser`（DOM 自动化，无需像素坐标）与 `computer_use`（截屏 + 键鼠控制，支持 PyAutoGUI/Puppeteer 后端）。已开放 2 个月，带 conflict 标签需要 rebase，方向贴合 Agent 落地场景。
- **Agent Plugins 生态整合** [#5288](https://github.com/HKUDS/nanobot/pull/5288)：将 Agent Plugins v1 与 CLI Apps 集成，使 `nanobot-dev/computer-use` 等保持独立插件，与 #4276 互补。
- **API 服务状态透明化** [#5255](https://github.com/HKUDS/nanobot/pull/5255)（Draft）：提出网关未启动 `nanobot serve` 时 WebUI 仍应展示真实 API 状态，并新增 `nanobot api status` 命令；目前是草稿且有冲突，需维护者明确方向。
- **GitAgent Protocol**[#4019](https://github.com/HKUDS/nanobot/pull/4019) 今日收尾，后续版本将支持 agent.yaml + SOUL.md 便携式智能体清单，有助于跨平台互操作。

## 7. 用户反馈摘要

- **Token 消耗焦虑（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）**：用户观察到"2 小时百万 tokens"级别的消耗且无明显用户活动，暗示存在隐性的后台调用/重试开销。13 条评论说明这是影响实际使用成本的普遍痛点，用户明确希望知道"何时、哪个调用产生了多少消耗"。
- **Docker 部署摩擦（[#5295](https://github.com/HKUDS/nanobot/issues/5295)）**：用户严格按文档操作仍失败，错误信息对新手不友好（entrypoint 权限问题），容器反复重启。该问题直接损害新用户的第一体验，文档与实际镜像权限配置需要对齐。
- **WebUI 功能认知需求**：从 [#5312](https://github.com/HKUDS/nanobot/pull/5312)、[#5308](https://github.com/HKUDS/nanobot/pull/5308) 的合入内容看，用户对 Temporary Chat、Skills 安装流程、HTTPS 语音输入存在理解门槛；维护者快速补齐文档与测试，说明社区反馈已被有效吸收。

## 8. 待处理积压

| 编号 | 类型 | 标题 | 开放时长 | 备注 |
|---|---|---|---|---|
| [#4276](https://github.com/HKUDS/nanobot/pull/4276) | PR（enhancement） | model-agnostic computer use（browser + computer_use 工具） | 2026-06-10 起（2 个月） | 功能吸引力大，但带 conflict 标签，需 rebase 后推进 |
| [#5156](https://github.com/HKUDS/nanobot/pull/5156) | PR（bug, p2） | Telegram 轮询静默停滞修复 | 2026-07-29 起（12 天） | 影响线上消息可靠性；建议优先合并其低风险先行 PR [#5301](https://github.com/HKUDS/nanobot/pull/5301) |
| [#5255](https://github.com/HKUDS/nanobot/pull/5255) | PR（Draft, conflict） | 外部托管 API 服务器状态展示 + `nanobot api status` | 2026-08-05 起（5 天） | 草稿 + 冲突，需要维护者明确是否接受该方向 |
| [#5271](https://github.com/HKUDS/nanobot/pull/5271) | PR（bug, p0, conflict） | 阻止过期后台任务保存覆盖会话数据 | 2026-08-06 起（4 天） | P0 级数据一致性修复，请维护者尽快处理冲突并合入 |
| [#5204](https://github.com/HKUDS/nanobot/pull/5204) | PR（refactor, p1） | Responses 提供商能力声明式重构（OpenAI/Copilot/DeepSeek） | 2026-08-01 起（9 天） | P1 重构，等待 review，无冲突 |

---

**报告总结**：NanoBot 项目活跃度健康，社区参与度高（安全报告、Docker 部署反馈、Token 消耗诉求均指向真实使用场景）。下一步维护者应优先处理：(1) `exec.allowPatterns` 安全绕过评估；(2) 解决 #5271 的 P0 冲突；(3) 推进 Token 可观测性 PR #5299 以回应社区最强烈的诉求。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时 Hermes Agent 保持极高活跃度：50 条 Issue 更新（新开/活跃 45、关闭 5）、50 条 PR 更新（待合并 40、已合并/关闭 10），无新版本发布。今日最重大事件是 [Issue #82842](https://github.com/NousResearch/hermes-agent/issues/82842)：Windows 上 agent 险些对 `C:\` 根目录执行 `rd /s /q`，仅因进程权限不足才避免灾难性数据丢失，对应修复 PR [#82932](https://github.com/NousResearch/hermes-agent/pull/82932) 已提交待合并。同时多笔 P2 级修复（Gemini 400 prefill、TUI 目标恢复、Kanban 恢复路径）被合入。总体来看，修复节奏能跟上问题报告速度，但终端安全边界与多租户隔离仍是当前最集中的风险敞口。

## 2. 项目进展

今日合并/关闭 10 个 PR（Top 20 中可见 6 个）：

- [PR #82930](https://github.com/NousResearch/hermes-agent/pull/82930) — fix(agent): keep thinking-prefill marker so drop pass can strip trailing stubs。修复 Gemini 等非回显 provider 上 thinking-only prefill 引发的 400 "Requests ending with a model turn"，对应 [Issue #75121](https://github.com/NousResearch/hermes-agent/issues/75121) 已关闭。这是对模型兼容层的实质加固。
- [PR #82927](https://github.com/NousResearch/hermes-agent/pull/82927) / [PR #82738](https://github.com/NousResearch/hermes-agent/pull/82738) — 两笔同题 PR 均关闭：压缩耗尽后恢复活跃 `/goal`，失败文本不再误送 goal judge、不消耗回合预算，改为一次有界继续回合（后者大概率被前者取代）。
- [PR #82914](https://github.com/NousResearch/hermes-agent/pull/82914) — fix(kanban): add audited operator recovery paths。看板新增 operator-only 的 reopen / recover-trial 路径，事务性拒绝依赖后代已推进的 reopen，并保留完整运行/事件历史，自动化编排可恢复性增强。
- [PR #62621](https://github.com/NousResearch/hermes-agent/pull/62621) — fix(test): mock launch_chrome_debug to prevent Chrome process leak，修复 browser.manage connect 测试每次运行泄漏真实 Chrome 进程的隐患。
- [PR #76029](https://github.com/NousResearch/hermes-agent/pull/76029) — fix(profiles): clean interrupted profile clones。profile 克隆改为私有暂存目录构建、完成后原子发布，中断不再残留半成品 profile。

这些合并在 agent 核心层、自动化编排、桌面/CLI 可靠性三个方向均有关键推进；在合并数量上，今日 10 笔关闭/合并在 50 条 PR 更新中占比 20%，处于健康区间。

## 3. 社区热点

- [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) — "Solving the Multi-Tenant Hermes Problem"，19 条评论 / 2 👍，今日讨论最热。作者称已 fork 核心并在生产环境运行数月，核心论点是**memory 操作完全绕过 hook 系统，不做 fork 就无法实现租户隔离**，标签带 `needs-decision`。叠加今日新开 [Issue #82936](https://github.com/NousResearch/hermes-agent/issues/82936)（multiplex_profiles 下默认 profile 的 secrets 泄漏进次级 profile 的 terminal 工具和 Kanban 子进程），多租户已从"不便"升级为"安全风险"。
- [Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457) — Persistent Session Memory with Cross-Session Search & Auto-Compression，18 条评论。会话记忆在重启后即丢失是高频痛点，社区要求跨会话搜索与自动压缩；与 [#76883](https://github.com/NousResearch/hermes-agent/issues/76883)（memory 变更可逆/可归档）共同指向 memory 子系统是当下最集中的功能诉求方向。
- [Issue #42961](https://github.com/NousResearch/hermes-agent/issues/42961) — terminal.cwd 配置被忽略，10 条评论。本地后端始终用进程 cwd 而非 `config.yaml` 指定路径，且被静默丢弃无任何日志，影响所有 CLI 重度用户的工作流确定性。
- [Issue #58437](https://github.com/NousResearch/hermes-agent/issues/58437) — MoA `_collect_stream` 在 quiet 模式丢弃 tool_calls 导致 `empty_response_exhausted` 崩溃，8 条评论，已关闭。quiet 模式（kanban worker、子 agent）是自动化场景主路径，此类问题对生产用户伤害最大。

## 4. Bug 与稳定性

按严重程度排列：

**严重（数据安全/安全边界）**
- [Issue #82842](https://github.com/NousResearch/hermes-agent/issues/82842)（Critical，新开）— Windows 上 agent 在用户批准的作用域删除后，执行 `rd /s /q` 指向 `C:\` 根目录，靠进程无 Administrator 权限才避免近全盘数据丢失。**已有修复 PR [#82932](https://github.com/NousResearch/hermes-agent/pull/82932)**（硬性守卫在人工执行前拒绝解析到文件系统根的递归 rd/rmdir），待合并。
- [Issue #82936](https://github.com/NousResearch/hermes-agent/issues/82936)（新开）— `gateway.multiplex_profiles` 下默认 profile 的 secrets 对次级 profile 的 terminal 工具及 Kanban worker 子进程可见，least-privilege 配置失效。

**高（P2，核心功能受损/阻塞）**
- [Issue #82874](https://github.com/NousResearch/hermes-agent/issues/82874)（新开）— 网关 SIGTERM 时同步 `shutdown_mcp_servers()` 在事件循环内 `future.result(timeout=15)` 阻塞，clean-exit 标记永不写入。
- [Issue #82846](https://github.com/NousResearch/hermes-agent/issues/82846)（新开）— smart-approval 辅助 LLM 调用无强制超时，provider 卡死会无限期挂死整个 agent 会话。
- [Issue #64155](https://github.com/NousResearch/hermes-agent/issues/64155) — 网关 SIGTERM 优雅关闭耗时 2-3 分钟致 systemd 超时强杀，持续近一个月无 fix。
- [Issue #82887](https://github.com/NousResearch/hermes-agent/issues/82887)（新开）— terminal 工具引用二进制可执行文件（如 `venv/bin/python3 script.py`）时触发 `embedded null character in path` 崩溃。
- [Issue #82875](https://github.com/NousResearch/hermes-agent/issues/82875)（新开）— `reasoning_effort` 对命名 `providers:` 端点在解析正确后、发送前被静默丢弃。
- [Issue #82903](https://github.com/NousResearch/hermes-agent/issues/82903)（新开）— gateway 中 `session_search` 工具忽略 `profile` 参数，总是硬注入默认根 profile 的 state.db。
- [Issue #82912](https://github.com/NousResearch/hermes-agent/issues/82912)（新开）— cron 任务 `enabled_toolsets: ["web","file"]` 时整个 web 工具集静默丢失，单独 `["web"]` 却正常。
- [Issue #82913](https://github.com/NousResearch/hermes-agent/issues/82913)（新开）— TUI 网关音频捕获请求崩溃：NumPy x86_64-v2 wheel 与旧 CPU 不兼容，异常未捕获导致整个网关退出。

**中（P3/平台特定/体验）**
- [Issue #78383](https://github.com/NousResearch/hermes-agent/issues/78383)（Windows/Feishu）— 带空格的 MEDIA 路径被投递两次，扩展名回退破坏去重。
- [Issue #78109](https://github.com/NousResearch/hermes-agent/issues/78109) — 桌面端 `@file:` 引用残留输入框，X 按钮、Esc、Ctrl+A 均无法清除。
- [Issue #70838](https://github.com/NousResearch/hermes-agent/issues/70838) — 硬性守卫对双引号内 `$(grep/rg/sort ...)` 良性命令误报为 malformed payload。**已有修复 PR [#70839](https://github.com/NousResearch/hermes-agent/pull/70839)**。
- [Issue #79336](https://github.com/NousResearch/hermes-agent/issues/79336) — godmode 拒绝检测只用 ASCII 撇号，漏掉 U+2019 弯引号，auto_jailbreak 误报模型合规。
- [Issue #58825](https://github.com/NousResearch/hermes-agent/issues/58825) — Windows 上 `hermes skills check` 因 CRLF/LF 哈希差异永远误报 update_available。
- [Issue #82851](https://github.com/NousResearch/hermes-agent/issues/82851)（新开）— Linux/Wayland 下 HUD setPosition 无效，窗口无法拖动。
- [Issue #79518](https://github.com/NousResearch/hermes-agent/issues/79518) — 桌面端隐藏标签栏后成死胡同：会话前台不可见、adoption 重新固定 hidden 标志。
- [Issue #82929](https://github.com/NousResearch/hermes-agent/issues/82929)（新开）— 桌面端 slash 命令自动补全缺少 `/model`、`/new`、`/config` 等内置命令。
- [Issue #82898](https://github.com/NousResearch/hermes-agent/issues/82898)（新开）— `hermes plugins list` 对正在使用的 memory provider 误报 "not enabled"。

**今日已关闭的 Bug**
- [#58437](https://github.com/NousResearch/hermes-agent/issues/58437) MoA 丢 tool_calls（已修复）
- [#75121](https://github.com/NousResearch/hermes-agent/issues/75121) Gemini thinking-only prefill 400（由 #82930 修复）
- [#82882](https://github.com/NousResearch/hermes-agent/issues/82882) `hermes update` 删除用户自有 skills（已关闭）

## 5. 功能请求与路线图信号

- **多租户/多用户隔离**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）— 19 评论、`needs-decision` 悬置，是路线图上最该优先决策的项。今日 [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) 的 secrets 串租户进一步证明这是安全级缺口而非体验增强。
- **持久化会话记忆**（[#8457](https://github.com/NousResearch/hermes-agent/issues/8457)）— 跨会话搜索 + 自动压缩，18 评论；与 [#76883](https://github.com/NousResearch/hermes-agent/issues/76883)（memory 变更可逆、本地归档）方向一致，memory 子系统正被社区系统性要求增强。
- **自主评估与自我改进引擎**（[#61644](https://github.com/NousResearch/hermes-agent/issues/61644)）— 直接引用官方 curator 文档"从不测试技能是否真的有效"，要求闭环验证，属路线图级诉求。
- **反说服/反谄媚护栏**（[#62738](https://github.com/NousResearch/hermes-agent/issues/62738)）— 跨 provider 报告模型出现 escalatory rhetoric 和 sycophancy 模式，需要系统级检测而非提示词修补。
- **已开工的功能 PR**：[#8245](https://github.com/NousResearch/hermes-agent/pull/8245) 原生 iMessage 适配器（4 月开启仍在排队）；[#75907](https://github.com/NousResearch/hermes-agent/pull/75907) dashboard 反代 Host 白名单 + auth 门控；[#82935](https://github.com/NousResearch/hermes-agent/pull/82935) Feishu 位置卡片消息归一化。若合并将直接扩充 gateway 平台覆盖和部署安全性。

## 6. 用户反馈摘要

- **多租户生产用户**（[#34352](https://github.com/NousResearch/hermes-agent/issues/34352)）："我们已在生产环境跑修复版好几个月"——情绪急迫，核心问题是 memory 操作绕过 hook，任何严肃多租户部署都必须 fork 主仓库，维护成本极高。
- **Windows 用户受损最重**：同一天内集中出现 CRLF 哈希误报（[#58825](https://github.com/NousResearch/hermes-agent/issues/58825)）、路径空格致附件重复投递（[#78383](https://github.com/NousResearch/hermes-agent/issues/78383)）、以及险些清空 C:\ 盘（[#82842](https://github.com/NousResearch/hermes-agent/issues/82842)）。Windows 平台的终端安全与兼容性是明显短板。
- **配置静默失效引发不信任**（[#42961](https://github.com/NousResearch/hermes-agent/issues/42961)、[#82878](https://github.com/NousResearch/hermes-agent/issues/82878)）：用户对"配置写了不生效、且无任何日志"的模式强烈不满，要求至少记录回退警告。
- **记忆丢失是最常见抱怨**（[#8457](https://github.com/NousResearch/hermes-agent/issues/8457)、[#76883](https://github.com/NousResearch/hermes-agent/issues/76883)）：会话结束/网关重启即丢上下文；删除不可逆不可审计，期望 memory 获得与 skills 相同的归档语义。
- **模型行为可信度**（[#62738](https://github.com/NousResearch/hermes-agent/issues/62738)、[#79336](https://github.com/NousResearch/hermes-agent/issues/79336)）：社区开始系统性报告模型谄媚/防御性话术，以及拒绝检测被弯引号绕过的现象，直接影响 godmode 等技能的可信度。

## 7. 待处理积压

以下为长时间未关闭、且今日仍在活跃的重要事项，建议维护者优先关注：

- [Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457)（2026-04-12 开启，18 评论）— 持久会话记忆，挂起 4 个月无 fix。
- [PR #8245](https://github.com/NousResearch/hermes-agent/pull/8245)（2026-04-12 开启）— 原生 iMessage 适配器，4 个月未合并。
- [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352)（2026-05-29 开启，19 评论）— 多租户问题，`needs-decision` 悬置超 2 个月。
- [Issue #42961](https://github.com/NousResearch/hermes-agent/issues/42961)（2026-06-09 开启，10 评论）— terminal.cwd 被忽略，CLI 基础行为缺陷。
- [Issue #64155](https://github.com/NousResearch/hermes-agent/issues/64155)（2026-07-14 开启）— 网关 SIGTERM 关闭慢，影响全部 systemd 用户，近 4 周无 fix PR。
- [Issue #61644](https://github.com/NousResearch/hermes-agent/issues/61644)（2026-07-09 开启）、[#62738](https://github.com/NousResearch/hermes-agent/issues/62738)（2026-07-11 开启）— 自我评估引擎与反谄媚护栏，路线图级功能，暂无 assignee。
- 另有一批 7 月中旬开启的大型修复 PR（[#62598](https://github.com/NousResearch/hermes-agent/pull/62598)、[#63292](https://github.com/NousResearch/hermes-agent/pull/63292)、[#65388](https://github.com/NousResearch/hermes-agent/pull/65388)）已近一个月未合并，涉及 [System:] 标记持久化、中断完成元数据化、卡死网关恢复，均属会话状态一致性的关键加固，建议加速 review。

---

**项目健康度小结**：今日数据呈现"高活跃、高压力"状态——bug 报告量大（含 1 个 Critical 安全事件），但修复 PR 跟进及时（#82842→#82932、#70838→#70839、#75121→#82930 均当日或隔日响应）。主要风险集中在 terminal 安全边界（Windows 尤其）、多租户隔离、以及一批长期未决的 P2 级 gateway 稳定性问题。若 #82932 与 #82936 相关修复能尽快合入，将显著降低当前最大的数据安全与隐私风险。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-08-10

## 1. 今日速览

项目保持活跃态势：过去 24 小时内有 3 条 Issue 更新、7 条 PR 更新，其中 5 条待合并、2 条已关闭/合并。社区贡献主要集中在三类工作上：一是由 SashaMIT 提交的系列 SSRF 安全加固 PR（#3322–#3324），针对微信、企业微信及通用渠道的媒体下载漏洞；二是 As-tsaqib 贡献的 Telegram 表格富消息渲染功能（Issue #3325 + PR #3327）；三是维护与构建修复（#3326）。今日无新版本发布，但多个安全修复与功能 PR 已进入待合并队列，预期下一版本将包含实质性的安全增强。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭/合并 PR

- **[#3326] fix(web): remove duplicate pnpm lock entries** `已关闭`  
  [https://github.com/sipeed/picoclaw/pull/3326](https://github.com/sipeed/picoclaw/pull/3326)
  修复 `web/frontend/pnpm-lock.yaml` 中重复的 `semver@7.8.5` 映射条目，解决了 `pnpm install --frozen-lockfile` 报错 `ERR_PNPM_BROKEN_LOCKFILE` 的问题。阻塞前端开发的构建障碍已清除。

- **[#2132] feat(config): support model-specific max_tokens and fix config key co…** `已关闭`  
  [https://github.com/sipeed/picoclaw/pull/2132](https://github.com/sipeed/picoclaw/pull/2132)
  该 PR 自 3 月 28 日创建，经过漫长的审查周期后于今日关闭。功能上支持模型级参数覆盖（`max_tokens`），并修复了配置查找键与运行时 ID 耦合的问题。虽然关闭原因未明确标注为合并，但该改动方向对多模型配置管理有实质价值。

### 待合并 PR（重点关注）

- **SSRF 安全加固系列（#3322 + #3323 + #3324，均为 OPEN）**  
  由 SashaMIT 提交的一组安全修复：  
  - [#3322] 阻止 OneBot/QQ/Telegram/Discord/LINE/Slack 等渠道入站媒体下载时的私有目标访问；  
  - [#3323] 企业微信媒体下载改用 `CreateSafeHTTPClient` + `ValidateSafeHTTPURL`；  
  - [#3324] 微信媒体下载同样应用上述安全客户端。
  这三个 PR 构成系统性 SSRF 防护，响应了此前安全审计暴露的媒体 URL 可回环到内网地址的隐患。若合并，将大幅提升多通道媒体处理的安全性。

- **[#3327] feat(telegram): render tables with native rich messages** `OPEN`  
  [https://github.com/sipeed/picoclaw/pull/3327](https://github.com/sipeed/picoclaw/pull/3327)
  配合 Issue #3325，将 Telegram 回复中的 GFM 表格和 HTML `<table>` 块渲染为 Bot API 的原生富消息，替代传统的等宽代码块降级方案。

---

## 4. 社区热点

- **#3203 [BUG] Matrix sync loop has no reconnection logic — silent death after network/server disruption**  
  [https://github.com/sipeed/picoclaw/issues/3203](https://github.com/sipeed/picoclaw/issues/3203)  
  评论 8 条，👍 2 个，是今日讨论最活跃的 Issue（已关闭）。用户 weissfl 报告：Matrix 通道 `/sync` 长轮询在网络中断或服务器重启后会永久死亡，且因为主进程仍存活，systemd 的 `Restart=on-failure` 无法自动拉起服务。这是一个典型的"静默故障"——服务看似在线，实际通道已失效。社区讨论集中在如何添加看门狗或心跳检测机制。

- **#3287 [Feature] Better support long messages in IRC**  
  [https://github.com/sipeed/picoclaw/issues/3287](https://github.com/sipeed/picoclaw/issues/3287)  
  评论 4 条。用户 superuser-does 提出 IRCv3 长消息被客户端按 512 字节自动拆分后，PicoClaw 应将其重组为一条完整消息，而不是当作多条独立消息处理。反映了多协议消息一致性的真实需求。

---

## 5. Bug 与稳定性

| 严重度 | Issue/PR | 状态 | 说明 |
|--------|----------|------|------|
| 高 | [#3203] Matrix sync loop 无重连逻辑 | Issue 已关闭 | 网络中断/服务器重启后同步永久静默死亡，systemd 无法感知。严重性高，但已关闭（推测为 stale 自动关闭），需确认是否已规划修复或将在下版本解决 |
| 高 | PR #3322/#3323/#3324 SSRF 加固 | 待合并 | 多个渠道的入站媒体下载存在 SSRF 风险，恶意 URL 可访问 loopback/私网地址。已有修复 PR 但尚未合并 |
| 中 | [#3326] pnpm lock 重复键 | 已修复 | 导致 `pnpm install --frozen-lockfile` 报错，阻碍 Web 前端开发与 CI |

---

## 6. 功能请求与路线图信号

- **Telegram 表格原生渲染** — Issue [#3325](https://github.com/sipeed/picoclaw/issues/3325) + PR [#3327](https://github.com/sipeed/picoclaw/pull/3327)  
  目前 Telegram 回复中的 Markdown/HTML 表格降级为纯文本或代码块，体验较差。新 PR 利用 Bot API 10.1 提供的富消息能力，自动检测 GFM/HTML 表格并替换为原生 UI。该 PR 由提出同一 Issue 的开发者直接实现，极大提升了从需求到落地的转化效率，**极有希望进入下一版本**。

- **IRC 长消息重组** — Issue [#3287](https://github.com/sipeed/picoclaw/issues/3287)  
  IRCv3 消息被客户端拆分为多段后，PicoClaw 应将其视为单一语义消息。需求明确，但目前仅有 Issue 讨论，暂无关联 PR。考虑到 IRC 是基础协议通道，该改进具备较高的通用价值。

- **模型级参数覆盖** — PR [#2132](https://github.com/sipeed/picoclaw/pull/2132)  
  该 PR 今日关闭，具体状态待确认（合并或超时）。若合并，则为不同模型单独配置 `max_tokens` 等参数的能力将落地，对多模型接入的灵活性有提升。

---

## 7. 用户反馈摘要

- **Matrix 通道稳定性是核心痛点**：用户 weissfl 在 #3203 中描述了"静默死亡"的完整场景——网络断开后，没有自动重连，且主进程存活导致守护机制失效。评论中其他用户可能也遇到了类似问题（8 条评论），反映出对长连接自带健康检查/自动恢复机制的强烈需求。

- **IRC 长消息处理期待语义化**：用户 superuser-does 在 #3287 中希望 PicoClaw 理解"被拆分的多段消息其实是一条完整消息"，而不是机械地按消息边界处理。这关系到下游处理（如用 LLM 理解上下文）是否准确，是体验细节上的真实打磨需求。

- **Telegram 表格体验升级诉求**：Issue #3325 直接引用 Telegram Bot API 10.1 新版能力，用户 As-tsaqib 对现有表格降级为代码块的效果不满意，希望借助原生富消息能力做视觉优化。该用户同时提交了 PR 实现，属于"自提自改"的积极贡献模式，值得项目组快速响应。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 积压时间 | 建议 |
|------|------|------|----------|------|
| PR | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | refactor(deltachat): cleanup implementation, documentation -200LOC | 自 2026-07-03 起已一个多月 | 重构类 PR，减少约 200 行代码，涉及删除遗留特性和密码配置。当前仍未合并，建议维护者安排 code review，避免长期偏离主线 |
| Issue | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | Better support long messages in IRC | 自 2026-07-22 起已有 4 条评论 | 功能需求明确，但至今无 PR 或计划回复。建议维护者明确是否接受该需求，并预估排期 |
| PR | [#2132](https://github.com/sipeed/picoclaw/pull/2132) | feat(config): support model-specific max_tokens... | 3 月 28 日创建，今日关闭 | 需确认关闭原因（合并 vs 拒绝 vs 过期）。若该功能仍被需要，建议关闭后建立新的后续任务跟踪 |

> 数据来源：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw) 数据快照时间：2026-08-10

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-08-10）

**数据窗口：** 2026-08-09 至 2026-08-10（GitHub 事件统计）

---

## 1. 今日速览

过去 24 小时 NanoClaw 处于高活跃但**合并停滞**的状态：新增 Issue 1 条、PR 更新 16 条（其中新建 11 条、历史 PR 更新 5 条），合并/关闭数为 0，版本发布为 0。代码产出集中分布在 CLI 结构化输入、频道层重构、容器安全修复、文档补全四个方向；核心团队同步提交了 Docker Hub 发布流水线和 CVE 修复，显示项目正在为更规范的发布周期做准备。全部 16 个 PR 停留在待合并状态，`0 merged / 0 closed` 意味着评审通道是当前最明显的瓶颈。唯一新 Issue（#3217）直指加固镜像缺少 pip 通道，是今日最具产品影响力的用户反馈。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 项目进展

**合并 / 关闭：** 今日 0 个 PR 被合并、0 个 Issue 被关闭。

**审查中重要 PR（16 条待合并）：**

| 类型 | PR | 说明 |
|---|---|---|
| 功能 | [#3218](https://github.com/qwibitai/nanoclaw/pull/3218) | 为 host/container 的 `ncl` 客户端新增 `--stdin-json` 受控输入模式，在不改动请求帧、守护进程分发器、命令注册表的前提下支持结构化参数 |
| 功能 | [#3208](https://github.com/qwibitai/nanoclaw/pull/3208) | 新增 Docker Hub 镜像发布 workflow（手动触发、仅 main 分支），并为既有 hardened-pin 校验附加 CVE 门禁 |
| 功能 | [#3041](https://github.com/qwibitai/nanoclaw/pull/3041) / [#3050](https://github.com/qwibitai/nanoclaw/pull/3050) | Dial 频道适配器（SMS + AI 语音）及 setup 向导集成（runChannelSkill 模型），频道生态扩展的正式设计落地 |
| 修复 | [#3207](https://github.com/qwibitai/nanoclaw/pull/3207) | 修复 agent 镜像中 `tar` 组件的 critical CVE（GHSA-23hp-3jrh-7fpw），同时升级底层 npm 与 pnpm 工具链 |
| 修复 | [#3209](https://github.com/qwibitai/nanoclaw/pull/3209) | Slack 粘贴的表格内容完整传递并呈递给 agent |
| 修复 | [#3215](https://github.com/qwibitai/nanoclaw/pull/3215) | 对 DM（直接消息）解析日志进行脱敏，避免敏感解析细节落入日志 |
| 重构 | [#3214](https://github.com/qwibitai/nanoclaw/pull/3214)、[#3213](https://github.com/qwibitai/nanoclaw/pull/3213)、[#3212](https://github.com/qwibitai/nanoclaw/pull/3212)、[#3186](https://github.com/qwibitai/nanoclaw/pull/3186) | 统一主机模块生命周期钩子、频道问题渲染器注册、DB 模块迁移注册表、skill-owned capabilities 的主机接缝——为多频道/技能生态夯实架构底座 |
| 文档 | [#3216](https://github.com/qwibitai/nanoclaw/pull/3216)、[#3211](https://github.com/qwibitai/nanoclaw/pull/3211)、[#3210](https://github.com/qwibitai/nanoclaw/pull/3210) | 补全加固镜像限制、技能单一职责集成规则、容器内附件落盘路径说明 |

**整体判断：** 代码产出在功能可用性（CLI/频道）、安全性（CVE 门禁、日志脱敏）、架构一致性（生命周期/渲染器/迁移注册）三个维度上均有实质推进；但所有成果滞留审查池，尚未转化为用户可感知的变更。

---

## 4. 社区热点

今日评论区几乎没有互动（各 Issue/PR 评论数均为 0），属于“提交密集、讨论平静”的一天。事件集中度揭示了两个隐性热点主题：

1. **加固镜像的 Python 包支持缺口（Issue #3217 + PR #3216）**  
   用户 stumpjumper 在 [#3217](https://github.com/qwibitai/nanoclaw/issues/3217) 报告 `install_packages` 没有 pip 通道，导致 Python 依赖无法走 derived-image 路径，从而无法采用加固预构建镜像。同作者还提交了文档 PR [#3216](https://github.com/qwibitai/nanoclaw/pull/3216) 先行说明限制。Issue 与 PR 配套出现，反映出用户发现问题后主动协助完善项目文档的良性贡献循环。

2. **Signal 附件修复的二次推进**  
   先前提交的附件修复 PR [#2529](https://github.com/qwibitai/nanoclaw/pull/2529)（5/18 开设）与 [#3142](https://github.com/qwibitai/nanoclaw/pull/3142)（7/27 开设）在 8 月 9 日同时获得更新。两条 PR 解决同一领域的附件丢失问题，暗示维护者可能正在集中重审该功能链。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | 问题描述 | 状态 |
|---|---|---|
| 🔴 Critical | agent 镜像内 `tar` 组件存在高危漏洞 GHSA-23hp-3jrh-7fpw（critical，fix available）：npm 10.9.8 自带 tar 7.5.11、pnpm 10.33.0 自带 tar 7.5.12，基础镜像 `node:22-slim` 的刷新无法单独清除 | 修复 PR [#3207](https://github.com/qwibitai/nanoclaw/pull/3207) 已提交，等待合并 |
| 🟠 High | `install_packages` 仅支持 `packages_apt` / `packages_npm`，无 Python 包通道，阻塞 Python 依赖场景下加固镜像的采用 | 已有关联文档 PR [#3216](https://github.com/qwibitai/nanoclaw/pull/3216) 明确限制；尚无实现性 PR |
| 🟡 Medium | Signal 适配器非图片/音频附件（PDF、文本、文档）被拼接进一个容器内不存在的 `/workspace/extra/signal-attachments/<id>` 路径，Read 工具无法读取（[#3142](https://github.com/qwibitai/nanoclaw/pull/3142)）；此前 [#2529](https://github.com/qwibitai/nanoclaw/pull/2529) 已在处理同类“直接丢弃附件”问题（close #2528） | 两条修复 PR 均待合并 |
| 🟢 Low | Slack 粘贴的表格无法被 agent 感知（[#3209](https://github.com/qwibitai/nanoclaw/pull/3209)）；DM 解析日志可能泄露内部频道解析信息（[#3215](https://github.com/qwibitai/nanoclaw/pull/3215)） | 修复 PR 均已提交 |

---

## 6. 功能请求与路线图信号

- **pip 通道（Issue [#3217](https://github.com/qwibitai/nanoclaw/issues/3217)）**  
  用户明确提出功能缺口。结合当前加固镜像路线图（#3207/3208 正在推进镜像安全与发布门禁），pip 通道很可能是加固方案的下一块拼图——先由 #3216 文档明确边界，后续大概率有实现 PR 跟进。

- **Docker Hub 发布流水线（PR [#3208](https://github.com/qwibitai/nanoclaw/pull/3208)）**  
  核心团队将“发布 agent 镜像到 Docker Hub + CVE 门禁”以 workflow 形式固化，预示版本发布将走向自动化与规范化，可能为下一个正式版本做准备。

- **Dial 频道适配（PR [#3041](https://github.com/qwibitai/nanoclaw/pull/3041) + [#3050](https://github.com/qwibitai/nanoclaw/pull/3050)）**  
  一旦合并，NanoClaw 将获得与 Slack/Signal 平级的 SMS + AI 语音频道，且 setup 向导纳入 runChannelSkill 模型，属完整的产品级频道扩展，指向“多频道 + 可配置技能”的路线图方向。

- **CLI 结构化输入（PR [#3218](https://github.com/qwibitai/nanoclaw/pull/3218)）**  
  `--stdin-json` 为脚本化/自动化调用 NanoClaw 打开新用例（CI 集成、批处理操作等），预计会成为下一版本 CLI 的能力亮点。

---

## 7. 用户反馈摘要

今日各 Issue/PR 评论区均为 0 条，没有可直接引用的评论反馈。唯一直接用户反馈来自 Issue [#3217](https://github.com/qwibitai/nanoclaw/issues/3217)：

- **使用场景**：通过 `install_packages` / `container_configs` 为 agent 安装 Python 工具链，希望走 derived-image 路径。
- **痛点**：当前模型仅定义 `packages_apt` 和 `packages_npm`，Python 包无通道可走，导致无法采用 hardened 预构建镜像。
- **期望**：为 `install_packages` 增加 `packages_pip`（Python 包）通道，使 Python 依赖安装同样能进入镜像加固链路。

该 Issue 目前 0 评论、0 👍，尚未获得广泛社区注意，但牵涉镜像安全、包管理、Agent 可移植性多个产品面，建议维护者优先回复。

其余用户诉求可从 PR 标题侧写还原：Signal 附件静默丢失、Slack 粘贴表格不可见、DM 日志泄漏风险、加固镜像文档与实践的错位——这些均来自真实使用中被观察到的失败模式，共同指向“多频道消息内容完整性”和“安全可观测性”是用户侧高频需求。

---

## 8. 待处理积压

以下 PR 开设时间较长或近期有明显推进，请维护者优先安排 review/merge：

| PR | 开设时间 | 待处理时长（截至 2026-08-10） | 备注 |
|---|---|---|---|
| [#2529](https://github.com/qwibitai/nanoclaw/pull/2529) — Signal 附件传递修复 | 2026-05-18 | **约 84 天** | 关闭 #2528；8/9 有更新，长期悬置 |
| [#3041](https://github.com/qwibitai/nanoclaw/pull/3041) — Dial 频道适配器 | 2026-07-14 | 约 27 天 | 与 #3050 联动；8/9 有更新 |
| [#3050](https://github.com/qwibitai/nanoclaw/pull/3050) — Dial 频道向导 | 2026-07-14 | 约 27 天 | 与 #3041 联动；8/9 有更新 |
| [#3142](https://github.com/qwibitai/nanoclaw/pull/3142) — Signal 附件路径修复 | 2026-07-27 | 约 14 天 | 与 #2529 同领域，建议合并审阅 |
| [#3186](https://github.com/qwibitai/nanoclaw/pull/3186) — host seams for skill-owned capabilities | 2026-08-04 | 约 6 天 | 架构重构基础，8/9 有更新 |

**特别提醒：** Signal 附件问题两条 PR（#2529、#3142）合计悬置近 3 个月，用户侧附件丢失问题在此期间持续存在。建议将二者合并审阅后一并合入，避免同一故障反复以不同形式提交。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-10

数据来源：github.com/nearai/ironclaw

## 1. 今日速览

过去 24 小时项目保持高强度运转：25 条 Issue 更新中有 18 条处于新开/活跃、7 条关闭；38 条 PR 更新中有 30 条待合并、8 条已合并或关闭；无新版本发布。今日动态集中在三个方向：工具发现/检索架构升级（[#7405](https://github.com/nearai/ironclaw/issues/7405) / [#7409](https://github.com/nearai/ironclaw/pull/7409) / [#7410](https://github.com/nearai/ironclaw/pull/7410) / [#7411](https://github.com/nearai/ironclaw/pull/7411)）、通知渠道的 web-push 与 Slack/Telegram presence 改造（[#7398](https://github.com/nearai/ironclaw/pull/7398) / [#7397](https://github.com/nearai/ironclaw/pull/7397)），以及 main 分支 CI 反复失败（[#6463](https://github.com/nearai/ironclaw/issues/6463) / [#7413](https://github.com/nearai/ironclaw/issues/7413)）。值得警惕的是，稳定版 1.1.0 被外部用户报告存在一个 100% 可复现的高严重度 Bug（[#7400](https://github.com/nearai/ironclaw/issues/7400)），所幸已有对应修复 PR [#7401](https://github.com/nearai/ironclaw/pull/7401) 在途。整体项目健康度良好，但 CI 稳定性与多个 P2 级 QA 回归仍需持续投入。

## 2. 版本发布

无（过去 24 小时无新 Release）。

## 3. 项目进展

数据快照未逐一列出当日被合并/关闭的 8 条 PR，因此这里以已关闭 Issue + 活跃 PR 方向做定性盘点。

**已关闭 Issue（多为 QA 验证的修复收尾）：**

- [#5522](https://github.com/nearai/ironclaw/issues/5522)（closed）Reborn 例程无法读取 Slack DM 且陷入 `capability_info` 重试循环——Slack 能力缺口已处理。
- [#7292](https://github.com/nearai/ironclaw/issues/7292)（closed，P1）已安装工具无法使用 + runner heartbeat 报错——工具安装/执行链路的重要修复。
- [#5552](https://github.com/nearai/ironclaw/issues/5552)（closed）多工具失败后仅给“无效结果”的笼统错误。
- [#5509](https://github.com/nearai/ironclaw/issues/5509)（closed）聊天创建延迟随历史会话累积增长。
- [#5510](https://github.com/nearai/ironclaw/issues/5510)（closed，P3）无法删除旧例程。
- [#4341](https://github.com/nearai/ironclaw/issues/4341) / [#4344](https://github.com/nearai/ironclaw/issues/4344)（closed）Qwen3.6-35B 下的思考链暴露与消息镜像问题。

**活跃 PR 揭示的核心推进方向：**

- **工具发现/检索走向生产化**：[#7411](https://github.com/nearai/ironclaw/pull/7411) 将延迟工具检索做成可替换 provider；[#7410](https://github.com/nearai/ironclaw/pull/7410) 对匹配结果返回 bounded 完整签名；[#7409](https://github.com/nearai/ironclaw/pull/7409) 建立 100/500/1000 工具规模的检索质量基线。三步构成 [#7405](https://github.com/nearai/ironclaw/issues/7405) 的落地路径。
- **第一方通知渠道扩展**：[#7398](https://github.com/nearai/ironclaw/pull/7398) 将 Web 应用变为 selectable 通知渠道（web-push + PWA），对齐 Slack/Telegram；[#7397](https://github.com/nearai/ironclaw/pull/7397) 引入 Slack/Telegram presence 频道与按 ping 生成临时线程，并删除 owner-vs-actor 概念。
- **Responses API 加固**：[#7401](https://github.com/nearai/ironclaw/pull/7401) 在创建线程/run 前即拒绝 `stream:true` + 外部 `tools[]` 组合，直接指向对 [#7400](https://github.com/nearai/ironclaw/issues/7400) 的修复。
- **WebUI 重构**：[#7338](https://github.com/nearai/ironclaw/pull/7338)（自动化投递目标选择）、[#7337](https://github.com/nearai/ironclaw/pull/7337)（共享文件选择器）、[#7335](https://github.com/nearai/ironclaw/pull/7335)（Logs 工具条复用 SelectMenu）、[#7341](https://github.com/nearai/ironclaw/pull/7341)（附件读取与 SSE 测试恢复）。

整体来看，项目正在为 v1.2.0 铺路，核心是“渐进式工具披露生产化 + 多通道通知能力扩展”。

## 4. 社区热点

- **[#5522](https://github.com/nearai/ironclaw/issues/5522)（closed，4 条评论）**：过去 24 小时评论最密集的 Issue。Reborn 例程因缺少 Slack DM 读取能力而失败，并陷入 `capability_info` 重试循环。背后诉求是 Slack DM 作为自动化输入源的真实需求，以及“能力缺失时应优雅降级而非死循环”的系统行为。
- **[#7400](https://github.com/nearai/ironclaw/issues/7400)（2 条评论，高严重度）**：外部用户报告 `stream:true` + 调用方 `tools[]` 在 `/api/v1/responses` 上必现中断，且留下永久无法删除的僵尸线程；影响 1.1.0-rc.1 和 1.1.0 稳定版。配套修复 PR [#7401](https://github.com/nearai/ironclaw/pull/7401) 已快速响应。
- **[#7405](https://github.com/nearai/ironclaw/issues/7405) / [#7407](https://github.com/nearai/ironclaw/issues/7407)（各 2 条评论）**：分别讨论“工具搜索返回完整签名 + namespace 级目录预览”和“BatchPolicy::Parallel 真正并发执行”。核心诉求都是减少大工具规模下的模型轮次与端到端延迟。
- **[#7398](https://github.com/nearai/ironclaw/pull/7398) / [#7397](https://github.com/nearai/ironclaw/pull/7397)**：两个 XL 级 PR 在今日均有更新，前者做浏览器推送/PWA，后者重构 Slack/Telegram 渠道模型。反映出社区对“Web 作为一等通知目的地”和“渠道语义清晰化”的明确兴趣。

## 5. Bug 与稳定性

**高严重度**

- [#7400](https://github.com/nearai/ironclaw/issues/7400)：Responses API 流式请求 + 外部工具导致中途失败并遗留“zombie”线程，影响 1.1.0-rc.1 与 1.1.0 稳定版，复现率 100%。修复 PR [#7401](https://github.com/nearai/ironclaw/pull/7401) 已在审查，尚未合并。

**P1（已关闭）**

- [#7292](https://github.com/nearai/ironclaw/issues/7292)：安装 CoinGecko 工具后无法使用、runner heartbeat 报错，今日已关闭。

**P2（开放中，共 9 条）**

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#7346](https://github.com/nearai/ironclaw/issues/7346) | Emoji 短代码显示为纯文本，聊天渲染回归 | 开放 |
| [#7348](https://github.com/nearai/ironclaw/issues/7348) | 活动块与助手进度消息顺序错乱，时间线混乱 | 开放 |
| [#7349](https://github.com/nearai/ironclaw/issues/7349) | 刷新页面后部分运行历史与 Activity 时间线消失 | 开放 |
| [#7345](https://github.com/nearai/ironclaw/issues/7345) | Agent 报告 61 个自动化、UI 只显示 50 个，计数不一致 | 开放 |
| [#5882](https://github.com/nearai/ironclaw/issues/5882) | 反复 Slack 重连后认证流进入永久 Waiting 状态，只能重装扩展 | 开放 |
| [#5878](https://github.com/nearai/ironclaw/issues/5878) | GitHub token 被吊销后报“工具输入无法编码”等误导性错误 | 开放 |
| [#6479](https://github.com/nearai/ironclaw/issues/6479) | 例程可在例程内创建例程，存在自我复制/无限调度风险 | 开放 |
| [#6046](https://github.com/nearai/ironclaw/issues/6046) | 简单 email-to-sheet 任务触发 124 次工具调用，效率异常 | 开放 |
| [#5551](https://github.com/nearai/ironclaw/issues/5551) | Slack 自动化把中间进度消息发送到频道，而非最终结果 | 开放 |

**CI / 运维**

- [#7413](https://github.com/nearai/ironclaw/issues/7413)（今日新建）与 [#6463](https://github.com/nearai/ironclaw/issues/6463) 并行存在，均指向 main 分支 CI 持续失败，已成为明确的运营风险信号。

**相关修复/加固 PR（在途）**：[#7401](https://github.com/nearai/ironclaw/pull/7401)（Responses API 拒绝非法组合）、[#7341](https://github.com/nearai/ironclaw/pull/7341)（WebUI 附件读取与 SSE 测试）、[#7395](https://github.com/nearai/ironclaw/pull/7395)（outbound send-claim TOCTOU 竞态）、[#7028](https://github.com/nearai/ironclaw/pull/7028)（恢复期间保留终态）、[#7048](https://github.com/nearai/ironclaw/pull/7048)（Wasm 诊断信息清理）等。

## 6. 功能请求与路线图信号

- **[#7183](https://github.com/nearai/ironclaw/issues/7183)：按用户选择 LLM 模型。** 目前模型选择仅管理员可控；来自 IronClaw Champions 周会的用户代表反馈，团队工作区需要普通成员自行切换模型。产品路线权重较高。
- **[#7405](https://github.com/nearai/ironclaw/issues/7405)：工具发现增强。** 完整签名 + namespace 感知目录预览。[#7409](https://github.com/nearai/ironclaw/pull/7409)、[#7410](https://github.com/nearai/ironclaw/pull/7410)、[#7411](https://github.com/nearai/ironclaw/pull/7411) 已形成“基线 → 签名 → 可插拔 provider”的实现链，预计进入 v1.2.0。
- **[#7407](https://github.com/nearai/ironclaw/issues/7407)：并发能力批次执行。** 让已计算出的 `BatchPolicy::Parallel` 在 `invoke_capability_batch` 中真正并发（有界），将直接改善多工具调用时延。
- **[#7360](https://github.com/nearai/ironclaw/issues/7360)：压力覆盖扩展。** 将内置能力与持久化写路径纳入 nightly 压力测试，防止回归漏网。
- **[#7392](https://github.com/nearai/ironclaw/issues/7392)（epic）：用 pinned omp 工具面替换第一方编码工具。** 实验性质，尝试与外部契约对齐，降低自维护成本。
- **[#7166](https://github.com/nearai/ironclaw/issues/7166)（epic，v1.2.0）：工具披露 follow-up。** 在渐进式工具披露成为 Reborn 默认后，继续收尾签名完整性、目录可见性与大规模检索质量。

## 7. 用户反馈摘要

- **QA 测试人员（joe-rlo）** 集中反馈了一批“显示层 / 状态一致性”问题：emoji 不渲染、Activity 时间线错乱、刷新后历史丢失、自动化计数不一致。说明 WebUI 在长会话、多工具场景下的前端状态同步仍是最大痛点。
- **外部用户（cuongdcdev）** 对稳定版 1.1.0 给出高严重度反馈：流式请求与外部工具组合必然中断，且留下无法清理的僵尸线程；用户明确标注“100% 复现”，说明该问题在发布前未被兜住。
- **Champions 周会用户代表（sergeiest）** 指出模型选择权被锁在管理员侧，普通用户无法按需切换；作为正式用户代表渠道提出的诉求，具备产品决策参考价值。
- **Slack/GitHub 集成类反馈**（[#5882](https://github.com/nearai/ironclaw/issues/5882)、[#5878](https://github.com/nearai/ironclaw/issues/5878)、[#5551](https://github.com/nearai/ironclaw/issues/5551)、[#5522](https://github.com/nearai/ironclaw/issues/5522)）集中反映第三方授权、重连、回调体验脆弱：失败时用户缺少可执行的恢复路径，往往只能重装扩展或手动清理状态。

## 8. 待处理积压

- **CI 长期不绿**：[#6463](https://github.com/nearai/ironclaw/issues/6463) “Keep CI Green”自 2026-07-22 开放，且今日新增 [#7413](https://github.com/nearai/ironclaw/issues/7413) “Fix main branch CI failures”。建议优先处置，否则持续影响贡献者门槛与发布节奏。
- **7 月遗留的 P2 QA 问题**（创建于 7 月 2 日至 7 月 22 日，至今未关闭）：
  - [#5551](https://github.com/nearai/ironclaw/issues/5551)（07/02）Slack 发送中间进度消息
  - [#6046](https://github.com/nearai/ironclaw/issues/6046)（07/13）email-to-sheet 124 次工具调用
  - [#5878](https://github.com/nearai/ironclaw/issues/5878)（07/09）GitHub token 吊销误导报错
  - [#5882](https://github.com/nearai/ironclaw/issues/5882)（07/09）Slack 重连认证卡死
  - [#6479](https://github.com/nearai/ironclaw/issues/6479)（07/22）例程自复制风险
- **长期未合并 PR**：[#5101](https://github.com/nearai/ironclaw/pull/5101)（2026-06-20 创建，新贡献者，cargo-component 安装器复用）已存在近两个月，建议维护者明确反馈或接手，避免贡献者流失。
- **theredspoon 的 PR 积压**：该贡献者自 8 月 3 日至 8 月 8 日提交了一批 outbound/network/wasm/ci 加固 PR（[#7028](https://github.com/nearai/ironclaw/pull/7028)、[#7048](https://github.com/nearai/ironclaw/pull/7048)、[#7034](https://github.com/nearai/ironclaw/pull/7034)、[#7027](https://github.com/nearai/ironclaw/pull/7027)、[#7063](https://github.com/nearai/ironclaw/pull/7063)、[#7395](https://github.com/nearai/ironclaw/pull/7395)、[#7352](https://github.com/nearai/ironclaw/pull/7352)），多数标注 low risk 且带回归测试；长期不合并会显著推高 merge cost，也打击新贡献者积极性。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-08-10）

## 今日速览

过去 24 小时项目活跃度中等偏下：共更新 2 条 Issue（新开/活跃 1，关闭 1）和 10 条 PR（待合并 3，关闭/合并 7），无新版本发布。新提交的 PR #2454 与新建 Issue #2453 体现了社区对运行稳定性和自定义模型兼容性的持续关注；但今日大量 PR/Issue 活动来自 stale bot 自动清理，4 月积压的多条 PR 被关闭，需维护者评估是否有价值工作被误清理。

## 项目进展

今日没有新合并的功能性 PR。更新的 10 条 PR 中有 7 条被标记为 stale 并关闭（#1247、#1249、#1252、#1256、#1257、#1258、#1259），均创建于 2026 年 4 月，并非真正合并。它们原本包含以下改进：

- **#1247**：修复 OpenClaw 在 provider 限制后的模型切换恢复逻辑，涉及 `app_config` 变更检测与 model.primary 下发。
- **#1249**：修复 Cowork 会话中 DiffView 无法渲染的问题，扩大 Edit 工具名匹配范围。
- **#1252 / #1258**：定时任务表单增加未保存修改的二次确认弹窗，两个 PR 功能重叠。
- **#1256**：定时任务执行时间支持自然语言输入并自动转换为 cron。
- **#1257**：补全中英文 i18n 中缺失的 `edit` / `delete` 翻译键。
- **#1259**：优化 OpenClaw gateway 打包与依赖处理，增加 stub 包与 chalk 兼容补丁。

这些 PR 被自动关闭，不代表对应功能已合入主线。如果仍有价值，需要维护者重新打开或基于最新代码重新提交。

唯一的新 PR 是 **#2454**，修复 tool-loop guard 误杀合法轮询的问题，目前处于待合并状态。

- https://github.com/netease-youdao/LobsterAI/pull/1247
- https://github.com/netease-youdao/LobsterAI/pull/1249
- https://github.com/netease-youdao/LobsterAI/pull/1252
- https://github.com/netease-youdao/LobsterAI/pull/1256
- https://github.com/netease-youdao/LobsterAI/pull/1257
- https://github.com/netease-youdao/LobsterAI/pull/1258
- https://github.com/netease-youdao/LobsterAI/pull/1259
- https://github.com/netease-youdao/LobsterAI/pull/2454

## 社区热点

今日讨论最集中的是 **Issue #2453**：用户切换自定义模型（如 `custom_1/openai/gpt-oss-20b:free`）时，系统按 `provider/model` 解析并误判为不许可，影响 OpenRouter 免费模型和 NVIDIA 模型的使用。用户反馈“在一个线程里面切换模型尤其打扰”，而新建线程沿用同一模型则正常。该问题直指模型切换上下文中 provider 校验逻辑过于粗糙。

另一个值得关注的是 **PR #2454**：修复 OpenClaw 的 tool-loop guard 将合法轮询操作误判为死循环并终止的问题。该 PR 虽暂无评论，但直接关系到自动化任务的稳定性，具有较高修复价值。

此外，**Issue #1243**（网关频繁重启）虽今日被 stale 关闭，但仍有 2 条评论，背后用户对“AI 引擎正在启动网关...”弹窗频繁打断工作表达了强烈不满。

- https://github.com/netease-youdao/LobsterAI/issues/2453
- https://github.com/netease-youdao/LobsterAI/pull/2454
- https://github.com/netease-youdao/LobsterAI/issues/1243

## Bug 与稳定性

按严重程度排列：

1. **网关频繁重启（严重）**  
   Issue #1243：`qwen-portal-auth` 插件配置持续自动变更，触发 OpenClaw 网关每 5-20 分钟重启一次，并弹出 “AI 引擎正在启动网关...” 提示。该 Issue 今日被 stale 关闭，但问题本身可能尚未修复，且无关联 fix PR。  
   https://github.com/netease-youdao/LobsterAI/issues/1243

2. **自定义模型被误判为不许可（中等）**  
   Issue #2453：模型标识中包含 `openai` 等关键字时被错误解析为 provider 不认可，影响免费模型/NVIDIA 模型切换。暂无修复 PR。  
   https://github.com/netease-youdao/LobsterAI/issues/2453

3. **tool-loop guard 误杀合法轮询（待修复）**  
   PR #2454：修复 OpenClaw 的 tool-loop guard 将合法 polling 操作判定为死循环并终止的问题。说明当前版本存在相关稳定性缺陷，修复已提交但尚未合并。  
   https://github.com/netease-youdao/LobsterAI/pull/2454

此外，今日被 stale 关闭的多个历史 PR 也包含 bug 修复内容，若未合并则对应问题可能仍存在于最新版本中。

## 功能请求与路线图信号

- **自定义模型/provider 解析增强**（#2453）：用户希望自定义模型 ID 能被智能识别，不因包含特定关键字被误判。这是外部模型接入体验的关键改进，可能被纳入下版本模型配置模块。
- **定时任务自然语言配置**（#1256）：该 PR 虽被 stale 关闭，但自然语言转 cron 是明确的产品需求方向，未来或重新提交。
- **表单未保存保护机制**（#1252 / #1258）：两个 PR 同时实现同一功能，说明需求有共识，但也反映贡献者协作流程需要优化。
- **CI 依赖升级**（#1275 / #1276）：dependabot 提交的 `actions/stale` 与 `actions/first-interaction` 升级已积压 4 个月，长期不合并会影响 CI 维护。

## 用户反馈摘要

- **配置不稳定导致服务中断**：用户反馈配置任意模型后，`qwen-portal-auth` 插件配置循环写入导致网关每 5-20 分钟重启，弹窗“AI 引擎正在启动网关...”严重打断正常使用。用户期望配置稳定、无感。
- **自定义模型兼容性差**：使用 OpenRouter 免费模型和 NVIDIA 模型时，切换模型会被系统判定为不许可，尤其在线程内切换时体验更差；新建线程沿用同一模型则正常。用户希望 provider 校验能正确识别自定义模型前缀。

整体来看，用户对 LobsterAI 的模型接入灵活性和长时间运行稳定性有较高期待，当前这两方面的反馈偏负面。

## 待处理积压

需维护者重点关注：

- **#1243（严重 Bug，已被 stale 关闭但可能未修复）**：建议重新打开并确认是否已在新版本中修复。  
  https://github.com/netease-youdao/LobsterAI/issues/1243

- **#2454（新 PR，等待审查）**：tool-loop guard 修复对稳定性有直接帮助，应尽快安排 code review。  
  https://github.com/netease-youdao/LobsterAI/pull/2454

- **#2453（新 Issue，等待官方响应）**：自定义模型误判问题需要确认是否为已知限制，并提供临时 workaround。  
  https://github.com/netease-youdao/LobsterAI/issues/2453

- **#1275 / #1276（dependabot PR 积压）**：CI 依赖升级已搁置 4 个月，建议集中处理。  
  https://github.com/netease-youdao/LobsterAI/pull/1275  
  https://github.com/netease-youdao/LobsterAI/pull/1276

- **一批 4 月 stale PR（#1247 等）**：若其中功能仍被需要，建议维护者主动重新打开或同步更新，避免有价值的工作被机器人清理。  
  https://github.com/netease-youdao/LobsterAI/pull/1247

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-10

## 今日速览

Moltis 项目在过去 24 小时活跃度中等偏低：新增/活跃 Issues 2 条，新增待合并 PR 1 条，无版本发布。两项新 Issue 均为 Bug 报告（Apple Container 沙箱状态误判、Heartbeat 设置 UI 静默重置字段），分别触及核心容器功能与配置管理可靠性。待合并的 PR #1186 针对 vault 恢复短语哈希前的规范化问题，属于安全性与易用性修复。整体来看，项目当前处于维稳与细节打磨阶段，尚无新功能合并信号，社区讨论热度较低但问题指向明确。

## 版本发布

今日无新版本发布。

## 项目进展

今日无已合并/关闭的 PR，但有一项重要修复正在等待合并：

- **PR #1186** — [fix(vault): normalize recovery phrase before hashing](https://github.com/moltis-org/moltis/pull/1186)（作者：pxmpsdev，2026-08-09）

  该 PR 修复了 vault 恢复短语哈希计算前的规范化问题：此前 `derive_recovery_kek` 在派生 KEK 前对短语做了去除短横线、转换为大写等规范化处理（已有 `recovery_key_case_insensitive` 覆盖验证），但存储哈希时使用的是原始短语，导致用户以全小写或含短横线的形式输入时可能产生哈希不一致。该修复统一了派生与存储两条路径的输入处理，提升了 vault 解锁的容错性和一致性。

  这一 PR 虽未合并，但表明项目正在持续改进数据安全与密钥管理路径的健壮性，整体方向是让恢复流程对用户输入更宽容、更可靠。

## 社区热点

今日 Issues/PRs 均为 0 评论、0 点赞，社区讨论热度较低，无明显聚合热点。但两条 Issue 均为实际使用中暴露的问题，反映了用户在特定场景下的真实痛点：

- [Issue #1185 — Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)（作者：mikz，2026-08-08）：用户报告 Apple Container 1.x 沙箱实际已启动，但 Moltis 认为其未运行。该问题可能影响依赖容器状态判断的自动化流程或 UI 展示，涉及 macOS 环境下的核心容器管理功能。

- [Issue #1187 — Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)（作者：IlyaBizyaev，2026-08-09）：用户发现 Heartbeat 设置界面在保存时，表单中未展示的字段被静默重置，存在配置丢失风险。

虽然缺少评论互动，但这两个问题的提出本身即构成社区信号：用户需要更强的容器状态一致性和配置管理的可预期性。

## Bug 与稳定性

今日共报告 2 条 Bug，无新增崩溃或回归类问题。按严重程度排序如下：

1. **[Issue #1185 — Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)**（严重程度：高）

   Moltis 对 Apple Container 1.x 沙箱运行状态的判断与实际情况不一致，可能导致用户无法正常使用沙箱功能，或触发错误的后续操作（如重复启动、错误告警）。目前无关联 fix PR。

2. **[Issue #1187 — Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)**（严重程度：中高）

   Heartbeat 设置保存时静默覆盖表单未包含的字段，用户配置可能未经明确确认即被重置，存在数据丢失与预期外行为风险。该问题影响配置管理可靠性，目前亦无关联 fix PR。

此外，待合并的 **PR #1186** 修复的 vault 恢复短语哈希问题，涉及密钥派生一致性，若长期不合并可能继续造成用户解锁失败，值得优先关注。

## 功能请求与路线图信号

今日无明确的功能请求 Issue。但从现有动态可捕捉以下路线图信号：

- **更宽容的密钥恢复流程**：PR #1186 对恢复短语输入做规范化处理（去除短横线、统一大小写），暗示项目团队有意降低用户操作摩擦，未来或许会在恢复/备份流程中引入更多容错机制。
- **配置管理的可预期性**：Issue #1187 暴露了设置界面字段覆盖问题，后续版本可能会引入"表单完整性校验"或"未展示字段保护机制"，避免静默重置。
- **容器状态同步优化**：Issue #1185 反映了沙箱状态检测的盲区，未来可能需要补充更多容器运行时的状态探测逻辑（如通过 Container API 主动查询而非依赖推断）。

## 用户反馈摘要

今日无 Issues 评论，但两条 Bug 报告本身提供了有价值的用户侧信息：

- **Apple Container 用户**（Issue #1185）：用户实际在 macOS 环境下使用 Apple Container 1.x 沙箱，并依赖 Moltis 的状态反馈。状态误判意味着 UI 展示与底层真实状态脱节，用户可能因此无法信任 Moltis 对容器的管理能力，属于可用性层面的信任损伤。
- **Heartbeat 设置用户**（Issue #1187）：用户在配置 Heartbeat 时遇到字段被静默重置，且提交者已预检现有 issues 并确认未重复报告，说明该问题具有被细致描述的价值。用户诉求是：配置保存应当完整、透明，不得丢失表单之外的字段。

总体而言，用户对 Moltis 的期待是：底层功能（容器管理、密钥恢复）需要准确、可靠，上层配置界面需要可预期、不丢数据。

## 待处理积压

目前没有长期未响应的旧 Issue 或 PR，但以下事项需要维护者优先关注：

1. **PR #1186 等待合并**（[链接](https://github.com/moltis-org/moltis/pull/1186)，创建 2026-08-09）：修复 vault 恢复短语哈希不一致问题，安全性相关，建议尽快 review 并合并。
2. **Issue #1185 尚未分类/修复**（[链接](https://github.com/moltis-org/moltis/issues/1185)，更新于 2026-08-09）：Apple Container 沙箱状态误判，影响核心功能，建议标记严重性并分配处理。
3. **Issue #1187 尚未分类/修复**（[链接](https://github.com/moltis-org/moltis/issues/1187)，创建 2026-08-09）：配置静默重置，涉及用户数据安全，建议尽快确认复现路径。

项目健康度总体良好：无版本更新但修复路径清晰，Bug 均为功能性细节问题而非架构性缺陷，PR 专注安全与体验优化，社区反馈虽少但指向明确。建议维护者优先处理上述三项，以保持项目稳定性和用户信任。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-08-10）

> 注：本日报基于 github.com/agentscope-ai/QwenPaw 仓库数据生成。CoPaw 相关数据源目前全部指向该仓库，以下统称 QwenPaw。

## 1. 今日速览

项目过去 24 小时保持高强度社区互动：32 条 Issue 更新（新开/活跃 25 条）与 37 条 PR 更新（待合并 31 条），但**无新版本发布**，当前处于 v2.1.0b2 发布后的密集修复期。值得关注的是，同一用户（lcq225）连续提交 4 条几乎完全相同的 Issue（#6848–#6851），其中 3 条已被关闭，说明重复报告问题开始消耗维护者精力；同时桌面端文本选择修复出现两个高度同质的 PR（#6801/#6802），暗示社区贡献活跃但流程引导有待加强。整体来看项目健康度中等偏上，核心问题集中在 OpenAI/gemini 提供商兼容性、前端渲染体验与插件生态三方面。

## 3. 项目进展

今日有 6 个 PR 被合入/关闭，均为针对性修复，无重大功能合入：

- **#6857** `fix(sandbox): emit WARNING log when non-dataclass sandbox_config is silently discarded` — 修复沙箱配置被静默丢弃时无日志的问题，提升可观测性。已关闭。
- **#6801 / #6802** `fix(os): restore text selection and copy in OS desktop window content` — 两个 PR 均针对 OS 桌面模式下无法选中/复制文本的问题，根因均为 `useOsStyles.ts` 中 `user-select: none`，二者功能重叠，各关闭其一。已关闭。
- **#5418** `fix(cron): record APScheduler misfires in history and raise default misfire grace to 600s` — 修复 cron 任务因 APScheduler 丢弃逾期执行而被"静默停止"的问题，将 misfire 记录持久化到历史状态并延长宽限时间。该 PR 自 6 月 23 日创建，今日终于关闭，积压约 47 天。
- **#6855** `fix(timestamp): interpret naive Msg timestamps as process-local timezone` — 修复 #6685 引入的 +8 小时时间戳漂移回归，将 AgentScope 写入的 naive 时间戳按进程本地时区解释。已关闭。
- **#6858** `fix(cron): return 404 for missing pause and resume jobs` — 对不存在的 pause/resume 任务返回 404 而非静默成功。待合并。

**项目整体前进方向**：今日合入的 PR 集中于稳定性修补（sandbox 日志、cron 容错、时间戳语义），配合 #6843、#6834 等在途 PR（流式 SSE 输出、前端动画优化），说明项目正处于 **2.1.0b2 的质量加固期**，为下一个正式版本做铺垫。

## 4. 社区热点

| Issue/PR | 标题 | 评论数 | 热度分析 |
|---|---|---|---|
| [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) | 🐾 Help Wanted: Open Tasks — Come Contribute! - S1 | 66 | 长期置顶贡献指引帖，评论区持续有贡献者认领任务，体现社区生态活跃。 |
| [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) | 2.0.1 docker版本，插件市场、应用市场始终提示维护中 | 9 | 用户核心功能被阻断，Docker 部署模式下应用市场不可用，诉求强烈。 |
| [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) | OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60-second cancellation | 5 | 涉及 Scroll 上下文驱逐时的同步续接摘要，阻塞主对话且误报错误类型，属于核心链路缺陷。 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 对话中助手消息结束时间显示异常 | 5 | 用户感知层面的误导——思考 2 分钟却显示几秒完成，影响信任感。 |
| [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) | 希望 Web 控制台适配移动端 | 5 | 移动端使用诉求持续发酵（自 7/20 起），无官方回应迹象。 |

**用户诉求共性**：热度最高的几个 Issue 集中在「核心功能被阻断」（Docker 不可用、对话阻塞）和「信息展示失真」（时间错误、流式输出延迟），这两类问题直接影响日常使用，需优先响应。

## 5. Bug 与稳定性

### 严重（崩溃 / 核心功能阻塞）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) | SIGBUS in sqlite3WalFindFrame while opening Scroll history.db on macOS | OPEN | 无 |
| [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) | OpenAI Responses 续接摘要忽略 disable_thinking，60 秒取消误报 | OPEN | 无 |
| [#6822](https://github.com/agentscope-ai/QwenPaw/issues/6822) | streamable HTTP MCP 瞬断后永久阻塞会话 | OPEN | 无 |
| [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) | Docker 版插件/应用市场始终「维护中」 | OPEN | 无 |

### 高（功能错误 / API 兼容）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6812](https://github.com/agentscope-ai/QwenPaw/issues/6812) | Gemini provider 发送含 `$schema` 的工具 schema 导致 400 | OPEN | 无 |
| [#6821](https://github.com/agentscope-ai/QwenPaw/issues/6821) | thinking-mode 模型多轮对话 reasoning_content 中继失败 (400) | OPEN | 无 |
| [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) | `consume_model_response` 抛 KeyError `'__aiter__'`，标题生成失败 | OPEN | 无 |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 工具调用将数字字符串误转为数字格式 | OPEN | 无 |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | qwenpaw-creator 安装失败：`No module named 'utils.env'` | OPEN | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688)（Underview） |

### 中（体验 / 性能）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) | 前端不流式输出，全部完成后才显示 | OPEN | [#6843](https://github.com/agentscope-ai/QwenPaw/pull/6843) |
| [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) | 空闲时前端持续重绘，CPU 占用 ~20% | OPEN | [#6834](https://github.com/agentscope-ai/QwenPaw/pull/6834) |
| [#6831](https://github.com/agentscope-ai/QwenPaw/issues/6831) | macOS 本地 Whisper 找不到 /opt/homebrew/bin 下 ffmpeg | OPEN | 无 |
| [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) | Windows 安装/更新时未检查占用目录的文件锁 | OPEN | 无 |

### 低（文档 / 环境）

- [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)：prompts.py 声称 dream 流程同步 MEMORY.md，实际未实现（文档失真）
- [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)：QwenPaw 执行任务被杀软拦截/强制关停（安全软件误报）
- [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780)：2.0.1 空闲几十分钟后卡死，需重启进程

### 值得注意的重复报告

- **#6848–#6852**（lcq225，同一问题「前端渲染器折叠长工具输出」提交 5 次）：#6848/#6849/#6850/#6851 已关闭，仅 #6852 保持开放。#6851 创建后同日即被关闭，疑似被识别为重复；#6852 更新于 08-10。建议维护者确认处理状态并回应用户。

## 6. 功能请求与路线图信号

### 用户新提出的功能需求

- [#6832](https://github.com/agentscope-ai/QwenPaw/issues/6832)：AI 提交审批时应附带一句话用途描述，方便用户快速判断——提升审批流可用性，属低成本高收益改动。
- [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281)：Web 控制台适配移动端——连续 3 周有讨论热度，是当前呼声最高的功能诉求。

### 结合在途 PR 的路线图判断

以下 PR 仍开放，正推动项目从「聊天工具」向「Agent 工作平台」演进：

- **工作区与记忆持久化**：[#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)（工作区 artifact 卡片）、[#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772)（ReMe 记忆配置/Embedding 验证/Daily Paper）
- **Provider 生态扩展**：[#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515)（火山方舟 Agent Plan + 小米 MiMo V2.5）、[#6823](https://github.com/agentscope-ai/QwenPaw/pull/6823)（自定义 provider 自动套用能力模板）
- **搜索能力升级**：[#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817)（集成 AnySearch 替代 Tavily）
- **架构统一**：[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一 provider 发现/元数据/路由，对应 #6167，自 7/21 起仍未合入）
- **Checkpoint 正式化**：[#6856](https://github.com/agentscope-ai/QwenPaw/pull/6856)（新增 QwenPaw Checkpoint 博客，配合 #5579 对话断点恢复）

**信号**：Issue #5579（对话记录断点保存机制）更新至 08-10 且状态为 CLOSED，结合 Checkpoint 博客 PR 的合入，断点恢复能力大概率已进入 2.1.x 正式版。

## 7. 用户反馈摘要

- **Docker 用户被核心功能阻断**（#6782）：`Sakura7301` 反馈 2.0.1 Docker 版插件市场/应用市场始终提示维护中无法使用。这是当前最尖锐的用户痛点——容器部署形态下的安装链路疑似存在未适配问题或后端服务地址错误。
- **安装体验是另一大痛点**（#6810）：`0959linger` 详细描述了 v2.1.0b1 自动更新卡死、b2 安装时 NSIS 连续弹出 4+ 文件锁错误，指向安装器未在覆盖前终止占用进程（尤其是浏览器扩展 NM host 锁文件）。Windows 用户安装门槛偏高。
- **安全软件误杀带来信任危机**（#6847）：`cmhaoso` 对比「同样的任务和模型，QwenPaw 被 360 等杀软打死，WorkBuddy 不会」，附截图展示了进程被强制结束。这对桌面 Agent 类产品是严重品牌损伤，建议排查行为特征（如注入、目录名）并主动与安全厂商沟通白名单。
- **前端渲染影响信息获取**（#6852/#6820）：长工具输出被折叠为不可读的文本块、流式输出不实时显示——用户感知到「模型没反应」或「进度丢失」，这是主界面体验的关键短板。
- **时间显示失真降低可信度**（#6826）：实际耗时 2 分钟却显示几秒，用户对消息时间线的信任受损；同类问题还有 #6855 已修复的 +8 小时时区漂移。
- **移动端需求被反复提及**（#6281）：用户 `ook826092-cloud` 简洁表达「方便在移动端操作」，评论中可看到多场景远程查看/控制需求，建议纳入路线图评估。

## 8. 待处理积压

| 类型 | 编号 | 标题 | 创建时间 | 积压时长 | 建议 |
|---|---|---|---|---|---|
| Issue | [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) | Help Wanted 开放任务列表 | 2026-03-25 | 4.5 个月 | 持续更新任务状态；建议考虑固定周期刷新，避免过期 |
| Issue | [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) | Web 控制台移动端适配 | 2026-07-20 | 21 天 | 尚无官方回复，建议至少标注 roadmap 或 planned |
| PR | [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | unify provider discovery/model metadata/routing | 2026-07-21 | 20 天 | 大型架构 PR 长期未合入，易与 #6823 等新 PR 产生冲突，需重点关注 |
| PR | [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) | 插件裸绝对导入隔离（fix #6683） | 2026-08-04 | 6 天 | 已标注 Under Review，社区等待中；#6683 用户已受影响 6 天 |
| Issue | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 2.0.1 空闲几十小时后卡死 | 2026-08-07 | 3 天 | 无维护者回应，有可复现步骤，建议优先补充 label |
| Issue | [#5584](https://github.com/agentscope-ai/QwenPaw/issues/5584) | 无法连接自定义 ascend-vllm 模型 | 2026-06-27 | 已关闭 | 虽关闭但用户反映「1.1.7 可以，之后都不行」，若未彻底修复易复发 |

---

**日报总结**：QwenPaw 今日无新版本发布，处于 v2.1.0b2 发布后的修复巩固期。社区反馈量较大且质量较高（问题描述详细、部分附根因分析），项目维护动作以精准修补为主。风险项集中在 OpenAI/Gemini provider 兼容性与 Docker/Windows 环境体验，建议下个版本优先解决。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-10

## 1. 今日速览

项目过去24小时保持高度活跃：共产生 50 条 Issue 更新和 50 条 PR 更新，社区讨论持续升温，其中治理流程（#6808）、安全加固（#9397）等话题占据讨论焦点。然而，过去24小时 **PR 合并/关闭数量为 0，所有 50 条 PR 仍处于待合并状态**，0 个新版本发布——提交与合并之间的吞吐失衡值得关注。安全类 Issue 占比显著（多个 S0 级风险被持续追踪），建议维护者优先处理高严重度缺陷的合并审查。

---

## 2. 版本发布

**无新版本发布。** 最新版本仍为 v0.8.3（上一次发布早于本统计窗口）。值得注意的是 v0.8.x 系列已进入迭代后期，多个 RFC（如 #6808、#7100）已标记为 0.8.0-beta-1 启动并处于"延迟批准/推进中"状态，表明 0.9 或更高版本的路线图正在酝酿。

---

## 3. 项目进展

过去24小时 **无 PR 被合并或关闭**（0 merged / 0 closed），项目合并通道处于停滞状态。以下待合并 PR 体现了近期核心工作方向，值得重点关注：

- **安全加固系列（重要）**：[PR #9580](https://github.com/zeroclaw-labs/zeroclaw/pull/9580) 加固内置 HTTP 出口边界，拒绝所有非全局 IPv4/IPv6 地址，并将网络分类原语抽取到 `zeroclaw-infra::net_guard` 供插件复用；[PR #9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) 流式处理 HTTP 响应体至配置字节上限，并阻止 fal.ai 客户端自动跟踪重定向；[PR #9865](https://github.com/zeroclaw-labs/zeroclaw/pull/9865) 修复 RUSTSEC-2026-0221（event-listener 5.4.1 非 Send 事件标签跨线程问题）。
- **依赖与供应链**：[PR #9808](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) rust-all 组 46 项依赖批量升级（tokio 1.52.3、clap 4.6.5 等）；[PR #9870](https://github.com/zeroclaw-labs/zeroclaw/pull/9870) 清除 npm audit 剩余告警（brace-expansion、nanoid）。

若上述 PR 获合并，将显著改善项目的供应链安全与 egress 安全基线。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心议题 |
|------|----------|--------|----------|
| 1 | [#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 22 | 治理流程改革：工作泳道、看板自动化与标签清理，修订至 Rev. 24，讨论周期长、参与者多 |
| 2 | [#7100 RFC: Per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 12 | 模型能力（视觉、上下文窗口）配置分散导致误报，需统一配置入口 |
| 3 | [#9397 RFC: Empty WhatsApp Web allowed_groups as permit-none](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | 11 | 安全默认值：空 `allowed_groups` 应拒绝所有群组而非放行全部 |

**诉求分析：** 社区讨论热度集中在三类诉求——**治理效率**（#6808 针对流程冗余、投票缓慢）、**配置一致性**（#7100 反映多数据源冲突痛点）、**安全默认值**（#9397 体现对 fail-closed 原则的期待）。其中 #9397 与系列安全审计 Issue 形成呼应，表明安全已成为社区最关切的主题之一。

---

## 5. Bug 与稳定性

### S0 — 数据丢失/安全风险

| Issue | 描述 | Fix PR 状态 |
|-------|------|-------------|
| [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | 知识图谱无 per-agent 归属，任意 agent 可读写他人知识 | 无对应 PR |
| [#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) | Matrix 频道跳过 `.well-known` 委派，直连配置主机 | 无对应 PR |
| [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) | 三个网关 webhook 处理器（WhatsApp Cloud/Linq/WATI）未认证即分发消息 | 无对应 PR |
| [#9627](https://github.com/zeroclaw-labs/zeroclaw/issues/9627) | git 写入动词可通过 `-C`/`--git-dir` 绕过风险分类器和审批门 | 无对应 PR |

### S1 — 工作流受阻

| Issue | 描述 | Fix PR 状态 |
|-------|------|-------------|
| [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | web_fetch 对 gzip/brotli/deflate 压缩响应返回乱码 | [#9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) 修复 HTTP 响应处理（待合并） |
| [#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) | Docker Compose 网关发布端口后仍回环绑定，拒绝连接 | 无对应 PR |
| [#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231) | Docker 运行时命令被嵌套在第二层 Docker 沙箱内 | 无对应 PR |
| [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | 运行中的 SOP 作业无操作者取消路径 | 无对应 PR |

### S2 — 行为退化

- [#9796](https://github.com/zeroclaw-labs/zeroclaw/issues/9796)：`cron --help` 输出不可运行的 add-at/add-every/once 示例（已由 [#9877](https://github.com/zeroclaw-labs/zeroclaw/pull/9877) 修复，待合并）
- [#8999](https://github.com/zeroclaw-labs/zeroclaw/issues/8999)：ZeroCode 流式用户消息被小型本地模型误判为日志/API 载荷

**观察：** S0 级安全缺陷（4个）均无对应修复 PR，且部分已 open 超两周（#9647、#9627 创建于 8/1）。考虑安全风险积累速度，建议将 #9565 和 #9627 列为下一合并窗口的最高优先级。

---

## 6. 功能请求与路线图信号

| 功能 | 相关 Issue | 相关 PR | 路线图判断 |
|------|-----------|---------|------------|
| **Per-model 能力/上下文窗口配置** | [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（上下文压缩比）、[#9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743)（模态解析器） | 高概率进入 0.9；两个配套 PR 已就绪 |
| **自定义 CA 信任（远程 MCP）** | [#9339](https://github.com/zeroclaw-labs/zeroclaw/issues/9339) | 无 | 企业私有网络刚需，需求明确但暂无实现 |
| **Signal "Note to Self" 支持** | [#9158](https://github.com/zeroclaw-labs/zeroclaw/issues/9158) | 无 | 使用场景明确，实现成本低，可能纳入后续迭代 |
| **PowerShell 原生支持** | — | [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) | Windows 用户体验重要改进，PR 已存在，待审查 |
| **SOP 作业取消路径** | [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | 无 | 运维刚需，当前无实现，路线图信号强 |

**信号解读：** 模型能力配置（#7100）是当前最活跃的功能主线——两个配套 PR（#9535、#9743）均已提交，表明该功能已在实现中，有望进入下一版本。安全相关功能（自定义 CA、fail-closed 默认值）是另一条主线，与社区热点高度一致。

---

## 7. 用户反馈摘要

**从 Issue 评论中提炼的真实用户声音：**

- **安全审计者的关切（来自 belumume）：** 多篇安全审计 Issue（[#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)、[#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)、[#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392)、[#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393)、[#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)）指向系统性的 fail-open 问题：LINE 群组消息跳过 allowlist、Bluesky/Reddit 无发送者授权、未认证 pair 接口以攻击者可控头做锁定、audit 日志默认启用但无写入——社区对"安全默认值"的诉求强烈。
- **运维痛点（来自 knoppix2、aaronps）：** Docker 部署后端口不可达、Docker 内嵌套 Docker，说明容器化部署路径的文档和实现仍有裂缝。
- **模型行为问题（来自 Audacity88）：** 小型本地模型（如 llama3.2）易被 ZeroCode 的流式格式误导，反映出对低算力/本地优先场景的关注。
- **Web 体验（来自 Mental-Vortex）：** WebChat 流式期间自动滚动劫持手动滚动，属交互细节，但影响实际阅读体验。

---

## 8. 待处理积压

### 长期未关闭的高风险 Issue

| Issue | 创建时间 | 严重度/优先级 | 状态 |
|-------|---------|---------------|------|
| [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) Codex CLI extra_args 削弱沙箱 | 2026-04-17 | S-level / P2 | open 116 天，in-progress |
| [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) 治理流程 RFC | 2026-05-20 | P2 | open 83 天，讨论中 |
| [#8422](https://github.com/zeroclaw-labs/zeroclaw/issues/8422)（如有） | — | — | — |

### 待审查/待作者响应的关键 PR

| PR | 标签 | 等待类型 |
|----|------|---------|
| [#9350](https://github.com/zeroclaw-labs/zeroclaw/pull/9350) cron CLI delivery flags | needs-author-action, risk:high | 作者待响应 |
| [#9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194) KeySource trait + FileKeySource | needs-author-action, risk:high, size:XL | 作者待响应 |
| [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) PowerShell native shell | needs-author-action, risk:high, size:XL | 作者待响应 |
| [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) Anthropic stored OAuth profiles | needs-author-action, risk:high, size:XL | 作者待响应 |

### 维护者提醒

项目当前存在 **PR 合并通道堵塞** 的迹象：50 条待合并 PR 中包括多个 `risk:high` 安全修复和 `size:XL` 大特性。长此以往可能出现两类风险：(1) 安全修复长期无法落地，S0 缺陷暴露面持续扩大；(2) 大型 PR（如 #9420、#9182）因等待过久产生冲突、增加最终合并成本。建议维护者优先安排 security 标签 PR 的审查批次，并考虑为 needs-author-action 的 PR 设定响应时限。

---

*本日报基于 ZeroClaw GitHub 仓库公开数据自动分析生成，统计窗口为 2026-08-09 至 2026-08-10。*
*数据来源：[github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)*

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*