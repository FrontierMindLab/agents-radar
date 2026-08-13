# AI CLI Tools Community Digest 2026-08-12

> Generated: 2026-08-12 04:07 UTC | Tools covered: 10

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-08-12

## 1. Ecosystem Overview

The AI CLI coding-agent ecosystem is maturing from "demo novelty" into production infrastructure, with community attention concentrated on trust, reliability, and enterprise integration rather than raw capability. Windows remains the single largest cross-tool pain point: every tool with a Windows user base reported platform-specific failures this cycle, ranging from plugin lifecycle breakage to sandbox ACL gaps and terminal rendering corruption. The strongest signal across communities is that **agentic execution trust** — honest status reporting, interrupt semantics, permission enforcement, and billing transparency — has replaced feature count as the primary differentiator. Security hardening is accelerating across the board, with same-cycle CVE patches, SSRF mitigations, and sandbox escape fixes landing in parallel across multiple repos. Notably, only three of ten tools shipped releases in the last 24 hours, yet eight tools showed substantive issue or PR activity, indicating a shift from release velocity toward stabilization and hardening.

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PRs Active (24h) | Releases (24h) | Release Status |
|---|---|---|---|---|
| Claude Code | 10 | 10 | 1 | v2.1.228 stable patch |
| OpenAI Codex | 10 | 10 | 3 | rust-v0.148.0-alpha.7/8/9 (alpha) |
| Gemini CLI | 10 | 10 | 4 | v0.56.0-nightly, v0.56.0-preview.1, v0.55.1, v0.55.0-preview.3 |
| Copilot CLI | 10 | 3 | 0 | No release |
| Kimi Code | 2 | 8 | 0 | No release |
| OpenCode | 10 | 10 | 0 | No release |
| Pi | 10 | 10 | 0 | No release |
| Qwen Code | 10 | 10 | 6 | v0.21.10 stable, v0.21.11-preview.0, desktop-v0.2.0, live-host-v0.1.1, nightly, infra smoke |
| DeepSeek TUI (CodeWhale) | 10 | 5 | 0 | No release |
| Grok Build | 0 | 0 | 0 | Dormant |

*Notes: Issue/PR counts reflect items highlighted in each community digest; total project activity may be higher. Grok Build reported no activity in the window.*

## 3. Shared Feature Directions

**Windows reliability and desktop parity** — The most pervasive cross-tool theme. Claude Code (git detection, Ctrl+C input wipe, MSIX GPU crash, Shift+Enter), Codex (app-server startup failures `os error 3`, sandbox ACL gaps), Copilot CLI (plugin install/update `os error 5`), OpenCode (backslash path watcher fix), Pi (CMD output corruption/memory leak), Qwen (encoded drive-colon file links), and DeepSeek (concatenated CLI args) all report Windows-specific breakage. Users expect full platform parity as a baseline, not a roadmap item.

**Subagent and background-execution trust** — Gemini (MAX_TURNS misreported as "GOAL success," generalist agent hangs), Claude (600s watchdog killing healthy agents, tool interruptions mislabeled "user-rejected"), Codex (stuck subagent cards), OpenCode (infinite retry loops with $15+ API costs per invocation), and Pi (child-shell event leakage into parent streams) all show that multi-agent workflows are where trust breaks down most visibly.

**Security hardening as continuous maintenance** — Gemini shipped same-cycle fixes for two critical CVEs (shell-quote, simple-git), a variable-expansion bypass, and an SSRF hostname-resolution gap. Qwen fixed high-severity npm vulnerabilities and added a guard against cross-worktree git mutations. Copilot migrated off `pull_request_target`. OpenCode is addressing subagent permission bypasses. This is now table stakes for all tools.

**Permission and approval model evolution** — OpenCode (subagents bypass deny rules for `.env` reads, `edit` rules overridden by `external_directory`), DeepSeek (Auto-Review regression blocks all Bash calls), Copilot (granular auto-allow and file-level acceptance), and Codex (routing MCP calls through shared approval flow) all reflect demand for a coherent, predictable permission model — not just "ask vs. allow."

**MCP ecosystem maturation** — Codex (OAuth CIMD support, shared approval handling), Copilot (RFC 8414 issuer mismatch with GitLab, BigInt serialization crash), and Gemini (A2A OpenID validation fix) indicate MCP integration is shifting from "can it connect" to "does it interoperate correctly with enterprise auth and types."

**Context persistence and memory** — Kimi (long-running memory-system request, 34 comments), Pi (compaction-specific thinking levels), Gemini (Auto Memory retry/redaction gaps), and Claude (worktree resume and branch-naming as the top feature request) all show users want durable, controllable context across sessions.

**Billing and usage transparency** — Claude (auto-recharges despite disabled auto-reload), Gemini (false quota exhaustion errors), OpenCode (provider-reported cost preference), and DeepSeek (pricing endpoint 503s) indicate usage accounting is a trust surface, not a back-office detail.

## 4. Differentiation Analysis

**Claude Code** remains the most enterprise-entrenched tool: its top feature request (worktree management, 31 👍) targets advanced plugin authors, while its hottest issues concern data-loss and safety-safeguard false positives. It is positioning as the mature, plugin-extensible platform, but paying a trust tax for silent destructive behavior (transcript retention cleanup, Ctrl+C wiping input).

**OpenAI Codex** is the most desktop-app-centric: its issue tracker is dominated by Windows `app-server` failures affecting Browser Use and in-app browsing, while the top community demand (952 👍) is a Linux desktop build. The PR stream shows deep infrastructure work (gRPC proxy support, MCP OAuth, Windows sandbox ACLs) — an engineering-heavy iteration phase.

**Gemini CLI** is the most security-forward this cycle: four releases in 24 hours including bundled CVE patches and a quota-mapping fix. Its P1 bug culture around subagent reliability (MAX_TURNS misreporting, generalist hangs) shows a mature triage process, and its SGLang/OpenAI-compatible endpoint support targets self-hosted enterprise users.

**Copilot CLI** is the most stable but least active: no release and only 3 PRs. Its community is focused on enterprise governance — Windows plugin lifecycle, model routing transparency, compacted-context quality — but throughput is low relative to issue volume. The `tgrep` indexer OOM-killing hosts is a serious monorepo liability.

**Kimi Code** is the smallest community here (2 issues, 8 PRs) but shows disciplined engineering: ACP/wire hardening, `assert`-to-exception conversions, and TOCTOU race fixes. Its flagship demand — a persistent memory system — mirrors a broader ecosystem need.

**OpenCode** is emerging as the permissive/open-source alternative with a governance gap: permission bypasses, runaway retry costs, and plugin-import hangs dominate. Its PR stream (retry jitter/caps, npm timeout, cost accounting) shows active containment of trust issues.

**Pi** is the most TUI-polish-focused: edit-tool tolerance for real model output (whitespace-insensitive fuzzy matching, single-object normalization), Mermaid rendering in exports, copy-on-select control, and truthful clipboard feedback. Its reliance on Copilot auth creates a recurring fragility (WSL hangs, org-scale rate limits).

**Qwen Code** shipped the most releases and shows an aggressive multi-surface strategy: stable CLI, desktop app, and live-host runtime all updated in 24 hours. Its focus areas — headless correctness (stream-json false success), daemon session recovery, WebShell expansion, and third-party provider breadth — target automation-heavy users.

**DeepSeek TUI (CodeWhale)** is in a stabilization crunch: the v0.9 line introduced a set of regressions (Auto-Review blocking, layout, pricing display) that dominate the tracker, while maintainers push architecture simplification (32-field agent tool schema, crate decomposition). Its Windows pinning feature and OrcaRouter provider support show forward momentum despite the regression load.

## 5. Community Momentum & Maturity

**Rapidly iterating:** Qwen Code (6 releases/day across CLI, desktop, live-host) and Gemini CLI (security-patch-driven cadence, 4 releases) are the fastest movers. OpenAI Codex is release-active at alpha level with heavy infrastructure investment. Claude Code is iterating steadily but its community engagement is the highest relative to issue severity — the 64-comment thread on safety-safeguard false positives signals strong user investment.

**Stabilizing with heavy PR activity:** OpenCode and Pi both show 10 PRs with no release — active development happening below the release line. Pi's edit-tool fixes and OpenCode's retry/cost controls are addressing their most painful issues.

**Quiet but structurally sound:** Copilot CLI (3 PRs, no release) appears to be in a maintenance holding pattern, which is concerning given the volume of Windows plugin and memory issues. Kimi has minimal community mass but ships disciplined internal-quality fixes.

**Regressing and recovering:** DeepSeek TUI is absorbing v0.9 upgrade regressions while its maintainer-filed issues show architectural self-awareness. Grok Build is dormant.

**Most mature communities:** Claude Code and Codex have the deepest issue threads and most sophisticated user bases (plugin authors, multi-session workflows). **Fastest-growing concern surface:** Windows reliability appears in every tool's top issues — this is the clearest cross-tool opportunity for differentiation.

## 6. Trend Signals

**1. Honest status reporting is the next trust frontier.** Multiple tools ship false success signals: Qwen reports `"success"` with exit code 0 on API failure, Gemini labels MAX_TURNS termination as "GOAL," Claude stamps interrupted tools as "user-rejected," OpenCode shows "Copied" when clipboard writes fail. Agents that lie about their own state — even accidentally — will lose user trust faster than agents that fail loudly. Expect "truthful failure" to become a selling point.

**2. Watchdog and interrupt semantics need redesign.** The 600s stall watchdog, infinite retry loops, and background-completion leaks all stem from a common root: tools are killing or misattributing work that is actually still alive. Users are paying real money for these failures ($15+ per subagent invocation). Bounded retries with jitter (OpenCode, Pi) are the emerging best practice.

**3. Windows is the competitive battleground.** Every tool has a Windows failure cluster; no tool has fully solved it. The tool that delivers reliable Windows plugin lifecycle, sane path handling, and stable TUI input will capture disproportionate mindshare from enterprise users — who are predominantly Windows-based.

**4. Security response time is now a visible metric.** Gemini patched two critical CVEs within the same digest cycle. Qwen acknowledged npm vulnerabilities promptly. Cross-tool CVE responsiveness is becoming observable and comparable — security posture will factor into tool selection decisions.

