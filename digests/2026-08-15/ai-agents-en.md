# OpenClaw Ecosystem Digest 2026-08-15

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-14 23:00 UTC

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

# OpenClaw Project Digest — 2026-08-15

## 1. Today's Overview

OpenClaw remains in a very active maintenance-and-stabilization phase: 500 issues and 500 PRs were updated in the last 24 hours, with 11 issues closed and 100 PRs merged/closed. The tracker is still dominated by P0/P1 reliability bugs — silent reply failures, gateway memory growth, provider-specific turn stalls, and session-state corruption — many of which carry `needs-maintainer-review` and `no-new-fix-pr` labels. On the PR side, work is concentrated on security/install-policy flows, UI/sidebar polish, channel fixes (Matrix, Slack, MS Teams), and gateway session recovery. No new release was published as of 2026-08-15, so these fixes remain unreleased to users on the stable channel.

---

## 2. Releases

None. No new OpenClaw releases were published in this 24-hour window, so there are no version-specific changes, breaking changes, or migration notes to report.

---

## 3. Project Progress

100 PRs were merged/closed in the last 24 hours. Notable closed PRs visible in the top sample include:

- [openclaw/openclaw#116489](https://github.com/openclaw/openclaw/pull/116489) — `feat(security): require acknowledgement for install policy warnings` (security-boundary change, closed).
- [openclaw/openclaw#123869](https://github.com/openclaw/openclaw/pull/123869) — `fix(gateway): keep node worker outcomes consistent under load` (closed).
- [openclaw/openclaw#123874](https://github.com/openclaw/openclaw/pull/123874) — `improve(ui): unify chat side rails in a tabbed panel` (closed).
- [openclaw/openclaw#123813](https://github.com/openclaw/openclaw/pull/123813) — `fix(ui): page activity indicator matches session rows` (closed).
- [openclaw/openclaw#123805](https://github.com/openclaw/openclaw/pull/123805) — `feat(slack): include observed away duration in presence events` (closed), with backport [openclaw/openclaw#123876](https://github.com/openclaw/openclaw/pull/123876).

Notable open PRs advancing features/fixes:

- [openclaw/openclaw#120900](https://github.com/openclaw/openclaw/pull/120900) — review install-policy warnings in Control UI.
- [openclaw/openclaw#123866](https://github.com/openclaw/openclaw/pull/123866) — fix Skills Workshop repair for valid skills above reviewer read cap.
- [openclaw/openclaw#123495](https://github.com/openclaw/openclaw/pull/123495) — prevent `sessions cleanup --fix-missing` from deleting readable transcripts.
- [openclaw/openclaw#123877](https://github.com/openclaw/openclaw/pull/123877) — honor provider timeouts during stuck-session recovery.
- [openclaw/openclaw#123845](https://github.com/openclaw/openclaw/pull/123845) — prevent mismatched macOS CUA driver endpoints.
- [openclaw/openclaw#123194](https://github.com/openclaw/openclaw/pull/123194) — cap MCP HTTP/SSE response bodies before SDK parse.
- [openclaw/openclaw#112811](https://github.com/openclaw/openclaw/pull/112811) — support multiple MS Teams bot accounts.
- [openclaw/openclaw#122862](https://github.com/openclaw/openclaw/pull/122862) — resolve exact Matrix room session routes.
- [openclaw/openclaw#123254](https://github.com/openclaw/openclaw/pull/123254) — recover Claw runtime lifecycle state safely.
- [openclaw/openclaw#123709](https://github.com/openclaw/openclaw/pull/123709) — explain outbound message delivery in audit.
- [openclaw/openclaw#123276](https://github.com/openclaw/openclaw/pull/123276) — start new sessions with folder group defaults.

---

## 4. Community Hot Topics

Most active issues by comment count:

- [openclaw/openclaw#121058](https://github.com/openclaw/openclaw/issues/121058) — **94 comments**: Silent reply failures still recurring after #116277 was closed. The hottest issue in the tracker and a clear trust/reliability concern.
- [openclaw/openclaw#91588](https://github.com/openclaw/openclaw/issues/91588) — **24 comments, P0**: Gateway RSS grows from 350MB to 15.5GB, causing repeated OOM crash loops.
- [openclaw/openclaw#121953](https://github.com/openclaw/openclaw/issues/121953) — **20 comments, P1**: Cron agent turns stall on DeepSeek because the `[cron:<jobId> <name>]` prefix is deprioritized by the API edge.
- [openclaw/openclaw#80319](https://github.com/openclaw/openclaw/issues/80319) — **18 comments, P2**: QA tool-defaults suite conflates Codex-native tools with OpenClaw dynamic tool parity.
- [openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834) — **15 comments, P1**: WhatsApp 1:1 inbound image wedges the main lane ~3 minutes before processing.
- [openclaw/openclaw#62505](https://github.com/openclaw/openclaw/issues/62505) — **15 comments, P1**: Coding Agent never completes anything; regression from earlier versions.
- [openclaw/openclaw#108435](https://github.com/openclaw/openclaw/issues/108435) — **14 comments, P0**: Gateway fails to start after update to 2026.7.1.
- [openclaw/openclaw#38327](https://github.com/openclaw/openclaw/issues/38327) — **14 comments, P1**: "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview.

Underlying needs: users are relying on OpenClaw for always-on automation, cron jobs, WhatsApp/Telegram groups, and agentic coding. Recurring message loss, session wedges, and provider-specific stalls are the dominant frustrations.

---

## 5. Bugs & Stability

Ranked by severity and update activity:

### P0 / Critical

- [openclaw/openclaw#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway memory leak: RSS grows from ~350MB to 15.5GB over days, causing OOM kills and `launchd-handoff` restart cycles. No new fix PR linked.
- [openclaw/openclaw#108435](https://github.com/openclaw/openclaw/issues/108435) — Gateway fails to start after update to 2026.7.1, regardless of systemd, ollama, or manual launch. No new fix PR linked.
- [openclaw/openclaw#119270](https://github.com/openclaw/openclaw/issues/119270) — File tools strip a leading `@` from destination paths, silently overwriting/deleting the wrong file. No new fix PR linked.

### P1 / High Impact

- [openclaw/openclaw#121058](https://github.com/openclaw/openclaw/issues/121058) — Silent reply failures continue; no queued reply payload despite prior fix #116277.
- [openclaw/openclaw#62505](https://github.com/openclaw/openclaw/issues/62505) — Coding Agent never completes tasks (regression).
- [openclaw/openclaw#38327](https://github.com/openclaw/openclaw/issues/38327) — Vertex/Gemini provider fails with "Cannot convert undefined or null to object".
- [openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp image messages wedge the reply lane ~3 minutes.
- [openclaw/openclaw#86215](https://github.com/openclaw/openclaw/issues/86215) — Codex OAuth refresh failures can wedge an agent for hours without alerting/rotation.
- [openclaw/openclaw#83959](https://github.com/openclaw/openclaw/issues/83959) — Codex app-server startup retries can exhaust before replacement server is ready.
- [openclaw/openclaw#87109](https://github.com/openclaw/openclaw/issues/87109) — Gateway heap grows at idle on macOS; cron jobs fail silently under memory pressure.
- [openclaw/openclaw#86214](https://github.com/openclaw/openclaw/issues/86214) — Codex app-server client closes mid-turn during image/tool requests with large `logs_2.sqlite`.
- [openclaw/openclaw#94939](https://github.com/openclaw/openclaw/issues/94939) — 6.x state migration leaves channel conversation-store SQLite empty, breaking proactive MS Teams sends.
- [openclaw/openclaw#92241](https://github.com/openclaw/openclaw/issues/92241) — Gateway holds stale module import paths after update/rollback, silently dropping messages.
- [openclaw/openclaw#99910](https://github.com/openclaw/openclaw/issues/99910) — Memory dreaming run pegs the gateway event loop for ~10 minutes.
- [openclaw/openclaw#107244](https://github.com/openclaw/openclaw/issues/107244) — WhatsApp group messages never reach inbound handling.
- [openclaw/openclaw#106704](https://github.com/openclaw/openclaw/issues/106704) — `sessions_yield` on a subagent's first turn silently finalizes the run as OK with an empty result.
- [openclaw/openclaw#98702](https://github.com/openclaw/openclaw/issues/98702) — Inherited OpenAI OAuth rejected for built-in runtime on `openai-chatgpt-responses` transport.
- [openclaw/openclaw#120563](https://github.com/openclaw/openclaw/issues/120563) — Conversation history not sent to custom/Ollama providers.
- [openclaw/openclaw#97616](https://github.com/openclaw/openclaw/issues/97616) — Leaked hook/tool child processes cause zombie accumulation and runtime degradation.
- [openclaw/openclaw#99947](https://github.com/openclaw/openclaw/issues/99947) — Codex harness mirrored-session-history read fails for ephemeral sessions/failover.
- [openclaw/openclaw#95553](https://github.com/openclaw/openclaw/issues/95553) — Preflight compaction is hard-capped at ~60s and ignores `compaction.timeoutSeconds`.
- [openclaw/openclaw#92186](https://github.com/openclaw/openclaw/issues/92186) — Foreground reply fence drops completed WhatsApp group replies.
- [openclaw/openclaw#45224](https://github.com/openclaw/openclaw/issues/45224) — Unhandled Playwright assertion error crashes the Gateway process.
- [openclaw/openclaw#91144](https://github.com/openclaw/openclaw/issues/91144) — Windows native CLI gateway Scheduled Task does not stay running.

### Fix PRs in flight for related issues

- [openclaw/openclaw#123877](https://github.com/openclaw/openclaw/pull/123877) addresses provider timeouts during stuck-session recovery.
- [openclaw/openclaw#123495](https://github.com/openclaw/openclaw/pull/123495) prevents cleanup from deleting readable SQLite transcripts.
- [openclaw/openclaw#123869](https://github.com/openclaw/openclaw/pull/123869) keeps node worker outcomes consistent under load.
- [openclaw/openclaw#123864](https://github.com/openclaw/openclaw/pull/123864) rejects stale guarded session reset requests.

Many P0/P1 issues still have no linked fix PR and remain in `needs-maintainer-review`.

---

## 6. Feature Requests & Roadmap Signals

Strong user demand continues around model flexibility, cost transparency, and UI usability:

- [openclaw/openclaw#10687](https://github.com/openclaw/openclaw/issues/10687) — Fully dynamic model discovery for OpenRouter and fast-moving catalogs.
- [openclaw/openclaw#13219](https://github.com/openclaw/openclaw/issues/13219) — Native per-model usage logging for cost tracking and model-mix optimization.
- [openclaw/openclaw#44395](https://github.com/openclaw/openclaw/issues/44395) — Heading-aware chunking and entity extraction for memory search.
- [openclaw/openclaw#71142](https://github.com/openclaw/openclaw/issues/71142) — Configurable upload size limit for Control UI.
- [openclaw/openclaw#75947](https://github.com/openclaw/openclaw/issues/75947) — UI quality update based on UX/accessibility scoring.
- [openclaw/openclaw#88154](https://github.com/openclaw/openclaw/issues/88154) — Slack Modal support for interactive workflows.
- [openclaw/openclaw#17840](https://github.com/openclaw/openclaw/issues/17840) — Opt-in reaction-triggered agent turns.
- [openclaw/openclaw#81061](https://github.com/openclaw/openclaw/issues/81061) — Pre-routing inbound message hook (`before_route_inbound_message`).
- [openclaw/openclaw#96975](https://github.com/openclaw/openclaw/issues/96975) — Isolate subagent completion from parent context; return status + child session link only.
- [openclaw/openclaw#73537](https://github.com/openclaw/openclaw/issues/73537) — Add production-readiness stability labels to releases.

In-flight PRs suggest the next release will likely include security install-policy acknowledgements ([openclaw/openclaw#116489](https://github.com/openclaw/openclaw/pull/116489), [openclaw/openclaw#120900](https://github.com/openclaw/openclaw/pull/120900)), multi-bot MS Teams support ([openclaw/openclaw#112811](https://github.com/openclaw/openclaw/pull/112811)), folder-group session defaults ([openclaw/openclaw#123276](https://github.com/openclaw/openclaw/pull/123276)), and further UI/sidebar normalization PRs.

---

## 7. User Feedback Summary

- The top user pain point is **silent reply/message loss**. Issue [openclaw/openclaw#121058](https://github.com/openclaw/openclaw/issues/121058) has 94 comments and explicitly reports that a previously closed fix did not resolve the problem.
- **Memory growth and OOM crashes** ([openclaw/openclaw#91588](https://github.com/openclaw/openclaw/issues/91588), [openclaw/openclaw#87109](https://github.com/openclaw/openclaw/issues/87109)) are undermining always-on/home-automation use cases.
- **Regressions** such as the Coding Agent never completing ([openclaw/openclaw#62505](https://github.com/openclaw/openclaw/issues/62505)) and gateway startup failure after update ([openclaw/openclaw#108435](https://github.com/openclaw/openclaw/issues/108435)) are creating upgrade anxiety.
- **Channel-specific friction** is widespread: WhatsApp images/groups ([openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834), [openclaw/openclaw#107244](https://github.com/openclaw/openclaw/issues/107244)), Telegram stickers ([openclaw/openclaw#120735](https://github.com/openclaw/openclaw/issues/120735)), Matrix room routing ([openclaw/openclaw#122862](https://github.com/openclaw/openclaw/pull/122862)), and MS Teams migration data loss ([openclaw/openclaw#94939](https://github.com/openclaw/openclaw/issues/94939)).
- Users are also asking for **more control and transparency**: per-model cost tracking, dynamic model discovery, configurable upload limits, and better UI ergonomics.
- Positive sentiment exists: [openclaw/openclaw#73537](https://github.com/openclaw/openclaw/issues/73537) thanks maintainers and describes OpenClaw as a genuine part of a daily family/business workflow, while requesting clearer production-readiness signals.

---

## 8. Backlog Watch

Long-standing, high-severity issues still needing maintainer attention:

- [openclaw/openclaw#91588](https://github.com/openclaw/openclaw/issues/91588) — P0 gateway memory leak, created 2026-06-09, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#62505](https://github.com/openclaw/openclaw/issues/62505) — P1 Coding Agent never completes, created 2026-04-07, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#38327](https://github.com/openclaw/openclaw/issues/38327) — P1 Vertex/Gemini object conversion error, created 2026-03-06, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#45224](https://github.com/openclaw/openclaw/issues/45224) — P1 Playwright assertion crash, created 2026-03-13, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#86215](https://github.com/openclaw/openclaw/issues/86215) — P1 Codex OAuth refresh wedges, created 2026-05-24, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#87109](https://github.com/openclaw/openclaw/issues/87109) — P1 idle heap growth/cron silent failure, created 2026-05-27, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#86214](https://github.com/openclaw/openclaw/issues/86214) — P1 Codex app-server closes mid-turn, created 2026-05-24, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834) — P1 WhatsApp image wedge, created 2026-06-25, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#99910](https://github.com/openclaw/openclaw/issues/99910) — P1 memory dreaming pegs event loop, created 2026-07-04, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#107244](https://github.com/openclaw/openclaw/issues/107244) — P1 WhatsApp group messages never reach inbound handling, created 2026-07-14, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#95553](https://github.com/openclaw/openclaw/issues/95553) — P1 preflight compaction hard cap, created 2026-06-21, `no-new-fix-pr`, `needs-maintainer-review`.
- [openclaw/openclaw#92186](https://github.com/openclaw/openclaw/issues/92186) — P1 foreground reply fence drops completed WhatsApp replies, created 2026-06-11, `no-new-fix-pr`, `needs-maintainer-review`.

Several of these also carry `clawsweeper-recovery-stuck`, meaning automated recovery/triage has not been able to make progress. These are the highest-priority items to resolve or explicitly de-risk before the next release.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — AI Agent / Personal Assistant Open-Source Ecosystem
**Data window:** 2026-08-14 → 2026-08-15 | **Source:** Community digest summaries for 12 projects

---

## 1. Ecosystem Overview

The open-source personal AI assistant ecosystem is bifurcating into a high-volume but reliability-strained core reference platform (OpenClaw, with ~500 daily issue/PR updates) and a set of actively shipping peers — IronClaw, ZeroClaw, CoPaw, Hermes, and LobsterAI — differentiating on architecture, release discipline, and vertical communities. Smaller forks (NanoBot, NanoClaw, PicoClaw, NullClaw) are optimizing for WebUI polish, hardened images, or constrained deployment environments. Shared pressure points across all tiers are remarkably consistent: unattended automation reliability, channel messaging robustness, MCP/plugin stability, session/memory data integrity, and model/provider flexibility. Only IronClaw (v1.2.0) and LobsterAI (2026.8.14) shipped releases in the window; the rest of the ecosystem remains unreleased on stable channels. Overall health is moderate — the ecosystem is iterating quickly, but user trust is fragile, with silent message loss, memory leaks, and provider-specific wedges dominating complaints.

---

## 2. Activity Comparison

Health score criteria: issue closure rate, fix-PR responsiveness, severity of open blockers, release cadence, and backlog hygiene (1–10).

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release | Health |
|---|---|---|---|---|
| **OpenClaw** | 500 (11) | 500 (100) | None | 5 |
| **IronClaw** | 24 (9) | 47 (22) | v1.2.0 | 8 |
| **ZeroClaw** | 33 (3) | 50 (3) | None | 7 |
| **CoPaw** (QwenPaw) | 50 (38) | 41 (15) | None | 6 |
| **Hermes Agent** | 50 (11) | 50 (5) | None | 7 |
| **LobsterAI** | 2 (0) | 27 (22) | 2026.8.14 | 8 |
| **NanoBot** | 3 (2) | 22 (8) | None | 8 |
| **NanoClaw** | 2 (0) | 9 (3) | None | 7 |
| **PicoClaw** | 3 (2) | 9 (5) | None | 6 |
| **NullClaw** | 0 (0) | 1 (1) | None | 9 |
| **Moltis** | 0 (0) | 1 (0) | None | 5 |
| **ZeptoClaw** | 0 (0) | 0 (0) | None | 2 |

**Interpretation.** OpenClaw generates more volume than all peers combined, but closes a smaller fraction of what it touches (2.2% of issues, 20% of PRs) and carries 12+ P0/P1 issues with no linked fix. IronClaw and LobsterAI show the best through-put-to-output ratio, each shipping a release while merging 22 PRs. NullClaw has the cleanest state (zero backlog, PR processed within 24h) but minimal throughput. ZeptoClaw is effectively dormant.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Community scale:** ~500 issues and ~500 PRs updated daily — roughly 10× the next busiest project (Hermes/CoPaw/ZeroClaw at ~50).
- **Ecosystem reference status:** Other projects explicitly track OpenClaw compatibility (e.g., LobsterAI shipped fixes this week for OpenClaw skill toggles). OpenClaw is the de-facto baseline for skills, sessions, and gateway semantics.
- **Broadest channel and feature surface:** Matrix, Slack, MS Teams, WhatsApp, Telegram, plus skills workshop, memory dreaming, CUA driver for macOS, and install-policy security flows.
- **Backport discipline:** Parallel PRs (e.g., Slack presence backport #123876) indicate an organized release branch strategy.

**Technical approach differences:**
- OpenClaw uses a gateway/node-worker architecture with persistent sessions and provider-specific adapter layers (OpenAI, Anthropic, Vertex, DeepSeek, Codex). Its peers diverge sharply: IronClaw is Rust/WASM-based with DB-level lease serialization and formal release canaries; ZeroClaw is RFC/protocol-first (Chat Completions profile, pluggable OIDC auth); CoPaw is Python/AgentScope with a Chinese-ecosystem channel set; Hermes is a desktop + TUI research agent.
- OpenClaw's weakness is visible in the same window: no release shipped, a 94-comment silent-reply failure issue (#121058) recurring after a prior fix, a P0 gateway memory leak growing to 15.5GB RSS (#91588), and a Coding Agent regression (#62505). Peers like IronClaw are demonstrating that structured execution contracts and typed outcomes can replace prompt-dependent automation behavior — precisely the area where OpenClaw is bleeding trust.

**Community size comparison:** OpenClaw's contributor/issue base is an order of magnitude larger than any peer; however, the `needs-maintainer-review` bottleneck and `no-new-fix-pr` labels on critical issues indicate the maintainer capacity has not scaled with community input. This is the gap IronClaw, ZeroClaw, and Hermes are capitalizing on with faster fix-to-issue loops.

---

## 4. Shared Technical Focus Areas

| Focus area | Projects | Specific needs |
|---|---|---|
| **Always-on automation / cron reliability** | OpenClaw, IronClaw, NanoClaw, ZeroClaw | Silent cron failures; structured execution contracts with typed outcomes (IronClaw #6879 epic); malformed cron-string retirement (NanoClaw #3247); deterministic no-delivery semantics |
| **Channel messaging robustness** | OpenClaw, CoPaw, IronClaw, Hermes, ZeroClaw, PicoClaw | WhatsApp image/group wedges; Telegram 2FA and model picker; MS Teams multi-bot + migration data loss; Feishu cross-session cancellation (CoPaw #7011); Discord thread/forum lifecycle (Hermes Omniscience); WeChat/DingTalk media handling |
| **MCP / plugin / tool stability** | OpenClaw, PicoClaw, CoPaw, NanoBot, IronClaw | Connection-failure hangs freezing chat (PicoClaw #3269); "Tool not found" after upgrades (CoPaw #6405); duplicate tool-result data (CoPaw #6958); MCP SDK v2 migration (NanoBot #5179); HTTP/SSE response body caps (OpenClaw #123194) |
| **Session / memory data integrity** | OpenClaw, NanoBot, NullClaw, CoPaw, ZeroClaw | Stale background saves overwriting sessions (NanoBot #5271); cleanup deleting readable transcripts (OpenClaw #123495); configurable SQLite memory path (NullClaw #986); individual-message delete and conversation split (CoPaw #4001/#4436); Qdrant silent fallback (ZeroClaw #9919) |
| **Model / provider flexibility** | OpenClaw, LobsterAI, Hermes, ZeroClaw, CoPaw, NanoBot | Dynamic model discovery; per-model cost tracking; OpenAI Chat Completions/Responses API compatibility (ZeroClaw #8603, CoPaw #3002); OAuth status visibility and fallback endpoints (NanoBot #4689, Hermes #81809); per-session model overrides (CoPaw #5992) |
| **Desktop & Windows UX** | Hermes, CoPaw, LobsterAI, NanoBot, ZeroClaw, NanoClaw | Zoom persistence loss (Hermes #60693 cluster); Windows auto-update and cmd.exe flashing (CoPaw #2846); LSP shim resolution on Windows (Hermes #86445); orphan-cleanup quoting (NanoClaw #3246); 74 Windows test failures (ZeroClaw #7462); WebUI localization (NanoBot #5367) |
| **Security policy & redaction** | OpenClaw, ZeroClaw, Hermes, IronClaw | Install-policy acknowledgements (OpenClaw #116489); high-risk shell command confirmation (ZeroClaw #7155); pluggable inbound auth/OIDC (ZeroClaw #7141); unredacted tool-content residuals (Hermes #77472); bounded provider auth diagnostics (IronClaw #7668) |

---

## 5. Differentiation Analysis

| Project | Feature focus | Target users | Technical architecture |
|---|---|---|---|
| **OpenClaw** | Broadest channel/session/skills surface; gateway reliability | Self-hosters, home automation, agentic coding | Gateway + node workers, session persistence, provider adapters; JS/TS ecosystem |
| **IronClaw** | Automation contracts, release engineering, performance measurement | Teams / production deployments | Rust/WASM, DB write-pressure harness, release merge-back + forward-port discipline |
| **ZeroClaw** | Protocol standards, security completeness, RFC governance | Operators and integrators needing OIDC/OpenAI-compat | RFC-driven; Chat Completions profile; pluggable auth pipeline; v0.8.5/v0.9 roadmap |
| **CoPaw** | Desktop app, Chinese channels (Feishu/OneBot/DingTalk), plugin ecosystem | Chinese-speaking consumers and devs; Docker/server users | Python + AgentScope; Creator plugin system; MCP-centric |
| **Hermes Agent** | Discord feature parity, desktop/TUI, provider breadth (Grok, GLM, Xiaomi) | Power users, research community | Electron desktop + TUI; campaign-driven modular PRs (Omniscience) |
| **LobsterAI** | Productized UX (sidebar, carousel, credits, Team Edition) | Consumer/team product users | Electron renderer/main process; OpenClaw-compatible skill handling |
| **NanoBot** | WebUI polish, 10-locale localization, skills marketplace, collaboration | Web-first users, education/academic | TypeScript; WebUI + terminal UI; MCP v2 migration in progress |
| **NanoClaw** | Hardened image deployment, setup reliability | Edge/container deployments on modest CPUs | Prebuilt agent image (AVX2 dependency is current gap) |
| **PicoClaw** | Voice/TTS, Chinese channels, lightweight runtime | Chinese-channel integrators, hobbyists | Go; DashScope TTS; WeChat/DingTalk adapters |
| **NullClaw** | Minimal footprint, deployment flexibility | Containerized / read-only workspace environments | SQLite memory engine with configurable path |
| **Moltis** | Durable connectors (CalDAV, Gmail, Himalaya) rather than chat runtime | Integrators needing persistent provider connectors | Provider-neutral connector persistence, atomic snapshots |
| **ZeptoClaw** | — | — | Dormant, no activity |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration at scale (high risk/reward):**
- **OpenClaw** — Massive volume, but release-stalled and reliability-debt-heavy; momentum without closure.
- **IronClaw** — Most mature: v1.2.0 shipped, release line merged back, QA bug-bash fixes landed same-day. Epic-driven (automation reliability #6879) with v1.3.0 in the funnel.
- **ZeroClaw** — High-quality design throughput: RFC decision queue running, 4+ accepted RFCs converting to PRs (#9996/#9997/#9999). Bottleneck is maintainer review, not contributor interest.
- **CoPaw** — High triage velocity (38 issues closed in a day), but 3 high-severity open bugs with no fix PR and repeated unresolved themes (desktop updates, MCP robustness).
- **Hermes** — Fast fix-to-issue loops (Windows LSP issue → fix PR same day), Discord Omniscience campaign landing modular PRs steadily.

**Tier 2 — Steady, healthy cadence:**
- **LobsterAI** — Sustained daily delivery with a release shipped; some March/April PRs still stale.
- **NanoBot** — Balanced open/closed ratio; maintainers responsive; larger architectural PRs (MCP v2, terminal UI) awaiting decisions.
- **NanoClaw / PicoClaw** — Maintenance-focused with prompt fix PRs for reported bugs; PicoClaw's critical MCP-hang fix (#3337) needs review bandwidth.

**Tier 3 — Stable / low activity:**
- **NullClaw** — Pristine backlog (0 open issues/PRs), fast PR processing, minimal scope; healthy but low-volume.
- **Moltis** — Quiet; one large connector PR with no visible reviews.

**Tier 4 — Dormant:**
- **ZeptoClaw** — No activity in the window.

**Maturity signals:** IronClaw leads on release engineering (canaries, migrations, forward-porting); ZeroClaw leads on design governance (RFC queue, stabilization line); NullClaw leads on backlog hygiene; OpenClaw leads on ecosystem gravity but not on user-facing stability.

---

## 7. Trend Signals

1. **Reliability of unattended operation is the #1 trust barrier.** Silent reply failures (OpenClaw #121058), automation flakiness (IronClaw #6879), and cron wedges (multiple projects) show that prompt-dependent behavior is no longer acceptable. Agent developers should build determinism, typed outcomes, retry, and observability into automation from day one.

2. **MCP has won as the integration standard — but its failure modes are universal.** Every MCP-connected project in this window has a fragility bug: connection-failure hangs, tool-not-found after upgrades, duplicate tool results, unbounded response bodies. Robust timeouts, error isolation, and payload caps are table stakes.

3. **Channel parity is a moving target, not a checkbox.** WhatsApp media handling, Telegram 2FA and model pickers, MS Teams multi-bot identity, Discord thread lifecycle, Feishu session isolation — the highest-signal bugs are channel-specific. A good channel abstraction must include per-channel media, presence, and identity semantics, not just message routing.

4. **OpenAI-compatible protocol access is a growing pull.** ZeroClaw's Chat Completions profile RFC (19 comments) and CoPaw's Responses API requests reflect demand from the Open WebUI / LobeChat / Continue.dev ecosystem. Exposing agents as standard HTTP endpoints is becoming a distribution advantage.

5. **Model/provider abstraction is now a product surface, not plumbing.** Dynamic model discovery, per-model cost logging, per-session model overrides, OAuth status/expiry visibility, and fallback endpoints are user-visible features across OpenClaw, ZeroClaw, CoPaw, NanoBot, and Hermes. Provider flexibility is a competitive differentiator.

6. **Security and consent policy are moving up the roadmap.** Install-policy acknowledgements, high-risk shell command confirmation, pluggable OIDC auth, staged telemetry, and redaction correctness (e.g., Solana addresses being wrongly redacted, ZeroClaw #9486) indicate enterprise/privacy-sensitive users are entering the ecosystem.

7. **Windows remains structurally underserved.** 74 Windows test failures (ZeroClaw), LSP `.cmd` resolution bugs (Hermes), cmd.exe quoting (NanoClaw), and auto-update gaps (CoPaw) persist across the ecosystem. Cross-platform CI and Windows-specific fixes are a clear differentiation opportunity.

8. **Memory is becoming pluggable and deployable.** IronClaw's MCP-backed memory provider (first consumer: Mnesis), NullClaw's configurable SQLite path for read-only deployments, and ZeroClaw's hosted-memory debate all point to memory as an external, configurable service rather than a baked-in runtime.

**Bottom line for AI agent developers:** build determinism, provider abstraction, and policy hooks as core architecture — not afterthoughts; treat MCP clients and channel adapters as first-class reliability surfaces; and ship Windows support early, because no one else has done it well yet.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-15

## Today's Overview

NanoBot saw a high level of GitHub activity over the past 24 hours, with **22 PRs updated** (14 open, 8 closed/merged) and **3 issues updated** (1 open, 2 closed). No new releases were cut in this window. The main development themes are WebUI polish and localization, session persistence safety, provider timeout behavior, and internal code quality improvements such as narrowing Pyright suppressions. The mixed stack of small fixes and larger feature PRs indicates a healthy, actively maintained project with a steady stream of community contributions.

## Releases

No new releases were published during this period.

## Project Progress

Several PRs moved to closed/merged status in the last 24 hours:

- **#5392** — `fix(anthropic): treat stream idle timeout as inactivity only, not total time` — fixes #5391, keeping long but active Anthropic generations alive.  
  https://github.com/HKUDS/nanobot/pull/5392
- **#5395** — `feat(webui): refine conversation groups and shared shapes` — improves conversation group terminology, drag behavior, and WebUI styling consistency.  
  https://github.com/HKUDS/nanobot/pull/5395
- **#5393** — `feat(webui): polish sidebar and session transitions` — a UI-only cleanup split from the collaboration work in #5358.  
  https://github.com/HKUDS/nanobot/pull/5393
- **#4689** — `feat(providers): surface OAuth status and expiry warnings` — closed after a longer review period; labeled `invalid` / `conflict` in its final state.  
  https://github.com/HKUDS/nanobot/pull/4689
- **#5018** — `feat(skills): support explicit context loading` — closes a gap where `skill_names` was accepted but ignored when building system prompts.  
  https://github.com/HKUDS/nanobot/pull/5018
- **#5390** — `Agent/knowledge graph` — closed as a chore/feature contribution with no detailed summary.  
  https://github.com/HKUDS/nanobot/pull/5390

Beyond the visible closed set, the project has 14 open PRs actively being worked, especially in WebUI features, session fixes, and provider/MCP integration.

## Community Hot Topics

The most active conversation item in the issue tracker is **#5161**, which currently has 1 comment and remains open:

- **#5161** — `refactor: narrow file-level Pyright suppressions` — discusses removing broad per-file type-checking suppressions after enabling `strict` mode.  
  https://github.com/HKUDS/nanobot/issues/5161

PRs are sorted by comment count, though exact comment numbers were not available in this dataset. The high-visibility PRs receiving attention include:

- **#5396** — Pyright suppression narrowing, fixing #5161.  
  https://github.com/HKUDS/nanobot/pull/5396
- **#5309** — Allow marketplace skills to shadow built-in skills.  
  https://github.com/HKUDS/nanobot/pull/5309
- **#5152** — Mark partial subagent completion results so the model does not infer unfinished work.  
  https://github.com/HKUDS/nanobot/pull/5152
- **#5271** — Prevent stale background task saves from overwriting session data after `/new`.  
  https://github.com/HKUDS/nanobot/pull/5271
- **#5367** — Localize WebUI agent activity across all 10 supported locales.  
  https://github.com/HKUDS/nanobot/pull/5367

The underlying needs cluster around **developer experience** (type safety), **data-safety under concurrency**, **skills marketplace behavior**, and **better WebUI usability/localization**.

## Bugs & Stability

The following bugs and stability issues were updated in the last 24 hours, ranked roughly by severity:

1. **High — Stale background saves can overwrite session data**  
   #5271 (open PR) aims to prevent stale background work from overwriting a session after lifecycle changes such as `/new`. This is the most serious data-integrity issue in the active queue.  
   https://github.com/HKUDS/nanobot/pull/5271

2. **Medium-High — File-cap archive failure mutates session before persistence**  
   #5378 (closed issue) reports that `Session.enforce_file_cap()` discards overflow data in memory before the archive callback runs. If the callback fails, the caller is left with a mutated session even though persistence failed. No fix PR is visible yet.  
   https://github.com/HKUDS/nanobot/issues/5378

3. **Medium-High — Windows `os.replace()` PermissionError crashes session saves**  
   #5382 (open PR) adds retry logic for transient `[WinError 5] Access is denied` during the heartbeat cron job’s session save.  
   https://github.com/HKUDS/nanobot/pull/5382

4. **Medium — Anthropic stream idle timeout behaves as a total timeout**  
   #5391 (closed issue) was fixed by #5392. `NANOBOT_STREAM_IDLE_TIMEOUT_S` was terminating long but active generations on the no-callback stream path.  
   https://github.com/HKUDS/nanobot/issues/5391  
   https://github.com/HKUDS/nanobot/pull/5392

5. **Medium — Marketplace skills cannot shadow built-in skills**  
   #5309 (open PR) fixes a UI/installation issue where bundled skills like `github` cannot be overridden by workspace copies.  
   https://github.com/HKUDS/nanobot/pull/5309

6. **Low/UX — Assistant actions appear before the turn ends**  
   #5371 (open PR) hides copy/fork actions until the containing agent turn receives `turn_end`.  
   https://github.com/HKUDS/nanobot/pull/5371

## Feature Requests & Roadmap Signals

Several feature-oriented PRs are actively moving or waiting for review:

- **WebUI localization of agent activity** — #5367  
  https://github.com/HKUDS/nanobot/pull/5367
- **Drag-and-drop session organization** — #5389  
  https://github.com/HKUDS/nanobot/pull/5389
- **Session collaboration via mentions** — #5358  
  https://github.com/HKUDS/nanobot/pull/5358
- **Improved setup flows across chat channels** — #5356  
  https://github.com/HKUDS/nanobot/pull/5356
- **Native TypeScript terminal UI** — #4329  
  https://github.com/HKUDS/nanobot/pull/4329
- **MCP SDK v2 migration with legacy compatibility** — #5179  
  https://github.com/HKUDS/nanobot/pull/5179
- **Explicit skill context loading** — #5018  
  https://github.com/HKUDS/nanobot/pull/5018
- **Interactive particle hero background** — #5340  
  https://github.com/HKUDS/nanobot/pull/5340

The near-term roadmap appears to center on **WebUI interaction and organization**, followed by **provider/MCP modernization**. The closed WebUI polish PRs (#5393, #5395) suggest the collaboration/mentions feature may be split into smaller merges before the larger #5358 lands.

## User Feedback Summary

Real user pain points visible in the current data include:

- Long-running Anthropic generations being killed by what should be an idle-only timeout (#5391).
- Session saves crashing on Windows due to transient file permission errors (#5382).
- Risk of stale background saves overwriting active session state (#5271).
- Expired/overflow file-cap data being lost if archive callbacks fail (#5378).
- Inability to override built-in skills with marketplace or workspace versions (#5309).
- Assistant actions shown before a turn actually ends, creating confusing UI state (#5371).
- Lack of OAuth status/expiry visibility in provider UX (#4689).
- Desire for full WebUI localization and more flexible session grouping (#5367, #5395, #5389).

The presence of targeted fix PRs for most of these issues suggests maintainers are responsive and community-reported bugs are being acted on quickly. No explicit satisfaction/dissatisfaction ratings are available in this dataset.

## Backlog Watch

Several important items have been open for a while and may need maintainer attention:

- **#5161** — Open issue since 2026-07-29; the fixing PR #5396 is now available and should be reviewed.  
  https://github.com/HKUDS/nanobot/issues/5161  
  https://github.com/HKUDS/nanobot/pull/5396
- **#4329** — Native TypeScript terminal UI, open since 2026-06-13; large product-direction change waiting for a decision.  
  https://github.com/HKUDS/nanobot/pull/4329
- **#4145** — Weather Skill contribution, open since 2026-06-01; one of the longest-pending community PRs.  
  https://github.com/HKUDS/nanobot/pull/4145
- **#5152** — Subagent partial completion result marking, open since 2026-07-28.  
  https://github.com/HKUDS/nanobot/pull/5152
- **#5179** — MCP SDK v2 migration, open since 2026-07-30 with important compatibility considerations.  
  https://github.com/HKUDS/nanobot/pull/5179
- **#5309** — Marketplace skills shadowing builtins, open since 2026-08-09.  
  https://github.com/HKUDS/nanobot/pull/5309

Overall, NanoBot is showing robust community engagement and a strong maintainer response loop. The long-running PRs are mostly larger architectural or UX features, while smaller bug fixes are moving through quickly.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

## Today's Overview

As of 2026-08-15, Hermes Agent is highly active: 50 issues and 50 PRs were updated in the last 24 hours, with 39 issues still open and 11 closed, plus 45 open PRs and 5 merged/closed PRs. No new release was published. The clearest development theme is the Discord Omniscience campaign (#79564), with many new feature issues and paired PRs landing as small, self-contained modules. Maintenance work continues around desktop UI-zoom persistence, dashboard session-resume regressions, TUI compatibility, and Windows-specific LSP issues. Project health looks stable: fresh bug reports are getting quick fixes, including a Windows LSP fix PR opened the same day as the issue.

## Releases

None.

## Project Progress

Of the 5 merged/closed PRs in the last 24 hours, two are visible in the sampled data:

- [PR #81868](https://github.com/NousResearch/hermes-agent/pull/81868) — `test(lsp)`: avoid hardcoding `/usr/bin/npm` in the install-target filter; fixes a Windows-only test failure.
- [PR #81809](https://github.com/NousResearch/hermes-agent/pull/81809) — `fix(anthropic)`: add `api.anthropic.com` fallback to Anthropic OAuth token endpoints; unblocks OAuth on networks that block `platform.claude.com` / `console.anthropic.com`.

Open PRs advancing features and fixes:

- Discord Omniscience modules: [PR #86458](https://github.com/NousResearch/hermes-agent/pull/86458) (forum actions), [PR #86454](https://github.com/NousResearch/hermes-agent/pull/86454) (thread lifecycle), [PR #86449](https://github.com/NousResearch/hermes-agent/pull/86449) (message edit/delete), [PR #86451](https://github.com/NousResearch/hermes-agent/pull/86451) (poll projection), [PR #86440](https://github.com/NousResearch/hermes-agent/pull/86440) (message model), [PR #86442](https://github.com/NousResearch/hermes-agent/pull/86442) (reliability telemetry), [PR #86437](https://github.com/NousResearch/hermes-agent/pull/86437) (pagination), [PR #86432](https://github.com/NousResearch/hermes-agent/pull/86432) (guild settings).
- [PR #86433](https://github.com/NousResearch/hermes-agent/pull/86433) adds GLM-5.3 support to the zai provider.
- [PR #86415](https://github.com/NousResearch/hermes-agent/pull/86415) removes the first-run provider-picker wall on desktop by minting a guest account in the background.
- [PR #86434](https://github.com/NousResearch/hermes-agent/pull/86434) fixes TUI gateway `/context` so it routes through the live session instead of spawning an isolated worker.
- Risk-heavy delegation PRs remain open: [PR #68499](https://github.com/NousResearch/hermes-agent/pull/68499) separates delegation lifecycle from task outcome, and [PR #83485](https://github.com/NousResearch/hermes-agent/pull/83485) identifies internal delegation completion events.

## Community Hot Topics

- [Issue #60693](https://github.com/NousResearch/hermes-agent/issues/60693) — GUI zoom 110% intermittently resets to 100%; 13 comments, closed. Users are repeatedly hitting desktop zoom-state loss.
- [Issue #80424](https://github.com/NousResearch/hermes-agent/issues/80424) — Grok/xAI Feature Parity & Alignment Campaign meta-issue; 10 comments, open, `needs-decision`. Strong community interest in matching xAI platform capabilities.
- [Issue #64425](https://github.com/NousResearch/hermes-agent/issues/64425) — Dashboard sidebar session resume does not display history; 5 comments, 1 👍, closed. Session-resume trust is a recurring concern.
- [Issue #77472](https://github.com/NousResearch/hermes-agent/issues/77472) — Security: request dumps, trajectory/MoA JSONL, pending_messages, and `/save` persist unredacted tool content; 5 comments, open.
- [Issue #35530](https://github.com/NousResearch/hermes-agent/issues/35530) — TUI not resizing properly, SIGWINCH fallback requested; 4 comments, open.
- [Issue #8751](https://github.com/NousResearch/hermes-agent/issues/8751) — PermissionError when walking parent directories for `.git` root; 3 comments, open.

PR comment counts were not populated in the exported data, but the Discord Omniscience PR cluster was the most active by volume.

Underlying needs: users expect desktop settings to stick, dashboard sessions to restore accurately, and the agent to handle unusual environments — permissions, terminals, Windows wrappers, and provider edge cases — without data loss or access failures.

## Bugs & Stability

Ranked by severity and attention:

- **P2 Security** — [Issue #77472](https://github.com/NousResearch/hermes-agent/issues/77472): unredacted tool content persisted in request dumps, trajectory/MoA JSONL, `pending_messages`, and `/save`. Open, `needs-repro`.
- **P2 macOS Regression** — [Issue #86385](https://github.com/NousResearch/hermes-agent/issues/86385): stale Screen Recording TCC grant after signing fix #73681 causes a permission loop with no re-grant path.
- **P2 Working-directory bug** — [Issue #86411](https://github.com/NousResearch/hermes-agent/issues/86411): explicit `terminal.cwd` re-pins the working directory mid-turn, overriding the launch directory on the local backend.
- **P2 Long-standing** — [Issue #8751](https://github.com/NousResearch/hermes-agent/issues/8751): multiple functions in `prompt_builder.py` crash with `PermissionError` while walking parent directories.
- **P3 Windows LSP** — [Issue #86445](https://github.com/NousResearch/hermes-agent/issues/86445): staging resolves the extension-less POSIX shim instead of `.cmd`, causing WinError 193. Fix PR [PR #86456](https://github.com/NousResearch/hermes-agent/pull/86456) already exists.
- **P3 Provider bug** — [Issue #86403](https://github.com/NousResearch/hermes-agent/issues/86403): Xiaomi MiMo v2.5 Pro does not expose enabled tools to the model; `needs-repro`.
- **P3 Desktop** — [Issue #84274](https://github.com/NousResearch/hermes-agent/issues/84274): UI zoom drops to 100% after Windows RDP disconnect/reconnect.
- **P3 Duplicate** — [Issue #86393](https://github.com/NousResearch/hermes-agent/issues/86393): Kanban runtime `TERMINAL_CWD` is misreported as a deprecated `.env` setting.

Older regressions updated today include dashboard session-resume failures ([#64425](https://github.com/NousResearch/hermes-agent/issues/64425), [#63701](https://github.com/NousResearch/hermes-agent/issues/63701), [#59591](https://github.com/NousResearch/hermes-agent/issues/59591)), TUI issues ([#66490](https://github.com/NousResearch/hermes-agent/issues/66490), [#41480](https://github.com/NousResearch/hermes-agent/issues/41480)), and the zoom-reset cluster ([#60693](https://github.com/NousResearch/hermes-agent/issues/60693), [#82713](https://github.com/NousResearch/hermes-agent/issues/82713), [#81879](https://github.com/NousResearch/hermes-agent/issues/81879), [#50837](https://github.com/NousResearch/hermes-agent/issues/50837)). Several of these are now closed as duplicates or resolved triage.

## Feature Requests & Roadmap Signals

- [Issue #80424](https://github.com/NousResearch/hermes-agent/issues/80424) — Grok/xAI Feature Parity meta-issue: broad alignment request with xAI docs; labeled `needs-decision`, could become a roadmap epic.
- Discord Omniscience campaign (#79564) is the clearest next-version signal. New issue/PR pairs cover forum actions ([#86457](https://github.com/NousResearch/hermes-agent/issues/86457)), thread lifecycle ([#86453](https://github.com/NousResearch/hermes-agent/issues/86453)), guild settings ([#86431](https://github.com/NousResearch/hermes-agent/issues/86431)), pagination conformance ([#86436](https://github.com/NousResearch/hermes-agent/issues/86436)), message model ([#86439](https://github.com/NousResearch/hermes-agent/issues/86439)), reliability telemetry ([#86441](https://github.com/NousResearch/hermes-agent/issues/86441)), poll projection ([#86450](https://github.com/NousResearch/hermes-agent/issues/86450)), message edit/delete ([#86448](https://github.com/NousResearch/hermes-agent/issues/86448)), permissions ([#86428](https://github.com/NousResearch/hermes-agent/issues/86428)), and reactions ([#86418](https://github.com/NousResearch/hermes-agent/issues/86418)).
- [PR #86433](https://github.com/NousResearch/hermes-agent/pull/86433) — GLM-5.3 support for zai; likely to ride existing GLM-5.2 wiring into a near-term release.
- [PR #86415](https://github.com/NousResearch/hermes-agent/pull/86415) — Desktop first run opens directly into a working chat with a background guest account; a UX-focused improvement.
- [PR #67454](https://github.com/NousResearch/hermes-agent/pull/67454) — DB-level cross-process turn serialization; architectural, `needs-decision`, and relevant to multi-process session reliability.

## User Feedback Summary

- **Desktop zoom persistence is the most repeated complaint.** Users report saved zoom levels (90%, 110%, 125%) being silently ignored after focus loss, RDP reconnect, or launching other Electron apps. Duplicates across Windows and macOS indicate a cross-platform root cause.
- **Dashboard session-resume trust is weak.** Users expect clicking a past session to show the prior transcript; multiple reports ([#64425](https://github.com/NousResearch/hermes-agent/issues/64425), [#59591](https://github.com/NousResearch/hermes-agent/issues/59591), [#63701](https://github.com/NousResearch/hermes-agent/issues/63701)) describe blank or incomplete chat history until a refresh or second click.
- **TUI users continue to hit terminal-compatibility pain**: resize misalignment ([#35530](https://github.com/NousResearch/hermes-agent/issues/35530)), Zellij scrollback spam ([#66490](https://github.com/NousResearch/hermes-agent/issues/66490)), and status-bar flicker during streaming ([#41480](https://github.com/NousResearch/hermes-agent/issues/41480)).
- **macOS upgrade friction**: users who previously granted Screen Recording to an older build are stuck in a permission loop after the signing change ([#86385](https://github.com/NousResearch/hermes-agent/issues/86385)).
- **Windows LSP failures** are immediate and blocking for affected users because language-server binaries resolve to POSIX shims ([#86445](https://github.com/NousResearch/hermes-agent/issues/86445)); a fix is already in review.

## Backlog Watch

- [Issue #8751](https://github.com/NousResearch/hermes-agent/issues/8751) — open since 2026-04-13, P2: `PermissionError` while walking parent directories; last updated 2026-08-14.
- [Issue #35530](https://github.com/NousResearch/hermes-agent/issues/35530) — open since 2026-05-30, P3: TUI resize fallback; low comment count but recurring terminal compatibility class.
- [Issue #80424](https://github.com/NousResearch/hermes-agent/issues/80424) — open since 2026-08-06, `needs-decision`: Grok/xAI parity meta-issue with 10 comments and no maintainer decision.
- [Issue #77472](https://github.com/NousResearch/hermes-agent/issues/77472) — open since 2026-08-03, P2 security: unredacted tool-content residuals; still `needs-repro`.
- [PR #67454](https://github.com/NousResearch/hermes-agent/pull/67454) — open since 2026-07-19, `needs-decision`: cross-process turn serialization with DB-level leases.
- [PR #68499](https://github.com/NousResearch/hermes-agent/pull/68499) — open since 2026-07-21, P2: delegation lifecycle separation; broad blast radius needs careful maintainer review.
- [Issue #73495](https://github.com/NousResearch/hermes-agent/issues/73495) — open since 2026-07-28, P3: Desktop Cloud cold start can hide agents until Portal re-login.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-15

## 1. Today's Overview
PicoClaw saw moderate activity over the last 24 hours: 3 issues were updated (1 open, 2 closed) and 9 pull requests were updated (4 open, 5 closed/merged). No new releases were published. The most significant signal is the open MCP connection-failure hang bug (#3269), which has a fresh fix PR (#3337) awaiting review. Several older PRs and issues were moved to closed/stale state, suggesting maintainers are cleaning up inactive work. Overall, the project remains actively maintained, with a clear focus on reliability and channel integration.

## 2. Releases
No new releases were published in this period.

## 3. Project Progress
Five PRs moved to closed/merged state in the last 24 hours:

- **#3270** – Added DashScope TTS provider and WeChat audio file sending.  
  https://github.com/sipeed/picoclaw/pull/3270
- **#3271** – Refreshed default model names across 9 providers to July 2026 latest versions.  
  https://github.com/sipeed/picoclaw/pull/3271
- **#3279** – Fixed tool-call format leaking into LLM summaries via seahorse’s `partsToReadableContent`.  
  https://github.com/sipeed/picoclaw/pull/3279
- **#3283** – Added inbound picture/image message support for the DingTalk channel.  
  https://github.com/sipeed/picoclaw/pull/3283
- **#3303** – Dependency bump: actions/stale from v10 to v11.  
  https://github.com/sipeed/picoclaw/pull/3303

Note: Most of these carry the `[stale]` label, so they may have been closed due to inactivity rather than merged.

Still-open PRs of note include the MCP hang fix (#3337), DeltaChat cleanup (#3222), configurable fallback chain (#3200), and exec tool timeout/boolean fixes (#3319).

## 4. Community Hot Topics
- **#3269 – [BUG] MCP server connection failure hangs the agent loop** – 5 comments, 1 👍, open.  
  https://github.com/sipeed/picoclaw/issues/3269  
  This is the most active discussion: when an MCP server fails, the entire chat interface stops replying. The underlying need is robust error recovery for external tool connections. A fix PR (#3337) was opened and directly addresses this.

- **#3308 – Code review: concurrency hazards, goroutine leaks, and memory/speed optimizations** – 2 comments, closed/stale.  
  https://github.com/sipeed/picoclaw/issues/3308  
  Although closed as stale, it reflects community interest in deeper code quality auditing.

- **#3307 – Session list/switch command for Telegram and other chat channels** – 2 comments, closed/stale.  
  https://github.com/sipeed/picoclaw/issues/3307  
  Users want Web UI session-management parity on non-Web channels.

## 5. Bugs & Stability
- **High severity: #3269 – MCP failure hangs agent loop / chat stops replying.**  
  This is the most serious stability issue currently visible. A fix is proposed in **PR #3337**: `Fix/mcp failure hangs agent loop`.  
  https://github.com/sipeed/picoclaw/pull/3337

- **Medium severity: PR #3319 – `exec` tool ignores per-run timeout and boolean options.**  
  The tool schema declares `background` and `pty` as strings instead of booleans, and synchronous execution ignores the supplied `timeout`. This remains open.  
  https://github.com/sipeed/picoclaw/pull/3319

- **Fixed/closed: PR #3279 – Tool-call format leaking into LLM summaries.**  
  A second path for this bug class was identified in seahorse and addressed.  
  https://github.com/sipeed/picoclaw/pull/3279

## 6. Feature Requests & Roadmap Signals
- **Telegram/chat-channel session management** (#3307) – Users want `list/switch` commands for sessions outside the Web UI. Although closed as stale, this is a clear parity gap and a plausible next feature.  
  https://github.com/sipeed/picoclaw/issues/3307

- **Configurable default fallback chain** (#3200) – Open PR to let users define model fallback chains in the Web UI and persist them via backend API.  
  https://github.com/sipeed/picoclaw/pull/3200

- **DeltaChat cleanup and improved invitation links** (#3222) – Open refactor reducing LOC and aligning with upstream relay-list documentation.  
  https://github.com/sipeed/picoclaw/pull/3222

- **DashScope TTS and WeChat audio sending** (#3270) – Already in closed/merged batch; signals continued investment in voice and Chinese-channel integrations.

## 7. User Feedback Summary
- The MCP failure bug (#3269) is a real pain point: users experience a completely frozen chat interface when an MCP server is unreachable.
- Telegram users are dissatisfied with missing session management compared to the Web UI (#3307).
- Community members are proactively contributing fixes for tool-call format corruption, exec tool behavior, and channel-specific media support, which indicates healthy engagement.
- The many stale-closed PRs may indicate reviewer bandwidth issues, but not a lack of contributor interest.

## 8. Backlog Watch
- **#3337 (open)** – Critical fix for MCP hangs; needs prompt review and merge.  
  https://github.com/sipeed/picoclaw/pull/3337
- **#3200 (open, since 2026-07-01)** – Model fallback chain feature; waiting for maintainer attention.  
  https://github.com/sipeed/picoclaw/pull/3200
- **#3222 (open, since 2026-07-03)** – DeltaChat refactor and cleanup; long-running PR.  
  https://github.com/sipeed/picoclaw/pull/3222
- **#3319 (open, since 2026-08-07)** – Exec tool timeout and boolean flag fix; important correctness fix.  
  https://github.com/sipeed/picoclaw/pull/3319
- **#3269 (open issue)** – Should remain prioritized until PR #3337 is merged.  
  https://github.com/sipeed/picoclaw/issues/3269

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-15

## Today’s Overview

NanoClaw had a busy maintenance-focused day: **2 open issues** and **9 PRs** were updated, with **3 PRs closed/merged** and **6 PRs still open**. The main threads are setup reliability, prebuilt image CPU compatibility, Windows cleanup behavior, cron scheduling robustness, and the longer-running Dial channel integration. No new release was published in this window. Overall project health looks solid — maintainers have already opened fix PRs for several reported pain points, though the AVX2-dependent prebuilt image remains a notable compatibility risk.

## Releases

No new releases were published in this window.

## Project Progress

Three PRs were closed/merged in the last 24 hours:

- [#3243 — `verify-agent-image`: arming auto-merge is not a verdict](https://github.com/nanocoai/nanoclaw/pull/3243)  
  Prevents an `Enable auto-merge` step failure from incorrectly failing image verification. This fixes false negatives on draft PRs, `allow_auto_merge=false`, and transient API errors.

- [#3242 — DO NOT MERGE: live-fire test of the signature approver](https://github.com/nanocoai/nanoclaw/pull/3242)  
  Closed unmerged by design.

- [#3244 — DO NOT MERGE: live-fire the signature approver (take 2)](https://github.com/nanocoai/nanoclaw/pull/3244)  
  Closed unmerged by design.

No user-facing feature was merged in this window. The closed activity was focused on hardening and exercising the agent-image verification/signature pipeline.

## Community Hot Topics

There were **no issues or PRs with meaningful comment/reaction counts** in this dataset — both open issues have 0 comments and 0 reactions, and PR comment counts were not reported. The items receiving the most update attention were:

- [#3248 — setup.sh cannot handle “Node too old”](https://github.com/nanocoai/nanoclaw/issues/3248)  
  Users with old Node installations cannot get a correct upgrade path because the install helper short-circuits when any Node exists.

- [#3245 — Prebuilt agent image requires AVX2, causing SIGILL](https://github.com/nanocoai/nanoclaw/issues/3245)  
  A hardware-compatibility blocker for older Intel Atom x64 CPUs.

- [#3041 — Dial channel adapter (SMS + AI voice calls)](https://github.com/nanocoai/nanoclaw/pull/3041)  
  Long-running feature PR for adding a new channel.

- [#3050 — Add Dial to channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)  
  Companion setup/wizard integration for the Dial channel.

Underlying needs: smoother setup for varied existing environments, better hardware compatibility for the prebuilt agent image, and new communication-channel support.

## Bugs & Stability

Reported bugs and fixes ranked by severity:

| Severity | Item | Description | Fix Status |
|---|---|---|---|
| High | [#3245 — Prebuilt agent image requires AVX2; SIGILL on CPUs without it](https://github.com/nanocoai/nanoclaw/issues/3245) | The default hardened image uses a Bun binary built for non-baseline x64 with AVX2. CPUs like Intel Celeron J6413/N5105 crash during setup/run. | No fix PR open yet. |
| Medium | [#3248 — setup.sh’s “Node missing or too old” branch cannot handle too-old Node](https://github.com/nanocoai/nanoclaw/issues/3248) | The version check routes old Node into the helper, but `install-node.sh` short-circuits if any Node exists. | [Fix PR #3249](https://github.com/nanocoai/nanoclaw/pull/3249) is open. |
| Medium | [#3247 — Malformed cron string re-errors every sweep tick](https://github.com/nanocoai/nanoclaw/pull/3247) | Bad recurrence strings are logged but never retired, causing repeated errors on every scheduling sweep. | Fix PR #3247 is open. |
| Low/Medium | [#3246 — Windows orphan cleanup silently no-ops](https://github.com/nanocoai/nanoclaw/pull/3246) | POSIX-style quoting in the container-list command breaks under `cmd.exe`, so cleanup does nothing without warning. | Fix PR #3246 is open. |
| Low | [#3230 — Removal docs point at retired data/env mirror](https://github.com/nanocoai/nanoclaw/pull/3230) | Documentation references a retired mirror and should be updated. | Fix PR #3230 is open. |

## Feature Requests & Roadmap Signals

- **Dial channel integration** remains the clearest upcoming feature signal:  
  - [#3041 — Dial channel adapter (SMS + AI voice calls)](https://github.com/nanocoai/nanoclaw/pull/3041)  
  - [#3050 — Add Dial to channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)  

  Both are open and were updated recently. If merged, Dial looks like a likely addition to the next feature release.

- **Baseline x64/AVX2-free prebuilt image** is an implicit roadmap item from [#3245](https://github.com/nanocoai/nanoclaw/issues/3245). Supporting older Intel Atom CPUs may require a hardened image built without AVX2, or a fallback runtime path.

- Smaller patches — Node setup detection, cron-string retirement, and Windows cleanup fixes — are likely candidates for the next patch release.

## User Feedback Summary

Real user pain points visible in this window:

- Users on Intel Tremont/Elkhart Lake Atom CPUs cannot use the recommended hardened agent image due to `SIGILL` from an AVX2-requiring Bun binary.  
  → [#3245](https://github.com/nanocoai/nanoclaw/issues/3245)

- Users with an existing but too-old Node install cannot get `setup.sh` to install a suitable version.  
  → [#3248](https://github.com/nanocoai/nanoclaw/issues/3248)

- Windows users get silent failures from orphan cleanup, making container lifecycle behavior hard to trust.  
  → [#3246](https://github.com/nanocoai/nanoclaw/pull/3246)

- Agent authors who write malformed cron expressions face repeated errors instead of a clean recovery path.  
  → [#3247](https://github.com/nanocoai/nanoclaw/pull/3247)

No direct satisfaction/dissatisfaction comments were captured. The quick existence of fix PRs suggests maintainers are responsive to reported friction.

## Backlog Watch

No long-unanswered issues were present in this window. However, two feature PRs have been open for over a month and should be reviewed or explicitly deferred:

- [#3041 — Dial channel adapter](https://github.com/nanocoai/nanoclaw/pull/3041) — opened 2026-07-14
- [#3050 — Dial channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050) — opened 2026-07-14

Both were updated on 2026-08-14, so they are still active but need maintainer attention to move forward. [#3230](https://github.com/nanocoai/nanoclaw/pull/3230) is a smaller docs fix that also remains open since 2026-08-12.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-15

## 1. Today's Overview
NullClaw saw a quiet day on 2026-08-15 with zero issue activity and a single pull request processed. The one PR, #986, was closed/merged, continuing steady incremental progress on the project's memory engine configuration. No new releases were published. Overall project health appears stable with a clean, actively-maintained backlog. The absence of open issues and open PRs suggests the maintainers are keeping the repository well-groomed.

## 2. Releases
No new releases were published in the last 24 hours. This section is omitted.

## 3. Project Progress
One PR was merged/closed today:

- **[#986 — GEN-548: make SQLite memory database path configurable](https://github.com/nullclaw/nullclaw/pull/986)** (by [gently-whitesnow](https://github.com/gently-whitesnow), created 2026-08-14, closed 2026-08-14)
  - Adds a `memory.database_path` setting for SQLite-backed primary memory engines.
  - Preserves the existing default behavior — `<workspace>/memory.db` is used when the setting is empty.
  - Resolves relative paths from the workspace; accepts absolute paths to support read-only workspace deployments (e.g., containerized or CI environments).
  - Includes documentation for the new setting.

This change advances deployment flexibility for NullClaw's memory layer, making it viable in constrained filesystem environments.

## 4. Community Hot Topics
No issues or PRs had notable comment or reaction activity today. The only PR, #986, received no 👍 reactions and no recorded discussion. There are no active community threads to analyze. The absence of contentious debate suggests a smoothly running contribution process.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. No issues are currently open. Notably, PR #986 indirectly addresses a stability concern for read-only deployments where the previous hardcoded `<workspace>/memory.db` path would fail; this fix preempts that failure mode.

## 6. Feature Requests & Roadmap Signals
While no explicit feature requests were filed today, PR #986 carries strong roadmap signal. The `GEN-548` ticket reference indicates this work originated from the internal roadmap, and the feature itself addresses a real user need: persistent memory storage in environments where the workspace is read-only or ephemeral. Likely drivers include containerized agent deployments, CI/CD sandboxes, and multi-instance setups needing dedicated memory database locations. Expect further deployment-focused enhancements in the next version, possibly including filesystem abstraction for other storage backends or configuration validation for path settings.

## 7. User Feedback Summary
No direct user feedback (comments, reactions, or issue reports) was recorded today. Indirectly, PR #986 reflects a user pain point: managing SQLite memory databases in constrained deployment environments. The careful backward compatibility (empty setting → existing `<workspace>/memory.db` behavior) indicates the maintainers are prioritizing a non-disruptive experience for existing users.

## 8. Backlog Watch
The backlog is currently clear:
- **Open issues:** 0
- **Open PRs:** 0

No items require maintainer attention for being stale or unanswered. The single PR from yesterday was processed and closed within 24 hours, demonstrating responsive maintenance. This is a healthy state for the project.

---

*Data source: [github.com/nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) | Generated 2026-08-15*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-15

## 1. Today's Overview

IronClaw is in a post-1.2.0 stabilization and v1.3.0 feature-acceleration phase. Activity is high: 24 issues and 47 PRs were updated in the last 24 hours, with 9 issues closed, 22 PRs merged/closed, and a stable release line merged back into `main` ([PR #7657](https://github.com/nearai/ironclaw/pull/7657)). The dominant theme is automation reliability — the `#6879` epic generated five new scoped sub-issues and three companion PRs this cycle. Concurrently, a QA bug bash on the Railway test instance surfaced three P2 regressions in Slack, Telegram, and Extensions, with two fix PRs already landed. Release forward-porting ([PR #7663](https://github.com/nearai/ironclaw/pull/7663)) and a new DB write-pressure measurement harness ([PR #7652](https://github.com/nearai/ironclaw/pull/7652)) also landed, indicating a healthy mix of hygiene, performance, and feature work.

---

## 2. Releases

### ironclaw-v1.2.0 — 2026-08-13

Stable promotion of `1.2.0-rc.3`, including all RC1 features and the fixes validated in RC2/RC3.

**Key change highlighted in the notes:**
- The runtime container image now installs `curl`, enabling in-container HTTP healthchecks so orchestrators can probe the worker reliably.

**Merge/forward-port status:**
- The validated `release/2026-08-11` line was merged back into `main` ([PR #7657](https://github.com/nearai/ironclaw/pull/7657)), carrying 1.0/1.1→1.2 startup migrations, release artifact upgrade canaries, and Windows filesystem/smoke fixes.
- A follow-up forward-port PR ([#7663](https://github.com/nearai/ironclaw/pull/7663)) re-applies the independently validated fixes onto current `main` **without** legacy migration paths: thread-index projection repair, Windows filesystem/smoke reliability, clean Windows JSON output, and runtime `curl` for healthchecks.

**Breaking changes / migration notes:** None published. The merge-back PR preserves state-migrating startup paths, so upgrades from 1.0/1.1 are covered.

---

## 3. Project Progress

**Merged/closed PRs today (7):**

| PR | Area | Summary |
|---|---|---|
| [#7657](https://github.com/nearai/ironclaw/pull/7657) | Release | Merged the validated 1.2.0 release line back into `main` with migrations and canaries |
| [#7668](https://github.com/nearai/ironclaw/pull/7668) | Extensions/Auth | Surface bounded GitHub provider auth diagnostics through WASM ABI, capability, and gate paths so model turns see the real 401 reason |
| [#7665](https://github.com/nearai/ironclaw/pull/7665) | Auth/MCP | Admit origin-scoped hosted-MCP OAuth (RFC 9728 resource on a bare origin), persisting resource and metadata URL through DCR/token refresh |
| [#7652](https://github.com/nearai/ironclaw/pull/7652) | Performance | Measure production-wired DB write workloads: 10-capability agent turn, idle process with claim polling, heartbeats, and recovery sweeps |
| [#7666](https://github.com/nearai/ironclaw/pull/7666) | Extensions/UI | "Tell the truth" on extension cards and install results; device-link installs now direct users to the Web UI link step |
| [#7655](https://github.com/nearai/ironclaw/pull/7655) | CI | Re-pinned slack/telegram integration coverage ratchet floors to observed main gate output |
| [#7658](https://github.com/nearai/ironclaw/pull/7658) | Telegram | Recognize the 2FA gate on migrated DCs and surface where login codes are delivered |

**Closed issues today (9):**
- [Feature] Slack-to-Console bridge with response metadata — [#7656](https://github.com/nearai/ironclaw/issues/7656)
- [UI] Shared `SearchField` for list filtering across Settings/Registry/Threads — [#7569](https://github.com/nearai/ironclaw/issues/7569)
- [Perf] Tier-0 per-turn DB write measurement harness (`pg_stat_statements` baseline) — [#7592](https://github.com/nearai/ironclaw/issues/7592)
- [i18n] Missing translation coverage on exposed WebUI routes — [#7565](https://github.com/nearai/ironclaw/issues/7565)
- [v1.3.0] Structured execution specs for scheduled automations — [#7532](https://github.com/nearai/ironclaw/issues/7532)
- [Epic] Dogfooding & QA bug fixing 08/10–08/16 — [#7414](https://github.com/nearai/ironclaw/issues/7414)
- [Feature] Per-user LLM model selection (was admin-only) — [#7183](https://github.com/nearai/ironclaw/issues/7183)
- [Epic] Retire superseded/unreachable WebUI frontend surfaces — [#7520](https://github.com/nearai/ironclaw/issues/7520)
- [Bug] DOCX files unreadable by Word — [#6869](https://github.com/nearai/ironclaw/issues/6869)

**Feature work advanced (open PRs):**
- Automations: deterministic no-result suppression ([#7651](https://github.com/nearai/ironclaw/pull/7651)) and persisted semantic execution outcomes ([#7650](https://github.com/nearai/ironclaw/pull/7650)).
- Unbound turns: switchover to prepared-context turns ([#7634](https://github.com/nearai/ironclaw/pull/7634), stacked on [#7562](https://github.com/nearai/ironclaw/pull/7562)).
- Pluggable memory: MCP-backed memory provider crate ([#7661](https://github.com/nearai/ironclaw/pull/7661)).
- Experimental ACP runtime harness executor ([#7648](https://github.com/nearai/ironclaw/pull/7648)).
- Heartbeat journal churn removal for processes ([#7628](https://github.com/nearai/ironclaw/pull/7628)).

---

## 4. Community Hot Topics

**1. Automation reliability epic — Issue [#6879](https://github.com/nearai/ironclaw/issues/6879)** (open since 07-29, the only issue with comments this cycle)
The epic "Automation runs are hit-or-miss" is the single largest center of gravity. It spawned five scoped v1.3.0 sub-issues this cycle: preflight grants/standing approval leases ([#7646](https://github.com/nearai/ironclaw/issues/7646)), per-automation LLM model pinning ([#7645](https://github.com/nearai/ironclaw/issues/7645)), verify-before-arm ([#7644](https://github.com/nearai/ironclaw/issues/7644)), and deterministic no-delivery outcome ([#7647](https://github.com/nearai/ironclaw/issues/7647)). Two implementation PRs are open ([#7650](https://github.com/nearai/ironclaw/pull/7650), [#7651](https://github.com/nearai/ironclaw/pull/7651)). **Underlying need:** users cannot trust unattended scheduled runs to behave deterministically; the team is replacing prompt-dependent behavior with typed execution contracts, explicit suppression semantics, and grant preflight.

**2. QA bug-bash issues from joe-rlo** — [#7659](https://github.com/nearai/ironclaw/issues/7659), [#7660](https://github.com/nearai/ironclaw/issues/7660), [#7662](https://github.com/nearai/ironclaw/issues/7662)
Three P2 findings from the Railway `qa-testing-libsql` instance in a single day indicate active dogfooding. Underlying needs: trustworthy UI state, no cross-user data leakage, and correct media handling in Telegram.

**3. MCP pluggable memory** — [#7664](https://github.com/nearai/ironclaw/issues/7664) with draft PR [#7661](https://github.com/nearai/ironclaw/pull/7661)
The community/ecosystem signal: external memory systems (first consumer: Mnesis Core) should be bindable by configuration rather than compiled factory arms. Suggests growing third-party integration interest.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Description | Status |
|---|---|---|---|
| **High** | [#7659](https://github.com/nearai/ironclaw/issues/7659) | Extensions installed by *other users* appear as installed on the Extensions/Registry page — suggests extension state leaking between users (privacy/tenancy concern) | Open |
| **Medium** | [#7660](https://github.com/nearai/ironclaw/issues/7660) | Slack UI shows "Reconnect" / "Finish Setup" badges despite an active, verified connection — misleading state on Messaging Channels | **Fix merged** in [#7666](https://github.com/nearai/ironclaw/pull/7666) |
| **Medium** | [#7662](https://github.com/nearai/ironclaw/issues/7662) | MP4 attachment send fails with `invalid_value (attachments.mime_type)` although the file is recognized as `video/mp4` | Open |
| **Low** | [#7667](https://github.com/nearai/ironclaw/issues/7667) | Telegram phone-mode login hint doesn't reflect `sentCode.type_` after `PHONE_MIGRATE_1`; user didn't receive code where expected | Open; related fix [#7658](https://github.com/nearai/ironclaw/pull/7658) covers the 2FA gate on migrated DCs |
| **Resolved** | [#6869](https://github.com/nearai/ironclaw/issues/6869) | Generated DOCX files unreadable by Word (corruption) | Closed |

Additional stability signal: the heartbeat-churn reduction PR ([#7628](https://github.com/nearai/ironclaw/pull/7628)) addresses a systemic performance concern — `ProcessJournalKind::Heartbeat` rows and reserved cursors were inflating DB write pressure; the fix keeps lease timestamps authoritative on the materialized row.

---

## 6. Feature Requests & Roadmap Signals

**Likely v1.3.0 (actively worked):**
- **Structured automation contract**: frozen execution specs, model pinning, grant preflight, and deterministic `[SILENT]` suppression — issues [#7644](https://github.com/nearai/ironclaw/issues/7644), [#7645](https://github.com/nearai/ironclaw/issues/7645), [#7646](https://github.com/nearai/ironclaw/issues/7646), [#7647](https://github.com/nearai/ironclaw/issues/7647); PRs [#7650](https://github.com/nearai/ironclaw/pull/7650), [#7651](https://github.com/nearai/ironclaw/pull/7651). This is the flagship roadmap item.
- **Pluggable memory over MCP** ([#7664](https://github.com/nearai/ironclaw/issues/7664)): provider crate + Mnesis as first consumer — strategic ecosystem play.
- **Structured Ask User cards in WebUI** ([#7653](https://github.com/nearai/ironclaw/issues/7653)): model-facing `ask` tool using existing `LoopCompletionKind::AskUserReply`, deliberately non-resumable.
- **Unbound turns / prepared-context lanes** (PRs [#7562](https://github.com/nearai/ironclaw/pull/7562), [#7634](https://github.com/nearai/ironclaw/pull/7634)): large architectural switchover nearing completion.
- **ACP harness executor** ([#7624](https://github.com/nearai/ironclaw/issues/7624), PR [#7648](https://github.com/nearai/ironclaw/pull/7648)): dev-only YOLO slot to validate pluggable loop architecture.

**Shipped/closed recently (confirmed next-version features):**
- Per-user LLM model selection ([#7183](https://github.com/nearai/ironclaw/issues/7183)) — a user-facing request from the Champions check-in, now closed.
- Slack-to-Console bridge with deep links and run metadata ([#7656](https://github.com/nearai/ironclaw/issues/7656)).

**Design-system consolidation (frontend hygiene):**
- Shared `InlineNotice` ([#7639](https://github.com/nearai/ironclaw/issues/7639)), typed design-system props ([#7637](https://github.com/nearai/ironclaw/issues/7637)), toast-based thread-deletion errors ([#7638](https://github.com/nearai/ironclaw/issues/7638)) — predictable UI-quality roadmap.

---

## 7. User Feedback Summary

- **Davin Basi (external user)** — Reported that ChatGPT/Claude could produce marked-up NDA `.docx` files but IronClaw failed twice (protocol violation, then unreadable Word file). The project closed the issue ([#6869](https://github.com/nearai/ironclaw/issues/6869)) — a notable competitive-parity complaint that appears addressed.
- **Jeremy Koch / Sergey (Champions check-in)** — Requested per-user LLM model selection because admin-only model config was too rigid for a marketing use case. Closed today ([#7183](https://github.com/nearai/ironclaw/issues/7183)) — direct feedback-to-shipped-feature loop.
- **QA dogfooding (joe-rlo)** — Three P2 findings today signal that the team is actively exercising the Railway-hosted test instance; the Slack false-state bug ([#7660](https://github.com/nearai/ironclaw/issues/7660)) was fixed the same day, showing a tight feedback-to-fix cadence.
- **Automation reliability (implied)** — The recurring theme of `#6879` is user-visible flakiness in unattended runs; the project is responding with structural fixes rather than model tweaks (audit-driven, typed contracts).

Overall sentiment: responsive maintainers, fast turnaround on community/QA-reported bugs, and a clear path from user feedback to roadmap items.

---

## 8. Backlog Watch

Items needing continued attention:

- **Issue #6879 — Automation reliability epic** ([link](https://github.com/nearai/ironclaw/issues/6879)) — Open since 07-29 with only 1 comment, but driving 10+ sub-issues/PRs. As the flagship v1.3.0 item, it deserves more visible public tracking.
- **PR #7255 — APDD governance kit evaluation** ([link](https://github.com/nearai/ironclaw/pull/7255)) — Open since 08-05 by a regular contributor; docs-only, no maintainer activity in the last day. Risk of stalling.
- **PR #7379 — Public docs from `docs-live` branch** ([link](https://github.com/nearai/ironclaw/pull/7379)) — Open since 08-07; addresses docs↔release skew (site describes unreleased behavior). Important for user trust; part 4/5 of a doc-truth series.
- **PR #7378 — Doc-fact contract tests** ([link](https://github.com/nearai/ironclaw/pull/7378)) — Open since 08-07; companion to #7379, no LLM judging, deterministic checks for CLI/manifest/Responses claims.
- **PR #7456 — Profile-agnostic durable storage for Reborn** ([link](https://github.com/nearai/ironclaw/pull/7456)) — Open since 08-10; medium risk, touches sandbox/CI/deps. Tenancy-relevant; should be tracked for review bandwidth.
- **Issue #7664 — Pluggable memory contract publication** ([link](https://github.com/nearai/ironclaw/issues/7664)) — Explicitly calls for "publishing the contract"; external teams (Mnesis) are waiting on this as the first consumer.

---

*Digest generated 2026-08-15 from public IronClaw GitHub data. All links point to https://github.com/nearai/ironclaw.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-15

## 1. Today's Overview

LobsterAI had a high-activity day: 27 PRs were updated, with 22 merged or closed and 5 still open, alongside 2 open issues and 1 new release. The project is clearly in a sustained delivery phase, with multiple cowork, renderer, main-process, and OpenClaw improvements landing together. The main event is the release of **LobsterAI 2026.8.14**, which brings sidebar check-in/banner carousel support and multi-agent task activity filtering. Overall project health appears strong, though a few stale PRs and issues from March/April still await maintainer attention.

## 2. Releases

### LobsterAI 2026.8.14
Released 2026-08-14. Release notes include:

- **`feat(sidebar): support check-in and banner carousel`** by @btc69m979y-dotcom — PR [#2411](https://github.com/netease-youdao/LobsterAI/pull/2411)
- **`feat(sidebar): add multi-agent task activity filter`** by @liuzhq1986 — PR [#2418](https://github.com/netease-youdao/LobsterAI/pull/2418)
- Additional note truncated in source data: `feat(sidebar): mov...`

No breaking changes or migration steps were described in the available release data.

## 3. Project Progress

The 22 merged/closed PRs today show broad progress across the renderer, cowork, OpenClaw, artifacts, main process, docs, and Windows platform areas.

Key advances and fixes:

- **Release integration** — PR [#2498](https://github.com/netease-youdao/LobsterAI/pull/2498) merged the `release/2026.7.30` branch into `main`; it was 67 commits ahead and introduced Team Edition account/quota flows, refreshed Skills/Connectors experience, and changed 264 files.
- **Cowork UX fixes** — PR [#2499](https://github.com/netease-youdao/LobsterAI/pull/2499) fixed turn folding so a turn stays expanded until an answer exists, avoiding empty duration lines that looked like failures. PR [#2496](https://github.com/netease-youdao/LobsterAI/pull/2496) keeps badge popovers within viewport and above later messages.
- **OpenClaw skill toggle fix** — Two PRs addressed the same root cause: PR [#2483](https://github.com/netease-youdao/LobsterAI/pull/2483) and PR [#2491](https://github.com/netease-youdao/LobsterAI/pull/2491) key `skills.entries` by frontmatter name, making UI skill enable/disable toggles work correctly even when directory names and frontmatter names differ.
- **Artifact panel enhancement** — PR [#2490](https://github.com/netease-youdao/LobsterAI/pull/2490) renders browser-annotation screenshots as numbered attachment cards and opens them in a dedicated artifact panel view instead of a generic image modal.
- **Typography update** — PR [#2495](https://github.com/netease-youdao/LobsterAI/pull/2495) bumps default UI/code font sizes with a one-time migration.
- **Account/credits UI polish** — PRs [#2494](https://github.com/netease-youdao/LobsterAI/pull/2494) and [#2492](https://github.com/netease-youdao/LobsterAI/pull/2492) improve the credits icon style and color alignment.
- **Session export & UI fixes** — PR [#2493](https://github.com/netease-youdao/LobsterAI/pull/2493) fixes session image export and card toggle UI.
- **Copy/i18n polish** — PR [#2497](https://github.com/netease-youdao/LobsterAI/pull/2497) improves cowork goal and steer wording.
- **Historical stale PRs closed** — PRs like [#1228](https://github.com/netease-youdao/LobsterAI/pull/1228) (“mark session as unread”), [#1231](https://github.com/netease-youdao/LobsterAI/pull/1231) (AgentCreateModal Escape/reset), and [#2422](https://github.com/netease-youdao/LobsterAI/pull/2422)/[#2423](https://github.com/netease-youdao/LobsterAI/pull/2423) (BTW tools fix and revert) were also closed today.

## 4. Community Hot Topics

Only two issues were active in the last 24 hours, and both have 1 comment.

- **[Issue #1154](https://github.com/netease-youdao/LobsterAI/issues/1154)** — `[stale] 为 commandSafety 和 coworkMemoryJudge 补充 Vitest 单元测试`
  - Author: MaoQianTu | Created 2026-03-31 | Updated 2026-08-14
  - Underlying need: Core safety and memory-quality modules currently have zero test coverage. The community is calling for test guarantees around dangerous-command detection (`rm -rf`, `git push --force`) and memory-write quality scoring, because false negatives could lead to destructive AI actions or corrupted user memory.

- **[Issue #2489](https://github.com/netease-youdao/LobsterAI/issues/2489)** — `快更新v4pro！`
  - Author: nimamasl114514 | Created/Updated 2026-08-14
  - Underlying need: A user is urgently requesting faster support for a “v4pro” model. This signals high demand for the latest model integration and possible frustration with release cadence.

## 5. Bugs & Stability

Ranked by potential impact:

1. **OpenClaw skill toggles silently ineffective** — If a skill's directory name and frontmatter name differ, UI toggles did nothing. Fixed by PRs [#2483](https://github.com/netease-youdao/LobsterAI/pull/2483) and [#2491](https://github.com/netease-youdao/LobsterAI/pull/2491). This was the most functional-impact bug addressed today.
2. **Cowork turn collapsed without an answer** — Turns that ended mid-wait could render as empty failure-like duration lines. Fixed in PR [#2499](https://github.com/netease-youdao/LobsterAI/pull/2499).
3. **Session export image / card toggle UI broken** — Addressed in PR [#2493](https://github.com/netease-youdao/LobsterAI/pull/2493).
4. **Cowork badge popovers clipped or layered incorrectly** — Fixed in PR [#2496](https://github.com/netease-youdao/LobsterAI/pull/2496).
5. **Credits icon color/style inconsistencies** — Low-risk visual bugs fixed in PRs [#2494](https://github.com/netease-youdao/LobsterAI/pull/2494) and [#2492](https://github.com/netease-youdao/LobsterAI/pull/2492).

Also still open: stale PR [#1153](https://github.com/netease-youdao/LobsterAI/pull/1153) reports a URL-joining bug in `buildOpenAIChatCompletionsURL` for Google Gemini base URLs ending in `/v1`, where a missing slash produces malformed endpoints.

## 6. Feature Requests & Roadmap Signals

- **Permanent ad banner hiding** — PR [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) adds a Settings → General toggle to permanently hide the sidebar ad banner, directly addressing issue [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342). This is still open and could ship in a future release.
- **v4pro model support** — Issue [#2489](https://github.com/netease-youdao/LobsterAI/issues/2489) is a strong user signal demanding newer model support. The next minor release is likely to include model updates or provider improvements.
- **Multi-agent task activity filtering** — Already shipped in release 2026.8.14 via PR [#2418](https://github.com/netease-youdao/LobsterAI/pull/2418).
- **Check-in & banner carousel** — Already shipped in release 2026.8.14 via PR [#2411](https://github.com/netease-youdao/LobsterAI/pull/2411).
- **In-session page search (Ctrl+F)** — Stale PR [#1155](https://github.com/netease-youdao/LobsterAI/pull/1155) proposes rich in-message search with TreeWalker and CSS Custom Highlight API. It remains open and may resurface if maintainers revisit older cowork UX improvements.
- **Core safety test coverage** — Issue [#1154](https://github.com/netease-youdao/LobsterAI/issues/1154) suggests adding Vitest tests for `commandSafety` and `coworkMemoryJudge`. Given the risk profile, this could become a priority in an upcoming quality-focused release.

## 7. User Feedback Summary

- **Urgency around model updates** — User request [#2489](https://github.com/netease-youdao/LobsterAI/issues/2489) is short and direct: “快更新v4pro！” (“Quickly update v4pro!”). This indicates a segment of users is eager for newer model support and may feel the current update cycle is too slow.
- **Ad banner pain** — PR [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) references issue [#2342](https://github.com/netease-youdao/LobsterAI/issues/2342), where users wanted a permanent way to disable sidebar ads, not just one-time dismissal. This is a recurring UI dissatisfaction point.
- **Reliability concerns around safety-critical modules** — The stale but active issue [#1154](https://github.com/netease-youdao/LobsterAI/issues/1154) expresses developer/user concern about untested safety gates, especially around dangerous command detection and memory-writing quality.

## 8. Backlog Watch

- **[Issue #1154](https://github.com/netease-youdao/LobsterAI/issues/1154)** — Open since 2026-03-31, labeled stale. Core safety/memory modules still lack test coverage. This deserves maintainer attention because it directly impacts reliability and trust.
- **[PR #1153](https://github.com/netease-youdao/LobsterAI/pull/1153)** — Open since 2026-03-31, stale. Fixes a Gemini URL construction bug; no recent visible progress despite the linked issue.
- **[PR #1155](https://github.com/netease-youdao/LobsterAI/pull/1155)** — Open since 2026-03-31, stale. In-session Ctrl+F search feature is fully specced but never merged or closed.
- **[PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)** — Open since 2026-07-21. User-facing setting to permanently hide sidebar ads; relevant to reported user pain but still pending.
- **[PR #2460](https://github.com/netease-youdao/LobsterAI/pull/2460)** / **[PR #2465](https://github.com/netease-youdao/LobsterAI/pull/2465)** — Dependabot PRs for `rimraf` and `vite` major bumps, open since 2026-08-10. Major-version dependency upgrades should be reviewed to avoid backlog accumulation.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-15

## 1. Today’s Overview

Moltis is in a quiet development phase with no new releases, no updated issues, and no merged pull requests in the last 24 hours. One pull request, #1190, was updated and remains open, indicating ongoing work on connector infrastructure. There is little public community activity to report, but the open PR suggests maintainer-side progress on calendar, channel, and email integrations. Overall project health appears stable, with no reported regressions or user-reported bugs.

## 2. Releases

No new releases were published.

## 3. Project Progress

No pull requests were merged or closed today.

The only recently active PR is:

- **[#1190 [OPEN] Add durable calendar, channel, and email connectors](https://github.com/moltis-org/moltis/pull/1190)** — Author: penso  
  Proposed work adds provider-neutral connector persistence, atomic snapshots, scheduling, projections, and bounded local full-text search. It also introduces read-only CalDAV, Gmail, Himalaya v2, and channel-history datasets with provider-owned schemas and no copied credentials. This feature is still open and under review.

## 4. Community Hot Topics

There are no issues and no other PRs with comments or reactions in the monitoring window. The only notable item is **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)**, which has no reported comment count or reactions.

The underlying need signaled by #1190 is a durable, provider-agnostic connector layer that can handle calendar, channel, and email data uniformly. The emphasis on provider-owned schemas and no copied credentials points to a priority on security and data ownership.

## 5. Bugs & Stability

No bugs, crashes, regressions, or stability issues were reported in the last 24 hours. There are no open issues to rank, and no hotfix PRs are active.

## 6. Feature Requests & Roadmap Signals

The main roadmap signal is **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)**, which is not just a request but an implementation attempt for durable connectors. If merged, it would likely land in a future Moltis release and introduce:

- Persistent connector state and atomic snapshots
- Scheduling and projection support
- Read-only CalDAV, Gmail, and Himalaya v2 connectors
- Reusable channel-history datasets
- Provider-scoped trust boundaries

No new feature requests were filed as issues in the last 24 hours.

## 7. User Feedback Summary

No user feedback, issue reports, or satisfaction signals were captured in this period. The low volume of activity makes it difficult to assess user sentiment. The open connector PR suggests internal or maintainer-driven momentum rather than community-driven feature demand.

## 8. Backlog Watch

No long-unanswered issues require attention. The only open item is **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)**, created on 2026-08-11 and updated on 2026-08-14. It has no visible comments or reviews, so it may benefit from maintainer review or community feedback to move it toward merge.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-15

## 1. Today's Overview

CoPaw/QwenPaw shows a high level of maintenance and community activity over the last 24 hours: 50 issues were updated (38 closed, 12 still open/active) and 41 PRs were touched (26 open, 15 merged/closed). No releases were published. The project is clearly working through a large backlog of older bug reports and feature requests, while active PRs push forward skill lifecycle management, provider/model handling, computer-use improvements, and console UI features. The community remains heavily Chinese-language, with recurring themes around desktop usability, MCP reliability, and model/provider compatibility. Overall, the project appears healthy: issues are being closed at a good rate, and several meaningful feature PRs are either under review or newly opened.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Several PRs moved to closed/merged state today, mostly around user-facing features and plugin infrastructure:

- **Skill system lifecycle** — Multiple skill-related PRs were closed today:  
  [#7029](https://github.com/agentscope-ai/QwenPaw/pull/7029) and [#7031](https://github.com/agentscope-ai/QwenPaw/pull/7031) both addressed dynamic skill loading, auto-unload, and frontmatter/lazy-skill path fixes. A follow-up open PR [#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) suggests this work is being refined.

- **Auto-title sync** — [#7030](https://github.com/agentscope-ai/QwenPaw/pull/7030) was closed, covering auto-memory-linked chat title refresh and observability. An open duplicate/revision exists at [#7032](https://github.com/agentscope-ai/QwenPaw/pull/7032).

- **OneBot media handling** — [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) was closed, adding local inbound media handling for OneBot channels before agent processing.

- **Plugin channel configurators** — [#6943](https://github.com/agentscope-ai/QwenPaw/pull/6943) was closed, restoring support for plugin channels with interactive `get_configurator()` flows.

- **Documentation** — [#2105](https://github.com/agentscope-ai/QwenPaw/pull/2105) was closed, adding Whisper installation instructions for local speech-to-text.

Other notable open PRs that advanced today include the DataPaw app runtime ([#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)), dynamic skill loading revision ([#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033)), subagent conversation grouping ([#7035](https://github.com/agentscope-ai/QwenPaw/pull/7035)), media download controls ([#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036)), and computer-use related window surface observation ([#7037](https://github.com/agentscope-ai/QwenPaw/pull/7037)).

## 4. Community Hot Topics

The most active issues by comment count were:

- [#3045](https://github.com/agentscope-ai/QwenPaw/issues/3045) — *[Bug]: 自动获取模型为什么不可用* (8 comments, closed)  
  Users are confused about automatic model fetching/configuration, especially on the Windows desktop version.

- [#2418](https://github.com/agentscope-ai/QwenPaw/issues/2418) — *[Question]: 能否在新增skills-hub管理页面* (7 comments, closed)  
  Demand for a built-in skills-hub page to discover and install mainstream skills faster.

- [#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846) — *[Feature]: 桌面端自动更新 + Windows任务栏图标问题* (6 comments, closed)  
  Repeated request for desktop auto-updates; users dislike manual uninstall/reinstall cycles.

- [#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010) — *[Question]: qwenpaw app 只能前台运行，没有真正的后台/守护模式* (6 comments, closed)  
  Strong need for daemon/background mode so `qwenpaw app` does not block SSH/script launches.

- [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) — *[Question]: 升级2.0以后，mcp工具总是提示Tool not found* (6 comments, closed)  
  MCP tools are broken after upgrading to 2.0 in Docker deployments.

- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — *Console stop request can cancel an active Feishu session under multiple UI sessions* (5 comments, open)  
  A serious multi-session concurrency bug that can terminate an unrelated active Feishu conversation.

- [#7025](https://github.com/agentscope-ai/QwenPaw/issues/7025) — *QwenPaw Creator插件和其他插件冲突* (4 comments, open)  
  Installing the Creator plugin reportedly disables all other plugins.

The underlying needs are consistent: better desktop/install experience, more robust MCP/plugin isolation, background operation for server use, and clearer model/provider configuration.

## 5. Bugs & Stability

Ranked by severity:

1. **High — Cross-session cancellation bug**  
   [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) (open): A Console UI stop request can cancel an active Feishu session when session identity values cross between two UI sessions. This can disrupt real user conversations. No fix PR is visible yet.

2. **High — Tool call offload endpoint returns 404 during streaming**  
   [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) (open): In v2.1.0, `/api/tool-calls/.../offload` returns `404 {"detail":"Tool call not found"}` during streaming sessions, breaking tool-call handling.

3. **High — Plugin conflict disables all plugins**  
   [#7025](https://github.com/agentscope-ai/QwenPaw/issues/7025) (open): Installing QwenPaw Creator causes all plugins to stop working. This is a plugin-system stability issue and likely urgent.

4. **Medium — Duplicate MCP tool result data**  
   [#6958](https://github.com/agentscope-ai/QwenPaw/issues/6958) (open): When an MCP result exceeds the truncation threshold, the tool result file contains two duplicate copies of the data. A fix PR already exists: [#6969](https://github.com/agentscope-ai/QwenPaw/pull/6969).

5. **Medium — MCP “Tool not found” after 2.0 upgrade**  
   [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) (closed): Docker users reported persistent MCP tool resolution failures after upgrading. Closed, but it indicates a rough upgrade path for MCP users.

6. **Lower / recently closed**  
   Several older stability issues were closed today, including Chrome extension WebSocket disconnects ([#6972](https://github.com/agentscope-ai/QwenPaw/issues/6972)), Scroll compression hiding original transcripts ([#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)), Windows startup hangs on `nvidia-smi` ([#6197](https://github.com/agentscope-ai/QwenPaw/issues/6197)), and AgentScope 2.0.4 compatibility crashes ([#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612)).

## 6. Feature Requests & Roadmap Signals

Recurring user-requested features:

- **Desktop auto-update** — Requested multiple times in [#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846) and [#3464](https://github.com/agentscope-ai/QwenPaw/issues/3464). Both closed, but this is a persistent Windows user pain point.

- **OpenAI Responses API support** — Multiple requests indicate enterprise/OpenAI-compatible gateways need Responses API compatibility: [#3002](https://github.com/agentscope-ai/QwenPaw/issues/3002), [#944](https://github.com/agentscope-ai/QwenPaw/issues/944), [#2737](https://github.com/agentscope-ai/QwenPaw/issues/2737).

- **Provider-agnostic conversations** — [#2314](https://github.com/agentscope-ai/QwenPaw/issues/2314) asks for switching providers freely mid-conversation without history-format failures.

- **Conversation management** — Users want to delete single messages ([#4001](https://github.com/agentscope-ai/QwenPaw/issues/4001), open since May) and split/transfer parts of a conversation into a new session ([#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436), open since May).

- **Local model convenience** — [#6433](https://github.com/agentscope-ai/QwenPaw/issues/6433) proposes in-app GGUF model download/runtime instead of external endpoints.

- **Background/daemon mode** — [#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010) reflects a genuine deployment requirement for headless/SSH environments.

Likely near-term additions based on active open PRs: dynamic skill loading/unloading ([#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033)), chat title auto-sync ([#7032](https://github.com/agentscope-ai/QwenPaw/pull/7032)), subagent conversation grouping ([#7035](https://github.com/agentscope-ai/QwenPaw/pull/7035)), media download controls ([#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036)), and computer-use window observation improvements ([#7037](https://github.com/agentscope-ai/QwenPaw/pull/7037)). Long-running PRs for per-session model overrides ([#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)) and unified provider discovery ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)) also suggest model-configuration UX is being actively redesigned.

## 7. User Feedback Summary

Real user pain points observed in the last 24 hours:

- **Windows desktop friction**: Users consistently dislike the uninstall/reinstall update flow, report the Python icon appearing instead of CoPaw’s icon, and mention cmd.exe flashing when shell commands run ([#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846), [#3464](https://github.com/agentscope-ai/QwenPaw/issues/3464), [#4832](https://github.com/agentscope-ai/QwenPaw/issues/4832)).

- **Server/headless deployment gaps**: The lack of a true daemon/background mode blocks SSH and script-based workflows ([#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010)).

- **MCP/plugin ecosystem instability**: Upgrading to 2.0 introduced MCP tool resolution issues, duplicate tool-result data, and plugin conflicts that made users question the reliability of the extension ecosystem ([#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405), [#6958](https://github.com/agentscope-ai/QwenPaw/issues/6958), [#7025](https://github.com/agentscope-ai/QwenPaw/issues/7025)).

- **Conversation data ownership**: Users expect to delete individual messages, split conversations, and still see their full transcript after context compression ([#4001](https://github.com/agentscope-ai/QwenPaw/issues/4001), [#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436), [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)).

- **Enterprise compatibility matters**: Users connecting through Azure OpenAI proxy gateways or Responses-only providers are blocked by current request-format assumptions ([#3002](https://github.com/agentscope-ai/QwenPaw/issues/3002), [#944](https://github.com/agentscope-ai/QwenPaw/issues/944)).

The large number of closed issues (38) suggests maintainers are responsive, but repeated themes indicate unresolved friction around desktop packaging, MCP robustness, and conversation control.

## 8. Backlog Watch

Items that may need maintainer attention:

- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Open critical bug: Console stop cancels Feishu sessions across UI sessions. Needs a fix PR or at least maintainer triage.

- [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) — Open bug: tool-call offload endpoint 404 during streaming in v2.1.0.

- [#4001](https://github.com/agentscope-ai/QwenPaw/issues/4001) — Open feature request since May 2: delete individual chat messages. Still unimplemented.

- [#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436) — Open feature request since May 16: split conversations into new sessions.

- [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — First-time contributor PR for per-session model overrides, opened July 12 and still under review. Needs maintainer decision/review.

- [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Large open PR unifying provider discovery, model metadata, routing, and agent controls. Opened July 21; likely needs significant review bandwidth.

- [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) — Large first-time-contributor PR adding a native DataPaw app runtime and durable analysis workspace. Should be triaged to avoid losing a potentially valuable contribution.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-15

## 1. Today's Overview

ZeroClaw is in a high-intensity design-and-hardening phase: 33 issues and 50 PRs were updated in the last 24 hours, with 3 PRs merged/closed and 3 issues closed, but no new release cut. Activity is concentrated in large architecture RFCs and security/reliability work. Maintainers are actively running the RFC decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) while the v0.8.5 stabilization line ([#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)) continues through August 30. Several accepted RFCs are now turning into concrete PRs, e.g. [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996), [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997), and [#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999). Overall project health looks strong: review throughput is high, but the backlog of `needs-maintainer-review` RFCs remains a bottleneck.

## 2. Releases

No new releases were published in this digest period.

## 3. Project Progress

The dataset does not expose identifiers for the 3 merged/closed PRs. Among closed issues in the last 24 hours:

- [#9982](https://github.com/zeroclaw-labs/zeroclaw/issues/9982) — hosted memory proposal, closed as **wontfix**.
- [#6663](https://github.com/zeroclaw-labs/zeroclaw/issues/6663) — Telegram tool-call progress during partial streaming, closed.

Other notable PRs updated today that advanced important areas:

- [#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999) — classifies output-limited terminal responses, addressing incomplete terminal responses ([#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)).
- [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) — makes action-budget accounting atomic for security policy.
- [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) — adds provider-grouped, paginated Telegram model picker.
- [#10002](https://github.com/zeroclaw-labs/zeroclaw/pull/10002) — fixes camelCase validation in `google_workspace`.
- [#9994](https://github.com/zeroclaw-labs/zeroclaw/pull/9994) — adds ZeroCode transcript copy context menu.
- [#9985](https://github.com/zeroclaw-labs/zeroclaw/pull/9985) and [#9962](https://github.com/zeroclaw-labs/zeroclaw/pull/9962) — extend Blacksmith runners and provider-aware Rust cache in CI.

## 4. Community Hot Topics

Most active discussions are RFC and architecture driven:

- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **RFC: Goal mode v1** (22 comments, 1 👍). Demand for durable, bounded multi-turn foreground work; biggest active design conversation.
- [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — **RFC: high-risk shell command confirmation** (20 comments). Users/operators want Claude Code-style allow/ask/deny policy for dangerous shell commands.
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **RFC: Chat Completions profile** (19 comments). Strong ecosystem pull from Open WebUI, LobeChat, Continue.dev, and OpenAI SDK users.
- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **RFC: pluggable inbound authentication** (16 comments). Identity/access management and OIDC are core v0.9 concerns.
- [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **74 Windows test failures** (15 comments). Cross-platform CI is a visible pain point for contributors.

Underlying need: ZeroClaw is expanding from a channel-centric agent runtime toward an open, standard-protocol, security-complete platform.

## 5. Bugs & Stability

Ranked by severity/impact:

- **[S1] [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** — Incomplete terminal responses can be reported as successful. Fix PR open: [#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999).
- **[S2] [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 74 test failures on Windows; Linux-only CI misses Unix-specific test assumptions. No fix PR identified.
- **[S2] [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** — High-entropy detector redacts Solana wallet addresses, even with `high_entropy_tokens=false` on channel paths. No fix PR identified.
- **[S2] [#9759](https://github.com/zeroclaw-labs/zeroclaw/issues/9759)** — Quickstart accepts duplicate enabled webhook ports, risking misconfiguration.
- **[P1] [#9919](https://github.com/zeroclaw-labs/zeroclaw/issues/9919)** — Qdrant silently falls back to MarkdownMemory when storage config is unavailable; could pick the wrong persistence layer.
- **[Test flake] [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)** — cron custom-shell test hits `ETXTBSY` under the parallel runtime gate, failing unrelated PRs.
- **[S3] [#9983](https://github.com/zeroclaw-labs/zeroclaw/issues/9983)** — Fallback model without vision misreports the cause of vision-input failures.

## 6. Feature Requests & Roadmap Signals

High-momentum features likely to shape upcoming releases:

- **Goal mode v1** ([#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)) — accepted; likely v0.9 core.
- **Shell command policy** ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)) — accepted; security milestone.
- **Chat Completions profile** ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) — would unlock broad OpenAI-protocol compatibility.
- **Pluggable auth / security pipeline** ([#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141), [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)) — accepted/in-progress, v0.9 security architecture.
- **Telegram model picker** ([#9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)) — implementation PR [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) is open; likely near-term.
- **Discord role-based authorization** ([#9970](https://github.com/zeroclaw-labs/zeroclaw/issues/9970)) — in-progress, additive to user-ID allowlists.
- **Agent evaluation harness** ([#7065](https://github.com/zeroclaw-labs/zeroclaw/issues/7065)) and tracker [#9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) — signals a shift toward measurable quality gates.
- **Localization cleanup** ([#9972](https://github.com/zeroclaw-labs/zeroclaw/issues/9972)) — audit-style tracker for user-facing output outside Fluent boundaries.

Prediction: quick wins such as the Telegram picker, ZeroCode copy menu, and shell-dialect reporting ([#9788](https://github.com/zeroclaw-labs/zeroclaw/issues/9788)) may still land in v0.8.5; the large RFC set is more likely v0.9.0 material.

## 7. User Feedback Summary

Real user pain points visible in the data:

- **Solana/Web3 users** are blocked by over-aggressive redaction on Telegram ([#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)).
- **Windows contributors** cannot run the test suite reliably ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)).
- **OpenAI-ecosystem users** want a standard Chat Completions endpoint rather than WebSocket/ACP-only integrations ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)).
- **Operators** are asking for more granular shell-command safety and security policy control ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155), [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142), [#9839](https://github.com/zeroclaw-labs/zeroclaw/pull/9839)).
- **Privacy-sensitive users** want staged, operator-reviewable telemetry, not automatic reporting ([#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)).
- **Misleading errors** remain a recurring frustration: fallback vision failures ([#9983](https://github.com/zeroclaw-labs/zeroclaw/issues/9983)) and incomplete terminal responses ([#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)).
- The closed hosted-memory proposal ([#9982](https://github.com/zeroclaw-labs/zeroclaw/issues/9982)) shows ongoing user appetite for simpler stateful memory, though maintainers declined third-party hosted API integration.

## 8. Backlog Watch

RFCs and PRs that need maintainer attention:

- [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) — Security posture/credential boundaries RFC, open since May 27, `needs-maintainer-review`.
- [#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) — Provenance/reply contract for internally initiated turns, open since May 26, `needs-maintainer-review`.
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — Chat Completions profile RFC, `needs-maintainer-review`.
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) / [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Runtime-owned sessions and unified attachment architecture, both `needs-maintainer-review`.
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — Keep agent turns alive after viewer disconnect, `needs-maintainer-review`.
- [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) — Roll back auto-created config aliases on failed `config/set`, `needs-maintainer-review`.
- [#9788](https://github.com/zeroclaw-labs/zeroclaw/issues/9788) — Report active shell dialect in system prompt, currently `blocked`.
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue tracker itself is the best place to track these pending calls.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*