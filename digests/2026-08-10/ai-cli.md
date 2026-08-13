# AI CLI 工具社区动态日报 2026-08-10

> 生成时间: 2026-08-10 04:40 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-10）

## 1. 生态全景

AI CLI 工具已从早期“单会话助手”演变为集会话管理、子代理编排、MCP 集成、多端同步于一体的开发基础设施。当前整体处于“功能扩张期”与“稳定性补课期”并存：厂商加速引入多智能体、记忆系统、浏览器控制等高级能力，但社区反馈高度集中在 Windows 兼容性、静默失败、会话数据可靠性等基础问题。活跃度分化明显，头部工具日更 PR 密集，尾部工具（如 Grok Build）尚无公开动态。跨工具最强烈的共同信号是：**开发者不再满足于“能用”，而是要求“可信、可恢复、可观测”。**

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 热点 PRs | Release 情况 |
|------|------------|----------|--------------|
| Claude Code | 10 | 5 | 无 |
| OpenAI Codex | 10 | 8（7 合入） | 无 |
| Gemini CLI | 10 | 10 | v0.56.0-nightly.20260810 |
| GitHub Copilot CLI | 10 | 0 | 无 |
| Kimi Code CLI | 2 | 1 | 无 |
| OpenCode | 10 | 10 | 无 |
| Pi | 10 | 10 | 无 |
| Qwen Code | 10 | 10 | v0.21.8-nightly.20260810 |
| DeepSeek TUI | 10 | 3 | 无（v0.9.6 准备中） |
| Grok Build | 0 | 0 | 无 |

> 注：Issue/PR 数为各日报“热点”条目数，可反映当日讨论与迭代强度。

---

## 3. 共同关注的功能方向

### 3.1 会话生命周期与可移植性
- **Claude Code**：跨目录恢复会话（#28745）、固定会话防误删。
- **OpenAI Codex**：项目会话被静默裁剪（#21128）、标签页并行会话（#12098）。
- **Gemini CLI**：ACP 会话恢复污染（#28744）。
- **GitHub Copilot CLI**：5MB 上限导致 `/compact` 失效（#4424）、远程会话（#2751）。
- **Kimi Code CLI**：跨会话记忆系统（#1283）。
- **Qwen Code**：多会话协调 RFC（#8718）、按名称寻址会话（#8733）。
- **DeepSeek TUI**：compaction 后 token 计数不刷新（#5096）、结构化信息存续契约（#4394）。

**核心诉求**：会话应可跨目录、跨设备、跨时间恢复，且压缩/归档不能导致数据静默丢失。

### 3.2 静默失败与状态误报
- **Claude Code**：标签语法解析器吞参（#84362）、30 分钟定时 SIGTERM 无通知（#84981）。
- **Gemini CLI**：子代理 MAX_TURNS 被误报为成功（#22323）。
- **GitHub Copilot CLI**：kickoff prompt 静默丢失（#4423）。
- **OpenCode**：发送文件后无响应（#41471）。
- **DeepSeek TUI**：File 编辑假成功（#5209）。
- **Pi**：auto-compaction 不触发，直到 provider 报错（#6879）。

**核心诉求**：任何中断或数据丢失必须有明确信号，报错优于隐藏，审计日志应完整。

### 3.3 Windows 平台稳定性
- **Claude Code**：控制台闪烁（#14828）、Browser-pane 崩溃（#80999）。
- **OpenAI Codex**：行结尾统一 LF（#4003）、扩展资源加载失败（#37458）。
- **GitHub Copilot CLI**：`sessionStart` hook 不触发（#1730）。
- **OpenCode**：目录选择受限（#6490）、桌面端白屏 30 秒+（#41477）。
- **Qwen Code**：安装器崩溃（#7118）、TUI 横幅缺行（#8124）。

**核心诉求**：Windows 已不是“二等公民”，行结尾、沙箱、渲染、安装器都需平台级修复。

### 3.4 MCP 可靠性
- **Claude Code**：MCP 调用参数静默丢失（#84362）。
- **GitHub Copilot CLI**：60 秒硬超时无重试（#4421）、FastMCP 不兼容（#4370）。
- **Kimi Code CLI**：Google GenAI 对 MCP JSON Schema 校验失败（#739）。
- **Qwen Code**：可选流 404 杀死整个 MCP 连接（#8784）。

**核心诉求**：MCP 接入应具备超时重试、参数清洗、错误隔离，不能因单个 server 拖垮整个会话。

---

## 4. 差异化定位分析

| 工具 | 定位与目标用户 | 技术路线亮点 |
|------|----------------|--------------|
| **Claude Code** | 企业级综合开发助手，覆盖 Desktop/CLI/Web，强调插件生态与工作流编排 | Workflow 工具、安全策略插件（security-guidance）、Agent 插件体系 |
| **OpenAI Codex** | 深度绑定 VS Code 的 IDE 原生体验，面向 OpenAI 模型生态用户 | apply_patch 行结尾修复、Computer Use、远程插件安装关联 |
| **Gemini CLI** | 激进迭代的 Agent 框架探索者，快速发布 nightly，关注模型原生能力 | Agent 递归委托（#28738）、AST 感知代码库映射、Auto Memory |
| **GitHub Copilot CLI** | GitHub 生态内的一体化远程协作工具，服务 Enterprise 组织用户 | `/remote` 远程会话、组织模型目录、MCP 策略管理 |
| **Kimi Code CLI** | 轻量、长上下文，依托 Kimi 模型，社区体量小但需求精准 | ACP 流式协议、跨会话记忆设计 |
| **OpenCode** | 开源中立、多 Provider 的本地优先工具，社区贡献活跃 | TUI + 桌面 + Web 三端，`/handoff` 会话交接，实验性渲染调优 |
| **Pi** | 个人开发者向的本地模型工具，深度 Tweaking TUI 体验 | llama.cpp 原生支持、远程会话 wire protocol、扩展 API 暴露 |
| **Qwen Code** | 阿里云生态与多智能体前沿探索，服务企业 monorepo 场景 | 原生 DashScope 集成、Chrome WebBridge 直控、daemon 多会话共享 |
| **DeepSeek TUI** | Rust 实现的轻量 CLI，聚焦上下文压缩与多 Provider 切换 | Compaction 结构化契约、Fleet 子代理配置、统一任务面板 |
| **Grok Build** | 暂无活跃动态，处于早期或内部阶段 | — |

---

## 5. 社区热度与成熟度

- **第一梯队（高活跃、高关注）**：Claude Code、OpenAI Codex、Gemini CLI、Copilot CLI。用户基数大，Issue 评论数与点赞量高，且涉及企业级、跨平台、成本控制等核心痛点；Gemini 与 Qwen 保持每日 nightly 发布，迭代速度领先。
- **第二梯队（社区活跃、迭代快）**：OpenCode、Pi。开源社区贡献密集，PR 数量与问题反馈成正比，功能/修复覆盖 UI 细节、性能优化、协议设计；OpenCode 的 VS Code 插件和 Pi 的 TUI 体验是各自焦点。
- **第三梯队（体量小、针对性明确）**：Kimi Code CLI、DeepSeek TUI。虽 Issue/PR 数量少，但用户提出的问题（流式挂死、compaction 可信度）非常具体，且有维护者持续跟进，属于“小而精”的成长期工具。
- **待观察**：Grok Build 当日零活动，缺乏公开信号。

---

## 6. 值得关注的趋势信号

1. **可观测性成为信任基石**：多家工具收到“静默吞参”“误报成功”“无通知终止”类投诉。开发者正要求 CLI 具备类似服务端可观测性的能力——完整的 `wire.jsonl`、结构化错误子类型、会话级审计日志。
2. **Windows 是下一个主战场**：Claude Code、Codex、Copilot 同日出现多起 Windows 稳定性问题，覆盖行结尾、渲染、沙箱、安装器。规范 Windows 后，工具的潜在用户覆盖将显著扩大。
3. **上下文窗口与压缩策略急需智能化**：1M 上下文模型出现后，工具仍以 128K 为默认触发压缩（DeepSeek）、压缩后计数不刷新、Auto Memory 无限重试。工具需自动感知模型真实能力，并让压缩过程可解释、可干预。
4. **多智能体协作进入深水区**：Gemini 实现递归委托、Qwen 提出多会话 RFC、DeepSeek 规划 Fleet 面板。但子代理挂起、误报、限流等问题同步暴露，稳定性决定该方向能否落地。
5. **本地化与全球化需求抬头**：Claude Code UI 多语言（#31413）、Copilot 中文 zh-CN（#4407）出现，说明非英语开发者正成为不可忽视的用户群。
6. **MCP 生态从“能连”到“可靠”**：超时硬编码、无重试、参数格式冲突等问题已成共性。MCP 标准化的下一阶段是协议级容错与可配置策略。

**对开发者的参考价值**：选择 AI CLI 时，除功能丰富度外，应优先考察其错误透明度、会话恢复能力、Windows 兼容性及 MCP 容错机制；若深度依赖自动化流程，需特别关注“静默失败”场景是否有日志和重试兜底。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据截止 2026-08-10 | 数据源：github.com/anthropics/skills PR/Issue 评论榜*

---

## 1. 热门 Skills 排行

以下按社区讨论热度（评论数排序）列出最受关注的新增/改进 Skills，均处于 **Open** 状态。

