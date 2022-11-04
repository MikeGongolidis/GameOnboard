# Test this by running python -m websockets ws://localhost:8765 on a separate terminal
import json
import asyncio
import websockets
import logging
import signal

from lobby import LobbyRoom
from communication import MessageModel, MessageEnum

DOMAIN = ''
PORT = 8765#f"{os.environ['SUPERVISOR_PROCESS_NAME']}.sock"
LOBBY = LobbyRoom()
CONNECTIONS = set()

logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


async def handler(player):

    # Add new player to the global connections counter and let everyone know
    CONNECTIONS.add(player)
    websockets.broadcast(CONNECTIONS, json.dumps({"mtype":MessageEnum.NUM_CLIENTS.value,"num_clients": len(CONNECTIONS)}))
    
    try:

        async for event in player:

            # Try to parse incoming message
            try:
                message = MessageModel(**json.loads(event))
            except Exception:
                # If message is invalid, let the client know
                await player.send(json.dumps({"mtype":MessageEnum.INVALID_MESSAGE.value}))
                continue

            if message.mtype == MessageEnum.INVITE.value:

                assert message.game_type
                await LOBBY.create_private_room(player, message.game_type)
                
            elif message.mtype == MessageEnum.JOIN.value:

                assert message.room_id in LOBBY.rooms
                await LOBBY.add_player2_in_private_room_and_start_game(player, message.room_id)

            elif message.mtype == MessageEnum.FIND.value:

                assert message.game_type 
                await LOBBY.find_opponent(player, message.game_type)

            elif message.mtype == MessageEnum.EXIT_QUEUE.value:

                LOBBY.exit_queue(player, message)

            elif message.mtype == MessageEnum.EXIT_GAME.value:

                LOBBY.remove_room_id(player) 

            elif message.mtype == MessageEnum.PLAY.value:
                
                room_id = LOBBY.player_to_room_id[player]

                # Try to play player`s move
                try:
                    turn, column, row = LOBBY.games[room_id].play(message)
                except RuntimeError as e:
                    # If invalid, let the player know
                    print(e)
                    await player.send(json.dumps({"mtype":MessageEnum.INVALID_MOVE.value}))
                    continue

                # If move is valid, broadcast it to everyone
                play_event = json.dumps({"mtype":MessageEnum.PLAY.value,"player":turn, "column":column, 'row':row})
                websockets.broadcast(LOBBY.rooms[room_id], play_event)

                #If there is a winner, broadcast to everyone
                if LOBBY.games[room_id].winner:
                    winner_event = json.dumps({"mtype":MessageEnum.WINNER.value,"player":LOBBY.games[room_id].winner})
                    websockets.broadcast(LOBBY.rooms[room_id], winner_event)
                
                #If there is a draw, broadcast to everyone
                if LOBBY.games[room_id].draw:
                    draw_event = json.dumps({"mtype":MessageEnum.DRAW.value})
                    websockets.broadcast(LOBBY.rooms[room_id], draw_event)
    finally:
        # Unregister player if connection closes
        CONNECTIONS.remove(player)
        websockets.broadcast(CONNECTIONS, json.dumps({"mtype":MessageEnum.NUM_CLIENTS.value,"num_clients": len(CONNECTIONS)}))




async def main():

    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    async with websockets.unix_serve(handler,path=PORT):
        await asyncio.Future()

    # async with websockets.serve(handler,DOMAIN,PORT):
    #     await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())

    # asyncio.get_event_loop().run_until_complete(
    #     websockets.serve(handler, '0.0.0.0', 8765))
    # asyncio.get_event_loop().run_forever()