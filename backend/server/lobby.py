import json
import secrets
import asyncio

from collections import OrderedDict

from communication import MessageModel, MessageEnum, GameEnum, PlayerEnum
from game import TicTacToe, Connect4

import logging
logger = logging.getLogger(__name__)

def put(dictionary,item):
    dictionary[item] = 1


class LobbyRoom():

    def __init__(self):
        self.ttt_queue = OrderedDict()
        self.c4_queue = OrderedDict()
        self.rooms = {}
        self.games = {}
        self.player_to_room_id = {}

    async def create_private_room(self, player1, game_type):
        """
        Creates a new room with a unique id, adds the room in the rooms dictionary
        and returns the room_id.
        """
        room_id = secrets.token_urlsafe(12)

        self.rooms[room_id] = {player1}
        if game_type == GameEnum.TTT.value:
            self.games[room_id] = TicTacToe()
        else:
            self.games[room_id] = Connect4()
        
        self.player_to_room_id[player1] = room_id

        await player1.send(json.dumps({"mtype":MessageEnum.WAIT.value,"room_id":room_id}))

    
    async def add_player2_in_private_room_and_start_game(self, player2, room_id:str):

        self.rooms[room_id].add(player2)
        self.player_to_room_id[player2] = room_id

        #This runs twice, once per player
        for player,code in zip(self.rooms[room_id],[1,2]): 
            await player.send(json.dumps({"mtype":MessageEnum.START_GAME.value,"player": code}))
    
    def remove_room_id(self, player):


        room_id = self.player_to_room_id[player]
        logger.info(f"Deleting room {room_id} from Lobby")

        logger.info(f'Number of rooms before: {len(self.rooms)}')

        del self.rooms[room_id]
        del self.games[room_id]
        logger.info(f'Number of rooms after: {len(self.rooms)}')

    async def find_opponent(self, player, game_type):

        try:
            if player in self.ttt_queue or player in self.c4_queue:
                await player.send(json.dumps({"mtype":MessageEnum.WAIT.value}))
                return
                
            player1 = self.ttt_queue.popitem(last=False)[0] if game_type == GameEnum.TTT.value else self.c4_queue.popitem(last=False)[0]

            await self.create_private_room(player1, game_type)

            room_id = self.player_to_room_id[player1]

            await self.add_player2_in_private_room_and_start_game(player, room_id)

        except KeyError:

            put(self.ttt_queue,player) if game_type == GameEnum.TTT.value else put(self.c4_queue,player)

            await player.send(json.dumps({"mtype":MessageEnum.WAIT.value}))

    
    def exit_queue(self, player, message):

        if message.game_type == 2:
            del self.c4_queue[player]
        else:
            del self.ttt_queue[player]


