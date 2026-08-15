# AI CLI Tools Community Digest 2026-08-16

> Generated: 2026-08-15 23:00 UTC | Tools covered: 10

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
**Date:** 2026-08-16 | **Source:** Community digests for 9 active tools (Grok Build: no activity)

---

## 1. Ecosystem Overview

The AI CLI ecosystem is in a high-velocity stabilization-and-hardening phase rather than a feature-expansion phase: most tools shipped either patch releases or nightly builds, while engineering effort concentrated on fixing Windows-specific regressions, OAuth/session reliability, and MCP integration bugs. Context and memory management has emerged as the new competitive frontier — tools are racing to handle million-token contexts, compaction, and long-running agentic sessions without losing data or burning quota. Windows remains the weakest platform across nearly every tool, with system-wide stutter, file-locking, path-scanner, and CI failures disproportionately concentrated there. Meanwhile, agentic trust issues — false success reports, fabricated conversation turns, silent model downgrades, and unreliable subagent recovery — are the most common correctness complaints from paying users.

## 2. Activity Comparison

| Tool | Hot Issues (today) | PRs (today) | Release Status (24h) | Primary Activity Focus |
|---|---|---|---|---|
| **Claude Code** | 10 | 3 | No release | Stale-issue sweep; MCP refresh bugs; Windows regressions |
| **OpenAI Codex** | 10 | 10 | **rust-v0.148.0-alpha.19** | Windows performance; storage diagnostics; TUI fixes |
| **Gemini CLI** | 10 | 10 | **v0.56.0-nightly** | Subagent false-success fix; SSRF fix; execution timeouts |
| **GitHub Copilot CLI** | 10 | 2 | **v1.0.81-0** (patch) | MCP OAuth regressions; autopilot cost/stability bugs |
| **Kimi Code CLI** | 5 | 2 | No release | Memory-system requests; quota/compaction behavior |
| **OpenCode** | 10 | 10 | No release | Go/Zen billing; v2 performance; workspace isolation |
| **Pi** | 10 | 10 | No release | Compaction safety; provider compat fixes; TUI cursor flicker |
| **Qwen Code** | 10 | 10 | **v0.21.11-nightly** | `/review` pipeline hardening; CI failure triage |
| **DeepSeek TUI** | 9 | 10 | No release | v0.9.8 stabilization; macOS UTF-8 fix; provider templates |
| **Grok Build** | — | — | No activity | — |

*Note: issue/PR counts reflect items surfaced in each tool's community digest, not raw tracker totals.*

## 3. Shared Feature Directions

