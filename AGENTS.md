# Python 学习工作区

面向 TypeScript / Node.js 开发者，以 Python 基础、进阶和三个实战项目为主线。教学目标见 [MISSION.md](MISSION.md)，近期反馈见 [NOTES.md](NOTES.md)。

## 教学与技能

- 新建课程、设计练习、继续教学或根据反馈补充概念时，先读取并使用 [.agents/skills/teach/SKILL.md](.agents/skills/teach/SKILL.md)，结合 MISSION、NOTES 和 learning-records 中的实际证据安排内容。
- 编写或重写课程正文、速查与概念解释时，读取并使用 [.agents/skills/writing-clearly-and-concisely/SKILL.md](.agents/skills/writing-clearly-and-concisely/SKILL.md)。中文讲解先说重点，每段一个主题，用具体例子说明因果。
- 新概念先解释“是什么、为什么需要”，再介绍操作命令。首次使用所必需的解释直接放在正文中；例如虚拟环境的定义应在第一次执行 uv sync 之前。
- 基础课用同目标的 TS / Python 代码说明差异；项目阶段按 [ROADMAP.md](ROADMAP.md) 逐步减少对照。
- 只用学习者独立预测、修改、运行和解释的证据判断掌握；课程已交付和助手验证成功不记作学习者掌握。
- 用户表示没听懂时，用 [.agents/skills/wait-what/SKILL.md](.agents/skills/wait-what/SKILL.md) 补齐前提。需要查证规则、诊断难解错误或展示状态变化时，按 [docs/learning-skills.md](docs/learning-skills.md) 选择对应技能。

## 项目运行与页面

- 本项目用 uv 管理 Python 版本、环境和依赖。课程命令从项目根目录执行，使用 `uv run python ...`；安装部分给官方入口，由读者选择适合自己电脑的安装方式。
- 新建或修改页面前，参照 [第一课](lessons/0001-build-and-run.html) 的骨架、资源加载顺序与交互属性，并阅读 [README.md](README.md) 中的目录维护和检查说明。
- 复用 `assets/python-theme.css` 和已有阅读器、测验、目录导航脚本。保持 TS / Python 高亮、代码复制、章节定位、明暗主题、移动布局和键盘访问。
- 全站导航图标及 favicon 统一使用 `assets/python-logo.svg`。Logo 保留官方颜色；页面与代码配色按共享主题维护，来源见 [assets/ASSETS.md](assets/ASSETS.md)。
- 新课同步更新 `assets/courses.js`、章节锚点和路线；正文与示例就绪后再设置课程 href。维护检查按 README 执行。

## 技能副本

`.agents/skills/` 来自 Rust Journey，保留通用说明与配套文件；Python 的调用方式见技能指南。迁移时不带入 Rust 课程或学习记录。更新副本时保留未要求改变的调用元数据，并检查相对引用和配套资源。
