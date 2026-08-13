# AI CLI Tools Community Digest 2026-08-14

> Generated: 2026-08-13 23:00 UTC | Tools covered: 10

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
**Date:** 2026-08-14

---

## 1. Ecosystem Overview

The AI CLI tool landscape is in a rapid-hardening phase: momentum has shifted from headline feature launches toward reliability, session integrity, and sub-agent orchestration. Across all major tools, the dominant community complaints are false success signals, silent configuration overrides, session-state corruption, and platform-specific breakage (especially Windows). Documentation drift is a chronic issue even for mature tools like Claude Code, while MCP (Model Context Protocol) integration remains the most active cross-tool investment area — with OAuth flows, retry logic, and schema handling receiving concurrent fixes. Meanwhile, a quiet arms race is underway on evaluation infrastructure (Gemini CLI's nightly eval tooling, Qwen's quarantined SWE-bench pipeline) as vendors recognize that benchmark credibility is now a competitive differentiator.

---

## 2. Activity Comparison

*Table notes: Issue/PR counts reflect items **updated in the last 24h** as reported by each digest; all tools had 10 "hot issues" selected unless noted. Release status is for the same window.*

| Tool | Issues (hot/updated) | PRs (updated) | Releases (24h) | Release Velocity Signal |
|---|---|---|---|---|
| Claude Code | 10 (110👍 top issue) | 2 | v2.1.231 (patch) | Low PR velocity, high issue engagement |
| OpenAI Codex | 10 | 10 | 3 alpha builds | Very high, continuous Rust iteration |
| Gemini CLI | 10 | 10 | v0.56.0-nightly | High, eval-infra focused |
| GitHub Copilot CLI | 10 | 1 | v1.0.80-0 (patch) | Moderate; single PR window |
| Kimi Code CLI | 3 (all issues) | 0 | None | Stall — no PR or release activity |
| OpenCode | 10 | 10 | v1.18.18 (patch) | High; 10 PRs from one contributor |
| Pi | 10 | 13 | None | High PR velocity, no release cut |
| Qwen Code | 10 | 10 | v0.21.11 + v0.21.12-preview.1 | Very high; two releases + 10 PRs |
| DeepSeek TUI (CodeWhale) | 10 | 10 | v0.9.7 (CodeWhale rename) | High; rebrand + active cleanup |
| Grok Build | 0 | 0 | None | Dormant — no activity |

---

## 3. Shared Feature Directions

The following requirements appeared independently across **three or more** tool communities:

