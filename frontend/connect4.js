




// WRITE DEFAULT COMM MESSAGES
let find = {"mtype":5,"game_type":2};
let play = {"mtype":6,"player":0, "column":0,"row":0};

// DEFINE GLOBAL VARIABLES
let PLAYER;
let socket = new WebSocket("ws://127.0.0.1:8765");


function start_game(){

    document.querySelector(".menu").style.opacity = 0;
    document.querySelector(".menu").style.visibility = "hidden";
    document.querySelector(".game-board").style.opacity = 1;
    document.querySelector(".game-board").style.visibility = "visible";
  
    for(const row of [6,5,4,3,2,1]){
      for(const column of [1,2,3,4,5,6,7]){
          let cell =  `<div class="cell" id="one" column="${column}" row="${row}" >`  +
                      `<span class="cell-inner" ></span>`+
                      `</div>`
          document.getElementById('game-board').innerHTML = document.getElementById('game-board').innerHTML + cell ;
      }
    }

}

document.getElementById("back").addEventListener("click", function () {
  location.href = "http://localhost:5500/frontend/index.html";
});

document.getElementById("start").addEventListener("click", function () {
    start_game()
});


document.getElementById("inv").addEventListener("click", function () {
  console.log("Player invite initiated");

  // IMPLEMENT HERE....

});

document.getElementById("find").addEventListener("click", function () {
  console.log("Finding game for you. Please wait :)");
  // IMPLEMENT HERE...


  socket.send(JSON.stringify(find))

});



document.getElementById('game-board').addEventListener("click", function (e) {
  // IMPLEMENT HERE...

  play.column = e.target.getAttribute('column')
  play.row = e.target.getAttribute('row')
  play.player = PLAYER

  console.log(play)
  socket.send(JSON.stringify(play))

})


// IMPLEMENT HERE....
socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
    let message = JSON.parse(event.data)
    console.log(message.mtype)
    if(message.mtype === 4){
        start_game()
        PLAYER = message.player
    }else if(message.mtype === 6){
      console.log(message)
      play_move(message)
    } // WINNER LOGIC
      // INVALID MOVE
      // NUMBER OF CLIENTS
  };


