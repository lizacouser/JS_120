const READLINE = require('readline-sync');

class Card {
  static LOW_ACE_VALUE = 1;
  static HIGH_ACE_VALUE = 11;
  static FACECARD_VALUE = 10;

  constructor(name, value, suit) {
    this.name = name;
    this.value = value;
    this.title = `${this.name} of ${suit}`;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  getTitle() {
    return this.title;
  }

  convertToLowAce() {
    this.value = Card.LOW_ACE_VALUE;
  }

}

class Deck {
  static SUITS = ["Spades", "Hearts", "Diamonds", "Clubs"]
  static NUMBER_VALUES = {
    2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9, 10: 10,
    J: Card.FACECARD_VALUE,
    Q: Card.FACECARD_VALUE,
    K: Card.FACECARD_VALUE,
    A: Card.HIGH_ACE_VALUE
  }

  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    Deck.SUITS.forEach(suit => {
      Object.keys(Deck.NUMBER_VALUES).forEach(num => {
        let val = Deck.NUMBER_VALUES[num];
        this.cards.push(new Card(num, val, suit));
      });
    });

    this.shuffle();
  }

  dealCard() {
    return this.cards.pop();
  }

  shuffle() {
    let cards = this.cards;

    for (let index = cards.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
    }
  }
}

class Participant {
  static BUST_NUMBER = 21

  constructor(name) {
    this.name = name;
    this.clearHand();
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  clearHand() {
    this.hand = [];
  }

  getHandSum() {
    let sum = this.hand.reduce((sum, card) => {
      return card.getValue() + sum;
    }, 0);

    let highAce = this.getHighAce();

    if (highAce && (sum > Participant.BUST_NUMBER)) {
      highAce.convertToLowAce();
      sum = this.getHandSum();
    }

    return sum;
  }

  getHighAce() {
    return this.hand.find(card => {
      return card.getName() === "A" && card.getValue() === Card.HIGH_ACE_VALUE;
    });
  }

  isBusted() {
    return this.getHandSum() > Participant.BUST_NUMBER;
  }

  getLastCard() {
    return this.hand[this.hand.length - 1].getName();
  }

  logMove(move) {
    console.log(`${this.name} ${move}!`);
  }

  displayFullHand() {
    console.log(`${this.name}:`);
    this.hand.forEach(card => {
      console.log(card.getTitle());
    });
    console.log("");
  }


}

class Player extends Participant {
  static BROKE_THRESHOLD = 0;
  static RICH_THRESHOLD = 10;
  static STARTING_DOLLARS = 5;
  static BET_SIZE = 1;

  constructor() {
    super("You");
    this.winnings = Player.STARTING_DOLLARS;
  }

  getWinnings() {
    return this.winnings;
  }

  deductFromWinnings() {
    this.winnings -= Player.BET_SIZE;
  }

  addToWinnings() {
    this.winnings += Player.BET_SIZE;
  }

  isBroke() {
    return this.winnings <= Player.BROKE_THRESHOLD;
  }

  isRich() {
    return this.winnings >= Player.RICH_THRESHOLD;
  }

  logWinnings() {
    console.log(`You have $${this.winnings}.`);
    console.log("");
  }

}

class Dealer extends Participant {
  static HIT_THRESHOLD = 17;

  constructor() {
    super("Dealer");
  }

  displayHiddenHand() {
    console.log("Dealer:");
    let visibleCard = this.hand[0];
    console.log(visibleCard.getTitle());
    console.log("and unknown card");
    console.log("");
  }
}

class TwentyOneGame {
  static INITIAL_CARDS_DEALT = 2;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.participants = [this.player, this.dealer];
  }

