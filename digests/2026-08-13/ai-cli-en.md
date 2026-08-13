# AI CLI Tools Community Digest 2026-08-13

> Generated: 2026-08-13 09:48 UTC | Tools covered: 10

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

## Cross-Tool Comparison

# AI CLI Tools Cross-Tool Comparison Report — 2026-08-13

## 1. Ecosystem Overview

The AI CLI ecosystem is in a high-velocity reliability phase: of the 10 tracked tools, 6 shipped releases today, but all were patches, alphas, nightlies, or maintenance releases — no major feature launches. Engineering effort is concentrated on hardening: context compaction, OAuth/MCP transport, sandbox security, Windows stability, and release automation. Qwen Code came closest to a feature release (native multi-agent `/coordinate` and Agent Plugins v1 in v0.21.11). The broader pattern is clear: every tool is transitioning from "chat wrapper" to "agent runtime platform" — adding subagents, plugins, fleet orchestration, and persistent memory — while still wrestling with the same fundamentals: session state integrity, context-window management, usage metering, and cross-platform parity.

## 2. Activity Comparison

| Tool | Digest-Highlighted Issues | Active PRs | Releases (24h) | Release Type |
|---|---|---|---|---|
| Claude Code | 10+ (plus 5-issue Windows regression cluster) | 2 merged (docs) | 2 | Patch (v2.1.229, v2.1.231) |
| OpenAI Codex | 10 | 10 | 2 | Rust alpha (v0.148.0-alpha.11/.12) |
| Gemini CLI | 10 | 10 | 1 | Nightly (v0.56.0-nightly) |
| GitHub Copilot CLI | 10 | 2 touched | 0 | — |
| Kimi Code CLI | 1 | 2 | 0 | — |
| OpenCode | 10 | 10 | 2 | Patch (v1.18.17, v1.18.18) |
| Pi | 10 | 10 | 0 | — |
| Qwen Code | 10 | 10 | 3 | Minor + preview + desktop |
| DeepSeek TUI / CodeWhale | 10 | 10 | 1 | Minor (v0.9.7) |
| Grok Build | 0 | 0 | 0 | — |

*Counts reflect issues/PRs highlighted in today's community digests, not total repo volumes. Claude Code remains the highest-engagement community overall (e.g., 91-comment issue threads, 123👍 top feature request).*

## 3. Shared Feature Directions

