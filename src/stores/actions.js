export default {
  startGame() {
    console.log("Game Started");

    if (!this.currentCategory) {
      $("#categoryField").trigger("focus");
      return false;
    }

    this.game.started = true;
    this.game.cover = this.currentCategory.cover;
    this.game.guessed = false;
    this.game.givedUp = false;
    this.game.deck_index = 0;
    this.game.deck = this.getNewDeck();
    this.game.squares = this.getCardSquares();
  },

  getNewDeck() {
    const cards = [];

    for (let i = 0; i < this.cardsNumber; i++) {
      cards.push(i);
    }

    return this.game.cardSorting==="shuffle" ? shuffleArray(cards) : sortByKey(cards, "name");
  },

  getCardSquares() {
    const squares = [];
    for (let i = 0; i < this.squaresNumber; i++) {
      squares.push(i + 1);
    }

    return shuffleArray(squares);
  },

  nextCard() {    
    if(this.game.cover)
      return this.game.cover = false;

    if (this.game.deck_index < this.game.deck.length - 1)
      this.game.deck_index++;

    this.game.guessed = false;
    this.game.givedUp = false;
    this.game.squares = this.getCardSquares();
  },

  previousCard() {
    if (this.game.deck_index > 0) this.game.deck_index--;

    this.game.guessed = false;
    this.game.givedUp = false;
    this.game.squares = this.getCardSquares();
  },

  openSquare(number) {
    $(".CardSquare[number=" + number + "]").css("background-image", "none");

    this.game.squares = this.game.squares.filter(
      (squareNumber) => squareNumber != number
    );

    $("#guessWhat").trigger("blur");
  },

  openRandomSquare() {
    const cardNumber = this.game.squares.pop();

    if (cardNumber) this.openSquare(cardNumber);
    else this.giveUp();
  },

  openAllSquares() {
    $(".CardSquare").css("background-image", "none");
    this.game.squares = [];
  },

  playCardAudio(card) {
    this.stopAudio();

    card = card ? card : this.card;

    if (!card) return false;

    if (card.audio) {
      const cardAudioFile = "/cards/" + card.category + "/" + card.audio;
      this.game.audio = new Audio(cardAudioFile);
      this.game.audio.play();
    }
  },

  stopAudio() {
    if (this.game.audio) {
      this.game.audio.pause();
    }
  },

  giveUp() {
    this.openAllSquares();
    this.playCardAudio();
    this.game.givedUp = true;
  },

  guessWhat(guessTry) {
    $("#guessWhat").trigger("blur");

    if (guessTry == "") return false;

    console.log("Guess What: " + guessTry);

    if (this.card.name.toLowerCase() == guessTry.toLowerCase()) {
      const store = this;
      this.openAllSquares();
      this.game.guessed = true;
      const card = this.card;
      const audio = playAudio("right", "mpeg");
      audio.onended = function () {
        store.playCardAudio(card);
      };
    } else {
      playAudio("wrong", "mpeg");
    }
  },

  quitGame() {
    console.log("Quit Game");
    this.game.started = false;
  },
};
