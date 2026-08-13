# AI CLI Tools Community Digest 2026-08-13

> Generated: 2026-08-13 01:04 UTC | Tools covered: 10

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

# Cross-Tool Comparison Report — AI CLI Developer Tools
**2026-08-13 Community Digest Analysis**

---

## 1. Ecosystem Overview

The AI CLI tool landscape is in a **stability-hardening phase** rather than a feature-expansion phase. Eight of the ten tracked projects showed active issue/PR traffic, with the dominant themes being Windows desktop reliability, multi-agent coordination failures, MCP/plugin ecosystem maturity, and session state integrity. Release velocity remains high for the mid-tier tools (OpenCode, Pi, Qwen Code, CodeWhale all shipped this window), while the large incumbents (Claude Code, Codex, Gemini) are investing in infrastructure-level fixes: streaming keepalives, thread accounting, and security hardening. A notable signal is the **cross-tool convergence on persistent memory and agent lifecycle controls**, indicating that the next competitive battleground is long-running autonomous workflows, not single-turn codegen quality.

---

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PRs Active (24h) | Release Status |
|---|---|---|---|
| **Claude Code** | 10 | 5 | ✅ v2.1.229 |
| **OpenAI Codex** | 10 | 10 | ✅ rust-v0.148.0-alpha.9 |
| **Gemini CLI** | 10 | 10 | ✅ v0.56.0-nightly.20260812 |
| **GitHub Copilot CLI** | 10 | 3 | ⬜ None |
| **Kimi Code CLI** | 1 | 2 | ⬜ None |
| **OpenCode** | 10 | 10 | ✅ v1.18.17 |
| **Pi** | 10 | 10 | ⬜ None |
| **Qwen Code** | 10 | 10 | ✅ desktop-v0.2.0 / v0.2.1 |
| **DeepSeek TUI / CodeWhale** | 10 | ~10 | ✅ v0.9.6 |
| **Grok Build** | 0 | 0 | ⬜ Dormant |

*Claude Code, Codex, Gemini, OpenCode, Pi, Qwen, and CodeWhale all shipped meaningful releases or maintained double-digit PR throughput. Copilot CLI shows steady issue volume but thin maintainer output (3 PRs, mostly bot-driven). Kimi Code is nearly idle. Grok Build is fully dormant.*

---

## 3. Shared Feature Directions

The following requirements recur across **three or more** tool communities:

