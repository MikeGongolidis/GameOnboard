from abc import ABC, abstractmethod

from communication import PlayerEnum

class Game(ABC):

    def __init__(self):
        self.moves = []
        self.winner = None
        self.player1 = PlayerEnum.PLAYER1.value
        self.player2 = PlayerEnum.PLAYER2.value
    
    @property
    def last_player(self):
        return self.player1 if len(self.moves) % 2 else self.player2

    @abstractmethod
    def last_player_won(self):
        pass

    @abstractmethod
    def play(self):
        pass


class Connect4(Game):

    def __init__(self):
        super().__init__()
        self.top = [0 for _ in range(7)]


    def last_player_won(self):
        """
        Whether the last move is winning.

        """
        b = sum(1 << (8 * column + row) for _, column, row in self.moves[::-2])
        return any(b & b >> v & b >> 2 * v & b >> 3 * v for v in [1, 7, 8, 9])

    def play(self, message):
        """
        Play a move in a column.

        Returns the row where the checker lands.

        Raises :exc:`RuntimeError` if the move is illegal.

        """
        player, column = message.player, message.column

        assert player == self.player1 or player == self.player2

        if player == self.last_player:
            raise RuntimeError("It isn't your turn.")

        row = self.top[column]
        if row == 6:
            raise RuntimeError("This slot is full.")

        self.moves.append((player, column, row))
        self.top[column] += 1

        if self.winner is None and self.last_player_won():
            self.winner = self.last_player

        return player, column, row

class TicTacToe(Game):

    def __init__(self):
        super().__init__()
        self.board = [[0 for _ in range(3)] for _ in range(3)] 
        # [[0,0,0],[0,0,0],[0,0,0]]


    def last_player_won(self):
        """
        Check if game was won

        """
        player, x, y = self.moves[-1]
        #check if previous move caused a win on vertical line 
        if self.board[0][y] == self.board[1][y] == self.board[2][y]:
            return True

        #check if previous move caused a win on horizontal line 
        if self.board[x][0] == self.board[x][1] == self.board[x][2]:
            return True

        #check if previous move was on the main diagonal and caused a win
        if x == y and self.board[0][0] == self.board[1][1] == self.board[2][2]:
            return True

        #check if previous move was on the secondary diagonal and caused a win
        if x + y == 2 and self.board[0][2] ==self.board[1][1] ==self.board [2][0]:
            return True

        return False 

    def play(self, message):
        """
        Play a move in a column.

        Returns the row where the checker lands.

        Raises :exc:`RuntimeError` if the move is illegal.

        """
        player, column, row = message.player, message.column, message.row

        assert player == self.player1 or player == self.player2


        if player == self.last_player:
            # Raise smthing or wait or what?
            raise RuntimeError("It isn't your turn.")

        self.moves.append((player, column, row))

        self.board[column][row] = player

        if self.winner is None and self.last_player_won():
            self.winner = self.last_player

        return player, column, row