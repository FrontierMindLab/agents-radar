# OpenClaw 生态日报 2026-08-18

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-17 23:00 UTC

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

# OpenClaw 项目动态日报 — 2026-08-18

*数据来源：github.com/openclaw/openclaw（统计区间：过去24小时）*


## 1. 今日速览

过去 24 小时项目保持高活跃度：共 500 条 Issue 更新（新开/活跃 488，关闭 12）与 500 条 PR 更新（待合并 404，合并/关闭 96），无新版本发布。值得警惕的是，绝大多数活跃 Issue 均带有 `clawsweeper:no-new-fix-pr` 和 `clawsweeper:needs-maintainer-review` 标签，说明大量已确认问题仍停留在"等待维护者决策"阶段，修复产出率偏低。社区讨论焦点集中在消息丢失/重复（session-state、message-loss）、编码 Agent 不工作、Codex 集成 CPU 占用异常、以及多通道能力配置等方向。安全侧有两项 install-policy 警告确认功能的 PR 推进至关闭，是今日为数不多的实质进展。


## 2. 版本发布

过去 24 小时无新 Releases。


## 3. 项目进展

今日无大规模合并事件，但有两个重要安全功能 PR 被关闭，值得关注：

- **[PR #120900] feat(ui): review install policy warnings**（已关闭）
  允许已认证管理员在 Control UI 中查看安装策略警告并确认继续安装插件。`plugins.install` 新增可选参数 `acknowledgeInstallPolicyWarning: true`，作为单次安装调用的确认标记。
  链接：openclaw/openclaw PR #120900

- **[PR #116489] feat(security): require acknowledgement for install policy warnings**（已关闭）
  外部 `security.installPolicy` 命令现可返回 `warn` 级别，交互式 CLI 安装会展示警告原因与发现详情，并要求操作者输入精确目标名称方可继续。这是对插件供应链安全的重要补强。
  链接：openclaw/openclaw PR #116489

除此之外，以下 PR 已在"等待维护者审查"状态，有望近日合并：

- **[PR #125280] Show worktree option only for Git group folders**（Web UI，P2，🐚 platinum hermit）— 仅在所选目录为 Git 仓库时展示 worktree 选项，非 Git 目录不再显示无效下拉框，消除困惑。
  链接：openclaw/openclaw PR #125280

- **[PR #123975] fix(scripts): typecheck hangs forever when tsgo wedges instead of failing**（P2，🐚 platinum hermit）— 修复 tsgo 编译器卡死后本地 typecheck 无限挂起的问题，对开发者体验和 CI 稳定性有直接帮助。
  链接：openclaw/openclaw PR #123975

- **[PR #124551] fix(cli): merge nested MCP configure and tools patches**（P2，🐚 platinum hermit）— 修复 `openclaw config validate` 对替换型 channel 插件的配置校验误报。
  链接：openclaw/openclaw PR #124551

总体来看，项目今日进展以"安全加固 + 周边体验修复"为主，核心运行时问题（消息丢失、状态损坏、编码 Agent）尚未见到合并级修复。


## 4. 社区热点

今日讨论热度最高的 5 个 Issue：

1. **[Issue #77598] Track live dev agent behavior and trajectory**（评论 23，👍 1）
   这是一个"24 小时观察 pash 的 dev agent"的运行笔记追踪 Issue，观察者只记录、不干预。社区对真实开发代理的自主行为轨迹表现出持续兴趣，讨论围绕 agent 在长时间任务中的行为模式展开。
   链接：openclaw/openclaw Issue #77598

2. **[Issue #91009] Codex PreToolUse native hook relay spawns CPU-bound openclaw-hooks processes and stalls gateway RPC**（评论 20，👍 2，P1）
   核心痛点：Codex 集成在每次 `pre_tool_use` 时派生多个短生命周期 `openclaw-hooks` 进程，每个进程占用 100%+ CPU，最终阻塞 Gateway RPC。影响面大且可复现，社区讨论积极。
   链接：openclaw/openclaw Issue #91009

3. **[Issue #68596] Configurable streaming watchdog timeout threshold**（评论 15，👍 8，P2）
   用户在 kimi-k2.5、DeepSeek-R1 等长思考模型上频繁触发 "no stream updates for 30s" 看门狗误报。虽是 P2，但 👍 数很高（8 个），说明长思考模型的用户群体对此痛点有强烈共鸣。
   链接：openclaw/openclaw Issue #68596

4. **[Issue #62505] Coding Agent never completes anything (worked in 2026.4.2 and earlier)**（评论 15，P1）
   被标记为回归问题。用户明确表示"2026.4.2 及更早版本正常，现在什么都不做"，这是典型的"核心功能回退"类投诉，社区关注度高。
   链接：openclaw/openclaw Issue #62505

5. **[Issue #96834] WhatsApp 1:1: inbound image wedges main lane ~3min before processing**（评论 15，P1）
   在 WhatsApp 直聊中发送图片，主消息通道会被"楔住"约 3 分钟才开始处理。涉及原生多模态消息注入和 run 状态管理，社区持续跟踪复现情况。
   链接：openclaw/openclaw Issue #96834

**分析**：社区热点高度集中在"消息可靠性"与"编码 Agent 体验"两个领域。P1 级问题讨论量大、复现充分，但普遍缺少可合并的修复 PR，显示维护侧可能已形成瓶颈。


## 5. Bug 与稳定性

### 🔴 P0（严重阻塞）

- **[Issue #70903] Persistent file-based provider cooldown blocks user for hours after billing recovery**（P0，stale）
  402 计费错误后，`disabledUntil` 时间戳持久化并跨重启叠加。用户在充值后仍被禁止使用数小时。虽然标注 P0，但 4 月 24 日创建至今已近 4 个月，仍无 fix PR，令人担忧。
  链接：openclaw/openclaw Issue #70903

### 🟠 P1（高优先级）

| Issue | 标题 | 影响 | 是否已有 fix PR |
|---|---|---|---|
| #62505 | Coding Agent never completes anything（回归） | 核心编码功能失效 | ❌ |
| #91009 | Codex PreToolUse hook 派生 CPU 占满进程 | 性能/可用性崩溃 | ❌ |
| #96834 | WhatsApp 图片卡住主通道 ~3 分钟 | 消息延迟 | ❌ |
| #86215 | Codex OAuth 刷新失败导致 Agent 卡死数小时 | 认证失效无告警 | ❌ |
| #53408 | 长对话后 write/exec 工具参数被静默丢弃 | 工具调用数据丢失 | ❌ |
| #38327 | "Cannot convert undefined or null to object"（google-vertex/gemini-3.1-pro-preview） | 回归崩溃 | ❌ |
| #67777 | 子代理完成消息在 direct-announce 超时/清理时丢失 | 消息丢失 | ❌ |
| #78493 | `sudo openclaw update` 产生混合文件所有权，doctor 覆盖配置 | 配置损坏 | ❌ |
| #97616 | hook/tool 子进程泄漏产生僵尸进程 | 运行时劣化 | ❌ |
| #53540 | 大参数工具调用导致 "Network connection lost" | 会话中断 | ❌ |

### 🟡 P2 重要问题（节选）

- **[Issue #74586]** AM 嵌入式运行中止 memory_search 工具调用，误判为超时 — 链接：openclaw/openclaw Issue #74586
- **[Issue #72015]** active-memory 插件阻塞回复 + QMD 启动初始化压垮 gateway — 链接：openclaw/openclaw Issue #72015
- **[Issue #71689]** tasks registry 因 SQLite 损坏导致启动恢复失败 — 链接：openclaw/openclaw Issue #71689
- **[Issue #77930]** Discord channel 在 2026.5.4 及 beta.2/beta.3 回归损坏（beta.1 正常）— 链接：openclaw/openclaw Issue #77930

**稳定性总结**：今日活跃的 P1 级 Bug 普遍已持续数周、甚至数月（最早 3 月创建），同时带有 `no-new-fix-pr` 与 `needs-maintainer-review` 标签，意味着**修复通道持续拥堵**。这已成为项目健康度最突出的风险点。


## 6. 功能请求与路线图信号

以下功能请求在过去 24 小时内持续获得讨论和更新，其中部分已有对应 PR 或强路线图信号：

**已有对应 PR（可能进入下一版本）：**

| Issue | 功能需求 | 对应 PR |
|---|---|---|
| #71058 多个 Azure/Teams 机器人支持 | 单一 Gateway 支持多个 Teams bot 身份 | [#112811](openclaw/openclaw PR #112811)（XL，待验证） |
| #92884 替换型 channel 插件的配置校验 | config validate 误报纠正 | [#120332](openclaw/openclaw PR #120332)（ready for maintainer look） |
| #125235 消息气泡视觉效果简化 | UI 消息窗口与操作精简 | [#125241](openclaw/openclaw PR #125241) |
| #123306 斜杠命令参数暂存 | Composer 内先填写参数再执行命令 | [#123356](openclaw/openclaw PR #123356) |

**尚无 PR、但讨论度高、很可能被纳入路线图：**

- **[Issue #68596]** 流式 watchdog 超时阈值可配置（👍 8）— 长思考模型用户的核心需求。
  链接：openclaw/openclaw Issue #68596
- **[Issue #67413]** 按 agent 配置 dreaming（记忆整理）任务，避免全工作区同时 OOM（👍 5）。
  链接：openclaw/openclaw Issue #67413
- **[Issue #60572]** 多槽位（multi-slot）记忆架构，允许不同记忆提供方分层共存（👍 3）。
  链接：openclaw/openclaw Issue #60572
- **[Issue #42840]** Control UI 支持 MathJax/LaTeX 渲染（👍 10，为今日功能请求中最高 👍）。
  链接：openclaw/openclaw Issue #42840
- **[Issue #63930]** 支持 Anthropic advisor tool（beta server-side tool）。
  链接：openclaw/openclaw Issue #63930
- **[Issue #63990]** 多索引嵌入记忆 + 模型级故障转移，避免混合向量空间损坏语义。
  链接：openclaw/openclaw Issue #63990

**路线图信号**：OpenClaw 当前的重心明显偏向 **多机器人/多身份支持**（Teams、TTS/STT per-agent）、**记忆系统架构演进**（multi-slot、multi-index）和 **UI 体验打磨**（MathJax、斜杠命令参数、上传限制配置）。其中 UI 和配置体验类请求更容易快速落地，记忆架构类则可能是中期方向。


## 7. 用户反馈摘要

**满意与认可：**

- **[Issue #73537]** 用户 Reneb-cafe 表示："Thank you for OpenClaw. We've been running it as a family and business assistant (Telegram integration, automations, cron jobs, Home Assistant control) and it has genuinely become part of our daily workflow." 同时建议增加 production-readiness 稳定性标签，以便区分测试版与稳定版。
  链接：openclaw/openclaw Issue #73537

**核心痛点与不满：**

- **[Issue #62505]** "This has been pumping out work for me for weeks and now just doesnt do _anything_ apart from vague status updates (and then apologies for the vagueness)." — 编码 Agent 从"持续产出"到"啥也不干"的体验断裂，用户失望情绪明显。
  链接：openclaw/openclaw Issue #62505

- **[Issue #51429]** 用户发现全新安装的 OpenClaw 在工作目录创建了 `/Users/wangtao` 文件夹，并指出："Apparently some wangtao hardcode his working space path into the code and somebody merged his code and published" — 开发者把个人路径硬编码进代码并被合并发布，社区观感较差。
  链接：openclaw/openclaw Issue #51429

- **[Issue #68596]** 用户反馈看门狗误报频繁："streaming watchdog: no stream updates for 30s; resetting status. The backend may have dropped this run silently" — 在长思考模型上每次推理都会被阻断，用户体验严重影响。
  链接：openclaw/openclaw Issue #68596

- **[Issue #57930 / #58957]** 用户反映模型切换和 Discord 通道加载在小版本间反复回归（"works in beta.1, broken in beta.2"），对版本稳定性信心不足。

**综合**：用户对 OpenClaw 的功能深度和日常实用性高度认可，但**回归问题频繁、修复周期过长**正在消耗社区信任。P1 问题动辄数周无 fix PR 的状况如不改善，可能影响核心用户留存。


## 8. 待处理积压

以下 Issue 创建时间早、影响大，但长期缺少有效修复或维护者响应，建议优先排查：

| Issue | 创建时间 | 优先级 | 状态标签 | 备注 |
|---|---|---|---|---|
| #70903 持久 provider cooldown 阻塞 | 2026-04-24 | P0 | stale, needs-product-decision | 至今 4 个月无 fix PR |
| #38327 google-vertex/gemini 空对象错误 | 2026-03-06 | P1 | needs-live-repro | 5 个月+ 仍在等待复现 |
| #45224 Playwright CDP 断言崩掉整个 Gateway | 2026-03-13 | P1 | not-repro-on-main | 进程级崩溃，需尽快确认是否仍在 main 上复现 |
| #51429 硬编码用户路径被合并发布 | 2026-03-21 | P2 | source-repro, needs-product-decision | 代码卫生问题，影响信任 |
| #62505 编码 Agent 回归失效 | 2026-04-07 | P1 | source-repro, needs-product-decision | 核心功能回归，长期悬而未决 |
| #77930 Discord 通道回归 | 2026-05-05 | P2 | linked-pr-open | 已确认 beta.2 引入，待合并修复 |
| #50093 WhatsApp 重连后消息补拉 | 2026-03-19 | P1 | needs-live-repro | 功能缺失已 5 个月 |
| #39476 A2A sessions_send 双向重复消息 | 2026-03-08 | P1 | linked-pr-open | 架构级消息重复问题 |

**提醒**：P0/P1 级别且持续 4 个月以上的问题，建议维护者重新评估优先级，或至少在 Issue 中给出明确的时间预期和替代方案，以缓解社区焦虑。


> **日报总结**：OpenClaw 项目仍处于高活跃状态，社区反馈量大、用户生态活跃。但项目健康度当前面临两个核心挑战：① 大量已确认的 P1 级 Bug 长时间无 fix PR，修复通道出现拥堵；② 核心功能（编码 Agent、消息可靠性、多通道一致性）的回归问题反复出现，影响用户信任。好消息是安全加固（install policy）和 UI 体验类 PR 持续推进，路线图方向清晰。建议维护团队优先补齐 3-4 月积压的 P1 修复，再推进新功能开发。

*本日报由 AI 自动生成，数据来自 openclaw/openclaw 仓库公开信息。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期**：2026-08-18  
**数据窗口**：过去 24 小时（基于各项目 GitHub 公开动态）


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态整体处于 **高活跃、高强度迭代** 阶段：头部项目（OpenClaw、ZeroClaw、Hermes Agent、NanoClaw 等）日均 PR/Issue 更新量均在 50 条量级，且安全加固与架构重构并行推进——OpenClaw 合并安装策略警告确认、ZeroClaw 集中合并 5 项安全修复、NanoClaw 推进 channel 平台化 Hook 体系。与此同时，社区反馈的共性痛点高度集中在**消息可靠性**（丢失/重复/轮询卡死）、**编码 Agent 回归**和**多会话/多渠道状态管理**三大方向，P1 级 Bug 修复周期普遍偏长，维护侧吞吐能力成为普遍瓶颈。值得注意的趋势是，**协议互操作**（OpenAI Chat Completions 兼容、A2A、MCP）、**本地 Webchat 入口**和**跨平台 CI/Windows 支持**正成为多个项目共同关注的新方向。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 活跃度 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 488，关闭 12） | 500（待合并 404，合并/关闭 96） | 无 | 🔥 极高 | ⚠️ 修复通道拥堵，P1 积压严重（最早 3 月创建无 fix PR） |
| **ZeroClaw** | 50（活跃 43，关闭 7） | 50（待合并 34，合并/关闭 16） | 无 | 🔥 高 | ✅ 安全修复集中落地，CI 持续加固，RFC 推进有序 |
| **Hermes Agent** | 50（活跃 41，关闭 9） | 50（待合并 34，合并/关闭 16） | v0.20.3（汇总 ~125 PR） | 🔥 高 | ⚠️ 4 个 P1 开放，Windows 更新机制系统性缺陷 |
| **IronClaw** | 28（活跃 22，关闭 6） | 44（待合并 28，合并/关闭 16） | 无 | 🟢 高 | ✅ 写入优化 epic 科学推进，bug 响应快（24h 出 fix PR） |
| **NanoClaw** | 4（新开 3，关闭 1） | 39（待合并 17，合并/关闭 22） | 无 | 🟢 高 | ✅ 架构重构密集落地，但 2 个新 bug 待修 |
| **CoPaw** | 14（活跃 8，关闭 6） | 35（待合并 13，合并/关闭 22） | 无 | 🟢 高 | ✅ 长周期 PR 集中清理，但 2.1.0 稳定性问题较多 |
| **NanoBot** | 3（活跃 2，关闭 1） | 15（待合并 10，合并/关闭 5） | 无 | 🟡 中高 | ✅ Telegram 关键修复完成闭环，但 #4864 已 40 天未修 |
| **LobsterAI** | 7（全活跃，6 个为 4 月老 Issue） | 21（合并/关闭 17，待合并 4） | 无 | 🟡 中高 | ⚠️ 积压消化积极，但本地模型/MCP 两个高优 bug 未修 |
| **Moltis** | 2（全关闭） | 9（合并/关闭 6，待合并 3） | 无 | 🟡 中等 | ✅ 稳健，Bug 修复当日闭环，依赖持续更新 |
| **PicoClaw** | 4（活跃 3，关闭 1） | 4（待合并 1，合并/关闭 3） | 无 | 🟡 中等 | ✅ 响应效率高（当日修复），但社区讨论度低 |
| **NullClaw** | 0 | 1（dependabot 依赖升级，搁置 2 个月） | 无 | ⚪ 低 | ⚠️ 维护期，无功能推进，社区热度极低 |
| **ZeptoClaw** | 0 | 0 | 无 | ⚪ 无活动 | — |


## 3. OpenClaw 在生态中的定位

| 维度 | OpenClaw | 对比结论 |
|---|---|---|
| **社区规模** | 日均 500 Issue + 500 PR，讨论量大一个量级 | 生态绝对龙头，是其他项目的数十倍 |
| **功能广度** | 多通道（Discord/WhatsApp/Telegram/Slack 等）+ 插件系统 + 编码 Agent + 记忆架构 + Control UI | 全能型平台，覆盖最全 |
| **技术路线** | 插件化 + 多通道桥接 + 独立 gateway 进程；强调自我托管与本地优先 | 与 NanoBot（轻量 Python）、Hermes（桌面+Bot 双模式）形成差异 |
| **核心风险** | P1 级 Bug 平均持续数周至数月无 fix PR，修复通道拥堵；核心功能（编码 Agent、消息可靠性）回归频发 | 社区活跃度与修复效率严重不匹配，为生态中最突出风险 |
| **生态角色** | 事实上的**参照系与生态中心**——NanoClaw（精简版）、PicoClaw（嵌入式）、IronClaw、ZeroClaw 等均在其周边形成差异化补充 | 其他项目多以"更轻、更稳、更安全"为切入点争取用户 |

**结论**：OpenClaw 以绝对体量占据生态中心位置，但**"高活跃-低修复"剪刀差**使其正面临社区信任消耗的风险；这也为围绕其周边、以"稳定性"和"聚焦场景"为卖点的竞品提供了生存空间。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息可靠性与通道稳定性** | OpenClaw、NanoBot、CoPaw、ZeroClaw、IronClaw | 消息丢失/重复、轮询静默卡死（NanoBot #5171）、WhatsApp 图片卡主通道（OpenClaw #96834）、Telegram offset 推进过早导致 update 永久丢失（ZeroClaw #9314） |
| **编码 Agent 可靠性与回归** | OpenClaw、NanoBot、CoPaw、LobsterAI | 编码 Agent 完全失效（OpenClaw #62505）、工具无限循环耗尽 token（NanoBot #4864）、`_execute_tool_call` 崩溃（CoPaw #7063） |
| **多会话/多渠道状态管理** | CoPaw、OpenClaw、Hermes Agent | Console stop 请求误取消飞书活跃会话（CoPaw #7011）、session identity 交叉、cross-profile 路由错乱（Hermes #88540） |
| **配置一致性与防误写** | OpenClaw、Hermes Agent、LobsterAI、Moltis | 配置文件被运行时默认值覆盖（Hermes #4775）、groupPolicy 被神秘重置（LobsterAI #1653）、heartbeat 参数被 `#[serde(default)]` 覆盖（Moltis #1209） |
| **安全加固** | OpenClaw、ZeroClaw、Hermes Agent、NanoBot | 安装策略确认（OpenClaw）、Gemini API 密钥从 URL 迁移至 header（ZeroClaw #9973）、Slack 文件下载重定向校验（NanoBot #5414）、技能信任侧车（Hermes #88704） |
| **协议互操作** | ZeroClaw、CoPaw、LobsterAI、Hermes Agent | OpenAI Chat Completions 兼容端点（ZeroClaw #8603）、MCP 工具命名规范与序列化兼容（CoPaw #6405、NanoBot #4864）、A2A 跨平台通信（LobsterAI #2500）、MCP 双时代协议边界（Hermes #88698） |
| **记忆与上下文架构演进** | OpenClaw、ZeroClaw、CoPaw | 多槽位/多索引记忆架构、跨会话持久记忆可靠性（IronClaw #7275）、可插拔长期记忆后端（CoPaw #7079） |
| **跨平台支持（Windows）** | Hermes Agent、ZeroClaw | Windows 更新机制系统性失败（Hermes #86093）、74 个测试在 Windows 失败（ZeroClaw #7462）、新增 macOS/Windows 定时 CI（ZeroClaw #9398） |
| **成本控制与可观测性** | NanoBot、IronClaw、ZeroClaw | 混合支出防火墙（NanoBot #5409）、DB 写入压力优化 -60%（IronClaw #7591）、provider 失败诊断信息（ZeroClaw #10023） |
| **本地 Webchat 入口** | NanoClaw | 社区与 core-team 同日提交两个 webchat 通道 PR（#3290/#3298），反映"去外部依赖"刚需 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全能型个人 AI 助手：多通道、插件系统、编码 Agent、记忆、Control UI | 技术爱好者、自托管用户、多通道重度使用者 | 插件化 + 多通道桥接 + Gateway 进程模型 |
| **NanoBot** | 轻量级、高稳定性的 Bot 框架（Telegram/WebUI/CLI） | 生产环境部署者、成本敏感用户 | Python 为主，TypeScript TUI 合入，混合架构演进中 |
| **Hermes Agent** | Bot 模式 + 桌面应用双形态，跨网关 Bot 通信（hermes peer） | 桌面用户与 Bot 生态并重的群体 | Gateway/Desktop 双 profile，大型 refactor 驱动（god-file 分片 20/20） |
| **NanoClaw** | OpenClaw 的精简/模块化实现，channel 平台化与 SessionDriver 抽象 | 开发者、需要深度定制运行时的用户 | 模块化注册 + Hook 体系，Docker 为默认 runtime，预留非 Docker driver |
| **IronClaw** | 性能与可靠性优先，DB 写入压力优化、自动化引擎（run-now）、WASM 工具 | 高负载/规模化部署者、自动化重度用户 | Rust 实现，资源管理者 + libSQL，WASM 工具契约演进 |
| **ZeroClaw** | 安全与互操作性并重（Chat Completions 兼容、命令审批策略、原子预算） | 安全敏感用户、OpenAI 生态工具使用者 | Rust 实现，RFC 驱动治理（work lanes），安全修复优先级高 |
| **CoPaw** | 多渠道 + 团队协作（飞书/钉钉/QQ/微信），多智能体协作 | 团队用户、中文互联网渠道使用者 | PawApp 应用生态，provider 路由重构中 |
| **LobsterAI** | 网易有道背景，多 Agent 协作 + 本地模型 + 中文生态集成（Qwen/百炼） | 中文用户、企业场景 | 基于 OpenClaw 二次开发，Cowork 协作界面深度定制 |
| **PicoClaw** | 嵌入式/轻量部署场景，支持微信/IRC/Slack/Antigravity | 边缘设备、资源受限用户 | 轻量级实现，配置简化 |
| **Moltis** | 浏览器自动化 + 外部代理集成（MiniMax Code）+ WebUI 可配置性 | 浏览器自动化、多模型混合用户 | Rust 实现，Shadow DOM 穿透，heartbeat 调度器 |
| **NullClaw** | 目前仅依赖维护，无功能推进 | — | — |


## 6. 社区热度与成熟度分层

**第一层：快速迭代期（高活跃 + 功能密集落地）**
> NanoClaw（22 个 PR 合并，架构级重构推进）、CoPaw（22 个 PR 合并，清理积压 + 功能增强）、IronClaw（16 个 PR 合并，写入优化 epic 子任务密集推进）、LobsterAI（17 个 PR 合并，批量消化 4 月积压 + dsh 集成）

**第二层：质量巩固期（高活跃 + 安全/稳定性为重点）**
> ZeroClaw（5 项安全修复集中合入 + CI 跨平台补强）、OpenClaw（安全功能 PR 关闭 + UI 体验修复，但核心 P1 修复滞后）、Hermes Agent（v0.20.3 汇总 125 PR，但 Windows 更新机制存在系统性缺陷）

**第三层：稳步推进期（中高活跃 + 单点突破）**
> NanoBot（Telegram 修复完整闭环，但 #4864 高严重度 bug 40 天未修）、Moltis（Bug 响应快，但功能面较小）

**第四层：维护/停滞期（低活跃）**
> PicoClaw（少量但高效，社区讨论少）、NullClaw（仅依赖 PR 搁置 2 个月）、ZeptoClaw（无活动）

**成熟度判断**：OpenClaw、Hermes、ZeroClaw 已进入生态平台阶段（RFC、epic、治理流程），IronClaw、NanoClaw 处于架构升级的关键转型期，NullClaw/ZeptoClaw 基本停滞。整体生态呈"一超多强，尾部沉寂"格局。


## 7. 值得关注的趋势信号

1. **OpenAI 协议兼容正成为自托管 AI 助手的"标准配置"**：ZeroClaw 的 Chat Completions 兼容 RFC 获得 23 条评论，用户明确点名 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等工具链。这意味着"接入现有生态"比"自建全家桶"更具吸引力，协议层互操作是下一阶段竞争焦点。

2. **安全加固从功能修补走向基础设施化**：ZeroClaw 将 API 密钥从 URL 迁移到 header（防日志泄漏）、NanoBot 增加 Slack 文件下载重定向校验、Hermes 提出事务性部署方案（#88683）、OpenClaw 强化安装策略确认——安全不再是单点 CVE 修复，而是融入安装/更新/部署/运行时全链路。

3. **记忆架构从"单一存储"走向"多层级、可插拔"**：OpenClaw 的 multi-slot/multi-index 提案、CoPaw 的 PowerContext 可插拔记忆后端（Issue+PR 同日提交）、IronClaw 对跨会话持久记忆可靠性的专项验证——记忆正在成为 AI 助手差异化竞争的核心技术栈。

4. **成本可观测性与"防火墙"需求浮出水面**：NanoBot 用户直言"power users running infinite loops and bankrupting your LLM budget"，IronClaw 的 -60% DB 写入优化 epic 和 ZeroClaw 的精确预算计数，均指向同一个方向：Agent 框架必须内置成本控制与用量透明度，否则无法进入严肃生产环境。

5. **Windows 跨平台支持是系统性盲区**：Hermes 的更新机制在 Windows 上必然失败（quarantine 假设错误）、ZeroClaw 74 个测试在简体中文 Windows 上失败且 CI 长期只跑 Linux——两个 Rust 项目同时踩坑，说明跨平台质量保障（尤其 Windows + 非英文 locale）是全行业被低估的工程债务。

6. **架构抽象层成为主流演进路径**：NanoClaw 的 SessionDriver seam（预留非 Docker runtime）、Hermes 的事务性部署统一计划、ZeroClaw 的运行时拥有会话 RFC——头部项目不约而同地在"如何让核心架构可替换、可扩展"上投入，而非继续堆功能。这标志着生态正从"功能竞争"进入"架构竞争"阶段。

7. **社区贡献者生态活跃，但维护者响应是普遍瓶颈**：NanoClaw 出现社区与 core-team 同日提交重叠的 Webchat PR、CoPaw 出现贡献者 9 天内两次提交同一集成（#6817 关闭后重提 #7081）、多个项目出现 PR 标注 `conflict` 或数月无人 review。社区有热情、有产能，但维护者吞吐量跟不上，已是全生态共性制约因素。

---

*本报告基于各项目 2026-08-18 公开 GitHub 数据自动生成，供技术决策者与开发者参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-18

## 1. 今日速览

过去24小时内，NanoBot 项目保持高度活跃的开发节奏：共产生 15 条 PR 动态（其中 5 条已合并/关闭），涉及 Gateway 稳定性、Telegram 轮询恢复、WebUI 增强及 CLI 重构等多个方向；Issues 侧更新 3 条，其中 1 条长期未决的 bug（#4864）仍在持续讨论。项目无新版本发布，但合并的 PR 数量较多，表明当前处于功能迭代与稳定性加固并行的阶段，整体健康度良好。值得关注的是，多个 PR 标注了 `conflict`（需要解决冲突），说明并行开发导致的代码分支交织开始显现，需要维护者投入精力协调。

## 2. 版本发布

过去24小时内无新版本发布。但需注意 PR #5406（原生 TypeScript 终端 UI）的 Recovery note 提到 `main` 分支曾被误合并后又立即恢复，该 PR 现已合并，下个版本可能会包含这一重要 CLI 变更。

## 3. 项目进展

今日共 5 个 PR 被合并/关闭，以下是关键进展：

**🎉 已合并的重要 PR：**

- **[#5406 [CLOSED] feat(cli): add native TypeScript terminal UI](https://github.com/HKUDS/nanobot/pull/5406)** — 这是一个重要的里程碑：为 CLI 增加原生 TypeScript 终端 UI，彻底替代旧的 TUI 方案。该 PR 继承了 #4329 的完整提交历史并修复了跨终端兼容问题。注意 Recovery note 中提到 `main` 分支曾短暂被误合并，已恢复，当前该 PR 已正确合入。
- **[#5416 [CLOSED] fix(gateway): stabilize process identities](https://github.com/HKUDS/nanobot/pull/5416)** — 修复 macOS 上 `ps lstart` 的本地化依赖问题，改用 `proc_pidinfo` 原生 API 获取进程创建时间，同时对 Windows FILETIME 和 Linux 相关逻辑做了兼容。
- **[#5156 [CLOSED] fix(telegram): recover from silently stalled polling](https://github.com/HKUDS/nanobot/pull/5156)** — 修复 #5171（Telegram 轮询静默卡死）的完整方案：重建卡死的轮询连接池。生产环境中已观测到该问题，属于稳定性关键修复。
- **[#5301 [CLOSED] fix(telegram): bridge stdlib logging and detect stalled polling](https://github.com/HKUDS/nanobot/pull/5301)** — #5156 的低风险前置部分：将 stdlib logging 桥接到 loguru，并增加只记录日志的轻量级存活检查。
- **[#5410 [CLOSED] fix(goal): stop repeating clarification replies](https://github.com/HKUDS/nanobot/pull/5410)** — 修复持续目标（sustained goal）激活时，`AgentRunner` 将普通文本回复误判为需要继续注入目标上下文的问题。现在仅在真正到达工具调用预算边界时才保留续写逻辑。

**整体评价**：项目在 CLI 用户体验、Gateway 稳定性、Telegram 可靠性三个维度均有实质推进。特别是 TypeScript TUI 的合入，表明项目正在从纯 Python CLI 向混合架构演进。

## 4. 社区热点

今日最受关注的 Issue 和 PR 如下：

- **[#4864 [OPEN] Endless loop for `<tool_call> <function=complete_goal>` — 7 条评论，1 👍](https://github.com/HKUDS/nanobot/issues/4864)**：这是今日讨论最活跃的 Issue。用户报告 `complete_goal` 工具因 gateway 将 `recap` 参数错误地解析为裸字符串而非 JSON 对象，导致工具反复报错、陷入死循环。该问题自 7 月 9 日创建以来已持续 40 天，今日仍无 fix PR 关联，社区关注度持续累积。

- **[#5409 [OPEN] Prevent Margin Leaks & Surprise LLM Bills: Add a Hybrid Spend Firewall](https://github.com/HKUDS/nanobot/issues/5409)**：虽是新建 Issue，但直指商业化过程中“无限循环耗尽 LLM 预算”的痛点，建议为框架增加混合支出防火墙。这条 Issue 反映了用户对成本管控的强烈需求，在 Agent 框架领域具备一定代表性。

- **[#5156 [CLOSED] fix(telegram): recover from silently stalled polling](https://github.com/HKUDS/nanobot/pull/5156)**：虽然已关闭，但它修复的生产级问题（Telegram 轮询永久静默停摆）获得了大量关注。该 PR 与 #5171 联动，是今日讨论闭环的典型案例。

**社区诉求分析**：今日热点集中在两类：一是**工具调用参数序列化的兼容性回归**（#4864），二是**部署稳定性和成本可观测性**（#5171/#5409）。说明用户正在将 NanoBot 用于生产环境并期望框架提供更严格的自愈和防护能力。

## 5. Bug 与稳定性

按严重程度排列今日提及的 Bug：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 🔴 高 | [#4864](https://github.com/HKUDS/nanobot/issues/4864) | **`complete_goal` 无限循环**：gateway 将 JSON 参数当裸字符串解析，工具持续报错、Agent 陷入死循环，可能导致 token 快速消耗 | ❌ 仍开放，无 fix PR |
| 🟠 中 | [#5171](https://github.com/HKUDS/nanobot/issues/5171) | **Telegram 轮询静默卡死**：瞬时网络故障后 bot 永久停止接收消息，日志无任何输出，消息在服务端堆积 | ✅ 已被 #5156 修复（已合并） |
| 🟠 中 | [#5407](https://github.com/HKUDS/nanobot/pull/5407) | **cron 持久化任务未随配置禁用而停止**：设置 `gateway.heartbeat.enabled=false` 或 `agents.defaults.dream.enabled=false` 并重启后，`jobs.json` 中已持久化的系统任务仍在触发，继续消耗 token | 🟡 有 fix PR（待合并） |
| 🟡 低 | [#5412](https://github.com/HKUDS/nanobot/pull/5412) | **后台进程启动日志被块缓冲**：输出重定向到文件时 Python 采用块缓冲，启动信息无法及时写入日志，影响排障 | 🟡 有 fix PR（待合并） |
| 🟡 低 | [#5415](https://github.com/HKUDS/nanobot/pull/5415) | **Windows venv 子进程 PID 记录错误**：gateway 无法接管直接 venv 启动器的子进程，影响 Windows 上的生命周期管理 | 🟡 有 fix PR（待合并） |
| 🟡 低 | [#5413](https://github.com/HKUDS/nanobot/pull/5413) | **LLM provider 异常绕过 fallback 策略**：provider 抛出异常时不在 fallback 循环中处理，降级机制可能失效 | 🟡 有 fix PR（待合并） |
| 🟡 低 | [#5414](https://github.com/HKUDS/nanobot/pull/5414) | **Slack 文件下载重定向链未验证**：私密下载 URL 可能被重定向到恶意地址，缺乏安全校验 | 🟡 有 fix PR（待合并） |
| 🟢 轻微 | [#5341](https://github.com/HKUDS/nanobot/pull/5341) | **Windows PowerShell 中 `curl` 别名导致天气技能失败**：`Invoke-WebRequest` 替代原生 curl 导致首个命令失败 | 🟡 有 fix PR（待合并，有 conflict） |

**稳定性趋势**：今日修复集中在 Telegram、Gateway 进程管理和 provider fallback 三个子系统。特别是 Telegram 轮询卡死的完整修复已合并，对生产用户是一大利好。但 #4864 这类可能造成无限循环的高严重度问题仍未解决，需要维护者关注。

## 6. 功能请求与路线图信号

今日出现以下功能信号：

- **[#5409 混合支出防火墙（Hybrid Spend Firewall）](https://github.com/HKUDS/nanobot/issues/5409)**：建议引入双模式支出控制——为普通用户设置硬性上限，为高级用户提供更细粒度的配额和预警机制。当前无对应 PR，但该建议与商业化方向强相关，可能被纳入路线图讨论。

- **[#5358 通过 @提及 实现会话间消息传递](https://github.com/HKUDS/nanobot/pull/5358)**：为 WebUI 持久化会话分配稳定的服务端 @名称，支持跨会话消息发送，并提供 `list_sessions` / `send_session_message` 轻量接口。该 PR 待合并，若合入将是 WebUI 协作能力的重要扩展。

- **[#5408 WebUI 跟进建议（follow-up suggestions）](https://github.com/HKUDS/nanobot/pull/5408)**：在成功的对话回合后生成临时的、会话相关的后续建议。采用 provider 中立的行协议，且与 DeerFlow 交互一致（空输入即时发送、已有草稿追加）。标注 `conflict`，需要先解决冲突。

- **[#5364 WebUI 临时侧边对话（side conversations）](https://github.com/HKUDS/nanobot/pull/5364)**：`/side` 命令开启与当前主题并行的临时会话，支持多个侧边对话、独立草稿/消息/流式状态、主对话与侧边同时并行发送。这是一个较大的交互功能，标注 `conflict`。

- **[#5411 CLI 本地 agent 运行时隔离](https://github.com/HKUDS/nanobot/pull/5411)**：将 `nanobot agent` 重构为原生 TUI 与本地 Python 执行的统一分发器，集中管理一次性命令和兼容性提示，移除未发布的 `--no-tui` 别名，保留 `--classic` 逃生通道。

**路线图判断**：WebUI 交互层正在密集迭代（侧边对话 + 会话消息传递 + 跟进建议），加上已合并的 TypeScript TUI，下一版本可能带来显著的界面/交互体验升级。成本控制相关功能目前仍是空白，但 #5409 的方向值得维护者评估优先级。

## 7. 用户反馈摘要

- **工具参数序列化变化引发兼容性焦虑（#4864 评论）**：用户指出“这可能是 nanobot gateway 在最近一次更新中工具参数序列化方式变化导致的 bug”。评论中透露出对“上游变更破坏下游工具兼容”的担忧，希望维护者更谨慎地处理 gateway 序列化兼容层。该 Issue 持续 40 天未修复，用户可能已产生挫败感。

- **生产环境稳定性是核心诉求（#5171 用户报告）**：用户描述了“瞬时网络故障后机器人永久停止收消息，进程还在运行、日志完全静默”的现象。这说明用户已将其用于生产环境，对“静默失败”零容忍。修复方案合并后，这类问题的处理方式值得在发布说明中详细介绍，以增强社区信心。

- **商业化场景下的成本焦虑（#5409）**：用户以“power users running infinite loops and bankrupting your LLM budget”描述 Agent 框架的预算风险。这里隐含两层诉求：一是框架需要内置成本防火墙，二是用户期望在功能与成本之间获得更透明的控制权。

## 8. 待处理积压

以下 Issue/PR 长期未解决或在等待处理，需要维护者关注：

- **[#4864 — Endless loop for complete_goal（开放 40 天）](https://github.com/HKUDS/nanobot/issues/4864)**：高严重度无限循环 bug，讨论活跃（7 条评论）但无关联修复 PR。这是当前积压中最值得优先处理的问题。

- **[#5341 — weather workflow Windows-safe（开放 6 天，标记 conflict）](https://github.com/HKUDS/nanobot/pull/5341)**：修复 Windows 上 `curl` 别名问题的 PR 已存在一周，因冲突尚未合并。该问题影响 Windows 用户开箱即用体验，建议尽快处理。

- **[#5364 — temporary side conversations（开放 5 天，标记 conflict）](https://github.com/HKUDS/nanobot/pull/5364)**：大型 WebUI 功能 PR 已搁置数日且存在冲突，若合入将显著增强 WebUI 的多任务能力。与之类似的 #5408 也有冲突。维护者需要安排时间解决合并冲突。

---

> 📊 **项目健康度总结**：NanoBot 今日开发活跃度高，PR 合入率高（5/15），Telegram 稳定性修复完成闭环，新功能储备丰富（TypeScript TUI 合入、WebUI 多项增强等待合并）。主要风险在于：① #4864 高严重度 bug 长期未修；② 多个 PR 出现 `conflict` 需要协调；③ 无新版本发布，合入的修复无法通过正式渠道触达用户。建议尽快发布一个 patch/minor 版本，将今日合入的稳定性修复和 CLI 新特性带给用户。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-18

**数据窗口**：2026-08-17 至 2026-08-18（GitHub 数据快照）  
**数据来源**：NousResearch/hermes-agent

---

## 1. 今日速览

项目整体活跃度极高：过去 24 小时产生 50 条 Issue 更新（新开/活跃 41 条，关闭 9 条）与 50 条 PR 更新（待合并 34 条，已合并/关闭 16 条），另发布 1 个 patch 版本 v0.20.3（v2026.8.16.2），汇总了自 v0.20.2 以来约 125 个 PR。社区讨论高度集中于大型重构追踪（#78647，74 条评论）、Webhook 功能包（#84834，17 条评论）以及 Windows 更新阻塞问题（#86093，8 条评论+2 👍）。值得关注的风险信号：34 个 PR 处于待合并状态（约 68%），合并积压偏高；4 个 P1 级 Bug 仍然开放（#86093、#79742、#88655、#88654），其中两个为今日新报。项目整体呈"大版本稳定迭代 + 高频社区反馈 + 稳定性修复追赶"的健康态势。

---

## 2. 版本发布

### v2026.8.16.2 — Hermes Agent v0.20.3（2026年8月16日）

| 项目 | 内容 |
|------|------|
| 版本类型 | Patch 版 |
| 发布时间 | 2026-08-16 |
| Release 链接 | [Hermes Agent v0.20.3 (v2026.8.16.2)](https://github.com/NousResearch/hermes-agent/releases) |
| 核心内容 | 将自 v0.20.2 以来约 125 个 PR 汇总为稳定的 tagged release |
| 服务对象 | 下游消费者（Docker 镜像、托管部署、全新安装） |

**破坏性变更**：当前 Release Notes 仅提供概述信息（数据截断），未列出具体破坏性变更。鉴于该版本为 patch release 且汇总了 125 个 PR，建议下游用户在升级前查阅完整 Release Notes 以确认是否有配置格式或行为变更。

**迁移提示**：无明确说明。建议部署用户关注同日的 #88654（自动重启失败导致混合版本 gateway）问题，该问题在 v0.20.2 上出现，升级到 v0.20.3 时应确保 gateway 进程完全重启而非部分刷新。

---

## 3. 项目进展

今日合并/关闭 16 个 PR，但由于数据列表只展示评论数最多的 20 条，以下为可见的已关闭/合并 PR：

### 已关闭/合并 PR

- **[#61033 fix(desktop): avoid local profile REST backend spawns](https://github.com/NousResearch/hermes-agent/pull/61033)** — 修复 [#61023](https://github.com/NousResearch/hermes-agent/issues/61023)：Hermes One 桌面应用在多 profile 存在时启动两个 dashboard 后端的问题。该 PR 解决了多 profile 下 `hermes:api` 代理将每个 `request.profile` 视为后端进程路由键，导致 profile 级启动/配置/会话读取触发 `ensureBackend` 的重复启动问题。**这是今日合并清单中唯一可见的功能性修复 PR**，直接消除重复 RAM 消耗和"Configuration issues detected"误报。

- **[#88720 fmt(js): npm run fix auto-fix](https://github.com/NousResearch/hermes-agent/pull/88720)** / **[#88714 fmt(js): npm run fix auto-fix](https://github.com/NousResearch/hermes-agent/pull/88714)** — 均为 `auto-fix lint issues & formatting` 工作流自动生成的代码格式化 PR，CI 通过后自动 squash 合并。

### 方向性判断

v0.20.3 的发布意味着约 125 个 PR 正式转入稳定渠道。从今日开放 PR 的内容分布看，项目下一步聚焦于四条主线：

1. **跨网关 Bot-to-Bot 通信**（#88725 `hermes peer`）
2. **技能系统安全与同步**（#88719 external_repo、#88704 trust sidecar、#88573 NVIDIA SkillEvaluator、#88700 worktree 信任规范化）
3. **压缩与 Codex 兼容性修复**（#88717、#88722）
4. **Discord 消息链路控制**（#88723、#88724）

---

## 4. 社区热点

### 热度最高的讨论

| 排名 | Issue/PR | 评论数 | 状态 | 主题 |
|------|----------|--------|------|------|
| 1 | [#78647 Large-file decomposition: 20/20 done](https://github.com/NousResearch/hermes-agent/issues/78647) | 74 | CLOSED | 仓库级 god-file 分片史诗，宣布 20/20 全部完成 |
| 2 | [#84834 Webhook Feature Package — graph-gated repair](https://github.com/NousResearch/hermes-agent/issues/84834) | 17 | OPEN | Webhook 全链路修复的 meta-issue 追踪器 |
| 3 | [#86093 Windows: hermes update always fails](https://github.com/NousResearch/hermes-agent/issues/86093) | 8 + 2 👍 | OPEN | Windows 平台 `hermes update` 总是失败 |

### 需求分析

**#78647（74 条评论，今日关闭）**是本轮讨论焦点。该 issue 确立并执行了一条 repo 级政策：**"所有 god files 必须分片，且永远不允许回退"**。20/20 子任务全部完成。高评论数反映了社区对大型代码库拆分、共享接口设计的高关注度，这也是后续 Webhook Feature Package（#84834）等大型重构的方法论基础——5×2×3（5 类入口 × 2 种执行模式 × 3 个交付阶段）的 graph-gated 修复方式。

**#86093（Windows 更新失败 +2 👍）**是当前用户痛点最集中的问题。其根因是 Windows 不允许重命名正在运行的 exe，而 quarantine 机制`_quarantine_running_hermes_exe`基于"Windows 允许重命名运行中可执行文件"的错误假设，导致更新流程每次都在依赖安装步骤失败，且重启调度的 quarantine 永远不会释放锁，进一步污染 `PendingFileRenameOperations`。2 个 👍 说明这并非个例，加上 #88654（更新后混合版本 gateway 静默失败）和 #88168（大小写冲突文件导致 Windows checkout 永久 dirty），**Windows 平台的安装/更新机制已经成为全项目最集中的口碑负面点**。

---

## 5. Bug 与稳定性

### P1 级（严重，需立即关注）

| Issue | 标题 | 状态 | 是否有 fix PR | 备注 |
|-------|------|------|---------------|------|
| [#86093](https://github.com/NousResearch/hermes-agent/issues/86093) | Windows: hermes update always fails（live hermes.exe 无法重命名；reboot-scheduled quarantine 永不释放锁并污染 PendingFileRenameOperations） | OPEN | 无 | 今日社区热度最高 |
| [#79742](https://github.com/NousResearch/hermes-agent/issues/79742) | hermes_state: 长期 SessionDB 在 reader 线程死亡时泄漏 per-thread WAL 读连接（fd 耗尽 → EMFILE） | OPEN | 无 | 8/5 创建，已持续 13 天未关闭 |
| [#88655](https://github.com/NousResearch/hermes-agent/issues/88655) | Scheduler 层 cron 处理错误绕过 failure_nudge 告警——任务可静默死亡数小时 | OPEN | 无 | 今日新报；直接关联 #88654 |
| [#88654](https://github.com/NousResearch/hermes-agent/issues/88654) | Updater 的 gateway 自动重启可静默失败（PID→profile 映射），留下混合版本 gateway | OPEN | 无 | 今日新报；用户实际遭遇生产事故 |

### P2 级（中等严重度）

| Issue | 标题 | 状态 | 是否有 fix PR |
|-------|------|------|---------------|
| [#88713](https://github.com/NousResearch/hermes-agent/issues/88713) | `/save` 崩溃：`'GatewayRunner' object has no attribute 'get_adapter'` | OPEN | 无（标记 duplicate） |
| [#87654](https://github.com/NousResearch/hermes-agent/issues/87654) | Vision 工具（vision_analyze/browser_vision）在首次探测后消失——`_AuxProbeClientStub` 被缓存在 `_get_cached_client` | OPEN | 无 |
| [#88695](https://github.com/NousResearch/hermes-agent/issues/88695) | Codex OAuth 窗口已提升至 900K，但原生 compaction 仍在 200K 触发 | OPEN | **[#88717](https://github.com/NousResearch/hermes-agent/pull/88717)**、**[#88722](https://github.com/NousResearch/hermes-agent/pull/88722)** 均已提交（仍开放） |
| [#72716](https://github.com/NousResearch/hermes-agent/issues/72716) | 中断的 demote 后 optimize-storage 可写入空 FTS，导致历史消息永久无法搜索 | OPEN | 无 |
| [#88168](https://github.com/NousResearch/hermes-agent/issues/88168) | contributors/emails/ 下大小写碰撞文件导致 Windows git status 永久 dirty | OPEN | 无 |
| [#87823](https://github.com/NousResearch/hermes-agent/issues/87823) | "Read Aloud Replies" 每条消息触发两次 TTS 合成与播放（临时→规范 ID 变更导致） | OPEN（标记 duplicate） | 无；与 #86601 疑似同一根因 |
| [#86601](https://github.com/NousResearch/hermes-agent/issues/86601) | Desktop auto-TTS 在播放结束后立即从头再读一遍 | OPEN | 无 |
| [#53666](https://github.com/NousResearch/hermes-agent/issues/53666) | `clarify` 工具提示不渲染在聊天界面，用户看不到问题，回复为空 | OPEN | 无 |

### 今日关闭的 Bug

- **[#88540](https://github.com/NousResearch/hermes-agent/issues/88540)**（cross-profile bot 切换间歇性落到空白新聊天路由）— 关闭，标记 needs-repro
- **[#88200](https://github.com/NousResearch/hermes-agent/issues/88200)**（BOTS sidebar 预览显示错误的会话内容）— 已关闭
- **[#88146](https://github.com/NousResearch/hermes-agent/issues/88146)**（intro 失败或缺 pin 时 Bot Chat 被替换）— 已关闭
- **[#61023](https://github.com/NousResearch/hermes-agent/issues/61023)**（双 dashboard 后端）— 已关闭（由 #61033 修复）
- **[#4775](https://github.com/NousResearch/hermes-agent/issues/4775)**（Hermes 重写 config.yaml 展开默认值与 env secrets）— 已关闭（4/3 创建，历时 4 个多月）

### 稳定性小结

今日新报 4 个 P1/P2 bug，均为真实环境用户遇到的生产级问题。其中最值得注意的是 **#88654 与 #88655 的组合**：一次 in-place 更新导致 gateway 混合代码版本运行 5 小时，scheduler 层错误没有被 failure_nudge 捕获，cron 任务静默死亡。这类"更新机制自身缺陷引发次生故障"的模式与 #86093（Windows 更新失败）共同指向一个系统性短板——**安装/更新/部署路径缺乏事务性保障**。社区维护者 andrexibiza 在 #88683 中提出了对应的架构改进方案（见下节）。

---

## 6. 功能请求与路线图信号

### 今日新提交的功能请求/架构提案

| Issue/PR | 标题 | 类型 | 潜在影响 |
|----------|------|------|----------|
| [#88683](https://github.com/NousResearch/hermes-agent/issues/88683) | [Architecture]: make install/update/bootstrap obey one transactional deployment plan | 架构 feature | 直击 #86093/#88654 的根因；将 3 条路径统一到单一事实源 |
| [#88688](https://github.com/NousResearch/hermes-agent/issues/88688) | Cron/session recovery: fence reconciliation by exact ownership generation | 架构 feature | 解决恢复操作与后继 owner 之间的竞态；与 #72716、#79742 相关 |
| [#88706](https://github.com/NousResearch/hermes-agent/issues/88706) | [Security]: Close use-time, provenance, and authority gaps behind #88232 / #88435 | 安全加固 | 十部分安全加固战役的补充提案 |
| [#88698](https://github.com/NousResearch/hermes-agent/issues/88698) | [MCP]: Close dual-era protocol boundary correctness and conformance gaps | 兼容性修复 | MCP 2.0 SDK + 1.x 兼容 + 新旧 handshake 并存的三重边界问题 |
| [#86950](https://github.com/NousResearch/hermes-agent/issues/86950) | ByteDance (TikTok Business + Douyin) Plugin Integration Feature Package | 插件集成 | 4 个标准插件（TikTok Business Messaging、Organic、OBA publishing、Douyin） |

### 可能与下一版本相关的新功能 PR

- **[#88725 feat(cli): hermes peer — bot-to-bot DMs across machines and gateways](https://github.com/NousResearch/hermes-agent/pull/88725)** — 跨机器/跨网关的直接 Bot DM，无需桌面端参与。这是 Bot Mode 生态的关键扩展，teknium1 提交。
- **[#88719 feat(skills): add skills.external_repo for git-backed shared skills](https://github.com/NousResearch/hermes-agent/pull/88719)** — 通过单一 git 仓库在服务器/笔记本/桌面间同步技能，shallow-clone + `git pull --ff-only`。与 [#48970 EPIC（项目本地 .hermes/）](https://github.com/NousResearch/hermes-agent/issues/48970)方向一致。
- **[#88704 feat(skills): project-trust sidecar with per-skill fingerprints and sticky deny](https://github.com/NousResearch/hermes-agent/pull/88704)** — `~/.hermes/project-trust.json` 侧车文件，按 SKILL.md 的 sha256 指纹管理信任，git pull 变更后自动停止加载并提示重新批准。
- **[#88573 feat: advisory NVIDIA SkillEvaluator Tier 1 scan on skill installs](https://github.com/NousResearch/hermes-agent/pull/88573)** — 技能安装时运行 NVIDIA SkillEvaluator Tier 1（PII、unicode smuggling、脚本 lint）作为咨询性第二意见。
- **[#88716 fix(webui): make Kanban usable on mobile](https://github.com/NousResearch/hermes-agent/pull/88716)** — Dashboard Kanban 移动端适配（<768px）。
- **[#85774 feat(providers): add Inworld model provider](https://github.com/NousResearch/hermes-agent/pull/85774)** — Inworld 作为一等模型提供商，OpenAI 兼容端点在 `https://api.inworld.ai/v1`。

### 路线图信号判断

从今日 PR/Issue 的密度看，**技能系统的安全与同步**（#88719、#88704、#88573、#88700 以及 #48970 EPIC）与 **跨网关 Bot 通信**（#88725）是当前社区贡献者最集中的发力点。此外，#88683 与 #88688 两个架构提案虽然在 P2/P3 级别，但如果被采纳，将从根本上改变安装/更新/恢复机制的设计——预计会进入下一阶段的路线图讨论。

---

## 7. 用户反馈摘要

### 真实用户痛点

**部署与更新（最集中的负面反馈）**

- **Windows 更新机制设计缺陷**（[#86093](https://github.com/NousResearch/hermes-agent/issues/86093)）：用户 baoyu0 明确指出 quarantine 机制基于"Windows 允许重命名运行中可执行文件"的错误假设，导致每次更新必失败，且 PendingFileRenameOperations 被持续污染。2 个 👍 表明多位 Windows 用户受到影响。
- **更新后混合版本 gateway 静默运行**（[#88654](https://github.com/NousResearch/hermes-agent/issues/88654)）：用户 subyect 描述了一次真实生产事故——16:50 UTC 更新写入时 gateway 仍在运行，文档声称"运行中的 gateway 会在更新后刷新"，但实际 PID→profile 映射失败，gateway 以混合代码版本运行了 5 小时。其直接后果是 cron 任务每 10 分钟失败一次且无告警（#88655）。
- **Windows checkout 被大小写碰撞文件污染**（[#88168](https://github.com/NousResearch/hermes-agent/issues/88168)）：`contributors/emails/agent@Agents-Mac-mini.local` 与 `agent@agents-Mac-mini.local` 仅大小写不同，Windows 上 git status 永久 dirty。1 👍。

**功能问题影响日常使用**

- **clarify 工具不可用**（[#53666](https://github.com/NousResearch/hermes-agent/issues/53666)）：用户 DEH-Codex 报告在 v0.16.0 上 clarify 提示完全不渲染，用户看不到提问、回复为空。该问题在 macOS 26.6 Electron desktop 上出现，CLI 子进程中的界面完全不可见。
- **TTS 重复播放**（[#86601](https://github.com/NousResearch/hermes-agent/issues/86601) + [#87823](https://github.com/NousResearch/hermes-agent/issues/87823)）：两位独立用户报告同一问题——auto-TTS 在播放结束后会从开头再读一遍（或一次触发两次合成请求）。#87823 被标记为 duplicate，但两个问题均为 P2/P3，尚未有修复 PR。
- **配置文件被静默改写**（[#4775](https://github.com/NousResearch/hermes-agent/issues/4775)）：用户 paraddox 报告 Hermes 会在配置变更命令运行时将合并了默认值+已展开环境变量的运行时配置对象写回 config.yaml，导致用户手写配置被破坏。该问题今日终于修复（4/3 创建，历时超 4 个月）。

**中文用户反馈**

- [#37751](https://github.com/NousResearch/hermes-agent/issues/37751)（zhang0618-RGB）：Desktop 与 Gateway 配置双写冲突，切换模型后 config.yaml 出现 `provider: dashscope + base_url: localhost:18080` 矛盾状态。此问题自 6/3 起开放，2 条评论，尚未解决的 P2 问题。

### 值得注意的正面信号

- #78647 的成功关闭（20/20 子任务完成）标志着社区主导的大型架构重构能力得到验证，为 #84834（Webhook）和 #86950（ByteDance）等后续大型 Feature Package 提供了可复用的方法论。
- 多位贡献者（teknium1、alt-glitch、simpolism）持续提交高质量 PR，如 #88725（hermes peer）、#88704（信任侧车）、#88723/#88724（Discord 链路控制），显示社区贡献生态活跃。

---

## 8. 待处理积压

以下为长期未关闭或今日可见但缺少响应的关键 Issue/PR，需要维护者重点关注：

### 高风险积压（P1 级，长时间未解决）

| Issue | 创建日期 | 已持续 | 说明 |
|-------|----------|--------|------|
| [#53666](https://github.com/NousResearch/hermes-agent/issues/53666) clarify 工具提示不渲染 | 2026-06-27 | ~52 天 | P1 且直接影响核心对话功能，至今无修复 PR |
| [#79742](https://github.com/NousResearch/hermes-agent/issues/79742) SessionDB 每线程 WAL 连接泄漏（EMFILE） | 2026-08-05 | 13 天 | P1，可能导致所有需要 SessionDB 的功能在长期进程上崩溃 |

### P2 级长期积压

| Issue | 创建日期 | 已持续 | 说明 |
|-------|----------|--------|------|
| [#53902](https://github.com/NousResearch/hermes-agent/issues/53902) v0.17.0 Renderer 卡死，GPU 98% + 13W 功耗 | 2026-06-28 | ~51 天 | Electron 渲染进程持续 fontations+temporal_rs 循环，4 倍正常功耗，仍未关闭 |
| [#61828](https://github.com/NousResearch/hermes-agent/issues/61828) install.sh --stage 协议掩蔽失败 | 2026-07-10 | ~39 天 | errexit 在 subshell 中禁用，uv venv 失败后仍报告"✓ Virtual environment ready" |
| [#72716](https://github.com/NousResearch/hermes-agent/issues/72716) 中断 demote 后 FTS 被清空 | 2026-07-27 | ~22 天 | 永久搜索数据丢失，sweeper 标记 risk-session-state，无修复 PR |
| [#37751](https://github.com/NousResearch/hermes-agent/issues/37751) Desktop 与 Gateway 配置双写冲突（中文用户） | 2026-06-03 | ~76 天 | 中文用户反馈，配置出现矛盾状态，2 条评论，缺少维护者响应 |

### 值得关注但被标记 duplicate/needs-repro 的问题

- **#88713**（`/save` 崩溃：GatewayRunner 缺 get_adapter）— 被标记 duplicate，但用户仍会撞到该错误，建议在修复目标 issue 中补充引用。
- **#88540**（cross-profile bot 切换空白路由）— 被关闭并标记 needs-repro，但该问题在多 profile 桌面用户中可能间歇复现，建议在下一个桌面版本中加以验证。

### 今日新提交但尚未有维护者响应的 P1

- **#88654**（updater 自动重启静默失败→混合版本 gateway）与 **#88655**（cron 调度错误绕过告警）均为今日新报，且描述了一个完整的故障链。建议尽快联系用户 subyect 获取 launchd 环境下的复现细节，并评估 [**#88683**](https://github.com/NousResearch/hermes-agent/issues/88683)（事务性部署计划）是否可以在短期内先给出针对性 hotfix。

---

## 附：健康度快速指标

| 指标 | 数值 | 评估 |
|------|------|------|
| 过去 24h Issue 更新 | 50 条（41 新开/活跃，9 关闭） | 高活跃；关闭率 18%，略偏低 |
| 过去 24h PR 更新 | 50 条（34 待合并，16 已合并/关闭） | 合并积压偏高（68% 待合并） |
| 新版本 | v0.20.3（汇总 ~125 PRs） | 节奏良好 |
| P1 级开放 Bug | 4 个（#86093、#79742、#88655、#88654） | ⚠️ 需要紧急关注 |
| 今日新增 P1 | 2 个（#88654、#88655） | ⚠️ 更新机制连锁故障 |
| 平均修复周期（可见样本） | #4775 历时 4.5 个月；#61023 历时 40 天 | 一般 |

---

*日报生成时间：2026-08-18 | 数据快照来自 Hermes Agent GitHub 仓库*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 2026-08-18

## 今日速览

项目今日维持中等活跃度，过去24小时内有4条Issue更新（3新开/活跃、1关闭）和4条PR更新（1待合并、3已合并/关闭），无新版本发布。核心亮点是Slack媒体上传问题（#3338）在报告当日即获得修复PR（#3340），体现了良好的响应效率；同时，上月报告的“工具重复失败导致静默无响应”问题（#3311）及其修复PR（#3312）已关闭，意味着该稳定性问题得到解决。此外，一个关于IRC长消息支持的功能请求（#3287）和微信渠道增强的PR（#2606）已关闭，但配置修复PR（#271）也已合并。总体而言，项目在Bug修复和渠道支持方面保持推进节奏。

## 项目进展

今日共合并/关闭3个PR，推进了以下工作：

- **[#3312 fix(agent): stop turn early on repeated identical tool failure](https://github.com/sipeed/picoclaw/pull/3312)**（已关闭）：修复agent在工具反复失败时静默空转至 `max_tool_iterations`、用户得不到回复的问题。该修复让agent在检测到连续相同错误时提前终止对话轮次，直接改善用户体验。
- **[#271 fix: env overrides when config.json is missing and add regression test](https://github.com/sipeed/picoclaw/pull/271)**（已关闭）：解决在无 `config.json`（如Fly部署仅用secrets/env）时环境变量覆盖未生效的问题，确保应用能正确读取配置而非回退到默认模型。此修复对容器化/云部署场景意义明显。
- **[#2606 feat: enhance Weixin channel support and configuration](https://github.com/sipeed/picoclaw/pull/2606)**（已关闭）：增强微信渠道的多实例支持和配置管理，覆盖后端、前端及文档，提升稳定性与非法名称校验能力。

值得关注的是，修复PR #3312 对应的Issue #3311 已在同日关闭，验证了该问题的解决闭环。

## 社区热点

今日最受关注的是持续讨论中的功能请求：

- **[#3287 [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**：创建于2026-07-22，今日更新，共6条评论。用户提出PicoClaw应理解IRCv3协议下超过512字节的长消息——IRC客户端会将超长消息自动拆分，而PicoClaw目前无法将其视为连贯的整体消息。该Issue虽标记为stale（已超30天无实质更新），但仍是近期讨论最多的功能请求，反映出IRC渠道用户对协议完整性的需求。

其他Issue评论数均为0或2（#3311已关闭），社区讨论活跃度整体不高。

## Bug 与稳定性

今日共有3个Bug相关Issue，按严重程度排列：

| 严重程度 | Issue | 状态 | 修复PR |
|---------|-------|------|--------|
| 高 | **[#3311 工具重复失败导致静默无响应，用户永远得不到回答](https://github.com/sipeed/picoclaw/issues/3311)**（生产环境Telegram中观察到） | 已关闭 | **已有**（#3312，已关闭） |
| 中 | **[#3338 Slack不附加图片媒体内容，上传报`file size cannot be 0`错误](https://github.com/sipeed/picoclaw/issues/3338)** | OPEN | **已有**（#3340，待合并） |
| 中 | **[#3339 Antigravity生成请求返回429配额错误，尽管OAuth和模型发现正常](https://github.com/sipeed/picoclaw/issues/3339)** | OPEN | **暂无** |

其中#3311为严重稳定性问题，已通过#3312解决；#3338的修复PR已在审查中；#3339尚未有修复PR，且错误信息缺乏配额耗尽的具体细节，可能影响Google Antigravity用户的使用。

## 功能请求与路线图信号

- **[#3287 Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**：目前唯一开放的功能请求，要求PicoClaw正确处理IRCv3下超长消息的自动拆分并视为单条消息。该需求虽已marked as stale，但结合IRCv3的广泛使用，仍可能被纳入后续版本；需维护者进行proto/协议层面的适配。

- **[#3340 fix(slack): set FileSize on media upload params](https://github.com/sipeed/picoclaw/pull/3340)**：虽为Bug修复，但其直接针对Slack `SendMedia` 功能的完整性，可视为对Slack渠道能力的增强，预计将随下一次发布合入。

- **[#2606 Weixin channel增强](https://github.com/sipeed/picoclaw/pull/2606)**：合并后微信渠道将支持多实例与更好的配置管理，体现了项目对中国本地化渠道的持续投入。

## 用户反馈摘要

- **IRC长消息场景**（#3287）：用户指出IRC客户端自动分片长消息（512字节限制），但PicoClaw未能将分片合并处理，导致上下文碎片化，影响使用体验。此诉求反映了对IRCv3协议完整性的期待。
- **Telegram部署稳定性**（#3311）：生产环境用户报告agent在git命令因凭证缺失等场景下会静默循环执行工具直到迭代上限，期间用户无任何反馈。这是对“永远得不到答案”这一严重可用性问题的直接投诉，现已通过#3312修复。
- **Slack媒体发送**（#3338）：用户报告所有图片/媒体上传均失败，根本原因是SDK直接拒绝了size=0的上传请求，且错误信息不直观——“file size cannot be 0”未指明是代码缺陷。
- **Antigravity配额误报**（#3339）：用户反馈即使OAuth权限正确、模型发现成功，所有生成请求仍统一返回429，且错误信息缺乏quota细节（无quotaId/重置时间等），难以定位是配额耗尽还是SDK参数问题。

## 待处理积压

- **[#3287 IRC长消息支持（Feature Request）](https://github.com/sipeed/picoclaw/issues/3287)**：创建于2026-07-22，已近一个月，虽有6条讨论但标记为stale且暂无PR介入。IRC渠道用户对该需求有持续关注，建议维护者评估IRCV3兼容性的优先级并明确排期。
- **[#3339 Antigravity 429错误（Bug）](https://github.com/sipeed/picoclaw/issues/3339)**：新报告1天，暂无开发响应或修复PR。需要排查SDK或API调用参数问题，避免影响Antigravity模型用户的体验。
- **长期未合并PR**：今日无长期悬置的PR被关闭，但#3340（Slack修复）作为今日新开的PR仍在待合并状态，建议尽快review并合入。

---

以上日报基于2026-08-18 GitHub数据生成，所有条目均附原始链接，供进一步查证。总体来看，PicoClaw项目今日修复了2个影响用户体验的关键问题、合并了配置与微信渠道的增强，并对Slack问题快速响应，社区反馈渠道畅通，但#3339的悬置和#3287的“stale”状态需留意，建议维护者保持对长期开放议题的关注。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-18

> 数据来源：GitHub (nanocoai/nanoclaw) | 统计窗口：2026-08-17 ~ 2026-08-18

---

## 1. 今日速览

过去 24 小时 NanoClaw 仓库呈现**高活跃度**状态：累计 39 条 PR 更新（其中 22 条已合并/关闭，17 条待合并），4 条 Issue 更新（3 条新开，1 条已关闭），无新版本发布。维护团队（core-team）今日集中推进 **channel 平台化重构**——共享 Slack 客户端库、canvas 集群、SessionDriver 驱动抽象层、hooks 注册机制等一批模块化 PR 相继落地或进入待合并队列，项目整体正处于**架构抽象与可扩展性升级**的关键阶段。社区侧亦有多个独立贡献者提交 webchat 通道、ClawMetry 运维技能、OneCLI 网关修复等 PR，社区参与度显著。稳定性方面，今日暴露了 2 个值得关注的 Bug（chat 会话中任务日志丢失、pending 消息轮询无界加载），均已出现对应 fix PR。

---

## 2. 版本发布

**无。** 今日无新版本 Release。

---

## 3. 项目进展

今日共有 22 条 PR 合并/关闭，全部集中在维护团队（core-team），主要推进了以下方向：

### 3.1 Channel 平台化：注册机制与 Hook 体系（已合并/关闭）

维护者 gavrielc 今日密集合并了一批围绕 channel 平台能力的 PR，为后续多通道扩展打下基础设施：

- **#3292** — `channels: bridge inbound-policy registration seam`：为 Chat SDK bridge 增加入站策略注册接口，通道模块可在单一拦截点包覆整个入站分发路径，无需再修改 bridge 源码即可实现 bot 生成消息等自定义策略。  
  https://nanocoai/nanoclaw/pull/3292
- **#3293** — `router: session-created hook for brand-new engaged sessions`：新增"会话创建"钩子，当 engaged 消息创建新会话时通知已注册模块，携带消息组、线程 id、会话模式、触发消息等上下文，通道模块可借此完成线程命名、会话引导等平台特有初始化。  
  https://nanocoai/nanoclaw/pull/3293
- **#3294** — `delivery: post-delivery hook with first-delivery context`：在外发 drain 循环中新增投递后钩子，带 first-delivery 标记，供通道模块在会话首条外发消息后执行一次性引导动作。  
  https://nanocoai/nanoclaw/pull/3294
- **#3295** — `channels: generic membership-event hook on the Chat SDK bridge`：将 chat 4.29.0 的 `onMemberJoinedChannel` 成员加入事件转发至统一 handler，实现 adopt-on-invite、detach tracking 等房间成员行为，无需改动 bridge 源码。  
  https://nanocoai/nanoclaw/pull/3295
- **#3304** — `channels: adapter-declared session-mode context defaults`：允许 adapter 为每个 context 声明默认 sessionMode（`shared` / `per-thread`），使以线程形态呈现会话的平台可声明"每线程一个会话"，替代 call site 硬编码。  
  https://nanocoai/nanoclaw/pull/3304

### 3.2 容器内扩展能力（已合并/关闭）

- **#3296** — `agent-runner: extendTool — additive MCP tool schema and description extension`：为容器 MCP 工具注册表新增 `extendTool(name, {properties, passthroughKeys, descriptionSuffix})` 扩展点，已安装模块可增量扩展基础工具的 input schema、描述与 payload 透传键，无需修改基础工具源码。  
  https://nanocoai/nanoclaw/pull/3296

### 3.3 Setup 向导扩展（已合并/关闭）

- **#3297** — `setup: per-channel pre-step and companion-skill declarations for the wizard`：为 setup wizard 增加两个通用扩展点——per-channel 预置步骤（在安装技能前以编程方式绑定凭据等输入）与 per-channel 伴随技能声明（主安装后应用）。  
  https://nanocoai/nanoclaw/pull/3297

### 3.4 进行中的架构推进（待合并）

- **#3306** — `drivers: a session-runtime driver seam, with Docker as the built-in realization`：新增 `src/drivers/` 模块，建立"会话是什么"与"如何运行"之间的驱动抽象层，Docker 作为内置实现。纯新增、无调用点变更、当前提交下全量测试通过。  
  https://nanocoai/nanoclaw/pull/3306
- **#3307** — `host: route session lifecycle through the driver seam`：基于 #3306，将会话生命周期（spawn、adoption、supervision、stop、restart/rebuild）从内联 docker argv 组装重构为通过 `SessionDriver` seam 路由，`NANOCLAW_RUNTIME_DRIVER` 目前解析到内置 Docker driver，选择机制目前处于休眠状态。  
  https://nanocoai/nanoclaw/pull/3307
- **#3305** — `slack: shared channel-layer library + canvas cluster (wave A, includes main sync)`：将 main 同步进 channels 分支，落地 channel-layer 前两个模块：共享 Slack Web API 客户端 + token-key 约定（`src/channels/slack-lib.ts`），以及 canvas 集群（canvas actions 模块，通过既有注册机制接入）。  
  https://nanocoai/nanoclaw/pull/3305
- **#3308** — `groups: refuse to create a group over a folder that already exists undisposed`：叠加于 #3306，增加两个拒绝逻辑，避免在已存在未清理文件夹上创建新 agent group 导致数据采用（data-loss）问题。  
  https://nanocoai/nanoclaw/pull/3308

> **评估**：今日合并的 PR 标志着项目从"单体 channel 逻辑"向"模块化注册 + Hook 扩展"架构转型进入实质交付阶段。SessionDriver 抽象层与 driver 选择机制为未来非 Docker 运行时（如本地进程、远程容器等）铺平道路，具备明确的路线图意义。

---

## 4. 社区热点

今日仓库整体评论量偏低，热门讨论集中于**少数高 signaling 的 Issue** 与**社区功能重叠 PR**：

### 4.1 讨论最集中的 Issue

- **#3203** `codex provider emits an undeclared file ProviderEvent — /add-codex fails typecheck on main, and generated images are dropped`（作者 mshirel，已有 1 条评论，创建于 08-08，今日有更新）  
  https://nanocoai/nanoclaw/issues/3203  
  该 issue 同时涉及**类型系统破坏**与**功能静默失效**（codex 生成的图片被丢弃），是代码质量与用户体验双重问题，社区关注度高但维护者尚未正式回复。

- **#1143** `[CLOSED] Bug: Skills docs reference /data/env path that no longer exists`（作者为 triage bot，2 条评论）  
  https://nanocoai/nanoclaw/issues/1143  
  虽然是文档类问题且已关闭，但其暴露了一个事实：**文档路径更新滞后于仓库结构变更**，误导了跟随 skill 文档操作的用户。

### 4.2 社区功能重叠：Webchat 通道出现双 PR

社区与维护团队同日提交了两个功能重叠的 Webchat 方案，形成值得关注的热点：

- **#3290**（viiluxx）`Add webchat channel: local browser chat via native HTTP bridge`：纯自包含页面 + Node `http` builtin JSON API，零 npm 依赖，由 daemon 自行托管。此 PR 为**社区独立提交**，早于维护团队方案数小时。  
  https://nanocoai/nanoclaw/pull/3290
- **#3298**（amit-shafnir，core-team）`feat(channels): add local web chat`：loopback-only 的 Local Web channel adapter，附带小型浏览器聊天 UI。  
  https://nanocoai/nanoclaw/pull/3298

> **分析**：Webchat 通道双 PR 说明"本地浏览器聊天"是社区与维护者共同认可的高优先级缺口——当前所有对话入口（除一次性 CLI 外）均依赖外部服务。两方案设计取向不同（零依赖原生 HTTP vs channel adapter 体系），是否合流或择优合并将是近期关注点。

---

## 5. Bug 与稳定性

按严重程度排列：

### 5.1 [严重] Chat 会话中触发的任务导致日志丢失、回复被吞（#3301）

- **现象**：自 #2988（one-door task delivery, 2.1.48）以来，在 chat 会话中触发的 `kind='task'` 行会将整个查询切换为 task 模式，产生三类后果：**运行日志丢失、回复被吞、任务系列不在列表中展示**。受影响的场景包括 2.1.48 之前创建并残留在 chat 会话里的所有任务行（作者称其安装实例中所有任务均受影响）。  
  https://nanocoai/nanoclaw/issues/3301
- **修复 PR**：#3303 `fix(tasks): keep run logs for task rows firing in chat sessions`（作者 glifocat）——修复 runner 的 `task_log` 行只携带 `text` 字段导致 host 无法派生 series 的问题。  
  https://nanocoai/nanoclaw/pull/3303  
  *状态：fix PR 已提交，待 review/merge。*

### 5.2 [中等] pending-message 轮询无界加载（#3289）

- **现象**：`getPendingMessages()` 在 `main` 分支（commit `1e149b3`）将**所有到期的 pending 行全部载入 JavaScript** 后才应用 `max` 限制，在积累大量积压时会造成内存与 CPU 尖峰，属于可观测的性能回归风险。  
  https://nanocoai/nanoclaw/issues/3289
- **修复 PR**：#3291 `fix: bound pending message polling`（作者 glifocat）——为 pending 轮询增加边界控制。  
  https://nanocoai/nanoclaw/pull/3291  
  *状态：fix PR 已提交，待 review/merge。*

### 5.3 [中等] codex provider 未声明 `file` ProviderEvent，类型检查失败且图片被丢弃（#3203）

- **现象**：`codex` provider 在 `providers` 分支发出未在 `ProviderEvent` 中声明的 `file` 事件，导致 `/add-codex` 在 main 上容器 typecheck 失败；且无任何消费者处理该事件，codex 生成的图片即使编译通过也会被静默丢弃。  
  https://nanocoai/nanoclaw/issues/3203
- **相关 PR**：#3299（chiptoe-svg）`fix(add-codex): bump @openai/codex pin 0.138.0 → 0.146.0`——该 PR 解决的是 GPT-5.4 于 2026-08-31 退役导致的默认模型失效问题，与 #3203 的 ProviderEvent 声明缺失**不是同一问题**，但同属 codex 链路稳定性修复。  
  https://nanocoai/nanoclaw/pull/3299  
  *#3203 本身尚无对应 fix PR。*

### 5.4 [低] 文档路径失效（#1143，已关闭）

- **现象**：多项 skill 文档仍引用已删除的 `/data/env` 路径，导致用户按文档操作失败。由 triage bot 报告并已关闭，说明修复已合入。  
  https://nanocoai/nanoclaw/issues/1143

---

## 6. 功能请求与路线图信号

今日无独立的新功能请求 Issue 提交，但 PR 侧释放出清晰的路线图信号：

| 方向 | 信号 | 纳入下一版本可能性 |
|---|---|---|
| **本地 Webchat 通道** | 社区 PR #3290 与 core-team PR #3298 同日提交，说明维护团队已将该能力列入开发计划，且社区需求强烈 | 高——两个 PR 都在待合并队列中 |
| **Session 运行时抽象（非 Docker）** | #3306 `drivers` seam + #3307 会话生命周期通过 driver 路由，`NANOCLAW_RUNTIME_DRIVER` 环境变量已预留 | 高——已进入核心开发主线，可能是 2.2 或 2.3 的重要架构升级 |
| **Group / 文件夹安全防护** | #3308 拒绝在已存在未处理文件夹上创建新 group，防止数据被静默采用 | 高——数据安全类修复，预计随 driver seam 一并合并 |
| **ClawMetry 运维仪表盘** | #3288 社区新增 `/add-clawmetry` 技能，提供只读本地仪表盘与 NanoClaw session adapter，弥补 FAQ 仅靠对话调试的不足 | 中——取决于维护团队对运维生态的规划 |
| **CLI 结构化输入支持** | #3218 为 host 与 container 的 `ncl` 客户端新增 `--stdin-json` 有界输入模式，不改变现有 request frame 与授权行为 | 中——功能完整且侵入性低，但已等待 9 天未获维护者响应 |

---

## 7. 用户反馈摘要

> 今日 Issues 评论量整体较少（仅 #1143 有 2 条、#3203 有 1 条），以下提炼自 Issue 描述与对应 PR 中透露的真实用户场景：

- **文档路径失效问题已实际影响操作**（来自 #1143）：triage bot 在报告中提到 "Users following skill instructions..."，说明已有真实用户按文档执行 `/data/env` 配置环境变量时失败。该问题已关闭，但提示维护者需加强**文档与仓库结构变更的同步机制**。

- **Chat 会话中存量任务行被"连坐"**（来自 #3301）：用户 glifocat 明确表达其安装实例中 2.1.48 之前创建的任务行全部残留在 chat 会话中，升级后这些历史任务全部遭遇日志丢失与回复被吞。这属于**升级回归**对存量数据的影响，用户对平滑升级的诉求明显。

- **Codex 生成图片被静默丢弃**（来自 #3203）：用户 mshirel 指出 codex 链路不仅编译失败，即使修复类型错误后，生成图片也会因无消费者而丢失。这类静默失败比显式报错更让用户困扰，容易被误判为模型未正确生成。

- **运维可观测性缺口**（来自 #3288 作者 vivekchand）：用户反馈 FAQ 推荐的调试方式就是"ask Claude Code"，这在单点诊断时有效，但无法满足"阅读会话、扫描跨 agent 的隔夜活动"这类日常运维需求，因此社区选择自建 ClawMetry 仪表盘。

---

## 8. 待处理积压

以下为长期未获维护者正式响应或存在停滞风险的重要条目，建议维护团队关注：

### 8.1 重要 Issue 积压

- **#3203** `codex provider emits an undeclared file ProviderEvent`  
  创建于 2026-08-08，**已 10 天未获维护者正式回复**。该问题兼有类型检查失败与图片静默丢失双重影响，且 `providers` 分支长期无人认领，存在功能腐烂风险。  
  https://nanocoai/nanoclaw/issues/3203

### 8.2 长期未合并的社区 PR

- **#3218** `feat(cli): accept bounded JSON from stdin`（作者 zvi-fried）  
  创建于 2026-08-09，已开放 9 天，PR 描述完整、测试说明充分，但无维护者评论。属于低侵入、高实用性的功能，建议尽快 review。  
  https://nanocoai/nanoclaw/pull/3218

- **#3288** `Add /add-clawmetry skill`（作者 vivekchand）  
  已开放 1 天但属于社区自建运维技能，设计完整且填补官方空白，值得纳入评估。  
  https://nanocoai/nanoclaw/pull/3288

### 8.3 今日新增待 review 的 Bug 修复 PR（优先度建议高）

- **#3303** — 修复 chat 会话中任务日志丢失/回复被吞（对应 #3301，影响存量用户）  
  https://nanocoai/nanoclaw/pull/3303
- **#3291** — 修复 pending 消息轮询无界加载（对应 #3289，积压场景性能和稳定性风险）  
  https://nanocoai/nanoclaw/pull/3291

---

**日报生成时间**：2026-08-18  
**数据窗口**：2026-08-17 ~ 2026-08-18（24 小时）  
**活跃度评级**：🟢 高活跃（39 PR / 4 Issues / 0 Release）

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

## NullClaw 项目动态日报 — 2026-08-18

### 1. 今日速览

过去24小时内，NullClaw 项目整体处于**低活跃度**状态：无新开或关闭的 Issue，唯一动态是一条由 Dependabot 发起的依赖升级 PR（#956），目前仍处于待合并状态。无新版本发布。从近期数据看，项目核心开发节奏有所放缓，当前主要的维护动作集中在 Docker 基础镜像的例行升级上。建议关注后续是否有功能型 PR 或 Issue 进入活跃周期。

---

### 2. 版本发布

**无**（近24小时无新 Release）。

---

### 3. 项目进展

**#956（待合并）**：[ci(deps): bump alpine from 3.23 to 3.24 in the docker-images group](https://github.com/nullclaw/nullclaw/pull/956)

- **类型**：依赖维护 / CI
- **内容**：将 Docker 基础镜像 `alpine` 从 3.23 升级至 3.24，属常规安全与稳定性更新。
- **状态**：尚未合并，等待维护者 review。
- **影响评估**：该 PR 不涉及功能改动，但对项目构建链的安全性与长期可维护性有积极意义。由于当前积压 PR 较少，**建议维护者尽快 review 并合并**，以降低依赖链风险。

> 整体来看，今天没有合并或关闭重要功能 PR，项目核心功能无新增推进。健康度信号偏中性，需警惕长期低活跃可能带来的社区关注度下降。

---

### 4. 社区热点

**无**。过去24小时内无新增 Issue，唯一 PR #956 无评论，无 👍 反应，未形成实质讨论。

> 项目社区讨论热度极低，建议维护者关注社区活跃度下降的问题，考虑周期性发布项目进展或主动引导议题。

---

### 5. Bug 与稳定性

**无**。过去24小时内**未报告**新的 Bug、崩溃或回归问题。这既可能是代码稳定性良好的信号，也可能与当前活跃度低有关。

**已知待关注**：`alpine` 版本陈旧属于潜在隐患，PR #956 已覆盖此问题，等待合并。

---

### 6. 功能请求与路线图信号

**无新功能请求**。近24小时无用户提交 Feature Request。结合已有 PR 推测，项目短期内主要精力放在**基础设施维护**（Docker 镜像升级）上，无明确的新功能路线图信号。

> 对于 AI 助手类项目，建议在社区中主动收集用户对「工具调用效率」「上下文管理」「多模态能力」等的需求，为下一版本规划储备方向。

---

### 7. 用户反馈摘要

**无可用数据**。近24小时无 Issue 评论，无法提取用户真实痛点或使用反馈。这可能是项目活跃度降低的直接体现。

> 由于 PR #956 无评论，无法判断社区对自动依赖升级的态度。建议项目组考虑定期推送使用调查或开展用户访谈，以维持反馈闭环。

---

### 8. 待处理积压

| 项目 | 编号 | 创建时间 | 最后更新 | 备注 |
|------|------|----------|----------|------|
| PR：bump alpine 3.23→3.24 | [#956](https://github.com/nullclaw/nullclaw/pull/956) | 2026-06-15 | 2026-08-17 | 已滞留约2个月，待维护者 Review |

> **提醒**：PR #956 自6月15日创建至今已超过两个月仍未合并，虽是例行依赖更新，但长时间挂起可能导致后续冲突或安全风险累积。建议维护者纳入近期处理清单。

---

**报告日期**：2026-08-18  
**数据来源**：GitHub API（nullclaw/nullclaw）  
**分析师意见**：项目当前处于**维护期而非发展期**，活跃度显著偏低。单一依赖 PR 不足以支撑社区热度，建议项目团队审视开发节奏，考虑公开路线图或启动新功能周期，以恢复社区参与度。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-18

## 1. 今日速览

项目过去 24 小时保持高强度迭代：共 28 条 Issue 更新（新开/活跃 22、关闭 6），44 条 PR 更新（待合并 28、已合并/关闭 16），无新版本发布。开发主线集中在两方面：一是围绕 DB 写入压力优化 epic #7591 的多个子任务密集推进，从理论估算走向具体实现与安全性验证（#7707 的拆出即源于集成测试对原方案的否决）；二是通知系统全面重构为持久化、可操作的用户收件箱（#7687–#7691、#7706），预示着一轮客户端与服务端能力的协同升级。QA 侧报告了 3 个 P2 级 bug（#7716、#7715、#7714），其中 libSQL 写通道饥饿问题（#7714）在 24 小时内就产出了修复 PR #7717，响应速度值得肯定。整体项目健康度良好，读写压力优化的收益与风险正在被认真验证，而非盲目上线。

## 2. 版本发布

过去 24 小时无新版本发布（Latest Releases 为空）。

## 3. 项目进展

今日合并/关闭的 PR 共 16 条，以下为关键项：

- **[#7663 [CLOSED] fix(release): forward-port 1.2 fixes and thread repair](https://github.com/nearai/ironclaw/pull/7663)** — 将 1.2 版本中已验证的修复（Windows 文件系统/发布冒烟可靠性、Windows JSON 输出清理、healthcheck 的 runtime curl、稳定的 1.2.0 元数据）forward-port 到当前 main，并完成线程索引的一次性修复。这直接提升了发布分支的健壮性和跨平台兼容性。
- **[#7710 [CLOSED] fix(slack): address multi-agent review findings on #7682](https://github.com/nearai/ironclaw/pull/7710)** — 针对 Slack 未链接用户连接提示 PR（#7682）的多智能体评审意见（review 4951078746），在 WebUI connect-link 落地页加固（7 项发现，包括扩展 ID 校验）、浏览器历史记录清理等方向进行了补充修复。该 PR 被关闭并折叠进 #7682，避免分叉。
- **[#7703 [CLOSED] feat(wasm): typed WIT tool response and bundled guest migration](https://github.com/nearai/ironclaw/pull/7703)** — 能力响应规范化栈（#7627）的 PR 3，用 typed WIT 契约替换 WASM 工具的错误通道。关闭原因是被 [#7711](https://github.com/nearai/ironclaw/pull/7711) 取代并内含了 0.3.0 兼容 shim 的删除逻辑，避免先加后删的 churn。

这些关闭表明：**发布质量修复（#7663）正式并入主线，Slack 隐私体验修复的评审闭环已完成，WASM 响应规范化进入最终合成阶段（#7711）。**

此外，有一批高风险高价值 PR 处于待合并状态，预示着下一版本功能矩阵将显著扩容：

- [#7717 fix(resources): stop libSQL write-lane starvation from cascading through the resource governor (#7714)](https://github.com/nearai/ironclaw/pull/7717)
- [#7708 feat(automations): add run-now across trigger domain and WebUI](https://github.com/nearai/ironclaw/pull/7708)
- [#7718 fix(google-docs): add semantic editing tools](https://github.com/nearai/ironclaw/pull/7718)
- [#7693 feat: add native structured output finalization](https://github.com/nearai/ironclaw/pull/7693)
- [#7711 feat(wasm): typed tool response, guest migration, and dispatch-error cleanup](https://github.com/nearai/ironclaw/pull/7711)

## 4. 社区热点

讨论最集中的议题围绕 DB 写入压力优化、持久记忆与用户体验缺口：

- **[#7275 [CLOSED] Reborn: verify explicit persistent memory recall across conversations in production](https://github.com/nearai/ironclaw/issues/7275)**（4 条评论）— 用户反馈（源自 #7185）表明跨对话的显式持久记忆召回并不可靠。该 issue 已关闭，但关闭原因未在数据中说明，社区期待看到生产环境验证的最终结论。
- **[#7591 [OPEN] Epic: reduce durable DB write pressure ~60% while keeping multi-worker safety](https://github.com/nearai/ironclaw/issues/7591)**（3 条评论）— 作为写入优化 epics，它衍生出了多个 Tier 子任务（#7701、#7603、#7604、#7598、#7594、#7605、#7707），说明这是一个跨模块的系统级性能整治，而非单一缺陷修补。
- **[#3762 [OPEN] Editing AGENTS.md in the web UI does not update the system prompt](https://github.com/nearai/ironclaw/issues/3762)**（2 条评论）— 自 5 月 18 日创建以来悬而未决，用户关注度持续，近两日又有新评论。这是影响日常使用体验的显著缺陷。
- **[#7701 / #7603 / #7604](https://github.com/nearai/ironclaw/issues/7701)** — 每个写入优化子任务都有 2 条评论，说明社区对“减少数据库写入压力”的实际落地路径高度关注，尤其是 [#7707](https://github.com/nearai/ironclaw/issues/7707) 从 #7603 中因安全性问题被拆分出来，体现了技术方案在验证中被推翻并重新设计的严谨过程。

PR 侧，虽然评论数据未完整展示，但从体积（XL）和风险标注来看，[#7694（durable backend suggestions）](https://github.com/nearai/ironclaw/pull/7694)、[#7708（automations run-now）](https://github.com/nearai/ironclaw/pull/7708)、[#7718（Google Docs 语义编辑）](https://github.com/nearai/ironclaw/pull/7718) 等已引发较多关注，属于“大功能、低风险、文档齐全”的一批核心贡献。

## 5. Bug 与稳定性

按严重程度排列，并标注修复状态：

| 严重度 | Issue | 描述 | Fix PR |
|---|---|---|---|
| 高 | [#7714](https://github.com/nearai/ironclaw/issues/7714) | libSQL 共享写连接饥饿导致资源管理者 delta journal 停滞约 40s，连锁引发 authority 失效、持久状态重载、预留永久泄漏；曾导致 PinchBench 任务失败 | 已有 [#7717](https://github.com/nearai/ironclaw/pull/7717)（open） |
| 中 | [#7716](https://github.com/nearai/ironclaw/issues/7716) | “Add MCP server”流缺少 Bearer key/token 认证选项，且不支持 STDIO/HTTP 传输（QA P2，Railway 实例） | 无 |
| 中 | [#7715](https://github.com/nearai/ironclaw/issues/7715) | Telegram 连接流未提供 bot 与个人账户之间的选择/同意流程，用户不清楚当前连接的是哪一种（QA P2） | 无 |
| 中 | [#7705](https://github.com/nearai/ironclaw/issues/7705) | CoalescingEventSink 在故障事件后端上关闭 flush 可能无限挂起；pending_flush_error 存在锁存风险（PR #7631 review 中发现） | 无 |
| 中 | [#7702](https://github.com/nearai/ironclaw/issues/7702) | Obligation audit 记录（AuditBefore/AuditAfter）从未在生产中写入，违反 host-api 文档约定的 “Allow without Audit...” 契约 | 无 |
| 观察 | [#7704](https://github.com/nearai/ironclaw/issues/7704) | clawbench 84 个非 pass 用例被归因为存储写通道竞争，与 #7591 优化方向互相印证 | — |
| 待确认 | [#7275](https://github.com/nearai/ironclaw/issues/7275) | 持久记忆在生产环境跨会话召回不可靠；issue 已关闭，但未给出验证结论 | — |

## 6. 功能请求与路线图信号

- **[#7719 GitHub Projects v2 field manipulation](https://github.com/nearai/ironclaw/issues/7719)** — 用户需要能够更新 GitHub Projects v2 的字段（如 Main backlog priority）。目前仅有 issue、无对应 PR，但需求明确且与现有 GitHub tool 天然衔接，有一定概率进入工具链扩展。
- **[#7681 Slack unlinked-user connect message](https://github.com/nearai/ironclaw/issues/7681)** — 增强类请求：未链接用户在共享频道中收到的连接提示应是私密的，并支持一键连接。已有对应 PR [#7682](https://github.com/nearai/ironclaw/pull/7682)（含 #7710 的评审修复），极有可能进入下一版本。
- **[#7687–#7691、#7706 通知系统全面重构](https://github.com/nearai/ironclaw/issues/7687)** — 从“仅自动化审批通知中心”扩展为持久化、用户作用域、可操作的收件箱，支持审批、认证、拦截运行、运行失败/完成、投递失败等通知类型。这套 issue 是清晰的路线图声明，预计将占据后续数个迭代周期。
- **[#7639 共享 InlineNotice 组件](https://github.com/nearai/ironclaw/issues/7639)** — 统一 Jobs、Projects、Workspace、Extensions 中的内联反馈横幅，属于设计系统演进，配合已关闭的 [#7637（设计系统组件类型化）](https://github.com/nearai/ironclaw/issues/7637)。
- **[#7647 确定性无投递结果](https://github.com/nearai/ironclaw/issues/7647)**（已关闭）— 为自动化运行定义确定性的 “不投递任何内容” 契约，避免依赖提示词引导，属于自动化能力深化的一部分。

结合今日 PR 数据，以下 PR 是明确的版本信号，预计将被合并进下一迭代：**run-now 自动化（#7708）、Google Docs 语义编辑（#7718）、结构化输出 finalization（#7693）、WASM 类型化响应（#7711）、durable backend suggestions（#7694）**。

## 7. 用户反馈摘要

- **持久记忆不可靠（#7275）**：用户报告“在一个对话中明确建立的信息，在后续对话中无法被可靠召回”。这是对核心 AI 助手能力的负面反馈，触发了生产环境验证专项。Issue 已关闭，建议维护者公开验证结论以回应社区关切。
- **AGENTS.md 编辑不生效（#3762）**：用户编辑 AGENTS.md 后保存成功，但既不更新当前会话、也不更新未来会话的系统提示。用户明确描述为“save succeeds but nothing changes”，从 5 月 18 日至今已有 3 个月，是对日常使用影响很大的体验落差。
- **连接类流程可用性短板（#7716、#7715）**：QA 在 Railway 环境实测发现，MCP server 无法配置 Bearer token、Telegram 无法选择 bot 还是个人账户。这类问题更多是“功能缺失”而非“逻辑错误”，暴露了新接入流程的审核盲区。
- **Slack 共享频道的隐私问题（#7681）**：用户描述实际场景——在共享频道中 @ 机器人，收到的连接提示整个频道可见，且需要多步手动操作，用户甚至不知道“该把哪个链接发给谁”。这是真实多用户工作区中的典型尴尬，已推动 #7682 修复。
- **写通道竞争影响基准表现（#7704）**：clawbench 84 个非 pass 用例的大头被归因于存储写通道竞争。这验证了社区对性能瓶颈的判断，也解释了为何 #7591（-60% 写入压力）会是如此重要的 epic。

## 8. 待处理积压

以下 Issue/PR 长期未获响应或推进，提醒维护者关注：

- **[#3762 AGENTS.md 编辑不更新系统提示](https://github.com/nearai/ironclaw/issues/3762)** — 2026-05-18 创建，已 3 个月，无关联 PR。用户可见影响大，建议优先排期。
- **[#6994 OOBE automation-tasks 原型 PR](https://github.com/nearai/ironclaw/pull/6994)** — 2026-08-01 创建，已超两周；off-by-default 设计降低风险，但体积 XL，需要 reviewer 时间。
- **[#7184 Nostr host functions for WASM tools](https://github.com/nearai/ironclaw/pull/7184)** — 2026-08-04 创建，new contributor 提交，两周未合并；功能面清晰（3 个 host 函数），可能是 contributor onboarding 的卡点。
- **[#7406 dependabot: actions group 4 updates](https://github.com/nearai/ironclaw/pull/7406)** — 2026-08-09 创建，依赖更新类 PR，风险低但已一周未处理。
- **[#7491 omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491)** — 2026-08-11 创建，XL 体积、涉及 coding 工具链重构，是模型编程体验的关键 PR，需要重点评审。
- **[#7513 ACP serve 命令](https://github.com/nearai/ironclaw/pull/7513)** — 2026-08-11 创建，new contributor 的 CLI 功能，一周未评审；涉及 streaming 与 cancel，是外部工具集成的重要入口。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-18

## 今日速览
过去 24 小时内，LobsterAI 无新版本发布，但 PR 活动显著：21 条 PR 更新，其中 17 条合并/关闭、4 条待合并，项目处于快速演进阶段。7 条 Issue 更新全为活跃状态，但其中 6 条是 4 月创建的老问题，反映 Bug 处理存在积压。值得关注的是，多笔 4 月提交的社区 PR 今日被批量合并，维护者正在积极消化积压贡献；同时新开 PR 显示项目正扩展 DeepSeek Harness（dsh）运行时支持，整体健康度良好。

## 版本发布
今日无新版本发布。

## 项目进展
今日合并/关闭的 17 条 PR 涉及多个方向，其中较关键的合并包括：

- **OpenClaw 运行时升级**（[#1663](https://github.com/netease-youdao/LobsterAI/pull/1663)）：从 v2026.3.2 升级至 v2026.4.12，并同步升级 openclaw-weixin 插件至 2.1.8，修复了插件 SDK 兼容问题。
- **Agent 独立工作目录**（[#1668](https://github.com/netease-youdao/LobsterAI/pull/1668)）：支持为每个非 main Agent 配置专属工作目录，未配置时回退到 OpenClaw 默认行为，数据库迁移兼容存量数据。
- **日志脱敏**（[#1661](https://github.com/netease-youdao/LobsterAI/pull/1661)）：修复主进程日志中可能出现 API Key、Bearer token、OAuth token 等明文敏感信息的问题，提升导出日志的安全性。
- **Qwen 控制台链接迁移**（[#1667](https://github.com/netease-youdao/LobsterAI/pull/1667)）：因阿里云灵积控制台下线，将 Qwen 提供商入口链接更新至百炼，属于零行为变更的体验改进。
- **Cowork 系列交互优化**（[#1636](https://github.com/netease-youdao/LobsterAI/pull/1636)、[#1637](https://github.com/netease-youdao/LobsterAI/pull/1637)、[#1639](https://github.com/netease-youdao/LobsterAI/pull/1639)、[#1640](https://github.com/netease-youdao/LobsterAI/pull/1640)、[#1641](https://github.com/netease-youdao/LobsterAI/pull/1641)）：由社区贡献者 0xFLX 批量提交并全部合并，包括聊天窗口悬浮「滚动到底部」按钮、AI 回复「重新生成」按钮、工具执行结果一键复制、所有弹窗 Esc 关闭、tooltip 国际化修复。
- **dsh engine 集成**（[#2502](https://github.com/netease-youdao/LobsterAI/pull/2502)）：新增 DeepSeek Harness 引擎集成，并配套进程启动器（[#2505](https://github.com/netease-youdao/LobsterAI/pull/2505)）。

整体上，项目在 Agent 工作目录配置、日志安全、运行时兼容性以及聊天交互细节上均有实际推进。

## 社区热点
- **VOKO 项目推广与生态联动**（[#2500](https://github.com/netease-youdao/LobsterAI/issues/2500)）：这是今日唯一新开的 Issue，由 VOKO 开源项目作者发布。VOKO 定位为"AI 智能体的跨平台通信层"，已接入 OpenClaw、AstrBot，希望推动 A2A 标准化。该 Issue 反映出 LobsterAI 在开源 AI Agent 生态中已具备一定影响力，外部项目主动寻求联动。
- **groupPolicy 配置被覆盖问题**（[#1653](https://github.com/netease-youdao/LobsterAI/issues/1653)）：今日获得 2 条评论，是活跃讨论最多的问题。用户反馈 groupPolicy 每隔一段时间就被覆盖为 allowlist，影响策略配置的稳定性。
- **社区贡献者 0xFLX**：一人贡献 5 个 Cowork 相关 PR 且全部被合并，展现了较高的社区参与度，其提交的交互改进贴合日常使用痛点（缺少快速滚底、重新生成、复制按钮等）。

## Bug 与稳定性
以下 Issue 均处于 OPEN 状态，尚未见到对应的修复 PR：

| 严重程度 | Issue | 描述 |
|---------|-------|------|
| 高 | [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) | ollama 本地模型（qwen3、gemma4）无法使用，用户确认 ollama 本身正常、cherrystudio 客户端可用 |
| 高 | [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) | 除 SSE 之外的 MCP 引擎无法被找到和使用，MCP 支持不完整 |
| 中高 | [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) | groupPolicy 每隔一段时间被覆盖为 allowlist，配置管理异常 |
| 中 | [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) | md 转 word 执行中途失败，报错 `sse response finish reason: full` |
| 中 | [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643) | 手动创建定时任务点击保存时提示"还有内容未保存"，但实际已保存成功，交互误导 |

其中 #1635、#1662 对本地模型和 MCP 生态影响较大，建议优先排查。

## 功能请求与路线图信号
- **基于 md 的工作流**（[#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)）：用户提出希望 main agent 能够感知并组织其它 agent 完成复杂任务，目前各 agent 之间互不感知，这可能是未来多 Agent 协作的重要方向。
- **VOKO 跨平台通信**（[#2500](https://github.com/netease-youdao/LobsterAI/issues/2500)）：A2A 标准化诉求，可能为项目带来新的集成视角。
- **OrcaRouter Provider 集成**（[#2504](https://github.com/netease-youdao/LobsterAI/pull/2504)）：新开 PR 拟将 OrcaRouter 作为一级 Provider 接入，与 OpenRouter 并列，继续扩展 LLM 网关支持。
- **dsh 引擎支持**（[#2502](https://github.com/netease-youdao/LobsterAI/pull/2502)、[#2505](https://github.com/netease-youdao/LobsterAI/pull/2505)、[#2506](https://github.com/netease-youdao/LobsterAI/pull/2506)）：DeepSeek Harness 的集成与文档工作，显示项目正扩展本地运行时能力。

## 用户反馈摘要
- 用户对本地模型支持存在困扰：#1635 用户明确表示 ollama 模型在其他客户端可用，LobsterAI 中却报错，反映出集成层兼容性问题。
- 配置管理困惑：#1653 用户对 groupPolicy 被神秘覆盖表示不解；#1643 用户对"保存成功却提示未保存"的交互感到困惑。
- 多 Agent 编排成为显性需求：#1644 用户的描述非常具体（main agent 无法感知其它 agent 的存在），说明现有架构在复杂任务组织上有明显短板。
- 外部开发者认可项目价值：#2500 VOKO 作者主动来点 star 并希望建立生态合作，表明 LobsterAI 在 AI Agent 领域已有一定社区影响力。

## 待处理积压
- **依赖更新搁置**：[#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) 建议将 electron 从 40.2.1 升级至 43.4.0，同样更新 electron-builder，4 月创建至今未合并，需评估是否纳入近期版本。
- **功能 PR 长期等待**：[#1660](https://github.com/netease-youdao/LobsterAI/pull/1660) 为非 main agent 首页欢迎区显示 agent 名称和描述，功能完整且改动明确，创建于 4 月 13 日，仍处于 OPEN 状态。
- **6 个 stale Issue 待处理**：[#1635](https://github.com/netease-youdao/LobsterAI/issues/1635)、[#1643](https://github.com/netease-youdao/LobsterAI/issues/1643)、[#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)、[#1653](https://github.com/netease-youdao/LobsterAI/issues/1653)、[#1662](https://github.com/netease-youdao/LobsterAI/issues/1662)、[#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) 均为 4 月创建、至今未解决，涉及本地模型、MCP、配置管理和工作流等多个核心功能，建议维护者评估优先级、给出明确回复或修复计划。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 2026-08-18

## 今日速览

过去 24 小时 Moltis 无新版本发布，但代码与协作活动活跃：2 个 Issue 关闭，6 个 PR 合并/关闭，3 个新 PR 待合并。核心工作集中在 CI 格式门禁修复、heartbeat 配置逻辑修正、MiniMax Code 外部代理集成及 WebUI RPC 超时配置落地。整体开发节奏稳健，Bug 修复响应较快，项目健康度良好。

## 项目进展

今日合并/关闭的 PR 覆盖多项功能与修复，主要包括：

- **Shadow DOM 查询优化**：[PR #1103](https://github.com/moltis-org/moltis/pull/1103) 在浏览器快照与 ref 查询路径中高效穿透 Shadow DOM，补齐了此前的实现缺口。
- **MiniMax Code 外部代理**：[PR #1204](https://github.com/moltis-org/moltis/pull/1204) 新增 `acp-minimax-code` 代理类型，纳入默认可执行文件检测与代理注册表，进一步丰富外部代理生态。
- **WebUI RPC 超时配置**：[PR #1130](https://github.com/moltis-org/moltis/pull/1130) 实现用户可配置的 WebUI RPC 超时，直接关闭了 Issue [#1127](https://github.com/moltis-org/moltis/issues/1127)。
- **外部代理模型/努力级别选择**：[PR #1125](https://github.com/moltis-org/moltis/pull/1125) 为 `/model` 命令增加外部代理的模型与努力级别选择能力，提升配置灵活性。
- **依赖维护**：[PR #1207](https://github.com/moltis-org/moltis/pull/1207) 升级 wasmtime-wasi、cmov、quinn-proto、serde_with；[PR #1087](https://github.com/moltis-org/moltis/pull/1087) 将 tar 更新至 0.4.46，依赖健康持续改善。

这些合并表明项目在浏览器自动化、Agent 生态、可配置性和依赖安全方面都在稳步向前推进。

## 社区热点

今日最受关注的动态集中在 heartbeat 相关修复：

- [PR #1209](https://github.com/moltis-org/moltis/pull/1209) 修复 `heartbeat.update` 将参数作为补丁而非整体配置的问题，避免默认值意外覆盖已有设置。
- [PR #1208](https://github.com/moltis-org/moltis/pull/1208) 修复 `heartbeat.active_hours` 从未生效的缺陷，使调度器真正按照活跃时间窗口执行。

两者均直接关系用户日常使用中的配置一致性体验，说明社区对 heartbeat 功能的准确性和可靠性有较高关注。此外，Issue [#1127](https://github.com/moltis-org/moltis/issues/1127) 提出的 RPC 超时配置需求在当日完成闭环，体现了项目对用户需求的高效响应。

## Bug 与稳定性

按严重程度排列：

1. **CI 格式门禁失败（已关闭）**：[Issue #1202](https://github.com/moltis-org/moltis/issues/1202) 报告 `main` 分支上 `check-file-size.sh` 检查失败，`crates/memory-zvec/src/store.rs`（1799 行）和 `crates/gateway/src/methods/services/admin.rs`（1531 行）超过 1500 行限制。该 Issue 已关闭，问题在提交 `594ffaf1` 中处理。
2. **heartbeat.active_hours 不生效（待合入）**：[PR #1208](https://github.com/moltis-org/moltis/pull/1208) 指出 `is_within_active_hours` 虽有实现和测试，但调度器从未调用，导致活跃时段配置完全无效。修复已提交，正在等待合并。
3. **heartbeat.update 配置覆盖异常（待合入）**：[PR #1209](https://github.com/moltis-org/moltis/pull/1209) 修复 `heartbeat.update` 因 `#[serde(default)]` 导致未传字段被默认值覆盖，造成内存状态与 `moltis.toml` 不一致的问题。

## 功能请求与路线图信号

- **WebUI RPC 超时配置已落地**：[Issue #1127](https://github.com/moltis-org/moltis/issues/1127) 请求增加 RPC 超时配置，已通过 [PR #1130](https://github.com/moltis-org/moltis/pull/1130) 完成，预计随下一版本发布。
- **Files 库与 Settings 浏览器（新方向）**：[PR #1206](https://github.com/moltis-org/moltis/pull/1206) 新增持久化数据目录 Files 库、查看器风格的设置浏览器，以及 `MOLTIS_FILES_DIR` 发现和多种容器只读挂载支持，是一个较大的新功能方向，可能成为后续路线图的重要组成部分。

## 用户反馈摘要

- 用户 Lstarsky0 在 [Issue #1202](https://github.com/moltis-org/moltis/issues/1202) 中主动报告 CI 失败，并列明具体文件和行数，帮助项目迅速定位格式门禁问题。
- 用户 khimaros 在 [Issue #1127](https://github.com/moltis-org/moltis/issues/1127) 中提出 RPC 超时配置需求，说明了自己的使用场景和必要信息，并亲自通过 [PR #1130](https://github.com/moltis-org/moltis/pull/1130) 提交实现，体现了较强的社区参与度。
- 用户 hetaoBackend 通过 [PR #1204](https://github.com/moltis-org/moltis/pull/1204) 主动集成 MiniMax Code 外部代理，为项目拓展了更多可用模型选择。

## 待处理积压

- **待合并 PR**：目前 3 个 PR 等待维护者 review：
  - [PR #1209](https://github.com/moltis-org/moltis/pull/1209) heartbeat.update 参数处理修复
  - [PR #1208](https://github.com/moltis-org/moltis/pull/1208) heartbeat 活跃时间修复
  - [PR #1206](https://github.com/moltis-org/moltis/pull/1206) Files 库与 Settings 浏览器新功能
- **长期未合并 PR 提醒**：[PR #1125](https://github.com/moltis-org/moltis/pull/1125) 从 6 月 15 日创建至 8 月 17 日关闭，生命周期约两个月，侧面反映大型功能 PR 的 review 周期较长，建议维护者关注后续同类 PR 的评审效率。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-18

> 数据来源：github.com/agentscope-ai/CoPaw（以下链接均指 `agentscope-ai/QwenPaw`，平台现统称 CoPaw）

---

## 1. 今日速览

- 项目整体保持 **高度活跃**：过去 24 小时共产生 14 条 Issue 更新（新开/活跃 8，关闭 6）和 35 条 PR 更新（待合并 13，已合并/关闭 22），无新版本发布。
- 今日无 Release，但 PR 合并节奏明显加快，尤其是一批 **长周期积压 PR**（如 #5151、#6940、#6817）相继关闭，说明维护者正在集中清理存量 PR。
- 社区反馈重心集中在 **2.1.0 版本的稳定性问题**：MCP 工具调用、多会话/多渠道冲突、图片附件失效等占主导，其中 3 个已关闭 Issue 被确认为实现缺陷而非误报。
- 功能侧出现两个明确信号：**按频道独立配置模型**（#7085）与**可插拔长期记忆后端**（#7079/#7080），后者已有对应 PR 进入评审。
- 值得关注的是，一位贡献者（anysearch-ai）在 9 天内两次提交同一功能的集成 PR（#6817 关闭后重新提交为 #7081），说明外部集成方对进入主干有较强意愿。

---

## 2. 版本发布

**无新版本发布。** 当前最新版本仍为 v2.1.0，社区反馈的 Bug 大多围绕该版本展开；建议关注下文 Bug 部分，部分问题已有修复 PR 待合并。

---

## 3. 项目进展

今日合并/关闭了 22 个 PR，其中以下合并对项目有实质推进：

| PR | 说明 | 意义 |
|---|---|---|
| [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) | 新增 DataPaw 原生应用运行时与持久化分析工作区（first-time-contributor） | 扩展了 PawApp 生态能力，为数据类应用提供独立运行时 |
| [#7017](https://github.com/agentscope-ai/QwenPaw/pull/7017) | 新装 PawApp 无需刷新页面即可打开，更新时自动 reload | 改善 Console 端安装/更新体验，消除手动刷新 |
| [#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036) | 为聊天媒体附件增加统一下载控件 | 补齐媒体管理功能；音频按钮顺序与键盘焦点对齐 |
| [#6975](https://github.com/agentscope-ai/QwenPaw/pull/6975) | 修复 /compact 后 context-usage 环形指示器不更新 | 修复了 SSE 流早断导致的 UI 状态陈旧问题 |
| [#5151](https://github.com/agentscope-ai/QwenPaw/pull/5151) | 修复 GitPanel Tabs 样式因 prefixCls 不匹配未生效的问题 | 创建于 6/12，积压超 2 个月后终于合并；消除样式与 DOM 前缀不一致的隐患 |
| [#6968](https://github.com/agentscope-ai/QwenPaw/pull/6968) | 停止将图片 base64 按文本 token 估算，修复 context 占用虚高 | 2MB 照片曾虚报约 70 万 token，现不再污染上下文计量 |
| [#6981](https://github.com/agentscope-ai/QwenPaw/pull/6981) | 从 7 个语言文件的输入框占位文案中移除 /approve、/deny 提示 | 清理 UI 文案与命令功能的暴露面 |

> 注：PR #6817（AnySearch 集成）于今日关闭，但贡献者已提交新的 #7081，推测是收到 review 反馈后的迭代重提，集成工作仍在推进中。

整体来看，今日合并重点在 **Console 体验修复** 与 **PawApp 生态完善**，同时清掉了两个「钉子户」PR。

---

## 4. 社区热点

### 最热 Issue 排行（按评论数）

**1. [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) — [已关闭] MCP 工具升级 2.0 后总是提示 Tool not found**（7 条评论）
- 用户升级 docker 版 2.0.0post3 后，工具名虽已变为 `[mcp-key]__[tool_name]` 但仍无法调用。
- 该 Issue 创建于 7/23，持续近 4 周、7 条评论后才关闭，说明 **2.0 时代 MCP 兼容性问题困扰了用户相当长时间**。关闭原因未被标注为修复，建议维护者确认是否有对应文档更新或补丁跟进。

**2. [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — [开放] Console 停止请求会错误取消活跃的飞书会话（2.1.0）**（6 条评论）
- 用户报告在多 UI 会话并存时，session identity 发生交叉，Console 的 stop 操作波及到飞书渠道活跃会话。
- 评论中用户对原始描述进行了更正并补充了新证据，属于 **高价值反馈**——直接暴露了多会话/多渠道状态管理的边界缺陷。

**3. [#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085) — [开放] 功能请求：按频道独立配置模型**（3 条评论）
- 用户期望钉钉、微信、Console 等不同渠道可以绑定不同模型（如钉钉→gpt-4o、微信→qwen-max、Console→本地 llama.cpp）。
- 当前模型配置全局生效或仅到 agent 级别，用户明确表达了该限制带来的不便。

### 分析
社区热度集中在两点：**多会话/多渠道的边界管理**（#7011、#6925）和**模型/工具配置的灵活度**（#6405、#7085）。前者是稳定性问题，后者是配置模型演进方向，均已出现对应的 PR 或设计讨论。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 状态 | 摘要 | 修复 PR |
|---|---|---|---|---|
| 🔴 严重 | [#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063) | 已关闭 | Agent 执行工具调用必现崩溃：`_execute_tool_call` 对 coroutine 使用 `async for`，抛出 TypeError | 无对应 fix PR，关闭原因待确认（可能为误报或用户侧问题） |
| 🔴 严重 | [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082) | 开放 | Console 启动时 `_StructuredOutputDynamicClass is not fully defined`，需要 `model_rebuild()`，导致 MODEL_EXECUTION_ERROR | 暂无 |
| 🟠 高 | [#7088](https://github.com/agentscope-ai/QwenPaw/issues/7088) | 已关闭 | OneBot 渠道将 QQ 短时签名图片 URL（rkey 约 2h 过期）直接传给 LLM，导致后端拉取图片 400，且过期 URL 污染会话上下文 | 暂无 |
| 🟠 高 | [#7077](https://github.com/agentscope-ai/QwenPaw/issues/7077) | 已关闭 | 插件通过 `register_runtime_hook()` 注册的钩子在 workspace reload / hot-install 后静默丢失 | 暂无 |
| 🟠 高 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | 开放 | Console stop 请求取消活跃飞书会话——session identity 在多 UI 会话间交叉 | 暂无 |
| 🟡 中 | [#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048) | 已关闭 | `qwenpaw cron update <id> --text "<新prompt>"` 返回成功但 prompt 未更新 | 暂无 |
| 🟡 中 | [#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051) | 已关闭 | Console 聊天中图片附件在 session 重载后丢失/缩略图破裂 | 暂无 |
| 🟡 中 | [#7076](https://github.com/agentscope-ai/QwenPaw/issues/7076) | 开放 | qwenpaw-creator 配置 LLM 模型报 404（v2.1.0） | 暂无 |
| 🟢 低 | [#7084](https://github.com/agentscope-ai/QwenPaw/issues/7084) | 开放 | 历史对话仅一条时，新建聊天后点击历史会话无响应 | 暂无 |

**观察**：今日修复型 PR 主要面向 Console 层（#7036、#6975、#6968），而渠道/多会话类 Bug（#7011、#7088）尚无对应修复，仍是 2.1.0 的主要稳定性短板。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的需求

1. **按频道独立配置模型**（[#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085)）
   - 多个渠道共用一个全局模型配置不符合真实多端使用场景，用户诉求清晰且给出的示例场景很具体（钉钉快模型 / 微信中文模型 / 本地测试模型）。
   - 结合 PR #6302（统一 provider 发现与模型路由）的推进，**渠道级模型路由很可能被纳入 2.2 或 3.0 路线图**。

2. **可插拔长期记忆后端（PowerContext）**（[#7079](https://github.com/agentscope-ai/QwenPaw/issues/7079) ↔ [PR #7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)）
   - 用户 kic635 同时提交了 Issue 与实现 PR，且基于现有 `BaseMemoryManager` / `memory_registry` 扩展点实现，是典型的社区驱动型功能贡献，**合入概率较高**。

3. **定时任务运行细节展示**（[#7075](https://github.com/agentscope-ai/QwenPaw/issues/7075)）
   - 用户希望看到 cron 任务的开始时间、运行时长、结束时间、结果状态。若任务运行 5–10 分钟，目前完全不可观测。属于 **可观测性增强**，实现成本较低。

4. **智能体协作在单一会话窗口**（[#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925)）
   - 当前多智能体协作每次对话都创建新会话，用户需要手动切换查看各 agent 的对话。该需求若落地，将显著改变协作交互模型，需产品层面设计。

### 已在主干中的相关信号
- **会话级多项目目录**（[PR #6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)）——支持 chat 绑定多个项目目录，第一个为主要目录，仍在开放状态，属于工作区管理方向的重要演进。
- **持久化工作区 artifact 卡片**（[PR #6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)）——已在实现中，将工作区产出可视化地挂载到聊天回合中。

---

## 7. 用户反馈摘要

- **MCP 兼容性困扰时间长**（#6405）：用户升级 2.0 后 MCP 工具持续无法调用，持续近 4 周才关闭。中间缺乏维护者有效回应，用户情绪从提问转向无奈。背后暴露的是 2.0 版本升级时 MCP 工具命名规范（`[mcp-key]__[tool_name]`）的沟通/文档不足。
- **多会话状态交叉是真实痛点**（#7011）：用户补充了大量证据说明 Console 与飞书渠道的 session 互相干扰，且原始描述经过一次自我更正，说明问题复现路径隐蔽，用户投入了大量调试精力。
- **对配置灵活度的明确期待**（#7085）：用户对全局模型配置的不满非常具体，给出了三个渠道的差异化配置场景（gpt-4o / qwen-max / llama.cpp），说明其真实部署环境是多模型混合使用。
- **团队协作场景下的交互瓶颈**（#6925）：用户对多智能体协作「创建一堆会话、还要手动切换查看」的体验表示困惑，侧面说明智能体协作功能已进入真实团队试用阶段。
- **对 cron 任务运行的「黑盒」不满**（#7075）：用户希望知道任务是否准时触发、当前是否在运行中——这是自动化功能被认真使用后必然出现的可观测性诉求。
- **图片/媒体处理的正反两面**：#7051（图片在会话重载后丢失）与 #6968（两张 2MB 图片让上下文显示 100% 满）分别从数据持久化和 token 计量两个角度暴露了媒体处理的粗糙。

---

## 8. 待处理积压

### 长期未合并的 PR（需维护者关注）

| PR | 创建时间 | 已等待 | 说明 |
|---|---|---|---|
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | 07-28 | 21 天 | 新增火山引擎 Agent Plan 与小米 MiMo V2.5 内置 provider。国内模型厂商接入需求明确，长期搁置可能会降低贡献者积极性 |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 07-21 | 28 天 | 统一 provider 发现、模型元数据、路由、agent 控制的大规模重构 PR，涉及面广、评审成本高，但属于路线图级改动 |
| [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) | 08-05 | 13 天 | 持久化 workspace artifact 卡片，功能完整但无评论，疑似等待 reviewer |
| [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) | 08-13 | 5 天 | session-scoped 多项目目录，改动涉及文件工具和 shell cwd 语义，需要仔细评审 |
| [#6986](https://github.com/agentscope-ai/QwenPaw/pull/6986) | 08-13 | 5 天 | 修复杀毒软件（Windows Defender 等）阻断 sandbox 的问题。PR 描述模板未完整填写（`[Describe what this PR does...]`），需要作者补充后再审 |

### 长期未关闭的 Issue

| Issue | 创建时间 | 说明 |
|---|---|---|
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) | 08-12 | 智能体协作会话体验优化。评论数不多但属于产品形态级反馈，建议产品团队纳入讨论 |
| [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) | 07-23（今日关闭） | 虽已关闭但无 fix PR 关联，若关闭原因为「非 bug」或「文档已更新」，建议在关闭评论中给出指引避免用户再次踩坑 |

---

*本日报基于 GitHub 公开数据自动生成，仅供项目健康度参考。如需人工复核，欢迎联系维护团队。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-18

> 数据窗口：2026-08-17 至 2026-08-18（基于 GitHub 快照）

---

## 1. 今日速览

过去 24 小时项目保持 **高活跃度**：50 条 Issue 更新（43 条活跃/新开、7 条关闭）、50 条 PR 更新（34 条待合并、16 条已合并/关闭），无新版本发布。当前开发重心明显集中在 **安全加固、跨平台 CI 补齐、以及一批已进入落地阶段的架构级 RFC** 上。值得注意的是，多个 P1 级安全修复（Gemini API 密钥泄漏、附件读取越权、预算原子性）在今日集中合并，社区讨论热度最高的话题则是 OpenAI Chat Completions 协议兼容与治理流程优化。项目整体处于 0.8.x 稳定期与 v0.9.0 安全/架构里程碑交汇的过渡阶段。

---

## 2. 版本发布

**无新版本发布。**

---

## 3. 项目进展

今日共有 16 个 PR 被合并/关闭，重点进展集中在 **安全修复、CI 补强、测试稳定性** 三个方面：

### 🔒 安全修复（P1/P2）
- [PR #9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973) — **`fix(providers): keep Gemini API keys out of URLs`**（P1，已合并）：将 Gemini API 密钥从请求 URL 迁移到 `x-goog-api-key` 请求头，消除密钥通过 URL 日志/诊断泄露的风险。
- [PR #10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000) — **`fix(channels): bound QQ and Mattermost downloads`**（P1，已合并）：为 QQ/Mattermost 入站附件下载增加统一的大小上限（10 MiB / 25 MiB），防止超限文件导致内存压力。
- [PR #9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) — **`fix(security): make action budget accounting atomic`**（已合并）：修复 [Issue #9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849) 中 `RateLimitedTool` 预算检查与记录非原子导致的并行超限问题。
- [PR #9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993) — **`fix(email): stop implicit attachment file reads`**（已合并）：阻断空附件载荷利用显示文件名触发本地文件读取的路径。
- [PR #9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612) — **`fix(channels): tie the WhatsApp Cloud approval token to a guard so no exit orphans it`**（已合并）：确保 WhatsApp Cloud 审批令牌在异常退出时也会被清理，避免孤立 bearer 凭据。

### 🔧 功能/正确性修复
- [PR #9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544) — **`fix(delegate): honor configured provider fallbacks`**（已合并）：委派目标改为走标准 session provider 构建器，正确使用配置的别名、路由、重试与 fallback 候选，修复委派绕过 fallback 的问题。
- [PR #9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765) — **`fix(sop): load SOP definitions from the shared workspace, not data_dir`**（已合并）：修正 SOP 定义加载路径，使其从共享 workspace 而非 `data_dir` 读取。

### 🧪 CI 与测试稳定性
- [PR #9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) — **`ci(tests): add scheduled macOS and Windows tests`**（已合并）：新增定时 macOS/Windows 测试工作流，弥补 [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 暴露的 Linux-only CI 盲区。
- [PR #10039](https://github.com/zeroclaw-labs/zeroclaw/pull/10039) — **`ci(clippy): share Clippy command runner across workflows`**（已合并）：将 required/advisory 各 Clippy 任务收敛到 `scripts/ci/run_clippy.sh`，防止逻辑漂移。
- [PR #10043](https://github.com/zeroclaw-labs/zeroclaw/pull/10043) — **`ci(lint): remove duplicate architecture test guards`**（已合并）：移除 Lint 中重复的架构测试，明确 Test 工作流作为拥有者。
- [PR #10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010) — **`test(cron): avoid ETXTBSY race in custom shell test`**（已合并）：用 symlink 替代运行时写入的可执行文件，消除并发 fork 导致的 ETXTBSY 竞态（对应 [Issue #10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011)）。
- [PR #9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547) — **`chore(channels): upgrade CPAL to 0.18`**（已合并）：将 CPAL 升级至 0.18.1 并迁移 Voice Wake 到统一 API。

> **整体评估**：项目在 24 小时内完成了 5 项安全修复和 6 项 CI/测试基础加固，同时处理了 SOP 路径与委派 fallback 两个功能性缺陷。安全与工程质量均有明显提升，v0.9.0 里程碑正在稳步推进。

---

## 4. 社区热点

今日讨论热度最高的 Issues 集中在 **协议兼容、Agent 能力扩展与治理流程** 三个方向：

### 🔥 并列第一：#6808 与 #8603（各 23 条评论）

- [Issue #6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — **RFC: Work Lanes, Board Automation, and Label Cleanup**
  治理类 RFC，累计 26 个修订版本，当前为 Ratified / rollout 状态。核心诉求是建立自动化的 Issue/PR 路由机制（work lanes），减少维护者手工整理标签的负担。高评论数说明社区对**维护流程效率**关注度很高，且该 RFC 已进入实际落地阶段。
- [Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **RFC: ZeroClaw Chat Completions profile**
  讨论热度与 #6808 持平。社区强烈希望 ZeroClaw 暴露 OpenAI Chat Completions 兼容端点，以便 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等现有 OpenAI 生态客户端可直接接入。这是**互操作性**需求的集中体现，很可能进入 v0.9.0 路线图。

### 🔥 其他高热度讨论

- [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **RFC: Goal mode v1**（22 条评论）：为 Agent 增加跨 turn 的有界目标执行能力，社区在讨论如何避免与既有的重启恢复、异步子任务机制耦合。
- [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — **RFC: 高风险 Shell 命令确认 + allow/ask/deny 策略**（20 条评论）：用户希望获得类似 Claude Code 的逐条命令审批策略，平衡自动化与安全。当前为 accepted 状态，属 v0.9.0 安全架构的一部分。
- [Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) 与 [Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（合计 37 条评论）：提出**运行时拥有会话**与**统一附件架构**，两者均为 Web/Channel 传输层重构的配套 RFC，需要维护者决策。

**分析**：社区热度集中在“让 ZeroClaw 更容易接入现有生态”和“安全控制更细粒度”两个核心诉求上。Chat Completions 兼容 + 命令审批策略的组合，表明用户既希望产品更开放，也希望更可控。

---

## 5. Bug 与稳定性

今日活跃的 Bug 按严重程度排列：

### 🔴 严重（P1 / S2）
- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **`[Bug]: 74 test failures on Windows`**（P1，S2，OPEN）
  Windows 11（简体中文, 代码页 936）下 74 个测试失败，根因为 Unix-only 测试命令、路径语义和控制台编码。CI 仅跑 Linux，问题长期未被发现。**相关修复进展**：[PR #9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) 已合并，新增定时 macOS/Windows 测试，但 Issue 本身仍在积压中。

### 🟠 中等（P2）
- [Issue #10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023) — **`Failure logs claim the requested model, not the pinned fallback model`**（P2，OPEN，in-progress）
  当 pinned fallback provider 实际提供的是备用模型时，retry/cooldown 日志仍记录为请求时的模型，导致排障信息误导。为新增问题，暂无对应 fix PR。
- [Issue #10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) — **`[Task]: avoid runtime-written executable in daemon heartbeat test`**（P2，OPEN，in-progress）
  测试在进程启动后写入并执行临时可执行文件，存在并发竞态风险。**已有对应修复**：[PR #10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010) 已合并，Issue 待关闭。

### ✅ 今日已关闭的 Bug
- [Issue #9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849) — `RateLimitedTool` 预算检查非原子（P2）：已由 [PR #9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) 修复。
- [Issue #9594](https://github.com/zeroclaw-labs/zeroclaw/issues/9594) — Coding-agent 工具双重扣除 action 预算（P2）：已关闭，标记为 follow-up。

---

## 6. 功能请求与路线图信号

今日没有全新的大功能请求，但有多个 **已接受/已进入讨论的 RFC** 持续推进，构成 v0.9.0 路线图的清晰图景：

### 强烈信号：可能进入下一版本
- [Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **OpenAI Chat Completions 兼容**（accepted，评论 23）：接入 OpenAI 生态是最高呼声的功能。若落地，将极大提升 ZeroClaw 作为个人 AI 助手的通用性。
- [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **Goal mode v1**（accepted）：为 Agent 增加持久化目标执行能力，是“从单轮对话走向多轮任务”的关键一步。
- [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — **Shell 命令 allow/ask/deny 策略**（accepted）：安全方向的重要补充，预计将与其他安全 RFC 共同纳入 v0.9.0。
- [Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) / [Issue #9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — **运行时会话 + 统一附件架构**（no-stale，等待维护者审查）：属于传输层重构，可能成为 v0.9.0 的 breaking change 组成部分。

### 待维护者决策的功能类 RFC
- [Issue #7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) — **Per-model capability & context-window 配置**（P1，accepted）：统一视觉能力/上下文窗口/用量显示的数据来源。
- [Issue #7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **可插拔入站认证与规范化主体**（P1，in-progress）：OIDC 等企业级认证方式，适合身份敏感的自托管场景。
- [Issue #9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) — **分阶段 opt-in 产品遥测**：帮助维护者基于真实使用数据做功能取舍，社区讨论中存在隐私顾虑需要平衡。
- [Issue #9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346) — **统一包/能力/配置/运行时状态目录契约**：将 CLI、Gateway、插件系统的 catalog 视图收敛为单一产品级契约。

### 值得关注的待合并 PR
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — **`feat(providers): add native Hailo-Ollama support`**（OPEN，needs-author-action）：为 Hailo-Ollama 硬件加速推理新增原生 provider，对边缘/本地部署场景是重要能力补充。
- [PR #10021](https://github.com/zeroclaw-labs/zeroclaw/pull/10021) — **`fix(runtime): apply target thinking to independent delegates`**（OPEN，待维护者审查）：将 resolver target runtime 的思考策略正确应用到独立 delegate。

---

## 7. 用户反馈摘要

今日从 Issue 评论中提炼的用户声音：

| 反馈类型 | 具体描述 | 来源 |
|---|---|---|
| **痛点：日志误导** | Pinned fallback 实际服务模型与请求模型不一致时，日志记录错误模型，用户难以定位问题 | [Issue #10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023) |
| **痛点：Windows 支持** | 简体中文 Windows 环境下 74 个测试失败，且主 CI 不跑 Windows，用户明确表达了对跨平台质量的担忧 | [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) |
| **诉求：协议互操作** | 用户希望 ZeroClaw 兼容 OpenAI Chat Completions 协议，从而直接接入 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等工具，“不需要维护多个适配器” | [Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) |
| **诉求：核心轻量化** | 长期积压的 RFC 建议将长尾集成移出默认核心，改由外部集成承载，降低配置与安全复杂度 | [Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) |
| **安全担忧：默认安全** | WhatsApp Web 的 `allowed_groups` 为空列表时默认放行所有群组，用户认为应默认拒绝（permit-none） | [Issue #9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) |
| **对流程的反馈** | 多位高频贡献者反映 RFC 表决流程过重（7 天讨论期 + 广泛共识 + 手动计票），拖慢决策速度 | [Issue #9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) |

---

## 8. 待处理积压

### ⚠️ 长期未关闭的重要 Issue（建议维护者优先关注）

- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **Windows 74 个测试失败**（P1，OPEN 自 2026-06-10）。虽然已新增定时跨平台 CI，但 issue 尚未关闭，Windows 下的 74 个失败用例仍未清理。
- [Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — **轻量核心 RFC**（OPEN 自 2026-04-27，15 条评论，标记 `needs-maintainer-review`）。这是积压时间最长的 RFC 之一，涉及核心架构方向，建议维护者明确接受/拒绝。
- [Issue #7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **可插拔入站认证**（P1，in-progress，OPEN 自 2026-06-03）。Rev 8 已很成熟，但缺少最终决策。
- [Issue #6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — **Work Lanes 治理 RFC**（23 条评论，Rev 26，仍标记 rollout in progress）。讨论持续时间长，需要推进落地收尾。

### 🔧 待合并的关键 PR（按优先级排序）

- [PR #9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) — **`fix(telegram): advance long-poll offset only after delivery or permanent skip`**（P1，OPEN 自 2026-07-23，XL）：当前实现会在下载/转写/投递前推进 offset，瞬时故障会导致 update 永久丢失（数据丢失风险）。建议尽快评审合并。
- [PR #10003](https://github.com/zeroclaw-labs/zeroclaw/pull/10003) — **`fix(providers): account Reliable rejected attempts exactly`**（P2，OPEN，XL，待维护者审查）：修复 Reliable provider 重试/拒绝尝试的精确计数，与 [Issue #10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023) 同属 provider 可观测性改进。
- [PR #9808](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) — **`chore(deps): bump the rust-all group with 46 updates`**（dependabot，L，正在进行 rebase）。46 个依赖更新需要重点关注破坏性变更，建议分拆或重点验证。
- [PR #9056](https://github.com/zeroclaw-labs/zeroclaw/pull/9056) — **`fix(providers): surface cause-specific provider failure diagnostics`**（OPEN，`needs-author-action`，`stale-candidate`）：针对 [Issue #9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001)，改善 provider 失败诊断信息，已因作者未响应进入 stale 候选。

---

**总结**：ZeroClaw 在 2026-08-18 展现出高质量的开源协作节奏——安全修复快速合入、RFC 讨论活跃且有结构、CI 基础持续加固。当前最需要维护者关注的三个信号是：① Windows 测试失败 issue 长期未关闭；② Telegram 数据丢失修复 PR 积压；③ Chat Completions 兼容 RFC 作为社区最强烈呼声，值得尽快排入路线图。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*