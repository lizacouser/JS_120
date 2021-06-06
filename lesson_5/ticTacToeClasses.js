const READLINE = require("readline-sync");

class Square {
  static HUMAN_MARKER = " X "
  static COMPUTER_MARKER = " O "

  constructor(marker) {
    this.marker = marker;
  }
  getMarker() {
    return this.marker;
  }

  isUnused() {
    return [
      "(1)", "(2)", "(3)",
      "(4)", "(5)", "(6)",
      "(7)", "(8)", "(9)"
    ].includes(this.marker);
  }

  toString() {
    return this.marker;
  }

  updateMarker(marker) {
    this.marker = marker;
  }
}

class Board {
  static CENTER_SQUARE = "5";

  constructor() {
    this.reset();
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  display() {
    console.log("");
    console.log("");
    console.log("     |     |");
    console.log(` ${this.squares["1"]} | ${this.squares["2"]} | ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(` ${this.squares["4"]} | ${this.squares["5"]} | ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(` ${this.squares["7"]} | ${this.squares["8"]} | ${this.squares["9"]}`);
    console.log("     |     |\n");
  }

  displayWithClear() {
    console.clear();
    this.display();
  }

  isFull() {
    let unusedSquares = this.unusedSquares();
    return unusedSquares.length === 0;
  }

  markSquareAt(key, marker) {
    this.squares[key].updateMarker(marker);
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = new Square(`(${String(counter)})`);
    }
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }

}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static GAMES_TO_WIN = 3;
  static WINNING_COMBINATIONS = [
    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
    ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
    ["1", "5", "9"], ["3", "5", "7"]
  ]

  static gameOrGames(score) {
    return score === 1 ? "game" : "games";
  }

  static joinOr(arr, delimiter = ",", conjunction = "or") {
    if (arr.length < 2) return String(arr[0]) || undefined;

    let result = arr[0];
    for (let index = 1; index < arr.length - 1; index += 1) {
      result += `${delimiter} ${arr[index]}`;
    }

    result += ` ${conjunction} ${arr[arr.length - 1]}`;
    return result;
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
    this.lastComputerMove = null;
    this.activePlayer = null;
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe");
  }

  playMatch() {
    console.log(`First player to win ${TTTGame.GAMES_TO_WIN} games wins the match.`);

    while (true) {
      this.playOneGame();

      if (this.isWinner()) {
        this.updateScore();
        if (this.isMatchWinner()) break;
      }

      this.displayScore();
      if (!this.playAgain()) break;

      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

    if (this.isMatchWinner()) {
      this.displayMatchResults();
    }
  }

  playOneGame() {
    this.activePlayer = this.firstPlayer;
    this.board.reset();
    this.resetLastComputerMove();

    this.board.display();
    this.displayScore();

    while (true) {
      this.makeMove(this.activePlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      this.displayLastComputerMove();
      this.activePlayer = this.togglePlayer(this.activePlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  resetLastComputerMove() {
    this.updateLastComputerMove(null);
  }

  updateLastComputerMove(square) {
    this.lastComputerMove = square;
  }

  displayScore() {
    console.log("");
    console.log("Score");
    console.log(`Computer: ${this.computer.score}`);
    console.log(`Human: ${this.human.score}`);
    console.log("");
  }

  makeMove(activePlayer) {
    if (activePlayer === this.human) {
      this.humanMoves();
    } else if (activePlayer === this.computer) {
      this.computerMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      console.log(`Your move! Choose a square (${TTTGame.joinOr(validChoices)}):`);
      choice = READLINE.question();

      if (validChoices.includes(choice)) break;

      console.log("Oops! Invalid answer. Try again!");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.getWinningComputerMove();

    if (!choice) {
      choice = this.getDefensiveComputerMove();
    }

    if (!choice) {
      choice = this.pickCenterSquare();
    }

    if (!choice) {
      choice = this.pickRandomSquare();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
    this.updateLastComputerMove(choice);
  }

  getWinningComputerMove() {
    let winningRows = this.getPotentialWinningRows(this.computer);

    return this.findOpenSquare(winningRows);
  }

  getPotentialWinningRows(player) {
    return TTTGame.WINNING_COMBINATIONS.filter(row => {
      return this.board.countMarkersFor(player, row) === 2;
    });
  }

  findOpenSquare(rowChoices) {
    if (rowChoices.length === 0) return null;

    let move;
    for (let index = 0; index < rowChoices.length; index += 1) {
      let row = rowChoices[index];
      move = row.find(square => {
        return this.board.unusedSquares().includes(square);
      });

      if (move) break;
    }

    return move;
  }

  getDefensiveComputerMove() {
    let threatenedRows = this.getPotentialWinningRows(this.human);

    return this.findOpenSquare(threatenedRows);
  }

  pickCenterSquare() {
    return this.board.unusedSquares().includes(Board.CENTER_SQUARE) ?
      Board.CENTER_SQUARE : null;
  }

  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = String(Math.floor(Math.random() * 9) + 1);
    } while (!validChoices.includes(choice));

    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.isWinner();
  }

  isWinner() {
    return TTTGame.WINNING_COMBINATIONS.some(row => {
      return this.board.countMarkersFor(this.activePlayer, row) === 3;
    });
  }

  displayLastComputerMove() {
    if (this.lastComputerMove) {
      console.log(`Computer played in square ${this.lastComputerMove}`);
    }
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  displayResults() {
    if (!this.isWinner()) {
      console.log("A tie game. BORING.");
    } else if (this.activePlayer === this.human) {
      console.log("You won! Congratulations!");
    } else {
      console.log("I won! Take that, human!");
    }
  }

  updateScore() {
    this.activePlayer.incrementScore();
  }

  isMatchWinner() {
    return this.activePlayer.getScore() === TTTGame.GAMES_TO_WIN;
  }

  playAgain() {
    let choice;

    while (true) {
      choice = READLINE.question(`Would you like to play again? (y/n) `);
      if (["y", "n"].includes(choice.toLowerCase())) break;

      console.log("Oops! Invalid answer. Try again!");
    }

    console.clear();
    return choice === "y";
  }


  displayMatchResults() {
    this.displayScore();

    if (this.activePlayer === this.human) {
      console.log(`A worthy opponent. You win the match!`);
    } else {
      console.log(`I win the match! Mwaahahahahahahahahahaha`);
    }
  }

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing Tic Tac Toe");
    console.log("");
  }

}

let game = new TTTGame();

game.play();

/*

as an experiment, tried to leverage the fact that we're
tracking the active player and breaking out of the loop
as soon as the active player wins. this way I didn't have
to always test if the computer was the winner or the human
was the winner, I could just test if the active player won
and if so, if the active player's updated score was 3.
*/