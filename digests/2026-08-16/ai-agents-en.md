# OpenClaw Ecosystem Digest 2026-08-16

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-15 23:00 UTC

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

# OpenClaw Project Digest — 2026-08-16

## 1. Today's Overview

OpenClaw is highly active: 500 issues and 500 PRs were updated in the last 24h. The majority are still open — 480 issues and 447 PRs — while only 20 issues and 53 PRs were closed/merged in the window, indicating a heavy review/triage backlog. A new beta, **v2026.8.1-beta.2**, was published with secret-egress hardening and GPT-5.6 Ultra/runtime-switching highlights. Top community attention is focused on P1 reliability issues: Codex PreToolUse hook CPU stalls, DeepSeek cron stalls, duplicate transcript/context assembly, and state-migration data-loss bugs. A large share of high-priority issues is blocked on maintainer/product decisions, making maintainer bandwidth the main bottleneck for closing the backlog.

---

## 2. Releases

### [v2026.8.1-beta.2 — OpenClaw 2026.8.1-beta.2](https://github.com/openclaw/openclaw/releases)

- **Secret egress host binding:** shared-store secrets are now bound to exact HTTPS destination hosts across CLI, Gateway RPC, and Control UI. Unbound sentinel substitution fails closed before plaintext egress. Thanks @shakkernerd.
- **GPT-5.6 Ultra and runtime switching:** listed as a major highlight, but the provided release excerpt is truncated and does not include full details.

**Potential migration note:** the secret-egress hardening is fail-closed. Deployments relying on unbound secret sentinels may need to explicitly bind secrets to destination hosts after upgrading.

---

## 3. Project Progress

### Closed/merged PRs visible in the sample

