const READLINE = require("readline-sync");

let Square = {
  HUMAN_MARKER: " X ",
  COMPUTER_MARKER: " O ",

  init(marker) {
    this.marker = (`(${marker})`);
    return this;
  },

  isUnused() {
    return "(1)(2)(3)(4)(5)(6)(7)(8)(9)".includes(this.marker);
  },

  updateMarker(marker) {
    this.marker = marker;
  },

  toString() {
    return this.marker;
  },

  getMarker() {
    return this.marker;
  },
};

let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = Object.create(Square)
        .init(String(counter));
    }
    return this;
  },

  markSquareAt(key, marker) {
    this.squares[key].updateMarker(marker);
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    let unusedSquares = this.unusedSquares();
    return unusedSquares.length === 0;
  },

  displayWithClear() {
    console.clear();
    console.log("\n");
    this.display();
  },

  display() {
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
  },
};

let PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};


let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],
    ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"],
    ["1", "5", "9"], ["3", "5", "7"]
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },

  play() {
    // orchestrate game play
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      while (true) {
        this.humanMark();
        if (this.gameOver()) break;

        this.computerMark();
        if (this.gameOver()) break;

        // this.switchActivePlayer();
        this.board.displayWithClear();
      }

      this.board.displayWithClear();
      this.displayResults();
      if (!this.playAgain()) break;

      this.board = Object.create(Board).init();
      this.board.displayWithClear();
    }

    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe\n");
  },

  humanMark() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      console.log(`Choose a square (${validChoices.join(", ")}):`);
      choice = READLINE.question();

      if (validChoices.includes(choice)) break;

      console.log("Oops! Invalid answer. Try again!");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMark() {
    let validChoices = this.board.unusedSquares();
    let randomChoice;

    do {
      randomChoice = String(Math.floor(Math.random() * 9) + 1);
    } while (!validChoices.includes(randomChoice));

    this.board.markSquareAt(randomChoice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
    // someone has won or there is a tie
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! Take that, human!");
    } else {
      console.log("A tie game. BORING.");
    }
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe");
  },

  playAgain() {
    let choice;

    while (true) {
      choice = READLINE.question(`Would you like to play again? (y/n) `);
      if ("yn".includes(choice[0])) break;

      console.log("Oops! Invalid answer. Try again!");
    }

    return choice[0] === "y";
  },
  
};

let game = Object.create(TTTGame).init();
game.play();