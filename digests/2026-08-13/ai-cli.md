# AI CLI 工具社区动态日报 2026-08-13

> 生成时间: 2026-08-13 01:04 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-13）

> 数据来源：各工具 GitHub 仓库公开动态，覆盖 2026-08-12 ~ 2026-08-13。

---

## 1. 生态全景

当前 AI CLI 工具正处于「高频发布 + 集中暴露稳定性问题」的快速迭代期：几乎所有主流工具在过去 24 小时均有版本更新或预发布，但社区反馈高度集中于 Windows 桌面端崩溃、多代理协调挂起、会话恢复丢失、MCP 安全边界等基础质量问题。竞争格局已从"单点对话能力"转向「代理编排、跨会话记忆、MCP 生态、成本可视化」的综合平台能力比拼。值得注意的是，除头部厂商（Anthropic/OpenAI/Google/GitHub）外，OpenCode、Pi、Qwen Code、CodeWhale 等开源/中国厂商工具正在以差异化的模型接入和本地化策略快速抢占开发者心智。

---

## 2. 各工具活跃度对比

| 工具 | 版本发布 | 活跃 Issues 数* | 活跃 PR 数* | 社区热度峰值 |
|---|---|---|---|---|
| Claude Code | v2.1.229（正式版）| 10+（精选 10 个）| 5（3 合并）| 498 👍（Linux 桌面版诉求）; 80 评论（CVP 认证拦截）|
| OpenAI Codex | rust-v0.148.0-alpha.9（预发布）| 10+（精选 10 个）| 10 | 194 👍 / 70 评论（60 秒自动解析）|
| Gemini CLI | v0.56.0-nightly | 10+（精选 10 个）| 10 | 12 评论（子代理误报 GOAL 成功）|
| GitHub Copilot CLI | 无 | 10+（精选 10 个）| 3（仅 1 实质）| 35 👍（CIMD for MCP OAuth）|
| Kimi Code CLI | 无 | 1 | 2 | 36 评论（跨会话记忆系统）|
| OpenCode | v1.18.17（正式版）| 10+（精选 12 个）| 10 | 40 评论（Zen 配额判定异常）|
| Pi（earendil-works）| 无（多个 PR 推进中）| 11 | ~15 | 17 👍 / 18 评论（自动压缩失灵）|
| Qwen Code | desktop-v0.2.1 / v0.2.0 | 10+（精选 10 个）| 10 | 9 评论（长任务卡死）|
| DeepSeek TUI（CodeWhale）| v0.9.6（正式版更名）| 10+（精选 10 个）| 10 | 9 评论（"Constitution"翻译之争）|
| Grok Build | 无 | 0 | 0 | —（无活动）|

*注：活跃 Issue/PR 数为日报中精选跟踪数量，实际总量大于此数。热度峰值为日报所载最热条目数据。

---

## 3. 共同关注的功能方向

### 3.1 Windows 桌面端稳定性（最广泛的痛点）
- **Claude Code**：GPU 进程崩溃拖垮全部会话（#81698）、需反复使用"修复"（#85199）、MSIX 自修复失败（#85905）——"三连击"。
- **OpenAI Codex**：Computer Use 截图失败（#25178）、Setup 卡死无法进入（#33967）、断电后本地状态回退（#26990）。
- **Copilot CLI**：WSL2 下 Ctrl+H 被误判（#4328）、Windows socket 偶发失败（#4463）。
- **Qwen Code**：tmux 环境下闪屏（#8562）。

### 3.2 多代理协调与自动化可靠性
- **Claude Code**：单次过夜运行暴露 12 个多代理协调 Bug（#54393）。
- **Gemini CLI**：通用代理无限挂起（#21409）、子代理 MAX_TURNS 误报GOAL成功（#22323）。
- **Qwen Code**：后台并行子代理出现重复工作/提前完成（#8097）。
- **OpenCode**：子代理继承 deny 规则修复（#42174）。

### 3.3 跨会话记忆与上下文持久化
- **Kimi Code**：#1283 记忆系统（36 评论）——AI 笔记 + 用户指令双轨。
- **Gemini CLI**：Auto Memory 无限重试（#26522）、确定性脱敏（#26525）。
- **Claude Code**：Remote Control 会话恢复（v2.1.229）。
- **Pi**：自动压缩触发机制失灵（#6879，17 👍）。
- **Qwen Code**：大 restore 超时保护（#8678）、MAX_TOKENS 恢复后 transcript 不一致（#8979）。

### 3.4 MCP 生态治理
- **Copilot CLI**：远程 OAuth 需 CIMD（#1305，35👍）、5xx 瞬间判死（#4466）。
- **Gemini CLI**：配置损坏 fail-open 安全漏洞（#28787/#28794）。
- **OpenCode**：工具已连接但未暴露给 agent（#33027）。
- **Claude Code**：自托管 Runner Hook 支持补齐。

### 3.5 模型选择与配置覆盖
- **Copilot CLI**：子代理 model 参数覆盖用户策略（#4432）、组织启用模型不显示（#4390）。
- **Gemini CLI**：错误模型容量耗尽误判（v0.56.0 修复）。
- **OpenCode**：Gemini 3 Pro 函数调用缺 thoughtSignature（#4832，14👍）。
- **Pi**：DeepSeek 静默忽略 max_completion_tokens（#8018）。

### 3.6 成本透明度与控制
- **OpenAI Codex**：线程级信用/美元用量展示（PR #38281/#38282）。
- **OpenCode**：每会话预算上限（PR #42202）。
- **Claude Code**：`git status` 变化触发全量 prompt cache 重建，推高成本（#78720）。

### 3.7 配置系统一致性
- **Qwen Code**：`--approval-mode` 已注册但不显示在 `--help`（#8897）；`truncateToolOutputThreshold` 配置不生效（#8922）。
- **Pi**：DeepSeek provider 发送文档中不存在的参数（#8018）。
- **Claude Code**：`/plugin update` 不使缓存失效（#14061，31👍）。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线亮点 | 典型短板 |
|---|---|---|---|---|
| **Claude Code** | Anthropic 官方企业级代理 | 企业团队、深度 Agent 用户 | Remote Control 远程控制、自托管 Runner、MCP/插件生态最完整 | Windows 桌面版质量拖后腿；多代理边界不稳定 |
| **OpenAI Codex** | OpenAI 官方 CLI，Rust 核心 | 企业 Pro/团队，深度 IDE 用户 | gRPC code-mode 会话、线程级用量 API、凭据 broker 隔离 | IDE Context 多环境失效；Windows Computer Use 不成熟 |
| **Gemini CLI** | Google 官方多模型 CLI | 多模型用户，GCP 开发者 | 行为评估体系（76 个测试）、子代理可递归调用（PR #28738）| 代理编排层挂起频发；Auto Memory 可靠性不足 |
| **Copilot CLI** | GitHub 生态深度整合 | GitHub 重度用户、企业 Copilot 订阅者 | ACP 协议、DCR/OAuth、与企业组织策略深度绑定 | MCP 生产级使用障碍；模型目录同步断点 |
| **Kimi Code CLI** | 轻量极简，中文友好 | 中国开发者、Moonshot 用户 | Web runner、零配置 | 功能最简；社区规模小；记忆系统尚在设计阶段 |
| **OpenCode** | 开源免费 TUI + Zen 订阅 | 预算敏感、偏好开源的自助开发者 | 快速迭代、Mermaid 渲染、预算控制、子代理 deny 继承 | 计费系统信任危机；重试风暴 |
| **Pi** | 开源多 Provider TUI | Provider 多元化、本地模型玩家 | 组件化 TUI 架构（鼠标事件）、Ollama/llama.cpp 本地代理、扩展 API | 上下文压缩失灵；CPU 占用高；新增 provider 适配坑多 |
| **Qwen Code** | 阿里云/开源模型官方 CLI | 中文开发者、阿里云用户、GCP 用户 | Desktop/Web Shell、多通道 sessionRotation、SDK 对齐 | 长任务自动化不可靠；版本回归频发 |
| **CodeWhale（DeepSeek TUI）** | DeepSeek 生态 CLI，更名重构中 | 中国开发者，多网关用户 | 更名重定位、大型 TUI crate 分解、OrcaRouter 聚合网关 | 发布质量门禁不足；工具调用"假成功"；社区规模小 |

---

## 5. 社区热度与成熟度

### 第一梯队：用户规模大、生态丰富、讨论深度高
- **Claude Code**：Linux 桌面版诉求获 498 👍 全生态最高；CVP 认证问题 80 条评论；议题质量高（涉及安全合规、多代理架构）。
- **OpenAI Codex**：60 秒自动解析问题 194 👍 / 70 评论，用户对"自动化失控"的不满集中爆发；PR 合并效率高（10 个活跃 PR 覆盖基础设施）。
- **Copilot CLI**：35 👍 的 CIMD 请求，虽绝对数值不高，但企业用户反馈密集；MCP 可靠性议题集中。

### 第二梯队：技术社区驱动、迭代速度快、Open Source 活跃
- **OpenCode**：Zen 配额问题 40 条评论成为当日热点，但更多是计费策略争议而非功能缺陷；PR 高速合入。
- **Pi**：18 条评论/17 👍 的上下文压缩问题有一定代表性；PR 数量最多（~15 个），多 provider 适配积极性高。
- **Gemini CLI**：官方工程化投入显著（评估体系、安全修复），但社区讨论量偏低（最高 12 评论），活跃度主要靠官方驱动。
- **Qwen Code**：50 Issue / 50 PR 的活跃度不低，但单议题讨论深度较浅（最高 9 条评论），用户诉求更偏实用主义（"长任务能跑完"）。

### 第三梯队：早期阶段或进入重构期
- **Kimi Code CLI**：仅 1 个 Issue 活跃，记忆系统讨论 36 条是"长尾热度"——功能诉求集中，但整体生态尚未形成。
- **CodeWhale（DeepSeek TUI）**：处于更名重构的关键期，社区讨论涉及定位、翻译争议，架构级重构（EPIC-005）与功能迭代并行，尚不稳定。
- **Grok Build**：无任何活动，需观察是否进入维护冷却期。

---

## 6. 值得关注的趋势信号

### ① Windows 桌面版成为全行业质量洼地
Claude Code、OpenAI Codex、Copilot 三家同时遭遇 Windows 端崩溃/兼容问题，这是 **GPU 进程隔离、WSL2 键位透传、MSIX 自修复** 等系统级集成能力的集体欠账。对开发者：短期内 Windows 用户应关注各工具官方 issue 跟踪状态，避免在关键路径上依赖桌面端。

### ② "假成功"比报错更破坏信任
- CodeWhale File 工具错误参数返回 "Replaced successfully"（#5209）
- Gemini 子代理 MAX_TURNS 被误报为 GOAL 成功（#22323）
- Qwen Code 长任务卡死无反馈（#8963）

这类静默失败直接瓦解开发者对 Agent 的信任。**工具调用结果验证（真实文件变更校验、状态机终态校验）将成为下一代 CLI 的关键壁垒。**

### ③ 多代理从 Demo 走向生产，但编排层严重不成熟
12 个跨会话竞态 Bug（Claude）、无限挂起（Gemini）、重复工作（Qwen）、消息竞争（多工具）——多代理的真正瓶颈不在模型能力，而在**会话路由、状态同步、生命周期管理的工程化**。Gemini 的"代理调用代理"（PR #28738）是行业首个开放该能力的信号，值得跟踪。

### ④ MCP 生态进入"治理时代"
连接已不再是问题（所有工具都支持），OAuth 标准化（CIMD）、fail-open 安全修复、5xx 重试策略、stdio 容器生命周期管理成为新焦点。**MCP 目录将取代 MCP 连接器成为竞争高地。**

### ⑤ 成本可观测性成为企业采纳前提
OpenAI Codex 的线程级用量 API、OpenCode 的会话预算上限、Claude Code 的 prompt cache 成本抱怨——三者指向同一需求：**开发者希望看到每个 Agent 会话的精确美元成本，并设置硬上限**。

### ⑥ 本地/开源模型已从"玩家玩具"变为"战略选项"
Pi 的 Ollama 代理、CodeWhale 的 OrcaRouter（150+ 模型）、OpenCode 的 Zen 免费层、Qwen 的阿里云与 Vertex 双云支持——**模型可替换性和数据留存控制权正在成为差异化卖点**，尤其是在欧洲和中国市场。

### ⑦ 跨会话记忆是下一个必争之地
Kimi 的 Memory System（36 评论热议）、Gemini 的 Auto Memory、Claude 的 Remote Control 恢复——**"CLI 越用越懂你"** 从功能请求升级为平台能力的核心组成。但脱敏问题（Gemini #26525）和无限重试（#26522）表明，记忆的安全性和可靠性仍未解决。

