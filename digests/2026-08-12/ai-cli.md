# AI CLI 工具社区动态日报 2026-08-12

> 生成时间: 2026-08-12 04:07 UTC | 覆盖工具: 10 个

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

# AI CLI 工具横向对比分析报告（2026-08-12）

## 1. 生态全景

当前 AI CLI 工具已从“单点代码生成”全面转向“持久化 Agent 工作流”之争，各家在子代理稳定性、会话恢复、成本透明三个维度展开正面竞争。头部厂商（Claude Code、OpenAI Codex、Gemini CLI）以每日 1-6 个版本高频迭代，同时社区对安全拦截误伤、Windows 平台适配、计费异常等“体验欠账”的投诉密度显著上升。值得注意的是，除官方阵营外，OpenCode、Pi、DeepSeek TUI 等开源/独立项目正以更开放的 Provider 生态和更激进的 TUI 创新快速争夺开发者心智，MCP 与第三方模型接入已成为全行业默认基线能力。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Release | 重点 Issue 数 | 活跃 PR 数 | 核心热度信号 |
|---|---|---|---|---|
| **Claude Code** | 1（v2.1.228） | 10（含 3 个新报严重 Bug） | 10 | CVP 安全拦截 #84352 单日 64 评论，社区争议最大 |
| **OpenAI Codex** | 3（rust-v0.148.0-alpha.7/.8/.9） | 10 | 10 | Linux 桌面版 #11023 达 952 👍/208 评论（已关闭）；Windows Browser Use 全线受阻 |
| **Gemini CLI** | 4（v0.56.0-nightly、v0.56.0-preview.1、v0.55.1、v0.55.0-preview.3） | 10（含 2 个 P1） | 10（含 2 个 CRITICAL CVE 修复） | 子代理 MAX_TURNS 误报 #22323 为 P1 级信任危机 |
| **GitHub Copilot CLI** | 0（v1.0.79） | 10 | 3 | Windows 插件更新失败 #4095 获 14 👍，居社区之首 |
| **Kimi Code CLI** | 0 | 2 | 8（7 个已关闭） | 跨会话记忆 #1283 累计 34 评论，长期未关闭 |
| **OpenCode** | 0 | 10（当日共 50 个活跃） | 10 | #14187 获 27 👍；子代理绕过 deny 规则 #32024 为安全漏洞 |
| **Pi** | 0 | 10 | 10 | 登录限流、Mac CPU 高占用（8👍）最为集中 |
| **Qwen Code** | 6（stable + preview + nightly + desktop + live-host + smoke） | 10 | 10 | 多端同步发布，WebShell 平台化趋势明显 |
| **DeepSeek TUI** | 0（v0.9.5 回归受关注） | 10 | 5 | Auto-Review 误拦截 #5323 发布当日即被确认 |
| **Grok Build** | 0 | 0 | 0 | 过去 24h 无活动 |

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具及具体诉求 |
|---|---|
| **会话持久化与跨会话记忆** | Kimi Code（#1283 Memory System）、Claude Code（#59248 静默删会话需恢复机制）、Qwen Code（#8678 大 session restore 超时保护）、Pi（session JSONL v3/v4 版本不兼容）、Gemini CLI（Auto Memory 低信号会话无限重试） |
| **子代理/异步任务可靠性** | Gemini CLI（#22323 误报成功、#21409 挂起）、Claude Code（#85265 误杀 600s 长任务、#86000 Bash 挂起）、OpenCode（#12716 推理循环无法捕获、#17169 失败无限重试致费用飙高）——这是今日全行业最大的信任痛点 |
| **成本透明与计费治理** | Claude Code（#85937 禁用自动充值仍扣费、#85992 配额异常耗尽）、OpenCode（#17169 单次子代理 $15+ 费用失控）、Pi（#7982 流式 usage 保留、#7981 cost tiers 统一映射）、Copilot CLI（#4432 模型静默覆盖导致意外扣费） |
| **权限规则一致性与安全拦截** | OpenCode（#32024 子代理绕过 deny 规则）、Claude Code（CVP 批准组织仍被拦截#84352、子代理信任继承#85982）、Gemini CLI（#22093 子代理绕过禁用配置、变量展开绕过 #28691、SSRF 修复 #28557）、Qwen Code（#8687 跨 worktree Git 防护） |
| **Windows 平台适配** | OpenAI Codex（app-server `os error 3` 系列）、Copilot CLI（#4095/#4151 插件安装/更新 100% 失败）、Qwen Code（#8644 盘符冒号 URL 编码）、OpenCode（#41931 Windows 反斜杠路径刷新失败）、Pi（#7947 Windows CMD 输出刷屏）——跨全行业的系统性短板 |
| **工具 Schema 简化与调用健壮性** | DeepSeek TUI（#5324 简化 32 字段 agent schema）、Pi（#7836 模糊匹配白空格、#7978 参数规范化）、Claude Code（#85806 误报抑制）——模型对复杂工具定义的不适配已开始反向驱动设计简化 |

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线与生态特征 | 目标用户 |
|---|---|---|---|
| **Claude Code** | Anthropic 官方旗舰，插件/hook 生态最成熟，强调安全合规与企业级特性 | Node/TS 技术栈，深度绑定 Claude 模型与 CVP 合规体系；当前安全护栏的“过度防御”正在侵蚀可用性 | 已建立 Claude 工作流的中大型团队，重视插件生态 |
| **OpenAI Codex** | 以 ChatGPT Desktop + Remote Control 打通多端远程工作流，桌面/移动/CLI 三端协同 | Rust 重写推进中（连续 3 个 alpha/日），app-server 架构承载 Browser Use/远程控制；Windows 端是该架构当前最大短板 | OpenAI 订阅用户、远程/多设备切换的开发者 |
| **Gemini CLI** | 模型能力与企业级安全并重，Google Cloud（Vertex AI）深度集成，本地模型接入开放度高 | TypeScript/Node，日更 nightly + 快速安全响应；SGLang/OpenAI 兼容本地端点（#28681）打开自托管空间 | Gemini/Vertex AI 用户、强合规要求的企业 |
| **GitHub Copilot CLI** | GitHub 生态的延伸，多模型（Claude/GPT/Gemini）集中入口，依赖 Copilot 订阅体系 | 跟随 GitHub Copilot 平台节奏，无独立发布；当前最受制于平台侧策略变更 | GitHub 重度用户、企业 Copilot 订阅者 |
| **Kimi Code CLI** | Moonshot AI 的轻量对话型 CLI，Python/ACP 架构 | 无频繁发版，重心转向稳定性加固（assert 替换、竞态修复）；产品级缺口是记忆系统与交互细粒度 | 中文开发者、Moonshot 生态用户 |
| **OpenCode** | 开源社区驱动的通用型 CLI，多 Provider + TUI 体验创新，V2 桌面版启动 | 50 个活跃 Issue 彰显高参与度；“任务循环→费用失控”问题是其快速增长期的典型阵痛 | 追求开源可控、多模型自由切换的开发者 |
| **Pi** | 独立开发者（badlogic）项目，追求极致 TUI 体验与最广泛的 Provider 覆盖 | 多 Provider、多协议（Codex WebSocket/SSE/OpenAI 兼容）、跨平台细节打磨深入；社区规模中等但反馈质量高 | TUI 极客、多模型/多网关重度用户 |
| **Qwen Code** | 阿里系全栈 AI 开发平台，CLI/桌面/live-host 多渠道同步发力，WebShell 平台化最具差异化 | WebShell 动态工作流可视化、tmux 交互式子代理、会话轮换（sessionRotation）等 daemon 级能力领先；日发 6 版本节奏最快 | 云端/远程开发团队、阿里云基础设施用户 |
| **DeepSeek TUI** | DeepSeek 社区的深度终端定制派，界面布局与交互打磨激进 | 刚进入模块化重构（EPIC-005 crate 拆分），同时暴露 v0.9.5 回归；Schema 简化主张切中行业共性痛点 | DeepSeek 用户、追求终端效率的进阶开发者 |

---

## 5. 社区热度与成熟度

- **Claude Code**：社区体量最大、争议最激烈。问题集中在安全策略误伤（64 评论）、数据丢失风险和计费信任，符合“最广泛使用必然最多投诉”的头部效应；成熟度最高但口碑承压。
- **OpenAI Codex**：处于激进的重写与生态扩张期，3 个 alpha/日证明迭代强度；但 Linux 桌面版 952 👍 的强烈诉求被关闭，叠加 Windows 大面积故障，说明官方资源正高度集中在 Rust 重写与桌面协同上。
- **Gemini CLI**：发布节奏最紧凑，安全响应最快（2 个 CRITICAL CVE 当日修复）；但 P1 级 Agent 稳定性问题持续发酵，需尽快修复信任缺口。
- **OpenCode**：开源阵营中社区活跃度最高（50 个 Issue/日），10 个 PR 同时推进，V2 桌面版标志着从“社区玩具”向“正式产品”跃迁；费用失控与权限漏洞是需要优先处理的成长烦恼。
- **Qwen Code**：多端同步发版（6 个）在行业中最激进，快速抢占云端开发场景；但长任务稳定性、headless 退出码等“自动化可信度”问题若不及早解决，会制约企业落地。
- **Kimi Code / Grok Build**：前者处于功能打磨的低活跃期，后者暂无社区投入迹象；两者暂不构成主流竞争变量。

---

## 6. 值得关注的趋势信号

1. **子代理的“假成功”正在成为全行业信任危机**。Gemini（MAX_TURNS 误报 success）、Qwen（headless 错误包装为成功）、Claude（任务被误杀）几乎同时出现“报告状态与真实结果不一致”的 P1/P0 类问题。对开发者而言，凡涉自动化流水线，应主动为 CLI 输出增加独立的二次校验（如 git 状态、测试结果断言），不能信任 Agent 的自述状态。

2. **成本可预测性需求从“软性抱怨”升级为“硬性门槛”**。Claude Code 的自动扣费、OpenCode 的循环费用失控、Pi 的 usage 流式缺失共同表明：缺乏配额熔断与用量实时可视化的工具，将很快被企业采购者排除。开发者选用工具时，应将“费用上限控制”与“可审计 usage 日志”列入必选清单。

3. **安全策略的“宁杀勿纵”正在伤害正常用户**。Claude Code 拦截 CVP 已批准组织、OpenCode 子代理绕过 deny 规则，一正一反揭示同一问题：安全分类器仍无法理解上下文边界。行业需要向“策略分层 + 子代理继承 + 动态豁免”演进，而非简单的全局拦截。

4. **Windows 是第三方组件生态的永久阵痛**。Codex（路径失效）、Copilot CLI（文件锁）、Qwen（URL 编码）、OpenCode（反斜杠刷新）四家同日出现不同根因的 Windows 故障，说明这不是个别厂商问题，而是 AI CLI 的进程管理、文件监听与终端交互在 Windows 权限模型下的系统性工程欠账。Windows 开发者需对工具链故障有预案。

5. **工具 Schema 复杂度正在反噬模型成功率**。DeepSeek TUI 主动提出“简化 32 字段 schema”，Pi 同步优化模糊匹配——这标志着行业从“功能堆叠”转向“模型友好度优先”。设计 Agent 工具时，保持单意图、少字段、强校验的 Schema 将成为共识。

6. **开源/独立项目正以“Provider 中立”策略抢占多模型用户**。OpenCode、Pi、DeepSeek TUI 均以“不绑定官方模型”为核心卖点，Gemini 也开始支持本地端点。对开发者意味着：将工具与模型解耦，可有效规避单一厂商的策略变更与计费风险。

---

*数据来源：各工具 GitHub 仓库公开 Issue/PR/Release，统计区间 2026-08-11 ~ 2026-08-12。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止 2026-08-12 | 来源: github.com/anthropics/skills**

> 说明：本次抓取的 50 条 PR 均为 Open 状态（无 merged/draft），且 PR 评论数字段缺失。以下热度排序综合考量 Issue 交叉引用量、同问题 PR 数量、更新活跃度与社区反馈（👍/评论数）。

---

## 一、热门 Skills 排行

### 1. skill-creator 评估链路修复（run_eval 0% recall bug 家族）⭐ 热度第一
社区最痛的问题：`run_eval.py` 在所有查询下均报告 `recall=0%`，导致 skill 描述优化循环"对着噪声优化"，完全失效。关联 Issue #556（12 评论、7👍，10+ 独立复现）与 #1169，并催生 **4 个修复 PR** 从不同角度围攻：

