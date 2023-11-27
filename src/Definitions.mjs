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
        type: [
            {
                // Type 0 - weak
                IMG_SRC: './resources/enemy_1_placeholder.png',
                HP: 100,
                DAMAGE: 10,
                SPEED: 5, // In vw divided by 100
                // ATTACK_SPEED: 25, // Cool-down in ticks
            }
        ]

    },

    plant: {
        type: [
            // Type 0 - normal
            {
                IMG_SRC: './resources/plant_0.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 100,
            }
        ]
    },

    bullet: {
        type: [
            // Type 0 - normal
            {
                IMG_SRC: './resources/bullet_0.png',
                DAMAGE: 30,
                SPEED: 10 // In vw divided by 100
            },
            // Type 1 - frozen
            {
                IMG_SRC: './resources/bullet_1.png',
                DAMAGE: 15,
                SPEED: 13, // In vw divided by 100
                FREEZE_TIME: 200
            }
        ]
    },

    trash: {
        TIME_TILL_DISAPPEAR: 1000,
        TIME_FADING: 200,
    },

    compostableTrash: {
        type: [
            // Type 0 - rotten apple
            {
                IMG_SRC: './resources/rotten_apple.png',
                COMPOST_AMOUNT: 5,
                COMPOSTING_TIME: 500,
            },
            // Type 1 - rotten banana
            {
                IMG_SRC: './resources/rotten_banana.png',
                COMPOST_AMOUNT: 15,
                COMPOSTING_TIME: 1000,
            },
            // Type 2 - rotten cabbage
            {
                IMG_SRC: './resources/rotten_cabbage.png',
                COMPOST_AMOUNT: 15,
                COMPOSTING_TIME: 2000,
            }
        ]
    },

    enemyManager: {
        AMBIENT_DIV: 100,
    },

    checkCollision: function (element1, element2, scaleFactor) {
        let getPos = function (el, scale) {
            let rect = el.getBoundingClientRect();

            let scaledWidth = rect.width * scale;
            let scaledHeight = rect.height * scale;

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