**Persistent memory & cross-session state** — Appears in nearly every community:
- Kimi CLI: explicit Memory System request (#1283, 37 comments, open 6 months) — the tool's dominant ask
- Claude Code: CLI↔desktop history sync (#28791, 123👍 — highest-voted open request) and on-disk transcript portability (#81835)
- Gemini: Auto Memory retry hygiene (#26522)
- Qwen: pinned/read-only memory protected from consolidation (#6801)
- OpenCode: memory/storage megathread (#20695, 97👍)

**Context compaction & storage bloat** — The "new garbage collection":
- Pi: auto-compaction never fires before provider overflow (#6879); output-token reservation ignored (#8061)
- Codex: full base64 images persist into compacted checkpoints, causing compaction loops (#23257, #33493)
- OpenCode: 13GB+ SQLite growth from unpruned `event` snapshots (#33356); bounded compaction requests (#36589)
- Claude Code: bundled grep OOMs on complex patterns (#67021)

**Multi-agent orchestration & trust**:
- Gemini: subagent MAX_TURNS interruption reported as "success" (#22323, P1) — dangerous false-success masking
- Qwen: native fleet coordination via `/coordinate` and supervised teammate runtime (#8718, #8841)
- Copilot CLI: model-emitted arguments silently override review strategy (#4432); explicit subagent model overrides ignored (#4462)
- Claude Code: per-skill plugin disablement (#14920, 86👍)
- Codex: subagent provider selection transparency (#17312)

**Cross-device / desktop↔CLI continuity**:
- Claude Code #28791, Codex #21803 (cross-device sync) and #31187 (mobile remote), Copilot CLI session-listing (#4470), Pi shared agent-directory permissions (#7779)

**Usage & billing transparency**:
- Claude Code: Max quota consumed while idle (#82506, #81684)
- Codex: Pro (20x) accounts receiving effective 5x capacity (#38157)
- OpenCode: free-vs-subscription confusion (#42143), Zen upstream auth blocks (#39827)
- Gemini: capacity-exhaustion retry regression — unattended runs stall (#28790)

**Windows parity** — A cross-tool weak spot:
- Claude Code: GPU crash kills all sessions (#81698); 5+ cross-session messaging regressions in 48h
- Codex: extension fails to load (#37458); `browser.tabs.finalize()` terminates the app (#35210); missing remote-control tab (#28919)
- Copilot CLI: Ctrl+H misread under WSL2 (#4328); socket error 10013 (#4463)
- Qwen: visible runtime Terminal on Windows Desktop (#9043)
- Pi: misleading "bash not found" instead of real config parse error (#7829)

**Headless/CI reliability**:
- OpenCode: `opencode run` sleeps indefinitely on quota exhaustion (#40747, fix PR #42289)
- Gemini: silent retry + backoff for capacity errors (#28790)
- Claude Code: auto-continue after rate-limit reset (#35744, 86👍)
- Qwen: `NO_TOOL_RESULT_PROGRESS` aborts headless runs (#9026)

## 4. Differentiation Analysis

- **Claude Code** is the most mature, broadest platform: plugins, skills, hooks, remote control, desktop+CLI. Enterprise-oriented. Its digest shows risk-management mode — merging only docs PRs while absorbing Windows regression clusters and quota-trust issues.
- **OpenAI Codex** is the most aggressive engineering effort: 10 PRs in 24h (sandbox hardening, durable thread reverts, interrupted-turn recovery, gRPC code-mode hosts). Distinct via its Rust rewrite, managed Enterprise thread-credit surfaces, and a security-first sandbox posture.
- **Gemini CLI** differentiates on agent-correctness and evaluation infrastructure: behavioral evals, tool-call validation, failure summaries, plus security hardening (variable-expansion bypass, corrupt MCP config fail-open). Most eval-driven of the group; closest to Vertex AI.
- **GitHub Copilot CLI** is the most GitHub-native: org-managed models, hooks, marketplace plugins, BYOK, cross-model "rubber-duck" review. Targets existing Copilot enterprise customers. Quiet release cadence, but steady issue intake around MCP/OAuth and model-override bugs.
- **OpenCode** is the open-source breadth play: local SQLite, self-hostable, multi-provider (Zen/Go subscriptions), and community demands like crypto payments (#23153). Fast PR throughput but visible architectural debt (unbounded DB, headless hangs, updater breakage).
- **Pi** is the terminal power-user's multi-provider tool: xAI, Bedrock Mantle, Anthropic Vertex, local Ollama support, with a JSON/RPC wire protocol for automation. Focuses on TUI extensibility (mouse hooks, visual-line caching) and raw terminal correctness (CJK widths, rendering performance).
- **Qwen Code** is the most ambitious on background automation: daemon-owned sessions, `/coordinate` teammates, live-session registry (`qwen sessions ps`), pollable daemon turn status, and OpenTelemetry log correlation. Also making a bold desktop pivot from Electron to Tauri.
- **DeepSeek TUI / CodeWhale** is a Rust TUI in formal rebrand. Distinct: "constitution" governance model, strict MCP spec compliance, deep Chinese i18n work. Maintainers are performing heavy community-PR harvesting due to base-drift friction.
- **Kimi Code CLI** shows the smallest digest footprint but a clear strategic signal: the memory-system request dwarfs everything else. Early-stage community, high pent-up demand for statefulness.
- **Grok Build** was inactive.

## 5. Community Momentum & Maturity

- **Fastest iterating**: OpenAI Codex (2 alpha releases, 10 security/stability PRs), Qwen Code (3 releases including multi-agent features and desktop deprecation), OpenCode (2 patches, 10 PRs), Gemini CLI (nightly + 10 PRs including P1 security fixes). These four are making deep architectural changes — Rust rewrites, daemon session models, eval pipelines — not just surface fixes.
- **Most engaged community**: Claude Code has the broadest sustained traffic (123👍 top request, multiple 90+ comment threads, a 48-hour Windows regression cluster). Codex has the hottest single issues by reaction count (LSP integration 449👍, macOS `syspolicyd`/`trustd` runaway 392👍).
- **Quiet but active**: Copilot CLI ships little but absorbs steady enterprise feedback. Pi and CodeWhale maintain solid PR throughput without releases. Kimi has minimal issue traffic today, indicating either early-stage community or users concentrated on the memory request.
- **Maturity signal**: Claude Code's release today was purely corrective (MCP OAuth, SSE keepalive); Copilot CLI and Kimi had no releases. The tools with the most architectural runway (Codex, Qwen, Gemini, OpenCode) are the ones shipping most frequently — a sign that the competitive frontier is still being built, not yet consolidated.

## 6. Trend Signals

1. **Persistent memory is the next moat.** Nearly every community independently requests cross-session project memory, CLI↔desktop sync, or stateful context (Kimi #1283, Claude #28791, Qwen #6801, Gemini #26522, OpenCode #20695). Tools that deliver reliable, privacy-respecting memory will win long-running agent workflows.
2. **Context compression is the universal weak point.** Compaction loops, image base64 leaks, oversized event tables, and grep OOMs appear in 6 of 9 active tools. Expect a "compaction arms race": bound serialization, per-step threshold checks, and token-budget reservation become table stakes.
3. **Subagent trust is the next bottleneck.** False-success reports (Gemini P1), silent model overrides (Copilot), and skills used only when explicitly prompted (Gemini #21968) show multi-agent features are shipping faster than their verification. Gemini's behavioral-eval investment is the leading corrective pattern.
4. **Windows is still the frontier — and now a due-diligence question.** Regression clusters in Claude Code, Codex, Copilot CLI, Qwen, and Pi show that Windows reliability requires dedicated CI/QA investment. For enterprise buyers, Windows parity is becoming a selection criterion.
5. **Usage metering opacity is a business risk.** Quota consumed without usage (Claude Code), effective-capacity downgrades (Codex), and free-vs-paid confusion (OpenCode) erode the trust needed for AI spend at scale. Transparent metering and auto-continue/resume behavior will become differentiators.
6. **Symbolic code intelligence (LSP/AST) is the next feature frontier.** Codex's LSP request is the highest-voted feature across all digests (449👍), and Gemini's AST-aware tooling EPIC (#22745) points the same direction: beyond grep-and-embed toward structured code understanding.
7. **Headless/CI behavior determines enterprise adoption.** Infinite sleeps (OpenCode), missing auto-continue (Claude Code), and capacity retry gaps (Gemini) show that automation buyers will evaluate tools on exit codes, retry semantics, and honest error reporting — Qwen's pollable daemon-turn-status endpoint is a good reference design.

---

**Bottom line for decision-makers**: The ecosystem is converging on the same roadmap — memory, compaction, trustworthy subagents, and Windows parity — while differentiating on architecture (Rust/daemon/thread models), ecosystem lock-in (GitHub, Vertex, OpenAI Enterprise), and open-source flexibility (OpenCode, Pi). Codex, Qwen, Gemini, and OpenCode are the fastest movers; Claude Code has the largest installed base but is in a defensive patch cycle. Evaluate tools on headless reliability and state management first; feature breadth second.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Source:** github.com/anthropics/skills | **Data as of:** 2026-08-13

---

## 1. Top Skills Ranking

The 8 PRs below attracted the most sustained community attention — either through their own activity or through the GitHub Issues they reference.

| Rank | PR | Skill / Change | Highlights | Status |
|---|---|---|---|---|
| 1 | [#1298 – fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298) | Bug fix for the skill-creator evaluation pipeline | The most active discussion cluster in the repo. Root-causes the `recall=0%` bug reported in #556 and #1169 (10+ independent reproductions), fixing Windows stream reading, trigger detection, and parallel workers. Every downstream script (`run_loop.py`, `improve_description.py`) was "optimizing against noise." | Open |
| 2 | [#514 – Add document-typography skill](https://github.com/anthropics/skills/pull/514) | New skill: typographic quality control for generated documents | Prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents. Broadly applicable since "these issues affect every document Claude generates." | Open |
| 3 | [#1367 – feat: add self-audit skill](https://github.com/anthropics/skills/pull/1367) | New skill: mechanical file verification + four-dimension reasoning quality gate (v1.3.0) | Universal pre-delivery audit: verifies every claimed output file exists, then runs a damage-severity-ordered reasoning review. Linked to the community's growing interest in output quality gates (#1385). | Open |
| 4 | [#723 – feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723) | New skill: comprehensive testing stack coverage | Testing Trophy model, AAA unit-testing patterns, React Testing Library, and what-not-to-test guidance. Addresses a frequently requested code-quality direction. | Open |
| 5 | [#568 – feat: add ServiceNow platform skill](https://github.com/anthropics/skills/pull/568) | New skill: broad ServiceNow platform assistant | Covers ITSM, ITOM, ITAM/SAM, FSM, HRSD, CSM, SPM, Vulnerability Response, and IntegrationHub. Recently updated (2026-08-12), indicating active maintainer engagement. | Open |
| 6 | [#486 – Add ODT skill](https://github.com/anthropics/skills/pull/486) | New skill: OpenDocument (ODT/ODS) creation, template filling, and ODT→HTML parsing | Triggered by any mention of ODT/ODS/ODF/LibreOffice. Complements the existing DOCX/PDF skills for the open-source document stack. | Open |
| 7 | [#525 – Add pyxel skill](https://github.com/anthropics/skills/pull/525) | New skill: retro game development with Pyxel + pyxel-mcp | Workflow: write → run_and_capture → inspect → iterate. Notable as a skill built around an MCP server, illustrating the skills/MCP hybrid pattern. | Open |
| 8 | [#83 – Add skill-quality-analyzer and skill-security-analyzer to marketplace](https://github.com/anthropics/skills/pull/83) | Two new meta-skills: quality and security auditing for skills themselves | Evaluates skills across structure/documentation (20% weight) plus additional dimensions; security analyzer addresses the trust concerns raised in issue #492. | Open |

*Honorable mentions:* [#538 fix(pdf): case-sensitive file references](https://github.com/anthropics/skills/pull/538) and [#541 fix(docx): w:id collision with bookmarks](https://github.com/anthropics/skills/pull/541) — both small but critical correctness fixes for the document skills; [#1538 – bring two skills back under the Agent Skills spec](https://github.com/anthropics/skills/pull/1538) — spec-compliance enforcement.

---

## 2. Community Demand Trends

**Bug-reliability of the skill-creator toolchain (highest demand).** Issues [#556](https://github.com/anthropics/skills/issues/556) (12 comments), [#1169](https://github.com/anthropics/skills/issues/1169), and [#202](https://github.com/anthropics/skills/issues/202) describe a broken evaluation loop — `run_eval.py` reports 0% recall on every query, and `skill-creator` itself reads like developer documentation rather than an operational skill. The community clearly wants working, trustworthy skill-authoring tooling before anything else.

**Trust, security, and namespace integrity.** [#492](https://github.com/anthropics/skills/issues/492) — the most-commented issue at 43 comments — exposes that community skills under the `anthropic/` namespace create a trust-boundary vulnerability; users may grant elevated permissions to skills they mistake for official Anthropic skills. Related governance/security demand appears in [#1175](https://github.com/anthropics/skills/issues/1175) (SharePoint access-control in SKILL.md) and the closed [#412](https://github.com/anthropics/skills/issues/412) (agent-governance skill proposal).

**Organizational sharing and lifecycle management.** [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) asks for org-wide skill sharing in Claude.ai — no more downloading/sending `.skill` files via Slack. Related: [#189](https://github.com/anthropics/skills/issues/189) (duplicate skills from overlapping plugins, 9 👍) and [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` skill injecting ~156k tokens in one tool call) show demand for lean, deduplicated, context-efficient skills.

**Platform interoperability.** [#29](https://github.com/anthropics/skills/issues/29) (Bedrock usage) and [#16](https://github.com/anthropics/skills/issues/16) (expose Skills as MCPs) remain open and reflect demand for running skills beyond the Claude Code/Claude.ai silo.

**New proposed skill directions.** [#1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory` (symbolic notation for compact agent state); [#1385](https://github.com/anthropics/skills/issues/1385) proposes a three-gate Reasoning Quality Pipeline (pre-task calibration → adversarial review → delivery verification).

---

## 3. High-Potential Pending Skills

These PRs are open with strong scopes and recent maintainer/author activity — likely candidates to land soon:

- **[#723 testing-patterns](https://github.com/anthropics/skills/pull/723)** — full-stack testing coverage with a clear philosophy (Testing Trophy). Directly answers the community's code-quality demand.
- **[#568 ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)** — very broad enterprise coverage; last updated 2026-08-12, signaling active iteration toward merge.
- **[#514 document-typography](https://github.com/anthropics/skills/pull/514)** — fixes universal pain in AI-generated documents; low-risk, high-value addition alongside the existing DOCX/PDF skills.
- **[#486 ODT skill](https://github.com/anthropics/skills/pull/486)** — fills an obvious gap for LibreOffice/OpenDocument users; pairs naturally with the existing `docx`/`pdf`/`pptx` family.
- **[#525 Pyxel retro game dev](https://github.com/anthropics/skills/pull/525)** — niche but demonstrates skills + MCP integration; author is the pyxel-mcp maintainer.
- **[#83 skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** — meta-skills that would directly address the #492 trust issue and help standardize skill quality.
- **[#1479 plan-file-hygiene](https://github.com/anthropics/skills/pull/1479)** — tackles the accumulation of planning artifacts with no lifecycle; small, well-scoped, tied to an acknowledged gap (#1417).
- **[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)** — universal pre-delivery verification/reasoning audit; complements the quality-gate proposal in #1385.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **reliable, secure, and verifiable skill-development infrastructure** — fixing the broken skill-creator eval loop, restoring trust boundaries around community-published skills, and adding quality/audit layers that let users create and adopt skills with confidence.

---

# Claude Code Community Digest — 2026-08-13

## 1. Today's Highlights

Two patch releases landed (v2.1.229, v2.1.231), fixing MCP OAuth sign-in with pre-registered clients like Slack and adding remote-control/hook/SSE improvements. Community attention is concentrated on a wave of Windows desktop cross-session messaging regressions and repeated reports of Claude Max quota being consumed without actual usage. The most-upvoted open feature request remains CLI↔desktop conversation history sync (123 👍).

## 2. Releases

- [v2.1.231](https://github.com/anthropics/claude-code/releases/tag/v2.1.231)
  - Fixes MCP OAuth sign-in failing with a redirect URI mismatch for servers using pre-registered OAuth clients (e.g., Slack).

- [v2.1.229](https://github.com/anthropics/claude-code/releases/tag/v2.1.229)
  - Documented `claude remote-control --continue` for resuming the most recent Remote Control session.
  - Added server-supplied hook support for self-hosted runner sessions, matching managed-environment behavior.
  - Added SSE keepalive pings to gateway streaming responses.

## 3. Hot Issues

- [#71542 — GitHub connector links successfully but Claude cannot access content for ANY repository (account-wide regression)](https://github.com/anthropics/claude-code/issues/71542) · 48 👍 · 55 comments. A high-visibility regression affecting public and private repos alike; the community has been piling on confirmations for nearly two months.

- [#84352 — CVP-approved Claude.ai organization still receives cyber safeguard blocks in Claude Code](https://github.com/anthropics/claude-code/issues/84352) · 12 👍 · 91 comments. The most-commented issue today: an org with prior Cyber Verification Program approval is blocked again, and the Verification Portal shows "Under review" despite a prior approval email.

- [#3301 — Environment Contributions warning continuously reappears in Cursor/VSCode](https://github.com/anthropics/claude-code/issues/3301) · 70 👍 · 45 comments. A year-old papercut: the "extensions want to relaunch the terminal" warning reappears on every IDE open, with no suppression.

- [#28791 — Feature: Sync conversation history between CLI and Claude Code desktop app](https://github.com/anthropics/claude-code/issues/28791) · 123 👍 · 33 comments. The top-voted open request — users want unified, seamless session continuity across surfaces.

- [#82506 — Possible Claude Max usage bug: session limit consumed without using](https://github.com/anthropics/claude-code/issues/82506) · 7 👍 · 29 comments. Users report Max session limits being consumed while idle; related report [#81684](https://github.com/anthropics/claude-code/issues/81684) describes full quota exhaustion minutes after reset.

- [#81698 — Windows Desktop app: GPU process crash (exit code 101457950) kills app and all running sessions](https://github.com/anthropics/claude-code/issues/81698) · 0 👍 · 26 comments. A severe Windows stability issue where a GPU process crash takes down every active session.

- [#67021 — Bundled ugrep OOMs the host: `-E` with two bounded `{0,N}` intervals explodes DFA construction to multiple GB](https://github.com/anthropics/claude-code/issues/67021) · 3 👍 · 18 comments. A reproducible memory blowup in the bundled grep tool, notable for tooling that should be lightweight.

- [#35744 — Feature: Auto-continue after subscription rate limit resets](https://github.com/anthropics/claude-code/issues/35744) · 86 👍 · 16 comments. Long-running/overnight tasks stall on "5-hour limit reached" until a manual `continue`; users want automatic resumption.

- [#14920 — Feature: Allow disabling individual Claude plugin skills](https://github.com/anthropics/claude-code/issues/14920) · 86 👍 · 15 comments. Users want per-skill control (e.g., keep `:commit`, disable `commit-push-pr`) rather than all-or-nothing plugin enablement.

- [#24172 — CRITICAL: Conversations disappear when closing VSCode or navigating away](https://github.com/anthropics/claude-code/issues/24172) · 25 👍 · 13 comments. Chat history becomes unrecoverable on close/reopen and session switching — a data-loss issue labeled high-priority.

## 4. Key PR Progress

PR activity was light in the last 24 hours: only two merged PRs, both documentation cleanups by the same contributor.

- [#85925 — docs: point remaining stale doc links at code.claude.com](https://github.com/anthropics/claude-code/pull/85925). Follow-up cleanup replacing old-domain doc links (`docs.claude.com`) with canonical `code.claude.com` targets across plugins, skills, agents, commands, and issue-template contact links.

- [#85822 — docs: fix stale doc links and README drift in plugins and examples](https://github.com/anthropics/claude-code/pull/85822). Verified docs-only cleanup: updates hooks links in `bash_command_validator_example.py` and the plugins README link to their canonical URLs.

## 5. Feature Request Trends

- **Cross-surface session continuity**: Sync CLI/desktop transcripts ([#28791](https://github.com/anthropics/claude-code/issues/28791), 123 👍) and surface on-disk transcripts in the desktop app for cross-machine continuity ([#81835](https://github.com/anthropics/claude-code/issues/81835)).
- **Usage-limit ergonomics**: Auto-continue after subscription rate-limit resets ([#35744](https://github.com/anthropics/claude-code/issues/35744), 86 👍), alongside urgent bug reports about quota consumed without usage.
- **Plugin control & relevance**: Per-skill disablement ([#14920](https://github.com/anthropics/claude-code/issues/14920), 86 👍) and capping how often overlapping plugins are suggested ([#86098](https://github.com/anthropics/claude-code/issues/86098)).
- **Focus View refinement**: Keep human-related messages/tasks visible in the new Focus View ([#83746](https://github.com/anthropics/claude-code/issues/83746)).

## 6. Developer Pain Points

- **Windows desktop cross-session messaging is broken (regression cluster)**: A cascade of reports — recipient sessions unresponsive until idle-timeout kill ([#86012](https://github.com/anthropics/claude-code/issues/86012)), messages to paused sessions never delivered ([#86138](https://github.com/anthropics/claude-code/issues/86138)), messages silently dropped waiting for a UI approval that never appears ([#86298](https://github.com/anthropics/claude-code/issues/86298)), messages rendered but never enqueued ([#86237](https://github.com/anthropics/claude-code/issues/86237)), and background turns dying silently ([#86208](https://github.com/anthropics/claude-code/issues/86208)). All surfaced within 48 hours, pointing to a 2.1.222 → 2.1.227 regression.
- **Usage metering distrust**: Claude Max quotas consumed without usage ([#82506](https://github.com/anthropics/claude-code/issues/82506), [#81684](https://github.com/anthropics/claude-code/issues/81684)) — erodes confidence in subscription limits.
- **History/data fragility**: Conversations unrecoverable in VSCode ([#24172](https://github.com/anthropics/claude-code/issues/24172)), transcript reverted on account switch ([#73937](https://github.com/anthropics/claude-code/issues/73937)), and project relocation orphaning all session history/MEMORY.md because state is keyed by raw cwd path ([#71568](https://github.com/anthropics/claude-code/issues/71568)).
- **Silent background failures**: Scheduled-task registry wiped by an update with zero notification ([#85565](https://github.com/anthropics/claude-code/issues/85565)), paused scheduled tasks hidden from the Routines list ([#86115](https://github.com/anthropics/claude-code/issues/86115)), and workflow code-review PR posting reporting success while failing ([#84474](https://github.com/anthropics/claude-code/issues/84474)).
- **Windows reliability**: GPU process crashes killing all sessions ([#81698](https://github.com/anthropics/claude-code/issues/81698)) and auto-update writing a corrupted `claude.exe` that cannot self-recover ([#86295](https://github.com/anthropics/claude-code/issues/86295)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-13

## Today's Highlights
Two new Rust alpha releases (`v0.148.0-alpha.11` and `.12`) landed in the last 24 hours, while the repo saw a burst of stability and security-focused PRs: sandbox hardening, interrupted-turn recovery, and network-request approval routing. On the tracker, the macOS `syspolicyd`/`trustd` runaway bug remains the most-engaged issue (84 comments, 392 👍), and LSP integration remains the most-liked feature request (61 comments, 449 👍). Windows-specific regressions are the largest cluster of new pain points.

## Releases
- [rust-v0.148.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.12) — `0.148.0-alpha.12`
- [rust-v0.148.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.11) — `0.148.0-alpha.11`

No changelog details were provided beyond the version tags; both are incremental alpha releases.

## Hot Issues
- [#25719 — Codex Desktop for macOS triggers `syspolicyd` / `trustd` CPU and memory runaway](https://github.com/openai/codex/issues/25719)  
  84 comments, 392 👍. The most severe open performance bug: the desktop app causes macOS system daemons to spin, degrading the whole machine.

- [#28969 — Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969)  
  71 comments, 194 👍. Users want an explicit opt-out for the CLI auto-resolving prompts after 60 seconds, especially for longer async workflows.

- [#8745 — LSP integration (auto-detect + auto-install) for Codex CLI](https://github.com/openai/codex/issues/8745)  
  61 comments, 449 👍. The top feature request: built-in Language Server Protocol support for diagnostics and symbol intelligence.

- [#37458 — Codex extension fails to load resources in VS Code on Windows](https://github.com/openai/codex/issues/37458)  
  45 comments, 11 👍. Recent extension build breaks entirely on Windows with “The extension couldn't load its resources.”

- [#28919 — Windows Codex app missing “Control other devices” tab](https://github.com/openai/codex/issues/28919)  
  31 comments, 31 👍. Remote-control functionality is missing from Windows Settings > Connections, a platform-parity regression.

- [#32297 — Built-in image generation fails with network error after July 9 update](https://github.com/openai/codex/issues/32297)  
  23 comments, 8 👍. A user-visible regression: in-app image generation repeatedly fails after a desktop update.

- [#28726 — Codex IDE extension freezes code-server sidebar on Chromium](https://github.com/openai/codex/issues/28726)  
  20 comments, 5 👍. The extension makes browser-based VS Code (code-server) unusable in desktop Chromium.

- [#35210 — Windows: `browser.tabs.finalize()` silently terminates the entire app](https://github.com/openai/codex/issues/35210)  
  11 comments. A public Browser Use API call can kill the whole Codex Desktop process on Windows — a critical stability issue.

- [#23257 — Desktop compaction repeatedly embeds full image base64 in compacted checkpoints](https://github.com/openai/codex/issues/23257)  
  12 comments, 5 👍. Context compaction stores full base64 images, causing runaway checkpoint sizes and repeated compaction.

- [#33493 — Local compaction v2 retains unbounded `input_image` payloads](https://github.com/openai/codex/issues/33493)  
  10 comments, 3 👍. Image-heavy threads enter an auto-compaction loop because image payloads are never pruned.

## Key PR Progress
- [#15730 — Harden symlinked project config writes](https://github.com/openai/codex/pull/15730)  
  Protects `.codex/config.toml` as a read-only leaf and preserves intentional config symlinks, closing a sandbox retargeting risk.

- [#38306 — Protect inline visualization viewers from sandbox writes](https://github.com/openai/codex/pull/38306)  
  Moves inline viewer documents into a dedicated `CODEX_HOME` cache so sandboxed sessions cannot modify them before browser opening.

- [#38303 — Add interrupted turn recovery](https://github.com/openai/codex/pull/38303)  
  Adds `RecoverTurnRequest` and `recover_turn_if_idle` to resume interrupted turns with the same turn ID and updated thread settings.

- [#38299 — Route network access through the shared approval pipeline](https://github.com/openai/codex/pull/38299)  
  Blocked network requests become standard approval actions, so hooks, automatic review, and user review use one consistent flow.

- [#38292 — Add durable reverts for paginated threads](https://github.com/openai/codex/pull/38292)  
  Retains pre-revert history by switching to a new immutable rollout while preserving logical thread ID and session metadata.

- [#38288 — Support gRPC code-mode hosts in app server](https://github.com/openai/codex/pull/38288)  
  Accepts `http://` and `https://` code-mode hosts using the shared gRPC session provider; keeps WebSocket for `ws://`/`wss://`.

- [#38275 — Unify turn input submission and routing](https://github.com/openai/codex/pull/38275)  
  Adds atomic start/steer/decline turn APIs to consolidate submission paths on `CodexThread`.

- [#38282 — Add thread usage to TUI status surfaces](https://github.com/openai/codex/pull/38282)  
  Adds optional `thread-credits` and `estimated-thread-cost` status-line and terminal-title items for Enterprise workspaces.

- [#38281 — Show estimated thread usage in `/status`](https://github.com/openai/codex/pull/38281)  
  Extends `account/usage/read` with a backward-compatible `threadUsage` response, including model, reasoning, speed, and token breakdowns.

- [#38272 — Stamp conversation history items with creation times](https://github.com/openai/codex/pull/38272)  
  Adds fractional Unix creation times to locally authored user, developer, agent, and tool-output items in durable history.

## Feature Request Trends
- **Language-server-powered intelligence**  
  [#8745](https://github.com/openai/codex/issues/8745) remains the most-voted feature request: auto-detect and auto-install LSP servers for better diagnostics and symbol awareness.

- **Reducing unwanted automation**  
  [#28969](https://github.com/openai/codex/issues/28969) asks for disabling the 60-second auto-resolve, and [#26279](https://github.com/openai/codex/issues/26279) asks for folding verbose MCP tool results in the CLI TUI.

- **Multi-device continuity**  
  [#21803](https://github.com/openai/codex/issues/21803) requests cross-device sync for Projects and Chats; [#31187](https://github.com/openai/codex/issues/31187) requests multi-account and multi-machine mobile Remote Control.

- **Provider and subagent transparency**  
  [#17312](https://github.com/openai/codex/issues/17312) calls for an easier provider picker and clearer visibility into subagent provider selection.

## Developer Pain Points
- **macOS daemon resource leaks**  
  [#25719](https://github.com/openai/codex/issues/25719) shows Codex Desktop can cause system-wide `syspolicyd`/`trustd` CPU and memory runaway — the highest-reaction bug in this digest.

- **Windows parity and stability**  
  Recurring Windows issues include extension startup failures ([#37458](https://github.com/openai/codex/issues/37458)), missing remote-control UI ([#28919](https://github.com/openai/codex/issues/28919)), app termination from `browser.tabs.finalize()` ([#35210](https://github.com/openai/codex/issues/35210)), DWM handle growth ([#33192](https://github.com/openai/codex/issues/33192)), sandbox `EPERM` on computer control ([#38293](https://github.com/openai/codex/issues/38293)), and broken standalone auto-upgrade launchers ([#38039](https://github.com/openai/codex/issues/38039)).

- **Context compaction pathology**  
  Image-heavy sessions get trapped in repeated compaction loops because full image payloads survive into compacted checkpoints ([#23257](https://github.com/openai/codex/issues/23257), [#33493](https://github.com/openai/codex/issues/33493)).

- **Connectivity and remote execution flakiness**  
  Image generation network failures ([#32297](https://github.com/openai/codex/issues/32297)), remote compaction reconnect storms ([#36232](https://github.com/openai/codex/issues/36232)), code-server sidebar freezes ([#28726](https://github.com/openai/codex/issues/28726)), and Zellij detach/reattach freezes ([#36338](https://github.com/openai/codex/issues/36338)) remain common.

- **Usage and billing ambiguity**  
  [#38157](https://github.com/openai/codex/issues/38157) reports ChatGPT Pro (20x) accounts receiving effective Pro 5x Codex capacity, making usage behavior hard to predict for automation.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-13

## Today’s Highlights
Agent reliability remains the dominant community theme, with several P1 issues around subagent false-success reporting, hangs, and browser-agent failures. On the engineering side, the latest nightly release focuses on behavioral eval tooling, while new security fixes target variable-expansion bypasses and corrupt MCP config fail-open behavior.

## Releases
- **v0.56.0-nightly.20260813.g1ac337739** — [GitHub Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260813.g1ac337739)
  - Adds eval validation and a tool-call formatter that integrates failure summaries into behavioral evals.
  - Includes the auto-generated changelog for v0.55.1.
  - No new stable release today.

## Hot Issues
1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   A `codebase_investigator` subagent reports `status: "success"` / `Termination Reason: "GOAL"` even after hitting its max-turn limit before doing any analysis. This is dangerous: failures are being masked as successes in agent orchestration. 12 comments; marked P1.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   When Gemini CLI defers to the generalist agent, it can hang indefinitely — even for simple folder creation. Users report waiting up to an hour, with the workaround being to disable subagents entirely. 8 comments, 8 👍.

3. **[#25166 — Shell command execution gets stuck with “Waiting input”](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   Simple CLI commands that should exit immediately remain marked active and await input. A recurring core bug that disrupts agent workflows. 4 comments, 3 👍.

4. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   Browser agent terminates with `GOAL` on Wayland systems even when the task was not completed. P1 bug affecting Linux users. 4 comments, 1 👍.

5. **[#19873 — Leverage model’s bash affinity via zero-dependency OS sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   Proposal to let Gemini 3 work natively with POSIX tools inside a sandbox, with post-execution intent routing. Would improve agent capability while preserving safety. 8 comments; P2 enhancement.

6. **[#24353 — Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)**  
   EPIC tracking expansion of behavioral evals; currently 76 tests across 6 Gemini model variants. The community and maintainers view eval infra as critical for preventing regressions. 7 comments.

7. **[#22745 — AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   EPIC investigating whether AST-aware tools can reduce token usage, avoid misaligned reads, and improve code navigation. 7 comments; P2.

8. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   Anecdotal report that custom skills/subagents are only used when explicitly instructed, despite relevant descriptions. A common adoption pain point. 6 comments.

9. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   When the extraction agent skips a session as low-signal, it remains unprocessed and gets resurfaced repeatedly, causing wasted background work. 5 comments.

10. **[#22232 — Enhance browser_agent resilience: session takeover and lock recovery](https://github.com/google-gemini/gemini-cli/issues/22232)**  
   Browser agent’s “fail-fast” strategy on locked persistent profiles is too restrictive; users want automatic session takeover and recovery instead. 4 comments.

## Key PR Progress
1. **[#28691 — Block `$VAR` / `${VAR}` variable expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28691)**  
   Hardens `detectBashSubstitution()` and `detectPowerShellSubstitution()` to close a security-gate bypass, plus defense-in-depth for the dedup CI workflow. P1 security fix.

2. **[#28794 — Prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)**  
   Fixes a P1 bug where malformed `mcp-server-enablement.json` silently enabled all servers or caused data loss. A related narrower fix is also proposed in [#28787](https://github.com/google-gemini/gemini-cli/pull/28787).

3. **[#28790 — Context-aware silent retries and availability TTL for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)**  
   Fixes the critical capacity-exhaustion retry regression: unattended runs now back off and retry automatically, with up to 2 silent retries in interactive mode. P1 core fix.

4. **[#28624 — Prevent boolean thought parts leaking as `[Thought: true]`](https://github.com/google-gemini/gemini-cli/pull/28624)**  
   Stops internal thought annotations from appearing in user-visible text output.

5. **[#28788 — Behavioral evals for skill activation and URL fetching](https://github.com/google-gemini/gemini-cli/pull/28788)**  
   Adds `activate_skill` and `web_fetch` behavioral evals, improves Windows eval compatibility, and fixes skipped-test handling in the EDK aggregator.

6. **[#28679 — Improve Vertex AI 401 error message with standard API keys](https://github.com/google-gemini/gemini-cli/pull/28679)**  
   Detects missing Google Cloud credentials up front and provides a clearer auth-configured message instead of a confusing request failure.

7. **[#28789 — Fix `vscode-ide-companion` stop() hang and keep-alive threshold](https://github.com/google-gemini/gemini-cli/pull/28789)**  
   Resolves indefinite hangs during `IdeServer.stop()` with active MCP sessions and fixes the keep-alive failure threshold leak.

8. **[#28581 — Skip diff hunk markers during `@` processing](https://github.com/google-gemini/gemini-cli/pull/28581)**  
   Prevents unified/combined diff markers like `@@` from being treated as `@file` references, eliminating recursive glob scans and `minimatch`/`path-scurry` heap growth on large diffs.

9. **[#28586 — Preserve `thoughtSignature` in `functionCall` parts to fix 400 error](https://github.com/google-gemini/gemini-cli/pull/28586)**  
   Fixes a v0.53.0 regression that stripped `thoughtSignature`, causing 400 Bad Request during parallel tool calls.

10. **[#28792 — Normalize git environment and resolve workspace state mismatch](https://github.com/google-gemini/gemini-cli/pull/28792)**  
   Standardizes Git subprocess environment variables and fixes a workspace-trust state initialization issue for predictable, non-interactive Git usage.

## Feature Request Trends
- **Agent self-awareness and orchestration** — Users want Gemini CLI to use skills/subagents proactively, expose subagent trajectories in `/chat share`, and include subagent context in `/bug` reports.
- **AST-aware codebase tooling** — Multiple EPICs explore AST-based file reads, search, and codebase mapping to improve precision and reduce token/step overhead.
- **Sandboxed native bash execution** — Strong interest in letting models use native POSIX tools safely via OS sandboxing and intent routing, rather than restricting them to synthetic file-editing flows.
- **Behavioral eval expansion** — Continued investment in component-level evals, tool-call validation, failure summaries, and cross-model regression coverage.
- **Session lifecycle hygiene** — Auto Memory should stop retrying low-signal sessions, quarantine invalid patches, and redact secrets before content enters model context.

## Developer Pain Points
- **False success from subagents** — MAX_TURNS interruptions being reported as `GOAL` erodes trust in agent orchestration.
- **Hangs and stuck states** — Generalist agent hangs, shell commands stuck at “Waiting input,” and interactive prompts hanging during app scaffolding are recurring workflow blockers.
- **Configuration edge cases** — Symlinked agent files are ignored, browser agent ignores `settings.json` overrides, and corrupt MCP configs can fail open.
- **Wasteful background work** — Auto Memory retries, scattered tmp scripts, and expensive glob searches on large diffs create overhead and slow down already long sessions.
- **Security/trust gaps** — Variable-expansion bypasses and less-than-deterministic Auto Memory redaction highlight the need for stronger guardrails around shell execution and local transcript processing.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-13

## Today's Highlights

Community attention this cycle is concentrated on **MCP/OAuth reliability**, **silent model-override bugs**, and **session lifecycle leaks**. No new release was published in the last 24 hours, and PR activity was minimal, with only two PRs touched. The most-supported open feature request remains **CIMD support for remote OAuth MCP servers** ([#1305](https://github.com/github/copilot-cli/issues/1305), 35 👍).

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#1305 — [area:authentication, area:mcp] Support CIMD for Remote OAuth MCP Servers](https://github.com/github/copilot-cli/issues/1305)**  
   The highest-reacted open issue (35 👍). DCR-based OAuth registration is not enough for many managed OAuth environments; users are asking for CI/CD-friendly CIMD support.

2. **[#4390 — Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5 and Kimi K3)](https://github.com/github/copilot-cli/issues/4390)**  
   Enterprise admins explicitly enable models, but Copilot CLI reports them as disabled. Blocks organizations trying to use newer Anthropic/Kimi models.

3. **[#2133 — Custom agent frontmatter `model` field rejects array syntax — incompatibility between Copilot CLI and VS Code Copilot Chat](https://github.com/github/copilot-cli/issues/2133)**  
   Users expect parity with VS Code agent definitions. The CLI fails to load agents that use array syntax, causing friction for shared agent configs.

4. **[#1730 — [area:plugins] `sessionStart` hook in `.github/hooks/` does not fire in Copilot CLI (v0.0.420)](https://github.com/github/copilot-cli/issues/1730)**  
   8 comments. Hooks are a core extension mechanism, and silent failure on Windows/PowerShell makes plugin automation unreliable.

5. **[#4328 — Ctrl+H (delete previous character) is misinterpreted as Ctrl+Backspace under WSL2](https://github.com/github/copilot-cli/issues/4328)**  
   Input handling regression with 6 comments. WT_SESSION leakage from Windows Terminal makes interactive editing frustrating under WSL2.

6. **[#3976 — native `tgrep` indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976)**  
   Serious stability issue: the persistent trigram indexer has no memory cap. Large monorepo users risk host-level OOM.

7. **[#4346 — MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN, blocking all non-default MCP servers in CI](https://github.com/github/copilot-cli/issues/4346)**  
   Closed, but important for CI adoption. The documented PAT-less Actions setup breaks with MCP registry policy fetches.

8. **[#4432 — rubber-duck: model-emitted `model` argument silently overrides the complementary strategy and the user's /subagents setting](https://github.com/github/copilot-cli/issues/4432)**  
   The cross-family “rubber-duck” reviewer can be hijacked by a model-emitted argument, defeating its purpose.

9. **[#4462 — Explicit code-review subagent model override is ignored](https://github.com/github/copilot-cli/issues/4462)**  
   Configured `gpt-5.6-luna` starts as `gpt-5.6-sol`. This is the second report of the same area; duplicate [#4458](https://github.com/github/copilot-cli/issues/4458) was auto-closed.

10. **[#4358 — BYOK: populate the /model picker from the provider's /models endpoint](https://github.com/github/copilot-cli/issues/4358)**  
    For custom providers, only one model is visible. Users want runtime discovery and switching without restarting the CLI.

## Key PR Progress

Only two PRs were updated in the last 24 hours.

1. **[#4449 — Migrate pull request automation away from `pull_request_target`](https://github.com/github/copilot-cli/pull/4449)**  
   Open. Security hardening for automation: invalid-label handling moves to an issue-scoped write token, reducing privileged `pull_request_target` usage.

2. **[#4453 — Julesdemangeot ship it patch 1](https://github.com/github/copilot-cli/pull/4453)**  
   Closed. No description provided; appears to be a bot/automation patch with no actionable content.

## Feature Request Trends

- **Session visibility and lifecycle tooling** — Users want an external command to list running sessions, statuses, and IDs, similar to Claude Code’s `agents --json` ([#4470](https://github.com/github/copilot-cli/issues/4470)).
- **More flexible model selection** — Repeated requests for provider-discovered model lists ([#4358](https://github.com/github/copilot-cli/issues/4358)), VS Code-compatible frontmatter arrays ([#2133](https://github.com/github/copilot-cli/issues/2133)), and respecting explicit subagent model overrides ([#4462](https://github.com/github/copilot-cli/issues/4462)).
- **Plugins and marketplace auto-management** — `autoUpdate` on `extraKnownMarketplaces` is expected to update plugins at session start ([#4465](https://github.com/github/copilot-cli/issues/4465)), and the `/plugins` TUI needs proper disabled-state persistence ([#4471](https://github.com/github/copilot-cli/issues/4471)).
- **MCP OAuth/CIMD parity** — CIMD support remains the top ask for automation-friendly remote MCP ([#1305](https://github.com/github/copilot-cli/issues/1305)).
- **Use system-installed GitHub CLI** — Some users want to avoid the bundled `gh.exe` dependency ([#4456](https://github.com/github/copilot-cli/issues/4456)).

## Developer Pain Points

- **Silent model overrides or downgrades** are a recurring theme: the task tool downgrades subagent models ([#3565](https://github.com/github/copilot-cli/issues/3565), closed), the code-review agent ignores explicit model config ([#4462](https://github.com/github/copilot-cli/issues/4462)), and the rubber-duck strategy can be bypassed ([#4432](https://github.com/github/copilot-cli/issues/4432)).
- **MCP OAuth and transport reliability** continues to cause friction: Entra refresh scope bugs ([#4464](https://github.com/github/copilot-cli/issues/4464)), Windows socket error 10013 ([#4463](https://github.com/github/copilot-cli/issues/4463)), concurrent refresh races ([#4472](https://github.com/github/copilot-cli/issues/4472)), and no retry on transient 5xx during `initialize` ([#4466](https://github.com/github/copilot-cli/issues/4466)).
- **Session/process cleanup is unstable**: extension-host processes leak at 4 per session on Windows ([#4468](https://github.com/github/copilot-cli/issues/4468)), Docker stdio MCP containers outlive sessions ([#4461](https://github.com/github/copilot-cli/issues/4461)), long sessions exhaust event storage ([#4467](https://github.com/github/copilot-cli/issues/4467)), and orphaned permission events replay on resume ([#4469](https://github.com/github/copilot-cli/issues/4469)).
- **Hooks and plugin configuration are not consistently honored**: `sessionStart` hooks silently don’t run ([#1730](https://github.com/github/copilot-cli/issues/1730)), marketplace `autoUpdate` is ignored ([#4465](https://github.com/github/copilot-cli/issues/4465)), and disabled skills cannot be distinguished or persisted in the `/plugins` TUI ([#4471](https://github.com/github/copilot-cli/issues/4471)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest – 2026-08-13

## 1. Today's Highlights
No new releases landed in the last 24 hours. The most notable activity centers on a long-running feature request for a persistent **Memory System** (Issue #1283), which has drawn 37 comments and remains open after six months. Meanwhile, two bug-fix PRs were updated, both targeting string handling and subprocess I/O edge cases that affect real-world CLI reliability.

## 2. Releases
No releases were published in the last 24 hours.

## 3. Hot Issues
Only one issue was updated in the past 24 hours, so the digest reflects that scope.

- **#1283 [Open] Feature Request: Memory System - Persistent context across sessions**  
  *Author: CatKang | Updated: 2026-08-13 | Comments: 37*  
  [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  This is the standout community request. It asks for a comprehensive memory layer that lets Kimi Code CLI remember useful context, project patterns, and user preferences across sessions—via both automatic AI-managed notes and manually defined instructions. The high comment count and long lifespan suggest strong demand for stateful, adaptive coding assistance. Many users are likely waiting on this for a more personalized workflow.

## 4. Key PR Progress
Two pull requests were active in the last 24 hours. Both are bug fixes that improve robustness.

- **#2449 [Open] fix(string): strip newlines in shorten_middle before the length check**  
  *Author: Ricardo-M-L | Updated: 2026-08-12*  
  [View PR](https://github.com/MoonshotAI/kimi-cli/pull/2449)  
  Fixes a subtle logic issue in `shorten_middle()`: short input strings return early before newline stripping happens, leaving raw newlines intact when rendering single-line tool call summaries. This is important for clean log output and argument display.

- **#2324 [Open] fix(web): handle BrokenPipeError in SessionProcess.send_message**  
  *Author: Ricardo-M-L | Updated: 2026-08-12*  
  [View PR](https://github.com/MoonshotAI/kimi-cli/pull/2324)  
  Guards against `BrokenPipeError` when writing to a subprocess that has already exited between `start()` and `drain()`. This should reduce flaky crashes in web-session execution and improve overall stability in asynchronous workflows.

## 5. Feature Request Trends
The clearest trend from the current issue set is a push for **persistent memory/state**. Developers want Kimi Code CLI to:
- Recall project-specific patterns and conventions across sessions.
- Automatically maintain AI-generated notes about decisions and context.
- Support user-defined manual instructions that persist.
- Understand user preferences without re-asking or re-configuring each time.

This points toward a broader demand for agentic coding assistants that behave less like stateless tools and more like long-lived teammates.

## 6. Developer Pain Points
Recurring pain points visible in current issues/PRs include:
- **Loss of context between sessions** — the top complaint driving Issue #1283.
- **Unclean single-line summaries** — newlines in truncated key arguments cause poor rendering in command/argument previews.
- **Subprocess communication instability** — unhandled `BrokenPipeError` in session message passing can crash the web runner, which is especially annoying during long-running or concurrent operations.

These align with common friction in CLI tools: brittle I/O + missing state = unexpected breaks and incomplete context.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-13

## Today's Highlights

Patch releases v1.18.17 and v1.18.18 landed with targeted bugfixes for provider routing, session compaction, and retry behavior. The community is heavily focused on memory/storage bloat in the local SQLite database, provider auth failures via OpenCode Zen/Go, and headless `opencode run` hangs when quotas are exhausted — with several fix PRs already opened.

## Releases

### [v1.18.18](https://github.com/anomalyco/opencode/releases/tag/v1.18.18)
- Fixed Kimi system prompt selection for official Moonshot and Kimi providers.
- Fixed `xhigh` reasoning effort for xAI models.

### [v1.18.17](https://github.com/anomalyco/opencode/releases/tag/v1.18.17)
- Session compaction now keeps complete recent turns and produces clearer summaries for smaller models.
- Added MERGE Gateway reasoning variants so those model options work correctly. (@MatthewFeroz)
- Capped automatic session retries and added jitter to avoid repeated retry storms.

## Hot Issues

- [#20695 Memory Megathread](https://github.com/anomalyco/opencode/issues/20695) — The central tracking thread for memory issues, with 129 comments and 97 👍. Maintainers are asking for heap snapshots rather than LLM-generated guesses; this remains the community’s biggest reliability concern.

- [#39845 DeepSeek V4 Flash suddenly requires "Enable models hosted in China" for OpenCode Go subscription](https://github.com/anomalyco/opencode/issues/39845) — Mid-session disruption for a paid user, with 20 comments and 27 👍. Highlights transparency problems around model geo-restrictions and sudden policy changes.

- [#23153 [FEATURE]: Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153) — 40 👍 and 18 comments show strong demand for crypto payments, especially from users who cannot use traditional cards.

- [#33356 Unbounded growth of the `event` table](https://github.com/anomalyco/opencode/issues/33356) — Local SQLite DB reached 13GB+ on long-running instances because `message.updated.1` snapshots are never pruned or compacted. Critical for large/always-on setups.

- [#41470 "Copied to clipboard" doesn't work](https://github.com/anomalyco/opencode/issues/41470) — In VSCode Server/Docker, OpenCode reports success but clipboard content is not actually copied. 14 comments; impacts remote development workflows.

- [#39827 [Zen] AuthError: "Request blocked by upstream provider"](https://github.com/anomalyco/opencode/issues/39827) — Every Zen model fails with a provider-level auth block, even though direct provider keys work. 10 comments; suggests an upstream routing/account issue, not client-side config.

- [#42143 Why does Opencode require me to subscribe when your official website states it's 100% free?](https://github.com/anomalyco/opencode/issues/42143) — Confusion between free OpenCode and paid OpenCode Go/Zen tiers. Important for onboarding and trust.

- [#42040 Unable to open certain projects](https://github.com/anomalyco/opencode/issues/42040) — Projects with similar names (`foo` / `foo2`) always resolve to the previously opened project. Breaks multi-project workflows.

- [#40219 Bun segfault with identical crash signature during long agentic sessions](https://github.com/anomalyco/opencode/issues/40219) — Deterministic crash under heavy subprocess/tool-call load. Serious stability issue for long-running automation.

- [#40747 `opencode run` hangs indefinitely when usage quota is exhausted](https://github.com/anomalyco/opencode/issues/40747) — Headless mode never exits and never reports the error it already knows, making it dangerous for CI pipelines. A fix PR is already open.

## Key PR Progress

- [#19959 feat(opencode): add local server provider with auto model discovery](https://github.com/anomalyco/opencode/pull/19959) — Adds a `local` provider that auto-discovers models from any OpenAI-compatible `/v1/models` endpoint. Long-requested for local model servers.

- [#38790 [beta] feat(app): add workspace flows to new layout](https://github.com/anomalyco/opencode/pull/38790) — Adds workspace selection for new sessions: local repository, fresh isolated workspace, or existing workspace. Includes branch context in the composer pill.

- [#36589 fix(core): bound compaction request size](https://github.com/anomalyco/opencode/pull/36589) — Stops large sessions from getting permanently wedged when the serialized inference request exceeds service limits; compaction now considers request size, not just token count.

- [#39807 feat(tui): show optional daily session cost](https://github.com/anomalyco/opencode/pull/39807) — Adds an optional total for all sessions updated today, useful for cost tracking without running `opencode stats`.

- [#39863 fix(tui): show N/A spent for models without pricing](https://github.com/anomalyco/opencode/pull/39863) — Prevents misleading “$0.00” displays for custom/unpriced models.

- [#42292 fix(session): recover orphaned task runs](https://github.com/anomalyco/opencode/pull/42292) — Fixes #42286 by properly marking stale task parts and parent assistant messages when a session runner is lost.

- [#42289 fix(cli): stop `run` from sleeping through an exhausted quota](https://github.com/anomalyco/opencode/pull/42289) — Fixes #40747. Treats Go/Free usage-limit errors as non-retryable so `opencode run` exits and reports the error instead of sleeping indefinitely.

- [#42290 fix(app): scope review panel to the session's own file changes](https://github.com/anomalyco/opencode/pull/42290) — Fixes #41399. Prevents the Review / Files Changed panel from showing unrelated working-tree diffs from other sessions in the same project.

- [#42281 fix(core): apply external plugin changes after startup batch commits](https://github.com/anomalyco/opencode/pull/42281) — Fixes #42280. Ensures plugin loading from fork-scoped fibers isn’t lost when startup batches commit.

- [#35311 fix(core): Multiple clones of same repo are different projects](https://github.com/anomalyco/opencode/pull/35311) — Closes a long list of project-identity issues including #17940, #19348, and #42040. This is a major fix for users managing multiple clones of the same repository.

## Feature Request Trends

- **Payment and account flexibility** — Users want crypto payment support ([#23153](https://github.com/anomalyco/opencode/issues/23153)), top-ups to be recognized immediately ([#42294](https://github.com/anomalyco/opencode/issues/42294)), and clearer messaging around free vs subscription tiers ([#42143](https://github.com/anomalyco/opencode/issues/42143)).

- **Storage and retention controls** — The `event` table grows without bounds ([#33356](https://github.com/anomalyco/opencode/issues/33356), [#42249](https://github.com/anomalyco/opencode/issues/42249)), and large PDFs are repeatedly base64-encoded without limits ([#42263](https://github.com/anomalyco/opencode/issues/42263)). Users want compaction, pruning, and attachment size caps.

- **Project identity and workspace navigation** — Same-name projects and folder names resolve incorrectly ([#42040](https://github.com/anomalyco/opencode/issues/42040), [#42284](https://github.com/anomalyco/opencode/issues/42284)). There is strong demand for unambiguous project selection and per-clone identity.

- **Tool isolation and error surfacing** — A single broken `.opencode/tool` file crashes the entire tool registry ([#42250](https://github.com/anomalyco/opencode/issues/42250), [#42258](https://github.com/anomalyco/opencode/issues/42258)), and session defects are silently ignored in the UI ([#42259](https://github.com/anomalyco/opencode/issues/42259)). Users want per-tool isolation and visible error reporting.

- **Usage transparency** — The Usage page can show models that weren’t configured ([#27712](https://github.com/anomalyco/opencode/issues/27712)), while TUI cost displays are misleading for unpriced models. PRs [#39807](https://github.com/anomalyco/opencode/pull/39807) and [#39863](https://github.com/anomalyco/opencode/pull/39863) address parts of this.

## Developer Pain Points

- **Database/memory bloat** — `opencode.db` can reach multiple GBs due to unbounded event snapshots ([#33356](https://github.com/anomalyco/opencode/issues/33356)); PDF attachments are re-encoded into memory every turn ([#42263](https://github.com/anomalyco/opencode/issues/42263)).

- **Headless hangs in CI** — `opencode run` can sleep for days on quota limits or fatal errors instead of exiting with a code ([#40747](https://github.com/anomalyco/opencode/issues/40747), [#42268](https://github.com/anomalyco/opencode/issues/42268)).

- **Silent failures** — Session run defects are dropped without UI feedback ([#42259](https://github.com/anomalyco/opencode/issues/42259)), and tool-load failures kill the whole registry ([#42250](https://github.com/anomalyco/opencode/issues/42250)).

- **Provider/auth instability** — Zen “request blocked by upstream provider” errors affect every model ([#39827](https://github.com/anomalyco/opencode/issues/39827)), while DeepSeek V4 Flash on Zen intermittently fails with `invalid_bearer_credential` ([#42293](https://github.com/anomalyco/opencode/issues/42293)).

- **Update/install reliability** — The auto-updater can leave a broken npm install with stub binaries and hung npm processes ([#42291](https://github.com/anomalyco/opencode/issues/42291)); the Desktop installer also fails to complete upgrades ([#40401](https://github.com/anomalyco/opencode/issues/40401)).

- **Multi-project friction** — Same-name folders navigate to the wrong project ([#42040](https://github.com/anomalyco/opencode/issues/42040), [#42284](https://github.com/anomalyco/opencode/issues/42284)), and the Review panel leaks working-tree diffs across sessions.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-13

## Today’s Highlights
No new Pi release landed in the last 24 hours, but the community remains highly active on reliability and performance issues. The dominant topics are context-compaction failures ([#6879](https://github.com/earendil-works/pi/issues/6879)), slow TUI prompt editing with large buffers ([#8029](https://github.com/earendil-works/pi/issues/8029)), and long-session CPU/memory issues on macOS ([#7730](https://github.com/earendil-works/pi/issues/7730)). Several notable PRs are in flight or recently closed, including Grok 4.6 support, new Bedrock/Vertex providers, and fixes to preserve streaming `usage` data.

## Releases
None. No new versions of Pi were published in the last 24 hours.

## Hot Issues
1. **[Issue #6879 — Auto-compaction never triggers until provider overflow](https://github.com/earendil-works/pi/issues/6879)**  
   The most-discussed issue, with 18 comments and 17 👍. A long agentic turn on `gpt-5.6-sol` climbed past the compaction threshold and only compacted after the API rejected the request at 373k tokens. Users want compaction checks after every agent step, not just on provider errors.

2. **[Issue #7730 — High CPU usage on macOS with long sessions](https://github.com/earendil-works/pi/issues/7730)**  
   11 comments and 8 👍. Long sessions cause 50–110% CPU usage and 600–800MB memory usage. The report suggests a link to context size or session length, making it a important performance investigation target.

3. **[Issue #8029 — Very slow performance moving in prompt editor](https://github.com/earendil-works/pi/issues/8029)**  
   With ~7,000 lines in the prompt buffer, a single arrow press took 1650ms. The linear slowdown makes large-paste workflows painful; a caching fix is already proposed in [PR #8066](https://github.com/earendil-works/pi/pull/8066).

4. **[Issue #7836 — Edit fuzzy match misses lines with whitespace differences](https://github.com/earendil-works/pi/issues/7836)**  
   10 comments. `normalizeForFuzzyMatch` doesn’t collapse runs of whitespace or strip leading whitespace, so valid edits can fail when whitespace isn’t exact. Particularly painful for smaller models using edit tools.

5. **[Issue #7829 — Invalid settings.json silently ignored; misleading “bash not found” on Windows](https://github.com/earendil-works/pi/issues/7829)**  
   An unescaped Windows path in `settings.json` produces invalid JSON, but Pi doesn’t report the real parse failure — users instead see confusing shell errors. Needs better config validation and diagnostics.

6. **[Issue #7779 — Allow trusted Unix users to share PI_CODING_AGENT_DIR](https://github.com/earendil-works/pi/issues/7779)**  
   `auth.json` and `models-store.json` are written `0600`, so the first user to create them becomes the only reader. Multi-user setups need shared-state permission controls.

7. **[Issue #7689 — Handle `end_turn: false` for Codex](https://github.com/earendil-works/pi/issues/7689)**  
   The Codex backend can return `response.completed` with `end_turn: false`. Agents need to support this provider extension instead of treating every completed response as a turn ending.

8. **[Issue #8000 — @ file autocomplete: direct children lose to deep nested matches](https://github.com/earendil-works/pi/issues/8000)**  
   With scoped home-directory prefixes, deep nested basename matches rank above the direct child the user likely wants. The ranking heuristic needs to favor shorter/direct paths on ties.

9. **[Issue #8055 — Ambiguous-width chars break table alignment on CJK terminals](https://github.com/earendil-works/pi/issues/8055)**  
   Characters like `① ② ± … €` are counted as 1 column, but CJK fonts render them 2 columns wide, breaking tables and lists. Requires East Asian Width-aware column math in the TUI.

10. **[Issue #7911 — Delta-only `message_update` removed `usage` from the wire protocol](https://github.com/earendil-works/pi/issues/7911)**  
    The 0.84.0 fix for #7290 removed cumulative `message` snapshots but also removed `usage`, so JSON/RPC clients no longer see usage until `message_end`. [PR #7982](https://github.com/earendil-works/pi/pull/7982) addresses it.

## Key PR Progress
1. **[PR #6216 — Add Amazon Bedrock Mantle OpenAI Responses provider](https://github.com/earendil-works/pi/pull/6216)**  
   Adds a Bedrock Mantle provider using OpenAI’s Bedrock adapter, giving AWS users a new first-class model path.

2. **[PR #5262 — Add Anthropic Vertex provider](https://github.com/earendil-works/pi/pull/5262)**  
   Long-running built-in `anthropic-vertex` provider for Claude on Google Cloud Vertex AI, reusing the existing Anthropic Messages streaming path.

3. **[PR #8042 — Add Grok 4.6](https://github.com/earendil-works/pi/pull/8042)**  
   Adds Grok 4.6 to the xAI Responses model set, preserving `low`, `medium`, `high`, and `xhigh` reasoning effort levels.

4. **[PR #8030 — Add MiniMax image-to-image generation](https://github.com/earendil-works/pi/pull/8030)**  
   Registers global and CN image providers with image-input metadata, including URL and base64 response parsing.

5. **[PR #7982 — Preserve usage in streaming events](https://github.com/earendil-works/pi/pull/7982)**  
   Restores cumulative provider `usage` on JSON/RPC `message_update` events while keeping stream size linear. Closes [#7911](https://github.com/earendil-works/pi/issues/7911).

6. **[PR #8052 — Make session persistence transactional](https://github.com/earendil-works/pi/pull/8052)**  
   Prevents the in-memory session graph from advancing before the JSONL append completes, avoiding broken session graphs after failures like `ENOSPC`.

7. **[PR #8049 — Use local Ollama models via a local model proxy](https://github.com/earendil-works/pi/pull/8049)**  
   Adds two dependency-free Node scripts for using local Ollama models in Pi on macOS, Linux, and Windows.

8. **[PR #8066 — Add visual lines caching in the TUI](https://github.com/earendil-works/pi/pull/8066)**  
   Caches visual line computations keyed by width/text changes, directly fixing the prompt-editor slowdown in [#8029](https://github.com/earendil-works/pi/issues/8029).

9. **[PR #8037 — Dispatch mouse events to TUI components via `onMouse`](https://github.com/earendil-works/pi/pull/8037)**  
   Implements the `Component.onMouse` hook proposed in [#7683](https://github.com/earendil-works/pi/issues/7683). An alternative/open version by the issue author is also available in [PR #8032](https://github.com/earendil-works/pi/pull/8032).

10. **[PR #7956 — Render Mermaid diagrams in HTML exports](https://github.com/earendil-works/pi/pull/7956)**  
    Reuses the existing ANSI-to-HTML tool-rendering path so Mermaid diagrams in exports can be rendered and toggled from the header.

## Feature Request Trends
- **Smarter context management** is the clearest demand: check compaction after every agentic step ([#6879](https://github.com/earendil-works/pi/issues/6879)), reserve output tokens in the context budget ([#8061](https://github.com/earendil-works/pi/issues/8061)), and compact between tool turns ([PR #7993](https://github.com/earendil-works/pi/pull/7993)).
- **TUI extensibility** continues to grow: mouse events for components ([#7683](https://github.com/earendil-works/pi/issues/7683)), configurable fullscreen scroll steps ([#7765](https://github.com/earendil-works/pi/issues/7765)), and extension hooks to withhold/replace displayed assistant messages ([#8035](https://github.com/earendil-works/pi/issues/8035)).
- **Provider breadth** is a major theme: Grok 4.6 ([PR #8042](https://github.com/earendil-works/pi/pull/8042)), Bedrock Mantle ([PR #6216](https://github.com/earendil-works/pi/pull/6216)), Anthropic Vertex ([PR #5262](https://github.com/earendil-works/pi/pull/5262)), and local Ollama workflows ([PR #8049](https://github.com/earendil-works/pi/pull/8049)).
- **Startup and rendering performance** is a recurring concern: shared jiti/module cache for extension loading ([#4254](https://github.com/earendil-works/pi/issues/4254)), visual-line caching ([PR #8066](https://github.com/earendil-works/pi/pull/8066)), and long-session CPU profiling ([#7730](https://github.com/earendil-works/pi/issues/7730)).
- **Cross-platform and terminal correctness** requests include CJK ambiguous-width handling ([#8055](https://github.com/earendil-works/pi/issues/8055)), Windows Unix-socket test fixes ([#8047](https://github.com/earendil-works/pi/issues/8047)), and Kitty graphics compatibility on Ghostty ([#7585](https://github.com/earendil-works/pi/issues/7585)).

## Developer Pain Points
- **Context-window reliability remains the No. 1 pain point.** Auto-compaction doesn’t fire early enough ([#6879](https://github.com/earendil-works/pi/issues/6879)), output-token reservation is ignored ([#8061](https://github.com/earendil-works/pi/issues/8061)), and mid-stream failures can restart output and duplicate partial results ([#8031](https://github.com/earendil-works/pi/issues/8031)).
- **Large state causes visible UI regressions.** Big prompt buffers make the editor nearly unusable ([#8029](https://github.com/earendil-works/pi/issues/8029)), and long macOS sessions drive CPU/memory high ([#7730](https://github.com/earendil-works/pi/issues/7730)).
- **Opaque failures waste developer time.** Invalid settings are silently ignored ([#7829](https://github.com/earendil-works/pi/issues/7829)), provider catalog refreshes hang until timeout ([#8065](https://github.com/earendil-works/pi/issues/8065)), and Node’s default 16 KiB header limit causes confusing `UND_ERR_HEADERS_OVERFLOW` failures ([#7791](https://github.com/earendil-works/pi/issues/7791)).
- **Wire-protocol gaps affect clients and automations.** Mid-run `usage` disappeared from `message_update` ([#7911](https://github.com/earendil-works/pi/issues/7911)), Codex `end_turn: false` isn’t handled ([#7689](https://github.com/earendil-works/pi/issues/7689)), and retries after mid-stream failures don’t clean up partial output ([#8031](https://github.com/earendil-works/pi/issues/8031)).
- **Multi-user and shared setups are friction-heavy.** `0600` permissions on `auth.json`/`models-store.json` break shared agent directories ([#7779](https://github.com/earendil-works/pi/issues/7779)), and resume messages ignore `PI_CODING_AGENT_DIR` overrides ([#8048](https://github.com/earendil-works/pi/issues/8048)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-13

## 1. Today's Highlights
The biggest theme is multi-agent expansion: **v0.21.11** shipped Agent Plugins v1 and native read-only teammates via `/coordinate`, while **v0.21.12-preview.1** improves Web Shell session/file workflows. On the desktop side, **v0.2.1** changes project memory defaults, and [PR #9085](https://github.com/QwenLM/qwen-code/pull/9085) starts the Electron deprecation path. Release automation also needed attention — two `v0.21.12-preview.0` publish failures ([#9072](https://github.com/QwenLM/qwen-code/issues/9072), [#9076](https://github.com/QwenLM/qwen-code/issues/9076)) led to a CI retry fix in [PR #9082](https://github.com/QwenLM/qwen-code/pull/9082).

## 2. Releases
- **[v0.21.12-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.1)** — Web Shell fixes: preserve standalone session target ([#9038](https://github.com/QwenLM/qwen-code/pull/9038)) and support workspace file uploads.
- **[v0.21.11](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11)** — Added Agent Plugins v1 for extensible agent capabilities ([#8834](https://github.com/QwenLM/qwen-code/pull/8834)); enabled native multi-agent workflows with read-only teammates via `/coordinate` ([#8804](https://github.com/QwenLM/qwen-code/pull/8804)). Release notes also include a SWE-bench Verified run marked **QUARANTINED** (500/500 completed).
- **[Qwen Code Desktop v0.2.1](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.1)** — Defaults project memory to workspace scope ([#8856](https://github.com/QwenLM/qwen-code/pull/8856)) and aligns telemetry session lifecycle.

## 3. Hot Issues
- [#8718 RFC: Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718) — 9 comments. Closed umbrella for the fleet work; spawned stages #8840–#8843. Community wants leader/worker dispatch, correlated state, and structured result collection.
- [#8678 fix(serve): Preserve the current session when a large restore times out](https://github.com/QwenLM/qwen-code/issues/8678) — 8 comments. P1 reliability issue; PR1 ([#8691](https://github.com/QwenLM/qwen-code/pull/8691)) already landed, but follow-up work remains.
- [#9025 Keyless Vertex AI is not inferred from the environment](https://github.com/QwenLM/qwen-code/issues/9025) — 5 comments. Blocks headless ADC startup; related [#9016](https://github.com/QwenLM/qwen-code/issues/9016) reports ADC cannot be used with Vertex AI at all.
- [#9002 SDK Python rejects permission_mode="auto"](https://github.com/QwenLM/qwen-code/issues/9002) — 5 comments. CLI supports `auto`, but Python SDK client-side validation rejects it before reaching the CLI.
- [#8841 feat(cli): supervised teammate runtime — fleet MVP](https://github.com/QwenLM/qwen-code/issues/8841) — 4 comments. Closed after stage 1B; fleet moves from in-process preview to supervised teammate runtime.
- [#8845 feat(web-shell): redesign Channel policy, session, and workspace management](https://github.com/QwenLM/qwen-code/issues/8845) — 4 comments. Requests shared channel access, session isolation, and workspace ownership across built-in adapters.
- [#9043 Windows Desktop opens a visible runtime Terminal and misaligns loading state](https://github.com/QwenLM/qwen-code/issues/9043) — 3 comments. P1 Windows startup UX/reliability bug in Desktop 0.2.1.
- [#9026 NO_TOOL_RESULT_PROGRESS hard-fails headless runs](https://github.com/QwenLM/qwen-code/issues/9026) — 3 comments. Headless runs abort when a model ends a turn quietly after a tool result.
- [#9083 record_artifact succeeds without verifying workspacePath](https://github.com/QwenLM/qwen-code/issues/9083) — 2 comments. Artifact store can report `missing` while the file exists; session cwd vs workspace root mismatch.
- [#7960 Compression side-query's fixed maxOutputTokens can exceed context window](https://github.com/QwenLM/qwen-code/issues/7960) — 3 comments. Self-hosted/small-window deployments hit 400 → `COMPRESSION_FAILED_EMPTY_SUMMARY`.

## 4. Key PR Progress
- [#8969 feat(core): add a live-session registry and `qwen sessions ps`](https://github.com/QwenLM/qwen-code/pull/8969) — Adds a machine-readable registry of running sessions plus a CLI command to inspect them.
- [#8848 feat(web-shell): redesign Channel policy and workspace management](https://github.com/QwenLM/qwen-code/pull/8848) — Exposes shared direct-message, group-access, session-routing, and workspace-ownership controls per adapter.
- [#8817 feat: support fork from any conversation](https://github.com/QwenLM/qwen-code/pull/8817) — Makes session branching safe from an earlier Assistant response instead of the latest active state.
- [#9080 feat(serve): add pollable daemon turn status](https://github.com/QwenLM/qwen-code/pull/9080) — Adds read-only routes for current/prompt turn status with states like `idle`, `running`, `cancelled`, and `error`.
- [#9086 fix(review): harden the pipeline against four live-run failures](https://github.com/QwenLM/qwen-code/pull/9086) — Fixes four defects found by running `qwen review run` against real PRs; includes regression tests.
- [#9085 feat(desktop): deprecate Electron app, move it to desktop-electron, rename desktop-shell to desktop](https://github.com/QwenLM/qwen-code/pull/9085) — Pure move/rename; freezes Electron and unblocks Tauri as the primary desktop path.
- [#9082 fix(ci): force-push release branch so retries replace failed attempts](https://github.com/QwenLM/qwen-code/pull/9082) — CI fix for release publish retries; directly targets the #9076 failure mode.
- [#9084 feat(cli): Correlate daemon logs with OpenTelemetry spans](https://github.com/QwenLM/qwen-code/pull/9084) — Emits `trace_id`/`span_id` on daemon logs when a recording span is active.
- [#8332 feat(cli): add audio bridge for attachments](https://github.com/QwenLM/qwen-code/pull/8332) — Transcribes audio attachments through a batch voice model when the primary model lacks audio support.
- [#9070 fix(core): surface ask_user_question cancellation reasons](https://github.com/QwenLM/qwen-code/pull/9070) — Prevents broad permission rules from bypassing the question and preserves cancellation reasons.

## 5. Feature Request Trends
- **Native multi-agent fleet / background automation** — The strongest recurring direction: independent session coordination ([#8718](https://github.com/QwenLM/qwen-code/issues/8718)), supervised teammate runtime ([#8841](https://github.com/QwenLM/qwen-code/issues/8841)), activeWork tracking ([#8586](https://github.com/QwenLM/qwen-code/issues/8586)), and daemon-owned Local Control ([#9075](https://github.com/QwenLM/qwen-code/issues/9075)).
- **Web Shell / Channel management** — Requests for shared channel policies, workspace ownership, and session isolation across adapters ([#8845](https://github.com/QwenLM/qwen-code/issues/8845), [PR #8848](https://github.com/QwenLM/qwen-code/pull/8848)).
- **Memory and artifact lifecycle governance** — Pinned/read-only memory protected from consolidation ([#6801](https://github.com/QwenLM/qwen-code/issues/6801)), tool-output budgeting ([#7306](https://github.com/QwenLM/qwen-code/issues/7306)), and artifact workspace verification ([#9083](https://github.com/QwenLM/qwen-code/issues/9083)).
- **Headless/auth robustness** — Keyless ADC inference, Vertex AI auth fixes, and SDK/CLI parity ([#9025](https://github.com/QwenLM/qwen-code/issues/9025), [#9016](https://github.com/QwenLM/qwen-code/issues/9016), [#9002](https://github.com/QwenLM/qwen-code/issues/9002)).
- **Observability and recovery** — Session restore timeout safety ([#8678](https://github.com/QwenLM/qwen-code/issues/8678)), daemon turn status ([#9080](https://github.com/QwenLM/qwen-code/pull/9080)), and OpenTelemetry log correlation ([#9084](https://github.com/QwenLM/qwen-code/pull/9084)).
- **Omni multimodal experiment** — Continues on the protected `omni-experiment` branch with policy chains, GC/governance, and multimodal file recognition ([#8197](https://github.com/QwenLM/qwen-code/issues/8197), [#8186](https://github.com/QwenLM/qwen-code/issues/8186), [#8190](https://github.com/QwenLM/qwen-code/issues/8190)).

## 6. Developer Pain Points
- **Multi-agent fleet is still heavily stage-based** — Users see many closed/blocked stage issues ([#8840](https://github.com/QwenLM/qwen-code/issues/8840), [#8841](https://github.com/QwenLM/qwen-code/issues/8841), [#8842](https://github.com/QwenLM/qwen-code/issues/8842), [#8843](https://github.com/QwenLM/qwen-code/issues/8843)) and are waiting on persistence, recovery, and terminal attach before trusting it in real workflows.
- **Headless auth failures recur** — Keyless Vertex AI setup is not inferred from the environment ([#9025](https://github.com/QwenLM/qwen-code/issues/9025)), and ADC is effectively unusable with Vertex AI in some configurations ([#9016](https://github.com/QwenLM/qwen-code/issues/9016)).
- **CLI/SDK parity gaps** — Python SDK rejects `permission_mode="auto"` even though the CLI supports it ([#9002](https://github.com/QwenLM/qwen-code/issues/9002)).
- **Small-context and self-hosted deployments are brittle** — Fixed compression `maxOutputTokens` can exceed the context window and break summarization ([#7960](https://github.com/QwenLM/qwen-code/issues/7960)).
- **Desktop distribution churn** — Windows opens a visible terminal ([#9043](https://github.com/QwenLM/qwen-code/issues/9043)), and the Electron-to-Tauri upgrade bridge currently covers macOS only ([#9074](https://github.com/QwenLM/qwen-code/issues/9074)).
- **Release automation flakiness** — Two failed publish attempts for the same preview tag ([#9072](https://github.com/QwenLM/qwen-code/issues/9072), [#9076](https://github.com/QwenLM/qwen-code/issues/9076)) required a dedicated CI hardening PR ([#9082](https://github.com/QwenLM/qwen-code/pull/9082)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-13

## Today's Highlights

The project shipped **v0.9.7**, formalizing the CodeWhale branding while deprecating the legacy `deepseek-tui` npm package. Release automation and v0.9.5 regressions dominated the day: npm publishing hit a `GH_TOKEN` issue, a parity test timed out under shared-runner load, and targeted fixes are already landing. Maintainers also harvested several community PRs that could not be merged directly due to base drift.

## Releases

- **v0.9.7** ([release](https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.7))
  - CodeWhale is now the public product from Shannon Labs; `codewhale` remains the lowercase technical identifier for the command, npm package, and release assets.
  - The legacy `deepseek-tui` npm package is deprecated and receives no further releases; v0.8.x `deepseek` users have a migration path.
  - Release prep PR ([#5341](https://github.com/Hmbown/CodeWhale/pull/5341)) also adds Grok 4.6 as a normal catalog row.

## Hot Issues

1. **[Bug] Auto-Review regression in v0.9.5** ([#5323](https://github.com/Hmbown/CodeWhale/issues/5323)) — Auto-Review silently blocks every Bash call and write operation. High-impact regression; restore PR #5342 is already open.
2. **[Bug] `doctor` stuck on `needs action` after upgrade** ([#5340](https://github.com/Hmbown/CodeWhale/issues/5340)) — `first-run` and `update checkpoint` never clear after 0.9.4 → 0.9.6, even after onboarding.
3. **[Release] Parity test timeout on shared runners** ([#5344](https://github.com/Hmbown/CodeWhale/issues/5344)) — v0.9.7 release failed before artifacts because one semantic-event test missed its five-second deadline under parallel load.
4. **[Release] npm publish loses `GH_TOKEN`** ([#5346](https://github.com/Hmbown/CodeWhale/issues/5346)) — `prepublishOnly` reruns the asset guard without the token; fixed by #5347.
5. **[UX] Wide-terminal output regression** ([#5322](https://github.com/Hmbown/CodeWhale/issues/5322)) — output area no longer fills wide terminals; v0.8.65 behaved correctly.
6. **[i18n] Chinese translation of “Constitution”** ([#4949](https://github.com/Hmbown/CodeWhale/issues/4949)) — ongoing community debate (16 comments) over “宪法” vs “协作准则”, including concerns about political sensitivity.
7. **[Architecture] EPIC-005: TUI crate decomposition** ([#5316](https://github.com/Hmbown/CodeWhale/issues/5316)) — umbrella tracking issue for splitting the TUI into crates; several sub-EPICs report here.
8. **[Agent UX] 32-field `agent` tool schema** ([#5324](https://github.com/Hmbown/CodeWhale/issues/5324)) — one schema, zero required fields, eight actions, plus aliases; models frequently error on it.
9. **[MCP] `nextCursor: null` breaks strict clients** ([#5335](https://github.com/Hmbown/CodeWhale/issues/5335)) — `tools/list` and `resources/list` return `null`, which violates the MCP spec; fixed in #5336.
10. **[UX] TUI never announces available updates** ([#5053](https://github.com/Hmbown/CodeWhale/issues/5053)) — request for a throttled update notice and a one-chord update-and-relaunch flow.

## Key PR Progress

1. [#5342](https://github.com/Hmbown/CodeWhale/pull/5342) **fix(tui): restore bounded Auto-Review execution** — Restores automatic approval for proven read/build/test commands and bounded writes; privileged/network/unknown commands still fail closed.
2. [#5347](https://github.com/Hmbown/CodeWhale/pull/5347) **fix(release): preserve asset auth for npm publish** — Passes the read-only GitHub token into npm trusted publishing; fixes #5346.
3. [#5343](https://github.com/Hmbown/CodeWhale/pull/5343) **test(release): tolerate shared-runner route latency** — Relaxes the hard five-second semantic-event deadline in the locked parity suite; addresses #5344.
4. [#5336](https://github.com/Hmbown/CodeWhale/pull/5336) **fix(mcp): omit `nextCursor` when there are no further pages** — Brings `tools/list` and `resources/list` back to MCP spec compliance; fixes #5335.
5. [#5330](https://github.com/Hmbown/CodeWhale/pull/5330) **fix(session): separate snapshot reads from crash recovery** — Lands community PR #5320 via harvest; adds `load_session_snapshot` for side-effect-free reads and recovery stats.
6. [#5332](https://github.com/Hmbown/CodeWhale/pull/5332) **feat(config): register OrcaRouter as a named provider** — Adds OrcaRouter as an OpenAI-compatible gateway provider alongside OpenRouter; harvested from #5321.
7. [#5331](https://github.com/Hmbown/CodeWhale/pull/5331) **fix(tui): copy messages without visual rails** — Copy uses canonical source content instead of rendered Ratatui lines; fixes #5314; harvested from #5319.
8. [#5329](https://github.com/Hmbown/CodeWhale/pull/5329) **fix(tui): move `lru` to 0.18 and unpin `ratatui-core`** — Fixes RUSTSEC-2026-0253 (`LruCache::pop` panic-safety) and restores the green `main` gate.
9. [#5328](https://github.com/Hmbown/CodeWhale/pull/5328) **FEAT-014: command contract crate boundary** — Prototype for the staged TUI command extraction; defines facets and shared types without production rewiring.
10. [#5338](https://github.com/Hmbown/CodeWhale/pull/5338) **feat(web): move docs guide onto dictionary spine** — First page-group slice of #5337; retires `isZh` ternaries with a per-page `DocsGuideDict`.

## Feature Request Trends

- **Multi-line input / configurable send shortcut** ([#5345](https://github.com/Hmbown/CodeWhale/issues/5345)) — users want Grok Build/Codex-style `Enter`/`Shift+Enter` semantics or custom send keys.
- **Proactive update UX** ([#5053](https://github.com/Hmbown/CodeWhale/issues/5053)) — TUI should check for updates and provide a quick update-and-relaunch path.
- **Session/workflow recovery** ([#5270](https://github.com/Hmbown/CodeWhale/issues/5270), [#5272](https://github.com/Hmbown/CodeWhale/issues/5272)) — unified task visibility, prompt-scoped file restore, and honest turn-stop behavior.
- **Reproducible and reliable releases** ([#5312](https://github.com/Hmbown/CodeWhale/issues/5312), [#5299](https://github.com/Hmbown/CodeWhale/issues/5299), [#5346](https://github.com/Hmbown/CodeWhale/issues/5346)) — `SOURCE_DATE_EPOCH`, trusted npm publishing, and less fragile CI.
- **i18n completeness** ([#4949](https://github.com/Hmbown/CodeWhale/issues/4949), [#5290](https://github.com/Hmbown/CodeWhale/issues/5290), [#5337](https://github.com/Hmbown/CodeWhale/issues/5337), [#5334](https://github.com/Hmbown/CodeWhale/pull/5334)) — dictionary-based routing, clickable localized controls, and accurate locale metadata.

## Developer Pain Points

- **Release/CI flakiness and auth blind spots** — shared-runner timeouts ([#5344](https://github.com/Hmbown/CodeWhale/issues/5344)), `GH_TOKEN` loss in npm publish ([#5346](https://github.com/Hmbown/CodeWhale/issues/5346)), and browser-2FA-gated npm publishing ([#5299](https://github.com/Hmbown/CodeWhale/issues/5299)).
- **Regression whiplash between releases** — v0.9.5 broke Auto-Review ([#5323](https://github.com/Hmbown/CodeWhale/issues/5323)), wide-terminal rendering ([#5322](https://github.com/Hmbown/CodeWhale/issues/5322)), and setup-state checking ([#5340](https://github.com/Hmbown/CodeWhale/issues/5340)).
- **Model-facing tool schema complexity** — the `agent` tool’s 32-field schema causes model errors and is difficult to maintain ([#5324](https://github.com/Hmbown/CodeWhale/issues/5324)).
- **Hardcoded internals add maintenance burden** — archive timestamps ([#5312](https://github.com/Hmbown/CodeWhale/issues/5312)), DeepSeek Pro effort mapping ([#5055](https://github.com/Hmbown/CodeWhale/issues/5055)), and the workflow search worker ceiling ([#5060](https://github.com/Hmbown/CodeWhale/issues/5060)).
- **Contributor friction from base drift** — multiple community PRs pass review but fail CI only on stale bases, forcing maintainers to re-land identical changes as “harvests” ([#5319](https://github.com/Hmbown/CodeWhale/pull/5319)/[#5331](https://github.com/Hmbown/CodeWhale/pull/5331), [#5320](https://github.com/Hmbown/CodeWhale/pull/5320)/[#5330](https://github.com/Hmbown/CodeWhale/pull/5330), [#5321](https://github.com/Hmbown/CodeWhale/pull/5321)/[#5332](https://github.com/Hmbown/CodeWhale/pull/5332)).

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*