# ArXiv AI Research Digest 2026-08-19

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-18 23:00 UTC

---

# ArXiv AI Research Digest — 2026-08-19

## 1. Today's Highlights

Today's papers show AI increasingly being applied to formal discovery and security: AlphaEvolve is used to attack the core optimization behind the matrix multiplication exponent, while new work on Model Hypnosis and state-semantic injection highlights growing adversarial-control risks in LLMs and embodied agents. Robotics research is pushing beyond isolated skills toward long-horizon and whole-body control using agentic memory, hierarchical action flows, and neurosymbolic constraints. LLM post-training is advancing through privileged value functions and policy iteration with human feedback, enabling finer credit assignment and in-context adaptation. Meanwhile, physical calibration, counterfactual interpretability, and domain-specific validation are becoming central to making models trustworthy in deployment.

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Model Hypnosis: Strong control of AI via additive subliminal effects](http://arxiv.org/abs/2608.16834v1) | Enric Boix-Adsera, Benedict Tessler | Shows that individually weak and seemingly irrelevant prompt cues can be systematically combined to strongly control model behavior across families and scales. Introduces a new, broadly applicable class of additive subliminal control with safety implications. |
| [Policy Iteration with Human Feedback: Bringing Post-Training RL to In-context Learning](http://arxiv.org/abs/2608.16831v1) | Minh-Ha Nguyen, Cathy Shyr | Builds a policy-iteration approach that brings post-training RL-style feedback into in-context learning. Enables a fixed model to adapt from instructions and demonstrations without weight updates. |
| [Le Critique: Privileged Value Functions for LLM Reinforcement Learning](http://arxiv.org/abs/2608.16739v1) | Siddarth Venkatraman, Matthieu Dinot, Laurence Aitchison | Introduces privileged value functions to improve credit assignment in LLM RL, going beyond sequence-level GRPO estimates. Reduces variance and helps unblock RL training when rollout policies are frozen. |
| [Proteus: Incremental Memory Activation for Long-Context Sequence Modeling](http://arxiv.org/abs/2608.16844v1) | Reza Bayat, Ali Behrouz, Vahab Mirrokni et al. | Proposes incremental memory activation for long-context models, replacing static memory with dynamic reactivation of early tokens. Addresses quadratic attention cost while preserving long-range information. |
| [Would this change your answer? Evaluating Explanations of LLM Behavior In The Wild with Counterfactual Experiments](http://arxiv.org/abs/2608.16747v1) | Adam Karvonen, Euan Ong, Subhash Kantamneni et al. | Evaluates LLM explanations by counterfactual simulatability—whether an explanation lets a human predict the model's answer under changed conditions. Offers a behavior-grounded standard for interpretability and chain-of-thought faithfulness. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Don't Drop the BATON: Long-Horizon Robot Manipulation via Agentic Subtask Exploration and Transition-aware Memory](http://arxiv.org/abs/2608.16889v1) | Bingxin Xu, Yuzhang Shang, Emilio Ferrara | Addresses error compounding and silent cross-subtask constraints in long-horizon manipulation through agentic subtask exploration and transition-aware memory. Strengthens multi-stage VLA policies on contact-rich tasks. |
| [HAF: Adapting Generalist VLAs to Humanoid Whole-Body Loco-manipulation via Hierarchical Action Flow and Spectral Latent RL](http://arxiv.org/abs/2608.16837v1) | Langzhe Gu, Chengkai Hou, Meng Li et al. | Adapts generalist vision-language-action models to humanoid whole-body loco-manipulation via hierarchical action flow and spectral latent RL. Handles high-dimensional, interdependent motion while retaining semantic grounding. |
| [When State Becomes an Attack Surface: State-Semantic Injection in LLM-Driven Embodied Agents](http://arxiv.org/abs/2608.16806v1) | Jiawei Liu, Jiacheng Guo, Tian Zhang et al. | Identifies state-semantic injection as a new attack surface in LLM-driven embodied agents, where adversarial environment state can hijack decision-making. Highlights critical security risks for LLM-based robots. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Improving the matrix multiplication exponent with modern optimization and AlphaEvolve](http://arxiv.org/abs/2608.16884v1) | Emilien Dupont, Marvin Eisenberger, Borislav Kozlovskii et al. | Targets the core optimization problem behind current bounds on the matrix multiplication exponent using modern optimization and AlphaEvolve. Connects AI-guided search directly to a foundational open question in theoretical CS. |
| [Q-based Variational Inverse Reinforcement Learning](http://arxiv.org/abs/2608.16888v1) | Ondrej Bajgar, Peter Tisnikar, Alessandro Abate et al. | Presents a variational IRL method based on Q-functions to infer human preferences without hand-specified rewards. Improves scalability of preference learning for safe and beneficial AI. |
| [CaliBench: Are the Stochastic Dynamics of Video World Models Physically Calibrated?](http://arxiv.org/abs/2608.16829v1) | Jonathan Sadeghi, Jenny Seidenschwarz, Jesse Allardice et al. | Benchmarks whether stochastic video world models are calibrated at the level of fine-grained aleatoric uncertainty, not just whole-dataset distributions. Provides a sharper test for physical realism in generative world models. |
| [Learning to Unlearn: Machine Unlearning via Learning the Unlearning Behaviors](http://arxiv.org/abs/2608.16700v1) | Hang Zhang, Kaifeng Zhang, Yixiao Ma et al. | Proposes learning unlearning behaviors from data rather than hand-designing unlearning functions. Supports scalable compliance with legal data-removal requirements in deployed ML systems. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [LAVA: Logic-Aware Validation and Augmentation Framework for Large-Scale Financial Document Auditing](http://arxiv.org/abs/2608.16763v1) | Ruoqi Shu, Xuhui Wang, Isaac Wang et al. | Provides a logic-aware validation and augmentation framework for production financial document auditing, including payroll, tax, and loan underwriting. Targets accuracy, consistency, and reproducibility under enterprise constraints. |
| [MIRROR: Multimodal Intelligent Radiology Reasoning and Observation Reporter](http://arxiv.org/abs/2608.16709v1) | Vignesh Nagarajan, Sriram Venkatapathy | Separates multimodal radiology classification from natural-language generation to prevent models from silently adding claims unsupported by image evidence. A research prototype for trustworthy AI radiology reporting. |
| [GEO-Flag: Detecting and Measuring GEO-Optimized Web Content](http://arxiv.org/abs/2608.16824v1) | Junjie Chu, Ye Leng, Mingjie Li et al. | Detects and measures generative-engine-optimized content designed to be selected by AI search engines. Helps expose visibility disproportionate to authority or relevance, including weak or false information. |

## 3. Research Trend Signal

A clear trend is the movement from static evaluation toward behavioral, physical, and security-aware validation. LLM interpretability is becoming counterfactual: explanations are judged by whether they actually let humans simulate model behavior. At the same time, adversarial control is expanding beyond text jailbreaks to additive subliminal cues and state-level attacks on embodied agents. RL for LLMs is also shifting from sequence-level rewards toward privileged value functions and in-context policy iteration for finer credit assignment. In robotics, the field is tackling error compounding and high-dimensional whole-body control with memory-augmented and hierarchical VLA architectures. Physical calibration of stochastic world models is emerging as a new evaluation axis, while AI-guided search is entering core theoretical CS, as shown by AlphaEvolve's use in matrix multiplication exponent optimization. These signals point toward AI systems that are more grounded, more verifiable, and more explicitly tested for failure modes.

## 4. Worth Deep Reading

1. **Model Hypnosis** — Worth reading in full because it demonstrates a broad, additive, and seemingly innocuous control vector over model behavior across families and scales, with direct safety, alignment, and interpretability consequences.

2. **Improving the matrix multiplication exponent with modern optimization and AlphaEvolve** — Worth deep reading because it connects AI-guided optimization to a foundational open problem in theoretical computer science and could influence the next generation of algorithmic complexity bounds.

3. **Don't Drop the BATON** — Worth reading in full because it systematically targets error compounding in long-horizon robot manipulation, a central bottleneck between skill-level VLA success and real-world deployment.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*