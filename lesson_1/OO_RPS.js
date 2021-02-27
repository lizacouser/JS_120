/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

const readline = require('readline-sync');
function titleCase(word) {
  return word[0].toUpperCase() + word.slice(1);
}


function createRulebook() {
  return {
    gamesToWin: null,
    validChoices: ['rock', 'paper', 'scissors'],
    abbreviations: {r: 'rock', p: 'paper', s: 'scissors'},
    movesDefeatedBy: {
      rock: {scissors: 'crushes'},
      paper: {rock: 'covers'},
      scissors: {paper: 'cut'}
    },

    setGamesToWin(number) {
      this.gamesToWin = number;
    },

    setFromUserInput() {
      let numGamesToWin;
      while (true) {
        console.log('\nHow many wins do you need to win a match?');
        numGamesToWin = Number(readline.question());

        if (numGamesToWin > 0 && !Number.isNaN(numGamesToWin)) break;
        console.log('Sorry, invalid choice.');
      }
      this.setGamesToWin(numGamesToWin);

      let version;
      while (true) {
        console.log('\nChoose a version: Traditional or Spock');
        version = readline.question().trim().toLowerCase()[0];

        if ('ts'.includes(version)) break;
        console.log('Sorry, invalid choice.');
      }

      if (version === 's') {
        this.setToSpock();
      }
    },

    setToSpock() {
      this.validChoices = this.validChoices.concat('lizard', 'spock');
      // ['rock', 'paper', 'scissors', 'lizard', 'spock']
      this.abbreviations = Object.assign(this.abbreviations, {l: 'lizard', sp: 'spock'});
      // {r: 'rock', p: 'paper', s: 'scissors', l: 'lizard', sp: 'spock'}

      this.movesDefeatedBy.rock['lizard'] = 'crushes';   // rock: {scissors: 'crushes', lizard: 'crushes'}
      this.movesDefeatedBy.paper['spock'] = 'disproves';   // paper: {rock: 'covers', spock: 'disproves'},
      this.movesDefeatedBy.scissors['lizard'] = 'decapitate';   // scissors: { paper: 'cut', lizard: 'decapitate'},
      this.movesDefeatedBy['spock'] = {scissors: 'smashes', rock: 'vaporizes'};
      this.movesDefeatedBy['lizard'] = {spock: 'poisons', paper: 'eats'};
    },
  };
}

function createScores() {
  return {
    human: 0,
    computer: 0,
    tie: 0,
    gameHistory: [],      //[[rock, scissors, human], [rock, paper, computer], [rock, scissors, human]]

    setMatchWinner(winner) {
      this.matchWinner = winner;
    },

    incrementScore(winner) {
      this[winner] += 1;
    },

    updateGameHistory(humanMove, computerMove, winner) {
      this.gameHistory.push([humanMove, computerMove, winner]);
    },

    reset() {
      this.human = 0;
      this.computer = 0;
      this.tie = 0;
      this.gameHistory = [];
    },
  };
}


function createPlayer() {
  return {
    move: null,
  };
}


function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose(choices, history) {
      let weights = this.getWeights(choices, history); // e.g. {rock: 1, paper: 1, scissors: 0.5}
      let sumOfPercents = Object.values(weights)
        .reduce((acc, val) => acc + val);   // e.g. 2.5

      let randomNum = Math.random() * sumOfPercents; // e.g. random number between 0 and 2.5

      // weight move probability using percentage of past moves that won
      let threshold = 0;
      for (let moveIdx = 0; moveIdx < choices.length; moveIdx += 1) {
        let currentMove = choices[moveIdx];

        threshold += weights[currentMove]; // e.g. threshold is 1 for rock, 2 paper, 2.5 scissors

        if (randomNum <= threshold) {  // use weighted random number to set move
          this.move = currentMove;
          break;
        }
      }
    },

    getWeights(choices, history) {
      let moveWeights = {};
      const EVEN_WEIGHT = 1;

      choices.forEach(move => {
        let gamesWon = history.filter(game => game[2] === 'computer');
        moveWeights[move] = EVEN_WEIGHT;

        if (gamesWon.length > 0) {
          let moveWon = gamesWon.filter(game => game[1] === move);
          let percentWins = moveWon.length / gamesWon.length;

          moveWeights[move] += percentWins / 2;
        }
      });
      return moveWeights;
    },
  };

  return Object.assign(playerObject, computerObject);
}


