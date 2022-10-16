<template>
    <controls></controls>
    <card></card>
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