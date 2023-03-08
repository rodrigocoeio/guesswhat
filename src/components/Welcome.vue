<template>
  <main>
    <div class="WelcomeWrapper">
      <img src="/images/guesswhat.jpg" class="Logo" width="400">
      <h1>Guess What?</h1>

      <div>
        <select class="CardSortingSelect" v-model="cardSorting">
          <option value="alpha">Alphabetical Sorting</option>
          <option value="shuffle">Shuffle Cards</option>
        </select>

        <select class="DifficultySelect" v-model="difficulty">
          <option value="easy">Easy Mode</option>
          <option value="normal">Normal Mode</option>
          <option value="hard">Hard Mode</option>
        </select>
      </div>

      <category-select :categories="categories"></category-select>

      <button class="StartGame" @click="startGame">Start Game</button>
    </div>
  </main>
</template>
  
<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
  async beforeMount() {
    await store.loadCategories();
  },

  data() {
    return {
      difficulty: store.game.difficulty,
      cardSorting: store.game.cardSorting
    }
  },

  computed: {
    categories() {
      return store.categories;
    }
  },

  watch: {
    difficulty(value) {
      store.game.difficulty = value;
    },
    cardSorting(value) {
      store.game.cardSorting = value;
    }
  },

  methods: {
    startGame() {
      return store.startGame();
    }
  },

  components: {
    CategorySelect
  }
}
</script>
  
<style scoped>
main {
  height: 100%;
  padding: 15px;
  display: flex;
  place-content: center;
  justify-items: center;
  align-items: center;
}

.Logo {
  border: 2px solid black;
  border-radius: 30px;
  box-shadow: 3px 3px gray;
}

h1 {
  text-shadow: gray 3px 1px 1px;
  -webkit-text-stroke: 1px black;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: bold;
  font-family:Georgia, 'Times New Roman', Times, serif;
  color: white;
}

select {
  display: block;
  padding: 20px;
  border-radius: 15px;
  font-size: 24px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0 auto;
  margin-bottom: 15px;
  cursor: pointer;
  border: 3px solid black;
}

select:hover {
  background-color: chartreuse;
  text-shadow: white 3px 0 10px;
  box-shadow: 3px 3px gray;
}

.CardSortingSelect {
  float:left;
  max-width: 200px;
  margin-right: 15px;
}

.DifficultySelect {
  float:right;
  max-width: 200px;
}

.StartGame {
  display: block;
  padding: 20px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 24px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
}

.StartGame:hover {
  background-color: chartreuse;
  text-shadow: gray 3px 0 10px;
  box-shadow: 3px 3px gray;
}

.PleaseSelect {
  border: 3px solid red !important;
  box-sizing: border-box;
}
</style>