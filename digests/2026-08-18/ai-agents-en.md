# OpenClaw Ecosystem Digest 2026-08-18

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-17 23:00 UTC

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

# OpenClaw Project Digest — 2026-08-18

## 1. Today's Overview

OpenClaw is in a high-activity phase: 500 issues and 500 PRs were updated in the last 24 hours, with 96 PRs merged/closed and 12 issues closed, but **no new releases** published. The dominant theme is reliability — the most-commented issues are concentrated around message loss, session-state corruption, crash loops, and regressions in coding-agent and WhatsApp flows. A large share of top issues carries `clawsweeper:needs-maintainer-review` / `needs-product-decision` labels with no new fix PR, indicating a significant human-maintainer bottleneck behind the automated ClawSweeper triage bot. Meanwhile, steady engineering progress continues on UI polish, CLI correctness, multi-agent support (Teams multi-bot, workboard sync), and security hardening.

## 2. Releases

No new releases published in the last 24 hours.

## 3. Project Progress

96 PRs were merged or closed in the window. The two closed PRs visible in the top-30 set complete a **security hardening feature**:

- [#120900](https://github.com/openclaw/openclaw/pull/120900) — `feat(ui): review install policy warnings` (closed): authenticated admins can now review an install-policy warning in the Control UI and deliberately continue a plugin install via `acknowledgeInstallPolicyWarning: true`.
- [#116489](https://github.com/openclaw/openclaw/pull/116489) — `feat(security): require acknowledgement for install policy warnings` (closed): the backend counterpart — `security.installPolicy` can return `warn`, and interactive CLI installs require the exact target name before proceeding.

Substantial PRs in **"ready for maintainer look"** status (near-term merge candidates):

- [#80396](https://github.com/openclaw/openclaw/pull/80396) — warn when a `MEDIA:` token is skipped inside fenced code blocks (silent-delivery failure fix).
- [#125280](https://github.com/openclaw/openclaw/pull/125280) — show worktree option only for Git group folders in the UI.
- [#125377](https://github.com/openclaw/openclaw/pull/125377) — CLI configure honors explicit system agent workspace.
- [#123975](https://github.com/openclaw/openclaw/pull/123975) — typecheck now fails instead of hanging forever when `tsgo` wedges.
- [#124687](https://github.com/openclaw/openclaw/pull/124687) — stop printing reusable Gateway token URLs during onboarding.
- [#123535](https://github.com/openclaw/openclaw/pull/123535) — avoid session-catalog refresh storms in the web UI.
- [#124551](https://github.com/openclaw/openclaw/pull/124551) — merge nested MCP configure and tools patches.

Other active engineering areas: Windows Git-install Node runtime pinning ([#125286](https://github.com/openclaw/openclaw/pull/125286)), Codex degraded-engine context projection ([#125324](https://github.com/openclaw/openclaw/pull/125324)), subagent execution lineage ([#122015](https://github.com/openclaw/openclaw/pull/122015)), multiple Teams bots per gateway ([#112811](https://github.com/openclaw/openclaw/pull/112811)), dashboard live-progress tile ([#125438](https://github.com/openclaw/openclaw/pull/125438)), and stable parent-session messaging when only subagents are active ([#125428](https://github.com/openclaw/openclaw/pull/125428)).

## 4. Community Hot Topics

- [#77598](https://github.com/openclaw/openclaw/issues/77598) (23 comments) — Maintainer's live 24-hour observational watch of a dev agent's behavior; signals the team's investment in understanding real agent trajectories.
- [#91009](https://github.com/openclaw/openclaw/issues/91009) (20 comments, 2👍) — Codex PreToolUse hook relay spawns CPU-bound `openclaw-hooks` processes and stalls gateway RPC; top P1 for the Codex integration.
- [#68596](https://github.com/openclaw/openclaw/issues/68596) (15 comments, 8👍) — Configurable streaming watchdog timeout; directly impacts users of long-reasoning models (kimi-k2.5, DeepSeek-R1).
- [#62505](https://github.com/openclaw/openclaw/issues/62505) (15 comments, 1👍) — "Coding Agent never completes anything" — regression since 2026.4.2; high user trust impact.
- [#96834](https://github.com/openclaw/openclaw/issues/96834) (15 comments, 1👍) — WhatsApp 1:1 inbound image wedges the message lane ~3 min before processing; multimodal session-state corruption post-#95039.
- [#38327](https://github.com/openclaw/openclaw/issues/38327) (14 comments, 3👍) — `google-vertex/gemini-3.1-pro-preview` fails with "Cannot convert undefined or null to object" since 2026.3.2.
- [#69208](https://github.com/openclaw/openclaw/issues/69208) (14 comments) — Umbrella issue for a systematic class: duplicate transcript, replay, and context assembly bugs across MSTeams, webchat, Telegram, followup-queue, and delivery-mirror paths.

**Underlying needs:** long-context/long-reasoning model support, WhatsApp & multimodal delivery reliability, coding-agent trust after regressions, and provider/auth resilience (OAuth refresh, cooldown recovery).

## 5. Bugs & Stability

Ranked by severity (all updated in the last 24h):

**P0**

- [#70903](https://github.com/openclaw/openclaw/issues/70903) — Persistent file-based provider cooldown (`disabledUntil`) blocks users for hours **after billing recovery**; survives gateway restarts and extends on repeated failures.

**P1 regressions**

- [#62505](https://github.com/openclaw/openclaw/issues/62505) — Coding agent never completes anything (worked in 2026.4.2).
- [#38327](https://github.com/openclaw/openclaw/issues/38327) — Vertex/Gemini crashes on any message since 2026.3.2.
- [#77930](https://github.com/openclaw/openclaw/issues/77930) — Discord channel not loaded in 2026.5.4 (regression matrix provided; **linked PR open**).

**P1 reliability / correctness**

- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook relay CPU burn + gateway RPC stall.
- [#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp image wedges main lane; repro on 2026.6.10.
- [#86215](https://github.com/openclaw/openclaw/issues/86215) — Codex OAuth refresh failures wedge agents for hours without alerting.
- [#53408](https://github.com/openclaw/openclaw/issues/53408) — `write`/`exec` tool parameters silently dropped after ~15+ turns.
- [#67777](https://github.com/openclaw/openclaw/issues/67777) — Subagent completion delivery lost on direct-announce timeout, drain, or orphan prune.
- [#39476](https://github.com/openclaw/openclaw/issues/39476) — A2A `sessions_send` back-call causes duplicate messages (**linked PR open**).
- [#72015](https://github.com/openclaw/openclaw/issues/72015) — `active-memory` blocks replies; QMD boot initialization overloads multi-agent gateways.
- [#74586](https://github.com/openclaw/openclaw/issues/74586) — Embedded runs abort `memory_search` tool calls; misclassified as timeout despite model completion.
- [#50093](https://github.com/openclaw/openclaw/issues/50093) — WhatsApp no backfill of missed messages after reconnect.
- [#86215](https://github.com/openclaw/openclaw/issues/86215) — see above (auth wedge).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie hook/tool child-process accumulation degrades runtime.
- [#71689](https://github.com/openclaw/openclaw/issues/71689) — Tasks registry restore fails on malformed SQLite image at gateway startup.
- [#45224](https://github.com/openclaw/openclaw/issues/45224) — Unhandled Playwright CDP assertion crashes the entire Gateway.
- [#53540](https://github.com/openclaw/openclaw/issues/53540) — "Network connection lost" when large tool-call params exceed the request timeout.
- [#112196](https://github.com/openclaw/openclaw/issues/112196) — `memory_search` transient sync timeout masks as persistent provider failure ("database is not open").
- [#78493](https://github.com/openclaw/openclaw/issues/78493) — `sudo openclaw update` creates mixed ownership; `doctor` then overwrites config after EACCES/read failure.

**Fix-PR status:** most of these carry `clawsweeper:no-new-fix-pr` — no fix candidate exists yet. Only #39476 and #77930 have linked open PRs. The rest remain blocked on maintainer review or product decisions.

## 6. Feature Requests & Roadmap Signals

Strongest community demand (by 👍 / activity):

- **MathJax/LaTeX in Control UI** ([#42840](https://github.com/openclaw/openclaw/issues/42840), 10👍) — most-liked feature request.
- **Configurable streaming watchdog timeout** ([#68596](https://github.com/openclaw/openclaw/issues/68596), 8👍).
- **Per-agent dreaming configuration** ([#67413](https://github.com/openclaw/openclaw/issues/67413), 5👍) — prevents OOM when all workspaces dream simultaneously.
- **Multi-slot memory architecture** ([#60572](https://github.com/openclaw/openclaw/issues/60572), 3👍).
- **Multiple Teams bots per gateway** ([#71058](https://github.com/openclaw/openclaw/issues/71058)) — large implementation PR [#112811](https://github.com/openclaw/openclaw/pull/112811) already in flight.
- **Session context bloat fix** ([#67419](https://github.com/openclaw/openclaw/issues/67419), 2👍) — bootstrap files re-injected every turn waste 20–30% of tokens; high cost-saving potential.

Other tracked requests: YAML config format ([#45758](https://github.com/openclaw/openclaw/issues/45758)), per-agent TTS/STT overrides ([#66252](https://github.com/openclaw/openclaw/issues/66252)), skill priority configuration ([#50199](https://github.com/openclaw/openclaw/issues/50199)), fallback model chain for compaction/LCM ([#56781](https://github.com/openclaw/openclaw/issues/56781)), per-agent TTS/STT multi-language support ([#66252](https://github.com/openclaw/openclaw/issues/66252)), and OpenAI Realtime speech-to-speech for macOS Talk Mode ([#71195](https://github.com/openclaw/openclaw/issues/71195)).

**Prediction for next version:** the install-policy security UX (just landed), Teams multi-bot, subagent lineage, dashboard progress tile, and i18n slash-command descriptions all have active implementations and are likely near-term. Given the cluster of P1 message-delivery/session-state issues, a reliability-focused patch release is more likely than a feature-heavy minor.

## 7. User Feedback Summary

- **Sharp frustration:** [#51429](https://github.com/openclaw/openclaw/issues/51429) — a hardcoded `/Users/wangtao` working path was merged and published, creating the directory on fresh installs ("who is wangtao?"). Community reaction was strongly negative; it remains a top-12 issue by comments.
- **Appreciation:** [#73537](https://github.com/openclaw/openclaw/issues/73537) — users thank the team for making OpenClaw a daily family/business assistant (Telegram, automations, cron, Home Assistant).
- **Recurring pain points:** silent failures (model switch with oversized context [#58957](https://github.com/openclaw/openclaw/issues/58957), FTS5 keyword search silently broken [#62328](https://github.com/openclaw/openclaw/issues/62328), missing cron token counters [#124657](https://github.com/openclaw/openclaw/pull/124657)), unexplained delays (10–15s synchronous auth stage [#75782](https://github.com/openclaw/openclaw/issues/75782)), and regression-driven distrust of the coding agent ([#62505](https://github.com/openclaw/openclaw/issues/62505)).
- **Multi-agent operators** report operational friction: no per-agent memory control ([#67413](https://github.com/openclaw/openclaw/issues/67413)), orphaned sessions cluttering the dashboard ([#49259](https://github.com/openclaw/openclaw/issues/49259)), and no persistent task-status surface for long-running turns ([#52640](https://github.com/openclaw/openclaw/issues/52640)).

## 8. Backlog Watch

**Maintainer bottleneck:** ~39 of the top 50 issues carry `clawsweeper:needs-maintainer-review` and/or `clawsweeper:needs-product-decision`, mostly combined with `clawsweeper:no-new-fix-pr` — meaning the triage bot has no fix candidate and human maintainers haven't acted yet.

**Longest-unaddressed high-severity items (all P1/P0, open 3–5 months):**

- [#38327](https://github.com/openclaw/openclaw/issues/38327) (open since 2026-03-06) — Vertex/Gemini crash regression; P1.
- [#50093](https://github.com/openclaw/openclaw/issues/50093) (since 2026-03-19) — WhatsApp missed-message backfill; P1.
- [#51429](https://github.com/openclaw/openclaw/issues/51429) (since 2026-03-21) — hardcoded path shipped in release; community-visible embarrassment.
- [#53408](https://github.com/openclaw/openclaw/issues/53408) (since 2026-03-24) — tool params silently dropped after long conversations; P1.
- [#39476](https://github.com/openclaw/openclaw/issues/39476) (since 2026-03-08) — A2A duplicate messages; **has linked PR** but still open.
- [#62505](https://github.com/openclaw/openclaw/issues/62505) (since 2026-04-07) — coding-agent regression; P1, high trust impact.
- [#70903](https://github.com/openclaw/openclaw/issues/70903) (since 2026-04-24) — **P0**: provider cooldown persists after billing recovery.
- [#62328](https://github.com/openclaw/openclaw/issues/62328) (since 2026-04-07) — `node:sqlite` missing FTS5 breaks memory keyword search; **linked PR open**.

**Risk indicator:** several P1 issues have languished for months without a fix PR, including two regressions that directly erode the core coding-agent value proposition (#62505, #38327). If maintainer capacity doesn't increase, user retention and community trust are at risk despite the healthy PR throughput.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Reporting window:** 2026-08-17 → 2026-08-18

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a high-velocity stabilization phase: across 12 tracked projects, roughly **750 issues and 800 PRs** were updated in 24 hours, with **~190 PRs merged/closed**, yet **only one patch release** (Hermes v0.20.3) was published — indicating that most teams are consolidating code faster than they are cutting releases. The dominant engineering theme is **reliability**: message-delivery failures, session-state corruption, silent agent loops, and provider/auth instability account for the majority of high-severity issues across nearly every project. A second clear pattern is the emergence of **multi-agent orchestration** (bot-to-bot DMs, single-session collaboration, cross-gateway peers) and **cost governance** (spend firewalls, token-accounting fixes) as the next competitive battlegrounds. Maintainer review capacity — not code contribution — is the binding constraint across the largest projects, with automated triage bots surfacing issues faster than humans can disposition them.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | PRs Merged/Closed | Issues Closed | Release This Window | Health Score (1–10) |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 96 | 12 | None | **7.0** |
| **NanoBot** | 3 | 15 | 5 | 1 | None | **8.0** |
| **Hermes Agent** | 50 | 50 | 16 | 9 | v0.20.3 patch | **8.5** |
| **PicoClaw** | 4 | 4 | 3 | 1 | None | **6.5** |
| **NanoClaw** | 4 | 39 | 22 | 1 | None | **7.5** |
| **NullClaw** | 0 | 1 | 0 | 0 | None | **3.0** |
| **IronClaw** | 28 | 44 | 16 | 6 | None | **8.0** |
| **LobsterAI** | 7 (open) | 21 | 17 | 0 | None | **6.5** |
| **Moltis** | 2 | 9 | 6 | 2 | None | **7.0** |
| **CoPaw** | 14 | 35 | 22 | 6 | None | **7.5** |
| **ZeptoClaw** | 0 | 0 | 0 | 0 | None | **1.0** |
| **ZeroClaw** | 50 | 50 | 16 | 7 | None | **8.0** |

**Health score rationale:** weighted composite of throughput, maintainer responsiveness (fix-PR latency), release cadence, backlog health (stale high-severity items), and regression velocity. Hermes and ZeroClaw lead on release cadence and security-fix responsiveness respectively; OpenClaw's volume is unmatched but its ~39/50 top issues awaiting maintainer review and multiple months-old P1 regressions cap its score. NullClaw and ZeptoClaw are effectively dormant.

---

## 3. OpenClaw's Position

**Advantages:**
- **Unmatched community gravity** — 500/500 issue/PR updates per day is ~5–10× the nearest peer (Hermes, ZeroClaw, IronClaw at ~50 each). It is the reference implementation and the default fork source (NanoClaw, PicoClaw, NullClaw, and CoPaw's runtime all derive from it or its ecosystem).
- **Breadth of channel integrations** — MSTeams, WhatsApp, Telegram, Discord, webchat, A2A, plus coding-agent and multi-agent gateway features; no peer covers this surface area.
- **Automated triage at scale** — the ClawSweeper bot and labeled workflow (needs-maintainer-review, needs-product-decision) provide unprecedented issue-preprocessing, even if human follow-through lags.

**Technical approach differences:**
- OpenClaw is a **monolithic TypeScript gateway + plugin runtime**; by contrast, ZeroClaw and Moltis are **Rust/WASM-native**, LobsterAI is an **Electron desktop wrapper** around OpenClaw, and Hermes uses a **desktop + gateway split with sharded repository architecture**. OpenClaw bets on ecosystem extensibility; the Rust projects bet on resource efficiency and type safety.
- Its `clawsweeper` bot-driven triage is unique; Hermes relies on classic maintainer workflows, ZeroClaw on formal RFCs with decision queues.

**Community size comparison:** OpenClaw's issue volume alone (500/day) exceeds the *total cumulative* activity of PicoClaw, NullClaw, Moltis, and ZeptoClaw combined across the entire window. Hermes and ZeroClaw are the only projects operating at a comparable order of magnitude (50/day each).

**Weaknesses:** the maintainer bottleneck is structural — the triage bot surfaces fixes but human capacity gates them; several P1 coding-agent regressions (#62505, #38327) have been open 3–5 months with no fix candidate. This is the core risk to its ecosystem-leader position.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across three or more projects:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Message-delivery reliability** | OpenClaw, NanoBot, CoPaw, PicoClaw, IronClaw | Telegram polling stall recovery (NanoBot, fixed); WhatsApp image lane wedging (OpenClaw); OneBot QQ expired image URLs poisoning context (CoPaw); Slack media upload zero-size failure (PicoClaw); Slack unlinked-user public connect prompts (IronClaw) |
| **Agent loop / tool-call termination** | OpenClaw, NanoBot, PicoClaw, NanoClaw | "Coding agent never completes" regression (OpenClaw); endless `complete_goal` recursion on serialization change (NanoBot); repeated identical tool failure looping to max iterations (PicoClaw, fixed); task rows switching chat into task mode and eating replies (NanoClaw) |
| **Provider/auth resilience** | OpenClaw, NanoBot, NanoClaw, PicoClaw, Hermes | OAuth refresh wedges (OpenClaw, Codex); persistent cooldown surviving billing recovery (OpenClaw P0); fallback policy bypassed by raised exceptions (NanoBot); Codex model pin retirement by 2026-08-31 (NanoClaw); compaction threshold vs. OAuth window mismatch (Hermes); generic 429 despite valid scopes (PicoClaw) |
| **Context/session management** | OpenClaw, Hermes, CoPaw, Moltis | Bootstrap files re-injecting every turn wasting 20–30% tokens (OpenClaw); SessionDB WAL connection leaks → EMFILE (Hermes); context-usage ring miscounting base64 images / stale after compaction (CoPaw); heartbeat config clobbering (`update` = full replacement) and ignored `active_hours` (Moltis) |
| **Cost control & token accounting** | NanoBot, OpenClaw, CoPaw, ZeroClaw | Hybrid spend firewall to bound infinite-loop spend (NanoBot); atomic action-budget accounting under parallel dispatch (ZeroClaw, fixed); false context-ring fill from image tokens (CoPaw); token-waste reduction via context-bloat fixes (OpenClaw) |
| **Multi-agent orchestration** | Hermes, CoPaw, LobsterAI, OpenClaw, NanoClaw | Bot-to-bot DMs / cross-gateway peers (Hermes); single-session multi-agent collaboration instead of per-agent session spawning (CoPaw); Markdown workflow orchestration of sub-agents (LobsterAI); multiple Teams bots per gateway (OpenClaw); channel-layer hooks and driver seams (NanoClaw) |
| **Cross-platform / Windows reliability** | Hermes, ZeroClaw, NanoBot, OpenClaw | `hermes update` always fails on live exe rename (Hermes); 74 Windows test failures from Unix-only commands (ZeroClaw); Windows venv child-process PID adoption (NanoBot); Node runtime pinning for Windows Git installs (OpenClaw) |
| **Security hardening** | ZeroClaw, OpenClaw, Hermes, IronClaw | Gemini API keys moved from URLs to headers (ZeroClaw); install-policy warnings requiring explicit acknowledgement (OpenClaw); skills trust sidecars + git-backed shared skills (Hermes); private one-click Slack connect (IronClaw) |

---

## 5. Differentiation Analysis

| Project | Primary Target User | Architectural Core | Distinctive Direction |
|---|---|---|---|
| **OpenClaw** | General power users, multi-channel operators | Monolithic TypeScript gateway + plugin runtime | Breadth-first: every channel, every provider; ecosystem reference |
| **Hermes Agent** | Desktop-centric professionals, research orgs (NousResearch) | Gateway + desktop app, sharded monorepo | Skills trust/distribution, bot-to-bot peers, polished desktop UX |
| **ZeroClaw** | Security-conscious self-hosters, Rust adopters | Rust-native, RFC-governed architecture | Formal RFC pipeline, v0.9.0 breaking-change milestone, OpenAI-compatible API |
| **IronClaw** | NEAR AI ecosystem builders | WASM tool host + durable DB | Wasmtime sandboxing, write-pressure reduction, notification inbox, automation run-now |
| **NanoBot** | Lightweight self-hosters, commercial pilots | Python, gateway + WebUI | Cost guardrails (spend firewall), TypeScript TUI, pragmatic reliability fixes |
| **CoPaw** | Chinese-market multi-channel users (DingTalk/WeChat/QQ) | OpenClaw-derived + Console app | Channel-specific configuration, plugin/PawApp ecosystem, per-channel model routing |
| **NanoClaw** | OpenClaw fork users wanting cleaner extensibility | OpenClaw-derived, modular seams | Driver abstractions, router session hooks, local webchat channel |
| **LobsterAI** | Chinese-market desktop users (NetEase Youdao) | Electron wrapper around OpenClaw runtime | Cowork UI polish, i18n, per-agent working directories, DSH engine |
| **Moltis** | Rust/WASM developers, external-agent integrators | Rust + WASM/WASI + ACP | External agent model/effort selection, MiniMax Code ACP, shadow-DOM browsing |
| **PicoClaw** | Embedded/Sipeed hardware hackers | Go-based, lightweight | Channel robustness (Weixin, IRCv3), early-loop-failure detection |
| **NullClaw / ZeptoClaw** | Niche/fork communities | Rust (ZeptoClaw) | ZeptoClaw: RFC-driven security hardening; NullClaw: effectively dormant |

The strategic split is clear: **TypeScript/OpenClaw-ecosystem projects compete on channel breadth and plugin extensibility; Rust/WASM projects compete on resource efficiency, security posture, and formal governance; Python (NanoBot) competes on lightweight pragmatism and cost controls.** The Chinese-market cluster (CoPaw, LobsterAI) differentiates on local channel integrations (WeChat, DingTalk, QQ) and bilingual UX, which Western-centric projects do not prioritize.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (contribution velocity high, releases pending):**
- **OpenClaw** (96 merges/24h) — enormous throughput, but release cadence stalled and maintainer review is the bottleneck. Risk of user trust erosion from unresolved P1 regressions.
- **ZeroClaw** (16 merges + 7 issue closures) — organized RFC pipeline, security fixes merged within hours-to-days of reporting, v0.9.0 milestone clearly scoped.
- **Hermes Agent** (16 merges + v0.20.3 release + 20/20 sharding epic complete) — most mature release discipline of the cohort; steady cadence and backlog clearing.
- **IronClaw** (16 merges + critical bug → fix PR same window) — responsive, dogfooding QA campaign, strong epic decomposition.

**Tier 2 — Steady, healthy:**
- **NanoClaw** (22 merges) — high community contribution velocity, but post-2.1.48 regression cluster (task-delivery, Codex) indicates stabilization needed.
- **CoPaw** (22 merges, 6 issues closed) — post-v2.1.0 stabilization with responsive maintainers; heavy Chinese-language community engagement.
- **NanoBot** (5 merges + major Telegram fix shipped) — financially small but high-signal; maintainers close long-standing reliability bugs while accepting new-feature PRs.
- **Moltis** (6 merges, clearing July backlog) — small but productive; closing multi-week-old PRs indicates improving review throughput.
- **LobsterAI** (17 merges) — high merge volume, but April-era issues remain unaddressed; maintainers prioritize contributions over issue triage.

**Tier 3 — Maintenance mode:**
- **PicoClaw** (3 merges, bug→fix pairing) — responsive to reports but low volume; essentially a driven-by-community project.

**Tier 4 — Dormant:**
- **NullClaw** (Dependabot-only PR open 64 days with zero comments) and **ZeptoClaw** (zero activity) — no active development signals; adopters should treat them as frozen.

---

## 7. Trend Signals

**1. Reliability is the new feature.** Across every active project, the loudest user complaints are silent failures: dropped messages, wedged sessions, loops that burn spend without answering. The projects winning user trust this window (NanoBot's Telegram fix, PicoClaw's loop fix, ZeroClaw's security patches) did so by making failures *visible and bounded*. Expect "failure observability" (liveness checks, watchdog timeouts, cause-specific error messages) to become a purchasing/code-selection criterion.

**2. Maintainer bandwidth is the ecosystem's critical shortage.** OpenClaw's ClawSweeper bot shows that automation can surface fixes at machine speed, but ~39/50 top issues sit in `needs-maintainer-review`. Developers building on these projects should budget for patch lag and prefer projects with documented decision queues (ZeroClaw's RFC tracker, IronClaw's epic decomposition) or demonstrable same-window bug→fix cycles (IronClaw #7714→#7717).

**3. Cost governance is moving from nice-to-have to table stakes.** The NanoBot "Hybrid Spend Firewall" request, OpenClaw's token-waste quantification (20–30% from context bloat), CoPaw's context-usage ring fixes, and ZeroClaw's atomic budget accounting all point to the same need: **predictable LLM spend on autonomous agents**. Agent developers should build budget-aware tool-call loops (iteration caps, identical-failure early exit, cost-visible context assembly) now, before users get their bills.

**4. Cross-platform CI is a differentiator.** Hermes (Windows update failures), ZeroClaw (74 Windows test failures), NanoBot (Windows PID adoption), and OpenClaw (Windows Node pinning) all show Windows is still an afterthought — but the projects that scheduled macOS/Windows test workflows (ZeroClaw) or shipped Windows-specific fixes (Hermes, NanoBot PRs) are building trust with the largest desktop OS. This is an open opportunity for any project that gets it right.

**5. Multi-agent orchestration is converging from three directions.** Hermes adds `hermes peer` (cross-gateway bot DMs), CoPaw users request single-session agent collaboration, LobsterAI proposes Markdown workflow orchestration, and Moltis expands ACP external-agent support. The winning abstraction is not yet clear (peer-to-peer protocol vs. session-sharing vs. workflow files). Developers choosing a platform should watch whether A2A/ACP-style standards gain traction across project boundaries, rather than remaining project-specific.

**6. OpenAI-compatible APIs are becoming the universal integration contract.** ZeroClaw's Chat Completions RFC (Open WebUI, LobeChat, Continue.dev, Aider, LangChain clients) reflects demand for drop-in agent interoperability. Projects that expose a compatible endpoint — or integrate external agents via ACP (Moltis, MiniMax Code) — are positioning themselves as infrastructure rather than single-purpose assistants.

**7. Security hardening is shifting from transport to policy.** The most-merged security work this window was not encryption or SSO, but **acknowledgement gates** (OpenClaw install-policy warnings, ZeroClaw's permit-none semantics for empty `allowed_groups`), **resource bounds** (ZeroClaw's attachment download limits, IronClaw's obligation audits), and **credential hygiene** (ZeroClaw's Gemini key header migration, LobsterAI's log redaction). This reflects real-world agent deployment risk: the attack surface is now tool invocation and configuration, not just the network layer.

---

**Bottom line for decision-makers:** Choose Hermes or IronClaw if you need release discipline and responsive maintainers today; choose OpenClaw if you need maximum channel breadth and are willing to ride out cited regressions; choose ZeroClaw if you need a security-first, RFC-governed foundation and can wait for v0.9.0; treat NullClaw and ZeptoClaw as unmaintained. Across all projects, build your own loop-termination guards, cost ceilings, and failure alerting — the ecosystem has not yet solved them for you.

---

*Data sources: project digests for 2026-08-18 (OpenClaw, NanoBot, Hermes Agent, PicoClaw, NanoClaw, NullClaw, IronClaw, LobsterAI, Moltis, CoPaw, ZeptoClaw, ZeroClaw). Health scores are analyst composites, not project-reported metrics.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-18

## 1. Today's Overview

On 2026-08-18, NanoBot shows a high-velocity development window: **15 PRs were updated in the last 24 hours** and **3 issues changed state**, though **no new releases** were cut. Merged/closed work focused on gateway process identity, Telegram polling recovery, the new TypeScript TUI, and goal-loop clarification fixes. Open PRs continue to advance WebUI collaboration features, provider fallback hardening, and Windows-specific lifecycle fixes. Overall project health looks strong, with responsive maintainers and active community contributions, including resolution of the long-standing Telegram stall issue (#5171).

## 2. Releases

**No new releases in this period.**

## 3. Project Progress

Five PRs were closed/merged in the last 24 hours:

- [PR #5416](https://github.com/HKUDS/nanobot/pull/5416) — **fix(gateway): stabilize process identities**  
  Replaces locale-dependent macOS process identity detection with native `proc_pidinfo`, aligns gateway client leases through a shared process-identity contract, and preserves Windows/Linux legacy handling.

- [PR #5301](https://github.com/HKUDS/nanobot/pull/5301) — **fix(telegram): bridge stdlib logging and detect stalled polling**  
  Splits out lightweight observability: stdlib logging into loguru + a liveness check that logs without rebuilding connections. This was a low-risk precursor to the full polling watchdog.

- [PR #5156](https://github.com/HKUDS/nanobot/pull/5156) — **fix(telegram): recover from silently stalled polling**  
  Fixes [#5171](https://github.com/HKUDS/nanobot/issues/5171). Adds recovery for permanent Telegram polling stalls after transient network failures. This was a major reliability fix.

- [PR #5406](https://github.com/HKUDS/nanobot/pull/5406) — **feat(cli): add native TypeScript terminal UI**  
  Supersedes [#4329](https://github.com/HKUDS/nanobot/issues/4329) with the same contiguous commit history plus cross-terminal fixes. The recovery note explains the earlier mistaken merge and immediate restoration of `main`.

- [PR #5410](https://github.com/HKUDS/nanobot/pull/5410) — **fix(goal): stop repeating clarification replies**  
  Fixes sustained-goal continuation logic that re-injected continuation after normal model responses, preserving it only at the actual tool-call budget boundary.

Issue [#5171](https://github.com/HKUDS/nanobot/issues/5171) was also closed, confirming the Telegram polling fix landed.

## 4. Community Hot Topics

- [Issue #4864](https://github.com/HKUDS/nanobot/issues/4864) — **[OPEN] Endless loop for `<tool_call> <function=complete_goal>`**  
  **7 comments, 1 👍** — This is the most active issue in the window. The agent repeatedly calls `complete_goal` because the gateway parses the `recap` parameter as a bare string instead of JSON. Underlying need: reliable tool-call serialization and loop prevention in autonomous agent runs.

- [Issue #5409](https://github.com/HKUDS/nanobot/issues/5409) — **[OPEN] Add a Hybrid Spend Firewall**  
  New feature request with no comments yet, but high strategic signal. The user worries about power users running infinite loops and unintentionally burning LLM budget. Underlying need: cost-control guardrails as NanoBot moves toward commercialization.

- [Issue #5171](https://github.com/HKUDS/nanobot/issues/5171) — **[CLOSED] Telegram polling stalls silently and never recovers**  
  Closed after active discussion and fixes. Underlying need: production messaging reliability, especially for self-hosted bots behind unstable networks.

## 5. Bugs & Stability

Ranked by potential impact:

- **Critical / High — [Issue #4864](https://github.com/HKUDS/nanobot/issues/4864): Endless `complete_goal` loop**  
  Open. The gateway’s recent tool-parameter serialization change breaks JSON payloads, causing repeated tool calls and potential token waste. No fix PR is visible in this window; needs maintainer investigation.

- **High — [PR #5407](https://github.com/HKUDS/nanobot/pull/5407): Disabled cron heartbeat/dream jobs keep firing**  
  Open. Setting `gateway.heartbeat.enabled=false` or disabling dream jobs still leaves persisted system jobs active in `cron/jobs.json`, burning tokens. A fix PR exists and needs review.

- **Medium — [PR #5413](https://github.com/HKUDS/nanobot/pull/5413): Provider exceptions bypass fallback policy**  
  Open. The fallback loop only handles `LLMResponse(finish_reason="error")`; raised exceptions can escape. Fix applies fallback to raised errors too.

- **Medium — [PR #5414](https://github.com/HKUDS/nanobot/pull/5414): Slack file downloads not validated across redirects**  
  Open. Slack private URLs can redirect; the shared URL guard was not applied across the full redirect chain. This is a security hardening fix.

- **Medium — [PR #5415](https://github.com/HKUDS/nanobot/pull/5415): Windows venv child process adoption**  
  Open. Managed Windows gateway interpreter should adopt the recorded PID of its venv launcher. Regression test included.

- **Low/Medium — [PR #5412](https://github.com/HKUDS/nanobot/pull/5412): Background child output not flushed to logs**  
  Open. Python block-buffers stdout when redirected to a file, delaying startup logs. Fix flushes early output.

- **Resolved — [Issue #5171](https://github.com/HKUDS/nanobot/issues/5171): Telegram polling stall**  
  Closed via [PR #5156](https://github.com/HKUDS/nanobot/pull/5156).

## 6. Feature Requests & Roadmap Signals

- **[Issue #5409](https://github.com/HKUDS/nanobot/issues/5409) — Hybrid Spend Firewall**  
  A community user proposes cost-control mechanisms to prevent infinite loops and surprise LLM bills. This aligns with NanoBot’s commercialization trajectory and may become a roadmap feature.

- **[PR #5358](https://github.com/HKUDS/nanobot/pull/5358) — WebUI session messaging via mentions**  
  Gives persisted WebUI sessions stable server-owned `@name`s and exposes `list_sessions` / `send_session_message` APIs. Likely candidate for next WebUI release.

- **[PR #5408](https://github.com/HKUDS/nanobot/pull/5408) — WebUI follow-up suggestions**  
  Adds ephemeral, chat-scoped follow-up suggestions after successful turns, provider-neutral and compatible with the existing composer UX.

- **[PR #5364](https://github.com/HKUDS/nanobot/pull/5364) — WebUI temporary side conversations**  
  Adds `/side` for transient parallel conversations with tab switching and independent draft/streaming state.

- **[PR #5406](https://github.com/HKUDS/nanobot/pull/5406) — Native TypeScript terminal UI**  
  Already closed/merged; likely to appear in an upcoming release.

Given activity, the next NanoBot version may include Telegram polling recovery, gateway process identity stabilization, goal-loop fixes, the TypeScript TUI, and possibly session messaging or side conversations if the open WebUI PRs merge soon.

## 7. User Feedback Summary

- **Loop frustration (#4864):** Users are hitting endless tool-call loops due to gateway serialization changes, causing operational frustration and cost concerns. This is the loudest negative signal in the data.
- **Telegram reliability (#5171):** The silent permanent polling stall was a serious production pain point. Its closure via [PR #5156](https://github.com/HKUDS/nanobot/pull/5156) should improve user trust.
- **Commercial/budget anxiety (#5409):** One user explicitly praised the project (“Love the work on `HKUDS/nanobot`”) but flagged unlimited LLM spend as a scaling risk for commercial adopters.
- **Cross-platform pain (#5341):** Community contributor identified Windows PowerShell `curl` alias issues in the weather skill, showing real-world use across operating systems and willingness to contribute fixes.
- **Positive contribution momentum:** Multiple first-time or external contributors submitted quality PRs for gateway, Slack, provider, and WebUI improvements — a healthy sign for project sustainability.

## 8. Backlog Watch

- **[Issue #4864](https://github.com/HKUDS/nanobot/issues/4864)** — Open since **2026-07-09**, 7 comments, critical `complete_goal` endless-loop bug. Needs maintainer triage and a fix PR.

- **[PR #5341](https://github.com/HKUDS/nanobot/pull/5341)** — Open since **2026-08-11**, labeled `conflict`. Makes the weather workflow Windows-safe. Needs rebase/merge attention.

- **[PR #5358](https://github.com/HKUDS/nanobot/pull/5358)** — Open since **2026-08-12**. WebUI session messaging via mentions. Needs review.

- **[PR #5364](https://github.com/HKUDS/nanobot/pull/5364)** — Open since **2026-08-13**, labeled `conflict`. WebUI side conversations feature. Needs review/rebase.

- **[PR #5407](https://github.com/HKUDS/nanobot/pull/5407)** — Open and important: fixes disabled cron jobs still firing. Should be prioritized due to token-cost impact.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-18

## 1. Today's Overview

Hermes Agent is in a high-activity stabilization and integration phase. In the last 24 hours, 50 issues and 50 PRs were updated, with 9 issues closed and 16 PRs closed/merged. A new patch release, **v0.20.3 (v2026.8.16.2)**, tags roughly 125 merged PRs for downstream consumers. The busiest areas are webhook reliability, session/compaction correctness, Windows install/update behavior, MCP protocol conformance, and the new skills-trust/distribution work. Overall project health looks strong: the sharding epic completed, several desktop bugs were closed, and the release cadence remains steady.

## 2. Releases

**v2026.8.16.2 — Hermes Agent v0.20.3**  
Released August 16, 2026. This is labeled a patch release and rolls up ~125 PRs merged since v0.20.2 into a stable tagged release for Docker images, hosted deployments, and fresh installs. The provided release text does not include explicit breaking-change or migration notes; as a patch release, the expectation is backward-compatible behavior, but consumers should still review the ~125 PR roll-up in the release notes for edge-case changes.

## 3. Project Progress

Visible closed/merged items in the last 24 hours include both automated maintenance and functional fixes:

- [#61033 — fix(desktop): avoid local profile REST backend spawns](https://github.com/NousResearch/hermes-agent/pull/61033) — closed; fixes the duplicate dashboard-backend bug reported in [#61023](https://github.com/NousResearch/hermes-agent/issues/61023).
- [#88720](https://github.com/NousResearch/hermes-agent/pull/88720) and [#88714](https://github.com/NousResearch/hermes-agent/pull/88714) — closed automated JS `npm run fix` formatting PRs.
- [#78647 — Large-file decomposition: 20/20 done](https://github.com/NousResearch/hermes-agent/issues/78647) — closed as COMPLETE; repo-wide god-file sharding epic finished.
- [#88200 — Desktop: BOTS sidebar preview shows wrong session content on click](https://github.com/NousResearch/hermes-agent/issues/88200) — closed.
- [#88540 — Desktop: cross-profile bot switch lands on blank new-chat route](https://github.com/NousResearch/hermes-agent/issues/88540) — closed.
- [#88146 — Failed intro/missing pin can replace the Bot Chat](https://github.com/NousResearch/hermes-agent/issues/88146) — closed.
- [#4775 — Hermes rewrites raw config.yaml with expanded defaults and env secrets](https://github.com/NousResearch/hermes-agent/issues/4775) — closed.

Active open PRs show strong next-version momentum: bot-to-bot DMs ([#88725](https://github.com/NousResearch/hermes-agent/pull/88725)), group-chat handle rendering ([#88721](https://github.com/NousResearch/hermes-agent/pull/88721)), Discord bot-reply chain controls ([#88723](https://github.com/NousResearch/hermes-agent/pull/88723), [#88724](https://github.com/NousResearch/hermes-agent/pull/88724)), git-backed shared skills ([#88719](https://github.com/NousResearch/hermes-agent/pull/88719)), skills trust sidecars ([#88700](https://github.com/NousResearch/hermes-agent/pull/88700), [#88704](https://github.com/NousResearch/hermes-agent/pull/88704)), and Codex compaction threshold fixes ([#88717](https://github.com/NousResearch/hermes-agent/pull/88717), [#88722](https://github.com/NousResearch/hermes-agent/pull/88722)).

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- [#78647 — Large-file decomposition: 20/20 done](https://github.com/NousResearch/hermes-agent/issues/78647) — 74 comments. Underlying need: architecture maintainability and reducing god-file complexity. Closed as complete.
- [#84834 — Webhook Feature Package — graph-gated repair meta-issue](https://github.com/NousResearch/hermes-agent/issues/84834) — 17 comments. Underlying need: end-to-end webhook reliability across ingress, execution, delivery, UI, and docs.
- [#86093 — Windows: hermes update always fails](https://github.com/NousResearch/hermes-agent/issues/86093) — 8 comments, 2 👍. Underlying need: reliable self-update on Windows; the live `hermes.exe` rename/quarantine path is broken.
- [#53902 — Renderer stuck in fontations+temporal_rs loop, GPU 98%, 13W](https://github.com/NousResearch/hermes-agent/issues/53902) — 7 comments. Underlying need: desktop power/performance regression.
- [#87654 — Vision tools disappear after first availability probe](https://github.com/NousResearch/hermes-agent/issues/87654) — 5 comments. Underlying need: session-level tool stability and consistent capability probing.
- [#79742 — SessionDB leaks per-thread WAL read connections](https://github.com/NousResearch/hermes-agent/issues/79742) — 4 comments, 1 👍. Underlying need: long-running process stability and FD-exhaustion avoidance.

PR comment counts were not populated in the provided data, but the most active PR cluster is the skills/trust/external-repo work, followed by Codex compaction fixes and new bot-messaging features.

## 5. Bugs & Stability

Ranked by severity label and user impact:

**P1**

- [#86093 — Windows: hermes update always fails](https://github.com/NousResearch/hermes-agent/issues/86093) — live `hermes.exe` cannot be renamed; quarantine pollutes `PendingFileRenameOperations`. No visible fix PR yet.
- [#88655 — Scheduler-level cron processing errors bypass failure_nudge alerting](https://github.com/NousResearch/hermes-agent/issues/88655) — cron jobs can die silently for hours. No visible fix PR yet.
- [#88654 — Updater gateway auto-restart can silently fail, leaving mixed-version gateway](https://github.com/NousResearch/hermes-agent/issues/88654) — PID→profile mapping risk after in-place updates. This is likely feeding the cron issue above.
- [#79742 — SessionDB per-thread WAL read connection leak → EMFILE](https://github.com/NousResearch/hermes-agent/issues/79742) — long-running reader threads leak SQLite read connections. No visible fix PR yet.

**P2**

- [#88695 — Native Responses compaction fires at 200K while Codex OAuth window is now 900K](https://github.com/NousResearch/hermes-agent/issues/88695) — open fix PRs: [#88717](https://github.com/NousResearch/hermes-agent/pull/88717), [#88722](https://github.com/NousResearch/hermes-agent/pull/88722).
- [#87654 — Vision tools disappear after first availability probe](https://github.com/NousResearch/hermes-agent/issues/87654) — cached `_AuxProbeClientStub` makes `vision_analyze`/`browser_vision` unavailable.
- [#72716 — optimize-storage can stamp empty FTS after interrupted demote](https://github.com/NousResearch/hermes-agent/issues/72716) — permanent search loss risk.
- [#88713 — /save crashes with `'GatewayRunner' object has no attribute 'get_adapter'`](https://github.com/NousResearch/hermes-agent/issues/88713) — duplicate/regression report; no fix PR visible.
- [#87823](https://github.com/NousResearch/hermes-agent/issues/87823) and [#86601](https://github.com/NousResearch/hermes-agent/issues/86601) — desktop auto-TTS double-reads or replays audio twice.
- [#61828 — install.sh --stage protocol masks stage failures](https://github.com/NousResearch/hermes-agent/issues/61828) — failed `uv venv` can still report success.
- [#37751 — Desktop and Gateway config double-write conflict](https://github.com/NousResearch/hermes-agent/issues/37751) — contradictory config states after model switching.
- [#88168 — Case-collision files under contributors/emails break Windows git status](https://github.com/NousResearch/hermes-agent/issues/88168) — permanently dirty checkout on Windows.

**P3 / security**

- [#88706 — Close use-time, provenance, and authority gaps behind #88232/#88435](https://github.com/NousResearch/hermes-agent/issues/88706) — security hardening follow-up, still needs decision/repro.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals this cycle:

- **Skills trust and distribution** — PRs [#88700](https://github.com/NousResearch/hermes-agent/pull/88700), [#88704](https://github.com/NousResearch/hermes-agent/pull/88704), and [#88719](https://github.com/NousResearch/hermes-agent/pull/88719) point toward project-scoped, git-backed, fingerprint-verified skills.
- **Bot-to-bot communication** — [#88725](https://github.com/NousResearch/hermes-agent/pull/88725) adds `hermes peer` for cross-gateway bot DMs; Discord bot-loop controls follow in [#88723](https://github.com/NousResearch/hermes-agent/pull/88723).
- **Webhook Feature Package** — [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) remains a major meta-issue spanning five surface areas.
- **ByteDance/TikTok/Douyin plugin integration** — [#86950](https://github.com/NousResearch/hermes-agent/issues/86950) requests native TikTok Business and Douyin plugins.
- **Project-local `.hermes/`** — [#48970](https://github.com/NousResearch/hermes-agent/issues/48970) is an epic for per-project skills + MCP gated by consent.
- **Architecture: transactional install/update/bootstrap plan** — [#88683](https://github.com/NousResearch/hermes-agent/issues/88683) and **cron/session recovery fencing** — [#88688](https://github.com/NousResearch/hermes-agent/issues/88688).
- **Platform portability** — [#88648](https://github.com/NousResearch/hermes-agent/pull/88648) adds uv + pip-backend selection for Termux.

Likely next-version focus: skills trust/sidecars and external repos, compaction threshold fixes, bot-to-bot peers, and continued webhook repair work.

## 7. User Feedback Summary

Real user pain points from the last 24 hours include:

- **Windows update/install reliability is a major sore spot.** Multiple issues report failed updates, dirty git checkouts, and broken auto-restart behavior.
- **Desktop multi-profile behavior is gradually improving** — several bot-session and backend-spawn bugs were closed, but users still hit profile-switching edge cases.
- **TTS users are annoyed by duplicate audio playback**, with two separate issues tracking the same root cause.
- **Session/search integrity concerns remain**: FTS loss after interrupted demote and SQLite FD leaks are high-trust issues.
- **Cron/gateway operators are worried about silent failures** after in-place updates; mixed-version gateways erode confidence in observability.
- **Positive signals**: users/contributors are actively shipping large architecture work — the 20/20 god-file sharding epic completion and v0.20.3 release show a healthy, organized maintainer workflow.

## 8. Backlog Watch

Older items that still need maintainer attention:

- [#53666 — clarify tool prompts don't render in chat UI](https://github.com/NousResearch/hermes-agent/issues/53666) — open since June 27, P1, only 3 comments. Long-running user-facing bug.
- [#37751 — Desktop/Gateway config double-write conflict](https://github.com/NousResearch/hermes-agent/issues/37751) — open since June 3, P2, 2 comments. Still unresolved Windows config-expectation mismatch.
- [#53902 — Renderer GPU/power loop on desktop](https://github.com/NousResearch/hermes-agent/issues/53902) — open since June 28, P3, 7 comments. Needs either a fix or explicit performance triage.
- [#61828 — install.sh --stage masks failures](https://github.com/NousResearch/hermes-agent/issues/61828) — open since July 10, P2; bootstrap reliability bug.
- [#72716 — optimize-storage can stamp empty FTS](https://github.com/NousResearch/hermes-agent/issues/72716) — open since July 27, P2; permanent data/search loss risk.
- [#66543 — Custom providers should map reasoning effort per model](https://github.com/NousResearch/hermes-agent/issues/66543) — open since July 17, P3, needs decision.
- [#71486 — fix(compression): recover live tip across rotation chains](https://github.com/NousResearch/hermes-agent/pull/71486) — open since July 25, P2; session/compression correctness PR still not merged.
- [#72986 — feat(desktop): drag-run animation and floor roaming for pet overlay](https://github.com/NousResearch/hermes-agent/pull/72986) — open since July 28, P3; appears to have had no visible review activity.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-18

## 1. Today's Overview

PicoClaw saw moderate activity in the last 24 hours: 4 issues and 4 PRs were updated, with one issue closed and three PRs closed/merged. No new releases were published. The most significant movement was around agent-loop reliability: the long-running “repeated identical tool failure” bug (#3311) is now closed with a corresponding fix PR (#3312). Two new bugs were reported — Slack image uploads failing and Google Antigravity returning a generic 429 — one of which already has a fix PR open (#3340). Overall, the project appears responsive to community-reported issues, though release cadence has paused.

## 2. Releases

No new releases were published in the reporting window.

## 3. Project Progress

Three PRs were closed/merged in the last 24 hours:

- **[PR #3312 — fix(agent): stop turn early on repeated identical tool failure](https://github.com/sipeed/picoclaw/pull/3312)**  
  Fixes the silent agent loop where the same tool failure (e.g. `git` without credentials) was retried until `max_tool_iterations`, leaving users with no answer. This closes issue [#3311](https://github.com/sipeed/picoclaw/issues/3311).

- **[PR #271 — fix: env overrides when config.json is missing and add regression test](https://github.com/sipeed/picoclaw/pull/271)**  
  Fixes env-based configuration not being applied when `config.json` is absent (common in Fly deployments). Prevents the app from silently using default models or missing credentials.

- **[PR #2606 — feat: enhance Weixin channel support and configuration](https://github.com/sipeed/picoclaw/pull/2606)**  
  Adds multi-instance Weixin channel handling, dynamic channel directory support, improved validation for illegal channel names, and more stable multi-instance flow.

Still open:

- **[PR #3340 — fix(slack): set FileSize on media upload params](https://github.com/sipeed/picoclaw/pull/3340)**  
  Targets the Slack `file size cannot be 0` upload failure by explicitly setting `FileSize` in `slack.UploadFileParameters`.

## 4. Community Hot Topics

- **[Issue #3287 — [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**  
  The most active item with 6 comments. Users need PicoClaw to treat long IRCv3 messages split across 512-byte chunks as one cohesive message, rather than as separate newline-delimited messages. This highlights real-world IRC usability needs and remains open/stale.

- **[Issue #3311 — [BUG] Repeated identical tool failure loops silently to max_tool_iterations](https://github.com/sipeed/picoclaw/issues/3311)**  
  Though now closed, this issue drew attention to a serious production pain point: a Telegram user asked the agent to run a `git` command and never received a reply because the agent kept retrying the same failure. The fix in [#3312](https://github.com/sipeed/picoclaw/pull/3312) directly addresses this.

## 5. Bugs & Stability

Ranked by severity:

1. **[#3311 — Repeated identical tool failure loops silently to max_tool_iterations](https://github.com/sipeed/picoclaw/issues/3311)** — High  
   Users could wait minutes for an answer that never came. Fixed by [#3312](https://github.com/sipeed/picoclaw/pull/3312), now closed.

2. **[#3339 — Antigravity generation returns generic 429 despite valid OAuth scopes](https://github.com/sipeed/picoclaw/issues/3339)** — High  
   Google Antigravity auth and model discovery work, but every generation request returns `RESOURCE_EXHAUSTED` with no quota detail. No fix PR yet; needs maintainer investigation.

3. **[#3338 — Slack does not attach image media content](https://github.com/sipeed/picoclaw/issues/3338)** — Medium  
   All Slack media uploads fail with `file.upload.v2: file size cannot be 0` because `SendMedia` does not set `FileSize`. Fix PR [#3340](https://github.com/sipeed/picoclaw/pull/3340) is open.

## 6. Feature Requests & Roadmap Signals

- **[Issue #3287 — Better IRC long-message handling](https://github.com/sipeed/picoclaw/issues/3287)** remains the clearest feature request. Since IRCv3 clients split messages at 512 bytes, PicoClaw currently treats fragments as separate messages, breaking context. This is a strong candidate for a future release if maintainers prioritize IRC channel reliability.

- **[PR #2606 — Weixin channel enhancement](https://github.com/sipeed/picoclaw/pull/2606)** closed this window, suggesting continued investment in multi-instance channel support. Similar robustness work may be expected for other channels, including Slack and IRC.

## 7. User Feedback Summary

- **Pain point: silent agent failures.** The #3311 report from production over Telegram is a strong dissatisfaction signal: tools failing consistently can cause the agent to burn through all iterations and never answer the user.
- **Pain point: Slack media uploads are completely broken.** #3338 shows a zero-value `FileSize` bug blocking all image attachments, likely affecting many Slack users.
- **Pain point: IRC message fragmentation.** Users want PicoClaw to understand long IRCv3 messages as one message, indicating current behavior is confusing or loses meaning.
- **Positives:** The project is quickly pairing bug reports with fix PRs (#3338 → #3340, #3311 → #3312), which suggests responsive maintainership and a healthy contribution flow.

## 8. Backlog Watch

- **[Issue #3287 — IRC long message support](https://github.com/sipeed/picoclaw/issues/3287)** is the main backlog item. It has been open since 2026-07-22, is marked stale, still has 6 comments, and has no attached PR. Maintainer triage or a decision on scope would help.

- With [#3312](https://github.com/sipeed/picoclaw/pull/3312), [#271](https://github.com/sipeed/picoclaw/pull/271), and [#2606](https://github.com/sipeed/picoclaw/pull/2606) now closed, no long-standing PRs appear to be waiting for attention. The next risk item is [#3339](https://github.com/sipeed/picoclaw/issues/3339), which is new but currently unresolved and affects a provider integration.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-18

## Today’s Overview

In the last 24 hours, NanoClaw had a high-activity day: **39 PRs updated** (17 open, 22 merged/closed) and **4 issues updated** (3 open, 1 closed). No new release was published. The core team is actively building a more modular channel/session architecture, including a driver seam, channel-layer hooks, and setup-wizard extensions. Community contributors are also responding quickly to recent regressions, especially around task execution in chat sessions and bounded pending-message polling. Overall project health looks strong in contribution velocity, but the cluster of task-delivery and codex-provider bugs suggests users are hitting real post-2.1.48 stability issues.

## Releases

No new releases were published in this window. There are no changelog, breaking-change, or migration notes to report.

## Project Progress

22 PRs were merged or closed in the last 24 hours. Among the most visible closed PRs:

- [nanocoai/nanoclaw#3304](https://github.com/nanocoai/nanoclaw/pull/3304) — Adapter-declared session-mode context defaults; threads stamp is now derived.
- [nanocoai/nanoclaw#3292](https://github.com/nanocoai/nanoclaw/pull/3292) — Inbound-policy registration seam on the Chat SDK bridge.
- [nanocoai/nanoclaw#3297](https://github.com/nanocoai/nanoclaw/pull/3297) — Setup wizard per-channel pre-step and companion-skill declarations.
- [nanocoai/nanoclaw#3293](https://github.com/nanocoai/nanoclaw/pull/3293) — Router session-created hook for brand-new engaged sessions.
- [nanocoai/nanoclaw#3294](https://github.com/nanocoai/nanoclaw/pull/3294) — Post-delivery hook with first-delivery context.
- [nanocoai/nanoclaw#3296](https://github.com/nanocoai/nanoclaw/pull/3296) — Additive MCP tool extension via `extendTool`.
- [nanocoai/nanoclaw#3295](https://github.com/nanocoai/nanoclaw/pull/3295) — Generic membership-event hook on the Chat SDK bridge.

These changes collectively make NanoClaw’s channel, router, delivery, and setup layers more extensible without editing core bridge code.

## Community Hot Topics

The most commented issue in this window is a documentation bug:

- [nanocoai/nanoclaw#1143](https://github.com/nanocoai/nanoclaw/issues/1143) — **Closed, 2 comments.** Skill docs reference `/data/env`, which no longer exists. This is a real user-facing documentation drift issue and was closed during the window.

The most consequential open topics are:

- [nanocoai/nanoclaw#3203](https://github.com/nanocoai/nanoclaw/issues/3203) — `codex` provider emits an undeclared `file` ProviderEvent, failing the typecheck on `main` and causing generated images to be silently dropped.
- [nanocoai/nanoclaw#3301](https://github.com/nanocoai/nanoclaw/issues/3301) — Task rows firing inside chat sessions switch the whole query into task mode, causing dropped logs, eaten replies, and unlisted series.
- [nanocoai/nanoclaw#3289](https://github.com/nanocoai/nanoclaw/issues/3289) — `getPendingMessages()` loads every due pending row into JavaScript before applying limits, causing memory pressure on accumulated backlogs.

The underlying needs are clear: users want reliable task execution inside chat sessions, bounded background polling, and a Codex provider that does not break the build or drop artifacts.

## Bugs & Stability

Ranked by severity:

1. **[nanocoai/nanoclaw#3203](https://github.com/nanocoai/nanoclaw/issues/3203) — High.** The `codex` provider emits an undeclared `file` event, fails typecheck on `main`, and codex-generated images are silently dropped. No direct fix PR is visible in this window.
2. **[nanocoai/nanoclaw#3301](https://github.com/nanocoai/nanoclaw/issues/3301) — High.** Task rows firing in chat sessions trigger “one-door” task mode, losing run logs and replies. Fix PR [nanocoai/nanoclaw#3303](https://github.com/nanocoai/nanoclaw/pull/3303) is open to preserve run logs for task rows in chat sessions.
3. **[nanocoai/nanoclaw#3289](https://github.com/nanocoai/nanoclaw/issues/3289) — Medium.** Unbounded pending-message polling can load a large backlog into memory. Fix PR [nanocoai/nanoclaw#3291](https://github.com/nanocoai/nanoclaw/pull/3291) is open.
4. **[nanocoai/nanoclaw#3299](https://github.com/nanocoai/nanoclaw/pull/3299) — Medium/urgent.** `/add-codex` pins `@openai/codex` at 0.138.0, whose default model GPT-5.4 retires from Codex on 2026-08-31. PR [nanocoai/nanoclaw#3299](https://github.com/nanocoai/nanoclaw/pull/3299) bumps the pin to 0.146.0.
5. **[nanocoai/nanoclaw#3300](https://github.com/nanocoai/nanoclaw/pull/3300) — Low/Medium.** The attachment type is not escaped in agent-facing XML output; the PR itself fixes the escaping gap.
6. **[nanocoai/nanoclaw#1143](https://github.com/nanocoai/nanoclaw/issues/1143) — Low.** Documentation references a removed `/data/env` path; closed.

## Feature Requests & Roadmap Signals

- **Local web chat is a strong feature signal.** Two PRs propose local browser chat channels: [nanocoai/nanoclaw#3298](https://github.com/nanocoai/nanoclaw/pull/3298) adds a loopback-only Local Web channel adapter, and [nanocoai/nanoclaw#3290](https://github.com/nanocoai/nanoclaw/pull/3290) adds a webchat channel via a native HTTP bridge. If maintainers consolidate these, a local webchat channel could ship soon.
- **Operational/debugging skills are wanted.** [nanocoai/nanoclaw#3288](https://github.com/nanocoai/nanoclaw/pull/3288) adds `/add-clawmetry`, a read-only local dashboard with a NanoClaw session adapter, responding to pain around session inspection and overnight activity review.
- **CLI ergonomics are advancing.** [nanocoai/nanoclaw#3218](https://github.com/nanocoai/nanoclaw/pull/3218) adds bounded JSON stdin support to host and container `ncl` clients.
- **Architecture roadmap is visible.** The stacked core-team PRs [nanocoai/nanoclaw#3305](https://github.com/nanocoai/nanoclaw/pull/3305), [nanocoai/nanoclaw#3306](https://github.com/nanocoai/nanoclaw/pull/3306), [nanocoai/nanoclaw#3307](https://github.com/nanocoai/nanoclaw/pull/3307), and [nanocoai/nanoclaw#3308](https://github.com/nanocoai/nanoclaw/pull/3308) point toward pluggable session runtimes and safer group/folder handling. These are likely foundations for a future non-Docker driver.

Prediction: the channel/driver seams and task-logging fixes are likely to land in the next minor release. The Codex pin bump should be expedited given the 2026-08-31 model retirement date.

## User Feedback Summary

- **Task regression pain.** [nanocoai/nanoclaw#3301](https://github.com/nanocoai/nanoclaw/issues/3301) reports that after 2.1.48, task rows in chat sessions lose logs, replies, and series visibility. This is the strongest reported regression in the window.
- **Codex workflow uncertainty.** [nanocoai/nanoclaw#3203](https://github.com/nanocoai/nanoclaw/issues/3203) shows users relying on `/add-codex` for image output are hitting silent failures, which undermines confidence in the skill.
- **Scale pain.** [nanocoai/nanoclaw#3289](https://github.com/nanocoai/nanoclaw/issues/3289) indicates operators with accumulated message backlogs are seeing unbounded memory usage during polling.
- **Documentation confusion.** [nanocoai/nanoclaw#1143](https://github.com/nanocoai/nanoclaw/issues/1143) confirms users are still following skill docs that reference the removed `/data/env` path.
- **Debugging gap.** [nanocoai/nanoclaw#3288](https://github.com/nanocoai/nanoclaw/pull/3288) suggests the current “ask Claude Code” debugging answer is not enough for users who need to inspect sessions and overnight activity.

No explicit positive satisfaction signal appears in the issue/PR texts in this window; feedback is largely problem-oriented, which is consistent with a period of active regressions and fast community contribution.

## Backlog Watch

- [nanocoai/nanoclaw#3203](https://github.com/nanocoai/nanoclaw/issues/3203) — Open since 2026-08-08, affects `main` typecheck, and has only one comment. Needs maintainer triage and likely a direct fix PR.
- [nanocoai/nanoclaw#3218](https://github.com/nanocoai/nanoclaw/pull/3218) — Bounded JSON stdin feature has been open since 2026-08-09 with no visible review activity in the data.
- [nanocoai/nanoclaw#1143](https://github.com/nanocoai/nanoclaw/issues/1143) — Long-running documentation issue created 2026-03-16; it was closed in this window, clearing the oldest visible backlog item.
- [nanocoai/nanoclaw#3299](https://github.com/nanocoai/nanoclaw/pull/3299) — Fresh but time-sensitive; needs expedited review before the Codex model retirement date.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-18

## 1. Today's Overview

NullClaw had a very quiet day. No issues were updated in the last 24 hours, and no new releases were published. The only activity was a single open pull request (#956) from Dependabot that received an update timestamp, suggesting ongoing automated dependency maintenance rather than active development. With zero open issues and no merged pull requests, the repository appears to be in a low-activity maintenance phase. Project health is stable but stagnant from a contributor standpoint.

## 2. Releases

No new releases were published in the last 24 hours. No release data is available for this period.

## 3. Project Progress

No pull requests were merged or closed in the last 24 hours. No feature development, bug fixes, or refactoring work was completed during this window.

## 4. Community Hot Topics

The only item with any recent activity is a dependency update PR:

- **PR #956 — [dependencies, docker] ci(deps): bump alpine from 3.23 to 3.24 in the docker-images group** ([link](https://github.com/nullclaw/nullclaw/pull/956))
  - Author: dependabot[bot]
  - Opened: 2026-06-15
  - Last updated: 2026-08-17
  - Comments: 0 | Reactions: 0

Despite being open for over two months, this PR has attracted zero maintainer or community engagement. The underlying need is straightforward — keeping the Docker base image for NullClaw's container builds current (Alpine 3.24 offers updated security patches and package versions over 3.23). The lack of review activity could indicate maintainer bandwidth constraints rather than disinterest.

## 5. Bugs & Stability

No bugs, crashes, regressions, or stability issues were reported or fixed in the last 24 hours. There were no issue updates at all during this period.

## 6. Feature Requests & Roadmap Signals

No feature requests were submitted or discussed in the last 24 hours. There are no roadmap signals available from this data window. The only forward-looking signal is the pending dependency bump (Alpine 3.24), which is an infrastructure modernization rather than a user-facing feature.

## 7. User Feedback Summary

No user feedback — comments, reactions, or issue reports — was recorded in the last 24 hours. There is insufficient data to assess user satisfaction, pain points, or usage patterns during this period.

## 8. Backlog Watch

- **PR #956 — ci(deps): bump alpine from 3.23 to 3.24** ([link](https://github.com/nullclaw/nullclaw/pull/956))
  - Open since 2026-06-15 (~64 days without merge)
  - No maintainer comments or reviews
  - Status: Needs maintainer attention

This is the sole backlog item. While Dependabot PRs are often low-priority, a two-month-old dependency bump with zero maintainer interaction suggests the project may need more active triage, especially since stale base images can accumulate known vulnerabilities over time.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-18

## 1. Today's Overview

IronClaw is in a very active maintenance and feature-development cycle. In the last 24 hours, 28 issues and 44 PRs were updated, with 6 issues closed and 16 PRs closed/merged. No new releases were published. The dominant themes are the durable DB write-pressure epic ([#7591](https://github.com/nearai/ironclaw/issues/7591)), the durable notification-inbox workstream ([#7687](https://github.com/nearai/ironclaw/issues/7687)–[#7691](https://github.com/nearai/ironclaw/issues/7691)), and a dogfooding/QA bug-fixing campaign ([#7685](https://github.com/nearai/ironclaw/issues/7685)). A critical libSQL/resource-governor stability bug ([#7714](https://github.com/nearai/ironclaw/issues/7714)) was reported and already has a fix PR ([#7717](https://github.com/nearai/ironclaw/pull/7717)), showing a responsive maintainer workflow. Overall project health is strong, though write-lane stability and several onboarding/UX gaps remain the main sources of user-facing friction.

## 2. Releases

No new releases were published in this window. The “Latest Releases” data is empty, so there are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress

Closed/merged PRs visible in the provided sample:

- [nearai/ironclaw#7663](https://github.com/nearai/ironclaw/pull/7663) — Closed: forward-ports validated 1.2 release fixes to `main`, including Windows filesystem/release-smoke reliability, clean Windows JSON output, runtime `curl` healthchecks, and thread-index repair.
- [nearai/ironclaw#7703](https://github.com/nearai/ironclaw/pull/7703) — Closed: WASM typed tool-response work, superseded and folded into [#7711](https://github.com/nearai/ironclaw/pull/7711).
- [nearai/ironclaw#7710](https://github.com/nearai/ironclaw/pull/7710) — Closed: addresses multi-agent review findings on the Slack connect-link PR ([#7682](https://github.com/nearai/ironclaw/pull/7682)).

Closed issues indicate completed work:

- [nearai/ironclaw#7275](https://github.com/nearai/ironclaw/issues/7275) — Persistent-memory recall across conversations was verified and closed.
- [nearai/ironclaw#7594](https://github.com/nearai/ironclaw/issues/7594), [#7598](https://github.com/nearai/ironclaw/issues/7598), [#7605](https://github.com/nearai/ironclaw/issues/7605) — Three write-pressure epic sub-issues closed: CoalescingEventSink routing, capability invocation-state writes, and message lookup-index fold-in.
- [nearai/ironclaw#7637](https://github.com/nearai/ironclaw/issues/7637) — Design-system component boundaries typed.
- [nearai/ironclaw#7647](https://github.com/nearai/ironclaw/issues/7647) — Deterministic no-delivery outcome for scheduled automation runs added.

Notable open PRs advancing features:

- [nearai/ironclaw#7711](https://github.com/nearai/ironclaw/pull/7711) — Final PR of the capability-response-normalization stack: typed WASM tool response, guest migration, dispatch-error cleanup.
- [nearai/ironclaw#7694](https://github.com/nearai/ironclaw/pull/7694) — Durable backend suggestions: `suggestions.list`, `suggestions.generate`, `suggestion.start`, `suggestion.dismiss`.
- [nearai/ironclaw#7693](https://github.com/nearai/ironclaw/pull/7693) — Native structured-output finalization.
- [nearai/ironclaw#7708](https://github.com/nearai/ironclaw/pull/7708) — Automation run-now across trigger domain and WebUI.
- [nearai/ironclaw#7718](https://github.com/nearai/ironclaw/pull/7718) — Semantic Google Docs editing tools.

## 4. Community Hot Topics

Issue discussion is mostly technical and performance-oriented. No issues have significant 👍 reactions, so engagement is driven by comments.

- [nearai/ironclaw#7275](https://github.com/nearai/ironclaw/issues/7275) — 4 comments: closed verification issue about persistent memory recall across conversations. Underlying need: users want explicit memory to reliably survive across sessions.
- [nearai/ironclaw#7591](https://github.com/nearai/ironclaw/issues/7591) — 3 comments: epic for reducing durable DB write pressure ~60% while preserving multi-worker safety. Underlying need: reduce operational DB cost and write amplification.
- [nearai/ironclaw#3762](https://github.com/nearai/ironclaw/issues/3762) — 2 comments: editing `AGENTS.md` in the WebUI does not update the system prompt. Long-running customer-facing issue tagged `suggested_P1` and `v1.4.0`.
- [nearai/ironclaw#7701](https://github.com/nearai/ironclaw/issues/7701), [#7603](https://github.com/nearai/ironclaw/issues/7603), [#7604](https://github.com/nearai/ironclaw/issues/7604) — 2 comments each: technical sub-issues of the write-pressure epic, focused on row-count reduction and batching safety.

Underlying pattern: the community/maintainer discussion is concentrated on durability, performance, and configuration-propagation guarantees.

## 5. Bugs & Stability

Ranked by severity:

- [nearai/ironclaw#7714](https://github.com/nearai/ironclaw/issues/7714) — Critical: libSQL single shared write connection starves the resource-governor journal, causing cascading authority invalidation, permanent reservation leaks, and capability-call failures. Fix PR exists: [nearai/ironclaw#7717](https://github.com/nearai/ironclaw/pull/7717).
- [nearai/ironclaw#7707](https://github.com/nearai/ironclaw/issues/7707) — High: side-effect-outstanding state is inferred from newest checkpoint kind, which an integration test proved unsafe for lease-expiry recovery. Related fix approach: [#7712](https://github.com/nearai/ironclaw/pull/7712).
- [nearai/ironclaw#7705](https://github.com/nearai/ironclaw/issues/7705) — Medium/High: `CoalescingEventSink` shutdown can hang on a wedged event backend, and `pending_flush_error` can latch permanently.
- [nearai/ironclaw#7702](https://github.com/nearai/ironclaw/issues/7702) — Medium: obligation audit records required by the host-api contract are never written in production.
- [nearai/ironclaw#3762](https://github.com/nearai/ironclaw/issues/3762) — Medium/High user-facing: WebUI edits to `AGENTS.md` do not update the system prompt for current or future conversations.
- [nearai/ironclaw#7716](https://github.com/nearai/ironclaw/issues/7716) — Medium QA: “Add MCP server” flow missing bearer-key auth and STDIO/HTTP transport options.
- [nearai/ironclaw#7715](https://github.com/nearai/ironclaw/issues/7715) — Medium QA: Telegram connection flow does not let users choose bot vs. personal account.
- [nearai/ironclaw#7681](https://github.com/nearai/ironclaw/issues/7681) — Medium: Slack unlinked-user connect message is public in shared channels and requires a manual multi-step round trip. Fix PR: [#7682](https://github.com/nearai/ironclaw/pull/7682), with review follow-up [#7710](https://github.com/nearai/ironclaw/pull/7710).
- [nearai/ironclaw#7704](https://github.com/nearai/ironclaw/issues/7704) — Systemic: daily failure taxonomy identifies storage write-lane contention as the largest fixable IronClaw defect in benchmark runs.

## 6. Feature Requests & Roadmap Signals

User-requested and contributor-proposed features visible this cycle:

- [nearai/ironclaw#7719](https://github.com/nearai/ironclaw/issues/7719) — GitHub Projects v2 field manipulation in the GitHub tool.
- [nearai/ironclaw#7716](https://github.com/nearai/ironclaw/issues/7716) — MCP server flow should support bearer-key auth and STDIO/HTTP transport.
- [nearai/ironclaw#7715](https://github.com/nearai/ironclaw/issues/7715) — Telegram connection should ask whether the user is connecting a bot or a personal account.
- [nearai/ironclaw#7681](https://github.com/nearai/ironclaw/issues/7681) — Slack unlinked-user connect should be private and one-click.
- [nearai/ironclaw#3762](https://github.com/nearai/ironclaw/issues/3762) — `AGENTS.md`/identity-file edits should affect the system prompt immediately.
- [nearai/ironclaw#7694](https://github.com/nearai/ironclaw/pull/7694) — Durable, product-surface-neutral backend suggestions.
- [nearai/ironclaw#7693](https://github.com/nearai/ironclaw/pull/7693) — Native structured-output finalization.
- [nearai/ironclaw#7708](https://github.com/nearai/ironclaw/pull/7708) — Run-now for automations from triggers and WebUI.
- [nearai/ironclaw#7718](https://github.com/nearai/ironclaw/pull/7718) — Semantic Google Docs editing tools.
- [nearai/ironclaw#7513](https://github.com/nearai/ironclaw/pull/7513) — ACP serve command for external tool integration.
- [nearai/ironclaw#7184](https://github.com/nearai/ironclaw/pull/7184) — Nostr host functions for WASM tools.

Likely next-version signals: `v1.4.0` is already referenced by [#3762](https://github.com/nearai/ironclaw/issues/3762). The active notification-inbox epic ([#7687](https://github.com/nearai/ironclaw/issues/7687)–[#7691](https://github.com/nearai/ironclaw/issues/7691)), write-pressure reductions ([#7591](https://github.com/nearai/ironclaw/issues/7591)), and automation/run-now work are strong candidates for the next release.

## 7. User Feedback Summary

Real user pain points reported this cycle:

- Persistent memory was not reliably recalled across conversations; the verification issue [#7275](https://github.com/nearai/ironclaw/issues/7275) was closed, indicating maintainers have confirmed or restored the expected behavior.
- Editing `AGENTS.md` in the WebUI not affecting the system prompt remains a long-standing customer-facing problem ([#3762](https://github.com/nearai/ironclaw/issues/3762)).
- QA testers report onboarding friction: MCP server setup lacks auth/transport options ([#7716](https://github.com/nearai/ironclaw/issues/7716)), and Telegram connection does not clarify bot vs. personal mode ([#7715](https://github.com/nearai/ironclaw/issues/7715)).
- Slack users without a linked IronClaw account receive public connect prompts in shared channels, creating privacy and usability concerns ([#7681](https://github.com/nearai/ironclaw/issues/7681)).
- Benchmark analysis points to storage write-lane contention as the top runtime failure source ([#7704](https://github.com/nearai/ironclaw/issues/7704), [#7714](https://github.com/nearai/ironclaw/issues/7714)).

Satisfaction signal is indirect: the project is closing verification issues and producing targeted fix PRs quickly. Dissatisfaction is concentrated around configuration/identity propagation and first-run/onboarding flows.

## 8. Backlog Watch

Items that appear stuck or need maintainer attention:

- [nearai/ironclaw#3762](https://github.com/nearai/ironclaw/issues/3762) — Open since 2026-05-18, tagged `suggested_P1`, `customer`, and `v1.4.0`, but only 2 comments in three months. Needs a clear owner or roadmap commitment.
- [nearai/ironclaw#6994](https://github.com/nearai/ironclaw/pull/6994) — Large OOBE automation-tasks prototype PR open since 2026-08-01, gated behind a flag. Needs design review or explicit next step.
- [nearai/ironclaw#7184](https://github.com/nearai/ironclaw/pull/7184) — Nostr host functions for WASM tools, open since 2026-08-04 from a new contributor. Needs maintainer feedback.
- [nearai/ironclaw#7513](https://github.com/nearai/ironclaw/pull/7513) — ACP serve command with streaming/cancel support, open since 2026-08-11 from a new contributor. Needs review.
- [nearai/ironclaw#7406](https://github.com/nearai/ironclaw/pull/7406) — Dependabot PR for the actions group, open since 2026-08-09. Needs merge or update to avoid CI/dependency drift.
- [nearai/ironclaw#7491](https://github.com/nearai/ironclaw/pull/7491) — Large core-tool contract/benchmark PR open since 2026-08-11. Needs continued review attention.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI Project Digest — 2026-08-18

### 1. Today's Overview

LobsterAI is in an active development cycle: 21 PRs were updated in the last 24 hours, with 17 merged/closed and 4 still open. At the same time, 7 issues remain open and were touched by bot/community activity, but none were closed. No new release was published. The merged PR set is broad, covering a new DSH engine/runtime, per-agent working directories, security logging fixes, and many Cowork UI/UX improvements. The issue queue still carries several stale items from April that lack maintainer responses, but the high PR merge volume suggests maintainers are prioritizing contributions.

### 2. Releases

None in the last 24 hours.

### 3. Project Progress

Merged/closed PRs in the last 24 hours include:

- **DSH engine integration** ([#2502](https://github.com/netease-youdao/LobsterAI/pull/2502)) and **DSH process launcher** ([#2505](https://github.com/netease-youdao/LobsterAI/pull/2505)) — added DeepSeek Harness runtime support; documentation PR [#2506](https://github.com/netease-youdao/LobsterAI/pull/2506) remains open.
- **Electron edit context menu** ([#2503](https://github.com/netease-youdao/LobsterAI/pull/2503)) — text inputs now support Cut/Copy/Paste/Select All.
- **Skill upgrade progress overlay fix** ([#2501](https://github.com/netease-youdao/LobsterAI/pull/2501)) — overlay now covers the full app and adds better logging.
- **OrcaRouter provider integration** ([#2504](https://github.com/netease-youdao/LobsterAI/pull/2504)) — open; adds OrcaRouter as a first-class LLM gateway provider.

A large batch of earlier community PRs also closed/merged:

- Cowork UX: floating scroll-to-bottom button ([#1636](https://github.com/netease-youdao/LobsterAI/pull/1636)), AI reply "regenerate" button ([#1637](https://github.com/netease-youdao/LobsterAI/pull/1637)), copy buttons for tool results ([#1640](https://github.com/netease-youdao/LobsterAI/pull/1640)).
- Modal consistency: all popups now support Esc-to-close ([#1641](https://github.com/netease-youdao/LobsterAI/pull/1641)).
- i18n: fixed hardcoded English tooltips in multiple components ([#1639](https://github.com/netease-youdao/LobsterAI/pull/1639)).
- Desktop: added Windows right-click menu integration ([#1642](https://github.com/netease-youdao/LobsterAI/pull/1642)).
- Security: exported logs are now redacted for API keys/tokens ([#1661](https://github.com/netease-youdao/LobsterAI/pull/1661)).
- OpenClaw upgrade: runtime bumped to v2026.4.12, openclaw-weixin plugin upgraded to 2.1.8 ([#1663](https://github.com/netease-youdao/LobsterAI/pull/1663)).
- Settings: Qwen console links migrated to 百炼 ([#1667](https://github.com/netease-youdao/LobsterAI/pull/1667)); provider "test connection" button logic fixed ([#1669](https://github.com/netease-youdao/LobsterAI/pull/1669)).
- Agent config: per-agent working directory support added ([#1668](https://github.com/netease-youdao/LobsterAI/pull/1668)).
- Cowork sessions: session list now groups by time period ([#1675](https://github.com/netease-youdao/LobsterAI/pull/1675)).

### 4. Community Hot Topics

Most active issues in the last 24 hours:

- [#1653 groupPolicy keeps being overwritten to allowlist](https://github.com/netease-youdao/LobsterAI/issues/1653) — 2 comments. User reports recurring configuration overwrite; likely a persistence/concurrency issue.
- [#2500 VOKO: cross-platform IM and group collaboration for AI agents](https://github.com/netease-youdao/LobsterAI/issues/2500) — community author introduces an A2A communication layer; signals demand for agent interoperability.
- [#1635 Ollama local models cannot be used](https://github.com/netease-youdao/LobsterAI/issues/1635) — qwen3/gemma4 fail in LobsterAI while working in Cherry Studio.
- [#1643 "There is still unsaved content" when saving scheduled task](https://github.com/netease-youdao/LobsterAI/issues/1643) — false warning despite successful save.
- [#1644 Request: Markdown-based workflow for main agent to orchestrate other agents](https://github.com/netease-youdao/LobsterAI/issues/1644) — users want multi-agent orchestration and agent-to-agent awareness.
- [#1662 MCP engines other than SSE cannot be used](https://github.com/netease-youdao/LobsterAI/issues/1662) — MCP transport compatibility gap.
- [#1671 md-to-word conversion stops with "sse response finish reason: full"](https://github.com/netease-youdao/LobsterAI/issues/1671) — long-running tasks hit response truncation.

### 5. Bugs & Stability

Ranked by severity:

1. **Ollama local models unusable** — [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635). Blocks local-model users; no fix PR linked.
2. **Non-SSE MCP engines not found** — [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662). Functional gap for MCP tooling compatibility.
3. **groupPolicy repeatedly overwritten** — [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653). Possible config corruption or concurrent writes.
4. **SSE "finish reason: full" truncates long conversions** — [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671). Loses output during md-to-word tasks.
5. **Misleading "unsaved content" toast** — [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643). Low-severity UX bug.

Fixed in the last 24 hours:

- Missing Cut/Copy/Paste context menu in Electron text inputs ([#2503](https://github.com/netease-youdao/LobsterAI/pull/2503)).
- Skill upgrade progress overlay not covering the app shell ([#2501](https://github.com/netease-youdao/LobsterAI/pull/2501)).
- Plaintext secrets in exported logs now redacted ([#1661](https://github.com/netease-youdao/LobsterAI/pull/1661)).

### 6. Feature Requests & Roadmap Signals

- **Multi-agent orchestration via Markdown workflows** ([#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)) is a strong roadmap signal: users want the main agent to discover and coordinate other agents.
- **Cross-platform A2A communication** ([#2500](https://github.com/netease-youdao/LobsterAI/issues/2500)) points toward broader agent interoperability ambitions.
- **Per-agent working directories** ([#1668](https://github.com/netease-youdao/LobsterAI/pull/1668)) and **time-grouped session lists** ([#1675](https://github.com/netease-youdao/LobsterAI/pull/1675)) were merged and are likely in the next release.
- **OrcaRouter provider** ([#2504](https://github.com/netease-youdao/LobsterAI/pull/2504)) and **DSH engine** ([#2502](https://github.com/netease-youdao/LobsterAI/pull/2502), [#2505](https://github.com/netease-youdao/LobsterAI/pull/2505)) show continued expansion of supported runtimes and model gateways.

### 7. User Feedback Summary

Users are actively contributing polished UX improvements, indicating strong community engagement. The most common pain points are local model support, MCP transport compatibility, configuration persistence, and truncation of long tasks. Several issues have remained unanswered since April and are now marked stale. At the same time, the large number of accepted community PRs suggests maintainers are responsive to well-scoped contributions.

### 8. Backlog Watch

Issues/PRs needing maintainer attention:

- [#1653 groupPolicy overwritten to allowlist](https://github.com/netease-youdao/LobsterAI/issues/1653) — open since April, 2 comments.
- [#1635 Ollama local models broken](https://github.com/netease-youdao/LobsterAI/issues/1635) — open since April.
- [#1643 false unsaved-content toast](https://github.com/netease-youdao/LobsterAI/issues/1643) — open since April.
- [#1644 Markdown workflow / multi-agent orchestration request](https://github.com/netease-youdao/LobsterAI/issues/1644) — open since April.
- [#1662 non-SSE MCP unsupported](https://github.com/netease-youdao/LobsterAI/issues/1662) — open since April.
- [#1671 md-to-word truncation](https://github.com/netease-youdao/LobsterAI/issues/1671) — open since April.
- PR [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) — dependabot Electron/electron-builder bump, open since April 2.
- PR [#1660](https://github.com/netease-youdao/LobsterAI/pull/1660) — non-main agent welcome screen, open since April 13.
- PR [#2506](https://github.com/netease-youdao/LobsterAI/pull/2506) — DSH setup documentation, still open.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-18

## 1. Today's Overview
Moltis had a productive 24 hours: 2 issues were closed, 9 PRs were updated, and 6 PRs were closed/merged while 3 remain open. Activity centered on heartbeat configuration fixes, external-agent support, a new WebUI RPC timeout setting, dependency maintenance, and a major in-progress Files library feature. No new releases were published. The closure of several long-running PRs and issues suggests the maintainers are actively clearing backlog while still accepting new feature work.

## 3. Project Progress

Closed/merged PRs advanced both features and fixes:

- **External agent model/effort selection** — [#1125](https://github.com/moltis-org/moltis/pull/1125) closed after adding first-class `model` and `effort` selection for external-agent providers in `/model`.
- **MiniMax Code ACP agent** — [#1204](https://github.com/moltis-org/moltis/pull/1204) added a named `acp-minimax-code` external-agent kind and included MiniMax Code in executable detection and the agent registry.
- **Configurable WebUI RPC timeout** — [#1130](https://github.com/moltis-org/moltis/pull/1130) closed, fixing [#1127](https://github.com/moltis-org/moltis/issues/1127).
- **Shadow DOM browser lookups** — [#1103](https://github.com/moltis-org/moltis/pull/1103) closed, improving browser snapshot/ref lookup paths with efficient shadow DOM piercing.
- **Dependency updates** — [#1207](https://github.com/moltis-org/moltis/pull/1207) bumped `wasmtime-wasi`, `cmov`, `quinn-proto`, and `serde_with`; [#1087](https://github.com/moltis-org/moltis/pull/1087) bumped `tar` to 0.4.46.

## 4. Community Hot Topics

There are no high-comment or high-reaction threads in the current data, so “hot topics” are inferred from activity and subject matter:

- **[#1209](https://github.com/moltis-org/moltis/pull/1209)** — Fix for `heartbeat.update` being treated as a whole replacement instead of a patch. Underlying need: callers expect partial updates to preserve unset config values.
- **[#1208](https://github.com/moltis-org/moltis/pull/1208)** — Fix for `heartbeat.active_hours` being ignored by the cron scheduler. Underlying need: users want time-based heartbeat suppression to actually work.
- **[#1206](https://github.com/moltis-org/moltis/pull/1206)** — Open PR adding a managed Files library and Settings browser. Underlying need: persistent, authenticated file management and a richer configuration UI.

These PRs represent the most active ongoing work: heartbeat correctness and a broader file-management feature.

## 5. Bugs & Stability

Ranked by likely user impact:

- **High: `heartbeat.active_hours` has no effect** — The scheduler never calls `is_within_active_hours`, so heartbeat runs even outside configured hours. Fix PR: [#1208](https://github.com/moltis-org/moltis/pull/1208).
- **High: `heartbeat.update` overwrites entire config** — Unspecified fields reset to defaults because params are deserialized directly into `HeartbeatConfig`. Fix PR: [#1209](https://github.com/moltis-org/moltis/pull/1209).
- **Medium: Format CI gate red on `main`** — [#1202](https://github.com/moltis-org/moltis/issues/1202) reported two files exceeding the 1500-line limit; the issue is now closed.
- **Fixed: Shadow DOM lookup inefficiency** — [#1103](https://github.com/moltis-org/moltis/pull/1103) closed, resolving the browser lookup path issue.
- **Maintenance: dependency bumps** — [#1207](https://github.com/moltis-org/moltis/pull/1207) and [#1087](https://github.com/moltis-org/moltis/pull/1087) updated Rust dependencies.

No crashes or regressions were reported in the last 24 hours.

## 6. Feature Requests & Roadmap Signals

- **RPC timeout configuration** — [#1127](https://github.com/moltis-org/moltis/issues/1127) was closed by [#1130](https://github.com/moltis-org/moltis/pull/1130), so this user-requested feature is likely landed or shipping.
- **External-agent model/effort selection** — [#1125](https://github.com/moltis-org/moltis/pull/1125) closed, indicating deeper external-agent configuration is now supported.
- **MiniMax Code integration** — [#1204](https://github.com/moltis-org/moltis/pull/1204) shows continued expansion of supported external agents.
- **Files library and Settings browser** — [#1206](https://github.com/moltis-org/moltis/pull/1206) is a significant open feature; if merged, it would add persistent file management plus a Finder-style settings UI.

Likely next-version items: the heartbeat fixes in [#1208](https://github.com/moltis-org/moltis/pull/1208) and [#1209](https://github.com/moltis-org/moltis/pull/1209) are small and targeted, so they may land soon. The Files library may take longer given its scope.

## 7. User Feedback Summary

- **Positive signal:** A user requested configurable RPC timeout in [#1127](https://github.com/moltis-org/moltis/issues/1127), and the feature was delivered via [#1130](https://github.com/moltis-org/moltis/pull/1130).
- **Persistent pain point:** Heartbeat configuration is error-prone: one issue reports `active_hours` not being honored; another reports `heartbeat.update` clobbering config. Fixes are proposed but not yet merged.
- **Adoption demand:** Contributions around external agents and MiniMax Code indicate interest in flexible agent/provider configuration.
- No explicit satisfaction or dissatisfaction comments were available in this window.

## 8. Backlog Watch

- Several long-running items were cleared today: [#1125](https://github.com/moltis-org/moltis/pull/1125) (open since June 15), [#1103](https://github.com/moltis-org/moltis/pull/1103) (since June 4), [#1087](https://github.com/moltis-org/moltis/pull/1087) (since May 29), and [#1127](https://github.com/moltis-org/moltis/issues/1127) (since June 17).
- The current open PRs are all recent, with no obviously abandoned issues requiring maintainer attention.
- **[#1206](https://github.com/moltis-org/moltis/pull/1206)** is the largest open change and may need focused review. The two heartbeat fixes, [#1208](https://github.com/moltis-org/moltis/pull/1208) and [#1209](https://github.com/moltis-org/moltis/pull/1209), are also awaiting merge decision.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-18

## 1. Today's Overview

CoPaw/QwenPaw shows high maintenance activity in the last 24 hours: **14 issues updated** (8 open, 6 closed) and **35 PRs updated** (13 open, 22 merged/closed), with **no new releases**. The project is clearly in a post-`v2.1.0` stabilization phase, mixing v2.1.x bug triage with feature work around plugins, console UX, and provider integrations. The number of closed issues and PRs indicates a responsive maintainer workflow, though several notable v2.1.0 regressions remain open. The lack of a release today means recently merged fixes are not yet available to end users.

## 2. Releases

No new releases in the last 24 hours. No migration notes or breaking-change notices to report.

## 3. Project Progress

22 PRs were closed/merged. Notable items from the updated set:

- **[PR #7083](https://github.com/agentscope-ai/QwenPaw/pull/7083) — Compact background task list and scroll hint**: Console background-task panel no longer pushes chat input down and handles overflow more clearly.
- **[PR #7017](https://github.com/agentscope-ai/QwenPaw/pull/7017) — Open newly installed PawApps without reload**: Improves plugin/app installation UX by avoiding manual page refreshes.
- **[PR #5151](https://github.com/agentscope-ai/QwenPaw/pull/5151) — GitPanel tab style fix**: Fixed CSS selectors broken by the `qwenpaw` prefixCls override.
- **[PR #7036](https://github.com/agentscope-ai/QwenPaw/pull/7036) — Media download controls**: Unified download controls for audio/media attachments in chat.
- **[PR #6975](https://github.com/agentscope-ai/QwenPaw/pull/6975) — Context-usage ring update after `/compact`**: Fixes stale context-usage display after compacting.
- **[PR #6968](https://github.com/agentscope-ai/QwenPaw/pull/6968) — Stop counting base64 images as text tokens**: Prevents context-usage ring from being falsely filled after image uploads.
- **[PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) — Native DataPaw app runtime**: Adds data-analysis workspace app runtime; related release pipeline work is in open **[PR #7089](https://github.com/agentscope-ai/QwenPaw/pull/7089)**.
- **[PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) — AnySearch web search integration**: Closed/merged attempt to add AnySearch as a web search backend; a newer duplicate is open in **[PR #7081](https://github.com/agentscope-ai/QwenPaw/pull/7081)**.

## 4. Community Hot Topics

The most active discussions by comment count:

- **[Issue #6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) — MCP tool “Tool not found” after upgrading to 2.0** (7 comments, closed): Users are confused by the `[mcp-key]__[tool_name]` tool-name prefix and cannot trigger MCP tools reliably. Underlying need: clearer MCP tool naming and migration guidance.
- **[Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console stop request cancels an active Feishu session** (6 comments, open): A serious session-identity crossing bug between Console UI and Feishu sessions. Underlying need: strict per-channel session isolation.
- **[Issue #7085](https://github.com/agentscope-ai/QwenPaw/issues/7085) — Per-channel model configuration** (3 comments, open): Users want different models per channel, e.g. DingTalk → `gpt-4o`, WeChat → `qwen-max`, Console → local `llama.cpp`.
- **[Issue #6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) — Agent collaboration in a single session** (2 comments, open): Users dislike new sessions being created for each multi-agent collaboration and having to switch agents to see messages.
- **[Issue #7088](https://github.com/agentscope-ai/QwenPaw/issues/7088) — OneBot QQ image URLs expire and poison session history** (2 comments, closed): Short-lived signed QQ image URLs cause downstream model API failures and repeated bad context.

PR comment counts were not populated in the sampled data, so issue comments were the primary activity signal.

## 5. Bugs & Stability

Ranked by estimated severity:

| Severity | Issue | Status | Notes |
|---|---|---|---|
| High | **[#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)** | Open | Console stop request can cancel an active Feishu session under multiple UI sessions. No fix PR attached yet. |
| High | **[#7088](https://github.com/agentscope-ai/QwenPaw/issues/7088)** | Closed | OneBot v11 passes short-lived QQ image URLs to the model; expired `rkey` causes HTTP 400 and poisons session history. Open **[PR #7087](https://github.com/agentscope-ai/QwenPaw/pull/7087)** addresses the broader remote-media-URL problem. |
| High | **[#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082)** | Open | `_StructuredOutputDynamicClass is not fully defined` Pydantic error during console/agent startup; blocks affected users. |
| Medium-High | **[#7077](https://github.com/agentscope-ai/QwenPaw/issues/7077)** | Closed | Plugin runtime hooks silently lost after workspace reload/hot-install. No fix PR observed. |
| Medium | **[#7076](https://github.com/agentscope-ai/QwenPaw/issues/7076)** | Open | `qwenpaw-creator` LLM model configuration returns 404 in latest 2.1.0. |
| Medium | **[#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)** | Closed | Console image attachments are lost/broken after session reload. |
| Medium | **[#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048)** | Closed/invalid | `qwenpaw cron update --text` reports success but prompt is not updated; marked invalid, but worth verifying if reproducible. |
| Low-Medium | **[#7084](https://github.com/agentscope-ai/QwenPaw/issues/7084)** | Open | With only one history conversation, opening a new chat makes the existing history entry unclickable. |
| Info | **[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)** | Closed | MCP Tool not found after v2.0 upgrade; likely documentation/naming issue. |
| Info | **[#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063)** | Closed/invalid | Reported tool-call crash from `async for` over a coroutine; closed as invalid in the tracker. |

## 6. Feature Requests & Roadmap Signals

Strong candidates for upcoming versions:

- **[#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085) — Per-channel model configuration**: Directly requested by multi-channel users; likely to be picked up given its cross-channel value.
- **[#7079](https://github.com/agentscope-ai/QwenPaw/issues/7079) / [PR #7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) — PowerContext long-term memory backend**: Implements existing `BaseMemoryManager` extension point and is ready for review.
- **[PR #7081](https://github.com/agentscope-ai/QwenPaw/pull/7081) — AnySearch integration**: Newer duplicate of the closed AnySearch PR; likely needs maintainer reconciliation and could land soon.
- **[#7075](https://github.com/agentscope-ai/QwenPaw/issues/7075) — Scheduled task run details**: Users want start time, duration, end time, and result status for cron tasks.
- **[#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) — Single-session multi-agent collaboration**: Important UX direction for agent orchestration.
- **[PR #7078](https://github.com/agentscope-ai/QwenPaw/pull/7078) — System prompt file picker in Console**: Provides a focused file-picker workflow for prompt files.
- **[PR #6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) — Session-scoped multi project directories**: Would let a chat bind to multiple project directories.
- **[PR #6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — Volcengine Agent Plan + Xiaomi MiMo providers**: Subscription-oriented providers requested by the community.
- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unified provider discovery/model routing**: Large architectural PR with major implications for model selection.

## 7. User Feedback Summary

Mixed but generally constructive. Power users are actively running QwenPaw across DingTalk, WeChat, QQ/OneBot, and Console, and are asking for channel-specific model routing ([#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085)). MCP users are feeling pain from v2.0 tool naming changes ([#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)), and desktop Console users are reporting UX regressions around image history ([#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)) and history navigation ([#7084](https://github.com/agentscope-ai/QwenPaw/issues/7084)). Plugin developers depend heavily on hot-install and runtime hooks, so silent hook loss ([#7077](https://github.com/agentscope-ai/QwenPaw/issues/7077)) is a meaningful trust issue. Many reports are in Chinese, reflecting a strong Chinese-speaking user base. No praise-heavy or highly satisfied feedback appeared in the sample; most signals are bug reports and feature requests, which indicates an engaged but demanding user community.

## 8. Backlog Watch

- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unified provider discovery, model metadata, routing, and agent controls**: Open since July 21; large, high-impact PR that needs maintainer attention.
- **[PR #6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — Volcengine Agent Plan and Xiaomi MiMo V2.5 providers**: Open since July 28; straightforward provider addition with no visible updates.
- **[PR #6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) — Persistent workspace artifact cards**: Open since August 5; substantial chat/workspace feature waiting for review.
- **[#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Feishu session cancellation bug**: High-severity open issue with no linked fix PR yet.
- **[PR #7081](https://github.com/agentscope-ai/QwenPaw/pull/7081) vs [PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) — Duplicate AnySearch integration**: Maintainers should decide which implementation to keep to avoid wasted follow-up work.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-18

## 1. Today's Overview

ZeroClaw is in a highly active, RFC-driven development phase: 50 issues and 50 PRs were updated in the last 24 hours, with 7 issues closed and 16 PRs merged/closed. No new release was published. The majority of activity remains concentrated in accepted architecture/security RFCs aimed at a future v0.9.0 milestone, alongside a steady stream of bug-fix PRs hardening channel, provider, and security boundaries. Community engagement is strong, with several long-running RFC threads still gathering discussion and revision. Overall project health looks solid: maintainer review is moving, cross-platform CI is improving, and security-related regressions are being addressed promptly.

## 2. Releases

No new releases in the last 24 hours. The latest visible project baseline referenced in RFCs is **0.8.4**, with 0.9.0 being the main target for pending auth/security/breaking-change work.

## 3. Project Progress

Merged/closed PRs visible in the 24-hour extract include a mix of security fixes, CI improvements, and test-stability changes. Highlights:

- [#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973) — Keep Gemini API keys out of URLs; use `x-goog-api-key` header instead.
- [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) — Make action-budget accounting atomic under parallel tool dispatch.
- [#10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000) — Bound QQ and Mattermost attachment downloads.
- [#9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993) — Stop implicit email attachment file reads.
- [#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612) — Tie WhatsApp Cloud approval token to a process guard.
- [#9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547) — Upgrade CPAL to 0.18 and migrate Voice Wake.
- [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) — Add scheduled macOS and Windows test workflows.
- [#10039](https://github.com/zeroclaw-labs/zeroclaw/pull/10039) — Extract shared Clippy runner across CI workflows.
- [#10043](https://github.com/zeroclaw-labs/zeroclaw/pull/10043) — Remove duplicate architecture-test guards from Lint.
- [#10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010) — Fix ETXTBSY race in cron custom-shell test.
- [#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765) — Load SOP definitions from the shared workspace instead of `data_dir`.
- [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544) — Make delegated targets honor configured provider fallbacks.

These changes signal progress on both stability and security hardening, especially around credential handling, parallel budget enforcement, and cross-platform CI.

## 4. Community Hot Topics

The most active issues are almost all RFCs or high-severity bug reports. PR comment counts were not included in the provided extract, so issue discussion is the main signal.

- [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) — **RFC: Work Lanes, Board Automation, and Label Cleanup** · 23 comments. Governance and maintainer-workflow automation are a recurring community need.
- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **RFC: ZeroClaw Chat Completions profile** · 23 comments. Strong demand for OpenAI-compatible API access from clients like Open WebUI, LobeChat, Continue.dev, and Aider.
- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **RFC: Goal mode v1** · 22 comments, 1 👍. Community interest in durable bounded foreground work across multiple agent turns.
- [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — **RFC: High-risk shell command confirmation tier** · 20 comments. Users want Claude Code-style allow/ask/deny command policy.
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — **RFC: Runtime-owned conversation sessions and transport adapters** · 19 comments.
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — **RFC: Unified attachment architecture** · 18 comments.
- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **RFC: Pluggable inbound authentication** · 16 comments.
- [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **74 Windows test failures** · 16 comments. Cross-platform reliability is a clear pain point.

Underlying needs: better maintainer automation, OpenAI-compatible interoperability, secure shell execution, clearer session/identity ownership, and Windows/macOS test parity.

## 5. Bugs & Stability

Ranked by severity and user impact:

- **Windows test suite: 74 failures** — [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) (S2, p1, accepted). Unix-only test commands, path semantics, and console encoding. Fix path: [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) adds scheduled macOS/Windows runs.
- **Gemini API keys exposed in URLs** — [#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973) (p1, security, merged/closed). Fixed by moving keys to `x-goog-api-key`.
- **RateLimitedTool non-atomic budget check** — [#9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849) (S2, p2, closed). Parallel dispatch could exceed `max_actions_per_hour`. Fixed by [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996).
- **Coding-agent tools charge action budget twice** — [#9594](https://github.com/zeroclaw-labs/zeroclaw/issues/9594) (S2, p2, closed). Related to security-policy accounting; addressed by the atomic accounting fix.
- **Telegram long-poll offset advances too early** — [#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) (p1, high risk, open, needs maintainer review). Transient failures could permanently lose updates.
- **QQ / Mattermost unbounded attachment downloads** — [#10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000) (p1, security, merged/closed).
- **WhatsApp empty `allowed_groups` admits every group** — [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) (p1, accepted, in-progress). Fix RFC proposes permit-none semantics.
- **Email attachments can trigger implicit local file reads** — [#9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993) (p1, security, merged/closed).
- **Provider failure logs report wrong model** — [#10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023) (p2, open). Pinned fallback model is served, but logs show the requested model.
- **Cron accepts invalid `session_target`** — [#10038](https://github.com/zeroclaw-labs/zeroclaw/pull/10038) (p2, open). Should reject typos instead of persisting them.
- **Heartbeat test writes and executes a runtime file** — [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) (p2, open task). Needs a fixture redesign to avoid races.

## 6. Feature Requests & Roadmap Signals

Several accepted RFCs are strong signals for the next release cycle:

- **OpenAI-compatible Chat Completions endpoint** — [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603). Likely to land as a gateway/runtime feature.
- **Goal mode v1** — [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303). Durable bounded work across turns.
- **Per-execution shell confirmation tier** — [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155). Allow/ask/deny command policy.
- **Runtime-owned sessions and attachments** — [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487), [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488). Major architecture shifts likely targeted for v0.9.0.
- **Pluggable inbound authentication / canonical principals** — [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141). Security milestone.
- **Unified catalog contract** — [#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346). Product-level package/capability catalog.
- **Lighter core through external integrations** — [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165). Long-running architecture debate with maintainer review pending.
- **v0.9.0 breaking-change tracker** — [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432). This is the central coordination point for auth, security, gateway, and breaking changes.

Given the volume of accepted high-risk RFCs, v0.9.0 is likely to be a major security/architecture release rather than a small incremental update.

## 7. User Feedback Summary

User and contributor feedback in this window highlights several concrete pain points:

- **Cross-platform development friction**: Windows tests are broken and CI didn't catch it ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)).
- **Security sensitivity**: Users are actively reporting and fixing credential exposure, unbounded downloads, implicit file reads, and unsafe channel defaults ([#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973), [#10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000), [#9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993), [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)).
- **Interoperability demand**: The Chat Completions RFC ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) reflects real users trying to connect Open WebUI, LobeChat, Aider, and LangChain.
- **Process frustration**: Contributors are actively trying to streamline the RFC process ([#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496)) and maintain a decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)).
- **Diagnostics quality**: Users notice mismatched provider failure logs ([#10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023)) and want cause-specific provider error messages ([#9056](https://github.com/zeroclaw-labs/zeroclaw/pull/9056)).

Overall, contributors appear engaged and maintainer responsiveness is visible through RFC revisions and merged security fixes.

## 8. Backlog Watch

Items that may need maintainer attention or are at risk of stalling:

- [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — RFC on lighter core via external integrations. Open since 2026-04-27, still `needs-maintainer-review`.
- [#9056](https://github.com/zeroclaw-labs/zeroclaw/pull/9056) — Provider failure diagnostics PR, open since 2026-07-14, labeled `needs-author-action` and `stale-candidate`.
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Hailo-Ollama support PR, large XL size, `needs-author-action`.
- [#6653](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) — Host-architecture policy for emulated installs, open since May without clear status labels.
- [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — Windows test failures, accepted p1 but requires sustained follow-through; scheduled platform tests are a good start.
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) and [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Both are high-risk architecture RFCs still awaiting maintainer review.
- [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — SOP capability permission contract, `needs-maintainer-review`.
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue; this tracker itself indicates review bottlenecks.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*