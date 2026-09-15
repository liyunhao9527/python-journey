# Python Journey

面向 TypeScript / Node.js 开发者，从基础语法到进阶，再到三个真实项目的 Python 学习工作区。参考相邻 `rust-journey` 的组织方式，保留独立的课程内容与视觉主题。

直接打开 [index.html](index.html)；网页不需要 npm 安装或构建，代码高亮资源已保存在本地。

- [全部课程](courses.html)：7 个阶段、29 节规划课程，目前第一课已开放。
- [第一课：把 Python 跑起来](lessons/0001-build-and-run.html)：环境、脚本、练习与自测。
- [学习路线](ROADMAP.md) / [学习目标](MISSION.md)
- [三个项目的里程碑与验收](projects/index.html)
- [常用命令](reference/index.html) / [资料来源](RESOURCES.md)
- [学习记录模板](learning-records/TEMPLATE.md)
- [学习技能使用指南](docs/learning-skills.md)：已迁入 Rust 项目的 6 个本地技能，教学与写作的使用要求见 [AGENTS.md](AGENTS.md)。

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

`course-ui.js` 记录最近访问课程，使用独立的 `python-journey:last-lesson` 本地存储键，不表示掌握。禁止存储时仍可导航；file:// 下通过课程 id 参数辅助保持返回入口。

Logo 使用 Python 官方蓝黄双蛇标志，见 [素材来源](assets/ASSETS.md)。页面采用鸢尾紫与黄色；代码区保持深紫背景，随系统切换页面明暗主题。Go 青蓝、Java 松绿、Rust 锈橙的项目不作修改。

## 维护检查

Python 用于示例及静态文件检查；Node 仅用于维护者验证目录和阅读器逻辑，不是浏览课程的依赖。

```sh
uv run python -m unittest discover -s tests -p "test_*.py"
node --test tests/courses.test.cjs
```

共享交互及 Highlight.js 来自参考项目；第三方许可保留在 `assets/vendor/highlight.LICENSE`。
