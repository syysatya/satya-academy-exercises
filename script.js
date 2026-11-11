// Demo question data. In the next milestone this can be loaded from a teacher-managed content file.
const questions = [
  { expression:"−9 + 14", spoken:"negative nine plus fourteen", answer:5, hint:"Start at −9 on a number line. Adding 14 means move 14 units to the right.", steps:["The integers have opposite signs.","Subtract their absolute values: 14 − 9 = 5.","Keep the sign of the number with the greater absolute value. Since 14 is positive, the result is positive."], solution:"5" },
  { expression:"−7 + (−6)", spoken:"negative seven plus negative six", answer:-13, hint:"When two negative integers are added, add their absolute values and keep the negative sign.", steps:["Both integers are negative.","Add their absolute values: 7 + 6 = 13.","Keep the negative sign."], solution:"−13" },
  { expression:"18 + (−11)", spoken:"eighteen plus negative eleven", answer:7, hint:"The signs are different. Subtract the smaller absolute value from the larger.", steps:["The integers have opposite signs.","Subtract: 18 − 11 = 7.","18 has the greater absolute value and is positive, so the result is positive."], solution:"7" },
  { expression:"−15 + 8", spoken:"negative fifteen plus eight", answer:-7, hint:"Compare the absolute values 15 and 8. The larger absolute value determines the sign.", steps:["The integers have opposite signs.","Subtract: 15 − 8 = 7.","15 is greater and belongs to the negative integer, so the result is negative."], solution:"−7" },
  { expression:"−12 + 12", spoken:"negative twelve plus twelve", answer:0, hint:"A number and its additive opposite always add to zero.", steps:["The integers have opposite signs.","Their absolute values are equal: 12 − 12 = 0.","The sum is zero."], solution:"0" }
];
let currentIndex = 0;
const answeredCorrectly = new Set();
const $ = (id) => document.getElementById(id);
const answerInput = $("answer"), feedback = $("feedback"), hint = $("hint"), solution = $("solution");
function renderQuestion() {
  const q = questions[currentIndex];
  $("question-number").textContent = `Question ${currentIndex + 1}`;
  $("progress-text").textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  $("score-text").textContent = `Score: ${answeredCorrectly.size} / ${questions.length}`;
  $("progress-bar").style.width = `${(currentIndex / questions.length) * 100}%`;
  $("math-expression").textContent = q.expression;
  $("math-expression").setAttribute("aria-label", q.spoken);
  answerInput.value = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  $("hint-text").textContent = q.hint;
  $("solution-text").innerHTML = "";
  const list = document.createElement("ol");
  q.steps.forEach(step => { const li = document.createElement("li"); li.textContent = step; list.appendChild(li); });
  $("solution-text").appendChild(list);
  const final = document.createElement("p"); final.className = "final-answer"; final.textContent = `Final answer: ${q.solution}`; $("solution-text").appendChild(final);
  hint.hidden = true; solution.hidden = true;
  $("hint-btn").textContent = "Show hint"; $("hint-btn").setAttribute("aria-expanded","false");
  $("solution-btn").textContent = "View solution"; $("solution-btn").setAttribute("aria-expanded","false");
  $("previous-btn").disabled = currentIndex === 0;
  $("next-btn").textContent = currentIndex === questions.length - 1 ? "Finish exercise" : "Next question";
}
function checkAnswer() {
  const raw = answerInput.value.trim();
  if (!raw) { feedback.textContent = "Please enter an answer first."; feedback.className = "feedback incorrect"; answerInput.focus(); return; }
  const value = Number(raw);
  if (!Number.isFinite(value)) { feedback.textContent = "Please enter a valid number."; feedback.className = "feedback incorrect"; return; }
  const q = questions[currentIndex];
  if (value === q.answer) {
    answeredCorrectly.add(currentIndex);
    feedback.textContent = `Correct! ${q.expression} = ${q.solution}.`;
    feedback.className = "feedback correct";
    $("score-text").textContent = `Score: ${answeredCorrectly.size} / ${questions.length}`;
  } else {
    feedback.textContent = "Not quite. Try again, or use the hint.";
    feedback.className = "feedback incorrect";
  }
}
function togglePanel(panel, button, showText, hideText) {
  panel.hidden = !panel.hidden; button.textContent = panel.hidden ? showText : hideText;
  button.setAttribute("aria-expanded", String(!panel.hidden));
}
$("check-btn").addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", event => { if (event.key === "Enter") checkAnswer(); });
$("hint-btn").addEventListener("click", () => togglePanel(hint, $("hint-btn"), "Show hint", "Hide hint"));
$("solution-btn").addEventListener("click", () => togglePanel(solution, $("solution-btn"), "View solution", "Hide solution"));
$("previous-btn").addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } });
$("next-btn").addEventListener("click", () => {
  if (currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); return; }
  $("question-card").hidden = true; $("progress-wrap").hidden = true; $("results-card").hidden = false;
  $("final-score").textContent = `${answeredCorrectly.size} / ${questions.length} correct`;
  $("result-message").textContent = answeredCorrectly.size === questions.length ? "Excellent work! You answered every question correctly." : "Good effort. Review the worked solutions and try the exercise again.";
});
$("restart-btn").addEventListener("click", () => {
  currentIndex = 0; answeredCorrectly.clear(); $("question-card").hidden = false; $("progress-wrap").hidden = false; $("results-card").hidden = true; renderQuestion();
});
renderQuestion();