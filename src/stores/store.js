import categories from "$/categories.js";

const state = {
    game: {
        started: false,
        difficulty: "easy",
        category: 0,
        card: false
    },
    difficulties: {
      easy: {
        grid: {cols: 6, rows: 6}
      },
      normal: {
        grid: {cols: 12, rows: 12}
      },
      hard: {
        grid: {cols: 24, rows: 24}
      }
    },
    categories
};

const getters = {

};

const setters = {

};

import { defineStore } from "pinia";

const getStore = defineStore({
  id: "game",
  state: () => (state),
  getters: getters,
  actions: setters,
});

export default getStore();