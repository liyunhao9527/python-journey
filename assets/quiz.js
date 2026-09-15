document.querySelectorAll("[data-quiz]").forEach((quiz) => {
  const feedback = quiz.querySelector('[role="status"]');
  const buttons = Array.from(quiz.querySelectorAll("button"));
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      buttons.forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
        option.dataset.state = "";
      });
      const correct = button.dataset.correct === "true";
      button.dataset.state = correct ? "correct" : "wrong";
      quiz.dataset.state = button.dataset.state;
      feedback.textContent = correct
        ? "回答正确。" + quiz.dataset.explanation
        : quiz.dataset.incorrect ||
          "再想一下：回到本节示例，比较每个选项的实际作用。可以重选。";
    });
  });
});
