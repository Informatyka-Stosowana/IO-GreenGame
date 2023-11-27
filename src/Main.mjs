import {GameManager} from "./GameManager.mjs";

function init() {
    // Add ESC event listener
    window.onkeydown = function (event) {
        console.log(event);
        if (event.key === 'Escape') {
            gm.pauseGame();
        }
    };
}

let gm = new GameManager();
init();

gm.startGame();