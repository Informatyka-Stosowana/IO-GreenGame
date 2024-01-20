import {ItemRepository} from "./ItemRepository.mjs";
import {ShopManager} from "./ShopManager.mjs";
import {ComposterManager} from "./ComposterManager.mjs";
import {ObjectRepository} from "./ObjectRepository.mjs";
import {GarbageTruckManager} from "./GarbageTruckManager.mjs";
import {EnemyManager} from "./EnemyManager.mjs";
import {updateRanking} from "https://unpkg.com/greengame-api-client@latest";
import {Definitions as def} from "./Definitions.mjs";

export class GameManager {
    constructor() {
        this._gamePaused = true;
        this._scoreIncrementInterval = 0;
        this._intervalId = null;

        this._itemRepository = null;
        this._objectRepository = null;
        this._shopManager = null;
        this._composterManager = null;
        this._garbageTruckManager = null;
        this._enemyManager = null;
    }

    _setStartingResources() {
        for (let i = def.game.DIFFICULTY; i <= 3; i++) {
            this._itemRepository.addCompost(50);
            this._itemRepository.addBoxes(3);
            this._itemRepository.addForks(3);
            this._itemRepository.addDynamite(3);
            this._itemRepository.addMousetrap(3);
        }
    }

    startGame() {
        this.resetGame();
        this._gamePaused = false;
        this._intervalId = setInterval(() => this.gameLoop(), def.GAME_LOOP_INTERVAL);
    }

    async _sendScore(score) {
        await updateRanking({gameID: 4, score: score});
    }

    stopGame() {
        clearInterval(this._intervalId);

        if (def.game.SCORE >= 500) {
            this._sendScore(def.game.SCORE);
        }

        let restart = this._restartButton();

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
        scoreText.textContent = 'YOUR SCORE: ' + def.game.SCORE;
        scoreText.style.textAlign = 'center';
        scoreText.style.color = 'white';
        scoreText.style.fontSize = '2rem';
        scoreText.style.fontWeight = 'bolder';

        // Create end options
        let endOptions = document.createElement('div');
        endOptions.className = 'd-grid gap-2 col-6 mx-auto';
        endOptions.style.width = '30vw';

        endOptions.appendChild(restart);
        endScreen.appendChild(scoreText);
        endScreen.appendChild(endOptions);
        endScreenBackground.appendChild(endScreen);
        endBackground.appendChild(endScreenBackground);
        document.body.appendChild(endBackground);
        // TODO end game screen styling
    }

    _restartButton() {
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

        // Restart game
        restart.addEventListener('click', () => {
            location.reload();
        });

        return restart;
    }

    _resumeButton() {
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

        // Change the button's border color
        resume.addEventListener('mouseout', () => {
            resume.style.border = '3px solid white';
            resume.style.color = 'white';
        });

        // Resume game
        resume.addEventListener('click', () => {
            this.pauseGame();
        });

        return resume;
    }

    _infoButton() {
        let info = document.createElement('button');
        info.id = 'info-el';
        info.className = 'btn btn-primary';
        info.type = 'button';
        info.style.backgroundColor = '#562b00';
        info.style.fontWeight = 'bold';
        info.style.color = 'white';
        info.style.height = '8vh';
        info.style.border = '3px solid white';
        info.style.borderRadius = '40px'
        info.style.margin = '3vh 0';
        info.textContent = 'INFO';

        info.addEventListener('mouseover', () => {
            // Change the button's border color
            info.style.border = '3px solid green';
            info.style.color = 'green';
        });
        info.addEventListener('mouseout', () => {
            // Change the button's border color
            info.style.border = '3px solid white';
            info.style.color = 'white';
        });

        info.addEventListener('click', () => {
            let cover = document.getElementById('cover-el');
            document.body.removeChild(cover);
            this.showInfo();
        })

        return info;
    }

    _endButton() {
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

        // End game
        end.addEventListener('click', () => {
            document.title = "Green Game";
            let cover = document.getElementById('cover-el');
            document.body.removeChild(cover);
            this.stopGame();
        });

        return end;
    }

    _infoText(text, isBold, isCenter) {
        let info = document.createElement('p');
        info.textContent = text;
        if (isCenter) {
            info.style.textAlign = 'center';
        }
        else {
            info.style.textAlign = 'left';
        }
        info.style.color = 'white';
        info.style.fontSize = '0.8rem';
        if (isBold) {
            info.style.fontWeight = 'bolder';
        }

        return info;
    }

