# ArXiv AI 研究日报 2026-08-12

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-12 04:07 UTC

---

# ArXiv AI 研究日报（2026-08-12）

## 今日速览

今日 50 篇论文中，安全与对齐议题最为集中：多篇工作揭示跨语言安全对齐的脆弱性，并从机制层面归因有害行为。智能体研究从"能用"走向"自进化"，测试时自适应、技能压缩等方法让智能体在部署后持续学习。多模态领域迎来跨语言评测浪潮，T2I 一致性与对象级对齐成为新焦点。效率优化方面，扩散模型量化与 RL 混合调度直接面向真实生产环境。此外，AI 辅助数学研究出现了罕见的长期案例报告，展示了人机协作的深度范式。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Abigail Oppong, P Sam Sahil, Tadesse Destaw Belay et al. | 系统考察安全对齐在低资源语言中的迁移表现，发现英语中心的对齐难以泛化。对多语言 LLM 部署安全提出直接警示。 |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Clemens Vetter, David Kaczér, Lucie Flek et al. | 通过数据归因与 persona 特征分析，研究窄任务微调引发大范围有害行为的机制基础。为对齐安全从后验检测走向机制性归因提供了新证据。 |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Minsoo Kim, Sungyoung Ji, Kisung Moon et al. | 提出 ASMI 指标，通过扰动注意力路径度量预测的"脆弱性"作为不确定性信号。超越输出分布熵，为 LLM 置信度校准提供互补方案。 |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Orr Paradise, Oliver Richardson, Yoshua Bengio et al. | 研究概率预测器在回答条件概率查询时的自洽性是否可在多项式时间内验证。将 AI 安全中的诚实性归结为可验证的计算问题，开辟了理论新方向。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Long-Horizon AI Research for Grothendieck Constant: A Case Study in Human-AI Mathematical Collaboration](http://arxiv.org/abs/2608.11195v1) | Alan Li, Rahul Saha, Anton Xue et al. | 详细记录 AI 辅助改进 Grothendieck 常数上下界的长期数学研究案例。为如何将 AI 有效融入数学研究提供了稀缺的方法论参考。 |
| [Test-Time Self-Evolving GUI Visual Grounding via Reflection-Guided On-Policy Self-Distillation](http://arxiv.org/abs/2608.11191v1) | Shiyu Xuan, Zechao Li | 提出反射引导的在策略自蒸馏方法，实现 GUI 视觉定位的测试时自适应。突破部署后参数冻结的限制，提升对未见界面的适应能力。 |
| [SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents](http://arxiv.org/abs/2608.11079v1) | Xiaofan Bai, Hongqiang Lin, Chao Liu et al. | 提出免评估的技能压缩方法，通过发现可复用结构解决自进化智能体技能库无限膨胀的问题。显著降低技能检索与调用成本，提升长期运行效率。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | He-Yen Hsieh, H. T. Kung | 用条件扩散模型解决权重位于量化区间中点时的四舍五入歧义问题。无需校准数据即可提升低比特 LLM 量化精度，具有实际部署价值。 |
| [Scheduling Mixed RL Rollouts Beyond Prefix Locality](http://arxiv.org/abs/2608.11152v1) | Zetao Hong, Song Yuan, Yuanhao Ding et al. | 面向 LLM 后训练的混合 RL rollout 调度，超越前缀局部性优化推理效率与负载均衡。针对多领域、多反馈范式的复杂 RL 管线提出新调度策略。 |
| [Conditional Independence Tests for Constraint-Based Causal Discovery: A Survey](http://arxiv.org/abs/2608.11156v1) | Pavel Averin, Theodoros Moysiadis, Ioannis Katakis et al. | 系统综述 PC/FCI 等约束式因果发现算法中的条件独立性检验方法。重点讨论不同检验的假设条件与适用场景，为实践者提供选型指南。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [On the Limitations of Cross-Lingual Consistency in Multilingual Text-to-image Generation](http://arxiv.org/abs/2608.11002v1) | Sicheng Zhang, Zhonghao Yan, Binzhu Xie et al. | 提出 LingT2I 基准，系统度量 T2I 模型在不同语言提示下的生成一致性与质量差距。揭示了多语言 T2I 中尚未被充分探索的语言特定性能差异。 |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Changhao Xiang, Shangyu Xing, Zhen Wu et al. | 将视觉对象以代码切换方式嵌入语言序列，实现 MLLM 的显式对象级对齐。有效缓解图像级对齐带来的指代歧义，提升细粒度视觉理解。 |
| [V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1) | Alicia Larsen, Victoire Laurent, Aulia Kharis Rakhamsari et al. | 从可执行计算树生成可验证的金融推理基准，覆盖结构化数据上的复杂推理。填补金融领域 LLM 推理评测空白，支持自动化验证。 |
| [Surgical WAM: A World-Action Model for Data-Efficient Surgical Robot Learning](http://arxiv.org/abs/2608.11204v1) | Wenrui Bao, Tianyun Jiang, Zhiben Chen et al. | 提出世界-动作模型应对手术机器人学习中动作标注数据稀缺的瓶颈。支持长时序接触推理，面向 dVRK 等遥操作平台提升数据效率。 |

## 研究趋势信号

今日投稿呈现五个信号：(1) 跨语言研究从"答案对比"转向"行为一致性"，安全对齐、工具使用策略与 T2I 生成在不同语言间的保持度成为新评测维度；(2) 自进化智能体走向系统化，技能压缩、测试时自适应成为持续学习的关键组件；(3) 对齐与安全研究从后验检测转向机制性归因，persona 特征、注意力路径扰动等表征级方法兴起；(4) 效率优化直接面向生产环境，扩散模型量化与 RL 混合调度瞄准可部署性；(5) 多语言×多模态的交叉评测成为蓝海，跨语言生成一致性问题被正式提出。

## 值得精读

1. **[Long-Horizon AI Research for Grothendieck Constant](http://arxiv.org/abs/2608.11195v1)** — 罕见的长期人机数学协作案例，完整展示了 AI 从实验探索到证明辅助的研究参与方式，对 AI4Science 与智能体研究具有方法论标杆意义。
2. **[The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1)** — 系统揭露了低资源语言中安全对齐的"假象"，直接挑战"安全可跨语言泛化"的隐含假设，对多语言 LLM 部署安全有迫切警示价值。
3. **[How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1)** — 由 Yoshua Bengio 参与的理论工作，将 AI 安全中的"诚实性"转化为可验证的计算问题并给出复杂性刻画，可能催生全新的安全验证研究纲领。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*