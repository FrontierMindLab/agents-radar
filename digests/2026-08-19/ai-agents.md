# OpenClaw 生态日报 2026-08-19

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-18 23:00 UTC

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

# OpenClaw 项目动态日报 2026-08-19

## 1. 今日速览

过去24小时项目保持高活跃度：Issues 更新 500 条（新开/活跃 462，关闭 38），PR 更新 500 条（待合并 334，合并/关闭 166），无新版本发布。维护者（steipete、clawsweeper、jesse-merhi 等）密集提交 PR，覆盖 web-ui、gateway 稳定性、CLI 与渠道修复，其中多个 PR 直接对应今日高优 issue。值得关注的是，PR 中出现了自动化合并（automerge）的 #125143，配套 issue 的 clawsweeper 机器人标签占比很高，说明项目已建立机器人与人工协同的维护流程。整体健康度良好，但仍有若干 P1 级历史 Bug 积压未修复。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases：无）。

## 3. 项目进展

过去 24 小时共有 166 个 PR 被合并/关闭，38 个 issue 被关闭。有代表性的合入如下：

- **安全策略确认链路（PC 端/控制 UI 双端落地）**：[#116489 feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) 与 [#120900 feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) 一前一后关闭，安全边界上的安装策略警告确认功能从 CLI 到 Control UI 全线打通。
- **Codex 后端重要缺陷关闭**：[#103231 claude-cli 后端 ownsNativeCompaction 假设错误](https://github.com/openclaw/openclaw/issues/103231) 关闭，修复了 claude -p 会话下"无人压缩、上下文无限增长、恢复路径全部静默失败"的问题。
- **助手草稿锚定问题关闭**：[#79614 assistant draft can ignore the newest user message after a tool turn](https://github.com/openclaw/openclaw/issues/79614) 关闭，mid-turn 新消息被忽略的回归得到解决。
- **新提交的修复 PR（尚未合入）**：
  - [#126059 fix(doctor): recover recreated legacy workspace state](https://github.com/openclaw/openclaw/pull/126059) 直接关闭 #111498（工作区迁移阻塞主代理）。
  - [#126017 fix: large base64 attachments on /v1/responses crash the gateway with heap OOM](https://github.com/openclaw/openclaw/pull/126017) 直接关闭 #126015（OOM 崩溃）。
  - [#123931 fix(matrix): recognize room version 12 room IDs](https://github.com/openclaw/openclaw/pull/123931) 直接关闭 #125679（Matrix 初始同步死循环）。

这些 PR 的提出说明项目组正在针对上一轮严重回归做集中修复。

## 4. 社区热点

| 排名 | Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#80319 QA tool-defaults suite conflates Codex-native tools with OpenClaw dynamic tool parity](https://github.com/openclaw/openclaw/issues/80319) | 17 | 对 Codex 工具掉线的报告存在过度宣称，需厘清 QA 框架与真实运行时能力的边界 |
| 2 | [#112423 Large SQLite transcript cleanup blocks the gateway event loop](https://github.com/openclaw/openclaw/issues/112423) | 15 | 大型转录清理导致事件循环阻塞，网关整体卡顿 |
| 3 | [#62505 Coding Agent never completes anything](https://github.com/openclaw/openclaw/issues/62505) | 15 | 编码代理回归，无法完成任何工作，严重依赖该能力的用户受挫 |
| 4 | [#38327 "Cannot convert undefined or null to object" with google-vertex](https://github.com/openclaw/openclaw/issues/38327) | 14 | 升级后嵌入代理全线失败，影响面大，👍 3 |
| 5 | [#79902 SQLite transcript/session seams for companion apps](https://github.com/openclaw/openclaw/issues/79902) | 14 | 高级用户希望基于规范的 SQLite 层做二次开发，而非抓取不透明 blob |
| 6 | [#84516 Codex app-server long replies silently truncated at ~1000-1100 chars](https://github.com/openclaw/openclaw/issues/84516) | 13 | 长回复被静默截断，且无任何错误标记，用户感知为"模型变笨" |

**诉求分析**：评论区热点集中在**代理可靠性（不完成/截断/阻塞）**与**可观测性（工具对等性模糊、SQLite 数据不可探查）**。尤其值得关注的是 #62505，该 issue 从 4 月 7 日开放至今已 4 个多月仍无修复，社区对"编码代理不能产出代码"的耐心正在消耗。

## 5. Bug 与稳定性

按严重程度排列（均有 issue 链接）。标注是否有修复 PR 在途。

**P1 / 高严重度**

| Issue | 问题 | 生命周期/反馈热度 | 修复状态 |
|---|---|---|---|
| [#62505 Coding Agent never completes anything](https://github.com/openclaw/openclaw/issues/62505) | 编码代理回归，2026.4.2 之后无法完成任何工作 | 4 个月，👍 1 | 无 fix PR，已标 no-new-fix-pr |
| [#38327 "Cannot convert undefined or null to object" in 3.2 with vertex/gemini](https://github.com/openclaw/openclaw/issues/38327) | 升级后任何消息导致嵌入代理失败 | 5 个月，👍 3 | 需 live-repro，无 fix PR |
| [#40001 Write tool lacks append mode — cron sessions destroy shared files](https://github.com/openclaw/openclaw/issues/40001) | 隔离 cron 会话覆盖共享文件，**静默数据丢失** | 5 个月，👍 1 | 无 fix PR，needs-product-decision |
| [#112423 Large SQLite transcript cleanup blocks gateway event loop](https://github.com/openclaw/openclaw/issues/112423) | 清理大型转录阻塞事件循环 | 1 个月 | 等待修复（fix-shape-clear 排队中） |
| [#84516 Codex app-server replies truncated with no stop reason](https://github.com/openclaw/openclaw/issues/84516) | 约 1000 字符处静默截断，stop=null | 3 个月 | 无 fix PR |
| [#111498 Main agent blocked by workspace-state migration](https://github.com/openclaw/openclaw/issues/111498) | Anthropic 恢复后主代理拒绝所有对话 | 1 个月 | ✅ [#126059](https://github.com/openclaw/openclaw/pull/126059) 已提交 |
| [#125679 Matrix channel infinite sync restart loop](https://github.com/openclaw/openclaw/issues/125679) | 新账号/房间初始同步永不完成 | 1 天（8/18 新建） | ✅ [#123931](https://github.com/openclaw/openclaw/pull/123931) 已提交 |
| [#94939 6.x conversation-store SQLite left 0 bytes](https://github.com/openclaw/openclaw/issues/94939) | 迁移后 SQLite 为空，孤儿引用破坏 Bot Framework 主动发送 | 2 个月 | 有 linked PR，open |
| [#90098 Large attachments crash browser/gateway stack](https://github.com/openclaw/openclaw/issues/90098) | 上传大 PDF 触发 RangeError 栈溢出 | 2 个月 | 有 linked PR，open |
| [#83959 Codex app-server startup retries exhaust](https://github.com/openclaw/openclaw/issues/83959) | 启动重试耗尽，崩溃循环 | 3 个月 | 有 linked PR，open |
| [#86612 Docker gateway restart loop with OPENCLAW_SANDBOX=1](https://github.com/openclaw/openclaw/issues/86612) | Windows 下容器无限重启 | 3 个月 | 无需 repro，source-repro |
| [#91144 Windows Scheduled Task gateway won't stay running](https://github.com/openclaw/openclaw/issues/91144) | 计划任务方式运行网关自动退出 | 2 个月 | 已 bisect 到 #125302 |
| [#124788 beta.2 event loop blocks ~100s every ~10 min](https://github.com/openclaw/openclaw/issues/124788) | 定时锚定计时器 + 字符串构建 + fs 扫描阻塞 | 3 天 | 待 maintainer 响应 |
| [#102534 Cron scheduler permanently stops firing](https://github.com/openclaw/openclaw/issues/102534) | 重度超时后定时器永久死亡 | 5 周 | 待 maintainer 响应 |
| [#84662 Codex app-server stores OpenClaw context in native history](https://github.com/openclaw/openclaw/issues/84662) | 每轮注入运行上下文导致 response.create 输入无限增长 | 3 个月 | 无 fix PR |
| [#81484 Discord guild reply regression](https://github.com/openclaw/openclaw/issues/81484) | 公会频道回复间歇失败/重复外发循环 | 3 个月 | 待 maintainer 响应 |
| [#92186 Foreground reply fence cancels completed replies](https://github.com/openclaw/openclaw/issues/92186) | automatic 模式下较早并发回复被取消投递 | 2 个月 | not-repro-on-main，已关闭 6/11 后无更新 |

**P2 / 中严重度（节选）**

- [#88657 DeepSeek V4 Flash incomplete turn](https://github.com/openclaw/openclaw/issues/88657)：payloads=0 但 stopReason=stop，5.27/28 回归，5.26 正常。11 评论。
- [#90378 cron store SQLite 迁移后新任务默认 announce 模式导致频道报错](https://github.com/openclaw/openclaw/issues/90378)：8 评论。
- [#91892 Cron jobs stall during model_call:stream_progress](https://github.com/openclaw/openclaw/issues/91892)：7 评论。
- [#91941 飞书流式卡片全量更新导致长回复严重延迟](https://github.com/openclaw/openclaw/issues/91941)：6 评论。
- [#88079 WebChat 不渲染 Kimi/DeepSeek 的 reasoning_content](https://github.com/openclaw/openclaw/issues/88079)：7 评论。
- [#77733 裸 /new 与 /reset 不再触发人设问候](https://github.com/openclaw/openclaw/issues/77733)：回归确认，6 评论，👍 2。

**值得警惕的信号**：
- #62505 和 #38327 均为数月未修复的高感 P1 回归，且 clawsweeper 已标记 no-new-fix-pr / needs-live-repro，说明维护者可能无法稳定复现或缺少决策。
- 新增的 #124788（beta.2 事件循环每 10 分钟阻塞 100 秒）发生在最新测试版，提示 beta 发布前的回归测试仍有盲区。

## 6. 功能请求与路线图信号

- **会话数据可编程性**：[#79902 SQLite transcript/session seams](https://github.com/openclaw/openclaw/issues/79902) 14 评论，希望官方提供规范化的 SQLite 会话访问层。该请求与 #62328（FTS5 缺失）、#112423（SQLite 阻塞事件循环）共同指向 **SQLite 基础设施仍需补强**。
- **子代理隔离**：[#96975 Isolate subagent completion from parent context](https://github.com/openclaw/openclaw/issues/96975) 12 评论，要求子代理默认只返回状态码+子会话链接，避免污染父上下文。
- **代理自主压缩**：[#6757 Agent-triggered context compaction](https://github.com/openclaw/openclaw/issues/6757) 9 评论，代理可在会话中自行触发压缩，无需用户干预。
- **动态模型发现**：[#10687 Fully dynamic model discovery for OpenRouter](https://github.com/openclaw/openclaw/issues/10687) 9 评论，当前模型列表静态生成，跟不上 OpenRouter 快速更新的目录。
- **多槽位记忆**：[#60572 Multi-Slot Memory Architecture](https://github.com/openclaw/openclaw/issues/60572) 7 评论，支持多个记忆提供者同时在内存栈中分层工作，👍 3。
- **语音通道配置下沉**：[#66252 Per-Agent TTS/STT overrides](https://github.com/openclaw/openclaw/issues/66252) 9 评论，把全局 TTS/STT 改为 per-agent 可覆盖。
- **记忆按源目录索引**：[#95724 Index memory by source directory, not agent](https://github.com/openclaw/openclaw/issues/95724) 6 评论，同一工作区多 agent 共享向量索引，消除重复。

**结合现有 PR 的路线图判断**：
- **UI 可折叠侧边栏/稳定导航**是本迭代明显动向。今日 4 个 UI PR 集中（#126032、#126061、#125963、#125067），且都标"ready for maintainer look"，预计很快合入 2026.8.x。
- **共享插件重试运行时** [#126065](https://github.com/openclaw/openclaw/pull/126065) 与 #117609（嵌入式助手阶段无重试）呼应，说明维护者正把"重试统一"作为稳定性重构方向。
- **安全边界** 持续加固：除已合入的 installPolicy 确认外，#123848（Beam SSRF）、#126027（审计插件与远程操作）均在评审中。
- **Codex 会话管理** 是另一主线：#125707（reasoning effort）、#125424（隐藏受管会话）、#126050（超大轨迹保留终止事实）。

## 7. 用户反馈摘要

从今日展示的 issue 摘要与评论中提炼（受限于数据展示，以下为用户表述的直接归纳）：

**最强烈的负面反馈**
- **编码代理不可用**（#62505）：用户 drpau 称代理"weeks 来一直在产出代码，现在什么也不做，只给模糊状态更新然后道歉"。这是对生产力工具信任的严重打击。
- **升级即回归**（#38327）：升级 2026.3.2 后"任何消息都会失败"，且错误信息完全不可读（"Cannot convert undefined or null to object"），无日志提示根因。
- **静默数据丢失**（#40001）：cron 会话用 write 工具覆盖共享 memory 文件，"这悄悄摧毁了我多会话共享的状态"。数据丢失类问题最易引发用户流失。
- **静默截断**（#84516）："assistantTexts[0] 在句子中间结束，没有任何 aborted 或 error 标记"，用户误以为模型能力下降。

**中等程度反馈**
- **性能焦虑**（#112423、#124788、#75782）：事件循环阻塞 100 秒、认证阶段固定 10-15 秒，用户明确描述"WebSocket 连接死亡、/ready 不响应、cron 停滞"。
- **迁移体验差**（#94939、#90378）：迁移后 SQLite 0 字节、cron 配置未保留且默认行为变化，用户认为"静默迁移 = 静默破坏"。
- **配置文档与实现不一致**（#118148、#117302）：文档承诺的 responsePrefix/healthMonitor 覆盖被配置校验拒绝。

**正面信号**
- 用户对修复 PR 响应积极：#125679 新建当天即有 #123931 对应 PR、#111498 有 #126059，反馈"看到快速响应，对项目信心恢复"。
- 存在"由 agent 代人类提交 issue"的案例（#6757，"I am Wyatt, an OpenClaw agent autonomously filing this feature request"），说明产品已具备 agent 自主反馈的能力，也侧面印证了代理的实用性。

## 8. 待处理积压

以下为长期开放、且有明确影响但在当前列表**无对应 fix PR**或 **长时间未获维护者决策**的重要 issue，建议优先处理：

| Issue | 开放时长 | 优先级 | 备注 |
|---|---|---|---|
| [#62505 Coding Agent never completes anything](https://github.com/openclaw/openclaw/issues/62505) | 4.5 个月 | P1 | 社区最痛回归，无 fix PR，标了 no-new-fix-pr |
| [#38327 Google Vertex "Cannot convert undefined or null"](https://github.com/openclaw/openclaw/issues/38327) | 5.5 个月 | P1 | 👍 3，影响面广，需 live-repro |
| [#40001 Write tool lacks append mode — data loss](https://github.com/openclaw/openclaw/issues/40001) | 5.5 个月 | P1 | 数据丢失类，needs-product-decision |
| [#6757 Agent-triggered context compaction](https://github.com/openclaw/openclaw/issues/6757) | 6.5 个月 | P2 | 功能请求被反复提及，长期无决策 |
| [#10687 Dynamic model discovery (OpenRouter)](https://github.com/openclaw/openclaw/issues/10687) | 6.5 个月 | P3 | 社区呼声高（👍 3），但仅 P3 |
| [#62328 node:sqlite FTS5 missing — memory search broken](https://github.com/openclaw/openclaw/issues/62328) | 4.5 个月 | P2 | Node 版本差异导致搜索静默失败 |
| [#60612 Doctor warns about NVM node but cannot be fixed](https://github.com/openclaw/openclaw/issues/60612) | 4.5 个月 | P2 | plist 被自动重写为 NVM 路径，死循环警告 |
| [#43374 All LLM API calls time out simultaneously (multi-agent)](https://github.com/openclaw/openclaw/issues/43374) | 5 个月 | P3 | 多代理并发时内部瓶颈，需 maintainer 确认 |
| [#91455 Kubernetes 部署文档改进](https://github.com/openclaw/openclaw/issues/91455) | 2 个月 | P3 | 文档类 PR 已多轮讨论未合入 |

**提醒**：#62505 与 #38327 的组合效应是——**"代理什么都不做"与"升级后代理直接报错"**——两者覆盖了"无法完成工作"和"完全不可用"两个最严重的用户场景。建议维护者在本迭代内对这两个 issue 给出明确结论（修复或 workaround），否则可能影响社区信任度。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析（2026-08-19）

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态处于“高活跃、强分化、可靠性承压”阶段。OpenClaw 以单日 500 条 Issue/PR 更新量成为事实上的生态核心，其余项目则在桌面端、Codex 链路、Rust 安全化、多智能体协作、连接器生态等方向差异化突围。社区讨论高度集中在代理可靠性、会话数据可编程性、安全边界与多平台支持四大议题，多个项目同时出现“任务静默停止”“升级后不可用”“shell 工具无资源限制”等相似问题，说明行业仍缺少统一的稳定性基线。与此同时，NanoClaw 的数据库异步化重构、IronClaw 的 v1.3.0 候选发布、ZeroClaw 的 HMAC 工具执行收据等，正在为下一代架构打基础。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 500（新开/活跃 462，关闭 38） | 500（待合并 334，合并/关闭 166） | 无 | 高活跃，机器人+人工协同成熟；P1 积压需关注 |
| NanoBot | 9（活跃 6，关闭 3） | 22（待合并 16，合并/关闭 6） | 无 | 活跃健康；安全类 Issue #4797 悬置 43 天 |
| Hermes Agent | 50（活跃 40，关闭 10） | 50（待合并 45，合并/关闭 5） | v0.20.4 | 高活跃，桌面端迭代快；Debian 安装 P1 未修复 |
| PicoClaw | 6（活跃 5，关闭 1） | 4（待合并 2，合并/关闭 2） | 无 | 中等活跃；多个 `stale` 积压 |
| NanoClaw | 3（新开 1，关闭 2） | 37（合并/关闭 19，待合并 18） | 无 | 高强度架构重构；CWE-78 已修复但未发版 |
| NullClaw | 0 | 0 | 无 | 无活动，停滞 |
| IronClaw | 21（活跃 15，关闭 6） | 38（待合并 24，合并/关闭 14） | v1.3.0-rc.1 / rc.2 | 发布前修稳，rc.2 解决启动崩溃；健康 |
| LobsterAI | 9（全部 stale） | 20（合并/关闭 17，待合并 3） | 2026.8.18 | 中高活跃；集中清理 4 月积压 PR |
| Moltis | 2（关闭 2） | 6（合并/关闭 5，待合并 1） | 20260818.06 | 高响应，功能迭代与修复并行；健康 |
| CoPaw（QwenPaw） | 46（活跃 30，关闭 16） | 50（待合并 31，合并/关闭 19） | 无 | 高活跃；2.1.0 稳定性承压，任务中断/会话串扰突出 |
| ZeptoClaw | 0 | 0 | 无 | 无活动，停滞 |
| ZeroClaw | 50（活跃 32，关闭 18） | 50（待合并 11，合并/关闭 39） | 无 | 高活跃，功能+治理并进；Windows/安全风险需关注 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的“核心参照系”与事实上的基础设施层。其单日 Issue/PR 更新量达到 500/500，远超第二名（50/50），合并/关闭 PR 数达 166 条，说明维护带宽和社区贡献规模均为生态第一。项目已建立“clawsweeper 机器人 + 维护者人工”协同的自动化分诊/合并流程（如自动化合并 PR #125143），这在其他项目中尚未出现。

技术路线上，OpenClaw 强调双端安全确认（CLI + Control UI）、Codex 后端深度集成、SQLite 会话层、多频道覆盖，并围绕 web-ui/gateway/CLI 高频迭代。相较而言，NanoClaw 虽然同样聚焦 Codex 链路，但体量小得多，目前正通过中央数据库异步化重构实现驱动可移植；Hermes Agent 走 Desktop-first 路线，侧重 Electron 桌面体验；ZeroClaw 以 Rust 实现安全加固与可观测性；LobsterAI 则是直接依赖 OpenClaw 网关的桌面客户端。可以判断，OpenClaw 不仅是活跃度标杆，也是许多周边项目的上游依赖或功能对标对象。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| 代理可靠性/任务完成保障 | OpenClaw、CoPaw、Hermes、ZeroClaw | 编码代理“永远完不成任务”（OpenClaw #62505）、多步任务规划后静默停止（CoPaw #6921）、Bot 会话空白（Hermes #89206）、超大工具结果导致整轮失败（ZeroClaw #10067）；核心是希望有显式 stop reason、自动重试/降级、任务状态透传 |
| 会话/上下文数据可编程性与性能 | OpenClaw、NanoClaw、Moltis、ZeroClaw、NanoBot | 提供规范化 SQLite 会话访问层（OpenClaw #79902）、避免转录清理阻塞事件循环（#112423）、NanoClaw 数据库异步化与驱动抽象、Moltis 托管 Files 库、ZeroClaw 会话 TTL/持久化 prompt 附件；共同指向“存储层成为产品能力” |
| 安全边界与供应链 | NanoBot、Hermes、NanoClaw、ZeroClaw、OpenClaw、CoPaw | shell 子进程无资源限制可被 fork bomb（NanoBot #4797）、Docker 后端首个工具调用在宿主机执行（Hermes #54354）、容器镜像命令注入 CWE-78（NanoClaw #2538）、file_download SSRF（ZeroClaw #10070）、OAuth2 refresh_token 不轮换（CoPaw #7053）；安全修复需要快速通道 |
| 多平台/Windows/本地化 | Hermes、ZeroClaw、NanoBot、PicoClaw、CoPaw | Debian 安装脚本失败（Hermes #87093）、Windows 74 个测试失败（ZeroClaw #7462）、Windows 网关 PID 交接（NanoBot #5418）、IRCv3 长消息拆分（PicoClaw #3287）；CI 矩阵和平台适配仍是短板 |
| 多智能体/多实例控制平面 | Hermes、OpenClaw、ZeroClaw、CoPaw、NanoBot | Hermes 通过 Tailscale 管理多机实例（#89478）、OpenClaw 子代理隔离（#96975）、ZeroClaw Goal mode v1（#8303）、CoPaw 多智能体单窗口展示（#6925）、NanoBot 跨会话消息（#5358）；需要会话身份端到端保留与路由一致性 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构关键差异 |
|---|---|---|---|
| OpenClaw | 通用 Agent 网关/个人助手，多频道、CLI/UI、Codex 后端 | 开发者、重度自托管者 | 大而全，机器人辅助维护，安全确认链路完整 |
| NanoBot | 轻量级 TUI/WebUI + AgentLoop，跨会话消息 | 开发者、Windows 用户 | Python 实现，重视启动速度与平台健壮性 |
| Hermes Agent | Desktop-first（Electron） + Bot Mode + TUI | 桌面端专业用户 | “先绘制”式水合、持久化转录缓存、OAuth broker |
| PicoClaw | 轻量 IRC/频道机器人，provider 协议兼容 | 极简用户、树莓派用户 | 低资源，Anthropic 原生协议适配 |
| NanoClaw | Codex 后端 + Telegram 等渠道 | Codex 重度用户、自托管者 | 中央数据库异步化/驱动可移植，当前处于重构期 |
| IronClaw | 企业级沙箱、记忆、资源治理 | 部署运维者 | libSQL 写通道治理，v1.3.0 候选发布，记忆/沙箱 epic |
| LobsterAI | OpenClaw 桌面客户端/包装，多 AI 引擎 | 非技术桌面用户 | Electron，UI/UX 集成，定时任务系统通知 |
| Moltis | 本地优先 AI 工作台 + 连接器生态 | 隐私敏感用户、个人开发者 | Podman 沙箱、托管 Files 库、Tesla 等只读连接器 |
| CoPaw（QwenPaw） | 多智能体协作 + MCP + 多渠道（飞书/Matrix） | 企业用户、中文社区 | 沙盒、OAuth2、后台聊天任务列表；2.1.0 稳定性承压 |
| ZeroClaw | Rust 实现的安全/可观测 Agent | 安全运维、开发者 | HMAC 工具执行收据、SSRF 防护、多租户 Linq、wasmtime CVE 治理 |

## 6. 社区热度与成熟度

**第一梯队：高活跃且较成熟**  
- OpenClaw：500/500 更新，自动化流程完善，但 P1 历史 Bug 积压。  
- ZeroClaw：50/50 更新，39 个 PR 合并/关闭，功能落地效率高，处于架构收敛期。  
- CoPaw：46/50 更新，但稳定性问题集中，属于“发布后承压”阶段。  
- Hermes Agent：50/50 更新，Desktop 和安装脚本双线推进，修复响应快。

**第二梯队：快速迭代/专项重构**  
- NanoClaw：37 个 PR 更新，19 个合并，核心团队主导数据库异步化重构，外部 PR 同步汇入。  
- IronClaw：连续发布 rc.1/rc.2，处于 v1.3.0 发布前修稳阶段。  
- Moltis：5 个 PR 合并 + 新版本发布，功能迭代与 Bug 修复闭环快。  
- LobsterAI：17 个 PR 合并并发布 2026.8.18，集中消化历史积压。  
- NanoBot：6 个 PR 合并，集中在 Windows 兼容、TUI 体验与 CI 稳定性。

**第三梯队：低活跃/停滞**  
- PicoClaw：6 Issue / 4 PR，多个项被标 `stale`。  
- NullClaw、ZeptoClaw：过去 24 小时无活动。

## 7. 值得关注的趋势信号

**1. 可靠性正在取代“新功能”成为社区最高优先级**  
OpenClaw #62505 开放 4.5 个月未修复、CoPaw 多步任务静默停止、Hermes Bot 会话空白，用户对“代理假装完成/永远不完成”的容忍度正在触底。对开发者的参考价值：Agent 框架必须显式暴露 `stop_reason`、任务心跳、失败重试与降级路径，不能把“无输出”当正常返回。

**2. 安全已从“最佳实践”变成“社区红线”**  
NanoBot 的 `yes > /dev/null &` fork bomb 讨论、Hermes Docker 首个工具调用在宿主机执行、NanoClaw 的 CWE-78 修复合入延迟三个月，均说明安全设计的默认值需要更保守。参考价值：shell/容器工具应默认启用资源限制、命令审核、SSRF 防护与工具执行收据；安全修复合入应走 SLO 限定通道。

**3. SQLite/存储层从内部实现细节变成产品能力**  
OpenClaw 用户要求规范化 SQLite 会话访问层，NanoClaw 将中央数据库异步化并抽象驱动，Moltis 推出托管 Files 库，ZeroClaw 关注会话 TTL。参考价值：尽早提供结构化、可移植、异步非阻塞的会话/记忆存储 API，将直接影响二次开发生态和长会话稳定性。

**4. 多平台与本地化 CI 缺口正在造成真实用户流失**  
ZeroClaw 在 Windows 11 简体中文环境下 74 个测试失败，Hermes Debian 安装脚本失败，PicoClaw IRC 长消息处理不当。参考价值：将 Windows/macOS/Debian/Ubuntu 加入 CI 矩阵，覆盖 CJK 控制台编码，是提升“升级安全感”的最低成本手段。

**5. 多智能体/多实例协调成为下一波架构主题**  
Hermes 提出 Tailscale 多机连接池，OpenClaw 讨论子代理隔离，ZeroClaw 规划 Goal mode，CoPaw 希望多智能体单窗口展示，NanoBot 已实现跨会话消息。参考价值：会话身份端到端保留、路由一致性和跨实例状态同步应从第一天进入架构设计，否则后续改造将付出数倍成本。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-19

## 今日速览

过去 24 小时 NanoBot 共更新 9 条 Issue（新增/活跃 6 条、关闭 3 条）和 22 条 PR（待合并 16 条、已合并/关闭 6 条），无新版本发布。社区提交密度高，尤以开发者 **chengyongru** 贡献的 Windows 兼容性与 TUI 体验系列 PR 最为集中，5 条全部合入。AgentLoop 生命周期管理（[#5428](https://github.com/HKUDS/nanobot/issues/5428)/[#5429](https://github.com/HKUDS/nanobot/issues/5429) + [#5430](https://github.com/HKUDS/nanobot/pull/5430)/[#5431](https://github.com/HKUDS/nanobot/pull/5431)）形成了 Issue 与修复 PR 同日配套的协作闭环。整体活跃度高、合入节奏健康，但安全类 Issue [#4797](https://github.com/HKUDS/nanobot/issues/4797) 已悬置超 40 天，值得优先安排。

## 版本发布

无。

## 项目进展

今日共合并/关闭 6 条 PR，覆盖功能新增、性能优化、跨平台稳定性三条线：

- **跨会话消息功能（[#5358](https://github.com/HKUDS/nanobot/pull/5358)，已合并）** — 为每个持久化会话分配服务端 `@handle`，新增 `list_sessions`、`send_session_message`、`read_session` 等能力，并接入现有消息总线与 WebUI `user_message` 事件，附可配置速率限制。这是 WebUI 协作体验的一次实质性增强。
- **TUI 冷启动与退出延迟优化（[#5424](https://github.com/HKUDS/nanobot/pull/5424)，已合并）** — 先启动 TUI 进程再异步引导网关，并行执行凭证引导，显著缩短首帧等待时间；同时优化了 agent dispatch 路径，延迟 classic-agent 导入。
- **TUI API 凭证自动刷新（[#5432](https://github.com/HKUDS/nanobot/pull/5432)，已合并）** — 收到 HTTP 401 后自动通过认证引导端点刷新凭证，并发刷新去重，失败请求最多重试一次，覆盖会话、历史、上下文、命令、提及等全部 TUI 操作。
- **TUI composer 体验修复（[#5427](https://github.com/HKUDS/nanobot/pull/5427)，已合并）** — 点击其他区域后可恢复输入框焦点，并增加视觉区分，同时保持全屏 diff 查看器的焦点行为不变。
- **执行测试确定性改进（[#5433](https://github.com/HKUDS/nanobot/pull/5433)，已合并）** — 将 `write_stdin` 输出截断测试中的固定 500ms 轮询改为输出感知等待，修复 Windows 3.14 CI job 的 flakiness。
- **Windows 网关 PID 交接（[#5418](https://github.com/HKUDS/nanobot/pull/5418)，已合并）** — 允许托管网关接管 venv launcher 记录的 PID，保持后台/按需生命周期，并新增 Windows venv 回归测试，直接修复 [#5417](https://github.com/HKUDS/nanobot/issues/5417)。

**整体评估**：本轮合入集中在 WebUI/TUI 交互链路、Windows 平台健壮性和 CI 稳定性三个方向，未引入破坏性变更。跨会话消息新特性 + 性能优化的组合，意味着项目在"多会话协作"与"启动体验"两个维度均向前迈进了一步。

## 社区热点

- **[Issue #5149](https://github.com/HKUDS/nanobot/issues/5149)（6 条评论）— WhatsApp 音频消息无法发送**：当前评论数最高的 Issue，自 7 月 28 日提出后持续三周，用户明确表示"能接收、不能发送"。该问题直接关联 Neonize/ffmpeg 链路，已产生日志线索但尚无修复 PR，社区关注度与实际影响面都在上升。
- **[Issue #4797](https://github.com/HKUDS/nanobot/issues/4797)（1 条评论）— shell 子进程无资源限制**：指向 `ExecTool._spawn()` 缺少 ulimit/cgroup/CPU/内存限制，LLM 可能被诱导执行 `yes > /dev/null &` 或 fork bomb。虽然评论数不高，但属于安全高危讨论，且在开源社区中容易引发连锁关注。
- **AgentLoop 生命周期成组讨论（[#5428](https://github.com/HKUDS/nanobot/issues/5428) + [#5429](https://github.com/HKUDS/nanobot/issues/5429) + [#5430](https://github.com/HKUDS/nanobot/pull/5430) + [#5431](https://github.com/HKUDS/nanobot/pull/5431)）**：Issue 与修复 PR 同日出现，围绕同一模块的后台任务异常丢失与空任务组内存泄漏展开，是当日协作最为密集的技术主题。
- **Mattermost 系统消息过滤（[#5434](https://github.com/HKUDS/nanobot/pull/5434)）**：新提交的 PR，直指 Mattermost 渠道将系统通知（如频道加入/离开）与用户消息混入同一 `posted` 事件的真实痛点，预计会获得较多渠道用户的回应。

## Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 对应修复 |
|---|---|---|---|
| 🔴 高 | [shell 子进程无资源限制（#4797）](https://github.com/HKUDS/nanobot/issues/4797)：LLM 可触发 fork bomb / 无限制资源消耗，无 ulimit、cgroup、CPU/内存上限 | 开放 43 天，无修复 PR | — |
| 🟠 中高 | [WhatsApp 音频消息无法发送（#5149）](https://github.com/HKUDS/nanobot/issues/5149)：可接收但发送失败，日志显示 ffmpeg 链路 warning | 开放 22 天，无修复 PR，6 条评论 | — |
| 🟡 中 | [AgentLoop 不检索后台任务异常（#5429）](https://github.com/HKUDS/nanobot/issues/5429)：`set.discard` 回调吞掉异常，任务失败无感知 | 开放当日 | [PR #5431](https://github.com/HKUDS/nanobot/pull/5431)（待合并） |
| 🟡 中 | [AgentLoop 空任务组残留（#5428）](https://github.com/HKUDS/nanobot/issues/5428)：长跑会话结束后 `_active_tasks` 保留空 set，内存持续累积 | 开放当日 | [PR #5430](https://github.com/HKUDS/nanobot/pull/5430)（待合并） |
| 🟢 低 | [socks:// 代理 URL 不兼容（#5425）](https://github.com/HKUDS/nanobot/issues/5425)：自定义 OpenAI 兼容提供商配置 `socks://` 时代理解析失败 | 开放当日 | [PR #5426](https://github.com/HKUDS/nanobot/pull/5426)（待合并） |
| ✅ 已解决 | [Windows WebUI 因网关 PID 交接退出（#5417）](https://github.com/HKUDS/nanobot/issues/5417) | 已关闭 | [PR #5418](https://github.com/HKUDS/nanobot/pull/5418)（已合并）、[PR #5415](https://github.com/HKUDS/nanobot/pull/5415)（待合并） |

## 功能请求与路线图信号

- **持久化记忆需求明确**：[#5372 ViBo 记忆系统集成提案](https://github.com/HKUDS/nanobot/issues/5372) 虽已关闭，但外部用户主动指出"每次会话从零开始、重复传上下文浪费 token"的痛点，说明跨会话记忆仍是社区期待的能力。
- **成本控制方向已有动作**：[#5409 混合消费防火墙](https://github.com/HKUDS/nanobot/issues/5409) 提出防止无限循环耗尽 LLM 预算；同日 [PR #5403](https://github.com/HKUDS/nanobot/pull/5403)（**p1**）尝试用 API 报告的 prompt token 替代本地 tiktoken 估算来触发记忆整合，两者指向同一目标——减少 token 浪费与预算失控风险。
- **提供商生态持续扩展**：[PR #5234](https://github.com/HKUDS/nanobot/pull/5234) 引入 mst-python 元搜索提供商（RRF 多引擎融合）；[PR #5419](https://github.com/HKUDS/nanobot/pull/5419) 新增 DashScope（阿里云）原生图像生成客户端，支持 `qwen-image-*`、`wan2.7-image` 等模型；[PR #5426](https://github.com/HKUDS/nanobot/pull/5426) 补齐 `socks://` 代理兼容。
- **MCP schema 预算控制**：[PR #5388](https://github.com/HKUDS/nanobot/pull/5388) 为模型可见的 MCP 工具 schema 增加可选字节预算，在保留全部内置工具与可执行 MCP 工具集不变的前提下，从最新用户请求中确定性子集选择，控制 token 消耗。
- **待确认的设计契约**：[Issue #5421](https://github.com/HKUDS/nanobot/issues/5421) 询问 idle compaction 是否应保留并发 turn 创建的 provider state，作者明确表示"确认契约后再提实现 PR"，需要维护者给出决策。

## 用户反馈摘要

- **核心功能痛点（音频链路）**：[#5149](https://github.com/HKUDS/nanobot/issues/5149) 用户反馈 "nanobot will not send audio message on whatsapp. it does receive them"，与 ffmpeg 日志告警相对应。该问题持续三周无修复，已影响 WhatsApp 渠道的实际可用性。
- **安全与多租户担忧**：[#4797](https://github.com/HKUDS/nanobot/issues/4797) 用户明确表示 "An LLM could issue commands like `yes > /dev/null &` or fork bombs that consume all system resources"，反映出生产部署场景下对 shell 工具安全边界的强烈关注。
- **第三方集成意愿**：[#5372](https://github.com/HKUDS/nanobot/issues/5372) 与 [#5409](https://github.com/HKUDS/nanobot/issues/5409) 均为外部用户主动提出的生态提案（记忆系统 / 成本防火墙），说明项目已具备生态吸引力，但也侧面反映官方尚未内置这两类能力。
- **贡献者体验正向**：多个外部开发者（chengyongru、yu-xin-c、pxy0592、dajiaohuang、Re-bin 等）在同一时段提交高质量 PR，且多数能在当日或数日内获得合并，说明项目 review 流程与协作机制对贡献者较为友好。

## 待处理积压

- **[#4797 shell 子进程资源限制（安全）](https://github.com/HKUDS/nanobot/issues/4797)** — 开放 43 天，安全类高优问题，至今无修复 PR 或维护者回应，建议优先排期。
- **[#5149 WhatsApp 音频发送失败](https://github.com/HKUDS/nanobot/issues/5149)** — 开放 22 天，6 条评论，核心渠道功能缺陷，需要渠道与 ffmpeg 链路的专项排查。
- **[PR #5234 mst-python 元搜索提供商](https://github.com/HKUDS/nanobot/pull/5234)** — 开放 15 天，标记 `conflict`，需解决冲突或维护者介入 review。
- **[PR #5341 Windows-safe weather workflow](https://github.com/HKUDS/nanobot/pull/5341)** — 开放 8 天，标记 `conflict`，修复 PowerShell `curl` 别名问题。
- **[PR #5415 Windows venv 子进程接管](https://github.com/HKUDS/nanobot/pull/5415)** — 开放 2 天，标记 `conflict`，与已合并的 #5418 同源，需协调合入顺序。
- **[PR #5411 CLI runtime 隔离重构](https://github.com/HKUDS/nanobot/pull/5411)** — 开放 2 天，标记 `conflict`，涉及 `--no-tui` 移除与 `--classic` 保留的兼容性决策。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-19

## 1. 今日速览

过去 24 小时项目保持着高活跃度：共产生 50 条 Issue 更新（其中新开/活跃 40 条、关闭 10 条），50 条 PR 更新（其中 45 条待合并、5 条已合并/关闭），并发布了 v0.20.4 补丁版本（v2026.8.18）。今日热点集中在三块：Desktop Bot Mode 的会话状态问题（多起报告，已有对应修复 PR）、Debian 安装脚本回归（P1 优先级）、以及 TUI 方向键的显示回归（0.20.3 引入）。社区贡献保持活跃，45 条待合并 PR 表明有一批修复与功能正等待合入；同时需注意高优先级安装类问题（#87093）目前仍无明确修复 PR 挂出。

## 2. 版本发布

### [Hermes Agent v0.20.4（v2026.8.18）](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.18)

- **发布日期：** 2026-08-18
- **性质：** 补丁版本（Patch release）
- **内容说明：** 该标签滚动汇总了自 v0.20.3 以来合并的约 74 个 PR，面向下游消费者（Docker 镜像、托管部署、全新安装）提供稳定的可发布版本。数据源未展开具体变更条目，但结合 Issue/PR 列表可见，此版本包含 Desktop Bot Mode 性能优化（#89510）、Bot Mode 头像功能（#89386）、OpenAI Codex OAuth 代理（#89530）等合入内容。
- **破坏性变更：** 未见明确标注的破坏性变更。
- **迁移注意：** 因涉及安装脚本相关修复（#89533），建议 Ubuntu/Debian 用户更新安装脚本后重新执行安装流程。

## 3. 项目进展

过去 24 小时已合并/关闭 PR 共 5 条（可见 3 条），主要推进集中在 Desktop 体验优化与基础设施适配：

- [#89386 feat: Bot Mode agents get deterministic blob-face avatars](https://github.com/NousResearch/hermes-agent/pull/89386)（已合并）— Bot Mode 中新建代理默认使用基于名称生成的确定性格子脸头像，并附带随机化、锁定、剪影等手动控制。这是桌面端品牌化/个性化方向的体验补充。

- [#89510 perf: Bot Mode wakes paint instantly — paint-first hydration + durable transcript cache](https://github.com/NousResearch/hermes-agent/pull/89510)（已合并）— 解决了 #89206 为代表的 Bot Mode 唤醒类问题：通过“先绘制”式水合与持久化转录缓存，让历史会话在渲染完成时即视为可交互，后台继续完成代理构建、MCP 发现、技能加载等重活。这是一个针对感知性能的重要优化。

- [#89530 feat(proxy): add OpenAI Codex OAuth broker](https://github.com/NousResearch/hermes-agent/pull/89530)（已合并）— 新增一个窄范围的本地 `openai-codex` OAuth 代理适配器：Hermes 保持对 Codex OAuth 会话和上游 bearer 的完全所有权，本地客户端仅获得普通的 Responses API 结果，不能读取 Hermes 凭据存储。安全边界设计清晰，扩展了代理层的生态兼容性。

整体来看，项目在 Desktop 可用性、代理层生态兼容性和安装可靠性三个方向持续前进。

## 4. 社区热点

今日讨论热度集中在安装失败、性能问题和 Bot Mode 会话状态三方面：

- [#87093 [Setup] Debian installation broken; uv.lock & npm install failed](https://github.com/NousResearch/hermes-agent/issues/87093)（开放，评论 13，P1）— 基础 Debian 13.6 环境执行官方安装脚本即失败，涉及 uv.lock 与 npm install。这是当前最高优先级的安装阻断问题，严重影响到新用户的首次体验，且已持续三天（08-15 创建），急需维护者介入。

- [#88275 [desktop] Renderer process burns 40-70% CPU at idle — thermal throttling on macOS Intel](https://github.com/NousResearch/hermes-agent/issues/88275)（开放，评论 8，P3）— Intel Mac 上 Hermes Helper（渲染进程）持续占用 40-73% CPU，导致热降频。禁用 GPU 可部分缓解。这暴露了 Electron 桌面端在旧款 Mac 上的资源调度问题，对使用体验影响较大。

- [#80821 Feature Request: LaTeX/MathJax rendering support in desktop chat UI](https://github.com/NousResearch/hermes-agent/issues/80821)（已关闭，评论 7）— 用户长时间期待的 LaTeX 数学公式渲染需求，讨论了集成 KaTeX/MathJax 的方案。已关闭，具体关闭原因（是否已实现或被婉拒）数据未明确。

- [#89206 Desktop Bot Mode: non-primary chats remain blank](https://github.com/NousResearch/hermes-agent/issues/89206)（已关闭，评论 6，👍 2）— 非主配置文件的 Bot 对话在桌面端显示空白，被标记为 #88540 的回归/延伸。该问题已有对应修复 PR #89510 合入，是今日用户痛点到修复落地的典型案例。

- [#69255 provider_model_ids swallows TypeError when plugin fetch_models omits base_url](https://github.com/NousResearch/hermes-agent/issues/69255)（已关闭，评论 4）— 第三方模型插件在缺少 `base_url` 参数时异常被吞掉，导致模型选择器显示 0 个模型。后续 #88615 被关闭为重复，说明底层问题已定位并有修复。

## 5. Bug 与稳定性

按严重程度排列今日活跃 Bug（含回归）：

| 严重度 | Issue | 问题 | 状态 | Fix PR |
|---|---|---|---|---|
| P1 | [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian 安装脚本失败（uv.lock & npm install） | 开放（08-15） | 暂无 |
| P2 | [#88964](https://github.com/NousResearch/hermes-agent/issues/88964) | TUI 方向键打印原始转义序列（0.20.3 回归） | 开放（08-18） | 暂无 |
| P2 | [#89206](https://github.com/NousResearch/hermes-agent/issues/89206) | Desktop Bot Mode 非主聊天空白/消息不可达 | 已关闭 | [#89510](https://github.com/NousResearch/hermes-agent/pull/89510) 已合入 |
| P2 | [#88955](https://github.com/NousResearch/hermes-agent/issues/88955) | Bot Mode 群聊中断轮次残留隐藏空消息，每轮触发消毒器 | 开放（08-18） | [#89525](https://github.com/NousResearch/hermes-agent/pull/89525) 待合并 |
| P2 | [#89477](https://github.com/NousResearch/hermes-agent/issues/89477) | Gateway 崩溃/无法轮询 Telegram 独立 Bot（命名 profile） | 开放（08-18） | 暂无 |
| P2 | [#73403](https://github.com/NousResearch/hermes-agent/issues/73403) | Windows ACP 适配器终端工具挂起（Git Bash 探测卡死） | 开放（07-28） | [#69083](https://github.com/NousResearch/hermes-agent/pull/69083) 待合并 |
| P2 | [#54354](https://github.com/NousResearch/hermes-agent/issues/54354) | Docker 后端首次工具调用在镜像拉取前于宿主机运行 | 开放（06-28） | 暂无 |
| P2 | [#59030](https://github.com/NousResearch/hermes-agent/issues/59030) | no_agent cron 任务使用过期 os.environ 凭据 | 开放（07-05） | 暂无 |
| P2 | [#77178](https://github.com/NousResearch/hermes-agent/issues/77178) | terminal 进程等待 sccache 守护进程子代永久占用 | 开放（08-03） | 暂无 |
| P3 | [#88275](https://github.com/NousResearch/hermes-agent/issues/88275) | Desktop 渲染进程 CPU 占 40-70%（Intel Mac） | 开放（08-17） | 暂无 |
| P3 | [#85672](https://github.com/NousResearch/hermes-agent/issues/85672) | macOS Desktop Kanban 附件下载路径错误 | 开放（08-13） | 暂无 |
| P3 | [#88762](https://github.com/NousResearch/hermes-agent/issues/88762) | Qwen 3.8 在本地运行失效（3.6 正常） | 开放（08-17） | 暂无 |

**观察：** 今日 P2 级问题密集，但修复跟进速度也很快——#89206 已通过 #89510 解决，Windows ACP 挂起有 #69083（注意此 PR 创建于 7/28 后 8/18 仍有更新，长期待合入），#88955 有 #89525 对应修复。TUI 回归（#88964）和 Telegram 多 profile 轮询失败（#89477）是新出现的活跃问题，暂无 fix PR。

## 6. 功能请求与路线图信号

- **多机连接池（TUI/Desktop）：** [#89478](https://github.com/NousResearch/hermes-agent/pull/89478) 提出通过 Tailscale 网络发现、管理并监控多台 Hermes 实例，新增 `/pool` CLI/TUI 界面。这是一个较大的架构级功能，意味着项目正从“单机 Agent”向“多机控制平面”演进。尚需观察是否会进入正式路线图。

- **会话路由身份端到端保留：** [#88680](https://github.com/NousResearch/hermes-agent/issues/88680) 指出 Desktop 的执行身份已从“活跃 profile”变为“路由”（注册源 + Desktop-facing profile），需要架构性改造以确保会话、连接、目标 profile 三者一致。这是一个值得关注的架构信号，结合 #89131（Bot Mode 丢失 Cloud alias）和 #89445（辅助任务 base_url 被忽略）可见，连接/路由/配置组合场景正成为当前矛盾集中点。

- **入站消息钩子（含发送者/消息 ID）：** [#84580](https://github.com/NousResearch/hermes-agent/issues/84580) 请求为 WhatsApp 等平台提供带可信元数据的入站消息钩子，使外部服务可安全地做幂等 CRM 创建。当前 P3 + needs-decision，属于网关扩展性需求。

- **Desktop Models 面板支持 cron 配置：** [#89513](https://github.com/NousResearch/hermes-agent/issues/89513) 请求在桌面端补上 cron 模型漂移设置（drift guard / fleet model），使定时任务的模型路由可从 UI 管理。

- **Bot Mode 活动视图：** [#89522](https://github.com/NousResearch/hermes-agent/pull/89522) 为群聊 Bot 模式添加折叠的 Activity 视图，展示每轮各 bot 的最终状态（settled / timed out / failed），改善群聊过程的透明性与可观测性。

## 7. 用户反馈摘要

- **安装体验是当前最大痛点：** #87093 用户在纯净 Debian 13.6 上执行官方安装脚本即失败（uv.lock + npm install），说明安装器的跨发行版兼容性仍需打磨。关联 PR #89533（Ubuntu 缺少 libatomic1）表明 Node 26 二进制对系统库的依赖未被安装脚本覆盖，Ubuntu/Debian 用户尤其受影响。

- **旧款 Mac 用户受到性能困扰：** #88275 反馈 Intel MacBook Pro 2019 上 Hermes Desktop 渲染进程空转占用 40-73% CPU，导致热降频。用户已尝试 `desktop.disable_gpu=true` 应急，但这属于降低体验的规避手段。这类问题对长期使用者的耐心消耗很大。

- **回归问题损伤信任：** #88964 报告 0.20.3 更新后 TUI 方向键打印原始转义序列，这是基础交互回归，用户很容易感知。尽管不是数据损坏类问题，但会极大影响“升级安全感”。相比之下 #89206（Bot 会话空白）因为修复快速（#89510 当天合入），社区反馈偏正面。

- **对数学/文档渲染的呼声仍在：** #80821 要求桌面聊天 UI 支持 LaTeX/MathJax 渲染（类似 GitHub/Notion/Obsidian），该诉求在 8/7 提出、8/18 关闭，虽然没有在日报中看到直接的实现对应用，但结合 #84951（原生 markdown 渲染）的关闭，说明文档/数学公式的可读性正在被逐步纳入桌面端体验议程。

## 8. 待处理积压

以下为长期开放但近期仍有更新且对用户影响较大的重要 Issue/PR，建议维护者优先关注：

- [#54354 Docker backend: first tool call before image is pulled runs on host](https://github.com/NousResearch/hermes-agent/issues/54354)（P2，06-28 创建，近 2 个月）— 安全边界类问题：冷启动时首个工具调用在宿主机执行并返回本地路径。风险高，值得优先处理。

- [#59030 no_agent cron jobs deliver with stale os.environ credentials](https://github.com/NousResearch/hermes-agent/issues/59030)（P2，07-05 创建，约 6 周）— 定时任务凭据不一致，影响看门狗/数据采集类 cron 场景的可靠性。

- [#73403 Windows ACP adapter hangs when executing terminal tool](https://github.com/NousResearch/hermes-agent/issues/73403)（P2，07-28 创建，已有修复 PR #69083 待合入）— 修复方案已存在但尚未合并，Windows + ACP 用户持续受影响。建议尽快推动评审合并。

- [#77178 terminal: process_subreaper waits forever on sccache daemon descendant](https://github.com/NousResearch/hermes-agent/issues/77178)（P2，08-03 创建）— 后台命令可能永久挂起，影响 Rust 等编译流程的自动化任务。

- [PR #21820 fix(anthropic): defend normalize_response against content=None](https://github.com/NousResearch/hermes-agent/pull/21820)（05-08 创建，已超 3 个月）— 针对 Anthropic 兼容端点返回 `content: null` 的防护，已观察到 Kimi For Coding 实际触发该非标准行为。长期未合入，兼容性风险仍在。

- [PR #64866 fix(wecom): back off when websocket closes during auth](https://github.com/NousResearch/hermes-agent/pull/64866)（07-15 创建）— 企业微信适配器在认证期间 WebSocket 关闭时需退避重连，长期未合入，影响 WeCom 通道的稳定性。

- [PR #78020 fix(gateway): drain active work before macOS service restart](https://github.com/NousResearch/hermes-agent/pull/78020)（08-03 创建）— macOS `hermes gateway restart` 应通过 SIGUSR1 排空活动工作后再退出，避免重启丢失任务。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报（2026-08-19）

## 今日速览

- 过去 24 小时项目有 6 条 Issue 更新（5 条活跃/新增，1 条关闭）、4 条 PR 更新（2 条待合并，2 条已关闭/合入），无新版本发布。
- 两项功能型 PR 关闭/合入：新增 Anthropic 原生 Messages API 协议支持、LLM 响应调试日志中增加 prompt cache token 输出，整体向「协议兼容性」和「可观测性」方向推进。
- 社区热度集中在大版本功能上：#806 WebUI 支持获得 8 个 👍，属于 high priority roadmap；#3287 IRC 长消息处理也有 6 条评论，用户诉求具体。
- 项目活跃度中等偏正向，但多个 Issue/PR 带有 `stale` 标记，维护者需关注积压项，避免社区反馈长时间无响应。

---

## 版本发布

无。

---

## 项目进展

### 已关闭 / 合入 PR

- [PR #1158](https://github.com/sipeed/picoclaw/pull/1158) — `feat: add anthropic-messages protocol for native Anthropic API format`  
  新增 `anthropic-messages` 协议前缀，使 PicoClaw 可使用 Anthropic 原生 `/v1/messages` 端点，解决只支持 Anthropic 原生 API 格式的服务无法使用的问题，并 Fixes #269。

- [PR #3317](https://github.com/sipeed/picoclaw/pull/3317) — `feat(providers): log prompt cache tokens in LLM response debug output`  
  在 LLM 响应调试行中补充 `prompt cache` 相关 token 信息。对 DeepSeek、Cloudflare AI Gateway 等会返回 cache metadata 的 provider，调试和成本分析更清晰。

### 待合并 PR

- [PR #3329](https://github.com/sipeed/picoclaw/pull/3329) — `fix(line): warn on inert webhook_host / webhook_port instead of seeding them`  
  处理 #3328，让无效配置不再“静默生效”，改为警告。

- [PR #3314](https://github.com/sipeed/picoclaw/pull/3314) — `Fix: agent not able to execute shell command added to customAllowPatterns`  
  修复 `customAllowPatterns` 不生效的问题，例如 `git push` 被默认 deny 规则拦截。

整体来看，项目在推进 LLM provider 兼容层和调试可观测性，但上述两项修复 PR 仍待合入，相关 bug 尚未真正交付到用户侧。

---

## 社区热点

- [Issue #806 — Add webUI support (Refactoring now)](https://github.com/sipeed/picoclaw/issues/806)  
  9 条评论、8 个 👍，是当前社区关注度最高、且被标记为 `priority: high` 和 `roadmap` 的 Issue。核心诉求是降低非技术用户使用门槛，TUI 对终端用户友好，但浏览器 Web UI 才是面向普通用户的更直观方案。描述中提到 “Refactoring now”，说明已有重构动作。

- [Issue #3287 — Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)  
  6 条评论，用户希望 PicoClaw 将 IRCv3 中因 512 字节限制而被客户端拆分的多条长消息合并为一条完整消息。属于协议层体验优化，当前尚未看到对应 PR。

- [Issue #3301 — /clear and session auto-compression don't work in chats routed to non-default agent](https://github.com/sipeed/picoclaw/issues/3301)  
  4 条评论，影响使用 dispatch rules 将聊天路由到非默认 agent 的用户，尤其影响 Discord/Telegram 渠道上的会话管理。

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue / PR | 问题描述 | 状态 |
|---|---|---|---|
| 高 | [Issue #3339](https://github.com/sipeed/picoclaw/issues/3339) | Google Antigravity 模型发现和鉴权正常，但所有生成请求返回通用 429 `RESOURCE_EXHAUSTED`，且没有配额详情，用户无法判断是配额耗尽还是兼容层问题 | Open，暂无 fix PR |
| 高 | [Issue #3301](https://github.com/sipeed/picoclaw/issues/3301) | 经 dispatch rules 路由到非默认 agent 的聊天中，`/clear` 和 session auto-compression 失效，影响 Raspberry Pi 上的 Discord/Telegram 用户 | Open，`stale`，暂无 fix PR |
| 中 | [Issue #3328](https://github.com/sipeed/picoclaw/issues/3328) | `line.settings.webhook_host` / `webhook_port` 只有默认值和文档，代码中没有任何读取逻辑，配置无效且无提示 | Open，`stale`，已有 [PR #3329](https://github.com/sipeed/picoclaw/pull/3329) 但未合入 |
| 中 | [PR #3314](https://github.com/sipeed/picoclaw/pull/3314) | `customAllowPatterns` 不生效：default deny 模式优先级过高，导致用户添加的自定义 shell 命令（如 `git push`）仍被拦截 | Open，`stale`，待 review |
| 低 | [Issue #3292](https://github.com/sipeed/picoclaw/issues/3292) | 聊天界面输入框选中时 CPU 占用过高，发生在 Firefox Web 端 | Closed，`stale`，当前无证据表明已修复 |

---

## 功能请求与路线图信号

- [Issue #806 — Add webUI support](https://github.com/sipeed/picoclaw/issues/806)  
  这是目前最明确的路线图级功能请求，被标记为 `priority: high` 和 `roadmap`，且作者在描述中提到 “Refactoring now”。Web UI 大概率是下一阶段重点，可能进入下个大版本。

- [Issue #3287 — Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)  
  社区明确提出 IRC 长消息合并需求。目前没有对应 PR，但如果协议兼容层继续完善，此功能有机会进入后续迭代。

- [PR #1158 — anthropic-messages protocol](https://github.com/sipeed/picoclaw/pull/1158)  
  已关闭/合入，说明 PicoClaw 对 Anthropic 原生 API 格式的兼容是当前 provider 扩展方向之一。

- [PR #3317 — prompt cache tokens logging](https://github.com/sipeed/picoclaw/pull/3317)  
  体现可观测性路线：除了统计普通 token，还会记录 cache token，便于用户在 DeepSeek、Cloudflare AI Gateway 等场景下分析成本。

---

## 用户反馈摘要

- **新手用户**：TUI 对终端用户很好，但对“非技术用户”仍是门槛，浏览器 Web UI 是更自然的入口（[#806](https://github.com/sipeed/picoclaw/issues/806)）。
- **IRC 用户**：IRCv3 长消息被客户端拆分后，PicoClaw 未正确识别为同一消息，导致上下文割裂，影响使用体验（[#3287](https://github.com/sipeed/picoclaw/issues/3287)）。
- **Raspberry Pi / 多平台用户**：dispatch rules 导致会话管理功能失效，说明该配置组合在真实环境中容易被触发，需要更完善的回归测试（[#3301](https://github.com/sipeed/picoclaw/issues/3301)）。
- **Web 端用户**：输入框聚焦时 CPU 飙升，影响浏览器端使用体验；该 Issue 已关闭但未看到明确的修复说明（[#3292](https://github.com/sipeed/picoclaw/issues/3292)）。
- **配置用户**：文档中存在的 webhook 配置项实际不生效，用户希望至少能收到警告，而不是被“静默忽略”（[#3328](https://github.com/sipeed/picoclaw/issues/3328)、[PR #3329](https://github.com/sipeed/picoclaw/pull/3329)）。
- **云模型用户**：Antigravity 鉴权和模型发现都成功，但生成请求统一 429，错误信息无足够细节，难以自助排查（[#3339](https://github.com/sipeed/picoclaw/issues/3339)）。

---

## 待处理积压

- [Issue #806 — Add webUI support](https://github.com/sipeed/picoclaw/issues/806)  
  已持续较长时间，社区关注度高，需要维护者给出阶段性状态更新或关联开发分支。

- [Issue #3301 — dispatch rules 下 /clear 失效](https://github.com/sipeed/picoclaw/issues/3301)  
  已被标 `stale`，但影响多平台真实用户，建议重新确认是否可复现并排期修复。

- [Issue #3328 — webhook 配置不生效](https://github.com/sipeed/picoclaw/issues/3328)  
  已有对应修复 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329)，但 PR 同样 `stale`，需要维护者尽快 review。

- [PR #3314 — customAllowPatterns 修复](https://github.com/sipeed/picoclaw/pull/3314)  
  修复 agent 无法执行自定义 shell 命令的问题，直接影响实际自动化能力，建议优先处理。

- [Issue #3339 — Antigravity 429](https://github.com/sipeed/picoclaw/issues/3339)  
  新提交但无回复，属于阻断型 bug，建议尽快确认是否与配额映射或 provider 实现有关。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-19

## 1. 今日速览

NanoClaw 过去 24 小时活跃度极高：共 37 条 PR 更新，其中 19 条已合并/关闭、18 条等待合并，另有 3 条 Issue 更新（1 新开、2 关闭）。核心团队（moshe-nanoco）主导的**中央数据库异步化与驱动可移植性重构**占据今日提交主线，呈现"阶梯式"推进态势——从路径集中、SQL 可移植、驱动抽象到异步接入，多个步骤在同一天内连续合并。社区侧则有 You.com MCP 工具技能与新渠道适配器（Dial）等待合并，同时一条 5 月的容器命令注入安全修复今日正式合入。整体判断：项目处于**高强度的架构演进期**，核心团队主导的 DB 层重构与社区贡献并行推进，项目健康度良好，但需注意重构产生的破坏性变更对现有渠道/插件的影响。

---

## 2. 版本发布

今日无新版本发布（最新 Releases: 无）。

---

## 3. 项目进展

今日合并/关闭的 19 条 PR 中，绝大多数属于 `moshe-nanoco` 的**中央数据库重构系列**，目标是为 SQLite 之外的远程/便携驱动铺路。通过 PR 队列可以清晰看到这一演进路径：

```
#3321 [合并] refactor(db): centralize the central database path      → 集中数据库路径
#3323 [合并] refactor(db): make central SQL portable                 → SQL 可移植化
#3324 [合并] refactor(db): add async central database seam           → 新增异步接缝
#3325 [合并] [BREAKING] refactor(db): adopt async central database seam → 正式切换异步
#3327 [合并] refactor(db): add backend composition and migration modes  → 后端组合与迁移模式
#3326 [合并] fix(db): close async concurrency races                  → 修复异步并发竞态
#3330 [合并] test(db): run central suites through the driver         → 测试驱动化
#3329 [合并] fix(db): make concurrent queue dequeue lossless         → 修复队列并发去重丢失
#3320 [合并] chore(lint): enforce async promise handling             → 强制异步 Promise 处理
```

该系列将中央数据库从 `better-sqlite3` 直连逐步解耦为 `DbDriver` 抽象，并修复了异步化过程中暴露的并发竞态问题。同步推进的还有：

- **安全修复**：[PR #2538](https://github.com/nanocoai/nanoclaw/pull/2538)（5 月 18 日创建，今日合入）为 `buildAgentGroupImage()` 增加包名校验，封堵**操作系统命令注入漏洞（CWE-78）**——这条修复距创建已三个月，建议后续关注安全修复合入时效。
- **数据库测试覆盖**：[PR #3330](https://github.com/nanocoai/nanoclaw/pull/3330) 将中央数据库集成测试从裸 SQLite 迁移到 `DbDriver` API，并支持远程后端在线重置/迁移测试 schema。

目前仍在等待合并的重构后续 PR 包括：[#3333](https://github.com/nanocoai/nanoclaw/pull/3333)（异步中央数据库接缝）、[#3332](https://github.com/nanocoai/nanoclaw/pull/3332)（便携驱动准备）、[#3335](https://github.com/nanocoai/nanoclaw/pull/3335)（后端组合与便携测试）、[#3334](https://github.com/nanocoai/nanoclaw/pull/3334)（[BREAKING] 安全采用异步中央数据库）以及 [#3337](https://github.com/nanocoai/nanoclaw/pull/3337)（Codex 侧数据库操作 await 修复）、[#3319](https://github.com/nanocoai/nanoclaw/pull/3319)（channels 侧 await 修复）。重构链条尚未终止，预计还会持续数日。

---

## 4. 社区热点

**最受关注 Issue：[#3338 Codex WebSocket idle retry 被 NanoClaw 的 10 分钟超时隐藏](https://github.com/nanocoai/nanoclaw/issues/3338)**

- 作者：ionescu77 ｜ 创建于 08-18 ｜ 2 条评论
- 这是今日唯一新开 Issue。问题场景：Codex CLI 自身有五分钟 WebSocket 空闲超时并会内部重试，但 `codex app-server` 未将该失败透传给 NanoClaw，导致**一条简单 Telegram 请求可能静默 10 分钟无响应**（NanoClaw 的 10 分钟轮询超时掩盖了底层故障）。
- 背后的诉求是**可观测性与错误透传**——上层应用需要及时感知底层模型后端的中断，而非由超时机制被动兜底。相关修复 PR [#3337](https://github.com/nanocoai/nanoclaw/pull/3337)（`fix(codex): await central database operations`）虽主要面向数据库操作，但同属 Codex 链路健壮性改进，建议维护者将两者关联评估。

**PR 侧的主力讨论**：`moshe-nanoco` 大批量 DB 重构 PR（#3320~#3337）虽然评论计数未显示，但 18 条同时在线的规模本身即是社区关注焦点，核心团队之外的贡献者（如 `avital-nanoco` 的 README 横幅 [#3328](https://github.com/nanocoai/nanoclaw/pull/3328)、`itsakhilyou` 的 You.com 技能 [#3322](https://github.com/nanocoai/nanoclaw/pull/3322)）也在同步汇入，说明**核心团队重构期间外部贡献通道依然开放且活跃**。

---

## 5. Bug 与稳定性

按严重程度排序：

1. **【安全·已修复】容器运行时 OS 命令注入** — [PR #2538](https://github.com/nanocoai/nanoclaw/pull/2538)（今日已合并）
   - 问题：`buildAgentGroupImage()` 中 `packageNames` 未经校验直接进入 Dockerfile 插值，可导致 CWE-78 命令注入。
   - 状态：已合入 `main`，但 **尚无 Release 版本包含此修复**，建议尽快随下一版本发布。
   - 备注：该 PR 2026-05-18 创建，直到 2026-08-18 才被合并，三个月的前置等待值得复盘。

2. **【高危·已确认】`/update-nanoclaw` 可在无恢复能力时标记成功** — [Issue #3194](https://github.com/nanocoai/nanoclaw/issues/3194)（今日关闭）
   - 问题：更新回滚仅保护 Git 工作区，不覆盖 SQLite 数据库、gitignored 配置及外部组件变更。存在四个失败窗口，可能导致更新"假成功"且无法回退。
   - 状态：今日关闭，但摘要中未显示对应修复 PR 编号，建议维护者确认关闭原因并在 Release Notes 中说明修复方案。

3. **【中危·已修复】`/update-skills` 对已安装渠道静默失效** — [Issue #2868](https://github.com/nanocoai/nanoclaw/issues/2868)（今日关闭）
   - 问题：对已安装 channel 执行 `/update-skills` 不会刷新适配器代码或锁定依赖，与 CHANGELOG 中"re-run `/add-<channel>`"的迁移指引相矛盾。
   - 状态：关闭于 08-18，该 Issue 自 06-26 提出，历时近两个月解决，属于**长时间积压后闭环**的案例。

4. **【中危·新报告】Codex WebSocket 故障被超时机制掩盖** — [Issue #3338](https://github.com/nanocoai/nanoclaw/issues/3338)（OPEN）
   - 见"社区热点"部分。当前无直接修复 PR，需维护者评估是否将 Codex CLI 的内部重试状态透传到 NanoClaw 日志/通知。

5. **【中危·已修复】数据库异步并发竞态** — [PR #3326](https://github.com/nanocoai/nanoclaw/pull/3326)、[PR #3329](https://github.com/nanocoai/nanoclaw/pull/3329)（均已合并）
   - 修复了异步化引入的并发去重/队列丢失问题，属于重构过程中主动发现的稳定性补强。

> **稳定性信号**：大型异步化重构伴随的并发问题在合入前即被测试套件覆盖（#3326、#3329、#3330），说明 CI 质量门禁有效；但 `#3194` 这类"更新安全网缺失"问题在关闭时未指明修复 PR，建议核查回滚测试覆盖。

---

## 6. 功能请求与路线图信号

- **You.com MCP 工具集成** — [PR #3322](https://github.com/nanocoai/nanoclaw/pull/3322)（OPEN）
  - 新增 `/add-youdotcom-tool` 技能，作为 Utility skill 接入 You.com MCP 工具。纯技能无源码改动，合并成本低，预计顺利合入。
- **Dial 渠道适配器** — [PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041) 与 [PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050)（均 OPEN，已排期 ~1 个月）
  - 为 NanoClaw 增加 **SMS + AI 语音通话** 渠道（Dial），含安装向导（runChannelSkill 模型）。此前队列中有较多渠道类 Skill 排期，说明通道扩展仍是项目主要增长路径。
- **README 品牌横幅** — [PR #3328](https://github.com/nanocoai/nanoclaw/pull/3328)（OPEN）
  - 添加 "Add Agent to Slack" 启动横幅，关联 https://nanoclaw.dev/slack——属于市场/曝光层面的运营信号。
- **数据库驱动可移植性（核心团队路线图）** — 正在执行的系列 PR 为后续 **PostgreSQL/MySQL 等远程后端**铺路。这是未来版本的隐含路线图：打破 SQLite-only 约束后将大幅提升多实例部署能力。

**判断**：下个版本大概率包含 —— You.com 工具技能（低风险、高即用性）、数据库驱动重构系列（BREAKING，需要渠道适配测试）、CWE-78 安全修复（必须跟随首个补丁版本发布）。

---

## 7. 用户反馈摘要

> 注：Issue 评论摘要来自 #3338、#2868 的公开内容；PR 评论未在此次数据中聚合。

- **Codex 链路静默超时（#3338）**：用户反馈"一条简单 Telegram 请求可以静默十分钟"——在面向普通用户的 Telegram 场景中，**长时间无反馈**比直接报错更容易造成信任流失。用户期望 `codex app-server` 将重试事件暴露给 NanoClaw 上层；这本质上是**代理层与模型后端之间的可观测性断链**。
- **更新指令失效（#2868）**：用户对 `/update-skills` "静默 no-op"表达了明确不满——命令成功执行却不产生任何效果，且与官方 CHANGELOG 描述矛盾。此类"假动作"型缺陷会显著消耗用户对 CLI 工具的信任。
- **更新回滚边界（#3194）**：glifocat（连续提出 #2868/#3194）关注点在**运维安全性**——升级时能否安全回退。当前只保护 Git 而不保护数据库/配置的设计对生产实例有实操风险，特别是涉及 `codex` 或远程数据库的场景。

整体用户声音偏向**稳定性和预期一致性**，而非新功能诉求——数据层重构正在推进，用户更关心升级/更新是否安全、操作是否有反馈、底层故障是否透明。

---

## 8. 待处理积压

- **Dial 渠道功能集（PR #3041 + #3050）** — 自 07-14 提出至今 OPEN，约 5 周。功能完整（适配器 + 向导 + 演示模型），若近期无维护者/核心团队跟进，建议至少给出评审时间表或明确搁置原因。链接：[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)｜[#3050](https://github.com/nanocoai/nanoclaw/pull/3050)
- **You.com MCP 工具技能（PR #3322）** — 08-18 新建，尚未有 core-team 回应。因属于低风险技能 PR，建议尽快走完评审流程避免积压。
- **CWE-78 安全修复（PR #2538）** — 虽已合并，但从 05-18 到 08-18 的三个月等待周期值得复盘：**安全修复应走快速通道**，后续应加入 SLO 或自动提醒机制。
- **长期 OPEN 但无近期动态的 PR**：本批数据中未显示 30 天无更新的老 PR（#2538 除外），但考虑到 `QwibitAI` 组织下还有较多早期 PR（如 6 月的若干 Skill 类），建议维护者用 GitHub 的 `stale` bot 或人工 weekly triage 清理 30 天无响应的 PR，并标注"awaiting review"或"awaiting author"状态。

---

**日报小结**：今日项目核心事件是**数据库异步化重构的批量推进与安全修复合入**。重构节奏紧凑、伴随充分的测试与竞态修复，显示核心团队执行效率高；但连续多日的大幅重构需要关注：1) 外部贡献者 PR 的评审时效（#3322、#3328）；2) 已关闭 Issue 与修复 PR 的可追溯性（#3194）；3) BREAKING 变更的发布前迁移指引（#3334/#3325 最终形态）。建议下周关注 async central database 搜索系列全部合入后的集成测试状态，并准备包含 CWE-78 修复的补丁版本发布。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-19

**数据覆盖时段**：2026-08-18 ~ 2026-08-19（过去 24 小时）

---

## 1. 今日速览

IronClaw 在过去 24 小时内保持高活跃度：共产生 21 条 Issue 更新（15 条活跃/新开，6 条关闭）和 38 条 PR 更新（24 条待合并，14 条已合并/关闭），并连续发布两个 v1.3.0 候选版本。**最关键的进展是 rc.2 的发布**——修复了 rc.1 在 1.2.x 升级场景下的启动崩溃问题，结束了 24 小时内最严重的稳定性危机。与此同时，libSQL 写入通道饥饿问题已获得完整修复（PR #7717 关闭），多个 epic 级 Issue 被标记关闭。项目整体处于 v1.3.0 发布前的密集修稳阶段，同时在为 v1.4.0 的架构级改进（记忆、沙箱、设计系统）铺路。

---

## 2. 版本发布

### ironclaw-v1.3.0-rc.2 — 2026-08-18

**这是今日最重要的修复版本**，直接解决 rc.1 的启动崩溃问题。

**修复内容**：
- **升级路径修复**：从 1.2.x 升级的部署现在可以正确接受并保留扩展的 `activation_state` 字段，不再在启动时崩溃循环。
- **Reborn 运行时镜像**：正式支持可选、仅公钥的 worker SSH（端口 2222），在运行 IronCl 时可用。

**破坏性变更**：无。此版本为纯修复版本。

**迁移注意事项**：
- **强烈建议所有 rc.1 用户升级到 rc.2**。Issue [#7720](https://github.com/nearai/ironclaw/issues/7720) 确认 rc.1 在从 1.2.x 升级的部署上会进入崩溃循环，导致 worker 的 HTTP 和 SSH 端口完全不可用。
- 升级过程预计不需要额外的手动步骤，但建议在升级后验证扩展的 `activation_state` 是否被正确保留。

**相关链接**：[ironclaw-v1.3.0-rc.2 Release](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0-rc.2)、[Issue #7720](https://github.com/nearai/ironclaw/issues/7720)

### ironclaw-v1.3.0-rc.1 — 2026-08-17

Release Notes 为空。仅提供安装方式。该版本的启动崩溃问题已在 rc.2 中修复。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

**🔧 核心稳定性修复**

- **[PR #7717](https://github.com/nearai/ironclaw/pull/7717) — 修复 libSQL 写通道饥饿级联故障（已合并）**
  修复了 Issue [#7714](https://github.com/nearai/ironclaw/issues/7714)：在 PinchBench 压力测试中，libSQL 的单一共享写连接导致资源治理器的 delta journal 陷入饥饿（约 40 秒停滞），进而触发级联故障——权限失效、journal 替换、持久状态重载循环，以及永久性的预留泄漏。这是今日合入的最关键修复，直接消除了一个在高负载下会系统性击穿资源治理器的问题。

**✅ 已关闭的 Issue（经 PR 或其他方式解决）**

- **Issue [#7714](https://github.com/nearai/ironclaw/issues/7714)**（libSQL 级联故障）— 已在 PR #7717 中修复
- **Issue [#7185](https://github.com/nearai/ironclaw/issues/7185)**（跨会话记忆不可靠）— 已关闭，但关闭原因未明示
- **Issue [#7638](https://github.com/nearai/ironclaw/issues/7638)**（线程删除警告替换为全局 toast）— 已关闭，WebUI 体验一致性改进
- **Issue [#7639](https://github.com/nearai/ironclaw/issues/7639)**（引入共享 InlineNotice 组件）— 已关闭，统一 Jobs/Projects/Workspace/Extensions 的反馈横幅样式
- **Issue [#7465](https://github.com/nearai/ironclaw/issues/7465)**（Company Brain FDE epic）、**Issue [#7165](https://github.com/nearai/ironclaw/issues/7165)**（Customer Feedback Remedition epic）— 两个 epic 关闭，但详情描述为空

### 今日值得关注的待合并 PR（进展信号）

- **[PR #7735](https://github.com/nearai/ironclaw/pull/7735) — 

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-19

## 1. 今日速览

过去 24 小时内，LobsterAI 发布了 2026.8.18 版本，核心是将 DeepSeek Harness（dsh）引擎作为 opt-in 实验性功能集成（PR #2502/#2509），并同步合入 2026.8.17 release 分支的 57 个文件变更（+7,004/-39）。PR 活动显著：20 条 PR 中有 17 条被合并/关闭（含 8 条 4 月提交的积压 PR），表明维护者正在集中清理历史 PR 并整合功能。Issue 侧 9 条更新全部为 stale 状态，活跃讨论较少，但 4 月提交的 PR #1621（定时任务系统通知）在今日合入并关闭了对应 issue #1620，说明社区需求与代码贡献的闭环正在形成。整体项目活跃度中等偏上，当前处于"新功能引入 + 积压清理"并行的节奏。

## 2. 版本发布

**LobsterAI 2026.8.18**（[Release](https://github.com/netease-youdao/LobsterAI/releases)）主要包含以下变更：

- **DeepSeek Harness（dsh）引擎集成**（PR [#2502](https://github.com/netease-youdao/LobsterAI/pull/2502)、[#2509](https://github.com/netease-youdao/LobsterAI/pull/2509)，开发者：fisherdaddy）：新增 dsh engine 集成、进程启动器，并升级至 rc.7。
- **2026.8.17 release 分支合入 main**（PR [#2510](https://github.com/netease-youdao/LobsterAI/pull/2510)）：该分支比 main 领先 23 个提交，涉及 57 个文件（+7,004/-39）。根据 PR 描述，主要是引入 opt-in 实验性 DeepSeek Harness 集成，同时改进模型加载、定时任务历史记录，并修复了 session/cowork 视图的若干 UI 回归问题。

**破坏性变更与迁移注意**：PR #2510 明确标注 dsh 为 "opt-in experimental" 功能，默认不启用，不会影响现有用户的工作流。但需注意，PR #1626（今日合入的历史 PR）提到新版 OpenClaw 对未知配置字段采取严格校验，旧的 `skipMissedJobs` 字段会导致网关启动失败，该修复已入版，用户更新后应不会再遇到此问题。

## 3. 项目进展

今日合并/关闭的 17 条 PR 覆盖面广，按主题分类如下：

**核心引擎与稳定性**
- **OpenClaw 网关启动修复**（PR [#1626](https://github.com/netease-youdao/LobsterAI/pull/1626)）：移除新版 OpenClaw 已废弃的 `skipMissedJobs` 配置字段，修复网关无法启动的 P0 问题。这是一个 4 月提交的 PR，今日合入，对用户影响重大。
- **SQLite 外键约束启用**（PR [#1597](https://github.com/netease-youdao/LobsterAI/pull/1597)）：修复 `cowork_messages` 和 `user_memory_sources` 的级联删除失效问题，解决 session 删除后消息残留的数据孤儿问题。
- **模型加载失败重试机制**（PR [#2508](https://github.com/netease-youdao/LobsterAI/pull/2508)）：为服务端模型加载增加退避重试，避免启动时网络抖动导致整个会话期间模型列表为空。
- **定时任务历史分页限制**（PR [#2507](https://github.com/netease-youdao/LobsterAI/pull/2507)）：修复定时任务历史记录请求超过 OpenClaw 网关限制的问题，改为内部分页加载。

**功能增强（4 月积压 PR 集中合入）**
- **技能最近使用统计**（PR [#1583](https://github.com/netease-youdao/LobsterAI/pull/1583)）：新增「最近使用」Tab，统计技能使用频次，并修复 auto-routing 场景漏统计的 bug。
- **会话导出与复制**（PR [#1615](https://github.com/netease-youdao/LobsterAI/pull/1615)）：导出 Markdown 支持中文角色名、添加时间戳和 Agent 元信息、修复 tool_result 截断，并新增复制到剪贴板。
- **定时任务系统通知**（PR [#1621](https://github.com/netease-youdao/LobsterAI/pull/1621)）：任务完成后通过 macOS/Windows/Linux 原生通知推送，默认关闭，用户可在设置中开启。
- **用户头像设置**（PR [#1629](https://github.com/netease-youdao/LobsterAI/pull/1629)）：支持预置头像和本地图片上传。
- **MCP 快速添加模板**（PR [#1631](https://github.com/netease-youdao/LobsterAI/pull/1631)）：一键添加 File System、SQLite、Brave Search 三个常用 MCP 服务。

**UI/UX**
- 侧边栏任务搜索与多 Agent 活动过滤器（PR [#2481](https://github.com/netease-youdao/LobsterAI/pull/2481)、[#2418](https://github.com/netease-youdao/LobsterAI/pull/2418)）、Artifact 自动预览开关（PR [#2425](https://github.com/netease-youdao/LobsterAI/pull/2425)）、Sites 页面与复制反馈（PR [#2410](https://github.com/netease-youdao/LobsterAI/pull/2410)、[#2417](https://github.com/netease-youdao/LobsterAI/pull/2417)）。

**Docs**：新增 dsh 运行时配置说明（PR [#2506](https://github.com/netease-youdao/LobsterAI/pull/2506)）。

整体来看，项目今日实质上合并了一个完整 release（2026.8.17 分支→main）并发布了 2026.8.18 版本，同时消化了大量 4 月的 PR 积压，说明维护者在功能交付和代码健康度两方面都在积极推进。

## 4. 社区热点

今日 Issue 侧整体热度不高：9 条更新全部为 stale 状态（4 月创建），最多 2 条评论，无高互动讨论。相对值得关注的有：

- **[Issue #1622](https://github.com/netease-youdao/LobsterAI/issues/1622)（自定义模型添加失败）**和 **[Issue #1627](https://github.com/netease-youdao/LobsterAI/issues/1627)（复杂任务客户端崩溃）**各有 2 条评论，是 bug 类中讨论稍多的，反映了用户对模型接入和客户端稳定性的切实诉求。
- **[Issue #1614](https://github.com/netease-youdao/LobsterAI/issues/1614)**：用户提出将 hermes-agent 作为可选 AI 引擎（类似 openclaw）。结合今日 dsh 引擎集成的发布，可以看出社区对"接入多种 AI 引擎"有比较明确的兴趣，这类讨论可能在后续版本迭代中被参考。

PR 侧的活动更值得关注：3 条待合并的 PR 中有两条来自同一开发者 gongzhi-netease —— **[PR #1628](https://github.com/netease-youdao/LobsterAI/pull/1628)（模型选择器 UI 优化）**与 **[PR #1634](https://github.com/netease-youdao/LobsterAI/pull/1634)（全局搜索修复与 UX 升级）**，两者同为 4 月提交，内容完善且与用户可感知体验相关，是社区最为期待合入的工作。

## 5. Bug 与稳定性

今日报告的 9 条 Issue 均为 4 月创建，按严重程度整理如下：

| 严重程度 | Issue | 问题描述 | 是否有 fix PR |
|---------|-------|---------|--------------|
| P0（启动/核心功能） | [#1587](https://github.com/netease-youdao/LobsterAI/issues/1587) 更新最新版本首次启动崩溃 | 附带崩溃截图和完整日志 | **有**：PR #1626（OpenClaw 网关字段修复）今日合入，很可能解决此问题 |
| P0（核心功能） | [#1589](https://github.com/netease-youdao/LobsterAI/issues/1589) 会话功能与定时任务均无法正常执行 | macOS Intel，版本 2026.04.08 | **可能**：PR #1626 与 #2507 分别涉及网关配置和定时任务分页，建议维护者验证是否覆盖 |
| P1（稳定性） | [#1627](https://github.com/netease-youdao/LobsterAI/issues/1627) 复杂任务客户端崩溃 | 日志显示 WebSocket 事件流处理异常 | 暂无对应的 fix PR |
| P2（功能缺陷） | [#1622](https://github.com/netease-youdao/LobsterAI/issues/1622) 添加自定义模型后测试失败 | 附截图，具体失败原因未说明 | 无 |
| P2（功能缺陷） | [#1617](https://github.com/netease-youdao/LobsterAI/issues/1617) 技能删除后 UI 未同步刷新 | 后端已删除但前端残留，重启后仍显示 | 无 |
| P2（体验问题） | [#1586](https://github.com/netease-youdao/LobsterAI/issues/1586) 切换语言后部分内容未翻译 | 条款页和「工具风格」设置项仍为中文 | 无 |
| P3（功能缺失） | [#1632](https://github.com/netease-youdao/LobsterAI/issues/1632) 本地模型下 original skill 不可用，如何安装？ | 切换到本地模型后 skill 失效 | 无 |

值得肯定的是，P0 级的网关启动问题（PR #1626）已在今日修复并入版，显示了维护者对阻断类问题有较高的响应优先级。但 P1/P2 的多个 bug 已存在 4 个月，建议维护者尽快推进。

## 6. 功能请求与路线图信号

**可能纳入后续版本的功能请求**：

- **多种 AI 引擎接入成为趋势**：dsh（DeepSeek Harness）引擎集成是当前 release 的主要新功能（PR #2502/#2509），且明确为 opt-in experimental。Issue #1614 提出的 hermes-agent 接入请求正是同一方向的需求，说明社区对"引擎可插拔"有持续关注。
- **定时任务系统通知（Issue #1620）**已经从 issue 演变为完整实现（PR #1621）并在今日合入，体现了"社区提需求→社区贡献者开发→项目维护者合入"的良性路径，后续类似功能请求可能更容易被响应。
- **本地模型支持是用户痛点**：Issue #1622（自定义模型失败）和 #1632（本地模型下 skill 不可用）均涉及本地模型的使用体验，虽然尚无对应 PR，但这两条是与模型路线图直接相关的信号。

**今日合入的 PR 所揭示的路线图方向**：UI/UX 打磨（头像、MCP 模板、侧边栏搜索/过滤、导出质量）占据了很大比重，说明项目在功能丰富后正把重心转向易用性和视觉一致性。

## 7. 用户反馈摘要

综合 9 条 Issue 的评论与描述，真实用户反馈呈现以下特点：

- **稳定性问题是最突出的不满意点**：启动崩溃（#1587）、会话/定时任务异常（#1589）、复杂任务客户端崩溃（#1627）是用户反馈最激烈的三类问题，其中前两者可能与今日合入的 PR #1626 修复相关，需要维护者在 2026.8.18 版本中验证。
- **本地化和细节体验问题**：用户在语言切换后发现部分界面仍为中文（#1586），技能删除后 UI 不刷新（#1617），这类问题虽不阻断使用，但影响专业性感知。
- **本地模型用户群在扩大**：有用户反馈切换本地模型后原 skill 全部不可用且不知如何重新安装（#1632），也有用户反映自定义模型配置失败（#1622），说明本地模型接入是真实使用场景，但体验仍不够顺畅。
- **社区贡献者活跃**：今日合入的 PR 中有 8 条来自社区开发者（BucleLiu、kayo5994、xuzx-code、noransu、gongzhi-netease 等），且不少 PR 的描述质量很高（附有根因分析、修改说明），说明 LobsterAI 的社区参与度与协作流程整体是健康的。

## 8. 待处理积压

当前值得维护者关注的长期积压项：

**Issue（全部为 4 月创建，均已 stale）**
- P0 级 [#1587](https://github.com/netease-youdao/LobsterAI/issues/1587) 与 [#1589](https://github.com/netease-youdao/LobsterAI/issues/1589)：需验证 2026.8.18 版本是否已修复，若已修复应关闭并通知用户。
- 其余 7 条 P1-P3 级 issue 也已有 4 个月无实质进展，建议维护者逐条标注状态（计划中/已修复/暂不处理），避免社区反馈长期石沉大海。

**待合并 PR（3 条）**
- [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277)（dependabot）：electron 40 → 43 与 electron-builder 依赖更新，已停 4 个月。Electron 43 属于大版本跳升，建议在独立分支验证后再合入。
- [#1628](https://github.com/netease-youdao/LobsterAI/pull/1628)（模型选择器 UI 优化）：4 月提交，覆盖供应商图标、下拉面板裁剪修复等，内容完整，值得尽快 review。
- [#1634](https://github.com/netease-youdao/LobsterAI/pull/1634)（全局搜索修复与 UX 升级）：4 月提交，修复搜索范围受限 bug 并升级搜索面板，对多 Agent 用户的体验有直接改善，建议在下一个版本周期优先合入。

整体建议：项目当前健康度良好，release 节奏稳定，但 4 月以来的 Issue 积压和 PR 等待时间偏长。若能尽快消解这批 stale 问题，用户信任度和社区活跃度预计还会有进一步提升空间。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-19

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度处于高位：发布新版本 `20260818.06`，同时关闭 2 个 Bug 类 Issue，并合并/关闭 5 个 Pull Request，仅剩 1 个新 PR 待处理。从合并内容看，项目在 **Podman 沙箱支持、Heartbeat 配置修复、OpenAI 推理路由、内置文件库与设置浏览器的全新功能** 等多个方向都有实质推进，其中 2 个用户报告的 Bug 均已快速修复并关闭，维护响应及时。整体而言，项目处于功能迭代与稳定性修复并行的高频开发状态，社区反馈闭环良好。

## 2. 版本发布

**Release: [20260818.06](https://github.com/moltis-org/moltis/releases/tag/20260818.06)**（发布于 2026-08-18）

该版本的具体 changelog 未在数据中展开，但结合同日合并的 PR 内容，该版本很可能包含以下变更：
- 将 OpenAI 内置请求中的函数工具与 `reasoning_effort` 组合路由至 Responses API（#1198）
- 修复 `heartbeat.update` 参数被当作全量配置覆盖的问题（#1209）
- 修复 README 中 Star 历史图表无法加载的问题（#1211）
- 新增 Podman 沙箱逃生舱支持（#1106）
- 新增持久化 Files 库与 Settings 浏览器（#1206）

未发现明确的破坏性变更说明。若升级至该版本，建议注意：
- 若使用 Podman 沙箱并依赖宿主机 socket 透传，请检查最新的“逃生舱”配置项，以确保行为一致
- Heartbeat 配置更新语义变为“按字段 Patch”，此前通过 API 全量覆盖配置的脚本可能受影响（PR #1209 为修复而非主动破坏，但行为有变）

## 3. 项目进展

过去 24 小时共有 5 个 PR 合并或关闭，整体向前推进了 **3 个新功能 / 增强** 和 **2 个关键修复**：

- **[#1206 Add managed Files library and Settings browser](https://github.com/moltis-org/moltis/pull/1206)**（已合并）
  新增持久化的文件库、完整的 CRUD API，以及仿 Finder 风格的设置浏览器。同时引入 `MOLTIS_FILES_DIR` 发现机制，并为 Docker / Podman / Apple Container 提供默认只读挂载。这是一项较大的产品能力扩展，为后续文件管理、跨容器协作打下基础。

- **[#1210 Add Tesla Fleet API connector for vehicle data sync](https://github.com/moltis-org/moltis/pull/1210)**（新开，待合并）
  新增只读连接器，可同步 Tesla 车辆数据到本地快照存储，明确不发送指令、不唤醒车辆。同时定义了“数据集形状”新概念，让连接器快照具备过期清理机制。该 PR 展示了 Moltis 作为连接器生态平台的新方向。

- **[#1198 Route OpenAI reasoning tool calls through Responses](https://github.com/moltis-org/moltis/pull/1198)**（已合并）
  优化了与 OpenAI 的兼容性：将函数工具 + `reasoning_effort` 的请求自动路由到 Responses API，而在无工具或非 OpenAI 提供商时保持原有 Chat Completions 行为，代码路径统一流式与非流式，降低维护成本。

- **[#1209 fix(gateway): treat heartbeat.update params as a patch, not a whole config](https://github.com/moltis-org/moltis/pull/1209)**（已合并，Closes #1187）
  修复了 `heartbeat.update` 将缺失字段重置为默认值而非保留原值的问题，改为按“补丁”方式更新，兼顾运行时与配置文件的持久化。

- **[#1211 fix(readme): restore broken star history chart](https://github.com/moltis-org/moltis/pull/1211)**（已合并）
  将 Star 历史图表数据源切换到无需 token 的替代方案，解决因 GitHub API 限制导致的 README 图表失效问题，改善了项目对外展示形象。

> 注：**[#1106 fix(sandbox): support Podman escape hatches](https://github.com/moltis-org/moltis/pull/1106)** 也在同日关闭（合并），该 PR 从 6 月 5 日发起，经约 2.5 个月完成，属于长期打磨的成果，详见下一部分。

## 4. 社区热点

- **[Issue #1095: [Bug] Podman is not working via moltis](https://github.com/moltis-org/moltis/issues/1095)（2 条评论，已关闭）**
  这是过去 24 小时评论数最多的 Issue，虽然已关闭，但该问题自 6 月创建以来一直在社区中被关注。用户诉求集中在 **内置沙箱对 Podman 的支持不完善**，尤其在 rootless 或未进行额外配置的 Linux 主机上，Podman 沙箱难以正常启动或透传 socket。背后的核心诉求是“生产环境中的 Podman 用户希望获得与 Docker 一样的开箱即用体验”。该问题最终由 PR #1106 解决，具体方案包括互斥的“宿主机 socket 透传”与“特权嵌套 Podman”两种逃生舱模式，并在 socket 不可用时快速失败。

- **[PR #1210: Tesla Fleet API connector](https://github.com/moltis-org/moltis/pull/1210)（新开）**
  该 PR 对“连接器生态”的讨论有引燃效应。其采用**只读 + 本地快照 + 数据过期淘汰**的设计，规避了车辆控制类 API 的安全风险，体现了 Moltis 在连接器设计上对安全边界的重视，可能带动社区对其他硬件/车队连接器的贡献热情。

## 5. Bug 与稳定性

过去 24 小时关闭了 2 个 Bug（数据源中没有新开 Bug），且均已有对应修复 PR 合并，无遗留崩溃或严重回归。

| 严重程度 | Issue | 问题描述 | 修复 PR | 状态 |
|---------|-------|----------|--------|------|
| 高 | [#1095 Podman is not working](https://github.com/moltis-org/moltis/issues/1095) | 使用 Podman 作为沙箱容器时无法正常工作，影响核心功能（代码执行） | [#1106 Podman escape hatches](https://github.com/moltis-org/moltis/pull/1106) | ✅ 已合并 & 关闭 |
| 中 | [#1187 Heartbeat settings UI silently resets fields](https://github.com/moltis-org/moltis/issues/1187) | 通过设置 UI 修改 Heartbeat 时，未在表单中展示的字段被静默重置为默认值，可能导致用户配置丢失 | [#1209 Patch update](https://github.com/moltis-org/moltis/pull/1209) | ✅ 已合并 & 关闭 |

> 说明：第 3 部分中提到的 [#1211 README 图表修复](https://github.com/moltis-org/moltis/pull/1211) 属于文档基础设施修复，不涉及运行时稳定性。

## 6. 功能请求与路线图信号

从近期 PR 与 Issue 中可以观察到明确的路线图信号：

- **移动 / 车辆数据生态连接器**（由 #1210 信号）：新增 Tesla Fleet API 只读连接器，采用“本地快照 + 过期回收”模型，而非实时代理。这暗示 Moltis 有意成为**统一连接器数据中枢**，且对第三方 API 的集成采取“安全只读优先”策略。

- **系统级文件管理能力**（由 #1206 信号）：新增 Files 库、设置浏览器、目录发现机制，并支持容器挂载，这意味着 Moltis 正从“对话式 AI 助手”向“具备本地文件操作入口的 AI 工作台”演进。

- **云厂商深度兼容**（由 #1198 信号）：持续跟进 OpenAI 新 API，并优先处理“推理 + 工具调用”的组合场景，说明项目在 LLM 网关适配上的优先级是**不损失推理能力的前提下兼容工具调用**。

- **沙箱体验强化**（由 #1096/#1106 信号）：对 Podman 的支持不仅停留在“能跑”，还加入了失败关闭（fail closed）、socket 校验、诊断增强等生产级细节。

综合来看，下一版本的重点方向很可能是 **“连接器 + 文件管理 + 更细粒度的配置持久化”** 三位一体，把 Moltis 从一个聊天引擎升级为本地优先的 AI 工作平台。

## 7. 用户反馈摘要

- **Podman 用户（来自 #1095）**：用户明确需要“在使用 Moltis 的完整功能时，Podman 能够像 Docker 一样可靠工作”。原 Issue 中提到的问题包括：rootless 环境下透传宿主机 socket 失败、沙箱重建导致状态失真等。虽然关闭，但这类反馈表明 **“容器运行时兼容性”仍是非 Docker 用户的头号痛点**。修复方案是否真正满足其生产环境需求，有待后续验证。

- **Heartbeat 设置用户（来自 #1187）**：用户反映 **UI 表单与配置模型的“隐性字段”未对齐**，导致自己不认识的字段被静默重置。这是一个典型的“配置模型设计”问题，容易引发用户困惑和数据丢失。PR #1209 将更新语义改为 patch 后，可从根本避免此类问题。

- **整体反馈趋势**：过去 24 小时没有新增负面 Issue，说明近期版本稳定性接受度较高。已关闭的两个 Issue 均存在较长时间跨度（#1095 约 2.5 个月，#1187 约 9 天），但最终都得到修复，社区对维护者响应速度的信任度预计会提升。

## 8. 待处理积压

当前数据集中，最值得关注的是唯一一个 **状态仍为 OPEN 的 PR**：

- **[PR #1210: Add Tesla Fleet API connector for vehicle data sync](https://github.com/moltis-org/moltis/pull/1210)**（新开，待合并）
  该 PR 由核心维护者 penso 提交，内容完整且设计严谨，但尚未合并。建议维护团队尽快安排 review，以便确定其是否随下一个版本发布，并同步完善连接器示例文档。

此外，历史遗留中 `#1095` 用了约 2.5 个月才关闭，虽然已解决，但其长时间搁置可能反映了 **Podman 等非 Docker 沙箱后端的维护人力不足**，建议：
- 在后续 Sprint 中为 Podman 相关代码设专项 review 人力
- 为沙箱层添加更系统的集成测试矩阵（Docker + rootless Podman + socket 透传场景），避免同类问题回归

数据集中未发现更早的长期未响应 Issue 或 PR。整体积压情况良好，合并队列空置率低，项目健康度佳。

---

*本日报基于 2026-08-19 获取的 GitHub 公开数据生成，仅代表过去 24 小时的项目动态。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-08-19

> 数据来源：GitHub Issues / PR 过去 24h 更新记录

---

## 1. 今日速览

CoPaw（QwenPaw）在过去 24 小时保持高活跃度：**46 条 Issue 更新**（新开/活跃 30 条，关闭 16 条）、**50 条 PR 更新**（待合并 31 条，合并/关闭 19 条），无新版本发布。社区讨论焦点集中在 **2.1.0 的稳定性问题**（任务中断、会话冻结、飞书会话被误取消、沙盒破坏 uv 运行）以及 **MCP 连接与鉴权机制**（传输配置被硬编码、OAuth2 refresh_token 不轮换、断线不自动重连）。值得注意的是，多个 `first-time-contributor` 提交的 PR（视频工具结果传递、文件权限加固、OAuth2 修复等）进入审查或合并流程，显示外部贡献者参与度正在提升；但 Issue 侧仍有不少长期未解决的技术债（如 #6470、#5900）需要维护团队重点跟进。

---

## 3. 项目进展

今日关闭/合并的 PR 主要集中在前端控制台修复、CLI 一致性、Provider 重试策略三方面，属于「小步快跑」式迭代，未涉及架构级变更。

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#7069](https://github.com/agentscope-ai/QwenPaw/pull/7069) | fix(console): render data-URL images in historical messages on session reload | 已关闭 | 修复历史消息中 base64 图片在重新打开会话后显示为破图的问题（对应 Issue #7051），提升聊天记录回看的可用性 |
| [#7072](https://github.com/agentscope-ai/QwenPaw/pull/7072) | feat(console): add background chat task list API | 已关闭 | 为多智能体协调场景新增后台任务列表查询 API（对应 Issue #7056 的一部分），不再需要逐个轮询任务状态 |
| [#7064](https://github.com/agentscope-ai/QwenPaw/pull/7064) | fix(cli): sync top-level text on cron update --text for agent jobs | 已关闭 | 修复 `qwenpaw cron update <id> --text` 仅更新嵌套字段、顶层 text 未同步的问题（对应 Issue #7048） |
| [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) | fix(providers): honor the Retry-After cap on the streaming retry path | 已关闭 | 流式重试路径上正确执行 `Retry-After` 上限逻辑，避免无限等待或过早重试导致的限流雪崩 |

此外，**19 条 PR 在今日完成合并或关闭**。其中 #7069 与 #7072 均为首次贡献者提交，说明社区 PR 的可合并性在提高，但项目仍需关注大量停留在「待审查」状态的贡献（参见第 8 节）。

---

## 4. 社区热点

以下 Issue 在过去 24h 获得最多讨论，集中暴露了 2.1.0 在**会话生命周期管理**与**外部服务集成稳定性**上的短板。

### 4.1 [#6684 [Feature] 增加频道的重试功能](https://github.com/agentscope-ai/QwenPaw/issues/6684) — 10 条评论
- **诉求**：自建 Matrix 服务下，QwenPaw 启动速度快于 Matrix 服务，导致频道连接失败，且无健康检测与重试，每次服务器重启都需手动重存频道。
- **分析**：用户并非要求复杂能力，而是期望「连接失败自动重试 + 健康检查」这一基础可靠性保障。该问题在多个频道（Matrix、飞书等）上具有共性，建议将其抽象为通用频道连接管理层。

### 4.2 [#6921 [Bug] 多步骤任务输出规划后无提示停止](https://github.com/agentscope-ai/QwenPaw/issues/6921) — 8 条评论
- **现象**：在输出“Now 2.1, 3.1, 3.2. Let me do all three.”这类规划性文本后，任务静默停止，必须由用户回复“继续”才继续。
- **分析**：这是**多步骤 Agent 任务稳定性**的高频痛点。从评论看，用户已确认该问题出现在 2.1beta2 且可稳定复现。模型输出模式表明可能是 `_acting` 循环对生成器/协程处理有缺陷（与今日被关闭的 #7063 崩溃问题可能同源）。

### 4.3 [#7102 [Bug] Freeze more than 10 minutes long](https://github.com/agentscope-ai/QwenPaw/issues/7102) — 7 条评论
- **现象**：使用 GLM 5.3 时界面完全冻结超过 5~10 分钟，无任何 token 输出，思考过程也停止，疑似前端/流式解析死锁。
- **分析**：这是严重影响使用的稳定性问题，标记为 `need-info`，建议维护者优先补充日志采集指引。

### 4.4 [#7011 [Bug] Console stop request can cancel an active Feishu session](https://github.com/agentscope-ai/QwenPaw/issues/7011) — 7 条评论
- **现象（更新后）**：在多个 UI 会话并存时，某一 Console 会话的停止操作会错误地取消另一个正在活动的飞书会话。
- **分析**：**会话身份串扰**问题，涉及前后端状态同步，属于 2.1.0 引入的回归。评论中用户给出了事件时间线，修复难度应可控。

---

## 5. Bug 与稳定性

按严重程度排列今日活跃的 Bug 类 Issue，并标注是否有对应修复 PR：

### 严重（阻塞使用）
| Issue | 描述 | 严重度 | 修复状态 |
|---|---|---|---|
| [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) | 使用 GLM 5.3 时冻结 5~10+ 分钟无响应 | 高 | 无对应 PR，待 `need-info` 补充 |
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步任务规划后静默停止，需手动“继续” | 高 | 无对应 PR |
| [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | 前端崩溃频繁，需刷新页面才能恢复 | 高 | 无对应 PR，待客户端日志定位 |
| [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) | 会话上下文中含无法下载的图片链接时整个会话不可用 | 高 | 无 PR；建议对图片加载失败做降级而非阻塞 |

### 中等（功能受损）
| Issue | 描述 | 严重度 | 修复状态 |
|---|---|---|---|
| [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Console 停止请求误取消飞书会话（多 UI 会话串扰） | 中 | 无 PR |
| [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082) | `_StructuredOutputDynamicClass` 未完全定义，导致 agent/toolkit 初始化失败 | 中 | 无 PR；pydantic 定义顺序问题 |
| [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) | 启用沙盒后 `uv run` 无法写入 `~/.cache/uv` | 中 | **[#7116](https://github.com/agentscope-ai/QwenPaw/pull/7116) 已提交**：扩展 policy 派生挂载路径中的 `~` 和 `${...}` 展开 |
| [#7046](https://github.com/agentscope-ai/QwenPaw/issues/7046) | `execute_shell_command` 破坏 heredoc/多行命令 | 中 | 无 PR |
| [#6470](https://github.com/agentscope-ai/QwenPaw/issues/6470) | MCP 驱动硬编码 `sse_client`，忽略 `streamable_http` 配置 | 中 | 无 PR（长期未解决，见积压） |
| [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) | OAuth2 refresh_token 轮换不持久化，远程 MCP 退化为手动重新认证 | 中 | **[#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) 已提交**（审查中） |

### 低（体验/安全提示）
- [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775)：MalwareBytes 报告 Windows 桌面版含 Trojan Loader——用户已卸载，需官方尽快回应是否为误报（**社区信任风险**）。
- [#7039](https://github.com/agentscope-ai/QwenPaw/issues/7039)：2.1.0 会莫名自动新建会话 + 缺少关闭文件预览的开关（已关闭，其中自动建会话为用户困惑点）。
- [#7121](https://github.com/agentscope-ai/QwenPaw/issues/7121)：macOS runner 上 `test_sibling_sessions_run_without_serializing` 定时断言 flaky——CI 稳定性信号。

---

## 6. 功能请求与路线图信号

### 6.1 高概率进入下个版本（已有对应 PR 或明确实现路径）
| Issue | 请求 | 对应 PR/状态 |
|---|---|---|
| [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) | OAuth2 refresh_token 轮换持久化 | PR [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) 审查中 |
| [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) | 沙盒下 `~` 路径展开 | PR [#7116](https://github.com/agentscope-ai/QwenPaw/pull/7116) 已提交 |
| [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056)（背景） | 后台聊天任务列表 | PR [#7072](https://github.com/agentscope-ai/QwenPaw/pull/7072) 已合并 |
| [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060)（背景） | `view_video` 内联上限可配置 | PR [#7071](https://github.com/agentscope-ai/QwenPaw/pull/7071) 审查中 |

### 6.2 讨论度高但暂无 PR 的功能诉求（路线图信号）
| Issue | 需求 | 社区热度 | 分析 |
|---|---|---|---|
| [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684) | 频道连接重试与健康检测 | 10 评论 | 属于基础可用性；可能并入 Channel 层统一重构 |
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) | 多智能体协作在单一会话窗口中展示 | 3 评论 | 与当前“每协作新建会话 + 手动切换智能体”形成 UX 对比 |
| [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 插件 API 增加 `system_prompt` 权限控制 | 4 评论 | 企业用户 B 端诉求：运行时注入公司 Prompt，避免用户在会话界面看到 |
| [#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062) | `reasoning_effort` 支持按 agent/会话级覆盖 | 2 评论 | 与多角色 agent 场景强相关；若模型级配置维持现状，需建多条模型条目，灵活性差 |
| [#7090](https://github.com/agentscope-ai/QwenPaw/issues/7090) | 技能池导入页增加搜索/过滤 | 2 评论 | 技能数量多时的可用性优化，实现门槛低 |
| [#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260) | 结果呈现优化：折叠工具调用过程 | 已关闭（3 评论） | 用户希望结果优先于过程展示，建议前端迭代时纳入设计 |

---

## 7. 用户反馈摘要

- **「任务中断」是 2.1.0 最大的信任杀手**：多条 Issue（#6921、#7102、#7074）指向同一现象——Agent 在输出规划性文本后静默停止，或界面长时间无响应。用户原话：“需要我说‘继续’才会继续任务”，反映出对 Agent 自主性的期望未被满足。
- **对 MCP 生态的期望很高，但体验被连接层拖累**：`streamable_http` 被硬编码忽略（#6470）、断线无自动重连（#5900）、OAuth2 轮换失败（#7053），这些是外部集成开发者直接面对的问题，尤其影响企业级用户。
- **沙盒功能存在「开箱即损」的配置冲突**：启用沙盒后导致 `uv run` 失败（#7005），用户不得不手写 policy 规则；说明沙盒的默认策略需要更全面地覆盖主流包管理器的缓存路径。
- **安全类误报损害信任**：#6775 中英文用户因 MalwareBytes 报告 Trojan Loader 而卸载软件，官方至今未明确回应，是社区信任层面的隐患。
- **正向反馈也存在**：#7039 用户认可“2.1.0 公式显示正常了”，说明渲染类修复被感知；#6794 与 #7065 的 405/历史记录问题已闭环，用户对「报告-修复」的响应速度有一定认可。

---

## 8. 待处理积压

以下问题长期未得到有效推进，建议维护团队优先排期，避免形成技术债黑洞：

| 编号 | 标题 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#6470](https://github.com/agentscope-ai/QwenPaw/issues/6470) | MCP driver 硬编码 `sse_client`，streamable_http 服务器无法连接 | 2026-07-26 | OPEN（5 评论） | 根因已定位到 `mcp_stateful_client.py`；无 PR，且与 #5900 高度关联 |
| [#5900](https://github.com/agentscope-ai/QwenPaw/issues/5900) | streamable_http 会话终止后无自动重连，客户端被永久跳过 | 2026-07-09 | OPEN（2 评论） | 相同链路问题，建议与 #6470 合并处理 |
| [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | MalwareBytes 报告 Trojan Loader | 2026-08-07 | OPEN | **信任危机**：等待官方安全团队正式回应 |
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | 新增火山引擎 Agent Plan 与 MiMo V2.5 Provider，刷新模型目录 | 2026-07-28 | OPEN / Under Review | 大功能级 PR，搁置近 3 周，涉及新 provider 架构 |
| [#6764](https://github.com/agentscope-ai/QwenPaw/pull/6764) | CI 门禁：将测试设为 main 分支合并必需检查 | 2026-08-06 | OPEN | 防止「红测试合并」再次发生（#6418 前科），应尽快推进 |
| [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) | 智能邮件管理助手（Mailbox Assistant） | 2026-08-07 | OPEN / first-time-contributor | 功能型大 PR，需维护者评估并分配 reviewer |

---

**总体评估**：CoPaw 目前处于 2.1.0 发布后的「稳定期承压」阶段——功能开发速度尚可，但 **稳定性缺陷（任务中断、会话串扰、沙盒冲突）正在消耗用户信任**。建议下一个 patch 版本优先收口 #6921、#7102、#7011 三类问题，并官方回应 #6775 安全误报；MCP 连接层（#6470/#5900）建议作为 2.2 的专项攻坚目标。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-08-19）

## 1. 今日速览

过去 24 小时 ZeroClaw 保持高活跃度：共 50 条 Issue 更新（新开/活跃 32 条，关闭 18 条）与 50 条 PR 更新（11 条待合并，39 条合并/关闭），代码合并与社区讨论双线并进。无新版本发布，项目当前处于密集的功能落地与架构收敛期。多个长期 RFC（Goal mode v1、shell 命令确认策略）持续获得深度讨论，核心设计尚未冻结；与此同时，web/gateway/providers/skills 等模块均有 PR 合入，项目在横向功能扩展与纵向稳定性加固上同步推进。安全类议题（SSRF、wasmtime CVE、缓存权限）与 Windows 平台兼容性问题，是本日最受关注的项目健康度风险点。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时共有 39 个 PR 合并/关闭、18 个 Issue 关闭，涉及功能增强、缺陷修复与工程治理，项目整体向前推进明显。

**新能力落地：**
- [PR #6842](https://github.com/zeroclaw-labs/zeroclaw/pull/6842) 新增 NEAR AI Cloud 作为 OpenAI 兼容 provider，接入 TEE 背书的云推理服务，打通配置、构造、列表与属性上报全链路。
- [PR #7041](https://github.com/zeroclaw-labs/zeroclaw/pull/7041) Linq 通道从单租户改造为多租户（`HashMap<String, Arc<LinqChannel>>`），支持按 alias 路由到不同 Linq 实例，webhook 路由同步调整为 `/linq/{alias}`。
- [PR #6700](https://github.com/zeroclaw-labs/zeroclaw/pull/6700) Web 仪表盘新增只读技能浏览器，运维者可通过侧边栏 `/skills` 页面浏览已安装技能包。
- [PR #5998](https://github.com/zeroclaw-labs/zeroclaw/pull/5998) IRC 通道新增 `mention_only` 配置项，与 Telegram/Discord/Slack 等通道的语义对齐。
- [PR #5168](https://github.com/zeroclaw-labs/zeroclaw/pull/5168) 实现 HMAC 工具执行收据，为判断 LLM 声称的工具调用是否真实执行提供了加密验证机制，直击幻觉检测痛点。

**关键修复合入：**
- [PR #5793](https://github.com/zeroclaw-labs/zeroclaw/pull/5793) 修复 webhook handler 未上报 token 用量的问题，`POST /webhook` 的 `tokens_used`/`input_tokens`/`output_tokens` 此前在事件历史和 SSE `agent_end` 中始终为 `null`。
- [PR #5853](https://github.com/zeroclaw-labs/zeroclaw/pull/5853) 运行时自愈孤儿 `tool_result` 块——因压缩或崩溃导致配对 `tool_use` 丢失时，信号通道会话会出现重复的 Anthropic 400 错误，该 PR 在加载与压缩时自动修复。
- [PR #5207](https://github.com/zeroclaw-labs/zeroclaw/pull/5207) 修复 web 主题切换不生效、会话页因缺失 `id` 崩溃、CSS token 硬编码绕过主题、CJK 输入法回车误提交等问题。
- [PR #6684](https://github.com/zeroclaw-labs/zeroclaw/pull/6684) 区分 `skill_manage` patch 被禁用与冷却中两种错误信息，避免误导。

**工程与治理：**
- [PR #5648](https://github.com/zeroclaw-labs/zeroclaw/pull/5648) PR 模板从 15 节精简至 7 节，降低贡献者负担。
- [PR #5684](https://github.com/zeroclaw-labs/zeroclaw/pull/5684) 在贡献文档中新增 agent-ready 的 PR 审查 prompt，为 AI 审查者提供结构化流程。
- [PR #5780](https://github.com/zeroclaw-labs/zeroclaw/pull/5780) 新增 GitHub Issue 分诊 Claude Code skill。

**对应关闭的 Issue：**
- [Issue #7415](https://github.com/zeroclaw-labs/zeroclaw/issues/7415) 统一三个 agent turn 引擎的 RFC 已通过单次整合 PR（#7540）落地，而非分阶段迁移。
- [Issue #8563](https://github.com/zeroclaw-labs/zeroclaw/issues/8563) 共享 SOP 在 web 仪表盘会话中不可用的问题已修复。
- [Issue #6679](https://github.com/zeroclaw-labs/zeroclaw/issues/6679) CI 现在要求合并前重新运行质量门禁，防止陈旧绿色检查通过。
- [Issue #8059](https://github.com/zeroclaw-labs/zeroclaw/issues/8059) deny.toml/audit.toml 策略清理完成，wasmtime advisory 忽略项已建立追踪引用。

## 4. 社区热点

- [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — RFC: Goal mode v1（22 条评论，👍 1）。讨论已持续近两个月，核心诉求是让 ZeroClaw 具备跨多轮 agent turn 持久追求有界用户目标的能力。争论焦点在于首版交付范围：是否应耦合重启交接、通道准入、Web 与异步子任务。作者主张缩小首版边界，社区整体向“先做有界的前台 Matrix 工作”收敛。

- [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — 高风险 shell 命令逐次确认层（22 条评论）。社区希望引入 Claude Code 风格的 allow/ask/deny 命令策略，为高风险 shell 操作提供精细管控。该 RFC 已修订至第 3 版，规范范围收窄至 shell 策略契约本身，维护者已确认范围，处于实施前夜。

- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — Windows 上 74 个测试失败（17 条评论）。问题根源是 CI 仅运行 Linux，测试套件包含 Unix-only 命令、路径语义与控制台编码差异。简体中文 + 代码页 936 环境下问题尤为突出，社区对平台覆盖缺口表达了强烈不满。

- [Issue #7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929) — 统一 slash-command 注册表（8 条评论）。web UI、ZeroCode TUI、channel runtime 三端分别维护命令列表，导致命令名、别名、描述、可用性漂移。用户希望一份注册表驱动所有端。

- [Issue #8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — 协调 cargo-audit 忽略项并修复 wasmtime-wasi CVE（6 条评论）。`cargo audit` 与 `cargo deny` 的忽略列表范围不同，造成安全策略表面不一致，属于依赖安全治理的清理工作。

## 5. Bug 与稳定性

按严重程度排列如下：

**S1 — 工作流阻断：**
- [Issue #8563](https://github.com/zeroclaw-labs/zeroclaw/issues/8563)（已关闭）— web dashboard 会话中 agent 无法读取共享 SOP，导致依赖 SOP 的工作流完全受阻。该问题已在今日关闭，修复已合入。

**S2 — 降级行为：**
- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)（开放，p1）— Windows 11 上 74 个测试失败，覆盖 Unix-only 命令、路径语义、控制台编码等。尚无直接修复 PR，关联跟踪 issue [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) 计划增加 Windows 运行时测试覆盖（自更新 swap/rollback/sidecar 路径）。
- [Issue #10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067)（开放，p1，8 月 17 日新开）— 单个超大工具结果导致整个 turn 失败，不可降级。shell 输出上限实际是 1MB 内存界而非上下文界，一旦超过模型剩余上下文，请求直接报 `Request exceeds model context window`。尚无 fix PR，需要运行时层面的降级策略。
- [Issue #8410](https://github.com/zeroclaw-labs/zeroclaw/issues/8410)（开放，p2）— 频道任务缺少一等公民的“有意不回复”结果，导致“有新邮件才通知，否则保持沉默”这类条件任务仍会发送可见回复。
- [Issue #6679](https://github.com/zeroclaw-labs/zeroclaw/issues/6679)（已关闭）— 旧 PR 可在 master 前进后保留陈旧绿色 Quality Gate 结果并合入，现已要求合并前重新运行检查。

**S3 — 功能缺失：**
- [Issue #7069](https://github.com/zeroclaw-labs/zeroclaw/issues/7069)（已关闭）— Twitter/X 通道代码与文档存在，但预构建二进制未启用 `channel-twitter` feature，现已关闭处理。

**安全加固类 PR：**
- [PR #10091](https://github.com/zeroclaw-labs/zeroclaw/pull/10091) 响应缓存存储权限收紧为仅所有者可读写，与审计数据库对齐。
- [PR #10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070) 为 `file_download` 增加 SSRF 防护与私有主机 opt-in，当前标记 `do-not-merge`，等待维护者审查。
- [PR #9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) 配置写入失败时回滚自动创建的 map alias，防止半更新状态残留。

## 6. 功能请求与路线图信号

**新提交的功能请求/RFC：**
- [Issue #9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) — RFC: 会话级持久化 prompt 附件。目标是在历史裁剪、守护进程重启后保留对话早期建立的目标与约束，并行会话场景下收益明显。属早期设计阶段，等待维护者评审。
- [PR #10096](https://github.com/zeroclaw-labs/zeroclaw/pull/10096) — ZeroCode 日志列表与详情文本支持字符选择与复制，并增加右键/Control-click 拷贝。
- [PR #10099](https://github.com/zeroclaw-labs/zeroclaw/pull/10099) — CI 修复：fork 仓库的每日 advisory issue 不再 @ 上游维护者。
- [PR #10102](https://github.com/zeroclaw-labs/zeroclaw/pull/10102) — 文档：定义 `do-not-merge` 标签作为维护者/治理性持有标记，与 `status:blocked` 配对使用。

**可能进入下一版本的方向：**
- **Goal mode v1（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）**：讨论已收敛，首版将限定为有界前台 Matrix 工作，等待正式实施。
- **Shell 命令策略 allow/ask/deny（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)）**：第 3 版规范范围已获维护者确认，是近期最接近落地的安全功能。
- **统一 slash-command 注册表（[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)）**：反映架构一致性诉求，需跨 web/ZeroCode/runtime 三端协调。
- **Hailo-Ollama 原生支持（[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)）**：本日有更新的 XL PR，等待作者响应 maintainer 反馈，若合入将覆盖边缘硬件推理场景。
- **DingTalk 流式消息（[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)）**：用户明确要求长任务流式输出，降低等待感知。

## 7. 用户反馈摘要

- **Windows + 中文用户（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）**：在简体中文 Windows 11 下运行测试套件遭遇 74 个失败，CI 不覆盖 Windows 是根因。用户期望跨平台质量保障与中文控制台编码适配。
- **Webhook 调用方（[#3542](https://github.com/zeroclaw-labs/zeroclaw/issues/3542)）**：此前发送 `"mode": "agent"` 无效，webhook 仍按 chat 模式处理，无法触发完整 agent 工作流与工具执行。该问题已关闭，应已在当前版本解决。
- **Twitter/X 用户（[#7069](https://github.com/zeroclaw-labs/zeroclaw/issues/7069)）**：文档宣传 Twitter/X 为受支持通道，但预构建二进制中无法使用，文档与交付物不一致。已关闭处理。
- **DingTalk 用户（[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)）**：长响应只能等全部生成后才收到消息，交互延迟明显，希望获得流式消息支持。
- **Cron 任务用户（[#8409](https://github.com/zeroclaw-labs/zeroclaw/issues/8409)）**：shell 类型 cron 任务的输出总被 `status=... / stdout: / stderr:` 包装，脚本消费不便，期望 opt-in 的 raw stdout 输出。
- **团队运营者（[#8134](https://github.com/zeroclaw-labs/zeroclaw/issues/8134)）**：Slack/Telegram 等通道会话历史无限膨胀，token 消耗与响应延迟随会话年龄增长，期望 `session_ttl_hours` 配置真正生效，自动截断陈旧历史。
- **社区开发者（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)、[#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)）**：对安全策略与依赖治理提出了多轮具体修订意见，参与度高，反映出项目周边已形成稳定的专业贡献者群体。

## 8. 待处理积压

以下问题长期未决或等待维护者介入，建议优先关注：

- [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（p1，6 月 3 日创建，22 条评论）— 高风险 shell 命令确认策略 RFC。规范范围已确认，等待最终实施决策。
- [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)（p1，6 月 10 日创建，17 条评论）— Windows 74 个测试失败。开放超两个月，CI 矩阵扩展是刚需，关联跟踪见 [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910)。
- [Issue #8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)（p1，6 月 30 日创建）— wasmtime-wasi CVE 治理与 `cargo audit`/`cargo deny` 策略协调。安全债持续累积，建议尽快排期。
- [Issue #10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067)（p1，8 月 17 日创建）— 超大工具结果不可恢复。新报告但影响严重，需要运行时降级/截断策略的设计回应。
- [PR #9935](https://github.com/zeroclaw-labs/zeroclaw/pull/9935)（do-not-merge，需要维护者审查）— 保留未知约束类型并读取严格模式。XL 尺寸变更，等待架构审阅。
- [PR #10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070)（do-not-merge，需要维护者审查）— `file_download` SSRF 加固。安全关键改动，建议优先评审。
- [PR #9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281)（needs-author-action）— config set 失败时回滚自动创建的 map alias，等待作者响应评审意见。
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（needs-author-action，XL）— Hailo-Ollama 原生支持，等待作者按维护者反馈更新。
- [Issue #8309](https://github.com/zeroclaw-labs/zeroclaw/issues/8309)（p2，6 月 25 日创建）— SkillForge 引擎已无运行时接线，需决定“安全默认接线”或“移除并保留 manifest 兼容”，悬而未决。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*