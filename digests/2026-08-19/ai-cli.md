# AI CLI 工具社区动态日报 2026-08-19

> 生成时间: 2026-08-18 23:00 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-19）

## 一、生态全景

当前 AI CLI 工具已从"单模型包装器"演进为**具备会话管理、上下文压缩、工具调用、多代理协作的完整开发环境**，头部产品（Claude Code、Codex、Copilot CLI）进入功能深水区，发力点集中在记忆持久化、跨设备/跨平台一致性及企业级合规控制。**MCP 协议成为事实上的工具生态标准**，但实现质量参差，多工具出现进程泄漏、认证断裂、序列化崩溃等同一纬度的稳定性问题。同时，多智能体协作（Multi-Agent）正从实验走向真实工作流，Qwen、Gemini、Pi 均在此方向上收到密集反馈。竞争格局分层明显——第一梯队追求企业级可靠性，第二梯队以开源/低成本/特定场景（金融、量化、本地模型）构建差异化壁垒。

## 二、各工具活跃度对比

| 工具 | 社区平台 | 热点 Issues | PR 动态 | 今日 Release | 社区信号强度 |
|------|---------|------------|---------|-------------|------------|
| **Claude Code** | anthropics/claude-code | 10 个（最高 121 评论 / 139 👍） | 2 个（1 合并） | v2.1.235 | 高，合规与记忆话题讨论深入 |
| **OpenAI Codex** | openai/codex | 10 个（最高 630 评论 / 285 👍） | 10 个（全部合并） | rust-v0.148.0 | 极高，关注度第一，token 争议发酵 |
| **Gemini CLI** | google-gemini/gemini-cli | 10 个（最高 12 评论） | 10 个（全部合入/活跃） | v0.56.0-nightly | 中高，代理可靠性讨论集中 |
| **GitHub Copilot CLI** | github/copilot-cli | 10 个（最高 20 👍） | 1 个（疑似无关） | v1.0.81-1 | 中高，MCP 痛点密集 |
| **Kimi Code CLI** | MoonshotAI/kimi-cli | 2 个（新） | 2 个（1 关闭） | 无 | 低，处于早期用户积累期 |
| **OpenCode** | anomalyco/opencode | 10 个（最高 34 👍） | 10 个（5 合并） | 无 | 中，计费与配额问题集中爆发 |
| **Pi** | badlogic/pi-mono | 10 个（更新超 70 条） | 10 个（4 开放/6 关闭） | 无 | 高，压缩与 TUI 渲染是焦点 |
| **Qwen Code** | QwenLM/qwen-code | 10 个（最高 11 评论） | 10 个（review/合并中） | v0.21.11-nightly | 中高，多智能体话题升温 |
| **DeepSeek TUI** | Hmbown/CodeWhale | 9 个 | 10 个（1 合并） | v0.9.9 | 中低，架构重构与 i18n 为主线 |
| **Grok Build** | xai-org/grok-build | 0 | 0 | 无 | 无活跃信号 |

> **说明**：Issue/PR 数基于各仓库日报中列出的精选条目统计，非全量数据；"社区信号强度"综合评论量、点赞数、更新频率判断。

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 | 信号强度 |
|------|---------|---------|---------|
| **上下文压缩与持久记忆** | Claude Code、Gemini、Pi、Qwen、OpenCode | 压缩触发不可靠（Pi #6339/#8328）、压缩后记忆丢失（Claude #34556）、记忆系统无限重试（Gemini #26522）、压缩后状态不刷新（Qwen #6806）、缓存失效导致成本飙升（OpenCode #42935、Claude #87137） | ★★★★★ |
| **MCP 生态稳定性** | Codex、Copilot、OpenCode、Gemini | 进程/内存泄漏（Codex #30408）、OAuth 连接后工具不可用（Copilot #4096）、BigInt 序列化崩溃（Copilot #4211）、运行时 MCP 与核心注册表断裂（OpenCode #37684）、TLS 场景 channel 连接失败（Qwen #9392） | ★★★★★ |
| **多智能体协作与代理生命周期** | Qwen、Gemini、Pi、OpenCode | 子代理误报成功（Gemini #22323）、团队成员消息被误判为 shutdown（Qwen #9276）、agent 恢复钩子缺失（Pi #8317）、代理挂起超 1 小时（Gemini #21409） | ★★★★ |
| **Windows / WSL 一等公民支持** | Codex、Claude Code、Copilot、Qwen、DeepSeek TUI | WSL 仓库误判（Codex #35119）、VSCode+WSL 流式中断（Claude #69415）、沙箱路径授权不生效（Copilot #4516）、Windows 会话被静默删除（Qwen #8400）、find 扫描卡死（Pi #8282）、状态指示器不渲染（DeepSeek #5512） | ★★★★ |
| **成本透明度与计费可解释性** | Codex、OpenCode、Claude Code、Pi | Token 燃烧过快（Codex #14593）、配额与用量图表不一致（OpenCode #42985）、缓存失效=全量重读（Claude #87137）、回退模型计价错误（Pi #8285） | ★★★★ |
| **模型指令遵循与行为一致性** | Claude Code、Gemini、Qwen | 长会话偏离指令（Claude #13689）、模型不主动调用 skills（Gemini #21968）、同一模型系上下文窗口不一致（Codex #39144） | ★★★ |
| **安全与权限控制** | Claude Code、Copilot、Codex、Pi | 插件可被模型自调用（Claude #87395）、沙箱启用逻辑不透明（Copilot #4522）、环境变量令牌泄漏（Codex #39301）、敏感命令意外执行（Pi #8325） | ★★★★ |

## 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 差异化技术路线 | 当前短板 |
|------|---------|---------|---------------|---------|
| **Claude Code** | 企业级编码智能体 | 大型组织、合规敏感团队 | 深度依赖 Claude 模型能力；CVP 合规审核流程；企业级缓存优化（在工具描述级别做诊断） | 合规流程与产品行为不一致；Intel Mac 支持滞后 |
| **OpenAI Codex** | 全栈开发伴侣（CLI+App+VS Code） | ChatGPT 用户、跨设备开发者 | Rust 实现；TUI 会话 Fork/导出/归档；远程控制与多端协作；Guardian 安全框架 | Token 成本不透明引发信任危机；Windows 平台回归频繁 |
| **Gemini CLI** | Google 生态智能代理 | GCP 用户、Google 生态开发者 | 深度集成 Gemini 模型与 Cloud Shell；组件级行为评估体系（76 测试/6 模型）；ACP 协议支持 | 子代理终止状态失真；代理自主调用工具能力弱于竞品 |
| **Copilot CLI** | GitHub 生态入口与策略中枢 | GitHub 企业用户、组织管理员 | 与 GitHub 策略、模型目录、MCP 注册表绑定；`/sandbox` 沙箱；Schedule Manager 调度 | MCP 客户端健壮性不足；模型配置灵活性低于自建工具 |
| **Kimi Code CLI** | 长上下文 + 垂直场景 | 中文开发者、金融/量化用户 | K3 长上下文模型；KAOS 审计能力；开源评测先行 | 生态处于早期；Web UI 对第三方模型兼容性差 |
| **OpenCode** | 开源多提供商聚合器 | 自建工具链、成本敏感团队 | 统一协议层（Go 配额、Zen 计费）；模型采样参数 Provider 化；MCP 核心注册表桥接 | 计费逻辑多处异常；事件写入二次方膨胀；PR 被机器人误关 |
| **Pi** | 开源可编程智能体平台 | 开发者/扩展生态爱好者 | 扩展钩子深度介入 Agent 生命周期；多提供商（Anthropic/OpenAI/Bedrock/本地）；缓存友好压缩 | 压缩机制尚不可靠；TUI 长会话渲染瓶颈；无官方商业支持 |
| **Qwen Code** | 多智能体协作调度中心 | 需要并行任务的中国开发者、服务端部署用户 | 团队/leader/worker 原生协调；channel worker + TLS daemon；web-shell artifact 面板；`sessionRotation` 会话生命周期 | 多智能体通信稳定性不足；API 400 错误闭环慢；桌面端数据安全存疑 |
| **DeepSeek TUI** | 轻量终端极客体验 | 终端偏好者、中文用户 | Rust + TUI 架构（EPIC-005 模块化）；模型可见读取预算可配置；SSE 严格 UTF-8 解码 | 品牌切换期（deepseek-tui → codewhale）；npm 发布链路未自动化；Windows 回归 |

**技术路线总结**：
- **重量级官方派**（Claude Code、Codex、Copilot）以模型能力 + 官方生态绑定为核心，打磨企业级体验；
- **开源聚合派**（OpenCode、Pi、Gemini CLI）走"多模型/多 Provider + 可编程扩展"路线，强调可控性与透明度；
- **场景深耕派**（Kimi、Qwen、DeepSeek）面向中文市场和垂直场景（量化、多智能体、终端 UI）快速突围。

## 五、社区热度与成熟度

### 维度一：讨论深度与规模
- **最活跃**：**OpenAI Codex** 以 #14593（630 评论/285👍）断层第一，token 消耗问题已从个例演变为信任危机，说明其用户基数大且对成本敏感；**Claude Code** #84352（121 评论）和 #32479（139👍）显示企业用户在合规与集成层面有深层痛点。
- **高活跃**：Pi、OpenCode、Qwen 超过 70 条日更新，但话题分散在不同 issue 上，单点热度不如头部，体现社区仍在探索期。
- **低活跃**：Kimi（2 issues）、DeepSeek（9 issues）、Grok（0），用户基础尚薄，或处于发布间歇期。

### 维度二：迭代速度
| 工具 | 发布频率 | 迭代特征 |
|------|---------|---------|
| Claude Code | 高频（v2.1.x） | 稳定小步快跑，修复+增量特性 |
| OpenAI Codex | 高频（rust-v0.148.0 + 2 alpha） | 功能密度高，但回归引入也频繁 |
| Copilot CLI | 中频（v1.0.81-1） | 与 GitHub 官方功能强绑定 |
| Gemini CLI | 夜间版 | 合入速度快，但 nightly 暴露问题 |
| Qwen Code | 夜间版 + 基准验证 | 每次发布附带 Benchmark 结果，质量意识强 |
| Pi | 无固定节奏 | PR 驱动的滚动开发 |
| Kimi / DeepSeek | 低频 | 集中在修复与架构准备 |

### 维度三：成熟度排序
**第一梯队（企业可用）**：Claude Code > Copilot CLI > OpenAI Codex —— 功能完整度高，但各有明确短板（Claude Code 合规不一致、Copilot MCP 不稳、Codex 成本失控）。
**第二梯队（快速上升）**：Qwen Code > Pi > OpenCode > Gemini CLI —— 创新速度快，但稳定性问题集中爆发（多智能体通信、压缩失效、计费异常、TUI 渲染）。
**第三梯队（早期探索）**：Kimi Code、DeepSeek TUI —— 产品雏形清晰，但生态与用户规模有限。
**Grok Build**：暂无公开信号，处于静默开发期。

## 六、值得关注的趋势信号

### 1. "上下文压缩"正成为衡量 AI CLI 成熟度的新标尺
Claude Code 用户经历 59 次压缩后自建记忆系统（#34556）、Pi 出现压缩阈值永不评估（#6339）与零 usage 不触发压缩（#8328）、Gemini Auto Memory 无限重试（#26522）——**多条独立路径指向同一结论：模型上下文管理已从"锦上添花"变为核心基础设施**。对开发者的启示：若将 AI CLI 用于长周期项目，优先验证其压缩机制是否可配置、可观测、可在压缩后保留关键上下文。

### 2. MCP 从协议标准走向质量深水区
Copilot 的 OAuth 桥接断裂（#4096）、Codex 的 MCP 进程 9GB 内存泄漏（#30408）、OpenCode 的运行时 MCP 工具桥接（#37684）表明：**接入 MCP 容易，但做到稳定、安全、可回收极难**。开发者选择工具时，应要求 MCP 客户端具备进程生命周期管理、错误隔离与凭据防护能力，而非仅验证"能否连接"。

### 3. 多智能体协作进入"混乱早期"
Qwen 的团队成员消息被误判为 shutdown（#9276）、Gemini 的子代理 MAX_TURNS 被包装为 GOAL 成功（#22323）、Pi 的代理恢复钩子缺失（#8317）——**三起事件共同指向：多智能体结果的真实性验证与终止原因透明化是最大缺失**。在工具宣称支持 multi-agent 时，务必确认其终止状态可审计、异常路径可恢复。

### 4. Windows/WSL 兼容性成为竞争分水岭
从 Codex 的 WSL Git 误判、Claude Code 的 VSCode+WSL 流式中断、Pi 在 Windows 的 find 卡死、到 DeepSeek TUI 的状态指示器回归，**大量主要功能的修复都被 Windows 问题拖慢**。选择工具时，Windows 开发者应优先选择有明确平台 CI 覆盖的项目（如 Qwen 在 #9370 中新增 Windows/macOS 触发机制）。

### 5. 成本透明度决定用户信任
Codex 的 630 条 token 燃烧讨论、OpenCode 的配额对账失败、Pi 的回退模型计价错误，反映出**用户已不再接受"黑盒计费"**。对有成本管控需求的团队，建议在工具选型时加入"用量审计"评估项——能否导出逐请求 token 明细、是否支持配额告警、回退/缓存是否在计费中可见。

