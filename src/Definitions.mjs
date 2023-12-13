export const Definitions = {
    GAME_LOOP_INTERVAL: 10, // speed of ticks in ms
    SCORE_INCREMENT_DIV: 500, // how many ticks it takes to increment score

    box: {
        IMG_SRC: './resources/box_1.png',
        HP: 5000,
    },

    fork: {
        IMG_SRC: './resources/frok.png',
        DAMAGE: 50,
        SPEED: 35,
    },

    garbageTruck: {
        TRASH_SPAWN_DIV: 1500, // how many ticks it takes for truck to appear, randomized in GarbageTruckManager
        IMG_SRC: null,
        IMG_OFFSET_X: 25, // In vw
    },

    dynamite: {
        IMG_SRC: './resources/dynamite.png',
        EXPLOSION_DELAY: 50,
        EXPLOSION_RADIUS: 2, // How much bigger the collision box is, scale factor
        EXPLOSION_DAMAGE: 100,
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

    enemy: {
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
            {
                IMG_SRC: './resources/plant_0.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 100,
                PRICE: 20
            },
            {
                IMG_SRC: './resources/plant_1.png',
                HP: 1500,
                ATTACK_SPEED_DIV: 500,
                PRICE: 40
            },
            {
                IMG_SRC: './resources/plant_2.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 500,
                PRICE: 60
            },
            {
                IMG_SRC: './resources/plant_2.png',
                HP: 1000,
                ATTACK_SPEED_DIV: 500,
                PRICE: 80
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
            COMPOST_AMOUNT: 15,
            COMPOSTING_TIME: 2000,
        }
    ],

    enemyManager: {
        AMBIENT_DIV: 500,
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