### ① document-typography — 文档排版质量检查
[PR #514](https://github.com/anthropics/skills/pull/514)
- **功能**：防止 AI 生成文档中的孤字/孤行（orphan）、段首标题滞留页尾（widow）以及编号错位等排版问题。
- **讨论热点**：被社区认为是“所有 Claude 文档生成场景的共性痛点”，讨论集中于触发时机与是否应内置到默认文档技能中。
- **状态**：Open

### ② ODT — OpenDocument 文档创建与转换
[PR #486](https://github.com/anthropics/skills/pull/486)
- **功能**：支持创建、填充模板、读取 `.odt/.ods`，并可解析 ODT 为 HTML。
- **讨论热点**：LibreOffice/ISO 标准文档的兼容性、与现有 DOCX 技能的边界划分。
- **状态**：Open

### ③ testing-patterns — 全栈测试模式参考
[PR #723](https://github.com/anthropics/skills/pull/723)
- **功能**：覆盖测试哲学（Testing Trophy）、单元测试、React 组件测试、端到端测试等完整测试知识栈。
- **讨论热点**：社区对“什么该测、什么不该测”的规则边界讨论较热烈，希望借此缓解 AI 生成冗余测试的问题。
- **状态**：Open

### ④ pyxel — 复古/像素风游戏开发
[PR #525](https://github.com/anthropics/skills/pull/525)
- **功能**：基于 Pyxel 引擎的 MCP 工作流，支持“编写 → 运行截图 → 检查 → 迭代”闭环。
- **讨论热点**：以 MCP 方式驱动游戏引擎的实践，被认为是 Skill + MCP 融合的代表性案例。
- **状态**：Open

### ⑤ self-audit — 输出交付前质量审计
[PR #1367](https://github.com/anthropics/skills/pull/1367)
- **功能**：先做机械文件验证，再按严重程度进行四维推理审计（v1.3.0）。
- **讨论热点**：通用性强，适用于任意项目/技术栈/模型；社区讨论其对“AI 幻觉输出”的实际约束效果。
- **状态**：Open

### ⑥ color-expert — 色彩知识与选色决策
[PR #1302](https://github.com/anthropics/skills/pull/1302)
- **功能**：内置 ISCC-NBS、Munsell、RAL、CSS 等色彩命名系统，以及 OKLCH/OKLAB/CAM16 色彩空间选型表。
- **讨论热点**：在生成图表、UI、数据可视化时如何给出“专业且一致”的颜色建议。
- **状态**：Open

### ⑦ plan-file-hygiene — 规划文件生命周期治理
[PR #1479](https://github.com/anthropics/skills/pull/1479)
- **功能**：解决长期项目中 `PLAN.md` 等规划产物不断堆积、无生命周期管理的问题。
- **讨论热点**：社区将其视为“Agent 工作区卫生”问题，讨论了归档/清理/优先级降级的具体规则。
- **状态**：Open

### ⑧ skill-quality-analyzer + skill-security-analyzer — 技能质量与安全元工具
[PR #83](https://github.com/anthropics/skills/pull/83)
- **功能**：对 Claude Skill 进行五维质量评分（结构/文档/示例/资源等），以及安全风险分析。
- **讨论热点**：社区对安全分析器呼声较高，与 #492 的安全信任问题直接相关。
- **状态**：Open

---

## 2. 社区需求趋势

从高热度 Issues 中提炼的社区核心诉求：

- **安全与信任边界**（[#492](https://github.com/anthropics/skills/issues/492)）：社区技能被分发在 `anthropic/` 命名空间下，造成“官方感”伪装，引发权限越权风险。这是当前讨论最激烈的话题（43 条评论）。
- **组织级技能分享**（[#228](https://github.com/anthropics/skills/issues/228)）：企业用户希望突破“下载 .skill 文件 → 手动上传”的低效路径，直接实现组织内技能库/链接分享。
- **技能的“元工具”需求**：多个 issue 直指 skill-creator 自身缺陷（[#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169)），社区不仅需要新 Skill，还需要高质量、可评估、可调试的 Skill 开发基础设施。
- **Agent 治理与审计**：出现了明确的技能提案，如 [agent-governance（#412）](https://github.com/anthropics/skills/issues/412)（策略执行、威胁检测、审计日志）和 [推理质量门管线（#1385）](https://github.com/anthropics/skills/issues/1385)（预任务校准→对抗评审→交付验证）。
- **上下文窗口效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 指出 `claude-api` 技能单次注入约 156k tokens 导致窗口耗尽，社区开始关注技能体积的“瘦身”与按需加载。
- **与 MCP 生态融合**（[#16](https://github.com/anthropics/skills/issues/16)）：希望将 Skills 暴露为标准 MCP API，以统一智能体软件接口。
- **记忆与状态压缩**（[#1329](https://github.com/anthropics/skills/issues/1329)）：长时运行 Agent 需要紧凑的符号化记忆表示，而非冗长散文式笔记。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、问题聚焦，且当前无重大反对意见，具备近期合并潜力：

- [fix(skill-creator): run_eval.py always reports 0% recall — #1298](https://github.com/anthropics/skills/pull/1298)  
  **关键性最高**：直接修复描述优化循环“在噪声上优化”的核心 bug，关联 #556、#1169 等多个独立复现。

- [fix(pdf): correct case-sensitive file references in SKILL.md — #538](https://github.com/anthropics/skills/pull/538)  
  改动极小（8 处大小写引用），但会导致大小写敏感系统集成失败，属于低成本高收益修复。

- [fix(docx): prevent tracked change w:id collision with existing bookmarks — #541](https://github.com/anthropics/skills/pull/541)  
  解决 OOXML 共享 ID 冲突导致的文档损坏，直接影响现有 DOCX 技能的可靠性。

- [Add document-typography skill — #514](https://github.com/anthropics/skills/pull/514)  
  功能独立、无依赖争议，被社区广泛认为是“每个 AI 文档生成工作流都需要的技能”。

- [Add testing-patterns skill — #723](https://github.com/anthropics/skills/pull/723)  
  内容全面且贴近日常开发，评论活跃度排名前列，合并后可直接缓解 AI 生成测试质量参差问题。

- [Add self-audit skill — #1367](https://github.com/anthropics/skills/pull/1367)  
  通用质量门框架，契合社区对 Agent 输出可控性的持续关注，讨论热度高且未出现结构性反对。

---

## 4. Skills 生态洞察

> 当前社区最集中的诉求是：**完善 Skills 开发闭环（评估、调试、质量/安全分析）与建立安全、可共享、可治理的生态机制**——即让“创建高质量 Skill”本身成为一项可信赖的工程，而非零散的手工内容堆砌。

---

# Claude Code 社区动态日报 — 2026-08-10

## 今日速览

今日社区最热议题集中在 Windows 平台的稳定性问题：控制台窗口闪烁（#14828）以 53 条评论、36 个 👍 位居榜首。另一个高关注点是跨目录恢复会话的需求（#28745，76 👍），表明用户对会话可移植性有强烈诉求。此外，新报告的 macOS 后台任务被 30 分钟定时 SIGTERM 的严重缺陷（#84981）值得关注，涉及静默 kill 路径。

## 社区热点 Issues

### 1. Windows: 执行工具时控制台窗口闪烁
**#14828** | 评论 53 | 👍 36 | [链接](https://github.com/anthropics/claude-code/issues/14828)

> Windows 平台下每次执行工具时控制台窗口闪烁，影响开发流程度。这是目前评论数最高的 Issue，说明大量 Windows 用户受影响。

### 2. 允许从不同目录恢复会话
**#28745** | 评论 11 | 👍 76 | [链接](https://github.com/anthropics/claude-code/issues/28745)

> 会话与启动目录绑定，如果原目录被删除或重命名（如 git worktree 变更），会话将无法恢复。76 个 👍 是今日需求类 Issue 中最高的，反映用户对会话迁移能力的迫切需求。

### 3. UI 语言本地化支持
**#31413** | 评论 13 | 👍 8 | [链接](https://github.com/anthropics/claude-code/issues/31413)

> 社区请求为 Claude Code UI 增加多语言支持，便于非英语开发者使用。

### 4. Workflow 工具将 JSON 参数作为字符串传递
**#72248** | 评论 10 | 👍 1 | [链接](https://github.com/anthropics/claude-code/issues/72248)

> 当 Workflow 工具被传入 JSON 对象/数组作为 args 时，workflow 脚本收到的却是 JSON 编码的字符串，与文档宣称的 "verbatim" 契约相悖。

### 5. Windows: 隐藏的 Browser-pane 预览通过代码完整性阻止导致应用崩溃
**#80999** | 评论 9 | 👍 4 | [链接](https://github.com/anthropics/claude-code/issues/80999)

> 包内含签名的 vk_swiftshader.dll 触发 Code Integrity 阻止，导致 Desktop 崩溃并弹出"修复"对话框。企业托管设备（CrowdStrike、VBS/HVCI 等）更容易复现。

### 6. 后台任务被精确的 30 分钟内部定时器 SIGTERM
**#84981** | 评论 6 | 👍 0 | [链接](https://github.com/anthropics/claude-code/issues/84981)

> macOS CLI 长会话中，`run_in_background: true` 的 Bash 任务在精确 1800.000 秒后被引擎 SIGTERM，无 TaskStop 通知，退出码 144。这是文档未记载的 kill 路径，可能影响长时间运行的自动化任务。

### 7. 复制终端输出包含硬换行符
**#48037** | 评论 5 | 👍 16 | [链接](https://github.com/anthropics/claude-code/issues/48037)

> 从终端复制文本时，剪贴板中每一行末尾都带有硬换行，与终端宽度对齐，导致粘贴后段落结构错乱。

### 8. 标签语法解析器静默吸收参数块，造成 6.2% 字段丢失
**#84362** | 评论 5 | 👍 0 | [链接](https://github.com/anthropics/claude-code/issues/84362)

> 当模型输出不匹配/损坏的闭合标签时，解析器将后续参数块静默吸收到前面字符串字段中，导致参数丢失且调用"成功"。在参数密集的 MCP 调用上实测约 6.2% 静默字段丢失——比报错更危险。

### 9. 会话限制警告不通知 agent，后台工作流继续消耗配额
**#77582** | 评论 5 | 👍 0 | [链接](https://github.com/anthropics/claude-code/issues/77582)

> `/effort ultracode` 启动含 14 个子代理的 Workflow 后，会话限制警告出现但 agent 无法感知，后台工作流继续消耗配额。

### 10. 跨平台同步失败导致 Cowork 会话消失
**#81658** | 评论 5 | 👍 3 | [链接](https://github.com/anthropics/claude-code/issues/81658)

> Desktop/Web/Android 之间的同步故障导致会话与聊天记录丢失，疑似服务端事件。

## 重要 PR 进展

### 1. security-guidance: 默认模型引用从 Opus 4.7/Sonnet 4.6 更新至 Opus 5/Sonnet 5
**#85409** | [链接](https://github.com/anthropics/claude-code/pull/85409)

> 更新 security-guidance 插件 README 与 hook 代码中过期模型引用（默认审查模型与备用模型），对齐当前 Opus 5 / Sonnet 5。

### 2. fix(plugin-dev): 解析 block scalar agent 描述
**#85323** | [链接](https://github.com/anthropics/claude-code/pull/85323)

> 修复 #83803 中剩余的 YAML block-scalar 解析缺陷：`validate-agent.sh` 现在按缩进内容测量多行 `description: |` / `description: >`，不再把标量标记当作整个描述。

### 3. fix(skills): 使用符合规范的名称
**#85243** | [链接](https://github.com/anthropics/claude-code/pull/85243)

> 8 个内置 skill 声明了 Title Case 且含空格 `name` 字段，违反规范。涉及 plugin-dev 和 hookify 技能中的 `writing-rules`、`agent-development` 等。

### 4. 添加 agent-session-commit 插件增量迭代 AGENTS.md
**#17395** | [链接](https://github.com/anthropics/claude-code/pull/17395)

> 新增插件支持手动 `/session-commit` 或 Stop hook 自动触发，将 ChatGPT/Claude Code 的一次会话沉淀为 AGENTS.md 增量更新。

### 5. docs: 强制 task tool 与模型元数据
**#9262** | [链接](https://github.com/anthropics/claude-code/pull/9262)

> 文档更新：在 commit 命令文档中通过 `model` 参数记录 claude-3-5-haiku-latest 模型，并强制在 commit 工作流中使用 Task 工具以确保上下文隔离。

## 功能需求趋势

- **会话管理增强**：跨目录恢复会话（#28745）、ListAgents 暴露 session ID / SendMessage 接受 session ID 作为地址（#85160）、fork 会话后正确附加新标签页（#85008）——用户在追求更灵活的会话生命周期。
- **UI/可访问性**：UI 多语言本地化（#31413）、自定义 slash 命令支持调用其他 slash 命令（#85429）。
- **数据安全与防误删**：固定会话防止归档/删除（#62104）、30 天保留策略不应删除唯一副本（#81100）。
- **缓存与性能优化**：PreToolUse/PostToolUse 的 additionalContext 变化导致 prompt cache 失效（#83913）、全屏模式下终端整窗延迟（#84712）。

## 开发者关注点

- **Windows 平台问题集中爆发**：控制台闪烁（#14828）、Browser-pane 崩溃（#80999）、MSIX 包崩溃后需手动卸载导致本地数据丢失（#81306）、IME 混合输入后 Enter 键失灵（#83762）——Windows 用户在稳定性上感知明显。
- **静默失败比报错更可怕**：tag 语法解析器静默吞参（#84362）、PreToolUse hooks 静默不触发（#85430）、30 分钟定时 SIGTERM 无通知（#84981）——开发者希望任何数据丢失或中断都有明确信号。
- **成本控制盲区**：会话限制警告无法传达到 agent，后台 Workflow 继续消耗配额（#77582）——高并发子代理场景下成本不可控。
- **跨平台体验一致性**：Desktop/Web/Android 同步失败（#81658）、Desktop 保留策略删除 transcripts（#81100）、GitHub Integration 写操作全部 403（#80874）——多端协作的可靠性受质疑。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-10

## 今日速览

过去 24 小时无正式版本发布，但 PR 活动密集，其中 **`apply_patch` 行结尾保留功能**的两项 PR（#37757、#37758）正式合入，直接回应了 Windows 平台历史热门 Issue #4003。社区讨论同时集中在 **Codex Desktop 会话记忆可靠性**（#21128）与 **Windows 扩展资源加载失败**（#37458）两个新焦问题上。

## 社区热点 Issues

### 1. #4003 Windows 混合行结尾问题（已关闭）  
👍 74 | 💬 33 | [链接](https://github.com/openai/codex/issues/4003)  
Windows 上 `apply_patch` 不保留原有行结尾，导致文件被强制转换为 LF，影响面极广。该 Issue 今日因 #37757/#37758 两项修复 PR 合入而关闭，社区等待后续版本验证修复效果。

### 2. #21128 Codex Desktop 静默隐藏项目会话  
👍 21 | 💬 34 | [链接](https://github.com/openai/codex/issues/21128)  
超出全局"最近 50 条"窗口的旧项目会话会从 UI 中消失，使 Desktop 无法作为真实项目的工作记忆。评论量大，说明用户对会话数据可达性高度敏感。

### 3. #37458 Codex 扩展资源加载失败  
👍 0 | 💬 26 | [链接](https://github.com/openai/codex/issues/37458)  
Windows + VS Code 1.132 下扩展面板直接报错 "The extension couldn't load its resources"。8 月 7 日创建即获 26 条评论，突发性高、影响开发者日常使用。

### 4. #12098 扩展标签页并行会话接口  
👍 60 | 💬 22 | [链接](https://github.com/openai/codex/issues/12098)  
请求在 VS Code 扩展中提供标签式多会话 UI，避免每次切换都要打开会话列表。60 个 👍 显示这是 IDE 用户体验的核心诉求。

### 5. #35097 gpt-5.6-luna 模型 MultiAgent 兼容性错误  
👍 50 | 💬 20 | [链接](https://github.com/openai/codex/issues/35097)  
CLI 将 `gpt-5.6-luna` 标记为 MultiAgent V1，导致 V2 的 `spawn_agent` 直接拒绝该模型。模型演进与 Agent 框架版本间的兼容问题引起高关注。

### 6. #11011 线程切换极慢  
👍 19 | 💬 22 | [链接](https://github.com/openai/codex/issues/11011)  
更新后 Desktop 切换线程出现明显卡顿和延迟响应。性能退化问题在用户中引发共鸣。

### 7. #20951 支持全编辑器标签页打开会话  
👍 37 | 💬 14 | [链接](https://github.com/openai/codex/issues/20951)  
希望像 Claude Code 一样将会话作为 VS Code 编辑器标签打开。与 #12098 互为补充，共同指向 IDE 会话管理体验的改良诉求。

### 8. #37013 Windows Computer Use 复用过期执行上下文  
👍 4 | 💬 12 | [链接](https://github.com/openai/codex/issues/37013)  
Windows Desktop 的 Computer Use 在首次 JS 执行结束后复用同一个 `node_repl` 传输，导致后续调用失败。暴露 Computer Use 在 Windows 管道的生命周期缺陷。

### 9. #26990 Windows 断电后本地状态丢失  
👍 0 | 💬 12 | [链接](https://github.com/openai/codex/issues/26990)  
电源中断后 pin、项目配置被重置，时间戳回退至未来。数据持久化与崩溃安全在桌面端尚不可靠。

### 10. #37180 Windows Computer Use 审批提示不出现  
👍 6 | 💬 11 | [链接](https://github.com/openai/codex/issues/37180)  
`launch_app` 报 `node_repl exec context not found`，且审批弹窗完全不出现。该问题与 #37013 疑似同源，Windows Computer Use 整体稳定性堪忧。

---

## 重要 PR 进展

今日共 8 个 PR 更新，其中 7 个已合入。以下为全部 PR：

### 1. #37758 为 apply_patch 添加行结尾保留 Feature Flag（已合入）  
[链接](https://github.com/openai/codex/pull/37758)  
新增默认关闭的 `apply_patch_preserve_line_endings` 开关，统一应用于内置 patch 处理和外部 patch 工具。与 #37757 配套，是 #4003 的核心修复。

### 2. #37757 apply_patch 行结尾保留模式（已合入）  
[链接](https://github.com/openai/codex/pull/37757)  
提供 `PreserveLineEndings` 更新模式，修复 `apply_patch` 历史上将文件统一为 LF 的行为。默认关闭，为兼容性留有余地。

### 3. #37773 转发远程插件安装尝试 ID（已合入）  
[链接](https://github.com/openai/codex/pull/37773)  
在 `PluginInstallParams` 中新增可选 `installAttemptId`，使客户端能将远程插件安装请求关联到具体安装尝试。

### 4. #37747 限制 Cursor 项目路径解析范围（已合入）  
[链接](https://github.com/openai/codex/pull/37747)  
修复 Cursor 项目名中编码的工作目录解析会递归扫描大型目录树的问题。改为基于常见分隔符的有界路径候选探测，性能与安全双赢。

### 5. #37745 code-mode host 支持 gRPC TCP 传输（已合入）  
[链接](https://github.com/openai/codex/pull/37745)  
`--listen` 现接受 `grpc://IP:PORT`，支持通过 TCP 提供 gRPC 服务，绑定端口 0 时向 stdout 打印实际端口。

### 6. #37723 会话配置导入失败时输出 I/O 错误子类型（已合入）  
[链接](https://github.com/openai/codex/pull/37723)  
将 `std::io::ErrorKind` 分类（如 `invalid_data`、`not_found`、`permission_denied`）附加到 `failed_to_load_session_config` 错误子类型，大幅提升诊断精度。

### 7. #37709 修复 TUI composer 包裹空白符位置（已合入）  
[链接](https://github.com/openai/codex/pull/37709)  
溢出空白不再单独占用一行，而是跟随后续文本换行。采用 grapheme-safe 的包裹算法，改善 TUI 排版细节。

### 8. #31817 自动更新 models.json（开放中）  
[链接](https://github.com/openai/codex/pull/31817)  
由 GitHub Actions 自动提交的模型列表更新。持续跟进此 PR 可掌握新模型支持状态。

---

## 功能需求趋势

- **IDE 会话管理增强**：#12098（标签页并行会话）、#20951（全编辑器标签页）表明社区强烈希望会话以更直观、低摩擦的方式呈现，与 IDE 原生交互模式结合。
- **Windows 平台稳定性补强**：#4003、#37458、#34889、#26803 等问题在 Windows 上集中爆发，涉及行结尾、沙箱 ACL、扩展加载、WSL 集成等多个底层环节。
- **模型与运行时兼容性**：#35097 反映出 MultiAgent V1/V2 的模型标记问题，社区对模型演进与工具链同步的敏感度较高。
- **性能与资源管理**：#11011（切换慢）、#37398（5 秒 owner-discovery 超时）、#36428（/tmp 临时文件不清理）等指向桌面端与 CLI 的效率和资源占用痛点。
- **Computer Use 跨平台成熟度**：macOS 与 Windows 均有多起 Computer Use 相关故障（#37013、#37180、#24437、#37326），该功能仍处于打磨期。

## 开发者关注点

- **Windows 用户体验缺口明显**：行结尾、沙箱权限、扩展加载、WSL 终端异常等高频问题导致 Windows 社区活跃度上升，修复优先级应继续向该平台倾斜。
- **会话数据可靠性**：项目会话被静默裁剪、断电后配置重置等问题使开发者对 Desktop 的"工作记忆"能力产生信任危机，数据持久化是当前最大信任短板。
- **apply_patch 行结尾修复进入落地阶段**：#4003 关闭 + #37757/#37758 合入是今日最重要的进展，但默认关闭意味着用户需显式开启该 feature flag，社区期望默认行为也能逐步修正。
- **性能退化比缺功能更敏感**：线程切换变慢 (#11011)、固定 5 秒等待 (#37398)、启动 OOM (#32192) 等问题的反馈密度显示，性能回退对开发者体验的伤害高于功能缺失。
- **远程与多端联动是下一步关注点**：远程插件安装关联 (#37773)、iOS 远程工具图片丢失 (#35371)、远程配对超时 (#37698) 显示跨设备协作场景正成为社区新兴趣点。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-10** | 数据来源：github.com/google-gemini/gemini-cli

---

## 今日速览

今日发布夜间版 `v0.56.0-nightly.20260810.gcf22ac7e8`（暂无详细更新说明）。社区讨论焦点集中在**Agent 稳定性**上：多个 P1 级问题持续活跃——子代理在达到 MAX_TURNS 后被误报为成功（#22323）、Generalist Agent 无限挂起（#21409）、shell 命令执行完毕后卡死（#25166）。PR 侧则出现两个值得关注的实质修复：ACP 会话恢复污染修复（#28744）与"允许 Agent 调用 Agent"的递归委托实现（#28738）；此外，官方一次性合入 74 项 npm 依赖更新（#28746），预示近期会有较大版本整合动作。

---

## 版本发布

### v0.56.0-nightly.20260810.gcf22ac7e8
- 发布类型：Nightly 自动构建
- 相比 20260809 版本未提供详细更新说明
- 🔗 [查看完整 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)

---

## 社区热点 Issues

挑选自过去 24 小时更新的 50 条 Issue，按优先级、评论量与社区关注度排序，共 10 条：

### 1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [P1] 子代理 MAX_TURNS 恢复被误报为 GOAL 成功，中断被隐藏
- **评论** 12 | 👍 2 | 创建于 2026-03-13
- **分析**：`codebase_investigator` 子代理在未做任何分析就达到最大轮次时，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`。这会直接误导用户信任一个实际已中断的结果，亟需修正 agent 状态报告的准确性。

### 2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [P1] Generalist Agent 无限期挂起
- **评论** 8 | 👍 8（今日 👍 数最高）| 创建于 2026-03-06
- **分析**：只要委托给 generalist agent 就会永久挂起，即使是创建文件夹这样的简单操作，用户最长等待 1 小时无结果。社区关注度极高，属于高频 P1 稳定性问题。

### 3. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [P1] shell 命令执行完成后卡在 "Waiting input"
- **评论** 4 | 👍 3 | 创建于 2026-04-11
- **分析**：极简 CLI 命令（不会请求输入的）执行完毕后，终端仍显示命令活动并等待输入。严重影响自动化流程。被标记为 effort/medium，是当前可靠性核心问题之一。

### 4. [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) [P1] 组件级评估（Component Level Evaluations）基础设施建设
- **评论** 7 | 创建于 2026-03-31
- **分析**：EPIC 型 Issue，在已有 76 个行为评估测试的基础上，要求建立覆盖 6 个受支持 Gemini 模型的稳健组件级评估体系。反映官方对 agent 质量回归的重视。

### 5. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) [P1] Browser 子代理在 Wayland 环境下失败
- **评论** 4 | 👍 1 | 创建于 2026-03-11
- **分析**：浏览器子代理在 Wayland 图形协议下执行失败。影响 Linux 用户中的 Wayland 使用者，且直接关联浏览器 Agent 跨平台兼容能力。

### 6. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) [P1] get-shit-done 输出钩子在打印用户摘要时触发崩溃
- **评论** 3 | 创建于 2026-03-12
- **分析**：`get-shit-done` 接近完成（打印用户摘要阶段）时反复崩溃，属于高优功能性缺陷，阻碍关键流程完成。

### 7. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) [P2] 零依赖 OS 沙箱与执行后意图路由，发挥模型的 bash 原生能力
- **评论** 8 | 👍 1 | 创建于 2026-02-22
- **分析**:Gemini 3 模型本质上擅长链式使用 `grep`/`sed`/`awk` 等 POSIX 工具，该提案希望在不牺牲安全性的前提下，通过轻量沙箱让模型自由运用这一能力。被标记为 effort/large，是方向性很强的增强设计。

### 8. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [P2] 评估 AST 感知文件读取、搜索与代码库映射的价值
- **评论** 7 | 👍 1 | 创建于 2026-03-16
- **分析**：EPIC 跟踪多项调研：AST 感知工具可更精准定位方法边界、减少因错位读取产生的 token 噪声，并优化代码库导航。附 #22746 提议从 `tilth`/`glyph` 等方案着手。

### 9. [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) [P2] 停止 Auto Memory 对低信号会话的无限重试
- **评论** 5 | 创建于 2026-05-05
- **分析**：Auto Memory 的后台提取 Agent 只会标记成功 `read_file` 的会话，对低价值会话会反复重试暴露，浪费资源。社区希望引入"放弃并沉淀"机制。关联 #26516 记忆系统质量系列。

### 10. [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) [P2] 自 v0.33.0 起子代理未经授权被自动调用
- **评论** 3 | 创建于 2026-03-11
- **分析**：用户在多份配置中已禁用 Agents 模式，但升级 v0.33.0 后 generalist 等子代理仍被自动调用。属于权限回归，引发对配置一致性与 agent 调用边界的担忧。

---

## 重要 PR 进展

挑选自过去 24 小时更新的 25 条 PR，涵盖功能修复与依赖升级，共 10 条：

### 1. [#28744](https://github.com/google-gemini/gemini-cli/pull/28744) [P1][area/core] fix(acp)：恢复会话前不再启动新对话，避免污染会话文件
- **关联修复**：#28693
- **说明**：原 `loadSession` 会在 `resumeChat()` 前调用 `initialize()`，导致先启动了一个空会话再恢复历史数据，污染 session 文件。该 PR 调整初始化顺序，确保恢复操作语义正确。

### 2. [#28624](https://github.com/google-gemini/gemini-cli/pull/28624) [P2][area/agent] fix(core)：禁止布尔 thought 字段泄漏为 `[Thought: true]` 文本
- **关联修复**：#23525
- **说明**：修复内部 `thought: true` 布尔字段被错误渲染到模型思考文本的问题，提升输出可读性与 API 一致性。

### 3. [#28738](https://github.com/google-gemini/gemini-cli/pull/28738) [P2][area/agent] 允许 Agent 调用 Agent（递归委托）
- **关联修复**：#22092 | 标记：help wanted
- **说明**：通过 `tools:` frontmatter 让子代理可委托给其他子代理或递归调用自身。将大幅提升 agent 系统的任务分解深度与灵活性，属于架构级能力增强。

### 4. [#28743](https://github.com/google-gemini/gemini-cli/pull/28743) [area/agent] fix(core)：保留 resolved config 中的 systemInstruction 与 tools
- **说明**：修复 `GeminiChat.sendMessageStream()` 在获取模型专属配置后，`systemInstruction` 与 `tools` 被会话级默认值覆盖的问题，保证模型配置的完整传递。

### 5. [#28746](https://github.com/google-gemini/gemini-cli/pull/28746) [dependencies][size/xl] chore(deps)：npm-dependencies 组 74 项依赖批量更新
- **说明**：一次性整合 74 个 npm 包升级，覆盖 `simple-git`（3.28→3.36）、`@modelcontextprotocol/sdk`（1.23→1.30）等核心依赖。规模较大，需要关注回归风险。

### 6. [#28752](https://github.com/google-gemini/gemini-cli/pull/28752) [dependencies][size/l] chore(deps)：puppeteer-core 24.0.0 → 25.4.0
- **说明**：Puppeteer 跨大版本升级。浏览器自动化能力跟随上游同步更新，可能带来新的 API 行为变化。

### 7. [#28749](https://github.com/google-gemini/gemini-cli/pull/28749) [dependencies] chore(deps)：@google/genai 1.30.0 → 2.15.0
- **说明**：官方 GenAI JS SDK 跨版本升级（1.x → 2.x），可能涉及模型调用 API 变更，对 CLI 核心能力有直接关联。

### 8. [#28747](https://github.com/google-gemini/gemini-cli/pull/28747) [dependencies] chore(deps)：@a2a-js/sdk 0.3.11 → 1.0.1
- **说明**：Agent-to-Agent（A2A）SDK 达到 1.0 稳定版。作为 Agent 间通信的基础依赖，此次升级可能为后续 A2A 能力铺路。

### 9. [#28450](https://github.com/google-gemini/gemini-cli/pull/28450) [dependencies][github_actions] chore(deps)：Actions 依赖组 3 项更新
- **说明**：更新 CI 侧 `lycheeverse/lychee-action`、`preactjs/compressed-size-action` 与 `google-github-actions/run-gemini-cli`，维护自动化基础设施健康。

### 10. [#28758](https://github.com/google-gemini/gemini-cli/pull/28758) [size/s] chore/release：版本 bump 至 v0.56.0-nightly.20260810.gcf22ac7e8
- **说明**：自动版本 bump PR，对应今日夜间版发布，保证每日构建版本可溯源。

---

## 功能需求趋势

对过去 24 小时活跃的 50 条 Issue 进行议题聚类，社区最关注的五大方向：

1. **Agent 稳定性与可靠性（P1 核心诉求）**
   多起 P1 问题均与"挂起、卡死、误报"有关（#22323、#21409、#25166、#21983、#22186）。社区最直接的诉求是：**agent 要么完成任务，要么明确报告失败，绝不能静默挂起或谎报成功**。

2. **子代理自主性与权限边界**
   包括 #21968（Gemini 不主动使用 skills/sub-agents）、#22093（禁用后仍被调用）、#21432（Agent 对自己 CLI 能力不自知）。方向是让子代理更聪明，但同时尊重用户权限配置。

3. **安全与沙箱**
   围绕 #19873 的零依赖 bash 沙箱、#22672 的破坏性命令拦截、#26525 的 Auto Memory 内容预先编辑。社区关注如何让 agent 在拥有更强系统操作能力时，仍保持安全可控。

4. **AST 感知代码智能**
   #22745 与 #22746 共同指向：让工具链更懂代码结构——精确读取方法边界、减少 token 消耗、提升代码库搜索效率。这可能是未来版本的重要能力分水岭。

5. **记忆系统治理**
   Auto Memory 系列（#26522、#26523、#26516）集中反映后台自动提取存在"无限重试低价值内容、无效补丁静默跳过、日志过度冗长"等问题。社区需要更可观测、可干预的记忆管道。

---

## 开发者关注点

从今日活跃反馈中提炼出以下高频痛点：

| 痛点领域 | 具体表现 | 关联 Issue |
|---|---|---|
| **诡异的卡死状态** | generalist agent 挂起、shell 执行完成后仍 "Waiting input"、get-shit-done 收尾崩溃 | #21409、#25166、#22186 |
| **状态报告不可信** | MAX_TURNS 被误报成功；`/bug` 报告缺失子代理上下文 | #22323、#21763 |
| **配置被无视** | 子代理在禁用后仍被调用；Browser Agent 忽略 `settings.json` 覆盖；symlink 不被识别为 agent | #22093、#22267、#20079 |
| **Agent 不够「自驱」** | 不会主动使用自定义 skills 与子代理，必须显式指示 | #21968、#21432 |
| **破坏性操作风险** | 模型偏好 `git reset`、`--force` 等高风险命令；常在工作区乱建临时脚本 | #22672、#23571 |
| **工具规模瓶颈** | 超过 128 个工具时触发 400 错误，缺少智能裁剪 | #24246 |
| **依赖升级压力** | 74 项 npm 依赖 + 多个跨大版本更新同时合入，需警惕回归 | #28746、#28752、#28749 |

> **总结**：今日社区情绪集中在"稳定性"与"可控性"两端。一方面，多个 P1 挂起/误报类问题长期未决，已显著消耗用户信任；另一方面，AST 感知、Agent 递归委托、沙箱执行等方向性 PR 正在积极演进，有望在后续版本中从底层改善体验。建议关注 `#28738`（Agent 调用 Agent）的合并进度，以及 Auto Memory 系列问题的后续修复。

---
*本日报由 AI 技术分析师自动整理，数据截至 2026-08-10。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-10）

## 今日速览

过去 24 小时 Copilot CLI 无新版本发布、无 PR 合入，但 Issue 区相当活跃（26 条更新）。最突出的动态是：**① Claude 系列模型在 Enterprise/组织账户中集体不可用或从模型目录消失**（#4390、#4422），触发多起企业用户报告；**② MCP 可靠性问题集中爆发**——初始化握手 60 秒硬超时无重试（#4421）、managed settings 临时策略误杀用户 MCP server（#4419）、FastMCP 兼容性失败（#4370）；**③ 8 月 9-10 日新提交 14 个 triage Issue**，覆盖会话 5 MB 上限不可恢复、kickoff prompt 静默丢失、并行工具调用错乱、子代理限流等，显示社区对核心工作流稳定性的诉求明显上升。

## 社区热点 Issues

**1. [input-keyboard] 允许用户取消或删除已排队的消息** — #1857
链接: https://github.com/github/copilot-cli/issues/1857
26 👍 / 9 评论，当前关注度最高且历史最久的功能请求（3 月创建）。agent 忙碌或执行 `/compact` 时，通过 Ctrl+Q/Ctrl+Enter 排队的消息无法撤回，只能被动等待执行。社区对"排队队列的可控性"需求强烈。

**2. [agents/enterprise] `/remote` 在组织仓库报 "could not resolve repository"** — #2751
链接: https://github.com/github/copilot-cli/issues/2751
13 👍 / 8 评论。v1.0.28 中 `/remote` 无法在 GitHub Organization 仓库中工作，直接影响企业用户的远程会话能力，已持续近 4 个月未解决。

**3. [models] 组织已启用模型未出现在有效目录（Claude Sonnet 5/Opus 5、Kimi K3）** — #4390
链接: https://github.com/github/copilot-cli/issues/4390
Copilot Business 组织显式启用的 Anthropic 模型与 Kimi K3 在 CLI 中不可用，选择 `claude-sonnet-5` 报 "This model is disabled"。与 #4422 相互印证，指向模型目录同步或权限判定缺陷。

**4. [triage] CLI 模型选择中所有 Claude 模型被禁用** — #4422
链接: https://github.com/github/copilot-cli/issues/4422
8 月 9 日新报：个人 Enterprise 账户"昨日可用、今日全部提示 disabled"，回滚 CLI 版本无效，疑似服务端配置问题。影响面大且突发性强，是企业用户最敏感的一类回归。

**5. [agents/tools] 子任务（Subtask）卡死无响应** — #4306
链接: https://github.com/github/copilot-cli/issues/4306
autopilot 模式下 `/fleet use speckit-automate implement skill` 多 agent 循环协作时，子任务中途冻结，会话挂起。涉及 agent 编排可靠性，对重度自动化用户影响严重。

**6. [triage] `/compact` 无法恢复超过 5 MB CAPI 负载上限的会话** — #4424
链接: https://github.com/github/copilot-cli/issues/4424
会话达到 5 MB 请求限制后，正常提示失败尚可理解，但 `/compact` 同样失败，导致**会话完全不可恢复、直接报废**。对长会话用户是"致命级"缺陷，今日新提交。

**7. [triage] MCP 初始化握手固定 60 秒超时、无重试、不可配置** — #4421
链接: https://github.com/github/copilot-cli/issues/4421
报告称 npx 启动的 stdio MCP server **约 29% 的会话初始化失败**，失败后整个会话内不再重生该 server。无重试、无退避、超时不可调，属于 MCP 稳定性的系统性问题。

**8. [triage] 并行工具调用响应顺序不确定，导致 bot 上下文错乱** — #4420
链接: https://github.com/github/copilot-cli/issues/4420
并行工具调用时请求与响应关联不可靠：可能出现"无请求的响应"或乱序返回，agent 无法判断结果对应哪个调用。这是并行执行架构下的核心正确性 bug。

**9. [triage] 并行 explore 子代理扇出触发单模型 429 限流** — #4416
链接: https://github.com/github/copilot-cli/issues/4416
所有 explore 子代理默认使用同一轻量模型（claude-haiku-4.5），并行扇出时集中打爆该模型突发限额；无退避、不会自动切换模型（尽管标注了 `eligibleForAutoSwitch`）。

**10. [plugins] `sessionStart` hook 在 .github/hooks/ 中不触发** — #1730
链接: https://github.com/github/copilot-cli/issues/1730
插件体系的基础能力失效：`.github/hooks/*.json` 中定义的 `sessionStart` 钩子在 v0.0.420 中不执行（Windows 11 + PowerShell 7 复现）。7 条评论讨论，影响 hook 生态建设。

## 重要 PR 进展

过去 24 小时无 PR 更新或合入（共 0 条）。建议关注上述 Issue 的修复进展，尤其是 #4390/#4422（模型可用性）和 #4421/#4419（MCP 稳定性）两个集群。

## 功能需求趋势

1. **MCP 生态成熟度**：OAuth 3LO 授权码支持（#4371）、初始化握手可配置超时与重试（#4421）、managed settings 过渡策略优化（#4419）、FastMCP 兼容（#4370）、Enterprise 下 github-mcp-server 认证修复（#4408）——MCP 已成 CLI 一等公民，但初始化、认证、策略三层短板集中暴露，社区对其稳定性预期正在提高。

2. **模型可用性与路由控制**：组织模型目录同步（#4390/#4422）、BYOK 自定义 provider（#4414）、Auto-mode 模型强度范围可调（#4412）、子代理模型自动切换/退避（#4416）——用户希望更细粒度地控制模型路由，并要求服务端配置变更即时生效。

3. **会话生命周期可靠性**：5 MB 上限下 `/compact` 可恢复（#4424）、kickoff prompt 不丢失（#4423）、`session.resume` 元数据正确重放（#4413）、子任务不冻结（#4306）——长会话、多 agent 场景成为主流后，会话管理从"能用"迈向"必须可靠"。

4. **远程会话边界扩展**：`/remote` 支持组织仓库（#2751）、支持非 GitHub 托管如 GitLab/Bitbucket（#2922）、远程控制开关状态可见（#4409）——企业用户正在把远程能力推向更多代码托管场景。

5. **终端交互升级**：取消已排队消息（#1857）、内置浮动 GUI 输入器（#4417）、可配置 HUD（#4418）——终端交互层有向"更现代、更友好"演进的明确需求，且有社区第三方方案（copilot-hud）出现。

6. **本地化**：中文（zh-CN）UI 本地化请求（#4407）——标志着 Copilot CLI/桌面端用户群的全球化扩展，非英语用户开始提出界面语言诉求。

## 开发者关注点

- **Claude 模型突发不可用**（#4390/#4422）：企业用户对模型可用性极其敏感，"昨日可用、今日不可用"类回归最影响信任，且回滚版本无法自救，需服务端尽快定位。
- **MCP 接入失败率偏高**：60 秒硬超时 + 无重试（#4421）、临时拒绝策略误杀用户 server（#4419）、`server/discover` 方法不兼容（#4370）——三个独立缺陷叠加，MCP 体验的"最后一公里"仍不稳固。
- **并行执行缺保护**：并行工具调用响应错乱（#4420）+ explore 子代理集中限流（#4416）——并行是双刃剑，当前实现缺少请求关联追踪与限流保护机制。
- **会话数据丢失隐患**：5 MB 上限导致 `/compact` 失效（#4424）、kickoff prompt 静默丢失（#4423）、BYOK 请求被本地 403 拦截（#4414）——创建/恢复路径上仍存在静默失败，错误信息与诊断透明度不足。
- **资源占用异常**：仅等待 sleep 操作时单核 CPU 100%（#4415），异常的资源消耗削弱开发者对 CLI 轻量化的信任。
- **远程会话状态不透明**：`cli_remote_control_enabled` 为 false 时无任何界面提示，桌面端与 GitHub Mobile 均给出模糊的 422 错误（#4409），远程功能的可用性判定需要更清晰的反馈。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-10）

## 1. 今日速览

今日无新版本发布。社区动态集中在两个方向：跨会话记忆系统（`Memory System`）的需求持续发酵（#1283），以及 ACP/print 流式响应在特定场景下静默挂死的可靠性问题（#2598）。此外，一个修复 Google GenAI 与 MCP 工具兼容性的 PR（#739）仍在维护中，值得关注。

## 2. 版本发布

今日无新版本发布。

## 3. 社区热点 Issues

> 说明：按「过去 24 小时更新」过滤，数据源仅收录到 2 条 Issue，无法凑足 10 条，以下列出全部。

### 3.1 #1283 [enhancement] 功能请求：Memory System - 跨会话持久上下文

- **作者/时间**：CatKang，创建于 2026-02-27，更新于 2026-08-10
- **评论/热度**：29 条评论，👍 0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1283
- **核心内容**：请求为 Kimi Code CLI 实现完整的记忆系统，支持跨会话记住上下文、项目模式与用户偏好；包括 AI 管理的自动记忆和用户自定义的手动记忆。
- **为什么重要**：从 2 月创建到 8 月仍保持更新，且评论区有 29 条互动，说明该需求长期存在且社区讨论活跃。持久化上下文是提高 CLI 在复杂项目中有用性的关键能力，也是智能编码工具从“会话式”走向“长期协作”的重要方向。

### 3.2 #2598 ACP/print 流式响应静默挂死：无空闲超时、被顶替轮 partial 不落 wire

- **作者/时间**：ai-agent-workbench，创建于 2026-08-09，更新于 2026-08-09
- **评论/热度**：0 条评论，👍 0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2598
- **核心内容**：kimi CLI 0.34.0 在 ACP 模式下与 api.kimi.com 流式对话时，内容 delta 已全部到达但终端帧（`[DONE]`/finish）始终不来；CLI 没有空闲超时配置，导致 `session/prompt` 无限等待。用户发送下一条消息后，挂死轮被静默顶替，且已流式内容从未写入 `wire.jsonl`（无 `content.part`、无 `usage.record`）。
- **为什么重要**：该问题直接影响 ACP 自动化场景的稳定性与可观测性。0.31.1 只覆盖 Esc 场景，本次是流式结束帧缺失的新漏洞。虽然当前无评论，但问题描述非常具体，涉及协议状态机、超时策略和数据落盘，开发者若使用 ACP 模式需要密切关注。

## 4. 重要 PR 进展

> 说明：过去 24 小时更新记录中仅 1 条 PR，以下为全部。

### 4.1 #739 fix(kosong): 从 Google GenAI 工具参数中剥离 JSON Schema 元数据

- **作者/时间**：xiaoju111a，创建于 2026-01-28，更新于 2026-08-09
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/739
- **功能/修复内容**：修复 Google GenAI provider 与 MCP 工具之间的兼容性问题。当使用 Exa MCP 等包含标准 JSON Schema 元数据字段的工具时，Google GenAI 会报校验错误；本 PR 在工具参数传入前剥离这些元数据，使其符合 Google GenAI 的参数格式要求。
- **状态与影响**：属于长期开放的兼容性修复，关联 Issue #734。对同时使用 MCP 生态和 Google GenAI 模型的用户有价值，但需要关注是否会影响其它 provider 的参数处理逻辑。

## 5. 功能需求趋势

从当前全部 Issues 中提炼出以下两个核心趋势：

- **跨会话记忆与持久上下文**：开发者希望 CLI 能记住项目模式、用户偏好和上下文，而不仅是单次会话。反映 AI 编码工具正向“长期记忆”方向演进。
- **流式传输可靠性与可观测性**：ACP/print 等自动化模式下，开发者要求流式协议必须提供完整结束帧、空闲超时保护，以及部分写入 `wire.jsonl` 的落盘机制，否则自动化流程难以稳定运行。

## 6. 开发者关注点

- **流式挂死问题**：开发者最直接的痛点是“内容已经显示但没有终止信号”，且无超时兜底；后续消息还会覆盖挂死会话，导致诊断数据丢失。
- **调试数据缺失**：`wire.jsonl` 中缺少 `content.part` 和 `usage.record`，让问题难以复现和追踪，说明开发者对审计日志的完整性有较高要求。
- **MCP 工具链兼容性**：Google GenAI provider 对标准 JSON Schema 的校验过于严格，导致 MCP 工具无法直接使用，期望框架层自动清洗参数元数据。
- **网络与状态管理**：跨会话记忆不仅是功能增强，更承载了用户对“CLI 能像 IDE 一样记住项目上下文”的期待；当前缺失该能力，会在频繁切换任务时增加重复描述成本。

---
*本日报基于 GitHub MoonshotAI/kimi-cli 仓库在 2026-08-10 的公开数据生成，仅反映数据源中可见的社区动态。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-10）

## 今日速览

过去 24 小时 OpenCode 无新版本发布，社区焦点集中在 **VS Code 插件稳定性**、**TUI 交互卡顿**与**桌面端启动性能**等方向。Issue 侧讨论热度最高的是“粘贴附图片”（#906）与“VS Code 插件安装说明不明确”（#10517）；PR 侧核心维护者与外部贡献者共同推进了 `/handoff` 命令、**对话框焦点管理**及**实验性渲染性能优化**等多项工作。

## 社区热点 Issues

### 1. 粘贴附图片功能请求 — Issue #906
- **热度**：37 评论 / 22 👍 ✅ Closed
- **要点**：用户希望像 `excalidraw` 工作流一样，直接将剪贴板中的 PNG 图片粘贴到对话中，而不是仅支持拖拽上传。
- **意义**：该需求获得社区高共鸣，是 OpenCode 对话体验与多模态输入能力的关键缺口。
- **链接**：[#906](https://github.com/anomalyco/opencode/issues/906)

### 2. VS Code 插件安装说明不清晰 — Issue #10517
- **热度**：7 评论 / 24 👍 ✅ Closed
- **要点**：用户按文档尝试自动安装插件，但 `code` 命令可用、shell 已切换仍无法成功安装；手动安装也存在扩展命名模糊的问题。
- **意义**：VS Code 集成是 OpenCode 最常用的前端之一，文档与安装流程的模糊性直接影响新用户上手。
- **链接**：[#10517](https://github.com/anomalyco/opencode/issues/10517)

### 3. Web UI 无法浏览默认用户目录以外的文件夹 — Issue #6490
- **热度**：11 评论 / 13 👍 ✅ Closed
- **要点**：Windows 下通过 `opencode web` 添加项目时，只能看到 Downloads、Contacts 等系统目录，无法手动输入或选择 `D:\code\python` 等自定义路径。
- **意义**：Windows 用户高频阻塞问题，直接影响 Web 端项目初始化体验。
- **链接**：[#6490](https://github.com/anomalyco/opencode/issues/6490)

### 4. 新增 Kiro Provider 支持 — Issue #26680
- **热度**：3 评论 / 13 👍 ✅ Closed
- **要点**：Kiro 已支持通过 `KIRO_API_KEY` 进行 API Key 认证，建议作为可选 provider 加入 OpenCode。
- **意义**：社区对新模型/新服务商接入保持持续需求，Kiro 是继 Gab.AI（#30621）后又一被请求的 provider。
- **链接**：[#26680](https://github.com/anomalyco/opencode/issues/26680)

### 5. TUI 权限对话框状态陈旧：回车确认无效 — Issue #28312
- **热度**：4 评论 / 2 👍 ✅ Closed
- **要点**：在 OpenCode 1.15.5 中，TUI 可能卡在权限确认弹窗，即使服务器端已无待处理权限请求，回车仍无反应。
- **意义**：权限确认是安全关键路径，对话框状态不一致会导致用户误认为应用死锁。
- **链接**：[#28312](https://github.com/anomalyco/opencode/issues/28312)

### 6. Responses API SSE 流被 `chatcmpl-dummy` 帧污染 — Issue #30916
- **热度**：4 评论 / 0 👍 ✅ Closed
- **要点**：通过 OpenAI 兼容网关使用 `sdk.responses()` 时，SSE 流开头会混入 Chat Completions 格式的合成帧，触发 `TypeValidationError`。
- **意义**：揭示 OpenCode 对非标准 OpenAI 兼容网关的兼容性边界，影响依赖统一抽象层的企业用户。
- **链接**：[#30916](https://github.com/anomalyco/opencode/issues/30916)

### 7. VS Code 扩展 v0.0.13 启动失败 — Issue #31690
- **热度**：3 评论 / 0 👍 ✅ Closed
- **要点**：扩展调用 `opencode --port` 而非 `opencode serve --port`，导致启动即报 `Unexpected server error`。
- **意义**：与插件安装问题同为 IDE 集成稳定性的代表 issue，指向 CLI 命令迁移后的回归。
- **链接**：[#31690](https://github.com/anomalyco/opencode/issues/31690)

### 8. `.agents/` 目录含 Cursor 格式 YAML 时启动崩溃 — Issue #31481
- **热度**：3 评论 / 0 👍 ✅ Closed
- **要点**：当 `.agents/` 中以 YAML 数组形式声明 `tools` 时，OpenCode 启动阶段直接崩溃，影响从 Cursor 迁移的用户。
- **意义**：Coder 工具链生态互通是社区刚需，兼容性崩溃会造成迁移阻断。
- **链接**：[#31481](https://github.com/anomalyco/opencode/issues/31481)

### 9. 桌面端每次启动耗时 30 秒以上 — Issue #41477
- **热度**：1 评论 / 0 👍 🟢 Open
- **要点**：Windows 桌面应用每次启动都固定出现 30+ 秒白屏，非一次性冷启动。
- **意义**：最新性能问题反馈，结合 #31642（Store 加载挂起），桌面端启动链路需要系统性排查。
- **链接**：[#41477](https://github.com/anomalyco/opencode/issues/41477)

### 10. 聊天发送文件后无响应 — Issue #41471
- **热度**：2 评论 / 0 👍 🟢 Open
- **要点**：无论切换任何模型，在聊天框发送文件均无响应且无错误提示。
- **意义**：新提交的 blocker 级问题，影响文件上下文输入核心路径，中文社区用户也在跟进。
- **链接**：[#41471](https://github.com/anomalyco/opencode/issues/41471)

## 重要 PR 进展

### 1. fix(core): 为空的 AI SDK Provider 错误派生 fallback 消息 — PR #41450
- **要点**：`AI_APICallError` 等错误可能 `message` 为空，但携带 `statusCode`、`data.error.code`、响应体等结构化信息。该 PR 确保 TUI 与错误展示不再退化为“Unknown error”。
- **价值**：显著改善可观测性与第三方网关排错效率。
- **链接**：[#41450](https://github.com/anomalyco/opencode/pull/41450)

### 2. fix(tui): 按帧合并 part 流增量，防止 UI 卡顿 — PR #41472
- **要点**：展开流式 `<thinking>` 块时，逐 chunk 派发 `reasoning.delta`/`text.delta` 会阻塞渲染；改为按帧合并增量后流畅度大幅提升。
- **价值**：直接修复 TUI 在长推理场景下的“假死”体验。
- **链接**：[#41472](https://github.com/anomalyco/opencode/pull/41472)

### 3. fix(opencode): 对空 unknown 响应进行重试 — PR #41466
- **要点**：当 provider 返回 0 token 的空完成（finish reason 映射为 `unknown`）时，目前会静默退出会话循环；该 PR 引入重试机制，关闭对应 Issue #41469。
- **价值**：避免因上游偶发空响应导致对话静默中断。
- **链接**：[#41466](https://github.com/anomalyco/opencode/pull/41466)

### 4. fix(tui): 跨会话保留模型变体 — PR #41478
- **要点**：`/new` 导航前将当前会话的模型和变体带入新会话选择器，避免每次新建会话都回到默认模型。
- **价值**：降低高频切换会话时的模型重选成本。
- **链接**：[#41478](https://github.com/anomalyco/opencode/pull/41478)

### 5. fix(cli): OTLP 失败保持 best-effort — PR #41479
- **要点**：当 OTLP exporter 在关闭阶段拒绝传输时，不再让 CLI 命令失败；通过 Effect 管理动态 SDK 加载与 tracing 生命周期。
- **价值**：避免可观测性设施故障反向影响正常 CLI 输出。
- **链接**：[#41479](https://github.com/anomalyco/opencode/pull/41479)

### 6. feat(core): 在 selection 事件中暴露 previous agent — PR #41451
- **要点**：为 `session.agent.selected` 事件补充 `previous` 字段，当会话无先前显式选择时省略该字段，支持 Agent 切换的完整事件溯源。
- **价值**：为会话恢复、审计与 UI 回退提供必要上下文。
- **链接**：[#41451](https://github.com/anomalyco/opencode/pull/41451)

### 7. feat(session): 新增 `/handoff` 命令 — PR #40578
- **要点**：实现会话交接（handoff）能力，关闭 #26757；与 #21760、#26707 同源，但采用更聚焦的上下文继承方案。
- **价值**：长会话或跨 Agent 协作场景下，可以显式交接并控制上下文压缩策略。
- **链接**：[#40578](https://github.com/anomalyco/opencode/pull/40578)

### 8. fix(snapshot): 还原时保留 Unicode 路径 — PR #40648
- **要点**：修复快照还原在 Unicode 路径分支上的问题，关闭 #19357；还原前正确判断目标快照中文件是否存在。
- **价值**：保障非 ASCII 路径项目（如中文目录名）的版本恢复可靠性。
- **链接**：[#40648](https://github.com/anomalyco/opencode/pull/40648)

### 9. fix(gemini): 展示模型生成的图片而非丢弃 — PR #41468
- **要点**：Gemini 图像模型以 `inlineData` 返回生成图片，此前未写入会话导致图片静默丢失；该 PR 将其透传到会话消息。
- **价值**：补齐 Gemini 多模态生成能力在 OpenCode 中的闭环。
- **链接**：[#41468](https://github.com/anomalyco/opencode/pull/41468)

### 10. [beta] 实验性渲染性能优化 — PR #40427
- **要点**：基于不可变数据库快照与 24 小时语料窗口，初始渲染入口内存占用从 7.45 MB 降至 1.82 MB（**-75.5%**）。
- **价值**：针对大规模会话历史场景的性能预研，为后续默认启用奠定基础。
- **链接**：[#40427](https://github.com/anomalyco/opencode/pull/40427)

## 功能需求趋势

- **IDE 集成与扩展生态**：#10517、#16217、#31690 集中暴露 VS Code 插件安装、命名与启动的体验问题，是当前社区最关注的生产力入口。
- **新 AI Provider 接入**：Kiro（#26680）、Gab.AI（#30621）等请求持续出现，同时 DeepSeek V4（#31742）、Gemini（#41468）的兼容性问题也说明多模型支持仍是重点。
- **剪贴板与内容粘贴增强**：#906（图片粘贴）与 #41470（复制到剪贴板失效）共同指向编辑器交互顺滑度。
- **桌面端启动与持久化性能**：#41477、#31642、#31708 等新老 issue 均围绕启动慢、Store 挂起和 npm 依赖失败，桌面端健壮性亟待加强。
- **会话生命周期管理**：`/handoff` 命令（#40578）、previous agent 事件（#41451）表明社区对长会话交接、Agent 切换的上下文管理需求正在升温。
- **协议鲁棒性**：#30916 的 SSE 伪帧问题与 #41469 的空响应问题，反映 gateway 兼容层需要更宽容的错误处理与重试机制。

## 开发者关注点

- **VS Code 插件安装与启动反复出现“坑”**：文档说明不充分、扩展名混淆、CLI 命令回归（`--port` vs `serve --port`），建议维护者统一走 `serve` 子命令并补充故障排查矩阵。
- **Windows 平台问题高频**：目录选择受限（#6490）、退出时挂起（#25677）、桌面端 npm 依赖失败（#31708）、nonewprivs 影响 sudo 提权（#31691），Windows 用户在 CI 与本地开发中频繁受阻。
- **“静默失败”比报错更可怕**：#41471 发送后无响应、#41469 空响应静默退出、#41476 Plan Mode 下 agent 仍改文件——这些场景均缺少明确的用户提示与失败反馈。
- **权限系统仍存在误判**：#28312 的陈旧对话框与 #31669 的反引号文本误识别，都可能导致用户对权限授予失去信任。
- **配置/状态持久化不可靠**：#31739 全局项目编辑不保存、#31680 hook 参数修改不生效，这类“改了等于没改”的问题对自动化工作流伤害极大。
- **中文社区反馈已进入主仓库**：#39441 与 #41471 分别涉及 GitHub Action 的 JSON 解析与文件对话无响应，期待 maintainer 对非英文场景提供更多兼容性验证。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-10

## 今日速览

过去 24 小时 Pi 无新版本发布，但 Issue 与 PR 活动密集：上下文自动压缩失效（#6879）、TUI 渲染超宽行崩溃（#7868）、GitHub Copilot 多模型组织登录 429（#7850）成为当日最受关注的问题；同时，llama.cpp 模型缓存、Copilot 顺序策略、TUI 选择复制开关等修复/增强 PR 已提交，社区迭代速度明显加快。

## 社区热点 Issues

**#6879 [bug] auto-compaction never triggers after context grows past 100% until provider overflow**  
[链接](https://github.com/earendil-works/pi/issues/6879) · 开放 · 16 评论 · 👍 15  
严重 bug：会话上下文超过 100% 后自动压缩不触发，直到 API 拒绝请求才被迫处理。社区普遍认为应该在每次 agentic turn 后检查上下文水位，而非依赖 provider 报错。

**#6922 [bug] Default model cannot be a llama.cpp model: startup shows "No models available"**  
[链接](https://github.com/earendil-works/pi/issues/6922) · 已关闭 · 10 评论 · 👍 14  
影响本地模型用户：当 defaultProvider 为 `llama.cpp` 时，启动阶段模型列表为空导致无法正常启动。该问题已由 PR #7072 修复（缓存 catalog 并解决竞态）。

**#7730 [bug] High CPU usage on Mac OS with long session**  
[链接](https://github.com/earendil-works/pi/issues/7730) · 开放 · 6 评论 · 👍 6  
Mac 上长会话 CPU 占用飙升至 50–110%，内存 600–800MB，疑似与会话长度或上下文大小相关。用户关注性能劣化对日常使用的影响。

**#5932 [to-discuss, new-harness] exposing ctx.navigateTree() to agents**  
[链接](https://github.com/earendil-works/pi/issues/5932) · 开放 · 6 评论 · 👍 1  
扩展开发者希望在普通 `ExtensionContext` 中使用 `navigateTree()`，以便自定义 /goal 等命令时能操控上下文导航。属于扩展 API 能力补齐。

**#7868 [bug, untriaged] Renderer hard-crashes (session abort) when any rendered line exceeds terminal width**  
[链接](https://github.com/earendil-works/pi/issues/7868) · 已关闭 · 1 评论  
TUI 渲染器遇到单行超宽即中止整个会话，而不是截断。影响真实工作流，用户建议至少降级为截断并保留会话。

**#7860 [bug] EPIPE crash when a desktop host closes the stdout pipe (0.84.1)**  
[链接](https://github.com/earendil-works/pi/issues/7860) · 已关闭 · 1 评论  
当 Pi 作为外部桌面宿主应用的 CLI agent 运行时，宿主关闭 stdout 管道会导致未处理的 EPIPE 崩溃。影响嵌入式/集成使用场景。

**#7850 [bug] GitHub Copilot login fails with 429 (Rate Limiting) for organizations with many available models**  
[链接](https://github.com/earendil-works/pi/issues/7850) · 已关闭 · 1 评论  
组织账户下可用模型较多时，Pi 并发发送策略启用请求触发 Copilot 限流，导致登录失败。PR #7851 已改为顺序请求。

**#7874 [bug] Cold session restore replays a `stopReason:"length"` thinking-only assistant that live recovery strips, causing an unrecoverable Anthropic 400**  
[链接](https://github.com/earendil-works/pi/issues/7874) · 已关闭 · 1 评论  
长期 Claude 会话从 JSONL 恢复后永久不可用，每次请求都返回 Anthropic 400。问题确认与 `stopReason:"length"` 的思维链消息重放有关，是会话恢复的致命缺陷。

**#7859 [bug] Extension commands cannot be triggered via sendUserMessage (docs pattern broken)**  
[链接](https://github.com/earendil-works/pi/issues/7859) · 已关闭 · 1 评论  
文档中“用 sendUserMessage 触发扩展命令”的模式不生效，因为内部调用设置了 `expandPromptTemplates: false`，导致命令处理被跳过。已由 PR #7858 修复。

**#7870 [bug] Remote catalog overlay (pi.dev) silently overrides correct built-in contextWindow for z-ai/glm-5.2 — stuck at 262k instead of 1M**  
[链接](https://github.com/earendil-works/pi/issues/7870) · 已关闭 · 1 评论  
远程模型目录错误覆盖了内置 GLM-5.2 的上下文窗口，导致模型被限制为 262k（真实 1M）。社区对目录数据可信度表示担忧。

## 重要 PR 进展

**#7072 fix(coding-agent): cache llama.cpp model catalog**  
[链接](https://github.com/earendil-works/pi/pull/7072) · 已关闭  
修复 #6948：为 llama.cpp 模型目录增加缓存，解决启动时 defaultProvider/defaultModel 因异步刷新不生效的竞态问题。

**#7851 fix(provider): enable GitHub Copilot model policies sequentially**  
[链接](https://github.com/earendil-works/pi/pull/7851) · 已关闭  
将 Copilot 模型策略启用请求从并发改为顺序执行，避免多模型组织触发 429 限流，修复登录失败问题。

**#7856 fix(ai): repair JSON-serialized structured tool arguments during validation**  
[链接](https://github.com/earendil-works/pi/pull/7856) · 已关闭  
修复工具参数被 provider 双重序列化为字符串时验证器硬失败的问题，减少不必要的重试。

**#7858 fix(coding-agent): route extension commands regardless of expandPromptTemplates**  
[链接](https://github.com/earendil-works/pi/pull/7858) · 已关闭  
修复 `sendUserMessage()` 无法触发扩展命令的文档模式问题，恢复 `extensions.md` 中描述的行为。

**#7857 feat(agent): expose `expandPromptTemplates` in `sendUserMessage`**  
[链接](https://github.com/earendil-works/pi/pull/7857) · 开放  
允许调用方在 `sendUserMessage` 中显式控制模板扩展，为扩展命令触发提供更灵活的入口。

**#7865 fix(tui): handle tui.select.pageUp/pageDown in base SelectList and model-selector**  
[链接](https://github.com/earendil-works/pi/pull/7865) · 已关闭  
为基础 SelectList 和模型选择器补充 PageUp/PageDown 键绑定，修复长列表无法翻页的问题。

**#7866 feat(tui): add copyOnSelect option to TuiAltScreen**  
[链接](https://github.com/earendil-works/pi/pull/7866) · 已关闭  
新增 `copyOnSelect` 配置项，允许用户禁用全屏 TUI 模式下鼠标选择文本自动复制到剪贴板的行为。

**#7872 feat(coding-agent): expose context files at session start**  
[链接](https://github.com/earendil-works/pi/pull/7872) · 已关闭  
在 `session_start` 事件中暴露加载的 AGENTS/CLAUDE 上下文文件，并补充扩展事件字段文档与测试。

**#7873 skip global aliases**  
[链接](https://github.com/earendil-works/pi/pull/7873) · 已关闭  
过滤 shell 配置中的全局别名（如 `alias -g -- G='| grep'`），避免 bash 工具调用时生成无法执行的命令。

**#7344 feat(protocol): add remote session wire protocol**  
[链接](https://github.com/earendil-works/pi/pull/7344) · 已关闭  
新增跨包共享的 `@earendil-works/pi-protocol` 包，定义远程会话命令、事件、快照，并实现严格的 CBOR 编码与长度前缀帧，为远程会话能力打基础。

## 功能需求趋势

从近期 Issue 可以提炼出以下社区关注方向：

- **TUI 交互体验**：大量需求围绕全屏模式下的滚动、鼠标点击定位、翻页、复制开关、流式输出保持阅读位置等（#7720、#7765、#7616、#7861、#7852）。
- **上下文管理与自动压缩**：社区希望压缩机制更智能、更及时，避免上下文溢出或会话恢复后不可用（#6879、#7867、#7874）。
- **扩展/插件系统能力**：开发者要求暴露更多扩展 API（如 `ctx.navigateTree()`），并修复命令触发链路，使自定义工具与文档模式一致（#5932、#7740、#7859、#7857、#7858、#7872）。
- **本地模型与私有化部署**：llama.cpp 相关启动竞态、模型缓存问题持续受关注（#6922、#6948）。
- **提供商兼容性**：新模型（AI21、GLM-5.2）、Copilot 企业组织场景成为近期热点，目录数据准确性也被质疑（#7869、#7850、#7870）。
- **稳定性和进程健壮性**：TUI 渲染崩溃、EPIPE、高 CPU 等问题频繁出现，开发者希望 Pi 在异常边缘条件下不中断会话（#7868、#7860、#7730、#7855）。

## 开发者关注点

- **上下文压缩触发时机不可靠**：`auto-compaction` 在上下文超过 100% 后仍不触发，直到 provider 报错，浪费 token 且可能丢失工作。
- **TUI 渲染稳定性与阅读体验**：单个超宽行即可导致会话中止；流式输出时滚动位置反复跳变，长工具输出场景几乎无法阅读历史。
- **扩展命令触发与文档不符**：`sendUserMessage` 无法触发扩展命令，开发者按文档实现却必须等待修复；同时缺少类似 `navigateTree()` 等基础 API。
- **本地模型启动竞态**：llama.cpp 默认模型不生效是老问题，虽然已有缓存修复，但用户对启动流程的确定性仍有疑虑。
- **Copilot 多模型组织登录受限**：并发策略启用请求触发 429，大组织用户无法登录，暴露了提供商适配中并发控制不足。
- **外部宿主集成时进程脆弱性**：EPIPE 等管道错误未处理，导致桌面应用/CLI 包装场景下 Pi 直接崩溃。
- **模型目录数据准确性**：远程 catalog 覆盖内置上下文窗口，导致 GLM-5.2 等模型被错误限流，用户希望本地优先或至少能手动覆盖。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 📰 Qwen Code 社区动态日报 — 2026-08-10

> 数据来源：github.com/QwenLM/qwen-code

## 今日速览

今日发布 v0.21.8 最新 nightly 版，首次支持 **Qoder 插件扩展**，CI 流程同步引入 issues 自动分诊。社区讨论焦点集中在**多会话协调**（#8718 RFC）与 **MCP 连接健壮性**（#8784）两大方向，TUI 渲染兼容性问题持续收到反馈。PR 方面，原生 DashScope 集成（#8714）与多会话 Chrome 桥共享（#8740）是值得关注的实质进展。

## 版本发布

**v0.21.8-nightly.20260810.55e20db328**

- feat(core): 支持 Qoder 插件扩展（PR [#8661](https://github.com/QwenLM/qwen-code/pull/8661)）
- feat(ci): issues 自动分诊至领域负责人

---

## 社区热点 Issues（精选 10 条）

**1. [[#8718](https://github.com/QwenLM/qwen-code/issues/8718)] [P2] RFC：独立 Qwen 会话的原生协调**（8 评论）
多智能体路线的关键设计文档。提出 leader 派发 2-3 个 worker 并保持交互、观察运行时状态、收集结构化结果。被标记为 `roadmap/multi-agent` 与 `background-automation`，是后续会话间通信能力的基础。

**2. [[#8784](https://github.com/QwenLM/qwen-code/issues/8784)] [P2] Streamable HTTP：可选 GET/SSE 流被 404 会杀死整个 MCP 连接**（5 评论）
MCP 协议实现稳健性 bug：服务端拒绝可选通知流后，客户端直接放弃整个连接。影响所有基于 Streamable HTTP 的 MCP 服务器，属于高频集成场景下的阻塞问题。

**3. [[#8678](https://github.com/QwenLM/qwen-code/issues/8678)] [P1] serve：大型会话恢复超时时应保留当前会话**（2 评论）
P1 级 daemon 会话管理问题。PR [#8691](https://github.com/QwenLM/qwen-code/pull/8691) 已合并超时契约与可观测性部分，本 issue 持续跟踪剩余实现与调优。

**4. [[#8124](https://github.com/QwenLM/qwen-code/issues/8124)] [P2] 启动横幅首次绘制缺少顶部行**（10 评论）
Windows 上的间歇性渲染异常，首次 stdout 写入即缺行，与 pending provider update 有相关性。已打 `welcome-pr`，社区复现信息较完整。

**5. [[#7118](https://github.com/QwenLM/qwen-code/issues/7118)] [P2] Windows 独立安装器在 Get-FileHash 解析失败时崩溃**（6 评论，3 👍）
`powershell.exe` 无法解析 `Get-FileHash` 时校验失败，独立安装包不可用。安装/升级路径的基础问题，已标记 `needs-triage` 和 `welcome-pr`。

**6. [[#8823](https://github.com/QwenLM/qwen-code/issues/8823)] [P2] SDK：隐藏的未识别诊断变异并驱逐转录状态**（3 评论）
daemon 将未知事件归一化为 debug 事件后，仍会通过 `appendStatusBlock()` 写入共享转录 reducer，造成用户可见的状态污染。反映了 daemon 架构下事件隔离的设计难度。

**7. [[#8769](https://github.com/QwenLM/qwen-code/issues/8769)] [P2] 提案：将 /review 的 Step 3-5 编排迁移到 workflow 引擎**（4 评论）
建议将 `/review` 的 agent fan-out、验证、反向审计从模型驱动改为确定性工作流引擎（`QWEN_CODE_ENABLE_WORKFLOWS`），使编排结构可测可控。属 multi-agent 路线图的关键重构。

**8. [[#8557](https://github.com/QwenLM/qwen-code/issues/8557)] [P3] 缩小终端窗口导致转录块重复输出**（7 评论）
macOS + Warp 环境下缩小终端窗口，已打印的转录块在 scrollback 中被重复打印。现代终端下 Virtualized History 模式的渲染回归，影响日常使用体验。

**9. [[#8659](https://github.com/QwenLM/qwen-code/issues/8659)] [P3] Web 终端（阿里云 Workbench）中 TUI 闪烁/撕裂**（4 评论）
`useTerminalBuffer: true` 的全屏 ANSI 重绘在 Web 终端下不兼容，导致连续闪烁。已标记 `welcome-pr`，云开发环境下的兼容性问题值得关注。

**10. [[#7585](https://github.com/QwenLM/qwen-code/issues/7585)] [P3] 提议：直接外部上下文提供者 Profile**（12 评论）
企业级 monorepo 集成方案：互斥的按需与自动召回 Profile，让交互式 CLI 进程检索管理员绑定的仓库共享上下文。讨论已持续 18 天、累计 12 条评论，需求热度高但仍在讨论阶段。

---

## 重要 PR 进展（精选 10 条）

**1. [[#8714](https://github.com/QwenLM/qwen-code/pull/8714)] feat(core): 新增原生 DashScope 集成**（@Manouchehri）
直接使用阿里云 ModelStudio 原生生成 API，不再走 OpenAI 兼容端点，为 DashScope 用户提供更完整的请求链路与原生能力。

**2. [[#8740](https://github.com/QwenLM/qwen-code/pull/8740)] feat(serve): 通过多客户端 /cdp 隧道共享 Chrome 桥接**（@yiliang114）
`cdp_*` 帧引入 `linkId`，daemon 维护并发隧道注册表，让所有会话**共享一个 Chrome 桥接**而非各自重拨。

**3. [[#8818](https://github.com/QwenLM/qwen-code/pull/8818)] fix(core): 捕获所有 OpenAI 兼容提供商的 thinking-tag 泄漏**（@yiliang114）
将 content-only thinking-tag 防御提升为默认 provider 行为，并关闭两个可让真实泄漏通过的绕过路径。

**4. [[#8733](https://github.com/QwenLM/qwen-code/pull/8733)] feat(core): send_message/list_agents 支持按名称寻址其他会话**（@qqqys）
`list_agents` 可发现本机其他 Qwen Code 会话，`send_message` 可按名称触达会话。这是 #8724 多会话能力的最后一步。

**5. [[#8707](https://github.com/QwenLM/qwen-code/pull/8707)] feat(chrome): Qwen WebBridge 直接浏览器控制**（@yiliang114）
从 `qwen serve` 直接控制 Chrome 扩展，兼容 Kimi WebBridge 的 `/command`、`/status` 端点，覆盖完整 17 项操作。

**6. [[#8802](https://github.com/QwenLM/qwen-code/pull/8802)] fix(desktop): 修复 macOS 关闭窗口后的恢复**（@yiliang114）
主窗口关闭改为隐藏而非销毁；Dock/Finder 重新打开可恢复同一窗口，且不抢 Local Control 焦点。

**7. [[#7567](https://github.com/QwenLM/qwen-code/pull/7567)] feat(cli): 新增 /advisor 第二意见命令**（@yiliang114）
`/advisor [focus]` 以只读分叉查询让评审模型对当前对话给出独立意见，复用 /btw 的上下文缓存机制，适合 code review 场景。

**8. [[#8687](https://github.com/QwenLM/qwen-code/pull/8687)] feat(daemon): 跨工作树 Git 变更守卫**（@wenshao）
内置宿主侧守卫：识别 `-C`/`--work-tree`/`--git-dir` 等 Git 重定位参数，阻止模型发出的 `run_shell_command` 越界变更 Git 仓库。

**9. [[#8829](https://github.com/QwenLM/qwen-code/pull/8829)] fix(cli): "稍后提醒"对 Provider 更新持久化 24h 冷却**（@qwen-code-dev-bot）
修复升级后可编辑 Provider 的 Built-in Provider Update 提示每次启动都出现的问题，现在 `later`/`Esc` 会记录 24 小时冷却期。

**10. [[#8803](https://github.com/QwenLM/qwen-code/pull/8803)] fix(memory): 记忆召回可超过扫描上限**（@yiliang114）
不再受 200 文档扫描窗口限制：先对完整解析池排序，再发送最多 200 个候选，兼顾词法/近期平衡，模型选择保持有界。

---

## 功能需求趋势

- **多会话 / 多智能体协作**：#8718 RFC、#8769 workflow 编排、PR #8733 按名寻址，社区正从单会话走向多会话协同；
- **MCP 集成深化与稳健性**：#8784 协议细节修复、#7585 外部上下文 Provider，MCP 已成为企业级扩展首选通道；
- **企业级外部记忆 / 上下文**：#7449 企业外部记忆集成、#7585 外部 Provider，用户希望连接组织知识库；
- **本地控制与移动访问**：#8595 QR 码手机配对访问本地会话，移动端控制桌面 CLI 的需求逐渐显现；
- **浏览器 / IDE 自动化控制面**：#8707 WebBridge 直控真实 Chrome，补齐浏览器自动化关键拼图；
- **云端原生集成**：#8714 原生 DashScope 支持，用户不再满足于 OpenAI 兼容 proxy，需要云厂商原生接入。

## 开发者关注点

- **TUI 渲染兼容性成最大痛点**：#8124（横幅缺失）、#8557（缩放重复输出）、#8659（Web 终端闪烁），覆盖 Warp、Windows Terminal、Web 终端等场景；
- **Windows 安装与运行**：#7118 安装器依赖 `Get-FileHash` 解析失败即中止，#8615 桌面版打开工作区崩溃，Windows 用户连续反馈阻塞性问题；
- **MCP 连接容错性不足**：#8784 可选流失败即杀连接，客户端协议实现需要更宽容的错误处理；
- **CI 自愈机制成熟**：#8756、#8766、#8799、#8822 等 CI 失败由 bot 自动创建 issue 并标记 autofix，说明测试稳定性治理已高度自动化；
- **模型输出契约不稳定**：#6666 qwen 3.7 max 将 thinking 内容放入 `content` 而非 `reasoning_content`，影响依赖结构化输出的工作流；
- **daemon 会话状态一致性**：#8823 未知事件污染共享转录、#8678 大会话恢复超时，会话管理的复杂性与可观测性仍是核心挑战。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-08-10）

> 数据来源：github.com/Hmbown/DeepSeek-TUI（Issue/PR 实际托管于 Hmbown/CodeWhale 仓库）

## 今日速览

- **v0.9.6 版本准备中**：PR #5313 已完成 v0.9.6 发布准备工作，该版本定位为"减法式运行时优化"，重点重构 compaction 机制并移除 harness 引入的阻塞行为。
- **上下文压缩争议持续发酵**：多个 Issue 集中反馈"模型支持 1M 上下文但工具仍在 128K 触发压缩"以及"压缩后 token 计数不刷新"，成为当前社区最突出的体验痛点。
- **两个高影响 Bug 被关注**：切换 Provider 后默认模型残留（#5034）与 File 工具编辑假成功（#5209），直接影响日常使用可靠性。

---

## 版本发布

当前无正式新版本发布。但 **PR #5313（chore(release): prepare v0.9.6）** 已合并，预告 v0.9.6 即将到来。核心更新方向包括：

- 重构 compaction：基于单一 provider summary 加 committed successor handoff，不再出现 mailbox 冻结
- 移除 harness 对用户操作的阻塞，同时保留显式预算、截止时间、取消能力
- 保持 provider 状态的真实性与一致性

另附 PR #5308：修复 release 分发时 CNB 资产下载 URL 路径问题，确保 mirror 模式拉取到实际二进制而非 HTML 页面。

---

## 社区热点 Issues（10 个）

### 1. 切换 Providers 会保留无关的默认模型
- **编号**: [#5034](https://github.com/Hmbown/CodeWhale/issues/5034)（OPEN，今日更新，评论 4）
- **要点**: 切换到 OpenAI 后，默认模型仍可能残留为从其他路由继承的 `gpt-5.5`， provider 与 model 解析未作为一个连贯整体更新。
- **重要性**: 直接影响用户多 Provider 切换体验，与配置一致性相关。

### 2. Compaction 收益不可见：token 计数不刷新
- **编号**: [#5096](https://github.com/Hmbown/CodeWhale/issues/5096)（OPEN，今日更新，评论 4）
- **要点**: 用户执行 `/compact` 后提示成功，但 token 计数器仍停留在压缩前数值（如 37K/128K），无法确认压缩是否实际生效。
- **重要性**: 社区高频反馈，压缩机制的可观测性存在缺口，影响用户对 Context 管理的信任。

### 3. TUI 权限请求对话框：默认选中项应可配置并明确说明
- **编号**: [#5293](https://github.com/Hmbown/CodeWhale/issues/5293)（OPEN，👍 1，评论 4）
- **要点**: v0.9.4 起权限请求对话框默认高亮项发生变化（倾向 deny），用户可能因快速确认而误拒操作。建议默认动作可配置并有清晰说明。
- **重要性**: 涉及安全与 UX 的平衡，社区对交互模式变更敏感。

### 4. v0.9.5：统一任务面板（shell + subagents + durable workers）
- **编号**: [#5270](https://github.com/Hmbown/CodeWhale/issues/5270)（OPEN，今日更新，评论 3）
- **要点**: 需要一个面向操作者的统一"仍在运行"列表：后台 shell、subagent、Fleet/lane worker、workflow runs 集中在同一个面板中。
- **重要性**: 项目维护者提出的路线图项，反映多任务并存场景下的可管理性需求。

### 5. Compaction：发布并强制执行结构化生存契约
- **编号**: [#4394](https://github.com/Hmbown/CodeWhale/issues/4394)（OPEN，今日更新，评论 3）
- **要点**: 当前 compaction 虽已实现 cache-aligned 摘要、tool-result 裁剪等，但缺少明确的"什么信息必须保留"的契约，建议定义结构化 Plan/To-do/subagent 状态的生存规则。
- **重要性**: 直接关系到长会话下的工作连续性，维护者主导，属于可靠性关键改进。

### 6. File (action=edit) 静默接受错误参数并报告假成功
- **编号**: [#5209](https://github.com/Hmbown/CodeWhale/issues/5209)（OPEN，评论 3）
- **要点**: 使用 `new_str` 等错误参数名时工具不报错，反而返回成功；同一位置需 3-5 次重复编辑才能生效，严重拖慢效率。
- **重要性**: 开发者反馈的最尖锐工具可靠性问题之一，对 Coding Agent 体验伤害极大。

### 7. 模型支持 1M 上下文，为何工具只在 128K 触发压缩？
- **编号**: [#5239](https://github.com/Hmbown/CodeWhale/issues/5239)（OPEN，今日更新，评论 2）
- **要点**: 用户使用的模型已支持 1M 上下文，但 CodeWhale 仍在 128K 自动压缩，且未明确提示这是回退默认值。
- **重要性**: 与 #5134、#5244 同属一类问题，是"默认窗口与实际模型能力不匹配"的集中体现，社区诉求强烈。

### 8. 只能保存一个 API Key，多 Provider 使用不便
- **编号**: [#5250](https://github.com/Hmbown/CodeWhale/issues/5250)（OPEN，评论 2）
- **要点**: 用户同时使用 DeepSeek 和 GLM，每切换一次 Provider 需要重新获取并覆盖 API Key。建议支持多 Key 分别保存。
- **重要性**: 多模型工作流的普遍诉求，与 #5047（密钥持久化位置错误）共同指向密钥管理体验缺陷。

### 9. Fleet 配置层级过多，且存在静默遮蔽
- **编号**: [#5098](https://github.com/Hmbown/CodeWhale/issues/5098)（OPEN，评论 2）
- **要点**: 编辑 `~/.codewhale/agents/builder.toml` 不生效，Fleet roster 仍显示旧模型。原因在于 `.codewhale/agents/builder.toml` 与全局配置之间存在多层遮蔽逻辑，用户无法感知哪一层生效。
- **重要性**: 配置系统的可预测性受损，Fleet 高级用户难以排查问题。

### 10. 复制消息包含 UI 装饰字符（● ▏）
- **编号**: [#5314](https://github.com/Hmbown/CodeWhale/issues/5314)（OPEN，v0.9.5，评论 1）
- **要点**: 右键菜单"Copy message"会把角色发光符号（●）和换行续行符（▏）一并复制到剪贴板，与选中复制的"rail-clean"行为不一致。
- **重要性**: 新版本 UI 细节回归，影响日常复制粘贴的洁净度，修复成本低但用户感知明显。

---

## 重要 PR 进展（3 个）

### 1. chore(release): prepare v0.9.6
- **编号**: [#5313](https://github.com/Hmbown/CodeWhale/pull/5313)（CLOSED）
- **内容**: v0.9.6 版本发布准备。重构 compaction 为单一 provider summary + committed successor handoff，移除 harness 阻塞，保留预算/取消等能力。这是一个以“减法”为导向的运行时修复版本。

### 2. build(deps): bump jsonschema from 0.46.10 to 0.49.6
- **编号**: [#5281](https://github.com/Hmbown/CodeWhale/pull/5281)（OPEN，dependabot）
- **内容**: Rust 依赖 `jsonschema` 升级到 0.49.6。例行依赖更新，无破坏性变更预期，需关注 CI 验证结果。

### 3. fix(release): use CNB asset download URLs
- **编号**: [#5308](https://github.com/Hmbown/CodeWhale/pull/5308)（CLOSED）
- **内容**: 修复发布流程中 CNB 资产下载 URL 路径错误。两个 updater 实现统一使用 `codewhale.net/codewhale` 仓库 slug，并补上 `/-/releases/download/vX.Y.Z/` 路径段，避免 mirror 模式拉取到 release HTML 而非资产文件。

---

## 功能需求趋势

从近 24 小时更新的 Issues 中可提炼出以下社区关注方向：

1. **上下文压缩（Compaction）机制优化**：多 Issue（#5096、#5239、#4394、#5043、#5244）围绕压缩触发时机、用户可感知的收益、结构化信息存续契约展开，是当前最突出的功能改进诉求。
2. **默认上下文窗口应匹配模型实际能力**：多款新模型已支持 1M token，但 CodeWhale 仍以 128K 作为回退默认值（#5239、#5134），社区要求消除静默降级并允许用户配置。
3. **Fleet / 子代理（Subagents）架构演进**：统一任务面板（#5270）、Fleet 配置层级简化（#5098）、子代理显示名称规范（#5287），体现多代理工作流正成为核心使用场景。
4. **多 Provider / 多 API Key 的一等公民支持**：#5250（多 Key 保存）、#5034（Provider 切换状态一致性）、#5047（密钥全局存储），多模型混合使用已成为常态。
5. **工具调用可靠性**：#5209（File 编辑假成功）、#3364（编辑前强制读取护栏）等聚焦于减少工具误报与静默失败。
6. **TUI/CLI 交互一致性**：#4022（CLI/TUI parity）、#576（TUI 内 Fork 交互）、#5293（权限对话框配置化），交互模式正在从 CLI 向 TUI 迁移并寻求统一标准。

---

## 开发者关注点

1. **128K 与 1M 的“上下文落差”**：用户对“模型支持 1M 但工具在 128K 压缩”感到困惑，且没有明确提示。社区希望 CodeWhale 至少做到显式告知回退行为，最好能自动读取模型能力。
2. **File 编辑工具可信度**：错误参数被静默接受并返回“成功”，导致同一处修改重复执行 3-5 次。这类问题对 Agent 工作流的信任打击极大，是高优先级修复对象。
3. **配置与密钥的持久化混乱**：API Key 有时只写入了当前仓库的 `.codewhale/config.toml`，换项目即丢失；Fleet 配置多层遮蔽让人无法判断实际生效值。需要更强的配置诊断能力与全局密钥存储。
4. **复制行为的 UI 污染**：复制消息时混入 `●` / `▏` 等装饰字符，这类细节虽小，但在高频复制场景下明显降低体验，社区期待快速修复。
5. **权限默认项变更的意外影响**：v0.9.4 将权限对话框默认高亮改为拒绝项，用户抱怨“想快速确认却误点了拒绝”。默认安全策略的调整应伴随清晰的说明或可配置选项。

---

*本日报基于 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*