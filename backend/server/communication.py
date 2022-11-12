from pydantic import BaseModel, validator
from enum import IntEnum
from typing import Optional

class MyEnum(IntEnum):

    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))

class MessageEnum(MyEnum):
    INVITE = 1
    WAIT = 2
    JOIN = 3
    START_GAME = 4
    FIND = 5
    PLAY = 6
    EXIT_GAME = 7
    INVALID_MOVE = 8
    WINNER = 9
    NUM_CLIENTS = 10
    INVALID_MESSAGE = 11
    EXIT_QUEUE = 12
    DRAW = 13


class GameEnum(MyEnum):
    TTT = 1
    CFOUR = 2

class PlayerEnum(MyEnum):
    PLAYER1 = 1
    PLAYER2 = 2

class MessageModel(BaseModel):
    mtype: MessageEnum
    player: Optional[PlayerEnum]
    game_type: Optional[GameEnum]
    column: Optional[int]
    row: Optional[int]
    room_id: Optional[str]
    num_clients: Optional[int]
         
    @validator('column')
    def column_must_be_restricted(cls, v):
        if v not in range(0,7):
            raise ValueError('column out of bounds')
        return v.title()

    @validator('row')
    def row_must_be_restricted(cls, v):
        if v not in range(0,7):
            raise ValueError('row out of bounds')
        return v.title()