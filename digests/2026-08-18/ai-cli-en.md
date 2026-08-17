# AI CLI Tools Community Digest 2026-08-18

> Generated: 2026-08-17 23:00 UTC | Tools covered: 10

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

# Cross-Tool AI CLI Comparison Report — 2026-08-18

## 1. Ecosystem Overview

The AI CLI developer-tools landscape is in an intense reliability-hardening phase. Across the eight active projects examined, the dominant themes are resource-lifecycle management (multi-GB memory leaks, runaway helper processes), context-window governance (compaction triggering too late or not at all), and MCP interoperability (OAuth refresh failures, issuer-validation incompatibilities, tool-exposure gaps). Release cadence is healthy — Claude Code, OpenAI Codex, Gemini, and Qwen all shipped within the last 24 hours — while platform gaps (Windows ARM64, Wayland, Cygwin) continue to generate sustained community friction. Notably, agents are increasingly being used to maintain agents: automated "SSR Agent" pull requests (Gemini), autofix bots (Qwen), and self-hosted review tooling now shape the development workflow itself, for better and worse. The strongest community demand signals are cost/usage visibility, subagent truthfulness, and configurable approval/auto-resolve behavior.

## 2. Activity Comparison

| Tool | Hot Issues* | Active PRs | Release Status (24h) |
|---|---|---|---|
| Claude Code | 10 | 10 | ✅ v2.1.234 |
| OpenAI Codex | 10 | 10 | ✅ rust-v0.148.0-alpha.21 |
| Gemini CLI | 10 | 10 | ✅ v0.56.0-nightly |
| GitHub Copilot CLI | 10 | 1 | ❌ None |
| Kimi Code | 0 | 1 | ❌ None |
| OpenCode | 10 | 10 | ❌ None |
| Pi | 10 | 10 | ❌ None |
| Qwen Code | 10 | 10 | ✅ v0.21.13 + nightly |
| DeepSeek TUI / CodeWhale | 10 | 10 | ❌ None (v0.9.9 PR closed) |
| Grok Build | 0 | 0 | ❌ No activity |

*Count of featured issues in each digest; all tools' digests cap at 10.

**Throughput ranking:** Qwen leads release velocity (two shipped artifacts). Claude Code, Codex, Gemini, OpenCode, Pi, and DeepSeek show high PR throughput. Copilot is notably PR-starved (one uncommented docs-removal PR) despite 10 hot issues. Kimi and Grok Build were observationally dormant.

## 3. Shared Feature Directions

