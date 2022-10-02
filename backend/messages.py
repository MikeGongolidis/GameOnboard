from pydantic import BaseModel
from enum import IntEnum
from typing import Optional

class MessageEnum(IntEnum):
    INVITE = 1
    JOIN = 2
    FIND = 3
    WAIT = 4
    START_GAME =5
    PLAY = 6
    EXIT_GAME = 7
    INVALID_MOVE = 8
    WINNER = 9

class MessageModel(BaseModel):
    mtype: MessageEnum
    player: Optional[str]
    column: Optional[int]
    row: Optional[int]
    room_id: Optional[str]