### 6. 安全加固从"外围"走向"模型自调用"层面
Claude Code 修复插件被模型自调用漏洞（#87395）、Codex 为子代理添加权限边界（#39299）、Gemini 防止令牌泄漏到子进程（#28898）、Pi 新增 `disabledCommands` 防误上传（#8325）——**安全焦点正从"用户授权"转向"模型不可控行为"**。评估工具时，应关注其对模型自触发插件、环境变量透传、敏感命令执行等维度的防护策略。

### 7. 中文开发者社区正在形成独立的采纳与反馈生态
Kimi 用户主动发布量化交易基准测试（#2608）、Qwen 团队在钉钉/Web Shell 场景的快速迭代（#9347、#9406）、DeepSeek 将文档中文化列为 EPIC（#5482），**说明中文工具链不再只是"翻译版"，而是基于本地工作流（钉钉、Electron、量化交易）深度定制**。对中国开发者，这意味着有更多贴合本地场景的选择；对全球开发者，则意味着需要关注这些工具在 i18n 与跨区协作上的支持程度。

---

*报告基于 2026-08-19 各主流 AI CLI 工具公开社区数据整理，旨在为技术决策者提供横向参考，不构成任何工具选型的绝对建议。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止**：2026-08-19 | **来源**：github.com/anthropics/skills

---

## 1. 热门 Skills 排行

以下为社区评论/关注度最高的 8 个 PR（均处于 Open 状态）：

**① skill-creator 评估链路修复（#1298）** [查看 PR](https://github.com/anthropics/skills/pull/1298)
- **功能**：修复 `run_eval.py` 恒定报 `recall=0%` 的严重 bug——将 eval 产物安装为真实 skill，同时修复 Windows 流读取、触发检测和并行 worker 问题。
- **热点**：关联 Issue #556（10+ 独立复现），社区直指"描述优化循环正在对着噪声做优化"，skill-creator 作为官方核心工具链，其可靠性牵动所有 skill 作者。
- **状态**：OPEN（2026-06 创建）

**② document-typography 排版质量控制技能（#514）** [查看 PR](https://github.com/anthropics/skills/pull/514)
- **功能**：检测并防治 AI 生成文档中的孤行（1-6 词溢出到下一行）、孤段（标题滞留页底）、编号错位等 typographic 缺陷。
- **热点**：这些排版问题影响 Claude 生成的每份文档，社区认为"用户很少主动要求，但每一份都需要"，价值普适。
- **状态**：OPEN（2026-03 创建）

