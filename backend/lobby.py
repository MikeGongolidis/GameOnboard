import json
import secrets
import asyncio

from messages import MessageModel, MessageEnum


class LobbyRoom():

    def __init__(self):
        self.players = asyncio.Queue()
        self.rooms = {}
        self.games = {}

    async def create_private_room(self, player1):
        """
        Creates a new room with a unique id, adds the room in the rooms dictionary
        and returns the room_id.
        """
        room_id = secrets.token_urlsafe(12)

        self.rooms[room_id] = {player1}

        await player1.send(json.dumps({"mtype":MessageEnum.WAIT.value,"room_id":room_id}))

        return room_id
    
    async def add_player2_in_private_room_and_start_game(self, player2, room_id:str):

        self.rooms[room_id].add(player2)

        for player,code in zip(self.rooms[room_id],["PLAYER1","PLAYER2"]):
            await   player.send(json.dumps({"mtype":MessageEnum.START_GAME.value,"player": code}))
    
    def remove_room_id(self, room_id):

        print(f"Deleting room {room_id} from Lobby")

        del self.rooms[room_id]

    async def find_opponent(self, player):

        try:
            player1 = self.players.get_nowait()

            room_id = await self.create_private_room(player1)

            await self.add_player2_in_private_room_and_start_game(player, room_id)

        except asyncio.QueueEmpty:

            await self.players.put(player)

            await player.send(json.dumps({"mtype":MessageEnum.WAIT.value}))
