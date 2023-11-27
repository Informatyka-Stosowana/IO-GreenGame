export const Definitions = {
    GAME_LOOP_INTERVAL: 10, // speed of ticks in ms
    SCORE_INCREMENT_DIV: 500, // how many ticks it takes to increment score

    box: {
        IMG_SRC: './resources/box_1.png',
        HP: 5000,
    },

    garbageTruck: {
        TRASH_SPAWN_DIV: 1500, // how many ticks it takes for truck to appear, randomized in GarbageTruckManager
        IMG_SRC: null,
        IMG_OFFSET_X: 25, // In vw
    },

    dynamite: {
        IMG_SRC: './resources/dynamite.png',
        EXPLOSION_DELAY: 50,
        EXPLOSION_RADIUS: 2, // How much bigger is the collision box, scale factor
        EXPLOSION_DAMAGE: 100,
    },

    enemy: {
        type: [{
            // Type 0 - weak
            IMG_SRC: './resources/enemy_1_placeholder.png',
            HP: 100,
            DAMAGE: 10,
            SPEED: 5, // In vw divided by 100
            // ATTACK_SPEED: 25, // Cool-down in ticks
        }]

    },

    bullet: {
        type: [{
            // Type 0 - normal
            IMG_SRC: './resources/bullet_0.png',
            DAMAGE: 30,
            SPEED: 10 // In vw divided by 100
        }]
    },

    trash: {
        TIME_TILL_DISAPPEAR: 1000,
        TIME_FADING: 200,
    },

    compostableTrash: {
        type1: {
            IMG_SRC: './resources/rotten_apple.png'
        },
        type2: {
            IMG_SRC: './resources/rotten_banana.png'
        },
        type3: {
            IMG_SRC: './resources/rotten_cabbage.png'
        },
    },

    enemyManager: {
        AMBIENT_DIV: 100,
    },

    checkCollision: function (element1, element2, scaleFactor) {
        let getPos = function (el, scale) {
            let rect = el.getBoundingClientRect();

            let scaledWidth = rect.width * scale;
            let scaledHeight = rect.height * scale;

            // Just for testing
            // let boundingBox = document.createElement('div');
            // boundingBox.style.position = 'absolute';
            // boundingBox.style.left = rect.left - (scaledWidth - rect.width) / 2 + 'px';
            // boundingBox.style.top = rect.top - (scaledHeight - rect.height) / 2 + 'px';
            // boundingBox.style.width = rect.width * scaleFactor + 'px';
            // boundingBox.style.height = rect.height * scaleFactor + 'px';
            // boundingBox.style.border = '2px solid red'; // You can adjust the border style as needed
            // document.body.appendChild(boundingBox);

            return {
                top: rect.top - (scaledHeight - rect.height) / 2,
                right: rect.right + (scaledWidth - rect.width) / 2,
                bottom: rect.bottom + (scaledHeight - rect.height) / 2,
                left: rect.left - (scaledWidth - rect.width) / 2
            };
        };

        let element1Pos = getPos(element1, scaleFactor);
        let element2Pos = getPos(element2, 1);

        return !(element1Pos.top > element2Pos.bottom ||
            element1Pos.right < element2Pos.left ||
            element1Pos.bottom < element2Pos.top ||
            element1Pos.left > element2Pos.right);
    }
};