    showInfo() {
        // Create empty div to center end screen
        let infoBackground = document.createElement('div');
        infoBackground.id = 'info-background-el';
        infoBackground.style.height = '100vh';
        infoBackground.style.width = '100vw';
        infoBackground.style.position = 'absolute';
        infoBackground.style.display = 'flex';
        infoBackground.style.alignItems = 'center';
        infoBackground.style.justifyContent = 'center';

        // Create frame
        let infoScreenBackground = document.createElement('div');
        infoScreenBackground.style.height = '94vh';
        infoScreenBackground.style.width = '62vw';
        infoScreenBackground.style.position = 'absolute';
        infoScreenBackground.style.display = 'flex';
        infoScreenBackground.style.alignItems = 'center';
        infoScreenBackground.style.justifyContent = 'center';
        infoScreenBackground.style.border = '3px solid black';
        infoScreenBackground.style.borderRadius = '60px';
        infoScreenBackground.style.background = '#7c3f00';

        // Create end screen
        let infoScreen = document.createElement('div');
        infoScreen.className = 'd-grid gap-2 col-6 mx-auto';
        infoScreen.style.height = '90vh';
        infoScreen.style.width = '60vw';
        infoScreen.style.position = 'absolute';
        infoScreen.style.display = 'flex'
        infoScreen.style.alignItems = 'center';
        infoScreen.style.justifyContent = 'center';
        infoScreen.style.border = '3px solid #1A1A1A';
        infoScreen.style.borderRadius = '50px';
        infoScreen.style.background = '#633200';

        let infoText = document.createElement('div');
        infoText.className = 'd-grid gap-2 col-6 mx-auto';
        infoText.style.width = '45vw';

        // Create p elements for info
        let title = this._infoText('GREEN GAME', true, true);
        let description = this._infoText('Gra jest typu tower defense. ' +
            'Gracz broni określonego terytorium wyznaczonego na końcu planszy przed przeciwnikami, ' +
            'sadząc różnorodne rośliny, z których każda ma unikalne zdolności bojowe oraz używając ' +
            'zebranych śmieci okresowo pojawiających się na planszy (ponowne wykorzystanie). Celem ' +
            'jest przetrwanie fal atakujących przeciwników, korzystając ze strategicznego rozmieszczania ' +
            'roślin oraz zebranych śmieci (pudełko, dynamit, pułapka, widelec) na planszy.' +
            ' Gra kończy się po osiągnięciu przez pierwszego przeciwnika chronionego terenu, ' +
            'czyli końca planszy.', false, true);
        let buyPlantInfo = this._infoText('ZAKUP ROŚLINY -> wybierz roślinę' +
            ' ze sklepu i ustaw na wolnym polu na planszy', true, false);
        let espInfo = this._infoText('ESC/RESUME -> wznów grę', true, false);

        // Create end options
        let infoOptions = document.createElement('div');
        infoOptions.className = 'd-grid gap-2 col-6 mx-auto';
        infoOptions.style.width = '30vw';

        // Create resume button
        let resume = this._resumeButton();


        infoOptions.appendChild(resume);
        infoText.appendChild(title);
        infoText.appendChild(description);
        infoText.appendChild(buyPlantInfo);
        infoText.appendChild(this._infoText('PUDEŁKO -> blokuje przeciwników', true, false));
        infoText.appendChild(this._infoText('WIDELEC -> jednorazowo odbiera określoną ilość życia wszystkim ' +
            'przeciwnikom w wierszu planszy', true, false));
        infoText.appendChild(this._infoText('DYNAMIT -> niszczy przeciwników w zasięgu swojego rażenia ' +
            'oraz usuwa przedmioty i rośliny ustawione na danym miejscu na planszy', true, false));
        infoText.appendChild(this._infoText('PUŁAPKA -> niszczy przeciwnika w momencie dotknięcia', true, false));
        infoText.appendChild(espInfo);
        infoScreen.appendChild(infoText);
        infoScreen.appendChild(infoOptions);
        infoScreenBackground.appendChild(infoScreen);
        infoBackground.appendChild(infoScreenBackground);
        document.body.appendChild(infoBackground);
    }

    pauseGame() {
        this._gamePaused = !this._gamePaused;
        if (this._gamePaused) {
            document.title = "Green Game - PAUSED";

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
            let restart = this._restartButton();

            // Create resume game button
            let resume = this._resumeButton();

            // Create end game button
            let end = this._endButton();

            // Create info button
            let info = this._infoButton();

            // Append pause elements
            options.appendChild(resume);
            options.appendChild(restart);
            options.appendChild(end);
            options.appendChild(info);
            options.appendChild(resume);
            cover.appendChild(options);
            document.body.appendChild(cover);

        } else {
            document.title = "Green Game";
            if (document.getElementById('cover-el')) {
                let cover = document.getElementById('cover-el');
                document.body.removeChild(cover);
            }
            if (document.getElementById('info-background-el')) {
                let infoBackground = document.getElementById('info-background-el');
                document.body.removeChild(infoBackground);
            }
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
        if (!def.game.ALIVE) {
            this.stopGame();
        }
        if (!this._gamePaused) {
            this._composterManager.update();
            this._objectRepository.update();
            this._garbageTruckManager.update();
            this._enemyManager.update();

            // Increment score over time
            if (this._scoreIncrementInterval === def.SCORE_INCREMENT_DIV) {
                def.game.SCORE += def.game.DIFFICULTY;
                this._scoreIncrementInterval = 0;
                console.log('Score: ', def.game.SCORE);
            } else this._scoreIncrementInterval++;
        }
    }
}