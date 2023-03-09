<template>
    <div class="CardBox">
        <div id="card" class="Card" ref="card" v-if="card" @click="playCardAudio">
            <div v-if="guessed || givedUp" class="CardNameBox">
                <div v-if="guessed">
                    <img src="/images/congrats.png" class="CongratsImage">
                    <br>
                    Congrats! You've nailed it!
                </div>
                <div class="CardName">
                    <h1> {{ card.name }}</h1>
                    <button class="PlayCardAudio" v-if="card.audio">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            className="bi bi-speaker-fill" viewBox="0 0 16 16">
                            <path d="M9 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-2.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
                            <path
                                d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <img :src="image" class="CardImage" @load="loadCardSquares" />
        </div>
        <div class="SquaresBox" ref="squaresBox" v-show="!guessed && !givedUp" v-if="card">
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
        card() {
            return store.card;
        },

        guessed() {
            return store.game.guessed;
        },

        givedUp() {
            return store.game.givedUp;
        },

        cover() {
            return store.game.cover;
        },

        category() {
            return store.currentCategory;
        },

        image() {
            const path = "/cards/" + this.card.parent + "/";

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
            if (this.guessed || this.givedUp)
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
    border-radius: 20px;
    border: 3px dashed white;
    box-sizing: border-box;
    overflow: hidden;
}

.Card {
    margin: auto;
    display: grid;
    width: fit-content;
    height: 100%;
    cursor: pointer;
}

.CardNameBox {
    padding: 15px;
    margin: 0px;
    margin-bottom: -20px;
    border-bottom: 3px dashed black;
    z-index: 10;
    box-shadow: 1px 3px gray;
    border-radius: 20px;
    overflow: hidden;
    background-color: white;
}

.CardName {
    display: flex;
    place-content: center;
}

.CardName h1 {
    float: left;
    color: black;
    text-shadow: gray 3px 2px 2px;
    -webkit-text-stroke: 1px black;
    font-size: 48px;
}

.PlayCardAudio {
    background: none;
    cursor: pointer;
    padding: 4px;
    border: none;
    border-radius: 50px;
    color: black;
    opacity: 0.1;
    float: left;
    margin-left: 15px;
    margin-top: 40px;
    height: 36px;
}

.PlayCardAudio:hover {
    background-color: greenyellow;
    box-shadow: 2px 2px black;
    opacity: 1;
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