import {ItemRepository} from "./ItemRepository.mjs";
import {ShopManager} from "./ShopManager.mjs";
import {ComposterManager} from "./ComposterManager.mjs";
import {ObjectRepository} from "./ObjectRepository.mjs";
import {GarbageTruckManager} from "./GarbageTruckManager.mjs";
import {EnemyManager} from "./EnemyManager.mjs";
import {Definitions as def} from "./Definitions.mjs";

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

        // TODO remove this
        this.forTesting();
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), def.GAME_LOOP_INTERVAL);
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
            cover.style.opacity = '0.8';
            cover.style.display = 'flex';
            cover.style.alignItems = 'center';
            cover.style.justifyContent = 'center';

            // Using bootstrap styling for elements
            // Create options element
            let options = document.createElement('div');
            options.className = 'd-grid gap-2 col-6 mx-auto';
            options.style.width = '35vw';

            // Create restart game button
            let restart = document.createElement('button');
            restart.id = 'restart-el';
            restart.className = 'btn btn-primary';
            restart.type = 'button';
            restart.style.fontWeight = 'bold';
            restart.style.backgroundColor = '#562b00';
            restart.style.color = 'white';
            restart.style.height = '8vh';
            restart.style.border = '3px solid white';
            restart.style.borderRadius = '40px';
            restart.style.margin = '3vh 0';
            restart.textContent = 'RESTART GAME';

            // Hover effect on mouseover
            restart.addEventListener('mouseover', () => {
                // Change the button's border color
                restart.style.border = '3px solid green';
                restart.style.color = 'green';
            });
            restart.addEventListener('mouseout', () => {
                // Change the button's border color
                restart.style.border = '3px solid white';
                restart.style.color = 'white';
            });

            // Create resume game button
            let resume = document.createElement('button');
            resume.id = 'resume-el';
            resume.className = 'btn btn-primary';
            resume.type = 'button';
            resume.style.fontWeight = 'bold';
            resume.style.backgroundColor = '#3c005a';
            resume.style.color = 'white';
            resume.style.height = '8vh';
            resume.style.border = '3px solid white';
            resume.style.borderRadius = '40px'
            resume.style.margin = '3vh 0';
            resume.textContent = 'RESUME GAME';

            // Hover effect on mouseover
            resume.addEventListener('mouseover', () => {
                // Change the button's border color
                resume.style.border = '3px solid green';
                resume.style.color = 'green';
            });
            resume.addEventListener('mouseout', () => {
                // Change the button's border color
                resume.style.border = '3px solid white';
                resume.style.color = 'white';
            });

            // Create end game button
            let end = document.createElement('button');
            end.id = 'end-el';
            end.className = 'btn btn-primary';
            end.type = 'button';
            end.style.backgroundColor = '#562b00';
            end.style.fontWeight = 'bold';
            end.style.color = 'white';
            end.style.height = '8vh';
            end.style.border = '3px solid white';
            end.style.borderRadius = '40px'
            end.style.margin = '3vh 0';
            end.textContent = 'END GAME';

            // Hover effect on mouseover
            end.addEventListener('mouseover', () => {
                // Change the button's border color
                end.style.border = '3px solid green';
                end.style.color = 'green';
            });
            end.addEventListener('mouseout', () => {
                // Change the button's border color
                end.style.border = '3px solid white';
                end.style.color = 'white';
            });

            // Append pause elements
            options.appendChild(resume);
            options.appendChild(restart);
            options.appendChild(end);
            options.appendChild(resume);
            cover.appendChild(options);
            document.body.appendChild(cover);

            // Events
            // Restart game
            restart.addEventListener('click', () => {
                location.reload();
            });

            // Resume game
            resume.addEventListener('click', () => {
                this.pauseGame();
            });

            // End game
            end.addEventListener('click', () => {
                document.title = "Green Game";
                let cover = document.getElementById('cover-el');
                document.body.removeChild(cover);

                // Create empty div to center end screen
                let endBackground = document.createElement('div');
                endBackground.style.height = '100vh';
                endBackground.style.width = '100vw';
                endBackground.style.position = 'absolute';
                endBackground.style.display = 'flex';
                endBackground.style.alignItems = 'center';
                endBackground.style.justifyContent = 'center';

                // Create frame
                let endScreenBackground = document.createElement('div');
                endScreenBackground.style.height = '84vh';
                endScreenBackground.style.width = '62vw';
                endScreenBackground.style.position = 'absolute';
                endScreenBackground.style.display = 'flex';
                endScreenBackground.style.alignItems = 'center';
                endScreenBackground.style.justifyContent = 'center';
                endScreenBackground.style.border = '3px solid black';
                endScreenBackground.style.borderRadius = '60px';
                endScreenBackground.style.background = '#7c3f00';

                // Create end screen
                let endScreen = document.createElement('div');
                endScreen.className = 'd-grid gap-2 col-6 mx-auto';
                endScreen.style.height = '80vh';
                endScreen.style.width = '60vw';
                endScreen.style.position = 'absolute';
                endScreen.style.display = 'flex'
                endScreen.style.alignItems = 'center';
                endScreen.style.justifyContent = 'center';
                endScreen.style.border = '3px solid #1A1A1A';
                endScreen.style.borderRadius = '50px';
                endScreen.style.background = '#633200';

                // Create score text
                let scoreText = document.createElement('p');
                scoreText.textContent = 'YOUR SCORE: ' + this._score;
                scoreText.style.textAlign = 'center';
                scoreText.style.color = 'white';
                scoreText.style.fontSize = '2rem';
                scoreText.style.fontWeight = 'bolder';

                // Create end options
                let endOptions = document.createElement('div');
                endOptions.className = 'd-grid gap-2 col-6 mx-auto';
                endOptions.style.width = '30vw';

                // Create exit button
                let exit = document.createElement('button');
                exit.id = 'exit-el';
                exit.className = 'btn btn-primary';
                exit.type = 'button';
                exit.style.backgroundColor = '#562b00';
                exit.style.color = 'white';
                exit.style.fontWeight = 'bold';
                exit.style.height = '8vh';
                exit.style.border = '3px solid white';
                exit.style.borderRadius = '40px';
                exit.style.margin = '3vh 0';
                exit.textContent = 'EXIT GAME';

                // Hover effect on mouseover
                exit.addEventListener('mouseover', () => {
                    // Change the button's border color
                    exit.style.border = '3px solid green';
                    exit.style.color = 'green';
                });
                exit.addEventListener('mouseout', () => {
                    // Change the button's border color
                    exit.style.border = '3px solid white';
                    exit.style.color = 'white';
                });

                // Return to main menu
                exit.addEventListener('click', () => {
                    // TODO add exit to main menu
                })


                endOptions.appendChild(restart);
                endOptions.appendChild(exit);
                endScreen.appendChild(scoreText);
                endScreen.appendChild(endOptions);
                endScreenBackground.appendChild(endScreen);
                endBackground.appendChild(endScreenBackground);
                document.body.appendChild(endBackground);
                // TODO end game screen styling
            });

        } else {
            document.title = "Green Game";
            let cover = document.getElementById('cover-el');
            document.body.removeChild(cover);
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