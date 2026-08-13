# ArXiv AI Research Digest 2026-08-14

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-13 23:00 UTC

---

# ArXiv AI Research Digest (2026-08-14)

## 1. Today's Highlights

Today's submissions question core assumptions in LLM scaling and evaluation: long-context training may undermine parametric knowledge, and model rankings shift significantly with token-generation budgets. Agent research is maturing toward security and reliability, with new benchmarks for enterprise API+retrieval agents and concrete attacks on third-party skill ecosystems. Efficiency work targets hybrid linear-attention LLMs, Kolmogorov-Arnold Networks, and RAG serving. On the application side, corpus-specific clinical RAG and few-shot drug-screening foundation models show that specialized systems can match or exceed general-purpose frontier models.

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Information Abundance Paradox: Long-Context Training Undermines Parametric Knowledge](http://arxiv.org/abs/2608.12218v1) | Arda Uzunoglu, Benjamin van Durme, Daniel Khashabi | Shows that training on longer contexts can degrade a model's parametric knowledge, challenging the assumption that more context exposure strictly helps. Raises important trade-offs for long-context scaling and model memory. |
| [Who Thinks Best Depends on How Long You Let Them: Budget-Dependent Rankings in LLM Evaluation](http://arxiv.org/abs/2608.12150v1) | Rodrigo Guedes de Souza, Alison R. Panisson | Varies maximum token budgets from 64 to 4,096 across models and reasoning benchmarks, finding that evaluation rankings are unstable under different inference budgets. Argues that token-budget constraints should be treated as a controlled variable in LLM evaluation. |
| [Massive Activations in Hybrid Linear Attention Large Language Models: Pre-Attention Spikes and Inter-Spike Plateaus](http://arxiv.org/abs/2608.12149v1) | Zunhai Su, Bohan Sun, Xialie Zhuang et al. | Provides the first systematic study of massive activations in layer-interleaved hybrid linear-attention LLMs, identifying pre-attention spikes and plateaus. These morphology findings are relevant for quantization, pruning, and interpretability of efficient architectures. |
| [AI4AI at Test-Time: Strong-to-Weak Capability Transfer via Harnesses](http://arxiv.org/abs/2608.12307v1) | Cheng Qian, Wenting Zhao, Liangwei Yang et al. | Investigates whether capabilities of strong models can be transferred to weaker ones at test time using harnesses, rather than through training-time distillation. Opens a new direction for low-cost capability enhancement and model alignment. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [VAKRA: Evaluating Multi-Hop Reasoning Across APIs and Retrieval Under Tool-Use Policies](http://arxiv.org/abs/2608.12282v1) | Ankita Rajaram Naik, Anupama Murthi, Benjamin Elder et al. | Introduces a benchmark for enterprise agents that must reason across structured APIs and document collections under tool-use policies. Addresses an important gap in evaluating integrated retrieval-and-API agents rather than isolated capabilities. |
| [Convergent Detour Hijacking: Task-Preserving Resource Amplification in Skill-Based LLM Agents](http://arxiv.org/abs/2608.12273v1) | Junliang Liu, Ruoyu Li, Wenxin Tang et al. | Identifies two control points in the progressive-disclosure design of third-party LLM-agent skills that can be exploited to hijack tasks into unnecessary detours while preserving the original task. Highlights a practical supply-chain security risk for LLM-agent ecosystems. |
| [One Frozen Simulator Is Not Enough: Simulator Collapse in Multi-Agent RL](http://arxiv.org/abs/2608.12253v1) | Simon Yu, Nicholas Tomlin, Marwa Abdulhai et al. | Shows that using a single LLM to simulate user behavior in multi-agent RL systematically fails to generalize due to simulator collapse. Advocates for more diverse or frozen simulator suites in human-AI interaction training. |
| [An Agentic Workflow for Legacy HPC Modernization: Converting the Two-Electron-Integral Core of GAMESS](http://arxiv.org/abs/2608.12249v1) | Yuzhong Shen, Masha Sosonkina, Peng Xu et al. | Proposes an agentic workflow for modernizing legacy Fortran code at production scale, demonstrated on the GAMESS two-electron-integral core. Shows that LLM agents can tackle voluminous but routine scientific code migration tasks. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Redistribution-based Cost Inference Improves Sparse Safe Offline RL](http://arxiv.org/abs/2608.12306v1) | Ebenezer Gelo, Geraud Nangue Tasse, Steven James et al. | Frames sparse trajectory-level stop-feedback in safe offline RL as a temporal credit-assignment problem and proposes cost redistribution to infer per-step costs. Reduces the need for dense cost annotations and improves safety from sparse supervision. |
| [A Framework for Designing Reward Functions: From Objectives to Features to Human-Aligned Reward Functions](http://arxiv.org/abs/2608.12302v1) | Di Yang Shi, W. Bradley Knox | Presents a formal three-step process for non-experts to instantiate linear reward functions from natural-language task descriptions and preference orderings. Provides a practical pathway to human-aligned reward design. |
| [HYDRA: Hyperbolic Dynamic Representation Architecture for Kolmogorov-Arnold Networks](http://arxiv.org/abs/2608.12194v1) | Zhao Su, Yuxin Xia, Haoran Li et al. | Proposes a hyperbolic dynamic representation architecture to reduce parameter redundancy in Kolmogorov-Arnold Networks. Improves the scalability and efficiency of KANs while preserving their nonlinear approximation strengths. |
| [ADEPT: A Unified Framework for Deep Learning Test Adequacy](http://arxiv.org/abs/2608.12144v1) | Yidi Kao, Shawn Burnham, Tommi Rose Fahy et al. | Integrates diverse deep-learning test-adequacy metrics into a single unified framework. Makes previously fragmented adequacy measures interoperable and easier to apply across different model testing scenarios. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [AVA-Encoder: Towards Agent-Native Video Representation Learning](http://arxiv.org/abs/2608.12313v1) | Chuyue Li, Jinpeng Yu, Haozhe Wang et al. | Introduces a video representation learning approach designed for agentic reasoning and manipulation, especially for cinematic-quality human films. Addresses the lack of structured video representations that are both faithful to film content and usable by creative agents. |
| [ScreenShot: A Foundation Model for Few-Shot Combination Drug Screening](http://arxiv.org/abs/2608.12219v1) | Antoine de Mathelin, Christopher Tosh, Wesley Tansey | Proposes a foundation model for predicting effective drug combinations under few-shot and combinatorial constraints. Demonstrates potential to reduce the cost and infeasibility of large drug-combination screens. |
| [A corpus-specific clinical RAG system matches or outperforms newer frontier LLMs on HealthBench](http://arxiv.org/abs/2608.12138v1) | Praveen Reddy, Charuta Mandke, Suvrankar Datta et al. | Evaluates VITA, a retrieval-augmented clinical system, against frontier LLMs on HealthBench and finds it competitive or superior. Strengthens the case for corpus-specific RAG in high-stakes clinical domains. |

## 3. Research Trend Signal

Several clear directions emerge from today's submissions. First, evaluation and training budgets are becoming first-class variables: token-generation budgets change model rankings, and long-context training has measurable hidden costs on parametric knowledge. Second, LLM-agent research is shifting from capability demonstration to security and reliability—skill-supply-chain attacks, simulator collapse, and enterprise API/retrieval benchmarks all reflect this maturation. Third, credit assignment appears as a recurring bottleneck: safe offline RL with sparse feedback, process-reward reasoning, and test-time transfer all address attribution across indirect or delayed signals. Fourth, efficiency is pursued at multiple levels—massive-activation-aware quantization, hyperbolic KAN compression, and RAG caching. Finally, domain-specific systems such as clinical RAG and drug-combination screening show that specialized retrieval and few-shot foundation models can match or outperform general-purpose frontier models. Overall, the field is moving from raw capability scaling toward controlled, attributable, and secure deployment.

## 4. Worth Deep Reading

1. **[Information Abundance Paradox: Long-Context Training Undermines Parametric Knowledge](http://arxiv.org/abs/2608.12218v1)** — This paper directly challenges a widespread scaling assumption. If longer contexts degrade parametric knowledge, it has major implications for training data design, context-window scaling, and model evaluation.

2. **[Convergent Detour Hijacking: Task-Preserving Resource Amplification in Skill-Based LLM Agents](http://arxiv.org/abs/2608.12273v1)** — As LLM agents increasingly rely on third-party skills, the security vulnerabilities described here are urgent and practical. The paper identifies concrete attack surfaces in progressive-disclosure agent designs and will be important for safe agent deployment.

3. **[AI4AI at Test-Time: Strong-to-Weak Capability Transfer via Harnesses](http://arxiv.org/abs/2608.12307v1)** — This paper rethinks model capability transfer by moving it to test time, avoiding expensive retraining. If harness-based transfer proves scalable, it could become a new paradigm for model adaptation and alignment.

---
*This digest is auto-generated by [agents-radar](https://github.com/FrontierMindLab/agents-radar).*