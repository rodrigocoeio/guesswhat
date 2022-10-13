<template>
    <button class="btn btn-success" @click="openNext">
        Open Next
    </button>
    <button class="btn btn-danger" @click="quitGame">
        Quit Game
    </button>

    <br>

    <div class="Card" ref="card">
        <div class="CardSquare" v-for="number in squares" :number="number">

        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {
    data() {
        return {
            cardImage: false,
            cardWidht: 0,
            cardHeight: 0,
            cardsOpened: {}
        };
    },

    mounted() {
        this.cardImage = new Image();
        this.cardImage.src = this.image;
        this.cardImage.onload = this.loadCardImage;
    },

    computed: {
        image() {
            return store.game.card.image;
        },

        cols() {
            const difficulties = store.difficulties;
            const difficulty = store.game.difficulty;

            return difficulties[difficulty].grid.cols;
        },

        rows() {
            const difficulties = store.difficulties;
            const difficulty = store.game.difficulty;

            return difficulties[difficulty].grid.rows;
        },

        squares() {
            return this.cols * this.rows;
        }
    },

    methods: {
        loadCardImage() {
            const $card = $(this.$refs.card);
            $card.css('background-image', 'url(' + this.image + ')');
            this.cardWidth = this.cardImage.naturalWidth;
            this.cardHeight = this.cardImage.naturalHeight;
            $card.css('width', this.cardWidth + 'px');
            $card.css('height', this.cardHeight + 'px');

            this.loadCardSquares();
        },
        loadCardSquares() {
            const width = this.cardWidth / this.rows;
            const height = this.cardHeight / this.cols;
            $('.CardSquare').css('width', width + 'px');
            $('.CardSquare').css('height', height + 'px');

            for (let i = 1; i <= this.squares; i++) {
                this.squaresLeft[i] = true;
            }
        },

        openNext() {
            let cardNumber = false;

            while (!cardNumber) {
                let number = Math.floor(Math.random() * (this.squares + 1));
                if (!this.cardsOpened[number]) {
                    cardNumber = number;
                }
            }

            $('.CardSquare[number=' + cardNumber + ']').css('background-image', 'none');
            this.cardsOpened[cardNumber] = true;
        },
        quitGame() {
            console.log("Quit Game");
            //store.game.category = 0;
            store.game.started = false;
        }
    }
}
</script>

<style scoped>
.Card {
    margin: auto;
}

.CardSquare {
    background-image: url(/images/guesswhat.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
}
</style>