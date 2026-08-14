# AI CLI Tools Community Digest 2026-08-15

> Generated: 2026-08-14 23:00 UTC | Tools covered: 10

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
**Date: 2026-08-15 | Source: Community digests for 10 major AI CLI tools**

---

## 1. Ecosystem Overview

The AI CLI landscape on 2026-08-15 shows a maturing but volatile ecosystem: 8 of 10 tracked projects shipped code or releases within 24 hours, with 17 releases across 7 tools and 72+ highlighted pull requests. Rapid cadence is colliding with stability concerns — users reported regressions, crashes, and platform-specific breakage across nearly every tool, with explicit "please revert" demands aimed at both Codex and CodeWhale. Cross-cutting themes dominate: session persistence, token/cost efficiency, MCP reliability, and Windows/WSL support are the shared battlegrounds. The ecosystem is bifurcating between enterprise-tied tools (Claude Code, Copilot CLI) optimizing governance and model catalogs, and provider-agnostic tools (OpenCode, Pi, Qwen, Gemini) competing on model breadth, TUI polish, and local-LLM friendliness. Grok Build saw zero activity and Kimi was effectively dormant, revealing a two-tier community landscape.

## 2. Activity Comparison

*Figures are digest-highlighted items (not raw repo totals).*

| Tool | Hot Issues | Key PRs | Releases (24h) |
|---|---|---|---|
| Claude Code | 10 | 4 | **2** — v2.1.232, v2.1.233 |
| OpenAI Codex | 10 | 10 | **5** — rust-v0.148.0-alpha.14 → .18 |
| Gemini CLI | 12 | 10 | **1** — v0.56.0-nightly.20260814 |
| GitHub Copilot CLI | 10 | 3 | **2** — v1.0.80, v1.0.80-1 |
| Kimi Code CLI | 4 | 0 | **0** |
| OpenCode | 10 | 10 | **0** |
| Pi | 10 | 10 | **1** — v0.84.2 |
| Qwen Code | 10 | 10 | **3** — v0.21.12 + 2 previews |
| CodeWhale (DeepSeek TUI) | 10 | 15 (incl. 5 dependabot) | **1** — v0.9.8 |
| Grok Build | 0 | 0 | **0** |

**Most active:** OpenAI Codex (5 alphas + 20 PRs/issues), Qwen Code (3 releases + 20 PRs/issues), Claude Code (2 releases, highest-engagement issues).
**Least active:** Grok Build (silent), Kimi (no PRs/releases; only 4 issues updated).

## 3. Shared Feature Directions

| Direction | Tools | Specific Needs |
|---|---|---|
| **Session lifecycle & persistence** | Claude, Codex, Copilot, Kimi, OpenCode, Pi, Qwen | Unarchive/restore sessions; preserve context across compaction; cross-device handoff; don't lose prompts on stop; `/cd` into new workdir; session-scoped media references |
| **Context/token cost efficiency** | Claude, Codex, Gemini, OpenCode, Pi | Reliable compaction; provider cache reuse (append compaction, `cached_tokens` accounting); fix media/token waste; retry with availability TTL on 429s |
| **MCP robustness & OAuth compliance** | Copilot, Claude, Gemini, OpenCode, CodeWhale | `MCP_TIMEOUT` >60s honored; RFC 8414 OAuth issuer leniency; `tools/list` pagination; >128-tool surfaces; per-tool execution timeouts |
| **Windows/WSL & cross-platform parity** | Claude, Codex, Gemini, Pi, OpenCode, Kimi | Git Bash permission-prompt regressions; MSIX PowerShell sandbox failures; WSL login hangs; ripgrep `EFTYPE`; PowerShell-aware shell command generation |
| **Subagent orchestration trust** | Gemini, OpenCode, Copilot, Claude, Qwen | False-success termination reporting; descendant permission deadlocks; queued subagent questions; agent-to-agent delegation; cross-session `@` mentions |
| **Headless/CI automation reliability** | Qwen, OpenCode, Copilot, Claude, Pi | Quiet post-tool completions treated as errors; `GITHUB_TOKEN` 403 on MCP policy; silent automation failures; CLI-args-only scriptable invocation |
| **Enterprise governance & entitlements** | Copilot, Claude | Org model catalogs missing from CLI; Analytics Admin API gaps; Max plan quota accuracy |

## 4. Differentiation Analysis

