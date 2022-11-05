//Import common functions from module
import {announce_winner_draw, start_game, draw_move, reset_original_menu, getWebSocketServer} from "./common_functions.js"

let socket = new WebSocket(getWebSocketServer());
let PLAYER;
let GAME_TYPE = 2;

// WRITE DEFAULT COMM MESSAGES
let invite = {"mtype": 1, "game_type":GAME_TYPE};
let find = {"mtype":5,"game_type":GAME_TYPE};
let join = {"mtype":3,"room_id":'string'};
let play = {"mtype":6,"player":0, "column":"string","row":"string"};
let exit_queue = {"mtype":12, "game_type":GAME_TYPE};
let destory_room = {"mtype":7, "game_type":GAME_TYPE};

let loader = document.createElement('div');
loader.classList.add('loader','temp');

// When the game html file is reached
socket.onopen = function(event){

  // Get the parameters from the URL.
  const params = new URLSearchParams(window.location.search);

  if (params.has("mtype") && params.has("room_id") && params.has("game_type")) {
    // Second player joins an existing game.
    join.room_id = params.get("room_id");
    GAME_TYPE = params.get('game_type');
    document.querySelector('.game-title').innerHTML = (GAME_TYPE == 1 ) ? 'Tic-Tac-Toe' : 'Connect 4';
    socket.send(JSON.stringify(join));
  }else if(params.has("game_type")) {
    // Someone joined the main menu
    GAME_TYPE = params.get('game_type');
    document.querySelector('.game-title').innerHTML = (GAME_TYPE == 1 ) ? 'Tic-Tac-Toe' : 'Connect 4';
  }else {
    // Otherwise go back to select which game you want to play
    window.location.replace(`http://${window.location.host}/frontend/index.html`);
  }
};


document.getElementById("back").addEventListener("click", function () {
  location.href = `http://${window.location.host}/frontend/index.html`;
});

// INVITE A FRIEND
document.getElementById("inv").addEventListener("click", function (event) {
  console.log("Player invite initiated");

  // change inv button with waiting animation and space to add the room id link
  document.querySelector('.players-online').style.display = 'none';
  // Add the loader
  let announcement_container = document.querySelector('.announcement-container');
  announcement_container.append(loader);

  // Dont allow clicking of any game starting button
  event.target.style['pointer-events'] = 'none';
  document.getElementById("find").style['pointer-events'] = 'none';

  // Send message for invite
  invite.game_type = GAME_TYPE;
  socket.send(JSON.stringify(invite));
});


// FIND GAME
document.getElementById("find").addEventListener("click", function (event){
  console.log("Finding game for you. Please wait :)");

  // Clean up announcement board
  document.querySelector('.players-online').style.display = 'none';

  // Add the loader
  let waiting_message = document.createElement('h3');
  waiting_message.classList.add('temp');
  waiting_message.innerHTML = 'Waiting for enemy!';
  let announcement_container = document.querySelector('.announcement-container');
  announcement_container.append(loader,waiting_message) ;

  // Add the exit queue button
  let button_exit = document.createElement('button');
  button_exit.classList.add('btn','temp');
  button_exit.innerHTML = 'Exit Queue';

  button_exit.onclick = function(){
    // reset menu
    reset_original_menu()

    // send exit_game message
    console.log('Trying to exit!')
    exit_queue.game_type = GAME_TYPE;
    socket.send(JSON.stringify(exit_queue))

  }

  announcement_container.append(button_exit)

  // Dont allow clicking of any game starting button
  event.target.style['pointer-events'] = 'none';
  document.getElementById("inv").style['pointer-events'] = 'none';

  // send message
  find.game_type = GAME_TYPE;
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
        let URL = "http://localhost:5500/frontend/game.html"


        let text = document.createElement('h3') ;
        text.classList.add('temp');
        text.innerHTML = 'Share this link with your friend';

        let input = document.createElement('input') ;
        input.classList.add('temp');
        input.setAttribute('type','text');
        input.setAttribute('id','inviteCopyLink');
        input.setAttribute('value',`${URL}?mtype=3&room_id=${message.room_id}&game_type=${GAME_TYPE}`);

        let copyonClipboard = document.createElement('button');
        copyonClipboard.classList.add('temp');
        copyonClipboard.setAttribute('id','clipboardButton');
        copyonClipboard.innerHTML = '⏏️';

        let announcement_container = document.querySelector('.announcement-container');

        // Add the exit queue button
        let button_exit = document.createElement('button');
        button_exit.classList.add('btn','temp');
        button_exit.innerHTML = 'Destroy room';

        button_exit.onclick = function(){
          // reset menu
          reset_original_menu()

          // send exit_game message
          console.log('Trying to exit!')
          destory_room.game_type = GAME_TYPE;
          socket.send(JSON.stringify(destory_room))

        };

        announcement_container.append(text,input,copyonClipboard,button_exit)

        document.querySelector('#clipboardButton').addEventListener('click', function(event){
          let text = document.querySelector("#inviteCopyLink").getAttribute('value');
          console.log(text);
          navigator.clipboard.writeText(text).then(function() {

            let text = document.createElement('h4') ;
            text.classList.add('temp');
            text.innerHTML = '✅ Text copied!';

            document.querySelector('.announcement-container').append(text);

          });
        })
        
      }
    }else if(message.mtype ===4){
    // On START_GAME
      PLAYER = message.player
      start_game(GAME_TYPE,PLAYER)
      // Annouce game starting and which player each client is.
    }else if(message.mtype === 6){
    // On PLAY  
      draw_move(message, PLAYER)
    }else if(message.mtype === 10){
    // On NUM_CLIENTS
      document.querySelector('.players-online').innerHTML = "Players online: "+ message.num_clients;
    }else if(message.mtype === 9){
      // On WINNER
      announce_winner_draw(message, PLAYER);
    }else if(message.mtype === 13){
      // On DRAW
      announce_winner_draw(message, PLAYER);
    }else if(message.mtype === 8){
      // On INVALID_MOVE
      console.log('invalid_move')
      document.querySelector('.player-turn').innerHTML = 'Invalid move, you did something wrong...'
    }
  }


 