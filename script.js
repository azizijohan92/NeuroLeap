const questions = [
    {
        question: "Berapakah hasil 2 + 3?",
        answers: ["4", "5", "6", "7"],
        correctAnswer: "5"
    },
    {
        question: "Haiwan manakah boleh terbang?",
        answers: ["Kucing", "Ikan", "Burung", "Arnab"],
        correctAnswer: "Burung"
    },
    {
        question: "Apakah warna pisang yang sudah masak?",
        answers: ["Biru", "Kuning", "Ungu", "Hitam"],
        correctAnswer: "Kuning"
    },
    {
        question: "Bentuk manakah mempunyai tiga sisi?",
        answers: ["Bulatan", "Segi tiga", "Segi empat", "Bintang"],
        correctAnswer: "Segi tiga"
    },
    {
        question: "Huruf selepas B ialah?",
        answers: ["A", "C", "D", "E"],
        correctAnswer: "C"
    }
];

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const questionText = document.getElementById("questionText");
const answerContainer = document.getElementById("answerContainer");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const scoreText = document.getElementById("scoreText");
const feedbackText = document.getElementById("feedbackText");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    homeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = score;

    showQuestion();
}

function showQuestion() {
    answerSelected = false;
    nextButton.classList.add("hidden");
    feedbackText.textContent = "";
    answerContainer.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    progressText.textContent =
        `Soalan ${currentQuestionIndex + 1} daripada ${questions.length}`;

    const progressPercentage =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressFill.style.width = `${progressPercentage}%`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-button");

        button.addEventListener("click", () => {
            selectAnswer(button, answer);
        });

        answerContainer.appendChild(button);
    });
}

function selectAnswer(selectedButton, selectedAnswer) {
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const currentQuestion = questions[currentQuestionIndex];
    const allButtons =
        document.querySelectorAll(".answer-button");

    allButtons.forEach((button) => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        scoreText.textContent = score;
        feedbackText.textContent = "Betul! Bagus sekali! 🎉";
    } else {
        selectedButton.classList.add("wrong");
        feedbackText.textContent =
            `Belum tepat. Jawapan betul ialah ${currentQuestion.correctAnswer}.`;
    }

    nextButton.classList.remove("hidden");

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Lihat Keputusan";
    } else {
        nextButton.textContent = "Soalan Seterusnya";
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = `${score}/${questions.length}`;

    if (score === questions.length) {
        resultMessage.textContent =
            "Hebat! Semua jawapan anda betul!";
    } else if (score >= 3) {
        resultMessage.textContent =
            "Bagus! Teruskan latihan untuk menjadi lebih hebat.";
    } else {
        resultMessage.textContent =
            "Cubaan yang baik! Mari cuba sekali lagi.";
    }
}

function restartQuiz() {
    resultScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = score;
    progressFill.style.width = "0";
}
