import {GameManager} from "./GameManager.js";

function loadScript(url)
{
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    head.appendChild(script);
}

loadScript('src/GameManager.js');
loadScript('src/ItemRepository.js');

let gameManager = new GameManager();
gameManager.startGame();

document.getElementById('composter-el').onclick = () => gameManager.pauseGame();