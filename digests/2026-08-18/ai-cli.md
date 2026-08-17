# AI CLI 工具社区动态日报 2026-08-18

> 生成时间: 2026-08-17 23:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-18）

## 1. 生态全景

当前 AI CLI 工具已全面进入"生产可用性打磨"阶段——社区讨论焦点从功能新奇性转向稳定性、资源效率与安全边界。各工具普遍面临内存泄漏、子代理可靠性、Windows 平台兼容性三大共性问题，同时 MCP 生态正在经历从"能接入"到"稳定兼容"的阵痛期。头部工具（Claude Code、Codex、Gemini CLI）迭代节奏稳定，中国厂商产品（Qwen Code、DeepSeek TUI）以高频率发布和快速响应形成差异化竞争力，而 Kimi Code CLI 与 Grok Build 今日近乎静默。整体来看，市场正在从"模型能力竞赛"转向"工程化与生态治理竞赛"。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PRs | Release | 社区热度信号 |
|------|------------|----------|---------|-------------|
| **Claude Code** | 10 个（最高 39 评论） | 10 个 | v2.1.234 | 评论量最高（39 条、GPU 崩溃），插件/脚本 PR 密集 |
| **OpenAI Codex** | 10 个（#28969 获 195👍） | 10 个 | rust-v0.148.0-alpha.21 | 点赞数全场最高，TUI/桌面端修复集中 |
| **Gemini CLI** | 10 个（5 个 p1） | 10 个 | nightly v0.56.0 | p1 bug 密度最高，安全类 PR 受关注 |
| **GitHub Copilot CLI** | 10 个（28 条更新） | 1 个（异常 PR） | 无 | 活跃但 PR 极少，MCP 回归引发信任危机 |
| **Kimi Code CLI** | 0 个 | 1 个（#864 被关闭） | 无 | 今日近乎静默，社区势能偏弱 |
| **OpenCode** | 10 个（#7801 获 32👍） | 10 个 | 无 | 功能请求热度高（Plan Mode 自动切换） |
| **Pi** | 10 个（#6879 获 17👍） | 10 个 | 无 | provider 兼容性修复密集，TUI 性能争议多 |
| **Qwen Code** | 10 个（4 个压缩相关） | 10 个 | v0.21.13 正式版 | 版本验证严谨（SWE-bench 500 条全通过），微信集成活跃 |
| **DeepSeek TUI** | 10 个 | 10 个（8 个已合并） | v0.9.9 | 合并率高，定价/目录校准务实 |
| **Grok Build** | - | - | - | 过去 24 小时无活动 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|------|---------|---------|
| **上下文/内存管理** | Claude Code（#87238 内存泄漏）、Copilot CLI（#4506 看门狗误压缩）、Pi（#6879 压缩不触发）、Qwen Code（#9320 压缩后丢失）、Gemini CLI（#26522 无限重试） | 压缩策略不够主动、token 计量不透明、长会话内存膨胀，已普遍影响生产使用 |
| **MCP 生态稳定性** | Codex（#17265 OAuth 不刷新）、Copilot CLI（#4480 issuer 回归）、Gemini CLI（#28863 扩展环境变量）、Claude Code（#69087 表单裁剪）、OpenCode（#33027 工具不暴露） | 认证/令牌管理、进程生命周期、工具挂载一致性是跨工具高频痛点 |
| **Windows 平台支持** | Claude Code（GPU 崩溃）、Codex（#38754 MCP 重复拉起）、Qwen Code（#9061 粘贴回归）、OpenCode（#19130 ARM64 失败）、Copilot CLI（WebView2 崩溃）、Pi（路径碎片化） | 几乎所有工具在 Windows 上的稳定性与体验明显落后于 macOS/Linux |
| **子代理/多代理可靠性** | Gemini CLI（#22323 误报成功）、Claude Code（#68545 prompt 注入）、Codex（#13491 继承父意图）、Pi（#8250 进度丢失）、Qwen Code（#9221 verifier 隔离） | 终止原因不透明、上下文隔离不足、状态同步失效是共识短板 |
| **非交互/自动化模式** | Codex（ACP）、Copilot CLI（`-p` 模式）、Kimi（`--starting-prompt`）、Qwen Code（serve 治理）、OpenCode（/loop、/workflow） | 配置在交互与非交互模式间不一致，自动化流水线需要与交互模式对等的能力 |
| **会话恢复持久化** | Copilot CLI（#4505 stale 连接）、Qwen Code（compress 后丢失）、OpenCode（#24153 归档恢复）、Pi（#8241 压缩失败事件） | 会话存储/恢复可靠性不足，关键操作需要可审计、可恢复 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 典型用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 插件生态与脚本自动化、细粒度配置（环境变量、键绑定） | Claude 重度用户、插件开发者 | 官方 SDK + 社区插件双轮驱动，TUI 与桌面应用并行 |
| **OpenAI Codex** | 桌面端 + 远程控制、多代理 V2、可观测性基础设施 | 远程办公者、企业级工作流 | Rust 单体仓库，OTLP/遥测管道与 TUI 精细化同步推进 |
| **Gemini CLI** | SSR Agent（TypeScript）、Browser Agent、Auto Memory | Google 生态开发者、依赖浏览器自动化的用户 | 多 agent 架构，安全加固与 subagent 行为修复并重 |
| **GitHub Copilot CLI** | 非交互模式（ACP）、组织策略集成、插件市场 | GitHub 企业用户、CI/CD 自动化团队 | 基于 Copilot 平台，MCP 兼容性与组织配置同步演进 |
| **OpenCode** | 模型无关（多 provider）、插件 hook 扩展、斜杠命令生态 | 偏好开源 + 自建工作流的开发者 | TypeScript/bun 实现，功能迭代速度快，紧跟社区需求 |
| **Pi** | 多 provider 成本优化、扩展 API 深度、TUI 性能 | 技术敏感型个人开发者、OpenRouter 用户 | Java 单体（pi-mono），关注缓存控制与 provider 差异 |
| **Qwen Code** | 服务端 serve/daemon 治理、微信集成、Web Shell 导出 | 中国开发者、需要服务化部署的团队 | 版本验证流程严谨（SWE-bench 全量），外部渠道集成活跃 |
| **DeepSeek TUI** | 本地化/国际化（字典 spine）、分时定价、会话可审计 | 中文社区、成本敏感用户 | 以版本主题驱动（0.9.9 "truth-and-resilience"），务实修复 |
| **Kimi Code CLI** | 处于相对静默期 | 基础 CLI 用户 | 待观察，社区势能不足 |

## 5. 社区热度与成熟度

**第一梯队（高活跃 + 高成熟度）**：Claude Code、OpenAI Codex、Gemini CLI。三者均保持稳定发布节奏，Issue/PR 数量与社区互动质量领先。Claude Code 的插件脚本 PR 社区贡献活跃，Codex 拥有最高点赞 Issue（195👍），Gemini CLI 的 p1 bug 密度说明其社区用户已深度依赖工具。

**第二梯队（快速发展期）**：OpenCode、Pi、Qwen Code、Copilot CLI。OpenCode 功能迭代快但稳定性问题（Windows ARM64）拖后腿；Pi 在 provider 兼容性上投入大，社区反馈专业；Qwen Code 版本验证严谨，微信集成开辟了差异化赛道；Copilot CLI 社区活跃度高但 PR 产出极低，可能暗示团队资源或策略问题。

**第三梯队（冷清期）**：DeepSeek TUI、Kimi Code CLI、Grok Build。DeepSeek TUI 虽是个人项目但合并率很高，值得关注；Kimi 与 Grok 均近乎零动态。

## 6. 值得关注的趋势信号

**信号一：AI CLI 正在从"玩具"变为"生产基础设施"。** 内存泄漏导致 OOM、压缩后会话丢失、恢复后 stale 连接——这些"企业级软件"才会遇到的问题在各工具社区集中爆发，说明开发者已在关键工作流上重度依赖 AI CLI。**评估工具时请优先考察长会话稳定性与资源治理能力，而非只是模型能力。**

**信号二：MCP 生态进入"治理"阶段。** OAuth 令牌刷新、RFC 8414 issuer 校验、进程生命周期管理、缓存 ref 隔离——MCP 从"能接入"走向"可运维"的拐点已到。**选择 MCP 生态时需关注工具的认证管理、进程回收与配置隔离能力。**

**信号三：Windows 平台成为最大共性短板。** 除 Grok 外几乎所有工具都有 Windows 专属问题（GPU 崩溃、粘贴回归、ARM64 失败、WebView2 白屏）。**对 Windows 团队而言，应优先选择对 Windows 有专项投入的工具，或评估降级方案。**

**信号四：上下文压缩的"黑箱"正在引发信任危机。** 多个工具（Pi、Qwen Code、Copilot CLI）的压缩触发时机、token 计算与状态刷新存在缺陷，且用户无法验证压缩前后发生了什么。**压缩机制的可观测性（压缩前后 token 明细、可恢复性）将成为下一轮竞争焦点。**

**信号五：成本透明化与可治理性成为硬需求。** Pi 的 cache_control 缺失导致 2.5 倍成本惩罚、Qwen Code 分时定价、Claude Code 的 usage 命令请求（10+ Issue 整合）——经济性已从"锦上添花"变为"决策因素"。**量化工具的真实 token 消耗与缓存命中率，是控制 AI 预算的第一步。**

**信号六：外部渠道集成是差异化新入口。** Qwen Code 的微信通道（typing 续期、文件发送）、Codex 的远程控制、Claude Code 的持久语音交互——AI CLI 正在从终端走向聊天软件与移动端。**关注工具的集成生态，可能带来工作流范式的变化。**

**信号七：安全边界与供应链风险进入社区视野。** Gemini CLI 的 eval 供应链 RCE 修复、Copilot CLI 的 README 异常 PR、Claude Code 的 subagent prompt 注入——开源 AI 工具的安全审查应从代码本身扩展到 CI/CD 与依赖链。**在企业采用前，请对工具的供应链安全与权限模型做尽职调查。**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-18）

> 说明：以下 PR 按仓库“评论数排序”提取，但导出数据未附具体评论数值；所有列出的 PR 当前均为 **Open** 状态。

## 1. 热门 Skills 排行

### #1298 fix(skill-creator): run_eval.py 评估结果恒为 0% recall
- **功能**：修复 `run_eval.py` 在 Windows 下的管道读取、触发器检测和并行 worker 问题，并将 eval artifact 安装为真实 skill，解决“所有描述召回率 0%”的根因。
- **社区讨论热点**：skill-creator 的优化循环跑在完全无效的评估信号上，影响 description 自动迭代；Issue #556 有 10+ 独立复现。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/1298

### #514 Add document-typography skill
- **功能**：对 AI 生成文档进行排版质量控制，包括孤词换行、段落孤行、标题悬垂、编号错位等。
- **社区讨论热点**：这是所有生成文档的共性问题，用户很少主动要求，但会显著影响专业观感，因此共鸣度高。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/514

### #486 Add ODT skill
- **功能**：支持 OpenDocument 文本创建、模板填充，以及 ODT 转 HTML。
- **社区讨论热点**：补足 LibreOffice/ISO 标准文档生态；与已有 docx/pdf 形成“办公文档全家桶”预期。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/486

### #210 Improve frontend-design skill clarity and actionability
- **功能**：修订 frontend-design skill，让每条指令都可在单次对话中执行，提升具体性和内部一致性。
- **社区讨论热点**：Skill 指令不能太“像文档”，必须可操作、可执行，否则对 Claude 的行为约束力不足。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/210

### #83 Add skill-quality-analyzer and skill-security-analyzer
- **功能**：新增两个 meta skills，分别从结构/文档/示例等维度评估 skill 质量，以及检查安全性。
- **社区讨论热点**：社区开始自发建立 skill 质量与安全治理工具，呼应后续“信任边界”问题。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/83

### #1367 feat(skills): add self-audit
- **功能**：输出交付前先做机械性文件验证，再按损害严重度进行四维推理审计。
- **社区讨论热点**：作为“质量门禁”类 skill，受到关注点在于通用性——不绑技术栈、不绑项目类型。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/1367

### #723 feat: add testing-patterns skill
- **功能**：覆盖完整测试栈：Testing Trophy 理念、单元测试 AAA、React Testing Library、边界条件等。
- **社区讨论热点**：测试生成与指导是高频开发需求，社区希望 Claude 能直接输出“该测什么、不该测什么”的决策。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/723

