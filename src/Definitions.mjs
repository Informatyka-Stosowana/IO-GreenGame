export {Definitions};

let Definitions = {
    GAME_LOOP_INTERVAL: 10, // speed of ticks in ms
    SCORE_INCREMENT_DIV: 500, // how many ticks it takes to increment score
    box: {
        IMG_SRC: './resources/box.png',
    },
    garbageTruck: {
        TRASH_SPAWN_DIV: 200, // how many ticks it takes for truck to appear TODO make this a bit random
        IMG_SRC: null,
        IMG_OFFSET_X: 25 // In vw
    }
};