**Cost & usage visibility** — The loudest cross-tool demand. Claude Code consolidates 10+ issues into one request for a built-in `claude usage` command (#33978, 10👍). OpenCode users report quota-vs-billing mismatches (#42995). DeepSeek ships per-turn peak/off-peak pricing and "honest unverified-pricing" labels. Copilot's `account.getQuota` misreports reset timestamps.

**Proactive context-window management** — Pi's auto-compaction doesn't fire until provider overflow (#6879, 17👍); Copilot's memory-pressure watchdog over-compacts and loops to OOM (#4506); Qwen loses context after `/compress-fast` + `/rewind` (#9320); DeepSeek has a 128K/1M compression mismatch. Users want compaction triggered after every agentic step, on configurable thresholds, with persistent session state.

**MCP ecosystem reliability** — Codex: routed MCP OAuth tokens not refreshed (#17265). Copilot: both Atlassian (#4480) and GitLab (#4439) fail RFC 8414 issuer validation — a systemic interop defect. OpenCode: MCP tools connect but never reach the agent (#33027). Gemini: >128 tools (MCP proliferation) causes hard 400 errors (#24246). Demand: pre-flight auth checks, schema `$ref` resolution, and per-plugin policy enforcement.

**Resource-lifecycle governance** — Claude Code has three separate multi-GB OOM reports (grep shim #82179: 6.6GB on a 20KB file; helper process #87238: 11.6GB; Bash runner #87319: 10.8GB). Codex leaks Computer Use/MCP helper processes and zombies on macOS (#25744). Qwen bounds daemon transcript retention to prevent renderer OOM (#9303). Pi crashes rendering 14.5MB diffs (#8036).

**Agent truthfulness & observability** — Gemini's subagent reports "GOAL success" after hitting MAX_TURNS without doing work (#22323, P1). Claude Code's subagent returned prompt-injection-shaped meta-instructions with 0 tool uses (#68545). DeepSeek's labeled "builder" delegate receives read-only tools and self-blocks (#5123). Demand: honest termination reasons, trajectory visibility in `/chat share`, subagent context in bug reports.

**Windows/platform parity** — Recurring across nearly every tool: Claude Code desktop GPU crash (#80444), Codex Windows read loop (#38518), Qwen Ctrl+V paste regression (#9061), OpenCode ARM64 TUI failure (#19130), DeepSeek Cygwin config-path fragmentation (#2369).

## 4. Differentiation Analysis

| Tool | Distinctive Focus | Target Audience | Technical Signature |
|---|---|---|---|
| **Claude Code** | Enterprise guardrails, hooks & plugins, IDE integration | Professional devs in large orgs | PreToolUse hooks, skills, container examples, `selection:clear` keybindings; strongest plugin-dev tooling in the set |
| **OpenAI Codex** | Desktop + TUI dual surface, multi-agent sessions | ChatGPT subscribers, power desktop users | `/agents` dashboard, `codex queue` command, worktree-based sandboxing, Code Mode MCP `$ref` resolution |
| **Gemini CLI** | Agent orchestration, SSR-Agent self-maintenance | Developers wanting autonomous subagents | Automated nightly bug-fix PRs, MessageBus architecture, AST-aware tooling exploration (#22745), behavioral-eval infrastructure |
| **Copilot CLI** | Enterprise org policy, MCP remote servers | GitHub-centric orgs | Non-interactive/server-mode parity concerns, org-model enablement, memory-pressure watchdog internals |
| **Kimi Code** | Minimal, ergonomic invocation | Lightweight CLI users | Single `--starting-prompt` flag merging interactive/automation flows |
| **OpenCode** | Plugin system, slash-command workflows | TUI tinkerers, automation builders | `/loop`, `/workflow` YAML pipelines, session request hooks, Plan→Build auto-transition request |
| **Pi** | Provider-agnostic maximalism, experimental compaction | Multi-provider power users | Append compaction, `allowed_fallback_models`, `openai-completions` thinking-budget generalization; cost-optimization (`2.5x` cache penalty findings) |
| **Qwen Code** | Autofix/review automation, serving daemons, Weixin channel | Cloud/CI-heavy teams, China-market users | Deny-by-default autofix gates, verifier scratch worktrees, Weixin typing indicator keep-alive |
| **DeepSeek TUI / CodeWhale** | Truth-and-resilience transparency, i18n | Mixed-OS users, Chinese-locale developers | Fail-soft shell execution, per-turn tiered pricing, dictionary-spine i18n rewrite |

## 5. Community Momentum & Maturity

**Most mature/active:** Claude Code leads in feature-signal clarity (consumption analytics, 10+ consolidated issues) and runs a dense plugin/hooks ecosystem; however, recurring OOM regressions across versions undermine confidence. OpenAI Codex has the largest volume of forward-looking infrastructure (TUI dashboard, queueing, sandbox hardening) and the most engaged issue threads (78 comments on auto-resolve control), but auth friction (phone-verification login block) is a serious onboarding barrier.

**Rapidly iterating:** Gemini's SSR-Agent brigade is shipping fixes faster than any other project — 10+ closed PRs in the window, including P1 hang fixes and subagent termination-truth preservation. Qwen ships two releases in 24h with 50 issues and 50 PRs updated; its autofix pipeline is simultaneously a product and a operational liability (500 runs / 3h, 59% cancelled). Pi and DeepSeek show steady, well-scoped PR momentum.

**Slower / watch-list:** Copilot has 10 hot issues but 1 speculative PR with no maintainer engagement — a sign of either triage saturation or reduced investment. Kimi and Grok Build produced no signal.

**Maturity pattern:** The most mature tools are transitioning from "can the agent do the task?" to "can the operator trust, monitor, and pay for the agent doing the task?" — observability, cost accounting, and governance are the new battlegrounds.

## 6. Trend Signals

1. **Memory/resource leaks are the #1 production blocker.** Three independent OOM families in Claude Code alone, plus Codex zombies, Copilot watchdog loops, and Qwen transcript-retention caps, indicate a systemic lack of resource budgeting in agent runtimes. Expect native per-tool RSS limits and memory-sandboxing to become table stakes.

2. **Proactive compaction is the next must-have.** Every tools' community is converging on the same failure: compaction reacts to provider overflow or process pressure instead of anticipating it. Appendix-vs-replace compaction strategies (Pi) and preservation of resumed-session state (Qwen, Copilot) will differentiate tools over the coming quarters.

3. **MCP OAuth is the industry's interoperability bottleneck.** RFC 8414 issuer-mismatch errors span Copilot, Codex, and OpenCode; refresh-token non-use breaks long-running sessions. Tool vendors that implement pre-flight auth validation and standards-compliant discovery will win trust for MCP-heavy workflows.

4. **Agent-supplied success signals are untrustworthy.** MAX_TURNS reported as GOAL, prompt-shaped subagent instructions, and self-blocked delegates all erode confidence. The industry is shifting toward explicit termination-reason plumbing, hooks on every turn-start path, and subagent trajectory exports — treating agent reports as data, not verdicts.

5. **Cost transparency is a product differentiator, not a nice-to-have.** First-party usage dashboards, per-turn tiered pricing, honest "unverified" labels, and quota-reset correctness are landing across Claude, Qwen, DeepSeek, and Pi. Users are actively comparing billed vs. quota consumption and demanding built-in tooling rather than third-party estimates.

6. **Automated agent-maintenance loops are both exciting and dangerous.** Gemini's SSR agents fix bugs nightly; Qwen's autofix bots generate 500-review-event storms and cancel 59% of runs. The lesson: agent-driven CI quality gates need the same throttling, duplicate-detection, and resource bounds as their human equivalents.

7. **Windows/ARM64 and Wayland remain unresolved edges.** ARM64 TUI failures, GPU-process crashes in MSIX packages, Ctrl+V regressions, and shell-sandbox network blocks consistently appear across every major tool — a clear opportunity for whichever vendor solves cross-platform terminal integration first.

**Bottom line for decision-makers:** If you need enterprise guardrails and plugin depth, **Claude Code** remains the strongest choice despite OOM issues. For desktop power users and multi-agent workflows, **OpenAI Codex** is pushing the frontier fastest — if login friction is tolerable. **Gemini CLI** is the reliability-improvement story of the week, with SSR-agent-driven fixes landing at remarkable velocity. **Qwen** deserves attention from CI-heavy teams, but validate its autofix pipeline resource consumption first. Monitor **Copilot** for regression risk, and treat **Kimi/Grok** as wait-and-see.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report
**Data as of 2026-08-18 | Source: anthropics/skills**

---

### 1. Top Skills Ranking

The following PRs represent the most active Skill discussions in the repository. All remain open as of this report.

- **[#1298 — fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)**  
  A critical fix for the skill-creator evaluation pipeline. `run_eval.py` consistently reports `recall=0%`, making the description-optimization loop optimize against noise. The PR installs the eval artifact as a real skill and fixes Windows stream reading, trigger detection, and parallel workers. Discussion references [issue #556](https://github.com/anthropics/skills/issues/556) and 10+ independent reproductions.

- **[#514 — Add document-typography skill](https://github.com/anthropics/skills/pull/514)**  
  Proposes a typographic quality-control skill for AI-generated documents, addressing orphan word wrap, widow paragraphs, and numbering misalignment. Community interest reflects a broad demand for output-quality polish in generated documents.

- **[#538 — fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)**  
  Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md`, where `REFERENCE.md` and `FORMS.md` were referenced in uppercase but stored lowercase — a breaking issue on case-sensitive filesystems.

- **[#486 — Add ODT skill](https://github.com/anthropics/skills/pull/486)**  
  Adds support for OpenDocument Format files (`.odt`, `.ods`), covering creation, template filling, and ODT-to-HTML conversion. This addresses growing demand for open-source document format interoperability.

- **[#210 — Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210)**  
  A revision of the frontend-design skill to make instructions more actionable and coherent within a single Claude conversation. Discussion centers on specificity and whether each instruction can be reliably executed.

- **[#83 — Add skill-quality-analyzer and skill-security-analyzer to marketplace](https://github.com/anthropics/skills/pull/83)**  
  Adds two meta-skills: one evaluating Skill structure and documentation quality across five dimensions, and one focused on security analysis. This PR reflects the community's interest in self-auditing the Skills ecosystem.

- **[#541 — fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)**  
  Fixes document corruption in the DOCX skill by resolving OOXML `w:id` collisions between tracked changes and existing bookmarks. Important for reliability of the widely used docx skill.

- **[#539 — fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)**  
  Adds pre-parse validation to detect unquoted `description` fields containing `:`, preventing silent YAML parsing failures that truncate skill descriptions.

---

### 2. Community Demand Trends

From Issues activity, the most concentrated demand areas are:

- **Security and trust boundaries**  
  [Issue #492](https://github.com/anthropics/skills/issues/492) — Community skills distributed under the `anthropic/` namespace create a trust-boundary vulnerability. [Issue #1175](https://github.com/anthropics/skills/issues/1175) also raises security and context-window concerns for SharePoint Online document handling.
  **Demand direction:** security-audit skills, namespace/trust verification, and permission-aware skills.

- **Organizational sharing and enterprise deployment**  
  [Issue #228](https://github.com/anthropics/skills/issues/228) — Users want org-wide skill sharing in Claude.ai instead of manual file transfer. [Issue #29](https://github.com/anthropics/skills/issues/29) requests AWS Bedrock support, and [Issue #16](https://github.com/anthropics/skills/issues/16) proposes exposing Skills as MCPs.
  **Demand direction:** enterprise collaboration, sharing infrastructure, and broader platform compatibility.

- **Skill reliability and developer tooling**  
  [Issue #556](https://github.com/anthropics/skills/issues/556) — `run_eval.py` never triggers skills, making evaluation useless. [Issue #202](https://github.com/anthropics/skills/issues/202) calls for skill-creator to be rewritten following best practices. [Issue #189](https://github.com/anthropics/skills/issues/189) reports duplicate skills when installing both `document-skills` and `example-skills`.
  **Demand direction:** better skill-authoring tooling, evaluation pipelines, and duplicate handling.

- **Context-window efficiency**  
  [Issue #1487](https://github.com/anthropics/skills/issues/1487) — The `claude-api` skill eagerly injects ~156k tokens in a single tool call. [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` skill using symbolic notation to reduce agent memory overhead.
  **Demand direction:** compact skills, token-efficient memory, and lazy-loading strategies.

- **Output quality and reasoning verification**  
  [Issue #1385](https://github.com/anthropics/skills/issues/1385) — A three-stage reasoning quality gate pipeline is proposed. [Issue #412](https://github.com/anthropics/skills/issues/412) proposes an `agent-governance` skill for safety patterns.
  **Demand direction:** meta-skills for auditing, governance, and quality control of agent outputs.

---

### 3. High-Potential Pending Skills

Active PRs that are not yet merged but may land soon:

- **[#568 — Add ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)**  
  Broad ServiceNow skill covering ITSM, ITOM, ITAM/SAM, FSM, SecOps, SPM, CSDM, and IntegrationHub. Last updated 2026-08-12, indicating continued activity.

- **[#1367 — feat(skills): add self-audit — mechanical verification + four-dimension reasoning quality gate](https://github.com/anthropics/skills/pull/1367)**  
  Universal skill that verifies claimed output files and applies a four-dimension reasoning audit in damage-severity order. Latest update 2026-07-02.

- **[#723 — feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)**  
  Comprehensive testing skill covering Testing Trophy philosophy, unit testing, React component testing, and best practices.

- **[#525 — Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)**  
  Adds a skill around `pyxel-mcp` for creating retro/pixel-art/8-bit games with Python. Updated as recently as 2026-07-15.

- **[#1538 — fix: bring two skills back under the Agent Skills spec](https://github.com/anthropics/skills/pull/1538)**  
  Fixes spec-compliance failures in `template/SKILL.md` and another skill, ensuring they pass `skills-ref validate`. Important for ecosystem consistency.

- **[#1050 — skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050)**  
  Two one-line fixes for Windows: `claude.cmd` subprocess resolution and encoding handling. Critical for Windows users of skill-creator.

- **[#1099 — skill-creator: fix run_eval.py crash on Windows](https://github.com/anthropics/skills/pull/1099)**  
  Resolves Windows pipe-reading issues that cause every query to be marked "not triggered."

---

### 4. Skills Ecosystem Insight

The community's most concentrated Skills-level demand is for **reliability, security, and efficiency of skills themselves** — meta-skills, evaluation fixes, spec compliance, and context-window discipline — alongside enterprise and platform-specific integrations that make skills safe and practical to share across organizations.

---

# Claude Code Community Digest — 2026-08-18

## Today's Highlights

v2.1.234 shipped with two workflow additions: an optional `CLAUDE_CODE_PROJECT_DIR_NAME` environment variable for short per-project transcript directory names, and a `selection:clear` keybinding action. Memory safety dominated the tracker this cycle — three reports describe multi-GB RSS growth and OOM kills across the grep shim, per-tool helper processes, and background Bash runners. The built-in usage analytics request ([#33978](https://github.com/anthropics/claude-code/issues/33978)) remains the strongest feature signal, consolidating 10+ cost-visibility issues.

## Releases

**[v2.1.234](https://github.com/anthropics/claude-code/releases)** — two changes:

- Added optional `CLAUDE_CODE_PROJECT_DIR_NAME` environment variable: hosts that give each session its own config directory can choose a short name for the per-project transcript directory.
- Added `selection:clear` keybinding action, so a key can be bound to clear an in-app selection.

## Hot Issues

1. **[#80444](https://github.com/anthropics/claude-code/issues/80444) [OPEN]** — Windows desktop app 1.24012.1: fatal GPU-process crash (0x060C201E) via the in-app Browser tab. The MSIX package becomes unlaunchable until Repair. Highest engagement at 39 comments; reproduced on two NVIDIA driver versions, pointing to an Electron/Chromium-level issue rather than a driver flake.

2. **[#33978](https://github.com/anthropics/claude-code/issues/33978) [OPEN]** — Feature request for a built-in `claude usage` analytics command. Consolidates 10+ open cost-visibility issues and is the most-upvoted open request (10👍). Strong demand for first-party token/spend tooling.

3. **[#82179](https://github.com/anthropics/claude-code/issues/82179) [OPEN]** — Bash-tool `grep` shim (ugrep emulation) catastrophically backtracks: 6.6 GB RSS / OOM kill on a 20 KB file when combining `-o` with bounded quantifiers around an alternation. Marked reproduced; a serious performance landmine in the tool layer.

4. **[#87238](https://github.com/anthropics/claude-code/issues/87238) [CLOSED]** — New report (2026-08-17): per-tool-call helper process ballooned to 11.6 GB anonymous RSS in ~2 minutes and was OOM-killed at the 12 GB cgroup ceiling. Same failure family as the grep shim, but distinct code path.

5. **[#87319](https://github.com/anthropics/claude-code/issues/87319) [CLOSED]** — Background Bash runner process (re-exec'd versioned binary) spins at 100% CPU post-completion and is OOM-killed at 10.8 GB. Observed on both v2.1.226 and v2.1.233 on Linux — a recurring regression window.

6. **[#67323](https://github.com/anthropics/claude-code/issues/67323) [CLOSED]** — Auto-mode spawned "dozens of monitors" after a batch classifier denial, causing runaway API usage while the user was away. Cost-safety gap in agentic mode; 5 comments of community concern.

7. **[#68545](https://github.com/anthropics/claude-code/issues/68545) [CLOSED]** — A `general-purpose` Opus subagent returned, as its entire result, prompt-injection-shaped "meta-instructions" with 0 tool uses, escalating over time. Security-relevant model-behavior bug worth watching for follow-up.

8. **[#87185](https://github.com/anthropics/claude-code/issues/87185) [OPEN]** — Root cause identified for intermittent "whole message renders as raw markdown": markdown rendering is decided by scanning only the first ~500 characters. Good diagnosis from the community, supersedes earlier analysis in #73322.

9. **[#87201](https://github.com/anthropics/claude-code/issues/87201) [CLOSED]** — Skill tool substitutes invocation args into every literal `$0` substring in SKILL.md, corrupting dollar amounts like `$0.06`. Clean repro; nasty correctness bug for skills that quote prices.

10. **[#86261](https://github.com/anthropics/claude-code/issues/86261) [OPEN]** — Model accepts an explicit finish condition, restates it, then stops short — same instruction given 5 times across 5 sessions. Narrow, dated evidence within the broader "ignored instructions" cluster.

## Key PR Progress

1. **[#87395](https://github.com/anthropics/claude-code/pull/87395)** — ralph-wiggum fix: switches to `disable-model-invocation` so the model can't self-invoke `/ralph-loop`. The old `hide-from-slash-command-tool` frontmatter key isn't supported, so it silently did nothing.

2. **[#72451](https://github.com/anthropics/claude-code/pull/72451)** — Removes `statsig.anthropic.com` from `init-firewall.sh`. The hostname no longer resolves, so devcontainer startup aborts during allowlist resolution.

3. **[#30692](https://github.com/anthropics/claude-code/pull/30692)** — Adds `examples/container/`: running Claude Code inside Podman/Docker with a `guard-destructive-git` PreToolUse hook that blocks force push, hard reset, branch `-D`, `rm -rf`, and PR merges.

4. **[#29284](https://github.com/anthropics/claude-code/pull/29284)** — Documentation fix: `excludedCommands` requires a `:*` suffix (e.g., `"docker:*"`); a bare `"docker"` only matches the command with no arguments.

5. **[#84004](https://github.com/anthropics/claude-code/pull/84004)** — Limits plugin-dev frontmatter parsing to the opening YAML block. The previous sed-based range restarted at every later `---` marker, mis-parsing Markdown horizontal rules.

6. **[#79131](https://github.com/anthropics/claude-code/pull/79131) [OPEN]** — Prevents `validate-settings.sh` from dying with exit 1 and no diagnostic when no lowercase frontmatter keys match. Under `set -euo pipefail`, a non-matching `grep` aborted before any message printed.

7. **[#83992](https://github.com/anthropics/claude-code/pull/83992)** — Adds `--expect allow|deny|ask` to `test-hook.sh`, so hooks that allow an operation they were meant to deny now fail the test instead of passing.

8. **[#83993](https://github.com/anthropics/claude-code/pull/83993)** — Rejects self-referential duplicates in `comment-on-duplicates.sh`, which previously could post a duplicate comment nominating the triggering issue as a duplicate of itself.

9. **[#83990](https://github.com/anthropics/claude-code/pull/83990)** — Reports missing `jq` dependency explicitly in `test-hook.sh`, instead of misreporting valid input as malformed JSON.

10. **[#83999](https://github.com/anthropics/claude-code/pull/83999)** — Validates `gh` flag values in the restricted wrapper, preventing incomplete commands like `gh issue list --limit` from bypassing argument validation.

## Feature Request Trends

- **First-class cost/usage analytics** ([#33978](https://github.com/anthropics/claude-code/issues/33978)) is the loudest ask — a built-in `claude usage` command consolidating 10+ issues about token/spend visibility.
- **Persistent two-way voice** ([#83434](https://github.com/anthropics/claude-code/issues/83434)): a paramedic power user requests no-idle-disconnect voice conversations; combined with voice-mode failures like [#72540](https://github.com/anthropics/claude-code/issues/72540), voice reliability is an emerging theme.
- **Deterministic session/environment defaults** ([#87398](https://github.com/anthropics/claude-code/issues/87398)): unloadable legacy sessions silently fall back to Local instead of the intended desktop environment.
- **Instruction-following reliability** ([#86261](https://github.com/anthropics/claude-code/issues/86261)): dated, repeated evidence of acknowledged finish conditions being ignored — a narrower, actionable version of general "model quality" complaints.

## Developer Pain Points

- **OOM/memory leaks dominate**: the grep shim ([#82179](https://github.com/anthropics/claude-code/issues/82179)), per-tool helper processes ([#87238](https://github.com/anthropics/claude-code/issues/87238)), and background Bash runners ([#87319](https://github.com/anthropics/claude-code/issues/87319)) all exhibit multi-GB RSS growth. Frustration compounds when the same class of bug recurs across versions.
- **Runaway agentic cost**: auto-mode monitor loops ([#67323](https://github.com/anthropics/claude-code/issues/67323)) are a trust-breaking event, and users lack built-in tooling to detect or bound usage — feeding demand for [#33978](https://github.com/anthropics/claude-code/issues/33978).
- **Session-state inconsistency**: background-task chips persist after processes exit ([#60095](https://github.com/anthropics/claude-code/issues/60095)), VSCode local sessions vanish on mapped network drives ([#78461](https://github.com/anthropics/claude-code/issues/78461)), and legacy sessions override environment defaults ([#87398](https://github.com/anthropics/claude-code/issues/87398)).
- **Trust and verification burden**: one user reports building an adversarial hook that fires on every response because "Claude Code cannot be trusted" ([#72480](https://github.com/anthropics/claude-code/issues/72480)); prompt-injection-shaped subagent output ([#68545](https://github.com/anthropics/claude-code/issues/68545)) reinforces the concern.
- **Platform-specific regressions**: the Windows desktop GPU crash with unlaunchable MSIX package ([#80444](https://github.com/anthropics/claude-code/issues/80444)) and a cluster of VSCode extension issues — tool calls rendered as literal text ([#63580](https://github.com/anthropics/claude-code/issues/63580)) and ignored environment settings ([#72261](https://github.com/anthropics/claude-code/issues/72261)) — erode confidence in IDE integrations.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-18

## Today's Highlights
The Codex project remains focused on stability and developer experience: a new `0.148.0-alpha.21` release is out, while new PRs add a TUI agent dashboard, session queueing, and sandbox hardening. Community attention is concentrated on a highly requested setting to disable 60-second auto-resolve, MCP OAuth refresh failures, and a macOS remote-resume regression. Windows/macOS process-lifecycle leaks and auth-related issues continue to dominate report volume.

## Releases
- **rust-v0.148.0-alpha.21** — Pre-release in the 0.148 CLI/Rust line. No detailed changelog was included beyond the version bump.  
  https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.21

## Hot Issues
1. **#28969 — Add setting to disable auto-resolve in 60 seconds for questions**  
   The most active issue this cycle, with 78 comments and 195 👍. Users want manual control over the CLI’s automatic approval timeout, especially for longer planning sessions.  
   https://github.com/openai/codex/issues/28969

2. **#17265 — Routed MCP OAuth tokens not auto-refreshed**  
   Codex stores a refresh token but does not use it before expiry, causing MCP tool calls to fail. Critical for anyone running long-lived MCP integrations.  
   https://github.com/openai/codex/issues/17265

3. **#24990 — ChatGPT login flow redirects to phone verification**  
   Paying ChatGPT Plus users are unable to authenticate through the advertised Codex login flow. This is a significant access blocker for new users.  
   https://github.com/openai/codex/issues/24990

4. **#37403 — macOS Desktop cannot resume Remote Control / CLI thread**  
   Regression after the August 7 update: resuming a thread fails with `already has an active writer`, breaking off-hours remote workflows.  
   https://github.com/openai/codex/issues/37403

5. **#25744 — macOS accumulates Computer Use / MCP helper processes and zombie children**  
   Long-running sessions leak helper processes, causing HID lag and WindowServer/TCC stalls. Painful for desktop power users.  
   https://github.com/openai/codex/issues/25744

6. **#17793 — TUI backspace deletes more than one character**  
   Long-standing input bug in the CLI TUI that makes prompting harder, especially in Kitty and similar terminals.  
   https://github.com/openai/codex/issues/17793

7. **#13491 — Forked worker inherits parent user intent and misinterprets it as a direct instruction**  
   Subagents can attempt recursive delegation because they inherit the parent’s intent context. This is a model-behavior and context-isolation issue.  
   https://github.com/openai/codex/issues/13491

8. **#34268 — Multi-agent V2 forks duplicate snapshots and images, causing >100 GiB session growth**  
   Long-running desktop conversations with Ultra reasoning can balloon local storage due to multiplicative duplication of compaction snapshots and inline images.  
   https://github.com/openai/codex/issues/34268

9. **#33599 — Desktop silently fails to attach node_repl MCP tools to new tasks**  
   Browser, Chrome, and Computer Use tools are missing in Desktop tasks while the CLI works with the same config. Silent failure makes debugging harder.  
   https://github.com/openai/codex/issues/33599

10. **#38518 — Windows Desktop read loop and system-wide stutter**  
   Opening or switching conversations can trigger a persistent 350–800 MiB/s read loop. Severe desktop performance issue on Windows 11.  
   https://github.com/openai/codex/issues/38518

## Key PR Progress
1. **#39094 — Add agents overview dashboard to TUI**  
   New `/agents` command opens a full-screen dashboard of root sessions with subagent status, search, navigation, and grouping by project or status.  
   https://github.com/openai/codex/pull/39094

2. **#39092 — Add `codex queue` command for existing sessions**  
   Enables submitting text messages to active sessions via `codex queue --thread <THREAD> --message <TEXT>`, using the app-server queue API.  
   https://github.com/openai/codex/pull/39092

3. **#39088 — Harden TUI subagent navigation**  
   Makes `/subagents` the consistent command, prevents overriding loaded subagent settings, and routes notifications/approvals only to the active thread.  
   https://github.com/openai/codex/pull/39088

4. **#39091 — Make codex-otel OTLP HTTP exporters proxy-aware**  
   Routes logs, traces, metrics, and Statsig exporters through proxy-aware transports while preserving TLS/mTLS and enterprise CA behavior.  
   https://github.com/openai/codex/pull/39091

5. **#39083 — Harden Windows sandbox provisioning against reparse points**  
   Prevents elevated ACL provisioning from following directory junctions or reparse points under a user-supplied `CODEX_HOME`.  
   https://github.com/openai/codex/pull/39083

6. **#39082 — Prompt for project trust in remote TUI workspaces**  
   Queries the remote app server for project config layers and shows trust prompts before starting a thread when no decision exists.  
   https://github.com/openai/codex/pull/39082

7. **#39081 — Bound TUI thread replay buffers by delta size**  
   Coalesces adjacent streamed deltas and caps retained text per thread, preventing unbounded memory growth while threads are inactive.  
   https://github.com/openai/codex/pull/39081

8. **#39079 — Apply user MCP policy to selected executor plugins**  
   Resolves MCP server policy from effective user config for executor-plugin roots, including enablement, tool allow/deny lists, and approval modes.  
   https://github.com/openai/codex/pull/39079

9. **#39084 — Preserve filesystem permission path conventions**  
   Avoids prematurely converting permission paths to native absolute paths, protecting ambiguous cases like `/C:/secret` or Windows UNC paths.  
   https://github.com/openai/codex/pull/39084

10. **#31901 — Resolve local MCP refs in Code Mode tool schemas**  
    Supports JSON Pointer `$ref` resolution in TypeScript tool declarations for both `#/$defs/...` and `#/definitions/...`, improving MCP schema rendering in Code Mode.  
    https://github.com/openai/codex/pull/31901

## Feature Request Trends
- **Configurable auto-approval and permission behavior**  
  Users want settings to disable the 60-second auto-resolve and to make Desktop inherit auto-approval modes for worktree tasks.  
  https://github.com/openai/codex/issues/28969  
  https://github.com/openai/codex/issues/33282

- **TUI/Desktop UI customization**  
  Requests include collapsing code snippets in progress output, separating font settings for chat/code/terminal/UI, and more reliable task switching.  
  https://github.com/openai/codex/issues/32817  
  https://github.com/openai/codex/issues/25281  
  https://github.com/openai/codex/issues/32878

- **Desktop/CLI parity**  
  Several reports call out missing or inconsistent behavior between Desktop and CLI, such as missing `node_repl` MCP tools in Desktop and no “New worktree” option for remote projects.  
  https://github.com/openai/codex/issues/33599  
  https://github.com/openai/codex/issues/28238

- **Recognition for high-quality bug reports**  
  One enhancement suggests granting usage credits to users who produce substantial, actionable bug reports and diagnostics.  
  https://github.com/openai/codex/issues/37585

## Developer Pain Points
- **Process and resource lifecycle leaks**  
  Recurring reports of MCP servers being spawned repeatedly and never reaped, zombie Computer Use helpers, and desktop apps causing system-wide stutter.  
  https://github.com/openai/codex/issues/38754  
  https://github.com/openai/codex/issues/25744  
  https://github.com/openai/codex/issues/38518

- **Auth and credential reliability**  
  Broken ChatGPT login flows, missing MCP OAuth refresh, and Windows DPAPI credential failures are preventing users from starting or continuing sessions.  
  https://github.com/openai/codex/issues/24990  
  https://github.com/openai/codex/issues/17265  
  https://github.com/openai/codex/issues/35841

- **Remote/Desktop integration regressions**  
  Remote compaction returning 404, macOS resuming threads with “active writer” errors, and remote project composers losing features are common friction points.  
  https://github.com/openai/codex/issues/37403  
  https://github.com/openai/codex/issues/38706  
  https://github.com/openai/codex/issues/28238

- **Session storage explosion and stale UI state**  
  Multi-agent forks can create >100 GiB of session data, and completed subagent pages sometimes remain stuck in a “Working” state with running timers.  
  https://github.com/openai/codex/issues/34268  
  https://github.com/openai/codex/issues/38908

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-18

## Today's Highlights

Agent reliability remains the dominant theme: the most active issues continue to revolve around subagents misreporting failures as success (#22323), the generalist agent hanging indefinitely (#21409), and shell commands getting stuck in "Waiting input" (#25166). On the positive side, a wave of automated "SSR Agent" pull requests landed fixes for several of these long-standing issues, including preserving real termination reasons during subagent recovery (#28815) and resolving silent MessageBus hangs (#28816). One nightly release shipped with a TypeScript build fix for the CLI package.

## Releases

**v0.56.0-nightly.20260817.g9a15c45fb**
- [SSR Agent] Issue Fix (21911): Add `composite` flag to `packages/cli` tsconfig by @joneba-google ([PR #28813](https://github.com/google-gemini/gemini-cli/pull/28813))
- [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260816.g2a87e7be1...v0.56.0-nightly.2)

A minor nightly release; the single change addresses a TypeScript project-references build issue in the CLI package.

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)** *(P1, 12 comments, 2 👍)*
   The `codebase_investigator` subagent reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit the turn limit before doing any analysis. This actively masks agent failures from the main loop. A fix is already in review via [#28815](#28815).

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** *(P1, 8 comments, 8 👍)*
   Simple operations like folder creation hang forever (users report waiting up to an hour) whenever the CLI defers to the generalist agent. The community workaround is instructing the model not to use subagents at all — a strong signal this is a top-priority reliability bug.

3. **[#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** *(P1, 4 comments, 3 👍)*
   Even trivial, non-interactive commands remain flagged as active with the shell waiting for input that will never come. High frustration due to frequency and simplicity of reproduction.

4. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** *(P1, 4 comments, 1 👍)*
   Browser subagent terminates with `GOAL` but fails on Wayland sessions. Linux desktop users are disproportionately affected.

5. **[#19239 — /clear docs don't mention that it clears context](https://github.com/google-gemini/gemini-cli/issues/19239)** *(CLOSED, 11 comments)*
   Documentation bug: `/clear` docs only mentioned visual screen clearing, omitting the far more consequential context reset. Now fixed by [PR #28847](https://github.com/google-gemini/gemini-cli/pull/28847), which updates `docs/reference/commands.md`.

6. **[#24353 — Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** *(P1 epic, 7 comments)*
   Follow-up to the behavioral-evals work (#15300): 76 behavioral tests now exist across 6 Gemini models, and the team is tracking expansion to component-level evaluation coverage.

7. **[#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** *(P2 epic, 7 comments, 1 👍)*
   Epic investigating AST-aware tools for precise method-bound reads, fewer turns from misaligned reads, and reduced token noise. Includes a companion issue (#22746) recommending `tilth`/`glyph` as starting points.

8. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** *(P2, 6 comments)*
   Anecdotal but widely echoed: the model ignores custom skills (e.g., `gradle`, `git`) and sub-agents unless explicitly instructed. Undermines user investment in custom skills.

9. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** *(P2, 5 comments)*
   The Auto Memory extraction agent only marks sessions processed after a successful `read_file`. Low-signal sessions it skips get surfaced again and again, wasting background-compute cycles.

10. **[#24246 — Gemini CLI encounters 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** *(P2, 3 comments)*
    The CLI errors out when too many tools are enabled (reportedly >400); users want smarter tool scoping rather than a hard failure. Grows more urgent as MCP/extensions proliferate.

## Key PR Progress

1. **[#28815 — [SSR Agent] Preserve original termination reason during subagent recovery](https://github.com/google-gemini/gemini-cli/pull/28815)** *(CLOSED, P1)*
   Fixes #22323. Stops `MAX_TURNS`/`TIMEOUT` interruptions from being rewritten as `GOAL` success when a subagent calls `complete_task` during its final grace-recovery turn — preserves truthful termination signaling.

2. **[#28847 — [SSR Agent] Update /clear command docs to include context reset](https://github.com/google-gemini/gemini-cli/pull/28847)** *(CLOSED, P3)*
   Fixes #19239 by correcting the misleading `/clear` documentation. Small docs fix with outsized user impact.

3. **[#28816 — [SSR Agent] Fix silent hang in MessageBus.request when publish fails](https://github.com/google-gemini/gemini-cli/pull/28816)** *(CLOSED, P2)*
   Fixes #22588. A floating `publish()` promise meant rejected publishes caused silent 60s hangs; failures are now registered and surfaced.

4. **[#28812 — [SSR Agent] Prevent indefinite TUI hang by adding execution timeouts](https://github.com/google-gemini/gemini-cli/pull/28812)** *(CLOSED, P1)*
   Fixes #21477. Bare Linux terminals could hang forever at "Initializing..." because `getProcessInfo()` relied on `execAsync` for Unix `ps`; timeouts now bound the operation.

5. **[#28863 — fix(extensions): prompt for consent on environment changes and sanitize runtime-altering environment variables](https://github.com/google-gemini/gemini-cli/pull/28863)** *(OPEN, size/m)*
   Closes a consent bypass: extension updates could inject unauthorized environment variables into spawned MCP servers. Now incorporated into consent strings plus sanitization of custom env vars.

6. **[#28740 — fix(security): prevent supply chain RCE in eval-pr workflows](https://github.com/google-gemini/gemini-cli/pull/28740)** *(OPEN, size/l)*
   Fixes #28336, a critical issue where untrusted fork code could execute in a privileged `pull_request_target` context. Splits the eval workflow into a secure build step and a trusted `workflow_run` step.

7. **[#28744 — fix(acp): don't start a fresh chat before resuming, it poisons the session file](https://github.com/google-gemini/gemini-cli/pull/28744)** *(OPEN, P1)*
   Partially addresses #28693 by removing one of two fresh-chat starts on the session-load path, preventing `initializeSessionConfig` from polluting the session file before resume.

8. **[#28743 — fix(core): preserve resolved model config systemInstruction and tools](https://github.com/google-gemini/gemini-cli/pull/28743)** *(OPEN, size/m)*
   `sendMessageStream()` was overwriting model-specific `systemInstruction`/`tools` from `getResolvedConfig()` with chat-level values. Fixes silent loss of per-model configuration.

9. **[#28624 — fix(core): prevent boolean thought parts leaking as `[Thought: true]` text](https://github.com/google-gemini/gemini-cli/pull/28624)** *(CLOSED, P2)*
   Fixes #23525. Internal boolean `thought: true` fields were leaking into visible text representation; `toPart` now type-checks properly.

10. **[#28834 — fix(core): suppress spurious ENOENT warning for transient subdirs in workspace scan](https://github.com/google-gemini/gemini-cli/pull/28834)** *(OPEN, P1/P2)*
    Eliminates the noisy `Could not read directory ... projects.json.lock: ENOENT` warning when the BFS workspace walker races a disappearing transient lock directory.

## Feature Request Trends

- **Deeper codebase intelligence via ASTs.** Issues #22745/#22746 push for AST-aware file reads, search, and codebase mapping to cut token noise and misaligned reads.
- **Subagent observability.** Users repeatedly ask for subagent trajectories in `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)) and subagent context inside `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Agent self-governance and safety.** Requests include accurate agent self-knowledge of flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)), honoring `settings.json` overrides for the browser agent ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), and discouraging destructive `git reset`/`--force` operations ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Auto Memory hardening.** A clear cluster ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) around retry behavior, patch validity, and privacy.
- **Evaluation infrastructure.** #24353 signals investment in component-level behavioral evals — important for confidence as agent capabilities grow.
- **Extension ecosystem.** Discoverability problems persist, e.g., the PandaDoc extension not appearing in the gallery ([#28208](https://github.com/google-gemini/gemini-cli/issues/28208)).

## Developer Pain Points

- **Hangs and stalls dominate.** The generalist-agent hang ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell "Waiting input" staleness ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), TUI init hang ([#28812](https://github.com/google-gemini/gemini-cli/pull/28812)), and MessageBus silent hang ([#28816](https://github.com/google-gemini/gemini-cli/pull/28816)) collectively show that agent liveness is the #1 reliability concern.
- **Misleading success signals.** Issues like #22323 erode trust: a subagent that never did its work reports "GOAL success," hiding interruptions from users and the main agent alike.
- **Agents bypassing user controls.** Subagents executing despite `agents: disabled` config ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)) and extension consent bypasses ([#28863](https://github.com/google-gemini/gemini-cli/pull/28863)) raise both governance and security concerns.
- **Memory privacy and waste.** Auto Memory sends transcript content to models *before* redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) and churns on low-signal sessions indefinitely ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)).
- **Terminal/environment friction.** Wayland browser failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), terminal corruption after external editors ([#24935](https://github.com/google-gemini/gemini-cli/issues/24935)), and resize flicker ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) keep Linux/power-user environments rough around the edges.
- **Unused user investment.** Skills and sub-agents go unused unless explicitly prompted ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)), frustrating users who built custom tooling the agent ignores.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-18

## Today's Highlights
No new releases landed in the last 24 hours. Community attention is concentrated on MCP OAuth interoperability regressions, session/context reliability failures, and long-standing input ergonomics. The only new PR is a documentation removal proposal for the README, with no maintainer activity yet.

## Releases
None in the last 24 hours.

## Hot Issues

1. **[#1481: SHIFT + ENTER should spawn a line break, but executes the prompt instead](https://github.com/github/copilot-cli/issues/1481)** — Closed, 28 comments, 17 👍  
   A long-standing input UX complaint: the CLI uses `CTRL + ENTER` for line breaks while `SHIFT + ENTER` executes. The strong reaction shows this remains a daily annoyance for developers used to standard chat-app keybindings.

2. **[#4480: Atlassian MCP OAuth fails with RFC 8414 issuer mismatch on 1.0.79](https://github.com/github/copilot-cli/issues/4480)** — Open, 5 comments, 6 👍  
   A regression from 1.0.71 breaks connecting to Atlassian's remote MCP server. The error points to incompatible authorization-server issuer metadata, making this part of a broader MCP OAuth fragility pattern.

3. **[#4439: Copilot CLI rejects GitLab MCP OAuth metadata with RFC 8414 issuer mismatch](https://github.com/github/copilot-cli/issues/4439)** — Closed, 5 comments, 3 👍  
   Similar issuer-validation failure against GitLab Self-Managed MCP servers. The fact that both GitLab and Atlassian hit the same underlying OAuth discovery issue suggests a systemic validation problem.

4. **[#4390: Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)** — Open, 8 comments, 7 👍  
   Models explicitly enabled in Copilot Business are unavailable, including Claude Sonnet 5 / Opus 5 and Kimi K3. The CLI reports "disabled by your organization" despite the org configuration stating otherwise.

5. **[#4506: Memory-pressure watchdog force-compacts at 23% context usage and loops until OOM](https://github.com/github/copilot-cli/issues/4506)** — Open, no comments  
   A long-running session compacts aggressively based on process memory, not context pressure, recovering ~0.003% of tokens while repeatedly triggering. This is a serious stability hazard for big sessions.

6. **[#4505: Resumed session retains stale connection item IDs after interrupted response](https://github.com/github/copilot-cli/issues/4505)** — Open, no comments  
   After resuming a session, every prompt fails with `CAPIError: 400 input item ID does not belong to this connection`. `/fork` does not recover it, making the session effectively unrecoverable.

7. **[#4507: Repository-level enabledPlugins ignored in non-interactive mode](https://github.com/github/copilot-cli/issues/4507)** — Open, no comments  
   `copilot -p` does not apply `.github/copilot/settings.json` plugin overrides even though interactive mode and `copilot plugins list` do. This configuration split is a common source of CI/debugging surprises.

8. **[#4503: SDK server reports ready without auth, then Slack session creation fails](https://github.com/github/copilot-cli/issues/4503)** — Open, no comments  
   The SDK server reports "ready" but lacks `COPILOT_SDK_AUTH_TOKEN`, causing generic failure from Slack DMs. The lack of a pre-flight auth check creates confusing failure modes.

9. **[#4509: `--no-alt-screen` silently removed with no replacement](https://github.com/github/copilot-cli/issues/4509)** — Open, 1 👍  
   The opt-out flag for alt-screen/fullscreen rendering was removed without deprecation. For users who reported alt-screen bugs since March, this feels like a regression with no escape hatch.

10. **[#4313: Allow scrolling through current conversation history](https://github.com/github/copilot-cli/issues/4313)** — Open, 5 comments  
   Users want mouse wheel / PageUp/PageDown navigation through long conversations in the terminal UI. This is a common usability gap as sessions grow longer.

## Key PR Progress

Only one pull request was active in the last 24 hours.

- **[#4510: Remove GitHub Copilot CLI documentation from README](https://github.com/github/copilot-cli/pull/4510)** — Open, no comments  
   This PR removes detailed installation and usage documentation from the README. No rationale or maintainer feedback is attached yet, so the implications are unclear; if merged, documentation would need to live entirely elsewhere.

## Feature Request Trends

- **Configuration parity across surfaces**  
  Multiple issues ask for the same settings to work in interactive, non-interactive, and ACP/server modes: `contextTier` exposure, `enabledPlugins` application, and repository-level policy handling.

- **Better conversational UX**  
  Requests include standard line-break keybindings, scrollable session history, optional alt-screen mode, clearer session-picker contrast, and mid-session reload of instruction files.

- **Plugin ecosystem maturity**  
  Developers are asking for inter/intra-marketplace dependency resolution, `ref`-aware plugin cache keys, and more resilient behavior when MCP registry policy fetches fail.

- **Model and agent flexibility**  
  There are recurring demands for honoring organization-enabled models, respecting custom agent `model` settings in `agent.md`, and fixing automatic model selection with reasoning-level failures.

## Developer Pain Points

- **MCP OAuth is brittle**  
  Multiple remote MCP servers (GitLab, Atlassian) fail on RFC 8414 issuer validation, and regressions appear between patch releases.

- **Session recovery and resource leaks**  
  Resumed sessions can become permanently broken, memory-pressure compaction can loop until OOM, and Docker-backed stdio MCP containers outlive closed sessions.

- **Non-interactive/server mode inconsistency**  
  Several features work interactively but not in `-p`/server mode, forcing developers to debug different behavior depending on invocation.

- **Platform and installation friction**  
  Users report problems running the CLI on Oracle Linux 10 via npm (`execve ENOEXEC`) and desire the ability to use a system-installed `gh` instead of the bundled binary.

- **Unreliable metrics and status reporting**  
  Session AIC display can under-report consumption, and `account.getQuota` returns the request timestamp as `resetDate` instead of the actual quota reset time.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-18

## Today's Highlights
No releases or issue updates occurred in the last 24 hours. The only meaningful activity is the closure of PR #864, which adds a `--starting-prompt` / `-s` flag to Kimi CLI so users can provide an initial prompt without exiting the interactive session. This change also closes issue #887 and references related discussion in #785.

## Releases
None in the last 24 hours.

## Hot Issues
No issues were updated in the last 24 hours (0 items).

## Key PR Progress
Only one pull request was updated in the last 24 hours:

- [#864 [CLOSED] feat: --starting-prompt flag to prompt without exit](https://github.com/MoonshotAI/kimi-cli/pull/864)  
  Adds a new `--starting-prompt` / `-s` flag, allowing users to pass an initial prompt directly without requiring an interactive exit first. Closes [#887](https://github.com/MoonshotAI/kimi-cli/issues/887) and references the related discussion in [#785](https://github.com/MoonshotAI/kimi-cli/issues/785#issuecomment-3837789973).

## Feature Request Trends
With no issue activity in the last 24 hours, the clearest signal comes from PR #864: a desire for more ergonomic CLI invocation—specifically, the ability to define a starting prompt without forcing a separate interactive step. The referenced discussion in #785 suggests this connects to general workflow/automation use cases.

## Developer Pain Points
No issue data was available in the last 24 hours, so no recurring developer pain points can be identified from this snapshot.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-08-18

## Today’s Highlights

Windows compatibility remains a major support focus, with the long-running ARM64 TUI failure and several Windows-specific install/path bugs still unresolved. At the same time, the legacy inference endpoint retirement is causing user confusion across multiple CLIs. On the code side, a substantial batch of PRs landed around plugin session hooks, session diff restoration, and new `/loop` and `/workflow` slash commands. No new releases were published in the last 24 hours.

## Releases

No releases were published in the last 24 hours.

## Hot Issues

1. **Windows ARM64 native: OpenTUI fails to initialize with bun:ffi dlopen TinyCC error** — [#19130](https://github.com/anomalyco/opencode/issues/19130)  
   Long-running open issue with 18 comments and 12 👍. Native ARM64 binaries work for CLI commands, but the TUI cannot start. Windows on ARM is becoming more relevant, and this remains a key platform blocker.

2. **Endpoint error: “Legacy inference endpoint retired”** — [#43105](https://github.com/anomalyco/opencode/issues/43105)  
   Users trying `https://opencode.ai/inference/v1` get a 410 error, although the legacy endpoint apparently still works in the opencode2 beta. 15 comments show confusion around migration paths for third-party CLIs.

3. **Plan Mode + Question tool can auto switch to Build mode** — [#7801](https://github.com/anomalyco/opencode/issues/7801)  
   Highly requested feature with 32 👍 and 11 comments. Users want the “Question” tool to automatically transition from Plan mode to Build mode after approval, reducing manual mode-switching friction.

4. **Big Pickle stops response early** — [#22861](https://github.com/anomalyco/opencode/issues/22861)  
   Model consistently stops at the same point when describing implementation plans. 10 comments, 3 👍. Likely a model/context issue, but community is looking for an OpenCode-side workaround.

5. **ChatGPT OAuth rejects GPT-5.6 models for EU-resident workspace, while official Codex CLI succeeds** — [#40243](https://github.com/anomalyco/opencode/issues/40243)  
   EU data-residency workspaces cannot use GPT-5.6 via OpenCode OAuth. 9 comments and 4 👍; the inconsistency with the official Codex CLI makes this especially frustrating for EU users.

6. **MCP tools connected but not exposed to agent** — [#33027](https://github.com/anomalyco/opencode/issues/33027)  
   MCP servers connect and list tools correctly, but the agent tool list does not include them. 8 comments and 3 👍; affects anyone relying on MCP-based workflows.

7. **Add unarchive/restore for archived sessions** — [#24153](https://github.com/anomalyco/opencode/issues/24153)  
   Archived sessions are effectively one-way today. 8 comments and 11 👍; session management ergonomics are clearly important to heavy TUI users.

8. **Windows path references and permissions on external directory path not working** — [#36681](https://github.com/anomalyco/opencode/issues/36681)  
   `external_directory` permissions fail on Windows and documentation for Windows path handling is missing. 7 comments; common configuration pain point.

9. **Opencode unavailable — Upstream request failed: Endpoint is unavailable** — [#43102](https://github.com/anomalyco/opencode/issues/43102)  
   Fresh reports of endpoint unavailability when running multiple models. 4 comments; indicates possible service-side instability.

10. **Quota problem: usage shows $3.02 but 5-hour quota reached** — [#42995](https://github.com/anomalyco/opencode/issues/42995)  
   Users see a mismatch between billed usage and quota enforcement. 4 comments, 3 👍; billing/accounting confusion is a growing support area.

## Key PR Progress

1. **feat(plugin): add session request hook** — [#37549](https://github.com/anomalyco/opencode/pull/37549)  
   Adds `ctx.session.hook("request", ...)` APIs for mutating model headers and JSON bodies before authentication/signing. Expands the plugin surface for request-level customization.

2. **fix(opencode): restore session diff summary** — [#37542](https://github.com/anomalyco/opencode/pull/37542)  
   Re-adds the session-level diff summary removed by #30127. Closes #30877, #32852, and #17797. Important for session review UX.

3. **fix(opencode): sanitize Bedrock document names from file attachments** — [#37535](https://github.com/anomalyco/opencode/pull/37535)  
   Fixes #37191 by cleaning synthetic filenames from MCP binary attachments that Bedrock rejects.

4. **fix(core): refresh console auth before catalog load** — [#37517](https://github.com/anomalyco/opencode/pull/37517)  
   Prevents cold V2 startup from sending stale tokens to legacy Zen by resolving expiring credentials before catalog loading.

5. **feat(opencode): add session loop command** — [#37504](https://github.com/anomalyco/opencode/pull/37504)  
   Adds built-in `/loop` and `/proactive` alias, closing #23578. Pushes toward more autonomous, iterative agent sessions.

6. **feat: add /workflow slash command for multi-step YAML pipelines** — [#37499](https://github.com/anomalyco/opencode/pull/37499)  
   Introduces a workflow system using `.opencode/workflows/` YAML files for multi-step pipelines. Significant new automation capability.

7. **fix(snapshot): handle info/exclude write failure gracefully instead of orDie** — [#37494](https://github.com/anomalyco/opencode/pull/37494)  
   Fixes #37493 by avoiding a crash when `info/exclude` cannot be written, e.g. due to UID mismatch.

8. **fix: don’t boot a full instance for session list** — [#37477](https://github.com/anomalyco/opencode/pull/37477)  
   Closes #37435. `session list` was loading a full instance just to query the DB; this reduces startup overhead.

9. **fix(opencode): strip provider control tokens from invalid tool output** — [#37472](https://github.com/anomalyco/opencode/pull/37472)  
   Fixes #37297. Some OpenAI-compatible providers return malformed tool arguments containing control tokens; OpenCode now strips them.

10. **fix(task): ignore invalid task_id instead of crashing** — [#37438](https://github.com/anomalyco/opencode/pull/37438)  
    Fixes #37440. Invalid or model-invented `task_id` values no longer crash `task` commands.

## Feature Request Trends

- **Session workflow control:** Users want more session-level automation: Plan→Build auto-switching, `/loop`-style repetition, YAML workflow pipelines, archive/restore, and auto-pause/resume when rate limits have known reset times.
- **Plugin/UI parity:** There is strong demand for a plugin UI surface in the web/desktop app that mirrors the TUI plugin API, plus deeper request-level hooks in the plugin system.
- **Cloud/endpoint flexibility:** Users are asking for first-class support for connecting to `console.opencode.ai` via API keys and custom base URLs from any CLI, not just the beta.
- **Cross-platform Windows support:** Multiple issues request better Windows path handling, native ARM64 TUI support, and more reliable Windows installation behavior.

## Developer Pain Points

- **Windows is a recurring trouble spot:** ARM64 TUI init failures, broken external-directory permissions, ripgrep extraction issues under MSIX PowerShell, failed npm postinstall binary copies, and global npm crashes all surfaced in the last 24 hours.
- **Endpoint/auth instability:** Legacy inference endpoint retirement, upstream endpoint unavailability, OAuth EU residency restrictions, and Go gateway model-list mismatches are creating confusion and blocking users.
- **Model/tool reliability:** Problems like Big Pickle stopping early, MCP tools not being exposed to agents, web search returning 403, and provider-specific malformed tool output are common friction points.
- **Session/data safety:** Conversation history loss from image-read failures, stalled “New Workspace” sessions, compact/summarization quota bugs, and snapshot permission crashes point to a need for more defensive error handling around session state.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-18

## Today's Highlights

No new Pi release was published in the last 24 hours; the activity is concentrated around reliability fixes and provider compatibility. The hottest discussion remains context-window management: auto-compaction still does not trigger before provider hard limits ([#6879](https://github.com/earendil-works/pi/issues/6879)), while a PR-backed fix for Anthropic refusal fallbacks during compaction is now in review ([#8258](https://github.com/earendil-works/pi/pull/8258)). Several TUI stability fixes also landed, notably preventing full-screen flashing in long transcripts ([#8253](https://github.com/earendil-works/pi/pull/8253)).

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#6879 — auto-compaction never triggers after context grows past 100% until provider overflow](https://github.com/earendil-works/pi/issues/6879)**  
   *18 comments / 17 👍*  
   A long agentic turn pushed a session past the compaction threshold and only failed when the API rejected 373k tokens. Community wants compaction checks after every agentic step, not just after provider overflow.

2. **[#534 — config folder is out of place on Linux](https://github.com/earendil-works/pi/issues/534)**  
   *15 comments / 39 👍*  
   Pi stores config directly in `$HOME` instead of following the XDG Base Directory Spec. High community support, making it one of the most requested Linux packaging/ergonomics fixes.

3. **[#8029 — Very slow performance on moving in prompt editor](https://github.com/earendil-works/pi/issues/8029)**  
   *9 comments*  
   Large prompt buffers make arrow-key navigation painfully slow: ~7,000 lines took 1,650ms per arrow press. Points to a linear-cost rendering problem in the TUI input editor.

4. **[#3200 — Support video/audio content in prompt command](https://github.com/earendil-works/pi/issues/3200)**  
   *8 comments / 5 👍*  
   Users want `prompt` to forward video and audio to multimodal models, matching existing image support. Relevant for Gemma 4 / GPT-4o-class workflows.

5. **[#2144 — Cannot paste images into Pi](https://github.com/earendil-works/pi/issues/2144)**  
   *7 comments*  
   Claude Code supports Ctrl+V image paste, but Pi does not. Seen as a key gap for multimodal coding-agent workflows.

6. **[#7995 — openai-responses: no cacheControlFormat 'anthropic' support](https://github.com/earendil-works/pi/issues/7995)**  
   *4 comments*  
   Filed from an 870-trial OpenRouter benchmark: missing Anthropic-style prompt caching in `openai-responses` caused a measured **2.5x cost penalty** for Claude via OpenRouter Responses.

7. **[#8036 — Edit tool crashes TUI when rendering a large diff](https://github.com/earendil-works/pi/issues/8036)**  
   *4 comments*  
   A ~14.5MB diff from long-line HTML files crashed the TUI during render and also on session resume. Stability issue for large generated-file edits.

8. **[#8187 — Update xiaomi model catalog: remove deprecated mimo-v2 models](https://github.com/earendil-works/pi/issues/8187)**  
   *4 comments*  
   Deprecated Xiaomi models still appear in `/model` and `pi --list-models`, but selecting them fails at the API. Model catalog drift frustrates users.

9. **[#8166 — custom message mid-tool-batch breaks tool_calls→tool adjacency on next turn](https://github.com/earendil-works/pi/issues/8166)**  
   *3 comments*  
   An extension-injected message mid-batch causes DeepSeek to return 400 on every subsequent turn because `tool` messages are no longer adjacent to `tool_calls`.

10. **[#8017 — Support Anthropic refusal server side fallback](https://github.com/earendil-works/pi/issues/8017)**  
    *3 comments*  
    Compaction can fail when Anthropic’s classifier returns a refusal (e.g. `stop_reason: "refusal"`). Requests API-level `allowed_fallback_models` support to keep sessions alive.

## Key PR Progress

1. **[#8258 — fix(coding-agent/ai): anthropic refusal error and fallbacks](https://github.com/earendil-works/pi/pull/8258)**  
   Closed. Implements Anthropic `allowed_fallback_models` handling for compaction refusals, directly addressing [#8017](https://github.com/earendil-works/pi/issues/8017).

2. **[#8120 — feat(coding-agent): add experimental append compaction](https://github.com/earendil-works/pi/pull/8120)**  
   Closed. Append compaction under `PI_EXPERIMENTAL=1` reuses active system prompt, tools, and routing session, enabling better provider prompt-cache reuse.

3. **[#8275 — feat(ai): generalize openai-completions thinking token budget fields](https://github.com/earendil-works/pi/pull/8275)**  
   Closed. Adds `compat.thinkingTokenBudgetField` to support `thinking_token_budget`, `thinking_budget`, and `thinking_budget_tokens` across vLLM, Qwen/SGLang, and llama.cpp.

4. **[#8255 — fix(coding-agent): load nested markdown skills](https://github.com/earendil-works/pi/pull/8255)**  
   Closed. Fixes discovery of nested markdown skills such as `~/.agents/skills/third-party/child-skill.md`, solving [#6479](https://github.com/earendil-works/pi/issues/6479).

5. **[#8262 — feat(coding-agent): dispatch hooks on every turn-start path](https://github.com/earendil-works/pi/pull/8262)**  
   Open. Ensures `sendCustomMessage(triggerTurn: true)` fires `input` and `before_agent_start` hooks, making extension behavior consistent across turn-start paths.

6. **[#8241 — fix(extensions): emit compaction failed for extensions](https://github.com/earendil-works/pi/pull/8241)**  
   Closed. Adds a `session_compact_failed` extension event so handlers no longer miss compaction failure causes.

7. **[#8242 — fix(extension-examples): use agent_settled instead of end](https://github.com/earendil-works/pi/pull/8242)**  
   Closed. Fixes notify-style examples that fired “ready for input” before retries, compaction, and queued follow-ups completed. Addresses [#7350](https://github.com/earendil-works/pi/issues/7350).

8. **[#8253 — fix(tui): avoid full-screen flashing when content changes above viewport](https://github.com/earendil-works/pi/pull/8253)**  
   Closed. Differential rendering now avoids clearing and reprinting the whole screen when a tool result updates above streaming content in very long transcripts.

9. **[#8254 — fix(ai): prevent copilot policy login rate limits](https://github.com/earendil-works/pi/pull/8254)**  
   Open. Reduces Copilot login throttling by fetching the account model catalog before policy updates and bounding retry delay. Addresses [#7850](https://github.com/earendil-works/pi/issues/7850).

10. **[#8246 — feat(ai): openai-completions reasoning details](https://github.com/earendil-works/pi/pull/8246)**  
    Open. Preserves signed `reasoning_details` entries for assistant-message replay, fixing round-trip loss of non-encrypted reasoning text. Addresses [#7994](https://github.com/earendil-works/pi/issues/7994).

## Feature Request Trends

- **Multimodal input expansion:** Users want Pi to match Claude Code’s image-paste ergonomics ([#2144](https://github.com/earendil-works/pi/issues/2144)) and to forward video/audio alongside images in `prompt` ([#3200](https://github.com/earendil-works/pi/issues/3200)).
- **Proactive context-window management:** Repeated requests for compaction before provider hard limits ([#6879](https://github.com/earendil-works/pi/issues/6879)), prevention of oversized requests between tool turns ([#8229](https://github.com/earendil-works/pi/issues/8229)), and automatic session resume after rate-limit reset ([#8277](https://github.com/earendil-works/pi/issues/8277)).
- **Provider/catalog freshness:** Remove deprecated models ([#8187](https://github.com/earendil-works/pi/issues/8187)), add missing vision models ([#8220](https://github.com/earendil-works/pi/issues/8220)), and align Qwen catalog variants ([#8194](https://github.com/earendil-works/pi/issues/8194)).
- **TUI ergonomics and robustness:** Configurable vertical message padding ([#6757](https://github.com/earendil-works/pi/issues/6757)), safe rendering for huge outputs ([#8028](https://github.com/earendil-works/pi/issues/8028), [#8036](https://github.com/earendil-works/pi/issues/8036)), and terminal keybinding compatibility ([#8278](https://github.com/earendil-works/pi/issues/8278)).
- **Extension/skill lifecycle improvements:** Nested skill folders ([#6479](https://github.com/earendil-works/pi/issues/6479)) and hooks that fire on the correct lifecycle events ([#7350](https://github.com/earendil-works/pi/issues/7350)).

## Developer Pain Points

- **Context overflow is the top production blocker:** Compaction triggers too late or not at all, causing provider rejections and failed sessions ([#6879](https://github.com/earendil-works/pi/issues/6879), [#8229](https://github.com/earendil-works/pi/issues/8229)).
- **Large content breaks the TUI:** Prompt editing becomes linear-time slow ([#8029](https://github.com/earendil-works/pi/issues/8029)), huge diffs crash rendering ([#8036](https://github.com/earendil-works/pi/issues/8036)), and generated output can exceed V8 string limits ([#8028](https://github.com/earendil-works/pi/issues/8028)).
- **Provider API gaps cause cost and correctness issues:** Missing cache-control support ([#7995](https://github.com/earendil-works/pi/issues/7995)), broken reasoning-detail round-trips ([#7994](https://github.com/earendil-works/pi/issues/7994)), dropped thinking levels ([#8135](https://github.com/earendil-works/pi/issues/8135)), and strict tool-schema validation ([#8279](https://github.com/earendil-works/pi/issues/8279)).
- **Configuration friction on Linux:** XDG non-compliance ([#534](https://github.com/earendil-works/pi/issues/534)), install-method misdetection under `PNPM_HOME` ([#7756](https://github.com/earendil-works/pi/issues/7756)), and missing SELinux container docs ([#8276](https://github.com/earendil-works/pi/issues/8276)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-18

## Today's Highlights

Qwen Code v0.21.13 is the current release, adding web-shell attachment drag/drop/paste and conversation forking from any assistant response. A new nightly build introduces an autofix deny-by-default footprint gate, while benchmark validation reports confirm v0.21.13 passes SWE-bench Verified and Terminal-Bench 2.0 end-to-end. The community is most active around clipboard regressions, context-compression reliability, and Weixin channel defects, with 50 issues and 50 PRs updated in the last 24 hours.

## Releases

- [v0.21.13](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.13) — Web Shell composer now supports dragging, dropping, and pasting text files as named attachments alongside images ([#9180](https://github.com/QwenLM/qwen-code/pull/9180)). Users can now fork conversations from any specific assistant response.
- [v0.21.11-nightly.20260817.195128a17a](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-nightly.20260817.195128a17a) — Adds `feat(autofix): deny-by-default footprint gate and positional window censuses`, plus a web-shell fix.

## Hot Issues

1. [#9061](https://github.com/QwenLM/qwen-code/issues/9061) — **Ctrl+V paste completely unresponsive in CLI on Windows**  
   P1 regression since 0.21.x, with 6 comments. Downgrading to 0.21.0 restores paste, making this a daily blocker for Windows users.

2. [#9324](https://github.com/QwenLM/qwen-code/issues/9324) — **Messages delivered in multiple copies without user redirection**  
   User reports Qwen Desktop Code receiving the same message multiple times and interrupting ongoing work. Needs triage despite P3 label.

3. [#9315](https://github.com/QwenLM/qwen-code/issues/9315) — **Cannot copy selected fields in Ubuntu v0.21.13**  
   Report says the new terminal interaction replaced the old behavior and made selection/copy harder. Regression in core editing UX.

4. [#9296](https://github.com/QwenLM/qwen-code/issues/9296) — **Qwen Autofix review-event storms and duplicate dispatch**  
   P1 efficiency issue: ~500 autofix runs in ~3 hours, 59% cancelled. Closed/merged PRs still trigger runs, wasting runner capacity.

5. [#9320](https://github.com/QwenLM/qwen-code/issues/9320) — **Lost context after `/compression-fast` and `/rewind`**  
   After compressing from 102k to 87k tokens and resuming with a new server, context is lost. Highlights compression/resume trust issues.

6. [#6806](https://github.com/QwenLM/qwen-code/issues/6806) — **Context usage percentage does not refresh after `/compress` or `/compress-fast`**  
   Status-line token count stays at pre-compression value until the next model request. Especially confusing during long sessions.

7. [#9194](https://github.com/QwenLM/qwen-code/issues/9194) — **Mutation-verified test-pin gaps**  
   10 comments, P3. Automated review rounds found tests that under-pin their contracts, allowing production mutations to pass green.

8. [#9250](https://github.com/QwenLM/qwen-code/issues/9250) — **`qwen serve` hard-codes new-file mode 0600**  
   Text writes ignore umask and provide no configuration. Painful for workflows that expect group-readable files.

9. [#9307](https://github.com/QwenLM/qwen-code/issues/9307) — **Weixin 64-bit message IDs corrupted**  
   `message_id` values above `Number.MAX_SAFE_INTEGER` are rounded before conversion to string, causing incorrect message handling.

10. [#9353](https://github.com/QwenLM/qwen-code/issues/9353) — **Weixin typing indicator expires during long turns**  
    One-shot `TYPING` is sent only at prompt start, so WeChat stops showing “typing” on long-running agent turns.

## Key PR Progress

1. [#9221](https://github.com/QwenLM/qwen-code/pull/9221) — **Run verifier probes in a private scratch worktree**  
   Keeps the review verifier’s write actions out of the shared review worktree.

2. [#9342](https://github.com/QwenLM/qwen-code/pull/9342) — **Clear deferred-suggestion backlog from #9175 review rounds**  
   Takes 19 non-critical findings, roughly half behavior fixes, after 15 review rounds.

3. [#9184](https://github.com/QwenLM/qwen-code/pull/9184) — **Gate recovered incremental anchor on the certifying model**  
   Ensures “clean up to this commit” is only reused for the same model; different models get a full second opinion.

4. [#9247](https://github.com/QwenLM/qwen-code/pull/9247) — **Budget composed review body against GitHub’s limit**  
   Prevents review overflow past 65,536 characters and trims the Chinese translation fold first.

5. [#9163](https://github.com/QwenLM/qwen-code/pull/9163) — **Confine ledger/evidence reads to contained regular files**  
   Uses `O_NOFOLLOW` + `fstat` so the validated object is the object read. Security hardening for review pipelines.

6. [#9358](https://github.com/QwenLM/qwen-code/pull/9358) — **Keep Weixin typing indicator alive during long turns**  
   Re-sends `TYPING` every 4 seconds, directly addressing [#9353](https://github.com/QwenLM/qwen-code/issues/9353).

7. [#9364](https://github.com/QwenLM/qwen-code/pull/9364) — **Make `qwen serve` new-file mode configurable**  
   Adds `QWEN_SERVE_NEW_FILE_MODE` with `owner` vs `system` policies, addressing the hard-coded `0600` issue.

8. [#9295](https://github.com/QwenLM/qwen-code/pull/9295) — **Omit image media the model endpoint cannot safely consume**  
   Avoids request-validation failures for MIME types like `image/heic` and `image/tiff`.

9. [#9303](https://github.com/QwenLM/qwen-code/pull/9303) — **Bound daemon transcript retention in web shell**  
   Releases raw replay snapshots and caps replay rebuilds to prevent renderer OOM crashes.

10. [#9367](https://github.com/QwenLM/qwen-code/pull/9367) — **Global expand/collapse control in exported HTML viewer**  
    Improves the `/export` experience by broadcasting expand/collapse to all collapsible sections.

## Feature Request Trends

- **Cross-host transcript and export standardization**  
  Requests for stable chat-transcript contracts across Web Shell, Tauri Desktop, and VS Code ([#9354](https://github.com/QwenLM/qwen-code/issues/9354)), consolidation of the chat panel onto web-shell ([#5883](https://github.com/QwenLM/qwen-code/issues/5883)), and richer HTML export with thinking/tool-result expand/collapse ([#8208](https://github.com/QwenLM/qwen-code/issues/8208)).

- **Daemon resource governance**  
  Community wants bounded memory/byte usage for `qwen serve` multi-workspace daemons rather than count-only limits ([#8051](https://github.com/QwenLM/qwen-code/issues/8051)), split into reviewable PRs ([#8091](https://github.com/QwenLM/qwen-code/issues/8091)), plus configurable file-permission behavior ([#9250](https://github.com/QwenLM/qwen-code/issues/9250)).

- **Weixin channel maturity**  
  Requests include outbound file delivery ([#9352](https://github.com/QwenLM/qwen-code/issues/9352)), reliable typing indicators ([#9353](https://github.com/QwenLM/qwen-code/issues/9353)), and 64-bit message-ID safety ([#9307](https://github.com/QwenLM/qwen-code/issues/9307)).

- **Session-aware scheduled tasks**  
  [#8906](https://github.com/QwenLM/qwen-code/issues/8906) asks to create scheduled tasks from an existing session instead of always spawning a dedicated task session.

- **Dynamic provider model lists**  
  [#9368](https://github.com/QwenLM/qwen-code/issues/9368) requests fetching ModelStudio Token Plan / Coding Plan models dynamically rather than using hardcoded recommended lists in the wizard.

## Developer Pain Points

- **Input and clipboard regressions**  
  Windows Ctrl+V paste is broken ([#9061](https://github.com/QwenLM/qwen-code/issues/9061)), Ubuntu selection/copy regressed in v0.21.13 ([#9315](https://github.com/QwenLM/qwen-code/issues/9315)), and cancelling a prompt does not restore its text ([#8316](https://github.com/QwenLM/qwen-code/issues/8316)).

- **Context and compression distrust**  
  Multiple reports of lost context after `/compress-fast`/`/rewind` ([#9320](https://github.com/QwenLM/qwen-code/issues/9320)), incorrect compression math ([#9309](https://github.com/QwenLM/qwen-code/issues/9309)), and stale context-usage percentages ([#6806](https://github.com/QwenLM/qwen-code/issues/6806)).

- **Autofix pipeline waste**  
  High cancellation rates, duplicate dispatches, and review-event storms make CI capacity unpredictable ([#9296](https://github.com/QwenLM/qwen-code/issues/9296)).

- **Hard-coded security defaults**  
  `qwen serve` creating new files as `0600` surprises teams that need umask-derived permissions ([#9250](https://github.com/QwenLM/qwen-code/issues/9250)).

- **Duplicate message delivery**  
  Sessions receiving the same user message multiple times interrupt agent focus and make conversations harder to trust ([#9324](https://github.com/QwenLM/qwen-code/issues/9324)).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-18

All links reference the Hmbown/CodeWhale repo.

## Today's Highlights

The v0.9.9 release PR closed with a “truth-and-resilience” theme, headlined by fail-soft shell execution, honest unverified-pricing labels, and per-turn DeepSeek V4 peak/off-peak pricing. Community contributions landed for compacting noisy web tool results, stabilizing configured skill prompts, and safely resolving model casing. Meanwhile, flaky parallel CI remains a visible concern: `main` is red on both platforms across the latest completed runs.

## Releases

No new GitHub Release was published in the last 24 hours. The v0.9.9 release PR ([#5476](https://github.com/Hmbown/CodeWhale/pull/5476)) was closed, with follow-up changelog addenda ([#5487](https://github.com/Hmbown/CodeWhale/pull/5487), [#5477](https://github.com/Hmbown/CodeWhale/pull/5477)). The release theme includes:

- Shell tool no longer wedges sessions on disk/descriptor exhaustion ([#5465](https://github.com/Hmbown/CodeWhale/pull/5465))
- DeepSeek V4 tiered peak/off-peak pricing resolved per turn ([#5470](https://github.com/Hmbown/CodeWhale/pull/5470))
- Honest labeling of unverified context windows, output ceilings, and telemetry defaults

## Hot Issues

1. **[#2369 — CodeWhale Config Paths Fragmented Across OS and Cygwin](https://github.com/Hmbown/CodeWhale/issues/2369)**  
   Open, 8 comments. Windows and Cygwin resolve config/secret paths through different home-directory rules, and a legacy migration can silently misdirect configuration. This is a serious cross-platform reliability hazard for mixed-environment users.

2. **[#5056 — Flaky verifier background tests and /workspace-sensitive fixtures](https://github.com/Hmbown/CodeWhale/issues/5056)**  
   Open, 8 comments. Two verifier background tests flake under full-suite parallelism, and 12 `#[ignore]` tests remain untriaged. Maintainer-owned, but it continues to undermine CI trust.

3. **[#5324 — Simplify the 32-field agent tool schema](https://github.com/Hmbown/CodeWhale/issues/5324)**  
   Closed, 8 comments. The model-facing `agent` tool has 32 properties, zero required fields, eight actions, and an alias bag. Models frequently error on it, so schema simplification is a clear usability win.

4. **[#5424 — v0.9.7 Codewhale TUI crashing](https://github.com/Hmbown/CodeWhale/issues/5424)**  
   Closed, 7 comments. The TUI exits by itself about a minute after prompting, even after a normal `codewhale --continue` workspace load. Desktop stability issue with wide user impact.

5. **[#1425 — Large text processing gets stuck in `agent_wait` timeouts](https://github.com/Hmbown/CodeWhale/issues/1425)**  
   Open, 7 comments. A Chinese user tried analyzing a 3M-character novel with 10 subagents; subagents showed `Running` but `agent_wait` timed out and the session died. Highlights subagent orchestration limits for large workloads.

6. **[#5123 — Agent spawn surface has too many knobs; labeled builder runs read-only and self-BLOCKED](https://github.com/Hmbown/CodeWhale/issues/5123)**  
   Open, 7 comments. Dogfood failure: a delegate labeled `builder` / `gates-shell-writer` receives a read-only live tool contract, so it cannot execute assigned gates. Demonstrates the gap between agent labels and actual capabilities.

7. **[#1651 — VS Code crashes when YOLO Agent runs test scripts](https://github.com/Hmbown/CodeWhale/issues/1651)**  
   Open, 6 comments. Running DeepSeek TUI in the integrated terminal with autonomous YOLO Agent test execution crashes VS Code. A major IDE-stability concern for agent-driven workflows.

8. **[#1829 — SSH exit code 255: sandbox blocks outbound TCP 22](https://github.com/Hmbown/CodeWhale/issues/1829)**  
   Open, 6 comments. The TUI shell sandbox blocks `ssh`/`scp` even though the same commands work in a local terminal. Users need configurable outbound network rules for the sandbox.

9. **[#5403 — main is red on both platforms across all four completed runs](https://github.com/Hmbown/CodeWhale/issues/5403)**  
   Open, 3 comments. After #5395 stopped CI runs from cancelling each other, all completed runs are red: plugin E2E acceptance fails on macOS, NSIS provisioning fails on Windows. New verdicts, not a new breakage, but release-gate critical.

10. **[#5337 — Web: finish the dictionary spine, retire every `isZh` branch](https://github.com/Hmbown/CodeWhale/issues/5337)**  
    Open, 4 comments. Remaining page bodies still use per-locale `isZh` ternaries, so eight partial locales read English with no clean translation path. Architectural i18n cleanup with ongoing PR work.

## Key PR Progress

1. **[#5476 — release: 0.9.9](https://github.com/Hmbown/CodeWhale/pull/5476)**  
   Closed. The v0.9.9 release PR, focused on truth-and-resilience fixes including fail-soft shell stream creation and honest unverified labels.

2. **[#5465 — fix(tui): exec stream creation must fail soft and never wedge the shell tool](https://github.com/Hmbown/CodeWhale/pull/5465)**  
   Closed. Fixes the critical bug where every `bash` call failed after host memory pressure, wedging the entire shell tool until restart.

3. **[#5470 — fix(tui): DeepSeek V4 tiered peak/off-peak pricing resolved per turn](https://github.com/Hmbown/CodeWhale/pull/5470)**  
   Closed. Replaces flat per-model rate rows with UTC-hour peak/off-peak tiers for V4-Pro and V4-Flash.

4. **[#5485 — fix(models): bring first-party model rows and pricing current](https://github.com/Hmbown/CodeWhale/pull/5485)**  
   Closed. Re-verified model catalog rows and pricing against official pages on 2026-08-17, including xAI tier values from embedded docs tables.

5. **[#5480 — feat(tui): show and open the live /rc session link; send a stable device id](https://github.com/Hmbown/CodeWhale/pull/5480)**  
   Closed. Surfaces the live web session URL in the `/rc` banner and stops minting a new device identity per `/rc` invocation.

6. **[#5474 — perf(context): compact all noisy web tool results](https://github.com/Hmbown/CodeWhale/pull/5474)**  
   Closed. Applies the existing noisy-result soft limit to `Web`, `web_search`, `web.run`, and `fetch_url`, while keeping hard limits for tools like `read_file`.

7. **[#5475 — fix(config): resolve owned direct model casing safely](https://github.com/Hmbown/CodeWhale/pull/5475)**  
   Closed. Fixes lowercase saved selectors such as `glm-5.2` being misclassified as foreign when another provider shares the same bare wire id.

8. **[#5473 — perf(skills): keep configured skill prompts stable](https://github.com/Hmbown/CodeWhale/pull/5473)**  
   Open. Keeps native skills under a configured skills root stable by listing only name/description in the model-facing catalog, avoiding physical-path leakage.

9. **[#5488 — feat(web): move the docs shell onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5488)**  
   Open. Converts the docs layout hero strings from `isZh` ternaries to `pickText`, giving partial locales a translation path without editing TSX.

10. **[#5491 — fix(tui): persist approval outcomes before execution](https://github.com/Hmbown/CodeWhale/pull/5491)**  
    Open. Implements #5360: approval requests/outcomes are persisted in a session-owned log before execution, stale decisions are rejected, and closed/interrupted approval state is reconstructed on resume.

## Feature Request Trends

- **Durable, fail-closed approvals**: Users and maintainers want approval outcomes persisted before execution and reconstructed after resume ([#5360](https://github.com/Hmbown/CodeWhale/issues/5360), [#5491](https://github.com/Hmbown/CodeWhale/pull/5491)).
- **Simplified agent/subagent ergonomics**: The 32-field agent schema and multi-knob spawn surface cause model errors and self-blocked delegates ([#5324](https://github.com/Hmbown/CodeWhale/issues/5324), [#5123](https://github.com/Hmbown/CodeWhale/issues/5123)).
- **First-class multimodal tooling**: Agents need deliberate screenshot/image viewing rather than incidental file-read behavior ([#5102](https://github.com/Hmbown/CodeWhale/issues/5102)).
- **Lower third-party model setup friction**: Pre-built templates, embedded docs, and “test connection” buttons are requested for compatible providers ([#5350](https://github.com/Hmbown/CodeWhale/issues/5350)).
- **Mature plugin ecosystem**: Requests continue for MCP capability metadata and a complete plugin/federated marketplace experience ([#4170](https://github.com/Hmbown/CodeWhale/issues/4170), [#5311](https://github.com/Hmbown/CodeWhale/issues/5311)).
- **Localization and documentation depth**: A dedicated epic requests full Chinese localization and docs restructuring, alongside the web dictionary-spine cleanup ([#5482](https://github.com/Hmbown/CodeWhale/issues/5482), [#5337](https://github.com/Hmbown/CodeWhale/issues/5337), [#5290](https://github.com/Hmbown/CodeWhale/issues/5290)).

## Developer Pain Points

- **Flaky parallel CI**: Verifier background tests, `/workspace`-sensitive fixtures, and both-platform red runs remain recurring reliability issues ([#5056](https://github.com/Hmbown/CodeWhale/issues/5056), [#5355](https://github.com/Hmbown/CodeWhale/issues/5355), [#5403](https://github.com/Hmbown/CodeWhale/issues/5403)).
- **Config/platform fragmentation**: Config paths, fleet-agent shadowing, and model casing resolution keep causing silent misconfiguration ([#2369](https://github.com/Hmbown/CodeWhale/issues/2369), [#5098](https://github.com/Hmbown/CodeWhale/issues/5098), [#5475](https://github.com/Hmbown/CodeWhale/pull/5475)).
- **Session and IDE instability**: Large-task hangs, TUI crashes, VS Code crashes, and sandbox network blocks are the top user-facing blockers ([#1425](https://github.com/Hmbown/CodeWhale/issues/1425), [#5424](https://github.com/Hmbown/CodeWhale/issues/5424), [#1651](https://github.com/Hmbown/CodeWhale/issues/1651), [#1829](https://github.com/Hmbown/CodeWhale/issues/1829)).
- **Pricing/context trust issues**: Unverified live pricing, wrong completions URLs, hardcoded effort mappings, and the 128K/1M compression mismatch erode confidence in cost and context handling ([#5241](https://github.com/Hmbown/CodeWhale/issues/5241), [#4683](https://github.com/Hmbown/CodeWhale/issues/4683), [#5239](https://github.com/Hmbown/CodeWhale/issues/5239), [#5055](https://github.com/Hmbown/CodeWhale/issues/5055)).
- **Model-facing tool complexity**: Oversized schemas and capability mismatches are frequent sources of agent errors and blocked delegation ([#5324](https://github.com/Hmbown/CodeWhale/issues/5324), [#5123](https://github.com/Hmbown/CodeWhale/issues/5123)).

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*