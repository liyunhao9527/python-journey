const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const courses = require("../assets/courses.js");
const { copyText, indentColumns } = require("../assets/lesson-reader.js");
const hljs = require("../assets/vendor/highlight.min.js");

test("only published lessons resolve to real readable pages", () => {
  assert.equal(courses.lessons.length, 29);
  assert.equal(new Set(courses.lessons.map((l) => l.id)).size, 29);
  assert.equal(courses.phases.length, 7);
  assert.equal(courses.filterLessons("", "all", "open").length, 5);
  assert.equal(courses.filterLessons("", "all", "planned").length, 24);
  for (const lesson of courses.lessons) {
    assert.ok(lesson.phase >= 1 && lesson.phase <= courses.phases.length);
    if (lesson.href) {
      const html = fs.readFileSync(
        path.join(__dirname, "..", lesson.href),
        "utf8",
      );
      assert.ok(html.includes(`data-lesson="${lesson.id}"`));
    } else {
      assert.equal(courses.resolveLesson(lesson.id), null);
    }
  }
  assert.equal(courses.resolveLesson("../../outside"), null);
  assert.deepEqual(courses.neighbors("0001"), { previous: null, next: courses.resolveLesson("0002") });
});

test("search combines terms, phase and publication status", () => {
  assert.equal(courses.filterLessons("FASTapi")[0].id, "0027");
  assert.equal(courses.filterLessons("python venv", "1", "open")[0].id, "0001");
  assert.equal(courses.filterLessons("pytest", "1").length, 0);
  assert.equal(courses.filterLessons("没有这个主题").length, 0);
  assert.equal(courses.filterLessons("   ").length, 29);
});

test("Python grammar highlights without changing copyable source", () => {
  assert.ok(hljs.getLanguage("python"));
  const result = hljs.highlight('for day in range(5):\n    print("学习")', {
    language: "python",
  });
  assert.ok(result.value.includes("hljs-keyword"));
  assert.ok(result.value.includes("hljs-string"));
  assert.deepEqual(
    indentColumns("def main():\n    if True:\n        print(1)", 4),
    [0, 4, 8],
  );
});

test("copy supports success and clipboard denial", async () => {
  let copied;
  assert.equal(
    await copyText("你好", {
      writeText: async (text) => {
        copied = text;
      },
    }),
    true,
  );
  assert.equal(copied, "你好");
  assert.equal(await copyText("example", undefined), false);
  assert.equal(
    await copyText("example", {
      writeText: async () => {
        throw new Error("denied");
      },
    }),
    false,
  );
});
