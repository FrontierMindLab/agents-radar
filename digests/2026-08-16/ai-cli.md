# AI CLI 工具社区动态日报 2026-08-16

> 生成时间: 2026-08-15 23:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-16）

## 1. 生态全景

当前 AI CLI 工具已从"单点代码生成"演进为覆盖编码、审查、多代理协作、CI/CD 的完整工作流入口。社区关注重心正从功能数量转向**可靠性**——认证链路稳定性、子代理状态真实性、会话数据一致性成为跨工具高频痛点。**成本透明化**（配额、用量、缓存命中率）与**跨平台质量**（Windows/macOS/Linux）开始主导用户满意度。各工具普遍通过行为评估（evals）与 CI 加固建立质量护栏，呈现"模型层多极化、工具层趋同化、体验层差异化"格局。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PRs | Release | 关键热度信号 |
|------|:---:|:---:|------|------|
| Claude Code | 10 | 3 | 无 | 单 issue 最高 15 评论/9👍；OAuth 为最大痛点 |
| OpenAI Codex | 10 | 10 | rust-v0.148.0-alpha.19 | #20214 评论 104/👍85，Windows 信任危机 |
| Gemini CLI | 10 | 10 | v0.56.0-nightly.20260815 | 3 个 P1 级 Agent 可靠性 bug；evals 快速扩张 |
| GitHub Copilot CLI | 10 | 2 | v1.0.81-0 | MCP OAuth 回归 + NixOS 兼容问题（👍9） |
| Kimi Code CLI | 5 | 2 | 无 | 记忆系统 40 评论未落地；配额缩水实测投诉 |
| OpenCode | 10 | 10 | 无 | 订阅计费争议集中；V2 架构 PR 密集 |
| Pi | 10 | 10 | 无 | 压缩机制失效 17👍；多提供商适配活跃 |
| Qwen Code | 10 | 10 | v0.21.11-nightly | /review 管线 4 个并行 bug；P1 CI 失败 |
| DeepSeek TUI | 10 | 10 | 无（v0.9.8 收尾） | macOS 乱码 + CI 假绿修复；稳定化批量合入 |
| Grok Build | 0 | 0 | 无 | 24h 无活动 |

注：Issue/PR 数为日报精选数，非当日全量。

## 3. 共同关注的功能方向

**① 认证与授权链路韧性**
- Claude Code：OAuth 刷新 400（#54443）、瞬时 5xx 损坏凭据（#61912）
- Copilot CLI：Atlassian MCP OAuth RFC 8414 回归（#4480/#4490）
- Gemini CLI：401 误判修复（#28827）、Vertex 认证引导（#28679）
- Pi：WSL 设备授权登录挂起（#6187）

核心诉求：上游瞬时故障不应导致持久登录失效。

**② 会话/上下文管理（记忆、压缩、持久化）**
- Kimi：#1283 记忆系统 40 评论；#2603 配额感知压缩
- Pi：#6879 自动压缩不触发（17👍）
- Qwen：#9230 前缀缓存复用率 ~0%
- Claude Code：#71729 Windows 会话历史静默丢失
- Codex：#35746 分页历史丢失/序号重用

核心诉求：上下文在跨会话、长任务、故障场景下可靠延续。

**③ 子代理/多代理可靠性**
- Gemini：#22323 子代理假"GOAL 成功"；#21409 generalist 无限挂起
- Copilot：#3565 subagent 模型静默降级；#4491 /spawn 跨 session 写入
- Claude：#86671 跨会话消息显示但不入队（回归）
- Qwen：#9205 并发 review 竞争 worktree

核心诉求：代理状态真实可见，禁止静默降级与假成功。

**④ 计费与配额透明度**
- Kimi：#2604 实测配额缩水 3-5 倍
- OpenCode：#37790 付款后无额度；#32911 Deepseek 过度计费
- Codex：#15281 /status 用量展示（22👍）
- Copilot：#4500 BYOK 破坏 prompt cache（成本↑）

核心诉求：用量、成本、余额的实时可视化与可验证性。

**⑤ MCP 生态成熟化**
- Claude：#66084 延迟工具索引不刷新
- Copilot：#4346 CI 中 registry 403；#4421 握手 60s 超时无重试
- Codex：PR #38705 为 hooks 添加 MCP 工具支持

核心诉求：MCP 在 CI/stdio/远程场景的稳定性与运行时动态变更能力。

**⑥ Windows/桌面端稳定性**
- Codex：5+ 个 Issue 指向 Electron 主进程忙循环、系统级鼠标卡顿
- Copilot：#4499 Windows OOM 崩溃
- Pi：#8170 taskkill 可杀死自身宿主进程
- Claude：#71729 Windows 桌面会话丢失

核心诉求：桌面端性能回归应作为 P0 级问题优先处理。

**⑦ 安全边界与误报治理**
- Claude：PR #86870 引入授权实验室上下文标志，治理 CVP 误报
- Gemini：PR #28725 修复 SSRF（CVSS 8.6）
- Qwen：#9089 autofix PAT 与不可信代码共享主机
- DeepSeek TUI：PR #5401 修复 19 个 CodeQL 告警

核心诉求：安全过滤器需结合用户意图与上下文，减少对合法开发的打断。

## 4. 差异化定位分析

| 工具 | 定位 | 目标用户 | 技术路线特征 |
|------|------|---------|-------------|
| **Claude Code** | 企业级全功能 CLI（OAuth/Cowork/IDE 扩展/MCP） | 大团队、Anthropic 生态 | 功能覆盖面最广，处于维护收敛期，稳定性被放大审视 |
| **OpenAI Codex** | OpenAI 桌面应用 + CLI 一体化入口 | ChatGPT/Codex 生态深度用户 | 侧重基础设施可观测性（healthz、doctor 存储诊断）；Windows 性能是信任短板 |
| **Gemini CLI** | Agent 原生 CLI（子代理/Skills/Auto Memory） | 看重 Agent 能力边界的开发者 | evals 驱动开发（76 个评估测试），工程验证导向 |
| **Copilot CLI** | GitHub 生态自动化终端（Actions/Codespaces/autopilot） | GitHub 重度用户、CI 场景 | 版本保守（v1.0.x），BYOK 模型；MCP 与跨平台是短板 |
| **Kimi Code CLI** | Moonshot 模型入口 | 中文用户、Kimi 订阅用户 | 社区规模小但需求集中；记忆系统与配额成本是两大悬而未决项 |
| **OpenCode** | 开放多模型聚合器（Go/Zen 订阅 + 自托管） | 多模型切换、追求开源可控 | V2 架构重构：事件系统、Docker/Incus 沙箱工作区 |
| **Pi** | 多提供商路由 + 极致 TUI | 自托管/多模型重度用户 | 压缩机制与渲染质量为投入重点；插件扩展系统活跃 |
| **Qwen Code** | 工程化审查 + Web Shell（Qwen 模型） | 中文开发者、CI 集成为主 | /review 管线、autofix 差异化；但被 CI 稳定性拖累 |
| **DeepSeek TUI** | Rust 高性能终端 + bwrap 沙箱 | 自托管、终端性能敏感用户 | v0.9.8 稳定化收尾；第三方模型模板扩展通用性 |
| **Grok Build** | xAI 生态 | — | 早期阶段，暂无法评估 |

## 5. 社区热度与成熟度

- **声量最大/争议最集中**：**OpenAI Codex**。单 issue 104 评论、85👍，Windows 性能问题跨多个版本持续三月未收敛，用户情绪明显恶化。
- **需求沉淀最深/生态最成熟**：**Claude Code**。热点覆盖认证、桌面端、IDE、多代理，官方批量清理 stale issue 并回应安全误报（PR #86870），处于"成熟但需止血"阶段。
- **迭代速度最快**：**Gemini CLI** 与 **Qwen Code**。前者每日 nightly + 10 PR + evals 体系扩张；后者 /review 管线 24h 内 4 个修复 PR 并行推进。
- **快速增长期**：**OpenCode**（V2 事件系统、沙箱工作区、插件订阅）与 **Pi**（多提供商适配、扩展 API）均处于架构升级窗口。
- **稳定化收尾期**：**DeepSeek TUI**（v0.9.8 稳定化）与 **Copilot CLI**（v1.0.x 小步更新）节奏较稳。
- **需求积压最明显**：**Kimi Code**。核心记忆系统需求 40 评论、近 6 个月未落地，团队响应速度与社区期待存在落差。

## 6. 值得关注的趋势信号

1. **可靠性取代功能成为第一竞争力**。子代理假成功（Gemini #22323）、模型编造对话（Claude #70148）、消息可见但不可达（Claude #86671）、上游占位响应（Qwen #8938）——"静默错误"是用户最无法接受的缺陷。行为评估体系（Gemini evals、Qwen SWE-bench smoke）正成为质量护栏标准配置。

2. **成本可观测性成为"新基本权利"**。从 Kimi 的配额实测投诉、OpenCode 的计费争议，到 Codex /status 需求和 Copilot BYOK cache 成本——用户要求对 token 消耗、缓存命中、配额余额具备实时可视化与可验证性。**配额感知压缩**（Kimi #2603）是值得关注的架构方向。

3. **Windows/桌面端是共同阿喀琉斯之踵**。Codex 的 Electron 忙循环、Copilot 的 OOM、Pi 的进程自杀、Claude 的会话丢失——桌面端稳定性正成为选型否决项，率先解决者将获得显著差异化优势。

4. **认证链路需要"故障弹性"设计**。OAuth 刷新、MCP 握手、设备授权在瞬时故障下的表现，本质是分布式系统韧性问题的延伸。本地状态机应容错上游抖动，而非将瞬时错误固化为持久失效。

5. **安全机制从"规则拦截"走向"上下文感知"**。Claude PR #86870 的授权实验室标志、Gemini 的确定性 redaction、Qwen 的 runner 隔离——安全过滤器正学习区分"恶意行为"与"授权研究/合法开发"，误报治理将成为安全体验的分水岭。

6. **多代理协作向协议化演进**。跨会话消息回执、时间戳/序列号（Claude #71429 提案）、子代理终止原因保真（Gemini #28815）——代理间通信从"尽力而为"走向"可靠投递"，分布式系统经典问题在 Agent 领域重演。

7. **MCP 标准化需补上"运行时动态"缺口**。工具索引刷新、握手超时重试、registry 权限——MCP 静态定义已趋于成熟，但运行时变更、CI 环境、远程认证等场景仍不完善，这将决定 MCP 作为通用工具协议的天花板。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills ｜ 统计截止：2026-08-16
> 说明：原始数据未含评论数明细，以下按仓库"评论数排序"顺序及近期活跃度综合评估。

---

## 1. 热门 Skills 排行（Top 8）

