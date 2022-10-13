export default {
  currentCategory() {
    const categoryName = this.game.category;

    return this.categories[categoryName]
      ? this.categories[categoryName]
      : false;
  },
  card() {
    return this.game.card;
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
  squares() {
    return this.cols * this.rows;
  },
};
