# AI CLI 工具社区动态日报 2026-08-13

> 生成时间: 2026-08-13 09:48 UTC | 覆盖工具: 10 个

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

## 1. 生态全景

AI CLI 工具已从“代码辅助”演进为“Agent 平台”，竞争焦点转向多代理编排、MCP 生态、跨端协同与无人值守能力。头部工具（Claude Code、Codex、Gemini CLI）密集发布修复版本与架构性 PR，但稳定性和信任问题（Windows 回归、内存失控、计费/配额争议）正成为共同瓶颈。社区对“跨端会话同步”和“上下文持久化”的呼声最高，说明用户已开始以全工作流视角要求工具具备“连续记忆”。同时，MCP 认证可靠性、模型选择透明度和资源治理开始进入质变窗口，行业正从“能用”走向“可靠、可控、可解释”。

## 2. 各工具活跃度对比

| 工具 | 热点 Issue 数 | PR 数 | Release 情况 |
|---|---|---|---|
| Claude Code | 10 | 2（docs-only） | v2.1.231 / v2.1.229（修复版） |
| OpenAI Codex | 10 | 10（架构级） | 2 个 Rust alpha（0.148.0 系列） |
| Gemini CLI | 10 | 10（含 2 个安全修复） | v0.56.0-nightly |
| GitHub Copilot CLI | 10 | 2（1 个安全基建） | 无 |
| Kimi Code CLI | 1（更新活跃） | 2（长期悬挂） | 无 |
| OpenCode | 10 | 10 | v1.18.17 / v1.18.18 |
| Pi | 10 | 10 | 无 |
| Qwen Code | 10 | 10 | v0.21.11 正式版 / v0.21.12-preview.1 / Desktop v0.2.1 |
| DeepSeek TUI（CodeWhale） | 10 | 10 | v0.9.7 正式版 |
| Grok Build | 0 | 0 | 无 |

## 3. 共同关注的功能方向

**① 跨端/跨会话上下文持久化**
Claude Code #28791（CLI ↔ 桌面同步，👍 123）、Kimi Code #1283（持久记忆系统，37 评论）、Gemini CLI Auto Memory 问题簇（#26516/#26522/#26525）、Qwen Code 项目记忆工作区化——多方不约而同聚焦“会话不再失忆”。

**② MCP 生产级可靠性**
Claude Code 修复 MCP OAuth redirect mismatch；Copilot CLI 一天内 3 个新 Issue 全部指向 OAuth 静默刷新失败（#4464/#4472/#4463）；Gemini CLI 修复 MCP 配置损坏时 fail-open 与数据丢失（#28787/#28794）；CodeWhale 修复 `nextCursor: null` 导致的严格客户端拒绝。MCP 已从“能连上”进入到“连上后不崩、不丢、不频繁重登”的成熟期。

**③ Windows / 桌面端稳定性**
Claude Code 多条 Windows 回归（GPU 崩溃 #81698、对话丢失 #24172、消息静默丢失 #86012/#86208/#86237/#86298）；Codex Windows 扩展无法加载（#37458）、自动升级损坏启动器（#38039）；Copilot WSL2 Ctrl+H 误识别（#4328）、Windows socket 错误（#4463）；Qwen Code Windows 弹终端（#9043）。Windows 成为全行业“基础体验洼地”。

**④ 自动化与无人值守能力**
Claude Code auto-continue（👍 86）；Gemini CLI 容量错误静默重试（#28790）；Codex 中断回合恢复（PR #38303）；OpenCode `opencode run` 配额耗尽后无限挂起（#40747）。深夜长任务、CI 集成场景正从“手动续跑”走向“自动恢复 + 可观测”。

**⑤ 成本与配额可观测性**
Claude Code Max 未使用被扣满（#81684/#82506）引爆计费信任危机；Codex TUI 新增 thread-credits 与成本估算（PR #38281/#38282）；OpenCode TUI 显示每日成本（PR #39807）。开发者对“钱去哪了”和“限额还剩多少”有实时可视化需求。

**⑥ 上下文压缩与资源治理**
Pi 压缩在超 100% 后仍不触发（#6879）；OpenCode 内存 Megathread（129 评论）与 event 表膨胀至 13GB（#33356）；Codex 压缩后 base64 图片导致体积不降反增（#23257）；Copilot tgrep 索引 OOM（#3976）。长会话与 image-heavy 工作流正在倒逼压缩机制重构。

## 4. 差异化定位分析

| 工具 | 定位 | 核心证据 |
|---|---|---|
| **Claude Code** | 一体化 Agent 平台：CLI + 桌面 + 远程 Runner 协同，以订阅制承载全功能 | 修复集中于远程控制与 Runner，社区顶流需求是跨端同步 |
| **OpenAI Codex** | 企业级 Rust 架构底座 + IDE 深度集成（LSP） | 10 个 PR 均为线程模型/审批管线/gRPC 承载等架构收口；LSP 需求 449 👍 全场最高 |
| **Gemini CLI** | 工程化研发体系最完整：组件级评估、安全基线、子代理治理 | 发布夜间版强化 eval 体系；同日合入 2 个安全修复，子代理 P1 问题集中整治 |
| **GitHub Copilot CLI** | GitHub 生态延伸：组织策略、远程 MCP、模型管理 | 议题聚焦组织模型可见性、OAuth 刷新、钩子失效；PR 节奏较慢但安全升级务实 |
| **Kimi Code CLI** | 轻量、低门槛，社区诉求聚焦“记忆”与基础健壮性 | 唯一活跃 Issue 即记忆系统，PR 多为边缘 bug 修复且悬挂数月 |
| **OpenCode** | 开源社区驱动，本地/自定义 provider 与桌面端并进 | 本地 server provider 自动发现模型（#19959）、工作区 UI PR；同时承受最多资源治理压力 |
| **Pi** | 终端交互细节控 + 多 provider 兼容层 | 光标 1.6s 延迟修复、模糊宽度对齐、Ollama 代理；社区规模小而技术密度高 |
| **Qwen Code** | 多代理编排落地最快，云认证与桌面迁移并行 | Fleet 四阶段路线图全部关闭；Vertex/ADC 认证问题集中；Electron→Tauri 升级面全平台 |
| **DeepSeek TUI (CodeWhale)** | 品牌重建期的社区产品：发布管线与贡献者体验是当前主战场 | v0.9.7 发布暴露 npm 凭据/GH_TOKEN/超时三连挫；maintainer harvest 机制加速社区 PR 合入 |

## 5. 社区热度与成熟度

- **现象级热度**：OpenCode 内存 Megathread（129 评论 / 97 👍）、Codex LSP 需求（449 👍，全场最高）、Claude Code 跨端同步（123 👍）——三者分别代表“稳定性焦虑”“IDE 能力渴望”“工作流连续性”三大情绪的峰值。
- **快速迭代梯队**：Codex / Gemini CLI / Qwen Code / OpenCode 均保持每日 10 个 PR 的节奏，且 PR 类型从功能堆叠转向架构收口（线程模型、审批管线、评估体系、daemon 可观测性），说明已进入平台成熟前的“补课期”。
- **活跃但节奏分化**：Claude Code Release 频繁（2 个修复版/日）但 PR 仅文档级，核心开发完全闭源；Copilot CLI PR 稀疏，Issue 质量高但解决速度滞后（钩子失效 #1730 拖了近半年）。
- **小体量社区**：Kimi Code（仅 1 个活跃 Issue）、Pi（单 Issue 评论数普遍 ≤ 18）、CodeWhale（发布链路尚不稳定）仍处于从“工具”向“平台”爬坡的早期。
- **Grok Build** 无公开动态，稳定性存疑或处于封闭开发期。

## 6. 值得关注的趋势信号

1. **“全端一体化”成为基本盘**：CLI 不再是孤立终端应用，桌面端、IDE、远程控制、移动端正在被要求无缝衔接。Claude Code 的跨端同步需求登顶，Codex 的 LSP 呼声最高，Qwen 桌面端跨平台升级受阻——谁能先打通“会话随人走”，谁就掌握下一阶段入口。

2. **信任 = 显式性 + 可观测性**：模型被静默降级（Copilot #4462）、配额被无端消耗（Claude Max）、认证静默失败（Copilot #4464）正在制造信任危机。用户要求“配置了什么就是什么、限额剩多少看得见、权限请求可解释”，fail-explicit 将成为设计红线。

3. **MCP 生态进入“生产环境压力测试”**：OAuth 刷新并发冲突、配置损坏 fail-open、严格客户端语法拒绝——这些问题说明 MCP 正被真实商业流量检验。企业采用 MCP 前，一定会先要求认证、重试、配置健壮性达标。

4. **上下文管理是下一轮护城河**：跨端同步、自动记忆、AST 感知、压缩预算、fork 历史节点——单一能力已不稀缺，组合成“连续上下文系统”才是壁垒。Pi/Qwen/Gemini 各自切入压缩触发、fork 分支、记忆治理，但尚无一家提供完整方案。

5. **子代理/多代理从“炫技”走向“可靠性治理”**：Gemini 的误报成功（#22323）与无限挂起（#21409）、Qwen 的 fleet 质量隔离（SWE-bench QUARANTINED）、Codex 的中断回合恢复 PR——行业共识是：功能已完成，接下来是防挂起、防误报、可恢复、可观察。

6. **Windows 兼容是大众化的“最后一公里”成本**：几乎所有工具的 Windows 反馈都集中于进程崩溃、输入映射、socket 权限、自动更新损坏。以北美开发者为主的开源主力对 Windows 的投入不足，正成为工具下沉至企业主流开发者的最大短板。

7. **开源治理模式开始分化**：CodeWhale 的 maintainer harvest、Kimi 的 PR 长期悬挂、Copilot 的自动化关 PR——社区贡献的“合入体验”正在影响工具生态的长期生命力。贡献者友好的项目（harvest、快速 review）将获得更多外部创新输入。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-08-13）

> 数据源：github.com/anthropics/skills。热度前 20 的 PR 全部处于 Open 状态，说明社区贡献活跃度高、官方合并节奏相对滞后。

## 一、热门 Skills 排行

**1. skill-creator 评估链路修复（#1298）— Open** ⭐最热
- 功能：修复 `run_eval.py` 恒报 `recall=0%` 的问题，将评估产物安装为真实技能，并修复 Windows 流读取、触发检测与并行 worker。
- 讨论热点：对应 issue #556（10+ 独立复现），社区判断描述优化循环「正在对噪声做优化」，创作工具可信度受质疑。
- 链接：https://github.com/anthropics/skills/pull/1298

**2. document-typography（#514）— Open**
- 功能：AI 生成文档排版质量控制——修复孤行（1-6 词溢出）、寡行段落（标题滞留页底）、编号错位三大通病。
- 讨论热点：直击所有 AI 生成文档的共性体验问题，用户很少主动要求但普遍存在。
- 链接：https://github.com/anthropics/skills/pull/514

**3. ODT / OpenDocument 技能（#486）— Open**
- 功能：创建、填充、读取、转换 .odt/.ods，并支持 ODT→HTML 解析。
- 讨论热点：补全 LibreOffice/ISO 标准文档生态，与现有 docx/pdf 形成格式矩阵。
- 链接：https://github.com/anthropics/skills/pull/486

**4. frontend-design 技能改进（#210）— Open**
- 功能：重写前端设计技能，提升清晰度、可执行性与内部一致性，确保指令可在单次对话内被 Claude 实际遵循。
- 讨论热点：社区核心诉求是「技能应是操作手册，而非面向人类的文档」。
- 链接：https://github.com/anthropics/skills/pull/210

**5. skill-quality-analyzer + skill-security-analyzer（#83）— Open**
- 功能：两个元技能——前者从结构/文档/示例等五维评估技能质量，后者对技能做安全分析。
- 讨论热点：呼应 #492 安全信任边界问题，是技能生态的「治理基础设施」。
- 链接：https://github.com/anthropics/skills/pull/83

**6. self-audit 技能（#1367）— Open**
- 功能：交付前先做机械文件校验，再按损害严重度优先级执行四维推理审计，声称适配任意项目/技术栈/模型。
- 讨论热点：与 #1385「推理质量门管线」提案联动，代表输出质量保障方向。
- 链接：https://github.com/anthropics/skills/pull/1367

**7. testing-patterns 技能（#723）— Open**
- 功能：覆盖完整测试栈——Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、边界用例等。
- 讨论热点：反映开发者对「测试生成 / 测试模式标准化」的普遍需求。
- 链接：https://github.com/anthropics/skills/pull/723

**8. ServiceNow 平台技能（#568）— Open**
- 功能：覆盖 ITSM、ITOM、ITAM/SAM、SecOps、FSM、SPM、CSDM、IntegrationHub 的宽平台助手。
- 讨论热点：3 月创建至今持续活跃（最近更新 8/12），企业级平台技能需求旺盛。
- 链接：https://github.com/anthropics/skills/pull/568

