document.getElementById("back").addEventListener("click", function () {
  location.href = "http://localhost:5500/frontend/index.html";
});

document.getElementById("start").addEventListener("click", function () {
  document.querySelector(".menu").style.opacity = 0;
  document.querySelector(".menu").style.visibility = "hidden";
});

document.getElementById("inv").addEventListener("click", function () {
  console.log("Player invite initiated");
});

document.getElementById("find").addEventListener("click", function () {
  console.log("Finding game for you. Please wait :)");
});

var myElementToCheckIfClicksAreInsideOf = document.getElementById("1");
// Listen for click events on body
document.body.addEventListener("click", function (event) {
  if (myElementToCheckIfClicksAreInsideOf.contains(event.target)) {
    console.log("clicked inside");
  } else {
    console.log("clicked outside");
  }
});
