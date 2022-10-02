# Test this by running python -m websockets ws://localhost:8765 on a separate terminal
import json
import asyncio
import secrets
import websockets

from messages import MessageModel,MessageEnum

DOMAIN = 'localhost'
PORT = 8765

class LobbyRoom():

    def __init__(self,player,room_id):
        self.players: set(player)
        self.room_id: room_id
   

async def invite(websocket):

    room_id = secrets.token_urlsafe(12)

    room = LobbyRoom(websocket,room_id)

    await websocket.send(json.dumps({"mtype":MessageEnum.WAIT.value,"room_id":room_id}))

    async for message in websocket:
        event = MessageModel(**json.loads(message))
        print(event)
        if event.mtype == MessageEnum.EXIT_GAME.value:
            await websocket.send(json.dumps({"mtype":"bye bye"}))
            break
        else:
            await websocket.send(json.dumps({"mtype":MessageEnum.WAIT.value,"room_id":room_id}))





async def handler(websocket):

    # Parse first message from Client
    message = MessageModel(**json.loads(await websocket.recv()))

    #await websocket.send(json.dumps(message.dict()))

    if message.mtype == MessageEnum.INVITE.value:
        await invite(websocket)
    
    async for message in websocket:
        await websocket.send(message)



async def main():
    print(f'Opening websocket at ws://{DOMAIN}:{PORT}...')
    async with websockets.serve(handler,DOMAIN,PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())