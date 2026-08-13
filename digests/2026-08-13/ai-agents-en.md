# OpenClaw Ecosystem Digest 2026-08-13

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-13 09:48 UTC

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

# OpenClaw Project Digest — 2026-08-13

## 1. Today's Overview

OpenClaw is in a very high-activity cycle: 500 issues and 500 PRs were updated in the last 24 hours, with 135 issues closed and 215 PRs merged/closed. No new release was published, so all progress is happening on `main` rather than in a user-facing build. The issue stream remains dominated by reliability concerns — silent reply failures, subagent completion loss, cron/auth stalls, and multi-agent state corruption — while the PR stream shows active maintainer and community fixes landing across onboarding, cron, UI, plugin SDK, and performance areas. Overall project health is mixed: contribution volume is strong, but recurring message-delivery and session-state bugs are generating sustained user frustration.

## 2. Releases

No new releases were published in the last 24 hours. There are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress

Of the 500 updated PRs, 215 are now closed/merged. Notable closed PRs visible in the top-30 set:

- [PR #123106 — fix(onboard): import applies after runtime state initialization](https://github.com/openclaw/openclaw/pull/123106)  
  Fixes onboarding imports (Codex/Claude/Hermes) exiting prematurely after migration preview because runtime SQLite bookkeeping was not initialized yet.

- [PR #123048 — fix(cron): use plain-text envelope to avoid DeepSeek bracket-grammar deprioritization](https://github.com/openclaw/openclaw/pull/123048)  
  Companion to #122035; changes cron message framing so DeepSeek does not deprioritize `[cron:...]`-prefixed requests.

- [PR #123099 — improve: speed up prepared reply media tests](https://github.com/openclaw/openclaw/pull/123099)  
  Reduces avoidable recovery/policy/plugin graph loads in the prepared-reply media test suite, improving CI speed and memory usage.

- [PR #123100 — ci: refresh compact shard packing hints from current main runtimes](https://github.com/openclaw/openclaw/pull/123100)  
  Updates CI shard hints to match current test runtime distribution.

- [PR #123091 — docs(gateway): document portal tool gating and tighten its description](https://github.com/openclaw/openclaw/pull/123091)  
  Clarifies that the portal tool is governed by ordinary tool policy and documents how operators can control it.

- [PR #123095 — chore(plugins): align install ownership fixtures](https://github.com/openclaw/openclaw/pull/123095)  
  Aligns plugin install/index test fixtures with the authoritative install-ownership ledger now used on `main`.

## 4. Community Hot Topics

The most active issues by comment count show a clear focus on reliability, memory security, and observability:

- [Issue #121058 — Silent reply failures still recurring after #116277 closed — no queued reply payload](https://github.com/openclaw/openclaw/issues/121058)  
  92 comments. This is the single hottest issue. Users are still seeing silent reply drops even after a previous fix was closed. Underlying need: durable, observable end-to-end message delivery.

- [Issue #7707 — Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)  
  45 comments. Long-running proposal to tag memory by origin (user commands, web scrapes, third-party skills) to prevent memory poisoning. Strong signal for security-minded memory architecture.

- [Issue #77598 — Track live dev agent behavior and trajectory](https://github.com/openclaw/openclaw/issues/77598)  
  23 comments. Maintainer/observability issue tracking a 24-hour watch of a dev agent. Community interest in deeper agent-behavior telemetry.

- [Issue #121953 — Cron agent turns stall on DeepSeek — `[cron:...]` prefix is deprioritized](https://github.com/openclaw/openclaw/issues/121953)  
  16 comments. Provider-specific cron scheduling bug with clear reproductions and two fix PRs (#122035, #123048).

- [Issue #43367 — Multi-agent orchestration is unstable: concurrent agents add/config overwrites, session-lock failures, detached child work](https://github.com/openclaw/openclaw/issues/43367)  
  13 comments. P1 issue reflecting real user pain with parallel agent workflows.

Most-reacted issue in the visible set is [Issue #91363 — Isolated cron consistently fails with “LLM request failed” on model-call-started phase](https://github.com/openclaw/openclaw/issues/91363) with 6 👍, indicating broad cron reliability dissatisfaction.

## 5. Bugs & Stability

No P0 issues were updated in this window, but the P1 cluster is large and largely delivery/session-state centered.

- **Silent reply failures / message loss**  
  [Issue #121058](https://github.com/openclaw/openclaw/issues/121058) remains the most severe user-facing bug: replies silently never enter the queue even after #116277 was closed.

- **Multi-agent and subagent state corruption**  
  [Issue #43367](https://github.com/openclaw/openclaw/issues/43367) — concurrent config overwrites, session-lock failures, detached child work.  
  [Issue #92433](https://github.com/openclaw/openclaw/issues/92433) — subagent completion silently dropped when announce is steered into a requester run that ends early.  
  [Issue #67777](https://github.com/openclaw/openclaw/issues/67777) — subagent completion lost on direct-announce timeout, drain, or orphan prune.  
  [Issue #47975](https://github.com/openclaw/openclaw/issues/47975) — subagent sessions persist after completion and main session becomes unresponsive.

- **Cron / auth reliability**  
  [Issue #91363](https://github.com/openclaw/openclaw/issues/91363) — isolated cron jobs consistently fail before provider usage.  
  [Issue #89278](https://github.com/openclaw/openclaw/issues/89278) — Codex OAuth refresh succeeds but cron/heartbeat fail due to a 10s auth refresh timeout.  
  [Issue #121953](https://github.com/openclaw/openclaw/issues/121953) — DeepSeek deprioritizes `[cron:...]` user messages; fix PRs exist: [#122035](https://github.com/openclaw/openclaw/pull/122035) and [#123048](https://github.com/openclaw/openclaw/pull/123048).

- **Channel / delivery regressions**  
  [Issue #97983](https://github.com/openclaw/openclaw/issues/97983) — iOS/WebChat messages append to transcript but do not trigger assistant replies.  
  [Issue #41165](https://github.com/openclaw/openclaw/issues/41165) — Telegram DMs still route into `agent:main:main` after prior fix.  
  [Issue #121605](https://github.com/openclaw/openclaw/issues/121605) — closed P1: model fallback from claude-cli produces a reply but never delivers it to the channel.

- **Stability / resource issues**  
  [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — unreaped hook/tool child processes cause zombie accumulation.  
  [Issue #43374](https://github.com/openclaw/openclaw/issues/43374) — all LLM API calls time out simultaneously under multi-agent concurrency.  
  [Issue #72015](https://github.com/openclaw/openclaw/issues/72015) — active-memory plugin blocks replies and QMD boot overloads gateways.  
  [Issue #78493](https://github.com/openclaw/openclaw/issues/78493) — `sudo openclaw update` causes mixed ownership and doctor config overwrites.

## 6. Feature Requests & Roadmap Signals

Active feature requests suggest users are pushing for better memory security, configuration flexibility, cost visibility, and mobile access:

- [Issue #7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)  
  Strong candidate for future security work; now flagged for product and security review.

- [Issue #16555 — TTL/Expiry for Delivery Queue Messages](https://github.com/openclaw/openclaw/issues/16555)  
  Aligns with current delivery-reliability work; plausible near-term addition to prevent stale queued messages flooding channels after restart.

- [Issue #45508 — Self-hosted STT/TTS provider support in webchat](https://github.com/openclaw/openclaw/issues/45508)  
  Users want webchat voice to respect gateway-configured TTS/STT providers rather than browser Web Speech APIs.

- [Issue #9016 — Expose OpenRouter usage cost to agent runtime](https://github.com/openclaw/openclaw/issues/9016)  
  Cost tracking is a recurring theme for autonomous/agent-heavy users.

- [Issue #45771 — Built-in pace-aware rate limiting](https://github.com/openclaw/openclaw/issues/45771)  
  Autonomous agents can burn through provider rate limits; users want built-in consumption pacing.

- [Issue #45758 — Support YAML as config file format](https://github.com/openclaw/openclaw/issues/45758)  
  Lower priority but still popular; likely blocked on maintaining JSON5 compatibility.

- [Issue #99583 — Intelligent Session Auto-Titling](https://github.com/openclaw/openclaw/issues/99583)  
  P3 quality-of-life proposal; reuses existing LLM slug generator.

- [Issue #46058 — Chat-first Android surface for OpenClaw](https://github.com/openclaw/openclaw/issues/46058)  
  Discussion-oriented; not necessarily destined for upstream, but signals mobile demand.

Prediction: the DeepSeek cron fix is likely to ship soon because two PRs already exist. Delivery-queue TTL and subagent completion isolation are also likely roadmap priorities given the number of related P1 bugs.

## 7. User Feedback Summary

Users are enthusiastic about OpenClaw’s extensibility and feature direction, but they are visibly frustrated by recurring reliability gaps:

- **Message delivery is the biggest pain point.** The 92-comment #121058 thread shows that users do not trust replies to arrive consistently, even after maintainers believe issues are fixed.
- **Multi-agent orchestration feels unstable in practice.** Parallel coding batches, subagent spawning, and session-lock behavior are cited as unreliable by multiple users.
- **Cron automation is fragile.** Isolated cron failures and provider-specific stall behavior are hurting real automation workflows.
- **Memory management behavior is inconsistent.** One user described it as “chaos,” with different installations embedding/chunking into different stores.
- **UX friction remains.** TUI scroll-jump (#44130) and unclear session sorting (#51028) continue to draw complaints.

On the positive side, community members are still investing time in detailed field reports — browser-automation improvement lists, provider-specific repros, and feature proposals — which indicates a committed and technically engaged user base.

## 8. Backlog Watch

Several important items have been waiting a long time for maintainer/product decisions or author follow-up:

- [Issue #7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)  
  Open since Feb 3; 45 comments; still needs maintainer, product, and security review.

- [Issue #43367 — Multi-agent orchestration is unstable](https://github.com/openclaw/openclaw/issues/43367)  
  P1 open since Mar 11; no-new-fix-pr but linked PR open; needs maintainer/product attention.

- [Issue #41165 — Telegram DMs can still land in agent:main:main](https://github.com/openclaw/openclaw/issues/41165)  
  P1 open since Mar 9; needs maintainer review, product decision, and live repro; linked PR open.

- [Issue #72015 — Reliability: active-memory blocks replies and QMD boot can overload gateways](https://github.com/openclaw/openclaw/issues/72015)  
  P1 open since Apr 26; needs maintainer review and product decision.

- [Issue #77700 — Tracking: Prepared runtime resolution migration](https://github.com/openclaw/openclaw/issues/77700)  
  Maintainer tracking issue open since May 5; needs maintainer review and source repro.

- [PR #110561 — fix(sqlite): normalize BLOB/TEXT type mismatches during STRICT migration](https://github.com/openclaw/openclaw/pull/110561)  
  P0 PR open since Jul 18 but labeled `status: ⏳ waiting on author`; this is a high-impact migration fix that needs author response or maintainer takeover to unblock.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-13

## 1. Ecosystem Overview

The open-source personal AI assistant landscape is characterized by extreme activity (7 of 12 tracked projects saw 10+ updated issues/PRs in 24h) but a persistent gap between feature velocity and production reliability. The dominant cross-cutting pain point is **silent message/delivery loss** — users across OpenClaw, Hermes, IronClaw, CoPaw, and NanoClaw report replies that never arrive, sessions that stall, or jobs that fail without diagnostics. A second major theme is **security hardening**: sandbox escapes, credential leakage, memory poisoning, and policy-enforcement holes are being actively patched in NanoBot, ZeroClaw, NanoClaw, and CoPaw. Projects cluster into three tiers: full-platform generalists (OpenClaw, Hermes, ZeroClaw, CoPaw), focused specialists (NanoBot, IronClaw, NanoClaw, LobsterAI), and niche/low-activity tools (PicoClaw, Moltis, NullClaw, ZeptoClaw). Notably, only IronClaw and CoPaw shipped releases in this window, meaning most user-visible fixes are still unreleased on `main`.

---

## 2. Activity Comparison

| Project | Issues Updated (closed) | PRs Updated (merged/closed) | Release Status | Health Score | Notes |
|---|---|---|---|---|---|
| OpenClaw | 500 (135) | 500 (215) | None | 7/10 | Highest volume by far; recurring delivery/session-state bugs offset strong contributor throughput |
| Hermes Agent | 50 (7) | 50 (14) | None | 7/10 | High fix throughput; Windows gateway regressions and `hermes update` trust issues |
| ZeroClaw | 50 (9) | 50 (6) | None | 7/10 | RFC-driven security work is deep but bottlenecked on maintainer review |
| CoPaw (QwenPaw) | 39 (16) | 50 (24) | v2.1.0-beta.4 | 7/10 | Shipping betas rapidly; 2.0.x stability complaints remain open |
| IronClaw | 37 (12) | 50 (20) | v1.2.0-rc.2, rc.3 | 8/10 | Disciplined RC process; Telegram bug-bash cluster is the main risk |
| NanoBot | 10 (5) | 34 (16) | None | 8/10 | Fast security-fix turnaround (sandbox bypass, Jina leak); healthy but small |
| LobsterAI | 1 (0) | 12 (7) | None | 6/10 | Shipping UI consolidation; 4-month-old test/reliability PRs still stale |
| NanoClaw | 4 (0) | 9 (3) | None | 7/10 | Focused, well-scoped fixes; template/plugin system advancing |
| PicoClaw | 3 (0) | 3 (0) | None | 5/10 | No merges this window; two high-impact bugs marked `[stale]` |
| Moltis | 0 | 1 (0) | None | 5/10 | Single pending build-fix PR; otherwise dormant |
| NullClaw | 0 | 0 | None | N/A | No activity in 24h |
| ZeptoClaw | 0 | 0 | None | N/A | No activity in 24h |

*Health score is a qualitative composite of contribution velocity, fix responsiveness, release discipline, user sentiment, and backlog risk.*

---

## 3. OpenClaw's Position

OpenClaw is the clear reference implementation and community hub of the ecosystem, with issue/PR volumes an order of magnitude above the next tier (500 vs. ~50). Its advantages are structural: the largest contributor base, the broadest channel/plugin SDK surface, and de-facto protocol influence — evidenced by other projects aligning their own features with OpenClaw's behavior (LobsterAI's "enterprise edition" touches OpenClaw internals; Moltis's only PR fixes a `gogcli` path change under the `openclaw` org).

**Technical approach differences:** OpenClaw is the only project with a runtime SQLite bookkeeping layer for onboarding state, a prepared-reply media test architecture, and plugin-install ownership ledgers — indicating more investment in operational infrastructure than peers. However, its scale is a double-edged sword: the 92-comment silent-reply failure thread (#121058) and the P1 multi-agent corruption issue (#43367) suggest that complexity has outpaced reliability engineering. Where NanoBot and IronClaw closed their security/delivery bugs within the same window they were reported, OpenClaw's highest-severity user-facing bugs have been open for months. **Position summary:** unmatched ecosystem gravity and extensibility, but now competing with smaller projects on the reliability that users actually feel.

---

## 4. Shared Technical Focus Areas

The following requirements are emerging independently across multiple projects — strong signals for platform builders:

1. **End-to-end message delivery observability** (OpenClaw, Hermes, IronClaw, CoPaw, NanoClaw) — Silent reply drops, undelivered cron results, split Telegram messages, and false "delivered" logs. Users demand durable, inspectable delivery guarantees.
2. **Cron/scheduled-task reliability** (OpenClaw, Hermes, NanoClaw, LobsterAI, IronClaw) — Provider-specific deprioritization (DeepSeek `[cron:]`), legacy task migration gaps, first-run results not surfacing, and stalled automation loops.
3. **Session-state integrity across compression/handoff** (CoPaw, Hermes, OpenClaw, ZeroClaw) — History disappearing after context compression, misleading "full disk" dialogs, task eviction from context windows, and orphaned session rows.
4. **Multi-agent/subagent lifecycle management** (OpenClaw, Hermes, NanoBot, CoPaw, NanoClaw) — Completion loss, session-lock failures, detached child work, per-session model overrides, and template-created agent identity bugs.
5. **Sandbox/policy enforcement** (NanoBot, ZeroClaw, OpenClaw, CoPaw) — Shell-command allowlist bypasses, `forbidden_paths` not honored under `allowed_roots`, plugin-created cron jobs without approval, and verifiable-intent credential-chain validation.
6. **Credential/privacy leakage prevention** (NanoBot, ZeroClaw, Hermes, OpenClaw) — URLs with secrets sent to third-party readers, webhook profile allowlist broadening, and memory trust-tagging proposals.
7. **Cost transparency and rate-limit pacing** (OpenClaw, ZeroClaw, CoPaw, IronClaw) — Silent $0 caps, token double-counting, OpenRouter cost exposure, per-user model preferences, and built-in consumption pacing.
8. **Windows as a first-class platform** (Hermes, ZeroClaw, IronClaw, CoPaw, OpenClaw) — Gateway killed on restart, 74 failing tests, filesystem publication semantics, AV false positives, and random startup crashes.
9. **MCP tool robustness** (PicoClaw, NanoClaw, IronClaw, NanoBot, CoPaw) — Connection-failure hangs, tool-name collisions from non-ASCII names, per-server tool disabling, validation errors blocking setup, and numeric-string coercion bugs.
10. **Voice I/O parity** (NanoBot, OpenClaw, CoPaw) — TTS/voice-output requests spanning chatbot, webchat, and MiniMax TTS provider work.

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architectural Character |
|---|---|---|---|
| **OpenClaw** | General-purpose personal AI assistant; broadest channel + plugin surface | Power users, developers, self-hosters | Monolithic core + plugin SDK; runtime SQLite state; multi-agent orchestration |
| **Hermes Agent** | Desktop-first assistant with gateway lifecycle | Desktop Windows/macOS users, enterprise pilots | Desktop app + managed messaging gateway; OAuth PKCE plugin support; kanban observers |
| **ZeroClaw** | Security/architecture-first agent platform | Security-conscious operators, Rust ecosystem | RFC-driven governance; verifiable intents; pluggable auth; ZeroCode scripting |
| **CoPaw (QwenPaw)** | Chinese-market agent with Web IDE Console | Qwen/Aliyun ecosystem users, China region | Console/Web IDE + Computer Use; China provider depth (Aliyun, Volcengine, MiniMax); Qwen-centric |
| **IronClaw** | NearAI-backed production agent | Teams needing managed deployments | Release-candidate discipline; stress-test harness; per-user model preferences; structured automation contracts |
| **NanoBot** | Lightweight, secure, multi-channel chatbot | Self-hosters, hobbyists, small teams | AgentLoop-centric; WebUI collaboration (side conversations, mentions); security-conscious |
| **NanoClaw** | CLI/ops-oriented agent fleet manager | CLI power users, automation-heavy operators | `ncl` CLI + agent templates/plugins; messaging-group wirings |
| **LobsterAI** | Renderer/UI layer over OpenClaw | End-users wanting polished desktop UI | Electron-style renderer consolidation; enterprise edition; skills/MCP unified views |
| **PicoClaw** | Lightweight embedded-capable agent | Sipeed hardware / resource-constrained users | Minimal footprint; routed agents; Telegram/Discord channels |
| **Moltis** | Sandbox build tooling | Developers building sandbox images | Tooling-only; dependency on OpenClaw org ecosystem |

The sharpest fault line is **generalist-vs-specialist**: OpenClaw, Hermes, and CoPaw compete on breadth, while NanoBot, ZeroClaw, and IronClaw differentiate on security, architecture governance, and release discipline respectively.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (shipping code, high contributor engagement):**
- **OpenClaw** — Massive but noisy; 215 PRs merged in 24h, yet P1 bugs linger for months. Velocity without reliability is the core tension.
- **IronClaw** — Most mature release discipline: two RCs in one day, bug-bash-driven QA, systematic legacy-surface removal. Small delays between bug report and fix PR (#7538 → #7563).
- **CoPaw** — Fast beta cadence (v2.1.0-beta.4) with responsive maintainers, but 2.0.x stability debt (#6780 idle freeze, #6932 network recovery) is accumulating.
- **ZeroClaw** — High idea throughput, but the RFC process is the bottleneck: the maintainer review queue (#8692) gates six p1 security RFCs, and the community has started reforming the process itself (#9496).
- **Hermes** — Healthy fix velocity (update-path bugs finally closed after months), but Windows gateway regressions remain an acute trust issue.
- **NanoBot** — Small but exceptionally healthy: security issues closed within the same window, and WebUI collaboration features signal a clear UX direction.

**Tier 2 — Steady but constrained:**
- **NanoClaw** — Focused, well-scoped work; needs more review bandwidth for open PRs (#2346, #2689).
- **LobsterAI** — Shipping UI work but a 4-month-old stale test/reliability backlog suggests understaffed review.
- **PicoClaw** — Low activity; two `[stale]` high-impact bugs and unmerged 10-day-old PRs indicate maintainer attention is the limiting factor.

**Tier 3 — Dormant/stabilizing:**
- **Moltis** — One critical build-fix PR pending; otherwise quiet.
- **NullClaw / ZeptoClaw** — No observable activity; effectively parked.

---

## 7. Trend Signals

1. **Reliability is the new feature frontier.** The highest-comment threads across the ecosystem (#121058 in OpenClaw at 92 comments, #6921 in CoPaw, #83683 in Hermes) are all about agents silently stopping, losing messages, or failing to recover. Users will tolerate missing features before they tolerate missing replies. **Action:** invest in end-to-end delivery tracing, dead-letter queues, and session-state recovery as first-class platform features.

2. **Security hardening is moving from perimeter to memory and policy.** Beyond sandbox escapes, the ecosystem is converging on memory trust-tagging (#7707 in OpenClaw), credential-chain verification for intents (ZeroClaw #9328), and plugin-power containment (CoPaw #6916). **Action:** treat memory provenance and verifiable intent as architectural requirements, not add-ons.

3. **Multi-agent orchestration is entering production — and failing there.** Session-lock failures, subagent completion loss, orphaned work, and config overwrites appear in nearly every project. The market is ready for multi-agent workflows, but the infrastructure is not. **Action:** standardize subagent session identity, completion delivery, and fault isolation.

4. **Context compression is a trust crisis.** Users in CoPaw, Hermes, and OpenClaw report history becoming invisible, titles capturing internal thinking, and "phantom" persistence errors after compaction. **Action:** compression must be user-transparent — preserve retrievability, surface what was summarized, and never fabricate storage-failure diagnostics.

5. **Provider diversity is driving fragmentation.** DeepSeek-specific cron bugs, Qwen/China-provider demand (Aliyun, Volcengine, MiniMax), OpenRouter cost exposure, and per-user model preferences all point to a multi-provider future where model-agnostic request plumbing and cost observability are table stakes.

6. **Windows support is a systemic blind spot.** Hermes gateway lifecycle, ZeroClaw's 74 Windows test failures, IronClaw's filesystem publication fixes, and CoPaw's startup crashes show CI and QA matrices still underweight Windows. **Action:** any agent platform targeting desktop users must run Windows CI gates.

7. **The "assistant" is becoming a collaborative surface.** Localization, temporary side conversations, cross-session mentions, embeddable chat pages, and session-list filters (NanoBot, CoPaw) signal a shift from single-user chat to team-embedded agent UX.

8. **Voice is the unfinished loop.** TTS requests recur (NanoBot #4010, OpenClaw #45508, CoPaw MiniMax TTS PR) with no cross-project standard — an open opportunity for a project that ships a polished, self-hosted voice experience first.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-13

## 1. Today's Overview

NanoBot had a high-velocity last 24 hours: 10 issues were updated (5 closed) and 34 PRs were updated, with 16 in the closed/merged bucket. No new release was published. The project is in a security-conscious and feature-active phase, with fixes landing for shell-command allowlist bypasses, Jina URL credential leakage, Docker privilege handling, and Gemini tool-call preservation. Simultaneously, a cluster of WebUI collaboration, localization, and side-conversation PRs shows that the frontend/user experience is a major current focus.

## 2. Releases

No new releases or tags were recorded for this digest period. There are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress

The extracted closed/merged PR set includes several important fixes:

- **Security / `exec` sandbox** — [#5345](https://github.com/HKUDS/nanobot/pull/5345) fixes the `exec.allowPatterns` shell-chain bypass from [#5306](https://github.com/HKUDS/nanobot/issues/5306).
- **Security / WebFetch privacy** — [#5258](https://github.com/HKUDS/nanobot/pull/5258) keeps credential-bearing URLs away from the remote Jina reader, addressing [#4884](https://github.com/HKUDS/nanobot/issues/4884).
- **Docker startup** — [#5320](https://github.com/HKUDS/nanobot/pull/5320) restores capabilities for privilege-drop while closing the Docker entrypoint permission failure area related to [#5295](https://github.com/HKUDS/nanobot/issues/5295).
- **WeChat channel** — [#5361](https://github.com/HKUDS/nanobot/pull/5361) persists the WeChat QR-login token to `config.json` on connect.
- **Gemini provider** — [#5230](https://github.com/HKUDS/nanobot/pull/5230) preserves imported tool calls with signature fallback.
- **Agent architecture** — [#4205](https://github.com/HKUDS/nanobot/pull/4205), mailbox-backed subagent results, was closed; merge state is not fully confirmed from the extract.

The remaining ~9 closed/merged PRs were not visible in the top-20 extract, but the overall 16-PR closed/merged count indicates sustained contributor throughput.

## 4. Community Hot Topics

- [#5327](https://github.com/HKUDS/nanobot/issues/5327) — **Nanobot repeats the same message while reasoning** (11 comments). This is the most active issue in the window. Underlying need: users want deterministic, non-repetitive reasoning output; random duplication erodes trust in the agent loop.
- [#5295](https://github.com/HKUDS/nanobot/issues/5295) — **Docker Compose deployment fails with entrypoint permission denied** (5 comments). Underlying need: first-run Docker experience must work cleanly with minimal configuration.
- [#4010](https://github.com/HKUDS/nanobot/issues/4010) — **Text-to-speech / voice output support** (3 comments, 3 👍). Underlying need: voice input already exists; voice output would complete the conversational loop, especially on voice-native channels.
- [#4858](https://github.com/HKUDS/nanobot/issues/4858) — **Refactor dynamic tool provider lifecycle out of AgentLoop** (2 comments). Underlying need: architecture cleanup so MCP/provider lifecycle logic does not leak into the core agent loop.

PR comment counts were not included in the data, but notable open PRs by scope and recency include [#5358](https://github.com/HKUDS/nanobot/pull/5358) (session collaboration via mentions), [#5364](https://github.com/HKUDS/nanobot/pull/5364) (temporary side conversations), [#5367](https://github.com/HKUDS/nanobot/pull/5367) (localize agent activity), and [#4329](https://github.com/HKUDS/nanobot/pull/4329) (native TypeScript terminal UI).

## 5. Bugs & Stability

Ranked by severity:

- **High — Security sandbox bypass**: [#5306](https://github.com/HKUDS/nanobot/issues/5306) `exec.allowPatterns` shell-chain bypass. Closed; fix PR [#5345](https://github.com/HKUDS/nanobot/pull/5345) is linked.
- **High — Privacy/credential leakage**: [#4884](https://github.com/HKUDS/nanobot/issues/4884) complete user URLs sent to Jina. Closed; fix PR [#5258](https://github.com/HKUDS/nanobot/pull/5258) landed.
- **High — Deployment blocker**: [#5295](https://github.com/HKUDS/nanobot/issues/5295) Docker Compose `entrypoint.sh: Permission denied`. Closed; Docker privilege-drop fix [#5320](https://github.com/HKUDS/nanobot/pull/5320) landed in the same window.
- **Medium — Correctness/UX**: [#5327](https://github.com/HKUDS/nanobot/issues/5327) repeated messages while reasoning. Closed, but no visible fix PR was present in the extracted data.
- **Medium — WebUI state bug**: [#5368](https://github.com/HKUDS/nanobot/issues/5368) copy/fork actions appear while an Agent turn is still running. Open; fix PR [#5371](https://github.com/HKUDS/nanobot/pull/5371) is open.
- **Medium — MCP tool collision**: [#5360](https://github.com/HKUDS/nanobot/pull/5360) non-ASCII MCP tool names can collapse to `_` and collide. Open fix PR.
- **Medium — Memory/lifecycle**: [#5370](https://github.com/HKUDS/nanobot/pull/5370) unbounded per-session file state lifecycle. Open fix PR.
- **Medium — Plugin cache security/regression**: [#5369](https://github.com/HKUDS/nanobot/pull/5369) cached plugin skill roots not revalidated after package changes. Open fix PR.
- **Low — Test reliability**: [#5349](https://github.com/HKUDS/nanobot/pull/5349) timezone-sensitive settings tests. Open fix PR.

## 6. Feature Requests & Roadmap Signals

- **Voice output / TTS** — [#4010](https://github.com/HKUDS/nanobot/issues/4010) remains a liked, open feature request with no implementation yet.
- **QwenCloud provider path** — [#5350](https://github.com/HKUDS/nanobot/issues/5350) proposes a backward-compatible QwenCloud option alongside existing DashScope support. Likely a near-term provider addition.
- **WebUI localization** — [#5366](https://github.com/HKUDS/nanobot/issues/5366) requests localized Agent activity text. PR [#5367](https://github.com/HKUDS/nanobot/pull/5367) is already open, so this is a likely next-version feature.
- **Temporary side conversations** — [#5364](https://github.com/HKUDS/nanobot/pull/5364) adds `/side` conversations beside the current WebUI topic. Active PR, likely candidate for the next release.
- **Session collaboration via mentions** — [#5358](https://github.com/HKUDS/nanobot/pull/5358) enables cross-session mentions in WebUI. Suggests team-oriented use is becoming a priority.
- **Matrix thread context** — [#5275](https://github.com/HKUDS/nanobot/issues/5275) asks for Matrix “reply in thread” streams to form dedicated contexts, matching Discord/Slack behavior.
- **TypeScript terminal UI** — [#4329](https://github.com/HKUDS/nanobot/pull/4329) has been open since June and could become a major client-side milestone if merged.

**Prediction:** WebUI localization ([#5367](https://github.com/HKUDS/nanobot/pull/5367)) and temporary side conversations ([#5364](https://github.com/HKUDS/nanobot/pull/5364)) are the most mature next-version candidates. QwenCloud ([#5350](https://github.com/HKUDS/nanobot/issues/5350)) may follow quickly because it builds on existing DashScope support. TTS ([#4010](https://github.com/HKUDS/nanobot/issues/4010)) is potentially larger-scope and more likely to remain on the roadmap longer.

## 7. User Feedback Summary

- **Repetitive reasoning output** ([#5327](https://github.com/HKUDS/nanobot/issues/5327)) is a concrete quality-of-output pain point that can undermine user trust.
- **Docker permission failure** ([#5295](https://github.com/HKUDS/nanobot/issues/5295)) is a real adoption blocker for self-hosters following the documented Compose path.
- **Security/privacy concerns** around `exec` allowlists ([#5306](https://github.com/HKUDS/nanobot/issues/5306)) and Jina URL forwarding ([#4884](https://github.com/HKUDS/nanobot/issues/4884)) show users are actively auditing NanoBot for sandbox/data-leakage risks. The quick fixes are a positive satisfaction signal.
- **Feature desire** is leaning toward richer conversational and collaborative interfaces: voice output ([#4010](https://github.com/HKUDS/nanobot/issues/4010)), localized WebUI ([#5366](https://github.com/HKUDS/nanobot/issues/5366)), temporary side conversations ([#5364](https://github.com/HKUDS/nanobot/pull/5364)), and session mentions ([#5358](https://github.com/HKUDS/nanobot/pull/5358)).
- **Channel parity** remains important to users, especially Matrix thread semantics ([#5275](https://github.com/HKUDS/nanobot/issues/5275)).

Overall, users are pushing NanoBot toward a polished, multilingual, multi-session assistant with strong channel parity. The community is also actively contributing security fixes, which is a healthy sign for project maintenance.

## 8. Backlog Watch

- [#4010](https://github.com/HKUDS/nanobot/issues/4010) — TTS/voice output has been open since May 26, has 3 👍 reactions, and no implementation PR. Needs a maintainer roadmap decision.
- [#4329](https://github.com/HKUDS/nanobot/pull/4329) — Native TypeScript terminal UI has been open since June 13. Large scope; needs review or explicit deferral.
- [#5204](https://github.com/HKUDS/nanobot/pull/5204) — `refactor(providers): declare Responses capabilities` is p1, open since Aug 1, and has a `conflict` label. Needs conflict resolution or maintainer guidance.
- [#5291](https://github.com/HKUDS/nanobot/pull/5291) — `fix(agent): persist subagent conversation transcripts` is open since Aug 7 with a `conflict` label. Needs rebase/merge decision.
- [#5275](https://github.com/HKUDS/nanobot/issues/5275) — Matrix reply-in-thread context is an open channel-parity request with only 1 comment and no PR yet; it may need maintainer prioritization.
- [#5350](https://github.com/HKUDS/nanobot/issues/5350) — QwenCloud provider path is fresh, open, and likely needs a maintainer response or assignment.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-13

## 1. Today's Overview

Hermes Agent saw a high-activity day: 50 issues updated (43 open/active, 7 closed) and 50 PRs updated (36 open, 14 merged/closed), with no new release published. The dominant themes were Windows gateway lifecycle regressions, session-state/compression handoff bugs, and the long-running `hermes update` npm dependency pruning problem, which now has multiple closed fixes. Substantial feature work is also moving forward, including OAuth PKCE plugin support, a unified deadline layer, computer-use provisioning, and kanban observers. Overall, the project is healthy but under pressure around desktop/gateway stability on Windows and update/install trust.

## 2. Releases

No new releases were published in this 24-hour window.

## 3. Project Progress

Closed/merged PRs visible in today’s top-PR set:

- [PR #85201](https://github.com/NousResearch/hermes-agent/pull/85201) — Direct profile-identity Pipedream MCP leases; closed.
- [PR #85186](https://github.com/NousResearch/hermes-agent/pull/85186) — `feat(computer-use)`: provision cua-driver at install time and on toolset enable; makes Computer Use a config flip instead of a manual install step.
- [PR #82402](https://github.com/NousResearch/hermes-agent/pull/82402) — `fix(update)`: install required npm workspaces atomically; prevents `hermes update` from erasing root dependencies.
- [PR #53537](https://github.com/NousResearch/hermes-agent/pull/53537) — `fix`: restore root-only deps after workspace install in `hermes update`.
- [PR #77413](https://github.com/NousResearch/hermes-agent/pull/77413) — `fix(update)`: single-pass npm install keeps root deps; `agent-browser` no longer pruned.
- [PR #44772](https://github.com/NousResearch/hermes-agent/pull/44772) — `fix(cli)`: drop `agent-browser` / `@streamdown-math` from root npm deps.

The cluster of closed update-related PRs directly addresses the repeated user complaints that `hermes update` silently breaks browser tooling ([#43564](https://github.com/NousResearch/hermes-agent/issues/43564), [#64354](https://github.com/NousResearch/hermes-agent/issues/64354)).

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- [Issue #82001](https://github.com/NousResearch/hermes-agent/issues/82001) — 15 comments  
  Agent flush does not adopt live continuation after compression; users get a misleading “full disk” dialog even though disk and DB are healthy. Underlying need is a correct session-identity handoff during compression/flush.

- [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683) — 14 comments  
  Windows desktop restart force-kills the live gateway and never relaunches it, making WeChat/QQ/Telegram go silent. This is a high-severity regression with duplicate reports.

- [Issue #43564](https://github.com/NousResearch/hermes-agent/issues/43564) — 12 comments  
  `hermes update` prunes root-only `agent-browser` even though the update reports success. This is a long-standing trust issue around the update path.

- [Issue #82887](https://github.com/NousResearch/hermes-agent/issues/82887) — 8 comments  
  `terminal` tool crashes when a command references a binary executable path, due to an embedded null character in `_read_script_in_env`.

- [Issue #68321](https://github.com/NousResearch/hermes-agent/issues/68321) — 7 comments  
  Desktop app loses rendered assistant messages when switching chats, though DB data remains intact — a client-side rendering/session-state bug.

## 5. Bugs & Stability

Ranked by severity:

- **P1 — [Issue #82001](https://github.com/NousResearch/hermes-agent/issues/82001)**: Session flush fails at compression handoff; users are told “full disk” when storage is healthy. No dedicated fix PR is visible in today’s data.
- **P1 — [Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683)**: Windows desktop restart kills the running messaging gateway and never restarts it. Duplicate: [Issue #85044](https://github.com/NousResearch/hermes-agent/issues/85044).
- **P1 — [Issue #85044](https://github.com/NousResearch/hermes-agent/issues/85044)**: Desktop `serve` startup reaps the Scheduled Task-managed gateway on Windows.
- **P1 fix in review — [PR #85129](https://github.com/NousResearch/hermes-agent/pull/85129)**: Restores pass-through of unresolved cron and react targets to adapters, fixing a message-delivery regression.
- **P2 — [Issue #85054](https://github.com/NousResearch/hermes-agent/issues/85054)**: Webhook profile admission drops `multiplex_profile_allowlist`, broadening served profiles unexpectedly; security-boundary risk.
- **P2 — [Issue #82887](https://github.com/NousResearch/hermes-agent/issues/82887)**: `terminal` tool crashes on binary executable paths.
- **P2 — [Issue #85026](https://github.com/NousResearch/hermes-agent/issues/85026)**: Firecrawl returns HTTP 402 even though Free Tool Pool shows available balance.
- **P2 — [Issue #85029](https://github.com/NousResearch/hermes-agent/issues/85029)**: macOS desktop app stuck on CONNECTING; boot loop with “web UI disabled” and dashboard-token 404.
- **P2 — [Issue #84172](https://github.com/NousResearch/hermes-agent/issues/84172)**: Webhook `platform_toolsets.webhook` key ignored; closed as fixed.
- **P2 — [Issue #74074](https://github.com/NousResearch/hermes-agent/issues/74074)**: Windows `profile alias` generates broken `.bat` wrappers.
- **P2 — [Issue #42997](https://github.com/NousResearch/hermes-agent/issues/42997)**: Email gateway IMAP polling marks Gmail unread messages as read.
- **P3 — [Issue #68321](https://github.com/NousResearch/hermes-agent/issues/68321)**: Desktop assistant messages vanish on chat switch.
- **P3 — [Issue #85028](https://github.com/NousResearch/hermes-agent/issues/85028)**: Memory provider tools silently dropped when legacy `memory` toolset isn’t enabled.
- **P3 — [Issue #85050](https://github.com/NousResearch/hermes-agent/issues/85050)**: Plugin packs allow nested secrets/capability grants in config seeds.
- **P3 — [Issue #85191](https://github.com/NousResearch/hermes-agent/issues/85191)**: Newly created sessions do not appear in the native desktop session list.
- **P3 — [Issue #85180](https://github.com/NousResearch/hermes-agent/issues/85180)**: Find bar overlaps titlebar window controls on Windows desktop.

Additional fix PRs seen today: [PR #85197](https://github.com/NousResearch/hermes-agent/pull/85197) makes Telegram CJK rich-message behavior opt-out; [PR #85196](https://github.com/NousResearch/hermes-agent/pull/85196) adds backoff/jitter to WhatsApp bridge reconnects; [PR #85146](https://github.com/NousResearch/hermes-agent/pull/85146) resets retrieval dedup after proactive prune; [PR #85199](https://github.com/NousResearch/hermes-agent/pull/85199) consolidates drifted Telegram chat-type classifiers.

## 6. Feature Requests & Roadmap Signals

Open feature requests:

- [Issue #85192](https://github.com/NousResearch/hermes-agent/issues/85192) — Support Python/Bash scripts as first-class tools in the Tool Registry for deterministic tasks.
- [Issue #85189](https://github.com/NousResearch/hermes-agent/issues/85189) — Per-session project binding: replace global `active_id` with per-tab project membership.
- [Issue #85016](https://github.com/NousResearch/hermes-agent/issues/85016) — Make SSE client disconnect detachable/configurable instead of hard-killing in-flight agent turns.
- [Issue #64099](https://github.com/NousResearch/hermes-agent/issues/64099) — Show reasoning effort level in the status bar; duplicate/needs-decision.
- [Issue #85194](https://github.com/NousResearch/hermes-agent/issues/85194) — Allow deterministic session titles while disabling optional model-backed title upgrades.
- [Issue #85030](https://github.com/NousResearch/hermes-agent/issues/85030) — Bound route-aware Discord REST rate-limit state and preserve bucket ownership.

Active PRs likely to influence the next release:

- [PR #85147](https://github.com/NousResearch/hermes-agent/pull/85147) — Unified deadline layer: bounded execution primitive + timeout resolver.
- [PR #85139](https://github.com/NousResearch/hermes-agent/pull/85139) — Declarative OAuth 2.0 PKCE support for out-of-tree provider plugins.
- [PR #85200](https://github.com/NousResearch/hermes-agent/pull/85200) — Kanban observer set for plugin workers/task edits.
- [PR #85144](https://github.com/NousResearch/hermes-agent/pull/85144) — Add interface-design UI/UX craft skill.
- [PR #62944](https://github.com/NousResearch/hermes-agent/pull/62944) — Single gateway, multiple agents; large feature rebase still open with `needs-decision`.

Prediction: near-term releases will likely include the deadline layer, OAuth PKCE plugin support, kanban observers, and the Telegram/WhatsApp stability fixes. The single-gateway multi-agent work remains the largest longer-term roadmap item.

## 7. User Feedback Summary

- **Windows gateway lifecycle is the most acute pain point.** Users report WeChat, QQ, and Telegram going completely silent after a desktop restart because the gateway is killed and not relaunched ([#83683](https://github.com/NousResearch/hermes-agent/issues/83683), [#85044](https://github.com/NousResearch/hermes-agent/issues/85044)). Duplicate reports indicate broad real-world impact.
- **`hermes update` has a trust problem.** Users repeatedly report that updates “succeed” while `agent-browser` is silently removed, breaking browser tools until a manual `npm install` ([#43564](https://github.com/NousResearch/hermes-agent/issues/43564), [#64354](https://github.com/NousResearch/hermes-agent/issues/64354)). Multiple closed PRs today target this exact issue.
- **Misleading diagnostics frustrate users.** In [#82001](https://github.com/NousResearch/hermes-agent/issues/82001), disk and DB are healthy but the agent reports a “full disk”-style persistence failure.
- **Desktop client reliability concerns continue.** Assistant messages disappear from view ([#68321](https://github.com/NousResearch/hermes-agent/issues/68321)), new sessions don’t appear in the list ([#85191](https://github.com/NousResearch/hermes-agent/issues/85191)), and UI elements overlap ([#85180](https://github.com/NousResearch/hermes-agent/issues/85180)).
- **Integration quality is a recurring theme.** Telegram CJK formatting downgrades ([#85197](https://github.com/NousResearch/hermes-agent/pull/85197)), WhatsApp reconnect loops ([#85196](https://github.com/NousResearch/hermes-agent/pull/85196)), Discord rate-limit mishandling ([#85030](https://github.com/NousResearch/hermes-agent/issues/85030)), and IMAP marking mail as read ([#42997](https://github.com/NousResearch/hermes-agent/issues/42997)) all show user demand for more robust platform adapters.
- **Positive signal:** users are actively submitting polished feature PRs and repeatable bug reports, and several long-standing update bugs were closed today.

## 8. Backlog Watch

Items that appear old, important, or in need of maintainer attention:

- [Issue #42997](https://github.com/NousResearch/hermes-agent/issues/42997) — Email gateway IMAP polling marks Gmail messages as read. Open since June 9, P2, no fix PR in today’s data.
- [Issue #60920](https://github.com/NousResearch/hermes-agent/issues/60920) — Duplicate “Operation interrupted” message after terminal recovery. Open since July 8.
- [Issue #68321](https://github.com/NousResearch/hermes-agent/issues/68321) — Desktop assistant messages vanish when switching chats. Open since July 21, 7 comments, no visible fix PR.
- [Issue #74074](https://github.com/NousResearch/hermes-agent/issues/74074) — Windows profile alias generates broken `.bat` wrappers. Open since July 29, P2.
- [Issue #64099](https://github.com/NousResearch/hermes-agent/issues/64099) — Show reasoning effort in status bar. Open since July 14, marked duplicate/needs-decision.
- [PR #55072](https://github.com/NousResearch/hermes-agent/pull/55072) — Sanitize unexpected-status auth errors; security-relevant and open since June 29.
- [PR #62944](https://github.com/NousResearch/hermes-agent/pull/62944) — Single gateway, multiple agents; large rebase open since July 12 with broad `needs-decision` and blast-radius labels.
- [PR #77431](https://github.com/NousResearch/hermes-agent/pull/77431) — Remove nonexistent `--services` / `--format` flags from Google Workspace `SKILL.md`; open since August 3.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-13

## 1. Today's Overview
PicoClaw showed light-to-moderate activity on 2026-08-13: 3 issues and 3 pull requests were updated in the last 24 hours, with no new releases and no merged/closed PRs. All open discussion items remain triage/pending-review, and no code appears to have landed today. Two older bugs have been marked `[stale]` and remain open, which suggests maintainer attention may be needed. On the positive side, feature work continues via open PRs for Exa search support, Telegram topic handling, and routed-agent context fixes. Overall, project momentum appears steady but primarily dependent on maintainer review/merge action.

## 2. Releases
No new releases were published in the last 24 hours. The latest releases section is empty, so no changelog, breaking-change, or migration notes are available for this digest.

## 3. Project Progress
No pull requests were merged or closed today. Three open PRs were updated recently and remain in review:

- [#3316 fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316) — addresses Discord routed-agent memory and auto-compaction issues.
- [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) — improves Telegram topic handling for private bot chats.
- [#3299 Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — adds Exa as a `tools.web` / `web_search` provider.

No feature or fix has been merged into the codebase during this window.

## 4. Community Hot Topics
The most active discussions are the two open bug reports, both of which have user engagement and reaction votes:

- [Issue #3281: Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  - 5 comments, 1 👍  
  - Underlying need: smooth, responsive web chat input even with longer session histories. Performance degradation is a common blocker for daily chat use.

- [Issue #3269: If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying to users](https://github.com/sipeed/picoclaw/issues/3269)  
  - 4 comments, 1 👍  
  - Underlying need: resilience against external tool/MCP failures. Users expect the agent loop to time out or recover rather than freeze the entire chat interface.

## 5. Bugs & Stability
Two open bugs were updated in the last 24 hours; neither has a visible fix PR in this data.

**High severity:**

- [Issue #3269: MCP server connection failure causes agent loop hang and chat interface to stop replying](https://github.com/sipeed/picoclaw/issues/3269)  
  - Impact: complete loss of chat interactivity when MCP fails; affects core agent reliability.
  - Status: open, marked `[stale]`, last updated 2026-08-12.

**Moderate severity:**

- [Issue #3281: Web UI chat input is very laggy when history grows](https://github.com/sipeed/picoclaw/issues/3281)  
  - Impact: degraded UX in long sessions; typing/input becomes unresponsive.
  - Status: open, marked `[stale]`, last updated 2026-08-13.

No regressions or new crash reports were filed in this window.

## 6. Feature Requests & Roadmap Signals
The clearest roadmap signal is the new feature request:

- [Issue #3330: Support dynamic model override in delegate/spawn/subagent tools](https://github.com/sipeed/picoclaw/issues/3330)  
  - Users want the ability to specify a model at call time rather than using static agent/default model configuration. This is useful for cost control, task-specific model selection, and experimentation.

Two open PRs also represent feature-side roadmap signals:

- [#3299 Native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — likely to land as a new web search backend if reviewed and merged.
- [#3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) — improves Telegram integration for privately messaged bots.

Given the activity, dynamic model override and native Exa support are plausible candidates for a future minor release, assuming maintainers approve the open PR/feature request.

## 7. User Feedback Summary
Users are reporting both reliability and UX concerns:

- Long chat history in the Web UI causes severe input lag, indicating frontend/state management needs optimization.
- MCP connection failures can freeze the whole agent loop, damaging trust in external tool integrations.
- Discord routed agents fail to persist conversation history and never trigger auto-compaction, affecting long-running channel bots.
- Telegram users with private bot chats cannot use topics correctly when forum mode is enabled.
- There is positive demand for model flexibility in delegation/subagent workflows, reflecting real power-user needs.

Overall, users appreciate the extensible agent/tool design but are clearly hitting stability and performance issues in real-world multi-channel use.

## 8. Backlog Watch
Several items need maintainer attention:

- [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269) and [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281) — both marked `[stale]` but remain unaddressed and are high-impact bugs. Without maintainer triage/fixes, they may be automatically closed despite still being relevant.

- [PR #3299](https://github.com/sipeed/picoclaw/pull/3299) — opened 2026-07-26; no merge yet. This is a feature-complete-looking provider addition that could be at risk of bit-rotting.

- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316) and [PR #3315](https://github.com/sipeed/picoclaw/pull/3315) — opened 2026-08-03; have not been merged after ~10 days. The context-management fix especially deserves review since it addresses a substantive bug in routed-agent memory.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-13

## Today's Overview

NanoClaw saw steady activity over the last 24 hours: 4 issues were updated and remain open, while 9 PRs were touched — 6 still open and 3 closed/merged. No new releases were published. The project is showing a healthy mix of bug-fix work and active feature development, with particular attention to messaging reliability, database migrations, and the evolving agent-template/plugin system. Newly filed issues are concentrated around operational edge cases: automated-sender approval flow, legacy recurring-task migration, and template-generated agent group IDs.

## Releases

No new releases or release notes were published in this window.

## Project Progress

Three PRs were closed/merged in the last 24 hours:

- **[PR #3086 — fix(whatsapp): validate recipient exists before sending](https://github.com/qwibitai/nanoclaw/pull/3086)**  
  Prevents false “message delivered” logs when the recipient phone number is not registered on WhatsApp.

- **[PR #3145 — fix(db): backfill destinations for existing wirings](https://github.com/qwibitai/nanoclaw/pull/3145)**  
  Adds migration 021 to provision missing channel destinations for existing messaging-group wirings while preserving existing destination names.

- **[PR #2624 — feat: per-server disabledTools in McpServerConfig](https://github.com/qwibitai/nanoclaw/pull/2624)**  
  Adds support for disabling MCP tools per server via configuration, improving MCP control.

Open PRs also show significant forward progress:

- **[PR #3220 — Agent templates become Agent Plugins 1.0.0 directories](https://github.com/qwibitai/nanoclaw/pull/3220)** — core format migration with stamp-time hardening.
- **[PR #2909 — Template setup flow in the wizard and first-agent stamping](https://github.com/qwibitai/nanoclaw/pull/2909)** — stacked on #3220.
- **[PR #3218 — Accept bounded JSON from stdin](https://github.com/qwibitai/nanoclaw/pull/3218)** — new `--stdin-json` mode for `ncl` CLI.
- **[PR #3231 — Honor plugin MCP cwd for Codex/OpenCode config writers](https://github.com/qwibitai/nanoclaw/pull/3231)**.

## Community Hot Topics

The only issue with explicit comment activity is:

- **[Issue #2504 — feat: add `ncl status` command for lightweight operational health check](https://github.com/qwibitai/nanoclaw/issues/2504)**  
  Users want a quick way to inspect NanoClaw instance health without relying on external dashboards or skills. The underlying need is operational visibility: active sessions alone do not indicate whether containers are alive, when the last message arrived, or whether recent errors occurred.

No PR comment counts were available in this dataset, so issue activity is the primary signal for community conversation today.

## Bugs & Stability

No direct fix PRs were observed for the following newly reported issues, ranked by severity:

1. **High — [Issue #3235: Unknown-sender approval cards from webhook/bot senders are unbounded](https://github.com/qwibitai/nanoclaw/issues/3235)**  
   Under `unknown_sender_policy = 'request_approval'`, automated senders generate repeated approval cards that cannot be sensibly approved, and denials do not persist. This can flood chat groups and degrade trust in the approval system.

2. **High — [Issue #3233: Agent-scoped tasks are blind to pre-2.1.54 recurring tasks](https://github.com/qwibitai/nanoclaw/issues/3233)**  
   After upgrading to 2.1.54, agents see “No tasks.” and cannot pause/cancel legacy recurring tasks, even though they still fire. No migration rehomes those legacy rows.

3. **Medium — [Issue #3234: Template-stamped agent groups get bare UUID instead of `ag-` prefix](https://github.com/qwibitai/nanoclaw/issues/3234)**  
   `ncl groups create --template <ref>` assigns a bare `randomUUID()`, which can cause OneCLI `ensureAgent` to reject it. This breaks spawn flows for template-created groups.

Previously reported stability issues continue to receive attention:

- WhatsApp false-positive delivery fix landed in **PR #3086**.
- DB destination backfill landed in **PR #3145**.
- Signal DM handling and slash-command fallback remain open in **PR #2689** and **PR #2346**.

## Feature Requests & Roadmap Signals

Several feature-oriented items are active and could appear in the next release:

- **`ncl status` command** — [Issue #2504](https://github.com/qwibitai/nanoclaw/issues/2504) is a strong candidate for a near-term CLI enhancement.
- **Agent Plugins 1.0.0 format** — [PR #3220](https://github.com/qwibitai/nanoclaw/pull/3220) and [PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909) are shaping the template system into a formal plugin directory format.
- **Bounded structured CLI input** — [PR #3218](https://github.com/qwibitai/nanoclaw/pull/3218) adds `--stdin-json` for host and container `ncl` clients.
- **Plugin MCP working-directory support** — [PR #3231](https://github.com/qwibitai/nanoclaw/pull/3231) is the registry-payload half of making plugin MCP servers use the correct cwd for Codex and OpenCode.

These point toward improved automation, template extensibility, and developer-tool integration in upcoming versions.

## User Feedback Summary

User-submitted issues today reflect real operational pain points:

- Upgrade/migration friction: existing recurring tasks are not visible to agent-scoped `ncl tasks` after 2.1.54.
- Approval-flow fragility: automated webhook/bot senders can create unbounded approval cards and denials do not persist.
- Template/ID inconsistency: template-created groups fail because of missing `ag-` prefixes.
- Past messaging issues are being addressed: WhatsApp validation and destination backfill fixes were closed in this window.

Overall, users are actively reporting deployment and migrations concerns, while maintainers are responding with focused fixes and PRs.

## Backlog Watch

Older, still-open items needing maintainer attention:

- **[Issue #2504 — `ncl status` command](https://github.com/qwibitai/nanoclaw/issues/2504)**  
  Open since May 15, last updated Aug 12, with only one comment. Needs a maintainer decision or implementation.

- **[PR #2346 — fix(formatter): treat unknown slash commands as normal chat](https://github.com/qwibitai/nanoclaw/pull/2346)**  
  Open since May 8. Addresses silently dropped responses when the Agent SDK interprets unknown commands as Claude Code slash commands.

- **[PR #2689 — fix(signal): DM platform ID consistency, isMention, and approval delivery](https://github.com/qwibitai/nanoclaw/pull/2689)**  
  Open since June 4. Signal DMs can be silently dropped because `isMention` is not set; this PR also fixes platform ID consistency and approval delivery.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-13

## 1. Today's Overview

High-activity day for IronClaw: 37 issues were updated (25 open, 12 closed) and 50 PRs were updated (30 open, 20 merged/closed). Two v1.2.0 release candidates shipped, with RC.3 fixing a missing `curl` binary in the runtime container and RC.2 addressing Windows filesystem publication and secret-key identity handling. The team also closed a broad batch of legacy WebUI surface removals and landed backend support for per-user model preferences. The main remaining risk is a cluster of Telegram bug-bash findings, including one P1 session-stuck bug with a fix PR already open.

## 2. Releases

### ironclaw-v1.2.0-rc.3 — 2026-08-12
- Fixed: runtime container image now installs `curl`, so in-container HTTP healthchecks can execute. Previously the worker image shipped no HTTP client, so `curl -fsS http://localhost:3000/` probes could not run and the container was never marked healthy.
- No breaking changes or migration notes were included in the release notes.

### ironclaw-v1.2.0-rc.2 — 2026-08-12
- Fixed: Windows first-start filesystem publication now uses native atomic rename semantics instead of hard links, and tolerates unsupported directory syncs.
- Fixed: release smoke runs preserve the Windows account identity required to secure the standalone secrets key.
- No breaking changes or migration notes were included in the release notes.

## 3. Project Progress

The following merged/closed PRs and issues represent completed or advanced work in the last 24 hours.

### Agent / LLM
- Closed PR [#7439](https://github.com/nearai/ironclaw/pull/7439): `feat(llm): add per-user model preferences and commands` — backend implementation for `/model`, `/model use`, and `/model default`, resolving issue [#7420](https://github.com/nearai/ironclaw/issues/7420).
- Closed PR [#7568](https://github.com/nearai/ironclaw/pull/7568): `fix(stress): follow session channel message route` — improves API-capacity workload realism by routing through the authenticated session channel.
- Closed issue [#7407](https://github.com/nearai/ironclaw/issues/7407): `BatchPolicy::Parallel` capability batches now execute concurrently in `invoke_capability_batch`.
- Closed issues [#7484](https://github.com/nearai/ironclaw/issues/7484) and [#7485](https://github.com/nearai/ironclaw/issues/7485): fixed context-window task eviction and the token estimator double-counting ASCII, which had effectively halved the usable context window.

### WebUI cleanup
- Closed PRs [#7527](https://github.com/nearai/ironclaw/pull/7527), [#7526](https://github.com/nearai/ironclaw/pull/7526), [#7529](https://github.com/nearai/ironclaw/pull/7529), and [#7528](https://github.com/nearai/ironclaw/pull/7528) remove the retired standalone Missions surface, retired Routines surface, Admin analytics placeholders, and Project Mission placeholders respectively. These close issues [#7521](https://github.com/nearai/ironclaw/issues/7521), [#7522](https://github.com/nearai/ironclaw/issues/7522), [#7523](https://github.com/nearai/ironclaw/issues/7523), and [#7524](https://github.com/nearai/ironclaw/issues/7524).
- Closed issue [#7302](https://github.com/nearai/ironclaw/issues/7302): improved WebUI tool-call failure presentation so recoverable tool errors look informational rather than alarming.

### CI / Tooling
- Closed PR [#7417](https://github.com/nearai/ironclaw/pull/7417): stabilizes main-branch Windows and WebUI CI checks.
- Closed PR [#7564](https://github.com/nearai/ironclaw/pull/7564): refreshes the committed codebase knowledge graph snapshot.
- Closed issue [#7383](https://github.com/nearai/ironclaw/issues/7383): tracks decomposition of the 4.4k-line `tool_disclosure_port.rs`.

## 4. Community Hot Topics

The most active issues by comment count this window:

- [#7360](https://github.com/nearai/ironclaw/issues/7360) — **Expand stress coverage across built-in and durable write paths** (3 comments, open). Underlying need: the nightly stress harness only exercises tool-less mock responses, so regressions in built-in capability writes can ship undetected. The community is pushing for stress coverage that includes real tool-call turns.

- [#7407](https://github.com/nearai/ironclaw/issues/7407) — **Execute BatchPolicy::Parallel capability batches concurrently** (3 comments, closed). Underlying need: the agent loop already plans parallel batches, but production execution was serial, leaving multi-tool-call turns slower than necessary.

- [#7554](https://github.com/nearai/ironclaw/issues/7554) — **Custom MCP server add flow shows validation error** (1 comment, open). Underlying need: users are blocked from adding MCP servers by a red validation error. Reported through Slack product-feedback, it signals a trust and onboarding blocker for third-party integrations.

- [#7484](https://github.com/nearai/ironclaw/issues/7484) — **Context window silently evicts the task** (1 comment, closed). Underlying need: long conversations must not lose the active task; the fix pins user messages and compacts instead of silently dropping task context.

## 5. Bugs & Stability

Bugs reported or updated in this window, ranked by severity.

### Critical / P1
- [#7538](https://github.com/nearai/ironclaw/issues/7538) — **Telegram agent becomes completely stuck after receiving a GIF or sticker** (P1). Sending a GIF/sticker can brick the entire session, including normal text messages afterward. A root-cause fix is already open in PR [#7563](https://github.com/nearai/ironclaw/pull/7563): attachment kind validation made `Sticker`/`Voice` descriptors unconstructible, failing whole updates; the PR also adds truthful sticker MIME types and ingress ack-discard.

### Launch / infrastructure
- [#7547](https://github.com/nearai/ironclaw/issues/7547) — **Instance upgrade fails during egress apply on agent staging** (`agent-stg.near.ai`, v1-launch-checklist). Container image switches successfully, but egress apply fails with `Error: egress apply failed`. No fix PR is listed yet.

### Medium / P2 bug-bash findings
- [#7541](https://github.com/nearai/ironclaw/issues/7541) — Agent cannot send generated files back as Telegram attachments; it returns a local workspace path instead.
- [#7539](https://github.com/nearai/ironclaw/issues/7539) — Telegram user message appears after the agent starts working, making conversation flow look out of order.
- [#7540](https://github.com/nearai/ironclaw/issues/7540) — Long Telegram messages are split by Telegram, but only the first part is processed; remaining parts are rejected with “still working on a previous message.”
- [#7542](https://github.com/nearai/ironclaw/issues/7542) — Agent does not recognize that the conversation is already in Telegram and offers WebUI-style delivery.
- [#7543](https://github.com/nearai/ironclaw/issues/7543) — Telegram routine runs successfully but the message is not delivered on first execution.
- [#7544](https://github.com/nearai/ironclaw/issues/7544) — Agent exposes internal reasoning/planning or raw tool documentation in chat instead of a normal user-facing response.
- [#7545](https://github.com/nearai/ironclaw/issues/7545) — Agent incorrectly claims live crypto market data is unavailable when querying multiple tokens, despite having general HTTP tools.
- [#7451](https://github.com/nearai/ironclaw/issues/7451) — Agent sometimes incorrectly asks for credentials/API keys even when the request should not require them.

### Low / P3
- [#7546](https://github.com/nearai/ironclaw/issues/7546) — Agent does not react to or acknowledge Telegram stickers; stickers are silently ignored. This is likely addressed by the same root-cause fix as [#7538](https://github.com/nearai/ironclaw/issues/7538) via PR [#7563](https://github.com/nearai/ironclaw/pull/7563).

### Other
- [#7554](https://github.com/nearai/ironclaw/issues/7554) — Custom MCP server add flow shows a validation error and blocks adding the server. No fix PR is visible yet.

## 6. Feature Requests & Roadmap Signals

- **Per-user LLM model preference** — [#7420](https://github.com/nearai/ironclaw/issues/7420) is closed and backend PR [#7439](https://github.com/nearai/ironclaw/pull/7439) landed. Frontend work is still open in PR [#7440](https://github.com/nearai/ironclaw/pull/7440), so this is a strong candidate for v1.2.0.

- **Generic per-request thinking/effort control** — [#7537](https://github.com/nearai/ironclaw/issues/7537) requests a provider-agnostic thinking-level control, including DeepSeek `chat_template_kwargs`. This is an open enhancement targeting the LLM request path and could appear in a near-term release.

- **Structured automation execution contracts** — PR [#7548](https://github.com/nearai/ironclaw/pull/7548) adds versioned structured execution contracts for scheduled automations: goal, success criteria, output instructions, no-result behavior, allowed capabilities, and required skills. This aligns with the Reborn automations direction and is likely to land in the next minor release.

- **Channel-first onboarding / OOBE** — Epic [#7044](https://github.com/nearai/ironclaw/issues/7044) targets v1.4.0, with backend wiring in [#6993](https://github.com/nearai/ironclaw/issues/6993) and frontend prototype PR [#6994](https://github.com/nearai/ironclaw/pull/6994). The goal is to eliminate the blank-slate first-run experience.

- **Design System + Storybook** — Epics [#7038](https://github.com/nearai/ironclaw/issues/7038) and [#7042](https://github.com/nearai/ironclaw/issues/7042) are tagged v1.3.0 and would bring an M3 Expressive design language, governance docs, and Storybook integration.

- **WebUI legacy-surface retirement** — Epic [#7520](https://github.com/nearai/ironclaw/issues/7520) is tagged v1.3.0 and is already partially executed through the closed cleanup PRs in this window.

## 7. User Feedback Summary

Real user pain points visible in this window:

- **MCP server onboarding is broken for some users** — [#7554](https://github.com/nearai/ironclaw/issues/7554) came directly from Slack product feedback. A red validation error blocks adding a custom MCP server, which is a significant integration trust issue.

- **Telegram reliability is the biggest dissatisfaction cluster** — The QA bug-bash reports from `joe-rlo` describe a Telegram experience with stuck sessions, out-of-order messages, missing file attachments, split-message data loss, incorrect credential prompts, and channel confusion. These are concrete UX trust issues.

- **Onboarding friction remains** — [#7044](https://github.com/nearai/ironclaw/issues/7044) notes that new users land on a blank slate and do not know what to do, creating adoption friction.

- **i18n gaps affect non-English users** — [#7565](https://github.com/nearai/ironclaw/issues/7565) reports untranslated English strings across exposed WebUI routes, including Admin Configuration and Chat surfaces.

- **Recoverable tool failures should not look scary** — [#7302](https://github.com/nearai/ironclaw/issues/7302), now closed, addressed the “aggressive-looking” tool error message shown even when the agent recovers successfully.

## 8. Backlog Watch

These items have been open for a while and may need maintainer attention or review:

- PR [#5910](https://github.com/nearai/ironclaw/pull/5910) — `fix: hydrate approval gates on notification open` (open since 2026-07-10, size L, risk low). An older reviewed PR that still needs merging to fix blocked-turn approval projection.

- PR [#6949](https://github.com/nearai/ironclaw/pull/6949) — `fix(product): accept model set command syntax` (open since 2026-07-31, size S, contributor: new). A small contributor PR that has been waiting for review.

- Issue [#6993](https://github.com/nearai/ironclaw/issues/6993) — Backend wiring for the OOBE automation-tasks prototype (open since 2026-08-01, no comments). This is the backend half of the channel-first onboarding epic [#7044](https://github.com/nearai/ironclaw/issues/7044) and appears stalled.

- Epic [#7044](https://github.com/nearai/ironclaw/issues/7044) — Onboarding to channel-first approach (open since 2026-08-03, v1.4.0). No comments so far; strategic for adoption but not actively moving in this window.

- Epic [#7038](https://github.com/nearai/ironclaw/issues/7038) / issue [#7042](https://github.com/nearai/ironclaw/issues/7042) — Design System Phase 2 governance and guidelines (open since 2026-08-03, v1.3.0). Design-system work is scoped but has not accumulated visible activity in the last 24 hours.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-13

## 1. Today's Overview

LobsterAI saw moderate-to-high activity in the last 24 hours: 12 PRs were updated, 7 moved to closed/merged, and 5 remain open — including 4 stale PRs from late March/April. No new releases were published, and no new issues were created; the only updated issue (#1162) is a stale test-coverage request that was touched again today. Merged work focused mainly on renderer UI consolidation across skills, MCP, and connectors, plus a scheduled-task fix and an enterprise-edition feature PR. Overall, the project is shipping UI/UX improvements, but the growing stale backlog around testing and reliability still needs maintainer attention.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

7 PRs were closed/merged today:

- [#2487 refactor(skills): merge skills and MCP views into unified skills-and-connectors view](https://github.com/netease-youdao/LobsterAI/pull/2487) — Consolidates skills and MCP management into a single connector-oriented renderer view.
- [#2485 feat(activity): support evergreen daily check-in](https://github.com/netease-youdao/LobsterAI/pull/2485) — Reworks the daily check-in into a permanent, evergreen activity and adjusts points-entry UX.
- [#2486 refactor(mcp): unify MCP card/detail UI with kits and skills styling](https://github.com/netease-youdao/LobsterAI/pull/2486) — Introduces shared `CardOverflowMenu`, `McpCard`, `McpDetailModal`, and unified typography across MCP/kits/skills.
- [#1232 fix(scheduledTask): fix first execution result not pushed to UI](https://github.com/netease-youdao/LobsterAI/pull/1232) — Fixes a `previousRunAtMs` condition that prevented the first scheduled-task run result from reaching the UI.
- [#2484 Feat/enterprise edition](https://github.com/netease-youdao/LobsterAI/pull/2484) — Large cross-cutting feature PR touching renderer, docs, main, and OpenClaw areas.
- [#2482 feat: skills manager split mine builtin tabs](https://github.com/netease-youdao/LobsterAI/pull/2482) — Splits the skills manager into “mine” and “builtin” tabs.
- [#2481 feat(sidebar): move task search to header actions](https://github.com/netease-youdao/LobsterAI/pull/2481) — Replaces the labeled search entry with an icon-only action, aligned across macOS/Windows, with diagnostics and regression coverage.

## 4. Community Hot Topics

No PRs in today’s update show meaningful comment/reaction counts. The only updated issue is:

- [#1162 [OPEN] Provide Vitest unit tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`](https://github.com/netease-youdao/LobsterAI/issues/1162) — 1 comment, 0 reactions. The underlying need is clear: `openclawMemoryFile.ts` is a core memory-management module with zero test coverage, and `openclawLocalTimeContextPrompt.ts` is pure logic that also lacks tests. The companion PR [#1165](https://github.com/netease-youdao/LobsterAI/pull/1165) adds 57 tests for memory file and 18 tests for local-time prompt, but remains open and stale.

## 5. Bugs & Stability

No crashes or security incidents were reported. The following bugs/regressions were visible in PR activity, ranked roughly by impact:

- **Skill UI toggles silently ineffective (Open)** — [#2483 fix(openclaw): key skill entries by frontmatter name](https://github.com/netease-youdao/LobsterAI/pull/2483) addresses a mismatch between skill directory names and frontmatter `name` values, which could make UI enable/disable toggles appear to work but actually do nothing.
- **Scheduled task “Run now” has no feedback and 15s polling delay (Open)** — [#1163 fix(定时任务): improve immediate-run interaction with optimistic updates and Gateway state sync](https://github.com/netease-youdao/LobsterAI/pull/1163) describes missing loading state, blocked IPC handler, and slow polling.
- **First scheduled-task execution result not pushed to UI (Fixed today)** — [#1232](https://github.com/netease-youdao/LobsterAI/pull/1232) was closed today, fixing the `previousRunAtMs > 0` condition.
- **Duplicate custom agent names allowed (Open)** — [#1166 fix(agent): prevent duplicate custom agent names](https://github.com/netease-youdao/LobsterAI/pull/1166) prevents ambiguous agent lists caused by duplicate names.

## 6. Feature Requests & Roadmap Signals

No new feature-request issues were filed, but merged PRs indicate strong roadmap signals:

- **Unified skills/MCP/connectors management** — [#2487](https://github.com/netease-youdao/LobsterAI/pull/2487) and [#2486](https://github.com/netease-youdao/LobsterAI/pull/2486) suggest a move toward one consistent connector-oriented UI.
- **Enterprise edition** — [#2484](https://github.com/netease-youdao/LobsterAI/pull/2484) is a broad cross-area feature and likely represents a major upcoming capability.
- **Evergreen daily check-in** — [#2485](https://github.com/netease-youdao/LobsterAI/pull/2485) makes check-in a permanent activity rather than a time-boxed campaign.
- **Better task-search placement and diagnostics** — [#2481](https://github.com/netease-youdao/LobsterAI/pull/2481) improves sidebar ergonomics and adds regression coverage.

These changes are likely to appear in the next release, with enterprise-edition and unified skills/connector UI as the most visible user-facing improvements.

## 7. User Feedback Summary

There were no direct user comments in today’s data, but PR descriptions reveal real pain points:

- Scheduled-task “Run now” gives no visual confirmation, causing uncertainty and duplicate clicks.
- The first run of a scheduled task often feels lost because results do not appear in the UI.
- Duplicate custom agent names create ambiguity and force users to manually search for the original agent.
- OpenClaw skill toggles can be silently ignored when directory/frontmatter names diverge, undermining user trust in UI controls.
- Users and contributors are pushing for better automated test coverage, especially for safety-critical modules like `commandSafety` and `coworkMemoryJudge`.

## 8. Backlog Watch

Several stale PRs from late March/early April remain open and need maintainer review or explicit closure:

- [#1162 [OPEN] Add Vitest tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`](https://github.com/netease-youdao/LobsterAI/issues/1162) — Created 2026-03-31, updated 2026-08-13.
- [#1165 [OPEN] PR: Add 75 Vitest tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`](https://github.com/netease-youdao/LobsterAI/pull/1165) — Created 2026-03-31, still open.
- [#1156 [OPEN] Add Vitest tests for `commandSafety` and `coworkMemoryJudge`](https://github.com/netease-youdao/LobsterAI/pull/1156) — Created 2026-03-31, still open; covers dangerous-command detection and memory-quality gating.
- [#1163 [OPEN] Fix scheduled-task immediate-run interaction](https://github.com/netease-youdao/LobsterAI/pull/1163) — Created 2026-03-31, still open; UX/state reliability issue.
- [#1166 [OPEN] Prevent duplicate custom agent names](https://github.com/netease-youdao/LobsterAI/pull/1166) — Created 2026-03-31, still open; data-integrity issue.

The long-lived stale PRs around test coverage and scheduled-task UX are the most important backlog items: they touch reliability, safety, and user-facing behavior.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-08-13

## 1. Today's Overview
Moltis showed very low activity in the last 24 hours: no issues were updated and no releases were published. The only noteworthy event is one newly opened pull request, #1191, aimed at fixing a sandbox build failure caused by a changed Go module path. No existing issues or PRs were closed or merged, indicating a quiet but still active maintenance phase. The project appears stable at the tracker level, though the open PR points to a real functional regression in the sandbox build pipeline.

## 2. Releases
No new releases were published in the last 24 hours. There are no release notes, breaking changes, or migration notes to report.

## 3. Project Progress
No PRs were merged or closed today.

The following PR is open and represents the only code movement:
- **[#1191 [OPEN] fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191)** – Author: Lstarsky0 | Created: 2026-08-13
  - Fixes `moltis sandbox build` failure on pre-built images by updating the generated Dockerfile from `github.com/steipete/gogcli/cmd/gog@latest` to the new module path under the `openclaw` org.
  - Not yet merged; pending review.

## 4. Community Hot Topics
There is only one active PR today, with no comments or reactions recorded:
- **[Moltis PR #1191](https://github.com/moltis-org/moltis/pull/1191)** – “fix(sandbox): point gogcli module path at the openclaw org”
  - Underlying need: users cannot build sandbox images because the `gogcli` repository/organization moved, leaving the generated Dockerfile referencing an outdated import path. The PR addresses the immediate build breakage, and the lack of discussion suggests this is a straightforward, well-understood fix.

## 5. Bugs & Stability
One bug was identified via the open PR:

- **High severity: `moltis sandbox build` fails on every pre-built image**  
  - Symptom: The generated Dockerfile runs `go install github.com/steipete/gogcli/cmd/gog@latest`, but the `go.mod` now declares `module github.com/openclaw/gogcli`, so installation fails.
  - Fix PR: [#1191](https://github.com/moltis-org/moltis/pull/1191) is open and directly addresses this issue.
  - No other bugs, crashes, or regressions were reported today.

## 6. Feature Requests & Roadmap Signals
No explicit feature requests were reported today. The only signal is the need to keep external dependencies path-aligned with upstream org changes. No roadmap predictions can be made from today’s data.

## 7. User Feedback Summary
The main user pain point visible today is the broken sandbox image build caused by the `gogcli` project migration. Users attempting to build pre-built images would encounter failures immediately. The prompt submission of a fix PR suggests contributor awareness and responsiveness; satisfaction data is otherwise unavailable due to the lack of comments or reactions.

## 8. Backlog Watch
No long-unanswered issues are present in the current dataset. The only item needing maintainer attention is:
- **[Moltis PR #1191](https://github.com/moltis-org/moltis/pull/1191)** – open since 2026-08-13 and should be reviewed/merged to restore sandbox build functionality.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-13

**Scope note:** This digest covers QwenPaw activity tracked in the `agentscope-ai/CoPaw` ecosystem. All linked issues/PRs are in the QwenPaw repository.

---

## 1. Today's Overview

QwenPaw saw high activity in the last 24 hours: **39 issues updated** (23 open/active, 16 closed) and **50 PRs updated** (26 open, 24 merged/closed), plus **1 new release**. The project is iterating quickly on the `v2.1.0` beta line, with fixes landing for file previews, dark mode, token accounting, and Computer Use accessibility. However, community reports still center on stability and trust issues: agents stopping mid-task, antivirus false positives, chat history disappearing after context compression, and network-recovery failures. Overall, the project is shipping actively, but user-visible reliability in 2.0.x and 2.1.0 betas remains the top concern.

---

## 2. Releases

### v2.1.0-beta.4
[Release link](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4)

Changes included:

- `fix(files): repair previews and dark mode styling` — [#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)
- `fix(tools): correct read_file tool description` — [#6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)
- `chore: bump the version to 2.1.0b4`

No breaking changes or migration notes were mentioned in the release notes.

---

## 3. Project Progress

24 PRs moved to merged/closed state in the last 24 hours. Notable finished PRs from the top-20 list:

- **[#6983](https://github.com/agentscope-ai/QwenPaw/pull/6983) — feat(console): improve editor tab overflow navigation**
  Better Web IDE tab handling with a compact tab rail, searchable open-files panel, dirty/pending-diff states, and close controls.

- **[#6977](https://github.com/agentscope-ai/QwenPaw/pull/6977) — fix(computer-use): preserve accessibility context**
  Preserves native accessibility hierarchy in compact Computer Use observations and fixes Windows UIA coordinate handling.

- **[#6982](https://github.com/agentscope-ai/QwenPaw/pull/6982) — fix(openrouter): limit app attribution categories**
  Restricts OpenRouter category headers to the documented maximum and classifies QwenPaw as `personal-agent` / `cli-agent`.

- **[#6968](https://github.com/agentscope-ai/QwenPaw/pull/6968) — fix(token-usage): stop counting image base64 as text tokens**
  Fixes the Console context-usage ring filling up after one or two image uploads.

- Release-related fixes landed for file previews and `read_file` tool descriptions.

---

## 4. Community Hot Topics

The most-discussed issues in the last 24 hours:

- **[#6921 — Agent stops after planning, requires user to say “continue”](https://github.com/agentscope-ai/QwenPaw/issues/6921)**
  6 comments. High-signal bug: the model outputs a plan like “Now 2.1, 3.1, 3.2. Let me do all three.” and then stops with no visible status, requiring the user to prompt it to continue. Underlying need: reliable autonomous multi-step execution and clearer progress visibility.

- **[#6973 — QwenPaw Creator support for Aliyun Bailian token plan](https://github.com/agentscope-ai/QwenPaw/issues/6973)**
  5 comments. Feature request for using Aliyun Bailian’s token plan with QwenPaw Creator.

- **[#6811 — OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60s cancellation as malformed output](https://github.com/agentscope-ai/QwenPaw/issues/6811)**
  5 comments. Closed. A provider-level bug affecting OpenAI reasoning-model users during conversation compaction.

- **[#6853 — Memory prompts claim dream syncs to MEMORY.md, but it writes to digest/](https://github.com/agentscope-ai/QwenPaw/issues/6853)**
  5 comments. Closed. Documentation/prompt bug: the ReMe dream pipeline never implemented automatic sync to MEMORY.md.

- **[#6847 — Antivirus software kills QwenPaw during tasks](https://github.com/agentscope-ai/QwenPaw/issues/6847)**
  4 comments. Open. Users report AV false positives and forced process termination. A fix PR is now open: [#6986](https://github.com/agentscope-ai/QwenPaw/pull/6986).

- **[#6780 — Idle freeze after tens of minutes; only process restart helps](https://github.com/agentscope-ai/QwenPaw/issues/6780)**
  4 comments. Open. Long-standing stability complaint with no linked fix yet.

---

## 5. Bugs & Stability

Ranked by severity and user impact:

| Severity | Issue/PR | Description |
|---|---|---|
| **High** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | Agent silently stops mid-task after producing a plan; user must reply “继续”. |
| **High** | [#6966](https://github.com/agentscope-ai/QwenPaw/issues/6966) | Telegram `/new` clears context but does not rotate session ID; context window grows indefinitely via scroll history. |
| **High** | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | After Scroll compression, pre-compression history is invisible in UI; only internal eviction index remains. |
| **High** | [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | After a temporary network outage, QwenPaw never recovers; LLM requests fail with timeouts until manual restart. |
| **High** | [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) | Antivirus/security software kills QwenPaw during execution. Fix PR: [#6986](https://github.com/agentscope-ai/QwenPaw/pull/6986). |
| **High / Security** | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | Plugins can silently create cron jobs and inject user-visible messages without approval. Closed. |
| **Medium** | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | Random startup crashes/exits on Windows with pip-installed v2.0.1. |
| **Medium** | [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP tool calls pass numeric-looking strings as numbers, causing failures. Fix PR under review: [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936). |
| **Medium** | [#6979](https://github.com/agentscope-ai/QwenPaw/issues/6979) | Chat titles incorrectly capture “thinking process” text after context compression. |
| **Medium** | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | Idle freeze after several tens of minutes. |
| **Low/UI** | [#6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) | History messages cannot scroll upward; input bar editing deletes trailing content. |
| **Low/UI** | [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | Assistant message end time display is incorrect. |
| **Data** | [#6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) | `sync.py` imports history under a random AgentState UUID, causing orphaned rows and split/duplicated recall. Closed. |

Also closed in this window: [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811), [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853), [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047), and [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916).

---

## 6. Feature Requests & Roadmap Signals

User-requested features and roadmap signals visible in the last 24 hours:

- **[#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973) — Aliyun Bailian token plan support**
  Directly requested for QwenPaw Creator.

- **[#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970) — Embeddable chat page and session-list filters**
  Wants a chat sub-page without sidebar/header, optional API key in URL, and precise session filtering by date/session ID.

- **[#6980](https://github.com/agentscope-ai/QwenPaw/issues/6980) — Right-side preview for generated Word/PPT/HTML files**
  Similar to DeerFlow; avoids manual download/open steps.

- **[#6924](https://github.com/agentscope-ai/QwenPaw/issues/6924) — Restore custom channel plugin configuration in interactive menu**
  Regression request: 2.0.x limited custom channel config compared to pre-2.0 versions.

- **[#6882](https://github.com/agentscope-ai/QwenPaw/issues/6882) — CopilotKit integration guidance**

- **[#6283](https://github.com/agentscope-ai/QwenPaw/issues/6283) — Auto-inject current real time into model context**
  Avoids confusion when old sessions are resumed after multiple days.

- **[#6585](https://github.com/agentscope-ai/QwenPaw/issues/6585) — Option to disable dynamic character-count display**
  UI polish request.

**PR-level roadmap signals:**

- [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) — Session-scoped multi-project directories
- [#6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) — MiniMax TTS support
- [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — Volcengine Agent Plan and Xiaomi MiMo V2.5 providers
- [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unified provider discovery, model metadata, routing, and agent controls
- [#6877](https://github.com/agentscope-ai/QwenPaw/pull/6877) — Persist desktop window geometry
- [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) — Configurable MCP tool-call timeout
- [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) — Session management slash commands (`/sessions`, `/session`)
- [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) — Intelligent email management assistant
- [#6984](https://github.com/agentscope-ai/QwenPaw/pull/6984) — Actionable ReMe runtime status dashboard

Likely next-version candidates: provider additions, MCP timeout configurability, session/directory management, and memory status improvements.

---

## 7. User Feedback Summary

User sentiment is a mix of enthusiasm and reliability frustration:

- **Autonomy/trust:** Multiple users report that QwenPaw stops mid-task without notice, fails to recover from network issues, or gets killed by antivirus software. These are the most emotionally charged complaints.
- **Transparency:** Users are unhappy that compressed history becomes invisible, chat titles capture internal thinking text, and message timestamps are inaccurate.
- **Integrations:** There is strong demand for Chinese-market providers like Aliyun Bailian and Volcengine, plus CopilotKit and custom channel configuration.
- **Workflow desires:** Users want a more desktop-like experience: embeddable chat UI, generated-file previews, persistent window state, and better session management.
- **Satisfaction signal:** The v2.1.0-beta.4 release shows maintainers responding quickly to UI/tooling bugs, but many 2.0.x stability issues remain open.

---

## 8. Backlog Watch

Issues/PRs that look stalled or need maintainer attention:

- **[#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — Volcengine Agent Plan + Xiaomi MiMo V2.5 providers**
  Open since Jul 28, still not merged despite active updates.

- **[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unified provider discovery, model metadata, routing, and agent controls**
  Open since Jul 21. Large architectural PR; needs review/decision.

- **[#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) — Preserve uploaded filenames in console hints**
  Open since Jul 27; no visible merge progress.

- **[#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) — Idle freeze after tens of minutes**
  Open since Aug 7 with 4 comments; no linked fix yet.

- **[#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) — Random Windows startup crash**
  Open since Aug 12; needs reproduction/triage.

- **[#6924](https://github.com/agentscope-ai/QwenPaw/issues/6924) — Custom channel plugin config regression**
  Open since Aug 12; maintainers have not yet responded with a decision.

- **[#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — MCP numeric-looking string coercion bug**
  Has a fix PR under review ([#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936)) since Aug 12; needs merge attention.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-13

## 1. Today's Overview

ZeroClaw was highly active in the last 24 hours: 50 issues updated (41 open/active, 9 closed) and 50 PRs updated (44 open, 6 merged/closed), with no new releases. The project remains deep in an RFC-driven security/architecture phase — pluggable auth (#7141), shell-command policy (#7155), runtime-owned security decisions (#7142), and verifiable-intent hardening (#9328) are drawing sustained multi-revision discussion alongside a parallel cluster of implementation PRs. A clear maintainer bottleneck persists: the majority of high-priority RFCs sit in `needs-maintainer-review`, a condition the community is actively tracking in #8692 and trying to fix through #9496 (RFC process reform). On the delivery side, steady progress continues on CI platform coverage (#9398), security-path enforcement (#9937), and cost transparency (#9938, #9939). Overall health is solid — engaged contributors, reproducible bug reports, and visible forward motion — but RFC decision throughput is the project's gating risk.

## 2. Releases

No new releases in the reporting window.

## 3. Project Progress

6 PRs were merged/closed in the last 24h (the provided top-20 sample shows only still-open PRs, so individual merged PR titles are not itemized). Three issues moved to closed, reflecting completion of follow-up cleanup:

- [#9710 bug(desktop): clean up temporary screenshot files on every exit](https://zeroclaw-labs/zeroclaw/issues/9710) — S3 cleanup bug resolved.
- [#9844 bug(zerocode): dashboard CPU metric does not identify the measured process](https://zeroclaw-labs/zeroclaw/issues/9844) — misleading observability label fixed.
- [#9712 Support weekly lettered cuts within a numbered release line](https://zeroclaw-labs/zeroclaw/issues/9712) — release-process discussion concluded.

Active work that advanced today (all open, with fresh updates):

- **Verifiable-intent hardening cluster:** [#9935 preserve unknown constraint types + read strictness mode](https://zeroclaw-labs/zeroclaw/pull/9935), [#9942 report withheld vi_verify through config surface](https://zeroclaw-labs/zeroclaw/pull/9942), [#9963 SD-JWT disclosure resolution + reference test vectors](https://zeroclaw-labs/zeroclaw/pull/9963).
- **Security policy enforcement:** [#9937 enforce forbidden_paths under allowed roots and workspace](https://zeroclaw-labs/zeroclaw/pull/9937) — closes a high-risk path-enforcement hole.
- **Cost transparency:** [#9938 preserve full provider ref for multi-alias pricing](https://zeroclaw-labs/zeroclaw/pull/9938), [#9939 surface pricing-unavailable so silent $0 caps can't reassure](https://zeroclaw-labs/zeroclaw/pull/9939).
- **SOP reliability:** [#9954 unwrap double-encoded step output before schema validation](https://zeroclaw-labs/zeroclaw/pull/9954).
- **Runtime/daemon:** [#9846 preserve local IPC socket ownership](https://zeroclaw-labs/zeroclaw/pull/9846) (p1, size L).
- **CI coverage and infra:** [#9398 scheduled macOS/Windows test workflow](https://zeroclaw-labs/zeroclaw/pull/9398), [#9962 provider-aware rust-cache composite action](https://zeroclaw-labs/zeroclaw/pull/9962), [#9932 drop all-false-positive CodeQL query](https://zeroclaw-labs/zeroclaw/pull/9932).
- **Channel/deps:** [#9326 Signal "Note to Self" sync messages](https://zeroclaw-labs/zeroclaw/pull/9326), [#9547 CPAL 0.18 upgrade](https://zeroclaw-labs/zeroclaw/pull/9547), [#9952 WeChat channel tests in CI](https://zeroclaw-labs/zeroclaw/pull/9952).

## 4. Community Hot Topics

- [#8303 RFC: Goal mode v1 — bounded foreground Matrix work](https://zeroclaw-labs/zeroclaw/issues/8303) — 20 comments, 1 👍. Most-discussed item: designing a durable bounded-objective mode for agents. Debate centers on how much to split from the earlier broad proposal.
- [#7155 RFC: per-execution confirmation tier for high-risk shell commands](https://zeroclaw-labs/zeroclaw/issues/7155) — 18 comments. Revision 3, scope confirmed by maintainers; Claude Code-style allow/ask/deny policy is the normative contract.
- [#7141 RFC: Pluggable inbound authentication and canonical principals](https://zeroclaw-labs/zeroclaw/issues/7141) — 14 comments. Rev 8 of the identity-milestone proposal (p1, security/architecture).
- [#7462 Bug: 74 test failures on Windows](https://zeroclaw-labs/zeroclaw/issues/7462) — 14 comments. High-interest reliability gap; mitigation proposed in [#9398](https://zeroclaw-labs/zeroclaw/pull/9398).
- [#8692 Tracker: Maintainer decision queue for RFCs](https://zeroclaw-labs/zeroclaw/issues/8692) — 13 comments. Community-organized queue for RFC/design decisions awaiting maintainer action.
- [#9328 Bug: verifiable-intent evaluates constraints without verifying the credential chain](https://zeroclaw-labs/zeroclaw/issues/9328) — 11 comments. Security-validation gap driving the VI PR cluster.
- [#9487 RFC: Runtime-owned conversation sessions and transport surface adapters](https://zeroclaw-labs/zeroclaw/issues/9487) — 11 comments; spans Web and ACP channels.

**Underlying need:** the community is pushing for security-architecture consolidation (auth, shell policy, runtime-owned decisions) and for faster, more structured maintainer decisions — visible in #9496 (RFC process reform), #8692 (decision tracker), and the unusually long revision histories of the June-era RFCs.

## 5. Bugs & Stability

Ranked by severity/risk:

1. **Windows test gap — S2, p1:** [#7462 74 test failures on Windows 11 (CP936)](https://zeroclaw-labs/zeroclaw/issues/7462) — Unix-only commands, path semantics, console encoding; CI only runs Linux, so this ships invisible. Mitigation PR open: [#9398](https://zeroclaw-labs/zeroclaw/pull/9398).
2. **Credential-chain validation hole — risk:high, p2:** [#9328 verifiable-intent evaluates caller-supplied constraints without chain verification](https://zeroclaw-labs/zeroclaw/issues/9328). Fixes in flight: [#9935](https://zeroclaw-labs/zeroclaw/pull/9935), [#9963](https://zeroclaw-labs/zeroclaw/pull/9963).
3. **SOP mid-step failure with no audit event — risk:high, p2:** [#9784](https://zeroclaw-labs/zeroclaw/issues/9784) — run marked `failed` while agent was mid-step; `r:needs-repro`.
4. **SOP failure cause discarded — p2, accepted:** [#9783 finish_run accepts reason and drops it](https://zeroclaw-labs/zeroclaw/issues/9783) — failed runs record *that* they failed, not *why*.
5. **Security-path enforcement regression (fix in review):** [#9937 forbidden_paths had no effect under allowed roots/workspace](https://zeroclaw-labs/zeroclaw/pull/9937) — high-risk path checks corrected across all three seams.
6. **Misleading cost/observability:** [#9939 silent $0 caps when providers return no pricing metadata](https://zeroclaw-labs/zeroclaw/pull/9939); [#9942 vi_verify withheld notice invisible when log persistence is off](https://zeroclaw-labs/zeroclaw/pull/9942).
7. **Channel UX:** [#9198 Discord typing indicator stuck after dashboard daemon reload](https://zeroclaw-labs/zeroclaw/issues/9198) — S3, accepted.

No crash-level or active-security-incident bugs were reported in the window. The highest-urgency items remain the Windows test gap and the VI credential-chain validation hole.

## 6. Feature Requests & Roadmap Signals

- **Goal mode / bounded agent objectives:** [#8303](https://zeroclaw-labs/zeroclaw/issues/8303) — likely to shape the next agent-runtime milestone once scoped.
- **v0.9.0 security architecture:** [#7141 pluggable inbound auth](https://zeroclaw-labs/zeroclaw/issues/7141), [#7142 runtime-owned security decision pipeline](https://zeroclaw-labs/zeroclaw/issues/7142) — both explicitly targeted at v0.9.0.
- **Runtime-owned sessions and command unification:** [#9487](https://zeroclaw-labs/zeroclaw/issues/9487) + [#7929 unify slash-command registries](https://zeroclaw-labs/zeroclaw/issues/7929).
- **Web-tool simplification:** [#9824 reduce five overlapping tools to web_fetch + web_research + http_request](https://zeroclaw-labs/zeroclaw/issues/9824) — p1 tracker, `in-progress`.
- **RFC process reform:** [#9496 streamline scope/discussion/voting](https://zeroclaw-labs/zeroclaw/issues/9496) — accepted; implementation PR [#9927 require naming the RFC trigger](https://zeroclaw-labs/zeroclaw/pull/9927) is already open. Likely to land soon.
- **Other notable requests:** [#8832 plugin-owned Kanban board](https://zeroclaw-labs/zeroclaw/issues/8832), [#9346 unified package/capability/config catalog](https://zeroclaw-labs/zeroclaw/issues/9346), [#6998 schema-validated memory consolidation](https://zeroclaw-labs/zeroclaw/issues/6998), [#5316 SearXNG + search failure recovery](https://zeroclaw-labs/zeroclaw/issues/5316), [#5907 LSP support for ZeroCode](https://zeroclaw-labs/zeroclaw/issues/5907).

**Next-release prediction:** the VI correctness fixes (#9935/#9942/#9963), cost-transparency fixes (#9938/#9939), and the `forbidden_paths` enforcement fix (#9937) are small, well-scoped, and likely to ship in the next patch release. The larger RFCs (#7141, #7142, #7155) target v0.9.0 and remain in maintainer review.

## 7. User Feedback Summary

- **Cross-platform pain:** Windows users report a seriously degraded experience — 74 failing tests on Windows 11 with a Simplified-Chinese console — and CI hasn't been catching it. Community response directly addresses the gap (#9398).
- **Trust/transparency concerns:** silent $0 cost display when pricing metadata is missing (#9939) and invisible withholding of `vi_verify` (#9942) both erode operator confidence in cost and security tooling.
- **Security expectations:** users explicitly expect `forbidden_paths` to hold even under `allowed_roots` (#9937) and verifiable-intent to actually verify credential chains (#9328) — a security-conscious early-adopter base.
- **Channel UX annoyances:** Discord typing indicator stuck after reload (#9198); Signal "Note to Self" messages silently dropped (fix in [#9326](https://zeroclaw-labs/zeroclaw/pull/9326)).
- **Process friction:** contributors openly describe the RFC process as "slower and more cumbersome than the decisions it is meant to support" (#9496), and the maintainer review queue is visibly backed up (#8692).
- **Overall sentiment:** engaged and constructive — well-labeled, reproducible bug reports and contributor-supplied fixes — but maintainer review bandwidth is the primary source of dissatisfaction.

## 8. Backlog Watch

- **Long-open accepted/needs-author items:** [#5907 LSP support for ZeroCode](https://zeroclaw-labs/zeroclaw/issues/5907) (opened 2026-04-19, p2, ~4 months), [#5316 SearXNG configuration](https://zeroclaw-labs/zeroclaw/issues/5316) (opened 2026-04-05, accepted but no implementation PR), [#6653 host-architecture policy for emulated installs](https://zeroclaw-labs/zeroclaw/issues/6653) (opened 2026-05-14, p3), [#7929 unify slash-command registries](https://zeroclaw-labs/zeroclaw/issues/7929) (opened 2026-06-18, p2, risk:high), [#9323 execution-tree iteration budget ownership](https://zeroclaw-labs/zeroclaw/issues/9323) (opened 2026-07-24 — every production root currently supplies `None` for the shared budget), [#8367 derived capability readiness](https://zeroclaw-labs/zeroclaw/issues/8367) (blocked, p3).
- **Maintainer-review RFC backlog:** [#8303](https://zeroclaw-labs/zeroclaw/issues/8303), [#7155](https://zeroclaw-labs/zeroclaw/issues/7155), [#7141](https://zeroclaw-labs/zeroclaw/issues/7141), [#7142](https://zeroclaw-labs/zeroclaw/issues/7142), [#9487](https://zeroclaw-labs/zeroclaw/issues/9487), [#7897](https://zeroclaw-labs/zeroclaw/issues/7897), [#9346](https://zeroclaw-labs/zeroclaw/issues/9346) — collectively tracked in [#8692](https://zeroclaw-labs/zeroclaw/issues/8692). The oldest p1 RFCs (#7141, #7155, #7142) date to 2026-06-03 and are at Rev 6–8; deferred decisions here are blocking the v0.9.0 security milestone.
- **PRs blocked on author action:** [#9326 Signal "Note to Self" sync](https://zeroclaw-labs/zeroclaw/pull/9326), [#9527 Rust 1.97.1 toolchain bump](https://zeroclaw-labs/zeroclaw/pull/9527).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*