**5. Permission models are the usability bottleneck for agentic autonomy.** The gap between "ask everything" and "allow everything" remains unfilled across all tools. Subagent permission bypasses (OpenCode) and Auto-Review regressions (DeepSeek) show that policy propagation down the agent tree is technically hard. Granular, inheritable, and auditable permission systems — not more model capability — will unlock autonomous workflows.

**6. Local and self-hosted model support is rising demand.** Gemini's SGLang/OpenAI-compatible endpoints, Pi's provider expansion (AIHubMix, Qwen CN), and DeepSeek's OrcaRouter gateway all target cost-controlled or air-gapped deployments. Hybrid-cloud agent architectures are an emerging requirement, not an edge case.

**7. MCP is entering the enterprise-auth phase.** OAuth metadata documents (CIMD), RFC 8414 issuer validation, and shared approval routing are the new MCP discussion topics — replacing "how do I connect" with "how do I govern." Interoperability failures (GitLab rejection, BigInt crashes) will drive standardization pressure.

**8. Context durability is the quiet UX crisis.** Compaction described as "recursively lossy" (Copilot), silent transcript deletion (Claude), and memory-system requests (Kimi, 34 comments) all point to the same user need: sessions should remember what matters and forget deliberately. Tools that solve durable memory with user control will differentiate as sessions grow longer and more valuable.

**Bottom line for decision-makers:** Evaluate AI CLI tools not on demo quality but on failure behavior — Windows stability, permission enforcement, status-reporting honesty, and billing predictability. The current competitive cycle is being won by whoever users can trust with unattended work.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

# Claude Code Community Digest — 2026-08-12

## Today's Highlights

