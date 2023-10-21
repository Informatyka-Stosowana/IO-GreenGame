import {ItemRepository} from "./ItemRepository.js";

let GAME_LOOP_INTERVAL = 10; // speed of everything
let SCORE_INCREMENT_DIV = 100; // how many ticks it takes to increment score

export class GameManager {
    constructor() {
        this._gamePaused = true;
        this._score = 0;
        this._scoreIncrementInterval = 0;
        this._intervalId = undefined;
        this._itemRepository = undefined;
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), GAME_LOOP_INTERVAL);
    }

    stopGame() {
        clearInterval(this._intervalId);
        // TODO show menu screen
        // TODO send data to main something
    }

    pauseGame() {
        this._gamePaused = !this._gamePaused;
        if (this._gamePaused) document.title = "Green Game - PAUSED";
        else document.title = "Green Game";
    }

    resetGame() {
        this._itemRepository = new ItemRepository();
    }

    gameLoop() {
        if (!this._gamePaused) {
            // TODO add other things that need updating

            // Increment score over time
            if (this._scoreIncrementInterval === SCORE_INCREMENT_DIV) {
                this._score++;
                this._scoreIncrementInterval = 0;
                console.log(this._score)
            }
            else this._scoreIncrementInterval++;
        }
    }
}