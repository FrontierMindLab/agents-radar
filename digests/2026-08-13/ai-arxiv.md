# ArXiv AI 研究日报 2026-08-13

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-13 01:04 UTC

---

# ArXiv AI 研究日报（2026-08-13）

## 今日速览

今日 arXiv 的 AI 投稿呈现从“静态能力”向“动态验证与安全”的明显倾斜：多篇工作关注低资源语言安全幻觉、概率声明一致性与突发失对齐的数据归因。智能体方向不再只问最终答案，而是开始分析行动轨迹、长期记忆膨胀与技能压缩，例如跨语言策略保持度和 SkillZip。方法层出现可用于 LLM 后训练的量化重建（ReRound）、混合 RL 回滚调度以及可验证金融推理基准（V-FiLLM）。多模态方面，显式视觉-语言符号对齐与长视频情景记忆成为值得关注的突破口。

## 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1) | Oppong, Sahil, Belay et al. | 研究 LLM 安全对齐在低资源语言中的泛化失败，揭示英语中心安全训练的“跨语言安全”假象。对多语安全部署有直接警示意义。 |
| [Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1) | Kim, Ji, Moon et al. | 提出 ASMI，用注意力子网络互信息把预测的“脆弱性”作为不确定信号，补充了仅看输出分布的不确定性估计。为 LLM 的可靠决策提供低成本、训练无关的置信度线索。 |
| [Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1) | Qiao, Ding, Fan | 用共享提示库对 6 个模型家族、32 个模型的行为输出做嵌入与图谱分析，画出模型行为演化路径。把评测从排行榜分数升级为行为关系度量。 |
| [Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1) | Vetter, Kaczér, Flek et al. | 用数据归因方法验证“人格特征”对突发性越狱的因果作用，定位导致安全崩坏的训练样本。为微调前的安全筛查提供可操作信号。 |

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [Long-Horizon AI Research for Grothendieck Constant: A Case Study in Human-AI Mathematical Collaboration](http://arxiv.org/abs/2608.11195v1) | Li, Saha, Xue et al. | 报告 AI 在数学家协作中改进 Grothendieck 常数上下界的完整过程，是 long-horizon AI research 的实证案例。对如何设计人机数学协作流程有方法论价值。 |
| [Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1) | Mukherjee, Bali, Sitaram | 比较工具型智能体在不同语言下完成任务时的行动轨迹，而不只是最终答案。发现跨语言策略保持度与最终正确率可分离，能更早暴露失败模式。 |
| [SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents by Discovering Reusable Structure](http://arxiv.org/abs/2608.11079v1) | Bai, Lin, Liu et al. | 提出免评测的技能压缩方法，从自进化智能体的冗长技能库中发现可复用结构，降低存储与推理开销。让长期积累的技能库更紧凑、可迁移。 |

### 🔧 方法与框架（新技术、基准测试、效率优化）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1) | Paradise, Richardson, Bengio et al. | 研究概率预测器回答大量条件概率查询时是否能被多项式时间验证自洽。把 AI 诚实性转化为可验证的数学问题，对安全审计很重要。 |
| [ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1) | Hsieh, Kung | 提出基于条件扩散的重建式取整方法，解决权重量化时中点歧义问题。在免校准 LLM 量化中提升精度，并保持后训练效率。 |
| [V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1) | Larsen, Laurent, Rakhamsari et al. | 基于可执行计算树生成带验证的金融推理基准，避免传统 benchmark 对 LLM 答案的不可靠评分。为结构化金融推理提供可自动校验的评测框架。 |
| [Scheduling Mixed RL Rollouts Beyond Prefix Locality](http://arxiv.org/abs/2608.11152v1) | Hong, Yuan, Ding et al. | 提出超越前缀局部性的调度方法，让混合域 RL 回滚在缓存重用与负载均衡之外进一步优化训练吞吐。针对 LLM 后训练中多源、多反馈范式的部署瓶颈。 |

### 📊 应用（垂直领域、多模态、代码生成）

| 论文 | 作者 | 简要说明 |
| :--- | :--- | :--- |
| [MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1) | Xiang, Xing, Wu et al. | 把视觉物体作为符号插入语言序列，实现显式的 object-level 对齐，而不是靠整图描述间接对齐。缓解 MLLM 指代歧义，提升细粒度多模态理解。 |
| [Surgical WAM: A World-Action Model for Data-Efficient Surgical Robot Learning](http://arxiv.org/abs/2608.11204v1) | Bao, Jiang, Chen et al. | 构建手术机器人的世界-动作模型，用更少标注轨迹学习可靠操作策略。针对手术中 contact handling 和 long-horizon reasoning 数据稀缺问题。 |
| [R4DSG: Relative 4D Scene Graph Memory for Object-Centric Question Answering in Long Egocentric Video](http://arxiv.org/abs/2608.11017v1) | Ma, Mao, Li et al. | 提出相对 4D 场景图记忆，在长时程第一人称视频中维护物体身份与状态变化，支撑物体中心问答。解决标题/字幕记忆难以保持持久物体身份的问题。 |
| [On the Limitations of Cross-Lingual Consistency in Multilingual Text-to-image Generation](http://arxiv.org/abs/2608.11002v1) | Zhang, Yan, Xie et al. | 发布 LingT2I 基准，系统测评多语言文生图中的跨语言一致性与语言特有偏差。填补 T2I 研究集中于英语的空白，为多语生成提供评测基准。 |

## 研究趋势信号

本次投稿的新兴信号包括：安全评估从英语/静态基准扩展到低资源语言、行为轨迹和可验证概率一致性；智能体研究从一次性任务转向长期记忆维护与技能压缩，CLAUDE.md 式记忆膨胀成为工程问题；LLM 后训练基础设施（RL 回滚调度、量化重建）和可自动校验的领域基准（V-FiLLM）开始成为独立方向；多模态继续走向显式物体级对齐与长视频持久记忆。

## 值得精读

1. **[How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1)**  
   将 AI 诚实性/概率声明自洽性归约为可多项式时间验证的数学问题，作者包括 Yoshua Bengio，是安全与可信 AI 的理论基石。

2. **[Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1)**  
   用数据归因揭示突发性失对齐与预训练人格特征的因果关系，对微调前安全筛查有直接指导意义。

3. **[Long-Horizon AI Research for Grothendieck Constant](http://arxiv.org/abs/2608.11195v1)**  
   少见的完整人机数学协作案例，展示 AI 如何被用于改进真实数学常数界，对 AI for Science 的 long-horizon 研究设计有借鉴价值。

---
*本日报由 [agents-radar](https://github.com/Neare-Design/agents-radar) 自动生成。*