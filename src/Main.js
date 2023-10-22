import {GameManager} from "./GameManager.mjs";

let gm = new GameManager();
gm.startGame();

document.getElementById('composter-el').onclick = () => gm.pauseGame();