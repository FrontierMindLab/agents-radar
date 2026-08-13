# AI CLI Tools Community Digest 2026-08-10

> Generated: 2026-08-10 04:40 UTC | Tools covered: 10

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
**Digest window: 2026-08-09 → 2026-08-10 (community GitHub activity)**

---

## 1. Ecosystem Overview

The AI CLI ecosystem is in a maintenance-and-harden phase: no major stable releases shipped in the 24-hour window, yet issue and PR activity across nine tools is dense and substantive. The dominant concerns are strikingly convergent — Windows reliability, MCP integration robustness, silent data loss, context/compaction transparency, and multi-agent orchestration appear in nearly every tracker. A clear maturity divide is emerging: Claude Code, OpenAI Codex, and Gemini CLI anchor community mindshare with large install bases, while Qwen Code and Pi are iterating fastest per-day, shipping real features. Grok Build reported zero activity, reinforcing that the field is consolidating around a handful of serious contenders.

---

## 2. Activity Comparison

| Tool | Issues (24h) | PRs (24h) | Release status |
|---|---|---|---|
| Claude Code | 50 items updated | 5 (community fixes) | No release |
| OpenAI Codex | 10 highlighted (dense queue) | 8 (7 closed, 1 open) | No release |
| Gemini CLI | 10 highlighted | 10 (incl. 74-package dep bump) | Nightly **v0.56.0** |
| GitHub Copilot CLI | 10 highlighted (new triage wave) | 0 | No release |
| Kimi Code | 2 | 1 | No release |
| OpenCode | 10 highlighted | 10 | No release |
| Pi (pi-mono) | 10+ highlighted | 10 | No release |
| Qwen Code | 10 highlighted | 10 | Nightly **v0.21.8** |
| DeepSeek TUI (CodeWhale) | 10 highlighted | 3 | **v0.9.6 RC prepared** |
| Grok Build | — | — | No activity |

> **Caveat:** Only Claude Code reports a total tracker count (50 updated). Other tools list their top-10 "hot issues," which is the highlighted subset, not total volume. Release status reflects the digest window only.

**Takeaways:** Claude Code leads on raw community engagement; Gemini and Qwen lead on shipping cadence (nightly releases plus feature PRs); Copilot CLI had zero PR activity despite a high-severity triage wave; Kimi's tracker is nearly quiet (2 issues); DeepSeek TUI is in release-hardening mode rather than feature development.

---

## 3. Shared Feature Directions

