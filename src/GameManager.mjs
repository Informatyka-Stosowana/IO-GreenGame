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
            // Create background element
            let cover = document.createElement('div');
            cover.id = 'cover-el';
            cover.style.width = 100 + 'vw';
            cover.style.height = 100 + 'vh';
            cover.style.background = '#000000';
            cover.style.opacity = '0.7';
            cover.style.display = 'flex';
            cover.style.alignItems = 'center';
            cover.style.justifyContent = 'center';

            // Using bootstrap styling for elements
            // Create options element
            let options = document.createElement('div');
            options.className = 'd-grid gap-2 col-6 mx-auto';

            // Create restart game button
            let restart = document.createElement('button');
            restart.id = 'restart-el';
            restart.className = 'btn btn-primary';
            restart.type = 'button';
            restart.style.backgroundColor = 'white';
            restart.style.color = 'black';
            restart.style.height = '8vh';
            restart.style.border = '5px solid white';
            restart.style.borderRadius = '40px';
            restart.style.margin = '3vh 0';
            restart.textContent = 'RESTART GAME';

            // Hover effect on mouseover
            restart.addEventListener('mouseover', () => {
                // Change the button's border color
                restart.style.border = '5px solid green';
                restart.style.color = 'green';
            });
            restart.addEventListener('mouseout', () => {
                // Change the button's border color
                restart.style.border = '5px solid white';
                restart.style.color = 'black';
            });

            // Create resume game button
            let resume = document.createElement('button');
            resume.id = 'resume-el';
            resume.className = 'btn btn-primary';
            resume.type = 'button';
            resume.style.backgroundColor = 'white';
            resume.style.color = 'black';
            resume.style.height = '8vh';
            resume.style.borderRadius = '40px'
            resume.style.margin = '3vh 0';
            resume.textContent = 'RESUME GAME';

            // Hover effect on mouseover
            resume.addEventListener('mouseover', () => {
                // Change the button's border color
                resume.style.border = '5px solid green';
                resume.style.color = 'green';
            });
            resume.addEventListener('mouseout', () => {
                // Change the button's border color
                resume.style.border = '5px solid white';
                resume.style.color = 'black';
            });

            // Create end game button
            let end = document.createElement('button');
            end.id = 'end-el';
            end.className = 'btn btn-primary';
            end.type = 'button';
            end.style.backgroundColor = 'white';
            end.style.color = 'black';
            end.style.height = '8vh';
            end.style.borderRadius = '40px'
            end.style.margin = '3vh 0';
            end.textContent = 'END GAME';

            // Hover effect on mouseover
            end.addEventListener('mouseover', () => {
                // Change the button's border color
                end.style.border = '5px solid green';
                end.style.color = 'green';
            });
            end.addEventListener('mouseout', () => {
                // Change the button's border color
                end.style.border = '5px solid white';
                end.style.color = 'black';
            });

            // Append pause elements
            options.appendChild(restart);
            options.appendChild(resume);
            options.appendChild(end);
            cover.appendChild(options);
            document.body.appendChild(cover);

            // Events
            // Restart game
            restart.addEventListener('click', () => {
                // document.title = "Green Game";
                // let cover = document.getElementById('cover-el');
                // document.body.removeChild(cover);
                // TODO restart game
            });

            // Resume game
            resume.addEventListener('click', () => {
                document.title = "Green Game";
                let cover = document.getElementById('cover-el');
                document.body.removeChild(cover);
                this._gamePaused = false;
            });

            // End game
            end.addEventListener('click', () => {
                // document.title = "Green Game";
                // let cover = document.getElementById('cover-el');
                // document.body.removeChild(cover);
                // TODO end game screen
            });

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