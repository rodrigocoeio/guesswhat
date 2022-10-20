export default {
  startGame() {
    console.log("Game Started");

    if (!this.currentCategory) {
      alert("Choose a category first!");
      return false;
    }

    this.game.started = true;
    this.game.guessed = false;
    this.game.deck_index = 0;
    this.game.deck = this.getNewDeck();
    this.game.squares = this.getCardSquares();
  },

  getNewDeck() {
    const cards = [];

    for (let i = 0; i < this.cardsNumber; i++) {
      cards.push(i);
    }

    return shuffleArray(cards);
  },

  getCardSquares() {
    const squares = [];
    for (let i = 0; i < this.squaresNumber; i++) {
      squares.push(i + 1);
    }

    return shuffleArray(squares);
  },

  nextCard() {
    if (this.game.deck_index < this.game.deck.length - 1)
      this.game.deck_index++;

    this.game.guessed = false;
    this.game.squares = this.getCardSquares();
  },

  previousCard() {
    if (this.game.deck_index > 0) this.game.deck_index--;

    this.game.guessed = false;
    this.game.squares = this.getCardSquares();
  },

  openSquare(number) {
    $(".CardSquare[number=" + number + "]").css("background-image", "none");

    this.game.squares = this.game.squares.filter(
      (squareNumber) => squareNumber != number
    );

    $("#guessWhat").focus();
  },

  openRandomSquare() {
    const cardNumber = this.game.squares.pop();

    if (cardNumber) this.openSquare(cardNumber);
  },

  openAllSquares() {
    $(".CardSquare").css("background-image", "none");
    this.game.squares = [];
  },

  giveUp() {
    this.openAllSquares();
    this.game.guessed = true;
  },

  guessWhat(guessTry) {
    if (guessTry == "") return false;

    console.log("Guess What: " + guessTry);

    if (this.card.name.toLowerCase() == guessTry.toLowerCase()) {
      this.openAllSquares();
      this.game.guessed = true;
    } else {
      alert("Sorry! You have missed it!");
    }
  },

  quitGame() {
    console.log("Quit Game");
    this.game.started = false;
  },
};
