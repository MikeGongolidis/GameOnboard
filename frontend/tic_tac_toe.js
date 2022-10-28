// Identify the messages that are being sent back and forth:
// 1.messages client is sending to the server:
  // INVITE = 1
  // JOIN = 3
  // START_GAME = 4
  // FIND = 5
  // EXIT_GAME = 7
// 2.messages server is sending to the client:
  // WAIT = 2
  // PLAY = 6
  // INVALID_MOVE = 8
  // WINNER = 9
  // NUM_CLIENTS = 10
  // INVALID_MESSAGE = 11

// Create the dictionary objects in js with the default communication messages.
let find = {"mtype":5,"game_type":1};
let play = {"mtype":6,"player":0, "column":"string","row":"string"};
let invite = {"mtype":1, "game_type":1}
let exit = {"mtype":7}
let join = {"mtype":3,"room_id":'string'}

const loader = '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'; 
let PLAYER;
let socket = new WebSocket("ws://127.0.0.1:8765");

function start_game(){

  document.querySelector(".menu").style.opacity = 0;
  document.querySelector(".menu").style.visibility = "hidden";
  document.querySelector(".game-board").style.opacity = 1;
  document.querySelector(".game-board").style.visibility = "visible";

  for(const row of [2,1,0]){
    for(const column of [1,2,3]){
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
  socket.send(JSON.stringify(invite));
  document.querySelector(".inv").innerHTML = loader;
});

document.getElementById("find").addEventListener("click", function () {
  console.log("Searching for game");
  socket.send(JSON.stringify(find));
  document.querySelector(".find").innerHTML = loader;
});

// LOCAL GAME SIMULATION

document.getElementById('game-board').addEventListener("click", function (e) {
  // IMPLEMENT HERE...

  play.column = e.target.getAttribute('column')
  play.row = e.target.getAttribute('row')
  play.player = PLAYER

  console.log(play)
  socket.send(JSON.stringify(play))

})

function play_move(message){

  function display_image(player){
    let img;
    if(player===1){
      img = "<div class='box'><div id='img1' ></div></div> ";
    }else{
      img = "<div class='box'><div id='img2' ></div></div> ";
    }
  
    return img
  }

  let cell = document.querySelector(`[column="${message.column}"][row="${message.row}"]`);
  cell.firstChild.innerHTML = display_image(message.player);
}

socket.addEventListener("open", () => {
  // Send an "join" event according to who is connecting.
  const params = new URLSearchParams(window.location.search);
  if (params.has("mtype") && params.has("room_id")) {
    // Second player joins an existing game.
    join.room_id = params.get("room_id");
    socket.send(JSON.stringify(join));
  } 
});


//LITOURGIES SERVER PROS CLIENT
socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
  let message = JSON.parse(event.data)
  if(message.mtype === 2){
    if(message.room_id){
      let URL = "http://localhost:5500/frontend/tic_tac_toe.html"
      let value = `${URL}?mtype=3&room_id=${message.room_id}`
      console.log(value)
      navigator.clipboard.writeText(value)
    }
  }else if(message.mtype === 4){
      start_game()
      PLAYER = message.player
  }else if(message.mtype === 6){
    console.log(message)
    play_move(message)
  } else if(message.mtype === 10){
    document.querySelector(".number-of-players").innerHTML = message.num_clients
  }
  //MESSAGE = {"mtype":MessageEnum.NUM_CLIENTS.value,"num_clients": len(CONNECTIONS)}
  // WINNER LOGIC
    // INVALID MOVE
    // NUMBER OF CLIENTS
};


// GAME EVALUATION

// when game ends do this
// document.querySelector(".visibility").style.visibility = "visible";


