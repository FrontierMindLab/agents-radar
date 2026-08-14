# AI CLI 工具社区动态日报 2026-08-15

> 生成时间: 2026-08-14 23:00 UTC | 覆盖工具: 10 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Grok Build](https://github.com/xai-org/grok-build)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告（2026-08-15）

## 1. 生态全景

当前 AI CLI 工具赛道已进入**高频迭代期**，头部工具保持每日发版节奏（Codex 单日 5 个 alpha、Qwen Code 单日 3 个版本），同时社区反馈开始从"功能有无"转向"稳定性与成本可控性"。**Windows 平台体验**成为全行业最大短板——Codex、Claude Code、Gemini CLI、Pi 四个仓库当日均有 Windows/WSL 相关的高热度问题。**长会话可靠性**（上下文压缩、OOM、挂起、静默失败）是第二个跨工具共性痛点，直接关系到 agent 能否跑完真实开发任务。MCP 生态在 Copilot CLI 和 Claude Code 两侧同时出现兼容性阵痛，协议的严格校验与工具的实际部署方式之间的张力正在显现。

## 2. 各工具活跃度对比

| 工具 | 版本发布 | 热点 Issues | 重要 PR | 活跃度评价 |
|---|---|---|---|---|
| **Claude Code** | v2.1.233、v2.1.232（2 个） | 10（焦点：#2054 CJK 输入法，147👍） | 4 | 高，节奏稳定，社区需求讨论为主 |
| **OpenAI Codex** | rust-v0.148.0-alpha.14~18（5 个） | 10（焦点：#20214 Windows 冻结，100 评论） | 10+（全部合并） | 极高，但 Windows 性能回归严重 |
| **Gemini CLI** | v0.56.0-nightly（1 个） | 10（焦点：#22323 子代理误报 GOAL） | 10 | 高，P1 稳定性问题密集 |
| **Copilot CLI** | v1.0.80、v1.0.80-1（2 个） | 10（焦点：#4480/#4490 MCP OAuth 回归） | 3 | 中高，1.0 后生态磨合期 |
| **Kimi Code CLI** | 无 | 4 条更新（焦点：#1283 记忆系统，39 评论） | 0 | 低，社区声量大但迭代缓慢 |
| **OpenCode** | 无（桌面 v1.18.1 为存量） | 10（焦点：#42608 ID 回绕事故） | 10 | 高，多模型聚合定位清晰 |
| **Pi (pi-mono)** | v0.84.2（1 个） | 10（焦点：#7547 Windows 玩法，27 评论） | 10 | 高，TUI 性能与 Provider 扩展并进 |
| **Qwen Code** | v0.21.12 + 2 preview（3 个） | 10（焦点：#8957 图片读取崩溃） | 10 | 高，正式版与 preview 并行推进 |
| **CodeWhale** | v0.9.8（1 个，品牌升级） | 10（焦点：#5370 Web UI 全毁，P0） | 10+（全部合并） | 中高，转型期阵痛明显 |
| **Grok Build** | 无 | 0 | 0 | 无社区活动 |

> 注：Issues/PR 数为各仓库日报选取的 Top 热点数量，非当日总量。

## 3. 共同关注的功能方向

### 3.1 Windows / WSL 体验（波及面最广）
- **Codex**：5 个高热度 issue 指向桌面应用冻结、鼠标延迟、CPU 忙循环、taskkill 进程风暴（#20214、#34260、#28855、#38547、#38583）。
- **Claude Code**：Git Bash 下只读命令误报权限弹窗（#86619，v2.1.232 回归）。
- **Gemini CLI**：Windows 下 ripgrep spawn 失败（#25378）、WSL2 剪贴板粘贴支持（#27588）。
- **Pi**：系统性梳理 Windows 运行方式（#7547）、WSL 登录挂起（#6187）。
- **Kimi Code**：PowerShell 下命令生成 pass-1 阶段性能问题（#1136，已关闭）。

### 3.2 长会话稳定性与上下文管理
- **Codex**：上下文压缩丢失操作连续性（#29356），呼吁保留最后 5 个操作步骤。
- **Copilot CLI**：autopilot 长会话 OOM 崩溃（#4499）、子任务冻结（#4306）。
- **Qwen Code**：UI History 无界增长导致内存泄漏（#2128）。
- **OpenCode**：上下文缓存失效拖慢本地 LLM（#37489）。
- **Pi**：冷恢复重放已被移除的溢出回复（#7724）。

### 3.3 MCP 生态兼容性
- **Copilot CLI**：RFC 8414 issuer 严格校验导致 Atlassian/GitLab MCP 全部失联（#4480/#4490/#4439），1.0.79 引入、1.0.80 未修复；CI 中 MCP registry policy 403（#4346）。
- **Claude Code**：MCP 超时配置超过 60 秒不生效（#16837）。
- **OpenCode**：为内置/MCP 工具增加独立执行超时与中止恢复（PR #36869）。

### 3.4 子代理/多 Agent 编排可靠性
- **Gemini CLI**：子代理 MAX_TURNS 误报 GOAL 成功（#22323）、通用子代理永久挂起（#21409）、代理调用代理（PR #28738）。
- **Copilot CLI**：Subtask 调度随机卡死（#4306）。
- **Claude Code**：Subagent Forking 默认开启，继承完整对话历史。
- **OpenCode**：多子代理并发导致 TUI 渲染 97% CPU（#42657）。

### 3.5 配额透明度与成本焦虑
- **Claude Code**：图像处理失败烧掉 70% token 窗口（#60334，73 评论）、Max 20x 升级后周配额未同步（#79773）。
- **Codex**：周配额到期不重置是高频反馈。
- **OpenCode**：免费模型 429 限流未按日重置（#42215）。
- **Gemini CLI**：仅创建 gemini.md 即触发 usage limit（#1474）。

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 |
|---|---|---|---|
| **Claude Code** | 企业级 agent 协作平台 | 子代理 Forking、会话引用、Apps Gateway、GitLab MR 集成；功能推进最系统 | 企业团队、重度用户 |
| **OpenAI Codex** | 模型能力 + 桌面端体验 | Rust 重写 + Electron 桌面 + 沙箱安全策略；迭代速度最快但 Windows 稳定性承压 | 追求最新模型能力的开发者 |
| **Gemini CLI** | Agent 架构与研究属性最强 | 子代理树、MessageBus、技能系统、AST 感知代码理解、行为评估体系（76 个评测） | 关注 agent 自主性的技术深耕者 |
| **Copilot CLI** | GitHub 生态的延伸 | 深度绑定 GitHub 组织策略、MCP registry；autopilot 模式 | GitHub Enterprise 用户 |
| **Kimi Code** | 记忆系统为差异化卖点 | 跨会话持久上下文（#1283 39 评论为全仓库最高）；当前迭代节奏偏慢 | 中文开发者、Moonshot 生态用户 |
| **OpenCode** | 多模型聚合层 | 动态模型发现（PR #42660）、OpenCode Zen/Go 中继；模型兼容问题最多也最灵活 | 多模型切换、自定义 Provider 用户 |
| **Pi (pi-mono)** | TUI 体验至上 | 全屏转录、窗口化渲染、多 Provider（xAI/SiliconFlow/Kimi）；终端性能优化深入 | 终端重度用户、自托管偏好者 |
| **Qwen Code** | 服务端/Web 场景 | `serve` 模式、Web Shell、多工作区 daemon；前端体验迭代快 | Web 端用户、远程开发场景 |
| **CodeWhale** | 从 DeepSeek 专用转向通用 | 品牌升级、Auto-Review 双层模型守护、DS4 本地路由 | DeepSeek 生态迁移用户 |

## 5. 社区热度与成熟度

**第一梯队（极高活跃，日更版本）：**
- **OpenAI Codex**、**Claude Code**、**Qwen Code**。三者均保持每日发版。Codex 社区反馈量最大（单 issue 100 评论），但正承受"Windows 性能不升反降"的情绪反噬，已出现要求回滚的呼声；Claude Code 社区最"理性"，高赞需求集中在 CJK 输入法（147👍）、会话管理等体验完善，说明核心稳定性已获认可；Qwen Code 处于功能扩张期，Web Shell 迭代最快。

**第二梯队（高活跃，但稳定性问题突出）：**
- **Gemini CLI**、**OpenCode**、**Pi**。Gemini 以 P1 级 issue 密度著称（子代理误报、挂起、PTY 泄漏集中爆发），配套 PR 响应迅速，具备成体系的评测基础设施，处于"修补 + 研究并重"阶段；OpenCode 当日遭遇 ID 回绕事故，影响全量历史会话，但根因定位和修复速度快；Pi 的社区讨论质量较高（spindump 定位 CPU 根因），但多 provider 模型管理存在默认值滞后问题。

**第三梯队（迭代中/转型期）：**
- **Copilot CLI**：1.0 之后进入生态整合期，MCP OAuth 连续两个版本未修复暴露了回归测试盲区；**CodeWhale**：品牌升级与 Web UI P0 损坏并存，架构迁移期的典型状态。

**第四梯队（早期/停滞）：**
- **Kimi Code CLI**：无发版、无 PR、仅 4 条 issue 更新，但记忆系统需求（39 评论）说明用户期待值高，需警惕"呼声高、迭代慢"的落差；**Grok Build**：24 小时零活动，尚未形成有效社区。

## 6. 值得关注的趋势信号

**① Windows 桌面端已成为 AI CLI 工具的"照妖镜"。** Codex 被报空闲 CPU 忙循环、系统级鼠标延迟，Claude Code 出现 Git Bash 权限弹窗风暴，Pi 和 Gemini 各有 WSL 登录/剪贴板问题——Windows 性能回归几乎是每个快速迭代工具的必经之痛。**对开发者的启示**：评估工具时不要只看 macOS 演示，Windows 下的实际表现可能差一个量级；若主力环境是 Windows，建议滞后一个版本再升级。

**② "静默失败"比"明显报错"更危险。** Gemini 子代理误报 GOAL 成功、Copilot CLI 的 PR 评论静默失败却报成功、OpenCode 的 runLoop 永不退出——多个工具同时暴露了 agent 在异常路径下"假装成功"的问题。这提示 agent 工具的**可观测性（日志、状态回传、终止原因透传）**应作为选型硬指标。

**③ MCP 标准化进入"排雷期"。** Copilot CLI 因 RFC 8414 issuer 严格校验导致主流 MCP 服务器失联，Claude Code 的 MCP 超时上限 60 秒不生效，OpenCode 在补工具级超时——协议规范从宽松转向严格时，兼容性回归不可避免。**对开发者的启示**：依赖 MCP 生态前，先确认工具的 OAuth/发现机制与目标服务器的兼容状态，并关注回归测试覆盖范围。

**④ 上下文压缩是下一个"体验分水岭"。** Codex 压缩丢失操作连续性、OpenCode 压缩导致本地缓存失效、Claude Code 压缩窗口烧 token、Qwen 压缩后 UI 不刷新——压缩策略的优劣正成为长任务场景下工具留存率的关键变量。"压缩后保留最后 N 步操作"已成为社区共识性诉求。

**⑤ 成本与配额透明度正在上升为选型要素。** 多个工具的配额 bug（Max 20x 未生效、周配额不重置、免费额度不按日恢复）直接打击付费用户信任。**对开发者的启示**：将配额消耗的可观测性（缓存命中统计、token 明细）纳入工具评估，Pi 修复 Kimi 缓存 token 统计（PR #8119）这类细节值得关注。

**⑥ 多模型/多 Provider 成为默认架构，但"接入易、用好难"。** OpenCode 的动态模型发现、Pi 的 xAI/SiliconFlow 接入、Qwen 预设 Kimi/MiMo——工具都在向"聚合层"演进；但模型兼容性 bug（DeepSeek reasoning_content、MiniMax tool_call 泄漏、Claude Haiku 不支持 medium effort）频发，说明多模型路由的成熟度仍有很大提升空间。

**⑦ CI/CD 自动化与安全治理正在成为工具自身的"第二战场"。** Qwen Code 用自动 issue 上报 CI 失败并自我修复，CodeWhale 用 Auto-Review 双层守护模型拦截低质量审查，Copilot CLI 在迁移 pull_request_target 安全模型——工具团队开始用 dogfooding 方式验证自己的 agent 能力，这本身就是一个有说服力的产品信号。

---

*数据来源：各工具 GitHub 仓库公开社区动态（2026-08-15），完整 issue/PR 链接见各工具日报原文。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-08-15）

> 数据源：github.com/anthropics/skills（PR 按评论热度排序，Issue 含评论数）

---

## 1. 热门 Skills 排行

### ① #1298 fix(skill-creator)：run_eval.py 0% recall 修复
- **功能**：修复 `run_eval.py`/`run_loop.py`/`improve_description.py` 对所有技能描述一律报 `recall=0%` 的致命缺陷，并解决 Windows 流读取、触发检测与并行 worker 问题。
- **社区热点**：skill-creator 是社区依赖最重的元技能，但评估循环长期"对着噪声做优化"。该 PR 直接回应 issue #556（12 条评论、7 👍）与 #1169，是当前最活跃的修复主线。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/1298

### ② #514 Add document-typography skill
- **功能**：面向 AI 生成文档的排版质检技能，覆盖孤行（1–6 个词溢出到下一行）、寡行段落（节标题滞留页底）、编号错位等高频问题。
- **社区热点**："Claude 生成的所有文档都会受影响"——讨论集中在排版缺陷的普遍性与轻量修复的必要性。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/514

### ③ #538 fix(pdf)：SKILL.md 大小写引用修复
- **功能**：修正 `skills/pdf/SKILL.md` 中 8 处大小写不一致（`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`），解决 Linux/macOS 等大小写敏感文件系统上的失效引用。
- **社区热点**：折射出技能文档对跨平台可移植性的普遍需求。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/538

### ④ #486 Add ODT skill
- **功能**：新增 OpenDocument（.odt/.ods）完整支持——创建、模板填充、读取及 ODT→HTML 转换，补全文档格式矩阵。
- **社区热点**：开源/ISO 标准格式（LibreOffice）生产力场景呼声较高。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/486

### ⑤ #210 Improve frontend-design skill
- **功能**：重写 frontend-design 技能，确保每条指令可在单次会话内被 Claude 实际执行，提升指导的清晰度、可操作性与内部一致性。
- **社区热点**：讨论集中在"技能应像操作手册而非教程文档"——与 issue #202（skill-creator 应更新为最佳实践）同气连枝。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/210

### ⑥ #83 skill-quality-analyzer + skill-security-analyzer
- **功能**：新增两个元技能——质量分析器（结构文档 20%、示例、资源等五维评估）与安全分析器，面向 marketplace 示例集合。
- **社区热点**：呼应社区对"技能本身的质检与安全审查"的焦虑，与 issue #492 安全议题形成共振。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/83

### ⑦ #1367 feat：self-audit 技能（v1.3.0）
- **功能**：交付前审计——先做机械式文件存在性验证，再按损害严重度顺序执行四维推理审计，宣称通用（任意项目/技术栈/模型）。
- **社区热点**：与 #1385（推理质量门流水线提案）配套，代表社区对 AI 输出可靠性的高级诉求。
- **状态**：Open
- 链接：https://github.com/anthropics/skills/pull/1367

---

## 2. 社区需求趋势

| 趋势方向 | 代表 Issue | 热度信号 | 说明 |
|---|---|---|---|
| **安全与信任边界** | #492 社区技能滥用 anthropic/ 命名空间 | 43 评论、2 👍，持续 4 个月 | 社区技能冒充官方技能，导致用户误授权限——**最尖锐的安全质疑**；关联 #1175（SharePoint 权限/上下文窗口担忧） |
| **组织级技能共享** | #228 在 Claude.ai 中启用组织级技能共享 | 16 评论、8 👍（👍 最高） | 当前只能手动下载 `.skill` 文件经 Slack 传输再逐个上传，流程笨重，企业用户诉求强烈 |
| **skill-creator 可靠性** | #556 0% 触发率、#1169 recall=0%、#202 应改为最佳实践 | 12 评论、7 👍；已衍生 3 个修复 PR | 评估循环失效让"优化描述"变成空转，**工具链本身的工程质量**是头号痛点 |
| **上下文窗口治理** | #1487 claude-api 单次注入 ~156k tokens 撑爆上下文 | 4 评论 | 技能体积失控问题浮出水面；配套需求 #1329 compact-memory（符号化紧凑记忆） |
| **生态互操作** | #16 将 Skills 暴露为 MCP、#29 AWS Bedrock 使用 | 各 4 评论 | 社区希望 Skills 标准化为 MCP 式 API，并能在 Bedrock 等平台运行 |
| **技能去重与规范** | #189 document-skills 与 example-skills 内容重复 | 6 评论、9 👍 | 两个插件安装后产生重复技能，浪费上下文窗口 |

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、尚未合并，功能完整度高，近期落地概率较大：

| PR | Skill | 看点 | 链接 |
|---|---|---|---|
| #514 | document-typography | 解决 AI 生成文档的普遍排版缺陷，覆盖面广 | https://github.com/anthropics/skills/pull/514 |
| #486 | ODT（OpenDocument） | 补全文档格式支持，开源生态刚需 | https://github.com/anthropics/skills/pull/486 |
| #723 | testing-patterns | 覆盖 Testing Trophy 模型、单元/组件/E2E 测试全栈 | https://github.com/anthropics/skills/pull/723 |
| #568 | ServiceNow 平台 | 企业级 ITSM/ITOM/SecOps/ITAM 等 8 大域，更新至 2026-08-12，活跃维护 | https://github.com/anthropics/skills/pull/568 |
| #525 | pyxel 复古游戏开发 | 基于 pyxel-mcp 的"写→运行→截图→迭代"工作流 | https://github.com/anthropics/skills/pull/525 |
| #181 | SAP-RPT-1-OSS 预测 | 面向 SAP 业务数据的表格基础模型，企业数据分析场景 | https://github.com/anthropics/skills/pull/181 |
| #83 | 质量/安全双分析器 | 社区对技能治理的元需求，承接 #492 安全议题 | https://github.com/anthropics/skills/pull/83 |
| #1479 | plan-file-hygiene | 为规划产物定义生命周期，治理"规划文件堆积"问题 | https://github.com/anthropics/skills/pull/1479 |

---

## 4. Skills 生态洞察

> **社区最集中的诉求是"让技能体系本身变得可信、可靠、可控"**——一方面要求 skill-creator 等元工具链修复工程质量问题（0% recall、Windows 兼容、上下文失控），另一方面强烈呼吁解决社区技能的安全信任边界（命名空间冒充）与分发机制（组织级共享、MCP 化、多平台支持）；与此同时，文档类技能（排版、PDF、ODT、DOCX）是内容层面最活跃的增量方向。

---

# Claude Code 社区动态日报（2026-08-15）

## 今日速览

- 连续发布两个小版本：v2.1.233 新增 GitLab MR 支持，v2.1.232 默认开启 Subagent Forking 与后台 Agent 模式。
- 社区呼声最高的是 **CJK 输入法下 Enter 键误发送消息**（#2054，147👍），以及 **API 图像处理失败导致的 token 浪费**（#60334，73 评论）。
- 新版本引入的 **Windows Git Bash 静态分析误报**（#86619）成为今日最受关注的新增回归问题。

## 版本发布

### v2.1.233
- **GitLab MR 支持**：`--worktree` 标志和 `claude agents` 视图新增 GitLab Merge Request URL 支持，MR 在界面中显示为 `!N`。
- **身份转发**：Anthropic 上游新增 `forward_user_identity` apps gateway 设置（opt-in），可将登录用户身份以 header 形式发送给代理后面的服务。

### v2.1.232
- **Subagent Forking 默认开启**：`subagent_type: "fork"` 的子代理现在默认继承完整对话历史和 prompt cache。
- **后台 Agent**：交互会话中非 teammate 的 agent 默认在后台运行。
- **会话提及**：在提示符中直接输入 `@` 可按名称引用另一个 Claude 会话。

## 社区热点 Issues

### 1. #60334 — API 图像处理失败导致大量 token 浪费（CLOSED，73 评论，19👍）
**链接**：https://github.com/anthropics/claude-code/issues/60334

> 用户反馈大量"图像无法处理被移除"的 API 错误，烧掉了 5 小时窗口约 70% 的量。虽然已关闭，但 73 条评论表明该问题在会话窗口损耗方面影响面很大，社区讨论仍在持续。

### 2. #2054 — Enter 键发送消息 vs 换行：CJK 输入法用户的痛点（OPEN，28 评论，147👍）
**链接**：https://github.com/anthropics/claude-code/issues/2054

> 147 个 👍 是当前 Issues 中最高赞的需求。中文、日文等 CJK 输入法常用 Enter 确认候选词，导致消息被误发送。社区希望新增选项，让 Enter 插入换行而不是发送。

### 3. #30869 — 桌面应用支持取消归档会话（CLOSED，29 评论，57👍）
**链接**：https://github.com/anthropics/claude-code/issues/30869

> 57👍 的高频功能请求：桌面版 Claude Code 目前只能归档、不能取消归档会话。该请求已关闭，但社区对会话管理完整性的需求仍然明确。

### 4. #27780 — Analytics Admin API 不返回订阅/OAuth 用户（OPEN，26 评论，23👍）
**链接**：https://github.com/anthropics/claude-code/issues/27780

> 企业管理场景的痛点：Analytics Admin API 无法获取订阅或 OAuth 登录用户的数据，影响用量统计和报表，企业级用户关注度高。

### 5. #16837 — MCP 超时配置超过 60 秒不生效（OPEN，15 评论，16👍）
**链接**：https://github.com/anthropics/claude-code/issues/16837

> 设置 `MCP_TIMEOUT` 超过 60 秒后实际不生效。MCP 生态扩大后，长时间运行的工具调用场景越来越多，该限制影响较大。

### 6. #86619 — Windows Git Bash 只读 cd 复合命令误报导致权限弹窗泛滥（OPEN，8 评论，8👍）
**链接**：https://github.com/anthropics/claude-code/issues/86619

> 自 v2.1.232 自动模式上线后出现的新回归：Git Bash 下静态分析对 `cd ... && ...` 只读命令误报，导致持续且无法取消的权限确认弹窗。已在两台独立机器上复现，Windows 用户受影响较广。

### 7. #82092 — Apps Gateway OTLP 端点缺少 `otlpHeaders`，遥测数据被拒（OPEN，13 评论，5👍）
**链接**：https://github.com/anthropics/claude-code/issues/82092

> Claude Desktop 的 OTLP 遥测 flush 被自己的端点拒绝，错误为 `missing_token`。代理部署场景的可观测性链路存在配置缺口。

### 8. #79773 — Max 20x 升级后 weekly limits 未同步（OPEN，7 评论）
**链接**：https://github.com/anthropics/claude-code/issues/79773

> 用户升级到 Max 20x 后，每周配额仍按 5x 速率消耗。涉及计费与配额的一致性问题，引发付费用户对额度准确性的担忧。

### 9. #75863 — VS Code 扩展请求添加"Background Tasks"面板（OPEN，6 评论，8👍）
**链接**：https://github.com/anthropics/claude-code/issues/75863

> 桌面版已有后台任务管理，VS Code 扩展希望获得同等能力的独立面板，IDE 场景下对多任务并行的需求持续上升。

### 10. #72707 — VS Code 长用户提示无法折叠（OPEN，2 评论，11👍）
**链接**：https://github.com/anthropics/claude-code/issues/72707

> 长 prompt 的展开/折叠按钮无响应，导致消息永久占用大量 UI 空间。11👍 说明该问题在重度使用者中有一定普遍性。

## 重要 PR 进展

> 当前公开 PR 数量较少（4 条），均在开发或讨论阶段。

### 1. #86746 — 保留 Python 探针错误诊断信息
**链接**：https://github.com/anthropics/claude-code/pull/86746

> 修复 #86709：`sg-python.sh` 不再将探针 stderr 重定向到 `/dev/null`。当 `python3`、`python`、`py -3` 全部失败时，用户能看到具体的诊断信息，便于排查环境问题。

### 2. #86626 — 为 CLI 添加 bash/zsh/fish 补全脚本
**链接**：https://github.com/anthropics/claude-code/pull/86626

> 新增 `completions/` 目录，提供 bash（兼容 macOS 自带 3.2）、zsh、fish 三种 shell 的 tab 补全，并附带安装说明。补全脚本与已安装 CLI 保持同步。

### 3. #83890 — 新增 pylint CI 配置
**链接**：https://github.com/anthropics/claude-code/pull/83890

> 添加 GitHub Actions 的 `pylint.yml`，推动 Python 代码质量检查自动化，进入 CI 流程。

### 4. #41611 — 补充缺失的源代码引用
**链接**：https://github.com/anthropics/claude-code/pull/41611

> 为 Claude Code 补充缺失的 source 引用，属仓库维护性变更。该 PR 从 3 月底持续到 8 月，关注度较低。

## 功能需求趋势

- **CJK 输入友好性**：#2054 的 147👍 是最大单点需求，输入法用户对消息误发送问题有强烈的解决意愿。
- **会话管理增强**：#30869 要求取消归档会话，配合 v2.1.232 的 `@` 会话引用，社区希望获得更完整的会话生命周期管理能力。
- **IDE 体验补齐**：#75863（Background Tasks 面板）和 #72707（长消息可折叠）表明 VS Code 扩展正快速成为与桌面版同等重要的使用场景。
- **可观测性与 Admin API**：#27780（订阅用户数据缺失）和 #82092（OTLP headers 缺失）指向企业用户在遥测与管理接口上的缺口。
- **配置可调性**：#16837 的超时上限问题，反映 MCP 工具链对长耗时操作配置灵活性的要求。

## 开发者关注点

- **成本与配额焦虑**：#60334 的图像错误烧掉 70% 窗口、#79773 的 Max 20x 配额未生效，说明用户对 token 消耗和套餐额度极其敏感。
- **静默失败问题**：#84474 中 workflow-backed code review 的"发 PR 评论"步骤静默失败却报成功，这类假成功比明显报错更危险。
- **平台兼容性回归**：#86619 在 Windows Git Bash 上的误报是 v2.1.232 引入的确定性回归，Windows 用户在等待 hotfix。
- **安全策略误报**：sworrl 提交的十余个关于消费级无人机固件逆向/下载被安全过滤器误拦截的 issue（#71985~#71979 系列，多为 closed/duplicate），表明安全策略的误报仍会打断合法开发任务。虽然多数已关闭，但这类"session-halted"类问题一旦出现就很影响开发流。
- **图像处理链路可靠性**：#60334 揭示的图像处理失败不仅影响对话可用性，还直接造成计费资源浪费，是该版本区间内讨论度最高的 bug 类话题。

---
*数据来源：github.com/anthropics/claude-code（更新于 2026-08-14）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-15

## 今日速览

过去 24 小时内，OpenAI Codex 仓库持续高频迭代：连续推送 5 个 rust-v0.148.0-alpha 版本（alpha.14~alpha.18），并有 20+ 个由 `copyberry[bot]` 提交的 PR 快速合并。社区侧最热议题集中在 **Windows 版 Codex 桌面应用的系统级卡顿、鼠标延迟及 CPU 占用异常**，多个新 Issue 指向最新版本（26.810.x）引入的性能回归，开发者要求回滚的呼声渐高。此外，TUI 启动流程、沙箱安全策略与 gRPC 通知机制也在密集优化中。

---

## 版本发布

过去 24 小时共发布 5 个新版本，均为 Rust 实现的连续 alpha 迭代：

| 版本 | 链接 |
|---|---|
| rust-v0.148.0-alpha.18 | https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.18 |
| rust-v0.148.0-alpha.17 | https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.17 |
| rust-v0.148.0-alpha.16 | https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.16 |
| rust-v0.148.0-alpha.15 | https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.15 |
| rust-v0.148.0-alpha.14 | https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14 |

本次 Release 页面未附带详细更新说明，但从同期合并的 PR 来看，Rust 版本仍在围绕 TUI 启动、沙箱策略、gRPC 协议与 MCP 发现机制进行快速迭代。

---

## 社区热点 Issues

以下为过去 24 小时内讨论最激烈或影响面最大的 10 个 Issue：

### 1. Windows 11 上 Codex App 频繁冻结/卡顿
**Issue #20214** | 评论: 100 | 👍: 84 | 状态: OPEN

> 这是目前仓库中最受关注的问题，Windows 11 Pro 用户反馈尽管系统资源充足（Ryzen 5 5600 / 32GB RAM），Codex App 仍频繁出现冻结与卡顿。目前已积累 100 条评论，社区讨论活跃。

🔗 https://github.com/openai/codex/issues/20214

---

### 2. Windows 桌面无界 taskkill.exe/conhost.exe 清理风暴耗尽 WMI
**Issue #34260** | 评论: 35 | 👍: 11 | 状态: OPEN

> 桌面版在特定条件下进入无限进程清理循环，数百个 `taskkill.exe` 常驻内存并反复查询 `Win32_Process`，最终将 WMI provider 配额耗尽，拖垮整个系统。

🔗 https://github.com/openai/codex/issues/34260

---

### 3. 上下文压缩在长任务中丢失操作连续性
**Issue #29356** | 评论: 21 | 👍: 1 | 状态: OPEN

> 用户指出自动上下文压缩会丢失关键的操作连续信息，建议保留最后 5 个操作步骤的逐字记录。这一需求在长任务场景下有很强的代表性。

🔗 https://github.com/openai/codex/issues/29356

---

### 4. Codex Desktop 引起 Windows 系统级输入延迟
**Issue #28855** | 评论: 16 | 👍: 20 | 状态: OPEN

> 在未开启插件、日志干净的情况下，Deskstop 仍导致鼠标移动和打字出现明显的全系统输入延迟，尤其在应用启动/重新打开后的高峰期。

🔗 https://github.com/openai/codex/issues/28855

---

### 5. Android 远程连接 Windows Codex 卡在 "Waiting for desktop…"
**Issue #22733** | 评论: 16 | 👍: 19 | 状态: OPEN

> 从 Android 版 ChatGPT 发起远程 Codex 会话时始终卡在 "Waiting for desktop…"，Pro 用户无法跨端使用，影响远程协作场景。

🔗 https://github.com/openai/codex/issues/22733

---

### 6. Windows 沙箱无法启动 MSIX (Store) 版 PowerShell
**Issue #35871** | 评论: 14 | 👍: 3 | 状态: OPEN

> 当沙箱解析到的 shell 是 Microsoft Store 安装的 pwsh（MSIX 打包）时，`CreateProcessAsUserW` 返回错误 5（Access denied），Windows 拒绝在受限令牌下启动打包应用。这对使用 Store 版 PowerShell 的开发者影响直接。

🔗 https://github.com/openai/codex/issues/35871

---

### 7. Windows 版空闲状态下主进程 CPU 忙循环
**Issue #38547** | 评论: 11 | 👍: 5 | 状态: OPEN

> 升级到 26.810.4967.0 后，完全空闲时 Electron 主进程进入持续的 CPU 忙循环，无需打开 Browse 功能即可触发。该问题被标记为 "Papercuts 2026" 类目，属于典型发布回归。

🔗 https://github.com/openai/codex/issues/38547

---

### 8. [Windows 11] ChatGPT/Codex 引起系统级鼠标延迟与 ~10% CPU 占用
**Issue #38583** | 评论: 10 | 👍: 6 | 状态: OPEN

> 用户升级到 26.813.12317 后，即使应用空闲也持续产生系统级鼠标延迟和约 10% 的 CPU 占用，属于当天新报的回归问题。

🔗 https://github.com/openai/codex/issues/38583

---

### 9. Codex CLI 0.146.0 compact 接口返回 404
**Issue #38323** | 评论: 5 | 👍: 0 | 状态: OPEN

> CLI 调用 `POST /backend-api/codex/responses/compact` 返回 `{"detail":"Not Found"}`。涉及上下文压缩功能的核心链路，Pro 用户使用 GPT-5.6-sol 时触发，影响长会话续写体验。

🔗 https://github.com/openai/codex/issues/38323

---

### 10. Mac 版最新版崩溃频繁、CPU 占用高，社区呼吁回滚
**Issue #38637** | 评论: 4 | 👍: 0 | 状态: OPEN

> Mac arm64 上 26.810.41047 版本仅运行几分钟即崩溃，长对话几乎无法打开，CPU 占用异常。该 Issue 标题直接请求 "Please revert"，反映了社区对近期版本稳定性的不满。

🔗 https://github.com/openai/codex/issues/38637

---

## 重要 PR 进展

以下为过去 24 小时合并的重要 PR（评论数未披露，均为格式化机器人提交）：

### 1. 解析 Code Mode 类型中的本地 JSON Schema 引用
**PR #38664** — CLOSED

> 修复 Code Mode 将文档内的局部 `$ref` 渲染为 `unknown` 的问题，使生成的 TypeScript 声明能够正确展示引用类型。

🔗 https://github.com/openai/codex/pull/38664

---

### 2. Windows 沙箱强制执行 managed deny-read 规则
**PR #38660** — CLOSED

> 确保 Windows 沙箱的受管文件系统 deny-read 规则在每个执行路径和 setup 刷新后都生效，不受支持的安全策略应当 fail-closed 而非静默放行。

🔗 https://github.com/openai/codex/pull/38660

---

### 3. 权限配置文件快照移入协议层
**PR #38651** — CLOSED

> 将 `PermissionProfileSnapshot` 定义为协议模型，并在 `core-api` 中重新导出，使快照直接存储于核心权限状态，同时保留对具体 `PermissionProfile` 的约束。

🔗 https://github.com/openai/codex/pull/38651

---

### 4. gRPC 订阅过滤器规范化默认命名空间
**PR #38650** — CLOSED

> 工具调用与订阅过滤器在匹配前统一规范化，缺失/空命名空间按 `functions` 别名处理，同时保留调用本身的命名空间上报，修复过滤一致性。

🔗 https://github.com/openai/codex/pull/38650

---

### 5. TUI 启动时复用账户响应，减少重复请求
**PR #38649** — CLOSED

> TUI 先读账户判断登录状态，bootstrap 阶段再次读取同一账户造成冗余，该 PR 复用首次响应，避免启动路径上的第二次账号查询。

🔗 https://github.com/openai/codex/pull/38649

---

### 6. 新增跳过项目配置的加载覆盖项
**PR #38647** — CLOSED

> 增加 `LoaderOverrides::ignore_project_config`，可完全跳过项目根目录发现及所有项目配置层，同时保留会话覆盖与云配置的生效能力。

🔗 https://github.com/openai/codex/pull/38647

---

### 7. gRPC code-mode 通知不再截断
**PR #38645** — CLOSED

> 移除 gRPC code-mode 通知文本的 1,024 字节截断限制，超大多字节通知可完整传递至 session delegate，并已更新集成测试。

🔗 https://github.com/openai/codex/pull/38645

---

### 8. Codex 家目录缺少认证状态时显示 onboarding 引导
**PR #38644** — CLOSED

> 修复了 "存在历史/日志/会话文件 ≠ 已完成认证" 的判断逻辑，在默认账户无法认证时优先展示 onboarding 流程而非直接进入 composer。

🔗 https://github.com/openai/codex/pull/38644

---

### 9. 启动 composer 延迟至首次登录 onboarding 之后
**PR #38643** — CLOSED

> 在全新安装的默认配置下，临时 composer 可能在首次登录 onboarding 接管终端前出现。该 PR 通过保守的 "pristine 安装" 检测修复这一顺序问题。

🔗 https://github.com/openai/codex/pull/38643

---

### 10. TUI 启动期间保持 composer 可编辑
**PR #38642** — CLOSED

> 配置与 app-server 初始化可能耗时较长，此前用户只能等待。本 PR 在启动期间先渲染一个临时 composer，保留输入文本、光标位置与状态，主 TUI 就绪后无缝衔接。

🔗 https://github.com/openai/codex/pull/38642

---

## 功能需求趋势

综合过去 24 小时的 Issue 数据，社区关注的功能方向呈现以下趋势：

1. **Windows 平台稳定性与性能优化（高频）**
   超过一半的高热度 Issue 与 Windows 下的卡顿、鼠标延迟、CPU 占用、进程风暴相关，Windows 已被社区视为当前最影响体验的平台。

2. **上下文压缩的可控性与连续性**
   多个 Issue 呼吁压缩后保留最后若干操作步骤、修复压缩导致的连接中断，长任务用户对上下文丢失问题非常敏感。

3. **沙箱兼容性扩展**
   除了 Linux 容器之外，Windows 沙箱对 MSIX 打包应用的支持成为新关注点（如 Store 版 PowerShell、Computer Use 插件初始化失败）。

4. **远程/多端协作能力**
   Android 远程连接、跨设备会话续接、ChatGPT 扩展与桌面端的协同仍是高频话题。

5. **IDE/编辑器集成增强**
   包括 VS Code 扩展会话所有权管理、Chrome 侧边栏选择本地项目、IDE 侧边栏 Git 轮询造成的句柄泄漏等。

6. **模型能力扩展**
   Bedrock 上 GPT-5.6 的 Ultra reasoning 不可用、多模型支持（Sol/Terra）等问题表明开发者在追求更强的推理配置灵活性。

---

## 开发者关注点

**痛点/高频需求汇总：**

- **系统级性能干扰是最集中的抱怨点。** 多个 Issue 提到 Codex 桌面应用空闲时依然占用 CPU、造成鼠标/键盘输入延迟，甚至影响其他程序的使用——这比 "Codex 自己慢" 更让开发者难以接受。
- **"最新版不升反降" 的情绪上升。** 26.810.x 系列在 Windows 和 macOS 双双被报告性能回归，已有开发者明确要求回滚或暂停自动更新。
- **长任务支撑不足。** 上下文压缩断开、丢失操作步骤、commit message 超时（30 秒硬编码）等问题，使得大型重构或长尾任务在 Codex 中很难稳定跑完。
- **沙箱成功运行的门槛偏高。** 普通用户遇到 Store 版 pwsh、Computer Use 的 EPERM 等错误时没有可行的绕路方案，需要更友好的错误提示或自动降级策略。
- **用量/计费系统存在不可忽视的缺陷。** 周配额到期不重置是高频反馈，影响付费用户的信任度。

---

*本日报基于 github.com/openai/codex 公开数据整理，数据统计截至 2026-08-15。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-15

## 今日速览

昨日发布 v0.56.0-nightly 版本，重点修复了容量错误下的静默重试机制与 e2e 测试稳定性。Issue 侧，子代理在 MAX_TURNS 后误报 GOAL 成功的问题（#22323）获得 12 条评论，且配套修复 PR #28815 已提交，成为社区关注焦点；PR 侧，多由 SSR Agent 批量提交的修复集中解决了 PTY 泄漏、TUI 挂起、MessageBus 静默失败等稳定性顽疾。

## 版本发布

**v0.56.0-nightly.20260814.gc0d192452**
- `test(e2e)`：在慢速运行器上稳定 file-system-interactive 测试（PR #28793，by @DavidAPierce）
- `fix(core)`：实现上下文感知的静默重试与容量错误可用性 TTL（#28761，by @DavidAPierce）

## 社区热点 Issues（Top 10）

1. **Subagent recovery 误报 GOAL 成功**（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）· P1 · 12 评论 · 👍 2
   子代理因 MAX_TURNS 中断后，恢复流程将其误报为 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际中断。社区认为这是 agent 可靠性关键缺陷，已有对应修复 PR。

2. **rateLimitExceeded 429 无正当理由**（[#1473](https://github.com/google-gemini/gemini-cli/issues/1473)）· P2 · 10 评论
   用户调试完 Google 侧问题后仍频繁收到 429 错误。虽已关闭但仍在更新，说明限流判定逻辑社区有持续疑虑。

3. **仅创建 gemini.md 文件即触发使用限制**（[#1474](https://github.com/google-gemini/gemini-cli/issues/1474)）· P2 · 9 评论 · 👍 4
   极简操作也触发 usage limit，引发对免费/低用量账户限额计算方式的讨论。

4. **通用子代理（generalist agent）永久挂起**（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）· P1 · 8 评论 · 👍 8
   简单操作（如创建文件夹）也会导致挂起至 1 小时。用户发现指示模型不使用子代理可绕过，定位指向代理调度逻辑。

5. **健壮的组件级评估（EPIC）**（[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)）· P1 · 7 评论
   承接 #15300，已积累 76 个行为评估测试并覆盖 6 个 Gemini 模型，属基础设施建设的长期主线。

6. **AST 感知文件读/搜索/映射的价值评估**（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)）· P2 · 7 评论 · 👍 1
   EPIC 型 issue，探索通过 AST 感知工具减少 token 噪声、精确定位方法边界、提升代码库导航效率。

7. **Gemini 不主动使用 skills 与子代理**（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）· P2 · 6 评论
   用户反馈模型即使配置了 gradle/git 等自定义技能，也不会自主调用，只能显式指令触发，影响自动化体验。

8. **Auto Memory 对低信号会话无限重试**（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）· P2 · 5 评论
   后台提取代理判定低信号会话后不读取也不标记已处理，导致同一会话反复出现，浪费资源。

9. **Shell 命令执行完成后卡在 "Waiting input"**（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）· P1 · 4 评论 · 👍 3
   极简 CLI 命令执行完毕后终端仍显示活动状态并挂起，复现率高，直接影响日常使用。

10. **Windows/Linux 环境问题集中**（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）· P1 · 4 评论 · 👍 1
    浏览器子代理在 Wayland 下失败；另有 #22232 讨论浏览器代理 profile 锁导致的 fail-fast 策略过激。

## 重要 PR 进展（Top 10）

1. **修复子代理恢复时丢失原始终止原因**（[#28815](https://github.com/google-gemini/gemini-cli/pull/28815)）· 已关闭
   直击今日最热 Issue #22323：`LocalAgentExecutor` 在最后宽限回合调用 `complete_task` 时不再覆盖 MAX_TURNS/TIMEOUT 等真实终止原因。

2. **为 TUI 添加执行超时，防止无限挂起**（[#28812](https://github.com/google-gemini/gemini-cli/pull/28812)）· P1 · 已关闭
   修复 #21477：裸 Linux 终端下 `getProcessInfo()` 依赖 ps 命令，超时机制避免 "Initializing..." 永久卡死。

3. **修复 MessageBus.request 静默挂起**（[#28816](https://github.com/google-gemini/gemini-cli/pull/28816)）· 已关闭
   修复 #22588：`this.publish()` 浮动的 Promise 失败时无人处理，导致 60 秒静默等待；补上失败注册与快速失败。

4. **在 hook 状态中保留执行中的子代理工具调用**（[#28817](https://github.com/google-gemini/gemini-cli/pull/28817)）· 已关闭
   修复 #22589：非根调度器（子代理）首次出现的工具调用（如后台任务）不再被过滤丢弃。

5. **修复 ShellExecutionService PTY 文件描述符泄漏**（[#20916](https://github.com/google-gemini/gemini-cli/pull/20916)）· P1 · 已关闭
   修复 #15945：PTY master fd 在进程退出/手动 kill 后未正确关闭，长期会话会导致 macOS PTY 耗尽（511 上限）。

6. **同步删除活动 PTY 条目，修复内存泄漏**（[#27154](https://github.com/google-gemini/gemini-cli/pull/27154)）· P2 · 已关闭
   修复 ShellExecutionService 中 `activePtys.delete()` 被包在 Promise.then 中不执行的问题，防止 PTY 条目与无头终端永不被回收。

7. **允许代理调用代理**（[#28738](https://github.com/google-gemini/gemini-cli/pull/28738)）· P2 · 开放中
   修复 #22092，通过 `tools:` frontmatter 允许子代理递归委派或其他子代理，为多层代理协作铺路。

8. **修复 Windows 上 ripgrep spawn EFTYPE 错误**（[#25378](https://github.com/google-gemini/gemini-cli/pull/25378)）· P1 · 开放中
   修复 #22784：Windows 下 `grep_search` 因二进制架构不匹配（ARM/x64）或损坏导致 spawn 失败。

9. **支持 WSL2 剪贴板图片粘贴**（[#27588](https://github.com/google-gemini/gemini-cli/pull/27588)）· P2 · 开放中
   修复 #22274：检测 WSL 环境后通过 PowerShell interop 读取 Windows 剪贴板，并复用 Windows 原生路径的图片保存助手。

10. **新增 `--list-all-sessions` 选项**（[#28596](https://github.com/google-gemini/gemini-cli/pull/28596)）· P3 · 已关闭
    按工作区分组列出全部已注册会话，解决用户跨目录创建会话后遗忘路径的问题。

## 功能需求趋势

- **代理韧性（Agent Resilience）**：Issue #22323、#21409、#22093、#22232、#26522 等显示社区对子代理误报、挂起、越权、锁恢复的高关注；PR #28815、#28816、#28738 均指向提升代理执行的可控性与可观测性。
- **AST 感知代码理解**：EPIC #22745 与 #22746 持续推动 AST 感知读取/搜索/代码库映射，目标为降低 token 开销、精准读取方法边界、改进 `codebase_investigator`。
- **后台内存系统治理**：SandyTao520 连续提交 #26522/#26523/#26525/#26516，涉及低信号会话无限重试、无效 patch 隔离、确定性脱敏与日志收敛。
- **跨平台体验补齐**：Windows ripgrep 修复（#25378）、WSL2 剪贴板（#27588）、Wayland 浏览器代理（#21983）显示非 macOS/Linux 桌面用户的诉求在上升。
- **评测体系工程化**：#24353、#28818（steering eval 改为 ALWAYS_PASSES）反映维护方在硬化回归防线，行为评估从“偶尔通过”走向“必须通过”。

## 开发者关注点

- **高优先级 P1 稳定性问题密集**：代理挂起（#21409、#25166）、浏览器失败（#21983）、崩溃（#22186）、误报（#22323）构成开发者日常使用的首要痛点。
- **权限与安全边界**：#22093（v0.33.0 后子代理无视配置自动运行）、#22672（模型应避免 `git reset`/`--force` 等破坏性操作）、#26525（Auto Memory 传输前脱敏）表明用户对“模型越权”与“敏感数据流出”的担忧正上升。
- **PTY/终端资源泄漏**：#20916、#27154、#24935（外部编辑器退出后终端渲染损坏）均指向 TUI 会话生命周期管理不完善，长时运行后资源耗尽。
- **工具调用策略过载**：#24246 反映工具数量超过 128/400 时直接 400 错误，社区期望按需动态裁剪工具集，而非全量注入。
- **低信号噪音问题**：#23571（模型在随机目录创建临时脚本）、#21968（技能/子代理闲置不用）体现模型工具选择策略仍有较大优化空间。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-15

## 今日速览

- 昨日发布 v1.0.80 及补丁版 v1.0.80-1，主要涉及模型配置更新，但具体变更未在 Release Notes 中详细披露。
- MCP OAuth 兼容性连续两天成为热点：Atlassian/GitLab MCP 服务器在 1.0.79/1.0.80 中均出现 RFC 8414 issuer 校验失败（#4480、#4439、#4490），用户反馈 1.0.78 仍正常。
- 稳定性问题集中浮现：autopilot 长会话 OOM 崩溃（#4499）、子任务冻结（#4306）、/restart 会话冲突（#4493）等新老 issue 持续更新。

## 版本发布

### v1.0.80（2026-08-14）
- 更新模型配置（Update model configurations）。具体变更内容未在 Release Notes 中详细说明。

### v1.0.80-1（2026-08-14）
- 修复和变更（Fixes and changes）。作为 1.0.80 的快速补丁发布。

**社区反馈**：已有用户确认 Atlassian MCP OAuth 回归在 1.0.80 中仍然存在（#4490），建议关注后续补丁。

---

## 社区热点 Issues

### 1. Reasoning effort 'medium' 不支持 claude-haiku-4.5
[#4345](https://github.com/github/copilot-cli/issues/4345) | 开放 | 评论：6 | 👍：4

当 `copilot_cli_opus_medium_effort_default` 和 `copilot_cli_gpt_5_4_mini_for_explore` 两个 feature flag 同时启用时，子代理执行期间反复抛出 `Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'`。该问题直接阻断正常执行，社区讨论集中在 feature flag 组合与模型推理配置的兼容性校验缺失。

### 2. 企业组织已启用的模型缺失（Claude Sonnet 5/Opus 5 和 Kimi K3）
[#4390](https://github.com/github/copilot-cli/issues/4390) | 开放 | 评论：6 | 👍：4

Copilot Business 组织显式启用的模型在 CLI 模型目录中不可见，选择 `claude-sonnet-5` 时报告 "disabled by your org"。所有 Anthropic 模型均不可用，影响企业用户正常使用。社区分析指向模型目录同步逻辑与组织级策略配置之间的脱节。

### 3. Atlassian MCP OAuth 失败，1.0.79 回归、1.0.71 正常
[#4480](https://github.com/github/copilot-cli/issues/4480) | 已关闭 | 评论：4 | 👍：6

连接 Atlassian 远程 MCP 服务器（`https://mcp.atlassian.com/v1/mcp`）时，OAuth 发现过程报 `Incompatible authorization server: advertised issuer does not match discovery URL（RFC 8414 §3.3）`。该 issue 已关闭，但 **1.0.80 仍未修复**（见 #4490），高赞反映受影响用户基数较大。

### 4. 个人企业账号下所有 Claude 模型被禁用
[#4422](https://github.com/github/copilot-cli/issues/4422) | 开放 | 评论：3 | 👍：3

用户个人 Enterprise 账号在 GitHub Copilot 设置中 Claude 模型显示启用，但 CLI 中所有 Claude 模型（sonnet 5、4.8 等）均不可用，回滚版本后问题依旧。今日新增评论表示问题持续存在，疑似服务端策略下发异常。

### 5. Copilot CLI 1.0.79 拒绝 GitLab MCP OAuth 元数据（RFC 8414 issuer 不匹配）
[#4439](https://github.com/github/copilot-cli/issues/4439) | 开放 | 评论：3 | 👍：2

与 #4480 同源问题，影响 GitLab Self-Managed MCP 服务器的 OAuth 2.0 动态客户端注册流程。社区反应表明该回归波及多个主流 MCP 生态服务，而非 Atlassian 单家兼容性问题。

### 6. Subtasks 冻结并停止响应
[#4306](https://github.com/github/copilot-cli/issues/4306) | 开放 | 评论：3 | 👍：2

Autopilot 模式下使用 `/fleet use` 循环调度多个 agent/skill 时，子任务会随机卡死，session 无响应。已持续更新两周，社区建议优先排查 agent 循环调度与上下文传递的并发问题。

### 7. 支持 protobuf OTLP 导出（OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf）
[#2934](https://github.com/github/copilot-cli/issues/2934) | 已关闭 | 评论：2 | 👍：6

Copilot CLI 的 OpenTelemetry 支持目前只导出 `application/json`，`OTEL_EXPORTER_OTLP_PROTOCOL` 环境变量被静默忽略。社区高赞功能需求，已关闭但被标记为待实现方向。

### 8. MCP 注册表策略获取返回 403，CI 中所有非默认 MCP 服务器被阻断
[#4346](https://github.com/github/copilot-cli/issues/4346) | 已关闭 | 评论：2 | 👍：3

使用 GitHub Actions 内置 `GITHUB_TOKEN` 进行认证时，MCP registry policy 请求返回 403，导致 CI 环境无法使用任何非默认 MCP 服务器，直接违背官方在 2026-07-02 宣布的 PAT-less 方案。已关闭，但社区关注度高。

### 9. v1.0.79 致命 OOM：autopilot 会话崩溃时 V8 堆仅占 0.6/4.3 GB
[#4499](https://github.com/github/copilot-cli/issues/4499) | 开放 | 评论：0 |👍：0

`copilot.exe` 在长时间 autopilot 会话中触发 `FATAL ERROR: Committing semi space failed`。崩溃发生于 host-RAM 提交失败而非 V8 堆达上限，指向底层内存管理或 native 层不稳定。新建 Issue，但影响严重，建议持续关注。

### 10. Atlassian MCP OAuth 在 1.0.80 中依然失败（回归未修复）
[#4490](https://github.com/github/copilot-cli/issues/4490) | 开放 | 评论：0 | 👍：0

与 #4480 相同的错误，在 1.0.80 中仍可复现，1.0.78 正常工作。用户明确表示升级后问题未解决，要求重新打开或补丁修复。此 issue 说明 1.0.79 引入的 OAuth issuer 校验回归在 1.0.80 中未被覆盖。

---

## 重要 PR 进展

过去 24 小时共有 3 个 PR，均围绕 #4449 的 “迁移 pull_request_target 自动化” 安全改造配套进行：

### 1. 迁移 PR 自动化，弃用 pull_request_target
[#4449](https://github.com/github/copilot-cli/pull/4449) | 已关闭 | 更新：2026-08-14

将 invalid-label 自动化从 `pull_request_target` 迁移至安全模型：使用 issue-scoped 写令牌直接关闭无效 issue，通过无权限 `pull_request` 信号处理 mergeable PR，特权流程改为手动触发。这属于仓库安全工作流的基础设施改进。

### 2. Handle fork PR associations in invalid-label writer
[#4497](https://github.com/github/copilot-cli/pull/4497) | 开放 | 更新：2026-08-14

是 #4449 的配套修复：当 GitHub 未填充 fork PR 的关联信息时，writer 回退到 trusted workflow-run 元数据搜索，且要求恰好存在一个开放的 PR 才执行标注，避免误判。

### 3. 验证 PR 工作流迁移的临时 canary
[#4496](https://github.com/github/copilot-cli/pull/4496) | 已关闭（invalid） | 更新：2026-08-14

仅含文档的 draft PR，用于验证 fork 来源 PR 在迁移后的自动化中行为正常，确认后即关闭并删除临时 fork，无需人工审查。

---

## 功能需求趋势

从过去 24 小时活跃的 Issues 中，社区最关注的功能方向集中在：

1. **MCP 生态深度集成**：OAuth 认证兼容性（RFC 8414 issuer 校验）成为最大痛点；同时社区提出 MCP `tools/list` 分页（#4006）、服务器名大小写不敏感冲突检测（#4478）等协议完善需求。
2. **新模型与推理参数支持**：GPT-5.6 `reasoning.mode` 参数支持（#4495）、模型配置与 feature flag 组合兼容性（#4345）、企业模型目录实时刷新（#4494）被反复提及。
3. **企业/组织策略一致性**：组织策略门控与 CLI 模型列表不同步（#4481、#4482）、新启用模型需清缓存才能生效（#4494），企业用户诉求强烈。
4. **会话稳定性与可恢复性**：autopilot 长任务 OOM（#4499）、停止按钮导致会话丢失（#4477）、/restart 与工作树选项冲突（#4493），直接影响日常开发效率。
5. **插件系统完善**：插件依赖规格与自动安装（#4487）、插件更新被文件锁阻塞（#4488），说明插件生态正进入平台化阶段。
6. **可观测性**：OTLP protobuf 导出支持（#2934）仍为高赞需求。

---

## 开发者关注点

- **MCP OAuth 回归影响面大**：1.0.79 引入、1.0.80 未修复的 RFC 8414 issuer 严格校验导致 Atlassian、GitLab 等主流 MCP 服务器全部无法连接。开发者呼吁将该场景纳入回归测试。
- **模型可用性不可控**：组织策略与 CLI 模型目录不一致、新启用模型需手动清缓存、部分模型受 feature flag 组合影响报错，模型服务稳定性成为企业用户主要不满来源。
- **长会话稳定性堪忧**：OOM 崩溃、子任务冻结、停止操作丢失会话等多起报告集中于 autopilot 模式，开发者建议在长任务场景增加资源监控与自动恢复能力。
- **CI/自动化链路受阻**：Actions 内置 GITHUB_TOKEN 无法获取 MCP registry policy，导致非默认 MCP 服务器在 CI 中不可用，与官方主推的无 PAT 方案出现断层。
- **配置与权限语义不清晰**：`allowed_directories` 未按预期抑制 shell 命令越界提示、插件更新文件锁、主题夜间自动切换等问题表明配置系统需要更透明的诊断能力。

---

*数据来源：[github/github/copilot-cli](https://github.com/github/copilot-cli)，统计时间截至 2026-08-15。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 | 2026-08-15

## 今日速览

过去 24 小时内，Kimi Code CLI 仓库共有 **4 个 Issue 更新**，**无新版本发布**、**无 PR 动态**。社区讨论焦点集中在两大方向：**记忆系统（Memory System）** 的持久化与优化（#1283、#1478），以及 **远程控制/多设备会话切换**（#2269）。此外，此前备受关注的 Windows PowerShell shell 工具增强 Issue #1136 已关闭，相关改进或已进入实施阶段。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

### 1. #1283 [功能需求] 记忆系统——跨会话持久上下文
- **作者**: CatKang | 创建于 2026-02-27 | 更新于 2026-08-14
- **评论**: 39 | 👍: 0
- **链接**: [MoonshotAI/kimi-cli Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)

社区呼声极高的功能请求，希望实现一套完整的记忆系统，包括**自动记忆**（AI 管理笔记）和**手动记忆**（用户自定义指令），让 CLI 在跨会话时记住项目模式、技术栈与用户偏好。39 条评论使其成为当前讨论最活跃的线程，可见该需求在开发者群体中的接受度极高。

### 2. #1478 [增强] 优化记忆层，大型项目管理痛点
- **作者**: hahy36 | 创建于 2026-03-17 | 更新于 2026-08-14
- **评论**: 2 | 👍: 0
- **链接**: [MoonshotAI/kimi-cli Issue #1478](https://github.com/MoonshotAI/kimi-cli/issues/1478)

中文 Issue，反馈参考文档缺乏记忆系统的细节（仅提及 `agent.md`），并引用了 `~/.openclaw/workspace/` 记忆目录结构作为参考，直指大型项目中上下文丢失导致的开发效率问题。2 条评论虽少，但代表了一批中文开发者对记忆层现状的普遍关切。

### 3. #2269 [功能需求] 远程控制/多设备会话切换
- **作者**: lucianalima777 | 创建于 2026-05-13 | 更新于 2026-08-14
- **评论**: 6 | 👍: 1
- **链接**: [MoonshotAI/kimi-cli Issue #2269](https://github.com/MoonshotAI/kimi-cli/issues/2269)

需求始于一台设备的 Kimi CLI 会话，在另一设备（笔记本、Web、移动端）无缝继续或远程控制。6 条评论与 1 个 👍 表明多环境开发者对该需求有明显共鸣，尤其是混合办公场景下的工作流连续性诉求。

### 4. #1136 [增强] shell 工具：适配 PowerShell 上下文（已关闭）
- **作者**: QIN2DIM | 创建于 2026-02-13 | 更新于 2026-08-14
- **评论**: 0 | 👍: 0
- **链接**: [MoonshotAI/kimi-cli Issue #1136](https://github.com/MoonshotAI/kimi-cli/issues/1136)

该 Issue 详述了在 **Kimi K2.5 (SGLang)** 上测试发现的 Windows shell 工具三个关键问题，严重影响 **命令生成 pass-1 阶段** 的 Agent 性能（如 shebang 歧义）。现已关闭，可能意味着相关修复已合并、或已被维护团队采纳进入排期——对 Windows 用户而言值得持续关注。

## 重要 PR 进展

过去 24 小时内**无 PR 更新**（0 条），无重要功能或修复合并入主分支。

## 功能需求趋势

从近期含今日更新的所有 Issue 来看，社区最关注的功能方向可归纳为三点：

- **持久化记忆/上下文管理**——目前最核心的单一需求。用户希望自动记忆与手动记忆并存，让 CLI 跨会话保留项目模式、用户偏好、常用命令习惯，避免反复重新灌输上下文。
- **远程控制与多设备工作流**——跨设备会话接管越来越被需要，反映出开发场景正从单一桌面向笔记本、云端开发环境、移动端等多端混合演进。
- **Shell 工具的跨平台稳定性**——Windows/PowerShell 下的命令生成正确性问题凸显，shell 工具在非 UNIX 环境下的路径解析、脚本头歧义等细节仍需打磨。

## 开发者关注点

- **大型项目场景下的记忆断层**：多位开发者反馈，项目规模增大后 CLI 频繁丢失关键上下文，需重复描述项目背景，严重拖慢迭代节奏。
- **文档详细度不足**：参考文档中关于记忆机制的描述仅见 `agent.md`，缺少完整的记忆层架构说明，用户难以判断现状与合理预期。
- **跨环境工作流整合**：在多设备间切换的开发者对会话状态同步与远程控制呼声渐高，希望能在本地发起、云端继续、移动端查看的完整链路中使用 Kimi Code CLI。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 2026-08-15

## 今日速览

今日社区最重大事件是 ID 生成器 48 位时间戳回绕导致大范围历史会话停滞（[#42608](https://github.com/anomalyco/opencode/issues/42608)），已定位根因并关闭。另一方面，Desktop v1.18.1 新布局隐藏 Plan/Build 切换 UI 的回归问题（[#36997](https://github.com/anomalyco/opencode/issues/36997)）持续发酵，获得社区大量反馈。PR 方面，动态模型发现（[#42660](https://github.com/anomalyco/opencode/pull/42660)）有望解决自定义提供商配置繁琐的长期痛点。

## 社区热点 Issues

### 1. 48 位 ID 时间戳回绕致所有历史会话停滞（严重事故）
[#42608](https://github.com/anomalyco/opencode/issues/42608) | 已关闭 | 👍 3

ID 生成器在 `2026-08-14 12:39:55 UTC` 发生 48 位时间戳回绕，导致所有此前创建的会话静默停止处理提示，是当日多个"会话无响应"报告的根因。该问题影响面极广，建议所有用户关注修复版本的发布。

### 2. Desktop App v1.18.1 新布局隐藏 Plan/Build 切换
[#36997](https://github.com/anomalyco/opencode/issues/36997) | 开启 | 👍 6 | 💬 12

`newLayoutDesigns` 新布局下，用户无法看到当前 agent（Plan/Build）模式，也无法切换，Tab 键行为异常。这是目前评论互动最高的 UI 回归问题，开发团队需优先处理。

### 3. plan agent 默认权限丢失，可绕过限制编辑文件
[#24615](https://github.com/anomalyco/opencode/issues/24615) | 已关闭 | 💬 9

显式配置 plan agent 权限会被正确遵守，但默认 plan agent 的权限限制未生效，可修改文件。这涉及权限模型的安全边界，值得关注修复方案。

### 4. DeepSeek V4 Pro 多轮工具调用 reasoning_content 报错
[#25000](https://github.com/anomalyco/opencode/issues/25000) | 已关闭 | 💬 7

通过 OpenCode Zen 使用 DeepSeek V4 Pro 时，多轮工具调用间歇性报错 `reasoning_content must be passed back to the API`。这是一个模型兼容层问题，影响依赖工具调用的复杂任务。

### 5. gpt-5.6-luna 通过 OpenCode Go 返回 403 地区限制
[#41518](https://github.com/anomalyco/opencode/issues/41518) | 开启 | 💬 6

中文用户报告，通过 OpenCode Go 中继访问 `gpt-5.6-luna` 时被上游 403 拒绝。跨国调用场景下，OpenCode Go 的地区路由策略需要调整。

### 6. 消息 ID 非时间可排序时 runLoop 永不退出
[#38791](https://github.com/anomalyco/opencode/issues/38791) | 开启 | 💬 6

`SessionPrompt.runLoop` 将消息 ID 作为普通字符串比较，仅对 opencode 自身 ID 有效。第三方导入的会话 ID 不满足时间排序时，循环会一直运行直到 provider 400。这影响所有导入会话的用户。

### 7. 上下文缓存失效导致本地 LLM 性能下降
[#37489](https://github.com/anomalyco/opencode/issues/37489) | 开启 | 👍 1 | 💬 5

在 vLLM/Ollama 等本地推理引擎下，切换模式或压缩上下文会导致缓存频繁失效，显著降低响应速度。本地大模型用户对该问题的诉求强烈。

### 8. 自动发现 OpenAI 兼容提供商的模型列表
[#27553](https://github.com/anomalyco/opencode/issues/27553) | 开启 | 👍 4 | 💬 3

配置 `baseURL` 的 OpenAI 兼容提供商（llama-swap、Ollama、LM Studio）可通过 `/v1/models` 自动发现模型，不必在 `opencode.json` 中逐一列举。社区高赞功能需求，已在 [#42660](https://github.com/anomalyco/opencode/pull/42660) 中实现。

### 9. 免费模型持续 429 限流，配额未按日重置
[#42215](https://github.com/anomalyco/opencode/issues/42215) | 已关闭 | 👍 2 | 💬 2

用户反馈免费额度消耗后即使超过 24 小时仍未重置，持续收到 "Subscribe To Go" 提示。免费层配额重置逻辑异常，影响大量免费用户。

### 10. 多子代理会话导致 TUI 渲染线程 97% CPU
[#42657](https://github.com/anomalyco/opencode/issues/42657) | 开启 | 💬 2

2-4 个并发子代理时 TUI 输入延迟 1-3 秒，在 Warp、Windows Terminal、WezTerm 中均复现。性能在高并发会话场景下严重退化。

## 重要 PR 进展

### 1. 动态模型发现：自定义提供商自动获取模型列表
[#42660](https://github.com/anomalyco/opencode/pull/42660) | 开启 | 新功能

为自定义 OpenAI 兼容提供商（LiteLLM、LM Studio 等）添加动态模型发现，关闭 6 个相关 issue（#13891、#29308、#28999、#25624、#23327、#26863）。这是社区长期期待的功能，可大幅简化配置流程。

### 2. worktree 路由移出 experimental 命名空间
[#42656](https://github.com/anomalyco/opencode/pull/42656) | 已关闭 | API 重构

将 worktree API 从 `/api/experimental/...` 提升为顶层资源路径，标志该功能进入稳定阶段。对依赖 worktree API 的集成方是正向信号。

### 3. 保持中断会话停止，避免被意外唤醒
[#36943](https://github.com/anomalyco/opencode/pull/36943) | 已关闭 | 核心修复

修复 V2 run 协调器中，被中断的会话会因已受理的提示被意外唤醒的问题。通过持久化准入序列号来阻止过期唤醒，提升会话控制的可靠性。

### 4. 队列化并发子代理的提问
[#36916](https://github.com/anomalyco/opencode/pull/36916) | 已关闭 | 修复

收集整个根会话树中的待处理提问，按请求 ID 排序并保持当前选中项，避免多个子代理并发提问时的混乱。

### 5. subagent 工具暴露有效 agent ID 列表
[#36883](https://github.com/anomalyco/opencode/pull/36883) | 已关闭 | 修复

subagent 工具描述中新增合法 agent ID 枚举，避免模型猜测不存在的名称（如将 `explore` 猜成 `explorer`），减少因此导致的工具调用失败。

### 6. 按工具执行超时：abort + 会话恢复
[#36869](https://github.com/anomalyco/opencode/pull/36869) | 已关闭 | 新功能

为内置工具和 MCP 工具增加独立的执行超时机制，卡死时可中止并恢复会话，解决工具长期挂起阻塞 agent 循环的问题。关联多个历史 issue（#20096、#34888 等）。

### 7. webfetch 响应大小限制支持环境变量配置
[#36863](https://github.com/anomalyco/opencode/pull/36863) | 已关闭 | 新功能

新增 `OPENCODE_WEBFETCH_MAX_SIZE` 环境变量，使 webfetch 响应体大小限制可调，方便处理大页面抓取场景。

### 8. 安全修复：按协议验证 openExternal URL
[#36862](https://github.com/anomalyco/opencode/pull/36862) | 已关闭 | 安全修复

修复 `shell.openExternal` 未校验 URL 协议的问题，避免 `file://`、`javascript:` 等危险协议被恶意利用。属于桌面端安全加固。

### 9. 从 OpenAI 兼容元数据恢复缓存令牌统计
[#36861](https://github.com/anomalyco/opencode/pull/36861) | 已关闭 | 修复

自定义 baseURL 提供商通过元数据（如 `prompt_tokens_details`）上报缓存命中时，现在可正确恢复缓存令牌计数，让会话成本统计更准确。

### 10. 修复 MiniMax 模型尾随 tool_call 泄漏
[#36860](https://github.com/anomalyco/opencode/pull/36860) | 已关闭 | 修复

MiniMax 模型会在纯文本回复后追加序列化的 tool_call 标记残留，该 PR 将其剥离，避免污染 assistant 文本内容。

## 功能需求趋势

- **新模型适配与兼容性**：大量 issue 围绕具体模型的接入问题（DeepSeek V4 的 reasoning_content、gpt-5.6-luna 的地区限制、GLM/Kimi 的 Anthropic 路由工具调用）。OpenCode 作为多模型聚合层，模型兼容性是最集中的社区诉求。
- **自定义提供商体验**：动态模型发现（[#27553](https://github.com/anomalyco/opencode/issues/27553)、[#42660](https://github.com/anomalyco/opencode/pull/42660)）和 `baseURL` 行为的一致性是高频话题，用户希望减少手动配置。
- **会话可靠性与恢复**：ID 时间戳回绕、消息排序、中断恢复等问题的集中爆发，让"会话不丢失、可恢复"成为核心痛点。
- **更细粒度的权限控制**：运行时 `/approve` 切换（[#41909](https://github.com/anomalyco/opencode/issues/41909)）、plan agent 权限边界（[#24615](https://github.com/anomalyco/opencode/issues/24615)）显示用户对权限模型的灵活性有更高要求。
- **性能优化**：上下文缓存失效（[#37489](https://github.com/anomalyco/opencode/issues/37489)）和 TUI 渲染卡顿（[#42657](https://github.com/anomalyco/opencode/issues/42657)）分别代表本地推理与界面交互两个性能方向。

## 开发者关注点

- **会话无响应**是当前最大痛点：多个 issue（#42605、#42608、#42611、#42594）指向会话停摆、不处理新提示，且 2026-08-14 出现了大规模爆发，需尽快通过版本更新修复。
- **免费层体验不稳定**：429 限流未按时重置（#42215）、DeepSeek V4 Flash Free 额度误判（#42385）等，免费用户对配额系统的公平性和可预期性存疑。
- **UI 回归影响日常使用**：Desktop v1.18.1 新布局隐藏模式切换（#36997）、主题不刷新（#42635）等问题直接干扰核心工作流，社区反馈激烈。
- **配置与文档缺失**：websearch 工具在 Go 模型下需要未文档化的 `OPENCODE_ENABLE_EXA` 环境变量（#40568）、OpenAI 兼容提供商需要手动列举模型（#27553）等，均反映了当前配置体系对用户不够友好。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

## Pi 社区动态日报 — 2026-08-15

### 今日速览

- **v0.84.2 发布**，带来全屏转录搜索与可配置默认工具两项新能力。
- **Windows/WSL 体验成为社区焦点**，讨论热度最高的话题（#7547 与 #6187）分别涉及 Windows 玩法梳理与 WSL 登录挂起。
- **性能与稳定性类问题集中**：TUI 流式渲染 CPU 占满（#6665）与大 diff 导致 TUI 崩溃（#8036）引发开发者关注。

### 版本发布

**v0.84.2** 已于近日发布，主要变更：

- 新增 **全屏转录搜索**：在全屏模式下支持搜索与跳转匹配项，完整键位说明见 [TUI Fullscreen Viewport](https://github.com/earendil-works/pi/blob/v0.84.2/packages/coding-agent/docs/keybindings.md#tui-fullscreen-viewport)。
- 新增 **可配置默认工具**：支持在启动时自定义默认启用的工具集。

发布详情见 [badlogic/pi-mono Releases](https://github.com/badlogic/pi-mono)。

### 社区热点 Issues

**1. Windows 上如何使用 Pi？遇到了哪些问题？（#7547，27 评论）**
作者 petrroll 发起，核心动机是 Windows 开发者基数庞大、Pi 运行方式过多，需要聚焦“官方 0 配置路径”以避免维护精力分散。这是当前社区对该 PR 讨论最热烈的主题。
→ https://earendil-works/pi Issue #7547

**2. WSL 下 Pi 登录在 Copilot 设备授权后挂起（#6187，26 评论）**
浏览器内完成设备授权后，WSL 客户端迟迟检测不到完成状态，一直卡在登录等待。该问题关闭于 8 月 14 日，但对 WSL 用户影响较大，社区持续关注。
→ https://earendil-works/pi Issue #6187

**3. Anthropic 修改 thinking blocks 导致 Opus 4.8 自适应思维 400 错误（#5223，17 评论，👍6）**
多轮对话中，Anthropic 提供方修改最近一条助手消息中的 thinking 块，触发 `messages.7.content.22: thinking or redacted_thinking blocks` 400 错误。该问题已关闭，但高赞反映出用户对高级推理模式稳定性的期待。
→ https://earendil-works/pi Issue #5223

**4. 终端无故滚动到开头（#5023，12 评论，👍2）**
模型输出期间，终端会随机跳转到会话开头并快速滚动到底部。问题已关闭，但“低交互下的异常滚动”仍让不少用户在意。
→ https://earendil-works/pi Issue #5023

**5. TUI 流式输出时单核占满：Intl.Segmenter 未缓存 + 按块重建 Markdown（#6665，12 评论，👍3，inprogress）**
长会话中 `pi -ne` 复现单核 100% CPU。spindump 定位到 `Markdown.render` → `wrap` → `Intl.Segmenter` 未缓存、每块重建 Markdown 两处根因，社区认可度高，修复进行中。
→ https://earendil-works/pi Issue #6665

**6. GitHub Copilot 登录 429：激活模型过多的组织受限（#7850，9 评论，👍7）**
设备授权成功后，Copilot 登录因 `429 Too Many Requests` 失败，问题出在“20+ 可用模型”的组织场景。👍7 说明影响面较广，已关闭（no-action）。
→ https://earendil-works/pi Issue #7850

**7. Z.AI Coding Plan 默认值引用已移除模型（#8096，5 评论）**
`defaultModelPerProvider` 仍选择 `glm-5.1`，但 models.dev 的 `zai-coding-plan` 已移除该模型，当前目录中实际包含 `glm-4.7`、`glm-5-turbo`、`glm-5.2` 等。模型目录与默认值脱节，已关闭。
→ https://earendil-works/pi Issue #8096

**8. 扩展加载器无法解析 pnpm 安装的依赖（jiti + 孤立 node_modules 布局，#8092，5 评论）**
将扩展从 git 安装迁移到 npm 后，jiti 解析器无法处理 pnpm 的符号链接布局，导致扩展依赖解析失败。该问题已被 #8112 修复。
→ https://earendil-works/pi Issue #8092

**9. TUI 显示“Copied!”但剪贴板里没有内容（#7761，3 评论）**
VTE 终端（GNOME Terminal 等）下，双击/拖选文本会闪现“Copied!”，但系统剪贴板不被写入——根因是仅发送了裸 OSC 52 序列而缺失回退方案。该问题已被 #8110 修复。
→ https://earendil-works/pi Issue #7761

**10. 冷恢复重放已被实时恢复移除的溢出助手回复（#7724，2 评论）**
上下文溢出时 Pi 压缩并重试成功后，重新打开会话会把失败的/被截断的助手响应重新加回历史。这会导致恢复后的对话历史与实际处理过程不一致，影响上下文一致性。
→ https://earendil-works/pi Issue #7724

### 重要 PR 进展

**1. perf(tui): 窗口化全屏转录（#8143，CLOSED）**
全屏会话保留完整的人类转录（含压缩前历史），而模型上下文仍保持压缩状态。备用屏渲染器按精确块高度渲染视口相交的块，显著提升大历史下的全屏性能。
→ https://earendil-works/pi PR #8143

**2. feat(ai): xAI 模型改走 Responses API 并默认 Grok 4.6（#8124，OPEN）**
发送 Pi 用户代理；默认从 Completions API 切换到 Responses API；默认 xAI 模型从 Grok 4.5 升至 Grok 4.6。
→ https://earendil-works/pi PR #8124

**3. feat(coding-agent): 实验性 append 压缩（#8120，OPEN）**
设 `PI_EXPERIMENTAL=1` 时启用 append 模式：复用活动系统提示、工具、转换上下文和路由会话，使压缩前缀能复用提供方 prompt 缓存——standalone 压缩仍作为默认。
→ https://earendil-works/pi PR #8120

**4. fix: 跟踪 Kimi 缓存 tokens（#8119，OPEN，关联 #8075）**
Kimi Chat Completions 以顶层 `usage.cached_tokens` 报告缓存命中，Pi 此前忽略并按普通输入计费。PR 将其纳入 `rawUsage` 并作为缓存读 token 统计。
→ https://earendil-works/pi PR #8119

**5. fix: 不要把根目录 README.md/AGENTS.md 当作 skill 加载（#8012，OPEN，关联 #7805）**
`--skill` 目录内根级非 SKILL.md 文件（README/AGENTS）会触发“broken skills”警告。修复方案：仅当解析出有效 skill frontmatter 时才将根级 Markdown 作为 skill 候选。
→ https://earendil-works/pi PR #8012

**6. fix: 单个 edit 对象输入解析（#8011，OPEN，关联 #7835）**
`prepareEditArguments` 只规范化字符串化数组，裸单个 edit 对象会解析失败。复现于 OpenRouter `z-ai/glm-5.2`，现已覆盖单对象输入。
→ https://earendil-works/pi PR #8011

**7. fix(extensions): registerFlag 类型不匹配（#8123，OPEN，关联 #8064）**
`registerFlag()` 允许 boolean 标志使用 `default: "false"` 字符串，导致省略时旗标被误判为 truthy。PR 改为判别联合类型并增加运行时检查。
→ https://earendil-works/pi PR #8123

**8. fix(coding-agent): jiti 导入前 realpath 扩展入口（#8112，OPEN，关闭 #8092）**
pnpm 隔离布局下，jiti 解析器不 realpath 入口就向上遍历，导致依赖解析失败。PR 在交给 jiti 前对扩展条目执行 realpath 解决该问题。
→ https://earendil-works/pi PR #8112

**9. feat(ai): 新增 SiliconFlow 内置 Provider（#8113，CLOSED）**
Provider id `siliconflow`，OpenAI 兼容端点 `https://api.siliconflow.com/v1`，API key 通过 `SILICONFLOW_API_KEY` 注入，遵循既有 moonshot/minimax 模式。
→ https://earendil-works/pi PR #8113

**10. fix(tui): 路由选择复制走主机剪贴板，让“Copied!”名副其实（#8110，CLOSED，关联 #7761）**
原实现裸写 OSC 52 并无条件显示“Copied!”。终端若忽略 OSC 52（macOS Terminal.app、VTE 系、无 OSC 52 透传的 tmux）则剪贴板为空。PR 增加回退路径并仅在真实写入后提示。
→ https://earendil-works/pi PR #8110

### 功能需求趋势

- **新模型/Provider 接入**：xAI Responses API（#8124）、SiliconFlow（#8113）、Anthropic Vertex（#5262）、Amazon Bedrock Mantle（#6216）都是活跃 PR；Kimi Coding 的兼容性检测（#8109）与 user-agent（#8104）也体现社区对国内/国际模型服务的覆盖诉求。
- **Windows / WSL 体验**：#7547 系统性梳理、#8047 Unix socket 绑定失败、#8108 bash 工具兼容性均指向“Windows/WSL 一栈式体验”是当前最大短板。
- **TUI 性能与交互**：#6665 的 CPU 占满、#8143 的全屏转录性能、#8144 技能名中间补全、#8132 命令补全弹窗位置设置，都在提升长会话与日常交互效率。
- **扩展体系成熟度**：#8092 pnpm 依赖解析、#8123 类型安全、#8137 `resolveCloudflareModel` 导出、#8100 原子会话级模型状态，反映社区在打造“扩展生态”方面需求强烈。
- **agent 可靠性**：#8115 reasoning-only 响应绕过重试、#8138 Codex 临时错误重试分类、#8134 代理+HTTP 挂起、#7724 冷恢复重放问题，说明“长期自主运行”的稳定性是用户核心诉求。

### 开发者关注点

- **登录/鉴权链路脆弱**：Copilot 429（#7850、#8010）、WSL 登录挂起（#6187）说明 OAuth/设备授权流程在高版本与代理场景下的容错不足。
- **长会话性能拖累**：流式时单核占满（#6665）、大 diff 渲染崩溃（#8036）、终端异常滚动（#5023）共同指向 TUI 渲染管线在大输入/长上下文的性能瓶颈。
- **平台兼容性细节**：VTE 剪贴板失效（#7761）、Windows socket 测试失败（#8047）、bash 工具只找 git-bash/wsl（#8108）属于“小众但确实影响特定用户群”的本地化问题。
- **模型默认值维护滞后**：Z.AI（#8096）、Kimi（#8075）等 provider 目录与默认配置脱节，提示模型元数据生成链路对 models.dev 变更的同步存在时延。
- **代理与 HTTP 直连的边界问题**：#8134 显示 0.84.0 后 HTTP+forward proxy 场景下首个工具结果后挂起，此类环境异质性容易被主流程测试覆盖不到。
- **Agent 文件卫生**：#8145 指出 agent 在 `/tmp` 创建随机文件不利于多 agent 协作，开发者期待仿照 Codex 的按项目/按会话目录隔离机制。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 2026-08-15

## 1. 今日速览

v0.21.12 正式版发布，重点增强了 Web Shell 工作区文件上传能力，并为 autofix 审查加入了 diff 增长制动机制。社区方面，图像加载崩溃回归（#8957）与主分支 CI 频繁失败（#9143、#9160）是当前最集中的痛点，而 Web Shell 会话管理、服务端资源边界治理和架构解耦方向则呈现明显的活跃趋势。

## 2. 版本发布

### v0.21.12
- 正式版 Release 发布。主要亮点包括：
  - Web Shell composer 支持通过拖放或 `@` 文件面板上传工作区文件，并带进度跟踪（[#8874](https://github.com/QwenLM/qwen-code/pull/8874)）
  - autofix 审查中实现了 diff 增长制动（diff growth brake），用于限制审查范围无节制增长
- 发布链接：[v0.21.12](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12)

### v0.21.12-preview.4 / preview.3
- 两个预发布版本包含相同变更：
  - `fix(web-shell)`: 修复独立会话目标未被保留的问题（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）
  - `feat(web-shell)`: 支持工作区文件上传
- 发布链接：[preview.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.4) / [preview.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.3)

## 3. 社区热点 Issues

- **[#8957] Qwen Code 在 0.21.2 后读取图片即崩溃（P2 回归 Bug，12 条评论）**
  升级到 0.21.2 之后，读取图片会导致程序直接崩溃；0.21.1 是最后一个正常版本。这是当前讨论热度最高的 Issue，影响面较大，期待尽快定位回归源。
  https://github.com/QwenLM/qwen-code/issues/8957

- **[#8678] 大规模会话恢复超时时，serve 模式未能保留当前会话（P1，已关闭）**
  长时间挂起后恢复会话超时，导致当前会话丢失。2026-08-14 被标记为“部分解决并已被取代”，相关的请求级恢复超时、延迟结果安全、附件身份隔离等已分层推进。
  https://github.com/QwenLM/qwen-code/issues/8678

- **[#8051] 多工作区 daemon 资源使用缺乏字节级上限（P2，9 条评论）**
  目前仅限制工作区数量和会话数，但请求体、WebSocket 组装等可能的内存占用没有限制。社区希望引入字节级资源边界，是一项长期资源治理需求。
  https://github.com/QwenLM/qwen-code/issues/8051

- **[#9143] 主分支 CI 失败：E2E Tests 在 c5bf2224 提交上运行失败（7 条评论）**
  自动上报的主分支 CI 失败，测试结果尚未上报就中断。此类 CI 不稳定问题近期高频出现，社区对流水线可靠性表达了明显关注。
  https://github.com/QwenLM/qwen-code/issues/9143

- **[#9002] Python SDK 拒绝 CLI 支持的 permission_mode="auto"（P2，6 条评论）**
  CLI 支持 `permission_mode="auto"`，但 Python SDK 的客户端校验直接抛 `ValidationError`，导致配置无法传入。CLI 与 SDK 行为不一致的问题，提示需要统一选项定义。
  https://github.com/QwenLM/qwen-code/issues/9002

- **[#6806] /compress 后状态行上下文百分比不刷新（P2，5 条评论）**
  执行 `/compress` 或 `/compress-fast` 后，底部状态栏的 token 上下文占比仍保持压缩前的数值，直到下一次模型请求才更新。属于 UI 可见性问题，影响对压缩效果的即时反馈。
  https://github.com/QwenLM/qwen-code/issues/6806

- **[#8582] 只读 shell 分类器可被命令替换/续行绕过自动放行（P1，已关闭）**
  AST 分类器与运行时替换门禁均存在绕过路径，可让看似只读的命令实际执行任意代码。安全相关，已关闭并修复。
  https://github.com/QwenLM/qwen-code/issues/8582

- **[#8871] ACP 子进程报 "Unknown argument: acp"（P2，5 条评论）**
  `qwen serve --http-bridge=true` 默认会以 `--acp` 启动子进程，但子进程无法解析该参数，导致令牌认证失败等问题。
  https://github.com/QwenLM/qwen-code/issues/8871

- **[#9026] NO_TOOL_RESULT_PROGRESS 在模型安静结束回合时硬失败（P2，4 条评论）**
  Headless 模式下，模型在工具结果后无可见文本且无后续工具调用即结束回合时，会被 `NO_TOOL_RESULT_PROGRESS` 误判为流错误并耗尽重试预算。
  https://github.com/QwenLM/qwen-code/issues/9026

- **[#2128] 长会话内存无界增长：UI History 无限累积（P1，4 条评论）**
  数十小时会话后内存只增不减，根因是 `useHistoryManager.history` 数组无上限增长。这是典型的长期会话稳定性问题，社区关注度高。
  https://github.com/QwenLM/qwen-code/issues/2128

## 4. 重要 PR 进展

- **[#8874] Web Shell composer 支持拖放/文件面板上传工作区文件**
  本次正式版的核心亮点，为 Web Shell 补齐了文件上传能力，并带有进度跟踪。
  https://github.com/QwenLM/qwen-code/pull/8874

- **[#9127] 端到端支持 session 媒体引用**
  在 daemon、ACP 桥、TypeScript SDK 和 Web Shell 间传递图片等媒体 ID 与元数据，避免重复上传，覆盖提示词提交、中轮队列、注入消息回显等场景。
  https://github.com/QwenLM/qwen-code/pull/9127

- **[#9196] 修复工具结果后安静完成回合被误判为流错误**
  对应 #9026：让合法的 `finish_reason` 静默结束不再触发 `NO_TOOL_RESULT_PROGRESS` 重试预算耗尽问题。
  https://github.com/QwenLM/qwen-code/pull/9196

- **[#9122] Web Shell 侧边栏会话管理改进**
  会话详情在悬停时呈现；文件夹预览 5 行；长标题按实际溢出距离滚动；运行中会话展示状态指示；同时支持移动端适配。
  https://github.com/QwenLM/qwen-code/pull/9122

- **[#9082] 发布流水线改为 force-push 释放分支**
  修复发布重试时因远程残留分支导致 “Commit and Condition” 失败的问题。发布分支将被强制更新，使重试能够真正替换失败尝试。
  https://github.com/QwenLM/qwen-code/pull/9082

- **[#9007] 限制 ACP HTTP 预附加缓冲的字节数**
  将 ACP HTTP 预附加缓冲从“按数量”限制升级为按字节限制，缓解 #8051 中提出的资源边界问题。
  https://github.com/QwenLM/qwen-code/pull/9007

- **[#9100] fetch-pr 支持增量审查锚点校验**
  为 `qwen review fetch-pr` 增加 `--since` 参数，在 CLI 层对上次已审查的 head 做校验与作用域限定，避免重复审查。
  https://github.com/QwenLM/qwen-code/pull/9100

- **[#9175] 修复审查流水线中 7 个实测缺陷**
  通过 4 次针对真实 PR 的完整运行逐一发现并修复，包括增量锚点被错误保留、维度校验逻辑等结构性问题。
  https://github.com/QwenLM/qwen-code/pull/9175

- **[#9039] 增加隐私安全的工具结果边界诊断**
  在核心层增加诊断信息，帮助定位工具结果导致的流意外中断，同时避免泄露敏感数据。
  https://github.com/QwenLM/qwen-code/pull/9039

- **[#8894] capture-tui：审查截图不再是文字描述**
  Phase 2 证据图像方案：在私有 tmux server 中运行被测代码，对终端实际渲染结果截屏，供审查者验证“面板在 80 列被裁切”这类渲染声明。
  https://github.com/QwenLM/qwen-code/pull/8894

## 5. 功能需求趋势

- **Web Shell 体验迭代加速**：不再满足于基础聊天，社区希望 Web Shell 更像完整桌面应用。典型需求包括独立 Electron 宿主预览（[#9168](https://github.com/QwenLM/qwen-code/issues/9168)）、HTML 导出复用 WebShellTranscript UI（[#9186](https://github.com/QwenLM/qwen-code/issues/9186)）、频道/会话/工作区管理重构（[#8845](https://github.com/QwenLM/qwen-code/issues/8845)）。
- **资源治理与字节级限制**：从仅限制数量升级为按字节/内存边界限制，涉及多工作区 daemon（[#8051](https://github.com/QwenLM/qwen-code/issues/8051)）、ACP 预附加缓冲（[#9007](https://github.com/QwenLM/qwen-code/pull/9007)），以及长时间会话内存无界增长（[#2128](https://github.com/QwenLM/qwen-code/issues/2128)）。
- **架构解耦与依赖净化**：要求 `utils/` 成为纯叶子层（[#9146](https://github.com/QwenLM/qwen-code/issues/9146)）、移除 ACP 集成对 serve 内部实现的直接依赖（[#8084](https://github.com/QwenLM/qwen-code/issues/8084)），体现出社区对核心包可维护性的关注。
- **CI/CD 自动化闭环**：自动上报的 CI 失败 Issue（[#9143](https://github.com/QwenLM/qwen-code/issues/9143)、[#9159](https://github.com/QwenLM/qwen-code/issues/9159)、[#9160](https://github.com/QwenLM/qwen-code/issues/9160)）数量增多，同时 autofix 流水线持续自我加固（PR #9100、#9175），自动化质量与稳定性成为重点投资方向。
- **安全加固持续深入**：从 shell 分类器绕过（#8582）到 PAT runner 隔离（[#9089](https://github.com/QwenLM/qwen-code/issues/9089)），安全审查覆盖面正在从功能逻辑扩展至 CI 基础设施层面。
- **更多第三方模型 Provider**：PR [#8368](https://github.com/QwenLM/qwen-code/pull/8368) 计划加入 Kimi 与 Xiaomi MiMo 预设；音频附件桥接（[#8332](https://github.com/QwenLM/qwen-code/pull/8332)）也在推进中，新模型/新模态支持仍是活跃方向。

## 6. 开发者关注点

- **回归问题令人焦虑**：#8957 在 0.21.2 升级后读取图片即崩溃，且“0.21.1 是最后可用版本”的反馈非常强烈，说明快速迭代中回归验证的压力正在显现。
- **主分支 CI 稳定性成疑**：过去 24 小时出现多条主分支 E2E 失败自动 Issue（#9143、#9159、#9160），且有些在测试结果上报前就中断，开发者对 CI 的可信度表示担忧。
- **CLI 与 SDK 行为不一致**：#9002 展示了 CLI 支持但 Python SDK 拒绝同一参数的问题；#8922 中 Shell 忽略 `tools.truncateToolOutputThreshold` 配置也体现了“文档/配置与实现脱节”的共性问题。
- **长会话资源问题反复出现**：UI History 无界增长（#2128）、多工作区 daemon 资源不可控（#8051）讨论热度持续，反映生产环境下长时间运行的稳定性仍是核心痛点。
- **安全绕过的具体案例引发关注**：#8582 展示的“只读命令分类器可被 `$\{var@P}` 绕过”说明表面防护的局限性，社区期待更底层的执行沙箱或验证机制。
- **工具调用行为过于敏感**：#9026 中 `NO_TOOL_RESULT_PROGRESS` 将“合法静默结束”识别为错误，开发者希望流错误判断更贴近实际模型行为，而不是机械的文本进度检测。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 2026-08-15

## 今日速览

v0.9.8 正式发布，项目品牌由 DeepSeek TUI 全面切换为 **CodeWhale**，旧的 `deepseek-tui` npm 包已废弃；同时 Web UI 被标记为 P0 级损坏，多个 CI 红问题（provider-count 断言、thinking-ladder 断言）已被社区快速修复。数据可靠性方面，session-index 写入竞争导致的数据丢失问题被发现并合入修复。

## 版本发布

**v0.9.8（Codewhale）**
本次发布标志着品牌升级：Codewhale 成为 Shannon Labs 的公共产品名称，`codewhale` 命令、npm 包及发布资产名称保持小写技术标识。旧的 npm 包 `deepseek-tui` 已废弃且不再发布。从 v0.8.x 升级的用户需注意命令/包名迁移。另根据 PR 信息，v0.9.8 还包含 Auto-Review 模型守护者层、DS4 本地 DeepSeek 路由等新能力。

## 社区热点 Issues

1. **#5370 [P0] Web UI 完全损坏** — 维护者 Hmbown 报告公共 Web UI 在视觉和功能上"totally broken"，涉及 codewhale.net 的 Next.js 应用及管理端。这是当前最高优先级问题，评论正聚焦于拆分排查范围。
   https://github.com/Hmbown/CodeWhale/issues/5370

2. **#5324 agent 工具 32 字段 schema 令模型频繁出错** — 维护者指出单一 schema 承载 8 个动作且零必填字段，模型容易误用，提议简化。已有配套 PR #5369 推进，说明维护方已认可该问题。
   https://github.com/Hmbown/CodeWhale/issues/5324

3. **#5383 main 分支在 v0.9.8 上构建变红** — provider-count 断言仍持旧数字（45 vs 43），社区成员 Lstarsky0 迅速定位并提交修复 PR #5384，体现出活跃的测试维护。
   https://github.com/Hmbown/CodeWhale/issues/5383

4. **#5374 agent 写作文本损坏** — macOS 上 agent 回复内容乱码，用户附截图但仍需更多信息。属于疑似终端渲染或流式处理 bug，影响直观。
   https://github.com/Hmbown/CodeWhale/issues/5374

5. **#5350 简化第三方模型配置（中文用户需求）** — 用户 shadapang 建议为 OpenCode Zen、美团 Sensenova 等服务商预制模板，只需填 API 密钥并内置"测试连接"。反映新用户配置门槛问题。
   https://github.com/Hmbown/CodeWhale/issues/5350

6. **#5322 宽终端输出区不填充（v0.9 回归）** — v0.8 中输出区可扩展至全宽，v0.9 被限制最大宽度。宽屏下大量留白，用户已给出复现步骤。
   https://github.com/Hmbown/CodeWhale/issues/5322

7. **#4326 32-worker 风暴取消后 RSS 不回落** — 高扇出基准显示取消后内存未回落。维护者希望区分分配器高水位与真实泄漏，属于性能可靠性问题。
   https://github.com/Hmbown/CodeWhale/issues/4326

8. **#4785 464 处 #[allow(dead_code)] 掩盖代码漂移** — 维护者统计 143 个文件存在死代码抑制属性，导致编译器无法报告漂移。这是长期代码健康治理方向。
   https://github.com/Hmbown/CodeWhale/issues/4785

9. **#1004 /dryrun 命令：预览请求而不实际发送** — 用户 peixl 提出在长对话迭代中可预览"即将发送的请求"以节省 V4 Pro 成本，9 条评论，社区关注度较高。
   https://github.com/Hmbown/CodeWhale/issues/1004

10. **#3192 请求列入 agentclientprotocol/registry** — 希望被收录以便 Zed 直接安装使用。体现社区对跨工具生态集成的渴望。
    https://github.com/Hmbown/CodeWhale/issues/3192

## 重要 PR 进展

1. **#5382 [merged] session-index 写入序列化修复** — 修复 `StateStore` 并发克隆下 JSONL 写入未同步导致的数据丢失问题，是昨日最重要的数据可靠性修复。
   https://github.com/Hmbown/CodeWhale/pull/5382

2. **#5381 [merged] webhook HTTP 客户端构建失败不再 panic** — 将 `.expect()` 替换为优雅降级/错误处理，避免 TLS 等环境问题导致宿主崩溃。
   https://github.com/Hmbown/CodeWhale/pull/5381

3. **#5353 [merged] Auto-Review 模型守护者层（v0.9.8）** — Auto-Review 变为双层模式：确定性决策层不可绕过，失败时升级到一次性模型守护者，对齐 Codex 语义与 Kimi 模式词汇。
   https://github.com/Hmbown/CodeWhale/pull/5353

4. **#5358 [merged] Auto-Review 拒绝理由 + 断路器** — 拒绝原因以可读形式传给模型，防止模型反复用相同措辞重试耗尽预算；这是 #5352 的首个 P0 切片。
   https://github.com/Hmbown/CodeWhale/pull/5358

5. **#5365 [merged] DS4 本地 DeepSeek 一等公民支持** — 通过预填 loopback 预设与 provider-picker 快捷键，使 DwarfStar 本地路由无需新协议适配即可使用。
   https://github.com/Hmbown/CodeWhale/pull/5365

6. **#5369 [merged] Moonshot schema 降级而非拒绝条件** — 配合 #5324 的 schema 简化，使 Moonshot 模型在条件不满足时优雅降级，而非直接拒绝。
   https://github.com/Hmbown/CodeWhale/pull/5369

7. **#5364 [merged] TUI 渲染 Markdown 引用栏** — blockquote 以专用引用栏渲染，支持嵌套、行内格式、换行与正确选择复制。
   https://github.com/Hmbown/CodeWhale/pull/5364

8. **#5339 [merged] 抑制子进程归属的 shell 补全事件** — 修复父模型流被子进程补全事件污染的问题，并补充回归测试。
   https://github.com/Hmbown/CodeWhale/pull/5339

9. **#5378 [merged] 重新固定 thinking-ladder 断言** — 9 个测试断言旧的推理努力度词汇导致 macOS/Windows CI 红，重新固定到新词汇表，无生产代码改动。
   https://github.com/Hmbown/CodeWhale/pull/5378

10. **#5376 [merged] 内部运行时事件不进 session peek** — 修复合入事件污染会话预览的问题，并附带真实构造器复现。
    https://github.com/Hmbown/CodeWhale/pull/5376

> 另：dependabot 提交了 5 个依赖升级 PR（rusqlite 0.40.2、rmcp 3.1.2、thiserror 2.0.20、ratatui 0.30.2、tower-http 0.7.0），均为常规维护。

## 功能需求趋势

- **生态与市场整合**：请求接入 agentclientprotocol/registry 以便 Zed 安装（#3192）；用户呼吁构建 Kimi 级插件系统与联邦市场（#5311）；VSCode 市场出现非官方扩展引发版权讨论（#2327）。
- **模型/服务商支持扩展**：简化第三方模型配置模板（#5350）、NVIDIA NIM 兼容（#1482）、DS4 本地路由（#5365），社区对"更多开箱即用的 provider"需求明显。
- **交互透明度与防错**：/dryrun 请求预览（#1004）、Auto-Review 拒绝理由与断路器（#5358）、TUI 更新提示（#5053），用户希望系统解释自己的行为。
- **性能与可靠性治理**：32-worker 内存回落（#4326）、compaction 结构化保留契约（#4394）、死代码清理（#4785），维护者与用户共同关注长期健康度。
- **UI/UX 精细化**：宽终端适配回归（#5322）、非英语路由控件（#5290）、引用栏渲染（#5364）、子代理身份一致性（#5287）。

## 开发者关注点

- **配置门槛**：第三方服务商需要手动填 Base URL/模型名/密钥且缺乏文档，保存后状态常卡在 not checked——新手配置耗时。
- **数据与并发安全**：session-index 写入竞争造成静默数据丢失（已修复）、陈旧写声明阻塞新子代理（#5372）、HTTP 客户端构建 panic（#5379），暴露并发路径的脆弱性。
- **CI 稳定**：一天内出现 provider-count 断言、thinking-ladder 断言两批 CI 红问题，均由版本升级后测试数字未同步导致，开发者希望有更自动化的断言校验。
- **模型-facing 接口复杂度**：32 字段 schema 导致模型错误率高，输出 token 上限被异常限制（#5373），影响真实任务的完成度。
- **回归管理**：宽终端填充、web UI 整体损坏等 v0.9 系列回归说明新架构迁移期 UI 层需要更多回归测试保障。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*