function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose(rules) {
      let choice;

      while (true) {
        console.log(`\nMake your choice: ${rules.validChoices.join(', ')} ` +
                    `(${Object.keys(rules.abbreviations).join(', ')})`);
        choice = readline.question().toLowerCase();

        if (rules.validChoices.includes(choice)) break;
        if (Object.keys(rules.abbreviations).includes(choice)) {
          choice = rules.abbreviations[choice];
          break;
        }
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
}


const RPSGame = {
  rules: createRulebook(),
  score: createScores(),
  human: createHuman(),
  computer: createComputer(),
  winner: null,
  matchWinner: null,

  setGameWinner(gameWinner) {
    this.winner = gameWinner;
  },

  setMatchWinner(matchWinner) {
    this.matchWinner = matchWinner;
  },

  displayWelcomeMessage() {
    let title = this.rules.validChoices.map(titleCase).join(', ');

    console.log(`Welcome to ${title}!`);
  },

  displayScore() {
    console.log(`You: ${this.score.human}. Computer: ${this.score.computer}.`);
    console.log(`You need to win ${this.rules.gamesToWin - this.score.human} more to win the match.`);
  },

  updateScore() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let movesDefeatedBy = this.rules.movesDefeatedBy;

    // check for game winner
    if (Object.keys(movesDefeatedBy[humanMove]).includes(computerMove)) {
      this.setGameWinner('human');
    } else if (Object.keys(movesDefeatedBy[computerMove]).includes(humanMove)) {
      this.setGameWinner('computer');
    } else {
      this.setGameWinner('tie');
    }

    this.score.incrementScore(this.winner); // increase score of winner by 1
    this.score.updateGameHistory(humanMove, computerMove, this.winner);  // track moves


    // check for match winner
    if (this.score.human === this.rules.gamesToWin) {
      this.setMatchWinner('human');
    } else if (this.score.computer === this.rules.gamesToWin) {
      this.setMatchWinner('computer');
    }
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose ${humanMove}.`);
    console.log(`The computer chose ${computerMove}.`);

    if (this.winner === 'human') {
      console.log(`${titleCase(humanMove)} ` + //human move
                   `${this.rules.movesDefeatedBy[humanMove][computerMove]} ` + // verb
                   `${computerMove}. You win!`); //computer move
    } else if (this.winner === 'computer') {
      console.log(`${titleCase(computerMove)} ` +
                  `${this.rules.movesDefeatedBy[computerMove][humanMove]} ` +
                  `${humanMove}. Computer wins!`);
    } else {
      console.log("It's a tie.");
    }
  },

  displayMatchResults() {
    if (this.matchWinner === 'human') {
      console.log(`You've won ${this.rules.gamesToWin} games, and win the match!`);
    } else if (this.matchWinner === 'computer') {
      console.log(`You've lost ${this.rules.gamesToWin} games. Computer wins the match!`);
    }

    if (this.score.gameHistory.length > 1) {
      console.log(`\nMatch games:`);
      this.score.gameHistory.forEach((setOfMoves, index) => {
        console.log(`Game ${index + 1}. You played ${setOfMoves[0]}. ` +
                    `Computer played ${setOfMoves[1]}. ` +
                    `Winner: ${setOfMoves[2] === 'human' ? 'you' : setOfMoves[2]}.`); // tie, you, or comp
      });
    }
  },

  resetMatch() {
    this.score.reset();
    this.matchWinner = null;
  },

  displayGoodbyeMessage() {
    console.log('\nThanks for playing! Goodbye.');
  },

  playAgain(gameOrMatch) {
    console.log(`\nWould you like to play a new ${gameOrMatch}? (y/n)`);
    let answer = readline.question().trim().toLowerCase()[0];
    return answer === 'y';
  },

  play() {

    console.clear();
    this.displayWelcomeMessage();
    this.rules.setFromUserInput();

    while (true) {
      while (true) {
        this.displayScore();
        this.human.choose(this.rules);
        this.computer.choose(this.rules.validChoices, this.score.gameHistory);

        this.updateScore();
        this.displayWinner();

        if (this.matchWinner) break;

        if (!this.playAgain('game')) break;
        console.clear();
      }

      this.displayMatchResults();
      if (!this.playAgain('match')) break;

      this.resetMatch();
      console.clear();
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();


/*
Notes:
-user choice
-computer choice
-winner displayed

RPS is a two-player game where each player chooses one of
three possible moves: rock, paper, or scissors.
The winner is chosen by comparing their moves
with the following rules:

Rock crushes scissors, i.e., rock wins against scissors.
Scissors cuts paper, i.e., scissors beats paper.
Paper covers rock, i.e., paper beats rock.
If the players chose the same move, the game is a tie.

NOUNS: player, rule, move (with states: R, P, or S)
VERBS: choose compare

Associated words:
player => choose
move
rule
??? => compare

NEXT STEP:
Come up with some rules based on the history of moves to
help the computer make its moves. For instance, if the
human tends to win over 60% of his hands when the computer
chooses "rock," then decrease the likelihood that the
computer will choose "rock." First, come up with an
appropriate rule, then implement some history analysis.
Use the analysis to adjust the weight of each choice --
for instance, increase the weight to increase the likelihood
of choosing a particular move. Currently, the computer has
a 33% chance of making any given mode -- it's those odds
that you need to weight. Finally, have the computer consider
the weight of each choice when choosing a move.

likelihood of each index currently is 33%
33 33 33
ideally we want likelihood of the most winning move to be twice as likely
or non-losing?

33R, 33P, 33S
rock paper scissors
1 game: human plays rock, computer plays scissors
scissors seems to be the loser in this scenario. reduce likelihood of scissors
non-loss rock: 100%
non-loss paper: 100%
non-loss scissors: 0%

50 R, 50 P, 0 S (%NL/(100 + 100 + 0))
2 games: H rock, C scissors => H rock, C rock
scissors still has resulted in fewest wins, continue going this way
non-loss rock: 100%
non-loss paper: 100%
non-loss scissors: 50%

40 R, 40 P, 20 S (%NL/(100 + 100 + 50))
3 games: H rock, C scissors => H rock, C rock => H paper, C rock
rock now has equally high lose rate to scissors.
rebalance so that paper is highest, then scissors and rock equal
non-loss rock: 66.67%
non-loss paper: 100%
non-loss scissors: 66.67%

2.7 R, 3/7 P, 2/7 S (%NL/(66.67 + 100 + 66.67))

how to get the random number to choose the right one?

random = math.random
from 0 -> percentRock / sumOfPercents, choose rock
from rock -> rock + percentPaper / sumOfPercents, choose paper
from paper -> paper + percentScissors / sumOfPercents, choose scissors

A FUNCTION TO REDISTRIBUTE WEIGHTS:
getWeights(percentArray) {
  return percentArray.map((percent, _, percentArray) => {
    return percent / percentArray.reduce()
  })
}

// function createComputer() {
//   let playerObject = createPlayer();

//   let computerObject = {
//     choose() {
//       let randomIdx = Math.floor(Math.random() * VALID_CHOICES.length);
//       this.move = VALID_CHOICES[randomIdx];
//     }
//   };

//   return Object.assign(playerObject, computerObject);
// }


//const RPS_CHOICES = ['rock', 'paper', 'scissors'];
// const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
// const ABBREVIATIONS = {
    r: 'rock',
    p: 'paper',
    s: 'scissors',
    l: 'lizard',
    sp: 'spock'
  };
//const GAMES_TO_WIN = 5;
// const LOSING_ACTIONS = {
//   rock: {
//     scissors: 'crushes',
//     lizard: 'crushes',
//   },
//   paper: {
//     rock: 'covers',
//     spock: 'disproves'
//   },
//   scissors: {
//     paper: 'cut',
//     lizard: 'decapitate'
//   },
//   spock: {
//     scissors: 'smashes',
//     rock: 'vaporizes'
//   },
//   lizard: {
//     spock: 'poisons',
//     paper: 'eats'
//   },
// };

** notes for tomorrow:
-make a better algorithm--only pay attention to losses and wins, ignoring ties?
-make a rules object for information on choices?
-make a toggle for spock verison or no spock version
-how do I make my algorithm take up fewer lines in computer function...
*/
