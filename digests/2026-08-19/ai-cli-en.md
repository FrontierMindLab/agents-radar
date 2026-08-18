# AI CLI Tools Community Digest 2026-08-19

> Generated: 2026-08-18 23:00 UTC | Tools covered: 10

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
**Date:** 2026-08-19 | **Source:** Community digest summaries for 10 tools

---

## 1. Ecosystem Overview

The AI CLI tool landscape on 2026-08-19 shows a market consolidating around three axes: agent trust/reliability, context/memory economics, and enterprise governance. Six of nine active tools shipped or advanced releases, with OpenAI Codex, Gemini CLI, and Qwen Code showing the fastest PR throughput. Cross-cutting pain points — Windows/WSL regressions, MCP process leaks, billing opacity, and subagent false-success reporting — recur nearly identically across most communities. The scope is simultaneously expanding from single-session coding assistance toward multi-session orchestration, durable memory, and sandboxed autonomous execution. Grok Build's dormancy and Kimi Code's minimal activity stand out against an otherwise highly active field.

---

## 2. Activity Comparison

*Counts reflect issues and PRs surfaced in each tool's 24-hour community digest; a tool's total ticket activity may be higher.*

| Tool | Hot Issues | PRs | Release Status |
|---|---|---|---|
| Claude Code | 11 (10 hot + 1 notable) | 2 | ✅ v2.1.235 (spellchecker, prompt-cache fix) |
| OpenAI Codex | 10 | 10 | ✅ rust-v0.148.0 (TUI export, session fork) |
| Gemini CLI | 10 | 10 | ✅ v0.56.0-nightly (SSR Agent fixes) |
| GitHub Copilot CLI | 10 | 1 | ✅ v1.0.81-1 (Gemini 3.7 Flash, sandbox Ctrl+E) |
| Kimi Code | 2 | 2 | ❌ None |
| OpenCode | 10 | 10 | ❌ None |
| Pi | 10 | 10 | ❌ None |
| Qwen Code | 10 | 10 | ✅ v0.21.11-nightly (session registry) |
| CodeWhale (DeepSeek TUI) | 9 | 26 (10 highlighted) | ✅ v0.9.9 (rebrand finalized) |
| Grok Build | 0 | 0 | ❌ None |

**Reading:** Codex, Gemini, Qwen, and Pi are the most active on PRs. Claude Code and Copilot ship stable releases with lighter PR windows. CodeWhale shows surprising PR energy (26 updates) around a rebrand. Kimi and Grok Build are the laggards.

---

## 3. Shared Feature Directions

These requirements appear independently across multiple tool communities:

