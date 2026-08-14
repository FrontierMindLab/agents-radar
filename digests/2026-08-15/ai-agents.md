# OpenClaw 生态日报 2026-08-15

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-14 23:00 UTC

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

# OpenClaw 项目动态日报 — 2026-08-15

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高活跃度：共 500 条 Issue 更新（489 条新开/活跃、11 条关闭）与 500 条 PR 更新（400 条待合并、100 条已合并/关闭），无新版本发布。社区讨论高度集中在 **#121058「静默回复失败复发」**（累计 94 条评论，全库最高），表明回复可靠性问题仍是用户核心痛点。另一方面，**3 个 P0 级缺陷**（#91588 网关内存泄漏、#108435 升级后网关无法启动、#119270 文件工具路径解析错误）仍处于无修复 PR 的悬置状态，值得维护团队优先关注。功能侧，Web UI 侧边栏统一重构系列 PR 集中涌入（6 个），多 agent 舰队治理与渠道扩展（MS Teams、Matrix）也在稳步推进。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共 100 条 PR 合并/关闭，以下为重要合入：

- **安全边界加固：安装策略警告确认机制** — PR #116489（已关闭）外部 `security.installPolicy` 命令现可返回 `warn`，授权操作者可在安装可疑插件/技能前审阅原因并输入确认；合并风险标注为 `compatibility` + `security-boundary`。
  https://github.com/openclaw/openclaw/pull/116489
- **网关稳定性：节点 worker 结果一致性修复** — PR #123869（已关闭）修复并发 turn 在节点 worker 暂时达到启动容量时，已完成执行的助手结果被误判为工作区协调失败的问题，同时避免排队中的聊天 turn 报告错误终止状态（`session-state` + `availability` 风险面）。
  https://github.com/openclaw/openclaw/pull/123869
- **UI：聊天侧栏统一为标签面板** — PR #123874（已关闭，Closes #123286）解决多侧栏同时开启时占用对话宽度、小屏导航困难的问题，是本次 UI 重构系列中规模最大的合入（XL）。
  https://github.com/openclaw/openclaw/pull/123874
- **Slack：presence 事件携带离开时长** — PR #123805（已关闭）为 `away → active` 事件新增 `observed_away_at_ms` / `observed_active_at_ms` / `observed_away_duration_ms` 时间元数据；PR #123876 为同功能 backport 至发布分支。
  https://github.com/openclaw/openclaw/pull/123805
- **UI 一致性修复** — PR #123813（已关闭）页面活动指示器与会话行样式对齐。
  https://github.com/openclaw/openclaw/pull/123813

**待合并队列中的重要修复**（均已提交、等待合入）：

- PR #123495 fix(sessions): 阻止 `sessions cleanup --fix-missing` 在单条转录损坏时删除可读的 SQLite 转录内容（Closes #119085）
  https://github.com/openclaw/openclaw/pull/123495
- PR #123866 fix(skills): 修复 Skill Workshop 中超过 20,000 字符的技能仅能读取截断前缀的问题（Closes #123833）
  https://github.com/openclaw/openclaw/pull/123866
- PR #123877 fix: 卡死会话恢复时尊重 provider 超时配置（Closes #121018）
  https://github.com/openclaw/openclaw/pull/123877
- PR #123864 feat: 拒绝过期的 guarded session reset 请求（Closes #123862）
  https://github.com/openclaw/openclaw/pull/123864

**整体判断**：项目在安全（安装策略确认）、UI 视觉规范、多 agent 舰队治理三个方向上有明确的迭代主线，但修复吞吐（daily merged ~100）相对 400 条待合并 PR 与大量悬置 P0/P1 而言仍显紧张。

## 4. 社区热点

- **#121058 静默回复失败复发（94 评论，全库最高）** — 用户 `sloptop-the-terrible` 指出 #116277 关闭后该失败模式仍在发生，监控 cron 持续记录新案例（含当日一例）。高评论量反映影响面广，且用户对「issue 关闭但问题未真正修复」的处理方式表达明显不满。
  https://github.com/openclaw/openclaw/issues/121058
- **#91588 网关内存泄漏 P0（24 评论，1 👍）** — RSS 从 350MB 增长至 15.5GB 触发 OOM 与 launchd-handoff 重启循环，标注 `platinum hermit` 评级与 `impact:crash-loop` / `impact:message-loss`，是当前最严重的基础设施类缺陷。
  https://github.com/openclaw/openclaw/issues/91588
- **#121953 DeepSeek 上 cron agent 停滞（20 评论）** — `[cron:<jobId> <name>]` 前缀导致 DeepSeek API edge 将请求路由至低优先级队列，turn 停滞数十秒至数分钟；已存在 linked PR，说明定位接近收敛。
  https://github.com/openclaw/openclaw/issues/121953
- **#80319 QA 工具默认值套件争议（18 评论，1 👍）** — 核心争论为 Codex 原生工具与 OpenClaw 动态工具对等的测试架构问题，原报告「Codex 丢弃工具调用」被澄清为 QA harness/mock-provider 问题而非运行时缺陷。
  https://github.com/openclaw/openclaw/issues/80319

**热点诉求归纳**：热度最高的两类主题为「回复可靠性」（#121058、#96834、#92186）与「内存/资源稳定性」（#91588、#87109、#99910），且二者常叠加出现（内存压力导致消息静默丢失）。

## 5. Bug 与稳定性

按严重程度排列（含修复状态标注）：

**P0（严重）**

- **#91588 网关内存泄漏** — RSS 3 天增长至 15.5GB，OOM 被杀后进入 `launchd-handoff` 重启循环。2026-06-09 创建，已悬挂 67 天，**无 fix PR**。
  https://github.com/openclaw/openclaw/issues/91588
- **#108435 升级 2026.7.1 后网关无法启动** — systemd / ollama / 手动启动均报 `gateway did not start on 127.0...`，3 👍，`ux-release-blocker` 标签。2026-07-15 创建，**无 fix PR**。
  https://github.com/openclaw/openclaw/issues/108435
- **#119270 文件工具剥离目的地路径前导 @** — `write`/`edit`/`apply_patch` 静默操作错误文件，存在**覆盖/删除错误文件的数据破坏风险**，8 月 4 日创建，**无 fix PR**。
  https://github.com/openclaw/openclaw/issues/119270

**P1（高）**

- **#121058 静默回复失败复发**（94 评论）— 声称 #116277 关闭后未真正修复，`message-loss`。无新 fix PR。
  https://github.com/openclaw/openclaw/issues/121058
- **#62505 Coding Agent 完全不完成任务** — 4 月 7 日创建的回归问题，已悬挂 **130 天**，用户称「worked in 2026.4.2 and earlier」，**无 fix PR**，社区信任度受损。
  https://github.com/openclaw/openclaw/issues/62505
- **#96834 WhatsApp 图片卡住主通道约 3 分钟** — 原生多模态图片注入导致 `active_reply_work`/`queued_work_without_active_run` 卡死，post-#95039 复现，`recovery-stuck`。
  https://github.com/openclaw/openclaw/issues/96834
- **#38327 Gemini 3.1 "Cannot convert undefined or null to object"** — 2026.3.2 升级回归，3 👍，影响 google-vertex provider 用户。
  https://github.com/openclaw/openclaw/issues/38327
- **#86215 Codex OAuth 刷新失败可卡住 agent 数小时** — 无告警、无 profile 轮换，401 后持续在失败 lane 重试。
  https://github.com/openclaw/openclaw/issues/86215
- **#87109 网关空闲堆内存增长至 1073MB+** — 与 #91588 疑似同源；cron 任务在内存压力下**静默失败**（无输出、无推送、无错误上报）。
  https://github.com/openclaw/openclaw/issues/87109
- **#98435 MCP loopback 网关重启后不自动重连** — `recovered=1` 具有误导性，会话内容虽恢复但 CLI 与网关间传输未重新握手。
  https://github.com/openclaw/openclaw/issues/98435
- **#94939 6.x 状态迁移致会话存储 SQLite 为空（0 字节）** — 破坏 MS Teams 主动发送（Bot Framework），已存在 linked PR。
  https://github.com/openclaw/openclaw/issues/94939
- **#91144 Windows 计划任务下网关不驻留** — 前台窗口正常但 Scheduled Task 无法保持运行，已存在 linked PR。
  https://github.com/openclaw/openclaw/issues/91144

**今日修复进展**：`clawsweeper` 标注显示仅少数 P1 有 linked PR（#121953、#83959、#94939、#91144、#115001、#120735、#93917、#121046）；多数 P0/P1 仍处于 `no-new-fix-pr` 或 `needs-maintainer-review` 状态。整体修复节奏落后于问题发现速度。

## 6. 功能请求与路线图信号

**社区高票功能需求**

- **#10687 全动态模型发现（OpenRouter 及更多）** — 3 👍，最高票。当前模型选择依赖静态生成目录，无法跟上快速变化的模型目录。
  https://github.com/openclaw/openclaw/issues/10687
- **#81061 before_route_inbound_message 预路由钩子** — 3 👍，为通道桥接/代理所需，现有钩子均在路由决策之后触发。
  https://github.com/openclaw/openclaw/issues/81061
- **#44395 标题感知分块 + 实体抽取的内存搜索** — 2 👍，解决固定字符数分块割裂语义单元的问题。
  https://github.com/openclaw/openclaw/issues/44395
- **#75947 UI 质量重设计** — 2 👍，基于可访问性与人因工程标准。
  https://github.com/openclaw/openclaw/issues/75947
- **#13219 按模型用量日志（成本追踪）** — 1 👍，用户需自行解析 session JSONL 才能统计成本。
  https://github.com/openclaw/openclaw/issues/13219
- **#71142 Control UI 可配置上传大小上限** — 当前 5MB 硬编码限制阻碍大图上传。
  https://github.com/openclaw/openclaw/issues/71142
- **#88154 Slack Modal 原生交互支持** — 结构化输入替代重复消息提示。
  https://github.com/openclaw/openclaw/issues/88154

**路线图信号（PR 侧）**

- **Web UI 视觉规范系统化收口** — 贡献者 `vyctorbrzezowski` 一次提交 6 个关联 PR（#123626 字体、#123613 图标、#123681 网格、#123655 浮层、#123874 标签面板、#123879 标题中性色），表明 Control UI 正在建立统一的 16px/1.5px stroke 设计契约。
- **多 agent 舰队治理成为迭代重点** — #123865（cron 归属解析）、#123871（status 容错）、#123878（安全审计跳过未使用默认工作区）、#123880（policy 支持 `--agent`）、#123495（会话清理保护），显式多 agent 配置路径正在补齐。
- **企业 IM 渠道加宽** — #112811 MS Teams 多机器人账号（标注 `feature: ✨ showcase`）、#122862 Matrix 精确房间会话路由、#123805/#123876 Slack presence 增强。
- **安装策略审阅 UI 化** — PR #120900（审核安装策略警告）与今日合入的 #116489 配套，将 CLI 安全确认能力延伸到 Control UI。
  https://github.com/openclaw/openclaw/pull/120900

## 7. 用户反馈摘要

- **生产级肯定**：#73537 用户自述将 OpenClaw 作为「家庭与商业助手」运行（Telegram 集成、自动化、cron、Home Assistant 控制），明确感谢团队，并呼吁增加 release 生产就绪稳定性标签——印证该项目的真实 7×24 生产使用场景。
  https://github.com/openclaw/openclaw/issues/73537
- **最大不满——「关闭未修复」**：#121058 的 94 条评论核心情绪是「issue 被关闭但监控 cron 仍在持续记录失败」，用户对问题闭环流程失去信心。
  https://github.com/openclaw/openclaw/issues/121058
- **无人值守任务的不安全感**：#87109 中「cron 静默失败——无输出、无推送、无错误上报」与 #121058 的静默回复失败叠加，令用户对自动化任务的可观测性产生明显焦虑。
  https://github.com/openclaw/openclaw/issues/87109
- **回归挫败感密集**：多条长期悬挂的回归 issue（#62505「worked in 2026.4.2」、#38327「after updating to 2026.3.2」、#108435「upgrade to 2026.7.1 fails」）反映用户对版本质量曲线不稳的担忧，且修复等待时间普遍超过一个月。
- **文档与实现不一致**：#121083 指出 SecretRef 中 `provider: "default"` 是内置隐式别名但文档未说明，照抄其他 provider id 的用户直接触发 `SecretProviderResolution` 错误——低成本的文档修复可消除实际上手障碍。
  https://github.com/openclaw/openclaw/issues/121083

## 8. 待处理积压

**P0/P1 且无修复 PR（建议优先）**

- #91588 P0 网关内存泄漏（2026-06-09，67 天）— 建议与 #87109 堆增长合并排查。
  https://github.com/openclaw/openclaw/issues/91588
- #108435 P0 2026.7.1 升级后网关无法启动（2026-07-15，31 天）— 升级阻断，标注 `ux-release-blocker`。
  https://github.com/openclaw/openclaw/issues/108435
- #119270 P0 文件工具 @ 前缀误删路径（2026-08-04，11 天）— 数据破坏风险，建议紧急定位。
  https://github.com/openclaw/openclaw/issues/119270
- #62505 P1 Coding Agent 完全失效（2026-04-07，130 天）— 长期高热度回归，已影响社区信任。
  https://github.com/openclaw/openclaw/issues/62505
- #121058 P1 静默回复失败复发（94 评论）— 需给出明确的根因结论而非再次关闭。
  https://github.com/openclaw/openclaw/issues/121058

**长期未响应的功能请求**

- #10687 动态模型发现（2026-02-06，190 天）— 3 👍 最高票功能。
  https://github.com/openclaw/openclaw/issues/10687
- #13219 按模型用量日志（2026-02-10，186 天）。
  https://github.com/openclaw/openclaw/issues/13219
- #17840 反应触发 agent turn（2026-02-16，180 天）。
  https://github.com/openclaw/openclaw/issues/17840

**等待维护者审视的 PR（`ready for maintainer look`）**

- #117712 dependabot actions 批量更新（10 项，2026-08-02，13 天）— 安全依赖，建议优先处理。
  https://github.com/openclaw/openclaw/pull/117712
- #123254 fix(claws): 安全恢复生命周期状态（XL，`security-boundary` 风险标注）。
  https://github.com/openclaw/openclaw/pull/123254
- #123709 feat(audit): 解释外发消息投递（XL）。
  https://github.com/openclaw/openclaw/pull/123709