> 另：#538/#541/#539 的 pdf、docx、skill-creator 修复类 PR 也位居热度前列，文档格式兼容性与创作工具稳定性是高频痛点。

## 二、社区需求趋势（Issues）

1. **安全与信任边界（#492，43 条评论，最高）**：社区技能被挂载在 `anthropic/` 命名空间下冒充官方，构成信任边界滥用。预示官方亟需命名空间治理与技能签名/来源标识机制。 https://github.com/anthropics/skills/issues/492

2. **企业级技能分发与协作（#228，16 条，8👍）**：要求组织内直接共享技能库，而非手动下载 .skill 文件再经 Slack/Teams 分发上传。Claude.ai 需要 org-wide 共享能力。 https://github.com/anthropics/skills/issues/228

3. **Skill 创作工具稳定性**：`run_eval.py` 在 `claude -p` 下 0% 触发率（#556、#1169）；skill-creator 被批评「像开发文档而不是可执行技能」（#202）。创作链路的可靠性是社区当前最大痛点。 https://github.com/anthropics/skills/issues/556 | https://github.com/anthropics/skills/issues/1169 | https://github.com/anthropics/skills/issues/202

4. **上下文窗口与效率治理**：`claude-api` 技能单次注入约 156k tokens 直接撑爆上下文（#1487）；document-skills 与 example-skills 插件安装重复内容（#189）。技能体积与去重成为效率刚需。 https://github.com/anthropics/skills/issues/1487 | https://github.com/anthropics/skills/issues/189

5. **新技能方向提案**：
   - **compact-memory（#1329）**：符号化紧凑记忆表示，降低长任务上下文开销
   - **agent-governance（#412，已关闭）**：Agent 策略执行、威胁检测、信任评分与审计轨迹
   - **推理质量门管线（#1385）**：任务前校准 → 对抗式审查 → 交付验证三段式
   - **集成互操作**：Bedrock 使用支持（#29）、Skills 暴露为 MCP（#16）

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、内容完整，近期落地概率较高：

