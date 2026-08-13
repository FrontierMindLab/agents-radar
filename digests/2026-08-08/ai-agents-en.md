# OpenClaw Ecosystem Digest 2026-08-08

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-07 16:38 UTC

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

# OpenClaw Project Digest — 2026-08-08

## 1. Today's Overview

OpenClaw had a very active 24-hour cycle: 500 issues were updated (438 open/active, 62 closed) and 500 PRs were updated (382 open, 118 merged/closed), with **0 new releases**. The project is clearly in a high-volume stabilization phase: bug reports and fix PRs heavily outnumber feature work, and the dominant themes are **silent message loss, session-state corruption, provider/model compatibility, compaction failures, and Windows-specific defects**. A significant share of P1/P2 issues are still waiting on maintainer review or product decisions, suggesting triage bandwidth is a current bottleneck. No release was published, so this digest focuses entirely on issues and PRs.

## 2. Releases

**None.** There were no new releases in the last 24 hours, so no changelog, breaking-change, or migration notes are available.

## 3. Project Progress

The source data provides aggregate merge/close counts but does not enumerate individual merged PRs. However, closed issues and active fix PRs show clear progress areas:

**Closed issues in the visible window:**
- [#116277](https://github.com/openclaw/openclaw/issues/116277) — **DeepSeek v4 Flash silent reply failure** was closed after 115 comments.
- [#119090](https://github.com/openclaw/openclaw/issues/119090) — **P0 managed media cleanup data loss** was closed; the bug could permanently delete generated media when the session store was unreadable.
- [#58822](https://github.com/openclaw/openclaw/issues/58822) — **Subagent model precedence** issue was closed.

**Active fix PRs to watch, likely close to landing:**
- [#120248](https://github.com/openclaw/openclaw/pull/120248) — Fixes Bedrock `O(n²)` tool-call argument re-parsing, targeting the “write/exec params silently dropped” bug family.
- [#120276](https://github.com/openclaw/openclaw/pull/120276) — Treats OpenAI Responses thinking signatures as untrusted JSON during replay, preventing one bad history block from bricking a session.
- [#119741](https://github.com/openclaw/openclaw/pull/119741) — Prevents memory spikes during large transcript cleanup.
- [#120075](https://github.com/openclaw/openclaw/pull/120075) — Fixes gateway stalls after each agent turn on multi-agent installs.
- [#120259](https://github.com/openclaw/openclaw/pull/120259) / [#120262](https://github.com/openclaw/openclaw/pull/120262) — Discord session cleanup and quota suspension ownership fixes.
- [#120260](https://github.com/openclaw/openclaw/pull/120260) — iMessage monitor no longer drops user text that collides with recent outbound sends.

## 4. Community Hot Topics

The most active discussions reflect deep user concern about **silent failure modes** and **state-management reliability**.

- [#116277](https://github.com/openclaw/openclaw/issues/116277) — **DeepSeek v4 Flash silent reply failure** (115 comments, closed). A model turn silently produced no reply and OpenClaw posted a generic fallback. The high comment count shows how damaging silent, non-retried failures are.
- [#7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (28 comments). Long-running feature request to prevent memory poisoning from web pages, third-party skills, and untrusted messages. Underlying need: memory-security boundary.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — **Subagent completion silently lost** (25 comments, 👍2). Multiple failure modes with no retry, no notification, and no auto-restart on timeout.
- [#92201](https://github.com/openclaw/openclaw/issues/92201) — **Anthropic thinking signatures invalid on replay** (21 comments, 👍1). The recovery wrapper never fires because the error text is genericized.
- [#84583](https://github.com/openclaw/openclaw/issues/84583) — **cron announce triggers `EmbeddedAttemptSessionTakeoverError`** (12 comments, 👍3). Collision between cron delivery and an actively chatting user.
- [#53408](https://github.com/openclaw/openclaw/issues/53408) — **write/exec tool parameters silently dropped after long conversations** (10 comments, 👍2). Directly targeted by PR [#120248](https://github.com/openclaw/openclaw/pull/120248).

**Underlying pattern:** users are not just reporting errors; they are reporting errors that are *silent* — no retry, no fallback, no notification — or that leave sessions in a permanently broken state.

## 5. Bugs & Stability

Ranked by severity, with attention to available fix PRs.

**P0 / critical:**
- [#119263](https://github.com/openclaw/openclaw/issues/119263) — Agent DB v14→v15 migration fails with `no such column: entry_valid`; gateway refuses to start. A fix PR is linked/open.
- [#118772](https://github.com/openclaw/openclaw/issues/118772) — `sessionEntry.totalTokens` inflation causes premature compaction at 4–8% of the context window, causing data loss. A fix PR is linked/open.
- [#119090](https://github.com/openclaw/openclaw/issues/119090) — Managed media cleanup failed open and permanently deleted generated media; closed in this window.

**High-impact P1s:**
- [#92241](https://github.com/openclaw/openclaw/issues/92241) — Gateway holds stale module import paths after update/rollback; inbound messages silently dropped with `ERR_MODULE_NOT_FOUND`.
- [#92415](https://github.com/openclaw/openclaw/issues/92415) — `AgentSession.this.model` snapshot is never refreshed after `/model`, affecting context window, reasoning, and branch summaries.
- [#109881](https://github.com/openclaw/openclaw/issues/109881) — Bedrock has no thinking-signature replay protection; `Invalid signature in thinking block` can permanently brick Claude 4+ sessions.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Subagent completion results silently lost; no retry or restart.
- [#117209](https://github.com/openclaw/openclaw/issues/117209) — `AuthProfileStoreUnreadable` becomes sticky after runtime snapshot publication failure.
- [#117445](https://github.com/openclaw/openclaw/issues/117445) — Feishu inbound DMs decode as `?` and never receive replies.
- [#117358](https://github.com/openclaw/openclaw/issues/117358) — Post-turn compaction ignores compaction/reset boundaries and delays completed replies.
- [#119692](https://github.com/openclaw/openclaw/issues/119692) — OpenAI-compatible streaming drops token usage for MiniMax-M3; transcript written as all-zero usage.
- [#119087](https://github.com/openclaw/openclaw/issues/119087) — Gateway cold start regressed ~2.5x on 1-vCPU containers between beta releases.

**Windows-specific cluster:**
- [#91144](https://github.com/openclaw/openclaw/issues/91144) — Windows Scheduled Task gateway does not stay running; foreground window works.
- [#117644](https://github.com/openclaw/openclaw/issues/117644) — Agent emits Unix commands in PowerShell on Windows, broader than previously reported.
- [#119796](https://github.com/openclaw/openclaw/issues/119796) — Windows vitest teardown fails with `EBUSY` on `openclaw-agent.sqlite`; fix PR [#119964](https://github.com/openclaw/openclaw/pull/119964) is open.
- [#102755](https://github.com/openclaw/openclaw/issues/102755) — Build hangs on second launch without cleaning on Windows/WSL; labeled beta release blocker.

## 6. Feature Requests & Roadmap Signals

The visible feature requests skew toward **trust, memory control, and operational hardening**.

- [#7707](https://github.com/openclaw/openclaw/issues/7707) — **Memory Trust Tagging by Source** (28 comments). Strong candidate for a future release if security/product review lands.
- [#6757](https://github.com/openclaw/openclaw/issues/6757) — **Agent-triggered context compaction / self-compact tool**. Fits the current compaction pain and may be picked up alongside compaction fixes.
- [#6599](https://github.com/openclaw/openclaw/issues/6599) — **`/models test-fallback` command**. Small, practical feature for verifying fallback chains without waiting for a real provider failure.
- [#53654](https://github.com/openclaw/openclaw/issues/53654) — **Discord `messageUpdate`/`messageDelete` support** for edit-to-reprocess and delete-to-cancel. High user interest (👍3).
- [#116268](https://github.com/openclaw/openclaw/issues/116268) — **Worker reconnect backoff jitter** to prevent thundering herd after gateway restarts. Simple operational hardening.
- [#91455](https://github.com/openclaw/openclaw/issues/91455) — Kubernetes documentation improvement request.
- [#118785](https://github.com/openclaw/openclaw/issues/118785) — Maintainer-driven QA proof tracking for containers and external app SDKs.

**Prediction:** the next release will likely prioritize fixes for DB migration, premature compaction/data loss, and provider replay issues rather than large new features. The smaller feature candidates — reconnect jitter, self-compact, fallback testing — could ride along once the stability backlog clears.

## 7. User Feedback Summary

User sentiment in this window is dominated by **frustration with silent failures and session fragility**.

- **Silent message loss is the top pain point.** DeepSeek, Slack, Telegram, Feishu, iMessage, and cron delivery paths all show reports where replies are generated but never delivered, or where failures produce generic fallback messages instead of retries.
- **Session state is fragile.** Users report takeover errors, stale model snapshots after `/model`, unrecoverable Codex tombstones, and sessions that cannot be rescued by `/new`.
- **Regression awareness is high.** Users are specifically calling out regressions: cold start slowdowns, prompt cache hit rate collapse from 99.9% to 22%, compaction failures, zombie process accumulation, and stale module paths after rollback.
- **Security concerns are emerging.** Memory poisoning (#7707) and credential leakage in error bodies (PRs [#119538](https://github.com/openclaw/openclaw/pull/119538), [#119970](https://github.com/openclaw/openclaw/pull/119970)) are being reported seriously.
- **Positive signals:** many reports include high-quality repros and root-cause analysis, and the maintainer bot/labeling system is visibly active. The 118 merged/closed PRs and 62 closed issues in 24 hours show that fixes are being shipped, even if the visible window is dominated by open P1s.

## 8. Backlog Watch

Several important issues have been open for months and still carry `needs-maintainer-review` or `needs-product-decision` labels:

- [#7707](https://github.com/openclaw/openclaw/issues/7707) — Memory Trust Tagging by Source. Open since Feb 3, 28 comments, still needs maintainer/product/security review.
- [#6757](https://github.com/openclaw/openclaw/issues/6757) — Agent-triggered self-compaction. Open since Feb 2.
- [#6599](https://github.com/openclaw/openclaw/issues/6599) — `/models test-fallback` command. Open since Feb 1.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Subagent completion silently lost. P1, open since Mar 13.
- [#92201](https://github.com/openclaw/openclaw/issues/92201) — Anthropic thinking signature replay invalidity. P1, open since Jun 11.
- [#92415](https://github.com/openclaw/openclaw/issues/92415) — `/model` snapshot never refreshed. P1, open since Jun 12.
- [#92241](https://github.com/openclaw/openclaw/issues/92241) — Gateway stale module import paths after rollback. P1, open since Jun 11.
- [#90711](https://github.com/openclaw/openclaw/issues/90711) — launchd `StandardErrorPath` hardcoded to `/dev/null`, hiding gateway stderr. Open since Jun 5.
- [#91144](https://github.com/openclaw/openclaw/issues/91144) — Windows Scheduled Task gateway does not stay running. Labeled `no-stale`, `fix-shape-clear`, `queueable-fix`.
- [#92884](https://github.com/openclaw/openclaw/issues/92884) — `config validate` rejects plugin-owned channel schema extensions. Open since Jun 14.

**PRs ready for maintainer attention:**
- [#114900](https://github.com/openclaw/openclaw/pull/114900) — Windows bash session output decoding.
- [#119741](https://github.com/openclaw/openclaw/pull/119741) — Memory spikes during large transcript cleanup.
- [#120075](https://github.com/openclaw/openclaw/pull/120075) — Multi-agent gateway stalls.
- [#120254](https://github.com/openclaw/openclaw/pull/120254) — Malformed percent-encoding in JSON Schema `$ref` anchors.
- [#120198](https://github.com/openclaw/openclaw/pull/120198) — Context-engine warning when legacy host params are withheld.
- [#120247](https://github.com/openclaw/openclaw/pull/120247) — Android chat drafts readability on compact screens.

Overall, the project is highly active and responsive, but the current health risk is concentrated in **silent failure modes, session-state integrity, and maintainer review capacity**. The next release will likely be judged by how many of the P0/P1 data-loss and message-loss issues are actually resolved.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date:** 2026-08-08 | **Coverage:** 12 tracked projects, 24-hour digest window

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is in a **stabilization phase**: the dominant engineering effort across all major projects is not new features but the elimination of **silent failure modes, session-state corruption, and data-loss bugs**. Activity is concentrated in a top tier of five projects (OpenClaw, Hermes, IronClaw, ZeroClaw, CoPaw) that each process 50+ issues and 50+ PRs per day, while several smaller projects show healthy but quieter maintenance cadences. Cross-project convergence is visible around **context compaction reliability, provider/model compatibility, secret-handling security, and channel parity** (Telegram, WhatsApp, Feishu, Slack, WeChat). Notably, only one release shipped across all projects in this window (CoPaw v2.1.0-beta.2), and no project published a stable release — the ecosystem is shipping fixes faster than releases. Security is emerging as a first-class concern: four projects logged API-key leakage or secret-exposure findings in a single 24-hour period.

## 2. Activity Comparison

| Project | Issues Updated (Open/Closed) | PRs Updated (Open/Merged) | Release This Window | Health Score (1–10) |
|---|---|---|---|---|
| **OpenClaw** | 500 (438 / 62) | 500 (382 / 118) | None | 7 |
| **Hermes Agent** | 50 (44 / 6) | 50 (41 / 9) | None (v0.20.0 on Aug 3) | 6 |
| **IronClaw** | 50 (38 / 12) | 50 (27 / 23) | None | 7 |
| **ZeroClaw** | 50 (45 / 5) | 50 (44 / 6) | None (v0.8.x cycle) | 6 |
| **CoPaw** | 27 (16 / 11) | 50 (28 / 22) | **v2.1.0-beta.2** | 6 |
| **NanoBot** | 11 (9 / 2) | 21 (10 / 11) | None | 8 |
| **NanoClaw** | 0 | 14 (8 / 6) | None | 7 |
| **LobsterAI** | 7 (4 / 3) | 7 (1 / 6) | None (release branch merged) | 8 |
| **PicoClaw** | 1 (0 / 1) | 5 (4 / 1) | None | 6 |
| **NullClaw** | 0 | 0 | None | N/A (inactive) |
| **Moltis** | 0 | 0 | None | N/A (inactive) |
| **ZeptoClaw** | 0 | 0 | None | N/A (inactive) |

**Health score rationale:** closure throughput, severity of open P1/P0 items, maintainer responsiveness, and release cadence. NanoBot and LobsterAI score highest due to exceptional merge ratios and quick fix-to-merge cycles. Hermes, ZeroClaw, and CoPaw carry unresolved P1 data-loss/security clusters despite high activity.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Community scale is unmatched:** 500 issues + 500 PRs/day is an order of magnitude above every peer (next tier: 50/50). This yields faster bug discovery and a deeper contributor pool — 118 PRs merged/closed in 24 hours alone.
- **Reference-implementation status:** OpenClaw is the core engine that several peers explicitly integrate with (LobsterAI ships OpenClaw configuration improvements; NanoClaw/CoPaw share lineage patterns). It sets the de facto API/session-model conventions.
- **Broadest provider/channel matrix:** Bedrock, OpenAI, Anthropic, DeepSeek, MiniMax plus Feishu, iMessage, Discord, Slack, Telegram — no peer matches this coverage.
- **High-quality community signal:** users consistently file root-cause analyses and repros; the maintainer bot/labeling system is visibly active, enabling faster triage despite volume.

**Technical approach differences:**
- OpenClaw is a **session-store-centric core engine** (agent DB, compaction, gateway) rather than a desktop app (Hermes, LobsterAI, CoPaw) or a lightweight channel wrapper (NanoBot, PicoClaw). It pays a cost in complexity — its P0/P1 backlog is dominated by session-state corruption, compaction failures, and provider replay bugs — but this depth is exactly what makes it the reference point for the ecosystem.
- Its primary bottleneck is **maintainer review capacity**: a significant share of P1/P2 issues carry `needs-maintainer-review` labels, a problem less visible in smaller projects.

**Community comparison:**

| Dimension | OpenClaw | Next-largest (Hermes / IronClaw / ZeroClaw) |
|---|---|---|
| Daily issue updates | 500 | 50 |
| Daily PR updates | 500 | 50 |
| Closure rate (24h) | 62 issues / 118 PRs | 5–12 issues / 6–23 PRs |
| Release cadence | None this window | None this window |

---

## 4. Shared Technical Focus Areas

Requirements emerging across multiple projects, ranked by cross-project consensus:

1. **Silent message/response loss elimination** — *OpenClaw, Hermes, NanoClaw, LobsterAI, ZeroClaw.* Users across five projects report replies generated but never delivered, generic fallbacks replacing failed responses, or unknown commands producing zero output. Demand: retries, explicit failure surfacing, and user-visible error propagation.

2. **Context compaction reliability** — *OpenClaw, Hermes, CoPaw, NanoClaw.* Dropped in-flight tool chains, permanently dead sessions after compression hangs, premature compaction due to token-count inflation, and memory-triggered loops. Demand: compaction must be transactional and never lose tool results.

3. **Secret handling / credential leakage** — *ZeroClaw (2 findings), NanoBot, Hermes, OpenClaw.* API keys in logs, keys leaked to CLI subprocesses, secrets persisted unredacted in verification evidence, credentials in error bodies. Demand: centralized redaction and secure secret storage as a default, not a patch.

4. **Provider/model compatibility & fallback correctness** — *OpenClaw, ZeroClaw, PicoClaw, LobsterAI, CoPaw, NanoClaw.* Fallback chains that can never fire, model IDs containing slashes breaking custom providers, provider-specific replay signatures bricking sessions, request bodies rejected by strict providers. Demand: robust fallback chains, per-provider adaptation layers, and `/models test-fallback`-style verification tooling.

5. **Per-session isolation & workspace security** — *NanoBot, ZeroClaw, OpenClaw.* Session history reachable by agent tools, temp-file isolation across sessions, workspace-relative forbidden paths (`.zeroclawignore`), memory poisoning via untrusted web/channel content. Demand: enforceable security boundaries between agent, workspace, and session data.

6. **Token/usage transparency** — *NanoBot, IronClaw, OpenClaw.* Unexpected token burn, content-reference-string token estimates instead of actual content, zeroed usage in transcripts. Demand: per-call cost observability.

7. **Channel parity** — *OpenClaw, NanoBot, Hermes, CoPaw, ZeroClaw.* Users expect native platform behavior: WhatsApp audio, Telegram stickers/reactions, Matrix threading, Feishu media, Slack DMs. Demand: each channel adapter must match the source platform's semantics.

8. **Windows as a first-class platform** — *OpenClaw, Hermes, LobsterAI, CoPaw.* Scheduled-task gateways dying, PowerShell vs. Unix commands, `pythonw.exe` not killed during updates, installer/watchdog failures, antivirus false positives. Demand: Windows CI coverage and installer hardening.

9. **MCP/plugin ecosystem standardization** — *NanoClaw (Tavily MCP skill), ZeroClaw (Agent Plugins 1.0 RFC), NanoBot (Agent Plugins v1 PR), OpenClaw (plugin-owned schema extensions).* Vendor-neutral plugin formats and MCP tool lifecycle reliability are converging across the ecosystem.

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architectural Signature |
|---|---|---|---|
| **OpenClaw** | Universal agent core; maximum provider/channel breadth | Self-hosters, power users, developers building agents | Session-store-centric gateway; agent DB + compaction; no bundled UI |
| **Hermes Agent** | Desktop-first agent workstation; vision + A2A protocol | Professional/enterprise users, desktop power users | Desktop app + gateway split; TUI/curator; god-file sharding epic; OAuth MCP |
| **IronClaw** | Platform with heavy **observability** (Inspector suite) + WebUI v2 | Managed/hosted users, QA-conscious teams | Runner-based execution; pi-harness adoption; Extensions vNext; bug-bash-driven stabilization |
| **ZeroClaw** | **Rust-based** security-conscious agent with formal RFC governance | Security-sensitive, self-hosted, Rust ecosystem | RFC process for all changes; SOP subsystem; OTel observability; workspace path guards |
| **CoPaw (QwenPaw)** | Consumer-friendly assistant with desktop mode + Chinese channels | Chinese-market users, Docker self-hosters | Docker distribution; WeChat/OneBot/QQ; desktop app mode; high first-time-contributor influx |
| **NanoBot** | Lightweight channel-first assistant with polished WebUI | Small deployments, channel-centric users (Telegram/Matrix/WeChat) | Session-isolation focus; Dream memory archival; rapid fix cadence |
| **NanoClaw** | Skills/MCP ecosystem expansion + scheduled automation | Automation-oriented users | Skills/tools as extension mechanism; scheduling fixes; progress-card UX |
| **LobsterAI** | Desktop app **integrating OpenClaw** + Cowork collaboration | Enterprise users (NetEase Youdao lineage), Windows-heavy | Electron-style desktop; release-branch workflow; SiliconFlow/custom-provider support |
| **PicoClaw** | Lightweight Claw variant; WhatsApp/QQ channels | Low-resource/hobbyist deployments (Sipeed ecosystem) | Minimal footprint; whatsmeow-based WhatsApp; single maintainer |
| **NullClaw / Moltis / ZeptoClaw** | Inactive this window | — | — |

---

## 6. Community Momentum & Maturity

**Tier 1 — High-velocity, scaling challenges (railwaying fixes, triage pressure):**
- **OpenClaw** — Massive volume; stabilization-phase; P0 data-loss fixes landing but release-starved. Health risk: maintainer review capacity.
- **Hermes Agent** — High activity with architectural governance (sharding epic); shipping 9 PRs/day but carrying P1 compression bugs. Health risk: regression accumulation from 0.20.0.
- **IronClaw** — Strongest closure ratio in Tier 1 (23 PRs merged); bug-bash program is converting feedback into fixes rapidly. Health risk: runner/heartbeat infrastructure reliability.
- **ZeroClaw** — Engaged contributor base with formal RFC culture; 6 PRs merged but SOP-subsystem bug cluster and 2 security findings open. Health risk: process overhead, stale accepted RFCs.
- **CoPaw** — Fast-moving with 22 PRs merged and a beta release; high first-time contributor flow. Health risk: user-facing stability (Docker, MCP, desktop regressions).

**Tier 2 — Healthy, responsive, lower volume:**
- **NanoBot** — 11/21 PRs merged; security PRs (API key leakage, session isolation) pending review. Rapidly maturing toward enterprise-secure defaults.
- **NanoClaw** — Clean issue tracker; 6 fixes merged covering real user-input-loss bugs; long-open PR #2346 (since May) is the main backlog concern.
- **LobsterAI** — Best merge ratio in the ecosystem (6/7 PRs); release branch integrated; responsive to user-reported SiliconFlow bug with same-day fix PR.

**Tier 3 — Low activity / idle:**
- **PicoClaw** — Actively patching (3 fix PRs today) but small contributor base; WhatsApp channel is dead pending a dependency bump.
- **NullClaw, Moltis, ZeptoClaw** — No activity; effectively dormant or pre-announcement.

---

## 7. Trend Signals

Extracted from community feedback across all projects; actionable for AI agent developers:

1. **Silent failure is the #1 trust killer.** The most common complaint across OpenClaw, Hermes, NanoClaw, ZeroClaw, and LobsterAI is not that errors happen — it's that they happen **without retry, notification, or recovery**. Agents must treat every delivery, tool call, and compaction as an observable, retryable transaction. This is the single strongest product requirement in the ecosystem right now.

2. **Security is shifting from feature to default.** API key leakage, memory poisoning, history accessible to agent tools, and unredacted secrets in persisted state were reported in four projects in one window. Expect security review to become a release gate, and expect demand for: sandboxed session isolation, secret redaction layers, and trust-tagged memory sources.

3. **Long-session reliability is the frontier.** Compaction/compression bugs dominate P1 backlogs across OpenClaw, Hermes, and CoPaw. As context windows grow (DeepSeek 500k-token sessions), the bottleneck shifts from model capacity to **state-transition integrity** — how the agent compacts, compresses, and recovers without dropping in-flight work.

4. **Provider fragmentation demands abstraction.** Slashed model IDs, provider-specific replay signatures, fallback chains that never fire, and strict-provider request rejection show that providers are diverging faster than agents can adapt. A robust **provider abstraction layer with testable fallback verification** is a cross-project opportunity.

5. **Channel parity is a retention driver.** Users compare agent behavior against the native platform — WhatsApp audio, Telegram stickers, Matrix threads, Feishu media. Channel adapters are UX surfaces, not plumbing.

6. **Token/usage transparency is becoming table stakes.** Users are filing observability requests (NanoBot token logging, IronClaw accounting, OpenClaw usage stats) because hidden token burn erodes trust in cost and behavior.

7. **Governance and code health are scaling pain points.** Extremely active projects are investing in structural responses: Hermes's god-file sharding epic, ZeroClaw's RFC Work Lanes, IronClaw's bug-bash program, OpenClaw's labeling automation. **Maturity is now measured by how the project handles its own complexity**, not just feature velocity.

8. **MCP and vendor-neutral plugin formats are consolidating.** Agent Plugins v1, Tavily MCP skills, and plugin ecosystem RFCs appeared simultaneously across NanoBot, NanoClaw, and ZeroClaw. A standardized, sandboxed plugin format is the likely next ecosystem-wide convention.

---

*Report generated from official GitHub activity digests for 2026-08-08. Data reflects a single 24-hour window and is directional, not a full historical trend.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-08

## 1. Today's Overview
NanoBot is in an active maintenance-and-feature cycle: 11 issues were updated in the last 24 hours (9 open, 2 closed) and 21 PRs were updated (10 open, 11 merged/closed). No new releases were published. The dominant themes are session/workspace security and isolation, channel reliability (Telegram, Matrix, WeChat, WhatsApp), and WebUI polish. Maintainer responsiveness appears strong, with several reported regressions receiving fix PRs within the same update window. The overall project-health signal is positive, though some long-standing issues and security PRs still need attention.

## 2. Releases
No new releases in this digest window, so there are no release notes, breaking changes, or migration steps to report.

## 3. Project Progress
Eleven PRs were closed/merged in the last 24 hours:

- [#5287](https://github.com/HKUDS/nanobot/pull/5287) — `fix(channels): preserve global progress defaults`
- [#5285](https://github.com/HKUDS/nanobot/pull/5285) — `fix(webui): preserve newly created topic route`
- [#5284](https://github.com/HKUDS/nanobot/pull/5284) — `refactor(webui): remove legacy session messages route`
- [#5282](https://github.com/HKUDS/nanobot/pull/5282) — `fix: modernize dependency recovery guidance`
- [#5281](https://github.com/HKUDS/nanobot/pull/5281) — `fix(webui): keep activity text crisp while fading edges`
- [#5277](https://github.com/HKUDS/nanobot/pull/5277) — `feat(webui): expand model preset editor inline`
- [#5272](https://github.com/HKUDS/nanobot/pull/5272) — `fix(session): preserve proactive channel delivery during session retention trimming` — fixes [#5273](https://github.com/HKUDS/nanobot/issues/5273)
- [#5268](https://github.com/HKUDS/nanobot/pull/5268) — `fix(webui): stage out-of-media-root attachments on history reads` — fixes [#5264](https://github.com/HKUDS/nanobot/issues/5264)
- [#5263](https://github.com/HKUDS/nanobot/pull/5263) — `fix(weixin): harden protocol delivery, streaming, and login`
- [#5280](https://github.com/HKUDS/nanobot/pull/5280) — `fix(memory): archive short idle sessions for Dream`
- [#5231](https://github.com/HKUDS/nanobot/pull/5231) — `feat(memory): archive idle sessions for Dream`

Progress areas include WebUI reliability and refactoring, WeChat protocol hardening, session-retention correctness, and improved Dream/memory archival. Notably, history/media handling was first fixed in [#5268](https://github.com/HKUDS/nanobot/pull/5268) and then the legacy route was removed in [#5284](https://github.com/HKUDS/nanobot/pull/5284), signaling ongoing API consolidation.

Open PRs that may land soon include [#5288](https://github.com/HKUDS/nanobot/pull/5288) (Agent Plugins v1 skills), [#5283](https://github.com/HKUDS/nanobot/pull/5283) (per-session sandbox isolation), [#5286](https://github.com/HKUDS/nanobot/pull/5286) (Matrix thread isolation), and [#5252](https://github.com/HKUDS/nanobot/pull/5252) (WebUI temporary chat).

## 4. Community Hot Topics
The most active community conversations are all issues, by comment count:

- [#5266](https://github.com/HKUDS/nanobot/issues/5266) — Token consumption logging (10 comments). Users report unexpectedly high token burn and want per-call observability.
- [#5149](https://github.com/HKUDS/nanobot/issues/5149) — "no audio?" on WhatsApp (5 comments). Audio sending is broken for at least one deployment.
- [#5198](https://github.com/HKUDS/nanobot/issues/5198) — Inability to change models per session (3 comments). Users expect model switching to work like cloud AI chat UIs.
- [#5276](https://github.com/HKUDS/nanobot/issues/5276) — Session-level temporary file isolation (2 comments). Multi-session users want enforceably separate temporary files.

The underlying needs are: **transparency** in token usage, **channel parity** for media features, **per-session control** over model choice, and **stronger isolation** for concurrent sessions.

## 5. Bugs & Stability
Ranked by severity:

1. **Security — Session history reachable by agent tools**  
   [#5278](https://github.com/HKUDS/nanobot/issues/5278): session history lives inside the agent workspace, so an agent with `restrict_to_workspace` can read session data.  
   Fix PR: [#5279](https://github.com/HKUDS/nanobot/pull/5279) is open.

2. **Security — API key leakage into CLI subprocesses**  
   PR [#5270](https://github.com/HKUDS/nanobot/pull/5270) is a `priority: p1` fix for leaking provider API keys into untrusted CLI app subprocesses. It is still open and needs review/merge.

3. **Functional — WhatsApp audio sending broken**  
   [#5149](https://github.com/HKUDS/nanobot/issues/5149): audio messages are received but not sent. No linked fix PR yet.

4. **Functional — Repeated replies from `/goal`**  
   [#5256](https://github.com/HKUDS/nanobot/issues/5256): one `/goal` message produces dozens of near-identical replies while waiting for user input. No linked fix PR yet.

5. **Functional/UX — Model switching blocked per session**  
   [#5198](https://github.com/HKUDS/nanobot/issues/5198): `/model` does not behave as expected per session. No linked fix PR yet.

6. **Fixed this window**  
   - [#5264](https://github.com/HKUDS/nanobot/issues/5264) — history endpoint missing `media_urls`; fixed by [#5268](https://github.com/HKUDS/nanobot/pull/5268).  
   - [#5273](https://github.com/HKUDS/nanobot/issues/5273) — session retention trimming dropped proactive delivery messages; fixed by [#5272](https://github.com/HKUDS/nanobot/pull/5272).

## 6. Feature Requests & Roadmap Signals
Several feature signals are visible:

- [#5266](https://github.com/HKUDS/nanobot/issues/5266) — Token-consumption logging is a high-demand observability feature.
- [#5276](https://github.com/HKUDS/nanobot/issues/5276) — Per-session temporary file isolation; aligned with open PR [#5283](https://github.com/HKUDS/nanobot/pull/5283).
- [#5289](https://github.com/HKUDS/nanobot/issues/5289) — Telegram sticker support and agent-initiated message reactions.
- [#5288](https://github.com/HKUDS/nanobot/pull/5288) — Agent Plugins v1 skills support, a vendor-neutral plugin format.
- [#5252](https://github.com/HKUDS/nanobot/pull/5252) — Temporary chat mode in the WebUI.
- [#5274](https://github.com/HKUDS/nanobot/issues/5274) / [#5275](https://github.com/HKUDS/nanobot/issues/5275) — Matrix reply/thread context improvements; related fix PR [#5286](https://github.com/HKUDS/nanobot/pull/5286) is open.
- [#4276](https://github.com/HKUDS/nanobot/pull/4276) — Model-agnostic computer use (`computer_use` + browser tools) remains a long-lived, larger-scope enhancement.

Based on the current open-PR set and the project’s recent close cadence, likely near-term additions include Agent Plugins v1 skills, per-session sandbox isolation, Matrix thread session isolation, and temporary chat mode. The computer-use feature appears to be a longer-term roadmap item.

## 7. User Feedback Summary
User pain points center on **resource transparency**, **channel reliability**, and **session/model flexibility**. The token-burn complaint in [#5266](https://github.com/HKUDS/nanobot/issues/5266) reflects strong dissatisfaction with hidden consumption. WhatsApp audio brokenness ([#5149](https://github.com/HKUDS/nanobot/issues/5149)) and Matrix threading gaps ([#5274](https://github.com/HKUDS/nanobot/issues/5274), [#5275](https://github.com/HKUDS/nanobot/issues/5275)) show that users expect native behavior from each channel. Session-isolation discussions ([#5276](https://github.com/HKUDS/nanobot/issues/5276), [#5278](https://github.com/HKUDS/nanobot/issues/5278)) indicate a growing enterprise/secure-deployment use case. On the positive side, users are using NanoBot for proactive workflows: #5273 shows cron/job delivery mattered enough to be reported and was fixed quickly via [#5272](https://github.com/HKUDS/nanobot/pull/5272). Overall, users seem engaged but sensitive to regressions and to silent behavior such as token consumption and model-switching failures.

## 8. Backlog Watch
Items that appear to need maintainer attention:

- [#5149](https://github.com/HKUDS/nanobot/issues/5149) — WhatsApp audio sending bug, open since 2026-07-28, 5 comments, no fix PR.
- [#5198](https://github.com/HKUDS/nanobot/issues/5198) — Per-session model switching broken, open since 2026-07-31, 3 comments, no fix PR.
- [#5156](https://github.com/HKUDS/nanobot/pull/5156) — Telegram silently stalled polling fix; open since 2026-07-29, `p2`, needs review/merge.
- [#4276](https://github.com/HKUDS/nanobot/pull/4276) — Computer-use/browser tools PR; open since 2026-06-10, needs maintainer direction or review.
- [#5252](https://github.com/HKUDS/nanobot/pull/5252) — WebUI temporary chat mode; open since 2026-08-05.
- [#5260](https://github.com/HKUDS/nanobot/pull/5260) — Memory: ignore runtime files in tracked workspace dirs; open since 2026-08-05.
- [#5270](https://github.com/HKUDS/nanobot/pull/5270) — Security `p1`: stop API key leakage to CLI subprocesses; should be prioritized.
- [#5279](https://github.com/HKUDS/nanobot/pull/5279) — Security: store session history outside agent workspace; open follow-up to [#5278](https://github.com/HKUDS/nanobot/issues/5278).

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-08

## 1. Today's Overview

Hermes Agent is in a high-activity period: **50 issues** and **50 PRs** were updated in the last 24 hours (44 issues and 41 PRs remaining open), with no new release published. The project's dominant narrative is the **repo-wide god-file sharding epic** — a standing policy to decompose large modules, led by the `context_compressor` refactor — which is generating sustained community discussion (84 combined comments across two issues). At the same time, a wave of **P1/P2 bugs** is concentrated around context-compression reliability (dropped tool chains, permanently dead sessions) and desktop/gateway session-state handling, indicating the recent 0.20.0 release ("The Herald Release") introduced or surfaced regressions that maintainers are actively patching. Nine PRs were merged or closed today, including fixes for Feishu message delivery, WhatsApp @mention support, session-key isolation, and a desktop review-pane git bug.

## 2. Releases

**No new releases in the last 24 hours.** The latest known version remains **v0.20.0 (2026.8.3)**, "The Herald Release," referenced by users reporting regressions in this digest (issues #80989, #81163). No release notes, migration guides, or breaking-change notices are available for this digest period.

## 3. Project Progress

Nine PRs were merged or closed today. Key landed work:

- **[#81122 — fix(gateway): honor per-platform group/thread session isolation in session keys](https://github.com/NousResearch/hermes-agent/pull/81122)** (closed/merged) — Fixes a divergence where `SessionStore._generate_session_key` read `group_sessions_per_user` / `thread_sessions_per_user` only from global config while platform adapters resolved per-platform `extra.*` overrides. This prevents cross-session message mixing.
- **[#81155 — feat(whatsapp): WhatsApp @mention tagging support](https://github.com/NousResearch/hermes-agent/pull/81155)** (closed/merged) — Inbound `mentionedJid` extraction is now surfaced to the agent, and the outbound send path supports @mentions.
- **[#81153 — feat(vision): optional region zoom crop on vision_analyze](https://github.com/NousResearch/hermes-agent/pull/81153)** (closed/merged) — Adds a `region: [x1, y1, x2, y2]` parameter that crops in original-image pixel space before the downscale pipeline, preserving full resolution for OCR/embed tasks.
- **[#81188 — "Mrfidal patch 1"](https://github.com/NousResearch/hermes-agent/pull/81188)** (closed) — Follow-up Nix packaging tweak from contributor mrfidal, complementing the still-open **[#74738 — fix(nix): handle missing nativeBuildInputs safely](https://github.com/NousResearch/hermes-agent/pull/74738)**.

Closed issues indicating fixes landed on `main`:
- **[#68358 — New desktop session message routed into stale TUI session after TTFB timeout](https://github.com/NousResearch/hermes-agent/issues/68358)** — labeled `sweeper:implemented-on-main`.
- **[#72762 — `/model` slow for all users: uncached credential-pool loads + live Copilot token exchange](https://github.com/NousResearch/hermes-agent/issues/72762)** — performance fix for the model picker.
- **[#77257 — Desktop git file-tree panel renders ~430k DOM nodes → 5GB+ renderer, UI freeze](https://github.com/NousResearch/hermes-agent/issues/77257)** — rendering performance issue resolved.
- **[#62825 — Vision_analyze cannot activate SSH connection to read remote files](https://github.com/NousResearch/hermes-agent/issues/62825)** — closed.

## 4. Community Hot Topics

- **[#78647 — Epic: Shard all 20 god files — repo-wide god-file decomposition](https://github.com/NousResearch/hermes-agent/issues/78647)** — 59 comments. The most active thread. A standing policy (2026-08) now mandates that all god files be sharded and "never reverted." The community is debating scope, sequencing, and the "only correct answer" for decomposition strategy. Signals a major architectural investment in maintainability for the next several releases.
- **[#78645 — Shard agent/context_compressor.py](https://github.com/NousResearch/hermes-agent/issues/78645)** — 25 comments. Sub-issue of the epic targeting the **6,789-line** `context_compressor.py` — the single most-cited source of bugs in this digest (see Bugs & Stability). Users and devs are aligning on extraction boundaries.
- **[#68358 — Bug: New desktop session message routed into stale TUI session](https://github.com/NousResearch/hermes-agent/issues/68358)** — 9 comments, now closed/fixed. A routing bug that caused answers to appear in the wrong conversation; its closure is a positive signal for session-state handling.
- **[#60535 — Add French translations for README and contributor docs](https://github.com/NousResearch/hermes-agent/issues/60535)** — 8 comments, P3, open since July 7. Documentation i18n demand continues to grow (Spanish, Chinese, Urdu already exist; French requested).
- **[#79278 — Context compression can drop an in-flight tool chain](https://github.com/NousResearch/hermes-agent/issues/79278)** — 8 comments, P1. Directly tied to `context_compressor` behavior; the community is pressing for a design fix, not a patch.

**Underlying need:** The community is signaling that the `context_compressor` god file is not just a code-quality issue — it is the root cause of data-loss-class bugs (dropped tool results, dead sessions). The sharding epic is the community-endorsed path to stability.

## 5. Bugs & Stability

Ranked by severity (P1 first). Fix PRs are noted where they exist.

**P1 — Critical**
- **[#79278 — Context compression can drop an in-flight tool chain; side effect completes, result never reaches agent, agent replays](https://github.com/NousResearch/hermes-agent/issues/79278)** — Unsafe for non-idempotent operations. No fix PR yet; related to #78981.
- **[#78981 — Session permanently dies after repeated context-compression hangs (DeepSeek 500k-token session)](https://github.com/NousResearch/hermes-agent/issues/78981)** — A stalled compression stream awaits the 600s ceiling, and the interrupted turn never recovers. Session state is unrecoverable without restart.

**P2 — High**
- **[#81169 — Feishu: post messages fail with 99992402 when routed via thread_id, no fallback](https://github.com/NousResearch/hermes-agent/issues/81169)** — Cron origin deliveries dropped in topic chats. **Fix PR exists: [#81184](https://github.com/NousResearch/hermes-agent/pull/81184)** (fall back to chat_id).
- **[#81163 — A2A outbound client tools never reach the agent's tool catalog](https://github.com/NousResearch/hermes-agent/issues/81163)** — `a2a_call`, `a2a_discover`, etc. registered inside a `register(ctx)` that never fires. **Fix PR exists: [#81190](https://github.com/NousResearch/hermes-agent/pull/81190)**.
- **[#81161 — Desktop Review pane git ops treat filenames as pathspec globs → wrong files staged/unstaged/reverted (data loss)](https://github.com/NousResearch/hermes-agent/issues/81161)** — **Fix PR exists: [#81164](https://github.com/NousResearch/hermes-agent/pull/81164)** (literalize every pathspec).
- **[#81160 — Desktop Review pane shows "No diff to show" for untracked folders](https://github.com/NousResearch/hermes-agent/issues/81160)** — distinct root cause from #64810 (`--no-index` cannot diff a directory). **Fix PR exists: [#81164](https://github.com/NousResearch/hermes-agent/pull/81164)**.
- **[#81051 — OAuth-backed MCP connections stay "parked" after teardown lock race in MCP SDK 1.26.0](https://github.com/NousResearch/hermes-agent/issues/81051)** — Only full gateway restart recovers; occurs ~4h uptime.
- **[#81050 — `hermes mcp remove` leaves orphaned `.meta.json` that revives disabled/removed servers at every gateway restart](https://github.com/NousResearch/hermes-agent/issues/81050)**.
- **[#81114 — Desktop status stack: completed background tasks show "running" indefinitely; async results not rendered until next message](https://github.com/NousResearch/hermes-agent/issues/81114)**.
- **[#79455 — Desktop chat history collapses to current turn after sending a message; session switch restores it](https://github.com/NousResearch/hermes-agent/issues/79455)**.
- **[#70026 — `force_kill_other_hermes()` misses `pythonw.exe` on Windows → venv rebuild fails "Access denied"](https://github.com/NousResearch/hermes-agent/issues/70026)**.
- **[#73779 — Feishu multiplex mode: lark_oapi WebSocket loop dies with "Future attached to a different loop"; gateway silently stops receiving](https://github.com/NousResearch/hermes-agent/issues/73779)**.
- **[#81091 — Curator TUI turn after platform turn ends prevents Discord response delivery](https://github.com/NousResearch/hermes-agent/issues/81091)**.
- **[#81117 — Feishu image replies dropped while gateway waits for clarify](https://github.com/NousResearch/hermes-agent/issues/81117)** — vision tool receives literal `[Image]` placeholder.
- **[#80952 — Windows: terminal tool blocks ~330s then falls back to WSL bash when hermes-acp is spawned by Buzz](https://github.com/NousResearch/hermes-agent/issues/80952)**.
- **[#80989 — v0.20.0: terminal/clarify tool results wrapped in content-block structure, sometimes wrong file content](https://github.com/NousResearch/hermes-agent/issues/80989)**.
- **[#72636 — Auxiliary compression 401/403 attributed to main model's provider/endpoint](https://github.com/NousResearch/hermes-agent/issues/72636)** — misleading diagnostics.
- **[#80274 — Verification status stale loop: committed files misreported as unverified, agent forced into infinite verification](https://github.com/NousResearch/hermes-agent/issues/80274)**.
- **[#47864 — Dashboard reports "Action failed (exit ?)" after successful `hermes update`](https://github.com/NousResearch/hermes-agent/issues/47864)** — long-standing (since June 17). **Fix PR exists: [#81194](https://github.com/NousResearch/hermes-agent/pull/81194)** (write completion receipt directly to action log).

**P3 — Lower**
- **[#80388 — `hermes memory status` reports "available ✓" while every retain fails](https://github.com/NousResearch/hermes-agent/issues/80388)** — status and runtime use different availability predicates.
- **[#81101 — `config set` has no sensitive-key guard; agent can flip `approvals.mode` via official CLI](https://github.com/NousResearch/hermes-agent/issues/81101)** — security policy bypass.
- **[#81189 — Verification-evidence commands stored with raw secrets, replayed unredacted to TUI/desktop](https://github.com/NousResearch/hermes-agent/issues/81189)** — a **fix PR is open**: [redact secrets from persisted verification-evidence commands](https://github.com/NousResearch/hermes-agent/pull/81189).

## 6. Feature Requests & Roadmap Signals

- **[#81109 — [Feature]: orphan goal recovery — resume active goals when owning process dies (desktop PTY reaper)](https://github.com/NousResearch/hermes-agent/issues/81109)** — P3, needs-decision. A standing `/goal` (Ralph loop) is persisted in `SessionDB.state_meta` but dies with the owning process. High-value agent-autonomy feature; likely candidate for a future release if prioritized.
- **[#60535 — French translations for README and contributor docs](https://github.com/NousResearch/hermes-agent/issues/60535)** — P3, open since July 7. Documentation i18n is an ongoing community request; French is the next logical addition.
- **[#81185 — PR: optional document-to-action-items skill](https://github.com/NousResearch/hermes-agent/pull/81185)** — Converts PDFs/scans/contracts into cited obligations, deadlines, and risks. Practical enterprise-oriented agent capability.
- **[#81195 — PR: Telegram nested model picker navigation](https://github.com/NousResearch/hermes-agent/pull/81195)** — Provider/category/speed/model hierarchical picker with fail-closed search.
- **[#80441 — PR: CSS `content-visibility` for inactive tab panes](https://github.com/NousResearch/hermes-agent/pull/80441)** — Desktop performance optimization; complements the merged #77257 DOM-node fix.
- **[#81191 — PR: gateway serves range-requested files inline so remote media plays](https://github.com/NousResearch/hermes-agent/pull/81191)** — Fixes broken audio/video playback over remote gateway/cloud connections.
- **[#81183 — PR: Telegram ignores edited-message replays](https://github.com/NousResearch/hermes-agent/pull/81183)** — Prevents historical side-effecting commands from re-dispatching on metadata-only edits.
- **[#81171 — PR: desktop waits for backend child exit before quitting](https://github.com/NousResearch/hermes-agent/pull/81171)** — Fixes leaked `hermes_cli.main serve` orphans on macOS.
- **[#81187 — PR: keep auto-TTS output inside configured safe root](https://github.com/NousResearch/hermes-agent/pull/81187)** — Security hardening (closes #80386).

Most of these features target the **desktop app** and **platform connectors (Telegram, Feishu, WhatsApp)**, suggesting the roadmap is heavily oriented toward multi-platform UX polish and reliability rather than new core agent capabilities.

## 7. User Feedback Summary

Real pain points expressed by users this period:

- **Context compression is the #1 trust issue.** Two P1 bugs describe data-loss-class failures: dropped in-flight tool chains with side effects that then get **replayed** (#79278), and sessions that **permanently die** after compression hangs (#78981). Users on long-running, high-token sessions (DeepSeek 500k-token) are most exposed.
- **Desktop app UX regressions are accumulating.** Reported by multiple users: chat history collapsing to the current turn (#79455), background tasks stuck "running" (#81114), review-pane git operations acting on wrong files (#81161), and untracked folders showing empty diffs (#81160). The review-pane git bugs carry **data-loss risk** — a strong dissatisfaction signal.
- **Security-sensitive behavior is under scrutiny.** Two reports stand out: the `config set` CLI allowing an agent to flip `approvals.mode` (#81101), and raw secrets persisted/replayed in verification evidence (#81189). Users are clearly reviewing Hermes through a security-first lens.
- **Platform-message delivery reliability is a recurring theme.** Feishu (three distinct delivery bugs: #81169, #81117, #73779), Discord (#81091), and Telegram (#81183) all show the cost of gateway complexity. Fixes are landing quickly where filed (e.g., #81184, #81122).
- **Windows remains a second-class citizen.** Two Windows-specific bugs this period: `pythonw.exe` not killed during updates breaking venv rebuilds (#70026) and a 330s terminal-tool stall when spawned via ACP/Buzz (#80952).
- **Positive signals:** The community is proactively filing duplicate issues to consolidate attention (labels like `duplicate` on #81163, #81169, #81101), and the sharding epic (#78647) reflects healthy architectural governance.

## 8. Backlog Watch

Items that have been open for an extended period or are high-traffic and still need maintainer decisions:

- **[#78647 — Epic: Shard all 20 god files](https://github.com/NousResearch/hermes-agent/issues/78647)** — P3, `needs-decision`, 59 comments. The epic is the community's most-discussed topic; awaiting an approved sharding sequence and ownership plan. **Needs maintainer decision.**
- **[#78645 — Shard agent/context_compressor.py](https://github.com/NousResearch/hermes-agent/issues/78645)** — P3, `needs-decision`, 25 comments. Sub-issue of the epic; blocks progress on compression-related bug fixes.
- **[#81105 — refactor(context_compressor): extract summary kernel (LB8)](https://github.com/NousResearch/hermes-agent/issues/81105)** — Open with 6 comments; a graph-gated extraction slice pinned to `context_compressor.py:2771–2932`. Slated to be the **first concrete shard** — progress here would signal the epic is moving.
- **[#60535 — Add French translations for README and contributor docs](https://github.com/NousResearch/hermes-agent/issues/60535)** — P3, open since **July 7** (over a month). Low effort, clear community value; no assignee evident.
- **[#47864 — Dashboard reports "Action failed (exit ?)" after successful update](https://github.com/NousResearch/hermes-agent/issues/47864)** — P2, open since **June 17** (~7 weeks). A fix PR (#81194) was opened today — worth tracking for merge.
- **[#70026 — Windows: force_kill misses pythonw.exe → venv rebuild "Access denied"](https://github.com/NousResearch/hermes-agent/issues/70026)** — P2, open since July 23. No fix PR yet; Windows update-path reliability is at stake.
- **[#81101 — `config set` can flip `approvals.mode` with no gate](https://github.com/NousResearch/hermes-agent/issues/81101)** — P3 security issue; marked duplicate of a broader sensitive-config write problem partially addressed by PR [#79676](https://github.com/NousResearch/hermes-agent/pull/79676), which has been open since **August 5** without merge — a security-relevant PR that needs attention.

---

*Digest generated from Hermes Agent GitHub activity for 2026-08-08. Data: 50 issues updated, 50 PRs updated, 0 releases.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-08

## Today’s Overview

PicoClaw saw moderate activity over the last 24 hours: 1 issue was updated and closed as stale, 5 PRs were updated, and no new releases were published. The current contributor focus is on stability fixes for WhatsApp connectivity, agent prefix caching, `exec` tool configuration handling, plus one broader feature PR for configurable model fallback chains. The majority of recent PRs are open and awaiting review, suggesting active development but no immediate release cut. Overall project health looks stable, with no fresh bug report flood or release-blocking regression visible in this window.

## Releases

No new releases were published in the last 24 hours. There are no changelog entries, breaking changes, or migration notes to report.

## Project Progress

The only merged/closed PR updated in this window was:

- [PR #1349 — feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)  
  This closed PR adds broader QQ channel attachment support: emoji structure parsing, incoming voice/image/video/file handling, local attachment uploads, and Markdown-first replies. This is a meaningful step forward for the QQ channel adapter.

Open PRs submitted today are also relevant progress signals, though not yet merged:

- [PR #3321 — fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)
- [PR #3320 — fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)
- [PR #3319 — fix(tools): honor exec timeout and boolean run options](https://github.com/sipeed/picoclaw/pull/3319)

These indicate the maintainer/contributor pipeline is actively addressing operational bugs.

## Community Hot Topics

The most active item in the last 24 hours was a stale issue, not a PR:

- [Issue #3093 — [Feature] I need SimpleX or tox](https://github.com/sipeed/picoclaw/issues/3093)  
  Status: closed as stale · 6 comments · 1 👍  
  User requested support for privacy-oriented communication gateways such as SimpleX, Wire, or Tox. The underlying need is broader protocol diversity, especially for users who prefer encrypted, non-mainstream messaging networks. The issue was auto-closed as stale, which likely signals low maintainer prioritization, but the conversation history may still contain useful user expectations.

No other issue or PR had recorded comments or reactions in this window.

## Bugs & Stability

Ranked by estimated user impact:

1. **High — WhatsApp channel is effectively dead due to outdated client version**  
   [PR #3320 — fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"](https://github.com/sipeed/picoclaw/pull/3320)  
   WhatsApp rejects the currently pinned `whatsmeow` client version. Sockets connect and then drop after ~5 seconds with `Client outdated (405)`, and no reconnect is attempted. This leaves the native WhatsApp channel unavailable. A fix PR is open.

2. **Medium — `exec` tool silently ignores per-run timeout and boolean options**  
   [PR #3319 — fix(tools): honor exec timeout and boolean run options](https://github.com/sipeed/picoclaw/pull/3319)  
   The tool advertises a per-run `timeout` argument, but synchronous execution uses the global timeout instead. Additionally, `background` and `pty` are declared as strings in the schema even though they are booleans. This can cause confusing behavior for users scripting tool calls. A fix PR is open.

3. **Low/Medium — Prefix caching degraded by dynamic context placement**  
   [PR #3321 — fix(agent): move dynamic context after history to preserve prefix caching](https://github.com/sipeed/picoclaw/pull/3321)  
   Dynamic context blocks placed before conversation history invalidate positional prefix caches, increasing token cost and latency. This is an efficiency/performance issue rather than a functional crash, but it matters for heavy users. A fix PR is open.

## Feature Requests & Roadmap Signals

- [Issue #3093 — SimpleX/Wire/Tox gateway support](https://github.com/sipeed/picoclaw/issues/3093) was closed as stale, so it is not currently on the roadmap.
- [PR #3200 — feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200) is the strongest roadmap signal right now. It introduces a dedicated default-chain workflow on the models page, allowing users to set a default model, add fallback models, reorder them, and persist the full chain via the backend API.
- [PR #1349 — QQ attachment support](https://github.com/sipeed/picoclaw/pull/1349), now closed, points to continued investment in channel adapter functionality.

If PR #3200 and the current bug-fix PRs are merged, the next version will likely include model fallback configuration, WhatsApp recovery, and corrected `exec` tool behavior.

## User Feedback Summary

User pain points visible in this window are operational rather than feature-related:

- WhatsApp users are actively impacted by the 405 client-outdated failure.
- `exec` tool users need per-run timeouts and boolean flags to work as documented.
- Some users want more privacy-preserving communication channels like SimpleX or Wire, but the feature request was closed stale with only modest support.
- No explicit satisfaction or praise was recorded in the available data; the overall sentiment signal is "fix reliability first."

## Backlog Watch

- [PR #3200 — feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)  
  Open since 2026-07-01 and still not merged as of 2026-08-08. This is a substantial feature with backend persistence and UI workflow implications, and it could use maintainer review/decision.

- [PR #1349 — QQ attachment support](https://github.com/sipeed/picoclaw/pull/1349)  
  Created 2026-03-11 and closed around 2026-08-06. The long lifecycle suggests channel-related PRs can take months to reach closure; maintainers should watch for similar delays in current channel work.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-08

## Today's Overview

NanoClaw's issue tracker was quiet in the last 24 hours: **0 open/active issues, 0 closed issues**, and **0 new releases**. PR activity was moderate and healthy: **14 PRs updated**, of which **6 are closed/merged** and **8 remain open**. The closed/merged batch is heavily focused on bug fixes — media-only message delivery, scheduling failure handling, Telegram reply/engage routing, and clearer progress-card errors. Open PRs show continued ecosystem expansion with new skills/integrations and several operational CLI/database fixes. Overall project health looks stable and contributor-driven, though no release has been cut yet to ship these changes.

## Releases

**None.** No new versions, tags, or release artifacts were recorded on 2026-08-08.

## Project Progress

### Closed/merged PRs in the last 24h

- [nanocoai/nanoclaw#3197](https://github.com/nanocoai/nanoclaw/pull/3197) — **fix(progress): 失败状态展示具体原因**  
  Agent-runner progress cards now display the actual failure reason instead of generic wording, with reducer and Feishu-card tests included.

- [nanocoai/nanoclaw#2213](https://github.com/nanocoai/nanoclaw/pull/2213) — **fix: accept media-only messages (photo/video/file without caption)**  
  Fixes silent dropping of media messages without text/caption on Telegram and other Chat SDK platforms.

- [nanocoai/nanoclaw#2678](https://github.com/nanocoai/nanoclaw/pull/2678) — **fix(scheduling): re-arm recurrence when a run fails permanently**  
  Recurring tasks now schedule the next occurrence from `failed` rows, not only `completed` ones.

- [nanocoai/nanoclaw#2679](https://github.com/nanocoai/nanoclaw/pull/2679) — **fix(scheduling): surface permanently-failed scheduled tasks to the user**  
  Permanently failed scheduled tasks now produce a user-visible agent notice instead of remaining silent.

- [nanocoai/nanoclaw#2644](https://github.com/nanocoai/nanoclaw/pull/2644) — **fix: detect reply-to-bot in Telegram extractReplyContext**  
  Replies to the bot's own messages are now correctly identified as `isReplyToBot`.

- [nanocoai/nanoclaw#2643](https://github.com/nanocoai/nanoclaw/pull/2643) — **fix: engage pattern/mention wirings on direct address**  
  `evaluateEngage` now triggers pattern/mention wirings on direct @mentions, DMs, and replies-to-bot, even if the body text doesn't contain the keyword.

### Open PRs still in review

- [nanocoai/nanoclaw#3145](https://github.com/nanocoai/nanoclaw/pull/3145) — DB migration 021 to backfill missing channel destinations.
- [nanocoai/nanoclaw#3190](https://github.com/nanocoai/nanoclaw/pull/3190) — New Tavily MCP tool skill.
- [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — Treat unknown slash commands as normal chat.
- [nanocoai/nanoclaw#3198](https://github.com/nanocoai/nanoclaw/pull/3198) — New AnyDoc document conversion skill.
- [nanocoai/nanoclaw#3050](https://github.com/nanocoai/nanoclaw/pull/3050) — Add Dial to the channel picker + runChannelSkill model.
- [nanocoai/nanoclaw#3196](https://github.com/nanocoai/nanoclaw/pull/3196) — Fix/add mount readonly.
- [nanocoai/nanoclaw#2705](https://github.com/nanocoai/nanoclaw/pull/2705) — Make `use-native-credential-proxy` actually bypass OneCLI gateway.
- [nanocoai/nanoclaw#3149](https://github.com/nanocoai/nanoclaw/pull/3149) — Add `--rw` flag to `groups config add-mount`.

## Community Hot Topics

There were **no active issues** in the window and **no comment/reaction data** available on the PRs, so there are no numerically "hot" threads to rank. The strongest activity signals are open PRs with broad user-facing scope:

- [nanocoai/nanoclaw#3050](https://github.com/nanocoai/nanoclaw/pull/3050) — Adding **Dial** as a channel, plus the `runChannelSkill` model. Underlying need: more channel choices and reusable channel-skill behavior.
- [nanocoai/nanoclaw#3190](https://github.com/nanocoai/nanoclaw/pull/3190) — **Tavily MCP tool skill**. Underlying need: easy MCP/web-search tooling without core source changes.
- [nanocoai/nanoclaw#3198](https://github.com/nanocoai/nanoclaw/pull/3198) — **AnyDoc document conversion skill**. Underlying need: turn NanoClaw into a document-processing tool.
- [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — Unknown slash commands producing dropped responses. Underlying need: predictable chat behavior for user-authored commands.

## Bugs & Stability

Ranked by estimated user impact:

1. **High — Media-only messages silently dropped**  
   [nanocoai/nanoclaw#2213](https://github.com/nanocoai/nanoclaw/pull/2213) (closed/merged). Photos, videos, and files without captions never reached the agent. This is a direct user-input loss bug.

2. **High — Unknown slash commands produced no response**  
   [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) (open). Unknown commands were categorized as `passthrough`, so the Agent SDK interpreted them as Claude Code slash commands and silently dropped output.

3. **High — Scheduled task failures were invisible and did not recover**  
   [nanocoai/nanoclaw#2679](https://github.com/nanocoai/nanoclaw/pull/2679) and [nanocoai/nanoclaw#2678](https://github.com/nanocoai/nanoclaw/pull/2678) (both closed/merged). Permanent failures were only logged, and recurrence was not re-armed after a failed run.

4. **Medium — Credential proxy skill did not actually bypass OneCLI gateway**  
   [nanocoai/nanoclaw#2705](https://github.com/nanocoai/nanoclaw/pull/2705) (open). Fails on real launchd/systemd installs because `nativeCredentialsEnabled()` only read `process.env`.

5. **Medium — Telegram replies/direct addresses could be ignored**  
   [nanocoai/nanoclaw#2644](https://github.com/nanocoai/nanoclaw/pull/2644) and [nanocoai/nanoclaw#2643](https://github.com/nanocoai/nanoclaw/pull/2643) (closed/merged). Bot stayed silent on direct replies or @mentions in some pattern/mention wiring cases.

6. **Low/Operational — Mount and DB config issues**  
   [nanocoai/nanoclaw#3149](https://github.com/nanocoai/nanoclaw/pull/3149) and [nanocoai/nanoclaw#3196](https://github.com/nanocoai/nanoclaw/pull/3196) (open) address mount-readonly behavior; [nanocoai/nanoclaw#3145](https://github.com/nanocoai/nanoclaw/pull/3145) (open) backfills destinations for existing wirings.

7. **UX — Generic failure text on progress cards**  
   [nanocoai/nanoclaw#3197](https://github.com/nanocoai/nanoclaw/pull/3197) (closed/merged). Users saw "执行系统检查失败" instead of the actual failure reason.

## Feature Requests & Roadmap Signals

No formal feature requests were filed in the last 24h, but open PRs are strong roadmap signals:

- **MCP/tool ecosystem expansion**: [Tavily MCP skill](https://github.com/nanocoai/nanoclaw/pull/3190) and [AnyDoc document conversion skill](https://github.com/nanocoai/nanoclaw/pull/3198).
- **New channel support**: [Dial channel picker + runChannelSkill model](https://github.com/nanocoai/nanoclaw/pull/3050).
- **CLI/ops ergonomics**: [readonly mount support](https://github.com/nanocoai/nanoclaw/pull/3196), [`--rw` flag for add-mount](https://github.com/nanocoai/nanoclaw/pull/3149), and [native credential proxy bypass](https://github.com/nanocoai/nanoclaw/pull/2705).

Prediction: if pending reviews move forward, the next minor release should include the six closed fixes, while skill/channel PRs are likely candidates for the following feature release.

## User Feedback Summary

There is no direct satisfaction/rating data in the GitHub window. PR descriptions are the clearest user pain-point signals:

- Users are losing **media-only messages** ([#2213](https://github.com/nanocoai/nanoclaw/pull/2213)).
- Users are confused when **unknown slash commands silently produce no output** ([#2346](https://github.com/nanocoai/nanoclaw/pull/2346)).
- Users need **scheduled-task failures to be visible** rather than silently logged ([#2679](https://github.com/nanocoai/nanoclaw/pull/2679)).
- Users expect the bot to respond to **@mentions/DMs/replies** even when the text doesn't repeat the keyword ([#2643](https://github.com/nanocoai/nanoclaw/pull/2643)).
- Users want **progress cards to show concrete failure reasons**, not generic text ([#3197](https://github.com/nanocoai/nanoclaw/pull/3197)).

Overall, contributors are actively fixing real-world friction points, which indicates an engaged but occasionally frustrated user base.

## Backlog Watch

The issue tracker has no open issues, so the backlog concern is mostly **long-running open PRs**:

- [nanocoai/nanoclaw#2346](https://github.com/nanocoai/nanoclaw/pull/2346) — created 2026-05-08, last updated 2026-08-07. Silent response drop for unknown slash commands; needs maintainer review/merge.
- [nanocoai/nanoclaw#2705](https://github.com/nanocoai/nanoclaw/pull/2705) — created 2026-06-07, last updated 2026-08-07. Native credential proxy bypass issue; important for production installs.
- [nanocoai/nanoclaw#3145](https://github.com/nanocoai/nanoclaw/pull/3145) — created 2026-07-28, last updated 2026-08-07. Required DB migration/backfill for existing wirings.
- [nanocoai/nanoclaw#3149](https://github.com/nanocoai/nanoclaw/pull/3149) — created 2026-07-29, last updated 2026-08-07. CLI mount flag fix; small but pending.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-08

## 1. Today's Overview

IronClaw saw high-velocity activity in the last 24 hours: 50 issues and 50 PRs were updated, with 12 issues closed and 23 PRs merged/closed, while no new releases shipped. The bulk of momentum is in the **Inspector** observability suite (metrics, prompt inspection, activity timeline, tool execution details), a wave of **bug-bash P1/P2 fixes** targeting the WebUI v2 / Reborn agent loop, and the newly scoped **Extensions vNext** epic (#7354) targeting delivery by 2026-08-14. Open-workload balance remains healthy (38 open issues, 27 open PRs), though a cluster of P1 infrastructure reliability bugs around runner heartbeat loss and Slack identity handling deserves immediate attention. Notably, a community-reported "reset settings" gap already has a fix PR in flight, indicating a responsive maintainer loop.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

**Merged/Closed PRs visible today:**

- **#7277 — `feat(inspector): add model call statistics`** — closed. Adds run-scoped model-call statistics (call counts, latency, token usage, per-model breakdowns) capturing effective provider model per call so concurrent requests, fallbacks, and failures are attributed correctly. Complements the closed issues **#7223** (Stats tab) and **#7222** (Prompt tab), completing the Inspector milestones.
- **#7177 — `Improve deferred tool retrieval with schema-aware ranked search`** — closed. Enhances Reborn progressive tool disclosure by ranking deferred tools beyond provider-safe names/descriptions, incorporating capability-schema vocabulary.

**Closed Issues representing fixed bugs:**

- **#4874** — WebChat v2 "Illegal invocation" send failure over plain HTTP from non-localhost hosts, **fixed**.
- **#3533** — Telegram v0.28.1 not auto-setup from UI, **closed** after QA.
- **#7307** — Attio extension returning opaque `operation_failed` instead of `auth_required`, **closed** (auth error classification improved).

**Other PRs in flight (not yet merged) that advanced meaningfully:** the SSE reconnection storm bound (#7284), audited admin thread scraping (#7228), HTTP error classification (#7342), steering replay dedup (#7336), and scoped attachment reads + SSE test reconciliation (#7341).

## 4. Community Hot Topics

- **[#7340 — "No way to reset model settings to factory defaults"](https://github.com/nearai/ironclaw/issues/7340)** — *6 comments, highest engagement.* A customer changed provider/model settings under Settings → Inference and could not restore the original configuration. Underlying need: a simple, discoverable "Reset to defaults" action with confirmation. A fix PR (**#7343**, `Added LLM settings reset to defaults`) was opened 2026-08-07, resetting only the persisted active LLM selection while preserving provider overlays and API keys.
- **[#6989 — "Token accounting: hybrid provider-usage + tail estimates"](https://github.com/nearai/ironclaw/issues/6989)** — *4 comments, p1.* `ModelWorkRequest::for_assistant` estimates input tokens from the *length of the content reference string* rather than the referenced content — a correctness bug in cost/usage accounting stemming from the pi-harness adoption program.
- **[#5522 — "Reborn routine fails when task requires reading Slack DMs"](https://github.com/nearai/ironclaw/issues/5522)** — *3 comments.* No Slack read capability plus a `capability_info` retry loop causes routine failure (status=Failed). Open since 2026-07-02 — the oldest actively-discussed open QA item.
- **[#7185 — "Memory not reliably recalled across conversations"](https://github.com/nearai/ironclaw/issues/7185)** — *2 comments.* Reported at the IronClaw Champions weekly check-in by multiple independent testers; reflects a core user expectation gap around cross-conversation continuity.

## 5. Bugs & Stability

**P1 / High severity:**

- **[#7298 — "Request fails before it could be sent / monitoring system loses contact with runner"](https://github.com/nearai/ironclaw/issues/7298)** — Two distinct infrastructure errors during execution: pre-send failures and runner-contact loss mid-run. Most severe item in the queue; no dedicated fix PR identified yet.
- **[#7292 — "Installed tool cannot be used; run fails with runner heartbeat error"](https://github.com/nearai/ironclaw/issues/7292)** — CoinGecko tool installs and shows Demo mode, but usage fails at the active-check stage due to runner heartbeat loss.
- **[#7295 — "Agent leaks or confuses Slack user identity in response"](https://github.com/nearai/ironclaw/issues/7295)** — Agent referenced sending a DM to `sergey.astretsov` when a different user made the request; potential identity/data-confusion risk.
- **[#7344 — "Slack connection not recognized by assistant despite ACTIVE"](https://github.com/nearai/ironclaw/issues/7344)** — Slack shows ACTIVE with 8 capabilities but the assistant denies the connection exists, three distinct manifestations. Related fix PR **#7361** addresses "connect account" truthfulness and host-bundled description trust.
- **[#6989 — "Token accounting estimates from content reference string"](https://github.com/nearai/ironclaw/issues/6989)** — p1 billing/usage-accounting correctness bug.

**P2 / Medium severity (WebUI/UX regressions):**

- **[#7347 — Duplicate assistant responses to a single user message](https://github.com/nearai/ironclaw/issues/7347)** — related fix PR **#7336** (dedup consumed steering replays) is open.
- **[#7350 — Queued user messages receive no individual result](https://github.com/nearai/ironclaw/issues/7350)**; **[#7349 — Run history/Activity timeline disappears after refresh](https://github.com/nearai/ironclaw/issues/7349)**; **[#7348 — Activity tool calls displayed out of chronological order](https://github.com/nearai/ironclaw/issues/7348)**; **[#7351 — Run-failure UI truncates message and shows ambiguous reason](https://github.com/nearai/ironclaw/issues/7351)**; **[#7346 — Emoji shortcodes rendered as raw text](https://github.com/nearai/ironclaw/issues/7346)**; **[#7345 — Agent claims 61 automations vs UI showing 50](https://github.com/nearai/ironclaw/issues/7345)** — potential hallucination or count-inconsistency bug.

**Stability-related PRs in flight:** bounded SSE reconnect storms with jittered backoff (**#7284**), HTTP 4xx/5xx classified as recoverable `OperationFailed` (**#7342**), auth credential visibility across extensions registry/runtime (**#7359**), and per-gate notification projection IDs (**#7352**).

## 6. Feature Requests & Roadmap Signals

- **Extensions vNext epic (#7354)** — the clearest roadmap signal. Targets by **2026-08-14**: canonical reaction/edit/delete messaging operations (**#7355**), opt-in web push notifications (**#7356**), delegated Telegram user sessions without raw MTProto material (**#7357**), and a production-ready Signal channel (**#7358**).
- **Doc-Truth Verification Pipeline (#7317)** — a proposal from `cuongdcdev` addressing shipped breaking changes without matching docs (e.g., mandatory `origin_gate_matrix` undocumented). Strong candidate for a CI/documentation workstream in the next minor release.
- **Reset model settings to defaults (#7340)** — already implemented in PR **#7343**; highly likely to land in the next patch release.
- **Tool disclosure follow-up epic (#7166, v1.2.0)** — progressive tool disclosure is now Reborn default; follow-up work includes schema-aware ranked retrieval (closed #7177) and cache-stable deferred-tool promotion (**PR #7353**).
- **Expand stress coverage (#7360)** — enhancement request to extend the nightly API-capacity workload to built-in capability write paths and tool-call flows, closing a regression gap where mock models never exercise tool calls.
- **Preserve manifest field labels + field-level descriptions in Extension Configure Modal (#7319)** — UX polish for extension activation, using human-readable labels instead of generic `github credential` titles.

## 7. User Feedback Summary

- **Cross-conversation memory is the top trust issue**: multiple Champions testers independently observed that context from one conversation is not reliably recalled later (#7185); the perception is the agent "doesn't have access to information" it was previously given. This is a satisfaction-risk item affecting the "personal assistant" core promise.
- **Configuration recovery frustration**: a customer changed inference settings and had no way to restore factory defaults (#7340); the team's rapid fix PR signals acknowledgment of the pain.
- **Slack integration confusion**: users see an ACTIVE Slack connection with 8 capabilities, yet the assistant denies the connection exists (#7344) and at times references the wrong user identity in DMs (#7295). Trust and safety concerns dominate this feedback cluster.
- **Tool installation expectation gap**: installing a tool successfully but being unable to use it (heartbeat failure, #7292) creates a broken mental model — install succeeded, run failed.
- Overall, the bug-bash program is producing a high volume of actionable UX/infrastructure feedback, and the closed counts (12 issues, 23 PRs) suggest the team is converting that feedback into fixes at a healthy rate.

## 8. Backlog Watch

- **[#5522 — Slack DM reading capability missing + `capability_info` retry loop](https://github.com/nearai/ironclaw/issues/5522)** — Open since **2026-07-02** (37+ days), p1-area QA bug on the Reborn agent loop. Oldest unresolved item with ongoing discussion; needs a fix PR or explicit scope decision.
- **[#6989 — Token accounting p1 bug](https://github.com/nearai/ironclaw/issues/6989)** — Open since 2026-08-01; part of the pi-harness adoption program (P1 #6). No linked fix PR yet despite p1 labeling — billing/usage correctness items tend to accrue debt.
- **[#7185 — Memory not reliably recalled across conversations](https://github.com/nearai/ironclaw/issues/7185)** — Open since 2026-08-04 with only 2 comments; cut across multiple tester reports and touches the core assistant value proposition. Needs maintainer triage and a coordinated workspace/memory design response.
- **[#7166 — Tool disclosure follow-up epic (v1.2.0)](https://github.com/nearai/ironclaw/issues/7166)** — Epic-level item with only 1 comment; the dependent work (schema-aware ranking, cache-stable promotion) is progressing via PRs, but the epic itself lacks explicit task breakdown or milestone tracking in the issue.
- **[#6989-adjacent design debt]** — Several P1/P2 bug-bash items (#7298, #7292) reference runner/monitoring unreliability with no dedicated fix PR yet; these infrastructure-stability issues deserve maintainer eyes before the next release cut.

*Data source: github.com/nearai/ironclaw (Issues & PRs updated 2026-08-07 → 2026-08-08). All links reference the `nearai/ironclaw` repository.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest – 2026-08-08

## Today's Overview

LobsterAI saw moderate-to-high activity in the last 24 hours: 7 issues were updated (4 open/active, 3 closed/stale) and 7 PRs were updated (6 merged/closed, 1 open). No new releases were published. Development is focused on integrating the `release/2026.8.5` branch into `main`, which brings Cowork search, math-rendering fixes, OpenClaw configuration improvements, and Windows installer/update reliability. A targeted OpenClaw fix for model IDs containing slashes is also in flight, directly addressing a user-reported SiliconFlow compatibility bug. Overall, the project is in a healthy state, with maintainers actively merging fixes and community members reporting concrete bugs and UX improvements.

## Releases

No new releases were published in this window. The merged PR [#2451](https://github.com/netease-youdao/LobsterAI/pull/2451) integrates `release/2026.8.5` into `main`, including in-conversation search in Cowork, improved math rendering, IM analytics, OpenClaw configuration and plugin installation improvements, and Windows installation/update reliability fixes.

## Project Progress

Six PRs were merged/closed today:

- **[#2451 – Release/2026.8.5](https://github.com/netease-youdao/LobsterAI/pull/2451)** – Merged `release/2026.8.5` into `main`. Adds Cowork in-conversation search, better math rendering, IM analytics, OpenClaw config/plugin installation improvements, and Windows installer/update fixes.
- **[#2450 – fix(cowork): restore fullscreen code toolbar clicks on Windows](https://github.com/netease-youdao/LobsterAI/pull/2450)** – Keeps the fullscreen overlay outside Electron title-bar drag regions, fixing click handling.
- **[#2449 – Fix/markdown latex math delimiters](https://github.com/netease-youdao/LobsterAI/pull/2449)** – Corrects LaTeX math delimiter rendering in Markdown.
- **[#2448 – Liuzhq/fix chat search](https://github.com/netease-youdao/LobsterAI/pull/2448)** – Fixes chat/in-conversation search behavior.
- **[#2445 – fix(openclaw): strip plugin-index-managed keys from config.set](https://github.com/netease-youdao/LobsterAI/pull/2445)** – Prevents plugin-index-managed keys from being persisted via OpenClaw config updates.
- **[#2446 – fix(win-installer): rescue null watchdog exit code via extractor](https://github.com/netease-youdao/LobsterAI/pull/2446)** – Hardens the Windows installer against null watchdog exit codes during upgrade/repair.

One PR remains open:

- **[#2452 – fix(openclaw): preserve provider for slashed model ids](https://github.com/netease-youdao/LobsterAI/pull/2452)** – Fixes provider-prefix preservation when a model ID itself contains `/`, e.g. `deepseek-ai/DeepSeek-V4-Flash`. This is the likely fix for reported SiliconFlow model-selection issues.

## Community Hot Topics

The most-commented items in the last 24 hours were mostly older stale/closed issues, but they reflect persistent community concerns:

- **[#1195 – [bug] Custom skill installed to OpenClaw, but not shown in skill panel after restart](https://github.com/netease-youdao/LobsterAI/issues/1195)** – 2 comments. Users still struggle with custom skill installation lifecycle and unclear path handling between LobsterAI and OpenClaw.
- **[#1263 – Scheduled tasks duplicated in UI with API rate-limit errors](https://github.com/netease-youdao/LobsterAI/issues/1263)** – 2 comments. Closed/stale, but indicates scheduled-task reliability and duplicate-render problems.
- **[#1265 – Feature: bind IM bot and model per AGENT](https://github.com/netease-youdao/LobsterAI/issues/1265)** – 2 comments. Closed/stale but signals demand for multi-agent teams with different bots/models per agent.
- **[#1273 – sql.js memory access out of bounds / database corruption risk](https://github.com/netease-youdao/LobsterAI/issues/1273)** – 2 comments. Closed/stale, but describes a serious high-frequency write crash and non-atomic save issue.
- **[#2443 – Model IDs containing slashes cannot be used with custom providers (SiliconFlow)](https://github.com/netease-youdao/LobsterAI/issues/2443)** – 1 comment, but highly relevant because it already has a matching fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452).

Underlying community need: users want smoother OpenClaw integration, reliable background/scheduled task handling, safer storage behavior, and per-agent configurability for advanced multi-agent workflows.

## Bugs & Stability

Ranked by potential severity:

1. **[#1273 – sql.js memory out-of-bounds crash and database corruption risk](https://github.com/netease-youdao/LobsterAI/issues/1273)** – High severity. High-frequency writes can crash the app permanently, and non-atomic `save()` can corrupt the database. No fix PR is currently attached; although closed/stale, it deserves maintainer attention.
2. **[#2447 – Execution produces no result and no error message](https://github.com/netease-youdao/LobsterAI/issues/2447)** – High/medium severity. A silent failure with no diagnostics is difficult for users to debug. No fix PR yet.
3. **[#2443 – Custom provider model IDs with slashes unusable in UI](https://github.com/netease-youdao/LobsterAI/issues/2443)** – Medium severity. Affects all OpenAI-compatible providers using slash-prefixed model IDs, such as SiliconFlow. Fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) is open.
4. **[#1195 – Custom skills installed but missing from skill panel after restart](https://github.com/netease-youdao/LobsterAI/issues/1195)** – Medium severity. Open since April, with no attached fix PR yet.
5. **[#1263 – Duplicate scheduled tasks with rate-limit errors](https://github.com/netease-youdao/LobsterAI/issues/1263)** – Low/medium severity. Closed/stale, but indicates UI and task-management gaps.

Several bugs were fixed today: Windows fullscreen toolbar clicks ([#2450](https://github.com/netease-youdao/LobsterAI/pull/2450)), LaTeX math delimiters ([#2449](https://github.com/netease-youdao/LobsterAI/pull/2449)), chat search ([#2448](https://github.com/netease-youdao/LobsterAI/pull/2448)), OpenClaw config key handling ([#2445](https://github.com/netease-youdao/LobsterAI/pull/2445)), and Windows installer watchdog handling ([#2446](https://github.com/netease-youdao/LobsterAI/pull/2446)).

## Feature Requests & Roadmap Signals

- **[#2444 – Input box edit mode](https://github.com/netease-youdao/LobsterAI/issues/2444)** – Users want Enter-to-newline / Ctrl+Enter-to-send as an optional mode, plus a larger editing area and possible WYSIWYG Markdown support. This is a practical UX improvement that could be picked up for a future renderer-focused release.
- **[#1265 – Per-agent IM bot and model binding](https://github.com/netease-youdao/LobsterAI/issues/1265)** – Closed/stale, but remains a strong roadmap signal for multi-agent collaboration: different agents should be able to use different bots and models depending on role/task.
- The open fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) strongly suggests the next patch release will include the SiliconFlow/slashed-model-ID fix.

Given today’s merge of `release/2026.8.5`, the near-term roadmap appears focused on stability and OpenClaw/Cowork polish. Longer-term, editor UX and per-agent model/bot binding could become feature candidates if they gain more traction.

## User Feedback Summary

User feedback in the last 24 hours highlights both pain points and appreciation of ongoing fixes:

- Windows users are hitting UI edge cases and installer/update problems; the merged fixes for fullscreen toolbar clicks and watchdog exit codes should improve that experience.
- OpenClaw integration remains confusing around custom skill installation paths (`#1195`) and config persistence (`#2445`).
- Power users with SiliconFlow or other OpenAI-compatible providers are blocked when model IDs contain slashes (`#2443`); the open PR suggests maintainers are aware.
- Silent execution failures (`#2447`) are especially frustrating because there is no error message to act on.
- Long-running/cowork users may still be worried about storage stability (`#1273`), a high-visibility issue even though it was closed as stale.
- The quick merge of six PRs in one day indicates maintainer responsiveness, which is a positive signal for user confidence.

## Backlog Watch

- **[#1195 – Custom skill installed to OpenClaw but not shown in UI](https://github.com/netease-youdao/LobsterAI/issues/1195)** – Open since 2026-04-01, still reproducible, no fix PR attached. Needs maintainer investigation.
- **[#2443 – Slashed model IDs unusable with custom providers](https://github.com/netease-youdao/LobsterAI/issues/2443)** – Open since 2026-08-06, with a waiting fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452). Needs review/merge.
- **[#2447 – Execution no result / no error](https://github.com/netease-youdao/LobsterAI/issues/2447)** – Newly reported, no diagnostics. Needs maintainer reproduction and guidance.
- **[#2444 – Input box edit mode](https://github.com/netease-youdao/LobsterAI/issues/2444)** – New feature request with no maintainer response yet; may be a roadmap candidate.
- **[#1273 – sql.js memory access out-of-bounds / database corruption risk](https://github.com/netease-youdao/LobsterAI/issues/1273)** – Closed/stale, but high-impact. Should be re-evaluated or tracked as a stability backlog item, especially for heavy Cowork users.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-08

## 1. Today's Overview

CoPaw/QwenPaw remains highly active: **27 issues** were updated in the last 24h (16 open, 11 closed) and **50 PRs** were updated (28 open, 22 merged/closed). A new beta, **v2.1.0-beta.2**, was released with CI and checkpoint fixes. The issue stream is dominated by Docker distribution problems, intermittent MCP tool failures, and desktop/UI regressions, while the PR stream shows a strong influx of first-time contributor fixes. Overall project health is busy but user-facing stability, especially around Docker, memory/loop behavior, and desktop interface regressions, is the main risk area.

---

## 2. Releases

### v2.1.0-beta.2
- **Release:** [v2.1.0-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.2)
- **Changes:**
  - `fix(ci):` fence-aware section extraction in real-behavior-proof — fixes [#6626](https://github.com/agentscope-ai/QwenPaw/issues/6626) via [PR #6653](https://github.com/agentscope-ai/QwenPaw/pull/6653), by @hanson-hex
  - `fix(checkpoints):` restore auto snapshots in web workspace bootstrap, by @qbc2016 via [PR #6](https://github.com/agentscope-ai/QwenPaw/pull/6)
- **Breaking changes:** None noted.
- **Migration notes:** None provided.

---

## 3. Project Progress

- **22 PRs were merged/closed** in the last 24h. In the provided sample, [PR #4694](https://github.com/agentscope-ai/QwenPaw/pull/4694) (website downloads UI refactoring) is the notable closed PR.
- **Release v2.1.0-beta.2** already ships two merged fixes: CI extraction correctness and web workspace checkpoint restoration.
- **Open PRs advancing features/fixes include:**
  - [PR #6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) — Improve ReMe memory configuration and embedding lifecycle
  - [PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) — OneBot remote inbound voice/image media handling
  - [PR #6804](https://github.com/agentscope-ai/QwenPaw/pull/6804) — WeChat Chinese approval replies (`允许` / `拒绝`)
  - [PR #6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) — Intelligent email management assistant with mailbox monitoring
  - [PR #6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) — Self-healing Playwright driver connections
  - [PR #6799](https://github.com/agentscope-ai/QwenPaw/pull/6799) — Fix temp output file leakage and cap captured shell output
  - [PR #6809](https://github.com/agentscope-ai/QwenPaw/pull/6809) — Sanitize Chat Completions content for strict providers
  - [PR #6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) — Use shared root profile workspace for ACL store
  - [PR #6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) — Show custom profile Markdown files in console
  - [PR #6802](https://github.com/agentscope-ai/QwenPaw/pull/6802) / [PR #6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) — Restore desktop text selection/copy behavior

---

## 4. Community Hot Topics

Most-discussed issues in the last 24h:

- [#6116 — Doom loop: agent repeatedly triggers same tool call](https://github.com/agentscope-ai/QwenPaw/issues/6116) — 8 comments, closed as `wontfix`
  - Users are concerned about wasted API calls/tokens before loop detection kicks in.
- [#6782 — Docker 2.0.1 plugin/app market always shows "maintenance"](https://github.com/agentscope-ai/QwenPaw/issues/6782) — 8 comments, open
  - Docker users cannot use plugin/app market at all; high frustration.
- [#6732 — MCP tools periodically become invalid until restart](https://github.com/agentscope-ai/QwenPaw/issues/6732) — 6 comments, open
  - Intermittent "tool not registered or does not exist" errors; fixed temporarily by restarting the container.
- [#6490 — Add Volcengine Agent Plan and Xiaomi MiMo as built-in providers](https://github.com/agentscope-ai/QwenPaw/issues/6490) — 4 comments, open
  - Community wants broader model provider coverage.
- [#6786 — Telegram access_control whitelist resets when multica starts a new task](https://github.com/agentscope-ai/QwenPaw/issues/6786) — 4 comments, open
  - Approved users get blocked because fresh per-task workspaces contain empty ACL files.

**Underlying needs:** users are asking for operational reliability — stable tool/MCP registries, no silent state loss, and predictable desktop behavior — plus broader provider/model support.

---

## 5. Bugs & Stability

Ranked by user impact:

| Severity | Issue | Description | Fix Status |
|---|---|---|---|
| **High** | [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) | Docker v2.0.1: plugin/app market always "maintenance", unusable | No fix PR visible |
| **High** | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP tools stop working after hours; needs container restart | No fix PR visible |
| **High** | [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) | Agent enters infinite loop after multi-step task; session blocked for hours | Open, tagged `need-info` |
| **High** | [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | Malware Bytes flags Windows desktop version as Trojan Loader; likely false positive, user uninstalled | Needs maintainer response |
| **Medium** | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | Idle QwenPaw freezes after tens of minutes; only process restart helps | Question, no fix PR |
| **Medium** | [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) | OpenAI-compatible requests rejected by strict providers (StepFun 400) | Fix PR: [#6809](https://github.com/agentscope-ai/QwenPaw/pull/6809) |
| **Medium** | [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) | Regression: custom persona `.md` files hidden in console Profile category | Fix PR: [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) |
| **Medium** | [#6794](https://github.com/agentscope-ai/QwenPaw/issues/6794) | Agent Kanban creation returns 405; hot-reload causes 404 | No fix PR visible |
| **Medium** | [#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) / [#6787](https://github.com/agentscope-ai/QwenPaw/issues/6787) | Telegram whitelist resets per-task | Fix PR: [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) |
| **Medium** | [#6797](https://github.com/agentscope-ai/QwenPaw/issues/6797) | v2.1.0b2 desktop mode cannot select/copy text in chat window | Fix PRs: [#6802](https://github.com/agentscope-ai/QwenPaw/pull/6802), [#6801](https://github.com/agentscope-ai/QwenPaw/pull/6801) |
| **Medium** | [#6796](https://github.com/agentscope-ai/QwenPaw/issues/6796) | 2.1 beta2 cannot submit new session while task is running | Closed |
| **Medium** | [#6773](https://github.com/agentscope-ai/QwenPaw/issues/6773) | Linux doom-loop/rubric gates never activate in `/goal`/`/mission` | Closed |
| **Low/Medium** | [#6565](https://github.com/agentscope-ai/QwenPaw/issues/6565) | Shell multi-line newline collapse + background process hang | Closed |
| **Low** | [#6116](https://github.com/agentscope-ai/QwenPaw/issues/6116) | Repeated same tool call "doom loop" — warning appears only after ~6 repetitions | Closed `wontfix` |

Additional plugin-specific Windows blockers reported:
- [#6807](https://github.com/agentscope-ai/QwenPaw/issues/6807) — `qwenpaw-creator`: video/image generation cannot work on Windows
- [#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) — `qwenpaw-creator`: saving model config fails with "Internal Server Error"

---

## 6. Feature Requests & Roadmap Signals

- **New model/provider support:**
  - [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) — Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers
  - [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285) — Add `qwen3.8-max-preview` to Aliyun Token Plan model list
- **Desktop UX:**
  - [#6790](https://github.com/agentscope-ai/QwenPaw/issues/6790) — Desktop mode should open apps with a single click; add exit-to-full-mode button
  - [#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770) — Make user Chrome tab lifetime configurable across response cycles
- **Channel improvements:**
  - [PR #6804](https://github.com/agentscope-ai/QwenPaw/pull/6804) — Chinese approval replies for WeChat
  - [PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) — OneBot remote media handling
- **New capability:**
  - [PR #6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) — Intelligent mailbox assistant with real-time monitoring and access control

**Prediction:** Next release will likely include desktop text-selection fixes, the ACL store fix, custom profile visibility, and strict-provider request sanitization. Provider additions like Volcengine/Xiaomi MiMo may land in a subsequent minor release if maintainers accept community contributions.

---

## 7. User Feedback Summary

- **Docker users are blocked:** [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) — plugin/app market permanently shows "maintenance"; users cannot install or use plugins.
- **MCP reliability is a recurring pain point:** [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) — tools quietly die and only a container restart restores them.
- **Trust issue from antivirus false positive:** [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) — a user said "I love your work" but uninstalled until the Trojan Loader alert is resolved.
- **Desktop regression frustration:** [#6797](https://github.com/agentscope-ai/QwenPaw/issues/6797) — users cannot copy individual text segments in v2.1.0b2 desktop mode.
- **Persona/configuration regressions:** [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) — custom persona files can no longer be toggled, breaking personalized setups.
- **Overall sentiment:** Users are enthusiastic about the project but increasingly sensitive to stability issues in Docker, MCP tooling, memory/loop behavior, and desktop UI regressions.

---

## 8. Backlog Watch

Long-running or at-risk items needing maintainer attention:

- [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285) — Open since **2026-07-20**: Aliyun model list still missing `qwen3.8-max-preview`. Simple, user-visible omission.
- [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) — Open since **2026-07-27**: Volcengine/Xiaomi provider request has community support but no maintainer response.
- [PR #6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) — Under review since **2026-07-30**: memory flush before compression / Scroll lifecycle gap.
- [PR #6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) — Under review since **2026-07-31**: corrupted agent config / invalid JSON handling.
- [PR #6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) — Under review since **2026-07-31**: Retry-After cap on streaming retry path.
- [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) — Under review since **2026-08-01**: ACP final text loss when notifications race prompt response.

These items are not necessarily stale, but they represent important reliability enhancements that have been in review for over a week and deserve maintainer attention or status updates.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-08

## 1. Today's Overview

ZeroClaw saw a very active 24-hour window: 50 issues and 50 PRs were updated (45 issues and 44 PRs remain open/active; 5 issues were closed, 6 PRs were merged/closed), with no new release published. The project remains in its 0.8.x cycle (sources reference v0.8.4), and the day's activity is dominated by three themes: RFC governance and lifecycle work, a dense cluster of reliability bugs in the SOP subsystem, and two high-severity security findings around API key leakage. Several accepted RFCs are closing out, while a number of accepted-but-unimplemented RFCs continue to age in the backlog. Overall, the project shows strong contributor engagement but a visible maintainer-review bottleneck on large PRs.

## 2. Releases

No new releases were published in this window; nothing to report.

## 3. Project Progress

Only 2 of the 6 merged/closed PRs are visible in the sampled data:

- **[#9795 — test(xtask): derive generator dist assertions from the canonical registry](https://github.com/zeroclaw-labs/zeroclaw/pull/9795)** (closed, `risk:low`, `size:S`) — removes six-way duplication of the `dist_extra_features` contract across generator test suites by deriving assertions from the canonical registry. A clean test-infrastructure consolidation.
- **[#9818 — feat(dist): ship channel-slack in the dist feature selection](https://github.com/zeroclaw-labs/zeroclaw/pull/9818)** (closed) — explicitly a **fork-local deviation** ("Do not send upstream"); not merged. It highlights that `channel-slack` is only reachable via `all-features`, which pins published tags to amd64 and leaves arm64 without Slack support.

Closed issues today (all with `status:accepted`) represent real progress on design lock-in:

- **[#8933 — RFC: cross-turn conversation correlation to OTel export](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)** — accepted; will export `gen_ai.conversation.id` per OTel Semantic Conventions v1.41.0.
- **[#9246 — RFC: preserve Todo tracker configuration during ZeroCode ownership migration](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)** — accepted.
- **[#7232 — RFC: Structured Observability Enhancement](https://github.com/zeroclaw-labs/zeroclaw/issues/7232)** — accepted; rich events, OTel trace correlation, and bridge refactoring scoped.
- **[#6055 — Slack: hydrate thread context from conversations.replies](https://github.com/zeroclaw-labs/zeroclaw/issues/6055)** — accepted feature.
- **[#9386 — Gemini API key survives sanitize_api_error and is posted to chat](https://github.com/zeroclaw-labs/zeroclaw/issues/9386)** — closed as accepted/resolved; a significant leak-detector fix.

Substantial open PRs also advanced: semantic-empty completion rejection ([#9424](https://github.com/zeroclaw-labs/zeroclaw/pull/9424)), browser screenshot path hardening ([#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)), web multi-conversation UX ([#9353](https://github.com/zeroclaw-labs/zeroclaw/pull/9353), [#9355](https://github.com/zeroclaw-labs/zeroclaw/pull/9355)), Telegram multi-message streaming ([#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)), and MCP resource blob materialization ([#9196](https://github.com/zeroclaw-labs/zeroclaw/pull/9196)).

## 4. Community Hot Topics

- **[#6808 — RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (20 comments, rev. 24) — the most-discussed item. A governance/rollout tracker that has been running since May; ratification deferred while rollout proceeds. Signals strong community appetite for process tooling.
- **[#8933 — OTel cross-turn conversation correlation RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)** (13 comments) — closed/accepted; observability design is a high-interest area.
- **[#9246 — ZeroCode ownership migration RFC](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)** and **[#5937 — Refactor: unify providers architecture & reqwest client management](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)** (12 comments each) — #5937 is accepted but has not started since April; underlying need is provider-config fragmentation.
- **[#8424 — RFC: workspace-relative forbidden path patterns and .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)** (10 comments) — users want to protect workspace-internal sensitive files (`.env`, `config.yaml`, toolchain files) from agent access.
- **[#8043 — retire aardvark-sys crate](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)** and **[#7100 — per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)** (9 comments each) — architecture consolidation and capability-model correctness.

Underlying needs: contributors are pushing for (a) simpler governance, (b) consolidated provider/capability architecture, and (c) stronger security boundaries around agents and secrets.

## 5. Bugs & Stability

**New today, no fix PR attached yet (highest severity):**

- **[#9813 — API key written to logs in plaintext on provider connection errors](https://github.com/zeroclaw-labs/zeroclaw/issues/9813)** (`p1`, `risk:high`, `security:leak-detector`, duplicate-labeled) — query-string-authenticated providers (Gemini) leak keys into logs via reqwest error URLs. A distinct vector from the (now-closed) chat-leak #9386; remains open.
- **[#9812 — Provider fallback carries the primary's model id, so it can never fire](https://github.com/zeroclaw-labs/zeroclaw/issues/9812)** (`p1`, `risk:high`) — a "correctly configured" fallback is poisoned into cooldown because the fallback is asked for the primary's model ID.
- **[#9811 — /health reports a channel healthy that has never connected](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)** (`p1`, `risk:high`) — Telegram channel with invalid token polls 404s for 19h while `/health` reports healthy.
- **[#9805 — SOP auto-mode runs from channel/cron triggers never execute and rot as 'running' forever](https://github.com/zeroclaw-labs/zeroclaw/issues/9805)** (`p1`, `risk:high`) — headless dispatch has no agent loop; holds concurrency slots across daemon restarts.
- **[#9786 — malformed SOP.toml is silently dropped; sop validate reports success](https://github.com/zeroclaw-labs/zeroclaw/issues/9786)** (`p1`, `risk:high`) — indistinguishable from a deleted SOP.
- **[#9770 — cron update silently discards changes to declarative jobs](https://github.com/zeroclaw-labs/zeroclaw/issues/9770)** (`p1`, `risk:high`) — six columns affected (`command`, `name`, `expression`/`schedule`, `session_target`, `allowed_tools`, `uses_memory`).
- **[#9784 — multi-step SOP marked failed mid-step with no audit event](https://github.com/zeroclaw-labs/zeroclaw/issues/9784)** (`p1`, `risk:high`, `r:needs-repro`).
- **[#9775 — OpenRouter streaming requests drop provider_extra](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)** (`p1`, `status:in-progress`).

**Fix PRs in flight for earlier/reported bugs:**

- **[#9362 — browser screenshot path validation](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)** — closes an arbitrary file-write escape in the browser tool's `screenshot` action.
- **[#9819 — pixel-level image validation before provider requests](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — prevents corrupt images from failing provider calls.
- **[#9424 — reject semantic-empty terminal completions](https://github.com/zeroclaw-labs/zeroclaw/pull/9424)** — routes blank/think-only responses through Reliable retry/fallback.
- **[#9536 — ACP session workspace defaults to agent dir, not daemon CWD](https://github.com/zeroclaw-labs/zeroclaw/pull/9536)** — closes a shell-tool working-directory hazard.
- **[#9709 — Edge TTS temp output cleanup on every error path](https://github.com/zeroclaw-labs/zeroclaw/pull/9709)**, **[#9563](https://github.com/zeroclaw-labs/zeroclaw/pull/9563) / [#8964](https://github.com/zeroclaw-labs/zeroclaw/pull/8964)** — Telegram media envelope and streaming-draft sanitization fixes.

**Lower severity:** [#9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656) Telegram typing indicator keeps running during approval waits (`p2`); [#9708](https://github.com/zeroclaw-labs/zeroclaw/issues/9708) unbounded daemon launcher log files (`p2`); [#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) SOP `finish_run` discards failure reasons (`p2`); [#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780) cron-triggered SOPs cannot perform network work (`p2`).

## 6. Feature Requests & Roadmap Signals

**Filed today:**

- **[#9814 — native XMPP / Prosody channel](https://github.com/zeroclaw-labs/zeroclaw/issues/9814)** — community request for lightweight self-hosted chat (home-lab/low-resource deployments).
- **[#9810 — RFC: Load Agent Plugins 1.0 skill and MCP packages](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)** — vendor-neutral plugin standard (`plugin.json` + `skills/` + `mcp.json`).
- **[#9806 — feat(zega-ai): real bridge integration](https://github.com/zeroclaw-labs/zeroclaw/pull/9806)** — appears to be an early/draft PR; template placeholders unfilled.

**Strong roadmap signals already in flight:**

- Multi-conversation web UX ([#9353](https://github.com/zeroclaw-labs/zeroclaw/pull/9353), [#9355](https://github.com/zeroclaw-labs/zeroclaw/pull/9355) — both `size:XL` by a distinguished contributor).
- Unified package/capability/config/runtime-state catalog contract ([#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)).
- Per-model capability & context-window configuration ([#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)).
- Workspace-relative forbidden paths + optional `.zeroclawignore` ([#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)).
- Security default: empty WhatsApp `allowed_groups` should mean permit-none ([#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)).

**Prediction:** the next 0.8.x / 0.9 cycle will likely land the web multi-conversation overhaul, Telegram multi-message streaming ([#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)), per-model capability config, and security-default hardening (WhatsApp groups, path guards, secret redaction). Agent Plugins 1.0 support is a plausible near-term addition given the RFC was filed today.

## 7. User Feedback Summary

- **Secret-handling anxiety is the loudest signal.** Two distinct API-key leak reports in consecutive days ([#9386](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) closed, [#9813](https://github.com/zeroclaw-labs/zeroclaw/issues/9813) open) plus the browser arbitrary-file-write fix suggest users are actively probing security boundaries.
- **SOP subsystem trust is eroding.** Multiple filed bugs describe silent failures, stuck runs, and missing diagnostics: "a malformed SOP and an absent SOP are indistinguishable" ([#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786)). Docs promise cron watch-loops that cannot do network work ([#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780)).
- **Configuration confusion is common.** Fallback providers "correctly configured can never fire" ([#9812](https://github.com/zeroclaw-labs/zeroclaw/issues/9812)); `cron update` silently discards declarative changes ([#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770)); bare `vision_model_provider` cannot select the migrated alias ([#9707](https://github.com/zeroclaw-labs/zeroclaw/pull/9707)).
- **Process fatigue is explicit.** [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) states the RFC process is "slower and more cumbersome than the decisions it is meant to support"; [#9530](https://github.com/zeroclaw-labs/zeroclaw/issues/9530) flags conflicting risk-label guidance; [#9817](https://github.com/zeroclaw-labs/zeroclaw/pull/9817) proposes gating RFC intake on an explicit trigger.
- **Positive signals:** large, well-scoped contributions from labeled contributors (distinguished/principal/trusted/experienced) across web, MCP, providers, and channels; accepted observability RFCs show maturing design discipline; the health-check false positive ([#9811](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)) shows users are actively validating operational behavior.

## 8. Backlog Watch

- **[#5937 — Unify providers architecture and reqwest client management](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)** (Apr 20, `status:accepted`, 12 comments) — accepted for nearly four months with no implementation start; increasingly a dependency for other provider work.
- **[#7130 — Workspace-wide forbid(unsafe_code) with aardvark-sys carve-out](https://github.com/zeroclaw-labs/zeroclaw/issues/7130)** (Jun 3, `status:accepted`) — accepted but unstarted.
- **[#6663 — Telegram tool-call progress during partial streaming](https://github.com/zeroclaw-labs/zeroclaw/issues/6663)** (May 14, `status:accepted`) — accepted, stale.
- **[#7100 — Per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)** (Jun 2, `p1`, `needs-maintainer-review`) — high-impact; blocked on maintainer review.
- **[#8424 — Workspace-relative forbidden paths / .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)** (Jun 28, `needs-author-action`) — security-relevant; waiting on author.
- **[#8043 — Retire aardvark-sys crate](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)** (Jun 20, `needs-author-action`) — architecture cleanup waiting on author.
- **[#6808 — Governance RFC: Work Lanes and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (May 20, 20 comments) — ratification deferred for months; this is the single largest open governance item and deserves maintainer resolution.

**PRs needing maintainer attention:** the XL web multi-conversation pair ([#9353](https://github.com/zeroclaw-labs/zeroclaw/pull/9353), [#9355](https://github.com/zeroclaw-labs/zeroclaw/pull/9355)), the stacked skills auto-activation work ([#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965), blocked on [#9563](https://github.com/zeroclaw-labs/zeroclaw/pull/9563)), the Grok Build ACP provider ([#9104](https://github.com/zeroclaw-labs/zeroclaw/pull/9104)), and Telegram multi-message streaming ([#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561), open since Jun 30).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*