### #568 feat: add ServiceNow platform skill
- **功能**：覆盖 ServiceNow 的 ITSM、ITOM、ITAM/SAM、SecOps、FSM、SPM、CSDM、IntegrationHub 等模块。
- **社区讨论热点**：企业平台类 skill 的定位应是“平台助手”而非“脚本小工具”；讨论热度持续，但合并周期较长。
- **状态**：Open  
  https://github.com/anthropics/skills/pull/568

---

## 2. 社区需求趋势

从 Issues 看，社区最集中的需求方向包括：

- **安全与信任边界**：Issue #492 指出社区 skill 在 `anthropic/` 命名空间下分发，造成官方/社区混淆，是当前最热门的治理议题。
  https://github.com/anthropics/skills/issues/492

- **组织级 Skill 共享**：Issue #228 呼吁支持 org-wide skill sharing，避免手动下载、传输、上传的繁琐流程。
  https://github.com/anthropics/skills/issues/228

- **评估与可观测性**：Issue #556 的 `run_eval.py` 触发率 0% 问题，反映社区对 skill 效果度量工具的高度关注。
  https://github.com/anthropics/skills/issues/556

- **上下文窗口与性能**：Issue #1487 指出 `claude-api` skill 一次性注入约 156k tokens，直接打爆上下文窗口。
  https://github.com/anthropics/skills/issues/1487

- **Agent 治理与质量门禁**：Issue #412 提出 agent-governance，Issue #1385 提出推理质量门禁流水线，说明社区开始关注“Agent 输出安全”的系统化方案。
  https://github.com/anthropics/skills/issues/412  
  https://github.com/anthropics/skills/issues/1385

- **平台集成扩展**：包括 Bedrock 使用（#29）、Skills 暴露为 MCP（#16）、SharePoint Online 安全处理（#1175）等。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃且尚未合并，近期落地可能性较高：

- **#514 document-typography**：解决所有 AI 生成文档的排版通病，定位清晰，需求普遍。  
  https://github.com/anthropics/skills/pull/514

- **#486 ODT skill**：补齐 OpenDocument 支持，与现有 docx/pdf 形成生态互补。  
  https://github.com/anthropics/skills/pull/486

- **#723 testing-patterns**：测试指导是开发者高频刚需，内容完整，落地价值高。  
  https://github.com/anthropics/skills/pull/723

- **#525 pyxel skill**：面向复古游戏开发，社区作者自带 MCP 生态，垂直场景明确。  
  https://github.com/anthropics/skills/pull/525

- **#83 skill-quality-analyzer / security-analyzer**：回应社区对 skill 质量和安全的治理诉求，是“元技能”方向的重要尝试。  
  https://github.com/anthropics/skills/pull/83

- **#1367 self-audit**：通用 AI 输出审计，契合当前对“交付前质量门禁”的关注。  
  https://github.com/anthropics/skills/pull/1367

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是：让 Skills 更可靠、更安全、更易共享——既要修复评估/触发机制这类基础工程问题，也要建立组织内部与生态层面的信任边界和质量门禁。**

---

# Claude Code 社区动态日报 — 2026-08-18

## 今日速览

- 发布 v2.1.234，新增每项目 transcript 目录命名环境变量 `CLAUDE_CODE_PROJECT_DIR_NAME` 与 `selection:clear` 键绑定操作。
- 社区讨论热度集中在 Windows 桌面应用 GPU 崩溃（#80444，39 条评论）和近期多起内存泄漏/OOM 报告（#87238、#87319、#82179）。
- 插件开发/脚本维护相关 PR 集中更新，RerankerGuo 提交的 7 项脚本健壮性修复引发关注。

## 版本发布

### v2.1.234

- 新增可选环境变量 `CLAUDE_CODE_PROJECT_DIR_NAME`：为每个会话分配独立配置目录的托管方，可为每个项目的 transcript 目录选择简短名称。
- 新增 `selection:clear` 键绑定操作：允许将按键绑定到清除应用内选择（in-app selection）。

## 社区热点 Issues

