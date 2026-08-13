# AI CLI 工具社区动态日报 2026-08-14

> 生成时间: 2026-08-13 23:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具生态横向对比分析报告（2026-08-14）


## 1. 生态全景

当前 AI CLI 工具正处于 **“从单点功能竞争转向系统性平台能力竞争”** 的关键阶段。各主流工具已不满足于“能对话、能写码”的基础能力，而是围绕**多智能体编排、MCP 生态深化、会话持久化可靠性、模型行为精细控制**四大方向同时发力。从社区反馈看，稳定性问题（挂起、假成功、状态错乱）已超越功能丰富度成为用户最敏感的话题；同时供应链安全与指令完整性开始被开发者纳入选型考量。整体呈现“快速迭代、但稳定性与安全债同步累积”的行业态势。


## 2. 各工具活跃度对比

| 工具 | Issues 活跃数 | PR 活跃数 | Release 情况 | 社区热度信号 |
|------|:---:|:---:|:---:|------|
| **Claude Code** | 10 条精选（27 条文档类被关） | 2 | v2.1.231 | 110👍 最高热度 issue，文档类 issue 大量 stale 关闭 |
| **OpenAI Codex** | 10 条精选 | 10 | 3 个 alpha（0.148.0-a.11/12/13）| 连续版本迭代，PR 密集，Windows/子代理问题集中 |
| **Gemini CLI** | 10 条精选 | 10 | v0.56.0-nightly | P1 级稳定性和安全问题多，评估体系（evals）持续投入 |
| **GitHub Copilot CLI** | 10 条精选 | 1 | v1.0.80-0 | 27 条新 issue 中约 1/3 涉及 MCP，reasoning effort 配置闭环形成 |
| **Kimi Code CLI** | 3 条（全部列出） | 0 | 无 | 社区偏冷，但 #2597 失控生成 88k token 问题严重 |
| **OpenCode** | 10 条精选 | 10 | v1.18.18 | /reload 77👍 居首，安全类 issue 集中曝光 |
| **Pi** | 10 条精选 | 10 | 无 | auto-compaction 失效为最热话题（17👍），维护者亲自提 issue |
| **Qwen Code** | 10 条精选 | 10 | v0.21.11 / v0.21.12-preview.1 | 49 条活跃 issue，fleet 多智能体路线清晰 |
| **DeepSeek TUI (CodeWhale)** | 10 条精选 | 10 | v0.9.7（品牌切换）| 中文用户比例高，架构治理与 TUI 体验并进 |
| **Grok Build** | — | — | 无 | 无活动 |


## 3. 共同关注的功能方向

### 3.1 MCP 生产级成熟（6/9 工具涉及）
- **Claude Code**：v2.1.231 修复 OAuth 重定向 URI 不匹配
- **Codex**：PR #38448 每服务器 OAuth 回调端口、PR #38436 TLS 回退
- **Copilot CLI**：OAuth 并发刷新竞态（#4472）、Atlassian 回归（#4480）、Windows socket 10013
- **Gemini CLI**：损坏配置被当作空配置（#28787）、A2A 安全加固
- **OpenCode**：并行 spawn 竞态修复（#42431）
- **Qwen Code**：MCP OAuth 中断（#9108）

**共性诉求**：OAuth 认证流程的可靠性与多服务器端口冲突、TLS 兼容性、并发场景下的连接稳定性。

### 3.2 多智能体/子代理可靠性（5/9 工具涉及）
- **Gemini CLI**：Subagent 假成功（#22323）、Generalist 永久挂起（#21409）、未授权运行（#22093）
- **Codex**：子代理状态错误恢复为 Working（#37563）、gpt-5.6-luna 被拒（#34700）
- **Qwen Code**：/coordinate 多智能体落地、activeWork 追踪
- **DeepSeek TUI**：子代理超时中断（#1425）、YOLO Agent 导致 VS Code 崩溃（#1651）
- **Copilot CLI**：长会话事件存储耗尽（#4467）

**共性诉求**：子代理不能挂起、不能误报成功、状态需正确持久化、权限边界需可控。

### 3.3 Windows 平台兼容性（5/9 工具涉及）
- **Codex**：5+ 条 Windows 沙箱相关 issue（MSIX PowerShell 拒绝、setup.exe 找不到）
- **Copilot CLI**：`--server --stdio` 进程泄漏（#4468）
- **Claude Code**：Dispatch 卡死（#67682）
- **Gemini CLI**：WSL2 剪贴板图片粘贴（#27588）、Windows ripgrep EFTYPE（#25378）
- **Qwen Code**：Ctrl+V 粘贴回归（#9061）、安装器供应链修复（#9112）

### 3.4 模型行为精细控制 （3/9 工具涉及）
- **Claude Code**：默认注释冗长（#65961，110👍）、memory 被覆盖（#52477）
- **Copilot CLI**：reasoning effort 按 agent 配置（#2904，20👍）
- **OpenCode**：xhigh reasoning effort 修复

### 3.5 会话恢复与持久化（4/9 工具涉及）
- **Pi**：auto-compaction 失效（#6879）、事务式持久化（#8052）
- **Codex**：resume 失败、子代理状态错乱
- **Qwen Code**：大会话恢复超时（#8678）
- **Copilot CLI**：会话事件存储耗尽、孤儿事件重放（#4469）


## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 高质量模型行为 + 企业级集成 | 追求模型指令遵循度的专业开发者 | 模型层行为强调“用户偏好优先”，MCP 与认证体系逐步完善；社区对模型“性格”最敏感 |
| **OpenAI Codex** | 大规模 agentic coding + 多平台支持 | 深度 AI 编码工作流用户 | 多智能体（multi_agent_v2）与沙箱隔离为核心路线；迭代速度最快，alpha 版本密集 |
| **Gemini CLI** | 评估驱动 + 多模型支持 | 对可观测性/安全性有要求的开发者 | 以 evals 体系推动可靠性，支持 Claude 新模型，A2A 协议布局 |
| **Copilot CLI** | GitHub 生态深度集成 | 企业/组织用户（GitHub 全家桶） | 远程会话共享（--ahp）、事件存储、权限持久化为特色；MCP 支持快速但稳定性待补齐 |
| **Kimi Code CLI** | 轻量级编码助手 | 中轻量用户、ACP 自动化场景 | 仓库活跃度低、资源投入有限；生成护栏缺失为显著短板 |
| **OpenCode** | 高可定制 TUI + 插件/提供商生态 | 追求灵活性与私有化/多模型用户 | 插件 API、自定义 provider 与模型 fallback 链为核心；2.0 演进与 1.x 兼容问题并存 |
| **Pi** | 高性能终端体验 + 跨提供商兼容 | 终端重度用户、自托管/多用户部署 | 极度重视 TUI 渲染与终端“卫生”（SIGINT 恢复、剪贴板兼容）；架构轻量但社区规模较小 |
| **Qwen Code** | 多智能体编排（fleet）+ 云服务链路 | 阿里云生态、多智能体工作流用户 | /coordinate 原生多智能体、daemon 可观测性持续建设；供应链安全修复积极 |
| **DeepSeek TUI (CodeWhale)** | 中文用户友好 + 多模型聚合 | 中文开发者、DeepSeek 生态用户 | 从单一 DeepSeek 走向多提供商（NIM、Moonshot、DS4）；TUI 细节与 i18n 投入大；品牌切换期 |
| **Grok Build** | 尚未形成明确生态 | — | 处于早期，社区存在感极低 |


## 5. 社区热度与成熟度

**第一梯队（高活跃、生态成形）** ：**Claude Code、OpenAI Codex、Gemini CLI**。三者保持稳定的版本发布节奏，PR 与 Issue 讨论密度高，社区反馈能被快速转化为修复或新功能。Claude Code 在“模型行为”话题上拥有最高讨论热度；Codex 的迭代速度和 PR 活跃度领先；Gemini CLI 在评估体系（evals）上投入突出，开始向“工程化治理”靠拢。

**第二梯队（中等活跃、功能特色明显）** ：**Copilot CLI、OpenCode、Qwen Code、Pi、DeepSeek TUI**。均有明确的功能定位和用户群，但社区规模或迭代密度低于第一梯队。Copilot CLI 受 GitHub 生态加持，企业用户关注度高；OpenCode 在插件与提供商生态上持续投入；Qwen Code 凭借多智能体路线快速追赶；Pi 与 DeepSeek TUI 则属于“小而美”路线，社区忠诚度高但整体影响力有限。

**第三梯队（活跃度低）** ：**Kimi Code CLI** 连续多日无 PR、无 Release，Issue 数量少且严重问题（88k token 失控生成）缺乏官方响应；**Grok Build** 完全无活动。两者在当前生态版图中存在感较弱，Kimi 的“生成安全”事件如不尽快回应，可能进一步影响用户信任。


## 6. 值得关注的趋势信号

### 6.1 模型行为控制权正在成为新的竞争焦点
Claude Code 的“注释冗长”issue（110👍）与 Copilot CLI 的 reasoning effort 配置需求（20👍）指向同一方向：**开发者不再满足于“模型能做什么”，而是要求“模型按我的规则做”**。能够提供更精细的输出风格控制、指令优先级明确、用户偏好强约束的工具将获得差异化优势。

### 6.2 MCP 从“支持”走向“生产级可靠”
OAuth 回归、并发刷新竞态、TLS 兼容性、端口冲突——MCP 相关 bug 密集出现，说明 **MCP 已从小众功能变成核心依赖**，但其可靠性尚未达到企业生产标准。未来 3-6 个月，MCP 认证与连接稳定性将是各工具拉齐体验的关键战场。

### 6.3 多智能体编排的可信度危机
Gemini 的 Subagent 假成功、Codex 的状态错乱、DeepSeek 的子代理超时中断共同表明：**多智能体能力已率先上线，但编排可靠性仍在“补课”**。对于开发者而言，评估工具时不应只看“是否支持多智能体”，而要看“失败时是否诚实报告、中断后能否正确恢复”。

### 6.4 供应链安全从“可选项”变为“必答题”
OpenCode 的 curl|bash 安装质疑、Qwen Code 的安装器供应链修复、Gemini 的 A2A 路径遍历修复、Codex 的 SHA-pin actions——安全加固正在从 CI 脚本蔓延到安装链路、依赖管理和运行时权限控制。**开发者在选型时应将供应链透明度纳入评估**，社区反馈是重要参考。

### 6.5 模型迭代速度与工具适配的“时间差”持续存在
gpt-5.6-luna 被多入口拒绝、Claude 新模型支持滞后、Gemini 兼容性回退——**新模型发布与 CLI 工具适配之间存在不可避免的延迟窗口**。多模型支持能力（如 Gemini CLI 快速添加 Claude Sonnet 4.5/Opus 4.8、OpenCode 的模型 fallback 链）正在成为降低该风险的核心手段。

### 6.6 会话持久化与“长会话可信度”是未被充分满足的刚需
从 Pi 的 auto-compaction 失效、Copilot 的事件存储耗尽、Codex 的子代理状态错乱到 Qwen 的会话恢复超时 ——**“长会话”场景下的可靠性已成为多个工具的共通短板**。随着 agentic 工作流变得更加自主和长时间运行（尤其在企业级自动化、后台任务场景），会话持久化的健壮性将直接影响工具的可用性天花板。开发者对接入长时运行 agent 工作流应保持审慎，建议在关键节点设计外部状态检查与降级兜底机制。


## 结论

AI CLI 工具生态正处于从“功能竞赛”向“质量竞赛”转换的关键节点。**活跃度高的工具都面临稳定性与安全性的“成长债”**，而活跃度低的工具（Kimi、Grok Build）则需要在基础可靠性上补课才能回到竞争牌桌。对于技术决策者，建议重点关注：**MCP 生产级可靠性、多智能体失败恢复能力、模型行为控制粒度、供应链透明度**四个维度的横向对比，这些将决定当前阶段的实际开发体验与长期可靠性。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据源**：`github.com/anthropics/skills` · 截止 2026-08-14
**说明**：源数据中 PR 评论数字段缺失（undefined），以下排行沿用仓库按评论数给定的顺序；当前 Top 20 PR 均为 **OPEN**，尚无合并。

---

## 一、热门 Skills 排行

### 1. skill-creator 评估工具链修复 — #1298 [OPEN]
- **功能**：修复 `run_eval.py` 对所有 skill 恒报 `recall=0%` 的严重缺陷，涉及评估产物安装、Windows 流读取、触发检测、并行 worker 四项修复。
- **社区热点**：与 Issue #556（12 条评论）互为印证，是官方 skill-creator 最严重的已知 bug，直接导致描述优化循环"对着噪声调优"。
- 链接：https://github.com/anthropics/skills/pull/1298

