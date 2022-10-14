import categories from "$/categories.js";

export default {
  game: {
    started: false,
    difficulty: "easy",
    category: "testing",
    card: false,
    guessed: false
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
