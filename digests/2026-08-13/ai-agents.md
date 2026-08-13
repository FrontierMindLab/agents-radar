# OpenClaw 生态日报 2026-08-13

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-13 01:04 UTC

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

## 1. 今日速览

过去 24 小时 OpenClaw 项目保持极高活跃度：Issue 侧共 500 条更新（新开/活跃 396 条，关闭 104 条），PR 侧共 500 条更新（待合并 343 条，合并/关闭 157 条）。Issue 关闭率约 21%、PR 合并率约 31%，反馈涌入速度略快于闭环速度，存在一定积压。今日无新版本发布，项目正处于功能与修复的累积期。社区讨论重心仍是**可靠性问题**：静默回复失败在 #116277 关闭后继续复发（#121058，91 条评论）、子代理完成结果静默丢失、多智能体编排不稳定等 P1 级问题长期未闭环。PR 侧覆盖广，出现了 SQLite STRICT 迁移崩溃、Matrix 回复可见性、`<internal>` 推理块泄露等多个关键修复，但多数仍处于 `waiting on author` 或 `needs proof` 状态，审核/合并环节存在明显瓶颈。

## 2. 版本发布

今日无新版本发布（0 个 Releases）。

## 3. 项目进展

过去 24 小时共有 **157 个 PR 被合并或关闭**（基于数据概览；以下分析基于评论热度最高的 30 条 PR 样本）。整体来看，项目在通道可靠性、模型兼容性、CLI/网关稳定性、CI 基础设施四个方向均有明显推进。

