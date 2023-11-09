export const Definitions = {
    GAME_LOOP_INTERVAL: 10, // speed of ticks in ms
    SCORE_INCREMENT_DIV: 500, // how many ticks it takes to increment score
    box: {
        IMG_SRC: './resources/box_1.png',
        HP: 500,
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
        ATTACK_SPEED: 25, // Cool-down in ticks
    },
};