**③ pdf skill 大小写引用修复（#538）** [查看 PR](https://github.com/anthropics/skills/pull/538)
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md`→`reference.md`、`FORMS.md`→`forms.md`）。
- **热点**：官方 skill 在大小写敏感文件系统（Linux/macOS）上的可用性问题，直接影响文档解析。
- **状态**：OPEN（2026-03 创建，04 仍有更新）

**④ ODT 开放文档技能（#486）** [查看 PR](https://github.com/anthropics/skills/pull/486)
- **功能**：新增 ODT/ODS/ODF 创建、模板填充、读取与 ODT→HTML 转换，覆盖 LibreOffice 及 ISO 标准格式。
- **热点**：企业和开源生态对"摆脱微软私有格式"的明确需求，触发词覆盖完整。
- **状态**：OPEN（2026-03 创建）

**⑤ frontend-design 技能可执行性重构（#210）** [查看 PR](https://github.com/anthropics/skills/pull/210)
- **功能**：全面修订前端设计技能，确保每条指令可在单次对话中执行、足够具体以稳定引导 Claude 行为。
- **热点**：呼应 Issue #202 对 skill-creator"更像人类文档而非可执行指令"的批评，社区共识是 skill 首先是给模型读的操作规范。
- **状态**：OPEN（2026-01 创建）

**⑥ skill 质量/安全分析器元技能（#83）** [查看 PR](https://github.com/anthropics/skills/pull/83)
- **功能**：新增两个元技能：`skill-quality-analyzer`（结构/文档 20% + 多维度质量评估）和 `skill-security-analyzer`（安全审查）。
- **热点**：社区技能数量爆发后的标准化治理诉求，对 skill 本身做质检和安全把关。
- **状态**：OPEN（2025-11 创建）

**⑦ docx 修订 w:id 冲突修复（#541）** [查看 PR](https://github.com/anthropics/skills/pull/541)
- **功能**：修复 DOCX skill 向含书签文档添加 tracked changes 时的文档损坏——OOXML 中 `w:id` 在书签/修订/注释间共享 ID 空间，原示例硬编码低 ID 导致冲突。
- **热点**：OOXML 底层细节的正确性直接决定生成文档能否被 Word/LibreOffice 正常打开。
- **状态**：OPEN（2026-03 创建）

**⑧ skill-creator YAML 未加引号告警（#539）** [查看 PR](https://github.com/anthropics/skills/pull/539)
- **功能**：增加预解析校验，检测 `description` 字段中未加引号的冒号，防止 YAML 静默截断导致技能描述损坏。
- **热点**：skill 元数据健壮性问题——描述解析失败是社区高频踩坑点。
- **状态**：OPEN（2026-03 创建）

---

## 2. 社区需求趋势

从 Issues 热度提炼的五大方向：

| 方向 | 代表 Issue | 热度信号 |
|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)：社区技能挂在 `anthropic/` 命名空间构成信任边界滥用 | 43 条评论，全场最高；另有 [#1175](https://github.com/anthropics/skills/issues/1175) 关注 SKILL.md 内置权限逻辑的安全风险 |
| **组织级技能共享** | [#228](https://github.com/anthropics/skills/issues/228)：要求 Claude.ai 支持 org 级技能库/分享链接 | 8👍；另 [#189](https://github.com/anthropics/skills/issues/189) 反映插件重复装同内容技能浪费上下文 |
| **上下文窗口效率** | [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` skill 单次注入约 15.6 万 token 挤爆窗口 | 新发高优 bug；[#1329](https://github.com/anthropics/skills/issues/1329) 提出 compact-memory 符号化记忆技能 |
| **质量保障与治理** | [#412](https://github.com/anthropics/skills/issues/412)：agent-governance 治理模式提案；[#1385](https://github.com/anthropics/skills/issues/1385)：三闸门质量管道 | 提案类持续活跃；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 按最佳实践重写 |
| **互操作与平台扩展** | [#29](https://github.com/anthropics/skills/issues/29)：AWS Bedrock 支持；[#16](https://github.com/anthropics/skills/issues/16)：Skills 暴露为 MCP 协议 | 长期开放的基础设施诉求 |

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、价值明确、尚未合并，近期落地概率较高：

| Skill | 说明 | 近期动态 |
|---|---|---|
| [ServiceNow 平台技能 #568](https://github.com/anthropics/skills/pull/568) | 覆盖 ITSM/ITOM/ITAM/SecOps/FSM/CSDM/IntegrationHub 等 9 大模块的企业级平台技能 | 3 月创建，**8-12 仍有更新**，作者持续迭代 |
| [pyxel 复古游戏开发 #525](https://github.com/anthropics/skills/pull/525) | 官方 pyxel-mcp 作者提交，覆盖"编写→运行→截图→迭代"工作流 | 7 月更新，作者背书 + 生态关联度高 |
| [self-audit 推理质量门 #1367](https://github.com/anthropics/skills/pull/1367) | 先机械验证文件产出，再按损害严重度做四维推理审计，宣称模型/技术栈无关 | 7 月更新，与 #1385 提案形成联动 |
| [testing-patterns 全栈测试技能 #723](https://github.com/anthropics/skills/pull/723) | Testing Trophy 理念 + 单元/React 组件测试模式 | 4 月更新，覆盖面完整 |
| [SAP-RPT-1-OSS 预测技能 #181](https://github.com/anthropics/skills/pull/181) | SAP 开源表格基础模型的预测分析封装（Apache 2.0） | 企业数据分析场景的稀缺补充 |

**另外**：[#1595](https://github.com/anthropics/skills/pull/1595)（UIZZE 加入 Partner Skills，8-17 提交）与 [#1538](https://github.com/anthropics/skills/pull/1538)（两个技能回归 Agent Skills 规范）皆为轻量 PR，合并阻力小，预计近期内合入。

---

## 4. Skills 生态洞察

> 当前社区最集中的诉求是：**在技能数量爆发的同时，补齐安全信任边界、开发/评估工具链可靠性、上下文窗口效率与组织级分发这四大基础设施短板**；新技能方向则明显向质量审计、治理、企业平台（ServiceNow/ODT/SAP）等工程化场景倾斜。

---

# Claude Code 社区动态日报 — 2026-08-19

## 今日速览

v2.1.235 发布，新增拼写检查功能并修复语言服务器重连导致的缓存失效问题。社区的讨论焦点集中在两件事：CVP 审核状态回退引发的新一轮合规性争议（#84352，121 条评论），以及 **59 次上下文压缩后自建记忆系统的工程实践**分享（#34556）。此外，一条关于插件可被模型自调用的安全修复 PR 已合并。

---

## 版本发布

### v2.1.235
- **新增** 可选 `spellcheck` 设置：在提示输入框实时标注拼写错误，支持 `aspell`、`hunspell`、`ispell`
- **修复** 语言服务器在会话中断开/重连时导致的 whole-prompt-cache 失效问题
- **修复** 嵌套相关缺陷（changelog 原文截断，具体内容待确认）

---

## 社区热点 Issues（Top 10）

### 1. CVP 审核状态回退导致 Claude Code 持续触发 Cyber Safeguard 拦截
**#84352** | 评论 121 | 👍 20 | 更新 08-18
已经通过 Cyber Verification Program 审核的组织，在 Claude Code 中仍收到 cyber-safeguard 拦截；审核门户却显示同一申请"审核中"，与先前批准邮件矛盾。**121 条评论是当前社区讨论度最高的问题**，涉及合规流程与产品行为的不一致。

https://github.com/anthropics/claude-code/issues/84352

### 2. 跨上下文压缩的持久记忆：59 次压缩后的自建系统
**#34556** | 评论 89 | 👍 6 | CLOSED
用户记录了 26 天日常使用中经历的 59 次上下文压缩，指出 Claude Code 在每次 compact 后丢失未外部保存的记忆，并分享了自己完整的记忆持久化方案。社区讨论了约 89 轮，虽然该 issue 标记为 CLOSED，但仍是记忆功能方向最有价值的用户实践文档。

https://github.com/anthropics/claude-code/issues/34556

### 3. GitHub Connector 在 Desktop 已连接但 Claude Code 不识别
**#32479** | 评论 88 | 👍 139 | 标记 invalid
Claude Desktop 中 GitHub Connector 显示已连接，但在 Claude Code 中完全不可见。**👍 139 是全部 issue 中最高的**，说明大量用户遇到可复现的集成断裂问题，但官方标记为 invalid，社区对此标签有争议。

https://github.com/anthropics/claude-code/issues/32479

### 4. API Error: Connection closed mid-response 导致工具完全不可用
**#69415** | 评论 53 | 👍 81 | OPEN
VSCode + WSL 环境下，流式响应中途连接关闭的频率高到让 Claude Code 无法完成任何任务。81 个 👍 说明受影响用户面较广，是目前最严重的稳定性 issue 之一。

https://github.com/anthropics/claude-code/issues/69415

### 5. Windows 桌面端跨会话消息被静默丢弃
**#86298** | 评论 19 | 👍 1 | OPEN
自 1.28929.0 版本引入的回归：跨会话消息被挂起等待一个 UI 从未提供的审批，约 5 分钟后过期。用户提供了完整复现步骤，是**桌面端消息可靠性**的一个关键 bug。

https://github.com/anthropics/claude-code/issues/86298

### 6. VSCode 扩展：要求增加"面板不抢焦点"选项
**#32726** | 评论 14 | 👍 52 | OPEN
Claude Code 面板在产生输出时自动展开并抢走焦点，打断用户在其他编辑器标签页的工作流。52 个 👍 表明这是 VSCode 用户最普遍的 IDE 体验痛点。

https://github.com/anthropics/claude-code/issues/32726

### 7. 提升模型遵循指令的能力
**#13689** | 评论 13 | 👍 7 | OPEN
一个跨度近 9 个月的老 issue，核心诉求是 Claude Code 在长会话中逐渐偏离用户指令。持续收到新评论，说明模型指令遵循问题仍未解决。

https://github.com/anthropics/claude-code/issues/13689

### 8. Cowork VM 在 Intel Mac 上更新后连接超时
**#87503** | 评论 9 | CLOSED
更新至 1.32352.0 后，Intel Mac 的 Cowork VM 客户机无法连接宿主机，1.32352.1 中依然存在同类问题（#87759 已提交）。**连续两个版本未修复 Intel Mac 的 Cowork 回归**，对老机型用户影响明显。

https://github.com/anthropics/claude-code/issues/87503

### 9. Bash 工具描述嵌入会话 URL，导致每次 /resume 都使整个 prompt cache 失效
**#87137** | 评论 1 | OPEN
技术价值极高的性能 issue：`Bash` 工具的 `description` 包含会话级 URL，工具定义序列化在 system prompt 之前，URL 变化导致缓存前缀从首字节即失效——每次恢复会话都付出完整重新读取的代价。属于**成本与性能优化**方向的少见深度分析。

https://github.com/anthropics/claude-code/issues/87137

### 10. 移动会话到已存在的项目名时，所有会话被取消分组
**#87745** | 评论 1 | OPEN
UI 操作引发数据完整性 bug：向已存在的项目移动会话后，所有项目下的所有会话都回退为 "Ungrouped"。涉及会话组织结构的静默数据损失，严重度较高但刚提交、社区尚未广泛知晓。

https://github.com/anthropics/claude-code/issues/87745

### 其他值得关注的更新
- **#66539**（CLOSED）：Opus 4.8 桌面版自 6/8 起多症状退化——忽略 CLAUDE.md、绕过权限提示、幻觉、写未请求文件，7 条评论，标签含 `stale`
- **#84806**（OPEN）：登录 token 约 10 分钟过期，但验证邮件需要 11+ 分钟，导致无法完成登录，建议延长 token 生命周期

---

## 重要 PR 进展

过去 24 小时 PR 动态较少（共 2 条），以下全部列出。

### 1. ralph-wiggum: 使用 disable-model-invocation 阻止模型自调用 `/ralph-loop`（已合并）
**#87395** | CLOSED | 👍 0
发现 `hide-from-slash-command-tool` 不是受支持的 frontmatter 字段——该插件设置的隐藏选项实际上不生效，Claude 可以在未被要求的情况下自行调用 `/ralph-loop` 并进入循环。修复为使用 `disable-model-invocation` 字段，**堵住了一个可导致 Agent 自我触发的漏洞**。

https://github.com/anthropics/claude-code/pull/87395

### 2. 为 claude code 补充缺失的 source（待审）
**#41611** | OPEN | 👍 0
一个简单但长周期的 PR（2026-03-31 创建）——为项目补全缺失的 source 文件。虽未提供详细说明，但在构建/发布链路缺失 source 的背景下，可能是**可重复构建能力**的一个补完。

https://github.com/anthropics/claude-code/pull/41611

---

## 功能需求趋势

从全部 50 条近期活跃 issue 中，可以提炼出以下社区功能需求方向：

| 方向 | 代表性 Issue | 需求强度 |
|------|-------------|---------|
| **持久记忆与上下文管理** | #34556（59 次压缩）、#66143（跨会话遗忘） | 高——用户已开始自建方案，说明产品缺口显著 |
| **跨会话/跨机器协作** | #86962（远程连接盲区）、#87154（会话目录不互通）、#85269（supervisor 夜间退出） | 中高——Remote Control 场景在快速普及，配套短板显现 |
| **模型指令遵循与 CLAUDE.md 执行** | #13689、#87469（长会话规则失效）、#66539 | 高——跨版本反复投诉 |
| **桌面应用与 IDE 集成** | #32726（VSCode 焦点）、#77071（Dispatch 缺失）、#86298（消息丢失） | 中——体验类问题集中 |
| **性能与缓存优化** | #87137（缓存失效）、#72600（早压缩） | 中——用户对成本与 token 消耗越来越敏感 |

其中「持久记忆」是用户投入最多精力自建方案的领域，建议官方优先关注。

---

## 开发者关注点

1. **连接稳定性是首要痛点**：#69415 以 81 👍 成为高频问题，流式中断在 WSL/VSCode 环境下明显高发
2. **静默数据丢失不可接受**：#86298（消息过期）、#87745（会话全部取消分组）都是"无提示地破坏已有数据"，开发者对此类问题容忍度最低
3. **缓存失效=真金白银**：#87137 揭示工具描述嵌入会话 URL 导致每次 resume 全量重读，开发者已经开始审计缓存命中路径，并在意 token 消耗
4. **合规性障碍直接影响业务**：#84352 的 121 条评论里，大量用户报告 CVP 批准后仍被拦截，反馈审核状态回退对组织采用决策的影响
5. **模型行为退化是老问题**：#66539 与 #66054 均标记为 stale 后仍在更新，说明 Opus 4.8 在部分场景（权限、验证、长会话）的行为退化尚未获得明确修复
6. **Intel Mac 用户被边缘化**：#87503 与 #87759 连续两个版本出现 Cowork VM 在 Intel 机型上无法启动的问题，老硬件用户有被"版本前进"抛弃的感觉

---

*本日报数据基于 2026-08-19 获取的 anthropics/claude-code GitHub 仓库动态整理，仅代表社区公开反馈，不包含内部开发计划相关信息。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-19）

## 1. 今日速览

Codex CLI 发布 `rust-v0.148.0`，带来 TUI 对话 Markdown 导出（`/export`）、会话 Fork/归档等核心体验更新。社区层面最受关注的问题仍是 #14593 “Token 燃烧速度异常” （630 评论 / 285 赞），其次是对多账户支持和 Windows 平台多项回归的持续反馈。PR 方面，安全加固（Guardian V2、令牌防泄漏、Windows 沙箱 ACL）与 MCP 工具链改进成为昨日合并主力。

## 2. 版本发布

### rust-v0.148.0（正式版）

- **TUI 对话导出**：使用 `/export` 将完整 TUI 对话导出为 Markdown，可复制到剪贴板或保存为新文件（[#37358](https://github.com/openai/codex/issues/37358)）。
- **会话 Fork 与归档**：`codex exec fork` 可 Fork 会话；TUI 恢复选择器支持归档/恢复会话（[#37367](https://github.com/openai/codex/issues/37367) / [#37369](https://github.com/openai/codex/issues/37369) / [#37371](https://github.com/openai/codex/issues/37371)）。
- **起草提示**：TUI 初始化期间即可起草提示词（细节待完整 Release Notes）。

另有 `rust-v0.148.0-alpha.23` 和 `rust-v0.148.0-alpha.22` 两个预发布版本推送，未包含显著变更描述。

## 3. 社区热点 Issues

### 1. Burning tokens very fast（Token 消耗过快）
- [#14593](https://github.com/openai/codex/issues/14593) | 评论 630 | 👍 285 | 开放中
- **简述**：用户在 VS Code 扩展（Business 订阅）中发现 Token 消耗速度异常，社区反馈强烈，是目前 Codex 仓库中关注度最高的问题。
- **为什么重要**：直接影响用户成本和信任度，属于最高优先级体验问题。

### 2. 支持每个应用/连接器多个命名账户
- [#20500](https://github.com/openai/codex/issues/20500) | 评论 28 | 👍 107 | 开放中
- **简述**：请求允许在同一 Codex 会话中连接多个授权账户（如多个 GitHub/连接器），并支持显式账户切换和隐私边界。
- **为什么重要**：高赞功能需求，反映企业用户和跨团队协作场景的真实痛点。

### 3. 内置浏览器插件初始化失败：Trusted RPC 依赖不在可信路径内
- [#39136](https://github.com/openai/codex/issues/39136) | 评论 61 | 👍 18 | 开放中
- **简述**：Windows 版 Codex App 启动内置浏览器时出现 “Trusted RPC dependency is not within a trusted code path” 错误。
- **为什么重要**：影响 ChatGPT Plus 用户在 Windows 桌面端使用核心浏览器功能，属新引入的严重回归。

### 4. VS Code 扩展 26.5707.* 在 Linux 上打开空白 webview
- [#32041](https://github.com/openai/codex/issues/32041) | 评论 57 | 👍 3 | 开放中
- **简述**：Linux 上 VS Code 扩展新版本 webview 空白，旧版 26.5623 可用但缺少 5.6-Sol 模型支持。
- **为什么重要**：Linux 桌面用户被夹在“功能缺失”和“不可用”之间，影响面大。

### 5. MCP 服务器进程泄漏（9+ GB RSS）
- [#30408](https://github.com/openai/codex/issues/30408) | 评论 29 | 👍 8 | 开放中
- **简述**：App-server 为每个新线程/会话生成完整 MCP 服务器进程，但线程归档或关闭时从不清理，导致内存无限累积。
- **为什么重要**：严重资源泄漏问题，长时间使用后会拖垮桌面应用。

### 6. macOS 桌面无法恢复远程控制/CLI 线程（“already has an active writer”）
- [#37403](https://github.com/openai/codex/issues/37403) | 评论 25 | 👍 18 | 开放中
- **简述**：macOS 上更新后，使用 ChatGPT 移动端远程控制 Mac 上 Codex CLI 线程的既有工作流中断，桌面端打开同一线程时报告 `already has an active writer`。
- **为什么重要**：跨设备远程控制是核心协作场景，且明确标记为回归问题。

### 7. Windows + WSL 将有效 WSL 仓库误判为非 Git 仓库
- [#35119](https://github.com/openai/codex/issues/35119) | 评论 23 | 👍 17 | 开放中
- **简述**：26.721.3404 版本将 WSL ext4 文件系统上的有效仓库报告为“Git is unavailable”，无法正常工作。
- **为什么重要**：WSL 是 Windows 开发者主流工作环境，此问题阻断大量用户的日常开发。

### 8. Azure Responses 拒绝空 functions namespace 描述（回归）
- [#37380](https://github.com/openai/codex/issues/37380) | 评论 18 | 👍 40 | 开放中
- **简述**：0.147.0 版本中 Azure OpenAI 自定义 Responses 提供者（经 APIM 路由）无法处理空的 `functions` namespace 描述，导致工具调用失败。
- **为什么重要**：40 个赞表示企业 Azure 用户受影响明显，属于自定义模型链路的回归。

### 9. 所有 GPT-5.6 Sol 回合因保留的 collaboration.spawn_agent 失败
- [#31864](https://github.com/openai/codex/issues/31864) | 评论 7 | 👍 17 | 开放中
- **简述**：受影响的 GPT-5.6 Sol 会话每次请求都因 `Function 'collaboration.spawn_agent' is reserved for use by this model` 失败，即使未主动使用该工具。
- **为什么重要**：导致模型完全不可用，且与 MultiAgentV2 的架构冲突涉及范围较广。

### 10. GPT-5.6 Sol 仍然收到 272K max_context_window
- [#39144](https://github.com/openai/codex/issues/39144) | 评论 6 | 👍 2 | 已关闭
- **简述**：长上下文上线后，Terra/Luna 已获得 872K 上下文窗口，但 Sol 仍被限制在 272K。
- **为什么重要**：虽然已关闭，但揭示了模型间能力不一致的问题，影响选择 Sol 处理长任务的用户。

## 4. 重要 PR 进展

> 以下 PR 均由 `copyberry[bot]` 提交并已合并（Closed），是 8 月 18 日的主要代码变更。

### 1. Attribute executor skill invocations to plugins（执行器技能调用归因到插件）
- [#39309](https://github.com/openai/codex/pull/39309)
- **内容**：将 MCP 发现过程中的插件身份携带到每轮扩展数据中，并为执行器技能目录项标注插件 ID 和用户作用域。
- **价值**：提升 MCP 技能调用的可追溯性和权限管理精度。

### 2. Fail closed on Guardian V2 risk scoring errors（Guardian V2 风险评分错误时安全失败）
- [#39307](https://github.com/openai/codex/pull/39307)
- **内容**：将配置、序列化、线程查找、分类等错误视为高风险，不再保留先前低风险结果；异步评分失败与完成分数分离。
- **价值**：消除因静默降级带来的安全判断漏洞。

### 3. Prevent Node REPL auth tokens from reaching child processes（防止 Node REPL 认证令牌传给子进程）
- [#39301](https://github.com/openai/codex/pull/39301)
- **内容**：将 `NODE_REPL_AUTH_TOKEN` 加入模型可触达的子进程不可继承环境变量列表，并在策略覆盖后不区分大小写地移除。
- **价值**：保护敏感令牌，防止因环境变量透传导致泄漏。

### 4. Restrict agent roles to bounded configuration overrides（限制 agent roles 的配置覆盖范围）
- [#39299](https://github.com/openai/codex/pull/39299)
- **内容**：agent roles 只能覆盖模型行为、开发者消息等有界字段，不得扩展授权或更改父会话的 provider 配置。
- **价值**：加固子代理隔离，避免权限逃逸。

### 5. Enable MCP tool hooks in Codex sessions（在 Codex 会话中启用 MCP 工具钩子）
- [#39296](https://github.com/openai/codex/pull/39296)
- **内容**：通过会话共享的 MCP 运行时执行 `mcp_tool` 钩子处理器，并限制仅可调用已连接、已编目且策略允许的工具。
- **价值**：为 MCP 工具引入可编程钩子能力，同时保持安全边界。

### 6. Show file destinations in TUI change approvals（TUI 变更审批中显示文件目标）
- [#39285](https://github.com/openai/codex/pull/39285)
- **内容**：文件变更审批时展示描述与目标路径，移动操作显示源路径和目标路径，跨平台格式化；缺失时显示 unavailable。
- **价值**：直接修复空白审批提示问题（回应 Issue #36637），提升审批透明度。

### 7. Add Windows sandbox diagnostics to `codex doctor`（为 codex doctor 增加 Windows 沙箱诊断）
- [#39290](https://github.com/openai/codex/pull/39290)
- **内容**：报告 Windows 沙箱后端配置、受限读取策略状态、策略兼容性、提权沙箱配置失败等诊断信息。
- **价值**：帮助 Windows 用户快速定位沙箱相关部署问题。

### 8. Increase SQLite log sink batching（提升 SQLite 日志汇批量写入能力）
- [#39294](https://github.com/openai/codex/pull/39294)
- **内容**：日志队列上限从 512 提升至 2,048，插入批次从 128 提升至 512，定期刷新间隔从 2 秒扩展至 10 秒。
- **价值**：减少高频日志写入对性能的影响。

### 9. Report network disconnects during approval（审批期间报告网络断开）
- [#39284](https://github.com/openai/codex/pull/39284)
- **内容**：跟踪普通 HTTP 与 CONNECT 代理请求在网络审批完成前的断开时间，并向模型返回可解释的信息。
- **价值**：解决本地代理审批中止时工具调用无反馈的体验问题。

### 10. Preserve owner-provided environment configuration（保留所有者提供的环境配置）
- [#39278](https://github.com/openai/codex/pull/39278)
- **内容**：拒绝将通过线程设置覆盖已由所有者配置的环境变量。
- **价值**：防止子线程意外接管父级环境配置导致的安全或行为漂移。

## 5. 功能需求趋势

从近期 Issues 中可以提炼出社区最关注的五个方向：

1. **多账户与多身份管理**（#20500，👍 107）
   - 在单一 Codex 会话中同时连接多个同类型账户，并要求显式账户选择与严格隐私边界。这是目前点赞数最高的需求类 Issue。

2. **Windows / WSL 一等公民支持**（#35119、#37104、#32164、#39209、#39236）
   - 大量问题集中在 Windows 原生桌面、WSL 仓库识别、集成终端、远程控制注册和 Chrome 插件修复流程上，说明 Windows 用户基数持续扩大但平台成熟度仍有欠缺。

3. **会话生命周期与资源回收**（#30408、#27230、#23930、#38787）
   - 社区持续关注线程归档后的进程清理、SQLite 状态残留、子代理卡片卡住等资源管理问题，期望“关闭即清理”的确定性行为。

4. **长上下文与模型能力一致性**（#39144、#31864）
   - 用户对不同模型（Sol/Terra/Luna）的上下文窗口、内建工具行为差异非常敏感，希望模型间能力对齐且变更可见。

5. **MCP 与自定义 Provider 兼容性**（#23186、#31354、#39054、#38365）
   - 自定义 `wire_api = "responses"` 提供方（Azure、MiniMax、llama.cpp 等）与 MCP 工具的交互问题频发，社区需要官方的 MCP 工具调用标准化方案。

## 6. 开发者关注点

- **Token 消耗不透明**（#14593）是最大的信任危机，用户明确表示“Am I the only one still seeing my token burning fast？”，需要官方给出消耗审计和速率控制手段。
- **Windows 平台回归频繁**：多个版本级回归（WSL Git 检测、集成终端 PTY、远程控制注册、浏览器 RPC）集中出现，开发者希望 Windows 平台有更完善的 CI 覆盖。
- **资源泄漏导致长期运行不可用**：MCP 进程无界增长（#30408）和 TUI 会话卡顿问题（#38565）让用户对桌面端长期稳定性产生疑虑。
- **安全与权限透明度提升已见效**：昨日合并的 PR 中大量涉及安全加固（Guardian V2、令牌防泄漏、ACL 失败传播），说明官方正在优先回应用户对安全和配置控制的诉求。
- **跨设备/跨 Provider 的会话连续性**：移动端远程控制（#37403、#32164）和跨 Provider 会话交接（#38365）被反复提及，开发者希望“在任何设备上都能接着干”成为 Codex 的默认体验。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-19）

## 今日速览

今日发布 `v0.56.0-nightly.20260818.g194edea47`，主要包含 SSR Agent 对隐私文案与 TypeScript 严格空值错误的修复，同时有多项针对 Agent 可靠性、安全加固和模型路由的 PR 密集合入。社区讨论热点集中在子代理误报成功、通用代理挂起、Shell 执行卡死及 Auto Memory 系统问题。

## 版本发布

**v0.56.0-nightly.20260818.g194edea47**  
- [SSR Agent] Issue Fix (26120)：澄清隐私通知措辞与选择选项（[#28820](https://github.com/google-gemini/gemini-cli/pull/28820)）
- [SSR Agent] Issue Fix (21919)：修复集成测试中的 TypeScript strict-null 错误（[#28819](https://github.com/google-gemini/gemini-cli/pull/28819)）

## 社区热点 Issues

1. **Subagent 达到 MAX_TURNS 却被报告为 GOAL 成功**  
   [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)  
   `codebase_investigator` 子代理在未执行任何分析时因达到最大轮数停止，但状态被标记为 `success` 且终止原因为 `GOAL`，掩盖了真实的打断。12 条评论，社区普遍关注评估结果失真。

2. **通用代理（generalist agent）无限期挂起**  
   [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)  
   创建文件夹等简单操作触发委派时可能挂起超过一小时，手动取消或禁止委派可规避。8 条评论，8 个 👍，是影响日常体验的高热度问题。

3. **利用模型 bash 亲和性的零依赖 OS 沙箱与执行后意图路由**  
   [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)  
   提议让 Gemini 3 模型原生使用 POSIX 工具工作，同时通过沙箱保障安全，并智能路由后置意图。8 条评论，属于架构级增强方向。

4. **组件级行为评估体系（EPIC）**  
   [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)  
   计划扩展行为评估覆盖范围，当前已有 76 个测试、支持 6 种 Gemini 模型。7 条评论，社区认为这是保障 Agent 质量的关键设施。

5. **AST 感知的文件读取、搜索与代码库映射影响评估**  
   [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)  
   探索用 AST 感知工具减少无效读取、降低 token 噪音，并改进导航效率。7 条评论，属于性能优化的重要方向。

6. **Gemini 不会主动使用 skills 和 sub-agents**  
   [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)  
   即便有 gradle、git 等技能描述，模型仍几乎不自动调用，除非显式指示。6 条评论，反映 Agent 自主决策能力短板。

7. **Auto Memory 对低信号会话无限重试**  
   [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)  
   提取代理跳过低信号会话后，索引会反复暴露这些未处理项，导致无限循环重试。5 条评论，涉及记忆系统资源浪费。

8. **Shell 命令执行后卡在 "Waiting input" 状态**  
   [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)  
   简单 CLI 命令完成后仍显示活跃且等待输入，需人工干预。4 条评论，3 个 👍，影响自动化流程。

9. **增强 browser_agent 韧性：自动会话接管与锁恢复**  
   [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)  
   针对持久化 profile 被锁定的场景，当前 fail-fast 策略过于脆弱，提议自动接管或恢复。4 条评论，浏览器自动化用户关注。

10. **Browser 子代理在 Wayland 下失败**  
    [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)  
   在 Wayland 会话中浏览器子代理直接报告 GOAL 终止但无实际输出。4 条评论，Linux 桌面用户受影响。

## 重要 PR 进展

1. **修复核心逻辑：保留带工具或媒体内容的空文本回合**  
   [#28892](https://github.com/google-gemini/gemini-cli/pull/28892)  
   调整 `isValidContent` 校验，避免丢弃包含工具请求/响应或多媒体数据的空文本回合，保证历史完整。

2. **加固子进程执行安全与配置摄取**  
   [#28898](https://github.com/google-gemini/gemini-cli/pull/28898)  
   增强核心编排器子进程、配置读取和 GitHub API 交互的安全性，防止认证令牌泄漏到不受信任的工具环境中。

3. **支持符号链接的 Agent Markdown 文件**  
   [#28883](https://github.com/google-gemini/gemini-cli/pull/28883)  
   修复 `~/.gemini/agents/` 下 symlink 无法被识别为代理的问题，对应 issue #20079。

4. **防止统一流式内容导致的误报循环检测**  
   [#28877](https://github.com/google-gemini/gemini-cli/pull/28877)  
   避免连续空格等均匀字符流被误判为无限循环，提升流式输出稳定性。

5. **处理 Cloud Shell 默认项目 404 错误**  
   [#28876](https://github.com/google-gemini/gemini-cli/pull/28876)  
   在 Google Cloud Lab 环境中 `cloudshell-gca` 项目缺失时优雅处理 API 404。

6. **防止 OAuth 回调超时导致未处理的 Promise 拒绝**  
   [#28873](https://github.com/google-gemini/gemini-cli/pull/28873)  
   修复认证流程中回调服务器 5 分钟超时后产生的未处理异常，对应 issue #28512。

7. **将 compact matcher 翻译为 compress 并更新枚举**  
   [#28871](https://github.com/google-gemini/gemini-cli/pull/28871)  
   兼容从 Claude Code 迁移的 hook 配置，将 `compact` 映射为 `compress` 并同步枚举定义。

8. **在请求权限前发送 pending 工具调用更新**  
   [#28870](https://github.com/google-gemini/gemini-cli/pull/28870)  
   修复 ACP 模式下先发权限请求而未发送 `tool_call` pending 状态的问题，符合协议规范。

9. **识别混合函数调用回合**  
   [#28895](https://github.com/google-gemini/gemini-cli/pull/28895)  
   修复了历史中同时包含函数调用与文本内容时被误判的问题，提升上下文解析准确率。

10. **尊重计划路由（plan-routing）模型可用性**  
    [#28897](https://github.com/google-gemini/gemini-cli/pull/28897)  
    根据实际模型可用性调整路由策略，避免在不可用模型上执行计划任务。

## 功能需求趋势

- **Agent 可靠性优先**：大量 issue 围绕子代理错误终止状态、挂起、循环检测和技能自主调用，社区希望 Agent 不仅“能做”，还要“做对且不误报”。
- **安全沙箱与权限控制**：多个提案（如 #19873、#26525、#28863）关注 OS 级沙箱、敏感信息脱敏和环境变量治理，安全已成为核心设计要素。
- **评估体系组件化**：用户期待更细粒度的组件级行为评估（#24353），以系统化跟踪质量回归。
- **上下文效率优化**：AST 感知工具（#22745）、Tactful Extraction（#19561）等讨论表明，如何减少 token 消耗并精准读取代码是长期痛点。
- **浏览器自动化韧性**：browser_agent 在 Wayland、持久化会话锁、settings 覆盖等方面的问题集中爆发，跨平台稳定性需求明显。

## 开发者关注点

- **子代理结果可信度**：MAX_TURNS 被包装为成功（#22323）让用户难以信任自动任务报告，需要更透明的终止原因。
- **代理挂起与卡死**：通用代理挂起（#21409）、Shell 命令卡在“等待输入”（#25166）严重干扰日常开发，高频被投诉。
- **配置与文件识别不一致**：symbolic link 代理不被识别（#20079）、browser_agent 忽略 settings.json（#22267）等让用户对可配置性失望。
- **记忆系统低效与隐私**：Auto Memory 无限重试（#26522）以及提取模型先接触内容后再脱敏（#26525）同时影响效率和数据安全。
- **多环境支持缺失**：Wayland、Cloud Shell、gVisor sandbox 等特定环境的兼容问题频繁出现，用户期待更宽的平台覆盖。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-19）

## 今日速览
今日发布 **v1.0.81-1**，新增 Gemini 3.7 Flash 支持、`/sandbox` 快捷编辑 `settings.json` 以及 per-agent 用量统计；社区讨论焦点集中在 MCP 认证/进程泄漏、沙箱强制启用与模型配置缺失。高赞功能需求集中在 **per-agent reasoning effort** 与 **per-mode 默认模型配置**。

## 版本发布
### v1.0.81-1（最新）
- **Added**
  - 支持 Gemini 3.7 Flash
  - `/sandbox` 中按 `Ctrl+E` 可在编辑器中打开 `settings.json`
  - `--usage-output-file` JSON 输出新增 per-agent 用量指标
- **Improved**
  - Schedule Manager 中按 `x` 移除已调度的 `/every` 和 `/after` 提示
- **Fixed**
  - Turning allow-all off from ...（原文截断，官方尚未发布完整说明）

## 社区热点 Issues
以下为过去 24 小时内更新最活跃、社区关注度最高的 10 个 Issue：

1. **组织启用的模型在目录中缺失（Claude Sonnet 5/Opus 5、Kimi K3）**
   - [github/copilot-cli Issue #4390](https://github.com/github/copilot-cli/issues/4390)
   - 10 评论 / 7 👍。企业用户显式启用的模型在 CLI 中不可用，直接影响生产使用，且涉及多个模型供应商。

2. **支持滚动浏览当前会话历史**
   - [github/copilot-cli Issue #4313](https://github.com/github/copilot-cli/issues/4313)
   - 8 评论。用户希望用鼠标滚轮或 PageUp/PageDown 浏览历史，属于终端交互体验的核心诉求。

3. **1.0.42 误报自定义 MCP 服务器为策略屏蔽**
   - [github/copilot-cli Issue #3162](https://github.com/github/copilot-cli/issues/3162)
   - 7 评论 / 1 👍。虽是旧版本，但仍在更新，反映 MCP 注册表与策略匹配存在 false-negative，影响自定义 MCP 使用。

4. **自定义 Agent YAML Frontmatter 应支持 Reasoning Effort**
   - [github/copilot-cli Issue #2904](https://github.com/github/copilot-cli/issues/2904)
   - 7 评论 / **20 👍**。社区高票需求，目前 `reasoning effort` 只能全局设置，无法按 agent 粒度控制，限制精细化调优。

5. **支持按模式（plan vs autopilot）配置默认模型**
   - [github/copilot-cli Issue #2958](https://github.com/github/copilot-cli/issues/2958)
   - 4 评论 / **16 👍**。用户希望 plan 模式和 autopilot 模式使用不同默认模型，以平衡成本与效果。

6. **第三方 MCP 服务器显示“Connected”，但工具无法在 CLI 会话中使用**
   - [github/copilot-cli Issue #4096](https://github.com/github/copilot-cli/issues/4096)
   - 6 评论 / 2 👍。OAuth token 未桥接到 CLI 会话，导致应用内已授权的 MCP 工具不可见，属于核心集成缺陷。

7. **Atlassian MCP OAuth 认证在 1.0.80 中损坏**
   - [github/copilot-cli Issue #4490](https://github.com/github/copilot-cli/issues/4490)
   - 3 评论。RFC 8414 §3.3 回归，1.0.78 正常、1.0.80 失败，是明确的行为退化。

8. **Copilot CLI 无法处理 MCP 结构化响应中的 BigInt**
   - [github/copilot-cli Issue #4211](https://github.com/github/copilot-cli/issues/4211)
   - 4 评论 / 2 👍。MCP 返回大数字时直接抛 `TypeError: Do not know how to serialize a BigInt`，导致任务中止，影响处理数据的工具链。

9. **1.0.81-1 在托管策略未确定时强制启用沙箱**
   - [github/copilot-cli Issue #4522](https://github.com/github/copilot-cli/issues/4522)
   - 1 评论 / 2 👍。即使 `sandbox.enabled=false` 也会被临时强制启用，新版本中刚暴露的高影响问题。

10. **支持 BYOK Provider 凭据热刷新，无需重启 CLI**
    - [github/copilot-cli Issue #3682](https://github.com/github/copilot-cli/issues/3682)
    - 2 评论 / 6 👍。短时凭据（Entra ID、AWS STS 等）只能在启动时读取，过期后必须重启，企业环境强需求。

## 重要 PR 进展
过去 24 小时仅收录 **1 条 PR 更新**，且内容疑似与项目无关，因此无法列出 10 条有效 PR：

- **#3163 [OPEN] ViewSonic monitor**
  - [github/copilot-cli PR #3163](https://github.com/github/copilot-cli/pull/3163)
  - 作者：tijuks | 更新：2026-08-18
  - 摘要：`###monitor for #2591 ,#3561,#3559 -initiate [GitHub action] //runners`
  - 说明：PR 标题与内容不清晰，可能为垃圾/误提交，建议维护者关注。今日无实质性的代码 PR 合入或重要变更，可重点跟踪上述 Issue 中涉及的修复。

## 功能需求趋势
从近期 Issue 看，社区最关注的功能方向集中在以下几个方面：

- **模型与 Provider 配置精细化**
  - 自定义 Agent 支持独立 `reasoning effort`（#2904）
  - plan/autopilot 模式分别配置默认模型（#2958）
  - BYOK 凭据热刷新，避免重启（#3682）
  - 组织启用的模型在目录中完整可见（#4390）

- **MCP 生态稳定性与兼容性**
  - MCP OAuth 第三方服务器工具桥接（#4096、#4490）
  - 正确处理 `structuredContent` 与 BigInt（#4211、#4515）
  - MCP 子进程生命周期管理，防止孤儿进程累积（#4392、#3698）

- **沙箱与权限控制的可控性**
  - 明确沙箱启用逻辑，支持用户显式关闭（#4521、#4522）
  - RW 路径授权对所有子进程生效，包括 JVM/Java 工具链（#4516）
  - `allowed_directories` 真正抑制路径外提示（#4482）

- **终端交互与用户体验打磨**
  - 会话历史滚动浏览（#4313）
  - 状态 footer 卡在 “Loading:” 的问题（#4206）
  - 会话 AIC 显示不可靠（#4511）
  - 手动 `/rename` 不被自动重命名覆盖（#2622）

- **插件与 Agent 可发现性**
  - 插件市场浏览命令支持搜索/筛选（#4523）
  - 修复 marketplace 缓存忽略 `ref` 导致的跨分支错误（#4513）
  - 独立 `postToolUse` hook 不触发的问题（#4520）

## 开发者关注点
- **MCP 问题是最集中的痛点**：从误报策略屏蔽、OAuth 连接成功但工具不可用、BigInt 序列化崩溃到 stdio 子进程泄漏，开发者普遍反映 MCP 客户端的健壮性和错误处理有待加强。
- **沙箱策略不透明且难以关闭**：多位用户遇到 `sandbox.enabled=false` 配置被忽略或策略未确定时强制启用；JVM 子进程不遵循 RW 路径授权，影响 Maven、javac 等 Java 生态工具链。
- **模型能力开放不足**：组织级模型无法在 CLI 使用、per-agent/per-mode 模型参数缺失、BYOK 短时凭据无法自动刷新，说明企业级模型配置的灵活性仍是核心诉求。
- **终端 UI 细节影响效率**：无法滚动历史、footer 状态卡死、AIC 用量统计不准等问题被反复提及，说明 CLI 在长时间会话下的稳定性需要优化。
- **插件/技能生态仍有断层**：市场缓存分支 bug、hook 不触发、技能不可达等问题，说明插件系统从配置到执行的链路还没有完全打通。

---
*本日报基于 GitHub 公开数据自动整理，仅供技术社区参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-19）

## 今日速览
过去 24 小时无新版本发布。社区活跃度集中在两个议题：一是 Web UI 在使用非 Kimi（OpenAI 兼容）提供商时出现渲染异常，影响刷新/重挂载后的消息展示；二是用户公开分享了基于 K3 + Kimi Code 进行量化策略生成的完整基准测试报告，展示了其在金融场景中的实际表现。此外，一个关于 SSH 失败日志的修复 PR 被关闭，另有一个“知识平面”新功能 PR 尚待讨论。

## 版本发布
暂无。

## 社区热点 Issues
> 数据说明：过去 24 小时内更新/创建的 Issue 共 2 个，全部列出。

### [#2607] Web UI: 非 Kimi（OpenAI 兼容）提供商在标签切换/重载后消息渲染异常  
- **作者**：chenxupeng1990-eng  
- **状态**：Open | 更新于 2026-08-18 | 评论：1  
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2607  
- **摘要**：在 Web UI 中，使用自定义 OpenAI 兼容提供商的会话，流式输出时消息渲染正常；但一旦经历浏览器标签切换、页面刷新或重新打开会话等重新挂载操作，助手消息会变成“每个流式块一行”的窄纵向布局，严重影响阅读体验。  
- **重要性**：该 bug 直接影响了部分通过 OpenAI 兼容接口接入第三方模型的用户，反映了 Kimi Code CLI 对非 Kimi 提供商的兼容性仍需增强。已有 1 条评论，说明有社区成员关注或补充信息。

### [#2608] 开源评测：K3 + Kimi Code 在样本外量化策略生成中的完整报告  
- **作者**：frank-quant  
- **状态**：Open | 更新于 2026-08-18 | 评论：0  
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2608  
- **摘要**：作者运营中文量化交易频道，在最新视频中使用 Kimi Code CLI 作为主要编程驱动。7 月 26 日第一期展示了 K3 + Kimi Code 从零编写基于 Freqtrade 的 ETH 永续合约策略，并设置了严格约束。作者将完整基准测试报告开源，供社区复现与验证。  
- **重要性**：这是 Kimi Code 在垂直金融领域的真实场景评测，既能帮助开发者了解其在复杂策略代码生成上的能力，也为量化从业者提供了可参考的实践案例。当前暂无评论，属新鲜发布。

## 重要 PR 进展
> 数据说明：过去 24 小时内更新/参与的 PR 共 2 个，全部列出。

### [#848] fix(kaos): log ssh failures when enabled（已关闭）  
- **作者**：powerfooI | 更新于 2026-08-18  
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/848  
- **摘要**：针对 `kaos` 功能，在启用相关选项时记录 SSH 失败日志的修复。PR 已关闭，可能已被合并或结案。  
- **重要性**：属于可观测性/调试体验的改进，有助于用户在 SSH 异常时更快定位问题。

### [#2606] Dev/knowledge plane（开放中）  
- **作者**：SoMiReMiReDo | 更新于 2026-08-18  
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2606  
- **摘要**：标题为“Dev/knowledge plane”，初步看是一个新的功能方向，可能涉及代码知识管理或开发上下文平面。PR 描述中引用了标准贡献指引，强调需先在 issue 中与维护者讨论确认，否则可能被关闭或忽略。  
- **重要性**：若成行，该功能有望增强 Kimi Code 对项目结构和既有代码知识的理解能力，是值得关注的前瞻性探索。

## 功能需求趋势
基于当前可见 Issue/PR 的样本（数据量有限，仅供参考）：

- **增强非 Kimi 模型的兼容性**：#2607 暴露出 Web UI 对 OpenAI 兼容 Providers 的渲染稳定性不足，说明用户对自定义模型接入的完成度有较高期待。
- **垂直场景事实基准（Benchmark）**：#2608 代表用户主动贡献真实场景评测的趋势，显示社区需要更多领域化的能力验证（如量化交易）。
- **知识平面 / 上下文管理**：#2606 暗示部分贡献者希望引入更高层的“知识平面”，提升 CLI 对复杂代码库的整体把控能力。
- **可观测性细节**：#848 的 SSH 日志修复表明，运维与调试相关的基础能力也是持续优化方向。

## 开发者关注点
- **Web UI 稳定性与切换体验**：渲染 bug 在重挂载/刷新时触发，说明前端状态管理仍需加固，自定义模型的 UI 适配不能只停留在流式直出。
- **专业场景的“开箱即用”可信度**：量化交易用户主动进行样本外评测，意味着开发者非常看重工具在严格条件下的真实产出质量，而非仅演示效果。
- **新功能讨论流程的严格性**：从 #2606 的提示可以看出，项目维护者鼓励先通过 issue 达成共识再提 PR，开发者提交大功能前应遵循社区讨论流程，避免被直接关闭。
- **基础诊断能力**：SSH 失败日志等修复虽小，却反映出用户在生产环境中会遇到需要可追踪、可排查的实际问题，这些细节影响长期使用满意度。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-19）

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在 **OpenCode Go 配额计费异常**与**基础设施稳定性**上。多条 issue 报告 Go 配额消耗与用量图表严重不一致，其中 `deepseek-v4-flash` 缓存因缓存读取归零导致配额在 20 分钟内被耗尽，引发广泛关注。PR 侧则由 opencode-agent 自动提交了 Qwen 采样参数修复，另有多个功能与修复正在推进。

---

## 社区热点 Issues（10 个精选）

1. **[#3787] Linear Agent 集成讨论**  
   评论 17 | 👍 34 | 已关闭  
   关于将 Linear Issues 直接分配给 Agent 的功能请求，讨论热度最高，社区对与项目管理工具深度集成有强烈诉求。  
   https://github.com/anomalyco/opencode/issues/3787

2. **[#42985] OpenCode Go 配额用量疑似为 DeepSeek V4 Flash 显示成本的 4 倍**  
   评论 15 | 👍 7 | 开放  
   用户发现同一天内用量图表显示 $3.31，但 Go 配额消耗却远高于此，疑似计量偏差。这是当日计费问题中讨论最激烈的一条。  
   https://github.com/anomalyco/opencode/issues/42985

3. **[#7648] 增加设置以阻止 TUI 流式输出时自动滚动**  
   评论 11 | 👍 18 | 已关闭  
   许多用户希望在 Agent 工作时阅读已有内容，但强制滚动影响阅读体验，社区对可配置滚动行为呼声较高。  
   https://github.com/anomalyco/opencode/issues/7648

4. **[#7226] 实现 /resume 与 /pause 命令**  
   评论 8 | 👍 28 | 已关闭  
   用户希望暂停任务后能显式恢复，而非依赖中断+手动提示词的方式，该功能请求获得的赞数很高。  
   https://github.com/anomalyco/opencode/issues/7226

5. **[#33495] Zen 余额未解除免费额度限制**  
   评论 7 | 开放  
   付费用户（余额 ≥$20）仍被 200 次/日的免费限额拦截并收到 429，直接影响付费用户使用，属于典型的计费逻辑 bug。  
   https://github.com/anomalyco/opencode/issues/33495

6. **[#42935] 缓存读取归零后 Go 配额在 20 分钟内耗尽**  
   评论 4 | 👍 3 | 开放  
   用户从 11% 配额开始，缓存命中降为 0，随后 20 分钟内消耗至 100%。缓存失效与配额计费联动异常，是成本飙升的典型案例。  
   https://github.com/anomalyco/opencode/issues/42935

7. **[#43303] 消息 ID 回绕导致新消息排序到旧消息之前，会话静默且回退时删除历史**  
   评论 2 | 开放  
   2026-08-14 11:19:55 起消息 ID 时钟回绕，导致新消息排序错乱。这是极其隐蔽但影响深远的数据完整性 bug，可能造成会话混乱甚至历史丢失。  
   https://github.com/anomalyco/opencode/issues/43303

8. **[#34737] 移动项目目录后，打开的仍是已删除的旧路径**  
   评论 5 | 开放  
   用户将项目从 C:\first_address 移动到 D:\second\address 后，重新打开仍指向旧路径。桌面端项目管理的一个明显缺陷。  
   https://github.com/anomalyco/opencode/issues/34737

9. **[#34473] OpenCode 随机停止响应**  
   评论 4 | 👍 3 | 开放  
   模型（big pickle）在思考或输出过程中随机中断，无报错即播放完成音。此类静默失败问题影响核心使用体验。  
   https://github.com/anomalyco/opencode/issues/34473

10. **[#42748] message.updated.1 重复序列化 summary.diffs 导致写入量呈二次方增长**  
    评论 3 | 开放  
    每次流式更新都写入完整消息快照，事件写入量随更新次数线性增长、总体呈二次方。这是数据库膨胀的根源之一。  
    https://github.com/anomalyco/opencode/issues/42748

---

## 重要 PR 进展（10 个精选）

1. **[#43310] fix(opencode): 移除 Qwen 采样默认值**  
   由 opencode-agent[bot] 提交，已关闭。停止强制为所有 Qwen 模型设置 `temperature: 0.55` 和 `top_p: 1`，改为交由 provider 或服务端默认处理。  
   https://github.com/anomalyco/opencode/pull/43310

2. **[#43309] feat(opencode): 生成的标题长度可配置**  
   开放。新增 `title_max_words` 配置项，可控制自动生成标题的最大字数，关闭 #43118。  
   https://github.com/anomalyco/opencode/pull/43309

3. **[#43308] fix(app): 将 prompt 拖拽状态限制为仅文件**  
   开放。忽略纯文本和链接拖拽，并在文件树拖拽上附加自定义 MIME 类型，避免误触发表单附件的拖拽高亮。  
   https://github.com/anomalyco/opencode/pull/43308

4. **[#37684] feat(mcp): 将运行时添加的 MCP 工具桥接到核心工具注册表**  
   已关闭。修复运行时 MCP 功能在主用户提示路径上不可用的 bug，弥补两个独立 MCP 服务之间的断裂。  
   https://github.com/anomalyco/opencode/pull/37684

5. **[#37678] feat(session): 通过 PromptInput 和 agent 配置暴露 toolChoice**  
   已关闭。修复内部 LLM 层已支持但用户无法配置 toolChoice 的问题，同时关闭 #32465 并接续 #32521 的工作。  
   https://github.com/anomalyco/opencode/pull/37678

6. **[#37669] fix(core): 恢复格式错误的工具输入**  
   已关闭。将 malformed 工具参数表示为不可执行的 `tool-input-error`，提供协议级安全反馈，让模型可以自我修复。  
   https://github.com/anomalyco/opencode/pull/37669

7. **[#37668] feat(tui): V2 TUI 增加服务器切换器**  
   已关闭。新增 `<leader>w` 服务器选择器、客户端注册表和远程端点校验，切换时完全重挂载 provider 树，防止状态泄漏。  
   https://github.com/anomalyco/opencode/pull/37668

8. **[#37634] fix(mcp): 排空 stderr 管道、限制并发、带退避重试**  
   已关闭。针对 Windows 上 stdio MCP 服务器 `-32000: Connection closed` 问题做了三项修复，提升连接稳定性。  
   https://github.com/anomalyco/opencode/pull/37634

9. **[#37625] fix(provider): 为 Kimi 工具 schema 提供兼容层**  
   已关闭。将 Kimi 工具 schema 投射到模型无关的兼容层，避免单个自定义/MCP 工具 schema 不兼容导致整个请求被拒绝。  
   https://github.com/anomalyco/opencode/pull/37625

10. **[#37624] fix: 在重放历史中跳过空推理步骤**  
    已关闭。修复 Kimi K3 在 OpenCode Go 上因历史重放包含空 reasoning 片段导致的 400 错误，是 #37552 的后续修复。  
    https://github.com/anomalyco/opencode/pull/37624

---

## 功能需求趋势

- **计费与配额透明度**：大量 issue（#42985、#43023、#42935、#33495、#43208、#40031、#39891、#43149、#41391）集中反映 Go 配额消耗百分比与实际美元消费对不上、Zen 余额未解除免费限制、缓存失效导致成本飙升等问题，社区对准确、可解释的计费系统需求迫切。
- **会话控制与恢复**：围绕 `/resume` `/pause` 命令（#7226）、TUI 防滚动（#7648）、会话卡死无法恢复（#43277）的讨论表明，用户希望获得更细粒度的会话生命周期控制。
- **性能与存储优化**：事件表完整快照写入导致数据库膨胀（#41175、#42748）、上下文缓存因切换模式/压缩而失效（#37489），用户对本地存储占用和响应性能越发敏感。
- **模型与提供商兼容性**：Gemini 对 nullable union 的 schema 拒绝（#34130）、Kimi/Qwen 采样参数硬编码（#37625/#37624/#43310）等，说明社区需要更通用的模型适配层，而非基于模型名打补丁。
- **桌面与 Web UI 体验**：项目路径迁移后失效（#34737）、Web UI V2 控件重叠（#43295）、相同 remote URL 导致项目合并（#42315）等桌面端问题，反映出对项目管理与多项目工作流的更高要求。
- **新集成为方向**：Linear Agent 集成（#3787）、Mermaid 非标记代码块检测（#43304）、i18n 国际化（#43307）等新功能需求体现了用户对生态扩展的兴趣。

---

## 开发者关注点

- **计费数据不透明**：多条 issue 显示 Go 配额百分比与 Usage History 美元金额无法对账，开发者无法判断单次请求的真实成本，影响对共享配额的使用信心。
- **会话稳定性问题**：随机停止响应（#34473）、会话永久卡死且重启无法恢复（#43277），这类问题严重影响日常开发流程，属于最高优先级的稳定性隐患。
- **数据库膨胀与写放大**：事件表在流式更新时反复写入完整消息快照（#41175/#42748），本地 `.db` 文件可达数 GB，社区已有工具但官方修复仍未落地。
- **配置项不生效**：如 `agent.compaction.variant` 被忽略（#41578）、Zen 余额未解除限额（#33495）、`chat.params` 插件被模型名硬编码覆盖（#42775），开发者对配置系统的可控性期待更高。
- **自动化清理可能误伤 PR**：本次数据中大量 PR 被 `automated-pr-cleanup` 标记关闭，其中包含 #37684、#37678 等实质性功能修复。建议贡献者关注自己的 PR 是否被机器人误关，必要时重新打开并补充关联 issue。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-19

> 数据来源：[github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)（Issue/PR 均跳转至 earendil-works/pi）

## 今日速览

昨日（8月18日）社区活跃度极高，Issue 和 PR 合计更新超 70 条。核心焦点集中在三方面：**上下文压缩机制存在多处触发缺陷**（#6339、#8328 等），影响长会话稳定性；**TUI 长会话渲染问题集中爆发**（#8281、#8309 等），界面闪屏与跳转成为高频痛点；同时**扩展系统增强需求**（#8317、#8292 等）涌现，社区对 Agent 生命周期钩子与消息持久化前拦截的诉求明显。PR 方面，多个关键修复已提交，包括 Copilot 登录限流、Anthropic 回退计价修正和缓存友好压缩等。

## 社区热点 Issues

精选 10 个当前最值得关注的 Issue，覆盖核心机制缺陷、体验问题和扩展需求。

### 1. 自动压缩阈值在 Agent 运行期间从不评估（#6339）
- **链接**：https://github.com/earendil-works/pi/issues/6339
- **作者**：josephkimani | **评论**：3 | **状态**：已关闭（无操作）
- **重要性**：`compaction.reserveTokens` 本应在上下文超过阈值时主动压缩，但实际上只在 run 边界检查。单个 agentic run 中上下文可能无限增长，直至超出模型窗口。这是上下文管理的核心缺陷，影响所有长任务场景。

### 2. 零 usage 提供者永不触发阈值压缩（#8328）
- **链接**：https://github.com/earendil-works/pi/issues/8328
- **作者**：ischindl | **评论**：1 | **状态**：已关闭
- **重要性**：当 OpenAI 兼容提供者不返回 `usage` 块时，`_checkCompaction` 中阈值分支直接跳过，导致自动压缩完全失效。与 #6339 同属压缩机制缺陷，但根因不同，影响使用本地或非标准模型的用户。

### 3. TUI 长会话闪屏：全屏清除与重绘（#8281）
- **链接**：https://github.com/earendil-works/pi/issues/8281
- **作者**：wlynxg | **评论**：4 | **状态**：已关闭
- **重要性**：交互模式下，当会话超过约 1 万行，可视区上方任何内容变化都会导致全屏闪屏。这是今日评论最多的 bug 之一，直接影响长会话用户的日常体验。

### 4. 长对话中界面每次执行命令都跳回顶部（#8309）
- **链接**：https://github.com/earendil-works/pi/issues/8309
- **作者**：AVCaleb | **评论**：2 | **状态**：已关闭
- **重要性**：用户报告在 Windows 和 macOS 双平台上，长会话中每次新命令都会导致视口跳转到顶部再跳回。与 #8281 同为 TUI 渲染层问题，社区关注度高，作者称"被此问题困扰很久"。

### 5. GitHub Enterprise Copilot 登录被自身限流失效（#8251）
- **链接**：https://github.com/earendil-works/pi/issues/8251
- **作者**：harry2206 | **评论**：4 | **状态**：已关闭
- **重要性**：设备流登录成功后，0.84.0/0.84.1 中 `enableAllGitHubCopilotModels()` 通过 `Promise.all` 并发发送多个 policy 请求，触发 HTTP 429 导致整个登录失效。企业用户受影响大，已有对应 PR #8254 修复。

### 6. OpenAI 客户端构建未指定超时，本地模型 10 分钟被切断（#8323）
- **链接**：https://github.com/earendil-works/pi/issues/8323
- **作者**：mvdbos | **评论**：2 | **状态**：已关闭
- **重要性**：`createClient` 未设置 `timeout`，回退到 OpenAI SDK 的 600 秒默认值。本地长思考模型（超过 10 分钟）会在输出中途被切断。对本地推理场景是阻塞级问题，另两个相关 Issue（#8321、#8322）同批提出。

### 7. Windows 下 find 扫描巨型目录直接卡死（#8282）
- **链接**：https://github.com/earendil-works/pi/issues/8282
- **作者**：qq458249269 | **评论**：2 | **状态**：已关闭
- **重要性**：扫描如 `C:\Windows` 这类海量文件目录时，`find.exe` 持续占用 CPU 20 分钟无输出。用户建议默认改用 `fd` 替代 `find`，对 Windows 用户的生产效率影响显著。

### 8. 提议新增 agent_recovery_exhausted 扩展钩子（#8317）
- **链接**：https://github.com/earendil-works/pi/issues/8317
- **作者**：josevelaz | **评论**：2 | **状态**：已关闭
- **重要性**：当原生重试与溢出压缩重试都耗尽时，扩展无法介入切换模型继续会话。作者已给出实现，对应 PR #8316 已提交。反映社区对扩展机制深度介入 Agent 生命周期的强烈需求。

### 9. 双进程共享会话文件，导致分支发散与跨窗口投递（#8300）
- **链接**：https://github.com/earendil-works/pi/issues/8300
- **作者**：wangjianming | **评论**：1 | **状态**：已关闭
- **重要性**：没有进程级锁或使用中检测时，两个 `pi` 进程可同时写同一个 JSONL 会话文件，造成数据损坏、分支发散及跨窗口消息串扰。属于数据安全类问题，需要架构级修复。

### 10. Anthropic 回退使用量按请求模型计价，成本计算错误（#8285）
- **链接**：https://github.com/earendil-works/pi/issues/8285
- **作者**：yearth | **评论**：1 | **状态**：开放中
- **重要性**：服务端回退返回 `claude-opus-4-8` 时，`anthropic-messages.ts` 仍用请求时的 `claude-fable-5` 计算成本，费用统计失真。已有 PR #8308 被 revert，新 PR #8319 重新修复中。

## 重要 PR 进展

以下 10 个 PR 体现了社区当前最活跃的修复与功能开发方向。

### 1. 修复 Copilot 策略登录限流（#8254）
- **链接**：https://github.com/earendil-works/pi/pull/8254
- **作者**：rwachtler | **状态**：开放 | **关联**：修复 #7850
- **内容**：先获取账户模型目录再更新策略；只更新已知且支持工具、**未配置**的模型；对限流请求做有限重试。这是在 #8251 暴露问题后最直接的修复方案。

### 2. 正确修复 Anthropic 回退使用量计价（#8319）
- **链接**：https://github.com/earendil-works/pi/pull/8319
- **作者**：cristinaponcela | **状态**：开放 | **关联**：#8285
- **内容**：吸取 #8308 被 revert 的教训，通过线程化传递 usage 成本数据而不是错误使用模型目录。针对回退后成本按错误模型计算的精准修复。

### 3. 缓存友好型压缩（#8307）
- **链接**：https://github.com/earendil-works/pi/pull/8307
- **作者**：vegarsti | **状态**：开放
- **内容**：将压缩请求追加到主会话中以复用当前会话缓存，替代独立压缩请求，大幅降低压缩开销。目前仅启用自动压缩路径，对长期运行的 Agent 任务成本优化潜力大。

### 4. 新增 agent_recovery_exhausted 扩展钩子（#8316）
- **链接**：https://github.com/earendil-works/pi/pull/8316
- **作者**：josevelaz | **状态**：已关闭 | **关联**：#8317
- **内容**：在原生重试与溢出压缩重试耗尽后、`agent_settled` 之前触发新钩子，允许扩展返回 `{ retry: true }` 切换模型继续当前会话。扩展系统重要能力补全。

### 5. 修复 Bedrock 加密推理内容往返（#8314）
- **链接**：https://github.com/earendil-works/pi/pull/8314
- **作者**：seiji | **状态**：已关闭 | **关联**：#8315
- **内容**：`bedrock-converse-stream.ts` 之前只处理 `reasoningContent.text` 和 `signature`，现在补充对 `redactedContent`（加密推理内容）的传递支持，修复 OpenAI 模型在 Bedrock 上的推理展示。

### 6. 泛化 OpenAI Completions 思考 token 预算字段（#8275）
- **链接**：https://github.com/earendil-works/pi/pull/8275
- **作者**：bnsd55 | **状态**：已关闭
- **内容**：将 `thinking_token_budget` 限制能力从 vLLM 扩展到 Qwen/SGLang（`thinking_budget`）和 llama.cpp（`thinking_budget_tokens`），统一各推理后端的思考长度控制。

### 7. 折叠工具结果时隐藏图像（#8303）
- **链接**：https://github.com/earendil-works/pi/pull/8303
- **作者**：rudolf | **状态**：已关闭 | **关联**：#8304
- **内容**：修复折叠状态下 Kitty/iTerm 图像仍被渲染的问题：折叠时不再挂载 Image 组件，展开后才显示，同时避免不支持图像终端的空白占位。

### 8. 新增 disabledCommands 设置（#8326）
- **链接**：https://github.com/earendil-works/pi/pull/8326
- **作者**：kapkema | **状态**：已关闭 | **关联**：#8325
- **内容**：允许用户和组织禁用内置斜杠命令（如 `/share`、`/export`），禁用后不显示在自动补全中并提示错误。从安全角度防止 `/share` 意外上传完整会话转录到 GitHub Gist。

### 9. /login 流程支持 OpenAI 兼容 API 提供商（#8320）
- **链接**：https://github.com/earendil-works/pi/pull/8320
- **作者**：iamshakibali | **状态**：已关闭
- **内容**：在 `/login` 选择器中新增两个合成条目，引导用户输入 base URL、模型名和 API key 并自动生成 `models.json`（默认 128k 上下文、16k 最大 token）。降低自定义端点接入门槛。（注：#8324 为同主题重复 PR）

### 10. 修复重试与压缩后的连续性问题（#8283）
- **链接**：https://github.com/earendil-works/pi/pull/8283
- **作者**：pablasso | **状态**：开放
- **内容**：修复 recovery 流程中的边界情况：临时错误触发重试且重试也被截断时，压缩会话后首条消息意外丢失，导致 Agent 无法继续。直接影响长时间运行任务的稳定性。

## 功能需求趋势

从近 24 小时 Issue 中提炼出 5 个最受关注的功能方向：

1. **扩展钩子与生命周期机制完善** 多数扩展相关需求（#8317 `agent_recovery_exhausted`、#8292 持久化前消息替换钩子、#8289 暴露 VirtualTerminal 测试入口）表明社区正将 Pi 视为可编程 Agent 平台，对深度介入 Agent 会话生命周期有明确需要。

2. **上下文压缩与内存管理优化** #6339、#8328 直接暴露压缩触发条件缺陷，#8301 提出在 prompt 队列中支持 `/compact` 交错执行，PR #8307 则从缓存角度降低压缩成本。上下文管理是当前最受关注的核心机制方向。

3. **TUI 渲染性能与交互体验** 闪屏（#8281）、视口跳转（#8309）、图像渲染错误（#8306、#8304）等集中反馈表明，长会话下的终端 UI 已成为重要瓶颈，需要从根本上优化渲染调度与增量更新。

4. **新模型提供商支持** 包括百度千帆（#8288，OpenAI 兼容端点，区分 API 计费与个人 Token 计划）、Amazon Bedrock Mantle（#6216、#8302，支持 GPT 系列模型），以及 `/login` 流程中的通用 OpenAI 兼容端点（#8320），反映出用户对国内提供商和 Bedrock 新 API surface 的接入需求。

5. **配置安全与进程隔离** `disabledCommands` 设置（#8325）和会话文件进程锁（#8300）体现安全与数据一致性意识提升。用户希望控制敏感命令（`/share`）防止隐私泄露，并要求进程级会话独占。

## 开发者关注点

高频痛点与技术诉求如下：

- **超时配置缺失**：OpenAI 客户端未暴露超时设置，10 分钟以上本地思考被硬切断（#8323），且 `streamSimple` 丢失 `timeoutMs`（#8321）——本地模型用户受影响最大。
- **Windows 平台性能问题**：npm 安装包 13k+ 文件在 Defender 扫描下冷启动 3.2s（#8299），`find` 扫描大目录直接卡死（#8282）——用户建议默认以 `fd` 替代 `find`。
- **压缩机制不可靠**：阈值评估仅限 run 边界（#6339）、零 usage 提供者完全不触发（#8328）、prompt 队列中无法穿插 `/compact`（#8301），共同导致长会话中上下文失控。
- **网络与 API 路径一致性**：远程 Ollama 在非回环网络下静默失败（#8286）、部分 API 路径未发送 `pi` User-Agent（#8305），以及 openai-codex 瞬时错误被当作终止错误（#8138），均影响生产环境可靠性。
- **成本核算准确性**：Anthropic 服务端回退时按请求模型计价（#8285），以及 `isRecoverableLength` 在恰好达到 `max_output_tokens` 时误判不可恢复（#8322），直接影响费用统计与自动恢复逻辑。
- **会话安全与数据一致性**：双进程并发写同一会话 JSONL 文件导致分支发散（#8300）；扩展加载失败时同名工具名静默回退到内置实现（#8311）；BOM 导致 package.json 解析失败且无任何告警（#8310）——数据安全与失败可见性需加强。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-19

## 1. 今日速览

- 夜间版 **v0.21.11-nightly.20260818** 发布，新增 live-session registry 与 `qwen sessions ps` 命令，多会话管理能力进一步增强。
- **多智能体协作**成为社区讨论焦点：#9276 团队成员消息被误判为关闭请求、#9430 背景执行开关失效等问题集中涌现。
- 全量基准验证 **dsw-eas-full-20260818-r3** 完成 SWE-bench Verified 500 案例 + Terminal-Bench 2.0 89 案例的端到端测试，为 v0.21.13 提供关键质量参考。

---

## 2. 版本发布

### v0.21.11-nightly.20260818.259951c53e

- **feat(core)**：新增 live-session registry 与 `qwen sessions ps` 命令（[#8969](https://github.com/QwenLM/qwen-code/pull/8969)），支持查看活跃会话状态。
- **feat(daemon)**：技能切换（skill-togg…，内容截断）。

### Benchmark / 验证发布

| 发布 | 说明 | 状态 |
|---|---|---|
| dsw-eas-full-20260818-r3 | SWE-bench Verified 500 + Terminal-Bench 2.0 89 全量端到端验证，结果写回 | ✅ **SUCCEEDED** |
| dsw-eas-tb-smoke-20260818-r2 | 端到端凭据刷新冒烟：1 个 SWE-bench + 1 个 Terminal-Bench | ✅ **SUCCEEDED** |
| dsw-eas-full-20260818-r1/r2 | 全量 500 + 89 案例验证 | ⚠️ **QUARANTINED** |
| dsw-eas-tb-smoke-20260818-r1 | 瞬时 Sandbox 恢复冒烟测试 | 结果未明确 |

---

## 3. 社区热点 Issues

### 1. [#656](https://github.com/QwenLM/qwen-code/issues/656) — [P1] 所有请求均报 API Error 400
- **状态**：OPEN | 评论 11 | 创建于 2025-09，仍在活跃更新
- **详情**：用户所有消息/请求均返回 `InternalError.Algo.InvalidParameter`（400），持续 12–16 小时，无任何配置变更，编码会话中途突然开始。同类问题还出现在 [#3145](https://github.com/QwenLM/qwen-code/issues/3145)（内容安全误报）。
- **社区反应**：长期未闭环的 P1 问题，已积累大量讨论。

### 2. [#9194](https://github.com/QwenLM/qwen-code/issues/9194) — [P3] 测试固定（test-pin）缺口关闭
- **状态**：OPEN | 评论 11
- **详情**：PR #9096 审查第 5–6 轮发现：若干测试存在"突变即绿"的问题——生产代码变更后测试套件依然通过，需加固测试契约。
- **社区反应**：反映社区对 CI 测试质量的严格要求。

### 3. [#8718](https://github.com/QwenLM/qwen-code/issues/8718) — [P2] RFC：多会话原生协调
- **状态**：CLOSED | 评论 10
- **详情**：提出为多个独立 Qwen Code 会话增加协调路径：leader 可派发 2–3 个 worker，同时保持交互、观察运行状态并收集结构化结果。
- **社区反应**：与 #8724、#9276 共同构成多智能体系列讨论。

### 4. [#8316](https://github.com/QwenLM/qwen-code/issues/8316) — Ctrl+C 取消后 prompt 未恢复
- **状态**：CLOSED | 评论 10
- **详情**：用户取消 prompt 后，输入框不恢复已输入的提示内容，用户无法修改重发，只能重新输入。
- **社区反应**：属于高频交互痛点，获 welcome-pr 标记。

### 5. [#7040](https://github.com/QwenLM/qwen-code/issues/7040) — [P2] RFC：可靠的自动记忆召回
- **状态**：OPEN | 评论 10
- **详情**：跟踪自动记忆召回的时序、质量与遥测，内含 PR 状态表（#7393 已合并、#8716 审查中）。
- **社区反应**：社区对上下文性能与记忆可靠性持续关注。

### 6. [#9276](https://github.com/QwenLM/qwen-code/issues/9276) — [P2] 团队成员无法向 leader 发送普通消息
- **状态**：OPEN | 评论 7
- **详情**：团队成员发送状态/完成消息时，被误判为 shutdown 请求并报错：`Only the team leader can request shutdowns.`
- **社区反应**：多智能体协作核心通信缺陷，讨论升温中。

### 7. [#6806](https://github.com/QwenLM/qwen-code/issues/6806) — [P2] /compress 后状态行使用率不刷新
- **状态**：CLOSED | 评论 7 | welcome-pr
- **详情**：执行 `/compress` 或 `/compress-fast` 后，底部状态行的 context 用量百分比仍显示压缩前的数值，直到下一次模型请求完成才更新。
- **社区反应**：典型的 UI 反馈不及时问题，影响用户对上下文管理的判断。

### 8. [#8724](https://github.com/QwenLM/qwen-code/issues/8724) — 跨会话消息传递
- **状态**：OPEN | 评论 6
- **详情**：同一台机器上的多个 Qwen Code 会话可通过 `list_agents` 发现、`send_message` 定向发送，接收端需显式门控（fail-closed）。
- **社区反应**：与 #8718 呼应，推动多会话通信协议。

### 9. [#7427](https://github.com/QwenLM/qwen-code/issues/7427) — [P2] web-shell artifact 面板刷新失败
- **状态**：CLOSED | 评论 6
- **详情**：`qwen serve` Web Shell 中 artifact 面板自动刷新时，频繁弹出 `Load artifacts failed: Failed to fetch`。
- **社区反应**：前端渲染与自动刷新机制的稳定性问题。

### 10. [#9125](https://github.com/QwenLM/qwen-code/issues/9125) — [P2] 增加 flakiness gate：变更测试重复运行 N 次
- **状态**：CLOSED | 评论 5
- **详情**：源自 PR #9086 的阻断性问题——`utimesSync` 断言约 50% 概率失败。建议在 sandbox 中重复运行变更测试 N 次来识别 flaky 测试。
- **社区反应**：社区对 CI 稳定性与测试可靠性的高要求。

---

## 4. 重要 PR 进展

### 1. [#8978](https://github.com/QwenLM/qwen-code/pull/8978) — `qwen serve --channel all` 空通道优雅处理
- **功能**：通道集为空时不再 `exit(1)` 拖垮 daemon，改为优雅 no-op 并仅恢复活跃通道。
- **类型**：review/self-reported | 更新：08-18

### 2. [#9297](https://github.com/QwenLM/qwen-code/pull/9297) — autofix BLOCKED handoff 成为一等结果
- **功能**：growth brake 触发时，round 输出契约此前只接受 `address-summary.md` / `no-action.md`，导致 BLOCKED handoff 被误判为"缺少输出文件"。本 PR 将其定义为正式 round 结果。
- **类型**：autofix/takeover | 更新：08-18

### 3. [#9347](https://github.com/QwenLM/qwen-code/pull/9347) — DingTalk 引用消息媒体附件
- **功能**：DingTalk 渠道可从被回复的消息中下载媒体（图片作为 image data，文件/音频/视频走临时文件路径）并附加到当前 prompt。
- **类型**：autofix/takeover | 更新：08-18

### 4. [#9392](https://github.com/QwenLM/qwen-code/pull/9392) — channel worker 支持访问 TLS daemon
- **功能**：配置 `--tls-cert/--tls-key` 后，daemon 向 channel worker 下发 `https://` 回环地址，worker 启动验证接受 https，解决 TLS 场景下 channel 无法连接的问题。
- **类型**：普通 PR | 更新：08-18

### 5. [#9332](https://github.com/QwenLM/qwen-code/pull/9332) — review 单跳 import 扩展合入 `fetch-pr --since`
- **功能**：将 #9188 的 rescope 逻辑（612 行命令 + 728 行测试）重构并入 `fetch-pr --since` 机制，删除独立子命令。
- **类型**：autofix/takeover | 更新：08-18

### 6. [#9262](https://github.com/QwenLM/qwen-code/pull/9262) — 增长预算超支改为审计模式
- **功能**：团队超支时不再冷停止，而是自动审查 diff 增长原因、定位增长热点并生成文件清单，让失败路径仍产出可执行信息。
- **类型**：autofix/takeover | 更新：08-18

### 7. [#9406](https://github.com/QwenLM/qwen-code/pull/9406) — headless daemon 隐藏 workspace Browse 按钮
- **功能**：daemon 广播条件化 serve 能力，Web Shell 原生目录选择器（osascript/PowerShell/zenity）在无头主机上不再显示，避免无效交互。
- **类型**：review/self-reported | 更新：08-18

### 8. [#8927](https://github.com/QwenLM/qwen-code/pull/8927) — sessionRotation：限制会话生命周期
- **功能**：新增按 channel 的 `sessionRotation` 选项，支持 `maxTurns` 和 `maxDuration` 两种边界。超过边界后，下一条消息自动开启新会话。
- **类型**：review/self-reported + autofix/needs-human | 更新：08-18

### 9. [#9092](https://github.com/QwenLM/qwen-code/pull/9092) — 从磁盘状态恢复中断的 PR 审查
- **功能**：`fetch-pr` 增加 `--resume`：解析历史报告、校验 worktree 与 diff 哈希，从上次中断位置恢复审查流程。
- **类型**：autofix/takeover + needs-human | 更新：08-18

### 10. [#9370](https://github.com/QwenLM/qwen-code/pull/9370) — 修复 macOS / Windows CI 触发条件
- **功能**：合并队列触发之外，新增平台敏感性分类器和 nightly 触发，macOS/Windows 测试失败不再"沉默"。
- **类型**：autofix/takeover | 更新：08-18

---

## 5. 功能需求趋势

### 多智能体协作（最热门方向）
- 团队消息传递修复（[#9276](https://github.com/QwenLM/qwen-code/issues/9276)）、跨会话消息（[#8724](https://github.com/QwenLM/qwen-code/issues/8724)）
- `run_in_background: false` 语义修正（[#9430](https://github.com/QwenLM/qwen-code/issues/9430)）、`list_agents` 结果歧义（[#9431](https://github.com/QwenLM/qwen-code/issues/9431)）
- 新增 Cursor SDK 子代理建议（[#9428](https://github.com/QwenLM/qwen-code/issues/9428)）

### 会话生命周期管理
- prompt 恢复（[#8316](https://github.com/QwenLM/qwen-code/issues/8316)）、Windows 会话自动删除（[#8400](https://github.com/QwenLM/qwen-code/issues/8400)）
- sessionRotation 生命周期限制（[#8927](https://github.com/QwenLM/qwen-code/pull/8927)）、分页游标重复（[#9419](https://github.com/QwenLM/qwen-code/issues/9419)）

### 自动化审查 / CI 质量
- 测试加固（[#9194](https://github.com/QwenLM/qwen-code/issues/9194)）、flakiness gate（[#9125](https://github.com/QwenLM/qwen-code/issues/9125)）
- review 收敛建议（[#9278](https://github.com/QwenLM/qwen-code/issues/9278)）、恢复审查（[#9092](https://github.com/QwenLM/qwen-code/pull/9092)）

### UI / Web Shell 统一
- 聊天面板跨端统一（[#5883](https://github.com/QwenLM/qwen-code/issues/5883)）、对话导出契约（[#9354](https://github.com/QwenLM/qwen-code/issues/9354)）
- Electron 内嵌浏览器面板（[#9412](https://github.com/QwenLM/qwen-code/issues/9412)）

---

## 6. 开发者关注点

- **API 错误持续性痛点**：`#656` 持续 12–16 小时的全量 400 错误、`#3145` 的内容安全误报，均对开发流程造成阻断性影响，且修复周期长。
- **会话数据安全**：`#8400` 桌面版重启后静默删除所有会话，无任何确认，用户对数据信心受影响。
- **团队协作通信缺陷**：成员消息被误判为 shutdown（`#9276`）、后台标志失效（`#9430`）、agent 列表歧义（`#9431`），说明多智能体功能仍处早期阶段。
- **上下文管理反馈不一致**：`#6806` 压缩后状态行不刷新，影响用户判断上下文预算。
- **文件权限不可配置**：`#9250` 新文件硬编码 0600、忽略 umask，对需要共享文件的工作流不友好。
- **桌面端稳定性**：Windows 平台会话加载失败路径导致数据丢失，平台差异问题需要更多测试覆盖（`#9370`）。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-19

## 今日速览

CodeWhale v0.9.9 正式发布，npm 包从遗留的 `deepseek-tui` 正式切换为 `codewhale`；EPIC-005 TUI 架构分解与中文文档本地化持续推进。社区反馈焦点集中在发布流程自动化（npm trusted publishing）、连续循环执行需求，以及 Windows 下 TUI 状态指示器回归问题。

---

## 版本发布

### CodeWhale v0.9.9
- **Codewhale 品牌正式确立**：Shannon Labs 的公开产品统一使用 `codewhale` 命名；遗留 npm 包 `deepseek-tui` 已弃用，不再接收后续更新。
- **修复内容**：
  - 窄终端（<60 列）紧凑行指标显示问题（#5486）
  - rustdoc 注释中裸 URL 导致的文档 lint 报错（#5489）
- **变更**：稳定并发相关逻辑；同步了根/TUI 仓库的 CHANGELOG 与贡献者名单。
- [查看 v0.9.9 Release](https://github.com/Hmbown/CodeWhale/releases)

---

## 社区热点 Issues

### 1. [EPIC] CodeWhale TUI Crate 分解（#5316）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5316  
大型架构重构的顶层跟踪 Issue，聚合所有子 EPIC 与 FEAT。评论数最高（7 条），反映社区对 TUI 模块化拆分的高度关注。

### 2. Web 字典功能收尾：移除所有 `isZh` 分支（#5337）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5337  
继续推进 #4934 建立的 i18n 字典路线，将 docs/hooks、troubleshooting 等页面剩余的中英文三元表达式迁移到统一字典。收到 5 条评论，表明社区对统一 i18n 架构的认可。

### 3. [Feature] 连续循环执行模式（#5508）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5508  
AI 编排场景下需要“无限 turn 直到用户中断”的执行模式，用于多智能体协调与持续任务循环。3 条评论，开发者在现有单 turn 基础上探索更高效循环方案。

### 4. npm 发布迁移到 Trusted Publishing（#5299）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5299  
v0.9.5 的 GitHub/GHCR/Homebrew/CNB 以及 20 个 Cargo crate 已全自动发布，唯独 npm 包仍需维护者浏览器登录 + 2FA 认证，工作站凭据过期导致发布被阻塞。3 条评论，是发布自动化的关键瓶颈。

### 5. [Bug] `/new` 后系统提示符丢失（#5505，已关闭）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5505  
新会话中模型完全收不到系统提示词，仅收到首条 `context_update` 折叠后的摘要行，严重干扰项目指令传递。已关闭，但属于高影响回归问题。

### 6. [Bug] 状态指示器在 0.9.7+ 不再渲染（#5512）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5512  
Windows 11 + Windows Terminal + PowerShell 7.6 环境下，`status_indicator`（cw / whale / dots / off）自 0.9.7 起完全不显示，0.8.64 时代正常。影响 Windows 用户的基础 TUI 体验。

### 7. [Bug] Durable 任务可能无限占用 Worker（#5497）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5497  
当运行时永不发出 `turn.completed` 或忽略取消时，`EngineTaskExecutor` 每 40ms 轮询直到终态；取消只调用一次 `interrupt_turn` 然后无限等待。需要 Grace Period 与强制终止机制。

### 8. [Doc] 中文文档本地化 EPIC（#5482）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5482  
大量 `docs/` 文档仅英文，中文用户阅读门槛高；机器翻译含错误且部分源文档已过期。社区中文用户基础持续扩大，本地化需求强烈。

### 9. [CI] 为发布候选与工件工作流增加超时限制（#5496）
**链接**：https://github.com/Hmbown/CodeWhale/issues/5496  
#5495 为 `ci.yml` 所有作业添加 timeout-minutes，但 `release-candidate.yml`、`release-artifacts.yml` 及 `release.yml` 大部分作业仍无超时保护，存在 runner 卡死风险。

---

## 重要 PR 进展

### 1. [已合并] v0.9.9 正式发布 PR（#5499）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5499  
完成 v0.9.9 收尾，同步根/TUI CHANGELOG，更新公共贡献者名单。

### 2. TUI 头部显示仓库上下文（#5511）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5511  
支持普通检出与 linked worktree 的仓库/分支标识，ahead/behind 计数持续可见，长仓库名自动截断。

### 3. 恢复 `/title` 为独立终端窗口标题（#5509）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5509  
修复 `/title` 与 `/rename` 合并后窗口标题行为一致的问题，使 `/title` 重新作为独立命令控制终端标题。

### 4. 命令上下文适配器与迁移门 FEAT-015（#5506）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5506  
为安全提取 slash 命令构建 TUI 依赖注入与迁移基建，零生产命令组迁移，保留现有 `&mut App` 执行语义。

### 5. SSE UTF-8 跨 HTTP/2 DATA 分割时 Fail-Closed（#5404）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5404  
修复 macOS 上 DeepSeek Flash 流式输出的乱码（U+FFFD / CJK）：HTTP/2 DATA 可将多字节字符拆分到多个分片，原逻辑用 `String::from_utf8_lossy` 导致解码错误，现改为严格解码。

### 6. 可配置模型可见读取/工具结果预算（#5405）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5405  
自托管长上下文 DeepSeek V4 用户可调高 `read`（默认 50 KiB）、`read_file`（16 KiB）和工具结果字面量上限，减少大文件场景下的额外读取次数。

### 7. 执行前持久化审批结果（#5491）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5491  
审批请求与终态结果在会话日志中先持久化再执行；无法持久化时拒绝执行，恢复会话时可重建已关闭/中断的审批状态。

### 8. 中文文档 Tier 1 本地化（#5507）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5507  
将中文译文迁移至 `docs/zh_hans/` 专属目录，重构多语言文档树，为后续 Tier 2 铺路。

### 9. CI 作业全部增加 timeout-minutes（#5495）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5495  
为 `ci.yml` 十个作业设置超时上限，避免 runner 死掉后卡住 GitHub 默认 360 分钟的 required gate（#5492 Lint 作业曾真实卡住）。

### 10. 恢复 README Star History 图表（#5510）
**链接**：https://github.com/Hmbown/CodeWhale/pull/5510  
由于 GitHub 限制第三方访问 star 数据，README 底部的 star history 图表被移除；该 PR 试图恢复，让访客继续直观看到项目增长曲线。

---

## 功能需求趋势

- **持续/无限执行模式**：多智能体编排需要无限 turn 直到中断（#5508）。
- **中文本地化推进**：文档中文化（#5482）与 Web 字典统一（#5337）双线并行。
- **TUI 模块化架构**：EPIC-005 crate 分解及命令上下文适配器（#5506）为后续功能安全迁移做准备。
- **发布与 CI 自动化**：npm trusted publishing（#5299）和全链路 job 超时约束（#5496）成为发布可靠性关键。
- **可配置性增强**：自动路由器分类器超时、模型可见上下文预算等均可配置化（#5494、#5405）。

---

## 开发者关注点

- **npm 发布自动化受阻**：浏览器登录 + 2FA 仍是发布链路上唯一人工环节，凭据过期进一步放大问题（#5299）。
- **Windows 平台回归**：状态指示器等 UI 在 Windows 11 + Windows Terminal 下自 0.9.7 起失效（#5512）。
- **上下文完整性风险**：`/new` 后系统提示词丢失会直接导致模型无视项目指令（#5505）。
- **任务可靠性焦虑**：durable 执行在极端情况下可无限占用 worker，社区期望有强制的 grace-period 终止能力（#5497）。
- **文档语言门槛**：英文-only 文档对快速增长的中文用户群构成实际沟通成本，且部分源文档已过期（#5482）。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/FrontierMindLab/agents-radar) 自动生成。*