1. **Durable memory across sessions/compactions** — Claude Code (#34556, persistent memory after compactions), Gemini (#26522, Auto Memory retry loops; #7040 memory-quality RFC), OpenCode (#37489, context-cache invalidation), Pi (#8328, threshold compaction never fires; #8307 cache-friendly compaction), Qwen (#7040, reliable auto-memory recall). Users are building their own persistence layers — the clearest unmet need in the ecosystem.

2. **Windows/WSL parity** — Claude Code (#69415, WSL connection drops; #86298, Windows message loss), Codex (#35119, WSL Git detection; #39136, browser RPC; #39209, `\\?\` archiving), Qwen (#8400, Windows Desktop sessions deleted), Pi (#8299, slow npm startup), CodeWhale (#5512, missing status header). Every major tool has at least one open Windows/WSL regression.

3. **MCP reliability and lifecycle hygiene** — Codex (#30408, 9+ GB MCP process leaks), Copilot (#4490, OAuth regression; #4392, orphaned stdio servers; #3698, unbounded respawns), OpenCode (#37634, stderr drain + retries; #37684, runtime MCP bridging), Qwen (#8992, MCP 2026 core), Gemini (#28870, ACP pending tool-call protocol fix).

4. **Sandbox enforcement and security** — Copilot (#4521/#4522, sandbox forces itself on despite `enabled=false`), Gemini (#19873, zero-dependency OS sandboxing; #28869, gVisor networking), Codex (Guardian risk-scoring PRs, Windows sandbox diagnostics), Qwen (sandbox recovery smoke tests). Users want predictable, honor-user-intent sandboxing — not policy overrides.

5. **Usage/billing transparency** — Codex (#14593, 630 comments — "burning tokens very fast"), OpenCode (five quota-math issues: #42985, #43023, #33495, #42935, #43208), Pi (#8285, fallback priced with requested model), Copilot (#4511, AIC under-reporting). Paid users hitting free-tier caps and meters disagreeing with dashboards are eroding trust.

6. **Agent truthfulness and anti-hang behavior** — Gemini (#22323, MAX_TURNS reported as GOAL success; #21409, hangs on folder creation; #25166, "Waiting input" deadlock), Claude Code (#13689, instruction adherence late in sessions), Qwen (#9276, teammate messages misread as shutdown), CodeWhale (#5505, system prompt dropped after `/new`). False success and indefinite stalls are the top reliability complaints.

7. **Session orchestration and lifecycle control** — Codex (session forking, archive/restore, `/export`), OpenCode (`/resume` and `/pause`, #7226), Qwen (live-session registry, `qwen sessions ps`), CodeWhale (#5508, continuous-loop mode to orchestrate other agents), Claude Code (Remote Control across machines).

---

## 4. Differentiation Analysis

| Tool | Center of Gravity | Target User | Distinguishing Moves |
|---|---|---|---|
| **Claude Code** | Enterprise governance, cache economics, deep IDE integration | Enterprise teams; long autonomous sessions | Cyber-safeguard compliance (#84352), whole-prompt-cache fix in v2.1.235, memory-across-compaction demand |
| **OpenAI Codex** | TUI productivity + security hardening | Power users; Windows/enterprise | Rust core; Guardian V2 risk scoring; session fork/export; Windows sandbox diagnostics in `codex doctor` |
| **Gemini CLI** | Agent correctness, OS-level sandboxing, SSR Agent | Google-ecosystem developers; agentic workflows | Nightly cadence; gVisor runsc; AST-aware tooling roadmap; subagent observability asks |
| **Copilot CLI** | Managed policy enforcement, enterprise model access | GitHub enterprise orgs | Sandbox policy, plugin marketplace, per-agent usage metrics; but only 1 PR — low contribution momentum |
| **Kimi Code** | Minimal maintenance; OpenAI-compatible breadth | Kimi/K3 users; quant/trading | Web-UI rendering for non-Kimi providers; open-source quant benchmark (#2608) |
| **OpenCode** | Billing transparency, local-LLM support | OSS/local-first users | Go daemon; 5 open quota issues; storage-amplification and message-ID rollover bug (#43303) |
| **Pi** | TUI quality, provider edge cases | Self-hosters; long TUI sessions | Rust; extension hook surface (new `agent_recovery_exhausted` hook); Bedrock Mantle + redacted-reasoning support |
| **Qwen Code** | Multi-agent coordination, review/CI automation | Team workflows; Chinese ecosystem | Live-session registry, cross-session messaging, `fetch-pr --resume`, TUI capture evidence for reviews |
| **CodeWhale** | Rebrand + i18n + release hardening | Self-hosted DeepSeek users | Durable-task fixes, trusted-publishing push, Chinese docs localization, continuous-loop request |

**Key contrasts:** Claude Code and Copilot optimize for *enterprise control*; Codex and Gemini for *agentic capability*; OpenCode and Pi for *self-hosting and transparency*; Qwen and CodeWhale for *orchestration and team workflows*.

---

## 5. Community Momentum & Maturity

- **Highest engagement:** OpenAI Codex — #14593 has 630 comments and 285 👍, the largest single thread. Claude Code — #84352 (121 comments) shows strong enterprise-complaint gravity. Gemini maintains a steady p1 issue flow (hangs, false success).
- **Fastest iteration:** Codex, Gemini, and Qwen each moved 10 PRs *plus* shipped a release. Pi also moved 10 PRs with no release — significant hardening energy. CodeWhale updated 26 PRs in 24h, indicating a post-rebrand development sprint.
- **Stable-release cadence:** Claude Code and Copilot ship conservative, well-scoped releases (single-version, fewer PRs per window).
- **Emerging vs. dormant:** CodeWhale is emerging (rebrand, CI hardening, i18n). Kimi (2 issues, 2 PRs) and Grok Build (zero activity) are effectively dormant on public community signals.
- **Platform coverage as maturity signal:** The tools investing in Windows diagnostics (Codex sandbox checks, Qwen CI lane restore, CodeWhale timeout caps) are those treating platform reliability as a first-class concern.

---

## 6. Trend Signals

Reference value for developers and engineering leaders:

1. **Prompt-cache economics is now a performance lever, not an optimization.** Claude Code fixed cache invalidation from language-server reconnects and flagged session-specific URLs in tool definitions (#87137) that destroy resume caching; Pi added cache-friendly compaction (#8307); Qwen moved deferred tool catalogs to preserve caching (#8276); OpenCode saw quota burned when cache reads dropped to 0 (#42935). *Action: audit tool definitions for session-specific data; design for cache reuse.*

2. **Windows/WSL is the universal weak spot.** Every tool has at least one active Windows/WSL regression. Cross-session message drops, broken Git detection, and slow startup are recurring. *Action: prioritize Windows CI and diagnostics; treat Windows as a supported tier, not an afterthought.*

3. **Durable memory is the next competitive frontier.** Users are building custom persistence layers on top of Claude Code; Gemini's Auto Memory has privacy gaps (#26525); Pi's compaction silently never fires for some providers (#8328). Whoever makes reliable, user-controlled memory a first-class feature wins long-session workloads.

4. **Agent truthfulness matters more than feature breadth.** False success reporting (Gemini #22323), indefinite hangs (#21409), and dropped system prompts (CodeWhale #5505) destroy trust faster than missing features. Subagent status transparency and honest termination reasons are table-stakes requirements.

5. **Metering transparency builds or breaks trust.** Token/billing complaints dominate the two largest threads in the ecosystem (Codex #14593, OpenCode quota cluster). Aligning meters with actual provider usage — and letting paid balances bypass free-tier caps — is critical for subscription products.

6. **MCP won the integration standard debate; its lifecycle is immature.** Process leaks, orphaned stdio servers, and OAuth metadata regressions appear across Codex, Copilot, OpenCode, and Gemini. Expect reliable MCP process management to be a near-term differentiator.

7. **Multi-agent orchestration is moving from demo to production.** Session registries (Qwen), fork/resume (Codex), pause/resume (OpenCode), and continuous-loop modes (CodeWhale) all converge on the same vision: long-lived, resumable, multi-agent sessions that outlive a single terminal invocation.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Date:** 2026-08-19

> Note: PR comment counts were not individually included in the snapshot; the ranking follows the provided sorted-by-comments list.

## 1. Top Skills Ranking

1. **skill-creator eval reliability fix** — [PR #1298](https://github.com/anthropics/skills/pull/1298) — **Open**  
   Fixes `run_eval.py` and its consumers (`run_loop.py`, `improve_description.py`) that always report `recall=0%`. The PR installs the eval artifact as a real skill and addresses Windows stream reading, trigger detection, and parallel workers. Discussion centers on [Issue #556](https://github.com/anthropics/skills/issues/556), where 10+ independent reproductions confirm the eval loop is “optimizing against noise.”

2. **document-typography skill** — [PR #514](https://github.com/anthropics/skills/pull/514) — **Open**  
   Proposes a typographic quality-control skill for AI-generated documents, targeting orphan word wrap, stranded section headers, and numbering misalignment. The discussion positions this as a general quality layer for every document Claude produces.

3. **PDF case-sensitivity fix** — [PR #538](https://github.com/anthropics/skills/pull/538) — **Open**  
   Fixes 8 case mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`). This matters for case-sensitive filesystems and is a straightforward correctness improvement to the PDF skill.

4. **ODT / OpenDocument skill** — [PR #486](https://github.com/anthropics/skills/pull/486) — **Open**  
   Adds a new skill for creating, filling, reading, and converting OpenDocument files (`.odt`, `.ods`) and parsing ODT to HTML. It explicitly triggers on “ODT,” “ODS,” “ODF,” “OpenDocument,” and “LibreOffice document” requests.

5. **frontend-design skill clarity** — [PR #210](https://github.com/anthropics/skills/pull/210) — **Open**  
   Revises the frontend-design skill to be more actionable and internally coherent, ensuring every instruction can be followed by Claude in a single conversation. The discussion reflects a broader community demand for skills written as operational instructions rather than human-oriented documentation.

6. **skill-quality-analyzer + skill-security-analyzer** — [PR #83](https://github.com/anthropics/skills/pull/83) — **Open**  
   Adds two meta-skills to the marketplace: a quality analyzer covering structure, documentation, examples, and resources; and a security analyzer. This is an early attempt to create quality/security gates for Skills themselves.

7. **DOCX tracked-change `w:id` collision fix** — [PR #541](https://github.com/anthropics/skills/pull/541) — **Open**  
   Prevents document corruption when the DOCX skill adds tracked changes to files with existing bookmarks. The root cause is shared OOXML `w:id` IDs across bookmarks, comments, and move ranges; the PR replaces hardcoded low IDs with safe values.

8. **skill-creator YAML validation** — [PR #539](https://github.com/anthropics/skills/pull/539) — **Open**  
   Adds pre-parse validation in `quick_validate.py` to detect unquoted `description` fields containing YAML special characters like `:`. This prevents silent frontmatter truncation and downstream skill-eval failures.

---

## 2. Community Demand Trends

From the most-discussed Issues:

- **Security and trust boundary** — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments)  
  Community skills distributed under the `anthropic/` namespace create impersonation and permission-abuse risks. This is the strongest demand signal: users want clear separation between official and community skills.

- **Org-wide skill sharing and management** — [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments)  
  Users want shared skill libraries, direct sharing links, and org-level distribution instead of manual `.skill` file transfer.

- **Skill authoring and eval reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556), [Issue #202](https://github.com/anthropics/skills/issues/202)  
  The eval pipeline is not reliably measuring trigger rates; the `skill-creator` skill itself is seen as too verbose and insufficiently operational.

- **Agent governance and safety** — [Issue #412](https://github.com/anthropics/skills/issues/412)  
  Proposals for policy enforcement, threat detection, trust scoring, and audit trails for AI agent systems.

- **Context-window efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487)  
  The `claude-api` skill can inject ~156k tokens in one tool call; users are demanding skills be context-aware and token-frugal.

- **Memory and state persistence** — [Issue #1329](https://github.com/anthropics/skills/issues/1329)  
  A proposed `compact-memory` skill would use symbolic notation to reduce the context cost of long-running agent state.

- **Duplicate skill packaging** — [Issue #189](https://github.com/anthropics/skills/issues/189)  
  Installing both `document-skills` and `example-skills` creates duplicate Skills; users want better plugin boundary management.

- **Platform interoperability** — [Issue #29](https://github.com/anthropics/skills/issues/29), [Issue #16](https://github.com/anthropics/skills/issues/16)  
  Demand for AWS Bedrock support and for exposing Skills as MCPs.

---

## 3. High-Potential Pending Skills

These open PRs represent new Skills with meaningful community attention and may land soon:

- **testing-patterns skill** — [PR #723](https://github.com/anthropics/skills/pull/723)  
  Comprehensive testing guidance: Testing Trophy model, unit testing patterns, React Testing Library, and what not to test.

- **self-audit skill** — [PR #1367](https://github.com/anthropics/skills/pull/1367)  
  Mechanical output-file verification followed by a four-dimension reasoning quality gate; designed as a universal pre-delivery audit step.

- **ServiceNow platform skill** — [PR #568](https://github.com/anthropics/skills/pull/568)  
  Broad ServiceNow assistant covering ITSM, ITOM, ITAM/SAM, FSM, SPM, CSDM, IntegrationHub, and security incident response.

- **Pyxel retro game development skill** — [PR #525](https://github.com/anthropics/skills/pull/525)  
  Workflow for building retro/pixel-art/8-bit games with Python using `pyxel-mcp`, including write → run → capture → iterate.

- **SAP-RPT-1-OSS predictor skill** — [PR #181](https://github.com/anthropics/skills/pull/181)  
  Uses SAP’s open-source tabular foundation model for predictive analytics on SAP business data.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand at the Skills level is for the **meta-layer around Skills** — trust and security, quality evaluation, reliable authoring/eval tooling, org-wide sharing, and context-window efficiency — rather than for any single new functional domain Skill.

---

# Claude Code Community Digest — 2026-08-19

## Today's Highlights

Release v2.1.235 ships with an optional prompt-input spellchecker and a fix for whole-prompt-cache invalidation triggered by language server reconnects. Community attention remains concentrated on a CVP-approved org still receiving cyber-safeguard blocks (#84352), persistent-memory-across-compactions (#34556), and the long-running GitHub Connector mismatch (#32479) — the three most-commented issues this cycle. The Intel Mac Cowork VM regression is generating follow-up reports despite an earlier closure.

## Releases

**v2.1.235**
- Added an optional `spellcheck` setting that underlines misspelled words in the prompt input as you type, using installed `aspell`, `hunspell`, or `ispell`
- Fixed whole-prompt-cache invalidation when a language server disconnected or reconnected mid-session
- Additional nested fixes (changelog entry truncated in source data)

## Hot Issues

1. **CVP-approved org still receives cyber safeguard blocks** — [#84352](https://github.com/anthropics/claude-code/issues/84352) (121 comments, 20 👍)
   A Claude.ai organization that previously passed Cyber Verification Program approval is again being blocked in Claude Code, while the Verification Portal shows the application "under review." Highest-traffic issue this cycle; signals friction in enterprise compliance workflows.

2. **Feature Request: Persistent Memory Across Context Compactions** — [#34556](https://github.com/anthropics/claude-code/issues/34556) (89 comments, 6 👍)
   After 59 documented compactions across 26 days of daily use, the author built their own memory persistence system because Claude Code has no durable memory between context compaction events. Long-running enhancement request with active community engagement.

3. **GitHub Connector connected in Claude Desktop but not recognized by Claude Code** — [#32479](https://github.com/anthropics/claude-code/issues/32479) (88 comments, 139 👍)
   The GitHub Connector shows as connected in Claude Desktop but is invisible to Claude Code. Highest 👍 count in this batch; continually bumped since March.

4. **API Error: Connection closed mid-response (VSCode/WSL)** — [#69415](https://github.com/anthropics/claude-code/issues/69415) (53 comments, 81 👍)
   Connection drops frequent enough to make Claude Code "unusable for any task" in WSL/VSCode environments. Networking reliability concern with broad agreement from affected users.

5. **Windows desktop app: cross-session messages silently dropped** — [#86298](https://github.com/anthropics/claude-code/issues/86298) (19 comments, 1 👍)
   Messages are held for an approval the UI never offers, then expire after ~5 minutes. Reported as a regression since app 1.28929.0; includes a repro.

6. **VSCode extension: add option to prevent panel from stealing focus** — [#32726](https://github.com/anthropics/claude-code/issues/32726) (14 comments, 52 👍)
   The panel auto-reveals and steals focus on every output, interrupting work in other editor tabs. Long-standing IDE UX request with strong support.

7. **Improve the model's ability to follow instructions** — [#13689](https://github.com/anthropics/claude-code/issues/13689) (13 comments, 7 👍)
   Broad enhancement request on instruction adherence, particularly late in long sessions. Related to several recently closed "model degradation" reports.

8. **Cowork VM failures on Intel Mac (regression)** — [#87503](https://github.com/anthropics/claude-code/issues/87503) (9 comments, CLOSED) and follow-up [#87759](https://github.com/anthropics/claude-code/issues/87759) (1 comment, OPEN)
   The first report was closed, but a follow-up shows the VM kernel halting at ~1.7s on app 1.32352.1 with the host hanging at `usernet: calling AcceptBess` — the issue appears unresolved for affected users.

9. **Login token expiration too short for slow email delivery** — [#84806](https://github.com/anthropics/claude-code/issues/84806) (1 comment)
   Login tokens expire after ~10 minutes, but authentication emails can take 11+ minutes to arrive, making sign-in impossible. Small but sharp DX edge case.

10. **`Bash` tool description embeds per-session URL, invalidating the whole prompt cache on every `/resume`** — [#87137](https://github.com/anthropics/claude-code/issues/87137) (1 comment)
    Deep technical report: the Bash tool definition contains a session-specific console URL that changes on resume, forcing a full cache re-read from the first bytes. Highly relevant for performance-sensitive teams using `/resume`.

*Also notable: #77071 (Dispatch tab missing from Claude Desktop on Windows 11, 10 comments).*

## Key PR Progress

PR activity was light in the last 24 hours (2 items total):

1. **[OPEN] add the missing source to claude code** — [#41611](https://github.com/anthropics/claude-code/pull/41611) by tornikeo
   Long-dormant PR (open since March 31) adding a missing source reference; still awaiting review.

2. **[CLOSED] ralph-wiggum: use `disable-model-invocation` so the model can't self-invoke `/ralph-loop`** — [#87395](https://github.com/anthropics/claude-code/pull/87395) by bcherny
   Fixes the ralph-wiggum plugin where `hide-from-slash-command-tool` is an unsupported frontmatter key, allowing Claude to self-invoke `/ralph-loop` and start a loop without user request.

## Feature Request Trends

- **Durable memory**: Users want persistent memory across context compactions and sessions (#34556, #66143). The community is resorting to building its own persistence tooling.
- **IDE ergonomics**: Requests to stop the VSCode panel from stealing focus (#32726) and improve TTY/accessibility rendering (#71318, #72698) remain steady.
- **Instruction adherence**: Repeated asks for reliable enforcement of CLAUDE.md and in-context rules, especially late in long sessions (#13689, #87469).
- **Remote Control availability**: Users want the supervisor to stay alive when no client is attached (e.g., overnight) (#85269) and to work across machines (#87154).
- **Governance flexibility**: Complaints about cyber-safeguard false positives (#84352) suggest demand for more granular org-level control.

## Developer Pain Points

- **Connection reliability**: "Connection closed mid-response" (#69415) and cross-session messaging failures (#86962) render the tool unusable in some setups.
- **Context/memory loss**: Compaction wiping context (#34556), forgotten facts across sessions (#66143), and premature auto-compact at ~47% of the 1M window (#72600) are recurring themes.
- **Regression coverage on less-common platforms**: Intel Mac Cowork VM failures (#87503, #87759), Windows cross-session message drops (#86298), and Bun/ntdll crashes (#67255) suggest platform coverage gaps.
- **Prompt cache economics**: Session-specific data in tool definitions (like the Bash console URL) silently destroys cache benefits on resume (#87137) — 2.1.235 addresses a related language-server reconnect cache bug.
- **Auth friction**: Short-lived login tokens colliding with slow email delivery (#84806) can block users entirely.
- **Model behavior in long sessions**: Unverified work claims (#66054), ignored CLAUDE.md rules (#87469), and multi-symptom degradation (#66539) point to reliability concerns in extended autonomous use.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-19

## Today’s Highlights
Codex `rust-v0.148.0` shipped with TUI workflow upgrades: full conversation export to Markdown, session forking via `codex exec fork`, and the ability to draft prompts while the TUI initializes. Meanwhile, the community remains focused on Windows-specific regressions, MCP resource leaks, and custom-provider compatibility issues. The most active thread, “Burning tokens very fast,” continues to draw heavy engagement with 630 comments and 285 👍.

## Releases
- [rust-v0.148.0](https://github.com/openai/codex/releases/tag/rust-v0.148.0) — New in 0.148.0:
  - Export complete TUI conversations to Markdown with `/export`, either to clipboard or a new file.
  - Fork sessions with `codex exec fork`.
  - Archive or restore sessions from the TUI resume picker.
  - Draft prompts while the TUI initializes.

No release notes were provided for `0.148.0-alpha.23` and `0.148.0-alpha.22`.

## Hot Issues

1. [Burning tokens very fast (#14593)](https://github.com/openai/codex/issues/14593)  
   The top community concern: users report unexpectedly high token consumption in the IDE extension. With 630 comments and 285 👍, this remains the most discussed open issue.

2. [Codex built-in browser plugin initialization fails: Trusted RPC dependency (#39136)](https://github.com/openai/codex/issues/39136)  
   Windows users cannot use the in-app browser because the trusted RPC path is rejected. 61 comments in under a day — clearly a fresh, high-impact Windows bug.

3. [VS Code extension opens blank webview on Linux (#32041)](https://github.com/openai/codex/issues/32041)  
   Linux users on extension `26.5707.*` see a blank webview; older `26.5623` works but lacks GPT-5.6 Sol support. A frustrating regression splitting Linux users between broken UI and missing model features.

4. [MCP server processes leak: 9+ GB RSS (#30408)](https://github.com/openai/codex/issues/30408)  
   App-server spawns MCP processes per thread and never cleans them up after threads are archived/closed. This explains severe memory growth and is a top performance pain point.

5. [Feature request: multiple named accounts per app/connector (#20500)](https://github.com/openai/codex/issues/20500)  
   Highly requested with 107 👍: users want multiple separately authorized accounts per app/connector with explicit account selection and hard privacy boundaries.

6. [Subagent cards stuck/visible after close (#23930)](https://github.com/openai/codex/issues/23930)  
   Desktop UI can leave completed subagents visible even when no live agent handle remains. A persistent state-sync bug in the app layer.

7. [macOS regression: Desktop cannot resume Remote Control/CLI thread (#37403)](https://github.com/openai/codex/issues/37403)  
   After the August 7 update, resuming a remote-controlled CLI thread fails with `already has an active writer`. Breaks a common hybrid mobile/desktop workflow.

8. [WSL repositories marked as non-Git on Windows (#35119)](https://github.com/openai/codex/issues/35119)  
   Latest Windows build reports “Git is unavailable” for valid WSL ext4 repos. Windows/WSL users are blocked from normal Git integration.

9. [Azure Responses rejects empty functions namespace description (#37380)](https://github.com/openai/codex/issues/37380)  
   A 0.147.0 regression for Azure OpenAI/custom Responses providers: empty `functions` namespace `description` breaks tool calls with GPT-5.6 Sol. 18 comments and 40 👍 indicate wide custom-provider impact.

10. [GPT-5.6 Sol turns fail: reserved `collaboration.spawn_agent` (#31864)](https://github.com/openai/codex/issues/31864)  
    MultiAgentV2 sends a reserved tool schema, causing every GPT-5.6 Sol request to fail. This is critical for users on Sol models, especially with custom configurations.

## Key PR Progress

1. [Attribute executor skill invocations to plugins (#39309)](https://github.com/openai/codex/pull/39309)  
   Carries plugin identities from MCP discovery into per-turn extension data and annotates executor skill catalog entries with the matching plugin ID and scope.

2. [Fail closed on Guardian V2 risk scoring errors (#39307)](https://github.com/openai/codex/pull/39307)  
   Treats config, serialization, lookup, and classification errors as elevated risk instead of retaining prior low-risk results — a security-hardening improvement.

3. [Honor managed config during project discovery (#39306)](https://github.com/openai/codex/pull/39306)  
   Includes legacy managed-file and MDM settings when resolving project root markers and trust, preserving managed-layer precedence.

4. [Keep Guardian v2 risk scores in memory (#39304)](https://github.com/openai/codex/pull/39304)  
   Stops writing risk scores to rollout history and resets scores on resumed/forked threads so first tool approvals are classified normally.

5. [Prevent Node REPL auth tokens from reaching child processes (#39301)](https://github.com/openai/codex/pull/39301)  
   Adds `NODE_REPL_AUTH_TOKEN` to the blocked environment variables that model-reachable child processes cannot inherit.

6. [Restrict agent roles to bounded configuration overrides (#39299)](https://github.com/openai/codex/pull/39299)  
   Agents can now customize child-agent behavior without expanding authority or changing inherited provider configuration.

7. [Allow overriding Codex package versions (#39298)](https://github.com/openai/codex/pull/39298)  
   Adds `--package-version` to set the version written to `codex-package.json`, with validation against runtime-incompatible semver.

8. [Enable MCP tool hooks in Codex sessions (#39296)](https://github.com/openai/codex/pull/39296)  
   Executes `mcp_tool` hook handlers through the shared MCP runtime, restricted to already-connected, cataloged, and policy-allowed tools.

9. [Add Windows sandbox diagnostics to `codex doctor` (#39290)](https://github.com/openai/codex/pull/39290)  
   Reports Windows sandbox backend, denied-read status, and diagnoses incompatible policies, provisioning failures, and ACL issues.

10. [Show file destinations in TUI change approvals (#39285)](https://github.com/openai/codex/pull/39285)  
    Fixes blank approval prompts by showing a description and destination paths for each file change, including cross-platform path formatting.

Also notable this cycle: [SQLite log sink batching increase (#39294)](https://github.com/openai/codex/pull/39294), [network disconnect reporting during approval (#39284)](https://github.com/openai/codex/pull/39284), and [preserving owner-provided environment config (#39278)](https://github.com/openai/codex/pull/39278).

## Feature Request Trends
- **Multi-account support**: Multiple named accounts per app/connector with explicit selection and privacy boundaries ([#20500](https://github.com/openai/codex/issues/20500)).
- **Cross-provider session handoff**: Normalized tool history so long-running sessions can be continued with a different model provider ([#38365](https://github.com/openai/codex/issues/38365)).
- **Conversation sync/refresh controls**: Manual refresh or auto-sync for archived and cross-surface conversations ([#11907](https://github.com/openai/codex/issues/11907)).
- **Windows lifecycle cleanliness**: Users want less opaque runtime paths and proper cleanup/uninstall controls ([#27230](https://github.com/openai/codex/issues/27230)).

## Developer Pain Points
- **Token/rate-limit anxiety**: “Burning tokens very fast” remains the most-voted and most-commented issue ([#14593](https://github.com/openai/codex/issues/14593)).
- **Windows/WSL regressions**: Repeated breakage in Git detection ([#35119](https://github.com/openai/codex/issues/35119)), integrated terminal startup ([#37104](https://github.com/openai/codex/issues/37104)), archiving with `\\?\` paths ([#39209](https://github.com/openai/codex/issues/39209)), and Remote Control enrollment ([#32164](https://github.com/openai/codex/issues/32164)).
- **MCP resource and auth issues**: Process leaks ([#30408](https://github.com/openai/codex/issues/30408)) and refresh tokens that stay “usable” after rejection, causing infinite retries instead of re-authentication ([#39054](https://github.com/openai/codex/issues/39054)).
- **Custom provider incompatibilities**: MCP tools wrapped in proprietary `namespace` types break strict backends ([#23186](https://github.com/openai/codex/issues/23186)), and Azure Responses rejects empty functions namespace descriptions ([#37380](https://github.com/openai/codex/issues/37380)).
- **Thread/session resumption failures**: Remote control resumption fails on macOS ([#37403](https://github.com/openai/codex/issues/37403)), while large-thread resume is effectively quadratic and times out on iOS Remote ([#38787](https://github.com/openai/codex/issues/38787)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-19

## 1. Today's Highlights

The `v0.56.0-nightly.20260818.g194edea47` build landed with two SSR Agent fixes (privacy notice copy and TypeScript strict-null test cleanup). Meanwhile, the community's loudest concerns remain agent reliability: the generalist agent's tendency to hang on simple tasks ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)) and subagent failures being misreported as successes ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) continue to dominate discussion. On the positive side, a steady stream of SSR Agent PRs is closing long-standing bugs, including symlinked agent support and OAuth callback crash fixes.

## 2. Releases

**v0.56.0-nightly.20260818.g194edea47** — Nightly release with two changes:

- **[SSR Agent] Issue Fix (26120)**: Clarified privacy notice wording and selection options ([PR #28820](https://github.com/google-gemini/gemini-cli/pull/28820))
- **[SSR Agent] Issue Fix (21919)**: Fixed TypeScript strict-null errors in integration tests ([PR #28820](https://github.com/google-gemini/gemini-cli/pull/28820))

## 3. Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** *(p1, 12 comments)* — `codebase_investigator` reports `status: "success"` / `Termination Reason: "GOAL"` even when it exhausted its turn limit before doing any analysis. This is a dangerous false-positive for users relying on subagent results; one of the most-commented issues today.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** *(p1, 8 👍, 8 comments)* — The generalist agent hangs indefinitely on trivial operations like folder creation. Users report waiting up to an hour before cancelling; instructing the model to avoid subagents is currently the only workaround. High community frustration.

3. **[#25166 — Shell command stuck with "Waiting input" after completing](https://github.com/google-gemini/gemini-cli/issues/25166)** *(p1, 3 👍)* — Simple CLI commands finish but the UI remains stuck showing "Awaiting user input." This is a recurring p1 core bug that undermines trust in shell execution.

4. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** *(p2)* — The background extraction agent re-surfaces unprocessed sessions forever when it decides they're low-signal, causing wasted work and context churn in the memory system.

5. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** *(p2, security)* — Transcript content is sent to the extraction model *before* prompt-based redaction happens, and the service may log existing skill content — a privacy gap flagged by the community.

6. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** *(p2)* — Anecdotal but widely echoed: the CLI has custom skills/subagents but only uses them when explicitly instructed, even for highly relevant tasks.

7. **[#24246 — 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** *(p2)* — Enabling too many tools breaks API calls. The ecosystem expectation is smarter tool-scoping, not a hard ceiling.

8. **[#20079 — Symlinked agent markdown files not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)** *(p2)* — `~/.gemini/agents/filename.md` symlinks are silently ignored. A fix is already in flight (see PR [#28883](https://github.com/google-gemini/gemini-cli/pull/28883)).

9. **[#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** *(p2, enhancement, effort/large)* — Proposal to lean into Gemini 3's native bash affinity while sandboxing execution and routing post-command intent. Represents a major architectural direction debate.

10. **[#22745 — Assess AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** *(p2, epic)* — Tracking investigation into AST-aware tooling to reduce token bloat and misaligned file reads. Companion issue [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) suggests `tilth`/`glyph` as starting points.

## 4. Key PR Progress

1. **[#28892 — Preserve empty text turns with tools or media](https://github.com/google-gemini/gemini-cli/pull/28892)** *(open)* — Hardens `isValidContent` so model turns containing `text: ''` are kept in curated history when they carry tool requests/responses or multimodal media, preventing context corruption.

2. **[#28898 — Harden subprocess execution security and sanitization](https://github.com/google-gemini/gemini-cli/pull/28898)** *(open)* — Prevents sensitive auth tokens from leaking into untrusted tool execution environments and hardens GitHub API interactions in the PR generator core.

3. **[#28883 — Support symlinked agent markdown files](https://github.com/google-gemini/gemini-cli/pull/28883)** *(closed)* — Fixes [#20079](https://github.com/google-gemini/gemini-cli/issues/20079): agent discovery now follows symlinks in agent directories.

4. **[#28877 — Prevent false-positive loop detection on uniform streaming content](https://github.com/google-gemini/gemini-cli/pull/28877)** *(closed)* — Stops the loop-detection service from firing on padded/uniform streamed characters (e.g., consecutive spaces) right after prompt submission.

5. **[#28873 — Prevent unhandled promise rejection on OAuth callback timeout](https://github.com/google-gemini/gemini-cli/pull/28873)** *(closed, p1 security)* — Fixes a crash when the OAuth callback server times out after 5 minutes, which left an unhandled promise rejection in the auth flow.

6. **[#28870 — Emit pending tool call update before requesting permission](https://github.com/google-gemini/gemini-cli/pull/28870)** *(closed, p1 core)* — In ACP mode, the agent now sends a `tool_call` session update with `status: 'pending'` before `session/request_permission`, fixing a protocol violation.

7. **[#28895 — Recognize mixed function-call turns](https://github.com/google-gemini/gemini-cli/pull/28895)** *(open)* — Fixes [#28894](https://github.com/google-gemini/gemini-cli/issues/28894): handles turns that mix text and function calls so they aren't mis-parsed.

8. **[#28897 — Respect plan-routing model availability](https://github.com/google-gemini/gemini-cli/pull/28897)** *(open)* — Fixes [#28896](https://github.com/google-gemini/gemini-cli/issues/28896): ensures plan routing falls back gracefully when the preferred model isn't available.

9. **[#28891 — Fix eval retry 429 rate limit](https://github.com/google-gemini/gemini-cli/pull/28891)** *(open, help wanted)* — `withEvalRetries` was silently missing `RESOURCE_EXHAUSTED`/429 errors from the Gemini API, causing evals to fail on quota rather than real assertion failures.

10. **[#28869 — Fix host network resolution for gVisor runsc sandbox](https://github.com/google-gemini/gemini-cli/pull/28869)** *(closed, p2 extensions)* — Fixes [#21331](https://github.com/google-gemini/gemini-cli/issues/21331): the VSCode companion extension couldn't connect under `GEMINI_SANDBOX=runsc` due to gVisor's TCP restrictions.

## 5. Feature Request Trends

- **AST-aware code intelligence** — Multiple issues ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) push toward AST-aware file reads, method-bound extraction, and "tactful" token-frugal code discovery to replace firehose-style large-file reads.
- **OS-level sandboxing with bash-native UX** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) advocates zero-dependency sandboxing plus post-execution intent routing, letting models use native POSIX toolchains safely.
- **Subagent observability and self-awareness** — Community wants subagent trajectories in `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and accurate self-knowledge of CLI flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Browser agent resilience** — [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) requests automatic session takeover and lock recovery instead of fail-fast for locked browser profiles.
- **Robust component-level evals** — [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) tracks scaling behavioral eval coverage (76 tests across 6 Gemini models) to hold the agent accountable.

## 6. Developer Pain Points

- **"Hangs forever" is the top complaint** — Generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell "Waiting input" deadlocks ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive-prompt stalls during scaffolding ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) collectively erode confidence in unattended automation.
- **False success reporting** — Subagents can hit `MAX_TURNS` and still report `GOAL` success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), making failures indistinguishable from completed work.
- **Memory-system trust & privacy gaps** — Auto Memory retries low-signal sessions indefinitely ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)), silently skips invalid patches ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)), and sends transcript content to models before deterministic redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)).
- **Context and token bloat** — Large file reads "firehose" context (+15k tokens/turn observed), and the 128-tool ceiling produces hard 400 errors ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).
- **Messy workspace byproducts** — Models create ad-hoc tmp scripts across directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) and occasionally reach for destructive `git reset`/`--force` when safer alternatives exist ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Proactive capability underuse** — Custom skills and subagents are ignored unless explicitly invoked ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)), defeating the point of user-configured workflows.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-19

## Today’s Highlights

- **v1.0.81-1** released with Gemini 3.7 Flash support, a new `Ctrl+E` sandbox settings shortcut, and per-agent usage metrics.
- Community attention is focused on **enterprise model availability** (#4390), **sandbox enforcement bugs** (#4522, #4521), and **MCP/OAuth regressions** (#4490).
- Only one PR appeared in the last-24h window, and it appears unrelated to Copilot CLI functionality; no substantive PR momentum to report.

## Releases

### v1.0.81-1
- **Added:** Support for Gemini 3.7 Flash
- **Added:** `Ctrl+E` in `/sandbox` opens `settings.json` in the editor
- **Added:** Per-agent usage metrics in `--usage-output-file` JSON output
- **Improved:** Use `x` to remove scheduled `/every` and `/after` prompts in Schedule Manager
- **Fixed:** “Turning allow-all off from …” — source note is truncated

🔗 [Release v1.0.81-1](https://github.com/github/copilot-cli/releases/tag/v1.0.81-1)

---

## Hot Issues

1. **[#4390 — Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5 and Kimi K3)**](https://github.com/github/copilot-cli/issues/4390)  
   *Open, 10 comments, 👍 7*  
   Enterprise Copilot Business orgs explicitly enable models, but the CLI’s effective catalogue omits them. Affects Anthropic and Kimi models, blocking users who have legitimate org access.

2. **[#4313 — Allow scrolling through the current conversation history](https://github.com/github/copilot-cli/issues/4313)**  
   *Open, 8 comments*  
   Terminal interaction lacks wheel/PageUp/PageDown navigation through history. High-impact for long interactive sessions.

3. **[#2904 — Custom Agent YAML Frontmatter Should Support Reasoning Effort](https://github.com/github/copilot-cli/issues/2904)**  
   *Open, 7 comments, 👍 20*  
   Custom agents can pin a model but cannot set `reasoning effort` per agent. Strong community demand for per-agent control.

4. **[#2958 — Support per-mode default model configuration (plan mode vs. autopilot)](https://github.com/github/copilot-cli/issues/2958)**  
   *Open, 4 comments, 👍 16*  
   Users want separate default models for plan vs. autopilot modes. A recurring configuration flexibility request.

5. **[#4490 — Atlassian MCP OAuth authentication broken in 1.0.80 (RFC 8414 §3.3 regression)](https://github.com/github/copilot-cli/issues/4490)**  
   *Open, 3 comments*  
   A working Atlassian MCP setup in 1.0.78 fails in 1.0.80 due to issuer metadata mismatch. A clear auth regression.

6. **[#4520 — Standalone `.github/hooks/*.json` postToolUse hook never fires](https://github.com/github/copilot-cli/issues/4520)**  
   *Open, 2 comments*  
   Repo-root hooks are silently undiscovered. No debug-log trace exists, making this harder for users to diagnose.

7. **[#4522 — 1.0.81 forces sandbox while managed policy is undetermined, overriding `sandbox.enabled=false`](https://github.com/github/copilot-cli/issues/4522)**  
   *Open, 1 comment, 👍 2*  
   New regression: CLI enables sandbox even when the user explicitly disables it and the server policy has not yet resolved.

8. **[#4521 — Sandbox cannot be disabled](https://github.com/github/copilot-cli/issues/4521)**  
   *Open, 1 comment, 👍 2*  
   Config UI shows sandbox disabled, but runtime still reports/uses sandbox. Undermines trust in the configuration surface.

9. **[#4392 — Post-authentication MCP client rebuild leaves orphaned stdio MCP server processes](https://github.com/github/copilot-cli/issues/4392)**  
   *Open, 2 comments*  
   On startup, spawned stdio servers are torn down and re-spawned after GitHub auth; the first batch is never killed, leaking processes.

10. **[#4513 — Plugin marketplace cache ignores `ref` when shared across projects with different branches](https://github.com/github/copilot-cli/issues/4513)**  
    *Open, 1 comment*  
    Marketplace cache is keyed by URL/path only, so projects pinning different branch refs can pick up the wrong checkout.

---

## Key PR Progress

Only one PR was updated in the last 24 hours:

- **[#3163 — “ViewSonic monitor”](https://github.com/github/copilot-cli/pull/3163)**  
  *Open*  
  This PR appears unrelated to Copilot CLI functionality and looks like a mistaken/spam PR. It references issues #2591, #3561, and #3559, but the summary contains no meaningful code or feature description.

**No substantive PR progress to highlight in this digest.**

---

## Feature Request Trends

- **Per-agent and per-mode model control**  
  Users want reasoning effort per custom agent (#2904), separate models for plan vs. autopilot (#2958), and BYOK credential refresh without CLI restart (#3682).

- **Sandbox configuration must be respected**  
  Multiple requests/reports demand that explicit `sandbox.enabled=false` is honored and that sandbox behavior is predictable (#4522, #4521, #4516).

- **Plugin marketplace improvements**  
  Search/filter support for `plugin marketplace browse` (#4523) and correct `ref`-aware caching for shared marketplaces (#4513).

- **Session/UX refinements**  
  Scrollable conversation history (#4313), persistent manual `/rename` (#2622), and reliable session AIC usage display (#4511).

---

## Developer Pain Points

- **Sandbox enforcement overrides user intent**  
  Sandbox is enabled even when disabled, or path grants are ignored by JVM processes, breaking Java/Maven workflows (#4522, #4521, #4516).

- **MCP instability and process leaks**  
  OAuth regressions (#4490), orphaned stdio child processes (#4392), unbounded re-spawns (#3698), BigInt serialization crashes (#4211), and duplicate `structuredContent` (#4515) are creating serious reliability issues.

- **Configuration is silently ignored**  
  `allowed_directories` does not suppress path prompts (#4482), built-in agents ignore custom instructions (#1990), standalone hooks are never discovered (#4520), and marketplace cache keys ignore `ref` (#4513).

- **Enterprise model and usage visibility gaps**  
  Organization-enabled models are missing from the catalogue (#4390), and session AIC meters under-report consumption, notably with Kimi K3 (#4511).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-19

**Source:** [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)  
**Note:** Only 2 issues and 2 PRs were updated in the 24h window, so this digest is intentionally compact.

## 1. Today's Highlights

No new releases landed in the last 24 hours. The most notable community activity is a web UI rendering regression for non-Kimi OpenAI-compatible providers ([#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607)) and an open-source benchmark of K3 + Kimi Code for quantitative trading strategy generation ([#2608](https://github.com/MoonshotAI/kimi-cli/issues/2608)). On the PR side, a long-running KaOS SSH logging fix was closed ([#848](https://github.com/MoonshotAI/kimi-cli/pull/848)), while a new "knowledge plane" PR is open for review ([#2606](https://github.com/MoonshotAI/kimi-cli/pull/2606)).

## 2. Releases

No releases published in the last 24 hours.

## 3. Hot Issues

Only 2 issues were updated in the window.

- **[#2607 — Web UI: assistant messages re-render as one-fragment-per-line after tab switch/reload for non-Kimi (OpenAI-compatible) providers](https://github.com/MoonshotAI/kimi-cli/issues/2607)**  
  Author: chenxupeng1990-eng | Created: 2026-08-18 | Comments: 1  
  **Why it matters:** This is a usability regression in the web UI for users connecting custom OpenAI-compatible providers. Messages render correctly during streaming, but after a tab switch, reload, or session reopen, they are re-rendered as a narrow vertical strip of stream deltas. That makes long assistant responses difficult or impossible to read.  
  **Community reaction:** One comment so far; no reactions yet. Likely waiting for maintainer triage.

- **[#2608 — Benchmarked K3 + Kimi Code on out-of-sample quant strategy generation — full report open-sourced](https://github.com/MoonshotAI/kimi-cli/issues/2608)**  
  Author: frank-quant | Created: 2026-08-18 | Comments: 0  
  **Why it matters:** A community member publicly benchmarked K3 + Kimi Code for building an ETH perpetual futures strategy on Freqtrade. This is a good example of real-world use outside traditional software development, and the full report is open-sourced.  
  **Community reaction:** No comments yet, but the issue itself is a strong signal of growing adoption in AI-assisted quantitative trading.

## 4. Key PR Progress

Only 2 PRs were updated in the window.

- **[#848 — fix(kaos): log ssh failures when enabled (CLOSED)](https://github.com/MoonshotAI/kimi-cli/pull/848)**  
  Author: powerfooI | Created: 2026-02-02 | Updated: 2026-08-18  
  **Description:** Fixes missing SSH failure logging when the KaOS feature is enabled. This PR was open for several months and has now been closed.  
  **Why it matters:** Better logging for SSH failures is important for debugging remote/agentic workflows.

- **[#2606 — Dev/knowledge plane (OPEN)](https://github.com/MoonshotAI/kimi-cli/pull/2606)**  
  Author: SoMiReMiReDo | Created: 2026-08-18 | Updated: 2026-08-18  
  **Description:** An open PR proposing a "knowledge plane" for development workflows. The body is mostly the standard contribution template, so implementation details are still unclear.  
  **Why it matters:** "Knowledge plane" suggests a feature direction around persistent knowledge organization and retrieval, which aligns with broader AI-assisted development trends.

## 5. Feature Request Trends

No explicit feature-request issues were filed in the last 24 hours. However, two loose signals emerged:

- **Web UI robustness for non-Kimi providers:** Issue [#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607) implies a latent expectation that all OpenAI-compatible providers should have the same rendering behavior as Kimi after session remounts.
- **Knowledge management / persistent context:** PR [#2606](https://github.com/MoonshotAI/kimi-cli/pull/2606) hints at user interest in a dedicated "knowledge plane" for development workflows.

Given the small sample, these should be treated as directional rather than confirmed trends.

## 6. Developer Pain Points

The clearest pain point from this window is the **web UI re-rendering bug for non-Kimi providers** ([#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607)): assistant messages become a one-fragment-per-line vertical strip after tab switch/reload, which severely hurts readability for users relying on custom OpenAI-compatible endpoints.

No other high-frequency frustrations were visible in the last 24 hours. The low issue volume makes it difficult to identify broader patterns from this snapshot alone.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Today's Highlights

No new OpenCode release landed in the last 24 hours. Community attention is concentrated on OpenCode Go quota/billing discrepancies — especially DeepSeek V4 Flash usage appearing ~4x higher than displayed cost — along with a critical message-ID rollover bug that can reorder or delete session history. Contributor PRs are meanwhile targeting provider-specific defaults, MCP tool registration, and TUI/CLI workflow improvements.

## Releases

No releases were published in the last 24 hours.

## Hot Issues

1. [#42985 – OpenCode Go quota usage appears ~4x higher than displayed DeepSeek V4 Flash cost](https://github.com/anomalyco/opencode/issues/42985)  
   The most active open issue in this window. Users see dashboard costs around $3.31 but quota consumption that implies ~4x higher usage. 15 comments and 7 👍 show strong concern over OpenCode Go billing transparency.

2. [#3787 – Linear Agent (closed)](https://github.com/anomalyco/opencode/issues/3787)  
   Closed, but still the highest-reaction discussion at 34 👍. It reflects durable demand for connecting Linear issue-tracker workflows directly to agents.

3. [#7648 – Setting to prevent TUI scrolling when new messages are streamed-in (closed)](https://github.com/anomalyco/opencode/issues/7648)  
   A heavily upvoted UX request (18 👍). Users want to read earlier output while new agent messages stream below without forced auto-scrolling.

4. [#7226 – /resume and /pause command (closed)](https://github.com/anomalyco/opencode/issues/7226)  
   Strong signal for explicit agent lifecycle control. 28 👍 indicate developers want to pause long-running sessions instead of interrupting them.

5. [#33495 – Zen balance does not remove free usage cap; paid users still hit 200-request/free usage limit](https://github.com/anomalyco/opencode/issues/33495)  
   Paying users with a Zen balance are still blocked by free-tier 429s. This is a trust and reliability problem for anyone relying on paid OpenCode accounts.

6. [#37489 – Performance issue: context cache invalidation when switching modes or during compaction](https://github.com/anomalyco/opencode/issues/37489)  
   Users of local LLMs via vLLM/Ollama report significant slowdowns when context caches are invalidated by mode switches or compaction. Important for local-first performance.

7. [#43023 – OpenCode Go quota usage inconsistency: monthly percentage exceeds weekly percentage with mismatched cost statistics](https://github.com/anomalyco/opencode/issues/43023)  
   Another quota-correctness report where dashboard percentages cannot be reconciled with the user’s actual spend. Adds to the growing billing-math concern.

8. [#42935 – OpenCode Go quota exhausted in ~20 minutes after DeepSeek V4 Flash cache reads suddenly dropped to 0](https://github.com/anomalyco/opencode/issues/42935)  
   Suggests a possible cache/billing interaction that can burn an entire Go quota in minutes. High urgency for Go subscribers using DeepSeek V4 Flash.

9. [#43303 – Message IDs wrapped on 2026-08-14: new messages sort before old ones, silencing sessions and deleting history on revert](https://github.com/anomalyco/opencode/issues/43303)  
   Critical data-integrity bug. The 48-bit ID timestamp rolled over, causing new messages to sort before older history and enabling destructive reverts.

10. [#43277 – Sessions permanently stuck during normal use — survive reboots, cannot be recovered](https://github.com/anomalyco/opencode/issues/43277)  
   Sessions become permanently unresponsive, persist across system reboots, and cannot be recovered by restarting the server. A severe reliability issue for daily users.

## Key PR Progress

1. [#43310 – fix(opencode): remove Qwen sampling defaults](https://github.com/anomalyco/opencode/pull/43310)  
   Stops forcing `temperature: 0.55` and `top_p: 1` on all Qwen models. Provider/server defaults now apply, while `chat.params` plugins can still override sampling.

2. [#43309 – feat(opencode): make generated title length configurable](https://github.com/anomalyco/opencode/pull/43309)  
   Adds `title_max_words` config support so the title agent can cap generated session titles at a configurable length. Closes #43118.

3. [#43308 – fix(app): limit prompt drag state to files](https://github.com/anomalyco/opencode/pull/43308)  
   Prevents ordinary text/link drags from triggering prompt attachment behavior. File-tree drags now use an OpenCode-specific MIME type.

4. [#37684 – feat(mcp): bridge runtime-added MCP tools into the core tool registry](https://github.com/anomalyco/opencode/pull/37684)  
   Fixes the runtime MCP feature for the primary user-facing prompt path by reconciling two independent MCP services in the daemon.

5. [#37678 – feat(session): expose toolChoice via PromptInput and agent config](https://github.com/anomalyco/opencode/pull/37678)  
   The internal LLM layer already supported tool-choice control; this PR exposes it to agent configuration and prompt input, closing #32465.

6. [#37679 – fix(core): drop undefined metadata values from permission requests](https://github.com/anomalyco/opencode/pull/37679)  
   Prevents `undefined` optional inputs from leaking into `glob`/`grep` permission metadata. A correctness fix for permission flows.

7. [#37670 – feat(cli): add saved remote servers](https://github.com/anomalyco/opencode/pull/37670)  
   Adds named remote-server profiles with optional basic-auth credentials, plus `opencode2 server add/list/remove` management commands.

8. [#37669 – fix(core): recover malformed tool input](https://github.com/anomalyco/opencode/pull/37669)  
   Malformed tool arguments are now represented as non-executable `tool-input-error` calls with stable identity, allowing the model to recover without failing the entire step.

9. [#37668 – feat(tui): add server switcher](https://github.com/anomalyco/opencode/pull/37668)  
   Adds a `<leader>w` server picker to the V2 TUI, validates remote endpoints, and remounts the server-scoped provider tree to prevent state leakage.

10. [#37634 – fix(mcp): drain stderr pipe, limit spawn concurrency, add retry with backoff](https://github.com/anomalyco/opencode/pull/37634)  
   Addresses stdio MCP server connection failures (`-32000: Connection closed`), especially on Windows, with stderr draining, concurrency limits, and retry logic.

## Feature Request Trends

- **Agent lifecycle and orchestration**: `/resume` and `/pause` (#7226), Linear Agent integration (#3787), Agent Teams using paid APIs (#43301), and `toolChoice` exposure (#37678) all point toward more explicit control over agent runs and multi-agent workflows.

- **Quota and billing transparency**: Many users are asking for OpenCode Go/Zen usage accounting that matches actual spend, and for paid balances to bypass free-tier caps (#42985, #43023, #33495, #43208).

- **TUI/UX predictability**: Desired improvements include an auto-scroll toggle (#7648), non-overlapping prompt controls on narrow displays (#43295), and visible `question` tool prompts while streaming (#43196).

- **Storage and performance efficiency**: Requests center on event-table bloat from full message snapshots (#41175), quadratic `message.updated` writes (#42748), and better context-cache behavior during compaction/mode switches (#37489).

- **Model/provider interoperability**: Users and contributors want OpenCode to stop hard-coding provider-specific sampling defaults (#43310), normalize schemas for Gemini/Kimi (#34130, #37625), and detect Mermaid diagrams in untagged fences (#43304).

## Developer Pain Points

- **Opaque or incorrect quota metering** is the dominant frustration. Multiple reports (#42985, #43023, #42935, #41391, #40031, #43149) show Go/Zen dashboards disagreeing with Usage History, documented limits, or actual spend.

- **Paid users hitting free-tier limits**: Even with Zen balances, users report 429s and "Free usage exceeded" messages (#33495, #43208), making paid subscriptions feel unreliable.

- **Session and project state fragility**: Stuck sessions that survive reboots (#43277), stale project paths after directory moves (#34737), and the message-ID rollover bug (#43303) can interrupt work or risk data loss.

- **Storage amplification from event snapshots**: Full message copies per streaming update (#41175) and repeated `summary.diffs` serialization (#42748) lead to multi-GB databases and quadratic write behavior.

- **Provider-specific integration quirks**: Hard-coded Qwen sampling (#42775), Gemini nullable-union schema errors (#34130), Kimi history-replay 400s (#37624), and ignored compaction-agent variants (#41578) force users and maintainers into constant compatibility workarounds.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-19

## Today’s Highlights

No new releases landed in the last 24 hours, but the project was unusually active on hardening and reliability. Maintainers and contributors focused on TUI rendering pathologies for long transcripts, OpenAI-compatible provider edge cases, Anthropic fallback cost accounting, and extending the agent/extension hook surface. Several PRs also made progress on compaction behavior, Bedrock reasoning support, and Windows developer experience.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. [**#8281 — TUI: full-screen flash when content above the viewport changes in long transcripts**](https://github.com/earendil-works/pi/issues/8281)  
   Long transcripts (~10k+ lines) cause the whole screen to clear and redraw whenever a line above the visible area changes. This makes interactive sessions visually unusable. 4 comments; labeled `bug, no-action`, but the related rendering fixes are moving through PRs.

2. [**#8323 — OpenAI client created with no timeout**](https://github.com/earendil-works/pi/issues/8323)  
   `createClient` falls back to the OpenAI SDK’s 600s default. Local models that think longer than ten minutes simply get cut off mid-generation. A small config gap with serious consequences for self-hosted users.

3. [**#8328 — Threshold compaction never fires for zero-usage providers**](https://github.com/earendil-works/pi/issues/8328)  
   When a provider omits the final `usage` block, threshold auto-compaction is completely skipped. This silently defeats context management for a whole class of OpenAI-compatible backends.

4. [**#8309 — When the conversation becomes long, the interface jumps to the top and then back**](https://github.com/earendil-works/pi/issues/8309)  
   Reproduced on both macOS and Windows. Long-running sessions become jarring because the interface repositions to the top on each new command. Related to the broader TUI redraw issues.

5. [**#8285 — Anthropic fallback usage is priced with the requested model**](https://github.com/earendil-works/pi/issues/8285)  
   If Anthropic server-side fallback returns a different model, cost is still calculated using the requested model. This corrupts usage/cost tracking and is being addressed by multiple PRs.

6. [**#8299 — Windows: docs/installer steer users to the slow npm path; release binary is 5x faster**](https://github.com/earendil-works/pi/issues/8299)  
   The npm package is unbundled tsc output with 13k+ files; Windows Defender scanning makes startup painfully slow. Strong DX argument for promoting the release binary on Windows.

7. [**#8300 — Pi allows two processes to share one session file (no in-use detection)**](https://github.com/earendil-works/pi/issues/8300)  
   Two `pi` processes can append to the same session JSONL simultaneously, producing divergent branches and cross-window delivery. A lock or in-use marker is clearly needed.

8. [**#8311 — AgentSession.reload() fails open: extension-owned tool name falls through to same-named built-in**](https://github.com/earendil-works/pi/issues/8311)  
   If an extension fails during reload, its active tool name silently falls through to a built-in with the same name. Potentially dangerous when the tool is `bash` or `edit`.

9. [**#8318 — read + edit on the same path: read reports 1-line EOF**](https://github.com/earendil-works/pi/issues/8318)  
   After an `edit` writes a file, a subsequent `read` in the same turn sees the file as only one line. The issue does not reproduce on the next turn, pointing to a state/invalidation bug in the tool layer.

10. [**#8305 — Send the `pi` User-Agent on all API paths**](https://github.com/earendil-works/pi/issues/8305)  
    OpenAI Completions/Responses paths only set the custom User-Agent for the `xai` provider. Other providers leak the OpenAI SDK default UA, which affects observability, analytics, and provider-side identification.

## Key PR Progress

1. [**#8327 — fix(tui): yield long markdown rendering**](https://github.com/earendil-works/pi/pull/8327)  
   Adds a render deadline so large Markdown blocks can no longer monopolize the TUI event loop. Directly targets the “terminal stopped responding” class of bugs.

2. [**#8254 — fix(ai): prevent copilot policy login rate limits**](https://github.com/earendil-works/pi/pull/8254)  
   Fixes #7850 by fetching the model catalog before policy updates, only touching known/unconfigured models, and adding bounded retry for throttled login requests.

3. [**#8319 — fix(ai): anthropic fallback usage**](https://github.com/earendil-works/pi/pull/8319)  
   Threads the actual usage cost through instead of using the model catalog. A cleaner follow-up to the reverted #8308.

4. [**#8307 — feat(coding-agent): enable experimental cache-friendly compaction**](https://github.com/earendil-works/pi/pull/8307)  
   Appends compaction requests to the main session instead of making standalone requests, reusing a warm cache and making auto-compaction substantially cheaper.

5. [**#8316 — feat(coding-agent): add agent_recovery_exhausted extension hook**](https://github.com/earendil-works/pi/pull/8316)  
   Gives extensions a public event after native retry and overflow compact-and-retry are exhausted, allowing a model switch and continuation in the same session.

6. [**#8314 — fix(ai): round-trip Bedrock redacted reasoning**](https://github.com/earendil-works/pi/pull/8314)  
   Adds handling for Bedrock Converse `reasoningContent.redactedContent`, preserving encrypted reasoning instead of silently dropping it.

7. [**#8275 — feat(ai): generalize openai-completions thinking token budget fields**](https://github.com/earendil-works/pi/pull/8275)  
   Extends the vLLM `thinking_token_budget` clamp to Qwen/SGLang and llama.cpp variants, and documents the flag for compatible providers.

8. [**#8303 — fix(coding-agent): collapse tool result images until output is expanded**](https://github.com/earendil-works/pi/pull/8303)  
   Fixes #8304 by not mounting Kitty/iTerm image children when tool output is collapsed, eliminating ghost images and wasted blank rows.

9. [**#8283 — fix(coding-agent): restore continuation after retry and compaction**](https://github.com/earendil-works/pi/pull/8283)  
   Fixes an edge case in the recovery flow where compaction after a failed retry leaves the first user message in the wrong state, breaking continuation.

10. [**#8302 — feat(ai): amazon bedrock mantle**](https://github.com/earendil-works/pi/pull/8302)  
    WIP support for Amazon Bedrock Mantle, needed for newer GPT models that fail when routed through Converse. Addresses #5363.

## Feature Request Trends

- **More first-class provider support** is the strongest trend: OpenAI-compatible API setup in `/login` ([#8320](https://github.com/earendil-works/pi/pull/8320), [#8324](https://github.com/earendil-works/pi/pull/8324)), Baidu Qianfan providers ([#8288](https://github.com/earendil-works/pi/issues/8288)), and Bedrock Mantle ([#8302](https://github.com/earendil-works/pi/pull/8302), [#6216](https://github.com/earendil-works/pi/pull/6216)).

- **Expanded extension/public API surface**: pre-persistence message replacement hook ([#8292](https://github.com/earendil-works/pi/issues/8292)), `agent_recovery_exhausted` hook ([#8316](https://github.com/earendil-works/pi/pull/8316)), testing entry point for `VirtualTerminal` ([#8289](https://github.com/earendil-works/pi/issues/8289)), and a `disabledCommands` setting ([#8325](https://github.com/earendil-works/pi/issues/8325), [#8326](https://github.com/earendil-works/pi/pull/8326)).

- **TUI/UX quality improvements**: in-settings locale/language switching ([#8296](https://github.com/earendil-works/pi/issues/8296)), theme-derived text refresh ([#8249](https://github.com/earendil-works/pi/pull/8249)), and collapsed image handling ([#8303](https://github.com/earendil-works/pi/pull/8303)).

- **Smarter compaction and caching**: cache-friendly compaction ([#8307](https://github.com/earendil-works/pi/pull/8307)), threshold compaction fixes ([#8328](https://github.com/earendil-works/pi/issues/8328)), and interleaving `/compact` with queued prompts ([#8301](https://github.com/earendil-works/pi/issues/8301)).

## Developer Pain Points

- **TUI instability on long sessions**: screen flashing ([#8281](https://github.com/earendil-works/pi/issues/8281)), viewport jumping ([#8309](https://github.com/earendil-works/pi/issues/8309)), full-screen image rendering errors ([#8306](https://github.com/earendil-works/pi/issues/8306)), and event-loop blockage from large Markdown ([#8327](https://github.com/earendil-works/pi/pull/8327)).

- **Silent failures from provider defaults**: missing OpenAI client timeout ([#8323](https://github.com/earendil-works/pi/issues/8323)), dropped `timeoutMs` in `streamSimple` ([#8321](https://github.com/earendil-works/pi/issues/8321)), exact-limit truncation misclassified as unrecoverable ([#8322](https://github.com/earendil-works/pi/issues/8322)), and remote-loopback-only success for OpenAI-completions ([#8286](https://github.com/earendil-works/pi/issues/8286)).

- **Compaction/context management unreliability**: threshold compaction never firing when usage is absent ([#8328](https://github.com/earendil-works/pi/issues/8328)), compaction not evaluated during agentic runs ([#6339](https://github.com/earendil-works/pi/issues/6339)), and `/compact` cannot be queued between prompts ([#8301](https://github.com/earendil-works/pi/issues/8301)).

- **Provider cost/reasoning gaps**: Anthropic fallback priced with the requested model ([#8285](https://github.com/earendil-works/pi/issues/8285)), missing redacted reasoning round-trip on Bedrock ([#8315](https://github.com/earendil-works/pi/issues/8315)), and leaked OpenAI SDK User-Agent ([#8305](https://github.com/earendil-works/pi/issues/8305)).

- **Windows-specific friction**: slow npm install/startup path ([#8299](https://github.com/earendil-works/pi/issues/8299)), `find` freezing on large directories ([#8282](https://github.com/earendil-works/pi/issues/8282)), and UTF-8 BOM silently breaking package manifests ([#8310](https://github.com/earendil-works/pi/issues/8310)).

- **Session safety concerns**: two processes appending to the same session JSONL ([#8300](https://github.com/earendil-works/pi/issues/8300)) and extension reload failing open to built-in tools ([#8311](https://github.com/earendil-works/pi/issues/8311)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-19

## Today’s Highlights
- The newest nightly build introduces a live-session registry with `qwen sessions ps`, laying groundwork for first-class multi-session management.
- Multi-agent coordination continues to dominate community discussion: leader/teammate messaging, background execution, and session discovery are the most active issue clusters.
- Review/CI automation is maturing quickly, with convergence-advisory designs, TUI capture evidence, and restored macOS/Windows CI triggers all landing or moving forward.

## Releases
- [`v0.21.11-nightly.20260818.259951c53e`](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-nightly.20260818.259951c53e) — adds a live-session registry and `qwen sessions ps` command, plus a daemon-side skill-toggle change.
- Multiple `dsw-eas-*` benchmark releases were published for end-to-end validation against SWE-bench Verified and Terminal-Bench 2.0, including smoke tests for sandbox recovery and full 500+89 case runs with result writeback. Some earlier full runs were quarantined.

## Hot Issues
- [#656 — API Error: 400 InternalError.Algo.InvalidParameter for every message](https://github.com/QwenLM/qwen-code/issues/656) — P1 bug blocking all requests for some users; 11 comments show it is long-running and high-impact after months without a confirmed fix.
- [#8718 — RFC: Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718) — Closed after 10 comments; likely informed the live-session registry now shipping in nightly builds.
- [#7040 — RFC: Reliable auto-memory recall — timing, quality, and telemetry](https://github.com/QwenLM/qwen-code/issues/7040) — Active RFC with 10 comments; split into telemetry, bounded recall, and multilingual evaluation tracks.
- [#9276 — Team members cannot send ordinary messages to their leader](https://github.com/QwenLM/qwen-code/issues/9276) — Multi-agent bug where normal completion/status messages are misread as shutdown requests; 7 comments.
- [#8724 — Cross-session messaging: sessions on same machine message each other](https://github.com/QwenLM/qwen-code/issues/8724) — Related to the new session registry, with a fail-closed receiving gate; 6 comments.
- [#8400 — Windows Desktop sessions silently auto-deleted after restart](https://github.com/QwenLM/qwen-code/issues/8400) — P1 data-loss bug caused by provider message loader returning 0 messages; 4 comments.
- [#9430 — Named teammates silently ignore run_in_background: false](https://github.com/QwenLM/qwen-code/issues/9430) — Background-execution contract violation for Agent Team teammates; 3 comments.
- [#9431 — list_agents empty result is ambiguous while Agent Team teammates are active](https://github.com/QwenLM/qwen-code/issues/9431) — Observability gap: the tool reports “no background agents” even when named teammates are running; 3 comments.
- [#9434 — `ask` returns from Edit/WriteFile PreToolUse hooks do not display diffs](https://github.com/QwenLM/qwen-code/issues/9434) — Human-in-the-loop security/UX gap; reviewers cannot see what they are approving; 2 comments.
- [#9291 — Unsupported image MIME can abort a Responses-compatible session](https://github.com/QwenLM/qwen-code/issues/9291) — A `.heic` attachment can kill an entire session during request validation; 4 comments.

## Key PR Progress
- [#8992 — feat(mcp): add MCP 2026 core and WebShell Apps host](https://github.com/QwenLM/qwen-code/pull/8992) — First modern MCP 2026 client slice with Apps extension support and `ui://` tool metadata preservation.
- [#9092 — feat(review): resume an interrupted PR review from its on-disk state](https://github.com/QwenLM/qwen-code/pull/9092) — Adds `fetch-pr --resume`, enabling reliable recovery from disk-backed review state.
- [#9392 — fix(serve): let channel workers reach TLS-enabled daemons](https://github.com/QwenLM/qwen-code/pull/9392) — Channel workers now receive `https://` loopback URLs when the daemon serves TLS.
- [#8927 — feat(channels): bound session lifetime with sessionRotation](https://github.com/QwenLM/qwen-code/pull/8927) — Adds per-channel `maxTurns`/time-based session rotation to prevent context reuse from getting stale.
- [#8978 — feat(serve): no-op on empty channel set and restore only active channels](https://github.com/QwenLM/qwen-code/pull/8978) — Prevents `qwen serve --channel all` from crashing when no channels are configured.
- [#9301 — feat(goal): account the tokens a Goal spends](https://github.com/QwenLM/qwen-code/pull/9301) — Adds `tokensUsed` to GoalRecords and reports it in `lastGoal` summaries.
- [#8276 — fix(core): preserve prompt cache across deferred tool discovery](https://github.com/QwenLM/qwen-code/pull/8276) — Moves deferred-tool catalogs out of reminders and into live `tool_search` descriptions to protect prompt caching.
- [#9370 — fix(ci): give the macOS and Windows lanes a trigger again](https://github.com/QwenLM/qwen-code/pull/9370) — Restores platform CI lanes via a platform-sensitivity classifier and nightly `main` runs.
- [#9273 — feat(review): capture-tui — rendering claims get pixels, not prose](https://github.com/QwenLM/qwen-code/pull/9273) — Adds `qwen review capture-tui` using a private tmux server to produce `.ans`/`.png` rendering evidence.
- [#9347 — fix(dingtalk): attach media from quoted messages](https://github.com/QwenLM/qwen-code/pull/9347) — Lets DingTalk channels attach quoted pictures, files, audio, and video to agent prompts.

## Feature Request Trends
- **Multi-agent and session orchestration** is the strongest signal: native coordination for independent sessions, cross-session messaging, teammate-to-leader communication, `run_in_background` semantics, and better `list_agents` visibility are all actively requested.
- **Review/CI automation and convergence control** continues to grow: flakiness gates, resume-from-disk review, TUI capture evidence, bilingual failure handoffs, and publish-time convergence advisories are recurring themes.
- **WebShell/desktop UX unification** remains desirable: consolidating the chat panel, expanding HTML exports with thinking/tool results, adding an in-app browser panel, and fixing artifact-panel/status-line staleness.
- **Context and memory efficiency** is a steady undercurrent: reliable auto-memory recall, prompt-cache preservation, Goal token accounting, and accurate context-usage display after `/compress`.

## Developer Pain Points
- **Provider/API instability**: Repeated 400 `InvalidParameter` and `DataInspectionFailed` errors can block all requests; unsupported image MIME types can abort sessions entirely.
- **Session/state loss**: Windows Desktop sessions silently deleted after restart, canceled prompts not restored, live entries duplicating during pagination, and artifacts reporting missing despite existing on disk.
- **Multi-agent control-plane gaps**: Messages misclassified as shutdown requests, manual task assignment never dispatching work, `run_in_background: false` ignored, and ambiguous `list_agents` results.
- **Review-process fatigue**: Multiple 5–7 round review cycles, deferred Suggestions, under-pinned tests, flaky assertions, and growth-budget loops create significant maintenance overhead.
- **Human-in-the-loop UX gaps**: `ask` hook confirmations without diff previews, expired typing indicators on long turns, stale context percentages, and broken artifact-panel refreshes all reduce trust in the UI.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-19

> Note: The project has rebranded as **CodeWhale**. The legacy `deepseek-tui` npm package is deprecated and receives no further releases.

## 1. Today's Highlights

CodeWhale v0.9.9 shipped, formalizing the rebrand from DeepSeek TUI and deprecating the legacy `deepseek-tui` npm package. The last 24h were dominated by hardening: CI jobs got timeout caps after a real dead-runner incident, session/approval persistence fixes landed, and i18n refactors continued for both web and docs. A new continuous-loop feature request also signals growing use of the TUI as an orchestrator for other AI agents.

## 2. Releases

- **v0.9.9** — [release PR #5499](https://github.com/Hmbown/CodeWhale/pull/5499)  
  Finalized CodeWhale v0.9.9 after late fold-ins and synchronized root/TUI changelogs plus contributor credits. The release notes confirm the rebrand: **CodeWhale** is the public product from Shannon Labs; `codewhale` remains the lowercase technical identifier, while the legacy npm package `deepseek-tui` is deprecated. The changelog excerpt includes fixes for narrow-terminal compact-row metrics below 60 columns and strict rustdoc bare-URL lint failures.

## 3. Hot Issues

Only 9 issues were updated in the last 24h, so all are covered here. None currently have 👍 reactions; activity is best measured by comment count.

- [#5316 — EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)](https://github.com/Hmbown/CodeWhale/issues/5316) · 7 comments  
  The tracking issue for the TUI crate decomposition; every sub-EPIC, FEAT, and PR reports into it. This is the most active discussion this cycle and signals a significant architectural refactor.

- [#5337 — Web: finish the #4934 dictionary spine — retire every isZh branch](https://github.com/Hmbown/CodeWhale/issues/5337) · 5 comments  
  Follow-up work to remove remaining page-body `isZh` ternaries and move everything onto one i18n dictionary path. The ongoing PR series shows steady contributor momentum for web i18n cleanup.

- [#5299 — release: move npm publication to trusted publishing](https://github.com/Hmbown/CodeWhale/issues/5299) · 3 comments  
  The v0.9.5 npm wrapper was blocked on a maintainer browser login plus 2FA, even though every other artifact shipped non-interactively. Trusted publishing would remove a major release bottleneck.

- [#5508 — [enhancement] feat: continuous loop](https://github.com/Hmbown/CodeWhale/issues/5508) · 3 comments  
  Requests an infinite-turn mode until user interruption, enabling the TUI to run as an orchestrator for other AI agents instead of relying on manual turn loops. Notable for the emerging “AI coordinating AI” use case.

- [#5505 — [bug] System prompt is dropped after /new](https://github.com/Hmbown/CodeWhale/issues/5505) · 2 comments · closed  
  Critical session-correctness bug: after `/new`, the model receives no system prompt and only sees a folded `<context_update>` line. The issue was closed quickly, suggesting maintainers triaged it seriously.

- [#5512 — [bug] Header status indicator never renders since 0.9.7](https://github.com/Hmbown/CodeWhale/issues/5512) · 1 comment  
  Windows 11 / Windows Terminal regression: the `cw / whale / dots / off` status indicator next to the effort chip disappeared in 0.9.7+ and still fails on 0.9.9.

- [#5497 — fix(tasks): terminalize stuck durable executions and bound event growth](https://github.com/Hmbown/CodeWhale/issues/5497) · 1 comment  
  Durable Task Manager workers can stay occupied forever if `turn.completed` never arrives or cancellation is ignored. This risks leaked workers and unbounded event accumulation.

- [#5482 — [documentation] EPIC(docs): fully localize documentation to Chinese](https://github.com/Hmbown/CodeWhale/issues/5482) · 1 comment  
  Many `docs/` files are English-only despite a growing Chinese user base; machine translation introduces errors and several source docs are stale. Tier 1 work is already in progress via PR #5507.

- [#5496 — ci: bound release-candidate and artifact workflow jobs](https://github.com/Hmbown/CodeWhale/issues/5496) · 0 comments  
  Follow-up to #5495: release-candidate and artifact workflows still lack timeouts, leaving the release path vulnerable to indefinitely assigned runners or hung steps.

## 4. Key PR Progress

Selected 10 important PRs from the 26 updated in the last 24h.

- [PR #5499 — release: v0.9.9](https://github.com/Hmbown/CodeWhale/pull/5499)  
  Finalizes the v0.9.9 release and syncs changelogs and contributor credits. Includes narrow-terminal metrics and rustdoc lint fixes.

- [PR #5404 — fix(client): fail closed on SSE UTF-8 split across HTTP/2 DATA](https://github.com/Hmbown/CodeWhale/pull/5404)  
  Fixes garbled DeepSeek Flash streaming on macOS (U+FFFD / CJK characters) caused by multi-byte UTF-8 characters split across HTTP/2 DATA frames.

- [PR #5491 — fix(tui): persist approval outcomes before execution](https://github.com/Hmbown/CodeWhale/pull/5491)  
  Persists approval requests and terminal outcomes in a session-owned log before execution; rejects stale decisions and reconstructs approval state on session resume. Closes #5360.

- [PR #5495 — ci: cap every ci.yml job with timeout-minutes](https://github.com/Hmbown/CodeWhale/pull/5495)  
  Adds `timeout-minutes` to all ci.yml jobs after a runner was assigned but never executed, leaving a required gate stuck for up to GitHub’s 360-minute default.

- [PR #5506 — feat(tui): add command context adapters and migration gate (FEAT-015)](https://github.com/Hmbown/CodeWhale/pull/5506)  
  Builds dependency-injection infrastructure for safely extracting slash-command implementations. Deliberately migrates zero production commands initially.

- [PR #5507 — docs(i18n): complete Tier 1 of Chinese docs localization](https://github.com/Hmbown/CodeWhale/pull/5507)  
  Restructures docs into per-language folders and moves existing translations into `docs/zh_hans/`, making progress on EPIC #5482.

- [PR #5504 — feat(web): move docs/hooks and docs/troubleshooting onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5504)  
  Removes 24 `isZh` ternary branches by moving two page bodies onto the unified i18n dictionary spine. Continues issue #5337.

- [PR #5511 — feat(tui): show repository context in git chrome](https://github.com/Hmbown/CodeWhale/pull/5511)  
  The TUI header now shows repository context: normal checkout vs linked worktree, current branch, and ahead/behind counts.

- [PR #5405 — feat(tui): configurable model-visible read/tool-result budgets](https://github.com/Hmbown/CodeWhale/pull/5405)  
  Adds configurable per-result read and tool-result budgets, helping self-hosted long-context DeepSeek V4 users avoid many extra reads on large files.

- [PR #5494 — feat(config): configurable auto-router classifier timeout](https://github.com/Hmbown/CodeWhale/pull/5494)  
  Makes the auto-router classifier timeout configurable via `[auto.router] timeout_secs`, replacing the previous hardcoded 4-second timeout.

## 5. Feature Request Trends

- **Agent-orchestration loops**: The clearest new user-driven request is #5508, asking for continuous/infinite turns so the TUI can coordinate other AI agents within one long-running session.
- **i18n and Chinese localization**: Multiple issues request finishing the web dictionary spine (#5337) and fully localizing docs into Chinese (#5482). This is now being actively executed through PRs.
- **More configuration knobs**: Users want control over model-visible read/tool-result budgets (#5405) and classifier timeout (#5494), reflecting growing self-hosted and long-context usage.
- **Release/CI reliability**: Requests to move npm publication to trusted publishing (#5299) and bound release workflows (#5496) show a strong maintainer focus on removing manual release steps and dead-runner failure modes.

## 6. Developer Pain Points

- **Release pipeline fragility**: Manual browser login + 2FA is still required for the npm wrapper, and uncapped CI jobs can hang for hours before failing. See #5299, #5495, #5496.
- **Session/state consistency**: Bugs around dropped system prompts after `/new`, unpersisted approval outcomes, and stuck durable task workers indicate session lifecycle and persistence are recurring weak points. See #5505, #5491, #5497.
- **Cross-platform and encoding regressions**: Windows users report the header status indicator disappearing since 0.9.7 (#5512), while macOS users hit garbled CJK text from SSE UTF-8 splits (#5404). Non-ASCII checkout paths also caused test failures (#5503).
- **i18n and documentation debt**: The web codebase still carries many `isZh` branching ternaries (#5337), and significant documentation remains English-only or stale (#5482), increasing maintenance friction.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*