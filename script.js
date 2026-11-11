const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const hint = document.getElementById("hint");
const solution = document.getElementById("solution");

document.getElementById("check-btn").addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkAnswer();
});

function checkAnswer() {
  const raw = answerInput.value.trim();
  if (raw === "") {
    feedback.textContent = "Please enter an answer first.";
    feedback.className = "feedback incorrect";
    answerInput.focus();
    return;
  }
  if (Number(raw) === 5) {
    feedback.textContent = "Correct! −9 + 14 = 5.";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "Not quite. Try again, or use the hint.";
    feedback.className = "feedback incorrect";
  }
}

function togglePanel(panel, button, showText, hideText) {
  panel.hidden = !panel.hidden;
  button.textContent = panel.hidden ? showText : hideText;
  button.setAttribute("aria-expanded", String(!panel.hidden));
}
const hintButton = document.getElementById("hint-btn");
hintButton.addEventListener("click", () => togglePanel(hint, hintButton, "Show hint", "Hide hint"));
const solutionButton = document.getElementById("solution-btn");
solutionButton.addEventListener("click", () => togglePanel(solution, solutionButton, "View solution", "Hide solution"));