### 2. document-typography 排版质检技能 — #514 [OPEN]
- **功能**：对 AI 生成文档做排版质检，修复孤词换行（1–6 词溢出）、孤行标题（页尾滞留）、编号错位等 typographic 问题。
- **社区热点**："这些问题影响 Claude 生成的每一份文档"——通用性极强，被视为文档技能矩阵的刚需补充。
- 链接：https://github.com/anthropics/skills/pull/514

### 3. ODT 文档技能 — #486 [OPEN]
- **功能**：OpenDocument 格式（.odt/.ods）的创建、模板填充、读取及 ODT→HTML 转换，覆盖 LibreOffice / ISO 标准生态。
- **社区热点**：补齐 docx/pdf 之外的开源文档格式空白，触发词设计完整，讨论持续至 4 月中旬。
- 链接：https://github.com/anthropics/skills/pull/486

### 4. frontend-design 技能重构 — #210 [OPEN]
- **功能**：全面修订 frontend-design 技能，确保每条指令在单次对话中可执行，提升可操作性与内部一致性。
- **社区热点**：反映社区对"技能像教学文档而非操作手册"的普遍不满（与 Issue #202 同源）。
- 链接：https://github.com/anthropics/skills/pull/210

### 5. skill-quality-analyzer + skill-security-analyzer — #83 [OPEN]
- **功能**：两个元技能——从结构/文档/示例/资源等五维评估技能质量；对技能进行安全分析。
- **社区热点**：最早的"元技能"提案（2025-11），与官方 skill-creator 形成互补，带动后续治理类技能发展。
- 链接：https://github.com/anthropics/skills/pull/83

### 6. self-audit 自审技能 — #1367 [OPEN]
- **功能**：交付前先做机械文件存在性校验，再按损害严重度优先级执行四维推理审计（v1.3.0），声称技术栈无关。
- **社区热点**："质量门禁"理念代表，与 Issue #1385（推理质量门禁流水线提案）直接联动。
- 链接：https://github.com/anthropics/skills/pull/1367

### 7. testing-patterns 测试模式技能 — #723 [OPEN]
- **功能**：覆盖完整测试栈——Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、组件测试及边界用例。
- **社区热点**：测试生成/指导是高频需求，该技能无领域绑定、适用面广。
- 链接：https://github.com/anthropics/skills/pull/723

### 8. ServiceNow 平台技能 — #568 [OPEN]
- **功能**：覆盖 ITSM、ITOM、ITAM/SAM、FSM、HRSD、SPM、CSDM、IntegrationHub 的 ServiceNow 全平台助手，而非单一脚本工具。
- **社区热点**：最大体量的企业级 PR 之一，讨论持续 5 个月且更新至 2026-08-12，活跃度仍在上升。
- 链接：https://github.com/anthropics/skills/pull/568

**其他值得关注**：#525 pyxel 复古游戏技能（pyxel-mcp 作者提交，更新至 07-15）；#181 SAP-RPT-1-OSS 预测技能；#509 CONTRIBUTING.md 社区健康度补全。

---

## 二、社区需求趋势（Issues）

1. **安全与信任边界（第一议题）**：#492（43 条评论）质疑社区技能在 `anthropic/` 命名空间下分发构成信任边界滥用，用户可能对"官方"技能授予过高权限；#1175 关注 SharePoint Online 场景的权限下沉 SKILL.md 的安全风险。
2. **工具链可靠性**：#556 / #1169 独立复现 `run_eval.py` `recall=0%`；#62 用户 12 个技能无故消失；#1487 报告内置 `claude-api` 技能单次注入约 156k tokens 挤爆上下文窗口——官方工具链与内置技能的稳定性成为众矢之的。
3. **元技能与质量治理**：#1329 compact-memory（符号化压缩 Agent 长期记忆）、#1385 三段式推理质量门禁、#412 agent-governance 安全模式。社区倾向"用技能治理技能/Agent"。
4. **组织级共享与协作**：#228（👍 8）要求技能可在组织内直接共享，替代手动下载文件、Slack 传输、逐个上传的原始流程。
5. **生命周期与规范**：#202 批评 skill-creator 过于教学化、违背命名规范；#189 指出 document-skills 与 example-skills 插件内容重复导致上下文浪费；#12 docx 技能格式化不当致文档损坏。

---

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、内容完整且有明确用户价值，近期落地概率较高：

