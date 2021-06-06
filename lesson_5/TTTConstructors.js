const READLINE = require("readline-sync");

function Square(marker) {
  this.marker = `(${marker})`;
}

Square.HUMAN_MARKER = " X ";
Square.COMPUTER_MARKER = " O ";

Square.prototype.isUnused = function() {
  return "(1)(2)(3)(4)(5)(6)(7)(8)(9)".includes(this.marker);
};

Square.prototype.updateMarker = function(newMarker) {
  this.marker = newMarker;
};

Square.prototype.toString = function() {
  return this.marker;
};

Square.prototype.getMarker = function () {
  return this.marker;
};


function Board() {
  this.squares = {};
  for (let counter = 1; counter <= 9; counter += 1) {
    this.squares[String(counter)] = new Square(String(counter));
  }
}

Board.prototype.markSquareAt = function(key, marker) {
  this.squares[key].updateMarker(marker);
};

Board.prototype.countMarkersFor = function(player, keys) {
  let markers = keys.filter(key => {
    return this.squares[key].getMarker() === player.getMarker();
  });

  return markers.length;
};

Board.prototype.unusedSquares = function() {
  let keys = Object.keys(this.squares);
  return keys.filter(key => this.squares[key].isUnused());
};

Board.prototype.isFull = function() {
  let unusedSquares = this.unusedSquares();
  return unusedSquares.length === 0;
};

Board.prototype.displayWithClear = function() {
  console.clear();
  console.log("\n");
  this.display();
};

Board.prototype.display = function() {
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
};


function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  return this.marker;
};

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;


function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
  ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
  ["1", "5", "9"], ["3", "5", "7"]
];

TTTGame.prototype.play = function() {
  this.displayWelcomeMessage();

  this.board.display();

  while (true) {
    while (true) {
      this.humanMark();
      if (this.gameOver()) break;

      this.computerMark();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();

    if (!this.playAgain()) break;

    this.board = new Board();
    this.board.displayWithClear();
  }

  this.displayGoodbyeMessage();
};

TTTGame.prototype.displayWelcomeMessage = function() {
  console.clear();
  console.log("Welcome to Tic Tac Toe\n");
};

TTTGame.prototype.humanMark = function() {
  let choice;

  while (true) {
    let validChoices = this.board.unusedSquares();
    console.log(`Choose a square (${validChoices.join(", ")}):`);
    choice = READLINE.question();

    if (validChoices.includes(choice)) break;

    console.log("Oops! Invalid answer. Try again!");
  }
  this.board.markSquareAt(choice, this.human.getMarker());
};

TTTGame.prototype.computerMark = function() {
  let validChoices = this.board.unusedSquares();
  let randomChoice;

  do {
    randomChoice = String(Math.floor(Math.random() * 9) + 1);
  } while (!validChoices.includes(randomChoice));

  this.board.markSquareAt(randomChoice, this.computer.getMarker());
};

TTTGame.prototype.gameOver = function() {
  return this.board.isFull() || this.someoneWon();
};

TTTGame.prototype.isWinner = function(player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    return this.board.countMarkersFor(player, row) === 3;
  });
};

TTTGame.prototype.someoneWon = function() {
  return this.isWinner(this.human) || this.isWinner(this.computer);
};

TTTGame.prototype.displayResults = function() {
  if (this.isWinner(this.human)) {
    console.log("You won! Congratulations!");
  } else if (this.isWinner(this.computer)) {
    console.log("I won! Take that, human!");
  } else {
    console.log("A tie game. BORING.");
  }
};

TTTGame.prototype.displayGoodbyeMessage = function() {
  console.log("Thanks for playing Tic Tac Toe");
};

TTTGame.prototype.playAgain = function() {
  let choice;

  while (true) {
    choice = READLINE.question(`Would you like to play again? (y/n) `);
    if ("yn".includes(choice[0])) break;

    console.log("Oops! Invalid answer. Try again!");
  }

  return choice[0] === "y";
};


let game = new TTTGame();

game.play();