| Theme | Tools | Concrete signals |
|---|---|---|
| **Session portability & persistent history** | Claude Code, Codex, Kimi, Qwen | Resume conversations across directories (#28745, 76👍); session IDs in agents API (#85160); Desktop silently hiding conversations past recent-50 (#21128); tabbed/editor-tab chat UX (#12098, 60👍 / #20951, 37👍); Kimi Memory System request (#1283, 29 comments) |
| **Context-window correctness & compaction transparency** | DeepSeek TUI, Pi, Copilot, Claude | Compaction triggers at 128K despite 1M-context models (#5239); auto-compaction only fires at 373K overflow (#6879); `/compact` fails at 5MB payload, killing sessions (#4424); prompt-cache invalidation doubling costs (#83913) |
| **Multi-agent orchestration** | Gemini, Qwen, Codex, Copilot, Claude | "Agents can call agents" PR (#28738); RFC for native leader/worker session coordination (#8718) + inter-session messaging (#8733); MultiAgent V1/V2 metadata mismatch breaking `spawn_agent` (#35097, 50👍); subtask freezes in autopilot (#4306) |
| **Windows / terminal reliability** | Claude, Codex, Qwen, OpenCode, DeepSeek | Console flashing (#14828, 53 comments); mixed line endings (#4003, 74👍 — closed with fix); PowerShell installer failures (#7118); folder-picker restrictions (#6490); IME window jumps (#5023) |
| **MCP robustness** | Copilot, Claude, Qwen, Kimi | 60s fixed handshake timeout with no retry (#4421); fail-closed deny-all policy drops user MCP servers (#4419); optional MCP endpoint 404 kills the whole connection (#8784); Google GenAI rejects standard JSON Schema metadata (#739, open 6 months) |
| **No silent data loss / auditability** | Claude, Kimi, Copilot, Pi, Codex | Tool-call parser silently absorbs parameters (6.2% field loss, #84362); ACP wire log drops partial turns (#2598); Desktop retention sweeps delete transcripts (#81100); temp files never cleaned (#36428); crash-unsafe local state (#26990) |
| **Permission & safety control** | Gemini, DeepSeek, OpenCode, Claude | Subagents run despite being disabled (#22093); deny-by-default approval dialog breaks fast-confirm flows (#5293); Plan Mode modifies files anyway (#41476); fabricated conversation turns erode trust (#85286) |
| **Localization** | Claude, Copilot, DeepSeek | i18n feature request (#31413); Chinese (zh-CN) UI support (#4407); non-English IME input stability (#5023) — the non-English user base is visibly growing |

---

## 4. Differentiation Analysis

| Tool | Core identity | Target users | Technical emphasis |
|---|---|---|---|
| **Claude Code** | Enterprise-grade agent harness | Professional devs in orgs; hook/plugin-heavy automation | Conversation lifecycle, hook ecosystem, security guidance; data-durability anxiety is the loudest signal |
| **OpenAI Codex** | Model-centric (gpt-5.6 line) | OpenAI platform users; VS Code-centric teams | Model capability metadata accuracy, extension + Desktop UX; Windows and session-management gaps dominate |
| **Gemini CLI** | Agent-runtime reliability lab | Google ecosystem; agent-research-forward users | Hierarchical subagents, browser automation (puppeteer major bump), A2A SDK stabilization, memory transparency |
| **GitHub Copilot CLI** | Enterprise entitlement broker | GitHub-managed orgs; policy-constrained environments | Org/entitlement sync, remote sessions, MCP config policy; zero PR output suggests a release-train pause |
| **Kimi Code** | Lightweight, ACP-mode CLI | Moonshot API users; cost-conscious solo devs | Wire-log fidelity in ACP streaming; Google GenAI/MCP schema compatibility; a 6-month-open fix indicates slow iteration |
| **OpenCode** | Open-source, provider-agnostic | Multi-provider shops; tinkerers | Broad provider support, VS Code extension, TUI polish; many small correctness fixes flowing |
| **Pi (pi-mono)** | Local-model-first extensible agent | llama.cpp/local-model users; extension builders | Local model catalog caching, extension API surface, new remote-session wire protocol (CBOR) |
| **Qwen Code** | Multi-agent orchestrator | Alibaba Cloud / DashScope users; multi-agent early adopters | Native DashScope integration, name-based inter-session messaging, shared Chrome bridge, workflow-engine adoption |
| **DeepSeek TUI (CodeWhale)** | Long-horizon operator console | DeepSeek users; fleet/lane parallel workflows | Compaction survival contracts, Fleet worker visibility, subtractive runtime philosophy, config-layer transparency |

**Synthesis:** Claude Code and Codex compete on *workflow integration* (hooks, plugins, IDE parity); Gemini and Qwen are racing on *agent architecture* (recursive delegation, inter-session communication); Copilot is purely *enterprise policy plumbing*; the smaller tools differentiate on *local control and transparency* (Pi's local models, DeepSeek's compaction contract, OpenCode's provider neutrality).

---

## 5. Community Momentum & Maturity

- **Highest raw engagement:** Claude Code (50 tracker updates/day) and Codex (dense PR queue, long-standing Windows bug #4003 finally closed). However, Claude shows **maintainer latency** — the 8-month-old Windows console-flash bug (#14828) remains unaddressed and is the most-commented open issue.
- **Fastest iteration:** Qwen Code (nightly with real features — Qoder plugin support, DashScope integration, multi-agent messaging) and Gemini CLI (10 PRs including a 74-package dependency refresh, agents-call-agents, SDK major bumps). Both are shipping architectural work, not just fixes.
- **Strong maintenance discipline:** Pi batch-closed a large backlog of previously untriaged issues and landed 10 targeted fixes, signaling an active maintainer pass. DeepSeek TUI closed a v0.9.2–v0.9.3 refactor batch and prepared v0.9.6 — architectural cleanup over new features.
- **Enterprise attention but stalled output:** Copilot CLI generated a high-severity triage wave (entitlement, MCP, session-death bugs) but shipped zero PRs — a likely release-cycle pause, not disengagement.
- **Emerging communities:** OpenCode sustains a healthy community PR flow (10 fixes, many TUI/UX). Kimi is the quietest tracker (2 issues, 1 PR); Grok Build is dormant.

**Maturity ranking (community, not product):** Claude Code ≈ Codex ≈ Gemini CLI > Qwen Code > Pi ≈ OpenCode ≈ Copilot CLI > DeepSeek TUI > Kimi Code > Grok Build.

---

## 6. Trend Signals

1. **Silent data loss is the #1 trust killer across the industry.** From Claude's 6.2% tool-call parameter absorption and Desktop transcript deletion, to Kimi's dropped wire-log records, to Copilot's un-rescuable `/compact`, users are demanding auditability: durable session IDs, wire-log guarantees, documented "survival contracts" for compaction, and crash-safe local state.

2. **Context management is becoming a first-class product surface.** The 128K-vs-1M compaction surprise (DeepSeek), invisible compaction gains, prompt-cache cost invalidation (Claude), and cache-control breakpoint interest (Copilot) all point to one conclusion: users want to *see and control* what survives in context, and know what it costs.

3. **Multi-agent is moving from demos to orchestration primitives.** Leader/worker RFCs (Qwen), recursive delegation (Gemini), inter-session messaging, and shared browser bridges are landing now. The immediate blocker is **model-capability metadata accuracy** — context windows, MultiAgent versions, tool counts — because wrong metadata silently breaks orchestration.

4. **MCP adoption is outpacing MCP reliability.** Every tool with MCP support has a handshake-timeout, fail-closed-policy, or schema-interop failure this week. Expect client-side resilience standards (retries, optional-endpoint tolerance, metadata stripping) to become a competitive differentiator.

5. **Windows remains the weakest platform for every tool.** Console flashing, HVCI/Code Integrity blocks, mixed line endings, PowerShell installer failures, and IME freezes recur across trackers. For enterprise adoption, fixing Windows is now higher-leverage than adding features.

6. **Opacity is being reframed as a bug.** Users are formally requesting that tools be self-describing: session IDs, config-layer precedence visualization, permission-dialog defaults, subagent identity consistency, and tool telemetry that distinguishes "success" from "hit the turn limit and stopped." The Gemini false-success reporting (#22323) and DeepSeek fake-success edit (#5209) are the clearest signals.

7. **Cost transparency is a growing demand.** Background workflows continuing past quota warnings (Claude), prompt-cache invalidation doubling spend, per-model 429s without backoff (Copilot), and AI21 API retirement breaking providers (Pi) show users want predictable economics and visible failure modes.

---

*For technical decision-makers: if you are standardizing on one tool, prioritize those with demonstrable fix velocity (Gemini, Qwen, Pi) for agentic workloads, and weigh the Windows/maturity trade-offs of the big three carefully. If building tooling *for* this ecosystem, the highest-opportunity niches are MCP resilience tooling, context/compaction observability, and cross-tool session-portability formats.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

# Claude Code Community Digest — 2026-08-10

## Today's Highlights
No releases landed in the last 24 hours, but the issue tracker saw heavy activity with 50 items updated. Community attention is split between the long-running Windows console-flashing bug ([#14828](https://github.com/anthropics/claude-code/issues/14828), 53 comments) and the most-upvoted open request overall: resuming conversations from different directories ([#28745](https://github.com/anthropics/claude-code/issues/28745), 76 👍). A new theme is crystallizing around **data durability** — silent field loss in the tool-call parser and desktop retention sweeps deleting transcripts are both drawing scrutiny.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[Windows: Console window flashing when executing tools](https://github.com/anthropics/claude-code/issues/14828)** — The most-commented open issue (53 comments, 36 👍). A long-standing Windows UX bug where a console window flashes on every tool execution. Community has provided repros; still unaddressed after ~8 months.

2. **[Allow resuming conversations from different directories](https://github.com/anthropics/claude-code/issues/28745)** — The most-upvoted open issue (76 👍). Conversations are bound to the directory where they started; deleted or moved worktrees make them unresumable. Strong demand for a `--resume` path that is cwd-independent.

3. **[UI language localization support](https://github.com/anthropics/claude-code/issues/31413)** — Feature request for i18n (13 comments, 8 👍). Reflects a growing non-English user base; no official response yet.

4. **[Workflow tool delivers JSON args as string instead of parsed object](https://github.com/anthropics/claude-code/issues/72248)** — On macOS, object/array args arrive as a JSON-encoded string, contradicting the documented "verbatim" contract and breaking programmatic workflow scripts.

5. **[Windows: hidden Browser-pane preview kills the app via Code Integrity block on vk_swiftshader.dll](https://github.com/anthropics/claude-code/issues/80999)** — Packaged `vk_swiftshader.dll` triggers HVCI/Code Integrity blocks on corporate-managed Windows devices, crashing the app and forcing a "Repair" dialog. An enterprise adoption blocker.

6. **[Background tasks SIGTERMed on an exact 30-minute internal timer](https://github.com/anthropics/claude-code/issues/84981)** — Long-lived macOS CLI sessions have background Bash tasks killed at precisely 1800.000s intervals (exit 144) with no TaskStopped event. Undocumented kill path undermines long-running agentic automation.

7. **[Tag-grammar tool-call parser silently absorbs parameter blocks on mangled close tags](https://github.com/anthropics/claude-code/issues/84362)** — Measured 6.2% silent field loss on parameter-rich MCP calls. When the model emits a mismatched close tag, victim parameters never bind and the call *succeeds with silent data loss*.

8. **[Prompt cache invalidated when PreToolUse/PostToolUse additionalContext changes during history rebuild](https://github.com/anthropics/claude-code/issues/83913)** — Hook-provided context is rewritten when rebuilding conversation history, forcing cache misses on ordinary prompts and doubling cost for hook-heavy setups.

9. **[Session limit warning not surfaced to agent; background workflows continue consuming quota](https://github.com/anthropics/claude-code/issues/77582)** — With 14-subagent workflows, the quota warning is not actionable by the agent, so background work silently keeps burning credits after the threshold.

10. **[Desktop app: 30-day retention sweep deletes the only copy of Desktop transcripts](https://github.com/anthropics/claude-code/issues/81100)** — A retention sweep removes transcript data while leaving unopenable ghost entries in the session list. Filed as distinct from CLI data-loss issue [#59248](https://github.com/anthropics/claude-code/issues/59248).

## Key PR Progress
Only five PRs were updated in the window; all are small, community-driven fixes rather than core-engine changes.

1. **[security-guidance: update default model refs from Opus 4.7/Sonnet 4.6 to Opus 5/Sonnet 5](https://github.com/anthropics/claude-code/pull/85409)** (open) — Brings the security-guidance plugin's README and `llm.py` review-model defaults in line with the current model lineup.

2. **[fix(plugin-dev): parse block scalar agent descriptions](https://github.com/anthropics/claude-code/pull/85323)** (open) — Fixes the remaining YAML block-scalar parsing defect from [#83803](https://github.com/anthropics/claude-code/issues/83803); `validate-agent.sh` now measures multiline `description: |` / `description: >` values correctly.

3. **[fix(skills): use spec-conformant names in the plugin-dev and hookify skills](https://github.com/anthropics/claude-code/pull/85243)** (open) — Corrects eight bundled skills that declare title-cased `name:` values containing spaces, which violates the skills spec.

4. **[docs: enforce task tool and model metadata](https://github.com/anthropics/claude-code/pull/9262)** (closed) — Documentation-only PR requiring the Task tool across commit workflows and documenting the `model` parameter for `claude-3-5-haiku-latest`.

5. **[Add `agent-session-commit` plugin to incrementally iterate on AGENTS.md](https://github.com/anthropics/claude-code/pull/17395)** (closed) — Adds a `/session-commit` plugin with a Stop hook that prompts for incremental `AGENTS.md` updates, plus a minimal `CLAUDE.md` pointer.

## Feature Request Trends
- **Conversation lifecycle & identity**: resuming across directories ([#28745](https://github.com/anthropics/claude-code/issues/28745)), fixing broken VS Code fork behavior ([#85008](https://github.com/anthropics/claude-code/issues/85008)), exposing session IDs in the agents API ([#85160](https://github.com/anthropics/claude-code/issues/85160)), and disambiguating untitled Desktop sessions ([#85431](https://github.com/anthropics/claude-code/issues/85431)) all point to a desire for first-class conversation portability and stable identifiers.
- **Localization** ([#31413](https://github.com/anthropics/claude-code/issues/31413)) is the clearest i18n signal, with moderate but steady support.
- **Composable slash commands** ([#85429](https://github.com/anthropics/claude-code/issues/85429)): users want custom commands to invoke built-ins like `/clear` and `/compact`.
- **Pinned-session protection** ([#62104](https://github.com/anthropics/claude-code/issues/62104), closed): users want archive/delete blocked for pinned Desktop sessions.

## Developer Pain Points
- **Windows reliability** remains the top platform complaint: console flashing ([#14828](https://github.com/anthropics/claude-code/issues/14828)), Code Integrity crashes ([#80999](https://github.com/anthropics/claude-code/issues/80999)), MSIX package wedging that destroys local data on recovery ([#81306](https://github.com/anthropics/claude-code/issues/81306)), and IME input freezes ([#83762](https://github.com/anthropics/claude-code/issues/83762)).
- **Data loss is a recurring theme**: retention sweeps deleting the only desktop transcript copy ([#81100](https://github.com/anthropics/claude-code/issues/81100)), silent field absorption in the tool-call parser ([#84362](https://github.com/anthropics/claude-code/issues/84362)), and destructive archival of pinned sessions ([#62104](https://github.com/anthropics/claude-code/issues/62104)).
- **Cost and quota surprises**: prompt-cache invalidation from hook context changes ([#83913](https://github.com/anthropics/claude-code/issues/83913)) and background workflows continuing past quota warnings ([#77582](https://github.com/anthropics/claude-code/issues/77582)) both burn money silently.
- **Lost control over background work**: the undocumented 30-minute SIGTERM on background tasks ([#84981](https://github.com/anthropics/claude-code/issues/84981)) breaks long-running workflows without any event surface.
- **Terminal UX friction**: copying wrapped output inserts hard line breaks ([#48037](https://github.com/anthropics/claude-code/issues/48037), 16 👍) and fullscreen mode degrades VS Code integrated terminal latency ([#84712](https://github.com/anthropics/claude-code/issues/84712)).
- **Trust in prompt assembly**: fabricated conversation turns and role markers ([#85286](https://github.com/anthropics/claude-code/issues/85286)) and spurious "Exited Plan Mode"/"Auto Mode Active" notifications ([#80818](https://github.com/anthropics/claude-code/issues/80818)) are eroding confidence in the harness layer.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-10

## 1. Today's Highlights

No releases shipped in the last 24 hours, but the PR queue is unusually dense with Windows-focused fixes: a new opt-in line-ending preservation mode for `apply_patch` (#37757, #37758) directly targets the long-running Windows mixed-line-endings bug (#4003, 74 👍). Meanwhile, the community is most vocal about session management — Codex Desktop silently dropping older project conversations (#21128, 34 comments) and the repeated demand for a tabbed/editor-tab chat UI (#12098, #20951) signal a growing trust gap in the Desktop app as working memory.

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#21128 — Codex Desktop silently hides project conversations outside the global recent-50 window](https://github.com/openai/codex/issues/21128)** · 34 comments · 21 👍
   The most-discussed issue today. Users rely on the Desktop app as project memory, and older conversations simply disappear from the UI once they fall out of the recent-50 list. Not just cosmetic — it makes the app unreliable for real multi-week work. High emotional engagement; expect pressure for searchable/persistent session history.

2. **[#4003 — Patched files have mixed line endings on Windows](https://github.com/openai/codex/issues/4003)** · 33 comments · 74 👍 · CLOSED
   The all-time high-reaction Windows bug: Codex rewrites CRLF files to mixed endings. Closed today in conjunction with the `apply_patch` line-ending preservation PRs — a rare case of a long-standing issue getting a concrete fix in the same digest window.

3. **[#37458 — Codex extension fails to start: "The extension couldn't load its resources"](https://github.com/openai/codex/issues/37458)** · 26 comments
   Fresh Windows + VS Code 1.132 failure where the Codex panel fully refuses to start. Broad impact (0 👍 but many comments suggests many affected users piling on); likely packaging/path regression in the extension.

4. **[#12098 — Tabbed interface for parallel chat sessions in the extension](https://github.com/openai/codex/issues/12098)** · 22 comments · 60 👍
   The most-upvoted open feature request. Switching chats requires open-list → search → click; a tabbed UI would match Claude Code and Cursor workflows. Combined with #20951, the message is clear: the extension's session UX is the top complaint.

5. **[#11011 — Switching between threads is very slow](https://github.com/openai/codex/issues/11011)** · 22 comments · 19 👍
   Desktop thread switching became sluggish after a recent update. Complements the "hidden conversations" issue — session management is both slow and lossy right now.

6. **[#35097 — gpt-5.6-luna is marked MultiAgent V1, so V2 spawn_agent rejects it](https://github.com/openai/codex/issues/35097)** · 20 comments · 50 👍
   Model capability metadata mismatch: `gpt-5.6-luna` is tagged as MultiAgent V1, so V2's `spawn_agent` refuses it, breaking subagent orchestration for CLI users on `gpt-5.6-sol`. High 👍 because it blocks an entire advanced workflow.

7. **[#20951 — Support opening Codex sessions as full editor tabs](https://github.com/openai/codex/issues/20951)** · 14 comments · 37 👍
   Companion to #12098: users want sessions as first-class VS Code tabs like Claude Code, not a fixed panel. A recurring theme that OpenAI has not yet publicly committed to.

8. **[#37013 — Windows Computer Use reuses a stale node_repl exec context across JS calls](https://github.com/openai/codex/issues/37013)** · 12 comments · 4 👍
   On Windows Desktop, Computer Use works only for the first JS execution; subsequent `@oai/sky` calls fail with a stale context. Paired with #37180 (approval prompt never appears), Windows Computer Use is in rough shape this week.

9. **[#26990 — Windows Desktop local state is not crash-safe after power loss](https://github.com/openai/codex/issues/26990)** · 12 comments
   Pins, projects, and config regress (even "future timestamps") after power loss. Data-integrity report; no reactions yet, but a serious reliability flag for Windows users.

10. **[#32192 — ChatGPT desktop app OOMs on every launch](https://github.com/openai/codex/issues/32192)** · 7 comments
    Reproducible out-of-memory on launch even with a fresh install and offline state, macOS arm64. Small comment count, but OOM-on-launch is the kind of bug that stalls entire teams.

**Also notable:** #37398 (5-second owner-discovery timeout before opening unloaded chats), #35490 (Realtime V3 sideband blocked by Cloudflare → 403), #36428 (temp files never cleaned up in `/tmp`), and #37473 (false-positive cyber_policy interrupt on benign orchestration).

## 4. Key PR Progress

1. **[#37757 — Add a line-ending preservation mode to `apply_patch`](https://github.com/openai/codex/pull/37757)** · CLOSED
   Opt-in `PreserveLineEndings` update mode threaded through patch handling — fixes normalization-to-LF outside the requested change. Directly addresses #4003.

2. **[#37758 — Add a feature flag to preserve apply_patch line endings](https://github.com/openai/codex/pull/37758)** · CLOSED
   `apply_patch_preserve_line_endings` flag (disabled by default) applied consistently to built-in patch handling and patch files. Complements #37757; lets teams roll out the behavior safely.

3. **[#37773 — Forward install attempt IDs for remote plugins](https://github.com/openai/codex/pull/37773)** · CLOSED
   Adds optional `installAttemptId` to `PluginInstallParams` and forwards it as `install_attempt_id` remotely — enables correlating install requests with attempts on the client side.

4. **[#37747 — Bound Cursor project path resolution](https://github.com/openai/codex/pull/37747)** · CLOSED
   Fixes a performance hazard where resolving the working directory encoded in a Cursor project name could recursively scan large trees; now probes a bounded set of candidates.

5. **[#37745 — Add gRPC TCP transport to the code-mode host](https://github.com/openai/codex/pull/37745)** · CLOSED
   Supports `grpc://IP:PORT` via `--listen`, prints the bound HTTP endpoint for port-0 discovery, and applies protocol-aware paths — useful for remote/networked code-mode setups.

6. **[#37723 — Report I/O subtypes for session config import failures](https://github.com/openai/codex/pull/37723)** · CLOSED
   Appends stable `std::io::ErrorKind` categories (`invalid_data`, `not_found`, `permission_denied`) to `failed_to_load_session_config` for more diagnosable config errors.

7. **[#37709 — Keep wrapped composer whitespace with following text](https://github.com/openai/codex/pull/37709)** · CLOSED
   Grapheme-safe, composer-specific wrapping so overflowing whitespace in the TUI composer doesn't get orphaned onto a separate blank row.

8. **[#31817 — Update models.json](https://github.com/openai/codex/pull/31817)** · OPEN
   Automated model registry refresh; routine but needed to keep new models like `gpt-5.6-luna` metadata current (relevant to #35097).

## 5. Feature Request Trends

- **First-class session/chat management (dominant).** Tabbed interfaces for parallel sessions (#12098, 60 👍), opening sessions as full VS Code editor tabs (#20951, 37 👍), and — implicitly — persistent, searchable conversation history (#21128). Users consistently compare against Claude Code's workspace model.
- **Line-ending and file-format fidelity on Windows.** The #4003 saga (73 👍) shows users want apply_patch to respect existing file conventions. Now landing as opt-in flags rather than default behavior.
- **Better subagent/model capability signaling.** #35097 (50 👍) asks that model metadata (MultiAgent V1 vs V2) stay accurate so advanced orchestration doesn't silently break.
- **Resource hygiene.** #36428 requests temp-file cleanup in `/tmp` when the Codex process exits; tmpfs memory pressure is a real pain for long-running CLI users.
- **Reliable remote pairing/connectivity.** #37698, #35490 — remote-control pairing timeouts and Cloudflare-blocked sidebands are eroding trust in the remote workflow.

## 6. Developer Pain Points

- **Windows remains the weakest platform.** Mixed line endings (#4003), sandbox ACL repair hangs (#34889), `CreateProcessAsUserW` failures (#26803), Computer Use context/approval bugs (#37013, #37180), extension resource loading (#37458), and crash-unsafe local state (#26990) — seven distinct Windows issues in the top 30 alone.
- **Desktop app reliability is undermining confidence.** Hidden conversations (#21128), slow thread switching (#11011), 5-second owner-discovery delays (#37398), OOM-on-launch (#32192) — users are hesitant to trust the app as working memory for real projects.
- **Session UX friction.** The combination of slow switching, no tabs, and disappearing history means multi-session workflows are painful — hence the unusually high 👍 counts on #12098 and #20951.
- **False-positive safety/sandbox interruptions.** #37473 (cyber_policy false positive on benign orchestration) and #35097 (model capability mismatch rejecting spawn_agent) are both "the tool blocked me for the wrong reason" complaints that erode automation trust.
- **Source-build friction for contributors.** #36698 documents a broken documented source build on macOS arm64 (missing V8 asset, unbuilt `codex-code-mode-host`) — worth watching as an open-source health signal.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-10

## 1. Today's Highlights

Agent reliability remains the dominant community concern, with ongoing reports of subagent hangs, false success reporting after MAX_TURNS interruptions, and permission bypasses. On the development side, the project shipped nightly `v0.56.0-nightly.20260810`, opened a major "agents can call agents" PR, and merged a large batch of dependency updates—including a 74-package npm group bump.

## 2. Releases

**v0.56.0-nightly.20260810.gcf22ac7e8** — Standard nightly release; no user-facing changes documented beyond the version bump.  
[Release](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)

## 3. Hot Issues

1. **[#22323] Subagent recovery after MAX_TURNS reported as GOAL success** — `codebase_investigator` reports `status: "success"` even when it hit the turn limit before doing any analysis. This masks real failures and undermines trust in agent telemetry (12 comments).  
2. **[#21409] Generalist agent hangs** — Simple operations like folder creation hang indefinitely when deferred to the generalist agent; disabling subagents is the only workaround. Most-upvoted issue today with 8 👍.  
3. **[#25166] Shell command stuck at "Waiting input" after completion** — Executed CLI commands remain in a hung "Awaiting user input" state despite finishing. Community-reported with 3 👍.  
4. **[#22093] Subagents running without permission since v0.33.0** — Agents execute even when explicitly disabled in all configurations; a serious control regression for users relying on MCP-only mode.  
5. **[#26525] Add deterministic redaction and reduce Auto Memory logging** — Auto Memory sends transcript content to the model before prompt-based redaction occurs; also risks logging existing skills. Security-adjacent concern with 4 comments.  
6. **[#22267] Browser Agent ignores settings.json overrides** — `maxTurns` and other overrides merged by `AgentRegistry` are not applied to the browser subagent.  
7. **[#21983] Browser subagent fails in Wayland** — Browser agent terminates with `Termination Reason: GOAL` on Wayland sessions; Linux desktop users affected.  
8. **[#24246] 400 error with > 128 tools** — The CLI hits API errors when tool counts grow large; community expects smarter tool-scoping rather than hard failures.  
9. **[#21968] Gemini doesn't use skills and sub-agents enough** — Anecdotal but recurring: custom skills and subagents are ignored unless explicitly instructed, even for highly relevant tasks like gradle/git workflows.  
10. **[#24935] Terminal corruption after exiting external editors** — terminalBuffer mode leaves the screen corrupted; requires forced full-screen refresh after editor exit.

## 4. Key PR Progress

1. **[#28738] Allow agents to call agents** — Lets subagents delegate to other subagents or recurse via `tools:` frontmatter. Addresses #22092 and unlocks hierarchical agent architectures. Notable open PR to watch.  
2. **[#28744] fix(acp): don't start a fresh chat before resuming** — `loadSession` was calling `initialize()` before `resumeChat()`, poisoning the session file. Fixes #28693.  
3. **[#28624] Prevent boolean thought parts leaking as `[Thought: true]` text** — Fixes #23525; filters internal boolean `thought` fields from text representation of model thoughts.  
4. **[#28743] Preserve resolved model config systemInstruction and tools** — Prevents chat-level overrides from clobbering model-specific `GenerateContentConfig` values.  
5. **[#28746] Bump npm-dependencies group with 74 updates** — Large grouped refresh covering `simple-git`, `@modelcontextprotocol/sdk`, and dozens more. Closed and merged.  
6. **[#28752] Bump puppeteer-core 24.0.0 → 25.4.0** — Major version bump for the browser automation layer; relevant to ongoing browser agent stability work.  
7. **[#28749] Bump @google/genai 1.30.0 → 2.15.0** — Significant SDK bump; watch for breaking changes in agent tooling.  
8. **[#28747] Bump @a2a-js/sdk 0.3.11 → 1.0.1** — First stable release of the A2A SDK; signals maturation of agent-to-agent protocol integration.  
9. **[#28758] chore/release: bump version to 0.56.0-nightly.20260810** — Automated nightly version bump.  
10. **[#28450] Bump actions-dependencies group** — CI/CD dependency refresh including `lychee-action` and `run-gemini-cli` (open).

## 5. Feature Request Trends

- **Hierarchical multi-agent systems** — The "agents can call agents" PR and related issues signal strong demand for recursive delegation and nested subagent workflows.
- **AST-aware code tools** — Epic #22745 and follow-up #22746 propose AST-based file reads, method-bound extraction, and codebase mapping to reduce token noise and misaligned reads.
- **Subagent observability** — Repeated asks (#22598, #21763) for subagent trajectories to be visible in `/chat share` and included in `/bug` reports.
- **Agent self-awareness** — #21432 requests the agent understand its own CLI flags, hotkeys, and self-execution mechanics to act as its own expert guide.
- **Safer execution & sandboxing** — Proposals for zero-dependency OS sandboxing (#19873) and discouraging destructive git/DB commands (#22672).

## 6. Developer Pain Points

- **False success signals** — MAX_TURNS interruptions reported as GOAL success erode trust in automation outcomes.
- **Hangs they can't explain** — Generalist agent hangs and post-command "Waiting input" states force users to cancel and retry, sometimes after hours.
- **Loss of control** — Subagents executing when disabled (#22093) and browser agent ignoring `settings.json` overrides make configuration feel unreliable.
- **Browser agent fragility** — Wayland failures, locked-profile fail-fast behavior, and missing override support create a bumpy experience across Linux and persistent-session workflows.
- **Memory system opacity** — Auto Memory's silent retries of low-signal sessions, unredacted content handling, and dropped invalid patches (#26516, #26522, #26523, #26525) raise trust and privacy concerns.
- **Scale limits** — Hard 400-tool errors and scattered tmp-script generation indicate the model needs better tool-scoping and workspace hygiene.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-10

## Today's Highlights

A wave of triage-labeled issues filed over the past 24 hours exposes systemic reliability problems in MCP initialization, parallel tool execution, and session recovery. Most critically, a session that hits the 5 MB CAPI payload limit can no longer be rescued with `/compact` ([#4424](https://github.com/github/copilot-cli/issues/4424)), and multiple Enterprise users report Claude models vanishing from the CLI model picker overnight despite being enabled in GitHub settings ([#4422](https://github.com/github/copilot-cli/issues/4422), [#4390](https://github.com/github/copilot-cli/issues/4390)). No releases or pull requests landed in the last 24 hours.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#4424 — `/compact` cannot recover a session after the CAPI Responses payload reaches the 5 MB limit](https://github.com/github/copilot-cli/issues/4424)** — When the 5 MB request limit is hit, normal prompts fail as expected, but `/compact` also fails, leaving users with no way to reduce context and killing the session outright. Filed with zero comments but arguably the highest-severity bug of the day.

2. **[#4422 — All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)** — A sudden regression (worked yesterday) where every Claude model reports "This model is disabled..." for a personal Enterprise account despite appearing enabled in Copilot settings. Persists across CLI version rollbacks, pointing to an entitlement/back-end change rather than a client bug.

3. **[#4390 — Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)** — Claude Sonnet 5/Opus 5 and Kimi K3 explicitly enabled by a Copilot Business org are absent from the effective model catalogue. Likely a root cause related to #4422; maintainer attention is already evident.

4. **[#1857 — Allow users to cancel or remove enqueued messages before execution](https://github.com/github/copilot-cli/issues/1857)** — The most-thumbed open issue (26 👍, 9 comments). Once a message is queued via `Ctrl+Q`/`Ctrl+Enter`, there is no way to cancel it while the agent is busy or during `/compact`. Long-standing (since March) but still unaddressed.

5. **[#2751 — `/remote` fails on organization repos](https://github.com/github/copilot-cli/issues/2751)** — `Remote session disabled: could not resolve repository` for GitHub-owned org repos in v1.0.28. 13 👍 and 8 comments indicate this is a significant blocker for Enterprise use of remote sessions.

6. **[#4421 — MCP initialize handshake has a fixed 60s budget with no retry](https://github.com/github/copilot-cli/issues/4421)** — A hard-coded 60,000 ms timeout with no backoff means npx-launched stdio MCP servers fail ~29% of sessions and are never respawned for the life of the session. No configuration escape hatch exists.

7. **[#4419 — Interim fail-closed MCP policy permanently drops user MCP servers](https://github.com/github/copilot-cli/issues/4419)** — While managed settings resolve, the CLI installs a "deny everything" policy (`managedAllowedMcpServerLists: [[]]`). Any user-configured MCP server registering during that window is rejected for the entire session — reproduces even on accounts with no managed policy.

8. **[#4420 — Parallel tool calling returns responses in non-deterministic order](https://github.com/github/copilot-cli/issues/4420)** — The harness loses request/response correlation for parallel tool calls, returning responses without the original request or reordering them, which leads to confused agent behavior.

9. **[#4416 — Parallel explore subagent fan-out dies to per-model 429s](https://github.com/github/copilot-cli/issues/4416)** — All `explore` subagents default to the same lightweight model bucket (claude-haiku-4.5), which has a tighter burst limit. Fan-out triggers 429s with no backoff and no automatic model switching despite `eligibleForAutoSwitch`.

10. **[#4306 — Subtasks freeze and stop responding in autopilot mode](https://github.com/github/copilot-cli/issues/4306)** — In `autopilot` with `/fleet`-style agent loops, subtasks intermittently freeze mid-session. A core agent-reliability issue that undermines unattended automation.

## Key PR Progress

No pull requests were updated in the last 24 hours.

## Feature Request Trends

- **Input queue control** — The ability to cancel or remove enqueued messages before execution remains the single most requested UX improvement ([#1857](https://github.com/github/copilot-cli/issues/1857)).
- **Remote session generalization** — Users want `/remote` to work in non-GitHub-hosted repositories (GitLab, Bitbucket), decoupling session control from the git host ([#2922](https://github.com/github/copilot-cli/issues/2922)).
- **UI/HUD configurability** — Requests for a configurable heads-up display ([#4418](https://github.com/github/copilot-cli/issues/4418)) and a built-in GUI prompt composer with better accessibility ([#4417](https://github.com/github/copilot-cli/issues/4417)).
- **Localization** — First localization request: Chinese (zh-CN) UI support for the desktop app and CLI integration ([#4407](https://github.com/github/copilot-cli/issues/4407)).
- **Model/auto-mode tuning** — Users want configurable model strength ranges, minimums, maximums, and bias for Auto-mode ([#4412](https://github.com/github/copilot-cli/issues/4412)).
- **Cost optimization** — Interest in Anthropic `cache_control` breakpoints to reuse expensive repeated context ([#4256](https://github.com/github/copilot-cli/issues/4256), closed but indicative of broader demand).

## Developer Pain Points

- **Enterprise entitlement/org configuration mismatch** — Models enabled in org settings missing from the CLI catalogue ([#4390](https://github.com/github/copilot-cli/issues/4390)), Claude models blocked with no client-side explanation ([#4422](https://github.com/github/copilot-cli/issues/4422)), `/remote` failing on org repos ([#2751](https://github.com/github/copilot-cli/issues/2751)), and an inert `cli_remote_control_enabled` setting that fails opaquely ([#4409](https://github.com/github/copilot-cli/issues/4409)).
- **MCP reliability is a systemic problem** — Hard-coded timeouts with no retry ([#4421](https://github.com/github/copilot-cli/issues/4421)), interim deny-all policies dropping user servers ([#4419](https://github.com/github/copilot-cli/issues/4419)), FastMCP `server/discover` incompatibility ([#4370](https://github.com/github/copilot-cli/issues/4370)), and OAuth 3LO/metadata failures ([#4371](https://github.com/github/copilot-cli/issues/4371), [#4408](https://github.com/github/copilot-cli/issues/4408)).
- **Session and prompt data loss** — `/compact` fails at the payload limit ([#4424](https://github.com/github/copilot-cli/issues/4424)), kickoff prompts silently dropped when creating sessions from the app ([#4423](https://github.com/github/copilot-cli/issues/4423)), and subtasks freezing in autopilot ([#4306](https://github.com/github/copilot-cli/issues/4306)).
- **Concurrency and rate-limiting fragility** — Non-deterministic response ordering for parallel tool calls ([#4420](https://github.com/github/copilot-cli/issues/4420)) and per-model 429s with no backoff when fanning out subagents ([#4416](https://github.com/github/copilot-cli/issues/4416)).
- **BYOK and local 403s** — Custom OpenAI/Anthropic-compatible providers fail with local 403 before any request reaches the provider; `/login` does not resolve it ([#4414](https://github.com/github/copilot-cli/issues/4414)).
- **Warm resume cross-wire-format bugs** — `session.resume` replays provider-specific reasoning metadata across wire formats, breaking sessions ([#4413](https://github.com/github/copilot-cli/issues/4413)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-10

## Today's Highlights

No new releases shipped in the last 24 hours. The most significant activity is a newly reported **ACP-mode streaming hang** (#2598) that silently drops wire logs, alongside continued momentum on the long-running **Memory System** request (#1283), which has accumulated 29 comments over six months. The Google GenAI/MCP tool compatibility fix (#739) remains open after more than six months — a notable blocker for MCP users on that provider.

> Note: Only 2 issues and 1 PR were updated in the last 24h window; all are covered below.

---

## Releases

No new versions were published in the last 24 hours.

---

## Hot Issues

### #2598 — ACP/print streaming response hangs silently: no idle timeout, replaced turn partial not persisted to wire (0.34.0)
- **Author:** ai-agent-workbench | **Open since:** 2026-08-09 | **Comments:** 0
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/2598

**What it is:** In ACP mode (`kimi acp`), streaming conversations with api.kimi.com intermittently **hang after all content deltas have arrived** — the terminal frame (`[DONE]`/finish) never comes, with no error and no timeout. The CLI has no streaming idle-timeout configuration (confirmed in the official `config.toml` docs), so `session/prompt` waits indefinitely. Sending a follow-up message silently replaces the hung turn, and the already-streamed reply is **never written to `wire.jsonl`** (no `content.part`, no `usage.record`). The prior fix in 0.31.1 only covered the Esc-key scenario.

**Why it matters:** This combines two severe problems — a silent hang with no configurable escape hatch, and **silent data loss** in the wire log, which breaks billing/debugging/compliance traceability. The lack of an idle-timeout knob makes it unrecoverable without a workaround. Zero comments so far; the community will likely weigh in with reproductions. This deserves prompt maintainer attention.

---

### #1283 [Enhancement] Feature Request: Memory System — Persistent context across sessions
- **Author:** CatKang | **Open since:** 2026-02-27 | **Comments:** 29 | 👍: 0
- **Link:** https://github.com/MoonshotAI/kimi-cli/issues/1283

**What it is:** Requests a comprehensive **Memory System** so Kimi Code CLI can retain useful context, project patterns, and user preferences across sessions — combining **automatic memory** (AI-managed notes) and **manual memory** (user-defined instructions via configuration).

**Why it matters:** The issue has been actively discussed for over five months (last updated today), making it one of the most durable feature requests in the project. Persistent context is the key differentiator between a stateless CLI wrapper and a true long-horizon coding agent. The 29-comment thread signals real community demand, even though it carries no upvote count yet. If implemented, this would also address many recurring "CLI forgets my setup" friction points.

---

## Key PR Progress

### #739 [fix(kosong)] strip JSON Schema metadata from Google GenAI tool parameters
- **Author:** xiaoju111a | **Opened:** 2026-01-28 | **Updated:** 2026-08-09 | **Status:** Open
- **Link:** https://github.com/MoonshotAI/kimi-cli/pull/739

**What it does:** Fixes compatibility between the **Google GenAI provider** and MCP tools that include standard JSON Schema metadata fields. Resolves #734, where MCP tools (e.g., Exa MCP) triggered provider-side validation errors because Google GenAI rejects standard JSON Schema keywords that the tool schemas carry.

**Status / why it matters:** The fix itself is a small, well-scoped strip of JSON Schema metadata before forwarding tool parameters. However, the PR has been open for over **six months** (since January), during which the ecosystem has moved — this is a growing pain point as MCP tool adoption spreads. If you use Google GenAI with MCP servers, this PR is worth tracking; consider testing the branch or commenting to push it toward merge.

---

## Feature Request Trends

Based on all issues active in the last 24h:

1. **Persistent memory & cross-session context** — #1283 is the clearest signal. The community wants the CLI to remember project patterns, user prefs, and AI-managed notes between sessions, both automatically and with manual user control.
2. **Streaming robustness & observability controls** — #2598 implicitly demands: configurable idle timeouts, guaranteed wire-log writes (partial turns persisted even on interruption/replacement), and better end-of-stream signaling. Expect follow-up requests for explicit timeout/`max-wait` config options in `config.toml`.

---

## Developer Pain Points

- **Silent hangs with no escape hatch:** The ACP streaming hang (#2598) highlights a recurring frustration — no idle-timeout knob exists, so a stuck session cannot self-recover and must be manually replaced.
- **Silent data loss in logs:** When a turn is replaced, the already-received partial content is dropped from `wire.jsonl` (missing `content.part`/`usage.record`). For developers relying on wire logs for cost tracking or debugging, this is a correctness bug, not just an inconvenience.
- **MCP + provider schema friction:** The still-open #739 shows that MCP tools with standard JSON Schema metadata break against the Google GenAI provider — providers' strict schema validation is an ongoing source of integration pain.
- **Slow-moving fixes:** A six-month-old, ready-to-land PR (#739) and a 0.31.1 fix that only covered the Esc case (#2598) suggest the community wants faster iteration on provider compatibility and streaming reliability.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-10

**Today’s Highlights**  
No new releases landed in the last 24 hours, but issue and PR activity stayed high around reliability, Windows/VS Code setup friction, and provider edge cases. The community is actively fixing TUI stalls, empty LLM responses, and VS Code extension startup bugs, while new feature requests continue to center on provider support and clipboard-friendly UX. A long-running favorite, “Paste to attach image” (#906), was finally closed after 37 comments and 22 👍.

**Releases**  
No new releases in the last 24 hours.

## Hot Issues

1. [#906 Paste to attach image](https://github.com/anomalyco/opencode/issues/906) — Closed after a long run with 37 comments and 22 👍. Users want clipboard image paste alongside drag-and-drop, especially for workflows using Excalidraw → LLM.

2. [#6490 Web UI cannot browse or select folders outside the default user profile](https://github.com/anomalyco/opencode/issues/6490) — Windows users on `D:\code\python` are blocked by the folder picker. 11 comments, 13 👍; a significant platform-level pain point.

3. [#10517 VS Code plugin install instructions are ambiguous](https://github.com/anomalyco/opencode/issues/10517) — Despite trying `code` CLI, VS Code shell, bash/zsh, the plugin never installs. High-signal UX/docs bug with 24 👍.

4. [#26680 Add Kiro as a selectable provider](https://github.com/anomalyco/opencode/issues/26680) — Kiro now supports API-key auth for headless/CLI usage, making it a natural provider addition. 13 👍.

5. [#28312 TUI permission dialog can become stale](https://github.com/anomalyco/opencode/issues/28312) — “Enter confirm does nothing” while `/permission` reports no pending requests. A state-sync bug that can visually hang the TUI.

6. [#30916 Responses API SSE stream starts with a synthetic `chatcmpl-dummy` frame](https://github.com/anomalyco/opencode/issues/30916) — OpenAI-compatible gateways can break `sdk.responses()` with a non-valid first SSE frame, causing `TypeValidationError`.

7. [#31481 OpenCode crashes on startup when `.agents/` contains Cursor-format agent files](https://github.com/anomalyco/opencode/issues/31481) — YAML `tools:` arrays written for Cursor crash OpenCode at boot, hurting cross-tool adoption.

8. [#31690 VS Code extension v0.0.13 fails: invokes `opencode --port` instead of `opencode serve --port`](https://github.com/anomalyco/opencode/issues/31690) — Extension startup fails immediately with “Unexpected server error”; root cause clearly identified.

9. [#41469 Session silently stops on empty LLM response](https://github.com/anomalyco/opencode/issues/41469) — A 0-token completion with `finish: unknown` is treated as a completed turn, so the session exits with no visible error. Fix PR #41466 is already open.

10. [#41476 [2.0] Plan mode: agent modifies files and starts processes](https://github.com/anomalyco/opencode/issues/41476) — New safety-critical report: in Plan Mode the agent began implementing an app despite the user selecting Plan Mode before the first message.

## Key PR Progress

1. [#41466 fix(opencode): retry empty unknown responses](https://github.com/anomalyco/opencode/pull/41466) — Directly addresses #41469; prevents silent session exits when providers return empty completions.

2. [#41472 fix(tui): coalesce part stream deltas per frame to prevent stalls](https://github.com/anomalyco/opencode/pull/41472) — Stops TUI stalls when clicking to expand streaming `<thinking>` blocks by buffering per-chunk deltas into per-frame updates.

3. [#41475 fix(ui): only trap focus in the topmost dialog](https://github.com/anomalyco/opencode/pull/41475) — Fixes nested-dialog focus traps in Settings → Servers → “Add server” (closes #41382).

4. [#41468 fix(gemini): surface model-generated images instead of dropping them](https://github.com/anomalyco/opencode/pull/41468) — Gemini image models return `inlineData`, but the session never carries it into the UI; this PR preserves generated images.

5. [#41463 fix(session): omit tool definitions for models that cannot call tools](https://github.com/anomalyco/opencode/pull/41463) — Resolves a mismatch where `capabilities.toolcall` is set but ignored when building request tool lists.

6. [#41450 fix(core): derive fallback message for empty AI SDK provider errors](https://github.com/anomalyco/opencode/pull/41450) — Improves error visibility when AI SDK errors have empty `message` but structured details like status code/response body.

7. [#41478 fix(tui): preserve model variants across sessions](https://github.com/anomalyco/opencode/pull/41478) — Keeps session-scoped model/variant selection without writing transient changes into persistent preferences.

8. [#40578 feat(session): add /handoff command](https://github.com/anomalyco/opencode/pull/40578) — Adds an explicit session handoff command; closes #26757 and addresses related stale-issue discussions.

9. [#40427 [beta] experimental perf improvements](https://github.com/anomalyco/opencode/pull/40427) — Renderer performance work cuts initial renderer entry from 7.45 MB to 1.82 MB (−75.5%) in the profiled benchmark.

10. [#35976 fix(opencode): add `--dir` option to web/serve; use directory as worktree](https://github.com/anomalyco/opencode/pull/35976) — Fixes the root cause for multiple path/worktree reports and adds a properly scoped `--dir` flag.

## Feature Request Trends

- **Provider expansion remains a top direction**: requests for Gab.AI (#30621) and Kiro (#26680) show demand for more API-key-based providers and headless/CLI-friendly authentication.
- **Clipboard and asset UX**: paste-to-attach images (#906) and better web folder/file selection (#6490) are recurring asks.
- **VS Code extension and docs clarity**: users repeatedly want unambiguous install instructions (#10517), a clear extension name (#16217), and proper server command handling (#31690).
- **GitHub Action workflow improvements**: editing existing comments instead of creating new ones (#30468) is a common automation request.
- **UI density and polish**: collapsing the web toolbar into the input row (#31818) and animated loading states (#41350) reflect demand for more compact, polished interfaces.

## Developer Pain Points

- **Windows-specific friction is pervasive**: folder pickers restricted to user profiles, desktop startup hangs, `/exit` hangs on Windows 11, and `@opencode-ai/plugin@local` npm resolution failures.
- **VS Code extension setup is a consistent hurdle**: ambiguous docs, extension name collisions, and the `--port` vs `serve --port` mismatch.
- **TUI state/render bugs still annoy users**: stale permission dialogs, garbled terminal output, streaming stalls, and the DeepSeek “Pensando” freeze (#31742).
- **Provider/API edge cases cause silent failures**: empty completions (#41469), synthetic SSE dummy frames (#30916), and generic “Unknown error” messages for structured API payloads (#31643).
- **Plugin/hook behavior can surprise**: `tool.execute.before` arg mutations don’t take effect (#31680), and the permission parser misinterprets backtick-quoted text inside double-quoted strings (#31669).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-10

## Today's Highlights
A large batch of previously untriaged bugs and fixes were closed, indicating a maintainer triage-and-fix pass. Notable landed fixes include GitHub Copilot login 429s ([#7851](https://github.com/earendil-works/pi/pull/7851)), the llama.cpp default-model startup race ([#7072](https://github.com/earendil-works/pi/pull/7072)), and the broken extension-command routing via `sendUserMessage` ([#7858](https://github.com/earendil-works/pi/pull/7858)). The most community-active open issue remains [#6879](https://github.com/earendil-works/pi/issues/6879), where auto-compaction fails to trigger until the provider hard-rejects the request at 373k tokens — 16 comments and 15 👍.

## Releases
No new releases in the last 24 hours.

## Hot Issues
- [#6879 — [bug] auto-compaction never triggers after context grows past 100%](https://github.com/earendil-works/pi/issues/6879) *(OPEN, 16 comments, 15 👍)* — The week's most-discussed issue. A 2-hour agentic turn on gpt-5.6-sol pushed context past the compaction threshold; compaction only fired when the API rejected the request at 373k tokens. Users are asking for a post-turn context check. High urgency for long-running agent workflows.
- [#6922 — Default model cannot be a llama.cpp model: "No models available"](https://github.com/earendil-works/pi/issues/6922) *(CLOSED, 10 comments, 14 👍)* — With `defaultProvider: "llama.cpp"`, Pi exits or warns "No models available" at startup despite a valid llama.cpp server. High impact for local-model users; fixed via catalog caching in [#7072](https://github.com/earendil-works/pi/pull/7072).
- [#5932 — Exposing ctx.navigateTree() to agents on ExtensionContext](https://github.com/earendil-works/pi/issues/5932) *(OPEN, 6 comments)* — API inconsistency: `navigateTree()` exists on `ExtensionCommandContext` but not `ExtensionContext`, blocking custom `/goal` implementations. A concrete extensibility gap with a clear proposed fix.
- [#7730 — High CPU usage on macOS with long sessions](https://github.com/earendil-works/pi/issues/7730) *(OPEN, 6 comments, 6 👍)* — CPU swings between 50–110% with 600–800MB memory usage, apparently correlated with session/context length. No repro yet, but several users corroborate.
- [#6948 — Built-in llama.cpp provider: defaultProvider/defaultModel race condition](https://github.com/earendil-works/pi/issues/6948) *(CLOSED, 4 comments)* — The model appears in `/model` after startup, but the session doesn't start with it due to an async model-refresh race. Root cause addressed by the llama.cpp catalog cache.
- [#7323 — `pi update --models` fails the entire refresh on a transient stall](https://github.com/earendil-works/pi/issues/7323) *(CLOSED, 4 comments)* — A single stalled HTTPS request to pi.dev fails the whole catalog refresh after 15s, with no retry. Classic flaky-network failure mode; tagged no-action.
- [#3159 — [bug] edit tool terminated — timeout](https://github.com/earendil-works/pi/issues/3159) *(CLOSED, 4 comments)* — Qwen 27b consistently fails the edit tool with "terminated" on fresh versions. Suspected too-low timeout for edit operations on larger files.
- [#7720 — Allow disabling select-to-copy in fullscreen TUI mode](https://github.com/earendil-works/pi/issues/7720) *(OPEN, 4 comments)* — Terminal users who highlight frequently lose clipboard contents because selection auto-copies. Addressed by PR [#7866](https://github.com/earendil-works/pi/pull/7866), which adds a `copyOnSelect` option.
- [#7616 — TUI chat scroll jumps when tool blocks grow above viewport](https://github.com/earendil-works/pi/issues/7616) *(CLOSED, 3 comments)* — The differential renderer falls back to a full clear when a tool block outgrows the viewport, jumping the chat to the top. Also flags missing Page Up/Page Down history scroll.
- [#7740 — TUI after /reload ignores custom renderCall/renderResult for session_start tools](https://github.com/earendil-works/pi/issues/7740) *(OPEN, 3 comments)* — After `/reload`, tools registered on `session_start` (e.g., MCP extensions) render incorrectly due to load order, breaking large tool-output rendering.

## Key PR Progress
- [#7873 — skip global aliases](https://github.com/earendil-works/pi/pull/7873) — Filters unsupported zsh global aliases (`alias -g`, e.g., `G='| grep'`) out of the alias list shown in bash tool calls, removing noise and confusion.
- [#7872 — feat(coding-agent): expose context files at session start](https://github.com/earendil-works/pi/pull/7872) — Adds loaded `AGENTS`/`CLAUDE` context files to the `session_start` extension event, with docs and focused test coverage.
- [#7072 — fix(coding-agent): cache llama.cpp model catalog](https://github.com/earendil-works/pi/pull/7072) — Fixes [#6948](https://github.com/earendil-works/pi/issues/6948); caches the llama.cpp model catalog so `defaultProvider`/`defaultModel` apply correctly at startup.
- [#7866 — feat(tui): add copyOnSelect option to TuiAltScreen](https://github.com/earendil-works/pi/pull/7866) — Implements [#7720](https://github.com/earendil-works/pi/issues/7720) with a `copyOnSelect` flag defaulting to `true`, preserving current behavior while allowing opt-out.
- [#7865 — fix(tui): handle pageUp/pageDown in base SelectList and model-selector](https://github.com/earendil-works/pi/pull/7865) — Adds missing `tui.select.pageUp`/`pageDown` keybinding handling to the base `SelectList`, fixing all derived selectors.
- [#7344 — feat(protocol): add remote session wire protocol](https://github.com/earendil-works/pi/pull/7344) — New transport-neutral `@earendil-works/pi-protocol` package with validated remote-session commands/events/snapshots, bounded CBOR encoding, and incremental framing. A major architectural step for remote sessions.
- [#7858 — fix(coding-agent): route extension commands regardless of expandPromptTemplates](https://github.com/earendil-works/pi/pull/7858) — Fixes [#7859](https://github.com/earendil-works/pi/issues/7859); the documented pattern of queuing commands via `sendUserMessage` now works.
- [#7857 — feat(agent): expose expandPromptTemplates in sendUserMessage](https://github.com/earendil-works/pi/pull/7857) *(OPEN)* — Complements #7858 by letting tools trigger extension commands from user messages; author argues it's equivalent to the user pressing Enter.
- [#7856 — fix(ai): repair JSON-serialized structured tool arguments during validation](https://github.com/earendil-works/pi/pull/7856) — Handles double-serialized nested tool arguments (object/array as string) that previously hard-failed validation and exhausted retries.
- [#7851 — fix(provider): enable GitHub Copilot model policies sequentially](https://github.com/earendil-works/pi/pull/7851) — Fixes [#7850](https://github.com/earendil-works/pi/issues/7850); sends policy-enablement requests sequentially instead of concurrently, avoiding HTTP 429 for orgs with 20+ models.

## Feature Request Trends
- **Fullscreen TUI ergonomics** is the hottest area: disable copy-on-select ([#7720](https://github.com/earendil-works/pi/issues/7720)), click-to-position in the input textarea ([#7852](https://github.com/earendil-works/pi/issues/7852)), configurable wheel scroll step ([#7765](https://github.com/earendil-works/pi/issues/7765)), and Page Up/Page Down history scroll ([#7616](https://github.com/earendil-works/pi/issues/7616)).
- **Extension API surface expansion**: expose `navigateTree()` on `ExtensionContext` ([#5932](https://github.com/earendil-works/pi/issues/5932)), allow `sendUserMessage` to trigger extension commands ([#7859](https://github.com/earendil-works/pi/issues/7859)), and expose `expandPromptTemplates` ([#7857](https://github.com/earendil-works/pi/pull/7857)).
- **Context and model correctness**: smarter auto-compaction after long agentic turns ([#6879](https://github.com/earendil-works/pi/issues/6879)), configurable per-model thinking-level persistence ([#7871](https://github.com/earendil-works/pi/issues/7871)), and respect for real model context windows over remote catalog defaults ([#7870](https://github.com/earendil-works/pi/issues/7870)).

## Developer Pain Points
- **Session instability**: Auto-compaction failing until provider overflow ([#6879](https://github.com/earendil-works/pi/issues/6879)); renderer hard-crashes the whole session when any rendered line exceeds terminal width ([#7868](https://github.com/earendil-works/pi/issues/7868)); EPIPE crash when a desktop host closes the stdout pipe ([#7860](https://github.com/earendil-works/pi/issues/7860)); random "Response was truncated before completion" with OpenAI-compatible APIs ([#7855](https://github.com/earendil-works/pi/issues/7855)).
- **TUI viewport behavior**: Scroll position jumps back while long output streams ([#7861](https://github.com/earendil-works/pi/issues/7861)); chat jumps when tool blocks exceed the viewport ([#7616](https://github.com/earendil-works/pi/issues/7616)); editor disappears when scrolling up to read then replying ([#7495](https://github.com/earendil-works/pi/issues/7495)).
- **Provider integration friction**: GitHub Copilot 429 rate-limiting for orgs with many models ([#7850](https://github.com/earendil-works/pi/issues/7850)); AI21 API retirement breaking the provider ([#7869](https://github.com/earendil-works/pi/issues/7869)); OpenAI Codex request-buffer exhaustion not recognized as context overflow ([#7867](https://github.com/earendil-works/pi/issues/7867)); remote catalog silently overriding correct built-in context windows ([#7870](https://github.com/earendil-works/pi/issues/7870)).
- **Process and timeout handling**: `ExtensionContext.exec()` timeout never force-kills a SIGTERM-ignoring child ([#7864](https://github.com/earendil-works/pi/issues/7864)); edit tool "terminated" failures ([#3159](https://github.com/earendil-works/pi/issues/3159)); single network stall failing the entire model catalog refresh ([#7323](https://github.com/earendil-works/pi/issues/7323)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-10

## 1. Today's Highlights

Today's nightly release (v0.21.8-nightly.20260810.55e20db328) adds Qoder plugin extension support and CI area-owner auto-assignment. Multi-agent orchestration is the strongest signal in the community right now: RFC #8718 proposes native coordination for independent Qwen sessions, while PRs #8733 and #8740 ship inter-session messaging and shared Chrome bridging. The maintainers are also actively burning down a batch of E2E/release CI failures plus a recurring cluster of Windows/TUI rendering bugs.

## 2. Releases

**v0.21.8-nightly.20260810.55e20db328** — [Release notes](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.8-nightly.20260810.55e20db328)

- **feat(core): support Qoder plugin extensions** ([#8661](https://github.com/QwenLM/qwen-code/pull/8661)) — New extension surface for loading Qoder-compatible plugins.
- **feat(ci): auto-assign issues to area owners** — CI workflow to automatically route new issues to relevant area owners.

## 3. Hot Issues

1. **[#8718](https://github.com/QwenLM/qwen-code/issues/8718) — RFC: Native coordination for independent Qwen sessions** *(P2, feature-request, multi-agent)* — Proposes an experimental leader/worker model where a primary session dispatches self-contained workers, observes their runtime/task state, and collects structured results. 8 comments; the clearest articulation of the multi-agent roadmap.

2. **[#8784](https://github.com/QwenLM/qwen-code/issues/8784) — Optional MCP GET/SSE stream rejected with 404 kills the whole connection** *(P2, bug, scope/mcp)* — After a successful POST handshake, Qwen Code probes the optional server-push endpoint; a 404 on that probe tears down the entire MCP connection. Critical for interop with spec-compliant servers that skip optional features.

3. **[#8678](https://github.com/QwenLM/qwen-code/issues/8678) — Preserve current session when a large restore times out** *(P1, bug, daemon)* — PR1 ([#8691](https://github.com/QwenLM/qwen-code/pull/8691)) landed the timeout contract, late-request safety, and observability portions. Remaining work is still open — a high-priority daemon stability item.

4. **[#8823](https://github.com/QwenLM/qwen-code/issues/8823) — Hidden unrecognized diagnostics mutate and evict transcript state** *(P2, bug, SDK)* — Unrecognized daemon events are normalized into debug events and later hidden by renderers, but they first pass through `appendStatusBlock()` and corrupt the shared transcript reducer. Subtle state corruption for Web Shell and SDK consumers.

5. **[#8124](https://github.com/QwenLM/qwen-code/issues/8124) — Startup banner sometimes missing top lines on first paint** *(P2, UI bug, Windows, welcome-pr)* — The ASCII-art header intermittently loses its top ~3 lines on first render, correlating with a pending provider update. 10 comments making it one of the most-discussed UI bugs today.

6. **[#7118](https://github.com/QwenLM/qwen-code/issues/7118) — Windows installer fails when `powershell.exe` cannot resolve `Get-FileHash`** *(P2, bug, welcome-pr, 3 👍)* — SHA-256 verification breaks in restricted PowerShell environments. Highest community reaction count in the issue list; users want a fallback verification path.

7. **[#8557](https://github.com/QwenLM/qwen-code/issues/8557) — Shrinking terminal window reprints transcript blocks in scrollback** *(P3, UI bug, macOS)* — Narrowing the terminal on macOS/Warp causes prior transcript blocks to be duplicated into scrollback. Rendering regression in the virtualized-history path.

8. **[#8659](https://github.com/QwenLM/qwen-code/issues/8659) — TUI flickering / screen tearing in web-based terminals** *(P3, UI bug, Linux, welcome-pr)* — Full-screen ANSI redraws from `useTerminalBuffer: true` break Alibaba Cloud Workbench and similar web terminals. A `welcome-pr` candidate for the rendering subsystem.

9. **[#8769](https://github.com/QwenLM/qwen-code/issues/8769) — Rebuild `/review` Step 3–5 orchestration on the workflow engine** *(P2, enhancement, multi-agent)* — Proposes replacing model-driven agent fan-out with deterministic workflow-engine code for per-agent prompts, verification, and loop convergence. Aligns with the broader workflow-adoption trend.

10. **[#7585](https://github.com/QwenLM/qwen-code/issues/7585) — Add a direct external context provider profile** *(P3, feature-request, MCP/extensions)* — A private monorepo integration with mutually exclusive on-demand and Auto Recall profiles. 12 comments — the most active feature-design discussion this week.

## 4. Key PR Progress

1. **[#8714](https://github.com/QwenLM/qwen-code/pull/8714) — feat(core): add native DashScope integration** — Speaks Alibaba ModelStudio's native generation API directly instead of routing through the OpenAI-compatible endpoint. First-class `dashscope` auth type over a built-in fetch-based transport.

2. **[#8733](https://github.com/QwenLM/qwen-code/pull/8733) — feat(core): address other sessions by name from `send_message` and `list_agents`** — Final step of #8724: `list_agents` now shows other Qwen Code sessions running on the machine, and `send_message` can reach them by name. Directly advances the multi-agent story.

3. **[#8740](https://github.com/QwenLM/qwen-code/pull/8740) — feat(serve): share one Chrome bridge across sessions via multi-client `/cdp` tunnel** — Makes the daemon's CDP tunnel multi-client with an optional `linkId` so all sessions share a single Chrome bridge instead of re-dialing Chrome per session.

4. **[#8707](https://github.com/QwenLM/qwen-code/pull/8707) — feat(chrome): add Qwen WebBridge direct browser control** — Exposes Kimi WebBridge-compatible `/command` and `/status` endpoints for driving the Qwen Chrome extension and the user's real Chromium profile, with a 17-action surface and task-scoped ownership tracking.

5. **[#8818](https://github.com/QwenLM/qwen-code/pull/8818) — fix(core): catch content-only thinking-tag leaks on all OpenAI-compatible providers** — Extends the `<think>`-tag leak defense from a single vendor opt-in to default behavior for every OpenAI-compatible endpoint, closing two bypasses that let real leaks through.

6. **[#8687](https://github.com/QwenLM/qwen-code/pull/8687) — feat(daemon): guard cross-worktree Git mutations** — Host-side guard for model-issued `run_shell_command` calls in `qwen serve`: detects `-C` / `--work-tree` / `--git-dir` relocation and blocks mutating commands that escape the session worktree. Security-relevant hardening.

7. **[#8661](https://github.com/QwenLM/qwen-code/pull/8661) — feat(core): support Qoder plugin extensions** — The headline feature of today's nightly; opens the door to installing and running Qoder-compatible plugins inside Qwen Code.

8. **[#8803](https://github.com/QwenLM/qwen-code/pull/8803) — fix(memory): recall relevant topics beyond scan cap** — Native memory recall now ranks the complete parsed document pool, sending at most 200 balanced candidates to the model instead of being limited by the shared 200-document scan window.

9. **[#8768](https://github.com/QwenLM/qwen-code/pull/8768) — fix(integration-tests): await `rig.setup` in Qoder plugin install test** — Fixes the flaky-by-construction E2E failure (#8766) where `rig.setup()`'s recursive delete raced with fixture file writing. Directly addresses the recurring `extensions-install.test.ts` CI failures.

10. **[#8829](https://github.com/QwenLM/qwen-code/pull/8829) — fix(cli): 'later' on provider update persists a cooldown instead of re-prompting every launch** — "Remind me later" and Esc now persist a 24-hour postponement cooldown, eliminating the every-launch nag after built-in provider updates. Related fix [#8830](https://github.com/QwenLM/qwen-code/pull/8830) ensures "update all" clears the prompt by computing stored versions from the built-in template.

## 5. Feature Request Trends

- **Multi-agent / session orchestration** ([#8718](https://github.com/QwenLM/qwen-code/issues/8718), [#8769](https://github.com/QwenLM/qwen-code/issues/8769), plus PRs [#8733](https://github.com/QwenLM/qwen-code/pull/8733), [#8740](https://github.com/QwenLM/qwen-code/pull/8740)) — The dominant direction: leader-dispatch worker sessions, name-based inter-session messaging, and deterministic workflow-engine orchestration for `/review`.
- **Enterprise integration profiles** ([#7449](https://github.com/QwenLM/qwen-code/issues/7449), [#7585](https://github.com/QwenLM/qwen-code/issues/7585)) — Both from the same author: provider-neutral external-memory and direct external-context profiles, documentation-first with incremental compatibility tests and no Core API changes.
- **MCP ecosystem hardening** ([#8784](https://github.com/QwenLM/qwen-code/issues/8784)) — Clients must tolerate optional MCP endpoints (GET/SSE push) failing without killing the connection, plus support for external context providers.
- **Workflow engine adoption** ([#8769](https://github.com/QwenLM/qwen-code/issues/8769), [#8828](https://github.com/QwenLM/qwen-code/pull/8828)) — Moving orchestration from model-driven to deterministic code-driven workflows, including UI alignment (e.g., gating the floating Todo entry behind the Session Workflow setting).

## 6. Developer Pain Points

- **TUI rendering fragility** ([#8124](https://github.com/QwenLM/qwen-code/issues/8124), [#8557](https://github.com/QwenLM/qwen-code/issues/8557), [#8659](https://github.com/QwenLM/qwen-code/issues/8659)) — A cluster of terminal bugs across Windows, macOS/Warp, and web terminals: banner races, duplicated scrollback, and full-screen redraw flicker. Windows and non-native terminals are the most exposed environments.
- **CI instability / E2E flakiness** ([#8756](https://github.com/QwenLM/qwen-code/issues/8756), [#8822](https://github.com/QwenLM/qwen-code/issues/8822), [#8766](https://github.com/QwenLM/qwen-code/issues/8766), [#8771](https://github.com/QwenLM/qwen-code/issues/8771)) — Repeated failures in monitor-tool tests and Qoder plugin install tests, plus a failed release run; the autofix agent loop is actively working through these.
- **Windows installation friction** ([#7118](https://github.com/QwenLM/qwen-code/issues/7118), [#8615](https://github.com/QwenLM/qwen-code/issues/8615)) — PowerShell `Get-FileHash` resolution failures and bundled-runtime EISDIR crashes continue to surface as Windows-specific adoption blockers.
- **Daemon and session-restore robustness** ([#8678](https://github.com/QwenLM/qwen-code/issues/8678), [#8823](https://github.com/QwenLM/qwen-code/issues/8823)) — Large session restores can time out dangerously, and unrecognized daemon events can silently corrupt transcript state; SDK and Web Shell users are the most affected.
- **Provider update prompt nagging** ([#8829](https://github.com/QwenLM/qwen-code/pull/8829), [#8830](https://github.com/QwenLM/qwen-code/pull/8830), [#8124](https://github.com/QwenLM/qwen-code/issues/8124)) — The built-in provider update prompt re-appearing on every launch (and not clearing after "update all") drew enough user frustration to warrant cooldown persistence and version-computation fixes.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-10

Source: [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) (CodeWhale)

---

## 1. Today's Highlights
The project is in a release-hardening phase: **v0.9.6 was just prepared and closed** ([#5313](https://github.com/Hmbown/CodeWhale/pull/5313)), a subtractive runtime release that removes harness-created obstruction and rebuilds compaction around a single provider summary plus committed successor handoff. The v0.9.5 milestone tracker ([#5266](https://github.com/Hmbown/CodeWhale/issues/5266)) remains the community's pick-order roadmap, while several long-standing architectural refactors from the v0.9.2–v0.9.3 era were batch-closed, indicating a large cleanup push has landed. Active community friction is concentrated on **context compaction defaults** (the 128K-vs-1M issue), **provider/model switching coherence**, and **TUI permission-dialog defaults**.

---

## 2. Releases
**v0.9.6** was prepared via [#5313](https://github.com/Hmbown/CodeWhale/pull/5313) (closed). Key characteristics per the PR summary:

- Subtractive runtime release: removes harness-created obstruction while preserving explicit budgets, deadlines, cancellation, and truthful provider state
- Rebuilds compaction around one provider summary plus a committed successor handoff (without mailbox freezes)
- CNB asset download URLs fixed in release tooling ([#5308](https://github.com/Hmbown/CodeWhale/pull/5308))

No release published in the last 24h window itself, but the **release candidate is ready**.

---

## 3. Hot Issues

**1. [Compaction: publish and enforce a structured survival contract](https://github.com/Hmbown/CodeWhale/issues/4394)** (open, 3 comments)
Compaction is widely used but has no explicit contract for what survives. The community wants a documented guarantee for intent, decisions, evidence, and tool continuity. This is the umbrella issue for related compaction bugs.

**2. [Context compression triggers at 128K despite 1M model support](https://github.com/Hmbown/CodeWhale/issues/5239)** (open, 2 comments)
The highest-signal user-facing bug: users with 1M-context models are silently compacted at 128K. Duplicates and variations include [#5244](https://github.com/Hmbown/CodeWhale/issues/5244) (unknown model ids silently degrade to 128K) and the closed question [#5134](https://github.com/Hmbown/CodeWhale/issues/5134). 0.9.4 partially mitigates, but the residual fallback path was called out explicitly.

**3. [Compaction gain not visible](https://github.com/Hmbown/CodeWhale/issues/5096)** (open, 4 comments)
User reports `/compact` shows "complete" but the token counter barely changes (e.g., 37K/128K → 29K/128K). If compaction is happening server-side or the summary is too large, users have no way to verify benefit. Trust issue.

**4. [Switching providers can retain an unrelated default model](https://github.com/Hmbown/CodeWhale/issues/5034)** (open, 4 comments)
Provider and model resolution are not updated atomically — switching to OpenAI can leave `gpt-5.5` from a different route as the default. This echoes the general theme that provider/model state coherence is fragile.

**5. [TUI: make deny-by-default approval selection configurable](https://github.com/Hmbown/CodeWhale/issues/5293)** (open, 4 comments, 👍 1)
Since v0.9.4 the default highlighted option in permission dialogs is "deny". This breaks muscle memory and risks accidental denials during fast confirm flows. Community wants a configurable default.

**6. [File (action=edit) silently accepts wrong parameter names and reports fake success](https://github.com/Hmbown/CodeWhale/issues/5209)** (open, 3 comments)
Using `new_str` instead of `replace` returns "Replace successful" without doing anything, forcing 3–5x re-edits. This is a correctness and trust issue in the core edit tool, tied to the earlier read-before-edit guardrail work ([#3364](https://github.com/Hmbown/CodeWhale/issues/3364)).

**7. [v0.9.5: unified tasks surface (shell + subagents + durable workers)](https://github.com/Hmbown/CodeWhale/issues/5270)** (open, 3 comments)
Feature request for a single operator-facing list of all running background work: shells, subagents, Fleet/lane workers, workflow runs. Currently these are scattered across panels.

**8. [Fleet config has one layer too many — and silent shadowing between the rest](https://github.com/Hmbown/CodeWhale/issues/5098)** (open, 2 comments)
Editing `~/.codewhale/agents/builder.toml` had no effect because another config layer shadowed it. Config layering is too deep and silent; users cannot tell which layer wins. This is a high-frustration configuration discovery problem.

**9. [API keys silently persist only in the working repo instead of durable global secret storage](https://github.com/Hmbown/CodeWhale/issues/5047)** (open, 1 comment)
Security-relevant: keys sometimes land in `code/Codewhale/config.toml` (plaintext, repo-local) instead of the global store. Moving projects loses the key, and the stranded copy is a leak risk.

**10. [Copy message from context menu includes rail decorations](https://github.com/Hmbown/CodeWhale/issues/5314)** (open, 1 comment)
Freshly filed UX bug from v0.9.5: right-click "Copy message" carries role glyphs (`●`) and rail characters (`▏`) into the clipboard, while selection-copy is clean. Small, but it breaks terminal-output sharing workflows.

**Also noteworthy:** [Sub-agent display identity inconsistency](https://github.com/Hmbown/CodeWhale/issues/5287) — operators see `agent_<hex>` vs whale nicknames vs dispatch names for the same child; [IME candidate window jumps on Windows](https://github.com/Hmbown/CodeWhale/issues/5023); [Interrupted assistant output not a durable session item](https://github.com/Hmbown/CodeWhale/issues/5000); [Only one API key can be saved](https://github.com/Hmbown/CodeWhale/issues/5250).

---

## 4. Key PR Progress

**1. [chore(release): prepare v0.9.6](https://github.com/Hmbown/CodeWhale/pull/5313)** (closed)
The release PR itself: compaction rebuild (single provider summary + successor handoff), removal of harness-created obstruction, preservation of budgets/cancellation.

**2. [fix(release): use CNB asset download URLs](https://github.com/Hmbown/CodeWhale/pull/5308)** (closed)
Fixes the updater so mirror mode downloads actual asset bytes instead of release HTML; preserves explicit mirror override precedence.

**3. [build(deps): bump jsonschema from 0.46.10 to 0.49.6](https://github.com/Hmbown/CodeWhale/pull/5281)** (open, Dependabot)
Routine dependency bump; noteworthy only because jsonschema is on the critical path for config validation.

Note: only 3 PRs were updated in the 24h window. The rest of the section reflects closure of the v0.9.3 refactor batch via issues, since those are the artifacts shipped in this window.

**Recently closed refactor issues (v0.9.2–v0.9.3 batch):**

- [#3205](https://github.com/Hmbown/CodeWhale/issues/3205) — Fleet model classes, loadout auto, and semantic route roles
- [#4022](https://github.com/Hmbown/CodeWhale/issues/4022) — CLI/TUI parity for subagent and runtime control surfaces
- [#3313](https://github.com/Hmbown/CodeWhale/issues/3313) — Split `RuntimeThreadManager` (7,133 lines) into store/executor/events/types
- [#3312](https://github.com/Hmbown/CodeWhale/issues/3312) — Extract `ui.rs` run_event_loop into context-owned handlers
- [#3956](https://github.com/Hmbown/CodeWhale/issues/3956) — Split `prompts.rs` (3,745 lines) into source loading, overrides, taxonomy, composition
- [#3952](https://github.com/Hmbown/CodeWhale/issues/3952) — Split chat client request building from stream decoding and prompt inspection
- [#3364](https://github.com/Hmbown/CodeWhale/issues/3364) — Read-before-edit guardrails and clearer edit failures
- [#5043](https://github.com/Hmbown/CodeWhale/issues/5043) — Compaction preserves intent/decisions/evidence/tool continuity

These closings indicate the maintainer executed a large structural cleanup of the codebase's monolith modules — no new features, but reduced risk for the v0.9.5/v0.9.6 line.

---

## 5. Feature Request Trends

**1. Context window correctness (highest signal):** Users with 1M-token models want the tool to respect the real model capability instead of falling back to 128K. Multiple issues ([#5239](https://github.com/Hmbown/CodeWhale/issues/5239), [#5244](https://github.com/Hmbown/CodeWhale/issues/5244), [#5134](https://github.com/Hmbown/CodeWhale/issues/5134), [#4394](https://github.com/Hmbown/CodeWhale/issues/4394)) demand both a fix and a visible contract/survival guarantee for compaction.

**2. Unified operations surface:** One panel listing all running work — shells, subagents, Fleet workers, workflows ([#5270](https://github.com/Hmbown/CodeWhale/issues/5270)). Users want a single "is anything still running?" answer instead of checking four panels.

**3. Stable, explainable config and identity:** Fleet config shadowing ([#5098](https://github.com/Hmbown/CodeWhale/issues/5098)), provider/model coherence ([#5034](https://github.com/Hmbown/CodeWhale/issues/5034)), subagent display identity ([#5287](https://github.com/Hmbown/CodeWhale/issues/5287)) — all point toward "make state visible and predictable."

**4. TUI ergonomics for non-English users:** IME stability on Windows ([#5023](https://github.com/Hmbown/CodeWhale/issues/5023)) and multiple requests from non-English speakers (compaction, context length) show the user base is global and input-method quality matters.

**5. Multi-provider key management:** Saving one key per provider instead of one global slot ([#5250](https://github.com/Hmbown/CodeWhale/issues/5250)) plus the persistence-location bug ([#5047](https://github.com/Hmbown/CodeWhale/issues/5047)) — provider-switching workflows are a real daily pain.

**6. Multimodal / visual input:** First-class screenshot/image viewing for agents (kimicode ReadMediaFile) ([#5102](https://github.com/Hmbown/CodeWhale/issues/5102)) — a forward-looking harness feature.

---

## 6. Developer Pain Points

**A. The 128K surprise:** Models advertise 1M but compact at 128K, silently, unless you know the internal model-id registry. This is the single most repeated frustration — and it erodes trust because the tool doesn't say "this is a fallback."

**B. Fake success from tools:** `File action=edit` reports success for wrong parameter names ([#5209](https://github.com/Hmbown/CodeWhale/issues/5209)). Developers waste 3–5 edit cycles per location before noticing. The v0.9.3 read-before-edit guardrails ([#3364](https://github.com/Hmbown/CodeWhale/issues/3364)) were meant to address this class — but the parameter-validation hole remains.

**C. Silent config shadowing:** Fleet configs have multiple layers where the winning value is not obvious ([#5098](https://github.com/Hmbown/CodeWhale/issues/5098)). Editing `~/.codewhale/agents/builder.toml` did nothing because another file overrode it.

**D. Provider switching is not atomic:** Switching providers leaves stale default models and API keys scattered between global and repo-local storage ([#5034](https://github.com/Hmbown/CodeWhale/issues/5034), [#5047](https://github.com/Hmbown/CodeWhale/issues/5047), [#5250](https://github.com/Hmbown/CodeWhale/issues/5250)).

**E. Compaction is a black box:** "Compaction complete" without visible token reduction ([#5096](https://github.com/Hmbown/CodeWhale/issues/5096)) and no published survival contract ([#4394](https://github.com/Hmbown/CodeWhale/issues/4394)) — developers cannot verify their work will survive.

**F. Behavioral regressions in UI defaults:** The deny-by-default permission dialog ([#5293](https://github.com/Hmbown/CodeWhale/issues/5293)) and copy-with-decorations regression ([#5314](https://github.com/Hmbown/CodeWhale/issues/5314)) show the community notices small UX changes fast in a tool used all day.

---

*Digest generated from public GitHub data. Issue/PR counts reflect the "last 24h" window as provided; several items carry earlier update timestamps but were included in the source snapshot.*

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*