| Direction | Tools (evidence) | Specific Needs |
|---|---|---|
| **Context & compaction management** | Pi (#6879, #8153), Kimi (#2603), Qwen (#9230, #9198) | Compaction on token budgets, not just context limits; turn-boundary-safe compaction; prevent OOM/corruption on long sessions |
| **OAuth/auth resilience** | Claude Code (#54443, #61912), OpenCode (#37058), Copilot CLI (#4480, #4490), Gemini (#28622, #28827) | Stale-state recovery after transient 5xx; no forced re-login; accurate 401 diagnostics; atomic multi-process refresh |
| **MCP reliability** | Claude Code (#66084), Copilot CLI (#4421), Gemini (MCP tool hooks PR #38705), Codex (#38705) | Tool re-indexing; configurable init timeouts/retries; OAuth issuer validation; hooks for MCP tool execution |
| **Windows parity** | Codex (#20214, #38547), Claude Code (#58614, #71729), Gemini (#28830), Copilot CLI (#4499), Pi (#6187, #8170) | Eliminate system-wide stutter; fix path-scanner false positives; CI passing on Windows; no V8/heap crashes |
| **Usage & cost transparency** | Codex (#15281, #24080), Kimi (#2604), OpenCode (#37790) | Full `/status` with balance/reset/plan; quota-aware behavior; honest fallbacks when pricing unavailable |
| **Session/history integrity** | Codex (#35746, #31433), Claude Code (#86671), Qwen (#9200), Pi (#8168) | No dropped rollouts; no cross-session message loss; deterministic resume; no fabricated state |
| **Agent self-awareness / truthful completion** | Gemini (#22323, #28815), Claude Code (#70148), Copilot CLI (#3565) | Stop reporting `MAX_TURNS` as success; no hallucinated turns; no silent model/parameter downgrades |
| **Workspace-scoped sessions** | Codex (#3550), Claude Code (Cowork), OpenCode (#34737) | Project-scoped history instead of global lists; correct path handling after project moves |

## 4. Differentiation Analysis

- **Claude Code** targets the **enterprise/VS Code power user** with a mature agent ecosystem, Cowork collaborative sessions, and strong security guidance. Its OAuth and Desktop issues matter most because it's positioned as a primary daily driver.
- **OpenAI Codex** is in a **Rust-rewrite migration** with heavy TUI polish; its pain points (Windows Electron stutter, Crashpad disk bloat, rollout indexing) reflect a tool undergoing platform modernization while serving a large installed base.
- **Gemini CLI** differentiates on **agent reliability and security hardening**: it's shipping evals infrastructure, SSRF fixes, sandbox upgrades, and honest termination-reason reporting — a research-grade engineering posture.
- **GitHub Copilot CLI** is the most **GitHub-native** tool (autopilot, worktrees, Codespaces, PR automation) but currently shows the least PR velocity and the most unresolved MCP/auth friction.
- **Kimi Code CLI** is the only tool explicitly serving the **Chinese-language market** and leads on **memory-system design** discussion, but its 5-issue/2-PR activity suggests a smaller or slower-moving community.
- **OpenCode** is the most **productized** — hosted Go/Zen plans, billing, Docker/Incus workspace isolation — and its issues skew toward SaaS reliability (billing sync, endpoint availability) rather than CLI internals.
- **Pi** is the **context-engineering specialist**: most compaction and token-accounting fixes this week came from its maintainers. It also shows the deepest multi-provider compatibility work (xAI, DeepSeek, llama.cpp).
- **Qwen Code** is singularly focused on the **`/review` code-review pipeline**: id-aware dedup, worktree leases, model-gated anchors, and presubmit overlap logic. Its CI/CD tooling (autofix bot, DSW EAS smoke tests) is the most automated in the ecosystem.
- **DeepSeek TUI** is a **stabilization project**: v0.9.8 regression fixes, macOS-specific bugs, and i18n cleanup — a smaller tool converging on quality rather than expanding features.

## 5. Community Momentum & Maturity

**Highest engineering velocity:** OpenAI Codex, Gemini CLI, OpenCode, Pi, and Qwen Code all show 10 active PRs in a single day — sustained iteration across CLI, TUI, and infrastructure layers. Gemini and Qwen are additionally building evals infrastructure (behavioral evals for tool chains, error recovery, security boundaries), which signals maturing engineering discipline.

**High community engagement, lower PR throughput:** Claude Code and Copilot CLI. Claude Code has the broadest issue surface (50 recent updates) but shipped no release and only 3 PRs — likely in a maintenance/large-release-preparation cadence. Copilot CLI has meaningful traction (NixOS breakage with 9 👍, Atlassian MCP regression) but only 2 PRs, suggesting a slower response loop.

**Rapidly growing:** OpenCode shows a distinctive SaaS-style community — billing complaints, endpoint outages, free-vs-paid confusion — indicating real revenue users and product-market traction, albeit with reliability debt. Its 31-👍 feature request (Plan Mode → Build auto-switch) is the highest single-issue vote this digest window.

**Smaller but engaged:** Kimi Code CLI and DeepSeek TUI show focused communities with real feature asks (memory systems, provider templates) but lower raw activity.

**Maturity contrast:** The most "boring" tools (Pi, Gemini) are the ones shipping the most reliability fixes; the tools with the most dramatic user-facing outages (Codex Windows, OpenCode Go/Zen, Copilot CLI MCP auth) are also the ones with the most vocal user bases — a sign of broader adoption rather than worse engineering.

## 6. Trend Signals

1. **Windows is the universal weak spot.** Every cross-platform tool reported Windows-specific breakage this week — system-wide mouse stutter (Codex), 8.3 short-name scanner false positives (Claude Code), CI test failures (Gemini), V8 heap crashes (Copilot CLI), `taskkill` self-termination (Pi), and symlink test failures (DeepSeek TUI). Developers targeting enterprise Windows users have a clear differentiation opportunity.

2. **MCP is winning as a protocol but losing on reliability.** Tool-refresh failures, init timeouts, OAuth issuer mismatches, and auth confusion appeared across four tools. As MCP becomes the standard integration layer, its failure modes become shared ecosystem risk.

3. **Context is the new memory.** With 1M-token context windows arriving (K3, Grok 4.6, DeepSeek V4), compaction strategies, token-budget triggers, and cache-aware request shaping are replacing "context window size" as the differentiator. Tools that manage context budgets well will win on cost and reliability.

4. **Agent truthfulness is a trust crisis.** False `GOAL` success reports (Gemini), fabricated conversation turns (Claude Code), and silent model downgrades (Copilot CLI, Gemini) all erode user trust in autonomous operation. Expect "honest termination reporting" and "no silent substitutions" to become table-stakes features.

5. **Usage visibility is a retention lever.** Users across Codex, Kimi, and OpenCode demand precise balance, rate-limit, and reset information — and are filing complaints when allowances change without announcement. Cost transparency is becoming a competitive requirement, not a nice-to-have.

6. **CI/CD integration is moving up the stack.** Qwen's autofix bot, `/review` pipeline, and benchmark smoke chains; Codex's `codex doctor` storage diagnostics; and Copilot CLI's PR automation collectively show AI CLIs evolving from coding assistants into **platform infrastructure** — with their own CI/CD, evals, security advisories, and operational tooling.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report  
*Data source: github.com/anthropics/skills · Data as of 2026-08-16*

---

## 1. Top Skills Ranking

Most-discussed open PRs by community comment activity:

| Rank | Skill / PR | Functionality | Discussion Highlights | Status |
|---|---|---|---|---|
| 1 | **[skill-creator evaluation fix — PR #1298](https://github.com/anthropics/skills/pull/1298)** | Fixes `run_eval.py` / `run_loop.py` / `improve_description.py` so skill-description optimization works instead of always reporting `recall=0%`. Includes Windows stream-read fixes, trigger detection, and parallel workers. | Core pain point: the skill-creator evaluation loop was optimizing against noise. Multiple duplicate reproductions referenced; community strongly wants reliable skill-quality metrics. | Open |
| 2 | **[document-typography — PR #514](https://github.com/anthropics/skills/pull/514)** | New skill for typographic quality control in AI-generated documents: fixes orphan words, widow paragraphs, and numbering misalignment. | Addresses a universal, visible flaw in AI-generated documents; high practical value for anyone producing reports or long-form output. | Open |
| 3 | **[pdf case-sensitivity fix — PR #538](https://github.com/anthropics/skills/pull/538)** | Fixes 8 case-sensitive file references in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, etc.). | Small but important reliability fix for users on case-sensitive filesystems; representative of broader demand for skill robustness. | Open |
| 4 | **[ODT skill — PR #486](https://github.com/anthropics/skills/pull/486)** | New skill for OpenDocument Format: create, fill, read, and convert `.odt` / `.ods`; parse ODT to HTML. | Fills an obvious gap in document-format coverage; community interest in ISO-standard, open-source document workflows. | Open |
| 5 | **[frontend-design skill clarity — PR #210](https://github.com/anthropics/skills/pull/210)** | Revises the frontend-design skill to be more actionable and internally coherent within a single Claude conversation. | Discussion focused on making skill instructions concrete and executable rather than abstract guidance. | Open |
| 6 | **[skill-quality-analyzer + skill-security-analyzer — PR #83](https://github.com/anthropics/skills/pull/83)** | Adds two meta-skills to the marketplace: one analyzes skill quality across five dimensions; the other audits skill security. | Reflects strong community interest in self-governance of the Skills ecosystem — evaluating quality and security before adoption. | Open |
| 7 | **[docx tracked-change fix — PR #541](https://github.com/anthropics/skills/pull/541)** | Prevents OOXML `w:id` collisions when adding tracked changes to DOCX files that already contain bookmarks. | Important correctness fix; document corruption is a high-severity failure mode for Office-file skills. | Open |
| 8 | **[skill-creator YAML validation — PR #539](https://github.com/anthropics/skills/pull/539)** | Adds pre-parse validation in `quick_validate.py` to catch unquoted YAML descriptions containing `:`. | Prevents silent frontmatter truncation; part of broader community demand for better skill authoring tooling. | Open |

---

## 2. Community Demand Trends

From the most-commented issues, several clear demand directions emerge:

- **Supply-chain security and trust** — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) is the single most-discussed issue: community skills distributed under the `anthropic/` namespace create trust-boundary abuse risk. Users want clear provenance, namespace hygiene, and security auditing.
- **Enterprise sharing and governance** — [Issue #228](https://github.com/anthropics/skills/issues/228) requests org-wide skill sharing in Claude.ai instead of manual file transfer. Demand for team-level distribution and lifecycle management is strong.
- **Skill quality evaluation and debugging** — [Issue #556](https://github.com/anthropics/skills/issues/556) and duplicate reports expose a broken evaluation loop in skill-creator; users want reliable, reproducible skill-quality metrics.
- **Agent memory and state management** — [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory`, a symbolic notation for compact agent state, indicating demand for long-running agent memory skills.
- **Agent safety and governance** — [Issue #412](https://github.com/anthropics/skills/issues/412) proposes an `agent-governance` skill covering policy enforcement, threat detection, trust scoring, and audit trails.
- **Context-window efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports a bundled skill injecting ~156k tokens in one tool call; users increasingly care about skill size and lazy-loading behavior.
- **Interoperability** — [Issue #16](https://github.com/anthropics/skills/issues/16) asks to expose Skills as MCPs; [Issue #29](https://github.com/anthropics/skills/issues/29) asks for AWS Bedrock usage guidance.
- **Avoiding duplicate/conflicting skills** — [Issue #189](https://github.com/anthropics/skills/issues/189) highlights that `document-skills` and `example-skills` plugins install identical content, wasting context.

**Net trend:** The community is moving beyond “add more skills” toward **skill security, evaluation, governance, and operational reliability**.

---

## 3. High-Potential Pending Skills

Open PRs with active discussion that may land soon:

- **[skill-creator evaluation overhaul — PR #1298](https://github.com/anthropics/skills/pull/1298)** — The most consequential pending fix; unblocks reliable skill-description optimization.
- **[testing-patterns skill — PR #723](https://github.com/anthropics/skills/pull/723)** — Comprehensive testing skill covering Testing Trophy model, unit tests, React Testing Library, and more. High demand for test-generation guidance.
- **[ServiceNow platform skill — PR #568](https://github.com/anthropics/skills/pull/568)** — Broad enterprise-platform skill for ServiceNow: ITSM, ITOM, SecOps, ITAM/SAM, CSDM, IntegrationHub. Long-lived PR still active.
- **[pyxel retro-game skill — PR #525](https://github.com/anthropics/skills/pull/525)** — Wraps `pyxel-mcp` for retro/pixel-art/8-bit game development in Python. Niche but active, with a concrete workflow.
- **[self-audit skill — PR #1367](https://github.com/anthropics/skills/pull/1367)** — Mechanical file verification plus four-dimension reasoning quality gate before delivery. Aligns with the community’s quality-gate demand.
- **[plan-file-hygiene skill — PR #1479](https://github.com/anthropics/skills/pull/1479)** — Solves the lifecycle problem of accumulating planning artifacts. Directly addresses a sore point in agent workflows.
- **[ODT skill — PR #486](https://github.com/anthropics/skills/pull/486)** — Already discussed above; likely to merge if maintainers accept the broader OpenDocument scope.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand at the Skills level is **operational trust and reliability**: secure distribution, strict quality evaluation, context-window efficiency, and lifecycle governance — rather than simply adding more domain-specific skills.

---

# Claude Code Community Digest — 2026-08-16

## Today's Highlights

No new Claude Code releases shipped in the last 24 hours. The issue tracker saw a large maintenance sweep of stale issues (most of the 50 recently-updated items are closed duplicates or old bugs bulk-closed), but a handful of genuinely open problems remain active — notably MCP tool-refresh failures, a Cowork folder permission quirk, and a fresh Windows regression where cross-session messages are displayed but never delivered to the model. On the PR side, a community contribution targeting false-positive security blocks during authorized research is the most substantive in-flight change.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#66084 — tools/list_changed doesn't refresh the deferred-tool / ToolSearch index](https://github.com/anthropics/claude-code/issues/66084)** [OPEN]  
   Still reproduces on 2.1.165: MCP servers announcing tool changes don't get re-indexed in interactive sessions. This is a carve-out from two earlier reports and is the most-commented open bug in the batch — MCP-heavy workflows remain blocked.

2. **[#86671 — Cross-session messages displayed but never enqueued](https://github.com/anthropics/claude-code/issues/86671)** [OPEN]  
   A fresh regression (created 2026-08-14): messages sent between sessions appear in the target session UI but the model never receives them. Tagged `regression` and `desktop`/`agents`, making it the most urgent new signal in the tracker.

3. **[#73852 — Cowork: adding a folder fails with "overlaps a protected host location"](https://github.com/anthropics/claude-code/issues/73852)** [OPEN]  
   Inconsistent behavior on Windows: adding a folder mid-session errors, yet creating a new workspace in the same directory works. Points to a state-management bug in Cowork's permission checks.

4. **[#54443 — OAuth refresh returns 400 before local expiresAt](https://github.com/anthropics/claude-code/issues/54443)** [CLOSED]  
   Highly-upvoted (6 👍, 15 comments) auth failure: server rejects tokens early, refresh then returns HTTP 400, and every session is forced to `/login`. The root cause review — concurrent sessions racing on refresh state — is relevant to the closed issue below.

5. **[#61912 — OAuth refresh corrupts credentials during transient 5xx](https://github.com/anthropics/claude-code/issues/61912)** [CLOSED]  
   A transient Cloudflare 5xx during token refresh corrupts the local credential state, causing a persistent 401 loop across restarts. Pairs with #54443 as evidence that the OAuth client needs stale-state recovery.

6. **[#71729 — Claude Desktop (Windows): `</> Code` history silently lost on restart](https://github.com/anthropics/claude-code/issues/71729)** [CLOSED]  
   Conversations in embedded Claude Code sessions vanish after closing the Desktop app, and Claude doesn't detect the gap. Silent data loss of this kind erodes trust in Desktop as a primary interface.

7. **[#45374 — AskUserQuestion dialog steals focus in VS Code](https://github.com/anthropics/claude-code/issues/45374)** [CLOSED]  
   7 👍 from the community: the dialog hijacks keystrokes while users are mid-composition, causing keystrokes to be interpreted as dialog answers. A long-standing UX annoyance (filed April) for extension users.

8. **[#70148 — Model fabricates entire conversation turns after interrupted tool call](https://github.com/anthropics/claude-code/issues/70148)** [CLOSED]  
   Under transmission latency, an interrupted tool call led the model to invent fake user messages and fake tool results. Hallucinated conversation state is a serious correctness problem for agentic workflows.

9. **[#71809 — VSCode multi-session input focus ping-pong](https://github.com/anthropics/claude-code/issues/71809)** [CLOSED]  
   With multiple session tabs open, the input box flickers and focus rapidly bounces between tabs. Four community 👍 indicate this is a widely-hit extension annoyance.

10. **[#58614 — Path scanner false-positives on Windows 8.3 short names](https://github.com/anthropics/claude-code/issues/58614)** [CLOSED]  
    Windows short filenames (`ALICEM~1`) trigger the path-pattern security scanner and bypass user allow-rules — disproportionately affecting users with non-ASCII Windows usernames.

## Key PR Progress

Only 3 PRs were active in the last 24 hours, so all are noted:

1. **[#86870 — fix: prevent false-positive CVP status changes during authorized security research](https://github.com/anthropics/claude-code/pull/86870)** [OPEN]  
   The most substantive PR in flight: adds task-context checks and an `is_authorized_lab()` flag to `security-guidance/hooks/review_api.py` before security triggers fire. Directly addresses the wave of false-positive safety blocks reported in issues #72100–#72106.

2. **[#84600 — Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)** [CLOSED]  
   Registers the official marketplace and enables the `frontend-design` skill via `.claude/settings.json`. A small, self-referential config change for the repo itself.

3. **[#82981 — Claude/automatizar inventario insumos (unrelated)](https://github.com/anthropics/claude-code/pull/82981)** [OPEN]  
   A Spanish-language supply-inventory automation PR that appears out of scope for the repo — likely noise; worth a maintainer look for closure.

## Feature Request Trends

- **RTL language support**: [#69992](https://github.com/anthropics/claude-code/issues/69992) requests right-to-left rendering in the TUI, a11y-tagged, with community support (3 👍).
- **Inter-agent messaging reliability**: [#71429](https://github.com/anthropics/claude-code/issues/71429) asks for transport-level send metadata (timestamp, sequence, delivery ack) on `SendMessage` to detect stale/out-of-order/lost multi-agent messages — consistent with the bug reports on cross-session delivery.
- **Auth resilience** (implicit): multiple closed issues (#54443, #61912, #72008) collectively demand that the OAuth client handle early-expiry, transient upstream errors, and manual-login edge cases without forcing repeated `/login`.

## Developer Pain Points

- **OAuth/session reliability** remains the #1 recurring theme: early 401s, failed refreshes, corrupted credential state, and login flows that are impossible to complete in the TUI (#54443, #61912, #72008).
- **VS Code extension focus/input handling**: dialogs stealing keystrokes, multi-tab focus ping-pong, and scroll lock during `AskUserQuestion` (#45374, #71809, #57691).
- **False-positive safety/AUP blocks** on legitimate security work: a cluster of duplicate reports (#72100–#72106) describes session-halting blocks on firmware analysis, drone SDK work, and defensive hardening — driving the community fix in PR #86870.
- **Windows-specific breakage**: Desktop history loss, blank launches (MSIX), untrusted mount-point errors, and 8.3 short-name scanner issues paint a picture of Windows as the least-polished platform (#71729, #68364, #68070, #58614).
- **Model behavior complaints**: fabrication of conversation turns after interruptions (#70148) and Opus 4.8's over-engineering/config-churn patterns (#72106) show paid users are hitting both correctness and workflow-efficiency limits.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-16

## Today's Highlights

Codex shipped **rust-v0.148.0-alpha.19** and landed a steady batch of infrastructure and TUI fixes, including `codex doctor` storage diagnostics, paginated history for persistent exec threads, and MCP tool-handler support in the hooks engine. On the community side, **Windows desktop performance remains the dominant concern**, with multiple new reports of idle CPU busy loops and system-wide mouse stutter. Rate-limit visibility also continues to gain traction as a recurring feature request.

## Releases

- **rust-v0.148.0-alpha.19** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.19)  
  No detailed changelog was included in the available data.

## Hot Issues

1. [#20214](https://github.com/openai/codex/issues/20214) — **Codex App freezes/stutters on Windows 11 Pro despite sufficient system resources**  
   104 comments / 85 👍. The top-traffic issue in this window; users with powerful machines still see app-wide freezes and stutters, making it a persistent Windows pain point.

2. [#3550](https://github.com/openai/codex/issues/3550) — **Scope Codex chats to VS Code projects/workspaces**  
   34 comments / 79 👍. Now closed, but high engagement shows strong demand for workspace-scoped session organization instead of one global Recent Tasks list.

3. [#38546](https://github.com/openai/codex/issues/38546) — **Windows app causes system-wide mouse stutter when running without elevation**  
   25 comments / 10 👍. New report linking Electron main-process behavior to OS-level cursor stutter; users say fully exiting the app restores responsiveness.

4. [#28109](https://github.com/openai/codex/issues/28109) — **Windows Desktop input freezes after opening Codex with large sessions directory**  
   22 comments / 14 👍. Suggests session-store loading cost can cause intermittent input pauses, reinforcing concerns about rollout/session storage overhead.

5. [#25921](https://github.com/openai/codex/issues/25921) — **Codex Desktop continuously generates Crashpad pending dumps, +5GB per day**  
   17 comments / 8 👍. Severe disk-waste issue: 54,504 files / 4.9 GB in one day. Part of a broader disk-bloat cluster.

6. [#38547](https://github.com/openai/codex/issues/38547) — **Windows idle main-process CPU busy loop in Chrome plugin app-server hashing**  
   16 comments / 7 👍. Regression introduced in `26.810.4967`; users observe high CPU usage while idle, with no browsing activity required.

7. [#35746](https://github.com/openai/codex/issues/35746) — **Paginated history drops valid flattened rollout records and reuses ordinals**  
   13 comments. Data-integrity bug in CLI history pagination; affects reliable resume and rollout decoding.

8. [#31433](https://github.com/openai/codex/issues/31433) — **Valid rollout files unindexed in state DB and no reindex repair**  
   12 comments. Session-recovery gap affecting Windows/WSL users; existing rollout files exist but are ignored due to state DB indexing issues.

9. [#15281](https://github.com/openai/codex/issues/15281) — **Expose full usage/limits data in CLI `/status`**  
   8 comments / 22 👍. High 👍-to-comment ratio; users want model, usage percentage, and rate-limit details in one command.

10. [#38750](https://github.com/openai/codex/issues/38750) — **System-wide stutter while Codex is idle; full exit immediately restores responsiveness**  
    9 comments. Newest Windows performance report matching the current regression pattern; idle app state still affects the whole OS.

## Key PR Progress

1. [#38795](https://github.com/openai/codex/pull/38795) — **Add storage diagnostics to `codex doctor`**  
   Reports available space for `CODEX_HOME` and the active worktree; warns below 5 GiB and fails below 1 GiB. Also checks for Windows Dev Drive placement. Directly targets disk-bloat complaints.

2. [#38806](https://github.com/openai/codex/pull/38806) — **Add health endpoint to the code-mode gRPC listener**  
   Serves `GET /healthz` over HTTP/1.1 and HTTP/2 while keeping gRPC methods HTTP/2-only. Useful for operational health checks.

3. [#38788](https://github.com/openai/codex/pull/38788) — **Show resume/fork status during TUI startup**  
   Displays dimmed “Resuming session…” / “Forking session…” status above the composer until session selection resolves.

4. [#38785](https://github.com/openai/codex/pull/38785) — **Keep active-turn model settings stable across updates**  
   Prevents thread setting changes from altering model configuration between sampling requests mid-turn; updates apply to the next turn instead.

5. [#38774](https://github.com/openai/codex/pull/38774) — **Use paginated history for persistent exec threads**  
   Reduces rollout-loading cost for `codex exec` persistent threads; falls back to legacy history when pagination is unsupported.

6. [#38705](https://github.com/openai/codex/pull/38705) — **Add MCP tool handler support to the hooks engine**  
   Enables synchronous `mcp_tool` hook handlers with nested placeholder expansion and tool output processing. Opens new automation possibilities for MCP-based workflows.

7. [#38701](https://github.com/openai/codex/pull/38701) — **Route permission requests through shared Guardian approvals**  
   Unifies `request_permissions` into the common Guardian approval path while preserving turn cancellation during automatic permission review.

8. [#38767](https://github.com/openai/codex/pull/38767) — **Forward workload identity context during token exchange**  
   Reads `OPENAI_WORKLOAD_IDENTITY_CONTEXT`, forwards it as `workload_identity_context`, and redacts it from session logs.

9. [#38800](https://github.com/openai/codex/pull/38800) — **Route executor policy audits through log-only telemetry**  
   Prevents forwarded network policy-decisions from being written to the persistent state log, helping reduce unnecessary state-log growth.

10. [#38704](https://github.com/openai/codex/pull/38704) — **Normalize CRLF line endings in pasted text**  
    Fixes Windows paste behavior where CRLF pairs became double line breaks in the TUI composer.

## Feature Request Trends

- **Richer rate-limit/usage visibility** remains the strongest repeated request: users want full `/status` output, remaining credits/balance, reset times, plan type, and SDK/CLI status-line tokens. See [#24080](https://github.com/openai/codex/issues/24080), [#15281](https://github.com/openai/codex/issues/15281), [#19555](https://github.com/openai/codex/issues/19555), and [#20310](https://github.com/openai/codex/issues/20310).

- **Workspace-scoped sessions** are highly requested for VS Code: users want Recent Tasks and Codex chats scoped to the active project instead of a global list. Evidence: [#3550](https://github.com/openai/codex/issues/3550).

- **Storage/session lifecycle tooling** is an emerging ask: users want controls to prevent rollout/session stores from growing to tens or hundreds of GiB, plus repair/reindex utilities. See [#34337](https://github.com/openai/codex/issues/34337), [#30779](https://github.com/openai/codex/issues/30779), [#35470](https://github.com/openai/codex/issues/35470), and [#31433](https://github.com/openai/codex/issues/31433).

- **Platform/remote expansion** continues: Linux support as a ChatGPT Remote Control host ([#38115](https://github.com/openai/codex/issues/38115)) and explicit prompt-caching controls for Bedrock/GPT-5.6 Sol ([#37674](https://github.com/openai/codex/issues/37674)) both attracted developer attention.

## Developer Pain Points

- **Windows desktop performance is the dominant frustration.** Multiple issues report system-wide mouse stutter, idle CPU busy loops, 90–102% CPU usage, GPU/DWM spikes, and input freezes — often fixed only by fully exiting the app. Key threads: [#20214](https://github.com/openai/codex/issues/20214), [#38546](https://github.com/openai/codex/issues/38546), [#38750](https://github.com/openai/codex/issues/38750), [#38547](https://github.com/openai/codex/issues/38547), [#37372](https://github.com/openai/codex/issues/37372), and [#13749](https://github.com/openai/codex/issues/13749).

- **Runaway disk usage is a recurring complaint.** Session rollouts, subagent fork JSONL histories, Crashpad pending dumps, and duplicated image files can consume tens to hundreds of GiB. See [#25921](https://github.com/openai/codex/issues/25921), [#34337](https://github.com/openai/codex/issues/34337), [#30779](https://github.com/openai/codex/issues/30779), and [#35470](https://github.com/openai/codex/issues/35470).

- **Rate-limit and usage data feel opaque.** The CLI/TUI exposes only percentage-based limits, which users call inaccurate or stale; they want concrete balance, reset, and plan information surfaced in the terminal. See [#24080](https://github.com/openai/codex/issues/24080), [#15281](https://github.com/openai/codex/issues/15281), [#19555](https://github.com/openai/codex/issues/19555), and [#20310](https://github.com/openai/codex/issues/20310).

- **Session/history integrity issues undermine trust.** Paginated history can drop records and reuse ordinals ([#35746](https://github.com/openai/codex/issues/35746)), valid rollout files can go unindexed ([#31433](https://github.com/openai/codex/issues/31433)), and the desktop app sometimes fails to read the terminal ([#29070](https://github.com/openai/codex/issues/29070)). These are high-impact for developers relying on durable session resumes.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-16

## Today's Highlights
Agent reliability is the dominant theme: a fix is in review to stop subagents from reporting `MAX_TURNS` interruptions as goal success ([#28815](https://github.com/google-gemini/gemini-cli/pull/28815)), and new execution timeouts target the indefinite TUI "Initializing..." hang ([#28812](https://github.com/google-gemini/gemini-cli/pull/28812)). Security also advanced with an SSRF fix for `web-fetch` ([#28725](https://github.com/google-gemini/gemini-cli/pull/28725)) and a Node 22 sandbox upgrade ([#28726](https://github.com/google-gemini/gemini-cli/pull/28726)), alongside a nightly release containing a2a-server test cleanup.

## Releases
**v0.56.0-nightly.20260815.g2a87e7be1** — Single change: [PR #28811](https://github.com/google-gemini/gemini-cli/pull/28811) migrates `process.env` mutations to `vi.stubEnv()` in a2a-server tests (fixes #19826). [Full changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260814.gc0d192452...v0.56.0)

## Hot Issues
1. **Subagent recovery masks MAX_TURNS as success** — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (p1, 12 comments): `codebase_investigator` reports `status: "success"` / `GOAL` even after hitting max turns without doing analysis. Top community concern; fix already in review ([#28815](https://github.com/google-gemini/gemini-cli/pull/28815)).
2. **Generalist agent hangs indefinitely** — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (p1, 8 👍): Deferring to the generalist agent hangs for up to an hour; disabling subagents is the only workaround.
3. **Shell command stuck at "Waiting input"** — [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) (p1, 3 👍): Completed simple CLI commands remain marked active and awaiting input, requiring manual cancellation.
4. **401 when using Gemini API key with Vertex endpoint** — [#28622](https://github.com/google-gemini/gemini-cli/issues/28622) (closed, security): Authentication confusion between Gemini API keys and Vertex AI credentials; error messaging is being improved in [#28679](https://github.com/google-gemini/gemini-cli/pull/28679) and [#28827](https://github.com/google-gemini/gemini-cli/pull/28827).
5. **Auto Memory logs secrets before redaction** — [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) (p2, security): Local transcripts are sent to the extraction model before redaction, and the service can log existing skill content.
6. **Browser subagent fails on Wayland** — [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) (p1): Browser agent terminates with `GOAL` on Wayland; one of several open browser_agent reliability issues.
7. **Subagents run despite being disabled** — [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) (p2): Since v0.33.0, subagents execute even when agent mode is disabled in all configurations, surprising users who expected MCP-only operation.
8. **400 error with >128 tools** — [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) (p2): Requests fail when too many tools are available; users want smarter tool scoping.
9. **Windows CI: 13 core tests fail on clean checkout** — [#28830](https://github.com/google-gemini/gemini-cli/issues/28830) (new, need-triage): Unguarded environment preconditions break `npx vitest run` on Windows, leaving CI unusable for Windows validation.
10. **Browser Agent ignores settings.json overrides** — [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) (p2): `maxTurns` and other overrides are read by `AgentRegistry` but never applied to the browser agent.

## Key PR Progress
1. **[#28828](https://github.com/google-gemini/gemini-cli/pull/28828)** (p1, core): Warn when a preview model is silently substituted. Fixes #28825 — users requesting `gemini-3.1-pro-preview` without entitlement are silently switched to `auto-gemini-2.5` with zero indication.
2. **[#28815](https://github.com/google-gemini/gemini-cli/pull/28815)** (p1, agent): Preserve original termination reason during subagent recovery. Fixes #22323 — `MAX_TURNS`/`TIMEOUT` no longer reported as `GOAL` success.
3. **[#28812](https://github.com/google-gemini/gemini-cli/pull/28812)** (p1, core): Add execution timeouts to prevent indefinite TUI hang at "Initializing..." when launched from bare Linux terminals (fixes #21477).
4. **[#28725](https://github.com/google-gemini/gemini-cli/pull/28725)** (p2, security): Fix SSRF via DNS resolution bypass in `web-fetch` (CVSS 8.6) — blocks custom domains resolving to private/loopback IPs such as 169.254.169.254.
5. **[#28726](https://github.com/google-gemini/gemini-cli/pull/28726)** (p1, security): Upgrade sandbox and caretaker-agent Dockerfiles from `node:20-slim` to `node:22-slim` ahead of Node 20 EOL.
6. **[#28679](https://github.com/google-gemini/gemini-cli/pull/28679)** (p2, auth): Improve the Vertex AI 401 error message when a standard Gemini API key is used instead of Google Cloud credentials.
7. **[#28827](https://github.com/google-gemini/gemini-cli/pull/28827)** (p2, core): Avoid false authentication errors for 401 substrings in unrelated values (ports, exit codes) — fixes #28203.
8. **[#28813](https://github.com/google-gemini/gemini-cli/pull/28813)** (p1, platform): Add `composite` flag to `packages/cli` tsconfig, unblocking root builds that reference `packages/cli` from evals.
9. **[#28608](https://github.com/google-gemini/gemini-cli/pull/28608)** (p2, agent, closed): Fall back to stable models when a preview model 404s with Gemini API key auth — companion to the silent-substitution warning in #28828.
10. **[#28824](https://github.com/google-gemini/gemini-cli/pull/28824)** (evals): Add behavioral evals for multi-tool chain execution, context-safe large-file handling, and security boundary enforcement. Companions [#28822](https://github.com/google-gemini/gemini-cli/pull/28822) and [#28823](https://github.com/google-gemini/gemini-cli/pull/28823) add task-tracker and error-recovery evals.

## Feature Request Trends
- **Agent self-awareness & control**: Users want the CLI to understand its own flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)), proactively use skills/sub-agents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)), and expose subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).
- **AST-aware code understanding**: Epic [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) (plus [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) investigates AST-aware file reads, search, and codebase mapping to reduce turns, token noise, and misaligned reads.
- **Memory system maturity**: Issues [#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), and [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) push for deterministic redaction, low-signal session handling, and invalid-patch quarantine.
- **Browser agent resilience**: Requests for automatic session takeover/lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) and proper `settings.json` override support ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Evaluation infrastructure**: Epic [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) calls for robust component-level evals; the wave of eval PRs (#28822–#28824) shows this is actively being built out.

## Developer Pain Points
- **Hangs and false completion**: At least four distinct stall scenarios — generalist agent hang ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), TUI "Initializing..." ([#21477](https://github.com/google-gemini/gemini-cli/issues/21477)), and interactive-prompt stalls ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) — compounded by misleading `GOAL`-success reports ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- **Subagent reliability and permissions**: Subagents run when disabled ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)), hang, ignore settings ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), fail on Wayland ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), and omit subagent context from `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Tool and token overhead**: >128 tools causes 400 errors ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); models scatter temporary scripts across directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)); destructive git/DB commands need guardrails ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Auth friction**: 401s from API-key/Vertex mismatch ([#28622](https://github.com/google-gemini/gemini-cli/issues/28622)), silent preview-model downgrades ([#28825](https://github.com/google-gemini/gemini-cli/issues/28825)), and over-eager 401 detection ([#28203](https://github.com/google-gemini/gemini-cli/issues/28203)).
- **Windows/CI instability**: Clean Windows checkouts fail 13 core tests due to unguarded environment preconditions ([#28830](https://github.com/google-gemini/gemini-cli/issues/28830)), undermining CI signal for Windows contributors.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-16

## Today’s Highlights

A new patch release, `v1.0.81-0`, shipped with model configuration updates, but community attention is on lingering MCP OAuth regressions and session/autopilot reliability bugs. Atlassian MCP auth failures continue to surface across 1.0.79 and 1.0.80, while new reports highlight unsafe `/spawn` behavior, `/restart` failures with `-w`, and a Windows V8 heap crash in autopilot.

## Releases

- **[v1.0.81-0](https://github.com/github/copilot-cli/releases/tag/v1.0.81-0)** — “Improved: Update model configurations.” No additional changelog details were provided.

## Hot Issues

- **[#3392: Bash tool breaks on NixOS with version >=1.0.49](https://github.com/github/copilot-cli/issues/3392)** — The Bash tool fails to start on NixOS, blocking all command execution. Long-running issue with meaningful community traction: 4 comments and 9 👍.

- **[#4480 / #4490: Atlassian MCP OAuth regression (RFC 8414 §3.3)](https://github.com/github/copilot-cli/issues/4480) — [#4480](https://github.com/github/copilot-cli/issues/4480), [#4490](https://github.com/github/copilot-cli/issues/4490)** — Authentication to Atlassian MCP fails because the advertised OAuth issuer does not match the metadata URL. #4480 was closed, but #4490 reports the same failure on 1.0.80, indicating the regression may not be fully resolved.

- **[#4421: MCP initialize handshake has fixed 60s timeout, no retry](https://github.com/github/copilot-cli/issues/4421)** — `npx`-launched stdio MCP servers reportedly fail ~29% of sessions and are never respawned after timeout. Particularly painful for users relying on MCP in long-running sessions.

- **[#3565: Task tool silently downgrades subagent model to session model](https://github.com/github/copilot-cli/issues/3565)** — Subagent `model:` frontmatter and explicit `model` overrides are ignored when the requested model has a higher cost multiplier. This makes advanced agent routing unpredictable.

- **[#4491: /spawn template can reuse an existing session without approval](https://github.com/github/copilot-cli/issues/4491)** — The `/spawn` prompt template contradicts its singular-spawn contract and can inject context into an unrelated running session. A potentially destructive cross-session write with no approval gate.

- **[#4493: /restart fails in sessions created with -w](https://github.com/github/copilot-cli/issues/4493)** — Restarting a worktree-based session triggers an option conflict between the worktree flag and existing session ID, making recovery impossible.

- **[#4494: Newly enabled model remains unavailable until cache/login is cleared](https://github.com/github/copilot-cli/issues/4494)** — The local model catalog does not refresh after enabling a model in GitHub settings, leaving models like Sonnet 5 unavailable in CLI/VS until manual cache reset.

- **[#4499: Windows autopilot OOM: “Committing semi space failed”](https://github.com/github/copilot-cli/issues/4499)** — `copilot.exe` v1.0.79 crashes with a V8 heap OOM even though the heap is far below its limit (~0.6/4.3 GB). Suggests host-RAM commit failure, not a real JS heap exhaustion issue.

- **[#4500: BYOK autopilot nudge turn breaks prompt caching](https://github.com/github/copilot-cli/issues/4500)** — The autopilot completion-nudge turn re-serializes previously sent transcript items instead of resending them byte-for-byte, breaking prompt caching and increasing token/cost overhead.

- **[#4501: Codespaces ships Copilot CLI 1.0.3 and `copilot update` requires `sudo`](https://github.com/github/copilot-cli/issues/4501)** — Fresh Codespaces start with a very old CLI, and the update process fails silently unless run with `sudo`, leaving users stuck on 1.0.3.

## Key PR Progress

Only 2 PRs received updates in the last 24 hours.

- **[#4497: Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** — Hardens the invalid-label automation for fork PR workflows where GitHub does not populate the PR association. Falls back to trusted workflow-run metadata and requires exactly one open PR match.

- **[#4449: Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)** — Closed PR that moves invalid-label automation off `pull_request_target`, using issue-scoped write tokens and no-permission `pull_request` signals while preserving closure behavior.

## Feature Request Trends

- **Model configuration control** — Requests to expose model-level options in non-interactive/ACP modes, including `contextTier` parity ([#4275](https://github.com/github/copilot-cli/issues/4275)) and GPT-5.6 `reasoning.mode` support ([#4495](https://github.com/github/copilot-cli/issues/4495)).
- **Session lifecycle management** — Users want recovery and undo capabilities: un-archiving Done sessions ([#4502](https://github.com/github/copilot-cli/issues/4502)) and making `/restart` work with worktree sessions ([#4493](https://github.com/github/copilot-cli/issues/4493)).
- **MCP reliability in CI and interactive use** — More configurable timeouts/retries for MCP initialization ([#4421](https://github.com/github/copilot-cli/issues/4421)) and registry access that works with `GITHUB_TOKEN` in Actions ([#4346](https://github.com/github/copilot-cli/issues/4346)).
- **Observability standards** — Support for standard OTLP protobuf export instead of silently ignoring `OTEL_EXPORTER_OTLP_PROTOCOL` ([#2934](https://github.com/github/copilot-cli/issues/2934)).

## Developer Pain Points

- **MCP auth and bootstrap flakiness** — Atlassian OAuth regressions, the fixed 60s initialize timeout, and MCP registry 403s in CI make MCP adoption fragile.
- **Model catalog and override behavior** — Silently downgraded subagent models ([#3565](https://github.com/github/copilot-cli/issues/3565)) and stale locally cached model lists ([#4494](https://github.com/github/copilot-cli/issues/4494)) create confusing “why isn’t my model available?” moments.
- **Autopilot cost and stability** — BYOK prompt-cache breakage ([#4500](https://github.com/github/copilot-cli/issues/4500)) and Windows V8 “semi space” crashes ([#4499](https://github.com/github/copilot-cli/issues/4499)) hurt long-running unattended workflows.
- **Installation and platform gaps** — NixOS Bash tool breakage ([#3392](https://github.com/github/copilot-cli/issues/3392)) and outdated Codespaces binaries with `sudo`-gated updates ([#4501](https://github.com/github/copilot-cli/issues/4501)) add friction outside standard macOS/Linux setups.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-16

## Today's Highlights

No new releases landed in the last 24 hours, but activity focused on memory-system requests and quota/compaction behavior. Two long-running memory issues (#1283, #1478) were updated, while newer reports surfaced around subscription quota metering (#2604) and token-budget-aware compaction (#2603). One provider-related bug fix PR remains open, and a circular-`$ref` fix was closed.

## Releases

None in the last 24 hours.

## Hot Issues

All 5 issues updated in the last 24 hours are listed below.

- [#1283 — Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  Open, 40 comments. The most active memory-related request: automatic AI-managed notes plus manual user-defined instructions so context, project patterns, and preferences survive across sessions. Community engagement indicates this is a highly desired capability.

- [#1478 — Can the memory layer be optimized?](https://github.com/MoonshotAI/kimi-cli/issues/1478)  
  Open, 3 comments. Chinese-language report echoing #1283: the memory layer is painful for large projects, and the reference docs only show `agent.md`, with no clear memory architecture. References alternative memory layouts (e.g., `MEMORY.md`, daily memory files) as inspiration.

- [#2604 — Effective weekly allowance appears reduced ~3–5× without announcement](https://github.com/MoonshotAI/kimi-cli/issues/2604)  
  Open, 2 comments. A Vivace-tier user reports instrumented before/after token-usage data suggesting a significant unannounced reduction in weekly allowance. Raises questions about terms changes vs. metering regressions and will likely need maintainer clarification.

- [#2603 — Quota-aware compaction: context compaction should trigger on a token budget, not only near model max context](https://github.com/MoonshotAI/kimi-cli/issues/2603)  
  Open, no comments yet. With K3’s 1M-token context window and default reserved context, compaction effectively never fires. On subscription plans, users want compaction triggered by quota budgets to avoid burning allowance on oversized contexts.

- [#1155 — openai_legacy provider drops reasoning content, causing APIEmptyResponseError](https://github.com/MoonshotAI/kimi-cli/issues/1155)  
  Closed, updated Aug 15. When using OpenAI-compatible servers that separate reasoning/thinking content, `openai_legacy` drops it because `reasoning_key` is never passed to the constructor. Relevant for self-hosted/vLLM/sglang users.

## Key PR Progress

Both PRs updated in the last 24 hours are listed below.

- [#2524 — fix(tools): count StrReplaceFile replacements against the running content](https://github.com/MoonshotAI/kimi-cli/pull/2524)  
  Open. Fixes a correctness bug where chained `StrReplaceFile` edits were counted against the original file content, causing inaccurate replacement counts. Resolves #2526.

- [#2506 — fix(kosong): raise a clear error on circular $ref in deref_json_schema](https://github.com/MoonshotAI/kimi-cli/pull/2506)  
  Closed. Small self-contained fix to `kosong.utils.jsonschema.deref_json_schema` so circular local `$ref` references produce a clear error instead of silently recursing.

## Feature Request Trends

- **Persistent memory & context management** — The strongest signal across issues: developers want long-term memory, project-specific context, and user preference persistence, especially for large projects.
- **Quota-aware context handling** — Requests to tie context compaction and token usage to subscription allowances rather than only the model’s max context window.
- **Provider compatibility** — Demand for correct handling of reasoning/thinking fields from OpenAI-compatible providers, and more transparent configuration around provider-specific keys.

## Developer Pain Points

- **Large-project context loss** — Multiple users report that Kimi Code CLI doesn’t retain enough context or memory over long-running agentic sessions, making big-project work painful.
- **Unclear quota/metering behavior** — Users are frustrated by apparent allowance changes without announcements and want better visibility into token consumption and limits.
- **Compaction not firing in real sessions** — On very large context windows, default compaction settings are ineffective, leading to wasted quota and unwieldy context.
- **Provider-specific data loss** — OpenAI-compatible servers that emit reasoning content can trigger empty-response errors when reasoning content is dropped.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-08-16

## Today's Highlights

Community attention is focused on OpenCode Go/Zen reliability: users are reporting paid-subscription billing sync failures, persistent `grok-4.5` errors, and “Endpoint is unavailable” messages. On the engineering side, active PRs are targeting v2 performance and stability, including streamed session delta batching, virtualized timeline memory leaks, and workspace isolation via Docker/Incus. No new release was published in the last 24 hours.

## Hot Issues

1. [**#37790 – [BUG] OpenCode Go subscription paid successfully but workspace shows "Insufficient balance"**](https://github.com/anomalyco/opencode/issues/37790)  
   A billing sync bug that prevents paying users from using OpenCode Go despite a successful Stripe payment. With 14 comments, this is the most active issue and is directly blocking revenue users.

2. [**#24879 – [FEATURE] Go Pro tier ($20) and Share modifier with first-month discounts**](https://github.com/anomalyco/opencode/issues/24879)  
   Users want a predictable $20 Pro tier plus a Share modifier instead of the current monthly-cap / pay-as-you-go Zen fallback. 11 👍 and 11 comments show strong demand for more flexible paid plans.

3. [**#42143 – Why does Opencode require me to subscribe when your official website states it's 100% free?**](https://github.com/anomalyco/opencode/issues/42143)  
   A recurring confusion/grievance about OpenCode’s “free” positioning versus required subscriptions for hosted/Go usage. The 10-comment thread suggests the free-vs-paid boundaries need clearer messaging.

4. [**#7801 – [FEATURE] Plan Mode + Question tool can auto switch to Build mode**](https://github.com/anomalyco/opencode/issues/7801)  
   The highest-upvoted open feature request at 31 👍. Users want automatic mode transitions so Plan Mode + Question tool does not require a manual switch to Build mode.

5. [**#40206 – grok-4.5 on opencode go not working since 2 Aug**](https://github.com/anomalyco/opencode/issues/40206)  
   A two-week-old report of `grok-4.5` returning HTTP 500 via OpenCode Go. Related reports in #40886 and #42802 indicate a widespread hosted-model regression, not just a local config issue.

6. [**#35649 – Links wrapped across lines not clickable in Kitty terminal**](https://github.com/anomalyco/opencode/issues/35649)  
   OSC 8 hyperlinks fail when long URLs wrap across lines in Kitty, leaving links unclickable. This is a targeted terminal UX bug affecting Kitty power users.

7. [**#42329 – Fetch Failed**](https://github.com/anomalyco/opencode/issues/42329)  
   After the latest update, prompts fail with “Failed to fetch” after 0–1 successful requests per restart. This looks like a connection/state regression and has already generated support traction.

8. [**#37671 – [2.0] v2 cli: headless commands load OpenTUI and leak native temp files**](https://github.com/anomalyco/opencode/issues/37671)  
   v2 commands like `--version`, `--help`, and `api` load OpenTUI and leak 13.1 MiB `libopentui.so` temp files. This is especially problematic for headless/CI usage.

9. [**#34737 – Project path is not updated after moving project directory (opens old deleted path)**](https://github.com/anomalyco/opencode/issues/34737)  
   OpenCode still opens a deleted `C:\first_address` path after a project is moved to `D:\second\address`. A stale state-management bug that disrupts projects relocated on disk.

10. [**#42739 – [Bug] Unhandled crash in `Provider.list` when Cloudflare environment variables exist without `CLOUDFLARE_API_TOKEN`**](https://github.com/anomalyco/opencode/issues/42739)  
    A launch-time crash triggered by incomplete Cloudflare environment variables. Edge-case, but it is a hard crash for affected users and points to fragile provider auto-detection.

## Key PR Progress

1. [**#42826 – fix(core): batch streamed session deltas**](https://github.com/anomalyco/opencode/pull/42826)  
   Reduces the flood of separate public events for provider text, reasoning, and tool-input fragments. This should meaningfully lower event overhead during long streaming sessions.

2. [**#42825 – fix(app): release virtualized timeline elements**](https://github.com/anomalyco/opencode/pull/42825)  
   Fixes a memory leak in TanStack Virtual where ~37,500 detached timeline DOM nodes were retained in one long session. Important for web UI stability in long-lived chats.

3. [**#42831 – feat(core): add Docker blueprint workspaces**](https://github.com/anomalyco/opencode/pull/42831)  
   Adds Docker-backed workspace blueprints with commit-based container forks, idle stop/wake, and cleanup. This advances isolated, reproducible execution for workspace-backed subagents.

4. [**#42829 – feat(core): add Incus workspace forks**](https://github.com/anomalyco/opencode/pull/42829)  
   Adds Incus container/VM snapshot-based workspace forking, including subagent isolation and idle lifecycle management. Expands OpenCode’s workspace isolation story beyond local directories.

5. [**#42830 – feat(plugin): select event subscriptions**](https://github.com/anomalyco/opencode/pull/42830)  
   Adds plugin-only `ctx.event.subscribe(type)` alongside the wildcard form, letting plugins subscribe to specific public event types. A cleaner plugin API with less unnecessary event traffic.

6. [**#42820 – fix(app): use tree directory picker everywhere**](https://github.com/anomalyco/opencode/pull/42820)  
   Removes the legacy flat directory picker fallback in favor of the tree directory picker for all non-native project pickers. Addresses discoverability and subfolder-navigation issues.

7. [**#37172 – fix(tui): sync model favorites**](https://github.com/anomalyco/opencode/pull/37172)  
   Stores model favorites in managed CLI config, watches for config changes, and migrates from `model.json`. Fixes #37053 and makes favorites consistent across concurrent TUIs.

8. [**#37156 – fix(server): SSE event loss under bwrap PID namespace**](https://github.com/anomalyco/opencode/pull/37156)  
   Fixes SSE streams stalling after the first chunk when `opencode serve` runs inside `bwrap --unshare-pid`. Important for sandboxed and containerized server deployments.

9. [**#37110 – fix(opencode): stop repeated empty tool loops**](https://github.com/anomalyco/opencode/pull/37110)  
   Stops sequential discovery-tool loops after three consecutive empty/no-match outcomes, even when the model changes the query. Addresses wasted-token and infinite-loop behavior from #31942.

10. [**#37058 – fix(xai): cross-process single-flight for OAuth refresh**](https://github.com/anomalyco/opencode/pull/37058)  
    Prevents multiple OpenCode processes sharing `auth.json` from racing xAI refresh-token rotation. Fixes `invalid_grant` errors and improves multi-process auth reliability.

## Feature Request Trends

- **Automated mode transitions**  
  The most popular request is Plan Mode + Question tool automatically switching to Build mode (#7801), reflecting demand for less manual agent workflow management.

- **Flexible and transparent paid plans**  
  Users want a predictable Go Pro tier and Share modifier (#24879), while also pushing back on “100% free” messaging when subscriptions are required (#42143).

- **Stronger permissions and error visibility**  
  There is clear demand for enforcing agent permission rules at runtime (#32787) and surfacing `AI_APICallError` via ACP so errors are not only written to stderr (#42827).

- **Cross-provider model parity**  
  Issues like missing GLM reasoning toggles (#42793), MiMo video input not reaching the model (#40642), and Poe tool failures (#42818) show users expect feature parity across providers and models.

- **Terminal and web UI ergonomics**  
  Wrapped-link clickability (#35649), subfolder navigation in the project picker (#42784), mouse-wheel behavior in the TUI (#35295), and stale project paths (#34737) are recurring small UX annoyances with broad impact.

## Developer Pain Points

- **OpenCode Go/Zen backend instability**  
  Multiple reports of `grok-4.5` returning 500/503 (#40206, #40886, #42802), “Endpoint is unavailable” retry loops (#42750, #42757), and dashboard `ResourceExhausted` DB errors (#42799) point to ongoing hosted-service reliability issues.

- **Billing and subscription friction**  
  Paid users report balance not updating after successful Stripe payment (#37790), while free-tier users are confused by subscription requirements (#42143). These issues damage trust and onboarding.

- **v2 regressions**  
  Headless commands loading OpenTUI and leaking temp files (#37671), running subagent rows not clickable in the classic TUI (#42754), and large memory retention in virtualized timelines (#42825) are recurring v2 stability complaints.

- **Provider/auth integration brittleness**  
  Launch crash from Cloudflare env vars (#42739), Poe built-in tool failure in 1.18.18 (#42818), and xAI OAuth refresh races (#37058) show that provider detection and auth flows still have rough edges.

- **Unexplained generic errors**  
  “Failed to fetch” (#42329), “Unexpected server error” (#42802), and unhandled crashes in `Provider.list` (#42739) leave developers without actionable details and produce high-friction support scenarios.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-16

## Today's Highlights

Context management is the dominant theme this week: a cluster of PRs shipped to make compaction safer (turn-boundary compaction in #8153, a post-compaction crash fix in #8164, and corrected token accounting in #8165), while open issue #6879 — auto-compaction failing on long agentic runs — remains the most-voted issue in the tracker. Provider work also advanced: xAI moves to the Responses API with Grok 4.6 as default (#8124), and two DeepSeek V4 Flash fixes landed (#8146, #8181). TUI polish continues with a cursor-blink fix (#8155) and a Mermaid renderer upgrade (#8158).

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#6879 — Auto-compaction never triggers until provider overflow](https://github.com/earendil-works/pi/issues/6879)** — *Open, 17 👍, 21 comments.* The most-voted open issue. A 2-hour agentic turn on gpt-5.6-sol grew past the compaction threshold and kept climbing beyond 100% context until the API rejected the request at 373k tokens. The author suggests checking after every agent step, not just at turn boundaries. High community agreement.

2. **[#6187 — Pi login hangs in WSL after Copilot device authorization](https://github.com/earendil-works/pi/issues/6187)** — *Closed, 27 comments.* Device auth completes in the browser, but the WSL client never detects it and hangs indefinitely. The most-discussed issue in the window; closed but clearly a frustrating onboarding failure for WSL users.

3. **[#8170 — Windows bash tool can kill its own host via `taskkill`](https://github.com/earendil-works/pi/issues/8170)** — *Closed, 2 comments.* The model generated `cmd.exe /c "taskkill /F /IM node.exe"` and Pi executed it without confirmation, killing its own pi-web host. A striking safety gap in the bash tool's command-approval flow on Windows.

4. **[#7855 — Random "Response was truncated before completion."](https://github.com/earendil-works/pi/issues/7855)** — *Closed, 5 comments.* Occurs randomly with any OpenAI-compatible API (reproduced with local VLLM); users must manually prompt continuation. Closed as no-action, but the failure mode remains unexplained.

5. **[#8105 — Codex materializes optional tool parameters as required](https://github.com/earendil-works/pi/issues/8105)** — *Closed, 4 comments.* `openai-codex-responses` serializes tools with `strict: null`, which causes gpt-5.6-sol to treat optional parameters as mandatory — a subtle but breaking provider-compat regression.

6. **[#8028 — TUI `fullRender` crashes with V8 string-limit RangeError](https://github.com/earendil-works/pi/issues/8028)** — *Open, 2 comments.* A video-production agent reading many images eventually crashes with `RangeError: Invalid string length` during full render. Hitting hard engine limits from normal TUI use is alarming for heavy sessions.

7. **[#8003 — Input-box cursor flickers aggressively while streaming](https://github.com/earendil-works/pi/issues/8003)** — *Open, 2 comments.* Typing while the assistant generates makes the cursor blink far faster than normal terminal behavior. A visible TUI regression that erodes trust in the editor.

8. **[#7787 — Bash `PI_*` guideline triggers unnecessary permission prompts](https://github.com/earendil-works/pi/issues/7787)** — *Open, 3 comments.* The default guideline suggests inspecting `PI_*` env vars; models interpret this as startup work and run `env` on unrelated tasks, causing spurious permission prompts. Root cause traced to `exposeSessionEnvironment`.

9. **[#8168 — Compaction + session restore corrupts tool-result role → 422](https://github.com/earendil-works/pi/issues/8168)** — *Closed, 1 comment.* After auto-compaction during a tool-heavy turn, the next request fails with `Input should be <ChatMessageRole.TOOL: 'tool'>`. Another data-integrity edge case in the compaction path.

10. **[#8157 — Migrate grok-mermaid → lovely-mermaid](https://github.com/earendil-works/pi/issues/8157)** — *Open, 2 comments.* grok-mermaid inherited corner cases from a 1:1 port; lovely-mermaid has better parsers. Signals broader investment in terminal Mermaid rendering quality.

## Key PR Progress

1. **[#8153 — fix: compact at safe turn boundaries](https://github.com/earendil-works/pi/pull/8153)** — Adds a run-scoped boundary-compaction API consumed between completed Pi turns, rebuilds live context in the same run, preserves the native recent tail, and keeps overflow recovery bounded. Directly targets the crash-prone compaction paths reported this week.

2. **[#8164 — fix(agent-session): never continue from trailing assistant message](https://github.com/earendil-works/pi/pull/8164)** — Silent-overflow compaction on a completed turn previously retried via `agent.continue()` from a trailing assistant message, crashing with `Cannot continue from message role: assistant`. Now only retries when the turn was rejected mid-flight.

3. **[#8165 — fix(coding-agent): tokens.total = billable only](https://github.com/earendil-works/pi/pull/8165)** — `getStats` was including cache tokens (billed at 1/120th input rate) in `tokens.total`, skewing compaction budgets and status stats. Cache is now reported separately.

4. **[#8148 — fix(coding-agent): scope the bash `PI_*` guideline to session questions](https://github.com/earendil-works/pi/pull/8148)** — Fixes #7787 by making the env-inspection guideline conditional on session-related work instead of unconditional, reducing spurious permission prompts.

5. **[#8155 — fix(tui): avoid resetting cursor blink during renders](https://github.com/earendil-works/pi/pull/8155)** — Tracks terminal cursor visibility in `TuiBase` and emits visibility commands only on state transitions, addressing the aggressive flicker from #8003 in both regular and fullscreen renderers.

6. **[#8158 — feat(coding-agent): upgrade Mermaid terminal rendering](https://github.com/earendil-works/pi/pull/8158)** — Closes #8157 and #7832 by migrating to lovely-mermaid with improved parsers and fewer inherited corner cases.

7. **[#8146 — fix(ai): cap Baseten DeepSeek V4 Flash output at 384k tokens](https://github.com/earendil-works/pi/pull/8146)** — models.dev advertises a 1M output limit, but Baseten serves 384k max; requests above that fail. Caps `maxTokens` accordingly — a good example of provider documentation vs. reality.

8. **[#8181 — fix(ai): expose low thinking level for DeepSeek V4 Flash on opencode providers](https://github.com/earendil-works/pi/pull/8181)** — The `low` reasoning-effort map was only applied to the direct deepseek route; opencode and opencode-go fell back to a map setting `low: null`. Now consistent across routes.

9. **[#8149 — fix(ai): omit invalid OpenAI session header](https://github.com/earendil-works/pi/pull/8149)** — Requests with `sessionId` sent a `session_id` HTTP header, which underscore-rejecting HTTP/1 proxies (Envoy) terminated with `400 http1.unexpected_underscore`. Fix removes the invalid header.

10. **[#8124 — feat(ai): route xAI models through Responses and default to Grok 4.6](https://github.com/earendil-works/pi/pull/8124)** — Open PR. Switches xAI from completions to the Responses API, sends a Pi user agent, and updates the default model from Grok 4.5 to Grok 4.6.

## Feature Request Trends

- **Compaction & context control** is the strongest trend: compacting at safe turn boundaries (#8153), tool-result pruner/spill extensions (#8172, #8173), exposing compaction failures to extension handlers (#8175), and neutral wording for length stops (#8176).
- **Thinking-block TUI UX**: fixed-height scrollable thinking blocks, auto-collapse on completion (#8171), and eliminating blank spacer lines from hidden thinking blocks (#8154).
- **Extension system expansion**: notification-only events around UI dialogs (#7147), a cancellable `model_select_before` hook for async model prep (#8169), and `ExtensionCommandContext` support for shortcuts (#8180).
- **Provider breadth**: built-in LLMTR provider (#8178), DeepSeek V4 Flash `low` thinking level (#8182), model picker support for llama.cpp router-mode models (#8167), and xAI Grok 4.6 defaults (#8124).
- **Developer ergonomics**: shell completion script generator (`pi completion bash|zsh|fish`, #4776, 5 👍) and a `/tree` file-restore prompt (#8152).

## Developer Pain Points

- **Compaction/context management is the #1 pain cluster**: auto-compaction not triggering (#6879), crashes after compaction (#8164), corrupted tool-result roles causing 422s (#8168), silent compaction failures invisible to extensions (#8175), misleading "overflow recovery failed" messages (#8176), and token accounting skewed by cache tokens (#8165).
- **TUI rendering instability**: V8 string-limit crashes in `fullRender` (#8028), aggressive cursor flicker (#8003), hidden thinking blocks leaving blank lines (#8154), and hardcoded mouse-wheel scroll step (#7765).
- **Windows/WSL-specific breakage**: login hangs specifically in WSL after device auth (#6187) and the bash tool executing image-wide `taskkill` against its own host (#8170).
- **Provider quirk whack-a-mole**: optional tool parameters becoming required (#8105), underscore-bearing headers rejected by proxies (#8149), inaccurate documented token caps (#8146), and per-provider thinking-level mismatches (#8181, #8182).
- **Documentation gaps**: no official docs on how to interrupt a running response and type a new prompt (#8058), and undocumented Ctrl+Shift+F conflicts with Windows Terminal (#8183).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-16

## Today's Highlights
The ecosystem's dominant theme this week is `/review` hardening: maintainers filed a cluster of P2 bugs around presubmit overlap-drop, worktree concurrency, and last-gate schema friction — while shipping matching fixes in PRs #9222, #9215, #9211, and #9212. A new nightly (`v0.21.11-nightly.20260815.c396fe3d12`) landed with an autofix footprint gate, and the DSW EAS smoke chain validated SWE-bench Verified (1/1) and Terminal-Bench 2.0 (1/1) end-to-end against reference v0.21.12. On the risk side, three P1 E2E CI failures on `main` and a security issue about PAT-bearing jobs on shared runners remain open.

## Releases
**v0.21.11-nightly.20260815.c396fe3d12** — Nightly release containing `feat(autofix)`: a deny-by-default footprint gate and positional window censuses by @wenshao. Multiple DSW EAS release-event smoke runs (r1–r5) all reached **SUCCEEDED** status for both SWE-bench Verified (`swe-bench/swe-bench-verified@2`) and Terminal-Bench 2.0 (`terminal-bench@2.0`), with the full benchmark dispatching 500 SWE-bench cases first and 89 Terminal-Bench cases only after successful SWE publication on the same Release. Benchmark reference: `v0.21.12`.

## Hot Issues

1. **[#9089](https://github.com/QwenLM/qwen-code/issues/9089) — autofix: PAT-bearing jobs share a host with untrusted branch code** (P1, security) — Open. PAT-bearing GitHub Actions steps cannot be fully isolated from untrusted branch code on a shared runner host. This class of finding cannot be closed from inside a workflow step, making it a structural CI/CD risk requiring runner-level isolation.

2. **[#9241](https://github.com/QwenLM/qwen-code/issues/9241) / [#9239](https://github.com/QwenLM/qwen-code/issues/9239) / [#9237](https://github.com/QwenLM/qwen-code/issues/9237) — Main CI failed: E2E Tests** (P1, build-system) — Three auto-filed P1 issues in a single day for main-branch E2E failures that die before any test result is reported. All are `status/ready-for-agent` with `autofix/approved`; recurring CI instability is a top concern for contributors.

3. **[#9219](https://github.com/QwenLM/qwen-code/issues/9219) — /review presubmit overlap matching is exact-line only** (P2) — Multi-line inline ranges and semantic duplicates pass the `noConflict` check, allowing duplicate findings through review. Filed by @wenshao after a manual review of PR #9204 exposed the gap.

4. **[#9208](https://github.com/QwenLM/qwen-code/issues/9208) — /review: overlap-drop swallows ledger re-posts** (P2) — Content-blind dropping of findings at matching `(path, line)` loses carried ledger IDs (R-round-n) and silently drops same-line distinct claims in round-4 reviews of PR #9118.

5. **[#9205](https://github.com/QwenLM/qwen-code/issues/9205) — /review: concurrent same-PR reviews race on the fixed worktree path** (P2) — The review worktree at fixed path `.qwen/tmp/review-pr-<n>` was deleted five minutes after creation by another session reviewing the same PR; cleanup bypass audit recorded 5 unvouchered deletions.

6. **[#9230](https://github.com/QwenLM/qwen-code/issues/9230) — Follow-up suggestion side query defeats server-side prefix caching** (P2, performance) — On prefix-caching servers (e.g., llama.cpp), the main qwen-code session gets ~0% prompt-cache reuse: every turn re-prefills from scratch while other clients get cache hits. `enableCacheSharing` is also off by default.

7. **[#9198](https://github.com/QwenLM/qwen-code/issues/9198) — qwen runs OOM after week-long session** (P2, performance) — A session running for over a week OOMs despite 1 TB server memory; the hosting tmux window becomes unusable (garbled keys, broken copy/paste). The reporter notes Kimi Code does not exhibit this.

8. **[#7427](https://github.com/QwenLM/qwen-code/issues/7427) — web-shell: artifact panel spams 'Load artifacts failed: Failed to fetch'** (P2, UI) — The session artifact panel repeatedly shows error toasts on automatic refresh (panel mount, prompt finish), not user-initiated actions. Open for nearly a month with 5 comments.

9. **[#9200](https://github.com/QwenLM/qwen-code/issues/9200) — Same task, same local module, wildly different processes** (P2, badcase) — User reports identical tasks with identical local module calls producing drastically different intermediate behavior across log files, comparing unfavorably to a discontinued CLI tool. Community frustration with non-determinism.

10. **[#9250](https://github.com/QwenLM/qwen-code/issues/9250) — qwen serve host writer hard-codes new-file mode 0600** (P3) — `write_file`/`edit`/`notebook_edit` create new files with mode 0600 unconditionally, ignoring the daemon's umask, with no settings key or environment variable to override it.

## Key PR Progress

1. **[#9222](https://github.com/QwenLM/qwen-code/pull/9222) — fix(review): normalize last-gate inputs and anchor mid-line fragments** — The `/review` pipeline's final gates previously rejected the input shapes its own earlier stages produced, failing hours-long runs at the finish line. This PR normalizes those shapes and closes the tooling/documentation gaps.

2. **[#9215](https://github.com/QwenLM/qwen-code/pull/9215) — fix(review): give duplicate-dropped Suggestions their own compose state and body sentence** — Confirmed-but-not-reposted findings (due to prior or concurrent reviewers) now get dedicated state entries, making review output more transparent about carried findings.

3. **[#9211](https://github.com/QwenLM/qwen-code/pull/9211) — fix(review): lock the PR review worktree lease against concurrent sessions** — The worktree lease now doubles as a real lock; destructive operations check it before deleting the fixed-path worktree, closing the mid-run deletion race from #9205.

4. **[#9212](https://github.com/QwenLM/qwen-code/pull/9212) — fix(review): exempt carried-id re-posts from the presubmit overlap drop** — Makes the overlap gate id-aware: existing comments carrying a matching ledger ID are treated as additive re-posts, not duplicates, fixing the swallowed ledger issue from #9208.

5. **[#9191](https://github.com/QwenLM/qwen-code/pull/9191) — feat(review): transfer per-file content verdicts across rebases** — Instead of anchoring incremental review to a commit SHA that dies on force-push, this certifies per-file content pairs so clean verdicts survive history rewrites.

6. **[#9189](https://github.com/QwenLM/qwen-code/pull/9189) — feat(autofix): defer verified out-of-footprint findings to a surviving follow-up queue** — Adds a fourth address-review outcome, "Defer to follow-up," recording machine-readable verified findings whose fix lies outside the PR's footprint — preventing silent drift.

7. **[#9228](https://github.com/QwenLM/qwen-code/pull/9228) — fix(ci): narrow serve-ab's self-hosted wipe to the A/B checkout dirs** — The `Wipe stale workspace before checkout` step deleted the entire shared workspace including 900 MB of `.git` history on self-hosted ECS runners, forcing full re-downloads for subsequent jobs.

8. **[#9163](https://github.com/QwenLM/qwen-code/pull/9163) — fix(review): confine every ledger and evidence read to contained regular files** — Closes the R2-2 security family: all ledger/evidence reads use one primitive that opens with `O_NOFOLLOW`, `fstat`s the same descriptor, and reads bytes off it — validating exactly what is read.

9. **[#9184](https://github.com/QwenLM/qwen-code/pull/9184) — fix(review): gate the recovered incremental anchor on the model that certified it** — Enforces the same-model contract for incremental review: a "clean up to this commit" verdict from one model no longer shortcuts a second opinion from a different model on the same SHA.

10. **[#9122](https://github.com/QwenLM/qwen-code/pull/9122) — feat(web-shell): improve sidebar session management** — Session details on hover, folder previews up to five rows, overflow-aware title fade/scroll, and running-session visual indicators make the sidebar easier to scan.

Also noteworthy: [#9167](https://github.com/QwenLM/qwen-code/pull/9167) (DingTalk outbound file delivery), [#8938](https://github.com/QwenLM/qwen-code/pull/8938) (reject upstream fail-fast placeholder responses), [#9007](https://github.com/QwenLM/qwen-code/pull/9007) (bound ACP HTTP pre-attach buffers by bytes), and [#8467](https://github.com/QwenLM/qwen-code/pull/8467) (Web Shell Git diff sources and branch switching).

## Feature Request Trends

- **`/review` pipeline reliability** — The dominant direction: id-aware dedup, content-based overlap detection, lock-based worktree leases, model-gated incremental anchors, and schema normalization so hours-long runs stop failing at the last gate.
- **Web Shell UX** — Repeated asks for better session management: manual names surviving `/clear`, sidebar scanning improvements, Git diff sources, canonical Goal v3 controls, and HTML export rendered via `WebShellTranscript`.
- **Server-side caching & performance** — Prefix-cache friendliness (follow-up suggestion queries defeating llama.cpp-style caching), configurable `enableCacheSharing`, and investigation into week-long-session OOMs.
- **Configurable daemon behavior** — Users want umask-respecting file modes and generally more knobs for `qwen serve` host writer behavior.
- **Channel & multimodal expansion** — DingTalk outbound file delivery, per-channel `sessionRotation` bounds, and an audio bridge for attachments signal growing demand for non-chat and multimodal workflows.

## Developer Pain Points

- **CI flakiness on main** — Three fresh P1 E2E failures in one day, all dying before any test result is reported; the autofix bot is engaged but the frequency is eroding confidence in `main` stability.
- **Long-running review runs failing at the finish line** — Multiple P2 issues (#9209, #9218) describe ~3-hour review runs rejected at the last gates due to schema mismatches and path collisions, causing manual rework.
- **Concurrency hazards** — Same-PR reviews deleting each other's worktrees mid-run and verification probes mutating a shared worktree while reverse auditors read it.
- **Non-deterministic behavior** — Identical tasks with identical local module calls producing wildly divergent processes frustrates users (#9200) and undermines trust in the tool.
- **Performance cliffs** — Near-zero prompt-cache reuse with prefix-caching servers and OOMs on 1 TB machines after long sessions, with terminal corruption as a side effect.
- **Unresolved UI/input issues** — Chinese IME failure (#5966) and artifact panel error spam (#7427) remain open, with users noting competitor tools handle these scenarios better.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-16

> Data source: `github.com/Hmbown/DeepSeek-TUI`; issue/PR links resolve through the `Hmbown/CodeWhale` tracker.

## Today's Highlights

v0.9.8 stabilization dominates the day: PRs restoring terminal width and session-cost display, fixing macOS credential-test failures, and preventing CI from cancelling concurrent `main` runs have all landed. At the same time, maintainers pushed requested features for third-party provider onboarding and configurable long-context model budgets, plus a critical SSE UTF-8 streaming fix for macOS. No new release was cut in the last 24 hours.

## Releases

No new releases in the last 24 hours.

## Hot Issues

- [Issue #4949 — Discussion: The Chinese Translation of "Constitution"](https://github.com/Hmbown/CodeWhale/issues/4949)  
  Closed after a 17-comment, three-week discussion; the community settled on **宪章 (charter)** over “宪法” to avoid both mistranslation and political overtones. The outcome is now being applied to the website via [#5397](https://github.com/Hmbown/CodeWhale/pull/5397).

- [Issue #5374 — The writing its weird (the agent)](https://github.com/Hmbown/CodeWhale/issues/5374)  
  macOS users see garbled/corrupted streamed agent text, described as “all over the place” and hard to read. The cause is traced to SSE UTF-8 splits across HTTP/2 DATA; fix is in [#5404](https://github.com/Hmbown/CodeWhale/pull/5404).

- [Issue #5350 — Simplify third-party model config with pre-built templates](https://github.com/Hmbown/CodeWhale/issues/5350)  
  Configuring OpenCode Zen, OpenCode Go, Agnes, SenseNova, etc., requires manual URL/model/key setup and often leaves models stuck in `not checked` / `cache failed`. PR [#5406](https://github.com/Hmbown/CodeWhale/pull/5406) implements prefab templates and a test-connection flow.

- [Issue #5367 — Configurable model-visible read/tool-result size limits](https://github.com/Hmbown/CodeWhale/issues/5367)  
  Self-hosted long-context models such as DeepSeek V4 hit conservative per-result ceilings, causing extra reads on larger files. The request is to expose these budgets at model/profile level; PR [#5405](https://github.com/Hmbown/CodeWhale/pull/5405) adds the setting.

- [Issue #5322 — Output area doesn't fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322)  
  Closed regression: v0.9 capped transcript width, wasting columns on wide displays. PR [#5400](https://github.com/Hmbown/CodeWhale/pull/5400) restores the v0.8.65 full-width behavior.

- [Issue #5241 — Pricing endpoint returns 503 / unverified_live_pricing](https://github.com/Hmbown/CodeWhale/issues/5241)  
  After 0.9.3, every session shows `unverified_live_pricing` because `api.codewhale.net/session` returns 503. PR [#5402](https://github.com/Hmbown/CodeWhale/pull/5402) adds an honest fallback path.

- [Issue #5410 — Allow configurable additional roots in the bwrap sandbox](https://github.com/Hmbown/CodeWhale/issues/5410)  
  Zig development breaks with the sandbox on: `/dev/null` redirection is forbidden and system-lib linking fails. The user asks for configurable sandbox roots.

- [Issue #5392 — agy_credentials tests fail on every macOS run](https://github.com/Hmbown/CodeWhale/issues/5392)  
  Closed: macOS temp dirs live under `/var`, and the secure-open walk refuses symlinks at every path component. PR [#5396](https://github.com/Hmbown/CodeWhale/pull/5396) canonicalizes fixtures.

- [Issue #5337 — Finish the dictionary spine / retire every isZh branch](https://github.com/Hmbown/CodeWhale/issues/5337)  
  The web i18n refactor from #4934 is incomplete: many page bodies still branch on `isZh`. The issue asks for one dictionary path using inline `{ en, zh }` modules.

- [Issue #5403 — main is red on both platforms across all four completed runs](https://github.com/Hmbown/CodeWhale/issues/5403)  
  After CI cancellation was fixed, completed runs are now visible and failing: macOS `plugin_e2e_acceptance` and Windows NSIS provisioning. WIP [#5408](https://github.com/Hmbown/CodeWhale/pull/5408) investigates the PTY keep-alive hang.

## Key PR Progress

- [PR #5404 — fix(client): fail closed on SSE UTF-8 split across HTTP/2 DATA](https://github.com/Hmbown/CodeWhale/pull/5404)  
  Addresses the macOS garbled-streaming bug from #5374 by avoiding lossy UTF-8 decoding on unterminated stream flushes.

- [PR #5406 — feat(tui): prefab provider templates and test-connection](https://github.com/Hmbown/CodeWhale/pull/5406)  
  Implements #5350: built-in templates for OpenCode Zen, OpenCode Go, Agnes, and SenseNova; users only supply an API key.

- [PR #5405 — feat(tui): configurable model-visible read/tool-result budgets](https://github.com/Hmbown/CodeWhale/pull/5405)  
  Implements #5367, giving self-hosted long-context DeepSeek V4 users optional larger per-result budgets.

- [PR #5402 — fix(tui): restore session cost when live pricing is unverifiable](https://github.com/Hmbown/CodeWhale/pull/5402)  
  Fixes #5241 so sessions don’t stay at `unverified_live_pricing` forever when the pricing endpoint is unavailable.

- [PR #5400 — fix(tui): fill transcript to full terminal width](https://github.com/Hmbown/CodeWhale/pull/5400)  
  Closes #5322; `session_shell_area` is an identity again, restoring v0.8.65 layout on wide terminals.

- [PR #5399 — fix(tui): v0.9.8 stabilization](https://github.com/Hmbown/CodeWhale/pull/5399)  
  Reconstructs the missing Rust stabilization onto current `main`: turn-owned default direct subagents, compaction quality, and Blue Stage web fixes.

- [PR #5395 — fix(ci): stop cancel-in-progress from killing concurrent main pushes](https://github.com/Hmbown/CodeWhale/pull/5395)  
  Prevents later `main` pushes from cancelling earlier CI runs, making failing assertions actually visible.

- [PR #5394 — fix: unred v0.9.8 provider-count assertions and google ModelRegistry drift](https://github.com/Hmbown/CodeWhale/pull/5394)  
  Fixes the red `main` from #5383: updates CLI provider-count assertions to the v0.9.8 registry and corrects Google model drift.

- [PR #5396 — fix(tui): canonicalize agy_credentials fixtures for macOS](https://github.com/Hmbown/CodeWhale/pull/5396)  
  Closes #5392 by resolving the `/var` symlink issue in macOS temp-dir paths.

- [PR #5401 — fix: CodeQL Highs and prepare GHSA-8hp3 / GHSA-3mgh](https://github.com/Hmbown/CodeWhale/pull/5401)  
  Security-only slice: fixes clear-text logging and other CodeQL High findings while preparing security advisories without tagging a release.

## Feature Request Trends

- **Zero-friction provider onboarding**: Users want prefab provider templates, test-connection buttons, and built-in documentation (#5350), plus compatibility paths such as direct Gemini over the OpenAI-compatible route (#5084).
- **Configurable execution limits**: Requests are moving toward exposing hardcoded ceilings as settings: model-visible read/tool-result budgets (#5367), workflow search concurrency (#5060), and sandbox root configuration (#5410).
- **Internationalization cleanup**: The community is pushing for consistent terminology and architecture — the “Constitution” translation debate (#4949) and the incomplete web dictionary spine (#5337).
- **Reliability and observability**: Users need honest fallbacks when live pricing is unavailable (#5241) and CI infrastructure that surfaces real failures instead of cancelling them (#5403).

## Developer Pain Points

- **v0.9.x regressions are still being felt**: terminal width (#5322), session pricing (#5241), and corrupted streamed output (#5374) all required dedicated fixes.
- **macOS is a recurring source of breakage**: symlink-safe test fixtures (#5392), SSE UTF-8 splitting (#5374), and PTY/plugin acceptance hangs (#5403/#5408) keep burning CI time.
- **Red `main` is a frequent contributor tax**: stale provider-count assertions (#5383), missing `facts.generated.ts` (#5398), clippy lints (#5393), and cancel-in-progress CI (#5395) repeatedly blocked or masked PR validation.
- **Configuration burden remains high**: hardcoded model-visible limits (#5367), manual third-party provider setup (#5350), and opaque sandbox restrictions (#5410) force users to debug low-level internals.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*