| Direction | Tools | Specific Needs |
|---|---|---|
| **Sub-agent reliability & transparency** | Gemini, Codex, Copilot, Qwen, DeepSeek | False "GOAL/success" status on MAX_TURNS (Gemini #22323), completed subagents restoring as active (Codex #37042), per-agent model overrides silently ignored (Copilot #4462), `/coordinate` multi-agent multi-turn flows (Qwen), agent session hangs on large inputs (DeepSeek #1425) |
| **Persistent memory systems** | Kimi, Claude Code, Gemini, OpenCode | Kimi's #1283 (38 comments) requests AI-managed + manual memory; Claude Code users demand memory not override explicit identity data (#52477); Gemini's Auto Memory has retry/redaction flaws; OpenCode added an `agent_memory` table + cloud sync PR |
| **MCP ecosystem maturity** | Claude Code, Codex, Copilot, Gemini, OpenCode, Qwen, DeepSeek | Pre-registered OAuth redirect-URI fixes (Claude Code), per-server OAuth callback ports (Codex #38448), remote MCP retry/backoff (Copilot, OpenCode), corrupt enablement configs broadening permissions (Gemini #28787), `nextCursor: null` rejects (DeepSeek #5336), MCP OAuth blocked in Web Shell (Qwen #9108) |
| **Windows & cross-platform parity** | Codex, Gemini, OpenCode, Qwen, Pi, DeepSeek, Claude Code | MSIX PowerShell sandbox access denied (Codex), Ctrl+V paste regression (Qwen #9061), WSL MCP command wrapping (OpenCode), Windows config path fragmentation (DeepSeek #2369), Dispatch stuck on Windows 11 (Claude Code), invalid JSON hiding as "bash not found" (Pi #7829) |
| **Session lifecycle integrity** | Copilot, Codex, Pi, Gemini, Qwen | Lost prompts on stop (Copilot #4477), NUL-byte/compaction corruption on resume (Codex), non-transactional JSONL persistence corrupting on ENOSPC (Pi #8052), multi-turn rollback on cancellation (Gemini #28801), restore timeout discarding sessions (Qwen #8678) |
| **Model behavior control** | Claude Code, Copilot, OpenCode, Pi | Verbose comment suppression (Claude Code #65961, 110👍), per-agent reasoning-effort frontmatter (Copilot #2904), model fallback chains after retry exhaustion (OpenCode #42424), runaway generation guards / 88k-token gibberish (Kimi #2597, Pi #6879) |

---

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach & Differentiators |
|---|---|---|---|
| **Claude Code** | Enterprise agent maturity; docs accuracy | Teams with strict governance | Most mature ecosystem; heavy documentation investment; MCP OAuth wins; but model behavior complaints (verbosity, memory bias) are its loudest signals |
| **OpenAI Codex** | Fast Rust rewrite; sandboxing | Developer-tool power users on Windows + Desktop | 3 alpha builds/day cadence; deep Windows sandbox engineering; security-hardening PRs (rustls fallback, managed network proxy); subagent state bugs still pervasive |
| **Gemini CLI** | Agent orchestration quality; eval rigor | CI/automation users & agent-heavy workflows | Nightly eval infrastructure; capacity-exhaustion retries for CI; subagent permission regressions under active repair; notable cross-vendor model support (Claude models PR) |
| **GitHub Copilot CLI** | GitHub-centric enterprise workflow | GitHub/Actions users; VS Code ecosystem | Tight GitHub Actions integration; agent configurability via frontmatter is hottest demand; session/event-store reliability gaps; MCP remote reliability emerging as major friction |
| **Kimi Code** | Minimal activity; reliability | Chinese-market developers | Effectively stalled this cycle; memory-system demand (38 comments) vs. critical streaming hang + runaway-generation bugs unanswered |
| **OpenCode** | Open-source extensibility; v2 transition | Plugin developers; self-hosters | 10-PR cleanup wave from one contributor; plugin/MCP/fallback reliability fixes; contested v2 layout migration; active security-disclosure cluster (install integrity, bash `--` bypass) |
| **Pi** | Terminal purity & performance | Frugal terminal users; long-session power users | Java-based TUI; obsessive terminal-state hygiene (SIGINT, scrollback floods, selection); performance budgeting under competitive pressure; provider-compat shims (Gemini schema fallback, Bedrock) |
| **Qwen Code** | Multi-agent coordination; benchmark rigor | Agent researchers; SWE-bench-driven teams | `/coordinate` fleet command shipped; SWE-bench runs quarantined (500/500 completed, 0 resolved) — unusual honesty; Vertex AI/Gemini compatibility gaps hurting adoption |
| **DeepSeek TUI (CodeWhale)** | Product rebrand; i18n | Chinese-speaking users; cost-sensitive | Rebrand to CodeWhale; model-facing schema simplification (32-field tool); Chinese IME/rendering fixes; NVIDIA NIM support; agent-hang issues |

---

## 5. Community Momentum & Maturity

**Rapid iteration (high PR velocity, multiple releases):** **OpenAI Codex** (3 alpha builds + 10 PRs) and **Qwen Code** (2 releases + 10 PRs) are the fastest movers. **OpenCode** and **Pi** show exceptional contributor energy (10–13 PRs/day) despite no stable release for Pi this cycle.

**Moderate, deliberate cadence:** **Claude Code** ships targeted patches but PR activity is unusually quiet (2 PRs, both trivial/CI). **Gemini CLI** continues steady nightly eval-driven progress. **Copilot CLI** is iterating carefully, with a single docs PR signaling a design direction (frontmatter `effort`) rather than code churn.

**Warning signs:** **Kimi Code** is the most concerning — zero PRs, zero releases, and three serious open reliability bugs (silent hangs, runaway 88k-token generation). **Grok Build** is dormant (no activity). **DeepSeek TUI** is actively rebranding and cleaning debt, but its unchanged hot issues (agent hangs, schema errors) suggest unresolved reliability debt.

**Community engagement leaders:** Claude Code has the highest single-issue engagement (110👍 on verbosity), Gemini has the most consistently high-engagement agent-reliability cluster, and Copilot's per-agent configuration issues are its strongest demand signal.

---

## 6. Trend Signals

1. **Sub-agent orchestration is the new frontier — and the new liability.** False success signals (Gemini #22323), model incompatibility with `multi_agent_v2` (Codex #34700), and silent model downgrades (Copilot #4462) show the industry is shipping multi-agent before it has reliable status reporting. Expect a wave of "agent observability" features (trajectories, per-agent logs, truthful termination codes) in the next quarter.

2. **Memory is the next battleground.** Every major tool either has (Claude Code, Gemini) or is being demanded to build (Kimi, OpenCode) persistent memory. But Gemini's redaction-before-model-context flaw (#26525) and Claude's pronoun-override bug (#52477) reveal the trust gap: memory must be deterministic, private, and un-silently-overridable before it can be trusted with critical context.

3. **MCP is becoming the universal integration fabric — and its rough edges are the top cross-tool pain.** OAuth redirect mismatches, per-server callback ports, retry/backoff semantics, and schema strictness are being fixed in parallel across seven tools. Interoperability standards for MCP auth (especially pre-registered OAuth clients) will be a defining ecosystem investment.

4. **Windows is the new Linux.** Seven of nine active tools had Windows-specific bugs in this single 24h window — from sandbox access-denied to paste regressions to config-path fragmentation. Vendors investing early in Windows parity (Codex's sandbox work, OpenCode's WSL wrapping) will capture a growing share of enterprise developers.

5. **Silent configuration overrides are a trust-breaking bug class.** Copilot's ignored model overrides, Gemini's subagents running while disabled, Claude Code's ignored verbosity instructions — users are signaling that *predictable* behavior beats *clever* behavior. Deterministic config enforcement is a competitive moat.

6. **Benchmark credibility is being weaponized.** Qwen quarantining its own SWE-bench run (500/500 completed, 0 resolved) and Gemini expanding behavioral evals to 76+ tests signals a shift from "scores as marketing" to "evals as engineering infrastructure." Developers should watch for eval transparency as a purchasing criterion.

7. **Security hardening is accelerating in response to community probing.** OpenCode's 4 security reports in 24h, DeepSeek's hook trust-boundary fixes, Qwen's Git worktree guards, and Gemini's A2A authentication enforcement all point to a broader industry response: the community is now actively red-teaming these tools, and vendors are starting to ship fixes within days rather than quarters.

---

*Report compiled from 2026-08-14 community digests for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code, OpenCode, Pi, Qwen Code, DeepSeek TUI, and Grok Build.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-08-14

Data source: [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking

The most-discussed PRs reflect heavy community attention on reliability, security, and quality tooling for Skills themselves.

1. **[skill-creator — run_eval.py fix PR #1298](https://github.com/anthropics/skills/pull/1298)**  
   Fixes the `run_eval.py` 0% recall bug that made description-optimization loops useless, plus Windows subprocess/pipe issues and parallel-worker fixes. Discussion ties directly to issues #556 and #1169.  
   **Status:** Open

2. **[document-typography PR #514](https://github.com/anthropics/skills/pull/514)**  
   Adds typographic quality control for AI-generated documents: orphan words, stranded section headers, and numbering misalignment. Addresses a class of document issues that affect nearly every generated file.  
   **Status:** Open

3. **[ODT skill PR #486](https://github.com/anthropics/skills/pull/486)**  
   New skill for creating, filling, reading, and converting OpenDocument files (ODT/ODS/ODF) and parsing ODT to HTML. Popular because LibreOffice/ISO-standard document support is a common enterprise gap.  
   **Status:** Open

4. **[frontend-design skill improvement PR #210](https://github.com/anthropics/skills/pull/210)**  
   Revisions to make frontend-design guidance more actionable and internally coherent, with emphasis on instructions Claude can actually follow in a single conversation.  
   **Status:** Open

5. **[self-audit skill PR #1367](https://github.com/anthropics/skills/pull/1367)**  
   Adds a universal output-audit skill: mechanical file verification followed by a four-dimension reasoning quality gate. Strong community interest in delivery-quality guarantees.  
   **Status:** Open

6. **[testing-patterns skill PR #723](https://github.com/anthropics/skills/pull/723)**  
   Comprehensive testing skill covering Testing Trophy philosophy, unit testing, React component testing, and test naming/edge-case practices.  
   **Status:** Open

7. **[ServiceNow platform skill PR #568](https://github.com/anthropics/skills/pull/568)**  
   Broad ServiceNow skill covering ITSM, ITOM, SecOps, ITAM/SAM, FSM, SPM, CSDM, and IntegrationHub. Active discussion continued through August 2026.  
   **Status:** Open

8. **[skill-quality-analyzer + skill-security-analyzer PR #83](https://github.com/anthropics/skills/pull/83)**  
   Two meta-skills for evaluating Claude Skills across structure, documentation, security, and quality dimensions. Directly addresses community concerns about Skill trustworthiness.  
   **Status:** Open

---

## 2. Community Demand Trends

The Issues tracker shows several clear demand directions:

- **Security and trust boundary enforcement** — Issue [#492](https://github.com/anthropics/skills/issues/492): Community skills distributed under the `anthropic/` namespace create impersonation and permission risks. Users want namespace validation and clearer provenance.
- **Skill lifecycle and org sharing** — Issue [#228](https://github.com/anthropics/skills/issues/228): Org-wide skill sharing is a repeated request, along with duplicate-skill cleanup [#189](https://github.com/anthropics/skills/issues/189) and recovery from disappearing skills [#62](https://github.com/anthropics/skills/issues/62).
- **Skill creation and evaluation tooling** — Issues [#556](https://github.com/anthropics/skills/issues/556) and [#1169](https://github.com/anthropics/skills/issues/1169): `run_eval.py` recall=0% bugs have made automated skill-description optimization unreliable. Issue [#202](https://github.com/anthropics/skills/issues/202) asks for skill-creator to become a true operational skill, not human documentation.
- **Agent memory and state management** — Issue [#1329](https://github.com/anthropics/skills/issues/1329): compact-memory skill proposal for symbolic notation of persistent agent state. Related governance/reasoning-gate proposals appear in [#412](https://github.com/anthropics/skills/issues/412) and [#1385](https://github.com/anthropics/skills/issues/1385).
- **Context-window efficiency** — Issue [#1487](https://github.com/anthropics/skills/issues/1487): The `claude-api` skill eagerly injects ~156k tokens, exhausting context in one call. Users want lazy loading and smaller, more focused skills.
- **Enterprise document interoperability** — Issues [#1175](https://github.com/anthropics/skills/issues/1175) and [#12](https://github.com/anthropics/skills/issues/12): SharePoint permission handling and docx corruption via whitespace reformatting show demand for robust document-engineering skills.

---

## 3. High-Potential Pending Skills

These open PRs have active discussion and are likely candidates to land soon:

- **[self-audit PR #1367](https://github.com/anthropics/skills/pull/1367)** — Mechanical verification plus reasoning quality gate; recently updated and directly addresses a high-demand quality-assurance gap.
- **[plan-file-hygiene PR #1479](https://github.com/anthropics/skills/pull/1479)** — Solves the lifecycle problem of accumulating planning artifacts; referenced by issue #1417.
- **[testing-patterns PR #723](https://github.com/anthropics/skills/pull/723)** — Broad and immediately useful; no technical blockers visible in the summary.
- **[document-typography PR #514](https://github.com/anthropics/skills/pull/514)** — Small, well-scoped, and relevant to every document-generation workflow.
- **[skill-quality-analyzer + skill-security-analyzer PR #83](https://github.com/anthropics/skills/pull/83)** — Meta-skills that align with the repo’s strongest security and quality concerns.
- **[ServiceNow PR #568](https://github.com/anthropics/skills/pull/568)** — Recently active (updated 2026-08-12) and valuable for enterprise ServiceNow users.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is not for any single domain skill, but for **meta-skills and tooling that make Skills themselves secure, valid, testable, and context-efficient** — trustworthy skill development is the clearest ecosystem priority.

---

# Claude Code Community Digest — 2026-08-14

## Today's Highlights
A single patch release (v2.1.231) lands a targeted fix for MCP OAuth sign-in failures affecting pre-registered OAuth clients like Slack — a meaningful reliability win for teams using remote MCP servers with Slack. Meanwhile, the issue tracker remains dominated by a large wave of closed documentation-drift reports (mostly filed by one contributor), while two model-behavior issues — verbose comments by default (#65961, 110 👍) and pronoun/memory bias (#52477) — stand out as the community's loudest concerns. PR activity is unusually quiet, with only two pull requests updated in the last 24 hours.

---

## Releases

### v2.1.231
- **Fixed:** MCP OAuth sign-in failing with a redirect URI mismatch for servers using a pre-registered OAuth client, such as Slack.
- **Impact:** Unblocks OAuth flows for popular MCP servers that ship fixed redirect URIs, where dynamic client registration isn't available.

---

## Hot Issues
*Top 10 noteworthy issues by community engagement and impact:*

1. **[#65961 — Claude verbose code comments by default, ignores instructions to stop](https://github.com/anthropics/claude-code/issues/65961)** *(OPEN, 11 comments, 👍 110)*
   The highest-reacted open issue. Users report Claude keeps generating excessively verbose comments even after explicit instructions to stop. The volume of upvotes signals widespread frustration with output style control.

2. **[#52477 — Claude overrode explicit pronouns in user memory and defaulted to male bias](https://github.com/anthropics/claude-code/issues/52477)** *(OPEN, 12 comments, 👍 4)*
   A serious model-behavior report: the model ignored explicit pronoun preferences stored in user memory. Raises concerns about memory reliability, identity handling, and bias defaults.

3. **[#67682 — Dispatch permanently stuck, never resets to QR pairing state on Windows 11](https://github.com/anthropics/claude-code/issues/67682)** *(OPEN, 5 comments)*
   Mobile↔desktop Dispatch pairing gets stuck in a broken state ("Can't reach your desktop" / "Asleep") with no way to reset to QR pairing. Platform-specific reliability bug affecting Windows 11 users.

4. **[#52601 — Settings docs still place `/config` preferences in `~/.claude.json` instead of `~/.claude/settings.json`](https://github.com/anthropics/claude-code/issues/52601)** *(CLOSED, 7 comments)*
   Incorrect documentation causing real config-path confusion. Representative of the broader docs-drift problem fixed in this batch.

5. **[#51376 — Worktree docs omit mid-session command behavior for `/tui` and `/update`](https://github.com/anthropics/claude-code/issues/51376)** *(CLOSED, 6 comments)*
   Users entering a worktree mid-session don't know what happens to their running session when invoking `/tui` or `/update`. Docs gap around a common parallel-session workflow.

6. **[#52203 — Auth docs omit `/login` behavior when `CLAUDE_CODE_OAUTH_TOKEN` is set](https://github.com/anthropics/claude-code/issues/52203)** *(CLOSED, 5 comments)*
   Unclear precedence between credential sources and the `/login` command. Matters for teams scripting auth or debugging token issues.

7. **[#53075 — Analytics docs should clarify telemetry opt-out effects on API and Enterprise usage metrics](https://github.com/anthropics/claude-code/issues/53075)** *(CLOSED, 5 comments)*
   Users can't tell whether opting out of telemetry hides their usage from Team/Enterprise dashboards. Important for compliance-sensitive organizations.

8. **[#52619 — MCP docs omit remote-header env-var expansion coverage for SSE/WebSocket](https://github.com/anthropics/claude-code/issues/52619)** *(CLOSED, 5 comments)*
   Missing documentation on how env-var expansion works for `headers` in remote MCP servers — a gap for custom-auth setups using SSE/WebSocket.

9. **[#54162 — Interactive mode docs omit overflow dialog scrolling controls](https://github.com/anthropics/claude-code/issues/54162)** *(CLOSED, 5 comments)*
   Keyboard shortcut documentation incomplete for overflowed dialogs in interactive mode — a UX docs gap affecting power users.

10. **[#53076 — Plugin marketplace docs missing unrecognized source format behavior](https://github.com/anthropics/claude-code/issues/53076)** *(CLOSED, 5 comments)*
   Docs don't explain what happens when a plugin marketplace source uses an unrecognized format, leaving users without troubleshooting guidance.

---

## Key PR Progress
*Only 2 pull requests were updated in the last 24 hours — the quietest PR window in recent memory:*

1. **[#86537 — Fix duplicated word in CHANGELOG.md](https://github.com/anthropics/claude-code/pull/86537)** *(OPEN)*
   Documentation-only typo fix: removes a duplicated "to to" in the CHANGELOG entry for `CLAUDE_BASH_NO_LOGIN`. Minor, but keeps release notes clean.

2. **[#60280 — chore(ci): SHA-pin remaining actions/checkout and actions/github-script](https://github.com/anthropics/claude-code/pull/60280)** *(CLOSED)*
   Supply-chain hardening follow-up to #56784: pins `actions/checkout@v4` and `actions/github-script` to exact SHAs across 6 CI workflows (auto-close-duplicates, backfill-duplicate-comments, claude-dedupe-issues, claude-issue-triage, and others). Good security hygiene for the repo's own CI.

*No feature PRs or bug-fix PRs landed in this window — the release noted above was the only functional change shipped.*

---

## Feature Request Trends
Distilled from the latest issue activity:

- **Documentation accuracy & completeness** — By far the dominant theme. ~25 stale/incorrect docs issues were closed in this batch, nearly all filed by the same contributor (`coygeek`), covering settings paths, MCP auth flows, plugin marketplaces, hooks, agent SDK, Vim mode, and environment variables. The maintainers appear to be systematically clearing this backlog.
- **Output control / style adherence** — The 110👍 on #65961 shows strong demand for reliable control over comment verbosity and coding style, beyond prompt-level instructions.
- **Memory reliability & neutrality** — #52477 highlights expectations that user memory (especially identity/pronoun data) is respected deterministically, without model bias overriding explicit preferences.
- **MCP ecosystem polish** — Multiple issues (release fix plus docs around OAuth, remote headers, custom auth) underscore MCP as a priority integration surface needing both code and doc maturity.
- **Cross-platform desktop reliability** — Dispatch/QR pairing failures on Windows 11 point to demand for more robust mobile-desktop session continuity.

---

## Developer Pain Points
Recurring frustrations visible across the last 24h of issue activity:

- **Documentation drift vs. actual behavior** — A long tail of stale docs (wrong config paths, missing env-var behavior, outdated file locations) forces developers to reverse-engineer real behavior. The volume of `stale`-labeled docs issues suggests this has been a chronic problem.
- **Model ignoring explicit instructions** — High engagement on verbose-comment complaints indicates users feel they must fight the model's default behavior even with clear, repeated instruction.
- **Memory/identity trust** — The pronoun-override report is a trust-breaking bug class: if explicit memory can be silently overridden, users can't rely on memory for other critical context.
- **MCP OAuth friction** — Redirect URI mismatches (fixed in v2.1.231) and undocumented auth-recovery flows make remote MCP servers painful to configure, especially with pre-registered OAuth clients.
- **Windows-specific reliability gaps** — Dispatch stuck states with no recovery path on Windows 11 echo a broader pattern of platform-specific bugs needing attention.
- **Config path confusion** — Contradictory docs about `~/.claude.json` vs `~/.claude/settings.json` is the kind of ambiguity that wastes time and causes misconfigured setups.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-14

OpenAI Codex shipped three rapid-fire Rust alpha builds today, though without detailed release notes. The issue tracker is dominated this week by Windows sandbox failures and subagent session rehydration bugs, while the PR queue focuses on MCP OAuth flexibility, context-compaction correctness, and Guardian V2 safety context. Community demand remains strong for TUI/editor parity, especially Vim improvements and Markdown math rendering.

## Releases

Three new pre-release builds were cut in the last 24 hours:

- [rust-v0.148.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.13)
- [rust-v0.148.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.12)
- [rust-v0.148.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.11)

No changelog content was included in the data source; these appear to be routine alpha iterations of the Rust-based Codex client.

## Hot Issues

Top noteworthy issues updated in the last 24 hours:

- [openai/codex#19909](https://github.com/openai/codex/issues/19909) — **Feature request: make the “Chats” project directory configurable.** Users do not want Codex App storing chat data in `~/Documents/Codex` because iCloud Drive sync is inappropriate for coding data. Strong demand: 17 comments, 35 👍.
- [openai/codex#35871](https://github.com/openai/codex/issues/35871) — **Windows sandbox fails when resolved shell is MSIX PowerShell.** `CreateProcessAsUserW failed: 5 (Access is denied.)` occurs because the restricted sandbox token cannot launch packaged Store builds of `pwsh`. 13 comments.
- [openai/codex#34700](https://github.com/openai/codex/issues/34700) — **`spawn_agent` rejects `gpt-5.6-luna` with `multi_agent_v2` enabled.** Windows App and CLI users cannot use newer models as subagents. High visibility: 15 comments, 36 👍.
- [openai/codex#35210](https://github.com/openai/codex/issues/35210) — **`browser.tabs.finalize()` silently terminates the entire Codex Desktop app.** A single browser plugin call can kill the Windows app instead of returning an error. 12 comments.
- [openai/codex#31198](https://github.com/openai/codex/issues/31198) — **Subagent session logs grow to 145 GiB from repeated compacted `replacement_history`.** Desktop persists full snapshots repeatedly inside rollout JSONL files, causing massive disk usage. 6 comments.
- [openai/codex#36523](https://github.com/openai/codex/issues/36523) — **[P0] macOS app OOM-crashes at startup.** `external-agent-import` parses 1.73 GB from Claude Desktop’s app-support directory on every launch, causing V8 heap OOM and 26 crashes in 26 hours. 6 comments.
- [openai/codex#21850](https://github.com/openai/codex/issues/21850) — **TUI Vim mode: allow starting in Insert mode by default.** Users want an option to start in Insert mode while still using `Esc` for Normal mode. 6 comments, 20 👍.
- [openai/codex#37042](https://github.com/openai/codex/issues/37042) — **Completed subagents restore as Active after reload.** Windows Desktop rehydrates finished child agents as live after task reload; related to the broader subagent-state bug cluster. 6 comments.
- [openai/codex#38405](https://github.com/openai/codex/issues/38405) — **GitHub review connector quota failure leaves exact-head security reviews blocked.** When Codex usage limits are hit, required security reviews stay blocked without retry guidance or fallback options. 3 comments.
- [openai/codex#34934](https://github.com/openai/codex/issues/34934) — **Desktop sign-in routes verified accounts to phone enrollment instead of MFA challenge.** The desktop client asks for phone enrollment even when a verified SMS factor exists, while the web flow succeeds. 3 comments, 3 👍.

## Key PR Progress

Important pull requests updated in the last 24 hours:

- [openai/codex#38449](https://github.com/openai/codex/pull/38449) — **Expose model upgrade retirement times.** Parses optional `retirement_at` metadata from model upgrade info and exposes it as nullable Unix timestamps, enabling sunset-aware tooling.
- [openai/codex#38448](https://github.com/openai/codex/pull/38448) — **Support per-server MCP OAuth callback ports.** Adds `oauth.callback_port` config and accepts plugin/skill-level `callbackPort`, preventing port collisions between MCP servers.
- [openai/codex#38447](https://github.com/openai/codex/pull/38447) — **Add running-task exit choices to local daemon sessions.** Ctrl-C with an empty composer now offers: cancel task and stay, exit while leaving task running, or stop the task.
- [openai/codex#38445](https://github.com/openai/codex/pull/38445) — **Retain client developer messages across context compaction.** When `retain_client_developer_messages` is enabled, client-authored developer instructions survive compaction.
- [openai/codex#38441](https://github.com/openai/codex/pull/38441) — **Give Guardian V2 full tool action context.** Exposes the original pre-hook `ToolPayload` to lifecycle contributors, so risk assessment sees the actual action, not just tool name and call ID.
- [openai/codex#38440](https://github.com/openai/codex/pull/38440) — **Add app-server support for reverting paginated threads.** Adds experimental `thread/revert` to replace durable history with the prefix before `beforeTurnId` while preserving thread identity.
- [openai/codex#31901](https://github.com/openai/codex/pull/31901) — **Resolve local MCP `$ref`s in Code Mode tool schemas.** Supports JSON Pointer resolution for `#/$defs/...` and `#/definitions/...`, including escaped path segments.
- [openai/codex#31453](https://github.com/openai/codex/pull/31453) — **exec-server: start managed network proxy on executor.** Sends sanitized managed-network policy to remote executors and starts HTTP/SOCKS proxy listeners, failing closed for MITM/credential-injection configurations.
- [openai/codex#38436](https://github.com/openai/codex/pull/38436) — **Add rustls fallback for local MCP HTTP requests.** Retries replayable local MCP requests with rustls after platform TLS negotiation failures.
- [openai/codex#38420](https://github.com/openai/codex/pull/38420) — **Recover capability discovery after executor disconnects.** Replays capability discovery once the executor reconnects, preventing stale cached failures for the rest of a thread.

## Feature Request Trends

- **Configurable local storage:** Users want control over where Codex stores chats, sessions, and plugin caches. [`~/Documents/Codex` is a particular pain point](https://github.com/openai/codex/issues/19909), especially when iCloud Drive syncs it.
- **TUI/editor parity:** Recurring requests include [Markdown math rendering](https://github.com/openai/codex/issues/18906), [Vim-mode improvements](https://github.com/openai/codex/issues/21850) such as [change operations](https://github.com/openai/codex/issues/32745) and [missing keybindings](https://github.com/openai/codex/issues/33296), and [copying a specific assistant response via `/copy`](https://github.com/openai/codex/issues/24073).
- **MCP and remote auth flexibility:** Issues and PRs point toward better remote MCP auth metadata handling and per-server OAuth callback configuration ([#15643](https://github.com/openai/codex/issues/15643), [#38448](https://github.com/openai/codex/pull/38448)).
- **Desktop session organization:** Requests for [collapse-all controls](https://github.com/openai/codex/issues/34452), stable subagent state, and [thread revert support](https://github.com/openai/codex/pull/38440) show demand for stronger session lifecycle management.

## Developer Pain Points

- **Windows sandbox and setup reliability is the largest recurring cluster.** Multiple issues describe broken sandbox helper resolution: [clean install missing `codex-windows-sandbox-setup.exe`](https://github.com/openai/codex/issues/30829), [standalone launcher missing helpers](https://github.com/openai/codex/issues/28457), [auto-upgrade installing a broken launcher](https://github.com/openai/codex/issues/38039), [MSIX PowerShell access denied](https://github.com/openai/codex/issues/35871), and [mapped-drive workspace failures](https://github.com/openai/codex/issues/19599).
- **Subagent/session state corruption is a top frustration.** Completed subagents restore as active or working after restart ([#37563](https://github.com/openai/codex/issues/37563), [#37042](https://github.com/openai/codex/issues/37042)), session resume can fail due to [NUL bytes in persisted function calls](https://github.com/openai/codex/issues/24369) or [compaction 404s](https://github.com/openai/codex/issues/38323), and [log growth can reach 145 GiB](https://github.com/openai/codex/issues/31198).
- **Model/subagent compatibility confusion:** Models such as `gpt-5.6-luna` are [rejected or reported as unknown](https://github.com/openai/codex/issues/34700) in different Codex surfaces, especially with `multi_agent_v2` enabled.
- **Startup and performance regressions:** [macOS OOM crashes from `external-agent-import`](https://github.com/openai/codex/issues/36523), [Windows mouse stutter](https://github.com/openai/codex/issues/33074), and [app-killing browser plugin behavior](https://github.com/openai/codex/issues/35210) are all actively discussed with high community engagement.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-14

## Today's Highlights

The project shipped nightly **v0.56.0** focused on evaluation infrastructure, while the PR queue saw major stability wins: context-aware retries for capacity errors ([#28790](https://github.com/google-gemini/gemini-cli/pull/28790)), full multi-turn rollback on cancellation ([#28801](https://github.com/google-gemini/gemini-cli/pull/28801)), and support for Claude Sonnet 4.5 / Opus 4.8 models ([#28803](https://github.com/google-gemini/gemini-cli/pull/28803)). Agent reliability remains the community's top pain point, with highest-engagement issues around subagents hanging, misreporting failures, and trust/permission regressions.

## Releases

**v0.56.0-nightly.20260813.g1ac337739** — Eval-infrastructure nightly:
- `Feat/eval validate` by @ved015 ([PR #28344](https://github.com/google-gemini/gemini-cli/pull/28344))
- `feat(evals)`: add tool call formatter and integrate failure summaries by @ved015 ([PR #28305](https://github.com/google-gemini/gemini-cli/pull/28305))
- Changelog for v0.55.1

No stable release in the last 24 hours; this nightly deepens the behavioral-eval tooling that underpins recent agent-quality work.

## Hot Issues

1. **[#22323 — Subagent MAX_TURNS recovery reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (p1, 12 comments) — The most-discussed issue: `codebase_investigator` reports `status: "success"` even when it hit the turn limit before doing any analysis. Misleading termination reports undermine trust in agent results and complicate debugging.

2. **[#21409 — Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** (p1, 8 👍) — Highest community engagement. Simple operations like folder creation hang indefinitely when deferring to the generalist agent; users wait up to an hour before cancelling. Workaround: explicitly disable sub-agent delegation.

3. **[#25166 — Shell command stuck on "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** (p1, 3 👍) — Even trivial, non-interactive commands leave the shell session wedged in an "awaiting input" state. Frequent enough to be a daily workflow blocker for affected users.

4. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (p1) — Browser agent terminates with `GOAL` while actually failing in Wayland environments. Pairs with #22323 as evidence of unreliable success signaling.

5. **[#21763 — /bug report lacks subagent context](https://github.com/google-gemini/gemini-cli/issues/21763)** (p1) — Bug reports capture only the main session, omitting what happened inside subagents. Makes maintainer triage of agent issues significantly harder.

6. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (p2) — Sessions the extraction agent deems low-signal are never marked processed, so they resurface repeatedly — wasted tokens and background work.

7. **[#26525 — Auto Memory logs and redacts secrets only after model context](https://github.com/google-gemini/gemini-cli/issues/26525)** (p2, security) — Transcript content is sent to the model before redaction instructions run, and logging can expose skill contents. A privacy-relevant concern for teams using Auto Memory on sensitive repos.

8. **[#24246 — 400 error with more than 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** (p2) — Users with many MCP servers hit hard request failures; expectation is the agent should scope tools intelligently rather than exceed API limits.

9. **[#22093 — Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** (p2) — A trust regression: subagents activate even when agent modes are disabled in config. Highlights the need for permission-model regression tests.

10. **[#28805 — Request: rename sessions in Session Browser](https://github.com/google-gemini/gemini-cli/issues/28805)** (p3, new) — Fresh community UX request: sessions are only identified by first-prompt text; users want customizable names for easier navigation.

## Key PR Progress

1. **[#28790 — Context-aware silent retries and availability TTL for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)** (merged) — Closes the critical capacity-exhaustion retry regression (#28761). Unattended/non-interactive runs now back off and retry automatically, which is essential for CI usage.

2. **[#28801 — Rollback entire multi-turn request on cancellation/abort](https://github.com/google-gemini/gemini-cli/pull/28801)** (merged) — Prevents aborted tool-call turns from leaving chat history in an un-responded, corrupted state that breaks subsequent user messages.

3. **[#28803 — Claude Sonnet 4.5 and Opus 4.8 model definitions](https://github.com/google-gemini/gemini-cli/pull/28803)** (merged) — Adds model constants, alias resolution, policy chain fallbacks, and display configs — a notable expansion of model choice beyond Gemini-only defaults.

4. **[#28699 — Enforce authentication and stop checkpoint path traversal in A2A server](https://github.com/google-gemini/gemini-cli/pull/28699)** — Security fix: custom REST routes bypass `UserBuilder` entirely, accepting unauthenticated requests, and checkpoint paths lack traversal protection.

5. **[#28678 — Prevent OAuth callback timeout leak and release resources](https://github.com/google-gemini/gemini-cli/pull/28678)** — Fixes #28652 by centralizing callback-server settlement and cleanup, removing stale timeout callbacks and memory leaks.

6. **[#28787 — Don't treat corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)** — A JSON parse failure was silently collapsed into `{}`, which defaults every MCP server to enabled. Now surfaces corruption instead of silently broadening permissions.

7. **[#28624 — Prevent boolean thought parts leaking as `[Thought: true]` text](https://github.com/google-gemini/gemini-cli/pull/28624)** — Fixes #23525: internal boolean thought fields were contaminating visible model output.

8. **[#28586 — Preserve `thoughtSignature` in functionCall parts to fix 400 error](https://github.com/google-gemini/gemini-cli/pull/28586)** — Fixes a regression from v0.53.0 causing 400 Bad Request during parallel tool calls; restores the stripped signature field.

9. **[#28789 — Resolve vscode-ide-companion `stop()` hang and keep-alive leak](https://github.com/google-gemini/gemini-cli/pull/28789)** — Fixes two stability bugs: `IdeServer.stop()` hangs with open MCP streaming sessions, and intermittent keep-alive ping failures leak resources.

10. **[#28804 — Behavioral evals expansion](https://github.com/google-gemini/gemini-cli/pull/28804)** — Adds evals for `read_many_files`, `get_internal_docs`, and MCP resource discovery/reading, continuing the eval-hardening push visible in today's release.

> **Maintainer watch item:** [PR #28797](https://github.com/google-gemini/gemini-cli/pull/28797) adds an inert "workflow context probe" during `npm ci` for OSS-VRP security research. It warrants careful review to confirm it only logs metadata and cannot exfiltrate secrets or alter CI behavior.

## Feature Request Trends

- **Subagent transparency and orchestration**: Users want subagent trajectories visible via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in bug reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and better self-awareness of CLI flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **AST-aware code tooling**: A multi-issue epic (#22745, #22746) investigates AST-based file reads, search, and codebase mapping to cut token noise and turn counts.
- **Memory-system hardening**: Auto Memory needs deterministic redaction, quarantine of invalid patches, and stop conditions for low-signal retries (#26516 cluster).
- **Browser agent resilience**: Automatic session takeover and lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) plus honoring `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Expanded eval infrastructure**: Robust component-level evaluations ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)) with 76 tests and growing, reinforced by today's eval-focused release and PRs.

## Developer Pain Points

- **Hangs and stalls dominate**: Generalist-agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell stuck on "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive-prompt deadlocks (Vite scaffold, [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) make the CLI feel unreliable for unattended use.
- **False success signals**: MAX_TURNS reported as "GOAL" ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) and browser-agent failures reported as success erode trust in agent completion status.
- **Trust/permission regressions**: Subagents activating despite disabled config ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)) and destructive git/DB commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) prompt calls for safer default behavior.
- **Scale limits**: 400 errors beyond 128 tools ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) and temp-script litter across workspaces ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) frustrate power users with large MCP setups.
- **Platform gaps persist**: Wayland browser failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), WSL2 clipboard gaps, Windows ripgrep `EFTYPE` errors, and symlinked agents being ignored ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)) — a steady drumbeat of cross-platform friction.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-14

## Today’s Highlights
- **v1.0.80-0** shipped with an MCP enablement override and clearer shared-session visibility.
- Agent/model configurability remains the hottest topic: per-agent reasoning effort (#2904) and silent model overrides (#3565, #4462) are driving most community discussion.
- Remote MCP reliability is emerging as a major pain point, with OAuth refresh, retry/backoff, and GitHub Actions token issues receiving fresh reports.

---

## Releases

### [v1.0.80-0](https://github.com/github/copilot-cli/releases/tag/v1.0.80-0)
- Added `--enable-mcp-server` to re-enable MCP servers that were disabled in settings for the current run.
- In `--ahp` mode, shared sessions now show `2 clients` (or more) when another client is attached, making joined sessions easier to identify.

---

## Hot Issues

1. **[#2904 – Custom Agent YAML Frontmatter Should Support Reasoning Effort](https://github.com/github/copilot-cli/issues/2904)**  
   Open · 20 👍 · 6 comments  
   The most-supported open feature request. Custom agents can pin a `model`, but still cannot set a per-agent reasoning effort. The community wants parity between global `--effort` controls and per-agent frontmatter.

2. **[#4345 – Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'](https://github.com/github/copilot-cli/issues/4345)**  
   Closed · 4 👍 · 5 comments  
   A model/effort validation bug appears when feature flags route sub-agents to `claude-haiku-4.5` with `medium` effort. A fresh duplicate, [#4473](https://github.com/github/copilot-cli/issues/4473), suggests the issue is still affecting users.

3. **[#2133 – Custom agent frontmatter `model` field rejects array syntax](https://github.com/github/copilot-cli/issues/2133)**  
   Open · 7 👍 · 4 comments  
   VS Code Copilot Chat supports arrays for the `model` frontmatter field, but Copilot CLI fails to load the agent. This breaks portability of custom agents between Copilot surfaces.

4. **[#3954 – `explore` tool hardcodes model to `gpt-5.4-mini`, ignoring custom/DeepSeek API configuration](https://github.com/github/copilot-cli/issues/3954)**  
   Open · 3 👍 · 3 comments  
   Users with custom model endpoints cannot use the `explore` tool because it bypasses their configured model and sends `gpt-5.4-mini` to the API, causing errors.

5. **[#3565 – Task tool silently downgrades subagent model to session model via multiplier guard](https://github.com/github/copilot-cli/issues/3565)**  
   Closed · 1 👍 · 1 comment  
   Explicit subagent model overrides in frontmatter or via the Task tool are silently ignored if the target model has a higher cost multiplier than the session model. This undermines trust in per-agent configuration.

6. **[#4346 – MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN](https://github.com/github/copilot-cli/issues/4346)**  
   Closed · 3 👍 · 1 comment  
   In GitHub Actions, the documented PAT-less setup with `GITHUB_TOKEN` fails to fetch MCP registry policy, blocking all non-default MCP servers in CI.

7. **[#4462 – Explicit code-review subagent model override is ignored](https://github.com/github/copilot-cli/issues/4462)**  
   Open  
   The built-in `code-review` subagent is configured for `gpt-5.6-luna`, but the CLI starts it with `gpt-5.6-sol`. The configured model is silently replaced, affecting code-review quality and cost.

8. **[#4467 – Long-running agent sessions exhaust event storage and appear cancelled](https://github.com/github/copilot-cli/issues/4467)**  
   Open  
   Long-lived sessions that spawn many subagents can exhaust the remote event store. Sessions then appear inactive or cancelled even while CLI processes are still alive, making automation unreliable.

9. **[#4469 – Orphaned `permission.requested` event replays on every session resume](https://github.com/github/copilot-cli/issues/4469)**  
   Open  
   A stale directory-access prompt from a command run days earlier reappears on every session resume and cannot be permanently dismissed. This is a serious session-state persistence bug.

10. **[#4477 – Session and prompt lost when stopping an action or hitting the stop button](https://github.com/github/copilot-cli/issues/4477)**  
    Open  
    Stopping an in-progress action can delete the entire session, including the original prompt and edits. Users report losing significant work, with no recovery path.

---

## Key PR Progress

Only one PR was updated in the last 24 hours, so there is no “top 10” list this cycle.

- **[#4476 – docs: document proposed custom-agent effort frontmatter (Option A)](https://github.com/github/copilot-cli/pull/4476)**  
  Closed · Author: romanstetsenko  
  A docs-only PR that proposes a dedicated `effort` frontmatter field for custom agents, parallel to the existing `model` field. It directly supports the long-running request in [#2904](https://github.com/github/copilot-cli/issues/2904) and may signal the intended design direction.

---

## Feature Request Trends

- **Per-agent model and reasoning-effort control**  
  Developers want custom agent frontmatter to fully control model and effort, including VS Code-compatible array syntax for `model`.  
  Related: [#2904](https://github.com/github/copilot-cli/issues/2904), [#2133](https://github.com/github/copilot-cli/issues/2133), [#4462](https://github.com/github/copilot-cli/issues/4462)

- **Session lifecycle visibility and control**  
  Users want to list running sessions, preserve sessions when stopping actions, and restore archived chats after resume timeouts.  
  Related: [#4470](https://github.com/github/copilot-cli/issues/4470), [#4477](https://github.com/github/copilot-cli/issues/4477), [#4474](https://github.com/github/copilot-cli/issues/4474), [#4467](https://github.com/github/copilot-cli/issues/4467)

- **Resilient remote MCP connections**  
  OAuth refresh races, transient 5xx handling with no retry, and case-insensitive server-name collision detection are all recurring requests.  
  Related: [#4472](https://github.com/github/copilot-cli/issues/4472), [#4466](https://github.com/github/copilot-cli/issues/4466), [#4464](https://github.com/github/copilot-cli/issues/4464), [#4478](https://github.com/github/copilot-cli/issues/4478)

- **Permissions and policy enforcement**  
  `allowed_directories` should suppress repeated shell-command prompts, and stale permission events should not replay on session resume.  
  Related: [#4482](https://github.com/github/copilot-cli/issues/4482), [#4469](https://github.com/github/copilot-cli/issues/4469), [#4481](https://github.com/github/copilot-cli/issues/4481)

---

## Developer Pain Points

- **Silent configuration overrides** — custom agent `model` and `effort` values are often ignored, downgraded, or replaced without a clear warning.  
  Related: [#3565](https://github.com/github/copilot-cli/issues/3565), [#4462](https://github.com/github/copilot-cli/issues/4462), [#2133](https://github.com/github/copilot-cli/issues/2133)

- **MCP integration fragility** — OAuth token refresh races, Azure AD scope issues, Windows socket errors, and missing retry/backoff make remote MCP servers unreliable.  
  Related: [#4472](https://github.com/github/copilot-cli/issues/4472), [#4464](https://github.com/github/copilot-cli/issues/4464), [#4466](https://github.com/github/copilot-cli/issues/4466), [#4463](https://github.com/github/copilot-cli/issues/4463), [#4480](https://github.com/github/copilot-cli/issues/4480)

- **Unreliable session state** — lost prompts on stop, silent archiving after resume timeouts, event-store exhaustion, and orphaned permission events are becoming recurring complaints.  
  Related: [#4477](https://github.com/github/copilot-cli/issues/4477), [#4474](https://github.com/github/copilot-cli/issues/4474), [#4467](https://github.com/github/copilot-cli/issues/4467), [#4469](https://github.com/github/copilot-cli/issues/4469)

- **Permissions config not honored** — directories listed in `allowed_directories` still trigger “path outside your allowed directory list” prompts, forcing users to use `/add-dir` manually.  
  Related: [#4482](https://github.com/github/copilot-cli/issues/4482)

- **Plugin/skill management UX gaps** — the `/plugins` TUI does not persist disabled skills, and marketplace `autoUpdate` does not trigger plugin updates at session start.  
  Related: [#4471](https://github.com/github/copilot-cli/issues/4471), [#4465](https://github.com/github/copilot-cli/issues/4465)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-14

## Today's Highlights
No new releases or pull requests landed in the last 24 hours, so community attention is concentrated on three significant issues. The most important are a silent streaming hang in ACP mode, a runaway 88k-token generation incident, and a highly requested persistent memory feature with 38 comments.

## Releases
No releases were published in the last 24 hours.

## Hot Issues
Only 3 issues were updated in the last 24 hours. All are noteworthy:

1. **[#1283] Feature Request: Memory System — Persistent context across sessions**  
   - Author: `CatKang` · Created: 2026-02-27 · Updated: 2026-08-13 · Comments: 38  
   - Proposes automatic memory (AI-managed notes) and manual memory (user-defined instructions) so Kimie CLI can remember project patterns, context, and preferences across sessions. This is the most-discussed issue in the digest, indicating strong demand for persistent context.  
   - [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/1283)

2. **[#2598] ACP/print streaming response hangs silently: no idle timeout, replaced wheel partial does not fall off the wire**  
   - Author: `ai-agent-workbench` · Created: 2026-08-09 · Updated: 2026-08-13 · Comments: 1  
   - A critical reliability bug in `kimi acp` mode: after streaming content finishes, the terminal frame (`[DONE]`/finish) never arrives and the CLI waits indefinitely. There is no idle timeout, and if the user sends the next message, the previous already-streamed response is never written to `wire.jsonl` — no `content.part`, no `usage.record`. The 0.31.1 fix only covers the Esc scenario.  
   - [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/2598)

3. **[#2597] Bug: Runaway garbled generation — 88k tokens of gibberish in one LLM step**  
   - Author: `kdp123` · Created: 2026-08-08 · Updated: 2026-08-13 · Comments: 1  
   - A normal session produced a single LLM step that ran for ~53 minutes and emitted 88,114 tokens of incoherent, repetitive gibberish. Highlights the absence of token limits, step-duration caps, or runaway-generation safeguards.  
   - [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/2597)

## Key PR Progress
No pull requests were created or updated in the last 24 hours, so there is no PR progress to report.

## Feature Request Trends
- **Persistent Memory System**: The clearest signal is Issue #1283, requesting both automatic and manual memory for cross-session context, project patterns, and user preferences.
- **Streaming Reliability Controls**: Issue #2598 drives demand for idle timeouts, explicit finish-frame handling, and guaranteed wire-logging of completed partial responses.
- **Generation Safeguards**: Issue #2597 suggests the need for output token/duration limits, early abort mechanisms, and anomaly detection to prevent runaway generations.

## Developer Pain Points
- **Silent hangs**: ACP streaming can hang forever after content is delivered, with no timeout or error, forcing manual intervention.
- **Lost debugging data**: When a hung session is superseded, the already-streamed response is missing from wire logs, making root-cause analysis much harder.
- **Runaway generation risk**: A single bad LLM step can consume enormous time/tokens with no built-in protection.
- **No persistent context**: Developers repeatedly lose project conventions and preferences when starting new sessions, driving the demand for the memory system in Issue #1283.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-14

## Today's Highlights

A low-velocity patch day: **v1.18.18** shipped with two targeted provider fixes (Kimi/Moonshot system-prompt selection and xAI `xhigh` reasoning effort), while community energy remains concentrated on three fronts — the controversial new v2 layout, a cluster of newly filed security disclosures, and a large reliability cleanup wave for plugins, MCP, and fallback handling. Notably, contributor **herjarsa** authored ten PRs in 24 hours addressing plugin auto-update stalls, MCP retry logic, WSL desktop support, and model fallback chains, signaling a coordinated effort to close long-standing issue debt.

## Releases

### [v1.18.18](https://github.com/anomalyco/opencode/releases/tag/v1.18.18)
Bugfix-only release:
- Correctly select the Kimi system prompt for official **Moonshot** and **Kimi** providers
- Fix `xhigh` reasoning effort for **xAI** models

## Hot Issues

1. [**#37012 — [FEATURE] Keep legacy layout option**](https://github.com/anomalyco/opencode/issues/37012) — *37 comments, 41 👍*
   The most active UX thread: users want the old main-window layout preserved, citing quick access to tools and workspace support that the new navigation-heavy UI lacks. Strong signal of v2 layout dissatisfaction.

2. [**#6719 — [FEATURE] Slash command for reload**](https://github.com/anomalyco/opencode/issues/6719) — *15 comments, 77 👍*
   The single most-upvoted open feature request. Developers want `/reload` to hot-load `opencode.jsonc` and `.opencode/` changes without a full restart — a clear workflow bottleneck.

3. [**#25630 — Regression: plugin `provider.models()` hook no longer populates custom providers**](https://github.com/anomalyco/opencode/issues/25630) — *15 comments, 6 👍*
   Since PR #25167, plugins cannot register models for user-declared custom providers not in the models.dev catalog. A long-running (3+ months) ecosystem regression with no resolution in sight.

4. [**#42434 — [SECURITY] `opencode upgrade` pipes remote script to bash with no integrity verification**](https://github.com/anomalyco/opencode/issues/42434) — *3 comments*
   Medium-severity supply-chain/TOCTOU concern for curl-based installs. Filed as part of a same-day security report cluster that also covers SSRF and context-pruning integrity (see #42435, #42437).

5. [**#39931 — Bash permission escape via `--` double hyphen**](https://github.com/anomalyco/opencode/issues/39931) — *3 comments*
   Commands containing `--` bypass the `"bash": "ask"` permission gate entirely. A trust-boundary bug that undermines sandboxing guarantees.

6. [**#42260 — [2.0] opencode2 mutates shared V1 database and breaks opencode 1.x coexistence**](https://github.com/anomalyco/opencode/issues/42260) — *2 comments*
   The v2 migration path clobbers the V1 schema, breaking `/move` and stranding sessions. Raises serious coexistence questions for teams testing v2 while still depending on v1.

7. [**#41470 — "Copied to clipboard" doesn't work**](https://github.com/anomalyco/opencode/issues/41470) — *15 comments, 1 👍*
   Inside VSCode Server (Docker), copy confirmation appears but nothing reaches the clipboard. A common remote-development workflow is silently broken.

8. [**#18694 — TypeScript LSP server not used when package.json is in a sub-directory**](https://github.com/anomalyco/opencode/issues/18694) — *7 comments, 13 👍*
   Monorepo and mixed-language projects lose TypeScript language features when running from the repo root instead of the `web/` subdirectory. Persistent gap since March.

9. [**#42083 — GitHub Copilot provider shows zero models**](https://github.com/anomalyco/opencode/issues/42083) — *5 comments*
   `opencode auth login -p github-copilot` succeeds, but `/models` shows nothing — all models report `model_picker_enabled: false` on 1.18.15. Provider integration instability continues to surface.

10. [**#42437 — [SECURITY] Context pruning silently drops instruction/constraint-bearing content**](https://github.com/anomalyco/opencode/issues/42437) — *2 comments*
    Medium-high severity: compaction can strip constraints and instructions from context, effectively enabling a constraint bypass once triggered. An integrity concern, not just a cost one.

## Key PR Progress

1. [**#38790 — [beta] feat(app): add workspace flows to new layout**](https://github.com/anomalyco/opencode/pull/38790)
   Adds session-start choices (local repo / isolated new workspace / existing workspaces) plus a context-aware composer pill showing branch context — the flagship v2 UI improvement currently in beta.

2. [**#42424 — feat(processor): add model fallback chain when retries are exhausted**](https://github.com/anomalyco/opencode/pull/42424) *(closes #10287)*
   After retries are exhausted on the primary model, the processor now consults a configured fallback chain — a direct response to the infinite-retry-loop class of bugs (#29143).

3. [**#42433 — fix(opencode): preserve response model metadata**](https://github.com/anomalyco/opencode/pull/42433) *(closes #42420)*
   Keeps the AI SDK's structured `response.modelId` on assistant turns instead of losing it to the requested alias. Intentionally narrower than #26091's header-preservation ask.

4. [**#42425 — feat(memory): add `agent_memory` table and memory-tools plugin**](https://github.com/anomalyco/opencode/pull/42425) *(closes #41998)*
   Adds an `agent_memory` table plus a memory-tools plugin for cloud backup/restore of AgentMemory via Supabase.

5. [**#42428 — fix(provider): add kimi-for-coding custom handler and fix model detection for k2p6 (Kimi K2.6)**](https://github.com/anomalyco/opencode/pull/42428) *(closes #23933)*
   The `kimi-for-coding` provider registers K2.6 as `k2p6`, but several code paths mishandle it; this PR aligns detection and handling — complementing today's v1.18.18 Kimi fix.

6. [**#42431 — fix(mcp): retry failed MCP connections to handle parallel spawn race condition**](https://github.com/anomalyco/opencode/pull/42431) *(closes #41996)*
   Addresses intermittent "Connection closed" errors when MCP servers spawn in parallel with `concurrency: "unbounded"`.

7. [**#42429 — fix(desktop): wrap MCP commands with `wsl.exe` when WSL mode is enabled**](https://github.com/anomalyco/opencode/pull/42429) *(closes #28159)*
   Fixes Windows desktop + WSL where `local` MCP commands reference Linux executables unavailable in the Windows sidecar.

8. [**#42430 — fix(skill): ensure plugin config hooks run before skill discovery**](https://github.com/anomalyco/opencode/pull/42430) *(closes #28646)*
   Plugin `config()` hooks (e.g. superpowers) that mutate `config.skills.paths` now run before skill discovery, allowing dynamically registered skill directories to be picked up.

9. [**#42427 — fix(opencode): plugin auto-update with temp residue cleanup**](https://github.com/anomalyco/opencode/pull/42427) *(closes #16608)*
   Fixes `@latest` auto-update stalls by fetching `dist-tags.latest` directly from `registry.npmjs.org` and cleans up npm-install temp residue.

10. [**#40427 — [beta] some experimental perf improvements**](https://github.com/anomalyco/opencode/pull/40427)
    A reduced v2-only performance series (session route loading, etc.), trimmed of dev-era legacy-layout and compatibility-client changes after rebase.

*Also notable:* [#42422](https://github.com/anomalyco/opencode/pull/42422) adds exponential backoff to desktop health checks, [#42426](https://github.com/anomalyco/opencode/pull/42426) introduces a unified task-state color/icon convention, [#42423](https://github.com/anomalyco/opencode/pull/42423) adds a session-archive confirmation dialog, and [#42432](https://github.com/anomalyco/opencode/pull/42432) fixes codex data residency.

## Feature Request Trends

- **UI flexibility around the v2 layout** — The dominant theme. Requests include preserving the legacy layout (#37012), a background-activities sidebar (#42369), unified task-state colors/icons (#42426), and switchable in-session output styles (#42414).
- **Session/operational control** — Top-voted demand remains `/reload` (#6719), along with manual `opencode plugin update` (#18544) and the ability to disable model-initiated network access (#42288).
- **Model routing transparency and resilience** — Users want the actual response model ID surfaced (#42420, #26091), retry caps and fallback chains (#29143 → #42424), and structured `Retryable.action` contracts for SDK consumers (#37083).
- **Plugin ecosystem reliability** — Recurring asks for fixing config drift (#30526), the `provider.models()` hook regression (#25630), auto-update stalls (#42427), and cleaner plugin lifecycle management (#18544).
- **Security hardening** — A same-day cluster of reports (#42434, #42435, #42437) plus the open bash-permission bypass (#39931) signals growing community scrutiny of install, fetch, and context-integrity security.

## Developer Pain Points

- **V2 migration friction** — Coexistence failures where opencode2 mutates the V1 database (#42260), missing TODO tools in v2 runtime (#42421), and layout regressions (#37012) are creating real hesitation around the v2 transition.
- **Provider/model integration instability** — GitHub Copilot showing zero models (#42083), Kimi/Moonshot quirks (addressed in v1.18.18), the custom-provider plugin regression (#25630), and lost response-model metadata (#42420, #26091) keep provider tooling feel fragile.
- **Remote/container development gaps** — Clipboard failures in VSCode Server (#41470), WSL MCP command issues (#42429), and TS LSP failing on sub-directory `package.json` (#18694) hurt Docker/WSL-based workflows.
- **Security anxiety** — Four security-related reports in 24 hours (#42434, #42435, #42437, plus the open #39931) point to a hardening backlog the community is actively probing.
- **Performance** — Complaints about slow model responses (#42382) and desktop health-check races on slower machines (#42422), paired with the v2 perf PR series (#40427), show performance is still a top-of-mind concern during the v2 push.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-14

## Today's Highlights

No new releases shipped in the last 24 hours, but the community is converging on two critical reliability bugs: auto-compaction that only fires after the provider rejects the request ([#6879](https://github.com/earendil-works/pi/issues/6879), 17 👍) and macOS CPU/memory regressions on long sessions ([#7730](https://github.com/earendil-works/pi/issues/7730)). On the PR side, terminal-hygiene fixes for SIGINT corruption and resume floods ([#8082](https://github.com/earendil-works/pi/pull/8082)) plus a Gemini schema-compatibility fallback ([#8086](https://github.com/earendil-works/pi/pull/8086)) lead a batch of 13 PRs.

## Hot Issues

1. **[#6879](https://github.com/earendil-works/pi/issues/6879) — Auto-compaction never triggers until provider overflow** — The most-discussed issue (19 comments, 17 👍). A 2-hour agentic turn on gpt-5.6-sol blew past the compaction threshold and only compacted when the API rejected the request at 373k tokens. Community asks for a post-turn check after every agent step.

2. **[#7730](https://github.com/earendil-works/pi/issues/7730) — High CPU usage on macOS with long sessions** — Users report 50–110% CPU and 600–800MB memory, apparently correlated with context/session length. 11 comments, 8 👍; still un-triaged.

3. **[#7836](https://github.com/earendil-works/pi/issues/7836) — Edit fuzzy match misses whitespace-length differences** — `normalizeForFuzzyMatch` doesn't collapse whitespace runs, so `oldText` fails on otherwise identical content. Marked in-progress; notably hurts small models that can't reproduce exact whitespace.

4. **[#8029](https://github.com/earendil-works/pi/issues/8029) — Prompt editor degrades linearly with buffer size** — With ~7,000 lines in the prompt box, a single arrow-key press took 1,650ms. In-progress; a caching fix is already up as [#8066](https://github.com/earendil-works/pi/pull/8066).

5. **[#7791](https://github.com/earendil-works/pi/issues/7791) — Undici inherits 16 KiB maxHeaderSize (closed)** — Pi's global `fetch` rejected valid responses with `UND_ERR_HEADERS_OVERFLOW` because `EnvHttpProxyAgent` never set `maxHeaderSize`. Resolved this cycle.

6. **[#7779](https://github.com/earendil-works/pi/issues/7779) — Shared PI_CODING_AGENT_DIR unusable across Unix users** — `auth.json` and `models-store.json` are written mode 0600, so the first user locks out everyone else on shared installs. Community asks for a trusted-user model.

7. **[#7829](https://github.com/earendil-works/pi/issues/7829) — Invalid settings.json yields misleading "bash not found" on Windows** — Unescaped backslashes in a Windows path produce invalid JSON that is silently ignored, surfacing as a confusing shell error. In-progress; a UX trap for Windows users.

8. **[#8060](https://github.com/earendil-works/pi/issues/8060) — Streaming thinking blocks flash heading color (closed)** — Partial thinking content briefly renders in bold orange-yellow before returning to gray once the next chunk arrives. Cosmetic but disorienting; closed as untriaged.

9. **[#7761](https://github.com/earendil-works/pi/issues/7761) — TUI "Copied!" is a lie on VTE terminals** — GNOME Terminal shows "Copied!" but `wl-paste` proves nothing was written; only an OSC 52 escape was emitted. Affects all VTE-based terminals.

10. **[#8000](https://github.com/earendil-works/pi/issues/8000) — @ file autocomplete ranks deep matches above direct children** — Basename ties favor deeply nested files over the direct child the user almost certainly wants (e.g. `@~/<dir>/pro` surfaces nested `projects` over the direct child).

## Key PR Progress

1. **[#8082](https://github.com/earendil-works/pi/pull/8082) — fix(tui): render only visible viewport; restore terminal on SIGINT** — frankieyep's two-part fix: large resumes no longer replay ~845KB of history into the scrollback, and SIGINT properly restores echo, cursor, bracketed paste, and window title. Closes [#8079](https://github.com/earendil-works/pi/issues/8079) and [#8080](https://github.com/earendil-works/pi/issues/8080).

2. **[#8086](https://github.com/earendil-works/pi/pull/8086) — fix(ai): legacy Gemini tool schema fallback** — Works around generativelanguage endpoints that reject `parametersJsonSchema` and other JSON Schema fields outside the legacy `Schema` message with `400 INVALID_ARGUMENT`.

3. **[#8066](https://github.com/earendil-works/pi/pull/8066) — fix(tui): visual lines caching** — Directly addresses the prompt-editor slowdown [#8029](https://github.com/earendil-works/pi/issues/8029) by caching visual-line results, invalidated only on width/text changes. Adds a `VisualLine` type.

4. **[#8084](https://github.com/earendil-works/pi/pull/8084) — fix(coding-agent): don't swallow the prompt after boolean extension flags** — Boolean flags like `--plan` consumed the next CLI argument as their value, so `pi -p --plan "prompt"` started a session with no messages and exited 0 silently.

5. **[#8070](https://github.com/earendil-works/pi/pull/8070) — fix(coding-agent): validate extension flag defaults** — Models `registerFlag()` options as a discriminated union so `type`/`default` mismatches (e.g. boolean default `"false"`) fail loudly instead of yielding truthy strings.

6. **[#8052](https://github.com/earendil-works/pi/pull/8052) — fix(coding-agent): transactional session persistence** — `_appendEntry()` advanced the in-memory graph before the JSONL append completed; on `ENOSPC`, the next entry referenced a parent that never hit disk, corrupting resumes. Now transactional.

7. **[#7984](https://github.com/earendil-works/pi/pull/7984) — fix(coding-agent): update grok-mermaid to 0.2.3** — Fixes [#7832](https://github.com/earendil-works/pi/issues/7832) with significantly improved mermaid rendering (classes still ignored for now).

8. **[#6216](https://github.com/earendil-works/pi/pull/6216) — feat: Amazon Bedrock Mantle OpenAI Responses provider** — Open since July 1; adds a new provider for Bedrock Mantle's OpenAI Responses API, superseding an earlier attempt.

9. **[#8085](https://github.com/earendil-works/pi/pull/8085) — feat(tui): cancel mouse selection with Escape** — Standard text-editor behavior for "selection maniacs": press Escape mid-drag to clear the selection without triggering auto-copy.

10. **[#8057](https://github.com/earendil-works/pi/pull/8057) — fix(examples): todo renderResult returns undefined on validation errors** — A failed schema validation in the todo tool crashes the TUI because `renderResult` skips both `!details` and `details.error` guards and hits a `switch` with no `default`.

Also notable: [#7993](https://github.com/earendil-works/pi/pull/7993) was closed with the note *"Sorry, this was an agent gone wild. Please ignore this."* — agentic development has its moments.

## Feature Request Trends

- **Provider-compatibility shims**: Requests to absorb provider-specific quirks keep rising — Anthropic server-side refusal fallback ([#8017](https://github.com/earendil-works/pi/issues/8017), filed by badlogic), Codex `end_turn: false` handling ([#7689](https://github.com/earendil-works/pi/issues/7689)), Kimi top-level `cached_tokens` tracking ([#8075](https://github.com/earendil-works/pi/issues/8075)), and Gemini legacy schemas ([#8086](https://github.com/earendil-works/pi/pull/8086)).
- **Tool-schema flexibility**: Extensions want per-tool opt-out of argument validation for host-validated tools ([#7607](https://github.com/earendil-works/pi/issues/7607)) and a final immutable pre-execute tool admission hook ([#7092](https://github.com/earendil-works/pi/issues/7092)).
- **Rendering parity**: HTML exports should render mermaid/LaTeX like the TUI does ([#8041](https://github.com/earendil-works/pi/issues/8041)), alongside TUI fidelity fixes for CJK ambiguous-width characters ([#8055](https://github.com/earendil-works/pi/issues/8055)).
- **Performance budgets**: A call to set a startup-time budget targeting jcode-comparable latency and memory ([#7739](https://github.com/earendil-works/pi/issues/7739)) reflects growing competitive pressure.

## Developer Pain Points

- **Context/compaction reliability** — [#6879](https://github.com/earendil-works/pi/issues/6879) tops the list with 17 upvotes: users hit provider token limits because compaction triggers too late or not at all.
- **Terminal state corruption** — A recurring theme: `/exit` breaks Kitty keyboard protocol ([#5065](https://github.com/earendil-works/pi/issues/5065)), SIGINT leaves raw mode with no echo ([#8080](https://github.com/earendil-works/pi/issues/8080)), and resume floods the scrollback ([#8079](https://github.com/earendil-works/pi/issues/8079)). PR [#8082](https://github.com/earendil-works/pi/pull/8082) is a direct response.
- **Long-session performance** — High CPU on macOS ([#7730](https://github.com/earendil-works/pi/issues/7730)) and linear prompt-editor latency ([#8029](https://github.com/earendil-works/pi/issues/8029)) compound for power users with large transcripts.
- **Windows remains an under-tested platform** — Invalid JSON settings masquerading as "bash not found" ([#7829](https://github.com/earendil-works/pi/issues/7829)) and Unix-socket test failures ([#8047](https://github.com/earendil-works/pi/issues/8047)) are the latest examples.
- **Silent misconfiguration and data hazards** — Invalid settings are silently ignored ([#7829](https://github.com/earendil-works/pi/issues/7829)), unknown slash commands get sent to the model as chat ([#8081](https://github.com/earendil-works/pi/issues/8081)), and non-transactional persistence can corrupt resumes on `ENOSPC` ([#8052](https://github.com/earendil-works/pi/pull/8052)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-14

## Today's Highlights

Qwen Code shipped **v0.21.11** with Agent Plugins v1 and the new `/coordinate` command for native multi-agent workflows, while **v0.21.12-preview.1** adds Web Shell session and file-upload fixes. The multi-agent fleet RFC ([#8718](https://github.com/QwenLM/qwen-code/issues/8718)) is now closed after a series of staged implementations, but developer friction remains around Vertex AI model configuration and Windows CLI regressions. SWE-bench Verified E2E runs are currently **QUARANTINED**, meaning benchmark results are not being accepted for release sign-off.

## Releases

- [v0.21.12-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.12-preview.1) — Fixes Web Shell session target preservation ([#9038](https://github.com/QwenLM/qwen-code/pull/9038)) and adds workspace file upload support in the Web Shell.
- [v0.21.11](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11) — Adds Agent Plugins v1 ([#8834](https://github.com/QwenLM/qwen-code/pull/8834)) and enables native multi-agent workflows with read-only teammates via `/coordinate` ([#8804](https://github.com/QwenLM/qwen-code/pull/8804)). Release notes also include a non-production SWE-bench Verified E2E validation marked **QUARANTINED** (500/500 completed, 0 resolved), so the benchmark is not yet trusted for release sign-off.

## Hot Issues

- [QwenLM/qwen-code#8718](https://github.com/QwenLM/qwen-code/issues/8718) — **RFC: Native coordination for independent Qwen sessions** (closed, 9 comments). The umbrella for the fleet work now landing as `/coordinate`; drove stages #8840–#8843.
- [QwenLM/qwen-code#8678](https://github.com/QwenLM/qwen-code/issues/8678) — **Large session restore timeout can discard the current session** (P1, 8 comments). PR1 in [#8691](https://github.com/QwenLM/qwen-code/pull/8691) makes restore timeouts observable; the remaining recovery path is still open.
- [QwenLM/qwen-code#9019](https://github.com/QwenLM/qwen-code/issues/9019) — **Gemini 2.5 on Vertex AI unusable because `thinkingLevel` is always sent** (5 comments). Every request fails with a 400 before tool calls or streaming.
- [QwenLM/qwen-code#9025](https://github.com/QwenLM/qwen-code/issues/9025) — **Keyless Vertex AI not inferred from the environment** (5 comments). Headless ADC runs exit at startup because `vertex-ai` auth is never selected.
- [QwenLM/qwen-code#9002](https://github.com/QwenLM/qwen-code/issues/9002) — **Python SDK rejects `permission_mode="auto"` while the CLI supports it** (5 comments). Client-side validation blocks a valid workflow before reaching the CLI.
- [QwenLM/qwen-code#9026](https://github.com/QwenLM/qwen-code/issues/9026) — **`NO_TOOL_RESULT_PROGRESS` hard-fails headless runs** (3 comments). A model ending a turn quietly after a tool result is treated as an invalid stream.
- [QwenLM/qwen-code#9088](https://github.com/QwenLM/qwen-code/issues/9088) — **`read_file` sends non-image files to the model based only on `.png` extension** (3 comments). The resulting raw 400 aborts the whole turn.
- [QwenLM/qwen-code#9083](https://github.com/QwenLM/qwen-code/issues/9083) — **`record_artifact` succeeds without verifying `workspacePath`** (3 comments). Artifact store reports `status: "missing"` even though the file exists on disk.
- [QwenLM/qwen-code#9061](https://github.com/QwenLM/qwen-code/issues/9061) — **Ctrl+V paste unresponsive in CLI on Windows** (P1, 3 comments). Regression since 0.21.0; downgrading restores paste.
- [QwenLM/qwen-code#9108](https://github.com/QwenLM/qwen-code/issues/9108) — **Remaining Web Shell external links silently fail; MCP OAuth cannot complete** (3 comments). #9069 fixed Markdown links, but other surfaces still use the unreliable desktop webview path.

## Key PR Progress

- [QwenLM/qwen-code#9095](https://github.com/QwenLM/qwen-code/pull/9095) — **feat(review): close unbounded finding classes instead of enumerating them**. Teaches `/review` to detect enumeration traps and close defect classes prospectively.
- [QwenLM/qwen-code#9091](https://github.com/QwenLM/qwen-code/pull/9091) — **Run-session ledger and cross-session agent evidence**. Records CLI session IDs and diff SHA-256s, laying groundwork for resuming interrupted `/review` runs.
- [QwenLM/qwen-code#9039](https://github.com/QwenLM/qwen-code/pull/9039) — **Privacy-safe tool-result boundary diagnostics**. Adds boundary diagnostics for tool-result issues without leaking tool payload content.
- [QwenLM/qwen-code#9112](https://github.com/QwenLM/qwen-code/pull/9112) — **Windows installer checksum fix**. Replaces `Get-FileHash` with an inline streaming .NET SHA-256 implementation.
- [QwenLM/qwen-code#8687](https://github.com/QwenLM/qwen-code/pull/8687) — **Guard cross-worktree Git mutations**. Blocks model-issued `run_shell_command` Git calls that escape the session worktree via `-C`, `--work-tree`, or `--git-dir`.
- [QwenLM/qwen-code#9096](https://github.com/QwenLM/qwen-code/pull/9096) — **Absorb prose `gh` commands into platform-backed subcommands**. Removes raw `gh` shell steps from the `/review` skill’s prompt prose.
- [QwenLM/qwen-code#8396](https://github.com/QwenLM/qwen-code/pull/8396) — **Close four trust-boundary holes in hook execution**. Includes no-follow redirects, SSRF checks, and stricter network egress handling.
- [QwenLM/qwen-code#8853](https://github.com/QwenLM/qwen-code/pull/8853) — **Surface Web Shell loop detection as turn errors**. Foreground tool-loop stops become structured errors with localized guidance while the session stays usable.
- [QwenLM/qwen-code#9111](https://github.com/QwenLM/qwen-code/pull/9111) — **Route remaining desktop external links through the shell opener**. Fixes remaining `target="_blank"` surfaces that the desktop webview silently drops.
- [QwenLM/qwen-code#8969](https://github.com/QwenLM/qwen-code/pull/8969) — **Live-session registry and `qwen sessions ps`**. Sessions self-record while running, making it easy to answer “what is running on this machine right now?”

## Feature Request Trends

- **Native multi-agent coordination** is the dominant direction: the fleet RFC ([#8718](https://github.com/QwenLM/qwen-code/issues/8718)) plus stages [#8840](https://github.com/QwenLM/qwen-code/issues/8840), [#8841](https://github.com/QwenLM/qwen-code/issues/8841), [#8842](https://github.com/QwenLM/qwen-code/issues/8842), and [#8843](https://github.com/QwenLM/qwen-code/issues/8843) point toward supervised teammates, persistence, and terminal attach.
- **Omni multimodal memory and policy** work remains active: experimental issues ([#8197](https://github.com/QwenLM/qwen-code/issues/8197), [#8186](https://github.com/QwenLM/qwen-code/issues/8186), [#8188](https://github.com/QwenLM/qwen-code/issues/8188), [#8189](https://github.com/QwenLM/qwen-code/issues/8189)) target memory recall, policy-driven degradation, quarantine, and storage governance.
- **Background automation and daemon observability** are recurring asks: active-work tracking ([#8586](https://github.com/QwenLM/qwen-code/issues/8586)) and Web Shell channel/session redesign ([#8845](https://github.com/QwenLM/qwen-code/issues/8845)) are the current vehicle.
- **Configuration-driven features** are becoming more user-visible: dynamic workflows should be a normal setting ([#9098](https://github.com/QwenLM/qwen-code/pull/9098)), and SDK options should match CLI capabilities ([#9002](https://github.com/QwenLM/qwen-code/issues/9002)).

## Developer Pain Points

- **Vertex AI / Gemini 2.5 compatibility** is causing immediate startup failures: unsupported `thinkingLevel` ([#9019](https://github.com/QwenLM/qwen-code/issues/9019)) and missing keyless ADC inference ([#9025](https://github.com/QwenLM/qwen-code/issues/9025)).
- **Windows regressions** are hurting basic workflows: Ctrl+V paste breakage ([#9061](https://github.com/QwenLM/qwen-code/issues/9061)) and Desktop runtime Terminal visibility ([#9043](https://github.com/QwenLM/qwen-code/issues/9043)).
- **Headless/non-interactive runs remain fragile**: auth-type inference failures ([#9025](https://github.com/QwenLM/qwen-code/issues/9025)) and quiet model endings after tool results ([#9026](https://github.com/QwenLM/qwen-code/issues/9026)) abort otherwise valid runs.
- **File and artifact handling produces contradictory UX**: extension-based image detection ([#9088](https://github.com/QwenLM/qwen-code/issues/9088)) and unverified `record_artifact` paths ([#9083](https://github.com/QwenLM/qwen-code/issues/9083)) cause model promises that UIs cannot honor.
- **Tooling safety gaps are being actively patched**: hook trust-boundary holes ([#8396](https://github.com/QwenLM/qwen-code/pull/8396)) and cross-worktree Git mutation guards ([#8687](https://github.com/QwenLM/qwen-code/pull/8687)) show a hardening trend prompted by earlier security reports.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-14

## 1. Today's Highlights

v0.9.7 ships as **CodeWhale**, the public product from Shannon Labs, with the legacy `deepseek-tui` npm package formally deprecated. Community PRs this cycle focus on test isolation, schema simplification for model-facing tools, and the new Auto-Review model-guardian tier. Maintainers are also visibly addressing long-standing Windows/Cygwin config issues and agent-session reliability problems.

## 2. Releases

**v0.9.7** — The `codewhale` command, npm package, and release assets now serve as the canonical technical identifiers. The legacy `deepseek-tui` npm package is deprecated and will not receive further releases; v0.8.x users are directed toward the `codewhale` naming going forward.

## 3. Hot Issues

- [Issue #5324](https://github.com/Hmbown/CodeWhale/issues/5324) — **Simplify the 32-field `agent` tool schema**  
  The model-facing agent tool has a 32-property schema with zero required fields and eight actions. This complexity is causing models to error on it. 7 comments, opened by maintainer.

- [Issue #998](https://github.com/Hmbown/CodeWhale/issues/998) — **Text display truncation in UI**  
  Chinese/UI copy is clipped; users request hover tooltips for full text. 11 comments, 👍 1.

- [Issue #1004](https://github.com/Hmbown/CodeWhale/issues/1004) — **`/dryrun` preview before sending requests**  
  Users want to inspect the actual DeepSeek V4 Pro request — system prompt, cached files, tools, attachments — before paying for a long turn. 9 comments.

- [Issue #2369](https://github.com/Hmbown/CodeWhale/issues/2369) — **Config paths fragmented across OS and Cygwin**  
  Windows/Cygwin resolve config and secret paths differently, and a legacy migration can silently misplace data. 7 comments.

- [Issue #894](https://github.com/Hmbown/CodeWhale/issues/894) — **Image ordering confusion during execution**  
  User reports images appearing out of order while running tasks. 6 comments.

- [Issue #1425](https://github.com/Hmbown/CodeWhale/issues/1425) — **Agent sessions hang on large text processing**  
  Analyzing a 3-million-character novel spawns 10 sub-agents, then `agent_wait` timeouts stall the session. A recurring reliability pain point. 6 comments.

- [Issue #1482](https://github.com/Hmbown/CodeWhale/issues/1482) — **NVIDIA NIM provider returns 404**  
  Calls fail with `404 page not found`; user environment output confirms v0.8.29 and Windows paths. 6 comments.

- [Issue #1732](https://github.com/Hmbown/CodeWhale/issues/1732) — **Merging analysis reports saves very slowly**  
  Users report low cache hit rate and extreme slowdown when saving merged reports locally. 6 comments.

- [Issue #1651](https://github.com/Hmbown/CodeWhale/issues/1651) — **VS Code crashes when YOLO Agent runs test scripts**  
  Crash occurs while the agent autonomously executes tests with DeepSeek v4-pro/v4-flash. 5 comments.

- [Issue #5359](https://github.com/Hmbown/CodeWhale/issues/5359) — **Four TUI tests fail on dev machines but pass in CI**  
  Tests read `~/.codewhale` state and display probes, so they fail only on machines with real local state. 2 comments.

## 4. Key PR Progress

- [PR #5368](https://github.com/Hmbown/CodeWhale/pull/5368) — **Fix unguarded tests by isolating state root**  
  Addresses Issue #5359 with three independent mechanisms, each covered by a regression test.

- [PR #5369](https://github.com/Hmbown/CodeWhale/pull/5369) — **Degrade Moonshot schemas instead of refusing conditionals**  
  Follow-up to the agent-schema discussion; keeps schema handling permissive rather than rejecting valid provider variations.

- [PR #5358](https://github.com/Hmbown/CodeWhale/pull/5358) — **Auto-review denial rationale + turn circuit breaker**  
  Blocks now include rationale to stop models from rephrasing denied actions until the step budget is exhausted.

- [PR #5364](https://github.com/Hmbown/CodeWhale/pull/5364) — **Render Markdown blockquotes with a quote rail**  
  Adds proper quote-rail rendering in the TUI transcript, including nesting, inline formatting, and selection-copy behavior.

- [PR #5365](https://github.com/Hmbown/CodeWhale/pull/5365) — **First-class local DS4 setup**  
  Adds a keyless loopback local DeepSeek provider route via `/setup provider ds4`, reusing the OpenAI-compatible transport.

- [PR #5339](https://github.com/Hmbown/CodeWhale/pull/5339) — **Suppress child-owned shell completions**  
  Fixes parent-model stream pollution from background child shell completions while preserving parent visibility.

- [PR #5353](https://github.com/Hmbown/CodeWhale/pull/5353) — **Model guardian tier for Auto-Review**  
  Adds a one-shot model guardian fallback instead of silently blocking; planned for v0.9.8.

- [PR #5333](https://github.com/Hmbown/CodeWhale/pull/5333) — **Pin host terminal as always-on-top mini window**  
  Harvests community PR #5318; adds Windows PiP-style shrink/pin behavior via right-click or `/pin`.

- [PR #5336](https://github.com/Hmbown/CodeWhale/pull/5336) — **Fix MCP `nextCursor` null response**  
  Closes #5335; strict MCP clients like Claude Code reject `null` in `tools/list` and `resources/list`.

- [PR #5338](https://github.com/Hmbown/CodeWhale/pull/5338) — **Move docs guide page onto dictionary spine**  
  First slice of #5337; removes `isZh` ternaries from the docs guide page in the web app.

## 5. Feature Request Trends

- **i18n and Chinese-input polish** — Repeated requests for full locale coverage (`zh-Hant`, hardcoded English strings) and fixes for Chinese IME behavior inside the TUI.
- **Request preview and output usability** — `/dryrun`, hover tooltips for truncated text, and clickable file paths in output are all recurring asks.
- **Provider/account resilience** — Auto-switching profiles on rate limits, better NVIDIA NIM support, and first-class local DS4 setup.
- **Remote workbench expansion** — US-first Cloudflare/AWS/Telegram lane alongside the existing Tencent/CNB/Feishu path.
- **Lifecycle hooks for actions** — A universal PreToolUse/PostToolUse hook layer for cancel/pause/resume across all action types.
- **Configurable keymap** — Move keybindings to `~/.deepseek/keybinds.toml` with conflict detection.

## 6. Developer Pain Points

- **Agent session hangs** — Long-running sub-agent workflows still deadlock or time out, especially with large inputs.
- **Windows/Cygwin config fragmentation** — Path resolution, silent migrations, and shell-sandbox behavior remain unreliable on Windows.
- **Chinese text rendering** — Garbled output, truncated labels, and IME composition bugs affect a large user segment.
- **Schema complexity** — Overly complex model-facing tool schemas cause provider errors and wasted reasoning steps.
- **Environment-dependent test failures** — Tests that read local machine state fail for developers with real CodeWhale config.
- **Upgrade/doctor state bugs** — Post-upgrade `doctor` can permanently report `first-run` / `update checkpoint` as needing action.
- **Sandbox restrictions** — SSH outbound blocks and `sandbox-exec` failures break legitimate developer workflows.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*