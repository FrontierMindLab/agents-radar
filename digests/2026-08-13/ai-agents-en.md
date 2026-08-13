# OpenClaw Ecosystem Digest 2026-08-13

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-13 01:04 UTC

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

## OpenClaw Project Digest — 2026-08-13

### 1. Today's Overview
OpenClaw activity remains very high: **500 issues and 500 PRs were updated in the last 24 hours**, with **396 issues open** and **343 PRs open**. In that window, **104 issues were closed** and **157 PRs were marked merged/closed**, but **no new release was published**. The dominant themes are recurring reliability defects around silent reply loss and subagent completion delivery, plus a long tail of feature requests waiting on maintainer/product decisions. Overall project health is active but strained by several unresolved P1 reliability issues and a growing backlog of older items.

---

### 2. Releases
**No new releases were published in the last 24 hours.** There are therefore no release notes, breaking-change notes, or migration instructions to report.

---

### 3. Project Progress
While the full merge list is not enumerated in the sampled data, **157 PRs moved to merged/closed** and **104 issues were closed** during the window.

Among the most visible PRs currently moving through review:

- [[#119988] fix(cli): limit attach SIGINT shutdown to direct child and add force-kill timeout](https://github.com/openclaw/openclaw/pull/119988) — closed PR addressing Ctrl+C being swallowed during `openclaw attach`.
- [[#110561] fix(sqlite): normalize BLOB/TEXT type mismatches during STRICT migration](https://github.com/openclaw/openclaw/pull/110561) — prevents gateway startup crashes on legacy STRICT-migration tables.
- [[#116253] fix(embedded-runner): flush partial streaming output before run budget abort](https://github.com/openclaw/openclaw/pull/116253) — preserves half-streamed replies when a run-budget deadline hits.
- [[#122344] fix(models): make picker discovery profile-aware](https://github.com/openclaw/openclaw/pull/122344) — improves OpenAI model discovery and auth-profile association.
- [[#122650] fix(reasoning-tags): strip internal reflection blocks from visible replies](https://github.com/openclaw/openclaw/pull/122650) — prevents private model reasoning from leaking into Telegram-visible messages.
- [[#122889] fix: restore Gateway startup for migrated multi-agent configs](https://github.com/openclaw/openclaw/pull/122889) — addresses `AGENT_SELECTION_REQUIRED` failures after migration.

These PRs cluster around the same areas as the most-reported bugs: message delivery, model/auth handling, SQLite state migration, and gateway reliability.

---

### 4. Community Hot Topics
The most active issues by comment count reveal deep user concern about reliability and trust:

- [[#121058] Silent reply failures still recurring after #116277 closed — no queued reply payload](https://github.com/openclaw/openclaw/issues/121058) — **91 comments**. The monitoring cron continues to log silent-reply failures even after the previous fix was closed. This is the clearest signal that a class of delivery bugs remains unresolved.
- [[#7707] Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — **45 comments**. Users want memory entries tagged by origin to prevent prompt-injection/memory-poisoning from untrusted web scrapes and third-party skills.
- [[#44925] Subagent completion silently lost — no retry, no notification, no auto-restart on timeout](https://github.com/openclaw/openclaw/issues/44925) — **26 comments**. Multiple subagent-completion failure modes leave no visible result to the user.
- [[#77598] Track live dev agent behavior and trajectory](https://github.com/openclaw/openclaw/issues/77598) — **23 comments**. Maintainer-run observational watch over a live dev agent; valuable for understanding real agent behavior.
- [[#39604] Feature: Add tools.web.fetch.allowPrivateNetwork to allow private network access](https://github.com/openclaw/openclaw/issues/39604) — **14 comments / 12 👍**. Strong demand for an opt-in private-network fetch capability.
- [[#43367] Multi-agent orchestration is unstable](https://github.com/openclaw/openclaw/issues/43367) — **14 comments**. Concurrent agent add/config overwrites and session-lock failures make multi-agent use unreliable.

Underlying needs: users want dependable delivery guarantees, memory security boundaries, stable multi-agent orchestration, and finer-grained network/configuration controls.

---

### 5. Bugs & Stability
The most severe reported bugs are P1 reliability issues, especially around silent message/subagent loss:

| Severity | Issue | Summary |
|---|---|---|
| **High / ongoing** | [#121058](https://github.com/openclaw/openclaw/issues/121058) | Silent reply failures continue after a prior fix was closed; no queued reply payload. |
| **P1** | [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost; no retry, notification, or auto-restart. |
| **P1** | [#67777](https://github.com/openclaw/openclaw/issues/67777) | Subagent completion delivery can be lost on direct-announce timeout, drain, or orphan prune. |
| **P1** | [#92433](https://github.com/openclaw/openclaw/issues/92433) | Subagent completion silently dropped when announce is steered into a requester run that ends first. |
| **P1** | [#47975](https://github.com/openclaw/openclaw/issues/47975) | Subagent sessions persist after completion; main session becomes unresponsive. |
| **P1** | [#72015](https://github.com/openclaw/openclaw/issues/72015) | Active-memory plugin can block replies and overload multi-agent gateways at boot. |
| **P1** | [#91363](https://github.com/openclaw/openclaw/issues/91363) | Isolated cron consistently fails at model-call-started phase. |
| **P1** | [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable: config overwrites, session-lock failures, detached child work. |
| **P1** | [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth timeout. |
| **P1** | [#111498](https://github.com/openclaw/openclaw/issues/111498) | Main agent blocked by persistent workspace-state migration after Anthropic auth recovery. |
| **P1** | [#78493](https://github.com/openclaw/openclaw/issues/78493) | `sudo openclaw update` can create mixed ownership; doctor then overwrites config after EACCES. |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped hook/tool child processes cause zombie accumulation and runtime degradation. |
| **P1** | [#40611](https://github.com/openclaw/openclaw/issues/40611) | Heartbeat retry behavior blocks Telegram during active conversations. |
| **P1** | [#54488](https://github.com/openclaw/openclaw/issues/54488) | Followup drain monopolizes session lane, blocking inbound dispatch for 20–30 minutes. |
| **P1** | [#44502](https://github.com/openclaw/openclaw/issues/44502) | Discord routing / mention-gating regression. |
| **P1** | [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat messages append to transcript but do not reliably trigger assistant replies. |

**Relevant fix PRs in flight:** [#105765](https://github.com/openclaw/openclaw/pull/105765) surfaces empty message-tool-only completions; [#116253](https://github.com/openclaw/openclaw/pull/116253) preserves partial streaming output before budget abort; [#110561](https://github.com/openclaw/openclaw/pull/110561) fixes SQLite STRICT migration crashes; [#122650](https://github.com/openclaw/openclaw/pull/122650) strips private reasoning blocks from visible replies; and [#122889](https://github.com/openclaw/openclaw/pull/122889) fixes Gateway startup for migrated multi-agent configs.

---

### 6. Feature Requests & Roadmap Signals
No release was published, so roadmap signals must be inferred from issue/PR momentum. The most likely near-term candidates are:

- **Memory security / provenance** — [#7707 Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) remains highly active and is security-relevant.
- **Subagent completion routing** — [#101248 feat(subagents): add completionTarget for parent-only routing](https://github.com/openclaw/openclaw/pull/101248) directly addresses the repeated subagent-delivery complaints.
- **Private network access** — [#39604 allowPrivateNetwork](https://github.com/openclaw/openclaw/issues/39604) has 12 👍 and a clear implementation shape.
- **Cost/usage visibility** — [#9016 Expose OpenRouter usage cost to agent runtime](https://github.com/openclaw/openclaw/issues/9016).
- **Operational controls** — [#16555 TTL/expiry for delivery-queue messages](https://github.com/openclaw/openclaw/issues/16555), [#45771 pace-aware rate limiting](https://github.com/openclaw/openclaw/issues/45771), [#45758 YAML config support](https://github.com/openclaw/openclaw/issues/45758).
- **UX improvements** — [#99583 intelligent session auto-titling](https://github.com/openclaw/openclaw/issues/99583), [#51028 sessions panel sort by meaningful activity](https://github.com/openclaw/openclaw/issues/51028), [#45508 self-hosted STT/TTS in webchat](https://github.com/openclaw/openclaw/issues/45508).

Features with "needs-product-decision" or "needs-maintainer-review" labels are still awaiting explicit roadmap commitment.

---

### 7. User Feedback Summary
Users are reporting recurring real-world pain:

- **Silent failures are the top frustration.** [#121058](https://github.com/openclaw/openclaw/issues/121058) shows that a previously closed issue is still reproducing in production; users are watching a cron continue to log failures.
- **Subagent/multi-agent workflows are fragile.** Multiple P1s describe lost completions, stuck sessions, lane starvation, and detached child work ([#44925](https://github.com/openclaw/openclaw/issues/44925), [#43367](https://github.com/openclaw/openclaw/issues/43367), [#47975](https://github.com/openclaw/openclaw/issues/47975), [#54488](https://github.com/openclaw/openclaw/issues/54488)).
- **Memory behavior is inconsistent across installs.** [#43747](https://github.com/openclaw/openclaw/issues/43747) reports different memory storage/embedding behavior across three users on what should be the same setup.
- **Auth/provider regressions are disruptive.** [#89278](https://github.com/openclaw/openclaw/issues/89278) Codex OAuth and [#111498](https://github.com/openclaw/openclaw/issues/111498) Anthropic workspace-state migration both block legitimate use.
- **Operational pain points:** `openclaw backup create` stalls on large installs ([#42273](https://github.com/openclaw/openclaw/issues/42273)), zombie process accumulation ([#97616](https://github.com/openclaw/openclaw/issues/97616)), and mixed file ownership after `sudo openclaw update` ([#78493](https://github.com/openclaw/openclaw/issues/78493)).
- **Positive signal:** Maintainers are closing stale/already-fixed items such as [#8299](https://github.com/openclaw/openclaw/issues/8299), [#42820](https://github.com/openclaw/openclaw/issues/42820), [#45031](https://github.com/openclaw/openclaw/issues/45031), and [#57256](https://github.com/openclaw/openclaw/issues/57256), but recurring duplicates around silent replies indicate that some fixes are incomplete.

---

### 8. Backlog Watch
Several important items have been waiting for maintainer attention for weeks or months:

- [[#7707] Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) — opened **Feb 3**, 45 comments, still awaiting maintainer/product decision.
- [[#9016] Expose OpenRouter usage cost to agent runtime](https://github.com/openclaw/openclaw/issues/9016) — opened **Feb 4**, needs maintainer/product decision.
- [[#16555] Add TTL/expiry for delivery-queue messages](https://github.com/openclaw/openclaw/issues/16555) — opened **Feb 14**, needs maintainer/product decision.
- [[#44925] Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925) — opened **Mar 13**, P1, 26 comments, no new fix PR visible.
- [[#43367] Multi-agent orchestration is unstable](https://github.com/openclaw/openclaw/issues/43367) — opened **Mar 11**, P1, linked PR open but still not resolved.
- [[#40611] Heartbeat drift fix causes Telegram blocking](https://github.com/openclaw/openclaw/issues/40611) — opened **Mar 9**, P1, no new fix PR visible.
- [[#91363] Isolated cron consistently fails with "LLM request failed"](https://github.com/openclaw/openclaw/issues/91363) — opened **Jun 8**, P1, 6 👍, still open.

**Older PRs needing maintainer review/proof:**

- [[#81300] codex: plumb session reasoningLevel into codex model_reasoning_summary](https://github.com/openclaw/openclaw/pull/81300) — May 13, status "needs proof".
- [[#71517] media: add shared filename decoder](https://github.com/openclaw/openclaw/pull/71517) — Apr 25, status "needs proof".
- [[#73122] test claude-cli backend registration guardrails](https://github.com/openclaw/openclaw/pull/73122) — Apr 28, status "needs proof".
- [[#110709] fix(gateway): keep channel lifecycle outside released request admission](https://github.com/openclaw/openclaw/pull/110709) — Jul 18, waiting on author.
- [[#110649] fix(acp): stop client setup hanging on unresponsive servers](https://github.com/openclaw/openclaw/pull/110649) — Jul 18, needs proof.
- [[#110138] fix(openrouter): add model-aware tool schema normalization for proxied providers](https://github.com/openclaw/openclaw/pull/110138) — Jul 17, waiting on author.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Open-Source Ecosystem
**Date:** 2026-08-13 | **Data window:** Last 24 hours

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is experiencing a **rapid expansion phase**, with the 12 tracked projects collectively processing **~1,240 issues and ~1,290 PR updates** in a single day. The ecosystem remains heavily concentrated around the OpenClaw reference architecture, with at least four named derivatives (NanoClaw, PicoClaw, ZeptoClaw, ZeroClaw) and several independent implementations (Hermes, IronClaw, CoPaw, NanoBot, LobsterAI). Two structural trends dominate: **reliability hardening** (silent message loss, subagent completion delivery, gateway crashes) and **extensibility** (plugin interfaces, provider expansion, channel integrations). Community attention is increasingly split between the largest general-purpose runtime (OpenClaw) and smaller, more focused projects that ship releases faster. Projects with zero 24h activity (NullClaw, Moltis, ZeptoClaw) highlight a long-tail survival risk in the ecosystem.

---

## 2. Activity Comparison

| Project | Issues Updated (Closed) | PRs Updated (Merged/Closed) | Releases | Health Score |
|---|---|---|---|---|
| **OpenClaw** | 500 (~104) | 500 (~157) | None | 6.5/10 — Active but strained; repeated P1 silent-reply failures, no release cadence |
| **IronClaw** | 41 (12) | 50 (19) | v1.2.0-rc.2, rc.3 | 8/10 — Healthy cadence, rapid throughput; Telegram P1 cluster untriaged |
| **CoPaw** | 29 (7) | 42 (15) | v2.1.0-beta.4 | 7/10 — Responsive beta cycle; agent early-stopping and Windows crashes unresolved |
| **NanoBot** | 8 (4) | 36 (17) | None | 7.5/10 — Productive, security-focused; P0 session-save PR open |
| **Hermes Agent** | 50 (13) | 50 (~3) | None | 6.5/10 — Strong plugin momentum; two P1 desktop/gateway regressions |
| **ZeroClaw** | 50 (5) | 50 (14) | None (v0.8.3 latest) | 6.5/10 — Steady issue-driven work; S1 Windows/macOS/tool bugs unfixed |
| **NanoClaw** | 4 (0) | 10 (1) | None | 6/10 — Active architecture migration; two high-severity regressions |
| **LobsterAI** | 6 | 8 (7) | None (release branch) | 6/10 — Good merge rate; stale Q1 backlog, uninstaller trust issue |
| **PicoClaw** | 2 (0) | 3 (0) | None | 5/10 — Stale issues, no merge activity, MCP-hang bug |
| **NullClaw** | 0 | 0 | None | N/A — No activity |
| **Moltis** | 0 | 0 | None | N/A — No activity |
| **ZeptoClaw** | 0 | 0 | None | N/A — No activity |

**Top-line takeaway:** OpenClaw's raw volume is an order of magnitude above all peers, but IronClaw is the only project converting high activity into shipped releases (2 RCs in 24h). Community scale ≠ delivery velocity.

---

## 3. OpenClaw's Position

**Advantages**
- **Unmatched community size:** 500 issues/500 PRs updated daily vs. ~50/50 for the next tier (Hermes, ZeroClaw). ~740 open items represent an enormous contributor pool and bug-discovery surface.
- **Core reference status:** Multiple ecosystem projects (NanoClaw, PicoClaw, derivatives) build on its architecture; it sets the de facto standard for gateway/subagent/memory design.
- **Breadth of features:** Delivery queue, multi-agent orchestration, memory plugins, model picker, embedded runners — the widest surface of any project.

**Technical approach differences**
- Monolithic gateway runtime with subagent orchestration, Telegram as primary reference channel, SQLite state, and a plugin/memory ecosystem. Peers have diverged: IronClaw integrates NEAR Web3 identity/staking; CoPaw targets Qwen models with SIP/OneBot channels; NanoBot emphasizes tool-execution sandboxing; Hermes bets on a formal plugin lifecycle interface.

**Community and credibility gaps**
- **Reliability strain:** The most-commented issue (91 comments on #121058, silent reply failures) is a previously "fixed" bug still reproducing in production. Five P1s concern lost subagent completions — an existential trust problem.
- **No release published** despite 157 PRs merged/closed in 24h. IronClaw and CoPaw ship RCs/betas; OpenClaw's absence of observable release cadence undercuts its community scale advantage.
- **Backlog age:** Top feature requests (memory trust tagging #7707, OpenRouter cost #9016) have waited since February without a maintainer decision.

---

## 4. Shared Technical Focus Areas

Requirements emerging across multiple projects, independent of each other:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Delivery guarantees & silent-failure elimination** | OpenClaw, IronClaw, NanoBot, NanoClaw, ZeroClaw, CoPaw, Hermes | Subagent completion routing, no silent reply drops, stuck-agent detection, cron output delivery, duplicate message prevention |
| **Memory security, provenance & session isolation** | OpenClaw, NanoBot, CoPaw, Hermes | Source trust-tagging against prompt injection, session history outside workspace, honest system prompts, no transcript pollution |
| **Multi-agent / subagent orchestration stability** | OpenClaw, CoPaw, IronClaw, Hermes | Completion routing (parent-only), session-lock fixes, no duplicate shadow sessions, lane starvation prevention |
| **Network access hardening & SSRF controls** | OpenClaw, NanoBot, ZeroClaw, NanoClaw | Opt-in private-network fetch, credential-bearing URL scrubbing, `allowed_private_hosts` gates |
| **Plugin extensibility & governance** | Hermes, NanoClaw, CoPaw, ZeroClaw, LobsterAI | Lifecycle hooks, plugin channel configurators, Windows junction-safe installs, approval for cron/injection capabilities |
| **Provider/model flexibility & token-cost optimization** | Hermes, NanoBot, CoPaw, IronClaw, LobsterAI, OpenClaw | Lazy tool-schema loading, DeepSeek/QwenCloud support, prefix-cache stabilization, per-model thinking levels, usage-cost exposure |
| **Desktop & gateway reliability** | Hermes, ZeroClaw, LobsterAI, CoPaw, IronClaw | No gateway reaping on restart, installer fixes, blank-window prevention, no restart loops |
| **Windows/macOS platform parity** | ZeroClaw, IronClaw, LobsterAI, CoPaw, Hermes | CI coverage, PowerShell native shell, atomic rename semantics, keychain auto-detection |

**Standout cross-cutting needs:** (1) **Silent failure elimination** appears in 7 of 9 active projects — this is the ecosystem's #1 pain point. (2) **Memory provenance/anti-poisoning** is rising fast (OpenClaw #7707, NanoBot session isolation, CoPaw prompt honesty). (3) **Token-cost optimization** is the highest-reacted demand after reliability (Hermes #6839: 18👍).

---

## 5. Differentiation Analysis

| Project | Core Focus | Target Users | Architecture Highlights |
|---|---|---|---|
| **OpenClaw** | General-purpose agent runtime, maximal feature surface | Power users, self-hosters | Monolithic gateway, subagent orchestration, Telegram-centric, SQLite state |
| **IronClaw** | NEAR AI cloud integration, monetization | NEAR ecosystem developers, cloud consumers | Channel-first onboarding, Web3 staking, design-system epic, RC release pipeline |
| **CoPaw** | Qwen-model optimization, China ecosystem | Chinese-market users, voice/TTS workflows | Beta-stabilizing desktop, SIP/OneBot channels, DataPaw runtime, MiniMax TTS |
| **NanoBot** | Security-hardened execution, rapid provider expansion | Privacy-sensitive developers | ExecTool boundary guards, Jina URL scrubbing, DeepSeek Responses API |
| **Hermes Agent** | Plugin interface expansion, desktop gateways | Plugin developers, WeChat/QQ/Telegram users | Lifecycle hooks, event bus, community plugin index, Linux keychain handling |
| **ZeroClaw** | ZeroCode/no-code automation, cross-platform parity | No-code users, Windows/macOS desktop | ZeroCode TUI, SOP pane, PowerShell native shell, response-cache boundaries |
| **NanoClaw** | Agent template→plugin migration, channel connectors | Channel integrators | Modular provider skills, setup wizard, WhatsApp/Signal defensive fixes |
| **LobsterAI** | Chinese-market Electron desktop, cowork | NetEase Youdao users | Renderer UI polish, per-model thinking levels, Windows junction-safe plugins |

**Key architectural splits:** (1) **Cloud vs. self-host:** IronClaw leans into NEAR cloud + staking; everything else is self-host-first. (2) **Channel strategy:** OpenClaw/Telegram and Hermes/WeChat+QQ optimized for specific platforms; NanoClaw and ZeroClaw pursue broad channel coverage. (3) **Extensibility model:** Hermes formalizes plugins via lifecycle contracts; NanoClaw migrates templates into versioned plugin directories; CoPaw is adding plugin-channel configurators. (4) **Monetization:** Only IronClaw has a native payment/staking path; the rest are infrastructure-only.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (high throughput, release evidence or large contributor base):**
- **IronClaw** — Best equilibrium: 19 PRs closed, 12 issues closed, 2 RCs shipped. QA bug-bash culture produces dense, actionable defect clusters.
- **CoPaw** — Fast beta cycle (v2.1.0-beta.4), 15 PRs merged, active first-time contributors. Beta-phase churn is expected.
- **NanoBot** — Quietly efficient: 17 PRs closed, strong security posture, but a P0 session-save PR indicates latent data-loss risk.
- **OpenClaw** — Massive contributor velocity, but velocity is outpacing verification: duplicate bug reports (silent replies), reopened issues, and no shipped release in the window.

**Tier 2 — Moderate iteration (steady but constrained):**
- **Hermes Agent** — High PR submission (plugin batch) but low merge rate in-window; P1 desktop regressions cap momentum.
- **ZeroClaw** — Consistent 50/50 update volume, 14 PRs merged, but S1 platform blockers and a blocked Security CI (RUSTSEC-2026-0247) create drag.
- **NanoClaw** — Architecturally ambitious (Agent Plugin migration) but stacked-PR dependencies delay landing; two high-severity regressions need triage.
- **LobsterAI** — Good merge discipline (7/8 PRs), but backlog is disproportionately old (March 2026) and trust-adjacent (uninstaller behavior).

**Tier 3 — Stalled/at risk:**
- **PicoClaw** — Both active bugs are `stale`-labeled; zero merges in window; contributor momentum at risk.
- **NullClaw, Moltis, ZeptoClaw** — No activity; effectively dormant or dead.

---

## 7. Trend Signals

Extracted from 24h community feedback across ~200 distinct issue threads; actionable for AI agent developers:

1. **Delivery guarantees are the new table stakes.** Silent reply loss (OpenClaw #121058, 91 comments), subagent completion drops (5 P1s), agent early-stopping (CoPaw #6921), and cron output loss (ZeroClaw #9340) all point to one demand: *agents must either deliver or visibly fail with retry*. Monitoring/observability hooks (stream observers, run-status icons) are the emerging remedy.

2. **Memory is a security boundary, not a feature.** Cross-project demand for source trust-tagging, session history isolation outside workspace-scoped tools, and honest system prompts signals a maturing awareness of prompt-injection and memory-poisoning risk. Expect provenance metadata and anti-poisoning controls to become default requirements.

3. **Token economy drives feature priority.** Lazy tool-schema loading (Hermes #6839: 3.5k–5k tokens/call wasted), prefix-cache stabilization (CoPaw), per-model thinking levels (LobsterAI), and usage-cost exposure (OpenClaw) show cost efficiency is now a first-class UX concern, especially for local-model users.

4. **Plugin ecosystems need governance, not just APIs.** Hermes' lifecycle-event catalog, CoPaw's plugin approval gaps (silent cron creation), and LobsterAI's Windows junction handling converge on the same insight: plugin power must come with lifecycle management, security review, and uninstall guarantees.

5. **Release cadence is a trust mechanism.** Projects that ship visible RCs/betas (IronClaw, CoPaw) maintain user confidence despite bugs; OpenClaw's scale without observable releases erodes it. For developers: ship small, ship often, and make release notes part of the feedback loop.

6. **Multi-agent reliability is the next frontier.** Subagent completion routing, session deduplication, and lane starvation are unsolved across OpenClaw, CoPaw, and Hermes. Whoever solves deterministic subagent delivery first will define the pattern for the ecosystem.

7. **Platform parity is a differentiator.** Windows/macOS failures (74 Windows test failures, blank macOS windows, installer crashes, keychain gaps) are disproportionately common across Tier-1/2 projects — a market opening for any project that treats desktop parity as a priority rather than an afterthought.

8. **Channel completeness drives real-world adoption.** Matrix thread context, WeChat login persistence, Telegram topic/forum support and file attachments, Signal DM delivery — users evaluate agents by their least-functional channel, not their best one.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-13

## 1. Today's Overview

NanoBot saw a high-activity 24h window: 8 issues were updated (4 closed) and 36 PRs were updated (17 closed/merged), with no new release published. The dominant workstreams are security hardening around tool execution and URL fetching, plus provider/API expansion such as DeepSeek V4 Pro Responses support. Several WebUI and channel improvements are also in flight, including session collaboration, setup flows, WeChat login persistence, and Matrix reply handling. The project is productive overall, but a P0 session-save race and several “conflict”-labelled PRs remain open, suggesting some merge debt is accumulating.

## 2. Releases

No new releases were published in this window. The latest releases list is empty.

## 3. Project Progress

Closed/merged PRs observed in this window:

- [PR #5230 — fix(gemini): preserve imported tool calls with signature fallback](https://github.com/HKUDS/nanobot/pull/5230)  
  Fixes Gemini replay failures when conversation history is imported from a provider that does not generate Gemini thought signatures.

- [PR #5329 — fix(exec): guard bare and named-user home paths](https://github.com/HKUDS/nanobot/pull/5329)  
  Closes workspace-boundary bypasses in `ExecTool` around tilde expansion, including `~`, `~user`, redirections, and assignment values.

- [PR #5258 — fix(web): keep credential-bearing URLs away from the remote Jina reader](https://github.com/HKUDS/nanobot/pull/5258)  
  Stops userinfo and token/signature-style query parameters from being forwarded to Jina; local readability fallback is used instead.

- [PR #5320 — fix(docker): restore capabilities for privilege drop](https://github.com/HKUDS/nanobot/pull/5320)  
  Keeps `cap_drop: ALL` while restoring the capabilities needed by the root bootstrap path, with `no-new-privileges` enabled.

- [PR #5362 — feat(providers): support DeepSeek V4 Pro Responses](https://github.com/HKUDS/nanobot/pull/5362)  
  Routes `deepseek-v4-pro` through DeepSeek’s native Responses API alongside `deepseek-v4-flash`.

- [PR #5218 — fix(tools): treat redirection and grouping delimiters in ExecTool path guard](https://github.com/HKUDS/nanobot/pull/5218)  
  Hardens workspace path extraction against shell redirection and grouping operators.

- [PR #5279 — fix(session): store session history outside the agent workspace](https://github.com/HKUDS/nanobot/pull/5279)  
  Moves transcripts from `<workspace>/sessions/` to `<config-dir>/sessions/<workspace-id>/`, preventing agent tools from reaching session history.

- [PR #4878 — feat(hooks): add auto-discovery mechanism for agent hooks](https://github.com/HKUDS/nanobot/pull/4878)  
  Adds hook registration via `pkgutil` scanning and entry points, matching the existing channel/tool discovery pattern.

## 4. Community Hot Topics

- [Issue #5327 — “Nanobot repeats multiple times the same message while reasoning”](https://github.com/HKUDS/nanobot/issues/5327)  
  Most-commented issue in the window with 11 comments. Users are experiencing random duplicate reasoning phrases, which directly affects perceived reliability of the agent.

- [Issue #5295 — “deploy with docker compose failed: cannot open /usr/local/bin/entrypoint.sh”](https://github.com/HKUDS/nanobot/issues/5295)  
  5 comments. A deployment-blocking Docker Compose problem, since fixed/closed in this window.

- [Issue #4010 — “Feature proposal: text-to-speech / voice output support”](https://github.com/HKUDS/nanobot/issues/4010)  
  3 comments and 3 👍. The most-upvoted open feature request in the current dataset. Voice input already exists; users clearly want the return path.

Underlying needs: users want more reliable agent behavior, smoother Docker-based deployment, and a fuller multimodal conversation loop with voice output.

## 5. Bugs & Stability

Ranked by severity:

- **P0 risk — stale session overwrites**  
  [PR #5271 — fix(session): prevent stale background task saves from overwriting session data](https://github.com/HKUDS/nanobot/pull/5271) remains open and is labelled `priority: p0`. It targets a data-loss scenario where background work saves over a session after `/new` or lifecycle replacement.

- **High user-visible correctness — repeated messages during reasoning**  
  [Issue #5327](https://github.com/HKUDS/nanobot/issues/5327) was closed after 11 comments, but no explicit fix PR is visible in this data. This is important because duplicate reasoning output damages user trust.

- **High deployment blocker — Docker entrypoint permission denied**  
  [Issue #5295](https://github.com/HKUDS/nanobot/issues/5295) was closed. Related Docker hardening landed in [PR #5320](https://github.com/HKUDS/nanobot/pull/5320).

- **High security/privacy — WebFetch sending user URLs to Jina**  
  [Issue #4884](https://github.com/HKUDS/nanobot/issues/4884) was closed, and the fix landed in [PR #5258](https://github.com/HKUDS/nanobot/pull/5258).

- **Security hardening landed for `ExecTool`**  
  [PR #5329](https://github.com/HKUDS/nanobot/pull/5329) and [PR #5218](https://github.com/HKUDS/nanobot/pull/5218) both closed, closing workspace-boundary bypasses around tilde expansion and redirection/grouping delimiters.

- **Medium test reliability — timezone-dependent test failures**  
  [Issue #5348](https://github.com/HKUDS/nanobot/issues/5348) is open: two token-usage settings tests fail during a ~5-hour daily window because `record_token_usage()` uses UTC while settings payloads read the configured timezone.

- **Medium MCP correctness — non-ASCII tool name collisions**  
  [PR #5360 — fix(tools): keep MCP tool names unique for non-ASCII inputs](https://github.com/HKUDS/nanobot/pull/5360) is open. Fully non-ASCII MCP tool names like `"获取天气"` collapse to `_`, causing silent collisions.

## 6. Feature Requests & Roadmap Signals

- [Issue #4010 — text-to-speech / voice output support](https://github.com/HKUDS/nanobot/issues/4010)  
  Open since May, 3 👍. Strong candidate for future roadmap work because voice input already exists and several channels natively support voice notes.

- [Issue #5350 — backward-compatible QwenCloud provider path alongside DashScope](https://github.com/HKUDS/nanobot/issues/5350)  
  New request on 2026-08-12. QwenCloud is the current international Qwen platform; users want it without breaking existing DashScope configurations.

- [Issue #5275 — Matrix “reply in thread” should form a dedicated context](https://github.com/HKUDS/nanobot/issues/5275)  
  Open channel-specific improvement; Matrix users want thread semantics consistent with Discord/Slack.

- Open PRs signalling near-term feature direction:  
  - [PR #5358 — feat(webui): add session collaboration via mentions](https://github.com/HKUDS/nanobot/pull/5358)  
  - [PR #5356 — feat(webui): improve setup flows across chat channels](https://github.com/HKUDS/nanobot/pull/5356)  
  - [PR #5342 — feat(webui): redesign apps discovery](https://github.com/HKUDS/nanobot/pull/5342)

- Provider roadmap is moving quickly: DeepSeek V4 Pro Responses support already closed in [PR #5362](https://github.com/HKUDS/nanobot/pull/5362), and [PR #5204 — refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204) is open with `priority: p1`.

Prediction for next version: the already-closed DeepSeek V4 Pro support is likely in; the same-day WebUI PRs by maintainers around session mentions and setup flows are strong near-term candidates.

## 7. User Feedback Summary

Real user pain points in this window:

- **Reliability of reasoning loop**: duplicated messages during reasoning were reported and generated significant discussion (#5327).
- **Deployment friction**: Docker Compose startup failed with `entrypoint.sh: Permission denied` (#5295).
- **Privacy expectations**: users do not want credential-bearing URLs sent to remote Jina readers (#4884); session history should not be reachable by workspace-scoped tools (#5279).
- **Channel completeness**: Matrix needs proper thread context (#5275), and WeChat QR-login tokens are lost when no `channels` config exists ([PR #5361](https://github.com/HKUDS/nanobot/pull/5361)).
- **Voice and provider coverage**: users are asking for voice output (#4010) and QwenCloud support (#5350).

There is no explicit satisfaction/dissatisfaction survey data, but the high closure rate for security and deployment bugs suggests maintainers are responsive. The 3 👍 on voice output is the clearest demand signal among open feature requests.

## 8. Backlog Watch

Items that may need maintainer attention:

- [Issue #4010 — text-to-speech / voice output support](https://github.com/HKUDS/nanobot/issues/4010)  
  Open since 2026-05-26, most-reacted open feature request. No visible PR or maintainer decision yet.

- [PR #4329 — feat(cli): add native TypeScript terminal UI](https://github.com/HKUDS/nanobot/pull/4329)  
  Open since 2026-06-13 and carries a `conflict` label. Long-running PR that likely needs conflict resolution or explicit closure.

- [PR #5204 — refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204)  
  Open since 2026-08-01, `priority: p1`, with a `conflict` label. Important for provider architecture but currently blocked/unresolved.

- [PR #5271 — fix(session): prevent stale background task saves from overwriting session data](https://github.com/HKUDS/nanobot/pull/5271)  
  Open with `priority: p0`; this is the highest-severity open PR in the dataset.

- [Issue #5275 — Matrix reply-in-thread should form a dedicated context](https://github.com/HKUDS/nanobot/issues/5275)  
  Open since 2026-08-06 with only 1 comment; channel-specific but part of broader thread-context consistency work.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-13

## 1. Today's Overview

Hermes Agent is in a **high-activity development phase**: 50 issues and 50 PRs were updated in the last 24 hours, with 13 issues closed and 47 PRs still open. No new releases were published today. The dominant engineering theme is the **plugin interface expansion** — a large batch of plugin-related PRs landed as open submissions, along with several important desktop/gateway reliability fixes. However, project health is tempered by **two open P1 regressions** around desktop restarts killing messaging gateways and a clarify-response hang bug. Overall, the project shows strong contributor momentum, but desktop/gateway stability remains the main risk area.

## 2. Releases

**No new releases** were published in the last 24 hours. There are no changelog, breaking-change, or migration notes to report.

---

## 3. Project Progress

Today’s PR activity is heavily focused on the **plugin interface expansion** tracked in [#64182](https://github.com/NousResearch/hermes-agent/issues/64182). A large batch of new feature PRs was opened by @teknium1, all still open:

- [#84923](https://github.com/NousResearch/hermes-agent/pull/84923) — Ownership ledger, `on_unload`, and supervised tasks for plugin lifecycle management
- [#84924](https://github.com/NousResearch/hermes-agent/pull/84924) — Streaming output observer hooks (`on_stream_start`, `on_stream_delta`, etc.)
- [#84919](https://github.com/NousResearch/hermes-agent/pull/84919) — Community plugin index + `hermes plugins search`
- [#84934](https://github.com/NousResearch/hermes-agent/pull/84934) — `pre_transcription` hook for STT prompts/vocabulary hints
- [#84927](https://github.com/NousResearch/hermes-agent/pull/84927) — Additive-only redaction pattern registry for plugins
- [#84929](https://github.com/NousResearch/hermes-agent/pull/84929) — `ctx.inject_message(session_key=...)` gateway-session message injection
- [#84932](https://github.com/NousResearch/hermes-agent/pull/84932) — Inter-plugin event bus with declared emits/listens

**Closed PRs today** include the Linux desktop keychain storage fix:

- [#84903](https://github.com/NousResearch/hermes-agent/pull/84903) — Auto-detect Linux keychain backend for secure token storage (salvage of [#41236](https://github.com/NousResearch/hermes-agent/pull/41236))
- [#41236](https://github.com/NousResearch/hermes-agent/pull/41236) — Original Linux keychain backend PR, now closed alongside the salvage

**Other notable fixes opened today:**

- [#84925](https://github.com/NousResearch/hermes-agent/pull/84925) — Gateway honors per-platform session isolation overrides
- [#84926](https://github.com/NousResearch/hermes-agent/pull/84926) — WhatsApp authorized group context handling
- [#84928](https://github.com/NousResearch/hermes-agent/pull/84928) — Nous auth keepalive now refreshes before expiry; prevents predictable 401s
- [#84930](https://github.com/NousResearch/hermes-agent/pull/84930) — Remove `havoc` from known C2 regex false positive
- [#84931](https://github.com/NousResearch/hermes-agent/pull/84931) — Preserve MCP tool attempt identity across retries
- [#84933](https://github.com/NousResearch/hermes-agent/pull/84933) — Fix CDPSupervisor leaking a browser tab on every attach

**Closed issues** show steady completion of plugin-interface sub-tasks, including [#64174](https://github.com/NousResearch/hermes-agent/issues/64174), [#64180](https://github.com/NousResearch/hermes-agent/issues/64180), [#64162](https://github.com/NousResearch/hermes-agent/issues/64162), [#64177](https://github.com/NousResearch/hermes-agent/issues/64177), [#64179](https://github.com/NousResearch/hermes-agent/issues/64179), and [#64230](https://github.com/NousResearch/hermes-agent/issues/64230). Also closed: Windows atomic-write bug [#57775](https://github.com/NousResearch/hermes-agent/issues/57775) and duplicate desktop feature [#84623](https://github.com/NousResearch/hermes-agent/issues/84623).

---

## 4. Community Hot Topics

The most active discussions reveal strong demand for **cost reduction** and **plugin extensibility**.

- [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) — **Lazy Tool Schema Loading / Two-Pass Tool Injection**  
  **39 comments, 18 👍** — the hottest issue today. Users complain that all tool schemas (~3,500–5,000 tokens per call) are injected even when unnecessary, especially painful for local models. This is a clear cost-efficiency pain point.

- [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) — **Plugin Interface Expansion tracking**  
  **33 comments** — the community reference plan for the plugin expansion. Many PRs today directly implement its sub-issues.

- [#64231](https://github.com/NousResearch/hermes-agent/issues/64231) — **Lifecycle-event catalog and hook taxonomy**  
  **24 comments** — users/contributors want a standardized hook model instead of one-off `VALID_HOOKS` additions.

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — **Skills index stale/degraded**  
  **19 comments** — automated freshness probe failed repeatedly; docs/skills dependency on `skills-index.json` is unstable.

- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) — **Desktop restart reaps live gateway**  
  **9 comments** — P1 regression; WeChat/QQ/Telegram go silent until manual gateway restart.

- [#78069](https://github.com/NousResearch/hermes-agent/issues/78069) — **Clarify free-text response fails to bind**  
  **9 comments** — P1 intermittent bug where turns hang until the 3600s timeout.

- [#45779](https://github.com/NousResearch/hermes-agent/issues/45779) — **Multi-gateway tabs in Desktop**  
  **6 comments, 7 👍** — users want one Desktop app connected to multiple Hermes gateways.

---

## 5. Bugs & Stability

Ranked by severity:

### P1 — Critical / user-facing regressions

- [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) — Desktop app restart force-kills the live messaging gateway and never relaunches it. Affects WeChat/QQ/Telegram. No fix PR appears in today’s data.
- [#84824](https://github.com/NousResearch/hermes-agent/issues/84824) — Duplicate/reinforcement: Desktop serve boot reaps a healthy detached gateway via SIGKILL.
- [#78069](https://github.com/NousResearch/hermes-agent/issues/78069) — Clarify reply intermittently fails to bind, hanging the turn indefinitely.
- [#82975](https://github.com/NousResearch/hermes-agent/issues/82975) — Child issue: Telegram clarify bypass misses on profile-namespaced session keys.

### P2 — Significant

- [#83427](https://github.com/NousResearch/hermes-agent/issues/83427) — `browser_exec` crashes with `pydantic_core ModuleNotFoundError` when `PYTHONPATH` points at Hermes venv.
- [#71331](https://github.com/NousResearch/hermes-agent/issues/71331) — `install.sh` fails on Termux when default Python is 3.14+, because the check only validates the lower Python bound.
- [#84870](https://github.com/NousResearch/hermes-agent/issues/84870) — Session list shows stale lineage ROOT instead of live tip after `/new` resets.
- [#84871](https://github.com/NousResearch/hermes-agent/issues/84871) — Discord triggering-message context leaks into stored messages and session titles.

### P3 — Stability/watchdog

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index is degraded: 29.8h old against a 26h freshness limit.

### Fixed/closed today

- [#57775](https://github.com/NousResearch/hermes-agent/issues/57775) — Windows `atomic_replace()` silently drops writes on `ERROR_SHARING_VIOLATION` — closed.
- [#62294](https://github.com/NousResearch/hermes-agent/issues/62294) — Desktop cannot save remote gateway tokens on Linux without keyring service — closed via [#84903](https://github.com/NousResearch/hermes-agent/pull/84903).

---

## 6. Feature Requests & Roadmap Signals

The **plugin interface expansion** is effectively the next roadmap milestone. Multiple sub-issues now have open PRs, strongly suggesting a plugin-heavy next release:

- [#64182](https://github.com/NousResearch/hermes-agent/issues/64182) — Tracking: Plugin Interface Expansion (July 2026 community ideas)
- PRs landed today for ownership, streaming hooks, plugin search, redaction patterns, message injection, event bus, and STT hooks.

Other user-requested features that could appear in upcoming versions:

- [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) — **Lazy Tool Schema Loading** — highest community demand; likely to move forward after a decision on `needs-decision`.
- [#45779](https://github.com/NousResearch/hermes-agent/issues/45779) — **Multi-gateway tabs in Desktop** — 7 👍, no PR yet, but desktop reliability issues may need fixing first.
- [#46257](https://github.com/NousResearch/hermes-agent/issues/46257) — **Xiaomi MiMo-V2.5 TTS & ASR provider support** — still waiting on decision.
- [#84921](https://github.com/NousResearch/hermes-agent/issues/84921) — **`display.autolink_urls` setting** to disable automatic URL-to-link conversion in Desktop — small but likely easy win.
- [#38275](https://github.com/NousResearch/hermes-agent/issues/38275) — **HAMP: Agent Address System + Async Messaging + Cryptographic Identity** — more speculative/innovation-track.
- [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) — **Webhook Revolution graph-gated repair campaign** — new epic meta-issue covering the full webhook surface.

---

## 7. User Feedback Summary

User sentiment this week is mixed: **appreciation for plugin momentum**, but increasing frustration around **desktop/gateway reliability and cost overhead**.

Key pain points voiced by users:

- **Token waste**: #6839 — "3,500–5,000 tokens per call" for tools never used; especially painful for local-model users.
- **Desktop silently breaks messaging**: #83683, #84824 — gateway is killed on app restart with no relaunch; bots go silent.
- **Clarify hangs**: #78069, #82975 — free-text answers intermittently never bind to pending asks, causing indefinite delays.
- **Environment-specific breakage**: #71331 (Termux/Python 3.14), #83427 (browser_exec/PYTHONPATH).
- **Transcript/session pollution**: #84871 — Discord internal triggering wrappers pollute exports and titles.
- **Linux keychain frustration**: #62294 — now resolved with the keychain backend auto-detection PR.

Positive signals:

- The plugin interface expansion is visibly progressing, with **salvaged community PRs** and authorship preserved — e.g., [#84923](https://github.com/NousResearch/hermes-agent/pull/84923), [#84927](https://github.com/NousResearch/hermes-agent/pull/84927), [#84932](https://github.com/NousResearch/hermes-agent/pull/84932). This indicates maintainer responsiveness to community contributions.

---

## 8. Backlog Watch

Issues/PRs that appear stalled or need maintainer attention:

- [#6839](https://github.com/NousResearch/hermes-agent/issues/6839) — Lazy Tool Schema Loading: opened **2026-04-09**, 18 👍, still `needs-decision`; extremely high community value.
- [#45779](https://github.com/NousResearch/hermes-agent/issues/45779) — Multi-gateway Desktop tabs: opened **2026-06-13**, 7 👍, no associated PR.
- [#38275](https://github.com/NousResearch/hermes-agent/issues/38275) — HAMP agent address system: opened **2026-06-03**, low comments, no maintainer traction.
- [#46257](https://github.com/NousResearch/hermes-agent/issues/46257) — Xiaomi MiMo-V2.5 TTS/ASR: opened **2026-06-14**, still `needs-decision`.
- [#71331](https://github.com/NousResearch/hermes-agent/issues/71331) — Termux install Python 3.14 failure: opened **2026-07-25**, P2, no fix PR yet.
- [#64745](https://github.com/NousResearch/hermes-agent/pull/64745) — Hindsight prefetch session-identity fix: open since **2026-07-15**, updated but unmerged.
- [#62663](https://github.com/NousResearch/hermes-agent/pull/62663) — Cron stale-session reaper + `final_response` persistence: open since **2026-07-11**, still awaiting merge.
- [#82649](https://github.com/NousResearch/hermes-agent/pull/82649) — Standalone memory provider support (GBrain integration): draft, opened **2026-08-09**, needs maintainer review.

Overall, **Hermes Agent is in a healthy but intense development phase**: the plugin roadmap is moving quickly, while desktop/gateway stability and token-cost optimization remain the top community concerns.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-13

## 1. Today's Overview
PicoClaw shows moderate activity in the last 24 hours: 2 open issues were updated, 3 open pull requests were updated, and no new releases were published. All updated issues remain open and carry `stale` labels, while no PRs were merged or closed today. The active PRs point to ongoing community work around agent context management, Telegram topic support, and a new Exa web search provider. Overall, the project appears stable but is accumulating open, stale items that could benefit from maintainer attention.

## 2. Releases
No new releases were published in the last 24 hours. The latest releases section is empty, so there are no release notes, breaking changes, or migration notes to report.

## 3. Project Progress
No PRs were merged or closed today. The following open PRs were recently updated and represent work-in-progress:

- [PR #3316 — fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap](https://github.com/sipeed/picoclaw/pull/3316)  
  Addresses routed agents not remembering prior messages and auto-compaction never triggering for a specific Discord channel session.

- [PR #3315 — Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)  
  Fixes Telegram topic handling for private bot chats with forum topic mode enabled.

- [PR #3299 — Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)  
  Adds Exa as a native `tools.web` / `web_search` provider with date-range filters and API key authentication.

These PRs indicate active community contributions on agent memory, messaging-platform integration, and search capability, but none have been merged yet.

## 4. Community Hot Topics
The most active issues by comments/reactions are both open and stale:

- [Issue #3281 — Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  **Comments:** 4 · **Reactions:** 👍 1  
  User reports input lag in the PicoClaw Web UI as chat history grows.

- [Issue #3269 — If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying to users](https://github.com/sipeed/picoclaw/issues/3269)  
  **Comments:** 4 · **Reactions:** 👍 1  
  User reports complete stop of responses when the MCP server connection fails.

Underlying needs: users expect smooth Web UI interaction even with longer sessions, and they expect the agent to fail gracefully or recover when MCP dependencies break.

## 5. Bugs & Stability
Two open bugs were updated in the last 24 hours, both with `stale` labels:

- **High severity:** [Issue #3269 — MCP server connection failure hangs the agent loop and stops chat replies](https://github.com/sipeed/picoclaw/issues/3269)  
  This can block all user-facing responses in the chat interface, making it a reliability-critical bug. No fix PR is currently linked.

- **Medium severity:** [Issue #3281 — Web UI chat input laggy with moderately long history](https://github.com/sipeed/picoclaw/issues/3281)  
  Causes degraded interactivity and poor user experience in longer sessions. No fix PR is currently linked.

No new crashes or regressions were filed today. Both bugs are long-standing enough to be marked stale, which increases risk of them being overlooked.

## 6. Feature Requests & Roadmap Signals
There are no new feature-request issues in this window. However, open PRs signal likely roadmap direction:

- **Native Exa web search provider** ([PR #3299](https://github.com/sipeed/picoclaw/pull/3299)) — suggests continued investment in web search integrations.
- **Telegram topics in private bot chats** ([PR #3315](https://github.com/sipeed/picoclaw/pull/3315)) — improves Telegram UX for forum-mode bots.
- **Routed-agent context and compression fixes** ([PR #3316](https://github.com/sipeed/picoclaw/pull/3316)) — points to work on session memory, summarization, and auto-compaction.

If these PRs land, the next PicoClaw version may include better multi-channel context handling, Telegram topic support, and an Exa search provider.

## 7. User Feedback Summary
User-reported pain points in this window focus on:

- Web UI becoming sluggish with long chat history, hurting daily usability.
- MCP connection failures causing complete chat unresponsiveness, which users perceive as a critical stability problem.

Users are also actively building workflows that rely on routing agents to specific channels (e.g., Discord), using Telegram topics in private chats, and integrating web search providers. This suggests real-world adoption in multi-platform, agent-routing scenarios where memory and reliability are important.

## 8. Backlog Watch
The following items need maintainer attention:

- [Issue #3281 — Web UI laggy with long history](https://github.com/sipeed/picoclaw/issues/3281) — open since 2026-07-21, stale, no fix PR.
- [Issue #3269 — MCP failure hangs agent loop](https://github.com/sipeed/picoclaw/issues/3269) — open since 2026-07-20, stale, no fix PR.
- [PR #3299 — Native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — open since 2026-07-26 with no merge activity.
- [PR #3316 — Routed-agent context management fix](https://github.com/sipeed/picoclaw/pull/3316) — open since 2026-08-03, no comments/merge data.
- [PR #3315 — Telegram topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315) — open since 2026-08-03, no comments/merge data.

Without maintainer review, these stale issues and unmerged PRs may continue to age and risk losing contributor momentum.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-13

## 1. Today's Overview

NanoClaw is in an active development and contribution window: 4 issues and 10 pull requests were updated in the last 24 hours, with 1 PR closed/merged and 9 still open. The main focus is the ongoing **agent template → Agent Plugin migration** pushed by the core team, along with a steady stream of community connector fixes for WhatsApp, Signal, and Telegram. No new releases were published. Overall project health looks solid, with a mix of maintainer-driven architectural work and externally contributed bug fixes, though several older PRs remain idle and some newly reported regressions need attention.

## 2. Releases

No new releases were published in this window. The latest release data is empty, so no changelog, breaking-change, or migration notes are available.

## 3. Project Progress

One PR moved to closed/merged status:

- [#3086 [CLOSED] fix(whatsapp): validate recipient exists before sending](https://github.com/nanocoai/nanoclaw/pull/3086) — This fixes silent WhatsApp send failures where Baileys accepts invalid JIDs and reports success even when the message never reaches a valid recipient.

Additional active PRs continue to advance several feature areas:

- [#3220 [OPEN] feat!: agent templates become Agent Plugins 1.0.0 directories](https://github.com/nanocoai/nanoclaw/pull/3220) — Core engine/format migration with security hardening around stamp-time symlinks, capabilities, and secret handling.
- [#2909 [OPEN] feat(setup): template setup flow in the wizard and first-agent stamping](https://github.com/nanocoai/nanoclaw/pull/2909) — Stacked on #3220; adds the setup wizard side of agent templates.
- [#3231 [OPEN] feat(codex,opencode): honor plugin MCP cwd in both provider config writers](https://github.com/nanocoai/nanoclaw/pull/3231) — Supports plugin MCP working-directory handling, part of the #3220 train.
- [#3050 [OPEN] feat(setup): add Dial to the channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050) — Adds Dial as a channel integration.
- [#3189 [OPEN] feat(skill): add-why — explain what happened to one message](https://github.com/nanocoai/nanoclaw/pull/3189) — New utility skill for message-level explanation.
- [#3230 [OPEN] fix(skills): stop removal docs pointing at the retired data/env mirror](https://github.com/nanocoai/nanoclaw/pull/3230) — Documentation correction.

## 4. Community Hot Topics

Comment/reaction activity is low, but the most visible topics are:

- [#2504 [OPEN] feat: add `ncl status` command for lightweight operational health check](https://github.com/nanocoai/nanoclaw/issues/2504) — The only issue with comments (1) in this batch. The underlying need is operational observability: users want a quick way to check whether a running NanoClaw instance is healthy, whether containers are alive, and whether recent errors occurred.
- [#3220 [OPEN] feat!: agent templates become Agent Plugins 1.0.0 directories](https://github.com/nanocoai/nanoclaw/pull/3220) — Not a comment-heavy PR, but it is core-team-labeled and is the centerpiece of current development. The need is a maintainable, versioned format for agent templates with better security.
- [#3234 [OPEN] Template-stamped agent groups get a bare UUID id, missing the `ag-` prefix](https://github.com/nanocoai/nanoclaw/issues/3234) — A concrete integration bug showing that generated agent-group IDs are not compatible with OneCLI’s `ensureAgent` validation.

The community is mostly focused on reliability: channel integrations, ID consistency, upgrade migrations, and operational tooling.

## 5. Bugs & Stability

Ranked by severity:

1. **High — [#3234: Template-stamped agent groups get a bare UUID, missing `ag-` prefix](https://github.com/nanocoai/nanoclaw/issues/3234)**  
   Template-created agent groups can produce IDs that OneCLI rejects, breaking agent spawn. No fix PR is open yet.

2. **High — [#3233: Agent-scoped `ncl tasks` is blind to pre-2.1.54 recurring tasks](https://github.com/nanocoai/nanoclaw/issues/3233)**  
   Existing installs migrating to 2.1.54 lose agent-side visibility and control of legacy recurring tasks because no migration rehomes old rows. No fix PR is open yet.

3. **Medium — [#2689 [OPEN] fix(signal): DM platform ID consistency, isMention, and delivery](https://github.com/nanocoai/nanoclaw/pull/2689)**  
   Signal DMs can be silently dropped because `isMention` is not set and platform IDs are inconsistent. A fix PR exists but remains open.

4. **Medium — [#2346 [OPEN] fix(formatter): treat unknown slash commands as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)**  
   Unknown slash commands are misinterpreted, causing silent response drops. A fix PR has been open since May.

5. **Medium — [#3086 [CLOSED] fix(whatsapp): validate recipient exists before sending](https://github.com/nanocoai/nanoclaw/pull/3086)**  
   WhatsApp messages to invalid recipients reported success while going nowhere. This was closed/merged and is likely resolved.

6. **Low — [#3230 [OPEN] fix(skills): stop removal docs pointing at the retired data/env mirror](https://github.com/nanocoai/nanoclaw/pull/3230)**  
   Documentation references a retired mirror; docs-only fix.

## 6. Feature Requests & Roadmap Signals

- **[#2504: `ncl status` command](https://github.com/nanocoai/nanoclaw/issues/2504)** — A lightweight operational health check. This is still open after several months and may become a roadmap item for CLI observability improvements.
- **[#3232: Proposal: add QwenCloud as an optional provider skill](https://github.com/nanocoai/nanoclaw/issues/3232)** — Follows NanoClaw’s modular provider-skill pattern. If maintainers accept it, this could be a low-risk addition to the next release.
- **Agent Template → Agent Plugin migration (#3220 + #2909 + #3231)** — This is the strongest roadmap signal. The core team is actively building a new template/plugin architecture, and these are likely to land together in the next major/minor version.
- **[#3050: Dial channel support](https://github.com/nanocoai/nanoclaw/pull/3050)** — If merged, Dial becomes a first-class channel in the setup wizard.
- **[#3189: `add-why` utility skill](https://github.com/nanocoai/nanoclaw/pull/3189)** — A debugging/explainability skill; likely a candidate for a future skill-focused release.

Prediction: the next NanoClaw version will likely include the Agent Plugin engine (#3220), the setup wizard template flow (#2909), and plugin MCP cwd support (#3231), assuming the stacked PRs merge cleanly.

## 7. User Feedback Summary

User-reported pain points in this window:

- **Operational visibility is weak** — users want a built-in health command rather than relying on session listings or external dashboards.
- **Upgrades can break existing data** — the 2.1.54 migration gap for recurring tasks is a serious trust issue for existing installs.
- **Template/plugin ID generation is inconsistent** — bare UUIDs vs. `ag-` prefixed IDs causes downstream rejection.
- **Channel integrations are fragile** — silent failures on WhatsApp, Signal DMs being dropped, and Telegram rich-message limitations show a need for more defensive channel code.
- **Behavioral surprises with slash commands** — unknown commands being swallowed silently hurts usability.
- **Positive contributor engagement** — multiple community PRs follow the contributing guide and target real bugs, indicating a healthy contributor ecosystem.

## 8. Backlog Watch

These items are old or stalled and need maintainer attention:

- **[#2504: `ncl status` command](https://github.com/nanocoai/nanoclaw/issues/2504)** — Open since 2026-05-15 with only 1 comment. This is a reasonable, non-invasive feature request that has not received a maintainer decision.
- **[#2346: Unknown slash commands should be treated as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)** — Open since 2026-05-08. The fix addresses silent message drops, but the PR has not been merged for over 3 months.
- **[#2689: Signal DM platform ID consistency and delivery fix](https://github.com/nanocoai/nanoclaw/pull/2689)** — Open since 2026-06-04. This is a meaningful reliability fix for Signal users and is still waiting.
- **[#2909: Template setup wizard flow](https://github.com/nanocoai/nanoclaw/pull/2909)** — Open since 2026-07-02, but intentionally blocked on #3220; should land after the plugin engine.
- **[#3050: Dial channel support](https://github.com/nanocoai/nanoclaw/pull/3050)** — Open since 2026-07-14. A feature PR that appears complete but has not been merged.

Overall: NanoClaw is moving forward on a major template/plugin architecture, while community-submitted bug fixes are accumulating. The most urgent maintainer actions are triaging the two high-severity regressions (#3234, #3233) and reviewing the long-open connector/formatting fixes (#2689, #2346).

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-13

## 1. Today's Overview

IronClaw logged very high activity in the last 24 hours: 41 issues (29 open, 12 closed) and 50 pull requests (31 open, 19 merged/closed) were updated, with two release candidates cut on the 1.2.0 line. The dominant signal is a QA bug-bash cluster against the Telegram channel — 10+ defects filed on a single day, including a P1 agent-stuck-after-GIF condition, webhook activation failure, and multi-user access breakage. On the delivery side, the team closed 19 PRs, including the `curl`-in-container healthcheck fix (released in rc.3), Windows atomic-rename packaging fixes (rc.2), per-field admin-config help text, and a 1.1.1-rc.1 backport preparation. Feature work continues in parallel across the channel-first onboarding epic (#7044), the Storybook/design-system epic (#7038), and a durable-storage profile-agnostic refactor (#7456). Overall, the project shows a healthy release cadence and rapid issue throughput, with the Telegram integration and multi-user access as the main stability risks to watch.

## 2. Releases

Two release candidates were published on 2026-08-12:

- **ironclaw-v1.2.0-rc.3** — [release notes](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.2.0-rc.3)
  - **Fixed:** The runtime container image now installs `curl`, so in-container HTTP healthchecks can execute. Orchestrators probe the worker with `curl -fsS http://localhost:3000/`; the image previously shipped no HTTP client, so the probe could never run and the container was never marked healthy. Fix implemented in [PR #7555](https://github.com/nearai/ironclaw/pull/7555), forward-ported from `release/1.1.0-rc.1` to `release/2026-08-11`.

- **ironclaw-v1.2.0-rc.2** — [release notes](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.2.0-rc.2)
  - **Fixed:** Windows first-start filesystem publication now uses native atomic rename semantics instead of hard links, and tolerates unsupported directory syncs.
  - **Fixed:** Release smoke runs now preserve the Windows account identity required to secure the standalone secrets key, isolating workspaces and tenancy properly.

Both are stabilization patches with no documented breaking changes or migration steps. The release pipeline itself was additionally hardened by [PR #7560](https://github.com/nearai/ironclaw/pull/7560), which adds retry to the cargo-dist download after a transient `curl (56)` failure aborted the rc.3 build 18 seconds in.

## 3. Project Progress

Nineteen PRs and 12 issues closed/merged in the window. Notable landings:

**Release & infrastructure**
- [PR #7555](https://github.com/nearai/ironclaw/pull/7555) — `fix(docker)`: install `curl` so orchestrator healthchecks can run (released in v1.2.0-rc.3).
- [PR #7560](https://github.com/nearai/ironclaw/pull/7560) — `fix(release)`: retry the dist installer download to prevent flaky release failures.
- [PR #7427](https://github.com/nearai/ironclaw/pull/7427) — `release: prepare 1.1.1-rc.1`: backports urgent IronHub/custom MCP, WebUI, retrieval, runtime-credential, Slack, and Telegram fixes onto the 1.1 line; defaults the retained rc1 Slack/Telegram migration to safely skip legacy channel state, with opt-in verified import.

**Extensions, channels & admin UX**
- [PR #7550](https://github.com/nearai/ironclaw/pull/7550) — `feat(extensions)`: per-field help text on admin configuration forms plus a channel setup docs rewrite. Manifest `[admin_configuration]` fields gain an optional `description` rendered as a hint; the Telegram manifest is the first consumer.
- [PR #5503](https://github.com/nearai/ironclaw/pull/5503) — `[Experiment] Add compact Google extension capabilities`: `gmail.fetch_message_summaries` for inbox triage, plus compact Calendar/Drive ops, merged after review.

**WebUI / design system**
- [PR #6836](https://github.com/nearai/ironclaw/pull/6836) — `feat(webui)`: `@ironclaw/ui` and workspace refactor, re-deriving the design system cleanly from `main` as a workspace package (supersedes prior attempts).

**Issues closed (shipped fixes)**
- [#7407](https://github.com/nearai/ironclaw/issues/7407) — `BatchPolicy::Parallel` capability batches now execute concurrently (bounded) in `invoke_capability_batch`.
- [#7484](https://github.com/nearai/ironclaw/issues/7484) — Context window no longer silently evicts the task: user messages are pinned, eviction triggers compaction, and the 128-message clamp was revisited.
- [#7485](https://github.com/nearai/ironclaw/issues/7485) — Token estimator double-counted ASCII (halving the effective context window); the two inconsistent estimators are now unified.
- [#5508](https://github.com/nearai/ironclaw/issues/5508) — Slack delivery target "not found" despite active Slack connection is fixed.
- [#6541](https://github.com/nearai/ironclaw/issues/6541) — WebUI "constantly reconnecting" notifications are fixed.
- [#7302](https://github.com/nearai/ironclaw/issues/7302) — Tool-call failure UI improved: failures are informational and de-emphasized when the agent recovers.
- [#7383](https://github.com/nearai/ironclaw/issues/7383) — Chore tracking decomposition of the ~4.4k-line `tool_disclosure_port.rs` closed.

## 4. Community Hot Topics

- **[#7360 — Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)** (3 comments, open; `epic`, `performance`) — The nightly API-capacity workload uses a mock model that never emits tool calls, so built-in capability write regressions can land unexercised by the stress harness. Underlying need: regression-proof the write paths before large refactors.
- **[#7407 — Execute `BatchPolicy::Parallel` capability batches concurrently](https://github.com/nearai/ironclaw/issues/7407)** (3 comments, closed) — The agent loop computed parallel batch policies but the production port executed every batch serially. Now runs bounded-concurrently with zero model-facing changes; directly cuts latency for multi-tool-call turns.
- **[#7554 — Custom MCP server add flow shows validation error](https://github.com/nearai/ironclaw/issues/7554)** (1 comment, open; bug, user-reported via Slack #x-ai-product-feedback) — A real user is blocked from adding a custom MCP server by a spurious red validation message. High impact for the extensibility story.
- **[#7517 — Cloud.near.ai: allow staking path for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517)** (1 comment, open; enhancement) — Users with Google/GitHub identities can't stake NEAR for inference (Stripe-only credits); "Sign in with NEAR" isn't attachable to an existing account. Signals identity/payment friction in the monetization path.
- **[#7484 — Context window silently evicts the task](https://github.com/nearai/ironclaw/issues/7484)** (1 comment, closed) — The per-turn prompt was built from the newest N transcript messages (hard-capped at 128 in three independent places), which could silently drop the user's actual task. The fix pins user messages and compacts instead.

## 5. Bugs & Stability

A QA bug-bash run against `ironclaw-qa-testing-libsql.up.railway.app` produced a dense Telegram defect cluster, plus platform issues. Ranked by severity:

**Critical (P1)**
- **[#7538 — Telegram agent becomes completely stuck after receiving GIF or sticker](https://github.com/nearai/ironclaw/issues/7538)** — the session becomes entirely unresponsive, even to subsequent normal text messages. Single most severe item in the window.
- **[#7536 — Multi-user access flow broken — additional users get "Invalid secret" error](https://github.com/nearai/ironclaw/issues/7536)** — users created from Admin UI receive a token, but opening the UI yields "Invalid secret"; unclear whether token generation or the invite path is at fault.
- **[#7535 — Telegram webhook is not activated after saving bot configuration](https://github.com/nearai/ironclaw/issues/7535)** — saving config does not register the webhook; the bot works only after a full redeploy.

**High (P2)**
- [#7540](https://github.com/nearai/ironclaw/issues/7540) — Long Telegram messages split by Telegram are partially missed; only the first part is processed, the rest rejected with "still working on a previous message."
- [#7541](https://github.com/nearai/ironclaw/issues/7541) — Generated files are sent as local workspace-path Markdown links, not actual Telegram attachments.
- [#7542](https://github.com/nearai/ironclaw/issues/7542) — Agent doesn't recognize the conversation is already in Telegram, offering "Want this delivered to your Telegram?" as if in the WebUI.
- [#7543](https://github.com/nearai/ironclaw/issues/7543) — Routine executes successfully but the message is not delivered on first execution.
- [#7544](https://github.com/nearai/ironclaw/issues/7544) — Agent leaks internal reasoning, planning steps, and raw tool/API docs into chat instead of answering the user.
- [#7545](https://github.com/nearai/ironclaw/issues/7545) — Agent incorrectly claims no live market-data tool is available for multi-token queries despite general HTTP access.
- [#7539](https://github.com/nearai/ironclaw/issues/7539) — Conversation appears out of order in the WebUI: the agent's working state renders before the user's message.
- [#7451](https://github.com/nearai/ironclaw/issues/7451) — Agent sometimes asks for credentials even when the request should not require them.
- [#7554](https://github.com/nearai/ironclaw/issues/7554) — Custom MCP add flow shows a spurious validation error.
- [#7508](https://github.com/nearai/ironclaw/issues/7508) — GitHub MCP extension startup presents a confusing endpoint-verification prompt instead of connecting cleanly.

**Launch-blocker / low**
- [#7547](https://github.com/nearai/ironclaw/issues/7547) — Instance upgrade on agent staging fails at egress apply ("Error: egress apply failed"); tagged `v1-launch-checklist`.
- [#7546](https://github.com/nearai/ironclaw/issues/7546) — Telegram stickers are silently ignored with no reaction or acknowledgment.

**Fix status:** No fix PRs are open yet for the Telegram cluster; the issues were filed en masse on 2026-08-12 and are un-triaged. The P1 trio (#7538, #7536, #7535) should be prioritized for the next RC.

## 6. Feature Requests & Roadmap Signals

- **[#7537 — Generic per-request thinking/effort control](https://github.com/nearai/ironclaw/issues/7537)** (`scope: llm`) — adds a per-request (and per-model default) thinking level that provider adapters map to native parameters; DeepSeek V4 Flash via NEAR AI is the trigger case ("0731 checkpoint got verbose"). Likely to land soon in the LLM request path.
- **[#7517 — Staking path for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517)** — request to attach NEAR-wallet staking to existing Google/GitHub accounts, not just as a separate login. A monetization/identity integration likely aligned with v1.4.0-era work.
- **[#7044 — Onboarding to channel-first approach](https://github.com/nearai/ironclaw/issues/7044)** (epic, v1.4.0) — new users land on a blank slate; the epic prototypes OOBE automation-tasks suggestions. Backend wiring ([#6993](https://github.com/nearai/ironclaw/issues/6993)) and prototype PR ([#6994](https://github.com/nearai/ironclaw/pull/6994)) are still open; implementation is gated behind the off-by-default `oobe_suggestions` flag.
- **[#7038 — Epic: Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)** (epic, v1.3.0) — Phases 1–3 all have open PRs ([#7039](https://github.com/nearai/ironclaw/pull/7039), [#7043](https://github.com/nearai/ironclaw/pull/7043), [#7558](https://github.com/nearai/ironclaw/pull/7558)); the inert `@ironclaw/ui` scaffold from [#7558](https://github.com/nearai/ironclaw/pull/7558) now serves as the Phase-3 reskin reference.
- **[#7520 — Retire superseded and unreachable WebUI frontend surfaces](https://github.com/nearai/ironclaw/issues/7520)** — cleanup epic removing retired v1/engine-v2 surfaces (explicitly excluding the Jobs surface).
- **[#7360 — Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)** — hardening the nightly capacity harness to exercise tool-call write paths.
- **[PR #7548 — Structured execution contracts for automations](https://github.com/nearai/ironclaw/pull/7548)** (open) — versioned contracts (goal, success criteria, output instructions, no-result behavior, allowed capabilities, required skills) required for every new automation — a reliability step for scheduled tasks.
- **[PR #7556 — Railway sandbox workspace file bridge](https://github.com/nearai/ironclaw/pull/7556)** (open) — adds `builtin.sandbox_workspace_copy` to copy files between the runtime workspace and Railway sandbox workspaces, exposed only when the Railway transport is configured.

## 7. User Feedback Summary

- **Custom MCP servers are blocked by a spurious validation error** ([#7554](https://github.com/nearai/ironclaw/issues/7554)) — reported directly by a user via Slack (`#x-ai-product-feedback`). A red validation message with no actionable cause prevents adding a server; top user-facing extensibility regression.
- **Telegram UX is not production-ready** — the QA cluster ([#7538](https://github.com/nearai/ironclaw/issues/7538)–[#7546](https://github.com/nearai/ironclaw/issues/7546)) reveals systemic issues: non-text message types, long-message splitting, file attachment delivery, message ordering, routine delivery on first run, and webhook activation all need hardening.
- **Agent trust issues** — internal reasoning and raw tool docs leaked into chat ([#7544](https://github.com/nearai/ironclaw/issues/7544)), false claims that no market-data tool exists ([#7545](https://github.com/nearai/ironclaw/issues/7545)), and unnecessary credential requests ([#7451](https://github.com/nearai/ironclaw/issues/7451)) degrade confidence in agent output.
- **Identity/payment friction** ([#7517](https://github.com/nearai/ironclaw/issues/7517)) — users want to attach NEAR staking to existing Google/GitHub accounts rather than maintain a separate wallet login; Stripe-only credits are not sufficient.
- **Channel-state confusion** — Slack users told to reconnect an already-active connection ([#5508](https://github.com/nearai/ironclaw/issues/5508), fixed) and Telegram users offered delivery to "Telegram" while already in Telegram ([#7542](https://github.com/nearai/ironclaw/issues/7542)) indicate channel-awareness messaging needs work.
- **Positive signal:** old, confusing notifications (WebUI reconnecting, [#6541](https://github.com/nearai/ironclaw/issues/6541)) were fixed, and the 19-PR/12-issue close rate shows responsive maintainers.

## 8. Backlog Watch

Items needing maintainer attention due to age without visible movement:

- **[#6993 — Backend wiring for the OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/issues/6993)** (created 2026-08-01, open) — the backend half of the Phase-1 channel-first onboarding plan; gating dependency for epic [#7044](https://github.com/nearai/ironclaw/issues/7044).
- **[#6994 — OOBE automation-tasks prototype PR](https://github.com/nearai/ironclaw/pull/6994)** (open since 2026-08-01, XL, low risk) — no visible movement in the window; flag-gated so it's safe but needs review.
- **[#7456 — fix(reborn): make durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456)** (open since 2026-08-10, XL, medium risk) — roots every profile at `IRONCLAW_REBORN_HOME`, persists a typed security envelope so restart-only profile transitions cannot weaken tenancy/workspace isolation. Sensitive refactor touching security boundaries; needs careful review.
- **[#7464 — feat(telegram): linked-device auth](https://github.com/nearai/ironclaw/pull/7464)** (open since 2026-08-10, XL, medium risk) — implements [PR #7443](https://github.com/nearai/ironclaw/pull/7443)'s design: users link their personal Telegram account as an MTProto linked device. Branched off the docs PR; large but a key Telegram roadmap enabler.
- **[#7491 — feat(coding): omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491)** (open since 2026-08-11, XL, medium risk) — removes the old file-tool surface in favor of five bare names (`read`, `write`, `edit`, `glob`, `grep`); a model-facing breaking change that deserves broad review.
- **[#7451 — Telegram agent sometimes incorrectly asks for credentials](https://github.com/nearai/ironclaw/issues/7451)** (open since 2026-08-10, P2) — predates the main bug-bash batch and remains unfixed.

**Structural watch item:** [#7383](https://github.com/nearai/ironclaw/issues/7383) closed but the underlying hotspot remains — `crates/loop/ironclaw_loop_host/src/tool_disclosure_port.rs` is ~4.4k lines and PR #7374 added ~240 production lines; continued growth will likely force the already-tracked decomposition.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## 1. Today's Overview

LobsterAI shows a moderate but focused development pulse on 2026-08-13. Though no new releases were published, 6 issues and 8 PRs were updated in the last 24 hours. The project closed/merged 7 PRs, spanning renderer UI polish, Windows plugin installation reliability, and per-model thinking-level fixes. The open issue backlog remains dominated by older, often stale bug reports from late March and May, with limited maintainer response. Overall, the project appears healthy in terms of active code changes, but community-reported stability issues around sandboxing, uninstall behavior, and gateway restarts still need attention.

## 2. Releases

No new releases were published in the last 24 hours. The most recent related activity is PR [#2480](https://github.com/netease-youdao/LobsterAI/pull/2480), a closed `Release/2026.8.12` branch, indicating that a release was prepared or cut around that date but no formal release entry appears in this dataset.

## 3. Project Progress

Seven PRs were closed/merged in the last 24 hours, covering both new features and bug fixes:

- [#2482](https://github.com/netease-youdao/LobsterAI/pull/2482) – **feat: skills manager split mine builtin tabs** (`area: renderer`). Advances skills UI by separating "mine" and builtin tabs.
- [#2481](https://github.com/netease-youdao/LobsterAI/pull/2481) – **feat(sidebar): move task search to header actions** (`area: renderer`, `area: cowork`). Replaces labeled search with icon-only action and improves cross-platform layout.
- [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) – **fix(plugins): preserve junctions during Windows install** (`area: main`). Fixes plugin installs on Windows by staging and atomic-renaming to preserve dependency junctions, addressing `EPERM` symlink failures.
- [#2478](https://github.com/netease-youdao/LobsterAI/pull/2478) – **fix(shell): avoid unsupported large file icon size on macOS/Windows**. Fixes Electron `app.getFileIcon` behavior for non-Linux platforms.
- [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) – **fix(model-selector): give each model its own thinking level**. Fixes a bug where thinking strength was global and models overwrote each other’s settings.
- [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) – **feat(model): add official website links and API Key guidance for providers**. Merged after review fixes; closes PR #731.
- [#2480](https://github.com/netease-youdao/LobsterAI/pull/2480) – **Release/2026.8.12** branch closure, preparing or confirming the 2026.8.12 release.

One PR remains open: [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) – "fix(cowork): hide OpenClaw main agent sessions from session list," which is a long-running open contribution still under review.

## 4. Community Hot Topics

The most active issues had only 2 comments each, indicating low overall engagement but unresolved user concerns:

- [#1179](https://github.com/netease-youdao/LobsterAI/issues/1179) – "[stale] 3.31版本强制沙箱怎么关？" (2 comments). Users report that version 3.31 forces sandbox mode with no visible off switch, forcing rollback to 3.30. This reflects frustration with opaque security-related changes.
- [#1236](https://github.com/netease-youdao/LobsterAI/issues/1236) – "[bug] 插件 ID 不匹配警告" (2 comments). A recurring config warning because the `mcp-bridge` plugin entry key doesn’t match the manifest ID. User wants a clean startup log.
- [#2071](https://github.com/netease-youdao/LobsterAI/issues/2071) – "创建定时任务错误" (2 comments). Scheduled task creation fails in version 2026.5.27; includes screenshot but no detailed diagnostic info yet.

No PRs had reported comment counts, but [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) has been open since April 1 and may deserve community attention.

## 5. Bugs & Stability

Several user-reported stability issues are active, with varying severity:

- **High – [#1173](https://github.com/netease-youdao/LobsterAI/issues/1173): App still runs after uninstall.** A user uninstalled LobsterAI from Windows, but the already-open window continued working and could even send Feishu messages. The user explicitly suspects a hidden backdoor. This is a serious uninstaller/residual-process bug that should be investigated promptly.
- **High – [#1180](https://github.com/netease-youdao/LobsterAI/issues/1180): Editing a custom agent triggers gateway restart loop.** In version 2026.3.31, changing a self-built agent icon causes repeated gateway restarts. Deleting the agent restores normal behavior.
- **Medium – [#2071](https://github.com/netease-youdao/LobsterAI/issues/2071): Scheduled task creation error.** Observed in 2026.5.27; lacks enough detail but still unresolved.
- **Medium – [#1236](https://github.com/netease-youdao/LobsterAI/issues/1236): Plugin ID mismatch warning.** Low functional impact but persistently disturbs users and pollutes startup logs.
- **Low/Functional – [#1179](https://github.com/netease-youdao/LobsterAI/issues/1179): Forced sandbox cannot be disabled.** Users are blocked from normal workflows and must roll back.

No direct fix PRs were linked to these issues today. However, PR [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) addresses Windows plugin installation stability, which may indirectly reduce Windows-specific configuration/symlink/sandbox-adjacent problems.

## 6. Feature Requests & Roadmap Signals

The main explicit feature request is:

- [#1174](https://github.com/netease-youdao/LobsterAI/issues/1174) – Users want to configure **multiple custom model providers** instead of only one. The scenario: users switching to a new custom provider still want to keep old provider settings around.

This aligns with ongoing model-provider improvements reflected in PRs:

- [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) adds website links and API key guidance per provider.
- [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) adds per-model thinking level settings, showing deeper model configuration refinements.

The merged renderer PRs (#2481, #2482) also suggest continued work on sidebar/header usability and skills manager organization. Based on this, the next version may further expand provider configuration, possibly adding multi-provider support and more intuitive model/marketplace UI. Users also clearly expect an off switch for sandbox mode, which could surface as a configuration item in a future release.

## 7. User Feedback Summary

User feedback in this dataset centers on control, transparency, and reliability:

- **Sandbox enforcement** is perceived as forced and non-configurable; users want a clear opt-out.
- **Windows uninstall behavior** raises trust concerns: leaving a running process after uninstall creates suspicion of hidden background activity.
- **Gateway restart loops** and **scheduled task errors** disrupt core workflows.
- **Plugin ID mismatch warnings** are seen as avoidable configuration noise.
- Positive signals: users are actively testing new versions, reporting reproducible steps, and contributing UI/model polish through PRs. Merged fixes like per-model thinking levels (#2475) and cross-platform icon handling (#2478) show responsiveness to real UX issues.

## 8. Backlog Watch

Several issues and PRs are stale or long-unattended and could require maintainer intervention:

- [#1179](https://github.com/netease-youdao/LobsterAI/issues/1179) – Open since March 31, still unanswered in practical terms; forced sandbox workaround unknown.
- [#1173](https://github.com/netease-youdao/LobsterAI/issues/1173) – Serious uninstaller bug, low engagement with only 1 comment; should be escalated.
- [#1174](https://github.com/netease-youdao/LobsterAI/issues/1174) – Popular feature request for multiple custom providers; open since March 31 with no maintainer response.
- [#1180](https://github.com/netease-youdao/LobsterAI/issues/1180) – Gateway restart loop on agent edit; open since March 31.
- [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) – Open PR since April 1 to hide OpenClaw main agent sessions from the user-facing list; no comments recorded but updated today. This appears to be a valuable fix for user confusion and should be reviewed.

These backlog items are disproportionately old (mostly Q1 2026) and could benefit from triage, reproduction, or closure if superseded.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-13

**Scope:** Based on GitHub activity from `agentscope-ai/QwenPaw` (CoPaw), covering updates in the last 24 hours.

---

## 1. Today's Overview

CoPaw/QwenPaw is in an active beta-stabilization phase: **29 issues** were updated (22 open, 7 closed), **42 PRs** were updated (27 open, 15 closed/merged), and **1 new pre-release** was published (`v2.1.0-beta.4`). Maintainers merged several important fixes for model-response handling, tool-message sanitization, and macOS Computer Use, while reviewing a steady stream of new feature PRs such as MiniMax TTS, plugin-channel configurators, and a native DataPaw runtime. Meanwhile, the open issue tracker shows recurring user pain points around Windows crashes, agent early-stopping, network recovery, and UI time/scroll display bugs. Overall, the project is highly active and responsive, but still carries several unresolved reliability regressions typical of a beta cycle.

---

## 2. Releases

### [v2.1.0-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4)

- `fix(files)`: repair previews and dark mode styling — [PR #6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)
- `fix(tools)`: correct `read_file` tool description — [PR #6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)
- `chore`: bump version to `2.1.0b4`

No breaking changes or migration notes were included in the release description.

---

## 3. Project Progress

**15 PRs were closed/merged in the last 24 hours.** Notable visible closed/merged PRs:

- [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) — `fix(chats)`: handle dict-like model responses, fixing `KeyError: '__aiter__'` in auto-title generation ([Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813))
- [PR #6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) — `fix(agents)`: sanitize orphan tool messages before model calls ([Issue #6407](https://github.com/agentscope-ai/QwenPaw/issues/6407))
- [PR #6913](https://github.com/agentscope-ai/QwenPaw/pull/6913) — `fix(computer-use)`: improve macOS element activation for transient menus and composite accessibility elements
- [PR #6937](https://github.com/agentscope-ai/QwenPaw/pull/6937) — `fix(creator)`: compose-gate auto-rereview, DAG production hardening, vendor runtime bootstrap, fail-closed plugin packaging
- [PR #6944](https://github.com/agentscope-ai/QwenPaw/pull/6944) — `chore`: update release notes for v2.1.0

**Notable open PRs advancing features:**

- [PR #6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) — Add MiniMax TTS support to SIP channel
- [PR #6953](https://github.com/agentscope-ai/QwenPaw/pull/6953) — Stabilize LLM prefix cache by sorting tool schemas and splitting `env_context`
- [PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) — Add native DataPaw app runtime and durable analysis workspace
- [PR #6943](https://github.com/agentscope-ai/QwenPaw/pull/6943) — Restore interactive configurators for plugin channels
- [PR #6949](https://github.com/agentscope-ai/QwenPaw/pull/6949) — Add bilingual long-term memory blog

---

## 4. Community Hot Topics

### Highest-comment issues

- [Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — “prompts.py lies to agents: Dream writes to digest/ not MEMORY.md” (5 comments)  
  Users found that agent-facing prompts document a memory behavior that was never implemented. This is a trust/documentation issue, not just a bug.

- [Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Agent frequently stops after outputting “Now 2.1, 3.1, 3.2. Let me do all three.” without continuing (5 comments)  
  The agent plans the next step but never executes it; users must manually say “continue.” This is one of the most disruptive reliability complaints, especially for multi-step tasks.

- [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) — v2.0.1 becomes unresponsive after idle for tens of minutes; requires process restart (4 comments)  
  Idle-freeze issue on Windows, affecting unattended usage.

- [Issue #6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) — History cannot scroll upward; input box deletes trailing text when editing (4 comments)  
  Core frontend usability problems in the desktop/web console.

- [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) — Assistant message end time is displayed incorrectly (4 comments)  
  The UI shows only the first response-segment time instead of the actual completion time after long tool calls.

- [Issue #6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — MCP tool calls pass numeric-looking strings as numbers, causing API failures (4 comments)  
  Type-coercion bug breaks real MCP integrations.

### Underlying needs

Users are asking for **predictable agent execution**, **honest system prompts**, **better Windows stability**, and **UI transparency**. The common theme is trust: users need to know what the agent will do, why it stopped, and where data is stored.

---

## 5. Bugs & Stability

Ranked by severity:

### High severity

- [Issue #6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) — `sync.py` imports history under random `AgentState` UUID instead of real `session_id`, orphaning 18–50% of rows and causing recall split/duplication. **Closed**, but no explicit fix PR was visible in the data.
- [Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Agent stops mid-task after planning, requiring manual “continue” input. No fix PR visible yet.
- [Issue #6927](https://github.com/agentscope-ai/QwenPaw/issues/6927) — Calling multiple sub-agents repeatedly falls into infinite loops. No fix PR visible yet.
- [Issue #6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) — v2.0.1 crashes frequently with `console process/reply failed` traceback. Closed as invalid, but the underlying crash may still affect users.
- [Issue #6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) — Probabilistic startup crash/exit on Windows with Python 3.13 async socket errors.
- [Issue #6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) — After a short network interruption, QwenPaw never recovers; all LLM requests fail with `httpx.ConnectTimeout` until restart.

### Medium severity

- [Issue #6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) — Inter-agent messages spawn a new agent session per message, causing duplicate shadow instances.
- [Issue #6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) — After Scroll compression, re-entering a session hides the pre-compression transcript; only internal eviction indexes remain visible.
- [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) — Idle freeze requires killing the process.
- [Issue #6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) — Daily-page notes inside subfolders are grouped under the wrong date.
- [Issue #6948](https://github.com/agentscope-ai/QwenPaw/issues/6948) — Console chat timestamps display UTC instead of configured `user_timezone`.

### Lower severity / UI

- [Issue #6928](https://github.com/agentscope-ai/QwenPaw/issues/6928) — History scrolling and input-box text deletion bug.
- [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) — Incorrect assistant completion time; fix PR [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938) is open.
- [Issue #6852](https://github.com/agentscope-ai/QwenPaw/issues/6852) — Long multi-line tool output is rendered as an unreadable blob. Closed.

### Bugs with fix PRs already open/merged

- [Issue #6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — Fixed by [PR #6936](https://github.com/agentscope-ai/QwenPaw/pull/6936): coerce string-typed tool args emitted as JSON numbers.
- [Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — Fixed by [PR #6942](https://github.com/agentscope-ai/QwenPaw/pull/6942): simplify long-term memory guidance and remove false Dream/MEMORY.md claims.
- [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) — Addressed by [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938).
- [Issue #6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) — Addressed by [PR #6947](https://github.com/agentscope-ai/QwenPaw/pull/6947): use `SystemMsg` instead of `UserMsg` in Scroll compression placeholder.

---

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals from the last 24 hours:

- [Issue #6924](https://github.com/agentscope-ai/QwenPaw/issues/6924) / [PR #6943](https://github.com/agentscope-ai/QwenPaw/pull/6943) — Restore `get_configurator()` support for plugin channels; users want custom channel configs beyond simple input boxes.
- [PR #6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) — MiniMax TTS support suggests ongoing channel/TTS expansion.
- [Issue #6917](https://github.com/agentscope-ai/QwenPaw/issues/6917) — Agents should be able to push arbitrary reports/messages into a persistent Inbox, not just chat sessions.
- [Issue #6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) — Users want multi-agent collaboration to happen in one session window, instead of new sessions per agent.
- [Issue #6929](https://github.com/agentscope-ai/QwenPaw/issues/6929) — Request for folder-based project workspaces with file preview and selected-content injection into chat.
- [Issue #6923](https://github.com/agentscope-ai/QwenPaw/issues/6923) — Suggestion to explore `LongHorizon-Harness` for sustained multi-round tasks without state drift.
- [Issue #6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) — Security gap: plugins can silently create cron jobs and inject user-visible messages without approval.
- [Issue #6952](https://github.com/agentscope-ai/QwenPaw/issues/6952) / [PR #6953](https://github.com/agentscope-ai/QwenPaw/pull/6953) — Prefix-cache instability from unsorted tool schemas and interleaved `env_context`; optimization with both performance and cost implications.

**Prediction:** The next beta is likely to absorb the small, already-under-review fixes ([PR #6936](https://github.com/agentscope-ai/QwenPaw/pull/6936), [PR #6947](https://github.com/agentscope-ai/QwenPaw/pull/6947), [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938), [PR #6943](https://github.com/agentscope-ai/QwenPaw/pull/6943)) and possibly the MiniMax TTS PR. The DataPaw runtime ([PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)) is a larger feature that may be tracked for a separate minor/major milestone.

---

## 7. User Feedback Summary

- **Frustration with agent early-stopping:** Multiple users report agents planning a step and then stopping without any prompt or error, especially during multi-step or multi-agent tasks ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921), [#6927](https://github.com/agentscope-ai/QwenPaw/issues/6927)).
- **Stability pain on Windows:** Crashes, freezes, antivirus kill events, and network-recovery failures force manual restarts ([#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919), [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955), [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780), [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847), [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932)).
- **Memory/system-prompt transparency:** Users and automated agents are confused when prompts describe behavior that does not match the actual implementation ([#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)).
- **Frontend UX dissatisfaction:** Scroll history, input editing, timestamp display, and compressed-message visibility are common complaints ([#6928](https://github.com/agentscope-ai/QwenPaw/issues/6928), [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951), [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826)).
- **Positive signals:** Contributors are actively submitting first-time PRs for real fixes, and maintainers are merging stability patches quickly. Documentation/website PRs ([#6949](https://github.com/agentscope-ai/QwenPaw/pull/6949), [#6950](https://github.com/agentscope-ai/QwenPaw/pull/6950)) show continued effort to make memory and workspace features understandable to non-technical users.

---

## 8. Backlog Watch

PRs and issues that appear stalled or need maintainer attention:

- [PR #5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) — `feat(console, tui)`: expose system commands in slash autocomplete. **Open since 2026-07-08**, first-time contributor, marked Under Review.
- [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — Add per-session model overrides. **Open since 2026-07-12**, first-time contributor, Under Review.
- [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) — `fix(acp)`: prevent final text loss when notifications race the prompt response. **Open since 2026-08-01**, first-time contributor, Under Review.
- [PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) — `feat(onebot)`: localize inbound media before agent processing. **Open since 2026-08-05**, Under Review.
- [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) — Idle freeze in v2.0.1. **Open since 2026-08-07**; has user reports but no visible maintainer confirmation or fix PR.

These items are either waiting for maintainer review, missing reproduction confirmation, or need follow-up to avoid long-running community frustration.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-13

## 1. Today's Overview

In the 24-hour window ending 2026-08-13, ZeroClaw activity remained steady and issue-driven: 50 issues were updated (45 open/active, 5 closed) and 50 PRs were updated (36 open, 14 merged/closed). No new release was published, so the latest public version remains v0.8.3. The dominant themes are Windows/macOS platform parity, CI hardening, release/security attestation cleanup, and runtime reliability for channels, delegation, and tooling. Overall project health looks stable but under continued maintenance pressure, with several high-severity bugs still awaiting fixes.

## 2. Releases

**None.**  
No new releases were published in this window, so there are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress

PRs that reached a merged/closed state in this window include:

- [#9692](https://github.com/zeroclaw-labs/zeroclaw/pull/9692) — `feat(zerocode): show live run-status icons on the SOP pane list`
- [#9877](https://github.com/zeroclaw-labs/zeroclaw/pull/9877) — `fix(cli): make cron scheduling help examples runnable`
- [#9720](https://github.com/zeroclaw-labs/zeroclaw/pull/9720) — `fix(runtime): enforce response cache request boundaries`
- [#9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701) — `feat(gateway): keep chat WebSockets alive`
- [#8902](https://github.com/zeroclaw-labs/zeroclaw/pull/8902) — `fix(runtime): route bidirectional JSON-RPC responses`
- [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) — `feat(runtime): support PowerShell as the native shell on Windows`
- [#9778](https://github.com/zeroclaw-labs/zeroclaw/pull/9778) — `docs(foundations): reconcile revision histories`

Closed issues included:

- [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) — CLI-created cron jobs could not deliver output
- [#9684](https://github.com/zeroclaw-labs/zeroclaw/issues/9684) — zerocode SOP pane live run-status icons task
- [#9796](https://github.com/zeroclaw-labs/zeroclaw/issues/9796) — cron parent help printed invalid add-at/add-every/once examples, fixed by [#9877](https://github.com/zeroclaw-labs/zeroclaw/pull/9877)

## 4. Community Hot Topics

The most active issues by comment count:

- [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **74 test failures on Windows** (14 comments). This is the clearest signal that Windows developer experience is a top community concern.
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — **Maintainer decision queue for RFCs and design issues** (13 comments). Community interest in transparent maintainer decisions and RFC throughput is high.
- [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) — **Plugin-owned Kanban board for agent work** (9 comments). A likely roadmap signal for agent-work coordination and UI.
- [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) — **Consolidate release attestation mechanisms** (9 comments). Maintainers/contributors want one signing story instead of three parallel provenance systems.
- [#6653](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) — **Host-architecture policy for emulated installs** (7 comments).
- [#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929) — **Unify slash-command registries across web UI, ZeroCode TUI, and channel runtime** (7 comments).

Underlying need: contributors are pushing for **cross-platform reliability, simpler release engineering, and better agent-work visibility**, rather than broad new feature surface.

## 5. Bugs & Stability

Highest-severity bugs in the current window:

- **S1 — [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207): `web_fetch` returns garbage for gzip/brotli/deflate responses.** Blocks agent workflows on many websites. No fix PR is visible in this data.
- **S1 — [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290): Windows desktop installer fails at launch with missing `TaskDialogIndirect`.** Blocks Windows desktop users. No fix PR is visible in this data.
- **S1 — [#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527): macOS desktop app can reopen blank or without a window.** Blocks macOS desktop users. No fix PR is visible in this data.
- **S2 — [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462): 74 Windows test failures due to Unix-only commands, path semantics, and console encoding.** CI currently does not catch these; related CI-parity work exists in [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) and PR [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398).
- **High impact — [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340): CLI-created cron jobs discard output because delivery is hardcoded to `None`.** The issue is now closed, though no matching fix PR is visible in the sampled set.
- **S3 — [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198): Discord typing indicator stuck after dashboard daemon reload.**

Security-related stability:

- **[#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899): `cargo deny` is failing on `RUSTSEC-2026-0247` (`bitmaps 3.2.1`)** via Matrix SDK dev-dependencies. This is a blocked P1 tracker affecting Security CI.

## 6. Feature Requests & Roadmap Signals

Several accepted enhancement trackers point toward the next release cycle:

- [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) — Retire the Lucid memory connector at **v0.9.0**. This is an explicit versioned roadmap item.
- [#8321](https://github.com/zeroclaw-labs/zeroclaw/issues/8321) — Define response-cache policy for volatile runtime context.
- [#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929) — Unify slash-command registries across Web UI, ZeroCode TUI, and channels.
- [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) and [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) — Add Windows/macOS CI coverage, including Windows self-update swap/rollback/sidecar tests.
- [#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) — Opt-in LSP support for ZeroCode coding workflows.
- [#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) — Plugin-owned Kanban board for agent work.
- [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) — Consolidate release attestation to one signing story.
- [#9507](https://github.com/zeroclaw-labs/zeroclaw/issues/9507) and [#9511](https://github.com/zeroclaw-labs/zeroclaw/issues/9511) — Declarative CI gates for dependency direction and advisory Semgrep PR comments.

Prediction: the next release is likely to be **v0.9.0** with a mixture of **platform parity, security cleanup, and runtime reliability work**, rather than large user-facing features.

## 7. User Feedback Summary

User-reported pain points cluster around platform support and tool reliability:

- **Windows users are underserved**: 74 local test failures ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)), desktop installer launch failure ([#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)), and PowerShell/self-update gaps are recurring themes.
- **macOS desktop reliability is fragile**: blank/no-window launches ([#7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)).
- **Agent workflows are blocked by core-tool bugs**: `web_fetch` compression garbage ([#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)), Discord typing state stuck after reload ([#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)), and cron jobs silently discarding output ([#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)).
- **Autonomous search reliability** remains a concern: DuckDuckGo CAPTCHA detection and SearXNG configuration support are requested in [#5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316).
- **Agents need better capability introspection**: users want a reliable way to know whether a capability is unsupported, disabled, or currently unavailable ([#8367](https://github.com/zeroclaw-labs/zeroclaw/issues/8367)).

Overall, contributor sentiment appears engaged but impatient: the project is active, yet the lack of a new release means Windows/macOS and tooling issues are increasingly visible.

## 8. Backlog Watch

Items that may need maintainer or author attention:

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue tracker; high comment activity, so decision throughput on RFCs/design issues is a bottleneck.
- [#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) — LSP support for ZeroCode, open since April, marked `needs-author-action` and `no-stale`.
- [#6653](https://github.com/zeroclaw-labs/zeroclaw/issues/6653) — Host-architecture policy for emulated installs, open since May, `needs-author-action`.
- [#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929) — Slash-command registry unification, `needs-author-action`, `no-stale`, since June.
- [#8367](https://github.com/zeroclaw-labs/zeroclaw/issues/8367) — Derived capability readiness, currently `blocked` since June.
- [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) — Blocked P1 security tracker for the `bitmaps` advisory waiver; needs urgent triage.
- PR [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) — `fix(tools): add allowed_private_hosts opt-in to file_download SSRF gate`, open since July 4, `needs-author-action`.
- PR [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544) — `fix(delegate): honor configured provider fallbacks`, large/XL, open since July 29, `needs-author-action`.
- PR [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) — advisory macOS and Windows tests, currently `blocked` with a maintainer note not to merge until a dependency PR lands.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*