- **#1298**（MartinCajiao）：最全面的修复——将评估产物安装为真实 skill、修复 Windows 流读取/触发检测/并行 worker。更新至 06-23。
- **#1323**（Polluelo978）：修复触发检测 misses 真实 skill 名、遇到首个非 Skill 工具即退出。
- **#1099**（joshuawowk）：修复 Windows 子进程管道读取崩溃（WinError 10038）。
- **#1050**（gstreet-ops）：修复 Windows 下 `claude.cmd` PATHEXT 解析与编码 bug。
- 状态：全部 **Open**。这是当前生态最核心的工程债，合并优先级最高。
- 链接：[#1298](https://github.com/anthropics/skills/pull/1298) | [#1323](https://github.com/anthropics/skills/pull/1323) | [#1099](https://github.com/anthropics/skills/pull/1099) | [#1050](https://github.com/anthropics/skills/pull/1050)

### 2. #514 document-typography（文档排版质量控制）
- 功能：自动检测 AI 生成文档的排版缺陷——孤立词换行（1-6 词溢出到下一行）、标题滞留页底（widow）、编号错位。
- 社区焦点："每个 Claude 生成的文档都会受影响"，但用户极少主动要求排版质量，讨论围绕按需触发还是默认后处理。
- 状态：**Open**（03-04 创建，03-13 最后更新）。
- 链接: https://github.com/anthropics/skills/pull/514

### 3. #723 testing-patterns（测试模式全集）
- 功能：覆盖完整测试栈——Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、边界条件与"不该测什么"。
- 社区焦点：对 Claude 生成测试的要求从"能跑"升维到"有方法论"，与 #210 frontend-design 的"可执行性"改进诉求同源。
- 状态：**Open**（03-22 创建，04-21 更新）。
- 链接: https://github.com/anthropics/skills/pull/723

### 4. #486 ODT skill（OpenDocument 格式支持）
- 功能：创建/填充/读取 `.odt`、`.ods`，支持 ODT→HTML 转换，触发词覆盖 ODT/ODS/ODF/LibreOffice。
- 社区焦点：docx/pdf 之后对开源文档格式的支持呼声上升，企业用户重点关切模板填充场景。
- 状态：**Open**（03-01 创建，04-14 更新）。
- 链接: https://github.com/anthropics/skills/pull/486

### 5. #1367 self-audit（交付前自审计质量门）
- 功能：Step 0 机械文件验证（每个声明产物必须存在）＋四维推理质量审计（按损害严重度排序），宣称与项目/技术栈/模型无关。
- 社区焦点：与 Issue #1385（三闸门质量管线提案）同作者，讨论聚焦"交付前检查"是否应成为官方推荐实践。
- 状态：**Open**（06-28 创建，已迭代至 v1.3.0）。
- 链接: https://github.com/anthropics/skills/pull/1367

### 6. #525 pyxel（复古游戏开发）
- 功能：为 pyxel-mcp 添加 skill，覆盖"写代码→运行截图→检查→迭代"闭环，支持像素风/8-bit 游戏。
- 社区焦点：MCP + Skill 结合的游戏开发工作流样板；作者 kitao 即 Pyxel 引擎作者本人，背书质量强，7-15 仍在更新。
- 状态：**Open**。
- 链接: https://github.com/anthropics/skills/pull/525

### 7. #83 skill-quality-analyzer + skill-security-analyzer（元技能）
- 功能：两个 meta skills——质量分析器（结构/文档 20%、示例、资源等五维评分）＋安全分析器。
- 社区焦点：与 #492 安全议题形成呼应，社区开始自发建设"skill 审查"工具对抗冒名/恶意 skill。
- 状态：**Open**（2025-11 创建，讨论周期长）。
- 链接: https://github.com/anthropics/skills/pull/83

> 补充：Lubrsy706 的 #538（pdf 大小写引用修复）、#541（docx 修订 w:id 冲突导致文档损坏）、#539（skill-creator YAML 未加引号校验）属同类"官方 skill 细节质量"工程修复，关注度稳定。

---

## 二、社区需求趋势（来自 Issues）

| 趋势方向 | 代表 Issue | 热度信号 |
|---|---|---|
| **安全与信任治理** | [#492](https://github.com/anthropics/skills/issues/492) 社区 skill 冒用 `anthropic/` 命名空间，构成信任边界滥用，可诱导用户对冒名官方 skill 授权 | **43 评论（全场最高）**，讨论持续至 07-20 |
| **企业级分发与协作** | [#228](https://github.com/anthropics/skills/issues/228) 组织级 skill 共享库/分享链接，替代下载-传输-手动上传；[#189](https://github.com/anthropics/skills/issues/189) 两个插件安装重复 skill 撑爆上下文 | #228 获 8👍；#189 获 **9👍（全场最高赞）** |
| **skill 开发工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556) run_eval 全面失灵；[#202](https://github.com/anthropics/skills/issues/202) skill-creator 文档化口吻、低 token 效率、命名违规 | #556 12 评论 7👍；#202 已关闭但 8 评论 |
| **AI 代理治理与质量门** | [#412](https://github.com/anthropics/skills/issues/412) agent-governance（策略执行/威胁检测/信任评分/审计）；[#1385](https://github.com/anthropics/skills/issues/1385) 三闸门管线（预任务校准→对抗审查→交付验证） | 新方向，提案者持续活跃 |
| **上下文经济性** | [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` skill 单次注入 ~156k tokens 直接打爆上下文；[#1329](https://github.com/anthropics/skills/issues/1329) compact-memory 符号化状态存储 | 均为 2026-06 后新提案 |
| **平台扩展与协议开放** | [#29](https://github.com/anthropics/skills/issues/29) AWS Bedrock 支持；[#16](https://github.com/anthropics/skills/issues/16) 将 Skills 暴露为 MCP 协议接口 | 长期诉求，讨论稳定 |

**一句话概括需求趋势**：社区不再满足于"更多 skill"，而是集中要求——**安全可信的分发机制、企业级共享协作、可靠的 skill 开发评估工具，以及代理场景下的治理与质量控制**。

---

## 三、高潜力待合并 Skills

以下 PR 讨论活跃、解决真实痛点，预计近期落地概率较高：

| 优先级 | PR | 内容 | 潜力依据 |
|---|---|---|---|
| 🔴 P0 | [#1298](https://github.com/anthropics/skills/pull/1298) | run_eval 全面修复（artifact 真安装 + Windows + 触发 + 并行） | 阻塞整个 skill-creator 优化环路，4 PR 围攻同一 bug，官方合并该 PR 即可一揽子收口 |
| 🟠 P1 | [#514](https://github.com/anthropics/skills/pull/514) | document-typography 排版质量后处理 | 通用短板，与 docx/pdf/odt 天然互补 |
| 🟠 P1 | [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns 测试方法论全集 | 契合"生成可靠代码"核心诉求，体系完整 |
| 🟠 P1 | [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit 交付前机械+推理双检 | 踩中质量与安全双热点，已迭代 v1.3.0 |
| 🟡 P2 | [#486](https://github.com/anthropics/skills/pull/486) | ODT skill 读写转换 + 模板填充 | 补全文档格式矩阵，企业 LibreOffice 刚需 |
| 🟡 P2 | [#1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene 规划产物生命周期管理 | 直击"planning artifacts 无限堆积"，解决 #1417 |
| 🟡 P2 | [#525](https://github.com/anthropics/skills/pull/525) | pyxel 复古游戏开发 + MCP 闭环 | 作者即引擎作者，长期维护（更新至 07-15） |
| 🟢 P3 | [#83](https://github.com/anthropics/skills/pull/83) | skill 质量/安全双分析器（meta） | 呼应 #492 治理需求，或将被官方安全审查方向吸收 |

---

## 四、Skills 生态洞察

**一句话总结**：社区最集中的诉求是"从堆量转向提质"——官方 skill-creator 工具链的可靠性缺陷（run_eval 0% recall bug 群被 4 个 PR + 2 个 Issue 反复围攻）与 skill 信任边界危机（43 评论的 #492 命名空间冒用）构成当前生态两大焦点，社区希望官方优先补齐**可靠的 skill 开发/评估工具、严格的安全命名空间治理与企业级分发机制**。

---

# Claude Code 社区动态日报 — 2026-08-12

## 今日速览
- **v2.1.228 发布**：修复交互式会话重绘中断、Windows 下 Git 路径检测失败及 `/tui` 回退问题。
- **CVP 安全拦截争议升温**：已获 Cyber Verification Program 批准的组织仍被 Claude Code 安全护栏拦截（#84352），单日评论 64 条，成社区焦点。
- **多起严重新 Bug 上报**：macOS 上 Bash 工具无限挂起（#86000）、异步任务 600 秒被误杀（#85265）、账户遭自动扣费（#85937）等引发广泛讨论。

## 版本发布
### [v2.1.228](https://github.com/anthropics/claude-code/releases)
- 修复罕见的内部布局错误导致交互式会话完全停止重绘、但进程仍在运行的问题。
- 修复 Windows 上从 Git 安装目录的父文件夹启动 Claude Code 时，无法找到 `git` / Git Bash 的问题。
- 修复 `/tui` 回退功能异常。

## 社区热点 Issues
1. **[CVP 批准组织仍遭 cyber safeguard 截拦](https://github.com/anthropics/claude-code/issues/84352)** | 评论 64 · 👍 8
   已获 Cyber Verification Program 批准的组织在 Claude Code 中仍频繁被安全护栏拦截，验证门户状态诡异回退为“Under review”。安全审批状态一致性受质疑，影响面大。

2. **[静默保留清理删除会话记录，无警告/opt-in/恢复机制](https://github.com/anthropics/claude-code/issues/59248)** | 评论 31 · 👍 18
   用户丢失工作区内全部 Claude Code 会话记录且无法恢复，标记 `data-loss`。涉及数据安全底线，社区要求引入确认与恢复流程。

3. **[Claude Desktop MSIX: CIG + 供应商签名 vk_swiftshader.dll 致 GPU 进程崩溃](https://github.com/anthropics/claude-code/issues/81341)** | 评论 15 · 👍 2
   MicrosoftSignedOnly 环境下每次浏览器预览均触发崩溃（0x060C201E），影响桌面端所有浏览器预览相关操作。

4. **[Windows 下 Ctrl+C / Ctrl+Shift+C 静默清空提示输入](https://github.com/anthropics/claude-code/issues/59408)** | 评论 14 · 👍 10
   无确认、无恢复，误触即丢失已输入内容。用户对 TUI 输入安全性和撤销机制提出明确诉求。

5. **[Feature: 进入/恢复现有 worktrees、可配置分支命名、hook 移除控制](https://github.com/anthropics/claude-code/issues/31969)** | 评论 8 · 👍 31
   高赞功能请求。插件作者需要更完善的 worktree 生命周期管理，以支撑跨 2-10+ 会话的长期特性开发流程。

6. **[BUG: 所有 Bash 工具命令无限期挂起 (macOS, v2.1.228)](https://github.com/anthropics/claude-code/issues/86000)** | 新上报
   无子进程被生成，所有 Bash 命令直接挂死。若为 v2.1.228 回归，影响面极大，需紧急排查。

7. **[异步代理停滞看门狗 600 秒误杀健康长任务](https://github.com/anthropics/claude-code/issues/85265)** | 新上报
   当模型首 token 时间超过 `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` 时任务被判失败，但实际工作仍在进行。对推理型长任务不友好。

8. **[Billing: Auto-reload 已禁用仍完成两次自动充值 ($99.08)](https://github.com/anthropics/claude-code/issues/85937)** | 新上报
   用户明确关闭 Auto-reload 却仍被扣费。已有多个历史相关 issue（#14857、#25647、#68773），计费系统可靠性遭质疑。

9. **[Ultrareview PR 模式：私有仓库失败却消耗免费运行次数](https://github.com/anthropics/claude-code/issues/85993)** | 新上报
   显示“Cloned repository ✓”后报 `Session initialization failed`，且消耗免费额度。成本与体验双重受损，涉及 `/code-review ultra` 核心功能。

10. **[5 小时会话限制在几分钟内耗尽（轻量任务）](https://github.com/anthropics/claude-code/issues/85992)** | 新上报
    执行轻量文档编辑任务却快速耗尽 5 小时配额，使用量统计疑似异常。涉及 Linux + VSCode 场景。

## 重要 PR 进展
1. **[fix(hookify): 从祖先 .claude 目录加载规则以防静默绕过](https://github.com/anthropics/claude-code/pull/85716)** | 修复 #85613
   解决 hookify 插件无法加载上层 `.claude` 目录安全规则导致的静默失败，避免安全策略被意外绕过。

2. **[fix(skills): plugin-dev 与 hookify 技能改用规范名称](https://github.com/anthropics/claude-code/pull/85243)** 
   修复 8 个内置技能 `name` 字段包含空格且大小写不规范的问题，减少工具链兼容性与校验问题。

3. **[fix(security-guidance): 文档中跳过 XSS 警告](https://github.com/anthropics/claude-code/pull/85806)** 
   复用 `_DOC_EXTS` 路径过滤器，仅在文档中提及 XSS 模式时抑制误报；对可执行源码保留警告，并补充回归测试。

4. **[fix(commit-commands): clean_gone 改用 `git branch -vv` 检测 [gone] 分支](https://github.com/anthropics/claude-code/pull/70173)**（已关闭）
   修复 `/clean_gone` 因 `git branch -v` 格式检测缺陷而从未删除任何失效分支的问题。

5. **[Scope child_process_exec 到 JS/TS 文件（修复 Python 误报）](https://github.com/anthropics/claude-code/pull/57888)**（已关闭）
   将 `child_process_exec` 规则精确匹配到 JS/TS 中的 `child_process.exec()`，避免误伤 Python 的 `asyncio.create_subprocess_exec`。

6. **[docs: 将剩余过时文档链接指向 code.claude.com](https://github.com/anthropics/claude-code/pull/85925)** 
   清理 plugins、plugin skills/agents/commands 及 issue 模板中指向旧域名（docs.claude.com）的链接，统一至 code.claude.com。

7. **[docs: 修复插件和示例中的过时文档链接与 README 漂移](https://github.com/anthropics/claude-code/pull/85822)** 
   文档纯清理：hooks 链接、plugins 链接等均经重定向验证后更新至新文档地址。

8. **[fix: HackerOne Bug Bounty 计划访问问题](https://github.com/anthropics/claude-code/pull/85834)** 
   调整 devcontainer.json 参数，确保 hookify 插件正确安装，恢复 HackerOne 赏金计划正常访问。

9. **[examples: 添加 MEP（Meat Puppet Elimination Protocol）异步状态中继](https://github.com/anthropics/claude-code/pull/42996)** 
   零新增基础设施的多机/多会话状态中继模式。解决切换机器或恢复会话时上下文丢失的问题，三文件即可落地。

10. **[补充缺失的 source 引用](https://github.com/anthropics/claude-code/pull/41611)** 
   为 Claude Code 补全缺失的 source 信息，具体改动待维护者进一步说明。

## 功能需求趋势
- **Worktree / 分支管理深化**：进入/恢复现有 worktrees（[#31969](https://github.com/anthropics/claude-code/issues/31969)）、遵循 CLAUDE.md 分支命名约定（[#85998](https://github.com/anthropics/claude-code/issues/85998)）、桌面端显示当前分支和工作树（[#85997](https://github.com/anthropics/claude-code/issues/85997)）——多会话并行开发的基础设施正成为关注重点。
- **粒度化成本控制**：为特定任务预留配额百分比（[#81554](https://github.com/anthropics/claude-code/issues/81554)）、自动充值熔断与配额统计纠偏（[#85937](https://github.com/anthropics/claude-code/issues/85937)、[#85992](https://github.com/anthropics/claude-code/issues/85992)、[#85993](https://github.com/anthropics/claude-code/issues/85993)）——用户对费用可预测性需求强烈。
- **终端协议兼容性（Windows）**：Shift+Enter 不插入新行（[#77311](https://github.com/anthropics/claude-code/issues/77311)、[#80817](https://github.com/anthropics/claude-code/issues/80817)）持续被报，社区呼吁引入 Win32 输入支持以突破协议限制。
- **权限/安全分类器可信度**：子代理继承父级分类器信任不可靠（[#85982](https://github.com/anthropics/claude-code/issues/85982)）、安全护栏误报（[#85991](https://github.com/anthropics/claude-code/issues/85991)、[#84352](https://github.com/anthropics/claude-code/issues/84352)）——沙盒与安全策略在提升安全性的同时正伤害正常可用性。
- **会话持久化与一致性**：静默删除会话记录（[#59248](https://github.com/anthropics/claude-code/issues/59248)）、`gitStatus` 语义跨进程重启不一致（[#85995](https://github.com/anthropics/claude-code/issues/85995)）——会话状态透明性、可恢复性是高频诉求。

## 开发者关注点
- **数据安全与防丢**：静默清理会话记录（#59248）、Ctrl+C 清空输入（#59408）均存在不可逆损失风险，开发者强烈要求 opt-in 与恢复机制。
- **安全策略误伤**：CVP 用户被无差别拦截（#84352）、子代理信任继承不稳定（#85982）、XSS 规则误报（PR #85806）——安全机制需更精细的上下文感知，避免“宁杀勿纵”。
- **任务执行可靠性**：异步任务 600 秒被误杀（#85265）、Bash 工具无限挂起（#86000）、Chrome 扩展导航被永久阻止（#85999）——基础执行链路的稳定性出现多起回归迹象。
- **成本透明与熔断**：Auto-reload 被绕过导致自动扣费（#85937）、免费运行额度被无效任务消耗（#85993）、5 小时配额跳变（#85992）——计费系统需要更清晰的配额计算呈现与异常熔断机制。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-12

## 📌 今日速览

今日社区焦点集中在 **Windows 平台 Browser Use / app-server 的持续故障**（“os error 3”路径不存在类问题已有多条高赞 Issue），同时 **Linux 桌面版需求**（#11023，952 👍）虽有 208 条评论但已关闭，社区呼声依然极高。代码侧，过去 24 小时密集推送了 3 个 rust v0.148.0-alpha 版本（.7/.8/.9），并有多项 MCP/TUI/沙箱相关的 PR 合并。

---

## 🚀 版本发布

过去 24 小时发布了 3 个快速迭代的 alpha 版本，均未包含详细的变更说明，推测为代码冻结前的内部验证构建：

- [`rust-v0.148.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.9)
- [`rust-v0.148.0-alpha.8`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.8)
- [`rust-v0.148.0-alpha.7`](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.7)

---

## 🔥 社区热点 Issues（精选 10 条）

### 1. Linux 桌面版呼声：已关闭但需求强烈
**[#11023 Codex desktop app for Linux](https://github.com/openai/codex/issues/11023)** — *CLOSED, 208 评论, 952 👍*  
创建于 2 月的 Linux 桌面版请求今日仍有大量互动。用户因 macOS 端功耗问题（#10432）希望迁移至 Linux 桌面，社区需求量极大，建议官方正式回应后续规划。

### 2. Windows 平台 Browser Use 外部导航全面受阻（最高赞 open bug）
**[#19187 Windows Browser Use external navigation fails because nodeRepl.fetch cannot start codex app-server](https://github.com/openai/codex/issues/19187)** — *OPEN, 14 评论, 22 👍*  
Windows 上 Browser Use 插件可连接应用内浏览器，但所有外部导航操作在启动 app-server 辅助进程时失败。属于 4 月底集中爆发的 Windows 路径问题的代表性 Issue。

### 3. Windows 10 上 Browser Use 完全不可用
**[#19450 Browser Use / in-app browser fails to start app-server on Windows 10](https://github.com/openai/codex/issues/19450)** — *OPEN, 6 评论, 13 👍*  
在 Windows 10 Enterprise 上，应用内浏览器集成完全无法使用，同样报 `os error 3`。问题持续将近 4 个月仍未解决，多个 Issue 相互印证。

### 4. macOS 远程控制回归：桌面与移动端线程冲突
**[#37403 Desktop cannot resume Remote Control / CLI thread: already has an active writer](https://github.com/openai/codex/issues/37403)** — *OPEN, 11 评论, 9 👍*  
8 月 7 日 ChatGPT Desktop 更新后，桌面端无法恢复由移动端 Remote Control 发起的 CLI 线程，报错 `already has an active writer`。影响“离线远程控制-白天桌面继续”的工作流，属近期回归。

### 5. Windows 上 Chrome 插件安装失败
**[#21674 Chrome plugin shows "Install failed" in Codex UI](https://github.com/openai/codex/issues/21674)** — *OPEN, 4 评论, 8 👍*  
Codex UI 中 Chrome 插件卡片显示“Install failed”，即使 Chrome 浏览器、扩展均已正常安装。Windows 上插件发现机制与真实环境不一致。

### 6. Windows 应用内浏览器命令停止工作
**[#23222 In-app browser commands stopped working](https://github.com/openai/codex/issues/23222)** — *OPEN, 9 评论, 3 👍*  
应用内浏览器手动可用，但 Codex 通过命令控制（导航、DOM 读取等）失败。配合 #19187 等，Windows 上 Browser Use 整体处于不可用状态。

### 7. Chrome 扩展显示 Disconnected 但设置显示 Connected
**[#21741 Chrome extension stays Disconnected on Windows pt-BR](https://github.com/openai/codex/issues/21741)** — *OPEN, 8 评论, 5 👍*  
Chrome 扩展与 Codex Desktop 的连接状态在两端显示不一致（扩展侧 Disconnected / App 设置侧 Connected），定位与网络环境（pt-BR）相关，并疑似与 Windows 原生消息主机有关。

### 8. 自动更新后 MCP 路径失效
**[#26011 config.toml MCP paths stale after auto-update — node_repl fails with os error 3](https://github.com/openai/codex/issues/26011)** — *OPEN, 9 评论, 4 👍*  
Windows 自动更新后，`config.toml` 中记录的旧 bin 路径失效，导致 `node_repl` MCP 服务器启动失败。与多个 `app-server` 路径类问题本质相同：**更新路径未同步**。

### 9. 子代理卡片卡在 UI 上
**[#23930 Codex app subagent cards can remain stuck/visible after close](https://github.com/openai/codex/issues/23930)** — *OPEN, 17 评论, 4 👍*  
macOS 桌面端已关闭/完成的子代理卡片长时间停留在 UI 上，尽管 close/readback 已确认没有活跃 agent。属 UI 状态同步 bug。

### 10. CLI 非交互模式日志噪音：重复“file update:”
**[#6511 repeated "file update:" in non-interactive mode](https://github.com/openai/codex/issues/6511)** — *OPEN, 6 评论, 5 👍*  
在非交互模式下（Mac/Linux/Docker 均复现），日志不断输出 `file update:`。影响 CI 集成的日志可读性，社区呼吁增加日志级别控制。

---

## 🔧 重要 PR 进展（精选 10 条）

### 1. MCP 工具调用纳入统一审批流程
**[#38108 Route MCP tool calls through shared approval handling](https://github.com/openai/codex/pull/38108)** — *CLOSED*  
将 MCP 工具调用建模为审批动作，统一走会话级审批流（权限钩子、审查人选择、拒绝处理、结果遥测）。

### 2. MCP 调用在 TUI 历史中免克隆渲染
**[#38103 Avoid cloning MCP invocations in TUI history](https://github.com/openai/codex/pull/38103)** — *CLOSED*  
优化 MCP 调用在 TUI 历史单元格中的渲染，改为借用引用而非克隆，减少内存与 CPU 开销。

### 3. 文件上传附带宿主应用上下文
**[#38101 Attach hosted app context to file uploads](https://github.com/openai/codex/pull/38101)** — *CLOSED*  
文件创建请求中附带 connector ID、action 名称和模型信息，并利用服务端返回值优化文件大小解析。

### 4. MCP OAuth 注册支持 CIMD
**[#38089 Add CIMD support to MCP OAuth registration](https://github.com/openai/codex/pull/38089)** — *CLOSED*  
当授权服务器支持公共客户端且 Codex 使用本机 loopback 回调时，优先使用客户端 ID 元数据文档（CIMD）进行 OAuth 注册。

### 5. gRPC code-mode 会话接入共享 HTTP 客户端
**[#38087 Route gRPC code-mode sessions through the shared HTTP client](https://github.com/openai/codex/pull/38087)** — *CLOSED*  
gRPC code-mode 连接改用 `HttpClientFactory` 构建 URL 基础连接，以支持出站代理与自定义 CA 配置，并拒绝不支持的协议端点。

### 6. Windows 沙箱支持嵌套 Git 仓库
**[#38080 Allow nested Git repositories in the Windows sandbox](https://github.com/openai/codex/pull/38080)** — *CLOSED*  
修复 Windows 沙箱中以沙箱用户运行命令时，Git 拒绝主用户仓库的问题。将 worktree 根目录及其 `/*` 通配符纳入 Git 信任范围。

### 7. TUI 历史按渲染宽度换行
**[#38075 Respect rendered width when adding TUI history](https://github.com/openai/codex/pull/38075)** — *CLOSED*  
新聊天组件以当前终端宽度初始化，历史可见性判定同时考虑“环境宠物”预留宽度与渲染模式；diff 摘要饱和度上限同步修正。

### 8. 跟踪隐式执行器技能调用
**[#38074 Track implicit executor skill invocations](https://github.com/openai/codex/pull/38074)** — *CLOSED*  
检测 executor 拥有的技能文档读取与脚本执行，仅在活跃执行环境中匹配技能，同时保留宿主侧对本地命令的技能检测，并输出对应分析事件。

### 9. gRPC code-mode 回调转发至会话委托
**[#38072 Forward gRPC code-mode callbacks to session delegates](https://github.com/openai/codex/pull/38072)** — *CLOSED*  
每个 gRPC code-mode 会话订阅嵌套工具调用，将通知回调转发给会话委托，并在宿主办侧完成结果截断与错误处理。

### 10. Windows 沙箱授予 Codex 应用根目录访问权限
**[#38064 Grant Windows sandbox access to the Codex app root](https://github.com/openai/codex/pull/38064)** — *CLOSED*  
将沙箱读/执行 ACL 应用到本地 Codex 应用根目录并让其可继承，弥补此前仅处理托管运行时缓存的缺口；跳过缺失路径与非目录。

---

## 📈 功能需求趋势

从今日活跃 Issues / PR 中可提炼出社区最关注的四大方向：

1. **Linux 桌面版支持**  
   #11023 虽已关闭，但 952 👍 + 208 评论表明这是社区长期以来的头号功能诉求。用户明确希望摆脱 macOS 功耗问题，并在 Linux 桌面获得同等体验。

2. **Windows 平台插件生态全面修复**  
   Browser Use、Computer Use、Chrome 插件在 Windows 上大面积不可用（app-server 启动失败、插件不显示/安装失败、扩展连接状态不一致），已影响约 60% 的活跃 Windows Issue。社区期待一次系统性修复而非逐个打补丁。

3. **MCP 体验深化**  
   多个 PR 指向 MCP 的审批流统一、OAuth 注册优化（CIMD）、TUI 渲染性能改进，表明 MCP 正在从“能用”走向“好用”，尤其在企业级权限控制与远程场景。

4. **沙箱与远程控制边界能力增强**  
   Windows 沙箱修复合集、gRPC code-mode 接入共享 HTTP 客户端、远程控制回归修复，说明社区对“Codex 在受控环境中的可靠性”要求持续上升。

---

## 💬 开发者关注点

- **Windows `os error 3` 反复出现**：多条 Issue（#19187、#19450、#20048、#26011 等）指向同一根因——自动更新或安装后路径失效/消失，导致 app-server、MCP、Browser Use 无法启动。社区普遍期望：更新流程应校验并迁移旧路径配置，而非静默保留失效引用。
- **自动更新后配置与插件市场损坏**：多起报告指出更新后 `config.toml` 路径陈旧、`openai-bundled` 插件市场重建不完整、Chrome 插件消失。用户已多次自行尝试清理缓存恢复，属于体验“最后一公里”问题。
- **UI 状态真实性**：子代理卡片滞留（#23930）、扩展“Connected/Disconnected”状态不一致（#21741）等，开发者反馈“状态显示与后端实际状态脱节”会严重削弱对桌面端的信任度。
- **非交互日志噪声**：#6511 中重复 `file update:` 输出在 CI 流水线中极为干扰，开发者希望 Codex 提供更细粒度的日志级别配置，以便在生产环境集成。

---

*数据来源：[github.com/openai/codex](https://github.com/openai/codex) | 统计区间：2026-08-11 ~ 2026-08-12*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-12）

## 1. 今日速览

今日发布 4 个版本（v0.56.0-nightly、v0.56.0-preview.1、v0.55.1、v0.55.0-preview.3），核心修复集中在模型容量误报、CI 可靠性以及关键 CVE 漏洞。社区最关注 P1 级 Agent 稳定性问题——子代理在 MAX_TURNS 后误报成功（#22323）和通用代理挂起（#21409）持续发酵，同时安全团队正密集处理多个依赖漏洞的紧急修复。

---

## 2. 版本发布

**v0.56.0-nightly.20260812.g5024443c7**
- 修复错误的模型容量耗尽提示，修正核心包配额查询的模型映射（PR #28730）
- 新增 evals 本地报告命令 `npm run eval:report` 及开发者文档（PR #28369）

**v0.56.0-preview.1**
- 基于 v0.55.0-preview.1 的版本准备，包含 changelog 与版本号提升

**v0.55.1（稳定版）**
- 修复 release 验证中 npm ci 忽略 scripts 的问题（PR #28116）
- 修复 CI 中工作区二进制文件遮蔽问题（PR #28132）
- 引入工具注册表（Tool Registry）特性

**v0.55.0-preview.3**
- 热修复补丁，将 #28730 的核心修复合入 preview 分支

---

## 3. 社区热点 Issues

精选 10 个最值得关注的问题：

### 3.1 🔴 P1：子代理 MAX_TURNS 后误报成功（#22323）· 12 评论
`codebase_investigator` 子代理在未完成任何分析时就达到最大轮次，却报告 `status: "success"` / `Termination Reason: "GOAL"`，掩盖了真实中断原因，直接损害 Agent 输出可信度。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### 3.2 🔴 P1：Generalist 代理无限挂起（#21409）· 8 评论 / 8 👍
任何需要 defer 给 generalist 代理的任务（如创建文件夹）都会无限挂起，用户最长等待 1 小时；仅可通过指令禁用子代理绕过。
🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### 3.3 🟡 P2：零依赖 OS 沙箱 + 执行后意图路由（#19873）· 8 评论
利用 Gemini 3 模型原生 bash 能力（grep/cat/sed/awk 链式调用），通过零依赖沙箱与执行后意图路由，在安全与原生体验之间取得平衡，社区讨论热烈。
🔗 https://github.com/google-gemini/gemini-cli/issues/19873

### 3.4 🔴 P1：组件级评估体系建设（#24353）· 7 评论
在已有 76 个行为评估测试基础上，提出组件级评估（Component Level Evals），用于更精细地验证 6 个受支持 Gemini 模型的表现。
🔗 https://github.com/google-gemini/gemini-cli/issues/24353

### 3.5 🟡 P2：AST 感知的文件读取/搜索评估（#22745）· 7 评论
探索 AST 感知工具的价值：精确读取方法边界、减少回合数与 token 噪声、更智能的代码库导航。衍生 issue（#22746）建议基于 `tilth` 或 `glyph` 工具实现。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

### 3.6 🟡 P2：Gemini 不主动使用 skills 和子代理（#21968）· 6 评论
开发者反馈 Gemini CLI 几乎不会主动调用自定义 skills 和子代理，即使任务高度相关（如 gradle/git skill），除非显式指令。限制 CLI 的扩展能力。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### 3.7 🔴 P1：Shell 命令执行卡在 "Waiting input"（#25166）· 4 评论 / 3 👍
简单 CLI 命令执行完毕后仍显示命令活跃并等待输入，需要人工干预。高频复现，涉及核心执行路径。
🔗 https://github.com/google-gemini/gemini-cli/issues/25166

### 3.8 🟡 P2：Auto Memory 无限重试低信号会话（#26522）· 5 评论
Auto Memory 仅在提取代理成功读取转录后才将会话标记为已处理；因低信号跳过的会话会被反复识别和重试，造成资源浪费。
🔗 https://github.com/google-gemini/gemini-cli/issues/26522

### 3.9 🟡 P2：v0.33.0 起子代理绕过权限配置（#22093）· 3 评论
用户所有配置均已禁用 agents 模式，但 v0.33.0 更新后子代理（如 generalist）仍被调用。权限体系变更疑似引入回归。
🔗 https://github.com/google-gemini/gemini-cli/issues/22093

### 3.10 🟡 P2：Agent 应主动规避破坏性行为（#22672）· 3 评论
复杂 git 操作或数据库维护中，模型会使用 `git reset` / `--force` 等破坏性命令，即使存在更安全的替代方案。社区呼吁内置危险操作评估与劝阻机制。
🔗 https://github.com/google-gemini/gemini-cli/issues/22672

---

## 4. 重要 PR 进展

### 4.1 🔥 安全：shell-quote 升级修复 CVE-2026-9277（#28780）
将 shell-quote 从 1.8.3 升至 1.8.4，修复 Trivy 扫描发现的 CRITICAL 级漏洞。
🔗 https://github.com/google-gemini/gemini-cli/pull/28780

### 4.2 🔥 安全：simple-git 升级修复 CVE-2026-28292（#28778）
将 simple-git 从 3.28.0 升至 3.32.3，修复另一 CRITICAL 级漏洞。
🔗 https://github.com/google-gemini/gemini-cli/pull/28778

### 4.3 安全：封堵 $VAR / ${VAR} 变量展开绕过（#28691）· P1
修复 `detectBashSubstitution()` 和 `detectPowerShellSubstitution()` 的不完整检查，封堵 GHSA-wpqr-6v78-jr5g 绕过路径；同时加固自动化 issue 去重工作流。
🔗 https://github.com/google-gemini/gemini-cli/pull/28691

### 4.4 安全：web-fetch 的 SSRF 漏洞修复（#28557）
将 `isPrivateIp()` 同步检查改为异步 DNS 解析，阻止域名解析到 `169.254.169.254` 等内网地址绕过校验。
🔗 https://github.com/google-gemini/gemini-cli/pull/28557

### 4.5 新功能：SGLang 与本地 OpenAI 兼容端点支持（#28681）· P1
为 CLI 增加 SGLang 及 OpenAI 兼容本地端点支持，回应社区对自托管模型接入的需求。改动量较大（L/XL）。
🔗 https://github.com/google-gemini/gemini-cli/pull/28681

### 4.6 核心：修复模型容量误报与配额映射（#28730）
已合入 v0.56.0-nightly。解决 CLI 中错误的模型容量耗尽提示、core 包模型配额查询映射，并在 UI 中保留 "Keep trying" 选项。
🔗 https://github.com/google-gemini/gemini-cli/pull/28730

### 4.7 认证：改进 Vertex AI 401 错误提示（#28679）
当用户使用标准 Gemini API key 但配置 Vertex AI auth 时，给出明确的错误指引，改善开发者体验。
🔗 https://github.com/google-gemini/gemini-cli/pull/28679

### 4.8 认证：拒绝 A2A OpenID Connect 校验（#28680）
修复 A2A 远程代理配置在校验期通过、运行时失败的问题，改为验证阶段直接拒绝 OIDC 方案。
🔗 https://github.com/google-gemini/gemini-cli/pull/28680

### 4.9 稳定性：修复 OAuth 回调超时泄漏（#28678）
集中管理 OAuth 回调服务器的结算与资源清理，避免陈旧超时回调和内存泄漏。
🔗 https://github.com/google-gemini/gemini-cli/pull/28678

### 4.10 IDE 集成：修复 Cider/VS Code 远端目录错配（#28729）
解决 Gemini CLI 在 Cider 或 VS Code fork/远端工作区中，因 FUSE/虚拟目录路径差异导致的 IDE 扩展连接失败。
🔗 https://github.com/google-gemini/gemini-cli/pull/28729

---

## 5. 功能需求趋势

从近期 Issues 中提炼出的社区重点关注方向：

| 方向 | 代表性 Issue | 热度 |
|------|-------------|------|
| **Agent 行为可信度** | #22323（MAX_TURNS 误报）、#21409（挂起）、#25166（shell 卡住） | 🔥🔥🔥 |
| **安全与沙箱执行** | #19873（零依赖沙箱）、#22672（阻止破坏性命令）、#28691（变量展开绕过） | 🔥🔥🔥 |
| **内存系统完善** | #26522（低信号会话重试）、#26525（确定性脱敏）、#26523（无效补丁隔离） | 🔥🔥 |
| **AST 感知能力** | #22745（AST 文件读取/搜索）、#22746（AST 代码库映射） | 🔥🔥 |
| **子代理/技能主动调用** | #21968（skills 使用不足）、#22598（subagent 轨迹分享） | 🔥🔥 |
| **浏览器代理韧性** | #22232（会话接管/锁恢复）、#21983（Wayland 失败）、#22267（settings.json 被忽略） | 🔥 |
| **本地模型/自托管端点** | #28681（SGLang/OpenAI 兼容端点） | 🔥 |
| **IDE/终端体验** | #28729（Cider 目录错配）、#24935（外部编辑器后终端损坏）、#21924（resize 闪烁） | 🔥 |

---

## 6. 开发者关注点

1. **执行可信度受损**：子代理失败时误报成功（#22323）、通用代理无限挂起（#21409）、shell 命令结束后仍显示等待输入（#25166）——三个 P1 问题严重损害开发者对自动化结果的信任。

2. **安全补丁响应提速**：过去 24 小时内出现 2 个 CRITICAL 级依赖 CVE 修复（shell-quote、simple-git），加上变量展开绕过和 SSRF 修复，安全团队正密集处理。建议开发者及时跟进 GHSA 公告以安排升级。

3. **权限控制回归疑虑**：v0.33.0 起子代理在用户显式禁用后仍被调用（#22093），引发对 Agent 权限模型透明度的担忧。

4. **"沙箱执行"呼声渐高**：社区不再满足于"仅提示词约束"式安全防护，期待零依赖 OS 沙箱 + 执行后意图路由的落地（#19873），在模型原生 bash 能力与安全边界之间取得平衡。

5. **生态集成需求明确**：SGLang/本地 OpenAI 兼容端点（#28681）、Cloud Workstations OAuth 代理（#28688）、Cider/VS Code 远端目录适配（#28729）——开发者希望 Gemini CLI 无缝融入多样化的本地与云端工作环境。

6. **可观测性仍待改进**：`/bug` 报告不含子代理内部上下文（#21763）、subagent 轨迹无法通过 `/chat share` 分享（#22598），多代理工作流的调试仍较困难。

---

*本日报由 AI 技术分析师根据 GitHub 公开数据整理，数据截至 2026-08-12。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-12

## 1. 今日速览

今日无新版本发布，社区动态集中在 Issue 讨论与 PR 提交流。值得关注的是：模型/技能选择机制的问题集中爆发（Rubber Duck 模型覆盖、用户级模型配置不生效、自动模式选中不可用模型等），Windows 平台插件安装/更新的 `Access is denied` 问题持续发酵（累计 14 👍），此外多个新提交的 triage Issue 涉及权限模型与 CLI 行为细节的改进建议。

## 2. 版本发布

过去 24 小时内无新版本发布（当前最新版本仍为 v1.0.79）。

## 3. 社区热点 Issues

挑选 10 个最值得关注的 Issue，涵盖高赞、复现明确或影响面大的问题。

### 🥇 #4095 Windows: 插件更新失败（VS Code 持有文件锁）
- **链接**: [github/copilot-cli Issue #4095](https://github.com/github/copilot-cli/issues/4095)
- **状态**: 开放 | 👍 14 | 评论 2
- **为什么重要**: Windows 上 `copilot plugin update` 在 VS Code 运行期间 100% 失败，原因是 Copilot 扩展对 `installed-plugins` 目录持有 watcher 句柄。这是当前社区投票数最高的 Issue，影响所有在 VS Code 旁使用 CLI 的 Windows 开发者。已有 14 个 👍，说明影响面广。
- **社区反应**: 该问题已持续 1 个月仍未修复，社区期待官方给出 workaround 或修复。

### 🥈 #4251 恢复大会话 OOM / 单核满载 ~70 分钟
- **链接**: [github/copilot-cli Issue #4251](https://github.com/github/copilot-cli/issues/4251)
- **状态**: 开放 | 👍 1 | 评论 3
- **为什么重要**: 从 v1.0.73 升级到 v1.0.74 后，恢复长期大型会话（此前每日正常恢复）出现回归：峰值 RSS 内存增加约 3-4 倍，且单核 CPU 满载约 70 分钟直至 OOM。作者提供了同一机器、同一会话、仅改变版本的 A/B 对照数据，定位明确到 1.0.74。
- **社区反应**: 该问题影响重度用户（长生命周期会话），虽赞数不高但严重程度极高。

### 🥉 #4151 Windows 插件安装对所有源均失败（Access is denied）
- **链接**: [github/copilot-cli Issue #4151](https://github.com/github/copilot-cli/issues/4151)
- **状态**: 开放 | 👍 1 | 评论 3
- **为什么重要**: Windows 11 上 `copilot plugin install` 100% 失败，且不限于单一源——marketplace 源、GitHub 直连仓库、甚至本地目录源均报 `os error 5`。与 #4095 同属 Windows 插件流程的系统性问题。
- **社区反应**: 3 条评论但形成典型示例，与 #4095 形成呼应的姊妹 Issue。

### #4422 企业账号下所有 Claude 模型被禁用
- **链接**: [github/copilot-cli Issue #4422](https://github.com/github/copilot-cli/issues/4422)
- **状态**: 开放 | 👍 3 | 评论 2
- **为什么重要**: 个人企业账号中，GitHub Copilot 设置里显示 Claude 系列模型（sonnet 5, 4.8 等）已启用，但 CLI 模型选择器中全部不可用，回滚版本也无效——“昨天还能用，今天全部报 This model is not available”。3 个 👍 显示影响不少企业用户。
- **社区反应**: 官方尚未回复，推测为服务端策略变更而非 CLI 客户端问题。

### #4431 `/model` config 会清空全部设置
- **链接**: [github/copilot-cli Issue #4431](https://github.com/github/copilot-cli/issues/4431)
- **状态**: 已关闭 | 评论 3
- **为什么重要**: 在 v1.0.79 中，通过 `/config model` 设置用户级模型会直接**覆写** `~/.copilot/settings.json`，导致原有所有自定义设置丢失。是配置管理方面的严重 bug——用户以为只改一个字段，结果整个配置文件被重置。
- **社区反应**: 已关闭但未说明结论，可能已通过其他方式修复或标记为已知问题。

### #4211 MCP 结构化响应中的 BigInt 序列化错误
- **链接**: [github/copilot-cli Issue #4211](https://github.com/github/copilot-cli/issues/4211)
- **状态**: 开放（已 triage）| 评论 3
- **为什么重要**: 当 MCP 服务器返回大数字（BigInt）时，CLI 直接崩溃并中止所有进行中的任务，报错 `TypeError: Do not know how to serialize a BigInt`。已进入 [triaged, area:mcp] 状态，说明官方已在处理。
- **社区反应**: 影响所有使用返回大整型数值的 MCP 服务器的用户（如支付、ID 场景）。

### #4380 Rubber Duck 审查使用与主会话相同的模型族
- **链接**: [github/copilot-cli Issue #4380](https://github.com/github/copilot-cli/issues/4380)
- **状态**: 开放 | 评论 3
- **为什么重要**: Rubber Duck 的定位是跨模型族的“对抗性审查”，但实际运行时有时会复用主会话的模型族，导致审查视角不够独立。作者在使用 `5.6 Terra - Max` 时观察到该问题。
- **社区反应**: 与 #4432 形成关联（模型参数覆盖策略），是模型策略一致性问题的一部分。

### #4434 用户级模型配置在新会话中不生效
- **链接**: [github/copilot-cli Issue #4434](https://github.com/github/copilot-cli/issues/4434)
- **状态**: 开放（triage）| 评论 1
- **为什么重要**: 通过 `/config model` 设置的用户默认模型在 `/clear` 后或通过会话界面创建新会话时不会生效，只有完全退出并重启 CLI 才会加载。与 #4431 同为 `/config` 相关的问题，但一个过于激进（清空设置），一个过于保守（不生效）。
- **社区反应**: 新提交的 Issue，尚未有官方回应。

### #4439 GitLab MCP OAuth 配置因 RFC 8414 不匹配被拒绝
- **链接**: [github/copilot-cli Issue #4439](https://github.com/github/copilot-cli/issues/4439)
- **状态**: 开放（triage）| 评论 1
- **为什么重要**: v1.0.79 在对接 GitLab Self-Managed MCP 服务器时，其 OAuth 2.0 动态客户端注册的 issuer 校验失败，报 RFC 8414 mismatch。这是 MCP 生态互操作性的典型问题，影响企业自建 MCP 服务器接入。
- **社区反应**: 新提交，尚未有反馈。

### #4451 显式调用斜杠 Skill 后模型侧冗余加载并报 “Skill not found”
- **链接**: [github/copilot-cli Issue #4451](https://github.com/github/copilot-cli/issues/4451)
- **状态**: 开放（triage）| 👍 2 | 评论 0
- **为什么重要**: 用户显式调用某个交互式斜杠 Skill 后，Skill 已成功展开进入对话，但 assistant 又尝试通过模型侧 `skill()` 工具重复加载同一 Skill——对于禁止模型调用的 Skill，这次冗余调用会失败并报错。这暴露了 skill 解析与模型工具注册之间的状态不同步问题。
- **社区反应**: 24 小时内收获 2 个 👍，说明同类问题不少用户遇到过。

## 4. 重要 PR 进展

过去 24 小时内仅有 3 个 PR 更新，全部列出。

### #4449 将 PR 自动化从 pull_request_target 迁移（开放）
- **链接**: [github/copilot-cli PR #4449](https://github.com/github/copilot-cli/pull/4449)
- **功能**: 安全加固 PR。移除了仓库工作流中对 `pull_request_target` 的依赖——该模式容易让不受信任的 PR 代码在高权限上下文中执行。新方案将不受信任的 PR 输入限制在低权限的 `pull_request` 工作流中，需要仓库写权限的操作则移至单独的分步骤流程。
- **意义**: 这是官方仓库自身的安全实践升级，对社区具有参考价值（许多项目仍在使用有风险的 `pull_request_target`）。

### #4452 回滚 5 个 “copilot/fix” 提交（已关闭）
- **链接**: [github/copilot-cli PR #4452](https://github.com/github/copilot-cli/pull/4452)
- **功能**: 回滚了 5 个由 “copilot/fix” 自动化生成的提交，具体原因 PR 描述为空。已合并关闭，推测是 Copilot 自动修复引入回归后被人工回滚。
- **意义**: 展示了 Copilot 自动化修复的局限性和人工 review 的必要性。

### #4428 添加初始 devcontainer 配置（开放）
- **链接**: [github/copilot-cli PR #4428](https://github.com/github/copilot-cli/pull/4428)
- **功能**: 为仓库添加 GitHub Codespaces / devcontainer 开发环境配置，方便贡献者一键启动开发容器。PR 描述为 “LGTM”，说明内容可能比较简单（如基础镜像 + 工具链）。
- **意义**: 降低新贡献者的环境搭建门槛。

## 5. 功能需求趋势

从近 24 小时更新的所有 Issues 中，可提炼出以下社区最关注的功能方向：

### 🔥 模型选择与路由透明度
- #4377（GPT-5.6 Terra 委托给 Opus subagent）、#4380（Rubber Duck 复用主会话模型族）、#4432（模型参数静默覆盖互补策略）、#4445（自动模式选中不可用模型导致崩溃）
- **诉求**: 用户需要知道“实际用了哪个模型”，且不希望模型显式/隐式被覆盖或降级。

### 🔥 技能（Skill）系统的一致性
- #4430（重复技能加载）、#4438（`disable-model-invocation: true` 导致技能完全不可达）、#4451（显式调用后冗余加载并报错）
- **诉求**: 技能的可发现性、加载机制与手动/自动调用路径需要统一。

### ⚡ 配置管理可靠性
- #4431（`/model` 清空全部配置）、#4434（用户级模型配置不生效）
- **诉求**: `/config` 系列命令的副作用必须可预期——不能丢失已有配置，同时新会话应立即生效。

### ⚡ 权限系统的精细化
- #3877（自动 allow-all）、#4443（权限提示不区分只读/写操作）、#4446（企业级沙箱策略下发）
- **诉求**: 更细粒度的权限控制（如区分只读 vs 写操作），以及企业级策略集中管理。

### 🧩 MCP 生态互操作性
- #4211（BigInt 序列化）、#4439（GitLab OAuth issuer 校验）
- **诉求**: 与更多第三方 MCP 服务器无缝对接，减少因协议细节差异被拒绝的情况。

### 🖥️ 终端体验细节
- #4447（退格键删除整个单词）、#4450（工具调用前的文本被折叠隐藏）、#2623（紧凑时间线显示）
- **诉求**: 输入编辑行为和输出渲染符合直觉，长时运行时可读性更好。

## 6. 开发者关注点

综合上述 Issue，开发者在实际使用中反馈最集中的痛点是：

### ① 模型机制的“黑盒感”
多个 Issue 指向同一核心痛点——**用户无法预期实际会调用哪个模型**：Rubber Duck 复用主会话模型、`auto` 模式选中不可用模型、GPT-5.6 静默委托 Opus 导致意外扣费。开发者需要的是明确的路由逻辑、可配置的委托规则，以及防止静默覆盖的防护。

### ② Windows 平台支持仍是短板
插件安装（#4151）和更新（#4095）双双失败，根源在文件锁与权限模型。Windows 开发者如果想要使用插件功能，目前基本处于“不可用”状态。这不是偶发问题，而是 100% 复现的确定性故障。

### ③ 配置命令的副作用不可控
`/config model` 要么清空所有设置（#4431）、要么新会话不生效（#4434），配置命令的基本预期（“只改我要改的”）没有得到满足，且有数据丢失风险。

### ④ 大会话/大仓库场景下资源失控
会话恢复 OOM（#4251）与 `tgrep` 索引器 OOM 杀死主机（#3976）都指向**没有内存上限控制**的问题。对于 monorepo 和长期会话的重度用户，这是稳定性层面的硬伤。

### ⑤ 安全与依赖问题
`adm-zip` 的 CVE-2026-39244（#4442）被企业安全扫描器拦截，而 GitHub 无法通过配置跳过；`pull_request_target` 的仓库自身也已开始治理（PR #4449）。安全合规要求正在成为企业用户的硬性门槛。

---

*本日报由 GitHub Copilot CLI 社区数据自动生成，数据截止 2026-08-12。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-12）

## 今日速览

过去 24 小时无新版本发布。社区焦点集中在两项功能需求上：**跨会话持久记忆**（#1283，34 条评论）与 **AI 消息引用回复**（#2601）。PR 方面共有 8 条更新，其中唯一处于开放状态的是 `thinking effort` 可配置功能（#2509），其余 7 条已关闭 PR 多为断言异常化、修复竞态条件、打包缺陷等基础稳定性问题。

## 版本发布

无。

## 社区热点 Issues

过去 24 小时内更新活跃的 Issue 共 2 条，均为功能需求，且具有代表性。

### 1. Memory System — 跨会话持久上下文（#1283）
- **状态**：OPEN ｜ **作者**：CatKang ｜ **创建**：2026-02-27 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1283
- **摘要**：请求实现完整的 **Memory System**，让 Kimi Code CLI 跨会话记住项目模式、用户偏好和有效上下文。包括两类记忆：AI 自动维护的笔记（automatic memory）与用户通过指令定义的手动记忆（manual memory）。
- **关注原因**：从 2026 年 2 月创建至今仍为打开状态，累计 34 条评论，足见社区对“上下文不丢失”的强烈诉求。这是 CLI 从“单次对话工具”走向“持续性工作伴侣”的关键能力，目前缺少官方实现。

### 2. 引用回复：在 AI 回答中选中任意片段进行评论（#2601）
- **状态**：OPEN ｜ **作者**：topit ｜ **创建**：2026-08-11 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2601
- **摘要**：希望 Kimi Web（以及 CLI）支持**引用式回复**：用户可选中 AI 回复中的任意文本范围（段落、代码块、计划步骤、diff 解释中的某一行），针对该片段附加评论或追问，并让 agent 基于该上下文继续执行。
- **关注原因**：新提交的 Issue，目前虽无评论，但精准命中了大模型交互中的高频痛点——无法针对 AI 输出的局部内容进行细粒度追问。若落地，将显著改善代码审查、长方案讨论等场景下的上下文定位能力。

## 重要 PR 进展

过去 24 小时共有 8 个 PR 更新，7 个已关闭，1 个开放中。以下为核心进展。

### 1. feat(kimi): 可配置思考强度与 /effort 命令（#2509）— OPEN
- **作者**：n-WN ｜ **创建**：2026-07-18 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2509
- **内容**：新增通过 `/effort` 命令动态调节模型思考强度（reasoning effort）的功能。该 PR 解决 issue #2501，并建立在已关闭的 #318（reasoning_effort 支持）与 #2499 的显式兼容透传逻辑之上。
- **评价**：这是当前唯一开放的功能型 PR。对需要在“快速响应”与“深度推理”之间按需切换的开发者很有价值，但也可能有实现复杂度高的风险。

### 2. fix(acp): 将 assert 语句替换为 RuntimeError（#2057）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-04-24 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2057
- **内容**：将 `acp/session.py` 中 5 个 `assert` 替换为 `RuntimeError`。
- **评价**：Python 的 `-O` 优化标志会剥离所有 `assert`，导致生产环境中的关键不变量检查（如 `_ToolCallState`）在用户启用优化后完全失效。用真实异常替代是正确且必要的修复。

### 3. fix(wire): 消除 WireFile.append_record 的 TOCTOU 竞态（#2056）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-04-24 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2056
- **内容**：修复 `WireFile.append_record` 中 check-to-time-of-use 竞态：原代码先调 `self.path.exists()` 再调 `self.path.stat().st_size`，二者之间文件可能被删除导致未处理异常。改为在一个调用中完成状态获取。
- **评价**：多进程/多线程环境下写记录时的隐性崩溃来源，修复成本低但稳定性收益明显。

### 4. fix(agentspec): 将 assert 替换为 AgentSpecError（#2055）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-04-24 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2055
- **内容**：将 `agentspec.py` 中的 `assert agent_spec.extend is None` 替换为 `AgentSpecError` 异常。
- **评价**：与 #2057 同类的安全加固，确保在 `-O` 模式下扩展字段校验依然生效，防止非法 AgentSpec 在静默中被接受。

### 5. Fix minor bugs in file tools and UI feedback（#1328）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-03-03 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/1328
- **内容**：修复三个小问题，其中最关键的是 `StrReplaceFile` 的替换计数计算错误——原代码基于 `original_content` 计算替换次数，未考虑多次编辑的累积影响，导致替换统计不准确。
- **评价**：典型的“细节正确性”修复，直接关系到文件编辑工具在多次替换场景下的可靠性。

### 6. fix(pyinstaller): 过滤不存在的 dateparser 缓存文件（#1082）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-02-10 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/1082
- **内容**：修正 PyInstaller 对 `dateparser` 数据的收集逻辑——`dateparser_tz_cache.pkl` 属于首次使用时懒生成的缓存文件，在全新环境或 CI 上不存在，导致 `collect_data_files` 直接报错。
- **评价**：影响所有通过 PyInstaller 构建二进制产物的 CI 流程，属于构建期修复。

### 7. fix: 移除 WriteFile 工具中的冗余 mode 校验（#1077）— CLOSED
- **作者**：hobostay ｜ **创建**：2026-02-10 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/1077
- **内容**：删除 `WriteFile` 工具中第 84-91 行对 `mode` 参数的冗余运行时校验（该参数只允许 “overwrite” 或 “append”）。
- **评价**：代码清理类 PR，移除重复防御式逻辑，使工具实现更简洁。

### 8. fix(acp): shell 命令通过 terminal args 路由（#1393）— CLOSED
- **作者**：hanhan3344 ｜ **创建**：2026-03-10 ｜ **更新**：2026-08-11
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/1393
- **内容**：修复 ACP Shell 终端执行方式——shell 可执行程序放 `command`，shell 调用参数放 `args`；适配当前 ACP SDK 中 `terminal_id` 的响应结构，并补充 bash 与 PowerShell 的回归测试。
- **评价**：ACP 终端集成的基础修复，解决跨平台 shell 命令无法正确执行的问题，覆盖 Windows 与 Unix 系。

## 功能需求趋势

从近期 Issue 与 PR 中可以提炼出四个社区最关注的方向：

1. **跨会话持久记忆**：以 #1283 为代表，大量用户希望在会话结束后保留项目上下文、编码规范和个人偏好，这已成为 CLI 工具的最核心期望功能。
2. **对话级细粒度交互**：以 #2601 为代表，用户不满足于整段对话的上下文传递，要求能定位 AI 回答中的具体片段（代码块、计划步骤、diff 行），并围绕该片段进行回复和追问。
3. **推理强度灵活调节**：PR #2509 引入 `/effort` 命令，意味着社区开始追求“速度/质量”的动态平衡，而不是固定一种推理模式。
4. **稳定性加固持续进行**：本周期 7 个已关闭 PR 中，超过一半是异常处理、竞态条件、纯函数调用安全等生产可靠性问题。在功能快速迭代的同时，开发者对底层健壮性要求很高。

## 开发者关注点

从本期更新的数据中，可以看到开发者的主要痛点和需求集中于以下几个方面：

- **会话上下文断裂**：没有记忆系统，重启后丢失项目背景，需要重复描述上下文；这已连续多月在高评论量 Issue 中位居前列。
- **回复定位困难**：AI 长响应中无法引用某一段进行精准提问，导致多轮对话中要反复复制粘贴，效率低下。
- **生产的隐性风险**：
  - 大量原本使用 `assert` 的关键校验在 Python 优化模式下会被直接移除（#2057、#2055），开发者对这类“看似存在、实则失效”的安全网表示担忧；
  - `WireFile.append_record` 存在 TOCTOU 文件系统竞态（#2056），在并行任务中极易引发偶发崩溃；
  - 打包产物在干净环境构建失败（#1082），影响 CI 的可持续化。
- **终端集成不可靠**：ACP 下 shell 命令路由错误（#1393）会导致终端自动化不可用，需要更严密的跨平台执行语义和测试覆盖。

整体而言，2026-08-12 的社区动态表明：**Kimi Code CLI 正处在一个从“功能堆叠”转向“体验打磨与稳定性加固”的阶段**，记忆系统与对话细粒度交互是两个最明确的产品级缺口。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## 今日速览

过去 24 小时 OpenCode 无新版本发布，但 Issue 与 PR 保持高频更新。社区关注焦点集中在两类问题上：一是子代理/工具的循环重试与死锁导致 API 成本失控（多个相关 Issue 被反复提出）；二是权限规则在子代理场景下被绕过、非英语输出受限等一致性问题。PR 方面，V2 桌面版 Beta 发布流程正式启动，同时多项围绕会话重试、插件失败可视化、Windows 路径修复的补丁正在推进。

## 社区热点 Issues

过去 24 小时共 50 个 Issue 有更新，以下是最值得关注的 10 个：

- **[#14187 [FEATURE] 文件查看器侧边栏增加 Markdown 预览开关](https://github.com/anomalyco/opencode/issues/14187)** — 目前侧边栏查看 .md/.mdx 只能看原始语法高亮，用户希望加入预览切换。获 27 👍 为今日最高，反映文档工作流的强需求。*作者: southpolesteve | 评论: 9*

- **[#12609 系统提示强制 ASCII 输出，破坏非英语语言支持](https://github.com/anomalyco/opencode/issues/12609)** — 系统提示中的 "Default to ASCII" 指令导致模型在编辑文件时尽量避免非 ASCII 字符，即使项目已大量使用中文等 Unicode 字符。13 👍 说明非英语用户受影响面广。*作者: diegonix | 评论: 10*

- **[#6618 `@` 不再列出可引用文件](https://github.com/anomalyco/opencode/issues/6618)** — 回归 Bug：升级后 `@` 只显示 agents、不再自动补全目录内文件（如 `.ai/prompts/init.md`），属高频操作被破坏。评论数 15 为今日最多。*作者: flexdinesh | 评论: 15 | 👍: 10*

- **[#12716 Doom loop 在推理/输出阶段无法被捕获](https://github.com/anomalyco/opencode/issues/12716)** — 模型在 reasoning 或 output 阶段陷入死循环时，现有检测机制完全失效，浪费 token。*作者: Heinrich-XIAO | 评论: 10*

- **[#16885 JSON→SQLite 一次性迁移在 channel 特定数据库上反复重跑](https://github.com/anomalyco/opencode/issues/16885)** — 非 latest 渠道（如 dev/local 构建）每次启动都会重新执行迁移，破坏状态一致性。9 👍 显示不少开发者受影响。*作者: vereis | 评论: 9*

- **[#17169 子代理在工具失败后进入无限重试循环，导致 API 成本飙高](https://github.com/anomalyco/opencode/issues/17169)** — edit 工具调用失败时子代理不断重试同一操作，单次子代理调用可产生 $15+ 费用。这是「循环→费用失控」链条上的典型案例。*作者: cauboy | 评论: 6*

- **[#31463 插件导入在解析 npm specifier 时静默挂起](https://github.com/anomalyco/opencode/issues/31463)** — 当前唯一标为 OPEN 的高关注 Issue。配置 `oh-my-openagent@latest` 且 npm 缓存为空时，启动过程无限 hang；`--pure` 可绕过，根因在 `Npm.add()` 调用 Arborist 处。*作者: 7emotions | 评论: 5*

- **[#32022 [FEATURE] 允许代理完成计划后从 Plan 模式切换至 Build 模式](https://github.com/anomalyco/opencode/issues/32022)** — 用户希望计划定稿后能自动/一键切入构建模式，减少手动切换成本。获 5 👍。*作者: Hassan-Davis | 评论: 4*

- **[#32024 子代理（Task 工具）绕过 deny 权限规则](https://github.com/anomalyco/opencode/issues/32024)** — 配置 `"**/.env": "deny"` 后，经 task 工具生成的子代理仍可读取并返回被拒文件内容，无任何告警。属于权限体系安全漏洞，需优先修复。*作者: pertzsch | 评论: 3*

- **[#18441 `edit` 权限规则无法覆盖 `external_directory: "allow"` 的写操作](https://github.com/anomalyco/opencode/issues/18441)** — `external_directory` 设为 allow 后，同路径的 `edit: ask/deny` 规则全部失效，权限优先级逻辑颠倒。*作者: ChrisFloofyKitsune | 评论: 3 | 👍: 3*

## 重要 PR 进展

- **[#41626 feat(desktop): 发布 V2 Beta 桌面版](https://github.com/anomalyco/opencode/pull/41626)** — 将 `@opencode-ai/cli@next` 打包进 Beta 桌面版，改用共享 V2 服务生命周期；Electron 用户数据改为 channel 特定，服务器使用正常 XDG 状态目录。合并顺序在 #41627 之前。*作者: Hona*

- **[#41918 feat(server): workerd 运行时 Profile 与 SDK entrypoint](https://github.com/anomalyco/opencode/pull/41918)** — 使 OpenCode 服务器可跑进 Cloudflare Durable Object，目标场景是「每个 Slack 线程 = 一个完整 OpenCode 服务器实例」。有 CI guard 在真实 isolate 中验证。*作者: kitlangton*

- **[#41940 feat(tui): 在新会话界面直接展示插件失败信息](https://github.com/anomalyco/opencode/pull/41940)** — 失败 MCP 服务器和 TUI 插件会直接显示在新会话页，`/mcps` 与 `/plugins` 可进完整诊断；失败行支持滚动与复制错误详情。*作者: kitlangton*

- **[#41789 fix(core): 暴露本地附件路径给模型](https://github.com/anomalyco/opencode/pull/41789)** — 将显式附加的本地图片/目录的解析路径暴露给模型，恢复 V2 agent 操作所选图片和 reference checkout 的能力。修复 #41443、#41454。*作者: kitlangton*

- **[#41942 fix(core): 为会话重试延迟加入 ±20% 抖动](https://github.com/anomalyco/opencode/pull/41942)** — 保留 provider 的 `Retry-After` 作为最小延迟，时间戳取整为毫秒以通过持久化事件校验。*作者: opencode-agent[bot]*

- **[#41939 fix(opencode): 会话重试次数上限设为 5 次](https://github.com/anomalyco/opencode/pull/41939)** — 修复 #37076：避免持久的可重试 provider 错误导致无限重试，让失败链路能真正终止。*作者: rekram1-node*

- **[#41933 fix(core): 优先采用提供商报告的用量成本](https://github.com/anomalyco/opencode/pull/41933)** — 新增可选 provider USD 成本字段，透传 OpenRouter 流式 `usage.cost`，并将 GitHub Copilot `total_nano_aiu` 归一化为 USD，费用统计更准确。*作者: rekram1-node*

- **[#12999 feat(config): 增加 configBoundary 选项控制父配置遍历](https://github.com/anomalyco/opencode/pull/12999)** — 允许用户设置配置文件边界，终止对父级配置和指令文件的向上搜索。关闭 #10707，关联 #4479/#6479/#10025。*作者: Flare576*

- **[#41931 fix: 规范化 Windows 反斜杠路径以修复文件树刷新](https://github.com/anomalyco/opencode/pull/41931)** — `path.normalize()` 保留反斜杠导致 tree-store 和 watcher 的 `split('/')` 不匹配，AI 编辑后 Windows 文件树无法自动刷新。*作者: skyzhao1223*

- **[#41929 fix(tui): 可配置新会话启动位置](https://github.com/anomalyco/opencode/pull/41929)** — 新增 `session.new_location` 配置：`launch`（默认，在 TUI 启动目录开会话）或 `inherit`（继承当前活动会话目录）。*作者: kitlangton*

## 功能需求趋势

- **上下文窗口与模型能力可见性**：多个 Issue 要求补齐模型能力/用量信息——#29956 希望在 Go docs 模型表增加视觉能力列；#32119 指出 split-window 模型的 context % 计算错误（用 `limit.context` 而非 `limit.input` 做分母）。
- **权限体系的一致性**：#32024（子代理绕过 deny）与 #18441（external_directory 覆盖 edit 规则）共同指向「权限规则必须在所有工具和子代理中严格一致」的强烈需求。
- **打破 ASCII 假设、支持多语言**：#12609 说明当前系统提示显式限制非 ASCII 输出，这对中文、日文等非英语用户是直接的可用性伤害。
- **更智能的会话生命周期**：#32022（Plan 完成后自动切 Build）、#41929（新会话位置可配置）反映用户希望减少操作步骤、更顺畅地控制会话流程。
- **机器可读诊断与可观测性**：#32100 提出技能清单和校验诊断的机器可读接口，便于外部工具消费。
- **桌面端与分发渠道完善**：#41626 V2 桌面 Beta、#30026 支持 winget 升级、#41918 workerd 云端运行——都在拓宽安装与运行场景。
- **稳定性优先**：循环检测、重试抖动、超时、npm 安装限时——社区正集中治理「卡死/循环/无响应」类问题，因为直接转化为费用损失。

## 开发者关注点

- **循环与无限重试是最大费用痛点**：#12716、#25254、#21850、#17169 均指向模型进入循环后无法被有效终止，消耗大量 API 额度；社区尝试从检测逻辑（跨消息去重、反向过滤器）和重试策略（抖动、上限）两个方向修复。
- **npm 插件解析挂起**：#31463 已确认根因在 `Npm.add()` 调用 Arborist 无超时无重试，冷缓存 + 慢 registry 时启动可无限阻塞；PR #41936 正在为其增加可配置超时。
- **权限漏洞（尤其是子代理）**：#32024 暴露了一个安全敏感问题——deny 规则在子代理中完全不生效，意味着任何 fork 或 task 调用都可能读取 `.env` 等敏感文件。
- **跨平台体验不一致**：Windows 路径刷新问题（#41931）、PowerShell 7.6 下 agent-browser 挂起（#25938）、tmux/zellij 下通知不触发（#29099）——三类问题都集中在终端/系统集成层。
- **数据完整性隐忧**：#30157 SQLITE_CORRUPT 直接导致用户无法启动；#16885 迁移反复重跑则让状态持久化行为不可预测；#34311/#41871 指出 apply_patch 缺乏事务性，部分失败会留下损坏的 workspace。
- **「假成功」反馈**：#41928 剪贴板写入失败却显示 "Copied to clipboard"，这类隐藏 bug 损害信任感；PR #41924 正在修复。
- **服务器-客户端状态错位**：#32077 中 fuzzy search 使用服务器目录而非客户端工作目录；PR #41930 要求先完成 event-stream 握手再启用 server-scoped 查询，并在重连后刷新连接敏感数据——说明多方接入场景下的状态同步仍是难点。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

## Pi 社区动态日报（2026-08-12）

### 今日速览

- 昨日无新版本发布，社区讨论聚焦于 Copilot 登录 429 限流、WSL 登录挂起、Mac 端高 CPU 占用等稳定性问题。
- 核心修复推进中：`usage` 流式数据保留（#7982）、工具循环间自动压缩（#7993）均已有 PR 落地或在审；同时社区提交了 Qwen Token Plan CN、Mermaid HTML 导出等新功能。
- `edit` 工具的参数规范化和模糊匹配连续白空格问题成为当日双热点：多个 Issue 与 PR 同时更新，指向工具调用健壮性为当前最集中的打磨方向。

---

### 社区热点 Issues

挑选 10 个最具讨论价值或影响面最大的 Issue：

1. **WSL 下 Pi 登录永久挂起** · *评论 25 · 已关闭*
   [#6187](https://github.com/earendil-works/pi/issues/6187)
   GitHub 设备授权已在浏览器完成、设备显示已注册，但 WSL 内的 Pi 客户端无法感知，终端 hang 在等待登录。25 条评论说明 WSL 用户群体受此影响较大，值得后续持续观察回归测试覆盖。

2. **Copilot 登录 429 限流（组织账号、多模型）** · *👍 7 · 已关闭*
   [#7850](https://github.com/earendil-works/pi/issues/7850)
   当组织账号拥有 20+ 可用模型时，设备授权成功但登录 Copilot 时被 429 Rate Limiting 拦截。与 #7428 高度重复，反映大组织账号场景下的登录链路存在结构性限流风险。

3. **Mac OS 长会话 CPU 占用飙高** · *👍 8 · 开启中*
   [#7730](https://github.com/earendil-works/pi/issues/7730)
   长会话下 CPU 在 50-110% 间波动、内存 600-800MB，疑似与会话长度/上下文大小相关。10 条评论、8 个 👍，是当前性能类反馈中关注度最高的一条。

4. **bun runtime 下 0.84.0/0.84.1 无法启动** · *评论 10 · 已关闭*
   [#7846](https://github.com/earendil-works/pi/issues/7846)
   `zlib.createZstdDecompress is not a function` 导致 uncaughtException 崩溃，影响使用 bun 安装/运行 Pi 的用户，报错指向 undici 依赖层。

5. **WebSocket 重试仅处理两种错误码，其他 transient 错误硬停 turn** · *评论 8 · 已关闭*
   [#7444](https://github.com/earendil-works/pi/issues/7444)
   `openai-codex-responses.js` 只对 `previous_response_not_found` 和 `websocket_connection_limit_reached` 重试，其他 `response.failed` 或 error frame 直接中断。属于 Codex WebSocket 通道的健壮性缺口。

6. **Compaction 无法独立配置思考级别/模型** · *评论 8 · 开启中*
   [#7553](https://github.com/earendil-works/pi/issues/7553)
   自动/手动压缩始终复用会话当前 thinking 级别，推理模型上无法为 summarization 单独设定思考预算。是功能需求，也是影响推理模型使用体验的配置灵活性问题。

7. **【P0】Windows CMD 下重复输出大量 0、内存泄漏** · *评论 2 · 已关闭*
   [#7947](https://github.com/earendil-works/pi/issues/7947)
   Windows 11 + CMD 终端运行 DeepSeek 模型时输出刷屏的 0 且逐行累积，Ctrl+C 无法中断。属于 Windows 特定严重 bug，P0 级别标记合理。

8. **Edit 模糊匹配忽略连续白空格长度差异** · *评论 6 · 开启中*
   [#7836](https://github.com/earendil-works/pi/issues/7836)
   `normalizeForFuzzyMatch` 不折叠连续空白也不去除行首空白，导致 `oldText` 仅因空格不一致就匹配失败。小模型在 edit 工具上的失败率因此明显上升，是该工具链最直接的痛点。

9. **0.84.0 delta-only `message_update` 导致 wire protocol 无 mid-run usage** · *inprogress · 开启中*
   [#7911](https://github.com/earendil-works/pi/issues/7911)
   修复 #7290 时移除了 `message_update` 中的累积 `message`，但 `usage` 也被一并删除——现在只能等 `message_end` 才能拿到 usage。官方已标记 inprogress，对应 PR #7982。

10. **OpenAI 兼容 SSE 连接可永久挂起** · *评论 2 · 已关闭*
    [#7954](https://github.com/earendil-works/pi/issues/7954)
    响应体不结束时无 inactivity timeout，完整答案送达后进程仍不退出。属于结构性缺陷，任何 OpenAI 兼容 SSE 网关都可能触发，影响面不限于单一模型。

---

### 重要 PR 进展

精选 10 个功能/修复 PR：

1. **fix(coding-agent): 在流事件中保留 usage** · 开启中
   [#7982](https://github.com/earendil-works/pi/pull/7982)
   在 JSON/RPC `message_update` 中保留累积 provider usage，同时继续省略累积 message 以保持流大小线性；附带 wire 格式文档和回归测试，直接关闭 #7911。

2. **feat(ai): 新增 Qwen Token Plan Individual CN provider** · 开启中
   [#7989](https://github.com/earendil-works/pi/pull/7989)
   新增中国区 Token Plan 订阅目录（cn-beijing），复用 `QWEN_TOKEN_PLAN_CN_API_KEY`，镜像 #7659，关闭 #7847。

3. **fix(coding-agent): 工具轮次之间执行压缩** · 已关闭
   [#7993](https://github.com/earendil-works/pi/pull/7993)
   工具批处理完成后即检查上下文，并将尾部 assistant/tool-result 消息纳入估算、刷新阈值。解决长工具循环在 `agent_end` 前越界导致的溢出问题。

4. **fix(edit): 单对象 edits 参数规范化 + 折叠模糊匹配空白** · 已关闭
   [#7978](https://github.com/earendil-works/pi/pull/7978)
   将单对象 `{oldText, newText}`（或 JSON 字符串）规范化回数组，同时在 fuzzy match 中折叠连续空白。一次 PR 回应 #7835 和 #7836 两个 issue。

5. **fix(ai): AWS_PROFILE 时尊重 profile 中的 region** · 已关闭
   [#1800](https://github.com/earendil-works/pi/pull/1800)
   设置 `AWS_PROFILE` 但无 `AWS_REGION` 环境变量时，Bedrock provider 不再硬编码 `us-east-1`，改为读取 `~/.aws/config` 中 active profile 的 region。

6. **fix(ai): 所有 provider 统一映射 models.dev cost tiers** · 开启中
   [#7981](https://github.com/earendil-works/pi/pull/7981)
   此前只有 github-copilot 使用 models.dev 的 tier 成本映射，其余 provider 均用四个标量值内联建 cost，导致多档定价模型计费不准。修复 #7912。

7. **fix(coding-agent): 升级 grok-mermaid 至 0.2.3** · 开启中
   [#7984](https://github.com/earendil-works/pi/pull/7984)
   修复 Mermaid 图渲染问题（#7832），类定义暂被忽略，渲染效果对比明显改善。

8. **feat(coding-agent): HTML 导出中渲染 Mermaid 图** · 开启中
   [#7956](https://github.com/earendil-works/pi/pull/7956)
   复用 TUI 的 Mermaid 渲染逻辑，将 ANSI 渲染结果转换为 HTML；默认折叠、可从头部展开，让导出文档与终端体验对齐。

9. **fix(tui): 选择复制改为经由宿主剪贴板，不再虚假提示 "Copied!"** · 已关闭
   [#7972](https://github.com/earendil-works/pi/pull/7972)
   原来直接写 OSC 52 序列并总是闪烁 "Copied!"，在 macOS Terminal.app、VTE 系终端和未开启 OSC 52 的 tmux 中实际并未复制成功。现在先写入宿主剪贴板再显示提示。

10. **feat(tui): 新增 copyOnSelect 开关** · 已关闭
    [#7866](https://github.com/earendil-works/pi/pull/7866)
    允许用户在 TUI 全屏模式下禁用鼠标选中即复制到剪贴板的行为，默认保持原行为 `true`。

---

### 功能需求趋势

从全部 50 条 Issue 中提炼社区最关注的方向：

- **新模型 / Provider 接入**：AIHubMix（#7992）、Qwen Token Plan CN（#7989）等提交表明社区希望 Pi 能更快接入更多 API 渠道，尤其是中国区 endpoint。
- **会话管理更精细**：Compaction 独立 thinking 级别/模型（#7553）、工具批量执行后即时压缩（#7993）、usage 在流式事件中全程可见（#7911）——用户需要更细粒度的上下文与计费控制。
- **工具调用健壮性**：`edit` 工具的参数格式宽容度（#7835）、模糊匹配白空格处理（#7836）、`prepareArguments` 修复不可达（#7944）、subagent 示例数组 form tools 崩溃（#7964）——这一系列问题集中暴露了模型输出与工具 schema 之间的“最后一公里”仍需加固。
- **性能基准透明化**：#7739 提出为 Pi 设立对标 jcode 的启动时间/内存预算，结合 #7730 的长会话 CPU 飙升，说明开发者开始将 Pi 作为日常主力工具来评估资源效率。
- **TUI / 终端体验**：tmux 内 Kitty 图片直通（#7936）、HTML 导出渲染 Mermaid（#7956）、fullscreen 滚动位置指示（#7970）、复制行为可配置（#7866/#7972）——终端体验的打磨点从“能用”转向“好用”。
- **跨平台兼容性**：Windows CMD 输出异常（#7947）、WSL 登录挂起（#6187）、bun runtime 崩溃（#7846）、OpenRouter / Anthropic 系列缓存与 reasoning 兼容（#7938/#7994-#7996）仍是高频问题。

---

### 开发者关注点

来自 Issue 反馈中的高频痛点和共性诉求：

- **登录链路的稳定性**：WSL 授权回调感知失败（#6187）、Copilot 组织账号 429 限流（#7850/#7428）等多起登录问题并发，说明 device authorization 完成后的客户端回调与组织级模型数量触发的限流是当前两大薄弱点。
- **会话数据一致性**：#7937 指出 `pi-coding-agent` 与 `pi-agent-core` 在包版本同为 0.84.1 时对 session JSONL 的版本要求不一致（v3 vs v4），轻度使用即可能遇到 “Invalid JSONL v4 session” 的硬错误。
- **配置系统的可诊断性**：无效 `settings.json` 被静默忽略并给出误导性的 “bash not found” 错误（#7829）；`--thinking` CLI 参数不生效、沿用上次模式（#7966）；keybinding 硬编码绕过配置（#7939）。配置层需要更强的校验与错误提示。
- **WebSocket / SSE 连接韧性**：OpenAI 兼容 SSE 无 inactivity timeout 可永久挂起（#7954）、WebSocket 重试只覆盖两种错误码（#7444）——在弱网或网关不稳定场景下，用户的容错体验依赖更全面的重试策略。
- **资源占用与长会话退化**：Mac 端长会话 CPU 高占（#7730）、进程内存 600-800MB，是性能类反馈中最具体的一例；结合启动延迟诉求（#7739），性能已从“能跑”升级为“要求可度量、可对标”。
- **文档与发现性问题**：技能目录中的 `README.md` 等根级文档被误加载为 skill（#7805）、已发布包在 gallery 中不展示（#7987）——异常静默或错误引导会显著增加排查成本，开发者希望这类问题至少给出明确警示。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-12

## 今日速览

今日发布 `v0.21.10` 稳定版及多个 preview/nightly/桌面端版本，核心更新围绕 ACP 推理强度配置、WebShell 图片预览、桌面端历史分页稳定性。Issue 侧最热话题是 tmux/iTerm 闪屏、会话恢复超时、headless 错误被误报为成功；PR 侧则集中在 WebShell 工作流可视化、tmux 交互式子代理、会话生命周期管理和安全依赖升级。

## 版本发布

- **v0.21.10（stable）**：新增 ACP 支持，可通过会话配置将 reasoning effort 从 Default 调整到 Max（[#8526](https://github.com/QwenLM/qwen-code/pull/8526)）；WebShell 中点击上传/粘贴的图片可在 artifact 中预览。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10)
- **v0.21.11-preview.0**：修复 web-shell 会话导航的 prompt 安全性（[#8931](https://github.com/QwenLM/qwen-code/pull/8931)）；serve 端增加会话续期准入日志。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-preview.0)
- **v0.21.10-nightly.20260812.a64d1291d2**：包含上述 web-shell 修复的夜间构建快照。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10-nightly.20260812.a64d1291d2)
- **desktop-v0.2.0**：桌面端修复 transcript 历史分页稳定性（[#8914](https://github.com/QwenLM/qwen-code/pull/8914)）；WebShell 支持共享会话目录。[Release](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.0)
- **live-host-v0.1.1**：CLI 在选择 sandbox runtime 前先进行探测（[#7734](https://github.com/QwenLM/qwen-code/pull/7734)）；autofix scan-and-pick 操作序列化。[Release](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.1.1)
- **dsw-eas-smoke-20260812-281542bfdc**：非生产基础设施 smoke，不发布 SWE score。[Release](https://github.com/QwenLM/qwen-code/releases/tag/dsw-eas-smoke-20260812-281542bfdc)

## 社区热点 Issues

1. **[#8678] [P1] 大 session restore 超时时应保留当前会话**：`fix(serve)` 相关 issue，PR #8691 已合并，实现超时契约、迟到请求安全和可观测性。恢复超时可能让用户丢失当前会话，是高风险可靠性问题。7 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8678)

2. **[#8562] tmux 内闪屏问题**：用户通过 Mac iTerm2 → SSH → Ubuntu → tmux 使用 Qwen Code，对话时屏幕持续闪烁，已定位到 Qwen Code 版本。同主题 issue #8901 也报告了 iTerm 闪屏，说明渲染问题并非个例。7 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8562)

3. **[#8897] CLI `--help` 缺少已注册参数**：`--approval-mode` 和 `--auth-type` 已被注册和校验，但不出现在 `qwen --help` 中，影响可发现性和自动化脚本维护。5 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8897)

4. **[#8724] 跨会话消息传递**：社区希望同机 Qwen Code 会话之间可以互相发现、寻址和发送消息，并要求接收端带显式 fail-closed 门控。这反映了 agent-to-agent 协作的需求。5 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8724)

5. **[#8504] Provider 更新提示在保留自定义模型后重复出现**：当 provider 配置含用户自定义模型时，内置 provider 更新即使成功结束，仍会反复弹出更新提示。5 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8504)

6. **[#8584] Anthropic 模型 ID 解析缺陷**：不支持 `claude-opus-4.8` 这类点号小版本别名，且缺少 Opus 5 token limits，影响代理部署和使用最新 Anthropic 模型的用户。4 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8584)

7. **[#8920] headless stream-json 模式下 API 错误被包装成成功**：OpenAI API 失败时，CLI 仍输出 `"result","subtype":"success"` 并 exit 0，会严重误导 CI/自动化流程的判断。4 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8920)

8. **[#8644] Windows 下聊天区文件链接无法打开**：Windows 盘符中的冒号被 URL 编码为 `file:///d%3A/...`，VS Code 无法打开文件，影响 Windows 开发者日常使用。4 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8644)

9. **[#8963] yolo/auto 模式无法运行长任务**：用户反馈无论选择什么模式，执行长脚本或命令都会卡住，无法完成需要数小时甚至数天的任务，并被拿来与 Kimi Code 对比。4 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8963)

10. **[#8944] npm update 后报告 2 个 high severity 漏洞**：自 0.21.0 起每次更新都提示存在高危依赖漏洞，社区期待安全侧尽快修复。3 条评论。[链接](https://github.com/QwenLM/qwen-code/issues/8944)

## 重要 PR 进展

1. **[#8974] feat(web-shell): configure Qwen 3.8 reasoning**：为 `qwen3.8-max` 提供 Thinking 和 low/medium/xhigh effort 控制，是目前 live session 的推理配置能力补强。[链接](https://github.com/QwenLM/qwen-code/pull/8974)

2. **[#8950] feat(web-shell): visualize and manage dynamic workflow runs**：工作流运行成为后台任务，提供实时执行图、阶段泳道、依赖边、token/审批状态，以及 pause/resume/stop/retry/rerun 控制，进一步提升 WebShell 的可观测性。[链接](https://github.com/QwenLM/qwen-code/pull/8950)

3. **[#8613] feat(web-shell): tmux-backed interactive terminal sub-agent**：允许 agent 在 daemon 宿主 tmux 中运行 REPL、CLI 或 TUI，并在 WebShell 中展示实时终端视图，是交互式 agent 能力的重要扩展。[链接](https://github.com/QwenLM/qwen-code/pull/8613)

4. **[#8939] fix(webui): Make same-session refresh transactional**：让同逻辑会话的 load、resume、rebind 在 daemon 上变为事务性操作，避免刷新或重绑时中断 attachment、transcript、event stream 等关键状态。[链接](https://github.com/QwenLM/qwen-code/pull/8939)

5. **[#8955] fix(web-shell): Harden prompt admission ownership**：在异步准入和懒加载后重新校验 App 生命周期、逻辑会话 owner、composer source 和 write-gate generation，防止过期的提交写入错误会话。[链接](https://github.com/QwenLM/qwen-code/pull/8955)

6. **[#8927] feat(channels): bound session lifetime with sessionRotation**：新增 per-channel `sessionRotation`，支持按 `maxTurns` / 时长限制自动轮换 session，避免路由长期复用同一个会话。[链接](https://github.com/QwenLM/qwen-code/pull/8927)

7. **[#8687] feat(daemon): guard cross-worktree Git mutations**：在 `qwen serve` 中识别 `-C`、`--work-tree`、`--git-dir` 等参数，阻止模型发起的 shell 命令越出当前会话工作区执行 Git 变更，属于安全加固。[链接](https://github.com/QwenLM/qwen-code/pull/8687)

8. **[#8966] fix(config): accept output.format "stream-json" in settings schema**：让 settings schema 接受 `stream-json`，与 CLI 运行时行为对齐，修复合法配置被校验拒绝的问题。[链接](https://github.com/QwenLM/qwen-code/pull/8966)

9. **[#8961] fix(ci): make autofix verification gates hermetic to runner git config**：使 autofix 验证门禁不受 runner 宿主 git 配置影响，并修复宿主 git 配置本身，提升 CI 稳定性。[链接](https://github.com/QwenLM/qwen-code/pull/8961)

10. **[#8952] chore(deps): bump sharp to ^0.35.0 to resolve GHSA-f88m-g3jw-g9cj**：升级 sharp 图像库至 0.35.3，修复已知安全漏洞，同时保持动态 import 路径兼容。[链接](https://github.com/QwenLM/qwen-code/pull/8952)

## 功能需求趋势

- **WebShell / daemon 平台化**：动态工作流可视化（[#8950](https://github.com/QwenLM/qwen-code/pull/8950)）、tmux 交互式终端（[#8613](https://github.com/QwenLM/qwen-code/pull/8613)）、MCP 2026-07-28 与 MCP Apps 支持（[#8968](https://github.com/QwenLM/qwen-code/issues/8968)）都指向 WebShell 正在成为远程开发与团队协作的主入口。
- **会话生命周期与状态可靠性**：large restore 超时（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)）、多 workspace 冷加载选错 runtime storage（[#8909](https://github.com/QwenLM/qwen-code/issues/8909)）、sessionRotation（[#8927](https://github.com/QwenLM/qwen-code/pull/8927)）显示社区对长会话恢复、多会话隔离和状态一致性要求越来越高。
- **模型与 Provider 生态兼容**：Anthropic 模型别名解析（[#8584](https://github.com/QwenLM/qwen-code/issues/8584)）、MiniMax 图像生成（[#8322](https://github.com/QwenLM/qwen-code/pull/8322)）、Kimi / Xiaomi MiMo providers（[#8368](https://github.com/QwenLM/qwen-code/pull/8368)）表明用户在积极要求更多第三方模型和推理控制支持。
- **Agent 自治与自动化可靠性**：长任务自动执行（[#8963](https://github.com/QwenLM/qwen-code/issues/8963)）、autofix 门禁隔离（[#8961](https://github.com/QwenLM/qwen-code/pull/8961)）、headless 模式正确退出码（[#8920](https://github.com/QwenLM/qwen-code/issues/8920)）说明无人值守场景的可信度已成为关注重点。
- **安全与依赖治理**：npm 高危漏洞反馈（[#8944](https://github.com/QwenLM/qwen-code/issues/8944)）、sharp 安全升级（[#8952](https://github.com/QwenLM/qwen-code/pull/8952)）、跨 worktree Git 防护（[#8687](https://github.com/QwenLM/qwen-code/pull/8687)）都显示社区对供应链和运行安全敏感度在上升。

## 开发者关注点

- **终端闪屏问题高频**：tmux/iTerm 下渲染闪烁已有多个独立反馈（[#8562](https://github.com/QwenLM/qwen-code/issues/8562)、[#8901](https://github.com/QwenLM/qwen-code/issues/8901)），涉及 Mac/Linux 远程开发场景，用户期望优先修复。
- **长任务自动模式不稳定**：yolo/auto 下长任务会卡住，用户直言“无法完成需要一整夜或数天的长任务”，并对比 Kimi Code 表示不满（[#8963](https://github.com/QwenLM/qwen-code/issues/8963)）。
- **会话恢复/切换不能丢状态**：large restore 超时和 multi-workspace 冷加载问题，都可能导致会话串台或丢失（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)、[#8909](https://github.com/QwenLM/qwen-code/issues/8909)）。
- **Headless/CLI 语义需要更严谨**：API 错误被包装成 success 并 exit 0（[#8920](https://github.com/QwenLM/qwen-code/issues/8920)）、`--help` 不完整（[#8897](https://github.com/QwenLM/qwen-code/issues/8897)）都会影响脚本和 CI 的可靠性。
- **Windows 与工具行为细节**：Windows 盘符冒号 URL 编码导致文件链接打不开（[#8644](https://github.com/QwenLM/qwen-code/issues/8644)）；并行 `read_file` 结果合并（[#8940](https://github.com/QwenLM/qwen-code/issues/8940)）、Shell 忽略 `truncateToolOutputThreshold`（[#8922](https://github.com/QwenLM/qwen-code/issues/8922)）也是高频痛点。
- **Provider 更新提示与模型配置不一致**：更新提示承诺切换模型但实际未执行（[#8948](https://github.com/QwenLM/qwen-code/issues/8948)），自定义模型被保留时仍反复提示更新（[#8504](https://github.com/QwenLM/qwen-code/issues/8504)），容易让用户对配置状态产生误解。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

好的，这是 2026-08-12 的 DeepSeek TUI 社区动态日报。

---

# DeepSeek TUI 社区动态日报 — 2026-08-12

## 1. 今日速览
今日社区主要聚焦于**v0.9.5 版本的回归问题**，特别是 Auto-Review 模式误拦截所有工具调用和输出区域宽度异常，开发者反馈集中；同时，维护者 Hmbown 拉起了**针对复杂 agent 工具 schema 的简化重构**，旨在解决模型频繁报错的问题。此外，**PR #5326 针对官方社区网站进行了审计修复**，PR #5319 则修复了复制消息带 UI 装饰的长期痛点。

## 3. 社区热点 Issues（10 个）

1. **[#5323 [bug] v0.9.5 回归：Auto-Review 模式静默阻止所有 Bash 调用和写入操作](https://github.com/Hmbown/CodeWhale Issue #5323)**
   - **重要性**：严重功能回归。该 Issue 指出升级到 v0.9.5 后，原本应自动批准的 Auto-Review 模式开始将所有工具调用视为“破坏性操作”并静默拦截，直接破坏自动化工作流。创建于 08-12，社区反应迅速，已有 2 条评论确认。

2. **[#5324 agent tool: 简化 32 字段 schema，防止模型持续报错](https://github.com/Hmbown/CodeWhale Issue #5324)**
   - **重要性**：核心架构问题。模型面对的 `agent` 工具拥有 32 个属性的 JSON Schema，零必填字段，却承载 8 种动作。这导致模型频繁错误调用，维护者直接以 Issue 形式提出简化方案，指向未来的 `agent` 工具重构方向。

3. **[#5314 复制消息包含 UI 装饰符号（● ▏），应像选区复制一样净化为纯文本](https://github.com/Hmbown/CodeWhale Issue #5314)**
   - **重要性**：直接影响用户体验。用户从右键菜单复制消息时，内容会带上角色图标和换行 rail 字符，污染剪贴板。该 Issue 与 PR #5319 直接对应，属于“提出即修复”的高质量反馈。

4. **[#5322 回归：输出区域无法撑满宽屏终端（v0.8.65 正常）](https://github.com/Hmbown/CodeWhale Issue #5322)**
   - **重要性**：视觉/布局回归。用户在宽屏显示器下，输出内容被限制在最大宽度内，导致大量空白。虽然反馈晚于 08-12，但问题清晰，指向 UI 渲染逻辑的改动。

5. **[#5291 v0.9.5 RC：修复过时的推理提示和终端间距](https://github.com/Hmbown/CodeWhale Issue #5291)**
   - **重要性**：维护者自查的 dogfood 问题。模型响应完成后，“Space to expand” 提示仍残留。该 Issue 已关闭，表明修复已完成，体现了维护者对细节的打磨。

6. **[#5316 EPIC-005: CodeWhale TUI Crate 分解（伞形追踪）](https://github.com/Hmbown/CodeWhale Issue #5316)**
   - **重要性**：项目级架构演进。由社区成员 aboimpinto 提出的史诗级重构追踪，旨在将 TUI 拆分为多个 crate。这代表了社区对项目长期可维护性的深度参与。

7. **[#4660 [enhancement] 自定义提供商和大模型配置，能否参考 kimi code？](https://github.com/Hmbown/CodeWhale Issue #4660)**
   - **重要性**：高频功能需求。用户希望支持自定义 API 提供商，并引用了 Kimi Code 的配置方案。虽创建较早，但在 08-12 仍有更新，说明社区对“去中心化模型接入”的需求依然强烈。

8. **[#4683 [bug] 错误的 deepseek completions url](https://github.com/Hmbown/CodeWhale Issue #4683)**
   - **重要性**：稳定性问题。用户报告在长时间使用后出现网络请求失败，提示请求 `api.deepseek.com/v1/chat/completions` 出错。该问题处于 `needs-info` 状态，是间歇性故障，影响核心使用。

9. **[#4959 [enhancement] 提议新增 'stop' 命令](https://github.com/Hmbown/CodeWhale Issue #4959)**
   - **重要性**：安全与控制的呼声。在 YOLO/自主工作流模式下，文本命令 `stop` 会被忽略，用户需要一个“机械”层面的停止开关。该 Issue 有 8 条评论，说明讨论热烈，是重要的安全改进方向。

10. **[#5241 价格端点返回 503，所有会话显示未验证实时定价](https://github.com/Hmbown/CodeWhale Issue #5241)**
    - **重要性**：费用显示功能异常。升级 v0.9.3 后，所有会话成本无法显示，统一报 `unverified_live_pricing`。这影响了用户的成本追踪，属于服务端或 API 集成的可靠性问题。

## 4. 重要 PR 进展（5 个）

1. **[#5326 web: 审计修复 — i18n 一致性、文案/间距、测试修复](https://github.com/Hmbown/CodeWhale PR #5326)**
   - **功能**：对社区网站进行清理。修复了“文档与契约测试不一致”的问题，并检查了全站文案与间距。维护者主导，质量保障性质。

2. **[#5319 fix(tui): 复制消息时不带视觉 rail](https://github.com/Hmbown/CodeWhale PR #5319)**
   - **功能**：直接修复 Issue #5314。用户消息和助手消息复制时改用规范源内容，而非渲染后的 Ratatui 行。工具/思考/系统消息则保留原完整路径，防止信息丢失。

3. **[#5321 feat: 注册 OrcaRouter 作为 named provider](https://github.com/Hmbown/CodeWhale PR #5321)**
   - **功能**：新增第三方 OpenAI 兼容网关 OrcaRouter，支持 150+ 模型。按现有 OpenRouter 方式接入，完善模型选择器与配置引用。

4. **[#5320 fix(session): 将快照读取与崩溃恢复分离](https://github.com/Hmbown/CodeWhale PR #5320)**
   - **功能**：重构会话层。新增 `load_session_snapshot` 用于无副作用读取，`recover_session_for_resume` 用于明确的重启恢复，并返回修复统计，改善嵌入场景下的稳定性。

5. **[#5318 feat(tui): Windows 宿主终端窗口支持画中画（置顶迷你窗）](https://github.com/Hmbown/CodeWhale PR #5318)**
   - **功能**：Windows 专属体验优化。通过右键菜单或 `/pin` 命令，将终端窗口缩小为 640x400 并置顶，再次触发则还原。适合边看文档边跑 agent 的场景。

## 5. 功能需求趋势
- **命令行控制与安全**：`/stop` 命令、运行时 STOP 拦截（#4959）是强烈诉求，用户要求能在自动化失控时有“物理中断”能力。
- **第三方提供商接入**：自定义 API Base URL 与 key 管理依旧热门（#4660），新增 named provider 的 PR（#5321）表明官方正在扩展接入生态。
- **会话鲁棒性与恢复**：处理网络波动（#4683）、快照恢复与崩溃恢复分离（#5320）是用户和开发者共同关注的可靠性方向。
- **UI/UX 细节打磨**：复制内容净化（#5314）、宽屏适配（#5322）、画中画模式（#5318）均指向终端界面精细化体验。

## 6. 开发者关注点
- **回归问题反馈迅速**：v0.9.5 引入的自动审批失效（#5323）和宽度限制（#5322）在发布后迅速被开发者捕获，社区对行为变化非常敏感。
- **Schema 复杂性反噬模型**：#5324 表明工具定义过于复杂会直接降低模型调用成功率，开发者希望工具 Schema 更简单、意图更明确。
- **社区自主性增强**：EPIC-005（#5316）由社区成员主导提出大型架构重构，显示核心用户群体已深入参与项目演进，而非仅停留在使用层面。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*