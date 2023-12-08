import {ItemRepository} from "./ItemRepository.mjs";
import {ShopManager} from "./ShopManager.mjs";
import {ComposterManager} from "./ComposterManager.mjs";
import {ObjectRepository} from "./ObjectRepository.mjs";
import {GarbageTruckManager} from "./GarbageTruckManager.mjs";
import {EnemyManager} from "./EnemyManager.mjs";
import {Definitions as def} from "./Definitions.mjs";
// for testing

// Game Manager:
// Starts, pauses and restarts the game
// Creates all the necessary managers and repositories
// Manages main menu and pause menu

export class GameManager {
    constructor() {
        this._gamePaused = true;
        this._score = 0;
        this._scoreIncrementInterval = 0;
        this._intervalId = null;

        this._itemRepository = null;
        this._objectRepository = null;
        this._shopManager = null;
        this._composterManager = null;
        this._garbageTruckManager = null;
        this._enemyManager = null;
    }

    // TODO remove this
    forTesting() {
        this._itemRepository.addCompostableTrash(0);
        this._itemRepository.addCompostableTrash(1);
        this._itemRepository.addCompostableTrash(2);
        this._itemRepository.addDynamite(500);
        this._itemRepository.addForks(500);
        this._itemRepository.addBoxes(500);
    }

    _setStartingResources() {
        this._itemRepository.addCompost(100);
        this._itemRepository.addBoxes(5);
        this._itemRepository.addForks(5);
        this._itemRepository.addDynamite(5);
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), def.GAME_LOOP_INTERVAL);

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
            let cover = document.createElement('div');
            cover.id = 'cover-el';
            cover.style.width = 100 + 'vw';
            cover.style.height = 100 + 'vh';
            cover.style.background = '#000000';
            cover.style.opacity = '0.7';
            document.body.appendChild(cover);
        } else {
            document.title = "Green Game";
            let cover = document.getElementById('cover-el');
            document.body.removeChild(cover);
            // TODO hide pause screen
        }

    }

    resetGame() {
        this._itemRepository = new ItemRepository();
        this._objectRepository = new ObjectRepository();
        this._shopManager = new ShopManager(this._itemRepository, this._objectRepository);
        this._composterManager = new ComposterManager(this._itemRepository);
        this._garbageTruckManager = new GarbageTruckManager(this._itemRepository, this._objectRepository);
        this._enemyManager = new EnemyManager(this._objectRepository);

        this._setStartingResources();
    }

    gameLoop() {
        if (!this._gamePaused) {
            this._composterManager.update();
            this._objectRepository.update();
            this._garbageTruckManager.update();
            this._enemyManager.update();

            // Increment score over time
            if (this._scoreIncrementInterval === def.SCORE_INCREMENT_DIV) {
                this._score++;
                this._scoreIncrementInterval = 0;
                // console.log('Score: ', this._score)
            } else this._scoreIncrementInterval++;
        }
    }
}