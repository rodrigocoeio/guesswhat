export default {
  currentCategory() {
    return this.game.category;
  },

  cards() {
    return this.currentCategory ? this.currentCategory.cards : [];
  },

  card() {
    const cardIndex = this.game.cardIndex;

    return this.currentCategory && this.currentCategory.cards[cardIndex]
      ? this.currentCategory.cards[cardIndex]
      : false;
  },

  image() {
    return this.card.image;
  },

  cols() {
    const difficulties = this.difficulties;
    const difficulty = this.game.difficulty;

    return difficulties[difficulty].grid.cols;
  },

  rows() {
    const difficulties = this.difficulties;
    const difficulty = this.game.difficulty;

    return difficulties[difficulty].grid.rows;
  },

  cardsNumber() {
    return this.currentCategory ? this.currentCategory.cards.length : 0;
  },

  squaresNumber() {
    return this.cols * this.rows;
  },

  squaresLeft() {
    return this.game.squares.length;
  },
};
