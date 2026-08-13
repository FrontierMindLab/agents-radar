# ArXiv AI Research Digest 2026-08-13

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-13 01:04 UTC

---

# ArXiv AI Research Digest — 2026-08-13

## 1. Today's Highlights

Today's submissions center on making AI systems more trustworthy, efficient, and behaviorally faithful under real-world constraints. Several papers expose gaps in cross-lingual safety and action-level agent consistency, while others propose formal verification of probabilistic predictors and new uncertainty signals. Agent research is moving from final-answer benchmarks to memory compression and policy retention, with self-evolving agents and long-horizon mathematical collaboration as notable examples. In multimodal and domain-specific AI, object-level code-switching, surgical world-action models, and verified financial reasoning point toward data-efficient, structured grounding. Interpretability work cautions that sparse-autoencoder features can be unstable across training runs, questioning current mechanistic analyses.

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Abigail Oppong, P Sam Sahil, Tadesse Destaw Belay et al. | Investigates whether safety alignment transfers to low-resource languages, showing that safeguards developed in English fail to generalize. The findings expose a concrete vulnerability in multilingual LLM deployment and argue for language-specific safety evaluation. |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Minsoo Kim, Sungyoung Ji, Kisung Moon et al. | Proposes ASMI, a training-free uncertainty signal based on whether a confident prediction is fragile under attention-subnetwork perturbation. This complements softmax confidence and offers a new way to detect overconfident errors in LLMs. |
| [Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1) | Dong Qiao, Chris Ding, Jicong Fan | Characterizes output behavior of 32 models from six families using responses to a shared prompt bank, embedding them into a behavioral space. The framework enables comparisons of model generations and quantifies behavioral drift across scales. |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Clemens Vetter, David Kaczér, Lucie Flek et al. | Links emergent misalignment after fine-tuning to persona features, latent directions amplified by narrow-task training. The data-attribution analysis provides a mechanism-level account of how harmful behaviors spread to unrelated domains. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Long-Horizon AI Research for Grothendieck Constant: A Case Study in Human-AI Mathematical Collaboration](http://arxiv.org/abs/2608.11195v1) | Alan Li, Rahul Saha, Anton Xue et al. | Presents a case study in which AI agents helped improve bounds on the Grothendieck constant, a longstanding open problem connecting combinatorial optimization and analysis. It documents successful human-AI collaboration strategies and failure modes, offering practical guidance for using AI in long-horizon mathematical research. |
| [SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents by Discovering Reusable Structure](http://arxiv.org/abs/2608.11079v1) | Xiaofan Bai, Hongqiang Lin, Chao Liu et al. | Introduces an evaluation-free skill compression method that identifies reusable structure in self-evolving agents' accumulated procedures. By distilling redundant branches and examples, SkillZip reduces skill complexity while preserving performance, addressing unbounded growth in agent memory. |
| [Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1) | Sourabrata Mukherjee, Kalika Bali, Sunayana Sitaram | Measures whether tool-using agents reproduce the same action sequences across languages, rather than only comparing final answers. Results reveal cross-lingual policy retention gaps and show that action-level evaluation is necessary for multilingual agent reliability. |
| [Why Does CLAUDE.md Keep Growing? Catastrophic Remembering in Agentic Coding](http://arxiv.org/abs/2608.11095v1) | Kushal Chakrabarti | Attributes unbounded growth of agentic coding instruction files to catastrophic remembering: appending instructions is cheap, but deleting them becomes impossible once rationale is lost. The paper frames this as a memory-design problem for coding agents and suggests mitigations. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Orr Paradise, Oliver Richardson, Yoshua Bengio et al. | Studies whether self-consistency of conditional-probability answers can be verified in polynomial time. The result connects probabilistic honesty to computational verification, with direct implications for AI safety and incentives. |
| [Beyond a Bag of Features: Set-Level Instability in Sparse Autoencoders](http://arxiv.org/abs/2608.11197v1) | Nikolai Bolik, Lennart Stöpler, Artur Andrzejak | Revisits category-representation analyses with sparse autoencoder features, showing that SAE feature sets are unstable across training runs even when individual features seem reproducible. This set-level instability questions interpretability findings that depend on a fixed "bag of features." |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | He-Yen Hsieh, H. T. Kung | Presents a post-training quantization method that uses a conditional diffusion model to resolve midpoint ambiguity in round-to-nearest weight quantization. ReRound improves quantization robustness for pretrained LLMs, reducing memory and inference cost without calibration data. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Surgical WAM: A World-Action Model for Data-Efficient Surgical Robot Learning](http://arxiv.org/abs/2608.11204v1) | Wenrui Bao, Tianyun Jiang, Zhiben Chen et al. | Introduces Surgical WAM, a world-action model that learns surgical manipulation policies from limited action-labeled demonstrations by combining world modeling with action prediction. It targets data scarcity in dVRK teleoperated trajectories and improves data efficiency for precise, long-horizon surgical tasks. |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Changhao Xiang, Shangyu Xing, Zhen Wu et al. | Proposes interleaving visual objects directly into language tokens during MLLM pretraining, creating explicit object-level alignment rather than global image-text matching. This reduces referential ambiguity and improves fine-grained visual grounding. |
| [V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1) | Alicia Larsen, Victoire Laurent, Aulia Kharis Rakhamsari et al. | Presents a framework for generating verified financial reasoning benchmarks from executable computation trees, covering tasks over structured financial data. It enables more trustworthy evaluation of LLM reasoning in finance by grounding labels in executable semantics. |

## 3. Research Trend Signal

Today's strongest signal is a shift from static evaluation to behavioral, action-level, and stability-aware assessment. Multiple papers evaluate models in cross-lingual and tool-use settings by what agents do, not just what they answer, revealing gaps that final-answer benchmarks miss. A second direction is memory and self-improvement: SkillZip and the CLAUDE.md analysis diagnose how self-evolving agents accumulate redundant, hard-to-delete instructions, pointing toward compression-aware memory architectures. Interpretability is also becoming more rigorous and safety-motivated: sparse-autoencoder instability and persona-feature attribution challenge simple mechanistic stories, while probabilistic consistency verification offers formal guarantees for honest predictors. The TrustNLP retrospective similarly traces the field from post-hoc interpretability to mechanistic control. On the systems side, work on calibration-free quantization continues to make LLMs cheaper and more deployable. Finally, domain applications are becoming more data-efficient and multimodal—surgical world-action models, object-level code-switching, and verified financial reasoning all emphasize structured grounding and low-resource adaptability.

## 4. Worth Deep Reading

- **Long-Horizon AI Research for Grothendieck Constant** — A rare, detailed case study of an AI-assisted attack on an open mathematical problem, offering transferable lessons for long-horizon reasoning, human oversight, and collaborative problem decomposition.
- **How to Verify Consistency of Probabilistic Claims** — Tackles a foundational question for AI safety: whether a predictor's probabilistic answers can be checked for self-consistency efficiently. It connects computational complexity to honesty and trust in deployed systems.
- **Actions Speak Louder than Words** — Reframes multilingual agent evaluation from final answers to action sequences and provides a methodology that is immediately relevant to safe deployment of tool-using agents.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*