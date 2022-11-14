<template>
    <div class="CardBox">
        <div id="card" class="Card" ref="card">
            <div class="alert alert-success" role="alert">
                <h1> {{ card.name }}
                    <button class="btn btn-primary" @click="playCardAudio" v-if="card.audio">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-soundwave" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                </h1>
            </div>

            <img :src="image" class="CardImage">
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {
    computed: {
        card() {
            return store.game.cover;
        },

        playingAudio() {
            return store.game.audio;
        },

        image() {
            const path = "/cards/" + this.card.category + "/";

            return this.card ? path + this.card.image : false;
        }
    },

    mounted() {
        this.playCardAudio();
    },

    methods: {
        playCardAudio() {
            return store.playCardAudio(this.card);
        }
    }
}
</script>

<style scoped>
.CardBox {
    position: relative;
    margin: auto;
    max-height: calc(100% - 70px);
    width: fit-content;
    height: 100%;
}

.Card {
    margin: auto;
    display: grid;
    width: fit-content;
    height: 100%;
    background-color: white;
}

.CardImage {
    object-fit: contain;
    height: 100%;
    margin: auto;
    overflow: hidden;
}

.SquaresBox {
    position: absolute;
    top: 0px;
}

.CardSquare {
    background-image: url(/images/square.png);
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
}

.CongratsImage {
    height: 36px;
    margin: auto;
}
</style>