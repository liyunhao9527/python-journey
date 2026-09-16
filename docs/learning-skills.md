# Python 学习技能使用指南

以 TypeScript / Node.js 经验为起点，用 `teach` 小步学习 Python。文章与文档先用 `writing-clearly-and-concisely` 整理表达，再用 `humanizer` 润色；其他技能按当前障碍选择。

## 按问题选择

| 当前需要                                | 技能                                                                                      | 用法                                            |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 开始一个概念、继续上一课或设计练习      | [teach](../.agents/skills/teach/SKILL.md)                                                 | 先解释概念，再预测、修改和运行，根据反馈复习    |
| 讲解具体、简洁且推理完整                | [writing-clearly-and-concisely](../.agents/skills/writing-clearly-and-concisely/SKILL.md) | 每段一个重点，保留理解所需的因果与前提          |
| 文章语气自然，减少套话和机械表达        | [humanizer](../.agents/skills/humanizer/SKILL.md) | 成稿后润色，保留事实、术语和作者表达习惯 |
| 没听懂，或解释跳过了前提                | [wait-what](../.agents/skills/wait-what/SKILL.md)                                         | 接着同一个问题换种说法，用最小例子补齐推理      |
| 查证 Python 规则、uv 行为或 TS 类比边界 | [research](../.agents/skills/research/SKILL.md)                                           | 查官方来源，将带引用的结论保存在 docs/research/ |
| 反复出现运行错误、错误输出或性能问题    | [diagnosing-bugs](../.agents/skills/diagnosing-bugs/SKILL.md)                             | 最小复现，每次改变一个条件，验证原因            |
| 难以追踪对象引用、生成器或异步任务      | [visualize](../.agents/skills/visualize/SKILL.md)                                         | 状态表、静态图或交互演示，辅助预测执行过程      |

## 调用示例

### 日常学习

> 读取并使用仓库里的 teach 和 writing-clearly-and-concisely，带我学习 Python 列表的赋值与复制。以 TS 数组为对照，明确相似之处和差异，先让我预测输出，等我回答后再验证。

课程编写遵守 [AGENTS.md](../AGENTS.md)：首次使用一个概念时，先在正文中解释它是什么、解决什么问题，再给命令或代码。用户要求完整课程页面时交付完整内容；互动答题时遵循用户指定的等待与提示节奏。

### 写文章与润色

> 读取仓库里的 writing-clearly-and-concisely 和 humanizer，按 AGENTS.md 的“写作与审稿”要求编写或修改这篇文章。先围绕读者的问题理顺内容，再润色语言，最后核对原意和事实。直接给成稿，并简要说明必要的改动。

两项技能的英文示例用于理解原则；中文适配和交付要求以 [AGENTS.md](../AGENTS.md#写作与审稿) 为准。写课程时仍先用 teach 安排教学内容。

### 没听懂

> 读取 .agents/skills/wait-what/SKILL.md，重新解释虚拟环境。我熟悉 node_modules，但不明白 Python 版本、.venv 和 uv 分别负责什么。用中文从两个项目需要不同依赖版本的例子讲起。

原版 `wait-what` 提到简化英语和 `CONTEXT.md`。本项目按用户选择用中文教学，沿用课程已有术语；没有 CONTEXT 文件时，从 MISSION、NOTES 和当前课程获取上下文。

### 查证规则

> 用 research 查证调用 Python 的 async def 与调用 JS 的 async 函数有什么不同。优先查 Python 和 JavaScript 的官方资料，将带来源的结论保存为 docs/research/async-call.md，再根据结论设计一个预测题。

原版 research 要求后台代理执行资料调查。只在实际需要研究且当前环境允许委派时使用该流程；复制技能不会安装网络工具或开启代理能力。已有明确资料支持的简单解释可直接按 teach 进行。

### 理解报错

> 用 diagnosing-bugs 带我分析这个练习的 ModuleNotFoundError。这是学习任务：先检查实际使用的解释器和依赖环境，再让我提出判断；修复先给提示，等我尝试后再审阅。

附上代码、`uv run` 命令和完整错误。普通语法问题可直接询问；难以稳定复现或反复修复失败时再采用完整诊断流程。技能中的 Bash 辅助脚本按需选用，不是开始 Python 学习的前置条件。

### 看清状态变化

> 用 visualize 展示两个名字指向同一个列表，随后修改列表元素的过程。用中文标注，先让我预测，再查看每一步。明确区分给名字重新赋值和修改对象。

静态关系用 Mermaid 或状态表即可；只有交互确实有帮助时才使用交互展示。仓库保留了 visualize 的脚本和资源，但展示效果仍取决于应用支持。制作课程 HTML 时沿用项目共享样式。

## 本地技能维护

`.agents/skills/` 保存本地技能及其格式模板、写作参考、agents 元数据、辅助脚本和资源。

`humanizer` 于 2026-09-16 从 [blader/humanizer](https://github.com/blader/humanizer) 下载，技能版本为 3.0.0，采用 MIT 许可；保留上游技能、LICENSE 和配套文件。`writing-clearly-and-concisely` 沿用仓库已有副本。

本地技能独立维护，不会随个人技能自动更新，也不修改全局技能配置。选择器是否展示它们取决于应用的发现机制，需要时直接指定仓库路径读取。

更新副本时保留未要求改变的 frontmatter、agents 元数据和配套资源，检查相对引用。技能触发条件与教学规则以 [AGENTS.md](../AGENTS.md) 为准，本指南维护 Python 调用示例与适配说明。
