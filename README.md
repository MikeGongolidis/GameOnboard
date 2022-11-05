# GameOnboard

Full stack game development with friends

## Frontend:

We build the frontend with plain HTML, CSS and Javascript.   
We use the websockets object to connect to out Websockets backend server.
All relevant files are in the frontend folder.
We generated the assets via Midjourney AI.  

The frontend is currently deployed via AWS S3 static hosting. The files are updated automatically via github actions (.github folder)  

## Backend:

A Python websockets server, located into backend/server/ folder. The main.py file handles the async communication with the clients.    
The communication is defined in the communication.py file.  
The game.py file defines the game logic of the currently supported games.  
The lobby.py file defines a Lobby object which manages the games, the player connections and the waiting queue.  

The webserver is currently deployed in an EC2 instance manually.
It is deployed with nginx as a reverse proxy via docker-compose.  


## Todos:
1. Backend: do we need containers at all?
2. CSS: Improve play animations.
3. HTML: Display error when trying to join wrong room.
4. Re-write frond end with React + SCSS.


