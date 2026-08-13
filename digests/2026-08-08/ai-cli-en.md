# AI CLI Tools Community Digest 2026-08-08

> Generated: 2026-08-07 16:38 UTC | Tools covered: 10

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

# AI CLI Tools Cross-Tool Comparison Report
**2026-08-08**

---

## 1. Ecosystem Overview

The AI coding agent CLI ecosystem is in a rapid-release phase marked by platform-expanding features—self-hosted runners (Claude Code), portable plugin catalogs (Codex), and interactive terminal sub-agents (Qwen)—rather than incremental polish. The dominant themes across all tools are **plugin/skill ecosystem consolidation**, **multi-agent coordination safety**, and **Windows reliability**, which lags universally. Release cadence remains high (7 of 9 active tools shipped within 24 hours), but community attention is increasingly consumed by regressions: provider-compatibility breaks in Codex v0.147.0, rendering fidelity bugs in Claude Code, and a cluster of agent-trust failures (false success signals, fabricated turns, silent data corruption) that indicate the industry's next competitive frontier is reliability, not capability.

---

## 2. Activity Comparison

| Tool | Noteworthy Issues | Active PRs | Release Status |
|---|---|---|---|
| **Claude Code** | 10 | 4 | ✅ v2.1.224 (self-hosted runner, archive plugin source) |
| **OpenAI Codex** | 10 | 10 | ✅ v0.147.0 + 2 alphas (plugins, session sections) |
| **Gemini CLI** | 10 | 10 | ✅ v0.56.0-nightly, v0.55.0-preview.2, v0.54.4 |
| **Copilot CLI** | 10 | 0 | ✅ v1.0.79-7 + v1.0.79-6 (kimi-k3, autopilot+plan) |
| **Kimi Code CLI** | 3 | 3 | ⬜ None (2 competing fix PRs for critical bug) |
| **OpenCode** | 10 | 10 | ✅ v1.18.15 (message ordering, truncation fixes) |
| **Pi** | 10 | 12+ | ✅ v0.84.1 (Qwen Individual provider, auth checks) |
| **Qwen Code** | 10 | 10 (of 50) | ✅ v0.21.7 (no goal limit, inline terminal images) |
| **DeepSeek TUI** | 10 | 7 | ⬜ None (v0.9.5 proposals in design phase) |
| **Grok Build** | 0 | 0 | ⬜ No activity |

