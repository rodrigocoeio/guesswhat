<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <button class="StartGame" @click="startGame" :disabled="playingAudio" v-if="cover">Start
                Game</button>

            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!cover">
                    <!-- Category Name -->
                    <li class="nav-item CategoryName">
                        <img src="/images/guesswhat.jpg" width="36" />
                        {{ categoryName }}
                    </li>

                    <!-- Guess What -->
                    <li class="nav-item">
                        <select id="guessWhat" class="GuessWhatSelect" @change="guessWhat" v-model="guessTry"
                            :disabled="guessed || givedUp">
                            <option selected value="0">Guess What?</option>

                            <option v-for="card in cardsOptions" :value="card.name">{{ card.name }}</option>
                        </select>
                    </li>

                    <!-- Give Up -->
                    <li class="nav-item">
                        <button id="giveUpButton" class="GiveUpButton" @click="giveUp" :disabled="guessed || givedUp">
                            Give Up
                        </button>
                    </li>
                </ul>


                <ul class="nav navbar-nav navbar-right" v-if="!cover">
                    <!-- Open Square -->
                    <li class="nav-item">
                        <button id="openSquareButton" class="OpenSquareButton" @click="openNext"
                            :disabled="squares.length == 0">
                            Open Square
                        </button>
                    </li>

                    <!-- Previous Card -->
                    <li class="nav-item">
                        <button id="previousCardButton" class="PreviousCardButton"
                            :disabled="cardIndex == 0 || playingAudio" @click="previousCard">
                            &laquo; Previous Card
                        </button>
                    </li>

                    <li class="nav-item">
                        &nbsp;&nbsp;
                        {{ cardIndex + 1 }} / {{ cardsNumber }}
                    </li>

                    <!-- Next Card -->
                    <li class="nav-item">
                        <button id="nextCardButton" class="NextCardButton"
                            :disabled="(cardIndex + 1) == cardsNumber || playingAudio" @click.stop.prevent="nextCard">
                            Next Card &raquo;
                        </button>
                    </li>

                    <!-- Quit Game -->
                    <li class="nav-item">
                        <button class="QuitGameButton" @click="quitGame">
                            Quit Game
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from "$/store";

export default {
    data() {
        return {
            guessTry: "0"
        }
    },

    computed: {
        playingAudio() {
            return store.game.audio;
        },

        categoryName() {
            return store.currentCategory ? store.currentCategory.name : "";
        },

        cards() {
            return store.cards;
        },

        cardsOptions() {
            return sortByKey([...this.cards], "name");
        },

        cover() {
            return store.game.cover;
        },

        guessed() {
            return store.game.guessed;
        },

        givedUp() {
            return store.game.givedUp;
        },

        cardIndex() {
            return store.game.cardIndex;
        },

        cardsNumber() {
            return store.cardsNumber;
        },

        squares() {
            return store.game.squares;
        }
    },

    methods: {
        openNext() {
            console.log("open next button");

            store.openRandomSquare();

            $("#openSquareButton").trigger('blur');
        },

        guessWhat() {
            store.guessWhat(this.guessTry);
            this.guessTry = "0";
        },

        giveUp() {
            store.giveUp();

            $("#giveUpButton").trigger('blur');
        },

        openAll() {
            store.openAllSquares();
        },

        previousCard() {
            store.previousCard();

            $("#previousCardButton").trigger('blur');
        },

        nextCard() {
            store.nextCard();

            $("#nextCardButton").trigger('blur');
        },

        startGame() {
            store.nextCard();
        },

        quitGame() {
            store.quitGame();
        }
    },
};
</script>

<style scoped>
nav * {
    display: inline-block;
}

ul {
    list-style: none;
}

button {
    padding: 8px;
    font-size: 14px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 15px;
}

button:not([disabled]):hover {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

button * {
    vertical-align: middle;
}

.CategoryName {
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
}

.GuessWhatSelect {
    padding: 5px;
    font-size: 18px;
    border-radius: 15px;
    cursor: pointer;
}
.GuessWhatSelect:not([disabled]):hover {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

.GiveUpButton:not([disabled]):hover {
    background-color: yellow;
}

.PreviousCardButton:not([disabled]):hover {
    background-color: yellow;
}

.QuitGameButton:not([disabled]):hover {
    background-color: crimson;
}

.StartGame {
    margin: auto;
    margin-top: 15px;
    margin-bottom: 15px;
}

.CategoryName {
    font-size: 20px;
    font-weight: bolder;
    padding-right: 15px;
}
</style>