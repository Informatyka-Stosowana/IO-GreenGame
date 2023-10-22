import {ItemRepository} from "./ItemRepository.mjs";
import {ShopManager} from "./ShopManager.mjs";
import {BoardManager} from "./BoardManager.mjs";
export {GameManager}

let GAME_LOOP_INTERVAL = 10; // speed of everything
let SCORE_INCREMENT_DIV = 500; // how many ticks it takes to increment score

// Game Manager:
// Starts, pauses and restarts the game
// Creates all the necessary managers and repositories
// Manages main menu and pause menu

class GameManager {
    constructor() {
        this._gamePaused = true;
        this._score = 0;
        this._scoreIncrementInterval = 0;
        this._intervalId = undefined;
        this._itemRepository = undefined;
        this._shopManager = undefined;
        this._boardManager = undefined;
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), GAME_LOOP_INTERVAL);
        this._shopManager.buy(1);
    }

    stopGame() {
        clearInterval(this._intervalId);
        // TODO show menu screen
        // TODO send data to main something
    }

    pauseGame() {
        this._gamePaused = !this._gamePaused;
        if (this._gamePaused) {
            document.title = "Green Game - PAUSED";
            // TODO show pause screen
        }
        else {
            document.title = "Green Game";
            // TODO hide pause screen
        }

    }

    resetGame() {
        this._itemRepository = new ItemRepository();
        this._boardManager = new BoardManager();
        this._shopManager = new ShopManager(this._itemRepository, this._boardManager);
    }

    gameLoop() {
        if (!this._gamePaused) {
            // TODO add other things that need updating

            // Increment score over time
            if (this._scoreIncrementInterval === SCORE_INCREMENT_DIV) {
                this._score++;
                this._scoreIncrementInterval = 0;
                // console.log('Score: ', this._score)
            }
            else this._scoreIncrementInterval++;
        }
    }
}