| Skill | PR | 看点 |
|---|---|---|
| document-typography | [#514](https://github.com/anthropics/skills/pull/514) | 通用排版质检，全文档场景普适 |
| ODT / OpenDocument | [#486](https://github.com/anthropics/skills/pull/486) | 补全文档格式矩阵，开源生态契合 |
| 质量/安全分析器 | [#83](https://github.com/anthropics/skills/pull/83) | 技能生态治理基础设施，呼应 #492 |
| testing-patterns | [#723](https://github.com/anthropics/skills/pull/723) | 测试栈标准化，开发者刚需 |
| self-audit | [#1367](https://github.com/anthropics/skills/pull/1367) | 交付质量保障，与 #1385 形成管线 |
| ServiceNow | [#568](https://github.com/anthropics/skills/pull/568) | 企业大平台持续迭代，商业价值明确 |
| pyxel 复古游戏 | [#525](https://github.com/anthropics/skills/pull/525) | 垂直场景 + MCP 联动，社区热度高 |

## 四、Skills 生态洞察

一句话总结：**当前社区最集中的诉求是让 Skills 从「玩法探索」走向「生产可用」——安全可信（反冒充/反越权）、创作工具链可靠（修复 0% 触发率）、上下文高效（防 156k 注入），并补齐文档排版、测试模式、输出审计等通用工程化技能**；而热度前 20 的 PR 全部未合并，官方合入节奏与社区贡献速度之间的张力，将成为下一阶段生态的主要矛盾。

---

# Claude Code 社区动态日报

**日期：2026-08-13**  
**数据来源：github.com/anthropics/claude-code**

---

## 1. 今日速览

今日发布两个修复版本（v2.1.231 / v2.1.229），重点修复 MCP OAuth 登录、远程控制会话恢复以及自托管 Runner 的 Hook 支持。社区侧，**Claude Max 订阅被异常扣费**、**Windows 桌面端多项回归（跨会话消息丢失/崩溃）** 成为最集中的吐槽点；跨端会话历史同步以 123 👍 成为呼声最高的功能需求。

---

## 2. 版本发布

### 🔹 v2.1.231
**链接**：https://github.com/anthropics/claude-code/releases/tag/v2.1.231

- 修复 MCP OAuth 登录失败问题：解决了使用预注册 OAuth client（如 Slack）时出现的 redirect URI mismatch。

### 🔹 v2.1.229
**链接**：https://github.com/anthropics/claude-code/releases/tag/v2.1.229

- 为 `claude remote-control --continue` 补充文档，支持恢复最近的 Remote Control 会话。
- 为自托管 Runner 会话增加 server-supplied Claude Code hook 支持（与托管环境行为一致）。
- 为 Gateway 流式响应增加 SSE keepalive pings，增强长连接稳定性。

---

## 3. 社区热点 Issues（Top 10）

### 🔥 1. CVP 已批准组织仍被 cyber safeguard 拦截
- **Issue**：[#84352](https://github.com/anthropics/claude-code/issues/84352)
- **作者**：federicolopeza | 评论 91 | 👍 12
- **为什么重要**：已通过 Cyber Verification Program 的组织在 Claude Code 中仍持续收到安全拦截，且验证门户状态回退为 "Under review"，属于认证状态不同步问题，影响合规用户正常使用。

### 🔥 2. GitHub 连接器全仓库无法访问（回归）
- **Issue**：[#71542](https://github.com/anthropics/claude-code/issues/71542)
- **作者**：Antares9879 | 评论 55 | 👍 48
- **为什么重要**：连接 GitHub 仓库成功但 Claude 无法读取任何仓库内容（公有/私有均受影响），属于账号级回归，被作者标记为 invalid 但社区反应强烈，★★★★★ 高赞。

### 🔥 3. IDE 环境变量警告持续出现
- **Issue**：[#3301](https://github.com/anthropics/claude-code/issues/3301)
- **作者**：pattobrien | 评论 45 | 👍 70
- **为什么重要**：老牌 Issue，持续近一年仍未修复。每次打开 Cursor/VSCode 都会出现 "extensions want to relaunch the terminal" 警告，严重影响 IDE 集成体验。

### 🔥 4. 【功能】CLI 与桌面端会话历史同步
- **Issue**：[#28791](https://github.com/anthropics/claude-code/issues/28791)
- **作者**：moazam1 | 评论 33 | 👍 123
- **为什么重要**：目前 CLI 与 Claude Code 桌面应用的会话记录彼此隔离，用户无法跨端衔接上下文。这是当前 **👍 最高** 的功能需求，说明跨端连续性已成为核心痛点。

### 🔥 5. Claude Max 会话限制被无端消耗
- **Issue**：[#82506](https://github.com/anthropics/claude-code/issues/82506)
- **作者**：TchabaTech | 评论 29 | 👍 7
- **为什么重要**：用户未主动使用，Max 订阅的会话限额却被消耗殆尽。同类型问题（#81684）也有报告，涉及计费准确性，高风险高影响。

### 🔥 6. Windows 桌面应用 GPU 进程崩溃导致整个应用退出
- **Issue**：[#81698](https://github.com/anthropics/claude-code/issues/81698)
- **作者**：J-dev2 | 评论 26 | 👍 0
- **为什么重要**：GPU 进程崩溃（exit code 101457950）会连带杀掉所有运行中会话。影响 Windows 重度用户，且崩溃会导致未保存工作丢失。

### 🔥 7. 捆绑 ugrep 正则编译导致 OOM
- **Issue**：[#67021](https://github.com/anthropics/claude-code/issues/67021)
- **作者**：interkelstar | 评论 18 | 👍 3
- **为什么重要**：`-E` 模式下含两个 `{0,N}` 区间时，DFA 构造内存爆炸至数 GB。虽然场景较偏，但属于单次搜索即可击穿内存的严重稳定性缺陷。

### 🔥 8. 【功能】订阅限额重置后自动继续
- **Issue**：[#35744](https://github.com/anthropics/claude-code/issues/35744)
- **作者**：cheapestinference | 评论 16 | 👍 86
- **为什么重要**：5 小时限额触发后需手动输入 "continue" 恢复，无法支持夜间/无人值守的长时间任务。高赞功能请求，多次被重复提交。

### 🔥 9. 【功能】支持禁用单个插件技能
- **Issue**：[#14920](https://github.com/anthropics/claude-code/issues/14920)
- **作者**：petergeneric | 评论 15 | 👍 86
- **为什么重要**：用户希望保留插件中部分技能（如 `:commit`）但禁用不需要的（如 `commit-push-pr`）。插件体系灵活度不足，社区期待细粒度控制。

### 🔥 10. Windows：切换 VSCode 或导航后对话全部消失
- **Issue**：[#24172](https://github.com/anthropics/claude-code/issues/24172)
- **作者**：krx5 | 评论 13 | 👍 25
- **为什么重要**：关闭/重开 VSCode 或切换会话后，聊天记录完全丢失且无法恢复。属于严重数据丢失问题，标记为 high-priority，长期未解决。

> 📌 其他值得关注的新增回归：#86012、#86138、#86298、#86237、#86208 均指向 Windows 桌面端 2.1.227+ 的跨会话消息投递问题，疑似同根回归，社区已在集中反馈。

---

## 4. 重要 PR 进展

过去 24 小时仅 2 个 PR，均为文档修复（已关闭）：

### 📄 [#85925](https://github.com/anthropics/claude-code/pull/85925)：docs: 指向 code.claude.com 的过期文档链接清扫
- **作者**：AliAltivate
- 将 plugins、plugin skills/agents/commands 及 issue-template 中残留的 `docs.claude.com` 链接全部替换为 `code.claude.com` 规范地址。

### 📄 [#85822](https://github.com/anthropics/claude-code/pull/85822)：docs: 修复 plugins/examples 中的失效链接和 README 漂移
- **作者**：AliAltivate
- 修复 hooks 示例文档指向 `docs.anthropic.com` 的旧链接；更新 plugins/README.md 链接；所有改动均经实际跳转验证。

> 说明：两个 PR 均为 docs-only 清理，无功能代码变更，适合快速合入。

---

## 5. 功能需求趋势

综合当前 open issues 中的 enhancement 标签及高赞需求，社区最关注的方向如下：

| 方向 | 代表 Issue | 热度 |
|---|---|---|
| **跨端会话同步**（CLI ↔ Desktop） | #28791 | 👍 123 |
| **无人值守自动恢复**（限额重置后 auto-continue） | #35744 | 👍 86 |
| **插件/技能细粒度管理**（按技能禁用、推荐抑制） | #14920、#86098 | 👍 86+ |
| **会话数据持久化与迁移**（目录变动、跨机器） | #71568、#81835 | 持续讨论中 |
| **远程控制/多端协同**（remote-control 改进、移动端） | #85656 | 新晋热点 |

**解读**：社区已不满足于单终端可用性，转而追求 **“桌面-Web-CLI 全端一体化”**。会话历史、配置、任务状态的无缝迁移是当前第一诉求；其次是长时间任务的自动化能力（auto-continue）；插件生态则期望更精细的控制模型。

---

## 6. 开发者关注点

**🔴 痛点 Top 3：**

1. **Windows 桌面端稳定性严重下滑**
   - GPU 崩溃杀进程（#81698）、对话消失（#24172）、跨会话消息静默丢失（#86012/#86208/#86237/#86298）、后台会话无输出死掉（#86208）——2.1.227 之后出现多条回归，Windows Store 版（MSIX）因禁用自动更新无法快速获取修复。
   
2. **计费与配额准确性存疑**
   - Claude Max 20 订阅未使用即被扣满（#81684/#82506）、崩溃的 ultrareview 仍消耗免费额度（#86307）。开发者对“钱去哪了”的信任危机正在发酵。

3. **更新机制可靠性不足**
   - 自动更新写出损坏的 claude.exe（#86295）、更新清空定时任务注册表（#85565）。作为 agentic 工具，更新行为不可预测会直接摧毁用户信任。

**🟡 高频反馈：**

- MCP 生态集成问题频发（OAuth、跨会话 send_message），但最新版本已开始针对性修复；
- 会话数据存储以原始 cwd 路径为 key，导致目录迁移（symlink/新挂载）后历史全部失联；
- 超长会话 / 空闲超时后的恢复体验不够顺滑，phantom turn 问题在 Windows 上尤其突出。

---

*本日报由 AI 技术分析师基于 GitHub 公开数据自动整理，仅供技术交流参考。如有遗漏，欢迎指正。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-13

## 今日速览

macOS 桌面端 syspolicyd/trustd 进程失控问题以 392 👍 成为今日社区焦点，Windows 扩展加载失败（#37458）也有大量用户中招。功能层面，LSP 集成（#8745）依旧是最受期待的增强方向（449 👍）。PR 侧今日密集合入了大量由 copyberry[bot] 驱动的架构性改动，包括中断回合恢复、统一审批管线和线程持久化回退。

## 版本发布

过去 24 小时发布了两个 Rust 预发布版本：

- **rust-v0.148.0-alpha.12** — 基于 0.148.0 系列的迭代版本
- **rust-v0.148.0-alpha.11** — 基于 0.148.0 系列的迭代版本

目前 0.147.0 的 Windows 自动升级问题（#38039）仍在追踪中，0.148 系列值得关注是否修复相关安装器缺陷。

## 社区热点 Issues

### 1. macOS 桌面端 syspolicyd / trustd CPU 与内存失控
[#25719](https://github.com/openai/codex/issues/25719) — 84 条评论，👍 392

Codex Desktop（26.527.60818）在 macOS 上持续触发 syspolicyd / trustd 进程的 CPU 和内存无限增长，严重影响系统稳定性。当前 Issues 中评论数和 👍 数双高，属于亟待解决的高优先级性能 bug。

### 2. LSP 集成（自动检测 + 自动安装）
[#8745](https://github.com/openai/codex/issues/8745) — 61 条评论，👍 449

社区呼声最高的增强请求：希望 Codex CLI 内置 LSP 支持，通过诊断和符号智能提升代码生成质量。449 个 👍 表明这已成为开发者最渴望的 IDE 级能力。

### 3. 添加设置以禁用 60 秒自动解析问题
[#28969](https://github.com/openai/codex/issues/28969) — 71 条评论，👍 194

用户希望 Codex CLI 在提问后不要 60 秒自动 resolve，提供配置项让开发者自行控制。大量评论围绕交互节奏与自动化工作流冲突展开。

### 4. Windows 上 Codex 扩展无法启动："The extension couldn't load its resources"
[#37458](https://github.com/openai/codex/issues/37458) — 45 条评论，👍 11

Windows x64 + VSCode 1.132.0 环境下扩展资源加载失败，Codex 面板完全不可用。8 月 7 日创建后迅速积累 45 条评论，影响范围广。

### 5. Windows Codex 应用缺少"控制其他设备"标签
[#28919](https://github.com/openai/codex/issues/28919) — 31 条评论，👍 31

Windows 版「设置 > 连接」中缺少远程控制其他设备的入口，功能与 macOS 版不对齐，Pro 用户无法使用远程控制能力。

### 6. 内置图像生成反复报网络错误（7 月 9 日更新后）
[#32297](https://github.com/openai/codex/issues/32297) — 23 条评论，👍 8

7 月 9 日桌面更新后，内置图像生成持续失败并返回网络错误。评论中多条报告即使网络稳定也无法复现的间歇性问题。

### 7. Codex IDE 扩展在 Chromium 上冻结 code-server 侧边栏
[#28726](https://github.com/openai/codex/issues/28726) — 20 条评论，👍 5

在桌面 Chromium 浏览器中打开 Codex 侧边栏会冻结整个 code-server，而 Android Samsung Internet 反而正常，指向 WebKit/Chromium 兼容性回归。

### 8. 桌面压缩反复嵌入完整图片 base64
[#23257](https://github.com/openai/codex/issues/23257) — 12 条评论，👍 5

压缩检查点把完整图片以 base64 形式嵌入，导致压缩后上下文体积不降反升。问题已持续三个月，影响 image-heavy 工作流。

### 9. Windows 上 browser.tabs.finalize() 静默终止整个应用
[#35210](https://github.com/openai/codex/issues/35210) — 11 条评论

调用 `browser.tabs.finalize()` 后整个 Codex Desktop 直接退出，无任何错误提示。属于 IAB（应用内浏览器）路径的严重稳定性缺陷。

### 10. 本地压缩 v2 保留无界 input_image 载荷
[#33493](https://github.com/openai/codex/issues/33493) — 10 条评论，👍 3

image-heavy 长对话线程持续触发自动压缩，因为压缩 v2 保留了无界的 input_image payload，始终无法收敛上下文大小，导致重复压缩。

## 重要 PR 进展

### 1. 添加中断回合恢复（Interrupted Turn Recovery）
[#38303](https://github.com/openai/codex/pull/38303)

新增 `RecoverTurnRequest` 和 `CodexThread::recover_turn_if_idle`，允许以原有 turn ID 恢复被中断的回合，并可绕过自动空闲工作在 Plan 模式下恢复，对长时任务的异常中断恢复意义重大。

### 2. 将网络访问路由到共享审批管线
[#38299](https://github.com/openai/codex/pull/38299)

将阻塞的网络请求表示为审批操作，使权限 hooks、自动审查和用户审查共用同一套审批流程。安全审查与网络访问控制的统一是平台成熟度的重要标志。

### 3. 分页线程的持久化回退（Durable Reverts）
[#38292](https://github.com/openai/codex/pull/38292)

通过创建新的不可变 rollout 并原子切换存储路径，在所选回合之前保留历史，且多次回退不会改变逻辑线程 ID 和会话元数据。

### 4. 统一回合输入提交与路由
[#38275](https://github.com/openai/codex/pull/38275)

新增 `TurnInputRequest` 和类型化提交结果，原子化启动回合、转向活动回合或按原因拒绝输入，消除此前分散的输入路径。

### 5. 应用服务器支持 gRPC code-mode 主机
[#38288](https://github.com/openai/codex/pull/38288)

`--code-mode-host` 现在接受 `http://` 和 `https://` URL 并走共享 gRPC 会话提供器，`ws://`/`wss://` 保留原有 WebSocket 传输，为 code-mode 提供更可靠的承载协议。

### 6. TUI 状态栏新增线程使用量
[#38282](https://github.com/openai/codex/pull/38282)

为 Enterprise 工作区在状态栏和终端标题中新增 `thread-credits` 与 `estimated-thread-cost` 可配置项，方便开发者实时感知成本。

### 7. `/status` 显示预计线程使用量
[#38281](https://github.com/openai/codex/pull/38281)

扩展 `account/usage/read`，支持 `threadId` 参数并返回向后兼容的 `threadUsage` 响应，包含预估 credits、USD 成本与模型/推理/速度/token 明细。

### 8. 远程执行器收集插件指标
[#38283](https://github.com/openai/codex/pull/38283)

远程插件命令现在可在执行器文件系统上解析 manifest 声明的指标操作，并在执行器原生临时目录中创建测量 sidecar，回传有界输出。

### 9. 保护内联可视化查看器免受 sandbox 写入
[#38306](https://github.com/openai/codex/pull/38306)

查看器文档在浏览器打开前必须位于沙箱会话无法修改的位置。该 PR 将其物化到 `CODEX_HOME` 下专用缓存目录，按内容寻址隔离。

### 10. 使 gRPC code-mode 产出测试确定性
[#38321](https://github.com/openai/codex/pull/38321)

使用永不 resolve 的 promise 验证会话在终止 cell 后继续执行产出限制，并用 `yield_control()` 替代对调度的依赖，消除测试 flakiness。

## 功能需求趋势

从 Issues 中可以提炼出四个最明确的功能方向：

1. **面向开发者的 IDE 集成能力**：LSP 集成（#8745，449 👍）是最突出的需求。用户希望 Codex 通过语言服务器获得诊断和符号级上下文，而不仅是文本补全。
2. **远程控制与多端一致性**：多个 Issue 指向 Windows 与 macOS 功能不对齐（#28919），以及跨设备、跨账户的远程控制和多端同步需求（#31187、#21803）。远程控制能力已被视为核心功能，而非附加项。
3. **上下文与压缩的精细治理**：压缩反复嵌入 base64 图片（#23257）、保留无界 input_image 载荷（#33493）等问题，说明社区对 image-heavy 和长会话场景下的 token 治理有强烈诉求。
4. **配置灵活性与用户控制权**：禁用 60 秒自动解析（#28969）、TUI 中折叠 MCP 工具输出（#26279）等请求表明，用户希望根据自身工作流微调 Codex 的自动化行为，而非接受固定交互策略。

## 开发者关注点

高频痛点集中在以下几方面：

- **Windows 平台体验明显落后**：扩展无法加载（#37458）、远程控制缺失（#28919）、沙箱账户创建失败（#32937）、自动升级损坏启动器（#38039）、EPERM 授权失效（#38293）——Windows 用户被多个基础功能问题同时困扰。
- **资源泄漏和性能失控**：除 macOS syspolicyd 问题外，Windows 上 DWM Composition 句柄累积（#33192）、code-server 侧边栏冻结（#28726）等性能问题反复出现。
- **压缩机制本身成为瓶颈**：压缩后上下文不降反增（#23257、#33493），远程压缩反复断连（#36232），对重上下文用户影响显著。
- **连接与远程执行不稳定**：WebSocket 传输在 Windows 上无法遵循系统代理（#29958）、远程压缩流中断（#36232）、浏览器后端超时（#22057），网络可靠性问题集中在代理和长连接场景。
- **权限与安全可见性不足**：网络请求是否经过审批管线、子代理使用哪个提供者（#17312）、安全扫描 finalization 错误导致扫描不可重试（#37587），开发者希望平台对权限决策和安全状态有更透明的呈现。

---

*本日报基于 GitHub 公开数据自动整理，仅供技术交流参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-13

## 今日速览

今日发布 v0.56.0 夜间版，重点增强评估（eval）体系与工具调用格式化能力。Issue 方面，子代理可靠性问题持续发酵：MAX_TURNS 被误报为 GOAL 成功（#22323）、通用代理无限挂起（#21409）等 P1 问题讨论热度最高。PR 方面，MCP 配置损坏导致的安全与数据丢失问题获得两项紧急修复，另有变量扩展绕过（GHSA-wpqr-6v78-jr5g）与 A2A 服务器认证缺失等安全补丁正在推进。

## 版本发布

**v0.56.0-nightly.20260813.g1ac337739**
- `feat/eval validate`（PR #28344，作者 ved015）
- `feat(evals)`：新增工具调用格式化器，并集成失败摘要（PR #28305，作者 ved015）
- 包含 v0.55.1 变更日志（PR #28779）

---

## 社区热点 Issues

### 1. #22323 — 子代理超过 MAX_TURNS 后被误报为 GOAL 成功，中断被隐藏
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/22323) · 优先级 P1 · 评论 12 · 👍 2

`codebase_investigator` 子代理在尚未执行任何分析时就已触发最大轮次限制，却返回 `status: "success"` 和 `Termination Reason: "GOAL"`。这会向用户传递错误信号，掩盖真正的执行中断。社区讨论热度高，当前处于 maintainer-only 重测阶段，是今日最受关注的 Issue。

### 2. #21409 — 通用子代理（generalist）调用后无限挂起
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/21409) · 优先级 P1 · 评论 8 · 👍 8

用户反映，一旦 CLI 委派任务给通用子代理即无限挂起，连创建文件夹这类简单操作也可能等待一小时以上。用户在提示中明确“不要使用子代理”即可绕过问题。这是收到 👍 最多的 Issue，影响面广。

### 3. #25166 — Shell 命令执行结束后卡在 “Awaiting user input”
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/25166) · 优先级 P1 · 评论 4 · 👍 3

简单 CLI 命令明明已执行完成，终端仍表现为等待输入状态。该问题可复现且影响常规操作流，对日常使用干扰很大。

### 4. #21983 — 浏览器子代理在 Wayland 环境下失败
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/21983) · 优先级 P1 · 评论 4 · 👍 1

浏览器子代理在 Wayland 显示服务器下直接失败并退出。P1 级别说明对 Linux 桌面用户有显著影响，当前处于待回归测试状态。

### 5. #24353 — 组件级评估（Component Level Evaluations）
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/24353) · 优先级 P1 · 评论 7

在 #15300 引入“行为评估”概念后，仓库已积累 76 个评估测试、覆盖 6 个支持的 Gemini 模型。此 EPIC 旨在将评估进一步下沉到组件层，建立更细粒度的质量回归防线。

### 6. #22093 — 自 v0.33.0 起子代理未经许可即被调用
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/22093) · 优先级 P2 · 评论 3

用户在配置中明确禁用了 agent 模式，更新至 v0.33.0 后子代理（如 generalist）仍被自动使用。这不仅是功能违约，更是权限控制层面的回归，用户对“配置不再可信”表达了明确担忧。

### 7. #26522 — 自动记忆（Auto Memory）对低信号会话无限重试
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/26522) · 优先级 P2 · 评论 5

仅当提取代理通过 `read_file` 成功读取会话后，该会话才会被标记为“已处理”。若代理判断某会话低信号而跳过读取，该会话将反复出现在后续任务中，形成无限重试循环。背景任务空转问题。

### 8. #24246 — 启用超过 400 个工具时触发 400 错误
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/24246) · 优先级 P2 · 评论 3

当可用工具数量超过限制时，Gemini CLI 直接返回 400 错误。社区期望代理能按目标动态裁剪工具范围，而不是一次性加载全部工具。这也体现了大规模 MCP 集成下的扩展性问题。

### 9. #21968 — Gemini 不主动使用自定义技能与子代理
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/21968) · 优先级 P2 · 评论 6

用户反映，即使配置了 “gradle” 和 “git” 等自定义技能，模型也很少主动调用，除非显式指示。这与“技能/子代理本应增强自主性”的预期相悖，削弱了自定义扩展的实际价值。

### 10. #22745 — 评估 AST 感知文件读取/搜索/映射的价值
[🔗 链接](https://github.com/google-gemini/gemini-cli/issues/22745) · 优先级 P2 · 评论 7

EPIC 探讨 AST（抽象语法树）感知工具能否提升代码库操作效率：单次调用精确读取方法边界、减少读取对齐造成的额外轮次、降低 token 噪声等。配套 EPIC #22746 建议从 tilth 或 glyph 工具切入验证。

---

## 重要 PR 进展

### 1. #28790 — 容量错误（capacity errors）的上下文感知静默重试与可用性 TTL
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28790) · 优先级 P1 · 核心

修复 #28761 中容量耗尽重试回归：为非交互/无人值守的 CLI 运行引入自动退避重试，最多 2 次静默重试，并支持 TTL 控制。对批量执行场景具有重要意义。

### 2. #28691 — 阻止 $VAR 与 ${VAR} 变量扩展绕过安全限制
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28691) · 优先级 P1 · 安全

修复 GHSA-wpqr-6v78-jr5g 中不完整的检查：`detectBashSubstitution()` 和 `detectPowerShellSubstitution()` 允许变量扩展绕过安全门。同时加固了 GitHub Actions 工作流配置。属于安全边界收口。

### 3. #28794 — 防止 MCP 启用配置损坏时 fail-open 与数据丢失
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28794) · 优先级 P1 · 核心

修复 #28786：当 `mcp-server-enablement.json` 损坏或含非法 JSON 时，`readConfig()` 返回空对象会默认启用所有服务（fail-open），并导致状态被覆盖。该 PR 将损坏配置视作显式错误处理。

### 4. #28787 — 不再将损坏的 MCP 启用配置视为空配置
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28787) · 优先级 P1 · 核心

与 #28794 互补：修复 `readConfig()` 将 JSON 解析失败静默折叠为空对象的缺陷，避免下游逻辑基于错误默认值做决策。这是对 MCP 配置健壮性的重要加固。

### 5. #28699 — A2A 服务器强制认证并修复 checkpoint 路径遍历
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28699) · 安全

A2A 服务器的自定义 REST 路由（`/tasks`、`/executeCommand`、`/listCommands` 等）绕过了 `UserBuilder` 认证，可直接无凭据访问；同时存在 checkpoint 路径遍历风险。该 PR 同时解决两个安全问题。

### 6. #28789 — 修复 vscode-ide-companion 的 stop() 挂起与 keep-alive 失败阈值
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28789) · IDE 集成

修复 #28785：当 MCP 流式会话打开时，`IdeServer.stop()` 可能无限期挂起；另外 keep-alive 心跳的间歇性失败阈值存在资源泄漏。属于 IDE 插件的稳定性补强。

### 7. #28788 — 为技能激活与 URL 抓取新增行为评估
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28788) · 评估体系

新增 `activate_skill` 与 `web_fetch` 的行为评估，同时改进本地评估环境的 Windows 兼容性，并在 EDK 报告聚合器中过滤未执行的（跳过）测试。评估基建持续完善。

### 8. #28679 — Vertex AI 使用普通 API Key 时给出明确 401 错误
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28679) · 开发体验

当用户以 `vertex-ai` 认证类型却仅配置标准 Gemini API Key（缺少 Google Cloud 凭据）时，此前会发请求后得到晦涩报错。该 PR 改为提前检测并输出明确指导，减少配置困惑。

### 9. #28586 — 保留 functionCall 中的 thoughtSignature，修复并行工具调用 400 错误
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28586) · 核心

修复 v0.53.0 回归：并行工具调用时 `thoughtSignature` 被意外剥离，导致 400 错误。属于影响多工具并行场景的关键补丁，已于今日关闭。

### 10. #28624 — 防止布尔 thought 部分泄漏为 “[Thought: true]” 文本
[🔗 链接](https://github.com/google-gemini/gemini-cli/pull/28624) · 核心

修复 #23525：内部 thought part 若为布尔类型（`thought: true`），会以 `[Thought: true]` 的形式泄漏到文本表达中。该 PR 在 `toPart` 中增加类型判断，保证输出干净。

---

## 功能需求趋势

从过去 24 小时的 Issue/PR 中可提炼出以下社区重点方向：

1. **子代理可靠性治理**（最突出）：多起 P1/P2 围绕子代理的挂起、误报成功、越权调用等行为展开，说明 agent 模式已进入“规模化落地后的质量收口”阶段。
2. **自动记忆（Auto Memory）系统成熟化**：#26516/#26522/#26523/#26525 形成完整问题簇，覆盖重试逻辑、无效补丁隔离、日志收敛与秘密脱敏，是当前后台自动化的核心打磨点。
3. **执行安全与沙箱化**：#19873（零依赖 OS 沙箱 + 事后意图路由）、#22672（阻止破坏性行为）、#28691（变量扩展绕过）共同指向“让模型自由操作 bash，但必须有安全边界”的产品方向。
4. **AST 感知的代码库导航**：#22745/#22746 持续探索利用 AST 工具减少 token 噪声、提升单次读取精度的可行性。
5. **浏览器代理的韧性与可配置性**：#22232（会话接管与锁恢复）、#22267（settings.json 覆盖无效）、#21983（Wayland 兼容），浏览器场景渗透率上升带来更多边界问题。
6. **组件级评估与回归基础设施**：#24353 EPIC 与多笔 evals PR 表明，官方正在从“单 E2E 测试”向“组件级行为评估”演进，提前拦截回归。
7. **终端/IDE 稳定性**：#21924（resize 性能）、#24935（外部编辑器退出后损坏）、#28789（IDE companion 挂起）——UI 层的细节体验开始获得开发者关注。

---

## 开发者关注点

1. **子代理的“不可控感”**：通用代理无限挂起（#21409）、配置禁用后仍被调用（#22093）、达到上限却报成功（#22323），共同构成“子代理行为不可预测”的负面体验，直接影响用户信任。
2. **误报成功比报错更可怕**：#22323 与 #25166 的共性在于——真实状态（中断/已完成）与界面展示状态（成功/等待输入）不一致，开发者会据此做出错误决策。
3. **配置损坏的静默失败**：MCP enablement 配置损坏后 fail-open 并可能数据丢失（#28786/#28794），说明配置文件解析链路需要“显式失败”而非“静默恢复默认值”。
4. **工具生态扩展的瓶颈**：工具数量超过 128/400 即触发 400 错误（#24246），随着 MCP 生态与自定义技能的增长，工具范围管理必须从“全量加载”走向“上下文裁剪”。
5. **自定义技能与子代理的“存在感”不足**：模型不主动使用技能、子代理轨迹难分享（#22598），用户投入配置的成本难以转化为实际收益。
6. **安全敏感点密集出现**：从变量扩展绕过（#28691）到 A2A 无认证访问（#28699），再到 Auto Memory 的密钥先读后脱敏问题（#26525），社区对“模型自由操作本地环境”的安全边界高度敏感。
7. **低信号数据的后台循环处理**：Auto Memory 的无限重试（#26522）与无效补丁静默丢弃（#26523）提醒开发者：后台自动化任务需要完善的终止条件与可观测性。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 | 2026-08-13

## 📌 今日速览

过去 24 小时无新版本发布，社区动态集中在 **远程 MCP 认证与令牌刷新**、**模型选择逻辑不透明**（若干子代理模型被静默覆盖）以及 **Windows/WSL2 平台兼容性** 三个方向。值得关注的是 `sessionStart` 钩子失效（#1730）和 WSL2 下 Ctrl+H 误识别（#4328）两个长期问题仍在等待处理，另有 3 个涉及 MCP OAuth 的最新高频问题（#4472、#4464、#4466）集中反映了该领域的稳定性短板。

---

## 🔥 社区热点 Issues（10 个精选）

### 1. [Issue #1305] 为远程 OAuth MCP 服务器支持 CIMD（👍 35）
**状态**：OPEN | 更新：2026-08-12 | 评论：5
**为什么重要**：目前需求最高的功能请求（获得 35 个 👍）。0.0.389 已支持 DCR（动态客户端注册），但 CIMD（客户端 ID 元数据文档）是 DCR 之外的另一种注册路径，社区希望为不支持 DCR 的服务器提供兜底方案。
**链接**：https://github.com/github/copilot-cli/issues/1305

---

### 2. [Issue #4390] 组织启用的模型缺失 —— Claude Sonnet 5/Opus 5 与 Kimi K3 均不可用（👍 4）
**状态**：OPEN | 更新：2026-08-12 | 评论：5
**为什么重要**：Copilot Business 组织已明确启用的模型在 CLI 目录中不可见，且选择 Anthropic 模型时提示"This model is disabled by your organization"。属于企业级阻塞问题，直接影响组织采用。
**链接**：https://github.com/github/copilot-cli/issues/4390

---

### 3. [Issue #1730] `sessionStart` 钩子在 v0.0.420 中不触发（👍 3）
**状态**：OPEN | 更新：2026-08-12 | 评论：8
**为什么重要**：`.github/hooks/*.json` 中定义的 `sessionStart` 钩子在 Windows 11 + PowerShell 7 环境下执行失败。钩子系统是团队自动化工作流的基础机制，该问题已存在近半年，影响插件生态的可信度。
**链接**：https://github.com/github/copilot-cli/issues/1730

---

### 4. [Issue #4328] WSL2 下 Ctrl+H 被误识别为 Ctrl+Backspace
**状态**：OPEN | 更新：2026-08-12 | 评论：6
**为什么重要**：`/help` 文档写明 Ctrl+H 是"删除上一个字符"，但在 WSL2 中因 Windows Terminal 的 `WT_SESSION` 环境变量泄漏，实际行为变为"删除整个单词"。这是文档约定与实际行为不一致的典型案例，影响 WSL2 用户的日常编辑效率。
**链接**：https://github.com/github/copilot-cli/issues/4328

---

### 5. [Issue #2133] 自定义 agent 的 `model` 字段数组语法不被 CLI 支持（👍 7）
**状态**：OPEN | 更新：2026-08-13 | 评论：4
**为什么重要**：VS Code Copilot Chat 支持 `.agent.md` 中 `model` 字段使用数组语法，但 CLI 解析失败并拒绝加载 agent。这是 CLI 与 VS Code 生态之间的兼容性割裂问题，可能阻碍用户跨工具复用自定义 agent。
**链接**：https://github.com/github/copilot-cli/issues/2133

---

### 6. [Issue #4432] Rubber-duck 子代理：模型发出的 `model` 参数静默覆盖互补策略
**状态**：OPEN（triage）| 更新：2026-08-12 | 评论：2
**为什么重要**：`rubber-duck` 子代理的设计初衷是提供跨模型家族的第二意见（Claude 会话用 GPT 评审，反之亦然），其定义特意省略了 `model` 字段以便 `complementary` 策略自动选择对侧模型。但 `task` 工具暴露了 `model` 参数，可使模型发出值静默覆盖策略与用户的 `/subagents` 设置。新缺陷，可能导致互补评审机制失效。
**链接**：https://github.com/github/copilot-cli/issues/4432

---

### 7. [Issue #4462] 内置 code-review 子代理的显式模型覆盖被忽略
**状态**：OPEN | 更新：2026-08-13 | 评论：0
**为什么重要**：`code-review` 子代理在 `gpt-5.6-luna` 会话中启动时，被实际替换为 `gpt-5.6-sol`，配置值被静默忽略。与此前关闭的 #4458 高度重复，说明该问题在用户侧持续复现，且模型选择逻辑的不透明性已引发广泛困惑（#4458 为同一用户同一问题，已关闭）。
**链接**：https://github.com/github/copilot-cli/issues/4462

---

### 8. [Issue #4346] CI 中 MCP 注册表策略获取返回 403，阻断所有非默认 MCP 服务器（👍 3）
**状态**：CLOSED | 更新：2026-08-13 | 评论：1
**为什么重要**：使用 GitHub Actions 内置 `GITHUB_TOKEN`（即 2026-07-02 发布的免 PAT 认证方案）时，MCP 策略获取返回 403，导致 CI 环境中所有非默认 MCP 服务器无法启动。该问题直接影响 CI/CD 自动化集成，今日已关闭，推测已有修复方案但尚未出现在 release 中。
**链接**：https://github.com/github/copilot-cli/issues/4346

---

### 9. [Issue #3976] 原生 `tgrep` 索引器在大型 monorepo 上 OOM 杀死主机
**状态**：OPEN | 更新：2026-08-12 | 评论：2
**为什么重要**：启用 `copilot_cli_tgrep` 实验后，会话启动时生成的 `tgrep serve` 常驻进程无内存上限（无 upper bound），在大型 monorepo 上直接触发 OOM。对于依赖代码搜索的重型仓库，该问题会导致宿主机不稳定，属于性能与稳定性层面的高风险缺陷。
**链接**：https://github.com/github/copilot-cli/issues/3976

---

### 10. [Issue #4464] 远程 MCP OAuth 静默刷新失败（AADSTS70011），迫使每 60~75 分钟重复交互登录
**状态**：OPEN | 更新：2026-08-13 | 评论：0
**为什么重要**：使用 Microsoft Entra OAuth 的远程 MCP 服务器在 token 刷新时，因 scope 混用 `.default` 与资源专属 scope 导致 AADSTS70011 错误，静默刷新永远失败。用户每 60-75 分钟被迫弹出浏览器重新登录，对该类 MCP 服务器的可用性造成严重损害。
**链接**：https://github.com/github/copilot-cli/issues/4464

---

## 🔀 重要 PR 进展

> 过去 24 小时内仅 2 个 PR 有更新，均已列出。

### 1. [PR #4449] 将 PR 自动化从 `pull_request_target` 迁移出来（OPEN）
**更新**：2026-08-12
**功能**：将无效标签自动化从 `pull_request_target` 迁移至更安全的权限模型，同时保留 issue/PR 的关闭行为。具体包括：使用 issue 级写权限 token 直接关闭无效 issue；基于无权限的 `pull_request` 信号对可合并 PR 做即时提示；特权步骤仅在安全上下文运行。这是一次安全基础设施升级，对仓库维护者有意义。
**链接**：https://github.com/github/copilot-cli/pull/4449

---

### 2. [PR #4453] Julesdemangeot ship it patch 1（CLOSED）
**更新**：2026-08-12
**说明**：PR 已关闭，摘要为空。该 PR 由名为 `julesdemangeot-ship-it` 的账号提交且在当天关闭，推测属于自动化提交的临时修补尝试，无实际合并价值。
**链接**：https://github.com/github/copilot-cli/pull/4453

---

## 📊 功能需求趋势

从近期 Issue 中可提炼出社区最关注的五大功能方向：

1. **MCP 服务器稳定性与认证增强**（最高热度）
   涉及 #1305（CIMD）、#4472（token 刷新并发冲突）、#4464（Entra scope 错误）、#4466（初始化 5xx 无重试）、#4463（Windows socket 错误）、#4346（CI 403）。社区不满足于"能用"，开始要求**远程 MCP 在真实生产网络环境中的可靠性**（并发刷新、重试退避、多平台兼容）。

2. **模型管理透明化与可预测性**
   #4390、#2133、#4432、#4462、#3565 共同勾勒出一个问题：**模型选择逻辑对用户不透明**——组织级模型缺失、参数被静默忽略或降级、跨家族互补策略被覆盖。开发者希望看到"配置了哪个模型，实际就使用哪个模型"，而不是黑盒策略悄悄改动。

3. **插件与配置文件可靠性**
   #1730（钩子不触发）、#4465（autoUpdate 不生效）、#4471（插件 TUI 无法区分禁用状态）。这三个问题说明插件系统的**基础功能闭环尚未完成**：hooks、自动更新、可管理性均有缺口。

4. **会话生命周期可视化管理**
   #4470 明确请求一个类似 `claude agents --json` 的命令，用于列出所有正在运行的会话并携带 id/name/cwd/status。配合 #4467、#4468、#4469 的事件存储耗尽、进程泄漏、权限事件重放，社区对**会话生命周期的可观测性和可管理性**需求正快速增长。

5. **BYOK（Bring Your Own Key）与自定义提供方能力**
   #4358 请求从自定义 provider 的 `/models` 端点动态填充 `/model` 选择器，#4456 请求使用系统安装的 `gh` CLI 替代捆绑版。两者都指向：**用户在寻找比内置默认配置更灵活、更贴近自身环境的工具链自由**。

---

## 🛠 开发者关注点（高频痛点）

### 1. MCP OAuth 令牌刷新机制是当前最大痛点
  #4464、#4472、#4463 三条 Issue 在同一天被提出，全部指向 OAuth 刷新路径。具体问题包括 scope 构造错误、并发刷新导致 transport 提前关闭、Windows socket 权限错误（10013）。**不止一个用户希望 MCP OAuth"静默刷新"能真正工作在后台**，而不是频繁打断交互式签名。

### 2. 模型"静默降级/覆盖"引发信任危机
  #4432、#4462、#3565 都在描述同一类现象：配置的模型与实际 사용 的模型不一致，且没有任何警告。特别是 #4462 的 code-review 子代理，用户配置 `gpt-5.6-luna` 实际启动 `gpt-5.6-sol`。当模型参数影响代码评审的深度与方向时，这种不确定性被放大为对 CLI 可信度的质疑。

### 3. Windows / WSL2 平台问题占比较高
  #4328（Ctrl+H）、#4468（扩展主机进程泄漏）、#4463（Windows socket 10013）。Windows 生态中的 Copilot CLI 用户频繁遭遇**输入按键映射、进程生命周期、socket 权限**等底层问题，说明该平台适配仍需承重。

### 4. 资源与清理问题
  #3976（tgrep OOM）、#4461（Docker MCP 容器残留）、#4468（extension-host 进程不释放）。开发者普遍希望 CLI 在会话结束或超限时**主动、按时清理资源**，而不是把进程留在后台，拖垮整台机器。

### 5. 会话恢复与权限事件污染
  #4469 展示了一个很隐蔽的 bug：十几天前已完成的 bash 命令留下的 `permission.requested` 事件，每次会话恢复时都会重放，导致用户反复看到无法忽略的"Allow directory access"弹窗。在长生命周期+频繁 `/resume` 的工作模式中，这类僵尸事件直接伤害日常体验。

---

*本日报基于 GitHub 公开数据自动整理，仅代表社区讨论焦点，不构成官方立场。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-13）

数据来源：github.com/MoonshotAI/kimi-cli

## 今日速览

过去 24 小时内，Kimi Code CLI 无新版本发布，社区讨论与代码贡献聚焦于「跨会话记忆」与「稳定性修复」：一个关于持久化上下文的 Feature Request 持续活跃，累计 37 条评论；两个长期挂起的 PR 在本周被更新，分别涉及字符串渲染修复与 Web 子进程异常处理。整体来看，社区对 CLI 的智能程度（能记住上下文）和工程健壮性（不崩溃、不渲染错误）抱有明确期待。

## 版本发布

过去 24 小时无新版本 Release，本节略。

## 社区热点 Issues

> 注：按「过去 24 小时更新」筛选，活跃 Issue 共 1 个，以下全部收录并分析。

### 1. #1283 [enhancement] Feature Request: Memory System - Persistent context across sessions
- 作者：CatKang | 创建于 2026-02-27 | 更新于 2026-08-13
- 评论：37 | 👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1283

**为什么重要：**
该 Issue 提议为 Kimi Code CLI 实现一套完整的「记忆系统」，使工具能跨会话记住项目上下文、代码模式与用户偏好。这直击当前 AI 编程 CLI 的痛点——每次新会话都像「失忆」，无法积累项目级知识。若落地，将从「一次性问答工具」进化为「有长期记忆的编码伴侣」，是社区非常期待的基础能力。

**社区反应：**
- 从 2 月 27 日创建至今持续活跃，8 月 13 日仍被讨论，说明需求一直未被满足且讨论热度不减。
- 37 条评论体现了对实现方案的深入探讨。
- 功能设计上区分了**自动记忆**（AI 管理的笔记）与**手动记忆**（用户定义的指令），暗示社区希望同时拥有 AI 的主动性（自动总结）和用户的可控性（显式配置）。这是该类功能设计中非常关键的分野。

---

## 重要 PR 进展

过去 24 小时内更新的 PR 共 2 个，均由贡献者 Ricardo-M-L 提交，均为长期悬挂后的状态刷新。

### 1. #2449 [OPEN] fix(string): strip newlines in shorten_middle before the length check
- 作者：Ricardo-M-L | 创建于 2026-06-13 | 更新于 2026-08-12
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2449

**修复内容：**
`shorten_middle(text, width, remove_newline=True)` 被 `extract_key_argument` 用于渲染**单行**的工具调用参数摘要。但函数在**缩短前**对短文本提前返回（return early），未执行换行去除逻辑，导致输出的「单行摘要」中混入换行符，破坏界面格式。该 PR 修正了这一顺序问题。

**价值：**
这是典型的边界条件 bug 修复。它影响所有包含换行符的关键参数在 CLI 输出中的展示，对工具调用日志的可读性有直接影响。从 6 月创建至今未合并，可能因维护者精力有限，但修复思路简单、风险低，值得被尽快 review。

### 2. #2324 [OPEN] fix(web): handle BrokenPipeError in SessionProcess.send_message
- 作者：Ricardo-M-L | 创建于 2026-05-19 | 更新于 2026-08-12
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2324

**修复内容：**
`src/kimi_cli/web/runner/process.py` 的 `SessionProcess.send_message` 向 `process.stdin` 写入并 `await drain()`，但未防护「子进程已在写入前退出」的情况。当子进程异常退出后仍向管道写入时，会抛出 `BrokenPipeError` 导致 Web 会话崩溃。此 PR 填补了 `start()` 与写入之间的竞态窗口。

**价值：**
Web 场景下子进程存活时间往往超过预期，用户关闭会话、超时回收都会触发该异常。修复后可大幅提升 Web runner 的容错能力。该 PR 自 5 月提交，悬置近三个月仍被关注，说明 Web 会话稳定性是社区持续关心的方向。

---

## 功能需求趋势

> 说明：本次观察窗口内活跃数据量较小（1 Issue + 2 PR），以下趋势归纳基于可见样本，可作为一份「即时快照」参考。

1. **跨会话记忆与上下文持久化**
   - 代表：#1283。
   - 社区明确提出让 CLI 记住「项目上下文、代码模式、用户偏好」——这是从工具走向「团队知识沉淀载体」的核心诉求。
   - 自动（AI 管理）+ 手动（用户定义）双轨机制，暗示未来产品需要提供分层记忆能力。

2. **输出渲染正确性**
   - 代表：#2449。
   - 关注函数调用参数摘要等「关键信息呈现」的准确性，哪怕是一个换行符，也会影响用户对工具行为的判断。
   - 体现了开发者对 CLI 输出「干净、可靠」的细节追求。

3. **Web 场景的服务健壮性**
   - 代表：#2324。
   - 随着 Kimi Code CLI 在 Web 中运行的使用场景增加，子进程生命周期管理、异常写入保护成为实际痛点。
   - 这类修复能直接抬升生产环境中的稳定性阈值。

---

## 开发者关注点

- **上下文丢失是当前最大的心智负担**：开发者不希望每次启动 CLI 时都从零开始解释项目背景。「记忆系统」高热度且长期持续，直接说明这个痛点普遍存在。
- **自动与可控需要双轨并行**：社区既要 AI 自动记录与总结，也要求保留用户手动注入指令的能力。缺少任何一轨，都会让开发者感到「不可控」或「不好用」。
- **对边界条件错误的零容忍**：两个 PR 分别指向「短文本提前 return 导致 newline 未移除」和「子进程退出后的残余写操作」。这类不当必现的低概率问题，恰恰是真实使用中影响体验的碎片化杀手。
- **PR 悬挂周期偏长**：#2449 和 #2324 均悬挂数月未合并。虽然 24 小时内状态有更新，但社区贡献者维护的修复迟迟不能合入，也可能导致提交者热情减退，这是开源维护者需要关注的风险信号。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报（2026-08-13）

### 今日速览
- 项目发布 v1.18.17 / v1.18.18 两个修复版本，重点解决 Kimi 提示词选择、xAI 推理强度以及会话压缩与自动重试风暴问题。
- 社区最热仍集中在内存问题 Megathread（129 评论），同时新增数据库无限膨胀、PDF 附件内存泄漏等严重报告；DeepSeek V4 相关的订阅/认证问题也在持续发酵。
- 多个重要 PR 正在推进，包括修复 `opencode run` 挂起、会话孤立任务恢复、工作区 UI 以及本地模型 provider 支持。

### 版本发布
- **v1.18.18**：修复 Moonshot / Kimi 官方 provider 的 Kimi 系统提示词选择问题；修复 xAI 模型 `xhigh` 推理强度不生效的问题。
- **v1.18.17**：会话压缩现在保留完整最近轮次，并能为小型模型生成更清晰摘要；新增 MERGE Gateway 推理变体支持；限制自动重试次数并加入抖动，避免重试风暴。

---

### 社区热点 Issues（10 个）

1. **[Memory Megathread #20695](https://github.com/anomalyco/opencode/issues/20695)**  
   内存问题统一追踪帖，129 条评论、97 个 👍。社区被内存泄漏严重困扰，官方请求用户提供堆快照定位根因，讨论热度持续不减。

2. **[DeepSeek V4 Flash 突然要求“启用中国托管模型” #39845](https://github.com/anomalyco/opencode/issues/39845)**  
   20 评论、27 个 👍。用户会话中途突然停止，提示模型需要显式启用中国托管，涉及 OpenCode Go 订阅权限策略突变，引起大量订阅者困惑。

3. **[[FEATURE] Pay Go with crypto #23153](https://github.com/anomalyco/opencode/issues/23153)**  
   18 评论、40 个 👍。用户希望支持加密货币支付 OpenCode Go，属于社区呼声较高的付费方式扩展需求。

4. **[[2.0] event 表无限增长：opencode.db 达 13GB+ #33356](https://github.com/anomalyco/opencode/issues/33356)**  
   17 评论。SQLite 的 `event` 表从不清理/压缩，长跑实例数据库膨胀至 13GB，导致磁盘占满。是影响长期使用的严重存储问题。

5. **[“Copied to clipboard” 不工作 #41470](https://github.com/anomalyco/opencode/issues/41470)**  
   14 评论。在 VSCode Server（Docker）环境中复制文本显示成功但实际剪贴板无内容，影响远程开发用户的日常体验。

6. **[Zen 所有模型报 AuthError #39827](https://github.com/anomalyco/opencode/issues/39827)**  
   10 评论。OpenCode Zen 全部模型返回 “Request blocked by upstream provider”，已排除客户端问题，指向服务端故障，影响面大。

7. **[官网宣称 100% 免费却要求订阅 #42143](https://github.com/anomalyco/opencode/issues/42143)**  
   6 评论。用户质疑免费政策与订阅提示的矛盾，反映产品定价与宣传口径不一致，容易造成信任危机。

8. **[`opencode run` 配额耗尽后无限挂起 #40747](https://github.com/anomalyco/opencode/issues/40747)**  
   2 评论但已有对应 PR。非交互模式下配额耗尽不报错、不退出，且日志中已有错误却无输出，严重破坏自动化流水线。

9. **[工具文件加载失败导致整个工具注册表崩溃 #42250](https://github.com/anomalyco/opencode/issues/42250)**  
   3 评论并有重复报告（#42258）。项目中单个 `.opencode/tool/*.{js,ts}` 异常会使所有会话不可用，属于“单点故障”式稳定性问题。

10. **[PDF 附件内存泄漏 OOM #42263](https://github.com/anomalyco/opencode/issues/42263)**  
    2 评论。大 PDF 每次对话轮次都被整体 base64 编码且无大小限制，最终导致内存溢出，与 #20695 内存问题相互印证。

---

### 重要 PR 进展（10 个）

1. **[feat(opencode): add local server provider with auto model discovery #19959](https://github.com/anomalyco/opencode/pull/19959)**  
   新增 `local` provider，启动时自动从 OpenAI 兼容 `/v1/models` 端点发现模型，方便对接本地推理服务。

2. **[[beta] feat(app): add workspace flows to new layout #38790](https://github.com/anomalyco/opencode/pull/38790)**  
   桌面端新布局增加工作区选择流：可启动本地仓库、创建隔离新工作区或选择已有工作区，并显示分支上下文。

3. **[fix(core): bound compaction request size #36589](https://github.com/anomalyco/opencode/pull/36589)**  
   修复大模型上下文可容纳但序列化请求超过 10MiB 限制时会话永久卡死的问题，自动压缩不再只看 token 数。

4. **[fix(cli): stop `run` from sleeping through an exhausted quota #42289](https://github.com/anomalyco/opencode/pull/42289)**  
   修复配额耗尽时 `opencode run` 持续睡眠不返回的问题，让 CLI 能正确报错退出（对应 #40747）。

5. **[fix(session): recover orphaned task runs #42292](https://github.com/anomalyco/opencode/pull/42292)**  
   当持久化的 `task` 调用超出内存会话生命周期时，abort 会正确标记陈旧 task 及其父消息，避免对话卡在未完成任务。

6. **[fix(app): scope review panel to the session's own file changes #42290](https://github.com/anomalyco/opencode/pull/42290)**  
   修复审查面板显示整个工作区 diff 的问题，改为只展示当前会话实际修改的文件，避免空会话显示其他会话改动。

7. **[fix(core): apply external plugin changes after startup batch commits #42281](https://github.com/anomalyco/opencode/pull/42281)**  
   修复外部插件在启动批处理提交后修改被丢弃的问题，确保 `ConfigExternalPlugin` 的更新能正确生效。

8. **[fix(opencode): persist Config.update to the loaded config file #42257](https://github.com/anomalyco/opencode/pull/42257)**  
   修复 SDK `client.config.update` 返回 200 但实际变更丢失的问题，让配置更新真正写入已加载的配置文件（关闭 #42276、#28966）。

9. **[fix (core): Multiple clones of same repo are different projects #35311](https://github.com/anomalyco/opencode/pull/35311)**  
   修复同一仓库多个克隆被误识别为不同项目的问题，一次性关闭了 15 个相关 issue（含 #42040）。

10. **[feat(tui): show optional daily session cost #39807](https://github.com/anomalyco/opencode/pull/39807)**  
   为 TUI 增加可选的“今日会话总花费”展示，无需运行 `opencode stats --days 1` 即可掌握当天成本。

---

### 功能需求趋势
- **支付方式与订阅体验**：加密货币支付呼声最高（#23153）；同时用户对“免费”宣传与订阅提示的矛盾、充值后仍未生效等问题反馈集中（#42143、#42294）。
- **成本透明化**：希望 TUI 直接显示每日/每会话花费，并修正用量统计错误，避免显示未配置模型（PR #39807、#27712）。
- **桌面端与 IDE 集成**：工作区选择流、标题栏启动按钮、主动内存管理等功能正在推进，说明桌面端体验优化是当前重点方向（PR #38790、#41555、#41553）。
- **本地模型与自定义 provider 支持**：本地 server provider 自动发现模型（PR #19959）显示社区对私有化/离线部署的兴趣。
- **稳定性和资源控制**：内存问题、数据库膨胀、PDF 附件大小限制等资源治理方向需求强烈，官方已通过 Megathread 集中收集线索。

---

### 开发者关注点
- **内存与磁盘占用失控**：从 13GB 数据库膨胀到 PDF 内存泄漏，资源管理是当前最大痛点，影响长期使用。
- **配额/订阅错误不透明**：模型突然不可用、`run` 挂起、免费额度提示冲突等问题频发，开发者希望错误信息更明确、可恢复。
- **会话一致性问题**：工具加载失败导致整个协议栈崩溃、任务状态不更新/不清理、孤立任务残留等，严重干扰 agentic 工作流。
- **环境兼容性短板**：VSCode Server 剪贴板失效、Windows 下 PowerShell 多行输出异常、Safari 中文输入法中断等问题，说明跨平台/远程场景仍需打磨。
- **项目识别误解**：同名文件夹或同一仓库多克隆导致无法打开正确项目，是影响多项目切换的高频问题（PR #35311 已覆盖）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-13

## 今日速览

今日社区焦点集中在**上下文压缩机制缺陷**（#6879）与**大型输入性能问题**（#8029）上：前者导致会话在超过 100% 上下文窗口后仍不触发压缩直至 provider 溢出，后者已由 #8066 提交视觉行缓存修复。新模型与 provider 支持持续活跃，Grok 4.6（#8042）、Amazon Bedrock Mantle（#6216）、Anthropic Vertex（#5262）等 PR 均在推进中。

## 社区热点 Issues

### 1. 自动压缩在上下文超过 100% 后仍不触发
- **Issue**: [#6879](https://github.com/earendil-works/pi/issues/6879) | 评论: 18 | 👍: 17
- 在 gpt-5.6-sol 会话中，一次 agentic turn 运行超过 2 小时，上下文占比持续超过 100%，压缩仅在 API 因 373k tokens 拒绝请求后才生效。社区呼声很高，认为应在每次 agent turn 后主动检查压缩阈值。

### 2. Mac OS 长会话高 CPU 占用
- **Issue**: [#7730](https://github.com/earendil-works/pi/issues/7730) | 评论: 11 | 👍: 8
- Mac OS 上运行 Pi 时 CPU 在 50-110% 之间摆动，内存 600-800MB，疑似与会话长度/上下文大小相关。目前仍在开放状态，尚未有对应修复。

### 3. 大型提示编辑器移动光标性能极差
- **Issue**: [#8029](https://github.com/earendil-works/pi/issues/8029) | 评论: 6
- 提示框内约 7000 行文本时，按一次方向键耗时高达 1650ms。已由 PR #8066 通过视觉行缓存修复。

### 4. 编辑模糊匹配忽略空白长度差异
- **Issue**: [#7836](https://github.com/earendil-works/pi/issues/7836) | 评论: 10
- `normalizeForFuzzyMatch` 不合并连续空白或去除行首空白，导致 `Edit` 工具在空白不完全匹配时模糊匹配失败，即使内容完全相同。对小型模型影响尤为明显。

### 5. 允许受信任 Unix 用户共享 PI_CODING_AGENT_DIR
- **Issue**: [#7779](https://github.com/earendil-works/pi/issues/7779) | 评论: 3
- `auth.json` 和 `models-store.json` 以 0600 权限写入，第一个创建用户成为唯一读写者，后续其他用户的 Pi 进程无法访问共享状态。

### 6. @ 文件自动补全：直接子文件输给深层嵌套匹配
- **Issue**: [#8000](https://github.com/earendil-works/pi/issues/8000) | 评论: 3
- 当 `@~/<dir>/pro` 中直接子目录与深层路径同名时，深层匹配排名优先，用户真正想要的直接子项反而不出现。

### 7. Codex 后端需要处理 end_turn: false
- **Issue**: [#7689](https://github.com/earendil-works/pi/issues/7689) | 评论: 3 | 👍: 2
- Codex 后端可能在 `response.completed` 事件中附带 `end_turn: false`，Pi 目前未处理该字段，可能导致行为异常。

### 8. 流式思考输出闪现标题颜色
- **Issue**: [#8060](https://github.com/earendil-works/pi/issues/8060) | 评论: 3
- 0.84.1 中思考块流式输出时，部分内容短暂变为粗体橙黄色（主题 `mdHeading` 颜色），约半秒后恢复为正常灰色。复现稳定。

### 9. 模糊宽度字符导致 CJK 终端表格对齐错乱
- **Issue**: [#8055](https://github.com/earendil-works/pi/issues/8055) | 评论: 3
- ①、±、€ 等 Ambiguous-width 字符按 1 列计算，但 CJK 终端实际显示 2 列宽，导致表格边框和列表对齐错位。

### 10. Bash PI_* 指南在无关任务中触发不必要权限提示
- **Issue**: [#7787](https://github.com/earendil-works/pi/issues/7787) | 评论: 2
- 默认会话指南要求检查 PI_* 环境变量，模型在普通任务中也会执行 `env` 并触发不必要的权限确认，干扰正常流程。

## 重要 PR 进展

### 1. 修复大型提示编辑器性能问题
- **PR**: [#8066](https://github.com/earendil-works/pi/pull/8066) | 作者: affanali2k3
- 缓存视觉行计算结果，避免每次按键重复计算；宽度或文本变化时缓存自动失效。修复 #8029。

### 2. 在流式事件中保留 usage 数据
- **PR**: [#7982](https://github.com/earendil-works/pi/pull/7982) | 作者: christianklotz
- 修复 #7911：在 JSON/RPC `message_update` 事件中恢复携带累计 usage，同时保持流大小线性增长，并补充了回归测试。

### 3. 添加 Grok 4.6 模型支持
- **PR**: [#8042](https://github.com/earendil-works/pi/pull/8042) | 作者: jackyshen0313
- 将 Grok 4.6 加入 xAI Responses 模型集，保留 low/medium/high/xhigh 推理级别，并覆盖了目录生成测试。

### 4. HTML 导出中渲染 Mermaid 图表
- **PR**: [#7956](https://github.com/earendil-works/pi/pull/7956) | 作者: aliou
- 复用 TUI 渲染工具调用的代码，将 Mermaid 图表从 ANSI 转为 HTML；默认不渲染，可从头部切换显示。

### 5. 通过本地代理使用 Ollama 模型
- **PR**: [#8049](https://github.com/earendil-works/pi/pull/8049) | 作者: DenisRaskovalov
- 新增两个零依赖 Node.js 脚本，在 Ubuntu、macOS、Windows 上通过本地模型代理在 Pi 中使用 Ollama 模型。

### 6. 事务性会话持久化
- **PR**: [#8052](https://github.com/earendil-works/pi/pull/8052) | 作者: sitaram-iyer-glean
- 修复 JSONL 追加失败（如 ENOSPC）时内存会话图与磁盘不一致的问题，避免重启后出现断裂的会话图。

### 7. TUI 组件鼠标事件分发
- **PR**: [#8032](https://github.com/earendil-works/pi/pull/8032) | 作者: PierrunoYT
- 实现 #7683：新增可选 `Component.onMouse(event)` 钩子，`TuiAltScreen` 从最内层开始按 `LayoutBox` 树精准分发事件，坐标相对组件自身。

### 8. 全屏转录滚动位置指示器
- **PR**: [#7970](https://github.com/earendil-works/pi/pull/7970) | 作者: pablasso
- 当全屏转录未跟随底部时，状态行显示 `↓` 箭头，滚动回底部自动清除。实现 #7908。

### 9. Anthropic Vertex provider
- **PR**: [#5262](https://github.com/earendil-works/pi/pull/5262) | 作者: MichaelYochpaz
- 为 Claude on Google Cloud Vertex AI 添加 `anthropic-vertex` 内置 provider，作为薄适配层复用现有 Anthropic Messages 流式处理路径。

### 10. Amazon Bedrock Mantle OpenAI Responses provider
- **PR**: [#6216](https://github.com/earendil-works/pi/pull/6216) | 作者: unexge
- 基于 OpenAI 的 Bedrock Provider 为 Amazon Bedrock Mantle 的 OpenAI Responses API 提供新 provider，取代了较早的实现方案。

## 功能需求趋势

- **新模型/provider 支持**：Grok 4.6（#8042）、Amazon Bedrock Mantle（#6216）、Anthropic Vertex（#5262）、MiniMax 图生图（#8030）、本地 Ollama 模型代理（#8049）。
- **TUI 交互增强**：组件级鼠标事件分发（#7683/#8032）、全屏滚动位置指示（#7908/#7970）、模糊宽度字符对齐（#8055）、滚轮滚动步长可配置（#7765）。
- **上下文管理优化**：自动压缩主动触发（#6879）、上下文预算需考虑输出 token 预留（#8061）、工具轮次间压缩（#7993）。
- **扩展 API 扩展**：自定义消息发布持久化确认（#8023）、消息显示控制钩子（#8035）、主题覆盖（#7722）、本地模型动态注册示例（#8039）。
- **跨平台兼容**：Windows Unix socket 测试失败（#8047）、Windows settings.json 路径解析（#7829）、Mac OS 高 CPU（#7730）、CJK 终端对齐（#8055）。

## 开发者关注点

- **压缩机制可靠性**：#6879 揭示当前 auto-compaction 在上下文超过阈值后不会主动触发，直到 provider 溢出，长时运行的 agentic 任务存在失败风险。社区共识是应在每个 agent turn 后立即检查。
- **大输入性能**：#8029 中 7000 行提示框方向键耗时 1.6 秒，PR #8066 通过缓存优化修复；#7730 的长会话高 CPU 问题仍在定位中。
- **流式协议一致性**：#7911 指出 0.84.0 的 delta-only 修改意外移除了 usage 数据，开发者对流式事件中元数据完整性有较高敏感度。
- **跨平台体验不均衡**：Windows 同时面临测试失败（#8047）和配置解析误导（#7829）；CJK 终端用户遭遇表格错位；Mac OS 用户报告 CPU 异常。
- **模型兼容层需求上升**：多个 issue 指向 OpenAI 兼容网关的差异化行为，包括 `requiresNonNullAssistantContent`（#8063）、maxTokens 预留（#8061）、中途终止重试去重（#8031），显示社区对兼容层精细控制的需求正在增加。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-13

## 今日速览

- v0.21.11 正式发布，引入 Agent Plugins v1 与 `/coordinate` 多代理协作命令，标志原生多代理能力全面铺开。
- v0.21.12-preview.1 紧随其后，修复 Web Shell 会话保持并支持工作区文件上传。
- 多代理 fleet 路线图的四个阶段（1A/1B/2/3）今日全部关闭，说明功能已进入收尾验证；同时 SWE-bench Verified 基准处于 **QUARANTINED（隔离）** 状态，500 条样本 0 解决，官方正在核查。

---

## 版本发布

### v0.21.11（正式版）
- **Agent Plugins v1**：新增插件机制，可扩展 Agent 能力（[#8834](https://github.com/QwenLM/qwen-code/pull/8834)）。
- **`/coordinate` 命令**：原生支持多 Agent 工作流，可添加只读 teammate（[#8804](https://github.com/QwenLM/qwen-code/pull/8804)）。
- SWE-bench Verified 发布前 E2E 验证（dsw-eas-full-20260813-r1/r3）已完成，但最终结果被标记为 **QUARANTINED**——500/500 完成，0 resolved，正在隔离调查。

### v0.21.12-preview.1
- `fix(web-shell)`: 保持独立会话目标（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）。
- `feat(web-shell)`: 支持工作区文件上传。
- 注意：其前序版本 v0.21.12-preview.0 的发布流程曾两次失败（#9076、#9072），已在今日通过 PR #9082 修复。

### Qwen Code Desktop v0.2.1
- 默认将项目记忆（project memory）调整为工作区范围（[#8856](https://github.com/QwenLM/qwen-code/pull/8856)）。
- 会话生命周期相关遥测对齐。

---

## 社区热点 Issues

1. **#8718 [已关闭] RFC：多 Qwen 会话原生协调机制**
   9 条评论，多代理 fleet 的母议题。讨论如何让一个 leader 调度多个独立 worker 并汇总结构化结果，最终沉淀为四阶段实现方案。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/8718)

2. **#9083 `record_artifact` 未校验 workspacePath，制品面板与磁盘状态不一致**
   新提交的 bug：`record_artifact` 返回成功但制品实际无法打开/下载。直接干扰用户对 Agent 产出可信度，值得关注。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9083)

3. **#9074 [P1] 桌面端：确保旧 Electron 客户端能在全平台升级到 Tauri**
   目前 Electron → Tauri 升级桥仅覆盖 macOS，Windows/Linux 用户仍停留在旧 Electron 0.0.5，而 Tauri 已是 0.2.1。跨平台升级断裂。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9074)

4. **#9043 [P1] Windows 桌面版弹出可见 Terminal 窗口，加载状态错位**
   启动时出现独立 Terminal，关闭即导致 Web Shell 退出（`exit code: 1`），引导阶段用户体验受损。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9043)

5. **#9025 Keyless Vertex AI 不识别环境变量，无头 ADC 运行无法启动**
   `getAuthTypeFromEnv` 无法从纯环境变量推断 `vertex-ai` 认证类型，headless 场景（CI）启动即退出。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9025)

6. **#9016 Vertex AI 无法使用 ADC：强制要求 API Key 且任何 key 都会禁用 ADC**
   即使正确配置了 `GOOGLE_APPLICATION_CREDENTIALS`，认证流程仍绕不开 API key，形成死锁。对 GCP 用户影响较大。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9016)

7. **#9002 Python SDK 拒绝 `permission_mode="auto"`，CLI 却支持**
   SDK 客户端侧校验早于 CLI 执行即报 `ValidationError`，导致 SDK 与 CLI 行为不一致，集成方受限。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9002)

8. **#7960 压缩侧查询固定 `maxOutputTokens` 超出小型上下文窗口，触发 400 → COMPRESSION_FAILED**
   自托管 OpenAI-compatible 端点（小窗口）用户会遭遇压缩失败进而空摘要，影响长会话稳定性。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/7960)

9. **#9026 `NO_TOOL_RESULT_PROGRESS` 在模型安静结束回合时导致无头运行硬失败**
   Headless 运行被 `InvalidStreamError` 中断，错误信息缺乏可操作指引，自动化流程脆弱。
   [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9026)

10. **#9037 `/statusline` 预设对话框在矮终端中被裁剪**
    垂直空间不足时顶部/底部行被截断，与已有的 #8363 属不同根因（高度约束而非宽度）。
    [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9037)

> 另有多个 fleet 阶段 Issue（#8840/#8841/#8842/#8843）已全部关闭，标志多代理功能开发完成。

---

## 重要 PR 进展

1. **#9082 fix(ci)：发布分支改为 force-push，修复重试覆盖失败残留**
   解决 v0.21.12-preview.0 发布失败后重试被陈旧分支阻塞的问题，直接关系 Release 流程稳定性。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9082)

2. **#8969 feat(core)：新增 live-session registry 与 `qwen sessions ps`**
   会话运行期间自注册、退出即清理，可通过一个目录查看本机所有正在运行的 Qwen Code 会话，不用遍历项目历史。运维可观测性大提升。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/8969)

3. **#9080 feat(serve)：daemon 增加可轮询的 turn 状态接口**
   提供 `GET /session/:id/turns/current` 和 `/turns/:promptId` 两个只读路由，支持 `idle/queued/running/completed/cancelled/error` 状态，方便外部集成。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9080)

4. **#8817 feat：支持从任意历史会话节点 fork**
   解决了此前只能基于最新会话状态分支的局限，允许以任意 Assistant 回复作为分支起点，对长会话上下文管理是重要改进。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/8817)

5. **#9085 feat(desktop)：弃用 Electron 应用，`desktop` → `desktop-electron`，`desktop-shell` → `desktop`**
   结构纯重命名 + 冻结 Electron 版本，为 Tauri 平稳切换铺路，不影响行为。配合 #9074 的全平台升级计划。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9085)

6. **#9086 fix(review)：针对四个真实 `qwen review run` 故障的修复**
   在 qwen3.8-max 上对三个真实 PR 跑端到端后发现的并发发布、锚点丢失等问题，全部带回归测试。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9086)

7. **#9069 fix(desktop)：外部 URL 与 Markdown 链接可正常打开**
   复用已安装的 Tauri opener 插件，放宽 Web Shell 打开 `http/https` 外链的权限，避免二次开发 Rust command。桌面体验修复。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9069)

8. **#9070 fix(core)：`ask_user_question` 需真实审批面并保留取消原因**
   修复广权限 allow 规则静默绕过提问的问题，同时保留确认管线提供的取消原因，不再一律报通用消息。安全 / 正确性相关。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9070)

9. **#9051 feat(daemon)：Skill 开关变更事件附带变更元数据**
   `settings_changed` 事件中新增变更技能清单、目标状态、会话刷新结果；单次/批量切换均会回传，方便外部订阅者精确感知。
   [查看 PR](https://github.com/QwenLM/qwen-code/pull/9051)

10. **#9065 feat(review)：每条确认的 Critical 必须附带可执行 witness**
   审查流程收紧——确认 Critical 时必须返回验证该结论的实测输出（A/B 对比、探测输出等），减少误报，提升 Code Review 可信度。
    [查看 PR](https://github.com/QwenLM/qwen-code/pull/9065)

---

## 功能需求趋势

- **多代理 / Fleet 编排**：从 RFC（#8718）到四阶段实现全部落地（#8840-#8843），未来重点是恢复、持久化与终端 attach；`/coordinate` 让普通用户也能编排只读 teammate。
- **云认证与无头部署**：Vertex AI / ADC / Keyless 问题集中爆发（#9025、#9016），反映 CI、Cron 等无人值守场景的真实诉求，认证方式需要对"纯环境变量配置"更友好。
- **会话管理与可观测性**：live-session registry（#8969）、turn 状态轮询（#9080）、会话恢复超时保护（#8678）都在增强这一维度。开发者希望"随时知道 Agent 在做什么、卡在哪"。
- **桌面客户端跨平台一致性**：Electron → Tauri 迁移进入深水区，Windows/Linux 升级路径（#9074）、启动异常（#9043）说明桌面不再是辅助入口，而是核心交互阵地。
- **Omni 多模态实验**：路线图（#8197）和 S4a/S4b/S6 状态推进，表明多模态文件识别、容量治理、Policy 链路是下一阶段重点。

---

## 开发者关注点

- **无头运行可靠性**：认证推断失败（#9025）、模型安静结束导致硬失败（#9026）让自动化流程频频中断——无头/CI 场景的容错是需要优先解决的痛点。
- **SDK 与 CLI 行为一致性**：`permission_mode="auto"` 被 SDK 拒绝而 CLI 支持（#9002），这类配置分叉会直接劝退集成方。
- **自托管与小窗口适配**：压缩侧查询固定 token 上限（#7960）说明项目已注意到非 Qwen 官方端点的兼容性，但仍需更多可配置化空间。
- **桌面跨平台升级焦虑**：Windows/Linux 用户无法通过自动更新升级到 Tauri（#9074），加上 Windows 启动弹终端（#9043），桌面端体验是目前表面反应最集中的区域。
- **多代理能力期待与担忧并存**：功能开发已完成（阶段全部关闭），但 SWE-bench Verified 被隔离、审查流程持续加固（#9065、#9086），说明官方在"功能先行、质量护航"——社区需要耐心等待成熟度验证。

---

*数据来源：github.com/QwenLM/qwen-code（2026-08-13 更新）*

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-13

> **品牌说明**：项目已从 DeepSeek-TUI 演进为 **CodeWhale**（Shannon Labs 公共产品），`codewhale` 命令与 npm 包为当前标识，旧包 `deepseek-tui` 已弃用。

---

## 1. 今日速览

**v0.9.7 正式发布**，但发布流程遭遇两处基础设施问题（npm 凭据丢失、并行测试超时），社区贡献集成显著加速——多个 PR 通过 maintainer harvest 机制合入。最受关注的是 v0.9.5 引入的 **Auto-Review 回归 bug**，导致所有 Bash 调用和写操作被静默拦截，官方已提交修复 PR。

---

## 2. 版本发布

### v0.9.7

- **Codewhale 品牌确立**：`codewhale` 命令、npm 包及发布资产名称统一为小写技术标识符，旧 npm 包 `deepseek-tui` 正式弃用，不再接收更新。
- **Grok 4.6 纳入**：作为普通 catalog 行提供，而非 provider 专属集成。
- 关联 PR：[#5341 chore(release): prepare v0.9.7](https://github.com/Hmbown/CodeWhale/pull/5341)

---

## 3. 社区热点 Issues（10 个）

### #4949 "Constitution" 中文翻译争议 — 宪法 vs 协作准则
[Issue #4949](https://github.com/Hmbown/CodeWhale/issues/4949)

- **热度**：16 条评论，持续两周仍活跃
- **详情**：PR #4908 将 "Constitution" 翻译从"协作准则"改回"宪法"，引发关于"贴切性"和"敏感政治色彩"的讨论。作者再次发 Issue 召集中文母语者拍板。
- **为什么重要**：涉及项目核心文档的本地化定位，且带有跨文化沟通色彩。

### #5323 [bug] v0.9.5 回归：Auto-Review 静默拦截所有 Bash 调用与写操作
[Issue #5323](https://github.com/Hmbown/CodeWhale/issues/5323)

- 从 v0.8.67 的"自动批准所有工具调用"退化为 v0.9.5 的"静默阻塞"，且提示语 "destructive action requires explicit review" 具有误导性。
- 已有 3 条评论，官方 PR #5342 正在修复。

### #5345 [FR] 增加多行模式 / 允许自定义"发送"快捷键
[Issue #5345](https://github.com/Hmbown/CodeWhale/issues/5345)

- 对比 Grok Build / Codex：`Enter` 换行、`Shift+Enter` 发送；或 `Ctrl+Enter` 发送。
- 使用场景：多行结构化 Markdown 指令输入。
- 创建当天即有响应，属高频 UX 诉求。

### #5340 [bug] doctor 的 `first-run` / `update checkpoint` 升级后永久卡在 `needs action`
[Issue #5340](https://github.com/Hmbown/CodeWhale/issues/5340)

- 从 v0.9.4 升级到 v0.9.6 后，即使重新完成 onboarding，doctor 检查项始终无法标记完成。

### #5335 [bug] MCP `serve --mcp` 返回 `"nextCursor": null`，违反 MCP 规范
[Issue #5335](https://github.com/Hmbown/CodeWhale/issues/5335)

- `tools/list` 与 `resources/list` 的响应中 `nextCursor` 应为 string 或省略，`null` 导致 Claude Code 等严格客户端报错。
- 社区 PR #5336 已提交修复。

### #5346 [bug] npm 发布在 prepublish 资产守卫阶段丢失 GH_TOKEN
[Issue #5346](https://github.com/Hmbown/CodeWhale/issues/5346)

- v0.9.7 发布工作流中，npm 的 `prepublishOnly` 重跑资产守卫时未携带 GH_TOKEN，导致 npm 发布失败。
- 官方 PR #5347 紧急修复中。

### #5344 [bug] v0.9.7 发布对等测试在共享 runner 负载下超时
[Issue #5344](https://github.com/Hmbown/CodeWhale/issues/5344)

- `exact_turn_snapshot_restores_custom_endpoint_and_turn_receipt_after_builtin_route` 在 5 秒语义事件截止时间内未完成。PR #5343 旨在放宽延迟容忍。

### #5324 [enhancement] agent 工具 schema 过于复杂：32 字段 / 0 必填 / 8 动作
[Issue #5324](https://github.com/Hmbown/CodeWhale/issues/5324)

- 模型面对 32 属性 JSON schema 且无必填字段，运行时还接受别名包袱。作者直指"模型开始报错"，需要简化。

### #5312 [enhancement] 用 SOURCE_DATE_EPOCH 替换硬编码归档时间戳
[Issue #5312](https://github.com/Hmbown/CodeWhale/issues/5312)

- 发布脚本将所以归档条目 mtime 硬编码为 `2000-01-01`，阻碍可复现构建。提议遵循 SOURCE_DATE_EPOCH 标准。

### #5322 [bug] 宽终端下输出区域不填充（v0.8.65 正常）
[Issue #5322](https://github.com/Hmbown/CodeWhale/issues/5322)

- 窄窗口收缩正常、宽窗口扩展失效，文本挤在左侧留白。

---

## 4. 重要 PR 进展（10 个）

### #5347 [fix] 修复 npm 发布的资产认证传递
[PR #5347](https://github.com/Hmbown/CodeWhale/pull/5347)

- 向 npm trusted-publishing 步骤传递只读 GitHub token，保留 OIDC 发布与 exact-tag 门槛。对应 Issue #5346。

### #5342 [fix] 恢复有边界的 Auto-Review 执行
[PR #5342](https://github.com/Hmbown/CodeWhale/pull/5342)

- 已证明安全的读/构建/测试 shell 命令与有界写操作自动执行；特权/网络/未知命令、MCP 变更、密钥、发布行为保持 fail-closed。含回归测试。

### #5329 [fix] 升级 lru 至 0.18 并解除 ratatui-core 锁定（RUSTSEC-2026-0253）
[PR #5329](https://github.com/Hmbown/CodeWhale/pull/5329)

- 修复 `lru` 0.16.4 的 panic 不安全问题（`LruCache::pop()` 可致悬空链表指针），恢复 main 门禁。

### #5343 [test] 兼容共享 runner 的路由延迟
[PR #5343](https://github.com/Hmbown/CodeWhale/pull/5343)

- 首个 v0.9.7 工作流通过 10,317 个 TUI 测试，仅 1 个因 5 秒硬截止超时失败。本 PR 针对并发负载调整超时策略。

### #5341 [chore] v0.9.7 发布准备
[PR #5341](https://github.com/Hmbown/CodeWhale/pull/5341)

- Grok 4.6 作为普通 catalog 行；与 #5319/#5320/#5321 等修复 PR 分离发布。

### #5333 / #5318 [feat] Windows 宿主终端窗口画中画（PiP）模式
[PR #5333](https://github.com/Hmbown/CodeWhale/pull/5333) · [PR #5318](https://github.com/Hmbown/CodeWhale/pull/5318)

- 右键菜单或 `/pin` 命令将终端窗口缩至 640x400 并置顶；再次触发恢复原尺寸/最大化状态。
- #5333 为 maintainer 对社区 PR #5318（SparkofSpike）的 harvest——原 PR 因旧 base 导致 CI 失败。

### #5339 [fix] 抑制子进程拥有的 shell 完成事件
[PR #5339](https://github.com/Hmbown/CodeWhale/pull/5339)

- 从父模型流中过滤子后台 shell 的完成事件，保留未拥有完成与任务/状态可见性。Closes #5325。

### #5336 [fix] MCP 无更多页时省略 `nextCursor`
[PR #5336](https://github.com/Hmbown/CodeWhale/pull/5336)

- 使 `tools/list` / `resources/list` 响应符合 MCP 规范，修复 Claude Code 等严格客户端的解析错误。Fixes #5335。

### #5331 / #5319 [fix] 复制消息不包含视觉装饰
[PR #5331](https://github.com/Hmbown/CodeWhale/pull/5331) · [PR #5319](https://github.com/Hmbown/CodeWhale/pull/5319)

- 用户/助手单元格复制时使用规范源内容而非渲染后的 Ratatui 行；Tool/Thinking/System 等复杂单元格保留原有路径。Closes #5314。
- #5331 为 maintainer harvest（社区作者 XhesicaFrost）。

### #5332 / #5321 [feat] 将 OrcaRouter 注册为命名 provider
[PR #5332](https://github.com/Hmbown/CodeWhale/pull/5332) · [PR #5321](https://github.com/Hmbown/CodeWhale/pull/5321)

- 按 OpenRouter 方式接入 OrcaRouter（OpenAI 兼容网关），`ORCAROUTER_API_KEY`（`sk-orca-` 前缀）解锁 150+ 模型。
- #5332 为 maintainer harvest（社区作者 XiaoHuo888-hue）。

---

## 5. 功能需求趋势

| 方向 | 典型 Issue/PR | 热度信号 |
|---|---|---|
| **架构重构** | EPIC-005 crate 分解（#5316）、agent schema 简化（#5324）、命令契约边界（#5328） | 系统性技术债清理，官方主导 |
| **发布流程健壮性** | npm trusted publishing（#5299）、GH_TOKEN 修复（#5346/#5347）、SOURE_DATE_EPOCH（#5312） | v0.9.7 连续暴露发布链路问题 |
| **本地化与 i18n** | Constitution 翻译（#4949）、字典脊柱（#5337/#5338）、zh-Hant 清理（#5334）、非英文路由点击（#5290） | 中文社区活跃，i18n 基础设施推进 |
| **多模型/Provider 支持** | Grok 4.6（#5341）、OrcaRouter（#5332/#5321）、DeepSeek Pro effort 映射（#5055） | 持续接入新模型与网关 |
| **TUI 交互体验** | PiP 窗口（#5318/#5333）、多行模式/自定义快捷键（#5345）、更新通知（#5053）、宽终端填充（#5322） | 用户对编辑体验和窗口管理有明确诉求 |
| **稳定性与可靠性** | Auto-Review 回归（#5323/#5342）、turn-stop 诚实性（#5267）、快照读/恢复分离（#5320/#5330）、diff 渲染边界（#5087） | v0.9.5 回归引发信任问题，官方重点补救 |

---

## 6. 开发者关注点

1. **Auto-Review 回归影响面大** — #5323 显示从"自动批准"变为"静默阻塞"是严重行为偏差，用户在升级 v0.9.5 后工作流受阻。建议升级用户关注 #5342 修复进度。

2. **MCP 兼容性敏感** — `nextCursor: null` 导致 Claude Code 直接拒绝响应（#5335/#5336）。MCP 规范遵循度是集成方的基本门槛。

3. **发布管道脆弱** — npm 凭据过期、GH_TOKEN 丢失、共享 runner 超时（#5299/#5346/#5344）三连击让 v0.9.7 发布过程颇为曲折，社区对 trusted publishing 的呼声增强。

4. **社区 PR 合入存在摩擦** — 多位社区作者的 PR（#5318/#5320/#5321/#5319）均因 base drift 导致 CI 失败，被迫走 maintainer harvest 通道。贡献者需注意基于最新 main 分支开发。

5. **上手体验细节缺失** — doctor 检查卡死（#5340）、TUI 不提示更新（#5053）、通知不可操作（#5041）等 UX 短板影响新用户的第一印象和存量用户的信任。

6. **中文用户群体活跃且专业** — 翻译争议（#4949）和多行模式需求（#5345）均来自中文用户，且讨论质量高，建议官方在 i18n 设计中更多纳入中文语境考量。

---

*本日报基于 GitHub 公开数据自动生成，链接均指向 Hmbown/CodeWhale 仓库（原 DeepSeek-TUI）。*

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/forever-1314/agents-radar) 自动生成。*