**通道/消息投递恢复**
- [#122850 fix(matrix): keep streamed replies visible when replacement fails](https://github.com/openclaw/openclaw/pull/122850) — 修复 Matrix 流式预览被 redact 后替换消息不可见的问题，防止用户看不到任何回复。P1，`waiting on author`。
- [#122862 fix(matrix): resolve exact room session routes](https://github.com/openclaw/openclaw/pull/122862) — 显式 Matrix 房间投递在默认 DM 范围下无法推导 session，需要手动传 `--session-key`；此 PR 修复精确房间路由。
- [#105765 fix(auto-reply): surface empty message-tool-only completions](https://github.com/openclaw/openclaw/pull/105765) — 当 `message_tool_only` 开启且 agent 既未产出消息工具投递也未产出最终 payload 时，用户看到进度后陷入沉默；此修复将这类空完成显性化。
- [#107070 refactor(whatsapp): centralize inbound turn admission and history finalization](https://github.com/openclaw/openclaw/pull/107070) — 将 WhatsApp 插件的入站准入和群组历史收尾职责收敛到共享通道机制，消除重复逻辑。

**稳定性/崩溃修复**
- [#110561 fix(sqlite): normalize BLOB/TEXT type mismatches during STRICT migration](https://github.com/openclaw/openclaw/pull/110561) — **P0**，v2026.7.2 的 STRICT 迁移在遗留非 STRICT 表中存在 BLOB/TEXT 类型不匹配时会直接导致网关启动崩溃；`waiting on author`。
- [#110649 fix(acp): stop client setup hanging on unresponsive servers](https://github.com/openclaw/openclaw/pull/110649) — ACP 客户端在服务端停止响应时无限等待；加入 30 秒 deadlock 超时。P1。
- [#119988 fix(cli): limit attach SIGINT shutdown to direct child and add force-kill timeout](https://github.com/openclaw/openclaw/pull/119988) — **已关闭**，修复 `openclaw attach` 下 Ctrl+C 被静默吞掉、进程挂起的问题。
- [#93247 fix(diagnostics): idle ownerless state after failed recovery](https://github.com/openclaw/openclaw/pull/93247) — 失败的 stuck-session 恢复不应清除恢复开始后到达的活动状态。

**模型/兼容性**
- [#122344 fix(models): make picker discovery profile-aware](https://github.com/openclaw/openclaw/pull/122344) — OpenAI 实时模型发现改为遵循运行时 auth-profile 顺序，并将内部 profile 来源从公开 `models.list` 中剥离。
- [#110458 fix(config): model compat schema rejects eight fields present in the TypeScript type](https://github.com/openclaw/openclaw/pull/110458) — 修复 8 个已在 TS 类型中但不在 Zod schema 中的模型兼容字段，用户配置会被误拒绝。
- [#110138 fix(openrouter): add model-aware tool schema normalization for proxied providers](https://github.com/openclaw/openclaw/pull/110138) — OpenRouter 代理的 Moonshot/Kimi、DeepSeek、Gemini 等模型拒绝 `anyOf`/`oneOf` 工具 schema 导致 HTTP 400。
- [#108316 fix(codex): reject hex/exponent computer wait duration strings](https://github.com/openclaw/openclaw/pull/108316) — 防止 `Number()` 隐式转换将十六进制/指数格式字符串解析为超时时间。

**安全与边界**
- [#122650 fix(reasoning-tags): strip `<internal>` reflection blocks from visible replies](https://github.com/openclaw/openclaw/pull/122650) — **安全相关**，模型产出的 `<internal>…</internal>` 私密推理块未被标准清洗器识别，会随自动回复或消息工具发送到可见聊天中。P1，`needs proof`。

**CI/构建基础设施**
- [#122885](https://github.com/openclaw/openclaw/pull/122885) / [#122887](https://github.com/openclaw/openclaw/pull/122887) / [#122888](https://github.com/openclaw/openclaw/pull/122888) — 分别修复混合变更时扩展测试被静默跳过、UI 启动包体积增长导致的 CI 构建失败、E2E 网关网络资格验证失败。
- [#122889 fix: restore Gateway startup for migrated multi-agent configs](https://github.com/openclaw/openclaw/pull/122889) — 修复迁移后的多 agent 配置在检测 Telegram 遗留状态时误报 `AGENT_SELECTION_REQUIRED` 导致网关无法 ready。

**小结**：从 PR 趋势看，项目当前正集中修补**消息投递可靠性**（Matrix、WhatsApp、auto-reply）和**迁移/启动崩溃**（SQLite STRICT、多 agent 配置迁移）两条关键链路，同时着手治理模型配置 schema 漂移问题。多个 P1 修复处于长期 `waiting on author`，若维护者能推动作者收敛证据，合并后有望显著改善稳定性。

## 4. 社区热点

**#121058 — Silent reply failures still recurring after #116277 closed — no queued reply payload**（91 条评论，[链接](https://github.com/openclaw/openclaw/issues/121058)）
热度最高。用户使用监控 cron 持续记录到静默回复失败在 #116277 关闭后仍然出现，且没有排队中的回复 payload。核心诉求是"关闭 issue ≠ 问题已解决"，社区对修复-复发循环的耐心正在消耗。

**#7707 — Feature Request: Memory Trust Tagging by Source**（45 条评论，[链接](https://github.com/openclaw/openclaw/issues/7707)）
从 2 月持续讨论至今。用户希望按记忆来源（用户命令/网页抓取/第三方技能）标记信任等级，以防御通过不可信内容注入恶意指令的 memory poisoning 攻击。反映社区对 AI 代理安全性的担忧正在上升。

**#44925 — Subagent completion silently lost**（26 条评论，[链接](https://github.com/openclaw/openclaw/issues/44925)）
P1，描述了多种子代理完成静默丢失模式：完成宣布失败（E31/E42/E45）、无重试、无通知、超时不自动重启。这是一条高赞（👍2）的可靠性痛点。

**#77598 — Track live dev agent behavior and trajectory**（23 条评论，[链接](https://github.com/openclaw/openclaw/issues/77598)）
维护者发起的 24 小时观测 issue，用于记录 Pash 的开发 agent 行为，且明令不干预。这是项目方自我观测开发代理的开放记录，社区参与度高。

**#43367 — Multi-agent orchestration is unstable**（14 条评论，[链接](https://github.com/openclaw/openclaw/issues/43367)）
并发 `agents add` 覆写配置、session-lock 失败、子任务脱离父会话等一簇多智能体编排问题。P1，带 `linked-pr-open` 标签。

这些热点共同指向：**社区最关心的是消息可靠性与多智能体编排稳定性**，其次是对 agent 安全边界的设计诉求。

## 5. Bug 与稳定性

以下按严重程度排列，标注是否已有对应修复 PR。

### P1 / 严重

| Issue | 问题 | 状态 |
|---|---|---|
| [#110561](https://github.com/openclaw/openclaw/pull/110561) (PR) | STRICT 迁移遇 BLOB/TEXT 类型不匹配导致网关启动崩溃（P0） | 有 PR，`waiting on author` |
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败反复出现，无 queued payload，监控持续记录到新发生 | 无新 fix PR |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失：无重试、无通知、超时不重启 | 无 fix PR |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | 多代理并发 `agents add` 覆写、session-lock 失败、子工作脱离 | 有 linked PR（open） |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新/探测略超 10s，cron/heartbeat 超时失败 | 无 fix PR |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话完成后仍持久存在，主会话变无响应 | 无 fix PR |
| [#91363](https://github.com/openclaw/openclaw/issues/91363) | 隔离 cron 一致地 "LLM request failed"，请求未达 provider，`timeoutSeconds` 无效 | 无 fix PR |
| [#92433](https://github.com/openclaw/openclaw/issues/92433) | 子代理完成被 steer 进 requester run，run 在处理前结束，完成被静默丢弃 | 无 fix PR |
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat 消息追加到 transcript 但不触发/投递助手回复 | 无 fix PR |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | 主 agent 被遗留 workspace-state 迁移阻塞，macOS 上拒绝所有 Anthropic 轮次 | 无 fix PR |
| [#44502](https://github.com/openclaw/openclaw/issues/44502) | Discord 路由/提及门控 bug，preflight 过于宽松 | 无 fix PR |
| [#54488](https://github.com/openclaw/openclaw/issues/54488) | followup drain 独占 session lane，入站消息静默排队 20–30 分钟 | 无 fix PR |
| [#40611](https://github.com/openclaw/openclaw/issues/40611) | 心跳 drift 修复（PR #39182）引入激进重试，阻塞 Telegram 活跃对话 | 无 fix PR |
| [#43374](https://github.com/openclaw/openclaw/issues/43374) | 4 个并发 agent 时所有 LLM 调用同时超时（内部瓶颈而非 provider） | 无 fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未收割，zombie 累积导致运行时降级 | 无 fix PR |
| [#78493](https://github.com/openclaw/openclaw/issues/78493) | `sudo openclaw update` 产生混合 root/user 所有权，doctor 在 EACCES 后覆写配置 | 无 fix PR |

### P2 / 中等级

| Issue | 问题 | 状态 |
|---|---|---|
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | 同一团队 3 人 memory 管理行为不一致（sqlite / 其他存储 / 混乱） | 无 fix PR |
| [#72015](https://github.com/openclaw/openclaw/issues/72015) | active-memory 插件阻塞正常回复，QMD 启动初始化可压垮多 agent 网关 | 无 fix PR |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | 子代理完成投递在直接宣布超时/drain/orphan prune 时丢失 | 无 fix PR |
| [#115001](https://github.com/openclaw/openclaw/issues/115001) | 混合记忆搜索通过 FTS LIKE 回退硬编码 textScore 产生伪 1.0 相似度 | 有 linked PR（open） |
| [#95610](https://github.com/openclaw/openclaw/issues/95610) | OpenAI 每轮动态注入破坏前缀缓存，prompt-cache 完全失效 | 无 fix PR |
| [#42273](https://github.com/openclaw/openclaw/issues/42273) | 大安装（4GB+）下 `backup create` 写个小 tmp 文件后静默死亡 | 有 linked PR（open） |
| [#107814](https://github.com/openclaw/openclaw/issues/107814) | gpt-5.3-codex-spark 对必填工具发出空参数对象，schema 校验全拒 | 无 fix PR |
| [#37966](https://github.com/openclaw/openclaw/issues/37966) | `cacheRetention` 对 LiteLLM 代理的 Anthropic 模型被静默忽略 | 无 fix PR |
| [#114154](https://github.com/openclaw/openclaw/issues/114154) | bundle-mcp 通过策略和服务健康检查，但 agent 从不加载，ToolSearch 无结果 | 无 fix PR |

### 已关闭（今日样本中）

- [#57901](https://github.com/openclaw/openclaw/issues/57901) — Safeguard compaction 忽略 `compaction.model` 配置，已关闭。
- [#39604](https://github.com/openclaw/openclaw/issues/39604) — 新增 `tools.web.fetch.allowPrivateNetwork` 配置项，已关闭（👍12，社区需求强烈）。
- [#65538](https://github.com/openclaw/openclaw/issues/65538) — 流式输出时屏幕阅读器逐 token 播报的无障碍问题，已关闭。
- [#57256](https://github.com/openclaw/openclaw/issues/57256) — `openclaw status --deep` 误报 mem0 不可用，已关闭。

## 6. 功能请求与路线图信号

| 功能请求 | 评论/赞 | 分析 |
|---|---|---|
| [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 45 评论 | 记忆投毒防御，安全方向；与已关闭的 [#45031 技能安装安全扫描](https://github.com/openclaw/openclaw/issues/45031)（close:already-fixed）同属安全增强脉络，可能作为下一阶段安全路线的一部分 |
| [#9016 Expose OpenRouter Usage Cost to Agent Runtime](https://github.com/openclaw/openclaw/issues/9016) | 8 评论 | 成本可观测性。P2，已挂 6 个月，仍需产品决策 |
| [#45758 Support YAML as config file format](https://github.com/openclaw/openclaw/issues/45758) | 9 评论 | 易用性/生态对齐（Docker Compose/K8s/Ansible 均用 YAML） |
| [#45508 Self-hosted STT/TTS provider in webchat](https://github.com/openclaw/openclaw/issues/45508) | 8 评论 | WebChat 忽视 openclaw.json 中的 TTS/STT 配置，自托管语音不可用 |
| [#45771 Built-in pace-aware rate limiting](https://github.com/openclaw/openclaw/issues/45771) | 7 评论, 👍2 | 自主 agent 循环容易烧穿 Anthropic 限流，需要内置消费节奏感知 |
| [#99583 Intelligent Session Auto-Titling](https://github.com/openclaw/openclaw/issues/99583) | 7 评论, 👍2 | 懒生成、廉价模型、话题感知重命名，较低成本提升 UX |
| [#50199 Skill Priority Configuration](https://github.com/openclaw/openclaw/issues/50199) | 8 评论 | 解决重叠技能无选择规则的问题 |

**可能进入下一版本的方向**：
- **子代理完成隔离与路由**：PR [#101248 feat(subagents): add completionTarget for parent-only routing](https://github.com/openclaw/openclaw/pull/101248) 与 [#96975](https://github.com/openclaw/openclaw/issues/96975) 的需求高度吻合，若合并将允许子代理完成只回传状态+子会话链接，减少父会话上下文污染。
- **Feishu 原生 Markdown**：PR [#93940](https://github.com/openclaw/openclaw/pull/93940) 正在推进 Feishu 入站 `content_v2` 与出站 `tag:md` 对齐，属于通道能力补齐。
- **安全类功能**：memory trust tagging 讨论 5 个月仍无 PR，但结合已关闭的 skill 安全扫描，说明项目已开始建立安全机制基线，后续可能逐步扩展。

## 7. 用户反馈摘要

- **对"关闭即解决"的不信任（#121058）**：用户明确表示 #116277 关闭后监控 cron 仍持续记录到静默回复失败，包括 8 月 9 日当天。这种"issue 关闭但 bug 仍在"的体验严重消耗社区信任。
- **多端行为不一致（#43747）**：三位同事使用同一 OpenClaw，memory 管理方式却完全不同——有人是 sqlite chunking/embedding，有人是别的存储。用户原话："I never see any of our memory is managed in same way"，多端一致性成为协作场景的明显痛点。
- **回归困扰（#77733）**：裸 `/new` `/reset` 在 2026.5.3 开始不再触发 persona greeting，4.x 正常。用户对这类静默行为回归表示失望。
- **移动端体验受阻（#97983）**：iOS 官方 App/WebChat 消息"已收到但不回复"，用户必须用 CLI/Gateway 手动驱动同一会话才能生成回复，移动端基本不可用。
- **升级事故（#78493）**：`sudo openclaw update` 后文件所有权混杂，随后 `openclaw doctor` 在读取失败后反而覆写了配置，用户面临配置丢失风险。这是升级路径的严重 UX 事故。
- **无障碍正向案例（#65538，已关闭）**：屏幕阅读器逐 token 播报的问题已被修复，说明项目对无障碍反馈有响应能力。

## 8. 待处理积压

以下为长期未解决、需维护者重点关注的重要 Issue/PR：

| 事项 | 创建时间 | 优先级/热度 | 说明 |
|---|---|---|---|
| [#7707 Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707) | 2026-02-03 | P2, 45 评论 | 安全功能讨论 6 个月+，仍无 PR，`needs-product-decision` |
| [#44925 Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | P1, 26 评论, 👍2 | 5 个月未闭环，多失败模式 |
| [#43367 Multi-agent orchestration unstable](https://github.com/openclaw/openclaw/issues/43367) | 2026-03-11 | P1, 14 评论 | 5 个月未闭环，有 linked PR 但仍 open |
| [#43747 Memory management is in chaos](https://github.com/openclaw/openclaw/issues/43747) | 2026-03-12 | P2, 11 评论 | 5 个月，多端 memory 行为不一致 |
| [#42273 backup create stalls](https://github.com/openclaw/openclaw/issues/42273) | 2026-03-10 | P2, maturity:stable | 5 个月，4GB+ 安装备份必现卡死，有 linked PR 但未合 |
| [#44502 Discord routing/mention-gating bug](https://github.com/openclaw/openclaw/issues/44502) | 2026-03-13 | P1, 🐚 platinum hermit | 5 个月未闭环 |
| [#97616 zombie process leak](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | P1 | 1.5 个月，运行时长期降级风险 |
| [#97983 iOS/WebChat no reply](https://github.com/openclaw/openclaw/issues/97983) | 2026-06-30 | P1, 🦞 diamond lobster | 1.5 个月，移动端核心链路不可用 |
| PR [#110561 SQLite STRICT migration crash](https://github.com/openclaw/openclaw/pull/110561) | 2026-07-18 | P0 | 直接阻止 v2026.7.2 用户启动，卡在 `waiting on author` 近一个月 |
| PR [#110649 ACP client hang](https://github.com/openclaw/openclaw/pull/110649) | 2026-07-18 | P1 | 无限等待问题修复，同样卡在 `waiting on author` |

积压呈现两个特征：一是 **3 月集中报告的 P1 子代理/编排问题至今未闭环**，已成为社区反复提及的"老大难"；二是 **7 月中旬的多项 P0/P1 PR 卡在 `waiting on author` 状态近一个月**，需要维护者在 triage 流程上推动作者补充证据或明确移交，否则这些修复可能随版本迭代逐渐过时。建议优先处理 #110561（启动崩溃）与 #110649（无限等待）两个阻塞性 PR，并重新评估 3 月 P1 群的修复优先级。

---

## 横向生态对比

# AI Agent 开源生态横向对比分析报告

**数据周期**: 2026-08-12 至 2026-08-13 | **样本**: 12 个开源项目 | **数据源**: GitHub 公开动态

---

## 一、生态全景

个人 AI 助手/自主智能体开源生态正处于**从功能扩张转向可靠性治理**的关键阶段。9 个活跃项目在 24 小时内产生超 1,400 条 Issue/PR 更新，但半数以上项目存在 PR 审查积压或合并率偏低的问题，OpenClaw（500+500）、Hermes（50+50）、ZeroClaw（50+50）等头部项目尤为明显。跨项目最集中的痛点是**消息投递可靠性、子代理编排稳定性与会话持久化**——静默失败、"假成功"投递、子代理完成丢失在至少 5 个项目中独立出现。与此同时，安全加固（路径逃逸、凭证外泄、插件权限模型）与 Token 成本优化正从"加分项"变为"必选项"，社区对"关闭 Issue ≠ 问题已解决"的不信任感在多个仓库发酵。

---

## 二、各项目活跃度对比

| 项目 | Issues 更新 (新开/活跃｜关闭) | PR 更新 (待合并｜合并/关闭) | 合并率 | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (396｜104) | 500 (343｜157) | 31% | 0 | ⚠️ 高活跃但治理瓶颈明显，P0 PR 卡 `waiting on author` 近一个月 |
| **Hermes Agent** | 50 (37｜13) | 50 (47｜3) | **6%** | 0 | ⚠️ 高活跃但合并效率极低，桌面 P1 无 fix PR |
| **ZeroClaw** | 50 (~45｜5) | 50 (36｜14) | 28% | 0 | ⚠️ 高活跃，审查积压 + 安全 CI 红灯 |
| **IronClaw** | 41 (29｜12) | 50 (31｜19) | 38% | **2 (rc.2/rc.3)** | ✅ 发布密集，但 Telegram QA 9 个 Bug 待处理 |
| **CoPaw** | 29 (22｜7) | 42 (27｜15) | 36% | 1 (beta.4) | ✅ 响应快，beta 收口阶段 |
| **NanoBot** | 8 (4｜4) | 36 (~19｜17) | **47%** | 0 | ✅ 最健康，4 条 P1 安全修复当日合并 |
| **NanoClaw** | 4 (4｜0) | 10 (9｜1) | 10% | 0 | ⚠️ 修复 PR 积压 2–3 个月 |
| **LobsterAI** | 6 (全为 stale) | 7 合并/关闭 | — | 0（发布分支已合） | ✅ 稳定迭代，社区讨论度低 |
| **PicoClaw** | 2 (2｜0) | 3 (3｜0) | 0% | 0 | ⚠️ 合并停滞，stale Bug 未处理 |
| **NullClaw / Moltis / ZeptoClaw** | 无活动 | 无活动 | — | 0 | ⏸ 停滞 |

> **结论**：项目活跃度呈明显分层。NanoBot 的 47% 合并率与 Hermes 的 6% 形成两极，反映出 **"安全驱动"与"规划驱动"两种维护文化**的差异。头部项目普遍存在"反馈涌入速度 > 闭环速度"的瓶颈。

---

## 三、OpenClaw 在生态中的定位

**生态地位**：OpenClaw 是规模最大的**通用型自托管 AI 助手中枢**，日更新量（1,000 条）是第二梯队的 10 倍，渠道覆盖（Matrix、WhatsApp、Discord、Telegram、Feishu、iOS/WebChat、Slack）和 P0/P1 问题分级治理粒度均为生态标杆。

**相对优势**：
- **社区规模断层第一**：Issue/PR 日常更新 1,000 条，问题复现路径、热评分析、linked-PR 追踪机制成熟
- **通道适配器最广**：消息层覆盖 7+ 平台，今日 PR 同时推进 Matrix、WhatsApp、Feishu 三条通道修复
- **可靠性问题定义权**：静默回复失败（#121058）、子代理完成丢失（#44925）等已成为生态通用术语

**相对劣势**：
- **合并瓶颈**：31% 合并率低于 NanoBot（47%）和 IronClaw（38%），P0 级 SQLite 迁移崩溃（#110561）卡在 `waiting on author` 近一个月无人推动
- **老大难问题长期悬置**：3 月报告的 P1 子代理问题群 5 个月未闭环，社区耐心正在消耗
- **多端一致性失控**：#43747 显示同一团队 3 人使用 OpenClaw 时 memory 管理方式完全不同

**技术路线对照**：OpenClaw 走"核心网关 + 语言无关通道/技能"的**开放全能路线**；Hermes Agent 押注**桌面端 + 插件契约系统化**；IronClaw 深度绑定 near.ai 云做**托管编排**；CoPaw 聚焦**多子 Agent 协作 + 数据管线**。OpenClaw 是唯一试图覆盖"所有渠道、所有场景"的横向平台，也因此承受最高的集成复杂度代价。

---

## 四、共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息/回复投递可靠性** | OpenClaw（#121058 静默失败）、IronClaw（#7535 webhook 未激活/#7538 GIF 卡死）、NanoClaw（#3086 WhatsApp 假成功）、ZeroClaw（#9340 cron 输出丢弃）、CoPaw（#6921 任务无提示停止） | 失败要显性化、投递要有回执、不允许"日志显示成功但用户没收到" |
| **子代理/多智能体编排稳定性** | OpenClaw（#44925 完成丢失/#43367 编排不稳定）、CoPaw（#6927 子 Agent 死循环）、Hermes（#78069 clarify 挂起）、PicoClaw（#3269 MCP 故障挂死主循环） | 子代理完成需隔离路由、超时自动重启、死循环检测、外部依赖故障优雅降级 |
| **会话/记忆持久化** | NanoBot（PR #5271 P0 陈旧任务覆盖会话）、CoPaw（#6951 压缩后历史不可见）、Hermes（#84870 侧栏陈旧 lineage）、OpenClaw（#43747 memory 行为不一致） | 用户可见 transcript 是不可丢失的资产；上下文压缩不应破坏完整性 |
| **安全加固** | NanoBot（4 条 P1 安全 PR 同日合并）、OpenClaw（#7707 记忆投毒防御）、CoPaw（#6916 插件权限模型）、ZeroClaw（#8713 SSRF 门禁）、NanoClaw（#3220 密钥加固） | 路径逃逸防护、凭证 URL 不外泄、插件权限分级、记忆内容信任标签 |
| **Token 成本与缓存效率** | Hermes（#6839 工具 schema 注入 3,500–5,000 token/次）、CoPaw（PR #6953 排序 tool schemas + 拆分 env_context）、OpenClaw（#95610 动态注入破坏前缀缓存/#37966 cacheRetention 失效） | 按需注入工具定义、保持 prompt 结构稳定以命中 KV cache |
| **跨平台/桌面稳定性** | ZeroClaw（#9182 Windows PowerShell/#7462 74 个测试失败）、Hermes（#83683 桌面重启杀网关）、IronClaw（Windows 原子重命名）、LobsterAI（#2478/#2479 图标/符号链接）、OpenClaw（#111498 macOS 迁移阻塞） | CI 需覆盖 Linux/macOS/Windows 三平台；桌面应用生命周期管理规范化 |
| **模型接入兼容性** | OpenClaw（#110458 8 个字段 schema 漂移/#110138 OpenRouter 工具 schema 归一化）、NanoBot（DeepSeek V4 Pro 原生接入）、CoPaw（#6839 MCP 数字字符串参数）、Hermes（Nous provider keepalive 刷新） | provider 适配层需统一 schema 校验、工具格式归一化、凭证生命周期管理 |

---

## 五、差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构差异 |
|---|---|---|---|
| **OpenClaw** | 全功能 AI 助手中枢：多通道 + 多 Agent + 技能市场 | 自托管进阶开发者 | 网关 + 通道适配器 + 多 Agent 运行时；最大的渠道兼容面 |
| **Hermes Agent** | 桌面端 + 插件生态 | 桌面重度用户、本地模型用户 | Electron 桌面生命周期管理；插件 API 系统化（事件总线/钩子/索引，单日 10+ PR） |
| **IronClaw** | 云托管编排 + 企业级发布 | NEAR AI 云用户 | 深度绑定 near.ai；cargo-dist 发布管线成熟；Telegram linked-device 模式 |
| **ZeroClaw** | 开发工作流 + 跨平台 | 开发者工具用户 | ZeroCode/TUI + SOP 面板；Windows PowerShell 原生支持；slash command 三端统一诉求 |
| **CoPaw** | 多子 Agent 协作 + 数据管线 | 数据/分析团队 | Creator 生产管线（DAG 防 stall/防重复计费）；DataPaw 原生运行时；中文社区基础 |
| **NanoBot** | 轻量安全 Agent | 安全敏感开发者 | 安全修复文化最强；ExecTool 路径守卫 + 凭证 URL 本地化 + Docker 权限降级 |
| **NanoClaw** | 容器化 Agent 运维 | 单机多 Agent 部署者 | 容器内 Agent + OneCLI；Agent Plugins 1.0.0 引擎级迁移 |
| **LobsterAI** | 桌面端效率工具 | 飞书/网易生态中文用户 | Electron + 飞书集成；UI 打磨与跨平台兼容导向 |
| **PicoClaw** | 轻量嵌入式 Agent | 小团队/资源受限场景 | 最小化架构；MCP/WebUI/Telegram/Exa 四项能力补强 |

---

## 六、社区热度与成熟度

**第一梯队（日更新 500+）— 规模统治期**：
- **OpenClaw**（1,000 条/日）处于功能与修复并行的高速扩张期，但需解决 `waiting on author` 治理瓶颈。

**第二梯队（日更新 50–100）— 快速迭代期**：
- **Hermes**（100）、**ZeroClaw**（100）、**IronClaw**（91）、**CoPaw**（71）均保持高吞吐。IronClaw 以双 RC 发布展示最强发布纪律；CoPaw 对社区反馈响应最快（热点 Issue 24 小时内即有修复 PR）；Hermes 合并率 6% 为梯队内最大隐患；ZeroClaw 安全 CI 红灯急需止血。

**第三梯队（日更新 5–50）— 质量巩固/增长期**：
- **NanoBot**（44）安全响应速度生态第一，合并率 47% 居首，进入良性循环；**NanoClaw**（14）、**LobsterAI**（13）、**PicoClaw**（5）规模较小，修复类 PR 积压 2–3 个月普遍存在，贡献者流失风险上升。

**停滞层**：
- **NullClaw、Moltis、ZeptoClaw** 24 小时零活动，建议生态观察者降低关注权重。

---

## 七、值得关注的趋势信号

1. **"可靠性即竞争力"，静默失败彻底不可接受**：OpenClaw #121058（91 评论）、ZeroClaw cron 输出静默丢弃、NanoClaw WhatsApp "假成功"——三个独立项目同时出现同类问题，说明 agent 框架必须内建**投递回执、失败显性化、假成功检测**，否则社区信任将不可逆流失。

2. **Token 成本正在重构架构决策**：Hermes #6839（39 评论，18 👍）揭示工具注入开销在本地模型场景不可承受；CoPaw 提交 prefix-cache 优化 PR（排序 tool schema + 拆分 env_context）——**"cache-safe context injection"** 将成为 agent 框架的必备设计原则，与 OpenClaw 的"动态注入破坏前缀缓存"问题形成正反对照。

3. **安全从"边界防护"走向"内容信任分级"**：NanoBot 的路径/凭证防护解决的是"外部攻击"，OpenClaw #7707 Memory Trust Tagging 与 CoPaw #6916 插件权限模型则指向"内容投毒与内部越权"。**按来源打信任标签、插件权限最小化**将成下一阶段安全主线。

4. **子代理完成隔离与路由成为编排标准件**：OpenClaw PR #101248（`completionTarget`）与 #44925 的诉求，在 CoPaw #6927（子 Agent 死循环）、Hermes #78069（clarify 挂起）中得到呼应——**父/子上下文隔离 + 完成回执独立投递 + 超时重启**是多 Agent 框架收敛的公共答案。

5. **跨平台 CI 覆盖缺口集中爆发**：ZeroClaw 74 个 Windows 测试失败、Hermes 桌面杀网关、IronClaw/LobsterAI 的 Windows 文件语义修复——生态普遍存在"CI 只跑 Linux"的历史债。**三平台测试矩阵是 2026 下半年基础设施投入的最确定方向**。

6. **插件 API 系统化竞赛已开启**：Hermes 单日 10+ 插件契约 PR（事件总线、钩子分类、社区索引）、CoPaw 恢复插件频道配置入口、OpenClaw 技能安全扫描——插件生态正从"脚本集合"升级为"稳定契约 + 安全沙箱 + 可发现索引"，这将是各项目差异化的下一主战场。

7. **运维可观测性需求下沉到个人 Agent**：NanoClaw `ncl status` 零依赖健康检查、Hermes skills 索引自动探针、IronClaw 压测覆盖写入路径——个人 agent 的"生产化"要求引入传统运维手段（探针、压测、健康检查、成本计量）。**对开发者的参考价值**：在设计 agent 产品时，将可观测性与可靠性治理（回执、超时、降级、探针）作为一等公民，而非事后补丁。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-13

## 今日速览

过去 24 小时 NanoBot 项目保持**高活跃度**：共 36 条 PR 更新（17 条已合并/关闭），8 条 Issue 更新（4 开 4 关）。今日核心工作集中在**安全加固**与**稳定性修复**：多条 P1 级安全 PR（工作区路径逃逸防护、凭证 URL 不外泄至 Jina Reader、Docker 权限降级）在同日合并，反映出维护团队对安全问题的响应速度很快。同时，新功能侧的探索也未停歇——新增 DeepSeek V4 Pro 原生 Responses 支持、WebUI 会话协作、多渠道设置流程重构等 5 个新 PR 于今日开启。整体来看，项目处于“安全与功能双线推进”的积极健康状态，暂无新版本发布。

---

## 项目进展

今日共有 17 个 PR 被合并或关闭，其中多个是 P1 级重要改动，项目在安全、稳定性与模型接入三个维度上均有实质推进。

**安全修复（合并）**

- **[PR #5329] fix(exec): guard bare and named-user home paths** — [链接](https://github.com/HKUDS/nanobot/pull/5329)
  P1 安全修复。修复 `ExecTool` 在 `restrict_to_workspace=True` 时，路径提取逻辑可能被 `~`（含 `~user`）、输入重定向（`<~root/.bashrc`）和赋值/选项值绕过工作区边界的问题。已合并。
- **[PR #5258] fix(web): keep credential-bearing URLs away from the remote Jina reader** — [链接](https://github.com/HKUDS/nanobot/pull/5258)
  P1 安全修复。对应已关闭 Issue [#4884](https://github.com/HKUDS/nanobot/issues/4884)。带有 userinfo 或 token/signature 风格查询参数的 URL 将走本地可读性路径而非转发给 r.jina.ai；同时完整检查本地重定向链后才允许原 URL 转发，防止短链跳转绕过防护。已合并。
- **[PR #5320] fix(docker): restore capabilities for privilege drop** — [链接](https://github.com/HKUDS/nanobot/pull/5320)
  P1 安全修复。`cap_drop: ALL` 保持不动，但恢复 root 引导路径所需的三个 capabilities，并启用 `no-new-privileges`，确保最终非 root 进程无法通过 setuid 可执行文件或文件 capabilities 重新获得引导权限。已合并。
- **[PR #5218] fix(tools): treat redirection and grouping delimiters in ExecTool path guard** — [链接](https://github.com/HKUDS/nanobot/pull/5218)
  P1 安全修复。修复 `ExecTool` 路径提取正则表达式漏掉重定向符（`>`、`<`、`>>`）和分组运算符相邻路径的问题。已合并。

**稳定性与会话可靠性**

- **[PR #5279] fix(session): store session history outside the agent workspace** — [链接](https://github.com/HKUDS/nanobot/pull/5279)
  P2 修复。会话记录从 `<workspace>/sessions/` 迁移至 `<config-dir>/sessions/<workspace-id>/`，避免工作区暴露给 agent 工具后导致会话记录被读取或篡改，呼应 Issue #5278 的会话可达性问题。已合并。
- **[PR #5271] fix(session): prevent stale background task saves from overwriting session data** — [链接](https://github.com/HKUDS/nanobot/pull/5271)
  **P0 修复（当前为 OPEN 状态，未合并）**。防止 `/new` 或生命周期替换后，过期的后台任务将旧数据写回会话。将 `/new` 与 per-session 压缩串行化，并拒绝来自失效、竞争和复制生命周期对象的保存请求。→ 需重点关注，详见“待处理积压”。

**模型兼容性**

- **[PR #5230] fix(gemini): preserve imported tool calls with signature fallback** — [链接](https://github.com/HKUDS/nanobot/pull/5230)
  P1 修复。Gemini 3 此前会拒绝从其他 provider 导入、且首条函数调用无 thought signature 的回放会话。修复后，保留 Gemini 原生签名并完整保留工具调用与对应工具结果。已合并。
- **[PR #5362] feat(providers): support DeepSeek V4 Pro Responses** — [链接](https://github.com/HKUDS/nanobot/pull/5362)
  P2 新功能。`deepseek-v4-pro` 与 `deepseek-v4-flash` 均接入 DeepSeek 原生 Responses API，并显式保留 `reasoning.effort: "none"` 以兼容关闭默认思考模式的行为。已合并。

**架构与扩展能力**

- **[PR #4878] feat(hooks): add auto-discovery mechanism for agent hooks** — [链接](https://github.com/HKUDS/nanobot/pull/4878)
  P2 新功能。引入基于 `pkgutil` 扫描和 `entry_points` 的 hook 自动注册机制，与现有 channels/tools 的发现模式对齐。自定义 hook 现在只需放入 `nanobot/agent/hooks/` 目录即可生效，无需手动接线。已合并。
- **[Issue #4858] [refactor] Refactor dynamic tool provider lifecycle out of AgentLoop** — [链接](https://github.com/HKUDS/nanobot/issues/4858)
  已将 MCP 相关的状态与生命周期方法（`_mcp_servers`、`_connect_mcp()` 等）从 `AgentLoop` 中剥离，消除工具特定生命周期对核心 agent 循环的侵入。已关闭。

---

## 社区热点

今日讨论热度最高的议题集中在**使用体验 Bug** 与**语音输出功能诉求**上。

- **[Issue #5327] [bug] Nanobot repeats multiple times the same message while reasoning** — [链接](https://github.com/HKUDS/nanobot/issues/5327) — 11 条评论，已关闭
  **现象**：用户反馈在推理过程中 Nanobot 会随机重复生成相同消息（例如重复输出 “Good points, let me investigate the issue”）。该问题会严重干扰多轮任务执行，且出现时机不确定。**用户诉求**：希望复现路径明确化，并排查消息生成管线中是否存在重复 insert 的逻辑竞态。该 Issue 已关闭，但评论中未直接绑定 fix PR，需确认关闭原因（可能为重复消息且由其他 PR 覆盖修复）。
- **[Issue #5295] [bug] deploy with docker compose failed， "cannot open /usr/local/bin/entrypoint.sh: Permission denied"** — [链接](https://github.com/HKUDS/nanobot/issues/5295) — 5 条评论，已关闭
  **现象**：用户严格按照 `deployment.md` 执行 Docker Compose 部署，但容器启动即失败，报错缺少 entrypoint 执行权限。**用户痛点**：部署文档与实际镜像行为不一致，可能导致新用户流失。今日合入的 [PR #5320](https://github.com/HKUDS/nanobot/pull/5320) 即为对应修复，恢复 root 引导路径所需 capabilities 并开启 `no-new-privileges` 防护，从根因解决了该问题。
- **[Issue #4010] [feature] text-to-speech / voice output support** — [链接](https://github.com/HKUDS/nanobot/issues/4010) — 3 条评论，👍 3 个，仍为 OPEN
  语音输入已支持，但输出仍是纯文本，即便在原生支持语音消息的渠道（如 WhatsApp、Telegram）上也如此。用户呼吁补齐语音输出，形成交互闭环。该 Issue 已存在近 3 个月，是社区中明确的缺口信号。

---

## Bug 与稳定性

按严重程度排列，标注修复状态：

| 严重度 | 问题描述 | 状态 |
|---|---|---|
| P0 | 会话数据被过期的后台任务覆盖（[PR #5271](https://github.com/HKUDS/nanobot/pull/5271)），导致 `/new` 后旧数据写回 | **OPEN，待合并**，暂无对应 Issue 跟踪 |
| P1 | 工作区限制可被 shell 扩展（`~user`、`<~root/.bashrc`）绕过（[Issue/PR #5329](https://github.com/HKUDS/nanobot/pull/5329)） | ✅ 已修复，PR 已合并 |
| P1 | 完整用户 URL（含 token/signature）被发送至 r.jina.ai，隐私泄露（[Issue #4884](https://github.com/HKUDS/nanobot/issues/4884) → [PR #5258](https://github.com/HKUDS/nanobot/pull/5258)） | ✅ 已修复，PR 已合并 |
| P1 | Docker 容器因 entrypoint.sh 无执行权限启动失败（[Issue #5295](https://github.com/HKUDS/nanobot/issues/5295) → [PR #5320](https://github.com/HKUDS/nanobot/pull/5320)） | ✅ 已修复，PR 已合并 |
| P1 | 工具路径保护漏掉重定向/分组运算符边界（[PR #5218](https://github.com/HKUDS/nanobot/pull/5218)） | ✅ 已修复，PR 已合并 |
| P1 | Gemini 3 拒绝由其他 provider 转入的 replay 会话（[PR #5230](https://github.com/HKUDS/nanobot/pull/5230)） | ✅ 已修复，PR 已合并 |
| P2 | 推理过程中重复输出同一文本（[Issue #5327](https://github.com/HKUDS/nanobot/issues/5327)） | 已关闭，未见对应 fix PR 关联；需确认是否由其他改动覆盖 |
| P2 | 每日约 5 小时窗口内两个 token 用量测试失败（[Issue #5348](https://github.com/HKUDS/nanobot/issues/5348)）——`record_token_usage()` 默认使用 UTC，而 settings 载荷使用配置时区 | **OPEN，无 fix PR**，需人工关注 |

---

## 功能请求与路线图信号

**用户侧新需求**

- **[Issue #5350] QwenCloud Provider 兼容路径** — [链接](https://github.com/HKUDS/nanobot/issues/5350)（昨日创建）
  提出在现有 DashScope 支持之外，新增 QwenCloud（国际化平台）的向后兼容路径，避免 DashScope 已配置的 provider ID、API Key、endpoint 被废弃。这表明用户群体存在国际化部署的真实需求。
- **[Issue #4010] TTS 语音输出** — [链接](https://github.com/HKUDS/nanobot/issues/4010)
  需求已持续 3 个月未落地，涉及渠道侧与 agent 响应管线的配合，是对“语音交互完整性”的社区呼吁。
- **[Issue #5275] Matrix “reply in thread” 应形成独立对话上下文** — [链接](https://github.com/HKUDS/nanobot/issues/5275)
  用户希望在 Matrix 渠道中，由“回复线程”开启的消息流与顶层房间消息隔离，形成类似 Discord/Slack 的线程语义。今日已有 [PR #5292](https://github.com/HKUDS/nanobot/pull/5292)（OPEN）尝试修复 Matrix 回复不关联用户消息的问题，虽不是完全满足，但方向一致。

**开发中信号（可能进入下个版本）**

- **[PR #5358] WebUI 会话协作（@提及）** — [链接](https://github.com/HKUDS/nanobot/pull/5358)
  为持久化会话分配稳定的服务端 `@name`，允许用户在 composer 中提及对端会话，并支持跨会话协作与稳定身份色。偏向多人协作场景。
- **[PR #5356] 改善各聊天渠道的设置流程** — [链接](https://github.com/HKUDS/nanobot/pull/5356)
  将渠道字段按 account/credentials/connection/mail/access/behavior/security 分组，增强未配置渠道的可操作性提示，并改进表单交互语义。
- **[PR #5361] 微信渠道 QR 登录 token 持久化** — [链接](https://github.com/HKUDS/nanobot/pull/5361)
  修复 `config.json` 缺少 `channels` 字段时，微信 WebUI 扫码登录后的 token 只写 `account.json` 不写回 `config.json` 的问题。
- **[PR #4329] 原生 TypeScript 终端 UI（CLI）** — [链接](https://github.com/HKUDS/nanobot/pull/4329)
  将 `nanobot agent` 重建为 TypeScript/OpenTUI 客户端，Python gateway 继续作为唯一后端实现。开放 2 个月未合并，存在冲突，但方向明确，属于终端用户体验升级的长期候选。

---

## 用户反馈摘要

- **`docker compose` 部署门槛**（[Issue #5295](https://github.com/HKUDS/nanobot/issues/5295)）：用户按文档操作即失败，“照文档走不通”是最直接的坏印象来源。好在根因已被定位并修复（`cap_drop: ALL` 使用方式不当），但建议核查 `deployment.md` 是否需要同步更新，避免其他用户踩同样的坑。
- **随机重复消息干扰使用**（[Issue #5327](https://github.com/HKUDS/nanobot/issues/5327)）：用户描述该问题“随机出现”，在调查类任务中尤其明显。不确定性 Bug 对 agent 的可信度损害较大，建议维护者确认该 Bug 的根因是否已通过某个合并 PR 真正关闭，而非仅关闭 Issue。
- **语音闭环诉求**（[Issue #4010](https://github.com/HKUDS/nanobot/issues/4010)）：3 个 👍 虽然不多，但“输入可语音、输出只能文字”割裂了移动端原生体验，是确定性痛点。该 Issue 被长期保留，说明社区没有放弃，但响应优先级不高。
- **安全与隐私关注度上升**：从 [#4884](https://github.com/HKUDS/nanobot/issues/4884)（用户完整 URL 被发往第三方 Jina）到 [#5258](https://github.com/HKUDS/nanobot/pull/5258)（凭证 URL 本地化读取），说明有用户在使用 WebFetch 时注意到了第三方数据流问题。维护者快速合入修复是积极信号。

---

## 待处理积压

以下问题/PR 长时间未得到响应或关键优先级较高，建议维护者优先介入：

1. **[PR #5271] fix(session): prevent stale background task saves from overwriting session data — P0** — [链接](https://github.com/HKUDS/nanobot/pull/5271)
   开合 7 天未合并，无冲突但仍处于 OPEN。该修复直接阻止 `/new` 后旧任务覆盖会话，是影响会话完整性的严重缺陷，建议优先 review 并合入。

2. **[Issue #4010] text-to-speech / voice output — 3个月** — [链接](https://github.com/HKUDS/nanobot/issues/4010)
   语音输出是呼声持续最久的功能请求。若短期无排期，建议明确标注 roadmap 状态，避免用户反复追问；若有计划，可同步渠道侧需求。

3. **[PR #4329] feat(cli): native TypeScript terminal UI — 2个月，conflict** — [链接](https://github.com/HKUDS/nanobot/pull/4329)
   已开放 61 天，且带 conflict。若不再考虑合并，应明确关闭并给作者答复；若仍有意向，需解决冲突并确认维护者是否能承接长期维护。

4. **[PR #5204] refactor(providers): declare Responses capabilities — P1，conflict** — [链接](https://github.com/HKUDS/nanobot/pull/5204)
   开放 12 天，带冲突。属于 provider 层架构重构，会影响后续多个模型接入，建议尽早解决冲突进入合并流程。

5. **[Issue #5348] token-usage 测试在每日约 5 小时窗口内确定性失败** — [链接](https://github.com/HKUDS/nanobot/issues/5348)
   属于 CI/测试稳定性问题，根源是 UTC 与配置时区不一致。虽不影响生产，但会持续消耗开发者排查精力，建议快速修复或临时跳过（skip）该窗口内的测试。

6. **[PR #5338] fix(mcp): preserve credentials when OAuth store read fails** — [链接](https://github.com/HKUDS/nanobot/pull/5338)
   2 天前创建，已标记 conflict。该修复防止 OAuth store 读取失败时被误判为空 store、进而覆盖其他服务器的凭据，涉及凭证安全，建议本周内处理。

---

*本日报数据周期：2026-08-12 00:00 UTC — 2026-08-13 00:00 UTC（约）*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-13

> 数据来源：NousResearch/hermes-agent GitHub 仓库（数据快照时间 2026-08-13）

## 1. 今日速览

今日项目活跃度处于高位：过去 24 小时更新 Issues 和 PR 各 50 条，其中 Issues 新开/活跃 37 条、关闭 13 条；PR 待合并 47 条、合并/关闭 3 条。社区讨论热度集中在**工具 Token 开销优化**（#6839，39 评论）和**插件接口扩展计划**（#64182/#64231，累计 57 评论），同时两条 P1 级 Bug（#83683 桌面重启杀死网关、#78069 clarify 挂起）正在持续发酵。核心贡献者 teknium1 连续提交了大量插件基础设施 PR，插件生态建设明显处于集中攻坚阶段。今日无新版本发布。

---

## 2. 版本发布

今日无新版本发布（Releases: 0）。

---

## 3. 项目进展

今日合并/关闭的 PR 数量为 3 条（其中 2 条在展示列表中可确认），主要进展集中在**桌面端安全令牌存储**：

- **Linux 密钥环后端自动检测** — [PR #84903](https://github.com/NousResearch/hermes-agent/pull/84903) 已关闭（salvage 自 6 月 7 日的 [PR #41236](https://github.com/NousResearch/hermes-agent/pull/41236)）。`hermes desktop` 现在可自动检测 KDE Wallet / GNOME Keyring / D-Bus Secret Service 并桥接为 Chromium password store，修复了 Linux 无密钥环服务时桌面端无法保存远程网关令牌的问题（对应 [Issue #62294](https://github.com/NousResearch/hermes-agent/issues/62294)，今日同时关闭）。

此外，超过 10 条新 PR 于今日进入待合并队列，均为**插件接口扩展计划**（跟踪 [Issue #64182](https://github.com/NousResearch/hermes-agent/issues/64182)）的组成部分，覆盖面广——从流式输出观察者钩子到社区插件索引、从跨插件事件总线到审批传输抽象。尽管尚在待合并状态，这批 PR 集中展示了项目在插件体系上的明确路线图，若全部合入，将标志着 Hermes Agent 插件 API 从单点增强走向系统性稳定契约。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心内容 |
|------|----------|--------|----------|
| 1 | [#6839 Lazy Tool Schema Loading](https://github.com/NousResearch/hermes-agent/issues/6839) | 39（👍 18） | 每次 API 调用注入全部工具 schemas，50+ 工具消耗约 3,500–5,000 tokens，本地模型尤甚 |
| 2 | [#64182 插件接口扩展计划（tracking）](https://github.com/NousResearch/hermes-agent/issues/64182) | 33 | 社区插件接口扩展的参考计划，来自 Discord 社区讨论（7 月 4 日线程） |
| 3 | [#64231 插件生命周期事件目录与钩子分类](https://github.com/NousResearch/hermes-agent/issues/64231) | 24 | 为观察者钩子集群定义统一的生命周期事件目录和验收标准，批量处理待定钩子 PR |
| 4 | [#66616 Skills 索引自动探针告警](https://github.com/NousResearch/hermes-agent/issues/66616) | 19 | 自动探针报告 skills-index.json 已 29.8 小时未更新（限制 26h），状态 degraded |
| 5 | [#83683 桌面重启杀死活跃网关（P1）](https://github.com/NousResearch/hermes-agent/issues/83683) | 9 | Windows 桌面应用每次重启强杀正在运行的 messaging gateway 且不重新拉起 |
| 6 | [#78069 clarify 回复间歇性无法绑定（P1）](https://github.com/NousResearch/hermes-agent/issues/78069) | 9 | 工具自由文本回复偶发无法绑定待定 clarify 调用，导致会话无限期挂起 |

**趋势分析**：今日讨论呈现两条主线。其一是**成本与技术效率**——#6839 对工具 schema 注入的 Token 开销发出质疑，用户对本地模型场景下的格式开销高度敏感，这也呼应了插件接口扩展中“cache-safe context injection”（[#64167](https://github.com/NousResearch/hermes-agent/issues/64167)）的设计方向。其二是**桌面端稳定性焦虑**——#83683/#84824 连续两天出现“桌面端杀死网关”的回归报告，加上今日新增的 #84870/#84871 桌面相关问题，说明桌面应用生命周期管理已成为社区痛点。

---

## 5. Bug 与稳定性

### P1 — 严重回归/挂起

- **[#83683 — 桌面重启收割活跃网关且不重新拉起（Windows）](https://github.com/NousResearch/hermes-agent/issues/83683)** — 0.20.0 回归。桌面应用每次重启都会 force-kill 正在运行的 gateway，WeChat/QQ 机器人和 Telegram 集体静默，直到手动重启。今日另有重复报告 [#84824](https://github.com/NousResearch/hermes-agent/issues/84824)。**未见对应 fix PR。**
- **[#78069 — clarify 回复间歇性无法绑定，会话无限期挂起](https://github.com/NousResearch/hermes-agent/issues/78069)** — 0.19.1 版本，影响 Discord/Home Assistant 等多平台。用户回复无法绑定到待定 clarify 调用，直到 3600 秒超时。后续 Issue [#82975](https://github.com/NousResearch/hermes-agent/issues/82975)（Telegram 复现，profile-namespaced 键漏匹配）确认这是**第二个独立失败模式**。**未见对应 fix PR。**

### P2 — 影响面较大的问题

- **[#83427 — browser_exec 崩溃：PYTHONPATH 指向 Hermes venv 时 pydantic_core ModuleNotFoundError](https://github.com/NousResearch/hermes-agent/issues/83427)** — 桌面应用中 Browser Use 模式每次调用必然失败，venv 路径污染导致 import 错误。已存在 [PR #84933](https://github.com/NousResearch/hermes-agent/pull/84933) 修复 CDPSupervisor 标签页泄漏，但此路径冲突问题尚无对应修复。
- **[#71331 — Termux 安装失败：默认 Python 3.14+ 不受 install.sh 支持](https://github.com/NousResearch/hermes-agent/issues/71331)** — `requires-python = ">=3.11,<3.14"` 与 install.sh 仅检查下界不一致。
- **[#84928 — Nous provider keepalive 从不提前刷新，凭证必然期后 401](https://github.com/NousResearch/hermes-agent/issues/84928)** — 已有一份详细的分析报告（71 次刷新均为迟到刷新），**已有 fix PR [#84928](https://github.com/NousResearch/hermes-agent/pull/84928)**（同一编号，作者 olopez25）。
- **[#84870 — 会话列表显示陈旧 lineage ROOT 而非实时 tip](https://github.com/NousResearch/hermes-agent/issues/84870)** — `/new` 重置后桌面侧栏显示旧的标题和时间戳。
- **[#84871 — Discord 触发消息上下文泄漏进存储消息与会话标题](https://github.com/NousResearch/hermes-agent/issues/84871)** — 内部控制包装器污染 transcript/export。

### P3 — 自动化告警/低影响

- **[#66616 — Skills 索引陈旧（29.8h > 26h 限制）](https://github.com/NousResearch/hermes-agent/issues/66616)** — 自动化探针标记 degraded，需人工介入检查 CI 构建。

**关于 #83683 与 #78069 的风险提示**：两者同为 P1 且都涉及会话/消息交付，且 #78069 已衍生子 Issue #82975，说明根因尚未完全收敛。建议维护者优先排查桌面端应用生命周期管理与 session-key 绑定逻辑。

---

## 6. 功能请求与路线图信号

### 可能进入下一版本的功能

- **Lazy Tool Schema 两段式注入（[#6839](https://github.com/NousResearch/hermes-agent/issues/6839)）** — 18 👍、39 评论的高热度需求，回复中社区讨论充分，且与当前插件“cache-safe context injection”方向互补，具备纳入路线图的民意基础。
- **插件接口扩展全套能力（[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) 跟踪）** — 今日新增 PR 对应子 issue 覆盖：流式输出观察钩子（#64161）、社区插件索引与搜索（#64181）、pre_transcription STT 钩子（#64168）、跨插件事件总线（#64164）、网关会话消息注入（#65448）、所有权台账与 on_unload（#64229）、红action 模式注册表（#65449）。这批 PR 若全部合入，Hermes 插件 API 将达到接近成熟的水平——**大概率进入 0.21 或 0.22 版本**。
- **桌面多网关标签页（[#45779](https://github.com/NousResearch/hermes-agent/issues/45779)，7 👍）** — 跨机器管理多个 Hermes 实例的场景，社区有真实需求。
- **小米 MiMo-V2.5 TTS/ASR 原生支持（[#46257](https://github.com/NousResearch/hermes-agent/issues/46257)）** — 中文语音场景下的强需求（关联 #43700 被标记为重复）。

### 值得关注的长期创新提案

- **[#38275 — HAMP：Agent 地址系统 + 异步消息 + 加密身份](https://github.com/NousResearch/hermes-agent/issues/38275)** — 从 6 月 3 日创建至今仅 2 条评论，但是一个深度的 A2A 补充协议提案（地址、收件箱、加密身份），短期可能不会排期，适合作为长期研究储备。
- **[#84834 — Webhook Revolution 修复战役（meta-issue）](https://github.com/NousResearch/hermes-agent/issues/84834)** — 8 月 12 日新建的 5×2×3 图门控修复战役，规划了完整的 webhook 表面修复计划。

---

## 7. 用户反馈摘要

- **Token 成本是本地模型用户的核心痛点**（#6839）：用户 jarviszomine 指出 3,500–5,000 token/次的工具格式开销“无论对话是否需要那些工具都会消耗”，本地模型上的格式开销尤其难以承受。评论区 39 条讨论显示，社区对“按需注入工具 schema”的呼声强烈。
- **桌面端重启杀网关造成实际业务中断**（#83683，用户 zuowen7）：WeChat、QQ 机器人全部静默，“直到手动重启网关才恢复”——对于依赖 IM 机器人做自动化的用户，这类回归的实际代价是消息丢失和业务停顿。
- **误报导致身份文件被剥离**（PR [#84930](https://github.com/NousResearch/hermes-agent/pull/84930)）：“havoc”是用户 agent 的合法画像名称，却被威胁模式扫描器识别为 C2 框架并触发整个 SOUL.md 被静态剥离。这一案例反映了上下文安全扫描的**假阳性代价过高**，用户重要的身份/人格设置会被静默移除且难以察觉。
- **Skills 索引自动化探针在运转**（#66616）：nousbot-eng 的自动化探针检测到索引退化并自动创建 Issue，说明项目的基础设施可观测性正在发挥作用，但索引构建管道本身出现了失联风险（29.8h 未更新）。
- **Linux 无密钥环环境下的令牌存储问题已解决**（#62294/#84903）：Hyprland/Sway 等极简 WM 用户反馈“Settings 表单直接报错”，现已由 PR #84903 修复并关闭。

---

## 8. 待处理积压

- **[#38275 — HAMP 提案（2026-06-03 创建，2 评论）](https://github.com/NousResearch/hermes-agent/issues/38275)** — 一个有深度的 A2A 补充协议提案（agent@domain 地址、异步收件箱、加密身份），沉寂超 2 个月。建议维护者给出明确回应或转移至长期路线图看板，避免社区创意在 tracker 中沉底。
- **[#66616 — Skills 索引陈旧（自动化告警，截至今日仍未解决）](https://github.com/NousResearch/hermes-agent/issues/66616)** — 索引已超限 3.8 小时，说明 `.github/workflows/skills-index.yml` 可能遇到 CI 故障或 cron 静默失败，请尽快排查。
- **[#46257 — 小米 MiMo-V2.5 TTS/ASR 支持（2026-06-14 创建，6 评论）](https://github.com/NousResearch/hermes-agent/issues/46257)** — 中文语音场景的明确需求，已等待 2 个月，仅有 6 条评论，建议维护者评估是否纳入路线图或标记为待赞助功能。
- **[#45779 — 多网关标签页（2026-06-13 创建，6 评论，7 👍）](https://github.com/NousResearch/hermes-agent/issues/45779)** — 跨机器管理多个 Hermes 实例的需求获得 7 个 👍，但两个月无实质推进，桌面端当前仍只支持单网关。
- **P1 Bug 长期暴露风险**：#83683（桌面杀网关）和 #78069（clarify 挂起）分别影响桌面端与多平台消息交付，自 8 月上旬报告以来已持续多日，目前均无对应 fix PR 合入，考虑到它们直接威胁消息可达性，建议提高处置优先级。

---

*本日报基于 GitHub 公开数据快照自动生成，不包含未公开的内部讨论。所有链接均为项目仓库真实地址。*
*注：部分 PR 展示数据中“评论数”字段为 undefined，可能与 PR 创建时间过短有关。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时内，PicoClaw 仓库共更新 2 条 Issue 和 3 条 Pull Request，无新版本发布，整体活跃度处于**中等水平**。两条 Issue 均为带 `[stale]` 标签的历史 Bug（Web UI 输入卡顿、MCP 连接失败导致 Agent 挂起），8 月 12 日仍有状态更新，说明社区讨论热度未消退。三笔 PR 均为待合并状态，分别涉及 Agent 上下文管理、Telegram 主题支持和 Exa 搜索 Provider，其中两笔在昨日获得贡献者推送。值得关注的是，过去 24 小时无新 Issue/PR 创建，且所有 PR 均未被合并，**合并节奏偏慢**是当前项目健康度的主要风险项。

## 3. 项目进展

过去 24 小时**无 PR 被合并或关闭**。目前有 3 笔 PR 处于待合并状态，共同指向下一版本的核心能力补强：

- **#3316 修复 routed-agent 上下文管理**（j-v，8月3日创建，8月12日更新）：修复通过 dispatch rules 路由到特定 Discord 频道的 Agent 无法记忆历史消息、自动压缩（auto-compaction）永不触发的问题。变更涉及 history、summarization、compression 与 seahorse bootstrap 的联动逻辑，若合入将显著改善多会话场景下的长期记忆可靠性。
  https://github.com/sipeed/picoclaw/pull/3316

- **#3315 支持私聊机器人中的 Telegram 主题**（genuss，8月3日创建，8月12日更新）：修复 PicoClaw 仅当 `Chat.IsForum` 为 true 时才识别话题（topic）的问题，补充了私聊机器人通过 `IsTopicMessage` 提供话题场景的支持，完善 Telegram 渠道集成细节。
  https://github.com/sipeed/picoclaw/pull/3315

- **#3299 添加原生 Exa 网络搜索 Provider**（kesku，7月26日创建，8月12日更新）：新增 Exa 作为原生 `tools.web` / `web_search` Provider，基于 `POST /search` API 实现，支持 `d/w/m/y` 时间范围过滤，扩展了搜索后端的可插拔能力。
  https://github.com/sipeed/picoclaw/pull/3299

三笔 PR 均未合入，项目当前处于**能力积累但未落地的阶段**。建议维护者尽快安排 review，#3316 与 #3269 反映的 Agent 主链路稳定性问题直接相关，优先级应最高。

## 4. 社区热点

两条 Issue 分别获得 4 条评论与 1 个 👍，是当前讨论最集中的议题：

- **#3281 Web UI 历史稍长时输入框严重卡顿**：用户报告在单会话中累积较多聊天历史后，输入框出现明显延迟，直指 Web 前端长上下文渲染/交互性能瓶颈。Issue 已开放 23 天并被打上 `[stale]`，但 8 月 12 日仍有更新，说明用户侧诉求持续存在。
  https://github.com/sipeed/picoclaw/issues/3281

- **#3269 MCP 服务器连接失败导致 Agent 循环挂起**：当 MCP server 连接异常时，Agent 循环被阻塞，聊天界面完全停止回复。属于典型的外部依赖故障引发主流程不可用问题，反映用户对系统鲁棒性的高期待。
  https://github.com/sipeed/picoclaw/issues/3269

两处热点的共同诉求是**对话链路的健壮性与性能**：一个是长会话场景下的前端交互性能，另一个是外部服务故障时的降级与恢复能力，均直接影响核心用户体验。

## 5. Bug 与稳定性

按严重程度从高到低排列：

| 严重度 | Issue | 问题描述 | 状态 |
|--------|-------|----------|------|
| 🔴 高 | #3269 | MCP 服务器连接失败导致 Agent loop 挂起，聊天界面停止回复用户，核心功能不可用 | OPEN，`[stale]`，暂无关联 fix PR |
| 🟠 中 | #3281 | Web UI 输入框在会话历史稍长时明显卡顿（laggy），影响高频输入交互体验 | OPEN，`[stale]`，暂无关联 fix PR |

- 🔴 **#3269**：影响面最大。Agent 主循环被单一外部服务故障阻塞，建议优先排查 MCP 客户端的连接超时、失败重试与降级策略。
  https://github.com/sipeed/picoclaw/issues/3269
- 🟠 **#3281**：与前端长列表渲染/状态管理性能相关，可考虑虚拟滚动、消息窗口截断或增量渲染方案。
  https://github.com/sipeed/picoclaw/issues/3281

两个问题均已在 8 月 12 日获得更新（评论或状态变化），但尚无对应的修复 PR 出现，且均已超过三周未关闭，稳定性问题存在持续积累趋势。

## 6. 功能请求与路线图信号

当前无新提交的功能请求 Issue，但三笔待合并 PR 释放了明确的路线图信号：

- **Agent 上下文管理升级（#3316）**：修复 routed-agent 的长期记忆与自动压缩问题，属于 Agent 可靠性方向的关键补强，大概率进入下一版本。
- **Telegram 主题支持（#3315）**：对私聊场景 topic 的补齐表明项目仍在持续打磨 Telegram 渠道的交互细节，属于低成本高收益的平台适配。
- **Exa 搜索 Provider（#3299）**：新增可插拔搜索后端并与现有时间过滤体系兼容，属于能力扩展型功能，合入优先级取决于维护者对新 Provider 的支持意愿。

此外，#3269（MCP 故障挂死）是 Agent 主链路稳定性问题的直接暴露，建议将"外部依赖故障隔离/降级"纳入后续迭代的技术债清单。

## 7. 用户反馈摘要

- **长会话性能痛点（#3281）**：用户 `xpader` 在 PicoClaw 0.3.1 + Web UI 环境下复现输入延迟，且历史越长越明显。这表明前端在消息量增长后存在渲染或状态管理层面的性能退化，"输入框卡顿"直接打断核心交互节奏，是高频使用场景下的真实痛点。

- **外部依赖故障不可用（#3269）**：用户 `ruiyigen` 在 nightly 版本（git 2cf030d2）+ Qwen3 环境下发现，MCP server 连接失败会让 Agent 循环挂死，聊天界面停止回复。用户的隐含期望是：即使外部工具不可用，Agent 也应能优雅降级而非整体卡死，当前容错机制明显不足。

- 两个问题均已超过三周未关闭并被标记为 stale，用户可能产生"反馈未被重视"的感知。建议维护者至少在相关 Issue 中回复处理计划或临时 workaround（如重试机制、清理缓存的配置项），以维持社区信任。

## 8. 待处理积压

以下为长期未解决、需要维护者关注的存量项：

- **#3269**：7月20日创建，开放 24 天，`[stale]`，4 评论。核心对话链路稳定性问题，建议优先响应并上调处理优先级。
  https://github.com/sipeed/picoclaw/issues/3269

- **#3281**：7月21日创建，开放 23 天，`[stale]`，4 评论。Web UI 高频交互性能问题，建议纳入前端优化迭代。
  https://github.com/sipeed/picoclaw/issues/3281

- **PR #3299**：7月26日创建，待合并 18 天。功能实现完整但迟迟未获 review，长时间搁置易产生分支冲突并挫伤贡献者积极性。
  https://github.com/sipeed/picoclaw/pull/3299

- **PR #3316 / #3315**：8月3日创建，待合并 10 天。两者昨日均有更新，贡献者仍在维护，请尽快安排 review 以避免社区贡献流失。
  https://github.com/sipeed/picoclaw/pull/3316
  https://github.com/sipeed/picoclaw/pull/3315

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-13

## 今日速览

过去 24 小时 NanoClaw 维持中等偏活跃的开发节奏：4 条 Issue 新增/更新（全部为 OPEN，无关闭）、10 条 PR 更新（9 条待合并、1 条合并/关闭），无新版本发布。核心团队围绕 Agent Plugins 1.0.0 引擎级重构（#3220）持续发力，其与 #2909、#3231 三条 PR 同日更新，构成清晰的路线图主线；社区侧新增 2 个 Bug 报告和 1 个功能提案，整体项目健康度良好，但修复类 PR 的合并速度偏慢是当前主要瓶颈。唯一合并的 PR（#3086）为 WhatsApp 渠道带来实质性的发送可靠性修复。

## 项目进展

今日有 1 个 PR 被合并/关闭：

- **[PR #3086 [CLOSED] fix(whatsapp): validate recipient exists before sending](https://github.com/nanocoai/nanoclaw/pull/3086)** — 作者: alexandra261 | 合并于 2026-08-12
  - **问题**：Baileys 的 `sock.sendMessage` 接受任意 JID，即使号码未在 WhatsApp 注册也会返回 message key，导致主机日志显示 `Message delivered` 与实际平台 ID，但消息实际未送达——形成"假成功"静默丢消息。
  - **修复**：发送前校验收件人是否存在，杜绝无效投递。

此外，核心团队主导的 **[PR #3220（Agent 模板 → Agent Plugins 1.0.0 目录迁移）](https://github.com/nanocoai/nanoclaw/pull/3220)** 今日仍在推进，该 PR 属于带 breaking change 的引擎级格式迁移，并附带 stamp-time 符号链接/权限/密钥加固等安全修复。它同时是 #2909（setup 向导模板流程 + 首个 agent stamping）与 #3231（codex/opencode 插件 MCP cwd 支持）的前置依赖，三者组成的"PR train"是当前版本迭代的核心引擎。

## 社区热点

- **[Issue #2504 feat: add `ncl status` command（1 条评论）](https://github.com/nanocoai/nanoclaw/issues/2504)** — 创建于 2026-05-15，最近更新 2026-08-12
  - **热度**：当前唯一带评论的 Issue，且今日仍有更新，讨论跨度近 3 个月。
  - **诉求**：用户明确指出 `ncl sessions list` 不含容器存活、最后消息时间、近期错误等健康信号，而 `/add-dashboard` skill 依赖外部组件过重。核心诉求是提供一条"零依赖、秒级"的轻量运维健康检查命令。这是中大型部署场景下的刚性需求，值得纳入路线图。

- **[PR #3220 feat!: agent templates become Agent Plugins 1.0.0 directories](https://github.com/nanocoai/nanoclaw/pull/3220)** — 作者: amit-shafnir | 更新 2026-08-12
  - 作为核心团队引擎级变更，该 PR 同时驱动 #2909、#3231 两条堆叠 PR 在同日更新，是当前技术社区关注度最高的主线。其 breaking change 属性意味着合入后模板格式将发生迁移，相关用户需关注迁移指引。

## Bug 与稳定性

按严重程度排列：

1. **[Issue #3233: Agent-scoped `ncl tasks` 对 2.1.54 之前的周期任务"失明"](https://github.com/nanocoai/nanoclaw/issues/3233)**（高）
   - 报告：2026-08-12 | 作者: jonnychesthair-crypto
   - **现象**：从旧版本迁移到 2.1.54 后，agent 在容器内执行 `ncl tasks list` 返回 `No tasks.`，但周期任务实际存在且按计划触发；`tasks get / pause / resume / cancel / update` 对旧任务也全部失败。
   - **根因**：缺少将 legacy 行 rehome 到新 schema 的迁移逻辑。
   - **状态**：无关联 fix PR，属升级回归问题，建议优先处理。

2. **[Issue #3234: 模板创建的 agent group 缺少 `ag-` 前缀](https://github.com/nanocoai/nanoclaw/issues/3234)**（中）
   - 报告：2026-08-12 | 作者: avital-nanoco
   - **现象**：`ncl groups create --template <ref>` 生成裸 `randomUUID()`，而 `--folder` 路径生成 `ag-<uuid>`；裸 UUID 被原样用作 OneCLI agent 标识，若以数字开头会触发 `ensureAgent` 校验失败，导致 spawn 失败。
   - **状态**：无关联 fix PR。

3. **待合并的修复类 PR 队列**：
   - [PR #2689 fix(signal)：DM 平台 ID 一致性、isMention、ask_question/审批投递](https://github.com/nanocoai/nanoclaw/pull/2689) — 已等待约 2 个月，修复 Signal 首条消息被静默丢弃等严重问题。
   - [PR #2346 fix(formatter)：未知斜杠命令按普通聊天处理](https://github.com/nanocoai/nanoclaw/pull/2346) — 已等待约 3 个月，修复未知命令被 SDK 静默吞掉的问题。
   - [PR #3193 fix(telegram)：更新 Chat SDK 以支持富消息](https://github.com/nanocoai/nanoclaw/pull/3193) — 等待评审中。
   - [PR #3230 fix(skills)：移除文档中对已退役 data/env mirror 的指向](https://github.com/nanocoai/nanoclaw/pull/3230) — 等待评审中。

## 功能请求与路线图信号

- **[Issue #3232: 新增 QwenCloud 可选 provider skill](https://github.com/nanocoai/nanoclaw/issues/3232)**（2026-08-12）
  - 用户提议以 `/add-qwencloud` 形式接入 QwenCloud（支持 OpenAI/Anthropic 兼容 API）。NanoClaw 一贯采用 provider skill 模块化路线，此提案与既有架构高度契合，预计被接受概率较高。

- **[Issue #2504: `ncl status` 轻量健康检查命令](https://github.com/nanocoai/nanoclaw/issues/2504)**（2026-05-15）
  - 持续 3 个月的运维刚需，已进入社区讨论阶段，是明显的下一版本候选功能。

- **[PR #3189: `add-why` skill — 解释单条消息发生了什么](https://github.com/nanocoai/nanoclaw/pull/3189)**（2026-08-05）
  - 面向可解释性与调试场景的 utility skill，等待评审。

- **[PR #3050: 设置向导接入 Dial 渠道](https://github.com/nanocoai/nanoclaw/pull/3050)**（2026-07-14）
  - 新增渠道 + `runChannelSkill` 模型，进一步扩展消息渠道生态。

- **Agent Plugins 主线（#3220 + #2909 + #3231）**：引擎级模板机制重构，落地后预计成为 2.2 或 3.0 的核心能力，且包含安全加固内容，建议密切跟踪合入进度。

## 用户反馈摘要

- **运维可观测性不足**（#2504）：用户描述"正在运行的实例没有快速健康检查入口"，现有 `ncl sessions list` 不提供容器存活/最近错误信号，`/add-dashboard` skill 则依赖外部组件。真实使用场景是日常巡检与故障快速定位，用户希望有"一条命令搞定"的轻量方案。

- **升级迁移断层**（#3233）：迁移到 2.1.54 的用户发现任务"存在且正常触发"，但所有管理接口失效。这种"数据在、接口盲"的分裂状态最容易引发用户对升级的不信任，属于典型的迁移路径设计缺口。

- **创建路径行为不一致**（#3234）：`--template` 与 `--folder` 两种创建方式产出不同 ID 格式，其中一种会触发校验失败。用户对"同一命令不同子路径行为分裂"的容忍度极低，属易引发困惑的 API 一致性问题。

## 待处理积压

| 条目 | 类型 | 创建时间 | 等待时长 | 备注 |
|---|---|---|---|---|
| [#2346 formatter 未知斜杠命令修复](https://github.com/nanocoai/nanoclaw/pull/2346) | PR | 2026-05-08 | ~3 个月 | 造成消息静默丢弃，影响面大 |
| [#2504 `ncl status` 健康检查命令](https://github.com/nanocoai/nanoclaw/issues/2504) | Issue | 2026-05-15 | ~3 个月 | 有社区讨论，运维刚需 |
| [#2689 Signal DM 系列修复](https://github.com/nanocoai/nanoclaw/pull/2689) | PR | 2026-06-04 | ~2 个月 | 首条消息丢失等严重问题 |
| [#2909 setup 模板向导 + 首个 agent stamping](https://github.com/nanocoai/nanoclaw/pull/2909) | PR | 2026-07-02 | ~6 周 | 依赖 #3220 合入，属正常排队 |
| [#3050 Dial 渠道支持](https://github.com/nanocoai/nanoclaw/pull/3050) | PR | 2026-07-14 | ~4 周 | 新渠道功能，等待评审 |
| [#3189 add-why skill](https://github.com/nanocoai/nanoclaw/pull/3189) | PR | 2026-08-05 | ~1 周 | 等待评审 |

**维护者重点关注**：#2346 与 #2689 两条修复 PR 分别滞留 3 个月和 2 个月，且同属"消息被静默丢弃"类问题，长期积压将持续损害 Signal 渠道与斜杠命令用户的使用体验，建议优先安排评审与合入。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-13

## 1. 今日速览

过去 24 小时 IronClaw 仓库保持高速迭代：41 条 Issue 更新（新开/活跃 29，关闭 12）、50 条 PR 更新（待合并 31，已合并/关闭 19），并发布 2 个 1.2.0 候选版本。核心动作集中在三条线：**发布管线修复**（docker 镜像补装 curl、cargo-dist 下载重试）、**Telegram 渠道 QA bug 批量上报**（至少 9 个新问题，含 2 个 P1）、以及 **loop 主机/编码工具契约的重构推进**。综合来看，项目处于高频发布与功能收敛并行的阶段，但 Telegram 与多用户访问的稳定性问题较为集中，需要优先排期。

---

## 2. 版本发布

### ironclaw-v1.2.0-rc.3（2026-08-12）
- **修复**：运行时容器镜像现安装 `curl`，使编排器的 in-container HTTP 健康检查可以执行。此前镜像未携带 HTTP 客户端，导致 `curl -fsS http://localhost:3000/` 探测永远无法运行，容器永远不会被标记为 healthy。
- **影响**：所有基于该镜像的部署（尤其是托管编排环境）升级后应能正确上报健康状态；已运行中的旧镜像容器需要重建才能获得此修复。

### ironclaw-v1.2.0-rc.2（2026-08-12）
- **修复**：Windows 首次启动的文件系统发布改用原生原子重命名语义（替代硬链接），并容忍不支持的目录同步操作。
- **修复**：Release smoke 运行保留 Windows 账户身份，确保独立 secrets key 的安全。
- **迁移注意**：Windows 部署者升级后，文件发布不再依赖硬链接，若依赖旧行为需验证工作区文件同步逻辑。

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下几条对项目推进意义较大：

| PR | 说明 | 价值 |
|---|---|---|
| [#7555 fix(docker): install curl so orchestrator healthchecks can run](https://github.com/nearai/ironclaw/pull/7555) | 将 #7303 从 1.1.0-rc.1 分支前向移植到 2026-08-11 分支 | 修复容器健康检查这一基础设施级问题，直接促成 rc.3 发布 |
| [#7550 feat(extensions): per-field help text on admin configuration forms + channel setup docs rewrite](https://github.com/nearai/ironclaw/pull/7550) | Manifest 的 `admin_configuration` 字段支持可选 `description`，在 WebUI Admin 表单中渲染为提示文本；Telegram manifest 为首个使用者 | 提升运维人员配置表单的可理解性，降低 Telegram 等渠道的配置门槛 |
| [#7560 fix(release): retry the dist installer download](https://github.com/nearai/ironclaw/pull/7560) | 为 cargo-dist 下载增加重试机制，解决 rc.3 发布 18 秒即失败（curl 56 连接中断）的问题 | 增强发布管线的健壮性 |
| [#5503 实验：Add compact Google extension capabilities](https://github.com/nearai/ironclaw/pull/5503) | 为 Gmail / Calendar 增加 compact 能力（如 `gmail.fetch_message_summaries`），避免全量消息读取的 fanout | 提升 Google 扩展的 token 效率与 inbox 摘要场景的可用性 |
| [#7427 release: prepare 1.1.1-rc.1](https://github.com/nearai/ironclaw/pull/7427) | 将 IronHub/custom MCP、WebUI、retrieval、runtime-credential、Slack、Telegram 的紧急修复 backport 到 1.1 release 线；默认跳过遗留 channel state 迁移 | 稳定 1.1 维护分支，同时为 1.2 新功能留出空间 |
| [#6836 feat(webui): @ironclaw/ui and workspace refactor](https://github.com/nearai/ironclaw/pull/6836) | 在最新 main 上重新推导 WebUI 设计系统为 workspace 包 `@ironclaw/ui`，分五层提交 | 为 Storybook 与设计系统落地（#7038 epic）奠定基础 |

**整体评估**：发布管线的两处阻塞（健康检查、installer 下载）已在一天内修复并发布 rc.3；WebUI 设计系统与 Google 扩展 compact 能力从长期分支进入合入状态，项目在向 1.2.0 稳定版收敛。

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

## 4. 社区热点

今日评论数最高的两个 Issue 均与 **agent loop 的并发与压力测试** 相关：

### [#7360 [OPEN] Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)（评论 3，创建 8-07，更新 8-12）
夜间 API-capacity 压测只覆盖对话持久化与并发读端点，mock model 不产生工具调用，导致 built-in 能力写入路径的回归无法被压测捕获。社区讨论集中在：如何让压力测试覆盖 multi-tool-call 与 durable write，而不仅是简单的 assistant 消息往返。**诉求：缺少一个能模拟工具调用/写入路径的压测场景，属于测试基础设施盲区。**

### [#7407 [CLOSED] Execute BatchPolicy::Parallel capability batches concurrently in invoke_capability_batch](https://github.com/nearai/ironclaw/issues/7407)（评论 3，创建 8-09，更新 8-12）
生产环境的 capability port 仍对多工具调用逐条串行执行，尽管 agent loop 已计算出 `BatchPolicy::Parallel`。该 Issue 要求让 `invoke_capability_batch` 真正以有界并发运行 parallel batch，且对模型零可见性变化。**诉求：将策略层已声明但未落地的并行执行能力真正实现，以缩短多工具调用延迟。**

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

## 5. Bug 与稳定性

今日报告了 9 个来自 Telegram QA 的新 Bug 和 2 个其他渠道问题，按严重程度排列：

### P1（严重）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7538 Telegram agent becomes completely stuck after receiving GIF or sticker](https://github.com/nearai/ironclaw/issues/7538) | 发送 GIF/sticker 后 agent/session 完全卡死，后续文本消息也不再响应 | 待处理，无 fix PR |
| [#7536 Multi-user access flow is broken — additional users get "Invalid secret" error](https://github.com/nearai/ironclaw/issues/7536) | Admin UI 创建的新用户在打开 UI 时收到 “Invalid secret”，多用户共享实例不可靠 | 待处理，无 fix PR |
| [#7535 Telegram webhook is not activated after saving bot configuration](https://github.com/nearai/ironclaw/issues/7535) | 保存 Telegram bot 配置后 webhook 未激活，需完整 redeploy 才生效；伴随 `Forbidden [nearai-prod]` 与 CrabS… 报错 | 待处理，无 fix PR |

### P2（中等）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7540 Long Telegram messages are split and partially missed](https://github.com/nearai/ironclaw/issues/7540) | 超长消息被 Telegram 拆分后，只有第一部分被处理，其余被 “still working” 拒绝 | 待处理，无 fix PR |
| [#7541 Agent cannot send generated files back as Telegram attachments](https://github.com/nearai/ironclaw/issues/7541) | agent 生成文件后只给本地路径 Markdown 链接，不会作为附件发送 | 待处理，无 fix PR |
| [#7539 Telegram user message appears after agent starts working](https://github.com/nearai/ironclaw/issues/7539) | WebUI 打开时，Telegram 消息在 UI 中显示顺序颠倒（agent 先进入工作态，用户消息才出现） | 待处理，无 fix PR |
| [#7542 Agent does not recognize that conversation is already in Telegram](https://github.com/nearai/ironclaw/issues/7542) | agent 在 Telegram 中却以为对话发生在 WebUI，回复 “Want this delivered to your Telegram?” | 待处理，无 fix PR |
| [#7543 Telegram routine runs successfully but message is not delivered on first execution](https://github.com/nearai/ironclaw/issues/7543) | 定时 routine 执行成功，但首次执行的消息未投递到 Telegram | 待处理，无 fix PR |
| [#7544 Agent exposes internal reasoning/planning instead of responding](https://github.com/nearai/ironclaw/issues/7544) | agent 有时把内部推理、规划步骤或原始工具/API 文档直接输出到聊天中 | 待处理，无 fix PR |
| [#7545 Agent incorrectly claims live crypto market data is unavailable](https://github.com/nearai/ironclaw/issues/7545) | 查询多 token 价格时 agent 称无行情工具，尽管有通用 HTTP 能力可用 | 待处理，无 fix PR |
| [#7547 Instance upgrade fails during egress apply on agent staging](https://github.com/nearai/ironclaw/issues/7547) | agent-stg.near.ai 上升级实例在 egress 配置步骤失败（`Error: egress apply failed`） | 待处理，无 fix PR |
| [#7451 Telegram agent sometimes incorrectly asks for credentials](https://github.com/nearai/ironclaw/issues/7451) | agent 有时误以为需要 API key/token 并要求用户在 WebUI 连接 | 待处理，无 fix PR |
| [#7508 GitHub MCP extension startup gives confusing endpoint verification prompt](https://github.com/nearai/ironclaw/issues/7508) | 启动 GitHub MCP 扩展时提示 “already registered” 但又要求 endpoint 验证，体验混乱 | 待处理，无 fix PR |
| [#7554 Custom MCP server add flow shows validation error](https://github.com/nearai/ironclaw/issues/7554) | 用户无法通过自定义 MCP 添加流程，界面报红色验证错误（来自 Slack 反馈） | 待处理，无 fix PR |

### P3（轻微）

| Issue | 描述 | 状态 |
|---|---|---|
| [#7546 Agent does not react to or acknowledge Telegram stickers](https://github.com/nearai/ironclaw/issues/7546) | sticker 被静默忽略，无任何响应 | 待处理，无 fix PR |

### 已关闭的稳定性修复（回归确认）

- [#7484 context window silently evicts the task — pin user messages, compact on eviction, revisit the 128-message clamp](https://github.com/nearai/ironclaw/issues/7484) — 已关闭（修复已合入）
- [#7485 token estimator double-counts ASCII, halving the effective context window; unify the two estimators](https://github.com/nearai/ironclaw/issues/7485) — 已关闭（修复已合入）
- [#6541 WebUI constantly reconnecting](https://github.com/nearai/ironclaw/issues/6541) — 已关闭
- [#5508 Slack delivery target not found despite active Slack connection](https://github.com/nearai/ironclaw/issues/5508) — 已关闭

---

## 6. 功能请求与路线图信号

### 已进入实现（有对应 PR）

- **编码工具契约统一**：[#7491](https://github.com/nearai/ironclaw/pull/7491) 提出 core-tool contract + engines + benchmark arm（issue #7392，slices 1-4），将编码工具面收敛为 `read` / `write` / `edit` / `glob` / `grep` 五个裸名称。这是模型-facing 的重大变更，预计在 1.2/1.3 落地。
- **自动化执行契约**：[#7548](https://github.com/nearai/ironclaw/pull/7548) 为定时自动化引入版本化 structured execution contract（goal、success criteria、output instructions、no-result behavior、allowed capabilities、required skills），所有新建自动化必须携带。
- **Telegram linked-device 模式**：[#7464](https://github.com/nearai/ironclaw/pull/7464) 实现 Telegram 个人账号作为 MTProto linked device 的登录与会话托管方案（设计见 #7443）。
- **Railway sandbox 文件桥**：[#7556](https://github.com/nearai/ironclaw/pull/7556) 新增 `builtin.sandbox_workspace_copy`，在 Railway sandbox 与运行时工作区之间复制文件，仅在该 transport 配置时暴露。
- **自动化建议卡片 V1 后端**：[#7498](https://github.com/nearai/ironclaw/pull/7498) 为 home-screen 建议卡片提供 `GET/POST /api/webchat/v2/suggestions` 后端。
- **设计系统 Phase 3 参考**：[#7558](https://github.com/nearai/ironclaw/pull/7558) 搭建 `@ironclaw/ui` 包骨架，作为 WebUI 设计系统第一阶段落地的参考实现。

### 讨论中 / 待定

- **通用 thinking/effort 控制**：[#7537](https://github.com/nearai/ironclaw/issues/7537) 提议在 LLM 请求路径加入 per-request thinking level，由各 provider adapter 映射到原生参数（触发场景为 DeepSeek V4 Flash via NEAR AI——0731 checkpoint 输出冗长）。目前无对应 PR，但结合近期 loop 优化节奏，可能进入 1.3 规划。
- **Cloud.near.ai 支持 Google/GitHub 登录用户的 staking 路径**：[#7517](https://github.com/nearai/ironclaw/issues/7517) 用户反馈 Credits 只支持 Stripe，Google/GitHub 登录无法关联 NEAR 钱包进行 stake。
- **压力测试覆盖扩展**：[#7360](https://github.com/nearai/ironclaw/issues/7360) 需将 built-in 能力写入路径纳入压测，属于测试基础设施增强，被 epic 标签覆盖。
- **Onboarding channel-first 大方向**：[#7044](https://github.com/nearai/ironclaw/issues/7044) epic 仍在推进中，后端部分（[#6993](https://github.com/nearai/ironclaw/issues/6993)）等待排期。
- **退休遗留 WebUI 前端表面**：[#7520](https://github.com/nearai/ironclaw/issues/7520) 提议移除已退役 v1/engine-v2 产品表面前端代码，减少维护负担。

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

## 7. 用户反馈摘要

从 Issue 评论与用户报告中提炼的真实反馈：

1. **WebUI 重连提示令人困惑**（[#6541](https://github.com/nearai/ironclaw/issues/6541)）：用户表示 WebUI 频繁出现 “Reconnecting” 提示，虽然不影响实际工作流，但通知本身造成困扰。该问题已关闭，但属于“无功能影响但影响体验”的典型反馈。
2. **工具失败提示过于“aggressive”**（[#7302](https://github.com/nearai/ironclaw/issues/7302)）：当某个工具调用出错但 agent 已恢复并完成任务时，用户仍会看到“攻击性”的错误信息。用户希望工具失败仅作信息展示并弱化显示。该 Issue 已关闭，说明已受理。
3. **自定义 MCP server 无法添加**（[#7554](https://github.com/nearai/ironclaw/issues/7554)）：来自 Slack 产品反馈渠道的真实用户报告，自定义 MCP 添加流程出现红色 validation 错误且无法通过，目前无对应修复。
4. **Google/GitHub 登录用户无法 staking**（[#7517](https://github.com/nearai/ironclaw/issues/7517)）：用户想要用 Google/GitHub 账号登录 Cloud.near.ai 后使用 NEAR 钱包 stake，但 Credits 仅支持 Stripe，NEAR 登录只能作为独立登录方式而非可附加钱包。涉及支付/钱包产品决策。
5. **Telegram 渠道消息顺序颠倒**（[#7539](https://github.com/nearai/ironclaw/issues/7539)）：WebUI 打开时，Telegram 消息到达后 UI 先显示 agent 工作状态，再显示用户消息，会话流看起来像 agent 在“抢答”。
6. **agent 暴露内部思考过程**（[#7544](https://github.com/nearai/ironclaw/issues/7544)）：用户看到 agent 把 raw 工具/API 文档直接输出到聊天中，而非正常用户可读的回复，影响信任感。
7. **多 token 行情请求被误拒**（[#7545](https://github.com/nearai/ironclaw/issues/7545)）：agent 声称没有行情工具，尽管有通用 HTTP 能力。用户对 agent 的“能力边界认知”与实际可用工具不一致，属于工具选择/路由问题。

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

## 8. 待处理积压

以下 Issue/PR 长时间未合入或缺少维护者响应，建议优先关注：

### 长期未合并的大型 PR

| PR | 创建时间 | 状态 | 备注 |
|---|---|---|---|
| [#6994 feat(webui): OOBE automation-tasks prototype — carousel, inline cards, agent-mode pill](https://github.com/nearai/ironclaw/pull/6994) | 08-01 | OPEN（XL） | 12 天未合入；设计 + 实现，gated behind off-by-default 部署 flag，等待设计评审 |
| [#7039 chore(webui): integrate Storybook + design-system catalog (Epic phase 1)](https://github.com/nearai/ironclaw/pull/7039) | 08-03 | OPEN（XL） | 10 天未合入；设计系统 epic 的第一阶段，依赖 #7257 的提案评审 |
| [#7043 docs(design-system): DESIGN.md governance + Storybook guidelines (Epic phase 2)](https://github.com/nearai/ironclaw/pull/7043) | 08-03 | OPEN（M） | 10 天未合入；与 #7039 同属设计系统 epic |
| [#7456 fix(reborn): make durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456) | 08-10 | OPEN（XL） | 3 天未合入；涉及存储布局变更，风险 medium，需 reviewer 关注 |
| [#7464 feat(telegram): linked-device — device-link auth, session custody, standard-op tools](https://github.com/nearai/ironclaw/pull/7464) | 08-10 | OPEN（XL） | 3 天未合入；Telegram 大特性，依赖 #7443 docs PR 先合入 |
| [#7491 feat(coding): omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491) | 08-11 | OPEN（XL） | 2 天未合入；涉及模型-facing 工具接口变更，风险 medium |

### 值得维护者关注的重要 Issue

- **[#7360 Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)** — 截至今日已开放 6 天且仅有 3 条评论，压测覆盖盲区可能导致回归未被发现，建议尽快指定 owner。
- **[#6993 Backend wiring for the OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/issues/6993)** — 8 月 1 日创建，属于 onboarding epic（#7044）的后端部分，目前无 assignee、无 PR 关联，进度停滞。
- **[#7517 Cloud.near.ai: allow staking path for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517)** — 涉及账号体系与支付，暂无维护者回复，属于产品决策类问题。

**[⬆ 返回目录](#-ironclaw-项目动态日报--2026-08-13)**

---

*本日报基于 2026-08-13 检索的 GitHub 数据生成，数据覆盖过去 24 小时的项目动态。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-13

## 今日速览

今日项目开发活跃度整体处于**中高水平**。过去 24 小时内有 **7 个 PR 被合并/关闭**（含 1 个发布分支 PR），主要集中在渲染层 UI 优化、跨平台稳定性修复两个方向；**无线程的新增 Issue**，6 条更新均为历史 Issue 被 stale 机器人标记（批量更新于 8 月 12 日）。当前有 **1 个 4 月发起的 PR 仍待合并**，并存在若干 3 月底遗留的 Bug 类 Issue 长期未解决。今日合入的 PR 修复了 macOS/Windows 文件图标、Windows 插件安装目录符号链接、模型思考强度全局互斥等多个实际问题，整体项目处于稳定的迭代推进状态。

---

## 版本发布

**今日无正式 Release 发布**（0 个新版本）。但注意到 PR #2480 为 `Release/2026.8.12` 发布分支（今日已合并），预示着 2026.8.12 版本正在进行发布流程，建议关注后续正式 tag 与发布说明。

---

## 项目进展

今日 7 个 PR 被合并/关闭，涉及渲染层、主进程与发布流程。主要进展汇总如下：

### 功能与体验迭代
- **技能管理器 UI 拆分**（[PR #2482](https://github.com/netease-youdao/LobsterAI/pull/2482)）：将「我的技能」与「内置技能」分为独立标签页，提升技能管理页面的信息层级与操作效率。
- **侧边栏任务搜索入口优化**（[PR #2481](https://github.com/netease-youdao/LobsterAI/pull/2481)）：将带文字标签的搜索入口改为纯图标操作，并统一了 macOS 与 Windows 的布局外观，同时补充了诊断与回归测试覆盖。
- **模型思考强度支持独立记忆**（[PR #2475](https://github.com/netease-youdao/LobsterAI/pull/2475)）：此前「思考强度」为全局单一份配置，切换模型会互相覆盖（如 DeepSeek-V4-Pro 设「最大」后，将 Flash 也设「最大」会把 Pro 打回「高」）。此 PR 为每个模型独立记录思考深度，补齐了 UI 交互细节。

### 跨平台稳定性修复
- **Windows 插件安装保留目录联接（junction）**（[PR #2479](https://github.com/netease-youdao/LobsterAI/pull/2479)）：此前 Windows 上安装插件若跨卷操作会触发 `EPERM` 符号链接错误，破坏依赖联接。修复方案为在同卷暂存并原子性重命名，同时增加了 manifest 校验与失败回滚。
- **macOS/Windows 文件图标尺寸修复**（[PR #2478](https://github.com/netease-youdao/LobsterAI/pull/2478)）：`extractIcon` 在 macOS 上使用 Electron **不支持的 `large` 尺寸**参数，现已调整为仅在 Linux 上使用 `large`，其余平台使用 `normal`。

### 发布流程
- **发布分支合并**（[PR #2480](https://github.com/netease-youdao/LobsterAI/pull/2480)）：`Release/2026.8.12` 分支已合并回主分支，说明 8 月 12 日迭代的开发工作已收尾。

> 综合来看，项目在 UI 细节打磨与跨平台兼容性方面取得了扎实进展，整体质量向前迈进了一步。

---

## 社区热点

今日社区讨论热度偏低，所有 Issue/PR 评论数均为 0-2 条，无高互动话题。相对值得关注的讨论如下：

- **「卸载后程序仍能运行」质疑**（[Issue #1173](https://github.com/netease-youdao/LobsterAI/issues/1173)）：用户对卸载后进程仍存活、且能继续调用飞书接口表示强烈不满，并直接质疑「是否留后门操控用户电脑」。该 Issue 虽仅 1 条评论，但反映了用户对应用生命周期管理不规范（缺少安装/卸载清理钩子）的信任感挫伤，属于**信任危机的敏感话题**。

- **强制沙箱功能争议**（[Issue #1179](https://github.com/netease-youdao/LobsterAI/issues/1179)）：3.31 版本更新后用户找不到关闭沙箱的入口，被迫回滚到 3.30。背后诉求是**对强制安全策略缺乏控制权的不满**，用户希望保留对本地运行环境的自主配置能力。

- **插件配置 ID 警告**（[Issue #1236](https://github.com/netease-youdao/LobsterAI/issues/1236)）：该 Issue 今日被后台关闭，但关闭前仍持续有用户确认复现。虽为低危配置告警，但因每次启动都会出现，对用户体验存在持续性骚扰。

---

## Bug 与稳定性

今日新报告的 Bug **为零**，6 条 Issue 更新全部为 stale 自动标记。但在历史遗留问题中，以下值得重点关注：

### 中高风险

- **修改自建 Agent 触发网关反复重启**（[Issue #1180](https://github.com/netease-youdao/LobsterAI/issues/1180)，3 月 31 日创建）→ **无关联修复 PR**。用户修改自建 agent 图标后网关进入循环重启；删除 agent 后恢复。该问题长时间未解决，对依赖自建 agent 的用户影响较大，且可能指向配置热更新机制的底层缺陷。

- **强制沙箱无法关闭**（[Issue #1179](https://github.com/netease-youdao/LobsterAI/issues/1179)，3 月 31 日创建）→ 无修复 PR。虽然属于产品策略问题，但从「强制」描述来看，用户预期行为与实际行为存在较大冲突，需产品侧明确回应。

### 中低风险

- **卸载后程序仍可运行**（[Issue #1173](https://github.com/netease-youdao/LobsterAI/issues/1173)，3 月 31 日创建）→ 无明确修复 PR，疑似 Windows 下未正确实现应用生命周期终止，用户感知恶劣。
- **插件 ID 不匹配警告**（[Issue #1236](https://github.com/netease-youdao/LobsterAI/issues/1236)）→ 今日被 stale 自动关闭，但**没有看到对应的修复提交**，可能属于误关或已另有知悉。建议维护者确认关闭理由。
- **创建定时任务报错**（[Issue #2071](https://github.com/netease-youdao/LobsterAI/issues/2071)，5 月 28 日创建））→ 同样今日被 stale 关闭，无法确认是否已在后续版本修复。

### 今日已修复的稳定性问题

- ✅ macOS/Windows 大尺寸文件图标获取崩溃风险（[PR #2478](https://github.com/netease-youdao/LobsterAI/pull/2478)）
- ✅ Windows 插件安装 EPERM 符号链接失败（[PR #2479](https://github.com/netease-youdao/LobsterAI/pull/2479)）

---

## 功能请求与路线图信号

- **多个自定义模型提供商支持**（[Issue #1174](https://github.com/netease-youdao/LobsterAI/issues/1174)）：用户希望保留多个自定义模型配置，而非当前仅能替换一个。结合今日合并的「模型思考强度独立记忆」（PR #2475），可见项目正在持续增强模型管理能力，此需求有较高被纳入后续迭代的概率。

- **隐藏 OpenClaw 主 Agent 会话**（[PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181)）：该 PR 自 4 月 1 日起开放至今仍未合并。功能上为 `cowork_sessions` 增加 `hidden` 字段，避免内部会话（heartbeat/cron 路由）干扰用户列表。考虑到今日侧边栏/桌面端重构动作频繁，该 PR 若与当前 UI 改造合并落地，将显著改善 Cowork 会话列表的清爽度，建议维护者评估是否将其纳入 8 月下旬迭代。

---

## 用户反馈摘要

基于现有 Issue 评论与描述，真实用户痛点归纳如下：

- **对强制安全策略的抵触**：部分用户选择「回滚版本」来对抗强制沙箱（#1179），说明安全功能需要提供可配置性，而非一刀切强制。
- **卸载体验直接影响信任**：用户发现卸载后应用仍能收发飞书消息，直接产生「后门」怀疑（#1173）。这提示安装包需要做好卸载时的进程/服务清理，并公开说明后台驻留逻辑，避免安全误解。
- **配置警告的疲劳感**：尽管插件 ID 不匹配仅为警告，但每次启动都出现，用户还是愿意花时间提交 Issue 反馈（#1236），说明对启动日志的整洁度有较高期待。
- **本地 Agent 编辑稳定性敏感**：仅修改图标即触发网关反复重启（#1180），反映出用户对本地定制化操作的低容错预期——他们希望这类轻量操作应「零风险」。
- **对自定义模型管理的明确需求**：用户希望配置多套自定义模型并存（#1174），说明存在多场景（A/B 测试、环境隔离等）切换的现实工作流需求。

---

## 待处理积压

以下为长期未响应/未解决的重要问题，建议维护团队重点关注：

| 编号 | 类型 | 标题 | 创建时间 | 状态 | 优先级建议 |
|------|------|------|----------|------|-----------|
| [#1180](https://github.com/netease-youdao/LobsterAI/issues/1180) | Bug | 修改自建 Agent 导致网关反复重启 | 2026-03-31 | OPEN / stale | **高** — 阻塞自建 Agent 用户的日常操作，且可能指向配置热更新机制缺陷 |
| [#1179](https://github.com/netease-youdao/LobsterAI/issues/1179) | 产品策略 | 3.31 版本强制沙箱无法关闭 | 2026-03-31 | OPEN / stale | **中高** — 用户已明确表示不满并回滚 |
| [#1173](https://github.com/netease-youdao/LobsterAI/issues/1173) | Bug | 卸载后程序仍可运行 | 2026-03-31 | OPEN / stale | **中高** — 涉及产品信任与安全形象 |
| [#1174](https://github.com/netease-youdao/LobsterAI/issues/1174) | Feature | 支持多个自定义模型提供商 | 2026-03-31 | OPEN / stale | **中** — 已与当前模型能力演进方向吻合 |
| [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) | PR | 隐藏 OpenClaw 主 Agent 会话 | 2026-04-01 | OPEN（待合并） | **中** — 功能已完成，等待 review；建议结合当前 UI 重构评估并入 |
| [#1236](https://github.com/netease-youdao/LobsterAI/issues/1236) | Bug | 插件 ID 不匹配警告 | 2026-04-01 | CLOSED / stale | **低** — 已自动关闭，但未见对应修复；建议确认是否真正解决 |
| [#2071](https://github.com/netease-youdao/LobsterAI/issues/2071) | Bug | 创建定时任务报错 | 2026-05-28 | CLOSED / stale | **低** — 如已修复，建议在 Release 说明中明确标注 |

> **提示**：本次多个 3-4 月创建的 Issue 于 8 月 12 日被 stale 机制批量标记/关闭，其中 #1236、#2071 在关闭时均无明确的修复 PR 关联。为避免误关有效反馈，建议维护者审视 stale 策略是否需要绑定「已有修复关联」条件，或对该批 Issue 补充人工确认。

---

*本报告由 AI 分析师基于 GitHub 公开数据自动生成，统计周期为 2026-08-12 至 2026-08-13。链接均可点击跳转至对应 Issue/PR 页面。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-13

## 1. 今日速览

CoPaw 过去 24 小时保持高活跃度：共产生 29 条 Issue 更新（22 条新开/活跃、7 条关闭）和 42 条 PR 更新（15 条合并/关闭、27 条待合并），并发布 v2.1.0-beta.4 新版本。值得关注的是，beta 迭代进入稳定修复期，Release Duty 自动化流程已覆盖 beta.3/beta.4 安装验证，同时社区反馈集中在多步骤任务自主停止、子 Agent 死循环、历史消息持久化等稳定性问题上。项目整体处于高频迭代、社区反馈密集的良性循环阶段，维护团队对 Issue 的响应速度较快，多数热点问题在 24 小时内已有对应修复 PR 或初步回复。

## 2. 版本发布

**v2.1.0-beta.4** 于今日发布，包含两个修复及版本号更新：

- **fix(files): repair previews and dark mode styling**（@rayrayraykk，PR #6915）— 修复文件预览功能及暗色模式样式问题。
- **fix(tools): correct read_file tool description**（@AntiQuality，PR #6898）— 修正 read_file 工具的描述文本，避免误导 Agent 对工具能力的判断。

**破坏性变更**：无。

**迁移注意事项**：beta.4 为增量修复版本，未涉及配置格式或数据迁移；使用 file preview 功能的用户建议更新后验证暗色模式表现。

> 关联链接：[v2.1.0-beta.4 Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4) | [安装验证 Issue #6946](https://github.com/agentscope-ai/QwenPaw/issues/6946)

## 3. 项目进展

今日合并/关闭的 PR 共 15 条，以下为对项目健康度有实质推进的重要变更：

| PR | 内容 | 影响 |
|---|---|---|
| [#6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) | `consume_model_response()` 兼容 dict 子类 ChatResponse，修复自动标题生成 KeyError | 修复了 agentscope 2.x 兼容性问题，直接影响聊天自动标题功能可用性，关闭 Issue #6813 |
| [#6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) | Agent 模型调用前净化工具消息 | 修复孤立工具结果在上下文压缩/旧状态加载后到达 provider 导致的报错（Issue #6407），提升长会话稳定性 |
| [#6913](https://github.com/agentscope-ai/QwenPaw/pull/6913) | 修复 macOS Computer Use 元素激活 | 解决瞬态菜单和复合无障碍元素场景下窗口提升导致的菜单关闭问题 |
| [#6937](https://github.com/agentscope-ai/QwenPaw/pull/6937) | Creator 生产管线加固：compose-gate 自动复审、DAG 防 stall、防重复计费、fail-closed 插件打包 | Creator 功能成熟度显著提升，涉及调度器稳健性和计费安全 |
| [#6944](https://github.com/agentscope-ai/QwenPaw/pull/6944) | 更新 v2.1.0 发布说明 | 为正式版发布做准备 |

**整体判断**：合并内容以稳定性修复和平台兼容性为主，未见大规模新功能合入。结合 release-duty 自动验证流程的落地，项目正在为 v2.1.0 正式版做质量收口，同时并行推进多条功能分支（见第 6 节）。

## 4. 社区热点

**最热讨论 TOP 3：**

1. **[#6853 prompts.py lies to agents](https://github.com/agentscope-ai/QwenPaw/issues/6853)**（5 评论）— 用户 AL-Mint 通过代码追踪发现：提示词声称 Dream 流程会自动同步摘要到 MEMORY.md，但该功能实际上从未实现。这是一个"文档/提示词与实际行为不符"的信任问题，开发者社区对这类问题反应强烈。**已有对应修复 PR #6942**（简化长期记忆提示词，消除对内部存储行为的错误描述）。

2. **[#6921 多步骤任务无提示自动停止](https://github.com/agentscope-ai/QwenPaw/issues/6921)**（5 评论）— 用户 rerbin 报告：Agent 在执行多步骤任务时经常在"规划完下一步"后无提示停止，需要用户说"继续"才恢复。典型输出如"Now 2.1, 3.1, 3.2. Let me do all three."随后就中断。这反映出 Agent 在长任务执行中的自主连续性不足，属于核心体验问题。

3. **[#6780 闲置后进程卡死](https://github.com/agentscope-ai/QwenPaw/issues/6780)**（4 评论，更新于今日）— 2.0.1 版本在闲置几十分钟后进程卡死，只能重启。虽然创建较早但仍在活跃讨论，说明该问题在用户环境中持续存在且未完全解决。

**其他高热度 Issue**（均 4 评论）：#6928 历史消息滚动与输入栏编辑冲突、#6826 助手消息完成时间显示异常（已有 PR #6938）、#6839 MCP 工具调用数字字符串类型错误（已有 PR #6936）、#6924 自定义频道插件配置入口被移除（已有 PR #6943 恢复）、#6847 安全软件误杀 Qwenpaw 进程。

## 5. Bug 与稳定性

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| **安全** | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件可在无用户审批情况下静默创建 cron 任务并向会话注入用户可见消息（权限模型缺口） | OPEN，无 PR |
| **高** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步骤任务规划后无提示停止，需用户手动确认才继续 | OPEN，无 PR |
| **高** | [#6927](https://github.com/agentscope-ai/QwenPaw/issues/6927) | 调用多个子 Agent 执行任务时多次陷入死循环 | OPEN，无 PR |
| **高** | [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | 网络短时中断恢复后 QwenPaw 无法自动重连，必须重启进程 | OPEN，无 PR |
| **高** | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) | v2.0.1 频繁崩溃（console channel process/reply failed） | CLOSED，未提供修复方案 |
| **高** | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | v2.0.1 概率性启动报错/崩溃退出（Windows asyncio） | OPEN，无 PR |
| **中** | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前的聊天记录不可见 | OPEN，无 PR |
| **中** | [#6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) | 历史消息不支持向上滚动查看；输入栏选中编辑会删除后方内容 | OPEN，无 PR |
| **中** | [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 长耗时工具调用时，助手完成时间显示为用户消息后几秒 | **有 PR #6938** |
| **中** | [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 工具调用将字符串参数以数字格式传递导致校验失败 | **有 PR #6936** |
| **中** | [#6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) | sync.py 使用随机 AgentState UUID 而非真实 session_id 导入历史，18-50% 数据行孤儿化 | CLOSED |
| **中** | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | 日记页面子文件夹内笔记被错误分到错误日期 | OPEN，无 PR |
| **中** | [#6948](https://github.com/agentscope-ai/QwenPaw/issues/6948) | 管理后台对话时间显示 UTC 而非用户配置时区（差 8 小时） | OPEN，无 PR |
| **低** | [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) | 杀软拦截 Qwenpaw 进程导致强制关停（同任务 WorkBuddy 无此问题） | OPEN，无 PR |
| **低** | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 闲置几十分钟后进程卡死，需手动重启 | OPEN，今日仍在活跃 |

**小结**：高严重度问题集中在"长任务自主执行中断"和"网络/进程级稳定性"两类，尚无对应修复 PR，建议维护团队优先排查。中低严重度问题中已有 3 条（#6826、#6839、#6853）进入修复流程，响应速度良好。另外 #6813 已通过 PR #6816 解决并关闭。

## 6. 功能请求与路线图信号

以下功能请求信号较为明确，结合已有 PR 判断落地可能性：

| 功能诉求 | 来源 | 对应 PR / 落地信号 |
|---|---|---|
| **恢复插件频道交互式配置入口** | [#6924](https://github.com/agentscope-ai/QwenPaw/issues/6924)（用户开发的自定义频道在 2.0.x 后失去配置入口） | **[PR #6943](https://github.com/agentscope-ai/QwenPaw/pull/6943) 已提交**，加载 channel 插件并重建 get_configurator() 流程 |
| **Agent 主动向收件箱投递报告** | [#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917)（希望结构化报告有固定、不滚动、未读红点的落点，而非随聊天流失） | 无 PR，属于交互模型拓展，可能需架构讨论 |
| **单会话窗口内的多智能体协作** | [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925)（目前子 Agent 协作每次创建新会话，需手动切换查看） | 无 PR，与 #6918（每消息新建会话 Bug）相关联，可能作为协作体验改进纳入路线图 |
| **以文件夹为对话基础** | [#6929](https://github.com/agentscope-ai/QwenPaw/issues/6929)（类似 codex 的 workspace 模式，选中文件内容加入对话） | 无 PR，属于较大的交互范式变更 |
| **长期任务持续执行框架** | [#6923](https://github.com/agentscope-ai/QwenPaw/issues/6923)（外部项目 LongHorizon-Harness 的多轮无状态漂移方向建议） | 无 PR，属于方向性讨论 |
| **原生 DataPaw 应用运行时** | — | **[PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) 已提交**（first-time-contributor），新增 DataPaw 原生运行时和持久化分析工作区 |
| **MiniMax TTS 支持** | — | **[PR #6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) 已提交**，SIP 渠道新增 MiniMax HTTP TTS 能力 |
| **Prefix cache 稳定性优化** | [#6952](https://github.com/agentscope-ai/QwenPaw/issues/6952) | **[PR #6953](https://github.com/agentscope-ai/QwenPaw/pull/6953) 已提交**（first-time-contributor）：排序 tool schemas + 拆分 env_context，降低 KV cache 未命中率 |

**路线图判断**：v2.1.0 系列当前以稳定性修复收口为主，功能型 PR（如 #6940 DataPaw、#6954 MiniMax TTS）已在排队但预计不会阻塞 beta 发布。插件生态（#6943）和前缀缓存优化（#6953）是有明确需求支撑的方向，有望进入后续版本。

## 7. 用户反馈摘要

**核心痛点：长任务自主执行不可靠**
> "执行多步骤任务时经常自己停止且无任何提示消息……消息的特征都是规划好下一步就停止了，没实际开始干也无任何视觉可见的提示。需要我说'继续'才会继续任务。" —— [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) @rerbin

同类问题在 #6927（多子 Agent 死循环）中再次出现，用户在多 Agent 协作场景下对任务自主性的需求强烈。

**历史记录持久性与可见性**
> "历史消息不支持向上滚动查看，昨天的对话，无法滚动查看。希望支持完整历史回滚。" —— [#6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) @xiaohushi512

> "使用默认 scroll 策略压缩后，压缩前的原始消息不再显示……上下文压缩应只影响模型输入，不应破坏用户可见的完整 transcript。" —— [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) @Lay0407

用户在意的不仅是模型层面的上下文管理，更是"聊天记录是用户的资产"这一基本预期。

**安全软件误报影响正常使用**
> "Qwenpaw 在执行任务的时候，经常会被杀软拦截，甚至强制关停 Qwenpaw 进程。" —— [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) @cmhaoso

该反馈配图显示杀软将 QwenPaw 行为识别为可疑操作，且同任务下 WorkBuddy 无此问题，暗示 QwenPaw 的某些执行模式（可能涉及自动化操作或文件访问）更容易触发安全软件告警。

**网络波动需要手动恢复的运维负担**
> "同一天内已复现两次……网络恢复后 QwenPaw 不会自动恢复，所有 LLM 请求持续报 httpx.ConnectTimeout / openai.APITimeoutError，必须手动重启服务进程。" —— [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) @tina0501853

**对提示词/实际行为不一致的质疑**
> "prompts.py line 13 (Chinese) and line 32 (English) claim that the periodic 'dream' process automatically syncs digests into MEMORY.md. Tracing the actual ReMe dream pipeline reveals this was **never implemented**." —— [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) @AL-Mint

用户对文档/提示词与实际行为的一致性有较高敏感度，这类问题虽不影响核心功能但会侵蚀信任。PR #6942 已针对此问题进行修复。

## 8. 待处理积压

以下为长期未关闭且当前无对应修复 PR 的重要议题，建议维护者关注：

| 事项 | 类型 | 提出时间 | 状态 |
|---|---|---|---|
| [#5992 Add per-session model overrides](https://github.com/agentscope-ai/QwenPaw/pull/5992) | PR（first-time-contributor） | 2026-07-12 | 超过 1 个月仍在 Under Review，实现"单 Agent 不同会话用不同模型"的 opt-in 能力 |
| [#5869 Slash 命令自动补全](https://github.com/agentscope-ai/QwenPaw/pull/5869) | PR（first-time-contributor） | 2026-07-08 | 超过 1 个月，将系统命令暴露到所有 UI 的斜杠补全中，功能完整度较高 |
| [#6623 ACP 通知竞争导致文本丢失](https://github.com/agentscope-ai/QwenPaw/pull/6623) | PR（first-time-contributor，修复 #6625） | 2026-08-01 | 等待审查中，涉及 session/update 与 session/prompt 响应同段到达时的竞态 |
| [#6715 OneBot 入站媒体本地化](https://github.com/agentscope-ai/QwenPaw/pull/6715) | PR（Under Review） | 2026-08-05 | 维护者已做一轮 review，仍有 8 个问题待处理 |
| [#6818 summary 尊重 disable_thinking](https://github.com/agentscope-ai/QwenPaw/pull/6818) | PR（Under Review，修复 #6811） | 2026-08-08 | 续接摘要仍可能继承 provider 级 reasoning 设置，取消的流被误处理 |
| [#6780 闲置卡死](https://github.com/agentscope-ai/QwenPaw/issues/6780) | Issue（高热度） | 2026-08-07 | 持续 6 天无修复 PR，今日仍在活跃 |
| [#6916 插件权限模型漏洞](https://github.com/agentscope-ai/QwenPaw/issues/6916) | Issue（安全） | 2026-08-11 | 无回复无 PR，建议优先评估 |

**特别提醒**：#6916 属于安全权限模型缺口，插件可静默创建定时任务并注入消息，建议尽快纳入修复计划。另外 5 条 first-time-contributor PR（#5992、#5869、#6623、#6715、#6953、#6940）等待时间较长，及时 review 有助于维护社区贡献者积极性。

---

*本日报由 AI 生成，数据来源：github.com/agentscope-ai/CoPaw GitHub 仓库（2026-08-12 至 2026-08-13 时段）。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## ZeroClaw 项目动态日报 — 2026-08-13

> 数据来源：GitHub 仓库 zeroclaw-labs/zeroclaw 过去 24 小时活动记录（统计截至 2026-08-13）。

---

### 1. 今日速览

过去 24 小时项目活跃度处于**高位**：共产生 50 条 Issue 更新与 50 条 PR 更新，其中 14 条 PR 已合并/关闭，5 条 Issue 已关闭。无新版本发布。当前积压了 36 条待合并 PR，其中多条 p1 级修复（Windows 测试、cron 输出交付、web_fetch 压缩响应等）正等待审查。社区侧，Windows 平台测试失败（#7462，14 条评论）与维护者决策队列（#8692，13 条评论）是两个最受关注的话题。整体来看，项目修复与功能推进双向进行，但 PR 审查效率可能成为下一阶段的瓶颈。

---

### 2. 项目进展

过去 24 小时共合并/关闭 14 条 PR，其中值得关注的重要合并包括：

- **Windows 原生 PowerShell 支持落地** — [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)（CLOSED）。这是一个规模为 XL 的 PR，现已合并：`runtime.shell` 在 Windows 上现在可以路由到 `powershell`/`pwsh`（通过 `-NoProfile -NonInteractive -Command`），同时保留默认 `cmd.exe /C` 行为。该改动显著提升 ZeroClaw 在 Windows 上的自动化能力，与此前 #7461/#7462（Windows CI 覆盖与测试失败）形成呼应。

- **响应缓存请求边界正式落地** — [#9720](https://github.com/zeroclaw-labs/zeroclaw/pull/9720)（CLOSED，优先级 p1，规模 XL）。该 PR 将 modifying/cancelling `before_llm_call` hooks 应用到最终请求视图，并将本地全响应缓存限制在确定性请求上，解决了长期存在的缓存边界模糊问题（关联 #8320/#8321）。这是对缓存正确性和可预期性的重要加固。

- **网关 WebSocket 保活** — [#9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701)（CLOSED）。新增 `[gateway].websocket_ping_interval_secs` 配置，Web UI 聊天 WebSocket 空闲或流式输出期间发送 Ping 帧，避免中间代理断开连接。直接影响 Web 端长时间对话的稳定性。

- **JSON-RPC 双向响应路由修复** — [#8902](https://github.com/zeroclaw-labs/zeroclaw/pull/8902)（CLOSED）。修复 ZeroCode ask-user 与 poll 交互在 ACP 通道中因响应未路由到 pending caller 而无法完成的问题。对 ACP 通道交互完整性有实质意义。

- **SOP 面板运行状态图标上线** — [#9692](https://github.com/zeroclaw-labs/zeroclaw/pull/9692)（CLOSED）。ZeroCode SOP 面板现在通过 `sops/runs` 轮询显示实时运行状态图标（🟢 完成 / 🟡 运行中 / 🔵 等待审批 / 🔴 失败）。对应 Issue [#9684](https://github.com/zeroclaw-labs/zeroclaw/issues/9684) 同步关闭。

- **cron 帮助示例可运行化** — [#9877](https://github.com/zeroclaw-labs/zeroclaw/pull/9877)（CLOSED）。修复 CLI 帮助文本中 `add-at`、`add-every`、`once` 示例缺少 `--agent sentinel` 值和 `--prompt` 标记的问题，使示例照抄即可运行。

- **文档修订历史统一** — [#9778](https://github.com/zeroclaw-labs/zeroclaw/pull/9778)（CLOSED）。统一 FND-001 至 FND-006 的修订元数据与本地历史，补齐此前缺失的修订行。对维护者追踪架构决策历史有辅助价值。

> 整体判断：过去 24 小时合并的 PR 主要分布在 **运行时正确性（缓存、JSON-RPC 路由、WebSocket 保活）、Windows 支持、ZeroCode UI 完善与 CLI 可用性** 四个方向。项目在用户可见的体验修复和底层架构加固上均有进展。

---

### 3. 社区热点

过去 24 小时讨论最集中的条目（按评论数排序）：

- **[#7462 — Windows 上 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**（14 条评论，p1，OPEN）。当前社区最关注的问题。作者 NiuBlibing 详细报告了 Windows 11（简体中文、代码页 936）下 74 个测试失败的具体原因（Unix-only 测试命令、路径语义、控制台编码）。关联 #7461（CI 平台矩阵扩展）。这暴露了项目 CI 仅跑 Linux 的盲区，社区讨论集中在如何在 CI 中补齐 Windows/macOS 覆盖。

- **[#8692 — 维护者决策队列 Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（13 条评论，p2，OPEN）。这是一个跨 RFC、设计问题、发布政策问题的集中跟踪器，用于维护者处理接受/拒绝/延期决策。高评论数表明社区对架构决策透明度和时效性有较强诉求。

- **[#8832 — 插件自有 Kanban 板（RFC）](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)**（9 条评论，p2，OPEN）。提议以插件自有领域的方式为 agent 工作流提供看板，核心在于宿主提供泛化能力、插件拥有卡牌语义。讨论焦点集中在边界划分与实现复杂度上。

- **[#9101 — 整合发布签名机制](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)**（9 条评论，p1，OPEN）。指出 v0.8.3 存在三套并行的 provenance/signing 机制（cosign、GitHub artifact attestations、slsa-github-generator），导致 CI 时间和维护成本翻倍，建议收敛为一套方案、20 个发布资产。属于社区对工程效率的主动优化提议。

> 社区热点集中在两大主题：**构建/测试基建的跨平台覆盖与工程效率优化**，以及**架构决策透明化**。值得注意的是，三个 Top 热点中两个涉及 CI/发布基建，显示出社区对工程质量的高关注度。

---

### 4. Bug 与稳定性

按严重程度排列（S1 为最高）：

| 严重度 | Issue | 状态 | 是否已有 Fix PR |
|---|---|---|---|
| S1 | [#9207 — web_fetch 对压缩响应（gzip/brotli/deflate）返回乱码](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)，p1，in-progress，5 条评论 | OPEN | 未见对应 PR |
| S1 | [#7527 — macOS 桌面应用可打开空白或没有窗口](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)，p1，r:needs-repro，2 条评论 | OPEN | 未见 PR，等待复现 |
| S1 | [#9290 — Windows 桌面安装器启动即失败：缺失 TaskDialogIndirect](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)，p1，accepted，1 条评论 | OPEN | 未见对应 PR |
| S1 | [#9340 — CLI 创建的 cron 任务输出被硬编码为 None，结果直接丢弃](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)，p1，in-progress，3 条评论 | CLOSED | 已关闭，修复已合入（见 #9182 相关改动） |
| S2 | [#7462 — Windows 下 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)，p1，accepted，14 条评论 | OPEN | PR #9398 正在推进 macOS/Windows 测试覆盖 |
| S2 | [#9796 — cron 帮助中的 add-at/add-every/once 示例不可运行](https://github.com/zeroclaw-labs/zeroclaw/issues/9796)，p2，accepted，2 条评论 | CLOSED | 已由 PR #9877 修复 |
| S3 | [#9198 — Discord 打字指示器在 daemon 重载后永久卡住](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)，p2，accepted，4 条评论 | OPEN | 未见对应 PR |
| S3 | [#9202 — `zeroclaw desktop` 使用失效下载 URL，且不检测已安装 AppImage](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)，p2，in-progress，2 条评论 | OPEN | 未见对应 PR |

**值得注意的稳定性/安全风险：**

- **安全跟踪器：**[#9899 — 移除 bitmaps 未维护 advisory 豁免（RUSTSEC-2026-0247）](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)（p1，blocked）。`cargo deny check` 正因 `bitmaps 3.2.1`（经 `imbl` → Matrix SDK dev-dependencies）失败，安全 CI 处于红灯状态。当前处于 blocked，等待依赖方决策。

---

### 5. 功能请求与路线图信号

以下功能请求与项目当前 PR 方向具有较高一致性，有望进入下一版本：

- **CI 跨平台测试矩阵** — [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 提议将 `cargo nextest run` 从仅 Linux 扩展到 ubuntu/macos/windows 三平台。PR [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398)（OPEN，blocked）正在推进此事，但 maintainer note 明确表示**在 #9660 落地前不得合并当前 head**，说明该改动仍在协调中。此方向与 #7462 直接相关。

- **发布/签名机制整合** — [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 提议将三套平行的签名/验证机制收敛为一套。该 Issue 已被 accepted 且为 p1，工程收益明确，预计会在后续版本中落地。

- **统一 slash-command 注册表** — [#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)（p2，no-stale，7 条评论）要求打通 web UI、ZeroCode TUI 与 channel runtime 三套 slash command 注册逻辑，避免命令漂移。**注意该 Issue 带 `needs-author-action` 标签**，需要作者回应，否则可能无法推进。

- **退役 Lucid 内存连接器** — [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644)（p2，needs-author-action，4 条评论）提议在 v0.9.0 移除 Lucid memory connector，理由是上游项目在合并后 4 天即停更。这是一个明确的技术债清理信号。

- **Kanban 插件（RFC）** — [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) 提议 plugin-owned Kanban board。讨论热度高（9 条评论），但距离进入开发周期仍需设计定稿。

- **执行树迭代预算归属** — [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)（p2，needs-author-action，4 条评论）要求明确 `ToolLoop.shared_budget` 的所有权语义——当前所有生产环境根节点都传 `None`，预算机制名存实亡。这是一个架构层面的潜在坑。

> 路线图信号：CI 跨平台与安全策略清理（#8059）是当前最明确的工程化方向；Lucid 退役与 slash-command 统一属于中期架构清理；看板与 LSP（#5907）属于较远期的能力扩展。**需注意多个 p2 功能 Issue 带有 `needs-author-action`/`needs-maintainer-review` 标签，存在因无人回应而停滞的风险。**

---

### 6. 用户反馈摘要

从过去 24 小时的 Issue 评论和描述中提炼的用户痛点：

- **Windows 用户受挫感明显**（#7462）。报告者 NiuBlibing 以简体中文 Windows 11（代码页 936）环境实测，74 个测试失败覆盖 Unix-only 测试命令、路径语义和控制台编码三类问题。CI 不跑 Windows 导致这些问题长期未被发现。用户明确表达了"CI 应覆盖三平台"的诉求（关联 #7461），这不是单个 bug，而是**平台支持承诺与测试覆盖之间的落差**。

- **web_fetch 工具不可用影响 agent 工作流**（#9207）。报告者 jhugard 描述 S1 级阻塞：`web_fetch` 对压缩响应返回二进制乱码，agent 完全无法解析。这对依赖网页内容做决策的自主 agent 场景是直接打击。用户明确提到了 gzip、brotli、deflate 三种编码——说明这是普遍性问题而非个别站点。

- **cron 任务"静默丢失输出"**（#9340，已关闭）。用户 AngryPacifist 指出 CLI 创建的 cron 任务 `delivery.mode` 被硬编码为 `"none"`，agent 任务按计划运行并记录为 ok，但结果被直接丢弃——**没有任何迹象告诉用户输出去了哪里**。这是典型的"虚假成功"问题，会严重损害用户对 cron 功能的信任。好在已修复。

- **Discord 体验瑕疵**（#9198）。vshanbha 报告 daemon 从 dashboard reload 后，正在响应中的 Discord 消息会永久卡在"正在输入…"状态。这属于 S3 小问题，但这类可见状态错误对用户体验影响不小。

---

### 7. 待处理积压

以下为长期未关闭且值得维护者关注的重要 Issue / PR：

| 条目 | 创建时间 | 标签 | 状态 | 备注 |
|---|---|---|---|---|
| [#6653 — 模拟安装的主机架构策略](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) | 2026-05-14 | p3, needs-author-action | OPEN | 3 个月未推进，等待作者回应 |
| [#5907 — ZeroCode 编码工作流可选 LSP 支持](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) | 2026-04-19 | p2, needs-author-action | OPEN | 近 4 个月未推进，功能价值明确，需作者更新方案 |
| [#5316 — 完整 SearXNG 配置与 Web 搜索失败恢复](https://github.com/zeroclaw-labs/zeroclaw/issues/5316) | 2026-04-05 | p2, help wanted, accepted | OPEN | 4 个月仍有活跃讨论（6 条评论），但无对应 PR |
| [#9899 — bitmaps advisory 豁免移除（安全 CI 红灯）](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | 2026-08-10 | p1, blocked | OPEN | 安全 CI 当前失败，等待依赖决策 |
| [#8078 — zerocode 本地预提交门禁（RFC）](https://github.com/zeroclaw-labs/zeroclaw/issues/8078) | 2026-06-21 | p2, no-stale | OPEN | 概念有价值，但近两个月未进入实际实现 |
| [#7527 — macOS 桌面空白窗口（S1）](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) | 2026-06-12 | p1, r:needs-repro | OPEN | 等待复现，2 个月未推进，S1 严重度与响应速度不匹配 |
| [#9398 — macOS/Windows 咨询性测试（PR）](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) | 2026-07-26 | blocked, stacked | OPEN | 被 #9660 阻塞，maintainer 已明确当前 head 不可合并 |

> **维护者提醒：** 当前 36 条 PR 处于待合并状态，其中 #9544（delegate 回退）、#8713（SSRF 门禁）、#9574（审批响应者授权）均为 p1/p2 且风险标记为 high 的独立修复，长期未合并会持续累积 merge conflicts 并增加 community 挫败感。建议优先安排 triage 轮次。

---

**日报总结：** 过去 24 小时内，项目在 Windows 支持、WebSocket 稳定性、缓存边界、ZeroCode UI 等方面完成了多项有价值修复。但平台覆盖缺口（Windows 测试）、web_fetch 可用性和安全 CI 红灯仍是当前最需要资源投入的方向。项目整体健康度良好，社区参与度高（50 条 Issue + 50 条 PR 更新），但 PR 审查积压和 `needs-author-action` 标签的长期悬置是需要关注的运营风险。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*