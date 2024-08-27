const Buttons = document.querySelectorAll("button");
let URL = null;

const selectHandler = (event) => {
  const level = event.target.innerText.toLowerCase();
  //   URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
  //   console.log(URL);
  localStorage.setItem("level", level);
  window.location.assign("./");
};
Buttons.forEach((button) => {
  button.addEventListener("click", selectHandler);
});
