# OpenClaw Ecosystem Digest 2026-08-19

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-18 23:00 UTC

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

# OpenClaw Project Digest — 2026-08-19

## 1. Today's Overview

OpenClaw shows very high activity: **500 issues and 500 PRs** were updated in the last 24 hours, with **38 issues closed** and **166 PRs merged/closed**. No new release shipped; work is concentrated on the 2026.8.x beta line, with a large batch of Control-UI polish PRs (collapsible rosters, stable Plugins hub, browser-tab refresh) alongside critical runtime fixes (Matrix v12 room IDs, Codex attachment OOM, doctor legacy-state recovery). However, health signals are mixed: many P1/"diamond lobster" bugs remain open with `clawsweeper-recovery-stuck` and `needs-maintainer-review` labels, indicating automated triage is outpacing maintainer review capacity. Recurring community themes are regressions in the core agent loop, session-state/migration breakage, and silent message loss or truncation.

## 2. Releases

**No new releases published today** (0 new releases in the last 24 hours). The most recent reference points in the data are `2026.8.1-beta.2` (see issue [#124788](https://github.com/openclaw/openclaw/issues/124788)) and `2026.7.1`; no release notes, breaking-change advisories, or migration notes to report.

## 3. Project Progress

Notable merged/closed PRs and features that advanced (aggregate: 166 PRs merged/closed today):

**Security (landed):**
- [#116489](https://github.com/openclaw/openclaw/pull/116489) — CLI install-policy warnings now require explicit operator acknowledgement (merged/closed).
- [#120900](https://github.com/openclaw/openclaw/pull/120900) — Control UI lets admins review install-policy warnings and continue installs (merged/closed).

**Key fixes in review (with linked issues):**
- [#126059](https://github.com/openclaw/openclaw/pull/126059) — `fix(doctor)` recovers recreated legacy workspace state; closes [#111498](https://github.com/openclaw/openclaw/issues/111498) (agent blocked by workspace-state migration).
- [#123931](https://github.com/openclaw/openclaw/pull/123931) — Matrix room v12 room IDs (no `:server` suffix); closes [#125679](https://github.com/openclaw/openclaw/issues/125679) (infinite sync loop).
- [#126017](https://github.com/openclaw/openclaw/pull/126017) — Large base64 attachments on `/v1/responses` no longer crash the gateway with heap OOM; closes [#126015](https://github.com/openclaw/openclaw/issues/126015).
- [#123848](https://github.com/openclaw/openclaw/pull/123848) — SSRF protection for Beam mirror uploads (redirect body replay).
- [#110652](https://github.com/openclaw/openclaw/pull/110652) — MCP stdio chunk-boundary diagnostics no longer corrupted/lost.
- [#110455](https://github.com/openclaw/openclaw/pull/110455) — ACP `session/new` orders the result before `session/update` notifications.
- [#123975](https://github.com/openclaw/openclaw/pull/123975) — Typecheck wrapper now kills wedged `tsgo` instead of hanging CI/terminals.

**UI/UX advances (Control UI/web):**
- [#126032](https://github.com/openclaw/openclaw/pull/126032) / [#125963](https://github.com/openclaw/openclaw/pull/125963) — Online roster/sidebar section made collapsible.
- [#126061](https://github.com/openclaw/openclaw/pull/126061) — Stable Plugins hub navigation across Installed/Discover/Skills/Workshop.
- [#125067](https://github.com/openclaw/openclaw/pull/125067) — Only genuinely clipped session titles reveal/scroll.
- [#126058](https://github.com/openclaw/openclaw/pull/126058) — Browser sidebar refreshes when its tab activates.
- [#123535](https://github.com/openclaw/openclaw/pull/123535) — Avoids session-catalog refresh storms during rapid navigation.
- [#123356](https://github.com/openclaw/openclaw/pull/123356) — Slash-command arguments can be staged in the composer.

**Core/CLI/Codex:**
- [#125143](https://github.com/openclaw/openclaw/pull/125143) — CLI direct-inference commands allow explicit agent selection (automerge armed, closes [#124926](https://github.com/openclaw/openclaw/issues/124926)).
- [#125879](https://github.com/openclaw/openclaw/pull/125879) — `openclaw connect --service` gains a consent path for full worker-session hosting.
- [#125707](https://github.com/openclaw/openclaw/pull/125707) — Codex native thread reasoning effort is reported in the live lifecycle.
- [#126050](https://github.com/openclaw/openclaw/pull/126050) — Oversized Codex trajectory exports retain terminal facts (thread/turn IDs, abort state, assistant text).
- [#126065](https://github.com/openclaw/openclaw/pull/126065) — Shared plugin retry runtime replaces duplicated retry/backoff/timer logic across bundled plugins.

## 4. Community Hot Topics

Most-discussed issues (by comment count):

- [#80319](https://github.com/openclaw/openclaw/issues/80319) (17 comments, 1 👍) — QA tool-defaults suite conflates Codex-native tools with OpenClaw dynamic tool parity. Underlying need: accurate, provider-specific test isolation rather than false "tool dropout" alarms.
- [#112423](https://github.com/openclaw/openclaw/issues/112423) (15 comments, P1, diamond lobster) — Large SQLite transcript cleanup blocks the gateway event loop. Underlying need: non-blocking, streaming-safe session archival.
- [#62505](https://github.com/openclaw/openclaw/issues/62505) (15 comments, 1 👍, P1, diamond lobster) — Coding Agent "never completes anything" since 2026.4.2. Underlying need: a working autonomous coding loop; this is the most emotionally charged open regression.
- [#38327](https://github.com/openclaw/openclaw/issues/38327) (14 comments, **3 👍**, P1) — `google-vertex/gemini-3.1-pro-preview` crashes with "Cannot convert undefined or null to object" after 2026.3.2.
- [#79902](https://github.com/openclaw/openclaw/issues/79902) (14 comments, 2 👍) — Companion-friendly SQLite transcript/session seams on the database-first runtime. Underlying need: power users want canonical, queryable state instead of opaque blobs.
- [#125679](https://github.com/openclaw/openclaw/issues/125679) (9 comments) — Matrix channel never completes initial sync on fresh accounts/rooms (regression bisected to #125302). A fix PR ([#123931](https://github.com/openclaw/openclaw/pull/123931)) is already in review.

Most-liked requests: dynamic model discovery ([#10687](https://github.com/openclaw/openclaw/issues/10687), 3 👍), multi-slot memory architecture ([#60572](https://github.com/openclaw/openclaw/issues/60572), 3 👍), and memory index "metadata missing" race ([#90361](https://github.com/openclaw/openclaw/issues/90361), 3 👍).

**Analysis:** The dominant underlying needs are (a) a reliable core agent loop that completes tasks without silent truncation, (b) transparent, non-destructive state migrations, and (c) extensible session/memory seams for advanced users and multi-agent setups.

## 5. Bugs & Stability

Ranked by severity/impact (fix-PR status noted):

**Critical / data-loss or crash-loop (P1, diamond lobster):**
- [#62505](https://github.com/openclaw/openclaw/issues/62505) — Coding Agent regression: completes nothing since 2026.4.2. **No fix PR.**
- [#112423](https://github.com/openclaw/openclaw/issues/112423) — SQLite transcript cleanup blocks gateway event loop. **No fix PR.**
- [#40001](https://github.com/openclaw/openclaw/issues/40001) — `write` tool lacks append mode; isolated cron sessions silently overwrite shared files (data loss). **No fix PR; needs product decision.**
- [#94939](https://github.com/openclaw/openclaw/issues/94939) — 6.x migration leaves per-channel conversation-store SQLite at 0 bytes, breaking Bot Framework/MS Teams proactive sends (data loss). **Linked PR open.**
- [#83959](https://github.com/openclaw/openclaw/issues/83959) — Codex app-server startup retries exhaust before replacement server is ready (crash loop). **Linked PR open.**
- [#91144](https://github.com/openclaw/openclaw/issues/91144) — Windows native CLI gateway Scheduled Task doesn't stay running. **Linked PR open.**
- [#90098](https://github.com/openclaw/openclaw/issues/90098) — Large Control-UI attachments overflow browser/gateway stack. **Linked PR open.**
- [#117609](https://github.com/openclaw/openclaw/issues/117609) — Transient LLM/socket errors kill whole embedded-assistant turns (no retry). **Linked PR open.**
- [#126015](https://github.com/openclaw/openclaw/issues/126015) — Heap OOM on large base64 attachments. **Fixed by** [#126017](https://github.com/openclaw/openclaw/pull/126017) **(in review).**

**High (P1):**
- [#111498](https://github.com/openclaw/openclaw/issues/111498) — Legacy workspace-state migration blocks all Anthropic turns. **Fix PR** [#126059](https://github.com/openclaw/openclaw/pull/126059) **in review.**
- [#125679](https://github.com/openclaw/openclaw/issues/125679) — Matrix sync loop on fresh accounts (regression). **Fix PR** [#123931](https://github.com/openclaw/openclaw/pull/123931) **in review.**
- [#124788](https://github.com/openclaw/openclaw/issues/124788) — 2026.8.1-beta.2: event loop blocks ~100s every ~10.9 min (anchored timer + string/fs work). **Needs info/repro.**
- [#84516](https://github.com/openclaw/openclaw/issues/84516) — Codex replies silently truncated at ~1000–1100 chars (`stop=null`, `aborted=false`). **No fix PR.**
- [#38327](https://github.com/openclaw/openclaw/issues/38327) — Google Vertex "Cannot convert undefined or null to object". **Needs live repro.**

**Medium (P2, reliability/message-loss):**
- [#88657](https://github.com/openclaw/openclaw/issues/88657) — DeepSeek V4 Flash incomplete turns (`payloads=0`) in 2026.5.27/28.
- [#90378](https://github.com/openclaw/openclaw/issues/90378) — Cron store silently migrated JSON→SQLite; new jobs default to `delivery.mode=announce` causing channel errors.
- [#92186](https://github.com/openclaw/openclaw/issues/92186) — Foreground reply fence cancels delivery of completed replies to earlier concurrent WhatsApp messages.

**Regression trend:** A disproportionate share of today's bug reports are labeled "Regression (worked before, now fails)" — including #62505, #38327, #111498, #125679, #77733 (persona greeting on `/new`), #91941 (Feishu streaming latency), and #81484 (Discord guild malformed sends). This suggests the 2026.5→2026.8 state/runtime rework is the main source of instability.

## 6. Feature Requests & Roadmap Signals

**Strongest signals (most engagement/likes or repeated asks):**
- **Agent-triggered context compaction** — [#6757](https://github.com/openclaw/openclaw/issues/6757) (Feb, P1 diamond, 2 👍): a self-compact tool so agents manage own context. Likely gated on product decision.
- **Fully dynamic model discovery** — [#10687](https://github.com/openclaw/openclaw/issues/10687) (3 👍): static generated model catalogs can't keep up with OpenRouter; needs live catalog fetching.
- **SQLite transcript/session seams** — [#79902](https://github.com/openclaw/openclaw/issues/79902): canonical state for companion apps; pairs with the database-first runtime direction.
- **Multi-slot memory architecture** — [#60572](https://github.com/openclaw/openclaw/issues/60572) (3 👍): multiple memory providers per layer; currently one slot per plugin.
- **Subagent completion isolation** — [#96975](https://github.com/openclaw/openclaw/issues/96975): return only status + child session link to the parent context.
- **Memory index by source directory, not agent** — [#95724](https://github.com/openclaw/openclaw/issues/95724): eliminates duplicate vector stores for same-workspace agents.
- **Per-agent TTS/STT overrides** — [#66252](https://github.com/openclaw/openclaw/issues/66252) and **self-hosted voice in webchat** — [#45508](https://github.com/openclaw/openclaw/issues/45508).

**Predictions for next versions:**
- UI quality items are already landing (collapsible rosters, stable Plugins hub), so the Control-UI ergonomics backlog (#75947) is actively being consumed.
- Codex lifecycle fixes (reasoning effort #125707, trajectory facts #126050, retry/startup robustness #83959/#117609) appear slated for the near-term patch release.
- The install-policy acknowledgement feature (#116489/#120900) just landed — expect documentation and extension around `security.installPolicy` in the next release notes.
- Session/memory architecture features (#6757, #79902, #60572, #95724) all carry `needs-product-decision`; they are the most likely "next major" roadmap items but are blocked on maintainer direction.

## 7. User Feedback Summary

**Pain points voiced most frequently:**
- **Silent message loss / truncation:** Codex replies cut mid-sentence ([#84516](https://github.com/openclaw/openclaw/issues/84516)), DeepSeek incomplete turns ([#88657](https://github.com/openclaw/openclaw/issues/88657)), WhatsApp replies never delivered ([#92186](https://github.com/openclaw/openclaw/issues/92186)), Discord malformed outbound payloads ([#81484](https://github.com/openclaw/openclaw/issues/81484)).
- **Data loss:** `write` tool overwrites shared cron files ([#40001](https://github.com/openclaw/openclaw/issues/40001)); 6.x migration orphans conversation-store SQLite ([#94939](https://github.com/openclaw/openclaw/issues/94939)).
- **Regression fatigue:** multiple "worked in 2026.4.x/5.x, now broken" reports — coding agent stalls ([#62505](https://github.com/openclaw/openclaw/issues/62505)), Vertex crash ([#38327](https://github.com/openclaw/openclaw/issues/38327)), Matrix sync loop ([#125679](https://github.com/openclaw/openclaw/issues/125679)), persona greeting loss ([#77733](https://github.com/openclaw/openclaw/issues/77733)), Feishu latency ([#91941](https://github.com/openclaw/openclaw/issues/91941)).
- **Migration opacity:** silent cron-store migration ([#90378](https://github.com/openclaw/openclaw/issues/90378)), legacy workspace-state blocking agents ([#111498](https://github.com/openclaw/openclaw/issues/111498)).
- **Performance/event-loop stalls:** [#112423](https://github.com/openclaw/openclaw/issues/112423) and beta.2's 100s blocks ([#124788](https://github.com/openclaw/openclaw/issues/124788)).
- **Prompt-cache destruction:** active-memory injection drops cache hit rate 99.9% → 22% ([#91223](https://github.com/openclaw/openclaw/issues/91223)) — a cost concern for production users.
- **Docs/config mismatches:** bundled channels reject documented `responsePrefix` ([#118148](https://github.com/openclaw/openclaw/pull/118148)) and IRC rejects documented `healthMonitor` override ([#117302](https://github.com/openclaw/openclaw/pull/117302)) — users are hitting validation that contradicts docs.

**Satisfaction signals:** Users are actively contributing polish PRs (UI improvements with screenshots), filing well-structured repros, and requesting "companion-friendly" APIs — a sign of a engaged power-user community despite the stability friction.

## 8. Backlog Watch

Long-running, high-severity items still needing maintainer attention:

- [#6757](https://github.com/openclaw/openclaw/issues/6757) (Feb, P1 diamond, `needs-product-decision`) — Agent-triggered context compaction; open 6+ months.
- [#38327](https://github.com/openclaw/openclaw/issues/38327) (Mar, P1, `needs-live-repro`) — Google Vertex crash; unresolved since 2026.3.2.
- [#40001](https://github.com/openclaw/openclaw/issues/40001) (Mar, P1 diamond, `needs-product-decision`) — `write` append mode / silent data loss.
- [#62505](https://github.com/openclaw/openclaw/issues/62505) (Apr, P1 diamond, `no-new-fix-pr`) — Coding agent regression; one of the most impactful open bugs.
- [#60612](https://github.com/openclaw/openclaw/issues/60612) (Apr, P2, `recovery-stuck`) — Doctor warns about NVM node but regenerates the plist with the NVM path, so the warning can't be fixed.
- [#112423](https://github.com/openclaw/openclaw/issues/112423) (Jul, P1 diamond, `recovery-stuck`) — Event-loop blocking transcript cleanup; no fix PR yet.
- [#124788](https://github.com/openclaw/openclaw/issues/124788) (Aug 16, P1) — beta.2 recurring event-loop block; waiting on info/repro.

**PRs waiting on author** (could stall if not picked up): [#126030](https://github.com/openclaw/openclaw/pull/126030) (canvas widget presenter), [#123848](https://github.com/openclaw/openclaw/pull/123848) (Beam SSRF), [#123535](https://github.com/openclaw/openclaw/pull/123535) (catalog refresh storms), [#123356](https://github.com/openclaw/openclaw/pull/123356) (slash-command staging), [#110652](https://github.com/openclaw/openclaw/pull/110652) (MCP stdio), [#110455](https://github.com/openclaw/openclaw/pull/110455) (ACP ordering), [#126027](https://github.com/openclaw/openclaw/pull/126027) (audit explanations).

**Process health note:** A large fraction of the top issues carry `clawsweeper:recovery-stuck` plus `needs-maintainer-review`/`needs-product-decision`, indicating the automated ClawSweeper triage/fix pipeline is producing repros and attempts but the human review queue is the bottleneck. Clearing the `needs-product-decision` items (#40001, #6757, #79902, #96975) would unblock the highest-value roadmap features.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Open-Source Ecosystem
**Data window:** 2026-08-18 → 2026-08-19 | **Projects surveyed:** 12 (2 inactive)

---

## 1. Ecosystem Overview

The open-source personal AI assistant landscape is marked by high-velocity development colliding with reliability debt. The dominant theme: every project that shipped a significant 2026.5→2026.8 state/runtime rework is absorbing regression reports — silent task stoppage, session-state migration breakage, and provider-compat failures appear across OpenClaw, CoPaw, IronClaw, NanoClaw, and Hermes. The ecosystem is converging on a shared architectural agenda: durable session/memory state, explicit and recoverable agent-loop execution, provider-agnostic model access, and richer WebUI/TUI/desktop control surfaces. Community health is strong (heavy PR contribution, well-structured bug reports, RFC-driven governance), but maintainer review bandwidth is the binding constraint in nearly every project, with automated triage and stale-bot labeling outpacing human decisions.

---

## 2. Activity Comparison

| Project | Issues updated | PRs updated | Release status | Health score |
|---|---|---|---|---|
| **OpenClaw** | 500 | 500 (166 merged/closed) | None; 2026.8.1-beta.2 line | **3.0/5 — Moderate.** Massive throughput but high regression load; ClawSweeper triage outpacing maintainer reviews; several P1 "diamond lobster" bugs without fix PRs |
| **Hermes Agent** | 50 (10 closed) | 50 (5 merged/closed) | **v0.20.4** (v2026.8.18) | **4.0/5 — Good.** Patch release rolled up ~74 PRs; responsive desktop/session fixes; P1 Debian install failure still open |
| **NanoBot** | 9 (3 closed) | 22 (6 closed) | None | **3.5/5 — Good.** Consistent hardening; Windows lifecycle fixes landed; unaddressed subprocess resource-limit risk (#4797) |
| **CoPaw / QwenPaw** | 46 (16 closed) | 50 (19 merged/closed) | None; 2.1.x hardening | **3.0/5 — Moderate.** Pre-release hardening with healthy contributor flow; core reliability defects open (silent stoppage, 10-min freezes) |
| **ZeroClaw** | 50 (18 closed) | 50 (39 merged/closed) | None | **3.5/5 — Good.** Strong merge velocity and RFC momentum; Windows test failures (74) and oversized tool-result bug remain P1 |
| **IronClaw** | 21 (6 closed) | 38 (14 merged/closed) | **v1.3.0-rc.2** | **4.5/5 — Excellent.** Critical rc.1 crash-loop fixed within 24h; libSQL starvation fixed and closed; crowded v1.4.0 roadmap |
| **NanoClaw** | 3 (2 closed) | 37 (19 merged/closed) | None | **3.0/5 — Moderate.** Deep async-DB refactor with breaking changes; Codex WebSocket silent-wait bug open |
| **LobsterAI** | 9 (0 closed) | 20 (17 merged/closed) | **2026.8.18** | **3.0/5 — Moderate.** Strong backlog sweep but all issues still open/stale; April-era crash and custom-model bugs unresolved |
| **PicoClaw** | 6 (1 closed) | 4 (2 closed) | None (v0.3.1) | **3.0/5 — Moderate.** Stable; 5-month-old Anthropic protocol PR finally merged; new Antigravity 429 blocker |
| **Moltis** | 2 (2 closed) | 6 (5 merged/closed) | **20260818.06** | **4.0/5 — Good.** Every bug in window closed with a fix; steady connector/API expansion |
| **NullClaw / ZeptoClaw** | 0 | 0 | None | **N/A — Inactive.** No activity in 24h window |

*Health score = qualitative composite of fix velocity, critical-bug burden, release hygiene, and maintainer responsiveness.*

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Order-of-magnitude community scale:** 500 issues + 500 PRs updated in 24h — 10× the nearest peer (CoPaw, ZeroClaw, Hermes at ~50 each). Every digest references OpenClaw as the reference behavior for cron, sessions, channels, and install-policy.
- **Broadest integration surface:** Matrix/WhatsApp/Feishu/Discord/Telegram plus MCP, ACP, Codex, pluggable model providers. No other project in this set spans this range.
- **Automation at scale:** 166 PRs merged/closed per day, with a ClawSweeper automated triage pipeline — unique operational machinery, though it creates a maintainer-review bottleneck.
- **Security and UI maturity:** install-policy acknowledgement, SSRF protection for Beam mirror uploads, collapsible Control-UI rosters, stable Plugins hub — shipping polish while peers are still stabilizing basics.

**Technical approach differences**
- TypeScript/Node gateway (tsgo typechecking, npm ecosystem) vs. Rust-native peers (IronClaw: libSQL/wasm; ZeroClaw: cargo-audit/wasmtime) and Python-leaning projects (NanoBot: tiktoken, venv; Hermes: uv.lock).
- Database-first runtime direction with SQLite transcripts; actively considers canonical session/memory seams (#79902) that companions and fork projects want.
- Aggressive beta-line velocity (2026.8.x) with a doctored recovery path (`openclaw doctor`) — a level of self-healing tooling peers lack.

**Community size comparison**

| Project | 24h issue+PR volume | Community signal |
|---|---|---|
| OpenClaw | 1,000 | The hub; power-user and plugin-author gravity well |
| CoPaw / ZeroClaw | ~100 each | Strong Chinese-language and RFC-driven segments |
| Hermes | 100 | Desktop-first users, institutional downstream consumers |
| IronClaw | 59 | Enterprise/Champions program testers |
| NanoBot / NanoClaw / LobsterAI | ~25-40 | Focused contributor-led niches |
| PicoClaw / Moltis | ~10 | Small but engaged device/container-focused users |

**Weaknesses:** the same velocity generates regression fatigue ("worked in 2026.4.x, now broken" is the top recurring bug category), silent message-loss issues (#84516, #92186) erode trust, and maintainer review — not triage — is the critical path.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects:

| Focus area | Projects | Specific needs |
|---|---|---|
| **Agent-loop reliability / no silent failure** | OpenClaw, CoPaw, NanoClaw, IronClaw | Coding agent "never completes" (OpenClaw #62505); silent mid-task stoppage requiring manual "继续" (CoPaw #6921); hidden Codex WebSocket idle retry causing 10-min silence (NanoClaw #3338); automation runs "hit-or-miss" on small models (IronClaw #6879). Demand: fail-loud diagnostics, retry visibility, deterministic outcomes |
| **Session/state migration safety** | OpenClaw, Hermes, NanoClaw, IronClaw | Legacy workspace-state blocks turns (OpenClaw #111498); Desktop Bot Mode blank sessions (Hermes #89206); `/update-nanoclaw` stamps success with incomplete rollback (NanoClaw #3194); 1.2.x→1.3.0-rc.1 crash-loop (IronClaw #7720). Demand: non-destructive migrations, dry-run upgrade paths |
| **Memory & context architecture** | OpenClaw, IronClaw, NanoBot | Multi-slot memory (OpenClaw #60572); cross-conversation memory unreliability (IronClaw #7185, closed → Mnesis spike #7731); token-accurate consolidation (NanoBot #5403); idle-compaction semantics (NanoBot #5421). Demand: canonical queryable state, predictable eviction |
| **Provider compatibility & retry behavior** | OpenClaw, NanoBot, PicoClaw, Hermes, LobsterAI, CoPaw | Vertex crash (OpenClaw #38327); Antigravity opaque 429 (PicoClaw #3339); `socks://` proxy support and retry-before-fallback (NanoBot #5425/#5422); ignored custom `base_url` (Hermes #89445); MCP transport config ignored (CoPaw #6470). Demand: dynamic model discovery, live retry semantics |
| **Channel connectivity resilience** | OpenClaw, CoPaw, PicoClaw, ZeroClaw | Matrix infinite sync (OpenClaw #125679); Matrix retry/health-check requests (CoPaw #6684); IRC long-message reassembly (PicoClaw #3287); DingTalk streaming latency (ZeroClaw #8228) |
| **Windows parity** | NanoBot, Hermes, ZeroClaw, LobsterAI | Launcher PID handoff (NanoBot #5417); ACP terminal deadlock (Hermes #89495/#73403); 74 test failures and no Windows CI (ZeroClaw #7462); macOS Intel gaps (LobsterAI #1589) |
| **Security hardening** | NanoBot, ZeroClaw, OpenClaw, NanoClaw | Shell subprocess resource limits (NanoBot #4797); allow/ask/deny command policies (ZeroClaw #7155); SSRF gating (OpenClaw #123848, ZeroClaw #10070); package-name injection CWE-78 (NanoClaw #2538); wasmtime CVE remediation (ZeroClaw #8519) |

---

## 5. Differentiation Analysis

| Project | Target users | Architecture | Feature center of gravity |
|---|---|---|---|
| **OpenClaw** | Power users, self-hosters, plugin ecosystem | TypeScript/Node gateway, SQLite, Control-UI | Breadth: channels × providers × plugins; automation triage; "core reference" patterns |
| **Hermes Agent** | Desktop-first individuals, downstream container/hosted deployments | Python backend + desktop shell (uv, npm) | Bot Mode desktop UX, OAuth broker (Codex), multi-machine connection pool |
| **IronClaw** | Enterprises, team "Champions" | Rust, libSQL, wasm, resource governor | Deterministic automation outcomes, omp 6-tool coding contract, design-system program, v1.4 memory (Mnesis) + sandboxing |
| **ZeroClaw** | Self-hosters, IRC/DingTalk operators, security-conscious | Rust, wasmtime, cargo-audit | RFC governance, HMAC tool-execution receipts, goal mode, command policies, NAT traversal |
| **CoPaw / QwenPaw** | Chinese-language users, Alibaba cloud models | Python-leaning (agentscope), console UI | Multi-agent console, GLM/Volcengine/MCP integrations, channel reliability |
| **NanoBot** | Lightweight self-hosters, Windows users | Python, TUI + WebUI | Windows lifecycle, provider fallbacks, memory consolidation, cross-session messaging |
| **NanoClaw** | Rapid-iteration fork adopters | Async DB refactor toward portable backends | Update-path safety, Codex WebSocket integration, Dial channel (SMS/voice) |
| **LobsterAI** | Chinese desktop users wanting a managed client | Electron wrapper around OpenClaw gateway | Local-model workflows, DeepSeek Harness, scheduled-task UX, MCP quick-add |
| **PicoClaw** | Low-resource device users (Raspberry Pi), IRC/LINE | Lightweight TUI gateway | Protocol completeness (Anthropic native, IRCv3), webUI demand |
| **Moltis** | Containerized/automation engineers | Sandbox-first (Podman), connector snapshot store | Files library, settings browser, Tesla connector, Responses API routing |

**Key architectural divides:** Rust-native vs. TypeScript/Node vs. Python; single-gateway breadth (OpenClaw/ZeoClaw/CoPaw) vs. desktop-client focus (Hermes/LobsterAI) vs. sandbox/container isolation (Moltis); and RFC-driven governance (ZeroClaw) vs. automation-driven triage (OpenClaw) vs. maintainer-driven hardening (IronClaw, NanoBot).

---

## 6. Community Momentum & Maturity

**Tier 1 — Very high activity, rapid iteration (pre-release/beta):**
- **OpenClaw** (1,000 items/day) — the velocity reference, but beta-line instability is its defining trait this cycle.
- **CoPaw** (~100 items/day) — pre-2.1.x hardening; high engagement from Chinese-language contributors, including first-time security/MCP PRs.
- **ZeroClaw** (~100 items/day) — 39 PRs merged/closed; accepted RFCs advancing (goal mode, command policies), but per-item maintainer latency is visible.
- **Hermes Agent** (~100 items/day) — shipping patch releases while absorbing feature PRs (avatars, connection pools, Bot Mode).

**Tier 2 — High, steady delivery (stabilizing):**
- **IronClaw** — release-candidate discipline; critical fixes within 24h; enormous v1.4.0 epic surface already in review.
- **NanoClaw** — deep refactor mode; breaking-change PRs landing daily, but hidden-failure bug (#3338) shows the cost.
- **NanoBot** — hardening phase with consistent Windows/TUI fixes; slow burn on open security items.
- **LobsterAI** — release day; April-era PR backlog swept, but issue triage is the weak spot.

**Tier 3 — Moderate, healthy:**
- **PicoClaw** — stable, backlog maintenance, long-lived feature finally merged.
- **Moltis** — small but clean execution: every bug closed with a fix in-window.

**Tier 4 — Inactive:** NullClaw, ZeptoClaw (no activity).

---

## 7. Trend Signals

1. **Agent-loop reliability is now the #1 purchase criterion.** Silent stoppage/truncation reports (OpenClaw #62505/#84516, CoPaw #6921/#7102, NanoClaw #3338, IronClaw #6879) span every architecture. Developers should treat *observability and fail-loud retries* as table stakes, not features.

2. **State migration is a recurring trust-killer.** Every significant rework (OpenClaw 6.x, IronClaw rc.1, NanoClaw async DB, ZeroClaw cron-store) broke upgrades. Value: migration dry-runs, rollback coverage, and advisory tooling (`doctor`) — the projects that ship these (IronClaw rc.2, OpenClaw doctor) recover faster.

3. **Memory is the next competitive frontier.** Cross-conversation recall (IronClaw #7185/#7731), multi-slot architectures (OpenClaw #60572), token-accurate consolidation (NanoBot #5403), and SQLite/session seams (OpenClaw #79902) all point to memory as the differentiator after basic reliability is solved.

4. **Provider-compat friction is shifting from access to correctness.** Dynamic model discovery, OAuth refresh-token rotation, proxy/transport variants, and retry-before-fallback are the concrete asks. The proxy/MCP/gateway layer is becoming the product.

5. **Security is moving from optional to structural.** Subprocess resource limits, allow/ask/deny shell policies, SSRF gating on file/tool endpoints, HMAC tool-execution receipts, and CVE remediation are appearing across Rust, Node, and Python ecosystems simultaneously. Expect security posture to become a documented selection criterion.

6. **Windows parity is the most underserved platform.** CI gaps (ZeroClaw), PID/lifecycle bugs (NanoBot), ACP deadlocks (Hermes), console encoding failures — consistently 10-20% of open severity across projects. A Windows CI matrix is an underrated competitive advantage.

7. **Attended vs. unattended execution is the real product divide.** Cron, scheduled tasks, goal mode (ZeroClaw #8303), evidence-backed automation outcomes (IronClaw #7650), and no-reply semantics (ZeroClaw #8410) show the market moving from chat companions to autonomous workers — with attendant requirements for run history, budget accounting, and cancellation semantics.

**Bottom line for developers:** build for silent-failure visibility, migration-safe state, exact cost/usage accounting, and cross-platform CI. The projects winning user trust this cycle (IronClaw, Moltis, NanoBot) are those closing bugs within 24-48 hours and shipping migration-safe releases — not those with the largest feature surface.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview

NanoBot showed high-velocity development in the last 24 hours: **9 issues were updated** (6 open/active, 3 closed) and **22 PRs were updated** (16 open, 6 closed). No new release was published. Activity focused heavily on Windows gateway/TUI lifecycle fixes, AgentLoop background-task lifecycle bugs, provider compatibility, and memory/consolidation correctness. The project is clearly in a stable maintenance-and-hardening phase, though several older high-impact issues remain open.

---

## 2. Releases

**None.** No new NanoBot releases were published as of 2026-08-19.

---

## 3. Project Progress

**Closed PRs today:**

- **fix(gateway): allow Windows launcher PID handoff** — [#5418](https://github.com/HKUDS/nanobot/pull/5418)  
  Addresses the Windows virtualenv launcher PID handoff problem, preserving background/on-demand gateway behavior. Likely resolves the related Windows WebUI exit bug [#5417](https://github.com/HKUDS/nanobot/issues/5417).

- **perf(tui): reduce cold-start and exit latency** — [#5424](https://github.com/HKUDS/nanobot/pull/5424)  
  Starts the TUI before waiting for gateway orchestration and defers classic-agent imports for faster first frame.

- **fix(tui): keep composer visible and focused** — [#5427](https://github.com/HKUDS/nanobot/pull/5427)  
  Restores text-input focus to the composer and improves visual distinction.

- **fix(tui): refresh expired API credentials** — [#5432](https://github.com/HKUDS/nanobot/pull/5432)  
  Refreshes TUI credentials after HTTP 401 and deduplicates concurrent refreshes.

- **feat(webui): add lightweight cross-session messaging** — [#5358](https://github.com/HKUDS/nanobot/pull/5358)  
  Adds server-owned `@handle`s, cross-session messaging, and rolling rate control.

- **test(exec): wait deterministically for truncation output** — [#5433](https://github.com/HKUDS/nanobot/pull/5433)  
  Fixes flaky output-limit alias testing on Windows.

---

## 4. Community Hot Topics

- **#5149 [OPEN] [bug] no audio ?** — [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149)  
  The most active issue with **6 comments**. Users report NanoBot receives WhatsApp audio but cannot send audio files; logs point to neonize/ffmpeg warnings. This is a functional channel regression that needs maintainer attention and likely a fix PR.

- **#4797 [OPEN] Bug: No resource limits on shell subprocesses** — [Issue #4797](https://github.com/HKUDS/nanobot/issues/4797)  
  Highlights a security/stability concern: `ExecTool._spawn()` applies no ulimit/cgroup/CPU/memory caps, so an LLM could run fork bombs or runaway commands. Only timeout protection exists. This is a serious but under-discussed issue with only **1 comment**.

- **#5421 [OPEN] Question: idle compaction and concurrent provider state** — [Issue #5421](https://github.com/HKUDS/nanobot/issues/5421)  
  A design question about whether idle compaction should preserve provider state created by a concurrent turn. Not a bug, but indicates deeper memory/consolidation semantics are being actively examined.

---

## 5. Bugs & Stability

Ranked by estimated severity:

| Severity | Issue / PR | Description | Status |
|---|---|---|---|
| **High** | [#4797](https://github.com/HKUDS/nanobot/issues/4797) | Shell subprocesses have no OS-level resource limits; possible resource exhaustion from LLM-driven commands. | Open; no fix PR yet |
| **High** | [#5429](https://github.com/HKUDS/nanobot/issues/5429) | `AgentLoop.schedule_background()` swallows background-task exceptions because the done callback never retrieves the task result. | Open; fix PR [#5431](https://github.com/HKUDS/nanobot/pull/5431) proposed |
| **Medium-High** | [#5428](https://github.com/HKUDS/nanobot/issues/5428) | `AgentLoop` retains empty active-task groups after session tasks finish, causing a memory leak over long-running loops. | Open; fix PR [#5430](https://github.com/HKUDS/nanobot/pull/5430) proposed |
| **Medium** | [#5149](https://github.com/HKUDS/nanobot/issues/5149) | WhatsApp audio sending fails while receiving works; likely ffmpeg/neonize pipeline issue. | Open; no fix PR yet |
| **Medium** | [#5425](https://github.com/HKUDS/nanobot/issues/5425) | `socks://` proxy URLs are not recognized for custom OpenAI-compatible providers, causing requests to fail before reaching the provider. | Open; fix PR [#5426](https://github.com/HKUDS/nanobot/pull/5426) proposed |
| **Resolved** | [#5417](https://github.com/HKUDS/nanobot/issues/5417) | Windows WebUI exits when the gateway rejects its own virtualenv PID handoff. | Closed; addressed by [#5418](https://github.com/HKUDS/nanobot/pull/5418) / [#5415](https://github.com/HKUDS/nanobot/pull/5415) |

---

## 6. Feature Requests & Roadmap Signals

Signals for upcoming work:

- **Provider compatibility and retry behavior**  
  [#5426](https://github.com/HKUDS/nanobot/pull/5426) adds legacy `socks://` support; [#5422](https://github.com/HKUDS/nanobot/pull/5422) makes providers retry before falling back. These improve custom-provider reliability.

- **Memory and consolidation improvements**  
  [#5403](https://github.com/HKUDS/nanobot/pull/5403) uses API-reported prompt tokens instead of tiktoken estimates to trigger consolidation; [#5379](https://github.com/HKUDS/nanobot/pull/5379) preserves full consolidation input. These are strong candidates for the next release.

- **New providers and integrations**  
  [#5419](https://github.com/HKUDS/nanobot/pull/5419) adds a native DashScope image-generation client; [#5234](https://github.com/HKUDS/nanobot/pull/5234) integrates `mst-python` as a metasearch provider.

- **WebUI/TUI productivity features**  
  [#5420](https://github.com/HKUDS/nanobot/pull/5420) adds turn observability and safe recovery; [#5358](https://github.com/HKUDS/nanobot/pull/5358) adds cross-session messaging; [#5424](https://github.com/HKUDS/nanobot/pull/5424) improves TUI cold-start latency.

- **Community demand signals**  
  [#5372](https://github.com/HKUDS/nanobot/issues/5372) (persistent memory integration via ViBo) and [#5409](https://github.com/HKUDS/nanobot/issues/5409) (hybrid spend firewall) were both closed, but they reflect real user interest in long-term memory and LLM-cost controls.

---

## 7. User Feedback Summary

- **WhatsApp audio delivery is broken for at least one user**: receiving works, sending does not — [#5149](https://github.com/HKUDS/nanobot/issues/5149). This is a concrete channel-functionality complaint.
- **Resource-safety concerns are being raised**: the lack of subprocess limits is viewed as a real risk for self-hosted agents — [#4797](https://github.com/HKUDS/nanobot/issues/4797).
- **Background task failures are currently invisible**: a contributor identified that exceptions from `schedule_background()` are silently discarded, which would make production debugging difficult — [#5429](https://github.com/HKUDS/nanobot/issues/5429).
- **Windows users are seeing lifecycle issues** around TUI/WebUI startup and gateway PID handoff — [#5417](https://github.com/HKUDS/nanobot/issues/5417), with multiple Windows-focused fixes landing today.
- **Custom provider users need better proxy and fallback behavior**: `socks://` URLs and retry ordering are practical blockers for custom OpenAI-compatible endpoints — [#5425](https://github.com/HKUDS/nanobot/issues/5425), [#5422](https://github.com/HKUDS/nanobot/pull/5422).

---

## 8. Backlog Watch

Issues/PRs that appear stuck or need maintainer attention:

- **#5149 [bug] no audio ?** — [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149)  
  Open since 2026-07-28, with 6 comments. A functional WhatsApp bug with no linked fix PR.

- **#4797 Resource limits on shell subprocesses** — [Issue #4797](https://github.com/HKUDS/nanobot/issues/4797)  
  Open since 2026-07-06. Despite high severity, only 1 comment and no fix PR.

- **#5234 feat: integrate mst-python as metasearch provider** — [PR #5234](https://github.com/HKUDS/nanobot/pull/5234)  
  Open since 2026-08-03, labeled `p1` and `conflict`. Needs rebase/conflict resolution.

- **#5341 fix(skills): make weather workflow Windows-safe** — [PR #5341](https://github.com/HKUDS/nanobot/pull/5341)  
  Open since 2026-08-11, labeled `conflict`. Needs maintainer review/merge.

- **#5403 fix(memory): use API-reported prompt tokens** — [PR #5403](https://github.com/HKUDS/nanobot/pull/5403)  
  Open since 2026-08-16 and labeled `p1`. Directly addresses an important token-consolidation bug.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-19

**Data window:** 2026-08-18 → 2026-08-19  
**Source:** GitHub issues/PRs for NousResearch/hermes-agent

---

## 1. Today's Overview

Project activity is high: 50 issues and 50 PRs were updated in the last 24 hours, with 10 issues closed and 5 PRs merged/closed. Maintainers shipped **Hermes Agent v0.20.4 (v2026.8.18)**, a patch release rolling up ~74 merged PRs since v0.20.3. Attention remains concentrated on desktop Bot Mode session state, installation reliability, provider/plugin compatibility, and a newly reported TUI regression. Several targeted fix PRs landed today, especially in the desktop and session-state areas, indicating a responsive maintenance cycle.

---

## 2. Releases

### Hermes Agent v0.20.4 (v2026.8.18)

- **Release tag:** `v2026.8.18`
- **Release type:** Patch release
- **Release date:** August 18, 2026
- **Scope:** Rolls up **~74 PRs merged since v0.20.3** into a stable tagged release for downstream consumers: Docker images, hosted deployments, and fresh installs.
- **Breaking changes / migration notes:** None are called out in the provided release excerpt; this is presented as a stabilization/patch release.

---

## 3. Project Progress

**PR activity:** 50 PRs updated, of which 5 were merged/closed. The top-20 sample shows **3 closed/merged PRs**:

- [PR #89386](https://github.com/NousResearch/hermes-agent/pull/89386) — **Bot Mode avatars:** deterministic blob-face avatars from bot name, with randomize/lock/silhouette controls.
- [PR #89510](https://github.com/NousResearch/hermes-agent/pull/89510) — **Bot Mode wake performance:** paint-first hydration + durable transcript cache, addressing the #89206 class of blank-session problems.
- [PR #89530](https://github.com/NousResearch/hermes-agent/pull/89530) — **OpenAI Codex OAuth broker:** Hermes remains the sole owner of the Codex OAuth session and upstream bearer; local clients get Responses API results only.

**Issue closures:** 10 issues closed, including notable resolutions/duplicates:

- [#89206](https://github.com/NousResearch/hermes-agent/issues/89206) — Desktop Bot Mode non-primary chats blank / unreachable (closed; fix addressed by [PR #89510](https://github.com/NousResearch/hermes-agent/pull/89510)).
- [#88880](https://github.com/NousResearch/hermes-agent/issues/88880) — Desktop v2 remote Bot sessions absent from sidebar (closed).
- [#89495](https://github.com/NousResearch/hermes-agent/issues/89495) — Windows ACP terminal probe deadlock (closed as duplicate).
- [#88615](https://github.com/NousResearch/hermes-agent/issues/88615) — CommandCode provider shows 0 models (closed as duplicate).
- [#80821](https://github.com/NousResearch/hermes-agent/issues/80821) — LaTeX/MathJax rendering request (closed).

---

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) — **Debian 13.6 installation broken**; `uv.lock` and `npm install` fail inside the install script. **13 comments.** This is the highest-signal issue right now and is labeled P1.
- [#88275](https://github.com/NousResearch/hermes-agent/issues/88275) — **Desktop renderer burns 40–70% CPU at idle** on macOS Intel; thermal throttling. **8 comments.**
- [#80821](https://github.com/NousResearch/hermes-agent/issues/80821) — **LaTeX/MathJax rendering support** in desktop chat UI. **7 comments.**
- [#89206](https://github.com/NousResearch/hermes-agent/issues/89206) — **Desktop Bot Mode: non-primary chats remain blank**; 2 👍. **6 comments.**
- [#54354](https://github.com/NousResearch/hermes-agent/issues/54354) — **Docker backend runs first tool call on host** before image pull; 1 👍. **4 comments.**
- [#69255](https://github.com/NousResearch/hermes-agent/issues/69255) — **`provider_model_ids` swallows TypeError** when plugin `fetch_models` omits `base_url`. **4 comments.**

**Underlying needs:** Users are signaling three broad themes — installers must work reliably across Linux distributions; desktop Bot Mode and remote/Cloud session identity need to be stable; and third-party model/provider plugins need better error surfacing and API compatibility rather than silent failures.

---

## 5. Bugs & Stability

Ranked by severity, with fix PRs noted where available.

| Severity | Issue | Bug Summary | Fix Status |
|---|---|---|---|
| **P1** | [#87093](https://github.com/NousResearch/hermes-agent/issues/87093) | Debian 13.6 install broken; `uv.lock` & `npm install` fail | No fix PR identified |
| **P2** | [#88964](https://github.com/NousResearch/hermes-agent/issues/88964) | TUI arrow keys print raw escape sequences (`[1;129D` etc.) since v0.20.3 — regression | No fix PR identified |
| **P2** | [#89131](https://github.com/NousResearch/hermes-agent/issues/89131) | Bot Mode drops per-profile Cloud alias; starts inert local backend | No fix PR identified |
| **P2** | [#89477](https://github.com/NousResearch/hermes-agent/issues/89477) | Gateway crashes/fails to poll Telegram for named profiles with separate bots | No fix PR identified |
| **P2** | [#88955](https://github.com/NousResearch/hermes-agent/issues/88955) | Interrupted Bot Mode turns persist hidden empty assistant messages, causing permanent sanitizer re-heal loop | Fix: [PR #89525](https://github.com/NousResearch/hermes-agent/pull/89525) |
| **P2** | [#89309](https://github.com/NousResearch/hermes-agent/issues/89309) | `hermes setup` Full toolset picker silently discards selections | No fix PR identified |
| **P2** | [#89206](https://github.com/NousResearch/hermes-agent/issues/89206) | Desktop Bot Mode: non-primary chats blank/messages unreachable | Fix: [PR #89510](https://github.com/NousResearch/hermes-agent/pull/89510) |
| **P2** | [#89495](https://github.com/NousResearch/hermes-agent/issues/89495) | Windows ACP terminal env probe deadlocks; tool timeouts at 420s | Duplicate; fix in [PR #69083](https://github.com/NousResearch/hermes-agent/pull/69083) |
| **P2** | [#54354](https://github.com/NousResearch/hermes-agent/issues/54354) | Docker backend: first tool call runs on host before image is pulled | No fix PR identified |
| **P2** | [#59030](https://github.com/NousResearch/hermes-agent/issues/59030) | `no_agent` cron jobs deliver with stale `os.environ` credentials | No fix PR identified |
| **P2** | [#73403](https://github.com/NousResearch/hermes-agent/issues/73403) | Windows ACP adapter hangs when executing terminal tool | Fix: [PR #69083](https://github.com/NousResearch/hermes-agent/pull/69083) |
| **P3** | [#88275](https://github.com/NousResearch/hermes-agent/issues/88275) | Desktop renderer burns 40–70% CPU at idle on macOS Intel | No fix PR identified |
| **P3** | [#89445](https://github.com/NousResearch/hermes-agent/issues/89445) | Auxiliary task `base_url` to custom OpenAI-compatible endpoint silently ignored | No fix PR identified |
| **P3** | [#85672](https://github.com/NousResearch/hermes-agent/issues/85672) | Desktop Kanban attachment download resolves to wrong remote path | No fix PR identified |

Also notable: [#89536](https://github.com/NousResearch/hermes-agent/pull/89536) fixes unbounded `gateway.error.log` growth (observed at **141 MB** of repeated tracebacks), and [#89538](https://github.com/NousResearch/hermes-agent/pull/89538) fixes `/goal`, `/loop`, `/heartbeat` false-acking on a cold SessionDB cache.

---

## 6. Feature Requests & Roadmap Signals

Active/open feature signals:

- [#84580](https://github.com/NousResearch/hermes-agent/issues/84580) — **WhatsApp inbound message hook** with sender and message IDs for idempotent CRM integration. Open, P3, needs decision.
- [#88680](https://github.com/NousResearch/hermes-agent/issues/88680) — **Preserve connection × profile route identity end-to-end** in Desktop. Open, P3.
- [#89513](https://github.com/NousResearch/hermes-agent/issues/89513) — **Desktop Models pane missing cron config** (`cron.model`, drift guard, fleet model). Open, P3.
- [#84951](https://github.com/NousResearch/hermes-agent/issues/84951) — **Native markdown rendering** for agent-delivered `.md` documents. Closed.
- [#80821](https://github.com/NousResearch/hermes-agent/issues/80821) — **LaTeX/MathJax rendering** in chat UI. Closed.

Feature-rich PRs currently open or recently merged:

- [PR #89478](https://github.com/NousResearch/hermes-agent/pull/89478) — **Multi-machine connection pool** for TUI/Desktop via Tailscale.
- [PR #89522](https://github.com/NousResearch/hermes-agent/pull/89522) — **Collapsible group activity view** in Bot Mode.
- [PR #89523](https://github.com/NousResearch/hermes-agent/pull/89523) — **Surface profile conversations in Bots** pane.
- [PR #89535](https://github.com/NousResearch/hermes-agent/pull/89535) — **Move a session back to Home** from session row menu.
- [PR #89386](https://github.com/NousResearch/hermes-agent/pull/89386) — **Deterministic Bot Mode avatars** (merged).
- [PR #89530](https://github.com/NousResearch/hermes-agent/pull/89530) — **OpenAI Codex OAuth broker** (merged).

**Prediction for next version:** The multi-machine connection pool ([#89478](https://github.com/NousResearch/hermes-agent/pull/89478)) and Desktop session-management improvements ([#89535](https://github.com/NousResearch/hermes-agent/pull/89535), [#89523](https://github.com/NousResearch/hermes-agent/pull/89523), [#89522](https://github.com/NousResearch/hermes-agent/pull/89522)) are strong candidates for the next minor release. Desktop cron config visibility ([#89513](https://github.com/NousResearch/hermes-agent/issues/89513)) and connection/route identity ([#88680](https://github.com/NousResearch/hermes-agent/issues/88680)) are likely follow-up roadmap items.

---

## 7. User Feedback Summary

Real user pain points surfaced in this window:

- **Installation reliability:** Debian users are blocked by a P1 install-script failure; this is likely hurting adoption on Linux.
- **Desktop Bot Mode / Cloud routing:** Users with mixed local/Cloud setups report blank chats, missing sessions, and lost profile/Cloud aliases. The positive response to [PR #89510](https://github.com/NousResearch/hermes-agent/pull/89510) suggests users place high value on fast and correct Bot Mode session recovery.
- **TUI regressions:** Arrow keys printing raw escape sequences is a high-visibility regression that immediately degrades the terminal experience.
- **Provider/plugin compatibility:** Silent errors in `provider_model_ids`, ignored `base_url` for auxiliary tasks, and MCP OAuth flows not triggering are frustrating for developers integrating custom providers and MCP servers.
- **Configuration UX:** The Full Setup toolset picker silently discarding selections and missing cron settings in Desktop are direct complaints about configuration discoverability and trust.

Overall, users are actively using Hermes Agent for complex workflows — Docker, Telegram/WhatsApp bots, cron watchdogs, custom providers, remote Desktop connections — and they are sensitive to both stability regressions and configuration surface gaps.

---

## 8. Backlog Watch

Long-running or high-impact items still needing maintainer attention:

- [Issue #21820](https://github.com/NousResearch/hermes-agent/pull/21820) — PR defending `normalize_response` against `content: null` from Anthropic-compatible endpoints. Open since **May 8**, P2.
- [Issue #54354](https://github.com/NousResearch/hermes-agent/issues/54354) — Docker backend first tool call runs on host before image pull; security-boundary risk. Open since **June 28**, P2.
- [Issue #59030](https://github.com/NousResearch/hermes-agent/issues/59030) — `no_agent` cron jobs use stale environment credentials. Open since **July 5**, P2.
- [PR #64866](https://github.com/NousResearch/hermes-agent/pull/64866) — WeCom websocket close/backoff fix. Open since **July 15**, P2.
- [Issue #66118](https://github.com/NousResearch/hermes-agent/issues/66118) — Profile `SOUL.md`/`AGENTS.md` ignored with custom Ollama provider. Open since **July 17**, P2, needs repro.
- [PR #73063](https://github.com/NousResearch/hermes-agent/pull/73063) — Telegram: stop typing before command delivery. Open since **July 28**, P2.
- [Issue #73403](https://github.com/NousResearch/hermes-agent/issues/73403) — Windows ACP adapter hangs on terminal tool; fix PR #69083 exists and needs landing. Open since **July 28**, P2.
- [PR #78020](https://github.com/NousResearch/hermes-agent/pull/78020) — macOS gateway restart should drain active work first. Open since **August 3**, P2.
- [Issue #77178](https://github.com/NousResearch/hermes-agent/issues/77178) — `terminal` subreaper waits forever on `sccache` daemon descendants. Open since **August 3**, P2.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-19

## 1. Today's Overview
Moderate activity over the last 24 hours: 6 issues updated (5 open, 1 closed) and 4 PRs updated (2 open, 2 closed). Notably, the long-running PR #1158 adding native Anthropic Messages API support finally merged, and PR #3317 improved LLM usage observability. The "stale" label on 5 of the 10 touched items indicates active backlog maintenance. No release was published today; the project remains at version 0.3.1. Overall project health appears stable, with maintainers closing out older PRs while fresh bug reports (e.g., Antigravity 429) continue to arrive.

## 2. Releases
No new releases. The last known version remains **0.3.1** (as referenced in issue reports). Accordingly, no release notes, breaking changes, or migration instructions to report.

## 3. Project Progress
Two PRs were closed/merged today, both representing concrete forward progress:

- **[PR #1158 — feat: add anthropic-messages protocol for native Anthropic API format (Fixes #269)](https://github.com/sipeed/picoclaw/pull/1158)** — Merged after a ~5-month lifecycle (created Mar 6). Adds a new `anthropic-messages` protocol prefix targeting the `/v1/messages` endpoint, enabling PicoClaw to work with Anthropic-compatible proxy services that only support the native API format. This resolves a long-standing provider-compatibility gap (#269) and is the most significant feature merge of the day.
- **[PR #3317 — feat(providers): log prompt cache tokens in LLM response debug output](https://github.com/sipeed/picoclaw/pull/3317)** — Closed/merged. Enhances the gateway's "LLM response" debug log to include `prompt_cache_hit_tokens` / `prompt_cache_miss_tokens` (and equivalents) reported by providers like DeepSeek via Cloudflare AI Gateway, improving cost/performance observability.

## 4. Community Hot Topics
The most active discussions, ranked by engagement:

- **[Issue #806 — Add webUI support (enhancement, priority: high, roadmap)](https://github.com/sipeed/picoclaw/issues/806)** — 9 comments, 8 👍. The highest-reaction item in the dataset. Author Zepan (likely a maintainer, given the roadmap tag) proposes a browser-based UI to lower the entry barrier for non-technical users, complementing the TUI. The "(Refactoring now)" note in the title suggests active work is underway. Strong community demand is evident from the 8 upvotes.
- **[Issue #3287 — Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)** — 6 comments. Community members want IRCv3 messages exceeding the 512-byte limit to be treated as a single cohesive message rather than fragmented lines. This reflects real-world usage of PicoClaw as an IRC gateway with modern clients.
- **[Issue #3301 — /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules](https://github.com/sipeed/picoclaw/issues/3301)** — 4 comments. A functional gap in a core workflow (multiple agents assigned via dispatch rules), indicating that the routing feature has adopters.

Underlying need: users are pushing PicoClaw toward broader accessibility (web UI), protocol-completeness (IRC long messages), and correctness in multi-agent routing setups.

## 5. Bugs & Stability
Five bugs were touched in the last 24 hours, ranked by severity:

- **High — [Issue #3339: Antigravity generation returns generic 429 despite valid OAuth scopes and successful model discovery](https://github.com/sipeed/picoclaw/issues/3339)** — New (created Aug 17). Authentication and model discovery succeed against Google Antigravity, but every generation request returns `RESOURCE_EXHAUSTED` (429) with no quota details. This entirely blocks a provider integration. No fix PR yet; needs maintainer investigation into request format or API usage.
- **Medium — [Issue #3301: /clear and session auto-compression broken in dispatch-routed chats](https://github.com/sipeed/picoclaw/issues/3301)** — Core session-management commands silently fail when a chat is routed to a non-default agent. Affects Discord/Telegram on Raspberry Pi (v0.3.1). No fix PR linked; likely a routing-context bug.
- **Medium — [Issue #3328: line.settings.webhook_host / webhook_port are never read](https://github.com/sipeed/picoclaw/issues/3328)** — Config values are declared, defaulted, documented, and env-bound, but nothing consumes them. Users setting LINE webhook host/port get silent no-ops. A fix PR exists: **[PR #3329](https://github.com/sipeed/picoclaw/pull/3329)** (warn on inert settings instead of seeding them) is currently open.
- **Low — [Issue #3292: CPU usage too high when input box focused in chat interface](https://github.com/sipeed/picoclaw/issues/3292)** — **Closed** today. The web (Firefox) UI consumed high CPU while the input box was focused. Closure suggests a fix or workaround was identified.
- **Low — [PR #3314: agent not able to execute shell commands added to customAllowPatterns](https://github.com/sipeed/picoclaw/pull/3314)** — Open. Fixes a bug where default deny patterns always took precedence over `customAllowPatterns` in `guardCommand`, breaking `git push` and similar exec allow-list entries.

## 6. Feature Requests & Roadmap Signals
Three clear signals for upcoming versions:

- **Web UI (#806)** — Tagged `priority: high` and `roadmap`, with title noting "Refactoring now." The refactoring work is likely preparing internal APIs for a future browser interface. This is the strongest candidate for a next-minor-version feature.
- **Native Anthropic Messages protocol (#1158, merged today)** — Now landed and will ship in the next release, enabling compatibility with Anthropic-native-only endpoints. Downstream of this, expect more provider-compatibility issues to close.
- **IRC long-message reassembly (#3287)** — Community-requested for IRCv3. Feasible as a message-stitching layer; given it has 6 comments and touches a mainstream channel, it could be picked up soon.
- **Prompt cache token logging (#3317, merged today)** — Already merged; will appear as an observability improvement in the next release.

## 7. User Feedback Summary
Real user pain points visible across today's data:

- **Configuration silently ignored** (#3328) — Users express frustration that documented settings (LINE `webhook_host`/`webhook_port`) have zero effect with no warning. This erodes trust in the config system; the proposed fix (warn instead of seed) is a good UX direction.
- **Chat-management commands failing in routed setups** (#3301) — Users running multi-agent configurations can't clear sessions or trigger compression in non-default agents, disrupting a core workflow on resource-constrained devices (Raspberry Pi).
- **Provider friction** (#3339) — A user with correct OAuth scopes and successful discovery still cannot generate via Antigravity; the opaque generic 429 ("Resource has been exhausted") leaves them unable to distinguish quota from client bug.
- **Blocked exec commands** (PR #3314) — User expected `customAllowPatterns` to override defaults per the tests, but the command guard rejected `git push`. Tests passed while runtime behavior disagreed — a test-coverage gap.
- **Positive signal** — The 8 👍 on the webUI request (#806) indicate strong enthusiasm for broader accessibility, and the merge of #1158 resolves a long-standing integration complaint (#269).

## 8. Backlog Watch
Items needing maintainer attention:

- **[Issue #806 — WebUI (open since 2026-02-26, high priority, 8 👍)](https://github.com/sipeed/picoclaw/issues/806)** — Nearly 6 months old with high community engagement. The title notes "Refactoring now," but there is no visible linked PR; users are watching. Maintainer communication about timeline would reduce uncertainty.
- **[PR #3314 — customAllowPatterns fix (open since 2026-08-03, stale)](https://github.com/sipeed/picoclaw/pull/3314)** — A functional bug fix for restrictiveness of exec permissions, sitting with no reviewer comments. For a security-adjacent config path, this warrants maintainer review soon.
- **[PR #3329 — LINE webhook warning (open since 2026-08-11, stale)](https://github.com/sipeed/picoclaw/pull/3329)** — Tied to #3328; the corresponding issue is active, so pairing them for merge would close the loop on a class of "inert config" bugs.
- **[Issue #3287 — IRC long-message support (open since 2026-07-22, 6 comments)](https://github.com/sipeed/picoclaw/issues/3287)** — No maintainer response visible; the feature request is well-scoped and has community momentum.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-19

## Today's Overview
NanoClaw saw very high activity: 37 PRs were updated in the last 24 hours, with 19 closed/merged and 18 still open. The dominant theme is a major central-database refactor aimed at async, portable database backends, including multiple breaking-change PRs. Three issues were updated today: one open bug and two closed bug reports around the update/skill maintenance paths. No new releases were published. Overall, the project is in an active infrastructure transition, while user-facing channel integrations like Dial and You.com continue to wait for review.

## Releases
No new releases were published in the last 24 hours.

## Project Progress
Closed/merged PRs today show a strong push on database internals and one important security fix:

- **Central DB portability/refactor**:
  - [PR #3321](https://github.com/nanocoai/nanoclaw/pull/3321) — centralize the central database path
  - [PR #3323](https://github.com/nanocoai/nanoclaw/pull/3323) — make central SQL portable
  - [PR #3324](https://github.com/nanocoai/nanoclaw/pull/3324) — add async central database seam
  - [PR #3325](https://github.com/nanocoai/nanoclaw/pull/3325) — **[BREAKING]** adopt async central database seam
  - [PR #3327](https://github.com/nanocoai/nanoclaw/pull/3327) — add backend composition and migration modes
  - [PR #3330](https://github.com/nanocoai/nanoclaw/pull/3330) — run central suites through the driver

- **Stability/concurrency fixes**:
  - [PR #3326](https://github.com/nanocoai/nanoclaw/pull/3326) — close async concurrency races
  - [PR #3329](https://github.com/nanocoai/nanoclaw/pull/3329) — make concurrent queue dequeue lossless
  - [PR #3320](https://github.com/nanocoai/nanoclaw/pull/3320) — enforce async promise handling

- **Security fix**:
  - [PR #2538](https://github.com/nanocoai/nanoclaw/pull/2538) — validate package names before Dockerfile interpolation to prevent CWE-78 command injection

- **Closed bug issues**:
  - [Issue #2868](https://github.com/nanocoai/nanoclaw/issues/2868) — `/update-skills` silent no-op for installed channels
  - [Issue #3194](https://github.com/nanocoai/nanoclaw/issues/3194) — `/update-nanoclaw` can stamp success without a recoverable cutover

## Community Hot Topics
The most active item today is [Issue #3338: Codex WebSocket idle retry is hidden until NanoClaw’s 10-minute turn timeout](https://github.com/nanocoai/nanoclaw/issues/3338), with 2 comments. The underlying need is clear: users are hitting silent 10-minute waits when the Codex WebSocket stalls, because Codex CLI’s internal 5-minute idle retry is not surfaced to NanoClaw. The report calls for visibility and fast failure rather than long user-facing silence.

The other two updated issues, #2868 and #3194, were closed, suggesting resolution of previously reported update-path bugs. No PRs had notable comment/reaction counts in today’s data.

## Bugs & Stability
Ranked by severity:

1. **High — [Issue #3338](https://github.com/nanocoai/nanoclaw/issues/3338) (open)**  
   Codex WebSocket idle retry is hidden, causing a simple Telegram request to remain silent for up to 10 minutes. No dedicated fix PR is visible yet.

2. **High — [Issue #3194](https://github.com/nanocoai/nanoclaw/issues/3194) (closed)**  
   `/update-nanoclaw` could stamp success even when rollback did not cover SQLite, gitignored config, or external components. Closed as resolved.

3. **Medium — [Issue #2868](https://github.com/nanocoai/nanoclaw/issues/2868) (closed)**  
   `/update-skills` silently skipped code/dependency refresh for installed channels. Closed as resolved.

Related stability PRs also landed for DB async concurrency races ([#3326](https://github.com/nanocoai/nanoclaw/pull/3326)), lossless queue dequeue ([#3329](https://github.com/nanocoai/nanoclaw/pull/3329)), and container package-name injection ([#2538](https://github.com/nanocoai/nanoclaw/pull/2538)).

## Feature Requests & Roadmap Signals
- **Dial channel support** is the clearest upcoming feature: [PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041) adds the Dial channel adapter for SMS + AI voice calls, and [PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) adds Dial to the channel picker/wizard. Both remain open and were updated today.
- **You.com MCP integration**: [PR #3322](https://github.com/nanocoai/nanoclaw/pull/3322) adds a `/add-youdotcom-tool` utility skill for You.com MCP tools.
- **Slack launch assets**: [PR #3328](https://github.com/nanocoai/nanoclaw/pull/3328) adds a Slack launch banner to the README, hinting at an upcoming launch/marketing push.
- **Breaking async DB adoption**: [PR #3334](https://github.com/nanocoai/nanoclaw/pull/3334) is an open breaking change that safely adopts the async central database. Combined with the closed DB refactor series, this is likely to land in the next major/minor version.

## User Feedback Summary
User-reported pain points today center on transparency and upgrade reliability:

- A Telegram request can hang silently for 10 minutes when Codex WebSocket stalls ([#3338](https://github.com/nanocoai/nanoclaw/issues/3338)).
- Installed-channel updates were silently skipped, breaking expected `[Unreleased]` migration steps ([#2868](https://github.com/nanocoai/nanoclaw/issues/2868)).
- The update command could report success even when rollback did not cover all changed components ([#3194](https://github.com/nanocoai/nanoclaw/issues/3194)).

Users are asking for predictable updates, visible retries, and safe rollback behavior. No positive-sentiment feedback is captured in this day’s data.

## Backlog Watch
- **Feature PRs needing maintenance/review**: [PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041) and [PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) — the Dial channel feature has been open since 2026-07-14 and was updated today, but is still unmerged.
- **New bug needing owner**: [Issue #3338](https://github.com/nanocoai/nanoclaw/issues/3338) needs a design for surfacing Codex WebSocket idle/retry events to NanoClaw.
- **Breaking DB PR**: [PR #3334](https://github.com/nanocoai/nanoclaw/pull/3334) — `[BREAKING] adopt async central database safely` is central to the current refactor and needs migration guidance before merge.
- **Docs/launch PR**: [PR #3328](https://github.com/nanocoai/nanoclaw/pull/3328) — README Slack banner appears ready but may be waiting on launch timing.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-19

## 1. Today's Overview

IronClaw is in an active release-candidate cycle for v1.3.0, with **rc.2 shipped on 2026-08-18** to hotfix a critical crash-loop introduced in rc.1 for 1.2.x upgrades. Activity is very high: **21 issues** and **38 PRs** updated in the last 24 hours (15 open issues, 24 open PRs), including several XL-sized core-contributor PRs in review. The project is simultaneously stabilizing the 1.3.0 line while pulling significant v1.4.0 work — the omp coding-tool contract (#7491), automation outcome evidence (#7650), a durable notification inbox (#7697), and a WebUI design-system program (#7043, #7257). The maintainer response to the rc.1 regression was fast (fix released within a day), and a severe libSQL resource-governor failure was fixed and closed via #7717.

---

## 2. Releases

### ironclaw-v1.3.0-rc.2 — 2026-08-18
**Fixed:**
- Upgrades from 1.2.x now accept and preserve the released extension `activation_state` field instead of crash-looping during startup (fixes #7720).
- The canonical Reborn runtime image again supports opt-in, public-key-only worker SSH on port 2222.

**⚠️ Migration note:** Do **not** deploy rc.1 over a 1.2.x installation — it crash-loops and takes HTTP/SSH ports dead. Users who already installed rc.1 should upgrade immediately to rc.2. 1.2.x users can skip rc.1 entirely.

### ironclaw-v1.3.0-rc.1 — 2026-08-17
- Published with prebuilt-binary installers (shell + PowerShell). No release notes were included in this build; it was superseded within a day by rc.2.

---

## 3. Project Progress

**Key merged/closed PRs in the last 24h (14 merged/closed total):**

| PR | Change | Status |
|---|---|---|
| [#7717](https://github.com/nearai/ironclaw/pull/7717) | **fix(resources): stop libSQL write-lane starvation** from cascading through the resource governor — authority invalidation, permanent reservation leaks, and mislabeled capability failures | Closed (fixes #7714) |
| [#7713](https://github.com/nearai/ironclaw/pull/7713) | Test run exercising `/benchmark` on `qa-automation-preview`, the new 10-task enterprise suite | Closed (test PR, not merged) |
| [#7684](https://github.com/nearai/ironclaw/pull/7684) | Deps bump (everything-else group, 5 updates incl. base64, toml, http-body-util) | Closed |
| [#7703](https://github.com/nearai/ironclaw/pull/7711) | Wasm capability-response normalization — superseded and folded into #7711 | Closed/superseded |

**Closed issues (6 total):**
- [#7714](https://github.com/nearai/ironclaw/issues/7714) — libSQL write-lane starvation bug (resolved by #7717)
- [#7185](https://github.com/nearai/ironclaw/issues/7185) — Memory not reliably recalled across conversations (closed; user-reported in Champions weekly check-in)
- [#7638](https://github.com/nearai/ironclaw/issues/7638) — Thread deletion alerts replaced with global toast (WebUI UX)
- [#7639](https://github.com/nearai/ironclaw/issues/7639) — Shared `InlineNotice` component introduced (WebUI UX)
- [#7465](https://github.com/nearai/ironclaw/issues/7465) — Company Brain FDE epic (closed)
- [#7165](https://github.com/nearai/ironclaw/issues/7165) — Customer Feedback Remedition epic (closed)

**Notable open work advancing this cycle:** the omp core-tool contract & engines (#7491), evidence-backed automation run outcomes (#7650), typed wasm tool responses (#7711), and run-timing evidence in downloadable artifacts (#7735).

---

## 4. Community Hot Topics

The three issues with the most comment activity:

1. **[#7185 — Memory not reliably recalled across conversations (closed)](https://github.com/nearai/ironclaw/issues/7185)** — 2 comments. Reported by multiple testers at the 2026-07-23 IronClaw Champions weekly check-in; information established in one conversation is not reliably available in later ones. Underlying need: durable cross-conversation memory is a top-tier user expectation for an AI assistant, and its closure this cycle signals progress (likely tied to the memory-provider roadmap — see #7731).

2. **[#6879 — Automation runs are hit-or-miss (open, epic v1.3.0/v1.4.0)](https://github.com/nearai/ironclaw/issues/6879)** — 1 comment. Structural audit found trigger fires execute as plain interactive chat turns; failures are worse on small models (DeepSeek V4 Flash). Underlying need: unattended automation must be deterministic and model-agnostic — this is the single most important reliability epic for the agent product.

3. **[#7673 — BudgetLedger accounting refinements (open)](https://github.com/nearai/ironclaw/issues/7673)** — 1 comment. Two bounded over-counting gaps: truncated launch windows double-charge, and charge durability gaps. Underlying need: users trust cost caps only if accounting is exact and conservative in the right direction.

There is also a very large active PR surface (38 PRs updated), dominated by core contributors working on the v1.4.0 roadmap: design-system governance (#7043, #7257), omp tooling (#7491), durable inbox (#7697), Google Docs semantic tools (#7728), voice-to-text (#7724), and Slack privacy (#7682).

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Description | Fix status |
|---|---|---|---|
| 🔴 Critical | [#7720](https://github.com/nearai/ironclaw/issues/7720) | **1.3.0-rc.1 crash-loops on boot after 1.2.x upgrade** — `unknown field activation_state` in v2 extension installation row; process exits 1, HTTP/SSH ports go dead | **Fixed in rc.2** (2026-08-18) |
| 🔴 High | [#7714](https://github.com/nearai/ironclaw/issues/7714) (closed) | **libSQL single shared write connection starves the resource-governor journal** under PinchBench load — cascading authority invalidation every ~40s, permanent reservation leaks | **Fixed by #7717** (closed) |
| 🟠 Medium | [#7727](https://github.com/nearai/ironclaw/issues/7727) | **Catalog `capabilities` artifact is mandatory but never read** — downloaded, digest-verified, and installed but ignored, including for manifest v3 tools | No fix PR yet |
| 🟠 Medium | [#7726](https://github.com/nearai/ironclaw/issues/7726) | **`IRONHUB_MANIFEST_URL` is configurable but hardcoded** to `hub.ironclaw.com` in practice — self-hosted catalog values rejected by compile-time allowlist | No fix PR yet |
| 🟡 Low | [#7673](https://github.com/nearai/ironclaw/issues/7673) | BudgetLedger double-charges truncated launch windows; durability gap | Open, no fix PR yet |
| 🟡 Low | [#7447](https://github.com/nearai/ironclaw/issues/7447) | Agent fails after too many tool calls — got stuck in a redundant fetch-retry loop (4 near-duplicate GitHub queries) instead of paginating, burning the tool-call budget | Open (v1.3.0/v1.4.0 epic) |

Overall stability signal: the two highest-severity failures (rc.1 boot crash, libSQL starvation cascade) were both reported and fixed within the same 24h window — strong release-hygiene and incident response.

---

## 6. Feature Requests & Roadmap Signals

**In-flight features (likely to land in v1.3.0 or early v1.4.0):**
- **Run-timing evidence in conversation artifacts** ([#7735](https://github.com/nearai/ironclaw/pull/7735)) — per-iteration inference duration, per-tool duration, and run totals for bug reports.
- **Evidence-backed automation outcomes** ([#7650](https://github.com/nearai/ironclaw/pull/7650)) — replaces answer-only semantic judging with deterministic run assessment.
- **omp core-tool contract** ([#7491](https://github.com/nearai/ironclaw/pull/7491), epic [#7392](https://github.com/nearai/ironclaw/issues/7392)) — models get exactly six coding tools: `read`, `write`, `edit`, `glob`, `grep`, `bash`.
- **Slack private connect nudge** ([#7682](https://github.com/nearai/ironclaw/pull/7682)) — one-click, DM-delivered connect link for unlinked users (fixes #7681).
- **Durable notification inbox** ([#7697](https://github.com/nearai/ironclaw/pull/7697)) — typed inbox contracts, pagination, unread counts, read/archive lifecycle.
- **Google Docs semantic editing tools** ([#7728](https://github.com/nearai/ironclaw/pull/7728)) — structured inspection, anchored batch edits, populated tables, deterministic verification.
- **Voice-to-text in the WebUI composer** ([#7724](https://github.com/nearai/ironclaw/pull/7724)) — host-side NEAR AI Whisper transcription, never auto-sent, browser never holds the inference credential.

**New roadmap signals for v1.4.0 (all opened 2026-08-18):**
- [#7731](https://github.com/nearai/ironclaw/issues/7731) — **Mnesis Spike**: integrate Mnesis as a memory provider.
- [#7732](https://github.com/nearai/ironclaw/issues/7732) — **Sandboxing Solution with CLIs**: end-to-end sandboxing.
- [#7733](https://github.com/nearai/ironclaw/issues/7733) — **DESIGN.md governance + theme reskin phases 2–3**.

**Prediction:** v1.3.0 final is near (rc.2 is the stabilization release). The v1.4.0 roadmap is already crowded with epics: Reborn profile-agnostic durable state (#7467), growth/usage logging (#6837), Extensions vNext (#7354), and the design system (#7038). Memory (Mnesis) and sandboxing are emerging as the headline v1.4.0 themes.

---

## 7. User Feedback Summary

Real user pain points observed this cycle:

- **Memory unreliability across conversations** ([#7185](https://github.com/nearai/ironclaw/issues/7185)) — reported by multiple independent testers (Devon/Tobias in legal, others) at the Champions weekly check-in; context from earlier conversations is not reliably available. Issue is now **closed**.
- **Automation flakiness on small models** ([#6879](https://github.com/nearai/ironclaw/issues/6879)) — the same stored prompt "sometimes succeeds and sometimes produces nothing useful," especially on DeepSeek V4 Flash. Users need unattended runs to be dependable.
- **Agent tool-loop inefficiency** ([#7447](https://github.com/nearai/ironclaw/issues/7447)) — an agent burned its entire tool budget on redundant near-duplicate GitHub fetch-retry rounds rather than paginating; users are hitting hard budget ceilings from poor tool selection.
- **Slack onboarding dead-end** ([#7681](https://github.com/nearai/ironclaw/issues/7681)) — unlinked users get a **public** connect notice in shared channels and then a manual multi-step round trip ("what's the link to connect you?"). Fix PR #7682 is open.
- **Self-hosted catalog rejection** ([#7726](https://github.com/nearai/ironclaw/issues/7726)) — users who configure a custom IronHub catalog are silently rejected by an allowlist; the config knob exists but doesn't work.

Satisfaction signals: the community/user-facing release channel is responsive (rc.2 within 24h of the rc.1 regression), and multiple Champions-reported issues (#7185) and WebUI UX complaints (#7638, #7639) were closed this cycle.

---

## 8. Backlog Watch

Items that have gone longest without maintainer action or closure:

| Item | Age (created) | Notes |
|---|---|---|
| [PR #3676 — Security docs rework](https://github.com/nearai/ironclaw/pull/3676) | 2026-05-15 (~3 months) | XL, experienced contributor, `skip-regression-check`; rebuilt from current `main` but still unmerged. Evaluator-facing explainer of secrets/sandboxing/leak detection — important for trust and audits. |
| [Issue #6837 — Info-level logging for growth/usage stats](https://github.com/nearai/ironclaw/issues/6837) | 2026-07-29 | Zero `info!` calls in analytics today; epic for v1.4.0, no comments since creation. |
| [PR #6994 — OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/pull/6994) | 2026-08-01 | XL WebUI onboarding workstream, flag-gated (`oobe_suggestions`), still in review after ~2.5 weeks. |
| [Issue #6879 — Automation runs hit-or-miss](https://github.com/nearai/ironclaw/issues/6879) | 2026-07-29 | Dual-milestone epic (v1.3.0/v1.4.0) with only 1 comment; the audit is done but there is no visible fix PR yet. |
| [PR #7304 — OAuth sign-in above gateway token form](https://github.com/nearai/ironclaw/pull/7304) | 2026-08-06 | Small UX change (M-size) that has been open ~2 weeks with no comments. |

**Project-health assessment:** IronClaw is in a healthy but intense release cycle — critical bugs are being fixed within 24 hours, the v1.3.0 RC is stabilizing, and a well-scoped v1.4.0 epic set is already forming. The main risks are the growing number of large open PRs (many XL) competing for review bandwidth and the backlog of user-facing reliability issues (automation, memory) that remain open across milestone boundaries.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-19

## Today's Overview

As of 2026-08-19, LobsterAI shows a release-and-merge-heavy day: 1 new release (2026.8.18), 20 PRs updated, 17 of which moved to merged/closed, and 9 issues updated — all still open and marked stale. The main focus is the DeepSeek Harness (dsh) integration, alongside several UI/UX improvements and bug fixes that were merged after long open periods. However, issue triage remains weak: no user-reported issues were closed in the last 24 hours, and the most visible issues are from April 2026.

## Releases

### LobsterAI 2026.8.18

Published 2026-08-18. Release notes highlight:

- **DeepSeek Harness engine integration** — https://github.com/netease-youdao/LobsterAI/pull/2502
- **dsh update to rc.7** — https://github.com/netease-youdao/LobsterAI/pull/2509
- **dsh process launcher** — https://github.com/netease-youdao/LobsterAI/pull/2502 (part of the same engine-integration effort)

The associated release-branch PR also describes an opt-in experimental DeepSeek Harness integration, improved model loading, and scheduled-task history improvements: https://github.com/netease-youdao/LobsterAI/pull/2510

No explicit breaking changes or migration notes were included in the published release notes.

## Project Progress

The 17 merged/closed PRs show a mix of long-queued feature work and recent release stabilization:

### Release & Core Changes

- **Release: 2026.8.17** (`#2510`) — Merged final release branch into `main`; includes dsh integration, model-loading improvements, and scheduled-task history changes.  
  https://github.com/netease-youdao/LobsterAI/pull/2510
- **Update dsh to rc.7** (`#2509`) — https://github.com/netease-youdao/LobsterAI/pull/2509
- **dsh runtime setup docs** (`#2506`) — https://github.com/netease-youdao/LobsterAI/pull/2506
- **Fix auth/model-load retry** (`#2508`) — Adds backoff retries so transient server/model fetch failures no longer leave the plan model group empty for the session.  
  https://github.com/netease-youdao/LobsterAI/pull/2508
- **Scheduled-task history page-size cap** (`#2507`) — Prevents cron run history requests from exceeding the OpenClaw gateway limit.  
  https://github.com/netease-youdao/LobsterAI/pull/2507

### UI/UX & Features

- **Sidebar task search moved to header actions** (`#2481`) — https://github.com/netease-youdao/LobsterAI/pull/2481
- **Artifact auto-preview toggle** (`#2425`) — https://github.com/netease-youdao/LobsterAI/pull/2425
- **Multi-agent task activity filter** (`#2418`) — https://github.com/netease-youdao/LobsterAI/pull/2418
- **Sites page layout alignment** (`#2410`) — https://github.com/netease-youdao/LobsterAI/pull/2410
- **Copy-success feedback for site URLs/share codes** (`#2417`) — https://github.com/netease-youdao/LobsterAI/pull/2417
- **Avatar settings** (`#1629`) — Adds preset/upload avatar support with local storage management.  
  https://github.com/netease-youdao/LobsterAI/pull/1629
- **MCP quick-add templates** (`#1631`) — Adds one-click templates for File System, SQLite, and Brave Search MCP servers.  
  https://github.com/netease-youdao/LobsterAI/pull/1631
- **Recently used skills tab** (`#1583`) — Adds usage-count tracking for skills, including auto-routing scenarios.  
  https://github.com/netease-youdao/LobsterAI/pull/1583

### Bugfixes & Stability

- **OpenClaw gateway startup failure / flashing dialog** (`#1626`) — Fixed P0 regression caused by invalid `skipMissedJobs` config fields after an OpenClaw upgrade.  
  https://github.com/netease-youdao/LobsterAI/pull/1626
- **SQLite foreign-key cascade delete** (`#1597`) — Enables `PRAGMA foreign_keys` so related records are actually cleaned up.  
  https://github.com/netease-youdao/LobsterAI/pull/1597
- **Session export quality + copy-to-clipboard** (`#1615`) — Improves markdown export metadata, timestamps, tool-call formatting, and adds copy support.  
  https://github.com/netease-youdao/LobsterAI/pull/1615
- **Scheduled-task system notifications** (`#1621`) — Implements OS-native notifications after scheduled tasks finish; closes issue #1620.  
  https://github.com/netease-youdao/LobsterAI/pull/1621

Several older PRs (`#1583`, `#1597`, `#1615`, `#1621`, `#1626`, `#1629`, `#1631`) originated in April and were finally closed/merged now — suggesting a deliberate backlog sweep.

## Community Hot Topics

The most-commented issues are all stale but still open:

- **#1614 — Add hermes-agent as an optional AI engine** (2 comments)  
  https://github.com/netease-youdao/LobsterAI/issues/1614  
  Users want more AI-engine choices beyond OpenClaw, similar to the existing extensibility pattern.

- **#1622 — Cannot add custom models** (2 comments)  
  https://github.com/netease-youdao/LobsterAI/issues/1622  
  Custom-model testing fails after adding a model; likely a configuration or validation problem.

- **#1627 — Complex tasks crash the client** (2 comments)  
  https://github.com/netease-youdao/LobsterAI/issues/1627  
  High-severity stability report: the app crashes during a moderately complex task.

- **#1632 — Skills unusable after switching to a local model** (2 comments)  
  https://github.com/netease-youdao/LobsterAI/issues/1632  
  Users need skill installation or migration guidance when switching model backends.

There are no PRs with significant comment or reaction activity in this window.

## Bugs & Stability

Ranked by severity among open reports:

1. **High — Client crash on complex task** (`#1627`)  
   https://github.com/netease-youdao/LobsterAI/issues/1627  
   No direct fix PR in this batch.

2. **High — First launch crash after updating to latest version** (`#1587`)  
   https://github.com/netease-youdao/LobsterAI/issues/1587  
   Includes full crash log attachment; no fix PR visible.

3. **High — Session and scheduled-task features not working on macOS Intel** (`#1589`)  
   https://github.com/netease-youdao/LobsterAI/issues/1589  
   Related scheduled-task history fix exists (`#2507`), but the core failure remains unconfirmed.

4. **Medium — Custom model test failure** (`#1622`)  
   https://github.com/netease-youdao/LobsterAI/issues/1622

5. **Medium — Deleted skills still appear in UI after restart** (`#1617`)  
   https://github.com/netease-youdao/LobsterAI/issues/1617

6. **Medium — Skills unavailable after switching to local model** (`#1632`)  
   https://github.com/netease-youdao/LobsterAI/issues/1632

7. **Low — Language switching incomplete for terms/tool-style pages** (`#1586`)  
   https://github.com/netease-youdao/LobsterAI/issues/1586

Fixed in this batch:

- OpenClaw gateway startup P0 fix (`#1626`)
- SQLite cascade-delete fix (`#1597`)
- Transient model-load failure retry (`#2508`)
- Scheduled-task history page-size overflow (`#2507`)

## Feature Requests & Roadmap Signals

The strongest roadmap signals are features that were requested by users and then merged:

- **Scheduled-task OS notifications** — Requested in `#1620`, implemented in `#1621`. Likely to appear in the next release.  
  https://github.com/netease-youdao/LobsterAI/issues/1620
- **MCP quick-add templates** (`#1631`) — Merged; reduces friction for adding common MCP servers.
- **Avatar settings** (`#1629`) — Merged; new personalization feature.
- **Recently used skills** (`#1583`) — Merged; improves skill discovery and usage transparency.
- **Artifact auto-preview toggle** (`#2425`) and **multi-agent activity filter** (`#2418`) — Merged; both are user-facing productivity enhancements.

Still-open feature PRs that may land in a future release:

- **Model selector UI optimization** (`#1628`) — https://github.com/netease-youdao/LobsterAI/pull/1628
- **Global search fix + UX upgrade for cowork tasks** (`#1634`) — https://github.com/netease-youdao/LobsterAI/pull/1634
- **hermes-agent as an AI engine** (`#1614`) — likely depends on architecture decisions around engine extensibility.

## User Feedback Summary

User feedback is a mix of feature enthusiasm and frustration over unresolved stability issues:

- Chinese-language bug reports dominate the issue backlog, especially around crashes, local-model support, and UI synchronization.
- Users are actively using the skill/MCP/avatar feature surface and requesting quality-of-life improvements such as notifications and templates.
- There is clear demand for better local-model compatibility: custom-model failures, skill breakage after switching models, and offline model-loading issues are recurring themes.
- The gap between active PR merging and stale open issues suggests maintainers are prioritizing code delivery over issue communication.

## Backlog Watch

Several important items need maintainer attention:

- **#1614 — hermes-agent as AI engine**: open since April, no clear maintainer response.  
  https://github.com/netease-youdao/LobsterAI/issues/1614
- **#1622 — custom model failure**: open since April, likely affects many local-model users.  
  https://github.com/netease-youdao/LobsterAI/issues/1622
- **#1627 — complex-task crash**: high-severity crash, still unresolved.  
  https://github.com/netease-youdao/LobsterAI/issues/1627
- **#1632 — local model + skills issue**: unresolved and lacks an answer/workaround.  
  https://github.com/netease-youdao/LobsterAI/issues/1632
- **Open PR #1277 — dependabot electron group bump**: proposes electron 40.2.1 → 43.4.0; needs review, especially due to the large version jump.  
  https://github.com/netease-youdao/LobsterAI/pull/1277
- **Open PR #1628** and **#1634** have been open since April; they contain meaningful UI/UX fixes and should be reviewed or closed explicitly.  
  https://github.com/netease-youdao/LobsterAI/pull/1628  
  https://github.com/netease-youdao/LobsterAI/pull/1634

All 9 updated issues are marked `[stale]` and were last touched on 08-18, likely by the stale bot rather than by maintainers. A triage pass is needed to distinguish resolved, invalid, and genuinely actionable issues.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-19

## 1. Today's Overview
As of 2026-08-19, Moltis shows steady delivery: 2 issues were closed, 5 PRs were closed/merged, and 1 new open PR appeared, with 0 open issues updated in the last 24 hours. One new release, `20260818.06`, was published. The window included fixes for a long-running Podman bug, a heartbeat settings data-loss bug, a broken README chart, plus a substantial new Files library/Settings browser feature. The project appears to be keeping pace on bug fixes while continuing to expand its API surface and connector ecosystem.

## 2. Releases
- **20260818.06** — published in the 2026-08-18 release cycle. No detailed changelog, breaking-change notes, or migration instructions were included in the provided data, so no specific migration actions can be inferred.

## 3. Project Progress
Closed/merged PRs in the last 24h:

- [PR #1106 — fix(sandbox): support Podman escape hatches](https://github.com/moltis-org/moltis/pull/1106)  
  Adds explicit Podman escape hatches for host-socket passthrough and privileged nested Podman, recreates sandboxes on mode/socket changes, fails closed on unavailable sockets, and improves rootless Podman diagnostics.

- [PR #1198 — Route OpenAI reasoning tool calls through Responses](https://github.com/moltis-org/moltis/pull/1198)  
  Routes OpenAI requests combining function tools and `reasoning_effort` through the Responses API, while preserving Chat Completions behavior for simpler/OpenAI-compatible cases.

- [PR #1206 — Add managed Files library and Settings browser](https://github.com/moltis-org/moltis/pull/1206)  
  Adds a data-directory-backed Files library with streamed list/upload/download/create/move/delete APIs, a Finder-style Settings browser, `MOLTIS_FILES_DIR` discovery, and read-only-by-default container mounts.

- [PR #1209 — fix(gateway): treat heartbeat.update params as a patch, not a whole config](https://github.com/moltis-org/moltis/pull/1209)  
  Fixes `heartbeat.update` so omitted fields are not silently overwritten with defaults.

- [PR #1211 — fix(readme): restore broken star history chart](https://github.com/moltis-org/moltis/pull/1211)  
  Restores the README star history chart using a token-free alternative data provider.

Open PR:

- [PR #1210 — Add Tesla Fleet API connector for vehicle data sync](https://github.com/moltis-org/moltis/pull/1210)  
  Adds a read-only Tesla connector that stores vehicle data in the shared connector snapshot store, without issuing commands or waking sleeping cars.

## 4. Community Hot Topics
The only issue with visible comment activity in this dataset was:

- [Issue #1095 — Podman is not working via Moltis](https://github.com/moltis-org/moltis/issues/1095) (2 comments)  
  The underlying need is clear: users want Moltis sandboxes to work under Podman, including rootless environments and host-socket passthrough. This is now addressed by [PR #1106](https://github.com/moltis-org/moltis/pull/1106).

- [Issue #1187 — Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)  
  Highlights the need for predictable config-edit semantics; fixed by [PR #1209](https://github.com/moltis-org/moltis/pull/1209).

No PR reaction/comment counts were provided, so issue activity is the only available community signal.

## 5. Bugs & Stability
Ranked by severity:

1. **Podman sandbox broken** ([Issue #1095](https://github.com/moltis-org/moltis/issues/1095)) — High  
   Blocks Podman-based container workflows. Fix PR: [PR #1106](https://github.com/moltis-org/moltis/pull/1106).

2. **Heartbeat config silently reset by UI** ([Issue #1187](https://github.com/moltis-org/moltis/issues/1187)) — Medium  
   Causes accidental config/data loss when saving settings. Fix PR: [PR #1209](https://github.com/moltis-org/moltis/pull/1209).

3. **Broken README star history chart** ([PR #1211](https://github.com/moltis-org/moltis/pull/1211)) — Low  
   Documentation/community-facing issue, fixed by switching to a working chart source.

All bugs updated in this window were closed, with fix PRs attached.

## 6. Feature Requests & Roadmap Signals
- **Managed Files library and Settings browser** ([PR #1206](https://github.com/moltis-org/moltis/pull/1206)) signals a broader move toward first-class file management, user settings, and container-mounted data access.
- **OpenAI Responses API routing** ([PR #1198](https://github.com/moltis-org/moltis/pull/1198)) improves provider compatibility for reasoning + tool-call workloads.
- **Tesla Fleet API connector** ([PR #1210](https://github.com/moltis-org/moltis/pull/1210)) is the strongest near-term roadmap signal: it is still open, actively developed, and matches the existing connector snapshot-store direction. It may land in a future release.

## 7. User Feedback Summary
- Podman users reported being blocked by sandbox incompatibility ([Issue #1095](https://github.com/moltis-org/moltis/issues/1095)); the fix in [PR #1106](https://github.com/moltis-org/moltis/pull/1106) directly targets that pain point.
- A user reported silent field resets in the heartbeat settings UI ([Issue #1187](https://github.com/moltis-org/moltis/issues/1187)); the fix in [PR #1209](https://github.com/moltis-org/moltis/pull/1209) addresses the underlying config-patch semantics.
- The README chart fix ([PR #1211](https://github.com/moltis-org/moltis/pull/1211)) addresses contributor/community-facing documentation quality.
- No explicit satisfaction scores are available, but both user-reported bugs were closed with fixes in the same cycle, which is a positive signal.

## 8. Backlog Watch
- **No long-unanswered items are visible in the provided dataset.** The two June-era items, [Issue #1095](https://github.com/moltis-org/moltis/issues/1095) and [PR #1106](https://github.com/moltis-org/moltis/pull/1106), were both closed this window.
- [PR #1210](https://github.com/moltis-org/moltis/pull/1210) is open but was created/updated on 2026-08-18, so it is not stale yet. It may still need maintainer review, but it is not a backlog concern.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw Project Digest — 2026-08-19

## 1. Today's Overview

CoPaw/QwenPaw is in a high-activity, pre-release hardening phase, with **46 issues updated in the last 24h** (30 open/active, 16 closed) and **50 PRs updated** (31 open, 19 merged/closed). No new release was published in this window, so attention remains focused on stabilizing the 2.1.x line. Community contribution is healthy, including visible first-time-contributor PRs touching security, MCP, video tool output, and sandbox behavior. However, multiple high-impact user-facing stability complaints remain open — silent task stoppage, long freezes, and session-cancellation bugs — indicating that release hardening and reliability work is still ongoing.

## 2. Releases

**None.** No new versions or release artifacts were published in the last 24 hours.

## 3. Project Progress

The visible merged/closed PRs in the top-commented set show fixes across providers, CLI behavior, and the console:

- **#6617 — fix(providers): honor the Retry-After cap on the streaming retry path** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/6617))  
  Closes a rate-limit handling gap in the retry path.

- **#7072 — feat(console): add background chat task list API** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7072))  
  Adds a task-list API for background tasks, supporting multi-agent coordination workflows.

- **#7064 — fix(cli): sync top-level text on `cron update --text` for agent jobs** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7064))  
  Fixes a user-visible mismatch where cron updates did not update the displayed top-level text.

- **#7069 — fix(console): render data-URL images in historical messages on session reload** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7069))  
  Restores chat history image thumbnails after session reload.

Other notable open PRs advanced or newly contributed include:

- **#7066 — fix(drivers): persist rotated refresh_token for OAuth2 auth-code providers** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7066))
- **#7061 — fix(video): deliver tool-result videos on OpenAI Responses API** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7061))
- **#7120 — security: enable shell evasion checks by default + regression test** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7120))
- **#7116 — fix(sandbox): expand `~` in policy-derived mount paths** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7116))
- **#7114 — refactor(config): make agent config loading async by default** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7114))
- **#7115 — fix(memory): avoid noisy inbox notifications for unchanged jobs** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/7115))

## 4. Community Hot Topics

The most active issues by comment count reflect three underlying needs: **reliable long-running agent execution**, **better channel/provider connectivity**, and **more user control over conversation UX**.

- **#6684 — [Feature] 增加频道的重试功能** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6684)) — 10 comments  
  Users want automatic retry/health-check for Matrix channels. Underlying need: self-hosted channel setup should survive service restarts without manual re-saving.

- **#6921 — [Bug] Agent stops mid-task silently** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6921)) — 8 comments  
  Model outputs like "Now 2.1, 3.1, 3.2. Let me do all three." then stops with no visual error; user must say "继续" to continue. This is the clearest current reliability pain point.

- **#7102 — [Bug] Freeze more than 10 minutes long** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/7102)) — 7 comments  
  Long freezes while using GLM 5.3, with no tokens or thinking output.

- **#7011 — [Bug] Console stop request can cancel an active Feishu session** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/7011)) — 7 comments  
  Session identity crossing between UI sessions causes cross-session cancellation.

- **#6470 — [Bug] MCP driver ignores transport config** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6470)) — 5 comments  
  Hardcoded SSE client breaks `streamable_http` MCP servers. Connectivity/config correctness remains a recurring theme.

- **#4001 — [Feature] 支持在对话中手动删除单条消息** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/4001)) — 5 comments, closed  
  Strong demand for single-message deletion in chat history, similar to WeChat.

- **#5584 — [Question] 无法连接自定义的ascend-vllm模型** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/5584)) — 5 comments, closed  
  Custom model connectivity regressions are concerning for users reliant on non-default backends.

## 5. Bugs & Stability

Ranked by impact, with fix status where visible:

| Severity | Issue | Description | Status |
|---|---|---|---|
| **High** | [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) | Long freeze >10 minutes, no tokens or thinking output | Open, no fix PR visible |
| **High** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | Agent silently stops mid multi-step task | Open, no fix PR visible |
| **High** | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Console stop request cancels active Feishu session | Open, no fix PR visible |
| **Medium-High** | [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) | Unreachable image URL in conversation history makes the whole session unusable | Open |
| **Medium-High** | [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082) | `_StructuredOutputDynamicClass` not fully defined — agent/toolkit init fails | Open |
| **Medium** | [#6470](https://github.com/agentscope-ai/QwenPaw/issues/6470) | MCP driver hardcodes SSE, ignores `streamable_http` transport config | Open |
| **Medium** | [#5900](https://github.com/agentscope-ai/QwenPaw/issues/5900) | MCP `streamable_http` session terminated, no reconnect | Open |
| **Medium** | [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) | OAuth2 refresh token rotation not persisted; remote MCP degrades to manual re-auth | Fix PR [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) open |
| **Medium** | [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) | Sandbox blocks `uv` from writing `~/.cache/uv`; configured policy workaround does not work | Fix PR [#7116](https://github.com/agentscope-ai/QwenPaw/pull/7116) open |
| **Medium** | [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | Frequent runtime crashes requiring page refresh | Open |
| **Low / Trust** | [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | MalwareBytes flags Desktop version as Trojan Loader; likely false positive but needs official clarification | Open |
| **Low / CI** | [#7121](https://github.com/agentscope-ai/QwenPaw/issues/7121) | Flaky nightly test on macOS runners | Open |

## 6. Feature Requests & Roadmap Signals

Several feature requests point toward the likely direction of the next 2.1.x point release:

- **Per-agent / per-session `reasoning_effort` override** ([#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062))  
  Users want different thinking depth for different agents without creating multiple model entries. Likely to gain traction as cloud model usage expands.

- **Channel retry and health detection** ([#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684))  
  A high-comment feature request. Channel resilience will likely be prioritized, especially for self-hosted Matrix users.

- **Search/filter in skill pool import UI** ([#7090](https://github.com/agentscope-ai/QwenPaw/issues/7090))  
  Straightforward UX improvement for users managing hundreds of skills; likely to be picked up quickly.

- **Plugin API `system_prompt` permission** ([#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052))  
  Enterprise/company-plugin use case: keep system prompts hidden from end users.

- **Single-window agent collaboration** ([#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925))  
  Users dislike that multi-agent collaboration creates new sessions and requires switching agents to see their output. This is a larger UX/architecture change.

- **Configurable inline media cap for `view_video`** ([PR #7071](https://github.com/agentscope-ai/QwenPaw/pull/7071))  
  Fixes the hardcoded 2 MB cap and is already under review, so likely to land soon.

- **Background chat task list API** ([PR #7072](https://github.com/agentscope-ai/QwenPaw/pull/7072), from issue #7056)  
  Already closed/implemented in this window, indicating active work on multi-agent task visibility.

## 7. User Feedback Summary

- **Reliability is the biggest pain point.** Multiple users report agents that stop silently, freeze for long periods, or require manual "继续" prompts. This erodes trust in autonomous execution.
- **Connectivity issues dominate.** Matrix channel instability, custom vLLM model connection failures, MCP transport config bugs, and OAuth2 refresh token problems are recurring themes.
- **Security-sensitive users are cautious.** The MalwareBytes false-positive report ([#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775)) drove at least one user to uninstall. Even if false, official communication would help.
- **2.1.0 improvements are noticed.** Some users explicitly acknowledged improvements, e.g. formula display in chat, while still reporting new regressions like auto-created sessions and file preview behavior.
- **UX feedback is increasingly specific.** Users want collapsible tool-call output, file download instead of preview, single-message deletion, searchable skill pools, and less noise from scheduled memory tasks.

## 8. Backlog Watch

Long-open or high-importance items that need maintainer attention:

- **#6470 — MCP driver ignores transport config** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6470))  
  Open since 2026-07-26. High-impact for MCP users, no fix PR visible.

- **#5900 — MCP `streamable_http` no auto-reconnect** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/5900))  
  Open since 2026-07-09. Session termination permanently skips the MCP client.

- **#6775 — MalwareBytes false positive / Trojan Loader** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6775))  
  Security-related and user-blocking. Needs an official response to reduce trust damage.

- **#6684 — Channel retry / health check feature** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6684))  
  High comment count and directly addresses a real self-hosted reliability gap.

- **#6921 — Silent task stoppage** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/6921))  
  Core agent execution defect. Likely should be prioritized above new features.

- **#7011 — Console stop request cancels Feishu session** ([Issue](https://github.com/agentscope-ai/QwenPaw/issues/7011))  
  Session identity isolation bug in multi-session UI; can cancel legitimate conversations.

- **PR #6515 — Volcengine Agent Plan & MiMo V2.5 providers** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/6515))  
  Under review since 2026-07-28. Long-running provider integration PR that may need maintainer cycles to land.

- **PR #6990 — Skill file I/O cache** ([PR](https://github.com/agentscope-ai/QwenPaw/pull/6990))  
  Marked "READY TO MERGE"; would reduce repeated file reads and Skill parsing across queries.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-19

## 1. Today's Overview

ZeroClaw remains highly active, with **50 issues updated** (32 open/active, 18 closed) and **50 PRs updated** (11 open, 39 merged/closed) in the last 24 hours. No new releases were published as of this digest. The project is mix of mature RFCs moving through acceptance, steady PR churn, and a meaningful set of high-severity runtime and Windows-specific bugs still waiting on implementation. Overall health is good but maintainer attention is scattered across several long-running accepted features, security hardening items, and older PRs that recently resurfaced.

## 2. Releases

No new releases were published in the observed period. The `Latest Releases` list is empty.

## 3. Project Progress

The 39 merged/closed PRs in the update window include several notable completed feature and fix items. The most relevant from the sampled top-20 list:

- **[#7041](https://github.com/zeroclaw-labs/zeroclaw/pull/7041) — feat(gateway): multi-tenant Linq channel with per-alias routing**  
  Converts the Linq channel from single-tenant to multi-tenant, enabling multiple provider instances per alias and changing webhook routing to `/linq/{alias}`.

- **[#6842](https://github.com/zeroclaw-labs/zeroclaw/pull/6842) — feat(providers): add NEAR AI Cloud provider**  
  Adds `nearai` as a canonical OpenAI-compatible provider slot, wired through config schema and provider listing.

- **[#6700](https://github.com/zeroclaw-labs/zeroclaw/pull/6700) — feat(web): add read-only skills browser**  
  Adds a `/skills` dashboard page for browsing installed skill bundles.

- **[#5998](https://github.com/zeroclaw-labs/zeroclaw/pull/5998) — feat(config): add mention-only option for IRC channels**  
  Matches `mention_only` semantics already available on Telegram, Discord, Slack, and other channels.

- **[#5853](https://github.com/zeroclaw-labs/zeroclaw/pull/5853) — fix(runtime): self-heal orphaned tool_result blocks on load + compact**  
  Fixes a session-bricking issue caused by orphaned `tool_result` messages after compaction or crashes.

- **[#5793](https://github.com/zeroclaw-labs/zeroclaw/pull/5793) — fix(gateway): emit token usage from webhook handler**  
  Resolves missing `tokens_used`, `input_tokens`, and `output_tokens` in `/webhook` events.

- **[#5207](https://github.com/zeroclaw-labs/zeroclaw/pull/5207) — fix(web): theme switching, session crash, and CSS token consistency**  
  Fixes dashboard theme toggling, a Sessions tab crash, hardcoded colors, CJK IME submission behavior, and a large logo asset.

- **[#5168](https://github.com/zeroclaw-labs/zeroclaw/pull/5168) — feat(agent): HMAC tool execution receipts for hallucination detection**  
  Adds a mechanism to verify that tool calls reported by the LLM actually executed.

Other completed/closed PRs in the sample include docs and CI improvements such as **[#5648](https://github.com/zeroclaw-labs/zeroclaw/pull/5648)** (PR template streamlined), **[#5684](https://github.com/zeroclaw-labs/zeroclaw/pull/5684)** (agent-ready PR review prompt), and **[#5780](https://github.com/zeroclaw-labs/zeroclaw/pull/5780)** (GitHub issue-triage Claude Code skill).

## 4. Community Hot Topics

- **[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — RFC: Goal mode v1 — bounded foreground Matrix work**  
  22 comments, 1 reaction  
  The most-discussed issue. It requests a durable way to pursue bounded user objectives across multiple agent turns without coupling restart handoff, broad channel admission, and Web work into the first delivery. The underlying need is reliable multi-turn autonomy.

- **[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — RFC: per-execution confirmation tier for high-risk shell commands + allow/ask/deny policy**  
  22 comments  
  A long-running, high-interest RFC centered on operator safety. Users want Claude Code-style command policies, explicit confirmation for destructive shell commands, and a reconciled contract for `allow/ask/deny`.

- **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 test failures on Windows**  
  17 comments  
  High visibility Windows reliability issue. CI only runs tests on Linux, so Unix-only commands, path semantics, and console encoding regressions go undetected.

- **[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929) — Unify slash-command registries across web UI, ZeroCode TUI, and channel runtime**  
  8 comments  
  Community concern about command drift across surfaces: command names, aliases, descriptions, and availability diverge between the channel runtime, ZeroCode, and web UI.

- **[#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs**  
  6 comments  
  Security-focused discussion about audit/deny drift and concrete CVE remediation for WASM runtime dependencies.

## 5. Bugs & Stability

Active or recently updated bugs, ranked roughly by severity:

- **[#10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067) — One oversized tool result is unrecoverable (P1, S2)**  
  Shell output cap is a 1 MB memory bound, not a context bound. A single oversized tool result aborts the turn instead of degrading gracefully. No explicit fix PR appears in the sampled set.

- **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 test failures on Windows (P1, S2)**  
  Unix-only test commands, path semantics, and console encoding on Simplified Chinese Windows/CP936. CI does not run tests on Windows, allowing regressions. Follow-up tracking exists in **[#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910)**.

- **[#8563](https://github.com/zeroclaw-labs/zeroclaw/issues/8563) — SOPs unavailable through web dashboard session (P1, S1, closed)**  
  Configured SOPs were not detected by the agent runtime in dashboard chat sessions. The issue is closed, though the sampled data does not explicitly show the resolving PR.

- **[#8410](https://github.com/zeroclaw-labs/zeroclaw/issues/8410) — Channel tasks need first-class intentional no-reply outcome (P2, S2)**  
  Conditional tasks like “only reply if there is new email” still send a visible zero-content response.

- **[#8134](https://github.com/zeroclaw-labs/zeroclaw/issues/8134) — Stale channel sessions are not reset after `session_ttl_hours`**  
  Accepted feature/bug affecting token consumption and response latency on Slack/Telegram/Discord.

Several fix PRs were also updated/closed in the window: **[#5853](https://github.com/zeroclaw-labs/zeroclaw/pull/5853)** for orphaned `tool_result` blocks, **[#5793](https://github.com/zeroclaw-labs/zeroclaw/pull/5793)** for missing webhook token usage, **[#5207](https://github.com/zeroclaw-labs/zeroclaw/pull/5207)** for web dashboard crashes, **[#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281)** for config-set rollback of auto-created aliases, and **[#10091](https://github.com/zeroclaw-labs/zeroclaw/pull/10091)** for response-cache file permissions.

## 6. Feature Requests & Roadmap Signals

The most likely next-version features are the accepted RFCs with high activity and maintainer support:

- **[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — Goal mode v1 for bounded multi-turn objectives.
- **[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** — High-risk shell command policy with allow/ask/deny tiers.
- **[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)** — Unified slash-command registries across web, TUI, and channels.
- **[#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)** — Session-scoped persistent prompt attachments to preserve objectives across trimming/restarts.
- **[#8134](https://github.com/zeroclaw-labs/zeroclaw/issues/8134)** — Session TTL enforcement for stale channel histories.
- **[#8409](https://github.com/zeroclaw-labs/zeroclaw/issues/8409)** — Raw stdout output mode for shell cron jobs.
- **[#8383](https://github.com/zeroclaw-labs/zeroclaw/issues/8383)** — Show active runtime context in ZeroCode Dashboard.
- **[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)** — DingTalk streaming messages to reduce perceived latency.
- **[#8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358)** — `zerorelay` milestone for NAT/CGNAT traversal.

Open PRs also signal near-term direction: **[#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070)** would gate `file_download` against SSRF with a private-host opt-in, and **[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** would add native Hailo-Ollama provider support.

## 7. User Feedback Summary

- **Windows users are underserved.** The 74 failing tests plus missing Windows CI coverage is a recurring pain point. Users explicitly call out Unix-only commands, path semantics, and Chinese-locale console encoding.
- **Channel operators want control and lower latency.** DingTalk lacks streaming; Twitter/X is missing from prebuilt binaries despite existing feature code; IRC mention-only was recently added; session TTL enforcement is needed to reduce token waste.
- **Security-sensitive users are pushing for safer tooling.** There is strong demand for shell command confirmation policies, SSRF protection on `file_download`, and session ownership boundaries for destructive tools.
- **Webhook/agent-mode users previously hit gaps.** Webhook agent mode was requested in [#3542](https://github.com/zeroclaw-labs/zeroclaw/issues/3542) and token-usage reporting is now fixed via [#5793](https://github.com/zeroclaw-labs/zeroclaw/pull/5793).
- **Dashboard users experienced functional and discoverability issues**, including missing SOPs in chat sessions, localization drift, and unclear runtime context in ZeroCode.

## 8. Backlog Watch

- **[#9935](https://github.com/zeroclaw-labs/zeroclaw/pull/9935) — feat(vi): preserve unknown constraint types and read strictness mode**  
  Open, `needs-maintainer-review`, `do-not-merge`, size XL, risk high. This is a substantial PR that has been waiting for maintainer action.

- **[#10070](https://github.com/zeroclaw-labs/zeroclaw/pull/10070) — feat(tools): gate file_download against SSRF**  
  Open, `needs-maintainer-review`, `do-not-merge`, size XL, security-relevant. Rebuilt as a focused slice after prior cumulative PR feedback.

- **[#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) — RFC: Session-scoped persistent prompt attachments**  
  Open, `needs-maintainer-review`, risk high. Important for session continuity but still awaiting maintainer decision.

- **[#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) — fix(config): roll back auto-created map aliases when config set fails**  
  Open, `needs-author-action`. A correctness fix that needs author follow-up to move forward.

- **[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — feat(providers): native Hailo-Ollama support**  
  Open, `needs-author-action`, size XL. Large provider integration blocked on author updates.

- **[#5833](https://github.com/zeroclaw-labs/zeroclaw/issues/5833) and [#5843](https://github.com/zeroclaw-labs/zeroclaw/issues/5843)** remain `status:blocked` — session ownership for destructive operations and per-model reasoning configuration both need unblocking before they can proceed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*