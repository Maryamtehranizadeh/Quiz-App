const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scoreText = document.getElementById("score-text");
const input = document.querySelector("input");
const button = document.querySelector("button");
scoreText.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid Score or Username");
  } else {
    const finalScore = { name: input.value, score: score };
    console.log(finalScore);
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("scores");
    window.location.assign("./");
  }
};

button.addEventListener("click", saveHandler);
