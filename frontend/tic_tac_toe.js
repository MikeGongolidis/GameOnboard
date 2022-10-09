document.getElementById("back").onclick = function () {
  location.href = "http://localhost:5500/frontend/index.html";
};

document.getElementById("start").onclick = function () {
  document.querySelector(".menu").style.opacity = 0;
};

document.getElementById("inv").onclick = function () {
  console.log("Player invite initiated");
};

document.getElementById("find").onclick = function () {
  console.log("Finding game for you. Please wait :)");
};
