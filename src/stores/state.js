import categories from "$/categories.js";

export default {
  game: {
    started: false,
    difficulty: "normal",
    category: "all",
    cardSorting: "shuffle",
    audio: false,
    deck: [],
    squares: [],
    deck_index: 0,
    guessed: false,
    givedUp: false
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

  categories,
};
