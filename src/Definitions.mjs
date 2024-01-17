export const Definitions = {
    GAME_LOOP_INTERVAL: 10, // speed of ticks in ms
    SCORE_INCREMENT_DIV: 500, // how many ticks it takes to increment score

    game: {
        SCORE: 0,
        ALIVE: true,
        DIFFICULTY: undefined,
    },

    box: {
        IMG_SRC: './resources/box_1.png',
        HP: 10_000,
    },

    mousetrap: {
        IMG_SRC: './resources/mouse_trap.png',
        SOUND_SRC: './resources/sounds/mousetrap.mp3',
        DAMAGE: 100_000,
    },

    fork: {
        IMG_SRC: './resources/frok.png',
        DAMAGE: 100,
        SPEED: 35,
        damage_sound: [
            {
                SOUND_SRC: './resources/sounds/stab_0.mp3'
            },
            {
                SOUND_SRC: './resources/sounds/stab_1.mp3'
            },
            {
                SOUND_SRC: './resources/sounds/stab_2.mp3'
            },
            {
                SOUND_SRC: './resources/sounds/stab_3.mp3'
            },
            {
                SOUND_SRC: './resources/sounds/stab_4.mp3'
            },
            {
                SOUND_SRC: './resources/sounds/stab_5.mp3'
            },
        ],
    },

    garbageTruck: {
        TRASH_SPAWN_DIV: 1500, // how many ticks it takes for truck to appear, randomized in GarbageTruckManager
        IMG_SRC: './resources/garbagetruck.png',
        IMG_OFFSET_X: 50, // In vw
    },

    dynamite: {
        IMG_SRC: './resources/dynamite.png',
        EXPLOSION_DELAY: 50,
        EXPLOSION_RADIUS: 2, // How much bigger the collision box is, scale factor
        EXPLOSION_DAMAGE: 500,
        EXPLOSION_SOUND_SRC: './resources/sounds/explosion.mp3',
        EXPLOSION_ANIMATION: [
            {
                IMG_SRC: './resources/explosion/Explosion_1.png',
                ANIMATION_DELAY: 5,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_2.png',
                ANIMATION_DELAY: 5,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_3.png',
                ANIMATION_DELAY: 5,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_4.png',
                ANIMATION_DELAY: 3,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_5.png',
                ANIMATION_DELAY: 3,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_6.png',
                ANIMATION_DELAY: 4,
            },
            {
                IMG_SRC: './resources/explosion/Explosion_7.png',
                ANIMATION_DELAY: 5,
            },
        ],
    },

    plant: {
        type: [
            {
                IMG_SRC: './resources/plant_0.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 250,
                PRICE: 20
            },
            {
                IMG_SRC: './resources/plant_1.png',
                HP: 1500,
                ATTACK_SPEED_DIV: 400,
                PRICE: 40
            },
            {
                IMG_SRC: './resources/plant_2.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 150,
                PRICE: 80
            }
        ]
    },

    bullet: {
        type: [
            // Type 0 - normal
            {
                IMG_SRC: './resources/bullet_0.png',
                HIT_SOUND_SRC: './resources/sounds/slimeball_hit.mp3',
                DAMAGE: 20,
                SPEED: 15 // In vw divided by 100
            },
            // Type 1 - poison
            {
                IMG_SRC: './resources/bullet_1.png',
                HIT_SOUND_SRC: './resources/sounds/slimeball_hit.mp3',
                DAMAGE: 50,
                SPEED: 13, // In vw divided by 100
                POISON_TIME: 500,
                POISON_DMG: 0.12,
            },
            // Type 2 - frozen
            {
                IMG_SRC: './resources/bullet_2.png',
                HIT_SOUND_SRC: './resources/sounds/slimeball_hit.mp3',
                DAMAGE: 30,
                SPEED: 13, // In vw divided by 100
                FREEZE_TIME: 200
            }
        ]
    },

    trash: {
        TIME_TILL_DISAPPEAR: 1000,
        TIME_FADING: 200,
    },

    compostableTrash: [
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
            COMPOST_AMOUNT: 30,
            COMPOSTING_TIME: 2000,
        }
    ],

    enemy: {
        type: [
            {
                // Type 0 - weak
                IMG_SRC: './resources/enemy_0.png',
                CLASS_NAME: 'enemy-0-img',
                HP: 100,
                DAMAGE: 10,
                SPEED: 5, // In vw divided by 100
                SCORE_INC: 10,
                // ATTACK_SPEED: 25, // Cool-down in ticks
            },
            {
                // Type 1 - weak snail
                IMG_SRC: './resources/enemy_1.png',
                CLASS_NAME: 'enemy-1-img',
                HP: 250,
                DAMAGE: 20,
                SPEED: 3, // In vw divided by 100
                SCORE_INC: 20,
                // ATTACK_SPEED: 25, // Cool-down in ticks
            },
            {
                // Type 2 - strong snail
                IMG_SRC: './resources/enemy_2.png',
                CLASS_NAME: 'enemy-2-img',
                HP: 500,
                DAMAGE: 50,
                SPEED: 2, // In vw divided by 100
                SCORE_INC: 20,
                // ATTACK_SPEED: 25, // Cool-down in ticks
            },
            {
                // Type 3 - very strong snail
                IMG_SRC: './resources/enemy_3.png',
                CLASS_NAME: 'enemy-3-img',
                HP: 1000,
                DAMAGE: 100,
                SPEED: 0.8, // In vw divided by 100
                SCORE_INC: 50,
                // ATTACK_SPEED: 25, // Cool-down in ticks
            },
        ]
    },

    enemyManager: {
        WAVE_ENEMY_SPAWN_DIV: 70,
        WEAK_ENEMY_COUNT: 5,
        STRONG_ENEMY_COUNT: 0,
        AMBIENT_DIV: 1_000,
        WAVE_DIV: 9_000,
    },

    getPos: function (el, scale) {
        let rect = el.getBoundingClientRect();

        let scaledWidth = rect.width * scale;
        let scaledHeight = rect.height * scale;

        return {
            top: rect.top - (scaledHeight - rect.height) / 2,
            right: rect.right + (scaledWidth - rect.width) / 2,
            bottom: rect.bottom + (scaledHeight - rect.height) / 2,
            left: rect.left - (scaledWidth - rect.width) / 2
        }
    },

    checkCollision: function (element1, element2, scaleFactor) {
        let element1Pos = this.getPos(element1, scaleFactor);
        let element2Pos = this.getPos(element2, 1);

        return !(element1Pos.top > element2Pos.bottom ||
            element1Pos.right < element2Pos.left ||
            element1Pos.bottom < element2Pos.top ||
            element1Pos.left > element2Pos.right);
    },

    convertPixelsToViewPort(element) {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let currentPositionInPixels = parseFloat(element.style.left);
        let currentPositionInViewPort = (currentPositionInPixels / viewportWidth) * 100;
        element.style.left = currentPositionInViewPort + 'vw';

        let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        currentPositionInPixels = parseFloat(element.style.top);
        currentPositionInViewPort = (currentPositionInPixels / viewportHeight) * 100;
        element.style.top = currentPositionInViewPort + 'vh';
    }
};