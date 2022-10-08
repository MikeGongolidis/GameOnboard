# Test this by running python -m websockets ws://localhost:8765 on a separate terminal
import json
import asyncio
import websockets
import logging

from lobby import LobbyRoom
from messages import MessageModel, MessageEnum

DOMAIN = 'localhost'
PORT = 8765
LOBBY = LobbyRoom()

logger = logging.getLogger('GameOnBoard')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


async def handler(player):

    async for event in player:
        message = MessageModel(**json.loads(event))

        if message.mtype == MessageEnum.INVITE.value:
            current_room_id = await LOBBY.create_private_room(player)
        elif message.mtype == MessageEnum.JOIN.value:
            assert message.room_id in LOBBY.rooms
            await LOBBY.add_player2_in_private_room_and_start_game(player, message.room_id)
        elif message.mtype == MessageEnum.FIND.value:
            await LOBBY.find_opponent(player)
        elif message.mtype == MessageEnum.EXIT_GAME.value:
            LOBBY.remove_room_id(current_room_id) 
        elif message.mtype == MessageEnum.PLAY.value:
            player, column, row = LOBBY.games[room_id].play(message)
            play_event = json.dumps({"mtype":MessageEnum.PLAY.value,"player":player, "column":column, 'row':row})
            await websockets.broadcast(LOBBY.rooms[room_id],play_event)


#TODO:
# how/where to create the game object?
# how to manage which player is playing? X/O or blue/red?
# announce winner?


async def main():
    async with websockets.serve(handler,DOMAIN,PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())