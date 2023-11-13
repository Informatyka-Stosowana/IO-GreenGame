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
    },

    enemy_1: {
        IMG_SRC: './resources/enemy_1_placeholder.png',
        HP: 100,
        DAMAGE: 10,
        SPEED: 5, // In vw divided by 100
        // ATTACK_SPEED: 25, // Cool-down in ticks
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
        AMBIENT_DIV: 1000,
    },

    checkCollision: function (element1, element2) {
        let getPos = function (el) {
            let rect = el.getBoundingClientRect();
            return {left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom};
        }

        let element1Pos = getPos(element1);
        let element2Pos = getPos(element2);

        return !(element1Pos.top > element2Pos.bottom ||
            element1Pos.right < element2Pos.left ||
            element1Pos.bottom < element2Pos.top ||
            element1Pos.left > element2Pos.right);
    }
};