import formatData from "./helper.js";
const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};
const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};
function convert(str) {
  const text = document.createElement("textarea");
  text.innerHTML = str;
  return text.value;
}
const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = convert(question);
  answerList.forEach((button, index) => {
    button.innerText = convert(answers[index]);
    questionNumber.innerText = questionIndex + 1;
  });
};
const checkAnswer = (event, index) => {
  if (!isAccepted) {
    return;
  }
  isAccepted = false;
  if (index === correctAnswer) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};
const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = "answer-text";
  });
};
const nextHandler = () => {
  removeClasses();
  if (questionIndex < formattedData.length - 1) {
    isAccepted = true;
    questionIndex++;
    showQuestion();
  } else {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("/end.html");
  }
  isAccepted = true;
};
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    checkAnswer(event, index);
  });
});

nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