Release **v2.1.228** landed with fixes for TUI redraw hangs, Windows git detection, and `/tui` behavior. Community attention remains concentrated on data-loss and trust issues: the silent transcript-retention cleanup (#59248) and the CVP cyber-safeguard regression (#84352) continue to draw the heaviest engagement, while a fresh critical report (#86000) claims all Bash tool commands hang on macOS in the latest build. Windows input-handling bugs and billing/session-limit anomalies are also forming distinct clusters worth watching.

## Releases

**v2.1.228**
- Fixed interactive sessions that could stop redrawing entirely (while the process kept running) after a rare internal layout error
- Fixed `git` / Git Bash not being found on Windows when Claude Code is launched from a parent folder of the git installation
- Fixed `/tui` revert behavior

---

## Hot Issues

**1. [CVP-approved org still receives cyber-safeguard blocks in Claude Code](https://github.com/anthropics/claude-code/issues/84352)** — 64 comments · 8 👍
A Claude.ai organization with prior Cyber Verification Program approval is again blocked by cyber-safeguards; the Verification Portal shows the same application as "Under review" despite the earlier approval email. The 64-comment thread signals a broad community concern about false-positive safety blocks and opaque appeal status.

**2. [Silent retention cleanup deletes session transcripts with no warning, opt-in, or recovery](https://github.com/anthropics/claude-code/issues/59248)** — 31 comments · 18 👍
Users lose all conversation transcripts older than the current session, including prior-day sessions, with no prompt or recovery path. The high 👍 count and "data-loss" label make this the most urgent trust issue in the tracker.

**3. [Claude Desktop MSIX: CIG + vendor-signed `vk_swiftshader.dll` kills GPU process on every browser preview (0x060C201E)](https://github.com/anthropics/claude-code/issues/81341)** — 15 comments · 2 👍
Windows users on MSIX builds crash on every browser preview because Microsoft Signed Only signing enforcement conflicts with the vendor-signed SwiftShader DLL. Impacts all Desktop browser-pane workflows on Windows.

**4. [Ctrl+C and Ctrl+Shift+C silently clear prompt input with no confirmation or recovery](https://github.com/anthropics/claude-code/issues/59408)** — 14 comments · 10 👍
On Windows, pressing Ctrl+C (or with Shift) wipes the entire prompt input without confirmation — a silent data-loss footgun during long prompt composition.

**5. [Feature: Enter/resume existing worktrees, configurable branch naming, hook removal control](https://github.com/anthropics/claude-code/issues/31969)** — 8 comments · 31 👍
The most-upvoted open feature request. Plugin authors building multi-session worktree workflows (e.g., [benkruger/flow](https://github.com/benkruger/flow)) need first-class support for resuming existing worktrees, custom branch naming, and hook lifecycle control. Strong signal that advanced users are hitting plugin API limits.

**6. [Windows: Shift+Enter does not insert newline — terminal protocol limitation requires Win32 input support](https://github.com/anthropics/claude-code/issues/77311)** (+ [duplicate #80817](https://github.com/anthropics/claude-code/issues/80817)) — 3 comments each · 1 👍
Documented and configurable `chat:newline` keybinding silently fails on Windows Terminal — the keypress is simply ignored. Duplicate reports indicate this is reproducible and widely encountered.

**7. [Async agent stall watchdog kills healthy long-running requests at 600s timeout](https://github.com/anthropics/claude-code/issues/85265)** — 1 comment
Background subagents are killed at exactly 600s (`CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`) when the model's time-to-first-chunk exceeds the threshold. The work is still alive, but the task is reported "failed" — causing wasted tokens and false failures on slow/loaded models.

**8. [Interrupting a tool mid-execution is stamped `non_execution_kind: "user-rejected"`](https://github.com/anthropics/claude-code/issues/86001)** — new
The harness tells the model a tool "was rejected / did not run" even when it was already executing and interrupted — despite the engine enum having a dedicated `"interrupted"` value. This corrupts the model's understanding of system state and can lead to wrong follow-up actions.

**9. [All Bash tool commands hang indefinitely — no child process spawned (macOS, v2.1.228)](https://github.com/anthropics/claude-code/issues/86000)** — new
Potentially critical regression in the latest release: every Bash tool invocation hangs with no child process created. If widespread, this effectively bricks Bash-dependent workflows on macOS.

**10. [Auto-reload disabled, but two Individual-plan auto-recharges still completed ($99.08)](https://github.com/anthropics/claude-code/issues/85937)** — new
A user with auto-reload explicitly disabled was still charged twice. The issue references a long history of similar billing threads (#14857, #25647, #68773, #29108, #53292), indicating a recurring trust problem with usage-based billing.

---

## Key PR Progress

**1. [add the missing source to claude code](https://github.com/anthropics/claude-code/pull/41611)** — open
An old, still-open PR adding a missing source entry. Low detail, but its longevity highlights how lightly-maintained community PRs can linger.

**2. [examples: Add MEP (Meat Puppet Elimination Protocol) — async state relay for multi-machine AI sessions](https://github.com/anthropics/claude-code/pull/42996)** — open
A self-enforcing pattern for eliminating context loss when switching machines or resuming sessions. Three files, zero new infrastructure — useful reference for developers running Claude Code across machines.

**3. [Scope `child_process_exec` to JS/TS files (fix Python false-positive)](https://github.com/anthropics/claude-code/pull/57888)** — closed
Fixes the `security_reminder_hook.py` rule that substring-matches `"exec("`, which falsely flags Python's `asyncio.create_subprocess_exec()`. Closed, but the underlying issue is worth monitoring.

**4. [docs: point remaining stale doc links at code.claude.com](https://github.com/anthropics/claude-code/pull/85925)** — open
Follow-up cleanup swapping old `docs.claude.com` redirect links for canonical `code.claude.com` targets across plugins, skills, agents, commands, and issue templates.

**5. [fix: HackerOne Bug Bounty Program access issue](https://github.com/anthropics/claude-code/pull/85834)** — open
Adjusts `devcontainer.json` so the `hookify` plugin installs correctly and enables access to the HackerOne Bug Bounty Program. Notable for the security-research workflow it enables.

**6. [fix(commit-commands): detect `[gone]` branches with `git branch -vv` in clean_gone](https://github.com/anthropics/claude-code/pull/70173)** — closed
Fixes `/clean_gone` never deleting anything: `git branch -v` doesn't show `[gone]`; the command must use `-vv`. A practical fix for a commonly used cleanup command.

**7. [docs: fix stale doc links and README drift in plugins and examples](https://github.com/anthropics/claude-code/pull/85822)** — open
Docs-only cleanup with every change verified against live redirects and referenced plugin files — a good model for contribution hygiene.

**8. [fix(security-guidance): skip XSS warnings in docs](https://github.com/anthropics/claude-code/pull/85806)** — open
Reuses the existing `_DOC_EXTS` path filter so four XSS-family substring rules don't fire on documentation/prose, while preserving warnings for executable source files. Adds regression coverage.

**9. [fix(skills): use spec-conformant names in the plugin-dev and hookify skills](https://github.com/anthropics/claude-code/pull/85243)** — open
Eight bundled skills declare title-cased `name:` fields containing spaces, violating the skills spec. Renames them to spec-conformant identifiers — relevant to anyone building or validating skills.

**10. [fix(hookify): load rules from ancestor `.claude` directories to prevent silent bypass](https://github.com/anthropics/claude-code/pull/85716)** — open
Fixes #85613: the `hookify` config loader silently misses security rules in ancestor `.claude` directories, allowing rules to be bypassed depending on the working directory. Important security-facing fix for plugin users.

---

## Feature Request Trends

- **Git worktree & session-branch management** — The strongest signal (31 👍 on #31969, plus new requests [#85998](https://github.com/anthropics/claude-code/issues/85998) to honor documented branch-naming conventions and [#85997](https://github.com/anthropics/claude-code/issues/85997) to show branch/worktree in the desktop UI). Users want Claude Code to be a first-class multi-session git citizen.
- **Windows input & keybinding parity** — Shift+Enter newline, Ctrl+C prompt protection, and Win32 input support recur across issues (#77311, #80817, #59408). Windows Terminal users are disproportionately affected by TUI input gaps.
- **Quota and usage control** — Requests to reserve a percentage of quota for specific tasks (#81554), plus billing complaints (#85937, #85992), point to a desire for finer-grained, predictable usage management.
- **Plugin/hook lifecycle control** — Removal control, ancestor-directory rule loading, and hook isolation continue to appear in both issues and PRs.

---

## Developer Pain Points

- **Silent data loss** — Transcripts deleted by retention cleanup (#59248), prompt input wiped by Ctrl+C (#59408), tool interruptions mislabeled as rejections (#86001). The common thread: destructive actions without warnings or accurate reporting.
- **Unreliable background execution** — The 600s stall watchdog killing healthy agents (#85265) and the macOS Bash hang regression (#86000) undermine trust in unattended/agentic workflows.
- **Billing and quota surprises** — Auto-recharges despite disabled auto-reload (#85937), 5-hour session limits exhausted in minutes (#85992), and free runs burned on failed Ultrareview init (#85993) — all erode confidence in usage accounting.
- **Safety-guard false positives** — CVP-approved orgs still blocked (#84352), subagent classifier denials in Auto mode (#85982), and CVP exemption-page loops (#85996) suggest safety tooling is both over-blocking and hard to appeal.
- **Auth/platform regressions** — Bedrock OAuth redirect URI sunset (`localhost:55385`) breaking SDK auth (#86002) and Windows git-detection issues (fixed in v2.1.228) show platform integration churn is a recurring tax on users.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-12

## Today’s Highlights

The Codex repo published three Rust alpha releases while the issue tracker remained dominated by Windows desktop app reliability problems, especially `app-server` startup failures affecting Browser Use and in-app browser features. PR activity centered on MCP approval handling, gRPC code-mode networking, and Windows sandbox fixes. The most upvoted community ask is still a native Linux desktop app.

## Releases

- [rust-v0.148.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.9)
- [rust-v0.148.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.8)
- [rust-v0.148.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.7)

Three `rust-v0.148.0-alpha.x` releases landed in the last 24 hours; no changelog details were attached.

## Hot Issues

- [openai/codex#11023](https://github.com/openai/codex/issues/11023) — **Codex desktop app for Linux**  
  Despite being closed, this is the top community request: 952 👍 and 208 comments. Users want a Linux desktop build, especially because the macOS app is reportedly unusable for some setups.

- [openai/codex#23930](https://github.com/openai/codex/issues/23930) — **Subagent cards can remain stuck after close**  
  In the desktop app, closed subagents sometimes stay visible in the UI even after the backend reports no live agent. Ongoing UI-state cleanup issue with 17 comments.

- [openai/codex#19423](https://github.com/openai/codex/issues/19423) — **Desktop in-app browser cannot inspect external pages on Windows**  
  The app-server helper fails to start on Windows, blocking external page inspection from the in-app browser. 16 comments.

- [openai/codex#19187](https://github.com/openai/codex/issues/19187) — **Windows Browser Use fails during external navigation**  
  `nodeRepl.fetch` can’t start `codex app-server`, so external navigation fails even though the in-app browser tab is detected. One of the most upvoted Windows issues in this set: 22 👍, 14 comments.

- [openai/codex#20206](https://github.com/openai/codex/issues/20206) — **Browser Use fails with “os error 3” on Windows**  
  Another Windows app-server startup failure, with localized “path not found” errors. 12 comments.

- [openai/codex#37403](https://github.com/openai/codex/issues/37403) — **macOS regression: remote control / CLI thread cannot resume**  
  After the August 7 desktop update, resuming a CLI thread via ChatGPT mobile Remote Control fails with `already has an active writer`. 11 comments and 9 👍.

- [openai/codex#20048](https://github.com/openai/codex/issues/20048) — **Windows Browser Use fails even when npm CLI works**  
  The desktop app cannot start `app-server` despite the standalone CLI functioning. 10 comments, 7 👍.

- [openai/codex#25221](https://github.com/openai/codex/issues/25221) — **Windows AppsFolder launch opens Chrome and exits**  
  Launching Codex Desktop from the Start menu / AppsFolder path opens Chrome but the app window never stays up; direct `Codex.exe` launch works. 9 comments.

- [openai/codex#23222](https://github.com/openai/codex/issues/23222) — **In-app browser commands stopped working**  
  Manual in-app browsing works, but Codex-driven browser commands fail on Windows. 9 comments, 3 👍.

- [openai/codex#26011](https://github.com/openai/codex/issues/26011) — **Stale MCP paths in config.toml after auto-update**  
  Windows auto-updates leave old bin paths in `config.toml`, causing `node_repl` MCP startup to fail with `os error 3`. 9 comments, 4 👍.

## Key PR Progress

- [openai/codex#38108](https://github.com/openai/codex/pull/38108) — **Route MCP tool calls through shared approval handling**  
  MCP calls now go through the session-level approval flow for permission hooks, reviewer selection, rejection handling, and telemetry.

- [openai/codex#38101](https://github.com/openai/codex/pull/38101) — **Attach hosted app context to file uploads**  
  File creation requests for hosted app tool calls now include connector ID, action name, and model context.

- [openai/codex#38089](https://github.com/openai/codex/pull/38089) — **Add CIMD support to MCP OAuth registration**  
  MCP OAuth now prefers Client ID Metadata Documents when using the native loopback callback, with fallback to Dynamic Client Registration.

- [openai/codex#38087](https://github.com/openai/codex/pull/38087) — **Route gRPC code-mode sessions through shared HTTP client**  
  gRPC code-mode connections now support outbound proxy and custom CA configuration via `HttpClientFactory`.

- [openai/codex#38086](https://github.com/openai/codex/pull/38086) — **Support execution-host context when resolving cloud config**  
  `~` paths can be resolved against an explicitly supplied home directory, improving cloud config behavior under execution-host overrides.

- [openai/codex#38081](https://github.com/openai/codex/pull/38081) — **Use `ReviewDecision` for MCP tool approvals**  
  MCP approval responses now share the same decision path as other tools, including persistent policy amendments and rejection reasons.

- [openai/codex#38080](https://github.com/openai/codex/pull/38080) — **Allow nested Git repositories in the Windows sandbox**  
  Adds worktree-root wildcard trust so nested repositories are available to commands running as the sandbox user.

- [openai/codex#38064](https://github.com/openai/codex/pull/38064) — **Grant Windows sandbox access to the Codex app root**  
  Applies read/execute ACLs to the local Codex application root, while still handling the managed runtime cache separately.

- [openai/codex#38075](https://github.com/openai/codex/pull/38075) — **Respect rendered width when adding TUI history**  
  TUI chat widgets now use current terminal width and active history render mode when determining visibility of added cells.

- [openai/codex#38074](https://github.com/openai/codex/pull/38074) — **Track implicit executor skill invocations**  
  Adds analytics for executor-owned skill reads and script executions across native and URI-based working directories.

## Feature Request Trends

- **Linux desktop app remains the single clearest feature demand.**  
  [openai/codex#11023](https://github.com/openai/codex/issues/11023) has 952 👍 and 208 comments, far outpacing every other request in the dataset.

- **Cross-platform desktop parity is an implicit priority.**  
  Most Windows issues are bugs, not feature requests, but they collectively signal that users expect the desktop app and its bundled browser/computer-use tooling to work as reliably on Windows as on macOS.

- **Plugin marketplace robustness after updates.**  
  Several issues describe installed plugins disappearing or becoming untrusted after desktop updates, suggesting users want stable plugin lifecycle behavior across auto-updates.

## Developer Pain Points

- **Windows `app-server` startup failures** are the largest recurring cluster, often surfacing as `failed to start codex app-server: (os error 3)` or “path not found” errors. Affects Browser Use, in-app browser, and remote-control flows: [#19423](https://github.com/openai/codex/issues/19423), [#19187](https://github.com/openai/codex/issues/19187), [#20206](https://github.com/openai/codex/issues/20206), [#20048](https://github.com/openai/codex/issues/20048).

- **Stale paths and caches after Windows auto-update.**  
  Multiple reports show `config.toml` MCP paths, bundled marketplace caches, and helper binaries pointing to removed directories after updates: [#26011](https://github.com/openai/codex/issues/26011), [#23831](https://github.com/openai/codex/issues/23831), [#28277](https://github.com/openai/codex/issues/28277).

- **macOS regression risk in remote-control workflows.**  
  The “already has an active writer” error after the latest desktop update broke a previously working mobile-to-desktop resume flow: [#37403](https://github.com/openai/codex/issues/37403).

- **Desktop app UI state inconsistencies.**  
  Stuck subagent cards and disconnected extension states erode trust in the app UI: [#23930](https://github.com/openai/codex/issues/23930), [#21741](https://github.com/openai/codex/issues/21741).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-12

## Today's Highlights

The v0.56.0 nightly line shipped a meaningful reliability fix: false model capacity exhaustion errors are resolved, and the core quota lookup mapping is corrected (PR #28730). On the security front, two critical dependency CVEs (shell-quote CVE-2026-9277 and simple-git CVE-2026-28292) rapidly received upgrade PRs, continuing this repo's active hardening trend. Community attention remains fixed on subagent trust and reliability, with the generalist agent hang (#21409, 8 👍) and MAX_TURNS misreporting (#22323, 12 comments) still open as P1 bugs.

---

## Releases

**v0.56.0-nightly.20260812.g5024443c7**
- Fixes false model capacity exhaustion errors and corrects the core quota lookup model mapping (PR #28730), preserving the "Keep trying" UI option during transient capacity surges.
- Adds a local eval report command and developer documentation for behavioral evaluations (PR #28369).

**v0.56.0-preview.1**
- Version bump to 0.56.0-nightly.20260806.g761f604c1 and changelog prep for the preview series.

**v0.55.1**
- Patch release: fixes release verification to respect `npm ci --ignore-scripts` and prevents workspace binary shadowing in CI.
- Includes tool registry groundwork.

**v0.55.0-preview.3**
- Cherry-picks a fix from `release/v0.55.0-preview.2-pr-28730` to patch the preview.2 branch.

---

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1, 12 comments. `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` even when it hit the max turn limit before doing any analysis. Misleading agent status undermines trust in multi-agent workflows that depend on accurate termination signals.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1, 8 👍 (highest community reaction today). Any deferral to the generalist agent hangs indefinitely — even simple folder creation. The only workaround is instructing the model never to use subagents.

3. **[#25166 — Shell command execution stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1, 3 👍. Trivially simple CLI commands finish but the UI keeps showing them as active and "Awaiting user input," requiring user intervention.

4. **[#22186 — get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)** — P1. A reproducible crash when the output hook is nearly finished printing the user summary, in a common container/database orchestration flow.

5. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — P1, 1 👍. The browser subagent fails on Wayland sessions, which is increasingly common on modern Linux distributions.

6. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** — P2, 5 comments. Sessions the extraction agent deems low-signal are never marked processed, so they surface repeatedly and waste background agent cycles.

7. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — P2 security. Transcript content is sent to the extraction model before any redaction prompt runs, and the service can log existing skill contents — a privacy gap for sensitive workspaces.

8. **[#19873 — Leverage model's bash affinity via Zero-Dependency OS Sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)** — P2 enhancement, 8 comments. Proposes sandboxing Gemini 3's native POSIX/bash tool-chaining while preserving UX and security — one of the more active design discussions.

9. **[#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** — P2 EPIC, 7 comments. Tracks investigations into AST-aware tools for precise method-bound reads, reduced token noise, and better codebase navigation.

10. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** — P2, 6 comments. Anecdotal but widely resonant: the model ignores custom skills (e.g., `gradle`, `git`) unless explicitly instructed, even for highly relevant tasks.

---

## Key PR Progress

1. **[#28730 — fix(core,cli): resolve false model capacity exhaustion and fix core quota lookup model mapping](https://github.com/google-gemini/gemini-cli/pull/28730)** — Merged into nightly. Corrects client-side quota mapping, fixes misleading capacity errors, and preserves retry UI during transient capacity surges.

2. **[#28691 — fix(core): block $VAR and ${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28691)** — P1 security. Closes an incomplete check in `detectBashSubstitution()`/`detectPowerShellSubstitution()` that let variable expansion patterns bypass the earlier security gate; includes workflow hardening.

3. **[#28557 — fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution](https://github.com/google-gemini/gemini-cli/pull/28557)** — Closed. Fixes #28555: `isBlockedHost` only flagged literal IPs, letting hostnames resolving to `169.254.169.254` or other internal ranges pass validation.

4. **[#28780 — fix: upgrade shell-quote to 1.8.4 (CVE-2026-9277)](https://github.com/google-gemini/gemini-cli/pull/28780)** — CRITICAL severity, flagged by Trivy in `package-lock.json`. Immediate dependency bump for the shell-quoting parser.

5. **[#28778 — fix: upgrade simple-git to 3.32.3 (CVE-2026-28292)](https://github.com/google-gemini/gemini-cli/pull/28778)** — CRITICAL severity, also Trivy-flagged. Upgrades the git wrapper from 3.28.0 to 3.32.3.

6. **[#28681 — feat(core,cli): add support for SGLang and local OpenAI-compatible endpoints](https://github.com/google-gemini/gemini-cli/pull/28681)** — Large P1 feature enabling self-hosted/local model backends, a frequent community request for air-gapped and cost-controlled setups.

7. **[#28680 — fix(core): reject A2A openIdConnect auth during validation](https://github.com/google-gemini/gemini-cli/pull/28680)** — Fixes #28651. Previously the CLI validated A2A OpenID Connect configs as valid, then failed at runtime; validation now rejects them upfront.

8. **[#28678 — fix(core): prevent OAuth callback timeout leak and release resources](https://github.com/google-gemini/gemini-cli/pull/28678)** — Resolves #28652. Centralizes OAuth callback server settlement and cleanup to stop stale timeout callbacks and memory leaks.

9. **[#28369 — feat(evals): add local report command and developer documentation](https://github.com/google-gemini/gemini-cli/pull/28369)** — Merged. Adds `npm run eval:report` to aggregate pass rates by model from Vitest `report.json` files with inventory policy mapping.

10. **[#28729 — fix(core): resolve swallowed directory mismatch in IDE connections](https://github.com/google-gemini/gemini-cli/pull/28729)** — Closed. Fixes connection failures under Cider and VS Code fork/remote workspaces where virtual or different FUSE directory paths caused candidate port files to be silently skipped.

---

## Feature Request Trends

- **Security hardening is the dominant theme.** The repo is actively shipping SSRF protections, variable-expansion bypass fixes, critical CVE upgrades, and OAuth resource cleanup — plus deterministic secret redaction for Auto Memory (#26525).
- **Agent reliability and resilience.** Repeated asks for browser session takeover/lock recovery (#22232), subagent trajectory visibility via `/chat share` (#22598), and better termination-state reporting (#22323).
- **Local/self-hosted model support.** SGLang and OpenAI-compatible endpoints (#28681) signal strong demand for running Gemini CLI against private or alternative backends.
- **AST-aware code navigation.** An EPIC cluster (#22745, #22746) is investigating AST-aware reads, search, and codebase mapping to cut token noise and improve precision.
- **Evaluation infrastructure.** Component-level evaluations (#24353) and local report tooling (#28369) show growing investment in systematic behavioral testing.
- **Sandboxed execution.** Zero-dependency OS sandboxing (#19873) to safely harness the model's native bash affinity.

---

## Developer Pain Points

- **Subagent misreporting and hangs.** MAX_TURNS reported as "GOAL success" (#22323), the generalist agent hanging forever (#21409), and browser agent failures on Wayland (#21983) all erode confidence in multi-agent execution.
- **Terminal and shell execution issues.** Commands stuck at "Waiting input" after completion (#25166), get-shit-done output hook crashes (#22186), and terminal resize flicker (#21924) hurt day-to-day interactive UX.
- **Memory system reliability and privacy.** Indefinite retries of low-signal sessions (#26522), silent skipping of invalid inbox patches (#26523), and content sent to model context before redaction (#26525).
- **Proactive skill adoption.** Users report the model won't leverage custom skills or subagents without explicit prompting (#21968) — a capability gap vs. the agent's own tooling.
- **Authentication friction.** Vertex AI 401 errors with API-key-only setups (#28679), OAuth redirect failures in Cloud Workstations (#28688), and invalid A2A OpenID configs passing validation (#28680) remain common onboarding and enterprise blockers.
- **Config and permission surprises.** Agents running despite being disabled (#22093), settings.json overrides ignored by the browser agent (#22267), and symlinked agent files not recognized (#20079) point to inconsistent configuration semantics.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-12

## Today’s Highlights
No new release shipped in the last 24 hours, but community attention is concentrated on Windows plugin permission failures and memory/resource regressions in large sessions and monorepos. Newer triage issues also highlight emerging friction around model routing, skill deduplication, and context durability across compactions.

## Releases
None in the last 24 hours.

## Hot Issues

1. **Transcript goes blank during incremental scrolling**  
   [#4311](https://github.com/github/copilot-cli/issues/4311) — [CLOSED]  
   A confusing terminal-rendering bug that now appears fixed in 1.0.79. The author corrected their initial ScrollBox explanation, which helped maintainers isolate renderer behavior.

2. **Windows plugin install fails with “Access is denied (os error 5)”**  
   [#4151](https://github.com/github/copilot-cli/issues/4151) — [OPEN]  
   Plugin installation fails 100% of the time on Windows 11, regardless of source: marketplace, GitHub repo, or local directory. This is a hard blocker for Windows users adopting plugins.

3. **Windows plugin update fails while VS Code is running**  
   [#4095](https://github.com/github/copilot-cli/issues/4095) — [OPEN] — 👍 14  
   The Copilot extension holds watcher handles on the installed-plugins directory, so `copilot plugin update` fails with the same `os error 5`. High community reaction suggests this is a widespread enterprise pain point.

4. **Copilot CLI cannot serialize BigInt in structured MCP responses**  
   [#4211](https://github.com/github/copilot-cli/issues/4211) — [OPEN]  
   When an MCP server returns large numbers, the CLI throws `Do not know how to serialize a BigInt` and aborts all ongoing tasks. Critical for MCP users relying on numeric-heavy tools.

5. **Resuming large sessions OOMs / pegs one CPU core for ~70 minutes**  
   [#4251](https://github.com/github/copilot-cli/issues/4251) — [OPEN]  
   A regression in 1.0.74 causes ~3–4× memory usage when resuming large sessions. The author provides a useful A/B table isolating the version regression, which should help maintainers reproduce.

6. **Using `/model config` wipes all settings**  
   [#4431](https://github.com/github/copilot-cli/issues/4431) — [CLOSED]  
   In 1.0.79, setting a user-wide model via `/config model` overwrites the entire `settings.json`. Data-loss bugs like this are highly disruptive and were quickly closed, presumably with a fix pending.

7. **All Claude models disabled under CLI model selection for Enterprise**  
   [#4422](https://github.com/github/copilot-cli/issues/4422) — [OPEN] — 👍 3  
   Claude models disappeared for a personal Enterprise account even though they remain enabled in GitHub Copilot settings. Rolling back the CLI did not help, suggesting a policy/server-side change.

8. **Rubber Duck reviews sometimes use the same model family as the primary session**  
   [#4380](https://github.com/github/copilot-cli/issues/4380) — [OPEN]  
   The adversarial-review subagent should pick an independent model family, but users observe it using the primary session’s family — reducing the value of “rubber duck” reviews.

9. **Native `tgrep` indexer OOM-kills hosts on large monorepos**  
   [#3976](https://github.com/github/copilot-cli/issues/3976) — [OPEN]  
   The `tgrep` trigram indexer has no upper bound on memory usage and can kill the entire host during indexing. This is especially serious for monorepo users with the experiment flag enabled.

10. **GitLab MCP OAuth metadata rejected due to RFC 8414 issuer mismatch**  
    [#4439](https://github.com/github/copilot-cli/issues/4439) — [OPEN]  
    Copilot CLI 1.0.79 rejects GitLab Self-Managed MCP servers using OAuth 2.0 Dynamic Client Registration. Interoperability issues like this slow MCP adoption in mixed environments.

## Key PR Progress
Only 3 pull requests were updated in the last 24 hours.

1. **Migrate pull request automation away from `pull_request_target`**  
   [#4449](https://github.com/github/copilot-cli/pull/4449) — [OPEN]  
   Draft PR that moves PR-driven workflows off `pull_request_target` to reduce security risk. Untrusted PR input stays in lower-privilege workflows; repository-write actions move to safer handlers.

2. **Revert “5 copilot/fix with copilot”**  
   [#4452](https://github.com/github/copilot-cli/pull/4452) — [CLOSED]  
   A quick revert PR, closed already — likely a bot or automation experiment that was undone.

3. **Add initial devcontainer configuration**  
   [#4428](https://github.com/github/copilot-cli/pull/4428) — [OPEN]  
   Adds a devcontainer setup for the repo, useful for contributors who want a consistent development environment.

## Feature Request Trends

- **Granular permission and approval controls**  
  Users want auto-allow settings, read-only vs. write distinctions for commands outside the working directory, and explicit per-file acceptance/rejection in edit workflows.

- **Context durability and compaction quality**  
  Repeated compaction is described as “recursively lossy.” There is demand for preserving durable context and early decisions across multiple compaction cycles.

- **Enterprise policy and configuration management**  
  Requests include enforcing sandbox usage and pushing CLI configuration from GitHub Enterprise, indicating a need for org-level governance.

- **Model routing transparency and reliability**  
  Issues around rubber-duck model selection, `auto` mode picking unavailable models, and delegated subagents spending credits on unexpected models point to a need for clearer and more predictable model routing.

- **Cross-tool ecosystem compatibility**  
  Users want `.claude/rules` support, better MCP OAuth interoperability, and deduplication of skills loaded from both repository and plugins.

## Developer Pain Points

- **Windows plugin lifecycle is broken**  
  Install and update failures (`os error 5`) are the most visible Windows issue, especially when VS Code is running. Strong 👍 counts show this is one of the most painful current blockers.

- **Memory/resource blowups are recurring**  
  Large-session resume OOMs and the `tgrep` daemon OOM-killing hosts are serious reliability concerns for professional users with large codebases.

- **Settings and context loss erodes trust**  
  `/model config` wiping settings and compaction degrading context are high-impact because they silently destroy user work or history.

- **Model selection surprises lead to cost/quality problems**  
  Unexpected model delegation, unavailable model choices in `auto` mode, and rubber-duck reviewers using the same model family all reduce confidence in the CLI’s model governance.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest — 2026-08-12

**Source:** `github.com/MoonshotAI/kimi-cli`

### Today’s Highlights

No new release shipped in the last 24 hours. The most notable community activity centers on a long-running memory-system feature request (#1283, 34 comments) and a newly filed request for quote-and-reply on AI responses (#2601). On the code side, eight PRs saw updates: one open PR adds configurable thinking effort, and seven closed PRs focus on hardening ACP/wire internals, file-tool edge cases, packaging, and shell-command routing.

### Releases

None in the last 24 hours.

### Hot Issues

Only 2 Issues were updated in the last 24 hours; both are open.

- **[#1283 — [enhancement] Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)**
  - Requests a comprehensive memory layer so the CLI can persist useful context, project patterns, and user preferences across sessions, including both automatic and manual memory.
  - **Why it matters:** This is a core usability gap for agentic CLI tools: without context persistence, users must repeatedly re-explain project conventions.
  - **Community reaction:** Long-lived discussion with 34 comments and no maintainer closure, indicating sustained interest and unresolved design questions.

- **[#2601 — [Feature Request] Quote & Reply: comment on any selected part of an AI response in Kimi Web](https://github.com/MoonshotAI/kimi-cli/issues/2601)**
  - Requests the ability to select a specific span of an AI response — paragraph, code block, plan step, or diff line — and attach a follow-up comment/question directly to that selection.
  - **Why it matters:** Enables precise, context-anchored follow-ups instead of re-pasting large response chunks.
  - **Community reaction:** Filed 2026-08-11; no comments yet, so it is an early-stage signal.

### Key PR Progress

8 PRs were updated in the last 24 hours. Status as shown: 1 open, 7 closed.

- **[#2509 — feat(kimi): configurable thinking effort and /effort command](https://github.com/MoonshotAI/kimi-cli/pull/2509)**
  - Open. Resolves #2501 and builds on legacy `reasoning_effort` support. Adds user-controllable thinking effort, likely via a `/effort` command.
  - **Why it matters:** Gives developers explicit control over reasoning depth vs. latency/cost.

- **[#2057 — fix(acp): replace assert statements with proper RuntimeError exceptions](https://github.com/MoonshotAI/kimi-cli/pull/2057)**
  - Replaces 5 `assert` statements in `acp/session.py` with `RuntimeError` checks so invariants are not stripped by Python’s `-O` flag.

- **[#2056 — fix(wire): eliminate TOCTOU race in WireFile.append_record](https://github.com/MoonshotAI/kimi-cli/pull/2056)**
  - Fixes a check-then-use race between `path.exists()` and `path.stat()` where a deleted file could cause an unhandled error.

- **[#2055 — fix(agentspec): replace assert with proper AgentSpecError exception](https://github.com/MoonshotAI/kimi-cli/pull/2055)**
  - Converts `assert agent_spec.extend is None` into a production-safe `AgentSpecError`, again protecting against `-O` stripping.

- **[#1328 — Fix minor bugs in file tools and UI feedback](https://github.com/MoonshotAI/kimi-cli/pull/1328)**
  - Fixes replacement-count calculation for cumulative edits in `StrReplaceFile`, plus minor UI feedback issues.

- **[#1082 — fix(pyinstaller): filter non-existent dateparser cache files](https://github.com/MoonshotAI/kimi-cli/pull/1082)**
  - Prevents PyInstaller collection failures when the lazily generated `dateparser_tz_cache.pkl` does not exist in fresh/CI environments.

- **[#1077 — fix: remove redundant mode validation in WriteFile tool](https://github.com/MoonshotAI/kimi-cli/pull/1077)**
  - Removes duplicated runtime validation of the `mode` parameter in `src/kimi_cli/tools/file/write.py`.

- **[#1393 — fix(acp): route shell commands through terminal args](https://github.com/MoonshotAI/kimi-cli/pull/1393)**
  - Fixes ACP shell execution to pass the shell executable in `command` and the invocation in `args`, adapts to the current ACP SDK `terminal_id` shape, and adds regression tests for bash/PowerShell.

### Feature Request Trends

Based on the updated Issues this cycle, the dominant feature directions are:

- **Persistent memory and cross-session context** — #1283 is the clearest signal: automatic memory, manual memory, project patterns, and user preferences should survive across sessions.
- **Precise, context-anchored follow-up on AI output** — #2601 asks for quote-and-reply on any selected part of an assistant response, enabling targeted comments on code blocks, plan steps, or diff explanations.
- **Adjacent trend visible in PR activity:** configurable reasoning/thinking effort (#2509, related to #2501/#318) indicates user demand for controlling model deliberation per session or command.

### Developer Pain Points

Recurring frustrations and reliability issues visible from the latest PRs and issues:

- **Context loss between sessions** — Users must repeatedly re-explain project state and preferences; the memory-system request is a direct response to this.
- **Inability to reference specific parts of an AI response** — Vague or costly follow-ups because there is no way to anchor a question to a particular line/block.
- **Unsafe `assert` usage in production code** — Multiple PRs (#2057, #2055) replace `assert` with real exceptions because `-O` strips assertions.
- **Race conditions and file-tool edge cases** — TOCTOU in wire-file append (#2056), cumulative edit-count mismatches (#1328), and redundant validation (#1077).
- **Packaging fragility with lazily generated files** — PyInstaller builds break when optional cache files are absent (#1082).
- **ACP terminal/shell integration mismatches** — Shell command routing needed alignment with the current ACP SDK response shape (#1393).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-12

## Today’s Highlights

No release shipped in the last 24 hours, but a dense batch of reliability and UX PRs advanced: session retry logic is being bounded with jitter, provider-reported costs are now preferred for accounting, and several TUI/Windows edge cases received concrete fixes. Community attention remains focused on runaway retry loops, subagent permission bypasses, and file-viewer/TUI polish gaps.

## Releases

No new OpenCode releases were published in the last 24 hours.

## Hot Issues

1. [**#6618 — `@` is not listing the available files**](https://github.com/anomalyco/opencode/issues/6618)  
   A regression in `@` autocomplete: only agents are listed, while file paths like `.ai/prompts/init.md` are no longer discoverable. High community impact for everyday workflow. *(15 comments, 👍 10)*

2. [**#12609 — System prompts force ASCII-only output, breaking non-English languages**](https://github.com/anomalyco/opencode/issues/12609)  
   The system prompt’s “Default to ASCII” instruction biases models against non-ASCII text, harming international users. *(10 comments, 👍 13)*

3. [**#14187 — [FEATURE] Add markdown preview toggle in file viewer sidebar**](https://github.com/anomalyco/opencode/issues/14187)  
   Strong demand for rendered markdown/mdx preview instead of raw source while browsing files. *(9 comments, 👍 27)*

4. [**#16885 — JSON→SQLite one-time migration reruns on channel-specific DBs**](https://github.com/anomalyco/opencode/issues/16885)  
   Local/dev builds re-run a supposedly one-time migration on every launch, creating data-integrity risk for non-`latest` channels. *(9 comments)*

5. [**#17169 — Subagent enters infinite retry loop on edit/write tool failure**](https://github.com/anomalyco/opencode/issues/17169)  
   A failed edit tool call can trigger endless retries, with users reporting **$15+ per subagent invocation** in API costs. *(6 comments)*

6. [**#31463 — Plugin import hangs silently when resolving npm specifiers**](https://github.com/anomalyco/opencode/issues/31463)  
   OpenCode hangs on startup with a cold npm cache when plugins use `@latest` npm specifiers. Root cause traced to Arborist’s `Npm.add()`. *(5 comments, still open)*

7. [**#29099 — TUI system notifications do not fire under zellij/tmux**](https://github.com/anomalyco/opencode/issues/29099)  
   Desktop notifications work via `notify-send`, but OpenCode’s terminal-mediated notifications fail inside multiplexers. *(8 comments)*

8. [**#25254 — Doom loop detection misses cross-message repetitions and has inverted filter order**](https://github.com/anomalyco/opencode/issues/25254)  
   Loop detection only considers the current message, allowing infinite tool-call loops to escape detection. *(5 comments)*

9. [**#18441 — `edit` permission rules do not override `external_directory: "allow"`**](https://github.com/anomalyco/opencode/issues/18441)  
   Users can set `ask`/`deny` for edit operations, but `external_directory: allow` silently wins, bypassing explicit permission rules. *(3 comments)*

10. [**#32024 — Sub-agents (Task tool) bypass deny permission rules for read and grep**](https://github.com/anomalyco/opencode/issues/32024)  
   A major security concern: Task-tool subagents can read denied paths such as `.env` without triggering permission checks. *(3 comments)*

## Key PR Progress

1. [**#41945 — fix(opencode): isolate workspace config state**](https://github.com/anomalyco/opencode/pull/41945)  
   Prevents shared references between workspace configs when a plugin config hook mutates nested values. Closes #41916.

2. [**#41942 — fix(core): jitter session retry delays**](https://github.com/anomalyco/opencode/pull/41942)  
   Adds ±20% jitter to V2 session retry backoff, keeps provider `Retry-After` as a minimum, and aligns durable event timestamps.

3. [**#41939 — fix(opencode): cap session retries with jitter**](https://github.com/anomalyco/opencode/pull/41939)  
   Caps high-level session retries at five so persistent provider failures terminate instead of hanging forever. Closes #37076.

4. [**#41933 — fix(core): prefer provider-reported usage cost**](https://github.com/anomalyco/opencode/pull/41933)  
   Uses OpenRouter `usage.cost` and normalizes GitHub Copilot `total_nano_aiu` to USD, improving session cost accuracy.

5. [**#41789 — fix(core): expose local attachment paths**](https://github.com/anomalyco/opencode/pull/41789)  
   Restores V2 agents’ ability to operate on explicitly attached local images and referenced checkouts. Closes #41443 and #41454.

6. [**#41924 — fix(tui): surface clipboard write failures instead of false success**](https://github.com/anomalyco/opencode/pull/41924)  
   Stops showing “Copied to clipboard” when the system clipboard write actually failed. Closes #41470.

7. [**#41931 — fix: normalize Windows backslash paths in file watcher**](https://github.com/anomalyco/opencode/pull/41931)  
   Fixes file tree and file viewer auto-refresh after AI edits on Windows by normalizing path separators. Closes #38125.

8. [**#41936 — fix(util): bound npm installs with a configurable timeout**](https://github.com/anomalyco/opencode/pull/41936)  
   Adds a timeout to `Npm.reify`/Arborist installs, preventing indefinite plugin or package install hangs. Closes #41934.

9. [**#41940 — feat(tui): surface plugin failures**](https://github.com/anomalyco/opencode/pull/41940)  
   Shows failed MCP servers and TUI plugins directly on the new-session screen, with shared error-detail views, scrolling, and copy support.

10. [**#41626 — feat(desktop): publish v2 beta desktop**](https://github.com/anomalyco/opencode/pull/41626)  
    Bundles `@opencode-ai/cli@next`, uses the shared V2 service lifecycle, and keeps Electron user data channel-specific for the beta desktop.

## Feature Request Trends

- **Richer TUI/file-viewer UX:** markdown preview toggle (#14187), dynamic window titles (#31423), Plan→Build mode switching (#32022), configurable new-session location (#41929), and machine-readable skill inventory/diagnostics (#32100).
- **Stricter permission model:** users are asking for deny rules that actually apply to subagents (#32024), `edit` rules that override `external_directory` (#18441), and better config boundary/traversal control (#12999).
- **Reliability and cost controls:** repeated requests for apply_patch atomicity (#34311, #41871), bounded retries with jitter (#37076, #41934), idempotent storage migrations (#16885), and recovery from SQLite corruption (#30157).
- **Platform/ecosystem support:** Windows path normalization (#38125), Winget upgrade support (#30026), PowerShell agent-browser hangs (#25938), terminal multiplexer notifications (#29099), and model capability metadata such as vision support (#29956).

## Developer Pain Points

- **Runaway loops and API costs:** recurring reports of doom-loop gaps (#12716, #25254), infinite edit/write retries (#17169), and hallucinated `oldString` loops (#21850) show real financial and productivity impact.
- **Inconsistent permission enforcement:** subagents bypassing deny rules (#32024) and edit permissions being ignored (#18441) undermine user trust in the permission system.
- **Silent failures and misleading feedback:** the clipboard shows success when nothing was copied (#41928), plugin imports hang without diagnostics (#31463), notifications silently disappear under tmux/zellij (#29099), and context usage is under-reported for split-window models (#32119).
- **Workspace/storage fragility:** SQLite corruption crashes (#30157), rerunning JSON→SQLite migrations (#16885), partial multi-file `apply_patch` writes (#34311, #41871), and GitHub Actions auto-committing dirty submodule state (#32070) all add avoidable friction.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-12

The community's attention this cycle is dominated by edit-tool reliability and Copilot auth robustness: multiple issues and PRs landed to make the edit tool accept real-world model output (single-object `edits`, whitespace-tolerant fuzzy matching), while a WSL login hang (#6187) drew the highest discussion volume at 25 comments. On the wire protocol, PR #7982 restores mid-stream `usage` events lost to a 0.84.0 regression, and #7993 closes a context-overflow gap for long tool loops. No new releases shipped in the last 24 hours.

## Hot Issues

1. **[#6187 — Pi login hangs in WSL after GitHub Copilot device authorization](https://github.com/earendil-works/pi/issues/6187)** (closed, 25 comments)
   The most-discussed issue this cycle: the browser device flow completes and the device shows as registered, but the WSL client never detects it and hangs on login. Highlights how fragile the Copilot device flow remains for WSL users.

2. **[#7730 — High CPU usage on Mac OS with long session](https://github.com/earendil-works/pi/issues/7730)** (open, 10 comments, 8 👍)
   CPU swings between 50–110% with 600–800MB memory on long sessions, seemingly correlated with context size. The 8 upvotes make performance on macOS the most-emotionally-charged open issue this week; no maintainer response yet.

3. **[#7846 — Unable to start 0.84.0, 0.84.1, with bun runtime](https://github.com/earendil-works/pi/issues/7846)** (closed, 10 comments)
   Release-blocking regression: `zlib.createZstdDecompress is not a function` inside undici crashes Pi on Bun. Closed quickly, but it's a cautionary tale about shipping against Node-specific APIs.

4. **[#7850 — GitHub Copilot login fails with 429 for organizations with many models](https://github.com/earendil-works/pi/issues/7850)** (closed, 7 comments, 7 👍)
   Orgs with 20+ enabled models get rate-limited during login. Closed as no-action, but the 7 👍 (and duplicate #7428) show the frustration is widespread among enterprise Copilot users.

5. **[#7553 — Configurable thinking level/model for compaction](https://github.com/earendil-works/pi/issues/7553)** (open, 8 comments)
   Compaction unconditionally reuses the session's thinking level, so users on reasoning models can't separate summarization budget from normal turns. A well-argued feature request covering both auto and manual compaction.

6. **[#7444 — WebSocket retry only handles two error codes](https://github.com/earendil-works/pi/issues/7444)** (closed, 8 comments)
   Any `response.failed` beyond `previous_response_not_found` and `websocket_connection_limit_reached` hard-stops the turn. The community wants generic transient-error retry/backoff rather than an ever-growing allowlist.

7. **[#7836 — Edit fuzzy match misses lines with differences in whitespace length](https://github.com/earendil-works/pi/issues/7836)** (open, 6 comments, 1 👍)
   `normalizeForFuzzyMatch` doesn't collapse whitespace runs or strip leading whitespace, causing small models to fail edits on content that is semantically identical. Directly addressed by PR #7978.

8. **[#7835 — Edit tool rejects a single-object edits argument](https://github.com/earendil-works/pi/issues/7835)** (open, 4 comments)
   Models frequently wrap `edits` as `{oldText, newText}` instead of `[{oldText, newText}]`; schema validation rejects it before the `prepareEditArguments` normalization hook can run. Confirms the edit tool is the top model-compatibility pain point.

9. **[#7966 — Command line parameter --thinking has no effect](https://github.com/earendil-works/pi/issues/7966)** (closed, 3 comments)
   `pi --thinking off "some prompt"` is ignored; the CLI silently picks up the previous session's thinking mode. A classic stale-state CLI bug — closed quickly, but a trap for users scripting different modes.

10. **[#7947 — P0: CMD on Windows outputs repeated characters and leaks memory](https://github.com/earendil-works/pi/issues/7947)** (closed, 2 comments)
    On Windows 11 CMD with DeepSeek-V4-Flash, output duplicates with ever-growing runs of `0`s, and even Ctrl+C can't interrupt. The most severe Windows TUI issue reported this cycle.

## Key PR Progress

1. **[#7993 — fix(coding-agent): compact between tool turns](https://github.com/earendil-works/pi/pull/7993)**
   Checks context after completed tool batches so long tool loops trigger auto-compaction before the next model request overflows. Fixes the gap where context crosses the threshold mid-loop, before `agent_end`.

2. **[#7982 — fix(coding-agent): preserve usage in streaming events](https://github.com/earendil-works/pi/pull/7982)**
   Restores cumulative provider usage on JSON/RPC `message_update` events while keeping message snapshots omitted so stream size stays linear. Includes wire-shape docs and a regression test; closes #7911.

3. **[#7978 — fix(edit): normalize single-object edits argument to array and collapse whitespace in fuzzy match](https://github.com/earendil-works/pi/pull/7978)**
   Combined fix for both edit-tool rejection modes: accepts single-object/JSON-string `edits` and makes fuzzy matching collapse whitespace runs. Supersedes the narrower #7904.

4. **[#7981 — fix(ai): map models.dev cost tiers for every provider](https://github.com/earendil-works/pi/pull/7981)**
   Extends `getModelsDevCost` tier mapping beyond the github-copilot block so every provider gets correct tiered token pricing from models.dev data; fixes #7912.

5. **[#1800 — fix(ai): respect region from profile config when AWS_PROFILE is set](https://github.com/earendil-works/pi/pull/1800)**
   The Bedrock provider no longer hard-codes `us-east-1` when `AWS_PROFILE` is active; it now reads the region from `~/.aws/config`. A long-running PR finally moving this cycle.

6. **[#7866 — feat(tui): add copyOnSelect option to TuiAltScreen](https://github.com/earendil-works/pi/pull/7866)**
   Lets users disable automatic copy-to-clipboard on mouse selection in fullscreen mode. Defaults to `true`, preserving existing behavior.

7. **[#7865 — fix(tui): handle tui.select.pageUp/pageDown in base SelectList and model-selector](https://github.com/earendil-works/pi/pull/7865)**
   Adds missing page-up/page-down keybinding handling to the base SelectList and model selector, fixing a TUI navigation inconsistency across all selectors.

8. **[#7972 — fix(tui): route selection copy through the host clipboard so "Copied!" is truthful](https://github.com/earendil-works/pi/pull/7972)**
   Bare OSC 52 writes flashed "Copied!" even in terminals that ignore them (Terminal.app, VTE, tmux without passthrough). Now falls back to host clipboard APIs.

9. **[#7989 — feat(ai): add Qwen Token Plan Individual CN provider](https://github.com/earendil-works/pi/pull/7989)**
   Adds the China-region Individual subscription catalog (cn-beijing), reusing `QWEN_TOKEN_PLAN_CN_API_KEY`; mirrors #7659 for the China region and closes #7847.

10. **[#7956 — feat(coding-agent): render Mermaid diagrams in HTML exports](https://github.com/earendil-works/pi/pull/7956)**
    Reuses the TUI's ANSI-to-HTML rendering pipeline so exported transcripts render Mermaid diagrams like the TUI does, with a header toggle.

## Feature Request Trends

- **Provider expansion**: Requests to add AIHubMix (#7992) and Qwen Token Plan Individual CN (#7989/#7988) show clear demand for more regional and aggregator providers, especially for China.
- **TUI/terminal polish**: Theme overrides (#7722), Kitty graphics passthrough inside tmux (#7936), VS Code desktop notifications (#7967), scroll-position indicators (#7970), and copy-on-select control (#7866) — the fullscreen TUI experience is the fastest-growing feature surface.
- **Granular context management**: Compaction-specific thinking levels (#7553) and startup-time/latency budgets (#7739) indicate users want finer control over context handling and performance characteristics.
- **Session interoperability**: Live session-to-session messaging (#7968) and Mermaid rendering in exports (#7956) point toward richer collaboration and documentation workflows.

## Developer Pain Points

- **Edit tool strictness vs. model reality**: Repeated failures — single-object `edits` (#7835/#7944), whitespace mismatches (#7836), and unreachable `prepareEditArguments` fixes — show the tool schema is too rigid for real model output, especially from smaller models.
- **Copilot auth is a recurring failure point**: WSL hangs (#6187) and 429 rate limits for large orgs (#7850/#7428) make the device flow the top onboarding complaint.
- **Runtime/platform fragility**: Bun crashes on `zlib.createZstdDecompress` (#7846), Windows CMD output corruption with memory leaks (#7947), and misleading "bash not found" errors when `settings.json` is invalid (#7829).
- **Resource consumption**: 50–110% CPU with 600–800MB RAM on long Mac sessions (#7730) remains open without a maintainer response.
- **Wire protocol regressions**: Mid-run `usage` disappeared after the 0.84.0 delta-only `message_update` change (#7911), and WebSocket retry coverage is too narrow (#7444) — integration and API consumers feel these acutely.
- **Hardcoded keybindings and example bugs**: Shift+backspace/space and Ctrl+C bypass the keybinding registry (#7939), and the subagent example throws when `tools` is a YAML array (#7964) — small but recurring DX frustrations.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-12

## Today’s Highlights

The v0.21.10 stable release shipped ACP-based reasoning-effort configuration and Web Shell image previews, while v0.21.11-preview.0, desktop-v0.2.0, and live-host-v0.1.1 added terminal/rendering and sandbox-runtime fixes. Community attention is concentrated on tmux rendering regressions, headless CLI error-reporting bugs, and daemon session-recovery reliability.

## Releases

- **[v0.21.11-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-preview.0)**  
  `fix(web-shell)`: prompt-safe session navigation ([#8931](https://github.com/QwenLM/qwen-code/pull/8931)) · `chore(serve)`: log session continuation admissions.

- **[v0.21.10-nightly.20260812.a64d1291d2](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10-nightly.20260812.a64d1291d2)**  
  Nightly build with the same web-shell/serve fixes as the preview.

- **[dsw-eas-smoke-20260812-281542bfdc](https://github.com/QwenLM/qwen-code/releases/tag/dsw-eas-smoke-20260812-281542bfdc)**  
  Non-production DSW EAS infrastructure smoke; no SWE score published. Benchmark reference: v0.21.2.

- **[desktop-v0.2.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.0)**  
  Stable desktop release with stabilized transcript history pagination ([#8914](https://github.com/QwenLM/qwen-code/pull/8914)) and session catalog sharing improvements.

- **[v0.21.10](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10)**  
  - ACP support for configuring reasoning effort from Default to Max via session configuration ([#8526](https://github.com/QwenLM/qwen-code/pull/8526)).  
  - Web Shell: uploaded or pasted images now open a preview in the artifact.

- **[live-host-v0.1.1](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.1.1)**  
  - `fix(cli)`: probe sandbox runtime before selecting it ([#7734](https://github.com/QwenLM/qwen-code/pull/7734)).  
  - `fix(autofix)`: serialize scan-and-pick operations.

## Hot Issues

- **[#8562 — tmux flicker over SSH/iTerm2](https://github.com/QwenLM/qwen-code/issues/8562)** — P2 rendering bug affecting Ubuntu + tmux after recent updates. 7 comments. Users reproduced it via Qwen 3.8 Max analysis; related duplicate [#8901](https://github.com/QwenLM/qwen-code/issues/8901) confirms this is a recurring terminal-rendering regression.

- **[#8678 — Large session restore timeouts can break current session](https://github.com/QwenLM/qwen-code/issues/8678)** — P1 daemon reliability issue. 7 comments. The first PR landed, making restore timeouts safe/observable, but the community is watching for follow-up behavior around session preservation.

- **[#8897 — `--approval-mode` and `--auth-type` missing from `qwen --help`](https://github.com/QwenLM/qwen-code/issues/8897)** — CLI flags are accepted and validated but absent from help output. 5 comments. Hurts discoverability and confuses CI users.

- **[#8724 — Cross-session messaging](https://github.com/QwenLM/qwen-code/issues/8724)** — Feature request allowing two local Qwen Code sessions to discover and message each other, with fail-closed gates. 5 comments. Points toward multi-agent/automation workflows.

- **[#8963 — Long-running tasks hang](https://github.com/QwenLM/qwen-code/issues/8963)** — P2 shell/automation bug: even with auto/yolo modes, long Python or destructive commands stall. 4 comments. The author explicitly compares unfavorably with Kimi Code and requests an “unconditional accept” mode.

- **[#8920 — OpenAI API errors reported as success in stream-json](https://github.com/QwenLM/qwen-code/issues/8920)** — Headless mode emits `"success"` and exits 0 when the upstream API fails. 4 comments. This is a serious correctness issue for automated pipelines.

- **[#8644 — Windows file links fail in VS Code due to encoded drive colon](https://github.com/QwenLM/qwen-code/issues/8644)** — `file:///d%3A/...` cannot be opened by VS Code. 4 comments. Common Windows workflow blocker.

- **[#8957 — Crashes on image load since 0.21.2](https://github.com/QwenLM/qwen-code/issues/8957)** — P2 regression: image reading crashes instantly after 0.21.1; 0.21.1 was the last known working version. 3 comments.

- **[#8922 — Shell ignores `tools.truncateToolOutputThreshold`](https://github.com/QwenLM/qwen-code/issues/8922)** — Documented setting has no effect; Shell hardcodes a 30k-char budget. 3 comments. Configuration-vs-docs mismatch.

- **[#8944 — High-severity npm vulnerabilities since 0.21.0](https://github.com/QwenLM/qwen-code/issues/8944)** — `npm update` reports 2 high-severity issues. 3 comments. Security-conscious users are asking for an audit/dependency bump.

## Key PR Progress

- **[#8788 — Batch extension activation APIs](https://github.com/QwenLM/qwen-code/pull/8788)** — Adds capability-gated V2 batch operations for up to 100 extension IDs and per-workspace overrides.

- **[#8961 — Hermetic autofix verification gates](https://github.com/QwenLM/qwen-code/pull/8961)** — Makes verification independent from runner git config and heals the host config, reducing CI flakiness.

- **[#8939 — Same-session refresh made transactional](https://github.com/QwenLM/qwen-code/pull/8939)** — Prevents message loss during WebShell `load`/`resume`/reload when daemons advertise client-attachment identity.

- **[#8322 — MiniMax image generation support](https://github.com/QwenLM/qwen-code/pull/8322)** — Adds MiniMax image endpoint routing, response parsing, and image-only model entries.

- **[#8687 — Guard cross-worktree Git mutations](https://github.com/QwenLM/qwen-code/pull/8687)** — Host-side security guard blocks model-issued shell commands that escape the session workspace via `--work-tree`/`--git-dir`.

- **[#8955 — Harden prompt admission ownership](https://github.com/QwenLM/qwen-code/pull/8955)** — Revalidates app lifetime, session ownership, and write gates after async host admission, closing race conditions in WebShell.

- **[#8960 — Escalate stopped takeover PRs](https://github.com/QwenLM/qwen-code/pull/8960)** — Autofix loop now labels stopped takeover PRs `autofix/needs-human` and ages out unanswered pauses.

- **[#8613 — tmux-backed interactive terminal sub-agent](https://github.com/QwenLM/qwen-code/pull/8613)** — Enables agents to drive REPLs/TUIs inside tmux and render the session live in WebShell.

- **[#8966 — Accept `stream-json` in settings schema](https://github.com/QwenLM/qwen-code/pull/8966)** — Aligns the settings schema with the CLI runtime for `output.format`.

- **[#8952 — Bump sharp to ^0.35.0](https://github.com/QwenLM/qwen-code/pull/8952)** — Resolves `GHSA-f88m-g3jw-g9cj` in the core package and lockfile.

## Feature Request Trends

- **MCP evolution**: Requests for MCP 2026-07-28 core spec and MCP Apps in the daemon WebShell ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Cross-session/agent communication**: Sessions messaging each other with discoverability and fail-closed gates ([#8724](https://github.com/QwenLM/qwen-code/issues/8724)).
- **Richer WebShell operations**: Dynamic workflow visualization ([#8950](https://github.com/QwenLM/qwen-code/pull/8950)), channel sessions in the sidebar ([#8457](https://github.com/QwenLM/qwen-code/pull/8457)), and tmux-backed interactive terminals ([#8613](https://github.com/QwenLM/qwen-code/pull/8613)).
- **More third-party providers**: Kimi, Xiaomi MiMo ([#8368](https://github.com/QwenLM/qwen-code/pull/8368)), MiniMax image generation ([#8322](https://github.com/QwenLM/qwen-code/pull/8322)).
- **Session lifetime controls**: Per-channel `sessionRotation` to bound session reuse ([#8927](https://github.com/QwenLM/qwen-code/pull/8927)).

## Developer Pain Points

- **Terminal rendering regressions**: tmux/iTerm flicker reports have persisted across several versions and are being actively diagnosed ([#8562](https://github.com/QwenLM/qwen-code/issues/8562)).
- **Headless/CLI correctness**: Missing flags in help, stream-json false success, and schema mismatches create trust issues for automation users ([#8897](https://github.com/QwenLM/qwen-code/issues/8897), [#8920](https://github.com/QwenLM/qwen-code/issues/8920), [#8966](https://github.com/QwenLM/qwen-code/pull/8966)).
- **Long-running task instability**: Commands hanging in auto modes and lack of a fully automatic “accept everything” mode is driving users to compare alternatives ([#8963](https://github.com/QwenLM/qwen-code/issues/8963)).
- **Daemon session recovery**: Large-session restores, wrong runtime storage, and refresh races continue to require hardening ([#8678](https://github.com/QwenLM/qwen-code/issues/8678), [#8939](https://github.com/QwenLM/qwen-code/pull/8939)).
- **Configuration/settings drift**: Documented options like `tools.truncateToolOutputThreshold` are ignored, and provider update prompts can promise model changes they no longer perform ([#8922](https://github.com/QwenLM/qwen-code/issues/8922), [#8948](https://github.com/QwenLM/qwen-code/issues/8948)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-12

## 1. Today's Highlights

No new releases landed in the last 24 hours, but the tracker saw important maintenance and community activity. The most urgent issue is **#5323**, a v0.9.5 regression where Auto-Review mode silently blocks every Bash/write call; meanwhile, maintainer-filed issues **#5325** and **#5324** target runtime event routing and model-facing schema complexity. On the PR side, **#5319** finally fixes the “copy includes rail decorations” TUI annoyance, and **#5318** adds a Windows picture-in-picture terminal feature.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#5323 — Regression: Auto-Review mode silently blocks every Bash call and write operation](https://github.com/Hmbown/CodeWhale/issues/5323)**  
   Upgrade to v0.9.5 changed Auto-Review from auto-approving tool calls to blocking them with “destructive action requires explicit review.” High impact for autonomous workflows; critical to verify before more users upgrade.

2. **[#4959 — Proposed `stop` command / STOP-word intercept](https://github.com/Hmbown/CodeWhale/issues/4959)**  
   8 comments. Users want a reliable `/stop` command and mechanical STOP-word interception when the model is in YOLO/autonomous mode and ignoring text commands. Strong demand for safer agent control.

3. **[#5314 — Copy message includes rail decorations (● ▏)](https://github.com/Hmbown/CodeWhale/issues/5314)**  
   TUI context-menu copy exports UI artwork instead of clean message content. Community reaction is positive toward the matching fix in PR #5319.

4. **[#5325 — Runtime: child-owned background shell completions delivered to parent model stream](https://github.com/Hmbown/CodeWhale/issues/5325)**  
   Maintainer-filed correctness issue: completions from sub-agent background jobs leak into the parent model stream, causing noise and potential false attribution.

5. **[#5324 — Agent tool: simplify the 32-field schema so models stop erroring on it](https://github.com/Hmbown/CodeWhale/issues/5324)**  
   The model-facing `agent` tool is overloaded: 32 properties, zero required fields, 8 actions, and alias baggage. Models are failing on schema complexity; simplification is needed for reliability.

6. **[#5322 — Regression: output area doesn’t fill wide terminals](https://github.com/Hmbown/CodeWhale/issues/5322)**  
   v0.9 caps the transcript width, leaving white space on wide displays. Community notes this worked in v0.8.65, making it another v0.9 layout regression.

7. **[#4683 — Wrong DeepSeek completions URL / flaky network error](https://github.com/Hmbown/CodeWhale/issues/4683)**  
   Users see intermittent `error sending request for url (https://api.deepseek.com/v1/chat/completions)` after long conversations. Still open with `needs-info`.

8. **[#5241 — Pricing endpoint returns 503; all sessions show `unverified_live_pricing`](https://github.com/Hmbown/CodeWhale/issues/5241)**  
   Cost display broke after upgrading from 0.8.67 to 0.9.3; every provider/session is unpriced. Affects trust in cost tracking.

9. **[#5097 — “CodeWhale is not considered official DeepSeek Coding Agent”](https://github.com/Hmbown/CodeWhale/issues/5097)**  
   Closed after 5 comments, but worth noting: a YouTuber pointed to “Reasonix” as DeepSeek’s official coding agent, causing community confusion about CodeWhale/DeepSeek-TUI’s status.

10. **[#5316 — EPIC-005: CodeWhale TUI Crate Decomposition](https://github.com/Hmbown/CodeWhale/issues/5316)**  
    Umbrella epic tracking the TUI crate decomposition. Important architectural direction for maintainability, even though it is not directly user-facing yet.

## 4. Key PR Progress

Only five PRs were active/updated in the 24h window; all are listed below.

1. **[#5326 — web: audit fixes — i18n parity, copy/spacing, test fixes](https://github.com/Hmbown/CodeWhale/pull/5326)**  
   Maintainer polish pass over the community website: fixes a stale `TOOL_SURFACE.md` quote assertion, plus copy/spacing and test corrections. Keeps web/docs contracts aligned.

2. **[#5318 — feat(tui): pin host terminal window as an always-on-top mini window](https://github.com/Hmbown/CodeWhale/pull/5318)**  
   Windows-only PiP feature: right-click or `/pin` shrinks the terminal to 640×400 and pins it on top; toggling restores previous size/state. Nice ergonomic addition for multitasking.

3. **[#5321 — feat: register OrcaRouter as a named provider](https://github.com/Hmbown/CodeWhale/pull/5321)**  
   Wires OrcaRouter as a first-class provider like OpenRouter, with `ORCAROUTER_API_KEY` and `sk-orca-` keys, unlocking 150+ models through one gateway.

4. **[#5320 — fix(session): separate snapshot reads from crash recovery](https://github.com/Hmbown/CodeWhale/pull/5320)**  
   Adds `load_session_snapshot` for safe reads during running tool calls and `recover_session_for_resume` with repair stats. Important for embedding hosts that need crash recovery without snapshot side effects.

5. **[#5319 — fix(tui): copy messages without visual rails](https://github.com/Hmbown/CodeWhale/pull/5319)**  
   Directly addresses #5314: user/assistant cells now copy canonical source content instead of rendered Ratatui lines. Complex cells like Tool/Thinking/System remain on the full-transcript path to avoid losing output detail.

## 5. Feature Request Trends

- **Agent safety controls**  
  Users want dependable interruption mechanisms, e.g. `/stop` and mechanical STOP-word handling, especially for autonomous/YOLO mode. Evidence: #4959.

- **Custom providers and config flexibility**  
  Requests to support custom provider/model definitions and simpler multi-provider configs, including references to Kimi Code-style configuration and registration of new gateways like OrcaRouter. Evidence: #4660, #5321.

- **TUI ergonomics and layout**  
  Recurring desire for pane zooming, wide-terminal responsiveness, rail-free copy, and window pinning. Evidence: #1261, #5314, #5322, #5318.

- **Provider reliability and cost transparency**  
  Fixing flaky DeepSeek completions URLs, WSL2 connection failures, and broken pricing endpoints. Evidence: #4683, #4956, #5241.

- **Runtime/architecture simplification**  
  Maintainer-driven push to reduce model-facing complexity and clean up sub-agent events: agent schema simplification, session snapshot/recovery separation, and crate decomposition. Evidence: #5324, #5325, #5320, #5316.

## 6. Developer Pain Points

- **v0.9 upgrade regressions**  
  Multiple issues report behavior that worked in v0.8.x but broke in v0.9: Auto-Review blocking Bash/write calls (#5323), wide-terminal layout (#5322), slash-command latency (#4568), and pricing display (#5241).

- **Network/API flakiness**  
  Users repeatedly hit provider connection errors, especially after long idle or in WSL2, and pricing endpoint failures make sessions unverifiable. Evidence: #4683, #4956, #5241.

- **Windows-specific CLI quirks**  
  Pre-exec flags like `--model` and `--toolsets` are consumed as a single concatenated argument on Windows, forcing workarounds or env vars. Evidence: #4564.

- **Model-facing complexity causes errors**  
  The 32-field `agent` tool schema is too complex for models and leads to avoidable failures; simplifying it is now a maintainer priority. Evidence: #5324.

- **Runtime event leakage**  
  Parent model streams receive child-owned background shell completion events, adding noise and risking incorrect model behavior. Evidence: #5325.

- **Community identity confusion**  
  External videos/pages cause confusion about whether CodeWhale is the official DeepSeek coding agent, prompting requests for clearer official documentation. Evidence: #5097.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*