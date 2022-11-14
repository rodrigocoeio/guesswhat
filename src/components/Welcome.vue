<template>
  <main>

    <img src="images/guesswhat.jpg">

    <br><br>

    <select class="form form-select" v-model="game.cardSorting">
      <option value="alpha">Alphabetical Sorting</option>
      <option value="shuffle">Shuffle Cards</option>
    </select>

    <select class="form form-select" v-model="game.difficulty">
      <option value="easy">Easy Mode</option>
      <option value="normal">Normal Mode</option>
      <option value="hard">Hard Mode</option>
    </select>

    <category-select :categories="categories"></category-select>

    <button class="btn btn-primary" @click="startGame">Start Game</button>

  </main>
</template>
  
<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
  data() {
    return store
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
  padding: 15px;
}

select {
  max-width: 200px;
  margin: auto;
  margin-bottom: 15px;
}
</style>