<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand" href="#">
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

            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- Open Next -->
                    <li class="nav-item">
                        <button class="btn btn-outline-success" @click="openNext" :disabled="squares.length==0">
                            Open Next
                        </button>
                    </li>

                    <!-- Skip Card -->
                    <li class="nav-item" v-if="!guessed">
                        <button class="btn btn-outline-success" @click="skipCard">
                            Skip Card
                        </button>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <!-- Guess What -->
                    <li class="nav-item" v-if="!guessed">
                        <input type="text" placeholder="Guess What?" class="form-control mr-sm-2" v-model="guessTry"
                            @blur="guessWhat" @keyup.enter="guessWhat" />

                    </li>
                    <!-- Guess What -->
                    <li class="nav-item" v-if="!guessed">
                        <button class="btn btn-outline-success" @click="guessWhat">
                            Guess What?
                        </button>
                    </li>

                    <!-- Next Card -->
                    <li class="nav-item" v-if="guessed">
                        <button class="btn btn-outline-success" @click="skipCard">
                            Next Card
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
            guessTry: ""
        }
    },

    computed: {
        guessed() {
            return store.game.guessed;
        },

        squares() {
            return store.game.squares;
        }
    },

    methods: {
        openNext() {
            return store.openRandomSquare();
        },

        guessWhat() {
            store.guessWhat(this.guessTry);
            this.guessTry = "";
        },

        openAll() {
            return store.openAllSquares();
        },

        skipCard() {
            return store.skipCard();
        },

        quitGame() {
            return store.quitGame();
        }
    },
};
</script>

<style scoped>
button {
    margin-left: 15px;
}
</style>