| PR | 技能/修复 | 落地理由 |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 官方工具链 blocker，合并优先级最高 |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 通用排版质检，零维护依赖 |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT | 文档矩阵补全，验收路径清晰 |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 测试技能需求确定性高 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 治理类代表，与 #1385 形成闭环 |
| [#568](https://github.com/anthropics/skills/pull/568) | ServiceNow | 企业用户持续催更，08-12 仍有更新 |
| [#1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene | 解决规划文件生命周期问题，社区接力协作 |
| [#1538](https://github.com/anthropics/skills/pull/1538) | 规范合规修复 | 修复技能违反 Agent Skills 规范问题，小而必需 |

---

## 四、Skills 生态洞察

**社区当前最集中的诉求不是"更多业务技能"，而是"更可靠的技能基础设施"——围绕评估工具链修复、安全审计、质量门禁等元技能与规范治理的讨论热度，已全面超过任何单一领域技能本身。**

---

# Claude Code 社区动态日报

**日期：2026-08-14** | 数据来源：github.com/anthropics/claude-code


## 今日速览

昨日本体发布 v2.1.231，修复了 MCP OAuth 登录时重定向 URI 不匹配的问题（针对 Slack 等使用预注册 OAuth 客户端的服务器）。社区讨论集中在模型行为上：#65961（默认冗长注释）收获 110 👍 成为最热 issue，#52477（用户记忆被覆盖）引发对齐争议。另外，大量文档类 issue 在昨日被统一标记 stale 并关闭。


## 版本发布

### v2.1.231

**修复内容**
- MCP OAuth 登录失败：当 MCP 服务器使用预注册 OAuth 客户端（如 Slack）时，登录回调重定向 URI 不匹配导致认证无法完成。

🔗 https://github.com/anthropics/claude-code/releases/tag/v2.1.231


## 社区热点 Issues

> 当日更新的 50 条 issue 中，27 条为文档类且被标记 stale 关闭，3 条处于 OPEN 状态。以下为最值得关注的 10 条。

### 1. #65961 [OPEN] [MODEL] Claude 默认输出冗长注释，无视停止指令
- **数据**: OPEN | 创建 2026-06-07 | 更新 2026-08-13 | 👍 110 | 💬 11
- **为什么值得关注**: 获 110 👍 为当日最高热度，说明“注释过载”是社区当前最大痛点。用户明确要求停止添加解释性注释，模型仍自行输出。
- **社区反应**: 评论区大量共鸣，认为这会拖慢代码审查、污染 diff，并影响对模型指令遵循度的信任。
- 🔗 https://github.com/anthropics/claude-code/issues/65961

### 2. #52477 [OPEN] [MODEL] Claude 覆盖用户记忆中的明确代词，默认男性偏向
- **数据**: OPEN | 创建 2026-04-23 | 更新 2026-08-13 | 👍 4 | 💬 12
- **为什么值得关注**: 用户已在 memory 中显式定义代词，Claude 仍自行覆盖并采用男性默认表达。属于模型对齐与“用户指令优先级”的深层问题，已开放近 4 个月仍未修复。
- **社区反应**: 12 条评论讨论活跃，用户认为这动摇了“Claude 会严格遵循用户自定义偏好”的基本信任。
- 🔗 https://github.com/anthropics/claude-code/issues/52477

### 3. #67682 [OPEN] [BUG] Dispatch 永久卡死，无法重置二维码配对状态（Windows 11）
- **数据**: OPEN | 创建 2026-06-11 | 更新 2026-08-13 | 💬 5
- **为什么值得关注**: Dispatch 在 Windows 11 上永久卡在失效状态，界面提示 “Can't reach your desktop” / “Asleep”，且无手动重置入口，直接影响移动端远程控制体验。
- **社区反应**: 多个用户确认可复现，问题涉及 cowork/desktop 联动，期待官方尽快修复。
- 🔗 https://github.com/anthropics/claude-code/issues/67682

### 4. #52601 [CLOSED/stale] [DOCS] 设置文档仍将 /config 配置指向 ~/.claude.json 而非 ~/.claude/settings.json
- **数据**: CLOSED | 创建 2026-04-23 | 更新 2026-08-13 | 💬 7
- **为什么值得关注**: 文档对配置文件位置的描述与实际行为不符，导致开发者将全局配置写入错误文件后不生效。
- **社区反应**: 7 条评论讨论了配置层级问题，但 issue 最终被 stale 自动关闭——社区担忧文档类问题是否被真正重视。
- 🔗 https://github.com/anthropics/claude-code/issues/52601

### 5. #51376 [CLOSED/stale] [DOCS] Worktree 文档缺少 /tui 与 /update 的会话中命令行为
- **数据**: CLOSED | 创建 2026-04-20 | 更新 2026-08-13 | 💬 6
- **为什么值得关注**: 在已有会话中进入 worktree 后，执行 `/tui` 或 `/update` 会发生什么？Git worktree 用户面临文档盲区，只能自己试验。
- **社区反应**: 评论请求补充交互式行为说明，但同样被 stale 关闭。
- 🔗 https://github.com/anthropics/claude-code/issues/51376

### 6. #52203 [CLOSED/stale] [DOCS] 认证文档遗漏已设置 CLAUDE_CODE_OAUTH_TOKEN 时 /login 的行为
- **数据**: CLOSED | 创建 2026-04-23 | 更新 2026-08-13 | 💬 5
- **为什么值得关注**: 当环境变量 `CLAUDE_CODE_OAUTH_TOKEN` 已配置时，`/login` 的交互行为没有文档说明，给企业令牌切换带来不确定性。
- **社区反应**: 用户希望在认证优先级文档中明确 `/login` 与 env token 的覆盖关系。
- 🔗 https://github.com/anthropics/claude-code/issues/52203

### 7. #51784 [CLOSED/stale] [DOCS] 认证文档缺少过期 CLAUDE_CODE_OAUTH_TOKEN 的恢复指南
- **数据**: CLOSED | 创建 2026-04-22 | 更新 2026-08-13 | 💬 4
- **为什么值得关注**: OAuth 长期令牌过期是必然事件，没有官方恢复步骤时，CI/CD 流水线会直接中断且排查困难。
- **社区反应**: 评论要求补充“令牌过期 → 重新认证”的明确流程，尤其对无人值守场景至关重要。
- 🔗 https://github.com/anthropics/claude-code/issues/51784

### 8. #52605 [CLOSED/stale] [DOCS] --agent 与 agent 设置文档遗漏 session permissionMode 行为
- **数据**: CLOSED | 创建 2026-04-23 | 更新 2026-08-13 | 💬 4
- **为什么值得关注**: 使用 `--agent` 或 `agent` 配置时，session 的 `permissionMode` 与预期不一致；Agent SDK 自动化脚本的权限控制存在盲区。
- **社区反应**: 评论认为这直接影响 Agent 场景的权限安全设计。
- 🔗 https://github.com/anthropics/claude-code/issues/52605

### 9. #52624 [CLOSED/stale] [DOCS] Plan 模式文档遗漏 /plan open 及现有计划复用行为
- **数据**: CLOSED | 创建 2026-04-24 | 更新 2026-08-13 | 💬 4
- **为什么值得关注**: `/plan open` 可恢复已有计划，但计划存储路径、复用规则、多轮迭代的兼容性均无文档说明，影响团队协作。
- **社区反应**: 用户希望明确计划文件格式与恢复机制，以更好地融入分支工作流。
- 🔗 https://github.com/anthropics/claude-code/issues/52624

### 10. #53076 [CLOSED/stale] [DOCS] 插件市场文档缺少未识别来源格式的处理行为
- **数据**: CLOSED | 创建 2026-04-25 | 更新 2026-08-13 | 💬 5
- **为什么值得关注**: 插件源配置格式非法时，系统如何报错、安装如何失败均无记录；对插件维护者与企业内部分发场景是常见坑点。
- **社区反应**: 评论认为应补充“无效源格式 → 安装失败”的排查指引。
- 🔗 https://github.com/anthropics/claude-code/issues/53076


## 重要 PR 进展

> 过去 24 小时 PR 更新仅 2 条，均为非功能性改动，已全部列出。

### #86537 [OPEN] 修复 CHANGELOG.md 重复单词
- **内容**: 修复 CHANGELOG.md 中 `CLAUDE_BASH_NO_LOGIN` 条目（v1.0.124）的重复单词 “to to”。
- **影响**: 纯文档修正，保证发布日志准确。
- 🔗 https://github.com/anthropics/claude-code/pull/86537

### #60280 [CLOSED] CI：SHA-pin 余下 actions/checkout 与 actions/github-script
- **内容**: 作为 #56784 的后续，对 6 个工作流（auto-close-duplicates、backfill-duplicate-comments、claude-dedupe-issues、claude-issue-triage 等）中的 `actions/checkout@v4` SHA 固定至 `34e114876b0b11c390a56381ad16ebd13914f8d5`（v4.3.1），并同步固定 `actions/github-script`。
- **影响**: CI 供应链安全加固，降低第三方 action 被篡改的风险。
- 🔗 https://github.com/anthropics/claude-code/pull/60280


## 功能需求趋势

| 方向 | 表现 |
|------|------|
| **模型行为控制** | #65961、#52477 表明开发者希望精细化控制输出风格（注释、语气），且用户 memory 中显式设置的偏好必须被严格遵循 |
| **文档与功能同步** | 大量文档 issue（设置路径、认证、MCP、插件）显示官方文档版本远落后于实际行为 |
| **MCP 生产级成熟** | v2.1.231 OAuth 修复只是开始；MCP header 扩展、认证恢复等边界场景需求持续上升 |
| **企业令牌生命周期** | `CLAUDE_CODE_OAUTH_TOKEN` 的 `/login` 交互与过期恢复缺乏官方指引，影响 CI/CD 集成 |
| **跨平台与远程连接** | Windows Dispatch 卡死问题（#67682）凸显桌面/移动协同的稳定性不足 |


## 开发者关注点

1. **“默认注释冗长”是当前最大痛点**：#65961 的 110 👍 说明大量开发者希望 Claude 在生成注释时更克制，并真正遵循“不要解释代码”这类指令。
2. **用户指令优先级令人担忧**：#52477 中 Claude 覆盖用户 memory 中的显式代词设置，引发了关于模型偏见与一致性信任的系统性质疑。
3. **文档缺口被 stale 机制掩盖**：约 27 个文档 issue 被批量标记关闭，但大多是“未修复仅过期”。开发者希望官方能给出明确的文档维护承诺，而非自动关闭了事。
4. **企业认证体验亟待完善**：长期令牌过期后的恢复流程、`/login` 与 env token 的优先级交互，是企业用户反复提及的高频需求。
5. **Windows 平台可靠性**：Dispatch 卡死后无手动重置手段，影响移动端办公的用户；此类问题应优先于新功能开发处理。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-14）

## 今日速览

今日 Codex 连续发布三个 rust 版本（0.148.0-alpha.11/12/13），迭代节奏明显加快；PR 侧主要围绕模型元数据暴露、MCP OAuth 回调、Guardian 工具审查上下文等方向密集推进。社区方面，Windows 沙箱相关问题仍是用户反馈最集中的区域，同时子代理状态持久化、新模型 gpt-5.6-luna 兼容问题也获得了较高关注。

## 版本发布

过去 24 小时发布了 3 个 alpha 版本，均为 0.148.0-alpha 系列的连续迭代，官方未提供详细变更日志：

- **rust-v0.148.0-alpha.13** — Release 0.148.0-alpha.13
- **rust-v0.148.0-alpha.12** — Release 0.148.0-alpha.12
- **rust-v0.148.0-alpha.11** — Release 0.148.0-alpha.11

链接：https://github.com/openai/codex/releases

## 社区热点 Issues

### 1. [App] 建议将 “Chats” 项目目录变为可配置
**#19909** | 评论 17 | 👍 35 | 更新 2026-08-13

应用当前将聊天数据存放在 `~/Documents/Codex`，但该目录常被 iCloud Drive 同步，不适合存放代码相关数据。社区高赞支持，诉求明确。  
链接：https://github.com/openai/codex/issues/19909

### 2. Windows 下 multi_agent_v2 拒绝 gpt-5.6-luna 模型
**#34700** | 评论 15 | 👍 36 | 更新 2026-08-13

Codex App 26.715.9868.0 / CLI 0.145.0 中，启用 multi_agent_v2 后 spawn_agent 无法识别 gpt-5.6-luna。这是今天讨论热度最高的模型兼容性问题，影响了 Windows 平台的多智能体工作流。  
链接：https://github.com/openai/codex/issues/34700

### 3. TUI 不支持 Markdown 数学公式渲染
**#18906** | 评论 15 | 👍 22 | 更新 2026-08-13

终端 UI 无法正确渲染行内 LaTeX 和块级公式，对使用 Codex 处理数学/科学类任务的用户影响明显，已成为 TUI 方向呼声较高的增强请求。  
链接：https://github.com/openai/codex/issues/18906

### 4. Windows 沙箱创建进程拒绝 MSIX 版 PowerShell
**#35871** | 评论 13 | 👍 3 | 更新 2026-08-13

当解析后的 shell 是 Microsoft Store 安装的 PowerShell 7（MSIX），沙箱以受限 token 启动进程时返回 `CreateProcessAsUserW failed: 5 (Access is denied.)`。Windows 沙箱兼容性问题的一个典型代表。  
链接：https://github.com/openai/codex/issues/35871

### 5. [Windows Desktop] browser.tabs.finalize() 导致整个应用退出
**#35210** | 评论 12 | 👍 0 | 更新 2026-08-13

在 Codex Desktop 中调用 `browser.tabs.finalize()` 不仅关闭标签页，而是直接将整个应用静默终止，属于严重稳定性缺陷。  
链接：https://github.com/openai/codex/issues/35210

### 6. [Windows] Computer Use 在应用选择前因 EPERM 失败
**#37029** | 评论 12 | 👍 3 | 更新 2026-08-13

Codex App 26.730.7989.0 上 Computer Use 功能在选中应用前即因 `EPERM lstat on Codex runtime` 失败，导致整个功能不可用。  
链接：https://github.com/openai/codex/issues/37029

### 7. Codex Desktop 重启后子代理状态错误恢复为 Working
**#37563** | 评论 12 | 👍 4 | 更新 2026-08-13

已关闭和已中止的子代理在应用重启后被恢复为 “Working” 状态，且这些会话实际并不存在。该问题与 #37042 高度相似，说明子代理状态持久化存在系统性缺陷。  
链接：https://github.com/openai/codex/issues/37563

### 8. Windows CLI 安装后找不到 codex-windows-sandbox-setup.exe
**#30829** | 评论 10 | 👍 0 | 更新 2026-08-13

干净安装后由于 bin junction 问题，CLI 设置流程无法定位沙箱安装程序，导致沙箱功能不可用。同类问题在 #28457 和 #38039 中反复出现。  
链接：https://github.com/openai/codex/issues/30829

### 9. [P0] macOS 应用启动时因解析 Claude Desktop 数据 OOM 崩溃
**#36523** | 评论 6 | 👍 1 | 更新 2026-08-13

macOS 应用在启动时 `external-agent-import` 会解析 Claude Desktop app-support 目录中高达 1.73 GB 的导入数据，造成 V8 heap OOM，26 小时内崩溃 26 次。被标记为 P0 回归，影响严重。  
链接：https://github.com/openai/codex/issues/36523

### 10. 远程 MCP scopes_supported 应从保护资源元数据中提取
**#15643** | 评论 7 | 👍 14 | 更新 2026-08-13

企业用户关注的问题：远程 MCP 授权时 `scopes_supported` 应从 resource metadata 文档中动态提取，而非写死。该 issue 持续活跃，代表 MCP 方向的重要技术债务。  
链接：https://github.com/openai/codex/issues/15643

## 重要 PR 进展

### 1. 暴露模型升级退役时间
**PR #38449** | 更新 2026-08-13

解析模型升级元数据中可选的 `retirement_at`（RFC 3339），并通过 `model/list` 在 `upgradeInfo.retirementAt` 中暴露为可空 Unix 时间戳。方便开发者感知模型退役计划。  
链接：https://github.com/openai/codex/pull/38449

### 2. 支持每服务器 MCP OAuth 回调端口
**PR #38448** | 更新 2026-08-13

新增 `oauth.callback_port` 配置项，支持插件 MCP 声明和技能依赖元数据中指定回调端口，并优先使用服务器特定的回调端口。解决多 MCP 服务器端口冲突问题。  
链接：https://github.com/openai/codex/pull/38448

### 3. 本地守护进程会话增加运行任务退出选项
**PR #38447** | 更新 2026-08-13

任务运行中按下 Ctrl-C 时提供更清晰的退出菜单：取消任务并留在 Codex、退出但保持任务后台运行、或停止任务并退出。改善长任务状态控制体验。  
链接：https://github.com/openai/codex/pull/38447

### 4. 保留客户端开发者消息跨上下文压缩
**PR #38445** | 更新 2026-08-13

启用 `retain_client_developer_messages` 后，客户端作者添加的开发者指令在上下文压缩后保留，避免压缩后丢失关键指令。  
链接：https://github.com/openai/codex/pull/38445

### 5. Guardian V2 获得完整工具操作上下文
**PR #38441** | 更新 2026-08-13

将原始 ToolPayload（含操作和会话上下文）暴露给工具生命周期审查钩子，使 Guardian V2 能基于完整上下文而非仅工具名称评估风险。  
链接：https://github.com/openai/codex/pull/38441

### 6. app-server 支持分页线程回滚
**PR #38440** | 更新 2026-08-13

新增实验性 `thread/revert` 请求，可将分页线程的持久化历史回滚到 `beforeTurnId` 之前的前缀，保留线程 ID，同时中断活动轮次并重载替换历史。  
链接：https://github.com/openai/codex/pull/38440

### 7. 为本地 MCP 请求增加 rustls 回退
**PR #38436** | 更新 2026-08-13

平台 TLS 后端无法与 HTTPS 端点协商协议版本时，自动用 rustls 重试可重放的本地 MCP 请求一次，提升 TLS 兼容性。  
链接：https://github.com/openai/codex/pull/38436

### 8. 按认证模式路由精选插件目录
**PR #38429** | 更新 2026-08-13

模型提供商无法可靠识别可用的精选插件目录时，改为根据认证模式选择：ChatGPT 认证可配合自定义提供商，未认证会话则使用 API 兼容目录。  
链接：https://github.com/openai/codex/pull/38429

### 9. exec-server 在执行器上启动托管网络代理
**PR #31453** | 更新 2026-08-13

将经过净化的有效托管网络策略发送到远程 exec-server，在执行器上启动 HTTP/SOCKS 代理监听器，并派生子进程环境和沙箱端口。MITM、凭据注入和钩子配置在边界确认前保持 fail-closed。  
链接：https://github.com/openai/codex/pull/31453

### 10. 执行器断线后恢复能力发现
**PR #38420** | 更新 2026-08-13

瞬态执行器断线后，能力发现和技能目录之前会一直停留在缓存失败状态；该 PR 使执行器重连后自动重放能力发现流程，避免整个线程内功能不可用。  
链接：https://github.com/openai/codex/pull/38420

## 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

- **Windows 平台稳定性持续承压**（约 10+ 条相关 Issue）：包括沙箱进程启动失败（#35871、#30829、#28457）、自动升级损坏 CLI 启动器（#38039）、uniform exec 报错（#38290）、鼠标卡顿（#33074）、映射驱动器工作区沙箱失败（#19599）。Codex Desktop 在 Windows 上的体验问题正成为社区最集中的反馈来源。

- **子代理状态恢复问题突出**（#37563、#37042、#34700）：已完成/中止的子代理在重启后被错误恢复为 Working/Active，或者系统拒绝使用新模型作为子代理。说明多智能体会话的持久化和恢复仍不稳定。

- **TUI / Vim 模式增强需求持续累积**（#18906、#21850、#32745、#33296）：Markdown 数学渲染、默认 Insert 模式、c* 操作支持、基础键位缺失等，说明终端用户对 Codex TUI 的编辑器体验有较高期待。

- **MCP 生态逐步深化**（#15643、PR #38448、PR #38436、PR #31901）：从 OAuth 回调、TLS 回退到 $ref 解析，社区和官方都在推动 MCP 接入的完善。

- **新模型支持问题开始浮出水面**（#34700、#37910）：gpt-5.6-luna 在 Windows 子代理和 IDE 扩展中出现兼容问题，模型迭代对新功能适配提出了更高要求。

- **性能与资源消耗是长期焦虑点**（#36523、#31198、#33074）：OOM 崩溃、145GiB 日志膨胀、系统鼠标卡顿等性能问题频繁被报告，用户对 Codex 的资源占用非常敏感。

## 开发者关注点

- **Windows 沙箱是“重灾区”**：从 MSIX PowerShell 被拒绝（#35871）到 setup.exe 找不到（#30829、#28457），沙箱在 Windows 上的一连串问题已经形成了多个高票 issue。开发者希望官方能系统性解决 Windows 沙箱的安装和进程隔离问题，而不是逐个打补丁。

- **会话恢复可靠性**：无论是 CLI 的 resume 失败（#37719、#24369）、NUL 字节导致 400，还是 Desktop 的子代理状态恢复错乱（#37563、#37042），会话持久化的可靠性和向后兼容性已成为高频痛点。

- **新模型兼容性亟待确认**：gpt-5.6-luna 被多个入口（multi_agent_v2、IDE 扩展、subagent summon）拒绝，用户对新模型的可用性非常敏感，需要官方更快地完成全链路适配。

- **配置灵活性不足**：Chats 目录不可配置（#19909）、/copy 无法指定历史回答（#24073）等请求说明：用户希望在更多细节上拥有控制权，而不仅是宏大的功能特性。

- **性能问题影响信任度**：macOS OOM 崩溃（#36523）、145GiB 日志膨胀（#31198）、鼠标卡顿（#33074）这类问题直接削弱用户对 Codex 可用于日常开发的信心，建议官方在性能回归测试上加大投入。

- **应用层细节缺失**：例如 “Collapse all” 按钮在 macOS 上消失（#34452）、桌面端 MFA 登录死循环（#34934）等细节问题，虽然单条评论不高，但持续有用户反馈，说明桌面客户端的完成度仍有提升空间。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-14）

## 今日速览

今日社区动态集中于 **Agent 可靠性与评估体系建设**：Nightly v0.56.0 引入 eval 验证与工具调用格式化器；热门 Issue 聚焦 Subagent 假成功、通用 Agent 挂起、Auto Memory 系统缺陷等稳定性问题。PR 方面，容量错误重试、多轮请求回滚、A2A 安全加固等修复进展值得关注，同时 Claude Sonnet 4.5 / Opus 4.8 模型支持已提交 PR。

## 版本发布

### v0.56.0-nightly.20260813.g1ac337739
- **Feat/eval validate**（PR #28344）：新增 eval 验证能力，由 @ved015 贡献。
- **feat(evals)**（PR #28305）：添加工具调用格式化器，并集成失败摘要，提升评估可观测性。
- 同步更新 v0.55.1 的 Changelog。

> 该 Nightly 版本核心方向为**评估基础设施强化**，为行为测试提供更细粒度的工具调用记录与失败分析。

---

## 社区热点 Issues（10 个）

### 1. Subagent 在 MAX_TURNS 后被误报为成功
- **Issue #22323** | P1 | 评论 12 | 👍 2
- 现象：`codebase_investigator` 子代理在达到最大轮次后，`Termination Reason` 显示 `GOAL`，但实际未完成任何分析，导致中断被隐藏。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Generalist Agent 永久挂起
- **Issue #21409** | P1 | 评论 8 | 👍 8
- 现象：CLI 一旦委托给通用 Agent 便永远挂起，连“创建文件夹”这类简单操作也如此；用户需等待一小时后手动取消。
- 社区反应：8 个 👍 表明受影响用户较多，是当前最痛的稳定性问题之一。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21409

### 3. 组件级评估体系（EPIC）
- **Issue #24353** | P1 | 评论 7
- 内容：承接 #15300 中的“行为评估”概念，目前已生成 76 个行为测试，将该体系扩展至更多 Gemini 组件。
- 链接：https://github.com/google-gemini/gemini-cli/issues/24353

### 4. Auto Memory 无限重试低信号会话
- **Issue #26522** | P2 | 评论 5
- 问题：后台提取代理仅将成功读取的会话标记为已处理；对于低信号会话会反复重试，浪费资源。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26522

### 5. Shell 命令执行完成后仍卡在 “Waiting input”
- **Issue #25166** | P1 | 评论 4 | 👍 3
- 现象：简单 CLI 命令执行结束后，终端仍显示命令活跃并处于等待输入状态，影响自动化流程。
- 链接：https://github.com/google-gemini/gemini-cli/issues/25166

### 6. Browser 子代理在 Wayland 下失败
- **Issue #21983** | P1 | 评论 4 | 👍 1
- 现象：Browser Agent 在 Wayland 会话中启动即失败，`Termination Reason` 为 `GOAL`，误导性回报。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21983

### 7. 工具数量超 128 时报 400 错误
- **Issue #24246** | P2 | 评论 3
- 问题：可用工具过多时 Gemini CLI 直接报 400 错误，用户期望按启用范围智能裁剪工具集。
- 链接：https://github.com/google-gemini/gemini-cli/issues/24246

### 8. Subagents 自 v0.33.0 以来未经授权运行
- **Issue #22093** | P1 | 评论 3
- 安全问题：更新至 v0.33.0 后子代理（如 generalist）自动启用，即使用户已在配置中禁用；用户预期只有 MCP 生效。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22093

### 9. 建议：Session Browser 支持自定义重命名会话
- **Issue #28805** | P3 | 评论 1（新提交）
- 需求：葡萄牙语用户建议 Session Browser 不再仅以首条 prompt 文本显示会话名称，允许用户自定义命名。
- 链接：https://github.com/google-gemini/gemini-cli/issues/28805

### 10. Auto Memory 需要确定性脱敏并减少日志
- **Issue #26525** | P2（Security）| 评论 4
- 问题：Auto Memory 将本地 transcript 发送至模型时，提示词要求脱敏发生在内容进入模型上下文之后，存在隐私风险；且服务可能记录现有 skill。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26525

---

## 重要 PR 进展（10 个）

### 1. 容量错误上下文感知重试与 TTL
- **PR #28790** | P1 | 已合并
- 修复 #28761 的容量耗尽重试回归：为非交互运行引入静默重试与退避策略，并支持 2 次静默重试。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28790

### 2. 取消/中止时回滚整个多轮请求
- **PR #28801** | 已合并
- 修复取消多轮提示后聊天历史停留在未完成状态的问题，避免后续新请求基于损坏上下文运行。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28801

### 3. 标准化 Git 环境与工作区状态
- **PR #28792** | 已合并
- 统一 Git 子进程环境变量，修复工作区信任评估中的状态初始化问题，确保内部 Git 工具可预测执行。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28792

### 4. 新增 Claude Sonnet 4.5 与 Opus 4.8 模型定义
- **PR #28803** | 已合并
- 添加 `claude-sonnet-4-5`、`claude-opus-4-8` 常量、别名解析与默认模型配置，扩展多模型支持。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28803

### 5. A2A 服务器强制认证与路径遍历修复
- **PR #28699** | 待合并
- 修复 A2A 自定义路由未经过 `UserBuilder` 认证的问题，并阻止检查点路径遍历，属于高价值安全加固。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28699

### 6. vscode-ide-companion stop() 挂起与 keep-alive 阈值修复
- **PR #28789** | 待合并
- 修复流式 MCP 会话开启时 `IdeServer.stop()` 永远挂起，以及 keep-alive 重试阈值失效的资源泄漏问题。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28789

### 7. 损坏的 MCP 启用配置不再被当作空配置
- **PR #28787** | 待合并
- 修复 JSON 解析失败被吞掉并返回空对象，导致所有 MCP 服务器默认启用的问题。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28787

### 8. WSL2 剪贴板图片粘贴支持
- **PR #27588** | 待合并
- 针对 WSL2 环境，通过 PowerShell 互操作读取 Windows 剪贴板图片并保存为 PNG，修复 #22274。
- 链接：https://github.com/google-gemini/gemini-cli/pull/27588

### 9. Windows 下 ripgrep EFTYPE 修复
- **PR #25378** | 待合并（Help Wanted）
- 修复 Windows 上 `grep_search` 因下载二进制与主机架构不匹配导致的 `spawn EFTYPE` 错误（#22784）。
- 链接：https://github.com/google-gemini/gemini-cli/pull/25378

### 10. 保留 functionCall 中的 thoughtSignature 修复 400 错误
- **PR #28586** | 已合并
- 修复 v0.53.0 引入的并行工具调用回归：`thoughtSignature` 被剥离导致 400 Bad Request。
- 链接：https://github.com/google-gemini/gemini-cli/pull/28586

> **安全提醒**：PR #28797 提交了一个在 CI 中记录工作流上下文元数据的探针脚本，声称用于安全研究（OSS-VRP），社区需注意审查该供应链调查类 PR 的合理性与范围。

---

## 功能需求趋势

从近 24 小时 Issues 中提炼的社区重点关注方向：

1. **Agent/子代理稳定性**：多个 P1 Issue 指向 Subagent 挂起、假成功回报、turn 中断后状态错乱，Agent 可靠性已成为社区最关心的主题。
2. **Auto Memory 隐私与效率**：连续 4 个相关 Issue（#26516/#26522/#26523/#26525）提出无限重试、日志过度输出、脱敏时机、无效补丁隔离等改进需求，表明用户对内存功能的安全性和可持续性有较高期待。
3. **评估体系（Evals）扩展**：EPIC #24353 推动组件级行为测试，Nightly 与多个 PR 均在充实 eval 工具链，官方在评估基础设施上的投入明显。
4. **AST 感知代码理解**：#22745 与 #22746 探索 AST 感知的文件读取、搜索和代码库映射，目标减少 token 噪声并提升导航精度。
5. **终端体验优化**：Shell 卡死、resize 闪烁、编辑器退出后渲染损坏（#25166/#21924/#24935）等痛点持续被反馈。
6. **新模型与多模型支持**：Claude 新模型定义 PR 表明社区对多模型扩展保持活跃关注。

---

## 开发者关注点

- **假成功与错误状态上报**：多个 Issue（#22323、#21983）都出现 `Termination Reason: GOAL` 但任务未真正完成的情况，开发者普遍对“错误被吞掉”非常敏感。
- **Agent 自主性带来的安全风险**：#22093 权限绕过、#22672 破坏性命令（`git reset`/`--force`）等问题，凸显用户对 Agent 行为边界的担忧。
- **配置与自定义技能失效**：settings.json 覆盖被忽略（#22267）、符号链接 Agent 不被识别（#20079）等配置类问题影响个性化工作流。
- **平台兼容性短板**：Wayland 下浏览器代理失效、WSL2 剪贴板、Windows ripgrep 架构不匹配等，跨平台体验仍需打磨。
- **工具数量与上下文管理**：400 错误（>128 工具）、模型频繁在随机位置创建临时脚本（#23571），要求 CLI 更智能地管理工具作用域与文件写入策略。

> 整体来看，社区对 Gemini CLI 的期待正从“功能丰富度”转向“稳定性与可控性”——希望 Agent 不挂起、不误报、不越权，同时也希望官方在评估和内存隐私上继续投入。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-14

## 今日速览

今日发布 v1.0.80-0，新增 `--enable-mcp-server` 参数用于在当前运行中重新启用被禁用的 MCP 服务器，并优化了多客户端共享会话的界面提示。社区方面，自定义 agent 的推理强度（reasoning effort）配置问题持续发酵，多条相关 Issue 被反复提及；同时远程 MCP 服务器的 OAuth 认证可靠性成为新的关注焦点，一天内涌入多条高价值 bug 报告。

## 版本发布

**v1.0.80-0** ([Release](https://github.com/github/copilot-cli/releases))

**Added**
- 新增 `--enable-mcp-server` 参数，允许在当前运行中重新启用因设置而被禁用的 MCP 服务器。
- 会话共享状态现在会在界面上明确显示：当其他客户端加入同一会话时，`--ahp` 模式下的会话行会以 `2 clients`（或更多）开头；Sessions 标签页中也有对应标识。

## 社区热点 Issues（精选 10 条）

1. **[#2904] Custom Agent YAML Frontmatter Should Support Reasoning Effort** ([链接](https://github.com/github/copilot-cli/issues/2904))
   - 👍 20 | 💬 6 | 已开放近 4 个月
   - 自定义 `.agent.md` 文件支持 `model` 字段锁定模型，但无法为每个 agent 单独设置推理强度（reasoning effort），只能通过全局 `--effort` 参数控制。这是模型配置灵活性方面呼声最高的需求，且有 20 👍 支撑。

2. **[#4345] Reasoning effort 'medium' 不适用于 'claude-haiku-4.5'** ([链接](https://github.com/github/copilot-cli/issues/4345))
   - 👍 4 | 💬 5 | 已关闭
   - 当 `copilot_cli_opus_medium_effort_default` 和 `copilot_cli_gpt_5_4_mini_for_explore` 两个功能开关同时生效时，子 agent 执行反复抛出 `Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'` 错误。今日另有 [#4473](https://github.com/github/copilot-cli/issues/4473) 报告完全相同的问题，说明该 bug 影响面仍在扩大。

3. **[#3954] `explore` 工具硬编码模型，忽略自定义/DeepSeek API 配置** ([链接](https://github.com/github/copilot-cli/issues/3954))
   - 👍 3 | 💬 3
   - 更新到 v1.0.65 后，`explore` 工具无视自定义模型配置（如 DeepSeek 端点），强制将 `gpt-5.4-mini` 传给 API 端点。使用第三方模型网关的开发者会直接被阻断。

4. **[#4482] `allowed_directories` 配置不生效，目录访问提示持续弹出** ([链接](https://github.com/github/copilot-cli/issues/4482))
   - 新增 triage | 💬 0
   - 在 `~/.copilot/permissions-config.json` 中配置的 `allowed_directories` 无法抑制 shell 命令的“路径超出允许列表”提示，而用 `/add-dir` 添加相同路径却可以。权限配置行为不一致，影响自动化流程。

5. **[#4480] Atlassian MCP OAuth 失败——v1.0.79 回归** ([链接](https://github.com/github/copilot-cli/issues/4480))
   - 新增 triage | 💬 0
   - 升级到 1.0.79 后，连接 `https://mcp.atlassian.com/v1/mcp` 时 OAuth 发现流程报错 `Incompatible authorization server: authorization server advertised an issuer that does not match the URL its metadata was discovered at`（RFC 8414 §3.3）。1.0.71 正常，确认是回归。

6. **[#4472] 远程 MCP 并发工具调用在 token 刷新时互相取消** ([链接](https://github.com/github/copilot-cli/issues/4472))
   - 新增 triage | 💬 0
   - 当多个工具调用并发命中同一个 OAuth 保护的 Streamable HTTP MCP 服务器且 token 已过期时，每个调用都会独立触发刷新并创建新的 `rmcp::service` 实例，导致正在执行的工具调用被以“transport closed”取消。并发场景下 MCP 可靠性隐患较大。

7. **[#4467] 长时运行 agent 会话耗尽事件存储，会话状态不可靠** ([链接](https://github.com/github/copilot-cli/issues/4467))
   - 💬 0
   - 产生大量子 agent 的长时间会话会耗尽远程会话事件存储，之后会话状态和交接变得不可靠：会话显示为 inactive 或 cancelled，但 CLI 进程实际仍在运行。长时间任务有被误判的风险。

8. **[#4468] Windows 下 `--server --stdio` 进程泄漏——每会话累计 4 个扩展主机进程** ([链接](https://github.com/github/copilot-cli/issues/4468))
   - 💬 0
   - windows 桌面应用以 `--server --stdio` 方式托管 copilot 时，每个会话创建 4 个扩展主机子进程，且会话结束后不终止，持续累积直到服务退出。Windows 平台资源泄漏问题，生产环境下会拖垮机器。

9. **[#4469] 孤儿 `permission.requested` 事件在每次会话恢复时重放** ([链接](https://github.com/github/copilot-cli/issues/4469))
   - 💬 0
   - 一个长期反复恢复的会话连续一周每次启动都弹出“Allow directory access”提示，引用的是 10 天前已完成的 bash 命令路径。批准后仍会再次弹出，无法消除。权限事件的持久化和清理存在缺陷。

10. **[#4470] 功能请求：列出当前正在运行的 CLI 会话及状态** ([链接](https://github.com/github/copilot-cli/issues/4470))
    - 新增 triage | 💬 0
    - 参考 Anthropic Claude Code 的 `claude agents --json` 命令，希望 Copilot CLI 也提供类似接口，输出每个会话的 id、name、cwd、status（idle/busy/waiting/blocked），便于构建外部监控面板。

## 重要 PR 进展

过去 24 小时内仅 1 条 PR 更新（总量偏低，可能处于版本发布前的合并窗口）：

- **[#4476] docs: document proposed custom-agent effort frontmatter (Option A)** ([链接](https://github.com/github/copilot-cli/pull/4476))
  - 状态：已关闭
  - 针对 #2904 的 **Option A** 方案（专用 `effort` 字段，与 `model` 平行），在 README.md 中新增 “Custom Agents” 参考章节，覆盖 `name`、`description`、`model` 现有字段及新提出的 `effort` 字段。作为文档先行 PR，社区尚未形成最终结论。

## 功能需求趋势

- **MCP 可靠性压倒性关注**：过去 24 小时的 27 条 Issue 中有约三分之一涉及 MCP——包括 OAuth 刷新竞态（#4472）、Atlassian OAuth 回归（#4480）、Windows socket 10013（#4463）、Entra 静默刷新 scope bug（#4464）、5xx 初始化硬失败（#4466）、大小写敏感的服务器名冲突（#4478）等。远程 MCP 的认证流程和容错机制是当前最集中的痛点。
- **推理强度（Reasoning Effort）的精细化配置**：从 #2904 的 feature request、#4345/#4473 的兼容性 bug，到 #4476 的文档 PR，社区对“按 agent 设置 reasoning effort”的需求已形成完整的需求-缺陷-方案闭环，是当前模型功能方向的第一优先级。
- **模型选择仍不可控**：`explore` 工具硬编码模型（#3954）、code-review agent 模型覆盖被忽略（#4462）、Task 工具模型倍率降级（#3565）等表明，用户对自定义模型端到端可控的诉求仍未解决，特别是使用第三方 API 的开发者受影响最深。
- **会话生命周期管理**：#4467（事件存储耗尽）、#4468（进程泄漏）、#4469（事件重放）、#4477（stop 后会话丢失）、#4474（会话被静默归档）集中暴露了长会话/会话恢复场景下的可靠性短板。

## 开发者关注点

- **MCP OAuth 流程是当前最大的稳定性隐患**：从 Atlassian 连接失败（#4480）、并发刷新互相干扰（#4472）到 Windows 权限错误（#4463）和 Entra 刷新 scope bug（#4464），多条独立报告指向同一方向——远程 MCP 的认证实现亟需整体加固。
- **模型配置的“隐性覆盖”令开发者困惑**：多个 Issue 反馈模型配置“被静默忽略”或“被强制替换”（#3954、#4462），开发者期望明确的优先级规则，而不是在运行时才发现实际使用模型与配置不符。
- **权限系统的行为不一致**：#4482（allowed_directories 不生效）和 #4469（权限事件重放无法消除）反映出权限配置的持久化和 UI 反馈存在断裂，影响自动化脚本的可信度。
- **Windows 平台问题密集出现**：#4463、#4468 以及权限相关的跨平台问题，说明 Windows 下的网络栈和进程管理测试覆盖有待加强。
- **新功能/新版本带来的回归风险**：#4480 确认 1.0.79 引入 OAuth 回归，#4465 质疑 1.0.79 文档宣称的 `autoUpdate` 功能未生效——版本发布节奏快，但回归测试需同步跟上。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-14）

## 1. 今日速览

过去 24 小时内，Kimi Code CLI 仓库无版本发布、无 PR 更新，社区讨论集中在 3 个活跃 Issue 上：#2598 ACP/print 流式响应静默挂死 与 #2597 单次 LLM 失控生成 88k 乱码 token，反映出稳定性与生成安全方面的紧迫隐患；#1283 记忆系统功能请求（38 条评论）则延续了社区对跨会话上下文持久化的强烈诉求。

## 2. 版本发布

本期无版本发布。

## 3. 社区热点 Issues

过去 24 小时更新时间窗口内共有 3 个活跃 Issue，以下全部列出。

### #1283 [enhancement] Feature Request: Memory System - Persistent context across sessions

- 作者：CatKang｜创建：2026-02-27｜更新：2026-08-13｜评论：38｜👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1283

**为什么重要**：这是仓库中讨论度最高的功能请求之一。该 Issue 提出构建完整的记忆系统，涵盖 AI 自动管理的笔记（automatic memory）与用户显式定义的指令（manual memory），使 CLI 能够跨会话记住项目模式、编码风格和用户偏好。对于希望把 Kimi Code CLI 作为日常主力编码助手的开发者来说，这是“从工具到协作伙伴”的关键一步。

**社区反应**：38 条评论说明讨论热度持续不减，但围绕自动记忆的实现方式、上下文窗口占用、记忆检索准确性和隐私边界仍存在明显分歧。该需求自 2 月发起至今仍未进入开发阶段，建议关注后续方案设计文档。

### #2598 ACP/print 流式响应静默挂死：无空闲超时、被顶替轮 partial 不落 wire（0.31.1 只覆盖 Esc 场景）

- 作者：ai-agent-workbench｜创建：2026-08-09｜更新：2026-08-13｜评论：1｜👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2598

**为什么重要**：这是一个严重的稳定性缺陷，直接影响 ACP（Agent Client Protocol）模式下的自动化工作流。作者详细描述了复现路径：在 `kimi acp` 流式对话中，内容 delta 全部到达后，终端 `[DONE]`/finish 帧迟迟不来，CLI 又没有空闲超时配置项，导致 `session/prompt` 无限等待；此时用户发送下一条消息，挂死轮会被静默顶替，且已流式生成的答复从未写入 wire.jsonl（无 `content.part`、无 `usage.record`）。这意味着不仅进程阻塞，完整的会话数据也会丢失。

**社区反应**：目前仅 1 条评论，可能因为 ACP 模式仍属于相对小众的使用场景，但该问题一旦触发就是阻断性的。作者明确指出 0.31.1 的修复只覆盖了 Esc/取消场景，说明此类超时与数据落盘问题需要系统性解决，而非零散打补丁。

### #2597 Bug: Runaway garbled generation — 88k tokens of gibberish in one LLM step (step e6f3748b)

- 作者：kdp123｜创建：2026-08-08｜更新：2026-08-13｜评论：1｜👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2597

**为什么重要**：作者在一次正常交互会话中，模型出现失控生成——单个 LLM 步骤运行约 3214 秒（近 53 分钟），输出了 88,114 个 token 的乱码，包含多语言碎片、损坏的 Markdown 和无限重复片段。这暴露了两个关键问题：CLI 层缺少输出长度/时长的硬性护栏，以及缺乏对“异常重复/乱码生成”的实时检测能力。对于按 token 计费的用户，这类事故会造成显著的成本损失；同时，用户的终端被长时间占用，交互体验被严重破坏。

**社区反应**：当前回复较少，但 Issue 已进入维护者视野。开发者应关注后端采样参数、客户端 max_tokens 兜底逻辑以及运行时中断能力（如 Ctrl+C 是否能在生成循环中及时生效）。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新或合并。社区当前注意力集中在上述 Issue 的问题报告与讨论上，尚未见到对应的修复 PR。希望后续能看到针对 #2598（空闲超时、wire 落盘）与 #2597（生成护栏）的代码级修复。

## 5. 功能需求趋势

基于近 24 小时活跃 Issue 的观察，社区最关注的功能方向集中在以下三类：

- **跨会话记忆与上下文持久化**：开发者不希望每次启动 CLI 都“从零开始”，而是希望工具能记住项目背景、用户偏好和常用模式（#1283）。这是远期最受期待的能力，但设计复杂度也最高。
- **流式会话的可靠性与可观测性**：要求空闲超时配置、正确的 finish 帧处理、被顶替轮次的数据持久化等。自动化 Agent 场景对静默挂死和会话数据丢失零容忍（#2598）。
- **生成安全与成本控制护栏**：需要硬性 max_tokens 限制、异常生成检测、手动中断机制，防止单次事件烧掉大量 token 和用户时间（#2597）。

## 6. 开发者关注点

- **无限等待问题**：流式响应完成后缺少结束帧且无空闲超时，导致自动化会话被永久阻塞。
- **日志完整性**：被顶替轮次的 partial 内容不写入 wire.jsonl，既丢失关键结果，也让事后排查变得困难。
- **失控生成的兜底机制**：单次 88k token 乱码表明仅依赖模型层限制是不够的，CLI 需要客户端侧的主动保护和实时终止手段。
- **记忆系统的边界**：虽然开发者普遍期待记忆功能，但自动记忆带来的上下文污染、隐私泄露和“错误记忆”风险仍是社区讨论中的核心顾虑。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-14

## 今日速览

OpenCode 发布 v1.18.18 补丁，重点修复 Kimi 官方/ Moonshot 提供商系统提示词选择错误及 xAI 模型高推理强度（xhigh）失效问题。社区层面，关于旧版布局去留（#37012，41 👍）与 `/reload` 命令（#6719，77 👍）的讨论持续高热；同时多项安全相关 Issue（`curl|bash` 安装无完整性校验、上下文修剪静默丢弃指令、`webfetch` SSRF）集中曝光，开发者对供应链与指令完整性风险关注度明显上升。

---

## 版本发布

### v1.18.18
- **修复**：为官方 Moonshot 与 Kimi 提供商正确定制 Kimi 系统提示词
- **修复**：修复 xAI 模型的 xhigh reasoning effort 不生效问题

🔗 https://github.com/anomalyco/opencode/releases/tag/v1.18.18

---

## 社区热点 Issues（10 个）

**1. [FEATURE] 保留旧版布局选项** — #37012  
作者：darkine24th ｜ 评论 37 ｜ 👍 41  
新布局需在应用内多次导航才能触达常用功能，而旧布局主窗口即可直达几乎所有操作；此外旧版工作区（workspace）能力也被削弱。这是目前社区分歧最大的 UI 演进之争，高赞与长评论表明大量老用户面临迁移阵痛。  
🔗 https://github.com/anomalyco/opencode/issues/37012

**2. [FEATURE] 新增 /reload 命令** — #6719  
作者：wojons ｜ 评论 15 ｜ 👍 77  
希望提供 `/reload` 以重新加载全局/项目级 `opencode.jsonc` 与 `.opencode/` 配置，免去重启。77 个 👍 居本期所有 Issue 之首，是社区呼声最高的效率型功能。  
🔗 https://github.com/anomalyco/opencode/issues/6719

**3. "Copied to clipboard" 实际未复制** — #41470  
作者：WqxLoveCoding ｜ 评论 15 ｜ 👍 1  
在 VSCode Server（Docker 环境）中使用 OpenCode 时，界面提示已复制但系统剪贴板无内容。远程/容器化开发场景下的基础能力缺陷，影响面较大。  
🔗 https://github.com/anomalyco/opencode/issues/41470

**4. 回归：插件 provider.models() 钩子无法填充自定义提供商** — #25630  
作者：ErcinDedeoglu ｜ 评论 15 ｜ 👍 6  
PR #25167 合并后，由用户在 `opencode.jsonc` 中声明的自定义提供商（id 不在 models.dev 目录中）无法再通过插件 `provider.models()` 钩子注入模型。属于插件 API 回归，影响自定义模型接入工作流。  
🔗 https://github.com/anomalyco/opencode/issues/25630

**5. TypeScript LSP 在 package.json 位于子目录时不生效** — #18694  
作者：x1unix ｜ 评论 7 ｜ 👍 13  
Go + React 项目中前端 TS 代码位于 `/web` 子目录时，仓库根目录运行 opencode 不会启用 TS 语言服务。Monorepo 常见痛点，13 个 👍 说明需求普遍。  
🔗 https://github.com/anomalyco/opencode/issues/18694

**6. GitHub Copilot 提供商显示零模型** — #42083  
作者：Keylessboi ｜ 评论 5 ｜ 👍 1  
`opencode auth login -p github-copilot` 认证成功，但模型列表中完全不出现 Copilot 模型，`opencode models` 甚至提示 “Provider not found”。官方提供商集成形同虚设。  
🔗 https://github.com/anomalyco/opencode/issues/42083

**7. [SECURITY] opencode upgrade 使用 curl|bash 且无完整性校验** — #42434  
作者：shafqatevo ｜ 评论 3 ｜ 👍 0  
远程脚本直接管道至 bash，存在供应链/TOCTOU 风险，影响所有 curl 安装用户。属中危但触发条件简单（用户确认升级即执行）。  
🔗 https://github.com/anomalyco/opencode/issues/42434

**8. [SECURITY] 上下文修剪静默丢弃指令/约束内容** — #42437  
作者：shafqatevo ｜ 评论 2 ｜ 👍 0  
`session/compaction` 在压缩上下文时可能静默丢弃承载指令或约束的内容，构成指令完整性破坏，被标记为 Medium-High。对 Agent 行为可靠性有深远影响。  
🔗 https://github.com/anomalyco/opencode/issues/42437

**9. opencode2 篡改共享 V1 数据库，破坏 1.x 共存** — #42260  
作者：timrichardson ｜ 评论 2 ｜ 👍 0  
opencode2 迁移数据库 schema 后，V1 的 `/move` 命令失效，会话被困在 worktree 中。2.0 与 1.x 并存用户的迁移冲突问题，官方需尽快明确数据隔离策略。  
🔗 https://github.com/anomalyco/opencode/issues/42260

**10. bash 权限逃逸：`--` 双连字符绕过 ask 确认** — #39931  
作者：nikitakot ｜ 评论 3 ｜ 👍 0  
包含 `--` 的 bash 命令可绕过 `"bash": "ask"` 权限限制。安全敏感型 bug，同时涉及权限模型设计缺陷。  
🔗 https://github.com/anomalyco/opencode/issues/39931

---

## 重要 PR 进展（10 个）

**1. [beta] 新布局新增工作区流程** — #38790  
作者：Hona  
为新布局带来工作区选择：本地仓库、隔离新工作区、已有工作区三选一；Composer 输入框显示分支上下文。直接回应 #37012 背后的旧布局工作区能力缺失问题。  
🔗 https://github.com/anomalyco/opencode/pull/38790

**2. 修复：保留响应模型元数据** — #42433  
作者：KarmCraft  
关闭 #42420。保留 AI SDK 提供的结构化 `response.modelId`，而非任意响应头；同时为 #26091 提供更精确的解决路径。有助于客户端感知实际路由模型。  
🔗 https://github.com/anomalyco/opencode/pull/42433

**3. 新增：模型 fallback 链路（重试耗尽后自动切换）** — #42424  
作者：herjarsa  
关闭 #10287。主模型在所有重试用尽后自动按配置的 fallback 链切换模型，避免会话卡死。呼应社区对稳定性的长期诉求。  
🔗 https://github.com/anomalyco/opencode/pull/42424

**4. 修复：插件 @latest 自动更新停滞与临时残留清理** — #42427  
作者：herjarsa  
关闭 #16608。直接从 registry.npmjs.org 获取 dist-tags.latest，绕过本地缓存问题，并清理 npm install 后的临时文件。  
🔗 https://github.com/anomalyco/opencode/pull/42427

**5. 修复：kimi-for-coding 自定义 handler 与 K2.6 模型检测** — #42428  
作者：herjarsa  
关闭 #23933。`kimi-for-coding` 提供商注册的 Kimi K2.6（`k2p6`）在多个代码路径中未被正确处理，本次补齐 handler 与模型检测逻辑。  
🔗 https://github.com/anomalyco/opencode/pull/42428

**6. 修复：MCP 并行 spawn 竞态导致的连接中断** — #42431  
作者：herjarsa  
关闭 #41996。解决 `concurrency: "unbounded"` 下 MCP server 并行启动时偶发 “Connection closed” 错误，通过连接重试机制增强稳定性。  
🔗 https://github.com/anomalyco/opencode/pull/42431

**7. 修复：插件 config() 钩子先于 skill 发现执行** — #42430  
作者：herjarsa  
关闭 #28646。确保插件（如 superpowers）通过 `config()` 修改的 `skills.paths` 能被后续 skill 发现流程正确读取，避免技能目录注册失效。  
🔗 https://github.com/anomalyco/opencode/pull/42430

**8. 修复：桌面端 WSL 模式下 MCP 命令包装** — #42429  
作者：herjarsa  
关闭 #28159。Windows 桌面端启用 WSL 模式时，`opencode.json` 中 MCP 的 Linux 可执行文件路径无法在 Windows 侧直接运行，现自动用 `wsl.exe` 包装。  
🔗 https://github.com/anomalyco/opencode/pull/42429

**9. [beta] v2 实验性性能改进** — #40427  
作者：Hona  
针对 v2 的系列性能优化：会话路由加载、页面渲染等多项指标改进。适合关注新版本性能的用户跟进测试。  
🔗 https://github.com/anomalyco/opencode/pull/40427

**10. 新增：VS Code Insiders 与 Antigravity 打开选项** — #40872  
作者：mradwankhalil-commits  
会话头部 “Open in” 菜单新增 VS Code Insiders 和 Antigravity，纯 QoL 小改进，降低切换编辑器成本。  
🔗 https://github.com/anomalyco/opencode/pull/40872

---

## 功能需求趋势

- **布局与 UI 自定义**：旧布局保留（#37012）、右侧活动侧边栏（#42369）、会话内输出风格切换（#42414）等需求密集，反映用户对 TUI 个性化控制的要求提高。
- **模型/提供商支持与容错**：GitHub Copilot 零模型（#42083）、Kimi K2.6 修复（#42428）、模型 fallback 链（#42424）表明社区既要求更多模型接入，也对失败切换机制有明确期待。
- **安全与权限治理**：curl|bash 安装校验（#42434）、上下文修剪指令完整性（#42437）、webfetch SSRF（#42435）、bash 权限逃逸（#39931）、模型主动联网行为控制（#42288）构成安全议题群，社区安全意识显著提升。
- **插件系统稳定性**：`provider.models()` 回归（#25630）、插件配置漂移（#30526）、插件注入内容污染标题（#42386）显示插件机制仍是生态健康的关键瓶颈。
- **2.0 演进与兼容**：V1/V2 数据库共存冲突（#42260）、V2 缺失 todo 工具（#42421）等 2.0 迁移问题开始进入社区视野。

---

## 开发者关注点

- **新布局迁移阻力大**：#37012 以 41 👍 成为焦点，核心诉求是“不要为高频操作增加导航层级”，工作区能力也被视为不可让步的功能。
- **远程/容器环境兼容性问题集中**：VSCode Server 剪贴板失效（#41470）、WSL 下 MCP 命令不可用（#42429）让远程开发用户频繁踩坑。
- **供应链安全焦虑上升**：`opencode upgrade` 的 curl|bash 模式、webfetch SSRF 等安全槽点被集中指出，用户期待更严格的安装与网络访问校验。
- **上下文被“污染”或“丢失”的担忧**：插件注入内容污染标题（#42386），上下文修剪静默丢指令（#42437）——开发者对 agent 行为可预测性和指令完整性高度敏感。
- **配置与模型管理效率**：`/reload` 命令 77 👍 高居需求榜首，验证了“改配置必须重启”是高频痛点；Copilot 模型完全不可见则暴露官方提供商接入的可靠性短板。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-08-14）

> 数据来源：github.com/badlogic/pi-mono · 本期统计截至 2026-08-13 更新数据

## 今日速览

今日无新版本发布。社区讨论热度最高的是 **auto-compaction 在上下文超过 100% 后不触发** 的问题（[#6879](https://github.com/earendil-works/pi/issues/6879)，19 评论、17 👍），其次是 Mac 上高 CPU 占用与大型 prompt 编辑器卡顿。PR 方面，多个终端/TUI 体验修复已关闭/合并，尤其 [#8082](https://github.com/earendil-works/pi/pull/8082) 修复了 resume 大会话刷屏和 SIGINT 后终端损坏的问题，配合 [#8066](https://github.com/earendil-works/pi/pull/8066) 的视觉行缓存，整体优化方向明确：**大型会话的性能与终端恢复能力**。

## 社区热点 Issues（10 个）

- **[#6879 auto-compaction never triggers after context grows past 100% until provider overflow](https://github.com/earendil-works/pi/issues/6879)**  
  最受关注。长时间 agentic 会话中上下文占用超过 100% 后 compaction 不触发，直到 API 在 373k tokens 处拒绝请求才被迫压缩。社区认为应在每个 agent turn 后检查并提前触发压缩。

- **[#7730 High CPU usage on Mac OS with long session](https://github.com/earendil-works/pi/issues/7730)**  
  Mac 用户报告长会话下 CPU 在 50–110% 之间波动，内存 600–800MB，疑似与会话/上下文长度相关，影响日常交互体验。

- **[#7836 Edit fuzzy match misses lines with differences in whitespace length](https://github.com/earendil-works/pi/issues/7836)**  
  `normalizeForFuzzyMatch` 不折叠连续空白，导致 Edit 工具在空白数量不一致时匹配失败，尤其影响小模型对文件编辑的准确性。

- **[#8029 Very slow performance on moving in prompt editor](https://github.com/earendil-works/pi/issues/8029)**  
  7000 行 prompt 缓冲区内按一次方向键耗时约 1650ms。该问题已由 PR [#8066](https://github.com/earendil-works/pi/pull/8066) 通过视觉行缓存解决。

- **[#7791 Global Undici dispatcher inherits 16 KiB maxHeaderSize, causing UND_ERR_HEADERS_OVERFLOW](https://github.com/earendil-works/pi/issues/7791)**  
  全局 `fetch` 继承 Node 16 KiB 默认 header 限制，导致合法的大响应头被拒绝。已关闭，是影响 provider 兼容性的基础设施类问题。

- **[#7829 Invalid settings.json silently ignored; misleading 'bash not found' error on Windows](https://github.com/earendil-works/pi/issues/7829)**  
  Windows 用户 `settings.json` 中未转义反斜杠导致 JSON 解析失败，但 Pi 静默忽略，并给出误导性的 “bash not found” 错误。开发体验问题典型样本。

- **[#7779 Allow trusted Unix users to share PI_CODING_AGENT_DIR](https://github.com/earendil-works/pi/issues/7779)**  
  `auth.json` 和 `models-store.json` 以 `0600` 权限写入，导致第一个用户独占共享状态，后续多用户进程无法访问。多用户部署场景痛点。

- **[#7761 TUI copy shows "Copied!" but clipboard stays empty on VTE terminals](https://github.com/earendil-works/pi/issues/7761)**  
  GNOME Terminal 等 VTE 终端下，TUI 复制提示成功但系统剪贴板无内容。可能与 OSC 52 或终端协议处理有关。

- **[#8000 @ file autocomplete: direct children lose to deep nested matches on basename ties](https://github.com/earendil-works/pi/issues/8000)**  
  以 `@~/<dir>/pro` 补全时，深层嵌套 basename 匹配反而排到直接子目录前面，用户最可能想选的文件不出现。补全排序策略需要调整。

- **[#8017 Support Anthropic refusal server side fallback](https://github.com/earendil-works/pi/issues/8017)**  
  由维护者 badlogic 提出：Anthropic 的服务端分类器可能认为 Pi 在“做非法操作”，导致 compaction 失败。需要实现官方 refusal/fallback 机制，属于高价值可靠性需求。

## 重要 PR 进展（10 个）

- **[#8082 fix(tui): render only the visible viewport in fullRender; restore terminal on SIGINT](https://github.com/earendil-works/pi/pull/8082)**  
  本轮重点。修复 resume 大型会话时把全部历史刷回终端的问题（759 KB session 输出 844KB），同时在 SIGINT 时恢复终端 raw mode、光标与标题，避免用户需要手动 `reset`。

- **[#8066 fix(tui): add visual lines caching to avoid unnecessary computes](https://github.com/earendil-works/pi/pull/8066)**  
  直接修复 [#8029](https://github.com/earendil-works/pi/issues/8029) 的 prompt 编辑器卡顿。通过缓存 visual lines，减少方向键移动时重复计算。

- **[#8084 fix(coding-agent): don't swallow the prompt after boolean extension flags](https://github.com/earendil-works/pi/pull/8084)**  
  修复布尔型扩展 flag（如 `--plan`）吞掉下一个 CLI 参数的问题。此前 `pi -p --plan "prompt"` 会在无消息的情况下启动并静默退出。

- **[#8086 fix(ai): fall back to legacy Gemini tool schema when endpoints reject unknown fields](https://github.com/earendil-works/pi/pull/8086)**  
  部分 generativelanguage 端点拒绝 `parametersJsonSchema` 等新字段，该 PR 在收到 `INVALID_ARGUMENT` 时回退到旧版 Gemini tool schema，提升兼容性。

- **[#8070 fix(coding-agent): validate extension flag defaults](https://github.com/earendil-works/pi/pull/8070)**  
  `registerFlag()` 现在对 `type` 和 `default` 做判别联合校验，避免布尔 flag 默认值写成字符串 `"false"` 导致判断错误。

- **[#8085 feat(tui): cancel active mouse selection with escape](https://github.com/earendil-works/pi/pull/8085)**  
  允许鼠标拖拽选中的过程中按 Escape 取消选择，不再触发自动复制。属于文本编辑器常见交互改进。

- **[#8052 fix(coding-agent): make session persistence transactional](https://github.com/earendil-works/pi/pull/8052)**  
  修复 `_appendEntry()` 先更新内存再写盘的问题：若 JSONL 写入失败（如 ENOSPC），重启后会出现断裂的 session graph。改为事务式持久化更可靠。

- **[#7984 fix(coding-agent): update grok-mermaid to 0.2.3](https://github.com/earendil-works/pi/pull/7984)**  
  更新 mermaid 渲染依赖，解决若干图表渲染问题（class 暂不支持），提升 coding-agent 中 mermaid 的显示质量。

- **[#6216 feat: Add Amazon Bedrock Mantle OpenAI Responses provider](https://github.com/earendil-works/pi/pull/6216)**  
  新增 Amazon Bedrock Mantle 的 OpenAI Responses 兼容 provider。长线 PR，扩展 Pi 在 AWS 生态内的可用性。

- **[#8057 fix(examples): todo renderResult returns undefined on validation errors](https://github.com/earendil-works/pi/pull/8057)**  
  修复 `todo` 工具 schema 校验失败时 `renderResult` 返回 `undefined` 导致 TUI 崩溃的问题。对扩展开发者有参考价值。

## 功能需求趋势

- **性能和启动时间**：社区持续关注大型会话的 CPU 占用、prompt 编辑器延迟、resume 刷屏，以及以 jcode 为基准的启动时间预算（[#7739](https://github.com/earendil-works/pi/issues/7739)）。性能优化是当前最集中的诉求。
- **Provider 兼容与扩展**：包括 Amazon Bedrock Mantle provider（[#6216](https://github.com/earendil-works/pi/pull/6216)）、Gemini 旧 schema 回退（[#8086](https://github.com/earendil-works/pi/pull/8086)）、Anthropic refusal fallback（[#8017](https://github.com/earendil-works/pi/issues/8017)）、Kimi 顶层 `cached_tokens` 统计（[#8075](https://github.com/earendil-works/pi/issues/8075)）等。
- **终端与 TUI 体验**：SIGINT 后恢复终端、剪贴板兼容、CJK 宽度对齐、鼠标选择取消、resume 历史回放等成为高频话题，说明终端“卫生”问题直接影响用户信任。
- **上下文与持久化可靠性**：auto-compaction 触发时机、session 事务性持久化、`/resume` 进度计数口径不一致（[#7960](https://github.com/earendil-works/pi/issues/7960)），都指向“长会话可信度”这一核心方向。
- **多用户/共享环境**：Unix 权限位导致的共享 `PI_CODING_AGENT_DIR` 访问冲突（[#7779](https://github.com/earendil-works/pi/issues/7779)）说明 Pi 正被用于团队/服务化场景。

## 开发者关注点

- **Compaction 不可靠是最大痛点**：上下文超过 100% 仍不触发，直到 provider 拒绝请求才被迫压缩；甚至 Anthropic 侧分类器也可能让 compaction 失败。这让长会话用户缺乏安全感。
- **终端恢复和复制问题反复出现**：SIGINT 后 raw mode、bracketed paste、Kitty keyboard protocol 未恢复；VTE 终端下复制提示成功但剪贴板为空。开发者需要频繁 `reset` 或改用外部工具，体验断裂严重。
- **大会话性能仍是瓶颈**：长 session 下 CPU 100%、内存 600–800MB、7000 行 prompt 方向键 1.6 秒、resume 刷出 844KB 输出——这些问题在真实工作流中很容易触达。
- **Windows 支持细节需要补强**：Unix socket 绑定失败、`settings.json` 路径转义、shell 错误提示误导等，说明跨平台测试覆盖仍需提升。
- **静默失败和状态不一致**：无效 `settings.json` 被忽略、未知 slash command 被当普通消息发给模型、MCP 工具不遵守 Ctrl+O 折叠——开发者希望 Pi 对异常输入给出显式警告而不是悄悄吞掉。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-14

## 今日速览
昨日发布 v0.21.11（Agent Plugins v1 + /coordinate 多智能体）与 v0.21.12-preview.1（Web Shell 修复），fleet 多智能体路线持续落地。社区反馈集中在 Windows 粘贴回归、Vertex AI 认证与文件处理可靠性；供应链安全类 PR 成为近期技术债偿还重点。

## 版本发布

### v0.21.12-preview.1
- fix(web-shell): 保留独立会话目标（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）
- feat(web-shell): 支持工作区文件上传

### v0.21.11
- **Agent Plugins v1**：用于扩展 agent 能力的插件机制（[#8834](https://github.com/QwenLM/qwen-code/pull/8834)）
- **原生多智能体工作流**：/coordinate 命令，支持只读 teammates（[#8804](https://github.com/QwenLM/qwen-code/pull/8804)）
- 附带 SWE-bench Verified 的 E2E 验证结果（QUARANTINED 状态，500/500 完成，0 resolved）。该运行属于非生产环境的发布管线验证，不对应模型能力基准

## 社区热点 Issues

> 过去 24 小时共 49 条活跃 Issue，以下为最值得关注的 10 条：

### 1. RFC: 独立 Qwen 会话的原生协调（[#8718](https://github.com/QwenLM/qwen-code/issues/8718)）
9 条评论 | 已关闭
多智能体 fleet 路线总纲。讨论 leader 分发多个自包含 worker、保持交互式观察、收集结构化结果的机制，已衍生出 #8840-8843 的阶段实现。

### 2. P1: serve 模式下大会话恢复超时导致会话丢失（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)）
8 条评论
PR #8691 已合并超时契约与可观测性部分，但完整恢复路径仍需改进，社区关注后续进度。

### 3. P1: Windows CLI Ctrl+V 粘贴回归（[#9061](https://github.com/QwenLM/qwen-code/issues/9061)）
3 条评论
0.21.0 之后某版本起，Windows 下 Ctrl+V 在 CLI 中完全无响应，回退 0.21.0 可恢复。影响所有 Windows 用户日常操作。

### 4. Gemini 2.5 在 Vertex AI 上完全不可用（[#9019](https://github.com/QwenLM/qwen-code/issues/9019)）
5 条评论
每次请求强制携带 thinkingLevel 占位符，Gemini 2.5 直接返回 400，任何 tool call 都无法发出。

### 5. Keyless Vertex AI 无法从环境推断认证类型（[#9025](https://github.com/QwenLM/qwen-code/issues/9025)）
5 条评论
纯环境变量配置的 keyless 认证在 headless 模式下无法自动选中 vertex-ai 认证，启动即退出。影响 CI 自动化部署。

### 6. Python SDK 拒绝 permission_mode="auto"（[#9002](https://github.com/QwenLM/qwen-code/issues/9002)）
5 条评论
CLI 支持 auto 权限模式，但 SDK 客户端提前校验拦截。SDK 与 CLI 行为不一致，影响自动化脚本迁移。

### 7. Desktop 外部链接静默失败与 MCP OAuth 中断（[#9108](https://github.com/QwenLM/qwen-code/issues/9108)）
3 条评论
#9069 已修复 Markdown 链接，但 Web Shell 中仍有多个链接表面使用不可靠的隐式打开路径；MCP OAuth 流程无法完成。

### 8. read_file 仅凭扩展名发送非图片文件（[#9088](https://github.com/QwenLM/qwen-code/issues/9088)）
3 条评论
名为 `screenshot.png` 但内容为 UTF-8 JSON 的文件被发给模型 API，触发 400 并中断整个 turn。需按内容而非扩展名识别文件类型。

### 9. activeWork 追踪与后台 Agent 恢复（[#8586](https://github.com/QwenLM/qwen-code/issues/8586)）
4 条评论
请求为 daemon 增加 activeWork 事实，并建立后台 Agent 的五层恢复路径设计。属于 background-automation 路线图核心。

### 10. record_artifact 成功但文件状态为 missing（[#9083](https://github.com/QwenLM/qwen-code/issues/9083)）
3 条评论
工具返回成功，但工作区文件实际上报为 missing，模型误告用户文件可打开/下载。工具结果与文件系统状态不一致。

## 重要 PR 进展

> 过去 24 小时共 50 条活跃 PR，以下为按影响力筛选出的 10 条：

### 1. feat(core): 隐私安全的 tool-result 边界诊断（[#9039](https://github.com/QwenLM/qwen-code/pull/9039)）
为工具结果添加隐私安全诊断，防止敏感数据越界。标记为 review/self-reported，建议关注其设计权衡。

### 2. fix(install): Windows 安装器替换 Get-FileHash（[#9112](https://github.com/QwenLM/qwen-code/pull/9112)）
用内联 .NET SHA-256 流式计算替代 Get-FileHash，消除临时文件与外部命令依赖，提升安装脚本供应链安全性。

### 3. feat(daemon): 跨 worktree Git 变更防护（[#8687](https://github.com/QwenLM/qwen-code/pull/8687)）
识别模型发出的 `run_shell_command` 中 `-C`/`--work-tree`/`--git-dir` 参数，阻止变更类命令逃逸出会话目录，防止 agent 越权操作仓库。

### 4. fix(desktop): 外部链接统一走能力受限的 opener（[#9111](https://github.com/QwenLM/qwen-code/pull/9111)）
将 Web Shell 中剩余四个依赖隐式新窗口的链接表面路由到 Tauri 受限 opener，修复静默丢点击问题。

### 5. feat: Local Control 合并为 daemon 单一实现（[#9106](https://github.com/QwenLM/qwen-code/pull/9106)）
将 LAN 配对机制从两套重复实现（两种语言、两套安全模型）整合进 daemon，两个现有表面成为统一实现的调用方。

### 6. chore(ci): 供应链安全卫生落地（[#9008](https://github.com/QwenLM/qwen-code/pull/9008)）
为 release workflow 添加 CODEOWNERS、声明最小权限 token、增加安全检查与 Scorecard，落地供应链审计低风险项。

### 7. feat(review): --resume 全链路接线（[#9093](https://github.com/QwenLM/qwen-code/pull/9093)）
将 `--resume` 接入 `/review`、`review run` 与 CI 重试路径，补全可恢复 review 能力。

### 8. feat(telemetry): 主 agent 调用追踪（[#9107](https://github.com/QwenLM/qwen-code/pull/9107)）
为主 agent 调用链增加 telemetry，提升整体可观测性，便于定位 agent 行为异常。

### 9. fix(daemon): 压缩子代理 live replay 日志（[#9057](https://github.com/QwenLM/qwen-code/pull/9057)）
为只渲染主对话摘要的客户端提供紧凑的 live-turn replay 投影，默认保留完整日志，优化 WebUI 加载与重连性能。

### 10. feat(core): live-session registry 与 `qwen sessions ps`（[#8969](https://github.com/QwenLM/qwen-code/pull/8969)）
会话运行时自动注册、退出时清理，通过读取一个小目录即可回答"本机当前运行哪些会话"，替代遍历项目 transcript 历史。

## 功能需求趋势

从当前活跃 Issue/PR 中提炼出社区最关注的五个方向：

1. **多智能体编排（fleet）**：以 #8718 为总纲的 RFC 进入具体阶段实现（#8840-8843），/coordinate 命令落地。关注点从"能否并行"转向"如何编排、恢复与持久化"。
2. **Web Shell 与 Desktop 体验统一**：Channel 策略重设计（#8845）、外部链接可靠性（#9108/#9111）、工作区文件上传——桌面与浏览器交互边界正在收敛。
3. **供应链与信任边界安全**：依赖漏洞（#8944）、CI 最小权限（#9008）、hook 信任边界（#8396）、Git worktree 逃逸防护（#8687）——安全加固为持续主线。
4. **云服务认证易用性**：Vertex AI keyless 推断（#9025）与 Gemini 2.5 请求兼容（#9019），反映无头/CI 环境的认证与模型参数兼容是硬需求。
5. **后台自动化与可观测性**：activeWork 追踪（#8586）、live-session registry（#8969）、主 agent telemetry（#9107）、子代理日志压缩（#9057）——daemon 正变得更可观测、更可控。

## 开发者关注点

- **Windows 回归问题**：Ctrl+V 粘贴失效（#9061）确认为回归，用户被迫降级 0.21.0；桌面版启动弹出终端（#9043）虽已关闭，但同类问题仍需警惕。
- **文件处理不信任**：仅凭扩展名判断文件类型（#9088）和 record_artifact 状态不一致（#9083），削弱开发者对工具结果的信任。
- **SDK/CLI 行为不一致**：permission_mode="auto"（#9002）的差异增加自动化脚本适配成本。
- **无头环境认证配置负担**：keyless 认证无法自动推断（#9025），headless 启动阶段即退出，调优成本高。
- **资源受限部署兼容性**：压缩查询的固定 maxOutputTokens 超出小窗口上下文（#7960），自托管部署出现 COMPRESSION_FAILED_EMPTY_SUMMARY。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-14

## 1. 今日速览

v0.9.7 正式发布，项目完成从 DeepSeek-TUI 到 CodeWhale 的品牌切换，旧 npm 包 `deepseek-tui` 进入弃用状态。社区讨论焦点集中在 agent 工具 schema 过度复杂（#5324）、大型任务子代理超时导致会话中断（#1425）以及跨平台配置路径碎片化（#2369）等可靠性与可用性问题上。PR 侧则出现大量工程治理与 TUI 体验优化提交，其中针对 Auto-Review 的模型守护层（v0.9.8 预演）值得关注。

## 2. 版本发布

### v0.9.7
- **Codewhale** 成为 Shannon Labs 的正式公开产品名称，`codewhale` 命令与 npm 包统一为小写技术标识，release-asset 命名同步调整。
- 旧 npm 包 `deepseek-tui` 正式弃用，不再获得后续版本更新。
- v0.8.x 老用户（使用 `deepseek` / `d` 命令）需迁移到新命令，详见 Release 说明。

## 3. 社区热点 Issues

### #998 文案展示不全（评论 11 👍 1）
作者 `DingYong4223` 反馈在 v0.9.4 中界面文案被截断，希望鼠标悬停可显示完整内容。该 issue 获得较多共鸣，是 UI/UX 层面的高频反馈。  
🔗 https://github.com/Hmbown/CodeWhale/issues/998

### #1004 feat(commands): /dryrun — 请求发送前预览（评论 9）
开发者 `peixl` 提出核心痛点：在 DeepSeek V4 Pro 长上下文中（长 system prompt、缓存文件、工具定义、@mentions、多步思考），开发者无法在不实际发送请求的前提下查看即将发送的内容。`/dryrun` 命令有望成为调试复杂轮次的重要工具。  
🔗 https://github.com/Hmbown/CodeWhale/issues/1004

### #5324 agent tool: 简化 32 字段 schema 以减少模型报错（评论 7）
维护者 Hmbown 亲自提交：当前 `agent` 工具暴露 32 个属性的 JSON schema，零必填字段但承载 8 种动作，解析器还接受大量别名。该复杂度导致模型频繁出错，是当前架构治理的核心议题之一。  
🔗 https://github.com/Hmbown/CodeWhale/issues/5324

### #2369 配置路径跨 OS / Cygwin 碎片化 + 静默迁移 bug（评论 7）
Windows 与 Cygwin 环境下配置文件可能解析到不同的 home 目录，旧版本迁移还可能导致配置丢失。对跨平台用户影响面较大。  
🔗 https://github.com/Hmbown/CodeWhale/issues/2369

### #1425 大文本处理会话中断卡死（评论 6）
用户分析 300 万字小说时，TUI 启动 10 个子 Agent 并发处理，但 `agent_wait` 等待超时导致会话中断。属于多代理编排可靠性的典型故障。  
🔗 https://github.com/Hmbown/CodeWhale/issues/1425

### #894 执行过程中图片混乱（评论 6）
v0.9.4 中执行过程出现图片渲染错乱的问题，附有截图证据。影响 AI 生成图文内容的展示体验。  
🔗 https://github.com/Hmbown/CodeWhale/issues/894

### #1482 NVIDIA NIM 不工作：404 page not found（评论 6）
用户报告调用 NIM 接口时返回 404，且 `deepseek doctor` 显示版本仍为 0.8.29（与报告中 v0.9.4 标题不符），疑似版本追踪与 NIM 适配均存在问题。  
🔗 https://github.com/Hmbown/CodeWhale/issues/1482

### #1732 合并分析报告保存文档巨慢（评论 6）
缓存命中率极低且保存过程异常缓慢，严重影响长文档输出场景的生产效率。  
🔗 https://github.com/Hmbown/CodeWhale/issues/1732

### #5316 EPIC-005: CodeWhale TUI Crate 分解（评论 5）
大规模架构重构的伞形追踪 issue，所有子 EPIC 与 FEAT 均汇聚到此，是未来代码库模块化方向的重要信号。  
🔗 https://github.com/Hmbown/CodeWhale/issues/5316

### #1651 VS Code 崩溃——YOLO Agent 运行测试脚本时（评论 5）
YOLO Agent 在后台静默执行测试脚本时导致 VS Code 崩溃或异常退出（DeepSeek v4-pro / v4-flash 模型）。IDE 集成稳定性问题，引发对自主代理安全边界的讨论。  
🔗 https://github.com/Hmbown/CodeWhale/issues/1651

## 4. 重要 PR 进展

### #5368 fix(tui): 将无防护测试隔离到独立状态根
修复 #5359 中四个受机器状态干扰的测试。设计了三种独立机制，每个机制都带回归测试。测试治理精细化。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5368

### #5369 fix(tools): Moonshot schema 降级而非拒绝条件约束
响应 #5324 的前置工作。当模型端不支持条件 schema 时自动降级，而非直接拒绝，提升多模型兼容性。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5369

### #5358 feat(engine): 自动审查拒绝理由 + 轮次熔断器
对 #5352 的首个 P0 切片。此前 Auto-Review 的拒绝是裸 `permission_denied`，模型可能反复重试被拒动作直到预算耗尽；现在补充拒绝理由与熔断机制。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5358

### #5364 feat(tui): Markdown 引用块渲染优化
TUI 中正确渲染 `>` 引用块，替代原先的纯文本显示。支持嵌套、内联格式、自动换行及选区复制，属社区提交。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5364

### #5365 feat(provider): 本地 DS4 一等公民支持
将 DwarfStar（DS4）作为本地 DeepSeek 路由正式支持：`/setup provider ds4` 或 `D` 快捷键可打开预填的无密钥 loopback 预设，不新增协议适配器。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5365

### #5339 fix(engine): 过滤子 shell 完成事件
修复 #5325。子代理的后台 shell 完成事件不再混入父模型流，保留无主完成与任务/状态可见性，附带回归测试。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5339

### #5353 feat(tui): Auto-Review 模型守护层（v0.9.8）
Auto-Review 进化为真正的双层模式：确定性规则层不可绕过，fallback 时升级为一次性模型守护判定，而非静默阻断。参考 Codex `auto_review` 语义，采用 Kimi 模式词汇与 Codewhale 默认 fail-closed。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5353

### #5336 fix(mcp): nextCursor 为空时省略该字段（已合并/关闭）
修复 MCP 协议合规问题：`tools/list` 与 `resources/list` 中 `nextCursor: null` 违反规范，导致 Claude Code 等严格客户端拒绝响应。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5336

### #5333 feat(tui): 宿主终端窗口置顶 mini 模式（harvest）
对社区 PR #5318 的官方整合版本。支持 `/pin` 命令将宿主终端缩小为 640x400 的始终置顶小窗，再次触发恢复原尺寸和最大化状态。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5333

### #5318 feat(tui): 宿主终端窗口置顶 mini 模式（社区原版，已关闭）
社区作者 SparkofSpike 的原创贡献，因 CI 基线与旧 main 不一致且 fork push 被拒，最终由维护者以 harvest 方式合并（见 #5333）。社区驱动的功能开发模式值得关注。  
🔗 https://github.com/Hmbown/CodeWhale/pull/5318

## 5. 功能需求趋势

| 方向 | 代表 Issues/PRs | 热度 |
|------|----------------|------|
| **可观测性与调试** | #1004 `/dryrun` 请求预览、#1682 执行结果输出预览改善 | 高 — 长上下文时代开发者强烈希望“发送前可见” |
| **多模型/服务商适配** | #1482 NIM 支持、#5369 Moonshot schema、#5365 本地 DS4、#1097 FreeBSD | 高 — 不再满足于单一 DeepSeek 端点 |
| **多代理可靠性** | #1425 子代理超时中断、#1651 YOLO Agent 导致崩溃、#5339 子 shell 事件过滤 | 高 — 自主代理越强，稳定性诉求越高 |
| **跨平台体验** | #2369 配置路径碎片化、#1854 Windows Terminal 默认启动、#2323 中文输入法 | 中高 — 中文用户与 Windows 用户占比显著 |
| **记忆与会话连续** | #2492 跨会话记忆缺失 | 中 — 长任务与批量工作的核心阻碍 |
| **大规模架构治理** | #5316 crate 分解、#5324 schema 简化、#5358 熔断器 | 中 — 社区开始关注代码健康度 |
| **远程/工作台模式** | #1990 US 基础设施评估、#1984 CNB/Feishu 一体化流程 | 中低 — 全球化探索仍在早期 |

## 6. 开发者关注点

- **中断与超时是头号痛点**：#1425 的 `agent_wait` 超时、#1732 保存过慢、#1829 SSH 出站阻断（exit 255）等问题反复出现，表明沙箱与子代理调度的健壮性仍是短板。
- **配置与迁移信任危机**：#2369 的静默迁移 bug 和 #5340 中 doctor 卡在 `needs action` 状态，暴露升级路径中的一致性验证缺失。用户对“升级后配置还在不在”的担忧正在累积。
- **模型调用透明度不足**：NIM 404、Moonshot schema 拒绝、MCP `nextCursor: null` 等协议合规问题说明多模型兼容性需要系统性治理，而非逐个打补丁。
- **中文用户群体庞大且活跃**：30 条热门 Issue 中近半数来自中文用户（UI 截断、输入法、大文本处理、图片混乱等），国际化（i18n）不仅是翻译问题，更涉及中文输入法、中文长文本排版与 CJK 字体渲染等深层适配。
- **测试可靠性开始影响社区贡献**：#5359 指出的“CI 绿、本机红”问题说明开发环境状态隔离是贡献者门槛之一，PR #5368 对此做了专项修复，这对吸引外部贡献者是积极信号。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*