- #112811 MS Teams 多机器人账号支持（XL，`feature: showcase`）。
  https://github.com/openclaw/openclaw/pull/112811
- #116489 配套的 UI 侧 #120900 亦处于 `ready for maintainer look`，建议与已合入的 CLI 端一并推进。
  https://github.com/openclaw/openclaw/pull/120900

---

*数据说明：以上基于 2026-08-14 至 2026-08-15 GitHub 公开数据（Issues/PRs 更新各 500 条，按评论数取 Top 展示）。部分 PR 评论数未公开标注，进展部分按标签状态（CLOSED / waiting on author / ready for maintainer look）推断。*

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告（2026-08-15）

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速扩张与质量博弈并存的阶段**：核心项目单日 Issue/PR 更新量可达 500 条量级（OpenClaw），第二梯队维持在 24-50 条区间，整体社区参与度极高。生态重心正从"功能堆叠"转向"可靠性攻坚"——多项目最热议题均为回复静默失败、内存泄漏、会话数据一致性等生产环境核心痛点。Web UI 体验打磨、多 agent 治理、安全策略加固、MCP/渠道扩展成为跨项目共同投入方向。版本发布节奏分化明显：IronClaw 当日发布 v1.2.0 稳定版，而多数项目处于功能累积与质量收敛的交替期。整体判断：生态正处于**从可用走向可信、从单点走向体系**的关键转折。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PRs 更新 | Release | 健康度评估 |
|------|------------|----------|---------|-----------|
| **OpenClaw** | 500 条（489 新开/活跃，11 关闭） | 500 条（400 待合并，100 合并/关闭） | 无 | ⚠️ 极高活跃但积压严重，3 个 P0 无修复 PR，修复吞吐（~100/日）落后于发现速度 |
| **IronClaw** | 24 条（15 新开/活跃，9 关闭） | 47 条（25 待合并，22 合并/关闭） | ✅ **v1.2.0 稳定版** | ✅ 发布线干净合回，QA 机制有效，P2 bug 当天即有修复 PR，处于发版后收敛 + v1.3.0 预热节奏 |
| **CoPaw** | 50 条（12 新开/活跃，38 关闭，关闭率 76%） | 41 条（26 待合并，15 合并/关闭） | 无 | ✅ 维护者响应及时，历史积压批量清理中；但 2 个 2.1.0 新高危 Bug 尚无修复 PR |
| **ZeroClaw** | 33 条（30 新开/活跃，3 关闭） | 50 条（47 待合并，3 合并/关闭） | 无 | ⚠️ 高活跃但 PR 合并率低（6%），9 项 high-risk RFC 并行推进，决策队列成为瓶颈 |
| **Hermes Agent** | 50 条（39 活跃/新开，11 关闭） | 50 条（45 待合并，5 合并/关闭） | 无 | ⚠️ 中等偏上活跃，合并速度（5 条）远落后于提交速度（45 条），但 UI 问题簇集中关闭显示修复有实质进展 |
| **NanoBot** | 3 条（1 新开，2 关闭） | 22 条（14 待合并，8 合并/关闭） | 无 | ✅ Bug 闭环快速；P0 级 #5271（陈旧后台任务覆写会话）待合入是当前最大风险点 |
| **NanoClaw** | 2 条（新开） | 9 条（6 待合并，3 关闭） | 无 | ✅ 用户报告响应迅速，但存在跨月度未合并功能 PR（Dial 集成 >1 个月） |
| **PicoClaw** | 3 条更新 | 9 条（5 合并/关闭，4 待合并） | 无（nightly） | ✅ 功能开发与质量修复并行，高危 Bug（#3269 MCP 挂起）获快速修复 PR；PR 积压 >6 周需关注 |
| **Moltis** | 0 条 | 1 条（待合并） | 无 | ✅ 低活跃但核心 PR 持续更新，无 Bug 报告，静默开发期 |
| **NullClaw** | 0 条 | 1 条（已关闭 #986） | 无 | ✅ 低活跃但健康，无积压、无 Bug、增量演进 |
| **ZeptoClaw** | 无活动 | 无活动 | 无 | ➖ 数据不足 |
| **LobsterAI** | — | — | — | ❌ 摘要生成失败，无法评估 |

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对核心与参照系**，单日更新量（500+500）是第二梯队（IronClaw/ZeroClaw/Hermes/CoPaw，24-50 条区间）的 10 倍以上，社区规模与影响力具有显著断层优势。其技术路线呈现三个明显特征：**① 安全边界显式化**（安装策略警告确认机制，CLI + UI 双侧推进）；**② 多 agent 舰队治理体系化**（cron 归属、policy 支持 `--agent`、工作区容错）；**③ Web UI 设计契约收口**（16px/1.5px stroke 视觉规范系统）。相较于 IronClaw 的自动化可靠性主线和 ZeroClaw 的安全架构 RFC 密集迭代，OpenClaw 覆盖面更广但问题积压也更严重——3 个 P0（内存泄漏、升级阻断、文件误删）悬置超 11 天，修复吞吐（~100/日）与 400 条待合并 PR 之间形成显著剪刀差，是其当前最大的结构性风险。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **回复/会话可靠性** | OpenClaw（#121058 静默回复失败，94 评论）、Hermes（Dashboard 会话恢复三连）、CoPaw（#7011 Console 停止请求误取消飞书会话）、NanoBot（#5271 陈旧后台任务覆写会话 P0） | 静默失败、状态串扰、数据覆写——用户对"issue 关闭但问题未真正修复"的容忍度已接近临界 |
| **内存/资源稳定性** | OpenClaw（#91588 RSS 15.5GB OOM、#87109 空闲堆 1073MB）、NanoClaw（#3245 无 AVX2 CPU 上 SIGILL）、NanoBot（#5382 Windows 文件锁崩溃） | 资源耗尽导致的消息丢失和部署阻断，是生产环境最致命的稳定性缺口 |
| **Web UI 体验统一** | OpenClaw（侧边栏标签面板重构系列 6 PR）、NanoBot（sidebar/拖拽分组/本地化）、Hermes（跨平台 zoom 复位问题簇）、IronClaw（SearchField 共享组件、toast 统一） | 从"功能可用"向"交互可预期"升级，跨平台状态保持（缩放、会话恢复）成为共性问题 |
| **MCP/工具生态稳定性** | OpenClaw（#98435 loopback 重连）、PicoClaw（#3269 MCP 连接失败挂起）、CoPaw（#6958 工具结果重复、#6405 Tool notfound） | MCP 作为核心扩展协议，其异常处理与结果一致性直接影响 Agent 可用性 |
| **多 agent/多会话治理** | OpenClaw（舰队治理系列 PR）、IronClaw（#6879 自动化可靠性史诗）、ZeroClaw（#8303 Goal mode v1，22 评论）、CoPaw（#5992 按会话模型覆盖） | 从单会话交互走向多任务、多模型、多身份并行编排，治理原语（模型固定、权限隔离、目标持久化）是共同瓶颈 |
| **安全策略与合规** | OpenClaw（安装策略确认）、ZeroClaw（#7155 shell 命令确认层级，20 评论）、IronClaw（#7659 扩展状态跨用户泄漏）、Hermes（#77472 请求转储未脱敏，HIGH） | 安全从"功能选项"变为"架构刚需"，命令审批、租户隔离、数据脱敏、OAuth 凭据管理成为标配 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|------|---------|---------|-------------|
| **OpenClaw** | 全功能个人 AI 助手 + 多 agent 舰队 | 极客/个人生产力重度用户 | 插件化能力 + 多通道（Slack/MS Teams/Matrix）+ Web UI，安全边界显式化 |
| **IronClaw** | 企业级自动化/无人值守任务 | 团队/商业部署 | 版本化发布（v1.2.0 stable），DB 租约、结构化执行规格、MCP 可插拔内存，QA 机制完善 |
| **Hermes Agent** | 桌面优先 + 跨平台 GUI/TUI | 桌面开发者/终端重度用户 | Desktop/TUI/Dashboard 三前端，Discord Omniscience 功能对齐战役，Anthropic OAuth 回退 |
| **ZeroClaw** | 安全架构先行 + 协议兼容 | 安全敏感的自托管用户 | RFC 驱动开发（9 项 high-risk 并行），Chat Completions profile 对接 Open WebUI/Aider，强调 egress 安全 |
| **CoPaw** | 技能系统动态生命周期 + 会话级模型覆盖 | 多模型切换需求用户 | AgentScope 生态，动态技能加载/自动卸载（AutoUnloadHook），DataPaw 数据分析运行时 |
| **NanoBot** | WebUI 体验打磨 + 协作能力 | Web 界面偏好用户/轻量部署 | Pyright strict 质量收窄，TS 终端 UI 重构方向，MCP SDK v2 迁移 |
| **PicoClaw** | 轻量本地/边缘部署 | 低资源设备用户 | Go 实现（deltachat 减负至 -200 LOC），DingTalk/DashScope TTS 等中文生态渠道 |
| **NanoClaw** | 预构建镜像 + 签名验证自动化 | 新手/自动化部署用户 | 签名审批器实弹演练，镜像安全（hardened image）优先 |
| **Moltis** | 连接器生态（日历/邮件/频道） | 信息聚合/隐私保护用户 | 持久化连接器（原子快照 + provider 范围信任 + 无复制凭据），跨通信协议统一数据层 |
| **NullClaw** | 配置灵活性 | 只读文件系统/特定部署场景 | SQLite 路径可配置，极简低调的增量演进 |

## 6. 社区热度与成熟度

**第一梯队——超高热度的生态核心**：OpenClaw 单日 1000 条 Issue/PR 更新，但积压与 P0 悬置并行，属于"高活跃高压力"状态。

**第二梯队——高度活跃的快速迭代期**：IronClaw（发版后收敛 + v1.3.0 预热）、CoPaw（日关闭 38 条 Issue，历史积压清仓）、ZeroClaw（RFC 密集但合并率仅 6%）、Hermes Agent（提交量大但合并滞后）。这四个项目均处于功能快速推进与质量体系建设的并行阶段，其中 IronClaw 的健康度最佳（发布线干净、QA 闭环、修复同步）。

**第三梯队——中等活跃的质量巩固期**：NanoBot（WebUI 打磨 + P0 待合入）、PicoClaw（功能与修复平衡，但 PR 积压 >6 周）、NanoClaw（响应迅速但大型 PR 跨月未合）。

**第四梯队——低活跃的静默演进期**：Moltis（连接器大 PR 打磨中）、NullClaw（零 Bug 零积压的健康低活跃）。ZeptoClaw 数据缺失，LobsterAI 生成失败，暂无法评估。

## 7. 值得关注的趋势信号

**① 可靠性已超越功能成为社区第一诉求**：OpenClaw 与 NanoBot 的最高热度议题均为静默失败/数据覆写，IronClaw 整个 v1.3.0 主线围绕自动化可靠性重构。对开发者启示：**消息投递确定性、失败可观测性（cron 静默失败零日志）、会话状态一致性**是下一阶段的核心竞争力，而非模型能力或渠道数量。

**② "关闭未修复"正在侵蚀社区信任**：OpenClaw #121058 的 94 条评论集中反映用户对"issue 关闭但监控仍在记录失败"的强烈不满；CoPaw 也存在 3-5 个月前 Issue 集中关闭但未提供验证引导的风险。对维护者启示：**关闭 Issue 必须附带根因结论与验证方法**，否则高评论量问题会反复爆发。

**③ 跨平台兼容性成为自托管部署的隐形门槛**：NanoClaw 的 AVX2 缺失导致 SIGILL、ZeroClaw 的 Windows 74 个测试失败、Hermes 的 macOS TCC 权限循环、NanoBot 的 Windows `os.replace()` 崩溃——从 CPU 指令集到操作系统权限机制，**发布流程需引入目标硬件/OS 基线矩阵验证**，否则"默认路径不可用"会直接劝退用户。

**④ MCP 从协议概念走向生态治理难题**：PicoClaw 的连接失败挂起、CoPaw 的重复工具结果与 Tool notfound、OpenClaw 的 loopback 不重连、ZeroClaw 的 Qdrant 静默回退——**MCP 服务器异常时的降级策略、结果去重、连接生命周期管理**已成为跨项目的共性技术债务。

**⑤ 安全架构从"选项"升格为"默认"**：OpenClaw 安装策略确认、ZeroClaw 的 shell 命令层级 + OIDC 可插拔认证、IronClaw 的扩展状态跨用户泄漏（租户隔离）、Hermes 的持久化脱敏残留——**命令审批链、数据脱敏边界、租户隔离**正从企业需求变为开源项目的默认配置。IronClaw #7659 提示的"扩展安装状态跨用户泄漏"若属实，将成为类 SaaS 安全事件的前车之鉴。

**⑥ 生态互联与开放协议成为增长引擎**：ZeroClaw 的 Chat Completions profile（对接 Open WebUI/LobeChat/Aider）、IronClaw 的 MCP 可插拔内存、Hermes 的 Grok/xAI 功能对齐、Moltis 的跨 Provider 连接器——**Agent 不再是孤岛，而是可嵌入主流 AI 工具链的节点**。"一次接入、处处可用"的协议兼容战略将决定项目在生态中的枢纽地位。

**⑦ 贡献者体验与维护带宽的矛盾显性化**：CoPaw PR #2105 存活 145 天才关闭、NanoClaw Dial PR 超 1 个月无结论、PicoClaw #3200/#3222 积压 >6 周、ZeroClaw 9 条 PR 等待作者响应——**多项目出现"社区提交热情超过维护者评审带宽"的瓶颈**。建立明确的 PR 评审 SLA、批量 rebase 窗口或贡献者招募机制，是维持社区活力的当务之急。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 🤖 NanoBot 项目动态日报 — 2026-08-15

## 1. 今日速览

过去 24 小时 NanoBot 项目保持较高活跃度：共 3 条 Issue 更新（1 条新开、2 条已关闭），22 条 PR 更新（14 条待合并、8 条已合并/关闭），无新版本发布。项目在代码质量（Pyright strict 收窄）、WebUI 体验（本地化、拖拽分组、侧边栏打磨）、会话稳定性（P0 级 stale save 修复）等多个方向同步推进，社区提交量明显放大，但多个功能型 PR 出现 conflict 标签，需要维护者介入 rebase。今日有两项 Bug 被快速闭环（Anthropic 流式超时、file-cap 归档异常），说明问题响应与修复链路较为顺畅。

---

## 2. 版本发布

