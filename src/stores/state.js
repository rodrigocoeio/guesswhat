import categories from "$/categories.js";

export default {
  game: {
    started: false,
    difficulty: "easy",
    category: "testing",
    card: false,
    squaresOpened: {}
  },

  difficulties: {
    easy: {
      grid: { cols: 6, rows: 6 },
    },
    normal: {
      grid: { cols: 12, rows: 12 },
    },
    hard: {
      grid: { cols: 24, rows: 24 },
    },
  },

  categories,
};
