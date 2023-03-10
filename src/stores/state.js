export default {
  game: {
    started: false,
    difficulty: "normal",
    category: false,
    cards: [],
    cardSorting: "alpha",
    audio: false,
    squares: [],
    cardIndex: 0,
    guessed: false,
    givedUp: false,
    pleaseSelectCategory: false
  },

  difficulties: {
    easy: {
      grid: { cols: 6, rows: 6 },
    },
    normal: {
      grid: { cols: 9, rows: 9 },
    },
    hard: {
      grid: { cols: 12, rows: 12 },
    },
  },

  categories: []
};
