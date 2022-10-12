<template>

  <welcome v-if="!game.started"></welcome>
  <game v-if="game.started"></game>
  
</template>

<script>
  import store from "$/store.js";
  import Welcome from "#/Welcome.vue";
  import Game from "#/Game.vue";

  export default {
    data() {
      return store
    },

    components: {
      Welcome,
      Game
    }
  }
</script>