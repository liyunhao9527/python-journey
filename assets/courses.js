(function (root) {
  "use strict";
  const phases = [
    "基础语法",
    "日常 Python 与工程习惯",
    "项目一 · 文件清单 CLI",
    "进阶语言与数据处理",
    "项目二 · 支出分析报告",
    "网络、数据库与并发",
    "项目三 · 学习书签 API",
  ];
  const lessons = [
    {
      id: "0001",
      phase: 1,
      title: "把 Python 跑起来",
      summary: "用 uv 安装并固定 Python 版本，对照 TypeScript 运行第一个脚本。",
      tags: "python uv venv pin sync run 解释器 TypeScript Node.js",
      minutes: 30,
      href: "lessons/0001-build-and-run.html",
    },
    {
      id: "0002",
      phase: 1,
      title: "变量、对象与基础类型",
      summary: "名字绑定到对象，理解 int、float、bool、None。",
      tags: "赋值 引用 可变 类型 id is ==",
    },
    {
      id: "0003",
      phase: 1,
      title: "字符串与输入输出",
      summary: "切片、编码、f-string 与 input 的类型转换。",
      tags: "str unicode format input print",
    },
    {
      id: "0004",
      phase: 1,
      title: "列表、元组、字典和集合",
      summary: "选择容器，识别共享引用、浅拷贝与不可变。",
      tags: "list tuple dict set copy",
    },
    {
      id: "0005",
      phase: 1,
      title: "条件判断与循环",
      summary: "用 if、for、while 处理数据，练习 range 和 enumerate。",
      tags: "分支 循环 break continue truthiness",
    },
    {
      id: "0006",
      phase: 1,
      title: "函数与参数",
      summary: "返回值、作用域、关键字参数；避开可变默认值。",
      tags: "def return args kwargs scope 默认参数",
    },
    {
      id: "0007",
      phase: 1,
      title: "推导式与小型统计",
      summary: "把筛选和映射写清楚，完成账单计算练习。",
      tags: "comprehension sorted sum zip",
    },
    {
      id: "0008",
      phase: 2,
      title: "模块、包与导入",
      summary: "import、包结构、__name__ 和脚本入口。",
      tags: "module package main sys.path",
    },
    {
      id: "0009",
      phase: 2,
      title: "路径、文本和结构化文件",
      summary: "使用 pathlib、with、JSON、CSV，显式指定编码。",
      tags: "文件 I/O pathlib json csv utf-8",
    },
    {
      id: "0010",
      phase: 2,
      title: "异常与输入校验",
      summary: "捕获具体异常，保留错误上下文，拒绝静默失败。",
      tags: "try except raise finally logging",
    },
    {
      id: "0011",
      phase: 2,
      title: "依赖与项目环境",
      summary: "uv add、uv sync、pyproject.toml 与 uv.lock，管理项目依赖。",
      tags: "uv add sync dependency lock 虚拟环境",
    },
    {
      id: "0012",
      phase: 2,
      title: "测试、调试与代码检查",
      summary: "pytest、参数化测试、tmp_path、断点、Ruff。",
      tags: "test fixture mock pdb lint",
    },
    {
      id: "0013",
      phase: 3,
      title: "项目一：扫描与统计",
      summary: "用 pathlib 扫描只读目录，按扩展名汇总。",
      tags: "CLI 文件清单 argparse",
    },
    {
      id: "0014",
      phase: 3,
      title: "项目一：交付一个可用命令",
      summary: "加入参数、JSON 导出、退出码、边界测试和使用说明。",
      tags: "CLI JSON 权限 symlink packaging",
    },
    {
      id: "0015",
      phase: 4,
      title: "类、dataclass 与组合",
      summary: "用对象封装行为，用数据类表达记录。",
      tags: "class dataclass OOP 继承 组合",
    },
    {
      id: "0016",
      phase: 4,
      title: "Python 的对象协议",
      summary: "可变性、相等与身份、特殊方法和属性。",
      tags: "dunder __repr__ __eq__ property hash",
    },
    {
      id: "0017",
      phase: 4,
      title: "类型提示与静态检查",
      summary: "写可读的类型边界，理解注解不做运行时校验。",
      tags: "typing union generic Protocol mypy pyright",
    },
    {
      id: "0018",
      phase: 4,
      title: "迭代器与生成器",
      summary: "理解可迭代对象、一次性迭代和惰性处理。",
      tags: "iter next yield generator itertools",
    },
    {
      id: "0019",
      phase: 4,
      title: "闭包与装饰器",
      summary: "先理解函数是对象，再实现保留元信息的包装器。",
      tags: "closure decorator functools wraps",
    },
    {
      id: "0020",
      phase: 4,
      title: "上下文管理与资源释放",
      summary: "用 with 和 contextlib 保证资源收尾。",
      tags: "contextmanager __enter__ __exit__",
    },
    {
      id: "0021",
      phase: 5,
      title: "项目二：清洗与对账",
      summary: "统一日期、金额和分类，把有效记录写入 SQLite。",
      tags: "CSV Decimal datetime sqlite3 pandas",
    },
    {
      id: "0022",
      phase: 5,
      title: "项目二：生成分析报告",
      summary: "聚合分类与月份，输出图表、HTML 和错误清单。",
      tags: "matplotlib pandas 报表 HTML 数据分析",
    },
    {
      id: "0023",
      phase: 6,
      title: "HTTP 客户端与可靠请求",
      summary: "状态码、JSON、超时、重试边界与速率限制。",
      tags: "httpx requests HTTP retry timeout",
    },
    {
      id: "0024",
      phase: 6,
      title: "SQL 与事务",
      summary: "参数化 SQL、唯一约束、迁移、提交与回滚。",
      tags: "SQLite SQL transaction migration",
    },
    {
      id: "0025",
      phase: 6,
      title: "asyncio 与并发控制",
      summary: "协程、任务、TaskGroup、Semaphore 和取消。",
      tags: "async await asyncio concurrency",
    },
    {
      id: "0026",
      phase: 6,
      title: "线程、进程与性能测量",
      summary: "按工作负载选工具，理解常规 CPython 的 GIL。",
      tags: "thread process GIL profile executor",
    },
    {
      id: "0027",
      phase: 7,
      title: "项目三：API 与数据模型",
      summary: "构建书签 CRUD、校验、分页和统一错误响应。",
      tags: "FastAPI Pydantic REST API",
    },
    {
      id: "0028",
      phase: 7,
      title: "项目三：持久化与接口测试",
      summary: "加数据库层、迁移、测试隔离和重启验收。",
      tags: "SQLAlchemy Alembic pytest TestClient",
    },
    {
      id: "0029",
      phase: 7,
      title: "项目三：配置与部署",
      summary: "环境变量、日志、健康检查、容器和运行文档。",
      tags: "Docker deploy health config",
    },
  ];
  function filterLessons(query = "", phase = "all", status = "all") {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return lessons.filter(
      (l) =>
        (phase === "all" || String(l.phase) === phase) &&
        (status === "all" || (status === "open" ? !!l.href : !l.href)) &&
        terms.every((t) =>
          `${l.title} ${l.summary} ${l.tags}`.toLowerCase().includes(t),
        ),
    );
  }
  function resolveLesson(id) {
    return lessons.find((l) => l.id === id && l.href) || null;
  }
  function neighbors(id) {
    const open = lessons.filter((l) => l.href),
      index = open.findIndex((l) => l.id === id);
    return {
      previous: index > 0 ? open[index - 1] : null,
      next: index >= 0 ? open[index + 1] || null : null,
    };
  }
  const api = { phases, lessons, filterLessons, resolveLesson, neighbors };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.PythonCourses = api;
})(typeof window !== "undefined" ? window : this);
