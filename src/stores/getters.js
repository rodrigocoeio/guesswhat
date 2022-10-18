export default {
  currentCategory() {
    const categoryName = this.game.category;

    return this.categories[categoryName]
      ? this.categories[categoryName]
      : false;
  },

  card() {
    const deck_index = this.game.deck_index;
    const card_index = this.game.deck[deck_index];

    return this.currentCategory && this.currentCategory.cards[card_index]
      ? this.currentCategory.cards[card_index]
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
};
