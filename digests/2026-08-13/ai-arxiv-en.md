# ArXiv AI Research Digest 2026-08-13

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-13 09:48 UTC

---

# ArXiv AI Research Digest — 2026-08-13

## Today's Highlights

Today's submissions expose important tensions in LLM training and evaluation: long-context training may degrade parametric knowledge, and model rankings can flip depending on the token budget. A cluster of work moves capability transfer to test time, including strong-to-weak harnesses and agentic optimization for video generation, while multi-agent RL research warns that single frozen LLM simulators collapse and mislead policy evaluation. Security analyses of skill-based LLM agents reveal new attack surfaces such as convergent detour hijacking. On the applied side, corpus-specific medical RAG matches or beats frontier LLMs on HealthBench, and agentic workflows demonstrate production-scale value in legacy HPC modernization.

## Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Information Abundance Paradox: Long-Context Training Undermines Parametric Knowledge](http://arxiv.org/abs/2608.12218v1) | Arda Uzunoglu, Benjamin van Durme, Daniel Khashabi | Challenges the assumption that training on longer contexts always helps LLMs by showing it can undermine the model's parametric knowledge. This has major implications for context-window scaling and for balancing retrieved evidence against memorized knowledge. |
| [Who Thinks Best Depends on How Long You Let Them: Budget-Dependent Rankings in LLM Evaluation](http://arxiv.org/abs/2608.12150v1) | Rodrigo Guedes de Souza, Alison R. Panisson | Varies the maximum token generation budget across seven levels and shows that model rankings on reasoning benchmarks change with inference budget. LLM evaluation results are therefore incomplete without specifying and controlling for generation budgets. |
| [Massive Activations in Hybrid Linear Attention LLMs: Pre-Attention Spikes and Inter-Spike Plateaus](http://arxiv.org/abs/2608.12149v1) | Zunhai Su, Bohan Sun, Xialie Zhuang et al. | Provides the first systematic study of massive activations in layer-interleaved hybrid linear attention LLMs, identifying architecture-aligned pre-attention spikes and plateaus. These findings are relevant for quantization, interpretability, and future hybrid-attention design. |
| [AI4AI at Test-Time: Strong-to-Weak Capability Transfer via Harnesses](http://arxiv.org/abs/2608.12307v1) | Cheng Qian, Wenting Zhao, Liangwei Yang et al. | Investigates transferring capabilities from strong to weak models at test time using "harnesses" instead of parameter updates. This offers a new, on-demand alternative to distillation and could enable flexible adaptation without retraining. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [One Frozen Simulator Is Not Enough: Simulator Collapse in Multi-Agent RL](http://arxiv.org/abs/2608.12253v1) | Simon Yu, Nicholas Tomlin, Marwa Abdulhai et al. | Shows that using a single LLM to simulate user behavior in multi-agent RL leads to systematic generalization failure because of "simulator collapse." Highlights the need for diverse simulator LLMs or new methods to avoid mode collapse in human-AI interaction training. |
| [VAKRA: Evaluating Multi-Hop Reasoning Across APIs and Retrieval Under Tool-Use Policies](http://arxiv.org/abs/2608.12282v1) | Ankita Rajaram Naik, Anupama Murthi, Benjamin Elder et al. | Introduces a benchmark for enterprise agents that jointly tests structured API reasoning, document retrieval, and compliance with tool-use policies. It addresses a key gap in agent evaluation, which usually treats APIs and retrieval separately. |
| [Convergent Detour Hijacking: Task-Preserving Resource Amplification in Skill-Based LLM Agents](http://arxiv.org/abs/2608.12273v1) | Junliang Liu, Ruoyu Li, Wenxin Tang et al. | Identifies a new attack on skill-based LLM agents where untrusted skill publishers can preserve task completion while amplifying resource consumption. This reveals security risks in progressive-disclosure skill ecosystems. |
| [SCOUT: Unlocking Enhanced Spatial Reasoning via Structured Chain-of-Thought and Multi-Objective Process Reward](http://arxiv.org/abs/2608.12220v1) | Zile Zhou, Huining Yuan, Weichen Zhang et al. | Improves VLM spatial reasoning with structured chain-of-thought and multi-objective process reward models to solve credit assignment problems. Shows a promising direction for making verifiable-outcome RL effective on complex spatial tasks. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Redistribution-based Cost Inference Improves Sparse Safe Offline RL](http://arxiv.org/abs/2608.12306v1) | Ebenezer Gelo, Geraud Nangue Tasse, Steven James et al. | Proposes a cost-inference method that recovers per-step costs from trajectory-level stop-feedback in safe offline RL. This makes safe RL practical for real-world settings where only sparse, coarse safety annotations are available. |
| [A Framework for Designing Reward Functions: From Objectives to Features to Human-Aligned Reward Functions](http://arxiv.org/abs/2608.12302v1) | Di Yang Shi, W. Bradley Knox | Presents a formal process for non-experts to construct linear reward functions that respect user preference orderings over trajectories. It brings structure to reward design, a traditionally ad hoc and difficult part of RL. |
| [SAG: SQL-Retrieval Augmented Generation with Query-Time Dynamic Hyperedges](http://arxiv.org/abs/2608.12129v1) | Yuchao Wu, Junqin Li, XingCheng Liang et al. | Introduces a RAG framework that uses SQL queries to build dynamic hyperedges for multi-hop structured reasoning. It improves on dense retrieval and static knowledge graphs for queries with complex structured constraints. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [A corpus-specific clinical RAG system matches or outperforms newer frontier LLMs on HealthBench](http://arxiv.org/abs/2608.12138v1) | Praveen Reddy, Charuta Mandke, Suvrankar Datta et al. | Evaluates VITA, a retrieval-augmented clinical system, against frontier LLMs on HealthBench and finds it matches or exceeds them on corpus-specific medical queries. Demonstrates that specialized RAG systems remain highly competitive in high-stakes domains. |
| [An Agentic Workflow for Legacy HPC Modernization: Converting the Two-Electron-Integral Core of GAMESS](http://arxiv.org/abs/2608.12249v1) | Yuzhong Shen, Masha Sosonkina, Peng Xu et al. | Uses an agentic workflow to modernize a production-scale legacy Fortran codebase, specifically the two-electron-integral core of GAMESS. Shows LLM-driven agents can address large-scale scientific software maintenance that is often left undone. |
| [How Organizations Use AI: Evidence from ChatGPT](http://arxiv.org/abs/2608.12236v1) | Aaron Chatterji, David Holtz, Neel Rakholia et al. | Links ChatGPT Enterprise usage to worker roles, task classifications, and financial data through March 2026. Provides rare large-scale empirical evidence about how organizations adopt and use frontier generative AI. |
| [ScreenShot: A Foundation Model for Few-Shot Combination Drug Screening](http://arxiv.org/abs/2608.12219v1) | Antoine de Mathelin, Christopher Tosh, Wesley Tansey | Develops a foundation model for few-shot combination drug screening, tackling the enormous search space of possible drug pairs. Could accelerate the discovery of effective combination therapies with limited experimental data. |

## Research Trend Signal

Several signals stand out. First, inference/test-time adaptation is becoming a first-class research area, from test-time capability transfer and budget-aware evaluation to agentic optimizers for black-box video models. Second, long-context assumptions are being revisited: training on richer evidence may hurt parametric knowledge, and hybrid attention architectures introduce new outlier structures such as pre-attention spikes. Third, multi-agent systems are moving from capability to robustness, with work on simulator collapse, convergent detour hijacking, and tool-use policy benchmarks. Fourth, RAG continues to evolve toward structured and efficient designs, including SQL-query hyperedges and position-independent caching. Finally, there is a clear push for domain-specific reliability and resource-aware workflows: clinical RAG against HealthBench, oracle budgets for protein structure prediction, legacy code modernization, and empirical studies of ChatGPT Enterprise adoption. Together, these papers suggest the field is consolidating around evaluations and systems that respect real-world constraints—token budgets, oracle costs, partial feedback, and enterprise security policies.

## Worth Deep Reading

1. **Information Abundance Paradox** — This paper directly challenges a foundational scaling assumption: that longer contexts are always beneficial. Its finding that long-context training can undermine parametric knowledge has broad implications for model training, architecture, and retrieval-augmented generation.

2. **Who Thinks Best Depends on How Long You Let Them** — Model ranking is central to LLM evaluation, and this work shows that rankings are unstable across token budgets. Every benchmark comparison should be interpreted with this budget-dependence in mind, making this a must-read for evaluation methodology.

3. **One Frozen Simulator Is Not Enough** — LLM-simulated users are increasingly used in multi-agent RL, but this paper identifies simulator collapse as a root cause of poor generalization. It is essential reading for anyone building or evaluating human-AI interaction systems.

---
*This digest is auto-generated by [agents-radar](https://github.com/forever-1314/agents-radar).*