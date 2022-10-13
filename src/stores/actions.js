export default {
  startGame() {
    console.log("Game Started");
    this.game.started = true;
    this.game.card = this.getNewCard();
  },
  skipCard() {
    console.log("Skip Card");
    return (this.game.card = this.getNewCard());
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
    this.game.squaresOpened[number] = true;
  },
  openRandomSquare() {
    let cardNumber = false;
    let maxTries = 1000;
    let tries = 0;

    while (!cardNumber && tries < maxTries) {
      let number = Math.floor(Math.random() * (this.squares + 1));
      if (!this.game.squaresOpened[number]) {
        cardNumber = number;
        break;
      }
      tries++;
    }

    if(cardNumber)
      this.openSquare(cardNumber);
  },
  openAllSquares() {
    $(".CardSquare").css("background-image", "none");
  },
  guessWhat(guessTry) {
    if (guessTry == "") return false;

    console.log("Guess What: " + guessTry);

    if (this.card.name.toLowerCase() == guessTry.toLowerCase()) {
      this.openAllSquares();
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
