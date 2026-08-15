# OpenClaw 生态日报 2026-08-16

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-15 23:00 UTC

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

# OpenClaw 项目动态日报 — 2026-08-16

## 今日速览

过去 24 小时项目保持高位活跃：共 500 条 Issue 更新（480 条新开/活跃，20 条关闭）、500 条 PR 更新（447 条待合并，53 条已合并/关闭），并发布 1 个新 beta 版本。v2026.8.1-beta.2 重点引入共享存储 Secret 出口主机绑定（安全加固）与 GPT-5.6 Ultra 运行时支持。社区讨论热度集中在 Codex 集成稳定性、Cron/DeepSeek 组合下的消息停留问题，以及数据库迁移导致的数据丢失类缺陷。项目整体推进节奏正常，但 P0/P1 长期未决问题偏多，其中数个影响生产部署的 issue 需要维护者优先介入。

---

## 版本发布

### [v2026.8.1-beta.2](https://github.com/openclaw/openclaw/releases) — 2026-08-16

**Highlights：**

- **Secret egress host binding（安全加固）**：将每个共享存储（shared-store）Secret 精确绑定到目标 HTTPS 主机，覆盖 CLI、Gateway RPC 和 Control UI 三条路径；未绑定的 sentinel 替换将在明文出口前 fail closed，防止 Secret 被意外外发。感谢 @shakkernerd 的贡献。
- **GPT-5.6 Ultra 及运行时切换支持**：新增对 GPT-5.6 Ultra 模型的适配与运行时动态切换能力（发布说明此处被截断，完整内容请查看 Release 页面）。

> ⚠️ 提示：升级前建议检查 `secrets.providers` 中 SecretRef 的 host 绑定配置，确认目标 HTTPS 主机白名单已正确设置；完整破坏性变更与迁移说明请以官方 Release Notes 为准。

---

## 项目进展

过去 24 小时共有 **53 个 PR 被合并/关闭**，代表性变更：