### ⑧ 配置一致性是最朴素也最高频的"开发体验债"
`--help` 不显示已注册参数（Qwen）、文档声明生效但实际不生效（Qwen/Pi）、hook 不触发（Copilot）、插件缓存不刷新（Claude）——**文档、schema、运行时三者对齐** 将是成熟度评估的硬指标。

---

*报告基于 2026-08-13 各工具 GitHub 公开数据整理，仅代表当日快照，不构成投资或选型建议。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills | 统计截止：2026-08-13

---

## 一、热门 Skills 排行

以下按讨论活跃度排序，均处于 **Open** 状态（仓库内暂无 merged PR 记录）。

**1. skill-creator 评估流程修复（#1298）**
- 功能：修复 `run_eval.py` 恒定报告 `recall=0%` 的核心 bug，使描述优化循环不再"对着噪声调参"。
- 讨论热点：这是社区公认的 skill-creator 最大痛点（Issue #556 有 10+ 独立复现），PR 同时覆盖 Windows 流读取、触发检测与并行 worker 问题。
- 链接：https://github.com/anthropics/skills/pull/1298

**2. document-typography（#514）**
- 功能：AI 生成文档的排版质量控制——孤词换行、寡行段落、编号错位等。
- 讨论热点：将"极少被用户主动要求但影响所有生成文档"的排版问题固化为 Skill，指向了文档类技能的下一个细分方向。
- 链接：https://github.com/anthropics/skills/pull/514

**3. self-audit 技能（#1367）**
- 功能：交付前审计——先做机械性文件存在性校验，再按损害严重度执行四维推理质量门。
- 讨论热点：宣称"任何项目、技术栈、模型通用"，与作者另一提案 Issue #1385（三级质量门流水线）形成体系化构想。
- 链接：https://github.com/anthropics/skills/pull/1367

**4. ODT 文档技能（#486）**
- 功能：OpenDocument（.odt/.ods）的创建、模板填充、读取与转 HTML。
- 讨论热点：补齐官方文档技能矩阵中除 docx/pdf 外的开放格式空白，触发词覆盖 LibreOffice 等常见场景。
- 链接：https://github.com/anthropics/skills/pull/486

**5. skill-quality-analyzer / skill-security-analyzer（#83）**
- 功能：一对"元技能"——前者从结构、文档、示例等五维评估技能质量，后者做安全分析。
- 讨论热点：直接回应社区对技能质量与安全性的信任焦虑，与最热 Issue #492（命名空间信任边界）形成呼应。
- 链接：https://github.com/anthropics/skills/pull/83

**6. testing-patterns（#723）**
- 功能：全栈测试模式覆盖——Testing Trophy 理念、单元测试 AAA 模式、React 组件测试（Testing Library）等。
- 讨论热点：解决"测什么 vs 不测什么"的取舍，是目前呼声最高的工程化技能方向。
- 链接：https://github.com/anthropics/skills/pull/723

**7. ServiceNow 平台技能（#568）**
- 功能：横跨 ITSM、ITOM、ITAM/SAM、FSM、HRSD、SPM、CSDM 与 IntegrationHub 的 ServiceNow 平台助手。
- 讨论热点：企业平台级 Skill 的代表作；最后更新于 08-12，是当前维护最活跃的 PR 之一。
- 链接：https://github.com/anthropics/skills/pull/568

**8. pyxel 复古游戏开发（#525）**
- 功能：为 pyxel-mcp 设计的技能，覆盖 write → run_and_capture → inspect → iterate 游戏开发工作流。
- 讨论热点：由 Pyxel 引擎作者 kitao 提交，是"官方引擎 + MCP + Skill"三方结合的最佳实践样本。
- 链接：https://github.com/anthropics/skills/pull/525

---

## 二、社区需求趋势

从 Issues 讨论热度提炼出五个明确方向：

**1. 安全与信任边界（最热，43 评论）**
- Issue #492：社区技能在 `anthropic/` 命名空间下分发，形同官方背书，构成权限信任边界漏洞。
- 链接：https://github.com/anthropics/skills/issues/492

**2. 组织级技能共享与管理**
- Issue #228（16 评论）：要求 Claude.ai 内直接组织级共享技能库，而非手工分发 .skill 文件。
- 链接：https://github.com/anthropics/skills/issues/228

**3. 技能工具链稳定性**
- Issue #556（12 评论）与 #1169：run_eval 永恒 0% 触发率，技能描述优化循环失效。
- Issue #202：skill-creator 读起来像"开发者文档"而非"操作指令"，需按最佳实践重写。
- 链接：https://github.com/anthropics/skills/issues/556 | https://github.com/anthropics/skills/issues/202

**4. 上下文窗口效率**
- Issue #1487：claude-api 技能单次注入约 156k tokens，直接撑爆上下文。
- Issue #12：docx 技能因空白字符重排导致文档损坏。
- 链接：https://github.com/anthropics/skills/issues/1487 | https://github.com/anthropics/skills/issues/12

**5. 新技能方向提案**
- compact-memory（#1329）：符号化压缩长期记忆的代理状态。
- agent-governance（#412）：AI 代理系统的策略执行、威胁检测与审计轨迹。
- Skills 暴露为 MCP（#16）、Bedrock 兼容（#29）等平台互操作诉求。
- 链接：https://github.com/anthropics/skills/issues/1329 | https://github.com/anthropics/skills/issues/412

---

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、持续更新且直击痛点，近期落地概率较高：

| PR | 技能 | 理由 |
|---|---|---|
| #568 | ServiceNow | 08-12 仍在更新，维护最活跃 |
| #1538 | 修复两个技能回退到 Agent Skills 规范 | 针对本仓库自身规范的合规修复，08-09 提交即受关注 |
| #1479 | plan-file-hygiene | 回应 #1417 规划产物生命周期缺口，有社区协作基础 |
| #1367 | self-audit | 与 #1385 提案联动，体系化设计完整 |
| #525 | pyxel | 引擎官方作者背书，天然权威 |
| #1298 | skill-creator eval 修复 | 社区呼声最高的 bug 修复，多 Issue 关联 |

链接：https://github.com/anthropics/skills/pull/568 | https://github.com/anthropics/skills/pull/1538 | https://github.com/anthropics/skills/pull/1479 | https://github.com/anthropics/skills/pull/1367 | https://github.com/anthropics/skills/pull/525 | https://github.com/anthropics/skills/pull/1298

---

## 四、Skills 生态洞察

**社区最集中的诉求是技能生态的"工业化"——从工具链可靠性（eval 失灵、Windows 兼容）、安全信任边界、到上下文窗口效率等基础设施问题亟待官方解决；同时新技能供给正从创作/文档类向"元技能"（质量审计、自检、治理）与企业级平台（ServiceNow）延伸，标志着 Skills 生态从"能用"走向"可信、可管、可衡量"。**

---

# Claude Code 社区动态日报 — 2026-08-13

## 今日速览

- 发布 v2.1.229 补丁版本，重点完善 Remote Control 会话恢复、自托管运行器 Hook 支持及网关流式响应的 SSE 保活机制。
- 社区最热议题集中在两大方向：一是 Windows 桌面版 GPU 崩溃等稳定性问题集中爆发，二是多代理（Multi-agent）协调与会话状态管理相关缺陷引发深度讨论。
- 高呼声的 Linux 官方桌面版功能请求（#65697）虽已关闭，但 498 个 👍 仍使其位居社区需求榜首。

---

## 版本发布

**v2.1.229** 主要变更：

- **远程控制增强**：新增 `claude remote-control --continue` 命令，可恢复最近的 Remote Control 会话。
- **Hook 支持扩展**：为自托管 Runner 会话添加服务端提供的 Claude Code Hook 支持，与托管环境行为保持一致。
- **流式传输优化**：网关流式响应新增 SSE keepalive ping，降低长连接中断风险。

---

## 社区热点 Issues

### 1. CVP 认证组织仍被网络保护拦截
- **#84352** — 评论 80 | 👍 12 | 开放中
- 已获 Cyber Verification Program 认证的 Claude.ai 组织在 Claude Code 中仍会收到 cyber-safeguard 拦截，且验证门户将此前已批准的申请重新显示为 "Under review"。
- **社区反应**：讨论热度最高（80 条评论），企业用户对认证状态回退和拦截逻辑不一致表达了强烈不满。

### 2. 官方 Linux 桌面版需求（已关闭但呼声极高）
- **#65697** — 评论 52 | 👍 498 | 已关闭
- 用户请求为 Ubuntu LTS / Debian 提供官方 Claude Desktop 构建。
- **社区反应**：498 个 👍 是当前所有 Issues 中最高，虽被关闭，但 Linux 用户对桌面版的需求依然明确。

### 3. 单个自主过夜周期暴露 12 个多代理协调 Bug
- **#54393** — 评论 27 | 开放中
- 用户对一次自主过夜运行进行了复盘，汇总了 12 个多代理协调相关缺陷（会话间消息竞争、状态同步等），并强调该清单对任何多代理项目具备普适性。
- **社区反应**：引发对多代理自动化稳定性边界的严肃讨论，评论量达 27 条。

### 4. Windows 桌面版 GPU 进程崩溃拖垮整个应用
- **#81698** — 评论 25 | 开放中
- 环境：Claude 桌面应用 1.24012.9（MSIX）、Claude Code 2.1.219、Node 24.18.0、Windows 11、NVIDIA RTX 5080。GPU 进程崩溃（exit code 101457950）导致所有会话全部终止。
- **社区反应**：至少 25 条评论，Windows 用户普遍反映崩溃可复现且影响严重。

### 5. /plugin update 不使插件缓存失效
- **#14061** — 评论 25 | 👍 31 | 开放中
- 执行 `/plugin update` 后，插件缓存未失效，新版本代码未被加载，用户被迫手动清除缓存。
- **社区反应**：31 个 👍 表明该问题影响了大量插件使用者，是插件生态的典型效率杀手。

### 6. 左箭头误触导航至 Agents 屏幕且无法重新绑定
- **#75899** — 评论 14 | 👍 19 | 开放中
- 在聊天输入框（空输入、手动模式）按左箭头会跳转到 Agents/后台任务视图，且该快捷键不可重新绑定；返回后主会话视图被破坏。
- **社区反应**：19 个 👍，键盘驱动用户对 TUI 快捷键不可配置表达了明确不满。

### 7. Windows 桌面版反复崩溃，需频繁执行"高级选项 → 修复"
- **#85199** — 评论 13 | 开放中
- 用户报告 Claude Desktop 在 Windows 上频繁崩溃，必须反复通过"Advanced Options → Repair"恢复。
- **社区反应**：与 #81698、#85905 共同构成 Windows 桌面稳定性的"三连击"投诉。

### 8. Worktree 会话错误复用旧目录
- **#79366** — 评论 11 | 👍 7 | 开放中
- 在 macOS 上开启 worktree isolation 后，新会话会错误地放入之前会话创建的旧 worktree 目录，而非创建全新目录。
- **社区反应**：隔离机制与预期行为不符，用户担心多任务间的上下文串扰。

### 9. Claude Opus 5 出现此前版本没有的幻觉回复
- **#82326** — 评论 9 | 开放中
- 用户报告 Opus 5 在某些情况下会凭空生成回答，而 Opus 4.8 没有此问题。
- **社区反应**：虽评论不多，但涉及模型核心质量，属高影响建模问题。

### 10. 无法将代理会话标记为已完成/从 Agents 视图移除
- **#66202** — 评论 4 | 👍 20 | 开放中
- 大量后台代理结束时处于 "Ready for review" / "Needs input" 状态，用户希望可以手动标记为完成并从 Agents 视图移除。
- **社区反应**：20 个 👍 说明该功能缺口被广泛认同，尤其对重度 Agent 用户是个效率痛点。

---

## 重要 PR 进展

### 1. 修复过时的文档链接（已合并）
- **#85925** — docs: 将剩余过时文档链接指向 code.claude.com
- 将插件、插件 skills/agents/commands 以及 issue 模板中的 docs.claude.com 旧链接替换为规范目标 code.claude.com，消除重定向损耗。

### 2. 修复插件与示例的 README 漂移（已合并）
- **#85822** — docs: 修复插件和示例中的过时文档链接及 README 漂移
- 更新 hooks 文档链接至 code.claude.com/docs/en/hooks、plugins README 链接等，所有变更均经实际重定向验证。

### 3. 向 Claude Code 添加缺失源码（开放中）
- **#41611** — add the missing source to claude code
- 描述较为宽泛，但目的明确：为 Claude Code 补充缺失的源代码。社区已等待约 4 个月，关注其具体落地范围。