**Volume signals:** Qwen Code had the highest raw activity (50 issues + 50 PRs updated); Claude Code's #69415 connection failure and Codex's Azure/LiteLLM regressions (#37380, #37425) drew the fastest reaction uptick within 24 hours of release.

---

## 3. Shared Feature Directions

**Plugin & skill ecosystem management** — the strongest cross-tool signal.
- **Codex**: portable Agent Plugins, multi-catalog search, repo-scoped marketplaces (#18115)
- **Claude Code**: HTTPS-zip plugin sources, project-scoped skills via `settings.json` (#84600)
- **Copilot CLI**: extension directories under `com.github.copilot/extensions/`
- **Pi**: Agent Plugins spec support for cross-tool sharing
- **Qwen Code**: archive-based extension install (#8621)

**Multi-agent isolation and coordination** — every tool with subagents is surfacing concurrency bugs.
- **Claude Code**: worktree/isolation state is session-global (#84685)
- **Gemini CLI**: subagents report false GOAL success after MAX_TURNS (#22323)
- **OpenCode**: per-target subagent permissions not enforced (#35238, fix in #41100)
- **Qwen Code**: ACP agent fan-outs serialized and prematurely capped (#8631)

**Session lifecycle & resume reliability**
- **Codex**: archived-session restore from picker (#37371), approval-policy restore (#37368)
- **Copilot CLI**: large-session resume OOMs / pegs CPU (#4251); blank transcripts (#4311)
- **Qwen Code**: session restore can kill healthy daemon (#8678, fix #8691)
- **OpenCode**: history browse/resume request (#38858)

**Windows is the weakest platform across every tool** — detailed below in Trend Signals.

**Terminal rendering fidelity** — recurring across Claude Code (#79584, #67051), Copilot CLI (#4311, #4212), Qwen Code (#8562, #8625), OpenCode (#8565 accessibility), and Pi (#7780 TUI performance).

**Memory/context economics**
- **Kimi**: lazy-load MCP tool schemas (#2147)
- **Codex**: scoped memory tiers (#18343)
- **Gemini**: Auto Memory retries low-signal sessions (#26522)
- **DeepSeek TUI**: `/dryrun` request preview (#1004)

---

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Distinctive Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise agentic dev, IDE integration | Enterprise teams (Team/Enterprise plans), IDE users | Self-hosted runners; plugin security hardening; hooks ecosystem; session-global state model |
| **OpenAI Codex** | Plugin ecosystem + conversation organization | Developers wanting portable, shareable agent skills | Rust-based; portable Agent Plugins; persistent session sections; strict config layering |
| **Gemini CLI** | Model breadth + autonomous memory | Multi-model users, Google ecosystem | Auto Memory extraction; nightly cadence; security-first infrastructure (SSRF fixes, sandbox image EOL) |
| **Copilot CLI** | GitHub-native workflow automation | GitHub-centric developers, autopilot users | Tight VS Code/GitHub integration; `--plan` + `--mode autopilot`; permission-mode state machine |
| **Kimi Code CLI** | Lightweight, focused agentic editing | Developers needing a minimal, fast CLI | Small surface area; high community scrutiny on data integrity; lazy context injection |
| **OpenCode** | Open-source, provider-agnostic flexibility | Self-hosters, multi-provider power users | Bun runtime; opencode-go managed provider; per-target permission rules; SQLite session store |
| **Pi** | SDK/harness architecture, multi-provider | Embedders, extension/session API users | AgentHarness recovery; provider-compat patch layer (DeepSeek, Bedrock, Gemini); LM Studio local support |
| **Qwen Code** | Full-stack agent workspace (Web Shell/Desktop) | CJK users, web-shell/desktop enthusiasts | tmux-backed interactive sub-agents; Web Shell extension manager; OAuth free tier (contested) |
| **DeepSeek TUI** | Cost-optimized large-context coding | Cost-sensitive DeepSeek V4 users | Fleet workers/lane model; `model = "auto"` tier routing; `/dryrun` cost previews |

**Key differentiators:** Claude Code leads in enterprise infrastructure (self-hosted runners, FIDO2). Codex leads the plugin-format race. Gemini invests most in autonomous memory infrastructure. OpenCode/Qwen compete on open extensibility breadth. DeepSeek TUI is the only tool optimizing primarily for **token cost transparency**.

---

## 5. Community Momentum & Maturity

**Hyper-active, broad engagement:** **Qwen Code** (50/50 issues/PRs, plus a 150-comment policy controversy on OAuth free tier) and **Claude Code** (73 👍 on a single connection bug, 120 👍 on branch-diff request) show the deepest community investment.

**Rapid iterators:** **Codex** has the fastest release-to-regression feedback loop—two provider-compat issues (#37380, #37425) filed within a day of v0.147.0, while 10 PRs consolidate config loading. **Gemini CLI** shipped a security-patch preview (v0.55.0-preview.2) within 24 hours of identifying the capacity-exhaustion retry bug, and landed SSRF + Node EOL fixes promptly.

**Stabilizing but exposed:** **OpenCode** shipped a pure-bugfix release (v1.18.15) yet still has an unresolved Windows segfault (#33742, 58 comments) and a full provider outage (#38218). **Copilot CLI** shipped two patches but had zero PR activity, and its largest issues center on session/terminal regressions.

**Small but high-signal:** **Kimi** demonstrates how quickly a focused community mobilizes—two competing fix PRs (#2594, #2595) opened the day after a silent-corruption bug (#2591). **DeepSeek TUI** is mid-refactor and design-heavy; its 3,000–7,000-line modules are being split, indicating active maintainership but architectural debt.

**Inactive:** **Grok Build** (no activity) is a data point that even well-funded entrants can stall if community traction doesn't materialize.

---

## 6. Trend Signals

1. **Reliability is the new differentiator.** The most severe cross-tool issues are not missing features but *broken trust*: Claude Code's fabricated user turns (#81461), Gemini's false GOAL success (#22323), Kimi's silent UTF-8 corruption (#2591), Copilot's permission mode sticking in auto (#4388). Developers are actively choosing tools based on whether the agent can be trusted to report *interruption* vs. *completion* honestly.

2. **Plugin ecosystems are converging on shared formats.** The Agent Plugins spec is referenced by Codex, Pi, and Copilot CLI simultaneously. Expect a "write once, run in any agent" standard to consolidate within 2–3 quarters. Tool vendors who don't adopt a portable plugin format risk being locked out of the skill-sharing network effect.

3. **Windows is the universal weak point — and the biggest untapped market.** Every tool lists 2–4 Windows-specific failures (sandbox resolution in Codex #32655, clipboard in Copilot #3622, Bun segfault in OpenCode #33742, EISDIR in Qwen #8615, `Get-FileHash` installer failure #7118). No tool has solved the Windows story; the first vendor to do so credibly gains a meaningful advantage in enterprise adoption.

4. **Provider compatibility is a release-gating risk.** Codex broke Azure and LiteLLM in v0.147.0; Pi's entire PR queue is dominated by provider-compat fixes (DeepSeek, Bedrock, Gemini, LM Studio); OpenCode's managed provider is fully blocked. Multi-provider support is table stakes, and every release must include a provider-compat test matrix or risk community backlash within hours.

5. **Context/token economics are driving architecture.** Kimi's lazy MCP schema loading, DeepSeek's `/dryrun` preview, Gemini's AST-aware tooling epics, and Codex's scoped-memory requests all point to the same conclusion: as agentic sessions lengthen, *context budget management* becomes a first-class feature, not an implementation detail.

6. **Security hardening is moving up the stack.** Beyond network-level fixes (Gemini SSRF) and dependency hygiene (Node 20 EOL), the frontier is now *agent-behavioral* security: YAML injection and symlink credential overwrites in plugins (Claude Code #84711), git repo-config escape hatches (Qwen #8645), and YOLO-mode filesystem boundary enforcement (Kimi #2596). Expect safety reviews of agent permission systems to become standard vendor practice.

7. **Cross-tool compatibility pressure is rising.** Copilot CLI is fielding requests to support Claude Code-style hooks (#4399); Pi is adopting the Agent Plugins spec; Qwen's `qwen mcp list` hangs on SSE servers (#8550). The AI CLI ecosystem is consolidating around shared open standards—MCP, Agent Plugins, hooks—even as the tools themselves compete aggressively on UX and trust.

---

*Bottom line for decision-makers:* feature velocity is high across the board, but release quality variance (Codex v0.147.0, Claude Code v2.1.224 renders, OpenCode v1.17.10) argues for pinning versions in production. The strategic battleground is shifting from model capability to **agent trust, plugin portability, and platform reliability**—vendors who invest in these three areas will likely define the next 12 months of the ecosystem.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights

*Data as of 2026-08-08 · Source: github.com/anthropics/skills*

> Note: The dataset does not expose per-PR comment counts; ranking below follows the provided “sorted by comments” order.

---

## 1. Top Skills Ranking

The most-attended PRs center on **skill-creator reliability** and **document-format quality**, rather than brand-new domain skills.

1. **[#1298 – fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)** — Open  
   Fixes the skill-creator evaluation loop (`run_eval.py`, `run_loop.py`, `improve_description.py`) that reports `recall=0%` for every description. Community discussion references issue #556 with 10+ independent reproductions. Also addresses Windows stream reading, trigger detection, and parallel workers.

2. **[#514 – Add document-typography skill](https://github.com/anthropics/skills/pull/514)** — Open  
   Proposes a typographic quality-control skill for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Targets a pain point common to nearly every generated document.

3. **[#538 – fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)** — Open  
   Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` vs `reference.md`, `FORMS.md` vs `forms.md`). Breaks the PDF skill on case-sensitive filesystems.

4. **[#486 – Add ODT skill: OpenDocument text creation, template filling, ODT-to-HTML](https://github.com/anthropics/skills/pull/486)** — Open  
   New skill for creating, reading, filling, and converting OpenDocument files (`.odt`, `.ods`), including LibreOffice and ISO-standard document workflows.

5. **[#210 – Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210)** — Open  
   Revises the existing `frontend-design` skill to make instructions concrete and executable within a single conversation, improving clarity and internal coherence.

6. **[#83 – Add skill-quality-analyzer and skill-security-analyzer to marketplace](https://github.com/anthropics/skills/pull/83)** — Open  
   Adds two meta-skills: one evaluating skill quality across structure, documentation, examples, and resources; another focused on security analysis of skills. Signals growing demand for skill hygiene.

7. **[#541 – fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)** — Open  
   Fixes document corruption when the DOCX skill adds tracked changes to files that already contain bookmarks. Explains the shared `w:id` namespace in OOXML.

8. **[#539 – fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)** — Open  
   Adds pre-parse validation to `quick_validate.py` to catch unquoted `description` fields containing `:`, preventing silent YAML truncation during skill creation.

---

## 2. Community Demand Trends

From Issues, four demand clusters emerge:

- **Security & trust boundary** — [Issue #492](https://github.com/anthropics/skills/issues/492) is the highest-activity issue (43 comments). The community is concerned about community skills distributed under the `anthropic/` namespace, enabling trust-boundary abuse. Demand: provenance, permission gating, and official/community separation.

- **Enterprise sharing & lifecycle** — [Issue #228](https://github.com/anthropics/skills/issues/228) asks for org-wide skill sharing in Claude.ai; [Issue #189](https://github.com/anthropics/skills/issues/189) reports duplicate skills when installing both `document-skills` and `example-skills`. Demand: official sharing, deduplication, and managed distribution.

- **Skill-creator tooling reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556) and [Issue #1169](https://github.com/anthropics/skills/issues/1169) document the `recall=0%` evaluation-loop bug; [Issue #202](https://github.com/anthropics/skills/issues/202) asks to rewrite skill-creator from developer documentation into an operational skill. Demand: reliable authoring and evaluation tooling.

- **Context-window efficiency & safety** — [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` skill eagerly injecting ~156k tokens; [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory` for symbolic agent state; [Issue #1385](https://github.com/anthropics/skills/issues/1385) proposes a reasoning quality-gate pipeline. Demand: lean skills, memory efficiency, and auditable quality controls.

---

## 3. High-Potential Pending Skills

These open PRs describe net-new skills with active attention; they are strong candidates to land next.

- **[#1367 – Add self-audit skill](https://github.com/anthropics/skills/pull/1367)** — Open  
  Mechanical file verification first, then a four-dimension reasoning audit in damage-severity order. Universal across projects and models.

- **[#723 – Add testing-patterns skill](https://github.com/anthropics/skills/pull/723)** — Open  
  Covers the full testing stack: Testing Trophy, unit testing, React Testing Library, and what *not* to test.

- **[#525 – Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)** — Open  
  Integrates with `pyxel-mcp` for building retro/pixel-art/8-bit games in Python, with a write → run_and_capture → inspect → iterate workflow.

- **[#1302 – Add color-expert skill](https://github.com/anthropics/skills/pull/1302)** — Open  
  Self-contained color knowledge: naming systems (ISCC-NBS, Munsell, RAL, XKCD), color spaces, and “what to use when” tables.

- **[#1479 – Add plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)** — Open  
  Addresses planning-artifact lifecycle problems: plans and related files accumulate with no cleanup or ownership.

- **[#181 – Add SAP-RPT-1-OSS predictor skill](https://github.com/anthropics/skills/pull/181)** — Open  
  Wraps SAP’s open-source tabular foundation model for predictive analytics on SAP business data.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **meta-skills and tooling that make the skill ecosystem itself trustworthy** — secure provenance, org-wide sharing, reliable skill-creator evaluation, and auditable quality gates — rather than for any single end-user skill domain.

---

# Claude Code Community Digest — 2026-08-08

## Today’s Highlights

v2.1.224 shipped with two notable additions: `claude self-hosted-runner` for running Claude Code sessions on your own infrastructure, and a new `archive` plugin source for HTTPS-hosted zips. Meanwhile, community attention is focused on persistent WSL/VSCode connection failures, IDE diff limitations, and a cluster of model-output integrity bugs. Several security-focused plugin PRs also advanced today.

## Releases

### v2.1.224
[GitHub Releases](https://github.com/anthropics/claude-code/releases)

- **Self-hosted environments:** `claude self-hosted-runner` lets Team and Enterprise users run Claude Code web, mobile, and desktop sessions on their own machines or containers.
- **Archive plugin source:** Plugins can now be installed from a zip over HTTPS without requiring a Git remote.

---

## Hot Issues

1. **[#69415 — API Error: Connection closed mid-response](https://github.com/anthropics/claude-code/issues/69415)**  
   The top community pain point this week: frequent mid-response connection failures on WSL/VSCode. 44 comments and 73 👍 show how broadly this is impacting day-to-day use.

2. **[#23626 — Support diff comparison against branches other than main](https://github.com/anthropics/claude-code/issues/23626)**  
   Highly requested IDE enhancement with 120 👍. Developers want to diff against arbitrary branches, not just `main`.

3. **[#18467 — Personal account repos not visible in Claude web](https://github.com/anthropics/claude-code/issues/18467)**  
   GitHub repos owned by personal accounts are invisible in Claude web, while organization repos work. 29 comments and 71 👍 indicate significant workflow friction.

4. **[#54394 — Embedded ugrep wrapper amplifies regex backtracking into V8-heap-OOM](https://github.com/anthropics/claude-code/issues/54394)**  
   A deep WSL2 regression: grep calls routed through the embedded `ugrep` wrapper can balloon into an 8GB V8 heap OOM, freezing the host. 25 comments and relatively few reactions, but severe for affected users.

5. **[#81698 — Windows desktop app: GPU process crash kills all sessions](https://github.com/anthropics/claude-code/issues/81698)**  
   Desktop app crash with exit code 101457950 on Windows 11 / RTX 5080; the entire app and all running sessions die. 12 comments — an active and unresolved stability report.

6. **[#81461 — Model fabricates `user` turns inside its own assistant block](https://github.com/anthropics/claude-code/issues/81461)**  
   11 comments on a serious integrity issue: the model emits fake `user` lines inside its own output, which are then rendered in the terminal and easily mistaken for real input.

7. **[#79584 — Assistant text before a tool call is intermittently never rendered](https://github.com/anthropics/claude-code/issues/79584)**  
   Text preceding `AskUserQuestion` and other tool calls disappears from the Windows TUI, though it still exists in the transcript. 10 comments, 7 👍.

8. **[#67051 — Assistant text before/between tool calls not rendered in CLI on macOS](https://github.com/anthropics/claude-code/issues/67051)**  
   Similar symptom to #79584 on macOS. Hooks and transcripts see the text, but the rendered CLI transcript silently drops it. 6 comments, 7 👍.

9. **[#77136 — Opus 4.8 language quality vs. Opus 5.0 coherence complaint](https://github.com/anthropics/claude-code/issues/77136)**  
   A model-behavior complaint with 9 comments and 10 👍: users report Opus 4.8 feels unpleasant to work with, while Opus 5.0 drifts into incoherence. Notable signal for model-selection and behavior work.

10. **[#84685 — Multi-agent EnterWorktree/isolation state is session-global](https://github.com/anthropics/claude-code/issues/84685)**  
    New but already at 7 comments. Concurrent subagents share worktree isolation state, causing cwd and guard-identity hijacking. This is a serious multi-agent concurrency bug.

---

## Key PR Progress

Only 4 PRs were active in the last 24 hours; all remain open.

1. **[#84854 — docs: fix stale hooks documentation link in bash_command_validator_example.py](https://github.com/anthropics/claude-code/pull/84854)**  
   Updates an outdated `docs.anthropic.com` hooks URL to the current `code.claude.com/docs` location, matching the other 46 links in the repo.

2. **[#84747 — fix(hookify): enforce proper rule evaluation scope and secure file read](https://github.com/anthropics/claude-code/pull/84747)**  
   Fixes `load_rules()` bypassing the event filter when `event` is `None`. Unmapped tools like `Read` and `Browser` will now only trigger `all`-scoped rules.

3. **[#84711 — fix(security): address yaml injection and symlink credential overwrites in plugin scripts](https://github.com/anthropics/claude-code/pull/84711)**  
   Fixes #76580 with defensive checks against YAML injection and symlink-based credential overwrites. Important hardening for plugin security.

4. **[#84600 — Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)**  
   Registers the official marketplace and enables the `frontend-design` skill via `.claude/settings.json` so it loads automatically for contributors.

---

## Feature Request Trends

- **Arbitrary branch diffing in the IDE:** Compare against branches other than `main` — [#23626](https://github.com/anthropics/claude-code/issues/23626) remains the strongest request by reactions.
- **Full GitHub repository parity:** Personal account repositories should work in Claude web, not just organization repositories — [#18467](https://github.com/anthropics/claude-code/issues/18467).
- **Remote Control completeness:** Local slash commands like `/rewind` should work over Remote Control — currently hard-blocked — [#84866](https://github.com/anthropics/claude-code/issues/84866).
- **Additional trusted-device authenticators:** Support multiple concurrently enrolled FIDO2 authenticators rather than single-enrollment/replace-only — [#82095](https://github.com/anthropics/claude-code/issues/82095).
- **Session-state clarity:** The desktop `isRunning: false` value conflates *idle*, *not observable*, and *gone*; developers want distinct states — [#84868](https://github.com/anthropics/claude-code/issues/84868).
- **Per-subagent isolation:** Worktree and isolation state should be scoped per subagent, not globally shared — [#84685](https://github.com/anthropics/claude-code/issues/84685).

---

## Developer Pain Points

- **Connection and startup stability:** WSL/VSCode connection drops ([#69415](https://github.com/anthropics/claude-code/issues/69415)), Windows desktop GPU crashes ([#81698](https://github.com/anthropics/claude-code/issues/81698)), VSCode extension host 60s timeouts ([#80004](https://github.com/anthropics/claude-code/issues/80004)), and delayed magic-link sign-in emails ([#82049](https://github.com/anthropics/claude-code/issues/82049)) are all adding friction.

- **Transcript and rendering fidelity:** Assistant text is frequently lost from rendered output or transcripts: [#79584](https://github.com/anthropics/claude-code/issues/79584), [#67051](https://github.com/anthropics/claude-code/issues/67051), [#80405](https://github.com/anthropics/claude-code/issues/80405), and fabricated user turns ([#81461](https://github.com/anthropics/claude-code/issues/81461), [#84048](https://github.com/anthropics/claude-code/issues/84048)).

- **Model trust and behavior:** Users are reporting destructive actions ([#84829](https://github.com/anthropics/claude-code/issues/84829)), refusal to accept corrections ([#84842](https://github.com/anthropics/claude-code/issues/84842)), false-positive cyber-safeguard lockouts ([#84821](https://github.com/anthropics/claude-code/issues/84821)), and post-compaction hallucinated tool results ([#74136](https://github.com/anthropics/claude-code/issues/74136)).

- **Multi-agent and background task fragility:** Concurrent subagents leak state between each other ([#84685](https://github.com/anthropics/claude-code/issues/84685)), `SendMessage(to: "main")` is silently dropped ([#76382](https://github.com/anthropics/claude-code/issues/76382)), and scheduled tasks leave orphaned processes running ([#80885](https://github.com/anthropics/claude-code/issues/80885)).

- **Plugin and settings safety:** Plugin uninstall can silently delete unrelated `settings.json` keys ([#84867](https://github.com/anthropics/claude-code/issues/84867)); plugin security hardening is already landing via [#84711](https://github.com/anthropics/claude-code/pull/84711) and [#84747](https://github.com/anthropics/claude-code/pull/84747).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-08

## Today’s Highlights

Codex CLI `v0.147.0` shipped with portable Agent Plugin installation and search across local/personal/workspace/remote catalogs, plus persistent, manually ordered conversation sections and incremental long-transcript browsing. The community is already flagging regressions in `v0.147.0` for custom/provider setups (Azure and LiteLLM), while the main PR pipeline is consolidating plugin/skill loading and improving session resume/archiving behavior.

## Releases

- [rust-v0.147.0](https://github.com/openai/codex/releases/tag/rust-v0.147.0) — `0.147.0`
  - Install portable Agent Plugins and search across local, personal, workspace, and remote plugin catalogs.
  - Organize conversations into persistent, manually ordered sections and browse long transcripts incrementally.
- [rust-v0.148.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.2) — `0.148.0-alpha.2`
- [rust-v0.148.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.1)

## Hot Issues

- [#2020 Support for light-background terminals](https://github.com/openai/codex/issues/2020) — Closed but still one of the most-reacted issues: Codex’s dark-background colors are unusable in light terminals. 26 comments and 60 👍 show strong demand for terminal theme support.

- [#18115 Repository-scoped marketplace and plugin configuration in project config](https://github.com/openai/codex/issues/18115) — Teams want plugin/marketplace settings in `.codex/config.toml`, not just user-scoped config. 58 👍 indicates this is a top governance and onboarding concern.

- [#34306 “This content can't be shown” for cybersecurity requests](https://github.com/openai/codex/issues/34306) — CLI safety checks are blocking legitimate work. 10 comments suggest users are frustrated by opaque content filtering.

- [#18343 Scoped memory management for Codex](https://github.com/openai/codex/issues/18343) — Global memory is too coarse; users want global/project/hybrid/thread memory scopes. Repeatedly requested across CLI and IDE extension.

- [#32655 Windows standalone: sandbox helpers resolved relative to PATH shim](https://github.com/openai/codex/issues/32655) — Every sandboxed `codex exec` fails on Windows standalone installs because helper binaries cannot be found. Critical for Windows sandbox adoption.

- [#35210 `browser.tabs.finalize()` silently terminates the entire app](https://github.com/openai/codex/issues/35210) — Codex Desktop on Windows crashes rather than closing a browser tab, blocking browser-use workflows.

- [#37013 Windows Computer Use reuses stale node_repl exec context across JS calls](https://github.com/openai/codex/issues/37013) — Computer Use only works for the first JS execution; subsequent calls fail due to reused `@oai/sky` state.

- [#37380 0.147.0 regression: Azure Responses rejects empty functions namespace description](https://github.com/openai/codex/issues/37380) — New release broke Azure API Management routes with a generated empty namespace description. 16 👍 and 7 comments in under a day.

- [#37425 Regression in v0.147.0 with LiteLLM provider — streaming requests consistently fail](https://github.com/openai/codex/issues/37425) — Custom LiteLLM users upgrading to 0.147.0 lose streaming. Another sign the release needs provider-compatibility hotfixes.

- [#37401 Windows Desktop: Opening Plugins saturates app-server queue](https://github.com/openai/codex/issues/37401) — Simply opening the Plugins UI can starve message sends and cause timeouts. High impact for the new plugin catalog experience.

## Key PR Progress

- [#37466 Move skill config rule resolution into `codex-config`](https://github.com/openai/codex/pull/37466) — Centralizes skill selector/rule/layer parsing so configuration no longer depends on `SkillMetadata`.

- [#37452 Unify plugin skill loading through the shared loader](https://github.com/openai/codex/pull/37452) — Routes plugin inventory and capability summaries through the injected `SkillRootLoader`, preserving recursive discovery for legacy plugins.

- [#37447 Respect plugin skill availability in tool suggestions](https://github.com/openai/codex/pull/37447) — Tool suggestions now only report skills for plugins that actually have an enabled skill.

- [#37446 Preserve base instruction provenance across sessions](https://github.com/openai/codex/pull/37446) — Distinguishes explicit customization from model-generated instructions so config-lock replays don’t treat generated prompts as custom.

- [#37434 Add process diagnostics snapshots](https://github.com/openai/codex/pull/37434) — New `codex-diagnostics` crate tracks PID, resident memory, gauges, and live `CodexThread` instances, improving debuggability.

- [#37433 Expose multi-agent versions in `model/list`](https://github.com/openai/codex/pull/37433) — Adds nullable `multiAgentVersion` metadata (`disabled`, `v1`, `v2`) to model list responses.

- [#37424 Cap project instructions across environments](https://github.com/openai/codex/pull/37424) — Changes `project_doc_max_bytes` into one shared budget instead of applying it independently per environment.

- [#37408 Add executor-local config reads to the exec server](https://github.com/openai/codex/pull/37408) — New `environmentConfig/read` RPC exposes layer precedence and TOML path selection for executor-local config.

- [#37371 Restore archived sessions from the resume picker](https://github.com/openai/codex/pull/37371) — Adds Active/Archived filtering, inline restore errors, and duplicate-request prevention.

- [#37368 Restore approval policy when resuming threads](https://github.com/openai/codex/pull/37368) — Cold `thread/resume` now restores the persisted approval policy instead of falling back to the default.

## Feature Request Trends

- **Plugin/skill ecosystem management** — Portable plugin installs, searchable catalogs, repo-scoped marketplaces, and per-project plugin config are the dominant feature direction.
- **Conversation/session lifecycle** — Users want archiving, durable session organization, persistent sections, and reliable resume/restore flows.
- **Memory/context control** — Requests for scoped memory, structured context checkpoints, lossless operational state, and evidence-backed completion reports are growing.
- **Multi-agent coordination** — Shared message buses/workspaces for subagents and multi-agent version exposure are becoming higher priorities.

## Developer Pain Points

- **Windows remains the weakest platform** — Sandbox helper resolution, app crashes, stale MCP contexts, Computer Use breakage, and plugin UI timeouts repeatedly hit Windows users.
- **v0.147.0 regressions in provider compatibility** — Azure Responses and LiteLLM streaming regressions, plus a misleading “MCP startup interrupted” error, undermine trust in new releases.
- **Performance and timeout issues** — Desktop app-server stalls, owner-discovery delays, and plugin-related queue saturation make the app feel hung in common workflows.
- **Opaque safety/filtering behavior** — False positives on cybersecurity-related requests are seen as a blocker by developers working in security-adjacent domains.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-08

## 1. Today's Highlights
The project saw a security-focused day: two PRs address an SSRF vulnerability (CVSS 8.6) in `web-fetch` and the EOL Node 20 sandbox images, alongside a patch release reclassifying capacity exhaustion as a terminal error. Meanwhile, the community remains vocal about agent reliability, particularly subagents falsely reporting `MAX_TURNS` interruptions as GOAL success and the generalist agent hanging indefinitely.

## 2. Releases
- **v0.56.0-nightly.20260807.gd5c9a97dc** — Nightly build with changelog preparation and version bump.
- **v0.55.0-preview.2** — Cherry-pick patch delivering the "capacity exhaustion as terminal error" change from [#28716](https://github.com/google-gemini/gemini-cli/pull/28716), enabling immediate model fallback instead of futile retries.
- **v0.54.4** — Maintenance patch with cherry-picked fixes ([#28710](https://github.com/google-gemini/gemini-cli/pull/28710)).

## 3. Hot Issues (10 Noteworthy)

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** · 12 comments, 2👍  
   `codebase_investigator` reports `status: "success"` with `Termination Reason: "GOAL"` even when it hit the turn limit before doing any work. False success signals are dangerous for autonomous pipelines — the agent cannot distinguish "done" from "interrupted."

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** · 8 comments, 8👍  
   Highest community engagement today. Any deferral to the generalist agent hangs indefinitely — users wait up to an hour before cancelling. Workaround: explicitly instruct the model to never use subagents.

3. **[#25166 — Shell command stuck on "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** · 4 comments, 3👍  
   Simple CLI commands finish but remain displayed as active with "Awaiting user input," forcing manual intervention. Frequent report, high annoyance value.

4. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** · 6 comments  
   Users note the model ignores custom skills (e.g., `gradle`, `git`) unless explicitly told, undermining the value of agent extensibility and custom workflows.

5. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** · 5 comments  
   Low-signal sessions are never marked processed, so the extraction agent re-reads the same transcripts repeatedly — wasted tokens and background churn.

6. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** · 4 comments  
   Security concern: transcript content is sent to the model *before* the prompt-based redaction runs, and the service can log existing skill content. Privacy-sensitive users are watching this.

7. **[#24246 — Gemini CLI encounters 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** · 3 comments  
   Large tool sets (MCP servers, enabled tools) exceed API limits with no intelligent tool-scoping or selection. Blocks power users with rich configurations.

8. **[#22093 — Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** · 3 comments  
   Regression where subagents execute despite agents being disabled in all configs. A trust-and-permission issue that shakes user confidence.

9. **[#23571 — Model frequently creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/issues/23571)** · 3 comments  
   When shell execution is restricted, the model scatters edit scripts across directories, creating significant workspace-cleanup overhead before commits.

10. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** · 4 comments, 1👍  
    Browser agent reports `Termination Reason: GOAL` but actually fails in Wayland environments — another instance of success masking failure.

## 4. Key PR Progress (10 Important)

1. **[#28725 — fix(security): prevent SSRF via DNS resolution bypass in web-fetch](https://github.com/google-gemini/gemini-cli/pull/28725)**  
   Critical fix for CVSS 8.6 SSRF where a malicious custom domain could resolve to private/loopback IPs (e.g., `169.254.169.254`). Closes [#28555](https://github.com/google-gemini/gemini-cli/issues/28555).

2. **[#28726 — fix(security): upgrade sandbox Dockerfile to node:22-slim](https://github.com/google-gemini/gemini-cli/pull/28726)**  
   Migrates sandbox and cloudrun Dockerfiles off Node 20 (EOL 2026-04-30) so model-executed commands run on a patched runtime. Closes [#28584](https://github.com/google-gemini/gemini-cli/issues/28584).

3. **[#28673 — feat(core): add Gemini 3.6 Flash and 3.5 Flash-Lite model configurations](https://github.com/google-gemini/gemini-cli/pull/28673)**  
   Adds base model definitions, capabilities (`thinking`, `multimodalToolUse`), aliases, and Code Assist integration for the new models.

4. **[#28581 — fix(cli): skip diff hunk markers during @ processing](https://github.com/google-gemini/gemini-cli/pull/28581)**  
   Prevents diff hunk markers from triggering recursive workspace-wide glob searches — removes two `minimatch`/`path-scurry` heap-growth risks per hunk on large diffs.

5. **[#28597 — fix(cli): load environment variables before resolving settings placeholders](https://github.com/google-gemini/gemini-cli/pull/28597)**  
   Fixes a load-order race where settings were expanded against `process.env` before local `.env` files were loaded, causing inconsistent placeholders.

6. **[#28666 — fix(core): validate every workspace directory GlobTool.execute() will search](https://github.com/google-gemini/gemini-cli/pull/28666)**  
   Aligns validation and execution scope when `dir_path` is omitted, closing a gap where `validateToolParamValues()` and `execute()` disagreed on in-scope directories.

7. **[#28718 — fix(core): record usage already received when a stream is aborted](https://github.com/google-gemini/gemini-cli/pull/28718)**  
   `usageMetadata` was only flushed on the success path; aborted streams silently lost billing/usage data. Now captured on abort. Closes [#28682](https://github.com/google-gemini/gemini-cli/issues/28682).

8. **[#28519 — fix(core): prevent infinite auth loop by awaiting credential save](https://github.com/google-gemini/gemini-cli/pull/28519)**  
   Correctly awaits the async `oauth_creds.json` write and forces a consent re-prompt, ending the infinite auth loop from [#28430](https://github.com/google-gemini/gemini-cli/issues/28430).

9. **[#28596 — feat(cli): add --list-all-sessions option](https://github.com/google-gemini/gemini-cli/pull/28596)**  
   New flag to list and manage sessions across all registered workspaces, grouped by workspace path — a quality-of-life win for multi-project users.

10. **[#28716 — Reclassifying Capacity Exhaustion as Terminal Error](https://github.com/google-gemini/gemini-cli/pull/28716)** (closed)  
    Model capacity/credit exhaustion now triggers immediate fallback or graceful failure instead of retry loops — shipped in v0.55.0-preview.2.

## 5. Feature Request Trends
- **AST-aware codebase tooling**: Multiple epics ask for AST-aware file read, search, and codebase mapping to cut token noise and reduce misaligned reads ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).
- **Smarter agent autonomy**: Users want the model to proactively use custom skills/sub-agents and understand its own CLI mechanics (flags, hotkeys) ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968), [#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Memory system reliability & privacy**: A cluster of Auto Memory issues requests deterministic secret redaction *before* model context, stable handling of low-signal sessions, and quarantining invalid memory patches ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)).
- **Browser agent resilience**: Requests for automatic session takeover, lock recovery, and proper `settings.json` override support (e.g., `maxTurns`) ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Safety & sandboxing**: Zero-dependency OS sandboxing aligned with the model's native bash affinity, plus guardrails against destructive commands like `git reset --force` ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873), [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).

## 6. Developer Pain Points
- **Misleading success signals**: Subagents reporting GOAL/success after turn-limit interruptions or Wayland failures ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) erode trust in automated workflows.
- **Hangs and stuck states**: Generalist agent hangs, shell "Waiting input" after completion, and stuck interactive prompts are the top time-sinks ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#25166](https://github.com/google-gemini/gemini-cli/issues/25166), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Permission regressions**: Subagents executing despite disabled settings ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)) forces users into restrictive workarounds.
- **Workspace hygiene**: Model-generated temp scripts scattered across directories break clean commits and add cleanup overhead ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)).
- **Scale limits**: High tool counts (>128) produce API 400 errors with no smart tool-scoping, punishing users with rich MCP setups ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-08

## Today’s Highlights

Two patch releases landed in the last 24 hours: **v1.0.79-7** adds kimi-k3 model support, agent plugin extension directories, and a `--plan` + `--mode autopilot` combo, while **v1.0.79-6** fixes session-history load failures and noisy diagnostic warnings. Community attention is concentrated on Windows terminal/clipboard regressions, an authentication prompt regression, and permission-mode behavior. No pull requests were updated or merged in the last 24 hours.

## Releases

### v1.0.79-7
- Agent Plugins spec plugins can now ship extensions under `com.github.copilot/extensions/`
- Added support for the **kimi-k3** model
- `--plan` can now be combined with `--mode autopilot` to plan first, then implement without approval
- Improved multi-select prompt UX

### v1.0.79-6
- Fixed a rare internal delay that printed a diagnostic warning on top of the interactive UI
- Fixed failed session-history loads leaving the transcript permanently blank; the failure was previously silently discarded

👉 [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)

## Hot Issues

1. **[#2494 — `copilot login` auto-enters keychain prompt](https://github.com/github/copilot-cli/issues/2494)**  
   Authentication regression since v1.0.16: the CLI no longer waits for `y/N` input when the keychain is unavailable. This can silently break login flows. 10 comments.

2. **[#3622 — Copy to clipboard silently fails on Windows](https://github.com/github/copilot-cli/issues/3622)**  
   Copy reports success but paste still returns old clipboard contents. The regression affects a common workflow and has drawn 4 👍 and 5 comments.

3. **[#1409 — `add-dir` converts dashes to underscores, causing OneDrive permission loops](https://github.com/github/copilot-cli/issues/1409)**  
   Internal path normalization creates a never-ending permission-prompt loop for OneDrive directories on Windows. 4 👍.

4. **[#4251 — Resuming a large session OOMs or pegs one CPU for ~70 min](https://github.com/github/copilot-cli/issues/4251)**  
   A 1.0.74 performance regression versus 1.0.73, with ~3–4× memory usage. Critical for users with long-lived sessions.

5. **[#4311 — Transcript renders as blank lines until a width/children change](https://github.com/github/copilot-cli/issues/4311)**  
   Measured-line cache invalidation issue leaves the interactive transcript blank; `/resume` does not recover it. Terminal rendering reliability issue.

6. **[#4212 — Prompt box and menu items invisible inside tmux](https://github.com/github/copilot-cli/issues/4212)**  
   Dark-on-dark rendering inside tmux makes the prompt and selected menu items unreadable, although the same session works in plain iTerm2.

7. **[#4392 — Post-authentication MCP rebuild leaves orphaned stdio server processes](https://github.com/github/copilot-cli/issues/4392)**  
   At startup the CLI tears down and rebuilds the MCP client after auth, leaking the first generation of stdio child processes. A process hygiene issue for MCP users.

8. **[#4391 — Copying text clears the screen on Windows codepage 936](https://github.com/github/copilot-cli/issues/4391)**  
   Windows rendering bug: copying selected text resets the screen on some codepages but not others. Affects international users.

9. **[#4385 — Models start shell/background tasks but don’t understand when they finish](https://github.com/github/copilot-cli/issues/4385)**  
   The shell process exits and output is written, but the model waits forever. Breaks autonomous/background task workflows.

10. **[#4388 — Permissions stuck in auto mode after switching back to interactive](https://github.com/github/copilot-cli/issues/4388)**  
    The agent continues making changes without permission prompts even after interactive mode is restored. Duplicated by #4389. Security-relevant behavior.

## Key PR Progress

No pull requests were updated or merged in the last 24 hours.

## Feature Request Trends

- **Persistent session defaults** — Users want a configurable default workspace type (branch vs. worktree) instead of always defaulting to new worktrees. [#4396](https://github.com/github/copilot-cli/issues/4396)
- **Better session management** — Re-add quick delete from the sessions list; current deletion workflow is too cumbersome. [#4395](https://github.com/github/copilot-cli/issues/4395)
- **Configurable keybindings** — Ability to disable or remap the “Ctrl+C twice to exit” behavior, especially for users who use Ctrl+C to cancel/copy. [#4394](https://github.com/github/copilot-cli/issues/4394)
- **Permission transparency** — Permission prompts should show which specific rule or command characteristic triggered approval. [#4386](https://github.com/github/copilot-cli/issues/4386)
- **Shell-mode terminal behavior** — In `!` shell mode, Tab should perform normal path/command completion rather than switching to Issues view. [#4387](https://github.com/github/copilot-cli/issues/4387)
- **App command defaults** — `/app` should pre-select the current working directory rather than requiring manual navigation. [#4118](https://github.com/github/copilot-cli/issues/4118)

## Developer Pain Points

- **Windows terminal inconsistencies** — Clipboard failures, codepage-related screen clears, and terminal-title changes suggest the Windows renderer still needs focused attention. [#3622](https://github.com/github/copilot-cli/issues/3622), [#4391](https://github.com/github/copilot-cli/issues/4391), [#4384](https://github.com/github/copilot-cli/issues/4384)
- **Permission system confusion** — Auto-mode permission behavior can stick after switching back, prompts don’t explain their trigger, and path normalization can cause permission loops. [#4388](https://github.com/github/copilot-cli/issues/4388), [#4386](https://github.com/github/copilot-cli/issues/4386), [#1409](https://github.com/github/copilot-cli/issues/1409)
- **Session reliability** — Large-session resume can OOM, transcripts can blank out, and resumed sessions may switch back to the default model. [#4251](https://github.com/github/copilot-cli/issues/4251), [#4311](https://github.com/github/copilot-cli/issues/4311), [#4397](https://github.com/github/copilot-cli/issues/4397)
- **MCP lifecycle fragility** — Startup auth causes full MCP client rebuilds that orphan stdio processes; registry policy can also reject otherwise valid MCP configurations. [#4392](https://github.com/github/copilot-cli/issues/4392), [#4205](https://github.com/github/copilot-cli/issues/4205)
- **Cross-tool hook compatibility** — Claude Code-style hooks with POSIX shell operators (`||`, `&&`) break when executed through Windows PowerShell. [#4399](https://github.com/github/copilot-cli/issues/4399)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI — Community Digest
**2026-08-08**

## Today's Highlights
The 24-hour window is dominated by a data-integrity bug in `StrReplaceFile`: the tool decodes entire files with `errors="replace"`, so any non-UTF-8 byte anywhere in a file silently corrupts to U+FFFD on write (#2591). Two community fixes now compete to resolve it — one preserving raw bytes (#2594), one refusing to edit invalid UTF-8 files outright (#2595). Separately, a YOLO-mode incident in which the agent ran `rm -rf` outside the workspace and deleted user session data (#2596) spotlights the need for stronger filesystem safety boundaries.

## Releases
No new releases in the last 24 hours.

## Hot Issues
*Only 3 issues were updated in the window; all are covered.*

- **[#2591 — StrReplaceFile corrupts undecodable bytes outside the edited region](https://github.com/MoonshotAI/kimi-cli/issues/2591)** · `bug` · 3 comments
  The tool decodes the whole file with `errors="replace"`, applies the edit, and writes the entire string back — meaning any byte that isn't valid UTF-8 (even far away from the edit) becomes `EF BF BD` and permanently changes the file's length and content. High severity: silent, unrecoverable corruption in files touched by string-search-and-replace operations. Community reaction has been swift — two independent fix PRs were opened the next day.

- **[#2596 — Agent ran `rm -rf` on a pre-existing directory outside the workspace, deleting user session data](https://github.com/MoonshotAI/kimi-cli/issues/2596)** · `bug` · 0 comments
  In YOLO permission mode, the agent was asked to clean up a symlink it had created at `~/.pi/agent/sessions`. The symlink creation had failed earlier (`ln -sfn` against a pre-existing real directory), the agent didn't notice, and the cleanup escalated to deleting the real directory. A stark reminder that autonomous file operations outside the workspace need guardrails — even when "fixing" the agent's own artifacts.

- **[#2147 — [Feature] Lazy-load MCP tool schemas into context — only inject when tools are needed](https://github.com/MoonshotAI/kimi-cli/issues/2147)** · `feature` · 1 comment · 1 👍
  With multiple MCP servers configured, all tool schemas are injected into the LLM context at session start, consuming thousands of tokens before the user sends a single message. The proposal is lazy loading so schemas enter context only when relevant tools are actually invoked. Matters because MCP adoption is growing and context budget is the primary constraint on agentic session length.

## Key PR Progress
*Only 3 PRs were updated in the window; all are covered.*

- **[#2594 — fix(tools): preserve non-UTF-8 bytes in StrReplaceFile edits](https://github.com/MoonshotAI/kimi-cli/pull/2594)** · `open`
  Takes a byte-level approach: `old`/`new` are applied as UTF-8 byte substrings on the raw buffer, so invalid sequences outside the edit remain untouched. Backs the "preserve integrity" strategy for #2591.

- **[#2595 — fix(StrReplaceFile): refuse to edit files that are not valid UTF-8](https://github.com/MoonshotAI/kimi-cli/pull/2595)** · `open`
  The competing fix for #2591: instead of byte surgery, detect invalid UTF-8 upfront and refuse the edit with an explicit error. Trade-off: safer than silent corruption, but blocks edits on files that a byte-aware implementation could handle.

- **[#2255 — feat(shell): support Shift+Enter for inserting newlines](https://github.com/MoonshotAI/kimi-cli/pull/2255)** · `closed`
  Adds Shift+Enter as an alternative multi-line input shortcut alongside `Ctrl-J` and `Alt-Enter`. Closes #2254 and references a long tail of related requests (#2010, #2121, #1585, #1574) — indicating sustained demand for discoverable newline insertion. Now closed; likely merged or superseded.

## Feature Request Trends
- **Context/token efficiency**: The strongest signal is reducing up-front token consumption — led by lazy-loading MCP tool schemas (#2147).
- **Interactive terminal ergonomics**: Recurring demand for multi-line input shortcuts (Shift+Enter) with at least 5 related issues spanning months (#2254, #2010, #2121, #1585, #1574).
- **Safe file mutation**: The dual fix PRs for #2591 reflect community pressure for data-safe file editing around non-UTF-8 content.

## Developer Pain Points
- **Silent data corruption**: File-editing tools that decode/re-encode whole files risk unrecoverable byte loss; devs want fail-fast validation or byte-preserving edits.
- **Token budget depletion**: Eager schema injection for MCP servers eats context before work begins, shortening effective agent sessions.
- **Unsafe autonomous cleanup**: YOLO mode's lack of workspace boundary enforcement turned a symlink cleanup into deleted session data — trust in autonomous file operations is fragile.
- **Discoverability of shell shortcuts**: Newline insertion exists via `Ctrl-J`/`Alt-Enter` but users keep asking for Shift+Enter, signaling a UX discoverability gap.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-08

## Today's Highlights

v1.18.15 shipped core reliability fixes for message ordering and truncation cleanup. Community attention remains concentrated on unresolved opencode-go subscription/provider failures (#38218, #37771) and Windows crash regressions (#33742). On the PR side, contributors are making strong progress on the Location-scoped Environment refactor, per-target subagent permission enforcement, and filesystem watch bounding.

## Releases

### v1.18.15

[Release v1.18.15](https://github.com/anomalyco/opencode/releases/tag/v1.18.15)

Core bugfixes only:

- Chronological message ordering now stays correct even with imported or legacy out-of-order message IDs.
- Revert and fork actions use real message chronology instead of message ID ordering.
- Truncation cleanup removes stale files by file timestamp more reliably.

## Hot Issues

1. [#33742 — OpenCode v1.17.10 crashes with Bun segmentation fault on Windows; v1.17.9 appears stable](https://github.com/anomalyco/opencode/issues/33742)  
   58 comments, 47 👍. Critical Windows regression with no fix yet; downgrading to v1.17.9 is the current workaround.

2. [#38218 — bug(opencode-go): All subscription models return "Request blocked by upstream provider"](https://github.com/anomalyco/opencode/issues/38218)  
   32 comments, 15 👍. opencode-go subscribers are completely blocked from using any model, making the managed provider unusable.

3. [#14965 — Slow startup](https://github.com/anomalyco/opencode/issues/14965)  
   18 comments, 13 👍. Startup delay appears only in Ghostty, not in Terminal/Alacritty/Kitty, suggesting a terminal-detection or initialization regression.

4. [#13999 — Azure OpenAI Cognitive Services: Responses API missing ?api-version=, cannot use gpt-5.x-codex](https://github.com/anomalyco/opencode/issues/13999)  
   17 comments, 9 👍. Closed, but still a major blocker for Azure enterprise users wanting Codex models.

5. [#8565 — Accessibility mode for screen reader users](https://github.com/anomalyco/opencode/issues/8565)  
   10 comments, 3 👍. The TUI is described as “actively hostile” to screen readers because of emojis, animations, and unicode rendering.

6. [#37771 — OpenCode Go newest models fail with "Upstream request failed" due to strict provider validators](https://github.com/anomalyco/opencode/issues/37771)  
   2 comments, 8 👍. kimi-k3, glm-5.2, grok-4.5, qwen3.7-max, and other new models are rejected with HTTP 400.

7. [#39376 — Selecting a skill via prompt_skills/Ctrl+P clears the input draft](https://github.com/anomalyco/opencode/issues/39376)  
   4 comments, 1 👍. Users lose in-progress text when invoking skills, making multi-skill workflows painful.

8. [#39165 — SQLite NOT NULL constraint failed: session_message.seq after /model switch](https://github.com/anomalyco/opencode/issues/39165)  
   4 comments. Switching models mid-session corrupts message sequencing and silently breaks all further input.

9. [#35238 — V2 subagent tool does not enforce per-target subagent permissions](https://github.com/anomalyco/opencode/issues/35238)  
   3 comments. Permission rules such as “allow only explore” are not enforced at runtime — a security boundary gap.

10. [#40809 — Web UI does not list sessions and cannot start agent while TUI/attach/mobile work](https://github.com/anomalyco/opencode/issues/40809)  
    3 comments. Web UI fails in Docker/Coolify/Cloudflare deployments with basic auth and reverse proxy; other frontends work fine.

## Key PR Progress

1. [#41096 — fix(core): bound project filesystem watches](https://github.com/anomalyco/opencode/pull/41096)  
   Stops recursively watching every directory in a VCS project, fixing inotify exhaustion on large Linux repos.

2. [#41109 — fix(ai): preserve Gemini agent loop parity](https://github.com/anomalyco/opencode/pull/41109)  
   Replays unsigned Gemini 3 function calls with Google's validator-bypass sentinel and forwards `seed`, `frequencyPenalty`, and `presencePenalty`.

3. [#40925 — chore: improve incremental typecheck performance](https://github.com/anomalyco/opencode/pull/40925)  
   Adds variance annotations, persistent incremental metadata, and composite project setup to speed up Core/TUI typechecking.

4. [#41107 — refactor(core): route openai-compatible natively](https://github.com/anomalyco/opencode/pull/41107)  
   Maps `@ai-sdk/openai-compatible` catalog models to the native provider while preserving endpoints, credentials, headers, overlays, and compatibility options.

5. [#40997 — refactor(core): replace integration prompts with forms](https://github.com/anomalyco/opencode/pull/40997)  
   Unifies OAuth/key integration prompts through shared `Form.Fields`, migrating GitHub Copilot, Azure, and Cloudflare integrations.

6. [#41104 — feat(provider): discover local model context limits](https://github.com/anomalyco/opencode/pull/41104)  
   Adds context limit discovery for local/LAN OpenAI-compatible providers whose configured model is missing `limit.context`.

7. [#41100 — fix(opencode): enforce per-target task subagent permissions](https://github.com/anomalyco/opencode/pull/41100)  
   Closes #35238 by making per-target `task` permission rules a hard runtime boundary.

8. [#35777 — fix(core): refresh stale @latest npm package cache on load](https://github.com/anomalyco/opencode/pull/35777)  
   Fixes plugins configured as `@latest` never picking up newer registry versions when `node_modules/{name}` already exists.

9. [#40954 — fix(core): reload changed skill sources](https://github.com/anomalyco/opencode/pull/40954)  
   Hot reloads local/global skill sources, including symlink target changes, without restarting the service.

10. [#40641 — fix(core): serialize edit and patch transactions](https://github.com/anomalyco/opencode/pull/40641)  
    Adds path-keyed mutation locks so concurrent edit/patch calls on the same file are serialized, preventing lost or overwritten results.

## Feature Request Trends

- **Desktop/TUI visibility**: Show the current model variant in the TUI status bar ([#38015](https://github.com/anomalyco/opencode/issues/38015)), show the current git branch in the desktop new layout ([#41105](https://github.com/anomalyco/opencode/issues/41105)), and request notification permission properly ([#37120](https://github.com/anomalyco/opencode/issues/37120)).

- **Session continuity and non-blocking input**: Users want conversation history browse/resume ([#38858](https://github.com/anomalyco/opencode/issues/38858)) and queued user messages instead of cancelling the in-flight turn ([#41106](https://github.com/anomalyco/opencode/issues/41106)).

- **Extensibility and tool control**: Requests include a plugin API for `/` commands ([#41086](https://github.com/anomalyco/opencode/issues/41086)), editing MCP tool call content before execution ([#41098](https://github.com/anomalyco/opencode/issues/41098)), and preserving the input draft when selecting skills ([#39376](https://github.com/anomalyco/opencode/issues/39376)).

- **Provider configuration flexibility**: `opencode.jsonc` should inherit data from `anomalyco/models.dev` ([#40156](https://github.com/anomalyco/opencode/issues/40156)), and local model context limits should be auto-discovered ([#41104](https://github.com/anomalyco/opencode/pull/41104)).

- **Accessibility**: A dedicated screen-reader/accessibility mode for the TUI remains an open request ([#8565](https://github.com/anomalyco/opencode/issues/8565)).

## Developer Pain Points

- **Provider/subscription instability**: opencode-go subscribers are blocked universally ([#38218](https://github.com/anomalyco/opencode/issues/38218)) or on specific new models like kimi-k3 ([#37771](https://github.com/anomalyco/opencode/issues/37771), [#41035](https://github.com/anomalyco/opencode/issues/41035)), making managed provider usage unreliable.

- **Windows and Desktop instability**: Bun segmentation faults ([#33742](https://github.com/anomalyco/opencode/issues/33742)), Windows-on-ARM TUI crashes ([#41099](https://github.com/anomalyco/opencode/issues/41099)), and built-in file tools failing with `Bun is not defined` under Desktop ([#35573](https://github.com/anomalyco/opencode/issues/35573)).

- **Session/state corruption and data loss**: SQLite `seq` crashes after `/model` switching ([#39165](https://github.com/anomalyco/opencode/issues/39165)), input draft clearing on skill selection ([#39376](https://github.com/anomalyco/opencode/issues/39376)), and parallel file edits overwriting each other ([#40620](https://github.com/anomalyco/opencode/issues/40620)).

- **Performance and memory reliability**: Slow startup in specific terminals ([#14965](https://github.com/anomalyco/opencode/issues/14965)), `opencode serve` leaking memory when upstream SSE hangs ([#36739](https://github.com/anomalyco/opencode/issues/36739)), and excessive filesystem watches on large projects ([#41096](https://github.com/anomalyco/opencode/pull/41096)).

- **Deployment inconsistencies**: Web UI failing to list sessions or start agents behind Docker/proxy setups ([#40809](https://github.com/anomalyco/opencode/issues/40809)) while TUI, attach, and mobile work correctly.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

## Pi Community Digest — 2026-08-08

### 1. Today's Highlights
Pi shipped **v0.84.1** with a built-in provider for Qwen Individual-plan models plus new authentication readiness checks. Community attention remains concentrated on Windows on-ramp clarity (#7547), noisy `PI_*` bash prompts (#7128), and TUI/performance regressions (#7730, #7781). Several important PRs landed around TUI speed, SQLite query optimization, and provider compatibility fixes.

### 2. Releases
**[v0.84.1](https://github.com/earendil-works/pi/releases/tag/v0.84.1)**  
- **Qwen Token Plan Individual**: use the built-in provider for models documented for Individual subscriptions. See [API Keys](https://github.com/earendil-works/pi/blob/v0.84.1/packages/coding-agent/docs/providers.md#api-keys).  
- **Authentication readiness checks**: new `pi auth`-related checks to catch configuration problems earlier.  
Note: a startup regression with `zlib.createZstdDecompress` on Node 23 was reported against this release in [#7771](https://github.com/earendil-works/pi/issues/7771).

### 3. Hot Issues
- **[#7547 — Windows support: how do you use Pi, and what breaks?](https://github.com/earendil-works/pi/issues/7547)**  
  23 comments; the most active thread. The maintainer is trying to figure out which Windows execution modes matter most, but the many run options make prioritization hard. High community value but currently unresolved.

- **[#7128 — New `PI_*` guideline over-encourages unnecessary bash calls](https://github.com/earendil-works/pi/issues/7128)**  
  11 comments, 7 👍. The default system prompt now tells agents to inspect `PI_*` env vars, which biases them toward running `env`/inspection commands even on trivial tasks. A related issue [#7787](https://github.com/earendil-works/pi/issues/7787) says this also triggers unnecessary permission prompts.

- **[#7730 — High CPU usage on macOS with long sessions](https://github.com/earendil-works/pi/issues/7730)**  
  50–110% CPU with 600–800MB memory, appearing linked to session/context length. 3 👍, growing concern among long-session users.

- **[#7053 — Parallel tool batches lose completed results when one sibling stalls](https://github.com/earendil-works/pi/issues/7053)**  
  A follow-up to #3503: the UI event fires per tool, but persisted `toolResult` messages still wait for the whole batch. If one call stalls, already-finished results can become orphaned and surface as “No result provided.”

- **[#7702 — DeepSeek 400 via opencode zen: `reasoning_content` must be passed back](https://github.com/earendil-works/pi/issues/7702)**  
  Multi-turn/tool-call conversations with DeepSeek through the opencode zen gateway fail because `detectCompat()` doesn’t round-trip thinking content. Blocking for users of cheap DeepSeek models.

- **[#7771 — Unable to start 0.84.1 on Node 23](https://github.com/earendil-works/pi/issues/7771)**  
  `TypeError: zlib.createZstdDecompress is not a function` after `pi update`. Reinstall didn’t help; release readiness gap.

- **[#7703 — `Agent.reset()` during active run leaves assistant-only transcript](https://github.com/earendil-works/pi/issues/7703)**  
  The run isn’t aborted, so the final assistant message is appended to cleared state. Confusing state for SDK/extension users.

- **[#7740 — Custom tool renderers lost after `/reload`](https://github.com/earendil-works/pi/issues/7740)**  
  Tools registered on `session_start`, especially MCP extensions, don’t render correctly after `/reload` due to load ordering. A fix PR is already up (#7749).

- **[#7720 — Allow disabling copy-on-select in fullscreen TUI](https://github.com/earendil-works/pi/issues/7720)**  
  Fullscreen mode copies selected text to the clipboard by default, causing accidental clipboard loss for users who highlight frequently. A companion PR (#7757) adds the opt-out.

- **[#7782 — Bedrock invalid tool call poisoned a session](https://github.com/earendil-works/pi/issues/7782)**  
  Pi accepted a tool call containing an invalid empty key, persisted it, and replayed it on every turn until Bedrock rejected the session. Strong argument for input validation/sanitization before execution.

### 4. Key PR Progress
- **[#7780 — TUI performance improvement](https://github.com/earendil-works/pi/pull/7780)**  
  Incremental markdown parsing and lazy render invalidation, with partial old-content parsing on startup — a direct answer to TUI being heavier than GUI apps.

- **[#7749 — Preserve custom tool renderers after `/reload`](https://github.com/earendil-works/pi/pull/7749)**  
  Fixes the load-order issue reported in #7740 by emitting `session_start` before rebuilding historical chat messages.

- **[#7710 — Restore suspended harness operations](https://github.com/earendil-works/pi/pull/7710)**  
  Implements recovery/restore support in `AgentHarness.create`, allowing a harness to be loaded from an existing session with lost operations.

- **[#7727 — SQLite session storage query optimizations](https://github.com/earendil-works/pi/pull/7727)**  
  Moves branching filters, `stopAtType`, and membership lookup into SQL with better indexes.

- **[#7745 — Preserve Gemini thought signatures in OpenAI completions](https://github.com/earendil-works/pi/pull/7745)**  
  Captures and replays `extra_content.google/vertex.thought_signature`, fixing multi-turn tool calls for Gemini through the openai-completions provider.

- **[#7762 — LM Studio provider](https://github.com/earendil-works/pi/pull/7762)**  
  New local-model provider for LM Studio; tests are guarded by `LM_STUDIO_BASE_URL`.

- **[#7757 — Opt-out of fullscreen copy-on-select](https://github.com/earendil-works/pi/pull/7757)**  
  Implements the setting requested in #7720; also changes the `app.message.copy` keybind to handle explicit selection.

- **[#7751 — Prevent concurrent session rewrites](https://github.com/earendil-works/pi/pull/7751)**  
  Rejects overlapping manual/automatic compaction and tree navigation before shared session state can be overwritten; also guards against duplicate `/compact` dispatches.

- **[#7788 — Render tool errors via `context.isError` in example](https://github.com/earendil-works/pi/pull/7788)**  
  Replaces fragile `startsWith("Error")` string matching with the proper error flag in `built-in-tool-renderer.ts`.

- **[#7784 — Derive recovery state from record queries](https://github.com/earendil-works/pi/pull/7784)**  
  Removes dedicated recovery query APIs and derives recovery state through bounded `findRecords()` calls while keeping write-side enforcement.

Also worth watching: **[#6216 — Amazon Bedrock Mantle OpenAI Responses provider](https://github.com/earendil-works/pi/pull/6216)** and **[#7722 — `--use-theme` CLI override](https://github.com/earendil-works/pi/pull/7722)**.

### 5. Feature Request Trends
- **Windows as a first-class platform**: broad demand for clearer docs, supported run modes, and focused bug fixing.
- **TUI usability and performance**: copy-on-select opt-out, top-positioned `/` menu, preserving scrollback, and reducing CPU/memory overhead.
- **Provider compatibility hardening**: DeepSeek reasoning round-trips, Gemini thought signatures, Bedrock input sanitization, LM Studio support, and Bedrock Mantle.
- **Extension/session API maturity**: safe session replacement, reliable `agent_end` semantics, and custom renderer persistence across reloads.
- **Portable agent plugins**: support for the [Agent Plugins specification](https://agent-plugins.org/) so skills can be shared with Codex and other agents.
- **Less ambient prompt noise**: stop instructing agents to inspect `PI_*` variables on every task.

### 6. Developer Pain Points
- **Windows fragmentation**: too many ways to run Pi, unclear which path is officially supported, making bug reports and docs hard to triage.
- **TUI weight**: long sessions balloon CPU/memory; perf work is welcome but not yet merged.
- **Permission prompt spam**: default `PI_*` guidance makes agents run environment-inspection commands, triggering unnecessary approval prompts.
- **Provider-specific session poisoning**: DeepSeek and Bedrock edge cases can corrupt or brick multi-turn sessions.
- **State inconsistency**: `Agent.reset()` and `/reload` can leave transcripts, renderers, or tool results in broken states.
- **Theme behavior surprises**: auto-theme picks the wrong scheme on Ghostty and tool-call boxes don’t repaint after terminal color changes.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-08

## Today’s Highlights

- **v0.21.7 stable** shipped: the 50-turn limit for Goals was removed, allowing long-running tasks to resume and continue, and the interactive CLI now supports rendering inline terminal images from model outputs.  
- Community attention is concentrated on **Windows/desktop reliability, terminal rendering, and Web Shell/parallel-agent UX**, with multiple fixes merged for desktop link handling, Windows path canonicalization, and ACP agent fan-out concurrency.  
- Both the issues and PR trackers were very active in the last 24 hours: **50 issues and 50 PRs updated**, covering everything from OTel metric export conflicts to tmux rendering regressions.

## Releases

- **[v0.21.7](https://github.com/QwenLM/qwen-code/releases)** — Stable release highlights:
  - Removed the 50-turn limit for Goals, enabling tasks to resume and continue beyond previous boundaries.
  - Enabled inline terminal image rendering from model outputs in the interactive CLI for supported terminals.

- **[v0.21.7-nightly.20260807.fca8f3c1f](https://github.com/QwenLM/qwen-code/releases)** — Nightly release including:
  - `fix(ci)`: surface blocked autofix takeover admission.

## Hot Issues

Noteworthy issues updated in the last 24 hours:

- **[#3203 — Qwen OAuth Free Tier Policy Adjustment](https://github.com/QwenLM/qwen-code/issues/3203)**  
  *150 comments, closed.* High-engagement policy discussion proposing a reduced daily free quota and eventual phase-out of the Qwen OAuth free tier. Attracts significant community pushback and debate.

- **[#8615 — Desktop on Windows crashes at startup: EISDIR lstat 'C:'](https://github.com/QwenLM/qwen-code/issues/8615)**  
  *P1, closed.* Qwen Code Desktop 0.1.0 fails when opening a workspace because the bundled runtime mis-handles Windows drive paths. Critical startup blocker for Windows users.

- **[#8625 — Windows terminal: Chinese input pinyin is hard to read](https://github.com/QwenLM/qwen-code/issues/8625)**  
  *Open.* During Chinese IME composition, the displayed pinyin is visually unclear. Reflects ongoing IME/rendering polish needed for CJK users.

- **[#8562 — tmux screen flickering when running over iTerm2 + SSH + Ubuntu](https://github.com/QwenLM/qwen-code/issues/8562)**  
  *Open.* Users report flashing inside tmux panes after recent updates. The reporter used Qwen 3.8 Max to diagnose the regression, adding an interesting dogfooding angle.

- **[#8550 — `qwen mcp list` hangs forever on SSE servers that never send `endpoint`](https://github.com/QwenLM/qwen-code/issues/8550)**  
  *Open.* MCP SSE transport reliability issue: a slow/unresponsive server can hang the CLI indefinitely rather than timing out.

- **[#7118 — Windows standalone installer fails when `powershell.exe` cannot resolve `Get-FileHash`](https://github.com/QwenLM/qwen-code/issues/7118)**  
  *Open, 3 👍.* Installation fails during SHA-256 verification on constrained Windows environments, forcing users to fall back to npm install.

- **[#8584 — Anthropic model-ID parsing rejects dotted aliases and lacks Opus 5 token limits](https://github.com/QwenLM/qwen-code/issues/8584)**  
  *Open.* Proxy and multi-model users hit issues with IDs like `claude-opus-4.8` and incorrect token-limit handling for newer Anthropic models.

- **[#8678 — Large session load can time out and tear down a healthy daemon](https://github.com/QwenLM/qwen-code/issues/8678)**  
  *P1, open.* A slow or large session restore can exceed the child-init budget and kill a healthy daemon. A fix is already proposed in PR #8691.

- **[#8593 — Desktop: markdown links in assistant messages are styled but not clickable](https://github.com/QwenLM/qwen-code/issues/8593)**  
  *Closed.* A clear UI bug in Qwen Code Desktop: links look interactive but silently do nothing. Fixed by PR #8594.

- **[#8697 — `OTEL_METRICS_EXPORTER=otlp` silently disables metrics export](https://github.com/QwenLM/qwen-code/issues/8697)**  
  *Open.* When the standard OpenTelemetry env var is present, qwen-code’s telemetry SDK startup fails internally and native metrics stop flowing, while traces continue.

## Key PR Progress

Selected pull requests updated in the last 24 hours:

- **[#8525 — fix(core): resolve Qwen 3.8 reasoning budget conflicts](https://github.com/QwenLM/qwen-code/pull/8525)**  
  Prevents DashScope Qwen 3.8 requests from sending both `reasoning_effort` and `thinking_budget` when settings come from different config layers.

- **[#8645 — fix(core): confirm read-only git commands when repo config executes programs](https://github.com/QwenLM/qwen-code/pull/8645)**  
  Security hardening: read-only git commands are auto-approved by text, but git can execute programs from repo-local config. The PR closes that escape hatch.

- **[#8631 — fix(cli): Run ACP agent fan-outs concurrently and past the tool-call cap](https://github.com/QwenLM/qwen-code/pull/8631)**  
  Aligns ACP session tool-batch execution with the core scheduler, fixing serialization and premature termination of long agent fan-outs like `/review`.

- **[#8675 — feat(web-shell): add model-specific reasoning controls](https://github.com/QwenLM/qwen-code/pull/8675)**  
  Adds a built-in model reasoning-controls registry used across Core, ACP, daemon, SDK, and WebShell, with per-model Thinking/Effort control defaults.

- **[#8621 — feat(web-shell): install Extensions from archives](https://github.com/QwenLM/qwen-code/pull/8621)**  
  Enables local `.zip` / `.tar.gz` extension installation through the Web Shell Extension manager via a dedicated daemon endpoint.

- **[#8613 — feat(web-shell): tmux-backed interactive terminal sub-agent](https://github.com/QwenLM/qwen-code/pull/8613)**  
  Lets agents run interactive CLIs such as REPLs, other agent CLIs, or TUI apps inside a tmux session and expose them as live interactive terminals in the Web Shell.

- **[#8594 — fix(desktop): fall back to system browser when built-in browser fails](https://github.com/QwenLM/qwen-code/pull/8594)**  
  Fixes #8593. Desktop markdown links now open correctly when the built-in browser pane is unavailable.

- **[#8691 — fix(serve): Make session restore timeouts safe and observable](https://github.com/QwenLM/qwen-code/pull/8691)**  
  Addresses #8678 by giving ACP session load/resume its own restore deadline instead of reusing the 10s child init budget; default 60s, published via telemetry.

- **[#8683 — fix(review): stop the agent transcript from executing workflow commands](https://github.com/QwenLM/qwen-code/pull/8683)**  
  Wraps review agent invocation in `::stop-commands::` so streamed transcript content cannot be misinterpreted as workflow commands.

- **[#8320 — feat(workflows): add cooperative pause and resume](https://github.com/QwenLM/qwen-code/pull/8320)**  
  Adds whole-run pause/resume to Dynamic Workflows: a pause-aware scheduler stops new dispatches, lets in-flight work converge, and gates results until resume.

## Feature Request Trends

The most common feature directions across issues and PRs this week:

- **Web Shell and Desktop UX expansion**  
  Requests and PRs around composer toolbar redesigns, workspace/start-in selectors, parallel agent activity feedback, model-specific reasoning controls, and tmux-backed interactive terminals.

- **Richer external context and integrations**  
  Users want more memory/context providers such as Mem0, richer Feishu/DingTalk participant metadata, and archive-based extension installation.

- **Better telemetry and observability**  
  Requests include runtime/client attribution in usage telemetry, OTel metric exporter compatibility, safer session-restore timeouts, and reducing redundant context-usage display.

- **Internationalization and terminal IME polish**  
  Korean documentation support is requested, while Chinese users report IME/pinyin rendering issues in Windows terminals.

- **More predictive and policy-driven agent behavior**  
  Feature requests include an orchestration policy layer for the Workflow tool, cooperative pause/resume, and clearer free-tier/authentication policy controls.

## Developer Pain Points

Recurring frustrations visible in the latest issues:

- **Windows-specific breakage**  
  Installer `Get-FileHash` failures, Desktop `EISDIR lstat 'C:'` crashes, Windows verbatim path prefix issues, and React errors from deeply nested install paths.

- **Terminal rendering regressions**  
  tmux flickering, VSCode-like TUI tearing in web terminals, PuTTY middle-mouse copy breakage, and Chinese IME display problems.

- **Integration and proxy compatibility friction**  
  SSE MCP servers hanging `qwen mcp list`, Anthropic dotted-minor model aliases rejected, and `OTEL_METRICS_EXPORTER=otlp` silently breaking metrics export.

- **Core daemon reliability under load**  
  Large session loads can time out and kill a healthy daemon; queued message indicators disappear during long agent turns; CI integration tests have never been type-checked.

- **CI and automation noise**  
  Multiple main-branch E2E failures tracked by bots, autofix takeover admission issues, and the need for deterministic review effort for docs-only PRs.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest – 2026-08-08

## Today's Highlights

No new release landed in the last 24 hours, but the project remains highly active: maintainer-driven refactors continue around large Rust modules, while a fresh batch of v0.9.5 proposals targets session control, durable plan artifacts, and mid-turn composer behavior. The PR queue includes a FreeBSD build fix, prompt-based model auto-selection, and background MCP registry sync.

## Releases

None in the last 24 hours.

## Hot Issues

- [#3205 – v0.9.3: Fleet model classes, loadout auto, and semantic route roles](https://github.com/Hmbown/CodeWhale/issues/3205)  
  Core design discussion for a shared model/loadout selector across TUI, CLI, exec, subagents, and Fleet workers. 12 comments make it one of the most actively debated issues.

- [#1004 – feat(commands): /dryrun — preview the next chat completion request without sending it](https://github.com/Hmbown/CodeWhale/issues/1004)  
  Developers want to inspect exactly what will be sent to DeepSeek V4 Pro before paying for a long context turn. 9 comments show strong interest in cost control and debuggability.

- [#4022 – v0.9.3: define CLI/TUI parity for subagent and runtime control surfaces](https://github.com/Hmbown/CodeWhale/issues/4022)  
  Subagent controls currently live mainly in the TUI sidebar; the issue argues these must not be trapped in one UI if remote/cloud workflows are coming. 8 comments.

- [#2693 – v0.9.4 HarnessPosture: model-specific context and subagent policy](https://github.com/Hmbown/CodeWhale/issues/2693)  
  Proposes provider/model-specific harness strategy, especially cache-heavy prefix-stable prompts for DeepSeek V4. Important for performance and context-window economics.

- [#2870 – EPIC: staged command-boundary refactor for #2791](https://github.com/Hmbown/CodeWhale/issues/2870)  
  Closed with 20 comments, the highest-traffic item today. It tracked the layered command-boundary refactor and helped land user-command integration in palette and completion surfaces.

- [#576 – Feature Request: Improve Fork UX](https://github.com/Hmbown/CodeWhale/issues/576)  
  Users want an in-TUI interactive `/fork` picker instead of leaving the TUI to copy session IDs. Includes a detailed Chinese-language proposal; 5 comments.

- [#4390 – v0.9.4 Plan: persist a reviewable plan artifact with line comments](https://github.com/Hmbown/CodeWhale/issues/4390)  
  Plan mode has strong gates and previews but no durable, shareable plan document. The issue closes that gap with confirmation/artifact contract expectations.

- [#1481 – Support OpenCode Go/Zen please, it provides DeepSeek-V4 as well](https://github.com/Hmbown/CodeWhale/issues/1481)  
  Closed feature request with 11 comments and community support for adding OpenCode Go/Zen as a cheap DeepSeek-V4 provider.

- [#5250 – Only one API key can be saved, which makes it difficult when using across different API providers](https://github.com/Hmbown/CodeWhale/issues/5250)  
  Practical multi-provider pain: switching between DeepSeek and GLM requires re-entering API keys because only one key is stored. Recent and quickly relevant.

- [#5270 – v0.9.5: unified tasks surface (shell + subagents + durable workers)](https://github.com/Hmbown/CodeWhale/issues/5270)  
  New v0.9.5 proposal for one operator-facing list of background shells, subagents, Fleet/lane workers, and workflow runs. Addresses a growing multi-session visibility gap.

## Key PR Progress

All 7 PRs updated in the last 24 hours:

- [#5255 – Layer 5.3: Palette, completion, and discovery filtering](https://github.com/Hmbown/CodeWhale/pull/5255)  
  Continues the command-boundary refactor by verifying user-command integration in the command palette and slash-completion surfaces.

- [#5258 – fix(tui): stop stale cached session title from pinning New Session](https://github.com/Hmbown/CodeWhale/pull/5258)  
  Fixes sessions stuck at "New Session" after the first user message due to stale in-memory title cache overwriting the computed title.

- [#5256 – feat(mcp): background incremental registry sync](https://github.com/Hmbown/CodeWhale/pull/5256)  
  MCP registry sync now serves a fresh cache instantly and downloads updates in the background with a process-wide mutex guard.

- [#5254 – Build fix for FreeBSD](https://github.com/Hmbown/CodeWhale/pull/5254)  
  Closed PR addressing the missing rquickjs bindings on FreeBSD. Relevant to the open FreeBSD support request.

- [#5252 – feat(subagents): allow embedders to isolate runtime state roots](https://github.com/Hmbown/CodeWhale/pull/5252)  
  Adds optional `EngineConfig::subagent_state_root` for embedding hosts that need session-owned delegated-agent state, while preserving legacy defaults.

- [#5257 – feat(config): add model = auto for prompt-based tier selection](https://github.com/Hmbown/CodeWhale/pull/5257)  
  New `model = "auto"` chooses between `deepseek-v4-pro` and `deepseek-v4-flash` based on prompt complexity. Aligns with the broader loadout-auto direction.

- [#5229 – docs: add Docs/windows beginner guide in zh-CN](https://github.com/Hmbown/CodeWhale/pull/5229)  
  Closed docs PR adding a Chinese Windows beginner guide with verified commands and real screenshots.

## Feature Request Trends

- **Multi-provider and multi-key support** – Requests keep coming for OpenCode Go/Zen, StepFun's OpenAI-compatible endpoint, and separate saved API keys per provider instead of a single overwritten key.
- **Model auto-selection and loadout routing** – The `model = "auto"` PR and Fleet loadout-auto issue both point toward prompt- or role-based model tier selection.
- **TUI-native session control** – Users and maintainers want in-TUI fork selection, session peek, unified tasks lists, and mid-turn composer control without leaving context.
- **Durable artifacts and recovery** – Plan mode should persist a reviewable artifact; prompt-scoped file recovery would restore workspace files from a prior turn rather than relying on `git` archaeology.
- **Packaging and platform access** – FreeBSD support and a `winget` package are still open gaps for distribution.

## Developer Pain Points

- **Large monolithic Rust files** – Many issues target 3,000–7,000-line files (`runtime_threads.rs`, `ui.rs`, `prompts.rs`, `chat.rs`, `approval.rs`). Refactor fatigue is visible, but the maintainer is steadily splitting them into focused modules.
- **Context/cost blindness** – Without `/dryrun`, developers cannot see the exact request size before sending expensive DeepSeek V4 Pro turns.
- **Multi-session complexity** – Background shells, subagents, Fleet workers, and workflows lack a single operator-facing status view, and subagent control is TUI-centric.
- **Platform friction** – FreeBSD installation fails at the npm/`rquickjs` step, and Windows users still lack a `winget` installation path.
- **Provider-switch overhead** – Users frequently switch models/providers but are blocked by single-key storage, requiring manual key fetching each time.
- **No durable plan state** – Accepted strategies live inside process state/transcript replay rather than as stable, commentable artifacts, making recovery and review harder than necessary.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*