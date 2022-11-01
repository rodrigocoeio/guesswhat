<template>
    <div class="CardBox">
        <div id="card" class="Card" ref="card">
            <div v-if="guessed || givedUp" class="alert alert-success" role="alert">
                <div v-if="guessed">
                    <img src="images/congrats.png" class="CongratsImage">
                    <br>
                    Congrats! You've nailed it!
                </div>
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

            <img :src="image" class="CardImage" @load="loadCardSquares" />
        </div>
        <div class="SquaresBox" ref="squaresBox" v-show="!guessed && !givedUp">
            <div class="CardSquare" v-for="number in squaresNumber" :number="number" @click="openSquare(number)"></div>
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {
    data() {
        return {

        };
    },

    computed: {
        deck() {
            return store.game.deck;
        },

        deck_index() {
            return store.game.deck_index;
        },

        card() {
            return store.card;
        },

        guessed() {
            return store.game.guessed;
        },

        givedUp() {
            return store.game.givedUp;
        },

        category() {
            return store.currentCategory;
        },

        image() {
            const path = "/cards/" + this.card.category + "/";

            return this.card ? path + this.card.image : false;
        },

        squares() {
            return store.game.squares;
        },

        squaresNumber() {
            return store.squaresNumber;
        }
    },

    methods: {
        loadCardSquares() {
            const $card = $(this.$refs.card);
            const $squaresBox = $(this.$refs.squaresBox);

            $squaresBox.width($card.width());
            $squaresBox.height($card.height());

            const squareWidth = $card.width() / store.rows;
            const squareHeight = $card.height() / store.cols;
            $('.CardSquare').css('width', squareWidth + 'px');
            $('.CardSquare').css('height', squareHeight + 'px');
            $('.CardSquare').css('background-image', 'url(/images/square.png)');
        },

        openSquare(number) {
            return store.openSquare(number);
        },

        playCardAudio() {
            return store.playCardAudio();
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