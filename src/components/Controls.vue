<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <!-- Logo -->
            <a id="logo" class="navbar-brand">
                <img src="images/guesswhat.jpg" width="36" />
            </a>

            <!-- Navbar Toogler -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <a class="navbar-brand" href="#">
                    <img src="images/guesswhat.jpg" width="36" />
                </a>
            </button>

            <button class="btn btn-primary StartGame" @click="startGame" v-if="cover">Start Game</button>

            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!cover">
                    <!-- Category Name -->
                    <li class="nav-item CategoryName">
                        {{ categoryName }}
                    </li>

                    <!-- Guess What -->
                    <li class="nav-item">
                        <select id="guessWhat" class="form-select" @change="guessWhat" v-model="guessTry"
                            :disabled="guessed || givedUp">
                            <option selected value="0">Guess What?</option>

                            <option v-for="card in cards" :value="card.name">{{ card.name }}</option>
                        </select>
                    </li>

                    <!-- Give Up -->
                    <li class="nav-item">
                        <button id="giveUpButton" class="btn btn-outline-warning" @click="giveUp" :disabled="guessed || givedUp">
                            Give Up
                        </button>
                    </li>
                </ul>


                <ul class="nav navbar-nav navbar-right" v-if="!cover">
                    <!-- Open Next -->
                    <li class="nav-item">
                        <button id="openSquareButton" class="btn btn-success" @click="openNext"
                            :disabled="squares.length==0">
                            Open Square
                        </button>
                    </li>

                    <!-- Previous Card -->
                    <li class="nav-item">
                        <button id="previousCardButton" class="btn btn-outline-warning" :disabled="deck_index==0" @click="previousCard">
                            &laquo; Previous Card
                        </button>
                    </li>

                    <li class="nav-item">
                        &nbsp;&nbsp;
                        {{ deck_index + 1 }} / {{ cardsNumber }}
                    </li>

                    <!-- Next Card -->
                    <li class="nav-item">
                        <button id="nextCardButton" class="btn btn-success" :disabled="deck_index==(cardsNumber-1)"
                            @click.stop.prevent="nextCard">
                            Next Card &raquo;
                        </button>
                    </li>

                    <!-- Quit Game -->
                    <li class="nav-item">
                        <button class="btn btn-danger" @click="quitGame">
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
        categoryName() {
            return store.currentCategory ? store.currentCategory.name : "";
        },

        cards() {
            return store.cards;
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

        deck_index() {
            return store.game.deck_index;
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
button {
    margin-left: 15px;
}

.StartGame {
    margin-left: calc(50% - 100px);
}

.CategoryName {
    font-size: 20px;
    font-weight: bolder;
    padding-right: 15px;
}
</style>