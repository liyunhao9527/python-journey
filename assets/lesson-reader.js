(function (root) {
  "use strict";
  async function copyText(text, clipboard) {
    try {
      if (!clipboard || typeof clipboard.writeText !== "function") return false;
      await clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  // Count visual columns without changing the source or highlighted markup.
  function indentColumns(source, step) {
    const lines = source.split("\n");
    const widths = lines.map((line) => {
      if (!line.trim()) return null;
      let width = 0;
      for (const char of line.match(/^[ \t]*/)[0]) {
        width += char === "\t" ? step - (width % step) : 1;
      }
      return Math.floor(width / step) * step;
    });
    return widths.map((width, index) => {
      if (width !== null) return width;
      let before = index - 1,
        after = index + 1;
      while (before >= 0 && widths[before] === null) before--;
      while (after < widths.length && widths[after] === null) after++;
      return before >= 0 && after < widths.length
        ? Math.min(widths[before], widths[after])
        : 0;
    });
  }
  function addIndentGuides(code, language) {
    const step = { python: 4, rust: 4, typescript: 2, javascript: 2 }[language];
    if (!step) return;
    code.classList.add("reader-code--guided");
    code.style.setProperty("--indent-step", `${step}ch`);
    code.style.tabSize = step;
    indentColumns(code.textContent, step).forEach((width, index) => {
      if (!width) return;
      const guide = document.createElement("span");
      guide.className = "reader-indent-guide";
      guide.setAttribute("aria-hidden", "true");
      guide.style.top = `${index * 1.8}em`;
      guide.style.width = `${width}ch`;
      code.append(guide);
    });
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { copyText, indentColumns, addIndentGuides };
    return;
  }
  const labels = {
    python: "Python",
    rust: "Rust",
    typescript: "TypeScript",
    plaintext: "命令 / 输出",
  };
  document.querySelectorAll(".lesson-article pre").forEach((pre, index) => {
    const code = pre.querySelector("code");
    if (!code) return;
    const wrapper = document.createElement("div");
    wrapper.className = "reader-code";
    const bar = document.createElement("div");
    bar.className = "reader-code__bar";
    const language = Array.from(code.classList)
      .find((c) => c.startsWith("language-"))
      ?.slice(9);
    const lineCount = code.textContent.replace(/\n$/, "").split("\n").length;
    const numbers = document.createElement("span");
    numbers.className = "reader-line-numbers";
    numbers.setAttribute("aria-hidden", "true");
    numbers.dataset.lines = Array.from(
      { length: lineCount },
      (_, i) => i + 1,
    ).join("\n");
    pre.classList.add("reader-code--numbered");
    pre.style.setProperty("--line-number-digits", String(lineCount).length);
    pre.prepend(numbers);
    addIndentGuides(code, language);
    const label = document.createElement("span");
    label.textContent = labels[language] || "代码";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "复制";
    button.setAttribute(
      "aria-label",
      `复制第 ${index + 1} 段${label.textContent}`,
    );
    const feedback = document.createElement("span");
    feedback.className = "reader-copy-feedback";
    feedback.setAttribute("role", "status");
    pre.before(wrapper);
    wrapper.append(bar, pre, feedback);
    bar.append(label, button);
    let reset;
    button.addEventListener("click", async () => {
      button.disabled = true;
      const copied = await copyText(code.textContent, navigator.clipboard);
      button.disabled = false;
      clearTimeout(reset);
      if (copied) {
        button.textContent = "已复制";
        feedback.textContent = "已复制到剪贴板。";
        reset = setTimeout(() => {
          button.textContent = "复制";
          feedback.textContent = "";
        }, 2000);
      } else {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        feedback.textContent =
          "未能自动复制，代码已选中，请按 Ctrl+C（Mac：⌘C）。";
      }
    });
  });
  const links = Array.from(
    document.querySelectorAll('.lesson-outline a[href^="#"]'),
  );
  const sections = links
    .map((a) => document.getElementById(a.hash.slice(1)))
    .filter(Boolean);
  const mark = (section) =>
    links.forEach((a) => {
      if (a.hash === "#" + section.id)
        a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  if (sections.length) {
    const initial =
      sections.find((s) => "#" + s.id === location.hash) || sections[0];
    mark(initial);
    links.forEach((a) =>
      a.addEventListener("click", () => {
        const section = sections.find((s) => "#" + s.id === a.hash);
        if (section) mark(section);
      }),
    );
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting);
          if (visible.length)
            mark(visible[visible.length - 1].target.closest(".lesson-section"));
        },
        { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
      );
      sections.forEach((section) => {
        const heading = section.querySelector("h2");
        if (heading) observer.observe(heading);
      });
    }
  }
})(typeof window !== "undefined" ? window : this);
