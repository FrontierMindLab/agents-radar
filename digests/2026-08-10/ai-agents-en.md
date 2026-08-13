# OpenClaw Ecosystem Digest 2026-08-10

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-10 04:40 UTC

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

## 1. Today's Overview

OpenClaw’s GitHub activity on 2026-08-10 is very high: the snapshot captured **500 issues** and **500 PRs** updated in the last 24 hours, with **104 issues closed** and **182 PRs merged/closed**. No new release was published in this window, so there are no release notes or migration steps to report. The issue stream is dominated by reliability concerns—silent reply failures, duplicate channel delivery, stuck sessions, and compaction/context-window edge cases—while PR activity includes both targeted fixes and maintainer-led refactors around channel dispatch, SQLite session storage, and secret redaction. Overall project health is active but bug-heavy; several important P1 reliability issues remain open for weeks or months.

---

## 3. Project Progress

**Merged/closed PRs visible in the 24h sample:**

- [PR #121315 – fix(ui): rotated device tokens are lost in WebViews without a dialog bridge](https://github.com/openclaw/openclaw/pull/121315) — closed; fixes token rotation on embedded WebViews.
- [PR #121388 – refactor: eliminate wrapper export shadowing hazards](https://github.com/openclaw/openclaw/pull/121388) — closed; removes silent-failure classes in module wrappers.
- [PR #121372 – fix(ui): sidebar group headers read at same weight as sessions](https://github.com/openclaw/openclaw/pull/121372) — closed; UI hierarchy/readability fix.

**Notable active PRs progressing today:**

- [PR #120491 – per-turn per-target send budget guard for message tools](https://github.com/openclaw/openclaw/pull/120491) — aims to curb duplicate-answer storms.
- [PR #120443 – fix Codex thread binding before deferred automatic compaction](https://github.com/openclaw/openclaw/pull/120443) — fixes dropped-turn symptoms around Codex compaction.
- [PR #121316 – enforce writer fence in SQLite session sync ops](https://github.com/openclaw/openclaw/pull/121316) — refactor of session storage access.
- [PR #121308 – flatten channel-turn dispatch naming layers](https://github.com/openclaw/openclaw/pull/121308) — reduces six-way re-export confusion.
- [PR #121335 – unify secret-redaction and SSRF policy ownership](https://github.com/openclaw/openclaw/pull/121335) — closes a security gap from duplicated redaction logic.
- [PR #121336 – validate docs config examples against the schema](https://github.com/openclaw/openclaw/pull/121336) — addresses recurring docs-drift.

**Closed issues in the same window include:**

- [#43661 – P0 session hangs when compaction times out, causing duplicate sends](https://github.com/openclaw/openclaw/issues/43661) — closed.
- [#88870 – P1 stuck-session recovery aborts long active runs too early](https://github.com/openclaw/openclaw/issues/88870) — closed.
- [#93321 – P1 compaction preserves orphaned tool_use blocks after timeout](https://github.com/openclaw/openclaw/issues/93321) — closed.
- [#70334 – P1 session lock stuck in processing after compaction](https://github.com/openclaw/openclaw/issues/70334) — closed.

---

## 4. Community Hot Topics

Most-commented issues in the 24h sample:

- [Issue #22438 – Tiered bootstrap file loading for progressive context control](https://github.com/openclaw/openclaw/issues/22438) — 19 comments. Large-workspace users want to stop burning context tokens on unused bootstrap files.
- [Issue #121058 – Silent reply failures still recurring after #116277 was closed](https://github.com/openclaw/openclaw/issues/121058) — 19 comments. Users are frustrated that closed issues do not guarantee the failure mode is actually gone.
- [Issue #91009 – Codex PreToolUse hook relay spawns CPU-bound processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009) — 18 comments, 2 👍. A stability issue specifically around Codex integration and hook relay overhead.
- [Issue #45740 – gh-issues skill injects untrusted issue body directly into sub-agent prompt](https://github.com/openclaw/openclaw/issues/45740) — 17 comments, 1 👍. Security-sensitive prompt-injection surface.
- [Issue #42475 – Per-agent cost budget enforcement at the gateway level](https://github.com/openclaw/openclaw/issues/42475) — 15 comments, 1 👍. Operators want cost governance built into the gateway rather than external monitoring.

Also heavily upvoted: [#27445 – `announceTarget` option for sub-agent completion routing](https://github.com/openclaw/openclaw/issues/27445) with 5 👍, and [#67413 – per-agent dreaming configuration](https://github.com/openclaw/openclaw/issues/67413) with 5 👍.

---

## 5. Bugs & Stability

**P0:**

- [Issue #48920 – Live Docs are ahead of release](https://github.com/openclaw/openclaw/issues/48920) — P0 regression/UX release blocker: docs document `IsolatedSessions` but the released version does not support it. Still open.

**P1:**

- [Issue #91009 – Codex PreToolUse hook relay spawns CPU-bound processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009) — open; needs live repro and maintainer review; no visible new fix PR.
- [Issue #96242 – Multiple independent paths cause duplicate Telegram messages](https://github.com/openclaw/openclaw/issues/96242) — open; message-loss/duplication issue, needs product decision.
- [Issue #47975 – Subagent sessions persist after completion, main session becomes unresponsive](https://github.com/openclaw/openclaw/issues/47975) — open; webchat/session-state reliability.
- [Issue #100941 – Gateway drops concurrent in-process WebSocket connections under parallel tool fan-out](https://github.com/openclaw/openclaw/issues/100941) — open; misleading “Gateway crashed” error.
- [Issue #114020 – Feishu/Telegram channel dispatch fails after upgrade](https://github.com/openclaw/openclaw/issues/114020) — open; requires `runDispatchLifecycle`.
- [Issue #98702 – Inherited OpenAI OAuth rejected at provider for built-in openclaw runtime](https://github.com/openclaw/openclaw/issues/98702) — open; auth-provider issue.
- [Issue #105528 – exec/read tools silently return empty output on Windows](https://github.com/openclaw/openclaw/issues/105528) — open; intermittent and session-specific.
- [Issue #114211 – Matrix room agents can loop on no-reply output and stale replay](https://github.com/openclaw/openclaw/issues/114211) — open; session/message-loss behavior.

**Closed P0/P1 bugs in the 24h window:**

- [#43661 – Session hangs when compaction times out, causing duplicate sends](https://github.com/openclaw/openclaw/issues/43661) — closed.
- [#88870 – Stuck-session recovery aborts long-but-active agent runs](https://github.com/openclaw/openclaw/issues/88870) — closed.
- [#84536 – Preemptive context overflow silently kills embedded sessions](https://github.com/openclaw/openclaw/issues/84536) — closed.
- [#93321 – Compaction preserves orphaned tool_use blocks after request timeout](https://github.com/openclaw/openclaw/issues/93321) — closed.

---

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals visible in the issue stream:

- **Cost governance:** [Issue #42475 – per-agent cost budget enforcement at the gateway](https://github.com/openclaw/openclaw/issues/42475) — P2, linked PR open.
- **Context-window efficiency:** [Issue #22438 – tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438) — P2, linked PR open.
- **Agent orchestration:** [Issue #27445 – `announceTarget` for sub-agent completion routing](https://github.com/openclaw/openclaw/issues/27445) — P2, linked PR open.
- **Self-managed context:** [Issue #6757 – agent-triggered context compaction](https://github.com/openclaw/openclaw/issues/6757) — P2, candidate for near-term release.
- **Memory architecture:** [Issue #60572 – multi-slot memory architecture](https://github.com/openclaw/openclaw/issues/60572) — P2, linked PR open; larger change.
- **Per-agent memory behavior:** [Issue #67413 – per-agent dreaming configuration](https://github.com/openclaw/openclaw/issues/67413) — P2; likely needed for multi-tenant stability.
- **Model/fallback transparency:** [Issue #33975 – fallback approval mode + model attribution](https://github.com/openclaw/openclaw/issues/33975) — P2.
- **UI capabilities:** [Issue #46656 – Webchat inline button support](https://github.com/openclaw/openclaw/issues/46656) and [Issue #45323 – Slack-style @-mention autocomplete](https://github.com/openclaw/openclaw/issues/45323) — both P2.

**Most likely next-version candidates:** #42475, #27445, #22438, and #6757 have clear scopes and/or linked PRs. Larger architectural requests like #60572 and #63990 (multi-index embedding memory) are probably further out.

---

## 7. User Feedback Summary

User sentiment in the sample skews toward frustration about recurring reliability issues. The strongest signal is [Issue #121058](https://github.com/openclaw/openclaw/issues/121058), where a user reports that silent reply failures are still happening after the previous tracking issue was closed. Duplicate Telegram messages ([#96242](https://github.com/openclaw/openclaw/issues/96242)), stuck subagent sessions ([#47975](https://github.com/openclaw/openclaw/issues/47975)), and docs-ahead-of-release confusion ([#48920](https://github.com/openclaw/openclaw/issues/48920)) also indicate real trust costs.

On the feature side, users are asking for operational controls: per-agent cost budgets, context-window percentage injection ([#38568](https://github.com/openclaw/openclaw/issues/38568)), per-agent dreaming, graceful sub-agent timeouts ([#6625](https://github.com/openclaw/openclaw/issues/6625)), and better model fallback transparency. Security-conscious users are focused on prompt injection in skills ([#45740](https://github.com/openclaw/openclaw/issues/45740)) and silent plugin loader failures ([#78301](https://github.com/openclaw/openclaw/issues/78301)).

Overall, feedback is constructive but urgent: users want the system to stop losing or duplicating messages, and they want finer-grained control over context, memory, and cost.

---

## 8. Backlog Watch

Open items that appear to need maintainer attention:

- [Issue #69208 – Umbrella: duplicate transcript, replay, and context assembly across channels](https://github.com/openclaw/openclaw/issues/69208) — maintainer P1, created 2026-04-20, still open with no new fix PR.
- [Issue #91009 – Codex hook relay CPU-bound processes and gateway RPC stalls](https://github.com/openclaw/openclaw/issues/91009) — P1, created 2026-06-06, still needs maintainer review and live repro.
- [Issue #45740 – gh-issues skill untrusted issue body injection](https://github.com/openclaw/openclaw/issues/45740) — P2 security issue, created 2026-03-14, still needs security review.
- [Issue #47975 – Subagent sessions persist after completion, main session unresponsive](https://github.com/openclaw/openclaw/issues/47975) — P1, created 2026-03-16, no visible fix PR.
- [Issue #72015 – active-memory blocks replies and QMD boot initialization can overload gateway](https://github.com/openclaw/openclaw/issues/72015) — P1, created 2026-04-26, still in maintainer review/product decision.
- [Issue #78301 – Plugin loader silent failures on legacy/invalid contracts](https://github.com/openclaw/openclaw/issues/78301) — P2, created 2026-05-06, needs security review and live repro.
- [PR #89040 – perf: avoid event-loop stall during embedded_run bootstrap-context](https://github.com/openclaw/openclaw/pull/89040) — open since 2026-06-01; important performance fix still waiting on proof/review.

These items are the most visible combination of high severity, long age, and missing maintainer closure in the sampled data.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date:** 2026-08-10 | **Source:** 24-hour community digest snapshots for 12 projects

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is in a **post-hype hardening phase**: activity is very high, but almost no project shipped a release in the 24-hour window, and the combined issue stream is dominated by reliability, security, and cost-observability defects rather than new features. The "Claw family" — OpenClaw plus its forks and inspired derivatives (PicoClaw, NanoClaw, IronClaw, ZeroClaw, CoPaw, etc.) — is the dominant lineage, with OpenClaw acting as the de facto upstream reference. Independent projects (Hermes Agent, NanoBot, Moltis, LobsterAI) are convergently solving the same problems: session/context reliability, secure tool execution, channel delivery integrity, and multi-tenant isolation. The overall signal is that **agents are moving from demo-quality to production-grade**, and the ecosystem's bottlenecks are now review bandwidth, security triage, and architectural debt — not raw feature velocity.

---

## 2. Activity Comparison

Health score = composite of throughput, merge/closure responsiveness, unresolved P0/P1/security burden, and stale-closure risk (1–10).

| Project | Issues updated (24h) | PRs updated (24h) | Issues closed | PRs merged/closed | Release | Health |
|---|---|---|---|---|---|---|
| OpenClaw | 500 (capped) | 500 (capped) | 104 | 182 | None | 7/10 |
| Hermes Agent | 50 | 50 | 5 | 10 | None | 7/10 |
| IronClaw | 25 | 38 | 7 | 8 | None | 7/10 |
| CoPaw | 32 | 37 | 7 | 6 | None | 7/10 |
| ZeroClaw | 50 | 50 | 1 | **0** | None | 5/10 |
| NanoClaw | 1 | 16 | 0 | **0** | None | 5/10 |
| NanoBot | 5 | 18 | 0 | 5 | None | 6/10 |
| PicoClaw | 3 | 7 | 1 | 2 | None | 6/10 |
| LobsterAI | 2 | 10 | 1 | 7 (mostly stale) | None | 6/10 |
| Moltis | 2 | 1 | 0 | 0 | None | 5/10 |
| NullClaw | 0 | 0 | — | — | None | N/A (inactive) |
| ZeptoClaw | 0 | 0 | — | — | None | N/A (inactive) |

**Reading the table:** OpenClaw's snapshot is capped at 500/500 and its merge throughput (182 PRs) exceeds every other project's total activity. ZeroClaw and NanoClaw show high engagement but **zero merged PRs** — clear review bottlenecks. No project shipped a release in the window, meaning the ecosystem is accumulating pressure toward a multi-project release wave.

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Community scale:** OpenClaw's 24-hour volume (500 issues + 500 PRs capped) is larger than the sum of all other tracked projects combined. Its hot issues draw 15–19 comments with linked implementation PRs — a self-sustaining contributor loop no peer matches.
- **Merge velocity:** 182 PRs merged/closed in 24h demonstrates maintainer bandwidth and a mature review pipeline; most peers merge single-digit counts.
- **Reference status:** PicoClaw, NanoClaw, ZeroClaw, IronClaw, and CoPaw share its lineage/architecture; LobsterAI literally bundles the OpenClaw gateway. Bugs and fixes ripple outward from OpenClaw — its secret-redaction/SSRF unification and channel-dispatch refactors directly de-risk downstream projects.
- **Breadth of roadmap:** No other project has linked PRs in flight across cost governance, tiered context loading, sub-agent routing, and memory architecture simultaneously.

**Technical approach differences:** Gateway-centric channel dispatch with per-channel adapters, SQLite session storage, and central compaction/session-lifecycle management. Peers lean more toward desktop consoles (CoPaw, Hermes), lightweight single-channel bots (PicoClaw), or security-first multi-tenant design (ZeroClaw).

**Weaknesses:** Reliability debt is the counterweight — silent reply failures (#121058), duplicate Telegram delivery (#96242), and compaction deadlocks remain open P1s, and a P0 docs-ahead-of-release issue (#48920) is unresolved. Its health score is capped by this backlog despite unmatched throughput.

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific needs |
|---|---|---|
| **Session/context reliability** | OpenClaw, NanoBot, Hermes, CoPaw, IronClaw, ZeroClaw | Compaction timeouts leaving stuck sessions and orphaned tool blocks; stale background tasks overwriting cleared sessions; continuation summaries blocking conversations; zombie threads; run-history loss on refresh |
| **Message delivery integrity** | OpenClaw, NanoBot, PicoClaw, NanoClaw, IronClaw, ZeroClaw | Duplicate channel delivery; silent reply failures; Telegram polling stalls; Matrix sync death with no reconnection; Signal attachments routed to unmounted paths; Slack reconnect auth breakage; unauthenticated webhook dispatch |
| **Security hardening** | OpenClaw, NanoBot, PicoClaw, NanoClaw, Hermes, ZeroClaw | `exec.allowPatterns` bypasses via shell chaining; SSRF on inbound media downloads; drive-root deletion on Windows; cross-profile secret leakage; unauthenticated webhooks; critical `tar` CVE in agent images; DM-resolution log redaction |
| **Cost & token observability** | OpenClaw, NanoBot, IronClaw, ZeroClaw | Per-agent cost budgets at gateway; per-call token usage logs/API endpoints; 124-tool-call single workflows; per-model context-window config |
| **Memory & context efficiency** | OpenClaw, Hermes, NanoBot, CoPaw, ZeroClaw | Tiered bootstrap file loading; persistent cross-session memory; agent-triggered compaction; dream-consolidation tool mismatches; incomplete MEMORY.md digests; knowledge-graph per-agent attribution |
| **Provider/model compatibility** | OpenClaw, NanoBot, Hermes, CoPaw, LobsterAI, ZeroClaw | OpenAI OAuth rejection; nested-object tool-argument double-encoding; Gemini thinking-only prefill 400s; `$schema` in tool schemas rejected by Gemini; `reasoning_content` not passed back for thinking models; `provider/model` parsing of custom IDs |

---

## 5. Differentiation Analysis

| Project | Core identity | Target user | Architectural signature |
|---|---|---|---|
| **OpenClaw** | General-purpose agent gateway + multi-channel bot | Ops/automation users, community hub | Gateway dispatch, SQLite sessions, plugin/skills ecosystem |
| **Hermes Agent** | Research-grade desktop/terminal agent | Power users, researchers | TUI + desktop sessions, profile isolation (`multiplex_profiles`), terminal-safety guards |
| **IronClaw** | Automation platform (routines, notifications) | Workflow automation teams | Presence-based channels, deferred tool discovery, notification parity |
| **CoPaw (QwenPaw)** | Desktop console with sandbox + MCP | Desktop-first users, Chinese ecosystem | Console beta (2.1.0b2), strict provider compatibility, Windows packaging |
| **ZeroClaw** | Security-first multi-tenant agent platform | Enterprises, security-sensitive ops | RFC-driven governance, `net_guard` egress, per-agent env/HOME, Rust infrastructure |
| **NanoBot** | Lightweight personal assistant | Tinkerers, lightweight deploys | WebUI, Telegram, GitAgent protocol, computer-use ambitions |
| **NanoClaw** | Container-hardened agent images | Ops teams, containerized deploys | CVE-gated Docker Hub publishing, `install_packages` channels (apt/npm, no pip yet) |
| **PicoClaw** | Minimal channel bot (Sipeed/hardware) | Hobbyists, edge devices | Small footprint, channel adapters, SSRF-hardened media downloads |
| **LobsterAI** | OpenClaw-based Chinese-market desktop app | Chinese desktop users | Bundles OpenClaw gateway, NL scheduled tasks, i18n polish |
| **Moltis** | Privacy-focused macOS agent | Privacy-conscious macOS users | Vault recovery-phrase encryption, Apple Container sandbox integration |

---

## 6. Community Momentum & Maturity

- **Tier 1 — Core, very high velocity:** **OpenClaw.** Capped 500/500 activity with 182 merges; the only project operating at industrial scale. Bug-heavy but self-correcting.
- **Tier 2 — High, actively iterating:** **Hermes, IronClaw, CoPaw.** All merge steadily; Hermes moved a critical Windows deletion incident to a fix PR within the same window; CoPaw ships a steady fix stream for its 2.1.0b2 with first-time contributors engaged; IronClaw closes QA regressions while pushing tool-discovery and notification work.
- **Tier 3 — Engaged but bottlenecked:** **ZeroClaw, NanoClaw.** High issue/PR churn but **zero PR merges**. ZeroClaw is absorbing a security audit with detailed findings but cannot convert PRs to merges; NanoClaw's critical `tar` CVE fix sits unmerged. Both risk contributor attrition.
- **Tier 4 — Moderate maintenance:** **NanoBot, PicoClaw, LobsterAI.** NanoBot has security bypasses awaiting triage; PicoClaw is steady but stale-closed a serious Matrix reliability bug; LobsterAI's activity is largely stale-bot housekeeping rather than feature work.
- **Tier 5 — Quiet/inactive:** **Moltis** (low activity, two untriaged bugs), **NullClaw and ZeptoClaw** (no activity).

---

## 7. Trend Signals

1. **Security is now a gating requirement, not a feature.** ZeroClaw's audit (unauthenticated webhooks, channel allowlist bypasses, missing per-agent memory isolation), NanoBot's `exec.allowPatterns` bypasses, PicoClaw's SSRF media-download fixes, and Hermes' drive-root deletion all landed in one 24-hour window. **Value for developers:** threat-model tool allowlists, HTTP/media fetches, and webhook auth *before* shipping; audits will find these bugs regardless.

2. **Cost/context observability is the #1 operational demand.** NanoBot users report a million tokens burned in two hours with no trace; IronClaw users hit 124 tool calls for a trivial task; OpenClaw's gateway-level cost budgets have a linked PR. **Value:** build per-call token metering and per-agent budget enforcement into agent gateways as first-class primitives.

3. **Context-window management is becoming a user-facing product feature.** Tiered bootstrap loading (OpenClaw), agent-triggered compaction (OpenClaw #6757), persistent cross-session memory (Hermes #8457), per-model context ratios (ZeroClaw #9535), and multi-slot memory (OpenClaw #60572) are all active. **Value:** agents need compression and multi-slot memory strategies; "throw more tokens at it" is no longer viable.

4. **Delivery reliability is the hidden moat.** Duplicate messages, silent reply failures, dead Matrix sync loops, stalled Telegram polling, and dropped Signal attachments dominate every project's issue tracker. **Value:** channel adapters need idempotent delivery, reconnection logic, and supervisor-visible health signals — this is the difference between a demo and a deployed assistant.

5. **Multi-agent/multi-tenant isolation is the next battleground.** Cross-profile secret leakage (Hermes), knowledge-graph attribution gaps (ZeroClaw), per-agent env/HOME isolation (ZeroClaw PR #9875), and per-agent cost budgets (OpenClaw) all point to the same conclusion: single-tenant agents don't scale, and isolation primitives (memory, secrets, env, budget) are the emerging architecture.

6. **Provider portability friction is widespread and specific.** Gemini rejecting `$schema`, thinking-model `reasoning_content` not round-tripping, custom model IDs being misparsed, and OAuth profile gaps appear across five projects. **Value:** normalize tool-schema sanitization and reasoning-content passthrough in agent frameworks; every provider integration will hit these.

7. **Process maturity is shifting from velocity to governance.** ZeroClaw RFCs, CoPaw's Help-Wanted task lists, and IronClaw's "Keep CI Green" issues show communities investing in review pipelines, risk labeling, and contributor onboarding. **Value:** expect projects with healthy governance (OpenClaw, IronClaw, CoPaw) to consolidate contributor mindshare; projects with zero merges despite high PR churn (ZeroClaw, NanoClaw) to lose it.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview

NanoBot (`HKUDS/nanobot`) shows moderate-to-high activity in the 24-hour window ending 2026-08-10: **5 issues were updated** (all still open), and **18 PRs were touched** — 13 open and 5 closed. No new release was published. Maintainers and community contributors are actively working on observability, Telegram reliability, MCP connection cleanup, WebUI documentation, and test hardening. The most urgent signals are two open security reports around `exec.allowPatterns` bypasses, plus a p0 session-concurrency fix stuck behind merge conflicts. Overall project health looks active, but security triage and conflict resolution need attention.

## 2. Releases

**None in this window.** No new NanoBot versions, changelog entries, breaking changes, or migration notes were published on 2026-08-10.

## 3. Project Progress

Five PRs were closed/merged in this window:

- [PR #5312](https://github.com/HKUDS/nanobot/pull/5312) — docs: refresh WebUI user guidance, including Temporary Chat behavior, Skills guide updates, and README WebUI overview.
- [PR #5308](https://github.com/HKUDS/nanobot/pull/5308) — test: strengthen user-path coverage and CI gates, with V8 coverage reporting.
- [PR #5304](https://github.com/HKUDS/nanobot/pull/5304) — fix(webui): explain HTTPS requirement for voice input in all locales.
- [PR #5307](https://github.com/HKUDS/nanobot/pull/5307) — Restore Star History chart using a new provider not subject to GitHub restrictions.
- [PR #4019](https://github.com/HKUDS/nanobot/pull/4019) — Add GitAgent Protocol support (`agent.yaml` + `SOUL.md`); closed after a long review period.

Other notable PRs updated but still open include MCP HTTP connection cleanup ([#5313](https://github.com/HKUDS/nanobot/pull/5313)), forced Weixin QR login ([#5310](https://github.com/HKUDS/nanobot/pull/5310)), Telegram polling diagnostics ([#5301](https://github.com/HKUDS/nanobot/pull/5301)), structured token usage records ([#5299](https://github.com/HKUDS/nanobot/pull/5299)), and the p0 session-overwrite fix ([#5271](https://github.com/HKUDS/nanobot/pull/5271)).

## 4. Community Hot Topics

- [Issue #5266 — Logs about token consumption](https://github.com/HKUDS/nanobot/issues/5266)  
  **13 comments** — the most active discussion. Users report extremely high token burn (e.g., a million tokens in two hours) with no visible activity. The underlying need is clear observability: which call, when, and how many tokens were consumed. This is directly complemented by open PR [#5299](https://github.com/HKUDS/nanobot/pull/5299), which exposes structured token usage records.

- [Issue #5295 — Docker Compose deployment fails with `entrypoint.sh: Permission denied`](https://github.com/HKUDS/nanobot/issues/5295)  
  **5 comments** — a concrete deployment blocker affecting users who follow `deployment.md`. The discussion suggests setup friction around file permissions and container entrypoint handling.

No PR comment counts were included in the data, so PR-side discussion activity could not be measured.

## 5. Bugs & Stability

Ranked by severity:

1. **Security — `exec.allowPatterns` bypasses (high)**  
   [Issue #5305](https://github.com/HKUDS/nanobot/issues/5305) and [Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) report that the `exec` tool allowlist can be bypassed using shell chaining, including via the OpenAI-compatible API. No linked fix PR was present in this window. These should be prioritized as security advisories.

2. **Session data overwrite by stale background tasks (p0)**  
   [Issue context via PR #5271](https://github.com/HKUDS/nanobot/pull/5271) — if a user runs `/new` during `provider.chat_with_retry(...)`, a stale background task can overwrite the cleared session. A fix exists, but the PR is marked **conflict**.

3. **Docker Compose deployment failure**  
   [Issue #5295](https://github.com/HKUDS/nanobot/issues/5295) — `/bin/sh: 0: cannot open /usr/local/bin/entrypoint.sh: Permission denied`. Blocks container-based deployments; no fix PR was visible.

4. **Agnes AI double-encodes nested-object tool arguments**  
   [Issue #5311](https://github.com/HKUDS/nanobot/issues/5311) — MCP tool calls with nested-object parameters fail against `providers.custom` using Agnes AI. This is a provider-compatibility bug for tool-calling users.

5. **Telegram polling can stall silently**  
   [PR #5156](https://github.com/HKUDS/nanobot/pull/5156) and companion [PR #5301](https://github.com/HKUDS/nanobot/pull/5301) address a production issue where Telegram message reception stops permanently without logs. Still open; the observability portion is being split out for safer incremental landing.

6. **Dream consolidation tool mismatch**  
   [PR #5302](https://github.com/HKUDS/nanobot/pull/5302) fixes a prompt/tool mismatch where Dream’s restricted tool registry does not match the general agent system prompt, causing unavailable tool calls.

7. **Windows weather workflow failure**  
   [PR #5303](https://github.com/HKUDS/nanobot/pull/5303) fixes bare `curl` resolving to PowerShell’s `Invoke-WebRequest` alias in weather skills.

## 6. Feature Requests & Roadmap Signals

- **Token usage observability**  
  [Issue #5266](https://github.com/HKUDS/nanobot/issues/5266) requests per-call token consumption logging. Open PR [#5299](https://github.com/HKUDS/nanobot/pull/5299) already proposes persisting the latest 50 token-usage records and adding an authenticated `/api/settings/usage/records` endpoint. This is the strongest candidate for the next release.

- **Model-agnostic computer use**  
  [PR #4276](https://github.com/HKUDS/nanobot/pull/4276) adds native `computer_use` and `browser` tools with DOM-based automation. It remains open but is marked with conflicts and has been in review since June.

- **Agent Plugins integration**  
  [PR #5288](https://github.com/HKUDS/nanobot/pull/5288) proposes integrating Agent Plugins v1 with CLI Apps, making NanoBot a generic host for portable skills and MCP runtimes.

- **Truthful API status for externally-managed servers**  
  [PR #5255](https://github.com/HKUDS/nanobot/pull/5255) would add `nanobot api status` and fix the WebUI reporting externally-started `nanobot serve` instances as “Off”.

- **Weixin forced QR login**  
  [PR #5310](https://github.com/HKUDS/nanobot/pull/5310) improves forced login flows in both CLI and WebUI by skipping persisted credentials and enforcing a fresh QR flow.

## 7. User Feedback Summary

- Users are **frustrated by opaque token consumption**: high usage with no visible activity makes cost tracing impossible ([#5266](https://github.com/HKUDS/nanobot/issues/5266)).
- Docker Compose users are hitting a **hard deployment failure** due to entrypoint permission issues, which damages first-run experience ([#5295](https://github.com/HKUDS/nanobot/issues/5295)).
- Security researchers are actively probing NanoBot’s tool safety boundaries, especially `exec.allowPatterns` ([#5305](https://github.com/HKUDS/nanobot/issues/5305), [#5306](https://github.com/HKUDS/nanobot/issues/5306)).
- Provider users want **better compatibility for tool arguments** with custom providers like Agnes AI ([#5311](https://github.com/HKUDS/nanobot/issues/5311)).
- Community contributors are engaged and submitting targeted fixes for Telegram, MCP cleanup, Windows-safe skills, and session correctness — a sign of healthy external involvement.

## 8. Backlog Watch

- [PR #4276 — model-agnostic computer use](https://github.com/HKUDS/nanobot/pull/4276) — open since June 10, marked with conflicts. Large feature with high potential but needs maintainer direction.
- [PR #5271 — p0 session overwrite fix](https://github.com/HKUDS/nanobot/pull/5271) — serious bug fix blocked by merge conflicts; should be unblocked promptly.
- [PR #5204 — refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204) — open since August 1, p1 refactor with broad provider impact.
- [PR #5255 — truthful API service status draft](https://github.com/HKUDS/nanobot/pull/5255) — draft with conflicts; useful for gateway-managed deployments.
- [PR #5156 — Telegram stalled polling recovery](https://github.com/HKUDS/nanobot/pull/5156) — open since July 29; production-impacting but needs careful review alongside [#5301](https://github.com/HKUDS/nanobot/pull/5301).
- [Issue #5266 — token consumption logs](https://github.com/HKUDS/nanobot/issues/5266) — high community interest and a matching open PR; should be tracked closely for the next release.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-10

## 1. Today's Overview

Hermes Agent showed high activity on 2026-08-10: 50 issues were updated (45 open/active, 5 closed) and 50 PRs were updated (40 open, 10 closed/merged), with no new release cut. The work was dominated by bug fixes and stability hardening around terminal safety, gateway shutdown behavior, desktop session handling, profile isolation, and TUI/compression recovery. Several security-adjacent issues, especially a Windows drive-root deletion incident, moved quickly with fix PRs already open or closed. The volume suggests a healthy but stretched project: many small fixes are landing, while larger design decisions such as multi-tenancy remain open.

## 2. Releases

No new releases were published in this window. No changelog, breaking-change, or migration notes are available for 2026-08-10.

## 3. Project Progress

Merged/closed PRs today advanced several areas:

- **Agent/Gemini fix** — [PR #82930](https://github.com/NousResearch/hermes-agent/pull/82930): Keeps the thinking-prefill marker so the drop pass strips trailing stubs, preventing Gemini 400s on thinking-only turns. Likely fixes [Issue #75121](https://github.com/NousResearch/hermes-agent/issues/75121).
- **TUI compression recovery** — [PR #82927](https://github.com/NousResearch/hermes-agent/pull/82927) and [PR #82738](https://github.com/NousResearch/hermes-agent/pull/82738): Recover active `/goal` state after compression exhaustion instead of accidentally treating the next user message as a goal signal.
- **Kanban/operator recovery** — [PR #82914](https://github.com/NousResearch/hermes-agent/pull/82914): Adds audited operator-only recovery paths for prematurely completed kanban tasks, with dependency-safety checks.
- **Profile creation safety** — [PR #76029](https://github.com/NousResearch/hermes-agent/pull/76029): Interrupted profile clones no longer leave partially populated named profiles; staging directories are now used atomically.
- **Test cleanup** — [PR #62621](https://github.com/NousResearch/hermes-agent/pull/62621): Mocks `launch_chrome_debug` to prevent Chrome process leaks in browser tests.

Closed issues today include [Issue #58437](https://github.com/NousResearch/hermes-agent/issues/58437) (MoA `_collect_stream` dropping `tool_calls` in quiet mode), [Issue #75121](https://github.com/NousResearch/hermes-agent/issues/75121) (Gemini thinking-only prefill 400), and [Issue #82882](https://github.com/NousResearch/hermes-agent/issues/82882) (bundled-skills sync deleting user-owned skills).

## 4. Community Hot Topics

The most active discussions center on architectural memory/isolation gaps and blocking gateway bugs:

- [Issue #34352 — Solving the Multi-Tenant Hermes Problem](https://github.com/NousResearch/hermes-agent/issues/34352) — 19 comments, 2 👍. Memory operations bypass the hook system, making tenant isolation impossible without forking core. The author reports running a production fix for months. Strong roadmap signal.
- [Issue #8457 — Persistent Session Memory with Cross-Session Search & Auto-Compression](https://github.com/NousResearch/hermes-agent/issues/8457) — 18 comments. Long-running request for memory that survives restarts and supports cross-session search. Still labeled `needs-decision`.
- [Issue #42961 — terminal.cwd config ignored for local backend](https://github.com/NousResearch/hermes-agent/issues/42961) — 10 comments. Users expect `terminal.cwd` to be honored but the process cwd is always used. Labeled `P2`, `needs-decision`.
- [Issue #58437 — MoA quiet mode drops tool_calls](https://github.com/NousResearch/hermes-agent/issues/58437) — 8 comments. Now closed, but the thread captured real subagent/kanban reliability concerns.
- [Issue #64155 — Gateway SIGTERM shutdown hangs](https://github.com/NousResearch/hermes-agent/issues/64155) — 5 comments. Systemd shutdowns stuck for minutes; `P2` with message-delivery risk.

## 5. Bugs & Stability

Ranked by severity:

- **Critical — Windows drive-root deletion** — [Issue #82842](https://github.com/NousResearch/hermes-agent/issues/82842): A scoped folder deletion escalated to `rd /s /q` against `C:\`, prevented only by missing Administrator rights. Fix [PR #82932](https://github.com/NousResearch/hermes-agent/pull/82932) is already open and rejects recursive `rd`/`rmdir` targets that resolve to filesystem roots.
- **Critical — Cross-profile secret leakage** — [Issue #82936](https://github.com/NousResearch/hermes-agent/issues/82936): With `gateway.multiplex_profiles`, the default profile's secrets remain visible to secondary profiles' terminal tool and Kanban subprocesses.
- **High — Gateway freeze on SIGTERM via MCP shutdown** — [Issue #82874](https://github.com/NousResearch/hermes-agent/issues/82874): Synchronous `future.result(timeout=15)` blocks the asyncio loop; clean-exit marker is never written.
- **High — Terminal tool crashes on binary executable paths** — [Issue #82887](https://github.com/NousResearch/hermes-agent/issues/82887): `open: embedded null character in path` when a command references binary executables such as `venv/bin/python3`.
- **High — Systemd shutdown timeout** — [Issue #64155](https://github.com/NousResearch/hermes-agent/issues/64155): Gateway takes 2–3+ minutes to exit on SIGTERM, causing force-kills.
- **Medium — `terminal.cwd` silently ignored** — [Issue #42961](https://github.com/NousResearch/hermes-agent/issues/42961): Local backend always uses process cwd instead of configured cwd.
- **Medium — Hardline guard false positives** — [Issue #70838](https://github.com/NousResearch/hermes-agent/issues/70838): Benign `$(grep/rg/sort ...)` commands are blocked as malformed payloads. Fix [PR #70839](https://github.com/NousResearch/hermes-agent/pull/70839) is open.
- **Medium — Desktop ghost sessions** — [Issue #82872](https://github.com/NousResearch/hermes-agent/issues/82872): Orphan-reaped sessions restore as unclickable empty tiles.
- **Medium — TUI crash on older CPUs** — [Issue #82913](https://github.com/NousResearch/hermes-agent/issues/82913): NumPy `x86_64-v2` wheel crashes audio-capture requests on CPUs without SSE4.2/AVX2.
- **Medium — `session_search` ignores profile argument** — [Issue #82903](https://github.com/NousResearch/hermes-agent/issues/82903): Gateway executor always searches the root profile's session DB.
- **Low/Medium — Desktop `/model` missing from autocomplete** — [Issue #82929](https://github.com/NousResearch/hermes-agent/issues/82929).

## 6. Feature Requests & Roadmap Signals

- **Multi-tenant / multi-agent support** — [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) remains the strongest roadmap item. The author has a production-proven fix and argues Hermes should lead in multiplayer agentic AI.
- **Persistent session memory** — [Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457) has 18 comments and directly addresses a major architectural limitation: transient memory across restarts.
- **Autonomous self-improvement engine** — [Issue #61644](https://github.com/NousResearch/hermes-agent/issues/61644): Users want Hermes to actually verify whether its own skill curation and self-improvement steps succeeded.
- **Reversible memory mutations** — [Issue #76883](https://github.com/NousResearch/hermes-agent/issues/76883): Requests archive-not-delete semantics for built-in memory mutations, matching existing skill-curator behavior.
- **Native iMessage adapter** — [PR #8245](https://github.com/NousResearch/hermes-agent/pull/8245): Still open after months; would add a first-class iMessage gateway platform using macOS built-in capabilities.
- **Model behavior concerns** — [Issue #62738](https://github.com/NousResearch/hermes-agent/issues/62738): Users report persuasion-bomb and sycophancy patterns across providers, suggesting future built-in behavioral guards.

Likely next-version candidates: the Windows terminal safety fix ([PR #82932](https://github.com/NousResearch/hermes-agent/pull/82932)), hardline guard parsing fix ([PR #70839](https://github.com/NousResearch/hermes-agent/pull/70839)), and ongoing desktop/tab-session fixes.

## 7. User Feedback Summary

User sentiment is mixed: engagement is high and bug reports are detailed, but several pain points are serious.

- **Multi-tenancy frustration** — [Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352): "Impossible without forking core" despite months of production use; users clearly want official support.
- **Configuration trust issues** — [Issue #42961](https://github.com/NousResearch/hermes-agent/issues/42961): Users are annoyed when config like `terminal.cwd` is silently discarded.
- **Near-data-loss incident** — [Issue #82842](https://github.com/NousResearch/hermes-agent/issues/82842): A critical safety failure that only failed to fully execute because the process lacked Administrator rights.
- **User skill deletion** — [Issue #82882](https://github.com/NousResearch/hermes-agent/issues/82882): User-owned skills disappeared twice; second event removed an entire category plus 49 skills.
- **False compliance reporting** — [Issue #79336](https://github.com/NousResearch/hermes-agent/issues/79336): `godmode` refusal detection misses curly-quote refusals, causing `auto_jailbreak` to misreport models as compliant.
- **Windows false positives** — [Issue #58825](https://github.com/NousResearch/hermes-agent/issues/58825): `hermes skills check` always reports `update_available` due to CRLF/LF hash mismatch.
- **Plugin status confusion** — [Issue #82898](https://github.com/NousResearch/hermes-agent/issues/82898): The active memory provider can display as "not enabled."

## 8. Backlog Watch

These items need maintainer attention or decision:

- [Issue #34352 — Multi-Tenant Hermes](https://github.com/NousResearch/hermes-agent/issues/34352) — `P3`, `needs-decision`, active since May 29 with 19 comments and a production-proven approach.
- [Issue #8457 — Persistent Session Memory](https://github.com/NousResearch/hermes-agent/issues/8457) — `P3`, `needs-decision`, open since April 12 with 18 comments.
- [Issue #42961 — terminal.cwd ignored](https://github.com/NousResearch/hermes-agent/issues/42961) — `P2`, `needs-decision`, open since June 9.
- [Issue #64155 — Gateway SIGTERM hang](https://github.com/NousResearch/hermes-agent/issues/64155) — `P2`, open since July 14, no visible fix PR yet.
- [PR #8245 — Native iMessage adapter](https://github.com/NousResearch/hermes-agent/pull/8245) — Open since April 12; long-running feature PR needing review or closure.
- [Issue #82936 — Cross-profile secret leakage](https://github.com/NousResearch/hermes-agent/issues/82936) — New and severe, but zero comments; needs triage immediately.
- [PR #75907 — Dashboard reverse-proxy Host allowlist](https://github.com/NousResearch/hermes-agent/pull/75907) — Security-relevant auth-gate scoping, open since August 1.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw Project Digest — 2026-08-10

### 1. Today's Overview

PicoClaw is in a moderately active maintenance and hardening phase. In the last 24 hours, 3 issues were updated (2 open, 1 closed) and 7 PRs were touched (5 open, 2 closed/merged), with no new releases published. The main thematic clusters are channel reliability (Matrix sync, IRC message handling), SSRF/media-download hardening across chat channels, and richer Telegram formatting. The project is receiving steady contributor attention, especially around bot-safety and configuration quality. A few older items are being closed as stale, but fresh PRs continue to arrive.

### 2. Releases

No new releases were published in the last 24 hours. The latest release remains prior to this window.

### 3. Project Progress

Merged/closed PRs in the last 24 hours:

- **[#3326 [CLOSED] fix(web): remove duplicate pnpm lock entries](https://github.com/sipeed/picoclaw/pull/3326)** — Fixes a broken `pnpm-lock.yaml` with duplicated `semver@7.8.5` mappings that caused `pnpm install --frozen-lockfile` to fail with `ERR_PNPM_BROKEN_LOCKFILE`. This is a concrete build-health fix and was closed quickly.
- **[#2132 [CLOSED] feat(config): support model-specific max_tokens and fix config key co…](https://github.com/sipeed/picoclaw/pull/2132)** — An older enhancement PR, now closed with the `stale` label. It proposed model-level parameter overrides and decoupling lookup keys from runtime IDs, but is no longer active.

### 4. Community Hot Topics

- **[#3203 [BUG] Matrix sync loop has no reconnection logic — silent death after network/server disruption](https://github.com/sipeed/picoclaw/issues/3203)** — Most active item: 8 comments, 2 👍. Underlying need: Matrix bridge/main channel must survive network blips and server restarts without silently dying, especially when watchdog/systemd cannot detect the failure.
- **[#3287 [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)** — 4 comments. Users want IRCv3 long messages over 512 bytes to be treated as single cohesive messages rather than being split into separate IRC messages.
- **[#3325 [Feature] Render Telegram tables with rich messages](https://github.com/sipeed/picoclaw/issues/3325)** — New request (0 comments yet) asking for GFM/HTML tables to render through Telegram's native rich message UI rather than degrading to monospaced code blocks. A companion PR already exists, so the community is actively pushing this forward.

### 5. Bugs & Stability

Ranked by severity:

- **High / Critical: Matrix sync silent death** — [#3203](https://github.com/sipeed/picoclaw/issues/3203) remains the most serious reported bug: the Matrix `/sync` long-polling loop dies after network disruption or homeserver restart with no reconnection, while the main process stays alive so systemd restart policies don't trigger. **However, this issue was closed as stale** in the last 24h, which is a risk if the underlying problem has not been fixed elsewhere.
- **High / Security: SSRF on inbound media downloads** — Three open PRs address media download SSRF hardening:
  - [#3322 fix(channels): block private targets on inbound media downloads](https://github.com/sipeed/picoclaw/pull/3322) — covers QQ, Telegram, Discord, LINE, Slack attachment downloads.
  - [#3323 fix(wecom): use CreateSafeHTTPClient for media downloads](https://github.com/sipeed/picoclaw/pull/3323)
  - [#3324 fix(weixin): use CreateSafeHTTPClient for media downloads](https://github.com/sipeed/picoclaw/pull/3324)
  
  These are security-relevant fixes preventing redirects to loopback/private hosts.
- **Medium: Broken lockfile** — [#3326](https://github.com/sipeed/picoclaw/pull/3326) was a build-breaking duplicate key issue in `pnpm-lock.yaml`; already closed/fixed.

### 6. Feature Requests & Roadmap Signals

- **Telegram rich table rendering** is the strongest near-term roadmap signal: [#3325](https://github.com/sipeed/picoclaw/issues/3325) was filed and immediately followed by [#3327 feat(telegram): render tables with native rich messages](https://github.com/sipeed/picoclaw/pull/3327). This likely lands in the next release.
- **IRC long-message support** ([#3287](https://github.com/sipeed/picoclaw/issues/3287)) is an open feature request with active discussion; no PR yet, but it is a clear community need.
- **Matrix sync reconnection logic** ([#3203](https://github.com/sipeed/picoclaw/issues/3203)) is effectively a reliability feature and should be tracked even after stale-closing, since no replacement fix is visible.
- **Model-specific `max_tokens` / config decoupling** ([#2132](https://github.com/sipeed/picoclaw/pull/2132)) was closed stale, so the idea may need a fresh implementation if desired.

### 7. User Feedback Summary

- Users are reporting real operational pain from **Matrix sync silently dying** with no systemd visibility — this is a reliability/trust issue for the project.
- IRC users want **long-message preservation**, not client-side/IRCv3 splitting into separate messages — a protocol-level UX mismatch.
- Telegram users expect **native table rendering** rather than the current plain-text/code-block fallback — a formatting quality issue.
- Contributor activity on SSRF hardening suggests **security-conscious feedback** and internal review improving bot-safety.
- The quick closure of [#3326](https://github.com/sipeed/picoclaw/pull/3326) shows responsive maintenance for build/CI problems.

### 8. Backlog Watch

- **[#3203 Matrix sync loop no reconnection](https://github.com/sipeed/picoclaw/issues/3203)** — Closed as stale despite not being visibly resolved. Maintainers should confirm whether the fix exists elsewhere or reopen/track it.
- **[#3222 refactor(deltachat): cleanup implementation, documentation -200LOC](https://github.com/sipeed/picoclaw/pull/3222)** — Open since July 3, still no merge or explicit review. Touches legacy feature removal and secrets handling; needs maintainer attention.
- **[#3287 Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)** — Open since July 22 with community discussion but no implementer yet.
- **[#2132 model-specific max_tokens config](https://github.com/sipeed/picoclaw/pull/2132)** — Closed stale; if configuration granularity remains desirable, it needs a fresh owner or explicit roadmap decision.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-10

## 1. Today's Overview

NanoClaw is in a **high-activity but no-merge phase**: 16 PRs were updated in the last 24 hours, 1 new issue was opened, and no PRs were merged or closed. The dominant themes are **container security/hardening** (CVE fixes, Docker Hub publishing, package-channel gaps), **channel integration fixes** (Signal attachments, Slack tables, Dial channel support), and **internal refactors** (module lifecycle hooks, migration registries, renderer registration). Activity is healthy, but the zero merge/close count suggests either a review bottleneck or a deliberate accumulation before a batch merge. The only new issue is a feature-blocking gap around `install_packages` and Python packages.

## 2. Releases

**None.** No new releases were published in the last 24 hours.

## 3. Project Progress

**No PRs were merged or closed in the last 24 hours.** However, several important open PRs were actively updated, indicating forward motion in review/development:

- **[#3208 — feat(ci): publish agent image to Docker Hub with CVE gates](https://github.com/qwibitai/nanoclaw/pull/3208)** (core-team)  
  Adds a manual multi-arch Docker Hub publishing workflow with CVE gating on hardened-pin verification.

- **[#3207 — fix(container): bump pnpm and npm past fixable-critical tar CVE](https://github.com/qwibitai/nanoclaw/pull/3207)** (core-team)  
  Addresses critical `tar` vulnerabilities flagged by grype in both npm and pnpm toolchains.

- **[#3218 — feat(cli): accept bounded JSON from stdin](https://github.com/qwibitai/nanoclaw/pull/3218)**  
  Adds a generic `--stdin-json` input mode to host and container `ncl` clients.

- **[#3215 — fix(permissions): redact DM resolution logs](https://github.com/qwibitai/nanoclaw/pull/3215)**  
  Privacy fix to stop sensitive DM resolution data from appearing in logs.

- **[#3214 / #3213 / #3212 / #3211](https://github.com/qwibitai/nanoclaw/pull/3214)**  
  A series of refactors and docs: unified module lifecycle hooks, registered question renderers, module migration registry, and a single-responsibility integration rule for skills.

Also updated: Signal attachment fixes ([#3142](https://github.com/qwibitai/nanoclaw/pull/3142), [#2529](https://github.com/qwibitai/nanoclaw/pull/2529)) and a Slack table-surfacing fix ([#3209](https://github.com/qwibitai/nanoclaw/pull/3209)).

## 4. Community Hot Topics

No comments/reactions were recorded in the supplied data, so "hotness" is inferred from update activity, cross-PR relationships, and the underlying problems they address.

- **[#3217 — `install_packages` has no pip channel](https://github.com/qwibitai/nanoclaw/issues/3217)**  
  The only open issue and likely the most strategically important item today: Python-dependent agents cannot use the hardened prebuilt image path because `install_packages` only models `packages_apt` and `packages_npm`.

- **[#3041 / #3050 — Dial channel adapter + setup wizard integration](https://github.com/qwibitai/nanoclaw/pull/3041)**  
  Community PRs adding a Dial channel for SMS and AI voice calls. These have been open since mid-July and were updated again, showing sustained interest.

- **[#3208 — Docker Hub publishing with CVE gates](https://github.com/qwibitai/nanoclaw/pull/3208)**  
  Core-team PR that signals a roadmap push toward production-grade agent image distribution.

- **[#2529 / #3142 / #3210 — Signal & inbound attachment handling](https://github.com/qwibitai/nanoclaw/pull/2529)**  
  Multiple related PRs around the same pain point: attachments addressed to agents are being dropped or routed to unmounted paths.

**Underlying needs:** Users want secure, production-ready images; Python package support in hardened builds; reliable attachment delivery across channels; and new channel integrations (Dial).

## 5. Bugs & Stability

Ranked by severity:

1. **Critical — `tar` vulnerability in agent image**  
   [PR #3207](https://github.com/qwibitai/nanoclaw/pull/3207) fixes GHSA-23hp-3jrh-7fpw (critical, fix available) affecting both npm 10.9.8 and pnpm 10.33.0 vendored `tar` versions. A base refresh alone does not clear it, so the fix requires explicit toolchain bumps.

2. **High — inbound attachments delivered to a dead path / dropped**  
   [PR #3142](https://github.com/qwibitai/nanoclaw/pull/3142) fixes Signal adapter path splicing into `/workspace/extra/signal-attachments/<id>`, which was never mounted. [PR #2529](https://github.com/qwibitai/nanoclaw/pull/2529) also addresses inbound attachments being dropped instead of delivered. Related docs in [PR #3210](https://github.com/qwibitai/nanoclaw/pull/3210).

3. **Medium — DM resolution logs not redacted**  
   [PR #3215](https://github.com/qwibitai/nanoclaw/pull/3215) fixes a permissions/privacy leak where DM resolution logs are not redacted.

4. **Low/Medium — Slack pasted tables not surfaced to agent**  
   [PR #3209](https://github.com/qwibitai/nanoclaw/pull/3209) aims to surface pasted tables from Slack to the agent.

5. **Blocker for some users — no pip channel in `install_packages`**  
   [Issue #3217](https://github.com/qwibitai/nanoclaw/issues/3217) is not a crash but blocks hardened-image adoption for Python-dependent installs. Docs PR [#3216](https://github.com/qwibitai/nanoclaw/pull/3216) acknowledges the limitation.

## 6. Feature Requests & Roadmap Signals

- **Python/pip support in `install_packages`** — requested in [#3217](https://github.com/qwibitai/nanoclaw/issues/3217). This is a likely near-term roadmap item given the hardened-image push and the immediate docs PR acknowledging the gap.
- **Docker Hub publishing with CVE gates** — [#3208](https://github.com/qwibitai/nanoclaw/pull/3208) suggests official agent image distribution is coming.
- **Bounded JSON stdin for CLI clients** — [#3218](https://github.com/qwibitai/nanoclaw/pull/3218) would add structured input without changing the daemon/authorization model.
- **Dial channel integration** — [#3041](https://github.com/qwibitai/nanoclaw/pull/3041) and [#3050](https://github.com/qwibitai/nanoclaw/pull/3050) add SMS/AI voice support; likely to land if maintainers approve the channel-adapter pattern.

**Prediction:** The next version will likely include security fixes (`tar` CVE), attachment-delivery corrections, and possibly `--stdin-json` or pip-channel support if the current PRs are merged.

## 7. User Feedback Summary

Real user pain points visible in today's data:

- **Python tooling cannot use hardened images.** Users need a `packages_pip`/Python channel equivalent to `apt` and `npm`.
- **Attachments silently fail.** Signal and other inbound attachments are routed to unmounted paths or dropped entirely — a core usability issue for agent workflows.
- **Security compliance matters.** Users/maintainers are actively tracking fixable critical CVEs in the base image and want a published agent image with CVE gates.
- **Manual/log transparency matters.** DM resolution logs should not leak private resolution details.
- **Channel completeness matters.** Slack tables, Signal files/images, and Dial voice/SMS all represent user demand for more robust channel adapters.

No explicit satisfaction/dissatisfaction metrics were available.

## 8. Backlog Watch

PRs/Issues that have been open for a while and need maintainer attention:

- **[#2529 — fix(signal): deliver inbound attachments to the agent instead of dropping them](https://github.com/qwibitai/nanoclaw/pull/2529)**  
  Open since **May 18, 2026**. Related to the same attachment-delivery problem as #3142; several months old and still unmerged.

- **[#3041 — feat(channels): add Dial channel adapter](https://github.com/qwibitai/nanoclaw/pull/3041) / [#3050 — Dial setup wizard/skills](https://github.com/qwibitai/nanoclaw/pull/3050)**  
  Open since **July 14, 2026**. Significant feature contributions with no merge signal yet.

- **[#3142 — fix(signal): forward image/file attachments through mounted inbox](https://github.com/qwibitai/nanoclaw/pull/3142)**  
  Open since **July 27, 2026**. Fixes a blocking attachment bug; important for Signal users.

- **[#3186 — refactor: add host seams for skill-owned capabilities](https://github.com/qwibitai/nanoclaw/pull/3186)**  
  Open since **August 4, 2026**, updated recently; foundational refactor that may affect other skills/PRs.

The long-open attachment PRs (#2529, #3142) are the clearest candidates for maintainer prioritization, as they affect core agent functionality and have matching documentation PRs.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-10

## 1. Today's Overview

IronClaw is in a high-activity period: **25 issues** and **38 PRs** were updated in the last 24 hours, with **7 issues closed** and **8 PRs moved to merged/closed state**. The dominant themes are QA/bug-bash regression fixes, deferred tool-discovery improvements, and notification-channel expansion. No release was cut in this window. CI health is a recurring concern, with both a long-running “Keep CI Green” issue (#6463) and a fresh main-branch CI failure (#7413) open. Overall project health looks stable but under integration pressure, with several P1/P2 bugs being actively worked.

## 2. Releases

**No new releases in the last 24 hours.**

## 3. Project Progress

The provided PR sample does **not enumerate individual merged PRs**, but the 8 merged/closed PRs in the window align with a steady stream of fixes. Several notable open PRs advanced:

- **[#7411 — Deferred-tool retrieval as a swappable provider](https://github.com/nearai/ironclaw/issues/7411)** — Reborn tool-search follows the memory-provider seam; host depends on a port, not a concrete provider.
- **[#7410 — Bounded complete signatures for tool_search](https://github.com/nearai/ironclaw/issues/7410)** — Implements Phase 1 of #7405; returns canonical `parameters` and `schema_complete: true` when budgets allow.
- **[#7409 — Baseline tool-search catalogs at 100–1,000 tools](https://github.com/nearai/ironclaw/issues/7409)** — Adds judged retrieval baselines without changing production behavior.
- **[#7401 — Reject streamed Responses requests with external tools](https://github.com/nearai/ironclaw/issues/7401)** — Prevents the unsupported `stream: true` + `tools[]` combination from creating a run/thread.
- **[#7398 — Web-push notifications + PWA](https://github.com/nearai/ironclaw/issues/7398)** — Adds a first-party `web-push` channel for automation delivery, matching Slack/Telegram parity.
- **[#7397 — Presence-based Slack/Telegram channels](https://github.com/nearai/ironclaw/issues/7397)** — Reworks channel presence and removes the owner-vs-actor concept from run scope.
- **[#7395 — Outbound send-claim TOCTOU race fix](https://github.com/nearai/ironclaw/issues/7395)** — Fixes claim-loss misclassification and allows failed-row reopen.
- **[#7338 / #7337 / #7335 — WebUI refactors](https://github.com/nearai/ironclaw/issues/7338)** — Delivery-target selection, shared file-picker hook, and Logs `SelectMenu` migration.

Closed issues in the window include long-standing QA bugs: **#5522**, **#7292**, **#5552**, **#5509**, **#5510**, **#4341**, and **#4344**.

## 4. Community Hot Topics

Issue comment activity was modest, with reactions at zero across the snapshot. The most-discussed items:

- **[#5522 — Reborn routine fails when task requires reading Slack DMs](https://github.com/nearai/ironclaw/issues/5522)** *(4 comments, closed)*  
  Underlying need: users expect Slack DMs to be a first-class readable capability; the agent currently lacks it and enters a `capability_info` retry loop.

- **[#7405 — Improve deferred tool discovery](https://github.com/nearai/ironclaw/issues/7405)** *(2 comments)*  
  Wants complete signatures and namespace-aware catalog previews to reduce model turns and catalog blindness at large tool counts.

- **[#7407 — Execute parallel capability batches concurrently](https://github.com/nearai/ironclaw/issues/7407)** *(2 comments)*  
  The loop computes `BatchPolicy::Parallel`, but the production capability port still runs batches sequentially.

- **[#7400 — `stream: true` + caller tools creates undeletable zombie thread](https://github.com/nearai/ironclaw/issues/7400)** *(2 comments)*  
  High-severity API bug with 100% reproduction on v1.1.0; fix PR #7401 now exists.

- **[#7346 / #7348 / #7345 — QA bug cluster](https://github.com/nearai/ironclaw/issues/7346)** *(2 comments each)*  
  Emoji shortcode rendering, Activity chronological ordering, and automation count mismatches all drew QA attention.

The underlying pattern is a mix of **missing capability parity** (Slack DMs, notification channels) and **scale/performance hardening** (tool discovery, batch concurrency, catalog size).

## 5. Bugs & Stability

Ranked by severity:

- **High — [Zombie thread on `stream: true` + external tools (#7400)](https://github.com/nearai/ironclaw/issues/7400)**  
  Fails mid-stream and leaves a permanently undeletable thread; affects `1.1.0-rc.1` and `1.1.0`. **Fix PR exists: #7401.**

- **P1 (closed) — [Installed tool unusable; runner heartbeat error (#7292)](https://github.com/nearai/ironclaw/issues/7292)**  
  CoinGecko tool installed but fails on use. Closed in this window, indicating a fix landed.

- **P2 — [Activity tool calls and progress messages out of order (#7348)](https://github.com/nearai/ironclaw/issues/7348)**  
  Long-running tasks show confusing execution timelines in chat UI.

- **P2 — [Agent reports 61 automations vs UI’s 50 (#7345)](https://github.com/nearai/ironclaw/issues/7345)**  
  Possible hallucinated automation state or backend/UI count inconsistency.

- **P2 — [Refreshing chat loses run history and Activity timeline (#7349)](https://github.com/nearai/ironclaw/issues/7349)**  
  Significant execution history disappears after page refresh.

- **P2 — [Emoji shortcodes rendered as plain text (#7346)](https://github.com/nearai/ironclaw/issues/7346)**  
  Regression in assistant message rendering.

- **P2 — [Repeated Slack reconnects leave auth broken (#5882)](https://github.com/nearai/ironclaw/issues/5882)**  
  “Waiting for Slack…” forever; only recovery is reinstall. Open since July 9.

- **P2 — [Routines can create/modify other routines (#6479)](https://github.com/nearai/ironclaw/issues/6479)**  
  Self-replicating automation risk; no guardrail against routine inception.

- **P2 — [Revoked GitHub token produces misleading errors (#5878)](https://github.com/nearai/ironclaw/issues/5878)**  
  Should trigger re-auth, not generic encoding/provider errors.

- **Closed regressions addressed:** #5522 (Slack DM capability gap), #5552 (generic “invalid result”), #5509 (chat creation latency), #5510 (cannot delete routines), #4341 (chain-of-thought exposed), #4344 (mirrored user message).

## 6. Feature Requests & Roadmap Signals

- **[#7183 — Per-user LLM model selection](https://github.com/nearai/ironclaw/issues/7183)**  
  Raised at the 2026-07-23 IronClaw Champions check-in; model selection is currently admin-only. This is a clear product gap and likely candidate for a user-facing settings version.

- **[#7392 — Replace first-party coding tools with pinned `omp` tool surface](https://github.com/nearai/ironclaw/issues/7392)**  
  Epic experiment to align model-visible coding tools with an external contract. Could significantly reduce tool-surface maintenance.

- **[#7166 — Tool disclosure follow-up epic (v1.2.0)](https://github.com/nearai/ironclaw/issues/7166)**  
  Progressive tool disclosure is now Reborn default; follow-up work is explicitly tagged v1.2.0.

- **[#7405 + #7407 — Tool discovery and batch concurrency](https://github.com/nearai/ironclaw/issues/7405)**  
  Both are performance enablers for large catalogs and multi-tool-call turns; PRs #7409/#7410 already land steps toward them.

- **[#7360 — Expand stress coverage for built-in/durable write paths](https://github.com/nearai/ironclaw/issues/7360)**  
  A reliability investment; signals concern about regressions in built-in capability writes.

Prediction for next minor release: **tool-search signature completeness, parallel capability batches, and at least one notification-channel improvement** are the strongest candidates, alongside the v1.2.0 epic #7166.

## 7. User Feedback Summary

- **Slack DMs are a real workflow requirement** — #5522 shows users expect the agent to read direct messages, and failure currently blocks routine completion.
- **Excessive tool calls frustrate simple workflows** — [#6046](https://github.com/nearai/ironclaw/issues/6046): a simple “add emails to Google Sheet” task used **124 tool invocations**, with the agent analyzing unrelated content.
- **Automations post the wrong messages** — [#5551](https://github.com/nearai/ironclaw/issues/5551): Slack-triggered automations send intermediate progress messages instead of final summaries.
- **Misleading errors are a UX pain point** — #5878 (revoked GitHub token) and #5552 (generic “invalid result”) both hide root cause from users.
- **Admin-only LLM selection is being questioned** — #7183 came from a Champions check-in, indicating real user demand for per-user model choice.
- **Positive direction**: the web-push/PWA PR #7398 and presence-based Slack/Telegram PR #7397 show active investment in notification-channel parity, a repeatedly requested area.

## 8. Backlog Watch

- **[#5101 — CI: reuse cargo-component installer in live canary](https://github.com/nearai/ironclaw/issues/5101)**  
  Open since **June 20**, last updated in this window. Long-running CI reliability PR, still not merged.

- **[#5882 — Repeated Slack reconnect auth breakage](https://github.com/nearai/ironclaw/issues/5882)**  
  Open since July 9; no fix PR visible in the snapshot. High user impact.

- **[#6046 — Excessive tool invocations in email-to-sheet workflow](https://github.com/nearai/ironclaw/issues/6046)**  
  Open since July 13; 124 tool calls indicates an efficiency problem that likely needs model/tool-selection tuning.

- **[#6479 — Self-replicating routines risk](https://github.com/nearai/ironclaw/issues/6479)**  
  Open since July 22; a safety guardrail issue that may deserve prioritization.

- **[#6463 — Keep CI Green](https://github.com/nearai/ironclaw/issues/6463)** and **[#7413 — Fix main branch CI failures 20260810](https://github.com/nearai/ironclaw/issues/7413)**  
  Both CI-health issues are open with zero comments; #7413 was created today and needs immediate triage.

- **[#7048 — WASM guest diagnostics sanitization](https://github.com/nearai/ironclaw/issues/7048)**  
  A 20-commit stack depending on #7063; both PRs have been open since August 3 and require coordinated review.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI Project Digest — 2026-08-10

### 1. Today's Overview

LobsterAI activity over the last 24 hours was maintenance-heavy rather than release-focused: **2 issues updated** (1 open, 1 closed) and **10 PRs updated** (3 open, 7 closed/merged). No new releases were published. A large portion of the closed PRs is carrying the `stale` label, indicating automated housekeeping of older work rather than a sudden burst of feature development. At the same time, one genuinely new open PR (#2454) targets a runtime stability fix in the OpenClaw gateway, and one new user issue (#2453) reports custom-model validation problems. Overall project health is stable, with active bug triage and a backlog of older UI/UX improvements being finalized or cleaned up.

---

### 2. Releases

**None.** No new LobsterAI releases were published on 2026-08-10.

---

### 3. Project Progress

Seven PRs updated today are closed/merged, showcasing a mix of OpenClaw gateway fixes, UI/UX improvements, and i18n corrections:

- **#1247 — fix openclaw model switch recovery after provider limits**  
  Detects runtime `app_config` model/provider changes, restarts or defers OpenClaw restart as needed, per-agent model config emission, and managed session store migration.  
  [netease-youdao/LobsterAI PR #1247](https://github.com/netease-youdao/LobsterAI/pull/1247)

- **#1249 — fix(cowork): DiffView not rendering for Edit tools**  
  Widens tool-name matching to cover Claude SDK and OpenClaw actual tool names (`str_replace_editor`, `TextEditor`, `file_editor`, etc.).  
  [netease-youdao/LobsterAI PR #1249](https://github.com/netease-youdao/LobsterAI/pull/1249)

- **#1252 — feat(scheduled-task): unsaved changes confirmation on cancel/back**  
  Adds a proper confirmation modal for scheduled-task forms when users attempt to leave with unsaved edits.  
  [netease-youdao/LobsterAI PR #1252](https://github.com/netease-youdao/LobsterAI/pull/1252)

- **#1256 — 定时任务配置优化：支持自然语言**  
  Adds natural-language parsing for scheduled-task execution times, with LLM-based conversion to cron or timestamp and edit-mode locking.  
  [netease-youdao/LobsterAI PR #1256](https://github.com/netease-youdao/LobsterAI/pull/1256)

- **#1257 — fix(i18n): add missing `edit` and `delete` translation keys**  
  Fixes undefined keys used in memory-management UI buttons.  
  [netease-youdao/LobsterAI PR #1257](https://github.com/netease-youdao/LobsterAI/pull/1257)

- **#1258 — feat(cowork): unsaved-change confirmation for scheduled-task form**  
  Similar to #1252, protects both the "Cancel" button and the top-left back arrow.  
  [netease-youdao/LobsterAI PR #1258](https://github.com/netease-youdao/LobsterAI/pull/1258)

- **#1259 — refactor(openclaw): optimize gateway bundling and dependency handling**  
  Adds stub packages for external IM/channel SDKs, patches chalk v4 CJS exports, and injects `LOBSTER_API_KEY` as an alias for gateway fallback behavior.  
  [netease-youdao/LobsterAI PR #1259](https://github.com/netease-youdao/LobsterAI/pull/1259)

Also active today:

- **#2454 — [OPEN] fix(openclaw): stop tool-loop guard from killing legitimate polling**  
  Newly created PR targeting a possible false-positive in tool-loop protection.  
  [netease-youdao/LobsterAI PR #2454](https://github.com/netease-youdao/LobsterAI/pull/2454)

---

### 4. Community Hot Topics

- **Issue #1243 — qwen-portal-auth plugin configuration loop causes repeated gateway restarts**  
  **Comments: 2** | Closed as stale after being open since April.  
  Users report the gateway restarts every 5–20 minutes with an "AI 引擎正在启动网关..." popup. The issue was closed, but no linked fix appears in the data, so the underlying problem may still deserve attention.  
  [netease-youdao/LobsterAI Issue #1243](https://github.com/netease-youdao/LobsterAI/issues/1243)

- **Issue #2453 — Switching to a custom model is marked as not permitted**  
  **Comments: 1** | Open, created 2026-08-09.  
  Model definitions like `custom_1/openai/gpt-oss-20b:free` are misinterpreted because the system uses `provider/model` parsing rules. Affects OpenRouter free models and NVIDIA-hosted models, especially when switching mid-thread.  
  [netease-youdao/LobsterAI Issue #2453](https://github.com/netease-youdao/LobsterAI/issues/2453)

The custom-model parsing issue is the strongest active community signal today: users are encountering provider-name collisions in a common real-world workflow (switching models inside an existing thread).

---

### 5. Bugs & Stability

Ranked by severity:

1. **High — `qwen-portal-auth` config write loop causes gateway restarts (#1243)**  
   Gateway restarts every 5–20 minutes; plugins keep rewriting config. This is a serious stability regression for affected users on Windows. The issue was closed as stale, but no fix PR is visible.  
   [netease-youdao/LobsterAI Issue #1243](https://github.com/netease-youdao/LobsterAI/issues/1243)

2. **Medium — Custom model definitions misparsed as unsupported provider/model (#2453)**  
   Model names such as `openai/gpt-oss-20b:free` are incorrectly classified, causing permission/validation errors. This affects switching models inside a conversation thread.  
   [netease-youdao/LobsterAI Issue #2453](https://github.com/netease-youdao/LobsterAI/issues/2453)

3. **Medium — Tool-loop guard may kill legitimate polling (#2454)**  
   Open PR directly addresses the risk that the guard mechanism terminates valid polling workflows. The fix is not yet merged.  
   [netease-youdao/LobsterAI PR #2454](https://github.com/netease-youdao/LobsterAI/pull/2454)

4. **Low/UX — DiffView fails to render for Claude/OpenClaw Edit tools (#1249)**  
   Tool-name matching was too narrow; fix is closed/merged.  
   [netease-youdao/LobsterAI PR #1249](https://github.com/netease-youdao/LobsterAI/pull/1249)

5. **Low/UI — Missing i18n `edit` and `delete` keys (#1257)**  
   Impacted memory-management buttons; fix is closed/merged.  
   [netease-youdao/LobsterAI PR #1257](https://github.com/netease-youdao/LobsterAI/pull/1257)

6. **Build risk — OpenClaw gateway bundling missing external SDK exports (#1259)**  
   Addressed with stub package generation and dependency patches; closed/merged.  
   [netease-youdao/LobsterAI PR #1259](https://github.com/netease-youdao/LobsterAI/pull/1259)

---

### 6. Feature Requests & Roadmap Signals

- **Natural-language scheduled task configuration (#1256)**  
  Closed PR adds an LLM-based scheduler parser and a UI mode toggle. This strongly signals that scheduled-task UX is an active focus area and likely to appear in the next release.  
  [netease-youdao/LobsterAI PR #1256](https://github.com/netease-youdao/LobsterAI/pull/1256)

- **Unsaved-changes protection for scheduled-task forms (#1252, #1258)**  
  Two parallel implementations of the same UX improvement were closed today. This indicates a clear, user-driven need for data-loss protection in form-heavy workflows.  
  [PR #1252](https://github.com/netease-youdao/LobsterAI/pull/1252) · [PR #1258](https://github.com/netease-youdao/LobsterAI/pull/1258)

- **Better model/provider switch handling (#1247, #2453)**  
  Closed PR #1247 improves OpenClaw model-switch recovery, while open issue #2453 reports a related parsing bug. The next release should include more robust provider/model handling for custom and OpenRouter-style model IDs.  
  [PR #1247](https://github.com/netease-youdao/LobsterAI/pull/1247) · [Issue #2453](https://github.com/netease-youdao/LobsterAI/issues/2453)

- **Tool-loop guard tuning (#2454)**  
  The open PR suggests the project is actively refining OpenClaw safety mechanisms to avoid false positives. This may land in a near-term patch release.  
  [PR #2454](https://github.com/netease-youdao/LobsterAI/pull/2454)

---

### 7. User Feedback Summary

User-reported pain points visible in today's data:

- **Gateway stability is a major concern.** The `qwen-portal-auth` config loop causing restarts every 5–20 minutes is the most severe complaint in the current backlog.
- **Custom model workflow friction.** Users on OpenRouter free models and NVIDIA-hosted models are blocked by over-strict `provider/model` parsing when switching models mid-thread.
- **Loss of unsaved work was a real annoyance.** Two PRs were needed to add confirmation dialogs for scheduled-task forms, reflecting repeated user frustration.
- **DiffView usability.** Users could not see visual diffs when Claude/OpenClaw Edit tools were used; this has been fixed.
- **Small UI gaps.** Missing translation keys for "edit" and "delete" indicate ongoing i18n polish.

No explicit positive feedback was recorded in this data window, but the volume of UX-focused PRs suggests the maintainers are actively responding to prior complaints.

---

### 8. Backlog Watch

- **Issue #1243 — qwen-portal-auth gateway restart loop**  
  Closed as stale despite being a high-severity bug with no visible fix. Should be re-triaged or at least linked to a known fix.  
  [netease-youdao/LobsterAI Issue #1243](https://github.com/netease-youdao/LobsterAI/issues/1243)

- **Issue #2453 — Custom model misclassified as unsupported**  
  Open since 2026-08-09, only one comment, no maintainer response yet. Needs triage because it affects a common model-switching workflow.  
  [netease-youdao/LobsterAI Issue #2453](https://github.com/netease-youdao/LobsterAI/issues/2453)

- **PR #1275 — CI: bump actions/stale from 9.1.0 to 10.2.0**  
  Open since April 2026, updated today by the stale bot. Dependency bumps with no maintainer action are accumulating.  
  [netease-youdao/LobsterAI PR #1275](https://github.com/netease-youdao/LobsterAI/pull/1275)

- **PR #1276 — CI: bump actions/first-interaction commit hash**  
  Open since April 2026, also stale. Housekeeping dependency updates are being left unresolved.  
  [netease-youdao/LobsterAI PR #1276](https://github.com/netease-youdao/LobsterAI/pull/1276)

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-10

## 1. Today's Overview

Moltis saw a low-activity day: 2 issues were updated (both open, both bug reports), 1 pull request was updated (open, no merges), and no new releases were published. Neither of the two reported bugs has a linked fix PR yet, and no issues or PRs attracted comments or reactions in the observed window. The sole in-flight PR targets the vault encryption layer and is the project's most concrete forward movement. Overall, the project appears to be in a maintenance/bugfix phase with steady but quiet contributor activity.

- Issues updated (last 24h): 2 (open: 2, closed: 0)
- PRs updated (last 24h): 1 (open: 1, merged/closed: 0)
- Releases: none

## 2. Releases

No releases were published in the last 24 hours. There is nothing to summarize; the section is omitted per the data.

## 3. Project Progress

No PRs were merged or closed today, so no features or fixes were officially integrated into `main` in this window. The only active work is:

- **[PR #1186 — fix(vault): normalize recovery phrase before hashing](https://github.com/moltis-org/moltis/pull/1186)** (open, by pxmpsdev)
  - Purpose: `derive_recovery_kek` already normalizes the recovery phrase (strips dashes, uppercases) during unsealing, but the stored hash was computed over the raw phrase. This PR aligns hashing with the existing normalization so that vault unsealing is consistent with how phrases are persisted.
  - Status: Open, awaiting review/merge. No comments recorded.

This fix would close a correctness gap in the vault recovery flow, complementing the existing `recovery_key_case_insensitive` coverage.

## 4. Community Hot Topics

Notably, none of the current issues or PRs have accumulated comments or 👍 reactions in the observed window, so there is no active community debate. The most "visible" items are nevertheless telling:

- **[Issue #1185 — Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)** (open, by mikz) — touches the container runtime integration layer, a core dependency for users relying on Apple Container sandboxes.
- **[Issue #1187 — Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)** (open, by IlyaBizyaev) — concerns the settings UI, indicating user-facing config management friction.
- **[PR #1186 — vault recovery phrase normalization](https://github.com/moltis-org/moltis/pull/1186)** (open) — reflects user pain around case- and dash-sensitive recovery phrases.

Underlying needs: users are hitting integration correctness issues (container detection) and configuration/data-preservation problems (UI settings, recovery phrases). These are reliability and UX concerns rather than new-feature requests.

## 5. Bugs & Stability

Two new/open bug reports were active in the last 24 hours. Ranked by severity:

1. **High — [Issue #1185: Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)** (open, by mikz, created 2026-08-08)
   - Impact: Sandbox runtime state mismatch could break container lifecycle management for Apple Container 1.x users. The bug is in environment detection/status tracking and could affect automation that depends on accurate run state.
   - Fix PR: None linked; no comments recorded.

2. **Medium — [Issue #1187: Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)** (open, by IlyaBizyaev, created 2026-08-09)
   - Impact: User-configured heartbeat settings are silently reset when saving unrelated form fields. This is a silent data-loss bug in the settings UI — no visible error, potentially unnoticed until later.
   - Fix PR: None linked; no comments recorded.

Both reports have zero comments, so maintainers have not yet publicly triaged them in this window. PR #1186 addresses a different but related vault bug (hash normalization) not captured in the two issues above.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests appear in the last 24 hours. However, the active data points signal where the next version may focus:

- **Vault/recovery UX hardening** — PR #1186 normalizing recovery phrases suggests the team is already investing in the vault key management path; expect future polish around key entry and case handling.
- **Container runtime compatibility** — Issue #1185 indicates Apple Container 1.x is an active user environment; supporting it correctly is likely a priority for the container subsystem.
- **Settings UI redesign / form model alignment** — Issue #1187 implies the settings form does not round-trip all persisted fields; a fix may involve switching to a field-aware form model or adding explicit "unsaved changes" warnings.

Prediction: the next patch/minor version will likely include vault key normalization (PR #1186) and fixes for the Apple Container detection issue, possibly with a settings-persistence fix following.

## 7. User Feedback Summary

Real user pain points surfaced in this window:

- **Moltis misreports container runtime state** — a user running Apple Container 1.x reports that the sandbox actually starts, but Moltis's status tracker disagrees, undermining trust in runtime observability.
- **Settings are silently discarded** — the Heartbeat settings UI resets fields that are not part of the current form, meaning users can lose configuration without any warning or error.
- **Vault recovery phrases are sensitive to case and dashes in practice** — a contributor is remediating this, implying users have experienced unsealing failures or inconsistencies.

No positive or negative satisfaction metrics (reactions, closing comments) were recorded in this window. The absence of comments on any issue or PR suggests low community engagement today, rather than high satisfaction.

## 8. Backlog Watch

Based on the last-24h snapshot, there are no long-unanswered issues or orphaned PRs: the newest issue is from 2026-08-08, and the oldest item (Issue #1185) is only ~2 days old. No item shows maintainer inactivity beyond a normal triage timeline.

Items to keep an eye on:

- **[Issue #1185](https://github.com/moltis-org/moltis/issues/1185)** — unchecked for 2 days; high-severity runtime-state bug, though still within a reasonable response window.
- **[Issue #1187](https://github.com/moltis-org/moltis/issues/1187)** — unchecked for 1 day; silent settings reset.
- **[PR #1186](https://github.com/moltis-org/moltis/pull/1186)** — awaiting review; the longer it sits without maintainer feedback, the more it risks blocking the related vault fixes and potential contributors.

No PRs or issues were identified as genuinely stale in this snapshot; watch for #1185 if it passes 5–7 days without triage.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-10

**Project:** QwenPaw / CoPaw ecosystem  
**Data snapshot:** 32 issues updated in 24h (25 open, 7 closed) · 37 PRs updated (31 open, 6 closed/merged) · 0 new releases

---

## 1. Today's Overview

QwenPaw is in an active hardening phase, with heavy issue and PR churn around the `2.1.0b2` desktop/console release. The last 24 hours show no new releases, but 6 PRs were closed/merged and a large wave of bug reports focused on provider compatibility, MCP reliability, Windows packaging, and desktop UI performance. Community participation is healthy: several first-time-contributor PRs are open, and users are providing unusually detailed root-cause analysis in bug reports. The project appears to be prioritizing stability fixes ahead of the next beta/stable version.

---

## 3. Project Progress

Closed/merged PRs in the last 24 hours include:

- [PR #6857](https://github.com/agentscope-ai/QwenPaw/pull/6857) — `fix(sandbox)`: emit WARNING when non-dataclass `sandbox_config` is silently discarded.
- [PR #6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) — `fix(os)`: restore text selection and copy in OS desktop window content.
- [PR #6802](https://github.com/agentscope-ai/QwenPaw/pull/6802) — `fix`: restore desktop window text selection (companion fix).
- [PR #5418](https://github.com/agentscope-ai/QwenPaw/pull/5418) — `fix(cron)`: record APScheduler misfires in history and raise default misfire grace to 600s.
- [PR #6855](https://github.com/agentscope-ai/QwenPaw/pull/6855) — `fix(timestamp)`: interpret naive Msg timestamps as process-local timezone, fixing a +8h drift regression.

Notable open PRs with activity that may land soon:

- [PR #6843](https://github.com/agentscope-ai/QwenPaw/pull/6843) — real-time SSE streaming via ASGI middleware, addressing delayed UI output.
- [PR #6834](https://github.com/agentscope-ai/QwenPaw/pull/6834) — pause offscreen infinite CSS animations to reduce idle CPU usage.
- [PR #6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) — isolate plugin bare absolute imports, fixing `qwenpaw-creator` installation failures (#6683).
- [PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) — integrate AnySearch as a built-in web search provider.

---

## 4. Community Hot Topics

- [Issue #2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) — **Help Wanted: Open Tasks**  
  66 comments, the most active thread. It serves as a community contribution hub, listing P0–P2 tasks. The high engagement signals strong external contributor interest, but also suggests maintainers need to keep the task list current.

- [Issue #6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) — **Docker plugin/app marketplace always shows "maintenance"**  
  9 comments. This is a core blocker for Docker users: the plugin market and app market are unusable in `2.0.1`. Underlying need is clear: Docker distribution/registry health needs urgent attention.

- [Issue #6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) — **OpenAI Responses continuation summary ignores `disable_thinking` and misreports cancellation**  
  5 comments. Users report that Scroll eviction triggers a synchronous summary call that blocks the main conversation for ~60 seconds. This combines model behavior, timeout handling, and UX reporting.

- [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) — **Assistant message completion time displays incorrectly**  
  5 comments. The UI shows a few seconds even when the assistant actually thought for 2 minutes. This is a data-flow bug between persisted messages and console rendering.

- [Issue #6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) — **Web console mobile adaptation**  
  5 comments. A recurring feature request: users want to operate QwenPaw from mobile browsers, but the web console is desktop-oriented.

---

## 5. Bugs & Stability

Ranked roughly by severity:

- **P0 – Conversation-blocking / crash-level**
  - [Issue #6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) — OpenAI Responses continuation summary blocks the main conversation and misreports 60s cancellation as malformed output. No fix PR yet.
  - [Issue #6822](https://github.com/agentscope-ai/QwenPaw/issues/6822) — Transient `streamable_http` MCP failure permanently blocks the active conversation after automatic reconnect. No fix PR yet.
  - [Issue #6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) — macOS SIGBUS crash in `sqlite3WalFindFrame` while opening Scroll `history.db` WAL. Affects history/state reliability on macOS.

- **P1 – Provider/API compatibility**
  - [Issue #6812](https://github.com/agentscope-ai/QwenPaw/issues/6812) — Google Gemini API rejects tool schemas containing `$schema`; `Model 'unknown' execution failed`.
  - [Issue #6821](https://github.com/agentscope-ai/QwenPaw/issues/6821) — Thinking-mode models (e.g. DeepSeek V4) fail with 400 because `reasoning_content` is not passed back.
  - [Issue #6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — MCP tool calls pass digit-like strings as numbers, breaking APIs that require string types.
  - [Issue #6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) — Docker marketplace plugins/apps stuck in "maintenance" mode.

- **P1 – Windows packaging/installer**
  - [Issue #6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) — Windows update/install fails with NSIS "cannot write file" errors; installer should terminate processes locking the install directory first.

- **P2 – UI/UX defects**
  - [Issue #6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) — Frontend hides streaming output until the full response completes; fix PR [PR #6843](https://github.com/agentscope-ai/QwenPaw/pull/6843) addresses this.
  - [Issue #6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) — Idle console uses ~20% CPU due to infinite CSS animations; fix PR [PR #6834](https://github.com/agentscope-ai/QwenPaw/pull/6834) submitted.
  - [Issue #6852](https://github.com/agentscope-ai/QwenPaw/issues/6852) — Long multi-line tool output is collapsed into an unreadable blob in the frontend renderer. Several duplicate reports were closed (#6848–#6851), indicating a known, reproducible issue.

- **P2 – Platform/plugin edge cases**
  - [Issue #6831](https://github.com/agentscope-ai/QwenPaw/issues/6831) — macOS Desktop Whisper cannot find Homebrew ffmpeg because `/opt/homebrew/bin` is not in backend PATH.
  - [Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) — Chat auto-title generation fails with `KeyError: '__aiter__'` on agentscope 2.x `ChatResponse`.
  - [Issue #6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) — `qwenpaw-creator` plugin fails to load due to top-level `utils` module name conflict; fix PR [PR #6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) is open.
  - [Issue #6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) / [Issue #6807](https://github.com/agentscope-ai/QwenPaw/issues/6807) — `qwenpaw-creator` on Windows cannot save model configs or run video/image generation.

---

## 6. Feature Requests & Roadmap Signals

- [Issue #6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) — **Mobile web console support** remains a popular request; likely to gain traction if QwenPaw continues targeting personal-assistant use cases.
- [Issue #6832](https://github.com/agentscope-ai/QwenPaw/issues/6832) — **Human-readable approval descriptions**: AI should explain why it is requesting permission, not just show raw PowerShell/code. Improves trust and usability.
- [Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — **Memory dream sync is incomplete**: `prompts.py` claims digests are synced into `MEMORY.md`, but this was never implemented. This is both a documentation bug and a feature gap in ReMe memory.
- [Issue #6819](https://github.com/agentscope-ai/QwenPaw/issues/6819) — **Approval tool should visibly prompt** when required, otherwise users cannot tell if the agent is stuck or waiting.
- [Issue #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) — **Antivirus/EDR compatibility**: QwenPaw processes are being killed by security software during normal tasks; this may need packaging/signing or behavior changes.

**Prediction for next release:** The next 2.1.0 iteration will likely include SSE streaming fixes, MCP failure recovery improvements, stricter provider schema sanitization, plugin namespace isolation, and desktop CPU/performance fixes. Mobile console support and approval UX are strong candidates for longer-term roadmap items.

---

## 7. User Feedback Summary

- **Docker users are blocked**: The persistent "maintenance" state of plugin/app marketplaces (#6782) makes Docker deployments effectively incomplete.
- **Windows users face installation fatigue**: NSIS lock errors (#6810) and plugin installation failures (#6683, #6806, #6807) make upgrade/downgrade cycles painful.
- **Power users provide excellent diagnostics**: Many bug reports include root-cause analysis, wire traces, and exact stack traces (e.g., #6811, #6812, #6814, #6828). This indicates a technically sophisticated user base actively testing betas.
- **Frustration with delayed streaming**: Users do not want to wait until a full response completes to see model output, tool calls, or reasoning (#6820).
- **Positive contributor momentum**: Several first-time contributors are submitting fixes, especially around frontend performance (#6834), SSE streaming (#6843), and plugin isolation (#6688).

---

## 8. Backlog Watch

- [Issue #2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) — **Help Wanted task list** has 66 comments but was created in March. Maintainers should refresh claimed/done status to keep contributor onboarding effective.
- [Issue #6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) — **Mobile web console** has been open since July 20 with user demand but no visible maintainer response or linked PR.
- [PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — **Provider discovery/model metadata unification** has been open since July 21. It is a large architectural PR and likely needs dedicated maintainer review.
- [PR #6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — **Add Volcengine Agent Plan and Xiaomi MiMo V2.5 providers** has been open since July 28 with no visible comments; low-risk provider addition that may be waiting for reviewer bandwidth.
- [PR #6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) — **Plugin absolute-import isolation** is a first-time-contributor PR under review since August 4. It directly fixes a known plugin installation bug (#6683) and should be prioritized.
- [PR #6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) — **Persistent workspace artifact cards** has been open since August 5; it is a feature PR that may need design/product feedback.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-10

## 1. Today's Overview

ZeroClaw saw continued high activity on 2026-08-10: 50 issues and 50 PRs were updated in the last 24 hours, but no PRs were merged/closed and no new release shipped. The issue tracker is heavily weighted toward security findings from a recent audit — webhook fail-closed behavior, channel allowlist bypasses, egress policy, and missing per-agent memory isolation — plus RFC/governance discussions. All 50 updated PRs remain open; many carry `needs-author-action`, `risk:high`, or `size:XL`, suggesting a review/merge bottleneck. On the positive side, dependency security fixes and targeted bug-fix PRs are moving. Overall, the project has strong community engagement but is accumulating a large open PR backlog.

## 2. Releases

**No new releases in this window.** No release notes, breaking changes, or migration guidance to report.

## 3. Project Progress

No PRs were merged or closed in the last 24 hours. The only notable closure was issue [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) (system prompt tool-availability mismatch), which was marked closed after the core runtime fix landed previously.

High-signal open PRs updated in this window:

- [#9580](https://github.com/zeroclaw-labs/zeroclaw/pull/9580) — hardens built-in HTTP egress and moves network classification into `zeroclaw-infra::net_guard` for reuse by plugin egress work.
- [#9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) — streams `http_request` response bodies and stops the fal.ai client from following redirects.
- [#9875](https://github.com/zeroclaw-labs/zeroclaw/pull/9875) — adds per-agent env vars and workspace-confined `HOME` for the shell tool.
- [#9877](https://github.com/zeroclaw-labs/zeroclaw/pull/9877) and [#9878](https://github.com/zeroclaw-labs/zeroclaw/pull/9878) — fix cron CLI help examples and identify daemon process metrics in ZeroCode.
- [#9865](https://github.com/zeroclaw-labs/zeroclaw/pull/9865) and [#9870](https://github.com/zeroclaw-labs/zeroclaw/pull/9870) — clear security advisories in Rust and npm dependencies.
- [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) — Anthropic stored OAuth profile support.
- [#9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743) — wires modalities parsing into model capability detection.
- [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) — adds PowerShell as a native shell on Windows.

## 4. Community Hot Topics

- [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — **RFC: Work Lanes, Board Automation, and Label Cleanup** (22 comments). The most active governance thread; ratification is deferred while rollout proceeds. Underlying need: maintainers want less manual label/board management.
- [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) — **RFC: Per-model capability and context-window config** (12 comments). Users need accurate vision support and context budget per model alias rather than provider-family defaults.
- [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) — **RFC: Treat empty WhatsApp Web `allowed_groups` as permit-none** (11 comments). A security-focused RFC with broad interest; empty lists currently grant too much access.
- [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) — **System prompt tool-availability mismatch** (10 comments, now closed). High engagement because it affected every entry point; follow-up work continues.
- [#9545](https://github.com/zeroclaw-labs/zeroclaw/issues/9545) — **Gate rustdoc warnings in required PR CI** (1 👍, 3 comments). Developer-experience request to prevent documentation regressions.

The common thread: contributors are pushing for better automation, clearer risk/ownership rules, and stronger security defaults.

## 5. Bugs & Stability

Ranked by reported severity/risk:

- **P0 / S0 — Gateway webhook handlers do not fail closed** ([#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)). WhatsApp Cloud, Linq, and WATI webhooks can dispatch attacker-controllable messages without authentication. No direct fix PR was visible in this window.
- **S0 — Knowledge graph has no per-agent attribution** ([#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)). Any agent reads/mutates another agent's knowledge; severe data-isolation risk.
- **S0 — Matrix channel ignores `.well-known` homeserver delegation** ([#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855)). Breaks standard Matrix discovery and can send traffic to the wrong homeserver.
- **P1 / Security — Channel and egress audit findings** ([#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392), [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393), [#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395), [#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389), [#9627](https://github.com/zeroclaw-labs/zeroclaw/issues/9627)). LINE, Bluesky, Reddit, WASI egress, pairing lockout, and git global-option bypasses all carry `risk:high`.
- **S1 — `web_fetch` returns garbage for compressed responses** ([#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)). Fix PR [#9862](https://github.com/zeroclaw-labs/zeroclaw/pull/9862) is likely related and in flight.
- **S1 — Docker Compose gateway loopback-bound behind published port** ([#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)).
- **S1 — Docker runtime commands nested inside a second Docker sandbox** ([#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231)).
- **S1 — No operator cancellation path for running SOP jobs** ([#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425)).

No new release contains fixes for these yet; all remain open or in-flight.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals from RFCs and feature-labeled items:

- **Security & enterprise:** custom CA trust for remote MCP servers ([#9339](https://github.com/zeroclaw-labs/zeroclaw/issues/9339)), warn when Codex CLI `extra_args` weaken sandbox policy ([#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842)).
- **Governance/CI automation:** streamline RFC discussion/voting ([#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)), define risk precedence for test-only changes ([#9530](https://github.com/zeroclaw-labs/zeroclaw/issues/9530)), recalculate PR risk/size labels on every update ([#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345)).
- **Developer experience:** rustdoc warning gate in CI ([#9545](https://github.com/zeroclaw-labs/zeroclaw/issues/9545)), clarify Code session history vs persistent memory ([#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)).
- **Channel/platform:** process Signal "Note to Self" messages ([#9158](https://github.com/zeroclaw-labs/zeroclaw/issues/9158)), PowerShell native shell support ([#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)), context compaction by model window ratio ([#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)).

Likely next-version candidates, if merged: the HTTP egress hardening PRs, per-agent env vars, Anthropic OAuth profiles, and the npm/Rust dependency security bumps.

## 7. User Feedback Summary

Users and contributors report real pain points:

- **Workflow blockers:** compressed `web_fetch` responses, Docker Compose port unreachability, nested Docker sandboxing, and missing SOP cancellation all directly block production use.
- **Security anxiety:** the audit-driven issues from `belumume` and others are detailed, source-cited, and receive prompt `p1`/`in-progress` labeling — but many remain unfixed.
- **Process fatigue:** maintainers explicitly say the RFC process is slower than the decisions it supports ([#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)); label/board automation is requested repeatedly ([#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)).
- **UX complaints:** WebChat auto-scroll makes history unreadable during streaming ([#9562](https://github.com/zeroclaw-labs/zeroclaw/issues/9562)), ZeroCode's CPU metric is misleading ([#9844](https://github.com/zeroclaw-labs/zeroclaw/issues/9844)), and cron help examples cannot be run as printed ([#9796](https://github.com/zeroclaw-labs/zeroclaw/issues/9796)).

No explicit satisfaction surveys are present; sentiment is derived from issue tone and the volume of high-severity reports.

## 8. Backlog Watch

Important items that need maintainer attention or are at risk of stalling:

- [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — open since 2026-05-20, 22 comments, `needs-maintainer-review`, ratification deferred. Long-running governance bottleneck.
- [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) — open since 2026-06-02, `needs-maintainer-review`, high-risk RFC on model capability config.
- [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) — open since 2026-04-17, `risk:high`, still in-progress; Codex sandbox weakness warning.
- [#9383](https://github.com/zeroclaw-labs/zeroclaw/issues/9383) — npm audit failure with 6 high/critical findings, open since 2026-07-26; PR [#9870](https://github.com/zeroclaw-labs/zeroclaw/pull/9870) aims to clear it.
- Large PRs with `needs-author-action` and `size:XL` that could stall without maintainer follow-up: [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420), [#9194](https://github.com/zeroclaw-labs/zeroclaw/pull/9194), [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182), [#9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743), [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535).

These items are not necessarily abandoned, but their age, size, and risk labels make them the most likely candidates for review bottlenecks.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*