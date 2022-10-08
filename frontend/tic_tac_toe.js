document.querySelector(".start-game").addEventListener("click", function () {
  let elems = document.querySelectorAll(".cell-inner");
  for (let i = 0; i < elems.length; i++) elems[i].textContent = "";
});
