const quizzes = {
  javascript: [
    {
      question: "Which company developed JavaScript?",
      options: ["Mozilla", "Microsoft", "Netscape", "Google"],
      answer: "Netscape"
    },
    {
      question: "Inside which HTML element do we put JavaScript?",
      options: ["<js>", "<scripting>", "<script>", "<javascript>"],
      answer: "<script>"
    }
  ],
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyperlinks and Text Markup Language",
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Tool Multi Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Choose the correct HTML element for the largest heading:",
      options: ["<h1>", "<heading>", "<head>", "<h6>"],
      answer: "<h1>"
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which property is used to change the background color?",
      options: ["bgcolor", "background", "color", "background-color"],
      answer: "background-color"
    }
  ]
};

let selectedQuiz = [];
let currentQuestion = 0;
let score = 0;

// Elements
const startScreen = document.getElementById("start-screen");
const langSelect = document.getElementById("language-select");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

// Start Quiz Button
document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  langSelect.classList.remove("hidden");
});

// Language Selection
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    selectedQuiz = quizzes[lang];
    langSelect.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
  });
});

// Load Question
function loadQuestion() {
  nextBtn.disabled = true;
  const q = selectedQuiz[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectOption(btn, option));
    optionsEl.appendChild(btn);
  });
}

// Handle Selection
function selectOption(button, selectedOption) {
  const correctAnswer = selectedQuiz[currentQuestion].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(btn => btn.disabled = true);

  if (selectedOption === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.disabled = false;
}

// Next Button Logic
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < selectedQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show Results
function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${selectedQuiz.length}`;
}
