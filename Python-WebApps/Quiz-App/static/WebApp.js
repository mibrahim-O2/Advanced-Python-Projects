console.log("JS loaded");

let currentQuestion = 0;
let score = 0;
let questions = [];
let answers = {};
let totalTime = 60 * 60; // 60 minutes in seconds
let timerInterval;

// ================= TIMER =================
function startTimer() {
  timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      alert("Time is up! Quiz submitted.");
      showResult();
      return;
    }

    totalTime--;

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    document.getElementById("timer").innerText =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

// ================= FETCH QUESTIONS =================
fetch("/questions")
  .then(res => res.json())
  .then(data => {
    questions = data.slice(0, 50);
    startTimer();
    loadQuestion();
  })
  .catch(err => console.error(err));

// ================= LOAD QUESTION =================
function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText =
    `${currentQuestion + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const checked = answers[currentQuestion] === opt ? "checked" : "";

    optionsDiv.innerHTML += `
      <div class="form-check mt-2">
        <input class="form-check-input" type="radio" name="option"
               id="option${index}" value="${opt}" ${checked}>
        <label class="form-check-label" for="option${index}">
          ${opt}
        </label>
      </div>
    `;
  });

  document.getElementById("submitBtn").classList.toggle(
    "d-none",
    currentQuestion !== questions.length - 1
  );

  document.getElementById("nextBtn").classList.toggle(
    "d-none",
    currentQuestion === questions.length - 1
  );
}

// ================= NEXT =================
function nextQuestion() {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

// ================= PREVIOUS =================
function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// ================= SAVE ANSWER =================
function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[currentQuestion] = selected.value;
  }
}

// ================= RESULT =================
function showResult() {
  clearInterval(timerInterval);
  document.getElementById("quiz-box").style.display = "none";

  score = 0;
  for (let i in answers) {
    if (answers[i] === questions[i].answer) {
      score++;
    }
  }

  const percentage = Math.round((score / questions.length) * 100);
  let message = "";

  if (percentage >= 90) message = "🌟 Excellent! Brilliant performance!";
  else if (percentage >= 75) message = "🔥 Very Good! Strong Python knowledge!";
  else if (percentage >= 50) message = "👍 Good effort! Keep practicing!";
  else message = "📘 Needs improvement. Practice more!";

  document.getElementById("result").innerHTML = `
    <h3>Your Score: ${score}/${questions.length}</h3>
    <h4>Percentage: ${percentage}%</h4>
    <p class="fw-bold">${message}</p>
  `;
}
