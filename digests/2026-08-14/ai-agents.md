# OpenClaw 生态日报 2026-08-14

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-13 23:00 UTC

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

# OpenClaw 项目动态日报 — 2026-08-14

> 数据来源：github.com/openclaw/openclaw | 统计窗口：2026-08-13 至 2026-08-14

---

## 1. 今日速览

过去 24 小时项目活跃度处于**极高水平**：累计 500 条 Issue 更新（340 条新开/活跃，160 条关闭）与 500 条 PR 更新（417 条待合并，83 条已合并/关闭），单日千项动态表明项目正处于密集迭代期。**消息投递可靠性是当前最突出的社区焦虑**——#121058 以 92 条评论成为讨论焦点，用户明确指出此前标记为已关闭的修复并未真正解决问题。与此同时，维护者对社区 PR 响应积极（83 条合并/关闭），UI、CLI、网关等领域的小步快修持续推进，但大量 P1 级 session-state/message-loss 类问题仍处于"有 label、无合入"的积压状态。今日无新版本发布。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 项目进展

今日共合并/关闭 83 条 PR，重点进展如下：

### 已合并/关闭的 PR（关键修复落地）

| PR | 内容 | 意义 |
|---|---|---|
| [#123333](https://github.com/openclaw/openclaw/pull/123333) | **fix(gateway): incognito session reset leaves other clients in a deleted chat pane** | 修复隐身会话重置后其他客户端仍停留在已删除聊天窗格的问题，`sessions.reset` 广播原因与删除生命周期不一致，属 RPC 状态同步缺陷 |
| [#122475](https://github.com/openclaw/openclaw/pull/122475) | **refactor(ui): make chat rails full-height resizable columns** | 将聊天侧栏（会话工作区、后台任务、会话伴侣等）改为全高可调整列，统一了与 Terminal 面板的交互一致性 |
| [#121850](https://github.com/openclaw/openclaw/pull/121850) + [#121690](https://github.com/openclaw/openclaw/pull/121690) | **fix(cli): 修复 `--version` 快速路径 spinner 泄漏** | 两条 PR 协同解决 `node dist/index.js --version` 输出末尾出现误导性 `◇ Canceled` 的问题，补上了 legacy 入口测试 |

### 已关闭的 Issue 对应的修复确认

- [#42273](https://github.com/openclaw/openclaw/issues/42273) — `backup create` 在大型 `.openclaw` 目录（4GB+）下卡死，标记 **already-fixed**
- [#85714](https://github.com/openclaw/openclaw/issues/85714) — agent 最终消息因 LLM 忘记调用投递工具而搁浅，已关闭
- [#91456](https://github.com/openclaw/openclaw/issues/91456) — Telegram DM 通道在发送超时后保持 guard 导致消息延迟/丢失，已关闭
- [#105342](https://github.com/openclaw/openclaw/issues/105342) — Telegram 上 `exec` 工具输出被渲染为图片而非文本，已关闭
- [#121605](https://github.com/openclaw/openclaw/issues/121605) — 模型回退后回复生成成功但未投递到频道（2026.7.1-2 回归），已关闭

**整体判断**：项目在 UI 体验、CLI 细节、通道投递三个方向有实质进展，但"投递可靠性"类目呈现"修一个、冒一个"的反复态势，核心机制（subagent announce delivery、session lane、queue fallback）需要系统性重构而非打补丁。

---

## 4. 社区热点

### 讨论热度 Top 5

| 排名 | Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#121058 Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058) | 92 | **信任危机**：监控 cron 持续记录到已关闭 issue 对应的故障模式仍在发生，用户对"关闭即修复"的流程产生质疑 |
| 2 | [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 48 | 要求按来源（用户指令/网页抓取/第三方技能）为记忆条目打信任标签，防止记忆投毒攻击——安全向功能诉求 |
| 3 | [#25592 Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) | 48 | 工具调用间隙的内部处理文本被误投递到 Slack/iMessage 等频道，严重 UX 问题 |
| 4 | [#44925 Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925) | 27 | 子代理完成结果在超时、E31/E42/E45 错误等场景下静默丢失，无重试、无通知 |
| 5 | [#121953 Cron agent turns stall on DeepSeek](https://github.com/openclaw/openclaw/issues/121953) | 16 | `[cron:<jobId> <name>]` 前缀导致 DeepSeek API 边缘节点降级处理，定时任务停顿数分钟 |

### 热点分析

**"静默失败"（silent failure）是贯穿今日社区讨论的第一关键词。** 92 条评论的 #121058 直指 OpenClaw 投递链路缺乏可观测性——用户在 issue 关闭后仍持续观察到故障，说明修复验证体系存在漏洞。此外，子代理编排（#44925、#47975、#67777、#92433）与消息投递（#25592、#85714、#121605）两个 cluster 高度重叠，反映出 **subagent → parent session → messaging channel 的完整链路**是当前系统最脆弱的环节。

---

## 5. Bug 与稳定性

按严重程度排列（P0 > P1 > P2），标注修复 PR 状态：

### 🔴 P0 紧急

| Issue/PR | 问题 | 修复状态 |
|---|---|---|
| [#123243 (PR)](https://github.com/openclaw/openclaw/pull/123243) | Discord 实时语音转写中主动运行控制检查乱序导致说话人归属错误 | ✅ 修复 PR 已提交，待 proof |

### 🟠 P1 严重（影响消息/会话/数据）

**投递与消息丢失类：**

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败在 #116277 关闭后仍复发，无排队回复负载 | ❌ 无 fix PR |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间隙文本泄漏至消息频道（P1 + security-review） | 🟡 有 linked PR 打开 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失——无重试/无通知/无自动重启 | ❌ 无 fix PR |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | 子代理完成投递在 direct-announce 超时/drain/orphan prune 时丢失 | 🟡 有 linked PR 打开 |
| [#92433](https://github.com/openclaw/openclaw/issues/92433) | 子代理完成被 steer 进 requester run 后 requester 提前结束，负载被丢弃 | ❌ 无 fix PR |
| [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat 消息写入 transcript 但不触发/不投递回复 | ❌ 无 fix PR，maturity:stable |
| [#91363](https://github.com/openclaw/openclaw/issues/91363) | isolated cron 在 model-call-started 阶段持续 "LLM request failed" | ❌ 无 fix PR（6 👍 高关注） |
| [#121605](https://github.com/openclaw/openclaw/issues/121605) | 模型回退（claude-cli→anthropic）后回复生成成功但未投递 | ✅ 已关闭（今日修复确认） |

**会话/编排类：**

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | 多代理编排不稳定：并发 `agents add` 配置覆盖、session-lock 失败、子任务脱离 | 🟡 有 linked PR 打开 |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话完成后持久存在，主会话无响应 | ❌ 无 fix PR |
| [#72015](https://github.com/openclaw/openclaw/issues/72015) | active-memory 插件阻塞回复，QMD 启动初始化过载网关 | ❌ 无 fix PR |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | Anthropic 认证恢复后主代理被持久 workspace-state 迁移阻塞 | ❌ 无 fix PR |

**认证/基础设施类：**

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新成功但 cron/heartbeat 遭遇 10s 认证超时（回归） | 🟡 无新 fix，需 live-repro |
| [#115421](https://github.com/openclaw/openclaw/issues/115421) | Schema 降级恢复会 quarantine/清空状态数据库，cron 任务丢失 | 🟡 有 linked PR 打开 |
| [#123073](https://github.com/openclaw/openclaw/issues/123073) | dev 频道更新失败：EUNSUPPORTEDPROTOCOL（npm 与 pnpm workspace 协议不兼容） | ✅ 修复 PR [#123083](https://github.com/openclaw/openclaw/pull/123083) 已提交 |

### 🟡 P2 中等

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未收割，zombie 累积导致运行时性能退化（回归） | ❌ 无 fix PR |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | memory_index_chunks / memory_embedding_cache 无保留策略，磁盘无限增长 | ❌ 无 fix PR |
| [#107814](https://github.com/openclaw/openclaw/issues/107814) | gpt-5.3-codex-spark 对必需参数工具发送空 arguments，schema 校验拒绝 | ❌ 无 fix PR |
| [#95610](https://github.com/openclaw/openclaw/issues/95610) | OpenAI 模型路径下每轮动态注入破坏 prompt 前缀缓存 | ❌ 无 fix PR |
| [#114154](https://github.com/openclaw/openclaw/issues/114154) | bundle-mcp 通过策略和健康检查但 agent 会话从不加载它 | ❌ 无 fix PR |

**趋势判断**：80% 的 P1 问题集中在 **subagent 编排 + 消息投递 + 会话状态** 三角地带，且多个问题呈现"修复后复发"特征（#121058、#91456、#121605）。这暗示根因可能不在单一模块，而是跨组件的竞态条件与事务边界缺失。

---

## 6. 功能请求与路线图信号

### 高热度/高潜力（社区讨论活跃）

| Issue | 功能 | 信号强度 |
|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | **记忆信任标签（Memory Trust Tagging）**：按来源标记记忆可信度，防记忆投毒 | 48 评论，含 security-review 标签，社区安全共识强 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | **工具调用间隙文本隔离**：内部处理输出不应路由到消息频道 | 48 评论，P1 + 已有 linked PR，**有望进入下一版本** |
| [#45758](https://github.com/openclaw/openclaw/issues/45758) | **YAML 配置文件支持**（替代/并存 JSON5） | P3 但 9 评论，DevOps 用户群体呼声稳定 |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | **OpenRouter 用量成本暴露**到 agent 运行时 | 8 评论，成本可视化需求 |

### 与已提交 PR 对应的路线图信号

| 功能 | 对应 PR | 判断 |
|---|---|---|
| **Cron shell precheck 门控**（跳过无任务时的 LLM 调用） | [#112375](https://github.com/openclaw/openclaw/pull/112375) | XL 规模、dual-contract 设计，等待维护者产品决策 |
| **频道参与者身份审计** | [#122863](https://github.com/openclaw/openclaw/pull/122863) | 覆盖 20+ 频道（含 sms/raft/reef/buzz 新频道），安全边界扩展信号 |
| **本地化 i18n 内容哈希重构** | [#123347](https://github.com/openclaw/openclaw/pull/123347) | 解决 60 天 1033 次提交的 PR 噪音问题，预计改善 CI 卫生 |
| **Control UI 斜杠命令参数暂存** | [#123356](https://github.com/openclaw/openclaw/pull/123356) | composer UI 阶段已提交，协议决策仍开放 |

### 值得关注的新兴需求

- [#16555](https://github.com/openclaw/openclaw/issues/16555) — **投递队列 TTL**：防止网关重启后陈旧消息 floods 频道（直接关联今日投递可靠性痛点）
- [#45508](https://github.com/openclaw/openclaw/issues/45508) — **自托管 STT/TTS** 在 webchat 中绕过浏览器 API 走网关
- [#45771](https://github.com/openclaw/openclaw/issues/45771) — **pace-aware 速率限制**：自主 agent 循环防 Anthropic 限流
- [#46058](https://github.com/openclaw/openclaw/issues/46058) — 社区开发者询问 **Android chat-first 皮肤**上游化可行性

---

## 7. 用户反馈摘要

### 核心痛点

1. **"关闭了但没修好"——修复验证体系遭质疑**
   > #121058 用户明确表示：监控 cron 在 issue 关闭后仍持续记录故障。这是今日最危险的信任信号。

2. **多代理编排在实际工作负载下不可靠**
   > [#43367](https://github.com/openclaw/openclaw/issues/43367) 用户报告并行编码批次遭遇配置覆盖、session-lock 失败、子任务脱离；[#43747](https://github.com/openclaw/openclaw/issues/43747) 三位同事的 memory 行为互不一致（chunking/embedding vs SQLite store 差异），说明**同一版本在不同环境下的状态管理行为分叉**。

3. **内部文本泄漏到公开频道是高频 UX 事故**
   > [#25592](https://github.com/openclaw/openclaw/issues/25592) 描述错误处理、处理确认、叙述性文本被当作正式消息推送，用户称"significant UX problem"。

4. **回复延迟与"假死"体验**
   > [#121953](https://github.com/openclaw/openclaw/issues/121953) DeepSeek 上 cron 停顿数十秒至数分钟；[#47975](https://github.com/openclaw/openclaw/issues/47975) 子代理会话残留导致主会话无响应；[#111944](https://github.com/openclaw/openclaw/issues/111944) Codex 评论不推送到 Telegram 进度流。

### 满意度信号

- **正面**：今日关闭的 6 个 issue（backup 卡死、exec 输出渲染、model fallback 投递等）均为用户实际验证过的修复；[#44431](https://github.com/openclaw/openclaw/issues/44431) 浏览器工具 7 项改进已完成闭环。
- **负面**：#121058 中"复发仍未被识别"的案例表明，用户侧监控已比项目侧修复验证更严格。

---

## 8. 待处理积压

### 长期未关闭的高优先级 Issue（按等待时长排序）

| Issue | 创建时间 | 等待天数 | 严重度 | 备注 |
|---|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory Trust Tagging | 2026-02-03 | **192天** | P2/security | 48 评论，需产品决策 |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) OpenRouter 成本暴露 | 2026-02-04 | 191天 | P2 | 等待维护者 review |
| [#16555](https://github.com/openclaw/openclaw/issues/16555) 投递队列 TTL | 2026-02-14 | 181天 | P1 | 直接关联今日投递可靠性痛点 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 文本泄漏至频道 | 2026-02-24 | 171天 | P1 | 有 linked PR，但关键决策未定 |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) 多代理编排不稳定 | 2026-03-11 | 156天 | P1 | 有 linked PR 打开 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) 子代理完成静默丢失 | 2026-03-13 | 154天 | P1 | 社区高频复现，无 fix PR |
| [#45758](https://github.com/openclaw/openclaw/issues/45758) YAML 配置支持 | 2026-03-14 | 153天 | P3 | 需产品决策 |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) 子代理会话残留 | 2026-03-16 | 151天 | P1 | 主会话无响应 |

### 警示项

- **#121058 需要最高优先级响应**：92 条评论 + 复发事实，若继续沉默将严重损害社区信任。
- **P1 积压比例偏高**：今日活跃的 340 条 Issue 中，P1 且无 fix PR 的 session-state/message-loss 类问题占比显著，建议维护者评估是否成立专项攻坚（如 "delivery reliability sprint"）。
- **#115421 的 linked PR 待推进**：schema 降级导致 cron 任务丢失属数据损失级事故，不应停留在 "waiting" 状态。

---

**报告结论**：OpenClaw 项目当前处于**高吞吐迭代期**，UI/CLI 层进步明显，但核心的消息投递与子代理编排链路存在系统性可靠性缺口，且修复验证机制未能覆盖用户侧真实故障模式。建议下一版本优先处理：(1) #121058 代表的静默失败可观测性；(2) subagent completion 投递的事务性保证；(3) 长期积压 P1 问题的专项清理。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期**：2026-08-14 | **数据窗口**：2026-08-13 ~ 2026-08-14

---

## 1. 生态全景

个人 AI 助手开源生态正处于**高吞吐迭代与可靠性焦虑并存**的阶段。头部项目（OpenClaw、Hermes、IronClaw、ZeroClaw、CoPaw）单日均维持 50+ 条 Issue/PR 动态，且多个项目同日完成版本发布（Hermes v0.20.1、IronClaw 1.2.0、NanoClaw v2.2.0、CoPaw v2.1.0），显示交付节奏明显加快。但 OpenClaw 的"修复后复发"信任危机（#121058，92 评论）、IronClaw 的 Sonnet-5 连续三天 500 错误（#7589）、CoPaw 的任务中途自行停顿（#6921）等事件共同表明：**消息投递可靠性、子代理编排稳定性、静默失败可观测性**是当前全生态最普遍的短板。与此同时，多个项目不约而同地向**安全加固**（供应链签名、权限模型、命令分级）与**架构开放化**（IronClaw 内核化、NanoClaw 插件标准化、ZeroClaw 的 Agent Plugins 1.0 接入）方向演进，生态正从"功能扩张期"转入"稳定化 + 安全基座建设期"。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃 / 关闭） | PR 更新（待合并 / 合并/关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（340 / 160） | 500（417 / 83） | 无 | 极活跃，但投递可靠性存在系统性缺口，修复验证遭质疑 |
| **Hermes Agent** | 50（42 / 8） | 50（45 / 5） | **v0.20.1**（汇总约 656 PR） | 极高合入速率，Webhook 战役推进中；2 个 P1 久拖未修 |
| **IronClaw** | 50（32 / 18） | 50（24 / 26） | **1.2.0 稳定版** | 发布流程稳健，架构重构进入执行期；3 个新 bug 无修复 |
| **ZeroClaw** | 50（37 / 13） | 50（43 / 7） | 无（v0.9.0 开发期） | 高活跃，安全加固为主；RFC 决策积压是主要风险 |
| **CoPaw (QwenPaw)** | 42（25 / 17） | 50（31 / 19） | **v2.1.0 + beta.5** | 迭代快，主版本交付与质量加固并行，安全类 Issue 需关注 |
| **NanoBot** | 13（12 / 1） | 31（22 / 9） | 无 | 密集开发与加固期，维护者响应快，心跳 PR 积压 7 周 |
| **NanoClaw** | 2（1 / 1） | 19（13 / 6） | **v2.2.0**（Agent Plugins 1.0 迁移） | 健康度良好，供应链安全投入显著 |
| **LobsterAI** | 1（1 / 0） | 11（6 / 5） | 无 | 节奏稳健，UI 重构消化期；历史 stale PR 为技术债 |
| **Moltis** | 1（1 / 0） | 4（0 / 4 待合并） | 无 | 中等偏下活跃，功能大 PR（CalDAV）待审 |
| **PicoClaw** | 0 | ~8（4 新依赖 + 3 stale 关闭 + 1 待合并） | 无 | 稳定维护，Dependabot 驱动为主，社区 PR 响应慢 |
| **NullClaw / ZeptoClaw** | 0 | 0 | 无 | 24 小时无活动 |

---

## 3. OpenClaw 在生态中的定位

**社区规模与活跃度断层领先**：OpenClaw 单日 500 Issue + 500 PR 的动态量是第二梯队（Hermes/IronClaw/ZeroClaw 各约 100 条合计）的 5 倍，是 NanoBot 的约 12 倍，且长期积压议题的评论热度（#121058 达 92 条）远超其他项目，表明其拥有生态内最大的用户基数和最强的问题反馈密度。

**技术路线差异**：OpenClaw 走**全功能一体化**路线——CLI、WebUI、网关、多频道投递、子代理编排、记忆系统、cron 全部内聚于单一仓库，追求"开箱即用的完整个人 AI 助手"。这与 IronClaw 正在推进的"内核化 + 外部 harness"路线（#7482，将 agent loop 外包给 claude-code/pi/codex）形成鲜明对比；也区别于 NanoBot 的轻量级渠道优先架构和 CoPaw 的桌面 OS Shell 形态。

**核心短板即最大风险**：OpenClaw 的优势是功能广度，但弱点恰恰在**消息投递与子代理链路的可靠性**——80% 的 P1 问题集中在 subagent + delivery + session-state 三角地带，且"修一个冒一个"的复发模式（#121058、#91456、#121605）已引发社区对修复验证流程的信任危机。相比之下，NanoClaw 在供应链安全、IronClaw 在发布工程上的严谨度值得 OpenClaw 借鉴。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息投递可靠性 / 静默失败** | OpenClaw（#121058 静默回复失败、#85592 文本泄漏至频道）、Hermes（#62142 verification-stop 丢弃流式答案）、NanoBot（#5373 cron 调度器静默死亡）、IronClaw（#7589 模型 500 错误三天无响应） | 失败需可见、可重试、可审计；"关闭 issue ≠ 修复完成"需要可观测性体系支撑 |
| **子代理/委派编排稳定性** | OpenClaw（#44925/#67777/#92433 子代理完成静默丢失）、Hermes（PR #81605 SessionDB 隔离 + #85646-85648 委派结果可见性）、CoPaw（#6652 强制 max_iterations 防失控）、NanoClaw（#3330 子代理动态模型选择） | 子代理生命周期管理、结果投递事务性、父子会话上下文隔离是共性痛点 |
| **会话状态持久化与一致性** | OpenClaw（session-state P1 积压）、NanoBot（#4550 cron 跨次执行上下文污染）、Hermes（PR #84876 并发 turn 序列化）、ZeroClaw（#9600 四个重叠工作流协调）、CoPaw（#6047/#6100 升级后会话丢失） | 多组件并发访问同一 SessionDB 的竞态、升级迁移导致的状态损坏 |
| **安全与权限模型** | NanoBot（#5306 exec.allowPatterns shell 链绕过）、CoPaw（#6916 插件静默创建 cron + #6992 端口无鉴权）、NanoClaw（#3229 CSPRNG 修复 + agent 镜像签名链）、ZeroClaw（shell 命令风险分级 + verifiable-intent 凭证链）、OpenClaw（#7707 记忆信任标签防投毒） | 记忆投毒防御、插件权限边界、命令白名单绕过、供应链签名全面受关注 |
| **成本优化** | OpenClaw（#9016 OpenRouter 成本暴露）、NanoBot（#4549 heartbeat 用便宜模型）、Hermes（#85631 免认证多 provider 故障转移池）、ZeroClaw（#9631 稳定 session_id 省 prompt cache）、CoPaw（#6973 阿里云百炼 token 套餐） | 模型调用成本可见性、心跳/后台任务降级用便宜模型、缓存友好成为选型要素 |
| **MCP 生态与插件标准化** | NanoBot（MCP schema 字节预算 #5298、Apps 元数据 #5251）、NanoClaw（per-server disabledTools #2624）、IronClaw（#7626 MCP 双因素认证卡死）、ZeroClaw（#9810 Agent Plugins 1.0 接入）、Moltis（CalDAV/消息历史连接器 #1190） | MCP 工具集膨胀的上下文成本、认证流程兼容、跨项目插件格式统一 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手（多频道、子代理、cron、记忆、UI/CLI） | 追求开箱即用的个人/专业用户，社区规模最大 | 单体仓库一体化；系统复杂度高，投递链路脆弱 |
| **Hermes Agent** | 桌面 + TUI + Webhook 基础设施，委派架构 | 开发者/桌面重度用户，自动化工作流使用者 | 极高 PR 合入速率（656 PR/版本），子代理 SessionDB 隔离推进中 |
| **IronClaw** | 云原生 agent 平台，多租户 kernel 化 | 企业/云部署方，需要多模型 harness 接入的团队 | **内核化路线**：退化为调度/租户/能力膜内核，agent loop 外置；性能工程与发布工程突出 |
| **CoPaw (QwenPaw)** | 桌面 OS Shell + 任务执行 + 中文生态 | 中文用户、桌面场景、Qwen 模型用户 | OS Shell 窗口化应用形态；与阿里云/百炼生态深度绑定 |
| **ZeroClaw** | 安全策略契约 + 会话重构 + verifiable-intent | 安全敏感型用户、企业合规场景 | RFC 驱动开发，决策队列模式；Agent Plugins 1.0 标准接入 |
| **NanoBot** | 轻量渠道优先（Telegram/Matrix）+ cron/heartbeat | 个人轻量用户、渠道机器人场景 | 单仓库小体量（13 Issues/31 PRs），维护者响应快，功能聚焦 |
| **NanoClaw** | 供应链安全 + 插件化模板 + CI 工程化 | 平台运维方、对镜像安全有要求的团队 | 签名即审批（keyless Sigstore）、CI 门禁强制化；方向精准但社区体量小 |
| **LobsterAI** | 企业协作 + 技能/MCP 管理 UI | 企业内网部署、团队协作场景 | 类 SaaS 管理界面整合；测试基建待补（stale PR 积压） |
| **Moltis** | 数据连接器（CalDAV/消息历史）+ 沙箱 | 个人知识管理型用户 | 连接器持久化 + 全文搜索为特色，当前处于功能待并期 |
| **PicoClaw** | 轻量 Go 实现 + Web UI | 对资源占用敏感的用户 | 依赖自动更新为主，人工 PR 响应慢，长会话性能待优化 |

---

## 6. 社区热度与成熟度

**第一梯队：极速迭代期（单日 100+ 动态量）**
OpenClaw、Hermes、IronClaw、ZeroClaw、CoPaw。其中 OpenClaw 动态量一骑绝尘但可靠性口碑承压；Hermes 以惊人的合入速率（656 PR 滚动打包为一版）位居交付效率榜首；IronClaw 发布工程最规范（rc → stable 晋升流程清晰）；ZeroClaw 与 CoPaw 分别以安全加固和功能迭代为主要节奏。

**第二梯队：开发加固期（单日 20~50 动态量）**
NanoBot、NanoClaw。NanoBot 处于密集修复与功能增强并行阶段（cron 持久化、Matrix SAS、Telegram 贴纸），维护者响应快；NanoClaw 虽体量小但围绕供应链安全形成了完整的 CI 闭环，技术方向明确。

**第三梯队：稳定维护期（单日 <20 动态量）**
PicoClaw、LobsterAI、Moltis。三者均无新版本发布、社区讨论稀疏，活动主要来自依赖更新与零星 PR。PicoClaw 与 Moltis 存在社区 PR 响应慢的问题；LobsterAI 历史 stale PR 积压明显。

**休眠**：NullClaw、ZeptoClaw（24 小时内零动态）。

---

## 7. 值得关注的趋势信号

1. **"静默失败"成为全生态头号信任杀手**：OpenClaw #121058（92 评论）、NanoBot #5373（cron 无声死亡）、IronClaw #7589（三天 500 错误无响应）、CoPaw #6921（规划后自行停顿）——用户对"系统不报错但事情没做成"的容忍度正在耗尽。**可观测性（成功率指标、失败告警、重试语义）将取代功能数量成为 AI 助手框架的核心竞争力**。

2. **架构从"一体化单体"走向"内核 + 可插拔 harness"**：IronClaw #7482 明确将 agent loop 外置并支持 claude-code/pi/codex 等外部执行器；OpenClaw 的 subagent 链路之痛、Hermes 的委派 SessionDB 隔离、NanoClaw 的子代理动态模型选择，共同指向同一结论——**单一内置循环无法满足多样化场景，开放 harness 接口是必然方向**。

3. **供应链安全与代码签名从"最佳实践"变为"默认门禁"**：NanoClaw 的 keyless Sigstore 签名驱动审批（#3241）、ZeroClaw 的 verifiable-intent 凭证链校验（#9328）、NanoBot 的 exec 白名单绕过修复（#5306）、CoPaw 的插件静默提权问题（#6916）——**镜像签名、插件权限模型、命令分级正在成为 agent 平台的标配安全基座**。

4. **记忆系统从"功能特性"升级为"安全攻击面"**：OpenClaw #7707（记忆信任标签防投毒）、ZeroClaw #6850（记忆生命周期与存储解耦）、IronClaw #7185（跨对话记忆不可靠）、CoPaw Auto-Dream 容错加固——多个项目独立意识到：**记忆不仅是上下文管理问题，更是投毒攻击的入口和数据治理的难点**。

5. **token 级成本优化成为选型关键词**：ZeroClaw #9631（稳定 session_id 节省 prompt cache）、NanoBot #4549（heartbeat 用便宜模型）、Hermes #85631（免认证免费模型故障转移池）、OpenClaw #9016（成本可见性）——在长会话/高频 cron 场景下，**prompt 缓存友好性和分级模型路由将直接影响用户留存**。

6. **跨平台（特别是 Windows）稳定性成为社区痛点放大器**：Hermes 单日 50 条动态中 5+ 条涉及 Windows（#75791/#82168/#85406 等），NanoBot 发现 Windows 文件替换竞态（PR #5382），CoPaw 遭遇 Windows 启动崩溃与杀软误报（#6955/#6847）——**桌面 agent 的 Windows 兼容性正在拉大项目间的体验差距**。

---

**给技术决策者的建议**：若追求功能广度与社区生态，OpenClaw 仍是首选，但需为投递可观测性缺失预留运维成本；若重视架构演进与安全合规，重点关注 IronClaw 的内核化方向与 NanoClaw 的供应链实践；若面向中文桌面场景，CoPaw 的 OS Shell 形态具备差异化优势。全生态范围内，"可靠性优先于功能堆叠"已成为下一阶段竞争的主题。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-14

## 1. 今日速览

过去24小时项目活跃度极高：**13条 Issue 更新**（新开/活跃 12，关闭 1），**31条 PR 更新**（22条待合并，9条已合并/关闭）。PR 提交量显著放大，且高度集中于**稳定性修复**（cron 调度器存活、会话持久化、文件上限归档、合并压缩截断）、**Telegram 贴纸支持**、**MCP 架构增强**（MCP Apps 元数据保留、schema 字节预算）以及 **Matrix SAS 验证补全**。值得注意的信号是：一个安全漏洞 Issue（#5306）已被关闭，而 6 月底提交的一批 heartbeat/dream 相关 PR 仍处于打开状态，存在积压隐忧。整体判断：项目处于**密集开发与加固期**，社区提交活跃，核心维护者响应较快。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

过去24小时有 **9 条 PR 关闭/合并**（为节省篇幅，下面列出其中可辨识的代表性条目），重点推进方向与对应 PR 如下：

- **Cron/Heartbeat 会话隔离修复**：`fix(cron): use per-run session key to prevent context sharing across cron runs`（[PR #4550](https://github.com/HKUDS/nanobot/pull/4550)）——修复 cron 任务每次运行复用同一 session key 导致跨次执行的上下文污染问题（Fixes #4082）。该 PR 自 6 月 26 日提交后长期搁置，今日关闭值得注意。
- **Dream 合并支持 model_override**：`feat(dream): wire up model_override for Dream consolidation`（[PR #4556](https://github.com/HKUDS/nanobot/pull/4556)）——修复 #4029，使 DreamConfig.model_override 在周期性记忆合并中实际生效。
- **WebUI 原生文件夹选择器**：`feat(webui): add native workspace folder picker`（[PR #5381](https://github.com/HKUDS/nanobot/pull/5381)）——为本地 WebUI 会话提供 macOS/Windows/Linux 原生目录选择，仅在 loopback 模式下启用，保留桌面注入运行时优先与手动路径输入。
- **WebUI 纯转录历史恢复**：`fix(webui): restore transcript-only session history`（[PR #5384](https://github.com/HKUDS/nanobot/pull/5384)）——允许打开和删除仅有显示转录、缺少 canonical session JSONL 的历史会话，并保持 canonical 元数据权威性。
- **Cron 持久化崩溃修复（双 PR 序列）**：`fix(cron): keep scheduler alive when job-store persistence fails`（[PR #5374](https://github.com/HKUDS/nanobot/pull/5374)、[PR #5375](https://github.com/HKUDS/nanobot/pull/5375)）——两条 PR 先后关闭，随后出现了 OPEN 状态的改进版 [PR #5376](https://github.com/HKUDS/nanobot/pull/5376)，说明修复方案在推进中迭代。

**项目整体前进幅度**：cron 调度器稳定性、WebUI 会话管理、Dream 模型覆盖三大方向均有实质性收口；新的 PR 已覆盖会话文件锁、Windows 瞬态错误、MCP schema 预算、Telegram 贴纸、Matrix 验证等多个维度，版本迭代蓄势待发。

---

## 4. 社区热点

- **[Issue #4010] Feature proposal: text-to-speech / voice output support**（[链接](https://github.com/HKUDS/nanobot/issues/4010)）——评论 3、👍 3，创建于 2026-05-26，8 月 12 日仍有更新。这是目前**持续关注度最高的功能请求**：用户指出 nanobot 已支持语音输入，但回复始终是文本——即使渠道本身原生支持语音消息。诉求本质是“闭环对话体验”，评论区已给出实现路径（复用渠道侧语音基础设施，新增 surface 面积最小）。

- **[Issue #5373] Cron scheduler dies permanently after a single job-store persistence failure**（[链接](https://github.com/HKUDS/nanobot/issues/5373)）——8 月 13 日新开即获 1 条评论，属于典型的**“静默永久故障”**：一次磁盘满/权限变化/文件锁即可杀死整个 cron 调度器（`_arm_timer()` 位于 `try/finally` 之外）。该 Issue 直接催生了两轮 PR，社区关注度在修复过程中走高。

- **[Issue #5306] `exec.allowPatterns` shell-chain bypass**（[链接](https://github.com/HKUDS/nanobot/issues/5306)）——**今日状态为 CLOSED**（8 月 13 日关闭）。该安全公告描述 `exec.allowPatterns` 可通过 shell 链式命令绕过命令白名单导致非预期命令执行。关闭意味着已经过处理，建议维护者补充公开说明（修复版本号 / advisory 详情），便于受影响用户评估升级。

- **PR #5385 Matrix SAS 补全**（[链接](https://github.com/HKUDS/nanobot/pull/5385)）—— 针对 #4841（Element 中 bot 设备显示 untrusted）提出完整修复：接受现代 Element 的 `m.key.verification.request`、补发 `ready`、仅在 MAC 验证完成后发送 `done`。这直接回应 Matrix 端用户长期吐槽的信任/验证痛点。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高

- **[Issue #5306] `exec.allowPatterns` 可通过 shell 链式命令绕过命令白名单**（[链接](https://github.com/HKUDS/nanobot/issues/5306)）——安全漏洞，影响配置了 `tools.exec.allowPatterns` 的所有受影响的版本。**状态：已关闭**，建议维护者补充修复版本号与升级指引。

- **[Issue #5373] Cron 调度器因单次 job-store 持久化失败而永久死亡**（[链接](https://github.com/HKUDS/nanobot/issues/5373)）——`_save_store()` 抛出的异常可逃逸 `try/finally` 导致 `_arm_timer()` 不再调度下一次 tick。**已有修复 PR**：[PR #5376](https://github.com/HKUDS/nanobot/pull/5376)（OPEN，替代已关闭的 #5374/#5375）。

### 中

- **[Issue #5378] file-cap 归档失败时先变更会话内存态再持久化**（[链接](https://github.com/HKUDS/nanobot/issues/5378)）——如果 archive 回调抛出异常，`SessionManager.save()` 报错，但调用方的内存 session 已丢弃溢出消息，后续即使 save 成功也无法恢复原状。**已有修复 PR**：[PR #5380](https://github.com/HKUDS/nanobot/pull/5380)（快照→归档失败→恢复会话状态+保留失败前缀以便重试）。

- **[Issue #5377] Consolidation 截断归档输入但推进了整个批次的合并游标**（[链接](https://github.com/HKUDS/nanobot/issues/5377)）——`Consolidator.archive()` 将格式化对话截断到模型 token 预算，但调用者依然将 `last_consolidated` 推进到完整批次之后，被截断的消息/后缀将永久丢失。**已有修复 PR**：[PR #5379](https://github.com/HKUDS/nanobot/pull/5379)（无损分块替代有损截断）。

- **[Issue #5368] WebUI 在 Agent turn 仍在生成时展示 copy/fork 操作**（[链接](https://github.com/HKUDS/nanobot/issues/5368)）——同一次 turn 内生成未结束就出现复制/派生按钮，与 "Working for..." 状态和 composer 运行态并存，制造矛盾信号。当前无直接 fix PR，但在 WebUI 交互打磨范畴内。

- **[PR #5382] `os.replace()` 在 Windows 上遇到瞬态 `PermissionError` 直接崩溃 gateway**（[链接](https://github.com/HKUDS/nanobot/pull/5382)）——heartbeat cron 任务保存会话时已在生产日志中确认两次（2026-08-11 15:44 CDT 与 18:45 CDT）。**这是携带修复的 PR 而非 Issue**，建议 review 后尽快合入。

---

## 6. 功能请求与路线图信号

结合今日 Issues 与对应 PR，以下功能请求**已有实现/接近落地**，大概率进入下一版本：

- **MCP schema 字节预算**（[Issue #5298](https://github.com/HKUDS/nanobot/issues/5298) → [PR #5388](https://github.com/HKUDS/nanobot/pull/5388)）——为模型可见的 MCP 工具 schema 增加 opt-in 字节预算，默认关闭，确定性选取 MCP 子集并保持 run 内稳定。回应大型 MCP 工具集的上下文成本诉求。
- **Telegram 贴纸支持及 agent 主动消息反应**（[Issue #5289](https://github.com/HKUDS/nanobot/issues/5289) → [PR #5387](https://github.com/HKUDS/nanobot/pull/5387)）——暴露入站 sticker 的 `file_id`/emoji/所属贴纸包，支持完整的可复用 sticker 回复。补全 Telegram 渠道能力。
- **MCP Apps 结果元数据保留**（[Issue #5251](https://github.com/HKUDS/nanobot/issues/5251) → [PR #5386](https://github.com/HKUDS/nanobot/pull/5386)）——将 MCP Apps 富结果字段与模型可见文本分离传递，不膨胀模型上下文。
- **Matrix SAS 请求流补全**（[Issue #4841](https://github.com/HKUDS/nanobot/issues/4841) → [PR #5385](https://github.com/HKUDS/nanobot/pull/5385)）——解决 Element 客户端下 bot 设备 untrusted 问题。

**方向已提出但尚未有对应 PR、需观察的信号**：

- **TTS / 语音输出**（[Issue #4010](https://github.com/HKUDS/nanobot/issues/4010)）：评论最多、👍 最多（3），属于呼声较高的体验类功能。
- **QwenCloud 国际平台 provider 路径**（[Issue #5350](https://github.com/HKUDS/nanobot/issues/5350)）：建议在现有 DashScope 兼容路径旁增加 QwenCloud 兼容 provider，兼容存量配置。
- **WebUI Agent 活动文本本地化**（[Issue #5366](https://github.com/HKUDS/nanobot/issues/5366)）：用户所选界面语言已支持，但 Agent 活动（"Working for..."、"Reading file..." 等）仍为纯英文。适合作为国际化补完性 PR。
- **ViBo 第三方记忆系统集成提议**（[Issue #5372](https://github.com/HKUDS/nanobot/issues/5372)）：外部生态提出的跨会话持久记忆方案（含免费试用）。已收到但尚未有维护者表态，建议评估是否值得纳入路线图或标记为 not-planned。

---

## 7. 用户反馈摘要

- **语音闭环诉求**（[#4010](https://github.com/HKUDS/nanobot/issues/4010)）：用户明确表达“能听不能说”的失衡感——“the agent's reply is always text, even on channels that natively support voice notes”。对支持语音消息的渠道（Telegram/Matrix 等）用户而言，这是很高频的体验缺口。
- **Cron 静默失效的挫败感**（[#5373](https://github.com/HKUDS/nanobot/issues/5373)）：报告者描述“scheduler can die silently and permanently”，一次磁盘满或权限变化即导致所有定时任务不再运行且无人感知。这类问题最伤用户信任，好在已有修复 PR 跟进。
- **Windows 平台稳定性痛点**（[PR #5382](https://github.com/HKUDS/nanobot/pull/5382)）：贡献者在真实生产 gateway.log 中两次捕获 `os.replace()` 的瞬时权限错误，并手动完成根因分析。说明 Windows 环境在文件替换/持久化路径上仍需更多加固。
- **Element 客户端信任警告**（[#4841](https://github.com/HKUDS/nanobot/issues/4841)）：Matrix 用户报告 bot 设备在 Element（Web/Desktop/Android）显示 “Untrusted”，且没有干净的验证路径。这是加密聊天场景下的安全体验硬伤，今天 PR #5385 已给出完整修复方案。
- **大 MCP 工具集的上下文成本焦虑**（[#5298](https://github.com/HKUDS/nanobot/issues/5298)）：用户调研发现 `ToolRegistry.get_definitions()` 始终将全部 MCP schemas 传给 provider，在工具数量大时 token 开销不可忽略——这正是企业级使用场景的真实顾虑。

---

## 8. 待处理积压

以下事项长期未获响应或解决，建议维护者关注：

- **[Issue #4010] TTS voice output（2026-05-26 创建，至今 12 周+）**（[链接](https://github.com/HKUDS/nanobot/issues/4010)）——3 个 👍 是当前 Issue 中最高，持续获得关注但无维护者回应/添加 label。这是社区呼声最强的体验类需求之一。
- **[PR #4549] heartbeat model_override 配置（2026-06-26 提交）**（[链接](https://github.com/HKUDS/nanobot/pull/4549)）——允许为 heartbeat 指定更便宜的模型，解决每次心跳都走主模型的高成本问题。近 7 周未合并，且今日更新仍在进行（8 月 13 日有更新），需要维护者明确推进或给出反馈。
- **[PR #4551] heartbeat isolated_session 配置（2026-06-26 提交）**（[链接](https://github.com/HKUDS/nanobot/pull/4551)）——与 #4549 同批次心跳优化，仍处于 OPEN 状态。同方向积压可能导致社区重复提交类似改动。
- **[Issue #4841] Matrix 设备 untrusted（2026-07-07 创建）**（[链接](https://github.com/HKUDS/nanobot/issues/4841)）——虽然已有 PR #5385 覆盖，但 Issue 本身尚未关闭，建议待 PR 合入后统一闭环。
- **[Issue #5251] MCP Apps host 支持（2026-08-05 创建）**（[链接](https://github.com/HKUDS/nanobot/issues/5251)）——与 PR #5386 呼应，但 PR 只做“preserve metadata”，尚未实现完整 UI 侧 MCP Apps 渲染/交互，Issue 层面需求仍未被满足。

---

**附：全部今日活跃 PR 链接索引（按编号）**：[#5383](https://github.com/HKUDS/nanobot/pull/5383)、[#5358](https://github.com/HKUDS/nanobot/pull/5358)、[#5357](https://github.com/HKUDS/nanobot/pull/5357)、[#5381](https://github.com/HKUDS/nanobot/pull/5381)、[#5384](https://github.com/HKUDS/nanobot/pull/5384)、[#5388](https://github.com/HKUDS/nanobot/pull/5388)、[#5387](https://github.com/HKUDS/nanobot/pull/5387)、[#5386](https://github.com/HKUDS/nanobot/pull/5386)、[#5385](https://github.com/HKUDS/nanobot/pull/5385)、[#4549](https://github.com/HKUDS/nanobot/pull/4549)、[#4551](https://github.com/HKUDS/nanobot/pull/4551)、[#5382](https://github.com/HKUDS/nanobot/pull/5382)、[#5380](https://github.com/HKUDS/nanobot/pull/5380)、[#5349](https://github.com/HKUDS/nanobot/pull/5349)、[#5379](https://github.com/HKUDS/nanobot/pull/5379)、[#5376](https://github.com/HKUDS/nanobot/pull/5376)、[#5374](https://github.com/HKUDS/nanobot/pull/5374)、[#5375](https://github.com/HKUDS/nanobot/pull/5375)、[#4556](https://github.com/HKUDS/nanobot/pull/4556)、[#4550](https://github.com/HKUDS/nanobot/pull/4550)。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-14

数据窗口：2026-08-13 ~ 2026-08-14 UTC（来自 NousResearch/hermes-agent）

---

## 1. 今日速览

项目保持极高活跃度。过去 24 小时共有 50 条 Issue 更新（42 条新开/活跃、8 条关闭）和 50 条 PR 更新（45 条待合并、5 条合并/关闭）。昨日发布了 v0.20.1 补丁版本，滚动合并了自 v0.20.0 以来约 656 个 PR，项目合入速率惊人。社区焦点集中在 Webhook Revolution 大型重构战役（Meta-Issue #84834，16 条评论）以及两个超过一周未解决的 P1 级 TUI/桌面端 Bug（#69592 已持续 13 天、#62142 已持续 34 天）。值得注意的是，今日有 3 个新的委派（Delegation）相关功能请求（#85646~#85648），配合 P1 修复 PR #81605，显示子代理/委派架构正在经历一轮系统性加固。

---

## 2. 版本发布

### Hermes Agent v0.20.1（v2026.8.13）

- **发布日期**：2026-08-13
- **类型**：Patch Release
- **链接**：[Release v2026.8.13](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.13)

**更新内容：** 这是补丁版本，将 v0.20.0 之后合并的约 656 个 PR 滚动汇总为一个稳定的 tagged release。主要面向下游使用方（Docker 镜像、托管部署、从 latest tag 安装的用户）。

**破坏性变更：** 未明确声明破坏性变更。作为 patch 版本，预期与 v0.20.0 保持 API 兼容。但对于直接从 v0.19.x 跳级升级的用户，建议关注此前 major/minor 版本中已公告的配置项变更（例如 `configLoader: 'native'` 相关警告，见 Issue #76207、#79664）。

**迁移注意事项：** 建议下游消费方更新镜像/依赖 tag 至 `v2026.8.13` 或 `v0.20.1`，以获取自 v0.20.0 以来的全部修复与改进。

---

## 3. 项目进展

今日关闭了 5 个 PR（包含 #85677、#85661），另有 45 个 PR 在队列中等待合并。虽然今日"已合并/关闭"的 PR 绝对数量不多，但结合 v0.20.1 发布（滚动汇总 656 个 PR）以及 Webhook Revolution 战役的持续推进，项目整体处于大步快跑阶段。

**值得关注的重要 PR（待合并队列中的关键项）：**

- **[PR #81605] fix(delegate): subagents get a dedicated SessionDB, not the parent's** — P1 级修复，子代理不再共享父代理的 SessionDB 句柄，而是打开专用连接。解决了长期存在的子代理会话状态互相污染问题。该 PR 拯救了 #81343（保留原作者署名）。[PR 链接](https://github.com/NousResearch/hermes-agent/pull/81605)

- **[PR #84876] fix(api_server): serialize concurrent agent turns per session** — 为同一 `session_id` 上的并发 agent 轮次（包括 wake self-posts 和 /v1/runs）增加序列化，避免两个对话循环同时操作同一份 SessionDB 记录。[PR 链接](https://github.com/NousResearch/hermes-agent/pull/84876)

- **[PR #59624] fix(tui_gateway): drop interrupt sentinel before websocket delivery** — 防止"等待模型响应已被中断"的取消哨兵消息作为助手文本投递到 WebSocket；ACP 已做相同处理（#41720），此 PR 补上 TUI_Gateway 侧漏洞。[PR 链接](https://github.com/NousResearch/hermes-agent/pull/59624)

- **[PR #85687] fix(kanban): inherit durable parent session for dispatcher-spawned child cards** — 修复 dispatcher 派生的 worker 子卡片把 `tasks.session_id` 指向 ephemeral 会话、导致终态事件路由到不存在会话的问题。[PR 链接](https://github.com/NousResearch/hermes-agent/pull/85687)

- **[PR #85677] fix(mcp): resolve Hermes home through one profile-aware helper** — 将 `mcp_serve.py` 中 4 处重复的 home 解析逻辑收敛为一个 profile-aware 公共 helper，消除配置漂移风险。（今日已合并）[PR 链接](https://github.com/NousResearch/hermes-agent/pull/85677)

**Webhook Revolution 战役（#84834）正在持续推进：** 今日提交了 2 个任务 PR —— #85674（可观测执行注册表，支持状态查询与取消）和 #85675（SSRF 防护的签名回调投递）。这两项分别对应战役任务 11 和任务 13（#4386/#73828）。

---

## 4. 社区热点

### 最热 Issue：#84834 — Webhook Revolution 元议题
- **评论：** 16 条 | **创建：** 2026-08-12 | **状态：** OPEN
- **链接：** [Issue #84834](https://github.com/NousResearch/hermes-agent/issues/84834)
- **分析：** 这是整个 Webhook 表面（ingress、执行、投递、配置、管理 UI、部署、文档）的"5×2×3"全面修复战役的元议题。今日围绕它提交了至少 2 个对应 PR（#85674、#85675），说明该战役从讨论快速进入了实施阶段。背后诉求是 webhook 基础设施的系统性欠债——涉及投递可靠性（risk-message-delivery）和安全性（SSRF 防护）。

### 最持久痛点：#69592 — TUI /sessions 与 /models 覆盖层不可见
- **评论：** 12 条 | **P1** | **已持续 13 天**（2026-07-22 创建，8-13 仍有更新）
- **链接：** [Issue #69592](https://github.com/NousResearch/hermes-agent/issues/69592)
- **分析：** 这是当前 TUI 方向最严重的回归。使用 ambient widget dock（文档推荐的配额仪表盘模式）后，`/sessions` 和 `/models` 覆盖层变为不可见，导致用户无法切换会话或更换模型；`/reload` 也静默失效。由于这是"文档化 TUI dock 模式"下的默认行为，影响面较大。社区 13 天持续追问，目前没有关联的修复 PR。

### 最多 👍 的功能请求：#39043 — Signal 适配器增强
- **👍：** 3 | **评论：** 7 | **P3**
- **链接：** [Issue #39043](https://github.com/NousResearch/hermes-agent/issues/39043)
- **分析：** 用户希望 Signal 适配器支持原生引用/回复、编辑、远程删除、已读回执等端到端能力。自 6 月创建以来持续有讨论，当前无对应 PR。这类"平台适配器能力补齐"的请求反映了多平台接入用户对原生体验的期待。

---

## 5. Bug 与稳定性

按严重程度排列（P1 优先）：

### P1 级

| Issue | 标题 | 持续天数 | 修复 PR |
|---|---|---|---|
| [#69592](https://github.com/NousResearch/hermes-agent/issues/69592) | TUI /sessions 与 /models 覆盖层不可见，无法恢复会话/更换模型 | 13 天 | 无 |
| [#62142](https://github.com/NousResearch/hermes-agent/issues/62142) | verification-stop 可丢弃流式最终答案和 cron 报告 | 34 天 | 无 |
| [#82168](https://github.com/NousResearch/hermes-agent/issues/82168) | Windows 安装程序"同时更新和重装" | 5 天 | 无 |
| [PR #81605](https://github.com/NousResearch/hermes-agent/pull/81605) | 子代理共享父 SessionDB（数据可靠性隐患） | P1 | ✅ 已有修复 PR（待合并） |

### P2 级（部分）

- **[#85215](https://github.com/NousResearch/hermes-agent/issues/85215)（2026-08-13 新开）** — Cron 任务固定到失效模型且忽略 fallback_providers，连续数日 HTTP 402 失败。与 #70050（cron 模型无法重新固定）形成一组系统性问题——cron 的模型快照机制缺少失效恢复路径。
- **[#70131](https://github.com/NousResearch/hermes-agent/issues/70131)** — Emoji 截断循环修复（#14572）不完整：✨U+2728 和 ✅U+2705 仍在 Dingbats 范围内被截断。已有用户指出 `0x1F300` 下限判断过于粗暴。
- **[#83427](https://github.com/NousResearch/hermes-agent/issues/83427)** — 桌面端 browser_exec 崩溃：PYTHONPATH 指向 Hermes venv 时 `pydantic_core` ModuleNotFoundError。
- **[#75791](https://github.com/NousResearch/hermes-agent/issues/75791)** — Windows 11 25H2 上 `hermes dashboard --status` 误报无 dashboard 进程。
- **[#85406](https://github.com/NousResearch/hermes-agent/issues/85406)（2026-08-13 新开）** — Windows 主机 + Docker 终端下 `vision_analyze` 对沙箱路径失败：宿主侧 `Path()` 将 POSIX 分隔符转成反斜杠。
- **[#85614](https://github.com/NousResearch/hermes-agent/issues/85614)（2026-08-13 新开）** — Slack 对等 bot ID 在早期投递检查中必需、却被最终 bot 授权忽略，身份校验存在分裂。
- **[#85658](https://github.com/NousResearch/hermes-agent/issues/85658)（2026-08-13 新开）** — 被中断的命令导致当前会话"继承"另一会话的工作目录，`__HERMES_CWD_*` 标记时序问题。

### 稳定性观察

- **Cron 系统** 成为今日 bug 高发区：#70050（cron edit 缺少 --model）与 #85215（cron 固定在死模型上）共同指向 cron 的模型生命周期管理存在设计缺口——没有"模型失效→自动 repin/fallback"的支持路径。
- **Windows 平台** 仍是兼容性重灾区：本期 50 条 Issue/PR 中，涉及 Windows 或 `risk-platform-windows` 的条目至少有 5 条（#75791、#82168、#85406、#85659、PR #85683 等）。

---

## 6. 功能请求与路线图信号

### 今日新增的功能请求（3 个委派相关，来自同一作者 Xipong）

这三个请求构成一个完整的"委派结果可见性"增强序列，反映用户对**批次委派（batch delegation）**的体验不满——已完成子任务的结果被卡在未完成的兄弟任务后面：

- **[#85646](https://github.com/NousResearch/hermes-agent/issues/85646)：** 持久化并独立结算已完成的批次子代理（exactly-once 投递身份）。
- **[#85647](https://github.com/NousResearch/hermes-agent/issues/85647)：** 在每次 between-turn 边界提前投递已完成子任务的结果，无需等待兄弟任务完成。
- **[#85648](https://github.com/NousResearch/hermes-agent/issues/85648)：** 让已就绪的依赖结果在长时间前台回合中即可影响父任务，而非事后诸葛亮。

**路线图判断：** 这三个请求与 PR #81605（子代理 SessionDB 隔离）方向一致，说明维护者正在对委派子系统做架构性加固。结合 P1 状态，委派可靠性和结果可见性大概率是 v0.21 的重点方向。

### 其他值得关注的功能信号

- **[#85631](https://github.com/NousResearch/hermes-agent/pull/85631)（PR）** — "Freemaxxing"：可选的 no-auth 多 provider 故障转移池。允许模型 provider 插件声明为"免认证回环 provider"，前端到本地端点（如聚合免费 tier 的故障转移代理）。这是一个面向免费/低成本的社区驱动功能。
- **[#85685](https://github.com/NousResearch/hermes-agent/pull/85685)（PR）** — 强制 fail-closed 确定性路由：GLM-5.2 编排 → DeepSeek V4 Pro 实现 → GPT-5.6 SOL 最终审阅，跨 TUI/CLI/batch 执行。该 PR 标注了 `needs-decision`，说明存在争议（某些用户可能不想要这种硬编码的"三模型流水线"）。
- **[#85621](https://github.com/NousResearch/hermes-agent/pull/85621)（PR）** — 技能（skills）元数据拓扑路由与审计：为本地/外部/插件技能提供确定性路由，冲突时 fail-closed。
- **[#84317](https://github.com/NousResearch/hermes-agent/issues/84317)** — 允许冷启动时关闭 Telegram 的 `drop_pending_updates`（当前冷启动会丢弃最多 24 小时积压的更新）。
- **[#33049](https://github.com/NousResearch/hermes-agent/issues/33049)** — 凭证池耗尽 TTL 可配置化（当前 `EXHAUSTED_TTL_*_SECONDS` 硬编码为 1 小时）。

---

## 7. 用户反馈摘要

### 典型痛点

- **TUI 用户沮丧情绪明显（#69592）：** "Day 13 since this broke." 用户 @apoapostolov 持续更新影响说明，核心 TUI 工作流（切换会话/模型）在默认配置下完全死掉，且 `/reload` 静默失败。这是当前最尖锐的满意度负面信号。
- **Cron 用户被卡死（#70050）：** 用户 @bgexpert 描述"stuck with no supported way to repin model"——免费套餐间 cron 漂移保护导致模型固定后无法通过任何受支持路径改回。配合 #85215 的"402 连续数天"反馈，cron 相关体验正在透支用户信任。
- **成本显示失真（#79220，已关闭）：** 低于 ~$1/Mtok 的模型单轮成本被格式化为 `$0.00`。虽然计算正确但展示错误，用户 @dominicelayda 明确说明"这是显示 Bug 而非计算 Bug"。该 Issue 已关闭，说明已修复或已排期。
- **Vite 警告困惑（#76207、#79664）：** 多条重复报告说明 `hermes update` 输出的 Vite `configLoader` 警告让普通用户感到困惑。其中一个已被标记为 duplicate。

### 好的方面

- **社区协作氛围积极：** PR #81605 通过 cherry-pick 保留原作者 @thatssoheil 的署名，体现了对社区贡献的尊重。
- **MCP 脚本化需求强烈且响应快：** 用户反映 `hermes mcp configure` 必须交互式操作后在当日获得两个 PR 响应（#85688 非交互式工具选择、#85686 通过 `--tools`/`--all` 从脚本配置服务器），说明 CI/自动化用户的需求被快速采纳。
- **新用户/普通用户占比高：** 多条 Issue（#85104 桌面端重复渲染、#85659 法语 Windows 更新报错）来自较新的用户账号，且多为 P2/P3 级、需要有 `needs-repro` 标记，显示项目正在吸引更广泛的用户群体，但也让维护者面临更多低优先级噪音。

---

## 8. 待处理积压

以下为长期未获回应的重点 Issue/PR，建议维护者优先查看：

| 项目 | 类型 | 创建日期 | 持续天数 | 标签 | 说明 |
|---|---|---|---|---|---|
| [#69592](https://github.com/NousResearch/hermes-agent/issues/69592) | Issue (P1) | 2026-07-22 | **13 天** | TUI, sessions | P1 级 TUI 核心功能回归，13 天无修复 PR，社区持续追问 |
| [#62142](https://github.com/NousResearch/hermes-agent/issues/62142) | Issue (P1) | 2026-07-10 | **34 天** | TUI, cron | 流式答案/报告被丢弃，影响桌面端与 cron 投递 |
| [#65085](https://github.com/NousResearch/hermes-agent/issues/65085) | Issue (P2) | 2026-07-15 | **30 天** | Telegram, auth | 群组观察归因逻辑破坏斜杠命令的管理员门控 |
| [#63338](https://github.com/NousResearch/hermes-agent/issues/63338) | Issue (P3) | 2026-07-12 | **33 天** | Dashboard | `npm run build` CPU 200%+，VPS 上触发监控警报 |
| [#59624](https://github.com/NousResearch/hermes-agent/pull/59624) | PR (P2) | 2026-07-06 | **39 天** | TUI_Gateway | 中断哨兵消息误投递的修复 PR，等待合并（ACP 已同步修复） |
| [#9221](https://github.com/NousResearch/hermes-agent/pull/9221) | PR (测试) | 2026-04-13 | **123 天** | security, dashboard | 为 /api/env PUT/DELETE 增加授权回归测试；当前在队列中停留超 4 个月 |

**风险提示：** #69592 与 #62142 均为 P1 且在积压超两周以上，若持续无修复 PR，可能导致 TUI/桌面端重度用户的流失。建议维护者明确回应修复计划或 timeline。

---

*日报完。数据来源：NousResearch/hermes-agent GitHub 仓库，统计窗口为 2026-08-13 ~ 2026-08-14。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 2026-08-14

## 1. 今日速览

PicoClaw 今日整体活跃度中等偏高，但主要驱动力来自 Dependabot 自动提交的依赖更新——过去 24 小时新增 4 个依赖 PR（#3332~#3336），另有 3 个陈旧 PR 被自动关闭（#3304、#3305、#3306）。人工提交方面，Web 前端 lockfile 修复 PR #3318 仍在等待合并（已 9 天），两项新功能请求（#3330、#3331）和一项 Web UI 性能 Bug（#3281，评论持续增加中）构成社区讨论的主要议题。项目今日无新版本发布，整体处于稳定维护节奏中。

## 2. 版本发布

今日无新 Release。

## 3. 项目进展

今日**无实际代码合并**。已关闭的 3 个 PR 均为 Dependabot 依赖更新，因标记为 `stale` 被自动关闭：

- **#3305**（bedrockruntime 1.56.2）— [链接](https://github.com/sipeed/picoclaw/pull/3305)
- **#3306**（aws-sdk-go-v2/config 1.32.33）— [链接](https://github.com/sipeed/picoclaw/pull/3306)
- **#3304**（anthropic-sdk-go 1.61.0）— [链接](https://github.com/sipeed/picoclaw/pull/3304)

这三条 PR 被更新的版本号替代（新版本已由 #3332、#3335、#3334 重新提交），说明维护者正在通过 stale 机制清洗过时依赖请求，保持仓库整洁。

**值得关注的重点 PR**：

- **#3318** — 修复 `web/frontend/pnpm-lock.yaml` 中重复键导致的 lockfile 损坏问题（`ERR_PNPM_BROKEN_LOCKFILE`）。这是一个影响前端构建链的实质性修复，由社区贡献者 nuestraai 提交，已等待 9 天仍未合并，建议维护者尽快 review。

## 4. 社区热点

**Issue #3281「Web UI chat input is very laggy when history has a little bit long」** — [链接](https://github.com/sipeed/picoclaw/issues/3281) 是今日讨论最活跃的议题，5 条评论、1 个 👍，最新更新于 8 月 13 日。用户报告在 PicoClaw Web UI 中，当单个会话的历史消息较多时，输入框出现明显卡顿，影响日常使用体验。该 Issue 自 7 月 21 日创建以来持续获得关注，反映出**长对话性能**是当前用户在实际使用中最直观的痛点之一。这可能是前端渲染机制或状态管理在处理长消息流时存在性能瓶颈。

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 | 关联修复 PR |
|---------|-------|------|------|------------|
| 中高 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 聊天历史较长时输入严重卡顿 | OPEN（持续更新中） | 暂无 |

该 Bug 影响核心使用场景——长会话对话质量与输入流畅度。当前尚无关联修复 PR，优先级建议提升。用户环境信息：PicoClaw 0.3.1、Go 1.25.11、PicoClaw Web 通道，环境信息完整，便于维护者复现。

## 6. 功能请求与路线图信号

新增两项功能请求，均为社区用户直接提出的扩展能力需求：

1. **#3330「Support dynamic model override in delegate/spawn/subagent tools」** — [链接](https://github.com/sipeed/picoclaw/issues/3330)  
   要求 `delegate`、`spawn`、`subagent` 工具支持在调用时动态指定模型，而非静态读取 agent 配置。这属于 AI 编排/子代理场景下的灵活路由能力，对构建复杂多代理工作流的用户有明确价值。若与近期 Anthropic SDK 的更新（#3334）协同，可能意味着子代理模型路由将在下一版本中获得更好的可配置性。

2. **#3331「Support any /audio/transcriptions endpoint models」** — [链接](https://github.com/sipeed/picoclaw/issues/3331)  
   建议放开语音转写对 `*-whisper-*` 命名模型的硬编码限制，允许用户配置任意兼容 `audio/transcriptions` 端点的模型（如更新的 Whisper 版本或第三方服务）。提出者指出当前内置 Whisper 模型"太老且慢"，这指向**语音输入体验的现代化需求**。

这两个请求均指向"配置灵活性"方向，建议纳入路线图评估；尤其是 #3330 实现成本较低（仅在调用链传递 model 字段），可考虑随下个 minor 版本发布。

## 7. 用户反馈摘要

从 Issue #3281 及相关讨论中可提炼以下用户反馈：

- **真实痛点**：Web UI 在长会话场景下的输入延迟明显，影响对话流畅度。用户对 PicoClaw Web 端的 UI 交互性能有较高期望。
- **使用场景**：用户倾向于在单个 session 中积累较长对话历史，意味着 PicoClaw 被用于持续性、多轮复杂任务的场景，而非一次性短问答。
- **版本环境**：用户运行在 0.3.1 版本、Go 1.25.11 环境下，说明有一定技术背景，反馈的描述和复现步骤较规范。
- **对语音功能的态度**：#3331 的作者对当前内置 Whisper 模型表达不满（"too old and slow"），倾向接入更新或更快的转写模型。

整体看，用户对 PicoClaw 的核心 AI 能力是认可的，但对前端交互性能和配置灵活性提出了更高要求。

## 8. 待处理积压

| 项目 | 创建时间 | 等待时长 | 说明 | 建议 |
|------|---------|---------|------|------|
| PR [#3318](https://github.com/sipeed/picoclaw/pull/3318) | 2026-08-05 | 9 天 | 修复 pnpm-lockfile 损坏问题，影响 Web 前端构建链 | 优先 review；如无问题应尽快合并，否则请反馈修改意见 |
| Issue [#3281](https://github.com/sipeed/picoclaw/issues/3281) | 2026-07-21 | 24 天 | Web UI 长会话输入卡顿，社区持续关注 | 建议标记 `bug` 或 `needs-triage`，并安排性能排查 |
| PR #3332~#3336 | 2026-08-13 | 1 天 | 5 个依赖更新等待合并 | 例行处理，注意 #3334（anthropic-sdk-go 1.62.0）跨度较大（1.55.1→1.62.0），建议 Review release notes |

**项目健康度提示**：依赖更新 PR 活跃而人工贡献 PR 合并缓慢（#3318 卡 9 天），建议维护者关注社区 PR 的响应时效，避免降低外部贡献者积极性。Stale bot 机制运作正常，过时依赖已及时清理，但需警惕自动关闭可能遗漏有价值更新（如 #3304 同类更新已由 #3334 重新提交，目前机制运转良好）。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-14

## 今日速览

今日项目活跃度极高，24 小时内处理了 19 条 PR（其中 13 条已合并/关闭、6 条待合并），并正式发布 v2.2.0。该版本承载了 agent templates 向 Agent Plugins 1.0.0 目录结构的重大格式迁移，标志着模板功能进入插件化时代。CI 侧围绕 agent 镜像验证与签名审批链有一连串收尾工作，`verify-agent-image` 从"建议性"变为真正的门禁检查。Issues 侧 2 条更新中 1 条已关闭，1 条新报告的安全/体验问题待响应。整体项目健康度良好，核心团队提交密集，供应链安全投入明显。

---

## 版本发布

### v2.2.0
**发布日期：** 2026-08-13（PR #3237 发布）

这是模板功能的一次重大版本升级，核心变化是 **agent templates 升级为 Agent Plugins 1.0.0 目录结构**（由 #3220 合并引入）：

- **模板即插件：** 模板现在以 Agent Plugin 1.0.0 标准目录形式存在，具备完整的插件元数据、能力声明和权限模型。
- **就地更新语义：** `ncl groups create --template <ref>` 的执行语义发生变化。如果目标 group 已带有该模板的插件，同一命令现在执行 **就地更新（in-place update）**，不再生成重复 agent。dry run 模式会打印一份完整计划，列出插件拥有的每个将被更新的表面（插件文件、skills、MCP servers 等）。

> ⚠️ **破坏性变更提示：** 由于模板目录格式迁移，旧版模板目录将不再被识别。升级前请通过 dry run 验证现有 group 的模板状态，确认插件表面更新范围。发布说明原文在数据中不完整，建议查看 GitHub Release 页面获取完整变更日志。

---

## 项目进展

### Agent 镜像供应链安全闭环（核心团队，多 PR 串联）

近期最重要的进展集中在 **agent 镜像验证与签名审批链** 的落地，今日多个 PR 完成收尾：

- **#3236 [已合并]** — 将 agent 镜像重固定至 `hardened-2026-08-13`，本次升级包含项目自有内容而不仅是基础镜像刷新。*注：发布说明中提示安全修复相关。*
- **#3238 [已合并]** — 修复 `verify-agent-image` 工作流因路径过滤无法成为必需状态检查的问题，现在该检查会在 **每个 PR** 上运行，这是它能作为门禁的前提。
- **#3158 [已合并]** — 修正签名验证因环境变量不存在而被跳过的缺陷，接入发布者真实身份（keyless Sigstore），并支持按架构检查 attestations。
- **#3240 [已合并]** — 打通 agent 镜像提升环路的后半段：AWS worker promote 镜像后触发 `repository_dispatch`，自动打开 `versions.json` PR。
- **#3241 [已合并]** — 实现"签名为审批"：publisher 签名本身即作为 pin bump 的 approving review，默认关闭（`AGENT_IMAGE_AUTO_APPROVE=true` 时启用），否则仅报告将批准的内容并停止。
- **#3239、#3242 [已合并/关闭]** — 均为验证链路的 live-fire smoke test，确认角色假设、ECR 登录、manifest 检查全链路可用。

**意义：** agent 镜像的升级从"人工点击审批"进化为"可验证签名作为审批依据"，CI 门禁从仅提示变为强制。这是一次完整的安全基座升级。

### Agent Templates 插件化（核心特性）

- **#3220 [已合并]** — `feat!` 级变更：agent templates 成为 Agent Plugins 1.0.0 目录，含 stamp-time symlink/caps/secret 安全加固。
- **#2909 [已合并]** — setup wizard 模板流程与 first-agent stamping，是模板功能的 UI/UX 落地面（stacked on #3220）。

### 其他已合并修复

- **#3231 [已合并]** — Codex/OpenCode 两端的 provider 配置 writer 均支持插件 MCP working directory。
- **#3229 [已合并]** — Telegram 配对码改用 CSPRNG（`crypto.randomInt`），并扩大码空间，修复安全弱点。
- **#2624 [已合并]** — 支持在 `McpServerConfig` 中按 server 禁用特定工具。
- **#3145 [已合并]** — DB 迁移 021：为现有 messaging-group wirings 回填缺失的 channel destinations。
- **#3230 [已合并]** — 文档修复：移除指向已退役 data/env mirror 的 skill 移除说明。

---

## 社区热点

### 🔥 #3235 — 未知发送者审批产生"无界"审批卡片（新开，0 评论）

**链接：** [nanocoai/nanoclaw Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235)

当消息组的 `unknown_sender_policy = 'request_approval'` 时，webhook/机器人的消息会像人类消息一样触发未知发送者审批。对于高频 webhook，这会产生**不断增长的审批卡片队列**，既无法合理批准，拒绝也无法持久生效——bot 不会"学会"。这是自动化场景与人工审批模型冲突的典型问题，涉及策略层设计，预计会引发较多社区讨论。

### 💬 #3234 — Template-stamped group 缺少 `ag-` 前缀（已关闭）

**链接：** [nanocoai/nanoclaw Issue #3234](https://github.com/nanocoai/nanoclaw/issues/3234)

`ncl groups create --template` 产生的 agent group id 是 bare UUID，而 `--folder` 路径产生 `ag-<uuid>`。由于 id 直接用作 OneCLI agent 标识符，以数字开头的 UUID 会被 OneCLI 的 `ensureAgent` 拒绝。问题已关闭（1 条评论），说明已获处理，社区用户对 ID 格式一致性有预期。

### 📌 #3243 — auto-merge 不应作为 verify 的判定依据（待合并）

**链接：** [nanocoai/nanoclaw PR #3243](https://github.com/nanocoai/nanoclaw/pull/3243)

核心团队对 CI 自身的反思：`Enable auto-merge` 失败会错误地判定整个验证 job 失败（draft PR、`allow_auto_merge` 关闭、瞬时 API 错误都可能导致误报）。这属于工程实践层面的精细化讨论，对关注 CI/CD 质量的开发者具有参考价值。

---

## Bug 与稳定性

按严重程度排列：

### 已修复

1. **[中等/安全] Telegram 配对码使用 `Math.random()`**
   配对码可预测性风险。**修复：** #3229 已合并，改用 CSPRNG 并将码空间从 4 位扩大。

2. **[中等] 镜像签名验证在生产环境被静默跳过**
   `AGENT_IMAGE_SIGNER_IDENTITY` / `_ISSUER` 变量不存在导致验证全程跳过、auto-merge 永不触发。**修复：** #3158 已合并。

3. **[低/中] Template-stamped group 生成 bare UUID**
   与 OneCLI 集成时触发拒绝。**状态：** Issue #3234 已关闭，修复已合入 v2.2.0。

4. **[低] 已存在 wiring 缺少 channel destinations**
   导致消息无法路由。**修复：** #3145 已合并（migration 021）。

5. **[低] Skill 移除文档错误指向已退役镜像**
   **修复：** #3230 已合并。

### 待处理

6. **[中] 未知发送者审批产生无界审批卡片**（#3235）
   webhook/bot 发消息 → 每次触发审批卡 → 无法合理批准 / 拒绝不持久。**尚无 fix PR。**

---

## 功能请求与路线图信号

| 功能/信号 | 来源 | 状态 | 说明 |
|---|---|---|---|
| **stdin JSON 输入模式** | PR #3218 | 待合并 | 为 host/container 的 `ncl` 客户端增加有界的 `--stdin-json` 参数接收方式，不改变现有请求框架和授权模型。查看：[PR #3218](https://github.com/nanocoai/nanoclaw/pull/3218) |
| **Hindsight 长期记忆集成** | PR #2420 | 待合并（已 3 个月） | 通过捆绑 MCP wrapper 将 NanoClaw agent groups 接入 Hindsight 记忆引擎。查看：[PR #2420](https://github.com/nanocoai/nanoclaw/pull/2420) |
| **未知斜杠命令回退为普通对话** | PR #2346 | 待合并（已 3 个月） | 当前未知命令被归类为 `passthrough`，导致响应被静默丢弃；应回退为 `category: 'none'`。查看：[PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346) |
| **per-server disabledTools** | PR #2624 | 已合并 ✅ | 已纳入主线，支持细粒度 MCP 工具控制 |
| **Agent 镜像自动审批（签名驱动）** | PR #3241 | 已合并 ✅ | 默认关闭，提供非伪造的审批替代方案 |

**路线图判断：** 镜像供应链安全已完成闭环；短期的下一步大概率是 agent image bump 的自动发布（#3240 的后续）；stdin JSON（#3218）被合入的可能性较高，因为其设计上完全向后兼容。Hindsight 集成等待已久，若模板插件化稳定后，可能获得重新评估。

---

## 用户反馈摘要

- **OneCLI 集成受挫（来自 #3234）：** 用户使用 `ncl groups create --template` 后，生成的 id 不带 `ag-` 前缀导致 OneCLI 直接拒绝。这反映了 **CLI 输出格式的隐式契约问题**，用户在跨工具集成时对 ID 格式有很强的一致性预期。
- **自动化场景下的审批疲劳（来自 #3235）：** 用户配置 `request_approval` 后，webhook 机器人产生大量无法处理的审批卡片。这暴露了 **"策略设计时未区分消息发送者类型（人 vs 自动化）"**，用户希望审批策略能针对 sender 类型差异化生效。
- **文档误导（来自 #3230 的修复背景）：** skill 移除指引指向已退役的 data/env mirror，用户按照文档操作会遇到死路。文档的持续维护是社区关注点。

---

## 待处理积压

以下 PR/Issue 长期未获合入，建议维护者关注：

1. **[PR #2420] Hindsight 长期记忆集成**（创建于 2026-05-11，已 3 个月）
   功能完整、自带 MCP wrapper，但长期搁置。若与当前插件化架构兼容，建议重新走查。查看：https://github.com/nanocoai/nanoclaw/pull/2420

2. **[PR #2346] 未知斜杠命令应回退为普通对话**（创建于 2026-05-08，已 3 个月）
   这是真实用户痛点（响应被静默丢弃），修复逻辑简单，风险低。查看：https://github.com/nanocoai/nanoclaw/pull/2346

3. **[PR #3218] stdin JSON 输入模式**（创建于 2026-08-09）
   等待合入中，设计保守、兼容性好，建议安排 review。查看：https://github.com/nanocoai/nanoclaw/pull/3218

4. **[PR #3243] auto-merge 不作为 verify 判定依据**（今日新开）
   核心团队 self-improvement，若合入将提升 CI 判定的准确性。查看：https://github.com/nanocoai/nanoclaw/pull/3243

---

*数据来源：NanoClaw GitHub 仓库（nanocoai/nanoclaw），统计窗口为 2026-08-13 至 2026-08-14。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-14

---

## 1. 今日速览

过去 24 小时项目保持高强度运转：**50 条 Issue 更新（新开/活跃 32 条，关闭 18 条）**、**50 条 PR 更新（待合并 24 条，已合并/关闭 26 条）**，并完成 v1.2.0-rc.3 验证与 1.2.0 稳定版晋升流程。核心事件是 **#7482 "Pluggable agent loops" 史诗进入执行阶段**——昨天一次性拆解出 20+ 个实施工作项（#7606-#7624），覆盖 egress 代理、外部 harness 执行器、能力 socket、政策记录等模块，标志着架构重构从设计讨论转入落地。与此同时，**性能工程成为另一主线**：4 个 perf 优化 PR（#7628-#7631）集中提交，配合 Tier 3 性能积压项（#7603-#7605），显示项目在功能扩张后开始系统性治理数据库写入放大问题。整体项目健康度良好，发布流程稳定，但需关注 3 个新报告的用户侧 bug（#7626/#7627/#7589）尚未有修复 PR。

---

## 2. 版本发布

### ironclaw-v1.2.0-rc.3 → 1.2.0 稳定版晋升

**最新 Release：** [ironclaw-v1.2.0-rc.3](https://github.com/nearai/ironclaw/releases)（2026-08-12 发布）

**修复内容：**
- 运行时容器镜像现在内置 `curl`，使 orchestrator 的容器健康检查得以执行。此前镜像未包含任何 HTTP 客户端，导致 orchestrator 以 `curl -fsS http://localhost:3000/` 探测 worker 时永远失败，容器永远不会被标记为健康——这是一个阻断生产部署的关键修复。

**晋升动态：** 发布 PR [#7625 chore(release): promote 1.2.0-rc.3 to 1.2.0](https://github.com/nearai/ironclaw/pull/7625) 已于昨日关闭，将完全验证的 rc.3 候选版本提升至稳定版 1.2.0，并将 RC1-RC3 的 changelog 合并到稳定版标题下。

**破坏性变更：** 无。
**迁移注意事项：** 无额外操作要求；镜像体积因新增 curl 略有增加。

---

## 3. 项目进展

昨日合并/关闭的 PR 覆盖**发布、核心功能、可靠性修复、架构铺垫、性能基准**五个方向，项目从"功能开发"明显转向"稳定化 + 性能治理"。

### 发布
- **[#7625](https://github.com/nearai/ironclaw/pull/7625)（已关闭）**：完成 1.2.0-rc.3 → 1.2.0 稳定版晋升，标志着 v1.2.0 版本线正式收官。

### 核心功能
- **[#7163 feat(documents)（已关闭，XL）](https://github.com/nearai/ironclaw/pull/7163)**：实现 docx/xlsx/pptx **结构化编辑**，支持从 HTML 渲染 PDF，并修复 #7109 引入的文本日志回归（此前文本工具为保护二进制文档而拒绝写入，但留下了用户需求不被满足的问题）。这补齐了承诺已久的"真正的文档往返能力"。

### 可靠性修复
- **[#7531 fix(loop): repeated-call detection advisory-only（已关闭，XL）](https://github.com/nearai/ironclaw/pull/7531)**：将重复调用检测从滑动窗口频率启发式改为"连续三次相同签名"的简单判断，重复警告只对模型可见，绝不因此截断工具调用或输出。降低了误伤合法循环的风险。
- **[#7579 fix(live-canary)（已关闭）](https://github.com/nearai/ironclaw/pull/7579)**：修复 QA 环境在 slack 连接时崩溃的问题（slack 新增 8 个标准操作后 seeded grant 未覆盖），并将 scrub 裁决输出到日志，让 canary 失败可诊断。
- **[#7590 fix(live-canary)（已关闭）](https://github.com/nearai/ironclaw/pull/7590)**：对齐 bundled-skill marker 的所有者与运行时 mint，修复 canary 中技能快照"marker failed verification"的误报。
- **[#7581 fix(extensions)（已关闭）](https://github.com/nearai/ironclaw/pull/7581)**：OAuth 发现后刷新 bundled hosted-MCP 目录投影，修复扩展在认证后仍显示 `setup_needed` 的问题；同时在重启时保留同版本已发现工具。

### 架构铺垫/测试
- **[#7576 test(kernel)（已关闭）](https://github.com/nearai/ironclaw/pull/7576)**：为 AgentExecution seam 钉住 admission 契约（纯测试 PR），为 #7562 设计的 Phase 2 cutover 提供回归保护。
- **[#7376 ci(check-guidance)（已关闭）](https://github.com/nearai/ironclaw/pull/7376)**：将文档路径引用门禁扩展至 `docs/` 全表面（Mintlify 页面、中文镜像、内部契约语料库），此前公开文档树有零路径检查。

### 性能基准（新增 PR）
- **[#7630 perf(stress)（OPEN，XL）](https://github.com/nearai/ironclaw/pull/7630)**：新增固定 `db-write-measurement` stress 预设，测量单用户 turn（10 次工具调用）的 Postgres 写入量，按表和查询 ID 分组输出 before/after/delta 快照——为 Tier 3 优化提供量化基线。

---

## 4. 社区热点

### 热点 #1：Epic #7482 "Pluggable agent loops" — 项目架构焦点
- **[#7482（OPEN，6 条评论）](https://github.com/nearai/ironclaw/issues/7482)**：昨日新增 20+ 子 issue，全部由维护者 serrrfirat 创建，将史诗拆解为可执行的 WS1-WS6 工作流。核心思路：IronClaw 退化为"kernel"（调度、租户、能力膜、密钥中介、出口边界、持久审计），**不再自带 agent loop 和 per-integration 工具代码**，改为支持 claude-code/pi/codex 等外部 harness。

**背后诉求：** 这是对"单一内置循环无法扩展"这一根本架构问题的回应。绑定决策集中在 #7482 的 [comment 1](https://github.com/nearai/ironclaw/issues/7482#issuecomment-5285616432) 和 [comment 2](https://github.com/nearai/ironclaw/issues/7482#issuecomment-5285890641)，包含 7 条不可重新讨论的 binding decisions。**这说明项目正从"功能加量"转向"内核瘦身 + 生态开放"。**

### 热点 #2：#6257 PDF MIME 类型错误 — 已解决
- **[#6257（CLOSED，4 条评论）](https://github.com/nearai/ironclaw/issues/6257)**：发送/生成 PDF 时报 `Invalid value (attachments.mime_type)`，由 Slack #x-ai-product-feedback 渠道上报。该 issue 昨日关闭，表明已修复或确定解决方案。

### 热点 #3：用户侧真实痛点
- **[#7185 记忆跨对话不可靠（OPEN，2 条评论）](https://github.com/nearai/ironclaw/issues/7185)**：2026-07-23 Champions 周会中多位 tester 独立观察到前序对话上下文无法在后续对话中可靠召回，涉及法律、个人信息等场景。诉求直指**长期记忆机制的核心体验**。
- **[#2117 ironclaw-bridge 本地文件/MCP 桥接（OPEN，2 条评论，1👍）](https://github.com/nearai/ironclaw/issues/2117)**：云托管部署中用户无法访问笔记本本地文件（Obsidian vault、本地项目目录），要求架设本地桥接守护进程。这是 4 月提出的老 issue，至今未关闭，社区关注度在积累。

---

## 5. Bug 与稳定性

按严重程度排列（🔥 = 无修复 PR，⚠️ = 已有修复）：

### 高严重度
1. **🔥 [#7589 NEAR AI Cloud Sonnet-5 返回 500 错误](https://github.com/nearai/ironclaw/issues/7589)** — 用户报告 Sonnet-5 在 NEAR AI Cloud 上持续三天 500 错误，关联 nearai/cloud-api#920。已持续 72 小时，**尚无修复 PR**，属服务可用性问题，需优先排查。

2. **🔥 [#7626 自定义 MCP 浏览器/邮箱认证卡住](https://github.com/nearai/ironclaw/issues/7626)** — 用户连接需要浏览器/邮箱验证的 MCP 时，Hermes 弹出授权但 IronClaw 卡死。MKT1 等供应商要求"邮箱+浏览器"双验证，当前 harness 无法处理这种流程。**尚无修复 PR**。

### 中严重度
3. **🔥 [#7627 GitHub 扩展在无效凭据后显示"已连接"](https://github.com/nearai/ironclaw/issues/7627)** — 用户输入任意凭据（如 "1"）扩展即显示已连接，随后提示认证失败但状态未回退。这是**误导性 UI 状态**，影响信任。**尚无修复 PR**（#7581 修复的是另一个 MCP 状态刷新问题，与此不同）。

4. **🔥 [#7185 记忆跨对话不可靠](https://github.com/nearai/ironclaw/issues/7185)** — 多个独立 tester 确认上下文丢失，**无修复 PR**。这可能是 Reborn 架构中记忆子系统尚未达到生产标准的表现。

### 低严重度 / 已修复
5. **⚠️ [#6257 PDF attachments.mime_type 错误](https://github.com/nearai/ironclaw/issues/6257)** — 已关闭（修复）。
6. **⚠️ #7109 文本工具拒绝写入二进制文档的回归** — 由 [#7163](https://github.com/nearai/ironclaw/pull/7163)（已关闭）修复，文本工具恢复处理文档请求并通过 HTML 渲染 PDF。
7. **✅ Live-canary 修复** — slack connect 崩溃（#7579）和 marker 误报（#7590）均已修复。

---

## 6. 功能请求与路线图信号

### 明确的路线图（#7482 史诗驱动）
以下子 issue 全部在 8 月 13 日创建，已形成完整的执行阶梯：

| 工作项 | Issue | 状态 |
|---|---|---|
| M0: iron-proxy placeholder-swap spike | [#7606](https://github.com/nearai/ironclaw/issues/7606) | CLOSED |
| 沙箱 egress 网络 + CA 分发 | [#7607](https://github.com/nearai/ironclaw/issues/7607) | CLOSED |
| 代理配置渲染器（per-run grants） | [#7608](https://github.com/nearai/ironclaw/issues/7608) | CLOSED |
| egress 审计桥接 | [#7609](https://github.com/nearai/ironclaw/issues/7609) | CLOSED |
| 模型供应商透传（替换 WS2 网关） | [#7610](https://github.com/nearai/ironclaw/issues/7610) | CLOSED |
| HarnessDriver v1 契约 | [#7611](https://github.com/nearai/ironclaw/issues/7611) | CLOSED |
| HarnessLoopExecutor | [#7612](https://github.com/nearai/ironclaw/issues/7612) | CLOSED |
| Phase-0 适配器（claude-code、pi、codex） | [#7613](https://github.com/nearai/ironclaw/issues/7613) | CLOSED |
| 能力 socket | [#7614](https://github.com/nearai/ironclaw/issues/7614) | CLOSED |
| ic CLI + MCP 聚合投影 | [#7615](https://github.com/nearai/ironclaw/issues/7615) | CLOSED |
| 固定 agent 镜像 + 构建流水线 | [#7616](https://github.com/nearai/ironclaw/issues/7616) | CLOSED |
| 集成政策记录（30 行配置替代 WASM） | [#7617](https://github.com/nearai/ironclaw/issues/7617) | CLOSED |
| 每线程 workspace 挂载 + GC | [#7618](https://github.com/nearai/ironclaw/issues/7618) | CLOSED |
| 一致性测试套件 | [#7619](https://github.com/nearai/ironclaw/issues/7619) | CLOSED |
| 档案路由 + shadow 运行 + 发布阶梯 | [#7620](https://github.com/nearai/ironclaw/issues/7620) | CLOSED |
| **v0: ACP harness executor（当前唯一可做项）** | **[#7624](https://github.com/nearai/ironclaw/issues/7624)** | **OPEN** |
| egress edge 合并实施 | [#7621](https://github.com/nearai/ironclaw/issues/7621) | OPEN |
| 外部 harness 执行机制 | [#7622](https://github.com/nearai/ironclaw/issues/7622) | OPEN |
| 能力访问与发布 | [#7623](https://github.com/nearai/ironclaw/issues/7623) | OPEN |

**信号解读：** #7624 明确标注"唯一现在要构建的工作项"，其余合并 issue 是延迟阶梯——**ACP executor（claude-code 作为 loop）是下一版本的最大候选功能**。已有外部贡献者提交的 [#7513 feat(cli): ACP serve 命令（OPEN）](https://github.com/nearai/ironclaw/pull/7513) 与此方向一致，很可能被吸收。

### 用户驱动的功能请求
- **[#7580 在 WebUI 暴露 Reborn 版本号（OPEN）](https://github.com/nearai/ironclaw/issues/7580)** — 用户想知道如何从 WebUI 查看版本，当前不可发现。小改动，大概率进入下个 patch 版本。
- **[#2117 ironclaw-bridge 本地文件/MCP 桥接](https://github.com/nearai/ironclaw/issues/2117)** — 已列入 [#7482](https://github.com/nearai/ironclaw/issues/7482) 的 [comment 1](https://github.com/nearai/ironclaw/issues/7482#issuecomment-5285616432) 决策 3（模型透传）和 WS5 相关设计中被间接覆盖，但尚无独立实施计划。

### 性能优化路线（#7591 史诗）
- [#7603 Batch BeforeModel checkpoints per-N iterations](https://github.com/nearai/ironclaw/issues/7603)（预计 −14 rows/turn）
- [#7604 折叠配对行写入（4 个独立优化）](https://github.com/nearai/ironclaw/issues/7604)
- [#7605 将消息查找索引兄弟行折叠进消息行](https://github.com/nearai/ironclaw/issues/7605)（预计每消息节省 1-3 个 entries 行）
- 配套 PR 已提交：[#7628](https://github.com/nearai/ironclaw/pull/7628)（heartbeat journal churn）、[#7629](https://github.com/nearai/ironclaw/pull/7629)（trigger/outbound 写入）、[#7631](https://github.com/nearai/ironclaw/pull/7631)（milestone 写入合并）

---

## 7. 用户反馈摘要

从昨日 Issues 和相关线索中提炼的真实用户声音：

| 用户场景 | 反馈要点 | 来源 |
|---|---|---|
| **版本可见性** | "怎么看 IronClaw Reborn 版本？" — WebUI 不显示或不明显 | [#7580](https://github.com/nearai/ironclaw/issues/7580) |
| **MCP 认证流程** | 需要浏览器/邮箱双重验证的 MCP 连接时卡死，无法完成 MKT1 等付费服务接入 | [#7626](https://github.com/nearai/ironclaw/issues/7626) |
| **扩展状态可信度** | GitHub 扩展在输入无效凭据后仍显示"已连接"，实际不可用——状态机制误导用户 | [#7627](https://github.com/nearai/ironclaw/issues/7627) |
| **模型服务稳定性** | Sonnet-5 连续三天 500 错误，影响生产使用 | [#7589](https://github.com/nearai/ironclaw/issues/7589) |
| **长期记忆** | "agent 无法访问之前对话建立的信息" — 跨对话记忆不可靠，法律等场景受挫（Champions 周会多人反馈） | [#7185](https://github.com/nearai/ironclaw/issues/7185) |
| **本地资源访问** | 云部署后无法访问 Obsidian vault、本地项目目录，隧道方案不满足需求 | [#2117](https://github.com/nearai/ironclaw/issues/2117) |
| **文档处理** | PDF 发送/生成报 MIME 错误（已修复）；此前文本工具拒写二进制文档但未提供替代方案（已由 #7163 解决） | [#6257](https://github.com/nearai/ironclaw/issues/6257)、[#7163](https://github.com/nearai/ironclaw/pull/7163) |

**共性洞察：** 用户反馈集中在 **"状态可见性"**（版本、扩展连接状态）和 **"流程中断"**（认证卡死、服务 500），说明当前版本在**错误反馈路径**上仍有明显短板——系统没有在失败时给出可操作的指引。

---

## 8. 待处理积压

### 长期未响应的关键 Issue
1. **[#2117 ironclaw-bridge 本地文件/MCP 桥接（2026-04-07 创建，131 天）](https://github.com/nearai/ironclaw/issues/2117)** — 创建至今 4 个多月仍 OPEN，仅 2 条评论。这是云部署用户的核心痛点，与 #7482 的 egress/能力 socket 设计有交集，建议在 epic 执行中明确吸收或给出时间表。

2. **[#7185 记忆跨对话不可靠（2026-08-04 创建，10 天）](https://github.com/nearai/ironclaw/issues/7185)** — 由多位 Champions 独立验证的核心体验缺陷，当前仍无修复或计划。建议至少给出诊断结论或 workaround。

### 待合并的依赖和安全更新
3. **[#7020 tokio-tungstenite 0.29→0.30（2026-08-02 创建，12 天待合并）](https://github.com/nearai/ironclaw/pull/7020)** — 依赖大版本升级，涉及 WebSocket 栈（sandbox egress 相关），长时间未合并可能积累冲突。
4. **[#7262 wasm 组更新: wit-component/wit-parser（2026-08-05 创建，9 天）](https://github.com/nearai/ironclaw/pull/7262)** — WASM 工具链更新，被 #7482 的 WASM 相关设计直接影响，建议优先合入。
5. **[#7378 doc-fact 契约测试（2026-08-07 创建，7 天）](https://github.com/nearai/ironclaw/pull/7378)** — doc-truth PR 3/5，文档与行为一致性保障，等待 review。

### 需维护者关注的外部贡献
6. **[#7513 ACP serve 命令（2026-08-11 创建，新贡献者 Kampouse）](https://github.com/nearai/ironclaw/pull/7513)** — 外部贡献者实现 ACP stdio 传输 + 流式 + 取消支持，与 #7482/#7624 的 v0 目标高度一致。如果设计方向正确，应尽快 review 并引导与官方 executor 对齐，避免重复劳动。

---

*本日报基于 2026-08-14 日 GitHub 数据快照生成，覆盖过去 24 小时（2026-08-13 至 2026-08-14）的项目动态。所有链接均指向 nearai/ironclaw 仓库对应 Issue/PR。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI 项目动态日报 — 2026-08-14

### 1. 今日速览
过去 24 小时内，项目 PR 活动频繁，共有 11 条 PR 更新，其中 6 条已合并/关闭，5 条待合并，主要集中在渲染层 UI 重构与样式统一、企业版功能合入、以及若干定时任务相关问题修复。Issue 侧仅 1 条更新（#1162，为 stale 测试补充 Issue 的评论活动），新开 Issue 为 0。无新版本发布。整体看，开发迭代节奏稳健，当前处于 UI 重构消化与稳定性修补阶段，社区反馈相对平静。

---

### 2. 版本发布
今日无新版本发布。

---

### 3. 项目进展
今日合入/关闭的 6 个 PR 中，有 4 个为功能或重构类 PR，2 个为修复类 PR，说明项目在主功能推进上保持积极态势：

- **#2488 Refactor/cowork btw and management UI** — 对 cowork 管理界面进行重构，属于 UI 层面的体验升级。
  [netease-youdao/LobsterAI PR #2488](https://github.com/netease-youdao/LobsterAI/pull/2488)

- **#2487 refactor(skills): merge skills and mcp views into unified skills-and-connectors view** — 将 Skills 与 MCP 视图合并为统一的技能与连接器管理视图，减少界面层级，提升管理效率。
  [netease-youdao/LobsterAI PR #2487](https://github.com/netease-youdao/LobsterAI/pull/2487)

- **#2486 refactor(mcp): unify MCP card/detail UI with kits and skills styling** — 统一 MCP 与 Kits/Skills 的卡片与详情视觉样式，并重构 MCP 管理器的列表/详情流程。与 #2487 配合推进管理界面的整体一致性。
  [netease-youdao/LobsterAI PR #2486](https://github.com/netease-youdao/LobsterAI/pull/2486)

- **#2485 feat(activity): support evergreen daily check-in** — 将签到活动从一次性版本调整为 evergreen 常驻形态，复用既有服务端与管理端能力，并补充活动状态自动刷新、账户菜单积分跳转优化。
  [netease-youdao/LobsterAI PR #2485](https://github.com/netease-youdao/LobsterAI/pull/2485)

- **#2484 Feat/enterprise edition** — 企业版功能合入（合并至 `main`），未涉及破坏性变更，但从模板完整性看仍处于早期整理状态。
  [netease-youdao/LobsterAI PR #2484](https://github.com/netease-youdao/LobsterAI/pull/2484)

- **#1232 fix(scheduledTask): 修复定时任务首次执行结果不推送到 UI 的问题** — 修复了 cronJobService 中 `pollOnce()` 逻辑因 `previousRunAtMs` 初始为 0 导致首次执行结果不推送的缺陷。
  [netease-youdao/LobsterAI PR #1232](https://github.com/netease-youdao/LobsterAI/pull/1232)

---

### 4. 社区热点
今日唯一活跃的 Issue 为：

- **#1162 [OPEN] [stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试** — 作者 [MaoQianTu](https://github.com/MaoQianTu)，创建于 2026-03-31，更新于 2026-08-13，有 1 条评论。
  [netease-youdao/LobsterAI Issue #1162](https://github.com/netease-youdao/LobsterAI/issues/1162)

该 Issue 是一个已存在近半年但仍在补充测试的长期任务，核心诉求是为零测试覆盖的核心记忆管理模块补上单元测试（附 PR #1165）。今日评论活动可能与 PR 在 8/13 的更新时间相关，反映出维护者近期开始集中清理该批测试补充任务的迹象。

---

### 5. Bug 与稳定性
今日涉及 Bug 修复及稳定性相关 PR 共 2 条：

| 严重程度 | 描述 | 状态 | 相关 PR |
|---|---|---|---|
| 中 | 定时任务首次执行结果不推送到 UI，用户需第二次执行才能看到结果，影响首次使用体验 | 已修复并关闭 → #1232 | [PR #1232](https://github.com/netease-youdao/LobsterAI/pull/1232) |
| 中 | 定时任务“立即运行”点击后无反馈，任务状态最长 15 秒轮询延迟，易导致重复点击 | 修复已提交，待合入 → #1163（打开中） | [PR #1163](https://github.com/netease-youdao/LobsterAI/pull/1163) |

其余 9 条 PR 中未发现直接关联 Bug 报告的条目。

---

### 6. 功能请求与路线图信号
今日无新用户功能请求 Issue，但以下 PR 对路线图信号有显著参考意义：

- **PR #2485（evergreen daily check-in）** — 将签到活动调整为常驻功能，含服务端与管理端能力复用，说明运营向功能正在向长期化演进。
- **PR #2483 fix(openclaw): key skill entries by frontmatter name** — 修正 OpenClaw `skills.entries` 的 key 使用策略，解决 UI 开关在目录名与 frontmatter name 不一致时静默失效的问题，属于 OpenClaw 生态集成完善的一部分。
- **PR #2487 / #2486（管理界面统一）** — Skills、MCP、Kits 三种管理视图的 UI 统一，属于持续打磨管理交互体验的整合性动作。

---

### 7. 用户反馈摘要
今日可从 Issue/PR 评论中提炼出的用户反馈有限（仅 #1162 有 1 条评论，其余条目评论数据未标注），但 PR 描述中反映了明确痛点：

- **定时任务 UI 交互缺失** — #1163 中指出用户点击“立即运行”后无视觉反馈（缺少 loading 状态与成功提示），且 15 秒轮询延长期导致用户误判操作失败而重复点击。属于高频操作路径上的体验短板。
- **OpenClaw 技能开关失效** — #2483 指出技能目录名与 frontmatter name 不一致时，用户通过 UI 做的启停操作会静默无效，本质上是配置不一致导致的状态同步问题。

---

### 8. 待处理积压
以下 PR 创建于 2026-03-31 或更早，距今已超 4 个月仍处于打开状态，且均被标记为 stale，建议维护者关注处理：

- **#1156 [stale] 为 commandSafety 和 coworkMemoryJudge 补充 Vitest 单元测试** — 为危险命令检测模块（`rm -rf`、`git push --force` 等误判防护）和记忆质量评分门卫补测试，对系统安全性有直接价值。
  [netease-youdao/LobsterAI PR #1156](https://github.com/netease-youdao/LobsterAI/pull/1156)

- **#1163 [stale] fix(定时任务): 补全“立即运行”交互反馈** — 用户体验影响明确（长期无反馈 + 15 秒轮询），建议优先排期合入。
  [netease-youdao/LobsterAI PR #1163](https://github.com/netease-youdao/LobsterAI/pull/1163)

- **#1165 [stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试** — 与 Issue #1162 对应，共 75 个测试用例，覆盖此前零测试的核心模块。
  [netease-youdao/LobsterAI PR #1165](https://github.com/netease-youdao/LobsterAI/pull/1165)

- **#1166 [stale] fix(agent): prevent duplicate custom agent names** — 防止用户创建同名自定义 Agent，属于基础数据完整性类修复，长期未合并可能影响后续 Agent 管理逻辑的稳定性。
  [netease-youdao/LobsterAI PR #1166](https://github.com/netease-youdao/LobsterAI/pull/1166)

**整体项目健康度评估**：当前合并节奏正常，UI 重构主线在压缩推进，历史 stale PR 是主要技术债来源。无明显回归风险，项目整体处于良性迭代状态。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-14

## 1. 今日速览

过去 24 小时 Moltis 仓库活跃度中等偏下：新增 1 条 Issue（测试稳定性问题）、4 条待合并 PR，无新版本发布。值得关注的是，4 条 PR 中有 1 条功能性大 PR（#1190，新增 CalDAV 与消息历史连接器），其余 3 条均为修复类 PR（macOS 脚本兼容、Go 模块路径迁移），且无一条被合并/关闭。Issue 侧暂无用户功能性反馈，整体处于「功能待并、修复待审」的稳定推进期，未见高危 Blocking 问题。

---

## 3. 项目进展

**今日无 PR 被合并或关闭。** 4 条 PR 均处于待合并状态，其中有 1 条功能性 PR 和 3 条修复类 PR：

| PR | 类型 | 说明 |
|---|---|---|
| [#1190 Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190) | 功能 | 新增连接器持久化、原子快照、调度、投影与本地全文搜索；支持只读 CalDAV 数据集以及 Slack/Discord/Matrix/Teams 消息历史数据集。这是近期较大的功能扩展，若合并将显著提升数据接入能力。 |
| [#1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194) | 修复 | 修复 `just local-validate-full` 在 macOS 自带 bash 3.2 下的 `unbound variable` 崩溃。 |
| [#1192 fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192) | 修复 | 修复 `wacrawl` skill 的 Go install 路径（仓库迁移至 openclaw org）导致的安装失败。 |
| [#1191 fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191) | 修复 | 修复 `moltis sandbox build` 因 gogcli 模块路径迁移导致的构建失败。 |

**进展判断：** 核心功能 (PR #1190) 尚未进入合并流程，项目整体今日未有代码变更合入主干，推进速度与活跃度偏温和。三条修复 PR 均为工具链/环境适配问题，属于「小修小补」性质，不涉及架构级变更。

---

## 4. 社区热点

今日无高评论量 Issue/PR（所有 Issue/PR 评论数均为 0 或无公开评论数据），社区公开讨论极低。

相对关注度较高的条目为 **[PR #1190 - Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190)**，原因是：
- 涉及多个新数据集类型（CalDAV、Slack、Discord、Matrix、Teams）
- 引入了连接器持久化、快照、调度、全文搜索等较重的架构能力
- 作者 `penso` 与其余贡献者非同一人，属于不同的贡献来源

虽无评论互动，但该 PR 的功能覆盖面在近期提交中最大，建议维护者优先 review 以确保后续合入顺畅。

---

## 5. Bug 与稳定性

今日暴露 1 个测试稳定性问题 + 3 个修复类 PR，按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 中 | [#1193 Flaky test: push fanout timeout assertion races under full-suite load](https://github.com/moltis-org/moltis/issues/1193) | `moltis-gateway` 的 `fanout_is_bounded_and_times_out_a_hung_endpoint` 测试在全量测试套件下间歇性失败，10 核 macOS 上 3 次全量运行中失败 2 次。可能涉及超时断言的竞态条件。 | 待处理，无关联 fix PR |
| 中 | [#1191 fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191) | `moltis sandbox build` 在所有预构建镜像上失败，Go 模块路径失效导致构建中断。已有修复 PR 待合并。 | 有 fix PR |
| 低 | [#1192 fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192) | `wacrawl` skill 的安装元数据指向旧仓库路径，安装回退机制失效。已有修复 PR。 | 有 fix PR |
| 低 | [#1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194) | macOS 默认 bash 3.2 下脚本因数组展开未受保护而崩溃，影响本地验证流程。 | 有 fix PR |

**稳定性评估：** 无紧急致命 bug。最值得关注的是 #1193 的 flaky test，可能掩盖真实的超时/并发问题，建议纳入下一轮测试稳定性排查。

---

## 6. 功能请求与路线图信号

今日无新功能请求类 Issue。PR 侧暗示的方向：

- **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)** 引入的连接器持久化、投影与全文搜索能力，若被接受，将明显强化 Moltis 作为个人 AI 助手的「长时记忆」与「外部数据接入」能力，预计会成为下一版本的核心特性之一。
- 没有其他新功能信号，路线图主要增量来自该条 PR。

---

## 7. 用户反馈摘要

今日所有 Issue/PR 无公开评论，无法提取直接的用户反馈。仅能从提交内容推断：

- **痛点：** macOS 环境下开发工具链不友好（bash 3.2 兼容问题）；项目依赖的外部 Go 模块迁移（steipete → openclaw org）对下游构建产生了连锁影响，说明 Moltis 对上游依赖较为敏感。
- **贡献者行为：** `Lstarsky0` 一人提交了 3 条修复 PR + 1 条 Issue，覆盖脚本、skill 安装、sandbox 构建、测试稳定性，属于积极的外部贡献者，项目维护者可考虑主动引导其参与更深度的协作。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 已开放时长 | 建议 |
|---|---|---|---|---|
| PR | [#1190](https://github.com/moltis-org/moltis/pull/1190) | Add durable CalDAV and channel history connectors | 3 天 (08-11 创建) | 重要功能性 PR，已 3 天未合入且无评论，建议维护者尽快安排 review，避免与后续 PR 产生冲突。 |
| Issue | [#1193](https://github.com/moltis-org/moltis/issues/1193) | Flaky test: push fanout timeout assertion races under full-suite load | 1 天 (08-13 创建) | 间歇性测试失败，暂无认领，建议标记 `good first issue` 或 `area/test` 以便社区认领。 |

其余三条修复类 PR（#1191/#1192/#1194）均创建于 08-13，处于正常 review 等待期，不视为积压。

---

*报告生成时间：2026-08-14 | 数据来源：Moltis GitHub 仓库*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-14

## 1. 今日速览

过去24小时内，CoPaw/QwenPaw 项目保持高度活跃：Issues 更新 42 条（新开/活跃 25 条，关闭 17 条），PR 更新 50 条（待合并 31 条，合并/关闭 19 条），并正式发布 v2.1.0 版本（含 QwenPaw OS Shell 特性）及一个修复性 beta 版本。社区讨论集中于任务执行稳定性、模型自主停顿、平台安全等问题，同时安全类 Issue 引发关注。整体来看，项目迭代节奏快，主版本交付与质量加固并行推进，社区响应及时，项目健康度良好。

## 2. 版本发布

### v2.1.0（正式版）
- **核心新增**：QwenPaw OS Shell —— 支持在可移动、可调整大小的窗口中打开应用，包含启动器、任务栏、通知系统与已保存布局功能（[#6645](https://github.com/agentscope-ai/QwenPaw/pull/6645)）。
- **架构变化**：已安装应用与市场应用现在在 App Center 中共享同一目录，统一了应用管理体验。
- **迁移注意事项**：若从 2.1.0-beta 系列升级，请确认自定义插件与系统自带应用的兼容性；本次为正式版本，建议更新前备份工作区与聊天历史。

### v2.1.0-beta.5（预发布修复版）
- 修复聊天模块对 dict 类型模型响应的处理（[#6813](https://github.com/agentscope-ai/QwenPaw/pull/6816)）。
- 简化长期记忆引导逻辑，减少配置复杂度（[#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942)）。
- 网站文档中 Files 工作区相关内容更新。

## 3. 项目进展

今日共有 19 个 PR 被合并或关闭，主要集中在稳定性修复与功能增强：

- **Auto-Dream 集成韧性增强**（[#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884)）：对 LLM 结构化输出进行容错处理，单个无效 schema 不再导致整个任务失败，提升记忆系统鲁棒性。
- **渠道依赖按需安装**（[#6387](https://github.com/agentscope-ai/QwenPaw/pull/6387)）：将 Channel 特定 SDK 移出默认依赖集，减小安装体积，同时 Console UI 会在缺失时友好提示，提升渠道可维护性（已合并）。
- **任务模式服务端强制 max_iterations**（[#6652](https://github.com/agentscope-ai/QwenPaw/pull/6652)）：修复控制器 LLM 可无限派发子 agent 的问题，避免因未受控迭代导致账户余额耗尽（已合并）。
- **聊天历史分页与 GZip 压缩**（[#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636)）：解决长聊天（1MB+）接口响应超时 30s 问题，大幅提升慢网络下的加载性能（已合并）。
- **日记页面日期分组修复**（[#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883)）：子文件夹内笔记被错误分组的缺陷已修复关闭。
- **Prompts 误导性表述修正**（[#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)）：文档/提示词中关于 dream 自动同步 MEMORY.md 的功能描述被确认未实现，已修正以避免误导。

整体来看，项目在会话管理、记忆系统、渠道工程化与性能层面均有实质推进。

## 4. 社区热点

- **[#6921 任务执行中无提示停顿（6 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/6921)**：用户反馈模型在多步任务中经常给出“Let me do all three”这类规划后即停止，必须由用户说“继续”才继续执行。评论集中反映该类行为在 v2.1.0b2 中高频出现，已影响实际任务连续性与无人值守体验。该 Issue 仍开放，是当前最核心的体验痛点。

- **[#6973 QwenPaw Creator 能否支持阿里云百炼 token plan（5 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/6973)**：用户询问是否可接入阿里云百炼的 token 计费方案。该需求代表国内开发者对低成本、平台化模型接入的强诉求，目前处于提问状态，暂无明确 roadmap 回应。

- **[#6811 OpenAI Responses 续写摘要忽略 disable_thinking（5 条评论，已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6811)**：上下文滚动清理时生成续写摘要会阻塞主对话，且 60 秒取消被误报为畸形输出。该问题已关闭，说明有修复或规避方案。

- **[#6916 插件可静默创建 cron 任务并注入消息（2 条评论，安全类）](https://github.com/agentscope-ai/QwenPaw/issues/6916)**：安全研究员指出已安装插件可在无用户确认情况下持久化地向用户对话注入消息并执行定时动作。社区对权限模型缺口表示关注，该 Issue 仍开放。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 说明 | 是否有 Fix PR |
|---|---|---|---|---|
| 紧急（安全） | [#6992 / #6993 端口暴露、API 无鉴权、恶意插件注入](https://github.com/agentscope-ai/QwenPaw/issues/6993) | 已关闭 | 用户报告 0.0.0.0 暴露 8088 端口、插件安装 API 无鉴权等架构级安全问题，含详细事件报告 PDF。已关闭，可能是重复报告或被判定无效；但该方向需持续关注 | 未知 |
| 高 | [#6921 多步任务规划后自行停止](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 开放 | 频繁出现，影响多步任务正常执行 | 暂无 |
| 高 | [#7008 Anthropic 模型误审核“敏感图片”导致会话中断](https://github.com/agentscope-ai/QwenPaw/issues/7008) | 开放 | 历史无违规图片被判为敏感（错误码 1026），长会话被阻断 | 暂无 |
| 中 | [#6951 Scroll 压缩后聊天记录从 UI 消失](https://github.com/agentscope-ai/QwenPaw/issues/6951) | 开放 | `/compact` 后仅显示内部 eviction index，用户原始记录不可见，破坏完整 transcript 体验 | 暂无 |
| 中 | [#7007 Windows Desktop TUI 启动失败（transport: Connection closed）](https://github.com/agentscope-ai/QwenPaw/issues/7007) | 开放 | 2.1.0 中 qwenpaw.exe 拒绝 `-m qwenpaw acp` 参数，Textual UI 无法启动会话 | 暂无 |
| 中 | [#6955 概率性启动崩溃（Windows, pip 安装）](https://github.com/agentscope-ai/QwenPaw/issues/6955) | 开放 | v2.0.1 在 Windows 上概率性崩溃退出 | 暂无 |
| 低 | [#7006 语言选项列表不一致](https://github.com/agentscope-ai/QwenPaw/issues/7006) | 开放 | 右上角语言下拉与左下角设置齿轮中语言列表不一致（UI 小 bug） | 暂无 |
| 低 | [#7005 启用 Shabox 导致 UV 无法写入缓存](https://github.com/agentscope-ai/QwenPaw/issues/7005) | 开放 | 用户可通过 policy.yaml 添加 `Write(~/.cache/uv/**)` 规避 | 暂无 |

## 6. 功能请求与路线图信号

- **服务器端代理客户端（轻量瘦客户端）**（[#7002](https://github.com/agentscope-ai/QwenPaw/issues/7002)）：用户建议增加服务器部署版代理客户端，使本地电脑可远程连接服务器端的 QwenPaw agent，同时保留控制本地桌面设备的能力，解决桌面端笨重与数据不同步问题。若采纳，将大幅提升部署架构灵活性。

- **聊天界面独立嵌入与 session 精确筛选**（[#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970)）：用户提出三个需求——① chat 页面可脱离侧边栏/头部栏单独打开；② URL 带 apikey 避免权限验证；③ session 列表支持日期和 sessionId 条件查询。其中“可嵌入 chat 子页面”与当前 Console 架构方向一致，且有 [#7004](https://github.com/agentscope-ai/QwenPaw/pull/7004)（spawn 父子链路持久化）等 PR 显示 Console 能力在快速增强，此需求有可能被纳入后续版本。

- **向 shell 子进程注入 QWENPAW_CHANNEL 环境变量**（[#6995](https://github.com/agentscope-ai/QwenPaw/issues/6995)）：实现成本低，官方已通过 ContextVar 追踪当前 channel，仅需在 `execute_shell_command` 时写入环境变量。此类小而实用的功能有较大可能被快速接受。

- **跨 agent 导入工具**（[#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960)）：来自社区贡献的 PR，支持从 Codex 和 Qoder 导入指令、设置、技能、插件等项目内容。如果合并，将使 QwenPaw 成为更易迁移的 agent 平台，目前处于开放状态，值得关注是否进入主线。

- **[ViBo: 记忆 token 压缩方案（97.5% 节省）](https://github.com/agentscope-ai/QwenPaw/issues/7003)**：外部提案，意在通过加密存储和选择性召回减少每次请求的全部记忆发送开销。该方向与项目长期记忆持续迭代的重合度高，可能被讨论为长期优化选项。

## 7. 用户反馈摘要

- **任务执行自主性不足（高频痛点）**：多个用户反馈模型在输出“接下来做 X、Y、Z”后不自动执行，需要用户干预。这反映出模型 agentic 能力与任务完成率的现实差距，特别是中文场景下多步任务执行。
- **安全焦虑上升**：除高危漏洞报告外，#6916 插件权限模型问题也引发讨论。用户希望插件安装与运行有更明确的授权边界，而非静默获得持久权限。
- **杀软误报干扰**（[#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)）：用户反映 QwenPaw 在执行任务时被 Windows 杀软拦截甚至强制关闭，相比同类产品 WorkBuddy 频繁。可能与代码签名、行为特征有关，需要工程侧排查。
- **闲置卡死**（[#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780)）：2.0.1 版本在空闲几十小时后进程卡死，只能强制重启，影响长期无人值守运行的可靠性。
- **对新特性反馈积极**：用户对 OS Shell 窗口化应用、导入功能、会话级多项目目录（[#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)）表示期待，认为方向正确。

## 8. 待处理积压

以下为长期未关闭/未响应的重要项，建议维护者关注：

- **PR [#6302 统一 provider 发现、模型元数据、路由与 agent 控制](https://github.com/agentscope-ai/QwenPaw/pull/6302)**：创建于 7 月 21 日，覆盖模型路由与 fallback 等核心能力，已近一月仍处于开放状态。该 PR 若合入将显著改善自定义 provider 体验，建议加速评审。
- **Issue [#6047 升级后新聊天重开旧会话](https://github.com/agentscope-ai/QwenPaw/issues/6047)**：7 月 13 日提交，涉及升级后 chats.json 排序与 session 索引不同步，对升级用户影响大，已关闭但值得确认修复方案完整落地。
- **Issue [#6100 升级后工作区丢失](https://github.com/agentscope-ai/QwenPaw/issues/6100)**：7 月 14 日报道，1.1.9 → 2.0.0 升级导致内置 agent 配置被覆盖，影响面为升级用户，需确保后续版本不再出现。
- **Issue [#6283 自动附加当前时间到会话上下文](https://github.com/agentscope-ai/QwenPaw/issues/6283)**：7 月 20 日提交，解决跨天旧会话中模型混淆日期的问题；实现成本低，建议合并到后续上下文优化中。
- **Issue [#6326 明确 node.js 版本要求](https://github.com/agentscope-ai/QwenPaw/issues/6326)**：7 月 22 日提交，属于文档完善项，建议在 Console 构建指南中补充具体版本范围。

---

**报告时间**：2026-08-14
**数据范围**：2026-08-13 至 2026-08-14（GitHub 活动时间）
**数据来源**：agentscope-ai/QwenPaw 公开仓库 Issues / PRs / Releases

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-14

## 今日速览

过去24小时内，ZeroClaw 社区保持高强度协作：50 条 Issue 更新（其中 37 条新开/活跃，13 条关闭）与 50 条 PR 更新（43 条待合并，7 条已合并/关闭）并行推进。无新版本发布，项目仍处于 v0.9.0 的密集开发周期。当前讨论焦点集中在**安全策略契约**（shell 命令分级、SOP 权限、peer 策略类型化）、**会话持久化所有权**（#9600 tracker 协调四个重叠工作流）以及 **Agent Plugins 1.0 标准接入**（#9810）三大方向。安全修复活跃，3 个 P1 级安全/正确性 PR 于今日提交或合并。整体健康度良好，但注意有 3 个高风险 RFC 仍处于 blocked 状态等待维护者决策。

---

## 项目进展

今日合并/关闭的 PR 中，以下工作已正式落地：

- **[PR #9969]（已合并）** fix(gateway): contain filesystem dashboard assets — 安全修复。对 filesystem-backed dashboard 资源路径进行 canonicalize 并在解析时校验是否越出配置的 distribution root，杜绝 symlink 逃逸。这是针对仪表盘静态资源目录穿越漏洞的紧急修复。
- **[PR #9674]（已合并）** fix(infra): preserve session queue serialization during eviction — 修复会话槽驱逐与待处理计数之间的竞态条件，通过 RAII guard 在槽位锁内注册 pending 请求，防止空闲驱逐误删刚被选中的会话槽。
- **[PR #9932]（已合并）** ci(codeql): 移除 `rust/hard-coded-cryptographic-value` 查询（27 个告警全部为 cfg(test) 下的误报），显著降低 CI 噪音。
- **[PR #9980]（已关闭）** ci(docker): sticky-disk layer cache for PR image builds — 解决 `type=gha` Docker 层缓存 10GB/repo 限额抖动问题，属于 Blacksmith runner 迁移系列的组成部分。
- **[PR #9639]（已合并）** docs(architecture): document provider routing lifecycle — 新增 provider 路由生命周期文档，覆盖 profile 构造、hint 路由、重试/回退顺序、cooldown、流恢复、no-replay 边界及 requested-versus-served 归因。
- **[PR #8546]（已关闭）** fix(cli): localize status fragments — 将 `zeroclaw status` 的风险摘要片段路由到 Fluent i18n 层，修复 CLI 本地化遗漏。

这些合并在**安全加固、基础设施稳定性、文档完备性**三个维度推进了 v0.9.0 的收尾工作。另外，[PR #9968] 已提交（fix(providers): preserve compatible-provider integrity），针对智谱凭证 JWT 生成失败时回退为 bearer token 的问题做 fail-closed 处理，目前待审。

---

## 社区热点

今日讨论热度最高的议题集中在安全策略与架构设计上：

- **[Issue #8303] — RFC: Goal mode v1（20 评论, 1 👍）**
  ZeroClaw 需要一个可跨多轮 agent turn 持续追踪的有界用户目标执行模式。该提案将早期方案的 restart handoff、broad channel admission、Web、异步子任务等工作拆出首版范围，聚焦于最小可用闭环。社区对范围拆分意见较集中，RFC 已进入 no-stale 状态。

- **[Issue #7155] — RFC: 高风险 shell 命令确认层级（18 评论）**
  Claude Code 风格的 allow/ask/deny 命令策略契约。截至 2026-08-05 已迭代至 Revision 3，范围收敛到 shell 策略契约本身。这是 v0.9.0 安全路线图中社区参与度最高的讨论之一，仍在等待 maintainer 最终裁决。

- **[Issue #8692] — Tracker: 维护者决策队列（13 评论）**
  为所有 RFC、设计 issue、发布策略问题建立编号决策队列。该 tracker 本身反映了一个元问题：维护者带宽成为项目瓶颈，大量设计讨论积压待决。

- **[Issue #6850] — RFC: 内存生命周期策略与存储后端解耦（12 评论）**
  社区普遍认同 `Memory` trait 不应同时承担生命周期治理职责，主张引入独立的策略层。该提案从 5 月讨论至今仍处于 needs-author-action 状态。

- **[Issue #9328] — Bug: verifiable-intent 未校验凭证链（12 评论）**
  安全审计发现 `vi_verify` 的 `evaluate_constraints` 直接信任调用方传入的 fulfillment 对象，与 VI 参考实现要求由链验证器建立密码学可信后再校验约束的原则不符。当前 status: accepted, in-progress。

---

## Bug 与稳定性

### P1（高危/需立即关注）

- **[Issue #9389]（已关闭）** unauthenticated POST /api/pair 的锁账机制依赖攻击者可控制 header — 安全审计漏洞，现已修复关闭。
- **[PR #9969]（已合并）** filesystem dashboard 资产路径穿越 — 见上文项目进展，已修复。
- **[Issue #9635]（PR #9635 开放中）** git 子命令风险分类绕过：`SecurityPolicy::command_risk_level` 将 `args.first()` 读作子命令，但 agent 使用 `git -C <path> <verb>` 时首参数是全局选项，导致风险分类被绕过。fix PR 尚待在维护者审核。
- **[Issue #9002]（PR #9002 开放中）** dashboard WebSocket 断开会取消进行中的 agent turn。fix PR 将 WS 重新定义为 viewer/controller 角色，正在等待 maintainer review。

### P2（中危）

- **[Issue #9328]** verifiable-intent 凭证链校验缺失（12 评论，status: accepted/in-progress）— 暂无对应 fix PR。
- **[Issue #9929]** headless SOP step turn 获得 `sop-{run_id}-step-{n}` 会话路径但从未持久化到 session store（status: accepted, blocked）— 暂无 fix PR。

### P3（低危）

- **[Issue #9951]（已关闭）** WeChat channel 代码及其 51 个 lib 单元测试因 `channel-wechat` feature 未纳入任何 CI 特性矩阵而从未编译/执行。CI 覆盖率盲区，已关闭。
- **[Issue #9706]（已关闭）** Edge TTS 临时输出文件在部分错误路径下未清理。
- **[Issue #9710]（已关闭）** macOS 桌面端截图临时文件在早期 return 路径下未清理。

---

## 功能请求与路线图信号

从今日活跃的 enhancement 与 RFC 中，以下信号值得关注：

- **[Issue #9810] — RFC: 加载 Agent Plugins 1.0 skill 与 MCP 包**（status: blocked, needs-maintainer-review）
  支持 vendor-neutral 的 agent-plugins.org 标准是 ZeroClaw 生态扩展的重要一步。若获批，将能直接加载社区 `plugin.json + skills/ + mcp.json` 格式的插件包，战略价值高。

- **[Issue #9487] — RFC: Runtime-owned conversation sessions + transport adapters**（11 评论）
  与 #9600 tracker 联动，是当前会话持久化重构的总纲。其 Revision 2 已明确 #9487/#9488/#9600 的 ownership 边界。该 RFC 的落地将直接影响后续所有 channel 的会话处理方式。

- **[Issue #9887] — 超大图片降采样而非丢弃**（status: accepted, blocked）
  社区对多模态输入的处理策略提出改进：超过 `max_image_size_mb` 的图片应降采样而非直接拒绝，并支持 `0` 值禁用限制。已接受但被阻塞，待相关依赖就绪。

- **[Issue #9895] — Telegram /model 选择器升级为分组分页 inline-keyboard**（status: accepted）
  移动端多 provider 路由切换的体验优化，已获 accepted 标签，预计随 v0.9.0 落地。

- **[Issue #9945] — browser 工具仅暴露 16/100+ 命令**（status: blocked, accepted）
  iframes、JS 对话框、标签页和表单控件均不可达，是 agent-browser 后端能力与工具层暴露之间的严重落差。被阻塞但已获 accepted，是工具完备性路线图上的重要待办。

- **[Issue #9631] — 向 OpenRouter 发送稳定 session_id 以节省 prompt cache 成本**（status: blocked, needs-author-action）
  用户反映 OpenRouter 场景下 system prompt 和 tool schemas 每轮重复传输，成本高。该提案要求作者补充更多细节后方可继续推进。

---

## 用户反馈摘要

- **安全策略讨论的共识凝聚（#7155）**：经过三个 revision 的迭代，社区与维护者在 shell 命令策略契约的 normative scope 上达成一致，将 Phase 0 之外的 Web、channel admission、异步子任务等内容拆出。说明社区具备结构化的 RFC 打磨流程。

- **成本痛点明确（#9631）**：用户直接指出"openrouter 场景下同一对话产生数十次 LLM 请求，system prompt 和 tool schemas 每次重放"。这反映了 agent 框架类项目在长会话场景下的普遍经济性诉求——token 级成本优化正成为选型关键因素。

- **误伤而非 bug（#9825）**：泄漏检测器的高熵启发式将公共区块链地址判定为敏感信息，导致支付请求 URL 无法投递。用户正确区分了"检测器工作符合设计预期"与"设计本身需要例外清单"两种情况，体现社区技术判断力。

- **移动端体验不足（#9895）**：Telegram 上 `/model` 命令在路由较多时"仍然笨重"，用户明确要求 inline-keyboard 分组分页。这是移动端优先场景的真实反馈。

- **契约所有权混乱（#9600）**：四个独立工作流同时修改会话持久化契约且无指定 owner，社区主动建立 tracker 来协调。这反映出项目在高速并行开发中确实会产生领域边界模糊的问题。

---

## 待处理积压

以下长期未决事项需要维护者关注：

- **[Issue #5907]** Opt-in LSP 支持 for ZeroCode（2026-04-19 创建，6 评论，needs-author-action）— 三个月过去仍在等待作者回应，建议明确下一步动作或关闭。
- **[Issue #6850]** 内存生命周期策略解耦（2026-05-22 创建，12 评论，needs-author-action）— 从 5 月讨论至今，RFC 已成熟但等待作者修订。
- **[Issue #7155]** 高风险 shell 命令确认层级（2026-06-03 创建，18 评论，needs-maintainer-review）— 社区期待维护者最终拍板。
- **[PR #9013]** refactor(config)!: 将 TodoWrite 显示配置从 daemon 迁入 zerocode（2026-07-12 创建，size:XL）— 破坏性重构，涉及配置迁移，已开放超一个月。
- **[PR #9420]** fix(anthropic): 支持存储的 OAuth profiles（2026-07-26 创建，needs-author-action）— 大型 PR（size:XL）等待作者修订。
- **[PR #8546]** fix(cli): localize status fragments（2026-06-30 创建，已打 stale-candidate 标签）— 今日已关闭，若尚未合并建议关注关闭原因。

---

**总体评估**：ZeroClaw 在 2026-08-14 展现出高活跃度与健康的问题流转率（Issue 关闭率 26%，PR 合并/关闭率 14%）。安全加固是当前主线，同时 Agent Plugins 标准接入和会话架构重构为 v0.9.0 之后的版本蓄力。主要风险点在于维护者决策队列（#8692）持续膨胀——大量 accepted RFC 因缺少最终裁定而处于 blocked 状态，可能影响版本发布节奏。

[ZeroClaw GitHub](https://github.com/zeroclaw-labs/zeroclaw)

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*