import {GameManager} from "./GameManager.mjs";

let gameManager = new GameManager();
gameManager.startGame();

document.getElementById('composter-el').onclick = () => gameManager.pauseGame();