- [PR #124297 — test(tooling): deduplicate release timeout evaluators](https://github.com/openclaw/openclaw/pull/124297)
- [PR #124277 — fix(ui): sidebar sort selection is forgotten after a reload](https://github.com/openclaw/openclaw/pull/124277)

The dataset reports **53 merged/closed PRs** in the last 24h, but only these two appear in the top-30-by-comment sample.

### Also closed

- [Issue #113181 — Cron delivery.mode="none" + isolated agent → silent no-op on 2026.7.1](https://github.com/openclaw/openclaw/issues/113181) — P1 cron-delivery bug was closed in this window.

### In-flight feature/improvement PRs

These are open and not yet merged, but show active progress:

- [PR #123874 — improve(ui): unify chat side rails in a tabbed panel](https://github.com/openclaw/openclaw/pull/123874)
- [PR #124301 — improve(control-ui): restructure the composer as a multiline surface](https://github.com/openclaw/openclaw/pull/124301)
- [PR #123912 — feat(ui): open links in Control UI browser](https://github.com/openclaw/openclaw/pull/123912)
- [PR #123793 — feat(plugin-sdk): publish identifier authentication contract](https://github.com/openclaw/openclaw/pull/123793)
- [PR #117273 — feat(docs): add markdownlint coverage for workspace templates](https://github.com/openclaw/openclaw/pull/117273)

---

## 4. Community Hot Topics

### Most-commented issues

- [#91009 — Codex PreToolUse native hook relay spawns CPU-bound openclaw-hooks processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009) — 20 comments, P1, message-loss/crash-loop
- [#121953 — Cron agent turns stall on DeepSeek — the `[cron:<jobId> <name>]` user-message prefix is deprioritized](https://github.com/openclaw/openclaw/issues/121953) — 19 comments, P1
- [#79902 — Add companion-friendly SQLite transcript/session seams](https://github.com/openclaw/openclaw/issues/79902) — 13 comments
- [#69208 — Umbrella: duplicate transcript, replay, and context assembly across channels](https://github.com/openclaw/openclaw/issues/69208) — 13 comments, P1
- [#51429 — Hardcoded `/Users/wangtao` workspace path merged into code](https://github.com/openclaw/openclaw/issues/51429) — 13 comments
- [#38327 — "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327) — 13 comments, P1 regression, 3 👍
- [#6599 — Feature: Add /models test-fallback command](https://github.com/openclaw/openclaw/issues/6599) — 12 comments
- [#41744 — Feishu: read image tool result loses media before final outbound payload](https://github.com/openclaw/openclaw/issues/41744) — 12 comments, P1

### Most-reacted issues

- [#38327](https://github.com/openclaw/openclaw/issues/38327) — 3 👍
- [#10687 — Dynamic model discovery for OpenRouter + beyond](https://github.com/openclaw/openclaw/issues/10687) — 3 👍
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — 2 👍
- [#103231 — claude-cli backend native-compaction false assumption](https://github.com/openclaw/openclaw/issues/103231) — 2 👍
- [#73537 — Add production-readiness stability label to releases](https://github.com/openclaw/openclaw/issues/73537) — 2 👍
- [#45771 — Built-in pace-aware rate limiting for autonomous agents](https://github.com/openclaw/openclaw/issues/45771) — 2 👍
- [#81484 — Discord guild reply regression](https://github.com/openclaw/openclaw/issues/81484) — 2 👍

The underlying need is clear: users want **reliable gateway/Codex integration, transparent model/provider behavior, consistent transcripts, and better operational tooling**.

---

## 5. Bugs & Stability

Ranked by severity.

### P0

- [#70903 — Persistent file-based provider cooldown blocks user for hours after billing recovery](https://github.com/openclaw/openclaw/issues/70903) — P0, stale, release-blocker, no visible fix PR.

### P1

- [#91009 — Codex PreToolUse hook spawns CPU-bound processes and stalls gateway RPC](https://github.com/openclaw/openclaw/issues/91009) — message loss + crash-loop, needs live repro.
- [#121953 — DeepSeek cron turns stall due `[cron:` prefix deprioritization](https://github.com/openclaw/openclaw/issues/121953) — needs product decision.
- [#86214 — Codex app-server client closes mid-turn during image/tool requests with large logs_2.sqlite](https://github.com/openclaw/openclaw/issues/86214)
- [#103231 — claude-cli `ownsNativeCompaction` assumption false; sessions grow past 200% context and recovery fails silently](https://github.com/openclaw/openclaw/issues/103231)
- [#94939 — 6.x state migration leaves channel conversation-store SQLite empty, breaks MS Teams proactive sends](https://github.com/openclaw/openclaw/issues/94939) — has linked PR.
- [#119087 — Gateway cold start regressed ~2.5x from 2026.7.1-beta.1 to 2026.7.2-beta.7](https://github.com/openclaw/openclaw/issues/119087) — has linked PR.
- [#118793 — Claude CLI "session limit" dies with surface_error instead of triggering the model fallback chain](https://github.com/openclaw/openclaw/issues/118793) — has linked PR.
- [#84662 — Codex app-server stores per-turn runtime context in native user history, causing runaway input growth](https://github.com/openclaw/openclaw/issues/84662) — has linked PR.
- [#78493 — sudo openclaw update creates mixed ownership; doctor overwrites config after EACCES](https://github.com/openclaw/openclaw/issues/78493)
- [#92633 — memory_search corpus=all times out while individual corpora succeed](https://github.com/openclaw/openclaw/issues/92633)
- [#43374 — All LLM API calls time out simultaneously under multi-agent concurrency](https://github.com/openclaw/openclaw/issues/43374)
- [#123799 — Need safe upgrade/backport guidance for production affected by Codex compact 404 on 2026.5.12](https://github.com/openclaw/openclaw/issues/123799)
- [#55694 — Agent陷入工具调用失败死循环，导致重复发送消息刷屏](https://github.com/openclaw/openclaw/issues/55694)
- [#81484 — Discord guild reply regression: malformed send payloads and repeated outbound loops](https://github.com/openclaw/openclaw/issues/81484)
- [#56653 — Slack reaction_added/reaction_removed events never delivered via Socket Mode](https://github.com/openclaw/openclaw/issues/56653)
- [#41744 — Feishu read image tool result loses media before final outbound payload](https://github.com/openclaw/openclaw/issues/41744) — has linked PR.
- [#79293 — openclaw-weixin proactive sends return success while user sees "请稍后再试"](https://github.com/openclaw/openclaw/issues/79293)
- [#83337 — Plugin/core version drift after upgrade causes silent channel failure](https://github.com/openclaw/openclaw/issues/83337)

### P2 notable

- [#120735 — Telegram inbound stickers arrive as raw file refs and are not staged to disk](https://github.com/openclaw/openclaw/issues/120735) — has linked PR.
- [#50165 — Subagents can appear completed before the underlying delegated work is finished](https://github.com/openclaw/openclaw/issues/50165)
- [#116512 — Telegram progress duplicates first commentary when snapshot IDs change](https://github.com/openclaw/openclaw/issues/116512)
- [#77930 — Discord channel not loaded in 2026.5.4, works in beta.1](https://github.com/openclaw/openclaw/issues/77930) — has linked PR.
- [#46031 — auth.order ignored for GitHub Copilot provider](https://github.com/openclaw/openclaw/issues/46031) — has linked PR.
- [#90378 — Cron store silently migrated to SQLite; new jobs default to delivery.mode=announce causing channel errors](https://github.com/openclaw/openclaw/issues/90378) — has linked PR.
- [#119401 — NO_REPLY suppression is unconditional and ignores silentReply policy](https://github.com/openclaw/openclaw/issues/119401)

### Fix PRs currently in the queue

- [PR #120056 — fix(cron): treat NO_REPLY as absent when classifying tool failure](https://github.com/openclaw/openclaw/pull/120056)
- [PR #117328 — fix(agents): preserve history when context assembly fails](https://github.com/openclaw/openclaw/pull/117328)
- [PR #120589 — fix(agents): backfill tool args when provider skips input_json_delta](https://github.com/openclaw/openclaw/pull/120589)
- [PR #123194 — fix(mcp): cap HTTP/SSE response bodies before SDK parse](https://github.com/openclaw/openclaw/pull/123194)
- [PR #124293 — fix: Windows cron jobs never run because the durable fence cannot read a process identity](https://github.com/openclaw/openclaw/pull/124293)
- [PR #124282 — fix(state): doctor --fix loops on "migration required" for older state databases](https://github.com/openclaw/openclaw/pull/124282)
- [PR #124302 — gateway: make core readiness independent of sidecars](https://github.com/openclaw/openclaw/pull/124302)

These are not yet merged, but they directly target several high-severity stability themes.

---

## 6. Feature Requests & Roadmap Signals

Strong user demand is visible for:

- [#10687 — Fully dynamic model discovery (OpenRouter + beyond)](https://github.com/openclaw/openclaw/issues/10687) — 3 👍
- [#13219 — Per-model usage logging for cost tracking](https://github.com/openclaw/openclaw/issues/13219)
- [#6599 — `/models` test-fallback command](https://github.com/openclaw/openclaw/issues/6599)
- [#6625 — Graceful sub-agent timeout with pre-timeout warning](https://github.com/openclaw/openclaw/issues/6625)
- [#45771 — Pace-aware rate limiting for autonomous agents](https://github.com/openclaw/openclaw/issues/45771)
- [#39343 — Image batching / media group buffering at gateway layer](https://github.com/openclaw/openclaw/issues/39343)
- [#79902 — SQLite transcript/session seams on top of database-first runtime](https://github.com/openclaw/openclaw/issues/79902)
- [#45758 — Support YAML as config file format](https://github.com/openclaw/openclaw/issues/45758)
- [#66252 — Per-agent TTS/STT configuration overrides](https://github.com/openclaw/openclaw/issues/66252)
- [#63930 — Support Anthropic advisor tool](https://github.com/openclaw/openclaw/issues/63930)
- [#91455 — Kubernetes documentation update](https://github.com/openclaw/openclaw/issues/91455)
- [#73537 — Production-readiness stability label on releases](https://github.com/openclaw/openclaw/issues/73537)

**Next-version prediction:** based on the open PR queue, the next beta/patch will likely consolidate reliability fixes around cron behavior, Windows cron fencing, gateway readiness, MCP body-size safety, Control UI session confirmations, and Feishu/Telegram delivery paths. Feature-wise, model discovery and usage/cost visibility continue to be the strongest roadmap signals.

---

## 7. User Feedback Summary

### Positive signals

- [#73537](https://github.com/openclaw/openclaw/issues/73537) — A user running OpenClaw as a family/business assistant with Telegram, automations, cron jobs, and Home Assistant says it "has genuinely become part of our daily workflow" and thanks the maintainer.

### Pain points

- [#51429](https://github.com/openclaw/openclaw/issues/51429) — Users are frustrated that a hardcoded `/Users/wangtao` path was merged and published.
- [#55694](https://github.com/openclaw/openclaw/issues/55694) — Tool-call failure loops can cause repeated user-visible spam messages.
- [#90378](https://github.com/openclaw/openclaw/issues/90378) — Silent SQLite migration for cron store caused unexpected channel errors.
- [#94939](https://github.com/openclaw/openclaw/issues/94939) — State migration left empty SQLite files and broke proactive sends for MS Teams.
- [#123799](https://github.com/openclaw/openclaw/issues/123799) — Production users are asking for explicit upgrade/backport guidance after a Codex compact 404 regression.
- [#123073](https://github.com/openclaw/openclaw/issues/123073) — Dev-channel updates fail with `EUNSUPPORTEDPROTOCOL` on `workspace:*` because the updater uses npm while the repo requires pnpm.

### Operational needs

Users are consistently requesting better observability and safety:

- Per-model cost tracking — [#13219](https://github.com/openclaw/openclaw/issues/13219)
- Stability labels for releases — [#73537](https://github.com/openclaw/openclaw/issues/73537)
- YAML config support — [#45758](https://github.com/openclaw/openclaw/issues/45758)
- Fallback-chain testing — [#6599](https://github.com/openclaw/openclaw/issues/6599)
- Graceful subagent timeout — [#6625](https://github.com/openclaw/openclaw/issues/6625)
- Rate-limit awareness — [#45771](https://github.com/openclaw/openclaw/issues/45771)

---

## 8. Backlog Watch

These issues have been open for a long time and still carry `needs-maintainer-review` or `needs-product-decision` labels:

- [#70903 — P0 persistent provider cooldown blocks users after billing recovery](https://github.com/openclaw/openclaw/issues/70903) — open since 2026-04-24, stale, release-blocker.
- [#38327 — P1 "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327) — open since 2026-03-06, 3 👍, needs live repro.
- [#69208 — P1 umbrella duplicate transcript/replay/context assembly across channels](https://github.com/openclaw/openclaw/issues/69208) — open since 2026-04-20, maintainer-owned.
- [#51429 — Hardcoded `/Users/wangtao` path in published code](https://github.com/openclaw/openclaw/issues/51429) — open since 2026-03-21, needs maintainer/product decision.
- [#10687 — Dynamic model discovery for OpenRouter + beyond](https://github.com/openclaw/openclaw/issues/10687) — open since 2026-02-06, 3 👍, needs maintainer review.
- [#6599 — `/models` test-fallback command](https://github.com/openclaw/openclaw/issues/6599) — open since 2026-02-01, needs maintainer/product decision.
- [#103231 — P1 claude-cli native-compaction false assumption](https://github.com/openclaw/openclaw/issues/103231) — open since 2026-07-10, needs live repro and product decision.
- [#123799 — Production upgrade/backport guidance for Codex compact 404](https://github.com/openclaw/openclaw/issues/123799) — open since 2026-08-14, P1, needs maintainer review.

These are high-signal items where the community has provided reproduction steps or production impact evidence, but progress is currently waiting on maintainer/product input rather than new user reports.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date:** 2026-08-16 | **Source:** Community digest summaries for 12 projects

---

## 1. Ecosystem Overview

The personal AI assistant / agent ecosystem is in a **reliability-consolidation phase**: while feature velocity remains high — particularly around multi-provider routing, channel adapters, and WebUI polish — the dominant theme across nearly every project is hardening the agent loop (cron stalls, transcript integrity, context assembly, and subprocess hygiene). Community attention is concentrated on **silent failures** (actions that report success but do nothing) and **maintainer bottlenecks** (large open-PR queues with low merge throughput). OpenClaw remains the clear reference implementation and attention anchor, but specialized challengers like IronClaw (performance engineering), ZeroClaw (RFC-driven architecture), and Hermes Agent (security/transparency) are carving out distinct niches. No major new releases shipped in this window — only OpenClaw published a beta — suggesting the ecosystem is mid-cycle, consolidating architectural debt before the next feature push.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Closed/Merged (24h) | Release Status | Health Score¹ |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 73 (20 issues, 53 PRs) | ✅ **v2026.8.1-beta.2** | 6/10 |
| **IronClaw** | 28 | 13 | 27 (21 issues, 6 PRs) | None | 8/10 |
| **ZeroClaw** | 50 | 50 | 10 (4 issues, 6 PRs) | None | 6/10 |
| **Hermes Agent** | 50 | 50 | 10 (8 issues, 2 PRs) | None | 5/10 |
| **NanoBot** | 2 | 16 | 7 PRs | None | 8/10 |
| **NanoClaw** | 0 | 22 | 3 PRs | None | 7/10 |
| **Moltis** | 0 | 6 | 3 PRs | None | 7/10 |
| **LobsterAI** | 18 | 6 | 18 (16 issues², 2 PRs) | None | 5/10 |
| **CoPaw** | 10 | 11 | 1 issue | None | 4/10 |
| **NullClaw** | 1 | 1 | 0 | None | 5/10 |
| **PicoClaw** | 0 | 2 | 0 | None | 3/10 |
| **ZeptoClaw** | 0 | 0 | 0 | None | 2/10 |

¹ Composite score: merge/close efficiency, backlog size, release cadence, and responsiveness.  
² Mostly stale-bot cleanup, not substantive fixes.

**Key observations:**
- **OpenClaw** has 10× the activity of its nearest peers but carries a massive backlog (480 open issues, 447 open PRs). Maintainer bandwidth is the binding constraint.
- **IronClaw** shows the healthiest close-to-open ratio (21 issues closed vs. 7 open) and is actively retiring architectural debt.
- **CoPaw** is the most strained: 0 PRs merged from 11 open, with 9 open issues and a compounding review backlog.
- **PicoClaw** and **ZeptoClaw** are effectively stalled; PicoClaw has two stale, unmerged fixes that leave WhatsApp broken and prefix caching unoptimized.

---

## 3. OpenClaw's Position

**Advantages:**
- **Reference-project gravity:** The only project shipping a release in this window (v2026.8.1-beta.2 with secret-egress hardening and GPT-5.6 Ultra support), reinforcing its "install this first" status.
- **Unmatched community scale:** 500 issues + 500 PRs touched in 24h — an order of magnitude above Hermes/ZeroClaw (50 each) and 20+× NanoClaw (22). It captures the majority of ecosystem mindshare and contributor attention.
- **Broadest channel surface:** Telegram, Discord, Slack, Feishu, WhatsApp, WeChat, Matrix, MS Teams, plus cron, gateway RPC, and Control UI — no peer project approaches this breadth.
- **Active security hardening:** Secret-egress host binding (fail-closed), plugin SDK auth contracts, and a P1/P0 triage system that surfaces release blockers.

**Technical approach differences:**
- OpenClaw uses a **gateway-centric architecture** with native hooks (e.g., Codex PreToolUse relay), a Control UI, and a database-first runtime now migrating state stores to SQLite. Its pain points (hook CPU stalls, state-migration data loss, transcript deduplication) are the cost of being first to scale.
- Competitors are learning from these failures: NullClaw's loop-hygiene PR directly addresses prefix-caching and redundant-execution problems that OpenClaw users are also reporting.

**Community size comparison:** OpenClaw's 24h volume (500/500) dwarfs all peers. Relative activity tiers:
- OpenClaw: **dominant** (500+500)
- Hermes / ZeroClaw: **large** (50+50 each)
- NanoClaw: **medium** (0+22)
- Everyone else: **small** (≤28 issues, ≤16 PRs)

**Watch-outs:** The 480-open-issue backlog and P0 release-blocker (#70903, persistent provider cooldown, stale since April) are structural risks. If IronClaw or ZeroClaw sustain their merge velocity, they could become credible alternatives for users who need faster issue resolution.

---

## 4. Shared Technical Focus Areas

Cross-project requirements emerging independently across multiple projects:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Agent-loop reliability** | OpenClaw, NanoBot, IronClaw, NullClaw, LobsterAI, CoPaw | Cron job stalls (DeepSeek, Windows fencing), poll-loop resource leaks, premature completion, loop-hygiene (identical-call protection, overflow guards) |
| **Memory & transcript integrity** | OpenClaw, NanoBot, Hermes, ZeroClaw | Consolidation truncation losing history (NanoBot #5377), duplicate transcript/context assembly (OpenClaw #69208), stale/competing session writes (Hermes, NanoBot PR #5271), transaction-level session ownership (ZeroClaw RFC #9487) |
| **Prefix-caching / context optimization** | PicoClaw, NullClaw, OpenClaw, NanoClaw | Moving dynamic context after history (PicoClaw #3321), split stable/variable prompt prefixes (NullClaw #987), runaway context growth in Codex/claude-cli backends (OpenClaw) |
| **Security boundary hardening** | OpenClaw, Hermes, NanoBot, ZeroClaw, CoPaw | Subprocess credential/env leakage (Hermes Kanban), secret egress binding (OpenClaw), plugin cache invalidation (NanoBot), OAuth2 refresh-token persistence (CoPaw, ZeroClaw), dangerous-command wrapper bypass (Hermes) |
| **Multi-provider / model routing** | OpenClaw, NanoBot, IronClaw, ZeroClaw, CoPaw | Dynamic model discovery, per-cron model selection, typed ToolChoice, OpenAI Responses API routing, Anthropic refusal fallbacks, provider metadata unification |
| **Channel reliability** | OpenClaw, PicoClaw, NanoClaw, CoPaw, Hermes | WhatsApp client-version rejection, Feishu media loss, Discord attachment readability, Telegram verification-code UI gaps, Matrix E2EE packaging |
| **WebUI/Desktop session-state correctness** | OpenClaw, NanoBot, Hermes, CoPaw, LobsterAI | Stale "Thinking" states, second-launch backend kills, missing virtual scrolling, reload-broken image history, copy/fork action visibility before turn end |
| **Observability & cost tracking** | OpenClaw, Hermes, IronClaw, Moltis | Per-model usage logging, request/response dumps, trajectory benchmark systems, stability labels on releases |

**Notable:** No single project owns any of these areas yet. The community is solving the same eight problems in eight parallel codebases — a strong signal for shared infrastructure or standardization opportunities (e.g., a common transcript/session format, a unified cache-aware prompt assembler, or a standard OAuth2 token-store contract).

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architectural Signature |
|---|---|---|---|
| **OpenClaw** | Broadest all-in-one assistant; gateway + channels + cron + plugins | General users, self-hosters, production deployments | Gateway-centric with hooks, Control UI, plugin SDK, SQLite state layer; largest ecosystem surface |
| **IronClaw** | Performance-engineered agent runtime with unbound-turn concurrency | High-volume/hosted operators; quality-obsessed teams | Rust-style² discipline: prepared-context turns, write-amplification elimination, internal Live Canary QA, trajectory benchmarks |
| **ZeroClaw** | RFC-driven architecture; security posture; OpenAI ecosystem compatibility | Developers wanting design transparency and protocol interop | Design-first: Chat Completions profile, SOP permission contracts, memory-ownership separation, typed errors for refusals |
| **Hermes Agent** | Security & transparency; Desktop-first UX | Security-conscious users, Desktop users, Discord power users | Subprocess credential isolation, request dumps, disclosure-first plugin/Kanban behavior, large-file decomposition campaign |
| **NanoBot** | WebUI/UX polish; provider breadth | UX-sensitive individuals, plugin users | Aggressive WebUI iteration (drag-drop, side conversations, mention collaboration), OrcaRouter/DashScope integrations |
| **NanoClaw** | Channel-adapter permissions & delivery semantics | Multi-channel operators, Linux/Waybar users | Adapter capability seams (typing status, thread titles), cross-session context fan-out, detached-conversation semantics |
| **Moltis** | IDE-integrated agent workflows | Developers inside code editors | Command-palette chat starts, ClawHub skill search, Coder remote sandboxes, Slack live task cards |
| **CoPaw** | Console WebUI + enterprise plugins | Chinese-market power users, enterprise plugin developers | Provider unification, per-cron overrides, Matrix per-sender isolation, DataPaw native app runtime |
| **LobsterAI** | Commercial wrapper (NetEase/Youdao) | Chinese users needing paid-model access | OpenClaw compatibility layer, membership-gated models, WeChat-first IM integration |
| **PicoClaw** | Minimal, dependency-faithful Go³ implementation | Lightweight/single-channel users | whatsmeow-based WhatsApp, prefix-cache-aware prompt ordering |
| **NullClaw** | Long local tool-heavy runs | Local-model users, network-restricted environments | Cache-friendly prompt splitting, tool-output compression, proxy support (requested) |
| **ZeptoClaw** | Dormant | — | — |

² IronClaw's language/stack is not explicitly stated in the digest; performance characteristics (write-amplification, kernel sandbox) suggest systems-level orientation.
³ PicoClaw's Go stack is inferred from the `go.mau.fi/whatsmeow` dependency bump.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (high activity, shipping features):**
- **OpenClaw** — Volume leader, but merge throughput lags intake; backlog is the risk.
- **IronClaw** — Best-in-class close discipline; retiring epic-scale debt (unbound-turns, write amplification) with high merge velocity.
- **NanoClaw** — Core-team-driven sprint on permissions and delivery semantics; no issue tracker yet (risk: low external input).
- **ZeroClaw** — High RFC energy and a completed Anthropic refusal/fallback stack; blocked on maintainer decisions for core architecture RFCs.

**Tier 2 — Steady, healthy development:**
- **NanoBot** — Consistent 7-PR-merged days, small backlog, active community contributors.
- **Moltis** — Maintainer-driven, no open issues, steadily merging integration features.
- **CoPaw** — Active inbound contribution but **0% merge rate** in this window; first-time-contributor PRs are accumulating — the throughput bottleneck is the defining issue.

**Tier 3 — Maintenance / stabilizing:**
- **Hermes Agent** — High activity but mostly open PRs (48); the large-file decomposition epic completing is a positive signal, yet Desktop/Windows bugs persist without fixes.
- **LobsterAI** — Stale-bot cleanup dominating; only 2 substantive PRs closed. Effectively in maintenance mode.
- **NullClaw** — Minimal but healthy; no backlog forming.

**Tier 4 — Stalled:**
- **PicoClaw** — Two critical fixes (WhatsApp, prefix caching) unmerged for 9 days; stale-bot risk is real.
- **ZeptoClaw** — Zero activity.

**Cross-cutting maturity signal:** The ecosystem is bifurcating into **architecturally ambitious** projects (IronClaw, ZeroClaw, Hermes) investing in long-term correctness, and **feature-velocity** projects (NanoClaw, NanoBot, Moltis) iterating directly on user-facing workflows. The former are accumulating review debt; the latter are shipping but risk accruing the same reliability issues OpenClaw is now paying down.

---

## 7. Trend Signals

1. **Reliability is the new feature.** The highest-comment issues across OpenClaw, NanoBot, and CoPaw are all silent failures: actions that return success but drop data (video frames, cron prompts, transcript segments, media attachments). Users are prioritizing "did it actually happen?" over "what can it do?"

2. **Context/memory integrity is becoming a first-class product surface.** Consolidation truncation (NanoBot), duplicate transcripts (OpenClaw), native-compaction false assumptions (OpenClaw), and durable session ownership (ZeroClaw, Hermes) all point to memory as the next competitive battlefield. Expect dedicated memory/SQLite seams and lossless compression to emerge as differentiators.

3. **Provider abstraction is commoditizing — but routing is not.** Multi-provider gateways (OrcaRouter, DashScope native, OpenRouter discovery) are table stakes. The differentiator is *intelligent* routing: refusal fallbacks (ZeroClaw), typed ToolChoice (IronClaw), per-cron model selection (CoPaw, ZeroClaw), and cost-aware pace limiting (OpenClaw).

4. **Security boundaries are moving inward.** From app-level auth to **subprocess credential inheritance** (Hermes Kanban env leakage), **plugin cache invalidation** (NanoBot), **secret-egress host binding** (OpenClaw), and **OAuth2 refresh-token persistence** (CoPaw, ZeroClaw). Agentic systems that spawn child processes and load third-party plugins are discovering a new attack surface — expect this to be a major theme in 2026-2027.

5. **OpenAI-compatible APIs are the interoperability standard.** ZeroClaw's Chat Completions RFC (#8603, 20 comments), OpenClaw's model-discovery demand, and Moltis's Responses-API routing all converge on one idea: **if your agent speaks OpenAI protocol, the entire ecosystem of clients (Open WebUI, LobeChat, Continue.dev, Aider) can use it.**

6. **Channel reliability, not breadth, is the pain point.** No one needs another channel adapter; they need WhatsApp to stop disconnecting, Feishu to stop dropping images, and Matrix E2EE to work out of the box. The maintenance burden of channel integrations is the single largest source of cross-project bug reports.

7. **Maintainer bandwidth is the ecosystem's critical constraint.** Eight of twelve projects have visible review bottlenecks (CoPaw 0% merge, OpenClaw 447 open PRs, ZeroClaw RFC queue, PicoClaw stale fixes). For developers choosing a project to build on, **merge latency is now a legitimate evaluation criterion** alongside feature fit.

8. **For AI agent developers:** The strongest market opportunities are in tooling that solves shared infrastructure problems once — cross-project transcript/session standards, cache-aware prompt assembly, unified OAuth2/credential stores for agent subprocesses, and trajectory-based QA systems (IronClaw #467 is the clearest articulation of the unmet need).

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-16

## 1. Today's Overview

NanoBot shows steady, active development as of 2026-08-16: 2 issues were updated in the last 24 hours, 16 PRs were updated, and 7 PRs moved to closed/merged status while 9 remain open. No new releases were published during the period. Activity is concentrated in WebUI interaction fixes, session/memory correctness, and new provider integration, indicating both healthy bug-fix velocity and ongoing feature expansion. The open PR count remains high, largely due to several large or conflict-flagged features awaiting maintainer review.

---

## 2. Releases

No new releases during this digest period. The Latest Releases list is empty.

---

## 3. Project Progress

Seven PRs were updated to closed/merged status in the last 24 hours:

- **feat(providers): add OrcaRouter as a named gateway provider** ([#5328](https://github.com/HKUDS/nanobot/pull/5328)) — Adds OrcaRouter, an OpenAI-compatible gateway supporting 150+ models from multiple vendors.
- **fix(webui): hide assistant actions until turn end** ([#5371](https://github.com/HKUDS/nanobot/pull/5371)) — Resolves the confusing state where copy/fork actions appear before an Agent turn completes.
- **fix(plugins): revalidate cached skill roots after package changes** ([#5369](https://github.com/HKUDS/nanobot/pull/5369)) — Closes a security-relevant gap where stale plugin skills could remain readable after package replacement.
- **fix(agent): bound per-session file state lifecycle** ([#5370](https://github.com/HKUDS/nanobot/pull/5370)) — Prevents unbounded `FileStateStore` growth and fixes state surviving session lifecycle boundaries.
- **fix(cron): keep scheduler alive when job-store persistence fails** ([#5376](https://github.com/HKUDS/nanobot/pull/5376)) — Fixes a silent failure where one persistence error permanently kills the cron scheduler.
- **fix(webui): clarify model preset display names** ([#5399](https://github.com/HKUDS/nanobot/pull/5399)) — Distinguishes the preset display label from the stable `/model` command name and localizes the clarification.
- **fix(webui): preserve range selection and turn timing** ([#5397](https://github.com/HKUDS/nanobot/pull/5397)) — Adds macOS-style Shift range selection in sidebar bulk-delete mode and fixes active-run timing edge cases.

Together, these merges advance WebUI UX polish, plugin security, cron reliability, memory management, and provider coverage.

---

## 4. Community Hot Topics

The most discussed issue in the current digest window is:

- **#5377 — Bug: consolidation truncates archive input but advances past the full message batch** ([Issue #5377](https://github.com/HKUDS/nanobot/issues/5377)) — 2 comments, 0 reactions.

This issue reflects a core user concern around memory and history preservation: when consolidation truncates content to fit the model’s input budget, callers still advance the last-consolidated position, risking silent loss of conversation history. A related fix PR, **#5379** ([PR #5379](https://github.com/HKUDS/nanobot/pull/5379)), is already open.

Comment data on PRs is limited in this digest, but several open feature PRs are likely to generate broader community interest once merged:

- **#5358 — Session collaboration via mentions** ([PR #5358](https://github.com/HKUDS/nanobot/pull/5358))
- **#5364 — Temporary side conversations** ([PR #5364](https://github.com/HKUDS/nanobot/pull/5364))
- **#5389 — Drag-and-drop session organization** ([PR #5389](https://github.com/HKUDS/nanobot/pull/5389))

These PRs show demand for richer WebUI organization and multi-session workflows.

---

## 5. Bugs & Stability

Ranked by severity among issues and fix-PRs updated in the last 24 hours:

1. **High / P0 — Stale background saves can overwrite session data**  
   [#5271](https://github.com/HKUDS/nanobot/pull/5271)  
   Fix PR remains open and is labeled `conflict`. It addresses a serious session-lifecycle bug where stale background work can overwrite the session after `/new` or another lifecycle replacement.

2. **Medium-High — Consolidation truncates history while advancing read position**  
   [#5377](https://github.com/HKUDS/nanobot/issues/5377)  
   Open issue with 2 comments; a fix exists in open PR [#5379](https://github.com/HKUDS/nanobot/pull/5379), which replaces lossy truncation with lossless bounded chunks.

3. **Medium — Subagent conversation transcripts are not persisted**  
   [#5291](https://github.com/HKUDS/nanobot/pull/5291)  
   Open fix PR (priority P2) to persist full subagent tool calls, results, and reasoning steps for later review.

4. **Low/Medium — WebUI shows copy/fork actions before an Agent turn ends**  
   [#5368](https://github.com/HKUDS/nanobot/issues/5368)  
   Closed issue; fixed by merged PR [#5371](https://github.com/HKUDS/nanobot/pull/5371).

5. **Low/Medium — Plugin skill roots could remain readable after package changes**  
   [#5369](https://github.com/HKUDS/nanobot/pull/5369)  
   Security-relevant, now closed/merged.

6. **Low/Medium — Unbounded per-session file state lifecycle**  
   [#5370](https://github.com/HKUDS/nanobot/pull/5370)  
   Memory/perf issue, now closed/merged.

7. **Low — Cron scheduler dies permanently on single persistence error**  
   [#5376](https://github.com/HKUDS/nanobot/pull/5376)  
   Reliability fix, now closed/merged.

Additional open PRs with stability relevance include **#5401** ([PR #5401](https://github.com/HKUDS/nanobot/pull/5401)), which makes WebUI mutations reconnect-safe, and **#5291** above.

---

## 6. Feature Requests & Roadmap Signals

The open PR set points to a WebUI-focused roadmap with stronger multi-session and collaboration features:

- **Session collaboration via mentions**  
  [#5358](https://github.com/HKUDS/nanobot/pull/5358) — Stable server-owned session `@name`s and mention-based collaboration.

- **Temporary side conversations**  
  [#5364](https://github.com/HKUDS/nanobot/pull/5364) — `/side` opens transient conversations beside the current topic, with parallel sending and tab switching.

- **Drag-and-drop session organization**  
  [#5389](https://github.com/HKUDS/nanobot/pull/5389) — Reordering and grouping via drag-and-drop in the sidebar.

- **Model preset name unification**  
  [#5400](https://github.com/HKUDS/nanobot/pull/5400) — Makes preset keys canonical across config, WebUI, commands, and sessions, with inline rename feedback.

- **New provider support**  
  - **DashScope native protocol** ([#5398](https://github.com/HKUDS/nanobot/pull/5398)) — Adds deeper native-protocol access beyond OpenAI-compatible mode.
  - **OrcaRouter gateway** ([#5328](https://github.com/HKUDS/nanobot/pull/5328)) — Already merged/closed, expanding multi-provider routing coverage.

Likely near-term release content includes reconnect-safe WebUI mutations, model preset naming improvements, and one or more of the organization/collaboration features if conflicts are resolved.

---

## 7. User Feedback Summary

User pain points visible in this digest include:

- **Memory/history loss during consolidation** — Users need reliable long-session memory without silent truncation ([#5377](https://github.com/HKUDS/nanobot/issues/5377)).
- **Confusing WebUI completion states** — Copy/fork actions appearing during runtime created conflicting signals; users want clear turn-end semantics ([#5368](https://github.com/HKUDS/nanobot/issues/5368)).
- **Session data loss from stale background saves** — A P0 concern for users relying on `/new` and lifecycle replacement ([#5271](https://github.com/HKUDS/nanobot/pull/5271)).
- **Unbounded memory growth** — Per-session file state retention was problematic for high-cardinality API/temporary sessions ([#5370](https://github.com/HKUDS/nanobot/pull/5370)).
- **Scheduler reliability** — A single persistence failure silently killing cron scheduling is a serious operational concern ([#5376](https://github.com/HKUDS/nanobot/pull/5376)).
- **Subagent transparency** — Users want full subagent transcripts, not just result announcements ([#5291](https://github.com/HKUDS/nanobot/pull/5291)).

Satisfaction signals are indirect but generally positive: contributors are actively submitting fixes and tests for these issues, and merged PRs address the reported problems quickly. The volume of feature PRs also suggests an engaged contributor community.

---

## 8. Backlog Watch

Several open PRs may need maintainer attention due to age, priority, or conflict status:

- **#5271 — P0, conflict: prevent stale background task saves from overwriting session data** ([PR #5271](https://github.com/HKUDS/nanobot/pull/5271))  
  Created 2026-08-06, still open; high-priority correctness fix with merge conflicts.

- **#5291 — fix(agent): persist subagent conversation transcripts** ([PR #5291](https://github.com/HKUDS/nanobot/pull/5291))  
  Created 2026-08-07, still open; important for observability.

- **#5358 — feat(webui): add session collaboration via mentions** ([PR #5358](https://github.com/HKUDS/nanobot/pull/5358))  
  Created 2026-08-12, still open; large feature likely needing review.

- **#5364 — conflict: feat(webui): add temporary side conversations** ([PR #5364](https://github.com/HKUDS/nanobot/pull/5364))  
  Created 2026-08-13, labeled `conflict`.

- **#5389 — conflict: feat(webui): add drag-and-drop session organization** ([PR #5389](https://github.com/HKUDS/nanobot/pull/5389))  
  Created 2026-08-14, labeled `conflict`.

- **#5379 — fix(memory): preserve full consolidation input** ([PR #5379](https://github.com/HKUDS/nanobot/pull/5379))  
  Directly resolves the open data-loss issue #5377; should be reviewed alongside that issue.

These items represent the most important candidates for maintainer review to reduce open PR backlog and resolve known correctness/merge issues.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-16

## 1. Today's Overview

Hermes Agent remains in a high-activity maintenance and hardening phase: 50 issues and 50 PRs were updated in the last 24 hours, with 42 issues open/active and 8 closed, while 48 PRs remain open and 2 are closed/merged. No new release was published in this window. The standout progress signal is the completion of the large-file decomposition epic [#78647](https://github.com/NousResearch/hermes-agent/issues/78647), alongside a cluster of security- and transparency-focused PRs targeting Kanban worker environment leakage, plugin orchestrator disclosure, and slow-model timeout handling. Windows and Desktop stability continue to dominate user-reported pain points.

## 2. Releases

No new releases were published on 2026-08-16. The latest release section is empty, so there are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress

### Closed/merged PRs in window

- [#66512](https://github.com/NousResearch/hermes-agent/pull/66512) — `feat: capture model responses next to request dumps (HERMES_DUMP_REQUESTS)`. Closes #66530; useful for debugging and replay.
- [#13746](https://github.com/NousResearch/hermes-agent/pull/13746) — `fix: stabilize local Hermes UX and provider selection`. Includes Telegram DM prompt overhead reduction, NVIDIA curated catalog fallback improvements, and TUI status-bar wrapping fixes.

### Notable recently closed issues

- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — Large-file decomposition epic marked **20/20 complete** after heavy refactoring activity.
- [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) — Windows update self-lock on `cryptography._rust.pyd` closed after 7 comments.
- [#69107](https://github.com/NousResearch/hermes-agent/issues/69107) — TUI stale in-memory history when another client writes to the same session, closed.
- [#70031](https://github.com/NousResearch/hermes-agent/issues/70031) — CLI status line repetition with `streaming=false` and `interface=cli`, closed.
- [#62158](https://github.com/NousResearch/hermes-agent/issues/62158) — Desktop elapsed-time counter reset, closed.
- [#4178](https://github.com/NousResearch/hermes-agent/issues/4178) — `python-olm` build failure during update, closed as non-impacting.

### Still-open but important progress

- [#81843](https://github.com/NousResearch/hermes-agent/pull/81843) — `fix(kanban): strip worker Kanban env from terminal-spawned subprocesses`. Addresses a security boundary issue where nested CLI processes inherit dispatcher-owned `HERMES_KANBAN_*` identity.
- [#87310](https://github.com/NousResearch/hermes-agent/pull/87310) — `fix(agent): let slow local reasoning models finish long responses`. Directly targets the slow-model timeout class.
- [#87311](https://github.com/NousResearch/hermes-agent/pull/87311) — `feat(plugins): disclose orchestrator worker behavior before activation`.
- [#87312](https://github.com/NousResearch/hermes-agent/pull/87312) — `feat(desktop): Capabilities-wide profile scoping + one-click hub installs on the Skills tab`.
- [#87313](https://github.com/NousResearch/hermes-agent/pull/87313) — `fix(kanban): disclose automatic worker fan-out before gateway startup`.

The large-file decomposition campaign continues via many open gateway refactor PRs, e.g. [#77719](https://github.com/NousResearch/hermes-agent/pull/77719), [#77723](https://github.com/NousResearch/hermes-agent/pull/77723), [#77733](https://github.com/NousResearch/hermes-agent/pull/77733), [#77737](https://github.com/NousResearch/hermes-agent/pull/77737), [#77738](https://github.com/NousResearch/hermes-agent/pull/77738), [#77741](https://github.com/NousResearch/hermes-agent/pull/77741), [#77748](https://github.com/NousResearch/hermes-agent/pull/77748), [#77751](https://github.com/NousResearch/hermes-agent/pull/77751), [#77759](https://github.com/NousResearch/hermes-agent/pull/77759), and the Telegram adapter decomposition [#79010](https://github.com/NousResearch/hermes-agent/pull/79010).

## 4. Community Hot Topics

The most active issues by comment count reveal a mix of architecture completion, automation health, Desktop stability, and platform-parity demands.

- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — *[CLOSED] Large-file decomposition: 20/20 done* — 78 comments. Underlying need: strong maintainer and contributor interest in eliminating god-files and keeping the repo modular.
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — *[skills-index-watchdog] Skills index is stale or degraded* — 36 comments. Underlying need: reliable docs/skills indexing; automation is flagging freshness regressions.
- [#4178](https://github.com/NousResearch/hermes-agent/issues/4178) — *[Bug]: python-olm build fail* — 11 comments, 2 👍. Shows users care about non-blocking install warnings and update robustness.
- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) — *Hermes Desktop silently fails from .desktop launcher when Electron chrome-sandbox lacks setuid (4755)* — 9 comments, P1. Underlying need: Linux Desktop should fail loudly or self-repair, not launch silently to nothing.
- [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) — *Windows: hermes update self-locks cryptography._rust.pyd* — 7 comments, P1. Underlying need: self-update must not hold its own payload files on Windows.
- [#69107](https://github.com/NousResearch/hermes-agent/issues/69107) — *prompt.submit truncate_before_user_ordinal rejects valid ordinals* — 7 comments. Underlying need: consistent multi-client session state.
- [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) — *Discord Feature Parity & Alignment Campaign (API v10)* — 6 comments, meta-issue. Community wants full Discord API alignment.
- [#82591](https://github.com/NousResearch/hermes-agent/issues/82591) — *Kanban zero-authority workers, durable publication, safe reclaim, and large-file eradication* — 5 comments. Signals roadmap work around autonomous Kanban workers.
- [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) — *Desktop stays stuck on stale "Thinking" state* — 5 comments, 1 👍. Persistent Desktop UX bug.

Reaction counts are generally low, with only [#4178](https://github.com/NousResearch/hermes-agent/issues/4178) and [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) receiving 👍 reactions, suggesting the community is active in issue threads but not heavily reacting with emoji.

## 5. Bugs & Stability

Bugs reported or updated within the window, ranked roughly by severity and safety impact.

### Critical / high severity

- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) — **P1, open**: Hermes Desktop silently fails from `.desktop` launcher when Electron `chrome-sandbox` is not setuid `4755`. No dedicated fix PR is visible in the window.
- [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) — **P1, closed**: Windows `hermes update` self-locks `cryptography._rust.pyd`, causing 100% failure on any cryptography bump. This was recently closed, but self-update file-locking on Windows remains a sensitive area.

### Security-boundary bugs

- [#84551](https://github.com/NousResearch/hermes-agent/issues/84551) — **P2, open**: `detect_dangerous_command` does not unwrap `timeout` or `bash -c` wrappers, bypassing the dangerous-command approval gate. This is a security-relevant bug with no visible fix PR yet.
- [#83565](https://github.com/NousResearch/hermes-agent/issues/83565) — **Open epic**: child-process credential-inheritance closure, anchored by #77027. Related to trusted credentials leaking into model-authored subprocesses.
- [#81843](https://github.com/NousResearch/hermes-agent/pull/81843) — fix PR for stripping Kanban env from terminal-spawned subprocesses; still open.

### Reliability / platform regressions

- [#87309](https://github.com/NousResearch/hermes-agent/issues/87309) — **P2**: `delegate_task` hangs the full 600s when the target CLI rejects `--acp`, e.g. Claude Code v2.x.
- [#87292](https://github.com/NousResearch/hermes-agent/issues/87292) — **P2**: Timeouts with slow local models, including `WinError 10053` and provider unresponsive errors. **Fix PR exists**: [#87310](https://github.com/NousResearch/hermes-agent/pull/87310).
- [#87295](https://github.com/NousResearch/hermes-agent/issues/87295) — **P2**: Second Desktop launch silently kills the running app's backend and breaks connection status.
- [#87200](https://github.com/NousResearch/hermes-agent/issues/87200) — **P2**: Desktop subagent timeout leaves “computing…” / “1 Alt ajan” indicator stuck until restart.
- [#87051](https://github.com/NousResearch/hermes-agent/issues/87051) — **P2**: `/loop` responses delivered outside the active Telegram topic after gateway restart.
- [#84371](https://github.com/NousResearch/hermes-agent/issues/84371) — **P2**: Compaction dead-loop where preflight charges full reasoning replay but tail-budget walk excludes it, causing infinite ineffective compaction.
- [#85315](https://github.com/NousResearch/hermes-agent/issues/85315) — **P2**: `auxiliary.free_only` gate rejects explicitly-requested `:free` models and misreports the skip as payment/credential error.
- [#87280](https://github.com/NousResearch/hermes-agent/issues/87280) — **P2**: Cron lifecycle guard false-positives on `$(( x / y ))` bash arithmetic, blocking legitimate cron creation.
- [#87268](https://github.com/NousResearch/hermes-agent/issues/87268) — **P2**: `install.sh --commit <short-sha>` silently installs unpinned `main` and exits 0.
- [#75584](https://github.com/NousResearch/hermes-agent/issues/75584) — **P2**: Windows update fails after interrupted install — missing `hermes.exe`, `node_modules ENOTEMPTY`, Desktop “UPDATE DIDN'T FINISH”.
- [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) — **P2**: Desktop remains stuck on stale “Thinking” state after turn completion and transcript persistence.
- [#85868](https://github.com/NousResearch/hermes-agent/issues/85868) — **P2**: macOS live self-update leaves stale renderer, blank reload, and stale quit guard.
- [#73890](https://github.com/NousResearch/hermes-agent/issues/73890) — **P3**: Desktop right-side Artifacts and Preview leak context across Projects.

Several P2 Desktop/session-state bugs remain open without visible fix PRs, which is a stability concern for packaged Desktop users.

## 6. Feature Requests & Roadmap Signals

- [#79564](https://github.com/NousResearch/hermes-agent/issues/79564) — **Discord Feature Parity & Alignment Campaign (API v10)** remains an open meta-issue and strong roadmap signal for Discord surface improvements.
- [#86986](https://github.com/NousResearch/hermes-agent/issues/86986) — **Termux: make native pkg install/upgrade the first-class Android path**. User demand for first-class Termux/Android packaging.
- [#87267](https://github.com/NousResearch/hermes-agent/issues/87267) — **Add MAX messenger platform plugin** (Russian messenger by VK). A clear platform-expansion request.
- [#40306](https://github.com/NousResearch/hermes-agent/issues/40306) — **Auto reasoning mode (ChatGPT-style)**. Open since early June; user desire for automatic reasoning-effort selection.
- [#82591](https://github.com/NousResearch/hermes-agent/issues/82591) — **Kanban zero-authority workers, durable publication, safe reclaim, and large-file eradication**. A complete implementation plan tracker; likely to drive Kanban autonomy work.
- [#83565](https://github.com/NousResearch/hermes-agent/issues/83565) — **Child-process credential-inheritance closure campaign epic**: likely to produce more security-hardening PRs.

### Likely next-version features

Based on open PRs and recent activity, the next release may include:

- Slow-model timeout relaxation via [#87310](https://github.com/NousResearch/hermes-agent/pull/87310).
- Plugin and Kanban behavior disclosure via [#87311](https://github.com/NousResearch/hermes-agent/pull/87311) and [#87313](https://github.com/NousResearch/hermes-agent/pull/87313).
- Kanban subprocess env sanitization via [#81843](https://github.com/NousResearch/hermes-agent/pull/81843).
- Desktop Skills tab improvements via [#87312](https://github.com/NousResearch/hermes-agent/pull/87312).

## 7. User Feedback Summary

User pain points in this window concentrate around Windows and Desktop UX:

- **Windows updates are fragile**: users report self-locking DLLs, interrupted installs, missing executables, and `ENOTEMPTY` issues. This is the clearest dissatisfaction cluster.
- **Desktop launch and session-state issues are common**: silent sandbox failure, stale “Thinking” indicators, killed backend on second launch, stuck “computing…” states, and context leaking across projects.
- **Session consistency matters**: users with multiple clients on the same session encounter stale history and lost messages.
- **Local-model users are being punished by timeouts**: slow local reasoning models are disconnected mid-response, causing frustration with local/provider setups.
- **Security expectations are high**: users and maintainers are actively reporting approval-gate bypasses and credential-inheritance risks.
- **On the positive side**, the large-file decomposition campaign is being completed with visible discipline, and there is steady contributor activity around disclosure, security hardening, and platform expansion.

## 8. Backlog Watch

These items have been open for a while and still need maintainer attention or visible resolution:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index stale/degraded, open since July 18 with 36 comments. Automated watchdog repeatedly flags freshness degradation.
- [#51327](https://github.com/NousResearch/hermes-agent/issues/51327) — P1 Desktop sandbox silent failure, open since June 23.
- [#50159](https://github.com/NousResearch/hermes-agent/issues/50159) — Desktop stale “Thinking” state, open since June 21.
- [#40306](https://github.com/NousResearch/hermes-agent/issues/40306) — Auto reasoning mode request, open since June 6 with no visible implementation.
- [#75584](https://github.com/NousResearch/hermes-agent/issues/75584) — Windows interrupted-update recovery, open since July 31.
- [#84551](https://github.com/NousResearch/hermes-agent/issues/84551) — Dangerous-command wrapper bypass, open since August 12; security-relevant and needs a fix PR.
- The long-running gateway refactor PR series ([#77719](https://github.com/NousResearch/hermes-agent/pull/77719), [#77723](https://github.com/NousResearch/hermes-agent/pull/77723), [#77733](https://github.com/NousResearch/hermes-agent/pull/77733), [#77737](https://github.com/NousResearch/hermes-agent/pull/77737), [#77738](https://github.com/NousResearch/hermes-agent/pull/77738), [#77741](https://github.com/NousResearch/hermes-agent/pull/77741), [#77748](https://github.com/NousResearch/hermes-agent/pull/77748), [#77751](https://github.com/NousResearch/hermes-agent/pull/77751), [#77759](https://github.com/NousResearch/hermes-agent/pull/77759), [#79010](https://github.com/NousResearch/hermes-agent/pull/79010)) needs sustained review bandwidth to fully land the decomposition campaign.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-16

## 1. Today's Overview
PicoClaw had a quiet maintenance day: **0 issues updated**, **0 PRs merged/closed**, and **0 releases** in the last 24 hours. Two open pull requests were updated, both marked as **stale** after sitting unreviewed since August 7. Neither has comments or reactions, indicating low community engagement around these changes. The project appears stable but with a growing review backlog that needs maintainer attention. WhatsApp and context-caching fixes remain unmerged despite being important for channel reliability and performance.

## 2. Releases
No new releases were published for PicoClaw on 2026-08-16. There are no release notes, breaking changes, or migration steps to report.

## 3. Project Progress
No PRs were merged or closed in the last 24 hours, so no feature or fix advanced into the main codebase today.

Two PRs were updated but remain open:

- **#3321** — [fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)  
  Proposed change to relocate per-request dynamic context (`## Current Time`, `## Runtime`, `## Current Session`, `## Current Sender`) after conversation history to improve prefix caching efficiency.

- **#3320** — [fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)  
  Dependency bump of `go.mau.fi/whatsmeow` to resolve WhatsApp rejecting the current advertised client version, which leaves the native WhatsApp channel disconnected.

Both PRs are still awaiting review/merge.

## 4. Community Hot Topics
There are **no active issues or PRs with comments/reactions** today. The two most relevant open PRs, both with zero comments and zero 👍, are:

- [PR #3321 — dynamic context placement for prefix caching](https://github.com/sipeed/picoclaw/pull/3321)  
  Underlying need: reduce API cost/latency by preserving LLM provider prefix caching. The current system message ordering invalidates cached conversation prefixes.

- [PR #3320 — WhatsApp client outdated fix](https://github.com/sipeed/picoclaw/pull/3320)  
  Underlying need: restore native WhatsApp connectivity. Users of the WhatsApp channel are effectively blocked until this dependency is bumped.

The lack of comments suggests these are technically important but not yet gaining community discussion — likely because they are internal fixes rather than user-facing feature debates.

## 5. Bugs & Stability
No new bugs were reported as issues today. However, one significant bug is addressed in an open PR:

| Severity | Bug | Status |
| --- | --- | --- |
| High | WhatsApp channel fails with `Client outdated (405)`; socket connects then drops ~5s later with no reconnect attempt. This leaves the native WhatsApp channel unusable. | Fix exists in [PR #3320](https://github.com/sipeed/picoclaw/pull/3320), not yet merged. |
| Medium | Dynamic context block inside the system message invalidates prefix caching, increasing token cost/latency for every request. | Fix exists in [PR #3321](https://github.com/sipeed/picoclaw/pull/3321), not yet merged. |

Both issues have fix PRs open, but neither has been merged, so affected users remain exposed.

## 6. Feature Requests & Roadmap Signals
No user-submitted feature requests were updated today. The strongest roadmap signals come from the open PRs:

- **Prefix-caching-aware prompt construction** (PR #3321) suggests a move toward cost/performance optimization for conversation-heavy workloads. If merged, this could be a precursor to better caching support and lower runtime costs.

- **Upstream dependency health** (PR #3320) signals that PicoClaw is actively tracking external protocol requirements, especially for messaging platforms like WhatsApp.

Prediction: If maintainers act soon, the next minor/patch version may include the `whatsmeow` bump and the dynamic-context reordering as stability and efficiency improvements.

## 7. User Feedback Summary
There is no direct user feedback in issues or PR comments within the last 24 hours. Inferred pain points from the open PRs include:

- **WhatsApp channel dead**: Users relying on the native WhatsApp connection are blocked by the client version rejection and no automatic reconnect.
- **Higher latency/cost**: The current system prompt ordering defeats prefix caching, likely causing slower responses and higher API expenses on long conversations.

Satisfaction cannot be measured from today's data, but the existence of two stale, unmerged fixes suggests that known pain points are not yet resolved user-facing.

## 8. Backlog Watch
Two important PRs have now been open since **2026-08-07** and were touched again on **2026-08-15**, yet remain unmerged and stale-labelled:

- **PR #3321** — [fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)  
  Needs maintainer review; impacts performance/cost.

- **PR #3320** — [fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)  
  Needs maintainer review; directly unblocks a broken channel.

Both PRs have no comments or reviews, indicating they may be at risk of being forgotten or closed by stale-bot without maintainer intervention.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-16

## 1. Today's Overview

NanoClaw is in a high-velocity development stretch: 22 PRs were updated in the last 24 hours, 19 remain open, and 3 reached closed status. No Issues were active, and no new releases were published. The PR stream is dominated by a large core-team push around channel-adapter capabilities, permission/approval seams, cross-session context, and container/delivery stability. A smaller set of community-contributed fixes is also moving, indicating real external usage despite the maintainer-heavy activity.

## 2. Releases

None. The latest releases list is empty, so there are no changelogs, breaking-change notes, or migration instructions to report.

## 3. Project Progress

Three PRs reached closed status in the window:

- [#37](https://github.com/nanocoai/nanoclaw/pull/37) — **Rename to DotClaw and switch from WhatsApp to Telegram**  
  Long-running proposal from February 2026; closed after substantial updates.
- [#3268](https://github.com/nanocoai/nanoclaw/pull/3268) — **fix(poll-loop): stopped loops leaked their active query's follow-up poller**  
  A concrete stability fix closing a resource-leak/process-lifetime bug.
- [#3117](https://github.com/nanocoai/nanoclaw/pull/3117) — **feat(skill): add-omarchy-statusbar — Waybar status indicator for NanoClaw**  
  A user-facing utility skill for Linux/Waybar users.

The data labels these as CLOSED, not explicitly MERGED, so merge confirmation is not available. The broader open-PR set shows active work across channel integration, permissions, delivery, and agent lifecycle.

## 4. Community Hot Topics

There were no active Issues in the tracker. PR comment/reaction counts were not exposed in the supplied data (`undefined` / `0`), so “hotness” is inferred from recency, author clustering, and topic density.

The dominant hotspot is the core-team PR cluster from 2026-08-15, focused on making NanoClaw more production-ready for multi-channel, multi-session agent deployments:

- [#3266](https://github.com/nanocoai/nanoclaw/pull/3266) — Permissions: `registerChannelCardInterceptor` seam before registration cards
- [#3260](https://github.com/nanocoai/nanoclaw/pull/3260) — `decline_notify` unknown-sender policy
- [#3262](https://github.com/nanocoai/nanoclaw/pull/3262) — Chat SDK bridge DM surface / app-context capture
- [#3261](https://github.com/nanocoai/nanoclaw/pull/3261) — Optional adapter capabilities: typing status, thread title, suggested prompts
- [#3263](https://github.com/nanocoai/nanoclaw/pull/3263) — Hot-start a registered channel adapter after boot
- [#3257](https://github.com/nanocoai/nanoclaw/pull/3257) — Cross-session context fan-out and DM backfill
- [#3256](https://github.com/nanocoai/nanoclaw/pull/3256) — `messaging_groups.detached_at` support

Underlying need: operators are running NanoClaw across many channels/concurrent sessions and need finer control over approvals, DM context, delivery ordering, and lifecycle cleanup.

## 5. Bugs & Stability

Ranked by potential impact:

- **Severe — False container kills during API rate-limiting**  
  [#3251](https://github.com/nanocoai/nanoclaw/pull/3251) — Heartbeat could stall 30+ minutes during Claude API rate-limits, causing false stale-container kills. Fix PR exists.

- **Severe — Idle containers could be exempt from absolute-ceiling kill forever**  
  [#3252](https://github.com/nanocoai/nanoclaw/pull/3252) — A running container with no `.heartbeat` file avoided the absolute-ceiling kill entirely. Fix PR exists.

- **High — Stopped poll loops leaked follow-up pollers**  
  [#3268](https://github.com/nanocoai/nanoclaw/pull/3268) — A stopped loop could leave its active query’s 500ms poller running. Fix PR closed.

- **High — Outbound delivery could resolve the wrong channel-instance row**  
  [#3255](https://github.com/nanocoai/nanoclaw/pull/3255) — With multiple bot identities in one room, messages could route through an arbitrary sibling instance. Fix PR exists.

- **High — Context rows could crowd out real task rows in inbound batches**  
  [#3254](https://github.com/nanocoai/nanoclaw/pull/3254) — A backlog of `trigger=0` context rows could push due task work out of the capped batch. Fix PR exists.

- **Medium — Discord attachments never reach the agent readably**  
  [#2752](https://github.com/nanocoai/nanoclaw/pull/2752) — Inbound Discord attachments show as bare `[file: …]` / `[image: …]` with no bytes or path. Fix PR is still open.

- **Low — Telegram Markdown sanitizer downgrades bold to italic**  
  [#3250](https://github.com/nanocoai/nanoclaw/pull/3250) — `**bold**` becomes `_italic_`; fix removes the legacy sanitizer.

- **Low — Skill-apply step ordinals rendered incorrectly**  
  [#3259](https://github.com/nanocoai/nanoclaw/pull/3259) — SKILL.md heading ordinals leaked into step captions; fix strips leading `2.` / `2)` ordinals.

No crash reports were filed because the issue tracker currently has zero active items.

## 6. Feature Requests & Roadmap Signals

There are no explicit user feature requests in the Issue tracker (0 Issues). However, the open PR list strongly signals the roadmap direction:

- **Permission/approval flexibility**  
  [#3266](https://github.com/nanocoai/nanoclaw/pull/3266) and [#3260](https://github.com/nanocoai/nanoclaw/pull/3260) add interceptor seams and a polite decline policy for unknown senders.

- **Richer channel-adapter capabilities**  
  [#3261](https://github.com/nanocoai/nanoclaw/pull/3261) adds typing status, thread titles, and suggested prompts where platforms support them.

- **DM/conversation normalization**  
  [#3262](https://github.com/nanocoai/nanoclaw/pull/3262) improves Chat SDK bridges for platforms with threaded DM surfaces.

- **Cross-session awareness**  
  [#3257](https://github.com/nanocoai/nanoclaw/pull/3257) fans session context into sibling sessions and adds `ncl sessions history`.

- **Detached conversation semantics**  
  [#3256](https://github.com/nanocoai/nanoclaw/pull/3256) adds `detached_at` so delivery can refuse sends into conversations the bot was removed from.

- **Community feature signal**  
  [#3253](https://github.com/nanocoai/nanoclaw/pull/3253) proposes honoring group reasoning effort in model config; [#3117](https://github.com/nanocoai/nanoclaw/pull/3117) adds a Waybar status indicator.

Prediction: the next NanoClaw version will likely include the permission-seam work, DM/delivery hardening, cross-session context, and the container lifecycle fixes.

## 7. User Feedback Summary

Real user pain points are visible through bug-fix PRs:

- Discord users: attachments are not readable by the agent — [#2752](https://github.com/nanocoai/nanoclaw/pull/2752)
- Telegram users: bold text is rendered as italic — [#3250](https://github.com/nanocoai/nanoclaw/pull/3250)
- Operators: false container kills during API rate-limits — [#3251](https://github.com/nanocoai/nanoclaw/pull/3251)
- Multi-instance deployments: messages can be delivered to the wrong channel row — [#3255](https://github.com/nanocoai/nanoclaw/pull/3255)
- Skill authors: step numbers appear wrong in multi-skill runs — [#3259](https://github.com/nanocoai/nanoclaw/pull/3259)

On the satisfaction side, the existence of community-contributed fixes and skills — e.g. [#3253](https://github.com/nanocoai/nanoclaw/pull/3253), [#3250](https://github.com/nanocoai/nanoclaw/pull/3250), [#3117](https://github.com/nanocoai/nanoclaw/pull/3117) — suggests external users are actively deploying NanoClaw and willing to contribute fixes upstream.

## 8. Backlog Watch

- [#2752](https://github.com/nanocoai/nanoclaw/pull/2752) — **Discord inbound attachment fix**  
  Opened 2026-06-12, still open as of 2026-08-15. This is the longest-running open PR in the current set and addresses a functional channel bug; it deserves maintainer review and testing.

- [#37](https://github.com/nanocoai/nanoclaw/pull/37) — **Rename to DotClaw / Telegram switch**  
  Opened 2026-02-02 and closed 2026-08-15. Its six-month lifespan may indicate a large, hard-to-review change; worth a brief project note about why it closed.

- **No open Issues exist**, so there is no unanswered issue backlog. The main backlog risk is the growing stack of core-team PRs awaiting review and consolidation, especially the #3254–#3266 cluster.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

## 1. Today's Overview

NullClaw had a low-activity day on 2026-08-16: no releases, no merged PRs, and one new issue plus one new open PR. The issue tracker remains small, with only one open feature request, while incoming contributor activity is focused on agent loop stability and long-running tool-heavy executions. The project looks healthy but quiet, with no bug reports or regressions surfacing in the last 24 hours. Maintainer attention is likely needed on review/triage for the two new items.

## 2. Releases

No new releases were published in the last 24 hours. No release notes, breaking changes, or migration steps are available.

## 3. Project Progress

No PRs were merged or closed during this window.

An open PR is awaiting review:

- **[#987 – feat(agent): loop hygiene for long local tool-heavy runs](https://github.com/nullclaw/nullclaw/pull/987)**  
  Contributes improvements to long-running agent loops by:
  - Splitting the system prompt into a cache-friendly stable prefix and a variable datetime tail.
  - Compressing tool outputs before history injection, while preserving full output in observer logs.
  - Adding per-turn identical-call loop protections to reduce redundant execution.

This has not been merged, so it has not yet advanced the main branch.

## 4. Community Hot Topics

There was very little community interaction in the last 24 hours. Neither the sole open issue nor the sole open PR has comments or reactions yet.

- **[#988 – [enhancement] proxy support](https://github.com/nullclaw/nullclaw/issues/988)**
  The only active issue requests HTTP(S) and SOCKS(5h) proxy support for providers. With no comments or reactions, this is early-stage demand, but the request suggests a real user need for network-restricted or privacy-conscious environments.

- **[#987 – feat(agent): loop hygiene for long local tool-heavy runs](https://github.com/nullclaw/nullclaw/pull/987)**
  The only active PR addresses agent loop hygiene. It signals contributor interest in making NullClaw more reliable for local, tool-heavy workloads.

## 5. Bugs & Stability

No crashes, regressions, or bug reports were logged in the last 24 hours.

There are no active stability-related issues. PR #987 may indirectly improve runtime stability by reducing redundant calls and compressing history, but it is not a bug fix and remains unreviewed.

## 6. Feature Requests & Roadmap Signals

The only explicit feature request is:

- **[#988 – proxy support](https://github.com/nullclaw/nullclaw/issues/988)**  
  The user asks for HTTP(S) and SOCKS(5h) proxy support for providers. This is a common enterprise/corporate-network requirement and could plausibly appear in a future release if maintainers accept the direction.

On the contributor side, PR #987 points toward an ongoing roadmap theme: making the agent loop more efficient for long local runs. If merged, this could enable larger tool-heavy sessions without hitting context or performance limits.

Near-term next-version signals are therefore:
- Possible proxy configuration for provider connections.
- Agent loop hygiene improvements for long-running local tasks.

## 7. User Feedback Summary

User feedback in this period was minimal but clear:

- **Proxy support demand**: The issue author needs HTTP(S) and SOCKS(5h) proxy support, likely for using NullClaw behind corporate networks, VPNs, or restricted systems.
- **Long-run usability**: PR #987's author is optimizing for long local tool-heavy runs, indicating a use case around sustained agentic work with many tool calls.

No negative feedback, satisfaction complaints, or usage problems were reported.

## 8. Backlog Watch

There are no long-unanswered issues or PRs currently requiring maintainer attention. Both items are recent:

- [#988](https://github.com/nullclaw/nullclaw/issues/988) was created/updated on 2026-08-15.
- [#987](https://github.com/nullclaw/nullclaw/pull/987) was created/updated on 2026-08-15.

Maintainers should focus on triaging #988 and reviewing #987 before they become stale.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-16

## 1. Today's Overview

IronClaw shows a high-velocity day: 28 issues were updated (21 closed, 7 open) and 13 PRs were touched (6 merged/closed, 7 open), with no new releases. The biggest milestone is the completion of the **unbound-turns train** — [#7562](https://github.com/nearai/ironclaw/pull/7562) (design + phase 1) and [#7634](https://github.com/nearai/ironclaw/pull/7634) (full switchover to prepared-context turns) both merged. A coordinated performance cleanup also landed: heartbeat journal churn removed, trigger/outbound state writes reduced, and thread-index touches coalesced, closing all five Tier 1/2 write-amplification issues from epic #7591. Notably, a Live Canary that has been red 30/30 runs is addressed by an open fix PR, and a fresh batch of review follow-ups from #7634 (issues #7671–#7675) signals active hardening of the new turn model. Overall project health is strong: large architectural debt is being retired, and the maintainers are closing issues at a 3:1 ratio versus newly opened ones.

## 2. Releases

No new releases in this window.

## 3. Project Progress

Six PRs were merged/closed today:

- **Unbound-turns switchover completed** — [#7634](https://github.com/nearai/ironclaw/pull/7634) (XL, stacked on #7562) delivers every follow-up from the prepared-context design, backed by a 71-clause conformance audit of both design docs. [#7562](https://github.com/nearai/ironclaw/pull/7562) (XL) carried the design docs plus phase-1 implementation: the prepared-context accept door, unbound run lane, and kernel binding-ref deletion.
- **Perf: heartbeat journal churn removed** — [#7628](https://github.com/nearai/ironclaw/pull/7628) (M) stops appending `ProcessJournalKind::Heartbeat` rows and ships a 15-second turn-runner heartbeat interval, implementing the conservative subset of #7591 (#7593, #7599).
- **Perf: trigger/outbound state writes reduced** — [#7629](https://github.com/nearai/ironclaw/pull/7629) (M) moves run-history pruning off every `Running`-row update to the initial fire claim, while retaining completion-time pruning on the recovery path.
- **Perf: thread index touches coalesced** — [#7676](https://github.com/nearai/ironclaw/pull/7676) (L) coalesces bursty per-thread touch writes into bounded index writes with monotonic CAS updates for multi-worker correctness.
- **CI: codebase knowledge graph refreshed** — [#7670](https://github.com/nearai/ironclaw/pull/7670) (XS, bot) updated the committed codebase-memory bootstrap snapshot.

Supporting issue closures confirm the cleanup: all five Tier 1/2 perf issues from epic #7591 closed (#7593, #7595, #7596, #7597, #7599), the **Reborn QA epic** [#4775](https://github.com/nearai/ironclaw/issues/4775) closed, the legacy-path retirement [#4629](https://github.com/nearai/ironclaw/issues/4629) closed, and loop input/resume/cancellation semantics [#3423](https://github.com/nearai/ironclaw/issues/3423) were finalized. Similarly-closed was the webui_v2 SSE drain-and-poll replacement [#5672](https://github.com/nearai/ironclaw/issues/5672).

## 4. Community Hot Topics

Most-commented items in this window:

- **[#467 — Trajectory benchmark system for agent quality evaluation](https://github.com/nearai/ironclaw/issues/467)** (4 comments, open since 2026-03-02). Proposes a benchmark that runs real user scenarios through the real agent loop with real LLM calls, scored by hard pass/fail assertions (tool selection, content, cost, latency) plus LLM-as-judge. The sustained interest signals a roadmap need for objective, repeatable agent-quality measurement rather than manual QA.
- **[#3236 — Same-thread follow-up and steering policy](https://github.com/nearai/ironclaw/issues/3236)** (3 comments, now closed). Defined how Reborn handles same-canonical-thread input while a turn owns the active-thread lock: follow-ups, `/btw` steering, queue visibility, cancellation, and blocked-run behavior. Its closure indicates the turn-concurrency semantics are now pinned down.

Underlying need across both: **deterministic control and evaluation of the agent loop** — the same theme driving the merged unbound-turns PRs. The #7634 review follow-ups (#7671–#7674) continue this thread with concrete hardening asks.

## 5. Bugs & Stability

Ranked by severity, with fix status:

1. **E2E flake cascade (HIGH)** — [#7675](https://github.com/nearai/ironclaw/issues/7675): `qa_6c_gmail_to_sheet_live_chat` intermittently fails on a generic resource-class capability error, and the flake cascades across the whole provider-contracts session. Triaged against #7634 (not caused by that PR). No fix yet.
2. **BudgetLedger double-charge (MEDIUM-HIGH)** — [#7673](https://github.com/nearai/ironclaw/issues/7673): truncated launch windows double-charge invocations (`try_charge_invocations` before `invoke`), plus a charge-durability gap. Errs conservative (over-count → earlier stop), but is a real accounting defect. Open.
3. **Stack overflow risk in capability dispatch (MEDIUM)** — [#7671](https://github.com/nearai/ironclaw/issues/7671): the LoopCapabilityPort decorator chain overflowed default 2 MiB test stacks; f1f396cd8 chain-boxes delegations as a partial fix, but the kernel sandbox path is still near the edge. Open follow-up.
4. **MCP auth failures silently misclassified (MEDIUM — fixed)** — [#6835](https://github.com/nearai/ironclaw/issues/6835): `McpError::AuthRequired` was classified as `Client`, never raising a re-auth gate; closed.
5. **IronHub search hallucination (MEDIUM — fixed)** — [#6821](https://github.com/nearai/ironclaw/issues/6821): free-text matches were reported as a full catalog listing (3 tools vs. 18 in the signed catalog); closed.
6. **Railway automations failing pre-thread (MEDIUM — fixed)** — [#4992](https://github.com/nearai/ironclaw/issues/4992): local-dev SSO access mismatch caused `No thread attached` failures; closed.
7. **Scheduler false terminal-failure (LOW — fixed)** — [#5239](https://github.com/nearai/ironclaw/issues/5239): stale post-completion heartbeat misread as runner failure; closed.
8. **Wasmtime/Cranelift DEBUG log flood (LOW — fixed)** — [#5237](https://github.com/nearai/ironclaw/issues/5237): broad debug filter flooded Railway during WASM compilation; closed.

Also notable: **Live Canary red 30/30 runs** — open PR [#7679](https://github.com/nearai/ironclaw/pull/7679) attributes this to three harness defects that failed correct product behavior plus a liveness proxy reddening cases with durable evidence, rather than actual regressions.

## 6. Feature Requests & Roadmap Signals

New features requested or in flight:

- **Typed ToolChoice** (new, open) — [#7672](https://github.com/nearai/ironclaw/issues/7672): retire the overloaded `tool_choice: Option<String>` across all six provider encoders in favor of a typed representation. Likely candidate for the next release given it touches every adapter.
- **Symbol-level architecture tests** (new, open) — [#7674](https://github.com/nearai/ironclaw/issues/7674): pin which symbols the `openai-compat → threads` edge may import, going beyond crate-level boundaries.
- **Prepared-marker backfill off the listing path** (new, open) — [#7669](https://github.com/nearai/ironclaw/issues/7669): move the per-scope one-time sweep out of the first `list_threads_for_scope` request.
- **Deterministic no-result suppression for automations** — PR [#7651](https://github.com/nearai/ironclaw/pull/7651): `trigger_create` must supply `result_delivery` derived from user wording; neutral phrasing defaults to `deliver`.
- **OMP core-tool contract + engines + benchmark** — PR [#7491](https://github.com/nearai/ironclaw/pull/7491): unifies the coding surface into six bare tool names (`read`, `write`, `edit`, `glob`, `grep`, `bash`) with an added benchmark arm.
- **WebUI operator surface for IronHub agent link** — PR [#7516](https://github.com/nearai/ironclaw/pull/7516): exposes the IronHub register URL and shared-key install in the Extensions page, removing the CLI-only dependency.
- **Capability invocation persistence** — PR [#7678](https://github.com/nearai/ironclaw/pull/7678): keep invocation state worker-local, materialize at gate/terminal edges, preserve lease-fenced cross-worker resume.
- **Message lookup index folding** — PR [#7677](https://github.com/nearai/ironclaw/pull/7677): store exact lookup keys as indexed projections on message rows instead of 1–3 sibling rows per message.

Prediction: the next minor release will likely include the #7634 review follow-ups (Typed ToolChoice, symbol-level guards) plus one or more of the open perf XL PRs (#7677, #7678), as they are all core-authored and low-risk.

## 7. User Feedback Summary

Real-world pain points visible in this window:

- **IronHub discoverability is unreliable** — a live preview deployment reported 3 installable tools when the signed catalog contained 18, and 20 of 21 listed skills were not catalog entries ([#6821](https://github.com/nearai/ironclaw/issues/6821)). This directly undermines the install experience.
- **Railway-hosted automations failing** — scheduled automations errored with `No thread attached` and `0% visible runs` due to local-dev SSO mismatch ([#4992](https://github.com/nearai/ironclaw/issues/4992)).
- **Operational noise in hosted deploys** — a single debug-log setting flooded Railway with Cranelift/Wasmtime compiler output ([#5237](https://github.com/nearai/ironclaw/issues/5237)), and the scheduler emitted false failure paths on stale heartbeats ([#5239](https://github.com/nearai/ironclaw/issues/5239)).
- **CI confusion from harness bugs** — the Live Canary has been red 30/30 runs despite correct product behavior, eroding trust in the signal ([#7679](https://github.com/nearai/ironclaw/pull/7679)). The fix PR explicitly separates harness defects from real regressions.
- **Gmail-to-sheet live QA flakiness** — an intermittent resource-class capability failure in the live Gmail leg cascades into unrelated provider-contract results ([#7675](https://github.com/nearai/ironclaw/issues/7675)).

Satisfaction signal: the volume of closed issues (21) and the prompt closing of Tier 1 waste items indicate a responsive maintainer team actively addressing reported friction.

## 8. Backlog Watch

- **[#467 — Trajectory benchmark system](https://github.com/nearai/ironclaw/issues/467)** — open since 2026-03-02 (~5.5 months), 4 comments, zero reactions. This is the single most important roadmap item without a clear owner or PR. As IronClaw merges the unbound-turns rework, the absence of a trajectory-based quality benchmark makes regressions harder to detect — and the 30/30 red canary runs suggest evaluation infrastructure needs exactly this investment.
- **[#7669 — Prepared-marker backfill](https://github.com/nearai/ironclaw/issues/7669)** — opened 2026-08-14, no comments yet; first-list-request latency regression is easy to overlook and should be scheduled.
- All other open issues are from 2026-08-15 and are actively being worked by core contributors, so no other items appear stuck.

No new releases in this window.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-16

## 1. Today's Overview

In the last 24 hours, LobsterAI showed **maintenance-mode activity**: 18 issues were updated (16 closed, 2 still open) and 6 PRs were updated (2 closed, 4 still open), with **no new releases**. The vast majority of touched issues carry the `stale` label, suggesting this is largely automated cleanup of older reports from April–May rather than fresh feature development. The two remaining open issues are a repeated membership-login failure ([#1903](https://github.com/netease-youdao/LobsterAI/issues/1903)) and a system-level Agent memory proposal ([#2046](https://github.com/netease-youdao/LobsterAI/issues/2046)). Two non-dependabot PRs were closed, including a config-sync fix and an OpenClaw cron child-agent finalization fix. Overall, the project is stable but currently has low visible feature velocity.

## 2. Releases

No new releases were reported in this digest window. There are no changelog, breaking-change, or migration notes to summarize.

## 3. Project Progress

Two closed PRs represent the main code-progress signals:

- **[PR #1879 — fix: preserve manually-added plugin load paths on config sync](https://github.com/netease-youdao/LobsterAI/pull/1879)**  
  Fixes `OpenClawConfigSync.sync()` replacing `plugins.load.paths` with only LobsterAI-managed paths, silently discarding manually added community plugin paths such as `memory-lancedb-pro`.

- **[PR #2234 — fix(openclaw): cron yield descendant finalization](https://github.com/netease-youdao/LobsterAI/pull/2234)**  
  Fixes child-agent completion events not driving the parent agent after `sessions_yield`, prevents completed runs from receiving stray completion writes, and adds cron yield-continuation support for multi-round parent-agent driving.

Four dependabot PRs ([#2164](https://github.com/netease-youdao/LobsterAI/pull/2164), [#2165](https://github.com/netease-youdao/LobsterAI/pull/2165), [#2166](https://github.com/netease-youdao/LobsterAI/pull/2166), [#2167](https://github.com/netease-youdao/LobsterAI/pull/2167)) remain open; they are CI/dependency bumps with no functional feature work.

## 4. Community Hot Topics

The most commented issues in this window were all older issues being touched by stale-bot cleanup. No issues received 👍 reactions.

- **[#1849 — 追问时会出现无限NO_REPLY或输出几个文字就不输出](https://github.com/netease-youdao/LobsterAI/issues/1849)** — 4 comments  
  User reports task being marked complete early while the model is still generating, causing no UI response.

- **[#1878 — IM机器人 微信接口 配置扫码后无法输入验证码](https://github.com/netease-youdao/LobsterAI/issues/1878)** — 4 comments  
  WeChat IM setup requires entering a 6-digit verification code after scanning, but the client has no input UI.

- **[#1903 — 会员登录频繁失败](https://github.com/netease-youdao/LobsterAI/issues/1903)** — 3 comments, **still open**  
  Frequent member-login failures block access to paid NetEase models.

- **[#1920 — [UI] Cowork initialization shows blank loading state](https://github.com/netease-youdao/LobsterAI/issues/1920)** — 3 comments  
  Users expect skeleton screens instead of plain text `Loading...`.

- **[#1988 — 阿里百炼coding plan无法正常调用qwen3.6-plus](https://github.com/netease-youdao/LobsterAI/issues/1988)** — 3 comments  
  After update, qwen3.6-plus is forcibly routed to NetEase's built-in model and reports no quota, even when config is edited.

- **[#1993 — AI engine connection lost issue](https://github.com/netease-youdao/LobsterAI/issues/1993)** — 3 comments  
  Desktop app persistently shows "AI engine connection lost", while IM Bot connection remains stable.

Underlying community concerns center on **authentication reliability, forced model routing, IM integration friction, and UI polish** rather than new functionality.

## 5. Bugs & Stability

Ranked by impact:

| Severity | Issue | Description |
| --- | --- | --- |
| **High** | [#1903](https://github.com/netease-youdao/LobsterAI/issues/1903) | Member login fails frequently, making paid NetEase models unusable. Still open. |
| **High** | [#1988](https://github.com/netease-youdao/LobsterAI/issues/1988) | Model routing forcibly points qwen3.6-plus to NetEase's built-in provider; config overrides are ignored. |
| **High / Security** | [#1885](https://github.com/netease-youdao/LobsterAI/issues/1885) | Email skill `imap.js` attachment download has a path traversal vulnerability due to missing filename filtering. Closed stale — maintainers should confirm whether it was fixed elsewhere. |
| **Medium** | [#1993](https://github.com/netease-youdao/LobsterAI/issues/1993) | Desktop app loses AI engine connection while IM Bot is stable. |
| **Medium** | [#1849](https://github.com/netease-youdao/LobsterAI/issues/1849) | Infinite `NO_REPLY` / premature task completion causes blank output. |
| **Medium** | [#1878](https://github.com/netease-youdao/LobsterAI/issues/1878) | WeChat scan code flow cannot accept required verification code. |
| **Medium** | [#2017](https://github.com/netease-youdao/LobsterAI/issues/2017) | Local runs fail with "未检测到内置 OpenClaw runtime" — users cannot start tasks. |
| **Low/Medium** | [#1971](https://github.com/netease-youdao/LobsterAI/issues/1971) | Virtual scrolling breaks when session contains very large elements such as Mermaid diagrams. |

No direct fix PRs were observed for these open bugs in this window. The closest related merged/closed PRs are [#1879](https://github.com/netease-youdao/LobsterAI/pull/1879) (config sync) and [#2234](https://github.com/netease-youdao/LobsterAI/pull/2234) (cron yield).

## 6. Feature Requests & Roadmap Signals

Several recurring feature themes emerged:

- **Agent memory / persistence**  
  [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) (open) is a detailed proposal for system-level Agent memory, including session metadata persistence to the filesystem. Related memory-centric analyses appear in [#2041](https://github.com/netease-youdao/LobsterAI/issues/2041) and the Dreaming schema issue [#2039](https://github.com/netease-youdao/LobsterAI/issues/2039). Memory is likely a high-priority roadmap area.

- **UI/UX overhaul**  
  [#1836](https://github.com/netease-youdao/LobsterAI/issues/1836) asks for professional redesign; [#1920](https://github.com/netease-youdao/LobsterAI/issues/1920) and [#1921](https://github.com/netease-youdao/LobsterAI/issues/1921) request better skeleton/empty states. This is repeated but not complex work.

- **Additional agent engines / integrations**  
  [#1880](https://github.com/netease-youdao/LobsterAI/issues/1880) requests Hermes Agent support, and [#2016](https://github.com/netease-youdao/LobsterAI/issues/2016) requests an `openhuman` engine.

- **Eventing / extensibility**  
  [#2036](https://github.com/netease-youdao/LobsterAI/issues/2036) suggests adding `agent:turn` / `agent:loop` gateway events to enable real-time persistence.

**Prediction:** The next functional releases are more likely to target memory-system improvements and UI polish, given the open memory proposal and the cluster of UI complaints. Third-party agent engine support appears less likely in the near term.

## 7. User Feedback Summary

Real user pain points in this window:

- **Paid access reliability is the top blocker.** Membership login failures ([#1903](https://github.com/netease-youdao/LobsterAI/issues/1903)) and forced model routing to NetEase's built-in provider ([#1988](https://github.com/netease-youdao/LobsterAI/issues/1988)) directly prevent users from using paid models.
- **Desktop app stability trails IM Bot.** `AI engine connection lost` is specifically reported in the desktop app ([#1993](https://github.com/netease-youdao/LobsterAI/issues/1993)).
- **IM integration is incomplete for WeChat.** The scan-code flow does not support entering the verification code ([#1878](https://github.com/netease-youdao/LobsterAI/issues/1878)).
- **Local/source setup is too difficult.** Users hitting missing built-in OpenClaw runtime ([#2017](https://github.com/netease-youdao/LobsterAI/issues/2017)) cannot use the app at all.
- **UI quality is criticized.** One user states it is "too ugly" compared to competitors ([#1836](https://github.com/netease-youdao/LobsterAI/issues/1836)); others note unfinished loading/empty states ([#1920](https://github.com/netease-youdao/LobsterAI/issues/1920), [#1921](https://github.com/netease-youdao/LobsterAI/issues/1921)).
- **Long-session rendering is fragile.** Mermaid or oversized content causes scroll/rerender issues ([#1971](https://github.com/netease-youdao/LobsterAI/issues/1971)).
- **Power users want a real memory system.** The open issue [#2046](https://github.com/netease-youdao/LobsterAI/issues/2046) captures cross-session memory loss and manual title/metadata management.

No explicitly positive user feedback appears in this batch; most commentary reflects reliability friction or UX dissatisfaction.

## 8. Backlog Watch

The following items deserve maintainer attention:

- **[#1903 — 会员登录频繁失败 (open since 2026-05-07)](https://github.com/netease-youdao/LobsterAI/issues/1903)**  
  Critical paid-access bug, still open and now marked stale.

- **[#2046 — OpenClaw/LobsterAI产品建议：Agent 记忆体系 (open since 2026-05-25)](https://github.com/netease-youdao/LobsterAI/issues/2046)**  
  A detailed, actionable memory-system proposal; still open and stale.

- **[#1885 — 邮箱SKILL路径穿越漏洞](https://github.com/netease-youdao/LobsterAI/issues/1885)**  
  Security vulnerability closed as stale. Should be verified or reopened if not actually resolved.

- **Dependabot PRs:** [#2164](https://github.com/netease-youdao/LobsterAI/pull/2164), [#2165](https://github.com/netease-youdao/LobsterAI/pull/2165), [#2166](https://github.com/netease-youdao/LobsterAI/pull/2166), [#2167](https://github.com/netease-youdao/LobsterAI/pull/2167)  
  Open since 2026-06-15 and stale. These are low-risk CI dependency bumps; they should be merged or closed to reduce backlog noise.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## 1. Today's Overview

As of 2026-08-16, Moltis shows a quiet issue tracker with zero open or recently updated issues and no new releases. Pull request activity is moderate, with 6 PRs updated in the last 24 hours: 3 still open and 3 closed/merged. All recent PRs come from the same author and are concentrated on integration features, UX improvements, and bug fixes — indicating steady, maintainer-driven development. The absence of new issues or user-reported bugs suggests a stable period, while the closed PRs point to meaningful progress in skill search reliability, IDE command-palette interaction, and OpenAI API routing. Overall project health appears solid, with active feature work continuing across sandbox support, external connectors, and Slack integration.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

The following PRs were closed/merged in the last 24 hours:

- [#1196 – Fix ClawHub skill search results](https://github.com/moltis-org/moltis/pull/1196)  
  Fixes skill search timeouts by stopping per-result ClawHub metadata requests, consuming search metadata directly, and preserving owner-qualified references through install/detail/download flows.

- [#1197 – Start agent chats from command palette](https://github.com/moltis-org/moltis/pull/1197)  
  Adds an "Ask agent" final command-palette action for non-empty queries, creates a fresh chat session, and sends the palette query immediately — including while search is still pending.

- [#1198 – Route OpenAI reasoning tool calls through Responses](https://github.com/moltis-org/moltis/pull/1198)  
  Routes built-in OpenAI requests that combine function tools with `reasoning_effort` through the Responses API, while preserving Chat Completions behavior for other cases and sharing request construction across streaming and non-streaming paths.

Open PRs still in progress:

- [#1190 – Add durable calendar, channel, and email connectors](https://github.com/moltis-org/moltis/pull/1190)  
- [#1195 – Add Slack native live task cards](https://github.com/moltis-org/moltis/pull/1195)  
- [#1199 – Add Coder remote workspace sandbox support](https://github.com/moltis-org/moltis/pull/1199)

## 4. Community Hot Topics

There were no issues or PRs with meaningful comment or reaction activity in the last 24 hours; all PRs show zero comments and zero reactions. The most notable open PRs are still generating focus:

- [#1199 – Add Coder remote workspace sandbox support](https://github.com/moltis-org/moltis/pull/1199)  
  Aimed at ephemeral Coder workspaces via REST API and PTY WebSockets, with template/preset/rich-parameter/TTL support. This suggests growing demand for remote and ephemeral sandbox environments.

- [#1190 – Add durable calendar, channel, and email connectors](https://github.com/moltis-org/moltis/pull/1190)  
  Adds CalDAV, Gmail, Himalaya v2, and channel-history connectors with provider-owned schemas and no copied credentials. This addresses the need for persistent, provider-neutral external data access.

- [#1195 – Add Slack native live task cards](https://github.com/moltis-org/moltis/pull/1195)  
  Renders live plan/task cards inside Slack streams with privacy-protected opaque run IDs. This points to user demand for richer, real-time task visibility inside Slack.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported as issues in the last 24 hours. One notable bug fix was closed:

- **[#1196 – Fix ClawHub skill search results](https://github.com/moltis-org/moltis/pull/1196)**  
  Severity: moderate. Per-result ClawHub metadata requests were pushing skill search beyond the RPC timeout. The fix removes those extra requests and carries owner-qualified references through the full search/install flow, reducing latency and stabilizing search behavior.

Additionally, [#1198](https://github.com/moltis-org/moltis/pull/1198) corrects API routing behavior for OpenAI reasoning + tool-call combinations, avoiding incorrect fallback to Chat Completions.

## 6. Feature Requests & Roadmap Signals

No user-submitted feature requests appeared in the issue tracker. However, open PRs provide strong roadmap signals:

- **Remote/cloud sandboxing** is a clear direction: [#1199](https://github.com/moltis-org/moltis/pull/1199) adds Coder as a sandbox backend with automatic backend selection.
- **Durable external connectors** are being prepared: [#1190](https://github.com/moltis-org/moltis/pull/1190) introduces provider-neutral persistence for calendars, email, and channels.
- **Slack-native interaction** is advancing: [#1195](https://github.com/moltis-org/moltis/pull/1195) adds live task cards and lifecycle updates to Slack streams.

These features are likely candidates for inclusion in the next Moltis release, possibly alongside the already-merged OpenAI Responses API routing changes.

## 7. User Feedback Summary

Direct user feedback is unavailable in this window: there are zero open issues and zero comments/reactions on PRs. Indirect feedback through PR work suggests that users are encountering and caring about:

- **Skill search reliability** – the ClawHub timeout fix in [#1196](https://github.com/moltis-org/moltis/pull/1196) addresses a real workflow-blocking issue.
- **IDE workflow efficiency** – [#1197](https://github.com/moltis-org/moltis/pull/1197) improves frictionless starting of agent chats from the command palette.
- **External integrations** – the connector and Slack card work in [#1190](https://github.com/moltis-org/moltis/pull/1190) and [#1195](https://github.com/moltis-org/moltis/pull/1195) reflect practical demand for real-world email, calendar, and Slack usage.

Overall satisfaction cannot be measured from comments, but the absence of bug reports suggests stable behavior for current users.

## 8. Backlog Watch

No long-stale or unanswered issues require immediate maintainer attention. The oldest open PR is:

- [#1190 – Add durable calendar, channel, and email connectors](https://github.com/moltis-org/moltis/pull/1190)  
  Opened 2026-08-11 and last updated 2026-08-15, so it remains actively worked on and is not truly backlogged.

No other items appear to be waiting for maintainer response in the current issue or PR queue.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-16

> Source data: issue/PR metadata supplied for the CoPaw project; link URLs resolve to `agentscope-ai/QwenPaw` as provided.

## 1. Today's Overview

The project saw a busy 24-hour window: **10 issues updated** (9 open, 1 closed) and **11 PRs updated** (all open, 0 merged/closed), with **no new releases**. Inbound activity is healthy, especially from first-time contributors, but the 0% merge rate and 11-open-PR queue suggest a maintainer review/merge bottleneck. The day’s issue load is concentrated around **video handling, Console UI regressions, cron CLI behavior, and remote MCP/OAuth2 reliability**. Overall project health is active but strained on throughput.

## 2. Releases

**No new releases were published in the last 24 hours.** No release notes, migration guides, or breaking-change announcements are available for this window.

## 3. Project Progress

- **Merged/closed PRs today: none.** All 11 PRs remain open.
- **One issue was closed:** [#6476 — Matrix 端到端加密不可用](https://github.com/agentscope-ai/QwenPaw/issues/6476), closed with a community workaround (`libolm-dev` + `matrix-nio[e2e]` / `vodozemac`).

Notable open PRs advancing features/fixes (all still awaiting merge):

| PR | Area |
|---|---|
| [#7061 fix(video): deliver tool-result videos on OpenAI Responses API](https://github.com/agentscope-ai/QwenPaw/pull/7061) | Fixes silent video-context loss |
| [#7055 fix(cli): sync top-level text on agent cron --text update](https://github.com/agentscope-ai/QwenPaw/pull/7055) | Fixes #7048 cron update no-op |
| [#7057 fix(shell): add user-local bin dirs to subprocess PATH](https://github.com/agentscope-ai/QwenPaw/pull/7057) | Fixes stripped-PATH issues in systemd/Docker |
| [#7049 feat(chats): add limit/before pagination to GET /chats/{chat_id}](https://github.com/agentscope-ai/QwenPaw/pull/7049) | Enables incremental history loading |
| [#7050 feat(console): add per-cron-job model override picker](https://github.com/agentscope-ai/QwenPaw/pull/7050) | Per-cron model selection |
| [#7054 feat(chrome): support remote bridge endpoint for LAN/network browsers](https://github.com/agentscope-ai/QwenPaw/pull/7054) | Remote browser support |
| [#7001 feat(matrix): isolate session and memory per sender in group rooms](https://github.com/agentscope-ai/QwenPaw/pull/7001) | Multi-user Matrix isolation |
| [#7033 feat(skill-system): dynamic skill loading + auto-unload](https://github.com/agentscope-ai/QwenPaw/pull/7033) | Runtime skill lifecycle |
| [#6302 feat: unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302) | Large provider/model unification |
| [#6940 feat(pawapp): add native DataPaw app runtime and durable analysis workspace](https://github.com/agentscope-ai/QwenPaw/pull/6940) | Native app runtime, flagged ready-for-human-review |
| [#6623 fix(acp): prevent final text loss when notifications race the prompt response](https://github.com/agentscope-ai/QwenPaw/pull/6623) | ACP transport race fix, under review |

## 4. Community Hot Topics

The two issues with the most comments are both long-running user concerns:

- **[#6476 — Matrix 端到端加密不可用](https://github.com/agentscope-ai/QwenPaw/issues/6476)** — *3 comments, closed*  
  Users need functional Matrix end-to-end encryption. The issue was worked around by manually installing `libolm` and the `matrix-nio[e2e]` extra, but no code fix is visible. The underlying need is better packaging/documentation for Matrix E2EE dependencies.

- **[#3915 — Introduce virtual scrolling for Console WebUI](https://github.com/agentscope-ai/QwenPaw/issues/3915)** — *3 comments, 1 👍*  
  This is the only issue with a reaction in the dataset. Users are hitting severe lag when conversations grow long because the Console renders all messages in the DOM. The underlying need is obvious: scalability of the WebUI for real-world long-session usage.

On the PR side, comment counts were not recorded in the supplied data, but **[#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)** is flagged `ready-for-human-review` and **[#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)** is marked `Under Review`, indicating maintainer attention is already partially engaged.

## 5. Bugs & Stability

Bugs updated in the last 24h, roughly ranked by severity:

| Severity | Issue | Summary | Fix PR |
|---|---|---|---|
| **High** | [#7053 OAuth2 refresh never renews refresh_token](https://github.com/agentscope-ai/QwenPaw/issues/7053) | Rotating refresh tokens are not persisted; remote MCP OAuth2 degrades permanently to manual re-auth (e.g. XMind MCP). No proactive renewal. | None yet |
| **High / Medium** | [#7059 view_video tool-result videos silently dropped](https://github.com/agentscope-ai/QwenPaw/issues/7059) | `view_video` reports success but the model never receives frames on OpenAI Responses API / Volcengine Ark. Silent failure. | [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) |
| **Medium** | [#7060 view_video inline-media cap hardcoded to 2 MB](https://github.com/agentscope-ai/QwenPaw/issues/7060) | Provider `max_inline_media_bytes` setting is ignored on the video path. User proposes configurable image/video size limits + Files API. | None yet |
| **Medium** | [#7051 Image attachments lost on session reload](https://github.com/agentscope-ai/QwenPaw/issues/7051) | Console chat images render initially but break after reload; backend serves data URL but frontend shows broken thumbnail. | None yet |
| **Medium** | [#7048 qwenpaw cron update --text returns success but prompt not updated](https://github.com/agentscope-ai/QwenPaw/issues/7048) | Agent-type cron jobs silently ignore `--text` updates even though CLI returns rc=0. | [#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055) |
| **Closed / Workaround** | [#6476 Matrix E2EE unavailable](https://github.com/agentscope-ai/QwenPaw/issues/6476) | Closed after user-level workaround: install `libolm-dev` and `matrix-nio[e2e]` + `vodozemac`. | None listed |

No crashes or security CVEs were reported in this window.

## 6. Feature Requests & Roadmap Signals

User-requested features from the last 24h:

- **Restore native context strategy option in Console WebUI** — [#7058](https://github.com/agentscope-ai/QwenPaw/issues/7058)  
  v2.1.0 removed the selector, locking users into `scroll`; backend still supports `native`. Users report the scroll prompt is too heavy.

- **Background task callback / notification mechanism** — [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056)  
  `submit_to_agent` only supports polling via `check_agent_task`; users want an automatic completion callback/notification.

- **Plugin API `system_prompt` permission** — [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052)  
  Enterprise plugin users want to inject company prompts without exposing them in the QwenPaw conversation UI.

- **Virtual scrolling / paginated rendering for Console WebUI** — [#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915)  
  Long-standing performance request, still open.

- **Configurable image/video inline limits + Files API** — [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060)  
  Requested as part of the video 2 MB cap bug.

Roadmap signals from open PRs: provider/model discovery unification ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)), dynamic skill lifecycle ([#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033)), native DataPaw app runtime ([#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)), Matrix per-sender session isolation ([#7001](https://github.com/agentscope-ai/QwenPaw/pull/7001)), and chat pagination ([#7049](https://github.com/agentscope-ai/QwenPaw/pull/7049)).

Likely next-version candidates: **video fix #7061**, **cron fix #7055**, **chat pagination #7049**, and **per-cron model override #7050** — all are small, targeted, and currently active.

## 7. User Feedback Summary

Real pain points visible in this dataset:

- **Silent failures erode trust:** video attachments succeed in UI but never reach the model ([#7059](https://github.com/agentscope-ai/QwenPaw/issues/7059)); cron updates report success but do nothing ([#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048)).
- **v2.1.0 regressions:** users report the native context strategy selector was removed ([#7058](https://github.com/agentscope-ai/QwenPaw/issues/7058)) and image history breaks after session reload ([#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)).
- **MCP OAuth2 is painful:** users with rotating refresh tokens are forced into manual re-authentication loops ([#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053)).
- **Enterprise/plugin users need isolation:** the system prompt should be protected from end-user visibility ([#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052)).
- **Matrix users want proper E2EE:** the workaround exists but the default install does not work ([#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476)).
- **Long conversations are not usable in Console WebUI:** users request virtual scrolling rather than full DOM rendering ([#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915)).

Overall sentiment: users are actively testing 2.1.0 and contributing fixes, but there is clear dissatisfaction with silent failures and the lack of maintainer-side merge throughput.

## 8. Backlog Watch

Items needing maintainer attention:

- **[#3915 — Virtual scrolling for Console WebUI](https://github.com/agentscope-ai/QwenPaw/issues/3915)**  
  Open since **2026-04-28** (~3.5 months), 3 comments, 1 👍. This is the longest-standing open issue in the current dataset and has no linked PR.

- **[#6302 — Unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302)**  
  Open since **2026-07-21**, large cross-cutting PR with no merge activity. Needs maintainer review or explicit next steps.

- **[#6623 — ACP final-text-loss race fix](https://github.com/agentscope-ai/QwenPaw/pull/6623)**  
  Open since **2026-08-01**, marked `Under Review`, but still not merged after two weeks.

- **[#6940 — Native DataPaw app runtime](https://github.com/agentscope-ai/QwenPaw/pull/6940)**  
  Open since **2026-08-12**, flagged `ready-for-human-review`. This is a significant feature PR and should be prioritized for review before it grows stale.

- **[#7048 — Cron update no-op bug](https://github.com/agentscope-ai/QwenPaw/issues/7048)**  
  A confirmed CLI bug with a ready fix PR ([#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055)); it should be merged promptly to avoid further user confusion.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-16

## 1. Today's Overview

ZeroClaw remains highly active but is in an RFC-heavy consolidation phase. In the last 24 hours, 50 issues and 50 PRs were updated, with 4 issues and 6 PRs closed/merged; no new releases shipped. The most visible theme is architecture and security design work: OpenAI-compatible chat completions, runtime-owned sessions, unified attachments, SOP permissions, and memory ownership. A large stacked Anthropic refusal/fallback PR series appears to have completed, while maintainer review remains a bottleneck across several older RFCs. Overall project health is stable but heavily dependent on maintainer decision throughput.

## 2. Releases

No new releases were published in the last 24 hours. No changelog, breaking-change, or migration notes to report.

## 3. Project Progress

The major closed/merged PR activity centers on the **Anthropic refusal/fallback stack**:

- [zeroclaw-labs/zeroclaw#9262](https://github.com/zeroclaw-labs/zeroclaw/pull/9262) — Surface native Anthropic refusals as typed errors.
- [zeroclaw-labs/zeroclaw#9263](https://github.com/zeroclaw-labs/zeroclaw/pull/9263) — Route refusals through client-side fallback entries.
- [zeroclaw-labs/zeroclaw#9265](https://github.com/zeroclaw-labs/zeroclaw/pull/9265) — Add opt-in Anthropic server-side fallback requests.
- [zeroclaw-labs/zeroclaw#9266](https://github.com/zeroclaw-labs/zeroclaw/pull/9266) — Detect Anthropic server-side fallback responses.
- [zeroclaw-labs/zeroclaw#9268](https://github.com/zeroclaw-labs/zeroclaw/pull/9268) — Surface safeguard fallback notices in channels.

Together, these close a significant reliability gap for Anthropic users, converting refusals into typed, routable errors and making fallback behavior observable.

Also visible today:

- [zeroclaw-labs/zeroclaw#4760](https://github.com/zeroclaw-labs/zeroclaw/issues/4760) closed as duplicate — schema-validated tool calls for memory consolidation.
- [zeroclaw-labs/zeroclaw#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) closed — macOS desktop app blank/no-window bug.

Active PRs with notable progress include [zeroclaw-labs/zeroclaw#9995](https://github.com/zeroclaw-labs/zeroclaw/pull/9995) (webhook audit secret scrubbing), [zeroclaw-labs/zeroclaw#10012](https://github.com/zeroclaw-labs/zeroclaw/pull/10012) (OAuth callback/refresh contract enforcement), [zeroclaw-labs/zeroclaw#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) (keep agent turns alive after viewer disconnect), and [zeroclaw-labs/zeroclaw#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) / [zeroclaw-labs/zeroclaw#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) (per-agent memory and session ownership scoping).

## 4. Community Hot Topics

The most active issues are architecture RFCs and process trackers, indicating a community focused on design review and interoperability:

- [zeroclaw-labs/zeroclaw#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — RFC: ZeroClaw Chat Completions profile. **20 comments.** Users want OpenAI-protocol clients such as Open WebUI, LobeChat, Continue.dev, and Aider to work directly with ZeroClaw.
- [zeroclaw-labs/zeroclaw#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — RFC: Runtime-owned conversation sessions and transport surface adapters. **16 comments.** Focus on durable session ownership and adapting multiple transport surfaces.
- [zeroclaw-labs/zeroclaw#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — RFC: Unified attachment architecture for web chat and channels. **15 comments.** Addresses cross-channel attachment handling and security boundaries.
- [zeroclaw-labs/zeroclaw#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue for RFCs and design issues. **13 comments.** A process tracker showing maintainer review is a known bottleneck.
- [zeroclaw-labs/zeroclaw#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) — RFC: Provenance, conversation binding, and reply contract for internally initiated agent turns. **12 comments.**
- [zeroclaw-labs/zeroclaw#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) — RFC: Security posture, credential boundaries, and universal ingress policy. **12 comments.**
- [zeroclaw-labs/zeroclaw#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — RFC: Separate authoritative memory storage from optional enrichment connectors. **12 comments.**

Underlying need: users and contributors are pushing for ecosystem compatibility, clearer runtime/session ownership, stronger security boundaries, and a more transparent maintainer review process.

## 5. Bugs & Stability

Ranked by severity:

- [zeroclaw-labs/zeroclaw#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — **P1, accepted.** `cron` custom-shell test hits `ETXTBSY` under the parallel runtime gate, causing unrelated PR failures. This is a CI stability bug with no visible fix PR yet.
- [zeroclaw-labs/zeroclaw#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527) — **P1, now closed.** macOS desktop app could reopen blank or without a window. Closed in the last 24h.
- [zeroclaw-labs/zeroclaw#10012](https://github.com/zeroclaw-labs/zeroclaw/pull/10012) — **P1, open fix.** Enforces OAuth callback and refresh contracts, closing PKCE state-validation bypasses.
- [zeroclaw-labs/zeroclaw#9995](https://github.com/zeroclaw-labs/zeroclaw/pull/9995) — **P1, open fix.** Hardens webhook audit exports by scrubbing credentials and provider-token patterns.
- [zeroclaw-labs/zeroclaw#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — **P1, open fix.** Prevents agent turns from being cancelled when a dashboard viewer disconnects.
- [zeroclaw-labs/zeroclaw#7870](https://github.com/zeroclaw-labs/zeroclaw/issues/7870) — **P2, accepted tracker.** Agent runtime options can leak from the first configured provider instead of the selected provider.
- [zeroclaw-labs/zeroclaw#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) — **P2.** Outbound leak detector false-positives on public blockchain addresses, breaking payment-request URLs.
- [zeroclaw-labs/zeroclaw#9954](https://github.com/zeroclaw-labs/zeroclaw/pull/9954) — SOP double-encoded step-output bug fix.
- [zeroclaw-labs/zeroclaw#9957](https://github.com/zeroclaw-labs/zeroclaw/pull/9957) — SOP failed-run reason now recorded instead of discarded.

Security-related ownership fixes also remain open: [zeroclaw-labs/zeroclaw#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) and [zeroclaw-labs/zeroclaw#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) add per-agent scoping to knowledge-graph and session tools.

## 6. Feature Requests & Roadmap Signals

The roadmap is currently driven by RFCs rather than releases. Likely next-version candidates include:

- [zeroclaw-labs/zeroclaw#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — SOP capability permission contract, explicitly targeting **v0.9.0**.
- [zeroclaw-labs/zeroclaw#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — OpenAI Chat Completions profile, which would be a major adoption driver.
- [zeroclaw-labs/zeroclaw#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) and [zeroclaw-labs/zeroclaw#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Runtime-owned sessions and unified attachments.
- [zeroclaw-labs/zeroclaw#9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810) — Agent Plugins 1.0 skill and MCP package loading.
- [zeroclaw-labs/zeroclaw#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — Separation of authoritative memory storage from enrichment connectors.
- [zeroclaw-labs/zeroclaw#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) — Realtime speech-to-speech channel for Gemini Live.
- [zeroclaw-labs/zeroclaw#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — Computer-use desktop screen interaction and input control.

Already-accepted feature trackers likely to land soon include [zeroclaw-labs/zeroclaw#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) (CI caching), [zeroclaw-labs/zeroclaw#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130) (workspace-wide `forbid(unsafe_code)`), [zeroclaw-labs/zeroclaw#7762](https://github.com/zeroclaw-labs/zeroclaw/issues/7762) (cron docs and per-cron model selection), [zeroclaw-labs/zeroclaw#7790](https://github.com/zeroclaw-labs/zeroclaw/issues/7790) (zerocode parity with web dashboard), and [zeroclaw-labs/zeroclaw#7849](https://github.com/zeroclaw-labs/zeroclaw/issues/7849) (Discord mention-triggered threads).

## 7. User Feedback Summary

Real user pain points visible in the data:

- **OpenAI ecosystem compatibility** is the largest unmet need: [zeroclaw-labs/zeroclaw#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603).
- **Cron is underdocumented and inflexible** — users want docs and the ability to run cron jobs with a specific cheap model ([zeroclaw-labs/zeroclaw#7762](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)).
- **Channel UX gaps** — Discord mention-triggered threads ([zeroclaw-labs/zeroclaw#7849](https://github.com/zeroclaw-labs/zeroclaw/issues/7849)) and WeCom proactive messaging/media sending ([zeroclaw-labs/zeroclaw#7824](https://github.com/zeroclaw-labs/zeroclaw/issues/7824)).
- **Windows shell ergonomics** — users want PowerShell/Git Bash vs `cmd.exe` configurable ([zeroclaw-labs/zeroclaw#7089](https://github.com/zeroclaw-labs/zeroclaw/issues/7089)).
- **Security false positives** — public blockchain addresses redacted in payment URLs ([zeroclaw-labs/zeroclaw#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)).
- **Developer workflow frustration** — contributors want AI-assisted PR review ([zeroclaw-labs/zeroclaw#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)) and automated PR size/risk label recalculation ([zeroclaw-labs/zeroclaw#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345)).
- **macOS desktop reliability** — the blank/no-window report ([zeroclaw-labs/zeroclaw#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)) is now closed, which should improve user confidence.

## 8. Backlog Watch

Items needing maintainer attention or stuck in long-running review:

- [zeroclaw-labs/zeroclaw#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — The maintainer decision queue itself is active, indicating unresolved RFC stack.
- [zeroclaw-labs/zeroclaw#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — High-comment RFC still `needs-maintainer-review`.
- [zeroclaw-labs/zeroclaw#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) and [zeroclaw-labs/zeroclaw#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Core session/attachment RFCs waiting on maintainer decisions.
- [zeroclaw-labs/zeroclaw#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) — Open since May; critical for internally initiated agent turns.
- [zeroclaw-labs/zeroclaw#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) — Open since May; central security posture/credential-boundary RFC.
- [zeroclaw-labs/zeroclaw#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) — Long-running memory storage architecture RFC.
- [zeroclaw-labs/zeroclaw#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — Computer-use desktop RFC from May, still open.
- [zeroclaw-labs/zeroclaw#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) — Staged opt-in telemetry RFC, `needs-maintainer-review`.
- [zeroclaw-labs/zeroclaw#9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810) — Agent Plugins 1.0 package loading, awaiting author action but important for ecosystem growth.
- [zeroclaw-labs/zeroclaw#9954](https://github.com/zeroclaw-labs/zeroclaw/pull/9954) — Small SOP fix marked `needs-maintainer-review`.
- [zeroclaw-labs/zeroclaw#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137) — Shared egress policy foundation, still blocked on dependency #9580 and author action.

The volume of `needs-maintainer-review` RFCs, some open for nearly three months, is the clearest risk to ZeroClaw's near-term roadmap.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*