1. **[#80444] Windows 桌面应用 GPU 进程崩溃**（评论 39 | 👍 5）
   桌面应用 1.24012.1 在应用内 Browser 标签触发致命 GPU 崩溃（0x060C201E），崩溃后 MSIX 包无法启动（appxState=2），只能通过"修复"恢复。Windows 11 + RTX 2080 上两个驱动版本均可复现，是过去 24 小时评论量最高的 Issue。
   https://github.com/anthropics/claude-code/issues/80444

2. **[#33978] 内置用量分析命令请求**（评论 20 | 👍 10）
   用户请求新增 `claude usage` 命令，整合了 10+ 个相关开放 Issue。Token 用量可见性是 CLI 重度用户的长期痛点，社区呼声极高。
   https://github.com/anthropics/claude-code/issues/33978

3. **[#82179] Bash 工具 grep shim 灾难性回溯**（评论 4 | OPEN | reproduced）
   Bash 工具将 `grep` 替换为 ugrep 仿真，`-o` 与有界量词/alternation 组合时发生灾难性回溯，20 KB 文件消耗 6.6 GB RSS 并触发 OOM。严重影响 Linux 用户的大文件处理。
   https://github.com/anthropics/claude-code/issues/82179

4. **[#87238] 临时 helper 进程内存泄漏至 11.6GB 被 OOM 杀死**（评论 3 | 新）
   正常交互使用期间，一个 per-tool-call helper 进程（`claude.exe`）在约 2 分钟内膨胀至 11.6 GB 匿名 RSS，并在 12 GB cgroup 上限被内核杀死。Windows 平台内存管理问题的又一例证。
   https://github.com/anthropics/claude-code/issues/87238

5. **[#63580] VSCode 扩展：工具调用渲染为字面文本而非执行**（评论 5）
   Windows 11 上 VSCode 扩展会话中，assistant 开始将工具调用输出为 XML 风格字面文本而非实际执行。IDE 集成稳定性问题近期频发，社区关注度高。
   https://github.com/anthropics/claude-code/issues/63580

6. **[#69087] MCP 表单对话框在 TUI 全屏下被裁剪**（评论 3 | 👍 2 | OPEN）
   macOS 全屏 TUI 模式下，MCP elicitation 表单无法滚动且操作按钮在视口外，导致 MCP 配置流程无法完成。
   https://github.com/anthropics/claude-code/issues/69087

7. **[#71594] 会话限制在重置开始时立即命中**（评论 5）
   用户报告在重置周期开始时就命中 session limit，实际并未消耗到限制额度，怀疑 API 配额计算逻辑存在边界问题，影响 Linux 平台工作流。
   https://github.com/anthropics/claude-code/issues/71594

8. **[#60095] 后台任务 chips 在 subagent 退出后仍显示 Running**（评论 7）
   subagent 中启动的后台 Bash 任务在进程退出后，父会话的"Background tasks"面板仍显示 Running，且 Stop 按钮无响应。UI 状态同步问题。
   https://github.com/anthropics/claude-code/issues/60095

9. **[#68545] Subagent 返回 prompt 注入形状输出**（评论 6）
   `general-purpose` subagent 在 0 次工具调用的情况下，多次返回"元指令"形状内容作为整个结果，引发对 subagent 安全边界的讨论。
   https://github.com/anthropics/claude-code/issues/68545

10. **[#67323] Auto-mode 无限生成 monitor 进程导致 API 费用失控**（评论 5）
    auto-mode 在批次分类器被拒绝后不断派生 monitor 进程，用户表示"吃顿饭回来"发现 API 用量暴涨，费用风险引发热议。
    https://github.com/anthropics/claude-code/issues/67323

## 重要 PR 进展

1. **[#87395] 修复 ralph-wiggum 插件模型自调用循环**
   插件 frontmatter 中的 `hide-from-slash-command-tool` 字段并非受支持字段，导致模型可自行调用 `/ralph-loop` 进入循环。此修复启用了正确的 `disable-model-invocation` 机制。
   https://github.com/anthropics/claude-code/pull/87395

2. **[#79131] validate-settings.sh 无匹配时不再异常退出**
   此前脚本在 frontmatter 无小写键匹配时，因 `grep` 返回 1 被 `set -e` 中止且无任何诊断信息。修复后可以正确报告被跳过的键。
   https://github.com/anthropics/claude-code/pull/79131

3. **[#72451] 从防火墙脚本移除失效的 statsig 域名**
   `statsig.anthropic.com` 已不再解析，导致 devcontainer 启动时 `init-firewall.sh` 因解析失败而出错退出。清理失效域名。
   https://github.com/anthropics/claude-code/pull/72451

4. **[#30692] 添加容器隔离示例（含 guard hook）**
   新增 `examples/container/`，提供在 Podman/Docker 中运行 Claude Code 的完整配置，并实现 PreToolUse 钩子保护破坏性 Git 操作。
   https://github.com/anthropics/claude-code/pull/30692

5. **[#84004] 限制插件开发中的 frontmatter 解析范围**
   修复 `sed` 表达式在遇到 Markdown 正文中的 `---` 时重新开始解析的问题。现在只解析开头的 YAML frontmatter 块。
   https://github.com/anthropics/claude-code/pull/84004

6. **[#84003] 脚本顶层失败正确传播**
   修复 duplicate-maintenance 脚本使用 `.catch(console.error)` 吞掉启动/API 失败的问题，现在会返回失败退出码并保留原始错误日志。
   https://github.com/anthropics/claude-code/pull/84003

7. **[#83999] gh 包装器验证标志值**
   修复 `gh` 包装器在标志缺少值时转发不完整命令（如 `gh issue list --limit`）的问题，避免绕过参数验证。
   https://github.com/anthropics/claude-code/pull/83999

8. **[#83995] 验证标签选项值**
   修复 `--add-label`/`--remove-label` 缺少值时因 `set -u` 导致的 `$2: unbound variable` 崩溃，以及后续选项被错误消费的问题。
   https://github.com/anthropics/claude-code/pull/83995

9. **[#83993] 拒绝自引用重复 Issue**
   防止 `comment-on-duplicates.sh` 将触发 Issue 报告为自身的重复项，此前该脚本会接受相同 Issue 编号并发布自引用评论。
   https://github.com/anthropics/claude-code/pull/83993

10. **[#83992] 测试钩子支持断言期望结果**
    为 `test-hook.sh` 增加 `--expect allow|deny|ask` 参数，此前无论 allow 还是 deny 都被视为成功，无法捕获"本应拒绝却放行"的逻辑错误。
    https://github.com/anthropics/claude-code/pull/83992

## 功能需求趋势

- **内置用量分析**：#33978 整合 10+ 个相关 Issue，Token 用量可见性是 CLI 重度用户最迫切的需求。
- **持久语音交互**：#83434 请求真正的双向语音对话且无空闲断开，用户希望将 Claude Code 用作移动场景下的个人助理。
- **IDE 集成稳定性**：多起 VSCode 相关 Issue（工具调用渲染、环境设置被忽略、会话列表为空）表明 IDE 扩展是目前最集中的体验短板。
- **MCP 体验优化**：MCP 表单对话框裁剪（#69087）与 MCP 指令注入上下文（#48680）体现了 MCP 在 UI 与上下文管理上的问题。
- **性能与内存管理**：至少 3 起独立的内存泄漏报告（#87238、#87319、#82179），覆盖 Windows 与 Linux，内存问题成为跨平台共性关注点。

## 开发者关注点

- **内存泄漏反复出现**：grep shim、per-tool-call helper 进程、后台 Bash 进程均出现 OOM 级内存膨胀，社区对此高度敏感。
- **Windows 平台问题集中**：GPU 崩溃、VSCode 扩展缺陷、映射网络驱动器会话异常，Windows 用户体验明显落后于 macOS/Linux。
- **模型行为一致性存疑**："Claude Code went from hero to zero"（#72486）、"每个响应都需要对抗性验证"（#72480）等标题背后，是用户对模型输出可靠性的真实担忧。
- **沙箱/Bash 工具合理性**：grep 被替换为 ugrep 仿真导致性能问题、`excludedCommands` 配置陷阱（需 `:*` 后缀），开发者希望沙箱在安全与性能间取得更好的平衡。
- **安全边界**：subagent 返回 prompt 注入形状输出（#68545）、OAuth 证书链问题（#71766），安全问题持续受到社区关注。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-18

## 今日速览

昨日发布了 `rust-v0.148.0-alpha.21` 预发布版本；社区最强烈的声音集中在 **CLI 自动解析行为不可控**（#28969，195 👍）与 **MCP OAuth 令牌不自动刷新**（#17265）两大痛点上。与此同时，一批面向 TUI 稳定性、Windows 沙箱加固、可观测性基础设施的 PR 正密集推进，显示官方在桌面端稳定性与内部架构收敛上投入显著。

---

## 版本发布

### rust-v0.148.0-alpha.21
- **标签**: `0.148.0-alpha.21`
- **说明**: 仅提供基础版本标记，仓库未附带详细变更日志，建议关注后续 release notes。
- 链接: https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.21

---

## 社区热点 Issues（Top 10）

### 1. 添加设置以禁用 60 秒自动解析问题
- **Issue #28969** | 状态: OPEN | 评论: 78 | 👍: 195
- 用户希望增加配置项，关闭或调整 Codex 对问题的 60 秒自动解析（auto-resolve）行为，以便在复杂排障场景中获得更充裕的响应时间。
- 社区反应强烈，是目前点赞数最高的问题，说明大量用户在实际工作流中受到该超时机制的影响。
- 链接: https://github.com/openai/codex/issues/28969

### 2. Codex 不会自动刷新路由 MCP OAuth 令牌
- **Issue #17265** | 状态: OPEN | 评论: 31 | 👍: 57
- 即使 `~/.codex/.credentials.json` 中存有 `refresh_token`，Codex 也不会在访问令牌过期时自动续期，导致 MCP 工具调用持续失败。
- 影响所有依赖远程 MCP 服务器（需 OAuth 鉴权）的用户，社区关注度较高。
- 链接: https://github.com/openai/codex/issues/17265

### 3. Codex ChatGPT 登录流程异常
- **Issue #24990** | 状态: OPEN | 评论: 26 | 👍: 22
- 已订阅 ChatGPT Plus 的用户无法通过宣传中的 ChatGPT 登录流程使用 Codex，`codex login` 与 `--device-auth` 均被重定向至 `add-phone` 页面。
- 该问题阻碍了非 API Key 用户的入门体验。
- 链接: https://github.com/openai/codex/issues/24990

### 4. [macOS] 桌面版无法恢复远程控制 / CLI 线程（回归）
- **Issue #37403** | 状态: OPEN | 评论: 21 | 👍: 17
- 8 月 7 日 macOS 桌面版更新后，通过手机 Remote Control 恢复 Mac 上的 CLI 线程时出现 `already has an active writer` 错误，此前可正常使用。
- 涉及远程控制与本地 CLI 并发写入的回归问题，影响远程办公用户。
- 链接: https://github.com/openai/codex/issues/37403

### 5. macOS 版累积 Computer Use / MCP 辅助进程与僵尸子进程
- **Issue #25744** | 状态: OPEN | 评论: 19 | 👍: 3
- 长时间运行的 Codex 会话在 macOS 上累积 MCP/Computer Use 辅助进程，并产生大量未被回收的僵尸进程，进而引发 HID 延迟与 WindowServer/TCC 阻塞。
- 属于典型的资源泄漏问题，对重度用户影响较大。
- 链接: https://github.com/openai/codex/issues/25744

### 6. TUI 退格键一次删除多个字符
- **Issue #17793** | 状态: OPEN | 评论: 16 | 👍: 5
- 在 Codex CLI 的 TUI 输入框中，按退格键有时会删除多于一个字符，影响 prompt 编辑的精准性。
- 涉及核心输入体验，虽定位简单但持续存在，说明 TUI 输入层仍有兼容性缺陷。
- 链接: https://github.com/openai/codex/issues/17793

### 7. Fork 的子代理继承父级用户意图并误判为直接指令
- **Issue #13491** | 状态: OPEN | 评论: 10 | 👍: 11
- 通过 fork 产生的 Worker 子代理会继承父会话的用户意图，导致其误将上下文中的描述当作直接指令执行，出现递归委派等意外行为。
- 指向子代理隔离机制的设计缺陷，对多代理工作流有潜在影响。
- 链接: https://github.com/openai/codex/issues/13491

### 8. Codex Desktop create_thread 不继承工作树的自动批准模式
- **Issue #33282** | 状态: OPEN | 评论: 9 | 👍: 5
- Windows 桌面上通过 `create_thread` 创建的 worktree 任务无法继承父任务的自动批准模式，导致权限行为不一致。
- 影响自动化流程与本地权限继承的预期一致性。
- 链接: https://github.com/openai/codex/issues/33282

### 9. 多代理 V2 全历史 Fork 导致会话存储膨胀至 110 GiB
- **Issue #34268** | 状态: OPEN | 评论: 9 | 👍: 6
- 使用 Ultra 推理与多代理 V2 的长期会话产生了约 110 GiB 的本地会话数据，存储增长呈乘数效应，疑似与历史压缩快照和图片重复复制有关。
- 对磁盘空间敏感的用户而言是严重问题，尤其是 macOS 笔记本用户。
- 链接: https://github.com/openai/codex/issues/34268

### 10. [Windows] 本地 stdio MCP 服务器在单任务内被反复拉起
- **Issue #38754** | 状态: OPEN | 评论: 7 | 👍: 2
- Windows 版 Codex 应用在单个任务中每一轮对话都会重新生成 stdio MCP 服务器进程，且旧进程未被回收，造成资源浪费与潜在不稳定。
- 与 macOS 上的进程泄漏问题（#25744）形成跨平台呼应，表明 MCP 进程生命周期管理是当前短板。
- 链接: https://github.com/openai/codex/issues/38754

---

## 重要 PR 进展（Top 10）

### 1. 迁移 app-server 测试至共享 HTTP 客户端
- **PR #39093** | 状态: OPEN（code-reviewed）
- 将 app-server 的 OAuth 回调与 WebSocket 健康检查测试从 `reqwest` 迁移到共享的 `codex-http-client` 抽象，统一网络层实现。
- 链接: https://github.com/openai/codex/pull/39093

### 2. 避免历史插入期间冗余的终端尺寸查询
- **PR #39100** | 状态: OPEN
- 将 TUI 绘制与历史尾部路径中已有的屏幕尺寸透传给历史插入逻辑，避免每次插入时重复查询后端终端尺寸，减少 IPC 开销。
- 链接: https://github.com/openai/codex/pull/39100

### 3. 使 codex-otel OTLP HTTP 导出器支持代理
- **PR #39091** | 状态: OPEN
- 让 OTLP/HTTP 日志、追踪、指标及 Statsig 导出器统一走 `codex-http-client` 中支持代理的传输层，同时保留 collect 端 TLS/mTLS 与企业 CA 配置。
- 链接: https://github.com/openai/codex/pull/39091

### 4. 强化 TUI 子代理导航
- **PR #39088** | 状态: CLOSED
- 统一使用 `/subagents` 命令（移除 `/agent` 别名）；重新加入已加载的子代理线程时保留其既有设置；通知与审批仅路由至当前活动线程。
- 链接: https://github.com/openai/codex/pull/39088

### 5. 从 AuthManager 读取插件认证状态
- **PR #39087** | 状态: CLOSED
- 让 `PluginsManager` 持有共享的 `AuthManager`，插件发现、启动任务、CLI 配置等场景均从同一管理器读取认证模式与凭据，消除认证状态的独立快照。
- 链接: https://github.com/openai/codex/pull/39087

### 6. 保留文件系统权限路径约定
- **PR #39084** | 状态: CLOSED
- 修复将权限路径立即转换为本机绝对路径导致 `/C:/secret` 或 Windows UNC 路径语义改变的问题，确保路径约定在处理前不被破坏。
- 链接: https://github.com/openai/codex/pull/39084

### 7. 加固 Windows 沙箱配置，防范重解析点
- **PR #39083** | 状态: CLOSED
- 提升沙箱配置流程的安全性：在用户提供的 `CODEX_HOME` 下配置 ACL 时，避免跟随目录 junction 等重解析点，防止 ACL 被应用到非预期目录。
- 链接: https://github.com/openai/codex/pull/39083

### 8. 在远程 TUI 工作区中提示项目信任
- **PR #39082** | 状态: CLOSED
- 远程 TUI 会话启动线程前，会先查询远程 app-server 的项目配置层；若不存在既有信任决策，则显示信任提示，并支持解析相对远程工作目录。
- 链接: https://github.com/openai/codex/pull/39082

### 9. 按 Delta 大小限制 TUI 线程重放缓冲区
- **PR #39081** | 状态: CLOSED
- 此前重放缓冲区仅限制事件条数，流式 agent-message delta 可能在线程非活跃期间无限累积文本。该 PR 改为合并相邻 delta 并按大小限制内存占用。
- 链接: https://github.com/openai/codex/pull/39081

### 10. 向 `codex doctor` 添加桌面端更新诊断
- **PR #39074** | 状态: CLOSED
- 扩展 `codex doctor`，探测桌面应用更新端点的可达性（macOS Sparkle / Windows Store），并报告已暂存但尚未安装的更新，帮助用户排查更新失败问题。
- 链接: https://github.com/openai/codex/pull/39074

> 另请注意：**PR #31901**（Code Mode 工具模式中解析本地 MCP `$ref` 引用）虽已关闭，但其功能意义不小——它支持在 TypeScript 工具声明中解析 `#/$defs/...` 与 `#/definitions/...` 引用，含 RFC 6901 转义路径，改进 MCP 工具模式的完整性。链接: https://github.com/openai/codex/pull/31901

---

## 功能需求趋势

从近 24 小时更新的大量 Issues 中，社区关注点集中在以下方向：

| 方向 | 代表性 Issues / PRs | 趋势说明 |
|------|---------------------|----------|
| **TUI / CLI 交互精细控制** | #28969（禁用 60s auto-resolve）、#32817（折叠进度中的代码片段）、#17793（退格键多删） | 用户对 TUI 输入、输出和自动行为的可配置性要求持续提高 |
| **MCP 生命周期与认证** | #17265（OAuth 不自动刷新）、#38754（MCP 进程反复拉起）、#33599（Desktop 静默丢失 MCP 工具） | MCP 令牌管理、进程生命周期和工具挂载一致性是跨平台高频痛点 |
| **Windows / macOS 桌面稳定性** | #25744（macOS 僵尸进程）、#38518（Windows 读循环卡顿）、#35841（DPAPI 凭据恢复失败） | 桌面端资源泄漏、性能回退与权限恢复问题集中爆发 |
| **沙箱安全与路径语义** | #39083（重解析点防护）、#39084（权限路径约定）、#39085（文档推荐不安全前缀规则） | 沙箱的路径处理、ACL 应用与安全文档准确性受到关注 |
| **多代理 / 子代理行为隔离** | #13491（子代理继承父意图）、#34268（会话存储膨胀）、#39088（TUI 子代理导航） | 子代理上下文隔离、存储效率与导航体验是进阶用户的核心诉求 |
| **可观测性与诊断能力** | #39091（OTLP 代理支持）、#39078（环境解析追踪）、#39074（doctor 更新诊断） | 官方正在系统性地提升遥测管道与根因诊断工具链 |

---

## 开发者关注点

1. **自动解析机制缺乏控制**：#28969 以 195 👍 高居榜首，反映用户在多轮复杂排查中需要更长等待或完全禁用自动解析，而非被 60 秒硬限制强行打断。

2. **MCP 认证断连问题突出**：令牌不刷新（#17265）与 MCP 进程被反复拉起（#38754）说明 MCP 的凭证管理和进程模型尚未成熟，成为依赖远程工具链用户的最大阻力。

3. **桌面端资源泄漏呈跨平台蔓延**：macOS 的僵尸子进程（#25744）与 Windows 的 MCP 重复生成（#38754）叠加，暗示底层进程监管框架需要一次系统性重构。

4. **登录与设备验证流程摩擦**：#24990 显示 ChatGPT Plus 订阅用户仍无法顺畅走通 Codex 登录，新增手机号验证环节对部分用户构成硬门槛。

5. **沙箱安全文档与实现存在偏差**：#39085 指出官方文档推荐的“prefix rules”示例实际上并不安全，说明安全文档的审查流程需要加强。

6. **会话存储膨胀令人担忧**：#34268 揭示多代理 V2 与 Ultra 推理组合下会话目录可膨胀至上百 GiB，对 SSD 空间有限的开发者是现实威胁。

---

> **说明**：本日报数据基于 GitHub `openai/codex` 仓库截至 2026-08-18 的公开 Issues / PRs 元数据，状态与评论数以抓取时刻为准。部分 PR 标题含 `[CLOSED]` 标记，表示已被合入或关闭，请注意区分。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-18）

> 数据窗口：2026-08-17 更新 | 来源：github.com/google-gemini/gemini-cli

## 今日速览

- 昨日发布 nightly `v0.56.0-nightly.20260817`，仅包含一项 SSR Agent 构建配置修复。
- 社区热点集中在 **subagent 误报成功/挂起**、**Shell 命令执行后假死** 以及 **Auto Memory 隐私与重试机制**，多个 p1 级 bug 仍未关闭。
- PR 方面安全修复成为亮点：扩展环境变量 consent 机制与 eval 供应链 RCE 防护均被提出，另有多个 SSR Agent 批量修复已合入。

---

## 版本发布

### v0.56.0-nightly.20260817.g9a15c45fb

- 内容：为 `packages/cli/tsconfig` 添加 `composite` 标志，修复 SSR Agent 在 CLI 包中的工程配置问题。
- 关联 PR：[#28813](https://github.com/google-gemini/gemini-cli/pull/28813)
- 发布标签：[v0.56.0-nightly.20260817.g9a15c45fb](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260817.g9a15c45fb)

无其他功能更新。

---

## 社区热点 Issues（10 个）

1. **[#22323] Subagent 在 MAX_TURNS 中断后被误报为 GOAL 成功**  
   [priority/p1, kind/bug]  
   `codebase_investigator` 实际因达到最大轮次未做任何分析，却返回 `status: success` 和 `Termination Reason: GOAL`，严重误导主 Agent 判断。社区已有 12 条评论，并出现关联修复 PR [#28815](https://github.com/google-gemini/gemini-cli/pull/28815)。  
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] Generalist Agent 挂起，简单操作也永久等待**  
   [priority/p1, kind/bug]  
   用户反馈创建文件夹这类简单改动也会挂起最多一小时；显式禁止 defer 到 subagent 后问题消失。该 Issue 有 8 条评论、8 个 👍，是当前 subagent 可靠性最集中的抱怨之一。  
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#25166] Shell 命令执行完毕后卡在 "Waiting input"**  
   [priority/p1, area/core]  
   即使是最简单的 CLI 命令，也会在已结束后仍显示为执行中并等待输入，严重影响自动化流。4 条评论、3 个 👍，p1 级终端稳定性问题。  
   https://github.com/google-gemini/gemini-cli/issues/25166

4. **[#26525] Auto Memory 需要确定性脱敏并减少日志**  
   [priority/p2, area/security]  
   当前实现是先把本地 transcript 送入模型上下文，再由模型根据提示词脱敏，隐私风险较高；此外日志可能记录已有 skill 内容。社区对“先发送后脱敏”模式表达了担忧。  
   https://github.com/google-gemini/gemini-cli/issues/26525

5. **[#26522] Auto Memory 会对低信号会话无限重试**  
   [priority/p2, kind/bug]  
   只有 extraction agent 成功 `read_file` 才会把 session 标记为已处理，低信号会话因此反复出现，浪费资源并可能污染记忆。  
   https://github.com/google-gemini/gemini-cli/issues/26522

6. **[#21983] Browser Subagent 在 Wayland 环境失败**  
   [priority/p1, agent/browser]  
   浏览器子代理在 Wayland 上直接终止，`Termination Reason` 仅返回 GOAL，缺少根因信息。该问题影响 Linux 桌面用户，4 条评论。  
   https://github.com/google-gemini/gemini-cli/issues/21983

7. **[#22232] Browser Agent 需要更健壮的会话接管与锁恢复**  
   [priority/p3, kind/feature]  
   当前 `BrowserManager.ts` 对锁定 profile 采取 fail-fast 策略，无法处理 persistent session 被残留进程占用的情况。社区希望加入自动接管或 lock recovery。  
   https://github.com/google-gemini/gemini-cli/issues/22232

8. **[#22093] v0.33.0 后 Subagents 绕过用户权限设置运行**  
   [priority/p2, kind/bug]  
   用户已在配置中禁用全部 agents，但升级后 generalist 等 subagent 仍被自动调用。权限/配置一致性受到质疑，3 条评论，安全影响较高。  
   https://github.com/google-gemini/gemini-cli/issues/22093

9. **[#24246] 工具超过 128 个时 Gemini CLI 报 400 错误**  
   [priority/p2, kind/bug]  
   当启用工具数量过多时请求直接失败，用户希望 Agent 能更智能地按需裁剪工具范围，而不是一次性全部发送。  
   https://github.com/google-gemini/gemini-cli/issues/24246

10. **[#22745] 评估 AST-aware 文件读取、搜索与代码库映射的价值**  
    [priority/p2, EPIC]  
    该 EPIC 跟踪 AST 感知工具对精确读取方法边界、减少 token 噪声、提升导航效率的潜在收益，是下一阶段代码理解能力的重要方向。7 条评论，社区关注度稳定。  
    https://github.com/google-gemini/gemini-cli/issues/22745

---

## 重要 PR 进展（10 个）

1. **[#28863] 扩展环境变更需征得同意，并过滤运行时环境变量**  
   [Open, size/m]  
   防止扩展更新绕过用户同意，向 MCP server 子进程注入未经授权的环境变量。对扩展生态的安全基线有明显加强。  
   https://github.com/google-gemini/gemini-cli/pull/28863

2. **[#28740] 修复 eval-pr 工作流中的供应链 RCE 风险**  
   [Open, area/security]  
   将 eval workflow 拆分为安全的 pull_request build 与可信的 workflow_run 执行，避免不可信 fork 代码在 `pull_request_target` 高权限上下文中执行。  
   https://github.com/google-gemini/gemini-cli/pull/28740

3. **[#28815] 保留 Subagent 恢复时的原始终止原因**  
   [Closed]  
   修复 [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)：subagent 在 `MAX_TURNS`/`TIMEOUT` 后通过 `complete_task` 完成优雅恢复时，不再误报为 GOAL 成功，而是保留真实终止原因。  
   https://github.com/google-gemini/gemini-cli/pull/28815

4. **[#28812] 为 TUI 初始化增加执行超时，防止无限挂起**  
   [Closed]  
   修复从裸 Linux 终端启动时 “Initializing...” 永久卡住的问题，通过超时机制避免 `execAsync` 调用 `ps` 失败导致整个 TUI 不可用。  
   https://github.com/google-gemini/gemini-cli/pull/28812

5. **[#28816] 修复 MessageBus.request 在 publish 失败时静默挂起**  
   [Closed]  
   此前 `publish()` 的 floating promise 若 reject，请求会在无提示情况下挂起约 60 秒；本次补上错误路径处理。  
   https://github.com/google-gemini/gemini-cli/pull/28816

6. **[#28817] 保留执行中 Subagent 工具的 Hook 状态**  
   [Open]  
   修复首次出现且无需审批的 subagent 工具调用被过滤掉的问题，确保 hook 状态能追踪正在执行的子代理工具调用。  
   https://github.com/google-gemini/gemini-cli/pull/28817

7. **[#28847] 更新 `/clear` 命令文档，说明会清除上下文**  
   [Closed]  
   修复 [#19239](https://github.com/google-gemini/gemini-cli/issues/19239)：原先文档只提到清屏，遗漏了 `/clear` 会重置活动上下文这一关键行为。  
   https://github.com/google-gemini/gemini-cli/pull/28847

8. **[#28834] 抑制 Workspace 扫描中临时目录消失导致的 ENOENT 误报**  
   [Open]  
   BFS 遍历时如果 `projects.json.lock` 等临时目录在 `readdir` 后消失，会产生误导性错误；该 PR 对非根目录的 ENOENT 进行静默处理。  
   https://github.com/google-gemini/gemini-cli/pull/28834

9. **[#28624] 防止布尔型 thought 泄漏为 `[Thought: true]` 文本**  
   [Closed]  
   修复模型输出中出现 `[Thought: true]` 的显示问题，避免内部 thought parts 被错误拼接到文本表示中。  
   https://github.com/google-gemini/gemini-cli/pull/28624

10. **[#28744] ACP 恢复会话时不再先启动新 Chat，避免污染 session 文件**  
    [Open, p1]  
    移除 load path 上重复的 fresh-chat 启动，部分修复恢复 session 时文件被污染的问题，对 ACP 集成稳定性很重要。  
    https://github.com/google-gemini/gemini-cli/pull/28744

---

## 功能需求趋势

- **Subagent 可靠性与可观测性**：社区强烈要求 subagent 能准确上报终止原因、不静默挂起，并支持通过 `/chat share` 或 `/bug` 暴露子代理轨迹（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)、[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）。
- **Auto Memory 隐私与数据处理策略**：诉求集中在“先脱敏再发送”、避免低信号会话无限重试、隔离无效 patch，以及减少日志暴露（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）。
- **Browser Agent 环境兼容与自恢复**：Wayland 支持、profile 锁恢复、`settings.json` override 生效，成为浏览器代理落地桌面的关键需求（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)、[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）。
- **终端/Shell 交互稳定性**：解决“Waiting input”假死、交互式命令卡住、resize 闪烁、外部编辑器退出后刷新异常等体验问题，仍然是最直接影响日常使用的方向（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)、[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)、[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)、[#24935](https://github.com/google-gemini/gemini-cli/issues/24935)）。
- **上下文感知与代码理解升级**：AST-aware 文件读写/搜索/代码库映射的长期价值被持续跟踪，同时需要约束模型随意创建临时脚本、并解决工具数量过多导致的 400 错误（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)、[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）。

---

## 开发者关注点

- **“Agent 不可用比没有 Agent 更糟”**：多线程反馈显示 subagent 挂起、误报成功、绕过权限设置，会让用户直接禁用 subagent 来保证工作流可控。
- **配置与文档一致性差**：`/clear` 文档漏掉上下文清除、`browser_agent` 忽略 `settings.json`、禁用 agents 后仍被调用，这些“配置不生效”类问题降低了信任度。
- **隐私/安全是隐性红线**：Auto Memory“先发送后脱敏”和扩展向 MCP 子进程注入环境变量，都让开发者感到不安；安全类 PR（如 [#28740](https://github.com/google-gemini/gemini-cli/pull/28740)）因此获得了较多关注。
- **希望模型更主动但更克制**：一方面模型不主动使用自定义 skills/sub-agents，另一方面又会在工作区各处生成临时脚本，用户希望模型在工具选择和清理上都更聪明。

> 总体来看，当前 Gemini CLI 社区正处于“subagent 稳定性修复 + 安全加固 + 终端体验打磨”的密集迭代期；SSR Agent 批量修复已开始覆盖多个 p1 问题，但距离社区期望的“可靠默认行为”仍有距离。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-18

## 今日速览

昨日社区共更新 28 条 Issue 与 1 条 PR，整体聚焦三大主题：**MCP 生态稳定性**（OAuth 认证兼容性、缓存与策略问题）、**非交互模式（ACP/`-p`）与交互模式的行为不一致**，以及**会话生命周期管理缺陷**（内存看门狗误压缩、连接 ID 失效、Docker MCP 残留等）。值得特别注意的是，仓库收到一条移除 README 中全部 CLI 文档的 PR（#4510），目前原因不明，建议保持关注。


## 版本发布

过去 24 小时内无新 Release。


## 社区热点 Issues

### 1. 组织已启用模型在目录中缺失 —— MCP/模型可用性受阻
**#4390** [OPEN] 作者: Rogn | 评论: 8 | 👍: 7
组织管理员在 Copilot Business 中明确启用的模型（Claude Sonnet 5/Opus 5、Kimi K3）不出现在有效模型目录中，选择 `claude-sonnet-5` 直接提示 `This model is disabled by your organization`。多个组织、多种模型受影响，疑似目录构建逻辑与组织配置不同步。
🔗 https://github.com/github/copilot-cli/issues/4390

### 2. Atlassian MCP OAuth 在 1.0.79 回归 —— RFC 8414 issuer 不匹配
**#4480** [OPEN] 作者: jfrost-fabric | 评论: 5 | 👍: 6
升级到 1.0.79 后，Atlassian 远程 MCP 服务器（`mcp.atlassian.com`）OAuth 发现阶段失败：`authorization server advertised an issuer that does not match the URL its metadata was discovered`。1.0.71 正常，属明确的回归问题，且与 #4439 高度相关。
🔗 https://github.com/github/copilot-cli/issues/4480

### 3. GitLab MCP OAuth 元数据因 RFC 8414 issuer 不匹配被拒
**#4439** [CLOSED] 作者: patrickzel | 评论: 5 | 👍: 3
GitLab Self-Managed MCP 服务器使用 OAuth 2.0 动态客户端注册时，CLI 1.0.79 报 issuer 不匹配错误。**该 Issue 现已关闭**，但关闭原因未明示——若与 #4480 同源修复，应在下一个版本中解决。
🔗 https://github.com/github/copilot-cli/issues/4439

### 4. MCP 结果同时暴露 `content` 和 `structuredContent`
**#4515** [OPEN] [triage] 作者: rroesch1 | 评论: 1
当 MCP 工具结果同时包含 `content` 与 `structuredContent` 时，CLI 将两个字段都加入对话上下文。按 MCP 规范，有 `structuredContent` 时应优先使用它，避免冗余暴露等价文本内容——可能导致上下文膨胀或下游模型混淆。
🔗 https://github.com/github/copilot-cli/issues/4515

### 5. 内存看门狗在 23% 上下文占用时强制压缩，触发 OOM 循环
**#4506** [OPEN] 作者: jay-tau | 评论: 0
长时间运行会话在上下文仅用 ~23%（400k 窗口）时被**进程内存压力看门狗**反复强制压缩，每次只回收 0.003% token，随后循环压缩直至 OOM。触发条件是进程内存高而非上下文压力，压缩决策缺少对剩余 token 与回收收益的评估。
🔗 https://github.com/github/copilot-cli/issues/4506

### 6. `SHIFT + ENTER` 执行提示而非换行 —— 交互体验问题
**#1481** [CLOSED] 作者: mithunshanbhag | 评论: 28 | 👍: 17
`SHIFT + ENTER` 是聊天应用中通用的换行快捷键，但 Copilot CLI 仅支持 `CTRL + ENTER` 换行，`SHIFT + ENTER` 反而会直接执行提示。该问题收到 28 条评论、17 个赞，是目前热度最高的 Issue（现已关闭）。
🔗 https://github.com/github/copilot-cli/issues/1481

### 7. 仓库级 `enabledPlugins` 在非交互模式下被忽略
**#4507** [OPEN] 作者: RezaJooyandeh | 评论: 1
`.github/copilot/settings.json` 中的 `enabledPlugins` 在交互模式与 `copilot plugins list` 中生效，但在 `copilot -p`（非交互）模式中被完全忽略。同一配置在不同表面行为不一致，影响自动化流水线中的插件使用。
🔗 https://github.com/github/copilot-cli/issues/4507

### 8. 恢复的会话保留陈旧连接 ID —— 所有提示失败
**#4505** [OPEN] 作者: Adamkadaban | 评论: 0
恢复会话后每个提示都报错：`CAPIError: 400 input item ID does not belong to this connection`。重试无法恢复，`/fork` 也无法解决——表明会话存储中持久化了失效的连接状态，而非偶发网络问题。
🔗 https://github.com/github/copilot-cli/issues/4505

### 9. `--no-alt-screen` 被静默移除且无替代方案
**#4509** [OPEN] [triage] 作者: bounis | 评论: 0 | 👍: 1
`--no-alt-screen` 标志被完全移除，没有弃用通知、没有替代方案。自三月以来 #1799、#2334 已多次报告 alt-screen/fullscreen 模式的问题（如终端集成中的渲染异常），此次移除让用户完全无法退出该模式。
🔗 https://github.com/github/copilot-cli/issues/4509

### 10. 插件市场缓存忽略 `ref` —— 多项目共享缓存时串分支
**#4513** [OPEN] [triage] 作者: kristenmatsumoto | 评论: 0
当两个项目引用同一 git 市场源但指定不同 `ref`（分支）时，CLI 的磁盘缓存仅以源 URL/路径为键，忽略 `ref`。切换项目后插件内容可能来自错误分支，破坏多项目并行开发的可复现性。
🔗 https://github.com/github/copilot-cli/issues/4513


## 重要 PR 进展

过去 24 小时内仅 1 条 PR 更新，且内容异常：

### #4510 [OPEN] 移除 README 中的 GitHub Copilot CLI 文档
作者: prioritizedprotection086 | 评论: 无 | 👍: 0
**移除 README 中全部 Copilot CLI 安装说明与使用指南。** 本次提交没有任何解释性描述，文件的作者名也疑似非维护者。可能原因：维护者正在搬迁文档至独立站点、误操作，或恶意 PR。**建议确认仓库维护者是否知晓此变更，勿在未核实前合并。**
🔗 https://github.com/github/copilot-cli/pull/4510


## 功能需求趋势

### 1. MCP 生态稳定性与兼容性（最高优先级）
社区对 MCP 的支持需求已从"能用"进入"稳定兼容"阶段：#4480/#4439 的 OAuth issuer 校验问题、#4512 的"策略获取失败时 fail-closed 阻断本地 stdio 服务器"、#4515 的 content/structuredContent 去重，#4513 的缓存 ref 隔离。**OAuth 认证兼容性与覆盖策略（fail-open/fail-closed）是当前最痛点。**

### 2. 非交互模式（ACP/`-p`）能力补齐
多条 Issue 指向非交互模式与交互模式的体验鸿沟：#4275（`contextTier` 在 ACP 中不可配）、#4507（`enabledPlugins` 被忽略）、#4504（`account.getQuota` 返回请求时间而非真正的配额重置时间）。**社区期望非交互模式具备与交互模式对等的配置能力。**

### 3. 会话生命周期管理改进
#4506（内存看门狗误压缩循环）、#4505（恢复会话 stale 连接 ID）、#4461（Docker MCP 容器随会话关闭而残留）、#4313（会话历史滚动）。**长时间运行会话的可靠性、资源回收与可浏览性**是高频诉求。

### 4. 模型选择灵活性与透明度
#4390（组织模型缺失）、#2950（自定义 agent 的 model 属性被忽略）、#4459（auto 模式推理级别冲突导致执行失败）、#4511（Kimi K3 的 AIC 消耗显示不准）。**用户需要"配置什么就用什么"的确定性，以及准确的用量计量。**

### 5. 终端体验与可访问性
#1481（SHIFT+ENTER 换行）、#4509（--no-alt-screen 被移除）、#4485（主题隔夜变浅色）、#4455（会话选择器低对比度）。**终端交互细节与可访问性（明暗主题、对比度、键盘绑定）持续积累用户不满。**


## 开发者关注点

### 🚨 1. MCP OAuth 兼容性回归引发信任危机
1.0.79 对 RFC 8414 issuer 的严格校验导致 Atlassian（#4480）、GitLab（#4439）等多个 MCP 服务器认证失败。开发者指出这是 **1.0.71 → 1.0.79 的回归**，对远程 MCP 的可用性造成实质性打击。同时 #4512 揭示了"策略获取失败即封禁所有非默认 MCP 服务器（含本地 stdio）"的 fail-closed 设计，被指"惩罚了最无辜的本地用户"。

### 🚨 2. 非交互模式与交互模式行为不一致
#4507（enabledPlugins）与 #4275（contextTier）表明：**同一份配置在不同模式下产生不同效果**。对依赖 `copilot -p` 构建自动化流程的团队，这是不可接受的隐性不一致。

### 🚨 3. 会话恢复与记忆压缩的可靠性缺陷
#4505 的 "stale connection item ID" 错误意味着**恢复会话可能完全不可用且无法通过 `/fork` 拯救**；#4506 的内存看门狗则在上下文远未满时强行压缩，甚至循环至 OOM。两者叠加，长会话用户面临"数据丢失 + 进程崩溃"的双重风险。

### ⚠️ 4. 破坏性变更缺乏弃用通道
#4509 指出 `--no-alt-screen` 被**静默移除**，无弃用警告、无替代标志。此前 #1799/#2334 已多次报告 alt-screen 的问题，此次移除彻底关上了退路。社区对破坏性变更的沟通方式表达了明确不满。

### ⚠️ 5. 桌面应用与系统集成稳定性
#4492（WebView2 渲染器 `STATUS_BREAKPOINT` 崩溃白屏）、#4382（Oracle Linux 10 `ENOEXEC` 但 ld.so 可运行）、#4456（硬依赖捆绑 gh.exe）——开发者希望 CLI 在**异构环境与桌面集成**中具备更高的健壮性与可配置性。

---

*日报生成时间: 2026-08-18 | 数据来源: github.com/github/copilot-cli Issues/PRs*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-08-18**  
**数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 1. 今日速览

今日项目动态较少，**无新版本发布、无新 Issue 更新**。唯一值得关注的是 PR #864 的关闭，该 PR 引入了 `--starting-prompt` 标志，旨在让用户无需先进入交互式 shell 即可直接注入提示词，但最终未合并。社区对"更顺滑的会话启动方式"存在真实需求。

---

## 2. 版本发布

**过去 24 小时内无新 Release。**

---

## 3. 社区热点 Issues

**过去 24 小时内无 Issue 更新。**  

今日无新出现或活跃的社区 Issue，建议关注上期遗留的高热度话题（如模型接入、终端体验优化等）。

---

## 4. 重要 PR 进展

### #864 [已关闭] feat: `--starting-prompt` 标志，免退出直达提示词
- **作者**：stebbins  
- **创建**：2026-02-02 | **最后更新**：2026-08-17 | **👍**：0  
- **链接**：[PR #864](https://github.com/MoonshotAI/kimi-cli/pull/864)  

**摘要**：  
新增 `--starting-prompt` / `-s` 标志，允许用户通过命令行直接传入起始提示词，跳过交互式 shell 的额外步骤。此 PR 关联并尝试关闭 Issue #887，同时引用了 #785 中的相关讨论。

**分析**：  
该 PR 今日被关闭，虽未合并，但揭示了 CLI 工作流中的两个核心诉求：
- **直接启动**：希望快速以一次性命令进入任务，而非先启动 REPL 再输入内容；
- **会话预设**：期待 CLI 支持类似 `kimi "prompt"` 的快速执行模式，适合脚本与自动化场景。

---

## 5. 功能需求趋势

### 基于今日唯一 PR 推断（样本有限，仅供参考）

- **会话启动体验**：开发者希望 CLI 支持「无交互式 shell 的快速启动」模式，即从命令行参数直接注入提示词并立刻执行，减少工具调用步骤。
- **脚本友好性**：`--starting-prompt` 的需求侧面反映社区正将 Kimi CLI 用于自动化流水线，而非仅作为人工交互终端。

---

## 6. 开发者关注点

- **最小化交互成本**：在管道或脚本环境中，开发者不愿被 REPL 阻塞，期待更符合 Unix 哲学的参数化输入方式。
- **对关闭 PR 的响应**：由于 PR #864 被关闭，关注用户可能转向 Issue 跟进，后续观察同一需求是否会在新 Issue 或新版 Release 中以其他形式落地。

---

*本日报基于 2026-08-18 的 GitHub 数据自动生成，部分章节因当日数据不足而简化，请结合历史数据综合参考。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-18

## 今日速览
今日社区讨论集中在 Windows 平台兼容性、2.0 端点/认证错误以及会话与模型集成问题上。Windows ARM64 TUI 初始化失败、2.0 endpoint 410 错误等成为讨论热点；功能请求方面，`Plan Mode` 自动切换 Build 模式、会话归档恢复等获得社区高赞关注。PR 侧则以自动化清理为主，多个修复和新功能（`/loop`、`/workflow` 命令、会话请求钩子）正在推进中。

---

## 社区热点 Issues

### 1. Windows ARM64 native: OpenTUI 初始化失败
**#19130** | 状态: OPEN | 💬 18 | 👍 12  
非交互式命令可正常运行，但 TUI 在 Windows 11 ARM64 上无法初始化。涉及 bun:ffi 与 TinyCC 报错，是当前平台支持中最受关注的单条 Issue。  
🔗 https://github.com/anomalyco/opencode/issues/19130

### 2. [2.0] Bug: endpoint 错误
**#43105** | 状态: CLOSED | 💬 15 | 👍 0  
用户使用 `https://opencode.ai/inference/v1` 作为 endpoint 时收到 `status 410 · Legacy inference endpoint retired`。在 opencode2 中行为不同，引发对 2.0 端点兼容性的集中讨论。  
🔗 https://github.com/anomalyco/opencode/issues/43105

### 3. [Feature] Plan Mode + Question tool 可自动切换 Build 模式
**#7801** | 状态: OPEN | 💬 11 | 👍 32  
社区高度期待的功能：当 Plan 模式下的 Question 工具需要执行操作时，自动切换至 Build 模式，减少手动切换打断工作流。  
🔗 https://github.com/anomalyco/opencode/issues/7801

### 4. ChatGPT OAuth 拒绝 EU 工作区的 GPT-5.6 模型
**#40243** | 状态: CLOSED | 💬 9 | 👍 4  
EU 数据驻留工作区通过 OAuth 认证时无法使用 GPT-5.6，而官方 Codex CLI 可以成功。暴露了 OAuth 与区域合规策略之间的兼容缺口。  
🔗 https://github.com/anomalyco/opencode/issues/40243

### 5. MCP 工具已连接但未暴露给 Agent
**#33027** | 状态: OPEN | 💬 8 | 👍 3  
MCP 服务器 `pdfrag` 连接成功且 `tools/list` 正常返回 6 个工具，但 Agent 的工具列表中不显示，影响 MCP 生态的实际可用性。  
🔗 https://github.com/anomalyco/opencode/issues/33027

### 6. [Feature] 为已归档会话添加恢复/取消归档功能
**#24153** | 状态: OPEN | 💬 8 | 👍 11  
归档目前是单向操作，会话一旦归档即从侧边栏消失。社区呼吁提供 unarchive/restore 能力。  
🔗 https://github.com/anomalyco/opencode/issues/24153

### 7. Bug: Big Pickle 提前停止响应
**#22861** | 状态: CLOSED | 💬 10 | 👍 3  
Big Pickle 在描述功能实现时反复在相同位置提前停止，用户无法继续，且难以复现，可能与模型推理状态有关。  
🔗 https://github.com/anomalyco/opencode/issues/22861

### 8. Windows 路径引用与外部目录权限不生效
**#36681** | 状态: OPEN | 💬 7 | 👍 0  
Windows 下配置 `external_directory` 路径权限未按预期工作，且缺少 Windows 路径处理相关文档，Windows 用户配置受阻。  
🔗 https://github.com/anomalyco/opencode/issues/36681

### 9. Compact Bug：对话压缩后触发用量限制
**#41990** | 状态: CLOSED | 💬 4 | 👍 3  
对话历史压缩后突然提示用量限制，而新对话在同一台机器上运作正常，疑似压缩流程中的用量状态误判。  
🔗 https://github.com/anomalyco/opencode/issues/41990

### 10. 除 hy3-free / deepseek flash free 外所有模型返回 Forbidden
**#43054** | 状态: OPEN | 💬 3 | 👍 1  
请求其他模型时收到 `Forbidden: {"model":"big-pickle"}`，服务端模型路由或代理配置疑似存在白名单限制。  
🔗 https://github.com/anomalyco/opencode/issues/43054

---

## 重要 PR 进展

### 1. feat(plugin): 添加 session request hook
**#37549** | 状态: CLOSED  
为插件新增 `ctx.session.hook("request", ...)` API，可在认证/签名前修改 HTTP 与 WebSocket 请求的 headers 和 JSON body，同时保持并发安全。  
🔗 https://github.com/anomalyco/opencode/pull/37549

### 2. fix(opencode): 恢复 session diff summary
**#37542** | 状态: CLOSED  
修复 #30127 移除全量会话快照 diff 后导致的会话级摘要丢失问题，Closes #30877 / #32852 / #17797。  
🔗 https://github.com/anomalyco/opencode/pull/37542

### 3. fix(tui): 保留系统调色板颜色
**#37537** | 状态: CLOSED  
V2 系统主题直接检测终端调色板生成，不再合成暗色，保留字面 ANSI 色相；同时与 V1 遗留表面共享调色板解析。  
🔗 https://github.com/anomalyco/opencode/pull/37537

### 4. fix(opencode): 清理 Bedrock 文档名非法字符
**#37535** | 状态: CLOSED  
Bedrock 拒绝文件名包含特殊字符的文档。此 PR 对 MCP 二进制附件的合成文件名进行清理，修复 #37191。  
🔗 https://github.com/anomalyco/opencode/pull/37535

### 5. fix(core): 恢复外部目录默认权限
**#37530** | 状态: CLOSED  
默认允许 Agent 访问发现的 skill 与 materialized reference 目录；精确 deny 仍然生效，并会在 skill/reference 状态变化时刷新默认权限。  
🔗 https://github.com/anomalyco/opencode/pull/37530

### 6. fix(core): 在 catalog 加载前刷新 console 认证
**#37517** | 状态: CLOSED  
冷启动 V2 时先解析并刷新即将过期的 Console 凭据，避免向遗留 Zen 服务发送过期 token。  
🔗 https://github.com/anomalyco/opencode/pull/37517

### 7. feat(opencode): 新增 `/loop` 会话循环命令（更新版）
**#37504** | 状态: CLOSED  
新增内置 `/loop` 命令及 `/proactive` 别名，解决原 PR #23575 的 stale 问题并合并，Closes #23578。  
🔗 https://github.com/anomalyco/opencode/pull/37504

### 8. feat: 新增 `/workflow` 斜杠命令，支持多步骤 YAML 流水线
**#37499** | 状态: CLOSED  
在 `.opencode/workflows/` 下以 YAML 定义多步骤工作流，通过 `/workflow` 命令执行。  
🔗 https://github.com/anomalyco/opencode/pull/37499

### 9. fix(snapshot): `info/exclude` 写入失败时优雅处理
**#37494** | 状态: CLOSED  
`Snapshot.sync` 写入 `info/exclude` 时使用 `Effect.orDie` 导致任何 `EACCES`（如 UID 不匹配）直接崩溃，改为失败后优雅降级，Closes #37493。  
🔗 https://github.com/anomalyco/opencode/pull/37494

### 10. fix: session list 不再启动完整实例
**#37477** | 状态: CLOSED  
`session list` 之前会加载完整实例来查询数据库，启动开销大。此 PR 改为轻量直接查询，Closes #37435。  
🔗 https://github.com/anomalyco/opencode/pull/37477

---

## 功能需求趋势

- **工作流自动化**：`/loop`、`/workflow`、Plan Mode 自动切换 Build 模式（#7801）、限流后自动暂停/恢复（#43126）等，社区希望 OpenCode 能编排多步骤任务并减少人为干预。
- **会话管理增强**：归档恢复/取消归档（#24153）、fork 时清除推理状态（#37453）等，围绕会话生命周期的精细控制需求明显。
- **平台支持补齐**：Windows ARM64 原生支持（#19130）、Windows 路径/权限文档与修复（#36681）、Windows grep/ripgrep 问题（#40623）等，Windows 用户体验是当前最大短板。
- **插件系统扩展**：插件请求钩子（#37549）、Web/Desktop 端插件 UI 层（#43132）等，社区希望插件 API 能覆盖更多客户端 Surface。
- **MCP 集成可靠性**：MCP 工具连接但不暴露给 Agent（#33027）等问题，显示 MCP 生态已进入实际使用，但稳定性仍需加强。

---

## 开发者关注点

- **Windows 平台痛点集中**：路径配置、权限、ripgrep 提取、npm postinstall 二进制复制失败（#41370）、全局安装崩溃（#41595）等，多条 Issue 同时指向 Windows 支持成熟度不足。
- **服务端端点与认证问题频发**：`410 Gone`、`Forbidden`、`Endpoint is unavailable`（#43102）、OAuth EU 区域限制（#40243）等，服务端配置和认证流程的不透明造成用户困扰。
- **大型对话与历史记录处理**：桌面端粘贴大文本冻结（#13995）、Compact 后误报用量限制（#41990）、读取图片后请求体读取失败（#43119）等，长会话场景下的稳定性值得重视。
- **磁盘与资源占用**：在 /tmp 下高频生成 .so 文件导致 SSD 损耗（#42880），社区已自行提出 RamDisk 临时方案，期望官方从根本解决。
- **模型路由与兼容性**：仅部分模型可用、Azure DeepSeek 适配器选择异常（#43106）等，多提供商模型的路由逻辑需要进一步透明化与修复。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-18

## 今日速览

昨日无新版本发布，社区讨论集中在 **auto-compaction 机制失效**（#6879）这一核心稳定性问题上，该议题以 18 条评论、17 👍 成为最热 Issue。与此同时，**AI provider 兼容性修复**成为 PR 主力，涉及 Anthropic refusal 回退、OpenRouter reasoning_details 回放、Qwen 模型目录对齐等多项关键合并。TUI 性能（大文本编辑、全屏闪烁）与上下文管理仍是开发者高频反馈的痛点。

## 社区热点 Issues

### 1. auto-compaction 在上下文超限后仍不触发，直至 provider 溢出
**#6879** · [链接](https://github.com/earendil-works/pi/issues/6879) · 18 评论 · 17 👍 · OPEN
> 核心问题：单个 agentic turn 运行超 2 小时后，footer 已越过压缩阈值并持续增长至 >100% 上下文窗口，但压缩仅在 API 因 373k tokens 拒绝请求时才被动触发。社区讨论集中在 **逐 agent 步骤后主动检查压缩** 的方案。

### 2. Linux 下配置目录不符合 XDG Base Directory 规范
**#534** · [链接](https://github.com/earendil-works/pi/issues/534) · 15 评论 · 39 👍 · CLOSED
> 老 Issue 但关注度极高（39 👍）。用户指出 `pi` 将配置直接放入 `$HOME` 根目录，违反 Linux 现代工具应遵循的 XDG 规范。虽已关闭，但 8 月 17 日仍有更新，说明社区对该历史决定的持续关注。

### 3. Prompt 编辑器大文本移动性能极差
**#8029** · [链接](https://github.com/earendil-works/pi/issues/8029) · 9 评论 · 0 👍 · OPEN
> 当 prompt 输入框内有约 7000 行文本时，单次按方向键耗时高达 **1650ms**，且延迟随文本量线性增长。直接影响长会话/大粘贴场景下的编辑体验。

### 4. 支持在 prompt 命令中传递视频/音频内容
**#3200** · [链接](https://github.com/earendil-works/pi/issues/3200) · 8 评论 · 5 👍 · OPEN
> 目前 `prompt` RPC 仅支持 `images` 字段，社区希望扩展为支持 `video`/`audio`，使 Gemma 4、GPT-4o 等多模态模型能处理视频/音频输入。该议题 4 月提出后仍在活跃讨论，反映多模态 agent 需求增长。

### 5. openai-responses 缺少 Anthropic 风格缓存控制，导致 2.5 倍成本惩罚
**#7995** · [链接](https://github.com/earendil-works/pi/issues/7995) · 4 评论 · 0 👍 · OPEN
> 由 OpenRouter 方（Luke Parke）基于 870 次基准测试提交：`openai-responses` 实现完全缺失 `cache_control` 支持，导致通过 OpenRouter 使用 Claude 模型时产生 **2.5 倍实测成本惩罚**。对成本敏感用户影响显著。

### 6. Edit 工具渲染大 diff 时导致 TUI 崩溃
**#8036** · [链接](https://github.com/earendil-works/pi/issues/8036) · 4 评论 · 0 👍 · OPEN
> `edit` 工具正常完成后，其返回的 **14.5 MB diff**（源于长物理行的 HTML 文件）导致 TUI 渲染崩溃，且会话恢复时仍复现。涉及大文件编辑的稳定性问题。

### 7. 自定义消息注入破坏 tool_calls→tool 邻接关系
**#8166** · [链接](https://github.com/earendil-works/pi/issues/8166) · 3 评论 · 0 👍 · OPEN
> 扩展通过 `sendMessage(..., { triggerTurn: false })` 在 tool 批次中间注入消息后，后续每一轮都会收到 DeepSeek 400 错误：`Messages with role 'tool' must be a response to a preceding message with 'tool_calls'`。此问题会**永久性破坏会话**，严重性较高。

### 8. detectInstallMethod 误判非 pnpm 安装
**#7756** · [链接](https://github.com/earendil-works/pi/issues/7756) · 3 评论 · 0 👍 · OPEN
> 只要路径中包含 `/pnpm/` 就会被标记为 pnpm 安装，但随后又被 `isManagedByGlobalPackageManager` 正确拒绝，导致用户看到自相矛盾的报错信息。影响通过 `PNPM_HOME` 共享 bin 的非 pnpm 安装方式。

### 9. openai-completions 的 reasoning_details 仅支持加密条目
**#7994** · [链接](https://github.com/earendil-works/pi/issues/7994) · 3 评论 · 0 👍 · OPEN
> 与 #7995 同批 OpenRouter 基准测试发现：`openai-completions` 只解析 `reasoning.encrypted` 条目，无法处理 OpenRouter 返回的 **signed-text** `reasoning_details`，导致下一轮 assistant 回放时丢失推理内容。影响推理过程追踪与多轮一致性。

### 10. TUI fullRender 渲染超长输出时触发 V8 字符串限制崩溃
**#8028** · [链接](https://github.com/earendil-works/pi/issues/8028) · 2 评论 · 0 👍 · OPEN
> 视频制作 agent 因读取大量图像帧后，`fullRender` 触发 `RangeError: Invalid string length`（V8 字符串最大长度限制），直接退出进程。属于极端规模输出下的稳定性缺口。

> 其他关注：**#8187** 小米已弃用模型清理（CLOSED）、**#8229** 本地 provider 工具轮次间仍可溢出（CLOSED）、**#8135** Gemini 3 thinkingLevelMap 设置被丢弃（CLOSED）等也值得留意。

## 重要 PR 进展

### 1. 修复 Anthropic refusal 错误并实现服务端回退
**#8258** · [链接](https://github.com/earendil-works/pi/pull/8258) · CLOSED
> 解决 #8017。在 `claude-fable-5` 上复现了压缩失败：Anthropic 返回 `stop_reason: "refusal"`。修复为模型注册表添加 `allowed_fallback_models` 元数据，并在 refusal 时按 Anthropic API 规范执行**服务端回退**。已合并。

### 2. 支持加载嵌套 Markdown skills
**#8255** · [链接](https://github.com/earendil-works/pi/pull/8255) · CLOSED
> 解决 #6479。原先 `~/.agents/skills` 仅发现递归的 `SKILL.md` 目录，忽略子目录中的独立 `.md` skill 文件。修复后保留根目录忽略规则，但正确加载 `third-party/child-skill.md` 这类嵌套文件。已合并。

### 3. 实验性 append 压缩模式
**#8120** · [链接](https://github.com/earendil-works/pi/pull/8120) · CLOSED
> 新增 `PI_EXPERIMENTAL=1` 时启用的 append 压缩。复用当前 system prompt、工具、transformed context 和 routing session，使压缩后的前缀**保留 provider prompt 缓存**（standalone 仍为默认）。对上下文管理策略有重要探索价值。

### 4. 子代理（subagent）进度与失败处理可靠性改进
**#8250** · [链接](https://github.com/earendil-works/pi/pull/8250) · OPEN
> 修复合成的 subagent 示例多处缺陷：子代理仍在工作时却报完成、进程失败信息丢失、失败时仍返回正常 tool result、单/链式输出超过 tool 限制。整体提升子代理工作流的可信度。

### 5. openai-completions 支持 reasoning_details 非加密条目回放
**#8246** · [链接](https://github.com/earendil-works/pi/pull/8246) · OPEN
> 对应 #7994。使用合成 OpenRouter 流复现：signed `reasoning.text`/`reasoning.summary` 条目被丢弃。修复为保留 assistant 消息级别的文档化 `reasoning_details` 字段，使下一轮 replay 不再丢失推理信息。

### 6. 为扩展新增 compaction 失败事件
**#8241** · [链接](https://github.com/earendil-works/pi/pull/8241) · CLOSED
> 解决 #8175。此前压缩失败只触发内部 `compaction_end errors`，扩展完全感知不到。新增 `session_compact_failed` 事件，携带原有失败 payload，让扩展能正确响应压缩失败。

### 7. 对齐 Qwen Token Plan 模型目录
**#8240** · [链接](https://github.com/earendil-works/pi/pull/8240) · CLOSED
> 解决 #8194。统一 `qwen-token-plan` 与 `qwen-token-plan-cn` 的八个文本模型列表（含 `deepseek-v4-pro-0813`、`deepseek-v4-flash-0731` 等），个体版保持独立七模型目录。已合并。

### 8. 修复超长 transcript 中内容变化导致的全屏闪烁
**#8253** · [链接](https://github.com/earendil-works/pi/pull/8253) · CLOSED
> 差分渲染原本只能触及可见视口，因此 10k+ 行 transcript 中视口上方内容更新时，会清屏并重绘全部行。修复为仅清除受影响区域，消除闪烁。TUI 体验关键改进。

### 9. Bedrock 响应透传原始 Smithy headers
**#8243** · [链接](https://github.com/earendil-works/pi/pull/8243) · CLOSED
> 解决 #8234。此前 Bedrock `onResponse`/`after_provider_response` 仅暴露 `$metadata` 派生 headers，导致 `x-bifrost-provider` 等网关头丢失。通过 middleware 捕获原始 Smithy HTTP 响应并转发真实状态码与 headers。

### 10. 在每个 turn 起始路径分发 hooks（可取消的 turn 预检）
**#8262** · [链接](https://github.com/earendil-works/pi/pull/8262) · OPEN
> `sendCustomMessage(triggerTurn: true)` 当前不会触发 `input` hook 或 `before_agent_start`，导致扩展无法在自定义消息 turn 前做拦截/预处理。此 PR 统一所有 turn 起始路径的事件分发，并支持取消。

> 其他动态：**#8257** 项目已信任时跳过 project-agent 二次确认（CLOSED）、**#8260** 修复模型测试默认值漂移（CLOSED）、**#8242** 示例 notify.ts 改用 `agent_settled`（CLOSED）、**#6216** 新增 Amazon Bedrock Mantle OpenAI Responses provider（OPEN，长期 PR）。

## 功能需求趋势

- **Provider 兼容性与成本优化**：围绕 OpenRouter（reasoning_details、cache_control）、Bedrock（Smithy headers、Mantle provider）、模型目录对齐（小米、Qwen、GLM-4.6V）的改进在 Issues 和 PR 中占比最高，反映多 provider 场景已成为主流用法。
- **多模态内容扩展**：#3200（视频/音频）与 #8220（GLM-4.6V 视觉模型）表明社区正推动 Pi 从文本/图片扩展至视频、音频等多模态输入。
- **上下文管理与压缩策略**：#6879（压缩不触发）、#8229（本地溢出）、#8120（append 压缩）共同指向更智能、更主动的上下文管理方向。
- **TUI 性能与稳健性**：#8029（大文本编辑）、#8028（V8 字符串限制）、#8253（闪烁修复）显示长会话、大输出场景下的渲染性能是持续痛点。
- **配置与安装体验**：#534（XDG）、#7756（安装方法误判）、#7767（skills 子目录）反映开发者对系统集成规范性和可维护性的更高要求。

## 开发者关注点

- **上下文溢出防御缺失**：auto-compaction 不触发是当前最高频的稳定性抱怨——用户在长 agentic run 中没有任何保护，直到 provider 硬性拒绝请求。期待按 agent 步骤（而非事后）的压缩检查。
- **Provider 行为差异带来的隐性成本**：同一模型经不同 provider/API surface 使用时，缓存、推理回放、headers 等行为不一致，可能导致**成本成倍增加**或功能静默丢失（如 #7995、#7994）。
- **扩展 API 可靠性**：#8166（消息注入破坏会话）、#8241（compaction 失败事件缺失）、#8262（hook 分发不完整）表明扩展开发者对事件时序和会话一致性的要求越来越高。
- **极端输入规模下的崩溃**：14.5MB diff、7000 行 prompt、超长 fullRender 输出均能触发崩溃或严重卡顿，提示代码路径中对大缓冲区的边界防护不足。
- **Linux 生态规范诉求**：XDG 目录、SELinux 文档、Konsole 键位等问题虽然单个体量不大，但累积起来影响 Linux 用户的基础体验。

---
*本日报数据来源：[github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)，统计截至 2026-08-17 的社区公开动态。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-18

## 今日速览

v0.21.13 正式版发布并完成 SWE-bench Verified（500 条）与 Terminal-Bench 2.0（89 条）全量端到端验证，质量达标；Web Shell 新增文本文件拖拽/粘贴上传能力，会话 fork 功能也已就绪。社区侧，Windows CLI 粘贴回归、上下文压缩后丢失两大痛点持续发酵，微信通道相关 PR 密集涌现，成为近 24 小时最活跃的贡献方向。

## 版本发布

- **v0.21.13** — 正式版本发布。SWE-bench Verified 1/1 成功、Terminal-Bench 2.0 1/1 成功（多轮 smoke 验证确认）；随后完成全量 SWE-bench Verified 500 条 + Terminal-Bench 2.0 89 条端到端 release 验证，Qwen Code 固定于已发布版本运行，结果全部通过。
- **v0.21.11-nightly.20260817.195128a17a** — 夜间构建。包含 autofix 的 footprint gate 增强与 Web Shell 修复（具体见 PR #9156）。

## 社区热点 Issues

1. **[#9324] 消息被多次投递，打断 Agent 当前工作** — [链接](https://github.com/QwenLM/qwen-code/issues/9324)  
   用户在使用 Qwen Desktop Code + Qwen 3.8 Max 时，Agent 频繁声称收到同一消息的多个副本并因此中断当前工作。涉及核心会话管理，被标记为 category/core，7 条评论，社区高度关注。

2. **[#8316] Ctrl+C 取消 Prompt 后内容不恢复到输入框** — [链接](https://github.com/QwenLM/qwen-code/issues/8316)  
   用户取消 prompt 后，已输入内容丢失，需要重新输入。9 条评论，属于基础交互体验问题，影响面广。

3. **[#9061] Windows CLI Ctrl+V 粘贴完全失效（0.21.x 回归）** — [链接](https://github.com/QwenLM/qwen-code/issues/9061)  
   0.21.0 正常，0.21.0 到 0.21.11 之间某版本引入回归，P1 优先级。Windows 用户受影响严重，是当前最高频的 CLI 反馈。

4. **[#9320] /compress-fast 与 /rewind 后上下文丢失** — [链接](https://github.com/QwenLM/qwen-code/issues/9320)  
   用户将 102k 上下文压缩至 87k 后启动新 llama-server 恢复会话，发现上下文丢失。直接影响长会话工作流，5 条评论。

5. **[#9309] 压缩在某些场景下 token 计算不正确** — [链接](https://github.com/QwenLM/qwen-code/issues/9309)  
   一次 /compress-fast + 一次 /compress 后上下文从 170k 压缩至异常值，数据疑似有误。与 #9320 同属压缩机制问题，社区多人在不同场景下汇报。

6. **[#9296] Qwen Autofix review 事件风暴与重复分发浪费 runner 容量** — [链接](https://github.com/QwenLM/qwen-code/issues/9296)  
   Autofix 流水线存在 59% 取消率（294/500），已关闭/合并的 PR 仍触发 autofix、同一地址重复分发等问题，属于 CI/CD 基础设施效率瓶颈。

7. **[#6806] 状态栏 context 使用百分比在 /compress 后不刷新** — [链接](https://github.com/QwenLM/qwen-code/issues/6806)  
   压缩后状态栏仍显示压缩前的上下文占用，直到下一次模型请求才更新。虽是显示问题，但影响用户对压缩效果的判断。

8. **[#8051] 多工作区 daemon 资源使用无边界** — [链接](https://github.com/QwenLM/qwen-code/issues/8051)  
   仅限制工作区/会话数量不足以约束请求体、WebSocket 等实际字节占用，需要跟踪并交付有界资源控制。9 条评论，属 serve 模式长期演进方向。

9. **[#9300] VP 模式内容未底对齐，末条消息与 composer 间出现空白** — [链接](https://github.com/QwenLM/qwen-code/issues/9300)  
   useTerminalBuffer 默认模式下渲染布局问题。UI 细节但视觉影响明显，6 条评论。评论区已有复现方案。

10. **[#9250] qwen serve 新文件固定 0600 权限，无视 umask** — [链接](https://github.com/QwenLM/qwen-code/issues/9250)  
    ACP 宿主 writeTextFile 系列工具创建新文件时硬编码 0600，忽略 umask，且无配置项。与 #9364 PR 直接关联，服务端多用户场景的关键权限问题。

## 重要 PR 进展

1. **[#9221] verifier 探针移至私有 scratch worktree 运行** — [链接](https://github.com/QwenLM/qwen-code/pull/9221)  
   review 流水线中唯一的写操作 agent（verifier）不再与其他 agent 共享工作目录，隔离探针写入、运行与恢复，消除交叉污染风险。

2. **[#9342] 清理 #9175 十五轮 review 累积的 deferred-suggestion 积压** — [链接](https://github.com/QwenLM/qwen-code/pull/9342)  
   一次清理 19 项非 Critical 建议，约一半为行为修复（安全塑形 API、共享内存等），另一半为测试收紧。

3. **[#9303] 限制 daemon 会话历史保留量，修复 renderer OOM** — [链接](https://github.com/QwenLM/qwen-code/pull/9303)  
   Web Shell 原始回放快照注入后立即释放，回放重建与实时增长共用同一 block cap，从机制上解决浏览器 OOM。

4. **[#9295] 过滤模型端点无法安全消费的图片媒体** — [链接](https://github.com/QwenLM/qwen-code/pull/9295)  
   对 image/heic、image/tiff 等模型不支持的 MIME 类型或无法解码的字节，不再原样作为 data URI 转发，避免请求校验失败与推理异常。

5. **[#9358] 微信通道：长时任务保持 typing 指示器活跃** — [链接](https://github.com/QwenLM/qwen-code/pull/9358)  
   原有 TYPING 一次性发送很快过期，现改为每 4 秒重新发送，直到 turn 结束发送 CANCEL。对应 issue #9353。

6. **[#9364] 新增 QWEN_SERVE_NEW_FILE_MODE 配置，放开 0600 硬编码** — [链接](https://github.com/QwenLM/qwen-code/pull/9364)  
   新增 NewFileModePolicy（owner/system 两种策略），使 qwen serve 文本写入可按 umask 派生标准文件权限，回应 #9250。

7. **[#9367] 导出 HTML 查看器增加全局展开/折叠控制** — [链接](https://github.com/QwenLM/qwen-code/pull/9367)  
   ChatViewer 组件新增 Expand all / Collapse all 工具栏，/export HTML 模板启用。推进 issue #8208 的导出体验改进。

8. **[#9327] 简化 review checkout 自愈逻辑为 wipe-and-retry** — [链接](https://github.com/QwenLM/qwen-code/pull/9327)  
   将 #9220 引入的约 60 行路径防护精简回核心的 wipe-and-retry 机制，降低 CI 复杂度与维护成本。

9. **[#9184] 增量 review 的 recovered anchor 必须受模型认证约束** — [链接](https://github.com/QwenLM/qwen-code/pull/9184)  
   "clean up to this commit" 是同模型契约，不同模型须重新完整审查。修复跨模型复用缓存的正确性问题。

10. **[#9202] 未识别诊断事件路由到有界 sidechannel** — [链接](https://github.com/QwenLM/qwen-code/pull/9202)  
    不再将 unrecognized_event / unrecognized_session_update 作为 debug block 追加到 blocks[]，改为上限 50 条的独立 sidechannel，避免污染正式转写内容。

## 功能需求趋势

- **服务端 serve / daemon 治理深化**：#8051（资源有界）、#8091（拆分小 PR 落地）、#9250（文件权限）、#9364（权限配置）、#9158（Local Control 接口）等多条 issue/PR 指向 qwen serve 正从可用走向生产级治理，侧重点在资源控制、权限可配置、接口一致性。
- **上下文压缩与长会话管理是用户最强痛点**：#6806、#9309、#9320、#9344 等 4 条 issue 集中在压缩正确性、状态刷新、压缩后恢复，且全是用户实操作反馈，高频且急迫。
- **微信（Weixin）通道成为集成开发热门方向**：#9307（64 位 message_id）、#9352（文件发送）、#9353（typing 续期）、#9358（对应修复），从 bug 到 feature 均有覆盖，说明外部渠道集成已进入活跃期。
- **Web Shell 统一与导出能力持续演进**：#5883（chat panel 统一到 web-shell）、#8208（HTML 导出展示 thinking）、#9354（跨主机转写契约）、#9367（展开/折叠控制），方向是从"能导出"走向"导出得完整、可读、跨端一致"。
- **模型/提供商动态化**：新增 #9368 要求 ModelStudio Token/Coding Plan 的推荐模型列表动态获取，而非硬编码，反映提供商接入层需要适配账户级差异化。

## 开发者关注点

- **Windows 平台回归问题集中**：#9061（Ctrl+V 粘贴失效）在 0.21.x 区间回归，用户明确表达降级到 0.21.0 恢复；#9324（消息重复投递）疑似与 Windows 桌面端相关。Windows 用户基础大，修复优先级应提高。
- **压缩机制不透明造成信任危机**：多个用户在 /compress 后遭遇上下文异常（#9309 170k 压到异常值、#9320 压缩后会话丢失），且状态栏不刷新（#6806）加剧了不确定性。压缩前后应提供可验证的明细，而不仅是 token 数字变化。
- **新版交互方式改动引发不满**：#9315 用户反馈 v0.21.13 无法复制选中字段，直指"抛弃原有终端交互、自己实现更难用了"。UI 变更需要更平滑的过渡与兼容性处理。
- **自动化基础设施成本问题受关注**：#9296 揭示 autofix/review 流水线 59% 取消率，造成 runner 资源大量浪费。社区对 CI 自动化的"智能"与"可控"之间的平衡提出了更高要求。
- **安全边界（权限、路径、媒体类型）成为高频审查项**：hook 信任边界（#8396）、daemon 权限（#9250）、媒体类型过滤（#9295）、review worktree 隔离（#9221）——安全加固已从单点修复走向系统性收口，这与社区对生产可用的期待一致。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

## 今日速览
- v0.9.9 发布 PR 合并（#5476），该版本以“真实性与韧性”为主题，重点修复 shell 工具卡死、未验证上下文/定价标注不实等问题。
- 模型定价与目录完成大范围校准（#5485、#5470），DeepSeek V4 系列改为分时峰谷计价，并同步 2026-08-17 官方价格数据。
- 社区 Issue 焦点仍在稳定性：大文本处理会话卡死、配置路径跨平台迁移 bug、测试 flaky 等话题讨论热度最高。

## 社区热点 Issues
1. [Issue #2369](https://github.com/Hmbown/CodeWhale/issues/2369)（打开，8评论）：CodeWhale 配置路径在 Windows/Cygwin 间碎片化，且存在静默迁移 bug。跨平台路径不一致直接影响 Windows 用户，迁移逻辑不透明也被质疑。
2. [Issue #5056](https://github.com/Hmbown/CodeWhale/issues/5056)（打开，8评论）：verifier 后台测试 flaky、/workspace 敏感 fixtures、12 个未分诊 #[ignore] 测试。CI 反复飘红正在消耗维护者和贡献者的信任。
3. [Issue #5324](https://github.com/Hmbown/CodeWhale/issues/5324)（已关闭，8评论）：agent 工具携带 32 字段 JSON Schema 且无必填项，模型经常报错。这是模型工具调用设计上的典型痛点：字段过多、指令歧义。
4. [Issue #5424](https://github.com/Hmbown/CodeWhale/issues/5424)（已关闭，7评论）：v0.9.7 中 Codewhale TUI 在等待输出约一分钟后自行退出。属于高影响崩溃，复现路径简单，社区关注度高。
5. [Issue #1425](https://github.com/Hmbown/CodeWhale/issues/1425)（打开，7评论）：用 TUI 分析 300 万字小说时，10 个子 agent 全部 Running，但 agent_wait 超时导致会话卡死。中文社区反馈的长任务与子代理可靠性问题。
6. [Issue #5123](https://github.com/Hmbown/CodeWhale/issues/5123)（打开，7评论）：Agent spawn 表面参数过多，且 labeled builder 被设计成只读并自我 BLOCKED。社区认为这是 dogfood 暴露的设计失衡。
7. [Issue #1651](https://github.com/Hmbown/CodeWhale/issues/1651)（打开，6评论）：YOLO Agent 在后台执行测试脚本时 VS Code 崩溃或意外退出。IDE 集成稳定性仍然是高频关注点。
8. [Issue #1829](https://github.com/Hmbown/CodeWhale/issues/1829)（打开，6评论）：SSH 连接失败 exit 255，疑似 TUI shell 沙箱阻断 TCP 22 出站。影响依赖 SSH 工作流的用户。
9. [Issue #5374](https://github.com/Hmbown/CodeWhale/issues/5374)（打开，5评论）：macOS 上 agent 书写时文本全部乱码，无法阅读。UI 渲染异常虽是个案，但会直接阻断交互。
10. [Issue #5337](https://github.com/Hmbown/CodeWhale/issues/5337)（打开，4评论）：Web 端需要完成 #4934 的字典 spine，移除所有 `isZh` 分支，内联 `{ en, zh }` 模块。国际化架构升级的需求仍在推进。

## 重要 PR 进展
1. [PR #5476](https://github.com/Hmbown/CodeWhale/pull/5476)（已合并）：release: 0.9.9，主题为“truth-and-resilience”，包含 shell 工具防卡死、诚实标注未验证上下文窗口/输出上限/遥测默认值等。
2. [PR #5465](https://github.com/Hmbown/CodeWhale/pull/5465)（已合并）：exec stream 创建必须软失败，绝不让 shell 工具卡死会话。修复因磁盘/描述符耗尽导致所有 bash 调用失败的问题。
3. [PR #5470](https://github.com/Hmbown/CodeWhale/pull/5470)（已合并）：DeepSeek V4 分时峰谷定价改写，按每个 turn 的 UTC 时刻动态解析价格，替代原先单一固定费率。
4. [PR #5485](https://github.com/Hmbown/CodeWhale/pull/5485)（已合并）：模型目录与价格数据重新校准至 2026-08-17 官方页面，包含 xAI tier 的 LongContext 价格修正。
5. [PR #5474](https://github.com/Hmbown/CodeWhale/pull/5474)（已合并）：上下文压缩策略扩展至所有 noisy web 工具（Web/web_search/web.run/fetch_url），保留 read_file 等工具的硬限制，减少上下文污染。
6. [PR #5475](https://github.com/Hmbown/CodeWhale/pull/5475)（已合并）：安全解析自有直接模型的大小写映射，避免 `glm-5.2` 这类小写选择器被错误归类为外部供应商。
7. [PR #5402](https://github.com/Hmbown/CodeWhale/pull/5402)（已合并）：当 live pricing 无法验证时恢复会话成本显示，不再永远卡在 `unverified_live_pricing`。
8. [PR #5491](https://github.com/Hmbown/CodeWhale/pull/5491)（打开）：将审批请求与终态结果持久化到 session 日志，持久化失败则拒绝执行，恢复时重建审批状态，关闭 #5360。
9. [PR #5488](https://github.com/Hmbown/CodeWhale/pull/5488)（打开）：docs layout 的五个字符串从 `isZh` 三元表达式迁移到字典 spine，为八种部分本地化语言提供翻译入口。
10. [PR #5484](https://github.com/Hmbown/CodeWhale/pull/5484)（已合并）：为 DSH 增加海洋场景动画（鲸鱼剪影、glyph 鱼群），提升产品视觉体验。

## 功能需求趋势
- **本地化/国际化加速**：多个 PR 将 Web 端和文档迁移到统一字典 spine（#5337、#5488、#5490）；文档全中文 EPIC（#5482）也已提出。
- **会话可靠性与恢复**：审批结果持久化（#5360/#5491）、exec 软失败（#5465）表明开发者希望关键操作可恢复、可审计。
- **模型成本透明化**：分时定价（#5470）和模型目录校准（#5485）是对成本显示不准确的直接回应。
- **配置简化与模板化**：第三方模型配置需要预制模板（#5350），配置路径跨平台统一（#2369）被反复提及。
- **子代理与并行任务治理**：大文本处理中 agent_wait 超时（#1425）、Agent spawn 参数过多（#5123）指向更强的任务编排与状态监控需求。

## 开发者关注点
- **稳定性压倒一切**：TUI 崩溃（#5424）、会话卡死（#1425）、VS Code 崩溃（#1651）直接影响日常使用；CI flaky（#5056、#5355、#5403）持续消耗信任。
- **跨平台/环境差异**：Windows/Cygwin 路径碎片化（#2369）、macOS 渲染异常（#5374）、SSH 沙箱限制（#1829）是不同平台用户的“最后一公里”。
- **大模型上下文与工具设计错位**：模型声称 1M 上下文但工具在 128K 触发压缩（#5239）；agent 工具 32 字段 schema 让模型困惑（#5324）。工具设计需要跟随模型能力同步演进。
- **成本与配额管理**：价格接口 503 / `unverified_live_pricing`（#5241）、定价硬编码（#5055）损伤用户对成本数据的信任。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*