  play() {
    this.displayWelcomeMessage();
    this.player.logWinnings();

    while (true) {
      this.playOneGame();
      this.claimWinnings();
      this.player.logWinnings();

      if (this.player.isBroke() || this.player.isRich()) break;

      if (!this.playAgain()) break;
      console.clear();
    }

    if (this.player.isBroke()) {
      console.log("You're broke!");
    } else if (this.player.isRich()) {
      console.log("You're rich!");
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.deck.reset();
    this.dealStartingHands();
    this.playerMove();

    if (!this.player.isBusted()) {
      this.dealerMove();
    }

    console.clear();
    this.displayFullHands();
    this.displayResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Twenty One!\n");
  }

  dealStartingHands() {
    this.participants.forEach(participant => {
      participant.clearHand();
      participant.addCardToHand(this.deck.dealCard());
      participant.addCardToHand(this.deck.dealCard());
    });
  }

  displayStartingHands() {
    this.player.displayFullHand();
    this.dealer.displayHiddenHand();

    console.log(`Your total is ${this.player.getHandSum()}`);
  }

  displayFullHands() {
    this.participants.forEach(participant => participant.displayFullHand());

    console.log(`Your total is ${this.player.getHandSum()}`);
    console.log(`Dealer total is ${this.dealer.getHandSum()}`);
  }

  playerMove() {
    let hitOrStay;

    while (true) {
      this.displayStartingHands();
      hitOrStay = this.getPlayerChoice();

      if (hitOrStay === "h") {
        this.hit(this.player);

        console.clear();
        this.player.logMove("hit");

      } else {
        break;
      }

      if (this.player.isBusted()) break;
    }
  }

  dealerMove() {
    while (true) {

      if (this.dealerUnderThreshold()) {
        this.hit(this.dealer);

        console.clear();
        this.dealer.logMove("hits");
        this.displayFullHands();

      } else {
        this.dealer.logMove("stays");
        this.userReadyFor("results");
        break;
      }

      if (this.dealer.isBusted()) break;
      this.userReadyFor("the next move");
    }
  }

  userReadyFor(nextStep) {
    let seeNextStep = READLINE.question(`Press enter to see ${nextStep}:`);

    return seeNextStep;
  }

  getPlayerChoice() {
    let choice;
    while (true) {
      choice = READLINE.question("Would you like to hit or stay? (h/s)");

      if (["h", "s"].includes(choice.toLowerCase())) break;

      console.log("Not a valid response. Try again.");
    }

    return choice.toLowerCase();
  }

  getWinner() {
    if ((!this.player.isBusted() &&
       this.player.getHandSum() > this.dealer.getHandSum()) ||
       this.dealer.isBusted()) {

      return this.player;

    } else if (this.player.isBusted() ||
              this.player.getHandSum() < this.dealer.getHandSum()) {

      return this.dealer;

    } else {

      return null;
    }
  }

  hit(participant) {
    participant.addCardToHand(this.deck.dealCard());
  }

  dealerUnderThreshold() {
    return this.dealer.getHandSum() < Dealer.HIT_THRESHOLD;
  }

  claimWinnings() {
    let winner = this.getWinner();
    if (this.player === winner) {
      this.player.addToWinnings();
    } else if (this.dealer === winner) {
      this.player.deductFromWinnings();
    }
  }

  displayResults() {
    let playerTotal = this.player.getHandSum();
    let dealerTotal = this.dealer.getHandSum();

    if (this.player.isBusted()) {
      console.log("You busted! DEALER WINS :(");
    } else if (this.dealer.isBusted()) {
      console.log("Dealer busted! YOU WIN :)");
    } else if (playerTotal === dealerTotal) {
      console.log("It's an exact tie! Wow!");
    } else {
      console.log(dealerTotal < playerTotal ? "You win!" : "Dealer Wins!");
    }
    console.log("");
  }


  playAgain() {
    let choice;

    while (true) {
      choice = READLINE.question("Would you like to play again? (y/n)");

      if (["y", "n"].includes(choice.toLowerCase())) break;

      console.log("Not a valid response. Try again.");
    }

    return choice.toLowerCase() === "y";
  }

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing! Goodbye.");
    console.log("");
  }
}

let game = new TwentyOneGame();

game.play();

/*
P:
rules
-52 card deck (heart, diamond, club, spades, 2,3,4,5,6,7,8,9,10,j,q,k,a)
-get as close to 21 as possible without busting
-dealer + player each have 2 cards.
-player can see both of their own cards,
but player can only see one of dealer's cards
-JQK are all worth 10 points
-ace is worth 11 if the sum doesn't exceed 21
-ace is worth 1 if the sum would exceed 21

-player turn
  -play goes first and decides to hit or stay
  -hit means another card is dealt
  -stay means no
  -player can hit as many times as they want
  -if they bust, the game ends

-dealer turn
  -dealer has to hit until the total is 17 or higher

-if both the dealer and player stay, you sum the cards
to see who has the most points

"Dealer has: Ace and unknown card"
"You have: 2 and 8"

*/

/*
Write it in words

A dealer and a player have a 52 card deck.
Both players are dealt two cards.
First, the player decides to hit or stay.
If they player hits, they are dealt a new card.
If the sum of the cards is greater than 21 they bust,
and the game ends.
Player can hit as many times as they want until they
bust or they decide to stay.
Then the dealer can hit or stay depending on if the sum
of their cards is greater than or equal to 17.
If the dealer doesn't bust, then both players
compare the sum of their cards, and the person with
the higher sum wins.

Nouns:
-Dealer
-Player
-Card
-Deck
-Hand

Verbs
-hit
-stay
-deal
-sum
-bust
-compare
-win

*/