- **Claude Code** — Enterprise/IDE-centric maturity: GitLab MR integration, apps-gateway identity forwarding, subagent forking by default. Strongest TUI UX demand (147👍 for Enter-to-newline). Two release trains per day signal a disciplined shipping machine, but image-handling token waste and safety-policy false positives are trust risks.
- **OpenAI Codex** — Splitting between desktop app and rust CLI. The app is the weak point: freeze reports (84👍), WMI-exhausting `taskkill.exe` storms, idle CPU busy loops. The rust channel iterates fastest (5 alphas/day) on sandbox fail-closed enforcement and gRPC code-mode protocol modernization.
- **Gemini CLI** — Distinctive automation-first engineering: a bot ("SSR Agent") closed 7 issues in one batch. Roadmap is autonomy-forward (agents calling agents, AST-aware codebase tools) with a privacy-conscious Auto Memory posture. PTY leak fixes address long-session exhaustion.
- **Copilot CLI** — Tight coupling to GitHub enterprise Copilot is both moat and liability: org model catalogs drift, all-Claude models vanish server-side, MCP OAuth regressions across patches. Distinguishing itself by CI security hardening (migrating off `pull_request_target`).
- **OpenCode** — Provider-agnostic BYO-key ethos. The 48-bit timestamp wraparound (#42608) silently freezing sessions is a production-scale bug that only heavy real-world usage exposes. Strongest provider-quirk coverage (DeepSeek `reasoning_content`, MiniMax tool-call suffix, cache-token recovery). Dynamic model discovery PR closes 6 long-standing requests.
- **Pi** — TUI power-user focus: fullscreen transcript search, autocomplete UX, truthful clipboard. Experimental append compaction explicitly reuses provider prompt caches. Broadest provider onboarding velocity (SiliconFlow, xAI Responses, ChatGPT OAuth image generation). The 27-comment Windows/WSL survey thread shows deliberate platform triage.
- **Qwen Code** — Web Shell/desktop expansion (workspace uploads, Goal v3 controls, DingTalk channel) plus the most mature automated review/autofix pipeline (`capture-tui` rendering verification). Byte-level daemon resource bounding is a recurring, unresolved ask.
- **CodeWhale (DeepSeek TUI)** — Lightweight Rust TUI rebrand; local keyless DeepSeek route (DwarfStar). Post-v0.9.8 CI assertion drift broke `main` on all platforms — a reminder that release gates must include test-expectation checks. Ambitions toward a Kimi-level plugin/marketplace ecosystem.
- **Kimi Code CLI** — Quietest Chinese-vendor tool this window; community consensus is that memory layers and cross-device continuity are the missing differentiators.

## 5. Community Momentum & Maturity

- **Largest / most engaged communities:** Claude Code (73-comment bug threads, 147👍 open issue) and OpenAI Codex (100-comment Windows freeze issue, 84👍) — both showing fatigue with reliability, but with the deepest user bases.
- **Fastest iterators:** OpenAI Codex (5 alphas/day), Qwen Code (3 releases), Claude Code and Copilot CLI (2 releases each). OpenCode and Pi sustain strong PR throughput without releases (compounded by a critical production bug in OpenCode's case).
- **Most automated maintainer loop:** Gemini CLI's bot-driven PR batch is the standout engineering-process signal; Qwen's autofix/review pipeline and CodeWhale's dependabot flow follow.
- **Stability risks to momentum:** Codex users explicitly requesting reverts; Copilot's repeated MCP OAuth regressions; CodeWhale's red-CI-after-release; Claude's Windows Git Bash permission-prompt regression introduced in 2.1.232.
- **Dormant:** Grok Build (no activity) and Kimi (no code movement) are losing community mindshare in this window.

## 6. Trend Signals

1. **Session state is the new battleground.** Users expect resumable, multi-device, persistent agent sessions. Tools are responding differently: Kimi's memory-file proposals, Pi's cache-reusing append compaction, Codex's `/cd` request, Claude's session `@`-mentions, Qwen's session media references.
2. **Token economics drive architecture.** Compaction reliability, provider cache reuse, and cache-token accounting are not optimizations — they are core UX and trust features. Media-handling token waste is now a top-cost complaint (Claude #60334).
3. **Windows/WSL is the top platform gap.** Every major tool shipped Windows-related fixes or has open Windows pain. First-class Windows/WSL support is a clear differentiator.
4. **MCP is becoming a protocol-layer tax.** OAuth strictness (RFC 8414), timeout limits, large tool surfaces, and pagination gaps are generating cross-tool regressions. Expect a push for lenient-compliance and better client-side validation.
5. **Release velocity without regression gates erodes trust.** Users are asking for rollbacks; post-release CI failures (CodeWhale), patch-level regressions (Copilot MCP OAuth), and unannounced alpha floods (Codex) are the recurring pattern.
6. **Agent honest-status reporting is a trust prerequisite.** False-success subagent termination (Gemini), silent automation failures (Claude), and unstoppable agents (OpenCode's wraparound) all violate the same implicit contract: *report what actually happened*.
7. **BYO-provider users demand self-discovery.** Auto-discovery of models via `/v1/models` (OpenCode #42660) and per-provider protocol tolerance (DeepSeek, MiniMax, Kimi quirks) will determine which open tools win local-LLM and proxy users.
8. **Headless/CI operation is an emerging first-class use case.** Scriptable invocation, quiet-turn handling, background-task panels, and CI-safe permission flows are recurring asks — overnight autonomous agents are a real workload, not a demo.

**Bottom line for decision-makers:** The differentiation window is closing on provider breadth and TUI polish; the open battlegrounds now are session persistence, Windows/WSL parity, MCP reliability, and enterprise governance. Tools that stabilize releases and make agent status trustworthy will consolidate community trust fastest.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report  
**Data source:** github.com/anthropics/skills | **Snapshot:** 2026-08-15

---

## 1. Top Skills Ranking

The most-attended PRs reflect a community focused on fixing core skill-authoring tooling, expanding document-format coverage, and hardening production skills.

### 1. skill-creator eval reliability fixes — [#1298](https://github.com/anthropics/skills/pull/1298)  
**Status:** Open  
**Functionality:** Fixes `run_eval.py` so skill-description optimization no longer reports `recall=0%` for every description. Installs the eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel workers.  
**Discussion highlights:** This PR directly addresses the widely reproduced #556 bug. The community has shown strong interest because the entire skill-creator feedback loop is currently “optimizing against noise.”

### 2. Document typography quality control — [#514](https://github.com/anthropics/skills/pull/514)  
**Status:** Open  
**Functionality:** Adds a `document-typography` skill to prevent orphan words, widow paragraph headers, and numbering misalignment in AI-generated documents.  
**Discussion highlights:** Addresses a universal pain point: Claude-generated documents consistently exhibit typographic issues that users rarely notice until print or PDF export.

### 3. PDF case-sensitive file reference fixes — [#538](https://github.com/anthropics/skills/pull/538)  
**Status:** Open  
**Functionality:** Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`).  
**Discussion highlights:** Important for Linux/macOS users and CI environments where incorrect casing breaks skill resource loading.

### 4. ODT / OpenDocument skill — [#486](https://github.com/anthropics/skills/pull/486)  
**Status:** Open  
**Functionality:** Adds an `odt` skill for creating, filling, reading, and converting OpenDocument files (`.odt`, `.ods`), including ODT-to-HTML conversion.  
**Discussion highlights:** Extends the skills ecosystem beyond DOCX/PDF, responding to demand for open-format document support in LibreOffice-heavy workflows.

### 5. Frontend-design skill clarity overhaul — [#210](https://github.com/anthropics/skills/pull/210)  
**Status:** Open  
**Functionality:** Revises the `frontend-design` skill for clarity, actionability, and internal coherence so every instruction can be followed within a single conversation.  
**Discussion highlights:** Community feedback centered on making design guidance specific enough to steer Claude’s behavior without being overly prescriptive.

### 6. Meta skills: skill-quality-analyzer + skill-security-analyzer — [#83](https://github.com/anthropics/skills/pull/83)  
**Status:** Open  
**Functionality:** Adds two meta-skills to the marketplace: one evaluates skill quality across structure/documentation and other dimensions; the other analyzes security risks.  
**Discussion highlights:** Responds directly to growing concerns about skill quality and trust as the community skill count grows.

### 7. DOCX tracked-change ID collision fix — [#541](https://github.com/anthropics/skills/pull/541)  
**Status:** Open  
**Functionality:** Prevents document corruption when the DOCX skill adds tracked changes to files containing existing bookmarks, by avoiding hardcoded `w:id` values.  
**Discussion highlights:** Fixes a serious OOXML interoperability bug affecting real Word documents.

### 8. skill-creator YAML validation improvement — [#539](https://github.com/anthropics/skills/pull/539)  
**Status:** Open  
**Functionality:** Adds pre-parse validation in `quick_validate.py` to detect unquoted `description` fields containing `:`, preventing silent YAML truncation.  
**Discussion highlights:** Complements the eval fixes by catching skill metadata errors earlier in the authoring pipeline.

---

## 2. Community Demand Trends

From the most-commented issues, the community is pushing toward:

- **Security and trust boundary enforcement** — [#492](https://github.com/anthropics/skills/issues/492) raises that community skills distributed under the `anthropic/` namespace can impersonate official skills and abuse elevated permissions. This is the highest-attention issue in the repo.
- **Org-wide skill sharing and lifecycle management** — [#228](https://github.com/anthropics/skills/issues/228) demands direct org-level sharing instead of manual `.skill` file transfers. Relatedly, [#189](https://github.com/anthropics/skills/issues/189) flags duplicate skills across plugins.
- **Skill-creator tooling reliability** — The cluster of issues around `run_eval.py` ([#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169)) shows that the community cannot trust description-optimization loops until Windows and trigger-detection bugs are fixed.
- **Context-window efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487) reports a bundled `claude-api` skill injecting ~156k tokens in a single call. This points to demand for leaner, lazily-loaded skills.
- **Governance and safety patterns** — [#412](https://github.com/anthropics/skills/issues/412) proposes an `agent-governance` skill; [#1385](https://github.com/anthropics/skills/issues/1385) proposes a reasoning-quality-gate pipeline. The community wants skills that audit AI output before delivery.
- **Enterprise platform integrations** — PRs for ServiceNow ([#568](https://github.com/anthropics/skills/pull/568)) and SAP predictive analytics ([#181](https://github.com/anthropics/skills/pull/181)) indicate demand for domain-specific enterprise skills beyond generic coding/documentation.

---

## 3. High-Potential Pending Skills

These open PRs have active discussion and appear likely to land soon:

- **[#1298 — skill-creator eval reliability fix](https://github.com/anthropics/skills/pull/1298)**  
  Critical fix for the broken `run_eval.py` feedback loop; high demand because it unblocks all skill-description optimization.

- **[#514 — document-typography skill](https://github.com/anthropics/skills/pull/514)**  
  A small, universally useful quality-control skill for generated documents.

- **[#486 — ODT / OpenDocument skill](https://github.com/anthropics/skills/pull/486)**  
  Broad document-format coverage; likely to be merged as the office-format family grows.

- **[#723 — testing-patterns skill](https://github.com/anthropics/skills/pull/723)**  
  Covers testing philosophy, unit testing, React component testing, and more. Addresses a consistently requested area: automated test generation guidance.

- **[#525 — pyxel retro game development skill](https://github.com/anthropics/skills/pull/525)**  
  Integrates the Pyxel game engine via MCP; appeals to the creative/code community and showcases MCP-powered skills.

- **[#568 — ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)**  
  Broad enterprise coverage across ITSM, ITOM, SecOps, ITAM/SAM, and more. High potential for adoption in enterprise settings.

- **[#1367 — self-audit skill](https://github.com/anthropics/skills/pull/1367)**  
  Implements mechanical file verification plus a four-dimension reasoning audit. Aligns with the community’s strong interest in verification and safety.

- **[#1479 — plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)**  
  Addresses the lifecycle gap of accumulated planning artifacts; directly responds to a community-raised issue.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **trustworthy, well-tested skill infrastructure** — particularly fixing the skill-authoring/eval pipeline, preventing trust-boundary abuse, and keeping skills context-efficient — while expanding into practical document, enterprise, and verification use cases.

---

---

# Claude Code Community Digest — 2026-08-15

## Today’s Highlights

Two releases landed today: **v2.1.232** enables subagent forking by default and introduces `@`-mentions for other Claude sessions, while **v2.1.233** adds GitLab merge request support to `--worktree` and the agents view, plus optional identity forwarding for apps gateways. Community attention is concentrated on cost-impacting image-processing bugs, TUI input ergonomics, and a Windows Git Bash permission-prompt regression.

---

## Releases

- **v2.1.233** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.233)  
  - GitLab merge request URLs are now supported in the `--worktree` flag and the `claude agents` view, with MRs displayed as `!N`.  
  - Added opt-in `forward_user_identity` apps gateway setting for Anthropic upstreams to send the signed-in user’s identity as headers.

- **v2.1.232** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.232)  
  - Subagent forking is now on by default: `subagent_type: "fork"` inherits the full conversation and prompt cache.  
  - Non-teammate agent spawns in interactive sessions now run in the background by default.  
  - Type `@` in the prompt to mention and reference another Claude session by name.

---

## Hot Issues

1. **Image processing failures causing conversation token waste** — [#60334](https://github.com/anthropics/claude-code/issues/60334)  
   A closed bug with 73 comments and 19 👍. Users report images being removed from conversations while burning significant API window time, making it a high-cost reliability issue.

2. **Enter key sends message instead of inserting a new line** — [#2054](https://github.com/anthropics/claude-code/issues/2054)  
   The most-liked open issue at 147 👍. Especially painful for CJK users, where Enter is often used for composition and accidentally sends incomplete messages.

3. **Feature: Unarchive Claude Code sessions in desktop app** — [#30869](https://github.com/anthropics/claude-code/issues/30869)  
   57 👍 and 29 comments. Users want archived desktop sessions to be restorable, reflecting growing demand for stronger session lifecycle management.

4. **Analytics Admin API does not return subscription/OAuth users** — [#27780](https://github.com/anthropics/claude-code/issues/27780)  
   Admin/enterprise gap with 26 comments and 23 👍. Teams relying on usage analytics cannot see OAuth/subscription-based activity, causing reporting blind spots.

5. **MCP_TIMEOUT values longer than 60 seconds are ignored** — [#16837](https://github.com/anthropics/claude-code/issues/16837)  
   Reproducible Linux bug with 15 comments and 16 👍. Long-running MCP tools can be killed prematurely, breaking legitimate workflows.

6. **Apps gateway OTLP endpoint missing headers causes telemetry rejects** — [#82092](https://github.com/anthropics/claude-code/issues/82092)  
   Desktop telemetry flushes are rejected with `missing_token` because the gateway serves a bearer-gated OTLP endpoint but no `otlpHeaders`. Observed by 13 comments.

7. **Windows Git Bash: permission-prompt regression since 2.1.232** — [#86619](https://github.com/anthropics/claude-code/issues/86619)  
   New issue with 8 comments and 8 👍. Static analysis false-positives on read-only `cd`-compound commands trigger constant, unsuppressable permission prompts in Git Bash.

8. **Max 20x upgrade not reflected in weekly limits** — [#79773](https://github.com/anthropics/claude-code/issues/79773)  
   Users who upgraded to Max 20x report limits still deplete at the old Max 5x rate or worse. Directly impacts paid users’ capacity planning.

9. **VS Code extension: add Background Tasks panel** — [#75863](https://github.com/anthropics/claude-code/issues/75863)  
   Parity request with 8 👍. Desktop has background task visibility, but VS Code users are left without a dedicated panel.

10. **VS Code: long user prompt cannot be collapsed** — [#72707](https://github.com/anthropics/claude-code/issues/72707)  
   11 👍 despite 2 comments. A UI papercut that degrades conversation review in long sessions.

---

## Key PR Progress

Only 4 PRs were updated in the last 24 hours; all are listed below.

- **fix(security-guidance): preserve Python probe errors** — [#86746](https://github.com/anthropics/claude-code/pull/86746)  
  Fixes a silent failure path in `sg-python.sh` by preserving stderr from Python interpreter probes, improving diagnostics when all candidate interpreters fail.

- **feat: add shell completions (bash, zsh, fish)** — [#86626](https://github.com/anthropics/claude-code/pull/86626)  
  Adds tab-completion scripts for the `claude` CLI, including stock-macOS-bash compatibility. A strong quality-of-life contribution for daily CLI users.

- **Create pylint.yml** — [#83890](https://github.com/anthropics/claude-code/pull/83890)  
  Adds a pylint CI workflow. Small, but indicates growing community interest in Python-related code-quality tooling for the repo.

- **add the missing source to claude code** — [#41611](https://github.com/anthropics/claude-code/pull/41611)  
  Open since March; aims to document or wire in a missing source reference. Low activity, but still open and updated this cycle.

---

## Feature Request Trends

- **TUI input ergonomics** remain the loudest request: newline-on-Enter behavior ([#2054](https://github.com/anthropics/claude-code/issues/2054)) and better long-message collapse behavior ([#72707](https://github.com/anthropics/claude-code/issues/72707)).
- **Session management** is a recurring theme, including unarchiving desktop sessions ([#30869](https://github.com/anthropics/claude-code/issues/30869)) and cross-session mentions (`@` support, shipped in v2.1.232).
- **Editor parity with Desktop**: VS Code users want a Background Tasks panel ([#75863](https://github.com/anthropics/claude-code/issues/75863)), reflecting a broader expectation that all surfaces expose equivalent agent observability.
- **Deeper Git hosting integration** is clearly on the roadmap: GitLab MR support landed in v2.1.233, and community PRs continue exploring shell and CLI integration improvements.

---

## Developer Pain Points

- **Cost/token waste from media handling**: API image-processing failures burned a large share of a 5-hour window for one user ([#60334](https://github.com/anthropics/claude-code/issues/60334)).
- **Safety-policy false positives**: many closed reports from one user detail legitimate firmware analysis and reverse-engineering sessions being halted ([example](https://github.com/anthropics/claude-code/issues/71985)). This is a real trust issue for security-minded developers.
- **Configuration not honored**: `MCP_TIMEOUT` above 60s is ignored ([#16837](https://github.com/anthropics/claude-code/issues/16837)); OTLP telemetry is misconfigured in apps gateway ([#82092](https://github.com/anthropics/claude-code/issues/82092)).
- **Platform-specific regressions**: Windows Git Bash saw sudden permission prompts after 2.1.232 ([#86619](https://github.com/anthropics/claude-code/issues/86619)).
- **Entitlement/analytics gaps**: subscription/OAuth users missing from Analytics Admin API ([#27780](https://github.com/anthropics/claude-code/issues/27780)) and Max 20x limits not updating correctly ([#79773](https://github.com/anthropics/claude-code/issues/79773)).
- **Silent failures in automation**: workflow-backed PR review comment posting can report success while posting nothing ([#84474](https://github.com/anthropics/claude-code/issues/84474)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-15

## Today's Highlights

Windows desktop stability is the dominant theme today, with multiple reports of idle CPU busy loops, input lag, and process-cleanup storms following recent app updates. At the same time, the rust variant saw five rapid alpha releases (`0.148.0-alpha.14` through `.18`), and the project closed a broad batch of PRs focused on TUI startup hardening, Windows sandbox enforcement, and gRPC code-mode protocol fixes.

## Releases

Five rust-channel alpha releases were published in the last 24 hours. No release notes were included, so the rapid cadence likely indicates iterative stabilization work.

- [rust-v0.148.0-alpha.18](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.18)
- [rust-v0.148.0-alpha.17](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.17)
- [rust-v0.148.0-alpha.16](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.16)
- [rust-v0.148.0-alpha.15](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.15)
- [rust-v0.148.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14)

## Hot Issues

1. [Codex App frequently freezes/stutters on Windows 11 Pro despite sufficient system resources](https://github.com/openai/codex/issues/20214) — 100 comments, 84 👍  
   The most active issue by far. Users with ample CPU/RAM still see severe UI freezes, making the app effectively unusable on common Windows 11 configurations.

2. [Windows Desktop: unbounded taskkill.exe/conhost.exe cleanup storm exhausts WMI](https://github.com/openai/codex/issues/34260) — 35 comments, 11 👍  
   Hundreds of `taskkill.exe` processes spam `Win32_Process` queries, exhausting the WMI provider quota and degrading the whole system.

3. [Context compaction loses operational continuity in long Codex tasks](https://github.com/openai/codex/issues/29356) — 21 comments  
   Users report that compaction discards important recent context. The request to preserve the last 5 operational steps verbatim has support from long-task users.

4. [Codex Desktop causes intermittent system input lag on Windows](https://github.com/openai/codex/issues/28855) — 16 comments, 20 👍  
   Whole-system mouse/keyboard lag appears even with plugins disabled and clean logs, pointing to a deeper desktop-app issue.

5. [Android ChatGPT remote connection to Windows Codex stuck on “Waiting for desktop…”](https://github.com/openai/codex/issues/22733) — 16 comments, 19 👍  
   A significant remote-workflow blocker for ChatGPT Pro users trying to connect from Android.

6. [Windows sandbox: CreateProcessAsUserW fails when resolved shell is the MSIX build of pwsh](https://github.com/openai/codex/issues/35871) — 14 comments  
   Packaged PowerShell cannot launch under the sandbox’s restricted token, blocking users whose default shell is the Store version of PowerShell 7.

7. [Codex Windows idle main-process CPU busy loop in Chrome plugin app-server hashing](https://github.com/openai/codex/issues/38547) — 11 comments, 5 👍  
   A regression introduced in `26.810.4967` causes persistent high CPU while completely idle, even without Browser Use sessions.

8. [Windows 11 ChatGPT/Codex causes persistent mouse lag and ~10% CPU while idle](https://github.com/openai/codex/issues/38583) — 10 comments, 6 👍  
   Another idle-performance regression in the newest Windows build, with visible system-wide mouse stutter.

9. [Codex CLI 0.146.0: /backend-api/codex/responses/compact returns 404](https://github.com/openai/codex/issues/38323) — 5 comments  
   CLI users on `gpt-5.6-sol` cannot compact context because the endpoint returns `{"detail":"Not Found"}`.

10. [New Codex release very unstable and high CPU on Mac, crashes constantly; please revert](https://github.com/openai/codex/issues/38637) — 4 comments  
    A critical macOS arm64 regression: crashes after a few minutes, long chats are almost impossible to open, and CPU usage is high.

## Key PR Progress

1. [Resolve local JSON Schema refs in Code Mode types](https://github.com/openai/codex/pull/38664)  
   Fixes generated TypeScript declarations showing `unknown` for document-local `$ref` shapes.

2. [Enforce managed deny-read rules in the Windows sandbox](https://github.com/openai/codex/pull/38660)  
   Makes the sandbox fail closed when requested filesystem protection cannot be applied, rather than silently running without it.

3. [Canonicalize default namespaces in gRPC subscription filters](https://github.com/openai/codex/pull/38650)  
   Treats missing and empty namespaces as aliases for the `functions` namespace, improving matching correctness.

4. [Deliver gRPC code-mode notifications without truncation](https://github.com/openai/codex/pull/38645)  
   Removes the previous 1,024-byte limit and truncation suffix for gRPC code-mode notifications.

5. [Add an override to skip project configuration](https://github.com/openai/codex/pull/38647)  
   Adds `LoaderOverrides::ignore_project_config` to bypass project-root discovery while preserving session and cloud configuration.

6. [Keep the composer editable during TUI startup](https://github.com/openai/codex/pull/38642)  
   Shows a provisional composer so users can begin drafting prompts while initialization completes.

7. [Harden TUI startup input handling](https://github.com/openai/codex/pull/38641)  
   Prevents buffered keys or partial control sequences from accidentally selecting or confirming actions during bootstrap.

8. [Add MCP protocol discovery metrics](https://github.com/openai/codex/pull/38634)  
   Adds counters and duration tracking for MCP client protocol discovery, tagged by `legacy`/`auto` mode and outcome.

9. [Remove the gRPC code-mode open session limit](https://github.com/openai/codex/pull/38630)  
   Allows more than `MAX_IN_FLIGHT_REQUESTS` open sessions while keeping in-flight, control, and active-cell limits intact.

10. [Make Guardian v2 risk classification configurable](https://github.com/openai/codex/pull/38628)  
    Adds configuration for classifier instructions, review threshold, reasoning effort, token limits, and transcript controls.

## Feature Request Trends

- **Session/environment portability** is the clearest pattern: users want per-project and per-chat Windows/WSL execution environments ([#36098](https://github.com/openai/codex/issues/36098)), repository-aware sanitized task handoff across workspaces ([#34582](https://github.com/openai/codex/issues/34582)), and a `/cd` command to move a conversation into another working directory ([#38585](https://github.com/openai/codex/issues/38585)).
- **Local project integration**: users want the Chrome side panel to allow selecting a local Codex project when starting new chats ([#32610](https://github.com/openai/codex/issues/32610)).
- **Model/service parity**: GPT-5.6 Ultra reasoning should be available through Amazon Bedrock, not just native OpenAI paths ([#37160](https://github.com/openai/codex/issues/37160)).

## Developer Pain Points

- **Windows desktop performance regressions** dominate. Recurring issues include freezes, input lag, idle CPU busy loops, `taskkill.exe`/WMI storms, and unbounded SQLite log growth ([#20214](https://github.com/openai/codex/issues/20214), [#34260](https://github.com/openai/codex/issues/34260), [#28855](https://github.com/openai/codex/issues/28855), [#38547](https://github.com/openai/codex/issues/38547), [#35823](https://github.com/openai/codex/issues/35823)).
- **Context compaction is unreliable**: users lose reasoning and operational continuity, and CLI compaction can fail with a 404 ([#29356](https://github.com/openai/codex/issues/29356), [#31375](https://github.com/openai/codex/issues/31375), [#38323](https://github.com/openai/codex/issues/38323)).
- **Sandbox and execution-environment friction**: MSIX PowerShell access-denied failures, Computer Use `EPERM` on Windows, and missing per-project WSL/PowerShell selection all block real workflows ([#35871](https://github.com/openai/codex/issues/35871), [#38636](https://github.com/openai/codex/issues/38636), [#36098](https://github.com/openai/codex/issues/36098)).
- **Release stability** is a growing concern: users are explicitly asking to revert new builds due to crashes and high CPU on both Windows and macOS ([#38637](https://github.com/openai/codex/issues/38637), [#38583](https://github.com/openai/codex/issues/38583)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-15

## 1. Today's Highlights

The project shipped a new nightly (v0.56.0-nightly.20260814) with context-aware capacity-error retries and E2E test stabilization, while a batch of automated "[SSR Agent]" PRs landed fixes for seven issues—including the long-discussed subagent false-success bug (#22323). Developer attention remains concentrated on agent hangs (generalist agent, shell exec, TUI init) and on hardening the Auto Memory subsystem's privacy posture.

## 2. Releases

**v0.56.0-nightly.20260814.gc0d192452**
- test(e2e): stabilize file-system-interactive test on slow runners ([#28793](https://github.com/google-gemini/gemini-cli/pull/28793))
- fix(core): implement context-aware silent retries and availability TTL for capacity errors ([#28761](https://github.com/google-gemini/gemini-cli/pull/28761))

The capacity-error fix is the headliner: transient 429/overload conditions now get context-aware silent retries with availability TTLs instead of surfacing as hard failures.

## 3. Hot Issues

1. **#22323 — Subagent recovery after MAX_TURNS reported as GOAL success** — 12 comments, 2 👍. A `codebase_investigator` subagent reports `status: success` / `GOAL` even after hitting MAX_TURNS before doing any analysis, hiding interruptions from users. A fix landed today in [#28815](https://github.com/google-gemini/gemini-cli/pull/28815). [Issue](https://github.com/google-gemini/gemini-cli/issues/22323)
2. **#21409 — Generalist agent hangs** — 8 comments, 8 👍. P1: simple operations like folder creation hang indefinitely (up to an hour) when the CLI defers to the generalist agent; instructing the model not to delegate works around it. [Issue](https://github.com/google-gemini/gemini-cli/issues/21409)
3. **#25166 — Shell command stuck on "Waiting input" after completion** — 4 comments, 3 👍. P1: trivial CLI commands finish, but the TUI keeps showing them as active and awaiting input. [Issue](https://github.com/google-gemini/gemini-cli/issues/25166)
4. **#21983 — Browser subagent fails on Wayland** — 4 comments, 1 👍. P1 Wayland compatibility failure; browser agent exits with `GOAL` despite not completing the task. [Issue](https://github.com/google-gemini/gemini-cli/issues/21983)
5. **#26522 — Auto Memory retries low-signal sessions indefinitely** — 5 comments. Sessions skipped as low-signal are never marked processed, so the background extractor keeps re-surfacing them. [Issue](https://github.com/google-gemini/gemini-cli/issues/26522)
6. **#26525 — Deterministic redaction / reduce Auto Memory logging** — 4 comments. Privacy concern: transcripts are sent to the extraction model *before* redaction occurs, and skill content can appear in logs. [Issue](https://github.com/google-gemini/gemini-cli/issues/26525)
7. **#22093 — (Sub)agents running without permission since v0.33.0** — 3 comments. Agents mode is disabled in config, yet subagents (e.g., generalist) still execute—a consent regression that surprises users. [Issue](https://github.com/google-gemini/gemini-cli/issues/22093)
8. **#24246 — 400 error with >128 tools** — 3 comments. Large MCP/tool surfaces trigger API 400 errors; users expect dynamic tool scoping rather than hard limits. [Issue](https://github.com/google-gemini/gemini-cli/issues/24246)
9. **#21968 — Gemini doesn't use skills and sub-agents enough** — 6 comments. Anecdotal but recurring: custom skills (gradle, git) are ignored unless explicitly invoked, even for highly relevant tasks. [Issue](https://github.com/google-gemini/gemini-cli/issues/21968)
10. **#22186 — "get-shit-done" output hook causes crash** — 3 comments. P1: consistent crash while printing the final user summary. [Issue](https://github.com/google-gemini/gemini-cli/issues/22186)

Also notable: rate-limit issues [#1473](https://github.com/google-gemini/gemini-cli/issues/1473) and [#1474](https://github.com/google-gemini/gemini-cli/issues/1474) remain closed but actively updated—429s are a persistent community frustration.

## 4. Key PR Progress

Today's standout pattern: the "[SSR Agent]" batch by joneba-google closed seven issues in one pass, covering several P1/P2 reliability fixes.

1. **#28815 — Preserve original termination reason during subagent recovery** — Fixes #22323: MAX_TURNS/TIMEOUT interruptions no longer masquerade as GOAL success when the grace recovery turn calls `complete_task`. [PR](https://github.com/google-gemini/gemini-cli/pull/28815)
2. **#28812 — Prevent indefinite TUI hang with execution timeouts** — Fixes #21477: adds timeouts around `getProcessInfo()`/`execAsync` so bare Linux terminals don't hang at "Initializing...". [PR](https://github.com/google-gemini/gemini-cli/pull/28812)
3. **#28816 — Fix silent hang in MessageBus.request when publish fails** — Fixes #22588: floating `publish()` promise could hang requests for 60s; now rejects properly. [PR](https://github.com/google-gemini/gemini-cli/pull/28816)
4. **#28817 — Retain executing subagent tool calls in hook state** — Fixes #22589: first-seen subagent tool calls in `Executing` status were dropped before reaching the hook state. [PR](https://github.com/google-gemini/gemini-cli/pull/28817)
5. **#28738 — Allow agents to call agents** — Open, size/l, help wanted. Lets subagents delegate to other subagents or recurse via `tools:` frontmatter, fixing #22092. [PR](https://github.com/google-gemini/gemini-cli/pull/28738)
6. **#20916 — Prevent PTY file descriptor leak in ShellExecutionService** — Fixes #15945: PTY masters weren't closed after exit/kill, leading to system-wide PTY exhaustion on long sessions (macOS `ptmx_max` = 511). [PR](https://github.com/google-gemini/gemini-cli/pull/20916)
7. **#27154 — Prevent PTY memory leak by synchronously deleting active entries** — Companion fix: `activePtys.delete()` no longer waits on flaky background log-stream promises. [PR](https://github.com/google-gemini/gemini-cli/pull/27154)
8. **#28597 — Load environment variables before resolving settings placeholders** — Fixes load-order race where local `.env` wasn't populated during settings placeholder expansion. [PR](https://github.com/google-gemini/gemini-cli/pull/28597)
9. **#28603 — Upgrade sandbox Dockerfile to Node 22** — Security fix: removes EOL Node 20 (EOL 2026-04-30) from the sandbox runtime. [PR](https://github.com/google-gemini/gemini-cli/pull/28603)
10. **#25378 — Fix Windows ripgrep EFTYPE** — Open. Fixes `grep_search` failing with `spawn EFTYPE` on Windows when the downloaded binary architecture mismatches the host. [PR](https://github.com/google-gemini/gemini-cli/pull/25378)

Other notable merges: #28813 (composite tsconfig unbreaking root builds), #28819 (misleading enterprise-specific error for personal accounts), #28818 (steering evals now `ALWAYS_PASSES`), #28810 (correct `/clear` docs), #27588 (WSL2 clipboard image paste), and #28596 (`--list-all-sessions` to list sessions across workspaces).

## 5. Feature Request Trends

- **Agent-to-agent delegation** — Subagents calling other subagents or recursing (#28738, #22092) is the clearest forward direction, plus broader "use skills and subagents autonomously" pressure (#21968).
- **AST-aware codebase tooling** — Two EPICs (#22745, #22746) investigating AST-aware file reads, search, and mapping to reduce token noise and misaligned reads.
- **Observability & sharing** — Subagent trajectories exposed via `/chat share` (#22598) and included in `/bug` reports (#21763).
- **Agent self-awareness** — The model should accurately know its own CLI flags, hotkeys, and execution model (#21432).
- **Safety guardrails** — Discouraging destructive git/DB commands (#22672) and adding deterministic redaction for Auto Memory (#26525).
- **Browser agent resilience** — Automatic session takeover and lock recovery for persistent profiles (#22232).
- **Better session management** — Listing sessions across workspaces (#28596) and tracking tasks via native file tools (#21000).

## 6. Developer Pain Points

- **Hangs dominate** — Generalist agent hangs (#21409), shell exec stuck on "Waiting input" (#25166), TUI init hangs (#28812), and MessageBus 60s hangs (#28816). The common pattern is missing timeouts and unhandled async failures.
- **False success reporting** — Subagent interruptions reported as GOAL success (#22323) erode trust in agent output and downstream automation.
- **Permissions violations** — Subagents executing despite agents being disabled (#22093) is a consent/privacy regression.
- **Rate limits / 429s** — Recurring "rate limit for no good reason" complaints (#1473, #1474); the nightly's retry/TTL logic is a direct response.
- **Memory subsystem privacy** — Transcripts reaching model context before redaction, plus excessive logging (#26525, #26523).
- **Platform gaps** — Wayland browser failures (#21983), Windows ripgrep EFTYPE (#25378), WSL2 clipboard paste (#27588), and terminal corruption on resize/editor exit (#21924, #24935).
- **Scaling with tools** — 400 errors beyond ~128 tools (#24246) and workspace cleanup overhead from scattered tmp scripts (#23571).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI Community Digest — 2026-08-15

Source: [github/copilot-cli](https://github.com/github/copilot-cli)

### 1. Today’s Highlights
Copilot CLI shipped two releases — `v1.0.80` with model configuration updates and a quick-follow `v1.0.80-1` patch. The hottest topics remain MCP OAuth regressions and enterprise model catalog inconsistencies, while maintainers are busy migrating internal PR automation away from `pull_request_target`.

### 2. Releases
- **[v1.0.80](https://github.com/github/copilot-cli/releases/tag/v1.0.80)** — 2026-08-14: "Update model configurations"
- **[v1.0.80-1](https://github.com/github/copilot-cli/releases/tag/v1.0.80-1)** — 2026-08-14: "Fixes and changes"

No detailed changelog was provided for either release.

### 3. Hot Issues
1. **[#4480 — Atlassian MCP OAuth fails with RFC 8414 issuer mismatch on 1.0.79](https://github.com/github/copilot-cli/issues/4480)**  
   Closed regression: remote MCP OAuth discovery broke between 1.0.71 and 1.0.79. High community traction with 6 👍 indicates this affected many teams relying on Atlassian MCP servers.

2. **[#4490 — Atlassian MCP OAuth still broken in 1.0.80](https://github.com/github/copilot-cli/issues/4490)**  
   Fresh report that the same RFC 8414 authorization-server issuer mismatch persists in 1.0.80, meaning the fix in 1.0.80-1 may be incomplete or not yet effective.

3. **[#4439 — GitLab MCP OAuth metadata rejected with RFC 8414 issuer mismatch](https://github.com/github/copilot-cli/issues/4439)**  
   Self-managed GitLab MCP servers fail OAuth discovery, showing the MCP OAuth validation is too strict for legitimate enterprise setups.

4. **[#4390 — Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)**  
   Models explicitly enabled by a Copilot Business org, including Claude Sonnet 5/Opus 5 and Kimi K3, are absent from the CLI model catalogue. Enterprise admins cannot use models they’ve already approved.

5. **[#4422 — All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)**  
   Users with personal Enterprise accounts suddenly lose all Claude models despite settings showing them enabled. The issue persists across rollbacks, pointing to server-side policy/catalogue drift.

6. **[#4345 — Reasoning effort 'medium' unsupported for claude-haiku-4.5](https://github.com/github/copilot-cli/issues/4345)**  
   Server-side feature flags force `medium` reasoning effort, but the model rejects it. This creates repeated sub-agent execution failures and highlights configuration synchronization gaps.

7. **[#4346 — MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN](https://github.com/github/copilot-cli/issues/4346)**  
   In CI, the documented PAT-less `GITHUB_TOKEN` setup cannot fetch MCP registry policies, blocking all non-default MCP servers in GitHub Actions workflows.

8. **[#4488 — Plugin updates fail with "Access is denied" when other sessions are open](https://github.com/github/copilot-cli/issues/4488)**  
   File locks held by unrelated Copilot CLI or VS Code sessions block plugin updates. A workflow/ergonomics problem for users who keep multiple sessions open.

9. **[#4499 — Fatal "Committing semi space failed" OOM in autopilot](https://github.com/github/copilot-cli/issues/4499)**  
   Long-running autopilot session crashed with a V8 heap OOM despite heap usage being far below the limit — likely a host-RAM commit failure, not a heap exhaustion bug.

10. **[#4491 — /spawn template allows cross-session write without approval](https://github.com/github/copilot-cli/issues/4491)**  
    The `/spawn` prompt template contradicts its own singular-spawn contract and can inject context into an unrelated running session without an approval gate. Potentially destructive behavior.

### 4. Key PR Progress
Only three PRs were updated in the last 24 hours; all are automation/maintenance related.

1. **[#4497 — Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)**  
   Updates the trusted invalid-label writer to handle fork PR workflow runs where GitHub doesn’t populate the PR association. It searches using trusted workflow-run metadata and requires exactly one open PR.

2. **[#4496 — Temporary canary: verify pull request workflow migration](https://github.com/github/copilot-cli/pull/4496)**  
   A documentation-only canary PR used to validate the new fork-originated PR automation. Closed intentionally after workflow confirmation.

3. **[#4449 — Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)**  
   Replaces `pull_request_target` with more secure patterns: issue-scoped write tokens for closing invalid issues and a no-permission `pull_request` signal for mergeable PR handling. Security-hardening work for the repo’s own CI.

### 5. Feature Request Trends
- **Model and reasoning configurability**: Users want more granular control over model-specific parameters, such as [GPT-5.6 `reasoning.mode`](https://github.com/github/copilot-cli/issues/4495) and validated reasoning-effort values per model.
- **MCP protocol compliance**: Requests for proper MCP `tools/list` pagination ([#4006](https://github.com/github/copilot-cli/issues/4006)) and more lenient/compliant OAuth metadata handling are recurring themes.
- **Plugin dependency management**: [Marketplace plugin dependency specification](https://github.com/github/copilot-cli/issues/4487) is requested so plugins can declare and auto-install inter/intra-marketplace dependencies.
- **Telemetry interoperability**: [OTLP protobuf export support](https://github.com/github/copilot-cli/issues/2934) remains a desired feature for teams wanting standard OpenTelemetry integration.
- **Session state improvements**: Requests to preserve the active agent on session resume ([#4489](https://github.com/github/copilot-cli/issues/4489)) and avoid losing sessions/prompts on stop ([#4477](https://github.com/github/copilot-cli/issues/4477)) indicate growing demand for better session persistence.

### 6. Developer Pain Points
- **MCP OAuth regressions across releases**: Multiple issues report breaking changes between patches, forcing users to downgrade or abandon remote MCP servers.
- **Enterprise model enablement inconsistencies**: Models enabled in org settings regularly fail to appear or are blocked in the CLI, often requiring local cache/login resets ([#4494](https://github.com/github/copilot-cli/issues/4494)).
- **Session stability and state loss**: Autopilot OOMs, frozen subtasks, lost prompts on stop, and `/restart` failures in worktree sessions are eroding trust in long-running workflows.
- **Permission system friction**: Allowed directories are not honored for shell commands, and edit permission requests time out when users don’t respond immediately.
- **CI and automation blockers**: `GITHUB_TOKEN`-based MCP access is broken by 403 policy fetches, and plugin updates are blocked by file locks from parallel sessions.

Overall, the community is seeing rapid release cadence but also a pattern of regressions in MCP authentication and enterprise model catalog handling. The most critical fixing effort should focus on stabilizing OAuth flows and reconciling org-level model policy with the CLI’s local catalogue.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-15

## Today's Highlights

No new releases or pull requests landed in the last 24 hours. Community activity remains focused on persistent memory and cross-device session continuity: long-running memory-system requests (#1283, #1478) continue to attract discussion, while a remote-control handoff idea (#2269) is gaining attention. A closed Windows shell enhancement (#1136) also resurfaced, reminding maintainers of ongoing cross-platform tooling issues.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

Only four issues were updated in the last 24 hours, but they cover the community's most significant concerns:

- [**#1283 — Memory System: Persistent context across sessions**](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  This is the most active issue, with 39 comments. It requests both automatic and manual memory so Kimi Code CLI can retain project patterns, user preferences, and useful context across sessions. It clearly signals demand for a stateful, long-term coding assistant experience.

- [**#2269 — Remote Control / Multi-Device Session Handoff**](https://github.com/MoonshotAI/kimi-cli/issues/2269)  
  Requests the ability to start a CLI session on one device and seamlessly continue or remotely control it from another device, such as a laptop, web UI, or mobile. Still a smaller thread (6 comments, 1 👍), but it points to growing expectations around multi-environment workflows.

- [**#1478 — 能否优化记忆层？ / Can the memory layer be optimized?**](https://github.com/MoonshotAI/kimi-cli/issues/1478)  
  A developer reports that the current memory layer is painful for large projects and that no memory-related documentation exists beyond `agent.md`. They reference OpenClaw's `MEMORY.md` / `memory/` structure as a possible model. This highlights both a feature gap and a documentation gap.

- [**#1136 — feat(shell): enhance shell tool with version-aware PowerShell context**](https://github.com/MoonshotAI/kimi-cli/issues/1136)  
  A closed enhancement issue describing PowerShell-specific problems with shell command generation on Kimi K2.5 (SGLang). The discussion focuses on ambiguous shebang/command interpretation on Windows. This matters for the significant portion of the community using Kimi CLI in PowerShell environments.

## Key PR Progress

No pull requests were updated in the last 24 hours, so there is no PR progress to report.

## Feature Request Trends

Distilling all recently active issues:

- **Persistent memory system** — The strongest trend. Users want automatic + manual memory, cross-session project context, and a documented memory file layout similar to `MEMORY.md`.
- **Cross-device session continuity** — Users expect CLI sessions to be transferable between devices, including web and mobile.
- **Windows shell compatibility** — Requests to make the shell tool PowerShell-aware and to reduce ambiguity during command generation.

## Developer Pain Points

- **Large-project context loss**: The existing memory layer is considered insufficient, especially for big projects (#1478).
- **Missing memory documentation**: Users cannot find official guidance on how memory files should be organized or managed.
- **Device lock-in**: Sessions are tied to one device, which blocks users who move between desktop, laptop, and mobile environments.
- **Windows shell friction**: PowerShell-related command-generation ambiguity degrades agent performance, particularly on the first pass.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-15

## Today's Highlights

The dominant story is a critical 48-bit ID timestamp wraparound ([#42608](https://github.com/anomalyco/opencode/issues/42608)) that hit at `2026-08-14 12:39:55 UTC`, silently freezing all pre-existing sessions and triggering a wave of "agent stops responding" reports ([#42605](https://github.com/anomalyco/opencode/issues/42605), [#42594](https://github.com/anomalyco/opencode/issues/42594), [#42611](https://github.com/anomalyco/opencode/issues/42611)). On the feature side, a new PR ([#42660](https://github.com/anomalyco/opencode/pull/42660)) finally adds dynamic model discovery for custom OpenAI-compatible providers, closing six long-standing requests. A large batch of previously-closed PRs were also refreshed by the automated cleanup bot with fixes for session interruption, subagent queuing, and provider compatibility. No new releases shipped in the last 24 hours.

## Hot Issues

1. **[#42608](https://github.com/anomalyco/opencode/issues/42608) — 48-bit ID timestamp wraparound wedges all pre-existing sessions**  
   The highest-impact bug of the day: sessions created before `2026-08-14 12:39:55 UTC` silently stop processing prompts due to an overflow in `packages/opencode/src/id/id.ts`. Flagged as the likely root cause of the day's stalled-session spike. 3 👍.

2. **[#42605](https://github.com/anomalyco/opencode/issues/42605) — Session remains open but agent doesn't process subsequent prompts**  
   The agent finishes a task, asks the user a question, then ignores new messages. Probably a symptom of the wraparound bug above; closely mirrors reports in #42594 and #42611.

3. **[#36997](https://github.com/anomalyco/opencode/issues/36997) — Desktop App v1.18.1 new layout hides Plan/Build agent switcher**  
   `newLayoutDesigns: true` removes the agent-switching indicator entirely, so users can't see or toggle between Plan and Build mode. High-visibility UI regression with 6 👍 and 12 comments.

4. **[#4581](https://github.com/anomalyco/opencode/issues/4581) — Ollama Cloud AUTH Login**  
   Top-commented issue (14 comments). Users want to authenticate directly with Ollama Cloud instead of proxying through a local/server Ollama instance. Closed, but reflects sustained demand for first-class cloud-provider auth.

5. **[#25000](https://github.com/anomalyco/opencode/issues/25000) — DeepSeek V4 Pro via Zen Go fails multi-turn tool calls (`reasoning_content`)**  
   Intermittent "`reasoning_content` must be passed back to the API" errors on multi-turn tool use through `opencode.ai/zen/go/v1`; the thinking-mode field isn't being preserved correctly across turns.

6. **[#41518](https://github.com/anomalyco/opencode/issues/41518) — gpt-5.6-luna via OpenCode Go relay returns 403 region error**  
   Accessing `gpt-5.6-luna` through the OpenCode Go proxy fails with upstream HTTP 403 "not available in your region", even with valid credentials.

7. **[#38791](https://github.com/anomalyco/opencode/issues/38791) — Run loop never exits when message IDs aren't time-sortable**  
   `SessionPrompt.runLoop` compares message IDs as plain strings, which only works because native IDs embed timestamps. Sessions imported from third-party tools loop forever until the provider returns a 400.

8. **[#33966](https://github.com/anomalyco/opencode/issues/33966) — Make OAUTH_CALLBACK_HOST configurable**  
   PR #30022 bound the OAuth server to `127.0.0.1`; remote/container users need a configurable callback host to authenticate.

9. **[#27553](https://github.com/anomalyco/opencode/issues/27553) — Auto-discover models from OpenAI-compatible providers**  
   Long-standing request (4 👍) to query `/v1/models` from llama-swap, Ollama, or LM Studio instead of manually listing models in `opencode.json`. Directly addressed by new PR #42660.

10. **[#42626](https://github.com/anomalyco/opencode/issues/42626) — Bash tool subprocess killed with SIGKILL on streaming stdout**  
    Running `pytest tests/` in WSL (Ubuntu 24.04) kills the Bash subprocess when stdout streams many small writes — a blocker for test-driven workflows.

## Key PR Progress

1. **[#42656](https://github.com/anomalyco/opencode/pull/42656) — refactor(protocol): move worktree routes out of experimental namespace**  
   Promotes worktree APIs from `/api/experimental/project/:projectID/worktree` to a flat top-level resource (`/api/worktree/:projectID`), cleaning up the protocol surface.

2. **[#42660](https://github.com/anomalyco/opencode/pull/42660) — feat(provider): add dynamic model discovery for custom providers**  
   Closes #13891, #29308, #28999, #25624, #23327 & #26863. Auto-discovers models from OpenAI-compatible providers like LiteLLM and LM Studio — one of the most awaited features in the backlog.

3. **[#36869](https://github.com/anomalyco/opencode/pull/36869) — feat(opencode): per-tool execution timeout with abort + session recovery**  
   Adds configurable timeouts for built-in and MCP tools that can hang the agent loop indefinitely, with abort and session recovery. Related to #20096, #34888, #20216.

4. **[#36943](https://github.com/anomalyco/opencode/pull/36943) — fix(core): keep interrupted sessions stopped**  
   Prevents interrupted sessions from being woken by stale prompts by fencing advisory wakes behind their durable admission sequence, covering races with interrupt cleanup.

5. **[#36916](https://github.com/anomalyco/opencode/pull/36916) — fix: queue concurrent subagent questions**  
   Closes #36915. Pending questions from child subagents are now collected across the full session tree, ordered by request ID, and routed to the active request.

6. **[#36898](https://github.com/anomalyco/opencode/pull/36898) — fix(cli): handle descendant permission asks**  
   Closes #36868. Headless `opencode run` only answered permission requests from the root session, deadlocking when a Task child requested permissions.

7. **[#36883](https://github.com/anomalyco/opencode/pull/36883) — fix(core): expose valid subagent IDs to the model**  
   Closes #36761. The `subagent` tool schema now lists valid agent IDs, preventing models from guessing names like `explorer` instead of `explore`.

8. **[#36861](https://github.com/anomalyco/opencode/pull/36861) — fix(session): recover cache tokens from openai-compatible metadata**  
   Closes #30663. Reads cache-token usage from provider metadata (e.g. `prompt_tokens_details`) when custom baseURL providers don't populate standard usage fields.

9. **[#36860](https://github.com/anomalyco/opencode/pull/36860) — fix(opencode): strip MiniMax trailing tool_call leak suffix**  
   Closes #30684. Strips the artifact `]<\`]minimax[>[/<\`/tool_call>` that MiniMax models append to plain assistant text.

10. **[#36862](https://github.com/anomalyco/opencode/pull/36862) — fix(desktop): validate openExternal URLs by protocol**  
    Closes #30613. Restricts `shell.openExternal` to safe protocols, blocking dangerous schemes like `file://` and `javascript:`.

## Feature Request Trends

- **Dynamic model discovery & provider auto-configuration**: The most-upvoted long-term theme, led by [#27553](https://github.com/anomalyco/opencode/issues/27553) and now implemented in PR [#42660](https://github.com/anomalyco/opencode/pull/42660). Users want `/v1/models` auto-discovery for LiteLLM/Ollama/LM Studio instead of manual `opencode.json` entries.
- **Runtime permission controls**: Requests for an `/approve on|off` slash command ([#41909](https://github.com/anomalyco/opencode/issues/41909)) to toggle step-by-step approval at runtime, per-session — following on from plan-agent permission bypass bugs ([#24615](https://github.com/anomalyco/opencode/issues/24615)).
- **Auth & network configurability**: Making OAuth callback hosts configurable ([#33966](https://github.com/anomalyco/opencode/issues/33966)) and first-class Ollama Cloud authentication ([#4581](https://github.com/anomalyco/opencode/issues/4581)).
- **Local-LLM performance**: Preserving context caches across mode switches and compactions to avoid costly re-prompting with vLLM/Ollama ([#37489](https://github.com/anomalyco/opencode/issues/37489)).
- **Provider parity on OpenCode Go/Zen**: The `websearch` tool is missing on Go models unless an undocumented `OPENCODE_ENABLE_EXA=1` env var is set ([#40568](https://github.com/anomalyco/opencode/issues/40568)), plus model-specific tool failures for GLM ([#42616](https://github.com/anomalyco/opencode/issues/42616)) and Kimi ([#41120](https://github.com/anomalyco/opencode/issues/41120)).

## Developer Pain Points

- **Session freezes and stalls**: The ID wraparound ([#42608](https://github.com/anomalyco/opencode/issues/42608)) plus related "session not responding" reports ([#42605](https://github.com/anomalyco/opencode/issues/42605), [#42594](https://github.com/anomalyco/opencode/issues/42594), [#42611](https://github.com/anomalyco/opencode/issues/42611)) dominate the day's reports.
- **Provider protocol quirks**: A recurring theme of non-standard model fields — DeepSeek's `reasoning_content` ([#25000](https://github.com/anomalyco/opencode/issues/25000)), Kimi's invalid function names ([#41120](https://github.com/anomalyco/opencode/issues/41120)), GLM's `web_search` translation errors ([#42616](https://github.com/anomalyco/opencode/issues/42616)), MiniMax's tool-call suffix (PR #36860), and Cloudflare Workers AI mixed content types (PR #36850).
- **Quota/rate-limit confusion**: Free-tier users hitting 429s and `FreeUsageLimitError` well past the 24h window ([#42215](https://github.com/anomalyco/opencode/issues/42215), [#42385](https://github.com/anomalyco/opencode/issues/42385)), along with billing/credit complaints after payment ([#42606](https://github.com/anomalyco/opencode/issues/42606), [#42637](https://github.com/anomalyco/opencode/issues/42637)).
- **TUI responsiveness**: Typing delays and render-thread CPU spikes (97%) with 2–4 concurrent subagents ([#42657](https://github.com/anomalyco/opencode/issues/42657)).
- **Environment-specific breakage**: Desktop layout regression ([#36997](https://github.com/anomalyco/opencode/issues/36997)), WSL sidecar failure with mirrored networking ([#37718](https://github.com/anomalyco/opencode/issues/37718)), and SIGKILL on streaming Bash output ([#42626](https://github.com/anomalyco/opencode/issues/42626)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-15

## Today's Highlights
v0.84.2 shipped with fullscreen transcript search and configurable default tools, while the community's attention converged on Windows/WSL onboarding (a 27-comment support thread), a TUI performance bug pegging a full core during streaming, and a wave of provider-compatibility fixes. The PR pipeline is active with new providers (SiliconFlow, xAI via Responses), a truthful clipboard fix for TUI, and an experimental append-compaction mode.

## Releases
**v0.84.2** — [Release](https://github.com/earendil-works/pi/releases)
- **Fullscreen transcript search** — Search and navigate matches in fullscreen mode; see the [TUI Fullscreen Viewport docs](https://github.com/earendil-works/pi/blob/v0.84.2/packages/coding-agent/docs/keybindings.md#tui-fullscreen-viewport).
- **Configurable default tools** — Choose startup toolset via configuration.

## Hot Issues

1. **[#7547 — [Windows] How do you use Pi on Windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547)** *(open, 27 comments)*
   The community's largest thread. Maintainers are surveying Windows usage patterns to decide where to invest (docs, bug fixes, out-of-box experience) versus what to delegate to extensions. High signal for anyone shipping Windows support.

2. **[#6187 — Pi login hangs in WSL after browser-based GitHub Copilot device authorization](https://github.com/earendil-works/pi/issues/6187)** *(closed, 26 comments)*
   Device authorization succeeds in the browser, but the WSL client never detects completion and hangs. The high comment count reflects how common WSL + Copilot setups are; the fix is now closed.

3. **[#5223 — Anthropic provider modifies thinking blocks, causing 400 with Opus 4.8 adaptive thinking](https://github.com/earendil-works/pi/issues/5223)** *(closed, 17 comments, 6 👍)*
   Multi-turn conversations with Claude Opus 4.8 fail mid-session because `thinking`/`redacted_thinking` blocks in the latest assistant message are mutated. A sharp edge in adaptive-thinking round-trips; resolved in this window.

4. **[#6665 — TUI pins a full core while streaming: uncached Intl.Segmenter + per-chunk Markdown rebuild](https://github.com/earendil-works/pi/issues/6665)** *(open, in progress, 12 comments)*
   Long sessions drive ~100% CPU of one core during streaming (reproducible with `pi -ne`). Root cause: grapheme segmentation is uncached and every chunk triggers a full Markdown re-render. The in-progress status suggests a fix is imminent; this is likely the most impactful open performance bug.

5. **[#7850 — GitHub Copilot login fails with 429 for organizations with many activated models](https://github.com/earendil-works/pi/issues/7850)** *(closed, 9 comments, 7 👍)*
   Device auth succeeds but Copilot login rate-limits when an org has 20+ models. Affected enterprise users; a `no-action` close suggests the throttling is server-side, but the 7 👍 show real demand for a workaround.

6. **[#8096 — Z.AI Coding Plan defaults reference a removed model](https://github.com/earendil-works/pi/issues/8096)** *(closed, 5 comments)*
   `defaultModelPerProvider` still selects `glm-5.1`, but the models.dev-generated catalog now lists `glm-4.7`, `glm-5-turbo`, and `glm-5.2`. A classic stale-defaults bug that silently misroutes user traffic.

7. **[#8092 — Extension loader fails to resolve dependencies of pnpm-installed extensions (jiti + isolated node_modules)](https://github.com/earendil-works/pi/issues/8092)** *(closed, 5 comments)*
   pnpm's symlinked `.pnpm` layout breaks jiti's upward resolution, so extensions installed via npm fail to load. A real friction point for package-managed extension workflows; a PR (#8112) landed the same day.

8. **[#7761 — TUI copy shows "Copied!" but clipboard stays empty on VTE terminals](https://github.com/earendil-works/pi/issues/7761)** *(closed, 3 comments)*
   The TUI flashes "Copied!" after writing a bare OSC 52 sequence, but GNOME Terminal and other VTE terminals ignore it. Undermines trust in a core UX affordance; fixed by #8110.

9. **[#8036 — Edit tool crashes TUI when rendering a large diff during execution and session resume](https://github.com/earendil-works/pi/issues/8036)** *(open, 2 comments)*
   A successful `edit` that produced a ~14.5 MB diff (HTML files with very long lines) crashes the interactive TUI — immediately after the edit and again on session resume. Highlights the need for diff-size guards in the renderer.

10. **[#8125 — openai-codex: transient WebSocket failure pins session to SSE](https://github.com/earendil-works/pi/issues/8125)** *(closed, untriaged, 2 comments)*
    A momentary WS failure enables the session-scoped SSE fallback, and the session never returns to the warm WebSocket path — losing the cache benefits (`cacheRead=198144` seen before failure). A subtle but costly resiliency bug for heavy Codex users.

## Key PR Progress

1. **[#8143 — perf(tui): window fullscreen transcripts](https://github.com/earendil-works/pi/pull/8143)** *(closed)*
   Fullscreen sessions now preserve the complete human transcript (including pre-compaction history) while keeping model context compacted; the alternate-screen renderer measures exact block heights and renders only viewport-intersecting blocks. A meaningful performance and UX win for long sessions.

2. **[#8139 — feat(ai): add ChatGPT OAuth image generation](https://github.com/earendil-works/pi/pull/8139)** *(closed)*
   Adds a native ChatGPT image-generation transport to `@earendil-works/pi-ai`, reusing the OpenAI Codex OAuth and Responses infrastructure — image generation through ChatGPT entitlement without an API key.

3. **[#8124 — feat(ai): route xAI models through Responses and default to Grok 4.6](https://github.com/earendil-works/pi/pull/8124)** *(open)*
   Switches xAI from the completions API to the Responses API, sends the Pi user agent, and bumps the default model from Grok 4.5 to Grok 4.6.

4. **[#8120 — feat(coding-agent): add experimental append compaction](https://github.com/earendil-works/pi/pull/8120)** *(open)*
   With `PI_EXPERIMENTAL=1`, append mode reuses the active system prompt, tools, transformed context, and routing session so the compacted prefix can reuse provider prompt caches. Standalone compaction remains the default.

5. **[#8119 — fix: track Kimi cached tokens](https://github.com/earendil-works/pi/pull/8119)** *(open, addresses #8075)*
   Kimi reports cache hits as top-level `usage.cached_tokens`; Pi was counting them as normal input. Adds `cached_tokens` to `rawUsage` and applies it as cache-read input — correct cost/usage accounting for Kimi users.

6. **[#8112 — fix(coding-agent): realpath extension entries before jiti import](https://github.com/earendil-works/pi/pull/8112)** *(open, closes #8092)*
   Realpaths extension entries before handing them to jiti so pnpm's symlinked `.pnpm` layout resolves correctly. Direct fix for the extension-loader issue above.

7. **[#8110 — fix(tui): route selection copy through the host clipboard so "Copied!" is truthful](https://github.com/earendil-works/pi/pull/8110)** *(closed)*
   Replaces the bare OSC 52 write with a host-clipboard path; terminals that ignore OSC 52 (macOS Terminal.app, VTE-based terminals, tmux without passthrough) now get working copy feedback.

8. **[#8118 — feat(ai): add requiresNonNullAssistantContent compat flag](https://github.com/earendil-works/pi/pull/8118)** *(open)*
   Lets gateways that reject tool-call-only assistant messages with `content: null` receive `""` instead — a narrower escape hatch than the existing `requiresAssistantAfterToolResult`, which also injects extra assistant messages.

9. **[#8113 — feat(ai): add SiliconFlow provider](https://github.com/earendil-works/pi/pull/8113)** *(closed)*
   Adds SiliconFlow as a built-in OpenAI-compatible provider (`https://api.siliconflow.com/v1`, `SILICONFLOW_API_KEY`), following the existing moonshot/minimax provider patterns.

10. **[#8103 — feat(auth): make agent state file mode configurable via PI_AGENT_FILE_MODE](https://github.com/earendil-works/pi/pull/8103)** *(closed, closes #7779)*
    Adds an environment variable accepting an octal mode (e.g. `0660`) to override the hardcoded file permissions, enabling shared state files among multiple trusted Unix users in the same group.

## Feature Request Trends
- **Scriptability / CI-CD usage** — The strongest new request ([#8114](https://github.com/earendil-works/pi/issues/8114)): run Pi with *only* CLI args or env vars (no config file) for an OpenAI-completions endpoint. Expect growing pressure for headless-friendly invocation.
- **Per-model behavior** — Users want configuration to vary by model: per-model compaction profiles ([#8133](https://github.com/earendil-works/pi/issues/8133)) and atomic session-only model state for extensions ([#8100](https://github.com/earendil-works/pi/issues/8100)) both propose keyed/transactional model settings without changing global defaults.
- **Autocomplete UX** — Two requests target the prompt input: autocomplete skill names mid-prompt when typing `/` ([#8144](https://github.com/earendil-works/pi/issues/8144)) and a configurable autocomplete popup position ([#8132](https://github.com/earendil-works/pi/issues/8132)).
- **Provider breadth** — Continued demand for new backends: SiliconFlow (landed), xAI via Responses with Grok 4.6 (open), Anthropic Vertex ([#5262](https://github.com/earendil-works/pi/pull/5262)), and Amazon Bedrock Mantle ([#6216](https://github.com/earendil-works/pi/pull/6216)).

## Developer Pain Points
- **Windows/WSL friction** — The most-commented topic overall. Recurring issues: WSL login hangs after Copilot device auth ([#6187](https://github.com/earendil-works/pi/issues/6187)), Pi Server tests failing to bind Unix sockets on Windows ([#8047](https://github.com/earendil-works/pi/issues/8047)), and bash-tool compatibility on native Windows ([#8108](https://github.com/earendil-works/pi/issues/8108)). The flagship question ([#7547](https://github.com/earendil-works/pi/issues/7547)) is explicitly trying to triage this surface.
- **Provider compatibility whack-a-mole** — A steady stream of adapter bugs: mutated thinking blocks breaking Opus 4.8 ([#5223](https://github.com/earendil-works/pi/issues/5223)), `strict: null` making optional tool params required on gpt-5.6-sol ([#8105](https://github.com/earendil-works/pi/issues/8105)), `google-generative-ai` dropping custom `thinkingLevelMap` values ([#8135](https://github.com/earendil-works/pi/issues/8135)), and reasoning-only responses bypassing the retry policy ([#8115](https://github.com/earendil-works/pi/issues/8115)).
- **Copilot 429s for large orgs** — Two separate reports ([#7850](https://github.com/earendil-works/pi/issues/7850), [#8010](https://github.com/earendil-works/pi/issues/8010)) of login rate-limiting when organizations have many enabled models; logged out users got locked out entirely.
- **TUI trust issues** — Renderer reliability concerns: full-core streaming ([#6665](https://github.com/earendil-works/pi/issues/6665)), crashes on multi-MB diffs ([#8036](https://github.com/earendil-works/pi/issues/8036)), and lying "Copied!" feedback ([#7761](https://github.com/earendil-works/pi/issues/7761)).
- **Network/proxy edge cases** — Sessions silently degrade or stall: a plain-HTTP provider behind a forward proxy stops after the first tool call ([#8134](https://github.com/earendil-works/pi/issues/8134)), and a transient WebSocket failure permanently pins the session to SSE ([#8125](https://github.com/earendil-works/pi/issues/8125)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-15

## Today's Highlights

The v0.21.12 line is moving quickly: the stable release adds Web Shell workspace file uploads with progress tracking, while preview builds preserve standalone session targets and continue Web Shell upload support. Community attention remains on regressions around image loading and headless run stability, plus long-running efforts to bound daemon memory/resource usage and harden the autofix/review pipeline.

## Releases

- [v0.21.12](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12) — Stable release adding workspace file uploads to the Web Shell composer via drag-and-drop or the `@` file panel, with progress tracking ([#8874](https://github.com/QwenLM/qwen-code/pull/8874)). Also introduces a diff growth brake in autofix reviews.
- [v0.21.12-preview.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.4) / [v0.21.12-preview.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.3) — Include `fix(web-shell): preserve standalone session target` and `feat(web-shell): support workspace file uploads` ([#9038](https://github.com/QwenLM/qwen-code/pull/9038)).
- Nightly and end-to-end validation releases (`dsw-eas-tb-e2e-*`) were also published for SWE-bench Verified and Terminal-Bench 2.0 validation against `v0.21.2`.

## Hot Issues

- [#8957 [Regression] Qwen code crashes on image load since 0.21.2](https://github.com/QwenLM/qwen-code/issues/8957) — P2, open, 12 comments. A user-facing regression affecting image handling; maintainers are requesting more info/retesting. High community visibility.
- [#8678 fix(serve): Preserve the current session when a large restore times out](https://github.com/QwenLM/qwen-code/issues/8678) — P1, closed. Partially addressed and superseded after a long discussion about restore timeouts, late-result safety, and attachment identity fencing.
- [#8051 tracking(serve): Bound multi-workspace daemon resource usage](https://github.com/QwenLM/qwen-code/issues/8051) — P2, open, 9 comments. Count-only limits don't bound actual memory; request bodies, WebSocket assembly, and other buffers remain a concern for production `qwen serve`.
- [#4063 refactor: core + cli architecture review — 12 structural issues](https://github.com/QwenLM/qwen-code/issues/4063) — Open, 8 comments. Highlights `@google/genai` type coupling across 136 files and other core/CLI structural problems.
- [#9143 Main CI failed: E2E Tests on c5bf222474](https://github.com/QwenLM/qwen-code/issues/9143) — P3, open, 7 comments, `autofix/skip`. CI failure tracked per commit; indicates ongoing E2E instability.
- [#9002 SDK Python rejects permission_mode="auto" although the CLI supports it](https://github.com/QwenLM/qwen-code/issues/9002) — P3, open, 6 comments. SDK/CLI parity bug where client-side validation blocks a valid mode before reaching the CLI.
- [#6806 Status line context usage percentage does not refresh after /compress](https://github.com/QwenLM/qwen-code/issues/6806) — P2, open, 5 comments. UI state not updating after token compression; a welcome-PR candidate.
- [#8582 security: read-only shell classifier auto-approves command substitution hidden by line continuation or ${var@P}](https://github.com/QwenLM/qwen-code/issues/8582) — P1, closed. Security classifier bypass allowing arbitrary code execution; closed after fix.
- [#8871 [Bug] ACP child process fails with "Unknown argument: acp" in qwen serve mode](https://github.com/QwenLM/qwen-code/issues/8871) — P2, open, 5 comments. Causes token auth failures in serve mode; impacts ACP-based tooling.
- [#9026 NO_TOOL_RESULT_PROGRESS hard-fails headless runs when a model ends a turn quietly after a tool result](https://github.com/QwenLM/qwen-code/issues/9026) — P2, open, 4 comments. InvalidStreamError aborts legitimate headless runs; a corresponding fix PR is already up.

## Key PR Progress

- [#9127 feat: support session media references end-to-end](https://github.com/QwenLM/qwen-code/pull/9127) — Adds session-scoped media references across daemon, ACP bridge, TypeScript SDK, and Web Shell; images uploaded once and referenced by media ID.
- [#9196 fix(core): accept quiet post-tool-result completions after retry exhaustion](https://github.com/QwenLM/qwen-code/pull/9196) — Addresses the `NO_TOOL_RESULT_PROGRESS` guard for models that legitimately end a turn silently after a tool result.
- [#9122 feat(web-shell): improve sidebar session management](https://github.com/QwenLM/qwen-code/pull/9122) — Sessions now show details on hover, folder previews cap at five rows, and long titles fade/scroll based on overflow.
- [#9049 feat(channels): add DingTalk Workspace channel](https://github.com/QwenLM/qwen-code/pull/9049) — Adds built-in DingTalk Workspace support via existing authenticated CLI profiles.
- [#9171 fix(devx): fail with actionable message when unit-test build prerequisites are missing](https://github.com/QwenLM/qwen-code/pull/9171) — Adds a vitest `globalSetup` guard for CLI unit tests with a clear prerequisite message.
- [#9082 fix(ci): force-push release branch so retries replace failed attempts](https://github.com/QwenLM/qwen-code/pull/9082) — Fixes stale release branch blocks during release publish retries.
- [#9087 feat(web-shell): adopt canonical Goal v3 controls](https://github.com/QwenLM/qwen-code/pull/9087) — Goals can be created, edited, paused, resumed, replaced, and cleared directly in the WebShell composer without routing through the model.
- [#9027 feat(cli): plain-prose /review comments; severity markers follow review.attribution](https://github.com/QwenLM/qwen-code/pull/9027) — Makes review comments read naturally and splits posted text into phrasing vs. severity layers.
- [#8894 feat(review): capture-tui — rendering claims get pixels, not prose](https://github.com/QwenLM/qwen-code/pull/8894) — Adds `qwen review capture-tui`, driving code under review in a private tmux server to verify terminal-rendering claims.
- [#9175 fix(review): repair seven pipeline defects found by live runs](https://github.com/QwenLM/qwen-code/pull/9175) — Fixes structural and runtime defects in the review pipeline discovered during live PR reviews.

## Feature Request Trends

- **Web Shell / desktop expansion**: Workspace uploads, sidebar session improvements, Goal v3 controls, HTML export via `WebShellTranscript`, and a proposed isolated Electron desktop host ([#9186](https://github.com/QwenLM/qwen-code/issues/9186), [#9168](https://github.com/QwenLM/qwen-code/issues/9168)).
- **Channel/platform integrations**: Community continues to add new built-in channels, e.g. DingTalk Workspace ([#9049](https://github.com/QwenLM/qwen-code/pull/9049)), and requests better channel policy/session/workspace management ([#8845](https://github.com/QwenLM/qwen-code/issues/8845)).
- **Architecture cleanups**: Repeated asks to make `utils/` a leaf layer, decouple ACP from serve internals, and remove `@google/genai` type coupling ([#9146](https://github.com/QwenLM/qwen-code/issues/9146), [#8084](https://github.com/QwenLM/qwen-code/issues/8084), [#4063](https://github.com/QwenLM/qwen-code/issues/4063)).
- **Resource bounding and memory limits**: Users and maintainers want real byte-level bounds for daemon buffers, UI history, and multi-workspace sessions ([#8051](https://github.com/QwenLM/qwen-code/issues/8051), [#2128](https://github.com/QwenLM/qwen-code/issues/2128), [#9007](https://github.com/QwenLM/qwen-code/pull/9007)).
- **Automated review/autofix maturity**: Continued investment in review evidence quality, incremental anchors, convergence posture, and CI pipeline reliability ([#9176](https://github.com/QwenLM/qwen-code/issues/9176), [#9114](https://github.com/QwenLM/qwen-code/issues/9114), [#9100](https://github.com/QwenLM/qwen-code/pull/9100)).

## Developer Pain Points

- **CI/E2E flakiness**: Multiple automated CI failure issues opened by bot accounts, often before test results are available, slowing release confidence ([#9143](https://github.com/QwenLM/qwen-code/issues/9143), [#9160](https://github.com/QwenLM/qwen-code/issues/9160), [#9159](https://github.com/QwenLM/qwen-code/issues/9159)).
- **SDK/CLI inconsistency**: Python SDK rejects `permission_mode="auto"` while the CLI accepts it; settings like `tools.truncateToolOutputThreshold` are ignored by Shell ([#9002](https://github.com/QwenLM/qwen-code/issues/9002), [#8922](https://github.com/QwenLM/qwen-code/issues/8922)).
- **Security-sensitive shell handling**: Read-only shell classifier bypasses and ACP shell invocation failures are high-priority pain points ([#8582](https://github.com/QwenLM/qwen-code/issues/8582), [#8871](https://github.com/QwenLM/qwen-code/issues/8871)).
- **Memory growth in long sessions**: Unbounded UI history and daemon resource usage remain unresolved despite multiple tracking issues ([#2128](https://github.com/QwenLM/qwen-code/issues/2128), [#8051](https://github.com/QwenLM/qwen-code/issues/8051)).
- **Headless mode fragility**: Legitimate quiet completions after tool results are treated as errors, causing failed automated runs ([#9026](https://github.com/QwenLM/qwen-code/issues/9026), [#9196](https://github.com/QwenLM/qwen-code/pull/9196)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-15

## Today's Highlights
v0.9.8 shipped, officially rebranding the project as **CodeWhale** (Shannon Labs) and deprecating the legacy `deepseek-tui` npm package. Maintainers spent the day stabilizing `main` with two CI-red fixes (provider-count and reasoning-ladder assertion re-pins), while contributor EvanProgramming landed concurrency fixes for silent session-index data loss and a webhook panic. A P0 "web UI looks totally broken" issue (#5370) is the most urgent open concern.

## Releases
**v0.9.8** — Codewhale is the public product from Shannon Labs; the `codewhale` command, npm package, and release-asset names remain lowercase technical identifiers. The legacy npm package `deepseek-tui` is deprecated and receives no further releases. Users coming from v0.8.x legacy `deepseek` / `d…` (release notes truncated). Follow-up issue #5355 tracks known flakes carried into v0.9.8.

## Hot Issues
1. [#3192 Put it up for agentclientprotocol/registry](https://github.com/Hmbown/CodeWhale/issues/3192) — 13 comments. Community asks for CodeWhale to be listed in the agent client protocol registry to enable one-command Zed installs; signals growing demand for editor integrations.
2. [#1004 feat(commands): /dryrun — preview the next chat completion request](https://github.com/Hmbown/CodeWhale/issues/1004) — 9 comments. Requests inspecting the exact outgoing payload (system prompt, cached files, tools) before sending; a concrete cost for V4 Pro long-context users.
3. [#5324 Simplify the 32-field agent tool schema](https://github.com/Hmbown/CodeWhale/issues/5324) — 8 comments. Maintainer-acknowledged: one schema with zero required fields and 8 actions is causing model errors; spawns related PR #5369.
4. [#1482 nVidia NIM not work](https://github.com/Hmbown/CodeWhale/issues/1482) — 6 comments. 404 on API calls against NIM endpoints; long-running third-party integration bug, reported from legacy v0.8.29.
5. [#4785 Dead-code sweep: 464 #[allow(dead_code)] attributes](https://github.com/Hmbown/CodeWhale/issues/4785) — 6 comments. 143 files hide compiler drift; not user-facing but a prerequisite for safer refactors.
6. [#4326 Bound RSS after cancelling a 32-worker storm](https://github.com/Hmbown/CodeWhale/issues/4326) — 6 comments. Post-cancel RSS stays elevated; needs allocator high-water vs real leak distinction.
7. [#5293 Deny-by-default approval selection configurable](https://github.com/Hmbown/CodeWhale/issues/5293) — 5 comments, 1 👍. v0.9.4 changed the default highlighted option in permission dialogs; users can accidentally deny actions when intending to confirm.
8. [#5374 "The writing its weird" — agent text corruption](https://github.com/Hmbown/CodeWhale/issues/5374) — 4 comments. Rendered agent output is corrupted/unreadable on macOS.
9. [#5322 Output area doesn't fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322) — 3 comments. Regression from v0.8.65; transcript is capped at a max width, wasting space on wide displays.
10. [#5340 doctor permanently stuck on needs action after upgrade](https://github.com/Hmbown/CodeWhale/issues/5340) — 3 comments. v0.9.4→v0.9.6 upgrade leaves first-run/update checkpoint flagged forever, blocking setup completion.

**Watch also**: [#5370 P0: web UI looks broken — audit and rebuild](https://github.com/Hmbown/CodeWhale/issues/5370), reported directly by the maintainer.

## Key PR Progress
1. [#5382 fix(state): serialize session-index writes](https://github.com/Hmbown/CodeWhale/pull/5382) — fixes silent data loss under concurrent `StateStore` clones; index-file ops moved inside the mutex-guarded connection (closes #5380).
2. [#5381 fix(hooks): do not panic when webhook HTTP client fails](https://github.com/Hmbown/CodeWhale/pull/5381) — replaces the `.expect()` fallback with proper error propagation (closes #5379).
3. [#5358 feat(engine): auto-review denial rationale + turn circuit breaker](https://github.com/Hmbown/CodeWhale/pull/5358) — P0 slice of #5352; blocked actions now carry rationale instead of bare `permission_denied`, preventing re-phrase loops until budget exhaustion.
4. [#5353 feat(tui): model guardian tier for Auto-Review](https://github.com/Hmbown/CodeWhale/pull/5353) — two-layer review: deterministic floor stays non-bypassable, with fallback escalating to a one-shot model guardian (Codex/Kimi semantics).
5. [#5365 feat(provider): first-class local DS4 setup](https://github.com/Hmbown/CodeWhale/pull/5365) — DwarfStar as a keyless local DeepSeek route via prefilled loopback preset; no protocol adapter needed.
6. [#5369 fix(tools): degrade Moonshot schemas instead of refusing conditionals](https://github.com/Hmbown/CodeWhale/pull/5369) — schema-slice cleanup; prerequisite for the broader #5324 simplification.
7. [#5378 test(tui): re-pin the thinking-ladder assertions](https://github.com/Hmbown/CodeWhale/pull/5378) — fixes red `main` on macOS/Windows; nine stale tests, no production changes (closes #5377).
8. [#5384 test(cli): re-pin provider-count assertions](https://github.com/Hmbown/CodeWhale/pull/5384) — fixes red `main`; registry kinds 43→45 (closes #5383).
9. [#5364 feat(tui): render markdown blockquotes with a quote rail](https://github.com/Hmbown/CodeWhale/pull/5364) — user-visible TUI polish: nested quotes, inline formatting, wrapping, correct selection-copy.
10. [#5339 fix(engine): suppress child-owned shell completions](https://github.com/Hmbown/CodeWhale/pull/5339) — keeps background child completion events out of the parent model stream with regression coverage (closes #5325).

Also: five dependabot bumps — [rusqlite 0.40.2](https://github.com/Hmbown/CodeWhale/pull/5391), [rmcp 3.1.2](https://github.com/Hmbown/CodeWhale/pull/5390), [thiserror 2.0.20](https://github.com/Hmbown/CodeWhale/pull/5389), [ratatui 0.30.2](https://github.com/Hmbown/CodeWhale/pull/5388), [tower-http 0.7.0](https://github.com/Hmbown/CodeWhale/pull/5387).

## Feature Request Trends
- **Simplified third-party provider setup**: pre-built templates (Base URL + model lists), embedded docs, and a "test connection" button so users only fill in a key (#5350); NIM support brokenness feeds the same demand (#1482).
- **Plugin/marketplace ecosystem**: Kimi-level plugin system with federated marketplaces (#5311); registry listing for one-command Zed installs (#3192).
- **Preview before send**: `/dryrun` to inspect the exact chat-completion request without firing it (#1004).
- **Safer approval UX**: configurable default selection in permission dialogs (#5293).
- **Proactive update UX**: TUI startup update check + one-chord update-and-relaunch (#5053).

## Developer Pain Points
- **Red CI after releases**: stale test expectations — provider counts (#5383) and reasoning-ladder vocabulary (#5377) — broke `main` on all platforms post-v0.9.8; release gates aren't catching assertion drift.
- **Regression churn across v0.8→v0.9**: wide-terminal output capped (#5322), doctor state stuck after upgrade (#5340), approval default flipped (#5293).
- **Concurrency data-loss bugs**: unsynchronized `session_index.jsonl` writes (#5380); stale write-claims from closed sessions blocking new sub-agents (#5372).
- **Hard panics in edge paths**: webhook HTTP client fallback `.expect()` crashes the host (#5379).
- **Schema/model complexity**: 32-field agent schema with zero required fields causes model errors (#5324); 464 dead-code attributes hide compiler drift (#4785).

---
*Digest generated from github.com/Hmbown/DeepSeek-TUI (now shipped as Hmbown/CodeWhale) on 2026-08-15.*

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*