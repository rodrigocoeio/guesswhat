export default {
  startGame() {
    if (
      !this.currentCategory ||
      !this.currentCategory.cards ||
      this.currentCategory.cards.length === 0
    ) {
      this.game.pleaseSelectCategory = true;
      return false;
    }

    console.log("Game Started");

    this.game.started = true;
    this.game.cover = this.currentCategory.cover;
    this.game.guessed = false;
    this.game.givedUp = false;
    this.game.cardIndex = 0;
    this.game.squares = this.getCardSquares();
    this.game.category.cards = this.shuffleCards(this.game.category.cards);
  },

  quitGame() {
    console.log("Quit Game");
    this.game.started = false;
  },

  async loadCategories() {
    try {
      const categoriesJson = await fetch("/cards/categories.json");
      this.categories = await categoriesJson.json();
    } catch (e) {
      //console.error('Failed loading categories.json!');
    }
  },

  getCardSquares() {
    const squares = [];

    for (let i = 0; i < this.squaresNumber; i++) {
      squares.push(i + 1);
    }

    return shuffleArray(squares);
  },

  selectCategory(category) {
    if (category && category.cards) {
      category.cards = this.shuffleCards(category.cards);
      this.game.pleaseSelectCategory = false;
      this.game.category = category;
    }
  },

  shuffleCards(cards) {
    switch (this.game.cardSorting) {
      case "alpha":
        cards = sortByKey(cards, "name", "asc");
        break;

      case "shuffle":
        cards = shuffleArray(cards);
        break;
    }

    return cards;
  },

  nextCard() {
    if (this.game.audio) return false;

    if (this.game.cover) return (this.game.cover = false);

    if (this.game.cardIndex + 1 < this.cardsNumber) {
      console.log("Next Card");

      this.game.cardIndex++;
      this.game.guessed = false;
      this.game.givedUp = false;
      this.game.squares = this.getCardSquares();
    }
  },

  previousCard() {
    if (this.game.audio) return false;

    if (this.game.cardIndex > 0) {
      console.log("Previous Card");

      this.game.cardIndex--;
      this.game.guessed = false;
      this.game.givedUp = false;
      this.game.squares = this.getCardSquares();
    }
  },

  openSquare(number) {
    console.log("Open Square " + number);
    $(".CardSquare[number=" + number + "]").css("background-image", "none");

    this.game.squares = this.game.squares.filter(
      (squareNumber) => squareNumber != number
    );

    $("#guessWhat").trigger("blur");
  },

  openRandomSquare() {
    if (this.game.givedUp || this.game.guessed) return false;

    console.log("Open Random Square");
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

    console.log("playing card " + card.name);

    const store = this;

    if (card.audio) {
      const cardAudioFile = "/cards/" + card.parent + "/" + card.audio;
      this.game.audio = new Audio(cardAudioFile);
      this.game.audio.onended = function () {
        store.game.audio = false;
      };
      this.game.audio.play();
    }
  },

  stopAudio() {
    if (this.game.audio) {
      this.game.audio.pause();
      this.game.audio.onended = false;
      this.game.audio = false;
    }
  },

  giveUp() {
    console.log("Give Up");
    this.openAllSquares();
    this.playCardAudio();
    this.game.givedUp = true;
  },

  guessWhat(guessTry) {
    $("#guessWhat").trigger("blur");

    if (guessTry == "" || this.game.givedUp || this.game.guessed) return false;

    console.log("Guess What: " + guessTry);

    if (this.card.name.toLowerCase() == guessTry.toLowerCase()) {
      const store = this;
      this.openAllSquares();
      this.game.guessed = true;
      const card = this.card;

      this.stopAudio();
      this.game.audio = playAudio("right", "mpeg");
      this.game.audio.onended = function () {
        store.playCardAudio(card);
      };
    } else {
      playAudio("wrong", "mpeg");
    }
  },
};
