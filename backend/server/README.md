# Implementation of dummy websocket server

Backend websocket server that responds

## To run the server:

## 1. Set up environment

navigate in the backend folder.  

Run ```python -m venv .venv```. This will initialize a virtual environment (folder .venv).   

Activate the virtual environment by running ```source .venv/bin/activate```.   

Finally, to install dependencies, run ```pip install -r requirements.txt ```.  

Make sure to run those commands in the backend folder.  


## 2. Initiate server

To initiate the server, execute ```python main.py```  

You will see the server up and running!  

You can test the server by opening a new terminal window, getting in the same folder (activate virtual environment again) and execute: ```python websockets ws://localhost:8765/```  

You will be able to send messages from the new terminal window and see them in the server terminal. Play around!  


#