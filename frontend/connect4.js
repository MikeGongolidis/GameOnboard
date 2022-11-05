
// WRITE DEFAULT COMM MESSAGES
let invite = {"mtype": 1, "game_type":2};
let find = {"mtype":5,"game_type":2};
let join = {"mtype":3,"room_id":'string'};
let play = {"mtype":6,"player":0, "column":"string","row":"string"};
let exit = {"mtype": 7}

// DEFINE GLOBAL VARIABLES
let PLAYER;
let socket = new WebSocket("ws://127.0.0.1:8765");


function start_game(){

    document.querySelector(".menu").style.opacity = 0;
    document.querySelector(".menu").style.visibility = "hidden";
    document.querySelector(".game-board").style.opacity = 1;
    document.querySelector(".game-board").style.visibility = "visible";
  
    for(const row of [5,4,3,2,1,0]){
      for(const column of [1,2,3,4,5,6,7]){
          let cell =  `<div class="cell" id="one" column="${column}" row="${row}" >`  +
                      `<span class="cell-inner" ></span>`+
                      `</div>`
          document.getElementById('game-board').innerHTML += cell ;
      }
    }
}

document.getElementById("back").addEventListener("click", function () {
  location.href = "http://localhost:5500/frontend/index.html";
});

document.getElementById("start").addEventListener("click", function () {
    start_game()
});


document.getElementById("inv").addEventListener("click", function (e) {
  console.log("Player invite initiated");

  // Send message for invite
  socket.send(JSON.stringify(invite));
  // change inv button with waiting animation and space to add the room id link
  document.querySelector('#inv').innerHTML = '<div class="loader"></div>';
  
});

document.getElementById("find").addEventListener("click", function () {
  console.log("Finding game for you. Please wait :)");
  // IMPLEMENT HERE...


  socket.send(JSON.stringify(find))

  document.querySelector('#find').innerHTML = ' <div class="loader"></div>  ';

});



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

function announce_winner(message){

  // box with the name of the winning player
  let announce_div = document.createElement('div');
  announce_div.id = 'ann_div';
  let announcement = document.createElement('h3');
  announcement.innerHTML = `Winner: Player ${message.player}`;
  announcement.classList.add("announcement");
  announce_div.append(announcement);

  // button that will show the starting board
  let button_div = document.createElement('div');
  button_div.classList.add('btn');
  button_div.classList.add('btn-back');
  let button= document.createElement('button');
  button.classList.add('back');
  button.classList.add('start-game');
  button.id = 'reset_menu';
  button.innerHTML = 'Play again!';
  button.onclick = function(){
    document.querySelector('#inv').innerHTML = 'Invite a Friend';
    document.querySelector('#find').innerHTML = 'Find Game';
    document.querySelector(".menu-container").style.opacity = 1;
    document.querySelector(".menu-container").style.visibility = "visible";
    document.querySelector("#ann_div").style.visibility = 0;
    document.querySelector("#ann_div").style.visibility = "hidden";
  }
  button_div.append(button)

  document.querySelector(".game-board").innerHTML = '' ;
  document.querySelector(".game-board").style.opacity = 0;
  document.querySelector(".game-board").style.visibility = "hidden";
  document.querySelector(".menu-container").style.opacity = 0;
  document.querySelector(".menu-container").style.visibility = "hidden";
  document.querySelector(".menu").style.opacity = 1;
  document.querySelector(".menu").style.visibility = "visible";

  document.querySelector(".menu").appendChild(announce_div);
  document.querySelector(".menu").appendChild(button_div);

}

// If a user is trying to join via a link
socket.addEventListener("open", () => {
  // Send an "join" event according to who is connecting.
  const params = new URLSearchParams(window.location.search);
  if (params.has("mtype") && params.has("room_id")) {
    // Second player joins an existing game.
    join.room_id = params.get("room_id");
    socket.send(JSON.stringify(join));
  } 
});


// IMPLEMENT HERE....
socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
    let message = JSON.parse(event.data)
    if(message.mtype === 2){
      if(message.room_id){
        let URL = "http://localhost:5500/frontend/connect4.html"
        let input = `<input type="text" value="${URL}?mtype=3&room_id=${message.room_id}" id="myInput">`;
        document.querySelector('#inv').innerHTML +=input;
      }
    }else if(message.mtype ===4){
      PLAYER = message.player
      start_game()
      // Annouce game starting and which player each client is.
    }else if(message.mtype === 6){
      console.log(message)
      play_move(message)
    }else if(message.mtype === 10){
      document.querySelector('.players-online').innerHTML = "Players online: "+ message.num_clients;
    }else if(message.mtype === 9){
      //TODO:
      announce_winner(message);
    }else if(message.mtype === 8){
      console.log('invalid_move')
    }
  }


 