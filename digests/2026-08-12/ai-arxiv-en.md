# ArXiv AI Research Digest 2026-08-12

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-12 04:07 UTC

---

## Today's Highlights

Today’s submissions converge on safety, efficiency, and evaluation beyond static benchmarks. Cross-lingual analyses reveal that both LLM safety alignment and tool-using agent behavior degrade sharply outside English, while new benchmarks expose inconsistencies in multilingual text-to-image generation. On the methodological side, papers propose polynomial-time verification for probabilistic claims, data-efficient world-action models for surgery, and skill-compression strategies for self-evolving agents. Efficiency work targets LLM quantization, mixed-RL rollout scheduling, and memory-constrained training. Multimodal research also pushes toward explicit object-level alignment and scene-graph memory for long-horizon video understanding.

## Key Papers

### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Abigail Oppong, P Sam Sahil, Tadesse Destaw Belay et al. | Investigates whether safety alignment trained in English generalizes to low-resource languages, finding that safeguards often fail or become unreliable. Highlights a critical blind spot in multilingual LLM deployment. |
| [Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1) | Dong Qiao, Chris Ding, Jicong Fan | Characterizes output behavior of 32 models from six families using 10,000 shared prompts and embeds responses to create behavioral maps. Provides a methodology for comparing models and tracking behavioral evolution beyond leaderboard scores. |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Clemens Vetter, David Kaczér, Lucie Flek et al. | Links emergent misalignment to latent persona features and uses data attribution to trace training examples that amplify them. Offers a concrete mechanism for diagnosing and preventing harmful post-fine-tuning behavior. |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Minsoo Kim, Sungyoung Ji, Kisung Moon et al. | Proposes Attention-Subnetwork Mutual Information (ASMI), a training-free signal measuring whether confident predictions are fragile under attention-path perturbation. Frames uncertainty as fragility rather than only distributional breadth. |

### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Long-Horizon AI Research for Grothendieck Constant: A Case Study in Human-AI Mathematical Collaboration](http://arxiv.org/abs/2608.11195v1) | Alan Li, Rahul Saha, Anton Xue et al. | Case study of AI agents helping improve bounds on the Grothendieck constant \(K_G\), documenting a long-horizon human-AI collaboration. Provides practical lessons for using AI as an effective research partner in mathematics. |
| [SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents by Discovering Reusable Structure](http://arxiv.org/abs/2608.11079v1) | Xiaofan Bai, Hongqiang Lin, Chao Liu et al. | Compresses accumulated skills in self-evolving agents by discovering reusable structure without costly evaluation. Controls unbounded growth of skill libraries caused by duplicated procedures and warnings. |
| [Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1) | Sourabrata Mukherjee, Kalika Bali, Sunayana Sitaram | Measures whether tool-using agents take the same action steps across languages by comparing action traces, not just final answers. Reveals language-dependent changes in policy execution that affect reliability and cost. |
| [Why Does CLAUDE.md Keep Growing? Catastrophic Remembering in Agentic Coding](http://arxiv.org/abs/2608.11095v1) | Kushal Chakrabarti | Attributes unbounded growth of agentic coding files like CLAUDE.md to “catastrophic remembering”: appending instructions is cheap, but deleting them is risky once rationale is lost. Discusses implications for agent memory maintenance. |

### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Orr Paradise, Oliver Richardson, Yoshua Bengio et al. | Studies whether a probabilistic predictor’s answers to many conditional-probability queries can be checked for self-consistency in polynomial time. Connects probability, complexity, and AI safety by formalizing verifiable honesty. |
| [Scheduling Mixed RL Rollouts Beyond Prefix Locality](http://arxiv.org/abs/2608.11152v1) | Zetao Hong, Song Yuan, Yuanhao Ding et al. | Proposes scheduling strategies for mixed RL rollout workloads that go beyond prefix-aware routing to balance cache reuse and load balancing. Improves efficiency of RL post-training pipelines for LLMs across multiple domains. |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | He-Yen Hsieh, H. T. Kung | Addresses midpoint ambiguity in round-to-nearest quantization by training a conditional diffusion model to reconstruct weights. Improves calibration-free LLM post-training quantization by reducing errors near quantization interval centers. |

### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Changhao Xiang, Shangyu Xing, Zhen Wu et al. | Interleaves visual objects into language during multimodal pretraining to achieve explicit object-level alignment. Reduces referential ambiguity caused by global image-text alignment. |
| [Surgical WAM: A World-Action Model for Data-Efficient Surgical Robot Learning](http://arxiv.org/abs/2608.11204v1) | Wenrui Bao, Tianyun Jiang, Zhiben Chen et al. | Introduces a world-action model for surgical robots that combines world modeling with action prediction to learn from scarce teleoperated demonstrations. Targets data-efficient, precise, long-horizon manipulation in surgical settings. |
| [R4DSG: Relative 4D Scene Graph Memory for Object-Centric Question Answering in Long Egocentric Video](http://arxiv.org/abs/2608.11017v1) | Ke Ma, Yamin Mao, Weiming Li et al. | Builds relative 4D scene graph memory to preserve object identity and state changes for object-centric QA in long egocentric video. Enables assistants to answer “where/when/why” questions that caption-based memory cannot. |
| [On the Limitations of Cross-Lingual Consistency in Multilingual Text-to-image Generation](http://arxiv.org/abs/2608.11002v1) | Sicheng Zhang, Zhonghao Yan, Binzhu Xie et al. | Introduces LingT2I, a benchmark for cross-lingual consistency in text-to-image generation, showing substantial gaps between English and other languages. Highlights language-specific effects in multimodal generation. |

## Research Trend Signal

The most visible trend is a shift from static evaluation to dynamic, behavior-centered assessment: models are compared through action traces, attention fragility, behavioral trajectories, and cross-lingual policy retention rather than benchmark accuracy alone. Accompanying this is a lifecycle perspective on AI systems—compressing accumulated skills, preventing memory bloat in agentic coding, scheduling mixed RL rollouts, and resolving rounding ambiguities at quantization time. Safety research is also broadening from English-centric alignment to low-resource and multilingual consistency, including text-to-image generation. Meanwhile, theoretical work on probabilistic consistency and quantum-inspired computational models suggests growing interest in guarantees and certified infrastructure rather than purely empirical improvements.

## Worth Deep Reading

1. **How to Verify Consistency of Probabilistic Claims** — This paper bridges complexity theory, probabilistic reasoning, and AI safety, asking whether self-consistency of conditional-probability predictions can be verified in polynomial time. It is foundational for honest and auditable AI systems.
2. **Long-Horizon AI Research for Grothendieck Constant** — A detailed case study of human-AI collaboration in mathematics, documenting how AI can be used to improve real mathematical bounds. It offers a rare, concrete methodology for long-horizon research agents.
3. **The Illusion of Cross-Lingual Safety in Low-Resource Languages** — An urgent empirical study showing that safety alignment does not transfer reliably to low-resource languages. It has direct implications for global deployment of aligned LLMs.

---
*This digest is auto-generated by [agents-radar](https://github.com/Neare-Design/agents-radar).*