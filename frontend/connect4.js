//Import common functions from module
import {announce_winner, start_game, draw_move, reset_original_menu} from "./common_functions.js"

// WRITE DEFAULT COMM MESSAGES
let invite = {"mtype": 1, "game_type":2};
let find = {"mtype":5,"game_type":2};
let join = {"mtype":3,"room_id":'string'};
let play = {"mtype":6,"player":0, "column":"string","row":"string"};
let exit_queue = {"mtype":12};

// DEFINE GLOBAL VARIABLES
let PLAYER;
let socket = new WebSocket("ws://127.0.0.1:8765");

let loader = '<div class="loader temp"></div>';

// If a user is trying to JOIN via a link
socket.onopen = function(event){
  // Send an "join" event according to who is connecting.
  const params = new URLSearchParams(window.location.search);
  if (params.has("mtype") && params.has("room_id")) {
    // Second player joins an existing game.
    join.room_id = params.get("room_id");
    socket.send(JSON.stringify(join));
  } 
};

document.getElementById("back").addEventListener("click", function () {
  location.href = "http://localhost:5500/frontend/index.html";
});


document.getElementById("inv").addEventListener("click", function (event) {
  console.log("Player invite initiated");

  // change inv button with waiting animation and space to add the room id link
  document.querySelector('.players-online').style.display = 'none';
  document.querySelector('.announcement-container').innerHTML += loader ;

  // Dont allow clicking of any game starting button
  event.target.style['pointer-events'] = 'none';
  document.getElementById("find").style['pointer-events'] = 'none';

  // Send message for invite
  socket.send(JSON.stringify(invite));
});

document.getElementById("find").addEventListener("click", function (event){
  console.log("Finding game for you. Please wait :)");

  // Clean up announcement board
  document.querySelector('.players-online').style.display = 'none';

  // Add the loader
  let announcement_container = document.querySelector('.announcement-container');
  announcement_container.innerHTML += loader + '<h3 class="temp" style="margin:10px;">Waiting for opponent...</h3>' ;

  // Add the exit queue button
  let button_exit = document.createElement('button');
  button_exit.classList.add('btn','temp');
  button_exit.innerHTML = 'Exit Queue';

  button_exit.onclick = function(){
    // reset menu
    reset_original_menu()

    // make find button available to click
    document.getElementById("find").style['pointer-events'] = 'auto';

    // send exit_game message
    console.log('Trying to exit!')
    //socket.send(JSON.stringify(exit_queue))

  }

  announcement_container.append(button_exit)

  // Dont allow clicking of any game starting button
  event.target.style['pointer-events'] = 'none';
  document.getElementById("inv").style['pointer-events'] = 'none';

  // send message
  socket.send(JSON.stringify(find))
});


// When player tries to play a move, 
document.getElementById('game-board').addEventListener("click", function (e) {

  //Get the column and row of the cell the user clicked
  play.column = e.target.getAttribute('column')
  play.row = e.target.getAttribute('row')
  play.player = PLAYER

  //if they are null, print error and return
  if(play.column == null || play.row == null){
    console.log("Not a valid move, please select a cell!")
    document.querySelector('.player-turn').innerHTML = 'Invalid move, you did something wrong... Or WAIT FOR YOUR TURN!'

    return
  }

  //send the message to the server
  socket.send(JSON.stringify(play))
})




// Listen to messages send by the server:
socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);

    // Parse string into object
    let message = JSON.parse(event.data);

    // Check message mtype and act accordingly
    if(message.mtype === 2){
    // On WAIT
      if(message.room_id){
        let URL = "http://localhost:5500/frontend/connect4.html"
        let text = '<h3 class="temp" >Share the link with your friend:</h3>'
        let input = `<input class='temp' type="text" value="${URL}?mtype=3&room_id=${message.room_id}" id="inviteCopyLink">`;
        let copyonClipboard = `<button class='temp' id='clipboardButton'>⏏️</button>`
        document.querySelector('.announcement-container').innerHTML +=text+input+copyonClipboard;

        document.querySelector('#clipboardButton').addEventListener('click', function(event){
          let text = document.querySelector("#inviteCopyLink").getAttribute('value');
          console.log(text);
          navigator.clipboard.writeText(text).then(function() {
            document.querySelector('.announcement-container').innerHTML +='<h4 class="temp">✅ Text copied!</h6>';

          });
        })
        
      }
    }else if(message.mtype ===4){
    // On START_GAME
      PLAYER = message.player
      start_game(2,PLAYER)
      // Annouce game starting and which player each client is.
    }else if(message.mtype === 6){
    // On PLAY  
      draw_move(message, PLAYER)
    }else if(message.mtype === 10){
    // On NUM_CLIENTS
      document.querySelector('.players-online').innerHTML = "Players online: "+ message.num_clients;
    }else if(message.mtype === 9){
      // On WINNER
      announce_winner(message, PLAYER);
    }else if(message.mtype === 8){
      // On INVALID_MOVE
      console.log('invalid_move')
      document.querySelector('.player-turn').innerHTML = 'Invalid move, you did something wrong...'
    }
  }


 