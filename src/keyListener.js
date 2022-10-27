import store from "$/store";

const listenKeyBoardEvents = function (e) {
  if (store.game.started) {
    // Open Next Square on Enter
    if (e.keyCode == 13) {
      if (!store.game.guessed && !store.game.givedUp) {
        store.openRandomSquare();
      } else store.nextCard();
    }

    // Open Guess What box on space
    if (e.keyCode == 32) {
      $("#guessWhat").trigger("focus");
    }

    // Quit Game on Backspace or esc
    if (e.keyCode == 8 || e.keyCode == 27) {
      store.quitGame();
    }
  } else {
    if (e.keyCode == 13) {
      store.startGame();
    }
  }
};

$( window ).on("resize", function(e) {
  store.quitGame();
});

window.addEventListener("keydown", listenKeyBoardEvents);
