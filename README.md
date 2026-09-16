# Python Journey

面向 TypeScript / Node.js 开发者，从基础语法到进阶，再到三个真实项目的 Python 学习工作区。课程内容、学习记录与视觉主题独立维护。

直接打开 [index.html](index.html)；网页不需要 npm 安装或构建，代码高亮资源已保存在本地。

- [全部课程](courses.html)：7 个阶段、29 节规划课程，目前前四课已开放。
- [第一课：把 Python 跑起来](lessons/0001-build-and-run.html)：环境、脚本、练习与自测。
- [第二课：变量、对象与基础类型](lessons/0002-objects-and-types.html)：赋值、共享修改与类型转换。
- [第三课：字符串与输入输出](lessons/0003-strings-and-input.html)：输入、清理、切片与格式化。
- [第四课：列表、元组、字典和集合](lessons/0004-containers.html)：组织学习记录、选择容器与浅复制。
- [学习路线](ROADMAP.md) / [学习目标](MISSION.md)
- [三个项目的里程碑与验收](projects/index.html)
- [常用命令](reference/index.html) / [资料来源](RESOURCES.md)
- [学习记录模板](learning-records/TEMPLATE.md)
- [学习技能使用指南](docs/learning-skills.md)：6 个项目本地技能，教学与写作的使用要求见 [AGENTS.md](AGENTS.md)。

## 开始学习

项目使用 uv 管理 Python 版本、虚拟环境与依赖，`.python-version` 固定为 Python 3.14 系列。

先按 [uv 官方安装指南](https://docs.astral.sh/uv/getting-started/installation/)安装 uv，再在项目根目录执行：

```sh
uv python install 3.14
uv python pin 3.14
uv sync
uv run python --version
uv run python demos/01-hello/main.py
```

也可以从 [Python 官网](https://www.python.org/downloads/)选择适合自己电脑的安装包；项目管理仍统一使用 uv。只进入目录不会自动改变终端中的 `python`，运行练习时使用 `uv run python ...`，无需激活环境。

`.python-version` 选择项目使用的版本，`pyproject.toml` 声明兼容范围和依赖，`uv.lock` 记录依赖解析结果。这三个文件提交到 Git；`.venv/` 是本机环境，不提交，换电脑后用 `uv sync` 重建。第一课没有第三方依赖。

第一课 TS 对照见 `demos/01-hello/equivalent.ts`，支持原生类型擦除的 Node.js 可运行 `node demos/01-hello/equivalent.ts`；其他环境沿用已有的 TS 工具链，不影响 Python 主线。

## 怎么推进

每次只完成一小课：回忆 → TS / Python 对照 → 预测 → 运行 → 改写 → 独立练习 → 留下证据。基础课解释语言差异，项目阶段逐步减少对照，独立实现 Python 业务。基础语法先学扎实，自动化、数据分析和服务开发交替推进。不预设完成周数，也不把生成课程当成学会课程。

项目页是待实施任务书，当前没有把项目完整实现直接交给学习者。后续按练习反馈逐课补充。

## 目录维护

`assets/courses.js` 是课程目录数据源。新课登记 id、phase、title、summary、tags；只有正文及示例就绪后才添加 href 和 minutes。无 href 的条目显示待更新，不生成空链接。同步更新首页数量与 ROADMAP。

课程复用 `assets/python-theme.css`，依次加载 courses、course-ui、highlight、highlight-init、lesson-reader、quiz 脚本，使用 defer。课页设置 `data-lesson` 与 `data-course-root="../"`。复用首课的章节、目录和翻页属性。Python 代码必须使用 `language-python`。

修改页面时保持 TS / Python 高亮、代码复制、章节定位、明暗主题、移动布局和键盘访问；新课同步维护章节锚点。

`course-ui.js` 记录最近访问课程，使用独立的 `python-journey:last-lesson` 本地存储键，不表示掌握。禁止存储时仍可导航；file:// 下通过课程 id 参数辅助保持返回入口。

全站导航图标及 favicon 统一使用 `assets/python-logo.svg`，保留官方蓝黄配色，见 [素材来源](assets/ASSETS.md)。页面与代码配色统一在共享主题中维护：页面采用鸢尾紫与黄色，代码区保持深紫背景，页面随系统切换明暗主题。

## 维护检查

Python 用于示例及静态文件检查；Node 仅用于维护者验证目录和阅读器逻辑，不是浏览课程的依赖。

```sh
uv run python -m unittest discover -s tests -p "test_*.py"
node --test tests/courses.test.cjs
```

代码高亮使用 Highlight.js，第三方许可保留在 `assets/vendor/highlight.LICENSE`。