- [PR #124297 — test(tooling): deduplicate release timeout evaluators](https://github.com/openclaw/openclaw/pull/124297)（已关闭，维护者）— 去重发布工作流中超时求值器的重复实现，降低变更路由的维护成本。
- [PR #124277 — fix(ui): sidebar sort selection is forgotten after a reload](https://github.com/openclaw/openclaw/pull/124277)（已关闭）— 修复会话侧栏排序选择在页面刷新后丢失的问题。

此外，以下高价值修复已进入审核流程，虽未合并但值得关注：

- [PR #117328 — fix(agents): preserve history when context assembly fails](https://github.com/openclaw/openclaw/pull/117328)：防止 context 引擎失败时静默丢失会话/工具历史。
- [PR #120589 — fix(agents): backfill tool args when provider skips input_json_delta](https://github.com/openclaw/openclaw/pull/120589)：修复 CLI provider 跳过 `input_json_delta` 时 Discord progress/tracking/transcript 不一致问题。
- [PR #124293 — fix: Windows cron jobs never run because the durable fence cannot read a process identity](https://github.com/openclaw/openclaw/pull/124293)：修复 Windows 平台所有 cron 任务失效的严重问题（AI-assisted）。

项目整体在 UI 稳定性、工具链自动化、Feishu/Telegram/Slack 等渠道修复上持续稳步推进。

---

## 社区热点

1. **[Issue #91009 — Codex PreToolUse native hook relay spawns CPU-bound processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009)（20 评论，P1，crash-loop）**
   社区对 Codex 集成稳定性高度关注。多个 `openclaw-hooks` 进程各占 100%+ CPU，阻塞 Gateway RPC，直接影响生产可用性。

2. **[Issue #121953 — Cron agent turns stall on DeepSeek due to message prefix deprioritization](https://github.com/openclaw/openclaw/issues/121953)（19 评论，P1）**
   DeepSeek API 对以 `[cron:...]` 开头的用户消息降优先级，导致 cron 任务停留数十秒至数分钟。反映用户对 cron 可靠性（尤其是低成本模型组合）的强烈诉求。

3. **[Issue #79902 — Add companion-friendly SQLite transcript/session seams on top of database-first runtime](https://github.com/openclaw/openclaw/issues/79902)（13 评论，P3，👍 2）**
   高级用户希望基于数据库优先的运行时提供 SQLite 会话/transcript 标准接口，替代“抓取不透明 blob”的做法——社区对可编程、可观测运行时的需求持续走高。

4. **[Issue #121953 / #91009 相关 PR 讨论](https://github.com/openclaw/openclaw/pulls)** — 多个待合并 PR 围绕 Feishu 队列、Telegram 富文本确认、Slack 进度卡展开，渠道体验修复是当前社区关注焦点之一。

---

## Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 描述 | Fix PR |
|---|---|---|---|
| **P0** | [#70903](https://github.com/openclaw/openclaw/issues/70903) | 持久化 provider 冷却：billing 恢复后仍被 `disabledUntil` 阻塞数小时 | 无 |
| **P1** | [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook 进程 CPU 占用 100%+，阻塞 Gateway RPC | 无（需 live repro） |
| **P1** | [#121953](https://github.com/openclaw/openclaw/issues/121953) | DeepSeek 上 Cron agent 因 `[cron:]` 前缀被降优先级而 stall | 无 |
| **P1** | [#123799](https://github.com/openclaw/openclaw/issues/123799) | 生产环境 Codex compact 404，需要安全升级/backport 指导 | 无 |
| **P1** | [#38327](https://github.com/openclaw/openclaw/issues/38327) | 2026.3.2 + google-vertex/gemini-3.1 报 "Cannot convert undefined or null to object"（回归） | 无 |
| **P1** | [#41744](https://github.com/openclaw/openclaw/issues/41744) | 飞书 `read` 工具读取图片后，最终 outbound 消息丢失媒体附件 | 有 linked PR |
| **P1** | [#94939](https://github.com/openclaw/openclaw/issues/94939) | 6.x 迁移后 channel conversation-store SQLite 为 0 字节，orpha 引用导致 MS Teams 主动发送失败 | 有 linked PR |
| **P1** | [#119087](https://github.com/openclaw/openclaw/issues/119087) | Gateway 冷启动从 2026.7.1-beta.1 到 2026.7.2-beta.7 慢约 2.5x | 无 |
| **P1** | [#43374](https://github.com/openclaw/openclaw/issues/43374) | 4 个 agent 并发时所有 LLM API 同时超时，非 provider 问题 | 无 |
| **P2** | [#51429](https://github.com/openclaw/openclaw/issues/51429) | 工作路径被 hardcode（/Users/wangtao）并合入发布版 | 无 |
| **P2** | [#50165](https://github.com/openclaw/openclaw/issues/50165) | 子代理在底层工作未完成时即显示为已完成 | 无 |
| **P2** | [#123073](https://github.com/openclaw/openclaw/issues/123073) | dev 频道 `openclaw update` 失败：`EUNSUPPORTEDPROTOCOL`（workspace:* 需 pnpm） | [PR #124293](https://github.com/openclaw/openclaw/pull/124293) 相关（Windows cron），此 issue 标有 fix-shape-clear/queueable-fix |

> 今日新报告：Windows 平台 cron 任务完全无法运行（[Issue #124125](https://github.com/openclaw/openclaw/issues/124125)，已有 [PR #124293](https://github.com/openclaw/openclaw/pull/124293) 修复）；`doctor --fix` 对旧状态数据库陷入 “migration required” 死循环（[PR #124282](https://github.com/openclaw/openclaw/pull/124282)，AI-assisted，待审核）。

---

## 功能请求与路线图信号

**高热度 / 高票功能请求：**

- [Issue #13219 — Per-model usage logging for cost tracking](https://github.com/openclaw/openclaw/issues/13219)（P2，👍 1，有 linked PR）— 原生按模型用量日志，便于成本追踪与模型混合优化。
- [Issue #10687 — Fully dynamic model discovery (OpenRouter + beyond)](https://github.com/openclaw/openclaw/issues/10687)（P2，👍 3）— 模型目录静态化是 OpenRouter 等快速变化 provider 的主要痛点。
- [Issue #6625 — Graceful sub-agent timeout (pre-timeout warning)](https://github.com/openclaw/openclaw/issues/6625)（P2）— 子代理超时前注入预警消息，避免全部工作丢失。
- [Issue #45771 — Built-in pace-aware rate limiting for autonomous agents](https://github.com/openclaw/openclaw/issues/45771)（P3，👍 2）— 防止自主循环耗尽 API 速率限制。
- [Issue #45758 — Support YAML as config file format](https://github.com/openclaw/openclaw/issues/45758)（P3，👍 2）— YAML 配置格式支持。
- [Issue #79902 — SQLite transcript/session seams](https://github.com/openclaw/openclaw/issues/79902)（P3，👍 2）— 标准化会话数据访问接口。
- [Issue #66252 — Per-Agent TTS/STT Configuration Overrides](https://github.com/openclaw/openclaw/issues/66252)（P3，👍 1）— 多语言/多角色场景下的语音配置隔离。

**路线图信号：**

- **安全与认证体系加强**：v2026.8.1-beta.2 的 Secret host binding 与 [PR #123793（plugin identifier authentication contract）](https://github.com/openclaw/openclaw/pull/123793) 方向一致，表明项目正系统化加固密钥管理与插件认证边界。
- **Codex 集成深度优化**：多个 open PR（[#121760](https://github.com/openclaw/openclaw/pull/121760)、#91009 相关）围绕 Codex supervisor、hook 进程、会话上下文增长问题展开，下一版本对 Codex 后端的稳定性预期会有明显提升。
- **渠道一致性修复**：Telegram（[PR #124222](https://github.com/openclaw/openclaw/pull/124222)、[PR #83254](https://github.com/openclaw/openclaw/pull/83254)）、Feishu（[PR #124214](https://github.com/openclaw/openclaw/pull/124214)、[PR #119675](https://github.com/openclaw/openclaw/pull/119675)）、Slack（[PR #123851](https://github.com/openclaw/openclaw/pull/123851)）多个渠道修复在途，用户体验一致性是当前迭代重点。

---

## 用户反馈摘要

- **感谢与认可**：[Issue #73537](https://github.com/openclaw/openclaw/issues/73537) 用户表示 OpenClaw “已成为家庭和商业助手日常流程的一部分”（Telegram、automations、cron、Home Assistant），同时请求增加 production-readiness 稳定性标签——说明社区对正式生产可用性的期待在提高。
- **生产部署受困**：[Issue #123799](https://github.com/openclaw/openclaw/issues/123799) 生产环境用户明确表示“需要操作指导”，此前 #123706 以“已在 main 上实现”关闭，但用户运行的是 2026.5.12 旧版本，反馈了**升级/backport 指导缺失**这一核心问题。
- **中文社区声音**：
  - [#51429](https://github.com/openclaw/openclaw/issues/51429)：“这位 wangtao 是谁？”——用户对 hardcode 工作路径被合入发布表示困惑与不满。
  - [#55694](https://github.com/openclaw/openclaw/issues/55694)：飞书场景下工具调用失败导致 Agent 无限重试，连续发送 6+ 条重复消息刷屏。
- **迁移痛点**：[#90378](https://github.com/openclaw/openclaw/issues/90378) 用户报告 npm 升级 5.28→6.1 时 cron store 静默迁移到 SQLite，新 job 默认 `delivery.mode=announce` 导致渠道出错，且迁移过程对用户不可见。
- **可用性**：[#70903](https://github.com/openclaw/openclaw/issues/70903) 用户充值恢复后仍被 provider 冷却阻塞数小时，“被锁在门外”的体验引发共鸣。

---

## 待处理积压

以下问题长期未获解决或缺少维护者明确回应，建议优先关注：

1. **[Issue #69208 — Umbrella: duplicate transcript, replay, and context assembly across channels](https://github.com/openclaw/openclaw/issues/69208)**（P1，2026-04-20 创建，13 评论）
   跨渠道重复 transcript/replay/context assembly 的 umbrella issue，涉及 MSTeams、webchat、Telegram 等，需产品决策级梳理。

2. **[Issue #70903 — Persistent file-based provider cooldown blocks user for hours after billing recovery](https://github.com/openclaw/openclaw/issues/70903)**（P0，2026-04-24 创建，有 stale 标签，无 fix PR）
   唯一 P0 issue，且影响真实付费用户，长时间无修复进展，项目健康度风险最高。

3. **[Issue #51429 — 工作路径被 hardcode 合入发布](https://github.com/openclaw/openclaw/issues/51429)**（P2，2026-03-21 创建，13 评论）
   已持续近 5 个月，标签 `needs-maintainer-review` + `needs-product-decision`，社区观感影响较大。

4. **[Issue #10687 — Fully dynamic model discovery](https://github.com/openclaw/openclaw/issues/10687)**（P2，2026-02-06 创建，👍 3）
   最早期的功能请求之一，10 评论仍停留在讨论阶段，OpenRouter 用户等待时间较长。

5. **[Issue #103231 — claude-cli backend: ownsNativeCompaction assumption is false](https://github.com/openclaw/openclaw/issues/103231)**（P1，2026-07-10 创建，8 评论，👍 2）
   `claude -p` 会话无人压缩，上下文超 200%，所有恢复路径静默失败——需维护者确认是否调整 `ownsNativeCompaction` 设计。

6. **[Issue #123073 — dev-channel update fails: EUNSUPPORTEDPROTOCOL on workspace:*](https://github.com/openclaw/openclaw/issues/123073)**（P1，2026-08-13 创建，标有 `queueable-fix`）
   新近报告、根因清晰（updater 用 npm 而仓库要求 pnpm），修复成本低，建议尽快纳入排期。

---

**项目健康度简评**：发布节奏稳定，社区参与度高（500+ Issues/PRs 日更新），安全加固方向明确；但 P0/P1 问题积压数量偏多，跨渠道会话一致性与数据迁移可靠性仍是当前最大短板。建议维护者优先处理 #70903、#123799、#123073 三个对用户信任影响最直接的问题。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：2026-08-16**  
**数据窗口：过去 24 小时（2026-08-15 ~ 2026-08-16）**


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**「功能扩张与架构治理并行」**的关键阶段。头部项目（OpenClaw、Hermes Agent、ZeroClaw）日更新量达 50~500 条量级，但普遍面临 PR 合并积压与 P0/P1 缺陷久拖不决的压力；中腰部项目（NanoBot、IronClaw、NanoClaw）则凭借清晰的架构主线实现快速迭代。跨项目看，**数据完整性、安全边界、Cron 可靠性、上下文/记忆管理**已成为全生态共同的技术攻坚焦点，而 Claw 系列（OpenClaw、NanoClaw、NullClaw、PicoClaw 等）的命名聚集效应表明 OpenClaw 已形成事实上的生态参照系——既有衍生项目围绕其做轻量化/场景化改造，也有项目（如 ZeroClaw、IronClaw）在底层架构上选择独立路线以寻求差异化。整体判断：生态正从"单点工具"向"平台化基础设施"演进，但维护者审查带宽与社区贡献速度之间的剪刀差，正在成为制约各项目健康度的共性瓶颈。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PRs 更新 | Release | 合并/关闭量 | 健康度评估 |
|------|------------|---------|---------|------------|-----------|
| **OpenClaw** | 500（480 新开/20 关闭） | 500（447 待合并/53 合并关闭） | 1 个 beta（v2026.8.1-beta.2） | PR 53 | ⚠️ 高活跃但 P0/P1 积压偏多，数据迁移类缺陷突出 |
| **Hermes Agent** | 50（42 新开/8 关闭） | 50（48 待合并/2 合并关闭） | 无 | PR 2 | ⚠️ 重构成果显著，但合并瓶颈严重（48 条 PR 待合并） |
| **ZeroClaw** | 50（46 新开/4 关闭） | 50（44 待合并/6 合并关闭） | 无 | PR 6 | ⚠️ RFC 讨论密集，44 条 PR 积压，维护者决策成瓶颈 |
| **IronClaw** | 28（7 新开/21 关闭） | 13（7 待合并/6 合并关闭） | 无 | Issue 21 / PR 6 | ✅ 架构迁移完成，性能优化批量落地，主线清晰 |
| **NanoClaw** | 0 | 22（19 待合并/3 关闭合并） | 无 | PR 3 | ✅ 核心团队高产出，但 Issue 侧静默，review 积压 |
| **NanoBot** | 2（1 新开/1 活跃） | 16（9 待合并/7 合并关闭） | 无 | PR 7 | ✅ 稳定性投入明显，P0 修复待合入 |
| **CoPaw (QwenPaw)** | 10（9 新开/1 关闭） | 11（全部待合并） | 无 | PR 0 | ⚠️ 提交活跃但合并为零，首次贡献者占比高 |
| **LobsterAI** | 18（16 关闭，均为 stale） | 6（4 Dependabot/2 关闭） | 无 | PR 2 | ⚠️ 存量清理期，stale 自动关闭掩盖真实问题 |
| **Moltis** | 0 | 6（3 待合并/3 合并关闭） | 无 | PR 3 | ✅ 核心贡献者驱动，功能迭代扎实 |
| **NullClaw** | 1（新开） | 1（新开待合并） | 无 | PR 0 | 🟡 温和活跃，维护者响应速度待观察 |
| **PicoClaw** | 0 | 2 条 PR 积压 9 天（stale） | 无 | PR 0 | 🟡 低活跃，维护调整期 |
| **ZeptoClaw** | 0 | 0 | 无 | 0 | ⚪ 无活动 |

> 注：OpenClaw 的 Issue/PR 数据包含自动化与 bot 操作，绝对值远超其他项目，反映其社区体量而非单纯活跃度。


## 3. OpenClaw 在生态中的定位

### 3.1 核心优势

- **生态位中枢**：OpenClaw 以 500+ Issue/PR 的日更新量遥遥领先（次位项目为 50 条量级），已形成"Claw"命名家族（NanoClaw、NullClaw、PicoClaw、ZeptoClaw），且 LobsterAI 直接以 OpenClaw 为运行时内核，构成围绕 OpenClaw 的衍生生态。
- **全渠道覆盖深度**：飞书、Telegram、Slack、Discord、Teams、WhatsApp 等渠道的修复持续在途，是渠道适配最广的项目。
- **安全加固先行**：v2026.8.1-beta.2 的 Secret egress host binding 与插件认证合约（PR #123793）表明其在密钥管理和插件安全边界上走在生态前列。
- **模型适配跟进快**：GPT-5.6 Ultra 的适配与运行时动态切换能力已在 beta 版本落地。

### 3.2 技术路线差异

| 维度 | OpenClaw | 差异化竞争者 |
|------|----------|-------------|
| **架构哲学** | 数据库优先运行时 + Secret host binding + Gateway RPC | IronClaw：prepared-context turns 全量切换；ZeroClaw：RFC 驱动的多协议网关 |
| **代码组织** | 单体演进，UI/工具链/渠道持续修复 | Hermes Agent：god-file 分片政策（Telegram adapter.py 从 10,147 行压缩至 1,390 行） |
| **语言/运行时** | Node/TS 生态（pnpm workspace） | IronClaw/ZeroClaw：Rust + Wasmtime，强调性能与内存安全 |
| **集成策略** | 原生多模型（GPT-5.6 Ultra、DeepSeek、Gemini）+ Codex 深度集成 | CoPaw：目录驱动 provider 统一发现与路由；ZeroClaw：Chat Completions 兼容层 + Anthropic fallback |

### 3.3 相对短板

- **P0/P1 积压**：唯一 P0（#70903 provider 冷却阻塞）长期无 fix，多个 P1 影响生产部署。
- **升级/迁移体验**：SQLite 0 字节、`doctor --fix` 死循环、cron store 静默迁移等问题直接侵蚀用户信任。
- **合并效率**：447 条 PR 待合并，虽受社区体量影响，但核心路径的修复 PR（如 Windows cron 修复 #124293）不应长期滞留。

**结论**：OpenClaw 是生态中当之无愧的**体量与覆盖度冠军**，但 IronClaw/ZeroClaw 等竞品正通过架构革新和更严格的工程治理，在特定维度（性能、安全、协议兼容）构建差异化壁垒。OpenClaw 的最大风险不在外部竞争，而在于 P0/P1 积压对核心用户信任的持续消耗。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **Cron/定时任务可靠性** | OpenClaw（#124293 Windows cron 全部失效、#121953 DeepSeek 前缀降优先级导致 stall）；NanoBot（#5376 持久化失败致调度器永久停止）；LobsterAI（#2234 cron yield 子 Agent 调度）；CoPaw（#7048 cron update 静默失败） | 定时任务在跨平台、低成本模型、故障恢复场景下的一致性与可观测性 |
| **记忆/上下文完整性与成本** | OpenClaw（#117328 context 失败丢历史）；NanoBot（#5377 整合截断致消息永久丢失）；Hermes（#84371 上下文压缩死循环）；NullClaw（#987 工具输出压缩 + 前缀缓存）；PicoClaw（#3321 前缀缓存命中优化） | 上下文管理的「不丢数据」与「控制 token 成本」同等重要 |
| **升级/迁移可靠性** | OpenClaw（#94939 SQLite 0 字节、#90378 静默迁移、PR #124282 migration 死循环）；Hermes（#83569 Windows 更新自锁 .pyd）；LobsterAI（stale 关闭掩盖未修复问题） | 版本升级不应破坏用户数据或产生不可逆变更；迁移过程需透明、可回滚 |
| **安全边界加固** | OpenClaw（Secret egress host binding、插件认证）；NanoBot（#5369 插件缓存失效安全）；Hermes（#84551 危险命令检测绕过）；ZeroClaw（#9995 凭据脱敏、#9745/#9746 越权访问） | 密钥管理、插件权限隔离、命令审批、越权防护成为全生态共识 |
| **多平台渠道体验一致性** | OpenClaw（Feishu/Telegram/Slack 系列修复）；Hermes（#87051 Telegram topic 错投）；CoPaw（#6476 Matrix E2EE）；NanoClaw（#3250 Telegram Markdown 损坏）；ZeroClaw（#7849 Discord 提及线程、#7824 wecom 主动消息） | 渠道适配深度参差，Markdown/附件/消息路由是高频故障点 |
| **模型接入与 Provider 管理** | OpenClaw（#10687 动态模型发现、#13219 按模型用量日志）；ZeroClaw（#8603 Chat Completions 兼容、Anthropic fallback 栈）；CoPaw（#6302 提供商统一发现与路由）；IronClaw（#7672 Typed ToolChoice） | 从「硬编码模型列表」走向「动态发现、能力感知路由、可观测用量」 |
| **长任务/自主循环稳定性** | OpenClaw（#91009 Codex hook CPU 占满、#43374 并发超时）；IronClaw（#7673 BudgetLedger 计费修正）；NullClaw（#987 循环检测）；NanoClaw（#3251/#3252 容器心跳误杀/漏杀） | 无人值守场景下，超时、限流、心跳、循环检测需要系统性设计 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键特征 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全能型个人 AI 助手 + 自主智能体，多渠道/多模型全覆盖 | 个人高级用户、家庭自动化、中小团队生产部署 | Node/TS + Gateway RPC + 数据库优先运行时 + 共享存储 Secret 绑定 |
| **Hermes Agent** | 高可观测性、桌面端体验、大规模代码质量治理 | 开发者、桌面端用户、团队协作场景 | Electron 桌面壳 + Telegram 重度集成 + god-file 分片政策 |
| **ZeroClaw** | 多协议网关、企业级安全边界、RFC 驱动架构 | 开发者/自托管用户、多 Agent 部署、企业 PoC | Rust + 多 RFC 并行演进 + Anthropic fallback 全套链路 + 会话所有权隔离 |
| **IronClaw** | 运行时性能与架构统一、并发/持久化优化 | 对性能敏感的生产用户、Rust 生态开发者 | Rust + prepared-context turns + 数据库写入削减（每 turn 减少数十次写入） |
| **NanoBot** | WebUI 协作体验、插件安全、轻量部署 | 个人/小团队，偏好 Web 交互 | 模块化 + 插件技能缓存验证 + 会话生命周期绑定 + 多 Provider 网关 |
| **CoPaw (QwenPaw)** | 多模态（视频/图片）、数据工作区（DataPaw）、企业集成 | 数据分析用户、多模态应用开发者 | OpenAI Responses API 深度适配 + 目录驱动 Provider 体系 + 远程沙箱 |
| **NanoClaw** | 轻量级聊天桥接、Telegram 优先、容器化部署 | 容器/运维用户、多身份运营者 | 单日 14 条 core-team PR 的集中式架构升级 + 渠道注册拦截 + 跨会话上下文 |
| **LobsterAI** | OpenClaw 的桌面壳/管理界面 + 中文用户体验优化 | 中文用户、网易生态用户 | OpenClaw 内核 + 桌面 GUI + 微信/钉钉 IM 集成 |
| **Moltis** | 连接器生态（日历/邮件/频道）、ClawHub 技能分发 | 知识工作者、Slack/远程开发用户 | 连接器持久化 + 全文搜索 + Coder 远程沙箱 + Slack 原生任务卡片 |
| **NullClaw** | 长任务本地工具调用优化、代理支持 | 本地开发者、网络受限用户、自主 agent 用户 | Zig 压缩模块 + 提示词前缀稳定化 + 循环检测 |
| **PicoClaw** | 轻量渠道桥接（WhatsApp）、路由缓存优化 | 嵌入式/轻量部署用户 | 依赖升级驱动 + 前缀缓存优化（长会话成本控制） |
| **ZeptoClaw** | — | — | 无活动，暂不评估 |

**关键判断**：生态已出现清晰的分层——OpenClaw 是覆盖最广的"旗舰"，Hermes/ZeroClaw/IronClaw 分别在桌面体验、协议兼容/安全、运行时性能上建立技术壁垒，而 NanoClaw/CoPaw/Moltis 等则从特定场景切入寻找生存空间。


## 6. 社区热度与成熟度

### 6.1 活跃度分层

| 层级 | 项目 | 特征 |
|------|------|------|
| **T0 - 生态核心（日更新 500 条）** | OpenClaw | 体量远超其他项目，社区参与度与反馈量级呈指数级差异 |
| **T1 - 高活跃（日更新 50 条）** | Hermes Agent、ZeroClaw | 社区讨论密集，但合并效率与审查带宽是共同瓶颈 |
| **T2 - 中活跃（日更新 10-30 条）** | IronClaw、NanoClaw、CoPaw、NanoBot | 核心团队驱动为主，社区反馈链路尚在建立 |
| **T3 - 低活跃/维护期** | LobsterAI、Moltis、NullClaw、PicoClaw、ZeptoClaw | 以存量维护/零星提交为主，外部贡献者参与有限 |

### 6.2 发展阶段判断

| 阶段 | 项目 | 标志性信号 |
|------|------|-----------|
| **质量巩固期（从扩张转向治理）** | Hermes Agent | god-file 分片 Epic 收官（20/20）、合并瓶颈成主要矛盾 |
|  | IronClaw | unbound-turns 架构迁移完成、21 条 Issue 系统关闭、技术债清理 |
|  | ZeroClaw | RFC 密集讨论 + 安全类缺陷快速修复 + 44 条 PR 待决策 |
|  | OpenClaw | 安全加固 + 功能持续迭代，但 P0/P1 积压未解 |
| **快速迭代期（功能批量落地）** | NanoClaw | 单日 22 条 PR、内部代号（A1-A8/C4）显示有计划的架构战役 |
|  | CoPaw | 11 条 PR 待合并（含 DataPaw 运行时、Provider 体系重构），合并后版本跳升 |
|  | NanoBot | 7 条 PR 合并、WebUI/插件安全/内存/Cron 多线推进 |
|  | Moltis | 连接器持久化 + Coder 远程沙箱 + Slack 原生卡片三线并进 |
| **维护期/早期探索** | LobsterAI | stale 清理 + Dependabot 为主，无新功能输入 |
|  | NullClaw | 基础设施打磨（代理、循环卫生），社区声量待积累 |
|  | PicoClaw | 两条 PR 积压 9 天，维护者响应不足 |
|  | ZeptoClaw | 无活动 |


## 7. 值得关注的趋势信号

### 7.1 从"功能可用"到"数据可信"——完整性和可观测性是信任基石

- **数据完整性**：NanoBot #5377（记忆整合截断致永久丢失）、OpenClaw #117328（context 失败丢历史）、Hermes #84371（压缩死循环）——多个项目同时出现"静默数据丢失"类缺陷，说明记忆/上下文管线的数据完整性设计普遍不足。
- **静默成功比报错更危险**：CoPaw #7048（`cron update` 返回成功但未生效）、#7059（`view_video` 无报错但模型收不到视频）、Hermes #87268（安装脚本输出成功但实际未固定版本）——"假成功"正在成为用户信任的头号杀手。
- **升级/迁移需透明可回滚**：OpenClaw #90378（静默迁移到 SQLite）、#94939（0 字节数据库）、LobsterAI stale 关闭掩盖真实问题——迁移过程对用户不可见是系统性短板。

**对开发者的参考**：在设计 Agent 框架时，应将"失败可被明确感知、数据不因截断/迁移而丢失、操作结果与真实状态一致"作为一等公民需求，而非事后补丁。

### 7.2 Cron/自动化从"附加功能"升格为"核心可靠性命题"

OpenClaw（Windows cron 全部失效、DeepSeek 上 stall）、NanoBot（持久化失败致调度器停止）、LobsterAI（cron yield 子任务）、CoPaw（cron 更新静默失败、按任务指定模型）——Cron 已不是简单定时触发，而是承载真实生产工作流的**自主调度基础设施**，对跨平台兼容、低成本模型适配、故障隔离、可观测性的要求全面升级。

### 7.3 缓存/上下文工程成为成本竞争主战场

PicoClaw #3321（前缀缓存命中）、NullClaw #987（稳定前缀 + 工具输出压缩）、OpenClaw #10687（动态模型发现 + 按模型用量日志）、IronClaw（数据库写入削减）——在模型 API 成本高企的背景下，**提示词缓存友好设计、上下文压缩、用量可观测**正成为各项目差异化竞争的关键技术点。

### 7.4 安全边界从"外围防御"走向"纵深内置"

OpenClaw（Secret egress host binding + 插件认证合约）、Hermes（危险命令检测绕过 + 子进程凭据继承战役）、ZeroClaw（3 个安全类 P1/P2 + 越权访问修复）、NanoBot（插件缓存安全）——安全不再是"事后修补"，而是**插件系统、认证、密钥管理、命令审批、数据隔离**的全链路设计。尤其值得关注的是多 Agent 数据隔离（ZeroClaw #9745/#9746：知识图谱与会话工具缺少所有者维度），这将是 multi-agent 平台化发展的前置条件。

### 7.5 协议互通与生态嵌入成为平台化分水岭

ZeroClaw #8603（OpenAI Chat Completions 兼容）以 20 条评论位居社区热点榜首，用户明确希望 Aider/LangChain/OpenAI SDK 直接接入；OpenClaw 的 Codex 集成、Moltis 的 ClawHub 技能分发、CoPaw 的目录驱动 Provider 体系——**"你的 Agent 能否被主流工具调用/能否调用主流工具"**正在定义下一代平台级项目的入场券。

### 7.6 桌面端与安装链路是体验洼地，也是差异化机会

Hermes（Linux .desktop 静默失败、Windows 更新自锁、macOS renderer 残留）、ZeroClaw（macOS 重启丢窗口）、LobsterAI（本地构建缺 runtime）——桌面端在三大操作系统上均存在大量未解决的体验问题。对于竞品而言，这既是 OpenClaw/Hermes 的软肋，也是**以"安装即所得、升级不破坏"为卖点切入市场的机会窗口**。

### 7.7 维护者审查带宽正在成为生态瓶颈

Hermes 48 条 PR 待合并（含等待 13 天的"零行为变更"重构切片）、ZeroClaw 44 条 PR 积压 + 多个 RFC 等待决策、OpenClaw 447 条 PR 待合并、NanoClaw 19 条 PR 卡在合并环节、CoPaw 11 条 PR 零合并——多个项目同时出现"提交侧活跃、合入侧停滞"的结构性矛盾。**社区贡献者的耐心是有限资源**，长期积压将直接导致外部贡献流失（PicoClaw 的 2 条 PR 积压 9 天已出现 `[stale]` 标记，是这一风险的早期信号）。对项目治理的启示：**合并效率与代码质量同等重要，批量 review、RFC 快速决策、自动化标签（如 size/risk 自动标注）是缓解瓶颈的现实手段**。


**综合结论**：个人 AI 助手开源生态正处于从"单点工具"向"可信平台"跃迁的关键转折期。OpenClaw 凭借体量与生态位占据中心，但架构治理与缺陷积压使其面临"大而不稳"的风险；IronClaw/ZeroClaw 等后起之秀以架构革新和安全内建在特定维度建立壁垒。对所有项目而言，**数据完整性、安全纵深、成本工程、升级可靠性**是赢得生产用户信任的四大必修课；而对技术决策者而言，**优先选择那些合并效率高、P0 响应快、迁移可回滚的项目**，将是更稳健的采用策略。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报（2026-08-16）

## 今日速览

过去 24 小时 NanoBot 处于中等偏活跃的开发节奏：共更新 2 个 Issue、16 个 PR，无新版本发布。社区侧以 Bug 报告为主，其中 **#5377** 暴露了记忆整合环节的数据丢失隐患，已有对应修复 PR **#5379** 提出。代码侧有 7 个 PR 被合并/关闭，覆盖 WebUI 交互、插件安全、会话生命周期、Cron 稳定性等方向。与此同时，仍有一个 **P0 级修复 PR #5271** 处于开放状态，需要维护者重点关注。整体看项目在稳定性与 WebUI 体验上投入明显，健康度良好，但 P0 积压需尽快处理。

## 项目进展

今日共有 7 个 PR 被合并/关闭，主要聚焦在 Bug 修复、稳定性提升和 WebUI 体验完善：

- **[#5371] fix(webui): hide assistant actions until turn end**  
  修复 Agent 回合未结束时，复制/派生按钮提前出现的问题。  
  https://github.com/HKUDS/nanobot/pull/5371

- **[#5369] fix(plugins): revalidate cached skill roots after package changes**  
  修复插件包变更后，缓存技能目录仍可被旧路径访问的安全/一致性问题。  
  https://github.com/HKUDS/nanobot/pull/5369

- **[#5370] fix(agent): bound per-session file state lifecycle**  
  限制 `FileStateStore` 对每一个 session key 长期持有状态导致的无界内存增长。  
  https://github.com/HKUDS/nanobot/pull/5370

- **[#5376] fix(cron): keep scheduler alive when job-store persistence fails**  
  修复单次持久化异常（磁盘满、权限变化等）导致 Cron 调度器永久停止的静默故障。  
  https://github.com/HKUDS/nanobot/pull/5376

- **[#5399] fix(webui): clarify model preset display names**  
  区分模型预设的显示名称与稳定 `/model` 命令名，避免编辑时产生歧义。  
  https://github.com/HKUDS/nanobot/pull/5399

- **[#5397] fix(webui): preserve range selection and turn timing**  
  支持 macOS 风格 Shift 范围选择，并修复引导消息发送过程中 turn 计时/身份丢失问题。  
  https://github.com/HKUDS/nanobot/pull/5397

- **[#5328] feat(providers): add OrcaRouter as a named gateway provider**  
  新增 OrcaRouter 网关 provider，聚合 150+ 模型，属于新功能合并。  
  https://github.com/HKUDS/nanobot/pull/5328

这些改动整体降低了插件安全风险、内存占用和 Cron 静默故障，并改善了 WebUI 在多轮会话下的操作一致性，项目在稳定性与可用性上都有明显推进。

## 社区热点

今日评论最集中的是 **Issue #5377**，共 2 条评论：

- **[#5377] [OPEN] Bug: consolidation truncates archive input but advances past the full message batch**  
  https://github.com/HKUDS/nanobot/issues/5377

该 Bug 描述了一个典型的数据完整性问题：`Consolidator.archive()` 会将输入截断到模型 token 预算内，但调用方仍把 `Session.last_consolidated` 推进到完整批次末尾。这意味着被截断掉的消息或消息后缀永远不会被再次处理，造成记忆整合阶段的隐性数据丢失。

社区诉求非常明确：**整合逻辑要么保留完整输入，要么游标推进必须与截断保持一致。** 已有关联修复 PR **#5379**，改为 lossless bounded chunks，是对该诉求的直接回应。

## Bug 与稳定性

按严重程度排列：

- **P0 高危：会话数据可能被过期后台任务覆盖**  
  **[#5271] fix(session): prevent stale background task saves from overwriting session data**  
  状态：开放，带 `conflict` 标记。  
  该 PR 修复 `/new` 或生命周期替换后，过期后台保存可能覆盖新会话数据的问题。  
  https://github.com/HKUDS/nanobot/pull/5271

- **高：记忆整合内容被截断且游标误推进，导致消息永久丢失**  
  **[#5377] Bug: consolidation truncates archive input but advances past the full message batch**  
  状态：开放，已有修复 PR **#5379**。  
  https://github.com/HKUDS/nanobot/issues/5377  
  https://github.com/HKUDS/nanobot/pull/5379

- **中：WebUI 在 Agent 回合未结束时显示复制/派生操作，造成状态冲突**  
  **[#5368] WebUI: hide copy and fork actions while an Agent turn is still running**  
  状态：已关闭，修复 PR **#5371** 已合并/关闭。  
  https://github.com/HKUDS/nanobot/issues/5368  
  https://github.com/HKUDS/nanobot/pull/5371

- **中：插件技能目录缓存未随包更新失效，存在安全/一致性问题**  
  **[#5369] fix(plugins): revalidate cached skill roots after package changes**  
  状态：已合并/关闭。  
  https://github.com/HKUDS/nanobot/pull/5369

- **中：FileStateStore 对每个 session 无界持有状态，存在内存膨胀风险**  
  **[#5370] fix(agent): bound per-session file state lifecycle**  
  状态：已合并/关闭。  
  https://github.com/HKUDS/nanobot/pull/5370

- **中：Cron 调度器会因单次存储异常永久停止**  
  **[#5376] fix(cron): keep scheduler alive when job-store persistence fails**  
  状态：已合并/关闭。  
  https://github.com/HKUDS/nanobot/pull/5376

## 功能请求与路线图信号

今日没有新开的 Feature Request Issue，但多个开放/合并 PR 显示出清晰的功能方向：

- **WebUI 协作与组织能力**  
  - [#5358] feat(webui): add session collaboration via mentions  
    https://github.com/HKUDS/nanobot/pull/5358  
  - [#5364] feat(webui): add temporary side conversations（带 conflict 标记）  
    https://github.com/HKUDS/nanobot/pull/5364  
  - [#5389] feat(webui): add drag-and-drop session organization（带 conflict 标记）  
    https://github.com/HKUDS/nanobot/pull/5389

- **模型/Provider 扩展**  
  - [#5398] feat(providers): add DashScope (Bailian) native protocol support  
    https://github.com/HKUDS/nanobot/pull/5398  
  - [#5328] feat(providers): add OrcaRouter as a named gateway provider（已合并/关闭）  
    https://github.com/HKUDS/nanobot/pull/5328

- **模型命名与持久化体验统一**  
  - [#5400] refactor(models): unify preset names  
    https://github.com/HKUDS/nanobot/pull/5400

- **WebUI 网络可靠性**  
  - [#5401] fix(webui): make mutations reconnect-safe  
    https://github.com/HKUDS/nanobot/pull/5401

从合并状态看，**OrcaRouter provider（#5328）已经进入主干**；**#5379 因为直接修复数据丢失问题，预计会被优先合入**。而 #5364/#5389 带有 `conflict` 标记，需先解决冲突才有机会进入后续版本。

## 用户反馈摘要

- **数据完整性痛点（#5377）**  
  用户明确指出：`Consolidator.archive()` 会按 token 预算截断输入，但调用方仍将 `last_consolidated` 推进到完整消息批次末尾。被截断的消息/后缀将永久无法被整合，属于静默数据丢失。  
  https://github.com/HKUDS/nanobot/issues/5377

- **WebUI 状态反馈混乱（#5368）**  
  用户在 Agent 仍在生成时看到复制/派生按钮出现，而 composer 仍保持 running 状态；这种“完成信号与实际状态冲突”的体验容易误导操作。对应修复已合入。  
  https://github.com/HKUDS/nanobot/issues/5368

## 待处理积压

以下开放 PR/Issue 需要维护者关注：

- **[#5271] P0 修复：防止过期后台任务保存覆盖会话数据**  
  已开放约 9 天，更新于 08-15，带 `conflict` 标记，属于高危稳定性问题。  
  https://github.com/HKUDS/nanobot/pull/5271

- **[#5291] fix(agent): persist subagent conversation transcripts**  
  已开放约 8 天，更新于 08-15，功能价值高，但需要推动评审。  
  https://github.com/HKUDS/nanobot/pull/5291

- **[#5364] feat(webui): add temporary side conversations**  
  带 `conflict` 标记，需要重新基于最新主干解决冲突。  
  https://github.com/HKUDS/nanobot/pull/5364

- **[#5389] feat(webui): add drag-and-drop session organization**  
  带 `conflict` 标记，与 #5364 同为 WebUI 组织能力增强，需协调合并顺序。  
  https://github.com/HKUDS/nanobot/pull/5389

- **[#5377] 记忆整合数据丢失 Bug**  
  虽然已有 #5379 修复 PR，但 Issue 本身仍开放，建议将修复 PR 纳入下一版本里程碑。  
  https://github.com/HKUDS/nanobot/issues/5377

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-16

## 1. 今日速览

过去 24 小时项目保持高活跃度：50 条 Issue 更新（新增/活跃 42，关闭 8），50 条 PR 更新（待合并 48，合并/关闭 2），无新版本发布。**架构治理进入收尾期**——大型文件分解 Epic #78647 以 20/20 完成状态正式关闭，Telegram 适配器分解 PR 将 adapter.py 从 10,147 行压缩至 1,390 行；但同一战役的 9 个 gateway/run.py 分解切片 PR 自 08-03 起已待合并约 13 天，**合并速度（2 条/日）远低于新增 PR 速度，存在明显合并瓶颈**。Bug 热点集中在 Windows 安装/更新链路与 Desktop 壳层稳定性上，安全方面有一条危险命令检测绕过问题（#84551）待处理。整体判断：项目处于"重构成果丰硕、平台稳定性债务待偿"的阶段，社区参与度高。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

**合并/关闭的 PR（2 条）：**

- [#66512](https://github.com/NousResearch/hermes-agent/pull/66512)（feat）— 在 `HERMES_DUMP_REQUESTS` 基础上新增**模型响应转储**能力，请求/响应成对落盘，提升调试与审计可观测性。关闭 #66530。
- [#13746](https://github.com/NousResearch/hermes-agent/pull/13746)（fix）— 合并了 4 个月的长寿 PR，一次性修复三处本地体验问题：Telegram DM 会话提示词开销裁剪、NVIDIA curated catalog 选择与 fallback 稳定化、TUI 状态栏换行重影。

**架构里程碑：**

- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) [CLOSED] **大型文件分解 Epic 收官**（78 评论，20/20 完成）。项目确立长期政策：*"all god files are sharded, never reverted"*（所有 god 文件一律分片，永不回退）。配套 PR [#79010](https://github.com/NousResearch/hermes-agent/pull/79010) 完成 Telegram adapter.py 全量分解（10 个 mixin，10,147 → 1,390 行，-86%），是本次战役中单体文件拆解幅度最大的成果。
- gateway/run.py 分解系列 9 个切片（#77719、#77723、#77733、#77737、#77738、#77741、#77748、#77751、#77759，均属 #54962）仍滞留待合并队列，部分切片已声明"逐字节搬移、零行为变更"，review 成本应较低。

**Issue 关闭亮点（8 条中）：**

- [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) **Windows 更新自锁 `cryptography._rust.pyd`** 问题关闭——更新进程自身持有 .pyd 映射导致任何 cryptography 升级报 os error 5。这是 Windows 用户更新失败的高频根因，修复价值大。

## 4. 社区热点

- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647)（78 评论，已关闭）— **大型文件分解战役总结帖**。社区围绕"god-file 分片"政策展开充分讨论，是近期最受关注的质量治理议题；评论数与 Epic 身份匹配，反映用户对代码可维护性的在意程度。
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616)（36 评论，机器人上报）— **Skills index 新鲜度持续告警**：索引已 29.8h 未更新（上限 26h），状态 `degraded`。该问题自 07-18 创建以来滚动近一个月，评论区已积累大量"+1"式关注，文档站数据管线的可靠性亟待修复。
- [#4178](https://github.com/NousResearch/hermes-agent/issues/4178)（11 评论，已关闭）— python-olm 构建失败。升级脚本对本地改动的 `git stash` 处理引发讨论，用户反馈"报错但不影响行为"的矛盾体验。
- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327)（9 评论，P1）— **Linux .desktop 启动器静默失败**：Electron chrome-sandbox 缺少 setuid 4755 时无窗口、无错误弹窗直接退出。该问题已开放近 2 个月仍无 fix PR，Linux 桌面用户体验受损。

## 5. Bug 与稳定性

按严重程度排列：

**安全边界（P2，建议优先处理）：**

- [#84551](https://github.com/NousResearch/hermes-agent/issues/84551) — `detect_dangerous_command` 仅剥离窄集合包装命令，**`timeout` 或 `bash -c` 包装后危险命令被判定为安全**，绕过审批门禁直接执行。暂无 fix PR。

**高危功能故障（P2）：**

- [#87309](https://github.com/NousResearch/hermes-agent/issues/87309) — `delegate_task` 在目标 CLI（如 Claude Code v2.x）不支持 `--acp` 时**挂起整个父 agent 约 600s**（默认 child_timeout），浪费时间与 token。新上报，无 fix。
- [#87310](https://github.com/NousResearch/hermes-agent/pull/87310) 对应修复 **#87292**：慢速本地模型（>16 TPS 场景）被 180 秒 reasoning 下限误杀，报 WinError 10053 / "Provider has been unresponsive"。PR 已提交，保留 hosted 模型看门狗、放宽本地推理窗口。
- [#84371](https://github.com/NousResearch/hermes-agent/issues/84371) — **上下文压缩死循环**：deepseek-v4-flash（1M ctx，阈值 0.35）会话中 preflight 估算 367K tokens 触发压缩，但 tail-budget 将整个 transcript 作为尾部保护（middle=0），每次压缩无效、无限循环。
- [#87295](https://github.com/NousResearch/hermes-agent/issues/87295) — Desktop **二次启动静默杀死运行中实例的后端进程**，Electron 窗口存活但连接状态断裂（新上报）。
- [#87280](https://github.com/NousResearch/hermes-agent/issues/87280) — cron 生命周期守卫（#30719）对 bash 算术除法 `$(( x / y ))` 误报，错误拦截合法 `--no-agent` 脚本。
- [#87268](https://github.com/NousResearch/hermes-agent/issues/87268) — `install.sh --commit <short-sha>` 静默失败：fetch 被 `|| true` 吞掉、checkout 误解析为 pathspec，**最终安装在未固定的 main 上却输出成功并 exit 0**。
- [#87051](https://github.com/NousResearch/hermes-agent/issues/87051) — gateway 重启后 `/loop` 响应被投递到错误的 Telegram topic，消息投递一致性受损。

**中低危（P2/P3，桌面端为主）：**

- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) Linux .desktop 静默失败（P1，6 月报告）。
- [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) Desktop 卡在陈旧 "Thinking" 状态（P2，6 月报告，已有 +1）。
- [#73890](https://github.com/NousResearch/hermes-agent/issues/73890) Artifacts/Preview 右侧面板跨 Project 泄漏上下文（P3）。
- [#87200](https://github.com/NousResearch/hermes-agent/issues/87200) subagent 超时后 "computing… / 1 Alt ajan" 指示器卡死至重启（P2，Windows）。
- [#85868](https://github.com/NousResearch/hermes-agent/issues/85868) macOS 实时自更新后**旧 renderer 残留**、空白刷新与过期退出守卫（P2）。
- [#75584](https://github.com/NousResearch/hermes-agent/issues/75584) Windows 中断安装后 hermes.exe 缺失 + node_modules ENOTEMPTY + Desktop "UPDATE DIDN'T FINISH"（P2）。

**今日已关闭的修复：**

- [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) Windows 更新自锁 .pyd 问题。
- [#69107](https://github.com/NousResearch/hermes-agent/issues/69107) 多客户端写入同一 session 时 `truncate_before_user_ordinal` 因内存历史陈旧而拒绝合法 ordinal。
- [#85496](https://github.com/NousResearch/hermes-agent/issues/85496) auth_middleware 对 desktop `/api/ws?token=` 升级返回 401 导致启动循环（macOS arm64）。

## 6. 功能请求与路线图信号

- [#40306](https://github.com/NousResearch/hermes-agent/issues/40306) **Auto reasoning mode（ChatGPT 风格）**——`reasoning_effort` 目前仅接受固定值，用户希望系统自动判断何时思考、何时直答。已开放 2 个月+、长期无维护者回应，是呼声最高的体验类需求，有进入下一版本的潜力。
- [#86986](https://github.com/NousResearch/hermes-agent/issues/86986) **Termux 原生 pkg 安装/升级作为 Android 一等路径**——用户指出 rolling Termux 非 manylinux 宿主，完整原生依赖图构建是 Android 端多种安装失败模式的共同根因。
- [#87267](https://github.com/NousResearch/hermes-agent/issues/87267) 新增 **MAX（VK 旗下俄罗斯即时通讯）平台插件**——目前 Hermes 无俄语区平台支持，区域化扩展信号。
- [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) **Discord Feature Parity 战役 meta-issue**（API v10 / discord.py 2.7.1）——平台对齐是当前 gateway 侧重点方向。
- [#82591](https://github.com/NousResearch/hermes-agent/issues/82591) Kanban **零权威 workers + 持久化发布 + 安全回收**完整实施计划（3 部分，附 SHA-256 校验）——编排能力演进的路线图级文档。
- [#83565](https://github.com/NousResearch/hermes-agent/issues/83565) **子进程凭据继承闭环战役 Epic**（锚定 #77027）——敏感环境变量不外泄给模型编排的子进程，安全加固方向。
- **"自动行为透明化"是近期设计主题**：PR [#87313](https://github.com/NousResearch/hermes-agent/pull/87313) 要求 `hermes kanban init` 披露自动 fan-out 行为；PR [#87311](https://github.com/NousResearch/hermes-agent/pull/87311) 要求插件声明是否编排 agent/自动派发任务，否则拒绝激活。
- PR [#87312](https://github.com/NousResearch/hermes-agent/pull/87312) Desktop Capabilities 页**全视图 profile 作用域**（Skills/Tools/MCP/Browse Hub）+ Skills 一键安装——桌面端体验继续增强，紧随 #86548。

## 7. 用户反馈摘要

- **Windows 更新链路是最集中的痛点**：#83569（今日修复）与 #75584（中断安装后遗症）指向更新流程脆弱；#87268 进一步暴露安装脚本对短 SHA 静默降级。用户的典型不满是"工具报告成功，实际状态与预期不符"。
- **本地模型用户感到被慢速推理惩罚**：#87292 用户明确表示 >16 TPS 的本地模型会被连接中止/无响应误杀。PR #87310 已回应此诉求，但用户希望可配置、可预期，而非固定 180 秒。
- **桌面端会话状态管理不成熟**：#87295（二次启动杀后端）、#50159（卡 Thinking）、#87200（subagent 超时卡指示器）共同指向 Electron 壳层在**多实例生命周期与会话一致性**上的短板。
- **安全敏感用户主动上报绕过链**：#84551 用户以 `timeout`/`bash -c` 包装验证出危险命令检测绕过，属高质量白帽反馈；同思路的兄弟问题由 #83565 战役统一收口。
- **高级用户提供可复现参数**：#84371 给出完整 token 预算（367K 预估 / 350K 阈值 / middle=0）和模型版本，便于维护者直接复现压缩死循环。

## 8. 待处理积压

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) **Skills index 退化告警持续近 30 天**（07-18 创建，36 评论）——自动化探针反复失败，文档站数据管线长期不健康，建议优先修复 `.github/workflows/skills-index.yml` 链路。
- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) Linux .desktop 启动失败（P1，06-23 创建）——**近 2 个月无 fix PR**，直接影响 Linux 桌面用户基本可用性。
- [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) Desktop 卡 "Thinking" 状态（P2，06-21 创建）——已 8 周未修复，是桌面端被提及最多的体验缺陷之一。
- [#40306](https://github.com/NousResearch/hermes-agent/issues/40306) Auto reasoning 功能请求（06-06 创建）——长期无维护者回应，建议明确是否进入路线图。
- **PR 合并瓶颈**：48 条 PR 待合并，gateway/run.py 分解切片系列（#77719、#77723、#77733、#77737、#77738、#77741、#77748、#77751、#77759）自 08-03 起已等待约 13 天，且多为"零行为变更"的纯搬移，review 成本可控。同时 #66512、#13746 两条 PR 分别等待了 1 个月和近 4 个月才被合并——**建议维护者安排集中批量 review**，避免大型重构分支长期漂移产生冲突，也避免社区贡献者流失。

---

*报告基于 2026-08-16 抓取的 GitHub 公开数据生成，数据窗口为过去 24 小时。所有条目均附上游链接，可点击跳转核实。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-08-16**  
**数据窗口：过去 24 小时（截至 2026-08-15）**

---

## 1. 今日速览

PicoClaw 项目过去 24 小时活跃度处于**低水平**：无新开或关闭的 Issue，无新版本发布，社区讨论近乎静默。值得关注的是，两条待合并的 PR（#3321、#3320）自 8 月 7 日创建以来已积压 9 天，均已标记为 `[stale]`，且更新停留在 8 月 15 日，说明维护者尚未给予明确处理。整体来看，项目当前处于**维护调整期**：一方面有实质性的修复与优化在排队，另一方面社区反馈与互动明显不足，需警惕贡献者热情减退的风险。

---

## 2. 版本发布

**无**（过去 24 小时无新 Release）。

---

## 3. 项目进展

今日无 PR 被合并或关闭，**没有已落地的代码变更**。但两条待合并 PR 揭示了项目正在推进的两个方向：

- **WhatsApp 原生渠道修复**（PR #3320）：通过升级 `whatsmeow` 依赖解决 WhatsApp 官方拒绝旧客户端版本的问题。若合并，将重新打通 WhatsApp 通道，直接影响使用该渠道的用户。
- **前缀缓存优化**（PR #3321）：调整动态上下文块在系统消息中的位置，以保留前缀缓存命中率。这属于性能基建优化，对长会话场景下的推理成本有积极意义。

虽然今日无实际合并，但上述 PR 若被采纳，将分别带来 **渠道可用性恢复** 和 **推理性能提升** 两方面的进展。

---

## 4. 社区热点

**今日无高热度讨论。** 两条 PR 的评论数和 👍 数均为 0，无明显社区互动。这一现象本身值得注意：PR 积压一周却毫无评论，可能意味着维护者注意力分散，或贡献者之间缺乏有效的协作沟通。

- [PR #3321](https://github.com/sipeed/picoclaw/pull/3321) — 评论: 0 | 👍: 0
- [PR #3320](https://github.com/sipeed/picoclaw/pull/3320) — 评论: 0 | 👍: 0

---

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 关联 PR |
|---------|--------|------|--------|
| 🔴 高 | WhatsApp 原生渠道完全不可用：官方拒绝当前客户端版本，连接建立后约 5 秒被断开并报 `Client outdated (405)`，且无自动重连逻辑 | 已有修复 PR，**待合并** | [#3320](https://github.com/sipeed/picoclaw/pull/3320) |
| 🟡 中 | 前缀缓存命中率受损：动态上下文块位于系统消息中会话历史之前，导致每次请求的缓存 token 前置部分失效，增加推理开销 | 已有优化 PR，**待合并** | [#3321](https://github.com/sipeed/picoclaw/pull/3321) |

今日无新报告的 Bug 或崩溃。但上述两个问题均为**持续性积压问题**，特别是 WhatsApp 渠道故障已持续至少 9 天，影响面较大。

---

## 6. 功能请求与路线图信号

今日无新的功能请求提交。不过从 PR #3321 的技术方向来看，项目正在关注**长会话场景下的推理效率**——将动态上下文（时间、运行时、会话信息）移动到历史之后，本质上是为更长对话、更大上下文窗口做性能储备。这可能预示着后续版本会更强调**长时间运行的 Agent 场景**或**低成本多轮对话**能力。

PR #3320 则表明项目对**外部平台连接健壮性**的重视，修复后或许会引入更完善的依赖版本管理或连接状态监控机制。

---

## 7. 用户反馈摘要

由于今日无新 Issue 评论，无法提炼直接的用户声音。但结合 PR 摘要可以推断：

- **使用痛点**：WhatsApp 原生通道故障直接影响依赖该渠道作为入口的终端用户，且 9 天未修复，可能迫使部分用户切换到临时方案或放弃使用。
- **开发者诉求**：两条 PR 均来自同一贡献者（grrowl），且包含完整的技术分析与修复方案，表明外部贡献者活跃度高、技术投入充足。但缺乏维护者的及时反馈，可能影响后续贡献持续性。

---

## 8. 待处理积压

以下 PR 已积压超过一周，均标记 `[stale]`，请维护者优先评估：

| 编号 | 标题 | 创建时间 | 最后更新 | 积压天数 | 链接 |
|-----|------|---------|---------|---------|------|
| #3321 | fix(agent): move dynamic context after history to preserve prefix caching | 2026-08-07 | 2026-08-15 | 9 天 | [PR #3321](https://github.com/sipeed/picoclaw/pull/3321) |
| #3320 | fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)" | 2026-08-07 | 2026-08-15 | 9 天 | [PR #3320](https://github.com/sipeed/picoclaw/pull/3320) |

**建议**：PR #3320 属于高影响修复，建议尽快合并或明确反馈；PR #3321 属于优化性改动，可安排 review 后合入下一版本。长时间搁置可能导致补丁冲突、分支过期，并削弱贡献者积极性。

---

*本报告基于 GitHub 公开数据自动生成，数据截止 2026-08-15 24:00 UTC。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-16

> 数据来源：NanoClaw GitHub 仓库（概览中为 `qwibitai/nanoclaw`，PR 链接显示为 `nanocoai/nanoclaw`，疑因仓库转移/更名导致路径不一致）

## 1. 今日速览

过去 24 小时项目处于「高 PR 产出、零 Issue 波动」的密集开发期：共 22 条 PR 更新（19 条待合并、3 条关闭/合并），无新 Issue 产生或关闭，无新版本发布。PR 由核心团队主导，贡献者 gavrielc 单日提交 14 条 [core-team] PR，覆盖权限拦截、跨会话上下文、渠道适配器能力、交付钩子等模块，且带内部代号（A1-A8/C4），显示项目正按计划推进一次大规模架构升级。值得关注的是，2 月提出的「更名 DotClaw + 从 WhatsApp 切换至 Telegram」PR（#37）于今日关闭，可能意味着项目战略方向的重大决策落地。整体活跃度高，但 19 条 PR 积压待合并，review 环节存在瓶颈。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并 3 条 PR：

- **[#37] Rename to DotClaw and switch from WhatsApp to Telegram**（【已关闭】）— 项目级更名与渠道切换 PR，自 2026-02-02 创建、历时 6 个月后关闭。内容涉及全代码库更名 *dotclaw*、以 Telegraf 库替换 WhatsApp 集成为 Telegram bot、移除旧品牌资产与 WhatsApp 认证代码。⚠️ 数据未区分 merged/closed 状态，建议维护者对此决策发布说明（无论合并或拒绝），以消除社区对项目方向的猜测。链接：https://github.com/nanocoai/nanoclaw/pull/37

- **[#3268] fix(poll-loop): stopped loops leaked their active query's follow-up poller**（【已关闭/合并】）— 稳定性修复：轮询循环停止后，活跃查询的 500ms 跟进轮询器未释放，造成资源泄漏。根因是 `runPollLoop` 仅在迭代间检查 signal，而循环常驻于 `processQuery` 的开放流上。链接：https://github.com/nanocoai/nanoclaw/pull/3268

- **[#3117] feat(skill): add-omachy-statusbar — Waybar 状态指示器技能**（【已关闭/合并】）— 生态技能新增：为 Linux 桌面 Waybar 提供 NanoClaw 运行状态指示。链接：https://github.com/nanocoai/nanoclaw/pull/3117

整体评价：虽仅 3 条关闭，但含一个战略性 PR 与一个核心引擎修复；同时 19 条待合并 PR 中 14 条为 core-team、9 条已标注 follows-guidelines，代码质量门槛已过，项目正处于「功能批量落地前夜」。

## 4. 社区热点

注：本次数据未提供评论数（undefined），以下基于内容影响面与生命周期推断。

- **#2752 fix: stage inbound attachments that expose only a url (Discord)** — 6 月 12 日创建、已悬置 2 个月的 Discord 附件修复。痛点明确：Discord 粘贴文本（自动转 `message.txt`）与图片对 agent 不可读，仅显示 `[file: message.txt]` 占位符而无字节/路径，是社区用户高频可感知的功能缺陷，隐含较强等待情绪。链接：https://github.com/nanocoai/nanoclaw/pull/2752

- **#37 更名与 Telegram 切换** — 6 个月生命周期、今日关闭，涉及项目品牌与集成重心，但凡涉及「放弃 WhatsApp」「改名」的讨论都会引发社区观望。链接：https://github.com/nanocoai/nanoclaw/pull/37

- **#3250 fix(telegram): drop the legacy-Markdown sanitizer** — Telegram 用户可见的排版回归：`**bold**` 被降级渲染为斜体。PR 直指历史技术债（旧 sanitizer 头注释已声明可删除），是「技术债伤害用户体验」的典型样本。链接：https://github.com/nanocoai/nanoclaw/pull/3250

- **gavrielc 的 14 条 PR 集群（#3252-#3268）** — 单日 14 条高质量 core-team PR 且带内部编号（A1-A8/C4），是当前最活跃的开发前线，说明核心团队正进行一场有计划的架构战役，值得社区关注。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | PR | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 严重 | [#3251](https://github.com/nanocoai/nanoclaw/pull/3251) | Claude API 限流时心跳文件 30+ 分钟不更新，容器被误判 stale 而误杀 | 有 open fix（DawoudIO） |
| 🔴 严重 | [#3252](https://github.com/nanocoai/nanoclaw/pull/3252) | 无 `.heartbeat` 文件的空闲容器永久豁免绝对上限清理，形成僵尸容器 | 有 open fix（gavrielc） |
| 🟠 高 | [#3254](https://github.com/nanocoai/nanoclaw/pull/3254) | 入站批次选择仅取最新 N 行，context 行（trigger=0）可把到期任务行挤出批次，造成「唤醒了但任务未执行」 | 有 open fix（两阶段选择） |
| 🟡 中 | [#3268](https://github.com/nanocoai/nanoclaw/pull/3268) | 轮询循环停止后活跃查询的跟进轮询器泄漏 | 已修复并关闭 ✅ |
| 🟡 中 | [#2752](https://github.com/nanocoai/nanoclaw/pull/2752) | Discord 入站附件（文本/图片）无字节与路径，agent 完全不可读 | 有 open fix（2 个月未合并） |
| 🟡 中 | [#3255](https://github.com/nanocoai/nanoclaw/pull/3255) | 多适配器实例共享同一 `(channel_type, platform_id)` 时，外发投递解析到确定性但任意的兄弟实例 | 有 open fix |
| 🟢 低 | [#3250](https://github.com/nanocoai/nanoclaw/pull/3250) | Telegram 加粗被降级为斜体（legacy Markdown sanitizer） | 有 open fix |

值得注意：#3251 与 #3252 同属容器心跳/生命周期模块，叠加效应是「该杀的乱杀、不该杀的不杀」，建议优先合入这两个修复，以提升生产环境稳定性。

## 6. 功能请求与路线图信号

今日无新 Issue，但 19 条待合并 PR 本身就是最强的路线图信号。按功能域归类：

- **权限与审批流**：[#3266](https://github.com/nanocoai/nanoclaw/pull/3266) 在注册卡片构建前增加渠道注册拦截接缝（interceptor seam）；[#3260](https://github.com/nanocoai/nanoclaw/pull/3260) 新增第四种未知发送者策略 `decline_notify`——礼貌拒绝 + 一行 owner 通知，不弹审批卡。
- **渠道适配器能力**：[#3261](https://github.com/nanocoai/nanoclaw/pull/3261) setTyping 增加状态行/statusKind、setThreadTitle、setSuggestedPrompts 可选能力透传；[#3262](https://github.com/nanocoai/nanoclaw/pull/3262) Chat SDK 桥的 DM 面扩展（app_context 捕获、DM 线程 ID 归一化、dm-opened 钩子）。
- **跨会话上下文**：[#3257](https://github.com/nanocoai/nanoclaw/pull/3257) 跨会话上下文模块（fan-out、DM backfill、echo 裁剪 + `ncl sessions history` 命令）；[#3256](https://github.com/nanocoai/nanoclaw/pull/3256) `messaging_groups.detached_at` 迁移（022），投递拒绝进入已脱离会话。
- **生命周期与交付**：[#3263](https://github.com/nanocoai/nanoclaw/pull/3263) 渠道注册表热启动已注册适配器；[#3264](https://github.com/nanocoai/nanoclaw/pull/3264) 未投递批次的 `registerDeliveryBatchPreview` 钩子（用于预取）。
- **Agent 间协作**：[#3265](https://github.com/nanocoai/nanoclaw/pull/3265) `CreateAgentOptions.suppressCreatedNotify`，抑制创建成功通知但保留错误通知。
- **工具链**：[#3259](https://github.com/nanocoai/nanoclaw/pull/3259) skill-apply 标题序号剥离、无头浏览器 URL 透出、继承脚本提取；[#3253](https://github.com/nanocoai/nanoclaw/pull/3253) fix(opencode) 尊重 group reasoning effort。
- **生态**：[#3117](https://github.com/nanocoai/nanoclaw/pull/3117) Waybar 状态栏技能（已合并）。

结合 #37 与 #3250 判断：**Telegram 集成是明确的下一阶段重点**；权限/审批（#3260/#3266）与跨会话上下文（#3257/#3256）将是后续版本的核心能力。

## 7. 用户反馈摘要

从本日 PR 描述中提炼的真实痛点与使用场景：

- **Discord 用户**：粘贴文本和图片对 agent「不可见」——只有 `[file: message.txt]` 占位符，无内容无路径，桥接层对 Discord 附件模型适配不完整（#2752）。
- **Telegram 用户**：agent 输出的粗体全部变斜体，Markdown 渲染长期损坏，直接影响输出可读性（#3250）。
- **运维/容器用户**：API 限流 30 分钟即触发心跳超时误杀；无心跳文件的空闲容器又永不回收，生产环境「误杀/漏杀」并存（#3251/#3252）。
- **技能作者**：skill-apply 步骤标题直接取用 SKILL.md 原文，导致「2.」被当成步骤号渲染，多技能/跳步场景下序号混乱（#3259）。
- **多身份/多实例运营者**：同一房间多个 bot 身份时，外发消息可能路由到错误的兄弟实例，影响多账号运营（#3255）。

## 8. 待处理积压

- **[#2752]（2026-06-12 创建，悬置 2 个月）**：Discord 附件暂存修复。社区用户高频反馈的可用性 bug 长期未合并，已形成明显积压，建议维护者给出 review 或合并计划。链接：https://github.com/nanocoai/nanoclaw/pull/2752

- **19 条待合并 PR**：其中 14 条为 [core-team]、9 条带 [follows-guidelines] 标签（#3252-#3268 系列），已过贡献规范检查，卡在维护者合并环节。建议按依赖顺序批量合入，优先 #3251/#3252 两个容器生命周期修复，再处理 #3254/#3255/#3268 等引擎正确性修复。

- **[#37]（2026-02-02 创建，今日关闭）**：战略性 PR 虽已关闭，但若为「未合并关闭」，建议维护者发布说明解释为何放弃 DotClaw 品牌或 Telegram 切换计划，避免社区对项目方向产生猜测；若为「已合并关闭」，则需尽快同步迁移文档与仓库路径。链接：https://github.com/nanocoai/nanoclaw/pull/37

---

**项目健康度总评**：核心开发活跃度极高（单日 22 条 PR），代码质量受控（follows-guidelines 比例高），但 Issue 侧静默（0 条）与 review 积压（19 条）提示社区反馈通道与合并效率存在瓶颈。短期健康度良好，中期需关注战略决策（#37）的透明沟通与容器生命周期修复的合入进度。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-16

> 数据窗口：过去24小时 | 来源：[github.com/nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)

---

## 1. 今日速览

过去24小时内，NullClaw 保持**温和但方向明确**的活跃度：新增 1 个功能请求（#988 proxy support），新增 1 个待合并 PR（#987 agent loop hygiene），无新版本发布，无 Bug 类 Issue 报告，也无合并/关闭事件。从内容看，今日更新集中在 **网络接入能力（代理支持）** 与 **长任务本地执行稳定性（循环卫生）** 两个维度，表明项目正在从功能扩张期过渡到基础设施打磨期。整体而言，社区贡献意愿仍在，但维护者响应速度与 PR 合并效率将成为接下来项目健康度的关键指标。

---

## 2. 版本发布

**今日无新版本发布。**

---

## 3. 项目进展

今日**没有 PR 被合并或关闭**，唯一的 PR #987 仍处于待评审状态，因此项目主线暂无直接推进。

值得注意的进展是 [PR #987: feat(agent) — loop hygiene for long local tool-heavy runs](https://github.com/nullclaw/nullclaw/pull/987) 的提出。该 PR 针对 agent 在长时间、高密度本地工具调用场景下的运行时稳定性，改动点包括：

- **系统提示词结构重构**：拆分为缓存友好的稳定前缀（`buildStablePrefix`）+ 变动日期尾部（`buildVariableTail`），并引入 `stablePrefixHash`，有助于利用 LLM provider 侧的 prompt caching，降低长任务 token 成本和延迟。
- **工具输出压缩**：在注入历史前对工具输出进行压缩（`result_compress.zig`），同时保留 observer 日志中的完整输出，减少上下文膨胀。
- **逐轮重复调用检测**：增加 per-turn identical-call 循环检测，避免 agent 在长流程中反复执行同一工具调用。

**项目推进度评估**：虽然该 PR 尚未合并，但它的出现本身就说明社区/开发者正在主动解决长时运行任务中的真实稳定性痛点。一旦通过 code review 并合并，将直接提升 NullClaw 在 autonomous agent / 本地工具调用场景下的可靠性和经济性。

---

## 4. 社区热点

数据窗口内所有条目互动量均为 0，因此不存在“评论最活跃”的 Issue/PR。但有两个**最值得关注**的更新：

### 🔸 [Issue #988: [enhancement] proxy support](https://github.com/nullclaw/nullclaw/issues/988)
- 来源：用户 anpic
- 类型：功能请求
- 诉求：为 LLM provider 接入添加 **HTTP(s) 与 SOCKS5h 代理支持**
- 分析：这是一条典型的“网络环境受限”用户诉求。提出者要求支持 `SOCKS5h`（远端 DNS 解析），说明其需求并非简单的正向代理，而是涉及更底层、更安全的流量转发场景——例如中国大陆开发者访问 OpenAI/Anthropic 等海外 API、企业内部网络经过代理网关访问外部模型服务、或者通过 Tor/SSH 隧道增强隐私。此类需求在 AI 工具类开源项目中长期处于高频位，若 NullClaw 定位为个人 AI 助手，则代理能力几乎是“接入全球模型服务”的刚需前置条件。

### 🔸 [PR #987: feat(agent) — loop hygiene for long local tool-heavy runs](https://github.com/nullclaw/nullclaw/pull/987)
- 来源：开发者 vernonstinebaker
- 类型：代码贡献
- 分析：该 PR 代表的是“重试、长跑、高负载”真实使用场景下的技术债偿还。作者显然在实际跑长任务时遇到了上下文膨胀、token 成本超支、提示词缓存失效等问题。虽然没有评论互动，但“直接上代码”本身就是一种强烈的社区反馈。

> 一句话总结社区热点：**用户侧在呼唤更开放的连接方式（proxy），开发者侧在自我修复长任务稳定性（loop hygiene）。**

---

## 5. Bug 与稳定性

**今日没有报告任何 Bug、崩溃或回归问题。**

不过 PR #987 实质上是对一类稳定性隐患的主动修复，值得作为“潜在风险缓解”信号：

| 关联变更 | 风险类型 | 说明 |
|---|---|---|
| 工具输出压缩 | 上下文爆炸 | 长任务中工具输出大量注入历史，可能导致 context overflow 或 token 成本暴增；压缩可在不损失 observer 观测能力的前提下缓解 |
| 提示词前缀拆分为 stable + variable | Prompt Cache 效率低下 | 每次带时间戳的 system prompt 导致 provider 侧 cache 失效；拆分后可稳定复用缓存，降低长任务成本 |
| 相同调用循环检测 | Agent 死循环/重复执行 | 防止 agent 在长工具链中被重复调用拖垮，提升执行稳定性 |

⚠️ 建议维护者在 review PR #987 时，重点验证 `result_compress.zig` 对非文本/二进制工具输出的兼容性，以及 `stablePrefixHash` 在不同 provider（Anthropic / OpenAI / 本地模型）上的缓存命中效果。

---

## 6. 功能请求与路线图信号

### 新功能请求：Proxy Support（#988）

| 维度 | 说明 |
|---|---|
| 请求内容 | HTTP(s) + SOCKS5h 代理支持，面向 provider 接入层 |
| 相似竞品现状 | 多数主流 AI 开源项目（如 LibreChat、LobeChat、Open WebUI）均已内置代理设置项 |
| 与现有 PR 的关系 | 与 #987 无直接技术关联，#987 聚焦 agent 循环层，#988 聚焦网络传输层 |
| 被纳入下一版本的可能性 | **较高**。理由：① 实现成本相对可控，只需在网络客户端层抽象出代理配置；② 对国内用户、企业网关用户属于“不能没有”的基础能力；③ 该 Issue 只有 0 评论 0 点赞，说明尚未形成社区声量，需要维护者主动跟进表态 |

**路线图信号**：#988 的出现暗示 NullClaw 的用户画像正在从“本地技术爱好者”拓展到“依赖托管模型 API 的普通开发者”。如果维护者将“多 provider 接入体验”作为近期重点，代理支持大概率会进入下一个 minor 版本的 backlog。

---

## 7. 用户反馈摘要

当前数据窗口内未产生任何 Issue/PR 评论，因此没有直接的用户言论可供提炼。但可以基于 Issue/PR 的提交行为做间接的用户反馈解读：

- **来自 #988 的反馈**：用户 anpic 选择用最简描述（“please add HTTP(s) and SOCKS(5h) proxy support for providers”）提交 issue，并且未填写 Motivation。这种“不解释背景”的提交方式，通常意味着提交者认为该需求“不需要解释”或“直接了当”——侧面说明 **代理支持在部分用户认知中已属于基础能力缺失**，而非锦上添花。
- **来自 #987 的反馈**：作者 vernonstinebaker 用完整实现来表达自己的痛点——**长周期、本地工具密集的 agent 任务中，token 成本与运行稳定性是最核心的阻碍**。这不仅是一个 Patch，更是对产品定位的一种信号：**NullClaw 正在被用于真实的、长时间无人值守的 agent 工作流**。

> 用户情绪整体中性偏正面：没有人报 Bug、没有人表达不满，有人愿意花时间做开发贡献。社区氛围健康，但缺少来自维护者的公开响应与 roadmap 确认。

---

## 8. 待处理积压

当前数据窗口内**没有发现长期未响应的重要 Issue/PR**（#988 和 #987 均创建于 2026-08-15，属于昨日新增）。但有两个需要关注的动作项：

### ⏳ 待评审 PR：[#987 feat(agent) — loop hygiene](https://github.com/nullclaw/nullclaw/pull/987)
- **状态**：OPEN，待合并
- **积压风险**：该 PR 涉及系统提示词结构变更、新增 Zig 压缩模块、缓存哈希机制，属于跨模块改动，评审成本较高。若维护者不及时 review，容易在下一次代码冲突中丧失合并机会。
- **建议**：48 小时内完成首次评审；至少验证：① 现有集成测试是否覆盖工具输出压缩路径；② provider 缓存类测试是否需要更新。

### 🆕 待响应 Issue：[#988 proxy support](https://github.com/nullclaw/nullclaw/issues/988)
- **状态**：OPEN，无评论、无点赞、无维护者标记
- **积压风险**：功能请求类 Issue 如果 72 小时内没有任何维护者回复（哪怕只是一个 `needs-discussion` 标签），提交者可能会认为项目维护不活跃，社区贡献意愿下降。
- **建议**：维护者尽快标注 `enhancement` / `needs: discussion` 标签，或初步给出“是否纳入路线图”的表态。

### 📌 提醒
虽然当前无积压，但从项目健康度角度出发，**响应速度**是唯一需要盯住的风险。两个 open 条目都是昨日提交，今日已过 24 小时，若明日报中仍未出现维护者动作，实际活跃度评分应下调。

---

*本日报基于 GitHub 公开数据自动生成，供项目维护者与社区跟踪参考。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## IronClaw 项目动态日报 — 2026-08-16

---

### 1. 今日速览

过去 24 小时项目保持高活跃度：**28 条 Issue 更新**（21 条关闭，其中 20 条由维护者 serrrfirat 处理），**13 条 PR 更新**（6 条已合并/关闭）。重点在于**性能优化列车**的批量落地——多项 Tier 1/Tier 2 数据库写入削减（PR #7628、#7629、#7676）已合并，同时 **unbound-turns（prepared-context）架构切换** 的两阶段 PR（#7562、#7634）均已关闭，标志着该大型迁移正式完成。新开 7 条 Issue 全部来自 #7634 的代码审查跟进，属于架构收尾与技术债清理，整体项目健康度良好，主线清晰。


### 2. 版本发布

过去 24 小时无新版本发布，无更新内容可展示。


### 3. 项目进展

**核心架构里程碑：unbound-turns 切换完成**

- **[#7562](https://github.com/nearai/ironclaw/pull/7562) [CLOSED] feat(unbound-turns): design + phase 1 — prepared-context accept door, unbound run lane, kernel binding-ref deletion** — unbound-turns 列车的基础 PR，包含两份设计文档及完整的 phase-1 实现（#7633 squash-merge 至该分支）。
- **[#7634](https://github.com/nearai/ironclaw/pull/7634) [CLOSED] feat(unbound-turns): complete the switchover to prepared-context turns** — 完成全部跟随消息的切换，并对两份设计文档执行了 71 条一致性审计，所有分歧均已闭合或记录。此 PR 关闭意味着 Reborn 运行时已全面切换到 prepared-context 模式。

**性能优化：数据库写入削减批量落地**

- **[#7628](https://github.com/nearai/ironclaw/pull/7628) [CLOSED] perf(processes): remove heartbeat journal churn** — 实现 #7591 中独立安全的子集：停止追加 `ProcessJournalKind::Heartbeat` 行（对应 [#7593](https://github.com/nearai/ironclaw/issues/7593)），心跳租约时间戳保持权威，并将 turn-runner 心跳间隔提升至 15 秒。
- **[#7629](https://github.com/nearai/ironclaw/pull/7629) [CLOSED] perf: reduce trigger and outbound state writes** — 将 trigger run-history 保留修剪从每次 Running 行更新移至首次 fire claim（对应 [#7595](https://github.com/nearai/ironclaw/issues/7595)），保留恢复路径上的完成时修剪以维持严格保留语义。
- **[#7676](https://github.com/nearai/ironclaw/pull/7676) [CLOSED] perf(threads): coalesce thread index touches** — 将突发的每线程活动 touch 合并为有界的 thread-index 写入，并使用单调 CAS 更新保持多 Worker 正确性（对应 [#7596](https://github.com/nearai/ironclaw/issues/7596)）。

**工程基础设施**

- **[#7670](https://github.com/nearai/ironclaw/pull/7670) [CLOSED] chore(agents): refresh codebase knowledge graph** — 由 nightly 工作流自动生成的代码库记忆 bootstrap 快照已刷新。

> **整体评估**：unbound-turns 架构迁移收尾 + 多条性能优化落地，项目在运行时架构统一与持久化负载削减两个方向均取得了实质性推进。上述性能 PR 合计预计可减少每 turn 数十次数据库写入操作。


### 4. 社区热点

**[Issue #467 — Trajectory benchmark system for agent quality evaluation](https://github.com/nearai/ironclaw/issues/467) [OPEN] · 评论 4 · 创建于 2026-03-02 更新于 2026-08-15**

讨论度最高的一条 Issue（4 条评论）。提议构建一个轨迹基准系统，通过真实 LLM 调用运行真实用户场景，并以两层标准评估生成的轨迹：**硬断言**（工具选择、响应内容、成本、延迟）和 **LLM-as-judge**。该 Issue 自 3 月提出以来持续活跃，反映社区对 agent 质量可观测性和标准化评估基础设施的强烈需求。

**[PR #7679 — fix(live-qa): stop harness bugs reddening green canary runs](https://github.com/nearai/ironclaw/pull/7679) [OPEN]**

值得关注的 PR（虽无评论计数）：计划中的 Live Canary 连续 **30/30 次全红**。分析显示多数失败是 harness 缺陷——四个用例中，三个是测试框架误判了**正确的产品行为**，一个是活性代理将具有持久证据的情况误标红。这反映了 CI 基础设施可靠性问题对开发信心的侵蚀。

**[Issue #3236 — Define same-thread follow-up and steering policy](https://github.com/nearai/ironclaw/issues/3236) [CLOSED] · 评论 3**

Reborn 同线程输入策略的规范定义：覆盖普通跟随消息、显式 steering（如 `/btw`）、队列可见性/排序、promotion、取消交互及阻塞运行行为。该 Issue 的关闭（连同 #3423 等系列策略 Issue）意味着 Reborn 的线程行为已从"实现驱动"走向"规范驱动"。


### 5. Bug 与稳定性

**高优先级**

- **[#7675](https://github.com/nearai/ironclaw/issues/7675) [OPEN] E2E: qa_6c gmail-to-sheet flake cascades across the whole provider-contracts session** — 由 henrypark133 新开。两个可分离的问题：`qa_6c_gmail_to_sheet_live_chat` 存在间歇性资源类能力失败；且该 flake 会级联污染整个 provider-contracts 测试会话。已排除 #7634 是诱因（有证据），但当前仍无 fix PR。**影响 CI 稳定性。**

**中优先级（均已关闭，多数已有对应修复）**

- **[#6835](https://github.com/nearai/ironclaw/issues/6835) [CLOSED] MCP auth failures never raise a re-auth gate** — `McpError::AuthRequired` 被错误归类为 `Client` 而非触发 re-auth 门控，导致认证失败后缺少恢复路径。
- **[#5239](https://github.com/nearai/ironclaw/issues/5239) [CLOSED] Scheduler treats stale terminal heartbeat as runner failure** — turn_scheduler 将已完成运行后的陈旧心跳误判为调度器心跳失败，走错误路径尝试 `Co…`（恢复动作）。虽被 turn store 拒绝转移，但产生错误日志和失败路径。
- **[#6821](https://github.com/nearai/ironclaw/issues/6821) [CLOSED] IronHub search: free-text matches read as a complete catalog listing** — 用户询问 IronHub 可安装内容，agent 报告 3 个工具（实际 catalog 有 18 个）；再次询问列出 21 个技能，其中 20 个并非 catalog 条目。搜索结果的**幻觉问题**，直接影响用户决策。

**低优先级 / 技术债（均已关闭）**

- **[#6726](https://github.com/nearai/ironclaw/issues/6726) [CLOSED] extension host: register_generic_channel_outbound_targets can be a no-op with every test tier green** — 该函数可被替换为 no-op 且所有测试仍通过，是 #6681 审计中唯一的存活变异体。
- **[#7597](https://github.com/nearai/ironclaw/issues/7597) [CLOSED] Remove dead advance_subscription_cursor durable-offset API** — 零生产调用者的死代码，存在未来写入放大的隐患。
- **[#5237](https://github.com/nearai/ironclaw/issues/5237) [CLOSED] Reborn hosted debug logging floods Railway with Cranelift/Wasmtime DEBUG output** — 设置 debug 日志时，Wasmtime/Cranelift 编译器高频时序日志导致 Railway 日志洪水。

**Bug 趋势分析**：今日关闭的 21 条 Issue 几乎全部由核心维护者 serrrfirat 完成，且大量来自内部审计与架构审查（如 #7634 审查产出 7 条跟进 Issue）。这表明项目正在系统性地消除已知技术债，但**长期依赖少数核心维护者的问题值得关注**。


### 6. 功能请求与路线图信号

**#7634 审查产出的架构改进请求（7 条新开，均为 henrypark133 提出）**

这些 Issue 均产生自 #7634 的代码审查线程，虽然体量较小，但指向明确的架构演进方向：

- **[#7672](https://github.com/nearai/ironclaw/issues/7672) Typed ToolChoice: retire the overloaded tool_choice string across providers** — 将 provider-facing 的 `tool_choice: Option<String>`（过度承载模式字符串和工具名）替换为强类型。涉及 rig_adapter、bedrock、gemini_oauth 等 6 个编码器，是跨 provider 抽象层的类型安全改进。
- **[#7674](https://github.com/nearai/ironclaw/issues/7674) Architecture tests: symbol-level allowlist for the openai-compat → threads edge** — 在 crate 级边界检查之上增加 symbol 级白名单，防止依赖边界被绕过。
- **[#7673](https://github.com/nearai/ironclaw/issues/7673) BudgetLedger accounting refinements** — 截断启动窗口的重复计费需在 invoke 前 reconcile，同时需保证计费持久性；当前偏向保守（多计 → 提前停止，绝不超限）。
- **[#7671](https://github.com/nearai/ironclaw/issues/7671) Capability dispatch stack pressure** — 内核沙箱路径的 poll 帧仍接近测试栈上限，修复方案是链式 box 每个端口委托。
- **[#7669](https://github.com/nearai/ironclaw/issues/7669) Prepared-marker backfill: move the per-scope sweep off the listing path** — 首次 list 请求触发的全目录扫描应移出热路径。
- **[#467](https://github.com/nearai/ironclaw/issues/467) Trajectory benchmark system** — 这是一个更大规模的路线图级需求：为 agent 质量评估建立两层（硬断言 + LLM-as-judge）轨迹基准系统。目前已积累 4 条评论，可能作为独立工作流推进。

**可能纳入下一版本的功能方向**

- **[PR #7491](https://github.com/nearai/ironclaw/pull/7491) [OPEN] omp core-tool contract + engines + benchmark arm** — 统一编码工具面：`read`、`write`、`edit`、`glob`、`grep`、`bash` 六个精确裸名称，移除旧的派生 `builtin__*` 拼写与混合表面。这是对 agent 工具调用的重要简化。
- **[PR #7651](https://github.com/nearai/ironclaw/pull/7651) [OPEN] deterministic no-result suppression for automations** — 要求 `trigger_create` 提供 `result_delivery`（由模型根据用户措辞推导），中性措辞确定性回退到 `deliver`。为自动化结果通知增加确定性语义。
- **[PR #7677](https://github.com/nearai/ironclaw/pull/7677) [OPEN] fold message lookup indexes into message rows** — 将消息查找键存储为消息条目的索引投影，替代每条消息 1-3 个兄弟条目行，保留旧版兼容回退。


### 7. 用户反馈摘要

从今日活跃的 Issue/PR 讨论中可提炼以下真实用户痛点与反馈：

- **自动化任务在 Railway 上不稳定**（[#4992](https://github.com/nearai/ironclaw/issues/4992)）：local-dev 实例可创建定时自动化，但触发时在 run/thread 创建前即失败，WebUI 显示 `ERROR`、`No thread attached`、`0% visible runs`。问题指向 SSO 访问不匹配。迁移场景下的配置复杂性是真实摩擦点。
- **模型请求超过 provider 工具数量限制**（[#4407](https://github.com/nearai/ironclaw/issues/4407)）：Reborn 暴露的主机能力已多到单次请求可能超出 OpenAI 等 provider 的 `tools` 数组上限。这直接限制了用户在单轮中可用的工具组合。
- **E2E 测试 flake 干扰开发流程**（[#7675](https://github.com/nearai/ironclaw/issues/7675)）：一次 flake 可级联污染整个 provider-contracts 会话，导致 PR 被标红。开发者需要额外时间区分"测试问题"与"产品问题"。
- **Live Canary 持续红灯消耗信任**（[#7679](https://github.com/nearai/ironclaw/pull/7679)）：30/30 次红灯全部是 harness 缺陷，**正确的产品行为**被误判为失败。这种"狼来了"效应会导致真实回归被忽视。
- **IronHub 搜索幻觉影响用户决策**（[#6821](https://github.com/nearai/ironclaw/issues/6821)）：agent 将自由文本匹配误报为完整 catalog 枚举，用户无法信任搜索结果来规划安装。搜索的意图识别与结果呈现需改进。
- **故障分类错误导致恢复路径缺失**（[#6835](https://github.com/nearai/ironclaw/issues/6835)）：MCP 认证失败被归类为普通客户端错误而非认证需求，意味着用户不会得到 re-auth 引导，只能被动等待失败。


### 8. 待处理积压

**长期未响应的开放 Issue**

- **[#467](https://github.com/nearai/ironclaw/issues/467) [OPEN] Trajectory benchmark system for agent quality evaluation** — 创建于 2026-03-02，已开放近 6 个月，最近一次更新为 2026-08-15，有 4 条评论。该 Issue 是大型路线图级需求，可能被拆分为多个子任务，但目前已连续 6 个月无关联 PR，建议维护者明确其排期或拆分计划。

**待合并的大型 PR（可能需关注 review 带宽）**

以下 4 条 PR 均为 size: XL，且已开放超过 24 小时：

- **[#7491](https://github.com/nearai/ironclaw/pull/7491) [OPEN] omp core-tool contract + engines + benchmark arm** — size: XL，创建于 08-11，已开放 5 天。
- **[#7679](https://github.com/nearai/ironclaw/pull/7679) [OPEN] fix(live-qa): stop harness bugs reddening green canary runs** — size: XL，创建于 08-15，Live Canary 30 连红问题的修复，建议优先处理。
- **[#7678](https://github.com/nearai/ironclaw/pull/7678) [OPEN] persist invocation state at gate and terminal edges** — size: XL，创建于 08-15。
- **[#7677](https://github.com/nearai/ironclaw/pull/7677) [OPEN] fold message lookup indexes into message rows** — size: XL，创建于 08-15。

**新贡献者 PR 需要响应**

- **[#7516](https://github.com/nearai/ironclaw/pull/7516) [OPEN] feat(webui): operator surface for the IronHub agent link** — 由 **neo-sky**（标记为 `contributor: new`）创建于 08-12，已开放 4 天。为 WebUI Extensions 页添加 IronHub 注册链接面板，解决当前只能通过 CLI 完成部署的问题。新贡献者的 PR 应尽快获得 review 反馈以维持其贡献意愿。

**今日关闭的 Issue 与对应修复的关联性良好**（21 条关闭中 20 条由 serrrfirat 处理），但这也意味着**维护者集中度较高**，大部分关闭工作由一人完成，存在 bus-factor 风险。建议关注 review 带宽分配与新贡献者引导。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-16

> 数据来源：[github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | 数据窗口：2026-08-15 ~ 2026-08-16

## 1. 今日速览

过去 24 小时项目**无新 Issue、无新 PR、无新版本发布**，所有更新均来自存量内容的自动化处理：18 条 Issue 更新中 16 条被关闭（全部带 `stale` 标签），仅 2 条保持开放状态；6 条 PR 更新中 4 条为 Dependabot 依赖升级（仍待合并），2 条功能修复型 PR 关闭。整体来看，项目当前处于**存量积压清理期**，主要活动由 stale 机器人和 CI 依赖维护驱动，社区提交与核心开发节奏偏缓，活跃度评估为**中低**。

## 3. 项目进展

今日关闭的 2 条 PR 均为实质性功能修复，分别涉及配置持久化与 cron 子任务调度，是影响真实用户场景的关键补丁：

| PR | 标题 | 状态 | 价值 |
|----|------|------|------|
| [#1879](https://github.com/netease-youdao/LobsterAI/pull/1879) | fix: preserve manually-added plugin load paths on config sync | CLOSED | 修复 OpenClawConfigSync.sync() 写入 openclaw.json 时，**将用户通过 `pm install` 手动添加的插件加载路径静默覆盖**的问题。此前用户安装 community 插件（如 memory-lancedb-pro）后配置会被重置，该修复保障了手动配置与 LobsterAI 托管配置的共存。 |
| [#2234](https://github.com/netease-youdao/LobsterAI/pull/2234) | fix(openclaw): cron yield descendant finalization | CLOSED | 修复 `sessions_yield` 场景下子 Agent 完成事件无法驱动父 Agent 继续执行的问题，并在 cron finalization 阶段增加 yield continuation 循环，覆盖普通会话、cron 并行/串行子 Agent 三种场景。对依赖多 Agent 编排的用户是重要稳定性提升。 |

两项修复分别指向**配置管理可靠性**与**Agent 多轮调度完整性**，是 OpenClaw 生态中高频触发的痛点，建议维护者在下一版本 Release Notes 中明确标注。

## 4. 社区热点

今日活跃讨论全部来自存量 Issue（均于 8 月 15 日被 stale 机制批量关闭或标记），按评论数排序如下：

- **[#1849 追问时会出现无限 NO_REPLY 或输出截断](https://github.com/netease-youdao/LobsterAI/issues/1849)**（4 评论）  
  用户反馈任务被提前 complete 但模型仍在输出，导致页面无数据响应。这直指**流式输出状态管理与任务生命周期不一致**的核心问题，属于影响对话体验的高频 Bug。

- **[#1878 微信接口扫码后无法输入验证码](https://github.com/netease-youdao/LobsterAI/issues/1878)**（4 评论）  
  配置 IM 微信机器人时，新版微信要求输入 6 位验证码，但 OpenClaw 客户端未提供输入界面，导致配置流程中断。反映**IM 接入引导体验不完整**。

- **[#1903 会员登录频繁失败](https://github.com/netease-youdao/LobsterAI/issues/1903)**（3 评论，仍 OPEN）  
  用户反馈登录失败无法使用网易付费模型，附有截图，是目前少有的仍开放且被用户持续关注的问题。

- **[#1988 阿里百炼 coding plan 无法调用 qwen3.6-plus](https://github.com/netease-youdao/LobsterAI/issues/1988)**（3 评论）  
  更新后模型被强制路由到网易自带接口并提示无额度，**修改配置文件无效、系统强制改回**，涉及模型路由逻辑的透明性与用户控制权。

**热点诉求分析**：今日最活跃的话题集中在 **「模型调度控制权」**与**「IM 集成完整性」**。用户普遍期望 LobsterAI 尊重自定义模型配置，并能完整闭环微信等 IM 的引导流程。此类反馈对产品信任度影响较大，建议优先跟进。

## 5. Bug 与稳定性

今日数据中无**新报告**的 Bug，但存量高影响问题集中浮出水面。以下按严重程度排列（⚠️ 注意：多数已关闭 Issue 是 stale 自动清理所致，**不代表问题已修复**）：

| 严重度 | Issue | 状态 | 说明 |
|--------|-------|------|------|
| 🔴 安全 | [#1885 邮箱 SKILL 路径穿越漏洞](https://github.com/netease-youdao/LobsterAI/issues/1885) | CLOSED（stale） | `imap.js` 的 `downloadAttachments` 未过滤附件名直接拼接路径下载，存在路径穿越风险。已附带 PoC 代码，**需确认是否有对应安全补丁**，不应随 stale 流程静默处理。 |
| 🔴 高 | [#1903 会员登录频繁失败](https://github.com/netease-youdao/LobsterAI/issues/1903) | OPEN（stale 标记） | 付费用户无法登录、无法使用网易模型，影响核心付费链路。仍开放，但已 100+ 天未闭环。 |
| 🔴 高 | [#1988 模型路由被强制改写](https://github.com/netease-youdao/LobsterAI/issues/1988) | CLOSED（stale） | 配置文件被系统强制修改，用户无法使用阿里百炼 qwen3.6-plus。属模型路由逻辑缺陷，对开发者用户影响面大。 |
| 🔴 高 | [#2017 本地运行提示缺少内置 runtime](https://github.com/netease-youdao/LobsterAI/issues/2017) | CLOSED（stale） | 本地构建后运行报“未检测到内置 OpenClaw runtime”，附截图，影响开发者本地调试。 |
| 🟠 中 | [#1993 桌面端 AI engine connection lost](https://github.com/netease-youdao/LobsterAI/issues/1993) | CLOSED（stale） | 桌面应用频繁断开连接，但 IM Bot 连接稳定，疑似桌面端网关/会话管理问题。 |
| 🟠 中 | [#1849 追问无限 NO_REPLY / 输出截断](https://github.com/netease-youdao/LobsterAI/issues/1849) | CLOSED（stale） | 任务状态提前 complete 而模型仍在输出，造成前端无响应。 |
| 🟠 中 | [#1971 会话页虚拟滚动异常](https://github.com/netease-youdao/LobsterAI/issues/1971) | CLOSED（stale） | 含超大元素（如 Mermaid）时列表高度剧烈变化，触发无限重渲染，上下滚动异常。 |
| 🟡 低 | [#1878 微信扫码后无法输验证码](https://github.com/netease-youdao/LobsterAI/issues/1878) | CLOSED（stale） | IM 配置流程缺验证码输入界面。 |
| 🟡 低 | [#1920](https://github.com/netease-youdao/LobsterAI/issues/1920) / [#1921](https://github.com/netease-youdao/LobsterAI/issues/1921) | CLOSED（stale） | Cowork 初始化空白加载态、Skills Manager/TaskRunHistory 空状态缺图标与描述，UI 细节待完善。 |

**稳定性评价**：今日无与上述 Issue 对应的新 fix PR 出现。16 条关闭全是 stale 机器人行为，维护者需人工复核，避免真实 Bug 被遗漏。

## 6. 功能请求与路线图信号

| 需求 | Issue | 状态 | 潜在价值 |
|------|-------|------|----------|
| **Agent 记忆体系** | [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) | OPEN | 用户提出高优先级建议：Session 标题/元数据持久化到文件系统、跨会话记忆检索。与 #2040/#2041 对“记忆缺失”核心瓶颈的讨论互相印证，是当前 AI Agent 领域公认的关键方向。 |
| **Hermes Agent 集成** | [#1880](https://github.com/netease-youdao/LobsterAI/issues/1880) | CLOSED（stale） | 参照 Open WebUI 方式将 Hermes Agent 与 OpenClaw 接入，丰富 Agent 生态。 |
| **OpenHuman 引擎** | [#2016](https://github.com/netease-youdao/LobsterAI/issues/2016) | CLOSED（stale） | 用户建议接入 OpenHuman 引擎，拓展多智能体/人类模拟能力。 |
| **UI 专业重设计** | [#1836](https://github.com/netease-youdao/LobsterAI/issues/1836) | CLOSED（stale） | 用户直言界面“过于丑了”，竞品对比后体验差距明显。 |
| **实时落盘事件** | [#2036](https://github.com/netease-youdao/LobsterAI/issues/2036) | CLOSED（stale） | 建议给 OpenClaw gateway 增加 `agent:turn` / `agent:loop` 事件，实现主循环每轮结束后的实时落盘。 |
| **Dreaming 开关修复** | [#2039](https://github.com/netease-youdao/LobsterAI/issues/2039) | CLOSED（stale） | Dreaming 配置写入错误路径，Gateway 重启后丢失，属于 upstream schema 兼容问题。 |

**路线图信号**：在功能优先级上，「记忆体系」呼声最高且呈系列化讨论（#2046、#2040、#2041），建议作为下一阶段核心投入；UI 重设计与模型路由控制权是用户强感知的体验短板，应尽快排期。

## 7. 用户反馈摘要

从今日存量 Issue 评论中提炼真实用户声音：

- **付费受阻与信任危机**：会员登录失败导致“无法使用网易付费的模型”（[#1903](https://github.com/netease-youdao/LobsterAI/issues/1903)），模型路由被强制改写导致“配置了也没用，系统会强制改成错误的”（[#1988](https://github.com/netease-youdao/LobsterAI/issues/1988)），这两类问题直接打击付费用户信心。
- **配置被覆盖的挫败感**：PR [#1879](https://github.com/netease-youdao/LobsterAI/pull/1879) 侧面证实“手动加插件路径被静默清空”是真实存在且影响面广的问题，开发者用户对配置自主权敏感度极高。
- **本地开发者体验不佳**：本地源码运行登录不了、提示缺 runtime（[#2017](https://github.com/netease-youdao/LobsterAI/issues/2017)），增加了贡献者参与门槛。
- **UI 观感成竞品对比短板**：“相比起其他竞品过于丑了，用起来不太舒服”（[#1836](https://github.com/netease-youdao/LobsterAI/issues/1836)），说明产品在视觉工程投入上已影响到用户留存。
- **对记忆与自我进化的深度思考**：用户 `woxinsj` 连续提交多篇分析（[#2040](https://github.com/netease-youdao/LobsterAI/issues/2040)、[#2041](https://github.com/netease-youdao/LobsterAI/issues/2041)），指出“最大瓶颈不是进化算法，而是记忆系统”；用户 `X9-laser` 详细列出了记忆体系落地方案（[#2046](https://github.com/netease-youdao/LobsterAI/issues/2046)），反馈质量较高，值得官方回应。

## 8. 待处理积压

⚠️ 今日 stale 机器人批量关闭了 16 条历史 Issue，存在“误伤真实问题”的风险。建议维护者重点复核以下几项：

### 🔴 高优先级

- **[#1903 会员登录频繁失败](https://github.com/netease-youdao/LobsterAI/issues/1903)**（仍 OPEN）  
  核心付费链路问题，创建超 100 天，有截图证据，尚无官方回复记录。

- **[#2046 Agent 记忆体系产品建议](https://github.com/netease-youdao/LobsterAI/issues/2046)**（仍 OPEN）  
  完整度极高的产品建议（含优先级排序），与当前 Agent 领域热点契合，若长期无响应可能错失社区深度参与者。

- **[#1885 邮箱 SKILL 路径穿越漏洞](https://github.com/netease-youdao/LobsterAI/issues/1885)**  
  安全类 Issue 不应由 stale 机器人自动关闭，需人工确认是否存在对应修复 commit。

### 🟠 中优先级

- **16 条被 stale 关闭的 Issue**：建议逐条筛查，其中 [#1849](https://github.com/netease-youdao/LobsterAI/issues/1849)（NO_REPLY）、[#1988](https://github.com/netease-youdao/LobsterAI/issues/1988)（模型路由）、[#2017](https://github.com/netease-youdao/LobsterAI/issues/2017)（本地 runtime）均为高影响 Bug，若未修复应重新打开并标注计划版本。

- **4 个 Dependabot PR 滞留 2 个月**：  
  [#2164 trufflehog 3.95.5](https://github.com/netease-youdao/LobsterAI/pull/2164) / [#2165 actions/checkout v6](https://github.com/netease-youdao/LobsterAI/pull/2165) / [#2166 paths-filter v4](https://github.com/netease-youdao/LobsterAI/pull/2166) / [#2167 actions/stale v10.3.0](https://github.com/netease-youdao/LobsterAI/pull/2167)  
  均为 CI/安全依赖升级，长期挂起会导致供应链安全风险累积，建议统一评审合并或关闭。

---

**总结**：LobsterAI 今日进入“存量消化”模式，无新增社区输入。值得肯定的是 2 项关键修复（配置持久化、cron 子 Agent 调度）已收口；但大量高影响 Issue 被自动化清理掩盖，若缺乏人工跟进，项目健康度容易在“无事发生”的表象下隐性承压。建议下个迭代周期优先处理：**会员登录、模型路由控制权、安全漏洞复核**三件事。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-16

## 1. 今日速览

过去 24 小时内 Moltis 没有新增或关闭 Issue，也未发布新版本；但 PR 方面推进节奏明显，共 6 条更新，其中 3 条已合并/关闭、3 条待合并。所有 PR 均来自核心贡献者 penso，社区外部参与度相对较低，但内部功能迭代保持高频。项目整体处于「活跃推进功能开发、无用户报告阻塞性问题」的健康状态，重心集中在连接器生态、沙箱后端和 Slack 交互体验三个方向。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 3 个 PR 均进入主线，分别修复了一个真实问题并落地了两项体验增强：

- **修复 ClawHub 技能搜索超时**（[PR #1196](https://github.com/moltis-org/moltis/pull/1196)）：此前每个搜索结果都会触发 ClawHub 元数据请求，容易将 RPC 调用推入超时区域。本次改为直接消费搜索结果元数据，并在详情/扫描/下载/安装流程中携带 owner 限定引用，同时处理了旧版裸 slug 重装的兼容性问题。此项直接改善了技能搜索的可用性和响应速度。
- **从命令面板启动代理会话**（[PR #1197](https://github.com/moltis-org/moltis/pull/1197)）：在命令面板所有非空查询末尾追加「Ask agent immediately」操作，且会话搜索仍在防抖进行时也保持可用。点击后会新建聊天会话并立即发送命令面板中的查询，并在聊天过程中追踪原始会话来源。该功能缩短了用户从灵感输入到获得 AI 回应的路径。
- **OpenAI 推理工具调用路由优化**（[PR #1198](https://github.com/moltis-org/moltis/pull/1198)）：当请求同时包含函数工具与 `reasoning_effort` 参数时，自动路由至 Responses API；若不含工具或未启用推理，则保持 Chat Completions 路径不变，且对 OpenAI 兼容第三方提供商不产生行为变化。流式与非流式请求共用同一套构建逻辑，降低了维护成本。

此外有 3 个 PR 处于开放待合并状态，标志着项目正在向下一个能力阶段推进（详见第 8 节）。

---

## 4. 社区热点

今日没有出现高讨论度的 Issues 或 PRs：Issue 侧零更新，PR 侧 6 条记录的评论数和 👍 数均为 0。所有活动集中在单一贡献者身上，讨论热度数据不足以形成社区热点。从 PR 描述看，今日最可能引发用户兴趣的是 [PR #1195（Slack 原生实时任务卡片）](https://github.com/moltis-org/moltis/pull/1195) 和 [PR #1199（Coder 远程工作区沙箱支持）](https://github.com/moltis-org/moltis/pull/1199)，因为它们直接改变外部用户可感知的功能面。此现象同时提示：项目可能仍处于维护者主导的早期阶段，外部贡献与社区反馈通道尚需进一步激活。

---

## 5. Bug 与稳定性

今日仅有 1 个 Bug 类修复被合并，无新增用户报告的问题，无崩溃或回归记录。

| 严重程度 | 问题描述 | 状态 |
|---|---|---|
| 低 | ClawHub 技能搜索结果因每个结果额外的元数据请求导致 RPC 超时，技能搜索功能不可用或极慢 | 已由 [PR #1196](https://github.com/moltis-org/moltis/pull/1196) 修复 |

该问题属于性能/超时类故障，不涉及数据损坏或安全风险，修复方案直接、影响面可控。

---

## 6. 功能请求与路线图信号

当前没有用户显式提出的新功能请求，但 3 个开放 PR 清晰地勾画出下一阶段路线图：

- **异地沙箱支持**：[PR #1199](https://github.com/moltis-org/moltis/pull/1199) 为 Coder 添加沙箱后端，通过 REST API 创建临时工作区并通过 reconnecting PTY WebSocket 执行命令，支持模板 ID/名称、预设、丰富参数、TTL、环境别名及自动后端选择。这是对远程/云开发场景的一次重要补位。
- **持久化连接器基础**：[PR #1190](https://github.com/moltis-org/moltis/pull/1190) 引入 Provider 无关的连接器持久化、原子快照、调度与投影、受限的本地全文搜索，并新增只读 CalDAV、Gmail、Himalaya v2 和可复用的频道历史数据集。该 PR 自 8 月 11 日开放，属于地基性工作，合并后有望解锁大规模日历/邮件/频道集成。
- **Slack 原生任务卡片**：[PR #1195](https://github.com/moltis-org/moltis/pull/1195) 将工具生命周期更新渲染为 Slack 原生 plan/task 卡片，使用不透明 per-run ID 保护卡片隐私，并对失败流进行终端错误清理。该功能强化了 Moltis 在 Slack 工作流中的嵌入深度。

综合判断，下一版本的重点方向大概率是：远程开发沙箱、跨平台连接器（日历/邮件/频道）、以及 Slack 端的交互升级。

---

## 7. 用户反馈摘要

由于过去 24 小时内没有新增或更新的 Issues，也没有 PR 评论数据，当前阶段缺乏来自用户的直接反馈。从既有 PR 内容反推，可获得的有限信号包括：

- 技能搜索性能问题（已修复 #[1196](https://github.com/moltis-org/moltis/pull/1196)）说明用户对 ClawHub 技能发现体验有实际使用需求；
- 命令面板快速启动对话（[#1197](https://github.com/moltis-org/moltis/pull/1197)）与 Slack 任务卡片（[#1195](https://github.com/moltis-org/moltis/pull/1195)）的设计表明维护者正在主动改善高频交互路径；
- 没有关于破坏性变更、数据丢失或严重功能缺陷的抱怨，项目整体满意度风险较低。

---

## 8. 待处理积压

当前积压项主要为 3 个开放 PR，均出自核心维护者，暂未出现长期无人响应的外部 Issue：

| PR | 主题 | 开放天数 | 说明 |
|---|---|---|---|
| [#1190](https://github.com/moltis-org/moltis/pull/1190) | 持久化日历、频道与邮件连接器 | 5 天（8/11 起） | 体积最大、影响面最广的 PR，涉及 Provider 无关的持久化与全文搜索，建议配套详尽的 review 与迁移说明 |
| [#1195](https://github.com/moltis-org/moltis/pull/1195) | Slack 原生实时任务卡片 | 1 天（8/15 起） | 涉及响应流渲染与隐私保护，建议重点审查 per-run ID 机制与失败清理逻辑 |
| [#1199](https://github.com/moltis-org/moltis/pull/1199) | Coder 远程工作区沙箱支持 | 1 天（8/15 起） | 新增后端类型，需要确认与现有沙箱抽象的一致性及 PTY WebSocket 的稳定性 |

整体判断：项目活跃度处于高位，主线功能开发扎实，社区参与度有提升空间；当前维护者单点贡献比例过高，建议后续通过 triage 引导、贡献指南优化等方式吸引外部贡献者，以增强项目长期健康度。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# QwenPaw 项目动态日报 · 2026-08-16

> 数据来源：GitHub（agentscope-ai/QwenPaw）
> 统计窗口：2026-08-15 ~ 2026-08-16

---

## 1. 今日速览

过去24小时社区提交活跃但合并停滞：10条Issue更新（9条新开/活跃、1条关闭）、11条PR全部处于待合并状态，0个PR被合并、0个新版本发布。Bug类Issue呈集中爆发趋势，view_video（#7059/#7060）、OAuth2刷新令牌（#7053）、cron更新静默失败（#7048）、图片附件丢失（#7051）等方向均有新报，且其中3个问题已有对应修复PR提交，反馈-修复链路运转畅通。值得关注的是，今日11条PR中有8条来自首次贡献者，社区参与度高，但对维护者审查带宽形成明显压力。长期搁置的虚拟滚动请求（#3915，4月创建）仍未推进，是路线图层面的隐忧信号。

---

## 2. 版本发布

**无新版本发布。** 当前无最新 Releases 信息，v2.1.0 仍是最近稳定版。

---

## 3. 项目进展

**今日实质量合入为零：0个PR合并、0个PR关闭、0个版本发布。** 唯一实质进展是长期困扰用户的 Matrix 端到端加密问题（[#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476)）在社区提供安装排查方案后于今日关闭。

不过，11条待审查PR已勾勒出下一版本的可能轮廓，按影响面排序：

| PR | 方向 | 状态 |
|---|---|---|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | **统一provider发现、模型元数据、路由与代理控制**——引入目录驱动的模型系统、运行时发现、能力感知路由与fallback，大型架构重构 | 待合并 |
| [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) | **原生 DataPaw app 运行时与持久化分析工作区**，已标记 ready-for-human-review | 待合并 |
| [#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) | **动态技能加载 + 自动卸载 + frontmatter 修复**，补齐运行时技能管理基础设施 | 待合并 |
| [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) | 修复 OpenAI Responses API 上 view_video 视频帧丢失（对应 #7059/#7060） | 待合并 |
| [#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055) | 修复 `qwenpaw cron update --text` 静默失效（对应 #7048） | 待合并 |
| [#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057) | 为 systemd/Docker 场景的子进程 PATH 追加用户级 bin 目录 | 待合并 |
| [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) | 修复 ACP 通知与 prompt 响应竞态导致的最终文本丢失 | Under Review |

**关键判断**：提交侧内容丰富度远超合入侧，若上述PR在未来数日集中合并，版本号有望从 2.1.0 直接跳升（含 DataPaw 运行时与 provider 体系统一两项破坏性变更）。

---

## 4. 社区热点

今日讨论热度整体分散，评论数最高的条目仅3条，没有单一爆点，但有三处值得关注：

- **[#6476（Matrix E2EE，已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6476)** — 3条评论，今日关闭。用户MCQSJ详细记录了 matrix-nio 需要 olm 库解密、QwenPaw 自装失败、通过 `apt install libolm-dev` + `uv pip install matrix-nio[e2e]` 手动破解的全过程。该Issue沉淀了一套可复用的 E2EE 安装方案，反映了渠道集成类功能开箱即用体验的不足。

- **[#3915（Console WebUI 虚拟滚动）](https://github.com/agentscope-ai/QwenPaw/issues/3915)** — 3条评论、1个👍，4月28日创建至今未解决，是当前积压最久的功能请求。诉求聚焦于长对话场景下全量DOM渲染导致的严重卡顿，社区持续有共鸣但始终未进入实施。

- **[#7059 / #7060 / #7061 视频问题集群](https://github.com/agentscope-ai/QwenPaw/issues/7059)** — 同一用户 xiaoka76 在一天内连续提交两个Bug Issue（视频块静默丢弃、2MB硬编码内联限制）并附上修复PR，形成完整的"报障-根因-补丁"闭环。静默失败类Bug在AI链路中杀伤力最大，值得维护者优先review。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（静默失败 / 永久功能降级）

- **[#7059](https://github.com/agentscope-ai/QwenPaw/issues/7059) [高] view_video 结果视频块被静默丢弃** — OpenAI Responses API / Volcengine Ark 下，`view_video` 返回成功且无任何报错，但模型完全收不到视频帧。静默失败会直接影响多模态任务质量且难以排查。**已有修复PR [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061)**。

- **[#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) [高] OAuth2 刷新令牌不轮换且无主动续期** — 对使用轮换 refresh_token 的远程 MCP（如 XMind），`OAuth2AuthCodeProvider` 只更新 access_token 不持久化新的 refresh_token，导致远程MCP永久退化到手动重新认证。**暂无PR**。

### 🟠 中等（功能受限 / 数据丢失）

- **[#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060)** — view_video 的内联媒体上限硬编码为 2MB，provider 的 `max_inline_media_bytes` 设置在视频路径上完全无效，大视频只能被替换为占位文本。**修复PR [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 一并覆盖**。

- **[#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)** — Console 桌面端图片附件在会话重载后丢失，后端返回data URL但前端渲染为损坏缩略图。**暂无PR**。

- **[#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048)** — `qwenpaw cron update <id> --text "<新prompt>"` 返回 rc=0 且输出任务JSON（看似成功），但 prompt 实际未更新，属误导性成功。**修复PR [#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055) 已提交**。

### 🟡 一般（环境性问题 / 已解决）

- **[#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057)** — systemd/Launchd/Docker 环境下守护进程继承精简PATH，导致 `gh`、`cmake`、`lark` 等用户级CLI在shell工具中不可用。**修复PR即本条**。
- **[#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) [已关闭]** — Matrix E2EE 经手动安装 libolm 后解决。

**稳定性总结**：今日报告的Bug集中在 v2.1.0 的多模态（视频/图片）与自动化（cron/MCP OAuth）两条主线上，且相当一部分是"接口成功但实际未生效"的静默型缺陷，建议在 2.1.x patch 中优先修复，并在测试中增加"结果校验"环节。

---

## 6. 功能请求与路线图信号

### 架构级信号（可能进入大版本）

- **[#6940 DataPaw 原生运行时](https://github.com/agentscope-ai/QwenPaw/pull/6940)** — 新增应用级运行时与持久化分析工作区，配合 PR 内的双截图展示，属全新产品形态扩张。
- **[#6302 Provider 体系统一](https://github.com/agentscope-ai/QwenPaw/pull/6302)** — 目录驱动的provider模型系统、能力感知路由、fallback 支持，是一次底层重构，预计影响模型选择UI与第三方接入方式。
- **[#7033 动态技能生命周期](https://github.com/agentscope-ai/QwenPaw/pull/7033)** — 动态加载/自动卸载/前端matter修复，为技能生态的运行时管理打底。

### UI/体验类（影响日常使用）

- **[#3915 Console 虚拟滚动或分页渲染](https://github.com/agentscope-ai/QwenPaw/issues/3915)** — 4月提出至今，长对话卡顿问题持续存在。
- **[#7058 恢复 native context 策略选项](https://github.com/agentscope-ai/QwenPaw/issues/7058)** — v2.1.0 移除UI后用户被锁定在 scroll 策略，后端仍支持 native，属"功能回退"型诉求。

### 自动化/企业集成类（已有配套PR，可能随下一版本落地）

| Issue | 需求 | 配套PR |
|---|---|---|
| [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056) | 后台任务完成回调/通知，避免轮询 | 无 |
| [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 插件API增加 system_prompt 权限（企业提示词隐私） | 无 |
| [#7050](https://github.com/agentscope-ai/QwenPaw/issues/7050) | 每个 cron job 可单独指定模型 | [#7050 PR](https://github.com/agentscope-ai/QwenPaw/pull/7050) |
| [#7049](https://github.com/agentscope-ai/QwenPaw/issues/7049) | GET /chats/{chat_id} 支持 limit/before 分页 | [#7049 PR](https://github.com/agentscope-ai/QwenPaw/pull/7049) |
| [#7001](https://github.com/agentscope-ai/QwenPaw/issues/7001) | Matrix 群组按发送者隔离会话/记忆 | [#7001 PR](https://github.com/agentscope-ai/QwenPaw/pull/7001) |
| [#7054](https://github.com/agentscope-ai/QwenPaw/issues/7054) | Chrome 插件支持远程桥接（LAN浏览器） | [#7054 PR](https://github.com/agentscope-ai/QwenPaw/pull/7054) |

---

## 7. 用户反馈摘要

从今日Issue与评论中提炼的真实用户之声：

- **"比报错更糟的是静默成功"** — 用户在 [#7059](https://github.com/agentscope-ai/QwenPaw/issues/7059) 中描述 view_video 返回正常但模型收不到视频："no error, no warning, a completely silent failure"。这反映出AI工具链中结果校验缺失带来的信任损耗。

- **E2EE 配置门槛过高** — [#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) 用户MCQSJ展示了三步手动排查（系统库→Python库→版本匹配），普通用户很难独立完成，说明 Matrix 渠道的加密依赖应当随包分发或提供一键检测。

- **CLI 假成功损害自动化信心** — [#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048) 用户Ray-lyy截图级复现了 `cron update` 返回成功但数据未变的过程。对脚本化使用者而言，这类"成功但不生效"的接口比直接报错更危险。

- **OAuth2 反复手动的疲惫** — [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) 用户sunboy0523指出远程MCP在令牌轮换后"永久降级"为手动认证，对高频使用的MCP集成是持续性伤害。

- **B端用户提示词隐私诉求** — [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) 用户xiaohushi512明确提出"不想提交会话后在 qwenpaw 会话界面被用户看到"系统提示词，反映企业在通过插件交互时对内部prompt资产的保护需求。

- **后台任务的异步体验缺口** — [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056) 用户TanKenglim通过阅读源码确认当前只有 GET 轮询接口，缺少推送/回调机制，这类体验在高延迟任务场景下尤为明显。

---

## 8. 待处理积压

以下问题长期未获响应或推进，建议维护者重点关注：

1. **[#3915 Console WebUI 虚拟滚动](https://github.com/agentscope-ai/QwenPaw/issues/3915)** — 创建于 2026-04-28，已积压 **3.5个月**，1个👍、3条评论。长对话卡顿是Console高频痛点，且社区已有成熟虚拟滚动方案可参考，建议纳入近期迭代。

2. **[#6302 统一 Provider 体系PR](https://github.com/agentscope-ai/QwenPaw/pull/6302)** — 创建于 2026-07-21，已近 **1个月**未合并。PR体量大、改动面横跨provider发现/路由/UI，需要维护者投入整块时间 review，建议拆分为多个可独立合入的阶段。

3. **[#6940 DataPaw 原生运行时PR](https://github.com/agentscope-ai/QwenPaw/pull/6940)** — 已标记 `ready-for-human-review`，等待人工审查。若该PR与 #6302 同时合入，将对版本管理造成较大压力。

4. **[#6623 ACP 通知竞态修复PR](https://github.com/agentscope-ai/QwenPaw/pull/6623)** — 8月1日创建，状态 `Under Review` 已超两周。该修复解决的是通知与prompt响应同段到达时的文本丢失问题，属于协议层可靠性缺陷，建议优先定稿。

---

**健康度总评**：项目社区活跃度处于高位（Issue/PR提交量大、首次贡献者比例高），但合并吞吐量为零的现状意味着维护者审查能力已成为瓶颈。短期看，视频链路（#7061）与cron修复（#7055）是低风险高价值合入项；中期看，#6302 与 #6940 两项架构级PR的推进节奏将决定 2.2.0 的发布时间。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-16

## 1. 今日速览

过去 24 小时 ZeroClaw 保持高活跃度：Issue 更新 50 条（新开/活跃 46 条，关闭 4 条），PR 更新 50 条（待合并 44 条，已合并/关闭 6 条），无新版本发布。当前讨论重心明显偏向架构级 RFC，排名前三的热门议题为 OpenAI Chat Completions 协议适配（#8603，20 评论）、运行时会话所有权（#9487，16 评论）和统一附件架构（#9488，15 评论）。值得关注的是，待合并 PR 积压达 44 条且多个 RFC 标注 `needs-maintainer-review`，维护者决策带宽或将成为近期项目进展的主要瓶颈；但 Anthropic fallback 功能栈的 5 个 PR 已全部关闭合并，意味着该功能链路已完整落地。

## 2. 版本发布

过去 24 小时内无新版本 Release。

## 3. 项目进展

**Anthropic 拒绝处理与 fallback 功能栈完整落地（主要进展）**

由 IftekharUddin 提交的 Anthropic 可靠性功能栈 5 个 PR 全部关闭（已合并），形成从原生拒绝识别 → 客户端 fallback 路由 → 服务端 fallback 请求/响应 → 通道层用户通知的完整链路：

- [#9262](https://github.com/zeroclaw-labs/zeroclaw/pull/9262) — 将 Anthropic HTTP 200 安全拒识（`stop_reason: "refusal"`）从"空成功"改为类型化 `AnthropicRefusalError`，修复此前拒绝被静默吞掉的问题
- [#9263](https://github.com/zeroclaw-labs/zeroclaw/pull/9263) — 使客户端可靠性层将 `AnthropicRefusalError` 纳入 fallback 路由逻辑，拒绝可被自动导向 fallback 模型
- [#9265](https://github.com/zeroclaw-labs/zeroclaw/pull/9265) — 新增 Anthropic 专属配置 `server_fallback_models`，支持单次 API 调用内的服务端 fallback opt-in
- [#9266](https://github.com/zeroclaw-labs/zeroclaw/pull/9266) — 新增 `NativeChatResponse.model` 与 `AnthropicUsage.iterations` 字段，使 fallback 实际服务模型可观测
- [#9268](https://github.com/zeroclaw-labs/zeroclaw/pull/9268) — 在通道编排层暴露 fallback 提示，完成该功能栈的最后一块拼图

此外，PR [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) 描述中确认 [#9738](https://github.com/zeroclaw-labs/zeroclaw/pull/9738) 已合并，zerocode 多会话面板功能（含代理侧边栏与侧边栏快捷启动）已进入纯净 diff 状态，待进一步审查。CI 自动化方面，[#9867](https://github.com/zeroclaw-labs/zeroclaw/pull/9867) 继续推进 PR size 标签自动化，有望减少手工维护成本。

## 4. 社区热点

**#8603 — OpenAI Chat Completions 兼容协议（20 评论，持续高温）**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)

当前 ZeroClaw 仅通过 WebSocket、ACP 和按渠道 webhook 暴露能力，Open WebUI、LobeChat、Continue.dev、Aider、LangChain 及 OpenAI SDK 等客户端均无法直接接入。该 RFC 的讨论热度说明社区对"协议互通"有明确刚需——一旦落地，ZeroClaw 将能无缝接入主流 AI 工具生态。

**#9487 — 运行时会话所有权与传输面适配（16 评论）**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)

NiuBlibing 提出的 RFC 为运行时会话所有权建立了明确的边界（#9487/#9488/#9600），并引入了持久化准入与模糊结果语义。配套的 #9488（统一附件架构，15 评论）同样来自该作者，两案合计 31 条评论，构成对当前网关/传输架构的一次系统性重构提案。

**#8780 — Gemini Live 实时语音通道（11 评论）**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)

v2 版本已由功能提案改写为 broker 合约设计，目标是以 Gemini Live 为第一个实时语音到语音模型实现 channels 层对接。社区对多媒体交互渠道的关注度正在上升。

**趋势判断**：热点议题集中在"连接更多客户端协议"和"重构运行时/传输层以支持更复杂的会话模型"两个方向，说明项目正从单机工具向平台化基础设施演进，但也意味着对架构稳定性和维护者决策速度的考验。

## 5. Bug 与稳定性

按严重程度排列（P1 > P2，已标注是否有对应修复 PR）：

**P1 级**

- [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — `cron` 自定义 shell 测试在并行运行时门禁下命中 `ETXTBSY` 竞态，导致无关 PR 被红色检查阻塞（已在 PR #9963 上触发）。**暂无 fix PR**，需要测试隔离或串行化处理
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — 网关层面 WebSocket 查看者断开会取消正在运行的 agent turn，导致浏览器休眠或网络抖动即中断任务。**已有 fix PR #9002**（将 WS 视为 viewer/controller 而非 turn owner）
- [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) — `config/set` 失败时已自动创建的 map 别名未能回滚，可能污染配置状态。**已有 fix PR #9281**（事务性保存 + 失败丢弃）
- [#9995](https://github.com/zeroclaw-labs/zeroclaw/pull/9995) — webhook 审计导出未脱敏凭据与内联图片标记，可能造成敏感信息泄漏。**已有 fix PR #9995**

**P2 级**

- [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) — 知识图谱工具暴露单一共享 SQLite 图，任意 agent 可读取/修改其他 agent 的知识数据，缺少所有者维度。**已有 fix PR #9745**
- [#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) — `sessions_list/history/send` 与 `discord_search` 未绑定 `SessionOwnershipScope`，存在跨 agent 越权读取风险。**已有 fix PR #9746**
- [#7870](https://github.com/zeroclaw-labs/zeroclaw/issues/7870) — agent 运行时选项可能从配置文件中的第一个 provider 解析，而非所选 provider，导致配置错配。**已被 accepted 跟踪，暂无对应 PR**
- [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) — macOS 桌面应用重启后窗口消失、权限检测失败（S1 阻断），已在未复现状态下关闭（`r:needs-repro`），建议持续观察用户反馈

**稳定性趋势**：安全类 bug 占比明显偏高（3 个 P1/P2 与敏感信息泄漏或越权相关），且全部已有修复 PR，说明代码审查中对安全边界的把关正在加强。

## 6. 功能请求与路线图信号

以下已获 `status:accepted` 的请求最可能进入下一版本开发队列：

- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) — 优化 Rust 构建缓存与 CI 关键路径（CI 时间从 15-20 分钟压缩）
- [#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130) — workspace 级 `#![forbid(unsafe_code)]`，仅保留 `aardvark-sys` 审查豁免
- [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) — PR 更新时自动重算 `size:*` 与 `risk:*` 标签
- [#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512) — 为每个定制 CI 门禁标注其动机 issue
- [#7849](https://github.com/zeroclaw-labs/zeroclaw/issues/7849) — Discord 提及触发线程模式
- [#7824](https://github.com/zeroclaw-labs/zeroclaw/issues/7824) — wecom_ws 渠道支持主动消息与媒体发送
- [#7410](https://github.com/zeroclaw-labs/zeroclaw/issues/7410) — 网关 webhook 签名密钥改为 handler 运行时读取而非启动时缓存
- [#7089](https://github.com/zeroclaw-labs/zeroclaw/issues/7089) — Windows shell host 可配置化（`cmd.exe`/PowerShell，状态已是 in-progress）
- [#7762](https://github.com/zeroclaw-labs/zeroclaw/issues/7762) — 补全 cron 文档并支持指定模型运行 cron
- [#7790](https://github.com/zeroclaw-labs/zeroclaw/issues/7790) — 将剩余 web dashboard 运维界面迁入 zerocode TUI

**仍处 RFC 讨论期的高风险提案**（`risk:high`，需维护者拍板）：#8603（Chat Completions）、#9487（会话所有权）、#9488（附件架构）、#6954（内部发起 turn 的 provenance）、#6971（安全态势与统一入口）、#8780（Gemini Live）、#6909（桌面 computer-use）、#9810（Agent Plugins 1.0 标准加载）、#9825（公共区块链地址发布例外）、#9621（分阶段产品遥测）、#9598（SOP 权限合约）。

## 7. 用户反馈摘要

- **生态互通诉求强烈**（#8603）：有用户明确表示希望直接用 OpenAI SDK、Aider、LangChain 等工具连接 ZeroClaw，当前的 WebSocket/ACP/webhook 组合无法被主流客户端识别
- **误报影响真实业务**（[#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)）：泄漏检测器的高熵启发式把公共区块链地址判定为敏感信息，导致支付请求 URL 无法送达——用户承认检测器"按设计工作"，但设计本身未考虑这类公共标识符
- **CI 不稳挫伤贡献积极性**（#9965）：并行测试门禁的 `ETXTBSY` 竞态使无关 PR 变红，用户感知到"做了配置变更却被 CRON 测试卡住"的无效等待
- **文档缺口反复被提及**（#7762、#9512）：cron 文档缺失、CI 门禁缺少动机说明，新贡献者上手成本偏高
- **macOS 端体验问题**（#7527）：权限检测失败 + 重启后窗口消失，属 S1 阻断级问题，虽已关闭但建议在下一个桌面版重点回归
- **多 agent 安全边界被关注**（#9745/#9746）：评审者明确指出知识图谱和会话工具缺少所有权隔离，反映出自托管用户对多 agent 数据隔离的重视

## 8. 待处理积压

**等待维护者审查（`needs-maintainer-review`，均为高风险 RFC）**

- [#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) — 内部发起 turn 的 provenance 与回复合约（5 月 26 日创建，已积压近三个月）
- [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) — 安全态势与通用入口策略
- [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — SOP 权限合约
- [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) — 分阶段产品遥测
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — Chat Completions profile（20 评论，社区关注度最高）

**等待作者更新（`needs-author-action`）**

- [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — 分离权威记忆存储与可选 enrichment 连接器
- [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) — Gemini Live 实时语音通道
- [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — 桌面 computer-use 支持
- [#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) — 区块链标识符发布例外
- [#9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810) — Agent Plugins 1.0 加载
- [#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330) — AI 辅助 PR 预审

**长期未合并 PR**

- [#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137) — 共享 egress 策略基础（7 月 18 日创建，依赖 #9580 合并）
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — 网关查看者断开后保持 agent turn 存活（P1，7 月 11 日创建）
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) — 交互式 Ctrl+C 状态感知

**维护者提醒**：[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 明确是 RFC/设计 issue 的维护者决策队列 tracker，目前仍有大量 `needs-maintainer-review` 的高风险 RFC 等待进入 accepted/deferred 决策。结合 44 条待合并 PR 的积压情况，建议维护者优先对 RFC 做出"接受/拒绝/延期"决策，以释放社区贡献者的后续工作。

---

*数据周期：2026-08-15 至 2026-08-16 | 来源：github.com/zeroclaw-labs/zeroclaw*

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*