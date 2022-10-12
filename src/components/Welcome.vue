<template>
    <main>
      <img src="images/guesswhat.jpg">
      <br><br>
      <select class="form form-select" v-model="game.category" placeholder="Choose a Category">
        <option value="0">Choose a Category</option>
        <option v-for="category in categories">{{ category.name }}</option>
      </select>
      <button class="btn btn-primary" @click="startGame">Start Game</button>
    </main>
  </template>
  
  <script>
  import store from '$/store.js';
  
  export default {
    data() {
      return store
    },

    methods: {
        startGame() {
            console.log("Game Started");
            store.game.started = true;
        }
    }
  }
  </script>
  
  <style scoped>
  select {
    max-width: 200px;
    margin: auto;
    margin-bottom: 15px;
  }
  </style>