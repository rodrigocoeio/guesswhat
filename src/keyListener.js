import store from "$/store";

const listenKeyBoardEvents = function(e) {
    if(store.game.started)
    {
        if (e.keyCode == 13) {
            if(!store.game.guessed)
                store.openRandomSquare();  
            else
                store.nextCard();
                  
        }
    }
    
};

window.addEventListener("keypress", listenKeyBoardEvents);