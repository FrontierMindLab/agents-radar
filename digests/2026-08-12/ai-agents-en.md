# OpenClaw Ecosystem Digest 2026-08-12

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-12 04:07 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-12

## 1. Today's Overview

OpenClaw is in a high-activity maintenance cycle: **500 issues and 500 PRs** were updated in the last 24 hours, with **150 issues closed** and **217 PRs merged/closed**. No new release was published, so most recent work is still visible only as open PRs and branch activity. The most prominent issue cluster is **delivery reliability** — silent reply failures, truncated responses, and channel-specific dispatch errors dominate the highest-comment bug reports. Maintainer triage is active, but many high-severity items still carry `needs-maintainer-review` or `needs-product-decision`, suggesting a mix of healthy fix throughput and backlog on product-level calls.

## 2. Releases

**None.** No new OpenClaw release was published on 2026-08-12, so there are no release notes, breaking changes, or migration notes to report.

## 3. Project Progress

The snapshot does not name individual merged PRs, but aggregate data shows **217 PRs merged/closed** and **150 issues closed** in the last 24 hours. Several high-profile issues are now marked closed, including:

- [#92201](https://github.com/openclaw/openclaw/issues/92201) — Embedded runner signature invalidation on replay
- [#92076](https://github.com/openclaw/openclaw/issues/92076) — Subagent completion delivery failure
- [#92460](https://github.com/openclaw/openclaw/issues/92460) — Cron completion announcer drops `delivery.channel`
- [#96827](https://github.com/openclaw/openclaw/issues/96827) — `message_tool_only` cascade of self-replies
- [#89594](https://github.com/openclaw/openclaw/issues/89594) — Teams inbound attachments inaccessible
- [#89315](https://github.com/openclaw/openclaw/issues/89315) — Gateway heap growth / OOM on long-running systemd deployments

Notable in-flight PRs updated today:

- [#122421](https://github.com/openclaw/openclaw/pull/122421) — `fix(delivery)`: preserve suppressed send outcomes
- [#122422](https://github.com/openclaw/openclaw/pull/122422) — `fix`: compaction resolves undated model refs
- [#122418](https://github.com/openclaw/openclaw/pull/122418) — `fix(audit)`: ignore inherited execution identity evidence
- [#122350](https://github.com/openclaw/openclaw/pull/122350) — `fix(gateway)`: keep model catalog reads responsive
- [#121970](https://github.com/openclaw/openclaw/pull/121970) — `fix(feishu)`: group chats keep old agent config after hot reload
- [#120491](https://github.com/openclaw/openclaw/pull/120491) — `feat(tools)`: per-turn per-target send budget guard for message tools
- [#120768](https://github.com/openclaw/openclaw/pull/120768) — `feat(pairing)`: one-paste device pairing via `oc-pair` setup links
- [#116489](https://github.com/openclaw/openclaw/pull/116489) — `feat(security)`: require acknowledgement for install policy warnings

UI maintainability work is also progressing via large refactors: [#122420](https://github.com/openclaw/openclaw/pull/122420), [#122413](https://github.com/openclaw/openclaw/pull/122413), and [#122419](https://github.com/openclaw/openclaw/pull/122419).

## 4. Community Hot Topics

The most active issue discussions reveal where user attention is concentrated:

- [#121058](https://github.com/openclaw/openclaw/issues/121058) — **69 comments**: Silent reply failures still recurring after #116277 was closed. Users are frustrated that a supposedly fixed failure mode continues to appear.
- [#116201](https://github.com/openclaw/openclaw/issues/116201) — **64 comments**: Realtime voice work can retain unbounded provider and consult state. High-severity reliability/state concern.
- [#25592](https://github.com/openclaw/openclaw/issues/25592) — **46 comments**: Text between tool calls leaks to messaging channels. Privacy/UX issue affecting Slack, iMessage, and other channels.
- [#7707](https://github.com/openclaw/openclaw/issues/7707) — **43 comments**: Memory Trust Tagging by Source — a long-running security/feature request.
- [#92201](https://github.com/openclaw/openclaw/issues/92201) — **23 comments**: Anthropic thinking-signature replay issue, now closed.
- [#42475](https://github.com/openclaw/openclaw/issues/42475) — **21 comments**: Per-agent cost budget enforcement at gateway level.

PRs did not expose comment counts in this snapshot, so PR-side hotness is inferred from priority labels and maintenance attention. High-signal PRs include:

- [#120768](https://github.com/openclaw/openclaw/pull/120768) — one-paste device pairing
- [#116489](https://github.com/openclaw/openclaw/pull/116489) — install policy warning acknowledgement
- [#121562](https://github.com/openclaw/openclaw/pull/121562) — Custodian setup receipts in UI
- [#114388](https://github.com/openclaw/openclaw/pull/114388) — explicit multi-agent ownership

The underlying needs are clear: **reliable message delivery, bounded state, channel privacy, memory security, and cost controls**.

## 5. Bugs & Stability

Bugs below were updated in the last 24 hours and are ordered roughly by severity.

### Critical / High

- [#121058](https://github.com/openclaw/openclaw/issues/121058) — **Silent reply failures recurring** with no queued reply payload. 69 comments. No fix PR visible.
- [#116201](https://github.com/openclaw/openclaw/issues/116201) — **Realtime voice unbounded state** (P1, diamond lobster). No new fix PR; waiting on maintainer/product.
- [#25592](https://github.com/openclaw/openclaw/issues/25592) — **Internal text leaks to messaging channels** (P1, security). Long-standing since Feb; needs security review.
- [#97983](https://github.com/openclaw/openclaw/issues/97983) — **iOS/WebChat messages append but do not trigger replies** (P1, message-loss).
- [#114020](https://github.com/openclaw/openclaw/issues/114020) — **Feishu/Telegram dispatch fails**: `runChannelInboundEvent` requires `runDispatchLifecycle` after upgrade (P1, message-loss).
- [#121765](https://github.com/openclaw/openclaw/issues/121765) — **Telegram ingress spool merge drops `reply_to_message`/quote** from non-first entries (P1, regression/data-loss).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — **Unreaped hook/tool child processes** cause zombie accumulation and runtime degradation (P1, crash-loop).
- [#84516](https://github.com/openclaw/openclaw/issues/84516) — **Codex app-server replies silently truncated** at ~1000–1100 chars with no abort/finish reason (P1, message-loss).
- [#87744](https://github.com/openclaw/openclaw/issues/87744) — **Codex-backed Telegram turns time out** waiting for `turn/completed` (P1, message-loss).

### High with linked PR signals

- [#42820](https://github.com/openclaw/openclaw/issues/42820) — Feishu `message` tool **cannot send files** due to poll schema/guard pollution (P1, `linked-pr-open`).
- [#121953](https://github.com/openclaw/openclaw/issues/121953) — **Cron agent turns stall on DeepSeek** because `[cron:<jobId>]` prefix is deprioritized (P1, `linked-pr-open`).
- [#80498](https://github.com/openclaw/openclaw/issues/80498) — **Subagent completion announcements premature/duplicated** after tool-use turns (P1).
- [#98435](https://github.com/openclaw/openclaw/issues/98435) — **MCP loopback transport does not auto-reconnect** after gateway restart; `recovered=1` is misleading (P1).

### Positive stability signals

Several serious issues are now closed, including the gateway OOM issue [#89315](https://github.com/openclaw/openclaw/issues/89315), Teams attachment handling [#89594](https://github.com/openclaw/openclaw/issues/89594), and the `message_tool_only` cascade [#96827](https://github.com/openclaw/openclaw/issues/96827).

## 6. Feature Requests & Roadmap Signals

Active feature requests with strong community signal:

- [#7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (security/memory poisoning prevention)
- [#42475](https://github.com/openclaw/openclaw/issues/42475) — **Per-agent cost budget enforcement at gateway** — has a linked open PR
- [#72741](https://github.com/openclaw/openclaw/issues/72741) — **Standard interface for external security/guardrail checks**
- [#14785](https://github.com/openclaw/openclaw/issues/14785) — **Reduce tool schema token overhead** (~3,500 tokens/session)
- [#42840](https://github.com/openclaw/openclaw/issues/42840) — **MathJax/LaTeX support in Control UI** — 10 👍, clear UX win
- [#13700](https://github.com/openclaw/openclaw/issues/13700) — **Session snapshots / context checkpoints**
- [#16670](https://github.com/openclaw/openclaw/issues/16670) — **Mandatory memory/embedding setup in onboarding wizard**
- [#55249](https://github.com/openclaw/openclaw/issues/55249) — **Session labels/nicknames**
- [#39343](https://github.com/openclaw/openclaw/issues/39343) — **Image batching / media group buffering**
- [#47597](https://github.com/openclaw/openclaw/issues/47597) — **`streamTo="parent"` support for `runtime="subagent"`**

Predictions for the next release are fairly visible from the open PR queue: **install-policy warning acknowledgement** ([#116489](https://github.com/openclaw/openclaw/pull/116489), [#120899](https://github.com/openclaw/openclaw/pull/120899), [#120900](https://github.com/openclaw/openclaw/pull/120900)), **one-paste device pairing** ([#120768](https://github.com/openclaw/openclaw/pull/120768)), **per-turn send budget guard** ([#120491](https://github.com/openclaw/openclaw/pull/120491)), and **model catalog responsiveness** ([#122350](https://github.com/openclaw/openclaw/pull/122350)). Longer-term roadmap signals point to security/memory trust, cost governance, and token-efficiency work.

## 7. User Feedback Summary

Users are filing detailed, high-quality bug reports with versions, plugins, and reproduction steps — a sign of an engaged technical community. The biggest pain points are:

- **Message delivery reliability**: silent reply failures, truncated Codex replies, channel-specific dispatch failures, and lost reply metadata.
- **State/resource leaks**: voice session state, subagent sessions, memory SQLite table growth, and zombie child processes.
- **Configuration friction**: unvalidated model names, plugin/core version drift, silent model-switch failures, and unclear watchdog limits.

Satisfaction signals are strongest around quality-of-life and performance features: LaTeX rendering (10 👍), Codex timeout/truncation issues (3 👍 each), and gateway TTFT/perf work (3 👍). However, recurring "closed but still happening" bugs such as [#121058](https://github.com/openclaw/openclaw/issues/121058) suggest some user skepticism about stability claims until a release actually ships.

## 8. Backlog Watch

Important open items that need maintainer or product attention:

- [#25592](https://github.com/openclaw/openclaw/issues/25592) — **Text between tool calls leaks to channels** (P1, security, 46 comments, open since Feb 24). No fix PR visible despite severity.
- [#7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (P2, 43 comments, open since Feb 3). Needs product decision.
- [#14785](https://github.com/openclaw/openclaw/issues/14785) — **Tool schema token overhead** (P2, diamond lobster, open since Feb 12). Clear optimization, no PR visible.
- [#42475](https://github.com/openclaw/openclaw/issues/42475) — **Per-agent cost budgets** (P2, 21 comments, linked PR open). Needs review/merge.
- [#47975](https://github.com/openclaw/openclaw/issues/47975) — **Subagent sessions persist; main session becomes unresponsive** (P1, open since Mar 16).
- [#42820](https://github.com/openclaw/openclaw/issues/42820) — **Feishu file send blocked by poll schema/guard** (P1, linked PR open).
- [#40982](https://github.com/openclaw/openclaw/issues/40982) — **Raise/remove 3-minute CLI watchdog cap** (P1, linked PR open).
- [#116201](https://github.com/openclaw/openclaw/issues/116201) — **Realtime voice state retention** (P1, 64 comments, created Jul 30). Already hot and unresolved.
- [#98435](https://github.com/openclaw/openclaw/issues/98435) — **MCP loopback transport does not reconnect after gateway restart** (P1, open since Jul 1).

The common theme in the backlog is that **delivery reliability and state-boundary issues are the highest-cost unresolved problems**, while **security-minded features are the clearest roadmap opportunities**.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — AI Agent / Personal Assistant Open-Source Ecosystem
**Date: 2026-08-12**

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is consolidating around a shared set of reliability and governance problems: silent message-delivery failures, bounded memory/context state, cost telemetry, and MCP lifecycle management appear across nearly every active project. The ecosystem is in a pre-release hardening phase — only LobsterAI (2026.8.11) and CoPaw (v2.1.0-beta.3) shipped in the last 24 hours, while OpenClaw, IronClaw, and ZeroClaw accumulate fix-heavy PR queues ahead of their next cuts. A visible split is emerging between Western/global projects (OpenClaw, IronClaw, Hermes, ZeroClaw) focused on security architecture and delivery reliability, and Chinese-ecosystem projects (CoPaw, LobsterAI) iterating rapidly on console UX and IM-channel integration. Two forks (NullClaw, ZeptoClaw) show zero activity, indicating consolidation toward the reference implementations.

## 2. Activity Comparison

*Counts represent items updated in the last 24 hours; parentheses show closed/merged figures.*

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release status | Health (0–10) |
|---|---|---|---|---|
| OpenClaw | 500 (150) | 500 (217) | None | 8 |
| IronClaw | 19 (6) | 50 (21) | None | 9 |
| CoPaw | 22 (12) | 43 (21) | v2.1.0-beta.3 | 8 |
| ZeroClaw | 50 (9) | 50 (1) | None | 9 |
| NanoBot | 7 (4) | 140 (118) | None | 7 |
| Hermes Agent | 50 (2) | 50 (2) | None | 6 |
| LobsterAI | 6 (2) | 9 (7) | 2026.8.11 | 7 |
| PicoClaw | 3 (1) | 6 (0) | None | 5 |
| NanoClaw | 1 (0) | 8 (3) | None | 5 |
| Moltis | 0 (0) | 1 (0) | None | 5 |
| NullClaw | 0 | 0 | None | N/A (inactive) |
| ZeptoClaw | 0 | 0 | None | N/A (inactive) |

*Health score is an analyst composite weighting merge/close velocity, bug-fix turnaround time, security posture, release cadence, and backlog quality.*

## 3. OpenClaw's Position

OpenClaw remains the **de facto reference implementation** and the clear community leader by volume: its 500 issues / 500 PRs updated in 24 hours is 3.5–10x the activity of its nearest peers (NanoBot, IronClaw, Hermes). Its technical approach — a unified gateway plus embedded runner with modular agent/tools/memory layers and the broadest channel matrix (Slack, Teams, Feishu, Telegram, iMessage) — gives it unmatched breadth. It also has the deepest feature pipeline (per-turn send budgets, one-paste device pairing, install-policy security acknowledgement).

However, scale creates triage debt: high-severity items sit in `needs-product-decision`, and the recurring "closed but still happening" silent-reply bug ([#121058](https://github.com/openclaw/openclaw/issues/121058)) is eroding user trust. Relative to peers, OpenClaw merges at high volume (217/day) but has not shipped a release, while CoPaw ships betas within 24 hours and ZeroClaw converts every accepted p1 bug into a fix PR the same day. OpenClaw's advantage is breadth and ecosystem gravity; its risk is that IronClaw's engineering discipline and ZeroClaw's process maturity become the quality benchmark.

## 4. Shared Technical Focus Areas

**Delivery reliability / explicit failure surfacing** — OpenClaw (silent reply failures #121058, Codex truncation #84516), NanoClaw (silent inbound drop #3226), Hermes (silent death on interrupt #84207, restart drain #84285), CoPaw (agent stops mid-task #6921), IronClaw (silent task eviction #7484). *Need: end-of-turn reasons, idempotent message IDs, drain-safe restarts, no silent drops.*

**Memory & context lifecycle** — OpenClaw (memory trust tagging #7707), IronClaw (provider-neutral memory aliases #7505, always-on MEMORY.md lane), PicoClaw (routed-agent context broken #3301), CoPaw (Scroll/auto-memory/compression unification), Hermes (state.db checkpointing). *Need: bounded context, no silent eviction, trustworthy and provider-neutral memory.*

**Cost governance & token efficiency** — OpenClaw (per-agent gateway budgets #42475), ZeroClaw ($0.00 spend bug #9816, multi-alias pricing #9573), IronClaw (token estimator double-counting #7485), PicoClaw (cache-token logging #3317), NanoBot (token-wasting repetition loops). *Need: accurate spend telemetry, per-agent caps, cache-token visibility.*

**MCP lifecycle & multi-server auth** — NanoBot (app-owned MCP lifecycle #5343, OAuth credential preservation #5338), NanoClaw (remote Streamable HTTP MCP), CoPaw (periodic MCP tool failure #6732, 120s timeout #6874), OpenClaw (loopback reconnect #98435), IronClaw (GitHub MCP verification UX #7508). *Need: connection state in UI, timeouts, reconnection, credential persistence.*

**Permission & security hardening** — NanoBot (exec allowPatterns shell-chain bypass #5306), ZeroClaw (forbidden_paths unreachable #9815, SSRF #8713), CoPaw (plugin cron injection #6916), Hermes (webhook prompt injection #8820), OpenClaw (install-policy acknowledgement). *Need: capability membranes, confirmation flows, prompt-injection defense.*

**OpenAI-protocol interop & self-hosted providers** — ZeroClaw (Chat Completions profile RFC #8603), Hermes (gpt-oss raw tool-token leakage #84158), NanoBot (OpenRouter server tools), CoPaw (custom gateway endpoints). *Need: OpenAI-compatible surfaces, multi-provider preset management, self-hosted model parity.*

## 5. Differentiation Analysis

- **OpenClaw** — Generalist personal-assistant gateway; broadest channel and platform coverage; operator/self-hosted power users; Node/TS; competitive moat is ecosystem breadth rather than depth in any single area.
- **IronClaw** — Kernel-style platform: pluggable agent loops, ACP executor, durable audit, profile-agnostic storage; aligned with the NEAR/crypto cloud; strongest merge discipline and epic-driven architecture.
- **CoPaw** — AgentScope/Qwen ecosystem; Chinese IM channels (Feishu, QQ, WeCom); console-heavy UX (3D memory graph, marketplace unification); fastest beta cadence of any project.
- **ZeroClaw** — RFC-governed, enterprise-focused (auth, security pipeline, cost); Rust-based; flagship direction is OpenAI API compatibility; strongest process maturity (maintainer decision queue, RFC reform).
- **Hermes Agent** — Research/Desktop-first (Nous Research); local TTS investment; heavy automated security-audit pipeline; Python; review throughput is the bottleneck.
- **NanoBot** — Minimalist Python agent; goal-mode autonomy; exec security; broad provider presets; positioned for simplicity and hackability.
- **NanoClaw** — SDK/API-centric; agent-template to plugin migration; remote HTTP MCP; targets developers embedding agents.
- **PicoClaw** — Lightweight embedded agent; Telegram/LINE topics; dispatch-rule multi-agent; small, maintainer-limited.
- **LobsterAI** — Windows/Electron desktop; sandbox, cowork sessions, scheduled tasks; Chinese user base; model-provider UX and uninstall trust issues.
- **Moltis** — Local-first data connectors (CalDAV snapshots, full-text search); read-only agent tools; quiet, niche, stable.

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, release-imminent:** IronClaw (21 merges/day, deliberate "reborn" hardening), CoPaw (beta.3 shipped, beta.4 cut within 24h, 21 merges), OpenClaw (highest raw throughput but overdue release), ZeroClaw (every accepted p1 bug gained a same-day fix PR).

**Tier 2 — Steady / hardening:** NanoBot (118 PRs closed but many conflict-pruned; open security advisory), LobsterAI (stable release cadence, stale old issues), Hermes (high activity but only 2 merges; long-lived PRs from May/July create review debt).

**Tier 3 — Quiet / stabilizing:** PicoClaw (no merges, `[stale]` queue), NanoClaw (3 closures, unmerged 3-month-old fix), Moltis (single large PR in review). **Inactive:** NullClaw, ZeptoClaw — zero activity, likely abandoned forks.

Maturity observations: ZeroClaw and IronClaw show the most process discipline (decision queues, epics, provenance-tracked cherry-picks); OpenClaw's scale has created triage debt; Hermes has the strongest security-audit culture but the weakest merge throughput.

## 7. Trend Signals

1. **Silent failure is the #1 trust killer.** Across OpenClaw, NanoClaw, Hermes, CoPaw, and IronClaw, users demand explicit skip/abort/finish reasons and idempotent message routing. *Value for developers: build observable turn lifecycles with terminal reasons into agent protocols.*

2. **Cost telemetry is becoming table stakes.** ZeroClaw's $0.00-spend bug and IronClaw's token-estimator defect show that inaccurate pricing actively misleads users; per-agent budgets and cache-token logging are emerging as differentiators. *Value: correct pricing and spend caps are a trust feature, not an admin feature.*

3. **MCP lifecycle management is the next integration battleground.** Connection-status surfacing, reconnection, OAuth persistence, and timeouts are being solved independently by NanoBot, NanoClaw, CoPaw, and OpenClaw — a sign the ecosystem has not yet standardized. *Value: an app-owned MCP lifecycle layer is a competitive advantage.*

4. **Memory must be bounded, provable, and provider-neutral.** Memory trust tagging, alias resolution, silent-eviction prevention, and source attribution are converging from different directions. *Value: memory security (poisoning prevention) is a clear roadmap opportunity.*

5. **Security permission UX is being productized.** Exec allow/ask/deny policies, plugin approval flows, install-policy acknowledgements, and capability membranes are emerging across NanoBot, ZeroClaw, CoPaw, and OpenClaw. *Value: permission confirmation flows will be standard in the next generation of agent frameworks.*

6. **OpenAI-compatible API surfaces are a portability requirement.** Users want to keep existing clients (Open WebUI, Aider, LangChain) rather than adopt proprietary protocols; ZeroClaw's Chat Completions RFC and Hermes' self-hosted gpt-oss complaints confirm this. *Value: exposing an OpenAI-protocol surface maximizes ecosystem adoption.*

7. **Architecture is converging on modular kernels.** God-file sharding (Hermes), app-owned MCP lifecycle (NanoBot), and pluggable agent loops (IronClaw) all point toward replacing monolithic agent loops with modular, kernel-style runtimes. *Value: invest in extensibility boundaries early; monolithic loops are the primary maintainability bottleneck.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-12

## 1. Today's Overview

NanoBot saw heavy activity in the 24 hours ending 2026-08-12: 140 pull requests were updated (118 closed/merged, 22 open), and 7 issues were updated (3 open, 4 closed). No new releases were published. Development momentum is concentrated on WebUI improvements, MCP lifecycle refactoring, executor/security hardening, and fixes for agent loop/repetition behavior. At the same time, a large batch of older PRs were closed as conflicts, suggesting maintainers are actively pruning stale backlog. The main project-health concerns remain open security advisories and recurring agent-repetition bugs.

## 2. Releases

No new releases were published in this period.

## 3. Project Progress

Among the 118 closed/merged PRs updated today, active feature and fix work is visible in both recently closed and still-open PRs:

- **MCP connection status surfaced in WebUI**: [PR #5331](https://github.com/HKUDS/nanobot/pull/5331) closed with changes to project real MCP connection state and surface failures in the WebUI.
- **Tabbed pane workbench**: [PR #5322](https://github.com/HKUDS/nanobot/pull/5322) is open and proposes a major WebUI layout refactor with tabs, panes, and configurable layouts.
- **MCP lifecycle refactor**: [PR #5343](https://github.com/HKUDS/nanobot/pull/5343) is open and moves MCP lifecycle ownership out of `AgentLoop` into an application-owned `MCPProvider`.
- **Provider/model preset management**: [PR #5347](https://github.com/HKUDS/nanobot/pull/5347) is open, adding deletion of custom providers and an accessible chat model-preset selector.
- **Apps discovery redesign**: [PR #5342](https://github.com/HKUDS/nanobot/pull/5342) is open, redesigning the Apps area around Discover/Installed/All and adding registry-backed featured apps.

A large set of older PRs, including [PR #2181](https://github.com/HKUDS/nanobot/pull/2181), [PR #1383](https://github.com/HKUDS/nanobot/pull/1383), [PR #1367](https://github.com/HKUDS/nanobot/pull/1367), [PR #1321](https://github.com/HKUDS/nanobot/pull/1321), [PR #1199](https://github.com/HKUDS/nanobot/pull/1199), [PR #1114](https://github.com/HKUDS/nanobot/pull/1114), and [PR #1094](https://github.com/HKUDS/nanobot/pull/1094), were closed and tagged `[conflict]`. These were likely stale or unmergeable PRs rather than absorbed features.

## 4. Community Hot Topics

The most active issue by far was:

- **[Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) — “Nanobot repeats multiple times the same message while reasoning”** with 10 comments. Users report random repetition of phrases such as “Good points, let me investigate the issue” during reasoning. The issue is closed, and the related open fix [PR #5344](https://github.com/HKUDS/nanobot/pull/5344) targets repeated identical tool calls.

Other issues with user engagement:

- **[Issue #5256](https://github.com/HKUDS/nanobot/issues/5256)** — `/goal` generates dozens of near-identical replies while waiting for user input.
- **[Issue #4784](https://github.com/HKUDS/nanobot/issues/4784)** — Provider API keys leaked between providers via global `os.environ` mutation; closed.
- **[Issue #5306](https://github.com/HKUDS/nanobot/issues/5306)** — `exec.allowPatterns` shell-chain bypass allowing unintended command execution; still open.

The common underlying theme is reliability and security: users are hitting agent-loop failures that waste tokens, and they are concerned about API-key leakage and command-execution restrictions.

## 5. Bugs & Stability

Ranked by severity:

1. **Critical — `exec.allowPatterns` shell-chain bypass**  
   [Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) is open and describes how operators can limit allowed shell commands but still have the restriction bypassed via shell chaining. No fix PR is visible yet. This should be treated as a security priority.

2. **High — Provider API keys leaked between providers**  
   [Issue #4784](https://github.com/HKUDS/nanobot/issues/4784) is closed. It described `OpenAICompatProvider._setup_env()` overwriting or setting global `os.environ`, leaking keys across providers. Related environment exposure to subprocesses was covered by closed [Issue #4783](https://github.com/HKUDS/nanobot/issues/4783).

3. **Medium — Repeated agent output while reasoning/waiting**  
   [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) is closed, but [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) remains open: `/goal` can produce dozens of repeated replies. [PR #5344](https://github.com/HKUDS/nanobot/pull/5344) proposes warning instead of silently spiraling on repeated identical tool calls.

4. **Medium — One-shot `exec` child processes survive cleanup**  
   [PR #5346](https://github.com/HKUDS/nanobot/pull/5346) is open and fixes a gap where timeout/cancellation/errors killed only the root shell, leaving child processes running.

5. **Low — Timezone-dependent test failures**  
   [Issue #5348](https://github.com/HKUDS/nanobot/issues/5348) reports two settings API tests failing during a ~5-hour daily window due to UTC vs configured timezone mismatch. Fix PR: [PR #5349](https://github.com/HKUDS/nanobot/pull/5349).

## 6. Feature Requests & Roadmap Signals

The most notable feature request is:

- **[Issue #5333](https://github.com/HKUDS/nanobot/issues/5333)** — Support OpenRouter Server Tools such as Web Search and Web Fetch. The issue is closed, but it signals user demand for richer built-in MCP/server-tool integrations.

Strong roadmap signals from open PRs include:

- **WebUI workbench/tabbed panes**: [PR #5322](https://github.com/HKUDS/nanobot/pull/5322)
- **Apps discovery redesign**: [PR #5342](https://github.com/HKUDS/nanobot/pull/5342)
- **Provider and model preset management**: [PR #5347](https://github.com/HKUDS/nanobot/pull/5347)
- **MCP lifecycle refactor**: [PR #5343](https://github.com/HKUDS/nanobot/pull/5343)
- **MCP OAuth credential preservation**: [PR #5338](https://github.com/HKUDS/nanobot/pull/5338)

Likely next-version themes: MCP architecture improvements, WebUI layout/preset enhancements, and agent loop safeguards.

## 7. User Feedback Summary

Users are generally engaged and appreciative — [Issue #5333](https://github.com/HKUDS/nanobot/issues/5333) explicitly thanks the maintainers. However, several pain points stand out:

- **Agent repetition loops** are confusing and wasteful, especially in autonomous goal-mode or reasoning flows.
- **API-key/environment leaks** raised trust concerns around subprocess and multi-provider setups.
- **Security restrictions** on `exec` are seen as important but currently bypassable.
- **Timezone-sensitive test failures** frustrate contributors running the test suite outside UTC hours.
- **Server tools / OpenRouter integration** is an actively requested capability.

Overall satisfaction appears moderate; users appreciate the project but are waiting on fixes for stability and security issues.

## 8. Backlog Watch

- **[Issue #5306](https://github.com/HKUDS/nanobot/issues/5306)** — Open security advisory for `exec.allowPatterns` shell-chain bypass. Needs urgent maintainer response and a fix plan.
- **[Issue #5256](https://github.com/HKUDS/nanobot/issues/5256)** — Open `/goal` repetition bug from 2026-08-05 with no linked fix yet.
- **[PR #5349](https://github.com/HKUDS/nanobot/pull/5349)** — Fix for the timezone test failure is ready and waiting for review.
- **[PR #5346](https://github.com/HKUDS/nanobot/pull/5346)** — Exec process-tree cleanup fix is open and should be considered for the next patch release.
- **[PR #5338](https://github.com/HKUDS/nanobot/pull/5338)** — MCP OAuth credential preservation fix; important for multi-server MCP setups, still open.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-12

## 1. Today's Overview

Hermes Agent is in a high-intensity development and hardening phase: 50 issues and 50 PRs were updated in the last 24 hours, with 48 issues and 48 PRs still open/active. No new releases shipped today. Two dominant workstreams are visible: a **large automated security-audit campaign** (13 P3 findings filed under EPIC #82591, all labeled `SECURITY-AUDIT-42-CLASSES-F51AA6A9`) and the **repo-wide god-file sharding policy** (#78647, 67 comments) that is starting to produce concrete PRs like #84275. Bug-fix velocity is high across gateway streaming, Desktop UI, state.db checkpointing, and provider compatibility layers, but many fixes have been waiting in review for weeks (see Backlog Watch). Overall project health is strong — activity is broad, security posture is being systematically improved, and a P1 webhook prompt-injection issue (#8820) was closed — though review throughput on long-lived PRs remains a bottleneck.

## 2. Releases

**None.** No new releases were published in the last 24 hours. The project appears to be between release cycles, with a large batch of pending fixes and the god-file refactor likely accumulating toward the next cut.

## 3. Project Progress

**Merged/closed today:** 2 issues closed and 2 PRs merged/closed. The two closed issues are identifiable:

- **[#8820 — [Security, P1] Webhook routes forward attacker-controlled payload fields directly into agent prompt](https://github.com/NousResearch/hermes-agent/issues/8820)** — *CLOSED.* A serious prompt-injection vector in the generic webhook adapter (distinct from `INSECURE_NO_AUTH`; exploitable even with valid HMAC). Closure indicates a fix landed for this P1.
- **[#84218 — [Bug, duplicate] Title gen "auto" label misleading; routes to fast model](https://github.com/NousResearch/hermes-agent/issues/84218)** — *CLOSED as duplicate*, signaling the issue is already tracked elsewhere.

**Notable feature/refactor progress (open PRs advancing the roadmap):**

- **[PR #84275 — refactor(conversation_loop): extract slice CL-R1-1 into agent/conversation_text.py](https://github.com/NousResearch/hermes-agent/pull/84275)** — First byte-verbatim shard of the 7,757-line `conversation_loop.py`, executing the god-file decomposition policy from EPIC #78647. The epic now has a concrete, reviewable first step.
- **[PR #82961 — feat(tts): add native VoxCPM provider](https://github.com/NousResearch/hermes-agent/pull/82961)** — New local TTS provider with voice design, reference-audio cloning, and 30-language support. A significant offline capability addition awaiting merge.
- **[PR #84273 — feat(desktop): add Settings toggle for vibe hearts](https://github.com/NousResearch/hermes-agent/pull/84273)** — Feature requested in issue #84272 and implemented the same day; strong signal of a responsive maintainer loop for Desktop UX polish.

## 4. Community Hot Topics

- **[#78647 — Epic: Shard all 20 god files — repo-wide god-file decomposition (67 comments)](https://github.com/NousResearch/hermes-agent/issues/78647)** — The most active thread by far. Underlying need: maintainability and contributor onboarding are being choked by 20 oversized files (e.g., `conversation_loop.py` at 7,306–7,757 lines). The community/automation around this has turned it into standing policy (2026-08): god files are sharded, never reverted.
- **[#78661 — Desktop setup wizard should offer option to connect to existing remote gateway (5 comments)](https://github.com/NousResearch/hermes-agent/issues/78661)** — Top user-facing request. New Desktop users with an existing remote Hermes gateway are forced through local install; there is no "connect to remote" path. Expect this to influence the Desktop onboarding roadmap.
- **[#82591 — EPIC: Kanban zero-authority workers, durable publication, safe reclaim, and godfile eradication (4 comments)](https://github.com/NousResearch/hermes-agent/issues/82591)** — The umbrella epic for the security campaign filed today; contains a complete 3-part implementation plan. This is the strategic roadmap document for the next several weeks.
- **[#78641 — Shard agent/conversation_loop.py (4 comments)](https://github.com/NousResearch/hermes-agent/issues/78641)** — The specific god-file sub-issue now being executed by PR #84275.
- **[#8820 — Webhook prompt-injection security issue (4 comments, now closed)](https://github.com/NousResearch/hermes-agent/issues/8820)** — High engagement on a security finding; closure is a positive trust signal.

**Analysis:** The community is bifurcated — automated/contributor energy is concentrated on architecture (god-file sharding, security campaign), while organic user requests cluster around Desktop UX and self-hosted-provider gaps.

## 5. Bugs & Stability

**Ranked by severity:**

- **[PR #78590 — [P1, install/update] `hermes update` can report success while leaving gateway on pre-update modules → next turn dies with `ImportError`](https://github.com/NousResearch/hermes-agent/pull/78590)** — Highest-severity item in flight. A blanket exception handler masks aborted gateway restarts; fix exists but remains unmerged since 2026-08-04.
- **[#84158 — [P2] Harmony-format tool calls leak as raw text for self-hosted gpt-oss models via OpenAI-compatible endpoints (Ollama, vLLM)](https://github.com/NousResearch/hermes-agent/issues/84158)** — `sanitize_harmony_tokens` only runs for the Codex backend, so self-hosted gpt-oss users see raw tool-call/reasoning tokens. Affects a growing self-hosted segment. **No fix PR yet.**
- **[#84207 — [P2] Interrupted turn (exit 130) delivers zero user feedback — silent death until re-ping](https://github.com/NousResearch/hermes-agent/issues/84207)** — Client disconnect during a tool call ends the turn with `response_len=0` and no distinction between deliberate stop and disconnect. **No fix PR yet.** Related PR #63292 (interrupted completions as metadata) is still open and may partially address this.
- **[#84285 — [Bug] Planned restart drops final response after after-turn drain](https://github.com/NousResearch/hermes-agent/issues/84285)** — A regression/edge case in the #77184 restart fix: the drain check clears too early. **No fix PR yet.**
- **[#84284 — [Bug] `/resume <title>` walks the `/new` parent chain and switches to the wrong session](https://github.com/NousResearch/hermes-agent/issues/84284)** — Session restore can land on the most recent descendant rather than the named session. **No fix PR yet.**

**Fix PRs filed today (good velocity):**

- **[PR #84281 — fix(gateway): stop a lone surrogate silently killing the session SSE stream](https://github.com/NousResearch/hermes-agent/pull/84281)** — Sibling follow-up to the class-level lone-surrogate chokepoint sweep; closes remaining gateway delivery gaps.
- **[PR #84277 — fix(state): PASSIVE not TRUNCATE for all state.db checkpoints (#45383)](https://github.com/NousResearch/hermes-agent/pull/84277)** — WAL checkpoint churn from cron agents racing; switches to `PASSIVE` to avoid fleet-wide lock contention.
- **[PR #84279 — fix(gateway): restore Thinking blocks in Desktop sessions](https://github.com/NousResearch/hermes-agent/pull/84279)** — Reasoning was rewritten into fake `tool.progress` events; restores `reasoning.available` so Desktop reducers render Thinking blocks.
- **[PR #84276 — fix(bedrock): use `split` not `rsplit` in `_bedrock_reasoning_stale_floor`](https://github.com/NousResearch/hermes-agent/pull/84276)** — `rsplit(".", 1)` mangles model slugs like `anthropic.claude-sonnet-4.6` into `"6"`.
- **[PR #84278 — fix(tools): scope replay guard to similarity candidate](https://github.com/NousResearch/hermes-agent/pull/84278)** — Prevents replayed replace-mode patches from being reinterpreted as larger structured regions.

## 6. Feature Requests & Roadmap Signals

**Strongest roadmap signals (Desktop is the hottest area):**

- **[#78661 — Connect to existing remote gateway from Desktop setup wizard](https://github.com/NousResearch/hermes-agent/issues/78661)** — The most-commented feature request after the god-file epic. High likelihood of landing in the next Desktop release; it directly impacts first-run adoption for multi-machine users.
- **[#84272 + PR #84273 — Vibe hearts toggle](https://github.com/NousResearch/hermes-agent/issues/84272)** — Requested and implemented same day. Clear candidate for the next release; also highlights that the existing "Message Reactions" setting is confusingly scoped.
- **[PR #82961 — Native VoxCPM TTS provider](https://github.com/NousResearch/hermes-agent/pull/82961)** — Local voice design + cloning, 30 languages. If merged, this is a flagship offline-TTS feature; pinged as `sweeper:risk-automation`, suggesting it is near final review.
- **[#84243 — Custom Markdown extension for interactive action buttons in chat](https://github.com/NousResearch/hermes-agent/issues/84243)** — Power-user request for agent-rendered UI elements beyond GFM. Interesting product direction but no maintainer signal yet.
- **[#84280 — Chat API should accept a profile parameter](https://github.com/NousResearch/hermes-agent/issues/84280)** — API ergonomics gap; likely relevant to the gateway/profiles work already underway in the security campaign (#84266).
- **[#57848 — Custom background image/wallpaper for Desktop](https://github.com/NousResearch/hermes-agent/issues/57848)** — Older (July 3), low-urgency personalization request; still open with no maintainer response.

**Prediction:** Next version will likely include the Desktop vibe-hearts toggle (#84273), the VoxCPM TTS provider (#82961) if review completes, and the first god-file shard (#84275). The remote-gateway onboarding flow (#78661) is the most probable larger Desktop feature to be scheduled.

## 7. User Feedback Summary

**Pain points expressed this cycle:**

- **Silent failures erode trust.** Two separate reports today (#84207, #84285) describe the agent "dying silently" — an interrupted turn produces zero response, and a planned restart can still drop the final reply. Users explicitly ask for distinguishing deliberate stop vs. client disconnect.
- **Desktop onboarding assumes local-first.** A user on macOS with a remote gateway is forced into the local "Install Hermes" flow with no alternative (#78661) — a friction point for multi-device workflows.
- **Self-hosted model users are getting second-class output.** gpt-oss via Ollama/vLLM leaks raw Harmony-format tool-call tokens (#84158); the fix is gated behind `_is_codex_backend()`, which users experience as an unexplained formatting bug.
- **Session management is confusing.** `/resume <title>` landing on the wrong session (#84284) and the Title-gen "auto · use main model" label being false (#84218) both point to UI/state-model mismatches that erode confidence.
- **Config/state hygiene regressions.** NixOS/group-shared deployments lose group permissions on memory files (PR #23100, open since May); cron fleets cause WAL checkpoint storms (PR #84277).

**Satisfaction signals:**

- Feature requests are being implemented same-day in some cases (#84272 → #84273), showing strong Desktop responsiveness.
- A P1 webhook security hole (#8820) was closed — a visible security win.
- The TTS community is getting real investment in local, privacy-preserving capability (#82961).

## 8. Backlog Watch

**PRs needing maintainer attention (long-open, no merge):**

- **[PR #23100 — fix(memory): preserve existing file permissions on memory updates (open since 2026-05-10)](https://github.com/NousResearch/hermes-agent/pull/23100)** — ~3 months open. Breaks group-shared deployments on NixOS; correctness fix with clear repro.
- **[PR #23016 — fix(extract_pymupdf): guard against malformed page range (open since 2026-05-10)](https://github.com/NousResearch/hermes-agent/pull/23016)** — Simple crash guard, stale for 3 months.
- **[PR #56522 — fix: handle streamed provider error events (open since 2026-07-01)](https://github.com/NousResearch/hermes-agent/pull/56522)** — Fixes silent failure when OpenAI-compatible providers emit errors as streamed content (reproduced on DashScope). Directly related to the "silent death" class users complain about.
- **[PR #48192 — fix(anthropic): normalize forced tool_choice name to `mcp__` on OAuth wire (open since 2026-06-18)](https://github.com/NousResearch/hermes-agent/pull/48192)** — Billing-classifier workaround; affects Anthropic OAuth users.
- **[PR #53894 — fix(hooks): session-owned profile-keyed shell hooks for dashboard/TUI (open since 2026-06-28, `needs-decision`)](https://github.com/NousResearch/hermes-agent/pull/53894)** — Windows hooks only work from CLI; fix touches many components and is blocked on a decision.
- **[PR #63292 — fix(desktop): treat interrupted completions as metadata (open since 2026-07-12)](https://github.com/NousResearch/hermes-agent/pull/63292)** — Directly relevant to today's #84207 "silent death" report; should be prioritized in light of new user complaints.
- **[PR #71947 — fix(terminal): don't persist delegate_task lineage marker in shared snapshot (open since 2026-07-26)](https://github.com/NousResearch/hermes-agent/pull/71947)** — Fixes misidentification of ordinary commands as delegated children.
- **[PR #70667 — test(kanban): cover delegated CLI refusal exit status (open since 2026-07-24, `MERGEABLE / BLOCKED`, no checks reported)](https://github.com/NousResearch/hermes-agent/pull/70667)** — A test-only PR stuck in CI limbo with no reviewer activity.

**Issues needing maintainer response:**

- **[#78647 — God-file sharding epic (67 comments, `needs-decision`)](https://github.com/NousResearch/hermes-agent/issues/78647)** — The community's most active thread; the `needs-decision` tag suggests maintainers must define the sharding order/ownership before the 20-file sweep can proceed.
- **[#78661 — Desktop remote-gateway onboarding (5 comments, no maintainer reply shown)](https://github.com/NousResearch/hermes-agent/issues/78661)** — Top user request without a visible maintainer commitment.
- **[#57848 — Custom Desktop wallpaper (open since 2026-07-03, no maintainer response)](https://github.com/NousResearch/hermes-agent/issues/57848)** — Low priority but a quick win for Desktop goodwill.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-12

## 1. Today's Overview
PicoClaw saw moderate activity in the last 24 hours: 3 issues were updated (2 still open, 1 closed) and 6 pull requests were updated, all still open. No new releases were published. The most significant movement is around bug fixes: a new LINE webhook configuration bug was reported and immediately addressed by PR #3329, while a long-standing routed-agent context bug (#3301) remains open with a fix PR waiting. Overall, the project is healthy but showing a growing maintenance backlog, with several PRs and issues marked `[stale]` yet still requiring review.

## 2. Releases
No new releases were published in the last 24 hours. The latest known version remains **PicoClaw v0.3.1** (`2cf030d2`), referenced in recent bug reports.

## 3. Project Progress
No PRs were merged or closed in the last 24 hours. The only closed item was issue **#3294**, which was closed as `[stale]` after not being resolved.

Open PRs that advanced or remain under review:
- [#3316 fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316) — addresses issue #3301
- [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)
- [#3317 feat(providers): log prompt cache tokens in LLM response debug output](https://github.com/sipeed/picoclaw/pull/3317)
- [#3314 Fix: agent not able to execute shell command added to customAllowPatterns](https://github.com/sipeed/picoclaw/pull/3314)
- [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)
- [#3329 fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329)

No feature work has been merged yet, but several substantial fixes and features are ready for maintainer attention.

## 4. Community Hot Topics
The most active discussions are bug reports with 3 comments each:

- [#3301 [BUG] /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules](https://github.com/sipeed/picoclaw/issues/3301) — Users routing chats to non-default agents report that context is not remembered and auto-compaction never triggers. This points to a core session-context management gap for dispatch-rule scenarios. A fix PR (#3316) exists but has not been merged.

- [#3294 [stale] /list models only shows the current model instead of all configured models](https://github.com/sipeed/picoclaw/issues/3294) — Users expect `/list models` to show all configured models, but it only displays the active model/provider. This was closed as stale, but it may still reflect a real UX gap in model management commands.

There were no significant reactions on recent PRs, indicating the community is engaged through detailed bug reports and PR submissions rather than votes or emoji feedback.

## 5. Bugs & Stability
Ranked by severity:

1. **High — #3301: Routed-agent context, `/clear`, and auto-compression broken**  
   [Issue #3301](https://github.com/sipeed/picoclaw/issues/3301)  
   In chats routed to a non-default agent via dispatch rules, the agent does not remember previous messages, and auto-compaction never triggers. This directly affects core agent memory behavior.  
   **Fix PR exists:** [#3316](https://github.com/sipeed/picoclaw/pull/3316)

2. **Medium — #3328: LINE webhook_host/webhook_port are never read**  
   [Issue #3328](https://github.com/sipeed/picoclaw/issues/3328)  
   `channel_list.line.settings.webhook_host` and `webhook_port` exist in config, have defaults, and are documented, but nothing consumes them. The user gets no warning that these settings have no effect.  
   **Fix PR exists:** [#3329](https://github.com/sipeed/picoclaw/pull/3329)

3. **Low / Closed — #3294: `/list models` only shows current model**  
   [Issue #3294](https://github.com/sipeed/picoclaw/issues/3294)  
   Users expected all configured models to be listed, but only the current model/provider is shown. The issue was closed as stale without a merged fix.

## 6. Feature Requests & Roadmap Signals
Several user-contributed PRs signal likely roadmap directions:

- **Native Exa web search provider** — [#3299](https://github.com/sipeed/picoclaw/pull/3299)  
  Adds Exa as a `tools.web` / `web_search` provider, including date range filters. This would expand PicoClaw's search backend beyond current providers.

- **Telegram topics in private bot chats** — [#3315](https://github.com/sipeed/picoclaw/pull/3315)  
  Fixes topic handling for private chats where Telegram uses `IsTopicMessage` instead of `IsForum`. Useful for bot users with forum-topic-mode enabled.

- **LLM prompt cache token logging** — [#3317](https://github.com/sipeed/picoclaw/pull/3317)  
  Adds visibility of cache tokens in LLM response debug output, especially relevant for DeepSeek/Cloudflare AI Gateway providers. This is an observability improvement likely to be appreciated by power users.

- **LINE webhook config warning** — [#3329](https://github.com/sipeed/picoclaw/pull/3329)  
  Instead of silently accepting inert webhook settings, this PR makes PicoClaw warn the user. This aligns with a broader pattern of improving configuration transparency.

Prediction: If maintainers review the current PR queue, the next version could include Exa web search, Telegram private-chat topic support, cache-token logging, and the LINE webhook warning fix.

## 7. User Feedback Summary
Real user pain points from the last 24 hours:

- **Dispatch-rule agent sessions are unreliable.** Users report that non-default agents "aren't remembering anything" and auto-compaction never triggers. This is a serious usability issue for multi-agent setups.
- **Configuration settings that silently do nothing are frustrating.** The LINE webhook issue is a clear example: the fields are documented and defaulted, yet setting them has no effect and no warning.
- **Model listing is confusing.** Users expect `/list models` to show all configured models, not just the active one.
- **Telegram topic support is incomplete.** Users want private bot chats with forum topic mode enabled to work correctly.
- **Observability gaps exist.** Advanced users want cache-token metrics in LLM debug logs to better understand provider usage and costs.

The overall sentiment appears constructive: users are filing detailed, reproducible bug reports and submitting PRs, but they are also waiting on maintainer review, especially for the routed-agent context fix.

## 8. Backlog Watch
Items that may need maintainer attention soon:

- **PR #3299 — Add native Exa web search provider**  
  [https://github.com/sipeed/picoclaw/pull/3299](https://github.com/sipeed/picoclaw/pull/3299)  
  Open since 2026-07-26, no recorded comments. A notable feature addition that has been idle for over two weeks.

- **Issue #3301 — Routed-agent context/compression bug**  
  [https://github.com/sipeed/picoclaw/issues/3301](https://github.com/sipeed/picoclaw/issues/3301)  
  Open since 2026-07-29, with 3 comments and a ready fix PR (#3316). The bug affects core agent memory and should be prioritized.

- **PR #3316 — Routed-agent context management fix**  
  [https://github.com/sipeed/picoclaw/pull/3316](https://github.com/sipeed/picoclaw/pull/3316)  
  Open since 2026-08-03, updated 2026-08-11, but not merged. Directly resolves a high-severity bug.

- **PR #3315 — Support topics in private bot chats**  
  [https://github.com/sipeed/picoclaw/pull/3315](https://github.com/sipeed/picoclaw/pull/3315)  
  Open since 2026-08-03, updated 2026-08-11, no recorded comments.

- **PR #3314 — Fix customAllowPatterns shell command execution**  
  [https://github.com/sipeed/picoclaw/pull/3314](https://github.com/sipeed/picoclaw/pull/3314)  
  Open since 2026-08-03, updated 2026-08-11. Fixes an allow-list precedence issue that prevented commands like `git push` from running.

Several of these are marked `[stale]`, but they have recent updates and appear to be substantive. Maintainer review or explicit closure is needed to reduce queue uncertainty.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-12

## Today's Overview

NanoClaw showed moderate activity in the last 24 hours: 1 issue was updated, 8 pull requests were touched, and 3 PRs were closed, while no new releases shipped. The main feature momentum is around remote Streamable HTTP MCP servers ([#3092](https://github.com/nanocoai/nanoclaw/pull/3092), [#3221](https://github.com/nanocoai/nanoclaw/pull/3221)) and the ongoing agent-template/plugin migration ([#2909](https://github.com/nanocoai/nanoclaw/pull/2909), [#3220](https://github.com/nanocoai/nanoclaw/pull/3220)). Stability remains a concern: the most visible open issue describes silent inbound message loss ([#3226](https://github.com/nanocoai/nanoclaw/issues/3226)), and a long-open fix for silently dropped unknown slash commands ([#2346](https://github.com/nanocoai/nanoclaw/pull/2346)) is still unmerged. Overall, maintainer activity looks healthy, but reliability fixes need attention to avoid user-facing “agent ignored me” scenarios.

## Releases

No new releases in this window.

## Project Progress

- [#3190](https://github.com/nanocoai/nanoclaw/pull/3190) — **CLOSED** — `feat: add Tavily MCP tool skill`. Adds a standalone utility skill for Tavily search.
- [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) — **CLOSED** — `feat: support remote Streamable HTTP MCP servers`. Adds engine/Claude provider support for `{ type: 'http', url }` MCP server entries.
- [#3221](https://github.com/nanocoai/nanoclaw/pull/3221) — **CLOSED** — `feat(providers): remote Streamable HTTP MCP servers for codex and opencode`. Builds on [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) and fixes provider payloads that still assumed stdio-only MCP config.

These three closures are likely release candidates; [#3221](https://github.com/nanocoai/nanoclaw/pull/3221) and [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) together form a complete cross-provider feature.

## Community Hot Topics

- [Issue #3226](https://github.com/nanocoai/nanoclaw/issues/3226) — **“Inbound messages silently dropped when a platform reuses a message id”**. This is the only issue with an explicit comment count in the window. Underlying need: idempotent per-session message handling; users cannot distinguish platform deduplication from an agent that ignored them.
- [PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346) — **`fix(formatter): treat unknown slash commands as normal chat`**. Updated in this window. Underlying need: unknown slash commands should degrade to normal chat, not be silently dropped by the Agent SDK.

## Bugs & Stability

Roundup of active stability issues, ranked by severity:

1. **High** — [#3226](https://github.com/nanocoai/nanoclaw/issues/3226): reused platform message IDs can cause inbound messages to be silently dropped before reaching the agent. No fix PR exists yet.
2. **Medium-High** — [#2346](https://github.com/nanocoai/nanoclaw/pull/2346): unknown slash commands are categorized as `passthrough`, producing output without `<message>` blocks and causing response loss. A fix PR is open but not merged.
3. **Medium** — [#3145](https://github.com/nanocoai/nanoclaw/pull/3145): existing messaging-group wirings may be missing channel destinations; migration 021 backfills destinations while preserving custom names. Fix PR open.
4. **Medium** — [#3195](https://github.com/nanocoai/nanoclaw/pull/3195): NanoClaw upgrades are not transactional; a failed upgrade can leave the install in a bad state. Fix PR open.
5. **Low-Medium** — [#3220](https://github.com/nanocoai/nanoclaw/pull/3220): includes hardening for template stamp-time symlink/caps/secret handling as part of the agent-plugin migration.

No regressions or crash reports were recorded in this window.

## Feature Requests & Roadmap Signals

No new user-requested feature issues appeared in the last 24 hours. Roadmap signals come mainly from core-team PRs:

- **Remote Streamable HTTP MCP servers for all providers** — likely in the next release: [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) and [#3221](https://github.com/nanocoai/nanoclaw/pull/3221) are closed and cover engine, Claude, codex, and opencode.
- **Agent templates → Agent Plugins 1.0.0 directories** — [#3220](https://github.com/nanocoai/nanoclaw/pull/3220) is an open `feat!` (breaking change), paired with [#2909](https://github.com/nanocoai/nanoclaw/pull/2909) (setup-wizard flow and first-agent stamping). This looks like a planned template/plugin format migration, possibly near-term.
- **Tavily MCP tool skill** ([#3190](https://github.com/nanocoai/nanoclaw/pull/3190)) is closed and is a low-risk additive skill that could ship in the same release.

## User Feedback Summary

The main user pain point in this window is silent unreliability: inbound messages can disappear with no user-visible signal ([#3226](https://github.com/nanocoai/nanoclaw/issues/3226)), and malformed/unknown slash commands can cause the agent to produce no visible response ([#2346](https://github.com/nanocoai/nanoclaw/pull/2346)). Both create the same symptom: “the agent ignored me.” Another integration concern is existing wirings lacking destinations ([#3145](https://github.com/nanocoai/nanoclaw/pull/3145)), which may affect users upgrading with pre-existing messaging groups. There was no explicit positive feedback or satisfaction signal in the collected data; the clearest sentiment is a need for transparent handling of edge cases and idempotent message routing.

## Backlog Watch

- [#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — formatter fix for unknown slash commands, open since **2026-05-08** (~3 months) and updated Aug 12. Needs maintainer review/merge to close a long-standing silent-response bug.
- [#2909](https://github.com/nanocoai/nanoclaw/pull/2909) — core-team template setup flow and first-agent stamping, open since **2026-07-02** (~6 weeks). Likely tied to [#3220](https://github.com/nanocoai/nanoclaw/pull/3220) and needs coordination to avoid conflicting with the plugin migration.
- [#3145](https://github.com/nanocoai/nanoclaw/pull/3145) — db migration backfill for existing wirings, open since **2026-07-28** (~2 weeks). Important for existing installations; should be prioritized for upgrade stability.
- [#3195](https://github.com/nanocoai/nanoclaw/pull/3195) — transactional upgrades, open since **2026-08-06**. Important for safe update paths; needs review and test coverage.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-12

## 1. Today's Overview

IronClaw saw exceptionally high activity on August 12, 2026: **19 issues** and **50 PRs** were updated in the last 24 hours, with **21 PRs merged/closed** and **6 issues closed**. The core team (serrrfirat, henrypark133, italic-jinxin, BenKurrek) drove nearly all changes, with a strong focus on the "reborn" architecture overhaul — loop reliability, memory contract correctness, disclosure tooling, and profile-agnostic durable storage — alongside substantial channel work (Slack, Telegram, unified adapter model) and WebUI features. No new releases were published. The project is clearly in a high-velocity integration phase, with open epics on pluggable agent loops (#7482), automation reliability (#6879), and an AI-first design system (#7038) signaling a feature-rich v1.3.0 ahead.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

**Merged/closed PRs today (visible in top-activity set):**
- [PR #7471](https://github.com/nearai/ironclaw/pull/7471) — `fix(processes)`: lease expiry now recovers safe runs instead of failing them; process-journal heartbeat pool isolated from data-plane PostgreSQL traffic.
- [PR #7503](https://github.com/nearai/ironclaw/pull/7503) — `fix(loop)`: accepted task is retained across context eviction; oversized tasks fail with `BudgetExceeded` instead of being silently dropped.
- [PR #7514](https://github.com/nearai/ironclaw/pull/7514) — `fix`: Railway shell enabled for hosted volume profile via strict release-only alias.
- [PR #7470](https://github.com/nearai/ironclaw/pull/7470) — `fix(threads)`: restored listability for unprojected `thread_index` rows missing ordered-projection metadata.

**Closed issues (features/bugs resolved):**
- [Issue #7405](https://github.com/nearai/ironclaw/issues/7405) — Improved deferred tool discovery with complete signatures and namespace-aware catalog previews.
- [Issue #7488](https://github.com/nearai/ironclaw/issues/7488) — Bridge tools no longer hardcoded `Exclusive`; discovery batches serialize correctly.
- [Issue #7487](https://github.com/nearai/ironclaw/issues/7487) — `tool_search` no longer disarms the describe-first safety net; `oneOf` required handling fixed.
- [Issue #6984](https://github.com/nearai/ironclaw/issues/6984) — Explicit Anthropic `cache_control` breakpoints placed in rig adapter + OAuth transport.
- [Issue #7481](https://github.com/nearai/ironclaw/issues/7481) — Long conversation titles now revealed on hover in the left nav.
- [Issue #7483](https://github.com/nearai/ironclaw/issues/7483) — Default NEAR AI connection and model probes now use the authenticated runtime session.

**Features advanced via open PRs:** OMP core-tool contract with engines and benchmark arm ([#7491](https://github.com/nearai/ironclaw/pull/7491)), unified channel model — one `ChannelAdapter` for inbound/replies/notifications ([#7477](https://github.com/nearai/ironclaw/pull/7477)), tenant-scoped model selection policy ([#7428](https://github.com/nearai/ironclaw/pull/7428)), non-admin model preference settings ([#7440](https://github.com/nearai/ironclaw/pull/7440)), automation suggestion cards V1 backend ([#7498](https://github.com/nearai/ironclaw/pull/7498)), eight new Slack standard messaging ops ([#7515](https://github.com/nearai/ironclaw/pull/7515)), Telegram linked-device auth and session custody ([#7464](https://github.com/nearai/ironclaw/pull/7464)), always-on MEMORY.md prompt lane ([#7365](https://github.com/nearai/ironclaw/pull/7365)), and Anthropic prompt-cache preservation across tool promotion ([#7274](https://github.com/nearai/ironclaw/pull/7274)).

## 4. Community Hot Topics

- **[Issue #7482 — Epic: Pluggable agent loops](https://github.com/nearai/ironclaw/issues/7482)** (3 comments, highest engagement). Proposes IronClaw as a kernel — scheduling, tenancy, capability membrane, secrets mediation, egress boundary, durable audit — with agent loops and per-integration tools delegated to off-the-shelf ACP agents. High risk, spans `agent` and `tool` scope. The discussion underlines a growing community desire for modularity and vendor-neutral agent orchestration.

- **[Issue #7405 — Deferred tool discovery improvements](https://github.com/nearai/ironclaw/issues/7405)** (2 comments, now closed). Focused on reducing model turns via complete `tool_search` signatures and namespace-aware catalog previews. The underlying need: large tool counts are creating avoidable latency and uneven catalog awareness — a cost/performance concern.

- **[Issue #7505 — Memory target-alias resolution](https://github.com/nearai/ironclaw/issues/7505)** (1 comment, open). The shared write-tool prompt teaches every model that durable facts go to `target: memory`, but only the native provider resolves aliases — mem0 stores the literal string. Community attention here reflects that cross-provider memory consistency is now a first-class reliability concern.

## 5. Bugs & Stability

Ranked by severity:

1. **[#7485 — Token estimator double-counts ASCII](https://github.com/nearai/ironclaw/issues/7485)** (open). The transcript estimator's `bytes/2` bound wins for ASCII, producing 2 chars/token — halving the effective context window. Two inconsistent estimators compound the problem. Affects all loop-driven model turns; no fix PR yet.

2. **[#7484 — Context window silently evicts the task](https://github.com/nearai/ironclaw/issues/7484)** (open). The 128-message clamp in three independent places can evict the accepted user task without notice. Mitigation is in flight: [PR #7503](https://github.com/nearai/ironclaw/pull/7503) (merged) pins the task; [PR #7504](https://github.com/nearai/ironclaw/pull/7504) (open) adds typed forced-compaction on eviction.

3. **[#7508 — GitHub MCP extension confusing endpoint verification](https://github.com/nearai/ironclaw/issues/7508)** (open, QA bug, bug_bash_P2). Extension reports "already registered" but raises endpoint-verification concerns instead of connecting cleanly. Confusing UX for a common integration.

4. **[#7486 — Typed no-progress false positives](https://github.com/nearai/ironclaw/issues/7486)** (open). Idempotent reads/polling flagged `NoChange` by output hashing can terminally fail long legitimate runs; needs a warn-before-terminal path.

5. **[#7490 — `retry_disposition()` dead code](https://github.com/nearai/ironclaw/issues/7490)** (open). The ~25-category silent-redrive table is never wired; infra failures that should auto-recover may be failing instead.

6. **[#7505 — Memory target-alias contract bug](https://github.com/nearai/ironclaw/issues/7505)** (open). Fix PR [ #7512](https://github.com/nearai/ironclaw/pull/7512) moves resolution to the domain contract layer.

7. **[#7489 — 24 KiB preview ceiling + read-before-edit gate](https://github.com/nearai/ironclaw/issues/7489)** (open, tracking). Round-trip inflators in the coding-tool surface; likely resolved via the #7435 OMP cutover.

Also notable: [PR #7509](https://github.com/nearai/ironclaw/pull/7509) (open) replaces credential-content rejection with deterministic redaction so a single false positive can no longer block prompt construction — a safety hardening. Previously reported bugs #7488, #7487, #7483 were all fixed and closed in this window.

## 6. Feature Requests & Roadmap Signals

- **[Issue #7517 — Staking for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517)** (new, user-reported, 0 comments). Cloud.near.ai users signing in with Google/GitHub have no path to stake for inference; credits only offer Stripe, and NEAR wallet cannot be attached to an existing OAuth account. A concrete onboarding/financing gap likely to attract near-term product attention.

- **[Issue #7496 — Host-mediated IdentyClaw Passport](https://github.com/nearai/ironclaw/issues/7496)** (new). Proposes `builtin.idcp` + practitioner helper so agents can use IdentyClaw Passport without exposing private keys — a security-forward feature aligned with the host-meditated kernel direction.

- **[Issue #7482 — Pluggable agent loops epic](https://github.com/nearai/ironclaw/issues/7482)** (open, high risk). ACP executor, edge credential injection, kernel architecture. If prioritized, this reshapes the agent runtime in a future minor release.

- **[Issue #7467 — Profile-agnostic durable state](https://github.com/nearai/ironclaw/issues/7467)** (open, high risk). Migration of legacy profile roots; implementation PR [ #7456](https://github.com/nearai/ironclaw/pull/7456) is already open — likely lands in v1.3.0.

- **v1.3.0 signals**: With #6879 (automation runs), #7405 (tool discovery — closed), and #7038 (design system) all tagged v1.3.0, the next release appears centered on unattended run reliability, developer/catalog UX, and a Storybook-backed design system.

## 7. User Feedback Summary

- **Inference staking barrier** ([#7517](https://github.com/nearai/ironclaw/issues/7517)): A real end-user blocked from staking because they signed in via Google/GitHub rather than NEAR — highlights that crypto-native payment rails are still a friction point for mainstream users.
- **GitHub MCP extension confusion** ([#7508](https://github.com/nearai/ironclaw/issues/7508)): QA-reported startup flow is misleading; users are asked to verify endpoints instead of simply connecting.
- **Automation unreliability** ([#6879](https://github.com/nearai/ironclaw/issues/6879)): The same stored prompt sometimes succeeds, sometimes produces nothing on small models (DeepSeek V4 Flash) — structural, not model noise. A recurring practitioner pain point.
- **Context/token reliability** ([#7484](https://github.com/nearai/ironclaw/issues/7484), [#7485](https://github.com/nearai/ironclaw/issues/7485)): Silent task eviction and a halved context window are the kind of correctness issues that erode trust in unattended runs; both have active fix PRs, which is a positive signal.
- **Satisfaction drivers**: The wave of closed fixes (#7487, #7488, #7483, #7470) plus UX polish (#7481 hover titles) shows maintainers are responsive to both deep reliability bugs and small quality-of-life issues.

## 8. Backlog Watch

- **[Issue #6879 — Automation runs are hit-or-miss](https://github.com/nearai/ironclaw/issues/6879)** — created 2026-07-29, 14 days old, **0 comments**, tagged epic and v1.3.0. A core reliability complaint with no maintainer response yet; given the v1.3.0 tag, it needs a concrete plan soon.

- **[Issue #7038 — Storybook + AI-first Design System epic](https://github.com/nearai/ironclaw/issues/7038)** — created 2026-08-03, 9 days old, 0 comments, despite having a full proposal package (PR #7257). High-value UX initiative stalling without discussion.

- **[PR #7274 — Preserve Anthropic prompt cache across tool promotion](https://github.com/nearai/ironclaw/pull/7274)** — open since 2026-08-06 (6 days), core-authored, no visible review activity. Cost/latency win for Anthropic users; deserves reviewer attention.

- **[PR #7365 — Memory-save guidance + always-on MEMORY.md prompt lane](https://github.com/nearai/ironclaw/pull/7365)** — open since 2026-08-07 (5 days), addresses the widely-felt "fact from conversation A not recalled in B" bug (#7185). Large diff, but central to memory reliability.

---

**Overall health assessment:** IronClaw is in a high-velocity, healthy state — 21 PRs merged/closed in 24 hours, with fixes landing faster than new bugs are filed. The concentration of `reborn`-scoped loop and memory fixes indicates a deliberate hardening phase ahead of v1.3.0. Watch items: the unaddressed automation epic (#6879) and the risk-heavy pluggable-agent-loops epic (#7482) will shape the next major feature cycle.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-12

## 1. Today's Overview

LobsterAI is in an active release cycle: 1 new release (2026.8.11) landed, 9 PRs were updated with 7 closed/merged, and 4 of 6 updated issues remain open. However, much of the issue-tracker activity is stale-bot marking old, unresolved user reports — several date back to late March / early April. The PR side is healthier, with concrete fixes for Windows plugin installation, shell icon handling, model-selector behavior, and overlay/escape UX. A `release/2026.8.12` PR was also closed today, suggesting the next release is already in preparation.

---

## 2. Releases

### LobsterAI 2026.8.11
[Release 2026.8.11](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.8.11)

Announced changes include:

- `feat(cowork): add collapse-agent-tasks shortcut and allow modifier shortcuts while typing` — [PR #2469](https://github.com/netease-youdao/LobsterAI/pull/2469)
- `feat(cowork): mark scheduled task sessions in sidebar` — by [liuzhq1986](https://github.com/netease-youdao/LobsterAI/pull/2469)

No breaking changes or migration notes were published with this release.

---

## 3. Project Progress

Several meaningful PRs were closed/merged in the last 24 hours:

- **[#2480 — Release/2026.8.12](https://github.com/netease-youdao/LobsterAI/pull/2480)** — Closed; release engineering for the next version.
- **[#2479 — fix(plugins): preserve junctions during Windows install](https://github.com/netease-youdao/LobsterAI/pull/2479)** — Fixes Windows `EPERM` symlink failures by staging plugin installs on the same volume and atomically renaming into place.
- **[#2478 — fix(shell): avoid unsupported large file icon size on macOS/Windows](https://github.com/netease-youdao/LobsterAI/pull/2478)** — Corrects `app.getFileIcon` size handling; `large` is only used on Linux, `normal` elsewhere.
- **[#2475 — fix(model-selector): give each model its own thinking level](https://github.com/netease-youdao/LobsterAI/pull/2475)** — Fixes a bug where changing thinking depth for one model reset another model's setting.
- **[#2477 — Release/2026.8.10](https://github.com/netease-youdao/LobsterAI/pull/2477)** — Merged to `main`; adds configurable model thinking levels, improves Cowork progress visibility, scheduled-task identification, local-file workflows, startup/runtime reliability, and settings interactions.
- **[#2476 — feat(ui): dismiss the topmost overlay on Escape](https://github.com/netease-youdao/LobsterAI/pull/2476)** — Fixes double-handling of Escape when nested modals are involved.

One older PR, **[#1233 — feat(model): add official site and API Key guidance for providers](https://github.com/netease-youdao/LobsterAI/pull/1233)**, was closed as stale. It contained useful model-provider UX work but did not appear to merge.

---

## 4. Community Hot Topics

The most-commented issues updated today all have 2 comments each:

- **[#1179 — 3.31版本强制沙箱怎么关？](https://github.com/netease-youdao/LobsterAI/issues/1179)**  
  Users are frustrated that version 3.31 forces sandbox mode and offers no obvious way to disable it. The author reports that rolling back to 3.30 works. Underlying need: **configurable sandbox behavior and better UI/or documentation for security settings**.

- **[#1236 — [bug] 插件 ID 不匹配警告](https://github.com/netease-youdao/LobsterAI/issues/1236)**  
  A configuration warning appears at every startup because the `mcp-bridge` plugin entry key does not match its manifest-declared ID. Underlying need: **consistent config schema validation and less noisy startup logs**.

- **[#2071 — 创建定时任务错误](https://github.com/netease-youdao/LobsterAI/issues/2071)**  
  A scheduled-task creation failure on version 2026.5.27. It was closed as stale, but the underlying workflow still matters to users. Underlying need: **reliable scheduled-task creation**.

There was also **[#1173 — 卸载之后程序还能运行？？](https://github.com/netease-youdao/LobsterAI/issues/1173)** with 1 comment but high severity: after Windows uninstall, the app remained functional and could still send Feishu messages. This is a trust-critical report, even if it may be a normal uninstall-flow bug.

---

## 5. Bugs & Stability

Ranked by severity:

1. **High — Gateway restart loop when editing a custom agent**  
   [#1180 — 修改自建agent可能会触发网关反复重启](https://github.com/netease-youdao/LobsterAI/issues/1180)  
   Editing a self-built agent's icon triggers repeated gateway restarts; deleting the agent returns to normal. Still open, no linked fix PR.

2. **High — Process continues after uninstall**  
   [#1173 — 卸载之后程序还能运行？？](https://github.com/netease-youdao/LobsterAI/issues/1173)  
   Windows uninstall leaves the app running and able to send messages. User explicitly suspects a backdoor. Needs an official investigation/response. No fix PR identified.

3. **Medium — Forced sandbox regression in 3.31**  
   [#1179 — 3.31版本强制沙箱怎么关？](https://github.com/netease-youdao/LobsterAI/issues/1179)  
   No documented option to disable sandbox; rollback to 3.30 is the current workaround. Open.

4. **Medium — Scheduled-task creation error**  
   [#2071 — 创建定时任务错误](https://github.com/netease-youdao/LobsterAI/issues/2071)  
   Still reproducible on 2026.5.27 per user; closed as stale without a visible fix.

5. **Low — Plugin ID mismatch warnings**  
   [#1236 — [bug] 插件 ID 不匹配警告](https://github.com/netease-youdao/LobsterAI/issues/1236)  
   Cosmetic/config-warning issue; closed as stale.

Today's merged PRs also fixed several stability bugs: Windows plugin junction preservation ([#2479](https://github.com/netease-youdao/LobsterAI/pull/2479)), macOS/Windows icon-size crash/failure ([#2478](https://github.com/netease-youdao/LobsterAI/pull/2478)), per-model thinking-level overwrite ([#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)), and nested Escape handling ([#2476](https://github.com/netease-youdao/LobsterAI/pull/2476)).

---

## 6. Feature Requests & Roadmap Signals

- **[#1174 — Increase multiple custom model providers](https://github.com/netease-youdao/LobsterAI/issues/1174)**  
  Users want to keep old custom providers while adding new ones, instead of being limited to a single custom provider. This remains open since Mar 31. Given the recent work on model-selector behavior ([#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)) and model-provider UX ([#1233](https://github.com/netease-youdao/LobsterAI/pull/1233)), this area is clearly active and a good candidate for a future release.

- **Provider discoverability / API-key guidance**  
  PR [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) would have added official-site links and "Get API Key" shortcuts for model providers. It was closed stale but may be revived; it directly complements recent model-configuration investment.

- **Cowork session list clarity**  
  [#1181 — fix(cowork): hide OpenClaw main agent sessions from session list](https://github.com/netease-youdao/LobsterAI/pull/1181) has been open since Apr 1. With the Cowork improvements in releases 2026.8.10 and 2026.8.11, this fix is consistent with the current roadmap and may land soon.

---

## 7. User Feedback Summary

Real user pain points from the last 24 hours:

- **Trust and uninstall behavior**: The report that LobsterAI keeps running after uninstall, and can still send messages, is the most serious feedback signal. Even if there is a technical explanation, this needs immediate communication.
- **Sandbox flexibility**: Users want to control or disable sandbox mode; forcing it in 3.31 pushed at least one user to roll back.
- **Configuration transparency**: Users are confused by forced sandbox, plugin ID warnings, and inability to find the right config files.
- **Stability of gateway and scheduled tasks**: Gateway restart loops and scheduled-task failures are disrupting real workflows.
- **Model-provider limitations**: Advanced users want more than one custom model provider.

Satisfaction appears mixed: there is ongoing engagement with Cowork, model selector, and scheduled tasks, but unresolved older bugs and trust concerns are accumulating.

---

## 8. Backlog Watch

Items that need maintainer attention:

- **[#1173 — Uninstall still runs / possible backdoor accusation](https://github.com/netease-youdao/LobsterAI/issues/1173)**  
  Open since Mar 31. Critical trust issue; should be triaged and answered.

- **[#1179 — Forced sandbox cannot be disabled](https://github.com/netease-youdao/LobsterAI/issues/1179)**  
  Open since Mar 31. Regression-style complaint with no documented workaround except rollback.

- **[#1180 — Gateway restart loop when editing custom agent](https://github.com/netease-youdao/LobsterAI/issues/1180)**  
  Open since Mar 31. Affects core workflow stability.

- **[#1174 — Multiple custom model providers](https://github.com/netease-youdao/LobsterAI/issues/1174)**  
  Open feature request since Mar 31; likely aligned with the current model-config roadmap.

- **[#1181 — Cowork session list fix](https://github.com/netease-youdao/LobsterAI/pull/1181)**  
  Open PR since Apr 1. Needs review/merge; it addresses user-visible confusion in Cowork sessions.

- **[#1277 — Dependabot Electron major bump](https://github.com/netease-youdao/LobsterAI/pull/1277)**  
  Open since Apr 2. Updates Electron from 40.2.1 to 43.3.0; a major dependency jump that should not be left too long.

- **[#1233 — Model provider website/API-key UX PR](https://github.com/netease-youdao/LobsterAI/pull/1233)**  
  Closed stale, but the underlying feature is valuable. Consider reopening or cherry-picking the work.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-12

## Today's Overview
Moltis had a quiet day on 2026-08-12: no issues were updated, no releases were published, and only one pull request saw activity in the last 24 hours. That PR, #1190, remains open and appears to be a substantial feature contribution focused on local CalDAV connectors and AI-agent dataset access. With zero open/active issues and no merged PRs today, the project looks stable but lightly trafficked. Development energy is currently concentrated in a single large integration PR rather than scattered fixes or community discussion.

## Releases
No new releases were published today. No version, changelog, breaking-change, or migration information is available.

## Project Progress
- **No PRs were merged or closed today.**
- **PR #1190 remains open and was updated within the reporting window.**  
  It adds:
  - Provider-neutral connector persistence
  - Atomic CalDAV snapshots
  - Scheduling and projections
  - Bounded local full-text search
  - Prompt-compiled dataset plans
  - A trusted read-only `connectors` agent tool for local dataset access
  - Settings UI for Connectors accounts and datasets

  This signals active feature development on the repository, even though nothing has landed today.

📎 [PR #1190 — Add durable local CalDAV connectors](https://github.com/moltis-org/moltis/pull/1190)

## Community Hot Topics
Activity today is limited to **one open PR** with no comments or reactions recorded:

- **PR #1190 — Add durable local CalDAV connectors**  
  The PR combines several related capabilities: connector persistence, CalDAV snapshots, local search, dataset plans, and a read-only agent tool. The lack of comments/reactions makes direct community sentiment unavailable, but the scope suggests an underlying need for **local-first, provider-neutral calendar/connector infrastructure** that AI agents can safely access without writing to external systems.

📎 [PR #1190 discussion](https://github.com/moltis-org/moltis/pull/1190)

## Bugs & Stability
No bugs, crashes, regressions, or stability issues were reported today. There are no open issues in the tracked time range, and no fix PRs are pending.

## Feature Requests & Roadmap Signals
No explicit feature-request issues were filed today. However, PR #1190 strongly indicates roadmap direction:

- Durable, provider-neutral local connector persistence
- CalDAV snapshot support with atomicity
- Scheduled sync/projection capabilities
- Bounded local full-text search
- Prompt-compiled dataset plans
- A trusted read-only `connectors` agent tool

These are likely candidates for the next release if the PR is merged. The emphasis on **read-only agent access** and **local dataset availability** suggests Moltis is moving toward safer AI-agent integration with user-owned data.

## User Feedback Summary
No direct user feedback was captured today — there were no issue comments, PR comments, or reactions logged. The only signal is the PR author’s contribution, which implies a real user/developer desire for:

- Local-first CalDAV sync that is not tied to a single provider
- AI agents that can read local connector data without write risk
- Full-text search across synchronized local datasets

Satisfaction/dissatisfaction cannot be measured from today’s data.

## Backlog Watch
There are no long-unanswered issues or PRs requiring maintainer attention today. The only active PR, #1190, is recent and still being updated, so no overdue follow-up is apparent.

📎 [Moltis repository](https://github.com/moltis-org/moltis)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-12

## 1. Today's Overview

CoPaw (agentscope-ai/QwenPaw) is in a healthy, high-velocity pre-release cycle: **22 issues** were updated (10 open, 12 closed) and **43 PRs** were updated (22 open, 21 merged/closed) in the last 24 hours. A new beta was shipped (**v2.1.0-beta.3**), and a version bump to **v2.1.0-beta.4** was already merged (#6920), indicating rapid iteration. The bulk of activity centers on console UX (3D memory graph, workspace artifact cards, marketplace unification), MCP reliability, memory/context refactoring, and channel configurability. Community engagement is strong, particularly from Chinese-speaking users, with several security and stability concerns surfacing alongside feature requests.

---

## 2. Releases

### v2.1.0-beta.3

**What's Changed:**
- **feat(files): workspace blog** by @zhaozhuang521 — [PR #6783](https://github.com/agentscope-ai/QwenPaw/pull/6783)
- **fix(provider): expire stale capability cache entries and clear on model switch** by @ningblue — [PR #6723](https://github.com/agentscope-ai/QwenPaw/pull/6723)
- chore: version bump

**Notes:** No breaking changes or migration steps were documented in the release notes. Release verification is tracked in [Issue #6914](https://github.com/agentscope-ai/QwenPaw/issues/6914). A follow-up bump to **2.1.0-beta.4** has already been merged ([PR #6920](https://github.com/agentscope-ai/QwenPaw/pull/6920)), so the next beta is imminent.

---

## 3. Project Progress

### Merged/Closed PRs (highlights from last 24h)

| PR | Title | Significance |
|----|-------|--------------|
| [#6920](https://github.com/agentscope-ai/QwenPaw/pull/6920) | chore: bump version to 2.1.0b4 | Next beta cut |
| [#6873](https://github.com/agentscope-ai/QwenPaw/pull/6873) | fix: normalize legacy local-path media sources when loading sessions | Fixes [Issue #6872](https://github.com/agentscope-ai/QwenPaw/issues/6872) — pre-2.0 sessions with local file-path media no longer crash with "Internal error" |
| [#6907](https://github.com/agentscope-ai/QwenPaw/pull/6907) | feat(channels): allow custom gateway endpoints for IM channels | Feishu, QQ, WeCom, XiaoYi, Yuanbao can now point to private/local gateways (test-friendly) |
| [#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915) | fix(files): repair previews and dark mode styling | RFC 5987 encoding for non-ASCII (Unicode PDF) filenames; SVG preview and dark-theme alignment |
| [#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898) | fix(tools): correct read_file tool description | Mismatched description caused models to use `read_file` on binary files |

### Open PRs advancing major features
- **Console 3D memory graph** ([#6922](https://github.com/agentscope-ai/QwenPaw/pull/6922)) — upgrades memory visualization from 2D SVG to interactive 3D force-directed graph (Three.js)
- **Persistent workspace artifact cards** ([#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)) — WorkBuddy-style file-change cards persisted with chat sessions
- **Context/memory lifecycle unification** ([#6830](https://github.com/agentscope-ai/QwenPaw/pull/6830), [#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779)) — large refactor aligning Scroll, auto-memory, and compression with AgentScope 2.0 lifecycle
- **Marketplace unification** ([#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880)) — merging apps/plugins/skills marketplaces under `/market`
- **MCP tool-call timeout** ([#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)) — default 120s timeout for wedged MCP servers (closes #6724)

---

## 4. Community Hot Topics

The most-discussed items reveal two pain clusters: **MCP reliability** and **LaTeX rendering**.

1. **[#6732 — MCP工具规律性失效 (MCP tools periodically fail) — 10 comments](https://github.com/agentscope-ai/QwenPaw/issues/6732)** (CLOSED)
   Tools become "unregistered/nonexistent" after a few hours; restarting the Docker container recovers. This is the top community pain point — intermittent MCP failure directly blocks real agent workflows. Now closed, presumably addressed.

2. **[#6893 — 公式渲染问题；会话分组管理；活动会话背景 (Formula rendering / session grouping) — 7 comments](https://github.com/agentscope-ai/QwenPaw/issues/6893)** (CLOSED, enhancement)
   Combines three UX requests; the LaTeX part echoes older issues #5453 and #4756. Users compare unfavorably with Cherry Studio.

3. **[#5790 — Loading animation does not disappear — 4 comments](https://github.com/agentscope-ai/QwenPaw/issues/5790)** (CLOSED)
   Spinner persists after the Agent finishes; a visible UX regression in the Console.

4. **[#6882 — 怎么集成CopilotKit (How to integrate CopilotKit) — 3 comments](https://github.com/agentscope-ai/QwenPaw/issues/6882)** (OPEN)
   Developer asks for integration guidance/examples with the CopilotKit framework.

5. **[#6900 — Isolate chat project directories from the agent workspace — 3 comments](https://github.com/agentscope-ai/QwenPaw/issues/6900)** (CLOSED, enhancement)
   Requests that each persisted chat own a project directory while `workspace_dir` stays system-managed — signals growing multi-project/multi-session usage complexity.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| 🔴 High | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) | v2.0.1 **frequent crashes** in `console process/reply failed` on Windows pip install | No fix PR yet |
| 🔴 High | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | **Security:** plugins can silently create cron jobs and inject user-visible messages without approval (permission model gap) | No fix PR yet |
| 🟠 Medium | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | Agent **stops mid-task** after planning output (e.g., "Now 2.1, 3.1, 3.2…") with no prompt; requires user saying "继续" to resume | No fix PR yet |
| 🟠 Medium | [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) | Inter-agent messages **spawn a new agent session per message** — concurrent "shadow instances" cause duplicate data | No fix PR yet |
| 🟡 Low | [#6910](https://github.com/agentscope-ai/QwenPaw/issues/6910) | `PUT /api/config/channels/{name}` returns **HTTP 500** on invalid payload instead of a validation error | No fix PR yet (author provided analysis) |
| ✅ Fixed | [#6872](https://github.com/agentscope-ai/QwenPaw/issues/6872) | Legacy sessions with local-path media fail to load | Fixed by [#6873](https://github.com/agentscope-ai/QwenPaw/pull/6873) |
| ✅ Fixed | [#6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) | v2.1.0b1 desktop injects `PYTHONHOME` → every Python subprocess crashes | Closed |
| ✅ Fixed | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP tools periodically fail | Closed |
| ✅ Fixed | [#5790](https://github.com/agentscope-ai/QwenPaw/issues/5790) | Loading animation stuck after Agent response | Closed |

---

## 6. Feature Requests & Roadmap Signals

Strong signals for the next releases:

- **LaTeX/KaTeX rendering** — requested repeatedly ([#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893), [#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453), [#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756)). The oldest LaTeX issue dates to May; the cluster of closures today suggests maintainers are preparing a fix in v2.1.0b4.
- **3D memory graph** ([PR #6922](https://github.com/agentscope-ai/QwenPaw/pull/6922)) — likely lands in beta.4; a visible Console upgrade.
- **Per-session model overrides** ([PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)) — long-running opt-in feature (since July 12) still Under Review; high user value for multi-model workflows.
- **Unified marketplace** ([PR #6880](https://github.com/agentscope-ai/QwenPaw/pull/6880)) — apps/plugins/skills under one `/market` page.
- **Agent → Inbox delivery** ([#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917)) — agents should push persistent, unread-badged reports into an Inbox rather than scrolling chat.
- **AnySearch web search** ([PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817)) — proposed Tavily replacement with MCP env-ref fixes.
- **Desktop polish** — window geometry persistence ([#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877)), font-size adjustment and clickable file paths ([#4154](https://github.com/agentscope-ai/QwenPaw/issues/4154)).
- **Cron/permission UX** ([#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916)) — likely to drive a plugin permission confirmation flow.

---

## 7. User Feedback Summary

- **Chinese-speaking users are the majority voice.** Requests include a WeChat community group ([#6895](https://github.com/agentscope-ai/QwenPaw/issues/6895)) and reducing QQ bot workflow spam to avoid rate limiting ([#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897)).
- **Recurring dissatisfaction with LaTeX rendering** — users explicitly compare QwenPaw unfavorably against Cherry Studio and normal Markdown editors; treated as a capability gap, not a nit.
- **MCP tool instability is the #1 reliability complaint** — "works after restart, fails silently hours later" damages trust in agent autonomy.
- **Task-interruption behavior frustrates long workflows** ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)) — the agent appears to plan without executing, requiring manual "continue" nudges.
- **Positive signals:** first-time contributors are active and landing fixes (e.g., [#6873](https://github.com/agentscope-ai/QwenPaw/pull/6873), [#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884)); release-duty automation ([#6914](https://github.com/agentscope-ai/QwenPaw/issues/6914)) shows a maturing release process.

---

## 8. Backlog Watch

Items needing maintainer attention:

| Item | Age | Why It Matters |
|------|-----|----------------|
| [PR #5992 — Per-session model overrides](https://github.com/agentscope-ai/QwenPaw/pull/5992) | Since Jul 12 (31 days) | Under Review; high-demand feature; large diff may need maintainer guidance to land |
| [PR #5869 — System commands in slash autocomplete](https://github.com/agentscope-ai/QwenPaw/pull/5869) | Since Jul 8 (35 days) | First-time contributor, Under Review; UX gap across TUI/Console |
| [PR #5490 — Fullscreen image gallery](https://github.com/agentscope-ai/QwenPaw/pull/5490) | Since Jun 24 (49 days) | Old open PR; isolated `Image` previews prevent navigating between images |
| [Issue #6924 — Custom channel plugin config restricted in 2.0.x](https://github.com/agentscope-ai/QwenPaw/issues/6924) | Opened Aug 12 | Third-party channel devs lost the interactive config entry; regression complaint, 1 comment, no maintainer response yet |
| [Issue #6882 — CopilotKit integration](https://github.com/agentscope-ai/QwenPaw/issues/6882) | Opened Aug 10 | Ecosystem/integration question; unanswered after 3 comments |
| [Issue #6923 — LongHorizon-Harness suggestion](https://github.com/agentscope-ai/QwenPaw/issues/6923) | Opened Aug 12 | External project proposes sustained-task state-drift mitigation; relevant to #6921 task-interruption reports |
| [PR #6817 — AnySearch web search integration](https://github.com/agentscope-ai/QwenPaw/pull/6817) | Since Aug 8 | First-time contributor, Under Review; proposes replacing Tavily; needs maintainer decision |

**Overall health assessment:** CoPaw is shipping rapidly with a responsive maintainer team — most reported bugs from the past week are already closed, and the beta cadence (b3 shipped, b4 cut within 24h) is strong. The main risks are (1) the open security/permission gap (#6916), (2) the task-interruption behavior (#6921) that affects core agent reliability, and (3) an aging backlog of community-contributed PRs awaiting maintainer review.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-12

## 1. Today's Overview

ZeroClaw is in a high-velocity maintenance-and-RFC phase: 50 issues and 50 PRs were updated in the last 24 hours, with 9 issues closed and 1 PR merged/closed. No new releases shipped today. The standout signal is **rapid bug-to-fix turnaround**: three accepted `p1` bugs (security path bypass, two cost-tracking defects) each gained a fix PR the same day. Activity remains concentrated around the v0.9.0 security/cost architecture, with a large RFC backlog (goal-mode, Chat Completions API compatibility, pluggable auth, runtime-owned sessions) awaiting maintainer review. The project is also actively reforming its own RFC process ([#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)) and running an explicit maintainer decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)), indicating process throughput — not contributor interest — is the current bottleneck.

## 2. Releases

No new releases in the reporting period.

## 3. Project Progress

The sole merged/closed PR today was **[#9936 — fix(sync): cherry-pick upstream security and correctness fixes](https://github.com/zeroclaw-labs/zeroclaw/pull/9936)** by kckylechen1, which selectively synced nine upstream fixes from `zeroclaw-labs/zeroclaw` master with `-x` provenance (two planned picks were already present). Nine issues closed, including:

- **[#2269 — RFI: Token consumption and cost management](https://github.com/zeroclaw-labs/zeroclaw/issues/2269)** — the cost-management RFI concluded after 13 comments.
- **[#7232 — RFC: Structured Observability Enhancement](https://github.com/zeroclaw-labs/zeroclaw/issues/7232)** — observability RFC closed.
- **[#9768 — daemon reload not on SIGUSR1](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)** — a `p1` daemon bug where the degraded-security warning told operators to send a signal that kills the daemon.
- **[#9035 — Docker Compose gateway loopback-bound behind published port](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)** — S1 workflow-blocking connectivity bug.
- **[#9545 — gate rustdoc warnings in required PR CI](https://github.com/zeroclaw-labs/zeroclaw/issues/9545)** — CI hygiene task completed.

Three new fix PRs were opened today targeting accepted `p1` bugs (details in Bugs & Stability): [#9937](https://github.com/zeroclaw-labs/zeroclaw/pull/9937), [#9938](https://github.com/zeroclaw-labs/zeroclaw/pull/9938), [#9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939). Also updated: SOP definition-path fixes ([#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765), [#9885](https://github.com/zeroclaw-labs/zeroclaw/pull/9885)), multimodal image validation ([#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)), and a PWA manifest for the dashboard ([#9926](https://github.com/zeroclaw-labs/zeroclaw/pull/9926)).

## 4. Community Hot Topics

- **[#8303 — RFC: Goal mode v1, bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** (19 comments, 1 👍) — most active issue. Community pressure for durable multi-turn goal pursuit; the proposal is deliberately narrowed after earlier scope creep.
- **[#8603 — RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (18 comments) — strong ecosystem demand to expose agents via the OpenAI Chat Completions protocol (Open WebUI, LobeChat, Continue.dev, Aider, LangChain, OpenAI SDK).
- **[#7155 — RFC: per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (17 comments) — Claude Code-style `allow/ask/deny` command policy; now in Revision 3 with maintainer-confirmed scope.
- **[#7141 — RFC: Pluggable inbound authentication and canonical principals](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)** (14 comments, Rev 8) — OIDC and pluggable provider design, likely the keystone for multi-tenant deployments.
- **[#8692 — Maintainer decision queue tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** and **[#9496 — Streamline RFC scope/voting/assignment](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)** (13 / 8 comments) — the community is visibly frustrated with RFC latency and is now designing the process itself.
- **[#2269 — cost-management RFI](https://github.com/zeroclaw-labs/zeroclaw/issues/2269)** (13 comments, closed) — cost viability for productized workloads was a top community concern; the thread concluded with direction set.
- **[#9487 — RFC: Runtime-owned conversation sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** (10 comments), **[#8832 — RFC: Plugin-owned Kanban board](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** and **[#7142 — RFC: Runtime-owned security decision pipeline](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)** (9 each) round out the architecture discussion.

**Underlying needs:** (a) predictable cost/budget telemetry, (b) enterprise-grade auth and security policy, (c) ecosystem interop via OpenAI-compatible APIs, and (d) faster decision-making on the lengthy RFC queue.

## 5. Bugs & Stability

Ranked by severity:

1. **[#9815 — security: `forbidden_paths` is unreachable under `allowed_roots`/workspace](https://github.com/zeroclaw-labs/zeroclaw/issues/9815)** (`p1`, accepted, security) — the forbidden-path loop is never reached because the allowed-root check returns `true` first. A deny-list bypass that silently makes policy ineffective. **Fix PR [#9937](https://github.com/zeroclaw-labs/zeroclaw/pull/9937) opened today** (same author).
2. **[#9816 — cost: anthropic provider reports $0.00 spend, budget caps never fire](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)** (`p1`, accepted) — every Anthropic usage record is written with `cost_usd: 0.0`; worse than cosmetic, daily/monthly budget enforcement is silently dead. **Fix PR [#9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939) opened today** (surface pricing-unavailable so silent $0 caps can't reassure).
3. **[#9573 — cost pricing lookup fails for multiple aliases of the same provider](https://github.com/zeroclaw-labs/zeroclaw/issues/9573)** (`p1`, accepted) — configured token prices ignored on Gateway WebSocket/RPC paths when config has two aliases of one provider type. **Fix PR [#9938](https://github.com/zeroclaw-labs/zeroclaw/pull/9938) opened today** (preserve full canonical `<type>.<alias>` ref).
4. **[#9768 — daemon reload is not on SIGUSR1; warning instructs operators to kill the daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)** (`p1`, accepted) — **closed today**; operator-hostile degraded-security behavior resolved.
5. **[#9035 — Docker Compose gateway loopback-bound behind published port](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)** (`p2`, S1 workflow blocked) — **closed today**.

Also active: SSRF gap for `file_download` ([PR #8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)) and SOP loading from the wrong directory ([#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765), fixes [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) — `p1`). Overall health: every accepted `p1` bug from August 7 has a fix PR within five days — an excellent sign.

## 6. Feature Requests & Roadmap Signals

The roadmap is dominated by a dense RFC wave targeting **v0.9.0**:

- **Cost & budgets:** the closed RFI [#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269) plus fixes in [#9938](https://github.com/zeroclaw-labs/zeroclaw/pull/9938)/[#9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939) signal a coordinated cost-viability push.
- **OpenAI API compatibility:** [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) (Chat Completions profile) is the highest-ecosystem-value item; likely a v0.9 flagship.
- **Security architecture:** [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) (pluggable auth), [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) (security decision pipeline), [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) (shell command policy), [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) (SOP permission contract) all name v0.9.0 as target.
- **Providers:** native Hailo-Ollama support ([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)) and the ZeroRouter preset with device-flow login ([#9645](https://github.com/zeroclaw-labs/zeroclaw/pull/9645)) — hardware/edge + first-party metered gateway.
- **Agent capabilities:** goal mode ([#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)), runtime-owned sessions ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)), plugin-owned Kanban ([#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)), and A2A outbound tools ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)).
- **Deprecation:** retire the Lucid memory connector ([#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644)) is explicitly scheduled for v0.9.0.

**Prediction:** v0.9.0 will land the security-decision pipeline, SOP permission contract, cost fixes, and Lucid removal; the Chat Completions profile is the most likely next flagship RFC to be accepted given adoption pressure.

## 7. User Feedback Summary

- **Cost transparency is the loudest pain point.** Users report being actively misled by `$0.00` spend displays ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)) and ignored configured prices ([#9573](https://github.com/zeroclaw-labs/zeroclaw/issues/9573)); the RFI thread ([#2269](https://github.com/zeroclaw-labs/zeroclaw/issues/2269)) confirms cost-viability anxiety for productized agent workloads.
- **Security policy gaps worry operators:** `forbidden_paths` silently not enforcing ([#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815)) and unvalidated SSRF-prone file downloads ([#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)) erode trust in safety guarantees.
- **RFC process friction is a recurring complaint:** 7-day minimums, unanimity expectations, and manual vote coordination ([#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)) are seen as slower than the decisions they support.
- **Ecosystem interop demand is clear:** users want to keep their existing OpenAI-protocol clients (Open WebUI, Aider, LangChain) rather than adopt WebSocket/ACP-only surfaces ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)).
- **Deployment friction:** Docker Compose hanging loopback-bound ([#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)) blocked workflows at S1 severity; daemon signal confusion ([#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)) showed operator-education gaps.
- **Satisfaction signal:** contributors are co-designing the process rather than forking or abandoning — a healthy community indicator.

## 8. Backlog Watch

- **RFCs awaiting maintainer review** (labels `needs-maintainer-review`, many `risk:high`): [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303), [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603), [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155), [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141), [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487), [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832), [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142), [#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897), [#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346), [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998). The [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) tracker exists precisely to drain this queue.
- **Longest-running item:** [#5907 — RFC: Opt-in LSP support for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) (created 2026-04-19, `needs-author-action`) — stalled for nearly four months; either revive or close.
- **`needs-author-action` PRs at risk of stalling** (49 PRs open, many in this state): [#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126) (plugin config validation), [#9610](https://github.com/zeroclaw-labs/zeroclaw/pull/9610) (UI provider sorting), [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) (SSRF gate), [#9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743) (modalities parser), [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) (A2A outbound), [#9645](https://github.com/zeroclaw-labs/zeroclaw/pull/9645) (ZeroRouter), [#9854](https://github.com/zeroclaw-labs/zeroclaw/pull/9854) (context-window discovery).
- **Stale-candidate PRs:** [#7821](https://github.com/zeroclaw-labs/zeroclaw/pull/7821) (canonical sandbox_policy schema, open since June 17) and [#9385](https://github.com/zeroclaw-labs/zeroclaw/pull/9385) (WhatsApp Web `request_approval`) are flagged stale and need maintainer decision or author renewal.
- **Meta-watch:** [#6653 — host-architecture policy for emulated installs](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) (May, `needs-author-action`) and [#8367 — derived capability readiness](https://github.com/zeroclaw-labs/zeroclaw/issues/8367) (blocked) are older design items without a clear path forward.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*