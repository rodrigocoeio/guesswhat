<template>
    <div class="CardBox">
        <div class="Card" ref="card">
            <img :src="image" @load="loadCardSquares"/>
        </div>
        <div class="SquaresBox" ref="squaresBox">
            <div class="CardSquare" v-for="number in squares" :number="number" @click="openSquare(number)"></div>
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
        card() {
            return store.card;
        },

        image() {
            return this.card.image;
        },

        squares() {
            return store.squares;
        }
    },

    methods: {
        loadCardSquares() {
            const $card = $(this.$refs.card);
            const $squaresBox = $(this.$refs.squaresBox);

            $squaresBox.width( $card.width() );
            $squaresBox.height( $card.height() );

            const squareWidth = $card.width() / store.rows;
            const squareHeight = $card.height() / store.cols;
            $('.CardSquare').css('width', squareWidth + 'px');
            $('.CardSquare').css('height', squareHeight + 'px');
            $('.CardSquare').css('background-image', 'url(/images/guesswhat.jpg)');
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
}

.Card img {
    object-fit: contain;
    height: 100%;
    margin: auto;
    overflow: hidden;
}

.SquaresBox {
    position:absolute;
    top: 0px;
}

.CardSquare {
    background-image: url(/images/guesswhat.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
}
</style>