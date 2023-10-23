import {ItemRepository} from "./ItemRepository.mjs";
import {ShopManager} from "./ShopManager.mjs";
import {ComposterManager} from "./ComposterManager.mjs";
import {ObjectRepository} from "./ObjectRepository.mjs";
// for testing
import {CompostableTrash} from "./CompostableTrash.mjs";

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
        this._intervalId = null;
        this._itemRepository = null;
        this._objectRepository = null;
        this._shopManager = null;
        this._composterManager = null;
    }

    // TODO remove this
    forTesting() {
        this._itemRepository.addCompostableTrash(new CompostableTrash(1));
        this._itemRepository.addCompostableTrash(new CompostableTrash(2));
        this._itemRepository.addCompostableTrash(new CompostableTrash(3));
    }

    _setStartingResources() {
        this._itemRepository.addCompost(100);
        this._itemRepository.addBoxes(100);
        this._itemRepository.addForks(100);
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), GAME_LOOP_INTERVAL);

        // TODO remove this
        this.forTesting();
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
        } else {
            document.title = "Green Game";
            // TODO hide pause screen
        }

    }

    resetGame() {
        this._itemRepository = new ItemRepository();
        this._objectRepository = new ObjectRepository();
        this._shopManager = new ShopManager(this._itemRepository, this._objectRepository);
        this._composterManager = new ComposterManager(this._itemRepository);

        this._setStartingResources();
    }

    gameLoop() {
        if (!this._gamePaused) {
            // TODO add other things that need updating
            this._composterManager.update();
            this._objectRepository.update();

            // Increment score over time
            if (this._scoreIncrementInterval === SCORE_INCREMENT_DIV) {
                this._score++;
                this._scoreIncrementInterval = 0;
                // console.log('Score: ', this._score)
            } else this._scoreIncrementInterval++;
        }
    }
}