### 4. 新增 MEP 多机器会话状态中继示例（开放中）
- **#42996** — examples: 添加 MEP（Meat Puppet Elimination Protocol）
- 提出"肉傀儡消除协议"：一种零基础设施、三文件的异步状态中继方案，用于解决多机器切换时的上下文丢失问题。
- **意义**：体现了社区对"跨机器会话连续性"的强烈需求（同方向还有 Issue #81835）。

### 5. 修复 child_process_exec 规则误报（已合并）
- **#57888** — 将 child_process_exec 规则限定到 JS/TS 文件
- 修复 `security_reminder_hook.py` 中 `exec(` 子串对 Python `asyncio.create_subprocess_exec(` 的误判，缩小规则检测范围。

---

## 功能需求趋势

综合过去 24 小时更新的 50 条 Issues，社区最关注的五大功能方向：

1. **Linux 桌面端支持**：官方 Linux 构建 (#65697，498👍) 持续霸榜，平台缺口显著。
2. **Agent 会话治理**：包括会话完成/关闭操作 (#66202，20👍)，以及代理会话的 `sleeping`、`needs input` 状态可视化 (#86082)。
3. **插件生命周期管理**：插件缓存失效 (#14061)、插件市场安装路径与版本数据不同步 (#76882)。
4. **安全与合规一致性**：CVP 认证组织仍遭拦截 (#84352)、`permissions.deny` 规则失效 (#61268) 等安全控制类议题增多。
5. **模型/上下文灵活性**：Opus 4.8/5 的 1M 上下文选项在 Model Picker 中消失 (#68287, #69109)、`xhigh/max` 努力级别下 WebSearch 返回 400 (#83364)。

---

## 开发者关注点

- **Windows 桌面版稳定性是最大痛点**：GPU 进程崩溃 (#81698)、反复崩溃需要 Repair (#85199)、Browser 面板触发崩溃后 MSIX 自修复失败甚至卸载应用 (#85905) —— 连续三个独立 Issue 指向同一平台问题。

- **跨会话消息存在丢失风险**：接收方会话被新消息打断且事后无感知 (#86059)；消息在 UI 上渲染但从未进入运行时输入队列 (#86237)，开发者对"假成功"的交互表示担忧。

- **插件与缓存机制极易踩坑**：`/plugin update` 不刷新缓存 (#14061)、marketplace 更新不更新 `installed_plugins.json` (#76882)，用户对插件生态的手动维护负担普遍不满。

- **终端与编辑器集成不够灵活**：左箭头导航不可重绑定 (#75899)、Kitty 键盘协议按终端名白名单而非 CSI ? u 能力检测 (#71700)、代码块在桌面端与 Remote Control 端换行行为不一致 (#84965) —— TUI/编辑器类体验问题持续累积。

- **成本敏感度上升**：`git status` 的任意变化都会导致 `-p --resume` 全前缀 prompt cache 重建 (#78720)，间接推高 token 成本，用户对此抱怨集中在 CI/CD 场景。

- **幻觉回归引发质量担忧**：Opus 5 出现 4.8 没有的幻觉行为 (#82326)，用户对"新版本模型能力回退"的容忍度较低，期待 Anthropic 给出明确解释。

---

*本报告由 AI 开发工具技术分析师基于 GitHub 公开数据整理，数据截至 2026-08-13。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-13

## 今日速览

- 发布预发布版本 `rust-v0.148.0-alpha.9`，但尚未附带详细变更说明。
- PR 侧密集合并围绕插件指标采集、线程用量展示、gRPC 会话重连等基础能力改进。
- CLI 自动解析 60 秒超时不可配置的问题以 194 👍 / 70 💬 成为今日社区最热 Issue。

## 版本发布

- **rust-v0.148.0-alpha.9**：过去 24 小时发布，目前仅有版本号信息，具体更新内容需关注官方 Release 说明。

## 社区热点 Issues

1. **[#28969 Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969)**  
   70 评论 / 194 👍，社区热度最高。用户要求为 CLI 的权限/提问自动解析提供可配置关闭选项，尤其适合长时间无人值守或复杂审批场景。

2. **[#25178 Windows Computer Use screenshot fails on Windows 10 22H2](https://github.com/openai/codex/issues/25178)**  
   25 评论 / 13 👍。Windows 桌面版 Computer Use 在 `get_window_state` 截图时遇到 `SetIsBorderRequired` 接口不支持，导致窗口控制链路中断。

3. **[#31553 VS Code extension stopped auto-including IDE context after update](https://github.com/openai/codex/issues/31553)**  
   17 评论 / 12 👍。更新后 VS Code 远程容器环境下 IDE 上下文不再自动附加，影响基于容器开发的日常使用。

4. **[#26990 Windows Desktop local state is not crash-safe after power loss](https://github.com/openai/codex/issues/26990)**  
   14 评论。断电后桌面应用本地状态回退：固定项目、Pin、配置均可能丢失，并出现未来时间戳，数据持久化可靠性堪忧。

5. **[#37398 Opening any unloaded local chat waits ~5 seconds on owner discovery timeout](https://github.com/openai/codex/issues/37398)**  
   14 评论 / 9 👍。即使聊天记录很小，应用也会因固定的 owner-discovery 超时等待约 5 秒，影响日常会话打开速度。

6. **[#33967 ChatGPT for Windows cannot complete setup or enter limited-access mode](https://github.com/openai/codex/issues/33967)**  
   12 评论。Windows 桌面应用卡在 "Complete Windows setup" 页面，用户无法进入正常或受限访问模式。

7. **[#34920 IDE Context fails in Codex extension 26.715.x with RPC serialization error](https://github.com/openai/codex/issues/34920)**  
   10 评论 / 5 👍。多个 VS Code 扩展版本存在 IDE Context RPC 序列化错误，导致上下文功能整体不可用。

8. **[#35419 VS Code IDE context auto-disables and selected text is not attached in WSL2](https://github.com/openai/codex/issues/35419)**  
   6 评论 / 10 👍。WSL2 下 IDE 上下文自动关闭，选中文本无法附带到 Codex，影响用户对当前文件的感知。

9. **[#37472 Allow request_user_input in Default mode to wait indefinitely](https://github.com/openai/codex/issues/37472)**  
   2 评论 / 1 👍，但需求方向明确：希望 `request_user_input` 在 Default 模式下不自动超时，而是等待用户输入，与 #28969 形成互补。

10. **[#30745 Codex TUI scrollback rows can disappear after inline viewport height changes](https://github.com/openai/codex/issues/30745)**  
    5 评论 / 3 👍。流式输出过程中视口高度变化会导致终端回滚内容缺失，影响长会话审查。

## 重要 PR 进展

1. **[#38275 Unify turn input submission and routing](https://github.com/openai/codex/pull/38275)**  
   将启动 turn、转向当前 turn、拒绝输入统一为原子的 `TurnInputRequest`，并暴露 `start_or_steer_turn` 等 API，简化会话控制路径。

2. **[#38281 Show estimated thread usage in `/status`](https://github.com/openai/codex/pull/38281)**  
   扩展 `account/usage/read`，支持按 `threadId` 查询线程级信用/美元用量和模型、推理、速度、Token 明细。

3. **[#38282 Add thread usage to TUI status surfaces](https://github.com/openai/codex/pull/38282)**  
   企业版 TUI 状态栏与终端标题可显示 `thread-credits` 和 `estimated-thread-cost`，按需拉取共享用量估算。

4. **[#38257 Reconnect gRPC code-mode sessions after host restarts](https://github.com/openai/codex/pull/38257)**  
   当 gRPC 主机重启后自动重连缓存的 code-mode 会话，并同步处理并发重连和回调 cell ID 换代。

5. **[#29752 Integrate experimental credential broker](https://github.com/openai/codex/pull/29752)**  
   将代理持有的凭据 broker 集成进 Codex core，用 per-child 假值替换真实凭据，避免子进程生命周期中凭据泄漏。

6. **[#38258 Unify external authentication provider handling](https://github.com/openai/codex/pull/38258)**  
   统一外部认证提供者的错误分类与刷新/校验路径，并支持运行时替换 provider 后清理永久失败状态。

7. **[#38276 Track plugin metrics for background unified exec commands](https://github.com/openai/codex/pull/38276)**  
   修复后台命令在 turn 结束后才退出时，插件测量指标仍能正确采集的问题。

8. **[#38253 Collect plugin metrics from unified exec commands](https://github.com/openai/codex/pull/38253)**  
   为本地统一 exec 插件命令创建 metrics sidecar，并在命令退出时发布有效测量数据，同时丢弃过期的 sidecar。

9. **[#38283 Collect plugin metrics from remote executors](https://github.com/openai/codex/pull/38283)**  
   将插件指标采集扩展到远程执行器，sidecar 在 executor 原生临时目录中运行，并回传有界输出。

10. **[#38265 Use bounded fallback ports for Windows managed proxies](https://github.com/openai/codex/pull/38265)**  
    修复 Windows HTTP/SOCKS5 受管代理端口被占用时的回退策略，HTTP 与 SOCKS5 独立保留端口，避免相互冲突。

## 功能需求趋势

- **IDE 上下文可靠性**：多个 Issue 集中在 VS Code 扩展的 IDE Context 静默禁用、RPC 错误、WSL2/容器环境不附加文件与选区。社区对上下文自动附加的稳定性要求很高。
- **Windows 桌面版/沙箱兼容性**：Computer Use 截图失败、Setup 卡死、代理端口回退、EPERM 等问题密集出现，Windows 平台体验成为当前质量短板。
- **CLI/TUI 可配置性**：用户希望更细粒度控制自动行为，如关闭 60 秒自动解析、`request_user_input` 无限等待、禁用自动滚动、TUI 保留滚动回退等。
- **会话状态与持久化**：断电后状态回退、线程归档重置、SQLite 状态卡死、fork 后父线程 writer 占用等，暴露出会话生命周期的健壮性问题。
- **用量透明化**：线程级信用/美元展示进入 `/status` 和 TUI 状态栏，说明企业用户对成本可观测性有实际需求。

## 开发者关注点

- **高频痛点**：IDE Context 丢失或不可用；Windows 下 Computer Use 和 Setup 故障；桌面应用打开会话卡顿；本地状态易被重置/损坏；TUI 滚动内容丢失。
- **高频需求**：可关闭/延长的自动超时；禁用自动滚动；线程用量展示；fork/resume 行为修复；更可靠的凭据隔离和认证恢复。
- **社区情绪**：对企业/Pro 用户而言，数据持久性和 IDE 集成的稳定性比新功能更迫切；自动化带来的“不可控感”（自动解析、自动滚动）是主要怨言来源。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-13

## 今日速览

- 发布 v0.56.0-nightly，重点修复**虚假模型容量耗尽误判**与 core 配额查询映射问题，同时新增 eval 本地报告命令。
- **代理稳定性**仍是社区最热议题：子代理在 MAX_TURNS 后误报 GOAL 成功（#22323）引发 12 条讨论，通用代理持续挂起问题（#21409）关注度居高不下。
- 安全与健壮性成为 PR 主力：修复 MCP 配置损坏导致 fail-open 的漏洞（#28787/#28794），并封堵 $VAR 变量展开绕过漏洞（#28691）。

---

## 版本发布

### v0.56.0-nightly.20260812.g5024443c7
**主要更新：**
- `fix(core,cli)`：修复错误的模型容量耗尽判断，并修正 core 配额查找的模型映射问题（PR #28730）
- `feat(evals)`：新增本地报告命令（`local report`）及开发者文档（PR #28788 相关）

链接：https://github.com/google-gemini/gemini-cli/releases （夜间构建通道）

---

## 社区热点 Issues（Top 10）

### 1. 子代理在 MAX_TURNS 后误报 GOAL 成功 — 12 条评论
`codebase_investigator` 子代理在未做任何分析即触发最大轮次限制时，仍报告 `status: "success"` 与 `Termination Reason: "GOAL"`，掩盖了真实的中断原因，严重误导自动化流程。

- 优先级：P1 | 类型：bug | 作者：matei-anghel | 创建：2026-03-13
- 链接：https://github.com/google-gemini/gemini-cli/issues/22323

### 2. 通用代理（Generalist agent）无限挂起 — 8 条评论
当 Gemini CLI 委派任务给通用代理时无限等待，简单操作（如创建文件夹）也会挂机长达一小时。通过在提示词中禁止使用子代理可规避，说明问题出在代理编排层。

- 优先级：P1 | 类型：bug | 作者：turmanticant | 创建：2026-03-06
- 链接：https://github.com/google-gemini/gemini-cli/issues/21409

### 3. 借助零依赖 OS 沙箱发挥模型的 bash 亲和力 — 8 条评论
提议利用 Gemini 3 模型原生擅长的 POSIX 工具链（grep/sed/awk），在不损害安全性的前提下通过沙箱机制让模型直接用 bash 完成代码探索和编辑，减少不必要的工具抽象。

- 优先级：P2 | 类型：enhancement | 作者：abhipatel12 | 创建：2026-02-22
- 链接：https://github.com/google-gemini/gemini-cli/issues/19873

### 4. 健壮的组件级评估体系建设 — 7 条评论
这是行为评估体系的史诗级（EPIC）议题：已积累 76 个行为评估测试、覆盖 6 个 Gemini 模型，但需要进一步构建更细粒度的组件级评估能力，防止回归。

- 优先级：P1 | 类型：customer-issue | 作者：gundermanc | 创建：2026-03-31
- 链接：https://github.com/google-gemini/gemini-cli/issues/24353

### 5. 评估 AST 感知文件读取、搜索与代码映射的收益 — 7 条评论
探索用 AST 感知工具更精确地读取方法边界、减少 token 噪声与无效轮次；推荐以 `tilth` 或 `glyph` 作为起始参考实现。

- 优先级：P2 | 类型：feature | 作者：gundermanc | 创建：2026-03-16
- 链接：https://github.com/google-gemini/gemini-cli/issues/22745

### 6. Gemini 不会主动使用 skills 和子代理 — 6 条评论
用户反馈即使配置了 `gradle`、`git` 等自定义技能，模型在相关场景下依然不会主动调用，只有显式指令才会触发。社区认为这降低了自定义扩展的实际价值。

- 优先级：P2 | 类型：bug | 作者：rnett | 创建：2026-03-11
- 链接：https://github.com/google-gemini/gemini-cli/issues/21968

### 7. 自动记忆系统对低信号会话无限重试 — 5 条评论
Auto Memory 只在提取代理调用 `read_file` 成功后才标记会话为已处理；遇到低质量会话跳过不读时会反复出现在候选列表中，导致无限重试。

- 优先级：P2 | 类型：bug | 作者：SandyTao520 | 创建：2026-05-05
- 链接：https://github.com/google-gemini/gemini-cli/issues/26522

### 8. 自动记忆需确定性脱敏，并减少日志输出 — 4 条评论
Auto Memory 将本地 transcript 发送给模型时依赖提示词要求后者脱敏，但此时秘密已进入模型上下文；且服务会记录已有技能等敏感信息。要求引入确定性脱敏机制。

- 优先级：P2 | 类型：bug | 作者：SandyTao520 | 创建：2026-05-05
- 链接：https://github.com/google-gemini/gemini-cli/issues/26525

### 9. Shell 命令执行完成后卡在 "Waiting input" — 4 条评论
简单命令执行完毕后 Gemini CLI 仍显示命令激活并处于等待输入状态，挂起时间不定。已触发 3 次 👍，影响日常命令行工作流。

- 优先级：P1 | 类型：bug | 作者：rnett | 创建：2026-04-11
- 链接：https://github.com/google-gemini/gemini-cli/issues/25166

### 10. 增强 browser_agent 韧性：会话自动接管与锁恢复 — 4 条评论
`BrowserManager.ts` 的超时策略是 fail-fast：遇到浏览器 profile 被锁（persistent 模式下常见）直接失败退出。提议自动接管旧会话或等待锁释放。

- 优先级：P3 | 类型：feature | 作者：hsm207 | 创建：2026-03-12
- 链接：https://github.com/google-gemini/gemini-cli/issues/22232

---

## 重要 PR 进展（Top 10）

### 1. MCP 配置损坏不再被当作空配置处理（#28787）
`readConfig()` 原先将 JSON 解析失败与文件不存在统一返回 `{}`，导致所有 MCP server 默认开启。本 PR 区分两种场景，避免因配置损坏导致意外启用未授权的服务器。

- 优先级：P1 | 作者：chelsealong | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28787

### 2. 修复 MCP 配置损坏导致 fail-open 与数据丢失（#28794）
针对 #28786 的修复：当 `mcp-server-enablement.json` 损坏时不再静默绕过，防止安全边界被意外打开，同时避免后续写入覆盖掉损坏的原始数据。

- 优先级：P1 | 作者：Pranjulchaurasiya | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28794

### 3. 上下文感知的静默重试与容量错误 TTL（#28790）
关闭 #28761 中的关键容量耗尽重试回归：非交互运行时自动退避重试，交互模式最多追加 2 次静默重试，并引入 availability TTL 避免无效重试。

- 优先级：P1 | 作者：DavidAPierce | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28790

### 4. 标准化 Git 子进程环境（#28792）
统一 Git 子进程的环境配置，消除 workspace 状态初始化不一致问题，确保内部 Git 工具在各类仓库中可预测地非交互执行，并保持策略一致。

- 优先级：P2 | 作者：luisfelipe-alt | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28792

### 5. 稳定受测文件系统交互的 E2E 测试（#28793）
为 flaky 的 `file-system-interactive.test.ts` 添加提示同步等机制，解决慢速 Windows CI runner 与虚拟化环境下的超时问题。

- 优先级：无标签 | 作者：DavidAPierce | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28793

### 6. 行为评估：技能激活与 URL 获取测试（#28788）
新增 `activate_skill` 与 `web_fetch` 的行为评估，推进 Windows 本地评估兼容性，并修复 EDK 报告聚合器跳过未执行用例的 bug。

- 优先级：无标签 | 作者：ved015 | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28788

### 7. 修复 vscode-ide-companion 的 stop() 挂起与 keep-alive 泄漏（#28789）
解决 `IdeServer.stop()` 在活跃 MCP streaming 会话存在时无限挂起的问题，同时修复 keep-alive 心跳间歇性失败导致的资源泄漏。

- 优先级：P1 | 作者：Pranjulchaurasiya | 创建：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28789

### 8. 封堵 $VAR 变量展开绕过漏洞（安全公告 GHSA-wpqr-6v78-jr5g）（#28691）
修复 `detectBashSubstitution()`/`detectPowerShellSubstitution()` 中不完整的检查，禁止通过变量展开绕过安全门禁；同时对自动化去重工作流做纵深防御加固。

- 优先级：P1 | 作者：thalha-a9 | 创建：2026-08-05 | 更新：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28691

### 9. 新增 Gemini 3.6 Flash 与 3.5 Flash-Lite 模型配置（#28673）
在 core 中补充新模型的完整定义：能力标记（thinking、multimodalToolUse）、别名与代码相关配置，为新模型上线铺路。

- 优先级：P2 | 作者：Blackmanx | 创建：2026-08-03 | 更新：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28673

### 10. 允许代理调用代理（#28738）
通过 `tools:` frontmatter 让子代理能够委派给其他子代理或自我递归，解决 #22092。该 PR 已被标记为 `help wanted`，社区协作度高。

- 优先级：P2 | 作者：akash-manna-sky | 创建：2026-08-08 | 更新：2026-08-12
- 链接：https://github.com/google-gemini/gemini-cli/pull/28738

---

## 功能需求趋势

1. **代理编排与自我递归**：社区强烈希望子代理能互相调用/自我递归（#28738），并解决通用代理挂起、子代理中断误报等稳定性痛点（#22323、#21409）。
2. **评估基础设施升级**：从行为评估扩展到组件级评估（#24353），新增本地报告命令、技能激活与 web_fetch 评估（#28788），并配套 `eval:validate` 静态校验工具。
3. **安全与沙箱**：对变量展开绕过（#28691）、MCP 配置 fail-open（#28787/#28794）的持续加固，以及零依赖 OS 沙箱方案（#19873）表明社区对"模型直接操作 bash"的安全落地路径高度关注。
4. **AST 感知代码工具**：通过 AST 感知的文件读取、搜索和代码映射来减少 token 开销、提高编辑精度（#22745），尚处于调查阶段，可能影响未来的 codebase_investigator 演进。
5. **持久记忆系统完善**：Auto Memory 的低信号会话重试、确定性脱敏、无效补丁隔离等多项改进（#26522、#26523、#26516）意味着长期记忆正在从"可用"走向"可靠"。
6. **新模型支持前瞻**：Gemini 3.6 Flash / 3.5 Flash-Lite 的配置 PR 表明模型矩阵在持续扩张，社区期待新模型解决容量与性能问题。

---

## 开发者关注点

- **挂起与假死现象**：通用代理挂起（#21409）和 shell 命令执行后陷入 "Waiting input"（#25166）是高频反馈，开发者被迫通过禁用子代理或手动干预来绕过。
- **误导性的成功信号**：MAX_TURNS 被报告为 GOAL 成功（#22323）、bugreport 缺乏子代理上下文（#21763）等问题让自动化链路难以排查真实失败原因。
- **自主性与权限边界**：子代理绕过配置被自动启用（#22093）、模型不使用自定义 skills（#21968）、以及执行破坏性 git/数据库命令（#22672）均反映出社区对"代理自主行为可控性"的焦虑。
- **配置与设置被忽略**：Browser Agent 不遵守 `settings.json` 的 `maxTurns` 覆盖（#22267）、symlink 形式的 agent 定义不被识别（#20079），配置一致性亟待加强。
- **终端交互体验**：外部编辑器退出后终端显示损坏（#24935）、resize 闪烁、滚动位置跳变（#28405）等终端 UX 问题仍在持续修复中，影响长会话体验。
- **浏览器代理稳定性**：Wayland 下失败（#21983）、浏览器 profile 锁死（#22232）等问题说明浏览器自动化场景仍不成熟。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-13）

## 今日速览
过去 24 小时无新版本发布；社区讨论集中在 **MCP 生态稳定性**（OAuth、5xx 重试、容器/进程泄漏）与 **模型选择/覆盖类 bug**。值得关注的是，8 月 12 日集中涌入了大量 `[triage]` 新 Issue，而 #1305 以 35 👍 持续成为最高赞功能请求。

## 社区热点 Issues

### 1. #1305 支持 CIMD for Remote OAuth MCP Servers
- 状态：OPEN | 评论：5 | 👍：35（本期最高赞）
- 标签：`area:authentication` `area:mcp`
- 为什么重要：远程 MCP 服务器的 OAuth 认证目前依赖 DCR，但对不支持 DCR 的服务无法工作。社区高度期待 CIMD（Client-Initiated Mutual TLS?）或类似机制来扩展 OAuth 兼容性。
- 链接：https://github.com/github/copilot-cli/issues/1305

### 2. #1730 sessionStart hook 不触发（v0.0.420）
- 状态：OPEN | 评论：8 | 👍：3
- 标签：`area:plugins`
- 为什么重要：`.github/hooks/*.json` 中定义的 `sessionStart` 钩子完全不执行，影响用户自定义插件流程。8 条评论说明可复现路径清晰，但在最新版中仍未修复。
- 链接：https://github.com/github/copilot-cli/issues/1730

### 3. #4328 WSL2 下 Ctrl+H 被误判为 Ctrl+Backspace
- 状态：OPEN | 评论：6 | 👍：0
- 标签：`area:input-keyboard` `area:platform-windows`
- 为什么重要：由于 `WT_SESSION` 从 Windows Terminal 泄漏到 WSL2，`Ctrl+H`（删除前一个字符）被解释为“删除整个单词”。这是 WSL2 高频用户会立刻感知的输入 bug，影响日常编辑效率。
- 链接：https://github.com/github/copilot-cli/issues/4328

### 4. #4390 组织启用的模型（Claude Sonnet 5/Opus 5、Kimi K3）缺失
- 状态：OPEN | 评论：5 | 👍：4
- 标签：无（企业模型目录）
- 为什么重要：企业组织明确启用的模型在 Copilot CLI 中不可见/不可用，提示“disabled by your organization”。说明企业配置同步链路存在断点，影响所有 Copilot Business 用户。
- 链接：https://github.com/github/copilot-cli/issues/4390

### 5. #2109 ACP 支持 ask_user / ask_question 扩展方法
- 状态：OPEN | 评论：3 | 👍：7
- 标签：ACP
- 为什么重要：当前 ACP 只有 `session/request_permission`，缺少向用户提问并获取结构化答案的原语。对构建复杂 Agent 工作流的开发者属于核心能力缺口。
- 链接：https://github.com/github/copilot-cli/issues/2109

### 6. #3976 原生 tgrep 索引器在大型 monorepo 上 OOM
- 状态：OPEN | 评论：2 | 👍：0
- 标签：`area:tools`
- 为什么重要：`tgrep serve` 在大型仓库中会直接 OOM-kill 宿主机，且没有内存上限。性能与稳定性问题并存，影响企业级 monorepo 用户。
- 链接：https://github.com/github/copilot-cli/issues/3976

### 7. #4422 企业账号下所有 Claude 模型不可用
- 状态：OPEN | 评论：2 | 👍：3
- 标签：`area:enterprise` `area:models`
- 为什么重要：与 #4390 类似但更严重——用户反馈昨天还能用，今天全部 Claude 模型（Sonnet 5、4.8 等）被拒绝，且回滚版本无效。疑似服务端策略变更引发。
- 链接：https://github.com/github/copilot-cli/issues/4422

### 8. #4432 rubber-duck 子代理的 model 参数覆盖 complementary 策略
- 状态：OPEN | 评论：2 | 👍：0
- 标签：`triage`
- 为什么重要：模型发出的 `model` 参数能静默覆盖用户 `/subagents` 设置，导致“cross-family 第二意见”策略失效。直指 subagent 模型路由的权限边界问题。
- 链接：https://github.com/github/copilot-cli/issues/4432

### 9. #4358 BYOK：/model picker 应从 provider /models endpoint 填充
- 状态：OPEN | 评论：1 | 👍：2
- 标签：`triage` `BYOK`
- 为什么重要：BYOK 场景下只能使用一个固定模型，`/models` 也仅显示该模型。用户希望动态读取 provider 的模型列表，实现不退出会话即可切换模型。
- 链接：https://github.com/github/copilot-cli/issues/4358

### 10. #4466 远程 MCP 的 initialize 5xx 被记为永久失败
- 状态：OPEN | 评论：0 | 👍：0
- 标签：`triage`
- 为什么重要：8 月 12 日新提交的 bug。远程 MCP 在 `initialize` 时偶发 502，CLI 会将整个 session 标记为失败且不重试。属于 MCP 高可用性关键缺陷。
- 链接：https://github.com/github/copilot-cli/issues/4466

## 重要 PR 进展
过去 24 小时仅 3 个 PR，其中仅 1 个具有实质变更，其余为机器人测试/关闭操作。

### #4449 将 PR 自动化从 pull_request_target 迁移走
- 状态：OPEN | 创建：2026-08-11 | 更新：2026-08-12
- 内容：将 invalid-label 自动化从 `pull_request_target` 迁移到 issue-scoped write token / no-permission `pull_request` signal，降低 GitHub Actions 权限风险。属于仓库基础设施安全改进。
- 链接：https://github.com/github/copilot-cli/pull/4449

### #4452 Revert 5 copilot/fix with copilot
- 状态：CLOSED | 创建：2026-08-12
- 内容：自动 bot 提交的回滚操作，无实质功能变更。
- 链接：https://github.com/github/copilot-cli/pull/4452

### #4453 Julesdemangeot ship it patch 1
- 状态：CLOSED | 创建：2026-08-12
- 内容：疑似测试性 PR，已关闭。
- 链接：https://github.com/github/copilot-cli/pull/4453

## 功能需求趋势

1. **MCP 生态成熟度**
   - 远程 OAuth 服务器支持 CIMD（#1305）
   - 远程 MCP 失败自动重试/backoff（#4466）
   - stdio Docker MCP 容器生命周期管理（#4461）
   - MCP OAuth 在 Windows 上的稳定性（#4463）

2. **模型选择与控制**
   - BYOK 模式从 /models 端点动态获取模型列表（#4358）
   - 子代理模型 overrides 必须可靠生效（#4432、#4458、#4462）
   - 组织启用模型与 CLI 目录同步（#4390）

3. **上下文/记忆持久性**
   - 重复 compaction 后保留 durable context（#4441）
   - 长会话事件存储耗尽问题（#4467）

4. **终端交互体验**
   - WSL2/Windows 键位兼容性（#4328）
   - Session picker 选中态可读性（#4455）

5. **插件/扩展体系**
   - 修复 sessionStart hook 触发（#1730）
   - extraKnownMarketplaces autoUpdate（#4465）
   - ACP 增加 ask_user 交互原语（#2109）

## 开发者关注点

1. **模型被静默降级/忽略的 Bug 反复出现**：`code-review` 子代理配置 `gpt-5.6-luna` 却被启动为 `gpt-5.6-sol`（#4458/#4462）、rubber-duck 的 complementary 策略被覆盖（#4432）、task tool 的 multiplier guard 降级（#3565）。社区对“配置不生效”类问题容忍度很低。
2. **MCP 可靠性是当前最大痛点**：OAuth 静默刷新失败导致反复交互登录（#4464）、transient 5xx 直接放弃重试（#4466）、Windows socket 10013 偶发失败（#4463）——MCP 已成为生产级使用的主要障碍。
3. **资源泄漏影响长期运行**：`--server --stdio` 下每 session 积累 4 个 extension-host 进程不释放（#4468）；Docker MCP 容器在 session 关闭后残留（#4461）；tgrep 索引器 OOM（#3976）。
4. **企业/组织策略同步问题集中爆发**：多个企业用户报告模型在 CLI 中不可用，说明 Copilot Business 组织配置与 CLI 端模型目录的一致性测试存在缺口。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-13）

> 数据源：github.com/MoonshotAI/kimi-cli | 统计区间：近 24 小时（2026-08-12 ~ 2026-08-13）

## 1. 今日速览

过去 24 小时内，Kimi Code CLI 仓库无新版本发布；共 1 个 Issue 有活跃更新，即社区呼声很高的**跨会话记忆系统功能请求（#1283）**，目前已有 36 条评论；同步有 2 个 PR 更新，均为针对字符串渲染和子进程管道的健壮性修复。整体来看，社区对"会话级上下文持久化"的关注度正在上升，同时代码稳定性是当前开发者体验优化的重点。

## 2. 版本发布

今日无新版本发布。

## 3. 社区热点 Issues

> 说明：本期仅有 1 个 Issue 在过去 24 小时内发生更新，故重点分析如下。

### #1283 [增强] Memory System：跨会话持久化上下文（OPEN）
- **作者**：CatKang | **创建**：2026-02-27 | **更新**：2026-08-13
- **评论**：36 | **👍**：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1283

**为什么重要**：该需求提出为 Kimi Code CLI 构建体系化的**内存系统**，包括自动记忆（AI 管理的笔记）和手动记忆（用户自定义指令），让 CLI 可以在多次会话间记住项目上下文、代码模式与用户偏好。虽然👍数不多，但 36 条评论足以说明讨论热度极高，且该 Issue 自 2 月创建以来持续活跃，属于长期的 Top 级功能诉求。

**社区反应**：开发者普遍希望减少每次会话中重复描述项目背景的负担，并期望 CLI 能够像人类协作者一样"越用越懂你"。这是 AI 编码助手走向深度协作的关键能力。

## 4. 重要 PR 进展

### #2449 [修复] 在长度检查前去除字符串中的换行符（OPEN）
- **作者**：Ricardo-M-L | **创建**：2026-06-13 | **更新**：2026-08-12
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2449

**修复内容**：`shorten_middle()` 函数在输入文本较短时会提前返回，导致跳过换行符折叠逻辑。该函数被 `extract_key_argument` 用于生成工具调用的**单行摘要**，PR 修复后可以确保任何情况下都不会因为多余换行破坏日志或 UI 的单行格式。

### #2324 [修复] 处理 SessionProcess.send_message 中的 BrokenPipeError（OPEN）
- **作者**：Ricardo-M-L | **创建**：2026-05-19 | **更新**：2026-08-12
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2324

**修复内容**：在 `src/kimi_cli/web/runner/process.py` 中，`SessionProcess.send_message` 先进行 `start()`，随后写入 `stdin` 并等待 `drain()`。若子进程恰好在两步之间退出，会引发 `BrokenPipeError`。该 PR 增加了防护逻辑，提升了 Web runner 在异步 I/O 场景下的稳定性。

## 5. 功能需求趋势

> 基于当前可见的活跃 Issue 数据（样本量：1），提炼方向如下：

- **跨会话记忆与持久化**：这是社区当前最强烈的功能诉求。开发者希望 CLI 能够积累项目模式、用户偏好和关键上下文，并区分 AI 自动记的笔记与用户手动指定的长期指令。未来若能落地，将显著提升工具的"个人化"程度与协作效率。

## 6. 开发者关注点

- **上下文连续性问题**：开发者在长期使用中，痛点已从"单次问答质量"转向"多会话一致性"，希望减少重复描述，让工具记住历史信息。
- **输出格式精确性**：从 #2449 可见，开发者非常在意工具调用摘要的展示格式——即使短文本中的换行符也会被视为 bug，说明日志和 UI 的整洁度是影响体验的细节。
- **Web 运行时稳定性**：#2324 暴露了子进程生命周期管理与异步写入之间的竞态问题，Web runner 是不少人使用 CLI 的入口，这类边界情况的容错处理需要持续加固。

---

*注：本次统计窗口内活跃的 Issue/PR 数量较少，因此条目数量有限；以上为全部可见更新。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-13

## 1. 今日速览

昨日发布 v1.18.17 补丁，修复会话压缩、重试风暴等问题。社区层面，**Zen 免费配额/订阅计费问题**以压倒性数量成为焦点（多条相关 Issue 涌现），同时 Mermaid 图表渲染 PR 终于落地——回应了社区 26 👍 的最高票功能请求。此外，多项围绕 Desktop/WSL 集成与客户端服务管理的修复正在进行。

## 2. 版本发布

**v1.18.17**（[Release 链接](https://github.com/anomalyco/opencode/releases)）

核心修复：
- **会话压缩改进**：保留完整近期轮次，并为小模型生成更清晰的摘要
- **MERGE Gateway**：新增 reasoning 变体支持，修复模型选项不可用问题
- **重试机制**：为自动重试增加上限并引入抖动，避免反复重试风暴

## 3. 社区热点 Issues

### 配额/订阅问题（今日最热群体事件）
| Issue | 标题 | 评论/👍 | 为什么重要 |
|---|---|---|---|
| [#14273](https://github.com/anomalyco/opencode/issues/14273) | [CLOSED] 使用 Zen 免费模型时报 "Free usage exceeded. Add credits" | 40 评论 | **最高讨论量**。用户反馈已有 $3 余额仍被限流，Zen 免费额度判定逻辑疑似异常 |
| [#42128](https://github.com/anomalyco/opencode/issues/42128) | [CLOSED] 首次请求即触发免费额度超限（DeepSeek V4 Flash Free） | 7 评论 | 新账户无任何历史请求也被限流，指向免费层状态持久化缺陷 |
| [#33495](https://github.com/anomalyco/opencode/issues/33495) | [OPEN] Zen 余额不解除免费限额，付费用户仍撞 200 请求/429 | 6 评论 | **影响付费用户**。有余额账户（$20+）仍按免费层限流，用户信任受损 |
| [#42154](https://github.com/anomalyco/opencode/issues/42154) | [CLOSED] 已订阅 Go 仍提示 DeepSeek V4 Flash 受限 | 2 评论 | 订阅状态未同步到模型路由层 |
| [#42132](https://github.com/anomalyco/opencode/issues/42132) | [CLOSED] 购买订阅后聊天仍提示 limit exceeded | 4 评论 | 支付后状态未即时生效，且区域限制阻止 DeepSeek 使用 |

### 高价值功能请求
| Issue | 标题 | 评论/👍 | 为什么重要 |
|---|---|---|---|
| [#3366](https://github.com/anomalyco/opencode/issues/3366) | [FEATURE] 聊天中渲染 Mermaid 图表 | 10 评论 / **26 👍** | 社区最高赞功能需求，PR #42179 已实现 gitGraph 渲染，值得关注后续进展 |
| [#4832](https://github.com/anomalyco/opencode/issues/4832) | [BUG] Gemini 3 Pro 函数调用失败 - 缺少 thoughtSignature | 35 评论 / **14 👍** | 热门模型与工具调用的兼容性阻断问题，影响面广 |
| [#19005](https://github.com/anomalyco/opencode/issues/19005) | [FEATURE] 终端输出中的本地文件路径应可点击 | 7 评论 / 5 👍 | 高频体验优化：生成报告/图片后，用户需手动复制路径打开文件 |
| [#33027](https://github.com/anomalyco/opencode/issues/33027) | [BUG] MCP 工具已连接但未暴露给 agent | 7 评论 / 3 👍 | MCP server 正常响应 tools/list，但 agent 工具列表为空，集成逻辑存在断点 |
| [#17073](https://github.com/anomalyco/opencode/issues/17073) | [FEATURE] grep/glob 结果中保护 .env 文件 | 6 评论 / 5 👍 | 权限规则按匹配模式过滤而非目标路径，存在敏感信息泄露风险 |

### 稳定性问题
- [#41848](https://github.com/anomalyco/opencode/issues/41848)：LLM 重试无上限，流式错误导致无限重试循环，UI 卡死在 Thinking。RETRY_MAX_DELAY 被设为 ~24 天

## 4. 重要 PR 进展

| PR | 标题 | 关键内容 |
|---|---|---|
| [#42179](https://github.com/anomalyco/opencode/pull/42179) | [contributor] feat(tui): 渲染 Mermaid GitGraph 图表 | 将 Mermaid gitGraph 代码块渲染为终端原生垂直提交图，回应用户高票需求 |
| [#42174](https://github.com/anomalyco/opencode/pull/42174) | [contributor] fix(core): 子代理会话继承祖先 deny 规则 | 此前子代理可绕过祖先会话配置的 deny 权限，现 deny 变为不可穿透的栅栏 |
| [#42199](https://github.com/anomalyco/opencode/pull/42199) | fix(desktop): WSL 中使用匹配的 v2 CLI | Desktop WSL 迁移到 opencode2，并要求 WSL CLI 与桌面端版本严格一致 |
| [#42202](https://github.com/anomalyco/opencode/pull/42202) | [needs:compliance] feat(opencode): 每会话预算限制 | 新增可选的会话级成本预算，达到上限自动停止，并在 TUI 侧边栏提供可视化组件 |
| [#42201](https://github.com/anomalyco/opencode/pull/42201) | [contributor] feat(catalog): 自动生成 Open Graph 卡片 | 分享链接时自动生成 1200x630 预览图，提升目录链接在社交平台的可读性 |
| [#42196](https://github.com/anomalyco/opencode/pull/42196) | [contributor] fix(tui): 截断队列中的提示预览 | 多行提示词不再撑高队列预览区域，保持单行高度 |
| [#42185](https://github.com/anomalyco/opencode/pull/42185) | [contributor] fix(client): 防止旧客户端替换新服务 | 避免旧版 CLI/Desktop 将新后台服务替换为旧二进制，守护升级后的一致性 |
| [#42188](https://github.com/anomalyco/opencode/pull/42188) | [contributor] fix(tui): 迁移状态轮询增加传输错误重试 | 后台服务重启导致的瞬时断连不再直接判定迁移失败 |
| [#42151](https://github.com/anomalyco/opencode/pull/42151) | chore(ci): bun 脚本失败时输出 ::warning:: | 让 close-prs 工作流的失败在运行摘要中可见，而不是埋在完整日志里 |
| [#42197](https://github.com/anomalyco/opencode/pull/42197) | [contributor] fix(stats): 平板端图表 tooltip 保持在柱体上方 | 修复 tablet 断点下 tooltip 层级遮挡问题 |

## 5. 功能需求趋势

- **配额/订阅系统**：Zen 免费额度判定、订阅状态即时生效、余额与限流解耦，是当前社区最大的信任危机点
- **TUI 可视化增强**：Mermaid 图表渲染、文件路径可点击、链接预览图，反映用户对终端内信息呈现的更高期待
- **权限/安全**：.env 保护扩展、子代理 deny 继承，安全边界从"读文件"延伸到"搜索路径"与"子进程"
- **模型兼容性**：Gemini 3 Pro thoughtSignature、MiniMax 默认 prompt、Azure 大模型挂起——新模型接入的适配持续成为问题源
- **MCP 生态**：工具连接后正确暴露给 agent、按 server 配置信任级别，MCP 的信任与交付链路仍待完善

## 6. 开发者关注点

- **付费后仍被限流**是最高频投诉。多条 Issue 指向同一个核心问题：**Zen 免费层判定优先于账户付费状态/余额**，且订阅状态同步存在延迟
- **重试机制缺上限**：流式错误会导致无限重试循环，UI 无反馈地卡在 "Thinking..."，开发者需要可见的错误和可控的重试策略
- **会话压缩（/compact）可靠性质疑**：既有退化问题（#41801），也有上下文完全丢失的反馈（#41268），压缩策略在 DeepSeek 等模型上表现不稳定
- **桌面端/WSL 集成**：WSL 下 CLI 版本不匹配、剪贴板失效、侧车服务崩溃（#42170 no such column: project_id），桌面用户环境碎片化问题开始显现
- **模型速度问题**：NVIDIA 端点上的 Nemotron 3 Ultra 响应极慢，首次消息即卡顿——大模型接入的性能基线需要更多保障

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-13

## 今日速览

Pi 社区过去 24 小时围绕「上下文压缩失灵」「流事件丢失 usage」等关键稳定性问题展开密集讨论与修复，多个人工智能/兼容性 PR 落地（Grok 4.6、Ollama 本地代理、图生图等）。TUI 交互增强（组件鼠标事件、主题覆盖）与 HTML 导出补全（Mermaid/LaTeX）也是本轮社区关注焦点。

---

## 社区热点 Issues

### 🥇 #6879 自动压缩永不触发，直到上下文超限被 API 拒绝
**作者**: alexanderkreidich｜更新: 08-13｜评论: 18｜👍: 17
**为什么重要**: 在 gpt-5.6-sol 一次 2 小时 agentic 回合中，footer 越过压缩阈值继续增长至 373k tokens，直到 API 拒绝请求才触发压缩。这是当前最热门的稳定性问题。
**回应**: 社区建议在每次 agent 操作后检查上下文，而非等到 provider 溢出。
🔗 [earendil-works/pi Issue #6879](https://github.com/earendil-works/pi/issues/6879)

### 🥈 #7730 macOS 长期会话 CPU 占用过高
**作者**: gterzian｜更新: 08-12｜评论: 11｜👍: 8
**为什么重要**: 运行 Pi 时 CPU 在 50-110% 间摆动，内存达 600-800MB，疑似与会话长度/上下文大小相关。macOS 用户高频反馈。
🔗 [earendil-works/pi Issue #7730](https://github.com/earendil-works/pi/issues/7730)

### 🥉 #7836 编辑模糊匹配因空白长度差异失配
**作者**: robjgray｜更新: 08-12｜评论: 9｜👍: 1
**为什么重要**: `normalizeForFuzzyMatch` 不折叠连续空白、不剥离开头空白，导致内容相同但空白不精确时 `oldText` 匹配失败，影响小型模型使用编辑工具。
🔗 [earendil-works/pi Issue #7836](https://github.com/earendil-works/pi/issues/7836)

### #7835 编辑工具拒绝单个对象的 edits 参数
**作者**: robjgray｜更新: 08-12｜评论: 4
**为什么重要**: 部分模型将 edits 包装为单个对象而非数组时工具直接抛错。数组形式可恢复，单对象则失败，暴露参数校验兼容性缺口。
🔗 [earendil-works/pi Issue #7835](https://github.com/earendil-works/pi/issues/7835)

### #8000 @ 文件自动补全：直接子项排名低于深层匹配
**作者**: cyzlmh｜更新: 08-13｜评论: 3
**为什么重要**: 在 `@~/<dir>/pro` 场景中，深层嵌套 basename 相同的匹配排在直接子项之前，用户想要的直接子项无法浮出。影响文件检索效率的日常体验。
🔗 [earendil-works/pi Issue #8000](https://github.com/earendil-works/pi/issues/8000)

### #7911 0.84.0 的 delta-only message_update 移除了 usage
**作者**: underactive｜更新: 08-12｜评论: 2
**为什么重要**: #7290 的修复移除了 message_update 上的累计 message 字段，但把 usage 也删了，导致 RPC 协议在 message_end 前拿不到 usage。已由 PR #7982 修复。
🔗 [earendil-works/pi Issue #7911](https://github.com/earendil-works/pi/issues/7911)

### #8018 DeepSeek: max_completion_tokens 被静默忽略，应用 max_tokens
**作者**: gwokhou｜更新: 08-12｜评论: 2
**为什么重要**: 内置 DeepSeek provider 发送了文档中不存在的参数，导致输出长度限制完全失效。属 provider 兼容性 bug。
🔗 [earendil-works/pi Issue #8018](https://github.com/earendil-works/pi/issues/8018)

### #7805 技能目录根级文档被误加载为技能
**作者**: dzplus｜更新: 08-12｜评论: 2
**为什么重要**: `README.md`、`AGENTS.md` 被当作独立技能并产生 validation 警告。破坏技能目录配置的干净体验，PR #8012 已修复。
🔗 [earendil-works/pi Issue #7805](https://github.com/earendil-works/pi/issues/7805)

### #7783 agent_end 处理器 sendMessage({triggerTurn:false}) 仍启动新回合
**作者**: Blue-B｜更新: 08-12｜评论: 3
**为什么重要**: 显示专用自定义消息不应触发新的助手回合，但内部仍进入 steer 路径。PR #8022 已修复。
🔗 [earendil-works/pi Issue #7783](https://github.com/earendil-works/pi/issues/7783)

### #8029 提示编辑器大缓冲移动性能极慢
**作者**: affanali2k3｜更新: 08-12｜评论: 1
**为什么重要**: 7000 行提示框中一次方向键移动耗时 1650ms，且随行数线性增长。编辑器核心体验问题，期待优化。
🔗 [earendil-works/pi Issue #8029](https://github.com/earendil-works/pi/issues/8029)

### 备注：值得关注的关闭项
- #7683 [已关闭] 组件接收自身行上的鼠标事件 —— 9 评论，已由 PR #8037/#8032 实现
- #7765 [已关闭] 全屏滚轮步长硬编码 1 行，请求可配置
- #3207 [已关闭] 部分 OpenAI 兼容代理拒绝 SDK metadata 头（9router 403）
- #7336 [已关闭] 工具结果就绪后代理回合永久卡死（RPC 模式）
- #8029 #8055 #8054 均为新提交的待讨论 issue

---

## 重要 PR 进展

### #7982 fix(coding-agent): 保留流事件中的累计 usage
**作者**: christianklotz
**功能**: 在 JSON/RPC `message_update` 上保留累计 provider usage，同时保持流大小线性；补充文档与回归测试。关闭 #7911。
🔗 [PR #7982](https://github.com/earendil-works/pi/pull/7982)

### #8042 feat(ai): 支持 Grok 4.6
**作者**: jackyshen0313
**功能**: 在 xAI Responses 模型集中新增 Grok 4.6，支持 low/medium/high/xhigh 四档推理强度。
🔗 [PR #8042](https://github.com/earendil-works/pi/pull/8042)

### #8049 feat: 通过本地模型代理使用 Ollama 模型
**作者**: DenisRaskovalov
**功能**: 新增两个零依赖 Node.js 脚本，可跨 Ubuntu/macOS/Windows 调用本地 Ollama 模型。社区对本地模型的呼声持续走高。
🔗 [PR #8049](https://github.com/earendil-works/pi/pull/8049)

### #8037 & #8032 feat(tui): 向组件分派鼠标事件（onMouse）
**作者**: FradSer / PierrunoYT
**功能**: 实现 #7683 的 `Component.onMouse(event)` 钩子，让扩展组件可在 TUI 全屏模式中接收鼠标事件并做命中测试。两个实现并行推进，最终合并方向值得关注。
🔗 [PR #8037](https://github.com/earendil-works/pi/pull/8037)｜[PR #8032](https://github.com/earendil-works/pi/pull/8032)

### #8022 fix: triggerTurn: false 不应启动新回合
**作者**: cristinaponcela
**功能**: 修复 #7783，`sendCustomMessage()` 不再对所有消息走 agent.steer() 流式路径。
🔗 [PR #8022](https://github.com/earendil-works/pi/pull/8022)

### #8012 fix: 不将根级 .md 文档作为技能加载
**作者**: cristinaponcela
**功能**: 修复 #7805，仅当 `--skill` 目录根目录文件解析出技能 frontmatter 且含名称时才视为技能。
🔗 [PR #8012](https://github.com/earendil-works/pi/pull/8012)

### #7956 feat(coding-agent): HTML 导出渲染 Mermaid 图
**作者**: aliou
**功能**: 复用 TUI 工具调用的 ANSI→HTML 转换代码，使 HTML 导出的 Mermaid 图可切换显示。后续 #8041 还提议补 LaTeX 支持。
🔗 [PR #7956](https://github.com/earendil-works/pi/pull/7956)

### #5262 feat(ai): 新增 Anthropic Vertex provider
**作者**: MichaelYochpaz
**功能**: 面向 Google Cloud Vertex AI 的 Claude 适配器，复用现有 Anthropic Messages 流式路径。
🔗 [PR #5262](https://github.com/earendil-works/pi/pull/5262)

### #8044 fix(bedrock): 暴露安全的流故障诊断
**作者**: ShravanSunder
**功能**: 为 Bedrock 发送/流事件/流完成分类诊断，EOF 未及终态时安全标记为临时故障，保留工具调用元数据。
🔗 [PR #8044](https://github.com/earendil-works/pi/pull/8044)

### #7722 feat(coding-agent): 主题覆盖 --use-theme
**作者**: rwachtler
**功能**: 单主题 `pi --use-theme dark` 或昼夜主题 `pi --use-theme dayowl/nightowl`，覆盖当前会话的存储主题。
🔗 [PR #7722](https://github.com/earendil-works/pi/pull/7722)

### 其他值得关注
- #8030 feat(ai): MiniMax 图生图（全局 + CN API）
- #8014 feat(ai): 同步语音生成
- #4112 fix(ai): 小米 MiMo 默认切换为 API 计费，按区域拆分 token 套餐
- #8052 fix(coding-agent): 会话持久化事务化
- #7970 feat(coding-agent): 转录本向上滚动时状态栏显示 ↓
- #7713 feat: 带 telemetry 的 StreamAssistant（harness v2）
- #7976 DRAFT: agent harness（早期设计稿）
- #8039 feat: /add-local-model 示例扩展
- #8024 docs: 开发环境/TESTING/项目结构刷新

---

## 功能需求趋势

从全部 Issues 和 PR 可以提炼出以下五大社区关注方向：

**① 新模型/Provider 支持（最热）**
- 新增：Grok 4.6、Anthropic Vertex、MiniMax 图生图、Scaleway Generative APIs、Ollama 本地模型代理（#8050/#8049）、llama.cpp 全模型列表展示（#8051）
- 修复：DeepSeek 参数兼容性、小米/9router 计费与代理兼容

**② TUI 交互增强（高频）**
- 组件鼠标事件（#7683/#8037/#8032）
- 全屏滚轮步长可配置（#7765）
- 行中间 `/` 触发命令菜单（#8015）
- 主题覆盖（#7722）、转录本滚动指示器（#7970）
- CJK 终端下模糊宽度字符对齐（#8055）

**③ 上下文管理与性能（稳定性优先）**
- 自动压缩触发时机（#6879）
- macOS CPU 占用（#7730）
- 提示编辑器大缓冲性能（#8029）

**④ 编辑/工具调用可靠性**
- 模糊匹配空白归一化（#7836）
- 单对象 edits 参数容错（#7835）
- tool-use 回合永久卡死（#7336）

**⑤ 协议与扩展 API 完善**
- 流事件保留 usage（#7911/#7982）
- triggerTurn:false 语义修复（#7783/#8022）
- 扩展钩子隐藏/替换助手消息（#8035）
- 自定义消息发布确认（#8023）

---

## 开发者关注点

- **上下文管理是最大痛点**：#6879 获得 17 个 👍，用户期待在每次 agent 操作后主动检查上下文而非等 provider 报错；相关的高 CPU 占用（#7730）也指向长会话性能劣化。
- **工具调用容错性需求强烈**：编辑工具对空白差异和单对象参数的失败（#7836/#7835）影响小型模型和真实场景的可用性；agent 回合卡死（#7336）的偶发问题仍未彻底解决。
- **Provider/API 兼容性坑多**：DeepSeek 静默忽略参数（#8018）、OpenAI 兼容代理拒绝 metadata 头（#3207）、流事件丢失 usage（#7911），反映多供应商适配仍需系统性加固。
- **本地模型是明确的社区诉求**：Ollama 代理（#8050/#8049）、llama.cpp 全模型显示（#8051）、Scaleway 开源权重托管（#6165）等多个 issue/PR 指向「本地/欧洲托管 + 零数据留存」场景。
- **扩展 API 语义需要更精确**：triggerTurn 误启动回合、自定义消息确认、消息显示控制（#8035）等表明开发者对扩展可控性有更高要求。
- **细节体验回归**：settings.json 丢失末尾换行（#8009）、断线重连失败（#8008）、WSL 路径无法被 Windows Terminal 打开（#8054）、自动补全排序偏差（#8000），这些问题虽小但直接触达日常使用场景。

---

*数据来源: [github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)（现 earendil-works/pi）*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-13）

## 今日速览

今日 Qwen Code 发布 Desktop v0.2.1 与 v0.2.0 两个桌面端迭代，重点修复 Web Shell 历史分页与默认内存作用域；社区 24 小时内 50 条 Issue / 50 条 PR 保持活跃，长任务自动运行可靠性、0.21.2 图片加载回归、Vertex AI 认证问题成为开发者讨论焦点。serve 守护进程的空 channel 处理、session 恢复保护等基础设施改进也在密集推进中。

## 版本发布

### desktop-v0.2.1
- **refactor(serve)**：默认项目内存调整为工作区作用域（PR [#8856](https://github.com/QwenLM/qwen-code/pull/8856)）
- **feat(telemetry)**：对齐会话生命周期事件上报

### desktop-v0.2.0
- **fix(web-shell)**：稳定化 transcript 历史分页逻辑（PR [#8914](https://github.com/QwenLM/qwen-code/pull/8914)）
- **feat(web-shell)**：新增会话目录共享能力

> dsw-eas-smoke-20260812：非生产基础设施 smoke 验证，不发布 SWE 分数。

## 社区热点 Issues

精选过去 24 小时内更新最活跃、影响面最大的 10 个 Issue：

### 1. [RFC] 可靠自动内存召回：时机、质量与遥测（[#7040](https://github.com/QwenLM/qwen-code/issues/7040)）
内存召回机制设计文档，10 条评论。PR #7393（召回投递遥测）已合并，PR #8716（有界首轮召回 + 确定性快速路径 + 多语言评测）正在评审中，且 2 号 PR 设计在实测后已修订。

### 2. 不能自动运行：长任务执行卡死（[#8963](https://github.com/QwenLM/qwen-code/issues/8963)）
中文用户反馈无论 yolo 还是 auto 模式，执行 Python 脚本或长命令时卡住不动，无法完成数小时乃至数天的长任务，并直言 "kimi code 完胜"。9 条评论，直指自动化场景的核心痛点。

### 3. [回归] 0.21.2 起加载图片即崩溃（[#8957](https://github.com/QwenLM/qwen-code/issues/8957)）
用户报告从 0.21.1 升级后，读取图片瞬间 crash。8 条评论，确认是 0.21.2 引入的回归问题，需紧急定位。

### 4. [P1] 大会话恢复超时时应保留当前会话（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)）
P1 级 session 管理缺陷。PR #8691 已实现超时契约与可观测性，目前正在推进后续修复。7 条评论。

### 5. tmux 环境下闪屏问题（[#8562](https://github.com/QwenLM/qwen-code/issues/8562)）
用户通过 iTerm2 → SSH → tmux 使用 Qwen Code 时，对话过程屏幕闪烁。用户用 Qwen 3.8 Max 排查后定位到 Qwen Code 版本问题。7 条评论。

### 6. 后台 Agent 协调缺陷：重复工作、提前完成、send_message 非交互（[#8097](https://github.com/QwenLM/qwen-code/issues/8097)）
多个后台 Explore 子代理并行 + send_message 中途通信时出现三类协调失败。6 条评论，反映多智能体场景还不够成熟。

### 7. --approval-mode 与 --auth-type 已注册但未显示在 --help（[#8897](https://github.com/QwenLM/qwen-code/issues/8897)）
0.21.9 中两个参数实际生效但 `qwen --help` 不展示，CLI 文档与实现不一致。5 条评论，开发者体验问题。

### 8. Vertex AI 无法使用 ADC 认证，强制要求 API Key 且任意值均产生 401（[#9016](https://github.com/QwenLM/qwen-code/issues/9016)）
正确配置 GOOGLE_APPLICATION_CREDENTIALS 后仍要求 API key，任何 key 值都禁用 ADC 并返回 401。4 条评论，影响 GCP 用户。

### 9. [P1] main 分支 CI 失败：E2E Tests 未报告结果即失败（[#9015](https://github.com/QwenLM/qwen-code/issues/9015)）
自动机器人跟踪的 P1 流程阻塞，Run ID 31609744914，需排查基础设施或测试稳定性问题。

### 10. Shell 忽略 tools.truncateToolOutputThreshold 配置（[#8922](https://github.com/QwenLM/qwen-code/issues/8922)）
官方文档声明该设置适用于 Shell，但 Shell 仍使用固定 30,000 字符预算，配置不生效。4 条评论。

## 重要 PR 进展

以下 10 个 PR 在过去 24 小时有更新，覆盖 serve、web-shell、CLI、SDK、扩展机制等方向：

### 1. feat(serve): 空 channel 集合时 no-op，仅恢复活跃 channel（[#8978](https://github.com/QwenLM/qwen-code/pull/8978)）
解决 `qwen serve --channel all` 在无配置 channel 时 exit(1) 的问题，改为优雅 no-op，避免守护进程整体退出。直接回应 Issue [#8975](https://github.com/QwenLM/qwen-code/issues/8975)。

### 2. feat(core): 工作流 agent 可固定目录并突破默认边界（[#8972](https://github.com/QwenLM/qwen-code/pull/8972)）
允许工作流脚本通过 `agent({workingDir})` 将子代理固定到调用方已有的 git worktree，不创建不清理，并延长时间边界，增强工作流子代理的执行能力。

### 3. feat(serve): live-journal 容量自适应增长（[#8905](https://github.com/QwenLM/qwen-code/pull/8905)）
in-flight turn 超出 per-session live-journal 上限时，先按比例扩容再丢弃最老 replay 条目，减少长会话中途被截断的问题。

### 4. feat(web-shell): 支持工作区文件上传（[#8874](https://github.com/QwenLM/qwen-code/pull/8874)）
Web Shell 编辑器支持拖放文件或通过 `@` 面板选择上传，提供多文件顺序上传、进度、取消、自动重命名冲突和内联预览。

### 5. feat(cli): 为 /review 添加 attribution、默认 effort 与默认评论设置（[#8994](https://github.com/QwenLM/qwen-code/pull/8994)）
新增三个用户级设置，仅从 system → user → system 作用域解析，仓库 `.qwen/settings.json` 无权控制评审策略，防止仓库内容操纵评审行为。

### 6. fix(extensions): 双清单扩展中保留 Claude hooks（[#8626](https://github.com/QwenLM/qwen-code/pull/8626)）
导入 Claude 兼容 hooks 时保留 Qwen/Gemini 扩展资源，并区分 marketplace 条目安装与直接扩展根安装，修复 Discover / CLI 安装链路。

### 7. fix(review): 修复内联引用缺口并加固 layer gate（[#9020](https://github.com/QwenLM/qwen-code/pull/9020))
对已合并的 #8956 的 follow-up：改用权威 CommonMark 解析器闭合内联级引用差距，并加固缺陷层门禁逻辑。

### 8. feat(channels): sessionRotation 限制会话生命周期（[#8927](https://github.com/QwenLM/qwen-code/pull/8927)）
新增 per-channel `sessionRotation` 选项，支持 `maxTurns` 与 `maxAgeMillis` 两种边界，路由在 session 过期后自动开启新会话。

### 9. fix(sdk): Python/Java SDK 支持 "auto" 权限模式（[#9003](https://github.com/QwenLM/qwen-code/pull/9003)）
补齐 SDK 与 CLI / TypeScript SDK 对齐，更新校验列表、错误提示与 README。对应 Issue [#9002](https://github.com/QwenLM/qwen-code/issues/9002)。

### 10. fix(serve): 按字节限制 ACP HTTP pre-attach 缓冲区（[#9007](https://github.com/QwenLM/qwen-code/pull/9007)）
防止 pre-attach 阶段缓冲区无界增长导致内存压力，属于资源保护加固。

## 功能需求趋势

从近期 Issue 与 PR 中可提炼出以下社区重点方向：

- **长任务与自动化可靠性**：用户明确要求能稳定跑数小时以上的任务（[#8963](https://github.com/QwenLM/qwen-code/issues/8963)），以及 headless 模式在模型安静结束时不应硬失败（[#9026](https://github.com/QwenLM/qwen-code/issues/9026)）。
- **记忆与上下文管理**：自动内存召回的质量、时机与遥测（[#7040](https://github.com/QwenLM/qwen-code/issues/7040)）、守护进程资源保护拆分（[#8091](https://github.com/QwenLM/qwen-code/issues/8091)）、工具输出预算硬化和 artifact 生命周期（[#7306](https://github.com/QwenLM/qwen-code/issues/7306)）。
- **Session 生命周期与恢复**：大 restore 超时保护（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)）、MAX_TOKENS 恢复后 transcript 不一致（[#8979](https://github.com/QwenLM/qwen-code/issues/8979)）、Web Shell 会话导航不应取消或重放 prompt（[#8923](https://github.com/QwenLM/qwen-code/issues/8923)）。
- **认证与云集成**：Vertex ADC 认证修复（[#9016](https://github.com/QwenLM/qwen-code/issues/9016)）、Anthropic wire 缺失流安全保护（[#9005](https://github.com/QwenLM/qwen-code/issues/9005)）。
- **UI 稳定性**：tmux 闪屏（[#8562](https://github.com/QwenLM/qwen-code/issues/8562)）、桌面端 scrollbar 抖动（[#8985](https://github.com/QwenLM/qwen-code/issues/8985)）、Web Shell 手动会话名保留（[#8977](https://github.com/QwenLM/qwen-code/issues/8977)）。
- **CLI 与配置一致性**：--help 缺失参数（[#8897](https://github.com/QwenLM/qwen-code/issues/8897)）、truncateToolOutputThreshold 不生效（[#8922](https://github.com/QwenLM/qwen-code/issues/8922)）、死亡配置项清理（[#8754](https://github.com/QwenLM/qwen-code/pull/8754)）。

## 开发者关注点

- **长任务执行不可靠是最强痛点**：用户在 [#8963](https://github.com/QwenLM/qwen-code/issues/8963) 中直接对比竞品，要求增加 "无脑接受模式" 或类似机制；多后台代理协调缺陷（[#8097](https://github.com/QwenLM/qwen-code/issues/8097)）也表明自动化场景尚未达到生产级。
- **版本回归伤害信任**：0.21.2 图片加载崩溃（[#8957](https://github.com/QwenLM/qwen-code/issues/8957)）说明需要更严格的回归测试门禁；main 分支 CI 失败（[#9015](https://github.com/QwenLM/qwen-code/issues/9015)）也影响发布节奏。
- **配置文档与实现频繁不一致**：多起配置项 "声明生效但实际不生效" 或 "已注册但不展示" 的问题，开发者希望文档、schema、运行时三者严格对齐。
- **云厂商认证流程仍需打磨**：Vertex AI 的 ADC 认证被 API key 逻辑阻断（[#9016](https://github.com/QwenLM/qwen-code/issues/9016)），SDK 权限模式与 CLI 不一致（[#9002](https://github.com/QwenLM/qwen-code/issues/9002)），增加企业用户接入成本。
- **后台轮询与错误提示噪音**：Web Shell 静默轮询仍需区分瞬时错误与硬错误（[#7834](https://github.com/QwenLM/qwen-code/issues/7834)），`ask_user_question` 静默返回取消也不展示原因（[#9011](https://github.com/QwenLM/qwen-code/issues/9011)），交互透明度有待提升。

---
*本日报由 GitHub 数据自动生成，仅供技术社区参考。*

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI（CodeWhale）社区动态日报 — 2026-08-13

> 数据源：github.com/Hmbown/CodeWhale（原 DeepSeek-TUI，现已更名 CodeWhale）

## 今日速览

- **v0.9.6 发布，产品正式更名 CodeWhale**：npm 旧包 `deepseek-tui` 停止维护，项目以 Shannon Labs 的 CodeWhale 名义继续演进。
- **社区贡献 harvest 流程活跃**：3 个社区 PR 因 base 漂移无法从 fork 直接合入，由维护者通过 harvest 流程落地（会话快照、OrcaRouter 提供商、复制消息去装饰）。
- **v0.9.5 出现严重回归**：Auto-Review 模式静默阻止所有 Bash 调用和写操作（#5323），已有多名用户受影响，社区关注修复进展。

## 版本发布

### v0.9.6（2026-08-12）
- **CodeWhale 正式亮相**：作为 Shannon Labs 的公共产品，`codewhale` 命令、npm 包及 release 资产统一使用小写技术标识。
- **旧包弃用**：`deepseek-tui` npm 包已弃用，不再接收新版本。
- **迁移提示**：从 v0.8.x 旧版 `deepseek`/`d...` 升级的用户需关注兼容性变化（release notes 部分内容截断，详见 GitHub）。

## 社区热点 Issues

1. **[严重回归] Auto-Review 模式静默阻止 Bash 调用（#5323）**  
   升级到 v0.9.5 后，Auto-Review 从 v0.8.x 的自动批准变为静默阻止所有“破坏性”操作，自动化流程难以继续。3 条评论，均为附议。  
   https://github.com/Hmbown/CodeWhale/issues/5323

2. **[社区讨论] “Constitution”中文翻译之争（#4949）**  
   PR #4908 引入“宪法”翻译，引发关于政治敏感性和词义贴合度的辩论。9 条评论，目前仍无定论，中文母语者被邀请参与讨论。  
   https://github.com/Hmbown/CodeWhale/issues/4949

3. **[功能需求] 请求增加 `/stop` 命令（#4959）**  
   YOLO 模式或自主工作流中，`stop` 文本指令被模型忽略，需要强制停机机制。8 条评论，呼声较高。  
   https://github.com/Hmbown/CodeWhale/issues/4959

4. **[严重 bug] File 工具静默接受错误参数并假报成功（#5209）**  
   `action=edit` 模式下，错误参数名（如 `new_str`）不报错，反而返回“Replaced successfully”，导致同一位置需 3–5 次重复编辑。用户 `yekern` 提供了详细复现。  
   https://github.com/Hmbown/CodeWhale/issues/5209

5. **[EPIC] CodeWhale TUI Crate 分解（#5316）**  
   EPIC-005 的总跟踪 issue，目标是拆分庞大 TUI crate，所有子任务和 PR 都挂在该 issue 下。5 条评论，维护者主导的大型重构。  
   https://github.com/Hmbown/CodeWhale/issues/5316

6. **[bug] 切换供应商后保留不相关的默认模型（#5034）**  
   切换到 OpenAI 后仍保留 `gpt-5.5` 等旧模型，供应商和模型解析未作为整体更新，导致跨提供商配置残留。已关闭。  
   https://github.com/Hmbown/CodeWhale/issues/5034

7. **[社区关切] YouTube 称 Reasonix 才是 DeepSeek 官方代理（#5097）**  
   社区成员发现外部视频声称 Reasonix 为 DeepSeek 官方编码代理，引发对 CodeWhale 定位的讨论。已关闭，但讨论反映项目需要更清晰的官方背书。  
   https://github.com/Hmbown/CodeWhale/issues/5097

8. **[Web i18n] 完成字典主线，消除所有 `isZh` 分支（#5337）**  
   继续推进 #4934 的 i18n 重构，将页面正文迁移到 getChrome(locale)/getHome(locale) 模式，当前文档指南页仍有大量硬编码分支。  
   https://github.com/Hmbown/CodeWhale/issues/5337

9. **[回归] 宽终端下输出区域不填满屏幕（#5322）**  
   v0.8.65 之前输出区域可扩展至终端全宽，v0.9 中被限制最大宽度，宽屏用户感到拥挤。2 条评论，确认回归。  
   https://github.com/Hmbown/CodeWhale/issues/5322

10. **[功能需求] 支持为不同 API 提供商保存多个 Key（#5250）**  
    用户同时使用 DeepSeek 和 GLM，每次切换模型都要重新获取 API key，希望为不同提供商分开保存密钥。已关闭。  
    https://github.com/Hmbown/CodeWhale/issues/5250

## 重要 PR 进展

1. **[架构] FEAT-014 命令契约 crate 边界（#5328）**  
   为 TUI 命令提取定义 facets + 共享类型，属 EPIC-005/006 的一部分。当前为 draft，不涉及生产逻辑改动。  
   https://github.com/Hmbown/CodeWhale/pull/5328

2. **[引擎修复] 抑制子进程 shell 完成事件（#5339）**  
   过滤子进程后台 shell 的完成事件，避免污染父模型流，已附带回归测试。  
   https://github.com/Hmbown/CodeWhale/pull/5339

3. **[新功能] 终端窗口固定为置顶迷你窗口（#5333）**  
   Harvest 自社区 PR #5318（作者 SparkofSpike），支持将宿主终端窗口缩小为 640×400 并置顶（PiP），再次触发恢复原大小。  
   https://github.com/Hmbown/CodeWhale/pull/5333

4. **[修复] 分离会话快照读取与崩溃恢复（#5330）**  
   Harvest 自社区 PR #5320（作者 h3c-hexin），新增 `load_session_snapshot` 做无副作用读取，崩溃恢复仅在实际重启后触发。  
   https://github.com/Hmbown/CodeWhale/pull/5330

5. **[MCP 合规] 无下一页时省略 nextCursor（#5336）**  
   修复 `serve --mcp` 返回 `"nextCursor": null` 的问题——MCP 规范要求该字段必须是字符串或缺失，`null` 会被 Claude Code 等严格客户端拒绝。  
   https://github.com/Hmbown/CodeWhale/pull/5336

6. **[配置] 注册 OrcaRouter 为命名提供商（#5332）**  
   Harvest 自社区 PR #5321（作者 XiaoHuo888-hue），以 OpenAI 兼容网关方式接入 OrcaRouter，一个 `ORCAROUTER_API_KEY` 可访问 150+ 模型。  
   https://github.com/Hmbown/CodeWhale/pull/5332

7. **[TUI 修复] 复制消息时去除视觉装饰（#5331）**  
   Harvest 自社区 PR #5319（作者 XhesicaFrost），修复“Copy message”包含角色符号 `●` 和换行前缀 `▏` 的问题，改为复制原始内容。  
   https://github.com/Hmbown/CodeWhale/pull/5331

8. **[安全] lru 升级至 0.18，修复 RUSTSEC-2026-0253（#5329）**  
   `lru 0.16.4` 的 `LruCache::pop()` 存在 panic 安全风险，升级到 0.18.2 并取消对 ratatui-core 的 pin，恢复 main 分支绿色门禁。  
   https://github.com/Hmbown/CodeWhale/pull/5329

9. **[新功能] 交互式扩展管理器（#5327）**  
   新增本地化的 `/plugin` 和 `/plugins` 管理器，集中管理 bundle 生命周期（消化绑定控制），保留传统可执行工具为只读项，明确 Marketplace 边界。  
   https://github.com/Hmbown/CodeWhale/pull/5327

10. **[Web i18n] 文档指南页迁移至字典主线（#5338）**  
    第一个 #5337 的切片 PR，移除 `docs/guide/page.tsx` 中的 `isZh` 三分支，以 Dictionary 模式重写，为后续页面迁移建立可复用范式。  
    https://github.com/Hmbown/CodeWhale/pull/5338

## 功能需求趋势

- **可靠性 / 回归修复**：多个 issue 直指 v0.9.5 行为回退（#5323、#5322、#5209），社区对发布质量门禁要求明显提高。
- **强制控制机制**：`/stop` 命令（#4959）和可配置审查模式成为高频诉求，用户希望在自主工作流中保持人工控制权。
- **多提供商 / 多密钥支持**：除 DeepSeek 外，用户开始使用 GLM、OrcaRouter 等聚合网关（#5250、#5332），需要更灵活的 API key 管理。
- **i18n 纵深推进**：从界面文案（#4949）到内容管理后台（#5337、#5334），中文本地化从“翻译”转向“文化适配”，并趋向统一框架。
- **架构现代化**：EPIC-005/006 crate 分解（#5316、#5328）显示项目正为更高的可维护性和插件化铺路。

## 开发者关注点

- **发布质量门禁不足**：#5323 和 #5322 是 v0.9.5 的明显回归，却进入了正式版，开发者呼吁引入更严格的 dogfood 和回归测试门禁。
- **工具调用的“假成功”问题**：#5209 中 File 工具不报错但实际未生效，比直接报错更具隐蔽性和破坏性，拖慢迭代效率。
- **配置持久化割裂**：API 密钥有时只存在当前仓库的 `.codewhale/config.toml` 明文里，换项目即丢失，存在安全隐患（#5047）。
- **子代理输出契约过重**：#5189 指出每个子任务要求 `SUMMARY/EVIDENCE/CHANGES/RISKS/BLOCKERS` 等大量格式，对小型任务过于繁琐，阻碍快速完成。
- **Windows 体验欠缺**：#4564 中 `--model` 和 `--toolsets` 参数在 Windows 上被拼接为单个参数，CLI 跨平台一致性仍待加强。
- **社区 PR 合入门槛**：harvest 流程解决了 base 漂移问题，但也反映出外部贡献者难以直接合入的现状，流程透明度和贡献者体验需改善。

---

> 注：本文中“今日”指 2026-08-13 发布周期，数据取自截至 2026-08-12 的 GitHub 仓库最新状态。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*