# OpenClaw Ecosystem Digest 2026-08-14

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-13 23:00 UTC

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

# OpenClaw Project Digest — 2026-08-14

## 1. Today's Overview
OpenClaw remains highly active: **500 issues** and **500 PRs** were updated in the last 24 hours, with 340 issues open/active and 160 closed, while 417 PRs are open and 83 are merged/closed. No new releases were published in this window. The most intense community discussion continues to center on **silent reply/delivery failures, subagent completion loss, session-state contamination, and multi-agent orchestration instability**. Maintainer/automation activity is also strong, with a steady flow of small-to-large UI, CLI, gateway, and channel-routing PRs moving through review.

## 2. Releases
**None.** No new OpenClaw versions were published in the last 24 hours, so there are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress
83 PRs moved to merged/closed status in the update window. Notable closed/merged PRs from the sample data:

- [PR #121850](https://github.com/openclaw/openclaw/pull/121850) — Routes legacy package executable `--version` through the fast path before CLI startup, avoiding unnecessary startup progress output.
- [PR #121690](https://github.com/openclaw/openclaw/pull/121690) — Adds `fallback: none` to startup progress, preventing spinner/cancel-line leaks in the `--version` path.
- [PR #122475](https://github.com/openclaw/openclaw/pull/122475) — Refactors Web UI chat rails to be full-height resizable columns, improving workspace/session/detail surfaces.
- [PR #123333](https://github.com/openclaw/openclaw/pull/123333) — Fixes incognito session reset leaving other clients in a deleted chat pane; the reset handler now broadcasts the correct `deleted` state.

Other high-value open PRs moving forward include [PR #123344](https://github.com/openclaw/openclaw/pull/123344) (CSP refusal misreported as unreachable portal), [PR #122679](https://github.com/openclaw/openclaw/pull/122679) (concurrent sandboxed runs dropping skills), and [PR #122350](https://github.com/openclaw/openclaw/pull/122350) (keeping model catalog reads responsive).

## 4. Community Hot Topics
The most active issues by comment count and reactions:

- [Issue #121058](https://github.com/openclaw/openclaw/issues/121058) — **Silent reply failures still recurring after #116277 closed** (92 comments). The monitoring cron continues to log new failures, including after the original fix was closed. This is the single most active community thread.
- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (48 comments). Users want memory provenance to prevent prompt-injection/memory-poisoning from untrusted web content.
- [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) — **Text between tool calls leaks to messaging channels** (48 comments, 1 👍). Internal narration/error text is being delivered to Slack/Telegram/iMessage as visible user-facing messages.
- [Issue #44925](https://github.com/openclaw/openclaw/issues/44925) — **Subagent completion silently lost** (27 comments, 2 👍). Multiple failure modes where subagent results vanish without retry, notification, or restart.
- [Issue #91363](https://github.com/openclaw/openclaw/issues/91363) — **Isolated cron "LLM request failed"** (10 comments, 6 👍). A high-reaction P1 reliability issue where cron jobs fail before the model request ever reaches the provider.
- [Issue #43367](https://github.com/openclaw/openclaw/issues/43367) — **Multi-agent orchestration unstable** (13 comments, 1 👍). Concurrent agent config overwrites, session-lock failures, and detached child work.

**Underlying needs:** the community is heavily focused on **delivery guarantees, session isolation, and memory safety**. The highest-signal threads are not new feature requests — they are recurring reliability failures in subagent orchestration, cron execution, and channel delivery.

## 5. Bugs & Stability
The most severe active issues updated in the last 24 hours, ranked by priority/impact:

- [Issue #121058](https://github.com/openclaw/openclaw/issues/121058) — **Silent reply failures still recurring** after #116277 was closed. P1-level community frustration; no new fix PR is visible in the sample.
- [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) — **Text between tool calls leaks to messaging channels** (P1, diamond lobster). Internal agent text is being delivered as visible channel messages.
- [Issue #44925](https://github.com/openclaw/openclaw/issues/44925) — **Subagent completion silently lost** (P1). No retry, notification, or auto-restart on timeout.
- [Issue #121953](https://github.com/openclaw/openclaw/issues/121953) — **Cron turns stall on DeepSeek** because the `[cron:...]` user-message prefix is deprioritized by DeepSeek's API. Labeled `linked-pr-open`, so a fix may be in progress.
- [Issue #123073](https://github.com/openclaw/openclaw/issues/123073) — **Dev-channel update fails** with `EUNSUPPORTEDPROTOCOL` because the updater uses npm while the repo requires pnpm. Fix PR [PR #123083](https://github.com/openclaw/openclaw/pull/123083) is open.
- [Issue #121605](https://github.com/openclaw/openclaw/issues/121605) — **Reply produced but never delivered after model fallback** from claude-cli to Anthropic fallback (closed in the update window, but represents a real regression class).
- [Issue #43367](https://github.com/openclaw/openclaw/issues/43367) — **Multi-agent orchestrator instability**: concurrent `agents add` overwrites config, session locks fail, child work detaches.
- [Issue #91363](https://github.com/openclaw/openclaw/issues/91363) — **Isolated cron jobs time out at `model-call-started`** with `usage.input=0`, meaning requests never reach the provider.

**Overall stability signal:** delivery/session-loss bugs remain the dominant stability concern. No release landed in this window, so these issues still affect current stable users.

## 6. Feature Requests & Roadmap Signals
Notable user-requested features visible in the current issue set:

- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (P2, security-tagged). Long-running request with 48 comments; likely a roadmap candidate for memory-hardening.
- [Issue #16555](https://github.com/openclaw/openclaw/issues/16555) — **TTL/Expiry for delivery queue messages** (P1). Directly targets the silent-reply/stale-queue class of failures and could plausibly land with delivery reliability work.
- [Issue #45771](https://github.com/openclaw/openclaw/issues/45771) — **Pace-aware rate limiting** for autonomous agents, to avoid burning through provider rate limits.
- [Issue #45508](https://github.com/openclaw/openclaw/issues/45508) — **Self-hosted STT/TTS support in WebChat**, routing through the gateway rather than browser Speech APIs.
- [Issue #45758](https://github.com/openclaw/openclaw/issues/45758) — **YAML config file support** alongside JSON5.
- [Issue #9016](https://github.com/openclaw/openclaw/issues/9016) — **Expose OpenRouter usage cost** to the agent runtime.
- [Issue #42276](https://github.com/openclaw/openclaw/issues/42276) — **Streaming/reasoning line overwrite** in the TUI, similar to OpenAI/Grok thinking indicators.

**Roadmap prediction:** the next release will likely prioritize **delivery reliability fixes (TTL, queue recovery, subagent completion delivery)** and **session-state isolation**, given the concentration of P1 bugs. Open PRs such as [PR #112375](https://github.com/openclaw/openclaw/pull/112375) (cron shell precheck gate) and [PR #122863](https://github.com/openclaw/openclaw/pull/122863) (admitted channel participant identity audit) suggest cron/channel hardening is also actively in flight.

## 7. User Feedback Summary
Real user pain points in this window:

- **Recurring silent failures are eroding trust.** Multiple threads report that "fixed" delivery issues still reproduce in production, as in #121058.
- **Subagent orchestration is a top pain point.** Users report lost completions, orphaned sessions, parent-session unresponsiveness, and detached child work across #44925, #47975, #67777, and #92433.
- **Memory management feels inconsistent.** Users observe different memory storage behaviors across teammates/installations, as in #43747.
- **Update/upgrade paths are fragile.** `sudo openclaw update`, dev-channel updates, and mixed-ownership config overwrites cause avoidable downtime (#78493, #123073).
- **Channel-specific regressions continue** across Telegram, Discord, Matrix, and iOS/WebChat (#41165, #44502, #97983, #122862).
- **Positive signal:** the community is contributing detailed reproductions and field reports, and maintainers are moving PRs through review. UI/CLI polish PRs are being closed regularly, suggesting good maintainer responsiveness even while deep reliability issues linger.

Overall satisfaction is **mixed**: the project is vibrant and contributors are engaged, but long-standing silent-loss and session-state bugs are causing visible frustration among power users.

## 8. Backlog Watch
Important open issues/PRs that have been waiting for maintainer/product attention:

- [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (Feb 3, P2, needs maintainer + product + security review, 48 comments). Security-relevant and heavily discussed, but no fix PR.
- [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) — **Text between tool calls leaks to messaging channels** (Feb 24, P1 diamond lobster, no-new-fix-pr, needs maintainer/product/security review). High severity and still open.
- [Issue #40611](https://github.com/openclaw/openclaw/issues/40611) — **Heartbeat retry blocks Telegram during active conversations** (Mar 9, P1 diamond lobster, no-new-fix-pr). Root-caused to PR #39182 but awaiting maintainer/product decision.
- [Issue #44502](https://github.com/openclaw/openclaw/issues/44502) — **Discord routing / mention-gating regression** (Mar 13, P1 diamond lobster, no-new-fix-pr, needs maintainer/product review).
- [Issue #78493](https://github.com/openclaw/openclaw/issues/78493) — **`sudo openclaw update` creates mixed ownership, then doctor overwrites config** (May 6, P1 diamond lobster, stable, recovery-stuck). High-impact upgrade-path bug.
- [Issue #89278](https://github.com/openclaw/openclaw/issues/89278) — **Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth timeout** (Jun 2, P1 platinum hermit, needs live repro).

Open PRs also waiting for maintainer look:

- [PR #91237](https://github.com/openclaw/openclaw/pull/91237) — OpenRouter long-TTL cache eligibility for Anthropic `cache_control` (open since Jun 7, status: ready for maintainer look).
- [PR #80396](https://github.com/openclaw/openclaw/pull/80396) — Warn when `MEDIA:` token is skipped inside fenced code blocks (open since May 10, needs proof).
- [PR #122679](https://github.com/openclaw/openclaw/pull/122679) — Fix concurrent sandboxed runs dropping skills from `available_skills` (open Aug 12, ready for maintainer look).

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Data window:** 2026-08-13 → 2026-08-14

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape remains highly active but is entering a **reliability-hardening phase** rather than a feature-expansion phase. Across the eight projects with meaningful activity, the dominant community complaints converge on the same class of failures: **silent reply loss, subagent completion disappearance, cron job stalling, and session-state contamination**. Projects are differentiating along three axes: core orchestration platforms (OpenClaw, IronClaw, ZeroClaw), desktop/web companions and specialized agents (CoPaw, LobsterAI, NanoClaw, PicoClaw), and adapter/integration layers (NanoBot, Moltis). Notably, the Chinese-speaking user segment is emerging as a major driver of bug discovery and feature demand, particularly around CoPaw/QwenPaw. Security hardening — supply-chain verification, CSPRNG pairing codes, sandbox escapes, and gateway asset containment — now appears across nearly every active project, suggesting the ecosystem is maturing toward production-grade trust requirements.

---

## 2. Activity Comparison

| Project | Issues Updated | PRs Updated | Releases | Health Score (1–10) |
|---|---|---|---|---|
| **OpenClaw** | 500 (160 closed) | 500 (83 merged) | None | **7.5** — Massive throughput, but P1 silent-delivery bugs persist with no fix PR |
| **IronClaw** | 50 (18 closed) | 50 (26 merged) | **1.2.0 stable promoted** | **9.0** — Disciplined epic decomposition, two P1 security fixes landed, release shipped |
| **ZeroClaw** | 50 (13 closed) | 50 (7 merged) | None (v0.9.0 mid-cycle) | **9.0** — Strong RFC governance, P1 security fixes closed within 24h of each other |
| **CoPaw / QwenPaw** | 42 (17 closed) | 50 (19 merged) | **v2.1.0 + v2.1.0-beta.5** | **8.0** — Two releases, active first-time contributors, but mid-task stalls unresolved |
| **Hermes Agent** | 50 (8 closed) | 50 (5 merged) | **v0.20.1** | **7.5** — Steady shipping, but P1 TUI regression unfixed for 13+ days |
| **NanoBot** | 13 (1 closed) | 31 (9 merged) | None | **8.5** — New bugs receive fix PRs within the same window |
| **NanoClaw** | 1 (1 closed) | 19 (13 merged) | **v2.2.0** | **8.5** — Feature-rich release, strong supply-chain hardening |
| **LobsterAI** | 1 | 11 (6 merged) | None | **6.5** — UI consolidation progressing, but 4.5-month-old safety-test PRs still stale |
| **PicoClaw** | 2 new (both feature requests) | 5 (3 stale-closed, dependabot only) | None | **5.5** — Maintenance rhythm only; build-breaking lockfile fix unmerged 9 days |
| **Moltis** | 1 | 4 (0 merged) | None | **6.0** — Quiet; small tooling fixes + one large connector PR |
| **NullClaw** | 0 | 0 | None | **1.0** — No activity |
| **ZeptoClaw** | 0 | 0 | None | **1.0** — No activity |

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Community scale is unmatched** — 500 issues and 500 PRs updated in 24 hours is 5–10× the next tier (IronClaw, ZeroClaw, Hermes at 50 each). This creates a self-reinforcing contributor flywheel.
- **Channel coverage** — Slack, Telegram, iMessage, Discord, Matrix, and WebChat routing is broader than any peer; the "text between tool calls leaks to channels" bug (#25592) is itself evidence of deep multi-channel integration depth.
- **Reference-platform status** — Moltis, LobsterAI, and NanoClaw all explicitly build against or wrap OpenClaw, making it the de facto substrate for companion tools.
- **Maintainer responsiveness** — 83 PRs merged/closed in 24h, with UI/CLI polish PRs regularly cleared; the gap between issue report and fix PR is short for tractable problems.

**Technical approach differences:**
- OpenClaw uses a **gateway + channel-routing + subagent orchestration** model with a large legacy-package surface, whereas IronClaw is a Rust-based "kernel" pushing pluggable agent loops, and ZeroClaw emphasizes RFC-driven architecture with verifiable-intent authorization.
- OpenClaw's weakness is **reliability debt at scale** — its signature problems (silent reply failures #121058, subagent completion loss #44925, cron stalls #91363) are precisely the issues IronClaw and ZeroClaw are architecting to avoid from day one.

**Community size comparison:**
- OpenClaw's issue/PR volume is roughly **10× larger** than IronClaw, ZeroClaw, Hermes, or CoPaw, and **50× larger** than NanoBot or LobsterAI. It is the ecosystem's center of gravity, but its P1 bug backlog means trust erosion among power users is a visible risk.

---

## 4. Shared Technical Focus Areas

Across all active projects, six requirements recur independently — each confirmed by multiple projects:

| Focus Area | Projects Reporting | Specific Needs |
|---|---|---|
| **Delivery guarantees** | OpenClaw (#121058), Hermes (#62142), NanoBot (#5373), CoPaw (#6921), ZeroClaw (#9929) | Silent reply loss, cron jobs that die silently, replies produced but never delivered, mid-task stalls requiring user "continue" nudges — users want **exactly-once, observable execution** |
| **Session isolation & persistence** | OpenClaw (#43367), NanoBot (#4082 fix), Hermes (#84876), CoPaw (#6966), ZeroClaw (#9600 tracker) | Concurrent agent config overwrites, cross-cron context sharing, per-sender session keys, session data never persisted, transcript hidden after compaction |
| **Memory safety & provenance** | OpenClaw (#7707), NanoBot (#5377), IronClaw (#7185), CoPaw (#6853), ZeroClaw (#6850, #6998) | Memory trust tagging by source, consolidation truncation dropping history, memory not recalled cross-conversation, prompts lying about actual memory behavior, schema-validated consolidation |
| **MCP/tool-schema economy** | NanoBot (#5298), Hermes (#85686/85688), NanoClaw (#2624), IronClaw (#7581), ZeroClaw (#9810) | Budget model-visible MCP schemas, non-interactive tool config, per-server `disabledTools`, post-auth MCP state refresh, Agent Plugins 1.0 skill/MCP packaging |
| **Cron/automation reliability** | OpenClaw (#91363, #121953), NanoBot (#5373), Hermes (#85215), ZeroClaw | Scheduler dies on persistence failure, jobs fail with HTTP 402 for days, model-call never reaches provider, isolated cron timeouts |
| **Security hardening** | NanoBot (#5306), NanoClaw (#3229), ZeroClaw (#9969), CoPaw (#6992), OpenClaw (CSP refusal misreport) | Shell-chain bypass of allowlists, `Math.random()` pairing codes, unauthenticated gateway endpoints, antivirus false positives, SSRF-guarded webhooks |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architectural Signature |
|---|---|---|---|
| **OpenClaw** | General-purpose multi-channel personal agent | Power users, self-hosters, channel-heavy workflows | Legacy-package gateway + subagent orchestration; maximal channel breadth; largest community |
| **IronClaw** | Cloud-hosted agent kernel with pluggable loops | NEAR AI cloud users, enterprise-adjacent | Rust kernel (scheduling, tenancy, egress, audit); explicit "we own the loop, not the agent" philosophy; ACP/claude-code/codex harness support |
| **ZeroClaw** | Security-governed, policy-driven agent runtime | Security-conscious operators, regulated workflows | RFC-driven design; verifiable intents, typed peer policy, SOP permission contracts; WeChat/WhatsApp channel depth |
| **CoPaw / QwenPaw** | Desktop-first agent with OS-like shell | Chinese-speaking consumers (primary), Qwen/Aliyun ecosystem | QwenPaw OS Shell desktop environment (movable/resizable windows, taskbar); Aliyun Bailian billing; strong China-market localization |
| **Hermes Agent** | Webhook-centric automation + TUI/Desktop client | Automation builders, CI/provisioning integrators | Webhook Revolution campaign (SSRF-guarded signed callbacks); delegation durability; MCP scriptability for non-interactive use |
| **NanoBot** | Lightweight session/cron/memory manager | Developers wanting small, embeddable assistant core | Python; fast fix turnaround; WebUI + Telegram/Matrix focus; Dream memory consolidation pipeline |
| **NanoClaw** | Agent template/plugin management | Groups stamping many agents from templates | Agent Plugins 1.0 format; CI/supply-chain verification gates; template-driven agent-group creation |
| **LobsterAI** | OpenClaw desktop companion | Desktop users wanting managed OpenClaw control plane | Renderer-layer UI unification; skills/MCP/kits consolidated views; cowork features, gamified check-ins |
| **PicoClaw** | Go-based lightweight agent | Embedded/resource-constrained users | Go single-binary; Web UI; dependabot-driven maintenance (currently no feature velocity) |
| **Moltis** | Connector/data durability layer | Users needing provider-neutral history access | Durable CalDAV + Slack/Discord/Matrix/Teams connectors; atomic snapshots; local full-text search |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration with disciplined governance:** **IronClaw** and **ZeroClaw** show the healthiest pattern: high merge rates, security bugs closed within 24h, and structured decision processes (IronClaw's 18-task epic decomposition; ZeroClaw's maintainer decision queue #8692). Both are mid-architectural-transition but executing cleanly.

**Tier 2 — High velocity with reliability debt:** **OpenClaw**, **CoPaw**, and **Hermes** are shipping continuously (OpenClaw: 83 PRs/day; CoPaw: 2 releases; Hermes: stable v0.20.1) but carry visible P1 user-facing bugs that erode trust. Their communities are large enough to produce detailed reproductions, yet the fix pipeline is not keeping pace with the bug-discovery rate.

**Tier 3 — Healthy but narrowly focused:** **NanoBot** and **NanoClaw** demonstrate excellent fix-response discipline (bugs closed with PRs same-window) but operate at a smaller scope. **LobsterAI** shows renewed maintainer attention after a stale period, while **PicoClaw** and **Moltis** are in maintenance/dependency-hygiene mode — stable but not advancing user-facing features.

**Tier 4 — Inactive:** **NullClaw** and **ZeptoClaw** show zero activity; likely abandoned or pre-announcement.

**Maturity signal:** The most mature projects (IronClaw, ZeroClaw) treat architecture as a governance problem — RFCs, epics, ownership trackers, and conformance suites. The least mature rely on hero-maintainer fix velocity. As the ecosystem grows, the RFC-driven pattern appears to be the differentiator between sustainable velocity and accumulating P1 debt.

---

## 7. Trend Signals

1. **Delivery guarantees are the new trust floor.** "Reply produced but never delivered," "subagent completion silently lost," and "cron dies without error" are the ecosystem's most-upvoted, most-commented bug classes. Expect **exactly-once semantics, delivery-queue TTLs, and completion receipts** to become table stakes in the next 1–2 release cycles across all major projects.

2. **Memory is moving from feature to liability.** Multiple projects are responding to the same complaint — memory behavior contradicts documentation, consolidation drops data, cross-conversation recall fails. The convergence on **memory provenance/trust tagging** (OpenClaw #7707) and **schema-validated consolidation** (ZeroClaw #6998) suggests a standard for auditable memory is emerging.

3. **MCP schema economy is the new cost battleground.** As tool counts grow, users are demanding smaller model-visible footprints (NanoBot #5298, Hermes MCP scriptability, NanoClaw `disabledTools`). Context-cost optimization is shifting from prompt engineering to **infrastructure-level schema budgeting**.

4. **Session isolation is an architectural requirement, not a bug fix.** The repeated failures across OpenClaw subagents, NanoBot cron runs, CoPaw Telegram sessions, and ZeroClaw SOP persistence indicate that per-execution session identity must be designed into the runtime — not patched per channel.

5. **The "kernel vs. agent" split is solidifying.** IronClaw's pluggable-agent-loops epic (#7482) and ZeroClaw's runtime-owned-session RFC (#9487) both argue the orchestration layer should own scheduling, capability membranes, and egress — while agent-loop logic (claude-code, codex, native) is pluggable. This is the architectural direction of the ecosystem's most mature projects.

6. **Supply-chain and security hygiene is becoming community-driven.** First-time contributors are landing CSPRNG pairing-code fixes (NanoClaw), shell-allowlist bypass patches (NanoBot), and gateway containment fixes (ZeroClaw). Security is no longer solely a maintainer concern — the contributor base is actively auditing.

7. **China-market differentiation is accelerating.** CoPaw's Chinese-speaking user base drives the largest cluster of real-world reliability reports (antivirus false positives, idle freezes, Aliyun billing integration), and its OS-shell desktop UX is genuinely distinct from Western peers. Expect Chinese cloud-provider integrations (Bailian token plans, Qwen ecosystems) to influence the broader ecosystem's provider-abstraction work.

8. **Windows/Desktop reliability is the overlooked differentiator.** Hermes (update loops, locale bugs, ghost rows), CoPaw (antivirus kills, packaged exe failures), and NanoBot (Windows `os.replace` crashes) all report platform-specific desktop pain. Projects that treat Windows as a first-class citizen will capture the underserved desktop-agent segment.

---

**Bottom line for decision-makers:** If you need a stable, well-governed foundation, **IronClaw** and **ZeroClaw** currently offer the best architecture-to-reliability ratio. If you need maximum channel breadth and community support, **OpenClaw** remains the ecosystem hub but carries known delivery-reliability risk. If you are targeting the Chinese market or desktop-first UX, **CoPaw** is the project to watch. The cross-project trend to plan around: **reliability, memory transparency, and session isolation are becoming competitive moats, not nice-to-haves.**

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-14

## 1. Today's Overview

NanoBot shows strong, sustained development activity: 13 issues were updated in the last 24 hours (12 open, 1 closed) and 31 PRs were updated (22 open, 9 merged/closed), with no new releases published. The majority of activity centers on reliability fixes for session persistence, cron scheduling, and memory consolidation, plus several user-facing feature PRs around Telegram, Matrix, MCP, and the WebUI. The project appears healthy: maintainers are actively reviewing and closing PRs, and newly reported bugs are receiving fix PRs within the same update window. No release notes or migration guidance are currently available.

## 2. Releases

**No new releases in this window.**  
There are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress

Nine PRs were merged/closed in the last 24 hours. From the visible set, the key changes are:

- **[PR #5384 — fix(webui): restore transcript-only session history](https://github.com/HKUDS/nanobot/pull/5384)** *(closed)*  
  Restores WebUI sidebar discovery for transcript-only history, keeping canonical session metadata authoritative where both stores exist.

- **[PR #5381 — feat(webui): add native workspace folder picker](https://github.com/HKUDS/nanobot/pull/5381)** *(closed)*  
  Adds native macOS/Windows/Linux folder selection for locally hosted WebUI sessions.

- **[PR #5374 / #5375 — fix(cron): keep scheduler alive when job-store persistence fails](https://github.com/HKUDS/nanobot/pull/5374)** *(closed)*  
  Two variants of the same cron resilience fix were closed; the current open version is **[PR #5376](https://github.com/HKUDS/nanobot/pull/5376)**.

- **[PR #4556 — feat(dream): wire up model_override for Dream consolidation](https://github.com/HKUDS/nanobot/pull/4556)** *(closed)*  
  Applies `DreamConfig.model_override` during periodic memory consolidation, fixing [#4029](https://github.com/HKUDS/nanobot/issues/4029).

- **[PR #4550 — fix(cron): use per-run session key to prevent context sharing across cron runs](https://github.com/HKUDS/nanobot/pull/4550)** *(closed)*  
  Fixes [#4082](https://github.com/HKUDS/nanobot/issues/4082) by isolating each cron run with a unique session key.

## 4. Community Hot Topics

- **[Issue #4010 — Feature proposal: text-to-speech / voice output support](https://github.com/HKUDS/nanobot/issues/4010)**  
  *3 comments · 3 👍 · created 2026-05-26 · updated 2026-08-12*  
  The most-reacted open issue. NanoBot already supports voice input; users want the agent to reply with voice notes on channels that natively support them. This is a clear product-gap signal and a likely roadmap candidate.

- **[Issue #5298 — Proposal: budget model-visible MCP schemas for large tool sets](https://github.com/HKUDS/nanobot/issues/5298)**  
  *1 comment · updated 2026-08-13*  
  Users are concerned about context cost when many MCP tools are registered. A fix is already open in **[PR #5388](https://github.com/HKUDS/nanobot/pull/5388)**, indicating maintainers are responding quickly.

- **[Issue #5289 — feat(telegram): support sending stickers and agent-initiated message reactions](https://github.com/HKUDS/nanobot/issues/5289)**  
  *1 comment · updated 2026-08-13*  
  Telegram channel parity request: inbound stickers are opaque, and outbound sticker sending is unsupported. **[PR #5387](https://github.com/HKUDS/nanobot/pull/5387)** now proposes reusable sticker replies.

## 5. Bugs & Stability

Ranked by severity:

- **[Issue #5306 — [Security] `exec.allowPatterns` shell-chain bypass allows unintended command execution](https://github.com/HKUDS/nanobot/issues/5306)** *(closed)*  
  **Severity: Critical**  
  Security advisory allowing shell-command chain bypass of `exec.allowPatterns`. The issue is closed, indicating a fix or mitigation has been accepted.

- **[Issue #5373 — Cron scheduler dies permanently after a single job-store persistence failure](https://github.com/HKUDS/nanobot/issues/5373)**  
  **Severity: High**  
  A single disk-full/permission/lock error inside `CronService._on_timer` kills the scheduler permanently. Fix PRs exist: **[PR #5376](https://github.com/HKUDS/nanobot/pull/5376)** and related closed PRs [#5374](https://github.com/HKUDS/nanobot/pull/5374), [#5375](https://github.com/HKUDS/nanobot/pull/5375).

- **[Issue #5378 — Bug: file-cap archive failure mutates the session before persistence](https://github.com/HKUDS/nanobot/issues/5378)**  
  **Severity: High**  
  In-memory session state is modified before the archive callback; a failure makes the mutation permanent and unrecoverable. Fix PR: **[PR #5380](https://github.com/HKUDS/nanobot/pull/5380)**.

- **[Issue #5377 — Bug: consolidation truncates archive input but advances past the full message batch](https://github.com/HKUDS/nanobot/issues/5377)**  
  **Severity: High**  
  Token-truncated consolidation still advances `last_consolidated`, causing raw history to be dropped. Fix PR: **[PR #5379](https://github.com/HKUDS/nanobot/pull/5379)**.

- **[Issue #5366 — WebUI: localize Agent activity text using the user's selected language](https://github.com/HKUDS/nanobot/issues/5366)**  
  **Severity: Medium**  
  Agent activity strings remain English-only despite WebUI language selection.

- **[PR #5382 — fix(session): retry os.replace() on transient Windows PermissionError](https://github.com/HKUDS/nanobot/pull/5382)**  
  **Severity: Medium**  
  Confirmed Windows `[WinError 5]` crashes during heartbeat cron session saves; the PR adds retry logic.

## 6. Feature Requests & Roadmap Signals

Active feature-related issues and PRs point toward the next version:

- **Voice output** — [#4010](https://github.com/HKUDS/nanobot/issues/4010) is the highest-reaction feature request; no PR yet, but it is a strong roadmap candidate.
- **MCP Apps host support in WebUI** — [#5251](https://github.com/HKUDS/nanobot/issues/5251), with related metadata-preservation work in **[PR #5386](https://github.com/HKUDS/nanobot/pull/5386)**.
- **Budgeted MCP schemas** — [#5298](https://github.com/HKUDS/nanobot/issues/5298), with **[PR #5388](https://github.com/HKUDS/nanobot/pull/5388)** already open.
- **Telegram stickers/reactions** — [#5289](https://github.com/HKUDS/nanobot/issues/5289), with **[PR #5387](https://github.com/HKUDS/nanobot/pull/5387)** open.
- **QwenCloud provider path** — [#5350](https://github.com/HKUDS/nanobot/issues/5350) asks for a backward-compatible provider alongside existing DashScope support.
- **Session collaboration via mentions** — **[PR #5358](https://github.com/HKUDS/nanobot/pull/5358)** would allow WebUI sessions to reference each other with stable identity colors.
- **Memory persistence** — [#5372](https://github.com/HKUDS/nanobot/issues/5372) proposes ViBo integration for cross-session memory; currently zero comments and may need maintainer triage.

Likely next-version features: MCP schema budgeting, Telegram sticker replies, MCP Apps metadata preservation, and Matrix SAS verification flow — all already have open PRs.

## 7. User Feedback Summary

- **Channel feature parity** is a recurring theme: users want voice output ([#4010](https://github.com/HKUDS/nanobot/issues/4010)), Telegram sticker support ([#5289](https://github.com/HKUDS/nanobot/issues/5289)), and trusted Matrix device verification ([#4841](https://github.com/HKUDS/nanobot/issues/4841)).
- **Reliability concerns** dominate bug reports: cron jobs dying silently ([#5373](https://github.com/HKUDS/nanobot/issues/5373)), session mutation on failed archive ([#5378](https://github.com/HKUDS/nanobot/issues/5378)), lossy consolidation ([#5377](https://github.com/HKUDS/nanobot/issues/5377)), and Windows-specific `os.replace` crashes ([PR #5382](https://github.com/HKUDS/nanobot/pull/5382)).
- **Cost and context efficiency** are emerging concerns: users want smaller model-visible MCP schema footprints and persistent memory to reduce token usage.
- **WebUI polish** feedback includes localization gaps ([#5366](https://github.com/HKUDS/nanobot/issues/5366)) and misleading copy/fork actions during active agent turns ([#5368](https://github.com/HKUDS/nanobot/issues/5368)).
- **Overall satisfaction signal is positive**: most newly reported bugs have corresponding fix PRs already open, and several long-running PRs were closed/merged today.

## 8. Backlog Watch

- **[Issue #4010 — Voice output support](https://github.com/HKUDS/nanobot/issues/4010)**  
  Open since May 26, still the most-reacted feature request, no linked implementation PR.

- **[Issue #4841 — Matrix bot device shows as untrusted](https://github.com/HKUDS/nanobot/issues/4841)**  
  Open since July 7. A fix PR now exists: **[PR #5385](https://github.com/HKUDS/nanobot/pull/5385)**, but it still needs review and merge.

- **[PR #4549 — feat(heartbeat): add model_override config for cheaper heartbeat model](https://github.com/HKUDS/nanobot/pull/4549)**  
  Open since June 26, priority p2, updated Aug 13. Appears ready for maintainer decision.

- **[PR #4551 — feat(heartbeat): add isolated_session config to allow shared session](https://github.com/HKUDS/nanobot/pull/4551)**  
  Open since June 26, priority p2, updated Aug 13. Related to heartbeat/session isolation and may require cross-review with cron session fixes.

- **[Issue #5372 — ViBo memory integration proposal](https://github.com/HKUDS/nanobot/issues/5372)**  
  New, zero comments. Appears product-oriented; needs maintainer triage to confirm scope and feasibility.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-14

## 1. Today's Overview

Hermes Agent showed high sustained activity in the last 24 hours: **50 issues updated** (42 open/active, 8 closed) and **50 PRs updated** (45 open, 5 closed/merged). One new patch release, **Hermes Agent v0.20.1 (v2026.8.13)**, was tagged as a stable roll-up of ~656 merged PRs. Activity is concentrated around the "Webhook Revolution" campaign, delegation durability work, MCP scriptability for CI/provisioning, and a continued stream of Windows/Desktop/TUI bug reports. Maintainers are shipping steadily, but several P1 session-state and platform regressions remain open.

## 2. Releases

### Hermes Agent v0.20.1 — v2026.8.13

- Patch release rolling up **~656 PRs merged since v0.20.0**.
- Explicitly intended as a stable tagged release for downstream consumers: Docker images, hosted deployments, and `latest`-tag installations.
- No breaking changes or migration notes were provided in the release data. Existing v0.20.0 users can treat this as a patch-level roll-forward.

## 3. Project Progress

Five PRs were closed/merged in the reporting window. Among the highlighted closed PRs:

- [PR #85677 — fix(mcp): resolve Hermes home through one profile-aware helper](https://github.com/NousResearch/hermes-agent/pull/85677)  
  Consolidates four duplicated Hermes-home resolution paths in `mcp_serve.py`/`EventBridge` into one profile-aware helper.

- [PR #85661 — Suggestion pills wait for finished words, and the MCP directory more than doubles](https://github.com/NousResearch/hermes-agent/pull/85661)  
  Refines suggestion-pill firing from #85036/#85070/#85091 with word-boundary guards and expands the MCP vendor directory.

Open PRs actively advancing major work:

- [PR #85674](https://github.com/NousResearch/hermes-agent/pull/85674) and [PR #85675](https://github.com/NousResearch/hermes-agent/pull/85675) — Webhook Revolution execution registry and SSRF-guarded signed callbacks.
- [PR #84876](https://github.com/NousResearch/hermes-agent/pull/84876) — serializes concurrent agent turns per session in `APIServerAdapter`.
- [PR #81605](https://github.com/NousResearch/hermes-agent/pull/81605) — gives delegation subagents a dedicated SessionDB instead of sharing the parent's handle.
- [PR #85631](https://github.com/NousResearch/hermes-agent/pull/85631) — optional no-auth multi-provider failover pool support.
- [PR #85684](https://github.com/NousResearch/hermes-agent/pull/85684) — new evidence-gated `venture-signal-research` skill.

## 4. Community Hot Topics

The most active issues by comment count show real user pain around session reliability, TUI workflows, and platform parity:

- [Issue #84834 — Webhook Revolution: graph-gated repair campaign (16 comments)](https://github.com/NousResearch/hermes-agent/issues/84834)  
  The meta-issue for the entire webhook surface: ingress, execution, delivery, management UI, deployment, and docs. Clearly a major roadmap driver.

- [Issue #69592 — `/sessions` and `/models` overlays invisible with ambient widget dock (12 comments)](https://github.com/NousResearch/hermes-agent/issues/69592)  
  A P1 TUI regression where users cannot resume sessions or change models when the documented ambient widget dock is loaded. Commenters report this has been broken for multiple days.

- [Issue #39043 — Signal adapter: complete native quote/reply, edit, remote-delete, read-receipt support (7 comments, 3 👍)](https://github.com/NousResearch/hermes-agent/issues/39043)  
  Feature request with real community demand; still marked `needs-decision`.

- [Issue #75791 — Windows 11 25H2: `dashboard --status` falsely reports no dashboard (6 comments)](https://github.com/NousResearch/hermes-agent/issues/75791)  
  Windows platform reporting regression.

- [Issue #70131 — Emoji sign-off fix misses Dingbats, causing truncation loops (6 comments, 1 👍)](https://github.com/NousResearch/hermes-agent/issues/70131)  
  Incomplete emoji boundary fix still affects `✨` and `✅`.

- [Issue #83427 — `browser_exec` crashes: `pydantic_core` ModuleNotFoundError (5 comments)](https://github.com/NousResearch/hermes-agent/issues/83427)  
  Desktop-venv + PYTHONPATH compatibility issue.

Underlying need: users want reliable session resume, stable Windows/Desktop behavior, webhook observability, and complete provider-adapter parity.

## 5. Bugs & Stability

Ranked roughly by severity:

### P1 — Critical / Core workflow breakage

- [Issue #69592 — TUI `/sessions`, `/switch`, `/resume`, `/models` blocked by ambient widget dock](https://github.com/NousResearch/hermes-agent/issues/69592)  
  Core TUI workflows are unusable for affected users. No fix PR appears in the current update set.

- [Issue #62142 — verification-stop can discard streamed final answers and cron reports](https://github.com/NousResearch/hermes-agent/issues/62142)  
  Durable transcript/cron delivery can lose substantive final output. [PR #59624](https://github.com/NousResearch/hermes-agent/pull/59624) was updated today and removes the interrupt sentinel from websocket delivery — likely related, but not explicitly linked in the provided data.

- [Issue #82168 — Desktop update/reinstall loop on Windows](https://github.com/NousResearch/hermes-agent/issues/82168)  
  Users report both updating and reinstalling during setup. No fix PR visible.

### P2 — Cron, billing, and delivery correctness

- [Issue #85215 — Cron jobs pin dead model and ignore fallback_providers; jobs fail with HTTP 402 for days](https://github.com/NousResearch/hermes-agent/issues/85215)  
- [Issue #70050 — Cron drift protection: `cron edit` lacks `--model`; no supported repin path](https://github.com/NousResearch/hermes-agent/issues/70050)

### P2 — Platform and gateway bugs

- [Issue #85406 — `vision_analyze` fails on Windows host + Docker terminal due to POSIX/backslash path mangling](https://github.com/NousResearch/hermes-agent/issues/85406)
- [Issue #85614 — Slack peer bot IDs ignored by final bot authorization](https://github.com/NousResearch/hermes-agent/issues/85614)
- [Issue #65085 — Telegram group observe attribution breaks slash-command admin gating](https://github.com/NousResearch/hermes-agent/issues/65085)

### P2/P3 — Desktop/TUI regressions

- [Issue #85669 — Desktop `config.set` writes focused-profile settings into launch profile](https://github.com/NousResearch/hermes-agent/issues/85669)
- [Issue #85658 — Interrupted command adopts another session's working directory](https://github.com/NousResearch/hermes-agent/issues/85658)
- [Issue #85104 — Same assistant message rendered twice in Desktop chat view](https://github.com/NousResearch/hermes-agent/issues/85104)
- [Issue #85331 — Desktop sidebar renders ghost title-less rows after compression-chain reorganization](https://github.com/NousResearch/hermes-agent/issues/85331)
- [Issue #85659 — Desktop update PowerShell script locale handling bug on French Windows](https://github.com/NousResearch/hermes-agent/issues/85659)

### Stability wins

- [Issue #79220 — cost label formatting at 2dp showing `$0.00` — closed](https://github.com/NousResearch/hermes-agent/issues/79220)
- [Issue #35838 — models.dev blocking with stale cache — closed as duplicate](https://github.com/NousResearch/hermes-agent/issues/35838)

## 6. Feature Requests & Roadmap Signals

The strongest next-release signals are:

- **Webhook Revolution is actively being built out.**  
  [Issue #84834](https://github.com/NousResearch/hermes-agent/issues/84834) is the campaign epic; [PR #85674](https://github.com/NousResearch/hermes-agent/pull/85674) adds an execution registry/status/cancel endpoint, and [PR #85675](https://github.com/NousResearch/hermes-agent/pull/85675) adds SSRF-guarded signed callbacks.

- **Delegation durability and routing are emerging as a theme.**  
  [Issue #85646](https://github.com/NousResearch/hermes-agent/issues/85646), [Issue #85647](https://github.com/NousResearch/hermes-agent/issues/85647), and [Issue #85648](https://github.com/NousResearch/hermes-agent/issues/85648) propose persisting/settling batch children independently, delivering ready children without waiting for siblings, and letting ready dependencies affect unfinished parent work.

- **MCP scriptability is a clear need.**  
  [PR #85688](https://github.com/NousResearch/hermes-agent/pull/85688) adds non-interactive tool selection; [PR #85686](https://github.com/NousResearch/hermes-agent/pull/85686) allows scripts to configure enabled server tools.

- **Long-standing platform features still waiting on decisions.**  
  [Issue #39043](https://github.com/NousResearch/hermes-agent/issues/39043) (Signal native edit/delete/quote/receipts) and [Issue #84317](https://github.com/NousResearch/hermes-agent/issues/84317) (Telegram `drop_pending_updates` opt-out) both remain `needs-decision`.

- **Desktop UX polish requests continue.**  
  [PR #78343](https://github.com/NousResearch/hermes-agent/pull/78343) adds close-to-tray; [PR #84329](https://github.com/NousResearch/hermes-agent/pull/84329) adds matte-glass translucency.

- **Operational/developer ergonomics.**  
  [PR #85621](https://github.com/NousResearch/hermes-agent/pull/85621) adds skill topology routing/audit; [PR #56766](https://github.com/NousResearch/hermes-agent/pull/56766) adds `--board` to `kanban create`; [Issue #33049](https://github.com/NousResearch/hermes-agent/issues/33049) asks for configurable credential-pool exhaustion TTLs.

Prediction: the next minor release will likely include webhook execution observability/callbacks, MCP non-interactive configuration, and the first batch of delegation child-durability work.

## 7. User Feedback Summary

- **TUI users are frustrated by a weeks-long core regression.**  
  [Issue #69592](https://github.com/NousResearch/hermes-agent/issues/69592) is described as "Day 13 since this broke": normal users following the documented ambient-widget pattern cannot resume sessions or change models.

- **Cron users are stuck with failed jobs and no repair path.**  
  [Issue #85215](https://github.com/NousResearch/hermes-agent/issues/85215) and [Issue #70050](https://github.com/NousResearch/hermes-agent/issues/70050) describe jobs failing with HTTP 402 for days because model snapshots pin dead models and there is no supported way to repin.

- **Windows/Desktop users are overrepresented in the bug report set.**  
  Reports include update loops ([#82168](https://github.com/NousResearch/hermes-agent/issues/82168)), locale-broken PowerShell updates ([#85659](https://github.com/NousResearch/hermes-agent/issues/85659)), false dashboard status ([#75791](https://github.com/NousResearch/hermes-agent/issues/75791)), duplicate messages ([#85104](https://github.com/NousResearch/hermes-agent/issues/85104)), and ghost rows ([#85331](https://github.com/NousResearch/hermes-agent/issues/85331)).

- **Integrators want scriptable tooling.**  
  The new MCP non-interactive PRs ([#85688](https://github.com/NousResearch/hermes-agent/pull/85688), [#85686](https://github.com/NousResearch/hermes-agent/pull/85686)) reflect demand from provisioning scripts, containers, and CI.

- **Satisfaction signals are present but quieter.**  
  Community members are still contributing features and fixes, and v0.20.1 gives downstream users a stable tag to consume.

## 8. Backlog Watch

Items that appear to need maintainer attention:

- [Issue #39043 — Signal adapter native quote/edit/delete/read-receipt support](https://github.com/NousResearch/hermes-agent/issues/39043)  
  Open since June 4, marked `needs-decision`, with community 👍 support. No linked implementation PR.

- [Issue #33049 — Make credential pool exhaustion TTL configurable](https://github.com/NousResearch/hermes-agent/issues/33049)  
  Open since May 27; hardcoded TTLs remain a limitation for operators.

- [PR #9221 — test(security): cover `/api/env` PUT/DELETE authorization](https://github.com/NousResearch/hermes-agent/pull/9221)  
  Open since April 13. Test-only security regression coverage; long idle relative to its importance.

- [PR #56766 — kanban `--board` flag + `prompt_file` for cronjob tool](https://github.com/NousResearch/hermes-agent/pull/56766)  
  Open since July 2; small CLI improvement waiting for review/merge.

- [PR #52289 — classify provider memory-ceiling 400s as overloaded, not context_overflow](https://github.com/NousResearch/hermes-agent/pull/52289)  
  Open since June 25; addresses misleading error classification for local-inference providers.

- [Issue #69592 — P1 TUI overlay invisibility](https://github.com/NousResearch/hermes-agent/issues/69592)  
  This is not "unanswered," but it remains the most critical unresolved issue in the current window with no visible fix PR.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-14

## 1. Today's Overview

PicoClaw saw moderate activity over the last 24 hours, driven almost entirely by dependency automation rather than feature development. Five new dependabot PRs (#3332–#3336) were opened to bump Go dependencies (AWS SDK v2, Anthropic SDK, mautrix), while three older equivalent dependency PRs (#3304–#3306) were closed as stale. No new release was published, and no user-facing code was merged. Community momentum comes from two fresh feature requests filed on 2026-08-13 and continued engagement on the Web UI lag bug (#3281). Overall, the project is in a healthy maintenance rhythm, but substantive maintainer-driven progress has been quiet this cycle.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Three PRs were closed, all of them stale dependabot updates superseded by newer version bumps opened the same day:

- [#3305](https://github.com/sipeed/picoclaw/pull/3305) — `aws-sdk-go-v2/service/bedrockruntime` 1.53.3 → 1.56.2 (closed stale; superseded by [#3336](https://github.com/sipeed/picoclaw/pull/3336) → 1.57.1)
- [#3306](https://github.com/sipeed/picoclaw/pull/3306) — `aws-sdk-go-v2/config` 1.32.25 → 1.32.33 (closed stale; superseded by [#3335](https://github.com/sipeed/picoclaw/pull/3335) → 1.32.35)
- [#3304](https://github.com/sipeed/picoclaw/pull/3304) — `anthropic-sdk-go` 1.55.1 → 1.61.0 (closed stale; superseded by [#3334](https://github.com/sipeed/picoclaw/pull/3334) → 1.62.0)

No feature or bugfix PRs were merged. The only substantive PR in the queue remains [#3318](https://github.com/sipeed/picoclaw/pull/3318), a fix for the broken `web/frontend/pnpm-lock.yaml`, which has been sitting unmerged since 2026-08-05 and is now labeled stale.

## 4. Community Hot Topics

- **[#3281 [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)** — 5 comments, 1 👍. This is the most active item by far. Users report severe input lag in PicoClaw Web as chat history grows within a session, with reproducing steps provided. Underlying need: performant long-session UX in the web interface.
- **[#3330 [Feature] Support dynamic model override in delegate/spawn/subagent tools](https://github.com/sipeed/picoclaw/issues/3330)** and **[#3331 [Feature] Allow any model with `/audio/transcriptions` endpoint](https://github.com/sipeed/picoclaw/issues/3331)** — both filed 2026-08-13, no comments yet. Their arrival signals growing demand for model-level flexibility in agent delegation and voice/audio pipelines.

## 5. Bugs & Stability

Ranked by severity:

1. **Web UI input lag with long chat history** ([#3281](https://github.com/sipeed/picoclaw/issues/3281)) — High severity. Existing sessions become progressively more laggy in the chat input box as history accumulates. Multiple commenters have engaged, and no fix PR has been opened. This directly impacts daily usability of the web client.
2. **Broken pnpm-lock.yaml in `web/frontend`** — Build-breaking issue where `semver@7.8.5` appears twice as a YAML mapping key, causing `ERR_PNPM_BROKEN_LOCKFILE`. A fix exists in PR [#3318](https://github.com/sipeed/picoclaw/pull/3318), but it remains unmerged and is now flagged stale — it needs maintainer review or closure.

## 6. Feature Requests & Roadmap Signals

- **[#3331](https://github.com/sipeed/picoclaw/issues/3331)** — Add a config flag (e.g., `whisper-transcription: true`) so any model exposing `/audio/transcriptions` can be used, not just `*-whisper-*` models, which the author calls "too old and slow." This is a small, backward-compatible change and aligns with broader model-provider flexibility.
- **[#3330](https://github.com/sipeed/picoclaw/issues/3330)** — Allow specifying a model at call time in `delegate`, `spawn`, and `subagent` tools, instead of relying solely on static `config.json` / `defaultModel` settings. A power-user-oriented feature that would make agent workflows far more dynamic.

Both requests are low-complexity, additive changes consistent with the project's trajectory. Given the maintainers' active dependency hygiene and the clear, well-scoped proposals, these are plausible candidates for the next minor release (0.4.x).

## 7. User Feedback Summary

Real pain points expressed in the last 24 hours:

- **UI performance at scale**: Users want the web chat input to stay responsive even with long session histories ([#3281](https://github.com/sipeed/picoclaw/issues/3281)).
- **Voice/audio flexibility**: Whisper-only transcription is considered outdated and slow; users want to plug in any OpenAI-compatible audio transcription model ([#3331](https://github.com/sipeed/picoclaw/issues/3331)).
- **Agent delegation control**: Users want to override models per call in `delegate`/`spawn`/`subagent` rather than being bound to static configuration ([#3330](https://github.com/sipeed/picoclaw/issues/3330)).

There were no explicit positive-sentiment signals, but the tone of new requests is constructive and feature-oriented, indicating engaged power users rather than widespread dissatisfaction.

## 8. Backlog Watch

Items needing maintainer attention:

- **[#3281](https://github.com/sipeed/picoclaw/issues/3281)** — Open since 2026-07-21, updated 2026-08-13, 5 comments, no visible fix or maintainer assignment. This is the longest-standing user-facing bug and deserves a performance investigation.
- **[#3318](https://github.com/sipeed/picoclaw/pull/3318)** — Fix PR for the pnpm lockfile breakage, open since 2026-08-05 and now marked stale without review. If valid, it should be merged or explicitly superseded.

Notably, stale dependabot PRs were closed promptly, showing good automation hygiene, but the human-reviewed items are aging. With no release in the last 24h and only automation churn, maintainer bandwidth on these two items is the key bottleneck to watch.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-14

## Today's Overview

NanoClaw had a very active 24 hours: **19 PRs were updated**, **13 were closed/merged**, **6 remain open**, and **1 new release** shipped. Activity was heavily concentrated in core-team CI/supply-chain hardening, the Agent Plugins/template migration, and the v2.2.0 release process. One user-facing bug was closed ([#3234](https://github.com/nanocoai/nanoclaw/issues/3234)), while a new open issue about approval-card spam ([#3235](https://github.com/nanocoai/nanoclaw/issues/3235)) is still awaiting a fix. Overall project health looks strong: security fixes, database migrations, and release infrastructure are all moving forward.

## Releases

- **[v2.2.0](https://github.com/nanocoai/nanoclaw/releases/tag/v2.2.0)** — Stamped plugins now update in place through `ncl groups create --template <ref>`. If a group already carries the template's plugin, the command performs an in-place update instead of creating a duplicate agent. A dry run prints a plan of every plugin-owned surface, including plugin files, skills, and MCP server configuration.
- **Migration note:** This release includes the Agent Plugins 1.0.0 format migration from [PR #3220](https://github.com/nanocoai/nanoclaw/pull/3220), which is marked as a breaking/format-change PR. Existing template directories likely need to be migrated to the new Agent Plugin layout.
- Related release chore: [PR #3237](https://github.com/nanocoai/nanoclaw/pull/3237).

## Project Progress

### Features & Core Changes
- **Agent Plugins 1.0.0** — [PR #3220](https://github.com/nanocoai/nanoclaw/pull/3220) merged: agent templates became proper Agent Plugin directories, including stamp-time symlink/caps/secret hardening.
- **Setup wizard template flow** — [PR #2909](https://github.com/nanocoai/nanoclaw/pull/2909) merged: template setup flow plus first-agent stamping.
- **Plugin MCP working directory** — [PR #3231](https://github.com/nanocoai/nanoclaw/pull/3231) merged: Codex and OpenCode provider config writers now honor plugin MCP `cwd`.
- **Per-server MCP tool controls** — [PR #2624](https://github.com/nanocoai/nanoclaw/pull/2624) merged: `disabledTools` support in `McpServerConfig`.

### CI & Supply-Chain Hardening
- **Agent-image verification** — [PR #3158](https://github.com/nanocoai/nanoclaw/pull/3158) merged: the `verify-agent-image` gate now pins the publisher identity and checks attestations per architecture.
- **Run verification on every PR** — [PR #3238](https://github.com/nanocoai/nanoclaw/pull/3238) merged: `verify-agent-image` can now act as a required status check.
- **Verified signature as approving review** — [PR #3241](https://github.com/nanocoai/nanoclaw/pull/3241) merged: publisher signatures can become the approving review, off by default.
- **Automated image-bump PRs** — [PR #3240](https://github.com/nanocoai/nanoclaw/pull/3240) merged: agent-image promotion now opens the `versions.json` PR via dispatch.
- **Hardened image repin** — [PR #3236](https://github.com/nanocoai/nanoclaw/pull/3236) merged: agent image repinned to `hardened-2026-08-13`.
- **CI smoke tests** — [PR #3239](https://github.com/nanocoai/nanoclaw/pull/3239) and [PR #3242](https://github.com/nanocoai/nanoclaw/pull/3242) were closed unmerged as expected; these were live-fire tests of the verification/signing pipeline.

### Bug & Stability Fixes
- **Telegram pairing code security** — [PR #3229](https://github.com/nanocoai/nanoclaw/pull/3229) merged: pairing codes now use `crypto.randomInt` instead of `Math.random()`.
- **Database backfill** — [PR #3145](https://github.com/nanocoai/nanoclaw/pull/3145) merged: migration 021 backfills missing channel destinations for existing messaging-group wirings.

## Community Hot Topics

- **[Issue #3234](https://github.com/nanocoai/nanoclaw/issues/3234) (closed, 1 comment)** — Template-stamped agent groups received a bare UUID instead of an `ag-` prefixed ID, causing OneCLI’s `ensureAgent` to reject the agent. This was fixed/closed and highlights how users are already hitting edge cases in the new template/plugin flow.
- **[Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235) (open)** — Unknown-sender approval policy produces unbounded approval cards for webhook/bot senders, and denials do not persist. This is the most prominent unresolved user-facing issue right now.
- PR discussion was dominated by core-team CI work, with little public comment activity reported. The underlying user signal is clear: template/plugin IDs and automated-sender handling need tighter edge-case coverage.

## Bugs & Stability

Ranked by severity:

1. **High — Unknown-sender approval card spam**  
   [Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235): webhook/bot senders generate endless approval cards; denials don't persist. No fix PR exists yet.

2. **Medium — CI false failure in `verify-agent-image`**  
   [PR #3243](https://github.com/nanocoai/nanoclaw/pull/3243): "arming auto-merge is not a verdict" — the job can fail on draft PRs, disabled auto-merge, or transient API errors, which does not actually indicate a bad image. Fix PR is open.

3. **High, fixed — Template-stamped group ID missing `ag-` prefix**  
   [Issue #3234](https://github.com/nanocoai/nanoclaw/issues/3234): bare UUID broke OneCLI agent spawn. Closed.

4. **Medium, fixed — Weak Telegram pairing codes**  
   [PR #3229](https://github.com/nanocoai/nanoclaw/pull/3229): `Math.random()` replaced with a CSPRNG.

5. **Low/Data, fixed — Missing channel destinations**  
   [PR #3145](https://github.com/nanocoai/nanoclaw/pull/3145): existing wiring destinations backfilled via migration.

## Feature Requests & Roadmap Signals

- **Better handling of non-human senders** — [Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235) suggests `unknown_sender_policy = 'request_approval'` needs bot/webhook awareness or rate-limited/denied-sender persistence. This is a likely near-term fix.
- **Bounded JSON stdin for `ncl`** — [PR #3218](https://github.com/nanocoai/nanoclaw/pull/3218) is an open feature adding `--stdin-json` to host and container clients.
- **Unknown slash commands treated as normal chat** — [PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346) is an older open fix that would improve formatter robustness.
- **Hindsight memory integration** — [PR #2420](https://github.com/nanocoai/nanoclaw/pull/2420) adds an opt-in `/add-hindsight` skill with a bundled MCP wrapper. It has been open since May and may appear in a future minor release.
- **Per-server disabled MCP tools** — [PR #2624](https://github.com/nanocoai/nanoclaw/pull/2624) merged; this capability is likely now part of v2.2.0.

## User Feedback Summary

- Users exercising the new template flow hit agent-ID validation issues ([#3234](https://github.com/nanocoai/nanoclaw/issues/3234)); this was caught and closed.
- Users with webhook-driven messaging groups are experiencing approval-card flooding and non-persistent denials ([#3235](https://github.com/nanocoai/nanoclaw/issues/3235)) — the clearest current pain point.
- A community-reported docs issue points at a retired data/env mirror ([PR #3230](https://github.com/nanocoai/nanoclaw/pull/3230)).
- Community contributors are actively submitting security fixes, particularly around session/pairing code generation ([#3229](https://github.com/nanocoai/nanoclaw/pull/3229)), which is a positive health signal.

## Backlog Watch

These items need maintainer attention:

- **[PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346)** — Open since **2026-05-08**: unknown slash commands should be treated as normal chat. Needs review.
- **[PR #2420](https://github.com/nanocoai/nanoclaw/pull/2420)** — Open since **2026-05-11**: Hindsight memory MCP skill. Needs review/decision.
- **[PR #3230](https://github.com/nanocoai/nanoclaw/pull/3230)** — Open docs fix for retired data/env mirror references; should be a quick merge candidate.
- **[Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235)** — Open bug with no maintainer response yet; likely deserves triage soon.
- **[PR #3242](https://github.com/nanocoai/nanoclaw/pull/3242)** — Draft "DO NOT MERGE" smoke-test PR is still open; should be closed as planned after the live-fire test completes.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-14

## 1. Today's Overview

IronClaw is in an intense build-and-harden cycle: 50 issues and 50 PRs were updated in the last 24 hours, with 26 PRs merged/closed and 18 issues resolved. The dominant signal is the **"reborn" pluggable-agent-loops epic (#7482)** — 18 tightly-scoped implementation issues were filed under it, indicating a well-governed architectural re-cut rather than scattered work. Simultaneously, the project is shipping: `1.2.0-rc.3` was validated and promoted to **stable `1.2.0`** (PR #7625). A substantial performance campaign targeting Postgres write amplification is underway (4 open perf PRs), alongside a notable feature win restoring structural document editing (docx/xlsx/pptx). Overall health looks strong: active maintainer throughput, disciplined epic decomposition, and a mix of dependency hygiene, docs quality gates, and user-driven bug fixes.

## 2. Releases

**`ironclaw-v1.2.0-rc.3`** (2026-08-12) — the only release in the window, and it was immediately promoted to stable:

- **Fixed:** The runtime container image now installs `curl`, enabling in-container HTTP healthchecks. Orchestrators probe workers with `curl -fsS http://localhost:3000/`, but the shipped image contained no HTTP client, so the probe could never execute and containers were never marked healthy.
- **Promotion:** PR [#7625](https://github.com/nearai/ironclaw/pull/7625) promotes `1.2.0-rc.3` to stable `1.2.0`, consolidates RC1–RC3 changelog entries, and updates the package manifest + lockfile. No migration notes or breaking changes were flagged.

## 3. Project Progress

Notable merged/closed PRs in the last 24 hours:

- **[#7163](https://github.com/nearai/ironclaw/pull/7163) — feat(documents): edit docx/xlsx/pptx structurally, render PDF from HTML** *(XL, closed)*. Restores the deferred "real document round-trip" capability and fixes a text-log regression introduced by #7109, which had guarded binary documents from destruction but left user edit requests unanswered.
- **[#7531](https://github.com/nearai/ironclaw/pull/7531) — fix(loop): make repeated-call detection advisory-only** *(XL, closed)*. Replaces a sliding-window frequency heuristic with a simple three-consecutive-identical-call check; warnings are model-visible but never converted into hard loop interventions.
- **[#7581](https://github.com/nearai/ironclaw/pull/7581) — fix(extensions): refresh bundled MCP state after auth** *(closed)*. Active tools no longer display as `setup_needed` after OAuth discovery; same-version tools are rehydrated on restart while newer endpoint/auth/effect policy is preserved.
- **[#7579](https://github.com/nearai/ironclaw/pull/7579) / [#7590](https://github.com/nearai/ironclaw/pull/7590) — fix(live-canary)** *(closed)*. Widened the seeded slack grant to the manifest union (fixing QA-lane crashes at slack connect) and aligned the bundled-skill marker owner with the runtime mint (fixing marker verification failures across all shards).
- **[#7576](https://github.com/nearai/ironclaw/pull/7576) — test(kernel): pin admission contracts** for the `AgentExecution` seam (tests only; PR A of a planned cutover train).
- **[#7376](https://github.com/nearai/ironclaw/pull/7376) — ci(check-guidance): extend the reference gate to `docs/`** (doc-truth PR 2/5). The public docs tree previously had zero path-reference validation.
- **[#7506](https://github.com/nearai/ironclaw/pull/7506) — chore(deps): 17 updates** across the "everything-else" group, including async-trait, thiserror, base64.

Open perf train (all by core contributor `serrrfirat`, all low-risk): [#7628](https://github.com/nearai/ironclaw/pull/7628) removes heartbeat journal churn; [#7629](https://github.com/nearai/ironclaw/pull/7629) reduces trigger/outbound state writes; [#7631](https://github.com/nearai/ironclaw/pull/7631) coalesces runtime milestone writes; [#7630](https://github.com/nearai/ironclaw/pull/7630) adds a `db-write-measurement` stress preset to instrument per-turn Postgres writes.

## 4. Community Hot Topics

- **[#7482 — Epic: Pluggable agent loops** (6 comments)](https://github.com/nearai/ironclaw/issues/7482). The highest-activity item by far, and the architectural center of gravity. The thesis: IronClaw becomes the "kernel" (scheduling, tenancy, capability membrane, egress, audit) and stops owning the agent loop and per-integration tool code. It has produced 18 tightly-scoped sub-issues covering egress edge, harness execution, capability socket, CLI, conformance suite, and rollout. Notably, [#7624](https://github.com/nearai/ironclaw/issues/7624) states **v0 (claude-code as the loop, dev-only) is the only piece to build right now**; the rest is a deferred ladder gated on v0 validation — disciplined sequencing.
- **[#6257 — PDF `attachments.mime_type` error** (4 comments, closed)](https://github.com/nearai/ironclaw/issues/6257). Reported by Michael Kelly in Slack; now resolved.
- **[#2117 — ironclaw-bridge: local file/MCP bridge for cloud deployments** (2 comments, 1 👍)](https://github.com/nearai/ironclaw/issues/2117). Open since April; recurring user need for Obsidian vaults and local project directories from cloud-hosted IronClaw.
- **[#7185 — Memory not reliably recalled across conversations** (2 comments)](https://github.com/nearai/ironclaw/issues/7185). Reported through the IronClaw Champions weekly check-in by multiple independent testers — a cross-conversation memory/context concern that mirrors a common pain class in agent products.

## 5. Bugs & Stability

Ranked by severity:

1. **[#7589 — NEAR AI Cloud Sonnet-5 returns 500 errors** (closed)](https://github.com/nearai/ironclaw/issues/7589). Users saw 500s for three consecutive days; cross-referenced against `nearai/cloud-api#920`. High impact (model access degraded) but closed within the window.
2. **[#7626 — Custom MCP requiring browser/email auth gets stuck** (open)](https://github.com/nearai/ironclaw/issues/7626). Hermes prompts a browser for authorization but IronClaw hangs; user reports MKT1 requires email + browser verification. No fix PR yet — needs triage.
3. **[#7627 — GitHub extension shows "connected" after invalid credentials** (open)](https://github.com/nearai/ironclaw/issues/7627). Entering arbitrary credentials (e.g., `"1"`) marks the extension connected, despite a subsequent auth failure. Misleading state; no fix PR yet.
4. **[#7185 — Memory not reliably recalled across conversations** (open)](https://github.com/nearai/ironclaw/issues/7185). Product-level reliability bug from Champions feedback; no fix PR linked yet.
5. **[#6257 — PDF `attachments.mime_type` error** (closed)](https://github.com/nearai/ironclaw/issues/6257) — resolved.
6. **Text-log regression from #7109** — fixed as part of [#7163](https://github.com/nearai/ironclaw/pull/7163).

Fix PRs exist for the auth-state issue (#7581), the live-canary issues (#7579/#7590), and the document regression (#7163). The two new auth-flow bugs (#7626, #7627) are the most urgent unattended items.

## 6. Feature Requests & Roadmap Signals

- **Pluggable agent loops / foreign harnesses (#7482, #7621–#7624)** — the definitive roadmap signal. Phase-0 harness set is **claude-code, pi, codex** plus the native Rust loop as baseline (Gemini CLI explicitly excluded). Binding decisions are pre-recorded to avoid PR relitigation. v0 ships first; consolidated egress/execution/rollout ladders wait for trigger gates.
- **[#2117 — ironclaw-bridge** (open since April)](https://github.com/nearai/ironclaw/issues/2117): local file/MCP bridge for cloud-hosted deployments. High user value for laptop-local resources; a candidate for near-term scoping.
- **[#7548 — Structured execution contracts for automations** (open PR)](https://github.com/nearai/ironclaw/pull/7548): versioned contracts with goal, success criteria, allowed capabilities, required skills — suggests a shift toward more deterministic automation semantics.
- **[#7513 — ACP serve command** (open PR, new contributor)](https://github.com/nearai/ironclaw/pull/7513): exposes IronClaw agents over ACP stdio for GitHub Copilot CLI / VS Code integration. Aligns with the epic's ACP direction.
- **[#7580 — Expose Reborn version in web UI** (open, no comments)](https://github.com/nearai/ironclaw/issues/7580): small UX gap; likely a fast follow.
- **[#7378 — doc-fact contract tests** (doc-truth PR 3/5, open)](https://github.com/nearai/ironclaw/pull/7378): deterministic doc-vs-behavior gates; the static half of a larger docs-truth proposal.

**Prediction for next release:** stable `1.2.0` is rolling out now; `1.3.0` (or a `1.2.x` follow-up) will likely carry the ACP/claude-code v0 harness executor (#7624), automation execution contracts (#7548), the write-amplification perf batch (#7628–#7631), and small UX fixes like the version indicator (#7580).

## 7. User Feedback Summary

- **Memory/context continuity is the top recurring complaint.** Multiple independent testers at the 2026-07-23 Champions check-in observed that context established in one conversation is not reliably available in later ones (#7185). This is a trust-defining issue for an agent product.
- **Document handling expectations are high.** Users wanted real edits to binary documents, not just a refusal guard — addressed by #7163 (edit docx/xlsx/pptx, render PDF from HTML).
- **Auth flows are a friction point.** Custom MCPs with browser/email verification hang (#7626); the GitHub extension reports connected even with garbage credentials (#7627). Both erode confidence in extension state.
- **Cloud reliability is being watched.** The Sonnet-5-on-NEAR-AI-Cloud 500s (#7589) are the kind of upstream-dependent incident users remember.
- **Cloud-hosted users want their local files.** The ironclaw-bridge request (#2117) — Obsidian vaults, local project dirs — continues to be the clearest voiced use case for hybrid local/cloud operation.
- **Discoverability gap:** users cannot find the running Reborn version in the web UI (#7580).

## 8. Backlog Watch

- **[#2117 — ironclaw-bridge** (open since 2026-04-07, 2 comments, 1 👍)](https://github.com/nearai/ironclaw/issues/2117). Four months old, no visible maintainer response, yet it matches a repeatedly-voiced user need. Needs a scoping decision or explicit deferral note.
- **[#7185 — Memory recall across conversations** (open since 2026-08-04)](https://github.com/nearai/ironclaw/issues/7185). Only 2 comments; given the Champions feedback source, this deserves a maintainer triage/acknowledgment.
- **[#7626 / #7627 — auth-state bugs** (open 2026-08-13, 0 comments)](https://github.com/nearai/ironclaw/issues/7626). No maintainer response or linked fix yet; both are user-visible correctness issues.
- **Dependabot backlog:** [#7020 tokio-tungstenite 0.29→0.30](https://github.com/nearai/ironclaw/pull/7020) (open since 2026-08-02) and [#7262 wasm group](https://github.com/nearai/ironclaw/pull/7262) (open since 2026-08-05) are the oldest dependency PRs needing review; [#7632](https://github.com/nearai/ironclaw/pull/7632) is newer.
- **[#7378 — doc-fact contract tests** (open since 2026-08-07)](https://github.com/nearai/ironclaw/pull/7378): part of a 5-PR doc-truth train; 2/5 merged, this one is the largest remaining piece and has been idle for a week.

---

*Data window: 2026-08-13 → 2026-08-14. Sources: nearai/ironclaw issues, PRs, and releases.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 🦞 LobsterAI Project Digest — 2026-08-14

## 1. Today's Overview

LobsterAI saw a busy 24-hour window dominated by renderer-layer UI consolidation: 11 PRs were updated, with 6 merged/closed and 5 still open, alongside 1 open issue and 0 new releases. Merged work centered on unifying Skills/MCP presentation into a single experience, a cowork management UI refactor, an evergreen daily check-in feature, and the landing of an enterprise-edition branch. Meanwhile, a cluster of long-stale test-coverage and UX-fix PRs from late March received touch-ups, signaling renewed maintainer attention on hardening priorities. No releases shipped. Overall project health looks stable, with clear momentum toward UI consistency and test coverage, though a backlog of outdated, safety-relevant PRs still awaits final review.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Six PRs were merged or closed today, spanning UI unification, feature work, and a bug fix:

- **[#2488 — Refactor/cowork btw and management UI](https://github.com/netease-youdao/LobsterAI/pull/2488)** *(closed, areas: renderer, cowork)* — Reworked the cowork "btw" panel and its management UI. No detailed summary was provided.
- **[#2487 — refactor(skills): merge skills and mcp views into unified skills-and-connectors view](https://github.com/netease-youdao/LobsterAI/pull/2487)** *(closed, area: renderer)* — Consolidates the previously separate Skills and MCP views into a single unified "skills-and-connectors" view — a meaningful simplification of the settings/management surface.
- **[#2486 — refactor(mcp): unify MCP card/detail UI with kits and skills styling](https://github.com/netease-youdao/LobsterAI/pull/2486)** *(closed, area: renderer)* — Standardized MCP presentation: `SkillCardMenu` became a shared `CardOverflowMenu` (reused across kits/MCP/skills), extracted `managementTypography` for consistent card/detail text, added `McpCard`/`McpDetailModal`, split MCP tabs into `mcpTabs`, and reworked the `McpManager` list/detail flow.
- **[#2485 — feat(activity): support evergreen daily check-in](https://github.com/netease-youdao/LobsterAI/pull/2485)** *(closed, areas: renderer, cowork)* — Turns the previous check-in activity (from PR #2408, which never shipped on `main`) into a permanent evergreen feature. Includes auto-refreshing activity status and moves the points entry from an in-app expanding panel to a web-based points detail page. Verified: 7/7 targeted Vitest tests, ESLint zero warnings, and a passing `npm run build`.
- **[#1232 — fix(scheduledTask): fix first-run result not pushed to UI](https://github.com/netease-youdao/LobsterAI/pull/1232)** *(closed, stale)* — Fixed a bug where a scheduled task's **first-ever** execution never pushed a real-time `runUpdate` to the UI (users only saw results from the second run onward). Root cause: `pollOnce()` required `previousRunAtMs > 0`, but first-run tasks always had `previousRunAtMs = 0`.
- **[#2484 — Feat/enterprise edition](https://github.com/netease-youdao/LobsterAI/pull/2484)** *(closed, areas: renderer, docs, main, openclaw)* — Closed with a placeholder/boilerplate summary, but the broad area labels suggest an enterprise-edition feature branch touching core, OpenClaw, renderer, and docs.

## 4. Community Hot Topics

Discussion volume is low overall — the only issue with any comment activity was **Issue #1162** (1 comment), and no items had meaningful 👍 reactions. The most structurally interesting "topic" is the **test-coverage cluster** around safety-critical modules:

- **[Issue #1162 — Add Vitest tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`](https://github.com/netease-youdao/LobsterAI/issues/1162)** — 1 comment — Core memory-file management (`MEMORY.md`) and the local-time-context prompt had zero test coverage. The linked PR (#1165) adds 75 tests, including path-traversal protection checks and SQLite migration coverage.
- **[PR #1156 — Add Vitest tests for `commandSafety` and `coworkMemoryJudge`](https://github.com/netease-youdao/LobsterAI/pull/1156)** — Targets the dangerous-command detector and the memory-write quality gate, both zero-coverage and highly safety-sensitive.

Underlying need: the community is pressing for regression protection on modules where a false negative could let the AI silently execute destructive commands (`rm -rf`, `git push --force`) or pollute user memory stores — a strong signal that safety hardening is a priority as OpenClaw integration deepens.

## 5. Bugs & Stability

Three bugs are visible today, ranked by severity:

- **High — [#2483 (open) — OpenClaw skill entries keyed by directory, not frontmatter name](https://github.com/netease-youdao/LobsterAI/pull/2483)** *(areas: main, openclaw)* — OpenClaw resolves skill enable/disable overrides by the skill's frontmatter `name`, but `skills.entries` were keyed by directory name. Result: directory/frontmatter mismatches made UI toggles **silently ineffective** — the worst kind of failure because users believe a change happened when it didn't. Fix PR is up and addresses a related issue reported in #244x.
- **Medium — [#1163 (open) — Scheduled task "run now" has no feedback; blocked IPC + stale polling](https://github.com/netease-youdao/LobsterAI/pull/1163)** *(stale)* — Clicking "run now" gives zero visual response; the state takes up to 15s to refresh via polling, prompting duplicate clicks. Root causes identified: missing loading state, an IPC `RunManually` handler that blocks until execution completes, and state only refreshed by 15s polling. The PR also improves the right-click menu styling (icons, danger zones, smart positioning).
- **Medium — [#1166 (open) — Duplicate custom agent names allowed](https://github.com/netease-youdao/LobsterAI/pull/1166)** *(stale)* — The create-agent modal submitted without checking existing names, producing ambiguous agent lists and forcing manual hunting for the original entry. Fix adds a renderer-side existence check before submission.

**Already fixed today:** [#1232](https://github.com/netease-youdao/LobsterAI/pull/1232) resolves the missing first-run push for scheduled tasks (see Project Progress).

## 6. Feature Requests & Roadmap Signals

- **Enterprise edition ([#2484](https://github.com/netease-youdao/LobsterAI/pull/2484))** — The biggest roadmap signal: an enterprise-edition feature set crossed the merge/close line today, spanning `main`, `openclaw`, `renderer`, and `docs`. Expect enterprise-oriented OpenClaw/agent-management capabilities to appear in upcoming releases.
- **Evergreen daily check-in ([#2485](https://github.com/netease-youdao/LobsterAI/pull/2485))** — Converts a one-off campaign into a permanent, self-refreshing activity, with points detail moved to a web page. Suggests ongoing investment in gamification/retention mechanics and web-based account surfaces.
- **Unified skills-and-connectors view ([#2487](https://github.com/netease-youdao/LobsterAI/pull/2487))** — Folding Skills and MCP into one view, plus the reusable card/detail components from [#2486](https://github.com/netease-youdao/LobsterAI/pull/2486), points to a deliberate UX direction: a single, consistent "everything you can connect / install" surface. The next iteration will likely unify Kits (templates) into the same pattern as well.

## 7. User Feedback Summary

Direct user commentary is scarce in this window, but the code changes encode clear pain points:

- **Scheduled tasks are frustrating to operate** ([#1163](https://github.com/netease-youdao/LobsterAI/pull/1163)): no feedback on "run now," 15-second status lag, and duplicate-click risk after triggering — a classic "system ignored me" trust issue.
- **Agent naming ambiguity** ([#1166](https://github.com/netease-youdao/LobsterAI/pull/1166)): users can create duplicate agent names with no warning, making the agent list confusing.
- **OpenClaw toggles silently don't work** ([#2483](https://github.com/netease-youdao/LobsterAI/pull/2483)): users flipping skill toggles in the UI may see no effect in OpenClaw — a silent failure that erodes trust in the control panel.
- **Points/check-in UX preference** ([#2485](https://github.com/netease-youdao/LobsterAI/pull/2485)): users no longer need an in-app points breakdown; a web-based points page was deemed sufficient — a sign the team is simplifying the desktop client.
- **Developer-side dissatisfaction**: constant reminders that core safety modules (`commandSafety`, `coworkMemoryJudge`, `openclawMemoryFile`) run with zero tests ([#1156](https://github.com/netease-youdao/LobsterAI/pull/1156), [#1162](https://github.com/netease-youdao/LobsterAI/issues/1162)) — an internal quality debt now being repaid with 75+ new tests.

## 8. Backlog Watch

A concerning pattern: five PRs opened **2026-03-31** are still stale after ~4.5 months. These are silent but important and need maintainer attention:

- **[PR #1156 — Tests for `commandSafety` and `coworkMemoryJudge`](https://github.com/netease-youdao/LobsterAI/pull/1156)** *(open, stale, no comments)* — Safety-critical. A false negative in `commandSafety` allows destructive commands to run silently. Highest priority of the stale set.
- **[Issue #1162 / PR #1165 — Tests for `openclawMemoryFile` and `openclawLocalTimeContextPrompt`](https://github.com/netease-youdao/LobsterAI/issues/1162)** *(open, stale, 1 comment)* — 75 tests ready for the memory-file core; also includes path-traversal interception tests — security-relevant.
- **[PR #1163 — Scheduled task "run now" feedback + optimistic updates](https://github.com/netease-youdao/LobsterAI/pull/1163)** *(open, stale)* — Root-caused and ready; the UX issue it fixes is actively cited as a user pain point.
- **[PR #1166 — Prevent duplicate custom agent names](https://github.com/netease-youdao/LobsterAI/pull/1166)** *(open, stale)* — Small scope, clear user value; a good candidate for fast-track review.
- **[PR #2483 — Key OpenClaw skill entries by frontmatter name](https://github.com/netease-youdao/LobsterAI/pull/2483)** *(open, new 2026-08-13)* — Not stale, but it fixes a silent functionality bug; should be prioritized alongside the stale queue.

**Recommendation:** the four March-era PRs form a coherent "stability & test coverage" release batch. Sweeping them into the next milestone would clear the oldest open work and close high-risk gaps in command safety, memory integrity, and task UX.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-14

## Today's Overview

Moltis is in a quiet but active maintenance and feature-development period. In the last 24 hours, there was 1 open issue and 4 open pull requests, with no PRs merged or closed and no new releases. The only newly surfaced issue is a flaky test failure under full-suite load, while the open PRs focus on fixing broken Go module references and improving macOS bash compatibility. A larger connector-focused pull request remains open and continues to receive updates. Overall, the project is healthy with no release-blocking regressions reported today.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

No pull requests were merged or closed today. The current open PRs indicate ongoing work in two areas:

- **Tooling fixes** to keep build and validation scripts working across macOS and Linux environments.
- **Expanded connector support** for durable CalDAV and channel history data sources.

### Notable open PRs

- [#1194 fix(scripts): guard empty bash array expansions for macOS bash 3.2](https://github.com/moltis-org/moltis/pull/1194) — Fixes `just local-validate-full` crashing on macOS when no PR number is supplied.
- [#1192 fix(skills): point wacrawl install metadata at the openclaw org](https://github.com/moltis-org/moltis/pull/1192) — Corrects the `wacrawl` skill's `go install` fallback path after the project moved to the `openclaw` org.
- [#1191 fix(sandbox): point gogcli module path at the openclaw org](https://github.com/moltis-org/moltis/pull/1191) — Fixes `moltis sandbox build` failures caused by an outdated `github.com/steipete/gogcli` module path.
- [#1190 Add durable CalDAV and channel history connectors](https://github.com/moltis-org/moltis/pull/1190) — Large feature PR adding provider-neutral connector persistence, atomic snapshots, scheduling, projections, bounded local full-text search, read-only CalDAV datasets, and reusable Slack/Discord/Matrix/Microsoft Teams history datasets.

## Community Hot Topics

There is no clear "hottest" discussion today: all tracked issues and PRs have zero comments and zero reactions in the provided data. The underlying themes, however, are visible from the activity:

- **Developer tooling friction**: The macOS bash issue and the two OpenClaw org migration fixes show that local development and sandbox builds are encountering environment-specific failures.
- **Connector expandability**: PR #1190 represents a significant architectural investment in durable connectors, which is likely a high-interest roadmap area even without active comment volume.

## Bugs & Stability

No crashes or regressions were reported today beyond one intermittent test failure. Ranked by severity:

1. **Flaky test: push fanout timeout assertion races under full-suite load** — [#1193](https://github.com/moltis-org/moltis/issues/1193)
   - **Impact:** Intermittent CI failure only when the full workspace suite runs; failed on 2 of 3 full-suite runs on an idle 10-core macOS machine.
   - **Status:** Open, no comments, no linked fix PR yet.
   - **Assessment:** Moderate severity — not breaking functionality, but indicates a timing/race condition in the gateway's fanout timeout test that should be stabilized.

2. **Sandbox build failures on every pre-built image** — addressed in [#1191](https://github.com/moltis-org/moltis/pull/1191)
   - **Impact:** Blocks `moltis sandbox build` because the generated Dockerfile installs `gogcli` from the old `steipete` path.
   - **Status:** Fix PR open.

3. **Broken `wacrawl` skill install fallback** — addressed in [#1192](https://github.com/moltis-org/moltis/pull/1192)
   - **Impact:** The `wacrawl` skill's `go install` fallback fails because the module moved to `github.com/openclaw/wacrawl`.
   - **Status:** Fix PR open.

## Feature Requests & Roadmap Signals

The main roadmap signal is [PR #1190](https://github.com/moltis-org/moltis/pull/1190): durable CalDAV and channel history connectors. This is not a user-requested feature issue, but it strongly indicates Moltis is moving toward:

- **Provider-neutral connector persistence**
- **Atomic snapshots and scheduling**
- **Local full-text search over connector data**
- **Read-only access to Slack, Discord, Matrix, and Microsoft Teams history without copying channel credentials**

If merged, this would likely be a headline feature in the next Moltis release. No other new feature requests were filed today.

## User Feedback Summary

No direct user comments or reactions were captured in the last 24 hours. Indirect feedback from PRs and issues shows real pain points:

- **macOS users** hit bash 3.2 incompatibilities with scripts that assume newer bash array behavior ([#1194](https://github.com/moltis-org/moltis/pull/1194)).
- **Sandbox users** cannot build images due to upstream dependency renames ([#1191](https://github.com/moltis-org/moltis/pull/1191)).
- **Skill users** encounter broken install fallbacks after the `wacrawl` project migrated to the OpenClaw org ([#1192](https://github.com/moltis-org/moltis/pull/1192)).

These are actionable, environment-specific complaints rather than signs of broad dissatisfaction.

## Backlog Watch

No long-stale or abandoned issues require immediate maintainer attention. The oldest open PR is the large connector feature [#1190](https://github.com/moltis-org/moltis/pull/1190), opened August 11 and updated August 13, so it is still actively moving. Issue [#1193](https://github.com/moltis-org/moltis/issues/1193) is new and unassigned; it may merit a quick triage to prevent repeated CI flakiness. No other items appear neglected.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-14

*Data source: github.com/agentscope-ai/QwenPaw (CoPaw project repository)*

## 1. Today's Overview

CoPaw/QwenPaw is in a high-velocity release and stabilization cycle. In the last 24 hours, **42 issues** (25 open, 17 closed) and **50 PRs** (31 open, 19 merged/closed) were updated, and **two releases** shipped, including **v2.1.0**, a major version introducing the QwenPaw OS Shell desktop environment. Community activity is dominated by Chinese-speaking users reporting real-world reliability and security concerns, while maintainers are steadily merging infrastructure fixes: chat history pagination, server-side mission iteration caps, and resilient Auto-Dream memory integration. Project health is strong — evidenced by a steady stream of first-time contributor PRs landing — but the open-issue backlog around agent task-stalling, memory/compaction behavior, and sandbox/security perception is growing and warrants attention.

---

## 2. Releases

### [v2.1.0](https://github.com/agentscope-ai/QwenPaw/releases) — Major release
- **QwenPaw OS Shell**: Apps now open in movable, resizable windows with a launcher, taskbar, notifications, and saved layouts ([#6645](https://github.com/agentscope-ai/QwenPaw/pull/6645)).
- **Unified app catalog**: Installed apps and marketplace apps now share one catalog across the App Center (description truncated in source data).
- Release notes PR: [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994).

### [v2.1.0-beta.5](https://github.com/agentscope-ai/QwenPaw/releases)
- `fix(chats)`: Handle dict-like model responses ([#6813](https://github.com/agentscope-ai/QwenPaw/pull/6813)).
- `fix(memory)`: Simplify long-term memory guidance ([#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942)).
- `docs(website)`: Files workspace documentation updates.

No explicit breaking changes or migration notes were published in the provided release data.

---

## 3. Project Progress

Notable merged/closed PRs in the last 24 hours:

- **[#6652](https://github.com/agentscope-ai/QwenPaw/pull/6652) — fix(mission): enforce max_iterations server-side in MissionGate.** Fixes [#6505](https://github.com/agentscope-ai/QwenPaw/issues/6505); previously the controller LLM could dispatch 54+ sub-agents instead of the configured 20 until the provider account balance ran out.
- **[#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636) — fix(chats): paginate chat history + enable GZip compression.** Fixes 30-second timeouts on slow networks for long (1MB+) chats.
- **[#6387](https://github.com/agentscope-ai/QwenPaw/pull/6387) — feat(channels): install optional dependencies on demand.** Channel SDKs move out of the default dependency set while staying visible in the Console.
- **[#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) — fix: make Auto-Dream integration resilient** (first-time contributor). A single malformed LLM integration schema no longer fails the entire Auto-Dream task.
- **[#6989](https://github.com/agentscope-ai/QwenPaw/pull/6989) — chore: update release notes for v2.1.0** (superseded by [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994)).

Closed issues representing completed work: [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) (OpenAI Responses continuation summary), [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) (Dream memory pipeline), [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047) (new chat reopening old session), and [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) (plugin cron/message-injection security gap).

---

## 4. Community Hot Topics

Most-discussed issues in the last 24 hours:

1. **[#6921 — Agent stops mid-task without any prompt](https://github.com/agentscope-ai/QwenPaw/issues/6921)** (6 comments, open). The agent plans out loud ("Now 2.1, 3.1, 3.2. Let me do all three.") and then halts silently until the user says "继续" (continue). **Underlying need:** autonomous agents must reliably continue executing after planning, not stop at the planning step.
2. **[#6973 — Aliyun Bailian token plan support](https://github.com/agentscope-ai/QwenPaw/issues/6973)** (5 comments, open). Chinese users want to use Alibaba Cloud Bailian token packages with QwenPaw Creator. **Underlying need:** local/regional billing integration for Chinese cloud users.
3. **[#6811 — OpenAI Responses continuation summary ignores `disable_thinking`](https://github.com/agentscope-ai/QwenPaw/issues/6811)** (5 comments, closed). Background continuation summaries block the main conversation and misreport 60-second cancellations as malformed output. **Underlying need:** background memory/compaction work must not block or disturb the main agent loop.
4. **[#6853 — "prompts.py lies to agents" — Dream writes to digest/ not MEMORY.md](https://github.com/agentscope-ai/QwenPaw/issues/6853)** (5 comments, closed). The documented dream pipeline (summarize → extract → integrate) was never implemented; prompts claim otherwise. **Underlying need:** memory transparency — prompts must match actual system behavior.
5. **[#6847 — QwenPaw killed by antivirus, WorkBuddy isn't](https://github.com/agentscope-ai/QwenPaw/issues/6847)** (4 comments, open) and **[#6780 — Idle freeze after ~30 min](https://github.com/agentscope-ai/QwenPaw/issues/6780)** (4 comments, open). **Underlying need:** desktop reliability and trust — the agent must not look like malware or die when left idle.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Status |
|---|---|---|
| **Critical (Security)** | [#6992](https://github.com/agentscope-ai/QwenPaw/issues/6992) / [#6993](https://github.com/agentscope-ai/QwenPaw/issues/6993): Reported exposure of port 8088 to the public internet with unauthenticated plugin-install API. Both closed as invalid; [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) (plugins silently creating cron jobs and injecting messages) is closed. | Closed — no active fix PR visible |
| **High** | [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768): Agent enters infinite loop after multi-step task, session blocked for hours (closed). | Closed |
| **High** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921): Frequent mid-task stalls requiring user "继续" nudges (v2.1b2, Windows 11). Most-commented open bug; **no fix PR yet**. | Open |
| **High** | [#7008](https://github.com/agentscope-ai/QwenPaw/issues/7008): Anthropic-side false-positive "sensitive image" moderation interrupts long sessions (error 1026); images were confirmed benign. | Open |
| **Medium** | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951): After Scroll compaction, pre-compaction transcript is invisible in the UI — compaction should affect model input only, not the user-visible transcript. | Open |
| **Medium** | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955): Probabilistic startup crash/exit on Windows (Python 3.13, pip install). | Open |
| **Medium** | [#7007](https://github.com/agentscope-ai/QwenPaw/issues/7007): Windows Desktop TUI fails with `transport: Connection closed` — packaged `qwenpaw.exe` rejects `-m qwenpaw acp`. | Open |
| **Medium** | [#6966](https://github.com/agentscope-ai/QwenPaw/issues/6966): Telegram `/new` clears in-memory context but does not rotate session ID (`telegram:{chat_id}` hardcoded) → context grows indefinitely via scroll history.db. | Open |
| **Low/Medium** | [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005): Enabling Shabox sandbox blocks writes to `~/.cache/uv`, breaking `uv run`; workaround is an explicit `Write(~/.cache/uv/**)` policy. | Open |
| **Low** | [#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006): Language-option lists inconsistent between top-right dropdown and bottom-left settings gear. | Open |

**Fix PRs in flight:** semaphore leak from unconsumed LLM streams ([#6998](https://github.com/agentscope-ai/QwenPaw/pull/6998)); context-usage ring not reset after `/compact` ([#6975](https://github.com/agentscope-ai/QwenPaw/pull/6975)); plugin workspace state restoration before reload swap ([#6996](https://github.com/agentscope-ai/QwenPaw/pull/6996)); file-cache to reduce skill/system file I/O ([#6990](https://github.com/agentscope-ai/QwenPaw/pull/6990)).

---

## 6. Feature Requests & Roadmap Signals

Most requested features this cycle:

- **[#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970)**: Embeddable chat sub-page (no sidebar/header), API-key-in-URL auth bypass, and session list filtering by date/sessionId.
- **[#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973)**: Aliyun Bailian token-plan support in QwenPaw Creator.
- **[#7002](https://github.com/agentscope-ai/QwenPaw/issues/7002)**: Lightweight server-side proxy client — use server-deployed agents from a personal computer while retaining desktop-control abilities.
- **[#6995](https://github.com/agentscope-ai/QwenPaw/issues/6995)**: Inject `QWENPAW_CHANNEL` env var into shell subprocesses so external scripts know the originating channel.
- **[#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003)**: ViBo proposal — encrypted memory for agents claiming **97.5% token reduction** (3rd-party pitch).
- **[#6283](https://github.com/agentscope-ai/QwenPaw/issues/6283)**: Auto-attach current real-world time to context to prevent date confusion in resumed old sessions (closed).
- **[#6585](https://github.com/agentscope-ai/QwenPaw/issues/6585)**: Toggle to disable the dynamic received-character counter (closed).

**Roadmap signals from open PRs:** [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — "pawport" import flow from other agents (Codex, Qoder); [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) — session-scoped multi-project directories; [#7001](https://github.com/agentscope-ai/QwenPaw/pull/7001) — per-sender session/memory isolation in Matrix group rooms; [#7004](https://github.com/agentscope-ai/QwenPaw/pull/7004) — persist spawn parent-child linkage in chat meta; [#6984](https://github.com/agentscope-ai/QwenPaw/pull/6984) — ReMe memory runtime dashboard; [#6823](https://github.com/agentscope-ai/QwenPaw/pull/6823) — provider capability templates for custom OpenAI-compatible providers; [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — large unification of provider discovery, model metadata, routing, and agent controls.

**Prediction for next releases:** Memory reliability and token-cost optimization are the strongest recurring themes (ViBo pitch, ReMe dashboard, compaction bugs, Dream pipeline fixes). Expect 2.1.x patch releases targeting the mid-task stall ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)) and compaction visibility ([#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)), with provider/config unification ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)) more likely in 2.2.

---

## 7. User Feedback Summary

- **Language/community:** The vast majority of user reports this cycle are in Chinese — the Chinese-speaking community is clearly the most active user segment and is the primary driver of bug discovery.
- **Biggest pain point:** Agents stalling mid-task after stating a plan ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)) — this erodes trust in autonomous multi-step work and forces users to babysit the agent with "继续" commands.
- **Security anxiety:** Users report antivirus software killing QwenPaw processes ([#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)) and one submitted a full incident report claiming public port exposure and unauthenticated APIs ([#6992](https://github.com/agentscope-ai/QwenPaw/issues/6992)) — even though it was closed as invalid, perception matters.
- **Memory transparency:** Users are frustrated when memory behavior contradicts documentation ([#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)) or compaction hides their own transcript from the UI ([#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)).
- **Feature enthusiasm:** The project is attracting external proposals (ViBo memory, #7003 — which notes **33,748 stars**) and a wave of first-time contributor PRs spanning Matrix, console meta, and import flows — a healthy signal of community momentum.

---

## 8. Backlog Watch

Items needing maintainer attention:

- **[#6302 (PR)](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unify provider discovery, model metadata, routing, and agent controls.** Open since **2026-07-21**; large architectural refactor with no visible review activity. High impact, high risk.
- **[#6715 (PR)](https://github.com/agentscope-ai/QwenPaw/pull/6715) — OneBot inbound media localization.** Open since 2026-08-05; maintainer review findings were addressed but still under review.
- **[#6823 (PR)](https://github.com/agentscope-ai/QwenPaw/pull/6823) — Provider capability templates for custom providers** (first-time contributor). Open since 2026-08-08.
- **[#6780 (Issue)](https://github.com/agentscope-ai/QwenPaw/issues/6780) — Idle freeze after ~30 minutes in 2.0.1.** Open since 2026-08-07; requires process restart — a desktop-blocking bug with no linked fix.
- **[#6847 (Issue)](https://github.com/agentscope-ai/QwenPaw/issues/6847) — Antivirus kills QwenPaw.** Open since 2026-08-09; trust/security perception issue that may need packaging/signing changes.
- **[#6921 (Issue)](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Mid-task stall without prompt.** Open since 2026-08-12; the most-commented issue in this cycle with no fix PR yet — should be prioritized for a 2.1.x hotfix.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-14

## 1. Today's Overview

ZeroClaw saw sustained high activity over the last 24 hours, with 50 issues and 50 PRs updated, 13 issues closed, and 7 PRs merged/closed. No new releases were published, indicating the project remains mid-cycle toward its v0.9.0 milestone, which is explicitly tracked in the auth/security/gateway breaking-change queue ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)). The day's work skews heavily toward security hardening and CI infrastructure: two P1 security fixes landed (gateway dashboard asset containment, session queue serialization), and a multi-PR Blacksmith CI migration effort advanced. The RFC process remains the dominant coordination mechanism, with maintainers actively revising and triaging design proposals (notably #7155, #8303, #9487) through the maintainer decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)). Overall, the project shows healthy throughput with strong maintainer engagement, though several P1 bugs remain open awaiting review or author action.

---

## 2. Releases

No new releases in the last 24 hours. The most recent release-related activity is the merged feature for **weekly lettered cuts within a numbered release line** ([#9712](https://github.com/zeroclaw-labs/zeroclaw/issues/9712), closed), which adds SemVer-compatible `v0.8.5-a`/`v0.8.5-b` style pre-release support — a signal that the project is preparing more granular release cadence ahead of v0.9.0. No migration notes to report.

---

## 3. Project Progress

Seven PRs were merged or closed in the last 24 hours:

### Security fixes
- **[PR #9969](https://github.com/zeroclaw-labs/zeroclaw/pull/9969) — fix(gateway): contain filesystem dashboard assets** (P1, closed). Canonicalizes filesystem-backed dashboard asset paths before reading, rejects stable symlink escapes outside the configured distribution root, and applies containment at resolution time. A direct response to the pairing-lockout audit trail (#9389).
- **[PR #9674](https://github.com/zeroclaw-labs/zeroclaw/pull/9674) — fix(infra): preserve session queue serialization during eviction** (P1, closed). Registers session requests while the session-slot map is still locked, preventing idle eviction from removing a selected slot before its pending count is visible; uses an RAII guard for pending registration.

### CI infrastructure
- **[PR #9932](https://github.com/zeroclaw-labs/zeroclaw/pull/9932) — ci(codeql): drop rust/hard-coded-cryptographic-value** (closed). Adds a query-filters block excluding a CodeQL query producing 27 false-positive "critical" alerts, all inside `cfg(test)`.
- **[PR #9980](https://github.com/zeroclaw-labs/zeroclaw/pull/9980) — ci(docker): sticky-disk layer cache for PR image builds on Blacksmith** (closed). Addresses thrashing of GitHub's 10 GB/repo cache for the heavy `source-images` validation builds (~78 runs/2 weeks).
- **[PR #9984](https://github.com/zeroclaw-labs/zeroclaw/pull/9984) — rust-cache useblacksmith path validation** (closed, do-not-merge). Temporary same-repo PR to exercise the Blacksmith rust-cache path on a real runner; identical code to #9962, closed once green.

### Docs & CLI
- **[PR #9639](https://github.com/zeroclaw-labs/zeroclaw/pull/9639) — docs(architecture): document provider routing lifecycle** (closed). Source-grounded page covering profile construction, hint routing, retry/fallback order, cooldowns, streaming recovery, no-replay boundaries, and requested-versus-served attribution.
- **[PR #8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) — fix(cli): localize status fragments** (closed). Routes remaining `zeroclaw status` agent risk-profile summary fragments through Fluent keys and adds localized Web UI availability messaging.

---

## 4. Community Hot Topics

- **[Issue #8303 — RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** (20 comments, 1 👍, P2, needs-maintainer-review). The most-discussed item. Proposes a durable way to pursue a bounded user objective across multiple agent turns, deliberately excluding restart handoff, broad channel admission, Web, and async child work from first delivery. The long revision history suggests scope negotiation between author and maintainers is the sticking point.

- **[Issue #7155 — RFC: per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (18 comments, P1, needs-maintainer-review). Now on Revision 3, narrowed to a reconciled shell-policy contract (allow/ask/deny) after maintainer scope review. This is a flagship safety/UX proposal influenced by Claude Code's command pattern policy.

- **[Issue #8692 — Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (13 comments). The project's central triage surface. Its continued activity reflects a growing RFC backlog that maintainers are working through systematically.

- **[Issue #6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** (12 comments, needs-author-action). Seeks a clean boundary between durable memory storage and consolidation/governance lifecycle decisions, which are currently reimplemented per gateway/channel/backend.

- **[Issue #9328 — Bug: verifiable-intent evaluates constraints without verifying the credential chain](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)** (12 comments, P2, in-progress/accepted). A security-correctness gap: `vi_verify`'s `evaluate_constraints` checks caller-supplied L2 constraints without prior cryptographic chain verification, diverging from the VI reference implementation.

- **[Issue #9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** (11 comments, P2, needs-maintainer-review). Revision 2 ratifies the #9487/#9488/#9600 ownership boundary and makes every migrated entry point submit `InboundAction`, adding durable admission and ambiguous-outcome semantics.

**Underlying needs:** The hot topics cluster around three themes — (1) **execution safety and authorization** (#7155, #9328), (2) **architecture ownership boundaries** (#9487, #6850, #8692), and (3) **bounded multi-turn agent execution** (#8303). All three point to a project transitioning from single-turn tool orchestration to durable, policy-governed agent workflows.

---

## 5. Bugs & Stability

Eleven bug reports were active in the last 24 hours. Ranked by severity:

### P1 — Critical/High
- **[Issue #9389 — unauthenticated POST /api/pair keys lockout on attacker-supplied header](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)** (CLOSED). Found via source audit of the pairing route; an attacker can manipulate the lockout key. Fixed by the gateway hardening work in [#9969](https://github.com/zeroclaw-labs/zeroclaw/pull/9969).
- **[Issue #9929 — headless SOP step turns given a session path but never persisted](https://github.com/zeroclaw-labs/zeroclaw/issues/9929)** (OPEN, blocked/accepted). `drive_headless_run` builds `session_path = "sop-{run_id}-step-{n}"` but the session store never receives the data. S2 severity, tied to the session-persistence contract tracker [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600).
- **[PR #9635 — git subcommand resolved incorrectly in risk classifier](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)** (OPEN, needs-author-action). `SecurityPolicy::command_risk_level` reads `args.first()`, which fails for `git -C <path> <verb>` invocations; the fix parses past global options.
- **[PR #9002 — agent turns cancelled after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)** (OPEN, needs-maintainer-review). Treats the dashboard WebSocket as viewer/controller rather than turn owner, keeping bounded turns draining after client detach.
- **[PR #9424 — semantic-empty terminal completions treated as success](https://github.com/zeroclaw-labs/zeroclaw/pull/9424)** (OPEN, in-progress). Rejects blank/whitespace/think-only terminal responses and routes them through Reliable retry/fallback.
- **[PR #9968 — Zhipu credential forwarded as raw bearer token on JWT failure](https://github.com/zeroclaw-labs/zeroclaw/pull/9968)** (OPEN, new). Fail-closes when a Zhipu credential cannot produce a valid JWT instead of leaking the raw credential.

### P2 — Medium
- **[Issue #9951 — WeChat channel and its 51 lib unit tests never compile in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/9951)** (CLOSED). `channel-wechat` feature missing from every CI feature set.
- **[Issue #9366 — WhatsApp Web accepts approval_timeout_secs but never reads it](https://github.com/zeroclaw-labs/zeroclaw/issues/9366)** (CLOSED). Config/runtime validation mismatch, split from #9348.
- **[Issue #9960 — duplicate enabled webhook ports accepted in quickstart](https://github.com/zeroclaw-labs/zeroclaw/pull/9960)** (OPEN, needs-author-action). Post-apply config can contain duplicate listen ports.

### P3 — Minor (all closed)
- **[Issue #9710 — desktop screenshot temp files leak on early returns](https://github.com/zeroclaw-labs/zeroclaw/issues/9710)** (CLOSED).
- **[Issue #9706 — Edge TTS temp output not cleaned on every error path](https://github.com/zeroclaw-labs/zeroclaw/issues/9706)** (CLOSED).
- **[Issue #9643 — wit/VERSIONING.md fails to classify enum variant additions](https://github.com/zeroclaw-labs/zeroclaw/issues/9643)** (CLOSED, P1 docs). Adding an enum variant breaks every previously compiled plugin; the versioning doc is being corrected.

**Verdict:** Security regression fixes are landing quickly (both P1 security items closed within 24h of each other). The main stability risk is the open P1 cluster around session/SOP persistence (#9929, #9600, #9674), which is explicitly shepherded by a dedicated ownership tracker.

---

## 6. Feature Requests & Roadmap Signals

**Accepted / nearing acceptance (likely v0.9.0 candidates):**
- **[Issue #9895 — Provider-grouped, paginated Telegram /model picker](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)** (status:accepted). Mobile UX improvement for multi-route setups.
- **[Issue #9945 — Expand browser tool beyond 16 of agent-browser's 100+ commands](https://github.com/zeroclaw-labs/zeroclaw/issues/9945)** (status:accepted, blocked). Iframes, JS dialogs, tabs, and form controls are unreachable.
- **[Issue #9887 — Downscale oversized images instead of dropping them](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)** (status:accepted, blocked). Lets `multimodal.max_image_size_mb = 0` disable limits entirely.
- **[Issue #9328 — verifiable-intent credential chain verification](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)** (status:in-progress/accepted). Security correctness fix.

**Under active RFC review:**
- **[#7155 — Shell command confirmation tier](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (P1) and **[#9598 — SOP capability permission contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)** (blocked) — both target v0.9.0 authorization.
- **[#8303 — Goal mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — bounded multi-turn foreground work.
- **[#9487 — Runtime-owned sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** + tracker **[#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)** — session-persistence contract ownership.
- **[#9810 — Load Agent Plugins 1.0 skill and MCP packages](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)** (blocked) — vendor-neutral plugin ecosystem support.
- **[#9880 — Type resolved peer policy](https://github.com/zeroclaw-labs/zeroclaw/issues/9880)** (blocked) — replacing string-grammar `Vec<String>` grants/denies with typed policy.
- **[#9825 — Publish-safe exceptions for public blockchain identifiers](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)** — leak-detector false positives breaking payment URLs.

**Longer-horizon user requests:**
- **[#9631 — Stable session_id to OpenRouter for prompt-cache savings](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)** (blocked) — direct cost reduction.
- **[#5907 — Opt-in LSP support for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)** — older request (April) targeting hallucination reduction in code generation.
- **[#6998 — Schema-validated memory consolidation](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)** and **[#6850 — Memory lifecycle decoupling](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** — memory reliability and architecture.
- **[#7929 — Unified slash-command registries](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)** — cross-surface command drift.

**Prediction:** The v0.9.0 milestone (tracked in [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) will likely land with the shell-command confirmation policy (#7155) and SOP permission contract (#9598), the two permission/RFC items explicitly targeting it. The session-persistence ownership work (#9600) and runtime-owned conversations (#9487) are strong candidates for the same window given the number of dependent workstreams. The OpenRouter session_id feature (#9631) is a high-value, low-risk addition that could ship in a patch release after the blocking session work resolves.

---

## 7. User Feedback Summary

**Pain points with clear user expressions:**
- **Costs:** OpenRouter users report conversations "unnecessarily expensive" — dozens of LLM requests per chat replaying system prompts and tool schemas ([#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)).
- **Mobile UX:** The text-based `/model` command is "cumbersome on mobile when many routes are configured" ([#9895](https://github.com/zeroclaw-labs/zeroclaw/issues/9895)).
- **Browser tooling gap:** A 16-command subset of a 100+ command backend leaves iframes, JS dialogs, tabs, and form controls unreachable — a significant capability gap for agents ([#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945)).
- **Image handling:** Valid images >5 MiB are dropped outright with a generic "could not be loaded" message rather than downscaled ([#9887](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)).
- **Security false positives:** The leak detector's entropy heuristic redacts legitimate public blockchain addresses, breaking payment-request URLs ([#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)).
- **Coding workflow:** Community wants LSP integration to "reduce hallucination" and improve code generation, especially with local models ([#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)).

**Satisfaction signals:** Contributors are investing heavily in the project's design process — participating in multi-revision RFCs (#7155, #9487), filing high-quality audit-style bug reports (#9389, #9366), and even conducting cross-project comparisons against DeepSeek Harness to feed the security roadmap ([#9978](https://github.com/zeroclaw-labs/zeroclaw/issues/9978), closed). The maintainer decision queue (#8692) and revision-history discipline indicate a responsive, process-mature maintainer team. The main dissatisfaction vector appears to be **stalled author-action items** — several well-formed issues and PRs wait on their authors to respond to maintainer feedback (e.g., #6850, #5907, #9635, #9420).

---

## 8. Backlog Watch

### Longest-open items needing attention
- **[#5907 — Opt-in LSP support for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)** — open since **2026-04-19** (~117 days), needs-author-action. High-value coding feature with no movement.
- **[#6850 — RFC: Decouple memory lifecycle policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** — open since **2026-05-22**, needs-author-action. 12 comments, no author response to maintainer feedback.
- **[#6998 — Schema-validated memory consolidation](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)** — open since **2026-05-29**, no maintainer or author action evident.

### Maintainer review needed (blocking otherwise-ready work)
- **[Issue #8303 — Goal mode v1 RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — 20 comments, needs-maintainer-review.
- **[Issue #7155 — Shell command confirmation policy](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** — P1, needs-maintainer-review, explicitly targeted at v0.9.0.
- **[PR #9002 — Keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)** — P1 fix, open since 2026-07-11, needs-maintainer-review.
- **[PR #8955 — Telegram media group batching](https://github.com/zeroclaw-labs/zeroclaw/pull/8955)** — open since 2026-07-10, XL size, needs-maintainer-review.

### Stalled PRs waiting on author action
- **[PR #9635 — git subcommand risk classification](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)** (P1 security).
- **[PR #9420 — Anthropic stored OAuth profiles](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)** (XL, multi-surface).
- **[PR #9707 — bare vision_model_provider migration](https://github.com/zeroclaw-labs/zeroclaw/pull/9707)** and **[PR #9713 — token accounting on history-trim](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — both from 2026-08-03, needs-author-action.
- **[PR #9694 — SOP pane as read-only status view](https://github.com/zeroclaw-labs/zeroclaw/pull/9694)** — depends on #9692, needs-author-action.
- **[PR #9960 — duplicate webhook port rejection](https://github.com/zeroclaw-labs/zeroclaw/pull/9960)** — new, small, needs-author-action.
- **[PR #9013 — TodoWrite display config move to zerocode](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)** — breaking-change refactor (XL) open since 2026-07-12; has sat untouched for a month.

### Notable risk
The session-persistence contract is being changed by **four independent workstreams simultaneously** with no designated owner — tracker [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) now owns the ordering, but the P1 bug [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) (headless SOP sessions never persisted) is currently blocked by this unresolved ownership question. This is the single most important coordination item to watch.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*