| 排名 | Skill / PR | 功能定位 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 对所有 Skill 描述恒报"recall=0%"的核心缺陷；同步修复 Windows 管道读取、触发检测与并行 worker | 对应 [#556](https://github.com/anthropics/skills/issues/556) 及 10+ 独立复现；直接瘫痪 description 优化闭环，是当前生态最痛的"元问题" | OPEN |
| 2 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制：孤词换行、寡行段落（页首孤立标题）、编号错位 | "这些问题影响 Claude 生成的每一份文档"——直击 AI 文档输出的高频隐性缺陷 | OPEN |
| 3 | **ODT 办公文档** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument 全流程：创建、模板填充、读取、ODT 转 HTML；覆盖 .odt/.ods/.odf | 补齐 ISO 开源办公格式支持，LibreOffice 生态用户呼声高 | OPEN |
| 4 | **testing-patterns** [#723](https://github.com/anthropics/skills/pull/723) | 全栈测试方法论：Testing Trophy 模型、AAA 模式、React Testing Library、测试命名与边界用例 | 社区对"让 Claude 系统化写测试"的需求集中体现，覆盖"测什么 vs 不测什么" | OPEN |
| 5 | **ServiceNow 平台技能** [#568](https://github.com/anthropics/skills/pull/568) | 企业级 ServiceNow 全平台助手：ITSM/ITOM/ITAM/SAM/FSM/HRSD/SecOps/CSDM/IntegrationHub | 单一 PR 覆盖最广的企业场景；更新至 08-12，是近期最活跃的 PR 之一 | OPEN |
| 6 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 基于 Pyxel 引擎 + 官方 MCP server 的像素/8-bit 游戏工作流（write → run_and_capture → inspect → iterate） | 创意娱乐类技能的代表作，自带 MCP 生态联动 | OPEN |
| 7 | **self-audit 自审计** [#1367](https://github.com/anthropics/skills/pull/1367) | 交付前双重审计：先机械化校验产物文件是否存在，再按破坏严重度做四维推理审计；通用任何项目/技术栈/模型 | 已迭代至 v1.3.0，与 [#1385](https://github.com/anthropics/skills/issues/1385) 提案呼应，社区关注"交付质量门禁" | OPEN |
| 8 | **skill-quality-analyzer + skill-security-analyzer** [#83](https://github.com/anthropics/skills/pull/83) | 两个元技能：质量分析（SKILL.md/示例/资源五维评估）与安全分析 | 社区开始用"技能治理技能"，标志生态进入自我完善阶段 | OPEN |

> 另注：贡献者 Lubrsy706 连续提交 pdf 大小写引用、docx 修订 ID 冲突、YAML 引号校验三个修复（[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)、[#539](https://github.com/anthropics/skills/pull/539)），是近期最活跃的修复型贡献者。

---

## 2. 社区需求趋势（来自 Issues）

| 趋势方向 | 代表 Issue | 需求要点 |
|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)（43 评论，🔥最热） | 社区技能借 `anthropic/` 命名空间分发，冒充官方技能，构成信任边界滥用——用户可能误授高权限 |
| **组织级共享与协作** | [#228](https://github.com/anthropics/skills/issues/228)（👍 8，最高赞） | 要求 Skill 在企业内直接共享/链接分发，替代手动下载-传输-上传的繁琐流程 |
| **基础设施稳定性** | [#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169)、[#1487](https://github.com/anthropics/skills/issues/1487)、[#189](https://github.com/anthropics/skills/issues/189) | 三连击：skill-creator 评估循环 0% 触发率；claude-api 单次注入 ~156k tokens 撑爆上下文；两个插件安装重复技能 |
| **技能消失与数据安全** | [#62](https://github.com/anthropics/skills/issues/62)、[#1175](https://github.com/anthropics/skills/issues/1175) | 用户技能莫名消失；SharePoint 在线文档的权限/上下文窗口安全设计咨询 |
| **新 Skill 方向提案** | [#412](https://github.com/anthropics/skills/issues/412)、[#1329](https://github.com/anthropics/skills/issues/1329)、[#1385](https://github.com/anthropics/skills/issues/1385) | 代理系统安全治理（agent-governance）、符号化压缩记忆（compact-memory）、三段式推理质量门禁 |
| **生态互操作** | [#16](https://github.com/anthropics/skills/issues/16)、[#29](https://github.com/anthropics/skills/issues/29) | 将 Skills 暴露为 MCP 接口（"MCP 是所有软件 API 的信号协议"）；AWS Bedrock 使用支持 |

---

## 3. 高潜力待合并 Skills（近期可能落地）

| PR | Skill | 潜力判断 |
|---|---|---|
| [#568](https://github.com/anthropics/skills/pull/568) | ServiceNow 平台 | 更新至 08-12，活跃度最高；企业级覆盖面极广，一旦合并将成最大单体技能 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel 游戏开发 | 作者即 pyxel-mcp 官方维护者（kitao），质量背书强，工作流完整 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 已迭代 v1.3.0，机制描述清晰（机械校验 + 四维推理），且已有配套 Proposal 在社区发酵 |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 普适性最强——所有 AI 生成文档都受排版问题影响，讨论热度高 |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 测试是开发者最高频场景之一，内容体系完整 |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT 办公文档 | 补齐开源办公格式空白，与现有 docx/pdf 形成文档矩阵 |
| [#1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene | 响应 #1417 社区诉求，为规划产物建立生命周期管理；多贡献者协作 |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求不是"更多功能型技能"，而是 Skill 基础设施的成熟与可信——修复 skill-creator 断裂的评估闭环、根治 `anthropic/` 命名空间的信任隐患、治理上下文窗口滥用；与此同时，一批"元技能"（质量分析、安全审计、自审计、治理）正在排队落地，标志着社区正从"用 Skill 造功能"进入"用 Skill 治理 Skill"的自我完善阶段。**

---

# Claude Code 社区动态日报 — 2026-08-16

## 今日速览
过去 24 小时内无新版本发布，但社区讨论持续升温：**OAuth 刷新流程故障**成为今日最集中的痛点（多条相关 issue 被反复提及），同时**Claude Desktop (Windows) 会话历史静默丢失**和 **VS Code 扩展焦点抢夺**等问题也获得了较多开发者共鸣。此外，一批集中在 6 月下旬的 duplicate/stale issue 在今日被批量关闭，其中多条涉及**安全策略误报**，值得关注。

---

## 社区热点 Issues（10 条）

### 1. OAuth 刷新返回 400，用户被强制重新登录
**#54443** — [OAuth refresh returns 400 after early 401 before local expiresAt; concurrent sessions forced to /login](https://github.com/anthropics/claude-code/issues/54443)
- 评论 15 | 👍 6 | 已关闭
- **为什么重要**：这是今日评论数最高的 issue。OAuth 令牌在本地 `expiresAt` 之前被服务端拒绝，刷新请求又返回 400，导致用户被迫反复执行 `/login`。影响所有使用 OAuth 登录的 CLI 用户，尤其是多会话并发场景。6 个 👍 说明不少用户同样遭遇此问题。

### 2. Claude Desktop (Windows)：`</> Code` 会话历史静默丢失
**#71729** — [Claude Desktop (Windows): `</> Code` conversation history silently lost on restart — and Claude doesn't detect the gap](https://github.com/anthropics/claude-code/issues/71729)
- 评论 9 | 已关闭
- **为什么重要**：Windows 桌面版用户关闭并重开应用后，整个 `</> Code` 会话记录（包括用户消息和 Claude 回复）全部消失，且模型本身未感知到上下文缺失。对依赖桌面端进行长会话开发的用户来说，这是数据丢失级别的严重问题。

### 3. `tools/list_changed` 不刷新延迟工具索引
**#66084** — [tools/list_changed doesn't refresh the deferred-tool / ToolSearch index in interactive sessions](https://github.com/anthropics/claude-code/issues/66084)
- 评论 8 | 👍 3 | 仍打开
- **为什么重要**：MCP 工具变更后，交互式会话中的延迟工具索引（ToolSearch）不会刷新，导致新工具无法被模型发现。这是 MCP 生态中的一个核心体验缺陷，即便在 2.1.165 上仍可复现，且是少数仍处于 OPEN 状态的 bug。

### 4. AskUserQuestion 对话框抢占 VS Code 输入焦点
**#45374** — [AskUserQuestion dialog steals focus and captures keystrokes while user is typing in VS Code](https://github.com/anthropics/claude-code/issues/45374)
- 评论 7 | 👍 7 | 已关闭
- **为什么重要**：开发者在 VS Code 输入框打字时，`AskUserQuestion` 对话框会突然抢走键盘焦点，导致输入内容被对话框捕获。👍 数高达 7，是今日点赞最多的 issue 之一，直接干扰 IDE 内的正常编码流程。

### 5. OAuth 刷新在瞬时 5xx 期间损坏凭据状态
**#61912** — [OAuth refresh corrupts credentials state during transient upstream 5xx → persistent 401 loop across sessions](https://github.com/anthropics/claude-code/issues/61912)
- 评论 7 | 已关闭
- **为什么重要**：上游 Cloudflare 5xx 瞬时故障期间触发 OAuth 刷新，会损坏本地凭据状态，导致跨会话持续 401 循环。与 #54443 同属 OAuth 稳定性问题，说明认证链路的健壮性是目前社区最关心的痛点之一。

### 6. VS Code 扩展：多会话标签间输入框焦点“乒乓”抖动
**#71809** — [VSCode extension: input box flickers and focus rapidly ping-pongs between multiple open session tabs](https://github.com/anthropics/claude-code/issues/71809)
- 评论 6 | 👍 4 | 已关闭
- **为什么重要**：同一 VS Code 窗口打开多个 Claude Code 会话标签时，输入框焦点在标签之间自动来回跳动，几乎无法输入。多会话并行是高级用户的常见用法，该问题直接影响 IDE 扩展的可用性。

### 7. AskUserQuestion 显示时 Chat 滚动被锁死
**#57691** — [Chat scroll is constrained to most recent assistant turn while AskUserQuestion card is showing](https://github.com/anthropics/claude-code/issues/57691)
- 评论 6 | 👍 9 | 已关闭
- **为什么重要**：👍 9 为今日最高。当 AskUserQuestion 卡片出现时，聊天记录无法向上滚动，用户只能看到最近一轮内容。在需要回溯上下文的多轮交互中体验极差。

### 8. 模型在中断工具调用后编造对话轮次
**#70148** — [Model fabricates entire conversation turns (fake user messages + fake tool results) after an interrupted tool call under transmission latency](https://github.com/anthropics/claude-code/issues/70148)
- 评论 5 | 已关闭
- **为什么重要**：高延迟网络环境下，中断的工具调用会导致模型编造出完整的假用户消息和假工具结果，污染会话上下文。这不仅是体验问题，更可能导致后续决策基于虚假信息，属于数据完整性级别的 bug。

### 9. Cowork：向现有会话添加文件夹报“overlaps a protected host location”
**#73852** — [Cowork: adding a folder to an ongoing session fails with "overlaps a protected host location", but creating a new workspace in the same folder works](https://github.com/anthropics/claude-code/issues/73852)
- 评论 4 | 👍 1 | 仍打开
- **为什么重要**：同类文件夹在新 workspace 中可以正常使用，但向现有 Cowork 会话添加时被错误拦截。行为不一致 + 错误信息误导，说明 Cowork 的权限校验逻辑存在边界情况缺陷。

### 10. 跨会话消息显示但不入队，模型永远看不到
**#86671** — [Cross-session messages are displayed in the target session but never enqueued (model never sees them)](https://github.com/anthropics/claude-code/issues/86671)
- 评论 3 | 👍 1 | 仍打开，标记为 regression
- **为什么重要**：今日最新出现的回归问题（8/14 创建）。代理间跨会话发送的消息在 UI 上显示正常，但实际并未进入模型上下文队列，导致接收方模型对消息完全无感知，会引发协作代理间的隐蔽失败。

---

## 重要 PR 进展（共 3 条）

### 1. 在项目级启用 frontend-design 插件
**#84600** — [Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)
- 作者: DanWebOps | 已关闭
- **内容**：通过 `.claude/settings.json` 注册官方 marketplace 并启用 `frontend-design` 技能，使该仓库所有 Claude Code 用户自动加载该技能。属于项目配置型 PR，对普通用户影响有限。

### 2. 自动库存管理（标题为西班牙语）
**#82981** — [Claude/automatizar inventario insumos w4n98s](https://github.com/anthropics/claude-code/pull/82981)
- 作者: Eduardo-neira | 仍打开
- **内容**：PR 描述为空，从标题判断为“自动化输入库存管理”相关，可能是一次误提交或实验性 PR，信息量不足，建议谨慎参考。

### 3. 修复授权安全研究中 CVP 状态的误报变更
**#86870** — [fix: prevent false-positive CVP status changes during authorized security research](https://github.com/anthropics/claude-code/pull/86870)
- 作者: JoTalbot | 仍打开
- **内容**：在 `security-guidance/hooks/review_api.py` 中引入上下文检查机制，扩展 `cap_diff_for_prompt()` 以识别会话元数据（CVS 状态、教育实验环境），并新增 `is_authorized_lab()` 标志，避免在授权的安全研究场景中触发错误的 CVP 状态变更。**这是今日最值得关注的技术 PR**，直接回应了社区大量上报的安全策略误报问题。

---

## 功能需求趋势

综合全部 issues，社区最关注的功能方向如下：

### 1. 认证流程稳定性（最高频）
OAuth 刷新失败、凭据损坏、重复登录等问题密集出现（#54443、#61912、#72008），说明当前认证链路的容错能力严重不足。开发者的核心诉求是：**即使上游短暂故障，也不应导致本地会话失效或被强制重新认证**。

### 2. IDE 集成体验优化
- VS Code 扩展的焦点管理（#45374、#71809）、滚动限制（#57691），以及桌面版会话丢失（#71729）——IDE 场景的交互稳定性是持续热点。
- 桌面版（Windows）的 MSIX 安装启动失败（#68364、#68070）也提示安装包分发渠道需要进一步收敛。

### 3. 多代理 / 跨会话通信可靠性
新增的 #86671 回归（跨会话消息显示但不入队）和 #71429 增强提案（为代理间 SendMessage 添加时间戳/序列号/确认回执）表明，**多代理协作场景正在从“可用”走向“可靠”**，社区对消息丢失、乱序、过期等分布式系统级问题开始提出更高要求。

### 4. 安全策略误报治理
6 月下旬集中上报的 AUP/cyber 误报（#72074~#72106 等十余条）虽多为 duplicate/stale，但覆盖面广（固件分析、安全研究、反垃圾邮件加固等）。PR #86870 正是对该类问题的响应，说明官方已开始重视安全过滤器的上下文感知能力。

### 5. MCP 工具链完善
#66084 反映的延迟工具索引刷新问题，表明 MCP 协议在“运行时动态变更”场景下仍有缺口。社区期望 `tools/list_changed` 能真正触发索引重建，而非仅在文件层面感知变化。

### 6. TUI 可用性细节
RTL 语言支持（#69992）、鼠标操作体验（#71947）、登录 URL 无法复制（#72008）等问题虽均为低👍，但覆盖了国际化与终端交互的差异化场景，属于长尾需求。

---

## 开发者关注点

### 🔴 高频痛点：认证链路故障
- OAuth 令牌在 `expiresAt` 前被服务端拒绝，刷新返回 400（#54443）
- 瞬时 5xx 导致凭据损坏，形成跨会话 401 循环（#61912）
- `/login` 流程在 TUI 中难以完成（#72008）
- **核心诉求**：认证状态机需要考虑服务端变更和上游故障，避免将瞬时错误转化为持久性登录失效。

### 🔴 会话数据一致性
- Windows 桌面版重启后 `</> Code` 历史全部丢失（#71729）
- 跨会话消息 UI 可见但模型不可见（#86671）
- 模型编造假对话轮次（#70148）
- **核心诉求**：会话的持久化、传输、模型上下文三者在任何故障场景下都应保持一致，不能出现“看似正常、实则错乱”的隐蔽状态。

### 🟡 IDE 体验细节
- 焦点被 AskUserQuestion 抢占，打字内容被吞（#45374）
- 多会话标签间焦点自激震荡（#71809）
- AskUserQuestion 显示时无法回溯聊天记录（#57691）
- **核心诉求**：对话框等 UI 组件的交互不应打断用户的输入流，滚动、焦点、输入应当完全可控。

### 🟡 安全过滤器误报
- 固件回滚、Drone SDK 集成、APK 逆向等合法开发行为被 AUP/cyber 拦截（#72074~#72106）
- Windows 8.3 短文件名触发权限扫描误报（#58614）
- **核心诉求**：安全机制需要结合会话上下文和用户授权意图做精细化判断，减少对正常开发工作的打断。

### 🟢 值得关注的正向信号
- **PR #86870** 开始在安全审查 hook 中引入会话上下文（如授权实验室标志），是对社区大量误报反馈的直接回应，虽未合并但方向正确。
- 官方正在批量清理 6 月下旬的 stale/duplicate issues，说明维护者正在推进存量问题收敛，建议关注相关 fix 在后续版本中的落地情况。

---

*日报基于 GitHub anthropics/claude-code 仓库 2026-08-16 公开数据整理，部分已关闭 issue 可能包含官方修复说明，建议点击链接查看最终结论。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-16）

## 今日速览

昨日社区最突出的动态是 **Windows 桌面版性能问题集中爆发**，多条高热度 Issue 指向 Electron 主进程忙循环导致系统级鼠标卡顿、CPU 占用异常，且涉及多个不同版本（26.810.41047、26.810.4967、26.810.6296 等）。同时，Codex 团队在 PR 侧推进了大量基础设施优化，包括 `codex doctor` 存储诊断、TUI 会话状态展示、MCP hooks 支持等，整体偏向稳定性与可观测性建设。新版本 `rust-v0.148.0-alpha.19` 已发布，但官方暂未提供更多发布说明。

---

## 版本发布

### rust-v0.148.0-alpha.19
- 发布链接：[openai/codex Releases](https://github.com/openai/codex/releases)
- 版本号：`0.148.0-alpha.19`
- 官方暂未提供详尽的变更摘要，建议关注后续 release notes 更新。

---

## 社区热点 Issues（10 个）

### 1. Codex App 在 Windows 11 Pro 上频繁卡顿/卡死 ⭐ 最热
- **Issue #20214** | 评论 104 | 👍 85 | [链接](https://github.com/openai/codex/issues/20214)
- 状态：OPEN（4 月创建，昨日仍有更新）
- 用户反馈 Codex App（Microsoft Store 版）在 Windows 11 Pro（Ryzen 5 5600 / 32GB RAM）上频繁冻结、卡顿，尽管系统资源充足。这是目前评论数最高、社区影响面最大的 Windows 性能问题，持续三个月仍未解决。

### 2. 将 Codex 聊天限定到 VS Code 项目/工作区 ⭐ 高热度功能请求
- **Issue #3550** | 评论 34 | 👍 79 | [链接](https://github.com/openai/codex/issues/3550)
- 状态：CLOSED
- 用户希望 VS Code 扩展中 Codex 聊天记录能按项目/工作区隔离，而非全局共享。Recent Tasks 列表混入其他项目的会话，导致管理困难。该请求获得大量支持，虽已关闭但高赞数说明 IDE 集成体验仍是社区核心诉求。

### 3. [Windows] 桌面应用导致系统级鼠标卡顿（新版本仍复现）
- **Issue #38546** | 评论 25 | 👍 10 | [链接](https://github.com/openai/codex/issues/38546)
- 状态：OPEN（8 月 14 日创建）
- 在版本 `26.810.41047` 上，ChatGPT/Codex 桌面应用导致系统级鼠标光标严重卡顿。这一新 Issue 与 #20214 高度相关，说明 Windows 性能问题不仅未修复，还在持续出现在新版本中。

### 4. Windows 打开大会话目录后出现输入/鼠标短暂冻结
- **Issue #28109** | 评论 22 | 👍 14 | [链接](https://github.com/openai/codex/issues/28109)
- 状态：CLOSED（6 月创建，昨日关闭）
- 当 Codex Desktop 的 sessions 目录较大时，打开应用会出现 1-2 秒的间歇性输入冻结。该问题已被关闭，但从评论趋势看，用户对 Windows 端性能的容忍度已接近极值。

### 5. Crashpad 转储文件无限增长：每天超 5GB
- **Issue #25921** | 评论 17 | 👍 8 | [链接](https://github.com/openai/codex/issues/25921)
- 状态：OPEN
- macOS 上 Codex Desktop 在 `~/Library/Application Support/com.openai.codex/web/Crashpad/pending` 持续生成 `.dmp` 文件，实测一天内增长到 4.9GB、54,504 个文件且仍在增长。存储管理缺陷已严重到影响日常使用。

### 6. Windows 版本空闲时 Electron 主进程 CPU 忙循环
- **Issue #38547** | 评论 16 | 👍 7 | [链接](https://github.com/openai/codex/issues/38547)
- 状态：CLOSED（8 月 14 日创建）
- 版本 `26.810.4967.0` 在完全空闲时进入 Electron 主进程 CPU 忙循环，从 `26.803.10989.0` 更新后立即出现。无需打开 Browse 功能即触发，性能回归明显。

### 7. [Windows] 系统级卡顿在 Codex 空闲时持续，完全退出才恢复
- **Issue #38750** | 评论 9 | [链接](https://github.com/openai/codex/issues/38750)
- 状态：OPEN（8 月 15 日创建）
- 版本 `26.810.50856`（8 月 14 日发布）即使在无任何活跃任务时也会导致 Windows 严重卡顿，退出应用后立即恢复。多个独立用户在不同版本上报告类似问题，开发团队需要立即定位。

### 8. [Windows][26.810.6296.0] Electron 主进程忙循环导致鼠标卡顿
- **Issue #38716** | 评论 7 | 👍 3 | [链接](https://github.com/openai/codex/issues/38716)
- 状态：OPEN（8 月 15 日创建）
- 同样指向 Electron 主进程忙循环问题，但版本号更新（`26.810.6296.0`）。说明该问题跨多个 26.810.x 版本持续存在，用户升级后立刻复现。

### 9. CLI /status 命令增强：暴露完整用量/限制数据 ⭐ 高赞功能需求
- **Issue #15281** | 评论 8 | 👍 22 | [链接](https://github.com/openai/codex/issues/15281)
- 状态：OPEN
- 用户希望 `/status` 命令展示更完整的信息：模型名称、当前用量百分比（目前经常不准确或过期）、工作目录，以及 ChatGPT Plus 订阅的重要用量限制。虽评论数不多，但 22 👍 说明这是 CLI 用户的高频痛点。

### 10. 分页历史记录丢失有效 RolloutLine 记录并重用序号
- **Issue #35746** | 评论 13 | [链接](https://github.com/openai/codex/issues/35746)
- 状态：OPEN（7 月 28 日创建）
- CLI 分页的 rollout 历史存在数据完整性问题：有效记录被丢弃、序号被重用。观测于 `0.146.0-alpha.10.1`，在 `rust-v0.146.0-alpha.14` 中仍未修复。该问题影响会话恢复与审计的可靠性。

---

## 重要 PR 进展（10 个）

> 以下 PR 全部来自 [openai/codex Pull Requests](https://github.com/openai/codex/pulls)，除特别注明外均为昨日合并/关闭。

### 1. 为 code-mode gRPC 监听器添加健康端点
- **PR #38806** | [链接](https://github.com/openai/codex/pull/38806)
- 在 gRPC 监听器上提供 `GET /healthz`（HTTP/1.1 和 HTTP/2），其余请求仍强制 HTTP/2，避免 gRPC 方法通过 HTTP/1.1 暴露。有助于基础设施监控与故障排查。

### 2. 在 `codex doctor` 中增加存储诊断
- **PR #38795** | [链接](https://github.com/openai/codex/pull/38795)
- 报告 `CODEX_HOME` 和活动 worktree 的可用空间，低于 5 GiB 告警、低于 1 GiB 报错；Windows 上还检测 worktree 是否位于受信任的 Dev Drive 并提供修复建议。直接回应社区对磁盘膨胀问题的担忧。

### 3. TUI 启动时显示恢复/分叉状态
- **PR #38788** | [链接](https://github.com/openai/codex/pull/38788)
- 在 TUI 启动时显示 `Resuming session…` / `Forking session…` 的弱化状态提示，会话选择完成后更新或清除。改善长时间启动时的用户反馈。

### 4. 保持活动轮次的模型设置跨更新稳定
- **PR #38785** | [链接](https://github.com/openai/codex/pull/38785)
- 修复轮次进行中线程设置变化导致模型配置中途变更的问题，确保模型设置更新应用于下一轮而非当前轮次。提升长时间任务的行为一致性。

### 5. 持久化 exec 线程改用分页历史
- **PR #38774** | [链接](https://github.com/openai/codex/pull/38774)
- `codex exec` 启动持久线程时请求分页历史，旧存储不支持分页时自动回退到遗留历史。结合 #35746，这是对历史记录分页机制的一次系统性补强。

### 6. 为 hooks 引擎添加 MCP 工具处理器支持
- **PR #38705** | [链接](https://github.com/openai/codex/pull/38705)
- 发现同步 `mcp_tool` hook 处理器，并通过执行器调用其配置的 MCP server/tool；支持嵌套 hook 事件占位符展开（保留 JSON 类型）和工具输出后处理。扩展了 hooks 生态的覆盖范围。

### 7. 规范粘贴文本中的 CRLF 行尾
- **PR #38704** | [链接](https://github.com/openai/codex/pull/38704)
- 修复将 CRLF 转换为 LF 时产生双重换行的问题：先规范化 CRLF 对，再转换剩余裸 CR。这是 Windows 用户粘贴代码的关键体验修复。

### 8. 插件变更后刷新 hook 运行时
- **PR #38703** | [链接](https://github.com/openai/codex/pull/38703)
- 当有效插件变更或 marketplace 升级安装新插件内容时，重建已加载会话的 hook 运行时，并同步刷新插件缓存和 MCP 运行时。确保插件热更新后 hooks 立即生效。

### 9. 通过共享 Guardian 审批路由权限请求
- **PR #38701** | [链接](https://github.com/openai/codex/pull/38701)
- 将 `request_permissions` 调用表示为共享批准动作，并转换为 Guardian 权限请求；保留自动权限审核期间的轮次取消。统一权限审批路径，降低安全机制分叉风险。

### 10. 通过 exec-server 中继传播追踪上下文
- **PR #38690** | [链接](https://github.com/openai/codex/pull/38690)
- 在 relay 帧中增加可选 W3C `traceparent`/`tracestate` 字段，从 JSON-RPC 请求复制到 relay 数据帧；跨 Noise 记录分片的加密请求也附带上下文。提升分布式追踪的可观测性。

---

## 功能需求趋势

综合过去 24 小时更新的 50 条 Issues，社区主要关注以下方向：

### 1. Windows 平台性能与稳定性（压倒性最高频）
大量 Issue 集中在 Windows 桌面版的卡顿、CPU 忙循环、鼠标冻结和系统级性能劣化上，涉及版本从 `26.305` 到 `26.810`，说明问题长期存在且新版本持续复现。开发团队需要优先分配资源解决 Electron 主进程的忙循环问题。

### 2. 用量/额度数据透明化
多条 Issue（#24080、#15281、#19555、#20310、#38503）都在要求 CLI 或 UI 展示更丰富的用量信息：速率限制重置时间、余额、计划类型、信用剩余等。核心诉求是“像 Claude Code 一样，让用户随时看到自己的消耗情况”。

### 3. 会话与存储管理
会话文件体积无限增长（#25921、#30779、#34337、#35470）是另一个重要痛点，包括 Crashpad 转储膨胀、子代理 fork 会话长期留存、图像文件被复制十五万次等极端情况。磁盘空间管理需要系统性方案，而不仅是单点修补。

### 4. IDE 集成深度增强
VS Code 扩展的工作区隔离（#3550）得票极高，说明开发者希望 Codex 会话能按项目组织，而非全局混杂。CLI 远程控制 Linux 支持（#38115）也是新增的 IDE/远程方向需求。

### 5. MCP 生态完善
MCP 相关 Issues（#34614 重复套件累积、#38115 Remote host）和 PR（#38705 MCP hook 支持）同时活跃，表明 Codex 正在快速补全 MCP 工具链的能力与稳定性。

---

## 开发者关注点

- **Windows 性能是当前最大信任危机**：多个高评论、高赞 Issue 聚焦在 Windows 端卡顿、卡死、鼠标冻结、CPU 忙循环，且跨多个版本连续出现。用户已开始采用“完全退出应用”作为唯一恢复手段，这对 Codex 在 Windows 开发者群体中的口碑影响极为负面。
- **磁盘空间管理亟待系统性解决**：Crashpad 转储、会话 JSONL、子代理 fork 历史等都在无限增长，从数 GB 到数百 GB 不等。`codex doctor` 新增存储诊断是积极信号，但还需要主动清理/压缩机制。
- **用量信息不透明引发焦虑**：用户对于“还有多少额度/何时重置”的需求非常强烈，尤其对 Plus/Pro 订阅用户而言，缺少这些信息导致成本不可控，也减少了用户对 Codex 能力的信任。
- **会话组织能力不足**：VS Code 全局共享的聊天列表和无法按项目隔离的会话，已经影响到日常开发效率。工作区级上下文隔离是社区明确提出的方向。

---

*本日报基于 2026-08-15 GitHub 公开数据自动整理生成，仅供技术社区参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-16

## 今日速览
- 发布 v0.56.0-nightly.20260815，主要涉及测试基础设施清理，无新功能产出。
- Agent 可靠性问题成为社区焦点：#22323 子代理状态误报、#21409 代理挂起、#25166 终端卡死等 P1 级 Bug 持续发酵。
- 安全加固与行为评估（evals）构成 PR 主线：SSRF 漏洞修复、Node 22 升级，以及多个新增行为评估 PR 陆续提交。

## 版本发布

**v0.56.0-nightly.20260815.g2a87e7be1**

- [SSR Agent] Issue Fix (#19826)：将 `a2a-server` 测试中的 `process.env` 迁移至 `vi.stubEnv`（[PR #28811](https://github.com/google-gemini/gemini-cli/pull/28811)）

**完整变更**：[v0.56.0-nightly.20260814...v0.56.0](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260814.gc0d192452...v0.56.0)

## 社区热点 Issues

1. **子代理 MAX_TURNS 被误报为 GOAL 成功**（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)，P1，12 评论）  
   `codebase_investigator` 子代理在达到最大轮次后仍返回 `status: "success"` 与 `Termination Reason: "GOAL"`，掩盖了实际中断。当前讨论热度最高的 Issue，状态误报会直接误导用户对 Agent 真实执行情况的判断。

2. **Generalist 代理无限挂起**（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)，P1，8 评论 / 8 👍）  
   模型一旦委托给 generalist 代理就会永久挂起，创建文件夹这类简单任务也需等待一小时。社区 👍 数最高的 Issue。

3. **Shell 命令执行完成后卡在 "Waiting input"**（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)，P1，4 评论 / 3 👍）  
   简单 CLI 命令执行完毕但 TUI 仍显示该命令活跃并等待输入。典型交互死锁问题，且复现概率较高。

4. **组件级行为评估 EPIC**（[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)，P1，7 评论）  
   对 #15300 引入的行为评估体系做组件级扩展，目前已有 76 个评估测试、覆盖 6 个 Gemini 模型，是后续 evals 体系建设的重要规划。

5. **AST 感知文件读取/搜索/映射价值评估**（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)，P2，7 评论）  
   探讨用 AST 感知工具精确读取方法边界、减少错位读取与 token 噪声，并优化代码库导航，是长期能力演进方向。

6. **模型不主动使用 skills 和子代理**（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)，P2，6 评论）  
   用户反馈 Gemini 几乎不会主动调用自定义 skill 和子代理，仅在被显式告知时才使用，削弱了 Skills/Agents 机制的实战价值。

7. **Auto Memory 对低信号会话无限重试**（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)，P2，5 评论）  
   后台提取代理跳过低信号会话后，会话会持续保持"未处理"状态并被反复再次呈现，形成无限重试循环。

8. **子代理未经允许就运行**（[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)，P1，3 评论）  
   升级 v0.33.0 后，即使配置中禁用了 agents 模式，子代理仍会被启用并执行。权限控制回归问题，影响面较大。

9. **浏览器子代理在 Wayland 下失败**（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)，P1，4 评论）  
   浏览器子代理在 Wayland 会话中因环境兼容问题直接失败，Linux 桌面用户受影响明显。

10. **Auto Memory 需要确定性 redaction 并减少日志**（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)，P2，4 评论）  
    转录内容在 redaction 前已进入模型上下文，且服务可能记录 skill 内容，存在敏感信息泄漏面，社区对安全细节开始较真。

## 重要 PR 进展

1. **预览模型被静默替换时发出警告**（[#28828](https://github.com/google-gemini/gemini-cli/pull/28828)，P1）  
   用户请求 `gemini-3.1-pro-preview` 但账号无预览权限时，Config 会静默降级到 `auto-gemini-2.5` 且无任何提示。该 PR 增加显式警告，消除"幽灵降级"。

2. **保留子代理恢复时的原始终止原因**（[#28815](https://github.com/google-gemini/gemini-cli/pull/28815)，P1）  
   对应 #22323。子代理在 MAX_TURNS/TIMEOUT 后的最后宽限轮调用 `complete_task` 时，不再覆盖原始终止原因，保证状态上报准确性。

3. **修复 web-fetch SSRF 漏洞（CVSS 8.6）**（[#28725](https://github.com/google-gemini/gemini-cli/pull/28725)，P2）  
   攻击者可通过指向内网/回环 IP（如 `169.254.169.254`）的自定义域名绕过 DNS 防护。该 PR 在 web-fetch 工具中补齐防护逻辑。

4. **沙箱 Dockerfile 升级至 Node 22**（[#28726](https://github.com/google-gemini/gemini-cli/pull/28726)，P1）  
   Node 20 即将 EOL，新 CVE 仅修复于 Node 22+。同步升级了 Sandbox 及 caretaker-agent 下所有 Dockerfile。

5. **避免 401 子串误判为认证错误**（[#28827](https://github.com/google-gemini/gemini-cli/pull/28827)，P2）  
   `isAuthenticationError` 会把消息中任何含 "401" 的值（端口号、退出码等）误判为认证失败。该 PR 改为仅识别 HTTP/响应状态上下文。

6. **TUI 增加执行超时防止无限挂起**（[#28812](https://github.com/google-gemini/gemini-cli/pull/28812)，P1)  
   裸 Linux 终端下 `getProcessInfo()` 依赖非交互 `ps` 命令，可能导致 "Initializing..." 永久卡住。引入超时机制兜底。

7. **改进 Vertex AI 401 错误提示**（[#28679](https://github.com/google-gemini/gemini-cli/pull/28679)，P2）  
   当用户配置了标准 Gemini API key 却使用 Vertex AI 端点时，直接给出"缺少 Google Cloud 凭据"的明确指引，降低排查成本。

8. **新增多工具链/上下文安全/安全边界评估**（[#28824](https://github.com/google-gemini/gemini-cli/pull/28824)）  
   行为评估体系扩展：多工具链协同（write_todos→read_file→edit_file）、大文件上下文安全处理、敏感文件/目录的安全边界执行。

9. **新增任务图依赖与错误恢复评估**（[#28823](https://github.com/google-gemini/gemini-cli/pull/28823)）  
   覆盖任务图依赖添加/可视化、文件 404 后重新搜索读取、shell 命令失败诊断与重试等复合场景。

10. **新增任务规划与追踪评估**（[#28822](https://github.com/google-gemini/gemini-cli/pull/28822)）  
   `write_todos` / `complete_task` / `tracker_list_tasks` 等任务规划与状态查询工具的行为评估。

## 功能需求趋势

- **Agent 状态可观测性与正确性**：终止原因保真（#28815）、子代理轨迹通过 `/chat share` 可见（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、bugreport 包含子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）。
- **Auto Memory 可靠性与安全**：低信号会话处理（#26522）、确定性 redaction（#26525）、无效补丁隔离（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）。
- **AST 感知的代码分析能力**：精确读取方法边界、降低 token 噪声、改进 codebase 导航（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) / [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)）。
- **安全加固与认证体验**：SSRF 防护（#28725）、Node 20 EOL 升级（#28726）、API key 与 Vertex 认证模式的引导信息完善（#28679 / [#28622](https://github.com/google-gemini/gemini-cli/issues/28622)）。
- **行为评估体系复合化**：从单工具评估向多工具链、上下文安全、安全边界等复合场景演进（#24353 / #28822-#28824）。
- **终端健壮性与跨平台适配**：Wayland 兼容（#21983）、Windows CI 可运行（[#28830](https://github.com/google-gemini/gemini-cli/issues/28830)）、resize 防闪烁（[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)）。

## 开发者关注点

- **"假成功"状态问题突出**：多个 Issue 报告子代理实际中断/超时，却对外上报 GOAL 成功（#22323），严重掩盖 Agent 能力短板，社区要求修复的呼声强烈。
- **挂起/卡死成为体验瓶颈**：generalist 挂起（#21409）、shell 命令"假活"（#25166）、TUI 初始化卡住（#28812）已是最影响日常使用的痛点。
- **配置与权限预期不一致**：settings.json 的 `maxTurns` 覆盖被忽略（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）、禁用 agents 仍被启用（#22093），用户对"配置不生效"感到困惑。
- **认证配置认知负担高**：Gemini API key 与 Vertex AI 端点混用导致难以排查的 401（#28622/#28679），错误信息需要更友好。
- **模型工具使用倾向偏离预期**：不主动使用 skills/sub-agents（#21968），却倾向于在随机目录创建临时脚本（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），真实行为与用户期望存在偏差。
- **跨平台质量诉求上升**：Wayland 与 Windows 用户开始系统性反馈故障，社区期待更主动的环境适配与 CI 保障。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-16）

## 1. 今日速览

今日发布 **v1.0.81-0**，主要内容为更新模型配置。社区讨论焦点集中在 **MCP 认证/握手可靠性**、**autopilot 模式稳定性** 以及 **平台/安装兼容性** 上；其中 Atlassian MCP OAuth 回归、Windows OOM 崩溃、Codespaces 版本落后等问题尤其值得关注。

## 2. 版本发布

### v1.0.81-0  
- 状态：已发布  
- 更新内容：**Improved — Update model configurations**（更新模型配置）  
- 链接：[Releases](https://github.com/github/copilot-cli/releases)

---

## 3. 社区热点 Issues

以下是过去 24 小时内更新、最值得关注的 10 个 Issue：

### 1. NixOS 上 Bash 工具自 v1.0.49 起损坏  
[Issue #3392](https://github.com/github/copilot-cli/issues/3392)  
- 状态：Open · 更新于 08-15 · 评论 4 · 👍 9  
- 影响：NixOS 用户升级到 >=1.0.49 后，agent 执行任意命令都会报 `Failed to start bash process`。这是当前 👍 数最高的 Issue，说明 NixOS 用户群体受影响较大，且已持续数月未修复。

### 2. Atlassian MCP OAuth 在 1.0.79 回归（RFC 8414 §3.3）  
[Issue #4480](https://github.com/github/copilot-cli/issues/4480)  
- 状态：Closed · 更新于 08-15 · 评论 4 · 👍 6  
- 影响：连接 `mcp.atlassian.com` 时 OAuth 发现流程报 `Incompatible authorization server`，1.0.71 正常、1.0.79 回归。虽然该 Issue 已关闭，但 [#4490](https://github.com/github/copilot-cli/issues/4490) 又报告 1.0.80 仍存在同类问题，说明远程 MCP OAuth 兼容性验证不足。

### 3. GitHub Actions 中 MCP registry 策略拉取返回 403，阻塞所有非默认 MCP server  
[Issue #4346](https://github.com/github/copilot-cli/issues/4346)  
- 状态：Closed · 更新于 08-15 · 评论 2 · 👍 3  
- 影响：在使用文档推荐的 PAT-less `GITHUB_TOKEN` 方式时，MCP registry policy 返回 403，导致 CI 中所有非默认 MCP server 无法工作。这对 GitHub Actions 用户是明显的 CI 阻塞问题。

### 4. 支持 protobuf OTLP 导出  
[Issue #2934](https://github.com/github/copilot-cli/issues/2934)  
- 状态：Closed · 更新于 08-15 · 评论 2 · 👍 6  
- 影响：`copilot monitoring` 目前只支持 `application/json` OTLP，且静默忽略标准环境变量 `OTEL_EXPORTER_OTLP_PROTOCOL`。关闭说明已有解决方案或合入计划，对可观测性用户是明确需求。

### 5. Task 工具静默将 subagent 模型降级为 session 模型  
[Issue #3565](https://github.com/github/copilot-cli/issues/3565)  
- 状态：Closed · 更新于 08-15 · 评论 1 · 👍 1  
- 影响：自定义 agent 的 frontmatter 或显式 `model` 配置会被 cost multiplier guard 静默忽略，subagent 被降级为父 session 模型。这对依赖模型能力差异的 agent 工作流影响很大，且因为是“静默”行为，很难排查。

### 6. MCP initialize 握手固定 60 秒超时且无重试  
[Issue #4421](https://github.com/github/copilot-cli/issues/4421)  
- 状态：Open · 更新于 08-15 · 评论 1  
- 影响：npx 启动的 stdio MCP server 初始化超时后，CLI 会记录失败并**在整个 session 内不再拉起该 server**。报告称约 29% 的会话受影响，且无重试/退避/可配置超时。当前热度不高，但这是 MCP 本地/混合场景的关键稳定性问题。

### 7. `/spawn` 命令模板语义矛盾，且无跨 session 写入确认  
[Issue #4491](https://github.com/github/copilot-cli/issues/4491)  
- 状态：Open · 更新于 08-15 · 评论 1  
- 影响：`/spawn` 的 prompt 模板先声明“创建单独子 session”，随后又要求 agent“复用已有 session”，最终可能把上下文注入无关运行中的 session，并且没有审批门控。这是 session 隔离与安全方面的高风险设计问题。

### 8. Windows 上 v1.0.79 autopilot 致命 OOM，V8 堆仅用 0.6/4.3 GB  
[Issue #4499](https://github.com/github/copilot-cli/issues/4499)  
- 状态：Open · 更新于 08-15 · 评论 0  
- 影响：长时间运行 autopilot 时 `copilot.exe` 崩溃：`FATAL ERROR: Committing semi space failed`。关键点是崩溃时 V8 堆远未到上限，更像是 Windows 宿主内存 commit 失败而非堆限制。Windows 用户的长任务稳定性受影响。

### 9. BYOK 模式下 autopilot nudge 回合会重新序列化 transcript，破坏 prompt caching  
[Issue #4500](https://github.com/github/copilot-cli/issues/4500)  
- 状态：Open · 更新于 08-15 · 评论 0  
- 影响：在 `--autopilot` 完成提示回合中，CLI 会从解析后的内部状态重建整个 `input` 数组，而不是逐字节复用之前的 items。item id 虽保留，但字节不一致，导致相同的工具调用无法命中 prompt cache，增加延迟与成本。

### 10. Codespaces 预装 Copilot CLI 1.0.3，且 `copilot update` 需要 sudo  
[Issue #4501](https://github.com/github/copilot-cli/issues/4501)  
- 状态：Open · 更新于 08-15 · 评论 0  
- 影响：新 Codespace 默认自带 1.0.3，`copilot update` 下载了 1.0.80 但不会替换 `/usr/local/bin/copilot`，除非手动 sudo。用户会被迫停留在过旧版本，新用户上手体验受影响。

---

## 4. 重要 PR 进展

过去 24 小时内更新的 PR 共 2 条，未达到 10 条，以下全部列出。

### 1. 处理 fork PR 关联缺失时的 invalid-label writer 逻辑  
[PR #4497](https://github.com/github/copilot-cli/pull/4497)  
- 状态：Open · 更新于 08-15  
- 内容：当 GitHub 未在 workflow run 中填充 PR association 时，通过可信的 workflow-run 元数据查找关联，并要求恰好存在一个 open PR，避免 fork PR 场景下 invalid-label 处理失效。属于仓库自动化健壮性修复。

### 2. 将 PR 自动化从 `pull_request_target` 迁移走  
[PR #4449](https://github.com/github/copilot-cli/pull/4449)  
- 状态：Closed · 更新于 08-15  
- 内容：将 invalid-label 自动化迁移出 `pull_request_target`，同时保留 issue/PR 关闭行为。具体包括：使用 issue-scoped token 直接关闭 issue、用无权限的 `pull_request` 信号处理可合并 PR、特权逻辑另行处理。这是明显的安全加固方向。

---

## 5. 功能需求趋势

从近期 Issue 中可以提炼出以下社区关注方向：

- **MCP 生态成熟度**：远程 MCP OAuth 兼容性（#4480/#4490）、CI 中 GITHUB_TOKEN 权限（#4346）、初始化握手超时与重试（#4421）成为热门话题。社区希望 MCP 在 CI、stdio、远程 server 等场景下更稳定、可配置。
- **模型选择与可控性**：要求支持 GPT-5.6 `reasoning.mode`（#4495）、修复新模型启用后本地 cache 不刷新（#4494）、暴露 ACP 的 `contextTier` 配置（#4275）、避免 subagent 模型被静默降级（#3565）。
- **非交互/autopilot 模式可靠性**：Windows OOM 崩溃（#4499）、BYOK prompt caching 被破坏（#4500）、CI 中 MCP 权限失败（#4346）都集中在无人值守场景，说明开发者正在大量使用 autopilot/CI 集成。
- **会话生命周期管理**：`/spawn` 跨 session 写入风险（#4491）、`/restart` 与 `-w` worktree 冲突（#4493）、无法取消已归档 session（#4502）等，反映 session 级操作需要更安全、更可逆的设计。
- **可观测性**：protobuf OTLP 导出支持（#2934）体现社区希望遵循标准 OpenTelemetry 配置，而不是被锁定在 JSON 格式。
- **平台与安装体验**：NixOS bash 工具（#3392）、Codespaces 版本落后与 sudo 更新问题（#4501）、Windows 内存崩溃（#4499），说明跨平台打包和安装链路仍是短板。

---

## 6. 开发者关注点

- **MCP 认证与握手问题反复回归**：Atlassian MCP OAuth 在 1.0.79/1.0.80 连续出现 RFC 8414 兼容性错误，且同类 Issue 被重复报告，开发者对远程 MCP server 的认证测试覆盖感到不信任。
- **静默失败与静默降级**：Task 工具模型降级、MCP server 超时后不再恢复、`/spawn` 可能写入无关 session 等“无提示”行为，是开发者最难排查也是最担心的痛点。
- **本地状态缓存不透明**：新模型启用后需要手动清理本地 Copilot state/cache/login 才能生效（#4494），这种缓存同步问题直接影响新模型/新功能的采用。
- **安装与环境差异成本高**：NixOS、Windows、Codespaces 三端各有独立问题，且都不是简单配置即可绕过；Codespaces 甚至默认版本停留在 1.0.3，给用户带来很大的“版本意外”成本。
- **成本与性能敏感**：BYOK 下 prompt cache 被破坏（#4500）直接关系到 token 成本和响应延迟，开发者对 autopilot 长会话中的序列化一致性已经开始关注。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-08-16** | **数据源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

## 今日速览

Kimi Code CLI 今日无新版本发布。社区讨论集中在两条主线：一是**记忆系统**的长线需求（#1283、#1478）持续升温，已有 Issue 积累了 40 条评论却迟迟未落地；二是**配额与计费透明度**成为新焦点，#2604 以实测数据质疑每周额度缩水 3-5 倍，#2603 则从架构角度提出配额感知压缩方案。开发者的关注点正从“功能补齐”转向“订阅成本与使用体验的平衡”。

## 社区热点 Issues

### 1. [增强] 功能请求：记忆系统——跨会话持久上下文
- **编号**：[#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **状态**：开放 | 作者：CatKang | 更新：2026-08-15 | 评论：40
- **什么值得关注**：这是社区呼声中持久未解决的功能需求，提出实现自动记忆（AI 管理笔记）与手动记忆（用户自定义指令）的双轨方案，让 CLI 在跨会话重启后保留项目模式、用户偏好与关键上下文。自 2026-02-27 提出至今已近 6 个月，评论区积累了大量场景讨论，今日仍被更新，说明开发者对它的耐心正在消耗。

### 2. [增强] 能否优化记忆层？参考文档中缺少记忆相关说明
- **编号**：[#1478](https://github.com/MoonshotAI/kimi-cli/issues/1478)
- **状态**：开放 | 作者：hahy36 | 更新：2026-08-15 | 评论：3
- **什么值得关注**：中文用户直接表达“搞大项目的时候很痛苦”，且官方文档中找不到记忆相关设计（仅提及 agent.md）。Issue 中还引用了第三方工具（~/.openclaw/workspace/）的目录结构作为参考，映射出用户对 Kimi Code CLI 记忆机制的期待与实际能力之间的落差。

### 3. [开放] 有效每周配额减少 3-5 倍且无公告——含前后对比实测数据
- **编号**：[#2604](https://github.com/MoonshotAI/kimi-cli/issues/2604)
- **状态**：开放 | 作者：tobiu | 更新：2026-08-15 | 评论：2
- **什么值得关注**：Vivace 会员用户通过客户端侧拦截 API 调用构建了 wire-level JSONL 台账，逐日记录输入/缓存读取/输出 token 量，得出每周实际可用额度缩减 3-5 倍的结论。这是典型的“数据驱动型投诉”，直接质疑订阅条款变更是未公告还是计量回归，维护团队难以回避。

### 4. [开放] 配额感知压缩：订阅方案下压缩应基于 token 预算触发，而非接近最大上下文窗口
- **编号**：[#2603](https://github.com/MoonshotAI/kimi-cli/issues/2603)
- **状态**：开放 | 作者：salim4n | 更新：2026-08-15 | 评论：0
- **什么值得关注**：提出一个架构级优化建议：K3 的 1M token 窗口（默认保留 5 万 token）导致活动会话几乎永远不会触发压缩。在 Agent 工作负载中，上下文会无限累积，最终在配额层面形成隐性爆炸。作者建议将压缩策略与订阅配额绑定，在 token 预算内提前触发，避免“窗口很大但配额很贵”的错配。

### 5. [已关闭] openai_legacy provider 丢失推理内容，引发 APIEmptyResponseError
- **编号**：[#1155](https://github.com/MoonshotAI/kimi-cli/issues/1155)
- **状态**：已关闭 | 作者：rongou | 更新：2026-08-15 | 评论：0
- **什么值得关注**：当使用 OpenAI 兼容服务端（sglang/vllm）且推理/思考内容被放在独立响应字段时，openai_legacy 因未传入 reasoning_key 直接丢弃这部分内容，进一步触发 APIEmptyResponseError。虽然 Issue 已关闭，但其所揭示的兼容层“字段透传”问题，在不同推理服务相互切换时仍然值得警惕。

## 重要 PR 进展

### 1. [开放] fix(tools): StrReplaceFile 替换计数改为基于运行中的内容
- **编号**：[#2524](https://github.com/MoonshotAI/kimi-cli/pull/2524)
- **作者**：Sreekant13 | 更新：2026-08-15 | 状态：开放
- **功能/修复内容**：StrReplaceFile 在执行链式编辑时，之前对替换次数的统计是依据原始文件内容；但在链式场景中，某个后续编辑的 `old` 串可能正是由前一次编辑产生的，原始内容里并不存在，导致统计不准确。此前提交修复了计数逻辑，将替换次数与实际运行的编辑流对齐。该 PR 同时关联并解析 Issue #2526，对依赖多轮自动重构的工作流有直接影响。

### 2. [已关闭] fix(kosong): 在 deref_json_schema 中遇到循环 $ref 时抛出明确错误
- **编号**：[#2506](https://github.com/MoonshotAI/kimi-cli/pull/2506)
- **作者**：Sreekant13 | 更新：2026-08-15 | 状态：已关闭
- **功能/修复内容**：`kosong.utils.jsonschema.deref_json_schema` 在递归内联本地 `$ref` 时若遇到循环引用，会形成死循环或栈溢出。该 PR 改为抛出可读的明确错误，降低在复杂 JSON Schema 场景下的排查成本。PR 小于 100 行，是维护者社区中典型的“小而精”修复，已于 8 月 15 日关闭，疑似已合并。

## 功能需求趋势

结合当前快照中的全部 Issues，社区最关注的方向有以下三个：

1. **记忆系统与持久上下文**：以 #1283（40 条评论）和 #1478 为核心诉求，要求“自动记忆 + 手动记忆”双轨机制，跨会话保留项目模式与用户偏好。这是大型项目协作场景的基础设施，也是呼声最高、持续时间最长（自 2026-02 起）的需求轨迹。
2. **计费透明度与配额感知**：#2604 带来的是“对用量统计和公告机制”的监督诉求；#2603 则更进一层，希望 CLI 能主动在配额预算内触发压缩，从而在订阅制条件下延长单次任务的可运行时长。二者合力指向一个方向：Kimi Code CLI 需要一套与订阅配额深度联动的用量控制框架。
3. **OpenAI 兼容层的字段完整性**：#1155 虽已关闭，但揭示了 reasoning/thinking 内容被 `openai_legacy` 静默丢弃的问题。伴随跨厂商推理服务切换成为常态，社区期待兼容层继续保持对 `reasoning_key` 等新字段的原生透传能力。

## 开发者关注点

- **大型项目的记忆断层是首要痛点**：“搞大项目的时候很痛苦”是来自 #1478 的中文社区直接反馈。缺少跨会话记忆意味着每次新会话都要重复讲解项目背景，Agent 编码的连续性大打折扣。
- **配额变动缺乏前置公告与可视化**：#2604 给出了精确的前后实测数据对比，开发者对“未公告即减少额度”的容忍度极低。社区需要官方提供用量日志接口或透明的计量说明，而不是让用户自行抓包排查。
- **上下文压缩逻辑与实际成本模型错位**：#2603 指出，1M token 的窗口把压缩触发点推得极高，但订阅配额并不允许真正跑满窗口。开发者在 Agent 场景下不得不时刻警惕 token 消耗，更希望压缩能在配额比例到达阈值前自动触发。
- **推理内容透传仍存在隐性陷阱**：虽然 #1155 已关闭，但其成因并非孤立事件——不同推理服务对 reasoning 内容字段的命名和返回方式各有差异，兼容层若缺少“字段名映射/白名单机制”，迁移服务端时仍会遇到 APIEmptyResponseError 或上下文截断等问题。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-16

## 今日速览

昨日无新版本发布，社区焦点集中在两件事：一是 grok-4.5 在 OpenCode Go/Zen 上的稳定性问题持续发酵（多个 Issue 报告 500/503/报错）；二是围绕订阅计费与模型配置的争议（付款成功却提示余额不足、官网声称免费却要求订阅）。PR 侧则涌现一批 V2 架构级改进，包括 Docker/Incus 工作区分叉、事件时间戳重构和流式会话批量分发。

---

## 社区热点 Issues（10 个）

### 1. 订阅付款成功但工作区仍显示余额不足
[#37790](https://github.com/anomalyco/opencode/issues/37790) — 作者：ahdkabeerhadi（14 评论）

用户通过 Stripe 成功购买 OpenCode Go 订阅，但工作区仍提示 "Insufficient balance"。这是计费状态同步问题，直接影响付费用户的使用，评论数高居榜首，反映订阅流程存在严重的状态一致性缺陷。

### 2. Go Pro 订阅与 Share 修饰符需求
[#24879](https://github.com/anomalyco/opencode/issues/24879) — 作者：maebahesioru（11 评论，👍 11）

请求新增 20 美元/月的 Go Pro 档位及 Share 修饰符首月折扣。作者表示每月撞到 OpenCode Go 的流量上限后只能被迫使用难以预算的 Zen 按量付费，社区共鸣较强。

### 3. 官网声称 100% 免费，为何需要订阅？
[#42143](https://github.com/anomalyco/opencode/issues/42143) — 作者：mahmoud-Web-Developer（10 评论）

用户对官方 "100% free" 的宣传与实际订阅要求之间的落差提出质疑。此类问题虽缺少技术深度，但关系到项目信誉，社区争议较大。

### 4. Plan Mode + Question 工具自动切换 Build Mode
[#7801](https://github.com/anomalyco/opencode/issues/7801) — 作者：gasatrya（10 评论，👍 31）

提议在 Plan Mode 下使用 Question 工具后自动切换到 Build Mode，减少手动切换的摩擦。31 个 👍 表明该功能需求非常强烈，是今日获赞最高的 Issue。

### 5. grok-4.5 在 opencode go 上自 8 月 2 日起不可用
[#40206](https://github.com/anomalyco/opencode/issues/40206) — 作者：lirc571（9 评论）

通过 OpenAI Chat Completions API 调用 grok-4.5 始终返回 500。配合 #42802、#40886 等多个同类报告，基本可确认这是 OpenCode Go 侧的模型服务故障，而非用户配置问题。

### 6. 发送 Prompt 后间歇性 Fetch Failed
[#42329](https://github.com/anomalyco/opencode/issues/42329) — 作者：devfortsystems（4 评论）

v1.18.18 更新后，用户发送 0-1 条消息即触发 "Failed to fetch" 错误，重启只能临时缓解。疑似与上游 API 网关或客户端连接管理有关，影响核心使用流程。

### 7. Cloudflare 环境变量导致 Provider.list 崩溃
[#42739](https://github.com/anomalyco/opencode/issues/42739) — 作者：mindofcharles（4 评论）

当系统中存在 Cloudflare 环境变量但未设置 `CLOUDFLARE_API_TOKEN` 时，TUI 启动即崩溃。这是一个防御性编程缺口，环境变量不完整就应跳过而非崩溃。

### 8. grok-4.5 返回 HTTP 503（OpenCode Go）
[#40886](https://github.com/anomalyco/opencode/issues/40886) — 作者：haoming-yang（3 评论）

通过官方文档规定端点调用 grok-4.5 时持续 503，而 deepseek-v4-flash 正常工作。与 #40206 相互印证，确定是 grok-4.5 在特定区域的网关路由问题。

### 9. Deepseek API 计费 token 异常消耗
[#32911](https://github.com/anomalyco/opencode/issues/32911) — 作者：tehNate（3 评论）

用户报告在 v1.17 及以上版本使用 Deepseek API 时被过度计费，Reddit 上有复现讨论。开发者对 token 计量 bug 非常敏感，该 Issue 已持续近两个月仍未关闭。

### 10. V2 headless 命令加载 OpenTUI 并泄漏临时文件
[#37671](https://github.com/anomalyco/opencode/issues/37671) — 作者：chrisae9（4 评论，👍 2）

V2 的 `--version`、`--help`、`service status` 等完全不需要 UI 的命令仍会加载嵌入式 OpenTUI 原生库，且每次执行都在临时目录留下 13.1 MiB 的 `libopentui.so`。高频调用 API 会迅速填满磁盘，属于资源泄漏类 bug。

---

## 重要 PR 进展（10 个）

### 1. 新增插件事件订阅选择机制
[#42830](https://github.com/anomalyco/opencode/pull/42830) — 作者：thdxr（OPEN）

提供 `ctx.event.subscribe(type)` 选择订阅能力，替代现有的通配符形式，并通过 EventManifest.Server 统一事件类型解析。事件系统灵活性的一次重要补强。

### 2. 新增 Incus 工作区分叉支持
[#42829](https://github.com/anomalyco/opencode/pull/42829) — 作者：johnpyp（CLOSED，标记 needs:compliance）

基于 Incus 的工作区提供者，支持容器/VM 蓝本、快照分叉、子代理隔离工作区、空闲实例休眠唤醒。工作区隔离体系的关键基础设施。

### 3. 新增 Docker 蓝本工作区
[#42831](https://github.com/anomalyco/opencode/pull/42831) — 作者：johnpyp（OPEN，标记 needs:compliance）

与 Incus 对应，提供本地 Docker 工作区，支持基于提交的容器分叉、子代理隔离、空闲容器停启。两者结合将为沙箱式开发提供完整方案，但均标注合规审核，可能涉及安全审查。

### 4. 事件时间戳改用数字类型
[#42828](https://github.com/anomalyco/opencode/pull/42828) — 作者：thdxr（CLOSED）

V2 事件 `created` 字段从 DateTime 改为 epoch 毫秒数字存储与传输，仅在投影到领域模型时转换。消除往返转换开销与潜在时区问题，是 V2 事件系统的底层清理。

### 5. 批量分发流式会话增量
[#42826](https://github.com/anomalyco/opencode/pull/42826) — 作者：thdxr（CLOSED）

原本每个文本/推理/工具输入片段都作为独立事件逐个发布，实测平均事件负载过高。该 PR 将流式增量合并批量发送，显著降低服务器与客户端的 IO 压力。

### 6. 修复虚拟化时间线 DOM 泄漏
[#42825](https://github.com/anomalyco/opencode/pull/42825) — 作者：Hona（CLOSED）

堆快照显示 `Virtualizer2.elementsCache` 持有已移除的时间线行，长会话中渲染器残留约 37,500 个分离 DOM 节点。该修复释放这些引用，解决 Web UI 长会话内存膨胀问题。

### 7. 统一使用树形目录选择器
[#42820](https://github.com/anomalyco/opencode/pull/42820) — 作者：opencode-agent[bot]（CLOSED）

将 Web UI 所有非原生项目选择器统一为树形目录选择器，移除旧的扁平目录选择器。提升了添加子目录项目的可用性。

### 8. 修复 bwrap PID 命名空间下 SSE 事件丢失
[#37156](https://github.com/anomalyco/opencode/pull/37156) — 作者：TuTouPower（CLOSED，自动化清理）

修复 `opencode serve` 在 bwrap `--unshare-pid` 沙箱内运行时 SSE 事件流在首个数据块后停滞的问题。对沙箱化部署场景至关重要，该 PR 在一个月后自动关闭，状态需确认。

### 9. TUI 模型收藏跨进程同步
[#37172](https://github.com/anomalyco/opencode/pull/37172) — 作者：opencode-agent[bot]（CLOSED，自动化清理）

将模型收藏存储迁移到受管 CLI 配置，并发 TUI 实例可即时（reconcile）同步收藏，修复跨进程配置冲突，并迁移旧 model.json 数据。解决多终端场景下收藏不一致问题。

### 10. 阻止连续空工具循环
[#37110](https://github.com/anomalyco/opencode/pull/37110) — 作者：ChaseWNorton（CLOSED，自动化清理）

当发现类工具连续三次返回空结果/无匹配时，即使模型不断更换查询词也强制停止循环。修复 #31942 中 Agent 无限空转消耗 token 的问题。对 token 敏感用户很实用。

---

## 功能需求趋势

- **工作区/沙箱能力**：Docker 与 Incus 工作区分叉 PR 同时出现，表明项目正在大力构建隔离、可快照的开发环境底座，下一步可能扩展到更多后端（K8s、云 VM 等）。
- **订阅分级与计费透明度**：关于 Go Pro 档位、免费/付费边界的讨论热度高，社区希望有更灵活的付费选项（如按量、订阅、首月折扣）和更透明的计费状态同步。
- **模型可用性稳定性**：grok-4.5 的连续故障引发多条 Issue，开发者对热门新模型的快速接入与故障恢复有强烈期望。
- **TUI/终端交互优化**：Plan Mode 自动切换、链接可点击性（Kitty 换行链接）、鼠标滚轮行为等持续被提及，说明 TUI 细节体验仍是重度用户的核心关注点。
- **AI 记忆与上下文管理**：模型收藏同步、事件系统重构等 PR 背后，是用户对跨会话/跨进程一致性的需求。

---

## 开发者关注点

- **计费异常最扎心**：付款成功却无额度（#37790）、Deepseek 过度计费（#32911）直接损害付费用户信任，需要优先排查。
- **grok-4.5 故障范围扩大**：从 500 到 503 再到 "Unexpected server error"，多个 provider（Go/Zen）均受影响，服务端需尽快定位并发布状态说明。
- **空转与 token 浪费**：Agent 空工具循环、headless 命令泄漏临时文件等细节虽小，但在高频率调用场景下会放大成本与磁盘占用。
- **内存与性能**：虚拟化时间线 DOM 泄漏（37,500 节点）和单个事件逐个发布的低效，暴露了长会话和流式场景的性能隐患，好在相关修复已在合入。
- **实验性 feature 合规门槛**：多个新增功能 PR 被标注 `needs:compliance`，建议参与社区开发的贡献者提前了解合规要求以免 PR 被关闭。

---

*本日报由 AI 自动生成，数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-16

> 数据来源：earendil-works/pi | 统计周期：2026-08-15 至 2026-08-16

## 今日速览

昨日 Pi 仓库无新版本发布，但社区围绕 **上下文压缩（Compaction）机制** 的讨论显著升温：#6879（自动压缩失效）以 17 个 👍 成为近期关注度最高的问题，另有多条针对压缩触发时机、错误恢复和 token 统计的 PR 集中合入。新模型支持方面，DeepSeek V4 Flash 在 opencode 等提供商上的思考级别缺失问题已修复，xAI 模型路由也有重要调整。此外，TUI 渲染的光标闪烁、滚动配置等体验问题成为开发者反馈热点。

---

## 社区热点 Issues（Top 10）

### 1. 自动压缩在上下文超过 100% 后仍未触发，直至 API 报错 🌟
[#6879](https://github.com/badlogic/pi-mono/issues/6879) · [OPEN] · 21 条评论 · 👍 17

> 用户反馈在 gpt-5.6-sol 上运行 2 小时以上的 agentic 任务时，上下文占用超过阈值后压缩机制未及时触发，直到 API 在 373k tokens 处拒绝请求才被迫压缩。建议在每次 agent turn 后检查上下文占用。

**分析**：这是当前社区最痛的问题，压缩策略的时机判断存在明显缺陷，直接影响长任务稳定性。

### 2. Pi 在 WSL 中登录挂起（GitHub Copilot 设备授权流程）
[#6187](https://github.com/badlogic/pi-mono/issues/6187) · [CLOSED] · 27 条评论

> WSL 环境下安装成功，浏览器设备授权完成后 Pi 客户端未能检测到授权状态，终端一直卡在登录等待状态。

**分析**：评论最多的问题，WSL 集成问题持续影响开发者在 Windows 下的使用体验。

### 3. “Response was truncated before completion” 错误
[#7855](https://github.com/badlogic/pi-mono/issues/7855) · [CLOSED] · 5 条评论

> 使用任何 OpenAI 兼容 API（本地 VLLM 可复现）时随机出现响应截断错误，需要手动提示继续。

### 4. 全屏模式鼠标滚轮滚动步长被硬编码为 1 行
[#7765](https://github.com/badlogic/pi-mono/issues/7765) · [CLOSED] · 5 条评论 · 👍 2

> `TuiAltScreen` 中 `wheelScrollLines` 默认值固定为 1 行且不可配置，建议支持用户自定义滚动步长。

### 5. 新增 shell 补全脚本生成器
[#4776](https://github.com/badlogic/pi-mono/issues/4776) · [CLOSED] · 4 条评论 · 👍 5

> 建议增加 `pi completion <bash|zsh|fish>` 子命令，向 stdout 输出补全脚本，用户可在 rc 文件中 source。

### 6. OpenAI Codex 协议将可选工具参数变为必填
[#8105](https://github.com/badlogic/pi-mono/issues/8105) · [CLOSED] · 4 条评论

> `openai-codex-responses` 序列化工具时携带 `strict: null`，导致 gpt-5.6-sol 将可选参数当必填处理，强制调用方提交全部属性。

### 7. Bash 工具的 PI_* 环境变量指南引发无关权限提示
[#7787](https://github.com/badlogic/pi-mono/issues/7787) · [OPEN] · 3 条评论

> 默认 `exposeSessionEnvironment: true` 时，Pi 给每个 agent 会话注入“检查 PI_* 环境变量”的指南，模型在执行普通任务时会先跑 `env` 触发不必要的权限确认。

### 8. TUI `fullRender` 因超出 V8 字符串限制崩溃
[#8028](https://github.com/badlogic/pi-mono/issues/8028) · [OPEN] · 2 条评论

> 视频处理 agent 读取大量图片后 `pi` 崩溃：`RangeError: Invalid string length at fullRender`。

### 9. 流式输出时输入框光标剧烈闪烁
[#8003](https://github.com/badlogic/pi-mono/issues/8003) · [OPEN] · 2 条评论

> 助手流式输出期间，输入框光标闪烁速度异常快，输入时尤其明显，疑似渲染循环反复重置光标状态。

### 10. Windows 下 bash 工具可杀死自身宿主进程
[#8170](https://github.com/badlogic/pi-mono/issues/8170) · [CLOSED] · 2 条评论

> Pi 内置 bash 工具执行模型生成的 `taskkill /F /IM node.exe` 无需确认，因 Pi 自身运行在 node.exe 下，直接杀死了 pi-web 宿主进程及 Next.js 进程。

---

## 重要 PR 进展（Top 10）

### 1. 在安全的 turn 边界执行压缩
[#8153](https://github.com/badlogic/pi-mono/pull/8153) · [CLOSED]

> 新增运行级边界压缩请求 API，在 Pi turns 之间消费；同一 run 内重建实时上下文，保留 native recent tail，并在活动信号中止时停止。

### 2. 修复压缩后从尾部 assistant 消息续跑导致的崩溃
[#8164](https://github.com/badlogic/pi-mono/pull/8164) · [CLOSED]

> 静默溢出压缩在已完成 turn（stopReason 'stop'）后误调用 `agent.continue()`，从尾部 assistant 消息续跑引发 “Cannot continue from message role: assistant” 崩溃。修复后仅当 turn 因错误中途失败时才重试。

### 3. token 统计仅按计费口径计算
[#8165](https://github.com/badlogic/pi-mono/pull/8165) · [CLOSED]

> `getStats` 的 `tokens.total` 此前包含按 1/120 费率计价的缓存 token，导致压缩预算和状态统计失真。修复后 total 仅含 input + output，缓存单独报告。

### 4. DeepSeek V4 Flash 在 opencode 提供商上暴露 low 思考级别
[#8181](https://github.com/badlogic/pi-mono/pull/8181) · [CLOSED]

> 将 `DEEPSEEK_V4_FLASH_THINKING_LEVEL_MAP` 扩展至 opencode/opencode-go，解决该模型在非 deepseek 提供商上缺失 `low` 级别的问题。

### 5. 限制 Baseten 上 DeepSeek V4 Flash 输出为 384k
[#8146](https://github.com/badlogic/pi-mono/pull/8146) · [CLOSED]

> models.dev 报告 Baseten 上该模型输出上限为 1M tokens，但实际服务只有 384k，超出即失败。已在 `sdk` 中为 `maxTokens` 设上限。

### 6. Bash PI_* 指南限定到会话相关问题
[#8148](https://github.com/badlogic/pi-mono/pull/8148) · [CLOSED] · 修复 #7787

> 将“可检查 PI_* 环境变量”的指南改为仅在与会话相关的问题中注入，避免模型在普通任务中执行无关的 `env` 操作及 permission prompts。

### 7. 渲染期间避免重置光标闪烁
[#8155](https://github.com/badlogic/pi-mono/pull/8155) · [OPEN]

> 在 `TuiBase` 中跟踪终端光标可见性，仅在状态切换时发送可见性命令；同时覆盖普通和全屏渲染器，保持生命周期与设置调用正常。

### 8. Mermaid 终端渲染升级
[#8158](https://github.com/badlogic/pi-mono/pull/8158) · [OPEN] · Closes #8157 #7832

> 将 grok-mermaid 迁移至 lovely-mermaid，后者解析器投入更多维护精力，修复原库继承的大量边界情况。

### 9. xAI 模型切换至 Responses API 并默认 Grok 4.6
[#8124](https://github.com/badlogic/pi-mono/pull/8124) · [OPEN]

> xAI 提供商默认从 Completions API 迁移到 Responses API，发送用户代理，并将默认模型从 Grok 4.5 升级至 Grok 4.6。

### 10. 移除无效的 OpenAI 会话请求头
[#8149](https://github.com/badlogic/pi-mono/pull/8149) · [CLOSED]

> 当请求携带 `sessionId` 时，OpenAI Responses 会发送含下划线的 `session_id` HTTP 头，被 HTTP/1 代理（Envoy）拒绝返回 400 错误。现改为省略该 header 以兼容代理。

---

## 功能需求趋势

| 方向 | 相关 Issues/PR | 热度 |
|------|---------------|------|
| **上下文压缩与窗口管理** | #6879、#8164、#8153、#8175、#8176、#8168 | 🔥 极高，压缩触发时机、失败恢复、边界处理、工具结果裁剪均有反馈 |
| **新模型/提供商支持** | #8178（LLMTR）、#8182（DeepSeek low）、#8124（xAI）、#8167（llama.cpp） | 高，多模型服务适配需求持续 |
| **TUI 交互体验** | #8003（光标闪烁）、#7765（滚轮步长）、#8171（thinking 块滚动/折叠）、#8154（隐藏块空白行） | 高，渲染细节打磨成社区焦点 |
| **扩展系统能力** | #8175（压缩失败事件）、#8180（shortcut context）、#7147（UI 对话框事件）、#8169（model_select_before 可取消钩子） | 中，扩展开发者希望更细粒度的事件和钩子 |
| **终端/平台兼容** | #6187（WSL 授权）、#8170（Windows taskkill）、#8184（stdout 泄漏）、#8183（Ctrl+Shift+F 冲突） | 中，Windows/WSL 场景问题需系统性加固 |
| **文档与引导** | #8058（停止响应的文档）、#8183（按键冲突文档） | 中，入门困惑影响新用户转化 |

---

## 开发者关注点

- **压缩机制可靠性不足**：从自动压缩不触发（#6879）到压缩后崩溃（#8164），再到压缩失败静默（#8175）、压缩破坏消息角色（#8168），开发者在长会话场景下持续踩坑。核心诉求是压缩应当“在安全的边界、用可靠的口径、以可观测的方式”执行。
- **TUI 渲染细节亟待打磨**：光标闪烁、滚动步长、thinking 块布局、渲染字符串长度限制等 UI 细节在多个 Issue 中出现，反映出随着功能增多，终端渲染层需要一次系统性的质量整理。
- **WSL/Windows 体验仍是短板**：从登录授权挂起到进程可被自身工具杀死，Windows 平台的问题往往以“奇怪姿势”出现，社区期待更完善的平台适配和权限确认机制。
- **跨提供商一致性需求强烈**：同一模型在不同提供商上的思考级别、输出上限、可选参数语义不一致，给使用多提供商的用户带来配置负担，模型元数据生成逻辑需要统一校准。
- **扩展 API 的可见性不足**：压缩失败、对话框生命周期等内部事件没有透出到扩展系统，第三方开发者只能依赖猜测或规避方案，建议官方补齐事件通知机制。

---

*本日报由 AI 自动生成，数据基于 earendil-works/pi 仓库截至 2026-08-16 的公开 GitHub 信息。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-16）

## 今日速览

昨日（8/15）发布 v0.21.11-nightly 版本，核心为 autofix 的 deny-by-default footprint gate 改进，并有多轮 SWE-bench Verified + Terminal-Bench 2.0 端到端 smoke 验证全部通过。社区侧，/review 命令在真实使用中暴露出十余个边界问题（重叠检测、并发 worktree 竞争、schema 摩擦），成为当前最集中的工程痛点；同时多个 P1 级主分支 CI 失败令稳定性问题受到关注。

## 版本发布

**v0.21.11-nightly.20260815.c396fe3d12**

主要更新：feat(autofix) 引入 deny-by-default footprint gate 和 positional window censuses。随版本附带多轮 DSW EAS smoke 验证，包括 SWE-bench Verified（swe-bench/swe-bench-verified@2）与 Terminal-Bench 2.0 的端到端串联跑批，结果均为 SUCCEEDED。

## 社区热点 Issues

以下 10 个 Issue 在过去 24 小时讨论最集中、影响面最广：

1.  **#7427 web-shell artifact 面板自动刷新报错**（评论 5）  
    [链接](https://github.com/QwenLM/qwen-code/issues/7427)  
    `qwen serve` 的 web shell 在自动刷新 artifact 列表时持续弹出 "Load artifacts failed: Failed to fetch"。该问题已持续近一个月，至今未关闭，社区关注度高。

2.  **#9208 /review overlap-drop 吞掉 ledger 重复提交**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9208)  
    presubmit 按 (path, line) 精确匹配，内容盲删。导致已携带的 ledger ID 丢失，同一行不同声明被静默丢弃。wenshao 在 PR #9118 的 round-4 审查中发现。

3.  **#9219 /review presubmit 重叠匹配仅精确到行**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9219)  
    多行 inline 范围被忽略，重复审查建议可绕过 noConflict 检查。与 #9208 同属 /review 可用性问题群。

4.  **#9205 同 PR 并发 review 竞争固定 worktree 路径**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9205)  
    两个会话 review 同一 PR 时，cleanup 会在五分钟后删掉另一方正在使用的 worktree。并发安全缺口，直接影响多人协作场景。

5.  **#9089 autofix PAT 任务与不可信分支代码共享主机**（评论 4，P1）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9089)  
    需要 runner 级隔离的安全问题，wenshao 指出在 GitHub Actions step 内部无法闭合，需基础设施层面配合。

6.  **#9250 qwen serve 硬编码新文件模式 0600**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9250)  
    write_file / edit 等工具创建新文件时忽略 umask，且无配置项。多用户环境下权限管理受限。

7.  **#9230 前缀缓存失效导致 ~0% 复用**（评论 3）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9230)  
    主会话每轮按 LRU 调度，prefix 相似度低于 0.10 阈值，需完整重算上下文。开启 enableCacheSharing 可缓解但默认关闭。

8.  **#9198 长时间运行后 OOM**（评论 3）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9198)  
    qwen 进程运行一周多后在 1T 内存服务器上 OOM，且 tmux 终端出现按键错乱、滚动失效。用户明确对比 Kimi Code 行为，表达强烈不满。

9.  **#5966 中文输入法不定期失效**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/5966)  
    0.19.3 起 UI 出现中文输入法完全失效，只能输入拼音且不报错。中文用户高频痛点，状态仍为 need-information。

10. **#9200 相同任务但执行过程差距巨大**（评论 4）  
    [链接](https://github.com/QwenLM/qwen-code/issues/9200)  
    同一任务、同一本地模块，结果相同但过程差异极大。用户公开质疑“qwen code 连已停服的 iFlow CLI 都不如”，负面情绪集中。

## 重要 PR 进展

以下 10 个 PR 在过去 24 小时有实质推进，覆盖缺陷修复、安全加固和新功能：

1.  **#9228 收窄自托管 runner 的 workspace 擦除范围**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9228)  
    原 wipe 步骤会删除整个共享工作区含 `.git`（约 900MB），导致后续任务完整重下历史。改为仅清理 A/B checkout 目录，显著降低 CI 耗时。

2.  **#9211 为 PR review worktree 增加租约锁**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9211)  
    把 review worktree 的 lease 升级为互斥锁，任何 destructie 操作前先检查，直接闭环 #9205 的并发删除问题。

3.  **#9212 豁免携带 ID 的 re-post 避免误删**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9212)  
    presubmit 重叠门控引入 id 感知：现有评论若携带相同 ledger ID（如 R4-3），则视为已有评论放行，补齐 #9208 的逻辑盲区。

4.  **#9222 规范化 last-gate 输入并锚定行中片段**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9222)  
    让 /review 管线最终的 gates 接受自己上游产出的 source tags、state 字段类型和 locations 结构，避免数小时分析在终点失败。

5.  **#9189 autofix 新增 Defer to follow-up 处置**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9189)  
    已验证但超出当前 PR footprint 的 finding 进入机器可读的 follow-up 队列，防止审查结论随 PR 关闭而丢失。

6.  **#9167 DingTalk 通道支持出站文件投递**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9167)  
    通过 DingTalk media API 上传并发送本地文件（workspace 或系统临时目录内），扩展 IM 渠道能力。

7.  **#9087 WebShell 采用 Goal v3 控件**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9087)  
    在首条消息前即可创建、编辑、暂停、替换 Goal，不再需要将控制命令路由给模型解析，交互路径更短。

8.  **#9113 读取前嗅探图像内容**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9113)  
    detectFileType 先校验 magic format，修正扩展名与内容不符的问题（如 UTF-8 文本存成 .png 仍可按文本读；二进制则拒绝）。

9.  **#9163 所有 ledger/evidence 读取收敛到常规文件**  
    [链接](https://github.com/QwenLM/qwen-code/pull/9163)  
    单次 open 加 O_NOFOLLOW + fstat 同一描述符，验证对象即读取对象，闭环 R2-2 审计类安全发现。

10. **#8938 拒绝上游 fail-fast 占位响应**  
    [链接](https://github.com/QwenLM/qwen-code/pull/8938)  
    防止模型端快速返回 HTTP 200 但内容仅为 "(request timed out)" 的假成功响应污染会话状态。

## 功能需求趋势

从当日全部 Issue/PR 中可提炼出四个清晰方向：

- **/review 管线工程化**：近半问题集中在重叠检测、并发锁、schema 兼容、chunk retirement 等审查基础设施。社区已把 /review 当核心工作流使用，对边角情况的容忍度变低。
- **安全与权限治理**：runner 隔离（#9089）、文件权限可配置（#9250）、symlink 防护（#9163）、PAT 最小化等安全议题密集出现，成为主动投入方向。
- **Web Shell 体验补齐**：Git diff 源、会话 hover 预览、HTML 导出统一渲染、artifact 面板稳定性，Web Shell 正从可用走向好用。
- **性能与资源控制**：前缀缓存复用（#9230）、长时间运行 OOM（#9198）、ACP HTTP 缓冲按字节限制（#9007），说明服务端长稳运行开始被社区严肃对待。

## 开发者关注点

- **CI 稳定性告急**：#9241、#9239、#9237、#9248 全部是 P1级主分支 E2E 失败，集中在 build-system 与 SDK 范围。虽然 bot 自动跟踪，但高频失败已经影响外部贡献者对主干健康的信心。
- **/review 的摩擦成本**：多名维护者在同一 PR 上反复遇到 last-gate 拒绝、worktree 被删、overlap 误吞，单次 review 动辄数小时却倒在终点，可见成本非常高。
- **中文输入法问题积压**：#5966 持续近 7 周仍为 need-information，中文用户呼声强烈，是本地化体验的最大短板。
- **进程可靠性期待**：OOM 后终端乱码、上游占位响应、长时间不退出等问题，反映出开发者对 AI 编程助手“持续运行”场景的稳定性有更高预期。
- **配置灵活性诉求**：文件权限写死、缓存共享默认关闭、worktree 路径固定等“硬编码”行为，社区希望转为可配置项，以便适配各自团队的工作流。

如需对某个 Issue（如 #9208 的 overlap 逻辑）或 PR（如 #9211 的 worktree 锁）做更深入的技术拆解，我可以单独展开分析。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI（CodeWhale）社区动态日报

**日期：2026-08-16** | 数据源：github.com/Hmbown/DeepSeek-TUI（现 CodeWhale）


## 1. 今日速览

v0.9.8 稳定化进入密集收尾阶段：此前 CI 的 `cancel-in-progress` 机制长期掩盖 main 分支失败，昨日修复后 macOS/Windows 双平台多起红构显形，团队连续提交 12+ 个 PR 集中修复。社区侧，持续三周的 #4949「Constitution 中文翻译」讨论尘埃落定，终以「宪章」定案并同步至官网；功能开发方面，第三方模型预制模板（#5350）与可配置读取预算（#5367）两大需求已进入实现通道。


## 3. 社区热点 Issues（精选 10 项）

### 🔥 社区讨论与决策

- **#4949 [CLOSED]「Constitution」中文翻译终局：宪章定案**
  「宪法」「协作准则」之争历时三周、17 条评论，最终以「宪章」达成共识。讨论过程充分反映了项目对中文母语社区意见的重视，且结论已同步落实到 TUI 与官网文案。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/4949) | 评论 17 | 更新 08-15

- **#5316 [OPEN] EPIC-005：CodeWhale TUI Crate 分解（总括）**
  架构级重构的追踪 Issue，所有子 EPIC 与 FEAT 均汇总于此。涉及 crate 边界重划，是当前最值得关注的长期工程方向。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5316) | 评论 7 | 更新 08-15

### 🐛 高影响 Bug

- **#5374 [OPEN] 代理书写文本乱码（macOS）**
  用户反馈 macOS 下 agent 流式写字时文本全面乱码（截图显示 U+FFFD/CJK 坏字符），直接影响核心体验。已定位为 SSE 在 HTTP/2 DATA 帧间拆分多字节 UTF-8 字符所致，修复 PR #5404 已提交。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5374) | 评论 5 | 更新 08-15

- **#5322 [CLOSED] 回归：宽终端下输出区不填满（v0.8.65 正常）**
  v0.9 起转录区域被限制最大宽度，宽屏/多栏终端出现大量空白。已在 #5400 修复，恢复 v0.8.65 行为，扩展示例验证通过。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5322) | 评论 3 | 更新 08-15

- **#5241 [OPEN] 定价端点 503：所有会话显示 unverified_live_pricing**
  升级至 0.9.3 后全部会话失去成本显示，跨三个不同提供商路由复现，统一报 `unverified_live_pricing`。修复 PR #5402 已提交，核心策略改为「可验证则显示，不可验证则回退本地估算」。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5241) | 评论 2 | 更新 08-15

- **#5403 [OPEN] 双平台 CI 红构汇总：macOS plugin_e2e 与 Windows NSIS**
  #5395 修复 CI 互相取消后，已完成的四次运行在 macOS/Windows 全部飘红。为新增信息而非新破坏，团队已定位到具体环节（PTY 保活挂起、NSIS 配置等）。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5403) | 评论 1 | 更新 08-15

### ✨ 功能需求（已进入实现）

- **#5350 [OPEN] 简化第三方模型配置，增加预制模板**
  配置 OpenCode Zen / Go、Agnes、美团 Sensenova 等需手动填 Base URL、模型名、环境变量，且保存后常卡在 `not checked` / `cache failed`。诉求：内置模板、一键测试连接、修复缓存加载。已由 PR #5406 实现。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5350) | 评论 3 | 更新 08-15

- **#5367 [OPEN] 可配置模型可见读取/工具结果大小限制**
  自托管 DeepSeek V4 等长上下文模型受限于 `read` 50 KiB / `read_file` 16 KiB / 工具结果 12,000 字符的单结果上限，读一个 64 KiB 文件需额外约 20 次读取。建议在模型或 HarnessProfile 级暴露配置。已由 PR #5405 实现。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5367) | 评论 3 | 更新 08-15

- **#5410 [OPEN] 允许在 bwrap 沙箱中配置额外根目录**
  使用 Zig 工具链时沙箱出现「access denied」：`/dev/null` 重定向被禁、系统库链接失败。需要允许用户在沙箱中挂载额外只读/可写根，使沙箱兼容更多编译场景。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5410) | 评论 1 | 更新 08-15

- **#5060 [CLOSED] 工作流搜索硬编码 16 并发上限**
  实验性搜索在 `experimental_search.rs:24` 硬编码 `WORKFLOW_SEARCH_MAX_CONCURRENT: u16 = 16`，未读取 Fleet 池的并发配置。应打通配置缝并以 16 为回退值，且在运行回执中体现实际限制值，便于运维观测。
  [查看 Issue](https://github.com/Hmbown/CodeWhale/issues/5060) | 评论 2 | 更新 08-15


## 4. 重要 PR 进展（精选 10 项）

### 🚀 v0.9.8 稳定化

- **#5407 [OPEN] v0.9.8：完成分配的剪切任务**
  将 `codex/v098-final-20260814` 分支的 v0.9.8 终版改动合入 main，目标 tag 为 `d30effc8`。本地等价于 #5322/#5400 的会话 shell 几何修复已在该分支上，本次合并保持行为一致。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5407) | 更新 08-15

- **#5399 [CLOSED] v0.9.8 稳定化：turn 自有代理、压缩质量、Blue Stage web**
  在 #5393/#5394/#5395 之上重建缺失的 Rust 稳定化改动。不涉及版本号提升、tag、发布或新功能，纯稳定化。核心修复包括：默认直接子代理改为 turn 持有、压缩质量改进、Blue Stage web 修复。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5399) | 更新 08-15

- **#5395 [CLOSED] 修复 CI：停止 cancel-in-progress 误杀并发的 main 推送**
  main 分支的 CI 在无 PR 编号时共享同一 concurrency group，后推送会取消前一轮运行，导致失败的断言从未变红。拆分为每个 commit SHA 独立组，确保所有检查完整跑完。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5395) | 更新 08-15

- **#5394 [CLOSED] unred v0.9.8 提供商计数断言与 Google ModelRegistry 漂移**
  修复 #5383：`cli_provider_helpers_follow_config_metadata` 断言数值从 43→45（registry）、38→40（catalog）；同时修复 Google Gemini 作为独立后端后带来的 ModelRegistry 漂移。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5394) | 更新 08-15

- **#5393 [CLOSED] 清理两个阻塞 Lint 的 marketplace clippy 告警**
  修复 `marketplace.rs` 中 `CommandRes` 相关两个 clippy 缺陷，解除 main 分支及继承该缺陷的所有 PR 的 Lint 阻塞。仅触碰两处问题，不涉及其他改动。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5393) | 更新 08-15

### 🐛 关键 Bug 修复

- **#5404 [OPEN] SSE UTF-8 跨 HTTP/2 DATA 帧拆分时 fail-closed（#5374）**
  修复 macOS 上 DeepSeek Flash 流式输出乱码：根因是 Chat Completions SSE 逐行解码时，多字节字符恰被 HTTP/2 DATA 帧边界切分，流末 flush 使用 `String::from_utf8_lossy` 产生 U+FFFD。改为跨帧积累字节、仅在完整 UTF-8 序列边界解码，非法序列直接报错而非静默替换。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5404) | 更新 08-15

- **#5400 [CLOSED] 转录区填满终端全宽（#5322）**
  `session_shell_area` 恢复恒等映射，让转录与输入区铺满宿主宽度，重现 v0.8.65 行为；扩展（expand）时重新物化内容，此前收窄逻辑不变。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5400) | 更新 08-15

- **#5402 [OPEN] 实时定价不可验证时恢复会话成本（#5241）**
  当 `api.codewhale.net/session` 返回 503 `control_plane_not_attached` 时，不再让成本永久停留在 `unverified_live_pricing`。改为诚实路径：可验证则用实时价，不可验证则回退本地估算并标注来源。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5402) | 更新 08-15

### ✨ 新功能

- **#5406 [OPEN] 第三方模型预制模板与测试连接（#5350）**
  内置 OpenCode Zen、OpenCode Go、Agnes、SenseNova 四家模板，用户只需填 API Key；配置页嵌入官方文档入口；新增「测试连接」按钮主动刷新状态；修复缓存加载异常。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5406) | 更新 08-15

- **#5405 [OPEN] 可配置模型可见读取/工具结果预算（#5367）**
  将 `read`、隐藏 `read_file` 与工具结果上下文/线上的单结果上限暴露为模型或 HarnessProfile 级配置项，新增一个“大结果预算”等级，自托管长上下文模型（DeepSeek V4）可按需放宽。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5405) | 更新 08-15

- **#5401 [OPEN] 修复 CodeQL Highs（#107、#88–#106）并准备 GHSA-8hp3 / GHSA-3mgh**
  纯安全切片：修复脚本明文日志泄漏远端 catalog 限额（High #107）等 19 个 CodeQL 告警；为两个 GHSA 准备安全公告，不触碰版本 tag、不发布 crates/npm/Homebrew。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5401) | 更新 08-15

- **#5409 [OPEN] 客户端映射规范「ultra」推理强度（兼容遗留 ultracode）**
  `ReasoningEffort::Ultra` 规范化后为 `"ultra"`，但请求路径仍只识别遗留别名 `"ultracode"`，导致显式指定 ultra 时回落为默认档。修复为同时识别规范值与遗留别名，补齐 `normalize_cli_reasoning_effort` 文档语义。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5409) | 更新 08-15

- **#5396 [CLOSED] macOS 下 agy_credentials 测试夹具规范化（#5392）**
  四个 `agy_credentials` 测试在 macOS 全量失败：`TempDir` 返回 `/var/folders/...`，而 `/var` 是指向 `/private/var` 的符号链接；生产代码 `open_secure_regular_file` 对每个路径组件正确应用 `O_NOFOLLOW`，测试夹具则未模拟该语义。修复为在测试中构造无符号链接的临时目录。
  [查看 PR](https://github.com/Hmbown/CodeWhale/pull/5396) | 更新 08-15


## 5. 功能需求趋势

从过去 24 小时更新的 Issues/PRs 中，社区最关注的五个方向：

1. **第三方模型接入易用性（#5350、#5406）**
   用户希望开箱即用，不愿手动填写 Base URL / 模型名 / 环境变量；预制模板 + 测试连接已成刚需，且对 `not checked` / `cache failed` 等状态反馈零容忍。

2. **自托管与长上下文模型调优（#5367、#5405）**
   本地部署 DeepSeek V4 等长上下文模型成为真实场景，当前固定读取/工具结果上限导致额外的往返读取（64 KiB 文件多 ~20 次）。需求明确指向「模型级可配置预算」而非全局开关。

3. **沙箱与安全边界灵活性（#5410）**
   bwrap 沙箱在真实构建场景（Zig 工具链）中过严，需要可配置的额外根目录。趋势从「默认锁死」走向「安全默认 + 用户可扩展」。

4. **终端渲染与平台一致性（#5322、#5374、#5392）**
   终端宽度回归、macOS 流式乱码、macOS 符号链接测试失败——跨平台行为一致性已连续多日占据修复榜单。社区对 macOS 的重视度显著高于以往。

5. **CI/CD 可观测性与稳定性（#5395、#5403）**
   `cancel-in-progress` 导致的「假绿」被修复后，真实红构暴露；社区开始关注：CI 失败信息本身需可操作（分平台、分 commit 清晰呈现），不能靠取消机制掩盖。


## 6. 开发者关注点

### 痛点高频词

- **macOS 专属问题**：乱码（#5374）、符号链接（#5392）、PTY 保活挂起（#5408）——macOS 正成为 Bug 高发平台，需专人跟进。
- **「配置完用不了」**：#5350 中保存后卡在 `not checked` / `cache failed`，且无文档提示——第三方模型接入的反馈链路仍需补齐。
- **定价服务依赖**：#5241 中 `api.codewhale.net` 503 导致成本显示全灭——对云端控制面的单点依赖，在自托管场景下格外脆弱。
- **CI 红构「看不见」**：#5395 修复前，并发取消导致失败断言从未变红——基础设施问题掩盖了真实回归，需要从机制上保证每次 push 的检查完整可见。

### 高频需求清单

| 需求 | 来源 | 状态 |
|---|---|---|
| 第三方模型预制模板 + 测试连接 | #5350 | 已实现（#5406） |
| 可配置读取/工具结果预算 | #5367 | 已实现（#5405） |
| 沙箱额外根目录 | #5410 | 待开发 |
| ultra 推理强度规范化 | #5409 | 已提交 |
| CI 并发取消修复 | #5395 | 已合并 |
| 实时定价不可用降级 | #5241 | 已提交（#5402） |
| 宽终端填充回归 | #5322 | 已合并（#5400） |

---

**总结**：今日主线是「止血与收口」——v0.9.8 的稳定化、CI 可见性修复、macOS 专属 Bug 批量清剿同步推进；同时「宪章」术语定案标志着中文社区协作进入新阶段。功能侧，预制模板与读取预算两大需求从 Issue 到 PR 仅用 2-3 天，响应速度值得肯定。建议社区关注 #5410（沙箱灵活性）的后续进展，这可能是下一个进入实现通道的功能需求。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*