| Direction | Tools | Specific Needs |
|---|---|---|
| **Persistent memory / cross-session context** | Kimi (#1283), Qwen (#7040), Gemini (#26522), CodeWhale (#2904) | Auto-managed memory, manual user instructions, low-signal filtering, deterministic redaction, reliable recall |
| **Multi-agent reliability & true status reporting** | Gemini (#22323, #21409), Claude Code (#54393), Qwen (#8097), OpenCode (#42174), CodeWhale (#5323) | No false "success" on truncation, no silent hangs, subagent permission inheritance, coordination without duplicate work |
| **MCP / plugin ecosystem hardening** | Copilot (#1305, #4466), Gemini (#28787), Claude Code (#14061), OpenCode (#33027), Qwen (#9007) | OAuth/CIMD flows, fail-closed config parsing, cache invalidation, tool discovery, bounded buffers |
| **Windows & desktop reliability** | Claude Code (#81698, #85199), Codex (#26990, #33967), Copilot (#4328), CodeWhale (#4564) | GPU process crash isolation, crash-safe local state, WSL2 key handling, connection recovery |
| **Security & governance enforcement** | Claude Code (#84352, #61268), OpenCode (#17073, #42174), Gemini (#28691), Copilot (#4449) | Deny-rule trust, `.env` leakage via grep, variable-expansion bypasses, least-privilege CI automation |
| **Session continuity / resume robustness** | Claude Code (remote-control resume), Codex (#38144), Qwen (#8678), OpenCode (#42185) | Crash-safe transcripts, no duplicate turns on resume, preserving live session on restore timeout |
| **Interrupt / lifecycle control for autonomous runs** | CodeWhale (#4959), Codex (#28969), Claude Code (#66202), Gemini (#22598) | Reliable stop commands, disabling auto-resolve, dismissing finished agents, visible agent state |
| **Tool-call contract strictness** | CodeWhale (#5209), Pi (#7835, #7836), Gemini (#22323), Claude Code (#57888) | Reject invalid params instead of fake success; whitespace-tolerant fuzzy matching; no false-positive matches |

---

## 4. Differentiation Analysis

**Claude Code** is positioning as the **enterprise governance platform**: CVP approval policy, server-supplied hooks for self-hosted runners, and remote-control session management. Its community is mature and policy-focused, with less raw feature velocity than mid-tier competitors.

**OpenAI Codex** is the most **infrastructure-heavy** project this window: turn-routing APIs, thread-usage accounting with USD cost estimates in `/status`, and gRPC session reconnection. This points at a target user running **large, account-managed enterprise fleets** with cost observability requirements.

**Gemini CLI** differentiates on **agent architecture and eval rigor** — subagent delegation, skills, behavioral eval suites (76 tests across 6 models), and a security-hardening PR stream (MCP fail-open, variable expansion, SSRF). Its pain points (false GOAL success, agent hangs) show it is pushing agent autonomy harder than peers.

**GitHub Copilot CLI** is the **ecosystem integration play**: ACP extensions, hooks, model catalogs from Copilot Business, and remote MCP OAuth. Its weakness is throughput — 3 PRs versus 10+ for peers — while issues accumulate around silent model overrides and resource leaks.

**OpenCode** owns the **TUI-first developer experience** niche: Mermaid GitGraph rendering, click-to-annotate catalogs, per-session budget widgets. Its biggest drag is systemic billing/entitlement state bugs that erode trust despite strong UX work.

**Pi** is the **power-user TUI specialist**: mouse-event support, HTML export parity, local Ollama proxy, theme overrides. Its community is smaller but highly engaged on terminal ergonomics and provider coverage.

**Qwen Code** is investing in **daemon/channel operations** (session rotation, channel policies, workspace-scoped memory, byte-bounded ACP buffers) plus a desktop transition from Electron to Tauri. It reads like a **platform operator's tool** — multi-channel, multi-session, server-style architecture.

**CodeWhale** (formerly DeepSeek TUI) is **rebranding and restructuring** — crate decomposition, command-contract boundaries, i18n dictionary spine. Its most distinctive community concern is tool-contract strictness: silently accepting wrong parameters and reporting fake success is its sharpest pain point.

---

## 5. Community Momentum & Maturity

**Mature, high-volume:** Claude Code and OpenAI Codex have the largest, most enterprise-oriented communities. Issues are detailed, governance-aware, and often security-related. Claude Code's closed Linux desktop request at 498 👍 indicates a large, vocal user base channeling demand effectively.

**Rapid iteration, high engagement:** Gemini CLI, OpenCode, and Qwen Code are shipping fastest relative to their issue load. Gemini pairs p1 security PRs with a clear agent-reliability roadmap. OpenCode closes issues and ships releases despite a serious billing bug cluster. Qwen Code landed two desktop releases plus 10 infrastructure PRs in 24h.

**Focused niche communities:** Pi and CodeWhale have smaller but technically deep communities — Pi around TUI craftsmanship and local models, CodeWhale around tool-contract correctness and i18n.

**Stalling:** Copilot CLI has issue volume but minimal maintainer PR activity this window. Kimi Code is nearly dormant (1 issue, 2 PRs, no release). Grok Build shows zero activity and should be considered unmaintained until proven otherwise.

---

## 6. Trend Signals

1. **Reliability has replaced capability as the #1 user demand.** Auto-compaction triggering too late (Pi), infinite retry loops (OpenCode), false success reports (Gemini, CodeWhale), and session-corrupting crashes (Codex, Claude Code) dominate the highest-engagement issues. Developers are willing to tolerate missing features, but not broken trust in autonomous runs.

2. **Multi-agent systems are hitting a trust ceiling.** The industry is discovering that subagent orchestration at scale produces coordination bugs: duplicate work, premature completion, silent hangs, permission escapes. Expect a wave of investment in **observability for agent trajectories** (Gemini's `/chat share`, Codex's thread-usage reporting, Claude Code's multi-agent post-mortems).

3. **Windows is the weakest platform across the board.** GPU process crashes (Claude Code), power-loss state corruption (Codex), WSL2 key handling (Copilot CLI), and tmux flicker (Qwen) all point to desktop/terminal integration being the most fragile layer of the stack. Cross-platform reliability is a clear differentiator opportunity.

4. **Persistent memory is the next battleground.** Kimi, Qwen, Gemini, and CodeWhale all have active memory-system initiatives. The open questions are consistent: what to recall automatically, how to redact before model exposure, and how to filter low-signal sessions.

5. **Security hardening is moving from app-level to config-level.** The latest CVEs/PRs are about MCP config corruption failing open (Gemini), variable expansion bypasses, `.env` leakage via grep, and CI automation privilege (Copilot CLI). Toolchains are becoming supply-chain surfaces, and communities expect fail-closed defaults.

6. **Spend controls and entitlement transparency are emerging requirements.** OpenCode's billing bug cluster and Codex's thread-cost reporting in `/status` show both the pain (users wrongly blocked by free-tier caps) and the direction (per-session budgets, cost breakdowns in status surfaces).

7. **Provider/model portability is assumed, not a feature.** Communities across all tools expect first-class support for Gemini, Claude, DeepSeek, Grok, and local models (Ollama in Pi). Gaps like Gemini `thoughtSignature`, Azure streaming, or org-enabled model catalog visibility are treated as bugs, not roadmaps.

8. **TUI ergonomics are being rediscovered as competitive.** Arrow-key navigation traps (Claude Code), scrollback loss (Codex), ambiguous-width CJK alignment (Pi), Mermaid rendering (OpenCode), and rail-free copy (CodeWhale) show that terminal UX polish is a visible, upvoted differentiator in a CLI-dominated market.

---

*Data sources: official GitHub issue/PR/release streams for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, OpenCode, Pi, Qwen Code, CodeWhale, and Grok Build — 2026-08-13.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-08-13

*Note: The snapshot sorted PRs by comment activity but did not capture exact comment counts; ranking below follows that order. All PRs referenced remain **open** as of the data date.*

## 1. Top Skills Ranking

1. **skill-creator evaluation fix** — [anthropics/skills#1298](https://github.com/anthropics/skills/pull/1298)
   The most-discussed PR in the snapshot. Fixes `run_eval.py` always reporting `recall=0%` for every skill description (tracked in issue #556 with 10+ independent reproductions), which rendered the description-optimization loop in `run_loop.py`/`improve_description.py` ineffective. Also fixes trigger detection, Windows stream reading, and parallel workers. **Status: open** — the de-facto blocker for the entire skill-authoring workflow.

2. **document-typography skill** — [anthropics/skills#514](https://github.com/anthropics/skills/pull/514)
   Typographic quality control for generated documents: orphan word wrap (1–6 words spilling onto the next line), widow paragraphs (section headers stranded at page bottom), and numbering misalignment — defects the author notes affect "every document Claude generates." **Status: open**.

3. **ODT / OpenDocument skill** — [anthropics/skills#486](https://github.com/anthropics/skills/pull/486)
   Create, fill, read, and convert OpenDocument files (.odt, .ods), including ODT→HTML parsing, with broad triggers (ODT, ODS, ODF, OpenDocument, LibreOffice). Extends the existing docx/pdf skill family into ISO-standard open formats. **Status: open**.

4. **frontend-design skill overhaul** — [anthropics/skills#210](https://github.com/anthropics/skills/pull/210)
   Rewrites the frontend-design skill for clarity, actionability, and internal coherence, with the goal that every instruction is something Claude can actually follow within a single conversation. Representative of the community push to convert educational prose into operational instructions. **Status: open**.

5. **skill-quality-analyzer & skill-security-analyzer** — [anthropics/skills#83](https://github.com/anthropics/skills/pull/83)
   Two meta-skills for the example-skills marketplace: a five-dimension quality analyzer (structure & documentation, SKILL.md quality, examples, resources) and a dedicated security analyzer. Early (Nov 2025) signal of the community's later security concerns. **Status: open**.

6. **self-audit skill** — [anthropics/skills#1367](https://github.com/anthropics/skills/pull/1367)
   Universal pre-delivery audit: mechanical file verification first, then a four-dimension reasoning audit in damage-severity priority order. Positioned as model- and stack-agnostic, working with any project. **Status: open**.

7. **testing-patterns skill** — [anthropics/skills#723](https://github.com/anthropics/skills/pull/723)
   Comprehensive testing skill: Testing Trophy philosophy, what to test vs. what not to test, unit testing (AAA pattern, naming, pure functions, edge cases), and React component testing with Testing Library. Directly answers one of the most-requested skill categories. **Status: open**.

8. **ServiceNow platform skill** — [anthropics/skills#568](https://github.com/anthropics/skills/pull/568)
   Broad ServiceNow platform assistant covering ITSM, ITOM, ITAM/SAM Pro, FSM, HRSD/CSM, SPM/PPM, Vulnerability Response, Security Incident Response, and IntegrationHub. Updated as recently as 2026-08-12, making it the most actively maintained large-scale skill PR. **Status: open**.

## 2. Community Demand Trends (from Issues)

- **Skill security & trust boundary** — [#492](https://github.com/anthropics/skills/issues/492) (43 comments, the hottest issue by far): community skills distributed under the `anthropic/` namespace impersonate official Anthropic skills, creating a trust-boundary vulnerability where users grant elevated permissions to what they believe is official. Reinforced by [#1175](https://github.com/anthropics/skills/issues/1175) (security and context-window concerns when embedding access-control logic in SKILL.md for SharePoint Online).
- **Org-wide sharing & distribution** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍): organizations want shared skill libraries/direct share links instead of Slack-circulated `.skill` files; [#189](https://github.com/anthropics/skills/issues/189) (9 👍) adds that overlapping plugins install identical skills, wasting context-window space.
- **Reliable skill-authoring toolchain** — [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) and [#1169](https://github.com/anthropics/skills/issues/1169): `run_eval.py` scores 0% recall on every iteration, so the description-optimization loop is "optimizing against noise"; [#202](https://github.com/anthropics/skills/issues/202) argues skill-creator reads like developer documentation rather than an operational skill.
- **Context-window efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487): the bundled `claude-api` skill eagerly injects ~156k tokens, exhausting the context window in a single tool call.
- **Platform & protocol integration** — [#29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock support) and [#16](https://github.com/anthropics/skills/issues/16) (expose Skills as MCPs).
- **Memory & state management** — [#1329](https://github.com/anthropics/skills/issues/1329): a compact-memory skill proposal using symbolic notation to reduce context spent on a long-running agent's prose notes.
- **Governance patterns** — [#412](https://github.com/anthropics/skills/issues/412) (closed, but signals demand): agent-governance skill for policy enforcement, threat detection, trust scoring, and audit trails.

## 3. High-Potential Pending Skills

Active PRs with real community pull that have not yet merged:

- **pyxel retro game development** — [anthropics/skills#525](https://github.com/anthropics/skills/pull/525) — Skill wrapping the pyxel-mcp server for the Pyxel retro/pixel-art/8-bit Python game engine (write → run_and_capture → inspect → iterate). Notable as a Skill+MCP pairing, authored by the Pyxel creator (kitao).
- **SAP-RPT-1-OSS predictor** — [anthropics/skills#181](https://github.com/anthropics/skills/pull/181) — Predictive analytics on SAP business data via SAP's open-source (Apache 2.0) tabular foundation model released at TechEd 2025.
- **plan-file-hygiene** — [anthropics/skills#1479](https://github.com/anthropics/skills/pull/1479) — Addresses #1417: gives planning artifacts a lifecycle instead of unbounded accumulation; community-framed as a "lifecycle gap."
- **Agent Skills spec-compliance fix** — [anthropics/skills#1538](https://github.com/anthropics/skills/pull/1538) — Brings two skills back under the Agent Skills spec (e.g., `name` field must match its directory) in the repo that serves as the spec's reference implementation.
- **Reliability fix cluster for skill-creator / document skills** — [#1099](https://github.com/anthropics/skills/pull/1099) and [#1050](https://github.com/anthropics/skills/pull/1050) (Windows subprocess/pipe crashes), [#539](https://github.com/anthropics/skills/pull/539) (unquoted YAML descriptions with `:`), [#538](https://github.com/anthropics/skills/pull/538) (case-sensitive pdf file references), [#541](https://github.com/anthropics/skills/pull/541) (docx tracked-change `w:id` collisions causing document corruption). These fixes are likely to land alongside #1298 to unblock Windows users and stabilize the document skills.

## 4. Skills Ecosystem Insight

The community's most concentrated demand is lifecycle hardening — trustworthy distribution, org-wide sharing, a reliable authoring/eval toolchain, and context-window discipline — with document quality, testing, and enterprise-platform skills as the leading new-content categories.

---

# Claude Code Community Digest — 2026-08-13

## Today's Highlights
Claude Code shipped v2.1.229, adding documented remote-control resume support, server-supplied hook support for self-hosted runners, and SSE keepalive stability improvements. Meanwhile, the community continues to push on governance-related blockers (CVP approval not respected in Claude Code), Windows desktop reliability, and a long-requested official Linux desktop build that closed after accumulating 498 👍.

## Releases
- **v2.1.229** — [Release link](https://github.com/anthropics/claude-code/releases)
  - Documented `claude remote-control --continue` for resuming the most recent Remote Control session.
  - Added server-supplied Claude Code hook support for self-hosted runner sessions, matching managed-environment behavior.
  - Added SSE keepalive pings to gateway streaming responses.

## Hot Issues
1. **[#84352 — CVP-approved Claude.ai org still receives cyber safeguard blocks in Claude Code](https://github.com/anthropics/claude-code/issues/84352)**  
   High-engagement (80 comments). A user with prior Cyber Verification Program approval is again blocked by cyber-safeguards, and the Verification Portal shows “Under review” despite approval. Enterprise governance users are watching closely.

2. **[#65697 — Official Claude Desktop build for Linux (Ubuntu LTS / Debian)](https://github.com/anthropics/claude-code/issues/65697)**  
   Closed with 498 👍 — among the strongest community signals in this dataset. Linux users have been asking for a first-class desktop build for months.

3. **[#54393 — Post-mortem: 12 multi-agent coordination bugs across one autonomous overnight cycle](https://github.com/anthropics/claude-code/issues/54393)**  
   Still active with 27 comments. A detailed catalog of coordination failures relevant to anyone running multi-agent/background-task workflows.

4. **[#81698 — Windows desktop: GPU process crash kills entire app and all sessions](https://github.com/anthropics/claude-code/issues/81698)**  
   25 comments. NVIDIA/Windows desktop users are hitting hard crashes that destroy live sessions — a major reliability concern for daily drivers.

5. **[#14061 — `/plugin update` does not invalidate plugin cache](https://github.com/anthropics/claude-code/issues/14061)**  
   25 comments and 31 👍. Reproducible bug where plugin updates fetch new versions but sessions continue using stale cached behavior.

6. **[#75899 — Left arrow accidentally navigates to agents screen and is not rebindable](https://github.com/anthropics/claude-code/issues/75899)**  
   14 comments. A macOS TUI keybinding trap that disrupts chat focus and fails to restore the main session view on return.

7. **[#85199 — Claude Desktop repeatedly crashes and requires “Advanced Options → Repair” on Windows](https://github.com/anthropics/claude-code/issues/85199)**  
   13 comments. Another Windows stability report, reinforcing a growing pattern of Electron/GPU lifecycle issues on that platform.

8. **[#79366 — Worktree sessions reuse an existing worktree directory from a previous session](https://github.com/anthropics/claude-code/issues/79366)**  
   11 comments. Worktree isolation is supposed to create fresh environments; reusing unrelated previous worktrees can leak context across sessions.

9. **[#82326 — Claude Opus 5 generates hallucinated responses not present in previous versions](https://github.com/anthropics/claude-code/issues/82326)**  
   9 comments. Users report Opus 5 re-introducing invented answers compared with Opus 4.8 behavior — a model-quality regression concern.

10. **[#61268 — Security: `permissions.deny` rules not working](https://github.com/anthropics/claude-code/issues/61268)**  
   5 comments but high security impact. Administrators relying on deny rules for guardrails cannot fully trust them, which is critical for enterprise adoption.

## Key PR Progress
Only 5 PRs were active/updated in the last 24h; all are listed below.

- **[#85925 — docs: point remaining stale doc links at code.claude.com](https://github.com/anthropics/claude-code/pull/85925)**  
  Documentation cleanup replacing old `docs.claude.com` links with canonical `code.claude.com` targets. Closed.

- **[#85822 — docs: fix stale doc links and README drift in plugins and examples](https://github.com/anthropics/claude-code/pull/85822)**  
  Verified docs-only fixes for hooks, plugins, and README references. Closed.

- **[#41611 — add the missing source to claude code](https://github.com/anthropics/claude-code/pull/41611)**  
  Open PR with minimal description; unclear scope, likely source/documentation addition.

- **[#42996 — examples: Add MEP (Meat Puppet Elimination Protocol) — async state relay for multi-machine AI sessions](https://github.com/anthropics/claude-code/pull/42996)**  
  Open example demonstrating a zero-infrastructure pattern for preserving session state across machine switches.

- **[#57888 — Scope `child_process_exec` to JS/TS files (fix Python false-positive)](https://github.com/anthropics/claude-code/pull/57888)**  
  Fixes the security reminder hook incorrectly matching Python `asyncio.create_subprocess_exec()` due to substring matching. Closed.

## Feature Request Trends
- **Official Linux desktop support** remains the clearest top request, with #65697 reaching 498 👍 even as it closed.
- **Agent/session lifecycle controls** are a growing direction: users want to dismiss completed agents (#66202) and need clearer sleeping/blocked state indicators (#86082).
- **Cross-machine and session continuity** is being requested, including surfacing on-disk transcripts (#81835) and async state relay patterns (#42996).
- **Plugin/marketplace consistency** is a repeated theme: cache invalidation (#14061), marketplace update propagation (#76882), and MCP result filtering (#72239).
- **Governance/security verification** continues trending, especially around CVP policy reflection (#84352) and permission-rule enforcement (#61268).

## Developer Pain Points
- **Windows desktop instability**: GPU process crashes, required repairs, and self-repair paths that can uninstall the app and wipe data (#81698, #85199, #85905).
- **Policy and permission confusion**: legitimate users blocked despite CVP approval (#84352), domain-blocked business automation (#40173), and `permissions.deny` not being honored (#61268).
- **Cache invalidation costs**: plugin caches not refreshing (#14061) and prompt cache invalidation caused by small `git status` changes (#78720) directly impact developer cost and velocity.
- **Agent-session UX gaps**: unrebindable arrow-key navigation (#75899), missing sleep/blocked state clarity (#86082), and worktree session reuse (#79366) disrupt long-running workflows.
- **Model/tool regressions**: Opus 5 hallucinations (#82326), WebSearch HTTP 400 at high effort levels (#83364), and dropped cross-session messages (#86237) show friction with newer model and desktop-app behavior.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex Community Digest — 2026-08-13

### Today’s Highlights
The Codex team published **rust-v0.148.0-alpha.9** and closed a broad set of infrastructure PRs around turn submission/routing, thread usage reporting, and plugin metrics. Community attention remains heavily focused on Windows/VS Code IDE context regressions and Desktop session-state reliability. The most upvoted discussion continues to be the request for a setting to disable Codex’s 60-second auto-resolve for interactive questions.

### Releases
- **rust-v0.148.0-alpha.9** — published 2026-08-13 via the [OpenAI Codex releases page](https://github.com/openai/codex/releases). No detailed changelog was attached to the release entry in the data.

### Hot Issues
1. [openai/codex#28969](https://github.com/openai/codex/issues/28969) — **Add setting to disable the auto-resolve in 60 seconds for questions** · 70 comments, 194 👍. The most active issue; users want control over when CLI/plan-mode questions time out.
2. [openai/codex#25178](https://github.com/openai/codex/issues/25178) — **Windows Computer Use screenshot fails on Windows 10 22H2** when `SetIsBorderRequired` is called. 25 comments, 13 👍.
3. [openai/codex#31553](https://github.com/openai/codex/issues/31553) — **VS Code extension stopped auto-including IDE context after update** on remote/container environments. 17 comments, 12 👍.
4. [openai/codex#26990](https://github.com/openai/codex/issues/26990) — **Windows Desktop local state is not crash-safe after power loss**; pins/projects reset and config regresses. 14 comments.
5. [openai/codex#37398](https://github.com/openai/codex/issues/37398) — **Desktop waits ~5 seconds on owner-discovery timeout** before opening unloaded local chats. 14 comments, 9 👍.
6. [openai/codex#33967](https://github.com/openai/codex/issues/33967) — **ChatGPT/Codex for Windows cannot complete setup or enter limited-access mode**. 12 comments.
7. [openai/codex#34920](https://github.com/openai/codex/issues/34920) — **IDE Context fails in recent Codex extension builds with RPC serialization error**. 10 comments.
8. [openai/codex#35419](https://github.com/openai/codex/issues/35419) — **VS Code IDE context auto-disables and selected text is not attached in WSL2**. 6 comments, 10 👍.
9. [openai/codex#24280](https://github.com/openai/codex/issues/24280) — **Remote-created Desktop threads do not receive automation_update/load_workspace_dependencies**. 5 comments, 6 👍.
10. [openai/codex#30745](https://github.com/openai/codex/issues/30745) — **TUI scrollback rows disappear after inline viewport height changes**. 5 comments.

### Key PR Progress
1. [openai/codex#38275](https://github.com/openai/codex/pull/38275) — Unifies turn input submission/routing with typed `start_or_steer_turn`, `start_turn_if_idle`, and `steer_turn` APIs.
2. [openai/codex#38272](https://github.com/openai/codex/pull/38272) — Stamps conversation history items with fractional Unix creation times while preserving supplied timestamps.
3. [openai/codex#38281](https://github.com/openai/codex/pull/38281) — Adds estimated thread usage to `/status`, including optional USD cost and model/reasoning/token breakdowns.
4. [openai/codex#38282](https://github.com/openai/codex/pull/38282) — Adds `thread-credits` and `estimated-thread-cost` items to configurable TUI status surfaces for Enterprise workspaces.
5. [openai/codex#38274](https://github.com/openai/codex/pull/38274) — Tightens world-state persistence by representing persisted snapshots/merge patches as JSON objects.
6. [openai/codex#38268](https://github.com/openai/codex/pull/38268) — Exposes executor skill roots from `skills.read`, fixing discovery of bundled executor scripts.
7. [openai/codex#38265](https://github.com/openai/codex/pull/38265) — Uses bounded fallback ports for Windows managed HTTP/SOCKS5 proxies, reducing port-collision issues.
8. [openai/codex#38257](https://github.com/openai/codex/pull/38257) — Reconnects gRPC code-mode sessions after host restarts, with serialized reconnections and host-generation-scoped cell IDs.
9. [openai/codex#38253](https://github.com/openai/codex/pull/38253) — Collects plugin metrics from unified exec commands via a metrics sidecar.
10. [openai/codex#38276](https://github.com/openai/codex/pull/38276) — Extends plugin metric collection to background unified exec commands, keeping measurement active after the turn completes.

### Feature Request Trends
- **Control over interactive waits**: Developers want more control over when Codex pauses or resumes, including disabling the 60-second auto-resolve ([#28969](https://github.com/openai/codex/issues/28969)), allowing `request_user_input` to wait indefinitely in Default mode ([#37472](https://github.com/openai/codex/issues/37472)), and optional audible alerts for pending permission approvals ([#11604](https://github.com/openai/codex/issues/11604)).
- **TUI/UX polish**: Users continue requesting opt-out controls for visual behavior, such as disabling autoscroll during long responses ([#23517](https://github.com/openai/codex/issues/23517)).

### Developer Pain Points
- **Windows and VS Code IDE context reliability**: Multiple reports describe IDE context silently disabling, missing `workspaceRoot`, RPC serialization failures, and missing active-file/selection data — especially on Windows, WSL2, and remote/container setups ([#31553](https://github.com/openai/codex/issues/31553), [#34920](https://github.com/openai/codex/issues/34920), [#35419](https://github.com/openai/codex/issues/35419), [#34696](https://github.com/openai/codex/issues/34696)).
- **Windows Desktop state/session integrity**: Power-loss state corruption, archived threads reappearing, setup being stuck, and freezes with active subagents remain recurring complaints ([#26990](https://github.com/openai/codex/issues/26990), [#33967](https://github.com/openai/codex/issues/33967), [#37018](https://github.com/openai/codex/issues/37018), [#25541](https://github.com/openai/codex/issues/25541)).
- **Thread/resume robustness**: Users are hitting regressions where `/fork` leaves an active writer, compacted threads drop newest turns, side-thread creation fails, and stale subagents leave Desktop blank ([#38144](https://github.com/openai/codex/issues/38144), [#38169](https://github.com/openai/codex/issues/38169), [#38248](https://github.com/openai/codex/issues/38248), [#38250](https://github.com/openai/codex/issues/38250)).
- **Windows Computer Use fragility**: Screenshot capture and window enumeration remain unreliable on Windows, blocking automation workflows ([#25178](https://github.com/openai/codex/issues/25178), [#37743](https://github.com/openai/codex/issues/37743)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-13

## 1. Today's Highlights
The project shipped a new nightly release (v0.56.0-nightly.20260812) fixing false model capacity exhaustion and quota lookup mapping, alongside a new local eval report command. Agent reliability remains the dominant community theme: subagents falsely reporting GOAL success after MAX_TURNS (#22323) and generalist agent hangs (#21409) continue drawing the most engagement. Security hardening is also active, with multiple PRs addressing MCP config corruption fail-open and a variable expansion bypass.

## 2. Releases
**v0.56.0-nightly.20260812.g5024443c7**
- fix(core,cli): resolve false model capacity exhaustion and fix core quota lookup model mapping ([PR #28730](https://github.com/google-gemini/gemini-cli/pull/28730))
- feat(evals): add local report command and developer documentation

## 3. Hot Issues
1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reported as GOAL success** (p1, 12 comments): `codebase_investigator` reports `status: "success"` / `Termination Reason: "GOAL"` even after hitting max turns before doing any analysis. False success masks real failures and corrupts downstream decision-making.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs** (p1, 8 comments, 8 👍): Simple operations like folder creation hang indefinitely when the CLI defers to the generalist agent; users report waiting up to an hour. Workaround: instructing the model to never use subagents.

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck with "Waiting input"** (p1, 4 comments, 3 👍): Non-interactive CLI commands remain displayed as active/awaiting input after completion. High-frequency pain point for automation workflows.

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** (8 comments): Proposal to let Gemini 3's native bash affinity run safely via sandboxing, with intent routing after execution.

5. **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — Robust component level evaluations** (7 comments): Epic tracking expansion of the 76 behavioral eval tests across 6 Gemini models; strong community interest in eval quality and coverage.

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads, search, and mapping** (7 comments): Investigating whether AST-aware tools can reduce token noise, cut turns, and improve codebase navigation precision.

7. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini doesn't use skills and sub-agents enough** (6 comments): Anecdotal reports that custom skills and sub-agents are only invoked when explicitly instructed, despite relevant descriptions.

8. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory retrying low-signal sessions indefinitely** (5 comments): Sessions deemed low-signal are never marked processed, causing repeated re-surfacing and wasted extraction cycles.

9. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction and reduce Auto Memory logging** (4 comments): Security concern: transcript content is sent to the extraction model before prompt-based redaction; logging may leak skill content.

10. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails in Wayland** (p1, 4 comments): Browser agent terminates with GOAL status on Wayland sessions, part of the broader browser agent reliability thread.

## 4. Key PR Progress
1. **[#28790](https://github.com/google-gemini/gemini-cli/pull/28790) — Context-aware silent retries and availability TTL for capacity errors** (p1): Closes the critical capacity retry regression in #28761; adds backoff retries for unattended runs plus 2 silent retries for interactive sessions.

2. **[#28787](https://github.com/google-gemini/gemini-cli/pull/28787) — Don't treat corrupt MCP enablement config as empty** (p1): Prevents JSON parse failures from collapsing into `{}`, which silently re-enables all MCP servers.

3. **[#28794](https://github.com/google-gemini/gemini-cli/pull/28794) — Prevent fail-open and data loss on corrupt MCP enablement config** (p1, fixes #28786): Companion hardening for the same vulnerability, blocking fail-open re-enablement and preserving user config.

4. **[#28691](https://github.com/google-gemini/gemini-cli/pull/28691) — Block $VAR/${VAR} variable expansion bypass** (p1, security): Fixes incomplete checks in `detectBashSubstitution()` / `detectPowerShellSubstitution()` for GHSA-wpqr-6v78-jr5g, plus workflow hardening.

5. **[#28789](https://github.com/google-gemini/gemini-cli/pull/28789) — Fix vscode-ide-companion stop() hang** (p1): Resolves indefinite hang with active streaming MCP sessions and fixes keep-alive failure threshold (#28785).

6. **[#28793](https://github.com/google-gemini/gemini-cli/pull/28793) — Stabilize file-system-interactive e2e test** : Adds prompt synchronization to fix flakiness on slow runners and Windows VMs.

7. **[#28788](https://github.com/google-gemini/gemini-cli/pull/28788) — Behavioral evals for skills fetch** : Adds eval coverage for `activate_skill` and `web_fetch`, plus Windows-compat improvements and EDK report aggregator fixes.

8. **[#28673](https://github.com/google-gemini/gemini-cli/pull/28673) — Gemini 3.6 Flash and 3.5 Flash-Lite model configurations** (p2): Adds base model definitions, capabilities (`thinking`, `multimodalToolUse`), aliases, and code execution configs for new models.

9. **[#28738](https://github.com/google-gemini/gemini-cli/pull/28738) — Allow agents to call agents** (p2, help wanted): Lets subagents delegate or recurse via `tools:` frontmatter, addressing #22092.

10. **[#28405](https://github.com/google-gemini/gemini-cli/pull/28405) — Prevent scroll position jump during content updates** (p1): Fixes #5009 where auto-scroll re-engages too aggressively in `VirtualizedList.tsx`.

## 5. Feature Request Trends
- **Agent reliability & introspection**: Users want truthful termination statuses, visible subagent trajectories (via `/chat share`, #22598), and protection from destructive actions like `git reset` / `--force` (#22672).
- **Autonomous skill/sub-agent usage**: The model should proactively leverage custom skills and sub-agents without explicit prompting (#21968, #21432).
- **AST-aware codebase tools**: Multiple epics exploring AST-based reads, search, and mapping to reduce token usage and improve precision (#22745, #22746).
- **Memory system hardening**: Better filtering of low-signal sessions, deterministic redaction, and quarantine of invalid memory patches (#26522, #26523, #26516).
- **Browser agent resilience**: Session takeover, lock recovery, Wayland support, and respecting `settings.json` overrides (#22232, #22267, #21983).

## 6. Developer Pain Points
- **False success / silent hangs**: Subagents report GOAL success on MAX_TURNS; generalist agent and shell commands hang indefinitely — severe trust and automation blockers (#22323, #21409, #25166).
- **Subagents running despite config**: Regression where subagents activate even when disabled in all configurations (#22093).
- **Security & data leak concerns**: Variable expansion bypasses, SSRF via hostname resolution in `web-fetch`, and transcript content reaching model context before redaction (#28691, #28557, #26525).
- **Tool overload**: 400 errors when >128 tools are enabled; users want smarter tool scoping (#24246).
- **Config staleness**: Symlinked agent files ignored, browser agent ignoring `settings.json`, and MCP enablement config corruption silently fail-open (#20079, #22267, #28787).
- **Workspace hygiene**: Models scattering tmp scripts across directories, complicating clean commits (#23571).
- **Terminal UX issues**: Corruption after exiting external editors in `terminalBuffer` mode and flicker on resize (#24935, #21924).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-13

## Today’s Highlights
No new releases landed in the last 24 hours. Issue activity is concentrated around MCP/OAuth reliability, model-catalog and model-override bugs, and resource-leak reports affecting long-lived sessions. The only high-signal PR is a security-focused migration away from `pull_request_target` for repository automation.

## Releases
No new releases were published in the last 24h.

## Hot Issues

1. **[#1305 Support CIMD for Remote OAuth MCP Servers](https://github.com/github/copilot-cli/issues/1305)** — 35 👍, 5 comments  
   The strongest community demand in this window. Users need a non-interactive OAuth flow for remote MCP servers rather than relying only on dynamic client registration.

2. **[#1730 `sessionStart` hook in `.github/hooks/` does not fire](https://github.com/github/copilot-cli/issues/1730)** — 8 comments, 3 👍  
   Windows/PowerShell users report that session-start hooks never execute. The issue has been open since February and remains unresolved.

3. **[#4328 Ctrl+H is misinterpreted as Ctrl+Backspace under WSL2](https://github.com/github/copilot-cli/issues/4328)** — 6 comments  
   A `WT_SESSION` environment leak from Windows Terminal changes key handling, breaking documented line-editing behavior.

4. **[#4390 Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)** — 5 comments, 4 👍  
   Org-enabled models such as Claude Sonnet 5/Opus 5 and Kimi K3 are not visible in the CLI, despite being explicitly enabled for Copilot Business.

5. **[#2109 ACP: support `ask_user` / `ask_question` extension method](https://github.com/github/copilot-cli/issues/2109)** — 7 👍, 3 comments  
   ACP extension developers want structured clarifying questions instead of only permission-request flows.

6. **[#3976 Native `tgrep` indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976)** — 2 comments  
   The `tgrep serve` daemon has no memory cap, which can destabilize the entire machine during indexing.

7. **[#4422 All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)** — 3 👍  
   Enterprise personal accounts suddenly cannot use Claude models despite settings showing them enabled. The issue persists across CLI version rollbacks.

8. **[#4468 `--server --stdio` never releases extension-host processes](https://github.com/github/copilot-cli/issues/4468)** — 0 comments, high severity  
   Each session spawns four extension-host child processes that are never terminated when the session ends, causing accumulation in long-lived server mode.

9. **[#4466 Remote MCP: transient 5xx on `initialize` marks server failed for whole session](https://github.com/github/copilot-cli/issues/4466)** — 0 comments  
   A single 502 during initialization disables the MCP server for the rest of the session with no retry or backoff.

10. **[#4464 Remote MCP OAuth silent refresh fails with AADSTS70011](https://github.com/github/copilot-cli/issues/4464)** — 0 comments  
    A scope bug in the refresh request forces interactive sign-in roughly every 60–75 minutes instead of using silent refresh.

## Key PR Progress
Only 3 PRs were updated in the last 24h; all are listed below.

1. **[#4449 Migrate pull request automation away from `pull_request_target`](https://github.com/github/copilot-cli/pull/4449)** — Open  
   Security hardening for repo automation: invalid issues are closed with an issue-scoped write token, and PR handling uses a no-permission `pull_request` signal.

2. **[#4453 Julesdemangeot ship it patch 1](https://github.com/github/copilot-cli/pull/4453)** — Closed  
   Automated “ship it” patch with no summary provided; low signal.

3. **[#4452 Revert 5 copilot/fix with copilot](https://github.com/github/copilot-cli/pull/4452)** — Closed  
   Automated revert with no summary provided; likely a bot-generated rollback.

## Feature Request Trends

- **MCP/OAuth maturity** — Requests for CIMD support (#1305), silent-refresh scope fixes (#4464), retry/backoff for transient 5xx errors (#4466), and Windows socket-error handling (#4463).
- **Model selection transparency and flexibility** — BYOK model-catalogue browsing (#4358), honoring org-enabled models (#4390), and respecting per-agent model overrides (#3565, #4458/#4462).
- **Session and plugin lifecycle management** — Working `sessionStart` hooks (#1730), `autoUpdate` for extra marketplaces (#4465), and cleanup of extension-host/Docker processes (#4468, #4460/#4461).
- **Expanded ACP capabilities** — Structured clarifying questions via an `ask_user`-style method (#2109), plus cross-family agent tool-validation fixes (#4457).

## Developer Pain Points

- **Silent model overrides and catalog failures** continue to be the sharpest area: subagent model settings are ignored or downgraded (#3565, #4458/#4462), org-enabled models disappear (#4390), and Claude models become unavailable in enterprise setups (#4422).
- **Remote MCP authentication remains fragile**: repeated interactive sign-ins (#4464), hard per-session failures from transient 5xx errors (#4466), and Windows socket errors (#4463).
- **Resource leaks and orphaned state are recurring**: extension-host process accumulation (#4468), Docker MCP containers left running (#4460/#4461), `tgrep` OOM (#3976), orphaned permission prompts on resume (#4469), and stuck queued messages (#4373).
- **Documented hook/plugin behavior is unreliable**: `sessionStart` hooks not firing (#1730) and marketplace `autoUpdate` not triggering (#4465) erode trust in configuration-driven workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-13

## Today's Highlights

No new Kimi Code CLI releases were published in the last 24 hours. The main community activity centers on the long-running **Memory System** feature request (#1283), which continues to accumulate discussion with 36 comments. In parallel, two maintenance PRs from contributor `Ricardo-M-L` are moving forward, addressing a terminal-output formatting bug and a subprocess `BrokenPipeError` race condition.

## Releases

No new versions were released in the last 24 hours.

## Hot Issues

Only one issue was updated in the 24-hour window, so it is highlighted below.

- [#1283 [OPEN] Feature Request: Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  Author: `CatKang` · Created: 2026-02-27 · Updated: 2026-08-13 · Comments: 36  
  This issue requests a comprehensive memory layer for Kimi Code CLI: automatic memory (AI-managed notes) plus manual memory (user-defined instructions) so context, project patterns, and preferences persist across sessions. It remains open after several months and has drawn 36 comments, indicating strong community interest. The fact that it was updated again today suggests it is still a priority discussion topic, even though it hasn’t been closed or formally scheduled yet.

## Key PR Progress

Two PRs were updated in the last 24 hours.

- [#2449 [OPEN] fix(string): strip newlines in shorten_middle before the length check](https://github.com/MoonshotAI/kimi-cli/pull/2449)  
  Contributor: `Ricardo-M-L` · Updated: 2026-08-12  
  Fixes a subtle rendering bug in `shorten_middle()`: the function is used to produce single-line summaries of tool-call arguments, but it returns early on short input before collapsing newlines. This can leak multi-line content into log output. The fix moves newline stripping ahead of the length check.

- [#2324 [OPEN] fix(web): handle BrokenPipeError in SessionProcess.send_message](https://github.com/MoonshotAI/kimi-cli/pull/2324)  
  Contributor: `Ricardo-M-L` · Updated: 2026-08-12  
  Addresses a race condition where the subprocess exits between the `start()` call and the subsequent `stdin.write()`/`drain()` in `SessionProcess.send_message`, causing an unhandled `BrokenPipeError`. This is a reliability fix for the web-based session runner.

## Feature Request Trends

Based on current issue activity, the dominant requested direction is **persistent context and memory**:

- An explicit Memory System with both automatic and user-controlled memory.
- Cross-session retention of project patterns, user preferences, and reusable context.
- Better long-running agent behavior that doesn’t require users to re-explain context on every new session.

This is the most clearly articulated feature request in the active issue tracker right now.

## Developer Pain Points

Recurring pain points visible in the current issue/PR data:

- **Lost context across sessions** — developers want the CLI to remember prior work and project decisions.
- **Fragile subprocess handling** — `BrokenPipeError` and similar races cause flaky behavior in the web runner.
- **Ugly terminal output for tool-call summaries** — multi-line key arguments are not consistently collapsed into single-line logs.
- **Long-open feature requests** — the Memory System issue has been open since February 2026 with ongoing community engagement but no implemented solution yet.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-13

## 1. Today's Highlights

The v1.18.17 patch ships with targeted reliability fixes: session compaction now preserves complete recent turns and produces clearer summaries for smaller models, while automatic retries are capped with jitter to prevent runaway loops. Community attention is dominated by a cluster of billing/entitlement bugs — users with paid Zen balances or Go subscriptions still hitting "Free usage exceeded" errors (#14273, #42128, #33495) — alongside a wave of PRs migrating the Desktop-WSL server path to the v2 CLI and landing TUI polish like Mermaid GitGraph rendering.

## 2. Releases

**v1.18.17** — core bugfix release:

- **Session compaction** now keeps complete recent turns and generates clearer summaries for smaller models.
- **MERGE Gateway** reasoning variants added so those model options work correctly (contribution by @MatthewFeroz).
- **Retry behavior** capped: automatic session retries are now limited and use jitter to reduce repeated retry storms.

[View release](https://github.com/anomalyco/opencode/releases)

## 3. Hot Issues

1. **[#14273 — Free usage exceeded despite $3 Zen balance](https://github.com/anomalyco/opencode/issues/14273)** *(40 comments, closed)*  
   Users on free Kimi K2.5 / MiniMax2.5 models receive "Free usage exceeded. Add credits" even with a positive Zen balance. The highest-activity issue this week; entitlement logic appears to ignore account balance. Repeatedly re-opened, suggesting the fix hasn't fully landed.

2. **[#4832 — Gemini 3 Pro function calling fails: missing `thoughtSignature`](https://github.com/anomalyco/opencode/issues/4832)** *(35 comments, 14 👍, closed)*  
   `gemini-3-pro-preview` rejects tool calls due to a missing `thoughtSignature` field in the request. High 👍 count indicates many users rely on Gemini 3 Pro for agentic work; closed, but the lengthy thread suggests a subtle spec-compliance fix.

3. **[#41470 — "Copied to clipboard" doesn't work in VSCode Server/Docker](https://github.com/anomalyco/opencode/issues/41470)** *(11 comments)*  
   Copying from a session shows the toast but the system clipboard is never updated in containerized environments. Common remote-dev setup; no plugin workaround available.

4. **[#3366 — Mermaid rendering in chat](https://github.com/anomalyco/opencode/issues/3366)** *(10 comments, 26 👍, discussion)*  
   Long-standing feature request (Oct 2025) for rendering Mermaid diagrams in the chat UI. The 26 👍 makes it one of the most-wanted UX features; see PR #42179 which partially delivers GitGraph rendering.

5. **[#33027 — MCP tools connected but not exposed to agent](https://github.com/anomalyco/opencode/issues/33027)** *(7 comments)*  
   MCP server `pdfrag` connects, `tools/list` returns 6 tools, but they never surface in the agent's tool list. Points to a gap in MCP tool discovery/filtering.

6. **[#19005 — Clickable file paths in terminal output](https://github.com/anomalyco/opencode/issues/19005)** *(7 comments, 5 👍)*  
   Generated file paths render as plain text; users must manually copy and run `open <path>`. Small but high-frequency quality-of-life gap.

7. **[#42128 — Free usage limit exceeded on *first* request (DeepSeek V4 Flash Free)](https://github.com/anomalyco/opencode/issues/42128)** *(7 comments, 5 👍, closed)*  
   Fresh accounts hit "Free usage exceeded" immediately, before any usage. Suggests a default-zero or negative quota initialization bug in Zen's free tier.

8. **[#17073 — Protect `.env` files in grep/glob results, not just direct read](https://github.com/anomalyco/opencode/issues/17073)** *(6 comments, 5 👍)*  
   Permission rules match the search pattern, not the matched file path, so `grep`/`glob` can leak secrets that direct reads protect. Security-relevant and likely to attract maintainer attention.

9. **[#33495 — Paid Zen balance doesn't lift the 200-request/free usage cap](https://github.com/anomalyco/opencode/issues/33495)** *(6 comments)*  
   Accounts with $20+ balances still hit the free-tier 200-request limit and receive 429s. Confirmed across two accounts; billing state isn't propagated to rate limiting.

10. **[#41848 — LLM retry has no max attempts: infinite "Thinking..." loop](https://github.com/anomalyco/opencode/issues/41848)** *(3 comments)*  
    `RETRY_MAX_DELAY` is set to ~24 days; a DeepSeek stream error triggers an endless retry loop with no user feedback. Directly addressed by the v1.18.17 retry capping fix.

## 4. Key PR Progress

1. **[#42199 — fix(desktop): use matching v2 CLI in WSL](https://github.com/anomalyco/opencode/pull/42199)** *(open)*  
   Migrates Desktop WSL servers from `opencode` to `opencode2` and enforces exact version matching between the Desktop server and WSL CLI. Directly targets the WSL bootstrap instability reported in #41806.

2. **[#42202 — feat(opencode): add per-session budget limit](https://github.com/anomalyco/opencode/pull/42202)** *(open)*  
   Adds an optional per-session budget that stops the assistant when cost is reached, plus a TUI sidebar widget to view/set it. Timely given the billing confusion this week — gives users proactive control.

3. **[#42179 — feat(tui): render Mermaid GitGraph diagrams](https://github.com/anomalyco/opencode/pull/42179)** *(closed)*  
   Renders Mermaid `gitGraph` fences as terminal-native vertical commit graphs. Partial fulfillment of the long-requested #3366 Mermaid support; authored by @kitlangton.

4. **[#42183 — feat(catalog): click-to-annotate captures with GitHub issue handoff](https://github.com/anomalyco/opencode/pull/42183)** *(closed)*  
   Adds annotation mode to the lab catalog viewer (`A` key, click a terminal cell, add a note) and prefills a GitHub issue with annotations and repro metadata. Nice contributor-feedback loop.

5. **[#42174 — fix(core): subagent sessions inherit ancestor deny rules](https://github.com/anomalyco/opencode/pull/42174)** *(open)*  
   Permission checks previously used only the current session's ruleset, letting subagents escape inherited denies. Now denies act as fences with per-agent ask gates. Security-relevant correctness fix.

6. **[#42185 — fix(client): prevent stale service replacement](https://github.com/anomalyco/opencode/pull/42185)** *(open)*  
   Stops an older CLI/Desktop client from replacing a newer managed background service after an update — previously an older client saw the newer service as "incompatible" and downgraded it.

7. **[#42186 — fix(client): require authenticated service stop](https://github.com/anomalyco/opencode/pull/42186)** *(open)*  
   Managed services must now authenticate and accept an exact-instance stop request before a client can replace them; removes the `SIGTERM`/`SIGKILL` fallback using a registration PID.

8. **[#42187 — fix(client): validate promise service discovery](https://github.com/anomalyco/opencode/pull/42187)** *(open)*  
   Adds validation for managed-service registration and health JSON before the Promise client trusts it, preventing primitive/partial/mistyped data from reaching lifecycle logic.

9. **[#42188 — fix(tui): retry migration status transport errors](https://github.com/anomalyco/opencode/pull/42188)** *(open)*  
   Migration status overlay now keeps polling through transient server disconnects instead of showing a spurious failure toast during background service restarts.

10. **[#41977 — refactor(app): align UI packages with Solid best practices](https://github.com/anomalyco/opencode/pull/41977)** *(open)*  
    Cross-package audit (`app`, `ui`, `session-ui`) fixing signal-accessor-passed-as-props anti-patterns and related SolidJS pitfalls. Signals a broader correctness pass on the frontend.

## 5. Feature Request Trends

- **Mermaid / rich diagram rendering in the TUI**: #3366 (26 👍) remains the flagship visualization request; PR #42179 now delivers terminal-native GitGraph rendering, suggesting maintainers are incrementally shipping this direction.
- **Local UX ergonomics**: Clickable file paths (#19005) and functional clipboard in remote/container environments (#41470) — small friction points that disproportionately affect Docker/VSCode Server users.
- **Security hardening**: Protecting `.env` files from grep/glob leakage (#17073) and per-MCP-server TLS trust configuration (#40111) reflect growing self-hosting and enterprise usage.
- **Spend controls**: Per-session budget limits (PR #42202) arrive alongside user frustration over opaque free-tier/entitlement behavior.
- **Model compatibility completeness**: Requests/issues around Gemini `thoughtSignature` (#4832), Azure Responses API streaming (#42147), and DeepSeek multi-turn failures (#42135) show users expect first-class support for every major provider, not just the default path.

## 6. Developer Pain Points

- **Billing/entitlement confusion is the #1 friction point this week.** Six separate issues (#14273, #42128, #33495, #42132, #42140, #42154) describe paid users hitting "Free usage exceeded" or being told to pay for subscriptions they already purchased. The recurrence across accounts and models indicates a systemic state-propagation bug between Zen balance, Go subscription status, and the rate-limit/entitlement layer.
- **Session state reliability remains fragile.** Manual `/compact` on DeepSeek V4 Flash degenerates into repetition loops or loses context entirely (#41268, #41801), and stream errors cause infinite "Thinking…" hang states (#41848). The v1.18.17 retry cap is a step, but compaction quality for smaller models is still an open wound.
- **Local infrastructure hangs and I/O errors.** WSL bootstrap hangs with unreaped git children (#41806), "disk I/O error" on project startup (#32571), and projects sharing a prefix (`foo` vs `foo2`) opening the wrong directory (#42040) point to filesystem/process-management bugs that block basic usage.
- **Provider-specific incompatibilities are common.** Gemini 3 Pro function calling, Azure large-model streaming hangs, and DeepSeek `/responses` multi-turn failures each strand users on their preferred models, forcing provider-switching workarounds.

---
*Data sources: [releases](https://github.com/anomalyco/opencode/releases), [issues](https://github.com/anomalyco/opencode/issues), [pull requests](https://github.com/anomalyco/opencode/pulls) for 2026-08-13.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-13

## 1. Today's Highlights

The Pi project saw heavy activity around **reliability and TUI polish**: a critical auto-compaction bug (#6879) is getting attention, and multiple PRs landed to preserve streaming `usage` data, fix `triggerTurn: false` semantics, and let TUI components observe mouse events. No new releases were published in the last 24 hours.

## 2. Releases

No new releases in the last 24h.

## 3. Hot Issues

1. **[#6879 — auto-compaction never triggers after context grows past 100% until provider overflow](https://github.com/earendil-works/pi/issues/6879)**  
   A long agentic turn on gpt-5.6-sol ran past the compaction threshold and only stopped at a 373k-token provider rejection. The proposed fix is to check after every agent step, not only after token-count updates. *18 comments, 17 👍 — the most active issue.*

2. **[#7730 — High CPU usage on Mac OS with long session](https://github.com/earendil-works/pi/issues/7730)**  
   Pi swings between 50–110% CPU and 600–800MB RAM on macOS, apparently correlated with session/context size. Long-session users are clearly hitting scalability limits. *11 comments, 8 👍.*

3. **[#7836 — Edit fuzzy match misses lines with differences in whitespace length](https://github.com/earendil-works/pi/issues/7836)**  
   `normalizeForFuzzyMatch` doesn't collapse/trim whitespace, so small models' `oldText` fails even when content is semantically identical. Important for tool-call robustness. *9 comments.*

4. **[#7835 — Edit tool rejects a single-object edits argument](https://github.com/earendil-works/pi/issues/7835)**  
   Some models wrap `edits` as one object instead of an array; the tool throws. This is a common real-world LLM output hiccup that should be handled gracefully. *4 comments.*

5. **[#8000 — @ file autocomplete: direct children lose to deep nested matches on basename ties](https://github.com/earendil-works/pi/issues/8000)**  
   When typing `@~/<dir>/pro`, deep nested files rank above direct children with the same basename prefix. Reduces UX for the most obvious completion. *3 comments.*

6. **[#7805 — Root `.md` documentation files in settings skill directories are loaded as skills](https://github.com/earendil-works/pi/issues/7805)**  
   `README.md`, `AGENTS.md`, `CLAUDE.md` in skill roots produce false validation warnings. A fix is already in progress (#8012). *2 comments.*

7. **[#7911 — 0.84.0's delta-only `message_update` removed `usage` from the wire protocol](https://github.com/earendil-works/pi/issues/7911)**  
   The fix for #7290 removed cumulative `message`, but also dropped `usage`. This broke mid-run observability for RPC/JSON consumers. A PR (#7982) now restores it. *2 comments.*

8. **[#8029 — Very slow performance when moving in prompt editor](https://github.com/earendil-works/pi/issues/8029)**  
   Arrow-key movement in a ~7000-line prompt box takes ~1650ms per press, scaling linearly with buffer size. Large-input usability is a real friction point. *1 comment.*

9. **[#8041 — coding-agent: Render Mermaid and LaTeX in HTML exports to match TUI](https://github.com/earendil-works/pi/issues/8041)**  
   HTML exports currently skip TUI transformations, leaving Mermaid/LaTeX as raw source. The community wants export parity (follow-up to #7956). *1 comment, 1 👍.*

10. **[#8055 — TUI: Ambiguous-width chars counted as 1 col, break table alignment on CJK terminals](https://github.com/earendil-works/pi/issues/8055)**  
    Characters like ①, ±, …, € render as 2 columns on CJK terminals but are counted as 1, breaking table/list alignment. Important for international users. *1 comment.*

## 4. Key PR Progress

1. **[#8052 — fix(coding-agent): make session persistence transactional](https://github.com/earendil-works/pi/pull/8052)**  
   Prevents broken session graphs when JSONL append fails (e.g. `ENOSPC`).

2. **[#7982 — fix(coding-agent): preserve usage in streaming events](https://github.com/earendil-works/pi/pull/7982)**  
   Restores cumulative provider `usage` on `message_update` while keeping snapshots omitted; closes #7911.

3. **[#8044 — fix(bedrock): expose safe stream failure diagnostics](https://github.com/earendil-works/pi/pull/8044)**  
   Adds bounded structured diagnostics for Bedrock send/stream failures and treats EOF-without-terminal as a safe transient error.

4. **[#8042 — feat(ai): add Grok 4.6](https://github.com/earendil-works/pi/pull/8042)**  
   Adds xAI Grok 4.6 with `low`/`medium`/`high`/`xhigh` reasoning levels and catalog coverage.

5. **[#7956 — feat(coding-agent): render Mermaid diagrams in HTML exports](https://github.com/earendil-works/pi/pull/7956)**  
   Reuses TUI tool-call rendering by translating ANSI to HTML; Mermaid is toggleable from the header. Related issue #8041 asks for LaTeX parity.

6. **[#8032 / #8037 — TUI mouse events for components](https://github.com/earendil-works/pi/pull/8032)**  
   Implements #7683 with an optional `Component.onMouse(event)` hook, hit-testing `LayoutBox` innermost-first. #8037 is a parallel implementation.

7. **[#8022 — fix: triggerTurn: false should not start turn](https://github.com/earendil-works/pi/pull/8022)**  
   Addresses #7783 by routing custom display messages away from the streaming `agent.steer()` path when `triggerTurn: false`.

8. **[#8012 — fix: don't load root md files as skills in settings](https://github.com/earendil-works/pi/pull/8012)**  
   Root `README.md`/`AGENTS.md` in skill directories are only treated as skills when they parse as skill frontmatter; closes #7805.

9. **[#8049 — feat: use local Ollama models in pi via a local model proxy](https://github.com/earendil-works/pi/pull/8049)**  
   Adds two dependency-free Node scripts to run Ollama models from pi on Ubuntu, macOS, and Windows.

10. **[#7722 — feat(coding-agent): add theme override](https://github.com/earendil-works/pi/pull/7722)**  
    Adds `--use-theme` for single themes (`dark`) or appearance-based notation (`dayowl/nightowl`) without persisting the override.

## 5. Feature Request Trends

- **Local / self-hosted model integration** — Ollama proxy (#8049), llama.cpp model listing (#8051), Scaleway EU-hosted open-weight models (#6165).
- **TUI interactivity and configurability** — component-level mouse events (#7683), mid-line slash-command menu (#8015), configurable mouse wheel scroll (#7765), scroll-up indicator (#7908 / #7970).
- **Extension API maturity** — async custom-message publication (#8023), hooks to withhold/replace displayed assistant messages (#8035), avoiding unintended turns (#7783).
- **HTML export parity with TUI** — Mermaid rendering (#7956) and LaTeX/cases support (#8041, #7929).
- **More provider coverage** — Grok 4.6, Anthropic Vertex, MiniMax image-to-image, synchronous speech generation, Xiaomi billing split, DeepSeek token-parameter fix.

## 6. Developer Pain Points

- **Context/compaction surprises** — Auto-compaction fires too late or not at all, leading to provider overflow (#6879).
- **Long-session resource leaks** — High CPU/memory on macOS as context grows (#7730).
- **Edit tool brittleness** — Fuzzy matching fails on whitespace differences (#7836) and rejects single-object `edits` arguments (#7835).
- **Input/editor performance** — Prompt-editor navigation becomes unusably slow with large buffers (#8029).
- **Session / persistence fragility** — Non-transactional writes can corrupt session graphs (#8052), resume messages ignore `PI_CODING_AGENT_DIR` (#8048), and shared PiClient reconnects fail for multiple sessions (#8008).
- **Small quality-of-life regressions** — `settings.json` loses its final newline (#8009), root `.md` files are falsely loaded as skills (#7805), and ambiguous-width characters break TUI alignment on CJK terminals (#8055).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-13

## Today's Highlights

The Qwen Code Desktop app advanced with two releases (v0.2.0, v0.2.1) focused on Web Shell stability, transcript pagination, and workspace-scoped project memory. On the core side, the team is actively hardening daemon resilience — PRs landed for graceful empty-channel no-ops ([#8978](https://github.com/QwenLM/qwen-code/pull/8978)), adaptive live-journal cap growth ([#8905](https://github.com/QwenLM/qwen-code/pull/8905)), and byte-bounded ACP buffers ([#9007](https://github.com/QwenLM/qwen-code/pull/9007)). Community reports around image-load crashes ([#8957](https://github.com/QwenLM/qwen-code/issues/8957)) and long-task reliability ([#8963](https://github.com/QwenLM/qwen-code/issues/8963)) remain the loudest pain points.

## Releases

**desktop-v0.2.1** ([link](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.1))
- refactor(serve): default project memory to workspace scope ([#8856](https://github.com/QwenLM/qwen-code/pull/8856))
- feat(telemetry): align session lifecycle

**desktop-v0.2.0** ([link](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.0))
- fix(web-shell): stabilize transcript history pagination ([#8914](https://github.com/QwenLM/qwen-code/pull/8914))
- feat(web-shell): share session catalog

Also: `dsw-eas-smoke-20260812-281542bfdc` — non-production infrastructure smoke test; no SWE score published (Benchmark-Qwen-Ref: v0.21.2).

## Hot Issues

1. **RFC: Reliable auto-memory recall** ([#7040](https://github.com/QwenLM/qwen-code/issues/7040)) — Central tracking issue for the context-performance roadmap. Recall delivery telemetry is merged ([#7393](https://github.com/QwenLM/qwen-code/pull/7393)); bounded initial-turn recall and multilingual evaluation are in review ([#8716](https://github.com/QwenLM/qwen-code/pull/8716)). 10 comments, P2.

2. **Long tasks hang in any mode** ([#8963](https://github.com/QwenLM/qwen-code/issues/8963)) — Python scripts and shell commands stall under both yolo and auto modes, making overnight tasks impossible. The reporter compares unfavorably to Kimi Code and requests a "blind accept" mode. 9 comments, status: need-information.

3. **Regression: crash on image load since 0.21.2** ([#8957](https://github.com/QwenLM/qwen-code/issues/8957)) — Qwen Code crashes instantly when reading images; 0.21.1 is the last known-good version. A priority P2 regression with 8 comments awaiting retest.

4. **Preserve current session when large restore times out** ([#8678](https://github.com/QwenLM/qwen-code/issues/8678)) — P1 daemon bug. The timeout-contract portion merged in [#8691](https://github.com/QwenLM/qwen-code/pull/8691); session-preservation follow-up continues. 7 comments.

5. **tmux flickering via SSH on Ubuntu** ([#8562](https://github.com/QwenLM/qwen-code/issues/8562)) — Rendering flicker in tmux panes when used through iTerm2 → SSH → tmux. The user used Qwen 3.8 Max to trace the cause to recent Qwen Code versions. 7 comments, Linux rendering scope.

6. **Background agent coordination gap** ([#8097](https://github.com/QwenLM/qwen-code/issues/8097)) — Multiple background Explore subagents with `send_message` cause duplicate work, premature completion, and non-interactive messaging failures. Core multi-agent roadmap issue, 6 comments.

7. **`--approval-mode` / `--auth-type` missing from `qwen --help`** ([#8897](https://github.com/QwenLM/qwen-code/issues/8897)) — Both flags are registered and validated but absent from help output, hurting CLI discoverability. 5 comments, P2.

8. **Vertex AI ADC authentication failure** ([#9016](https://github.com/QwenLM/qwen-code/issues/9016)) — Application Default Credentials are rejected; an API key is required, and any key value then produces a 401 from Vertex. Cloud auth friction, 4 comments, P2.

9. **Anthropic wire missing stream-safety protections** ([#9005](https://github.com/QwenLM/qwen-code/issues/9005)) — `anthropicContentGenerator` lacks the stream-safety guards the OpenAI wire already has; companion issue flags `@anthropic-ai/sdk` pinned to an old `^0.36.1`. P1, 3 comments.

10. **MAX_TOKENS recovery leaves durable transcript disagreeing with history** ([#8979](https://github.com/QwenLM/qwen-code/issues/8979)) — After output-token recovery, `--resume` rehydrates duplicated turns because the JSONL transcript splits what the live session coalesced. Data-integrity bug, P2, 3 comments.

## Key PR Progress

1. **feat(serve): no-op on empty channel set** ([#8978](https://github.com/QwenLM/qwen-code/pull/8978)) — `qwen serve --channel all` now treats an empty channel config as a graceful no-op instead of exiting(1), and restores only previously-active channels on restart. Fixes [#8975](https://github.com/QwenLM/qwen-code/issues/8975).

2. **feat(serve): adaptively grow live-journal caps** ([#8905](https://github.com/QwenLM/qwen-code/pull/8905)) — In-flight turns that outgrow per-session live-journal caps now trigger cap growth (doubling) before replay entries are dropped, reducing mid-turn replay loss.

3. **feat(web-shell): support workspace file uploads** ([#8874](https://github.com/QwenLM/qwen-code/pull/8874)) — Drag-and-drop uploads and `@` file panel uploads in the Web Shell composer, with progress, cancellation, conflict renaming, and inline previews.

4. **feat(core): workflow agents can pin a directory and outlive default bounds** ([#8972](https://github.com/QwenLM/qwen-code/pull/8972)) — Lets workflow scripts pin subagents to an existing git worktree and extend their lifetime — enabling work that is neither short nor in-place.

5. **feat(cli): review settings for attribution, default effort, and default comment** ([#8994](https://github.com/QwenLM/qwen-code/pull/8994)) — Adds three operator-controlled `/review` settings resolved from system → user → system scopes only, preventing repository-level control over review policy.

6. **fix(sdk): support "auto" permission mode** ([#9003](https://github.com/QwenLM/qwen-code/pull/9003)) — Python and Java SDKs now accept `permission_mode="auto"`, aligning with the CLI and TypeScript SDK. Fixes [#9002](https://github.com/QwenLM/qwen-code/issues/9002).

7. **feat(channels): bound session lifetime with sessionRotation** ([#8927](https://github.com/QwenLM/qwen-code/pull/8927)) — New per-channel `sessionRotation` option with `maxTurns` / `maxDurationMs` bounds; routes start a fresh session once the current one is past its bound.

8. **feat(web-shell): redesign Channel policy and workspace management** ([#8848](https://github.com/QwenLM/qwen-code/pull/8848)) — Exposes direct-message, group-access, session-routing, and workspace-ownership controls for every manageable adapter, with allowlist management.

9. **fix(serve): bound ACP HTTP pre-attach buffers by bytes** ([#9007](https://github.com/QwenLM/qwen-code/pull/9007)) — Closes a daemon resource-protection gap by applying byte-bounded buffering to ACP HTTP pre-attach.

10. **fix(extensions): preserve Claude hooks in dual-manifest extensions** ([#8626](https://github.com/QwenLM/qwen-code/pull/8626)) — Preserves Qwen/Gemini extension resources while importing Claude-compatible hooks from dual-manifest extensions, and separates marketplace-entry selection from direct-root installs.

## Feature Request Trends

- **Reliable memory and auto-recall** ([#7040](https://github.com/QwenLM/qwen-code/issues/7040)): The highest-traffic feature area — recall timing, bounded initial-turn recall, quality evaluation, and telemetry are all under active design. Related work guards manual `/dream` turns with pinned-memory protection ([#8357](https://github.com/QwenLM/qwen-code/pull/8357)).
- **Multi-agent coordination** ([#8097](https://github.com/QwenLM/qwen-code/issues/8097)): Background subagents need no duplicate work, no premature completion, and interactive `send_message` support.
- **Session lifecycle robustness**: Repeated requests for session-preserving restore timeouts ([#8678](https://github.com/QwenLM/qwen-code/issues/8678)), manual session name retention after `/clear` ([#8977](https://github.com/QwenLM/qwen-code/issues/8977)), and transcript consistency after recovery ([#8979](https://github.com/QwenLM/qwen-code/issues/8979)).
- **Daemon and channel operations maturity**: Resource-protection decomposition ([#8091](https://github.com/QwenLM/qwen-code/issues/8091)), graceful empty-channel behavior ([#8975](https://github.com/QwenLM/qwen-code/issues/8975)), and session rotation ([#8927](https://github.com/QwenLM/qwen-code/pull/8927)) reflect growing operator-focused demand.
- **Multimodal integration**: The Omni experiment roadmap ([#8197](https://github.com/QwenLM/qwen-code/issues/8197)) tracks multimodal file recognition and metadata on the protected `omni-experiment` branch.
- **Provider and SDK parity**: Anthropic model-ID parsing and token-limit gaps ([#8584](https://github.com/QwenLM/qwen-code/issues/8584)), Anthropic stream safety ([#9005](https://github.com/QwenLM/qwen-code/issues/9005)), and `permission_mode="auto"` SDK parity ([#9002](https://github.com/QwenLM/qwen-code/issues/9002)) are recurring themes.
- **Desktop platform transition**: Deprecate the Electron app and rename the Tauri shell to take over the `desktop` package name ([#8596](https://github.com/QwenLM/qwen-code/issues/8596)).

## Developer Pain Points

- **Long-running task reliability**: The top complaint — scripts and commands stall indefinitely in interactive mode ([#8963](https://github.com/QwenLM/qwen-code/issues/8963)), and headless runs hard-fail with `NO_TOOL_RESULT_PROGRESS` when a model ends a turn quietly after a tool result ([#9026](https://github.com/QwenLM/qwen-code/issues/9026)). Users want a blind-accept mode and more robust progress detection.
- **Upgrade regressions**: Image-load crashes since 0.21.2 ([#8957](https://github.com/QwenLM/qwen-code/issues/8957)) show minor version bumps introducing breaking regressions; users report pinning older versions.
- **Terminal rendering on Linux/tmux**: Flickering in tmux panes over SSH ([#8562](https://github.com/QwenLM/qwen-code/issues/8562)) remains unresolved and affects remote-workflow users.
- **Configuration discoverability and enforcement**: Flags accepted but absent from `--help` ([#8897](https://github.com/QwenLM/qwen-code/issues/8897)), and documented settings like `tools.truncateToolOutputThreshold` silently ignored by Shell ([#8922](https://github.com/QwenLM/qwen-code/issues/8922)), erode trust in the configuration surface.
- **Cloud and provider authentication friction**: Vertex AI ADC misbehavior ([#9016](https://github.com/QwenLM/qwen-code/issues/9016)) and Anthropic proxy model-ID parsing issues ([#8584](https://github.com/QwenLM/qwen-code/issues/8584)) frustrate enterprise and proxy deployments.
- **CI flakiness and environment issues**: Main-branch E2E CI failures ([#9015](https://github.com/QwenLM/qwen-code/issues/9015)) and ENOSPC/load-sensitive test flakes ([#8982](https://github.com/QwenLM/qwen-code/pull/8982)) add ongoing cost for maintainers and external contributors.
- **Silent or misleading non-interactive UX**: `ask_user_question` returning "User declined" without showing the question ([#9011](https://github.com/QwenLM/qwen-code/issues/9011)) and `isAbortError` misclassifying user cancellations ([#8398](https://github.com/QwenLM/qwen-code/issues/8398)) make headless and API usage harder to debug.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-13

**Note:** The repository now points to `Hmbown/CodeWhale`; the legacy `deepseek-tui` npm package is deprecated.

## Today's Highlights

v0.9.6 shipped, formally introducing **CodeWhale** as the public product and deprecating the legacy `deepseek-tui` package. Maintainers also harvested several community PRs — session snapshot recovery, rail-free copy, OrcaRouter provider registration, and a Windows PiP terminal mode — and merged a security fix for RUSTSEC-2026-0253. The most active community discussions centered on a Chinese translation for “Constitution”, a runtime `/stop` command, and a v0.9.5 Auto-Review regression that silently blocks Bash/write calls.

## Releases

### v0.9.6
- CodeWhale is now the public product from Shannon Labs; `codewhale` command, npm package, and release-asset names remain lowercase technical identifiers.
- The legacy npm package `deepseek-tui` is deprecated and receives no further releases.
- Users coming from v0.8.x legacy `deepseek` / `d` should check the release notes for migration guidance.

[View v0.9.6 release](https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.6)

## Hot Issues

- **[#4949 — Discussion: The Chinese Translation of “Constitution”](https://github.com/Hmbown/CodeWhale/issues/4949)** *open, 9 comments*  
  A PR changed “协作准则” back to “宪法”; the community is debating whether it conveys authority or carries unwanted political overtones in Chinese. Invites native-speaker input.

- **[#4959 — [enhancement] proposed ‘stop’ command](https://github.com/Hmbown/CodeWhale/issues/4959)** *open, 8 comments*  
  In YOLO mode / autonomous workflows, `+ stop` and `stop` are ignored. Request is for a real `/stop` command plus a runtime STOP-word intercept for tool-call blocking.

- **[#5316 — EPIC-005: CodeWhale TUI Crate Decomposition](https://github.com/Hmbown/CodeWhale/issues/5316)** *open, 5 comments*  
  Umbrella tracking issue for the staged TUI crate decomposition; sub-EPICs and PRs report here as the architecture refactor progresses.

- **[#5323 — Regression in v0.9.5: Auto-Review mode silently blocks every Bash call and write operation](https://github.com/Hmbown/CodeWhale/issues/5323)** *open, 3 comments*  
  Auto-Review changed from auto-approving to silently blocking with “destructive action requires explicit review”. Severe for automated/YOLO workflows.

- **[#5034 — Switching providers can retain an unrelated default model](https://github.com/Hmbown/CodeWhale/issues/5034)** *closed, 5 comments*  
  Provider and model resolution are not updated atomically; selecting OpenAI can leave an unrelated `gpt-5.5` default.

- **[#5209 — File (action=edit) silently accepts wrong parameter names and reports fake success](https://github.com/Hmbown/CodeWhale/issues/5209)** *closed, 4 comments*  
  Wrong params like `new_str` are accepted and return “success”, forcing 3–5x re-edits per location. Major tool-contract reliability issue.

- **[#5322 — Regression: output area doesn’t fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322)** *open, 2 comments*  
  v0.9 caps transcript width; v0.8.65 expanded to fill. On wide displays the text feels cramped with unused whitespace.

- **[#5250 — Only one API key can be saved](https://github.com/Hmbown/CodeWhale/issues/5250)** *closed, 3 comments*  
  Switching between DeepSeek and GLM forces re-entering keys; users want per-provider credential storage.

- **[#5047 — API keys silently persist only in the working repo instead of durable global secret storage](https://github.com/Hmbown/CodeWhale/issues/5047)** *closed, 2 comments*  
  Keys can be stranded in `<cwd>/.codewhale/config.toml` plaintext instead of a global store — a security and portability concern.

- **[#5097 — CodeWhale is not considered official DeepSeek Coding Agent](https://github.com/Hmbown/CodeWhale/issues/5097)** *closed, 5 comments*  
  A community member flagged a YouTube claim that Reasonix is DeepSeek’s coding agent. Highlights brand confusion during the CodeWhale transition.

## Key PR Progress

- **[#5328 — FEAT-014: Command contract crate boundary](https://github.com/Hmbown/CodeWhale/pull/5328)** *open*  
  Prototype command migration shapes for EPIC-005/EPIC-006; no production rewiring yet.

- **[#5339 — fix(engine): suppress child-owned shell completions](https://github.com/Hmbown/CodeWhale/pull/5339)** *open*  
  Filters child background-shell completion events out of the parent model stream; adds regression coverage. Closes #5325.

- **[#5338 — feat(web): move docs guide page onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5338)** *open*  
  First slice of #5337; retires `isZh` ternaries in `app/[locale]/docs/guide/page.tsx` via per-page dictionaries.

- **[#5333 — feat(tui): pin host terminal window as an always-on-top mini window](https://github.com/Hmbown/CodeWhale/pull/5333)** *open*  
  Maintainer harvest of community PR #5318. Adds Windows PiP-style “shrink and pin” via `/pin` or right-click menu.

- **[#5320 / #5330 — fix(session): separate snapshot reads from crash recovery](https://github.com/Hmbown/CodeWhale/pull/5330)** *closed*  
  Community PR and maintainer harvest. Side-effect-free `load_session_snapshot` plus a recovery-only path for known restarts.

- **[#5336 — fix(mcp): omit nextCursor when there are no further pages](https://github.com/Hmbown/CodeWhale/pull/5336)** *open*  
  Fixes invalid `"nextCursor": null` in MCP `tools/list` / `resources/list`. Strict clients like Claude Code reject it. Closes #5335.

- **[#5332 — feat(config): register OrcaRouter as a named provider](https://github.com/Hmbown/CodeWhale/pull/5332)** *closed*  
  Maintainer harvest of #5321. Wires OrcaRouter as an OpenAI-compatible gateway with `ORCAROUTER_API_KEY`.

- **[#5331 — fix(tui): copy messages without visual rails](https://github.com/Hmbown/CodeWhale/pull/5331)** *closed*  
  Maintainer harvest of #5319. Copies canonical source content instead of rendered Ratatui lines; closes #5314.

- **[#5329 — fix(tui): move lru to 0.18 and unpin ratatui-core (RUSTSEC-2026-0253)](https://github.com/Hmbown/CodeWhale/pull/5329)** *closed*  
  Restores the green main gate by fixing panic-unsafe `LruCache::pop()` and dangling list pointers.

- **[#5327 — feat(tui): add interactive extensions manager](https://github.com/Hmbown/CodeWhale/pull/5327)** *closed*  
  Adds localized `/plugin` and `/plugins` manager; digest-bound bundle lifecycle and read-only legacy executable inventory entries.

## Feature Request Trends

- **Force-stop for autonomous runs**  
  Users want a reliable `/stop` command and runtime STOP-word interception so YOLO/agentic loops can be interrupted.  
  [#4959](https://github.com/Hmbown/CodeWhale/issues/4959)

- **Per-provider credentials and custom model configs**  
  Multiple API keys should be stored per provider, not overwritten. Custom provider/model setup similar to Kimi Code is also requested.  
  [#5250](https://github.com/Hmbown/CodeWhale/issues/5250), [#4660](https://github.com/Hmbown/CodeWhale/issues/4660)

- **Durable state and recovery**  
  Persistent agent state, signed compressed KV cache capsules, prompt-scoped file recovery, and first-class interrupted-assistant output.  
  [#2904](https://github.com/Hmbown/CodeWhale/issues/2904), [#5272](https://github.com/Hmbown/CodeWhale/issues/5272), [#5000](https://github.com/Hmbown/CodeWhale/issues/5000)

- **Stricter tool contracts**  
  Tools should reject invalid parameters instead of returning fake success; web search/fetch should behave as one coherent retrieval path.  
  [#5209](https://github.com/Hmbown/CodeWhale/issues/5209), [#5037](https://github.com/Hmbown/CodeWhale/issues/5037)

- **i18n and UI consistency**  
  Replace remaining `isZh` branches with the dictionary spine, clean up zh-Hant partial-pack declarations, and keep copy rail-free.  
  [#5337](https://github.com/Hmbown/CodeWhale/issues/5337), [#5334](https://github.com/Hmbown/CodeWhale/pull/5334), [#5314](https://github.com/Hmbown/CodeWhale/issues/5314)

## Developer Pain Points

- **False success from tools**  
  File edits accept wrong param names and report success; Auto-Review silently blocks operations instead of prompting.  
  [#5209](https://github.com/Hmbown/CodeWhale/issues/5209), [#5323](https://github.com/Hmbown/CodeWhale/issues/5323)

- **Provider/model state incoherence**  
  Stale default models survive provider switches; API keys are stored in repo plaintext or limited to a single slot.  
  [#5034](https://github.com/Hmbown/CodeWhale/issues/5034), [#5047](https://github.com/Hmbown/CodeWhale/issues/5047), [#5250](https://github.com/Hmbown/CodeWhale/issues/5250)

- **Network/connection flakiness**  
  Intermittent deepseek completions URL failures and WSL2 provider connection errors after restart.  
  [#4683](https://github.com/Hmbown/CodeWhale/issues/4683), [#4956](https://github.com/Hmbown/CodeWhale/issues/4956)

- **Release regressions**  
  v0.9.5 regressions — Auto-Review blocking and wide-terminal output — show the release gate still needs hardening.  
  [#5323](https://github.com/Hmbown/CodeWhale/issues/5323), [#5322](https://github.com/Hmbown/CodeWhale/issues/5322), [#4650](https://github.com/Hmbown/CodeWhale/issues/4650)

- **Windows/CLI quirks**  
  `--model` and `--toolsets` flags are consumed as a single concatenated argument on Windows npm global installs.  
  [#4564](https://github.com/Hmbown/CodeWhale/issues/4564)

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*