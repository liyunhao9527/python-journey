(() => {
  "use strict";
  const { phases, lessons, filterLessons, resolveLesson, neighbors } =
    window.PythonCourses;
  const current = resolveLesson(document.body.dataset.lesson);
  const prefix = document.body.dataset.courseRoot || "";
  const key = "python-journey:last-lesson";
  const read = () => {
    try {
      return resolveLesson(localStorage.getItem(key));
    } catch {
      return null;
    }
  };
  const save = (id) => {
    try {
      localStorage.setItem(key, id);
    } catch {
      /* Navigation works without storage. */
    }
  };
  const incoming = resolveLesson(
    new URLSearchParams(location.search).get("lesson"),
  );
  if (current || incoming) save((current || incoming).id);
  const last = incoming || read();
  document.querySelectorAll("[data-resume]").forEach((a) => {
    const lesson = last || lessons.find((l) => l.href);
    a.href = prefix + lesson.href;
    a.textContent = last ? `继续学习 · ${lesson.title} ↗` : "从第一课开始 ↗";
  });
  const latest = lessons.filter((l) => l.href).slice(-1)[0];
  const feature = document.querySelector("[data-latest-lesson]");
  if (feature && latest) {
    feature.querySelector(".lesson-meta").textContent =
      `第 ${Number(latest.id)} 课 · 已开放 / 约 ${latest.minutes} 分钟`;
    const title = feature.querySelector("h3 a");
    title.href = latest.href;
    title.textContent = `${latest.title} ↗`;
    feature.querySelector(":scope > p").textContent = latest.summary;
    feature.querySelector(".lesson-bottom .button").href = latest.href;
    if (latest.id !== "0001")
      feature.querySelector(".lesson-question").hidden = true;
  }
  document
    .querySelectorAll("[data-open-count]")
    .forEach(
      (el) =>
        (el.textContent = String(lessons.filter((l) => l.href).length).padStart(
          2,
          "0",
        )),
    );
  document.addEventListener("click", (event) => {
    const a = event.target.closest("a[href]");
    if (!a) return;
    const lesson = lessons.find(
      (l) =>
        l.href &&
        new URL(prefix + l.href, location.href).pathname ===
          new URL(a.href).pathname,
    );
    if (lesson) save(lesson.id);
  });
  if (current) {
    document
      .querySelectorAll("[data-directory]")
      .forEach((a) => (a.href = `${prefix}courses.html?lesson=${current.id}`));
    document
      .querySelectorAll("[data-home]")
      .forEach((a) => (a.href = `${prefix}index.html?lesson=${current.id}`));
    const nav = document.querySelector("[data-lesson-pagination]");
    if (nav) {
      const { previous, next } = neighbors(current.id);
      for (const [lesson, label] of [
        [previous, "上一课"],
        [next, "下一课"],
      ]) {
        const el = document.createElement(lesson ? "a" : "span");
        if (lesson) el.href = prefix + lesson.href;
        el.textContent = lesson
          ? `${label} · ${lesson.title}`
          : label === "上一课"
            ? "这是第一课"
            : "下一课待更新";
        nav.append(el);
      }
    }
  }
  const catalog = document.querySelector("#catalog-results");
  if (!catalog) return;
  const query = document.querySelector("#course-search"),
    phase = document.querySelector("#course-phase"),
    status = document.querySelector("#course-status");
  phases.forEach((title, i) => {
    const option = new Option(
      `${String(i + 1).padStart(2, "0")} · ${title}`,
      String(i + 1),
    );
    phase.add(option);
  });
  function render() {
    const matches = filterLessons(query.value, phase.value, status.value);
    catalog.replaceChildren();
    document.querySelector("#result-count").textContent =
      `找到 ${matches.length} 节课程 · ${matches.filter((l) => l.href).length} 节已开放`;
    document.querySelector("#catalog-empty").hidden = matches.length > 0;
    phases.forEach((title, i) => {
      const group = matches.filter((l) => l.phase === i + 1);
      if (!group.length) return;
      const section = document.createElement("section");
      section.className = "catalog-phase";
      const heading = document.createElement("h2");
      heading.textContent = `${String(i + 1).padStart(2, "0")} / ${title}`;
      section.append(heading);
      const list = document.createElement("ul");
      list.className = "catalog-list";
      group.forEach((l) => {
        const row = document.createElement("li");
        row.className = "catalog-row";
        const number = document.createElement("span");
        number.className = "catalog-number";
        number.textContent = l.id;
        const copy = document.createElement("div"),
          h3 = document.createElement("h3");
        const name = document.createElement(l.href ? "a" : "span");
        name.textContent = l.title;
        if (l.href) name.href = l.href;
        h3.append(name);
        const p = document.createElement("p");
        p.textContent = l.summary;
        copy.append(h3, p);
        const meta = document.createElement("span");
        meta.className = `catalog-status ${l.href ? "is-open" : ""}`;
        meta.textContent = l.href ? `已开放 · ${l.minutes} 分钟 ↗` : "待更新";
        row.append(number, copy, meta);
        list.append(row);
      });
      section.append(list);
      catalog.append(section);
    });
  }
  [query, phase, status].forEach((el) => el.addEventListener("input", render));
  document.querySelector("#clear-filters").addEventListener("click", () => {
    query.value = "";
    phase.value = "all";
    status.value = "all";
    render();
    query.focus();
  });
  render();
})();
