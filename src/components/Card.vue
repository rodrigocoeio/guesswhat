<template>
    <div class="CardBox">
        <div id="card" class="Card" ref="card">
            <div v-if="guessed || givedUp" class="alert alert-success" role="alert">
                <div v-if="guessed">
                    <img src="images/congrats.png" class="CongratsImage">
                    <br>
                    Congrats! You've nailed it!
                </div>
                <h1> {{ card.name }} </h1>
            </div>

            <img :src="image" class="CardImage" @load="loadCardSquares" />
        </div>
        <div class="SquaresBox" ref="squaresBox" v-show="!guessed">
            <div class="CardSquare" v-for="number in squaresNumber" :number="number" @click="openSquare(number)">
            </div>
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
            const path = "/cards/" + this.category.name + "/";

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