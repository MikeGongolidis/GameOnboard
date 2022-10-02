import websockets
import asyncio

# Test this by running python -m websockets ws://localhost:

DOMAIN = 'localhost'
PORT = 8765

async def handler(websocket):
    async for message in websocket:
        print(f"Received: {message}")
        print(f"Responding with: {message}")
        await websocket.send(message)

async def main():
    print(f'Opening websocket at ws://{DOMAIN}:{PORT}...')
    async with websockets.serve(handler,DOMAIN,PORT):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())