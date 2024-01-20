import {GameManager} from "./GameManager.mjs";
import {Definitions as def} from "./Definitions.mjs";


function init() {
    // Add ESC event listener
    window.onkeydown = function (event) {
        console.log(event);
        if (event.key === 'Escape') {
            gm.pauseGame();
        }
    };

    // Add event listener to menu div
    let pause = document.getElementById('main-menu-el')
    pause.addEventListener('click', () => {
        gm.pauseGame();
    });
    pause.addEventListener('mouseover', () => {
        // Change the button's border color
        pause.style.border = '2px solid white';
    });
    pause.addEventListener('mouseout', () => {
        // Change the button's border color
        pause.style.border = '2px solid black';
    });
}

let beginBackground = document.createElement('div');
beginBackground.style.height = '100vh';
beginBackground.style.width = '100vw';
beginBackground.style.position = 'absolute';
beginBackground.style.display = 'flex';
beginBackground.style.alignItems = 'center';
beginBackground.style.justifyContent = 'center';

// Create frame
let beginScreenBackground = document.createElement('div');
beginScreenBackground.style.height = '84vh';
beginScreenBackground.style.width = '62vw';
beginScreenBackground.style.position = 'absolute';
beginScreenBackground.style.display = 'flex';
beginScreenBackground.style.alignItems = 'center';
beginScreenBackground.style.justifyContent = 'center';
beginScreenBackground.style.border = '3px solid black';
beginScreenBackground.style.borderRadius = '60px';
beginScreenBackground.style.background = '#7c3f00';

// Create end screen
let beginScreen = document.createElement('div');
beginScreen.className = 'd-grid gap-2 col-6 mx-auto';
beginScreen.style.height = '80vh';
beginScreen.style.width = '60vw';
beginScreen.style.position = 'absolute';
beginScreen.style.display = 'flex'
beginScreen.style.alignItems = 'center';
beginScreen.style.justifyContent = 'center';
beginScreen.style.border = '3px solid #1A1A1A';
beginScreen.style.borderRadius = '50px';
beginScreen.style.background = '#633200';

// Create end options
let beginOptions = document.createElement('div');
beginOptions.className = 'd-grid gap-2 col-6 mx-auto';
beginOptions.style.width = '30vw';

// Create score text
let levelText = document.createElement('p');
levelText.textContent = 'CHOOSE GAME LEVEL';
levelText.style.textAlign = 'center';
levelText.style.color = 'white';
levelText.style.fontSize = '2rem';
levelText.style.fontWeight = 'bolder';

// Create exit button
let easyLevelButton = document.createElement('button');
easyLevelButton.id = 'easy-level-el';
easyLevelButton.className = 'btn btn-primary';
easyLevelButton.type = 'button';
easyLevelButton.style.backgroundColor = '#562b00';
easyLevelButton.style.color = 'white';
easyLevelButton.style.fontWeight = 'bold';
easyLevelButton.style.height = '8vh';
easyLevelButton.style.border = '3px solid white';
easyLevelButton.style.borderRadius = '40px';
easyLevelButton.style.margin = '3vh 0';
easyLevelButton.textContent = 'EASY';

easyLevelButton.addEventListener('mouseover', () => {
    // Change the button's border color
    easyLevelButton.style.border = '3px solid green';
    easyLevelButton.style.color = 'green';
});
easyLevelButton.addEventListener('mouseout', () => {
    // Change the button's border color
    easyLevelButton.style.border = '3px solid white';
    easyLevelButton.style.color = 'white';
});

let mediumLevelButton = document.createElement('button');
mediumLevelButton.id = 'medium-level-el';
mediumLevelButton.className = 'btn btn-primary';
mediumLevelButton.type = 'button';
mediumLevelButton.style.backgroundColor = '#562b00';
mediumLevelButton.style.color = 'white';
mediumLevelButton.style.fontWeight = 'bold';
mediumLevelButton.style.height = '8vh';
mediumLevelButton.style.border = '3px solid white';
mediumLevelButton.style.borderRadius = '40px';
mediumLevelButton.style.margin = '3vh 0';
mediumLevelButton.textContent = 'MEDIUM';

mediumLevelButton.addEventListener('mouseover', () => {
    // Change the button's border color
    mediumLevelButton.style.border = '3px solid green';
    mediumLevelButton.style.color = 'green';
});
mediumLevelButton.addEventListener('mouseout', () => {
    // Change the button's border color
    mediumLevelButton.style.border = '3px solid white';
    mediumLevelButton.style.color = 'white';
});

let hardLevelButton = document.createElement('button');
hardLevelButton.id = 'hard-level-el';
hardLevelButton.className = 'btn btn-primary';
hardLevelButton.type = 'button';
hardLevelButton.style.backgroundColor = '#562b00';
hardLevelButton.style.color = 'white';
hardLevelButton.style.fontWeight = 'bold';
hardLevelButton.style.height = '8vh';
hardLevelButton.style.border = '3px solid white';
hardLevelButton.style.borderRadius = '40px';
hardLevelButton.style.margin = '3vh 0';
hardLevelButton.textContent = 'HARD';

hardLevelButton.addEventListener('mouseover', () => {
    // Change the button's border color
    hardLevelButton.style.border = '3px solid green';
    hardLevelButton.style.color = 'green';
});
hardLevelButton.addEventListener('mouseout', () => {
    // Change the button's border color
    hardLevelButton.style.border = '3px solid white';
    hardLevelButton.style.color = 'white';
});

beginOptions.appendChild(levelText);
beginOptions.appendChild(easyLevelButton);
beginOptions.appendChild(mediumLevelButton);
beginOptions.appendChild(hardLevelButton);
beginScreen.appendChild(beginOptions);
beginScreenBackground.appendChild(beginScreen);
beginBackground.appendChild(beginScreenBackground);
document.body.appendChild(beginBackground);

easyLevelButton.addEventListener('click', () => {
    def.game.DIFFICULTY = 1;
    beginBackground.style.display = 'none';
    gm.startGame();
})

mediumLevelButton.addEventListener('click', () => {
    def.game.DIFFICULTY = 2;
    beginBackground.style.display = 'none';
    gm.startGame();
})

hardLevelButton.addEventListener('click', () => {
    def.game.DIFFICULTY = 3;
    beginBackground.style.display = 'none';
    gm.startGame();
})


let gm = new GameManager();
init();

