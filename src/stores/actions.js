export default {
  startGame() {
    console.log("Game Started");

    this.game.started = true;
    this.game.guessed = false;
    this.game.card = this.getNewCard();
    this.game.squares = shuffleArray(this.getCardSquares());
  },

  getCardSquares() {
    const squares = [];
    for (let i = 0; i < this.squaresNumber; i++) {
      squares.push( (i+1) );
    }

    return squares;
  },

  skipCard() {
    console.log("Skip Card");

    this.startGame();
  },
  getNewCard() {
    const category = this.currentCategory;

    if (!category) {
      alert("Choose a category first!");
      return false;
    }

    const card = Math.floor(Math.random() * category.cards.length);
    return category.cards[card];
  },
  openSquare(number) {
    $(".CardSquare[number=" + number + "]").css("background-image", "none");

    this.game.squares = this.game.squares.filter(
      (squareNumber) => squareNumber != number
    );
  },
  openRandomSquare() {
    const cardNumber = this.game.squares.pop();

    if (cardNumber) this.openSquare(cardNumber);
  },
  openAllSquares() {
    $(".CardSquare").css("background-image", "none");
    this.game.squares = [];
  },
  guessWhat(guessTry) {
    if (guessTry == "") return false;

    console.log("Guess What: " + guessTry);

    if (this.card.name.toLowerCase() == guessTry.toLowerCase()) {
      this.openAllSquares();
      this.game.guessed = true;
      alert("Congratulations! You've got it!");
    } else {
      alert("Sorry! You have missed it!");
    }
  },
  quitGame() {
    console.log("Quit Game");
    this.game.started = false;
  },
};
