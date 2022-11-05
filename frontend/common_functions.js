
function announce_winner_draw(message, current_player){

    // Pause board
    document.querySelector(".game-board").style["pointer-events"] =  "none";


    // box that announces the winner
    let winner_announcement_container = document.createElement('div');
    winner_announcement_container.classList.add('winner-annc-container');

    let announcement = document.createElement('h3');
    if(message.mtype === 13){
      announcement.innerHTML = 'That is a fair draw...';

    }else{
      announcement.innerHTML = (message.player == current_player) ? 'Lucky you, you won!' : 'You lost, you piece of shit!';
    }


    // Button to enable play again.
    let button_back = document.createElement('button');
    button_back.classList.add('btn');
    button_back.innerHTML = 'Back to main menu';

    // Clean turns
    document.querySelector('.player-turn').innerHTML = ''


    button_back.onclick = function(){
      // Remove winner announcement with animation
      document.querySelector(".winner-annc-container").classList.add('gone');

      setTimeout(() =>{
        // Clean board
        let board = document.querySelector(".game-board");
        board.innerHTML = '' ;
        board.style["pointer-events"] ="auto";
        board.style["display"] = "none";
        // Remove winner announcement
        document.querySelector(".winner-annc-container").remove();
        // Appear the main menu
        document.querySelector(".menu").style.display = "block";
      }, 1000)
    }

    winner_announcement_container.append(announcement);
    winner_announcement_container.append(button_back);

    document.body.append(winner_announcement_container);

  }


function reset_original_menu(){

    // 1. Reset menu and make it invisible
    document.querySelector('.players-online').style.display = 'block';
    const loaders = document.querySelectorAll('.temp');
    loaders.forEach(elem => {
      elem.remove();
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(elem => {
      elem.style['pointer-events'] = 'auto';
    });

}


// Build the game board and start the game
function start_game(game_type, player){

    function create_cell(column, row, game_type){
      let cell_class = (game_type == 2 ) ? 'c4-cell' : 'ttt-cell'
      return `<div class="${cell_class}" column="${column}" row="${row}" ></div>`
    }


    // 1. Reset menu and make it invisible
    reset_original_menu()
    document.querySelector(".menu").style.display = "none";


    // 2. Create board
    let game_board = document.querySelector(".game-board")
    game_board.style.display = "grid";
    
    let rows = [];
    let columns = [];
    if(game_type == 2){
      rows = [5,4,3,2,1,0];
      columns = [0,1,2,3,4,5,6];
      game_board.style['grid'] = 'repeat(6, 1fr) / repeat(7, 1fr)';

    } else {
      rows = [2,1,0];
      columns = [0,1,2];
      game_board.style['grid'] = 'repeat(3, 1fr) / repeat(3, 1fr)';

    }

    for(const row of rows){
      for(const column of columns){
        document.getElementById('game-board').innerHTML += create_cell(column, row, game_type) ;
      }
    }

    // 3. Announce who is who
    document.querySelector('.player-turn').innerHTML = `You are player ${player}`

}


// Draw the image on the board based on which player is playing
function draw_move(message, current_player){

    // Small function to create an image html element
    function display_image(player){

      let img = document.createElement('img');
      img.classList.add("myImg")

      if(player===1){
        img.src = 'assets/fire_circle2.png';
        img.classList.add("fire")
      }else{
        img.src = 'assets/water_circle2.png';
        img.classList.add("water")
      }
      return img
    }
  
    // 1. Draw the move on the board
    //Select the element that has the selected column and row attributes
    let cell = document.querySelector(`[column="${message.column}"][row="${message.row}"]`);

    //Add the image into the selected cell
    cell.appendChild(display_image(message.player));   
    
    // 2. Change the player turn string
    let whoseTurnMessage = (message.player === current_player) ? 'Wait for your turn!' : 'Hurry up... we are waiting!';
    document.querySelector('.player-turn').innerHTML = whoseTurnMessage;

  }

  function getWebSocketServer() {
    console.log(`Connecting to ${window.location.host}`);
    if (window.location.host === "gameonboard-frontend.s3-website.eu-central-1.amazonaws.com/") {
      return "ws://52.59.191.206:5000";
    } else if (window.location.host === "localhost:5500") {
      return "ws://localhost:8765/";
    } else {
      throw new Error(`Unsupported host: ${window.location.host}`);
    }
  }

export {announce_winner_draw, start_game, draw_move, reset_original_menu, getWebSocketServer};