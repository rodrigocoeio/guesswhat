<template>
    <div class="Game">
        <controls></controls>
        <cover v-if="cover"></cover>
        <card v-if="!cover"></card>
    </div>
</template>

<script>
import Controls from "./Controls.vue";
import Cover from "./Cover.vue";
import Card from "./Card.vue";
import store from "$/store.js";
import '../keyListener.js';

export default {
    computed: {
        cover() {
            return store.game.cover;
        }
    },

    components: {
        Controls,
        Cover,
        Card
    }
}
</script>

<style scoped>
    .Game {
        display: block;
        height: 100%;
        background-color: black;
    }
</style>