今日无新版本发布。不过考虑到 24 小时内 8 个 PR 被合并/关闭、14 个 PR 排队中，下一版本大概率会打包一批 WebUI 交互改进与稳定性修复，值得关注。

---

## 3. 项目进展

今日合并/关闭的 PR 主要分布在 **WebUI 打磨**与**运行时稳定性**两条线上：

- **WebUI 交互细化**
  - [#5393 [CLOSED] feat(webui): polish sidebar and session transitions](https://github.com/HKUDS/nanobot/pull/5393) — 从协作功能中拆分出的 UI-only 改进，优化侧边栏层级、连接线、文件夹展示与标签页过渡效果，已合入 main。
  - [#5395 [CLOSED] feat(webui): refine conversation groups and shared shapes](https://github.com/HKUDS/nanobot/pull/5395) — 统一分组术语、支持将活跃会话拖入/拖出分组、简化删除确认样式，并引入跨控件的共享形状尺度。
- **稳定性修复**
  - [#5392 [CLOSED] fix(anthropic): treat stream idle timeout as inactivity only, not total time](https://github.com/HKUDS/nanobot/pull/5392) — 修复 Anthropic 流式空闲超时被误用作总超时的问题，避免长时活跃生成被中断。

整体来看，项目正在从“功能堆叠”阶段逐步转向 **WebUI 体验打磨 + 运行时健壮性加固** 的精细化阶段。两个 WebUI 合入 PR 均直接来自社区作者，表明外部贡献者已能深入到 UI 细节层。

---

## 4. 社区热点

今日讨论最集中的方向是 **会话管理与 WebUI 交互**，代表性条目：

- [#5271 [OPEN] fix(session): prevent stale background task saves from overwriting session data](https://github.com/HKUDS/nanobot/pull/5271) — 被标记为 **P0**，直击 `/new` 切换后旧后台任务覆写会话的危险场景。该 PR 已在 8 月 6 日提交、持续更新，说明社区对“会话生命周期一致性”有极高关注度。
- [#5356 [OPEN] feat(webui): improve setup flows across chat channels](https://github.com/HKUDS/nanobot/pull/5356) — 将未配置信道的开关变为可操作、按账户/凭据/连接/邮件/访问/行为/安全分组字段，直指新用户接入多渠道时的配置痛点。
- [#5389 [OPEN] feat(webui): add drag-and-drop session organization](https://github.com/HKUDS/nanobot/pull/5389) — 会话拖拽排序与建组需求，是 WebUI 从“够用”向“好用”迈进的典型信号。

这些 PR 的共同诉求是：**降低用户操作成本，提升会话管理的直观性**。社区对 WebUI 的投入已经从功能补全进入交互细节和可用性优化阶段。

---

## 5. Bug 与稳定性

今日报告的 Bug 共 2 条，均已关闭并已有对应修复：

| 严重程度 | Bug | 状态 | 修复 PR |
|---|---|---|---|
| **高** | [#5391 [CLOSED] NANOBOT_STREAM_IDLE_TIMEOUT_S 在 Anthropic 无回调流式路径上被用作总超时，导致长时间活跃生成被终止](https://github.com/HKUDS/nanobot/issues/5391) | 已关闭 | [#5392](https://github.com/HKUDS/nanobot/pull/5392) 已合并，将 `wait_for` 语义改为仅限空闲 |
| **中** | [#5378 [CLOSED] file-cap 归档失败会先变更会话内存状态，再持久化出错导致数据不一致](https://github.com/HKUDS/nanobot/issues/5378) | 已关闭 | 修复已合入，确保回调失败不污染内存态 |

此外，以下待合并 PR 也在修复**尚未变成 Issue 的潜在问题**：

- [#5271 [P0] 防止陈旧后台任务覆写会话](https://github.com/HKUDS/nanobot/pull/5271) — 会话生命周期安全，影响面大。
- [#5382 在 Windows 上对 `os.replace()` 瞬时 PermissionError 增加重试](https://github.com/HKUDS/nanobot/pull/5382) — 有真实 gateway 日志佐证（同一日志中出现两次），说明 Windows 用户环境并非小众。

整体来看，今日 Bug 均已被快速定位并闭环，项目**问题响应时效良好**，但 P0 级 #5271 仍需尽快合入以消除会话数据覆写风险。

---

## 6. 功能请求与路线图信号

值得关注的用户/社区功能信号：

- **会话协作**： [#5358 [OPEN] feat(webui): add session collaboration via mentions](https://github.com/HKUDS/nanobot/pull/5358) — 为会话添加服务端持有的稳定 `@name`，并通过 mention 选择器关联其他会话。该功能一旦落地，将改变单人使用模式向团队协作迁移的想象空间。
- **交互式背景**： [#5340 [OPEN] feat(webui): add interactive particle hero background](https://github.com/HKUDS/nanobot/pull/5340) — 空会话页增加 Canvas 粒子背景，属于润色型需求。
- **TypeScript 原生终端 UI**： [#4329 [OPEN] feat(cli): add native TypeScript terminal UI](https://github.com/HKUDS/nanobot/pull/4329) — 已开放数月，将 `nanobot agent` 重构为 TypeScript/OpenTUI 客户端，同时保留 Python 网关为唯一后端实现。这是 CLI 方向的大胆尝试，若合入将显著提升终端交互体验。
- **MCP SDK v2 迁移**： [#5179 [OPEN] Migrate MCP integration to SDK v2 with legacy compatibility](https://github.com/HKUDS/nanobot/pull/5179) — 兼容 `httpx2` 传输并保留 SSRF 校验等安全能力，是架构现代化的关键一步。
- **市场技能优先级**： [#5309 [OPEN] allow marketplace skills to shadow builtins](https://github.com/HKUDS/nanobot/pull/5309) — 解决工作区技能无法覆盖同名内置技能的可用性问题。

综合来看，下阶段路线图信号集中在 **WebUI 协作能力、CLI 体验重构、MCP/Provider 层现代化** 三个方向。

---

## 7. 用户反馈摘要

从今日 Issue 与 PR 描述中可提炼以下真实用户声音：

- **“长时间生成不应被空闲超时杀死”**（[#5391](https://github.com/HKUDS/nanobot/issues/5391)）：用户 shen0122 反馈 Anthropic 流式场景下，90 秒空闲超时被当作总超时使用，导致正常的长期生成中断。这反映出生产环境中模型输出时长差异大，**超时语义必须严格区分“空闲”与“总时长”**。
- **“归档失败不应弄脏内存会话”**（[#5378](https://github.com/HKUDS/nanobot/issues/5378)）：dajiaohuang 指出 `enforce_file_cap()` 在归档回调尚未成功时就已清掉内存中的溢出消息，一旦回调异常，用户会话数据就“不明不白”地少了内容。这属于**数据一致性的信任问题**。
- **Windows 平台稳定性**（[#5382](https://github.com/HKUDS/nanobot/pull/5382)）：albatrossflyon-coder 在 gateway 日志中两次捕捉到 `os.replace()` 的 `[WinError 5] Access is denied` 导致整个网关崩溃，说明**Windows 部署环境对异常重试机制有硬需求**。

总体来看，用户反馈集中在**运行时稳定性与平台兼容性**，对 WebUI 的反馈则更倾向于“希望它更顺手、更可控”。

---

## 8. 待处理积压

以下 PR/Issue 长期未合入或未关闭，建议维护者优先排查：

| 条目 | 创建时间 | 状态 | 关注点 |
|---|---|---|---|
| [#4145 Weather Skill](https://github.com/HKUDS/nanobot/pull/4145) | 2026-06-01 | OPEN | 已悬挂 2.5 个月，包含新示例技能与测试，建议明确是否合入或给出调整意见 |
| [#4329 native TypeScript terminal UI](https://github.com/HKUDS/nanobot/pull/4329) | 2026-06-13 | OPEN | 大型架构级重构，涉及 Python 网关与 TS 客户端的边界划分，需要维护者投入评审资源 |
| [#5271 stale background task saves (P0)](https://github.com/HKUDS/nanobot/pull/5271) | 2026-08-06 | OPEN | P0 级会话安全修复，长期未合入可能使生产环境持续暴露数据覆写风险 |
| [#5179 MCP SDK v2 migration](https://github.com/HKUDS/nanobot/pull/5179) | 2026-07-30 | OPEN | 依赖生态升级，合入窗口越晚，与新版 MCP SDK 的兼容成本越高 |
| 多个 `[conflict]` 标签 PR（[#5356](https://github.com/HKUDS/nanobot/pull/5356)、[#5389](https://github.com/HKUDS/nanobot/pull/5389)、[#5371](https://github.com/HKUDS/nanobot/pull/5371)、[#5358](https://github.com/HKUDS/nanobot/pull/5358)、[#5382](https://github.com/HKUDS/nanobot/pull/5382) 等） | 8 月中上旬 | OPEN | 说明近期合入速度追不上社区提交速度，建议安排一次集中 rebase 或合入窗口 |

---

*本报告由 AI 分析师自动生成，数据截止 2026-08-15 08:00 UTC。所有链接均可点击跳转至 GitHub 原始条目。*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-15

## 1. 今日速览

过去 24 小时项目保持高强度迭代：**50 条 Issue 更新（39 条活跃/新开，11 条关闭）与 50 条 PR 更新（45 条待合并，5 条合并/关闭）**，无新版本发布。社区贡献异常活跃，其中 **Discord Omniscience 功能对齐战役（#79564）集中提交了 10 个新 Issue 和 9 个新 PR**，成为当日绝对主线。质量方面，11 条 Issue 关闭中包含一批集中爆发的 Desktop GUI 缩放复位（zoom reset）回归问题，说明该问题簇已获修复。另有 1 条 HIGH 级安全残留问题（#77472）悬而未决，需重点关注。整体健康度良好，但 PR 合并速度（5 条）明显落后于提交速度（45 条待合并），合并积压值得注意。

## 2. 版本发布

无新版本发布。上一版本为 `v2026.8.13`（Kanban 任务日志中提及），可关注后续 release。

## 3. 项目进展

当日关闭/合并的 PR 相对较少，但完成了两项有实义的修复与清理：

- **[PR #81809（已合并）— fix(anthropic): add api.anthropic.com fallback to OAuth token endpoints](https://github.com/NousResearch/hermes-agent/pull/81809)**：为 Anthropic OAuth 登录/令牌刷新增加 `api.anthropic.com` 回退。解决了企业网络内容过滤器屏蔽 `platform.claude.com` / `console.anthropic.com` 时无法登录的问题，对受管控网络环境用户是实质体验修复。
- **[PR #81868（已合并）— test(lsp): don't hardcode /usr/bin/npm in the install-target filter](https://github.com/NousResearch/hermes-agent/pull/81868)**：修复 LSP 安装测试在 Windows 上的偶发失败，消除了对 `/usr/bin/npm` 路径的硬编码，改为通过 `find_node_executable` 解析。

此外，**11 条关闭 Issue 构成了更重要的进展信号**：`#60693`、`#82713`、`#81879`、`#50837`（Desktop 缩放复位）、`#66490`（Zellij 内 TUI 帧重复）、`#41480`（iTerm2 状态栏闪烁）、`#64425`/`#59591`/`#63701`（Dashboard 会话恢复异常）均被关闭，表明一批跨平台的 UI 状态保持与会话恢复缺陷已收敛。考虑到这些 Issue 横跨 macOS/Windows/RDP/Alt+Tab 四种触发场景，背后应有统一的 zoom reassert 修复合入。

## 4. 社区热点

- **[Issue #60693（已关闭，13 条评论）— GUI 110% 缩放间歇性重置回 100%](https://github.com/NousResearch/hermes-agent/issues/60693)**：今日评论数最高的 Issue，也是 zoom 复位问题簇的代表。用户反馈在 Desktop GUI 中设置 110% 缩放后，使用过程中会自行跳回 100%。同类问题在 Windows 高 DPI、macOS 启动其他 Electron 应用、RDP 重连、Alt+Tab 切换四种场景下集中爆发（`#84274`、`#82713`、`#81879`、`#50837`），背后诉求指向**跨平台的 UI 缩放状态保持机制缺失**。该簇现已基本关闭，但 `#84274`（RDP 场景）仍处于 OPEN 状态。
- **[Issue #80424（OPEN，10 条评论）— Grok/xAI Feature Parity & Alignment Campaign meta-issue](https://github.com/NousResearch/hermes-agent/issues/80424)**：社区推动 Hermes 的 Grok/xAI 接口与官方 xAI 开发者平台全面对齐，覆盖 Models、Chat/Responses 推理、Function calling、Reasoning、Streaming、Imagine 图像/视频、Voice/TTS 等能力面。带 `needs-decision` 标签，等待维护者表态。
- **[Issue #77472（OPEN，5 条评论）— 安全缺陷：请求转储、trajectory/MoA JSONL、pending_messages、/save 持久化未脱敏工具内容](https://github.com/NousResearch/hermes-agent/issues/77472)**：严重度 HIGH（受控残留物）/ MEDIUM。指出每次 API 错误都会写入 `sessions/request_dump_*.json`（仅正则脱敏，`force=True` 使其成为受控残留），已发现 11 个存活转储、最大 166 KB。评论热度高，反映社区对敏感信息落盘的担忧。
- **[Issue #64425（已关闭，5 条评论）— Dashboard 侧栏会话恢复不显示历史记录（v0.18.x 回归）](https://github.com/NousResearch/hermes-agent/issues/64425)**：点击侧栏历史会话后标题变化但终端为空，属明显回归。连同 `#59591`、`#63701` 构成 Dashboard 会话恢复体验问题簇，现已全部关闭。

## 5. Bug 与稳定性

按严重程度排列：

**高风险（安全）**

- **[Issue #77472（P2，OPEN）— 请求转储/trajectory/pending_messages 持久化未脱敏工具内容](https://github.com/NousResearch/hermes-agent/issues/77472)**：API 错误时写入的 `request_dump_*.json` 仅做正则脱敏，工具参数等敏感内容可能泄露至磁盘。**尚无 fix PR**，5 条评论，建议优先处理。

**中高风险（P2，影响功能正确性）**

- **[Issue #86411（P2，OPEN）— 显式 terminal.cwd 在回合中途重新固定工作目录，覆盖 CLI/TUI 启动目录](https://github.com/NousResearch/hermes-agent/issues/86411)**：本地后端中，`config.yaml` 的 `terminal.cwd` 会在回合进行中被重新应用，覆盖启动目录的权威值。启动时正确、运行中变错，行为诡异。**尚无 fix PR**。
- **[Issue #86385（P2，OPEN）— macOS 更新后屏幕录制权限循环：TCC 授权显示开启但无法重新授权](https://github.com/NousResearch/hermes-agent/issues/86385)**：合并签名修复 #73681 后，旧版（cdhash 固定）构建授予的 Screen Recording 权限失效，系统设置显示开启却无法重新触发授权，用户陷入权限死循环。**尚无 fix PR**，属更新导致的回归，影响面较大。
- **[Issue #86445（P2，OPEN）— Windows 下 LSP 服务解析选中 POSIX shim，报 WinError 193](https://github.com/NousResearch/hermes-agent/issues/86445)**：`agent/lsp/install.py` 优先探测无扩展名二进制，而 npm 同时生成 POSIX `#!/bin/sh` 脚本与 `.cmd` 包装器，`os.access(..., X_OK)` 在 Windows 上对任何文件都返回 True，导致解析错误。**已有对应 fix PR [#86456](https://github.com/NousResearch/hermes-agent/pull/86456)**。
- **[Issue #8751（P2，OPEN）— 遍历父目录查找 .git 根时 PermissionError 崩溃](https://github.com/NousResearch/hermes-agent/issues/8751)**：以低权限用户运行时 `agent/prompt_builder.py` 多个函数崩溃。**已积压超 4 个月**（4 月 13 日创建），3 条评论，至今无 fix PR。

**中低风险（P3）**

- **[Issue #84274（P3，OPEN）— Windows RDP 重连后 UI 缩放回到 100%（reassert 漏掉 display-metrics-changed）](https://github.com/NousResearch/hermes-agent/issues/84274)**：保存的缩放值未丢失但界面不重绘，属于 zoom 问题簇的残留项。
- **[Issue #86403（P3，OPEN，needs-repro）— Xiaomi MiMo v2.5 Pro 工具调用失效：已启用工具未暴露给模型](https://github.com/NousResearch/hermes-agent/issues/86403)**：启用 17/26 个工具但终端、读写文件、搜索等核心工具在会话中全部不可用，需复现确认。
- **[Issue #86393（P3，OPEN，duplicate）— Kanban 运行期 TERMINAL_CWD 被误报为弃用的 .env 设置](https://github.com/NousResearch/hermes-agent/issues/86393)**：误报类告警，已标记重复。

**已关闭 Bug（今日修复确认）**：zoom 复位问题簇（`#60693`、`#82713`、`#81879`、`#50837`）、Zellij 内 DEC 2026 同步输出帧重复（`#66490`）、iTerm2 流式输出时状态栏闪烁（`#41480`）、Dashboard 会话恢复三连（`#64425`、`#59591`、`#63701`）。这批关闭标志着 Desktop/TUI/Dashboard 三类前端稳定性问题的大面积收敛。

## 6. 功能请求与路线图信号

- **Discord Omniscience 战役（#79564）— 明确的下版本候选**：当日密集提交 10 个分阶段功能 Issue 与 9 个对应 PR，模块全部为新增文件且自带完整测试（测试通过数 11/11 至 54/54 不等），覆盖：
  - 线程生命周期（[Issue #86453](https://github.com/NousResearch/hermes-agent/issues/86453) / [PR #86454](https://github.com/NousResearch/hermes-agent/pull/86454)）
  - 论坛 starter/tag 操作（[Issue #86457](https://github.com/NousResearch/hermes-agent/issues/86457) / [PR #86458](https://github.com/NousResearch/hermes-agent/pull/86458)）
  - 消息编辑/删除、反应动作、轮询投影、入站消息模型（[PR #86449](https://github.com/NousResearch/hermes-agent/pull/86449)、[#86418](https://github.com/NousResearch/hermes-agent/issues/86418)、[#86451](https://github.com/NousResearch/hermes-agent/pull/86451)、[#86440](https://github.com/NousResearch/hermes-agent/pull/86440)）
  - 权限覆盖、频道标量设置、REST 分页合规、可靠性遥测（[PR #86428](https://github.com/NousResearch/hermes-agent/issues/86428)、[#86432](https://github.com/NousResearch/hermes-agent/pull/86432)、[#86437](https://github.com/NousResearch/hermes-agent/pull/86437)、[#86442](https://github.com/NousResearch/hermes-agent/pull/86442)）
  - 这些 PR 全部标为 "New module only"，说明是低风险的纯增量建设，合入概率很高。
- **[PR #86433 — feat(zai): add GLM-5.3 support](https://github.com/NousResearch/hermes-agent/pull/86433)**：为 zai provider 增加 GLM-5.3，复用 5.2 的 1M 上下文接线，`reasoning_effort` 行为与 5.2 一致。模型跟随类需求，预计下版本纳入。
- **[PR #86415 — Desktop first run opens straight into a working chat](https://github.com/NousResearch/hermes-agent/pull/86415)**：删除新装用户的 provider 选择墙，后台 ~1 秒铸造 guest 账户，打开即进入可聊天的界面。显著的首次体验（first-run UX）改进。
- **[PR #67454 — feat: add cross-process turn serialization with DB-level leases](https://github.com/NousResearch/hermes-agent/pull/67454)**：基于 DB 租约实现跨进程回合序列化，解决现有 in-process 注册表只能串行化单进程内 `[load history → run → flush]` 的问题。带 `needs-decision`，属架构级增强，推进速度较慢但方向重要。
- **[Issue #80424 — Grok/xAI 功能对齐战役 meta-issue](https://github.com/NousResearch/hermes-agent/issues/80424)**：社区期望将 xAI 官方平台能力（图像/视频 Imagine、TTS、Reasoning 等）完整引入，同样挂 `needs-decision`，是路线图层面的重要输入。

## 7. 用户反馈摘要

- **UI 缩放问题跨平台普遍存在，用户感知强烈**：多名用户（`#60693`、`#82713`、`#81879`、`#84274`）描述界面"明显跳变"、字体图标整体变大/变小，且**设置面板显示的值正确但实际渲染错误**，这种"显示与真实不一致"的状态比单纯的 Bug 更让用户困惑。macOS 用户还观察到「启动/退出其他 Electron 应用会连带影响 Hermes 缩放」这种应用间串扰，说明系统级 display-metrics 事件监听存在缺陷。
- **Dashboard 会话恢复的信任问题**：`#64425`、`#63701` 用户反馈点击历史会话后终端空白、或误开新会话，且 `#63701` 呈现"第一次点击正常、后续全部失效"的诡异规律。会话历史是用户对 AI 助手信任的基础资产，此类回归对产品口碑损伤较大，好在均已关闭。
- **macOS 更新权限循环是典型"修复引入的新问题"**（`#86385`）：签名修复解决了安全问题，却让老用户陷入无法重新授权的死胡同，提示未来签名变更需要配套 TCC 迁移指引或检测逻辑。
- **工作目录语义被颠覆引发困惑**（`#86411`）：用户明确表达"启动目录应当是 CLI/TUI 的权威工作目录"这一心智模型，`terminal.cwd` 回合中途重新覆盖的行为违背直觉。这与 `#86393`（Kanban 误报弃用告警）一样，属于配置语义一致性类问题，是用户对行为可预期性的核心诉求。
- **安全敏感用户关注落盘数据**：`#77472` 评论区反映出用户对 request dump 中工具调用内容（可能含密钥、文件路径、业务数据）未彻底脱敏的担忧，这类"受控残留"在安全合规场景下不可接受。

## 8. 待处理积压

- **[Issue #8751（P2，2026-04-13 创建，已积压 124 天）— PermissionError：遍历父目录崩溃](https://github.com/NousResearch/hermes-agent/issues/8751)**：跨越多版本仍未修复的基础稳定性问题，多函数崩溃且影响多用户环境部署，建议排期处理。
- **[PR #67454（needs-decision，2026-07-19 创建，已积压 27 天）— 跨进程回合序列化 DB 租约](https://github.com/NousResearch/hermes-agent/pull/67454)**：架构级增强，长期停留在待决策状态。若路线图认可多进程/多实例部署方向，应尽快给出明确意见。
- **[Issue #35530（P3，2026-05-30 创建，已积压 77 天）— TUI 终端尺寸变化未正确重绘，需 SIGWINCH 回退](https://github.com/NousResearch/hermes-agent/issues/35530)**：部分终端不触发 Ink resize 事件导致 UI 错位，属长期存在的兼容性缺陷。
- **[Issue #80424（needs-decision，2026-08-06 创建）— Grok/xAI 功能对齐 meta-issue](https://github.com/NousResearch/hermes-agent/issues/80424)**：10 条评论的社区重点诉求，等待维护者确认范围与排期。
- **[Issue #77472（P2/安全 HIGH，2026-08-03 创建，已积压 12 天）— 未脱敏工具内容持久化](https://github.com/NousResearch/hermes-agent/issues/77472)**：安全类问题不应久拖，建议优先于功能迭代处理。

---

*本报告基于 Hermes Agent GitHub 仓库（github.com/nousresearch/hermes-agent）2026-08-14 至 2026-08-15 的公开数据生成。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-08-15）

数据来源：github.com/sipeed/picoclaw

---

## 1. 今日速览

过去24小时项目活跃度较高，共产生 3 条 Issue 更新、9 条 PR 更新。其中最重要的动态是：**一个高影响 Bug（MCP 服务器连接失败导致聊天界面挂起）在报告后得到了快速修复 PR**，体现了项目对稳定性问题的响应速度。同时，5 条 PR 被合并/关闭，涵盖**DingTalk 图片消息支持、DashScope TTS、WeChat 音频发送**等多项功能增强，以及 **Seahorse 工具调用格式泄漏**等质量修复。技术债清理方面，deltachat 实现减负 200 行代码的 refactor PR 也在推进中。整体来看，项目在功能拓展、渠道覆盖和代码质量之间保持了较好的平衡。

---

## 2. 版本发布

过去24小时无新版本发布，当前仍为 nightly 构建状态（最近提交 `2cf030d2`）。最新正式版信息暂缺。

---

## 3. 项目进展

过去24小时共 5 条 PR 被合并/关闭，主要进展梳理如下：

### ✅ 功能增强

- **DashScope TTS + WeChat 音频发送**（[PR #3270](https://github.com/sipeed/picoclaw/pull/3270)）— 新增阿里云百炼 TTS 提供商支持，同步打通微信渠道的音频文件发送能力。这是音频链路的又一重要补充，为多模态交互奠定基础。
- **DingTalk 图片消息支持**（[PR #3283](https://github.com/sipeed/picoclaw/pull/3283)）— 支持钉钉渠道图片消息的接收，包含 OpenAPI token 缓存机制与优雅降级处理。渠道能力进一步补齐。

### ⚡ 稳定性与质量修复

- **Seahorse 工具调用格式泄漏修复**（[PR #3279](https://github.com/sipeed/picoclaw/pull/3279)）— 修复 `partsToReadableContent` 将工具调用格式泄漏到用户消息的问题，与已修复的同类 Bug 属于同一类症状的不同触发路径。

### 🛠️ 维护与更新

- **9 个 Provider 默认模型名更新**（[PR #3271](https://github.com/sipeed/picoclaw/pull/3271)）— 同步 OpenAI（gpt-5.6 系列）、Anthropic 等 9 家模型提供商的最新模型 ID，确保开箱即用的配置有效性。
- **actions/stale 依赖升级 v10 → v11**（[PR #3303](https://github.com/sipeed/picoclaw/pull/3303)）— 由 dependabot 自动提交，持续维护 CI 工具链。

### 🔄 进行中的优化

- **deltachat 通道减负重构**（[PR #3222](https://github.com/sipeed/picoclaw/pull/3222)，仍 OPEN）— 减少 200 行代码，移除遗留特性与过期测试，引用官方中继列表而非硬编码副本，密码配置改为仅存于 jsonrpc。

---

## 4. 社区热点

### 🔥 最热 Issue：[#3269 MCP 服务器连接失败导致 Agent 循环挂起](https://github.com/sipeed/picoclaw/issues/3269)

- 评论数：5 条（过去24小时更新），👍 1
- 状态：OPEN，报告至今已近 1 个月，昨日（8-14）因获得修复 PR 而重新活跃

**社区诉求分析**：该问题直接命中 PicoClaw 核心场景——聊天界面因 MCP 连接故障而彻底停止响应，对于以轻量本地 AI 助手为定位的产品而言，这是**致命级别的稳定性问题**。评论活跃且获得 👍 说明不少用户已遇到或担忧此问题。好消息是 **PR #3337 已于 8-14 提交修复**，社区反馈到修复的响应链路非常迅速。

### 🗣️ 值得关注的长期讨论

两条 stale 标记的 Issue（[#3308 代码审查建议](https://github.com/sipeed/picoclaw/issues/3308)、[#3307 Telegram 会话管理需求](https://github.com/sipeed/picoclaw/issues/3307)）各收获 2 条评论，分别指向**底层代码质量**（并发安全、goroutine 泄漏、内存/速度优化）和**渠道功能缺口**（Telegram 无会话管理能力）。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 服务器连接失败 → agent loop 挂起 → 聊天界面停止回复。影响所有用户的日常使用体验 | 有 fix PR（[#3337](https://github.com/sipeed/picoclaw/pull/3337)） |
| 🟡 中 | [PR #3319](https://github.com/sipeed/picoclaw/pull/3319)（OPEN） | `exec` 工具声明了 per-run timeout 参数但同步执行时忽略该值，始终使用全局超时；`background`/`pty` 参数类型在 schema 中被错误声明为字符串 | 待合并修复 |
| 🟢 已修复 | [PR #3279](https://github.com/sipeed/picoclaw/pull/3279) | Seahorse 的 `partsToReadableContent` 导致工具调用格式泄漏到用户消息（已合并） | ✅ 已修复 |

**稳定性整体判断**：#3269 是一个持续近 1 个月才获得修复 PR 的高危 Bug，期间用户可能多次遇到聊天中断问题，暴露了 **MCP 异常处理的防御性不足**。但从 PR 及时提出来看，维护团队已在积极应对。

---

## 6. 功能请求与路线图信号

### 📌 明确的新功能诉求

- **Telegram 等聊天渠道的会话管理**（[Issue #3307](https://github.com/sipeed/picoclaw/issues/3307)）— 用户指出 Web UI 有完整的 session 管理（列出/切换/删除），但 Telegram 等其他渠道没有对应能力。这反映了**跨渠道功能一致性**的诉求。

### 🔮 可能纳入后续版本的方向

- **可配置默认模型回退链**（[PR #3200](https://github.com/sipeed/picoclaw/pull/3200)，OPEN）— 允许用户设置默认模型并添加/排序 fallback 模型，提升模型调用鲁棒性。该 PR 已存在 45 天，功能设计较完整，若合入将显著改善多模型场景下的用户体验。
- **MCP 连接失败降级策略**（[PR #3337](https://github.com/sipeed/picoclaw/pull/3337)）— 不仅仅是修复 hang，而是引入更健壮的容错机制，为后续 MCP 多服务器场景铺路。

---

## 7. 用户反馈摘要

> ⚠️ 注：由于可获取的评论内容有限，以下反馈基于 Issue/PR 描述与状态推断。

- **核心痛点：MCP 连接故障不应让整个 Agent 停止工作**（[#3269](https://github.com/sipeed/picoclaw/issues/3269)）。用户期望的是单点故障隔离，而非全局崩溃。这是当前最明确的用户反馈。
- **代码审查者的关注点在底层健壮性**（[#3308](https://github.com/sipeed/picoclaw/issues/3308)）— 社区代码审查提到并发安全隐患、goroutine 泄漏风险以及内存/速度优化空间，说明部分贡献者在关注项目长期可维护性。
- **功能缺口认知明确**（[#3307](https://github.com/sipeed/picoclaw/issues/3307)）— 用户对 Web UI 的会话管理体验是满意的，但期望在 Telegram 等渠道中获得同等能力，场景描述清晰具体（列出/切换/删除会话）。

---

## 8. 待处理积压

以下为长期未合并/未解决的重要条目，建议维护者重点关注：

### ⏳ 待合并 PR（按等待时长排序）

| PR | 创建时间 | 已等待 | 说明 |
|----|---------|-------|------|
| [#3200](https://github.com/sipeed/picoclaw/pull/3200) | 2026-07-01 | 45 天 | feat: 可配置默认模型回退链（较完整的功能增强） |
| [#3222](https://github.com/sipeed/picoclaw/pull/3222) | 2026-07-03 | 43 天 | refactor: deltachat 清理，-200 LOC（技术债优化） |
| [#3319](https://github.com/sipeed/picoclaw/pull/3319) | 2026-08-07 | 8 天 | fix: exec 工具超时/布尔参数修复（功能性 Bug） |

### ⏳ 待关闭/更新 Issue

- **[#3269](https://github.com/sipeed/picoclaw/issues/3269)**（MCP 挂起）— 已获修复 PR #3337 关联，建议尽快完成 review、合入并安排回归验证。该 Issue 从 7-20 创建至今接近 1 个月，属于长期未解的高影响问题。

---

## 📊 项目健康度总结

PicoClaw 目前处于**积极迭代期**：功能开发（TTS、渠道扩展）与质量修复并行推进，社区贡献活跃。最值得肯定的信号是 **Issue #3269 从活跃报告到 fix PR 提交仅用了不到 24 小时**，说明维护者对高影响稳定性问题的响应速度很快。需要注意的是，多条功能型 PR 积压时间较长（#3200、#3222 均已超过 6 周），可能存在 review 带宽不足的情况，建议对重要 PR 加排期标记并推进合入，避免社区贡献者流失。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 2026-08-15

## 今日速览

过去 24 小时项目活跃度中等偏上：新增/更新 Issue 2 条，PR 活动 9 条（其中 6 条待合并、3 条关闭）。核心团队完成了一轮签名验证流水线的实弹测试并关闭相关测试 PR，社区侧则聚焦于 2 个真实用户环境问题——`setup.sh` 在旧版 Node 下的逻辑缺陷，以及预构建镜像在无 AVX2 指令集的 CPU 上产生 SIGILL。两项用户报告均获得了快速响应，其中 #3248 已有对应修复 PR #3249。整体来看，项目正处于修复与功能并行的稳步迭代状态，但存在一批跨月度未合并的功能 PR 值得关注。

## 项目进展

今日关闭 3 个 PR，均为 core-team 主导的签名验证机制相关：

- **PR #3243 (`verify-agent-image: arming auto-merge is not a verdict`)** — 已关闭。修复了 CI 中 `Enable auto-merge` 步骤失败导致整个 verify job 被误判为失败的问题。此前该步骤在 draft PR、`allow_auto_merge=false` 或瞬时 API 错误时都会失败，而这些与镜像本身质量无关。改进后 `verify` 已成为必需检查，判定逻辑更加准确。([链接](https://github.com/nanocoai/nanoclaw/pull/3243))
- **PR #3242 (#3244)（DO NOT MERGE 实弹测试）** — 已按计划关闭未合并。这两条 PR 是签名审批器（signature approver）的实弹演练：#3242 验证 verify→approve→cosign→review 完整链路，#3244 验证 draft 状态下审批器仍能正确触发并独立复核。核心团队的自动化质量保障机制正在通过实战方式打磨。([#3242](https://github.com/nanocoai/nanoclaw/pull/3242) / [#3244](https://github.com/nanocoai/nanoclaw/pull/3244))

另有 6 个待合并 PR 覆盖安装脚本、调度系统、容器运行时和文档等方向，详见下文。

## 社区热点

今日讨论焦点集中在两条由用户报告的环境适配问题上，二者均直接切入真实使用场景：

- **Issue #3245（Bun 需要 AVX2 导致 SIGILL）** — 用户 `sergeykad` 报告，默认安装的预构建 agent 镜像（wizard 推荐的 `NANOCLAW_HARDENED_IMAGE=true`）包含基于非 baseline x64 目标构建的 Bun 二进制（要求 AVX2）。在没有 AVX2 的 Intel Tremont/Elkhart Lake 处理器（如 Celeron J6413/N5105）上直接触发 SIGILL。这类低功耗平台恰好是自托管 AI agent 的常见部署环境，具有较高代表性。([链接](https://github.com/nanocoai/nanoclaw/issues/3245))
- **Issue #3248（setup.sh 无法处理"Node 太旧"的情况）** — 用户 `glifocat` 发现脚本中 `check_node` 会把"未安装"和"版本过旧"两种情况统一引入 `install-node.sh`，但后者只要检测到任何已存在的 Node 就会短路跳过安装，导致修复分支形同虚设。该 issue 发布后很快附带 PR #3249，属于高响应度的 bug 报告。([链接](https://github.com/nanocoai/nanoclaw/issues/3248))

## Bug 与稳定性

按严重程度排列今日报告的 Bug：

| 严重度 | 问题 | 状态 | 说明 |
|--------|------|------|------|
| 🔴 高 | **预构建镜像 Bun 需要 AVX2**（[#3245](https://github.com/nanocoai/nanoclaw/issues/3245)） | 无 fix PR | 受影响 CPU 上所有 agent 镜像均无法启动，硬性阻断部署。建议提供 baseline x64 构建或在安装阶段做 CPU 特性检测并给出明确报错。 |
| 🟠 中 | **setup.sh 对"旧版 Node"处理失败**（[#3248](https://github.com/nanocoai/nanoclaw/issues/3248)） | 已有 fix PR [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) | 已安装旧版 Node（<20）的用户会被错误引导进安装流程，但脚本实际不执行任何操作，最终停留在旧版本。影响升级路径体验。 |
| 🟠 中 | **畸形 cron 字符串导致每次 sweep 重复报错**（[#3247 PR](https://github.com/nanocoai/nanoclaw/pull/3247)） | 修复 PR 待合并 | 当 `cron-parser` 拒绝非法重复字符串（如 `0 21-5 * * *` 分钟范围逆序）时，`handleRecurrence` 只记录日志不清理数据，导致每次 sweep tick 反复报错。PR 将其改为退役该 cron 字符串。 |
| 🟠 中 | **Windows 上孤儿容器清理静默失效**（[#3246 PR](https://github.com/nanocoai/nanoclaw/pull/3246)） | 修复 PR 待合并 | `cleanupOrphans()` 通过 shell 执行 `--format '{{.Names}}'`，POSIX 单引号在 Windows `cmd.exe` 下被原样传给 Docker CLI，导致查询不到任何容器，清理逻辑静默跳过。 |

## 功能请求与路线图信号

- **Dial 频道集成**（[PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050)、[PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041)）— 由 `OmriBenShoham` 提交的两个 PR 分别添加 Dial 到频道选择器/wizard，以及完整的 Dial 频道适配器（SMS + AI 语音通话）。这两个 PR 自 7 月 14 日开启，已开放超过一个月但仍在持续更新（8 月 14 日有活动），表明作者仍在积极维护，预计后续可能进入合并流程。若合入，NanoClaw 将新增一个重要的通信渠道集成能力。
- **AVX2 兼容性需求**（[Issue #3245](https://github.com/nanocoai/nanoclaw/issues/3245)）— 虽然属于 bug 报告，但底层诉求是对 x86 baseline 架构的支持，这可能推动项目提供兼容性更强的 prebuilt 镜像或运行时检测机制，属于平台支持层面的路线图信号。

## 用户反馈摘要

- **CPU 兼容性是自托管用户的硬门槛**（[Issue #3245](https://github.com/nanocoai/nanoclaw/issues/3245)）：用户指出默认路径选择的镜像在特定但常见的低功耗 x86 平台上完全不可用，且 SIGILL 的错误形式对新手极不友好（无明确提示）。反馈暗示当前发布流程缺少对目标硬件基线的验证。
- **脚本逻辑与实际行为不一致削弱信任**（[Issue #3248](https://github.com/nanocoai/nanoclaw/issues/3248)）：`setup.sh` 声称检测 Node 版本并提供修复路径，但实际执行时空转。这类"脚本承诺了但没做到"的问题会显著影响新用户和升级用户的首次体验。

## 待处理积压

- **PR #3050 / #3041（Dial 频道集成）** — 自 7 月 14 日创建至今超过一个月仍未合并，期间经历多次更新。如果维护者认为方向可行，建议明确评审结论；如暂不纳入，也请告知作者以降低协作成本。([#3050](https://github.com/nanocoai/nanoclaw/pull/3050) / [#3041](https://github.com/nanocoai/nanoclaw/pull/3041))
- **PR #3230（移除指向已退役 data/env 镜像的文档）** — 8 月 12 日创建，已停留 3 天无新动态。文档类修复通常评审成本低，建议尽快处理。([链接](https://github.com/nanocoai/nanoclaw/pull/3230))

---

*本日报基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-15


## 1. 今日速览

过去24小时内，NullClaw 项目整体活跃度处于低位：Issues 侧无任何新增、关闭或讨论；PR 侧有 1 条已关闭记录（#986），无新提交或待合并 PR；无新版本发布。尽管社区互动几近于零，但 PR #986 的落地表明项目仍在持续推进配置灵活性与部署适配能力，属于偏安静的增量演进阶段。对于关注该项目的用户，近几日可获得的信息增量有限，建议保持观察。

---

## 3. 项目进展

### 值得关注的变更

**#986 [CLOSED] GEN-548: make SQLite memory database path configurable**  
- **作者**: gently-whitesnow  
- **创建/更新**: 2026-08-14 / 2026-08-14  
- **链接**: [nullclaw/nullclaw PR #986](https://github.com/nullclaw/nullclaw/pull/986)

**变更内容**：
- 新增 `memory.database_path` 配置项，用于 SQLite 后端主记忆引擎的存储路径自定义。
- 当该配置项为空时，保持原有默认行为（使用 `<workspace>/memory.db`）。
- 相对路径会基于工作区目录解析，同时支持绝对路径，便于只读工作区部署场景。
- 相关配置说明已补充至示例配置文件。

**影响分析**：该 PR 解决了在只读文件系统或需要将记忆存储独立于工作区外的部署场景下的路径硬编码问题，属于对部署灵活性的重要补充，不影响默认配置下的既有行为，无破坏性变更。项目在配置可移植性和生产部署适配性上向前迈进了一步。

---

## 4. 社区热点

今日无任何页面产生评论或点赞（PR #986 评论数为 undefined，实际为 0）。因此，没有形成讨论热点的 Issues/PRs。社区活跃度处于低谷，可能是项目处于迭代间隙或用户讨论集中在其他平台所致。

---

## 5. Bug 与稳定性

过去24小时内未报告新的 Bug、崩溃或回归问题。结合 PR #986 的合入，未引入已知稳定性风险，项目整体处于稳定状态。

---

## 6. 功能请求与路线图信号

今日没有新的 Issues 提出功能请求，也没有来自社区的明确路线图建议。从已合入的 PR #986 来看，项目方正在主动完善配置能力，这暗示未来版本中“可配置化”可能是一个持续方向（如更多存储相关路径、缓存目录等）。但今日无新增信号可做进一步推断。

---

## 7. 用户反馈摘要

今日所有 Issues/PRs 均无用户评论，因此无法提炼具体的用户痛点、使用场景或满意度反馈。缺乏反馈本身也可视为一种信号：暂无紧迫问题需要用户主动发声。

---

## 8. 待处理积压

当前不存在长期未响应的重要 Issue 或 PR：
- 所有 Issues 数量为 0。
- 唯一活跃 PR #986 已在 24 小时内被关闭（合入）。

维护者目前无积压负担，社区侧也没有悬而未决的诉求需要关注。

---

**总结**：NullClaw 项目今日为安静但健康的低活跃日。功能演进以配置灵活性为主，无 Bug、无社区积压，整体项目健康度良好，等待下一次更大的功能迭代或社区讨论高潮。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-15

数据来源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw) | 统计窗口：过去 24 小时

---

## 1. 今日速览

IronClaw 在过去 24 小时保持**极高度活跃**：共更新 Issues 24 条（新开/活跃 15，关闭 9）、PR 47 条（待合并 25，已合并/关闭 22），并正式发布 **ironclaw-v1.2.0** 稳定版。项目主线已明确转向 v1.3.0，核心战场是**自动化（Automations）可靠性体系**——围绕父史诗 #6879 连续开出 4 个子任务并配套 3 个实现 PR，形成完整的功能列车。同时，QA bug bash 产出一批 P2 级问题（Slack 连接状态误报、Telegram MP4 附件失败、扩展状态跨用户泄漏），其中多数已有关联修复 PR 跟进。整体看，项目处于**发版后快速迭代、质量与功能双线推进**的健康状态。

---

## 2. 版本发布

### ironclaw-v1.2.0（稳定版）
🔗 [Release 详情](https://github.com/nearai/ironclaw/releases) | 发布时间：2026-08-13

- **性质**：由 `1.2.0-rc.3` 稳定晋升，包含 RC2/RC3 验证的全部修复及 RC1 完整功能集。
- **本轮新增修复**：运行时容器镜像现预装 `curl`，使容器内 HTTP 健康检查可执行（编排器对 worker 的探活依赖此能力）。
- **无破坏性变更**：发布线已通过 PR #7657 合并回 main，并携带**有状态保留的 1.0/1.1→1.2 启动迁移**及后端/领域契约测试覆盖，升级路径安全。

**相关跟进**：
- [PR #7657](https://github.com/nearai/ironclaw/pull/7657)（已合并）：1.2.0 发布线合回 main，forward-port 迁移逻辑与 Windows 文件系统/smoke 修复。
- [PR #7663](https://github.com/nearai/ironclaw/pull/7663)（待合并）：继续 forward-port 1.2 修复至 main——线程索引投影修复、Windows JSON 干净输出、运行时 curl 等。

---

## 3. 项目进展

今日共合并/关闭 22 个 PR，关闭 9 个 Issue，以下为关键推进：

### 🎯 自动化可靠性（v1.3.0 主线）
- [PR #7657](https://github.com/nearai/ironclaw/pull/7657)（已合并）：1.2.0 发布线合回 main，完成版本同步。
- [PR #7652](https://github.com/nearai/ironclaw/pull/7652)（已合并）：生产环境 DB 写入负载测量——量化单次 agent turn（10 次内置能力调用、11 次模型尝试）的写入量，为 #7591 写压力史诗提供基线。
- [Issue #7532](https://github.com/nearai/ironclaw/issues/7532)（已关闭）：**结构化执行规格**落地，为定时触发引入「一份存储规格 + 一份运行时策略 + 一条创建路径」的中央设计，是自动化可靠性的地基。

### 🔌 认证与扩展体系
- [PR #7665](https://github.com/nearai/ironclaw/pull/7665)（已合并）：支持 origin-scoped hosted MCP OAuth（RFC 9728），托管的 `/mcp` 端点可完成 DCR、token exchange 与 refresh。
- [PR #7668](https://github.com/nearai/ironclaw/pull/7668)（已合并）：扩展 provider 认证诊断——保留有界的 GitHub 错误信息与稳定错误码，打通 WASM、ABI、能力门控、durable gate-record 全链路。
- [Issue #7183](https://github.com/nearai/ironclaw/issues/7183)（已关闭）：**每用户 LLM 模型选择**落地，模型配置从 admin-only 放开至用户级。

### 🖥️ WebUI 与体验
- [Issue #7569](https://github.com/nearai/ironclaw/issues/7569)（已关闭）：共享 `SearchField` 组件落地，迁移 Settings、Extensions Registry、Sidebar Threads 三处重复实现。
- [Issue #7565](https://github.com/nearai/ironclaw/issues/7565)（已关闭）：修复暴露 WebUI 路由的 i18n 覆盖缺失（Admin 配置页等）。
- [Issue #7520](https://github.com/nearai/ironclaw/issues/7520)（已关闭）：退役被取代/不可达的旧版 WebUI 前端表面。
- [Issue #7414](https://github.com/nearai/ironclaw/issues/7414)（已关闭）：本周 Dogfooding & QA 史诗收束。

### 📈 项目推进评估
v1.2.0 发布线完整合回 main 后，主干已无版本分叉；v1.3.0 自动化架构从「设计讨论」进入「批量实现」阶段（当前 4 个实现 PR 在途），DB 写压力治理同步启动。项目正处于**发版后收敛 + 下一版本功能预热的交替节奏**。

---

## 4. 社区热点

今日讨论最集中的主题是 **#6879 自动化可靠性史诗** 及其派生的功能列车，其次为 QA bug bash 产出的集成类问题。

**#1 自动化史诗 #6879 — 结构性缺陷引发系列子任务**
🔗 [Issue #6879](https://github.com/nearai/ironclaw/issues/6879)
- 核心诉求：无人值守的自动化运行「时灵时不灵」，同一 prompt 有时成功有时毫无产出，尤其在 DeepSeek V4 Flash 等小模型上。团队审计认定是**结构性缺陷**——trigger 触发被执行成了普通交互式聊天轮次，而非模型噪声。
- 由它派生出 4 个 v1.3.0 增强子任务（#7644 预检、#7645 模型固定、#7646 授权预飞、#7647 确定性不投递），并有 [PR #7651](https://github.com/nearai/ironclaw/pull/7651)（确定性 suppression）和 [PR #7650](https://github.com/nearai/ironclaw/pull/7650)（语义执行结果持久化）跟进。

**#2 QA bug bash 集成问题三连（joe-rlo 报告）**
- [Issue #7660](https://github.com/nearai/ironclaw/issues/7660)：Slack 已连接且功能正常，UI 却显示「Finish Setup」+「Reconnect」。
- [Issue #7662](https://github.com/nearai/ironclaw/issues/7662)：Telegram 发送 MP4 报 `invalid_value (attachments.mime_type)`，即使文件已被识别为 `video/mp4`。
- [Issue #7659](https://github.com/nearai/ironclaw/issues/7659)：Extensions/Registry 页展示**其他用户安装的扩展**，疑似状态跨用户泄漏。
- 三者均为 P2 级、来自同一 Railway 测试实例，反映集成层 UI 状态与真实连接状态存在脱节。

**#3 链接设备 QA（Telegram）**
- [Issue #7667](https://github.com/nearai/ironclaw/issues/7667)：手机模式登录码提示未反映 `sentCode.type_`（raw-TL 发送路径），用户收不到验证码。
- 关联修复 [PR #7658](https://github.com/nearai/ironclaw/pull/7658)（已合并）：识别迁移 DC 上的 2FA 门控并说明登录码到达位置。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高 — 数据/租户隔离
| Issue | 描述 | 状态 |
|---|---|---|
| [#7659](https://github.com/nearai/ironclaw/issues/7659) | 扩展安装状态跨用户泄漏（他用户安装的扩展显示为已安装） | P2，无修复 PR，**需优先确认是否涉及数据越权** |

### 🟠 中 — 功能不可用/误导
| Issue | 描述 | 状态 |
|---|---|---|
| [#7662](https://github.com/nearai/ironclaw/issues/7662) | Telegram MP4 附件上传失败（mime_type 校验） | P2，无修复 PR |
| [#7660](https://github.com/nearai/ironclaw/issues/7660) | Slack 已连接但 UI 误报「Reconnect/Finish Setup」 | 已有修复 [PR #7666](https://github.com/nearai/ironclaw/pull/7666)（已合并） |
| [#7667](https://github.com/nearai/ironclaw/issues/7667) | Telegram 手机模式登录验证码提示错误 | 关联修复 [PR #7658](https://github.com/nearai/ironclaw/pull/7658)（已合并） |
| [#6879](https://github.com/nearai/ironclaw/issues/6879) | 自动化运行结构性不可靠（史诗级） | 多 PR 在途（#7650/#7651/#7648 等） |

### 🟡 低 — 体验/一致性
| Issue | 描述 | 状态 |
|---|---|---|
| [#7638](https://github.com/nearai/ironclaw/issues/7638) | 线程删除失败使用阻塞式 `window.alert()`，与全局 toast 体系不一致 | 待处理 |

### ✅ 今日已修复并关闭
- [#6869](https://github.com/nearai/ironclaw/issues/6869)（DOCX 文件损坏致 Word 无法打开）— 关闭，修复已验证。
- [PR #7655](https://github.com/nearai/ironclaw/pull/7655)（已合并）：CI 中 Slack/Telegram 集成覆盖率门槛重新对齐实测值，修复 CI 误报。

---

## 6. 功能请求与路线图信号

### 已确认进入 v1.3.0 的自动化增强（来自 #6879 派生）
- [Issue #7644](https://github.com/nearai/ironclaw/issues/7644)：调度武装前的结构化自动化一次性校验（依赖 #7193 手动触发地基）。
- [Issue #7645](https://github.com/nearai/ironclaw/issues/7645)：**按自动化固定 LLM 模型档案**——避免默认模型变更静默改变定时任务行为。
- [Issue #7646](https://github.com/nearai/ironclaw/issues/7646)：预检授权 + 获取作用域化常驻审批租约。
- [Issue #7647](https://github.com/nearai/ironclaw/issues/7647)：为定时运行添加确定性不投递结果（`[SILENT]` 契约化）。

### 架构级新方向
- [Issue #7664](https://github.com/nearai/ironclaw/issues/7664)（追踪） + [PR #7661](https://github.com/nearai/ironclaw/pull/7661)（草稿）：**基于 MCP 的可插拔内存**——内存系统由配置绑定而非编译期工厂分支，Mnesis Core 为首个消费者。这是记忆体系开放化的关键一步。
- [Issue #7624](https://github.com/nearai/ironclaw/issues/7624) + [PR #7648](https://github.com/nearai/ironclaw/pull/7648)（实验性）：**ACP 执行器**——以 claude-code 作为 loop 的 dev-only harness，验证可插拔循环槽位。

### 值得关注的已关闭请求（可能已实现）
- [Issue #7656](https://github.com/nearai/ironclaw/issues/7656)（已关闭）：Slack-to-Console 桥接（回复携带深链与运行元数据）。
- [Issue #7183](https://github.com/nearai/ironclaw/issues/7183)（已关闭）：每用户 LLM 模型选择。

### 信号判断
自动化可靠性（#7644–#7647）与可插拔内存（#7664）是 v1.3.0 的两大投资方向；ACP harness（#7624）是前瞻性探索。UI 侧则持续清理技术债（#7637 类型化、#7638 toast 统一、#7639 InlineNotice 共享）。

---

## 7. 用户反馈摘要

- **文档生成对比竞品**（来自 #6869，报告人 Davin Basi）：生成带批注的 NDA 为 .docx 时，IronClaw 两次失败（首次协议违规中断），用户明确表示「ChatGPT 和 Claude 可以轻松做到」。此问题已在本次修复关闭，但**文档类产物质量仍是用户感知中的短板**。
- **小模型自动化不可靠**（来自 #6879）：DeepSeek V4 Flash 上无人值守运行产出不稳定，用户场景为「存储的 prompt 定时执行」。开发团队承认是结构性缺陷而非模型噪声——该反馈直接驱动了 v1.3.0 整个自动化可靠性路线。
- **模型选择权诉求**（来自 #7183，Champions 周会上 Jeremy Koch 提出）：普通用户无法自行切换 LLM 模型，需管理员代操。已随该 Issue 关闭解决。
- **QA 实例反馈质量高**（#7660/#7662/#7659，joe-rlo 报告）：Railway 测试实例上的三个 P2 bug 均带有清晰复现步骤，且指向 UI 状态一致性、附件类型校验、租户隔离三个真实场景，属于**集成层测出的高价值问题**。

---

## 8. 待处理积压

以下为长时间未合并/未响应的 PR 与 Issue，建议维护者关注：

### 📌 长期未合并 PR（超过 7 天）
| PR | 内容 | 创建 | 待处理天数 |
|---|---|---|---|
| [#7255](https://github.com/nearai/ironclaw/pull/7255) | docs(governance)：评估 APDD kit 治理框架并提议分阶段集成（docs-only） | 08-05 | 10 天 |
| [#7379](https://github.com/nearai/ironclaw/pull/7379) | release(docs)：由 stable release 移动 docs-live 分支，修复文档与发布版本错位 | 08-07 | 8 天 |
| [#7378](https://github.com/nearai/ironclaw/pull/7378) | test(docs)：CLI/manifest/Responses 的 doc-fact 契约测试（doc-truth PR 3/5） | 08-07 | 8 天 |
| [#7456](https://github.com/nearai/ironclaw/pull/7456) | fix(reborn)：持久化存储 profile 无关化（安全信封防降级） | 08-10 | 5 天 |

### 📌 大型在途 PR（体积 XL，需关注审查进度）
- [PR #7562](https://github.com/nearai/ironclaw/pull/7562)（XL，risk: medium）：unbound-turns 设计 + 阶段一实现（prepared-context 门、unbound 运行道、内核绑定引用删除）——被 #7634 栈依赖，是后续多 PR 的地基。
- [PR #7634](https://github.com/nearai/ironclaw/pull/7634)（XL）：complete switchover to prepared-context turns，含 71 条一致性审计。
- [PR #7661](https://github.com/nearai/ironclaw/pull/7661)（XL）：MCP-backed 内存 provider——注意其子 Issue #7664 已在追踪。

### 📌 长期开放 Issue
- [#6879](https://github.com/nearai/ironclaw/issues/6879)（v1.3.0 史诗，7 月 29 日创建）：虽已拆解出多个子任务，但父史诗本身跨度大（涉及 trigger→run 全链路重构），建议每周在日报中同步进度。

---

## 项目健康度小结

| 维度 | 评估 |
|---|---|
| 活跃度 | ⭐⭐⭐⭐⭐ 24 Issues / 47 PRs / 1 Release，核心开发者全员在岗 |
| 发布健康 | ✅ 1.2.0 发布线干净合回，forward-port 有序 |
| 质量管控 | ✅ QA bug bash 机制运行有效，P2 bug 平均当天即有修复 PR |
| 风险点 | ⚠️ #7659 扩展状态跨用户泄漏涉及租户隔离，需优先评估数据越权可能 |
| 路线图清晰度 | ✅ v1.3.0 自动化可靠性 + 可插拔内存双主线明确，子任务拆解规范 |

---

*本日报由 AI 助手基于 GitHub 公开数据自动生成，供项目维护者与社区参考。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-15

> 数据来源：GitHub (moltis-org/moltis) | 统计窗口：过去24小时


## 1. 今日速览

过去24小时内，Moltis 项目整体活跃度较低：无新的 Issue 开启或关闭，仅有一项 PR（#1190）处于开放待合并状态，该 PR 自 8月11日 创建后持续更新至昨日（8月14日），说明仍有维护力量在推进功能落地。尚未发布新版本，当前工作重心集中在“持久化连接器”这一较大的功能增量上，而非修复类任务。整体判断：项目处于**功能开发期的平静阶段**，公共讨论面偏冷，但核心开发链路仍有实质性推进。


## 2. 版本发布

截至本日报生成时，项目在过去24小时内未发布任何新版本（Releases）。最近一次版本发布信息暂缺，暂无更新内容、破坏性变更或迁移注意事项可披露。


## 3. 项目进展

### 待合并 PR（重点观察）

- **[#1190] Add durable calendar, channel, and email connectors** — 作者: penso
  - 链接: [Moltis PR #1190](https://github.com/moltis-org/moltis/pull/1190)
  - 创建: 2026-08-11 | 最近更新: 2026-08-14 | 状态: OPEN
  - 内容摘要：
    - 新增**与提供商无关的连接器持久化机制**：原子快照（atomic snapshots）、调度（scheduling）、投影（projections）以及有界本地全文搜索（bounded local full-text search）。
    - 新增**只读连接器**：CalDAV（日历）、Gmail（邮件）、Himalaya v2（邮件）、可复用的频道历史数据集（channel-history datasets）。
    - 设计上强调**Provider 自有 schema**、不复制任何凭据（no copied credentials），并加入**Provider 范围信任**（provider-scoped trust）机制。

**项目进展评估**：此 PR 是 Moltis 在“连接器生态”方向上的一次重要架构级扩展——从目前的通用连接能力向“持久化、可搜索、各 Provider 数据隔离且可信”的方向演进。若合并，将为日历、邮件、频道三类高频数据源提供统一、可编程的访问层，是项目能力边界的一次显著外扩。当前未合并可能与代码体量和架构评审有关，值得持续关注。


## 4. 社区热点

过去24小时内无新增 Issue，也无 PR 评论或反应数据可统计。因此，**今日无讨论热点**。

间接观察：唯一活跃的 PR #1190 从创建至昨日共持续 3 天并被更新，可能存在评审讨论或作者迭代，但评论数据未被采集到。建议维护者关注该 PR 的评论线程，以防关键反馈被遗漏。


## 5. Bug 与稳定性

过去24小时内**无新报告的 Bug、崩溃或回归问题**。项目当前未暴露稳定性风险，也无紧急修复中的缺陷。

结合 PR #1190 中“原子快照”“有界本地搜索”等设计来看，项目对数据一致性与资源边界有明显考量，当前架构层面较为稳健。


## 6. 功能请求与路线图信号

虽然今日无用户直接提交的功能请求，但 PR #1190 自身携带了明确的路线图信号：

- **持久化连接器**：将连接器从“一次性拉取”升级为“持久化 + 快照 + 调度”，暗示后续可能支持离线数据访问、增量同步、定时抓取等上层能力。
- **多 Provider 统一抽象**：CalDAV、Gmail、Himalaya v2、频道历史数据集同时被纳入，说明项目正在构建一个**跨通信协议的统一数据层**。
- **隐私与安全设计**：明确“不复制凭据”“Provider 范围信任”，指向多云/多账号场景下的安全合规诉求，很可能成为下一版本的核心卖点。

若 #1190 被合入，预计后续版本将围绕“连接器市场”“搜索能力”“可信同步”三个方向继续演进。


## 7. 用户反馈摘要

过去24小时内无 Issues/PR 评论数据，因此**没有可直接引用的用户反馈**。

从 #1190 的提交内容反推，当前用户/社区的核心诉求可能包括：
- 在统一的本地界面中管理日历、邮件和聊天历史，避免在多个应用间切换；
- 数据保留在本地或自有基础设施上，且服务商无法读取（呼应“无复制凭据”的设计）；
- 对大量历史消息/邮件进行本地全文搜索，且不依赖云服务。

这些均为间接推断，待有实际用户评论数据后可进一步验证。


## 8. 待处理积压

### 需维护者重点关注的开放 PR

- **[#1190] Add durable calendar, channel, and email connectors**（OPEN，已待合并 4 天）
  - 链接: [Moltis PR #1190](https://github.com/moltis-org/moltis/pull/1190)
  - 关注理由：这是当前唯一在途的重要功能 PR，体量大、涉及架构设计。如果长期滞留，可能导致分支冲突或社区贡献者流失。建议安排核心维护者评审，明确合并意向或给出修改清单。

### 长期未响应 Issue

过去24小时内无 Issue 更新，且数据概览未显示历史积压 Issue 的数量。若存在早期未关闭的 Issue，建议维护者利用 GitHub 的“stale”标记机制进行定期巡检，避免社区反馈被埋没。


**项目健康度总评**：当前项目处于**静默开发期**。活跃度虽低，但核心 PR 的持续更新表明开发主线和维护响应仍在运行，无 Bug 报告也反映近期版本稳定性较好。建议下一阶段加强社区运营（如发布 PR 评审进展、招募连接器生态贡献者），以维持项目可见度。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-15

## 1. 今日速览

过去 24 小时，CoPaw（QwenPaw）项目保持高度活跃：共更新 50 条 Issue（新开/活跃 12 条，关闭 38 条，关闭率 76%）与 41 条 PR（26 条待合并，15 条已合并/关闭），社区反馈密度高、维护者响应及时。今日无新版本发布，项目正处于功能密集开发与稳定化并行的迭代阶段。值得关注的是，技能系统动态生命周期、会话级模型覆盖、DataPaw 数据分析应用运行时等多项大型 PR 正在推进中，同时一批历史遗留问题（自动更新、模型配置兼容性等）获得集中关闭。


## 3. 项目进展

今日合入或关闭的 PR 覆盖了技能系统、渠道媒体处理、插件配置等关键链路，另有多个重磅 PR 正在评审中，整体项目正在向更灵活的技能管理、更强的模型兼容性和更完善的多媒体处理能力迈进。

**已合并/关闭的 PR**

- **[skill-system] 动态技能加载 + 自动卸载 + frontmatter 修复**（[PR #7029](https://github.com/agentscope-ai/QwenPaw/pull/7029)、[PR #7031](https://github.com/agentscope-ai/QwenPaw/pull/7031)）：新增 `load_skill` / `unload_skill` / `check_skill_status` 工具链，引入 AutoUnloadHook 每 5 轮自动卸载闲置技能，修复 frontmatter 描述读取与 lazy skill 路径 bug，重构了技能管理的核心能力。关联 PR 还有自动标题同步（[PR #7030](https://github.com/agentscope-ai/QwenPaw/pull/7030)，[PR #7032](https://github.com/agentscope-ai/QwenPaw/pull/7032)）。

- **[OneBot] 入站媒体本地化**（[PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715)）：将 OneBot 通道的图片、音频、视频与文件在进入 Agent 处理前统一解析并下载到受管本地存储，对齐 AgentScope 2.0 的本地 `DataBlock` 管道，为多媒体会话奠定基础。

- **[channels] 恢复插件通道交互式配置器**（[PR #6943](https://github.com/agentscope-ai/QwenPaw/pull/6943)）：在 CLI 通道配置流程中重新支持插件通道的 `get_configurator()`，并使用临时 FastAPI 应用加载插件注册的路由，修复了插件通道配置功能回归。

- **[docs] Whisper 安装说明与记忆指南重写**（[PR #2105](https://github.com/agentscope-ai/QwenPaw/pull/2105)、[PR #6997](https://github.com/agentscope-ai/QwenPaw/pull/6997)）：补充了本地语音转文字（Whisper）的安装文档，并全面重写了长期记忆指南，扩展了 Agent 对多记忆表面的感知描述。

**待合并的重点 PR（处于评审中）**

- **[DataPaw] 新增原生数据分析应用运行时**（[PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)）：首次贡献者提交，为 CoPaw 增加独立的数据分析工作区，值得关注。
- **[按会话模型覆盖]**（[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)）：允许同一 Agent 在不同会话中使用不同 LLM，新增 `/model` 命令扩展，合入后将显著提升多模型切换的灵活性。
- **[模型路由与元数据统一]**（[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)）：实现 provider 发现、模型元数据、路由与回退能力的统一目录，属于基础设施级重构。
- **[MCP 工具结果去重]**（[PR #6969](https://github.com/agentscope-ai/QwenPaw/pull/6969)）：修复 FastMCP 返回重复数据问题（对应 Issue #6958），通过只保留 `structuredContent` 避免冗余写入。
- **[子代理会话分组与媒体下载控制]**（[PR #7035](https://github.com/agentscope-ai/QwenPaw/pull/7035)、[PR #7036](https://github.com/agentscope-ai/QwenPaw/pull/7036)）：分别在 Console 中增加子代理会话分组与媒体附件下载按钮，属于界面体验优化。


## 4. 社区热点

今日讨论热度最高的 Issue 集中在**模型配置兼容性**、**后台运行能力**和 **MCP 工具稳定性**三个主题上，社区反馈呈现“配置体验 > 功能迭代”的优先诉求。

1. **[Bug] 自动获取模型为什么不可用**（[#3045](https://github.com/agentscope-ai/QwenPaw/issues/3045)，8 条评论，已关闭）：用户报告 v1.0.1 Windows 桌面版自动获取模型功能不可用。此问题悬置超 4 个月后于今日关闭，侧面说明维护者近期在处理该问题。与 [#944](https://github.com/agentscope-ai/QwenPaw/issues/944)、[#3002](https://github.com/agentscope-ai/QwenPaw/issues/3002) 等模型配置类问题形成共振，指向 OpenAI Responses API 兼容性这一核心短板。

2. **[Question] 缺少真正后台/守护模式，SSH 启动卡住**（[#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010)，6 条评论，已关闭）：开发者在服务器场景下执行 `qwenpaw app` 无法退出命令，`nohup` 也无济于事。该问题直指部署场景的可用性缺陷，虽已关闭，但未在 Issue 中标注修复 PR，建议重点跟进。

3. **[Question] 升级 2.0 后 MCP 工具总是提示 Tool notfound**（[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)，6 条评论，已关闭）：用户升级到 docker 2.0.0.post3 后，MCP 工具名变为 `[mcp-key]__[tool_name]` 格式但始终无法调用。关闭意味着已有解决方案，但社区对该问题的关注度很高，未来需通过回归测试加以约束。

4. **[Feature] 桌面端自动更新 + Windows 任务栏图标错误**（[#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846)，6 条评论，已关闭）：用户抱怨每次需卸载重装才能更新，且任务栏显示 Python 图标而非 CoPaw 图标。这是桌面端体验的重要缺口，同主题在 [#3464](https://github.com/agentscope-ai/QwenPaw/issues/3464) 中再次出现，社区呼声高，值得在产品路线图中明确。

5. **[Bug] Console stop 请求可取消活动中的飞书会话**（[#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)，5 条评论，仍开放）：汇报者在 2.1.0 版本中发现多 UI 会话场景下会话身份串扰，Console UI 的停止请求会误取消飞书渠道正在进行的对话。该问题直接关系到多渠道场景下的稳定性，当前状态为开放，暂无对应 fix PR。


## 5. Bug 与稳定性

今日共报告/活跃 12 条新 Bug（含回归与崩溃类），以下按严重程度排序，并标注是否已有修复 PR。

| 严重程度 | Issue | 问题描述 | 状态与修复 PR |
|---------|-------|---------|--------------|
| 🔴 高 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | 多 UI 会话下身份值串扰，Console 停止请求可取消活跃的飞书会话 | 开放，无对应 PR |
| 🔴 高 | [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) | 流式会话中工具调用接口 `/tool-calls/{session_id}/{tool_call_id}/offload` 返回 404 "Tool call not found" | 开放，无对应 PR |
| 🟠 中 | [#6958](https://github.com/agentscope-ai/QwenPaw/issues/6958) | FastMCP 返回结构化数据时，tool result 文件中出现两份重复数据 | 已有修复 PR [#6969](https://github.com/agentscope-ai/QwenPaw/pull/6969)（评审中） |
| 🟠 中 | [#6972](https://github.com/agentscope-ai/QwenPaw/issues/6972) | Chrome 扩展 WebSocket 握手成功但发送 `tab.create` 命令后连接断开，浏览器工具实现存在 bug | 已关闭，未标注修复 PR |
| 🟠 中 | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前聊天记录不可见，仅显示内部 eviction index | 已关闭，无 PR 信息 |
| 🟡 低 | [#7040](https://github.com/agentscope-ai/QwenPaw/issues/7040) | UI 文案错别字（"Stop Running" 写成 "Stopp Running"） | 已关闭（标注 invalid），建议顺手修复 |
| 🟡 低 | [#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) | qwenpaw-creator 插件在 Windows 上保存模型配置时始终报 "Internal Server Error" | 已关闭 |
| 🟡 低 | [#6197](https://github.com/agentscope-ai/QwenPaw/issues/6197) | 桌面版启动时若 `nvidia-smi` 卡死会导致整体挂起 | 已关闭 |
| 🟡 低 | [#4832](https://github.com/agentscope-ai/QwenPaw/issues/4832) | Windows 下执行 shell 命令时缺少 `CREATE_NO_WINDOW` 标志导致 cmd 窗口闪烁 | 已关闭 |
| 🟡 低 | [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) | QwenPaw 2.0.1 与 agentscope 2.0.4.post1 不兼容导致崩溃与工具权限死锁 | 已关闭，建议通过 PR [#6908](https://github.com/agentscope-ai/QwenPaw/pull/6908)（升级 agentscope 至 2.0.6）验证修复 |

> 今日关闭的 Bug 数量较多（38 条 Issue 关闭），说明维护者正在系统性地清除历史积压，但 `#7011` 与 `#7016` 均为 2.1.0 版本的新问题，且无对应修复 PR 在途，稳定性方面仍需提醒团队重点关注。


## 6. 功能请求与路线图信号

今日讨论中浮现的功能需求可归纳为以下几类方向，并结合已有 PR 预判其落地可能性。

**可能纳入下一版本的功能**

- **按会话模型覆盖**（[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)）：已收到社区在 [#2763](https://github.com/agentscope-ai/QwenPaw/issues/2763) 中对 “/models 查看与切换模型” 的请求，PR 正处于 Under Review 阶段，预计在近期版本中推出。
- **动态技能生命周期管理**（[PR #7029](https://github.com/agentscope-ai/QwenPaw/pull/7029)）：与社区提出的 “skills-hub 管理页面”（[#2418](https://github.com/agentscope-ai/QwenPaw/issues/2418)）方向一致，当前已合并技能加载/卸载工具链，后续演化出可视化技能市场是可预期的路线。
- **会话拆分与消息级删除**（[#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436)、[#4001](https://github.com/agentscope-ai/QwenPaw/issues/4001)）：两条均聚焦长对话管理，虽无直接对应 PR，但 PR [#7035](https://github.com/agentscope-ai/QwenPaw/pull/7035)（子代理/定时任务会话分组）已在 Console 层做出同类信息架构调整，说明团队正关注会话组织体验。
- **本地 GGUF 模型一键运行**（[#6433](https://github.com/agentscope-ai/QwenPaw/issues/6433)）：用户明确提出内置 llama.cpp 运行时直接下载/运行 GGUF 模型的诉求，目前无对应 PR，但从零配置本地模型的发展趋势看，值得产品团队评估优先级。
- **定时任务支持不投递结果**（[#2554](https://github.com/agentscope-ai/QwenPaw/issues/2554)）：已关闭但属于“定时抓取场景”的实用诉求，建议在 Cron/定时任务模块后续迭代中纳入。

**路线图信号**：PR [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)（DataPaw 数据分析应用运行时）和 PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（Provider/模型路由统一目录）若合入，将把 CoPaw 从“对话助手”向“多应用运行时 + 模型路由中枢”推进，属于架构级跃迁，建议社区密切关注。


## 7. 用户反馈摘要

从今日的 Issue 评论中可提炼以下真实用户声音：

- **桌面端“更新难”是最集中的抱怨点**：[#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846) 与 [#3464](https://github.com/agentscope-ai/QwenPaw/issues/3464) 中用户反复提到“每次都要卸载后再安装很麻烦”，且 Windows 任务栏图标错误进一步拉低了专业感。这一问题在多个版本中长期存在，建议作为桌面端体验的优先改进项。

- **服务端部署场景被忽视**：[#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010) 中用户明确反馈“通过 SSH 或脚本启动时命令一直卡住不返回”，说明 `qwenpaw app` 作为无守护进程的设计无法适配服务器自动化部署，这在 AI 应用 Serverless/容器化部署日益普及的背景下是一个关键缺口。

- **MCP 工具生态的兼容性焦虑**：[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) 的“Tool notfound”和 [#6972](https://github.com/agentscope-ai/QwenPaw/issues/6972) 的 Chrome 扩展断连，共同指向工具生态的稳定性问题。MCP 是 CoPaw 连接外部能力的核心协议，建议投入更多测试资源覆盖常见的 MCP Server 与浏览器工具实现。

- **“Scroll 压缩只应影响模型输入，不应破坏用户可见完整记录”**（[#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)）：这一用户表述精准地定义了对上下文压缩的基本预期，也反映了用户对“数据主权”的重视——压缩机制不能以牺牲用户可读历史为代价。


## 8. 待处理积压

以下为长期未响应或风险较高、建议维护者重点关注的事项。

1. **多会话身份隔离问题（[#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)）**：2.1.0 的潜在稳定性缺陷，涉及飞书会话被误取消，且无在途修复 PR，建议置顶处理并在 2.1.1 修复。

2. **长期历史积压已批量关闭但缺验证**：多条 3-4 月创建的配置类 Issue（[#3045](https://github.com/agentscope-ai/QwenPaw/issues/3045)、[#2303](https://github.com/agentscope-ai/QwenPaw/issues/2303)、[#944](https://github.com/agentscope-ai/QwenPaw/issues/944) 等）今日集中关闭，但均为 3-5 个月前的反馈，建议发布更新日志时注明这些已修复项，并引导用户验证，避免社区对“静默关闭”产生不信任。

3. **PR #2105 存活 145 天才关闭**：[PR #2105](https://github.com/agentscope-ai/QwenPaw/pull/2105) 于 3 月 23 日创建、8 月 14 日才关闭，虽只是文档更新，但反映出 PR 评审队列存在长期积压。类似地，[PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)（会话级模型覆盖）已开放 35 天仍未合入，建议加速评审以提升贡献者积极性。

4. **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) Provider/模型统一目录**：超大变更（涉及 provider 发现、模型元数据、路由与回退），自 7 月 21 日创建至今仍在评审，属于架构级改动，风险较高但价值很大，建议安排核心维护者专项跟进并拆细评审。

5. **Creator 插件配置保存失败（[#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806)）**：Windows 上 qwenpaw-creator 插件无法保存模型配置，反馈来自 8 月 7 日，虽已关闭，但插件生态的健康度会直接影响用户对 CoPaw 扩展性的信心，建议在插件 SDK 中加入针对 Windows 路径处理的回归用例。

---

**日报总结**：CoPaw 项目处于显著的活跃上升期，每日 Issue/PR 更新量大，维护者处理效率较高。未来一周建议持续观察 #7011、#7016 两个 2.1.0 新 Bug 的修复节奏，以及 PR #6940、#5992、#6302 三个大功能是否合入。若能在桌面端更新体验与多会话稳定性上做出改进，项目健康度将进一步提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-15

## 今日速览

ZeroClaw 在过去 24 小时保持高强度协作：33 条 Issue 更新（30 新开/活跃、3 关闭）、50 条 PR 更新（47 待合并、3 已合并/关闭），无新版本发布。讨论焦点集中在安全策略、架构类 RFC 与跨平台稳定性三大方向：9 项 high-risk RFC 正在并行推进（如 #8303、#7155、#8603），其中 #8303（Goal mode v1）以 22 条评论成为今日最热议题。P1 级 Bug #9421（不完整终端响应误报成功）已有对应修复 PR #9999 待审查，说明社区对严重问题响应较快。整体活跃度评估：**高**，项目正处于架构收敛与安全加固的关键阶段。

## 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。项目当前处于 v0.8.5 稳定化周期（见 tracker #9459），该里程碑的 intake 已于 8 月 4 日冻结，每周发布就绪的工作。

## 项目进展

数据显示过去 24 小时有 **3 条 PR 已合并/关闭**，但未出现在 Top 20 评论列表中（该列表均为待合并 PR），推测为小幅修复。已确认的动态包括：

- **Issue #6663 关闭**：`feat(telegram): show tool-call progress during partial streaming` 已完成，Telegram 部分流式场景下的工具调用进度展示功能落地。
- **Issue #9982 以 wontfix 关闭**：外部 ViBo Cloud API 托管记忆提案被拒绝，维护者对第三方托管外部依赖保持保守态度。

值得关注的关键待合并 PR（对项目推进有实质意义）：

- **PR #9999**：修复 P1 Bug #9421，将 OpenAI 兼容 `finish_reason: "length"` 正确归类为输出 token 上限失败，并拒绝不完整的非流式文本/工具消息——直接补上"不完整终端响应被误报成功"的漏洞。Git-stacked 依赖 #9447，需注意合入顺序。
- **PR #9996**：使 sender-scoped 行动预算（`max_actions_per_hour`）的容量预留与提交操作原子化，防止并行工具调用联合超限。
- **PR #9002**：将 dashboard WebSocket 视为 viewer/controller 而非 agent turn 的 owner，避免导航/休眠/断网导致任务被取消，已进入 maintainer review。
- **PR #9281**：`config/set` 失败时自动回滚已创建的 map aliases，确保配置写入的原子性。

## 社区热点

| 议题 | 评论数 | 核心诉求 |
|---|---|---|
| [#8303 RFC: Goal mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 22 | 跨多个 agent turn 持久化有界用户目标；社区共识是**控制首版范围**，避免把重启交接、broad channel admission、Web、异步子工作全部塞进第一个 delivery |
| [#7155 高危 shell 命令确认层级](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 20 | 引入 allow/ask/deny 命令策略（类似 Claude Code），第三版修订已按 maintainer 意见收窄范围 |
| [#8603 Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 19 | 让 ZeroClaw 暴露 OpenAI Chat Completions 协议接口，以接入 Open WebUI、LobeChat、Aider 等主流客户端——这是**生态互联**的明确呼声 |
| [#7141 Pluggable inbound authentication](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 16 | OIDC + 可插拔入站认证 + canonical principals，面向 Identity & Access 里程碑，8 个修订版本仍活跃 |
| [#7462 Windows 74 test failures](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 15 | 反复出现的跨平台 CI 缺口：74 个测试在 Windows 11 中文环境下失败，CI 只跑 Linux。用户持续跟进，反映对"Windows 二等公民"的不满 |

**热点背后的诉求**集中在三点：① 安全可控地赋予 Agent 能力（#7155、#7141）；② 与更广泛的 AI 工具生态互通（#8603）；③ 跨平台质量一致性（#7462）。

## Bug 与稳定性

按严重程度排列：

**S1（阻塞工作流）**

- [#9421 不完整终端响应可被报告为成功](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)：provider 可能在没有可信最终答案的情况下结束 turn，但 runtime/delegation 仍向调用方报告成功。**已有修复 PR #9999**，待合入。

**S2（降级行为）**

- [#7462 Windows 11 上 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)：Unix-only 测试命令、路径语义、控制台代码页 936 编码问题；CI 仅跑 Linux 导致漏检。无直接 fix PR 关联。
- [#9486 高熵检测器误红act Solana 钱包地址](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)：Telegram 出站消息中的 Solana 地址被替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，且 `high_entropy_tokens=false` 在 channel 路径不生效。影响所有使用 Solana MCP 的 Telegram 用户。
- [#9919 Qdrant 静默回退到 MarkdownMemory](https://github.com/zeroclaw-labs/zeroclaw/issues/9919)：`create_memory_with_builders` 在缺少 storage config 时静默选错持久化层，需改为显式报错。

**S3（轻微问题）**

- [#9983 fallback 无 vision 模型错误信息误导](https://github.com/zeroclaw-labs/zeroclaw/issues/9983)：请求含 vision 输入时因 fallback 模型不支持而失败，但报错未指出根因是模型能力不匹配。
- [#9965 cron 自定义 shell 测试 ETXTBSY 竞争](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)：并行 runtime test gate 下偶发 ETXTBSY，导致无关 PR 的 required check 变红，属测试稳定性问题。

## 功能请求与路线图信号

| 功能请求 | 状态 | 对应实现/信号 |
|---|---|---|
| [#9895 Telegram provider 分组分页 /model 选择器](https://github.com/zeroclaw-labs/zeroclaw/issues/9895) | 已实现 | PR #9997 已提交，添加 provider-grouped、分页 inline keyboard，预计进入 v0.8.5 或下一版本 |
| [#9970 Discord 按角色授权](https://github.com/zeroclaw-labs/zeroclaw/issues/9970) | in-progress | 新增 `allowed_role_ids`，与现有用户 ID allowlist 叠加；社区对细粒度权限模型需求明确 |
| [#9788 系统提示中报告 shell 方言](https://github.com/zeroclaw-labs/zeroclaw/issues/9788) | blocked | 让模型不依赖 OS 名猜测 shell 语言，提升 tool:shell 的跨平台准确性 |
| [#7065 Agent eval harness](https://github.com/zeroclaw-labs/zeroclaw/issues/7065) + [#9967 Harness 评估框架 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) | 路线图/roadmap | 建立可重复的评估制度（benchmark 选择、配置 pinning、逐 turn 插桩、master 基线），是质量基线的长期投资 |
| [#9621 分阶段 opt-in 产品遥测](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) | 待审查 | 维护者希望获得真实使用数据辅助决策，但需要权衡隐私与社区信任 |
| PR #9986 Agent 便携 bundle 导出 | 待合并 | `zeroclaw agents export` 输出 manifest + config + workspace，满足可移植性诉求 |
| PR #9994 ZeroCode transcript 右键复制菜单 | 待合并 | UI 交互细节增强，避免右键立即写入剪贴板 |

**路线图信号**：v0.8.5 稳定化（#9459）仍在推进中；安全架构类 RFC（#7141、#7142、#6971）持续迭代，说明 v0.9.0 安全架构方向已明确；telemetry 与 eval harness 的提出表明项目在**规模化质量管理**上开始布局。

## 用户反馈摘要

- **跨平台痛点**：NiuBlibing（简体中文 Windows 用户）持续报告 74 个测试失败，指出 CI 只跑 Linux 导致 Windows 体验长期受损。该类问题已累计 15 条评论，说明不是偶发个案。
- **加密与 MCP 场景冲突**：koshak01 报告 Telegram 中 Solana 钱包地址被高熵检测器全部打码，导致依赖加密资产的 agent 工作流不可用。"我自己的钱包地址为什么被当成机密？"——这反映安全检测需要更精细的上下文判断。
- **移动端可用性**：morningstarnasser 提出 Telegram 文本命令在移动端"still cumbersome"，当配置多路由时用户体验差，直接推动了 PR #9997 的键盘交互实现。
- **维护者对第三方托管的保守态度**：ViBo Cloud API 推销在 2 条评论内被 wontfix 关闭，说明项目对外部托管记忆基础设施持谨慎态度，偏好自建/自托管方案。
- **RFC 范围的自我收敛**：多个大型 RFC（#7155、#6954、#7141）在修订中不断收窄规范性范围、明确边界，社区表现出对"渐进式变更、降低风险"的强烈偏好。

## 待处理积压

**等待维护者决策的 RFC**（needs-maintainer-review 或长期未定稿）：

- [#8603 Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（19 评论，P2，high risk）
- [#9487 Runtime-owned conversation sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) 与 [#9488 Unified attachment architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（各 14 评论，P2，high risk，同一提案族）
- [#6971 Security posture & universal ingress policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（5/27 创建，11 评论，已近 3 个月未定稿）
- [#6954 Provenance & reply contract for internal turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)（5/26 创建，第 2 版修订稿仍待评审）
- [#9621 Staged opt-in telemetry](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)

**需要作者响应的 PR**（needs-author-action，共 9 条，均为长期未合入）：

- [#9137 插件共享 egress policy 基础](https://github.com/zeroclaw-labs/zeroclaw/pull/9137)、[#9126 类型化插件实例配置校验](https://github.com/zeroclaw-labs/zeroclaw/pull/9126)、[#9580 内置 HTTP egress 安全加固](https://github.com/zeroclaw-labs/zeroclaw/pull/9580)，三者相互依赖，是插件安全体系的关键链路，但已停留数周
- [#9713 token accounting on history-trim events](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)、[#9707 vision_model_provider 迁移修复](https://github.com/zeroclaw-labs/zeroclaw/pull/9707)、[#9420 Anthropic stored OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)、[#9839 不可逆命令拼写封禁](https://github.com/zeroclaw-labs/zeroclaw/pull/9839)、[#9842 cron 交付契约](https://github.com/zeroclaw-labs/zeroclaw/pull/9842)

**维护者决策队列本身**：

- [#8692 Maintainer decision queue for RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（13 评论）与 [#8691 ADR 审计 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) 共同表明：多条 RFC 等待终审已成为流程瓶颈。建议维护者优先处理 #8603（生态价值高）、#6971/#6954（积压近 3 个月）以及 #8692 中列出的积压项。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*