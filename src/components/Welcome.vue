<template>
  <main>

    <img src="images/guesswhat.jpg">

    <br><br>

    <select id="categoryField" class="form form-select" v-model="game.category">
      <option value="0">Choose a Category</option>
      <option value="all">All Cards</option>
      <option v-for="category,index in categories" :value="index">{{ category.name }}</option>
    </select>

    <select class="form form-select" v-model="game.difficulty">
      <option value="easy">Easy Mode</option>
      <option value="normal">Normal Mode</option>
      <option value="hard">Hard Mode</option>
    </select>

    <button class="btn btn-primary" @click="startGame">Start Game</button>

  </main>
</template>
  
<script>
import store from "$/store.js";

export default {
  data() {
    return store
  },

  methods: {
    startGame() {
      return store.startGame();
    }
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