import websockets
import asyncio
import logging

logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


# Test this by running python -m websockets ws://localhost:8765 on a separate terminal

DOMAIN = 'localhost'
PORT = 8765

async def handler(websocket):
    async for message in websocket:
        await websocket.send(message)

async def main():
    async with websockets.serve(handler,DOMAIN,PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())