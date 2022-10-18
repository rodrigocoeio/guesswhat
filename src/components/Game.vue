<template>
    <div class="Game">
        <controls></controls>
        <card></card>
    </div>
</template>

<script>
import Controls from "./Controls.vue";
import Card from "./Card.vue";
import '../keyListener.js';

export default {
    components: {
        Controls,
        Card
    }
}
</script>

<style scoped>
    .Game {
        background-color: black;
    }
</style>